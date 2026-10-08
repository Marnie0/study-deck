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
    [`دي واحدة منهم، بس مش الوحيدة.`, `دي واحدة منهم، بس مش الوحيدة.`, `دي واحدة منهم، بس مش الوحيدة.`, `صح. الـ HCI والـ HMI والـ MMI كلهم بيتقالوا على نفس المجال.`],
    [`الـ UX بيغطي التجربة الكاملة بتاعة الـ user، وده أوسع من الـ look and feel بتاع الشاشة.`, `صح. الـ UI design هو الـ interactivity والـ look and feel بتاع الشاشة أو الصفحة.`, `ده المجال الأب اللي بيتكلم عن تفاعل الناس مع المنتجات أو الـ systems أو الأجهزة.`, `ده أخو الـ HCI تحت الـ human factors engineering؛ مش تصميم شاشات.`],
    [`الموضوع مش إننا نشيل الـ visuals؛ الموضوع عن الانتباه.`, `صح. الـ interface بيختفي والـ user بيفكر في الـ task مش في الأداة.`, `إنك تخبي features في menus مش بيخلي التفاعل مباشر.`, `نوع الـ modality ملوش علاقة؛ أي interface ممكن يحاول يبقى invisible.`],
    [`قليل جداً.`, `صح. مثال حدود الإنسان في المحاضرة هو حوالي 30 درجة رمادي.`, `كتير؛ وده كان قصد المثال.`, `كتير.`],
    [`صح. الترتيب هو user research ← design and prototyping ← evaluation.`, `الـ Evaluation هو الجزء التالت.`, `ده الجزء التاني.`, `الـ Implementation مش واحد من الـ 3 أجزاء المذكورين.`],
    [`رقم غلط.`, `رقم غلط.`, `صح. 71% من عمليات البحث استخدمت الـ visual search.`, `رقم غلط.`],
    [`العكس: الـ usability مكانش حد بيفكر فيها.`, `صح. المهندسين كانوا بيعملوا optimize للجهاز الغالي، مش لتجربة الـ user.`, `الـ User-centric design ده الأسلوب الحديث.`, `الـ Invisible interfaces دي فكرة مثالية حديثة.`],
    [`صح. الاتنين بيصبّوا في الـ human factors engineering في رسمة الـ hierarchy.`, `دول تحت الـ human factors engineering، مش فوقه.`, `مش موجودين في الـ hierarchy.`, `دول فروع من الـ human factors engineering، مش مصادره.`],
    [`صح. المحاضرة بتسمي ده "software development is research".`, `الجملة متاخدة من المحاضرة بالنص، فهي صح.`],
    [`ده تعريف الـ UX، مش الـ UI.`, `صح. الـ UI هو الـ look والـ feel والـ interactivity؛ الـ UX هو التجربة الكاملة.`]
  ],
  extra: [
    [`صح. المحاضرة بتقول إن الـ HCI بيتعامل مع الـ Design والـ Implementation والـ Evaluation بتاع الـ interactive systems.`, `غلط. الـ HCI بيدرس التفاعل بين الـ users والكمبيوتر، مش الـ supply chain بتاع الـ hardware.`, `غلط. دي أنشطة business، مش الـ 3 أنشطة اللي المحاضرة بتذكرها للـ HCI.`, `غلط. دي تفاصيل visual؛ الـ HCI بيغطي الـ design والـ implementation والـ evaluation كله للـ interactive systems.`],
    [`غلط. الـ Industrial Design واحد من الـ 3 فروع بتوع الـ Human Factors Engineering.`, `صح. الـ UX Design متفرع من الـ HCI (الـ HCI بيتقسم لـ UI و UX و Interaction design)، مش من الـ Human Factors Engineering مباشرة.`, `غلط. الـ HCI واحد من الـ 3 فروع بتوع الـ Human Factors Engineering.`, `غلط. الـ Product Design واحد من الـ 3 فروع بتوع الـ Human Factors Engineering.`],
    [`غلط. المحاضرة بتقول العكس.`, `صح. الفرق بـ<b>يقل</b>، عشان أجهزة أكتر بقت computerized.`],
    [`غلط. العكس هو الصح: الـ UX بيحدد (dictates) والـ HCI بيفهم.`, `غلط. الـ look and feel ده الـ UI design. الـ UX هو التجربة الكاملة والـ HCI عن فهم التفاعلات.`, `صح. المحاضرة بتقول إن الـ UX عن تحديد (dictating) التفاعلات، والـ HCI في الأساس عن فهم التفاعل بين البني آدمين والكمبيوتر.`, `غلط. أجهزة الـ input/output هي جزء الـ "computer" بس. الـ HCI بيغطي كمان الـ user والـ interaction.`],
    [`غلط. لسه محدش بيعمل design أو prototype؛ الفريق بيتعلم عن الـ users.`, `غلط. الـ Evaluation بيختبر ويحسّن design موجود؛ هنا لسه مفيش design.`, `غلط. الـ Implementation مش واحد من الـ 3 أجزاء بتوع الـ UI design process، ومفيش code بيتكتب.`, `صح. الـ User research معناه إنك تتعلم عن الـ users (مهاراتهم، اللي بيشتتهم، الاحتياجات الخاصة زي كبار السن) والـ previous research عن قدرات الإنسان وإدراكه.`],
    [`صح. الأهداف هي التصميم للناس، وللـ tasks، وللبيئات اللي الـ users عايشين وشغالين فيها (زي organization).`, `غلط. التصميم للبيئة مذكور صراحةً كواحد من أهداف الـ HCI.`],
    [`صح. دي فكرة الـ human-task interaction: الـ user عايز يخلّص task والـ system مجرد وسيلة.`, `غلط. الفكرة عكس كده: الـ user المفروض يفكر في الـ task مش في الأداة.`, `غلط. المثال مش نقد لـ Zoom؛ هو بيوضح إن الـ users بيتفاعلوا مع الـ task.`, `غلط. المثال عن الـ task والناس، مش عن الـ hardware.`],
    [`غلط. جزء الـ User عن القدرات العقلية والجسدية.`, `صح. جزء الـ Interaction بيغطي الـ interfaces والـ HCI patterns والـ design والـ usability evaluation.`, `غلط. جزء الـ Computer/Machine عن أجهزة الـ input/output.`, `غلط. الـ Human Factors Engineering هو المجال الأب للـ HCI، مش واحد من أجزاءه التلاتة.`],
    [`غلط. تشبيه الحكم معناه العكس.`, `صح. زي الحكم، الـ interface بيبقى ناجح لما <b>محدش ياخد باله منه</b>، عشان الـ users يركزوا على الـ task (الـ invisible interface).`],
    [`غلط. الـ invisible interface بيخلي الـ users يركزوا على الـ task. الـ form ده بيخلي الـ user يتخانق مع الأداة.`, `غلط. إنه يطلب نفس الداتا كذا مرة وبعدين يفشل ده معناه إن الـ users محدش فهمهم.`, `صح. المحاضرة بتدي الـ form ده كمثال لـ UX وحش: متكرر، وبطيء، وبيخلص بـ error.`, `غلط. الـ Industrial design فرع منفصل؛ المثال ده عن user experience وحشة في web form.`]
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
    [`الزراير الصغيرة كانت هي المشكلة، مش حاجة بيفضلوها.`, `الـ design الأحسن أصلاً استخدم touch screen كبيرة.`, `صح. وده السبب إن الزراير الصغيرة فشلت.`, `الـ Voice مكانش جزء من الـ case.`],
    [`مش مذكور.`, `صح.`, `دي كانت النسخة المحسّنة.`, `مش مذكور.`],
    [`صح.`, `دي مش الطريقة اللي اتشرحت.`, `الـ overflow area تبع الـ rafted toolbars.`, `دي مش الطريقة اللي اتشرحت.`],
    [`الأيقونات مكانتش المشكلة.`, `صح. الـ Scanning خد حوالي ضعف الوقت.`, `الـ CEIP جه بعدين (Office 2003).`, `الـ Toolbars اتعملها rafting، مش اتشالت.`],
    [`أصغر بمعامل 1000.`, `رقم غلط.`, `صح.`, `الـ 70% دي نسبة الـ data اللي اترمت.`],
    [`الـ Usage data جت مع الـ CEIP في 2003.`, `صح. الفريق اعترف بده صراحةً.`, `مش ده اللي المحاضرة بتقوله.`, `مش ده اللي المحاضرة بتقوله.`]
  ],
  extra: [
    [`غلط. الزراير الصغيرة كانت المشكلة في النسخة الأولى.`, `غلط. المحاضرة مذكرتش voice input؛ الـ redesign استخدم شاشة.`, `غلط. keys أكتر معناها targets أصغر كمان للإيدين اللي لابسة جوانتيات.`, `صح. الـ design الأحسن كان touch screen كبيرة مع stylus pen.`],
    [`صح. ده تعريف المحاضرة للـ bloatware.`, `غلط. ده وصف الـ CEIP، اللي Microsoft استخدمته عشان تستبدل التخمين بالـ data.`, `غلط. دي الـ adaptive (personalized) menu.`, `غلط. ده الـ rafted toolbar.`],
    [`غلط. دي الـ adaptive (personalized) menu.`, `صح. دي طريقة شغل الـ rafted toolbars.`, `غلط. الـ toolbars فضلت موجودة؛ بس اتشاركت سطر وخبّت شوية زراير.`, `غلط. المحاضرة مقالتش كده؛ استخدام الـ keyboard كان finding من الـ CEIP.`],
    [`صح. الـ customization مكانش سهل ولا دقيق، فالآليات دي اتقفلت by default بعدين.`, `غلط. المحاضرة بتقول إنها فشلت واتقفلت by default.`],
    [`غلط. ده مذكور كنتيجة لزيادة الـ features.`, `غلط. ده مذكور كنتيجة لزيادة الـ features.`, `صح. اللي حصل العكس: مع Office 97–2003 الناس حسّت إنها متحكمة <b>أقل</b>.`, `غلط. ده مذكور كنتيجة لزيادة الـ features.`],
    [`غلط. الـ data بتاعة الـ CEIP كانت anonymous.`, `غلط. المحاضرة مذكرتش فيديو؛ الـ CEIP جمع usage و hardware data.`, `غلط. رأي الصحافة كان جزء من المشكلة، مش data من الـ CEIP.`, `صح. الـ balloon سجّلت الـ users والـ CEIP جمع usage و hardware data بشكل anonymous.`],
    [`صح. الفريق عرف إن فيه commands بتتستخدم 7x أكتر بالـ keyboard من الماوس.`, `غلط. "الضعف" مرتبط بإن الـ short menus الغلط خلّت الـ scanning ياخد ضعف الوقت، مش باستخدام الـ keyboard.`, `غلط. الـ 70 دي نسبة data الـ Word و Outlook اللي اترمت.`, `غلط. الـ 1.3 مرتبطة بالـ 1.3+ billion sessions، مش باستخدام الـ keyboard.`],
    [`غلط. كان عندهم data أكتر من اللي محتاجينه.`, `صح. جالهم data من Word و Outlook كتير لدرجة إن <b>70% منها اترمى</b>.`],
    [`غلط. الـ Office case وضّح إن features كتير أوي بتودي لـ bloatware.`, `صح. دي القاعدة اللي طلعت من الـ adaptive menus والـ rafted toolbars، لما التوقعات الغلط خلّت الـ scanning ياخد ضعف الوقت.`, `غلط. فريق Office بعد عن التخمين وراح للـ data.`, `غلط. ده حل الـ Qualcomm truckers، مش درس الـ auto-customization.`],
    [`صح. دي من المشاكل المذكورة لـ Office 97–2003.`, `غلط. المحاضرة بتذكر المشاكل دي بالظبط لـ Office 97–2003.`]
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
    [`الـ Usability tests تبع الـ tactical أو الـ post-launch.`, `ده الـ post-launch research.`, `ده مش نوع من أنواع الـ user research.`, `صح. بيحدد المشاكل وإيه اللي هنبنيه.`],
    [`الـ Tactical (design) research بيحصل <b>أثناء</b> مرحلة الـ design. اللي بعد الـ launch ده الـ post-launch research.`, `صح. الـ Tactical research بيحصل أثناء الـ design وبيستخدم feedback على الـ prototypes.`],
    [`ده الـ user-centered design process بتاع Google.`, `صح.`, `ده software cycle عام، مش بتاع Joyner.`, `مش الـ cycle بتاع Joyner.`],
    [`الـ research اللي حد تاني عمله اسمه secondary.`, `صح. الـ Primary research هو اللي إنت بتعمله بنفسك.`],
    [`صح. قراية الـ literature الموجودة دي secondary research.`, `دي طريقة primary.`, `دي طريقة primary.`, `دي طريقة primary.`],
    [`صح. الاتنين مذكورين كطرق primary منتشرة.`, `هم مذكورين صراحةً تحت الـ primary research.`],
    [`صح. إنك تستخدم research حد تاني عمله ده secondary research.`, `الـ Papers اللي كتبها ناس تانيين دي secondary sources.`],
    [`صح. الـ Surveys مذكورة ضمن الطرق الـ primary.`, `الـ Surveys واحدة من الطرق الـ primary المذكورة.`],
    [`ده ضيق أوي.`, `ده ضيق أوي.`, `صح. Google بتسميه جزء مستمر من الـ life cycle.`, `مش دي فكرة المحاضرة.`]
  ],
  extra: [
    [`غلط. ده الـ design life cycle بتاع Joyner، مش process بتاع Google.`, `غلط. لازم تفهم الـ users قبل ما تحدد (specify) المشكلة.`, `صح. الـ process بتاع Google هو Understand و Specify و Design و Evaluate، والـ iteration هو الأساس.`, `غلط. إنك تصمم قبل ما تفهم الـ users هو بالظبط اللي الـ user-centered design بيتجنبه.`],
    [`غلط. ده الـ Evaluate step.`, `غلط. ده الـ Design step.`, `غلط. ده الـ Understand step.`, `صح. الـ Specify معناها إنك تختار أهم user problem محتاج تتحل.`],
    [`غلط. التصميم على functional specification ده الطريقة اللي الـ systems <i>كانت</i> بتتصمم بيها زمان.`, `صح. الـ User-centered design بياخد احتياجات الـ user في الاعتبار في <b>كل خطوة</b>.`],
    [`صح. الـ User research جزء أساسي من كل مرحلة، فمش خطوة واحدة.`, `غلط. الاتنين بيقولوا إن الـ users مطلوبين طول الوقت، مش إن الـ research ملوش لازمة.`, `غلط. المحاضرة مقالتش أي حاجة زي كده؛ الـ research جزء أساسي من الـ design.`, `غلط. الـ Secondary research بيدعم الـ primary research؛ مش بيحل محل الـ user research.`],
    [`غلط. إنك تستنى للآخر هو بالظبط اللي Joyner بيحذّر منه.`, `صح. Joyner بيقول "you need users early and often".`, `غلط. دي فكرة الـ "one-time step" اللي المحاضرة رافضاها.`, `غلط. دي مش جملة Joyner؛ الـ users مطلوبين طول الوقت.`],
    [`غلط. الـ Tactical research بيحصل أثناء الـ design ومحتاج feedback على الـ prototypes.`, `غلط. الـ Post-launch research بيحصل بعد الـ release عشان نشوف النجاح.`, `صح. بيحصل قبل ما أي حاجة تتصمم، بيتكلم مع الـ users عن الـ pain points، وبيقرر إيه اللي هيتبني.`, `غلط. الفريق بيتكلم مع الـ users بنفسه، يبقى primary؛ وكمان "secondary" ده تقسيم حسب WHO مش WHEN.`],
    [`صح. دي بالظبط أسئلة الـ post-launch research.`, `غلط. المحاضرة بتعرّف الـ post-launch research بالأسئلة دي.`],
    [`غلط. الـ Foundational research بيحصل قبل ما أي حاجة تتصمم.`, `غلط. المنتج لسه متعملوش launch.`, `غلط. الفريق بيجمع الـ feedback بنفسه، والـ secondary ده تقسيم WHO.`, `صح. الـ Tactical research بيحصل أثناء الـ design، بيقول المنتج يتبني إزاي، وبيستخدم feedback على الـ prototypes.`],
    [`صح. المحاضرة بتذكر الفوايد دي للـ secondary research في الأول.`, `غلط. الـ Primary research هو اللي specific لاحتياجاتك.`, `غلط. الـ Secondary research بيدعم الـ primary findings؛ مش بيلغيها.`, `غلط. الـ Foundational research ده primary research بيتعمل قبل ما أي حاجة تتصمم.`],
    [`صح. المحاضرة بتقول إن الـ component الواضح بيمنع إنك تستهون بيه، وكمان بقى أكتر وأكتر دور للـ specialists.`, `غلط. المحاضرة بتذكر فوايد إنك تخلي الـ user research واضح لوحده.`]
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
    [`الأسامي دي PII، مش SPII.`, `عنوان البيت PII.`, `الـ Email ده PII.`, `صح. لو دول ضاعوا ممكن يحصل ضرر مالي.`],
    [`صح. ده تعريف المحاضرة.`, `ده مطابق لتعريف الـ PII بالظبط.`],
    [`الـ data الأرقام دي quantitative.`, `صح. الـ Qualitative research عن ليه وإزاي، مش أرقام.`],
    [`الـ Quantitative يعني أرقام.`, `صح. الأوصاف والشروحات دي qualitative.`, `ده مش نوع research data.`, `ده مش نوع research data.`],
    [`المحاضرة مقالتش كده.`, `صح.`, `المحاضرة مقالتش كده.`, `ملوش علاقة.`],
    [`صح.`, `الـ Privacy بتزوّد الحرص؛ مش بتسرّع الحاجات.`, `ده عكس الـ privacy.`, `ملوش علاقة.`],
    [`صح. خطط من بدري، بس الـ script مش كتاب مقدس.`, `المحاضرة طالبة flexibility صراحةً.`, `اعمل combination من الـ methods؛ الـ qualitative مطلوب عشان تفهم بجد.`, `الـ Privacy حاجة أساسية.`],
    [`المحاضرة بتحذّر من كده.`, `صح.`, `الـ Context مهم.`, `مش ده الهدف.`],
    [`الـ Surveys من أرخص الطرق؛ الـ interviews أغلى.`, `صح. الـ Interviews بتبقى synchronous وغالباً محتاجة incentives.`],
    [`الـ surveys الطويلة بتضر الـ response rate والـ reliability.`, `صح. خليها صغيرة على قد ما تقدر.`],
    [`أسئلة أكتر يعني حاجات أكتر تحللها.`, `ده بيقلل الـ reliability.`, `ده بيتعب اللي بيجاوبوا.`, `صح.`]
  ],
  extra: [
    [`غلط. الـ SSN ده Sensitive PII.`, `صح. الـ Email address مذكور تحت الـ PII (مع الأسامي وعنوان البيت ورقم التليفون)، مش تحت الـ SPII.`, `غلط. أرقام الباسبور Sensitive PII.`, `غلط. تاريخ الميلاد مذكور كـ Sensitive PII.`],
    [`غلط. ده post-launch research، مش اللي حقائق عمى الألوان بتقولهولك.`, `غلط. الـ survey بتاع الفريق نفسه يبقى primary research.`, `صح. المحاضرة بتدي التصميم لـ users عندهم color-blindness كمثال على secondary research عن قدرات الإنسان وحدوده.`, `غلط. قراية حقائق منشورة عن عمى الألوان مبتجمعش أي user data خالص.`],
    [`غلط. ده عيب الـ primary research؛ الـ secondary غالباً رخيص وسريع.`, `غلط. دي ميزة الـ primary research.`, `غلط. الجدول بيقول إن الـ secondary research ممكن يبقى qualitative أو quantitative.`, `صح. ده العيب الأساسي للـ secondary research في الجدول.`],
    [`غلط. الجدول بيقول غير كده.`, `صح. الـ primary والـ secondary research الاتنين ممكن يبقوا qualitative أو quantitative.`],
    [`صح. الـ Surveys بتدي ردود سريعة من users كتير في وقت قصير، وهي من أرخص الطرق.`, `غلط. الـ Interviews بتاخد وقت أكتر بكتير لكل user وبتكلّف أكتر.`, `غلط. ده بطيء ومينفعش يوصل لعدد كبير من الـ users بسرعة.`, `غلط. الـ group interviews برضه بتاخد وقت أكتر بكتير لكل مشارك من الـ survey.`],
    [`غلط. دي ميزة الـ secondary research.`, `صح. دي الميزة الأساسية للـ primary research في الجدول.`, `غلط. ده وصف الـ secondary research (بتدوّر على data موجودة).`, `غلط. المحاضرة بتقول إن الـ user research لازم يتخطط له من بدري.`],
    [`غلط. المحاضرة بتقول إن الـ methods مش بدايل.`, `صح. الـ Methods مش بدايل لبعض؛ استخدم <b>combination</b> منهم بترتيب مناسب.`],
    [`غلط. دي واحدة من الـ guidelines.`, `غلط. دي واحدة من الـ guidelines.`, `صح. ده بيكسر قاعدة "متحتفظش بالـ data بعد ما متبقاش محتاجها".`, `غلط. دي واحدة من الـ guidelines.`],
    [`صح. الـ Surveys ممكن تبقى خطوة أولى عشان تخطط للـ interviews، وممكن كمان تيجي بعد interview أو usability study.`, `غلط. المحاضرة بتقول صراحةً إن الـ survey ممكن كمان تيجي بعد interview أو usability study.`],
    [`غلط. المشكلة مش في اختيار الـ methods، المشكلة في الـ data اللي بتتجمع.`, `غلط. دي نصيحة عامة، بس مش هي اللي الـ survey ده كاسرها.`, `غلط. النصيحة دي عن تحسين الـ survey، مش عن إيه الـ data اللي تتجمع.`, `صح. الـ survey بيطلب PII عمره ما هيستخدمه، فبيكسر نصيحة الـ survey وقاعدة الـ privacy الاتنين.`]
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
    [`مفيش ranges هنا أصلاً.`, `صح. بيسأل عن حاجتين في نفس الوقت، فقسّمه.`, `مش دي المشكلة.`, `ده عن الـ usability بتاعة الـ survey، مش عن السؤال ده.`],
    [`صح. كلمة "Wasted" فيها حكم. استخدم "spent".`, `هو بيسأل عن حاجة واحدة بس.`, `إنه مفتوح مش هي المشكلة.`, `الـ Timeboxing حاجة كويسة؛ المشكلة في اختيار الكلمة.`],
    [`الـ 2 و5 و10 و20 كل واحد فيهم موجود في range-ين.`, `صح. كل قيمة تبع range واحد بس.`, `الـ 5 والـ 10 متداخلين.`, `دي labels مبهمة، مش ranges.`],
    [`الموضوع عن العدل مع كل الإجابات، مش عن الاختصار.`, `صح. بيسمح للـ users يضيفوا nominal categories.`, `الـ Usable بيغطي الـ progress bars والترتيب والحاجات دي.`, `الـ Clear بيغطي الـ labels والـ ranges والتفاصيل.`],
    [`ده سؤال مفتوح.`, `صح. بيفترض إن الشخص بيحب التمرين.`, `مفيش ranges هنا.`, `الاختصار مش هو المشكلة.`],
    [`صح. وكمان أطوال صفحات ثابتة، وترتيب منطقي، وتنبيهات للأسئلة اللي متجاوبتش، والـ preview.`, `ده Be Specific.`, `ده Be Concise.`, `ده Be Unbiased.`],
    [`ده بيدّي معلومات أقل كمان.`, `صح. اعمل timebox لأسئلة التكرار.`, `ده سؤال مختلف وكمان leading.`, `ده scale من غير labels.`],
    [`ده عكس النصايح.`, `صح.`, `الـ Research لازم يتخطط له من بدري.`, `الأسئلة المفتوحة برضه ليها قيمة.`],
    [`المبدأ هو "Be UNbiased". (الـ answer sheet بتاع 2024/25 حاطط الإجابة True، وده شكله typo في السؤال. جاوب من المحاضرة.)`, `صح حسب المحاضرة: المبدأ هو Be Unbiased.`]
  ],
  extra: [
    [`صح. الـ Scales لازم يبقى ليها labels، زي "1 = Highly dissatisfied … 5 = Highly satisfied".`, `غلط. السؤال قصير أصلاً؛ المشكلة إن الـ scale ملوش labels.`, `غلط. مفيش كلمة loaded فيها مشاعر في السؤال.`, `غلط. الـ progress bar عن الـ survey كله، مش عن scale واحد من غير labels.`],
    [`غلط. السؤال الأصلي بيسأل عن حاجة واحدة بس.`, `صح. ده مثال المحاضرة على اللغة البسيطة تحت Be Concise.`, `غلط. التغيير في الصياغة، مش في شكل الإجابة.`, `غلط. السؤال الأصلي مش بيزقّ الـ user ناحية إجابة.`],
    [`غلط. مفيهوش كلمة loaded زي "wasted".`, `غلط. مفيهوش numeric ranges خالص.`, `صح. ده مثال "avoid internal conflict" تحت Be Specific: ممكن حد يحب الطعم ومش عاجباه الحرارة.`, `غلط. بيسأل عن مستوى رضا، مش yes/no.`],
    [`غلط. الـ Radio buttons بتسمح باختيار واحد بس.`, `صح. السماح بأكتر من اختيار معناه إنك تستخدم <b>checkboxes بدل radio buttons</b>.`],
    [`غلط. بيسأل عن حاجة واحدة (الـ recommendations).`, `غلط. الـ Timeboxing لأسئلة التكرار؛ وده مش منها.`, `غلط. الـ "Other: ____" للـ lists بتاعة categories، مش للسؤال ده.`, `صح. إنه يمدح الـ interface "الـ brand-new AI-based" ويلمّح لكلمة "better" ده بيوجّه الـ user. ده مثال المحاضرة على الـ leading question.`],
    [`صح. ده مثال المحاضرة على التركيز على رأي الـ user.`, `غلط. الترتيب عن تسلسل الأسئلة، مش عن الصياغة دي.`, `غلط. مفيش numeric ranges هنا.`, `غلط. النسخة الجديدة أطول أصلاً؛ الهدف إنك تاخد رأي الـ user.`],
    [`غلط. مش بيفترض إجابة ولا بيمدح حاجة.`, `صح. تمرين المحاضرة بيعتبره yes/no؛ والـ ranges (زي في "Be Expressive") بتدي إجابات أغنى.`, `غلط. مفيهوش كلمة loaded زي "wasted".`, `غلط. مفيهوش ranges خالص، وده هو المشكلة الحقيقية.`],
    [`صح. تحت Be Unbiased: سيب الأسئلة المفتوحة مفتوحة.`, `غلط. المحاضرة بتقول إن السؤال ده متجبرهوش على options ثابتة.`],
    [`غلط. كل سؤال بيسأل عن حاجة واحدة.`, `غلط. الطول مش هو المشكلة هنا.`, `صح. تمرين المحاضرة بيشاور على إن عدد الـ options بيتغير وإن الـ scale معكوس.`, `غلط. الـ "Other" للـ lists بتاعة categories، مش للـ numeric scales.`],
    [`صح. ده مثال المحاضرة على إنك تزوّد تفاصيل تحت Be Clear.`, `غلط. المحاضرة ذاكرة المثال ده بالظبط تحت Be Clear.`]
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
    [`صح. المحاضرة بتقول كده.`, `المحاضرة بتسمي الـ interviews الـ technique الأكتر انتشاراً.`],
    [`صح، بس مش الاختيار الصح الوحيد.`, `النصيحة إنك <b>تسيب</b> وقت بين الـ interviews.`, `صح، بس مش الاختيار الصح الوحيد.`, `صح. اسمع كويس <b>و</b>اكتب notes هما المفتاحين.`],
    [`صح. الأفراد: "easier to coordinate the logistics".`, `جدول المقارنة بيقول إن الـ logistics أسهل مع الأفراد.`],
    [`مش ده السبب المذكور.`, `صح.`, `مش لازم تبقى أونلاين.`, `بتجمع qualitative data في الغالب.`],
    [`الـ Recall bias هو إن الذاكرة مش دقيقة عن أحداث فاتت.`, `صح.`, `مش متشرح في المحاضرة.`, `مش متشرح في المحاضرة.`],
    [`دي ميزة الـ individual interviews.`, `صح.`, `الـ Individual interviews أسهل في التنسيق.`, `الـ Groups ممكن <b>يكون فيها</b> confounding personalities.`],
    [`الأرقام بتوريك إيه اللي حصل، مش ليه.`, `ممكن ميكونش specific للـ users بتوعك.`, `مش من تقسيمات المحاضرة.`, `صح. بيغطي ليه وإزاي الحاجات بتحصل.`]
  ],
  extra: [
    [`غلط. "Where" واحدة من الـ 6 Ws.`, `غلط. "How" واحدة من الـ 6 Ws.`, `غلط. "Why" واحدة من الـ 6 Ws.`, `صح. الـ 6 Ws هما who و what و where و when و why و how. و"Which" مش منهم.`],
    [`صح. الـ Recall bias هو إنك تدّي إجابات مش دقيقة عن حاجات فاتت.`, `غلط. الـ Reporting bias هو إجابات مثالية أكتر من الواقع، مش نسيان.`, `غلط. دي مشكلة في الـ group interviews عن إزاي الناس عايزة تبان قدام غيرها.`, `غلط. دي مشكلة group interview، مش غلطة ذاكرة.`],
    [`صح. "More privacy for participants" مذكورة كميزة للـ interview مع الأفراد.`, `غلط. الجدول بيذكر الـ privacy الأكتر كميزة للـ individual interviews.`],
    [`غلط. الـ Surveys برضه بتجمع data بالأسئلة، فعندها نفس الـ biases.`, `صح. ده الحل المذكور في المحاضرة.`, `غلط. الـ Leading questions بتزوّد الـ bias بدل ما تقلله.`, `غلط. التحليل صعب، بس إنك تتخطاه مش هو الحل.`],
    [`غلط. مفيش حاجة في السيناريو عن الوقت بين الـ interviews.`, `غلط. مفيش حاجة بتقول إن الأسئلة متجهزتش.`, `صح. المحاضرة بتقول واحد يسأل وواحد تاني يكتب notes (ومعاها المشاعر وردود الفعل)، والـ audio لوحده مش كفاية.`, `غلط. دي مش نصيحة؛ الـ individual والـ group interviews كل واحد ليه مميزات وعيوب.`],
    [`غلط. دي ميزة الـ individual interviews.`, `غلط. دي ميزة الـ individual interviews.`, `غلط. دي خاصية الـ individual interviews.`, `صح. دي المشاكل المذكورة للـ group interviews.`],
    [`غلط. Joyner بيقول العكس.`, `صح. Joyner بيقول <b>"design is very hard"</b>.`],
    [`صح. "Listen well": الـ user المفروض يتكلم أغلب الوقت.`, `غلط. اللي بيعمل الـ interview المفروض يسمع كويس، مش يسيطر على الكلام.`, `غلط. اللي بيكتب الـ notes بيسجّل؛ مش المفروض يقود الكلام.`, `غلط. المحاضرة بتقول الـ user هو اللي يتكلم أغلب الوقت.`],
    [`غلط. الـ Designers بيقولوا "we are not artists"؛ موهبة الرسم مش شرط.`, `صح. ده باقي كلام Klemmer.`, `غلط. المحاضرة بتقول الـ design مش بيطلّع لوحات تتعلق على الحيطة.`, `غلط. المحاضرة بتقول متقفلش الإبداع.`],
    [`صح. المحاضرة بتقول كده بالظبط.`, `غلط. أي ترتيب مسموح؛ وكل واحد ممكن يتستخدم عشان تخطط للتاني.`]
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
    [`مش دي اللي اتذكرت.`, `صح.`, `الـ Feedback حاجة متشجّع عليها.`, `الغلطة التانية إنك تثبت على فكرة واحدة <b>بدري</b> أوي.`],
    [`الـ alternatives الأكتر متشجّع عليها.`, `صح. ابعد نفسك عن الحلول الموجودة.`, `حاجة وحشة، بس مش الغلطة المذكورة هنا.`, `مش الغلطة المذكورة.`],
    [`قليل أوي.`, `قليل أوي.`, `قريب، بس المحاضرة بتقول <b>أكتر</b> من 100.`, `صح.`],
    [`هي نسخ تقريبية.`, `صح. "Prototypes are questions, ask a lot of them."`, `"مش عن الـ artifact".`, `ده بيفوّت هدف الـ feedback.`],
    [`صح.`, `ده تعريف المحاضرة للـ prototype الكويس.`],
    [`المحاضرة بتقول مش لازم يشبه المنتج النهائي.`, `صح.`, `ده الفهم "اللي مش مفيد".`, `الـ polish ممكن يقلل الـ feedback (شوف الـ lo-fi).`],
    [`إنك تثبت على واحد ده تاني أكبر غلطة.`, `صح.`, `مفيش رقم ثابت.`, `الـ Alternatives مرحلة لوحدها.`]
  ],
  extra: [
    [`غلط. Joyner عايز alternatives أكتر ما تقدر؛ الفريق عمل قليل أوي.`, `غلط. إنك تبعد نفسك دي النصيحة، مش الغلطة.`, `صح. 3 variations من نفس الـ layout دول نوع واحد من الأفكار، واتختار بدري أوي.`, `غلط. السيناريو بيقول إنهم عملوا user research الأول؛ ودي أكبر غلطة، مش دي.`],
    [`غلط. إنك تبقى محبوس في الـ interface الحالي هو بالظبط الغلطة.`, `غلط. الـ Design alternatives مرحلة لوحدها ومينفعش تتخطاها.`, `غلط. ده بيثبّت الـ design الموجود أكتر كمان.`, `صح. دي نصيحة المحاضرة لما تحسّن system موجود.`],
    [`غلط. دي تاني أكبر غلطة.`, `صح. أكبر غلطة إنك تنط للـ design من غير ما تفهم الـ users أو الـ task؛ وإنك تثبت على فكرة واحدة بدري هي <b>تاني</b> أكبر غلطة.`],
    [`صح. الـ design النهائي غالباً بيبقى combination من alternatives قديمة.`, `غلط. إنك تثبت على أول فكرة دي غلطة.`, `غلط. المحاضرة مش بتختار الـ designs على حسب عدد الـ features.`, `غلط. الـ Design iterative ومبني على الـ feedback.`],
    [`غلط. المحاضرة بتقول إن الفهم المنتشر ده مش مفيد.`, `صح. ده التعريف بالنسبة للـ designers.`, `غلط. الـ prototype نسخة تقريبية عشان الـ feedback، مش المنتج النهائي.`, `غلط. Klemmer بيقول الـ prototype مش عن الـ artifact.`],
    [`غلط. الـ Polish ده عن الـ artifact، واللي Klemmer بيقول إنه مش المقصود.`, `غلط. الجملة ملهاش علاقة بالـ code.`, `صح. "A prototype is not about the artifact, it's about feedback and iteration."`, `غلط. الـ prototype الكويس مش لازم يشبه المنتج النهائي.`],
    [`صح. المحاضرة بتقول كده، وعشان كده Klemmer بيقول "prototypes are questions, ask a lot of them."`, `غلط. المحاضرة بتقول إن الـ prototypes دي بتضيّع الـ design process.`],
    [`غلط. الـ prototype الكويس مش لازم يشبه المنتج النهائي.`, `غلط. الـ prototype مش عن الـ artifact.`, `غلط. المفروض تستكشف alternatives أكتر ما تقدر.`, `صح. الـ Prototypes اللي مبتدّيش معرفة جديدة بتضيّع الـ process؛ "prototypes are questions, ask a lot of them."`],
    [`صح. Joyner بيقول الـ process ده محتاج كذا فكرة تبدأ بيهم.`, `غلط. إنك تثبت على فكرة واحدة بدري دي غلطة كبيرة.`, `غلط. الـ Prototypes معمولة عشان feedback سريع، مش code خلصان.`, `غلط. مفيش حاجة في المحاضرة دي بتشترط hi-fi الأول؛ الأفكار بتيجي الأول.`],
    [`صح. المحاضرة بتقول إن الـ design alternatives مرحلة لوحدها في الـ cycle بتاع Joyner.`, `غلط. هي مرحلة لوحدها (Need finding ← Design alternatives ← Prototyping ← Evaluation).`]
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
    [`معكوس: الـ <b>LOW</b>-fidelity prototypes هي اللي أسرع وأسهل وأرخص.`, `صح.`],
    [`الـ Lo-fi رخيص وسريع.`, `ده وصف الـ hi-fi.`, `صح.`, `الـ Hi-fi لسه بيتعمل بعدين.`],
    [`الـ Wireframes مفيهاش ألوان عن قصد.`, `الـ Wireframes عن structure الشاشة.`, `صح.`, `الـ Wireframes بتيجي قبل الـ code.`],
    [`دول IDEs.`, `دي أدوات Office.`, `صح. التلاتة موجودين في list المحاضرة (مع Adobe XD و Pencil).`, `دول برامج مونتاج فيديو.`],
    [`الـ Wireframes بتيجي بعد الـ foundational research.`, `صح.`, `الـ Wireframes دي lo-fi وبتيجي الأول.`, `بتيجي بدري.`],
    [`ده standard.`, `ده standard.`, `صح. الـ Wireframes بتتجنب الألوان والـ font styles عن قصد.`, `ده standard.`],
    [`الـ Groups بتتجمع على أفكار بدري أوي، ودي المشكلة.`, `صح. كل عضو بيعمل مجموعة أفكاره الأول.`, `متقيّمش وقت الـ brainstorming.`, `الـ Brainstorming لتوليد الأفكار.`],
    [`الـ guideline إنها تظهر جنب الـ field.`, `صح. والـ border الأحمر للـ field هو المفضّل.`, `بعيد أوي عن المشكلة.`, `دي مش form guideline.`],
    [`الـ Breadcrumbs بتوري إنت فين بس، لما يكون فيه اختيارات كتير.`, `صح.`, `الـ Navigation tabs مش بتوري الخطوات الفاضلة.`, `مش مؤشر مكان.`],
    [`صح.`, `ضيق أوي.`, `مش دي الـ list.`, `مش جمهور.`]
  ],
  extra: [
    [`غلط. الـ Fidelity عن الـ look and feel، مش عدد الشاشات.`, `صح. ده تعريف المحاضرة للـ fidelity.`, `غلط. الـ Lo-fi أسرع، بس السرعة مش هي التعريف.`, `غلط. الـ Fidelity ملهاش علاقة بعدد اللي اختبروا.`],
    [`غلط. كلام Konstan في صالح الـ prototypes اللي باينة بمجهود قليل.`, `غلط. الـ Users واحد من الـ 4 جماهير بتوع الـ prototypes.`, `صح. ده كلام Konstan في المحاضرة.`, `غلط. التفاصيل الكتير بتخلي الناس تدّي feedback في مستوى <b>أقل</b> من المطلوب.`],
    [`صح. بيسيبوا الألوان والـ font styles عشان يركزوا على الـ structure (هيكل فيه placeholders).`, `غلط. المحاضرة بتقول الـ wireframes مفيهاش ألوان ولا font styles عن قصد.`],
    [`غلط. الـ Handoff ورا بعض: الـ design يخلص، وبعدين يروح للـ development.`, `غلط. الـ Brainstorming بيطلّع أفكار؛ مش design-development process.`, `غلط. الـ Wireframing نشاط design، مش طريقة لتنظيم الـ design والـ development.`, `صح. في الـ handshake process، الـ design والـ development ماشيين بالتوازي مع sync points كتير.`],
    [`صح. النصيحة إن هدفك يبقى 20 فكرة.`, `غلط. الـ 5 دي أقل عدد sketch versions لكل شاشة في الـ wireframing.`, `غلط. الـ 3 دي عدد الألوان في palette بسيطة (المحاضرة الجاية)، مش أفكار.`, `غلط. أكتر من 100 ده عدد الـ prototypes لأول ماوس من Microsoft.`],
    [`غلط. الـ guideline ليها حدود.`, `صح. الـ commands المهمة تبقى buttons مش links، بس <b>متعرضش</b> كل الـ commands كـ buttons.`],
    [`غلط. version واحدة معناها إنك ثبتّ على فكرة واحدة.`, `صح. الـ process بيقول ارسم 5 versions على الأقل لكل شاشة.`, `غلط. الـ 20 ده عدد الأفكار في الـ brainstorming.`, `غلط. المحاضرة بتقول 5 على الأقل.`],
    [`غلط. مفيش error message هنا.`, `غلط. مفيش حاجة اتبعتت.`, `صح. مثال المحاضرة إن "Go Pro" يبان أكتر من "Free Trial".`, `غلط. مفيش حاجة بتتكرر هنا.`],
    [`غلط. الـ Progress bars لـ path واحد محدد، وبتوري فاضل إيه.`, `غلط. الـ confirmation page بتأكد إن الـ form اتبعت بنجاح.`, `غلط. الـ Hints بتساعد في ملو الـ fields؛ مش بتوري المكان.`, `صح. الـ Breadcrumbs بتوري الـ users هم فين لما يكون فيه اختيارات كتير.`],
    [`غلط. ده مش الهدف في المرحلة دي.`, `صح. الهدف إنك تنقل الفكرة من دماغك للورقة بسرعة، فتجاهل الخطوط المستقيمة والمسافات والـ alignment.`]
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
    [`الـ Cancel بيتستخدم لما يكون فيه كمان action button.`, `صح.`, `مش المصطلح بتاع الـ guideline.`, `مش المصطلح بتاع الـ guideline.`],
    [`صح. أكتر من 3 بيلخبط الـ users.`, `ألوان كتير أوي بتلخبط الـ users.`, `مش دي الـ guideline.`, `كتير أوي.`],
    [`ضيق أوي.`, `صح. حط أهم المعلومات هناك.`, `ده العكس.`, `مش ده المعنى.`],
    [`ملهاش علاقة بالـ errors.`, `صح.`, `فهم حرفي غلط للاسم.`, `مش ده المعنى.`],
    [`صح.`, `الـ Tabs بتبقى فوق.`, `المفروض يبقى فيه تغيير واضح في الـ hover.`, `links الـ Home والـ categories مكانها في كل صفحة.`],
    [`صح.`, `الرسايل المفروض تبقى قصيرة ومفيدة.`, `مش في الـ guidelines.`, `ده مُضر.`],
    [`الـ guideline بتقول يمين ومش لافت للنظر.`, `صح.`, `مش دي الـ guideline.`, `لازم يبقى باين.`]
  ],
  extra: [
    [`صح. لما يكون فيه اتنين buttons (action وواحد للقفل)، استخدم "Cancel" مش "Close".`, `غلط. "Close" بتتستخدم بس لما يكون فيه button واحد.`, `غلط. قاعدة المحاضرة إنها "Cancel" جنب الـ action button.`, `غلط. الـ button ده تبع الـ system notice، مش confirmation dialog.`],
    [`غلط. ده جزء من أجزاء الـ system notice.`, `صح. رسايل الـ notice متبقاش طويلة ولا generic.`, `غلط. ده جزء من أجزاء الـ system notice.`, `غلط. ده جزء من أجزاء الـ system notice.`],
    [`غلط. ده بيكسر الـ guideline بتاعة الـ consistency.`, `صح. الـ Alert messages لازم تبقى consistent في الموقع كله؛ متغيرش اللون ولا الـ style ولا المكان.`],
    [`غلط. دي واحدة من الـ guidelines.`, `غلط. دي واحدة من الـ guidelines.`, `صح. الـ guidelines بتقول اكتب المشكلة في الـ title واشرح حصلت ليه.`, `غلط. دي واحدة من الـ guidelines.`],
    [`غلط. المشكلة في ترتيب الـ fields، مش في إنها باينة ولا لأ.`, `غلط. مفيش حاجة في السيناريو عن الألوان.`, `غلط. مفيش حاجة في السيناريو عن الـ logo.`, `صح. الأسامي لازم تترتب First/Middle/Last، مش تتلخبط مع fields تانية.`],
    [`صح. الـ logo مينفعش يتحرك من صفحة للتانية.`, `غلط. المشكلة في مكان الـ logo، مش الـ background.`, `غلط. الـ Red Routes هي الـ paths اللي العملاء بيستخدموها أكتر، مش مكان الـ logo.`, `غلط. ده عن buttons الـ dialog، مش عن الـ logo.`],
    [`صح. دي واحدة من الـ navigation guidelines.`, `غلط. المحاضرة بتذكر التغيير الواضح في الـ hover كـ navigation guideline.`],
    [`غلط. الـ Fonts مش طريقة التجميع في المحاضرة.`, `صح. المعلومات المرتبطة بتتجمع بـ frame أو separator.`, `غلط. الـ fold عن اللي باين من غير scroll، مش عن التجميع.`, `غلط. مش كل الـ commands تبقى buttons، والـ buttons مش بتجمّع معلومات.`],
    [`غلط. links الـ Home دي guideline لوحدها.`, `غلط. الـ Breadcrumbs بتوري الـ users فين، مش يعملوا إيه بعد كده.`, `صح. الـ CTA الواضح بيقول للـ users يعملوا إيه بعد كده.`, `غلط. الـ Alert messages بتبلّغ الـ users؛ مش هي الـ CTA.`],
    [`غلط. ده ضد الـ layout guideline.`, `صح. الـ background ميبقاش معقد وميشتتش عن المحتوى.`]
  ]
};

AR.hci.exams = [
  { sections: [
    { items: [
      { why: `الـ Papers والـ studies دي حد تاني عملها، يبقى ده secondary research (L3).` },
      { why: `الـ Tactical (design) research بيحصل <b>أثناء</b> الـ design. الـ research اللي بييجي بعد الـ launch اسمه post-launch research (L3).` },
      { why: `معكوس. الـ Low-fidelity prototypes هي اللي أسرع وأسهل وأرخص (L8).` },
      { why: `المقارنة حاطة "easier to coordinate the logistics" تحت الأفراد (L6).` },
      { why: `خلي الـ surveys صغيرة على قد ما تقدر. الأسئلة الكتير بتقلل الـ response rate والـ reliability (L4).` },
      { why: `ده الـ UI design. الـ UX هو التجربة الكاملة (L1).` },
      { why: `الـ Surveys مذكورة ضمن الطرق الـ primary المنتشرة (L3).` },
      { why: `الكورس كله عن الـ user-centered design: دخّل الـ users من بدري وكتير، والـ prototypes معمولة أصلاً عشان تاخد feedback (L3، L7).` },
      { why: `الاتنين مذكورين كطرق primary (L3).` },
      { why: `الـ data الأرقام دي quantitative. الـ Qualitative عن ليه وإزاي (L4).` }
    ]},
    { items: [
      { why: `الـ Privacy بتحمي الـ PII والـ SPII بتوع الـ users. باقي الاختيارات ملهاش علاقة أو عكس الـ privacy.` },
      { why: `خطط من بدري، بس "الـ script مش كتاب مقدس". اعمل combination من الـ methods وخلي الـ privacy أساسية.` },
      { why: `L4: الـ quantitative (data أرقام) "easier for engineers and technical people to handle" يعني أسهل للـ engineers والناس الـ technical.` },
      { why: `خليه صغير، وواضح، وخلي بالك من الـ bias، وخد feedback من المشاركين.` },
      { why: `نفس سؤال رقم 1، متطبع مرتين في الورقة.` },
      { why: `الـ wireframe هيكل فيه placeholders ومفيهوش ألوان ولا fonts عن قصد.` },
      { why: `المحاضرة بتذكر Figma و Adobe XD و Sketch و Balsamiq و Pencil.` },
      { why: `الـ Lo-fi سريع ورخيص وبياخد constructive feedback أكتر.` },
      { why: `الـ Observation ده primary (إنت اللي بتعمله) و qualitative (إزاي وليه). الـ statistics والأرقام quantitative، والـ logs الموجودة مش data متجمعة جديد.` },
      { why: `L4: "effort should be done before the interview to write a script of the questions" يعني لازم تتعب قبل الـ interview وتكتب script بالأسئلة.` }
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
      { why: `الـ User research بيغطي الـ users <b>و</b>الـ tasks بتاعتهم (L1).` },
      { why: `L3 بتقول إن الـ tactical research "takes place during the design phase" يعني أثناء الـ design. اللي بعد الـ design phase يبقى post-launch research. الـ key غالباً كاتب "after" بشكل مش دقيق؛ جاوب من المحاضرة إلا لو الدكتور قال غير كده.` },
      { why: `الـ Low-fidelity أسرع وأسهل وأرخص.` },
      { why: `L6: "Most common research technique" يعني الـ technique الأكتر انتشاراً.` },
      { why: `الأفراد أسهل في تنسيق الـ logistics.` },
      { why: `الـ research اللي حد تاني عمله اسمه secondary. الـ Primary هو اللي إنت بتعمله بنفسك.` },
      { why: `المبدأ هو "Be UNbiased". الـ key غالباً معتبرها typo وأصلها "Be unbiased". بس زي ما هي مكتوبة، الجملة غلط.` },
      { why: `ده الـ UI design.` },
      { why: `تعريف الـ PII من L4.` },
      { why: `الـ Surveys من أرخص الطرق؛ الـ interviews محتاجة وقت لكل شخص و incentives.` },
      { why: `تعريف L1.` },
      { why: `ده الـ UX.` },
      { why: `"Software development is research" يعني الـ software development هو research (L1).` },
      { why: `تعريف الـ prototype الكويس (L7).` },
      { why: `الـ data الأرقام دي quantitative.` }
    ]},
    { items: [
      { why: `الـ HCI والـ HMI والـ MMI كلهم أسامي لنفس المجال.` },
      { why: `الأسامي والعنوان والـ email دول PII عادي. أرقام الحسابات المالية هي الـ SPII.` },
      { why: `"Tips for good interview" في L6 بتبدأ بـ "Plan ahead and prepare your questions before the interview time"، و L4 بتقول اكتب interview script. كلام المحاضرة بيطابق "Interview". الـ key معلّم على Survey، فاذكر جملة المحاضرة لو اتسألت.` },
      { why: `اسمع كويس واكتب notes هما المفتاحين. و(b) عكس النصيحة الحقيقية.` },
      { why: `أوصاف الليه والإزاي دي qualitative.` }
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

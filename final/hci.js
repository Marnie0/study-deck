// Final-exam revision for hci: every lecture, exam-focused summary in English and Egyptian Arabic per point. Merged by build.mjs.
window.FINAL = window.FINAL || {};
FINAL.hci = {
 "lecs": [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
 ],
 "scope": "All 10 lectures",
 "scope_ar": "كل الـ 10 محاضرات",
 "sections": [
  {
   "lec": 1,
   "h": "What HCI is",
   "ar_h": "يعني إيه HCI",
   "pts": [
    [
     "<b>HCI</b>: the interaction between user and computer, OR the relationship between users and computer systems. A <b>multidisciplinary field of study</b> focusing on the design of computer technology; it started with computers and now covers <b>almost all forms of information technology design</b>.",
     "الـ <b>HCI</b> هو التفاعل بين الـ user والكمبيوتر، أو العلاقة بين الـ users والـ computer systems. وهو <b>multidisciplinary field of study</b> بيركز على تصميم الـ computer technology، بدأ بالكمبيوتر بس ودلوقتي بيغطي <b>تقريباً كل أشكال الـ information technology design</b>."
    ],
    [
     "Terms used interchangeably: <b>HCI</b>, <b>HMI</b> (Human Machine Interaction), <b>MMI</b> (Man Machine Interaction). HCI deals with the <b>Design, Implementation and Evaluation</b> of interactive systems.",
     "فيه مصطلحات بنفس المعنى: الـ <b>HCI</b>، والـ <b>HMI</b> (Human Machine Interaction)، والـ <b>MMI</b> (Man Machine Interaction). والـ HCI بيتعامل مع الـ <b>Design والـ Implementation والـ Evaluation</b> بتاع الـ interactive systems."
    ],
    [
     "HCI studies 3 things: <b>humans</b> (needs, abilities, limitations), <b>computer technologies</b> that enhance user-computer interaction, and the <b>ways, preferences and difficulties</b> faced by users of current or past systems.",
     "الـ HCI بيدرس 3 حاجات: <b>البني آدمين</b> (احتياجاتهم وقدراتهم وحدودهم)، والـ <b>computer technologies</b> اللي بتحسّن التفاعل، و<b>الطرق والتفضيلات والصعوبات</b> اللي بتقابل الـ users بتوع الأنظمة الحالية أو القديمة."
    ],
    [
     "Three parts meet in HCI: <b>User</b> (mental and physical capabilities), <b>Computer / Machine</b> (input/output devices), <b>Interaction</b> (interfaces, HCI patterns, design, usability evaluation).<br>Pie chart: <b>Human</b> = Communication theory, Industrial design, Social science, Cognitive psychology, Human factors; <b>Computer</b> = Computer graphic, Operating system, Programming language; <b>Interaction</b> = Interaction design.",
     "فيه 3 أجزاء بيتقابلوا في الـ HCI: الـ <b>User</b> (قدراته العقلية والجسدية)، والـ <b><bdi dir=\"ltr\">Computer&nbsp;/&nbsp;Machine</bdi></b> (أجهزة الـ <bdi dir=\"ltr\">input/output</bdi>)، والـ <b>Interaction</b> (الـ interfaces والـ HCI patterns والـ design والـ usability evaluation).<br>وفي الـ pie chart: جزء الـ <b>Human</b> فيه الـ Communication theory والـ Industrial design والـ Social science والـ Cognitive psychology والـ Human factors؛ وجزء الـ <b>Computer</b> فيه الـ Computer graphic والـ Operating system والـ Programming language؛ وجزء الـ <b>Interaction</b> فيه الـ Interaction design."
    ],
    [
     "<b>Objectives of HCI</b>: design for people, tasks and environments (e.g. an organization); easy, natural and intuitive systems to <b>save time</b> and <b>reduce costs</b>; design GUIs and web interfaces; explore new paradigms/prototypes and develop models and theories of interaction.",
     "<b>أهداف الـ HCI</b>: نصمم للناس وللـ tasks وللبيئات (زي organization)؛ و systems سهلة وطبيعية و intuitive عشان <b>نوفر وقت</b> و<b>نقلل التكلفة</b>؛ ونصمم GUIs و web interfaces؛ ونستكشف <bdi dir=\"ltr\">paradigms/prototypes</bdi> جديدة ونطوّر models و theories للتفاعل."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Interaction design, UI, UX and related fields",
   "ar_h": "الـ Interaction design والـ UI والـ UX والمجالات اللي حواليهم",
   "pts": [
    [
     "Interaction design definitions: <b>Sharp, Rogers, and Preece (2019)</b>: \"Designing interactive products to support the way people communicate and interact in their everyday and working lives.\" <b>Winograd (1997)</b>: \"The design of spaces for human communication and interaction.\"",
     "تعريفين للـ interaction design، الأول بتاع <b>Sharp, Rogers, and Preece (2019)</b>:<span class=\"ltr\">\"Designing interactive products to support the way people communicate and interact in their everyday and working lives.\"</span>والتاني بتاع <b>Winograd (1997)</b>:<span class=\"ltr\">\"The design of spaces for human communication and interaction.\"</span>"
    ],
    [
     "Goals of interaction design: (1) <b>develop usable products</b>, where <b>usability</b> = easy to learn, effective to use, provides an enjoyable experience; (2) <b>involve users</b> in the design process. Design must consider <b>who</b> the users are, <b>what</b> activities are carried out, and <b>where</b> interaction takes place.",
     "أهداف الـ interaction design اتنين: (1) <b>نطوّر products تبقى usable</b>، والـ <b>usability</b> معناها سهل تتعلمه، و effective في الاستخدام، وبيدّي تجربة ممتعة؛ (2) <b>نشرك الـ users</b> في الـ design process. ولازم الـ design ياخد في اعتباره <b>مين</b> الـ users، و<b>إيه</b> الـ activities، والتفاعل بيحصل <b>فين</b>."
    ],
    [
     "<b>Interaction design is the umbrella term</b> covering user interface design, software design, user-centered design, product design, web design and experience design (UX).",
     "الـ <b>Interaction design هو الـ umbrella term</b> اللي بيغطي الـ user interface design والـ software design والـ user-centered design والـ product design والـ web design والـ experience design (UX)."
    ],
    [
     "<b>UI vs UX vs HCI</b>: <b>UI</b> = interactivity, look and feel of a screen or web page; <b>UX</b> = the user's <b>overall experience</b>, it <b>dictates</b> the interactions; <b>HCI</b> = <b>understanding</b> the interactions. Trap: \"UI covers the overall experience\" is <b>False</b> (that is UX).",
     "الفرق بين الـ <b>UI</b> والـ <b>UX</b> والـ <b>HCI</b>: الـ UI هو الـ interactivity والـ look and feel بتاع الشاشة أو صفحة الويب؛ والـ UX هو <b>التجربة الكاملة</b> وهو اللي بيـ<b>حدد (dictate)</b> التفاعلات؛ والـ HCI هو <b>فهم</b> التفاعلات. فخ: جملة إن الـ UI بيغطي التجربة الكاملة <b>False</b> (دي الـ UX)."
    ],
    [
     "Hierarchy: <b>Engineering + Psychology → Human Factors Engineering</b>, which branches into Industrial Design, <b>HCI</b> and Product Design; HCI branches into UI Design, UX Design and Interaction design. Humans see millions of colors but only about <b>30 shades of gray</b>.",
     "الترتيب الهرمي:<span class=\"ltr\">Engineering + Psychology → Human Factors Engineering</span>والـ Human Factors Engineering بيتفرع لـ Industrial Design و <b>HCI</b> و Product Design؛ والـ HCI بيتفرع لـ UI Design و UX Design و Interaction design. والبني آدم بيشوف ملايين الألوان لكن حوالي <b>30 درجة رمادي</b> بس."
    ],
    [
     "Contributing to ID: <b>academic disciplines</b> = Psychology, Social Sciences, Computing Sciences, Engineering, Ergonomics, Informatics; <b>design practices</b> = Graphic design, Product design, Artist-design, Industrial design, Film industry; <b>interdisciplinary fields</b> = HF, Cognitive Engineering, HCI, Cognitive Ergonomics, CSCW, Information Systems.",
     "اللي بيساهم في الـ ID: الـ <b>academic disciplines</b> هي الـ Psychology والـ Social Sciences والـ Computing Sciences والـ Engineering والـ Ergonomics والـ Informatics؛ والـ <b>design practices</b> هي الـ Graphic design والـ Product design والـ Artist-design والـ Industrial design والـ Film industry؛ والـ <b>interdisciplinary fields</b> هي الـ HF والـ Cognitive Engineering والـ HCI والـ Cognitive Ergonomics والـ CSCW والـ Information Systems."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Invisible interface, UI design process and case studies",
   "ar_h": "الـ Invisible interface والـ UI design process والأمثلة",
   "pts": [
    [
     "<b>Invisible interface</b>: the user should <b>think about the task rather than the tool</b>; the interface vanishes. The user really interacts with the task (Zoom: the instructor interacts with students). Like a sports referee, a good interface goes <b>unnoticed</b>.",
     "الـ <b>Invisible interface</b>: الـ user المفروض <b>يفكر في الـ task مش في الأداة</b>، والـ interface يختفي. الـ user في الحقيقة بيتفاعل مع الـ task (في Zoom المحاضِر بيتفاعل مع الطلبة). وزي حكم الماتش، الـ interface الكويس <b>محدش بياخد باله منه</b>."
    ],
    [
     "<b>UI design process, 3 components</b>: (1) <b>User research</b> (the users: skills, distractions, special needs like kids, elderly, people with disabilities; their tasks; previous research on human capabilities, limitations and perception), (2) <b>Design and prototyping</b>, (3) <b>Evaluation (improvement)</b>. Software development is research: it is also <b>learning how to create the software best suited for its purpose</b>.",
     "الـ <b>UI design process فيه 3 components</b>، أولاً الـ <b>User research</b> (الـ users ومهاراتهم والحاجات اللي بتشتتهم واحتياجاتهم الخاصة زي الأطفال وكبار السن وذوي الإعاقة، والـ tasks بتاعتهم، والـ previous research عن قدرات الإنسان وحدوده وإدراكه)، وثانياً الـ <b>Design and prototyping</b>، وثالثاً الـ <b>Evaluation (improvement)</b>. والـ Software development هو research، يعني كمان <b>إنك تتعلم إزاي تعمل الـ software الأنسب لهدفه</b>."
    ],
    [
     "Design examples:<br>Bad: <b>elevator</b> (bottom-row labels and buttons look the same); <b>vending machine</b> (push a button first to activate the reader, <b>contravenes</b> the convention of inserting the bill first); <b>online book library</b> search (user research almost absent).<br>Good: <b>marble answering machine</b> (Bishop, 1995: how everyday objects behave, one-step actions); <b>TiVo remote</b> (peanut shaped, color-coded distinctive buttons); <b>ICDL</b> by <b>HCIL</b> (3M+ unique visitors, visual search <b>71%</b> of searches).<br><b>Qualcomm</b> trucker device: small buttons, but truckers have big hands and wear gloves, so a large touch screen and stylus pen.",
     "أمثلة الـ design الوحش: <b>الأسانسير</b> (الـ labels والزراير في الصف اللي تحت شكلهم واحد)؛ و<b>الـ vending machine</b> (لازم تدوس زرار الأول عشان الـ reader يشتغل، فهي <b>بتخالف</b> الـ convention إنك تحط الفلوس الأول)؛ و<b>الـ online book library</b> (الـ user research تقريباً مش موجود).<br>أمثلة الـ design الكويس: الـ <b>marble answering machine</b> (بتاعة Bishop سنة 1995، مبنية على تصرف الحاجات اليومية و one-step actions)؛ و<b>ريموت TiVo</b> (على شكل peanut وزراير color-coded ومميزة)؛ والـ <b>ICDL</b> اللي صممها الـ <b>HCIL</b> (أكتر من 3 مليون unique visitors والـ visual search كان <b>71%</b> من البحث).<br>وجهاز <b>Qualcomm</b> للسواقين: كان فيه زراير صغيرة، والسواقين إيديهم كبيرة ولابسين جوانتي، فالحل touch screen كبيرة و stylus pen."
    ],
    [
     "<b>Office case</b>: <b>Bloatware</b> = too many features, megabytes, too slow, too difficult, or simply too much. Office 2000: <b>adaptive (personalized) menus</b> (a <b>chevron</b> expands the full menu) and <b>rafted toolbars</b> (least-used buttons go to an <b>overflow</b> area) failed: scanning took twice as long, so they were turned off by default. Rule: \"Auto-customization, unless it does a perfect job, is usually worse than no customization at all.\"<br>Office 2003 <b>CEIP</b> collected anonymous usage data; Office 2007 had <b>1.3+ billion sessions</b>, <b>70%</b> of Word/Outlook data thrown away, some commands used <b>7x</b> more with the keyboard.",
     "حالة الـ <b>Office</b>: الـ <b>Bloatware</b> هو منتج فيه features كتير أوي أو megabytes كتير أو بطيء أو صعب أو ببساطة كتير أوي. في Office 2000 كان فيه <b>adaptive (personalized) menus</b> (فيها <b>chevron</b> بيفتح الـ menu كاملة) و<b>rafted toolbars</b> (الزراير الأقل استخداماً بتروح <b>overflow</b> area)، وفشلوا لأن الـ scanning خد ضعف الوقت، فاتقفلوا by default. والقاعدة:<span class=\"ltr\">\"Auto-customization, unless it does a perfect job, is usually worse than no customization at all.\"</span>وفي Office 2003 الـ <b>CEIP</b> جمع usage data مجهولة الهوية (anonymous)؛ ولـ Office 2007 كان فيه أكتر من <b>1.3 billion sessions</b>، واترمى <b>70%</b> من data الـ Word والـ Outlook، وفيه commands بتتستخدم <b>7x</b> أكتر بالـ keyboard."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Choose (Final 2024/25): \"HCI terms used interchangeably are ……\" → <b>All the above</b> (Human Computer Interaction, Human Machine Interaction, Man Machine Interaction).",
     "اختار <bdi dir=\"ltr\">(Final 2024/25)</bdi>: المصطلحات اللي بتتقال بنفس معنى الـ HCI، والإجابة <b>All the above</b> (يعني الـ Human Computer Interaction والـ Human Machine Interaction والـ Man Machine Interaction)."
    ],
    [
     "True or False (Final 2024/25): \"S/W development is not just a process of creating software, it is also a process of learning how to create the S/W best suited for its purpose.\" → <b>True</b>.",
     "صح ولا غلط <bdi dir=\"ltr\">(Final 2024/25)</bdi>: إن الـ software development مش بس إنك تعمل software، ده كمان إنك تتعلم إزاي تعمل الـ software الأنسب لهدفه، والإجابة <b>True</b>."
    ],
    [
     "True or False on the two definitions: \"UI Design covers a user's overall experience with the product or website.\" → <b>False</b>, that is UX (Final 2024/25). \"UX Design refers to interactivity, look and feel of product screen or web page.\" → <b>False</b>, that is UI (Final 2024/25 and 2025/26).",
     "صح ولا غلط على التعريفين: إن الـ UI Design بيغطي التجربة الكاملة للـ user مع المنتج أو الموقع، والإجابة <b>False</b> لأن دي الـ UX <bdi dir=\"ltr\">(Final 2024/25)</bdi>. وإن الـ UX Design هو الـ interactivity والـ look and feel بتاع الشاشة أو الصفحة، والإجابة <b>False</b> لأن ده الـ UI <bdi dir=\"ltr\">(Final 2024/25, 2025/26)</bdi>."
    ],
    [
     "True or False (Final 2024/25): \"HCI is interaction between user and computer OR relationship between users and computer systems.\" → <b>True</b> (the definition word for word). \"It is important to understand the tasks that the user requires to do.\" → <b>True</b> (user research covers the users <b>and</b> their tasks).",
     "صح ولا غلط <bdi dir=\"ltr\">(Final 2024/25)</bdi>: إن الـ HCI هو التفاعل بين الـ user والكمبيوتر أو العلاقة بين الـ users والـ computer systems، والإجابة <b>True</b> (ده التعريف بالحرف). وإن مهم نفهم الـ tasks اللي الـ user محتاج يعملها، والإجابة <b>True</b> (الـ user research بيغطي الـ users <b>والـ tasks</b> بتاعتهم)."
    ],
    [
     "Choose (Midterm 2026/27), from the pie chart: the three main components of HCI → <b>Human, Computer, Interaction</b>; computer graphics → <b>Computer</b>; operating system → <b>Computer</b>; communication theory → <b>Human</b> (trap: not Interaction, which holds only interaction design).",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi> من الـ pie chart: الـ components الأساسية التلاتة للـ HCI هما <b>Human و Computer و Interaction</b>. والـ computer graphics تبع الـ <b>Computer</b>، والـ operating system تبع الـ <b>Computer</b>، والـ communication theory تبع الـ <b>Human</b> (فخ: مش الـ Interaction، اللي فيها الـ interaction design بس)."
    ],
    [
     "Choose (Midterm 2026/27): Human Factors (HF) belongs to → <b>Interdisciplinary Fields</b>; the discipline that focuses on human thinking and mental processes → <b>Psychology / Cognitive Science</b>.",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>: الـ Human Factors (HF) تبع الـ <b>Interdisciplinary Fields</b>. والـ discipline اللي بيركز على تفكير الإنسان والـ mental processes هو الـ <b>Psychology / Cognitive Science</b>."
    ],
    [
     "Choose (Midterm 2026/27): HCI mainly focuses on → <b>the relationship between humans and computers</b>; the primary goal of HCI → <b>to improve usability and user experience</b>; limiting the number of menu options → <b>to make navigation easier</b> (the Office case: menus and toolbars were full, and people felt less in control).",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>: الـ HCI بيركز أساساً على <b>العلاقة بين البني آدمين والكمبيوتر</b>. والهدف الأساسي للـ HCI هو <b>تحسين الـ usability والـ user experience</b>. وتقليل عدد الـ menu options هدفه <b>إن الـ navigation يبقى أسهل</b> (حالة الـ Office: الـ menus والـ toolbars كانت مليانة، والناس كانت حاسة إنها مش متحكمة)."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Interaction design as a process",
   "ar_h": "الـ Interaction design كـ process",
   "pts": [
    [
     "Interaction design <b>is a process</b> focused on <b>discovering requirements</b>, designing to fulfil them, <b>producing prototypes</b> and <b>evaluating</b> them; focused on <b>users and their goals</b>; involves <b>balancing conflicting requirements</b>. <b>Generating alternatives and choosing between them is key.</b>",
     "الـ Interaction design <b>عبارة عن process</b> بيركز على <b>اكتشاف الـ requirements</b> والتصميم اللي يحققها و<b>عمل prototypes</b> و<b>تقييمها</b>؛ ومركز على <b>الـ users وأهدافهم</b>؛ وبيشمل <b>التوازن بين الـ requirements المتعارضة</b>. و<b>إنك تطلّع alternatives وتختار من بينها ده المفتاح.</b>"
    ],
    [
     "3 components: <b>User research</b>, <b>Design and prototyping</b>, <b>Evaluation (improvement)</b>. User research = <b>working with users rather than guessing</b> (<b>user-centric design</b>) and <b>invisible interfaces</b> (<b>task-oriented design</b>). Ignoring user research is common.",
     "فيه 3 components: الـ <b>User research</b> والـ <b>Design and prototyping</b> والـ <b>Evaluation (improvement)</b>. الـ User research معناه <b>تشتغل مع الـ users بدل ما تخمّن</b> (<b>user-centric design</b>)، ومعناه كمان <b>invisible interfaces</b> (<b>task-oriented design</b>). وتجاهل الـ user research حاجة منتشرة."
    ],
    [
     "<b>User-centered design</b>: takes the user's needs into consideration at <b>every step</b> (we used to design to meet a <b>functional specification</b>).",
     "الـ <b>User-centered design</b> بياخد احتياجات الـ user في الاعتبار في <b>كل خطوة</b> (زمان كنا بنصمم عشان نحقق <b>functional specification</b>)."
    ],
    [
     "<b>4 basic activities</b>: Discovering requirements, Designing alternatives, Prototyping alternative designs, Evaluating product and its user experience <b>throughout</b>. The <b>simple lifecycle model</b> (a user-centered design approach) enters at Discovering requirements; only <b>Evaluating</b> leads out to the Final product.",
     "الـ <b>4 basic activities</b> هي الـ Discovering requirements والـ Designing alternatives والـ Prototyping alternative designs والـ Evaluating product and its user experience <b>throughout</b> (يعني طول الوقت). والـ <b>simple lifecycle model</b> (مثال على user-centered design approach) بيبدأ من الـ Discovering requirements، والـ <b>Evaluating</b> بس هو اللي بيطلّع للـ Final product."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Lifecycle models and who does the design",
   "ar_h": "الـ Lifecycle models ومين بيعمل الـ design",
   "pts": [
    [
     "<b>Double diamond</b>: <b>Discover</b> (insight into the problem) → <b>Define</b> (the area to focus upon) → <b>Develop</b> (potential solutions) → <b>Deliver</b> (solutions that work). Points: Problem → Problem Definition / Design Brief → Solution.",
     "الـ <b>Double diamond</b> مراحله:<span class=\"ltr\">Discover → Define → Develop → Deliver</span>الـ Discover هو فهم المشكلة، والـ Define هو المنطقة اللي هنركز عليها، والـ Develop حلول محتملة، والـ Deliver حلول شغالة. والنقط:<span class=\"ltr\">Problem → Problem Definition / Design Brief → Solution</span>"
    ],
    [
     "Three iterative models:<br><b>Google Design Sprints</b> (Knapp et al., 2016): Unpack → Sketch → Decide → Prototype → Test → Iterate.<br><b>Joyner</b>: Need finding → Design alternative → Prototyping → Evaluation (4 phases).<br><b>Google UCD</b>: Understand (lots of research) → Specify (most important user problem) → Design (solutions, start building) → Evaluate (test with real users).",
     "تلات models كلهم iterative، أولهم الـ <b>Google Design Sprints</b> (بتاع Knapp et al. سنة 2016):<span class=\"ltr\">Unpack → Sketch → Decide → Prototype → Test → Iterate</span>وتانيهم بتاع <b>Joyner</b> (فيه 4 phases):<span class=\"ltr\">Need finding → Design alternative → Prototyping → Evaluation</span>وتالتهم الـ <b>Google UCD</b>:<span class=\"ltr\">Understand → Specify → Design → Evaluate</span>والـ Understand فيه research كتير، والـ Specify هو أهم user problem، والـ Design حلول ونبدأ نبني، والـ Evaluate نختبر مع users حقيقيين."
    ],
    [
     "Why no separate \"user research\" step in Joyner and Google: it is <b>integral to every phase</b>. Joyner: <b>\"you need users early and often\"</b>; Google: research is <b>before, during and after</b> design.",
     "ليه Joyner و Google مش مدّيين الـ user research خطوة لوحده: لأنه <b>جزء من كل مرحلة</b>. الباحث Joyner بيقول <b>\"you need users early and often\"</b>، والـ Google بتقول إنه بيحصل <b>قبل وأثناء وبعد</b> الـ design."
    ],
    [
     "Who does UI/UX: a <b>software engineer</b> (often knowing little HCI), a <b>UI/UX designer</b> on the team (small and medium companies), or <b>specialists</b> (UX researcher, UX designer, visual designer, UX engineer) in big companies like Google.",
     "مين بيعمل الـ <bdi dir=\"ltr\">UI/UX</bdi>: يا إما <b>software engineer</b> (غالباً يعرف حاجة بسيطة عن الـ HCI)، أو <b><bdi dir=\"ltr\">UI/UX designer</bdi></b> في الفريق (في الشركات الصغيرة والمتوسطة)، أو <b>specialists</b> زي الـ UX researcher والـ UX designer والـ visual designer والـ UX engineer في الشركات الكبيرة زي Google."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Users, research types and alternatives",
   "ar_h": "الـ Users وأنواع الـ research والـ alternatives",
   "pts": [
    [
     "<b>5 practical issues</b>: who are the users? their needs? how to generate alternatives? how to choose among them? how to integrate ID with other lifecycle models?<br>Users are <b>not obvious</b>: <b>382</b> distinct types of smartphone app users (Sha Zhao et al, 2016); often the user is \"everybody\". <b>Stakeholders</b> are <b>larger</b> than the direct users. Users rarely know what is possible, so explore the problem space, investigate users and their activities; focus on goals, usability and UX goals.",
     "فيه <b>5 practical issues</b>: مين الـ users؟ واحتياجاتهم إيه؟ وإزاي نطلّع alternatives؟ وإزاي نختار منها؟ وإزاي ندمج الـ ID مع الـ lifecycle models التانية؟<br>والـ users <b>مش واضحين</b>: فيه <b>382</b> نوع من users الـ smartphone apps (بحث Sha Zhao et al سنة 2016)، وكتير الـ user بيبقى \"everybody\". والـ <b>Stakeholders</b> مجموعة <b>أكبر</b> من الـ direct users. والـ users نادراً ما بيعرفوا إيه الممكن، فاستكشف الـ problem space وادرس الـ users والـ activities بتاعتهم، وركز على الـ goals والـ usability والـ UX goals."
    ],
    [
     "Research by <b>WHEN</b>: <b>Foundational</b> (strategic / generative): <b>before</b> anything is designed, finds user problems and what to build (pain points). <b>Tactical</b> (design): <b>during</b> design, feedback on prototypes. <b>Post-launch</b>: did we succeed?",
     "الـ research حسب <b>الوقت (WHEN)</b>: الـ <b>Foundational</b> (يعني strategic أو generative) بيحصل <b>قبل</b> أي تصميم، وبيحدد مشاكل الـ users وإيه اللي هنبنيه (الـ pain points). والـ <b>Tactical</b> (يعني design) بيحصل <b>أثناء</b> الـ design بـ feedback على الـ prototypes. والـ <b>Post-launch</b> بيسأل: هل نجحنا؟"
    ],
    [
     "Research by <b>WHO</b>: <b>Primary</b> = you conduct it (interviews, focus groups, surveys, usability studies, participant observations). <b>Secondary</b> = done by someone else (books, journals). Secondary is important <b>early</b> (statistics, facts, figures), saves effort and time, backs up primary findings, and is hard to replicate (experienced researchers at credible organizations).",
     "الـ research حسب <b>مين عمله (WHO)</b>: الـ <b>Primary</b> إنت اللي بتعمله (الـ interviews والـ focus groups والـ surveys والـ usability studies والـ participant observations). والـ <b>Secondary</b> حد تاني عمله (الكتب والـ journals). والـ Secondary مهم <b>في الأول</b> (statistics وحقائق وأرقام)، وبيوفر مجهود ووقت، وبيدعم الـ primary findings، وصعب تكرره (لأن عامله researchers خبرة في organizations موثوقة)."
    ],
    [
     "Alternatives: humans stick with what works, so consider alternatives. Sources: 'flair and creativity', cross-fertilization of ideas, users, seeking inspiration (similar or different products and domain). Choosing: externally-visible and measurable behavior, <b>technical feasibility</b>, evaluation with users or peers using <b>prototypes, not static documentation</b> (behavior is key), <b>quality thresholds</b> (differ per stakeholder group).",
     "الـ Alternatives: البني آدمين بيفضلوا ماسكين في اللي شغال، فلازم تفكر في alternatives. مصادرها: الـ 'flair and creativity'، والـ cross-fertilization of ideas، والـ users نفسهم، والـ inspiration من منتجات و domain شبه أو مختلفين. والاختيار بيبقى بالـ behavior اللي باين ويتقاس، والـ <b>technical feasibility</b>، والـ evaluation مع الـ users أو الـ peers بـ <b>prototypes مش static documentation</b> (الـ behavior هو المفتاح)، والـ <b>quality thresholds</b> (بتختلف من مجموعة stakeholders للتانية)."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "True or False (Final 2024/25 and 2025/26): \"Tactical research takes place after the design phase\" → <b>False</b> from the lecture (it is <b>during</b> the design phase; research after launch is post-launch research). The 2024/25 key marks it True; answer from the lecture.",
     "صح ولا غلط <bdi dir=\"ltr\">(Final 2024/25, 2025/26)</bdi>: إن الـ Tactical research بيحصل بعد مرحلة الـ design، والإجابة <b>False</b> من المحاضرة (هو بيحصل <b>أثناء</b> الـ design، واللي بعد الإطلاق اسمه post-launch research). ونموذج <bdi dir=\"ltr\">2024/25</bdi> معلّمها True، بس جاوب من المحاضرة."
    ],
    [
     "True or False on research by WHO:<br>\"Primary research is done by someone else\" → <b>False</b> (Final 2024/25).<br>\"Focus groups and interviews are examples of primary research methods\" → <b>True</b> (Final 2025/26).<br>\"Survey is a common method used in primary research\" → <b>True</b> (Final 2025/26).<br>\"Analyzing academic papers and previous research studies is an example of secondary research\" → <b>True</b> (Final 2025/26).",
     "صح ولا غلط عن الـ research حسب مين عمله:<br>إن الـ Primary research حد تاني بيعمله، والإجابة <b>False</b> <bdi dir=\"ltr\">(Final 2024/25)</bdi>.<br>وإن الـ focus groups والـ interviews أمثلة على الـ primary research، والإجابة <b>True</b> <bdi dir=\"ltr\">(Final 2025/26)</bdi>.<br>وإن الـ survey طريقة منتشرة في الـ primary research، والإجابة <b>True</b> <bdi dir=\"ltr\">(Final 2025/26)</bdi>.<br>وإن تحليل الـ academic papers والأبحاث القديمة مثال على الـ secondary research، والإجابة <b>True</b> <bdi dir=\"ltr\">(Final 2025/26)</bdi>."
    ],
    [
     "Written, 5 marks (Final 2025/26, Q2C): \"What is meant by user research based on 'When'?\": <b>Foundational</b> (strategic / generative): before anything is designed, finds user problems and what to build; <b>Tactical</b> (design): during design, feedback on prototypes; <b>Post-launch</b>: after release, did we succeed and does it meet user needs?",
     "مقالي <bdi dir=\"ltr\">5</bdi> درجات <bdi dir=\"ltr\">(Final 2025/26, Q2C)</bdi>: يعني إيه الـ user research حسب الـ \"When\"؟ اكتب التلاتة: الـ <b>Foundational</b> (strategic / generative) وده قبل أي design، بيلاقي مشاكل الـ users ونبني إيه. والـ <b>Tactical</b> (design) وده أثناء الـ design وبياخد feedback على الـ prototypes. والـ <b>Post-launch</b> وده بعد الإطلاق، نجحنا ولا لأ والـ system بيلبي احتياجات الـ users ولا لأ."
    ],
    [
     "True or False (Final 2025/26): \"User feedback is not necessary when designing a user interface.\" → <b>False</b> (user-centered design takes the user's needs into consideration at every step; \"you need users early and often\").",
     "صح ولا غلط <bdi dir=\"ltr\">(Final 2025/26)</bdi>: إن الـ user feedback مش ضروري وإنت بتصمم user interface، والإجابة <b>False</b> (الـ user-centered design بياخد احتياجات الـ user في الاعتبار في كل خطوة، و\"you need users early and often\")."
    ],
    [
     "Choose (Midterm 2026/27), Google Design Sprint: the <b>Decide</b> stage → <b>select the best idea</b>; the <b>Test</b> stage → <b>get feedback from users</b>; the main goal of Google Design Sprints → <b>to develop and test solutions quickly</b>. The lecture lists only the steps (Unpack → Sketch → Decide → Prototype → Test → Iterate); what each step does comes from Knapp et al., and the doctors confirmed these answers. ‡",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi> عن الـ Google Design Sprint: مرحلة الـ <b>Decide</b> هدفها <b>نختار أحسن فكرة</b>، ومرحلة الـ <b>Test</b> هدفها <b>ناخد feedback من الـ users</b>، والهدف الأساسي من الـ Google Design Sprints هو <b>نطوّر ونختبر الحلول بسرعة</b>. المحاضرة بتعدّ الخطوات بس:<span class=\"ltr\">Unpack → Sketch → Decide → Prototype → Test → Iterate</span>وشغل كل خطوة جاي من Knapp et al.، والدكاترة أكدوا الإجابات دي. ‡"
    ],
    [
     "Choose (Midterm 2026/27), the process: testing a prototype with real users → <b>to check whether the design meets users' needs</b>; negative feedback on a prototype → <b>improve the prototype based on feedback</b> (iterate); an example of user-centered design → <b>designing according to users' needs and abilities</b>.",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi> عن الـ process: اختبار الـ prototype مع users حقيقيين هدفه <b>نتأكد إن الـ design بيلبي احتياجاتهم</b>. ولو الـ prototype خد feedback سلبي <b>نحسّنه على حسب الـ feedback</b> (iterate). ومثال الـ user-centered design هو <b>التصميم على حسب احتياجات الـ users وقدراتهم</b>."
    ],
    [
     "Choose (Midterm 2026/27), users and alternatives: discovering users' hidden needs → <b>interviewing and observing users</b> (primary research); investigating a problem before creating a solution → <b>to ensure they solve the correct problem</b>; several ideas but limited time and resources → <b>select the most suitable ideas based on requirements</b> (how to choose among alternatives).",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi> عن الـ users والـ alternatives: عشان نكتشف الاحتياجات المستخبية <b>نعمل interviews ونراقب الـ users</b> (primary research). ونحقق في المشكلة قبل الحل <b>عشان نتأكد إننا بنحل المشكلة الصح</b>. ولو عندنا أفكار كتير والوقت والموارد محدودة <b>نختار الأفكار الأنسب على حسب الـ requirements</b> (إزاي نختار بين الـ alternatives)."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Cognition and attention",
   "ar_h": "الـ Cognition والـ Attention",
   "pts": [
    [
     "<b>Cognition</b> covers thinking, remembering, learning, daydreaming, decision-making, seeing, reading, talking, writing. A higher-level way of classifying it: <b>fast vs slow thinking (Kahneman, 2011)</b>.",
     "الـ <b>Cognition</b> بيشمل التفكير، والتذكر، والتعلم، والسرحان، واتخاذ القرارات، والرؤية، والقراية، والكلام، والكتابة. وطريقة تصنيفه على مستوى أعلى هي <bdi dir=\"ltr\"><b>fast vs slow thinking (Kahneman, 2011)</b></bdi>."
    ],
    [
     "Understanding cognition helps (3):<br>1) knowledge about what users <b>can and cannot be expected to do</b>;<br>2) identifies and explains the <b>nature and causes of problems</b> users encounter;<br>3) provides <b>theories, modeling tools, guidance and methods</b> that lead to better interactive products.",
     "فهم الـ cognition بيساعد في 3 حاجات:<br>أولاً، بيدينا معرفة بالحاجات اللي نقدر <b>نتوقع</b> إن الـ users يعملوها واللي منقدرش.<br>تانياً، بيحدد ويشرح <b>طبيعة وأسباب المشاكل</b> اللي الـ users بيقابلوها.<br>تالتاً، بيوفر الـ <b>theories والـ modeling tools والـ guidance والـ methods</b> اللي توصلنا لـ interactive products أحسن."
    ],
    [
     "The <b>6 cognitive processes</b>: 1) attention 2) perception 3) memory 4) learning 5) reading, speaking and listening 6) problem-solving, planning, reasoning and decision-making.",
     "الـ <b>6 cognitive processes</b> هما: الـ attention، والـ perception، والـ memory، والـ learning، والـ reading والـ speaking والـ listening، وأخيراً الـ problem-solving والـ planning والـ reasoning والـ decision-making."
    ],
    [
     "<b>Attention</b> allows us to focus on information that is relevant to what we are doing. It involves <b>audio and/or visual</b> senses. Two kinds: <b>focused</b> and <b>divided</b>. Design recommendation: structure information at the interface to capture attention, e.g. <b>perceptual boundaries (windows)</b> and colors.",
     "الـ <b>Attention</b> بيخلينا نركز على المعلومات اللي ليها علاقة باللي بنعمله، وبيشمل الحواس السمعية و/أو البصرية <bdi dir=\"ltr\">(audio and/or visual)</bdi>. وفيه نوعين: <b>focused</b> و <b>divided</b>. وتوصية الـ design إن المعلومات على الـ interface تتنظم بشكل يشد الـ attention، مثلاً بالـ <b>perceptual boundaries (windows)</b> والألوان."
    ],
    [
     "<b>Design implications for attention</b> (4):<br>1) Context: make information <b>salient</b> when it needs to be attended to at a given stage of a task;<br>2) techniques: color, ordering, spacing, underlining, sequencing, animation;<br>3) avoid <b>cluttering</b> visual interfaces with too much information;<br>4) support effective <b>switching and returning</b> to an interface.",
     "الـ <b>Design implications للـ attention</b> أربعة:<br>أولاً، الـ Context: خلّي المعلومة <b>salient</b> (بارزة) لما لازم ننتبه لها في مرحلة معينة من الـ task.<br>تانياً، الـ techniques هي اللون، والـ ordering، والـ spacing، والـ underlining، والـ sequencing، والـ animation.<br>تالتاً، متزحمش الـ visual interfaces بمعلومات كتير <b>(cluttering)</b>.<br>رابعاً، ادعم إن الـ user يعمل <b>switching</b> بشكل فعال ويرجع للـ interface تاني."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Attention: studies and examples",
   "ar_h": "الـ Attention: الدراسات والأمثلة",
   "pts": [
    [
     "<b>Tullis (1987)</b>: two hotel screens with the <b>same density</b> of information. 1st screen (information <b>bunched up</b>) took an average of <b>5.5 seconds</b> to search; 2nd screen (characters grouped into <b>vertical categories</b>) took <b>3.2 seconds</b>. The reason is <b>spacing</b>.",
     "الباحث <b>Tullis (1987)</b> قارن شاشتين أوتيلات فيهم <b>نفس الـ density</b> من المعلومات. الشاشة الأولى (المعلومات <b>bunched up</b>) أخدت في المتوسط <b>5.5 ثانية</b> للتدوير، والتانية (الحروف متجمعة في <b>vertical categories</b>) أخدت <b>3.2 ثانية</b>. والسبب هو الـ <b>spacing</b>."
    ],
    [
     "<b>Multitasking</b> makes people lose their train of thought, make errors and need to start over. <b>Ophir et al. (2009)</b>: heavy multitaskers are more prone to distraction than light ones and find it difficult to <b>filter irrelevant information</b>. At work: hospital workers attend to multiple real-time screens in an operating room, needing constant attention and <b>new attention and scanning strategies</b>.",
     "الـ <b>Multitasking</b> بيخلي الناس يتوهوا من الـ train of thought ويغلطوا ويبدأوا من الأول. والباحثين <b>Ophir et al. (2009)</b> لقوا إن الـ heavy multitaskers أكتر عرضة للتشتت من الـ light، وبيلاقوا صعوبة في إنهم <b>يفلتروا المعلومات اللي ملهاش لازمة</b>. وفي الشغل مثلاً، الناس في المستشفى بيتابعوا كذا شاشة real-time في أوضة العمليات، وده محتاج attention مستمر و<b>attention and scanning strategies جديدة</b>."
    ],
    [
     "<b>Phone while driving? No!</b> Driving is very demanding; drivers are prone to distraction; significant chance of accidents. <b>Caird et al. (2018)</b>: reaction times to external events are longer when talking on the phone. Drivers rely more on their <b>expectations</b> of what happens next. <b>Briggs et al. (2018)</b>: response time is slower to <b>unexpected events</b>. Imagining the other person's face competes with the processing resources needed to react to the road.",
     "استخدام الموبايل وإنت سايق؟ <b>لأ!</b> السواقة متطلبة جداً، والسواق عرضة للتشتت، وفيه احتمال كبير لحوادث. الباحثين <b>Caird et al. (2018)</b> لقوا إن الـ reaction times للأحداث الخارجية بتبقى أطول وإنت بتتكلم في التليفون. والسواق بيعتمد أكتر على <b>توقعاته</b> للي هيحصل. والباحثين <b>Briggs et al. (2018)</b> لقوا إن الـ response time أبطأ للأحداث <b>اللي مش متوقعة</b>. وتخيّل وش اللي بتكلمه بينافس على الـ processing resources اللي محتاجها للطريق."
    ],
    [
     "<b>Hands-free phones are NOT safer</b>: the same type of cognitive processing happens when talking. A <b>front seat passenger</b> is less dangerous than a remote caller: both can stop mid-sentence when a hazard is spotted, while a remote person is <b>not privy</b> to what the driver sees and carries on talking.",
     "الـ <b>Hands-free phones مش أأمن</b>، لأن نفس نوع الـ cognitive processing بيحصل وإنت بتتكلم. والكلام مع <b>راكب قاعد قدام</b> أقل خطورة من شخص remote، لأن الاتنين يقدروا يوقفوا في نص الجملة لو شافوا hazard، لكن الشخص البعيد <b>مش شايف (not privy)</b> اللي السواق شايفه وبيكمل كلام."
    ],
    [
     "<b>Generating alternatives</b>: humans tend to stick with something that works, but considering alternatives helps identify better designs. Sources (4): 1) <b>'Flair and creativity'</b>: research and synthesis 2) <b>cross-fertilization of ideas</b> from different perspectives 3) <b>users</b> can generate different designs 4) <b>seek inspiration</b>: similar or different products and domain.",
     "الـ <b>Alternatives</b>: البني آدمين بيميلوا يمسكوا في الحاجة اللي شغالة، بس التفكير في alternatives بيساعد نلاقي designs أحسن. ومصادرها أربعة: الـ <b>'Flair and creativity'</b> يعني research و synthesis، والـ <b>cross-fertilization of ideas</b> من وجهات نظر مختلفة، وإن الـ <b>users</b> نفسهم يطلّعوا designs، والـ <b>seek inspiration</b> من منتجات و domain شبه بعض أو مختلفين."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Perception",
   "ar_h": "الـ Perception",
   "pts": [
    [
     "<b>Perception</b>: how information is acquired from the world and transformed into experiences. Implication: design representations that are <b>readily perceivable</b>, e.g. text should be <b>legible</b>, icons easy to distinguish and read.",
     "الـ <b>Perception</b>: إزاي المعلومات بتتاخد من العالم وبتتحول لـ experiences. والـ implication إننا نصمم representations <b>سهل تتدرك (readily perceivable)</b>، مثلاً الـ text يبقى <b>legible</b> والـ icons سهل نفرّق بينها ونقراها."
    ],
    [
     "<b>Weller (2004)</b>: people took less time to locate items grouped using a <b>border</b> (2nd screen, 'Find French') than using <b>color contrast</b> (1st screen, 'Find Italian', alternating light blue and white). Some argue <b>too much white space</b> on web pages is detrimental to search.",
     "الباحث <b>Weller (2004)</b> لقى إن الناس أخدوا وقت أقل يلاقوا الـ items لما اتجمعت بـ <b>border</b> (الشاشة التانية، بتاعة French) عن لما اتجمعت بـ <b>color contrast</b> (الشاشة الأولى، بتاعة Italian، لبني فاتح وأبيض بالتبادل). وفيه ناس بتقول إن الـ <b>white space الكتير</b> في صفحات الويب بيضر الـ search."
    ],
    [
     "<b>Design implications for perception</b> (4): 1) icons let users <b>distinguish</b> their meaning readily 2) <b>bordering and spacing</b> are effective ways of grouping information 3) sounds should be <b>audible and distinguishable</b> 4) research proper <b>color contrast</b>: yellow on black or blue is fine; yellow on green or white is a <b>no-no</b>.",
     "الـ <b>Design implications للـ perception</b> أربعة: الـ icons تخلي الـ users <b>يفرّقوا</b> معناها بسهولة، والـ <b>bordering and spacing</b> طرق فعالة لتجميع المعلومات، والأصوات تبقى <b>مسموعة وسهل نفرّق بينها</b>، واعمل research على الـ <b>color contrast</b> الصح. الأصفر على أسود أو أزرق تمام، لكن الأصفر على أخضر أو أبيض <b>ممنوع (no-no)</b>."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Choose (Midterm 2026/27): a cognitive process → <b>Attention</b>; NOT a cognitive process → <b>Digestion</b>. The 6 processes are attention, perception, memory, learning, reading/speaking/listening, and problem-solving/planning/reasoning/decision-making.",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>: الـ cognitive process هو الـ <b>Attention</b>، واللي مش cognitive process هو الـ <b>Digestion</b> (الهضم). والـ <bdi dir=\"ltr\">6</bdi> processes هما الـ attention والـ perception والـ memory والـ learning والـ reading/speaking/listening والـ problem-solving/planning/reasoning/decision-making."
    ],
    [
     "Choose (Midterm 2026/27): \"What is attention?\" → <b>Focusing on specific information</b> (relevant to what we are doing); choosing the correct answer in an exam involves → <b>Decision-making</b>.",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>: يعني إيه attention؟ والإجابة <b>التركيز على معلومة معينة</b> (المهمة للي بنعمله). واختيار الإجابة الصح في الامتحان فيه <b>Decision-making</b>."
    ],
    [
     "Choose (Midterm 2026/27): \"Recognizing a familiar face is an example of\" → <b>Perception</b>. Trap: L4 uses recognizing someone's face as an example of <b>memory</b>, which is not among the options; the doctors confirmed Perception.",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>: التعرّف على وش مألوف مثال على إيه؟ والإجابة <b>Perception</b>. وخد بالك: محاضرة <bdi dir=\"ltr\">4</bdi> بتستخدم التعرف على وش حد كمثال على الـ <b>memory</b>، بس هي مش من الاختيارات، والدكاترة أكدوا إن الإجابة Perception."
    ],
    [
     "Also be ready for: definitions (<i>……… allows us to focus on relevant information → Attention</i>; <i>how information is acquired and transformed into experiences → Perception</i>), the lists (6 cognitive processes, 4 sources of alternatives, 4 + 4 design implications), and who found what (Tullis, Ophir, Caird, Briggs, Weller).",
     "وخليك جاهز كمان للتعريفات، زي إن اللي بيخلينا نركز على المعلومة المهمة هو الـ Attention، واللي بياخد المعلومة من العالم ويحولها لـ experiences هو الـ Perception. وكمان الـ lists (الـ <bdi dir=\"ltr\">6</bdi> cognitive processes، ومصادر الـ alternatives الأربعة، والـ design implications)، ومين لقى إيه (الـ Tullis والـ Ophir والـ Caird والـ Briggs والـ Weller)."
    ],
    [
     "Classic traps: Tullis's screens had the <b>same density</b> (the difference is spacing, 5.5 s vs 3.2 s); Weller: <b>border beats color contrast</b>; hands-free phones are <b>not</b> safer; a passenger is <b>less</b> dangerous than a remote caller (not harmless); yellow on <b>green or white</b> is the no-no.",
     "الفخاخ المشهورة: شاشتين Tullis فيهم <b>نفس الـ density</b> والفرق في الـ spacing (5.5 ثانية قصاد 3.2 ثانية). وعند Weller الـ <b>border أحسن من الـ color contrast</b>. والـ hands-free <b>مش</b> أأمن. والراكب <b>أقل</b> خطورة من الـ remote caller (مش إنه مفيش خطورة خالص). والممنوع هو الأصفر على <b>أخضر أو أبيض</b>."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Memory",
   "ar_h": "الـ Memory",
   "pts": [
    [
     "<b>Memory</b> involves recalling various kinds of knowledge that allow people to act appropriately (recognizing someone's face, remembering someone's name). We first <b>encode</b> and then <b>retrieve</b>. We don't remember everything: memory involves <b>filtering</b> and processing what is attended to. We <b>recognize</b> much better than we <b>recall</b>. <b>Henkel (2014)</b>: we remember less about objects we have photographed than ones observed with the naked eye.",
     "الـ <b>Memory</b> معناها نفتكر أنواع مختلفة من المعرفة اللي بتخلي الناس تتصرف صح (زي إنك تعرف وش حد أو تفتكر اسمه). بنعمل <b>encode</b> الأول وبعدين <b>retrieve</b>. ومش بنفتكر كل حاجة، الـ memory فيها <b>filtering</b> و processing للي بنركز معاه. وبنعمل <b>recognize</b> أحسن بكتير من الـ <b>recall</b>. والباحث <b>Henkel (2014)</b> لقى إننا بنفتكر أقل عن الحاجات اللي صورناها عن اللي شفناها بعينينا."
    ],
    [
     "<b>Context</b> (where, when, how…) affects the extent to which information can be retrieved; information encoded in a different context can be hard to recall. Example: a neighbor you only see in your apartment hallway says hello on a <b>train</b>; out of context he is hard to recognize at first.",
     "الـ <b>Context</b> (فين، وإمتى، وإزاي…) بيأثر على قد إيه المعلومة ممكن تتعمل retrieve، والمعلومة اللي اتعملها encode في context مختلف ممكن تبقى صعبة تتفتكر. مثلاً جارك اللي متعود تشوفه في طرقة العمارة بس سلّم عليك في <b>القطر</b>، فبقى صعب تعرفه في الأول عشان هو out of context."
    ],
    [
     "People are very good at remembering <b>visual cues</b> (color of items, location of objects, marks on an object) but find <b>arbitrary material</b> (birthdays, phone numbers) harder to learn and remember.",
     "الناس شاطرة جداً في الـ <b>visual cues</b> (لون الحاجات، ومكانها، والعلامات اللي عليها)، لكن الـ <b>arbitrary material</b> (زي أعياد الميلاد وأرقام التليفونات) أصعب في التعلم والتذكر."
    ],
    [
     "<b>George Miller (1956)</b>: immediate memory capacity is very limited to <b>7, + or - 2</b> (so 5 to 9 items). It has been applied in interaction design when deciding <b>how many options to display</b>. The lecture <i>questions</i> it (only 7 options on a menu? 7 icons on a tool bar? 7 bullets? 7 pull down items? 7 tabs?) and gives no answer.",
     "نظرية <b>George Miller (1956)</b> بتقول إن الـ immediate memory capacity محدودة جداً بـ <bdi dir=\"ltr\">7,&nbsp;+&nbsp;or&nbsp;-&nbsp;2</bdi>، يعني من 5 لـ 9 حاجات. واتطبقت في الـ interaction design لما نقرر <b>هنعرض كام option</b>. والمحاضرة <i>بتشكك</i> فيها (هل نعرض 7 options بس في الـ menu؟ و7 icons على الـ tool bar؟ و7 bullets؟ و7 items في الـ pull down؟ و7 tabs؟) ومن غير إجابة."
    ],
    [
     "<b>Design implications for memory</b> (3): 1) reduce <b>cognitive load</b> by avoiding long and complicated procedures 2) promote <b>recognition rather than recall</b> 3) provide various ways of <b>labelling digital information</b>: folders, categories, color, flagging, time stamping.",
     "الـ <b>Design implications للـ memory</b> تلاتة: نقلل الـ <b>cognitive load</b> ونبعد عن الـ procedures الطويلة والمعقدة، ونشجع الـ <b>recognition بدل الـ recall</b>، وندي طرق مختلفة لـ <b>labelling الـ digital information</b> زي الـ folders والـ categories واللون والـ flagging والـ time stamping."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Learning",
   "ar_h": "الـ Learning",
   "pts": [
    [
     "<b>Learning</b>: the accumulation of skills and knowledge involving memory. <b>Incidental</b> (recognizing faces, what you did today) vs <b>intentional</b> (studying for an exam, learning to cook); intentional is <b>much harder</b>. Technologies that help: multimedia, animations, VR. People find manuals hard and prefer to <b>learn by doing</b>.",
     "الـ <b>Learning</b> هو تجميع skills ومعرفة بيعتمد على الـ memory. فيه <b>incidental</b> (زي إنك تعرف الوشوش أو اللي عملته النهارده) وفيه <b>intentional</b> (زي المذاكرة للامتحان أو تعلم الطبخ)، والـ intentional <b>أصعب بكتير</b>. والـ technologies اللي بتساعد هي الـ multimedia والـ animations والـ VR. والناس بتلاقي الـ manual صعب وبتفضل <b>learn by doing</b>."
    ],
    [
     "<b>Design implications for learning</b> (3): 1) <b>encourage exploration</b> 2) <b>constrain and guide</b> learners 3) <b>dynamically linking</b> concepts and representations facilitates learning complex material.",
     "الـ <b>Design implications للـ learning</b> تلاتة: interfaces <b>بتشجع الـ exploration</b>، وinterfaces <b>بتقيّد وتوجّه (constrain and guide)</b> اللي بيتعلم، والـ <b>dynamically linking</b> بين الـ concepts والـ representations بيسهّل تعلم الحاجات المعقدة."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Reading, speaking, listening and reflective cognition",
   "ar_h": "القراية والكلام والسماع والـ reflective cognition",
   "pts": [
    [
     "The ease of reading, listening and speaking differs: many prefer <b>listening</b> to reading; <b>reading</b> can be <b>quicker</b> than speaking or listening; listening requires <b>less cognitive effort</b> than reading or speaking.",
     "سهولة القراية والسماع والكلام بتختلف: ناس كتير بتفضل الـ <b>listening</b> عن القراية، والـ <b>reading</b> ممكن تبقى <b>أسرع</b> من الكلام أو السماع، والـ listening محتاج <b>cognitive effort أقل</b> من القراية أو الكلام."
    ],
    [
     "Applications: <b>voice user interfaces</b> (users ask questions: Google Voice, Siri, Alexa); <b>speech-output systems</b> (artificially-generated speech: text-to-speech for the visually impaired); <b>natural-language systems</b> (users type questions, text-based responses: chatbots).",
     "التطبيقات: الـ <b>voice user interfaces</b> (الـ user بيسأل بصوته، زي الـ Google Voice والـ Siri والـ Alexa)، والـ <b>speech-output systems</b> (بتستخدم speech متولد صناعياً، زي الـ text-to-speech لضعاف البصر)، والـ <b>natural-language systems</b> (الـ user بيكتب السؤال والرد نصي، زي الـ chatbots)."
    ],
    [
     "<b>Design implications</b> (3): 1) speech-based menus and instructions should be <b>short</b> 2) <b>accentuate the intonation</b> of artificially generated voices (harder to understand than human voices) 3) allow <b>making text large</b> on a screen.",
     "الـ <b>Design implications</b> تلاتة: الـ menus والـ instructions اللي بالصوت تبقى <b>قصيرة</b>، و<b>نبرز الـ intonation</b> للأصوات الصناعية (لأنها أصعب في الفهم من الأصوات البشرية)، ونسمح إن الـ user <b>يكبّر النص</b> على الشاشة."
    ],
    [
     "Problem-solving, planning, reasoning and decision-making involve <b>reflective cognition</b>: thinking about what to do, the options and the consequences. Often conscious processes, discussion with others (or oneself), and <b>artifacts</b> (maps, books, pen and paper); working through scenarios and <b>weighing up alternatives</b>.",
     "الـ problem-solving والـ planning والـ reasoning والـ decision-making كلهم فيهم <b>reflective cognition</b>، يعني تفكر هتعمل إيه وإيه الـ options والعواقب. وغالباً فيهم conscious processes ونقاش مع الناس (أو مع نفسك) واستخدام <b>artifacts</b> (خرايط، وكتب، وورقة وقلم)، وإنك تمشي في scenarios مختلفة و<b>توازن بين البدائل</b>."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Choose (Midterm 2026/27), reflective cognition: decision-making means → <b>choosing between different options</b>; reasoning involves → <b>thinking logically</b>; higher-level thinking skills → <b>problem-solving, planning and reasoning</b>.",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi> عن الـ reflective cognition: الـ decision-making معناه <b>الاختيار بين options مختلفة</b>، والـ reasoning فيه <b>تفكير منطقي</b>، والـ higher-level thinking skills هما <b>الـ problem-solving والـ planning والـ reasoning</b>."
    ],
    [
     "Choose (Midterm 2026/27): \"Which of the following follows the slide's recommendation?\" → <b>7 tabs on a website</b> (the doctors confirmed it; 15 menu options, 20 bullets and 12 toolbar icons are all above 9). The slide itself only <i>questions</i> the 7 ± 2 rule and gives no answer, so in a written answer say both: Miller's limit is 7 ± 2 (5 to 9 items), and the lecture asks whether it really applies to menus, icons, bullets and tabs.",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>: أنهي واحدة ماشية مع توصية الـ slide؟ والإجابة <b><bdi dir=\"ltr\">7 tabs on a website</bdi></b> (الدكاترة أكدوها، والـ <bdi dir=\"ltr\">15</bdi> options والـ <bdi dir=\"ltr\">20</bdi> bullets والـ <bdi dir=\"ltr\">12</bdi> icons كلهم فوق الـ <bdi dir=\"ltr\">9</bdi>). بس الـ slide نفسها <i>بتسأل</i> عن قاعدة <bdi dir=\"ltr\">7&nbsp;±&nbsp;2</bdi> ومش بتجاوب، فلو السؤال مقالي قول الاتنين: حد Miller هو <bdi dir=\"ltr\">7&nbsp;±&nbsp;2</bdi> (من <bdi dir=\"ltr\">5</bdi> لـ <bdi dir=\"ltr\">9</bdi> items)، والمحاضرة بتسأل هل ده فعلاً ينطبق على الـ menus والـ icons والـ bullets والـ tabs."
    ],
    [
     "Also be ready for: definitions (memory, learning, reflective cognition), the two types of learning with examples, Miller's <b>7, + or - 2</b>, and the three lists of design implications (memory, learning, reading/speaking/listening).",
     "وخليك جاهز كمان للتعريفات (الـ memory والـ learning والـ reflective cognition)، ونوعين الـ learning بالأمثلة، ونظرية Miller بتاعة <bdi dir=\"ltr\">7,&nbsp;+&nbsp;or&nbsp;-&nbsp;2</bdi>، والـ design implications التلاتة (للـ memory، وللـ learning، وللقراية والكلام والسماع)."
    ],
    [
     "Classic traps: encode <b>before</b> retrieve; recognition is <b>easier</b> than recall (so promote recognition); <b>intentional</b> learning is the harder one; listening = <b>less effort</b>, reading = <b>quicker</b>; Siri = voice UI, text-to-speech = speech-output, chatbot = natural-language system.",
     "الفخاخ المشهورة: الـ encode <b>قبل</b> الـ retrieve. والـ recognition <b>أسهل</b> من الـ recall (فبنشجع الـ recognition). والـ <b>intentional</b> هو الأصعب. والـ listening <b>مجهوده أقل</b> لكن الـ reading <b>أسرع</b>. والـ Siri تبع الـ voice UI، والـ text-to-speech تبع الـ speech-output، والـ chatbot تبع الـ natural-language system."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "UI Design vs UX Design",
   "ar_h": "الـ UI Design والـ UX Design",
   "pts": [
    [
     "<b>Note</b>: the doctors' Lecture 5 is split over two lectures here: UI/UX, the UX process, user research, surveys and tips are in <b>L5</b>; \"How to ask good survey questions\" and the exercise are in <b>L6</b>.",
     "<b>خد بالك</b>: محاضرة الدكاترة رقم <bdi dir=\"ltr\">5</bdi> متقسمة هنا على محاضرتين: الـ UI والـ UX والـ UX process والـ user research والـ surveys والـ tips في <b><bdi dir=\"ltr\">L5</bdi></b>، وجزء <bdi dir=\"ltr\">\"How to ask good survey questions\"</bdi> والتمرين في <b><bdi dir=\"ltr\">L6</bdi></b>."
    ],
    [
     "<b>UI Design</b>: <b>interactivity, look and feel</b> of a product screen or web page. <b>UX Design</b>: a user's <b>overall experience</b> with the product or website. Trap: swapping them is False in the exam.",
     "الـ <b>UI Design</b> هو الـ <b>interactivity والـ look and feel</b> بتاع شاشة المنتج أو صفحة الويب. والـ <b>UX Design</b> هو <b>التجربة الكاملة</b> بتاعة الـ user مع المنتج أو الموقع. والفخ: لو بدّلوهم في الامتحان تبقى الإجابة False."
    ],
    [
     "Wheels: <b>UX</b> = Useful, Satisfiable, Convenient, Credible, Accessible, Desirable, Valuable. <b>UI</b> = Color Scheme, Typography, Layout, Images, Forms, Buttons, Content.",
     "العجل: الـ <b>UX</b> فيها الـ Useful والـ Satisfiable والـ Convenient والـ Credible والـ Accessible والـ Desirable والـ Valuable. والـ <b>UI</b> فيها الـ Color Scheme والـ Typography والـ Layout والـ Images والـ Forms والـ Buttons والـ Content."
    ],
    [
     "<b>UI designers</b> focus on: colors and typography, buttons and icons, layout and spacing, images and visual style, consistency across screens.",
     "الـ <b>UI designers</b> بيركزوا على: الألوان والـ typography، والزراير والـ icons، والـ layout والـ spacing، والصور والـ visual style، والـ consistency بين الشاشات."
    ],
    [
     "<b>UX designers</b> focus on: user needs and research, user journeys and flows, wireframes and prototypes, ease of use, usability testing.",
     "الـ <b>UX designers</b> بيركزوا على: احتياجات الـ user والـ research، والـ user journeys والـ flows، والـ wireframes والـ prototypes، وسهولة الاستخدام، والـ usability testing."
    ],
    [
     "<b>Pizza app</b>: UI designer = pizza photos, colors, button shape, where the text appears; UX designer = customers can find a pizza, customize, pay easily, track delivery without confusion. Beautiful but confusing navigation = <b>good UI, poor UX</b>; easy but unattractive = <b>good UX, poor UI</b>; the best products combine both.",
     "مثال الـ <b>pizza app</b>: الـ UI designer بيقرر صور البيتزا والألوان وشكل الزراير ومكان الكلام، والـ UX designer بيتأكد إن الزبون يلاقي البيتزا ويظبط الأوردر ويدفع بسهولة ويتابع الـ delivery من غير لخبطة. ولو جميل بس الـ navigation ملخبط يبقى <b>UI كويس وUX وحش</b>، ولو سهل بس شكله مش حلو يبقى <b>UX كويس وUI وحش</b>، وأحسن المنتجات بتجمع الاتنين."
    ],
    [
     "Skills: <b>UI</b> = visual design, color theory, typography, layout and composition, design systems, tools like Figma. <b>UX</b> = user research, problem-solving, information architecture, user flows and journey maps, wireframing and usability testing, tools like Figma plus research and testing tools. <b>Figma is used for both.</b>",
     "الـ Skills: الـ <b>UI</b> محتاج الـ visual design والـ color theory والـ typography والـ layout and composition والـ design systems وأدوات زي Figma. والـ <b>UX</b> محتاج الـ user research والـ problem-solving والـ information architecture والـ user flows والـ journey maps والـ wireframing والـ usability testing وأدوات زي Figma وأدوات الـ research والـ testing. و<b>Figma بيتستخدم للاتنين</b>."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "UX Design Process and user research",
   "ar_h": "الـ UX Design Process والـ user research",
   "pts": [
    [
     "<b>UX Design Process, 3 components</b>: 1- user research, 2- design and prototyping of the interface, 3- user interface evaluation (improvement).",
     "الـ <b>UX Design Process فيه <bdi dir=\"ltr\">3</bdi> components</b>: الـ user research، والـ design and prototyping بتاع الـ interface، والـ user interface evaluation (improvement)."
    ],
    [
     "Figure: a cycle <b>User Research → Design → Build</b> and back, with \"Iterate to validate your ideas\" and \"Iterate to design around constraints\" inside.",
     "الرسمة cycle:<span class=\"ltr\">User Research → Design → Build → User Research</span>وجواها:<span class=\"ltr\">Iterate to validate your ideas</span><span class=\"ltr\">Iterate to design around constraints</span>"
    ],
    [
     "<b>User research</b>: learn about the <b>users</b> (skills, possible distractions, special needs such as kids, elderly, people with disabilities), the <b>tasks</b> they try to complete, and <b>research done before</b> on human capabilities, limitations and perception. Invisible interface (idle concept): see L1.",
     "الـ <b>User research</b>: تتعلم عن الـ <b>users</b> (مهاراتهم، والحاجات اللي بتشتتهم، والاحتياجات الخاصة زي الأطفال وكبار السن وذوي الإعاقة)، والـ <b>tasks</b> اللي بيحاولوا يخلصوها، و<b>الأبحاث القديمة</b> عن قدرات الإنسان وحدوده وإدراكه. والـ Invisible interface (idle concept) متشرح في <bdi dir=\"ltr\">L1</bdi>."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Surveys and tips for a good survey",
   "ar_h": "الـ Surveys ونصايح تصميم survey كويس",
   "pts": [
    [
     "<b>Surveys</b>: quick responses in a short time from a <b>large number of users</b> (broad view), often <b>online</b> and easily created, one of the <b>cheapest</b> methods of user research.",
     "الـ <b>Surveys</b>: ردود سريعة في وقت قصير من <b>عدد كبير من الـ users</b> (نظرة واسعة)، وغالباً <b>online</b> وسهل تعملها، ومن <b>أرخص</b> methods الـ user research."
    ],
    [
     "A survey can be an <b>initial step</b> (motivations, preferences, priorities, pain points) whose findings plan later activities such as interviews, or can <b>follow</b> an interview or usability study.",
     "الـ survey ممكن يبقى <b>خطوة أولى</b> (الدوافع والتفضيلات والأولويات والـ pain points) ونتايجه بتخطط لأنشطة بعدها زي الـ interviews، أو <b>ييجي بعد</b> interview أو usability study."
    ],
    [
     "<b>Tips</b>: keep it as small as possible, since too many questions affect response rate and reliability of data; ask the <b>minimum</b> that gets the data you need and will use; be aware of <b>bias</b>; get <b>feedback from participants</b>.",
     "الـ <b>Tips</b>: خليها صغيرة على قد ما تقدر، لأن الأسئلة الكتير بتأثر على الـ response rate والـ reliability، واسأل <b>أقل عدد</b> يجيب الـ data اللي محتاجها وهتستخدمها، وخلي بالك من الـ <b>bias</b>، وخد <b>feedback من المشاركين</b>."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "From last year's slides (not in this term's deck)",
   "ar_h": "من slides السنة اللي فاتت (مش في الـ deck بتاعة السنة دي)",
   "pts": [
    [
     "These sections stay in L5 with a \"Last year's slides\" tag, and past exams ask about them: <b>Quantitative</b> = numeric data (easier for engineers); <b>Qualitative</b> = why and how, often interviews.",
     "الأجزاء دي موجودة في <bdi dir=\"ltr\">L5</bdi> وعليها tag <bdi dir=\"ltr\">\"Last year's slides\"</bdi>، وامتحانات قديمة سألت منها: الـ <b>Quantitative</b> هو data رقمية (أسهل للـ engineers)، والـ <b>Qualitative</b> عن ليه وإزاي وغالباً من interviews."
    ],
    [
     "<b>Primary</b> = you collect it (specific, costs more); <b>Secondary</b> = someone else collected it (cheap and quick, may be old or not specific).",
     "الـ <b>Primary</b> إنت اللي بتجمعه (specific لاحتياجاتك وبيكلّف أكتر)، والـ <b>Secondary</b> حد تاني جمعه (رخيص وسريع، بس ممكن يكون قديم أو مش specific)."
    ],
    [
     "<b>PII</b> = names, home address, email, phone. <b>SPII</b> = SSN, driver's license, passport, financial account numbers, date of birth (loss could cause financial harm, embarrassment or discrimination). Collect only what you need, do not link it to PII or SPII, do not keep it after you no longer need it.",
     "الـ <b>PII</b> هي الأسامي وعنوان البيت والـ email والتليفون. والـ <b>SPII</b> هي الـ SSN ورخصة السواقة والـ passport وأرقام الحسابات المالية وتاريخ الميلاد (لو ضاعت ممكن تعمل ضرر مالي أو إحراج أو تمييز). اجمع اللي محتاجه بس، ومتربطهاش بالـ PII أو الـ SPII، ومتحتفظش بيها بعد ما متبقاش محتاجها."
    ],
    [
     "General tips: plan ahead (an interview script; \"the script is not a bible\"), combine methods in a relevant order, improve by testing and iteration, protect privacy and security.",
     "نصايح عامة: خطط من بدري (script للـ interview، و<bdi dir=\"ltr\">\"the script is not a bible\"</bdi>)، واستخدم combination من الـ methods بترتيب مناسب، وحسّن بالـ testing والـ iteration، واحمي الـ privacy والـ security."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "True or False: \"UI Design covers a user's overall experience with the product or website.\" → <b>False</b> (Final 2024/25). \"UX Design refers to interactivity, look and feel of product screen or web page.\" → <b>False</b> (Final 2024/25 and 2025/26). They swapped the definitions.",
     "صح ولا غلط: إن الـ UI Design بيغطي التجربة الكاملة، والإجابة <b>False</b> <bdi dir=\"ltr\">(Final 2024/25)</bdi>. وإن الـ UX Design هو الـ interactivity والـ look and feel، والإجابة <b>False</b> <bdi dir=\"ltr\">(Final 2024/25, 2025/26)</bdi>. بدّلوا التعريفين."
    ],
    [
     "True or False: \"Survey is more expensive than interview.\" → <b>False</b> (Final 2024/25). \"A well-designed survey should take a long time to complete to ensure detailed responses.\" → <b>False</b> (Final 2025/26).",
     "صح ولا غلط: إن الـ Survey أغلى من الـ interview، والإجابة <b>False</b> <bdi dir=\"ltr\">(Final 2024/25)</bdi>. وإن الـ survey الكويس لازم ياخد وقت طويل عشان ردود مفصلة، والإجابة <b>False</b> <bdi dir=\"ltr\">(Final 2025/26)</bdi>."
    ],
    [
     "From last year's parts:<br>\"Qualitative research involves data of numeric nature.\" → <b>False</b> (Final 2024/25 and 2025/26).<br>Descriptions from interviewees → <b>Qualitative data</b> (Final 2024/25).<br>Quantitative research is easier for → <b>Engineers and technical people</b> (Final 2025/26).<br>\"PII is specific details that could be used to identify a user such as names, phone number.\" → <b>True</b> (Final 2024/25).<br>SPII includes → <b>Financial account numbers</b> (Final 2024/25).",
     "من أجزاء السنة اللي فاتت:<br>إن الـ Qualitative research فيه data رقمية، والإجابة <b>False</b> <bdi dir=\"ltr\">(Final 2024/25, 2025/26)</bdi>.<br>الأوصاف اللي جاية من اللي بنعملهم interview، والإجابة <b>Qualitative data</b> <bdi dir=\"ltr\">(Final 2024/25)</bdi>.<br>الـ Quantitative research أسهل على مين، والإجابة <b>الـ Engineers والناس الـ technical</b> <bdi dir=\"ltr\">(Final 2025/26)</bdi>.<br>وإن الـ PII تفاصيل تعرّف الـ user زي الأسامي ورقم التليفون، والإجابة <b>True</b> <bdi dir=\"ltr\">(Final 2024/25)</bdi>.<br>والـ SPII بتشمل إيه، والإجابة <b>أرقام الحسابات المالية</b> <bdi dir=\"ltr\">(Final 2024/25)</bdi>."
    ],
    [
     "From last year's parts, choose (Final 2025/26): privacy and security matter in user research because → <b>it ensures compliance and protects user data</b> (printed twice on the paper); good practice → <b>prepare questions ahead but adapt as needed during the session</b> (\"the script is not a bible\"); before a user interview → <b>write a script of questions to guide the interview</b>; a qualitative primary method → <b>observing users interacting with a prototype</b>.",
     "من أجزاء السنة اللي فاتت، اختار <bdi dir=\"ltr\">(Final 2025/26)</bdi>: الـ privacy والـ security مهمين في الـ user research لأنهم <b>بيضمنوا الـ compliance وبيحموا data الـ users</b> (السؤال اتطبع مرتين في الورقة). والـ good practice هي <b>تجهز الأسئلة قبلها بس تعدّل حسب الحاجة أثناء الـ session</b> (الـ script مش كتاب مقدس). وقبل الـ interview <b>تكتب script للأسئلة</b>. ومثال الـ qualitative primary method هو <b>مراقبة الـ users وهم بيستخدموا prototype</b>."
    ],
    [
     "Choose (Midterm 2026/27): NOT a key factor in HCI → <b>Machine learning</b> (usability, UI and UX are); the skill mainly related to UX design → <b>User research</b> (visual design, color theory, layout and composition are UI skills).",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>: اللي مش key factor في الـ HCI هو الـ <b>Machine learning</b> (لكن الـ usability والـ UI والـ UX key factors). والـ skill المرتبطة أساساً بالـ UX design هي الـ <b>User research</b> (أما الـ visual design والـ color theory والـ layout and composition فدي UI skills)."
    ],
    [
     "From last year's parts: written, 5 marks: Final 2024/25 Q2A \"What is the difference between primary research and secondary research?\", Final 2025/26 Q2A \"Compare between primary research and secondary research.\": draw the table (L5, Primary vs secondary research).",
     "من أجزاء السنة اللي فاتت: سؤال مقالي <bdi dir=\"ltr\">5</bdi> درجات، في <bdi dir=\"ltr\">Final 2024/25 Q2A</bdi> جه:<span class=\"ltr\">What is the difference between primary research and secondary research?</span>وفي <bdi dir=\"ltr\">Final 2025/26 Q2A</bdi> جه:<span class=\"ltr\">Compare between primary research and secondary research.</span>ارسم الجدول <bdi dir=\"ltr\">(L5, Primary vs secondary research)</bdi>."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "How to ask good survey questions: Clear, Concise, Specific",
   "ar_h": "إزاي تسأل أسئلة survey كويسة: Clear و Concise و Specific",
   "pts": [
    [
     "This is the second half of the doctors' Lecture 5 (see the note in L5). The six principles: <b>Be Clear, Concise, Specific, Expressive, Unbiased, Usable</b>.",
     "ده النص التاني من محاضرة الدكاترة رقم <bdi dir=\"ltr\">5</bdi> (شوف الملحوظة في <bdi dir=\"ltr\">L5</bdi>). والـ <bdi dir=\"ltr\">6</bdi> مبادئ هما:<span class=\"ltr\">Be Clear, Be Concise, Be Specific, Be Expressive, Be Unbiased, Be Usable</span>"
    ],
    [
     "<b>Be Clear</b>:<br>label numeric scales (1 - Highly dissatisfied … 5 - Highly Satisfied);<br>no overlapping ranges (0-2, 3-5, 6-10, 11-19, 20+);<br>when in doubt give extra detail (\"tablet computer (i.e., any computer with a touchscreen and detachable keyboard)\");<br>timebox frequency (\"In the past seven days, how many times…\").",
     "الـ <b>Be Clear</b>: حط labels للـ numeric scale، زي:<span class=\"ltr\">1 - Highly dissatisfied … 5 - Highly Satisfied</span>ومتخليش الـ ranges متداخلة، زي:<span class=\"ltr\">0-2, 3-5, 6-10, 11-19, 20+</span>ولو شاكك زوّد تفاصيل (زي شرح الـ tablet computer)، وحط إطار زمني للتكرار:<span class=\"ltr\">In the past seven days, how many times…</span>"
    ],
    [
     "<b>Be Concise</b>: plain language (\"How clean was the car?\").",
     "الـ <b>Be Concise</b>: لغة بسيطة:<span class=\"ltr\">How clean was the car?</span>"
    ],
    [
     "<b>Be Specific</b>:<br>no super-big ideas (\"…how quickly the interface responded to your commands?\" plus follow-ups);<br>no double-barrel questions (split speed and availability);<br>no internal conflict (split food into temperature, appearance, flavor).",
     "الـ <b>Be Specific</b>: مفيش super-big ideas (اسأل عن سرعة استجابة الـ interface وبعدها follow-ups)، ومفيش double-barrel (قسّم الـ speed والـ availability)، ومفيش internal conflict (قسّم الأكل لـ temperature و appearance و flavor)."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Expressive, Unbiased, Usable",
   "ar_h": "الـ Expressive والـ Unbiased والـ Usable",
   "pts": [
    [
     "<b>Be Expressive</b>:<br>emphasize the user's opinion (\"too high, too low, or about right?\");<br>ranges instead of yes/no (\"In the past seven days, how much time…? 0 hours / &lt;1 hour / 1-2 / 3-5 / 6-9 / 10+ hours\");<br>levels of frequency or agreement (5 levels instead of Dissatisfied/Satisfied);<br>multiple selections when possible (checkboxes).",
     "الـ <b>Be Expressive</b>: ركّز على رأي الـ user:<span class=\"ltr\">too high, too low, or about right?</span>واستخدم ranges بدل <bdi dir=\"ltr\">yes/no</bdi>، زي:<span class=\"ltr\">0 hours / &lt;1 hour / 1-2 / 3-5 / 6-9 / 10+ hours</span>وادّي مستويات (<bdi dir=\"ltr\">5</bdi> مستويات بدل <bdi dir=\"ltr\">Dissatisfied/Satisfied</bdi>)، واسمح بأكتر من اختيار (checkboxes)."
    ],
    [
     "<b>Be Unbiased</b>:<br>add \"Other: ____\" (nominal categories);<br>leave open-ended questions open;<br>no leading questions (\"Did our brand-new AI-based interface…\");<br>no loaded words (\"wasted\" → \"spent\").",
     "الـ <b>Be Unbiased</b>: ضيف:<span class=\"ltr\">Other: ____</span>وسيب الأسئلة المفتوحة مفتوحة، ومفيش leading questions (زي <bdi dir=\"ltr\">\"brand-new AI-based\"</bdi>)، ومفيش loaded words (زي <bdi dir=\"ltr\">wasted</bdi> بدل <bdi dir=\"ltr\">spent</bdi>)."
    ],
    [
     "<b>Be Usable</b>: progress bar, consistent page lengths, logical order, alert unanswered questions, preview the survey yourself.",
     "الـ <b>Be Usable</b>: الـ progress bar، وأطوال صفحات ثابتة، وترتيب منطقي، وتنبيه على الأسئلة اللي متجاوبتش، واعمل preview للـ survey بنفسك."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Exercise: evaluate survey questions",
   "ar_h": "تمرين: قيّم أسئلة الـ survey",
   "pts": [
    [
     "The exercise's questions, with our matching: \"1 to 4, 1 = a lot, 4 = not at all\" (<b>ambiguous / reversed scale</b>); \"Why do you like to exercise?\" (<b>leading</b>); \"1 to 6, 1 = not at all\" (<b>changing number of options, reversing scale</b>); \"Have you listened to an audiobook this year?\" (<b>yes/no</b>).",
     "أسئلة التمرين مع التوصيل بتاعنا: السؤال بتاع:<span class=\"ltr\">1 to 4, 1 = a lot, 4 = not at all</span>فيه <b>scale مش واضح / معكوس</b>. والسؤال:<span class=\"ltr\">Why do you like to exercise?</span>ده <b>leading</b>. والسؤال بتاع:<span class=\"ltr\">1 to 6, 1 = not at all</span>فيه <b>عدد options بيتغير وscale معكوس</b>. والسؤال:<span class=\"ltr\">Have you listened to an audiobook this year?</span>ده <b><bdi dir=\"ltr\">yes/no</bdi></b>."
    ],
    [
     "The slide lists five problems without saying which question each belongs to: Ambiguous scale, Changing number of options, Reversing scale, Leading questions, Yes/no questions. The matching above is our reading.",
     "الـ slide كاتبة <bdi dir=\"ltr\">5</bdi> مشاكل من غير ما تقول كل مشكلة تبع أنهي سؤال:<span class=\"ltr\">Ambiguous scale, Changing number of options, Reversing scale, Leading questions, Yes/no questions</span>والتوصيل اللي فوق ده قراءتنا إحنا."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Written, 5 marks (Final 2024/25, Q2B): \"Evaluate the following survey questions\": <b>Do you use social media?</b> (yes/no, use ranges); <b>Why do you like to exercise?</b> (leading); <b>…how much time have you wasted on social media?</b> (loaded, use \"spent\"); the <b>1 to 4</b> scale (ambiguous / reversed); the <b>1 to 6</b> scale (changing number of options, reversing scale). (These are the site's answers; the paper has no official key for this question.)",
     "مقالي <bdi dir=\"ltr\">5</bdi> درجات <bdi dir=\"ltr\">(Final 2024/25, Q2B)</bdi>: قيّم الأسئلة دي:<span class=\"ltr\">Do you use social media?</span>سؤال <bdi dir=\"ltr\">yes/no</bdi> فاستخدم ranges.<span class=\"ltr\">Why do you like to exercise?</span>سؤال leading.<span class=\"ltr\">…how much time have you wasted on social media?</span>سؤال loaded فاستخدم <bdi dir=\"ltr\">spent</bdi>. والـ scale بتاع <bdi dir=\"ltr\">1 to 4</bdi> مش واضح أو معكوس، والـ scale بتاع <bdi dir=\"ltr\">1 to 6</bdi> عدد الـ options بيتغير وبيعكس الـ scale. (دي إجابات الموقع، والامتحان ملوش model answer رسمي للسؤال ده.)"
    ],
    [
     "Written, 5 marks (Final 2025/26, Q2B): \"Mention the points that should be taken into consideration to ask good survey questions and give examples.\": name the six principles with one don't/instead example each.",
     "مقالي <bdi dir=\"ltr\">5</bdi> درجات <bdi dir=\"ltr\">(Final 2025/26, Q2B)</bdi>: اذكر النقط اللي لازم تتحط في الاعتبار عشان تسأل أسئلة survey كويسة مع أمثلة، يعني الـ <bdi dir=\"ltr\">6</bdi> مبادئ ومعاهم مثال <bdi dir=\"ltr\">don't/instead</bdi> لكل واحد."
    ],
    [
     "True or False (Final 2024/25): \"Be biased\" is an important point for a good survey → <b>False</b> from the lecture (the principle is Be <b>Unbiased</b>; the 2024/25 key marks it True, likely a typo for \"Be unbiased\").",
     "صح ولا غلط <bdi dir=\"ltr\">(Final 2024/25)</bdi>: إن <bdi dir=\"ltr\">\"Be biased\"</bdi> نقطة مهمة في الـ survey، والإجابة <b>False</b> من المحاضرة (المبدأ هو Be <b>Unbiased</b>، ونموذج <bdi dir=\"ltr\">2024/25</bdi> معلّمها True وده غالباً غلطة مطبعية والمقصود <bdi dir=\"ltr\">\"Be unbiased\"</bdi>)."
    ],
    [
     "MCQ (Final 2025/26): \"Which of the following best summarizes a good survey design principle?\" → <b>Short, clear, unbiased surveys with participant feedback considered</b>.",
     "اختار <bdi dir=\"ltr\">(Final 2025/26)</bdi>: أنهي جملة بتلخص مبدأ كويس لتصميم الـ survey، والإجابة:<span class=\"ltr\">Short, clear, unbiased surveys with participant feedback considered</span>"
    ],
    [
     "MCQ (Midterm 2026/27): \"What is the best way to ensure a survey collects accurate user feedback in HCI?\" → <b>Use clear and unbiased wording in questions</b> (Be Clear + Be Unbiased). Only open-ended questions, making every question mandatory, or technical questions are the distractors.",
     "اختار <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>: إيه أحسن طريقة تخلي الـ survey يجمع feedback دقيق؟ والإجابة:<span class=\"ltr\">Use clear and unbiased wording in questions</span>يعني Be Clear مع Be Unbiased. والـ distractors هما: أسئلة open-ended بس، أو كل الأسئلة إجبارية، أو أسئلة technical الـ user مش فاهمها."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Interviews vs surveys",
   "ar_h": "الـ Interviews قصاد الـ surveys",
   "pts": [
    [
     "The <b>interview</b> is the <b>most common</b> research technique (Final 2024/25 asked this as True or False: True).",
     "الـ <b>interview</b> هو <b>أشهر</b> research technique (امتحان <bdi dir=\"ltr\">Final 2024/25</bdi> سأله صح ولا غلط، والإجابة True)."
    ],
    [
     "It gives a <b>deeper, more thorough understanding</b> through: more open-ended and <b>\"why\"</b> questions (Joyner: focus on the <b>6 Ws</b>: who, what, where, when, why, how), <b>room for follow-up questions</b>, and <b>reflection on rare events</b>.",
     "بيدّي <b>فهم أعمق وأشمل</b> عن طريق: أسئلة open-ended وأسئلة <b>\"why\"</b> أكتر (Joyner بيقول ركّز على الـ <b><bdi dir=\"ltr\">6 Ws</bdi></b> وهما who و what و where و when و why و how)، و<b>مساحة لأسئلة follow-up</b>، و<b>التفكير في الأحداث النادرة</b> (rare events)."
    ],
    [
     "Far <b>fewer users</b> can be interviewed than surveyed (a survey gives the broad view from a large number of users, L5).",
     "عدد الـ users اللي تقدر تعملهم interview <b>أقل بكتير</b> من اللي تقدر تعملهم survey (الـ survey بيدّي صورة واسعة من عدد كبير من الـ users، شوف <bdi dir=\"ltr\">L5</bdi>)."
    ],
    [
     "Interviews are <b>more expensive</b> for two reasons: <b>synchronous</b> (the interviewer devotes time to each interviewee) and <b>incentives</b> (interviewees often expect compensation). Trap: \"Survey is more expensive than interview\" is <b>False</b>.",
     "الـ Interviews <b>أغلى</b> لسببين: إنها <b>synchronous</b> (الـ interviewer بيدّي وقت لكل interviewee لوحده)، والـ <b>incentives</b> (اللي بنعملهم interview غالباً مستنيين مقابل). فخ: جملة إن الـ Survey أغلى من الـ interview <b>False</b>."
    ],
    [
     "Interviews and surveys can be done <b>in sequence, in either order</b>, using the results of one to plan the other.",
     "الـ Interviews والـ surveys ينفع يتعملوا <b>ورا بعض بأي ترتيب</b>، ونستخدم نتايج واحد عشان نخطط للتاني."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Tips for a good interview",
   "ar_h": "نصايح الـ interview الكويس",
   "pts": [
    [
     "<b>Before</b>: <b>plan ahead</b> and prepare your questions before the interview (L5 adds: write a script, but \"the script is not a bible\").",
     "<b>قبل</b> الـ interview: <b>خطط بدري</b> وجهّز أسئلتك قبل ميعاده (و<bdi dir=\"ltr\">L5</bdi> بتزود: اكتب script، بس الـ script مش كتاب مقدس)."
    ],
    [
     "<b>During</b>, two keys for success: <b>listen well</b> (the user should be talking most of the time) and <b>take notes</b> (one person asks and one takes notes; an <b>audio recording is not enough</b>; note emotions and reactions).",
     "<b>أثناء</b> الـ interview فيه مفتاحين للنجاح: <b>اسمع كويس</b> (الـ user هو اللي يتكلم أغلب الوقت)، و<b>خد notes</b> (واحد يسأل وواحد يكتب، والـ <b>audio recording لوحده مش كفاية</b>، واكتب الـ emotions والـ reactions)."
    ],
    [
     "<b>Between</b> interviews: <b>leave some time between interviews</b>.",
     "<b>بين</b> الـ interviews: <b>سيب وقت بين كل interview والتاني</b>."
    ],
    [
     "Trap (Final 2024/25 MCQ): the options were Listen well / don't leave some time between interviews / Take notes / <b>a & c</b>. Option (b) is the opposite of the real tip, so the answer is <b>a & c</b>.",
     "فخ <bdi dir=\"ltr\">(Final 2024/25 MCQ)</bdi>: الاختيارات كانت Listen well و don't leave some time between interviews و Take notes و <b>a & c</b>. الاختيار <bdi dir=\"ltr\">(b)</bdi> عكس النصيحة الحقيقية، فالإجابة <b>a & c</b>."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Interviewing individuals vs groups",
   "ar_h": "الـ interview لأفراد قصاد الـ groups",
   "pts": [
    [
     "<b>Individuals</b>: more time/effort spent with each participant; <b>easier to coordinate the logistics</b>; <b>more privacy</b> for participants.",
     "الـ <b>Individuals</b>: وقت ومجهود أكتر مع كل participant، و<b>أسهل في تنسيق الـ logistics</b>، و<b>privacy أكتر</b> للـ participants."
    ],
    [
     "<b>Groups</b>: <b>easier to get more feedback</b>; participants' <b>discussion can highlight assumptions</b>.",
     "الـ <b>Groups</b>: <b>أسهل تاخد feedback أكتر</b>، و<b>النقاش بين الـ participants ممكن يكشف الـ assumptions</b>."
    ],
    [
     "Group drawbacks: you may need to deal with <b>confounding personalities</b>, and <b>\"presentation of self\"</b> issues.",
     "عيوب الـ Groups: ممكن تضطر تتعامل مع <b>confounding personalities</b> (شخصيات بتلخبط النتايج)، ومشاكل الـ <b>\"presentation of self\"</b> (الناس بتهتم بشكلها قدام غيرها)."
    ],
    [
     "Trap: \"Individuals interview easier to coordinate than groups' interview\" is <b>True</b> (Final 2024/25 and 2025/26).",
     "فخ: جملة إن الـ interview الفردي أسهل في التنسيق من الـ group interview <b>True</b> <bdi dir=\"ltr\">(Final 2024/25, 2025/26)</bdi>."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Challenges of asking questions",
   "ar_h": "تحديات الـ data اللي بتيجي من الأسئلة",
   "pts": [
    [
     "Challenges of data gathered by asking questions (interviews and surveys): <b>planning</b> takes more time and effort than the team may have; <b>analysis of qualitative data</b> is not easy.",
     "تحديات الـ data اللي بنجمعها بالأسئلة (الـ interviews والـ surveys): الـ <b>planning</b> بياخد وقت ومجهود أكتر من اللي عند الفريق، وتحليل الـ <b>qualitative data</b> مش سهل."
    ],
    [
     "<b>Recall bias</b>: inaccurate answers about things in the past (the user does not remember well).",
     "الـ <b>Recall bias</b>: إجابات مش دقيقة عن حاجات حصلت زمان (الـ user مش فاكر كويس)."
    ],
    [
     "<b>Reporting bias</b>: people give answers <b>more ideal than reality</b>.",
     "الـ <b>Reporting bias</b>: الناس بتدّي إجابات <b>أحسن (أكتر مثالية) من الحقيقة</b>."
    ],
    [
     "Solution: <b>combine</b> with other techniques such as <b>participant observation, usability studies and secondary research</b>.",
     "الحل: <b>ادمجها</b> مع techniques تانية زي الـ <b>participant observation والـ usability studies والـ secondary research</b>."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Design: can I?",
   "ar_h": "الـ Design: أقدر أعمله؟",
   "pts": [
    [
     "<b>Scott Klemmer</b>: \"Designing great user interfaces requires enormous creativity and a lot of hard work…\", but <b>pretty good</b> interfaces are easy if you know basic methods, techniques and principles.",
     "بيقول <b>Scott Klemmer</b>: تصميم user interfaces عظيمة محتاج creativity ضخمة وشغل كتير، بس الـ interfaces <b>الكويسة كفاية</b> (pretty good) سهلة لو عارف الـ methods والـ techniques والـ principles الأساسية."
    ],
    [
     "<b>Joyner</b>: \"design is very hard\".",
     "بيقول <b>Joyner</b>: الـ design صعب جداً (\"design is very hard\")."
    ],
    [
     "Designers say: \"we are not artists; in most cases we are not even talented in drawing.\" Design does not produce wall-hanging artwork.",
     "الـ designers بيقولوا: إحنا مش فنانين، وفي أغلب الأحوال مش موهوبين في الرسم كمان. والـ design مش بيطلّع لوحات تتعلق على الحيطة."
    ],
    [
     "Talent and creativity are an <b>advantage</b>, not a requirement. Do not turn off creativity; follow tips and avoid the biggest design mistakes (L8).",
     "الموهبة والـ creativity <b>ميزة</b> مش شرط. متقفلش الـ creativity، واتبع النصايح وابعد عن أكبر أخطاء الـ design <bdi dir=\"ltr\">(L8)</bdi>."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "True or False (Final 2024/25): \"Interview is most common research technique.\" → <b>True</b>.",
     "صح ولا غلط <bdi dir=\"ltr\">(Final 2024/25)</bdi>: إن الـ Interview أشهر research technique، والإجابة <b>True</b>."
    ],
    [
     "True or False (Final 2024/25 and 2025/26): \"Individuals interview easier to coordinate than groups' interview.\" → <b>True</b> (easier logistics is listed under individuals).",
     "صح ولا غلط <bdi dir=\"ltr\">(Final 2024/25, 2025/26)</bdi>: إن الـ interview الفردي أسهل في التنسيق من الـ group، والإجابة <b>True</b> (الـ logistics الأسهل مكتوبة تحت الـ individuals)."
    ],
    [
     "MCQ (Final 2024/25): \"Tips for good interview\": Listen Well / don't Leave some time between interviews / Take notes / a & c → <b>a & c</b>.",
     "اختار <bdi dir=\"ltr\">(Final 2024/25)</bdi>: نصايح الـ interview الكويس، والاختيارات Listen Well و don't Leave some time between interviews و Take notes و a & c، والإجابة <b>a & c</b>."
    ],
    [
     "MCQ (Final 2024/25): \"Plan ahead and prepare your questions before……\" (Interview / Survey / Observation / none) → <b>Interview</b> from the lecture (the first interview tip). The official key marks <b>(b) Survey</b>; answer Interview and quote the lecture sentence if asked.",
     "اختار <bdi dir=\"ltr\">(Final 2024/25)</bdi>: <span class=\"ltr\">Plan ahead and prepare your questions before……</span>والاختيارات Interview و Survey و Observation و none، والإجابة من المحاضرة <b>Interview</b> (أول نصيحة من نصايح الـ interview). النموذج الرسمي معلّم <b><bdi dir=\"ltr\">(b)</bdi> Survey</b>، فجاوب Interview واستشهد بجملة المحاضرة لو اتسألت."
    ],
    [
     "Written, 5 marks (Final 2024/25, Q2C): \"What are the tips for good interview?\": plan ahead and prepare questions; during it, <b>listen well</b> (the user talks most) and <b>take notes</b> (one asks, one writes; audio is not enough; note emotions and reactions); leave some time between interviews.",
     "مقالي <bdi dir=\"ltr\">5</bdi> درجات <bdi dir=\"ltr\">(Final 2024/25, Q2C)</bdi>: إيه نصايح الـ interview الكويس؟ خطط بدري وجهّز الأسئلة. وأثناءه <b>اسمع كويس</b> (الـ user يتكلم أكتر) و<b>خد notes</b> (واحد يسأل وواحد يكتب، والـ audio مش كفاية، واكتب الـ emotions والـ reactions). وسيب وقت بين الـ interviews."
    ],
    [
     "Also be ready for: compare interviews and surveys, compare individuals vs groups (draw the table), and name the two biases with their solution.",
     "وخليك جاهز كمان لـ: قارن بين الـ interviews والـ surveys، وقارن بين الـ individuals والـ groups (ارسم الجدول)، واذكر الـ biases الاتنين والحل بتاعهم."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "The biggest design mistakes (Joyner)",
   "ar_h": "أكبر أخطاء الـ design (Joyner)",
   "pts": [
    [
     "<b>Biggest mistake</b>: jumping straight to designing an interface <b>without understanding the users or the task</b>.",
     "<b>أكبر غلطة</b>: إنك تنط على تصميم الـ interface على طول <b>من غير ما تفهم الـ users أو الـ task</b>."
    ],
    [
     "<b>Second biggest</b>: settling on a <b>single design idea</b> or a single <b>genre</b> of ideas <b>too early</b>.",
     "<b>تاني أكبر غلطة</b>: إنك تثبت على <b>فكرة design واحدة</b> أو <b>نوع (genre)</b> واحد من الأفكار <b>بدري أوي</b>."
    ],
    [
     "Trap: do not swap them. \"The biggest mistake is settling on a single idea too early\" is <b>False</b>; that is the second one, and it is \"too <b>early</b>\", not too late.",
     "فخ: متبدلهمش. جملة إن أكبر غلطة هي الثبات على فكرة واحدة بدري <b>False</b>، دي التانية، وهي \"بدري <b>أوي</b>\" مش \"متأخر\"."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Design alternatives",
   "ar_h": "الـ Design alternatives",
   "pts": [
    [
     "<b>Design alternatives</b> is a separate phase in Joyner's cycle (Need finding → <b>Design alternatives</b> → Prototyping → Evaluation, L2). Explore a <b>wide range</b> of alternatives instead of focusing on one from the start.",
     "الـ <b>Design alternatives</b> مرحلة لوحدها في دورة Joyner اللي هي<span class=\"ltr\">Need finding → Design alternatives → Prototyping → Evaluation</span>(<bdi dir=\"ltr\">L2</bdi>). استكشف <b>مجموعة واسعة</b> من الـ alternatives بدل ما تركز على واحدة من الأول."
    ],
    [
     "The single-idea mistake is common when <b>enhancing an existing system</b>, because you are <b>captured by its current interface</b>. Advice: <b>distance yourself from existing solutions</b>, at least during brainstorming.",
     "غلطة الفكرة الواحدة منتشرة لما تكون <b>بتطوّر system موجود</b>، لأنك بتبقى <b>محبوس في الـ interface الحالي</b>. النصيحة: <b>ابعد نفسك عن الحلول الموجودة</b>، على الأقل وقت الـ brainstorming."
    ],
    [
     "The final design is often a <b>combination</b> of alternatives explored earlier.",
     "الـ design النهائي غالباً بيبقى <b>خليط (combination)</b> من الـ alternatives اللي اتجربت قبل كده."
    ],
    [
     "How many alternatives? <b>As many as you can.</b> Example: the <b>first Microsoft mouse</b> had <b>more than 100 prototypes</b> (trap: not \"only a few\", and not exactly 100).",
     "كام alternative؟ <b>أكتر ما تقدر.</b> مثال: <b>أول Microsoft mouse</b> اتعمله <b>أكتر من <bdi dir=\"ltr\">100</bdi> prototype</b> (فخ: مش \"شوية قليلين\"، ومش <bdi dir=\"ltr\">100</bdi> بالظبط)."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "What a prototype is",
   "ar_h": "يعني إيه prototype",
   "pts": [
    [
     "Most people think a prototype is a <b>quick or small version</b> of the real thing. That is <b>not a useful understanding</b> (so \"A prototype is simply a quick or small version of the final product\" is False).",
     "أغلب الناس فاكرين إن الـ prototype هو <b>نسخة سريعة أو صغيرة</b> من الحاجة الحقيقية. وده <b>فهم مش مفيد</b> (فجملة إن الـ prototype مجرد نسخة سريعة أو صغيرة من المنتج النهائي False)."
    ],
    [
     "Designers' definition: <b>\"Rapidly creating an approximation of a design so that you can quickly get feedback.\"</b>",
     "تعريف الـ designers:<span class=\"ltr\">\"Rapidly creating an approximation of a design so that you can quickly get feedback.\"</span>يعني تعمل بسرعة نسخة تقريبية من الـ design عشان تاخد feedback بسرعة."
    ],
    [
     "<b>Klemmer</b>: \"A prototype is <b>not about the artifact</b>, it's about <b>feedback and iteration</b>.\" And: \"<b>prototypes are questions, ask a lot of them</b>.\"",
     "بيقول <b>Klemmer</b>:<span class=\"ltr\">\"A prototype is not about the artifact, it's about feedback and iteration.\"</span>وكمان:<span class=\"ltr\">\"Prototypes are questions, ask a lot of them.\"</span>"
    ],
    [
     "<b>Joyner</b>: design is an iterative process of <b>brainstorming, combining, abandoning, revising and improving</b> ideas, which requires <b>several ideas</b> to start with.",
     "بيقول <b>Joyner</b>: الـ design عملية iterative فيها <b>brainstorming و combining و abandoning و revising و improving</b> للأفكار، وده محتاج <b>كذا فكرة</b> تبدأ بيهم."
    ],
    [
     "A <b>good prototype</b> enables <b>useful (constructive) feedback</b> and iteration; it does <b>not</b> need to resemble the final product. A prototype that gives <b>no new knowledge wastes</b> the design process.",
     "الـ <b>prototype الكويس</b> بيجيب <b>feedback مفيد (constructive)</b> وبيسمح بالـ iteration، و<b>مش</b> لازم يشبه المنتج النهائي. والـ prototype اللي مبيدّيش <b>معرفة جديدة بيضيّع</b> الـ design process."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "True or False (Final 2024/25): \"Prototype is one that enables you to get useful feedback and iterate on your design.\" → <b>True</b> (the lecture's definition of a good prototype).",
     "صح ولا غلط <bdi dir=\"ltr\">(Final 2024/25)</bdi>: إن الـ Prototype هو اللي بيخليك تاخد feedback مفيد وتعمل iteration على الـ design، والإجابة <b>True</b> (ده تعريف المحاضرة للـ prototype الكويس)."
    ],
    [
     "True or False (Final 2025/26): \"User feedback is not necessary when designing a user interface.\" → <b>False</b> (prototypes exist to get feedback; see also L2).",
     "صح ولا غلط <bdi dir=\"ltr\">(Final 2025/26)</bdi>: إن الـ user feedback مش ضروري وإنت بتصمم user interface، والإجابة <b>False</b> (الـ prototypes معمولة أصلاً عشان الـ feedback، وشوف كمان <bdi dir=\"ltr\">L2</bdi>)."
    ],
    [
     "Student summaries list these as questions from a past final (answers checked against the lecture): the biggest mistake is jumping to design without understanding the users or the task → <b>True</b>; settle on a single idea early → <b>False</b>; the final design is usually a combination of alternatives → <b>True</b>; the first Microsoft mouse had only a few prototypes → <b>False</b>; good prototypes closely resemble the final product → <b>False</b>; prototypes are questions to ask frequently → <b>True</b>.",
     "ملخصات الطلبة بتقول إن دي أسئلة من final قديم (والإجابات متراجعة على المحاضرة): أكبر غلطة إنك تصمم من غير ما تفهم الـ users أو الـ task، والإجابة <b>True</b>. والثبات على فكرة واحدة بدري، والإجابة <b>False</b>. والـ design النهائي غالباً خليط من الـ alternatives، والإجابة <b>True</b>. وأول Microsoft mouse اتعمله prototypes قليلة، والإجابة <b>False</b>. والـ prototypes الكويسة بتشبه المنتج النهائي جداً، والإجابة <b>False</b>. والـ prototypes أسئلة لازم تتسأل كتير، والإجابة <b>True</b>."
    ],
    [
     "Same summaries, MCQ: the purpose of prototyping for designers → <b>to get feedback and iterate on designs</b>; during brainstorming designers should → <b>distance themselves from current designs</b>.",
     "ومن نفس الملخصات، اختار: هدف الـ prototyping عند الـ designers هو <b>ياخدوا feedback ويعملوا iteration</b>. ووقت الـ brainstorming المفروض الـ designers <b>يبعدوا نفسهم عن الـ designs الحالية</b>."
    ],
    [
     "Also be ready for: \"What are the biggest mistakes a designer can make?\" and \"What is a prototype and why is it important?\" as short written answers.",
     "وخليك جاهز كمان لأسئلة مقالي قصيرة زي: إيه أكبر أخطاء الـ designer؟ وإيه هو الـ prototype وليه مهم؟"
    ]
   ]
  },
  {
   "lec": 9,
   "h": "Fidelity and the power of lo-fi",
   "ar_h": "الـ Fidelity وقوة الـ lo-fi",
   "pts": [
    [
     "Prototypes communicate with stakeholders. Their four audiences: <b>colleagues, clients, users and yourself</b>.",
     "الـ Prototypes بتتواصل بيها مع الـ stakeholders، وليها <bdi dir=\"ltr\">4</bdi> جماهير: <b>الزملاء والـ clients والـ users وإنت نفسك</b>."
    ],
    [
     "<b>Fidelity</b>: how closely a design matches the <b>look and feel of the final product</b>. <b>Low-fidelity (lo-fi)</b> vs <b>high-fidelity (hi-fi)</b>. <b>Start with lo-fi</b>, and move to hi-fi as the design proceeds.",
     "الـ <b>Fidelity</b>: الـ design قريب قد إيه من الـ <b>look and feel بتاع المنتج النهائي</b>. فيه <b>low-fidelity (lo-fi)</b> و<b>high-fidelity (hi-fi)</b>. <b>ابدأ بالـ lo-fi</b>، وانقل للـ hi-fi وإنت ماشي في الـ design."
    ],
    [
     "Power of lo-fi: <b>faster, easier and cheaper</b> to make; hi-fi is <b>not possible at the beginning</b> because many details have not been decided. Trap: \"High fidelity prototypes are faster, easier and cheaper\" is <b>False</b>.",
     "قوة الـ lo-fi: <b>أسرع وأسهل وأرخص</b>، والـ hi-fi <b>مش ممكن في الأول</b> لأن تفاصيل كتير لسه متقررتش. فخ: جملة إن الـ hi-fi أسرع وأسهل وأرخص <b>False</b>."
    ],
    [
     "People are <b>much more willing to talk</b> about a sketch than something that looks finished. <b>Konstan</b>: a prototype that looks like little effort (hand-drawn) gets more <b>constructive feedback</b>. Too many details make people give feedback at a <b>lower level</b> than needed. <b>Google</b>: present <b>high-level ideas</b> early, details and screens later.",
     "الناس <b>مستعدة تتكلم أكتر بكتير</b> عن sketch من حاجة شكلها خلصان. بيقول <b>Konstan</b>: الـ prototype اللي باين إنه معمول بمجهود قليل (مرسوم بالإيد) بياخد <b>constructive feedback</b> أكتر. والتفاصيل الكتير بتخلي الـ feedback في <b>مستوى أقل</b> من المطلوب. ونصيحة <b>Google</b>: اعرض <b>أفكار high-level</b> في الأول، والتفاصيل والشاشات بعدين."
    ]
   ]
  },
  {
   "lec": 9,
   "h": "Brainstorming and the design-development process",
   "ar_h": "الـ Brainstorming والـ design-development process",
   "pts": [
    [
     "Every design activity helps the <b>designer think and visualize</b>, or helps <b>team members and stakeholders visualize and communicate</b>, or both.",
     "كل design activity يا إما بتساعد الـ <b>designer يفكر ويتخيل</b>، يا إما بتساعد <b>الفريق والـ stakeholders يتخيلوا ويتواصلوا</b>، يا إما الاتنين."
    ],
    [
     "Brainstorming generates a lot of ideas. Joyner: <b>start with individual brainstorming</b>, because groups <b>coalesce on ideas too early</b>.",
     "الـ Brainstorming بيطلّع أفكار كتير. وبيقول Joyner: <b>ابدأ بـ brainstorming فردي</b>، لأن الـ groups <b>بتتجمع على أفكار بدري أوي</b>."
    ],
    [
     "Tips: write as many ideas as you can; each idea is <b>a few words or a sentence</b>; <b>aim for 20</b>; <b>do not evaluate or exclude</b> any idea; take breaks or use several sessions; team sessions are for <b>sharing and adding</b> ideas, not narrowing.",
     "النصايح: اكتب أفكار أكتر ما تقدر، وكل فكرة <b>كلمتين أو جملة</b>، و<b>خلي هدفك <bdi dir=\"ltr\">20</bdi></b>، و<b>متقيّمش ومتستبعدش</b> أي فكرة، وخد breaks أو اعمل كذا session، والـ team sessions <b>للمشاركة والإضافة</b> مش للتضييق."
    ],
    [
     "Why study design: some students will shine as designers; developers often do design when there are no designers; developers work better with designers when they understand the process.",
     "ليه ندرس design: فيه طلبة هيلمعوا كـ designers، والـ developers كتير بيعملوا design لما ميكونش فيه designers، والـ developers بيشتغلوا أحسن مع الـ designers لما يفهموا الـ process."
    ],
    [
     "<b>Handoff process</b>: design finishes, then it is handed over to development (<b>sequential</b>, one handover point). <b>Handshake process</b>: design and development run <b>in parallel</b> with frequent <b>sync points</b>.",
     "الـ <b>Handoff process</b>: الـ design يخلص وبعدين يتسلّم للـ development (<b>sequential</b>، نقطة تسليم واحدة). والـ <b>Handshake process</b>: الـ design والـ development ماشيين <b>بالتوازي</b> مع <b>sync points</b> كتير."
    ]
   ]
  },
  {
   "lec": 9,
   "h": "Wireframes",
   "ar_h": "الـ Wireframes",
   "pts": [
    [
     "<b>Wireframe</b>: a <b>schematic for the basic outline of a screen</b>, built from lines and basic shapes (rectangles, circles) with some text; the lines look like wires. It intentionally has <b>no colors or font styles</b>. Wireframe = <b>skeleton with placeholders</b>. Google calls it a \"key part of the design process\".",
     "الـ <b>Wireframe</b>: <b>رسم تخطيطي (schematic) للهيكل الأساسي للشاشة</b>، معمول من خطوط وأشكال بسيطة (مستطيلات ودواير) مع شوية text، والخطوط شكلها زي السلوك. <b>مفيهوش ألوان ولا font styles</b> عن قصد. يعني الـ Wireframe هو <b>skeleton فيه placeholders</b>. وشركة Google بتسميه \"key part of the design process\"."
    ],
    [
     "Wireframes are <b>not art</b>: they organize and communicate information clearly.",
     "الـ Wireframes <b>مش فن</b>: هي بتنظم المعلومات وتوصّلها بوضوح."
    ],
    [
     "Four purposes: (1) decide the basic <b>page structure</b> before colors and images; (2) get the <b>team on the same page</b> early, saving time and resources; (3) direct feedback to the <b>right level</b> (structure and function, not colors and typography); (4) <b>catch forgotten or disorganized elements</b> early.",
     "الأهداف الأربعة: <bdi dir=\"ltr\">(1)</bdi> تقرر <b>الـ structure الأساسي للصفحة</b> قبل الألوان والصور. <bdi dir=\"ltr\">(2)</bdi> تخلي <b>الفريق متفق</b> من بدري فتوفر وقت وموارد. <bdi dir=\"ltr\">(3)</bdi> توجّه الـ feedback <b>للمستوى الصح</b> (الـ structure والـ function مش الألوان والـ typography). <bdi dir=\"ltr\">(4)</bdi> <b>تمسك العناصر المنسية أو المش منظمة</b> من بدري."
    ],
    [
     "When: <b>after foundational user research</b>, as soon as there is an initial <b>site map</b> (content hierarchy).",
     "إمتى: <b>بعد الـ foundational user research</b>، أول ما يبقى فيه <b>site map</b> مبدئي (الـ content hierarchy)."
    ],
    [
     "Standards: text as horizontal lines or placeholder text; images as rectangles or circles with an <b>X</b>; calls to action as rectangles or circles; proper <b>annotation</b>.",
     "الـ Standards: الـ text كخطوط أفقية أو placeholder text، والصور مستطيلات أو دواير فيها <b>X</b>، والـ calls to action مستطيلات أو دواير، و<b>annotation</b> مظبوط."
    ],
    [
     "Process: start with <b>pen and paper</b>; the first goal is <b>reaching</b> a design, not showing one; sketch <b>at least 5 versions</b> per screen; iterate with feedback; the second goal is to move the idea to paper quickly, so <b>ignore straight lines, spacing and alignment</b>. Then tools: <b>Figma, Adobe XD, Sketch, Balsamiq, Pencil</b>. Lecture example: a dog-walking app.",
     "الـ Process: ابدأ بـ <b>ورقة وقلم</b>، والهدف الأول إنك <b>توصل</b> لـ design مش إنك تعرضه. ارسم <b><bdi dir=\"ltr\">5</bdi> versions على الأقل</b> لكل شاشة، واعمل iteration بالـ feedback. والهدف التاني تنقل الفكرة للورقة بسرعة، فـ<b>تجاهل الخطوط المستقيمة والمسافات والـ alignment</b>. بعدين الـ tools زي <b>Figma و Adobe XD و Sketch و Balsamiq و Pencil</b>. ومثال المحاضرة app لتمشية الكلاب."
    ]
   ]
  },
  {
   "lec": 9,
   "h": "Form design guidelines",
   "ar_h": "إرشادات تصميم الـ Forms",
   "pts": [
    [
     "Important commands are <b>buttons, not links</b> (buttons catch the eye), but do <b>not</b> display all commands as buttons.",
     "الـ commands المهمة تبقى <b>buttons مش links</b> (الـ buttons بتشد العين)، بس <b>متعرضش</b> كل الـ commands كـ buttons."
    ],
    [
     "<b>Breadcrumbs</b> show <b>where</b> users are, when there are multiple choices. <b>Progress bars</b> show where users are <b>and what is left</b>, for a predefined unique path.",
     "الـ <b>Breadcrumbs</b> بتوري الـ users هم <b>فين</b> لما يكون فيه اختيارات كتير. والـ <b>Progress bars</b> بتوري هم فين <b>وفاضل إيه</b>، لـ path واحد محدد مسبقاً."
    ],
    [
     "Confirm a successful submission with a <b>confirmation page</b>. <b>Error messages sit next to the field</b> where the error occurred; changing the field <b>border color</b> (e.g. red) is preferred.",
     "أكّد الـ submission الناجح بـ <b>confirmation page</b>. و<b>الـ Error messages تبقى جنب الـ field</b> اللي فيه الغلط، وتغيير <b>لون الـ border</b> بتاع الـ field (زي الأحمر) هو المفضّل."
    ],
    [
     "Text boxes give <b>plenty of space</b>; fields contain <b>hints, examples or required formats</b>; <b>remove repetitive actions</b> (remember customers' preferences).",
     "الـ Text boxes تدّي <b>مساحة كفاية</b>، والـ fields فيها <b>hints أو أمثلة أو الـ format المطلوب</b>، و<b>شيل الـ actions المتكررة</b> (افتكر تفضيلات العملاء)."
    ],
    [
     "Make a <b>clear distinction between primary and secondary calls-to-action</b> (\"Go Pro\" stands out over \"Free Trial\").",
     "اعمل <b>فرق واضح بين الـ primary والـ secondary calls-to-action</b> (زي \"Go Pro\" يبان أكتر من \"Free Trial\")."
    ]
   ]
  },
  {
   "lec": 9,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "True or False (Final 2024/25 and 2025/26): \"High fidelity prototypes are faster, easier and cheaper to generate than low fidelity.\" → <b>False</b> (reversed: lo-fi is).",
     "صح ولا غلط <bdi dir=\"ltr\">(Final 2024/25, 2025/26)</bdi>: إن الـ hi-fi prototypes أسرع وأسهل وأرخص من الـ lo-fi، والإجابة <b>False</b> (معكوسة، الـ lo-fi هو اللي كده)."
    ],
    [
     "MCQ (Final 2025/26): a key advantage of lo-fi prototypes → <b>they allow for quick feedback and rapid iteration</b>; the primary purpose of a wireframe → <b>to outline the structure and layout of a webpage or app without detailed design</b>; tools for wireframes → <b>Balsamiq, Figma and Sketch</b>.",
     "اختار <bdi dir=\"ltr\">(Final 2025/26)</bdi>: ميزة الـ lo-fi prototypes إنها <b>بتسمح بـ feedback سريع و iteration سريعة</b>. والهدف الأساسي من الـ wireframe هو <b>يحدد الـ structure والـ layout للصفحة أو الـ app من غير design تفصيلي</b>. والـ tools هي <b>Balsamiq و Figma و Sketch</b>."
    ],
    [
     "Written, 5 marks (Final 2024/25, Q2D): \"What is the power of low-fidelity prototype?\": faster, easier, cheaper; hi-fi not feasible early (details undecided); people talk more about a sketch; Konstan: little-effort look gets more constructive feedback; many details push feedback to a lower level; Google: high-level ideas early, details later.",
     "مقالي <bdi dir=\"ltr\">5</bdi> درجات <bdi dir=\"ltr\">(Final 2024/25, Q2D)</bdi>: إيه قوة الـ low-fidelity prototype؟ أسرع وأسهل وأرخص، والـ hi-fi مش ممكن بدري (التفاصيل لسه متقررتش)، والناس بتتكلم أكتر عن الـ sketch، وKonstan: الشكل اللي فيه مجهود قليل بياخد constructive feedback أكتر، والتفاصيل الكتير بتنزّل الـ feedback لمستوى أقل، وGoogle: أفكار high-level الأول والتفاصيل بعدين."
    ],
    [
     "Written, 5 marks (Final 2024/25, Q3A): \"Define Wireframes.\": a schematic for the basic outline of a screen; lines and basic shapes with some text; no colors or font styles on purpose; skeleton with placeholders. Adding the four purposes secures full marks.",
     "مقالي <bdi dir=\"ltr\">5</bdi> درجات <bdi dir=\"ltr\">(Final 2024/25, Q3A)</bdi>: عرّف الـ Wireframes، والإجابة إنه schematic للهيكل الأساسي للشاشة، خطوط وأشكال بسيطة مع شوية text، من غير ألوان ولا font styles عن قصد، يعني skeleton فيه placeholders. ولو زودت الأهداف الأربعة تضمن الدرجة كاملة."
    ],
    [
     "Written, 5 marks (Final 2025/26, Q2D): \"What are the types of design–development process?\": <b>Handoff</b> (sequential, design then development) and <b>Handshake</b> (in parallel, frequent sync points).",
     "مقالي <bdi dir=\"ltr\">5</bdi> درجات <bdi dir=\"ltr\">(Final 2025/26, Q2D)</bdi>: إيه أنواع الـ design–development process؟ الـ <b>Handoff</b> (sequential، الـ design وبعدين الـ development)، والـ <b>Handshake</b> (بالتوازي مع sync points كتير)."
    ],
    [
     "Design question: Final 2024/25 Q3B (15 marks) \"a mobile application for online shopping\" and Final 2025/26 Q3A (20 marks) \"a mobile application for booking doctors\": \"think about a layout of the interface that you consider usable and easy\". Start from user research, sketch the main screens as wireframes, and <b>label every decision with its guideline</b>: forms (L9: progress bar for a fixed path, breadcrumbs, errors next to the field, confirmation page, primary vs secondary CTA, remove repetitive actions) plus layout and navigation (L10).",
     "سؤال الـ design جه في <bdi dir=\"ltr\">Final 2024/25 Q3B</bdi> (<bdi dir=\"ltr\">15</bdi> درجة) عن mobile app للـ online shopping، و<bdi dir=\"ltr\">Final 2025/26 Q3A</bdi> (<bdi dir=\"ltr\">20</bdi> درجة) عن mobile app لحجز الدكاترة، والمطلوب layout للـ interface يكون usable وسهل. ابدأ بالـ user research، وارسم الشاشات الأساسية كـ wireframes، و<b>اكتب جنب كل قرار الـ guideline بتاعه</b>: الـ forms من <bdi dir=\"ltr\">L9</bdi> (progress bar للـ path الثابت، وbreadcrumbs، والـ errors جنب الـ field، وconfirmation page، وprimary قصاد secondary CTA، وشيل الـ actions المتكررة) ومعاهم الـ layout والـ navigation من <bdi dir=\"ltr\">L10</bdi>."
    ],
    [
     "Student summaries list these as from a past final (checked against the lecture): purpose of a wireframe → <b>to organize and communicate information clearly</b>; first step in wireframing → <b>sketching alternative versions on paper</b>; \"only one version of a wireframe before moving to digital tools\" → <b>False</b>; \"proper annotation is important\" → <b>True</b>; \"a wireframe is primarily artistic drawing\" → <b>False</b>.",
     "ملخصات الطلبة بتقول إن دي من final قديم (ومتراجعة على المحاضرة): هدف الـ wireframe هو <b>ينظم المعلومات ويوصّلها بوضوح</b>. وأول خطوة في الـ wireframing هي <b>رسم versions بديلة على الورق</b>. وإن version واحدة كفاية قبل الـ digital tools، والإجابة <b>False</b>. وإن الـ annotation المظبوط مهم، والإجابة <b>True</b>. وإن الـ wireframe رسم فني أساساً، والإجابة <b>False</b>."
    ]
   ]
  },
  {
   "lec": 10,
   "h": "Forms: colors, alerts, Close vs Cancel",
   "ar_h": "الـ Forms: الألوان والـ alerts والـ Close قصاد الـ Cancel",
   "pts": [
    [
     "<b>Stick to a simple 3-color palette.</b> More than 3 primary colors is difficult and confuses users.",
     "<b>التزم بـ color palette بسيطة من <bdi dir=\"ltr\">3</bdi> ألوان.</b> أكتر من <bdi dir=\"ltr\">3</bdi> primary colors صعب وبيلخبط الـ users."
    ],
    [
     "<b>Alert messages are consistent</b> across the whole site: do not change their color, style or placement.",
     "<b>الـ Alert messages تبقى consistent</b> في الموقع كله: متغيرش لونها ولا الـ style ولا المكان."
    ],
    [
     "<b>Close vs Cancel</b>: only one button → <b>\"Close\"</b>. Two buttons (an Action button and one to dismiss) → <b>\"Cancel\"</b>, not \"Close\". Cancel is most commonly placed <b>to the right</b> and is <b>not eye-catching</b>.",
     "<b>الـ Close قصاد الـ Cancel</b>: لو فيه button واحد بس يبقى <b>\"Close\"</b>. ولو اتنين (Action button وواحد للقفل) يبقى <b>\"Cancel\"</b> مش \"Close\". والـ Cancel غالباً <b>على اليمين</b> و<b>مش لافت للنظر</b>."
    ]
   ]
  },
  {
   "lec": 10,
   "h": "Error messages and system notices",
   "ar_h": "الـ Error messages والـ system notices",
   "pts": [
    [
     "A good <b>error message</b>, in order: (1) state the problem in the <b>title</b>; (2) describe briefly <b>why it happened</b>, under the title; (3) when possible, link to <b>complete the task or return</b> to the previous state; (4) give recommendations for the <b>next course of action</b>.",
     "الـ <b>error message</b> الكويسة بالترتيب: <bdi dir=\"ltr\">(1)</bdi> اكتب المشكلة في الـ <b>title</b>. <bdi dir=\"ltr\">(2)</bdi> اشرح باختصار <b>حصلت ليه</b> تحت الـ title. <bdi dir=\"ltr\">(3)</bdi> لو ينفع حط link عشان <b>يكمّل الـ task أو يرجع</b> للحالة اللي قبلها. <bdi dir=\"ltr\">(4)</bdi> ادّي recommendations لـ <b>الخطوة الجاية</b>."
    ],
    [
     "Example of applying it: \"Payment failed\" (title) → \"Your card has expired\" (why) → link back to the cart (return) → \"Use another card or update the expiry date\" (next action). ‡",
     "مثال على التطبيق: <span class=\"ltr\">\"Payment failed\"</span>ده الـ title، وبعده <span class=\"ltr\">\"Your card has expired\"</span>ده السبب، وبعدين link يرجّعك للـ cart، وبعدين <span class=\"ltr\">\"Use another card or update the expiry date\"</span>ودي الخطوة الجاية. ‡"
    ],
    [
     "A <b>system notice</b> has: an <b>\"Action\"</b> button, a <b>\"Remind me later\"</b> button and a <b>\"Don't show again\"</b> box. Notice messages should <b>not be lengthy or generic</b>.",
     "الـ <b>system notice</b> فيه: زرار <b>\"Action\"</b>، وزرار <b>\"Remind me later\"</b>، ومربع <b>\"Don't show again\"</b>. ورسايل الـ notice <b>متبقاش طويلة ولا generic</b>."
    ]
   ]
  },
  {
   "lec": 10,
   "h": "Layout",
   "ar_h": "الـ Layout",
   "pts": [
    [
     "The most important information is <b>above the fold</b> (the part visible without scrolling).",
     "أهم معلومات تبقى <b>above the fold</b> (الجزء اللي باين من غير scroll)."
    ],
    [
     "<b>Related information is grouped</b> by a <b>frame</b> or a <b>separator</b>; <b>color groups and structures items</b> (e.g. HR, Technical and Payroll fields).",
     "<b>المعلومات المرتبطة تتجمع</b> بـ <b>frame</b> أو <b>separator</b>، و<b>اللون بيجمّع وينظّم العناصر</b> (زي fields الـ HR والـ Technical والـ Payroll)."
    ],
    [
     "<b>Related items are logically ordered</b>: First/Middle/Last name; Start/End date; Origin/Destination.",
     "<b>العناصر المرتبطة مترتبة منطقياً</b>، زي:<span class=\"ltr\">First/Middle/Last name; Start/End date; Origin/Destination</span>"
    ],
    [
     "Your <b>logo is in the same place on every page</b> (no shift); the <b>background is not complicated</b> and does not distract from the content.",
     "الـ <b>logo في نفس المكان في كل صفحة</b> (من غير ما يتحرك)، والـ <b>background مش معقد</b> ومش بيشتت عن المحتوى."
    ]
   ]
  },
  {
   "lec": 10,
   "h": "Navigation",
   "ar_h": "الـ Navigation",
   "pts": [
    [
     "A <b>clear call-to-action (CTA)</b> tells users what to do next: an eye-catching button for the most common next step.",
     "فيه <b>call-to-action (CTA) واضح</b> بيقول للـ users يعملوا إيه بعد كده: button لافت للنظر للخطوة الجاية الأكتر انتشاراً."
    ],
    [
     "It is clear <b>where users are</b> (e.g. <b>breadcrumbs</b>); clear <b>links to the Home page and categories on every page</b>; <b>navigation tabs at the top</b> of the page.",
     "واضح <b>الـ users فين</b> (زي الـ <b>breadcrumbs</b>)، وفيه <b>links واضحة للـ Home page والـ categories في كل صفحة</b>، و<b>الـ navigation tabs فوق</b> في الصفحة."
    ],
    [
     "An <b>obvious change on hover</b> over anything clickable; the <b>company logo links to the homepage</b>.",
     "فيه <b>تغيير واضح مع الـ hover</b> على أي حاجة بتتداس، والـ <b>company logo بيودّي للـ homepage</b>."
    ],
    [
     "Map out <b>\"Red Routes\"</b>: the series of pages or actions customers most often use to complete tasks.",
     "ارسم الـ <b>\"Red Routes\"</b>: سلسلة الصفحات أو الـ actions اللي العملاء بيستخدموها أكتر حاجة عشان يخلصوا الـ tasks."
    ],
    [
     "Trap: the logo has <b>two</b> guidelines in two groups: <b>same place on every page</b> is layout, <b>links to the homepage</b> is navigation.",
     "فخ: الـ logo ليه <b>قاعدتين</b> في مجموعتين: <b>نفس المكان في كل صفحة</b> دي layout، و<b>بيودّي للـ homepage</b> دي navigation."
    ]
   ]
  },
  {
   "lec": 10,
   "h": "Likely questions",
   "ar_h": "أسئلة متوقعة",
   "pts": [
    [
     "Past papers have <b>no question</b> taken from this lecture's slides. The closest is the finals' design question (Q3, filed under L9 here): its model answers are marked on applying this lecture's guidelines too (above the fold, logo, 3-color palette, Cancel placement, consistent alerts, red routes).",
     "الامتحانات القديمة <b>مفيهاش ولا سؤال</b> جاي من slides المحاضرة دي. أقرب حاجة سؤال الـ design في الـ finals (<bdi dir=\"ltr\">Q3</bdi>، متحطوط هنا تحت <bdi dir=\"ltr\">L9</bdi>)، والـ model answer بتاعه بياخد درجات على تطبيق قواعد المحاضرة دي كمان (الـ above the fold والـ logo والـ <bdi dir=\"ltr\">3</bdi>-color palette ومكان الـ Cancel والـ alerts الـ consistent والـ red routes)."
    ],
    [
     "True or False on the rules: one button says \"Close\"; more than 3 primary colors; alerts may change style; tabs at the top; Home links on every page; hover change; logo links home; a busy background.",
     "صح ولا غلط على القواعد: الـ button الواحد اسمه \"Close\"، وأكتر من <bdi dir=\"ltr\">3</bdi> primary colors، والـ alerts ممكن يتغير الـ style بتاعها، والـ tabs فوق، والـ Home links في كل صفحة، وتغيير الـ hover، والـ logo بيودّي للـ home، والـ background المزحوم."
    ],
    [
     "MCQ on definitions: above the fold, red routes, call-to-action, breadcrumbs, how related information is grouped, which part of an error message comes first.",
     "اختيار من متعدد على التعريفات: الـ above the fold، والـ red routes، والـ call-to-action، والـ breadcrumbs، وإزاي المعلومات المرتبطة بتتجمع، وأول جزء في الـ error message."
    ],
    [
     "Spot the violation: a screenshot or description that breaks a rule (misordered name fields, a moving logo, a lone \"Cancel\" button, a bright Cancel on the left, a vague error).",
     "طلّع الغلطة: صورة أو وصف بيكسر قاعدة (fields الاسم مش مترتبة، أو logo بيتحرك، أو زرار \"Cancel\" لوحده، أو Cancel لافت للنظر على الشمال، أو error مش واضح)."
    ],
    [
     "Written: list the layout guidelines, the navigation guidelines, how to write a good error message, and what a system notice contains.",
     "مقالي: اذكر الـ layout guidelines، والـ navigation guidelines، وإزاي تكتب error message كويسة، والـ system notice فيه إيه."
    ]
   ]
  }
 ]
};

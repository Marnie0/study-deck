// Egyptian Arabic for HCI, aligned item by item with hci.js (then extra/hci.js and summary/hci.js items, in build order).
window.AR = window.AR || {};
AR.hci = {
 "lectures": {
  "1": {
   "notes": [
    {
     "h": "هتتعلم إيه في الكورس ده",
     "pts": [
      "إيه اللي محتاجين نعرفه عشان نصمم computerized systems الـ users بتوعها ياخدوا منها <b>أقصى استفادة</b> <b>بسهولة</b>.",
      "الـ HCI بيشمل دراسة <b>البني آدمين</b> (احتياجاتهم، قدراتهم، حدودهم، ...).",
      "وبيشمل دراسة <b>الـ computer technologies</b> اللي ممكن تحسّن التفاعل بين الـ users والكمبيوتر.",
      "وبيشمل دراسة <b>الطرق والتفضيلات والصعوبات اللي بتقابل الـ users</b> بتوع الأنظمة الحالية أو القديمة.",
      "غالباً هتحس إنك عارف حاجات من المادة دي، عشان إنتوا بني آدمين، وبتستخدموا التكنولوجيا، وطلبة كمبيوتر."
     ]
    },
    {
     "h": "يعني إيه HCI؟",
     "pts": [
      "<b>الـ HCI</b>: التفاعل بين الـ user والكمبيوتر، أو العلاقة بين الـ users والـ computer systems.",
      "صورة: user وكمبيوتر بينهم سهم في الاتجاهين مكتوب عليه \"Interaction\".",
      "الـ <b>Human Computer Interaction (HCI)</b> هو <b>multidisciplinary field of study</b> بيركز على تصميم الـ computer technology، وبالذات التفاعل بين البني آدمين (الـ users) والكمبيوتر.",
      "في الأول كان الـ HCI مهتم بالكمبيوتر بس، وبعد كده اتوسع وبقى بيغطي <b>تقريباً كل أشكال الـ information technology design</b>."
     ],
     "figH": {
      "user-computer": "الـ HCI: التفاعل بين الـ user والـ computer"
     }
    },
    {
     "h": "الـ 3 أجزاء بتوع الـ HCI (pie chart)",
     "pts": [
      "فيه pie chart بـ 3 أجزاء: الـ Human والـ Computer والـ Interaction.",
      "الـ <b>Human</b>: فيه الـ Communication theory والـ Industrial design والـ Social science والـ Cognitive psychology والـ Human factors.",
      "الـ <b>Computer</b>: فيه الـ Computer graphic والـ Operating system والـ Programming language.",
      "الـ <b>Interaction</b>: فيه الـ Interaction design."
     ],
     "figH": {
      "hci-parts": "الـ 3 أجزاء بتوع الـ HCI والمجالات اللي في كل جزء"
     }
    },
    {
     "h": "إيه هو الـ HCI؟ تفاصيل زيادة من slides السنة اللي فاتت",
     "pts": [
      "فيه مصطلحات بتتقال بنفس المعنى:<br>• الـ <b>HCI</b> (Human Computer Interaction)<br>• الـ <b>HMI</b> (Human Machine Interaction)<br>• الـ <b>MMI</b> (Man Machine Interaction)",
      "الـ HCI بيتعامل مع الـ <b>Design</b> والـ <b>Implementation</b> والـ <b>Evaluation</b> بتاع الـ interactive systems.",
      "فيه 3 أجزاء بيتقابلوا في الـ HCI:<br>• الـ <b>User</b> (قدراته العقلية والجسدية)<br>• الـ <b>Computer / Machine</b> (أجهزة الـ input/output)<br>• الـ <b>Interaction</b> (الـ interfaces والـ HCI patterns والـ design والـ usability evaluation)"
     ]
    },
    {
     "h": "يعني إيه interaction design؟",
     "pts": [
      "\"Designing interactive products to support the way people communicate and interact in their everyday and working lives.\" <b>Sharp, Rogers, and Preece (2019)</b>",
      "\"The design of spaces for human communication and interaction.\" <b>Winograd (1997)</b>"
     ]
    },
    {
     "h": "أهداف الـ interaction design",
     "pts": [
      "<b>نطوّر products تبقى usable</b>: الـ usability معناها <b>سهل تتعلمه، effective في الاستخدام، وبيدّي تجربة ممتعة</b>.",
      "<b>نشرك الـ users في الـ design process</b>."
     ]
    },
    {
     "h": "أهداف الـ HCI",
     "pts": [
      "نصمم عشان <b>الناس</b>، وعشان <b>الـ tasks</b>، وعشان <b>البيئات</b> اللي الـ users عايشين وشغالين فيها (زي organization مثلاً).",
      "نخلي التفاعل أسهل: نصمم systems <b>سهلة وطبيعية و intuitive</b> عشان <b>نوفر وقت</b> و<b>نقلل التكلفة</b>.",
      "نصمم GUIs (إزاي نتعلمها، ونستخدمها بكفاءة، ونقيّمها ونقارن بينها) وكمان web interfaces.",
      "نستكشف paradigms/prototypes جديدة للتفاعل، ونطوّر models و theories للتفاعل."
     ]
    },
    {
     "h": "الـ Invisible Interface (Idle Concept)",
     "pts": [
      "إحنا عايزين نخلي الـ interface <b>invisible على قد ما نقدر</b>، عشان الـ users يقضوا وقت قليل مركزين في الـ interface، ويركزوا بدل كده في الـ <b>task</b> اللي بيحاولوا يخلصوها.",
      "هدفنا كـ designers إننا نخلي البني آدمين يحسوا إنهم <b>بيتفاعلوا مع الـ task على طول</b>، والـ interface بتاعنا يختفي في نص التفاعل ده.",
      "الـ user المفروض <b>يفكر في الـ task مش في الأداة (tool)</b>.",
      "Diagram: الـ USER على الشمال، والـ TASK (clipboard عليها علامة صح) على اليمين، وأسهم رايحة جاية بينهم بتعدي على الـ INTERFACE (شاشة كمبيوتر) في النص."
     ],
     "figH": {
      "invisible-interface": "الـ interface الخفي: الـ user بيفكر في الـ task مش في الأداة"
     }
    },
    {
     "h": "التفاعل مع الـ Task والـ invisible interface",
     "pts": [
      "الـ user في الحقيقة عايز يخلّص <b>task</b> (يشتري أونلاين، يتفرج على فيديو، يترجم نص). الـ system مجرد وسيلة، فالـ user في الحقيقة بيتفاعل مع الـ task.",
      "مثال: في محاضرة أونلاين على Zoom، الدكتور بيتفاعل مع الطلبة، مش مع الكمبيوتر.",
      "زي حكم الماتش بالظبط، الـ interface بيبقى ناجح لما <b>محدش ياخد باله منه</b>."
     ]
    },
    {
     "h": "مثال على design وحش و design كويس: أزرار الأسانسير",
     "pts": [
      "الـ controls والـ labels بتوع الأسانسير في <b>الصف اللي تحت شكلهم كلهم واحد</b>، فسهل تدوس على label بالغلط بدل زرار الـ control.",
      "صورة (www.baddesigns.com):<br>• الصف اللي فوق فيه أرقام الأدوار 1 و 2 و 3، وجنب كل رقم زرار.<br>• الصف اللي تحت فيه DOOR OPEN، وزرار، وعلامة X، و STOP/RUN، وجرس، وزرار، و DOOR CLOSE وزرار، والـ labels والزراير كلهم نفس المربعات.<br>• وفيه سهم أحمر بيشاور على label في الصف اللي تحت.",
      "الناس مش بتغلط نفس الغلطة مع الـ labels والزراير في <b>الصف اللي فوق</b>. ليه؟ (سؤال للمناقشة؛ الـ slide مش بتدّي إجابة)"
     ],
     "figH": {
      "elevator": "تصميم وحش: زراير أسانسير كلها شبه بعض"
     }
    },
    {
     "h": "ليه الـ vending machine دي وحشة كده؟",
     "pts": [
      "<b>لازم تدوس على زرار الأول عشان تشغّل الـ reader</b>.",
      "<b>في العادي</b> بتحط الفلوس (الـ bill) الأول قبل ما تختار.",
      "فالمكنة <b>بتخالف convention معروف</b>.",
      "صورة: الـ labels اللي على المكنة مكتوب فيها \"STEP 1 PUSH ANY BUTTON TO START UNIT\" و \"STEP 2 FOLLOW DIRECTIONS ON DISPLAY\" و \"STEP 3 TAKE RECEIPT PLACE ON DASH\"؛ وفيه سهم بيشاور على فتحة الفلوس.",
      "صورة: لافتة 'REQUIRED' فيها مواعيد الشغل (7:00 a.m. - 10:00 p.m.)؛ وسهم بيشاور على فتحة الفلوس، وهي منفصلة عن الـ label بتاع STEP 1 'PUSH ANY BUTTON TO START UNIT'."
     ],
     "figH": {
      "vending": "تصميم وحش: ماكينة بيع بتكسر الترتيب المعتاد"
     }
    },
    {
     "h": "Design كويس: الـ marble answering machine",
     "pts": [
      "<b>Marble answering machine (Bishop, 1995)</b>. صورة: إيد بتشيل بلية (marble) من صينية والبلي بيتدحرج فيها على مجرى.",
      "مبنية على <b>الطريقة اللي الحاجات اليومية بتتصرف بيها</b>.",
      "<b>سهلة، و intuitive، وممتعة في الاستخدام</b>.",
      "محتاجة بس <b>one-step actions</b> عشان تعمل الـ core tasks."
     ],
     "figH": {
      "marble": "تصميم كويس: الـ marble answering machine"
     }
    },
    {
     "h": "Design كويس و design وحش: ريموت TiVo",
     "pts": [
      "ليه <b>ريموت TiVo</b> متصمم أحسن بكتير من الريموتات العادية؟",
      "<b>على شكل فول سوداني (peanut)</b> عشان يتمسك في الإيد.",
      "<b>Layout منطقي</b> و<b>زراير color-coded ومميزة</b>.",
      "<b>زراير سهل تلاقيها</b>."
     ],
     "figH": {
      "tivo": "تصميم كويس: ريموت الـ TiVo قصاد الريموت العادي"
     }
    },
    {
     "h": "Dilemma: التفاعل مع الـ smart TV",
     "pts": [
      "إيه أحسن طريقة تتفاعل بيها مع الـ smart TV؟ وليه؟ (سؤال للمناقشة؛ الـ slide مش بتدّي إجابة)",
      "1) <b>Pecking</b>: باستخدام grid keyboard عن طريق ريموت.",
      "2) <b>Swiping</b>: على صفين alphanumeric باستخدام touchpad على الريموت.",
      "3) <b>Voice control</b>: باستخدام ريموت أو smart speaker.",
      "صور: شاشة search على التليفزيون فيها grid keyboard حروف وأرقام (فيه Space و Delete و Clear)، وشاشة Apple ID Sign In فيها صف حروف من a لـ z وصف أرقام ورموز (.com و .net و .edu)."
     ],
     "figH": {
      "smart-tv": "مقارنة بين 3 طرق للكتابة على الـ smart TV"
     }
    },
    {
     "h": "الـ User research مهم: جهاز Qualcomm لسواقين التريلات",
     "pts": [
      "<b>جهاز Qualcomm لسواقين التريلات (truckers)</b>.",
      "النسخة الأولى كان فيها <b>زراير صغيرة</b>.",
      "الـ User interface اكتشف findings مفاجئة (ده كلام الـ slide؛ وعنوان الـ slide هو 'User Research is important'، فالمقصود إن الـ user research هو اللي اكتشف): السواقين غالباً <b>إيديهم كبيرة</b> وغالباً <b>لابسين جوانتي</b>.",
      "الـ design الأحسن: <b>touch screen كبيرة</b> و<b>stylus pen</b>.",
      "صورة: سواق بيستخدم الجهاز وهو متركب جنب الدركسيون."
     ],
     "figH": {
      "truckers": "الـ user research: جهاز Qualcomm لسواقين التريلات، قبل وبعد"
     }
    },
    {
     "h": "الـ UI design process (3 أجزاء)",
     "pts": [
      "الـ User research معناه إنك تتعلم عن الـ <b>users</b> (مهاراتهم، الحاجات اللي بتشتتهم، الاحتياجات الخاصة زي الأطفال وكبار السن وذوي الإعاقة)، والـ <b>tasks</b> اللي عايزين يخلصوها، والـ <b>previous research</b> عن قدرات الإنسان وحدوده وإدراكه.",
      "الـ Software development هو research: مش بس إنك تعمل software، ده كمان <b>إنك تتعلم إزاي تعمل الـ software الأنسب لهدفه</b> (دي واحدة من الـ 12 characteristics اللي اتدرست في Software Engineering)."
     ]
    },
    {
     "h": "مشكلة الـ full-featured systems (MS Office)",
     "pts": [
      "برامج الـ productivity الكاملة فيها features كتير عشان تغطي كل الاحتياجات الممكنة.",
      "الـ features الأكتر معناها:<br>• البرنامج يحسسك إنه معقد<br>• الحاجات أصعب في إنك تلاقيها أو تتعلمها<br>• التركيز يبقى على الأداة أكتر من الـ task",
      "الـ <b>Bloatware</b>: منتج فيه features كتير أوي، أو megabytes كتير أوي، أو بطيء أوي، أو صعب أوي في الاستخدام، أو ببساطة \"كتير أوي\".",
      "في Office 97–2003:<br>• الصحافة سمّته \"bloated\"<br>• كان فيه list طويلة جداً من الـ feature requests<br>• الناس حسّت إنها متحكمة أقل<br>• الـ menus والـ toolbars كانت مليانة ومش scalable<br>• الناس مكانتش بتاخد بالها من الـ features الجديدة ولا بتستخدمها"
     ]
    },
    {
     "h": "آليات Office 2000 (وليه فشلت)",
     "pts": [
      "الـ <b>Adaptive (personalized) menus</b>: الـ menu الرئيسية بتعرض list قصيرة بالـ commands الأكتر احتمال تستخدمها؛ وفيه <b>chevron</b> في الآخر بيفتح الـ menu كاملة.",
      "الـ <b>Rafted toolbars</b>: اتنين toolbars أو أكتر بيتشاركوا سطر واحد؛ وفيه algorithm بيتوقع الزراير الأقل استخداماً وبينقلها لـ <b>overflow</b> area.",
      "ليه فشلت: الـ customization مكانش سهل ولا دقيق. الـ short menus الغلط كانت بتجبر الـ user يعمل scan تاني للـ menu الكاملة، فالـ <b>scanning خد ضعف الوقت</b>. وبعدين اتقفلوا by default.",
      "القاعدة: <b>\"Auto-customization, unless it does a perfect job, is usually worse than no customization at all.\"</b> يعني الـ auto-customization لو مش شغال perfect، غالباً بيبقى أوحش من إنك متعملش customization خالص."
     ]
    },
    {
     "h": "من التخمين للـ data",
     "pts": [
      "قبل 2003، القرارات كانت في الغالب <b>تخمين</b>: \"based on feel, estimation, and guess work\" يعني بالإحساس والتقدير والتخمين.",
      "Office 2003 قدّم الـ <b>CEIP</b> (Customer Experience Improvement Program): balloon مكتوب فيها \"Help make Office better\" بتسجّل الـ users وبتجمع usage data و hardware data <b>anonymous</b>.",
      "لـ Office 2007 الفريق كان عنده data لأكتر من <b>1.3 billion sessions</b>. جالهم data من Word و Outlook كتير لدرجة إن <b>70% منها اترمى</b>.",
      "اتعلموا:<br>• أنهي commands بتتستخدم كتير<br>• أنهي بتتستخدم ورا بعض<br>• أنهي بتتستخدم <b>7x أكتر بالـ keyboard</b> من الماوس<br>• الناس بتفتح كام document في نفس الوقت<br>• الشاشات حجمها قد إيه"
     ]
    },
    {
     "h": "Example case: البحث في مكتبة كتب أونلاين",
     "pts": [
      "تصميم الـ search feature لمكتبة كتب أونلاين.",
      "أول mock-up: [header and menus] فوق؛ وبعدين صف فيه [Search box]، و drop-down [by Title]، وزرار [Go]؛ وبعدين 4 مربعات كتب ([Book 1]، [Book 2]، [Book 3]، [Book 3]).",
      "تاني mock-up: نفس الـ layout بألوان فاقعة (header أصفر، search box أزرق، drop-down أخضر، زرار Go برتقاني)، و 3 كتب، ووش smiley كارتون وجنبه speech bubble مكتوب فيها \"Reading Rox\".",
      "<b>Design وحش</b>: <b>الـ user research component تقريباً مش موجود</b>."
     ],
     "figH": {
      "book-mockups": "البحث في مكتبة الكتب الأونلاين: اتنين mock-ups"
     }
    },
    {
     "h": "Example case: الـ International Children's Digital Library (ICDL)",
     "pts": [
      "<b>HCIL</b> هي اللي صممت الـ <b>international children digital library</b>.",
      "Screenshot للـ home page (University of Maryland):<br>• العنوان: \"International Children's Digital Library, A Library for the World's Children\".<br>• لينكات The Foundation:<span class=\"ltr\">Mission, Board of Advisors, Foundation Team, Sponsors, For Researchers &amp; Librarians</span>• partnership مع الـ Human-Computer Interaction Lab بتاع University of Maryland، بدعم من الـ iSchool والـ Computer Science Department بتوع UMD.<br>• زرار READ BOOKS!<br>• قوايم كتب حسب اللغة، واللون، والشكل، والـ format، والـ genre (أنواع مختلفة)، والشخصية، والحقيقي ضد الخيالي (true vs. make believe).<br>• الـ Our Mission: الـ ICDL Foundation بتنشر التسامح واحترام الثقافات المختلفة عن طريق إنها توفر الوصول لأحسن أدب أطفال من كل حتة في العالم.<br>• labels تانية: لينك <b>Book list</b> و <b>Library News and Notes (June 2, 2021)</b>.",
      "Screenshot لصفحة الـ Simple Search: زراير كبيرة بالصور عشان تدور بيها:<br>• حسب لون الغلاف:<span class=\"ltr\">Rainbow, Red, Orange, Yellow, Green, Blue Covers</span>• حسب السن:<span class=\"ltr\">Three to Five, Six to Nine, Ten to Thirteen</span>• وزراير تانية:<span class=\"ltr\">Make Believe Books, True Books, Short/Medium/Long Books, Recently Added Books, Award Winning Books, Fairy Tales and Folk Tales, Kid Characters, Real Animal Characters, Imaginary Creature Characters, Picture Books, Chapter Books</span>• وكمان search box للـ Keywords.<br>وفيها كمان صفوف <b>Featured Books</b> و <b>From Our Shelves</b>، و filter <b>Show Any Language books</b>، و <b>More Choices</b>، و <b>Search By Collections</b> و <b>Browse Exhibitions</b>.",
      "صفحة الـ search بتاعة الـ ICDL <b>design كويس</b>: <b>أكتر من 3 مليون unique visitors</b>، والـ users فضّلوا الـ <b>visual search</b> (<b>71% من عمليات البحث</b>)."
     ],
     "figH": {
      "icdl-search": "البحث بالصور في الـ ICDL للأطفال"
     }
    },
    {
     "h": "Case studies",
     "pts": [
      "الدروس: الـ designer الشاطر بيفهم المشاكل من <b>وجهة نظر الـ user</b> و<b>بيشتغل مع الـ users بدل ما يخمّن</b>."
     ]
    },
    {
     "h": "User experience وحشة: الـ form بتاعة عيادة الدكتور",
     "pts": [
      "إزاي ممكن نتجنب الـ user experience الوحشة دي بـ design أحسن؟ (سؤال للمناقشة؛ الـ slide مش بتدّي إجابة)",
      "واحد قعد <b>30 دقيقة على الأقل</b> يملا <b>form في عيادة دكتور</b>، كانت بتطلب العنوان ورقم التليفون والإيميل والـ social security number <b>في المتوسط 3 مرات</b> لـ <b>10 أشخاص وجهات مختلفة على الأقل</b> (ابني، المريض، أنا، مراتي، دكاترته، دكاترة الأسنان، الصيدليات، شركات التأمين، بيانات الاتصال في الطوارئ، والأطراف المسؤولة ...).",
      "بعد ما خلص وعمل submit، جاتله الرسالة دي: <b>\"Internal server error\"</b> (وجنبها وش زعلان)."
     ],
     "figH": {
      "doctor-form": "تجربة استخدام وحشة: الـ form بتاعة عيادة الدكتور"
     }
    },
    {
     "h": "اعتبارات الـ design (Design considerations)",
     "pts": [
      "لازم ناخد في اعتبارنا: <b>مين الـ users</b>، و<b>إيه الـ activities اللي بتتعمل</b>، و<b>التفاعل بيحصل فين</b>.",
      "لازم <b>نعمل optimize للتفاعلات</b> اللي الـ users بيعملوها مع الـ product، عشان <b>تناسب الـ activities والاحتياجات بتاعة الـ users</b>."
     ]
    },
    {
     "h": "أنهي نوع design؟",
     "pts": [
      "فيه مصطلحات تانية كتير بتتقال وبتركز على الحاجة اللي بتتصمم، زي <b>الـ user interface design والـ software design والـ user-centered design والـ product design والـ web design والـ experience design (UX)</b>.",
      "<b>الـ Interaction design هو الـ umbrella term</b> اللي بيغطي كل الجوانب دي.",
      "وهو <b>أساسي لكل الـ disciplines والـ fields والـ approaches</b> اللي بتهتم بالبحث وتصميم computer-based systems للناس."
     ]
    },
    {
     "h": "UI ضد UX ضد HCI",
     "pts": [
      "<b>UI Design</b> (User Interface): هو الـ <b>interactivity والـ look and feel</b> بتاع شاشة المنتج أو صفحة الويب. يعني إنك تصمم الحاجة حلوة على الشاشة.",
      "<b>UX Design</b> (User Experience): هي <b>التجربة الكاملة</b> بتاعة الـ user مع المنتج أو الموقع. الـ UX بيـ<b>حدد (dictate)</b> التفاعلات.",
      "أما الـ <b>HCI</b> فهو في الأساس عن <b>فهم</b> التفاعل بين البني آدمين والكمبيوتر.",
      "الأنظمة القديمة كانت شغالة على أجهزة غالية، فالمهندسين ركزوا على software كفء وطنّشوا الـ usability. النهارده عشان تنجح لازم design يكون <b>user-centric</b> ومركز على الـ usability وتجربة حلوة وسلسة."
     ]
    },
    {
     "h": "الـ Interaction design والمجالات التانية (diagram)",
     "pts": [
      "Diagram: دايرة مكتوب عليها Interaction Design في النص، وحواليها 3 مجموعات.",
      "الـ <b>Academic Disciplines</b> (أسهم داخلة على الـ ID):<span class=\"ltr\">Ergonomics, Psychology/Cognitive Science, Informatics, Engineering, Computer Science/Software Engineering, Social Sciences (e.g. Sociology, Anthropology)</span>",
      "الـ <b>Design Practices</b> (أسهم داخلة على الـ ID):<span class=\"ltr\">Graphic Design, Product Design, Artist-Design, Industrial Design, Film Industry</span>",
      "الـ <b>Interdisciplinary Fields</b> (أسهم في الاتجاهين مع الـ ID):<span class=\"ltr\">Human Factors (HF), Cognitive Engineering, Human-Computer Interaction (HCI), Cognitive Ergonomics, Computer-Supported Cooperative Work (CSCW), Information Systems</span>"
     ],
     "figH": {
      "id-umbrella": "الـ interaction design والمجالات اللي حواليه"
     }
    },
    {
     "h": "العلاقة بين الـ ID والـ HCI والمجالات التانية (جدول)",
     "pts": [
      "<b>الـ Academic disciplines اللي بتساهم في الـ ID</b> هي الـ Psychology والـ Social Sciences والـ Computing Sciences والـ Engineering والـ Ergonomics والـ Informatics.",
      "<b>الـ Design practices اللي بتساهم في الـ ID</b> هي الـ Graphic design والـ Product design والـ Artist-design والـ Industrial design والـ Film industry."
     ]
    },
    {
     "h": "مكان الـ HCI وسط المجالات",
     "pts": [
      "الـ <b>Engineering</b> مع الـ <b>Psychology</b> بيطلّعوا الـ <b>Human Factors Engineering</b>، يعني تصميم التفاعل بين الناس والمنتجات أو الـ systems أو الأجهزة.",
      "الـ Human Factors Engineering بيتفرع لـ <b>Industrial Design</b> و<b>HCI</b> و<b>Product Design</b>.",
      "والـ HCI نفسه بيتفرع لـ <b>UI Design</b> و<b>UX Design</b> و<b>Interaction</b> design.",
      "مثال على حدود الإنسان: البني آدم يقدر يفرّق بين <b>ملايين الألوان</b> لكن حوالي <b>30 درجة رمادي</b> بس.",
      "الفرق بين الـ HCI والـ human factors engineering بيقل، عشان أجهزة أكتر بقت computerized."
     ]
    }
   ],
   "cards": [
    "التفاعل بين الـ user والكمبيوتر، أو العلاقة بين الـ users والـ computer systems.",
    "HMI (Human Machine Interaction) و MMI (Man Machine Interaction).",
    "الـ Design والـ implementation والـ evaluation بتاع الـ interactive systems.",
    "الـ Interactivity والـ look and feel بتاع شاشة المنتج أو صفحة الويب.",
    "التجربة الكاملة بتاعة الـ user مع المنتج أو الموقع.",
    "تصميم التفاعل بين الناس والمنتجات أو الـ systems أو الأجهزة (Engineering + Psychology).",
    "حوالي 30 (في مقابل ملايين الألوان).",
    "interface بيختفي عشان الـ users يركزوا على الـ task مش على الأداة.",
    "User research ← Design and prototyping ← Evaluation (تحسين).",
    "أكتر من 3M unique visitors؛ والـ visual search اتستخدم في 71% من عمليات البحث.",
    "زراير صغيرة، بس الـ truckers إيديهم كبيرة وبيلبسوا جوانتيات. الحل: touch screen كبيرة و stylus pen.",
    "منتج فيه features كتير أوي، أو megabytes كتير، أو بطيء أوي، أو صعب أوي، أو ببساطة \"كتير أوي\".",
    "list قصيرة بالـ commands المتوقع استخدامها؛ والـ chevron بيفتح الـ menu كاملة.",
    "الـ Toolbars بتتشارك سطر واحد؛ والزراير الأقل استخداماً بتروح overflow area.",
    "لو مش شغال perfect، غالباً بيبقى أوحش من إنك متعملش customization خالص.",
    "Customer Experience Improvement Program: بيجمع usage data anonymous من users بتوع Office 2003.",
    "أكتر من 1.3 billion sessions؛ و70% من data الـ Word/Outlook اترمت.",
    "field متعدد التخصصات (multidisciplinary) بيركز على تصميم الـ computer technology، وبالذات التفاعل بين البني آدمين (الـ users) والكمبيوتر. واتوسع من الكمبيوتر لتقريباً كل أشكال الـ information technology design.",
    "البني آدمين (احتياجاتهم، قدراتهم، حدودهم)، والـ computer technologies اللي ممكن تحسّن التفاعل بين الـ user والكمبيوتر، والطرق والتفضيلات والصعوبات اللي بتقابل الـ users بتوع الأنظمة الحالية أو القديمة.",
    "Human و Computer و Interaction.",
    "Communication theory، Industrial design، Social science، Cognitive psychology، Human factors.",
    "Computer graphic، Operating system، Programming language. (والجزء بتاع الـ Interaction هو Interaction design.)",
    "\"Designing interactive products to support the way people communicate and interact in their everyday and working lives.\"",
    "\"The design of spaces for human communication and interaction.\"",
    "نطوّر products تبقى usable، ونشرك الـ users في الـ design process.",
    "سهل تتعلمه، effective في الاستخدام، وبيدّي تجربة ممتعة.",
    "الـ labels والـ controls في الصف اللي تحت شكلهم كلهم واحد، فسهل تدوس على label بالغلط بدل زرار الـ control.",
    "لازم تدوس على زرار الأول عشان تشغّل الـ reader، مع إن في العادي بتحط الفلوس قبل ما تختار، فهي بتخالف convention معروف.",
    "Bishop, 1995. Design كويس: مبنية على الطريقة اللي الحاجات اليومية بتتصرف بيها؛ سهلة و intuitive وممتعة في الاستخدام؛ one-step actions بس للـ core tasks.",
    "على شكل فول سوداني (peanut) عشان يتمسك في الإيد؛ layout منطقي وزراير color-coded ومميزة؛ زراير سهل تلاقيها.",
    "Pecking على grid keyboard عن طريق ريموت؛ swiping على صفين alphanumeric على touchpad في الريموت؛ voice control باستخدام ريموت أو smart speaker.",
    "Design وحش: الـ user research component تقريباً مش موجود.",
    "صممتها HCIL. Design كويس: أكتر من 3 مليون unique visitors؛ والـ users فضّلوا الـ visual search (71% من عمليات البحث).",
    "أكتر من 30 دقيقة، والعنوان والتليفون والإيميل والـ SSN اتطلبوا في المتوسط 3 مرات لـ 10 أشخاص وجهات على الأقل، وبعدين \"Internal server error\": user experience وحشة.",
    "ناخد في اعتبارنا مين الـ users، وإيه الـ activities اللي بتتعمل، والتفاعل بيحصل فين؛ ونعمل optimize للتفاعلات عشان تناسب الـ activities والاحتياجات بتاعة الـ users.",
    "Interaction design.",
    "Psychology، Social Sciences، Computing Sciences، Engineering، Ergonomics، Informatics.",
    "Graphic design، Product design، Artist-design، Industrial design، Film industry.",
    "Human Factors (HF)، Cognitive Engineering، Human-Computer Interaction (HCI)، Cognitive Ergonomics، Computer-Supported Cooperative Work (CSCW)، Information Systems."
   ],
   "qa": [
    "نصمم عشان الناس والـ tasks والبيئات؛ نسهّل التفاعل بـ systems سهلة وطبيعية و intuitive توفر وقت وتقلل التكلفة؛ نصمم ونتعلم ونستخدم ونقيّم الـ GUIs والـ web interfaces؛ نستكشف interaction paradigms جديدة؛ ونطوّر models و theories للتفاعل.",
    "الـ HCI عن فهم التفاعل بين البني آدمين والكمبيوتر. الـ UX design عن تحديد (dictating) التفاعلات دي (التجربة الكاملة). الـ UI design عن إنك تصمم الحاجة حلوة على الشاشة (الـ look والـ feel والـ interactivity).",
    "مع الـ task. الـ system وسيلة عشان يخلّص task زي الشرا أونلاين. في محاضرة Zoom الدكتور بيتفاعل مع الطلبة مش مع اللابتوب. والـ interface الكويس محدش بياخد باله منه، زي الحكم الكويس.",
    "الـ users (مهاراتهم، اللي بيشتتهم، الاحتياجات الخاصة زي الأطفال وكبار السن وذوي الإعاقة)، والـ tasks اللي عايزين يخلصوها، والـ research الموجود عن قدرات الإنسان وحدوده وإدراكه.",
    "الـ designer الشاطر بيفهم المشاكل من وجهة نظر الـ user وبيشتغل مع الـ users بدل ما يخمّن هم بيحبوا إيه.",
    "الـ Customization مكانش سهل ولا دقيق. الـ short menu الغلط كانت بتجبر الـ users يعملوا scan للـ menu الكاملة تاني (الـ scanning خد ضعف الوقت)، وده زوّد التعقيد وقلّل الكفاءة. وبعدين اتقفلوا by default.",
    "عن طريق الـ CEIP، اللي جمع usage data anonymous (أكتر من 1.3B sessions): أنهي commands بتتستخدم، وبأنهي ترتيب، keyboard ولا ماوس، عدد الـ documents المفتوحة، وحجم الشاشات.",
    "البرنامج يحسسك إنه معقد، وبيبقى أصعب تلاقي أو تتعلم إزاي تعمل الحاجات، والـ users بيركزوا على الأداة أكتر من الـ task.",
    "الـ HCI هو التفاعل بين الـ user والكمبيوتر، أو العلاقة بين الـ users والـ computer systems. وهو multidisciplinary field of study بيركز على تصميم الـ computer technology، وبالذات التفاعل بين البني آدمين (الـ users) والكمبيوتر؛ وفي الأول كان مهتم بالكمبيوتر بس، وبعد كده اتوسع وبقى بيغطي تقريباً كل أشكال الـ information technology design. وبيشمل دراسة: 1) البني آدمين (احتياجاتهم، قدراتهم، حدودهم) 2) الـ computer technologies اللي ممكن تحسّن التفاعل بين الـ users والكمبيوتر 3) الطرق والتفضيلات والصعوبات اللي بتقابل الـ users بتوع الأنظمة الحالية أو القديمة.",
    "التعريفات: 1) \"Designing interactive products to support the way people communicate and interact in their everyday and working lives\" (Sharp, Rogers, and Preece, 2019). 2) \"The design of spaces for human communication and interaction\" (Winograd, 1997). الأهداف: 1) نطوّر products تبقى usable، والـ usability معناها سهل تتعلمه، effective في الاستخدام، وبيدّي تجربة ممتعة 2) نشرك الـ users في الـ design process.",
    "1) بنخلي الـ interface invisible على قد ما نقدر عشان الـ users يقضوا وقت قليل مركزين في الـ interface، ويركزوا بدل كده في الـ task اللي بيحاولوا يخلصوها. 2) هدف الـ designer إنه يخلي البني آدمين يحسوا إنهم بيتفاعلوا مع الـ task على طول، والـ interface يختفي في نص التفاعل ده. 3) الـ user المفروض يفكر في الـ task مش في الأداة (tool).",
    "1) النسخة الأولى من جهاز Qualcomm لسواقين التريلات كان فيها زراير صغيرة. 2) الـ User interface (الـ user research) اكتشف findings مفاجئة: السواقين غالباً إيديهم كبيرة وغالباً لابسين جوانتي. 3) الـ design الأحسن استخدم touch screen كبيرة و stylus pen.",
    "الـ Vending machine: 1) لازم تدوس على زرار الأول عشان تشغّل الـ reader 2) في العادي بتحط الفلوس الأول قبل ما تختار 3) فهي بتخالف convention معروف. الـ Marble answering machine (Bishop, 1995): 1) مبنية على الطريقة اللي الحاجات اليومية بتتصرف بيها 2) سهلة و intuitive وممتعة في الاستخدام 3) محتاجة بس one-step actions عشان تعمل الـ core tasks.",
    "1) الـ search بتاع مكتبة الكتب الأونلاين كان design وحش، عشان الـ user research component كان تقريباً مش موجود. 2) الـ International Children's Digital Library، اللي صممتها HCIL، صفحة الـ search بتاعتها design كويس: أكتر من 3 مليون unique visitors، والـ users فضّلوا الـ visual search (71% من عمليات البحث).",
    "1) مين الـ users 2) إيه الـ activities اللي بتتعمل 3) التفاعل بيحصل فين. وكمان لازم نعمل optimize للتفاعلات اللي الـ users بيعملوها مع الـ product عشان تناسب الـ activities والاحتياجات بتاعة الـ users.",
    "فيه مصطلحات كتير بتركز على الحاجة اللي بتتصمم (user interface design، software design، user-centered design، product design، web design، experience design (UX))؛ والـ interaction design هو الـ umbrella term اللي بيغطي كل الجوانب دي، وهو أساسي لكل الـ disciplines والـ fields والـ approaches اللي بتهتم بالبحث وتصميم computer-based systems للناس. الـ Academic disciplines: 1) Psychology 2) Social Sciences 3) Computing Sciences 4) Engineering 5) Ergonomics 6) Informatics. الـ Design practices: 1) Graphic design 2) Product design 3) Artist-design 4) Industrial design 5) Film industry.",
    "1) الـ <b>User research</b>: إنك تتعلم عن الـ users (مهاراتهم، والحاجات اللي ممكن تشتتهم، والاحتياجات الخاصة زي الأطفال وكبار السن والناس اللي عندهم إعاقات)، والـ tasks اللي بيحاولوا يخلصوها، والـ research الموجود عن قدرات الإنسان وحدوده والـ perception. 2) الـ <b>Design and prototyping</b> للـ interface. 3) الـ <b>User interface evaluation</b> (improvement)."
   ],
   "quiz": [
    [
     "الـ Human Computer Interaction ده الاسم الكامل للـ HCI نفسه، بس المحاضرة بتقول إن الـ HMI والـ MMI كمان مصطلحات بنفس المعنى، فلو اخترت دي بس هتفوّت اتنين (L1, What is HCI?).",
     "الـ HMI واحد من المصطلحات اللي بتتقال بالتبادل، بس الـ HCI والـ MMI كمان بيوصفوا نفس المجال، فالإجابة الكاملة هي \"All the above\" (L1, What is HCI?).",
     "الـ MMI مصطلح منهم فعلاً، بس كمان الـ HCI والـ HMI؛ والسؤال عايز الكل، يعني \"All the above\" (L1, What is HCI?).",
     "صح. الـ HCI والـ HMI والـ MMI كلهم بيتقالوا على نفس المجال."
    ],
    [
     "الـ UX بيغطي التجربة الكاملة بتاعة الـ user، وده أوسع من الـ look and feel بتاع الشاشة.",
     "صح. الـ UI design هو الـ interactivity والـ look and feel بتاع الشاشة أو الصفحة.",
     "ده المجال الأب اللي بيتكلم عن تفاعل الناس مع المنتجات أو الـ systems أو الأجهزة.",
     "ده أخو الـ HCI تحت الـ human factors engineering؛ مش تصميم شاشات."
    ],
    [
     "الموضوع مش إننا نشيل الـ visuals؛ الموضوع عن الانتباه.",
     "صح. الـ interface بيختفي والـ user بيفكر في الـ task مش في الأداة.",
     "إنك تخبي features في menus مش بيخلي التفاعل مباشر.",
     "نوع الـ modality ملوش علاقة؛ أي interface ممكن يحاول يبقى invisible."
    ],
    [
     "قليل أوي: الإنسان بيقدر يفرّق بين حوالي 30 درجة رمادي، يعني عشر أضعاف الرقم ده، وده برضه رقم صغير جداً جنب ملايين الألوان (L1, HCI hierarchy).",
     "صح. مثال حدود الإنسان في المحاضرة هو حوالي 30 درجة رمادي.",
     "كتير بعشر أضعاف. مثال حدود الإنسان في المحاضرة بيقارن ملايين الألوان بحوالي 30 درجة رمادي بس (L1, HCI hierarchy).",
     "كتير جداً. الفكرة من المثال إننا بنفرّق بين درجات رمادي قليلة أوي: حوالي 30 بس، قصاد ملايين الألوان (L1, HCI hierarchy)."
    ],
    [
     "صح. الترتيب هو user research ← design and prototyping ← evaluation.",
     "الـ Evaluation (improvement) هو الجزء التالت والأخير: مش هتقدر تقيّم الـ interface غير بعد ما تعمل research على الـ users وتصممه (L1, UI design process).",
     "الـ Design and prototyping هو الجزء التاني؛ بييجي بعد الـ user research، لأنك لازم تفهم الـ users والـ tasks بتاعتهم قبل ما تصمم (L1, UI design process).",
     "الـ Implementation مش واحد من الـ 3 أجزاء المذكورين."
    ],
    [
     "الـ 17% دي نفس الرقم الصح بس مقلوب: الـ visual search اتستخدم في 71% من عمليات البحث، وده بيوضح إن المستخدمين فضّلوه (L1, Case studies).",
     "الـ 50% معناها إن مفيش تفضيل واضح، بس المحاضرة بتقول إن الـ visual search اتستخدم في 71% من عمليات البحث، يعني أغلبية واضحة (L1, Case studies).",
     "صح. 71% من عمليات البحث استخدمت الـ visual search.",
     "كتير. الـ International Children's Digital Library قالت إن الـ visual search اتستخدم في 71% من عمليات البحث، مش 91% (L1, Case studies)."
    ],
    [
     "العكس: الأجهزة زمان كانت غالية، فالمهندسين كانوا بيعملوا optimize للـ software عشان الماكينة وبيتجاهلوا الـ usability خالص (L1, UI vs UX vs HCI).",
     "صح. المهندسين كانوا بيعملوا optimize للجهاز الغالي، مش لتجربة الـ user.",
     "الـ User-centric design ده بيوصف الأنظمة النهارده، اللي نجاحها معتمد على الـ usability. الأنظمة القديمة كانت machine-centric، تركيزها على software كفء (L1, UI vs UX vs HCI).",
     "الـ invisible interface دي فكرة مثالية حديثة، المستخدم فيها بيركز على الـ task. الأنظمة القديمة كانت متجاهلة الـ usability أصلاً، فكانت بعيدة عنها خالص (L1, Invisible interface)."
    ],
    [
     "صح. الاتنين بيصبّوا في الـ human factors engineering في رسمة الـ hierarchy.",
     "دول تحت الـ human factors engineering، مش فوقه.",
     "الـ Art والـ Marketing مش موجودين في رسمة الـ hierarchy أصلاً. الـ Human factors engineering جاي من Engineering + Psychology (L1, HCI hierarchy).",
     "دول فروع من الـ human factors engineering، مش مصادره."
    ],
    [
     "صح. المحاضرة بتسمي ده \"software development is research\".",
     "الجملة متاخدة من المحاضرة بالنص، فهي صح."
    ],
    [
     "التجربة الكاملة مع المنتج أو الموقع دي تعريف الـ UX design. الـ UI design هو بس الـ interactivity والـ look and feel بتاع الشاشة أو الصفحة (L1, UI vs UX vs HCI).",
     "صح. الـ UI هو الـ look والـ feel والـ interactivity؛ الـ UX هو التجربة الكاملة."
    ],
    [
     "الزراير الصغيرة كانت هي المشكلة، مش حاجة بيفضلوها.",
     "الـ design الأحسن أصلاً استخدم touch screen كبيرة.",
     "صح. وده السبب إن الزراير الصغيرة فشلت.",
     "الـ Voice systems مش جزء من case الـ Qualcomm أصلاً. الـ research لقى إن سواقين التريلات إيديهم كبيرة ولابسين جوانتيات، فالحل كان touch screen كبيرة مع stylus (L1, Qualcomm device)."
    ],
    [
     "حالة سواقين التريلات مفيهاش أي ذكر للـ voice input. مشكلة الجهاز الأولاني كانت زراير صغيرة الإيدين الكبيرة اللابسة جوانتيات مش قادرة تدوس عليها (L1, Qualcomm device).",
     "صح. جهاز الـ Qualcomm الأولاني كان فيه زراير صغيرة، وفشل عشان الـ user research بيّن إن السواقين غالباً إيديهم كبيرة ولابسين جوانتيات (L1, Qualcomm device).",
     "الـ touch screen الكبيرة مع الـ stylus pen دي كانت التصميم المحسّن اللي جه بعد الـ user research، مش النسخة الأولانية (L1, Qualcomm device).",
     "الجهاز كان ليه interface فعلاً؛ مشكلته كانت الزراير الصغيرة. والحل خلّى فيه شاشة وخلاها touch screen كبيرة (L1, Qualcomm device)."
    ],
    [
     "صح. الـ adaptive menu بيعرض الأول list قصيرة بالـ commands اللي غالباً هتستخدمها؛ ولما تدوس على الـ chevron اللي في آخرها بتفتح الـ menu كلها (L1, Office 2000 mechanisms).",
     "الـ double right-click مش جزء من الـ adaptive menus. المحاضرة بتقول إن الـ chevron اللي في آخر الـ menu القصيرة هو اللي بيفتحها (L1, Office 2000 mechanisms).",
     "الـ overflow area تبع الـ rafted toolbars.",
     "مفيش في المحاضرة حاجة اسمها تفضل دايس فتتفتح. الـ adaptive menu الكاملة بتتفتح بالضغط على الـ chevron اللي في آخرها (L1, Office 2000 mechanisms)."
    ],
    [
     "الأيقونات عمرها ما كانت المشكلة. المشكلة إن لو الـ short menu غلط، المستخدم بيضطر يعمل scan للـ full menu كمان (L1, Office 2000 mechanisms).",
     "صح. لما الـ short menu المتوقعة متكونش فيها الـ command، المستخدم بيعملها scan، وبعدين يفتحها ويعمل scan للـ full menu تاني، فالـ scanning بياخد حوالي ضعف الوقت (L1, Office 2000 mechanisms).",
     "الـ CEIP ملوش علاقة بـ Office 2000: ده جه بعدين في Office 2003 عشان يجمع usage data، ومكانش بيبطّأ الـ menu scanning (L1, From guesswork to data).",
     "الـ Toolbars مااتشالتش: الـ rafted toolbars كانت بتشارك سطر واحد وبتنقل الزراير المتوقع إنها أقل استخدام لـ overflow area (L1, Office 2000 mechanisms)."
    ],
    [
     "أصغر بألف مرة: الفريق كان عنده أكتر من 1.3 billion session، مش million (L1, From guesswork to data).",
     "الـ 13 million أقل بكتير من الرقم الحقيقي. في Office 2007 الفريق كان عنده أكتر من 1.3 billion session من الـ usage data (L1, From guesswork to data).",
     "صح. الـ CEIP إدّى فريق Office 2007 أكتر من 1.3 billion session؛ والـ data بتاعة Word وOutlook كانت كتير لدرجة إن 70% منها اترمى (L1, From guesswork to data).",
     "الـ 70 جاية من معلومة تانية: 70% من data الـ Word والـ Outlook اترمت. الإجمالي كان أكتر من 1.3 billion session (L1, From guesswork to data)."
    ],
    [
     "الـ Usage data بقت متاحة بس مع الـ CEIP في Office 2003. قبل كده الفريق مكانش عنده data حقيقية يبني عليها قراراته (L1, From guesswork to data).",
     "صح. فريق Office اعترف إن القرارات قبل 2003 كانت \"based on feel, estimation, and guess work\"، لحد ما الـ CEIP جاب usage data حقيقية (L1, From guesswork to data).",
     "المحاضرة مقالتش إن القرارات كانت جاية من usability labs. قالت إنها كانت مبنية على الإحساس والتقدير والتخمين (L1, From guesswork to data).",
     "الـ Competitor analysis مش مذكور خالص. القرارات قبل 2003 كانت مبنية على الإحساس والتقدير والتخمين، واللي اتستبدل بعدين بـ data الـ CEIP (L1, From guesswork to data)."
    ],
    [
     "الـ HCI عن التفاعل أو العلاقة بين الـ users والكمبيوتر، مش عن أداء الـ hardware.",
     "صح. ده تعريف الـ HCI اللي في الـ slide (L1, What is HCI?).",
     "الـ programming language مجرد item واحد في جزء الـ Computer في الـ pie chart بتاع الـ HCI.",
     "الـ Computer graphic item واحد في جزء الـ Computer؛ والـ HCI بيغطي الـ human والـ computer والـ interaction."
    ],
    [
     "صح. الـ slide بتقول إن الـ HCI هو multidisciplinary field اتوسع من الكمبيوتر لتقريباً كل أشكال الـ IT design (L1, What is HCI?).",
     "غلط. الـ slide بتقول التوسع ده بالظبط."
    ],
    [
     "الـ Operating system في جزء الـ Computer.",
     "الـ Interaction design هو الـ item الوحيد في جزء الـ Interaction.",
     "صح. جزء الـ Human فيه communication theory و industrial design و social science و cognitive psychology و human factors (L1, The three parts of HCI (pie chart)).",
     "الـ Programming language في جزء الـ Computer."
    ],
    [
     "Winograd (1997) عرّفه إنه \"the design of spaces for human communication and interaction\".",
     "صح. الـ slide بتنسب الـ quote ده لـ Sharp, Rogers, and Preece (2019) (L1, What is interaction design?).",
     "Bishop (1995) هو بتاع الـ marble answering machine.",
     "HCIL هي اللي صممت الـ International Children's Digital Library."
    ],
    [
     "الـ slides بتعرّف الـ usability إنها سهل تتعلمه، و effective في الاستخدام، وممتع.",
     "صح. ده معنى الـ usability في الـ slide تحت هدف \"develop usable products\" (L1, Goals of interaction design).",
     "الـ features مش جزء من تعريف الـ usability في الـ slide.",
     "الشكل والألوان مش جزء من التعريف اللي في الـ slide؛ الـ usability معناها سهل تتعلمه، effective في الاستخدام، وبيدّي تجربة ممتعة."
    ],
    [
     "الـ slide بتقول العكس: نشرك الـ users في الـ design process.",
     "صح. الأهداف هي إننا نطوّر products تبقى usable ونشرك الـ users في الـ design process (L1, Goals of interaction design).",
     "فكرة الـ invisible interface هدفها إن الـ interface يبقى invisible على قد ما نقدر.",
     "ده مش مذكور في الـ slides."
    ],
    [
     "دي كانت مشكلة جهاز Qualcomm بتاع سواقين التريلات.",
     "صح. ده الشرح اللي في الـ slide (L1, Example of bad and good design: elevator controls).",
     "ده وصف الـ vending machine.",
     "الـ slide بتقول إن الناس مش بتغلط نفس الغلطة في الصف اللي فوق."
    ],
    [
     "الزراير الـ color-coded كانت ميزة في ريموت TiVo؛ والـ slide مش بتقول كده عن الـ vending machine.",
     "دي كانت الـ form بتاعة عيادة الدكتور.",
     "صح. في العادي بتحط الفلوس قبل ما تختار (L1, Why is this vending machine so bad?).",
     "الرسالة دي كانت في آخر مثال الـ form بتاعة عيادة الدكتور."
    ],
    [
     "صح. وكمان هي سهلة و intuitive وممتعة في الاستخدام (L1, Good design: marble answering machine).",
     "ده وصف ريموت TiVo.",
     "ده كان الـ design الأحسن لجهاز Qualcomm بتاع السواقين.",
     "الـ Visual search كان في صفحة الـ search بتاعة الـ ICDL."
    ],
    [
     "اختيار غلط. ده موجود على الـ slide كسبب.",
     "اختيار غلط. ده موجود على الـ slide كسبب.",
     "اختيار غلط. ده موجود على الـ slide كسبب.",
     "صح. الـ Voice control جه بس كاختيار واحد في الـ smart TV dilemma، مش كسبب لـ TiVo (L1, Good and bad design: TiVo remote)."
    ],
    [
     "ده الـ pecking.",
     "صح. ده الاختيار التاني في الـ slide (L1, Dilemma: interacting with a smart TV).",
     "ده الـ voice control.",
     "الـ stylus pen كان في جهاز السواقين."
    ],
    [
     "عدد الزوار (3 مليون) اتذكر للـ design الكويس بتاع الـ ICDL.",
     "صح. ده حكم الـ slide (L1, Example case: online book library search).",
     "الـ Visual search كان الميزة الكويسة في الـ ICDL.",
     "الـ mock-ups الاتنين فيهم search box و drop-down بـ by-Title وزرار Go."
    ],
    [
     "كان فيها أكتر من 3 مليون unique visitors والـ visual search هو اللي اتفضّل.",
     "صح. دي الأرقام اللي في الـ slide (L1, Example case: International Children's Digital Library (ICDL)).",
     "الـ slide بتقول 71%، مش 17%.",
     "ده حصل مع الـ form بتاعة عيادة الدكتور."
    ],
    [
     "صح. خدت 30 دقيقة على الأقل وخلصت بـ \"Internal server error\" (L1, Bad user experience: the doctor's office form).",
     "الأرقام معكوسة: في المتوسط 3 مرات لـ 10 أشخاص وجهات على الأقل.",
     "الـ 30 دي الدقايق اللي اتقضت، مش عدد الناس.",
     "الـ 71% هي نسبة عمليات الـ visual search في الـ ICDL."
    ],
    [
     "اختيار غلط. ده مذكور.",
     "اختيار غلط. ده مذكور.",
     "اختيار غلط. ده مذكور.",
     "صح. الاعتبارات المذكورة هي مين، وإيه الـ activities، وفين؛ والتكلفة مش واحدة منهم (L1, Design considerations)."
    ],
    [
     "الـ Web design واحد من المصطلحات اللي تحت الـ umbrella.",
     "صح. الـ slide بتقول إن الـ interaction design هو الـ umbrella term اللي بيغطي كل دول (L1, Which kind of design?).",
     "الـ Graphic design هو design practice بتساهم في الـ ID.",
     "الـ Software design واحد من المصطلحات اللي تحت الـ umbrella."
    ],
    [
     "الـ Ergonomics هي academic discipline.",
     "الـ Informatics هي academic discipline.",
     "صح. الـ design practices هي graphic design و product design و artist-design و industrial design و film industry (L1, Relationship between ID, HCI and other fields).",
     "الـ Psychology هي academic discipline."
    ],
    [
     "الـ academic disciplines هي ergonomics و psychology/cognitive science و informatics و engineering و computer science/software engineering و social sciences.",
     "الـ design practices هي graphic و product و artist-design و industrial design و film industry.",
     "صح. الـ CSCW متذكرة مع الـ HF والـ cognitive engineering والـ HCI والـ cognitive ergonomics والـ information systems (L1, Interaction design and other fields (diagram)).",
     "الجزء ده فيه computer graphic و operating system و programming language."
    ],
    [
     "الـ HCI هدفه العكس: إنه يصمم computer systems سهلة وطبيعية و intuitive تسهّل التفاعل بتاع الـ user (L1, Objective of HCI).",
     "الـ Security مش مذكورة في أهداف الـ HCI؛ الأهداف عن التصميم للناس وللـ tasks وللبيئات، وتسهيل التفاعل (L1, Objective of HCI).",
     "كفاءة الماكينة كانت تركيز الأنظمة القديمة، لما الـ usability مكانتش في دماغ حد. الـ HCI عن تفاعل الـ user، مش عن سرعة الماكينة (L1, UI vs UX vs HCI).",
     "صح. النهارده نجاح أي system محتاج design يكون user-centric، مركّز على الـ <b>usability</b> وعلى <b>user experience</b> لطيفة (smooth) (L1, UI vs UX vs HCI)."
    ],
    [
     "الـ HCI عن التفاعل بين الـ users والكمبيوتر وإزاي نسهّله، مش عن مدى تعقيد الـ code (L1, What is HCI?).",
     "صح. الـ HCI هو التفاعل بين الـ user والكمبيوتر، أو <b>العلاقة بين الـ users والـ computer systems</b> (L1, What is HCI?).",
     "أداء الـ hardware مش هو التركيز؛ الـ HCI بيدرس البني آدمين (احتياجاتهم وقدراتهم وحدودهم) والتكنولوجيا اللي بتحسّن تفاعلهم مع الكمبيوتر (L1, What is HCI?).",
     "الـ HCI دايماً فيه إنسان: هو التفاعل بين الـ <b>user</b> والكمبيوتر، مش كمبيوتر مع كمبيوتر (L1, What is HCI?)."
    ],
    [
     "ده مش مصطلح من الكورس. في المحاضرة الـ UX مكتوب UX Design (User Experience) (L1, UI vs UX vs HCI).",
     "الـ U في UX معناها User مش Unified: الـ UX Design (User Experience) بيغطي التجربة الكاملة بتاعة الـ user مع المنتج (L1, UI vs UX vs HCI).",
     "صح. المحاضرة كاتباه <b>UX Design (User Experience)</b>: بيغطي التجربة الكاملة بتاعة الـ user مع المنتج أو الـ website (L1, UI vs UX vs HCI).",
     "الـ X معناها Experience مش Execution: الـ UX عن التجربة الكاملة بتاعة الـ user مع المنتج أو الـ website (L1, UI vs UX vs HCI)."
    ],
    [
     "ده مش مصطلح من الكورس. المحاضرة كاتبة الـ UI كده: UI Design (User Interface) (L1, UI vs UX vs HCI).",
     "الـ I معناها Interface: الـ UI design هو الـ interactivity والـ look and feel بتاع شاشة المنتج أو صفحة الـ web (L1, UI vs UX vs HCI).",
     "صح. المحاضرة كاتباه <b>UI Design (User Interface)</b>: الـ interactivity والـ look and feel بتاع شاشة المنتج أو صفحة الـ web (L1, UI vs UX vs HCI).",
     "ده خالط المصطلحات ببعض: الـ Experience تبع الـ UX (User Experience)، والـ U معناها User مش Unified (L1, UI vs UX vs HCI)."
    ],
    [
     "الـ UI Design فرع من فروع الـ HCI في رسمة الـ hierarchy of fields اللي في المحاضرة، فهو جزء أساسي من الـ HCI (L1, HCI in a broader hierarchy of fields).",
     "المحاضرة بتقول إن نجاح أي system النهارده محتاج design مركّز على الـ <b>usability</b>، فالـ usability في قلب الـ HCI (L1, UI vs UX vs HCI).",
     "صح. الـ Machine learning مش جزء من الـ HCI في الكورس؛ الـ HCI بيتفرع لـ UI design و UX design و interaction design، وتركيزه على الـ usability والـ user experience (L1, HCI in a broader hierarchy of fields).",
     "الـ UX Design فرع من فروع الـ HCI في الـ hierarchy اللي في المحاضرة، والـ user experience اللطيفة شرط للنجاح (L1, HCI in a broader hierarchy of fields)."
    ],
    [
     "الـ HCI مش دراسة الماكينة لوحدها؛ هو التفاعل بين الـ user والكمبيوتر، وكمان بيدرس البني آدمين (احتياجاتهم وقدراتهم وحدودهم) (L1, What is HCI?).",
     "أداء الـ algorithms ده موضوع كفاءة software، وده كان تركيز الأنظمة القديمة لما الـ usability مكانتش في دماغ حد؛ الـ HCI عن تفاعل الـ user (L1, UI vs UX vs HCI).",
     "الـ Networking والـ databases مش جزء من تعريف الـ HCI؛ الـ HCI هو العلاقة بين الـ users والـ computer systems (L1, What is HCI?).",
     "صح. الـ HCI هو التفاعل بين الـ user والكمبيوتر، وبيتعامل مع الـ <b>design والـ implementation والـ evaluation</b> بتاع الـ interactive systems اللي الـ users بتوعها بياخدوا أقصى استفادة بسهولة (L1, What is HCI?)."
    ],
    [
     "ده هدف فعلاً: الـ HCI بيصمم للناس، ومنهم الـ users اللي عندهم احتياجات خاصة زي الأطفال وكبار السن وذوي الإعاقة، وهدفه إنه يسهّل التفاعل مع الكمبيوتر (L1, Objectives of HCI; User research).",
     "ده هدف فعلاً: المحاضرة بتقول إن نجاح أي system النهارده محتاج design يكون user-centric و<b>مركّز على الـ usability</b> (L1, UI vs UX vs HCI).",
     "صح. الـ HCI هدفه العكس: إنه <b>يصمم systems سهلة وطبيعية و intuitive</b> توفّر الوقت وتقلل التكاليف (L1, Objectives of HCI). وL1 كمان بتوضح إن الـ features لما تزيد وتزيد بتخلي الـ app يبان معقد.",
     "ده هدف فعلاً: المحاضرة بتقول إن النجاح محتاج user experience لطيفة (smooth)، والـ UX design فرع من فروع الـ HCI (L1, UI vs UX vs HCI)."
    ],
    [
     "صح. الـ UI design هو \"interactivity, look and feel of product screen or web page\"، أما الـ UX design فهو \"covers a user's <b>overall experience</b> with the product or website\" (L1, UI vs UX vs HCI).",
     "المحاضرة بتعرّف كل واحد لوحده: الـ UI هو الـ look and feel بتاع الشاشة، والـ UX هو التجربة الكاملة، وهما فرعين منفصلين تحت الـ HCI (L1, UI vs UX vs HCI).",
     "ولا تعريف فيهم عن الـ coding. الـ UI عن إنك تصمم الحاجات بشكل حلو للشاشة، والـ UX عن التجربة الكاملة وتحديد (dictating) التفاعلات (L1, UI vs UX vs HCI).",
     "المحاضرة بتوري الـ UI design والـ UX design كفرعين منفصلين من الـ HCI؛ واحد مش بيحل محل التاني (L1, HCI in a broader hierarchy of fields)."
    ],
    [
     "التركيز على software كفء ده كان طريقة بناء الأنظمة القديمة، لما \"usability was not thought of\"؛ النهارده الـ design لازم يكون user-centric (L1, UI vs UX vs HCI).",
     "صح. الـ HCI هدفه \"design easy, natural and intuitive computer systems\"، والنجاح محتاج design \"focused on usability and pleasant (smooth) user experience\" (L1, Objectives of HCI; UI vs UX vs HCI).",
     "الـ process بيبدأ بالـ user research وبيخلص بالـ user interface evaluation؛ والمحاضرة بتقول اشتغل مع الـ users بدل ما تخمّن (L1, UI design process; Case studies).",
     "الهدف العكس: systems سهلة وطبيعية و intuitive توفّر الوقت وتقلل التكاليف (L1, Objectives of HCI)."
    ],
    [
     "صح. الـ 3 components هما 1- user research، 2- <b>design and prototyping of the interface</b>، 3- user interface evaluation (improvement) (L1, UI design process).",
     "الـ Marketing مش واحد من الـ 3 components بتوع الـ UI design process (L1, UI design process).",
     "الـ Coding مش مذكور كـ component؛ الـ 3 components هما user research، و design and prototyping، و evaluation (L1, UI design process).",
     "الـ Evaluation (improvement) هو الـ component التالت، اللي بييجي بعد الـ design and prototyping، مش بعد الـ user research على طول (L1, UI design process)."
    ],
    [
     "الـ Animations مش جزء من الـ user research. الـ User research عن إنك تتعلم عن الـ users والـ tasks بتاعتهم قبل ما تصمم (L1, User Research).",
     "إنك تختبر الـ interface وتحسّنه ده الـ component التالت، الـ user interface evaluation، مش الـ user research اللي بييجي الأول (L1, UI Design Process).",
     "الـ Coding مش مذكور في الـ UI design process خالص. الـ components بتوعه هما user research، و design and prototyping، و evaluation (L1, UI Design Process).",
     "صح. في الـ user research بتتعلم عن الـ <b>users</b> (مهاراتهم، واللي بيشتتهم، واحتياجاتهم الخاصة) والـ <b>tasks</b> اللي بيحاولوا يخلّصوها، عشان الـ design يتبني عليهم (L1, User Research)."
    ],
    [
     "المحاضرة بتذكر نتيجة من نوع عكس كده: الـ users فضّلوا الـ <b>visual</b> search، اللي اتستخدم في 71% من عمليات البحث (L1, Example Case).",
     "صح. صفحة البحث بتاعة الـ ICDL اللي صممها الـ HCIL كانت design كويس وزارها أكتر من 3 مليون unique visitor، والـ <b>visual search كان مفضّل عند الـ users (71% من عمليات البحث)</b> (L1, Example Case).",
     "مفيش حاجة في المحاضرة بتأيد ده. الـ visual search الـ interactive بتاع الـ ICDL كان الطريقة المفضّلة للبحث (L1, Example Case).",
     "المحاضرة بتقدّم الـ ICDL كـ design كويس الـ users حبوه، والـ HCI هدفه systems سهلة وطبيعية و intuitive (L1, Objective of HCI)."
    ],
    [
     "صح. المحاضرة بتقول إن هدفنا إننا نساعد البني آدمين <b>يحسّوا إنهم بيتفاعلوا مع الـ task مباشرة</b> والـ interface يختفي في نص التفاعل ده (L1, Invisible Interface).",
     "\"Invisible\" مش معناها إنك تخبي الـ functions. معناها إن الـ users بيقضوا وقت قليل مركزين على الـ interface وبيركزوا على الـ task بتاعتهم (L1, Invisible Interface).",
     "الـ prompts اللي على طول بتشد الانتباه للـ interface، أما الـ invisible interface فهو اللي الـ user بينساه، زي حكم الماتش اللي محدش واخد باله منه (L1, Human-Computer or Human-Task interaction).",
     "الـ input الكتير بيخلي الـ user يفكر في الأداة. والمحاضرة بتقول إن الـ user المفروض يفكر في الـ task مش في الأداة (L1, Invisible Interface)."
    ],
    [
     "الـ Installation مش واحد من الـ components. التلاتة هما user research، و design and prototyping، و user interface evaluation (L1, UI Design Process).",
     "الـ Marketing مش جزء من الـ UI design process. الـ 3 components بتوعه هما user research، و design and prototyping، و evaluation (L1, UI Design Process).",
     "صح. الـ 3 components المتنصوح بيهم هما 1- user research، 2- design and prototyping of the interface، 3- <b>user interface evaluation (improvement)</b> (L1, UI Design Process).",
     "الـ Data entry مش component في الـ UI design process؛ الـ component التالت هو الـ user interface evaluation (L1, UI Design Process)."
    ],
    [
     "صح. الـ slide بتقول \"<b>The user should think about the task rather than thinking about the tool</b>\" (L1, Invisible Interface).",
     "الهدف العكس: الـ users المفروض يقضوا وقت قليل مركزين على الـ interface ويركزوا على الـ task بدل كده (L1, Invisible Interface).",
     "إنك تتشيك على الـ updates ده انتباه للأداة. في الـ invisible interface الـ user بينسى الـ interface وبيشتغل على الـ task (L1, Human-Computer or Human-Task interaction).",
     "الزراير والـ menus دي الأداة. المحاضرة عايزة الـ users يركزوا على الـ task اللي بيحاولوا يخلّصوها، مش على الـ interface (L1, Invisible Interface)."
    ],
    [
     "الـ HCI مش عن تصميم الـ hardware. هو التفاعل (العلاقة) بين الـ users والـ computer systems، وبيتعامل مع الـ design والـ implementation والـ evaluation بتاع الـ <b>interactive systems</b> (L1, What is HCI?).",
     "صح. الـ HCI هو <b>التفاعل بين الـ user والكمبيوتر</b>، أو العلاقة بين الـ users والـ computer systems. بيتعامل مع الـ design والـ implementation والـ evaluation بتاع الـ interactive systems، زي الـ GUIs والـ web interfaces (L1, What is HCI? / Objective of HCI)."
    ],
    [
     "صح. الـ HCI عن التفاعل بين الـ user والكمبيوتر، ومن أهدافه '<b>How to make the user interaction with computer easier?</b>' عن طريق إننا نصمم systems سهلة وطبيعية و intuitive (L1, What is HCI? / Objective of HCI).",
     "أهداف الـ HCI في المحاضرة متمركزة حوالين إننا نسهّل تفاعل الـ user مع الكمبيوتر، والـ HCI بيدرس تكنولوجيا الكمبيوتر اللي ممكن تحسّن التفاعل بين الـ users والكمبيوتر (L1, Objective of HCI)."
    ],
    [
     "صح. المحاضرة بتقول إن نجاح أي computer system النهارده محتاج الـ design يبقى <b>user-centric ومركّز على الـ usability</b> وعلى user experience سلسة، والـ HCI هدفه systems سهلة وطبيعية و intuitive واستخدام efficient للـ interfaces (L1, UI vs UX vs HCI / Objective of HCI).",
     "المحاضرة بتقول العكس: الـ systems الأولانية كانت بتتجاهل الـ usability، بس النهارده النجاح محتاج design مركّز على الـ usability، والـ HCI هدفه استخدام سهل و efficient (L1, UI vs UX vs HCI)."
    ],
    [
     "أهداف الـ HCI عن إننا نسهّل تفاعل الـ user بـ systems سهلة وطبيعية و intuitive، والنجاح محتاج design مركّز على الـ <b>usability</b>. الـ Privacy والـ security بيظهروا بس كقاعدة للتعامل مع data الـ users في الـ research (L1, Objective of HCI; L5, Privacy and Security).",
     "صح. أهداف الـ HCI إننا نسهّل تفاعل الـ user مع الكمبيوتر ونصمم systems سهلة وطبيعية و intuitive؛ والنجاح محتاج design يبقى user-centric و<b>مركّز على الـ usability</b> (L1, Objective of HCI / UI vs UX vs HCI)."
    ],
    [
     "صح. في الـ hierarchy بتاع المجالات، الـ <b>Engineering + Psychology</b> بيكوّنوا الـ Human Factors Engineering، والـ HCI فرع منه، والـ HCI بيتفرع لـ UI و UX و interaction <b>design</b>. والـ HCI كمان بيدرس البني آدمين (احتياجاتهم وقدراتهم وحدودهم) وتكنولوجيا الكمبيوتر (L1, HCI in a broader hierarchy of fields).",
     "المحاضرة حاطة الـ HCI تحت الـ Human Factors Engineering (Engineering + Psychology)، وبتقول إن الـ HCI بيتعامل مع design الـ interactive systems، وإنه بيدرس البني آدمين وتكنولوجيا الكمبيوتر الاتنين، فهو فعلاً واخد من التلاتة (L1, HCI in a broader hierarchy of fields / What is HCI?)."
    ],
    [
     "الـ HCI هدفه العكس. من أهداف الـ HCI إنه يسهّل التفاعل عن طريق تصميم systems <b>سهلة وطبيعية و intuitive</b> بتوفر الوقت وبتقلل التكاليف (L1, Objective of HCI).",
     "صح. المحاضرة بتقول إن الـ HCI لازم يسهّل تفاعل الـ user مع الكمبيوتر ويصمم systems <b>سهلة وطبيعية و intuitive</b> عشان توفر الوقت وتقلل التكاليف، مش systems معقدة (L1, Objective of HCI)."
    ],
    [
     "واحد من أهداف الـ HCI المذكورة هو <b>designing web interfaces</b>، فالـ HCI واضح إنه بينطبق على الـ web design (L1, Objective of HCI).",
     "صح. المحاضرة بتذكر <b>designing web interfaces</b> كهدف من أهداف الـ HCI، جنب تصميم الـ GUIs (L1, Objective of HCI). والـ guidelines بتاعة الـ forms والـ layout والـ navigation لصفحات الويب كمان جزء من الكورس (L9, L10)."
    ],
    [
     "صح. ده تعريف المحاضرة: الـ <b>UX Design</b> (User Experience) بيغطي التجربة الكاملة بتاعة الـ user مع الـ product أو الـ website (L1, UI vs UX).",
     "الجملة دي هي تعريف الـ slide نفسها للـ UX Design. الـ <b>UI Design</b> هو اللي بيتكلم عن الـ interactivity والـ look and feel بتاع شاشة الـ product أو صفحة الويب (L1, UI vs UX)."
    ],
    [
     "صح. المحاضرة بتوري 3 أجزاء بيتقابلوا في الـ HCI: الـ <b>User</b> (قدراته العقلية والجسدية)، والـ <b>Computer / Machine</b> (أجهزة الـ input/output)، والـ <b>Interaction</b> (الـ interfaces والـ HCI patterns والـ design والـ usability evaluation) (L1, What is HCI).",
     "الـ figure بتاع الـ HCI في المحاضرة فيه الـ 3 أجزاء دول بالظبط: الـ User، والـ Computer / Machine، والـ Interaction اللي بينهم (L1, What is HCI)."
    ],
    [
     "الكورس بيطبّق الـ HCI على حاجات أكتر بكتير من الـ desktops: جهاز الـ touch-screen بتاع Qualcomm لسواقين التريلات (L1)، وأنشطة تصميم mobile app (L1, Activity)، والملاحظة إن الفرق بين الـ HCI والـ human factors engineering بيقل لأن <b>أجهزة أكتر وأكتر بقت computerized</b> (L1).",
     "صح. الـ HCI بيغطي كل الأجهزة الـ computerized. المحاضرة بتقول إن <b>أجهزة أكتر وأكتر بقت computerized</b> (L1, HCI in a broader hierarchy)، والكورس بيستخدم أمثلة زي جهاز الـ touch-screen بتاع Qualcomm لسواقين التريلات و mobile app لمحبين الكورة (L1)."
    ]
   ],
   "extra": [
    [
     "صح. المحاضرة بتقول إن الـ HCI بيتعامل مع الـ Design والـ Implementation والـ Evaluation بتاع الـ interactive systems.",
     "الـ HCI بيدرس التفاعل بين الـ users والكمبيوتر، مش الـ supply chain بتاع الـ hardware.",
     "دي أنشطة business، مش الـ 3 أنشطة اللي المحاضرة بتذكرها للـ HCI.",
     "دي تفاصيل visual؛ الـ HCI بيغطي الـ design والـ implementation والـ evaluation كله للـ interactive systems."
    ],
    [
     "الـ Industrial Design واحد من الـ 3 فروع بتوع الـ Human Factors Engineering.",
     "صح. الـ UX Design متفرع من الـ HCI (الـ HCI بيتقسم لـ UI و UX و Interaction design)، مش من الـ Human Factors Engineering مباشرة.",
     "الـ HCI واحد من الـ 3 فروع بتوع الـ Human Factors Engineering.",
     "الـ Product Design واحد من الـ 3 فروع بتوع الـ Human Factors Engineering."
    ],
    [
     "النصّين مقلوبين: المحاضرة بتقول إن الفجوة بتقل، عشان أجهزة أكتر (مش أقل) بقت computerized (L1, HCI hierarchy).",
     "صح. الفرق بـ<b>يقل</b>، عشان أجهزة أكتر بقت computerized."
    ],
    [
     "العكس هو الصح: الـ UX بيحدد (dictates) والـ HCI بيفهم.",
     "الـ look and feel ده الـ UI design. الـ UX هو التجربة الكاملة والـ HCI عن فهم التفاعلات.",
     "صح. المحاضرة بتقول إن الـ UX عن تحديد (dictating) التفاعلات، والـ HCI في الأساس عن فهم التفاعل بين البني آدمين والكمبيوتر.",
     "أجهزة الـ input/output هي جزء الـ \"computer\" بس. الـ HCI بيغطي كمان الـ user والـ interaction."
    ],
    [
     "لسه محدش بيعمل design أو prototype؛ الفريق بيتعلم عن الـ users.",
     "الـ Evaluation بيختبر ويحسّن design موجود؛ هنا لسه مفيش design.",
     "الـ Implementation مش واحد من الـ 3 أجزاء بتوع الـ UI design process، ومفيش code بيتكتب.",
     "صح. الـ User research معناه إنك تتعلم عن الـ users (مهاراتهم، اللي بيشتتهم، الاحتياجات الخاصة زي كبار السن) والـ previous research عن قدرات الإنسان وإدراكه."
    ],
    [
     "صح. الأهداف هي التصميم للناس، وللـ tasks، وللبيئات اللي الـ users عايشين وشغالين فيها (زي organization).",
     "التصميم للبيئة مذكور صراحةً كواحد من أهداف الـ HCI."
    ],
    [
     "صح. دي فكرة الـ human-task interaction: الـ user عايز يخلّص task والـ system مجرد وسيلة.",
     "الفكرة عكس كده: الـ user المفروض يفكر في الـ task مش في الأداة.",
     "المثال مش نقد لـ Zoom؛ هو بيوضح إن الـ users بيتفاعلوا مع الـ task.",
     "المثال عن الـ task والناس، مش عن الـ hardware."
    ],
    [
     "جزء الـ User عن القدرات العقلية والجسدية.",
     "صح. جزء الـ Interaction بيغطي الـ interfaces والـ HCI patterns والـ design والـ usability evaluation.",
     "جزء الـ Computer/Machine عن أجهزة الـ input/output.",
     "الـ Human Factors Engineering هو المجال الأب للـ HCI، مش واحد من أجزاءه التلاتة."
    ],
    [
     "تشبيه الحكم معناه العكس.",
     "صح. زي الحكم، الـ interface بيبقى ناجح لما <b>محدش ياخد باله منه</b>، عشان الـ users يركزوا على الـ task (الـ invisible interface)."
    ],
    [
     "الـ invisible interface بيخلي الـ users يركزوا على الـ task. الـ form ده بيخلي الـ user يتخانق مع الأداة.",
     "إنه يطلب نفس الداتا كذا مرة وبعدين يفشل ده معناه إن الـ users محدش فهمهم.",
     "صح. المحاضرة بتدي الـ form ده كمثال لـ UX وحش: متكرر، وبطيء، وبيخلص بـ error.",
     "الـ Industrial design فرع منفصل؛ المثال ده عن user experience وحشة في web form."
    ],
    [
     "الزراير الصغيرة كانت المشكلة في النسخة الأولى.",
     "المحاضرة مذكرتش voice input؛ الـ redesign استخدم شاشة.",
     "keys أكتر معناها targets أصغر كمان للإيدين اللي لابسة جوانتيات.",
     "صح. الـ design الأحسن كان touch screen كبيرة مع stylus pen."
    ],
    [
     "صح. ده تعريف المحاضرة للـ bloatware.",
     "ده وصف الـ CEIP، اللي Microsoft استخدمته عشان تستبدل التخمين بالـ data.",
     "دي الـ adaptive (personalized) menu.",
     "إن اتنين toolbars أو أكتر يشاركوا سطر واحد ده الـ rafted toolbar، واحدة من mechanisms الـ Office 2000. الـ Bloatware هو منتج فيه features كتير زيادة عن اللزوم أو ببساطة حاجات كتير أوي (L1, Full-featured systems)."
    ],
    [
     "دي الـ adaptive (personalized) menu.",
     "صح. الـ Rafted toolbars بتحط اتنين toolbars أو أكتر على سطر واحد، وفيه algorithm بيتوقع الزراير الأقل استخدام وبينقلها لـ overflow area (L1, Office 2000 mechanisms).",
     "الـ toolbars فضلت موجودة؛ بس اتشاركت سطر وخبّت شوية زراير.",
     "المحاضرة مقالتش كده؛ استخدام الـ keyboard كان finding من الـ CEIP."
    ],
    [
     "صح. الـ customization مكانش سهل ولا دقيق، فالآليات دي اتقفلت by default بعدين.",
     "المحاضرة بتقول إنها فشلت واتقفلت by default."
    ],
    [
     "ده مذكور كنتيجة لزيادة الـ features.",
     "ده مذكور كنتيجة لزيادة الـ features.",
     "صح. اللي حصل العكس: مع Office 97–2003 الناس حسّت إنها متحكمة <b>أقل</b>.",
     "ده مذكور كنتيجة لزيادة الـ features."
    ],
    [
     "الـ CEIP مكانش بيجمع أسامي ولا emails: الـ usage والـ hardware data بتاعته كانت anonymous، من المستخدمين اللي اشتركوا عن طريق بالونة \"Help make Office better\" (L1, From guesswork to data).",
     "المحاضرة مذكرتش فيديو؛ الـ CEIP جمع usage و hardware data.",
     "رأي الصحافة كان جزء من المشكلة، مش data من الـ CEIP.",
     "صح. الـ balloon سجّلت الـ users والـ CEIP جمع usage و hardware data بشكل anonymous."
    ],
    [
     "صح. الفريق عرف إن فيه commands بتتستخدم 7x أكتر بالـ keyboard من الماوس.",
     "\"الضعف\" مرتبط بإن الـ short menus الغلط خلّت الـ scanning ياخد ضعف الوقت، مش باستخدام الـ keyboard.",
     "الـ 70 دي نسبة data الـ Word و Outlook اللي اترمت.",
     "الـ 1.3 مرتبطة بالـ 1.3+ billion sessions، مش باستخدام الـ keyboard."
    ],
    [
     "مااحتفظوش بيها كلها: جالهم data من Word وOutlook كتير لدرجة إن 70% منها اترمى (L1, From guesswork to data).",
     "صح. جالهم data من Word و Outlook كتير لدرجة إن <b>70% منها اترمى</b>."
    ],
    [
     "الـ Office case وضّح إن features كتير أوي بتودي لـ bloatware.",
     "صح. دي القاعدة اللي طلعت من الـ adaptive menus والـ rafted toolbars، لما التوقعات الغلط خلّت الـ scanning ياخد ضعف الوقت.",
     "فريق Office بعد عن التخمين وراح للـ data.",
     "ده حل الـ Qualcomm truckers، مش درس الـ auto-customization."
    ],
    [
     "صح. دي من المشاكل المذكورة لـ Office 97–2003.",
     "المحاضرة بتذكر المشاكل دي بالظبط لـ Office 97–2003."
    ]
   ]
  },
  "2": {
   "notes": [
    {
     "h": "الـ interaction design فيه إيه؟",
     "pts": [
      "الـ interaction design <b>عبارة عن process</b>:",
      "بيركز على <b>اكتشاف الـ requirements</b>، و<b>التصميم</b> اللي يحقق الـ requirements دي، و<b>عمل prototypes</b>، و<b>تقييمها (evaluating)</b>.",
      "بيركز على <b>الـ users وأهدافهم</b>.",
      "بيشمل إزاي <b>توازن بين الـ requirements اللي بتتعارض مع بعض</b>.",
      "<b>إنك تطلّع alternatives وتختار من بينها ده المفتاح.</b>"
     ]
    },
    {
     "h": "افتكر: الـ interaction design process",
     "pts": [
      "الـ interaction design process فيه <b>3 components</b>:<br>(1) <b>User research</b><br>(2) <b>Design and prototyping</b><br>(3) <b>Evaluation (improvement)</b>.",
      "الـ User research معناه <b>إنك تشتغل مع الـ users بدل ما تخمّن</b> (<b>user-centric design</b>). تجاهل الـ user research حاجة منتشرة. دخّل الـ users عشان القرارات تبقى مبنية على الواقع مش على التخمين.",
      "الـ User research: <b>invisible interfaces</b> (<b>task-oriented design</b>)."
     ]
    },
    {
     "h": "الـ User-centered design",
     "pts": [
      "زمان كنا بنصمم الـ systems عشان تحقق <b>functional specification</b> معينة.",
      "الـ <b>User-centered design</b>: design بياخد احتياجات الـ user في الاعتبار في <b>كل خطوة</b>."
     ]
    },
    {
     "h": "الـ double diamond of design",
     "pts": [
      "الـ <b>double diamond of design</b> فيه 4 phases:<span class=\"ltr\"><b>Discover</b> → <b>Define</b> → <b>Develop</b> → <b>Deliver</b></span>• الـ <b>Discover</b>: فهم للمشكلة (insight into the problem).<br>• الـ <b>Define</b>: المنطقة اللي هنركز عليها.<br>• الـ <b>Develop</b>: حلول محتملة.<br>• الـ <b>Deliver</b>: حلول شغالة فعلاً.",
      "الرسمة: 2 diamonds جنب بعض. الـ diamond الأولانية بتبدأ من نقطة اسمها <b>Problem</b>، وبتوسع في الـ Discover وبتضيق في الـ Define لحد نقطة اسمها <b>Problem Definition</b> / <b>Design Brief</b>.",
      "الـ diamond التانية بتبدأ من النقطة دي، وبتوسع في الـ Develop وبتضيق في الـ Deliver لحد نقطة اسمها <b>Solution</b>."
     ],
     "figH": {
      "double-diamond": "الـ double diamond بمراحله الأربعة: Discover و Define و Develop و Deliver"
     }
    },
    {
     "h": "الـ 4 basic activities بتوع الـ interaction design",
     "pts": [
      "الـ 4 basic activities بتوع الـ interaction design:<br>(1) <b>Discovering requirements</b><br>(2) <b>Designing alternatives</b><br>(3) <b>Prototyping alternative designs</b><br>(4) <b>Evaluating product and its user experience throughout</b>، يعني تقييم المنتج والـ user experience بتاعته طول الوقت."
     ]
    },
    {
     "h": "A simple interaction design lifecycle model",
     "pts": [
      "الـ lifecycle model البسيط ده <b>مثال على user-centered design approach</b>.",
      "الرسمة: الـ process بيدخل من <b>Discovering requirements</b>. وبين الـ Discovering requirements والـ <b>Designing alternatives</b> فيه أسهم رايحة جاية في الاتجاهين.",
      "من الـ Designing alternatives فيه سهم رايح للـ <b>Prototyping</b>، والـ Prototyping ليه سهم راجع للـ Designing alternatives.",
      "ومن الـ Prototyping فيه سهم رايح للـ <b>Evaluating</b>.",
      "من الـ Evaluating فيه أسهم راجعة للـ Discovering requirements وللـ Designing alternatives، وسهم واحد بيطلع برة الـ cycle للـ <b>Final product</b>."
     ],
     "figH": {
      "id-lifecycle": "دورة حياة بسيطة للـ interaction design، خطوة بخطوة"
     }
    },
    {
     "h": "Lifecycle model تاني: Google Design Sprints",
     "pts": [
      "Lifecycle model تاني: <b>Google Design Sprints</b> (<b>Knapp et al., 2016</b>).",
      "الـ Google Design Sprint فيه 5 steps:<span class=\"ltr\">(1) <b>Unpack</b> → (2) <b>Sketch</b> → (3) <b>Decide</b> → (4) <b>Prototype</b> → (5) <b>Test</b></span>",
      "الـ steps بتعمل cycle اسمها <b>Iterate</b>، وبعد الـ Test بترجع للـ Unpack تاني:<span class=\"ltr\">Unpack → Sketch → Decide → Prototype → Test → Unpack</span>",
      "المصدر: Google Design Sprints (used courtesy of Agile Marketing)."
     ],
     "figH": {
      "design-sprint": "الـ Google Design Sprints: خمس خطوات في دايرة"
     }
    },
    {
     "h": "الـ Design life cycle (حسب Joyner)",
     "pts": [
      "الـ design life cycle بتاع Joyner هو <b>iterative process فيه 4 phases</b>، وبعد الـ Evaluation بترجع للـ Need finding:<span class=\"ltr\"><b>Need finding</b> → <b>Design alternative</b> → <b>Prototyping</b> → <b>Evaluation</b> → Need finding</span>"
     ],
     "figH": {
      "joyner-cycle": "دورة حياة التصميم عند Joyner"
     }
    },
    {
     "h": "الـ User-centered design process (Google)",
     "pts": [
      "الـ process بيمشي كده، والـ iteration هو الأساس:<span class=\"ltr\"><b>Understand → Specify → Design → Evaluate</b></span>",
      "• الـ <b>Understand</b>: الـ users بيجرّبوا المنتج إزاي (research كتير).<br>• الـ <b>Specify</b>: أهم user problem محتاجين نحلها.<br>• الـ <b>Design</b>: حلول، وبعدين نبدأ نبني.<br>• الـ <b>Evaluate</b>: نختبر مع users حقيقيين."
     ],
     "figH": {
      "google-ucd": "الـ user-centered design process بتاعة Google"
     }
    },
    {
     "h": "فين الـ \"user research\"؟",
     "pts": [
      "Joyner و Google مش بيدّوه خطوة لوحده لأنه <b>جزء أساسي من كل مرحلة</b>، وعشان محدش يفتكره خطوة بتتعمل مرة واحدة في الأول.",
      "Joyner بيقول: <b>\"you need users early and often\"</b> يعني محتاج الـ users من بدري وكتير.",
      "Google: الـ user research مستمر وبيحصل <b>قبل وأثناء وبعد</b> مرحلة الـ design.",
      "بس إنك تخليه component واضح لوحده برضه مفيد: بيمنع إنك تستهون بيه، وكمان بقى أكتر وأكتر وظيفة لناس متخصصين."
     ]
    },
    {
     "h": "مين بيعمل الـ UI/UX design؟",
     "pts": [
      "<b>Software engineer</b> بيصمم الـ system كله، وغالباً يعرف حاجة بسيطة عن الـ HCI.",
      "<b>UI/UX designer</b> في فريق الـ development، وده بقى منتشر أكتر في الشركات الصغيرة والمتوسطة.",
      "<b>Specialists</b> لكل دور، زي الـ UX researcher والـ UX designer والـ visual designer والـ UX engineer، في الشركات الكبيرة زي Google."
     ]
    },
    {
     "h": "شوية practical issues",
     "pts": [
      "شوية practical issues في الـ interaction design:",
      "مين الـ users؟",
      "إيه احتياجات الـ users (needs)؟",
      "إزاي نطلّع alternative designs؟",
      "إزاي نختار من بين الـ alternatives؟",
      "إزاي ندمج الـ interaction design activities مع الـ lifecycle models التانية؟"
     ]
    },
    {
     "h": "مين الـ users/stakeholders؟",
     "pts": [
      "مين هم الـ users ده <b>مش حاجة واضحة</b>:",
      "فيه <b>382 نوع مختلف (distinct types) من الـ users للـ smartphone apps</b> (<b>Sha Zhao et al, 2016</b>).",
      "منتجات كتير معمولة عشان يستخدمها قطاعات كبيرة من الناس، فالـ <b>user بيبقى \"everybody\"</b>.",
      "الـ <b>Stakeholders</b> هم مجموعة <b>أكبر من مجموعة الـ direct users</b>.",
      "إنك <b>تحدد الـ stakeholders</b> ده بيساعدك تحدد المجموعات اللي لازم تدخّلها في الـ interaction design activities."
     ]
    },
    {
     "h": "إيه احتياجات الـ users؟",
     "pts": [
      "<b>الـ users نادراً ما بيعرفوا إيه الممكن.</b>",
      "بدل كده: <b>استكشف الـ problem space</b>؛ <b>ادرس مين الـ users</b>؛ <b>ادرس الـ user activities</b> عشان تشوف إيه اللي ممكن يتحسن.",
      "<b>ركز على أهداف الناس (goals)، والـ usability، والـ user experience goals.</b>"
     ]
    },
    {
     "h": "أنواع الـ user research حسب إمتى (WHEN)",
     "pts": [
      "<b>(1) Foundational (strategic / generative)</b>: بيحصل <b>قبل ما أي حاجة تتصمم</b>. الهدف إنك تحدد مشاكل الـ users وإيه اللي هنبنيه. بتتكلم مع الـ users عن الـ pain points بتاعتهم، وبيطلّعلك فرص الفريق مكانش هيفكر فيها.",
      "<b>(2) Tactical (design)</b>: بيحصل <b>أثناء مرحلة الـ design</b>. بيقولك المنتج المفروض يتبني إزاي، ومحتاج user feedback على الـ prototypes.",
      "<b>(3) Post-launch</b>: هل نجحنا؟ هل الـ system بيلبّي احتياجات الـ users؟"
     ]
    },
    {
     "h": "أنواع الـ user research حسب مين (WHO)",
     "pts": [
      "<b>Primary research</b>: research إنت بتعمله بنفسك. الطرق زي الـ interviews والـ focus groups والـ surveys والـ usability studies والـ participant observations.",
      "<b>Secondary research</b>: research حد تاني عمله. المصادر: كتب، journals، وحاجات شبه كده.",
      "الـ Secondary research مهم في الأول عشان تجمع statistics وحقائق وأرقام. بيوفر مجهود ووقت وبيدعم الـ primary findings. وغالباً بيعمله researchers عندهم خبرة في organizations موثوقة، وده صعب تكرره.",
      "ناس كتير من الـ practitioners مش عارفين يستخدموه إزاي. الكورسات (زي الـ psychology والـ cognition) ومجتمعات الـ HCI/UX بتساعد."
     ]
    },
    {
     "h": "إزاي نطلّع alternatives",
     "pts": [
      "<b>البني آدمين بيميلوا إنهم يفضلوا ماسكين في الحاجة اللي شغالة.</b>",
      "<b>إنك تفكر في alternatives بيساعدك تلاقي designs أحسن.</b>",
      "الـ alternative designs بتيجي منين؟",
      "<b>'Flair and creativity'</b>: research و synthesis.",
      "<b>Cross-fertilization of ideas</b>: تلاقح الأفكار من وجهات نظر مختلفة.",
      "<b>الـ users نفسهم ممكن يطلّعوا designs مختلفة.</b>",
      "<b>دوّر على inspiration</b>: من منتجات و domain شبه بعض، أو من منتجات و domain مختلفين."
     ]
    },
    {
     "h": "إزاي نختار من بين الـ alternatives",
     "pts": [
      "الـ interaction design بيركز على <b>الـ behavior اللي باين من برة (externally-visible) واللي يتقاس (measurable)</b>.",
      "<b>Technical feasibility</b> (هل ينفع يتنفذ تقنياً).",
      "<b>Evaluation مع الـ users أو الـ peers</b>: استخدم <b>prototypes، مش static documentation</b>، عشان <b>الـ behavior هو المفتاح</b>.",
      "<b>Quality thresholds</b>: <b>كل مجموعة stakeholders ليها quality thresholds مختلفة</b>؛ و<b>الـ usability والـ user experience goals بيوصلوك للـ criteria المناسبة</b>."
     ]
    },
    {
     "h": "Activity: mobile app لمحبين الكورة",
     "pts": [
      "إنت مشارك في design <b>mobile application لمحبين الكورة</b> عشان يتفرجوا على الماتشات ويعرفوا النتايج والإحصائيات.",
      "فكّر في layout للـ interface تشوفه usable وسهل.",
      "تقدر تفكر في <b>plan للـ user research</b>؟ هتعمله إزاي عشان تفهم احتياجات الـ users وتفضيلاتهم أحسن؟",
      "تقدر تفكر إزاي <b>تجمع usage data</b> بنفس الطريقة اللي <b>Microsoft عملتها في design الـ Office 2007</b>؟ إيه الـ data اللي ممكن تفيد، وإزاي الـ data دي تساعد في تحسين الـ UI؟"
     ]
    }
   ],
   "cards": [
    "design بياخد احتياجات الـ user في الاعتبار في كل خطوة.",
    "Need finding ← Design alternatives ← Prototyping ← Evaluation (iterative).",
    "Understand ← Specify ← Design ← Evaluate (الـ iteration هو الأساس).",
    "\"You need users early and often.\" يعني محتاج الـ users من بدري وكتير.",
    "Strategic/generative. قبل ما أي حاجة تتصمم؛ بيلاقي مشاكل الـ users وإيه اللي هنبنيه.",
    "Design research. أثناء مرحلة الـ design؛ بيستخدم feedback على الـ prototype عشان نقرر هنبني إزاي.",
    "بعد الـ release: هل نجحنا وهل بيلبّي احتياجات الـ users؟",
    "research إنت بتعمله بنفسك: interviews، focus groups، surveys، usability studies، observations.",
    "research حد تاني عمله: كتب، journals، وحاجات شبه كده.",
    "اكتشاف الـ requirements، والتصميم اللي يحقق الـ requirements، وعمل prototypes وتقييمها؛ والـ users وأهدافهم؛ وإزاي توازن بين الـ requirements اللي بتتعارض مع بعض.",
    "إنك تطلّع alternatives وتختار من بينها.",
    "1) User research 2) Design and prototyping 3) Evaluation (improvement).",
    "إنك تشتغل مع الـ users بدل ما تخمّن (user-centric design)؛ و invisible interfaces (task-oriented design).",
    "Discover (فهم للمشكلة) ← Define (المنطقة اللي هنركز عليها) ← Develop (حلول محتملة) ← Deliver (حلول شغالة فعلاً).",
    "Problem (البداية) ← Problem Definition / Design Brief (النص) ← Solution (النهاية).",
    "1) Discovering requirements 2) Designing alternatives 3) Prototyping alternative designs 4) Evaluating product and its user experience throughout.",
    "User-centered design approach.",
    "الـ Evaluating (الـ cycle هي Discovering requirements، و Designing alternatives، و Prototyping، و Evaluating، وبعدين الـ Final product).",
    "Knapp et al., 2016. 1) Unpack 2) Sketch 3) Decide 4) Prototype 5) Test، وبعدين iterate.",
    "مين الـ users؟ إيه احتياجات الـ users؟ إزاي نطلّع alternative designs؟ إزاي نختار من بين الـ alternatives؟ إزاي ندمج الـ interaction design activities مع الـ lifecycle models التانية؟",
    "382 (Sha Zhao et al, 2016).",
    "عشان منتجات كتير معمولة عشان يستخدمها قطاعات كبيرة من الناس.",
    "مجموعة أكبر من مجموعة الـ direct users؛ وتحديدهم بيساعد تحدد المجموعات اللي لازم تدخّلها في الـ interaction design activities.",
    "استكشف الـ problem space، وادرس مين الـ users، وادرس الـ user activities عشان تشوف إيه اللي ممكن يتحسن.",
    "أهداف الناس (goals)، والـ usability، والـ user experience goals.",
    "البني آدمين بيميلوا إنهم يفضلوا ماسكين في الحاجة اللي شغالة؛ وإنك تفكر في alternatives بيساعدك تلاقي designs أحسن.",
    "'Flair and creativity' (research و synthesis)؛ cross-fertilization of ideas من وجهات نظر مختلفة؛ الـ users ممكن يطلّعوا designs مختلفة؛ دوّر على inspiration (منتجات و domain شبه بعض أو مختلفين).",
    "الـ behavior اللي باين من برة واللي يتقاس (externally-visible and measurable)؛ الـ technical feasibility؛ الـ evaluation مع الـ users أو الـ peers؛ الـ quality thresholds.",
    "عشان الـ behavior هو المفتاح.",
    "كل مجموعة stakeholders ليها quality thresholds مختلفة؛ والـ usability والـ user experience goals بيوصلوك للـ criteria المناسبة."
   ],
   "qa": [
    "1) Foundational (strategic/generative): قبل ما أي حاجة تتصمم، عشان نلاقي مشاكل الـ users وإيه اللي هنبنيه. 2) Tactical (design): أثناء الـ design، بنستخدم feedback على الـ prototype عشان نقرر هنبني إزاي. 3) Post-launch: بعد الـ launch، عشان نشوف نجحنا ولا لأ والـ system بيلبّي احتياجات الـ users ولا لأ.",
    "لأنهم شايفينه جزء أساسي من كل مرحلة، وعايزين يتجنبوا الفكرة الغلط إنه خطوة واحدة في الأول. Google بتقول إنه بيحصل قبل وأثناء وبعد الـ design.",
    "Software engineer بيصمم الـ system كله؛ أو UI/UX designer في فريق الـ development (منتشر في الشركات الصغيرة والمتوسطة)؛ أو كذا specialist (UX researcher، UX designer، visual designer، UX engineer) في الشركات الكبيرة.",
    "الـ interaction design عبارة عن process: 1) بيركز على اكتشاف الـ requirements، والتصميم اللي يحقق الـ requirements، وعمل prototypes وتقييمها 2) بيركز على الـ users وأهدافهم 3) بيشمل إزاي توازن بين الـ requirements اللي بتتعارض مع بعض. وإنك تطلّع alternatives وتختار من بينها ده المفتاح.",
    "فيه 4 phases: 1) Discover: فهم للمشكلة (insight into the problem) 2) Define: المنطقة اللي هنركز عليها 3) Develop: حلول محتملة 4) Deliver: حلول شغالة فعلاً. الـ diamond الأولانية بتروح من الـ Problem للـ Problem Definition / Design Brief؛ والتانية بتروح من هناك للـ Solution.",
    "1) Discovering requirements 2) Designing alternatives 3) Prototyping alternative designs 4) Evaluating product and its user experience throughout. الـ simple lifecycle model مثال على user-centered design approach: بيدخل من الـ Discovering requirements، اللي مربوطة في الاتجاهين بالـ Designing alternatives؛ والـ Designing alternatives بتودّي للـ Prototyping (ورجوع)؛ والـ Prototyping بيودّي للـ Evaluating؛ والـ Evaluating بيرجع تاني للـ Discovering requirements والـ Designing alternatives، أو بيطلع للـ Final product.",
    "الـ Google Design Sprints (Knapp et al., 2016): 1) Unpack 2) Sketch 3) Decide 4) Prototype 5) Test، وبعدين iterate. الـ design life cycle بتاع Joyner: iterative process فيه 4 phases: 1) Need finding 2) Design alternative 3) Prototyping 4) Evaluation. الاتنين iterative cycles.",
    "1) مين الـ users؟ 2) إيه احتياجات الـ users؟ 3) إزاي نطلّع alternative designs؟ 4) إزاي نختار من بين الـ alternatives؟ 5) إزاي ندمج الـ interaction design activities مع الـ lifecycle models التانية؟",
    "الـ users مش واضحين: فيه 382 نوع مختلف من الـ users للـ smartphone apps (Sha Zhao et al, 2016)، ومنتجات كتير معمولة لقطاعات كبيرة من الناس، فالـ user بيبقى \"everybody\". الـ Stakeholders أكبر من مجموعة الـ direct users، وتحديدهم بيساعد تحدد المجموعات اللي لازم تدخّلها في الـ interaction design activities. الـ users نادراً ما بيعرفوا إيه الممكن، فبدل كده: 1) استكشف الـ problem space 2) ادرس مين الـ users 3) ادرس الـ user activities عشان تشوف إيه اللي ممكن يتحسن. وركز على أهداف الناس (goals)، والـ usability، والـ user experience goals.",
    "البني آدمين بيميلوا إنهم يفضلوا ماسكين في الحاجة اللي شغالة، وإنك تفكر في alternatives بيساعدك تلاقي designs أحسن. المصادر: 1) 'flair and creativity': research و synthesis 2) cross-fertilization of ideas من وجهات نظر مختلفة 3) الـ users ممكن يطلّعوا designs مختلفة 4) دوّر على inspiration: من منتجات و domain شبه بعض، أو من منتجات و domain مختلفين. الاختيار: 1) الـ interaction design بيركز على الـ behavior اللي باين من برة واللي يتقاس (externally-visible and measurable) 2) الـ technical feasibility 3) الـ evaluation مع الـ users أو الـ peers، باستخدام prototypes مش static documentation، عشان الـ behavior هو المفتاح 4) الـ quality thresholds: كل مجموعة stakeholders ليها quality thresholds مختلفة، والـ usability والـ user experience goals بيوصلوك للـ criteria المناسبة.",
    "الـ design life cycle بتاع Joyner هو <b>iterative process فيه 4 phases</b>: 1) Need finding 2) Design alternatives 3) Prototyping 4) Evaluation، وبعدين ترجع للـ need finding تاني. مفيش phase منفصلة اسمها \"user research\" لأن الـ user research جزء أساسي من كل phase (Joyner: \"you need users early and often\").",
    "Understand، Specify، Design، Evaluate، و<b>الـ iteration هي الأساس</b> وإنت ماشي في الـ process.<br>1) <b>Understand</b>: الـ users بيجرّبوا الـ product إزاي (research كتير).<br>2) <b>Specify</b>: أهم مشكلة عند الـ user محتاجين نحلها.<br>3) <b>Design</b>: حلول لمشكلة الـ user، ونبدأ نبني.<br>4) <b>Evaluate</b>: test مع users حقيقيين.",
    "1) الـ <b>Primary research</b>: research إنت بتعمله بنفسك. الـ methods المشهورة: interviews، focus groups، surveys، usability studies، participant observations.<br>2) الـ <b>Secondary research</b>: research حد تاني عمله. مصادر المعلومات المشهورة: الكتب والـ journals والحاجات اللي شبههم.",
    "1) مهم خصوصاً <b>في أول الـ project</b> عشان تجمع statistics و facts و figures مفيدة عن الـ users.<br>2) لو المعلومات دي موجودة، <b>بتوفر مجهود ووقت كبير جداً</b> و<b>بتدعم نتايج الـ primary research</b>.<br>3) نتايجه غالباً بيعملها researchers عندهم خبرة ومتخصصين في research organizations موثوقة، فصعب عليك تعمل زيها.<br>4) practitioners كتير مش عارفين عنه أو مش عارفين يستفيدوا إزاي من المعلومات المتاحة اللي ليها علاقة بـ users الـ project بتاعهم. الكورسات والـ training في حاجات زي الـ psychology والـ cognition، وإنك تبقى عضو في HCI و UX communities، بيساعدوا."
   ],
   "quiz": [
    [
     "الـ Usability tests تبع الـ tactical أو الـ post-launch.",
     "الـ research اللي بيحصل بعد ما المنتج يتصمم وينزل ده الـ post-launch research (نجحنا ولا لأ؟). الـ Foundational research بيحصل قبل ما أي حاجة تتصمم (L2, Types by WHEN).",
     "الـ Marketing campaigns مش توقيت من توقيتات الـ research. التلاتة هما foundational (قبل الـ design)، وtactical (أثناء الـ design)، وpost-launch (L2, Types by WHEN).",
     "صح. بيحدد المشاكل وإيه اللي هنبنيه."
    ],
    [
     "الـ Tactical (design) research بيحصل <b>أثناء</b> مرحلة الـ design. اللي بعد الـ launch ده الـ post-launch research.",
     "صح. الـ Tactical research بيحصل أثناء الـ design وبيستخدم feedback على الـ prototypes."
    ],
    [
     "ده الـ user-centered design process بتاع Google.",
     "صح. الـ iterative design life cycle بتاع Joyner هو Need finding ← Design alternatives ← Prototyping ← Evaluation، وبعدين يرجع للـ need finding تاني (L2, Design life cycle).",
     "الـ Plan, Build, Test, Deploy ده software development cycle عام. الـ cycle بتاع Joyner هو Need finding, Design alternatives, Prototyping, Evaluation (L2, Design life cycle).",
     "دي مش مراحل Joyner؛ Joyner معندوش مرحلة coding ولا launch. الـ cycle بتاعه هو Need finding, Design alternatives, Prototyping, Evaluation (L2, Design life cycle)."
    ],
    [
     "الـ research اللي حد تاني عمله (كتب، journals) ده الـ secondary research. الـ Primary research هو اللي إنت بتعمله بنفسك، زي الـ interviews أو الـ surveys (L2, Types by WHO).",
     "صح. الـ Primary research هو اللي إنت بتعمله بنفسك."
    ],
    [
     "صح. قراية الـ literature الموجودة دي secondary research.",
     "الـ Focus groups دي primary research: إنت اللي بتعملها بنفسك مع الـ users. المحاضرة حاطاها مع الـ interviews والـ surveys والـ usability studies والـ observations (L2, Types by WHO).",
     "الـ Interviews طريقة primary، عشان إنت اللي بتعملها بنفسك. الوحيدة اللي معتمدة على research حد تاني عمله هي الـ literature review (L2, Types by WHO).",
     "الـ Surveys طريقة primary: إنت اللي بتصممها وتنفذها بنفسك. قراية الـ literature الموجودة هي الطريقة الـ secondary هنا (L2, Types by WHO)."
    ],
    [
     "صح. الاتنين مذكورين كطرق primary منتشرة.",
     "هم مذكورين صراحةً تحت الـ primary research."
    ],
    [
     "صح. إنك تستخدم research حد تاني عمله ده secondary research.",
     "الـ Papers اللي كتبها ناس تانيين دي secondary sources."
    ],
    [
     "صح. الـ Surveys مذكورة ضمن الطرق الـ primary.",
     "الـ Surveys واحدة من الطرق الـ primary المذكورة."
    ],
    [
     "ضيق أوي: \"before design\" ده الـ foundational research بس. Google بيقول إن الـ user research مستمر: قبل وأثناء وبعد الـ design (L2, Where is user research?).",
     "ضيق أوي: بعد الـ launch ده الـ post-launch research بس. Google بيقول إن الـ user research بيحصل قبل وأثناء وبعد مرحلة الـ design (L2, Where is user research?).",
     "صح. Google بتسميه جزء مستمر من الـ life cycle.",
     "المحاضرة عمرها ما ربطت الـ research بالـ budget. Google بيعتبره جزء مستمر من الـ life cycle، قبل وأثناء وبعد الـ design (L2, Where is user research?)."
    ],
    [
     "صح. الـ Discover هي أول phase وبتدّي فهم للمشكلة (insight into the problem) (L2, The double diamond of design).",
     "الـ Define هي الـ phase اللي بتحدد المنطقة اللي هنركز عليها، مش الـ insight into the problem.",
     "الـ Develop هي الـ phase بتاعة الحلول المحتملة.",
     "الـ Deliver هي آخر phase، وبتدّي حلول شغالة فعلاً."
    ],
    [
     "الـ Problem هو الاسم اللي في بداية الـ diamond الأولانية.",
     "صح. النقطة اللي في النص بين الـ 2 diamonds اسمها Problem Definition و Design Brief (L2, The double diamond of design).",
     "الـ Solution هو الاسم اللي في آخر الـ diamond التانية.",
     "الـ Final product هو المخرج بتاع الـ simple lifecycle model، مش اسم في الـ double diamond."
    ],
    [
     "دي activity رقم 1 من الـ 4 basic activities.",
     "دي activity رقم 3 من الـ 4 basic activities.",
     "دي activity رقم 4 من الـ 4 basic activities.",
     "صح. الـ 4 activities هم discovering requirements، و designing alternatives، و prototyping alternative designs، و evaluating؛ والـ user manual مش واحدة منهم (L2, Four basic activities of interaction design)."
    ],
    [
     "صح. الـ slide بتقول إن الـ model ده مثال على user-centered design approach (L2, A simple interaction design lifecycle model).",
     "الـ slide بتقول user-centered، مش technology-centered.",
     "الرسمة مليانة loops راجعة لـ activities قبلها، يعني هو iterative.",
     "الـ Google Design Sprints متقدمة كـ lifecycle model تاني منفصل."
    ],
    [
     "الـ Discovering requirements هي المكان اللي الـ process بيدخل منه، مش اللي بيطلع منه.",
     "الـ Designing alternatives بتودّي للـ prototyping، مش للـ final product.",
     "الـ Prototyping بيودّي للـ evaluating، مش للـ final product على طول.",
     "صح. السهم اللي رايح للـ final product طالع من الـ Evaluating؛ والأسهم التانية اللي طالعة من الـ Evaluating بترجع لورا (L2, A simple interaction design lifecycle model)."
    ],
    [
     "الـ Discover و Define و Develop و Deliver دول الـ phases بتوع الـ double diamond.",
     "صح. الـ steps بتوع الـ Google Design Sprint هم 1 Unpack، 2 Sketch، 3 Decide، 4 Prototype، 5 Test، وبعدين iterate (L2, Another lifecycle model: Google Design Sprints).",
     "أول 4 دول الـ phases بتوع Joyner، مش Google Design Sprints.",
     "دي الكلمات الصح بس بترتيب غلط؛ الـ Unpack بتيجي الأول، والـ Decide بتيجي قبل الـ Prototype."
    ],
    [
     "3 ده عدد الـ components بتوع الـ interaction design process (user research، و design and prototyping، و evaluation).",
     "صح. الـ cycle بتاع Joyner فيه 4 phases: need finding، و design alternative، و prototyping، و evaluation (L2, Design life cycle (according to Joyner)).",
     "5 ده عدد الـ steps في الـ Google Design Sprints.",
     "2 ده عدد الـ diamonds في الـ double diamond."
    ],
    [
     "صح. الـ slide بتذكر 382 نوع مختلف من الـ users للـ smartphone apps (L2, Who are the users/stakeholders?).",
     "الرقم اللي على الـ slide هو 382، مش 38.",
     "2016 دي سنة الدراسة، مش عدد أنواع الـ users.",
     "الرقم اللي على الـ slide هو 382، مش 3,820."
    ],
    [
     "الـ slide بتقول العكس: الـ stakeholders أكبر من مجموعة الـ direct users.",
     "صح. الـ stakeholders أكبر من مجموعة الـ direct users (L2, Who are the users/stakeholders?)."
    ],
    [
     "الـ slide بتقول إن الـ users نادراً ما بيعرفوا إيه الممكن؛ وده مالوش علاقة.",
     "صح. ده السبب اللي الـ slide بتقوله (L2, Who are the users/stakeholders?).",
     "382 ده عدد أنواع الـ users المختلفة للـ smartphone apps، مش سبب إن الـ user بيبقى everybody.",
     "الـ stakeholders أكبر من مجموعة الـ direct users، فهم مش نفس المجموعة."
    ],
    [
     "ده بيتجاهل نقطة الـ slide إن الـ users نادراً ما بيعرفوا إيه الممكن.",
     "صح. دول الـ 3 حاجات اللي الـ slide بتذكرهم تحت \"Instead\" (L2, What are the users' needs?).",
     "المحاضرة بتأكد على الشغل مع الـ users بدل التخمين.",
     "الـ slide بتذكر إنك تدوّر على inspiration من منتجات شبه بعض كمصدر للـ alternatives، مش إنك تنسخ، وده مش الإجابة بتاعة إزاي نلاقي الـ needs."
    ],
    [
     "صح. النقطتين موجودين على الـ slide بتاعة توليد الـ alternatives (L2, How to generate alternatives).",
     "الـ slide بتقول النقطتين: البني آدمين بيميلوا إنهم يفضلوا ماسكين في الحاجة اللي شغالة، وإنك تفكر في alternatives بيساعدك تلاقي designs أحسن."
    ],
    [
     "دي مذكورة كمصدر للـ alternative designs.",
     "دي مذكورة كمصدر للـ alternative designs.",
     "دي مذكورة كمصدر للـ alternative designs.",
     "صح. الـ Technical feasibility دي criterion لاختيار بين الـ alternatives (L2, How to choose among alternatives)، مش واحدة من المصادر المذكورة تحت 'Where do alternative designs come from?' (L2, How to generate alternatives)."
    ],
    [
     "الـ slide كمان بتضيف منتجات و domain مختلفين.",
     "صح. الـ slide بتقول دوّر على inspiration من منتجات و domain شبه بعض، أو من منتجات و domain مختلفين (L2, How to generate alternatives).",
     "الـ static documentation اتذكرت في اختيار الـ alternatives (والـ prototypes هي المفضلة)، مش كمصدر inspiration.",
     "الـ slide بتذكر إنك تدوّر على inspiration من منتجات و domains، وكمان بتقول إن الـ users ممكن يطلّعوا designs."
    ],
    [
     "التكلفة مش هي السبب اللي على الـ slide.",
     "صح. الـ slide بتقول prototypes، مش static documentation، عشان الـ behavior هو المفتاح (L2, How to choose among alternatives).",
     "دي النقطة بتاعة إزاي نلاقي احتياجات الـ users، مش بتاعة تقييم الـ alternatives.",
     "الـ Technical feasibility دي criterion منفصل؛ والسبب المذكور إن الـ behavior هو المفتاح."
    ],
    [
     "الـ slide بتقول إن كل مجموعة stakeholders ليها quality thresholds مختلفة.",
     "صح. النقطتين مذكورين تحت الـ quality thresholds (L2, How to choose among alternatives).",
     "الـ slide بتربط الـ thresholds بمجموعات الـ stakeholders وبالـ usability والـ user experience goals، مش بالـ technical team بس.",
     "الـ Quality thresholds مذكورة جنب الـ evaluation مع الـ users أو الـ peers، مش بديل ليها."
    ],
    [
     "الـ slide بتقول externally-visible behavior، مش الـ internal structure.",
     "صح. الـ slide بتقول إن الـ interaction design بيركز على الـ behavior اللي باين من برة واللي يتقاس (externally-visible and measurable) (L2, How to choose among alternatives).",
     "ده عكس اللي الـ slide بتقوله.",
     "الـ slide بتتكلم عن behavior باين ويتقاس، مش الألوان بس."
    ],
    [
     "صح. دول الـ 3 components اللي على الـ Remember slide (L2, Remember: the interaction design process).",
     "دول 3 من الـ 4 phases بتوع الـ double diamond.",
     "دول 3 من الـ 5 steps بتوع الـ Google Design Sprint.",
     "الـ Need finding دي phase عند Joyner؛ والـ coding والـ deployment مش موجودين على الـ slides."
    ],
    [
     "صح. الـ slide بتقول إن توليد الـ alternatives والاختيار من بينها هو المفتاح (L2, What is involved in interaction design?).",
     "الـ slide بتأكد على الـ alternatives؛ وإن البني آدمين بيفضلوا ماسكين في حاجة واحدة شغالة ده متقدم كميل لازم نتغلب عليه.",
     "الـ slide بتقول إن الـ interaction design بيشمل إزاي توازن بين الـ requirements اللي بتتعارض، مش إنك تتجنبها.",
     "الـ prototypes مفضلة على الـ static documentation عشان الـ behavior هو المفتاح."
    ],
    [
     "الـ Journals مذكورة في المحاضرة كمصدر شائع للـ secondary research، اللي هو research عمله حد تاني (L2, Types of user research by Who).",
     "الـ research papers المنشورة دي research عمله حد تاني، فهي secondary research، زي الكتب والـ journals اللي المحاضرة بتذكرها (L2, Types of user research by Who).",
     "صح. الـ interview ده research إنت اللي بتعمله بنفسك، فهو <b>primary</b> research method، مش مصدر secondary (L2, Types of user research by Who).",
     "الكتب مذكورة في المحاضرة كمصدر شائع للـ secondary research (L2, Types of user research by Who)."
    ],
    [
     "صح. الـ Secondary research هو research عمله حد تاني، وبتلاقيه في مصادر زي الكتب والـ journals (L2, Types of user research by Who).",
     "الـ Focus groups دي research إنت اللي بتعمله بنفسك، ومذكورة كـ <b>primary</b> research method (L2, Types of user research by Who).",
     "الـ Usability studies مذكورة كـ <b>primary</b> research method، لأنك إنت اللي بتعملها بنفسك (L2, Types of user research by Who).",
     "الـ Participant observation مذكورة كـ <b>primary</b> research method، لأنك إنت اللي بتجمع الـ data بنفسك (L2, Types of user research by Who)."
    ],
    [
     "الـ Interviews دي research إنت اللي بتعمله بنفسك، فهي <b>primary</b> research method (L2, Types of user research by Who).",
     "الـ case study ممكن يبقى أي نوع فيهم: لو إنت اللي عامله يبقى primary، ولو بتقرا واحد حد تاني نشره يبقى secondary. بس المصادر اللي المحاضرة فعلاً بتذكرها للـ secondary research هي الكتب والـ journals، فدي أحسن إجابة (L2, Types of user research by Who).",
     "إنك تختبر prototype مع الـ users ده research إنت اللي بتعمله بنفسك، زي الـ usability studies المذكورة تحت الـ <b>primary</b> research (L2, Types of user research by Who).",
     "صح. الـ Secondary research هو research عمله حد تاني، ومصادر المعلومات الشائعة بتاعته هي <b>الكتب والـ journals</b> (L2, Types of user research by Who)."
    ],
    [
     "الـ Secondary research هو research عمله حد تاني وبيستخدم data موجودة، وممكن كمان تكون قديمة أوي؛ مش بيدّيك feedback لايف من الـ users بتوعك (L2, Types of user research by Who; L5, Primary vs secondary research).",
     "الـ Secondary research <b>بيدعم</b> (backs up) نتايج الـ primary research؛ مش بيحل محلها (L2, Secondary research).",
     "صح. في أول المشروع بيجمع statistics و facts و figures مفيدة عن الـ users، وغالباً رخيص وسريع، فبيوفّر مجهود ووقت ضخم (L2, Secondary research; L5, Primary vs secondary research).",
     "الـ Secondary research بيجاوب على أسئلة عن قدرات الإنسان وحدوده (زي معلومات عن عمى الألوان) وعن مجموعات users عندها مشاكل مشتركة، مش عن التكنولوجيا بس (L5, Secondary research benefits)."
    ],
    [
     "صح. الـ Secondary research هو research عمله حد تاني، ومصادره الشائعة هي <b>الكتب والـ journals</b> (L2, Types of user research by Who).",
     "إنك تراقب الـ users بنفسك ده participant observation، وهو <b>primary</b> research method (L2, Types of user research by Who).",
     "إنك تشتغل مع الـ users مباشرة (interviews، focus groups، usability studies) ده research إنت اللي بتعمله بنفسك، فهو <b>primary</b> research (L2, Types of user research by Who).",
     "الـ Experiments اللي بتعملها بنفسك مذكورة كأمثلة للـ <b>primary</b> research، اللي إنت فيه اللي بتجمع الـ data (L5, Primary vs secondary research)."
    ],
    [
     "الـ Interviews اللي بتعملها بنفسك دي <b>primary</b> research؛ الـ secondary research هو research عمله حد تاني (L2, Types of user research by Who).",
     "المحاضرة عمرها ما قالت كده. الـ Secondary research بيجمع statistics و facts و figures وبيدعم نتايج الـ primary؛ مش بيلغي الحاجة لتحليل الـ data (L2, Secondary research).",
     "صح. الـ Secondary research بيدوّر على <b>existing data</b>؛ \"if such information exists, it saves enormous effort and time\" (L2, Secondary research; L5, Primary vs secondary table).",
     "إنك تجمع الـ data بنفسك ده primary research (\"research that you conduct yourself\")؛ الـ secondary data حد تاني اللي جمعها (L2, Types of user research by Who)."
    ],
    [
     "الـ Foundational research بيحصل قبل ما أي حاجة تتصمم، فلسه مفيش interface تختبره؛ الاختبار بالـ prototypes تبع الـ tactical (design) research (L2, Types of user research by When).",
     "الـ User research عن فهم الـ users ومشاكلهم، مش عن سرعة الـ coding (L2, Types of user research by When).",
     "صح. الـ Foundational (strategic/generative) research له \"goal to <b>identify user problems and what should we build</b> to solve them\" (L2, Types of user research by When).",
     "المحاضرة بتوصف الـ foundational research إنه كلام مع الـ users وتحديد الـ pain points بتاعتهم، مش دراسة الـ marketing بتاع المنافسين (L2, Types of user research by When)."
    ],
    [
     "الـ Experiments متصنفة تحت الـ primary research (data إنت اللي بتجمعها بنفسك). الـ Secondary research بيستخدم data حد تاني جمعها (L5, Primary vs secondary table).",
     "الـ Secondary research هو research حد تاني عمله من مصادر زي الكتب والـ journals، فهو مش original data (L2, Types of user research based on Who).",
     "صح. الـ Secondary research بيستخدم شغل موجود عمله ناس تانيين، والمحاضرة بتقول إنه بيوفر مجهود ووقت و<b>بيدعم نتايج الـ primary research</b> (L2, Secondary Research).",
     "دي مش فايدة، والمحاضرة مقالتهاش: نتايج الـ secondary research غالباً بيعملها researchers عندهم خبرة ومتخصصين، وصعب إنك تعمل زيها. العيب اللي المحاضرة ذكرته هو إن الـ data ممكن تبقى قديمة أوي أو مش specific كفاية (L2, Secondary Research; L5 table)."
    ],
    [
     "الـ Usability studies والـ participant observations متذكورين كـ methods للـ <b>primary</b> research، وهو الـ research اللي إنت بتعمله بنفسك (L2, Types of user research based on Who).",
     "صح. إنك تراقب الـ users في usability study ده research إنت بتعمله بنفسك، فهو <b>primary</b> research. المحاضرة بتذكر الـ usability studies والـ participant observations كـ primary methods؛ والـ secondary research هو research حد تاني عمله، زي الكتب والـ journals (L2, Types of user research based on Who)."
    ],
    [
     "صح. الـ Secondary research بيستخدم <b>data موجودة</b> حد تاني جمعها (كتب و journals وحاجات شبههم). مهم في أول الـ project عشان تجمع statistics و facts و figures عن الـ users، وبيوفر مجهود ووقت كبير جداً (L2, Secondary research; L5, Primary vs secondary).",
     "الـ Secondary research هو بالظبط استخدام data موجودة حد تاني عملها: statistics و facts و figures من كتب و journals و research organizations (L2, Secondary research). والعيب المعروف بتاعه إن الـ data الموجودة دي ممكن تبقى قديمة أوي، وده بيأكد إنها data من الماضي (L5, Primary vs secondary)."
    ],
    [
     "الـ Interviews متذكورة كـ method للـ <b>primary</b> research، يعني research إنت بتعمله بنفسك، مش secondary research (L2, Types of user research based on Who).",
     "صح. إنك تعمل interviews بنفسك ده <b>primary</b> research؛ والمحاضرة حاطة الـ interviews أول واحدة في الـ primary methods. الـ Secondary research هو research حد تاني عمله، زي الكتب والـ journals (L2, Types of user research based on Who)."
    ],
    [
     "الـ Secondary research واحد من نوعين الـ user research حسب \"Who\" في الكورس، ومهم في أول الـ project عشان تجمع statistics و facts و figures عن الـ users (L2, Secondary research; L5, Secondary research benefits).",
     "صح. الـ <b>Secondary research</b> (research حد تاني عمله، زي الكتب والـ journals) نوع من أنواع الـ user research في الكورس. بيوفر مجهود ووقت، وبيدعم نتايج الـ primary، وبيجاوب على أسئلة عن قدرات الإنسان وحدوده، زي عمى الألوان (L2, Secondary research; L5, Secondary research benefits)."
    ]
   ],
   "extra": [
    [
     "ده الـ design life cycle بتاع Joyner، مش process بتاع Google.",
     "لازم تفهم الـ users قبل ما تحدد (specify) المشكلة.",
     "صح. الـ process بتاع Google هو Understand و Specify و Design و Evaluate، والـ iteration هو الأساس.",
     "إنك تصمم قبل ما تفهم الـ users هو بالظبط اللي الـ user-centered design بيتجنبه."
    ],
    [
     "الـ Testing مع users حقيقيين ده الـ Evaluate step، آخر خطوة في Understand ← Specify ← Design ← Evaluate (L2, Google UCD process).",
     "تصميم الحلول والبدء في البناء ده الـ Design step، واللي بييجي بعد ما الـ Specify يختار المشكلة اللي هنحلها (L2, Google UCD process).",
     "إنك تفهم الـ users بيعيشوا تجربة المنتج إزاي ده الـ Understand step، أول خطوة وأكتر خطوة فيها research (L2, Google UCD process).",
     "صح. الـ Specify معناها إنك تختار أهم user problem محتاج تتحل."
    ],
    [
     "التصميم على functional specification ده الطريقة اللي الـ systems <i>كانت</i> بتتصمم بيها زمان.",
     "صح. الـ User-centered design بياخد احتياجات الـ user في الاعتبار في <b>كل خطوة</b>."
    ],
    [
     "صح. الـ User research جزء أساسي من كل مرحلة، فمش خطوة واحدة.",
     "الاتنين بيقولوا إن الـ users مطلوبين طول الوقت، مش إن الـ research ملوش لازمة.",
     "المحاضرة مقالتش أي حاجة زي كده؛ الـ research جزء أساسي من الـ design.",
     "الـ Secondary research بيدعم الـ primary research؛ مش بيحل محل الـ user research."
    ],
    [
     "إنك تستنى للآخر هو بالظبط اللي Joyner بيحذّر منه.",
     "صح. Joyner بيقول \"you need users early and often\".",
     "دي فكرة الـ \"one-time step\" اللي المحاضرة رافضاها.",
     "دي مش جملة Joyner؛ الـ users مطلوبين طول الوقت."
    ],
    [
     "الـ Tactical research بيحصل أثناء الـ design ومحتاج feedback على الـ prototypes.",
     "الـ Post-launch research بيحصل بعد الـ release عشان نشوف النجاح.",
     "صح. بيحصل قبل ما أي حاجة تتصمم، بيتكلم مع الـ users عن الـ pain points، وبيقرر إيه اللي هيتبني.",
     "الفريق بيتكلم مع الـ users بنفسه، يبقى primary؛ وكمان \"secondary\" ده تقسيم حسب WHO مش WHEN."
    ],
    [
     "صح. دي بالظبط أسئلة الـ post-launch research.",
     "المحاضرة بتعرّف الـ post-launch research بالأسئلة دي."
    ],
    [
     "الـ Foundational research بيحصل قبل ما أي حاجة تتصمم.",
     "المنتج لسه متعملوش launch.",
     "الفريق بيجمع الـ feedback بنفسه، والـ secondary ده تقسيم WHO.",
     "صح. الـ Tactical research بيحصل أثناء الـ design، بيقول المنتج يتبني إزاي، وبيستخدم feedback على الـ prototypes."
    ],
    [
     "صح. المحاضرة بتذكر الفوايد دي للـ secondary research في الأول.",
     "الـ Primary research هو اللي specific لاحتياجاتك.",
     "الـ Secondary research بيدعم الـ primary findings؛ مش بيلغيها.",
     "الـ Foundational research ده primary research بيتعمل قبل ما أي حاجة تتصمم."
    ],
    [
     "صح. المحاضرة بتقول إن الـ component الواضح بيمنع إنك تستهون بيه، وكمان بقى أكتر وأكتر دور للـ specialists.",
     "المحاضرة بتذكر فوايد إنك تخلي الـ user research واضح لوحده."
    ]
   ]
  },
  "3": {
   "notes": [
    {
     "h": "يعني إيه الـ cognition؟",
     "pts": [
      "الـ <b>Cognition</b> بيشمل التفكير، والتذكر، والتعلم، والسرحان (daydreaming)، واتخاذ القرارات، والرؤية، والقراية، والكلام، والكتابة…",
      "طرق لتصنيف الـ cognition على مستوى أعلى: <b>fast vs slow thinking (Kahneman, 2011)</b>."
     ]
    },
    {
     "h": "Activity: أنهي حاجة فيها fast thinking وأنهي فيها slow thinking؟",
     "pts": [
      "الـ slide بتسأل أنهي من دول فيه fast thinking وأنهي فيه slow thinking:",
      "2 + 2 =",
      "21 × 29 =",
      "لون عينيك إيه؟",
      "كام لون في قوس قزح؟",
      "كام شهر في السنة فيه 31 يوم؟",
      "اسم أول مدرسة دخلتها إيه؟",
      "الـ slide مش بتدي إجابات؛ ده سؤال للمناقشة في المحاضرة."
     ],
     "figH": {
      "fast-slow": "تفكير سريع ولا بطيء؟ صنّف الأسئلة"
     }
    },
    {
     "h": "فهم الـ cognition بيساعد في إيه؟",
     "pts": [
      "بيدينا معرفة بالحاجات اللي نقدر نتوقع إن الـ users يعملوها واللي منقدرش نتوقعها منهم.",
      "بيحدد ويشرح طبيعة وأسباب المشاكل اللي الـ users بيقابلوها.",
      "بيوفر theories، و modeling tools، و guidance، و methods ممكن توصلنا لـ design أحسن للـ interactive products."
     ]
    },
    {
     "h": "الـ Cognitive processes",
     "pts": [
      "(1) Attention",
      "(2) Perception",
      "(3) Memory",
      "(4) Learning",
      "(5) Reading, speaking and listening",
      "(6) Problem-solving, planning, reasoning and decision-making"
     ]
    },
    {
     "h": "الـ Attention",
     "pts": [
      "الـ <b>Attention</b> بيخلينا نركز على المعلومات اللي ليها علاقة باللي إحنا بنعمله.",
      "بيشمل الحواس السمعية (audio) و/أو البصرية (visual).",
      "فيه attention <b>focused</b> وفيه attention <b>divided</b>.",
      "Design recommendation: المعلومات اللي على الـ interface لازم تكون متنظمة بشكل يشد الـ attention بتاع الـ users، مثلاً تستخدم perceptual boundaries (windows) وألوان."
     ]
    },
    {
     "h": "Activity: دوّر على سعر الأوتيل (شاشتين)",
     "pts": [
      "<b>الشاشة الأولى</b> (الـ task: تلاقي سعر الـ double room في الـ Quality Inn في Pennsylvania): شاشة غامقة عنوانها \"Pennsylvania\" والـ entries مكتوبة ورا بعض.<br>• كل entry على شكل:<span class=\"ltr\">City Motel/Hotel: Name</span>وتحتها في السطر اللي بعده رقم التليفون وسعر الـ S (single) والـ D (double).<br>• مثال:<span class=\"ltr\">Bedford Motel/Hotel: Crinaline Courts (814) 623-9511 S: $118 D: $120</span>",
      "الـ entries اللي في الشاشة الأولى:<span class=\"ltr\"><b>Bedford</b>: Crinaline Courts, Holiday Inn, Midway, Penn Manor, Quality Inn, Terrace</span><span class=\"ltr\"><b>Bradley</b>: De Soto, Holiday House, Holiday Inn</span><span class=\"ltr\"><b>Breezewood</b>: Best Western Plaza, Motel 70</span>والسطر المطلوب هو:<span class=\"ltr\">Bedford Motel/Hotel: Quality Inn (814) 623-5189 S: $123 D: $128</span>",
      "<b>الشاشة التانية</b> (الـ task: تلاقي سعر الـ double room في الـ Holiday Inn في Columbia): شاشة غامقة عنوانها \"South Carolina\" ومترتبة في columns:<span class=\"ltr\">City | Motel/Hotel | Area code | Phone | Rates (Single, Double)</span>وصفوف Charleston متجمعة مع بعض، وصفوف Columbia متجمعة تحتها.",
      "أوتيلات Charleston:<span class=\"ltr\">Best Western, Days Inn, Holiday Inn N, Holiday Inn SW, Howard Johnsons, Ramada Inn, Sheraton Inn</span>أوتيلات Columbia:<span class=\"ltr\">Best Western, Carolina Inn, Days Inn, Holiday Inn NW, Howard Johnsons, Quality Inn, Ramada Inn, Vagabond Inn</span>والصف المطلوب هو:<span class=\"ltr\">Columbia, Holiday Inn NW, 803, 794-9440, $132, $139</span>",
      "<b>Tullis (1987)</b> لقى إن الشاشتين طلّعوا نتايج مختلفة جداً:<br>• الشاشة الأولى أخدت في المتوسط <b>5.5 ثانية</b> عشان تدوّر فيها؛<br>• والشاشة التانية أخدت <b>3.2 ثانية</b>.",
      "طب ليه، مع إن الاتنين فيهم نفس الـ density من المعلومات؟ السبب هو الـ <b>Spacing</b>:",
      "في الشاشة الأولى، المعلومات لازقة في بعض (bunched up)، وده بيخلي التدوير صعب.",
      "في الشاشة التانية، الحروف متجمعة في vertical categories من المعلومات، وده بيخليه أسهل."
     ],
     "figH": {
      "hotel-search": "دوّر على سعر الفندق: الشاشتين وقت كل واحدة"
     }
    },
    {
     "h": "الـ Multitasking والـ attention",
     "pts": [
      "ينفع نعمل كذا task في نفس الوقت من غير ما واحدة أو أكتر منهم تتأثر بشكل سلبي؟",
      "الـ <b>Multitasking</b> ممكن يخلي الناس يتوهوا من حبل أفكارهم (train of thought)، ويغلطوا، ويحتاجوا يبدأوا من الأول.",
      "<b>Ophir et al. (2009)</b> قارنوا بين الـ heavy multitaskers والـ light multitaskers:",
      "الـ heavy multitaskers كانوا أكتر عرضة للتشتت من اللي نادراً ما بيعملوا multitasking.",
      "الـ heavy multitaskers بيتشتتوا بسهولة وبيلاقوا صعوبة في إنهم يفلتروا المعلومات اللي ملهاش لازمة (irrelevant)."
     ]
    },
    {
     "h": "الـ Multitasking في الشغل",
     "pts": [
      "بقى منتشر أكتر وأكتر إن الموظفين يعملوا multitasking.",
      "مثلاً، الناس اللي شغالين في المستشفيات لازم يتابعوا كذا شاشة في أوضة العمليات بتديهم أنواع جديدة من المعلومات real-time.",
      "وده محتاج attention مستمر من الـ clinician عشان يشوف لو فيه أي data غريبة أو شاذة (unusual or anomalous).",
      "فيه احتياج إننا نطوّر attention and scanning strategies جديدة."
     ]
    },
    {
     "h": "إزاي نطلّع alternatives",
     "pts": [
      "البني آدمين بيميلوا إنهم يمسكوا في الحاجة اللي شغالة.",
      "إنك تفكر في alternatives بيساعدك تلاقي designs أحسن.",
      "الـ alternative designs بتيجي منين؟",
      "(1) <b>'Flair and creativity'</b>: research و synthesis.",
      "(2) <b>Cross-fertilization of ideas</b> من وجهات نظر مختلفة.",
      "(3) <b>الـ Users ممكن يطلّعوا designs مختلفة</b>.",
      "(4) <b>Seek inspiration</b>: منتجات و domain شبه بعض، أو منتجات و domain مختلفين."
     ]
    },
    {
     "h": "ينفع تستخدم الموبايل وإنت سايق؟ لأ!",
     "pts": [
      "السؤال معروض مع صورة لست سايقة عربية وإيد واحدة على الدريكسيون وهي بتبص في الموبايل اللي في إيدها التانية.",
      "الإجابة هي <b>لأ!</b>",
      "السواقة متطلبة جداً (very demanding).",
      "السواقين عرضة إنهم يتشتتوا.",
      "فيه احتمال كبير إنهم يعملوا حوادث.",
      "الـ reaction times بتاعة السواقين للأحداث الخارجية بتبقى أطول لما يكونوا بيتكلموا في التليفون في العربية (<b>Caird et al., 2018</b>).",
      "السواقين اللي بيستخدموا الموبايل بيعتمدوا أكتر على توقعاتهم للي غالباً هيحصل بعد كده، عشان المكالمة واخدة الـ attention بتاعهم.",
      "الـ Response time بيبقى أبطأ للأحداث اللي مش متوقعة (<b>Briggs et al., 2018</b>).",
      "السواقين كتير بيحاولوا يتخيلوا وش الشخص التاني (اللي بيكلموه) شكله إيه. وده بينافس على الـ processing resources اللي محتاجينها عشان ياخدوا بالهم من اللي قدامهم ويتصرفوا."
     ],
     "figH": {
      "phone-driving": "ليه استخدام الموبايل وإنت سايق خطر"
     }
    },
    {
     "h": "هل الـ hands-free phones أأمن وإنت سايق؟",
     "pts": [
      "<b>لأ</b>، لأن نفس نوع الـ cognitive processing بيحصل وإنت بتتكلم.",
      "ونفس الحاجة بتحصل لما تتكلم مع راكب قاعد جنبك في الكرسي اللي قدام.",
      "بس الاتنين (السواق والراكب) يقدروا يوقفوا في نص الجملة لو شافوا خطر (hazard)، وده بيخلي السواق يحوّل على الطريق على طول.",
      "فالكلام مع راكب قاعد قدام أقل خطورة من الكلام مع شخص بعيد (remote).",
      "الشخص البعيد اللي على الناحية التانية من التليفون مش شايف اللي السواق شايفه (not privy)، وهيكمل الكلام حتى لو فيه خطر.",
      "وده بيصعّب على السواق إنه يحوّل كل الـ attention بتاعه على الطريق."
     ]
    },
    {
     "h": "الـ Design implications للـ attention",
     "pts": [
      "الـ Context: خلّي المعلومة <b>salient</b> (بارزة) لما يكون لازم ننتبه لها في مرحلة معينة من الـ task.",
      "استخدم techniques عشان توصل لده، مثلاً اللون، والترتيب (ordering)، والـ spacing، والـ underlining، والـ sequencing، والـ animation.",
      "متزحمش الـ visual interfaces بمعلومات كتير أوي (cluttering).",
      "فكّر تصمم طرق مختلفة تدعم إن الـ user يعمل switching بشكل فعال ويرجع للـ interface تاني."
     ]
    },
    {
     "h": "الـ Perception",
     "pts": [
      "الـ <b>Perception</b>: إزاي المعلومات بتتاخد من العالم وبتتحول لـ experiences.",
      "الـ implication الواضحة إننا نصمم representations سهل إنها تتدرك (readily perceivable)، مثلاً:",
      "الـ Text لازم يكون مقروء (legible).",
      "الـ Icons لازم تكون سهل نفرّق بينها ونقراها."
     ]
    },
    {
     "h": "Activity: الـ color contrast ضد الـ borders والـ white space",
     "pts": [
      "<b>الشاشة الأولى: \"Is color contrast good? Find Italian\"</b>: فيها grid مقاسه 4 × 4 من المجموعات، كل مجموعة list فيها ست أسامي.<br>• مثال على مجموعة:<span class=\"ltr\">Black Hills Forest, Cheyenne River, Social Science, South San Jose, Badlands Park, Juvenile Justice</span>• المجموعات مفصولة عن بعض بالـ <b>color contrast</b> بس (خلفيات لبني فاتح وأبيض بالتبادل).<br>• الكلمة \"Italian\" هي تاني item في المجموعة اللي في الصف التالت، العمود الأول:<span class=\"ltr\">Performing Arts, Italian, Coaches, McKees Rocks, Glenwood Springs, Urban Affairs</span>",
      "<b>الشاشة التانية: \"Are borders and white space better? Find French\"</b>: فيها grid مقاسه 4 × 4 من مجموعات فيها ست أسامي.<br>• مثال على مجموعة:<span class=\"ltr\">Webmaster, Russian, Athletics, Go Shockers, Degree Options, Newsletter</span>• كل مجموعة جوه <b>border</b> ومفصولة عن الباقي بـ <b>white space</b>.<br>• الكلمة \"French\" في المجموعة اللي في الصف التالت، العمود التالت:<span class=\"ltr\">Staff, Aerospace, Choral Dept., Alberg Hall, French, Spanish</span>",
      "<b>Weller (2004)</b> لقى إن الناس أخدوا وقت أقل عشان يلاقوا الـ items لما المعلومات كانت متجمعة باستخدام <b>border</b> (الشاشة التانية) مقارنة باستخدام <b>color contrast</b> (الشاشة الأولى).",
      "فيه ناس بتقول إن الـ white space الكتير أوي في صفحات الويب بيضر عملية التدوير (search): بيخلي صعب تلاقي المعلومة.",
      "إنت موافق؟ (سؤال للمناقشة؛ الـ slide مش بتدي إجابة)"
     ],
     "figH": {
      "word-grids": "تباين الألوان قصاد الـ borders والمسافات الفاضية: دوّر على الكلمة"
     }
    },
    {
     "h": "Activity: أنهي واحد أسهل في القراية وليه؟",
     "pts": [
      "الـ slide بتعرض نفس النص، \"What is the time?\"، في خمس مربعات:",
      "(1) كلام أحمر على خلفية أخضر غامق textured (شكلها رخام).",
      "(2) كلام أصفر على خلفية برتقاني.",
      "(3) كلام أحمر على خلفية برتقاني.",
      "(4) كلام أسود على خلفية بيضا.",
      "(5) كلام أبيض على خلفية صفرا (mustard).",
      "الـ slide بتسأل أنهي واحد أسهل في القراية وليه، ومش بتدي إجابة؛ ده سؤال للمناقشة."
     ],
     "figH": {
      "time-boxes": "أنهي نص أسهل في القراية؟"
     }
    },
    {
     "h": "الـ Design implications للـ perception",
     "pts": [
      "الـ Icons لازم تخلي الـ users <b>يفرّقوا</b> معناها بسهولة.",
      "الـ <b>Bordering and spacing</b> طرق بصرية فعالة لتجميع (grouping) المعلومات.",
      "الأصوات لازم تكون مسموعة وسهل نفرّق بينها.",
      "اعمل research على techniques الـ <b>color contrast</b> الصح وإنت بتصمم interface:",
      "الأصفر على أسود أو أزرق تمام.",
      "الأصفر على أخضر أو أبيض ممنوع خالص (a no-no)."
     ]
    }
   ],
   "cards": [
    "التفكير، والتذكر، والتعلم، والسرحان (daydreaming)، واتخاذ القرارات، والرؤية، والقراية، والكلام، والكتابة…",
    "Fast vs slow thinking (Kahneman, 2011).",
    "1) معرفة بالحاجات اللي نقدر نتوقع إن الـ users يعملوها واللي منقدرش. 2) بيحدد ويشرح طبيعة وأسباب المشاكل اللي الـ users بيقابلوها. 3) theories و modeling tools و guidance و methods بتوصل لـ interactive products أحسن.",
    "Attention؛ perception؛ memory؛ learning؛ reading, speaking and listening؛ problem-solving, planning, reasoning and decision-making.",
    "بيخلينا نركز على المعلومات اللي ليها علاقة باللي بنعمله. بيشمل الحواس السمعية و/أو البصرية. فيه focused و divided attention.",
    "نظّم المعلومات اللي على الـ interface بشكل يشد الـ attention بتاع الـ users، مثلاً perceptual boundaries (windows) وألوان.",
    "الشاشة الأولى (المعلومات لازقة في بعض): في المتوسط 5.5 ثانية للتدوير. الشاشة التانية (متجمعة في vertical categories): 3.2 ثانية.",
    "الـ Spacing: المعلومات في الشاشة الأولى لازقة في بعض (bunched up)؛ والتانية بتجمّع الحروف في vertical categories من المعلومات.",
    "قارنوا بين الـ heavy والـ light multitaskers: الـ heavy multitaskers كانوا أكتر عرضة للتشتت ولقوا صعوبة في إنهم يفلتروا المعلومات اللي ملهاش لازمة.",
    "الناس بيتوهوا من حبل أفكارهم (train of thought)، وبيغلطوا، وبيحتاجوا يبدأوا من الأول.",
    "ناس شغالين في مستشفى بيتابعوا كذا شاشة فيها معلومات real-time في أوضة العمليات؛ محتاج attention مستمر و attention and scanning strategies جديدة.",
    "1) 'Flair and creativity': research و synthesis. 2) Cross-fertilization of ideas من وجهات نظر مختلفة. 3) الـ Users ممكن يطلّعوا designs مختلفة. 4) Seek inspiration: منتجات و domain شبه بعض أو مختلفين.",
    "الـ reaction times بتاعة السواقين للأحداث الخارجية بتبقى أطول لما يكونوا بيتكلموا في التليفون في العربية.",
    "الـ Response time بيبقى أبطأ للأحداث اللي مش متوقعة (السواقين اللي بيستخدموا الموبايل).",
    "لأ، نفس نوع الـ cognitive processing بيحصل وإنت بتتكلم.",
    "الاتنين يقدروا يوقفوا في نص الجملة لما يشوفوا خطر؛ أما الشخص البعيد فمش شايف اللي السواق شايفه (not privy) وبيكمل كلام وقت الخطر.",
    "خلّي المعلومة salient لما نحتاجها في مرحلة من الـ task؛ استخدم اللون، والـ ordering، والـ spacing، والـ underlining، والـ sequencing، والـ animation؛ ابعد عن الـ clutter؛ ادعم الـ switching الفعال والرجوع للـ interface.",
    "إزاي المعلومات بتتاخد من العالم وبتتحول لـ experiences.",
    "الـ Text لازم يكون مقروء (legible)؛ الـ icons لازم تكون سهل نفرّق بينها ونقراها.",
    "الناس أخدوا وقت أقل عشان يلاقوا الـ items المتجمعة باستخدام border (الشاشة التانية) عن اللي باستخدام color contrast (الشاشة الأولى).",
    "فيه ناس بتقول إن الـ white space الكتير أوي في صفحات الويب بيضر الـ search: بيخلي صعب تلاقي المعلومة.",
    "الأصفر على أسود أو أزرق تمام؛ الأصفر على أخضر أو أبيض ممنوع خالص (a no-no).",
    "الـ Icons سهل نفرّق بينها؛ الـ bordering والـ spacing بيجمّعوا المعلومات؛ الأصوات مسموعة وسهل نفرّق بينها؛ اعمل research على الـ color contrast الصح."
   ],
   "qa": [
    "الـ Cognition هو التفكير، والتذكر، والتعلم، والسرحان (daydreaming)، واتخاذ القرارات، والرؤية، والقراية، والكلام، والكتابة… وممكن يتصنف على مستوى أعلى لـ fast vs slow thinking (Kahneman, 2011). فهمه بيساعد لأنه: 1) بيدينا معرفة بالحاجات اللي نقدر نتوقع إن الـ users يعملوها واللي منقدرش نتوقعها منهم؛ 2) بيحدد ويشرح طبيعة وأسباب المشاكل اللي الـ users بيقابلوها؛ 3) بيوفر theories، و modeling tools، و guidance، و methods ممكن توصلنا لـ design أحسن للـ interactive products.",
    "1) Attention 2) Perception 3) Memory 4) Learning 5) Reading, speaking and listening 6) Problem-solving, planning, reasoning and decision-making.",
    "Tullis قارن بين شاشتين فيهم معلومات عن أوتيلات وليهم نفس الـ density من المعلومات. الشاشة الأولى أخدت في المتوسط 5.5 ثانية للتدوير والتانية أخدت 3.2 ثانية. السبب هو الـ spacing: في الشاشة الأولى المعلومات لازقة في بعض (bunched up)، وده بيخلي التدوير صعب؛ وفي التانية الحروف متجمعة في vertical categories من المعلومات، وده بيخليه أسهل.",
    "الـ Multitasking ممكن يخلي الناس يتوهوا من حبل أفكارهم (train of thought)، ويغلطوا، ويحتاجوا يبدأوا من الأول. Ophir et al. (2009) قارنوا بين الـ heavy والـ light multitaskers: الـ heavy multitaskers كانوا أكتر عرضة للتشتت من اللي نادراً ما بيعملوا multitasking، وبيتشتتوا بسهولة وبيلاقوا صعوبة في إنهم يفلتروا المعلومات اللي ملهاش لازمة. في الشغل، الـ multitasking بقى منتشر أكتر وأكتر، مثلاً الناس اللي شغالين في المستشفيات بيتابعوا كذا شاشة فيها معلومات real-time في أوضة العمليات، وده محتاج attention مستمر عشان يشوفوا لو فيه data غريبة أو شاذة، فمحتاجين attention and scanning strategies جديدة.",
    "لأ. 1) السواقة متطلبة جداً. 2) السواقين عرضة إنهم يتشتتوا. 3) فيه احتمال كبير إنهم يعملوا حوادث. 4) الـ reaction times للأحداث الخارجية بتبقى أطول لما يكونوا بيتكلموا في التليفون (Caird et al., 2018). 5) السواقين اللي على التليفون بيعتمدوا أكتر على توقعاتهم للي هيحصل بعد كده، عشان المكالمة واخدة الـ attention بتاعهم. 6) الـ Response time بيبقى أبطأ للأحداث اللي مش متوقعة (Briggs et al., 2018). 7) السواقين بيتخيلوا وش الشخص التاني، وده بينافس على الـ processing resources اللي محتاجينها عشان ياخدوا بالهم من اللي قدامهم ويتصرفوا. الـ Hands-free phones مش أأمن، لأن نفس نوع الـ cognitive processing بيحصل وإنت بتتكلم. الكلام مع راكب قاعد قدام أقل خطورة، لأن الاتنين يقدروا يوقفوا في نص الجملة لما يشوفوا خطر، أما الشخص البعيد فمش شايف اللي السواق شايفه وبيكمل كلام، وده بيصعّب على السواق إنه يحوّل كل الـ attention بتاعه على الطريق.",
    "1) الـ Context: خلّي المعلومة salient لما يكون لازم ننتبه لها في مرحلة معينة من الـ task. 2) استخدم techniques زي اللون، والـ ordering، والـ spacing، والـ underlining، والـ sequencing، والـ animation. 3) متزحمش الـ visual interfaces بمعلومات كتير أوي. 4) فكّر تصمم طرق مختلفة تدعم الـ switching الفعال والرجوع للـ interface.",
    "الـ Perception هو إزاي المعلومات بتتاخد من العالم وبتتحول لـ experiences. الـ Representations لازم تكون سهل إنها تتدرك، مثلاً الـ text يكون مقروء والـ icons سهل نفرّق بينها ونقراها. Weller (2004) لقى إن الناس لقوا الـ items أسرع لما المعلومات كانت متجمعة باستخدام border عن لما كانت باستخدام color contrast. الـ Design implications: 1) الـ icons لازم تخلي الـ users يفرّقوا معناها بسهولة؛ 2) الـ bordering والـ spacing طرق بصرية فعالة لتجميع المعلومات؛ 3) الأصوات لازم تكون مسموعة وسهل نفرّق بينها؛ 4) اعمل research على techniques الـ color contrast الصح: الأصفر على أسود أو أزرق تمام، والأصفر على أخضر أو أبيض ممنوع خالص (a no-no).",
    "البني آدمين بيميلوا إنهم يمسكوا في الحاجة اللي شغالة، بس إنك تفكر في alternatives بيساعدك تلاقي designs أحسن. الـ Alternatives بتيجي من: 1) 'Flair and creativity': research و synthesis؛ 2) Cross-fertilization of ideas من وجهات نظر مختلفة؛ 3) الـ Users ممكن يطلّعوا designs مختلفة؛ 4) Seek inspiration: منتجات و domain شبه بعض، أو منتجات و domain مختلفين."
   ],
   "quiz": [
    [
     "صح. الـ slide بتصنّف الـ cognition على مستوى أعلى لـ fast vs slow thinking، وبتستشهد بـ Kahneman (2011). (L3, What is cognition?)",
     "Ophir et al. (2009) قارنوا بين الـ heavy والـ light multitaskers في جزء الـ multitasking؛ ده مش طريقة لتصنيف الـ cognition.",
     "الـ Focused والـ divided دول أنواع الـ attention، و Tullis (1987) هي دراسة التدوير في الشاشات، مش تصنيف للـ cognition.",
     "Weller (2004) قارن بين التجميع بالـ border والتجميع بالـ color contrast في الـ perception؛ ده مش تصنيف للـ cognition."
    ],
    [
     "الـ Memory هي تالت cognitive process في الـ slide.",
     "صح. الـ cognitive processes هي الـ attention، والـ perception، والـ memory، والـ learning، والـ reading/speaking/listening، والـ problem-solving/planning/reasoning/decision-making؛ والـ prototyping مش منهم. (L3, Cognitive processes)",
     "الـ Perception هي تاني cognitive process في الـ slide.",
     "دي سادس cognitive process في الـ slide."
    ],
    [
     "صح. دي واحدة من التلات طرق اللي فهم الـ cognition بيساعد بيها، جنب إننا نعرف الـ users يقدروا يعملوا إيه وميقدروش يعملوا إيه، وإنه بيوفر theories و tools و methods. (L3, How can understanding cognition help?)",
     "الـ slide حاطة الكلام ده بالظبط كواحدة من الطرق اللي فهم الـ cognition بيساعد بيها."
    ],
    [
     "ده تعريف الـ perception، مش الـ attention.",
     "الـ slide بتقول إن الـ attention بيشمل الحواس السمعية و/أو البصرية، مش البصرية بس.",
     "صح. ده تعريف الـ attention في الـ slide، وهو بيشمل الحواس السمعية و/أو البصرية وممكن يكون focused أو divided. (L3, Attention)",
     "المحاضرة بتسأل هل ده ممكن أصلاً، وبتقول إن الـ multitasking بيسبب أخطاء وإن الواحد يتوه من حبل أفكاره؛ ده مش تعريف الـ attention."
    ],
    [
     "الـ 5.5 ثانية كانت المتوسط بتاع الشاشة الأولى، اللي المعلومات فيها كانت لازقة في بعض.",
     "صح. الشاشة الأولى أخدت في المتوسط 5.5 ثانية والشاشة التانية أخدت 3.2 ثانية. (L3, Activity: find the hotel price (two screens))",
     "الرقم ده مش موجود في الـ slides؛ الشاشة التانية أخدت 3.2 ثانية.",
     "الرقم ده مش موجود في الـ slides؛ الوقتين كانوا 5.5 s و 3.2 s."
    ],
    [
     "الـ slide مش بتذكر اللون كسبب؛ السبب اللي بتديه هو الـ spacing.",
     "الشاشتين كان فيهم نفس الـ density من المعلومات؛ والسبب المذكور هو الـ spacing.",
     "صح. الشاشة الأولى بتلزّق المعلومات في بعض، أما التانية فبتجمّع الحروف في vertical categories، وده بيخلي التدوير أسهل. (L3, Activity: find the hotel price (two screens))",
     "الـ Borders هي طريقة التجميع في الـ activity بتاع Weller (2004)، مش في شاشات Tullis."
    ],
    [
     "العكس: الـ heavy multitaskers بيلاقوا صعوبة في إنهم يفلتروا المعلومات اللي ملهاش لازمة.",
     "الدراسة لقت إن الـ heavy multitaskers كانوا أكتر عرضة للتشتت.",
     "الـ heavy multitaskers هم اللي كانوا أكتر عرضة للتشتت، مش الـ light.",
     "صح. الـ heavy multitaskers بيتشتتوا بسهولة وبيلاقوا صعوبة في إنهم يفلتروا المعلومات اللي ملهاش لازمة. (L3, Multitasking and attention)"
    ],
    [
     "صح. الـ slide بتقول التأثيرات دي بالظبط للـ multitasking. (L3, Multitasking and attention)",
     "الـ slide بتقول إن الـ multitasking ممكن يسبب المشاكل دي بالظبط."
    ],
    [
     "صح. لازم يدّوا attention مستمر للمعلومات الـ real-time عشان يشوفوا لو فيه أي data غريبة أو شاذة. (L3, Multitasking at work)",
     "ده مش المثال اللي في الـ slide؛ مثال الـ multitasking في الشغل هو الناس اللي شغالين في المستشفى في أوضة العمليات.",
     "الطيارين مش مذكورين في المحاضرة؛ المثال هو الناس اللي شغالين في المستشفى.",
     "الطلبة مش هم المثال اللي في الـ slide؛ المثال هو الناس اللي شغالين في المستشفى في أوضة العمليات."
    ],
    [
     "ده أول مصدر مذكور في الـ slide.",
     "ده تاني مصدر مذكور في الـ slide.",
     "صح. الـ slide بتقول إن البني آدمين بيميلوا إنهم يمسكوا في الحاجة اللي شغالة، بس التفكير في alternatives بيساعد نلاقي designs أحسن؛ فده مش مذكور كمصدر. الـ alternative designs بتيجي من 'flair and creativity'، والـ cross-fertilization of ideas، وإن الـ users يطلّعوا designs مختلفة، والـ seek inspiration. (L3, How to generate alternatives)",
     "ده رابع مصدر مذكور في الـ slide."
    ],
    [
     "Tullis (1987) درس وقت التدوير في شاشتين فيهم معلومات عن أوتيلات.",
     "صح. الـ slide بتستشهد بـ Caird et al. (2018) إن الـ reaction times بتبقى أطول لما السواق بيتكلم في التليفون في العربية. (L3, Is it OK to use a phone when driving? No!)",
     "Weller (2004) درس تجميع المعلومات بالـ borders مقابل الـ color contrast.",
     "Ophir et al. (2009) قارنوا بين الـ heavy والـ light multitaskers."
    ],
    [
     "الـ slide بتقول لأ: نفس نوع الـ cognitive processing بيحصل وإنت بتتكلم، فالـ hands-free مش بيخليها أأمن.",
     "صح. الـ Hands-free phones مش أأمن، لأن نفس نوع الـ cognitive processing بيحصل وإنت بتتكلم. (L3, Are hands-free phones safer to use when driving?)"
    ],
    [
     "علو الصوت مش مذكور؛ السبب إن الراكب يقدر يشوف الخطر ويبطّل كلام.",
     "الـ slide بتقول إن نفس الحاجة (نفس الـ processing) بتحصل لما تتكلم مع راكب قاعد قدام.",
     "صح. الشخص البعيد بيكمل المكالمة وقت الخطر، وده بيصعّب على السواق إنه يحوّل كل الـ attention بتاعه على الطريق. (L3, Are hands-free phones safer to use when driving?)",
     "ده مش مذكور؛ السبب إن الراكب يقدر يوقف في نص الجملة لما يشوف خطر."
    ],
    [
     "الـ slide بتقول العكس: متزحمش الـ visual interfaces بمعلومات كتير أوي.",
     "صح. استخدم techniques زي اللون، والـ ordering، والـ spacing، والـ underlining، والـ sequencing، والـ animation. (L3, Design implications for attention)",
     "اللون والـ animation مذكورين كـ techniques عشان تخلي المعلومة salient.",
     "الـ slide بتقول ادعم الـ switching الفعال والرجوع للـ interface."
    ],
    [
     "صح. ده تعريف الـ slide؛ والـ implication الواضحة إننا نصمم representations سهل إنها تتدرك. (L3, Perception)",
     "ده تعريف الـ attention.",
     "دي أمثلة على الـ cognition بشكل عام.",
     "ده الـ multitasking."
    ],
    [
     "ده عكس النتيجة: الـ borders (الشاشة التانية) كانت أسرع من الـ color contrast (الشاشة الأولى).",
     "ده رأي 'some' بيقولوه، وبعده سؤال \"Do you agree?\"؛ مش نتيجة Weller.",
     "صح. Weller (2004) لقى إن التجميع بالـ border (الشاشة التانية) كسب الـ color contrast (الشاشة الأولى). (L3, Activity: color contrast vs borders and white space)",
     "دي نتيجة Tullis (1987) للشاشة الأولى بتاعة الأوتيلات."
    ],
    [
     "الـ slide بتقول إن الأصفر على أسود تمام.",
     "الـ slide بتقول إن الأصفر على أزرق تمام.",
     "صح. الأصفر على أخضر أو أبيض ممنوع خالص (a no-no)، أما الأصفر على أسود أو أزرق فتمام. (L3, Design implications for perception)",
     "الـ slide مش بتقول إن الأسود على أبيض a no-no؛ التركيبات الممنوعة هي الأصفر على أخضر أو أبيض."
    ],
    [
     "صح. دي واحدة من الـ design implications للـ perception. (L3, Design implications for perception)",
     "الـ slide حاطة الجملة دي كـ design implication."
    ]
   ],
   "extra": []
  },
  "4": {
   "notes": [
    {
     "h": "الـ Memory",
     "pts": [
      "الـ <b>Memory</b> معناها إننا نفتكر أنواع مختلفة من المعرفة اللي بتخلي الناس تتصرف صح، زي مثلاً إنك تتعرف على وش حد أو تفتكر اسمه.",
      "إحنا الأول بنعمل <b>encode</b> للمعرفة وبعدين بنعملها <b>retrieve</b>.",
      "إحنا مش بنفتكر كل حاجة: الـ memory فيها <b>filtering</b> و processing للحاجات اللي بنركز معاها (attended to).",
      "الـ <b>Context</b> مهم في طريقة ما بنفتكر بيها (يعني فين، وإمتى، وإزاي، وهكذا).",
      "إحنا بنعمل <b>recognize</b> للحاجات أحسن بكتير من إننا نعملها <b>recall</b>.",
      "بنفتكر حاجات أقل عن الأشياء اللي صورناها بالكاميرا عن لما بنشوفها بعينينا على طول (<b>Henkel, 2014</b>)."
     ]
    },
    {
     "h": "الـ Context مهم",
     "pts": [
      "الـ Context بيأثر على قد إيه المعلومة ممكن نعملها retrieve بعد كده.",
      "ساعات بيبقى صعب على الناس يفتكروا معلومة اتعملها encode في context مختلف.",
      "مثال:<span class=\"ltr\">\"You are on a train and someone comes up to you and says hello. You don't recognize him for a few moments, but then realize it is one of your neighbors. You are only used to seeing your neighbor in the hallway of your apartment building, and seeing him out of context makes him difficult to recognize initially.\"</span>يعني إنت في القطر وحد جه سلّم عليك، مش عارفه لثواني وبعدين تكتشف إنه جارك، عشان إنت متعود تشوفه في طرقة العمارة بس، فلما شفته out of context بقى صعب تعرفه في الأول."
     ]
    },
    {
     "h": "نشاط (Activity): إيه اللي سهل نفتكره",
     "pts": [
      "نشاط (Activity): حاول تفتكر تواريخ أعياد ميلاد جدودك.",
      "حاول تفتكر غلاف آخر كتابين قريتهم.",
      "أنهي فيهم كان أسهل؟ وليه؟",
      "الناس شاطرة جداً في إنها تفتكر الـ <b>visual cues</b> عن الحاجات، زي لون الحاجات، ومكان الأشياء، والعلامات اللي على أي حاجة.",
      "وبيلاقوا صعوبة أكتر في إنهم يتعلموا ويفتكروا الـ <b>arbitrary material</b>، زي أعياد الميلاد وأرقام التليفونات."
     ],
     "figH": {
      "remember-activity": "إيه السهل نفتكره: الإشارات المرئية قصاد المعلومات العشوائية"
     }
    },
    {
     "h": "المشكلة في الـ '7, + or - 2' الكلاسيكية",
     "pts": [
      "نظرية <b>George Miller (1956)</b> عن قد إيه معلومات الناس تقدر تفتكرها.",
      "الـ immediate memory capacity عند الناس محدودة جداً بـ <b>7, + or - 2</b>.",
      "اتطبقت في الـ interaction design لما بنفكر هنعرض كام option.",
      "بس هل ده استخدام كويس لنظرية في الـ HCI؟ هل هي مفيدة؟ (أسئلة للنقاش؛ السلايد مش بيدي إجابة)",
      "لما بنعمل interface، هل المفروض الـ designer:<br>• يعرض 7 options بس في الـ menu؟<br>• يعرض 7 icons بس على الـ tool bar؟<br>• ميحطش أكتر من 7 bullets في list؟<br>• يحط 7 items بس في الـ pull down menu؟<br>• يحط 7 tabs بس فوق في صفحة الموقع؟<br>(سؤال للنقاش؛ السلايد مش بيدي إجابة)",
      "السلايد فيها صف من 7 smiley faces بألوان مختلفة (أحمر، بنفسجي، أزرق، أصفر، أسود، أبيض، لبني)."
     ],
     "figH": {
      "seven-plus-minus": "قاعدة Miller بتاعة 7 ± 2: نعرض كام اختيار؟"
     }
    },
    {
     "h": "الـ Design implications للـ memory",
     "pts": [
      "نقلل الـ <b>cognitive load</b> بإننا نبعد عن الـ procedures الطويلة والمعقدة عشان نخلّص الـ tasks.",
      "نصمم interfaces بتشجع على الـ <b>recognition بدل الـ recall</b>.",
      "ندي الـ users طرق مختلفة لـ <b>labelling الـ digital information</b> عشان يساعدهم يعرفوها تاني بسهولة، زي الـ folders، والـ categories، واللون، والـ flagging، والـ time stamping."
     ]
    },
    {
     "h": "الـ Learning",
     "pts": [
      "الـ <b>Learning</b> معناه تجميع skills ومعرفة، وده بيعتمد على الـ memory.",
      "فيه نوعين أساسيين:<br>• الـ <b>incidental learning</b> (زي إنك تتعرف على وشوش الناس، أو إيه اللي عملته النهارده)<br>• الـ <b>intentional learning</b> (زي المذاكرة لامتحان، أو إنك تتعلم تطبخ).",
      "الـ Intentional learning أصعب بكتير!",
      "فيه technologies كتير اتعملت عشان تساعد (زي الـ multimedia، والـ animations، والـ VR).",
      "الناس بتلاقي صعوبة إنها تتعلم من إنها تمشي ورا instructions في manual.",
      "الناس بتفضل <b>تتعلم بالممارسة (learn by doing)</b>."
     ]
    },
    {
     "h": "الـ Design implications للـ learning",
     "pts": [
      "نصمم interfaces بـ<b>تشجع على الـ exploration</b>.",
      "نصمم interfaces بـ<b>تقيّد وتوجّه (constrain and guide)</b> اللي بيتعلموا.",
      "الـ <b>Dynamically linking</b> بين الـ concepts والـ representations ممكن يسهّل تعلم الحاجات المعقدة."
     ]
    },
    {
     "h": "القراية والكلام والسماع (Reading, speaking, and listening)",
     "pts": [
      "السهولة اللي الناس بتقرا أو تسمع أو تتكلم بيها بتختلف:",
      "ناس كتير بتفضل الـ <b>listening</b> عن القراية.",
      "الـ <b>Reading</b> ممكن تبقى أسرع من الكلام أو السماع.",
      "الـ Listening محتاج cognitive effort أقل من القراية أو الكلام."
     ]
    },
    {
     "h": "Applications",
     "pts": [
      "الـ <b>Voice user interfaces</b> بتخلي الـ users يتفاعلوا معاها بإنهم يسألوا أسئلة، زي Google Voice و Siri و Alexa.",
      "الـ <b>Speech-output systems</b> بتستخدم speech متولد صناعياً (artificially-generated)، زي الـ written text-to-speech systems للناس ضعاف البصر (visually impaired).",
      "الـ <b>Natural-language systems</b> بتخلي الـ users يكتبوا أسئلة وبترد عليهم بردود نصية (text-based)، زي الـ chatbots."
     ]
    },
    {
     "h": "الـ Design implications للقراية والكلام والسماع",
     "pts": [
      "الـ menus والـ instructions اللي بالصوت (speech-based) لازم تبقى <b>قصيرة</b>.",
      "<b>نبرز الـ intonation</b> بتاع الأصوات المتولدة صناعياً: لأنها أصعب في الفهم من الأصوات البشرية.",
      "ندي فرص إن الـ user <b>يكبّر النص</b> على الشاشة."
     ]
    },
    {
     "h": "الـ Problem-solving والـ planning والـ reasoning والـ decision-making",
     "pts": [
      "كل العمليات دي فيها <b>reflective cognition</b>، زي إنك تفكر هتعمل إيه، وإيه الـ options، وإيه العواقب (consequences).",
      "غالباً بتبقى فيها عمليات واعية (conscious processes)، ونقاش مع الناس (أو مع نفسك)، واستخدام <b>artifacts</b>، زي الخرايط، والكتب، والورقة والقلم.",
      "ممكن تبقى فيها إنك تمشي في scenarios مختلفة وتقرر أنهي فيهم الـ option الأحسن.",
      "إنك توازن بين البدائل (Weighing up alternatives)."
     ]
    }
   ],
   "cards": [
    "إننا نفتكر أنواع مختلفة من المعرفة اللي بتخلي الناس تتصرف صح (زي إنك تتعرف على وش حد أو تفتكر اسمه).",
    "الأول encode، وبعدين retrieve للمعرفة.",
    "لأ. الـ memory فيها filtering و processing للحاجات اللي بنركز معاها.",
    "إحنا بنعمل recognize للحاجات أحسن بكتير من إننا نعملها recall.",
    "بنفتكر حاجات أقل عن الأشياء اللي صورناها عن لما بنشوفها بعينينا على طول.",
    "قد إيه المعلومة ممكن نعملها retrieve بعد كده. (الـ Context = فين، وإمتى، وإزاي، وهكذا؛ وممكن يبقى صعب تفتكر معلومة اتعملها encode في context مختلف.)",
    "جار إنت متعود تشوفه في طرقة العمارة بس سلّم عليك في القطر؛ وهو out of context بيبقى صعب تعرفه في الأول.",
    "الـ Visual cues: لون الحاجات، ومكان الأشياء، والعلامات اللي على أي حاجة.",
    "الـ Arbitrary material، زي أعياد الميلاد وأرقام التليفونات.",
    "نظرية بتقول إن الـ immediate memory capacity عند الناس محدودة جداً بـ 7, + or - 2؛ واتطبقت في الـ interaction design لما بنقرر هنعرض كام option.",
    "1) نقلل الـ cognitive load بإننا نبعد عن الـ procedures الطويلة والمعقدة 2) نشجع على الـ recognition بدل الـ recall 3) ندي طرق مختلفة لـ labelling الـ digital information (folders، categories، لون، flagging، time stamping).",
    "تجميع skills ومعرفة، وده بيعتمد على الـ memory.",
    "إنك تتعرف على وشوش الناس، أو إيه اللي عملته النهارده.",
    "المذاكرة لامتحان، أو إنك تتعلم تطبخ. والـ Intentional learning أصعب بكتير.",
    "الـ Multimedia، والـ animations، والـ VR.",
    "بالممارسة (by doing). وبيلاقوا صعوبة إنهم يتعلموا من إنهم يمشوا ورا instructions في manual.",
    "1) نشجع على الـ exploration 2) نقيّد ونوجّه اللي بيتعلموا (constrain and guide) 3) نعمل dynamic linking بين الـ concepts والـ representations عشان نسهّل تعلم الحاجات المعقدة.",
    "ناس كتير بتفضل السماع عن القراية؛ القراية ممكن تبقى أسرع من الكلام أو السماع؛ السماع محتاج cognitive effort أقل من القراية أو الكلام.",
    "بتخلي الـ users يتفاعلوا بإنهم يسألوا أسئلة، زي Google Voice و Siri و Alexa.",
    "بتستخدم speech متولد صناعياً، زي الـ written text-to-speech systems للناس ضعاف البصر.",
    "بتخلي الـ users يكتبوا أسئلة وبترد بردود نصية، زي الـ chatbots.",
    "1) menus و instructions بالصوت تكون قصيرة 2) نبرز الـ intonation بتاع الأصوات المتولدة صناعياً (أصعب في الفهم من الأصوات البشرية) 3) نسمح بتكبير النص على الشاشة.",
    "الـ Reflective cognition: إنك تفكر هتعمل إيه، وإيه الـ options، وإيه العواقب.",
    "الخرايط، والكتب، والورقة والقلم."
   ],
   "qa": [
    "الـ Memory معناها إننا نفتكر أنواع مختلفة من المعرفة اللي بتخلي الناس تتصرف صح، زي مثلاً إنك تتعرف على وش حد أو تفتكر اسمه. 1) إحنا الأول بنعمل encode للمعرفة وبعدين بنعملها retrieve. 2) إحنا مش بنفتكر كل حاجة: فيها filtering و processing للحاجات اللي بنركز معاها. 3) الـ Context مهم في طريقة ما بنفتكر بيها (فين، وإمتى، وإزاي، وهكذا). 4) إحنا بنعمل recognize للحاجات أحسن بكتير من إننا نعملها recall. 5) بنفتكر حاجات أقل عن الأشياء اللي صورناها عن لما بنشوفها بعينينا على طول (Henkel, 2014).",
    "الـ Context بيأثر على قد إيه المعلومة ممكن نعملها retrieve بعد كده، وممكن يبقى صعب تفتكر معلومة اتعملها encode في context مختلف. مثال: إنت في القطر وحد جه قالك hello؛ مش بتعرفه لثواني، وبعدين تكتشف إنه واحد من جيرانك. إنت متعود تشوفه في طرقة العمارة بس، فلما تشوفه out of context بيبقى صعب تعرفه في الأول.",
    "نظرية George Miller (1956) عن قد إيه معلومات الناس تقدر تفتكرها: الـ immediate memory capacity عند الناس محدودة جداً بـ 7, + or - 2. واتطبقت في الـ interaction design لما بنفكر هنعرض كام option. المحاضرة بتشكك في ده (\"The problem with the classic 7, + or - 2\"): هل ده استخدام كويس لنظرية في الـ HCI، وهل هي مفيدة؟ لما بنعمل interface، هل المفروض الـ designer يعرض 7 options بس في الـ menu، ويعرض 7 icons بس على الـ tool bar، وميحطش أكتر من 7 bullets في list، ويحط 7 items بس في الـ pull down menu، ويحط 7 tabs بس فوق في صفحة الموقع؟ (متقالة كأسئلة؛ السلايدز مش بتدي إجابة)",
    "1) نقلل الـ cognitive load بإننا نبعد عن الـ procedures الطويلة والمعقدة عشان نخلّص الـ tasks. 2) نصمم interfaces بتشجع على الـ recognition بدل الـ recall. 3) ندي الـ users طرق مختلفة لـ labelling الـ digital information عشان يساعدهم يعرفوها تاني بسهولة، زي الـ folders، والـ categories، واللون، والـ flagging، والـ time stamping.",
    "الـ Learning معناه تجميع skills ومعرفة، وده بيعتمد على الـ memory. فيه نوعين أساسيين: 1) الـ Incidental learning، زي إنك تتعرف على وشوش الناس، أو إيه اللي عملته النهارده. 2) الـ Intentional learning، زي المذاكرة لامتحان، أو إنك تتعلم تطبخ؛ وده أصعب بكتير، وفيه technologies كتير اتعملت عشان تساعد (multimedia، animations، VR). الناس بتلاقي صعوبة إنها تتعلم من إنها تمشي ورا instructions في manual وبتفضل تتعلم بالممارسة (learn by doing). الـ Design implications: 1) نصمم interfaces بتشجع على الـ exploration 2) نصمم interfaces بتقيّد وتوجّه اللي بيتعلموا (constrain and guide) 3) الـ Dynamically linking بين الـ concepts والـ representations ممكن يسهّل تعلم الحاجات المعقدة.",
    "السهولة اللي الناس بتقرا أو تسمع أو تتكلم بيها بتختلف: ناس كتير بتفضل السماع عن القراية؛ القراية ممكن تبقى أسرع من الكلام أو السماع؛ السماع محتاج cognitive effort أقل من القراية أو الكلام. الـ Applications: 1) الـ Voice user interfaces بتخلي الـ users يتفاعلوا بإنهم يسألوا أسئلة (Google Voice، Siri، Alexa) 2) الـ Speech-output systems بتستخدم speech متولد صناعياً (text-to-speech systems للناس ضعاف البصر) 3) الـ Natural-language systems بتخلي الـ users يكتبوا أسئلة وبترد بردود نصية (chatbots). الـ Design implications: 1) الـ menus والـ instructions اللي بالصوت لازم تبقى قصيرة 2) نبرز الـ intonation بتاع الأصوات المتولدة صناعياً، لأنها أصعب في الفهم من الأصوات البشرية 3) ندي فرص إن الـ user يكبّر النص على الشاشة.",
    "1) كل العمليات دي فيها reflective cognition، زي إنك تفكر هتعمل إيه، وإيه الـ options، وإيه العواقب. 2) غالباً بتبقى فيها عمليات واعية (conscious processes)، ونقاش مع الناس (أو مع نفسك)، واستخدام artifacts زي الخرايط، والكتب، والورقة والقلم. 3) ممكن تبقى فيها إنك تمشي في scenarios مختلفة وتقرر أنهي فيهم الـ option الأحسن. 4) إنك توازن بين البدائل (weighing up alternatives)."
   ],
   "quiz": [
    [
     "صح. السلايد بتقول إننا الأول بنعمل encode وبعدين retrieve للمعرفة (L4, Memory).",
     "الـ Weighing up alternatives تبع الـ problem-solving والـ planning والـ reasoning والـ decision-making، مش تبع خطوات الـ memory.",
     "الـ Learning by doing هو الطريقة اللي الناس بتفضل تتعلم بيها؛ مش أول خطوة في الـ memory.",
     "الـ Accentuating intonation ده design implication للأصوات المتولدة صناعياً، مش خطوة في الـ memory."
    ],
    [
     "السلايد بتقول العكس: إحنا مش بنفتكر كل حاجة، لأن الـ memory فيها filtering و processing للحاجات اللي بنركز معاها.",
     "صح. إحنا مش بنفتكر كل حاجة؛ الـ memory فيها filtering و processing للحاجات اللي بنركز معاها (L4, Memory)."
    ],
    [
     "ده عكس السلايد، اللي بتقول إننا بنعمل recognize للحاجات أحسن بكتير من الـ recall.",
     "صح. إحنا بنعمل recognize للحاجات أحسن بكتير من إننا نعملها recall (L4, Memory).",
     "أرقام التليفونات arbitrary material، والناس بتلاقيها أصعب في الحفظ من الـ visual cues زي اللون.",
     "الناس بتلاقي صعوبة إنها تتعلم من manual وبتفضل تتعلم بالممارسة (by doing)."
    ],
    [
     "دي نظرية George Miller (1956)، مش اللي لقاه Henkel.",
     "صح. السلايد بتنسب ده لـ Henkel, 2014 (L4, Memory).",
     "دي نقطة عن القراية والكلام والسماع، مش اللي لقاه Henkel.",
     "السلايدز بتقول إن الـ intentional learning أصعب بكتير، وده مش منسوب لـ Henkel."
    ],
    [
     "صح. إنت بتشوفه في طرقة العمارة بس، فلما يبقى out of context بيبقى صعب تعرفه في الأول (L4, Context is important).",
     "السلايدز بتدي أعياد الميلاد وأرقام التليفونات كأمثلة على الـ arbitrary material؛ أما التعرف على الوشوش فده مثال على الـ memory والـ incidental learning.",
     "حد Miller مش هو التفسير اللي اتقال؛ السلايد بتفسرها بالـ context.",
     "اللي لقاه Henkel عن التصوير ده نقطة منفصلة؛ مثال القطر عن الـ context."
    ],
    [
     "أعياد الميلاد متقالة كـ arbitrary material، والناس بتلاقيها أصعب في إنها تتعلمها وتفتكرها.",
     "أرقام التليفونات متقالة كـ arbitrary material، وده أصعب في الحفظ.",
     "صح. الناس شاطرة جداً في إنها تفتكر الـ visual cues زي لون الحاجات، ومكان الأشياء، والعلامات اللي على أي حاجة (L4, Activity: what is easy to remember).",
     "السلايدز بتقول إن الناس بتلاقي صعوبة إنها تتعلم من إنها تمشي ورا instructions في manual."
    ],
    [
     "السلايد بتقول 7, + or - 2، مش 5.",
     "صح. نظرية Miller بتقول إن الـ immediate memory capacity محدودة جداً بـ 7, + or - 2 (L4, The problem with the classic '7, + or - 2').",
     "السلايد بتقول 7, + or - 2، مش 9.",
     "السلايد بتقول 7, + or - 2، مش 10."
    ],
    [
     "صح. السلايد بتقول إنها اتطبقت في الـ interaction design لما بنفكر هنعرض كام option (L4, The problem with the classic '7, + or - 2').",
     "الـ Intonation بتاع الأصوات الصناعية ده design implication للـ speech، مش تطبيق لنظرية Miller.",
     "الـ Labelling (folders، categories، لون، flagging، time stamping) ده design implication للـ memory، مش تطبيق Miller.",
     "التشجيع على الـ exploration ده design implication للـ learning."
    ],
    [
     "ده عكس السلايد، اللي بتقول نشجع على الـ recognition بدل الـ recall.",
     "السلايد بتقول نقلل الـ cognitive load بإننا نبعد عن الـ procedures الطويلة والمعقدة.",
     "صح. السلايد بتذكر الـ folders، والـ categories، واللون، والـ flagging، والـ time stamping عشان تساعد الـ users يعرفوا المعلومة تاني (L4, Design implications for memory).",
     "الـ menus اللي بالصوت لازم تبقى قصيرة، وده implication للـ speech، مش للـ memory."
    ],
    [
     "أمثلة الـ Intentional learning هي المذاكرة لامتحان وإنك تتعلم تطبخ.",
     "صح. السلايد بتدي التعرف على وشوش الناس وإيه اللي عملته النهارده كأمثلة على الـ incidental learning (L4, Learning).",
     "كلمة Reflective بتتقال على الـ cognition في الـ problem-solving والـ decision-making، ومش نوع من أنواع الـ learning في السلايدز.",
     "الـ Arbitrary material (أعياد الميلاد، أرقام التليفونات) بتتكلم عن الحاجات الصعب نفتكرها، مش نوع learning."
    ],
    [
     "صح. السلايد بتقول إن الـ intentional learning أصعب بكتير (L4, Learning).",
     "السلايد بتقول صراحةً إن الـ intentional learning أصعب بكتير."
    ],
    [
     "السلايدز بتقول إن الناس بتلاقي صعوبة إنها تتعلم بالطريقة دي.",
     "صح. الناس بتفضل تتعلم بالممارسة (by doing) (L4, Learning).",
     "الـ Arbitrary material أصعب في إنك تتعلمه وتفتكره.",
     "الأصوات الصناعية أصعب في الفهم من الأصوات البشرية؛ ومش متقالة إنها الطريقة المفضلة للتعلم."
    ],
    [
     "دي واحدة من الـ design implications التلاتة للـ learning.",
     "دي واحدة من الـ design implications التلاتة للـ learning.",
     "دي واحدة من الـ design implications التلاتة للـ learning، عشان تسهّل تعلم الحاجات المعقدة.",
     "صح. تكبير النص ده design implication للقراية والكلام والسماع، مش للـ learning (L4, Design implications for reading, speaking, and listening)."
    ],
    [
     "السلايد بتقول إن السماع محتاج cognitive effort أقل من القراية أو الكلام.",
     "صح. السلايد بتقول إن القراية ممكن تبقى أسرع من الكلام أو السماع (L4, Reading, speaking, and listening).",
     "السلايد بتقول إن ناس كتير بتفضل السماع عن القراية.",
     "السلايد بتقول إن السهولة اللي الناس بتقرا أو تسمع أو تتكلم بيها بتختلف."
    ],
    [
     "أمثلة الـ Voice user interfaces هي Google Voice و Siri و Alexa.",
     "مثال الـ Speech-output هو الـ written text-to-speech systems للناس ضعاف البصر.",
     "صح. الـ Natural-language systems بتخلي الـ users يكتبوا أسئلة وبترد بردود نصية، زي الـ chatbots (L4, Applications).",
     "أمثلة الـ Labelling هي الـ folders، والـ categories، واللون، والـ flagging، والـ time stamping."
    ],
    [
     "صح. الـ Speech-output systems بتستخدم speech متولد صناعياً، زي الـ written text-to-speech systems للناس ضعاف البصر (L4, Applications).",
     "الـ Natural-language systems بتاخد أسئلة مكتوبة وبترد بردود نصية، زي الـ chatbots.",
     "الـ Voice user interfaces بتخلي الـ users يسألوا أسئلة، زي Google Voice و Siri و Alexa.",
     "أمثلة الـ Incidental learning هي التعرف على الوشوش وإيه اللي عملته النهارده."
    ],
    [
     "صح. ده السبب اللي السلايد بتقوله (L4, Design implications for reading, speaking, and listening).",
     "السلايد بتقول إن القراية ممكن تبقى أسرع من الكلام أو السماع؛ وده مش السبب اللي اتقال.",
     "الـ 7, + or - 2 بتاعة Miller عن كام option هنعرضهم، مش عن الـ intonation بتاع الكلام.",
     "التشجيع على الـ exploration ده design implication للـ learning."
    ],
    [
     "كلمة Incidental نوع من أنواع الـ learning في السلايدز، مش الـ cognition اللي العمليات دي فيها.",
     "صح. كل العمليات دي فيها reflective cognition، زي إنك تفكر هتعمل إيه، والـ options، والعواقب (L4, Problem-solving, planning, reasoning, and decision-making).",
     "كلمة Arbitrary بتتقال على الحاجات الصعب نفتكرها، زي أعياد الميلاد وأرقام التليفونات.",
     "الـ Visual cues عن الحاجات اللي الناس بتفتكرها كويس، مش الـ cognition بتاعة العمليات دي."
    ],
    [
     "دول أمثلة على الـ voice user interfaces.",
     "دول طرق للـ labelling بتاع الـ digital information (design implication للـ memory).",
     "صح. السلايد بتذكر الخرايط، والكتب، والورقة والقلم كـ artifacts (L4, Problem-solving, planning, reasoning, and decision-making).",
     "دي technologies اتعملت عشان تساعد في الـ intentional learning."
    ]
   ],
   "extra": []
  },
  "5": {
   "notes": [
    {
     "h": "فوايد الـ Secondary research",
     "pts": [
      "بيجاوب على أسئلة عن <b>قدرات الإنسان وحدوده</b>. مثال: تصمم لـ users عندهم color-blindness باستخدام حقائق عن عمى الألوان.",
      "بيجاوب على أسئلة عن <b>مجموعات users عندهم مشاكل مشتركة</b>. مثال: app لبلد فقير، الـ users فيه غالباً معاهم <b>أجهزة low-end</b>."
     ]
    },
    {
     "h": "أنواع الـ user research حسب إيه (WHAT)",
     "pts": [
      "الـ <b>Quantitative</b>: data طبيعتها <b>أرقام</b> (قياسات، عدّ). أسهل للـ engineers والناس الـ technical.",
      "الـ <b>Qualitative</b>: ملاحظات عن <b>ليه وإزاي</b> الحاجات بتحصل، وغالباً مبنية على interviews. أصعب على الناس الـ technical، بس هي اللي محتاجينها عشان نفهم بجد."
     ]
    },
    {
     "h": "Primary ضد secondary research"
    },
    {
     "h": "نصايح عامة للـ research methods",
     "pts": [
      "الـ User research لازم <b>يتخطط له من بدري</b>. لو interview، اكتب <b>script</b> بالأسئلة قبلها بدل ما تسأل أسئلة عشوائية.",
      "التخطيط مش معناه إنك تبقى ناشف: خليك flexible أثناء الـ activity (<b>الـ script مش كتاب مقدس</b>).",
      "الـ Methods مش بدايل لبعض. استخدم <b>combination</b> منهم بترتيب مناسب.",
      "الـ <b>Testing والـ iteration</b> بيحسّنوا أي technique.",
      "الـ <b>Privacy والـ security</b> بتاعة data الـ users حاجة أساسية."
     ]
    },
    {
     "h": "الـ Privacy والـ security",
     "pts": [
      "• اجمع بس الـ data اللي محتاجها.<br>• متربطش الـ data اللي جمعتها بـ PII أو SPII.<br>• ومتحتفظش بالـ data بعد ما متبقاش محتاجها.",
      "الـ <b>PII (Personally Identifiable Information)</b>: تفاصيل ممكن تعرّف بيها الـ user: <b>الأسامي، عنوان البيت، الـ email، رقم التليفون</b>.",
      "الـ <b>SPII (Sensitive PII)</b>: data لو ضاعت أو اتسرقت ممكن تعمل ضرر مالي أو إحراج أو تمييز: <b>الـ social security number، رخصة السواقة، أرقام الباسبور، أرقام الحسابات المالية، تاريخ الميلاد</b>."
     ]
    },
    {
     "h": "(1) الـ Surveys",
     "pts": [
      "ردود سريعة من <b>عدد كبير من الـ users</b> في وقت قصير (نظرة عامة واسعة). غالباً أونلاين وسهل تعملها. وهي من <b>أرخص</b> الطرق.",
      "ممكن تبقى خطوة أولى عشان تاخد insights عن الدوافع والتفضيلات والأولويات والـ pain points، عشان تخطط لأنشطة بعدها زي الـ interviews. وممكن كمان تيجي بعد interview أو usability study.",
      "نصايح:<br>• <b>خليها صغيرة على قد ما تقدر</b> (أسئلة كتير بتقلل الـ response rate والـ reliability)<br>• اسأل بس اللي محتاجه وهتستخدمه<br>• <b>خلي بالك من الـ bias</b><br>• وخد feedback من المشاركين عن الـ survey نفسه."
     ]
    }
   ],
   "cards": [
    "data أرقام: قياسات وعدّ. أسهل للناس الـ technical.",
    "ملاحظات عن ليه وإزاي الحاجات بتحصل، غالباً من interviews.",
    "الأسامي، عنوان البيت، الـ email، رقم التليفون.",
    "الـ SSN، رخصة السواقة، رقم الباسبور، أرقام الحسابات المالية، تاريخ الميلاد.",
    "specific لاحتياجاتك وإنت متحكم في الـ quality / بيكلّف أكتر وبياخد وقت أطول.",
    "رخيص وسريع / ممكن يكون قديم أوي أو مش specific كفاية.",
    "خطط من بدري، بس خليك flexible أثناء الـ activity.",
    "users كتير، وقت قصير، أونلاين، رخيص؛ نظرة عامة واسعة."
   ],
   "qa": [
    "الـ Primary إنت اللي بتجمعه (surveys، focus groups، interviews، observations، experiments)؛ specific لاحتياجاتك وإنت متحكم في الـ quality، بس بيكلّف أكتر وبياخد وقت أطول. الـ Secondary حد تاني جمعه (data موجودة زي الكتب والـ journals)؛ رخيص وسريع، بس ممكن يكون قديم أوي أو مش specific كفاية. والاتنين ممكن يبقوا qualitative أو quantitative.",
    "اجمع بس اللي محتاجه، متربطش الـ data اللي جمعتها بـ PII أو SPII، ومتسيبش الـ data متخزنة بعد ما متبقاش محتاجها.",
    "خطط من بدري (زي script للـ interview)؛ خليك flexible (الـ script مش كتاب مقدس)؛ اعمل combination من الـ methods بترتيب مناسب؛ حسّن بالـ testing والـ iteration؛ واحمي الـ privacy والـ security بتاعة data الـ users.",
    "خليها صغيرة على قد ما تقدر، لأن الأسئلة الكتير بتقلل الـ response rate والـ reliability. اسأل أقل عدد أسئلة للـ data اللي هتستخدمها. خلي بالك من الـ bias. وخد feedback من المشاركين عن الـ survey.",
    "الـ <b>Quantitative research</b>: فيه data طبيعتها أرقام، زي الـ measures والـ counts. أسهل على الـ engineers والناس الـ technical إنهم يتعاملوا معاه.<br>الـ <b>Qualitative research</b>: بيركّز على ملاحظات عن ليه وإزاي الحاجات بتحصل، وغالباً مبني على interviews. الـ Qualitative analysis أصعب على الناس الـ technical، بس هو اللي محتاجينه عشان نفهم بجد.",
    "الـ <b>PII</b> (Personally Identifiable Information): تفاصيل معينة ممكن تتستخدم عشان تعرّف الـ user، زي الأسامي، وعنوان البيت، والـ email address، ورقم التليفون.<br>الـ <b>SPII</b> (Sensitive Personally Identifiable Information): data لو ضاعت أو اتكشفت أو اتسرقت ممكن تسبب للـ users بتوعك ضرر مالي أو إحراج أو تمييز، زي الـ social security number، ورخصة السواقة، وأرقام الباسبور، وأرقام الحسابات المالية، وتاريخ الميلاد.",
    "الـ survey طريقة قوية إنك تجمع ردود سريعة في وقت قصير من عدد كبير من الـ users (<b>نظرة واسعة</b>).<br>1) غالباً بيتعمل أونلاين وسهل تعمله.<br>2) هو من <b>أرخص</b> methods الـ user research.<br>3) ممكن يبقى خطوة أولى عشان تجمع insights عامة عن دوافع الـ users وتفضيلاتهم وأولوياتهم والـ pain points بتاعتهم؛ ونتايجه بتساعد في التخطيط لأنشطة بعد كده زي الـ interviews.<br>4) وممكن كمان ييجي بعد activity تانية (interview أو usability study)، وتستخدم نتايج الـ method اللي قبله عشان تخطط للـ survey."
   ],
   "quiz": [
    [
     "الأسامي دي PII عادي: بتعرّف الـ user بس مش في لستة الـ sensitive. الـ SPII هي data لو ضاعت ممكن تسبب ضرر مالي أو إحراج أو تمييز (L5, Privacy and security).",
     "عنوان البيت متصنّف PII، مع الأسامي والـ email والتليفون. مش من أمثلة الـ SPII زي الـ SSN أو أرقام الحسابات المالية (L5, Privacy and security).",
     "الـ Email address ده PII عادي في لستة المحاضرة. الـ SPII بتشمل الـ SSN والـ driver's license والـ passport وأرقام الحسابات المالية وتاريخ الميلاد (L5, Privacy and security).",
     "صح. لو دول ضاعوا ممكن يحصل ضرر مالي."
    ],
    [
     "صح. الـ PII هي التفاصيل اللي ممكن تعرّف الـ user، وأمثلة المحاضرة هي الأسامي وعنوان البيت والـ email ورقم التليفون (L5, Privacy and security).",
     "الجملة صح: مطابقة لتعريف الـ PII في المحاضرة، والأسامي ورقم التليفون الاتنين من أمثلة الـ PII (L5, Privacy and security)."
    ],
    [
     "الـ data الرقمية (measures، counts) دي اللي بتعرّف الـ quantitative research. الـ Qualitative research هو ملاحظات عن ليه وإزاي الحاجات بتحصل (L5, Types by WHAT).",
     "صح. الـ Qualitative research عن ليه وإزاي، مش أرقام."
    ],
    [
     "الـ Quantitative data رقمية: measures وcounts. أوصاف اللي بنعملهم interview بتشرح ليه وإزاي، وده اللي بيخليها qualitative (L5, Types by WHAT).",
     "صح. الأوصاف والشروحات دي qualitative.",
     "الـ \"Average data\" مش نوع من أنواع الـ research data. حسب الـ WHAT، الـ research يا quantitative (أرقام) يا qualitative (ليه وإزاي) بس (L5, Types by WHAT).",
     "الـ \"Gathering data\" مش نوع data؛ الـ gathering يعني مجرد تجميع. الأوصاف اللي جاية من الـ interviews دي qualitative data (L5, Types by WHAT)."
    ],
    [
     "المحاضرة مخصّتش الـ designers. قالت إن الـ quantitative research (الرقمي) أسهل على الـ engineers والناس الـ technical (L5, Types by WHAT).",
     "صح. الـ Quantitative research رقمي (measures، counts)، فالمحاضرة بتقول إنه أسهل على الـ engineers والناس الـ technical؛ والـ qualitative أصعب عليهم (L5, Types by WHAT).",
     "الـ Marketing teams مش مذكورين. المحاضرة بتقول إن الـ quantitative research أسهل على الـ engineers والناس الـ technical (L5, Types by WHAT).",
     "الأطفال ملهمش أي علاقة بالنقطة دي. الـ Quantitative research متقال عليه إنه أسهل على الـ engineers والناس الـ technical (L5, Types by WHAT)."
    ],
    [
     "صح. الـ Privacy والـ security بتوع الـ user data حاجة أساسية: اجمع اللي محتاجه بس، متربطوش بـ PII/SPII، وامسحه لما متبقاش محتاجه (L5, General tips).",
     "الـ Privacy بتزوّد الحرص؛ مش بتسرّع الحاجات.",
     "العكس: الـ privacy guidelines بتحدد إنت بتجمع إيه، وبتفصله عن الـ PII/SPII، وبتمسحه بعد الاستخدام، فمفيش حاجة بتتنشر للعامة (L5, Privacy and security).",
     "الـ Privacy مش بديل لأي method؛ الـ interviews لسه بتستخدم. الـ Privacy مهمة عشان بتحمي الـ user data (L5, Privacy and security)."
    ],
    [
     "صح. خطط من بدري، بس الـ script مش كتاب مقدس.",
     "المحاضرة بتقول إن التخطيط مش معناه التشدد: \"the script is not a bible\"، فلازم تفضل flexible أثناء الـ session (L5, General tips).",
     "اعمل combination من الـ methods؛ الـ qualitative مطلوب عشان تفهم بجد.",
     "الـ Privacy والـ security بتوع الـ user data متصنفين إنهم essential، فعمرك ما تضحي بيهم عشان الراحة (L5, General tips)."
    ],
    [
     "المحاضرة بتقول خطط بدري واكتب script بالأسئلة بدل ما تسأل أسئلة عشوائية (L5, General tips).",
     "صح. الـ User research لازم يتخطط له بدري: للـ interview اكتب script بالأسئلة قبلها، وفي نفس الوقت خليك flexible لأن الـ script is not a bible (L5, General tips).",
     "تجاهل الـ context مش خطوة تحضير. نصيحة المحاضرة إنك تخطط بدري بـ script فيه الأسئلة (L5, General tips).",
     "الـ User research هدفه احتياجات الـ user والـ pain points بتاعته، مش التفاصيل الـ technical بس. خطوة التحضير هي كتابة script بالأسئلة (L5, General tips)."
    ],
    [
     "الـ Surveys من أرخص الطرق؛ الـ interviews أغلى.",
     "صح. الـ Interviews بتبقى synchronous وغالباً محتاجة incentives."
    ],
    [
     "الـ surveys الطويلة بتضر الـ response rate والـ reliability.",
     "صح. نصيحة الـ survey إنك تخليه صغير على قد ما تقدر، لأن الأسئلة الكتير بتقلل الـ response rate والـ reliability بتاعة الـ data (L5, Surveys)."
    ],
    [
     "أسئلة أكتر يعني data أكتر تتعالج، فالـ analysis بيبقى أبطأ. التأثير الحقيقي هو response rate أقل وdata أقل reliability (L5, Surveys).",
     "الأسئلة الزيادة مش بتزود الدقة: اللي بيجاوب بيتعب فبيجاوب أوحش، وده بيقلل الـ reliability. عشان كده الـ surveys لازم تبقى صغيرة على قد ما تقدر (L5, Surveys).",
     "الـ surveys الطويلة بتتعب اللي بيجاوبوا، فناس أقل بتكمّلها. المحاضرة بتقول إن الأسئلة الكتير بتقلل الـ response rate (L5, Surveys).",
     "صح. المحاضرة بتحذّر إن الأسئلة الكتير بتقلل الـ response rate وبتأثر على الـ reliability، فخلي الـ survey صغير على قد ما تقدر (L5, Surveys)."
    ],
    [
     "الـ focus group ده primary research، بس هو مناقشة جماعية بتدّي أوصاف وآراء؛ والـ research اللي مبني على الـ interviews بيبقى <b>qualitative</b> (L5, Types of user research by What).",
     "إنك تقرا reports نشرها حد تاني ده <b>secondary</b> research، مش primary (L2, Types of user research by Who).",
     "الـ Interviews دي primary research، بس الـ qualitative research \"often based on interviews\"، فده <b>qualitative</b> مش quantitative (L5, Types of user research by What).",
     "صح. الـ Quantitative research فيه data of numeric nature، زي الـ measures والـ counts؛ ولما تجمعها بنفسك يبقى primary research (L5, Types of user research by What)."
    ],
    [
     "الكورس بيقول إن الـ secondary data ممكن تكون قديمة أوي و/أو مش specific كفاية، أما في الـ primary research فإنت اللي بتتحكم في الـ quality (L5, Primary vs secondary research).",
     "المحاضرة بتقارن بينهم: الـ primary إنت اللي بتجمعه، والـ secondary حد تاني جمعه، ولكل واحد مميزات وعيوب مختلفة (L5, Primary vs secondary research).",
     "صح. الـ Primary data إنت اللي بتجمعها (surveys، interviews، observations، experiments)، أما الـ secondary research فمعناه إنك بتدوّر على <b>existing data</b> حد تاني جمعها (L5, Primary vs secondary research).",
     "العكس: الـ primary research غالباً بيكلّف أكتر وبياخد وقت أطول، والـ secondary research غالباً رخيص وسريع (L5, Primary vs secondary research)."
    ],
    [
     "صح. الـ Surveys طريقة قوية تجمع بيها ردود سريعة في وقت قصير من <b>عدد كبير من الـ users</b> (نظرة عامة واسعة) (L5, Surveys).",
     "الإجابات على الأسئلة ممكن يبقى فيها recall bias و reporting bias، يعني الناس تدّي إجابات مثالية أكتر من الواقع (L7, Challenges of data gathered by asking questions).",
     "الكورس بيوصف الـ secondary research إنه هو اللي \"usually cheap and quick\"؛ والـ survey ده primary research، اللي غالباً بيكلّف أكتر وبياخد وقت أطول (L5, Primary vs secondary research).",
     "الـ methods مش بدايل لبعض: استخدم combination منهم بترتيب مناسب، ونتايج الـ survey بتساعد تخطط للأنشطة اللي بعده زي الـ interviews (L5, General tips; Surveys)."
    ],
    [
     "مش مصطلح الكورس. المحاضرة كاتبة الـ PII كـ Personally Identifiable Information: تفاصيل معينة ممكن تتستخدم عشان تعرف الـ user مين (L5, Privacy and security).",
     "مش مصطلح الكورس. الـ PII هي Personally Identifiable Information، زي الأسامي وعنوان البيت والـ email address ورقم التليفون (L5, Privacy and security).",
     "قريب بس مش المصطلح بالظبط: هي <b>Personally Identifiable</b> Information، يعني تفاصيل <b>ممكن</b> تتستخدم عشان تعرف الـ user مين (L5, Privacy and security).",
     "صح. الـ PII هي <b>Personally Identifiable Information</b>: تفاصيل معينة ممكن تتستخدم عشان تعرف الـ user مين، زي الأسامي وعنوان البيت والـ email address ورقم التليفون (L5, Privacy and security)."
    ],
    [
     "صح. رقم التليفون وعنوان البيت والـ email address كلهم في لستة الـ PII اللي في المحاضرة: تفاصيل معينة ممكن تتستخدم عشان تعرف الـ user مين (L5, Privacy and security).",
     "رقم التليفون PII، بس مش هو الوحيد هنا: عنوان البيت والـ email address كمان في لستة الـ PII، فالإجابة الكاملة \"All of the following\" (L5, Privacy and security).",
     "عنوان البيت PII، بس رقم التليفون والـ email address كمان PII، فالاختيار ده لوحده ناقص (L5, Privacy and security).",
     "الـ email address ده PII، بس كمان رقم التليفون وعنوان البيت، فالإجابة الكاملة \"All of the following\" (L5, Privacy and security)."
    ],
    [
     "صح. الميزة الأساسية للـ secondary research إنه <b>غالباً رخيص وسريع</b>؛ لو المعلومة موجودة، بيوفّر مجهود ووقت ضخم (L5, Primary vs secondary research; L2, Secondary research).",
     "إنه يكون specific لاحتياجاتك دي ميزة الـ <b>primary</b> research؛ الـ secondary data ممكن تكون مش specific كفاية (L5, Primary vs secondary research).",
     "الكورس بيقول إن الـ secondary data ممكن تكون قديمة أوي و/أو مش specific كفاية، أما في الـ primary research فإنت اللي بتتحكم في الـ quality (L5, Primary vs secondary research).",
     "الـ Secondary research بيدعم (backs up) نتايج الـ primary research؛ مش بيحل محلها (L2, Secondary research). والـ methods المفروض تتجمع مع بعض، مش تتستخدم كبدايل (L5, General tips)."
    ],
    [
     "مش مصطلح الكورس. الـ S معناها <b>Sensitive</b>: data لو ضاعت أو اتسرقت ممكن تسبب ضرر مادي أو إحراج أو تمييز (L5, Privacy and security).",
     "مش مصطلح الكورس. الـ SPII عن الـ data الشخصية بتاعة الـ users زي رقم الـ social security ورقم الـ passport، مش system infrastructure (L5, Privacy and security).",
     "مش مصطلح الكورس. الـ SPII هي Sensitive Personally Identifiable Information، نوع من data الـ user، مش index (L5, Privacy and security).",
     "صح. الـ SPII هي <b>Sensitive Personally Identifiable Information</b>: data لو ضاعت أو اتكشفت (compromised) أو اتسرقت، ممكن تسبب للـ users ضرر مادي أو إحراج أو تمييز (L5, Privacy and security)."
    ],
    [
     "صح. الـ Surveys غالباً بتتعمل online وبتجمع ردود سريعة في وقت قصير من <b>عدد كبير من الـ users</b> (نظرة عامة واسعة) (L5, Surveys).",
     "الـ data بتاعة الـ survey بتتجمع عشان تتستخدم: الكورس بيقول اسأل بس أقل عدد من الأسئلة يجيب الـ data اللي محتاجها وعارف إنك هتستخدمها (L5, Tips for a good survey design).",
     "الـ methods مش بدايل لبعض؛ استخدم combination. والـ Surveys غالباً بتساعد تخطط لأنشطة qualitative بعدها زي الـ interviews (L5, General tips; Surveys).",
     "الكورس بيقول العكس عن طريقة إنك تسأل أسئلة: الإجابات ممكن يبقى فيها recall bias و reporting bias، والحل إنك تجمعها مع الـ usability studies والـ observation (L7, Challenges of data gathered by asking questions)."
    ],
    [
     "صح. الـ SPII هي data لو ضاعت أو اتكشفت (compromised) أو اتسرقت ممكن تسبب للـ users <b>ضرر مادي أو إحراج أو تمييز</b>، فمحتاجة حماية زيادة عن الـ PII العادية (L5, Privacy and security).",
     "الكورس بيعرّف الـ SPII بالضرر اللي ممكن تسببه لو ضاعت أو اتسرقت، مش بأي استخدام في الـ marketing (L5, Privacy and security).",
     "الـ SPII هي data شخصية: رقم الـ social security، والـ driver's license، وأرقام الـ passport، وأرقام الحسابات المالية، وتاريخ الميلاد (L5, Privacy and security).",
     "العكس: ضياع الـ SPII ممكن يسبب ضرر مادي أو إحراج أو تمييز، والكورس بيقول متربطش الـ data اللي جمعتها بالـ PII والـ SPII (L5, Privacy and security)."
    ],
    [
     "توفير الوقت والتكلفة ده ميزة الـ <b>secondary</b> research (غالباً رخيص وسريع)؛ الـ primary research غالباً بيكلّف أكتر وبياخد وقت أطول (L5, Primary vs secondary research).",
     "صح. الـ Primary research إنت اللي بتعمله مع الـ users بتوعك (interviews، surveys، observations)، فهو <b>specific لاحتياجاتك وإنت اللي بتتحكم في الـ quality</b> (L5, Primary vs secondary research).",
     "مفيش حاجة في الكورس بتقول كده؛ الـ secondary research متنصوح بيه، خصوصاً في أول المشروع (L2, Secondary research).",
     "الكورس بيقول إن الـ secondary research قيّم: غالباً بيعمله researchers عندهم خبرة في organizations موثوقة، وبيدعم نتايج الـ primary. نقطة ضعفه إن الـ data ممكن تكون قديمة أوي أو مش specific كفاية (L2, Secondary research; L5, Primary vs secondary research)."
    ],
    [
     "الكورس مقالش إن الـ primary research دايماً biased؛ بالعكس، من مميزاته إنك إنت اللي بتتحكم في الـ quality (L5, Primary vs secondary research).",
     "العكس: من أهم مميزات الـ primary research إنه <b>specific لاحتياجاتك</b> (L5, Primary vs secondary research).",
     "صح. العيب الأساسي للـ primary research إنه <b>غالباً بيكلّف أكتر وبياخد وقت أطول</b> (L5, Primary vs secondary research).",
     "إن الـ data ممكن تكون قديمة أوي ده عيب الـ <b>secondary</b> research، مش الـ primary (L5, Primary vs secondary research)."
    ],
    [
     "الحسابات بتشتغل على أرقام، وده <b>quantitative</b> research (data of numeric nature، measures و counts) (L5, Types of user research by What).",
     "صح. الـ Qualitative research \"focuses on <b>observations</b> about why and how things happen\" وهو \"often based on <b>interviews</b>\" (L5, Types of user research by What).",
     "الـ usage data اللي بتتسجل (logged)، زي الـ counts اللي Microsoft جمعتها عن طريق الـ CEIP، دي أرقام، فهي quantitative مش qualitative (L5, Types of user research by What; L1, CEIP).",
     "الـ Numeric ratings دي data of numeric nature، وده quantitative research (L5, Types of user research by What)."
    ],
    [
     "الـ Observations عن ليه وإزاي الحاجات بتحصل دي بتوصف الـ <b>qualitative</b> research (L5, Types of user research by What).",
     "صح. الـ Quantitative research \"involves <b>data of numeric nature</b>. Examples: measures and counts\" (L5, Types of user research by What).",
     "نص الـ interviews ده qualitative data؛ الـ qualitative research \"often based on interviews\" (L5, Types of user research by What).",
     "الـ User stories وصفية مش أرقام، والمحاضرة بتعرّف الـ quantitative data إنها measures و counts (L5, Types of user research by What)."
    ],
    [
     "الـ Measures والـ counts هما أمثلة المحاضرة للـ <b>quantitative</b> research (L5, Types of user research by What).",
     "الـ Automated analytics بتطلّع data أرقام، وده quantitative research مش qualitative (L5, Types of user research by What).",
     "الـ data الأرقام بتوصف الـ quantitative research؛ الـ qualitative research عن ليه وإزاي الحاجات بتحصل (L5, Types of user research by What).",
     "صح. الـ Qualitative research \"focuses on <b>observations about why and how things happen</b>\"، وغالباً مبني على الـ interviews (L5, Types of user research by What)."
    ],
    [
     "صح. من الـ general tips: \"Testing and iteration is your way to <b>improve any technique</b>\" (L5, General tips for research methods).",
     "الـ User research عن إنك تشرك الـ users وتشتغل معاهم بدل ما تخمّن؛ والـ testing والـ iteration مش بيقللوا ده (L2, User-centered design; L5, General tips).",
     "الـ tips بتقول العكس: الـ methods مش بدايل لبعض، فـ \"use a combination of methods in a relevant order\" (L5, General tips for research methods).",
     "الـ Planning ahead \"does not mean to be strict\"؛ الـ flexibility مطلوبة و\"the script is not bible\" (L5, General tips for research methods)."
    ],
    [
     "المحاضرة بتقول العكس: الـ methods مش بدايل لبعض، فالمفروض تستخدم combination منهم (L5, General tips for research methods).",
     "صح. المحاضرة بتقول إن الـ methods المختلفة مش بدايل لبعض في one-step process: <b>use a combination of methods in a relevant order</b> (L5, General tips for research methods).",
     "النصيحة بتقول إن الـ combination لازم يكون بـ <b>relevant order</b>، وإن الـ research لازم يتخطط له من بدري، مش عشوائي (L5, General tips for research methods).",
     "ده بالظبط اللي الـ slide بترفضه: \"Different methods are not alternatives in a one step process\" (L5, General tips for research methods)."
    ],
    [
     "صح. المحاضرة بتقول خلّي الـ survey صغير على قد ما تقدر لأن <b>الأسئلة الكتير بتأثر على الـ response rate وعلى الـ reliability بتاعة الـ data</b>؛ اسأل أقل عدد من الأسئلة محتاجه (L5, Tips for a good survey design).",
     "الـ survey القصير أسهل في إنك تكمّله، مش أصعب. الفكرة من إنه يفضل صغير إنك تحافظ على الـ response rate (L5, Tips for a good survey design).",
     "العكس: النصيحة إنك تسأل أقل عدد من الأسئلة يجيب الـ data اللي محتاجها وعارف إنك هتستخدمها (L5, Tips for a good survey design).",
     "إنه يفضل قصير الهدف منه إجابات واضحة و reliable. ولخبطة اللي بيجاوبوا ضد principles الـ L6 اللي هي Be Clear و Be Concise (L6, Be Clear / Be Concise)."
    ],
    [
     "المحاضرة بتقول العكس: الـ planning ahead مش معناه إنك تبقى strict، لأن <b>\"script is not a bible\"</b> (L5, General tips for research methods).",
     "المحاضرة بتذكر الاتنين: اعمل plan من بدري، وكمان \"testing and iteration is your way to improve any technique\". الـ Planning مش بيحل محل الـ iteration (L5, General tips for research methods).",
     "صح. \"Planning ahead does not mean to be strict, <b>flexibility is required during the activity</b> (script is not bible)\" (L5, General tips for research methods).",
     "غلط: الـ slide بتقول إن الـ flexibility مطلوبة أثناء الـ activity، فإنت بتتأقلم حسب الحاجة (L5, General tips for research methods)."
    ],
    [
     "صح. جدول الـ primary vs secondary بيذكر إن الميزة الأساسية للـ secondary research إنه <b>غالباً رخيص وسريع</b> (L5, The difference between Primary and Secondary Research).",
     "الـ Secondary research بيستخدم data موجودة حد تاني جمعها (\"looking for existing data\")، فمش بيدّي data جديدة (L5, Primary vs secondary table).",
     "التكلفة دي عيب الـ primary research (\"usually costs more and takes longer\"). الـ Secondary research غالباً رخيص (L5, Primary vs secondary table).",
     "إنه ياخد وقت أطول ده العيب الأساسي للـ primary research. الـ Secondary research سريع وبيوفّر مجهود ووقت ضخم (L5 table; L2, Secondary Research)."
    ],
    [
     "صح. في جدول المقارنة، الـ primary data <b>إنت اللي بتجمعها</b> (surveys، focus groups، interviews، observations، experiments)، أما الـ secondary research معناه <b>إنك تدور على data موجودة</b> حد تاني جمعها (L5, Primary vs secondary table).",
     "الجملة مطابقة للمحاضرة: الـ primary research هو research إنت بتعمله بنفسك، والـ secondary research هو research حد تاني عمله، وبيستخدم data موجودة (L2, Types of user research based on Who; L5 table)."
    ],
    [
     "صح. في جدول الـ primary vs secondary، العيب الأساسي للـ primary research إنه <b>غالباً بيكلّف أكتر وبياخد وقت أطول</b>، أما الـ secondary research فغالباً رخيص وسريع (L5, Primary vs secondary research).",
     "جدول المحاضرة بيقول العكس: الـ primary research غالباً بيكلّف أكتر وبياخد وقت أطول، والـ secondary research <b>غالباً رخيص وسريع</b> (L5, Primary vs secondary research)."
    ],
    [
     "صح. جدول الـ primary vs secondary بيقول إن الفايدة الأساسية للـ secondary research إنه <b>غالباً رخيص وسريع</b>، والعيب الأساسي للـ primary research إنه غالباً بيكلّف أكتر وبياخد وقت أطول (L5, Primary vs secondary research).",
     "الجدول بيقول إن الـ secondary research غالباً رخيص وسريع، والـ primary research <b>غالباً بيكلّف أكتر وبياخد وقت أطول</b> (L5, Primary vs secondary research). والـ L2 كمان بتقول إن معلومات الـ secondary الموجودة بتوفر مجهود ووقت كبير جداً."
    ]
   ],
   "extra": [
    [
     "الـ Social security number ده Sensitive PII، لأن ضياعه ممكن يسبب ضرر مالي. الحاجات اللي PII بس هي الأسامي وعنوان البيت والـ email والتليفون (L5, Privacy and security).",
     "صح. الـ Email address مذكور تحت الـ PII (مع الأسامي وعنوان البيت ورقم التليفون)، مش تحت الـ SPII.",
     "أرقام الـ Passport في لستة الـ SPII، يعني data لو ضاعت ممكن تسبب ضرر أو تمييز. الـ Email address هو الاختيار اللي PII عادي (L5, Privacy and security).",
     "تاريخ الميلاد مذكور كـ Sensitive PII."
    ],
    [
     "ده post-launch research، مش اللي حقائق عمى الألوان بتقولهولك.",
     "الـ survey بتاع الفريق نفسه يبقى primary research.",
     "صح. المحاضرة بتدي التصميم لـ users عندهم color-blindness كمثال على secondary research عن قدرات الإنسان وحدوده.",
     "قراية حقائق منشورة عن عمى الألوان مبتجمعش أي user data خالص."
    ],
    [
     "ده عيب الـ primary research؛ الـ secondary غالباً رخيص وسريع.",
     "دي ميزة الـ primary research.",
     "الجدول بيقول إن الـ secondary research ممكن يبقى qualitative أو quantitative.",
     "صح. ده العيب الأساسي للـ secondary research في الجدول."
    ],
    [
     "جدول primary vs secondary بيقول إن الاتنين ممكن يبقوا qualitative أو quantitative. الـ Interviews مثلاً primary وqualitative (L5, Primary vs secondary).",
     "صح. الـ primary والـ secondary research الاتنين ممكن يبقوا qualitative أو quantitative."
    ],
    [
     "صح. الـ Surveys بتدي ردود سريعة من users كتير في وقت قصير، وهي من أرخص الطرق.",
     "الـ Interviews بتاخد وقت أكتر بكتير لكل user وبتكلّف أكتر.",
     "ده بطيء ومينفعش يوصل لعدد كبير من الـ users بسرعة.",
     "الـ group interviews برضه بتاخد وقت أكتر بكتير لكل مشارك من الـ survey."
    ],
    [
     "دي ميزة الـ secondary research.",
     "صح. دي الميزة الأساسية للـ primary research في الجدول.",
     "ده وصف الـ secondary research (بتدوّر على data موجودة).",
     "المحاضرة بتقول إن الـ user research لازم يتخطط له من بدري."
    ],
    [
     "المحاضرة بتقول إن الـ methods مش بدايل.",
     "صح. الـ Methods مش بدايل لبعض؛ استخدم <b>combination</b> منهم بترتيب مناسب."
    ],
    [
     "الـ \"Only collect the data you need\" دي أول privacy guideline، فهي مش الإجابة (L5, Privacy and security).",
     "الـ \"Do not associate collected data with PII or SPII\" واحدة من الـ privacy guidelines التلاتة، فهي مش الإجابة (L5, Privacy and security).",
     "صح. ده بيكسر قاعدة \"متحتفظش بالـ data بعد ما متبقاش محتاجها\".",
     "الـ \"Do not keep data after you no longer need it\" دي guideline حقيقية. الاختيار اللي بيكسرها، إنك تحتفظ بالـ data على طول، هو الإجابة (L5, Privacy and security)."
    ],
    [
     "صح. الـ Surveys ممكن تبقى خطوة أولى عشان تخطط للـ interviews، وممكن كمان تيجي بعد interview أو usability study.",
     "المحاضرة بتقول صراحةً إن الـ survey ممكن كمان تيجي بعد interview أو usability study."
    ],
    [
     "المشكلة مش في اختيار الـ methods، المشكلة في الـ data اللي بتتجمع.",
     "دي نصيحة عامة، بس مش هي اللي الـ survey ده كاسرها.",
     "النصيحة دي عن تحسين الـ survey، مش عن إيه الـ data اللي تتجمع.",
     "صح. الـ survey بيطلب PII عمره ما هيستخدمه، فبيكسر نصيحة الـ survey وقاعدة الـ privacy الاتنين."
    ]
   ]
  },
  "6": {
   "notes": [
    {
     "h": "6 مبادئ: Clear · Concise · Specific · Expressive · Unbiased · Usable",
     "pts": [
      "كل مبدأ ليه أمثلة \"متسألش كده… / اسأل كده بدلها…\". والممتحنين كتير بيطلبوا منك تقيّم سؤال بيها."
     ]
    },
    {
     "h": "Be Clear (خليك واضح)",
     "pts": [
      "<b>اكتب labels للـ numeric scales</b>: مش \"1–5\" وخلاص، لكن \"1 = Highly dissatisfied … 5 = Highly satisfied\".",
      "<b>تجنب الـ ranges اللي بتتداخل</b>، زي:<span class=\"ltr\">0-2, 2-5, 5-10</span>دول متداخلين. واستخدم بدلهم:<span class=\"ltr\">0-2, 3-5, 6-10, 11-19, 20+</span>",
      "<b>لو شاكك، زوّد تفاصيل</b>: \"tablet computer (يعني أي كمبيوتر بـ touchscreen و keyboard بيتفك)\".",
      "<b>حط إطار زمني (timebox) لأسئلة التكرار</b>: بدل \"Never / Rarely / Often…\"، اسأل \"في آخر 7 أيام، اتمرنت كام مرة؟\" والاختيارات: 0 و 1-2 و 3-4 و 5-7 و \"7 أو أكتر\"."
     ]
    },
    {
     "h": "Be Concise (خليك مختصر)",
     "pts": [
      "<b>لغة بسيطة</b>: \"What was the overall level of cleanliness that you observed within the car?\" تبقى \"How clean was the car?\""
     ]
    },
    {
     "h": "Be Specific (خليك محدد)",
     "pts": [
      "<b>تجنب الأفكار الكبيرة أوي</b>: \"How satisfied were you with the interface?\" تبقى \"…with how quickly the interface responded?\" ومعاها follow-up questions.",
      "<b>تجنب الـ double-barrel questions</b> (حاجتين في سؤال واحد): \"speed and availability of your connection\" المفروض تتقسم لسؤالين.",
      "<b>تجنب التعارض الداخلي (internal conflict)</b>: \"How satisfied with your food?\" المفروض تتقسم لـ temperature و appearance و flavor."
     ]
    },
    {
     "h": "Be Expressive (خلّي الـ user يعبّر)",
     "pts": [
      "<b>ركّز على رأي الـ user</b>: \"Is our price too high?\" تبقى \"Do you feel our price is too high, too low, or about right?\"",
      "<b>استخدم ranges بدل yes/no</b>: \"Do you use social media?\" تبقى \"في آخر 7 أيام، قضيت قد إيه على الـ social media؟ 0 / &lt;1 / 1-2 / 3-5 / 6-9 / 10+ ساعات\".",
      "<b>ادّي مستويات للتكرار أو الموافقة</b>: satisfaction scale من 5 مستويات بدل Dissatisfied/Satisfied.",
      "<b>اسمح بأكتر من اختيار</b> لما ينفع (checkboxes بدل radio buttons)."
     ]
    },
    {
     "h": "Be Unbiased (خليك محايد)",
     "pts": [
      "<b>اسمح للـ users يضيفوا nominal categories</b>: ضيف \"Other: ____\".",
      "<b>سيب الأسئلة المفتوحة مفتوحة</b>: \"Why did you choose our service?\" متجبرهوش على options ثابتة.",
      "<b>تجنب الـ leading questions</b>: \"Did our brand-new AI-based interface generate better recommendations?\" تبقى \"How satisfied were you with the recommendations?\"",
      "<b>تجنب الـ loaded questions</b>: \"how much time have you <i>wasted</i> on social media?\" تبقى \"…<i>spent</i>…\"."
     ]
    },
    {
     "h": "Be Usable (خلّي الـ survey سهل الاستخدام)",
     "pts": [
      "• حط <b>progress bar</b>.<br>• خلي <b>أطوال الصفحات ثابتة</b>.<br>• <b>رتّب الأسئلة بشكل منطقي</b>.<br>• <b>نبّه الـ users على الأسئلة اللي متجاوبتش</b>.<br>• و<b>اعمل preview للـ survey بنفسك</b>."
     ]
    },
    {
     "h": "تمرين: قيّم أسئلة الـ survey دي",
     "pts": [
      "السؤال \"On a scale of 1 to 4 with 1 meaning 'a lot' and 4 meaning 'not at all', how much do you enjoy exercising?\" ده <b>scale مش واضح / معكوس</b>.",
      "السؤال \"Why do you like to exercise?\" ده <b>leading question</b> لأنه بيفترض إنك بتحبه.",
      "السؤال \"On a scale of 1 to 6 with 1 meaning 'not at all'…\" فيه <b>عدد options بيتغير</b> (4 ضد 6) و<b>scale معكوس</b> مقارنة بالسؤال اللي قبله.",
      "السؤال \"Have you listened to an audiobook this year?\" ده <b>سؤال yes/no</b>. استخدم ranges."
     ]
    }
   ],
   "cards": [
    "Be Clear، Concise، Specific، Expressive، Unbiased، Usable.",
    "بيسأل عن حاجتين في نفس الوقت، زي \"speed and availability\". قسّمه (Be Specific).",
    "بيزقّ الـ user ناحية إجابة معينة (\"our brand-new AI interface…\"). الحل: صياغة محايدة (Be Unbiased).",
    "فيه كلمة فيها حكم (\"wasted\"). الحل: كلمة محايدة (\"spent\").",
    "0-2، 3-5، 6-10، 11-19، 20+ (Be Clear).",
    "اسأل بـ ranges (Be Expressive): \"In the past 7 days, how much time…\".",
    "ضيف option \"Other: ___\" (Be Unbiased).",
    "Progress bar، أطوال صفحات ثابتة، ترتيب منطقي، تنبيه على اللي متجاوبش، preview بنفسك.",
    "\"In the past seven days, how many times…\" بدل \"Rarely/Often\" (Be Clear)."
   ],
   "qa": [
    "Be Clear (labels للـ scales، من غير ranges متداخلة، تفاصيل زيادة، timebox للتكرار)؛ Be Concise (لغة بسيطة: \"How clean was the car?\")؛ Be Specific (من غير أفكار كبيرة أوي، من غير double-barrel، من غير internal conflict)؛ Be Expressive (ركّز على الآراء، ranges بدل yes/no، مستويات موافقة، أكتر من اختيار)؛ Be Unbiased (ضيف \"Other\"، سيب الأسئلة المفتوحة مفتوحة، تجنب الكلمات الـ leading والـ loaded)؛ Be Usable (progress bar، صفحات ثابتة، ترتيب منطقي، تنبيه على اللي متجاوبش، preview).",
    "ده loaded question: كلمة \"wasted\" فيها حكم على اللي بيجاوب. اسأل \"…how much time have you spent on social media?\"",
    "ده سؤال yes/no بيدّي معلومات قليلة. استخدم ranges: \"In the past seven days, how much time have you spent on social media? 0 / &lt;1 / 1-2 / 3-5 / 6-9 / 10+ hours\".",
    "ده double-barrel question: بيسأل عن حاجتين. قسّمه لسؤال عن الـ speed وسؤال عن الـ availability."
   ],
   "quiz": [
    [
     "الـ Overlapping ranges (زي 0-2، 2-5) دي rule من Be Clear عن اختيارات الإجابة الرقمية. السؤال ده مفيهوش ranges خالص؛ هو بيجمع الـ speed والـ availability في سؤال واحد (L6, Be Specific).",
     "صح. بيسأل عن حاجتين في نفس الوقت، فقسّمه.",
     "السماح بـ multiple selections (checkboxes) دي نصيحة من Be Expressive عن الـ answer controls. العيب هنا إنه بيسأل عن حاجتين مرة واحدة، الـ speed والـ availability (L6, Be Specific).",
     "ده عن الـ usability بتاعة الـ survey، مش عن السؤال ده."
    ],
    [
     "صح. كلمة \"Wasted\" فيها حكم. استخدم \"spent\".",
     "الـ double-barrel question بيسأل عن حاجتين في نفس الوقت. ده بيسأل عن حاجة واحدة، الوقت على الـ social media؛ المشكلة في كلمة الحكم \"wasted\" (L6, Be Unbiased).",
     "كونه open-ended مش هي المشكلة؛ المحاضرة نفسها بتقول سيب الأسئلة المفتوحة مفتوحة. العيب هو الكلمة الـ loaded \"wasted\" (L6, Be Unbiased).",
     "الـ Timeboxing حاجة كويسة؛ المشكلة في اختيار الكلمة."
    ],
    [
     "الـ ranges دي بتشترك في حدودها: الـ 2 و5 و10 و20 كل واحد فيهم واقع في range-ين، فاللي إجابته 5 بالظبط عنده اختيارين صح (L6, Be Clear).",
     "صح. كل قيمة تبع range واحد بس.",
     "الـ 5 والـ 10 كل واحد فيهم ظاهر في range-ين (0-5 و5-10، و5-10 و10+)، يعني الـ ranges متداخلة، وده اللي Be Clear بيقول تبعد عنه (L6, Be Clear).",
     "الـ Some / Many / A lot دي كلمات مبهمة من غير أرقام، فهي مش ranges أصلاً، وكل واحد بيفهمها بشكل مختلف (L6, Be Clear)."
    ],
    [
     "الموضوع عن العدل مع كل الإجابات، مش عن الاختصار.",
     "صح. بيسمح للـ users يضيفوا nominal categories.",
     "الـ Usable بيغطي الـ progress bars والترتيب والحاجات دي.",
     "الـ Be Clear بيغطي إنك تعمل label للـ scales، وranges مش متداخلة، وتفاصيل زيادة، والـ timeboxing. إضافة \"Other: ____\" بتخلي الـ users يضيفوا nominal categories، ودي rule من Be Unbiased (L6, Be Unbiased)."
    ],
    [
     "مش yes/no: كلمة \"why\" بتستدعي إجابة مفتوحة. العيب إنه مفترض إنك بتحب الرياضة، وده بيخليه leading (L6, Exercise).",
     "صح. بيفترض إن الشخص بيحب التمرين.",
     "الـ Overlapping ranges بتنطبق بس على اختيارات الإجابة الرقمية، والسؤال ده مفيهوش. عيبه إنه مفترض إن الشخص بيحب الرياضة (L6, Exercise).",
     "إنه قصير ده حاجة كويسة (Be Concise). المشكلة إنه مفترض إن اللي بيجاوب بيحب الرياضة، فبيوجّهه (L6, Exercise)."
    ],
    [
     "صح. وكمان أطوال صفحات ثابتة، وترتيب منطقي، وتنبيهات للأسئلة اللي متجاوبتش، والـ preview.",
     "تجنب الـ double-barrel questions ده تبع Be Specific (قسّم الأسئلة اللي بتسأل عن حاجتين)، مش Be Usable (L6, Be Specific).",
     "الـ Plain language دي rule من Be Concise (\"How clean was the car?\"). الـ Be Usable عن الـ survey نفسه: progress bar، طول الصفحة، الترتيب، الـ alerts، الـ preview (L6, Be Concise).",
     "تجنب الكلمات الـ loaded زي \"wasted\" ده rule من Be Unbiased، مش Be Usable (L6, Be Unbiased)."
    ],
    [
     "سؤال yes/no بيدّي معلومات أقل كمان؛ الـ Be Expressive بيقول استخدم ranges بدل yes/no (L6, Be Expressive).",
     "صح. الـ Be Clear بيقول اعمل timebox لأسئلة التكرار: كلمات زي Rarely أو Often معناها بيختلف من شخص للتاني، لكن \"in the past seven days\" مع أعداد بتبقى مظبوطة (L6, Be Clear).",
     "ده بيسأل عن حاجة تانية (الأسباب، مش التكرار)، وكمان \"Why do you…\" مفترض إن الشخص بيتمرن، فبيبقى leading (L6, Be Unbiased).",
     "الـ scale من 1-5 من غير labels بيكسر rule الـ Be Clear بتاعة \"label numeric scales\"، وكمان لسه مش بيقيس الشخص بيتمرن قد إيه (L6, Be Clear)."
    ],
    [
     "ده عكس النصايح: الـ surveys لازم تبقى صغيرة على قد ما تقدر والأسئلة مختصرة وواضحة، لأن الـ surveys الطويلة بتضر الـ response rate والـ reliability (L5, Surveys; L6).",
     "صح. خلي الـ survey صغير على قد ما تقدر، واكتب الأسئلة بوضوح، وابعد عن الـ bias، وخد feedback من المشاركين عن الـ survey نفسه (L5, Surveys; L6, six principles).",
     "الـ User research لازم يتخطط له بدري؛ survey من غير تخطيط بيكسر الـ general tips والـ six question principles (L5, General tips).",
     "الـ methods لازم تتجمع مع بعض، والمحاضرة بتقول سيب الأسئلة المفتوحة مفتوحة، فالأسئلة الـ quantitative بس مش هي المبدأ (L6, Be Unbiased)."
    ],
    [
     "المبدأ هو \"Be UNbiased\". (الـ answer sheet بتاع 2024/25 حاطط الإجابة True، وده شكله typo في السؤال. جاوب من المحاضرة.)",
     "صح حسب المحاضرة: المبدأ هو Be Unbiased."
    ],
    [
     "الكورس بيقول العكس: خلّي الـ survey صغير على قد ما تقدر، لأن الأسئلة الكتير بتأثر على الـ response rate وعلى الـ reliability بتاعة الـ data (L5, Tips for a good survey design).",
     "صح. أسئلة الـ survey الكويسة لازم تكون <b>Be Clear</b> و<b>Be Concise</b>، وبلغة بسيطة زي \"How clean was the car?\" (L6, How to ask good survey questions).",
     "الكورس بيقول اسأل أقل عدد من الأسئلة يجيب الـ data اللي محتاجها وعارف إنك هتستخدمها، فالأسئلة اللي ملهاش علاقة لازم تتشال (L5, Tips for a good survey design).",
     "ده بيكسر الـ <b>Be Concise</b>: الأسئلة لازم تكون بلغة بسيطة، مش كلام كتير أو technical (L6, Be Concise). والـ survey بيجمع آراء الـ users، مش بيمتحنهم."
    ],
    [
     "الكورس عايز الـ surveys تبقى سريعة في الإجابة: خليها صغيرة على قد ما تقدر، والـ survey المتصمم كويس مش المفروض ياخد وقت طويل (L5, Tips for a good survey design).",
     "صح. تحت <b>Be Usable</b> الكورس بيقول \"Preview the survey yourself\"، وبيطلب feedback من المشاركين على الـ survey، فالمشاكل اللي ضد قواعد الـ Be Clear والـ Be Specific بتتمسك قبل ما الـ survey ينزل (L6, Be Usable; L5, Tips for a good survey design).",
     "الـ Surveys معمولة عشان تجمع ردود سريعة من عدد كبير من الـ users؛ واختبار الـ survey مش بيغيّر عدد الردود اللي محتاجها (L5, Surveys).",
     "الكورس بينصح بأسئلة الاختيارات زي الـ ranges ومستويات الموافقة والسماح بأكتر من اختيار (L6, Be Expressive)، فالاختبار مش هدفه إنه يشيلها."
    ],
    [
     "صح. اتنين من الـ 6 principles بتوع أسئلة الـ survey الكويسة هما <b>Be Clear</b> و<b>Be Unbiased</b> (ابعد عن الـ leading والـ loaded questions)، عشان الإجابات تعكس رأي الـ user الحقيقي (L6, How to ask good survey questions).",
     "ده بيكسر الـ <b>Be Clear</b> والـ <b>Be Concise</b>: الأسئلة لازم تكون بلغة بسيطة، ولو مش متأكد بتزوّد تفاصيل زيادة عشان الـ users يفهموا (L6, Be Clear; Be Concise).",
     "الكورس مقالش كده. تحت <b>Be Usable</b> بيقول نبّه الـ users على الأسئلة اللي متجاوبتش، ونصايح الـ survey بتاعته عن إن الـ survey يفضل صغير و unbiased (L6, Be Usable; L5, Tips for a good survey design).",
     "الكورس بينصح بالـ ranges ومستويات التكرار أو الموافقة والـ multiple selections (L6, Be Expressive). وبيقول بس إن الأسئلة اللي هي open-ended بطبيعتها تفضل open."
    ],
    [
     "صح. اتنين من الـ 6 principles بتوع أسئلة الـ survey الكويسة هما <b>Be Clear</b> و<b>Be Concise</b> (لغة بسيطة، زي \"How clean was the car?\") (L6, How to ask good survey questions).",
     "ده بيكسر الـ \"Be Clear\"، اللي بيقولك اعمل labels للـ scales، وابعد عن الـ ranges اللي بتتداخل، وزوّد تفاصيل لو مش متأكد (L6, Be Clear).",
     "ده <b>double-barrel</b> question، والـ \"Be Specific\" بيقولك ابعد عنه وقسّمه لأسئلة منفصلة (L6, Be Specific).",
     "ده بيكسر الـ \"Be Concise\": \"What was the overall level of cleanliness that you observed within the car?\" لازم تبقى \"How clean was the car?\" (L6, Be Concise)."
    ],
    [
     "الـ \"Order your questions logically\" مذكورة تحت <b>Be Usable</b>، وده principle هدفه يخلي الـ survey أسهل في إنك تكمّله، مش إنه يبعّد الناس عنه (L6, Be Usable).",
     "الترتيب المنطقي ده guideline من الـ \"Be Usable\" لأسئلة الـ survey الكويسة؛ بيشيل اللخبطة مش بيزوّدها (L6, Be Usable).",
     "صح. الـ \"Order your questions logically\" واحدة من نصايح الـ <b>Be Usable</b> (مع الـ progress bar، وأطوال الصفحات الثابتة، والتنبيه على الأسئلة اللي متجاوبتش، والـ previewing)، ودول بيخلّوا الـ survey سهل على اللي بيجاوبوا إنهم يكمّلوه (L6, Be Usable).",
     "الـ principles بتاعة الـ survey في المحاضرة هدفها إجابات واضحة و reliable؛ والترتيب المنطقي ده guideline من الـ \"Be Usable\"، مش حاجة بتضر الدقة (L6, Be Usable)."
    ],
    [
     "صح. تحت <b>Be Unbiased</b> المحاضرة بتقول ابعد عن الـ leading questions (زي \"Did our brand-new AI-based interface generate better recommendations?\") والـ loaded questions (زي \"wasted\") (L6, Be Unbiased).",
     "الثبات (consistency) متنصوح بيه مش حاجة نبعد عنها: الـ Be Usable بيقول خلّي أطوال الصفحات ثابتة، والـ exercise بتاع L6 بينتقد الـ scales اللي عدد اختياراتها واتجاهها بيتغير من سؤال للتاني (L6, Be Usable / Exercise).",
     "ترتيب الأسئلة بشكل منطقي واحد من نصايح الـ Be Usable، فالمفروض يتعمل مش نبعد عنه (L6, Be Usable).",
     "الصياغة المحايدة (neutral wording) هي الحل اللي المحاضرة بتديه للـ loaded والـ leading questions، زي \"spent\" بدل \"wasted\" (L6, Be Unbiased)."
    ],
    [
     "المحاضرة بتعتبر أسئلة الـ yes/no مشكلة: تحت <b>Be Expressive</b> بتقول استخدم ranges بدل yes/no، لأن إجابة yes/no بتدي معلومات قليلة (L6, Be Expressive).",
     "صح. أسئلة الـ yes/no بتدي معلومات قليلة. مبدأ الـ <b>Be Expressive</b> بيقول استخدم ranges بدالها، مثلاً بدل \"Do you use social media?\" تقول \"In the past seven days, how much time have you spent on social media?\" (L6, Be Expressive)."
    ],
    [
     "الـ Qualitative research بيركّز على ملاحظات عن <b>ليه وإزاي</b> الحاجات بتحصل (L5, Types of user research based on What). إجابة الـ yes/no مبتشرحش لا ده ولا ده، والمحاضرة بتقول استبدل أسئلة الـ yes/no بـ ranges (L6, Be Expressive).",
     "صح. الـ Qualitative data عن <b>ليه وإزاي</b> الحاجات بتحصل، وغالباً بتيجي من interviews (L5). أسئلة الـ yes/no بتدي معلومات قليلة، فالمحاضرة بتقول استخدم ranges بدالها، وسيب الأسئلة الـ open-ended زي \"Why did you choose our service?\" مفتوحة (L6, Be Expressive; Be Unbiased)."
    ],
    [
     "الكورس مش بيطلب أسئلة yes/no خالص. تحت <b>Be Expressive</b> بيقول استخدم ranges بدل yes/no، وبيدي \"Have you listened to an audiobook this year?\" كمثال لسؤال yes/no ضعيف تستبدله بـ ranges (L6, Be Expressive; Exercise).",
     "صح. المحاضرة عمرها ما قالت إن الـ surveys لازم دايماً تخلط معاها أسئلة yes/no؛ هي بتقولك <b>استبدل أسئلة الـ yes/no بـ ranges</b> (Be Expressive) وخلي الـ survey صغير على قد ما تقدر، واسأل بس اللي محتاجه (L6, Be Expressive; L5, Tips for a good survey design)."
    ]
   ],
   "extra": [
    [
     "صح. الـ Scales لازم يبقى ليها labels، زي \"1 = Highly dissatisfied … 5 = Highly satisfied\".",
     "السؤال قصير أصلاً؛ المشكلة إن الـ scale ملوش labels.",
     "مفيش كلمة loaded فيها مشاعر في السؤال.",
     "الـ progress bar عن الـ survey كله، مش عن scale واحد من غير labels."
    ],
    [
     "السؤال الأصلي بيسأل عن حاجة واحدة بس.",
     "صح. ده مثال المحاضرة على اللغة البسيطة تحت Be Concise.",
     "التغيير في الصياغة، مش في شكل الإجابة.",
     "السؤال الأصلي مش بيزقّ الـ user ناحية إجابة."
    ],
    [
     "مفيهوش كلمة loaded زي \"wasted\".",
     "الـ Overlapping ranges محتاجة اختيارات رقمية زي 0-2، 2-5؛ والسؤال ده مفيهوش. عيبه إنه بيخلط الـ temperature والشكل والطعم (L6, Be Specific).",
     "صح. ده مثال \"avoid internal conflict\" تحت Be Specific: ممكن حد يحب الطعم ومش عاجباه الحرارة.",
     "بيسأل عن مستوى رضا، مش yes/no."
    ],
    [
     "الـ Radio buttons بتسمح باختيار واحد بس.",
     "صح. السماح بأكتر من اختيار معناه إنك تستخدم <b>checkboxes بدل radio buttons</b>."
    ],
    [
     "بيسأل عن حاجة واحدة (الـ recommendations).",
     "الـ Timeboxing لأسئلة التكرار؛ وده مش منها.",
     "الـ \"Other: ____\" للـ lists بتاعة categories، مش للسؤال ده.",
     "صح. إنه يمدح الـ interface \"الـ brand-new AI-based\" ويلمّح لكلمة \"better\" ده بيوجّه الـ user. ده مثال المحاضرة على الـ leading question."
    ],
    [
     "صح. ده مثال المحاضرة على التركيز على رأي الـ user.",
     "الترتيب عن تسلسل الأسئلة، مش عن الصياغة دي.",
     "الـ Overlapping ranges ليها علاقة باختيارات الإجابة الرقمية، والسؤال ده مفيهوش. إعادة الصياغة بتضيف \"too low / about right\" عشان تلقط رأي الـ user (L6, Be Expressive).",
     "النسخة الجديدة أطول أصلاً؛ الهدف إنك تاخد رأي الـ user."
    ],
    [
     "مش بيفترض إجابة ولا بيمدح حاجة.",
     "صح. تمرين المحاضرة بيعتبره yes/no؛ والـ ranges (زي في \"Be Expressive\") بتدي إجابات أغنى.",
     "الـ loaded question فيه كلمة حكم زي \"wasted\"؛ السؤال ده محايد. عيبه هو شكل الـ yes/no (L6, Exercise).",
     "مفيهوش ranges خالص، وده هو المشكلة الحقيقية."
    ],
    [
     "صح. تحت Be Unbiased: سيب الأسئلة المفتوحة مفتوحة.",
     "المحاضرة بتقول إن السؤال ده متجبرهوش على options ثابتة."
    ],
    [
     "الـ double-barrel question بيسأل عن حاجتين مرة واحدة، لكن كل سؤال هنا بيسأل عن الاستمتاع بس. العيب هو إن الـ scales مش متسقة (L6, Exercise).",
     "الاختصار حاجة كويسة (Be Concise). المشكلة الحقيقية إن الـ scale بيتغير من 4 لـ 6 اختيارات واتجاهه بيتعكس (L6, Exercise).",
     "صح. تمرين المحاضرة بيشاور على إن عدد الـ options بيتغير وإن الـ scale معكوس.",
     "الـ \"Other\" للـ lists بتاعة categories، مش للـ numeric scales."
    ],
    [
     "صح. ده مثال المحاضرة على إنك تزوّد تفاصيل تحت Be Clear.",
     "المحاضرة ذاكرة المثال ده بالظبط تحت Be Clear."
    ]
   ]
  },
  "7": {
   "notes": [
    {
     "h": "(2) الـ Interviews",
     "pts": [
      "الـ research technique <b>الأكتر انتشاراً</b>.",
      "فهم أعمق وأشمل:<br>• أسئلة مفتوحة وأسئلة \"ليه\" أكتر (وJoyner بيقول ركّز على الـ <b>6 Ws</b>، وهما who و what و where و when و why و how)<br>• مساحة لـ follow-up questions<br>• تفكير في الأحداث النادرة.",
      "عدد الـ users اللي تقدر تعملهم interview أقل بكتير من اللي تقدر تعملهم survey.",
      "<b>أغلى</b>:<br>• الـ <b>synchronous</b> (اللي بيعمل الـ interview بيدّي وقت لكل شخص)<br>• الـ <b>incentives</b> (اللي بيتعملهم interview غالباً مستنيين مقابل).",
      "الـ Interviews والـ surveys ممكن يتعملوا ورا بعض بأي ترتيب، وتستخدم نتايج واحد عشان تخطط للتاني."
     ]
    },
    {
     "h": "نصايح لـ interview كويس",
     "pts": [
      "<b>خطط من بدري</b> وجهّز الأسئلة قبل الـ interview.",
      "أثناء الـ interview فيه مفتاحين:<br>• <b>اسمع كويس</b> (الـ user هو اللي المفروض يتكلم أغلب الوقت)<br>• <b>اكتب notes</b> (واحد يسأل وواحد يكتب؛ الـ audio recording مش كفاية؛ اكتب المشاعر وردود الفعل).",
      "<b>سيب شوية وقت بين الـ interviews.</b>"
     ]
    },
    {
     "h": "Interview لأفراد ضد groups"
    },
    {
     "h": "تحديات الـ data اللي بتتجمع بالأسئلة",
     "pts": [
      "التخطيط بياخد وقت ومجهود أكتر من اللي ممكن يكون عند الفريق.",
      "تحليل الـ qualitative data مش سهل.",
      "الـ <b>Recall bias</b>: إجابات مش دقيقة عن حاجات حصلت زمان.",
      "الـ <b>Reporting bias</b>: الناس بتدّي إجابات مثالية أكتر من الواقع.",
      "الحل: اعمل combination مع techniques تانية زي <b>participant observation و usability studies و secondary research</b>."
     ]
    },
    {
     "h": "الـ Design: أقدر أعمله؟",
     "pts": [
      "بيقول Scott Klemmer: \"Designing great user interfaces requires enormous creativity and a lot of hard work…\" يعني الـ interfaces العظيمة محتاجة إبداع ضخم وشغل كتير، بس الـ interfaces الكويسة سهلة لو عارف الـ methods والـ techniques والـ principles الأساسية.",
      "بيقول Joyner: \"design is very hard\"، يعني الـ design صعب جداً.",
      "الـ Designers بيقولوا: \"إحنا مش فنانين؛ وفي أغلب الحالات مش موهوبين في الرسم كمان.\" الـ Design مش بيطلّع لوحات تتعلق على الحيطة.",
      "الموهبة والإبداع ميزة. متقفلش الإبداع؛ امشي على النصايح وتجنب أكبر أخطاء الـ design."
     ]
    }
   ],
   "cards": [
    "الـ Interviews.",
    "Who، What، Where، When، Why، How.",
    "لأنها synchronous (وقت لكل شخص) ومحتاجة incentives.",
    "اسمع كويس (الـ user يتكلم أغلب الوقت) واكتب notes (الـ audio مش كفاية).",
    "إجابات مش دقيقة عن حاجات حصلت زمان.",
    "الناس بتدّي إجابات مثالية أكتر من الواقع.",
    "وقت أكتر لكل شخص، logistics أسهل، privacy أكتر.",
    "feedback أكتر؛ والنقاش بيطلّع الـ assumptions على السطح."
   ],
   "qa": [
    "خطط من بدري وجهّز الأسئلة قبل الـ interview. وأثناءه، اسمع كويس عشان الـ user يتكلم أغلب الوقت، واكتب notes (واحد يسأل وواحد يكتب؛ الـ audio مش كفاية؛ اكتب المشاعر وردود الفعل). وسيب شوية وقت بين الـ interviews.",
    "الأفراد: وقت أكتر لكل مشارك، logistics أسهل، privacy أكتر. الـ Groups: أسهل تاخد feedback أكتر والنقاش بيطلّع الـ assumptions، بس ممكن تقابل confounding personalities ومشاكل \"presentation of self\".",
    "التخطيط بياخد وقت؛ تحليل الـ qualitative صعب؛ الـ recall bias؛ الـ reporting bias (إجابات مثالية). الحل إنك تعمل combination مع participant observation و usability studies و secondary research.",
    "الـ Surveys بتوصل لـ users كتير بسرعة وبرخص (نظرة عامة واسعة). الـ Interviews بتوصل لـ users أقل بس بتدّي فهم أعمق (أسئلة ليه، follow-ups، أحداث نادرة) وبتكلّف أكتر (synchronous، incentives). وممكن تجمعهم بأي ترتيب.",
    "الـ Interviews هي الـ user research technique <b>الأكتر انتشاراً</b>.<br>1) بتدّي فهم أعمق وأشمل للـ users: أسئلة open-ended وأسئلة \"why\" أكتر (Joyner: ركّز على الـ <b>6 Ws</b>: who، what، where، when، why، how)، ومساحة لـ follow-up questions، وتفكير في الأنشطة والأحداث النادرة.<br>2) عدد الـ users اللي ممكن تعملهم interview أقل بكتير من الـ surveys.<br>3) أغلى: <b>synchronous</b> (اللي بيعمل الـ interview بيدّي وقت لكل interviewee) و<b>incentives</b> (اللي بنعملهم interview غالباً بيستنوا تعويض).<br>4) الـ Interviews والـ surveys ممكن يتعملوا ورا بعض بأي ترتيب، وتستخدم نتايج واحد عشان تخطط للتاني."
   ],
   "quiz": [
    [
     "صح. المحاضرة بتبدأ جزء الـ interviews بإنها بتقول إن الـ interview هو أشهر research technique، ومتقدّر عشان بيدّي فهم أعمق من خلال أسئلة \"why\" المفتوحة (L7, Interviews).",
     "المحاضرة بتسمي الـ interviews الـ technique الأكتر انتشاراً."
    ],
    [
     "الـ Listen well واحدة من الحاجتين الأساسيتين أثناء الـ interview، بس الـ take notes هي التانية، فالإجابة الكاملة \"a & c\" (L7, Tips for a good interview).",
     "ده عكس النصيحة الحقيقية: المحاضرة بتقول <b>سيب</b> شوية وقت بين الـ interviews (L7, Tips for a good interview).",
     "الـ Take notes واحدة من الحاجتين الأساسيتين، بس الـ listening well هي التانية، فلو اخترتها لوحدها تبقى ناقصة؛ الإجابة \"a & c\" (L7, Tips for a good interview).",
     "صح. اسمع كويس <b>و</b>اكتب notes هما المفتاحين."
    ],
    [
     "صح. الأفراد: \"easier to coordinate the logistics\".",
     "جدول المقارنة بيقول إن الـ logistics أسهل مع الأفراد."
    ],
    [
     "الـ Special software مش مذكور. الـ Interviews أغلى عشان هي synchronous (وقت لكل interviewee) وكمان اللي بنعملهم interview غالباً بيستنوا incentives (L7, Interviews).",
     "صح. الـ Interviews بتبقى synchronous، فاللي بيعمل الـ interview بيدّي وقت لكل شخص، واللي بنعملهم interview غالباً بيستنوا تعويض (incentives) (L7, Interviews).",
     "الـ Interviews مش لازم تبقى online، وده مش سبب التكلفة. السبب هو الوقت الـ synchronous لكل interviewee زائد الـ incentives (L7, Interviews).",
     "الـ Interviews بتجمع qualitative data في الغالب (إجابات \"why\" مفتوحة)، مش أرقام، وده ملوش أي علاقة بتكلفتها (L7, Interviews)."
    ],
    [
     "الـ Recall bias هو إن الذاكرة مش دقيقة عن أحداث فاتت.",
     "صح. الـ Reporting bias هو لما الناس تدّي إجابات أكثر مثالية من الواقع؛ والـ recall bias هو إجابات مش دقيقة عن أحداث فاتت (L7, Challenges of asking questions).",
     "الـ Selection bias مش من الـ biases اللي في المحاضرة. إن الناس تحكي نسخة مثالية من الواقع ده الـ reporting bias (L7, Challenges of asking questions).",
     "الـ Confirmation bias مش متغطي هنا. المحاضرة بتسمّي اتنين biases بس، recall وreporting؛ والإجابات اللي أكثر مثالية من الواقع دي reporting bias (L7, Challenges)."
    ],
    [
     "دي ميزة الـ individual interviews.",
     "صح. في الـ group interviews المناقشة بين المشاركين ممكن تبيّن الـ assumptions، وكمان أسهل تجيب feedback أكتر (L7, Individuals vs groups).",
     "الـ Individual interviews أسهل في التنسيق.",
     "العكس: مع الـ groups ممكن تحتاج تتعامل مع confounding personalities، ودي متصنفة كعيب من عيوب الـ groups (L7, Individuals vs groups)."
    ],
    [
     "الـ Quantitative research بيدّي أرقام (measures، counts) بتوريك إيه اللي بيحصل، مش ليه. الـ Motivations محتاجة qualitative research (L5, Types by WHAT).",
     "الـ Secondary research هو data حد تاني جمعها، وممكن تبقى قديمة أوي أو مش specific كفاية للـ users بتوعك، فمتقدرش لوحدها تدّيك فهم عميق (L5, Primary vs secondary).",
     "الـ Experiments مجرد primary method واحدة، مش من تقسيمات الـ WHAT. فهم ليه وإزاي الـ users بيتصرفوا كده ده الـ qualitative research (L5, Types by WHAT).",
     "صح. بيغطي ليه وإزاي الحاجات بتحصل."
    ]
   ],
   "extra": [
    [
     "الـ \"Where\" واحدة من الـ 6 Ws بتوع Joyner (who, what, where, when, why, how)، فهي مش الغريبة (L7, Interviews).",
     "الـ \"How\" موجودة في لستة الـ 6 Ws (who, what, where, when, why, how)، حتى لو مش بتبدأ بـ W (L7, Interviews).",
     "الـ \"Why\" واحدة من الـ 6 Ws، والـ interviews متقدّرة بالظبط عشان أسئلة \"why\" المفتوحة دي (L7, Interviews).",
     "صح. الـ 6 Ws هما who و what و where و when و why و how. و\"Which\" مش منهم."
    ],
    [
     "صح. الـ Recall bias هو إنك تدّي إجابات مش دقيقة عن حاجات فاتت.",
     "الـ Reporting bias هو إجابات مثالية أكتر من الواقع، مش نسيان.",
     "دي مشكلة في الـ group interviews عن إزاي الناس عايزة تبان قدام غيرها.",
     "دي مشكلة group interview، مش غلطة ذاكرة."
    ],
    [
     "صح. \"More privacy for participants\" مذكورة كميزة للـ interview مع الأفراد.",
     "الجدول بيذكر الـ privacy الأكتر كميزة للـ individual interviews."
    ],
    [
     "الـ Surveys برضه بتجمع data بالأسئلة، فعندها نفس الـ biases.",
     "صح. ده الحل المذكور في المحاضرة.",
     "الـ Leading questions بتزوّد الـ bias بدل ما تقلله.",
     "التحليل صعب، بس إنك تتخطاه مش هو الحل."
    ],
    [
     "مفيش حاجة في السيناريو عن الوقت بين الـ interviews.",
     "مفيش حاجة بتقول إن الأسئلة متجهزتش.",
     "صح. المحاضرة بتقول واحد يسأل وواحد تاني يكتب notes (ومعاها المشاعر وردود الفعل)، والـ audio لوحده مش كفاية.",
     "دي مش نصيحة؛ الـ individual والـ group interviews كل واحد ليه مميزات وعيوب."
    ],
    [
     "دي ميزة الـ individual interviews.",
     "دي ميزة الـ individual interviews.",
     "دي خاصية الـ individual interviews.",
     "صح. دي المشاكل المذكورة للـ group interviews."
    ],
    [
     "Joyner بيقول العكس: \"design is very hard\". اللي بيضيف إن الـ interfaces الكويسة نسبياً سهلة لو تعرف الـ methods والـ principles الأساسية هو Klemmer (L7, Design: can I?).",
     "صح. جملة Joyner هي \"design is very hard\". وKlemmer بيضيف إن الـ UIs العظيمة محتاجة creativity وشغل جامد، أما الكويسة نسبياً فسهلة بالـ basic methods (L7, Design: can I?)."
    ],
    [
     "صح. \"Listen well\": الـ user المفروض يتكلم أغلب الوقت.",
     "اللي بيعمل الـ interview المفروض يسمع كويس، مش يسيطر على الكلام.",
     "اللي بيكتب الـ notes بيسجّل؛ مش المفروض يقود الكلام.",
     "المحاضرة بتقول الـ user هو اللي يتكلم أغلب الوقت."
    ],
    [
     "الـ Designers بيقولوا \"we are not artists\"؛ موهبة الرسم مش شرط.",
     "صح. ده باقي كلام Klemmer.",
     "المحاضرة بتقول الـ design مش بيطلّع لوحات تتعلق على الحيطة.",
     "المحاضرة بتقول متقفلش الإبداع."
    ],
    [
     "صح. المحاضرة بتقول إن الـ interviews والـ surveys ممكن يتعملوا ورا بعض بأي ترتيب، ونتايج واحد بتستخدم في تخطيط التاني (L7, Interviews).",
     "أي ترتيب مسموح؛ وكل واحد ممكن يتستخدم عشان تخطط للتاني."
    ]
   ]
  },
  "8": {
   "notes": [
    {
     "h": "أكبر أخطاء ممكن الـ designer يعملها (Joyner)",
     "pts": [
      "<b>أكبر غلطة</b>: إنك تنط على طول تصمم interface <b>من غير ما تفهم الـ users أو الـ task</b>.",
      "<b>تاني أكبر غلطة</b>: إنك تثبت على <b>فكرة design واحدة</b> أو نوع واحد من الأفكار <b>بدري أوي</b>."
     ]
    },
    {
     "h": "الـ Design alternatives",
     "pts": [
      "مرحلة لوحدها في الـ cycle بتاع Joyner. استكشف alternatives كتير ومتنوعة بدل ما تركز على واحد من الأول.",
      "الغلطة دي منتشرة لما تكون <b>بتحسّن system موجود</b>، لأنك بتبقى محبوس في الـ interface الحالي بتاعه. النصيحة: <b>ابعد نفسك عن الحلول الموجودة</b>، على الأقل وقت الـ brainstorming.",
      "الـ design النهائي غالباً بيبقى <b>combination</b> من alternatives اتستكشفت قبل كده.",
      "كام alternative؟ <b>أكتر ما تقدر.</b>",
      "مثال: <b>أول ماوس من Microsoft</b> اتعمله <b>أكتر من 100 prototype</b>."
     ]
    },
    {
     "h": "الـ Prototyping",
     "pts": [
      "أغلب الناس فاكرة إن الـ prototype نسخة سريعة أو صغيرة من الحاجة الحقيقية. والفهم ده مش مفيد.",
      "بالنسبة للـ designers: <b>\"Rapidly creating an approximation of a design so that you can quickly get feedback.\"</b> يعني تعمل بسرعة نسخة تقريبية من الـ design عشان تاخد feedback بسرعة.",
      "بيقول Klemmer: <b>\"A prototype is not about the artifact, it's about feedback and iteration.\"</b> يعني الـ prototype مش عن الحاجة نفسها، هو عن الـ feedback والـ iteration.",
      "بيقول Joyner إن الـ design هو process iterative فيه brainstorming وتجميع وسيب وتعديل وتحسين للأفكار، وده محتاج كذا فكرة تبدأ بيهم.",
      "الـ prototype الكويس بيخليك تاخد <b>feedback مفيد (constructive)</b> وتعمل iteration. ومش لازم يشبه المنتج النهائي.",
      "الـ Prototypes اللي مش بتدّيك معرفة جديدة بتضيّع الـ design process. وبيقول Klemmer: <b>\"prototypes are questions, ask a lot of them.\"</b> يعني الـ prototypes أسئلة، اسأل كتير منها."
     ]
    }
   ],
   "cards": [
    "إنك تنط على طول للـ design من غير ما تفهم الـ users أو الـ task.",
    "إنك تثبت على فكرة design واحدة (أو نوع واحد) بدري أوي.",
    "ابعد نفسك عن الحلول الموجودة وقت الـ brainstorming.",
    "أكتر ما تقدر.",
    "أكتر من 100 prototype.",
    "إنك تعمل بسرعة نسخة تقريبية من الـ design عشان تاخد feedback بسرعة.",
    "مش عن الـ artifact؛ عن الـ feedback والـ iteration. \"Prototypes are questions, ask a lot of them.\""
   ],
   "qa": [
    "حسب Joyner: (1) إنك تنط على طول للـ design من غير ما تفهم الـ users أو الـ task؛ (2) إنك تثبت على فكرة design واحدة أو نوع واحد بدري أوي.",
    "إنك تعمل بسرعة نسخة تقريبية من الـ design عشان تاخد feedback سريع. أهميته جاية من الـ feedback والـ iteration، مش من الـ artifact نفسه. والـ prototype الكويس بيخليك تاخد feedback مفيد و constructive.",
    "إنك تركز على alternative واحد بدري ده غلطة كبيرة. الاستكشاف الواسع بيوصّل لـ designs أحسن، والـ design النهائي غالباً بيبقى combination من alternatives. حاول تعمل أكتر ما تقدر (زي 100+ prototype لأول ماوس من Microsoft)."
   ],
   "quiz": [
    [
     "قلة الـ prototypes مش واحدة من الغلطتين اللي Joyner سمّاهم. أكبر غلطة إنك تنط على الـ design من غير ما تفهم الـ users أو الـ task (L8, Biggest mistakes).",
     "صح. أكبر غلطة عند Joyner إنك تنط على طول لتصميم الـ interface من غير ما تفهم الـ users أو الـ task؛ والتانية إنك تثبت على فكرة واحدة بدري أوي (L8, Biggest mistakes).",
     "الـ User feedback متشجّع عليه طول الوقت: الـ prototypes موجودة أصلاً عشان تجيب feedback وتعمل iterate. أكبر غلطة عند Joyner هي التصميم من غير فهم الـ users (L8, Prototyping).",
     "الغلطة التانية إنك تثبت على فكرة واحدة <b>بدري</b> أوي."
    ],
    [
     "استكشاف alternatives كتير ده النصيحة مش الغلطة: حاول توصل لأكبر عدد تقدر عليه. الغلطة إنك تبقى captured بالـ interface الحالي (L8, Design alternatives).",
     "صح. ابعد نفسك عن الحلول الموجودة.",
     "تجاهل الـ feedback حاجة وحشة، بس الغلطة المرتبطة بتحسين system موجود هي إنك تبقى captured بالـ interface الحالي بتاعه (L8, Design alternatives).",
     "الوقت على الـ prototypes مش هو الغلطة المذكورة؛ الـ prototypes متشجّع عليها. تحسين system موجود بيغريك تفضل captured بالـ interface الحالي بتاعه (L8, Design alternatives)."
    ],
    [
     "قليل جداً. مثال المحاضرة على استكشاف الـ alternatives هو أول Microsoft mouse، اللي اتعمله أكتر من 100 prototype (L8, Design alternatives).",
     "قليل: أول Microsoft mouse عدّى على أكتر من 100 prototype، والمثال ده بيتقال عشان يوضح إنك لازم تستكشف أكبر عدد alternatives تقدر عليه (L8, Design alternatives).",
     "قريب، بس المحاضرة بتقول <b>أكتر</b> من 100، مش 100 بالظبط، فالإجابة الدقيقة \"More than 100\" (L8, Design alternatives).",
     "صح. أول Microsoft mouse كان ليه أكتر من 100 prototype، ودي مثال المحاضرة على إنك تستكشف أكبر عدد design alternatives تقدر عليه (L8, Design alternatives)."
    ],
    [
     "الـ Prototypes عكس الـ final products: هي approximations للـ design بتتعمل بسرعة عشان تجيب feedback سريع (L8, Prototyping).",
     "صح. \"Prototypes are questions, ask a lot of them.\"",
     "Klemmer بيقول \"a prototype is not about the artifact, it's about feedback and iteration\"، فهي مش حاجات للعرض والتفاخر (L8, Prototyping).",
     "لو شفت الـ prototype كمجرد mock-up بسيط هتفوّت الهدف منه. Klemmer بيعامل الـ prototypes كأسئلة بتجمع feedback (L8, Prototyping)."
    ],
    [
     "صح. المحاضرة بتعرّف الـ prototype الكويس إنه اللي بيخليك تجيب feedback مفيد (constructive) وتعمل iterate على الـ design (L8, Prototyping).",
     "ده تعريف المحاضرة للـ prototype الكويس."
    ],
    [
     "المحاضرة بتقول مش لازم يشبه المنتج النهائي.",
     "صح. الـ prototype الكويس بيسمح بـ feedback مفيد وconstructive وبالـ iteration؛ ومش لازم يشبه الـ final product (L8, Prototyping).",
     "\"A quick or small version of the real thing\" ده الفهم الشائع اللي المحاضرة بتقول عليه مش مفيد. الـ prototype هو approximation بيتعمل عشان تجيب feedback (L8, Prototyping).",
     "الـ Polish مش هو الهدف: الـ prototype مش لازم يشبه الـ final product، واللي شكلها مخلّص بتجيب feedback constructive أقل من الـ sketches (L8; L9, Lo-fi)."
    ],
    [
     "إنك تثبت على واحد ده تاني أكبر غلطة.",
     "صح. استكشف مدى واسع بدل فكرة واحدة من الأول: حاول توصل لأكبر عدد alternatives تقدر عليه، زي الـ 100+ prototype بتوع أول Microsoft mouse (L8, Design alternatives).",
     "المحاضرة مش حاطة رقم ثابت زي تلاتة. إجابتها \"as many as you can\" (L8, Design alternatives).",
     "الـ Design alternatives مرحلة كاملة في الـ cycle بتاع Joyner، ولو نطّيتها يبقى ثبّت على فكرة واحدة بدري، ودي تاني أكبر غلطة (L8, Design alternatives)."
    ],
    [
     "ده الفهم الشائع بس اللي مش مفيد واللي المحاضرة بترفضه: \"a quick / small version of the real thing\" (L8, Prototyping).",
     "صح. بالنسبة للـ designers، الـ prototyping هو \"rapidly creating an approximation of a design so that you can quickly <b>get feedback</b>\"، وKlemmer بيقول إن الـ prototype عن الـ <b>feedback والـ iteration</b> (L8, Prototyping).",
     "الـ Prototypes هي الطريقة اللي بتاخد بيها feedback من الـ users، مش بديل عنه؛ الـ tactical research \"requires user feedback through use of prototype\" (L2, Types of user research; L8, Prototyping).",
     "المحاضرة بتوصف الـ design كـ iterative process فيه brainstorming وإنك تجمع أفكار وتسيب أفكار وتراجعها وتحسّنها، فالـ prototype عشان تعمل iteration، مش عشان تقفل الـ design مرة واحدة (L8, Prototyping)."
    ],
    [
     "ده عكس النصيحة: إنك تتحبس في الـ interface الحالي غلطة شائعة جداً، فالمفروض تبعد نفسك عن الحلول الموجودة (L8, Design alternatives).",
     "صح. نصيحة المحاضرة هي \"try to <b>distance yourself from the existing solutions</b>, at least initially during the brainstorming sessions\" (L8, Design alternatives).",
     "إنك تثبت على فكرة design واحدة بدري أوي دي تاني أكبر غلطة عند Joyner؛ الـ brainstorming هدفه إنه يطلّع أفكار كتير (L8, Biggest mistakes; L9, Brainstorming).",
     "الـ design process معتمد على الـ feedback: الـ prototypes موجودة عشان تاخد feedback وتعمل iteration، وفي الـ team sessions الناس بتشارك أفكار وتزوّد عليها (L8, Prototyping; L9, Brainstorming). مفيش حاجة بتقول ابعد عن الـ feedback."
    ],
    [
     "صح. حسب Joyner، <b>أكبر غلطة</b> إنك تنط على طول لتصميم interface من غير ما تفهم الـ users أو تفهم الـ task (L8, Biggest mistakes a designer can make).",
     "دي بالظبط أكبر غلطة عند Joyner. إنك تثبت على فكرة design واحدة بدري أوي دي <b>تاني</b> أكبر غلطة عنده، مش الأكبر (L8, Biggest mistakes a designer can make)."
    ],
    [
     "Joyner بيسمي ده <b>تاني أكبر غلطة</b>: إنك تثبت على فكرة design واحدة أو نوع واحد من أفكار الـ design بدري أوي (L8, Biggest mistakes a designer can make).",
     "صح. إنك تثبت على فكرة design واحدة بدري أوي دي <b>تاني أكبر غلطة</b> عند Joyner. بدل كده، استكشف مجموعة أوسع من الـ design alternatives، على قد ما تقدر (L8, Biggest mistakes; Design alternatives)."
    ],
    [
     "صح. المحاضرة بتقول: عشان توصل لـ design كويس، <b>استكشف مجموعة أوسع من الـ design alternatives الممكنة</b> (L8, Design alternatives).",
     "الـ slide بتقول العكس: عشان توصل لـ design كويس لازم تستكشف مجموعة أوسع من الـ design alternatives الممكنة، على قد ما تقدر (L8, Design alternatives)."
    ],
    [
     "صح. الـ slide بتعتبر إنك تركّز جامد على alternative واحد من الأول خالص <b>غلطة كبيرة</b>، وبتقول إنها منتشرة جداً لما تحسّن system موجود، لأنك بتبقى محبوس في الـ interface الحالي بتاعه (L8, Design alternatives).",
     "المحاضرة بتسمي التركيز الجامد على alternative واحد من الأول غلطة كبيرة، وبتقول إن الغلطة دي <b>منتشرة جداً</b> لما تحسّن system موجود (L8, Design alternatives)."
    ],
    [
     "صح. نصيحة المحاضرة إنك \"try to <b>distance yourself from the existing solutions</b>, at least initially during the brainstorming sessions\"، عشان متبقاش محبوس في الـ interface الحالي (L8, Design alternatives).",
     "الـ slide بتقول ده كنصيحة: ابعد نفسك عن الحلول الموجودة، على الأقل أثناء الـ brainstorming، لأن إنك تبقى محبوس في الـ interface الحالي غلطة منتشرة جداً (L8, Design alternatives)."
    ],
    [
     "الـ slide بتقول العكس: النجاح في إن يبقى عندك كذا alternative <b>مهم في المراحل الأولى</b> من الـ design (L8, Design alternatives).",
     "صح. المحاضرة بتقول إن النجاح في إن يبقى عندك كذا alternative <b>مهم في المراحل الأولى</b> من الـ design، ولازم يبقى عندك على قد ما تقدر منهم (L8, Design alternatives)."
    ],
    [
     "صح. ممكن تختار alternative واحد وتعمله finalize، بس المحاضرة بتقول إن <b>الأشهر</b> إن الـ final design يبقى combination من الـ alternatives اللي استكشفتها قبل كده (L8, Design alternatives).",
     "الـ slide بتقول إن اختيار alternative واحد ممكن، بس الأشهر إن الـ final design يبقى <b>combination</b> من الـ alternatives اللي اتستكشفت قبل كده (L8, Design alternatives)."
    ],
    [
     "مثال المحاضرة عكس كده: اتعمل <b>أكتر من 100 prototype</b> لأول mouse من Microsoft (L8, Example).",
     "صح. أول mouse من Microsoft كان ليه <b>أكتر من 100 prototype</b>، وده مثال المحاضرة على إنك تستكشف alternatives على قد ما تقدر (L8, Example)."
    ],
    [
     "المحاضرة بتقول إن أغلب الناس فاكرين الـ prototype نسخة سريعة أو صغيرة من الحاجة الحقيقية، بس <b>ده مش فهم مفيد</b>. بالنسبة للـ designers، هو إنك تعمل بسرعة approximation للـ design عشان تاخد feedback بسرعة (L8, Prototyping).",
     "صح. الـ slide بتقول إن نظرة \"quick / small version of the real thing\" <b>مش فهم مفيد</b>. بالنسبة للـ designers، الـ prototyping هو \"rapidly creating an approximation of a design so that you can quickly get feedback\" (L8, Prototyping)."
    ],
    [
     "صح. Klemmer: \"prototype is not about the artifact, it's about <b>feedback and iteration</b>\". الـ prototype الكويس هو اللي بيخليك تاخد feedback مفيد وتعمل iteration على الـ design بتاعك (L8, Prototyping).",
     "المحاضرة بتقول إن قيمة الـ prototype هي بالظبط الـ feedback والـ iteration (Klemmer)، وبتعرّف الـ prototyping بإنه إنك تاخد feedback بسرعة (L8, Prototyping)."
    ],
    [
     "الـ slide بتقول إن الـ prototype الكويس هو اللي بيخليك تاخد feedback مفيد وتعمل iteration، <b>\"not a one that resembles your final product\"</b> (L8, Prototyping).",
     "صح. الـ prototype الكويس هو اللي بيخليك تاخد feedback مفيد وتعمل iteration على الـ design بتاعك، <b>مش اللي شبه الـ final product</b> (L8, Prototyping)."
    ],
    [
     "صح. الـ prototype الكويس بيخليك تاخد <b>feedback مفيد</b>، والـ slide بتعتبر الـ useful feedback هو نفسه الـ <b>constructive feedback</b> (L8, Prototyping).",
     "المحاضرة بتقول إن هدف الـ prototype إنك تاخد feedback مفيد و constructive؛ والـ prototypes اللي مبتديش أي معرفة جديدة بتضيّع الـ design process (L8, Prototyping)."
    ],
    [
     "صح. Klemmer بيقول <b>\"prototypes are questions, ask a lot of them\"</b> (L8, Prototyping).",
     "دي نصيحة Klemmer نفسه: الـ prototypes أسئلة، ولازم تسأل كتير منها (L8, Prototyping)."
    ]
   ],
   "extra": [
    [
     "Joyner عايز alternatives أكتر ما تقدر؛ الفريق عمل قليل أوي.",
     "إنك تبعد نفسك دي النصيحة، مش الغلطة.",
     "صح. 3 variations من نفس الـ layout دول نوع واحد من الأفكار، واتختار بدري أوي.",
     "السيناريو بيقول إنهم عملوا user research الأول؛ ودي أكبر غلطة، مش دي."
    ],
    [
     "إنك تبقى محبوس في الـ interface الحالي هو بالظبط الغلطة.",
     "الـ Design alternatives مرحلة لوحدها ومينفعش تتخطاها.",
     "ده بيثبّت الـ design الموجود أكتر كمان.",
     "صح. دي نصيحة المحاضرة لما تحسّن system موجود."
    ],
    [
     "التثبيت على فكرة واحدة بدري أوي دي تاني أكبر غلطة عند Joyner. الأكبر هي إنك تنط على الـ design من غير ما تفهم الـ users أو الـ task (L8, Biggest mistakes).",
     "صح. أكبر غلطة إنك تنط للـ design من غير ما تفهم الـ users أو الـ task؛ وإنك تثبت على فكرة واحدة بدري هي <b>تاني</b> أكبر غلطة."
    ],
    [
     "صح. الـ design النهائي غالباً بيبقى combination من alternatives قديمة.",
     "إنك تثبت على أول فكرة دي غلطة.",
     "المحاضرة مش بتختار الـ designs على حسب عدد الـ features.",
     "الـ Design iterative ومبني على الـ feedback."
    ],
    [
     "المحاضرة بتقول إن الفهم المنتشر ده مش مفيد.",
     "صح. ده التعريف بالنسبة للـ designers.",
     "الـ prototype نسخة تقريبية عشان الـ feedback، مش المنتج النهائي.",
     "Klemmer بيقول الـ prototype مش عن الـ artifact."
    ],
    [
     "الـ Polish ده عن الـ artifact، واللي Klemmer بيقول إنه مش المقصود.",
     "الجملة ملهاش علاقة بالـ code.",
     "صح. \"A prototype is not about the artifact, it's about feedback and iteration.\"",
     "الـ prototype الكويس مش لازم يشبه المنتج النهائي."
    ],
    [
     "صح. المحاضرة بتقول كده، وعشان كده Klemmer بيقول \"prototypes are questions, ask a lot of them.\"",
     "المحاضرة بتقول إن الـ prototypes دي بتضيّع الـ design process."
    ],
    [
     "الـ prototype الكويس مش لازم يشبه المنتج النهائي.",
     "الـ prototype مش عن الـ artifact.",
     "المفروض تستكشف alternatives أكتر ما تقدر.",
     "صح. الـ Prototypes اللي مبتدّيش معرفة جديدة بتضيّع الـ process؛ \"prototypes are questions, ask a lot of them.\""
    ],
    [
     "صح. Joyner بيقول الـ process ده محتاج كذا فكرة تبدأ بيهم.",
     "إنك تثبت على فكرة واحدة بدري دي غلطة كبيرة.",
     "الـ Prototypes معمولة عشان feedback سريع، مش code خلصان.",
     "مفيش حاجة في المحاضرة دي بتشترط hi-fi الأول؛ الأفكار بتيجي الأول."
    ],
    [
     "صح. المحاضرة بتقول إن الـ design alternatives مرحلة لوحدها في الـ cycle بتاع Joyner.",
     "هي مرحلة لوحدها (Need finding ← Design alternatives ← Prototyping ← Evaluation)."
    ]
   ]
  },
  "9": {
   "notes": [
    {
     "h": "الـ Prototypes والـ fidelity",
     "pts": [
      "الـ Prototypes بتتواصل بيها مع الـ stakeholders. وليها 4 جماهير: <b>الزملاء (colleagues)، الـ clients، الـ users، وإنت نفسك</b>.",
      "الـ <b>Fidelity</b>: الـ design قريب قد إيه من الـ look and feel بتاع المنتج النهائي. فيه prototypes <b>low-fidelity (lo-fi)</b> و<b>high-fidelity (hi-fi)</b>.",
      "ابدأ بالـ lo-fi، وانقل للـ hi-fi وإنت ماشي في الـ design."
     ]
    },
    {
     "h": "قوة الـ low-fidelity prototypes",
     "pts": [
      "<b>أسرع وأسهل وأرخص</b> في إنك تعملها.",
      "الـ Hi-fi مش ممكن في الأول لأن تفاصيل كتير لسه متقررتش.",
      "<b>الناس بتبقى مستعدة تتكلم أكتر بكتير</b> لما تديهم sketch من لما تديهم حاجة شكلها خلصان.",
      "بيقول Konstan: الـ prototype اللي باين إنه معمول بمجهود قليل (زي مرسوم بالإيد) بياخد <b>constructive feedback</b> أكتر.",
      "التفاصيل الكتير أوي بتخلي الناس تدّي feedback في <b>مستوى أقل (lower level)</b> من المطلوب.",
      "ونصيحة Google: اعرض <b>أفكار high-level</b> في الأول؛ وركّز على التفاصيل والشاشات بعدين."
     ]
    },
    {
     "h": "أنشطة الـ design والـ brainstorming",
     "pts": [
      "كل design activity يا إما بتساعد الـ <b>designer يفكر ويتخيل</b>، يا إما بتساعد <b>أعضاء الفريق والـ stakeholders يتخيلوا ويتواصلوا</b>، يا إما الاتنين.",
      "الـ Brainstorming هدفه يطلّع أفكار كتير. وبيقول Joyner: <b>ابدأ بـ brainstorming فردي</b>، لأن الـ groups بتتجمع على أفكار بدري أوي.",
      "نصايح:<br>• اكتب أفكار أكتر ما تقدر<br>• كل فكرة كلمتين أو جملة<br>• <b>خلي هدفك 20</b><br>• <b>متقيّمش ومتستبعدش</b> أي فكرة<br>• خد breaks أو اعمل كذا session<br>• والـ team sessions للمشاركة وإضافة أفكار، مش للتضييق."
     ]
    },
    {
     "h": "ليه ندرس design؟ والـ design-development process",
     "pts": [
      "• فيه طلبة هيلمعوا كـ designers.<br>• والـ developers كتير بيعملوا design لما ميكونش فيه designers.<br>• والـ developers بيشتغلوا أحسن مع الـ designers لما يفهموا الـ process.",
      "الـ <b>Handoff process</b>: الـ design يخلص، وبعدين يتسلّم للـ development (ورا بعض - sequential).",
      "الـ <b>Handshake process</b>: الـ design والـ development ماشيين <b>بالتوازي (in parallel)</b> مع sync points كتير."
     ]
    },
    {
     "h": "الـ Wireframes",
     "pts": [
      "<b>رسم تخطيطي (schematic) للهيكل الأساسي للشاشة</b>. معمول من خطوط وأشكال بسيطة (مستطيلات، دواير) مع شوية text، والخطوط شكلها زي السلوك (wires).",
      "<b>مفيهوش ألوان ولا font styles</b> عن قصد، عشان نركز على الـ structure. يعني الـ Wireframe هو <b>هيكل (skeleton) فيه placeholders</b>.",
      "شركة Google بتسميه \"key part of the design process\" يعني جزء أساسي من الـ design process.",
      "الـ Wireframes مش فن. هي بتنظم المعلومات وتوصّلها بوضوح.",
      "الأهداف:<br>(1) تقرر الـ structure الأساسي للصفحة قبل الألوان والصور<br>(2) تخلي الفريق متفق من بدري، فتوفر وقت وموارد<br>(3) توجّه الـ feedback للمستوى الصح (الـ structure والـ function، مش الألوان والـ typography)<br>(4) تمسك العناصر المنسية أو المش منظمة من بدري.",
      "إمتى: <b>بعد الـ foundational user research</b>، أول ما يبقى فيه <b>site map</b> مبدئي (هرم المحتوى - content hierarchy)."
     ]
    },
    {
     "h": "الـ Wireframing standards والـ process",
     "pts": [
      "الـ Standards:<br>• الـ text كخطوط أفقية أو placeholder text<br>• الصور كمستطيلات أو دواير فيها <b>X</b><br>• الـ calls to action كمستطيلات أو دواير<br>• و<b>annotation</b> مظبوط.",
      "الـ Process:<br>• ابدأ بـ <b>ورقة وقلم</b>. الهدف الأول إنك <b>توصل</b> لـ design، مش إنك تعرض واحد.<br>• ارسم <b>5 versions على الأقل</b> لكل شاشة.<br>• اعمل iteration بالـ feedback.<br>• والهدف التاني إنك تنقل الفكرة من دماغك للورقة بسرعة، فتجاهل الخطوط المستقيمة والمسافات والـ alignment في المرحلة دي.",
      "بعدين استخدم tools زي <b>Figma و Adobe XD و Sketch و Balsamiq و Pencil</b>.",
      "مثال في المحاضرة: app لتمشية الكلاب (dog-walking app)."
     ]
    },
    {
     "h": "إرشادات تصميم الـ Forms",
     "pts": [
      "الـ commands المهمة تبقى <b>buttons مش links</b>، لأن الـ buttons بتشد العين. بس <b>متعرضش</b> كل الـ commands كـ buttons.",
      "• الـ <b>Breadcrumbs</b> بتوري الـ users هم <b>فين</b>، لما يكون فيه اختيارات كتير.<br>• الـ <b>Progress bars</b> بتوري الـ users هم فين <b>وفاضل إيه</b>، لـ path واحد محدد مسبقاً.",
      "لما الـ form يتبعت بنجاح، بنأكد ده بـ <b>confirmation page</b>.",
      "<b>الـ Error messages تبقى جنب الـ field</b> اللي فيه الغلط. وتغيير لون الـ border بتاع الـ field (زي الأحمر) ده المفضّل.",
      "الـ Text boxes تدّي <b>مساحة كفاية</b> للإجابة.",
      "الـ Fields يبقى فيها <b>hints أو أمثلة أو الـ format المطلوب</b>.",
      "<b>شيل الـ actions المتكررة</b>: افتكر تفضيلات العملاء.",
      "اعمل <b>فرق واضح بين الـ primary والـ secondary calls-to-action</b> (زي \"Go Pro\" يبان أكتر من \"Free Trial\")."
     ]
    }
   ],
   "cards": [
    "الزملاء، الـ clients، الـ users، وإنت نفسك.",
    "الـ design قريب قد إيه من الـ look and feel بتاع المنتج النهائي.",
    "الناس بتبقى مستعدة تتكلم وتدّي constructive feedback على sketch أكتر من حاجة شكلها خلصان.",
    "الفردي الأول؛ الـ groups بتتجمع على أفكار بدري أوي.",
    "خلي هدفك 20 فكرة؛ ومتقيّمش أي واحدة.",
    "رسم تخطيطي للهيكل الأساسي للشاشة: خطوط، أشكال، شوية text، من غير ألوان ولا fonts. هيكل فيه placeholders.",
    "بعد الـ foundational research، أول ما يبقى فيه site map مبدئي.",
    "مستطيل أو دايرة فيها X.",
    "Figma، Adobe XD، Sketch، Balsamiq، Pencil.",
    "الـ Handoff: design وبعدين development (ورا بعض). الـ Handshake: بالتوازي مع syncs كتير.",
    "الـ Breadcrumbs: إنت فين. الـ Progress bar: إنت فين وفاضل إيه (path ثابت)."
   ],
   "qa": [
    "أسرع وأسهل وأرخص. الـ Hi-fi مستحيل في الأول لأن التفاصيل لسه متقررتش. الناس بتبقى مستعدة تتكلم عن sketch أكتر، والـ prototype المرسوم بالإيد بياخد constructive feedback أكتر (Konstan). التفاصيل الكتير بتنزّل الـ feedback لمستوى أقل من المطلوب. Google: اعرض أفكار high-level في الأول والتفاصيل بعدين.",
    "رسم تخطيطي للهيكل الأساسي للشاشة، معمول من خطوط وأشكال بسيطة مع شوية text، ومن غير ألوان ولا fonts عن قصد، عشان نركز على الـ structure (هيكل فيه placeholders). الأهداف: تقرر الـ structure قبل الـ visuals؛ تخلي الفريق متفق بدري وتوفر موارد؛ تاخد feedback في المستوى الصح؛ وتمسك العناصر المنسية أو المش منظمة بدري.",
    "الـ Handoff: الـ design بيخلص ويتسلّم للـ development، واحد ورا التاني. الـ Handshake: الـ design والـ development ماشيين بالتوازي مع sync points كتير.",
    "ابدأ فردي. اكتب أفكار أكتر ما تقدر، كل واحدة كلمتين أو جملة. خلي هدفك 20. متقيّمش ومتستبعدش أفكار. خد breaks أو اعمل كذا session. والـ team sessions للمشاركة وإضافة أفكار، مش لتضييق الاختيارات.",
    "الـ text كخطوط أفقية أو placeholder text؛ الصور كمستطيلات أو دواير فيها X؛ الـ calls to action كمستطيلات أو دواير؛ و text annotations مظبوطة.",
    "الـ Prototypes بتستخدم كطريقة <b>للتواصل مع الـ stakeholders</b>. وبتخدم 4 audiences مختلفين: 1) Colleagues 2) Clients 3) Users 4) Yourself.",
    "1) ابدأ بـ <b>pen and paper</b>.<br>2) أول هدف: <b>إنك توصل لـ design، مش إنك تعرض design</b>.<br>3) لكل شاشة، ارسم wireframe versions بديلة (5 versions على الأقل).<br>4) عدّي على كام iteration بـ feedback لو متاح.<br>5) تاني هدف: الـ wireframe بينقل الفكرة من دماغك للورق بأسرع وأسهل طريقة، فمتركزش في المرحلة دي على تفاصيل بتبطّأ الـ process، زي الخطوط المستقيمة والـ spacing والـ alignment.<br>6) استخدم الـ tools بعد الـ iterations الأولانية بتاعة الـ paper wireframes. الـ tools المشهورة: Figma، Adobe XD، Sketch، Balsamiq، Pencil."
   ],
   "quiz": [
    [
     "معكوس: الـ <b>LOW</b>-fidelity prototypes هي اللي أسرع وأسهل وأرخص.",
     "صح. الجملة مقلوبة: الـ low-fidelity prototypes هي اللي أسرع وأسهل وأرخص في عملها، وعشان كده بتبدأ lo-fi وتنقل لـ hi-fi بعدين (L9, Power of lo-fi)."
    ],
    [
     "العكس: الـ lo-fi prototypes أسرع وأسهل وأرخص، ودي بالظبط قوتها (L9, Power of lo-fi).",
     "الـ UI المفصّل والواقعي ده high fidelity، قريب جداً من الـ look and feel النهائي. الـ Lo-fi prototypes مجرد sketches تقريبية (L9, Prototypes and fidelity).",
     "صح. الـ Lo-fi prototypes سريعة ورخيصة، والناس بتتكلم براحتها أكتر عن sketch، فبتدّي feedback constructive تقدر تعمل عليه iterate بسرعة (L9, Power of lo-fi).",
     "الـ Lo-fi مش بديل للـ hi-fi: بتبدأ بالـ lo-fi وبتنقل للـ hi-fi وإنت ماشي في الـ design (L9, Prototypes and fidelity)."
    ],
    [
     "الـ Wireframes مفيهاش ألوان ولا font styles عن قصد. عرض الـ visual design النهائي ده شغل الـ hi-fi prototypes، مش الـ wireframes (L9, Wireframes).",
     "الـ Wireframes ملهاش علاقة بالـ backend code؛ هي schematic للـ outline بتاع الشاشة، بتستخدم عشان تحدد structure الصفحة (L9, Wireframes).",
     "صح. الـ wireframe هو schematic للـ outline الأساسي للشاشة، skeleton فيه placeholders، من غير ألوان ولا fonts عشان يركز على الـ structure (L9, Wireframes).",
     "الـ Wireframes بتترسم مش بتتكتب code: ورقة وقلم الأول، وبعدين tools زي Figma أو Balsamiq. بتحدد الـ structure قبل أي visual design أو code (L9, Wireframes)."
    ],
    [
     "الـ Visual Studio والـ Eclipse دول IDEs لكتابة الـ code. أدوات الـ wireframing في المحاضرة هي Figma وAdobe XD وSketch وBalsamiq وPencil (L9, Wireframing process).",
     "الـ Word والـ Excel أدوات office، ومش في لستة المحاضرة. أدوات الـ wireframing هي Figma وAdobe XD وSketch وBalsamiq وPencil (L9, Wireframing process).",
     "صح. التلاتة موجودين في list المحاضرة (مع Adobe XD و Pencil).",
     "الـ Final Cut Pro والـ Premiere برامج مونتاج فيديو. أدوات الـ wireframing المذكورة هي Figma وAdobe XD وSketch وBalsamiq وPencil (L9, Wireframing process)."
    ],
    [
     "بدري أوي: الـ wireframes بتتعمل بعد الـ foundational user research، لما يبقى عندك initial site map (L9, Wireframes).",
     "صح. الـ Wireframes بتيجي بعد الـ foundational user research، أول ما يبقى فيه initial site map (content hierarchy) ترتّبه (L9, Wireframes).",
     "الـ Wireframes دي skeletons من نوع lo-fi، والمحاضرة بتقول ابدأ lo-fi وانقل لـ hi-fi، فهي بتيجي قبل الـ hi-fi prototypes (L9, Prototypes and fidelity).",
     "الـ Wireframes بتيجي بدري: هدفها إنها تثبّت الـ structure وتلقط العناصر المنسية قبل الألوان والصور، بعد الـ foundational research (L9, Wireframes)."
    ],
    [
     "إنك تعرض الـ text كخطوط أفقية أو placeholder text ده واحد من الـ wireframing standards، فهو مش الإجابة (L9, Wireframing standards).",
     "رسم الصور كمستطيلات أو دواير فيها X ده standard مذكور في الـ wireframing، فهو مش الإجابة (L9, Wireframing standards).",
     "صح. الـ Wireframes بتتجنب الألوان والـ font styles عن قصد.",
     "رسم الـ Calls to action كمستطيلات أو دواير ده standard مذكور. الغريب هنا هو الألوان والـ typography المفصّلة (L9, Wireframing standards)."
    ],
    [
     "الـ Groups بتتجمع على أفكار بدري أوي، ودي المشكلة.",
     "صح. كل عضو بيعمل مجموعة أفكاره الأول.",
     "نصايح الـ Brainstorming بتقول متقيّمش ومتستبعدش أي فكرة؛ الهدف إنك تطلع أكبر عدد أفكار، حوالي 20 (L9, Brainstorming).",
     "إنك تبدأ بـ final design بيلغي فكرة الـ brainstorming أصلاً، اللي هدفها توليد أفكار كتير، وبتبدأ بشكل فردي (L9, Brainstorming)."
    ],
    [
     "الـ guideline إنها تظهر جنب الـ field.",
     "صح. الـ Error messages بتتحط جنب الـ field اللي فيه الغلط، عشان الـ user يشوف بالظبط إيه اللي يصلّحه؛ وتغيير لون الـ border بتاع الـ field (أحمر مثلاً) هو المفضّل (L9, Form design).",
     "آخر الصفحة بعيد عن الـ field اللي سبب الغلط. الـ guideline بتحط الرسالة جنب الـ field ده (L9, Form design).",
     "الـ page title مش مكان أخطاء الـ form؛ الـ user هيضطر يدوّر على الـ field. الأخطاء مكانها جنب الـ input الغلط (L9, Form design)."
    ],
    [
     "الـ Breadcrumbs بتوري إنت فين بس، لما يكون فيه اختيارات كتير.",
     "صح. الـ progress bar بيوري الـ users هما فين وفاضل إيه، على path محدد ووحيد؛ والـ breadcrumbs بتوري هما فين بس (L9, Form design).",
     "الـ Tabs بتنقلك بين sections بس مش بتوري الخطوات الفاضلة على path ثابت؛ ده شغل الـ progress bar (L9, Form design).",
     "الـ Links للتنقل، مش لعرض إنت فين. والـ guideline كمان بتقول إن الـ commands المهمة لازم تبقى buttons مش links (L9, Form design)."
    ],
    [
     "صح. الـ Prototypes بتتواصل بيها مع الـ stakeholders، والمحاضرة بتسمّي أربع audiences: colleagues وclients وusers وإنت نفسك (L9, Prototypes and fidelity).",
     "ضيق أوي: الـ users جمهور واحد بس، لكن الـ prototypes بتخدم كمان الـ colleagues والـ clients وإنت نفسك (L9, Prototypes and fidelity).",
     "الـ Managers مش في اللستة. الأربع audiences هما colleagues وclients وusers وإنت نفسك (L9, Prototypes and fidelity).",
     "الـ Competitors مش stakeholders بتعملهم prototype. الـ audiences هما colleagues وclients وusers وإنت نفسك (L9, Prototypes and fidelity)."
    ],
    [
     "الـ Wireframes مش فن: هي من غير ألوان ولا font styles عن قصد عشان التركيز يفضل على الـ structure (L9, Wireframes).",
     "صح. \"A good wireframe is not about artistic drawing, it is all about <b>organizing and communicating information clearly</b> to colleagues\" (L9, Wireframes are not art).",
     "الـ wireframe بيحدد الـ structure الأساسي للصفحة <b>قبل</b> ما الحاجات الـ visual زي الألوان تتضاف، وهو من غير ألوان عن قصد (L9, Wireframes).",
     "الـ Wireframes بتوجّه الـ stakeholders والـ users إنهم يدّوا feedback على المستوى الصح، فهي بتجيب feedback مش بتحل محله (L9, Wireframes are not art)."
    ],
    [
     "الـ Tools زي Figma و Adobe XD و Sketch و Balsamiq و Pencil بييجوا بعدين: \"make use of tools after initial iterations of paper wireframes\" (L9, Wireframing process).",
     "صح. الـ process بيبدأ \"with <b>pen and paper</b>\"، وإنت بترسم نسخ بديلة (alternative versions) لكل شاشة (5 على الأقل) (L9, Wireframing process).",
     "أول هدف هو \"reaching a design, not showing a design\"؛ إنت بتعمل iteration على كذا نسخة، فمفيش حاجة final في الأول (L9, Wireframing process).",
     "الـ Feedback بييجي بعد ما يبقى عندك sketches: إنت \"go through some iterations with feedback if available\" (L9, Wireframing process). الـ Testing مش أول خطوة في الـ wireframing."
    ],
    [
     "الـ Word ده word processor ومش موجود في لستة أدوات الـ wireframing اللي في المحاضرة (Figma, Adobe XD, Sketch, Balsamiq, Pencil) (L9, Wireframing process).",
     "الـ Photoshop مش في لستة المحاضرة؛ أداة Adobe المذكورة للـ wireframing هي <b>Adobe XD</b> (L9, Wireframing process).",
     "صح. <b>Figma</b> أول واحدة في لستة المحاضرة لأدوات الـ wireframing الشائعة: Figma, Adobe XD, Sketch, Balsamiq, Pencil (L9, Wireframing process).",
     "الـ PowerPoint ده برنامج presentations ومش من أدوات الـ wireframing اللي المحاضرة بتذكرها (L9, Wireframing process)."
    ],
    [
     "صح. الـ guidelines بتاعة الـ forms والـ navigation كلها بتدي الـ users feedback واضح على اللي عملوه: الـ form لما يتبعت بنجاح بيتأكد بـ <b>confirmation page</b>، ورسايل الـ error بتظهر جنب الـ field اللي حصل فيه الغلط، وأي حاجة بتتداس عليها بيبان عليها تغيير واضح لما تعدي عليها بالماوس (hover) (L9, Form design guidelines; L10, Navigation).",
     "الـ guidelines بتقول العكس: أكّد الـ submission الناجح بـ confirmation page، واعرض الـ errors جنب الـ field، وخلي فيه تغيير واضح على الـ hover، عشان الـ users يشوفوا نتيجة اللي عملوه على طول (L9, Form design guidelines; L10, Navigation)."
    ],
    [
     "المحاضرة بتقول إن <b>الـ wireframes مش فن</b>: الـ wireframe الكويس مش عن الرسم الفني، هو عن تنظيم المعلومات وتوصيلها بوضوح. ومقصود إن مفيهوش ألوان ولا font styles، عشان التركيز يبقى على الـ structure (L9, Wireframes are not art).",
     "صح. الـ wireframe الكويس <b>مش عن الرسم الفني</b>؛ هو كله عن تنظيم المعلومات وتوصيلها بوضوح للزملاء، ومقصود إنه يسيب الألوان والـ font styles عشان يركّز على الـ structure (L9, Wireframes; Wireframes are not art)."
    ],
    [
     "صح. في مرحلة الـ pen-and-paper، أول هدف هو <b>إنك توصل لـ design، مش إنك تعرض design</b>، والهدف التاني إنك تنقل الفكرة من دماغك للورق بأسرع ما يمكن، فمفيش تركيز على تفاصيل زي الخطوط المستقيمة والـ spacing والـ alignment (L9, Wireframing process).",
     "الـ slide بتقول ده بالظبط لمرحلة الـ pen-and-paper: توصل لـ design (مش تعرضه)، وتحط الفكرة على الورق بسرعة، ومتركزش على الخطوط المستقيمة والـ spacing والـ alignment في المرحلة دي (L9, Wireframing process)."
    ],
    [
     "صح. اتنين من أغراض الـ wireframe المذكورة هما إنه يوجّه الـ feedback للمستوى الصح (<b>الـ structure والـ function</b>، مش الألوان والـ typography) و<b>إنه يمسك المشاكل بدري</b> اللي جاية من element متنسي أو مش متنظم (L9, Wireframes are not art).",
     "الـ slide بتذكر النقطتين كأغراض للـ wireframe: feedback عن الـ structure والـ function، وإنه يمسك بدري المشاكل اللي سببها elements متنسية أو مش متنظمة (L9, Wireframes are not art)."
    ],
    [
     "المحاضرة بتقول ارسم <b>5 versions على الأقل</b> لكل شاشة على الورق وعدّي على كام iteration قبل ما تنقل لـ tools زي Figma أو Balsamiq (L9, Wireframing process).",
     "صح. لكل شاشة بترسم wireframe versions بديلة، <b>5 على الأقل</b>، وبتعدّي على iterations؛ والـ tools بتستخدمها بس بعد الـ iterations الأولانية بتاعة الـ paper wireframes (L9, Wireframing process)."
    ],
    [
     "صح. واحد من الـ wireframing industry standards هو الـ <b>proper annotation</b> بالكلام عشان الـ wireframe يبقى واضح، والـ wireframes أصلاً عن توصيل المعلومات بوضوح للزملاء والـ stakeholders (L9, Wireframing industry standards).",
     "الـ Proper annotation متذكور كـ wireframing industry standard، وبيستخدم عشان الـ wireframe يبقى واضح للناس التانية (L9, Wireframing industry standards)."
    ]
   ],
   "extra": [
    [
     "الـ Fidelity عن الـ look and feel، مش عدد الشاشات.",
     "صح. ده تعريف المحاضرة للـ fidelity.",
     "الـ Lo-fi أسرع، بس السرعة مش هي التعريف.",
     "الـ Fidelity ملهاش علاقة بعدد اللي اختبروا."
    ],
    [
     "كلام Konstan في صالح الـ prototypes اللي باينة بمجهود قليل.",
     "الـ Users واحد من الـ 4 جماهير بتوع الـ prototypes.",
     "صح. ده كلام Konstan في المحاضرة.",
     "التفاصيل الكتير بتخلي الناس تدّي feedback في مستوى <b>أقل</b> من المطلوب."
    ],
    [
     "صح. بيسيبوا الألوان والـ font styles عشان يركزوا على الـ structure (هيكل فيه placeholders).",
     "المحاضرة بتقول الـ wireframes مفيهاش ألوان ولا font styles عن قصد."
    ],
    [
     "الـ Handoff ورا بعض: الـ design يخلص، وبعدين يروح للـ development.",
     "الـ Brainstorming بيطلّع أفكار؛ مش design-development process.",
     "الـ Wireframing نشاط design، مش طريقة لتنظيم الـ design والـ development.",
     "صح. في الـ handshake process، الـ design والـ development ماشيين بالتوازي مع sync points كتير."
    ],
    [
     "صح. نصايح الـ brainstorming بتقول هدفك يبقى 20 فكرة، كل واحدة كام كلمة أو جملة، من غير ما تقيّم أو تستبعد أي واحدة (L9, Brainstorming).",
     "الـ 5 دي أقل عدد sketch versions لكل شاشة في الـ wireframing.",
     "الـ 3 دي عدد الألوان في palette بسيطة (المحاضرة الجاية)، مش أفكار.",
     "أكتر من 100 ده عدد الـ prototypes لأول ماوس من Microsoft."
    ],
    [
     "الـ guideline ليها حدود: الـ commands المهمة لازم تبقى buttons مش links، بس متعرضش كل الـ commands كـ buttons (L9, Form design).",
     "صح. الـ commands المهمة تبقى buttons مش links، بس <b>متعرضش</b> كل الـ commands كـ buttons."
    ],
    [
     "version واحدة معناها إنك ثبتّ على فكرة واحدة.",
     "صح. الـ process بيقول ارسم 5 versions على الأقل لكل شاشة.",
     "الـ 20 ده عدد الأفكار في الـ brainstorming.",
     "الـ 3 قليلين: الـ wireframing process بيقول ارسم 5 versions على الأقل لكل شاشة بالورقة والقلم (L9, Wireframing process)."
    ],
    [
     "مفيش error هنا، فـ guideline الـ error-message مش منطبقة. العيب إن اتنين calls-to-action شكلهم واحد بالظبط (L9, Form design).",
     "الـ Confirmation pages بتيجي بعد submission ناجح، وهنا مفيش حاجة اتبعتت. الزراير المتطابقة بتكسر rule الـ primary vs secondary CTA (L9, Form design).",
     "صح. مثال المحاضرة إن \"Go Pro\" يبان أكتر من \"Free Trial\".",
     "إزالة الـ repetitive actions معناها إنك تفتكر الـ preferences، وهنا مفيش حاجة بتتكرر. الزراير المتطابقة بتكسر rule الـ primary vs secondary CTA (L9, Form design)."
    ],
    [
     "الـ Progress bars لـ path واحد محدد، وبتوري فاضل إيه.",
     "الـ confirmation page بتأكد إن الـ form اتبعت بنجاح.",
     "الـ Hints بتساعد في ملو الـ fields؛ مش بتوري المكان.",
     "صح. الـ Breadcrumbs بتوري الـ users هم فين لما يكون فيه اختيارات كتير."
    ],
    [
     "في المرحلة دي الهدف إنك تنقل الفكرة من دماغك للورق بسرعة، فالمحاضرة بتقول تجاهل الخطوط المستقيمة والـ spacing والـ alignment (L9, Wireframing process).",
     "صح. الهدف إنك تنقل الفكرة من دماغك للورقة بسرعة، فتجاهل الخطوط المستقيمة والمسافات والـ alignment."
    ]
   ]
  },
  "10": {
   "notes": [
    {
     "h": "الـ Forms (تكملة)",
     "pts": [
      "<b>التزم بـ color palette بسيطة من 3 ألوان.</b> أكتر من 3 primary colors صعب وبيلخبط الـ users.",
      "<b>الـ Alert messages تبقى consistent</b> في الموقع كله. متغيرش اللون ولا الـ style ولا المكان.",
      "<b>الفرق بين Close و Cancel</b>: لو فيه button واحد بس يبقى <b>\"Close\"</b>. لو فيه اتنين (Action button وواحد للقفل) استخدم <b>\"Cancel\"</b> مش \"Close\". والـ Cancel غالباً بيبقى <b>على اليمين</b> و<b>مش لافت للنظر</b>.",
      "<b>الـ Error messages</b>:<br>• اكتب المشكلة في الـ <b>title</b><br>• اشرح باختصار <b>حصلت ليه</b> تحت الـ title<br>• ولو ينفع حط link عشان <b>يكمّل الـ task أو يرجع</b> للحالة اللي قبلها<br>• وادّي recommendations لـ <b>الخطوة الجاية</b>.",
      "<b>الـ System notice</b> فيه:<br>• زرار \"Action\"<br>• زرار \"Remind me later\"<br>• مربع \"Don't show again\".<br>ورسايل الـ notice متبقاش طويلة ولا عامة (generic)."
     ]
    },
    {
     "h": "الـ Layout",
     "pts": [
      "أهم معلومات تبقى <b>above the fold</b> (الجزء اللي باين من غير scroll).",
      "<b>المعلومات المرتبطة ببعض تتجمع</b> بـ <b>frame</b> أو <b>separator</b>.",
      "<b>اللون بيجمّع وينظّم العناصر</b> (زي fields الـ HR والـ Technical والـ Payroll).",
      "<b>العناصر المرتبطة تبقى مترتبة منطقياً</b> (First/Middle/Last name؛ Start/End date؛ Origin/Destination).",
      "الـ <b>logo بتاعك في نفس المكان في كل صفحة</b> (من غير ما يتحرك).",
      "الـ <b>background مش معقد</b> ومش بيشتت عن المحتوى."
     ]
    },
    {
     "h": "الـ Navigation",
     "pts": [
      "فيه <b>call-to-action واضح</b> بيقول للـ users يعملوا إيه بعد كده. الـ CTA ده button لافت للنظر للخطوة الجاية الأكتر انتشاراً.",
      "واضح <b>الـ users فين</b> في الموقع، مثلاً بالـ <b>breadcrumbs</b>.",
      "فيه <b>links واضحة للـ Home page والـ categories في كل صفحة</b>.",
      "<b>الـ Navigation tabs فوق</b> في الصفحة.",
      "فيه <b>تغيير واضح لما تعمل hover</b> على أي حاجة بتتداس.",
      "الـ <b>company logo بيودّي للـ homepage</b>.",
      "ارسم الـ <b>\"Red Routes\"</b>: سلسلة الصفحات أو الـ actions اللي العملاء بيستخدموها أكتر حاجة عشان يخلصوا الـ tasks."
     ]
    }
   ],
   "cards": [
    "التزم بـ color palette بسيطة من 3 ألوان.",
    "\"Close\".",
    "\"Cancel\" (مش \"Close\"): على اليمين ومش لافت للنظر.",
    "المشكلة في الـ title؛ حصلت ليه؛ link يكمّل أو يرجع؛ recommendations للخطوة الجاية.",
    "Action، و\"Remind me later\"، و\"Don't show again\".",
    "الجزء من الصفحة اللي باين من غير scroll؛ حط فيه أهم المعلومات.",
    "بـ frame أو separator أو لون.",
    "سلسلة الصفحات أو الـ actions اللي العملاء بيستخدموها أكتر حاجة عشان يخلصوا الـ tasks.",
    "نفس المكان في كل صفحة، وبيودّي للـ homepage."
   ],
   "qa": [
    "اكتب المشكلة في الـ title؛ اشرح باختصار حصلت ليه؛ ولو ينفع حط link يكمّل الـ task أو يرجع للحالة اللي قبلها؛ وادّي recommendations للخطوة الجاية.",
    "أهم المعلومات above the fold؛ جمّع المعلومات المرتبطة (frame أو separator)؛ استخدم اللون للتجميع؛ رتّب العناصر المرتبطة منطقياً؛ خلي الـ logo في نفس المكان في كل صفحة؛ وخلي الـ background بسيط.",
    "CTA واضح للي يتعمل بعد كده؛ وضّح الـ users فين (breadcrumbs)؛ links للـ Home والـ categories في كل صفحة؛ الـ tabs فوق؛ تغيير واضح في الـ hover على الحاجات اللي بتتداس؛ الـ logo بيودّي للـ homepage؛ وارسم الـ Red Routes.",
    "button واحد بس: \"Close\". اتنين buttons (action وواحد للقفل): \"Cancel\"، وغالباً على اليمين ومش لافت للنظر."
   ],
   "quiz": [
    [
     "الـ Cancel بيتستخدم لما يكون فيه كمان action button.",
     "صح. لما الـ dialog يبقى فيه button واحد بس، لازم يقول \"Close\". الـ \"Cancel\" بيستخدم بس لما يبقى فيه اتنين buttons، واحد للـ action وواحد للقفل (L10, Close vs Cancel).",
     "الـ \"Exit\" مش label موجود في الـ guideline. الـ rule هي \"Close\" لو فيه dismiss button واحد، و\"Cancel\" جنب action button (L10, Close vs Cancel).",
     "الـ \"Abort\" مش label بتستخدمه الـ guideline؛ وكمان شكله حاد وtechnical. الـ dismiss button الوحيد لازم يقول \"Close\" (L10, Close vs Cancel)."
    ],
    [
     "صح. الـ form guideline بتقول التزم بـ 3-color palette بسيطة، لأن أكتر من 3 primary colors بيبقى صعب وبيلخبط الـ users (L10, Forms).",
     "الألوان الكتير بتكسر الـ guideline: أكتر من 3 primary colors صعب وبيلخبط الـ users، فخليك على 3-color palette بسيطة (L10, Forms).",
     "لون واحد مش هو الـ rule. الـ guideline هي 3-color palette بسيطة؛ الحد إنك متعديش 3 (L10, Forms).",
     "الـ 7 أكتر من ضعف الحد. أكتر من 3 primary colors بيلخبط الـ users، فالـ guideline بتقول 3-color palette بسيطة (L10, Forms)."
    ],
    [
     "ضيق أوي: \"above the fold\" هو كل اللي باين من غير scrolling، مش الـ header بس. المعلومات الأهم بتتحط هناك (L10, Layout).",
     "صح. حط أهم المعلومات هناك.",
     "العكس: الـ footer عادةً بيبقى below the fold، مش باين لحد ما تعمل scroll. الـ Above the fold هو الجزء اللي باين من غير scrolling (L10, Layout).",
     "مفيش حاجة متطبّقة: \"the fold\" هو الحافة اللي تحت لأول شاشة، واللي فوقها هو اللي الـ users بيشوفوه من غير scrolling (L10, Layout)."
    ],
    [
     "الـ Red Routes ملهاش علاقة بالـ errors. هي سلسلة الصفحات أو الـ actions اللي الـ customers بيستخدموها أكتر حاجة عشان يخلّصوا الـ tasks (L10, Navigation).",
     "صح. إنك تعمل map للـ \"Red Routes\" معناه تحدد سلسلة الصفحات أو الـ actions اللي الـ customers بيستخدموها أكتر حاجة عشان يخلّصوا الـ tasks، عشان الـ navigation يدعمها (L10, Navigation).",
     "كلمة \"Red\" ملهاش علاقة بلون الـ link: الـ Red Routes هي أشهر paths من الصفحات أو الـ actions اللي الـ customers بيستخدموها عشان يخلّصوا الـ tasks (L10, Navigation).",
     "الـ Red Routes هي الـ paths اللي الـ customers بيستخدموها أكتر، مش paths ممنوعين منها (L10, Navigation)."
    ],
    [
     "صح. واحدة من الـ navigation guidelines إن الـ company logo يبقى link للـ homepage (والـ layout rule بتخليه في نفس المكان في كل صفحة) (L10, Navigation).",
     "الـ Navigation tabs مكانها فوق في الصفحة، مش تحت (L10, Navigation).",
     "الـ guideline بتقول العكس: لازم يبقى فيه تغيير واضح في الـ hover على أي حاجة clickable، عشان الـ users يعرفوا إنها بتتداس (L10, Navigation).",
     "links الـ Home والـ categories مكانها في كل صفحة."
    ],
    [
     "صح. أول error-message guideline إنك تقول المشكلة في الـ title، وبعدين تقول باختصار حصلت ليه، وتحط link تكمّل بيه أو ترجع، وتقترح الخطوة الجاية (L10, Forms).",
     "الـ stack trace الطويل مش شرح مختصر. الـ guideline بتقول اكتب المشكلة في الـ title، وبعدين اشرح باختصار حصلت ليه (L10, Forms).",
     "الاعتذار مش من الـ error-message guidelines. أول خطوة إنك تقول المشكلة في الـ title (L10, Forms).",
     "قفل الـ app بيضيّع شغل الـ user. الـ guidelines عايزة link يكمّل الـ task أو يرجع للـ state اللي قبلها، مع اقتراح الخطوة الجاية (L10, Forms)."
    ],
    [
     "الـ guideline بتقول يمين ومش لافت للنظر.",
     "صح. الـ Cancel غالباً بيتحط على اليمين ومش ملفت للنظر، عشان الـ action button هو اللي ياخد انتباه الـ user (L10, Close vs Cancel).",
     "أعلى الصفحة مش مكان زراير الـ dialog. الـ Cancel غالباً بيتحط على اليمين ومش ملفت للنظر (L10, Close vs Cancel).",
     "الـ Cancel لازم يفضل باين، بس مش ملفت، وعادةً على اليمين؛ لو استخبى الـ users مش هيعرفوا يقفلوا (L10, Close vs Cancel)."
    ]
   ],
   "extra": [
    [
     "صح. لما يكون فيه اتنين buttons (action وواحد للقفل)، استخدم \"Cancel\" مش \"Close\".",
     "\"Close\" بتتستخدم بس لما يكون فيه button واحد.",
     "قاعدة المحاضرة إنها \"Cancel\" جنب الـ action button.",
     "الـ button ده تبع الـ system notice، مش confirmation dialog."
    ],
    [
     "ده جزء من أجزاء الـ system notice.",
     "صح. رسايل الـ notice متبقاش طويلة ولا generic.",
     "ده جزء من أجزاء الـ system notice.",
     "ده جزء من أجزاء الـ system notice."
    ],
    [
     "ده بيكسر الـ guideline بتاعة الـ consistency.",
     "صح. الـ Alert messages لازم تبقى consistent في الموقع كله؛ متغيرش اللون ولا الـ style ولا المكان."
    ],
    [
     "إنك تشرح باختصار الـ error حصل ليه، تحت الـ title، دي تاني error-message guideline، فهي مش الإجابة (L10, Forms).",
     "الـ link اللي يكمّل الـ task أو يرجع للـ state اللي قبلها ده guideline مذكورة، فهي مش الإجابة (L10, Forms).",
     "صح. الـ guidelines بتقول اكتب المشكلة في الـ title واشرح حصلت ليه.",
     "اقتراح الخطوة الجاية ده آخر error-message guideline، فهو مش الإجابة (L10, Forms)."
    ],
    [
     "المشكلة في ترتيب الـ fields، مش في إنها باينة ولا لأ.",
     "مفيش حاجة في السيناريو عن الألوان.",
     "مفيش حاجة في السيناريو عن الـ logo.",
     "صح. الأسامي لازم تترتب First/Middle/Last، مش تتلخبط مع fields تانية."
    ],
    [
     "صح. الـ logo مينفعش يتحرك من صفحة للتانية.",
     "المشكلة في مكان الـ logo، مش الـ background.",
     "الـ Red Routes هي الـ paths اللي العملاء بيستخدموها أكتر، مش مكان الـ logo.",
     "ده عن buttons الـ dialog، مش عن الـ logo."
    ],
    [
     "صح. دي واحدة من الـ navigation guidelines.",
     "المحاضرة بتذكر التغيير الواضح في الـ hover كـ navigation guideline."
    ],
    [
     "الـ Fonts مش طريقة التجميع في المحاضرة.",
     "صح. المعلومات المرتبطة بتتجمع بـ frame أو separator.",
     "الـ fold عن اللي باين من غير scroll، مش عن التجميع.",
     "مش كل الـ commands تبقى buttons، والـ buttons مش بتجمّع معلومات."
    ],
    [
     "الـ Links للـ Home والـ categories في كل صفحة دي guideline لوحدها. الـ CTA هو button ملفت للنظر لأشهر خطوة جاية (L10, Navigation).",
     "الـ Breadcrumbs بتوري الـ users فين، مش يعملوا إيه بعد كده.",
     "صح. الـ CTA الواضح بيقول للـ users يعملوا إيه بعد كده.",
     "الـ Alert messages بتبلّغ الـ users؛ مش هي الـ CTA."
    ],
    [
     "ده ضد الـ layout guideline.",
     "صح. الـ background ميبقاش معقد وميشتتش عن المحتوى."
    ]
   ]
  }
 },
 "exams": [
  {
   "sections": [
    {
     "items": [
      {
       "why": "الـ Papers والـ studies دي حد تاني عملها، يبقى ده secondary research (L2).",
       "ow": [
        null,
        "الـ Papers والـ studies اللي فاتت حد تاني هو اللي عملها، وده بالظبط تعريف المحاضرة للـ secondary research (كتب، journals). الـ Primary هو الـ research اللي إنت بتعمله بنفسك (L2)."
       ]
      },
      {
       "why": "الـ Tactical (design) research بيحصل <b>أثناء</b> الـ design. الـ research اللي بييجي بعد الـ launch اسمه post-launch research (L2).",
       "ow": [
        "الـ Tactical (design) research بيحصل <b>أثناء</b> مرحلة الـ design، باستخدام feedback على الـ prototypes. الـ research اللي بعد الـ launch اسمه post-launch research (L2, Types by WHEN).",
        null
       ]
      },
      {
       "why": "معكوس. الـ Low-fidelity prototypes هي اللي أسرع وأسهل وأرخص (L9).",
       "ow": [
        "مقلوبة: الـ low-fidelity prototypes هي اللي أسرع وأسهل وأرخص، وعشان كده بتبدأ lo-fi وتنقل لـ hi-fi بعدين (L9, Power of lo-fi).",
        null
       ]
      },
      {
       "why": "المقارنة حاطة \"easier to coordinate the logistics\" تحت الأفراد (L7).",
       "ow": [
        null,
        "جدول individuals vs groups حاطط \"easier to coordinate the logistics\" كميزة للـ individual interviews، فالجملة صح (L7)."
       ]
      },
      {
       "why": "خلي الـ surveys صغيرة على قد ما تقدر. الأسئلة الكتير بتقلل الـ response rate والـ reliability (L5).",
       "ow": [
        "الـ surveys الطويلة بتضر: النصيحة إنك تخلي الـ survey صغير على قد ما تقدر، لأن الأسئلة الكتير بتقلل الـ response rate والـ reliability (L5, Surveys).",
        null
       ]
      },
      {
       "why": "ده الـ UI design. الـ UX هو التجربة الكاملة (L1).",
       "ow": [
        "الـ Interactivity والـ look and feel بتوع الشاشة أو الصفحة دول الـ UI design. الـ UX design هو التجربة الكاملة للـ user مع المنتج أو الموقع (L1, UI vs UX vs HCI).",
        null
       ]
      },
      {
       "why": "الـ Surveys مذكورة ضمن الطرق الـ primary المنتشرة (L2).",
       "ow": [
        null,
        "الـ Surveys واحدة من طرق الـ primary research في المحاضرة، مع الـ interviews والـ focus groups والـ usability studies والـ observations، عشان إنت اللي بتعملها بنفسك (L2)."
       ]
      },
      {
       "why": "الكورس كله عن الـ user-centered design: دخّل الـ users من بدري وكتير، والـ prototypes معمولة أصلاً عشان تاخد feedback (L2، L8).",
       "ow": [
        "الـ User-centered design محتاج الـ users في كل خطوة: \"you need users early and often\"، والـ prototypes معمولة أصلاً عشان تجيب feedback وتعمل iterate (L2; L8).",
        null
       ]
      },
      {
       "why": "الـ Focus groups والـ interviews الاتنين في لستة الطرق الـ primary في المحاضرة (مع الـ surveys والـ usability studies والـ observations)، عشان إنت اللي بتعملهم بنفسك (L2, Types by WHO).",
       "ow": [
        null,
        "الـ Focus groups والـ interviews الاتنين في لستة الطرق الـ primary في المحاضرة، عشان إنت اللي بتعملهم بنفسك (L2, Types by WHO)."
       ]
      },
      {
       "why": "الـ data الأرقام دي quantitative. الـ Qualitative عن ليه وإزاي (L5).",
       "ow": [
        "الـ data الرقمية (measures، counts) دي quantitative. الـ Qualitative research هو ملاحظات عن ليه وإزاي الحاجات بتحصل، وغالباً بييجي من الـ interviews (L5, Types by WHAT).",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Privacy بتحمي الـ PII والـ SPII بتوع الـ users. باقي الاختيارات ملهاش علاقة أو عكس الـ privacy.",
       "ow": [
        null,
        "الـ Privacy مش بتسرّع الـ research: الـ guidelines بتضيف حرص (اجمع اللي محتاجه بس، متربطوش بـ PII/SPII، امسحه بعد الاستخدام) (L5).",
        "ده عكس الـ privacy: المفروض تجمع الـ data اللي محتاجها بس، وتفصلها عن الـ PII/SPII، وتمسحها لما متبقاش محتاجها (L5).",
        "الـ Privacy مش بديل لأي research method؛ الـ interviews لسه مطلوبة. هي مهمة عشان بتحمي الـ user data (L5)."
       ]
      },
      {
       "why": "خطط من بدري، بس \"الـ script مش كتاب مقدس\". اعمل combination من الـ methods وخلي الـ privacy أساسية.",
       "ow": [
        null,
        "المحاضرة بتقول إن التخطيط مش معناه التشدد: \"the script is not a bible\"، فعدّل وإنت في الـ session (L5, General tips).",
        "الـ methods لازم تتجمع بترتيب مناسب، والـ qualitative research هو اللي بيدّي فهم حقيقي، فالـ quantitative بس غلط (L5).",
        "الـ Privacy والـ security بتوع الـ user data متصنفين essential، فعمرك ما تضحي بيهم عشان الراحة (L5, General tips)."
       ]
      },
      {
       "why": "L5: الـ quantitative (data أرقام) \"easier for engineers and technical people to handle\" يعني أسهل للـ engineers والناس الـ technical.",
       "ow": [
        "المحاضرة مخصّتش الـ designers؛ قالت إن الـ quantitative research (الرقمي) أسهل على الـ engineers والناس الـ technical (L5).",
        null,
        "الـ Marketing teams مش مذكورين. الـ Quantitative research أسهل على الـ engineers والناس الـ technical (L5, Types by WHAT).",
        "الأطفال ملهمش علاقة بالنقطة دي. الـ Quantitative research متقال عليه إنه أسهل على الـ engineers والناس الـ technical (L5)."
       ]
      },
      {
       "why": "خليه صغير، وواضح، وخلي بالك من الـ bias، وخد feedback من المشاركين.",
       "ow": [
        "ده عكس النصايح: خلي الـ surveys صغيرة على قد ما تقدر والأسئلة مختصرة، لأن الـ surveys الطويلة بتضر الـ response rate والـ reliability (L5; L6).",
        null,
        "الـ Research لازم يتخطط له بدري؛ survey من غير تخطيط بيكسر الـ general research tips (L5, General tips).",
        "المحاضرة بتقول سيب الأسئلة المفتوحة مفتوحة واعمل combination من الـ methods، فالأسئلة الـ quantitative بس مش هي المبدأ (L6, Be Unbiased)."
       ]
      },
      {
       "why": "نفس سؤال رقم 1، متطبع مرتين في الورقة.",
       "ow": [
        null,
        "الـ Privacy مش بتسرّع الـ research: الـ guidelines بتضيف حرص (اجمع اللي محتاجه بس، متربطوش بـ PII/SPII، امسحه بعد الاستخدام) (L5).",
        "ده عكس الـ privacy: المفروض تجمع الـ data اللي محتاجها بس، وتفصلها عن الـ PII/SPII، وتمسحها لما متبقاش محتاجها (L5).",
        "الـ Privacy مش بديل لأي research method؛ الـ interviews لسه مطلوبة. هي مهمة عشان بتحمي الـ user data (L5)."
       ]
      },
      {
       "why": "الـ wireframe هيكل فيه placeholders ومفيهوش ألوان ولا fonts عن قصد.",
       "ow": [
        "الـ Wireframes مفيهاش ألوان ولا font styles عن قصد؛ عرض الـ visual design النهائي ده شغل الـ hi-fi prototypes (L9, Wireframes).",
        "الـ Wireframes ملهاش علاقة بالـ backend؛ هي schematic للـ outline الأساسي للشاشة (L9, Wireframes).",
        null,
        "الـ Wireframes بتترسم (ورقة وقلم، وبعدين Figma وBalsamiq…)، مش بتتكتب code، وبتيجي قبل الـ visual design والـ code (L9)."
       ]
      },
      {
       "why": "المحاضرة بتذكر Figma و Adobe XD و Sketch و Balsamiq و Pencil.",
       "ow": [
        "الـ Visual Studio والـ Eclipse دول IDEs للـ code. أدوات الـ wireframing في المحاضرة هي Figma وAdobe XD وSketch وBalsamiq وPencil (L9).",
        "الـ Word والـ Excel أدوات office، مش في اللستة. أدوات الـ wireframing هي Figma وAdobe XD وSketch وBalsamiq وPencil (L9).",
        null,
        "الـ Final Cut Pro والـ Premiere برامج مونتاج فيديو. أدوات الـ wireframing هي Figma وAdobe XD وSketch وBalsamiq وPencil (L9)."
       ]
      },
      {
       "why": "الـ Lo-fi سريع ورخيص وبياخد constructive feedback أكتر.",
       "ow": [
        "العكس: الـ lo-fi prototypes أسرع وأسهل وأرخص، ودي بالظبط قوتها (L9, Power of lo-fi).",
        "الـ UI المفصّل والواقعي ده high fidelity، قريب جداً من الـ look and feel النهائي؛ الـ lo-fi prototypes مجرد sketches تقريبية (L9).",
        null,
        "الـ Lo-fi مش بديل للـ hi-fi: بتبدأ بالـ lo-fi وبتنقل للـ hi-fi وإنت ماشي في الـ design (L9, Prototypes and fidelity)."
       ]
      },
      {
       "why": "الـ Observation ده primary (إنت اللي بتعمله) و qualitative (إزاي وليه). الـ statistics والأرقام quantitative، والـ logs الموجودة مش data متجمعة جديد.",
       "ow": [
        "الـ Statistical analysis بيشتغل على أرقام، فهو quantitative مش qualitative، حتى لو الـ survey نفسه كان primary (L5, Types by WHAT).",
        "الـ Data اللي طبيعتها رقمية دي تعريف الـ quantitative research، عكس اللي السؤال عايزه (L5, Types by WHAT).",
        null,
        "الـ system logs الموجودة دي data موجودة أصلاً، مش إنت اللي جمعتها من study، وكمان الـ logs أغلبها counts (quantitative)، مش ليه وإزاي (L5)."
       ]
      },
      {
       "why": "L5: \"effort should be done before the interview to write a script of the questions\" يعني لازم تتعب قبل الـ interview وتكتب script بالأسئلة.",
       "ow": [
        "المحاضرة بتقول خطط بدري واكتب script بالأسئلة بدل ما تسأل أسئلة عشوائية (L5, General tips).",
        null,
        "تجاهل الـ context مش خطوة تحضير. الـ researchers لازم يخططوا بدري بـ script فيه الأسئلة (L5, General tips).",
        "الـ User research عن احتياجات الـ users والـ pain points بتاعتهم، مش التفاصيل الـ technical بس. خطوة التحضير هي كتابة script بالأسئلة (L5)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الجدول اللي في L5 slide 6 هو بالظبط المطلوب. ارسمه.",
       "ans": "<table><tr><th></th><th>Primary</th><th>Secondary</th></tr><tr><td>مين بيجمعه</td><td>إنت (أو حد إنت مأجّره)</td><td>حد تاني</td></tr><tr><td>أمثلة</td><td>Surveys، focus groups، interviews، observations، experiments</td><td>بتبص على data موجودة: كتب، journals، reports</td></tr><tr><td>Qual. ولا quant.؟</td><td>أي واحد فيهم</td><td>أي واحد فيهم</td></tr><tr><td>الميزة</td><td>specific لاحتياجاتك؛ وإنت متحكم في الـ quality</td><td>غالباً رخيص وسريع</td></tr><tr><td>العيب</td><td>بيكلّف أكتر وبياخد وقت أطول</td><td>ممكن يكون قديم أوي أو مش specific كفاية</td></tr></table>"
      },
      {
       "why": "اذكر الـ 6 principles وادّي مثال \"متسألش كده / اسأل كده بدلها\" لكل واحد. كده تغطي الدرجات.",
       "ans": "<b>Be Clear</b>: اكتب labels للـ numeric scales (1 = Highly dissatisfied … 5 = Highly satisfied)؛ تجنب الـ ranges المتداخلة (0-2، 3-5، 6-10)؛ زوّد تفاصيل لو شاكك؛ اعمل timebox للتكرار (\"in the past seven days…\").<br><b>Be Concise</b>: لغة بسيطة (\"How clean was the car?\").<br><b>Be Specific</b>: تجنب الأفكار الكبيرة أوي؛ تجنب الـ double-barrel questions (قسّم \"speed and availability\")؛ تجنب الـ internal conflict (قسّم \"food\" لـ temperature و appearance و flavor).<br><b>Be Expressive</b>: ركّز على الآراء (\"too high, too low, or about right?\")؛ ranges بدل yes/no؛ مستويات موافقة؛ اسمح بأكتر من اختيار.<br><b>Be Unbiased</b>: ضيف \"Other: ___\"؛ سيب الأسئلة المفتوحة مفتوحة؛ تجنب الـ leading questions؛ تجنب الكلمات الـ loaded (\"wasted\" تبقى \"spent\").<br><b>Be Usable</b>: progress bar، طول صفحات ثابت، ترتيب منطقي، تنبيه على الأسئلة اللي متجاوبتش، اعمل preview للـ survey."
      },
      {
       "why": "من L2 slides 11–12.",
       "ans": "<b>1. Foundational (strategic / generative)</b>: قبل ما أي حاجة تتصمم. بيحدد مشاكل الـ users وإيه اللي هيتبني عن طريق الكلام مع الـ users عن الـ pain points بتاعتهم، وبيطلّع فرص الفريق مكانش هيفكر فيها.<br><b>2. Tactical (design)</b>: أثناء مرحلة الـ design. بيقول المنتج يتبني إزاي، باستخدام user feedback على الـ prototypes.<br><b>3. Post-launch</b>: بعد الـ release. هل نجحنا؟ هل الـ system بيلبّي احتياجات الـ users؟"
      },
      {
       "why": "من L9 slide 11 (رسمة الـ timeline: نقطة تسليم واحدة ضد sync points كتير).",
       "ans": "<b>Handoff process</b>: مرحلة الـ design بتخلص خالص، وبعدين الـ design بيتسلّم للـ development (ورا بعض، نقطة تسليم واحدة).<br><b>Handshake process</b>: الـ design والـ development ماشيين <b>بالتوازي</b> وبيعملوا sync في نقط كتير أثناء المشروع، فالمشاكل بتتمسك بدري."
      }
     ]
    },
    {
     "items": [
      {
       "why": "الدرجات بتيجي من إنك تطبّق guidelines المحاضرات: user research، wireframes، forms، layout و navigation (L9–L10). اذكر اسم الـ guideline جنب كل قرار design.",
       "ans": "<b>1. ابدأ من الـ user research.</b> كبار السن محتاجين <b>text كبير و touch targets كبيرة</b> (زي case الـ truckers). خلي عدد الخطوات قليل واللغة بسيطة.<br><b>2. الـ Home screen (above the fold):</b> الـ logo فوق على الشمال (في نفس المكان في كل شاشة، وبيودّي للـ home)؛ <b>search bar</b> كبير (\"Search doctor, specialty…\")؛ أيقونات الـ specialties في grid (Cardiology، Dentistry…)؛ card \"My upcoming appointment\"؛ و<b>tab bar</b> تحت: Home · Search · Appointments · Profile.<br><b>3. قايمة الدكاترة:</b> filters (specialty، المنطقة، السعر، الـ rating)؛ كل card فيها صورة، اسم، specialty، rating، أقرب ميعاد فاضي، و<b>primary CTA \"Book\"</b>.<br><b>4. الـ Booking flow</b> (path ثابت، فاستخدم <b>progress bar</b>: Doctor ← Date/Time ← Details ← Confirm)؛ افتكر data المريض (<b>remove repetitive actions</b>)؛ fields فيها <b>hints و formats</b>؛ و<b>الـ errors جنب الـ field</b> مع border أحمر.<br><b>5. Confirmation page</b> بعد الحجز (\"Appointment booked with Dr. X, Sun 10:00\") مع \"Add to calendar\".<br><b>6. إلغاء الميعاد:</b> dialog فيه action button \"Cancel appointment\" و button \"Keep\" secondary مش لافت للنظر على اليمين؛ و alert style ثابت.<br><b>7. القواعد الـ visual:</b> palette من 3 ألوان، background بسيط، المعلومات المرتبطة متجمعة بـ frames، وفرق واضح بين الـ primary والـ secondary CTA.<br><b>8. الأدوار التانية:</b> الدكاترة والـ admins ليهم schedule view (يوم/أسبوع) وشاشة manage-slots.<br><b>9. الـ Process:</b> ارسم 5+ paper wireframes لكل شاشة، اختبر مع المرضى وكبار السن، اعمل iteration، وبعدين اعمل hi-fi على Figma."
      }
     ]
    }
   ]
  },
  {
   "sections": [
    {
     "items": [
      {
       "why": "الـ User research بيغطي الـ users <b>و</b>الـ tasks بتاعتهم (L1).",
       "ow": [
        null,
        "الـ User research معناه إنك تتعلم عن الـ users <b>و</b>الـ tasks اللي بيحاولوا يخلّصوها، والـ user في الحقيقة بيتعامل مع الـ task، مش الـ system (L1)."
       ]
      },
      {
       "why": "L2 بتقول إن الـ tactical research \"takes place during the design phase\" يعني أثناء الـ design. اللي بعد الـ design phase يبقى post-launch research. الـ key غالباً كاتب \"after\" بشكل مش دقيق؛ جاوب من المحاضرة إلا لو الدكتور قال غير كده.",
       "ow": [
        "الـ Tactical (design) research بيحصل <b>أثناء</b> مرحلة الـ design، باستخدام feedback على الـ prototypes. اللي بييجي بعدها اسمه post-launch research (L2, Types by WHEN).",
        null
       ]
      },
      {
       "why": "مقلوبة. الـ Low-fidelity prototypes هي اللي أسرع وأسهل وأرخص؛ والـ hi-fi مش ممكن أصلاً في الأول عشان التفاصيل لسه متحددتش (L9, Power of lo-fi).",
       "ow": [
        "مقلوبة: الـ low-fidelity prototypes هي اللي أسرع وأسهل وأرخص، وعشان كده بتبدأ lo-fi وتنقل لـ hi-fi بعدين (L9, Power of lo-fi).",
        null
       ]
      },
      {
       "why": "المحاضرة بتوصف الـ interview إنه أشهر research technique، ومتقدّر عشان بيدّي فهم أعمق من خلال أسئلة \"why\" المفتوحة والـ follow-ups (L7, Interviews).",
       "ow": [
        null,
        "المحاضرة بتبدأ جزء الـ interviews بإنها بتسمّي الـ interview أشهر research technique، فالجملة صح (L7, Interviews)."
       ]
      },
      {
       "why": "الأفراد أسهل في تنسيق الـ logistics.",
       "ow": [
        null,
        "جدول individuals vs groups حاطط \"easier to coordinate the logistics\" كميزة للـ individual interviews، فالجملة صح (L7)."
       ]
      },
      {
       "why": "الـ research اللي حد تاني عمله اسمه secondary. الـ Primary هو اللي إنت بتعمله بنفسك.",
       "ow": [
        "الـ research اللي حد تاني عمله (كتب، journals) ده secondary research. الـ Primary research هو اللي إنت بتعمله بنفسك، زي الـ interviews والـ surveys (L2).",
        null
       ]
      },
      {
       "why": "المبدأ هو \"Be UNbiased\". الـ key غالباً معتبرها typo وأصلها \"Be unbiased\". بس زي ما هي مكتوبة، الجملة غلط.",
       "ow": [
        "واحد من الـ six principles هو \"Be Unbiased\" (ابعد عن الأسئلة الـ leading والـ loaded، واسمح بـ \"Other\")، فإنك تبقى biased عمره ما يبقى كويس للـ survey (L6).",
        null
       ]
      },
      {
       "why": "الـ Interactivity والـ look and feel بتوع الشاشة أو الصفحة ده تعريف الـ UI design. الـ UX design هو التجربة الكاملة للـ user مع المنتج أو الموقع (L1, UI vs UX vs HCI).",
       "ow": [
        "الـ Interactivity والـ look and feel بتوع الشاشة أو الصفحة دول الـ UI design. الـ UX design هو التجربة الكاملة للـ user مع المنتج أو الموقع (L1, UI vs UX vs HCI).",
        null
       ]
      },
      {
       "why": "ده تعريف الـ PII في المحاضرة: تفاصيل ممكن تعرّف الـ user، وأمثلتها الأسامي وعنوان البيت والـ email address ورقم التليفون (L5, Privacy and security).",
       "ow": [
        null,
        "الجملة مطابقة لتعريف الـ PII في المحاضرة: تفاصيل ممكن تعرّف الـ user، زي الأسامي وعنوان البيت والـ email ورقم التليفون (L5)."
       ]
      },
      {
       "why": "الـ Surveys من أرخص الطرق؛ الـ interviews محتاجة وقت لكل شخص و incentives.",
       "ow": [
        "مقلوبة: الـ surveys من أرخص الطرق، أما الـ interviews فأغلى عشان هي synchronous واللي بنعملهم interview بيستنوا incentives (L5; L7).",
        null
       ]
      },
      {
       "why": "ده تعريف L1 بالحرف: الـ HCI هو التفاعل بين الـ user والـ computer، أو العلاقة بين الـ users والـ computer systems (L1, What is HCI?).",
       "ow": [
        null,
        "ده تعريف المحاضرة بالحرف: الـ HCI هو التفاعل بين الـ user والـ computer، أو العلاقة بين الـ users والـ computer systems (L1)."
       ]
      },
      {
       "why": "التجربة الكاملة للـ user مع المنتج أو الموقع دي الـ UX design. الـ UI design هو بس الـ interactivity والـ look and feel بتوع الشاشة أو الصفحة (L1, UI vs UX vs HCI).",
       "ow": [
        "التجربة الكاملة مع المنتج أو الموقع دي الـ UX design. الـ UI design هو الـ interactivity والـ look and feel بتوع الشاشة أو الصفحة (L1, UI vs UX vs HCI).",
        null
       ]
      },
      {
       "why": "L1 بتقول \"software development is research\": يعني مش بس إنك تعمل software، لكن كمان إنك تتعلم إزاي تعمل الـ software الأنسب للغرض بتاعه (L1, UI design process).",
       "ow": [
        null,
        "الجملة مأخوذة من نقطة المحاضرة إن \"software development is research\": إنك تتعلم إزاي تبني الـ software الأنسب للغرض بتاعه (L1)."
       ]
      },
      {
       "why": "ده تعريف المحاضرة للـ prototype الكويس: بيسمح بـ feedback مفيد (constructive) وبالـ iteration، ومش لازم يشبه الـ final product (L8, Prototyping).",
       "ow": [
        null,
        "ده تعريف المحاضرة للـ prototype الكويس: اللي بيسمح بـ feedback مفيد وconstructive وبالـ iteration على الـ design (L8, Prototyping)."
       ]
      },
      {
       "why": "الـ data الرقمية (measures، counts) دي quantitative research. الـ Qualitative research هو ملاحظات عن ليه وإزاي الحاجات بتحصل، وغالباً بييجي من الـ interviews (L5, Types by WHAT).",
       "ow": [
        "الـ data الرقمية (measures، counts) دي quantitative. الـ Qualitative research هو ملاحظات عن ليه وإزاي الحاجات بتحصل (L5, Types by WHAT).",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ HCI (Human Computer Interaction) والـ HMI (Human Machine Interaction) والـ MMI (Man Machine Interaction) بيتقالوا بالتبادل لنفس المجال، فالتلاتة صح (L1, What is HCI?).",
       "ow": [
        "الـ Human Computer Interaction هو الـ HCI نفسه، بس الـ HMI والـ MMI مصطلحات صح برضه، فلو اخترت ده بس تبقى ناقصة (L1).",
        "الـ HMI مصطلح منهم، بس الـ HCI والـ MMI كمان، فالإجابة الكاملة \"All the above\" (L1).",
        "الـ MMI مصطلح منهم، بس الـ HCI والـ HMI كمان، فالإجابة الكاملة \"All the above\" (L1).",
        null
       ]
      },
      {
       "why": "الأسامي والعنوان والـ email دول PII عادي. أرقام الحسابات المالية هي الـ SPII.",
       "ow": [
        "الأسامي دي PII عادي: بتعرّف الـ user بس مش في اللستة الـ sensitive (SSN، license، passport، الحسابات المالية، تاريخ الميلاد) (L5).",
        "عنوان البيت متصنّف PII مع الأسامي والـ email والتليفون؛ مش من أمثلة الـ SPII (L5, Privacy and security).",
        "الـ Email address ده PII عادي في لستة المحاضرة. الـ SPII هي data لو ضاعت ممكن تسبب ضرر مالي أو إحراج أو تمييز (L5).",
        null
       ]
      },
      {
       "why": "\"Tips for good interview\" في L7 بتبدأ بـ \"Plan ahead and prepare your questions before the interview time\"، و L5 بتقول اكتب interview script. كلام المحاضرة بيطابق \"Interview\". الـ key معلّم على Survey، فاذكر جملة المحاضرة لو اتسألت.",
       "ow": [
        null,
        "الـ Surveys لازم يتخطط لها برضه، بس الجملة دي نصيحة الـ interview: \"Plan ahead and prepare your questions before the interview\" (L7). وبيتقال إن الـ key الرسمي معلّم على الاختيار ده.",
        "الـ Observation مش موضوع الجملة دي. النصيحة المقتبسة من tips الـ interview: حضّر أسئلتك قبل الـ interview (L7).",
        "الإجابة موجودة في المحاضرة: tips الـ interview بتبدأ بـ \"Plan ahead and prepare your questions before the interview\" (L7)."
       ]
      },
      {
       "why": "اسمع كويس واكتب notes هما المفتاحين. و(b) عكس النصيحة الحقيقية.",
       "ow": [
        "الـ Listen well واحدة من الحاجتين الأساسيتين أثناء الـ interview، بس الـ take notes هي التانية، فالإجابة الكاملة \"a & c\" (L7).",
        "ده عكس النصيحة الحقيقية: المحاضرة بتقول <b>سيب</b> شوية وقت بين الـ interviews (L7, Tips for a good interview).",
        "الـ Take notes واحدة من الحاجتين الأساسيتين، بس الـ listening well هي التانية، فالإجابة الكاملة \"a & c\" (L7).",
        null
       ]
      },
      {
       "why": "أوصاف اللي بنعملهم interview بتشرح ليه وإزاي الحاجات بتحصل، وده تعريف المحاضرة للـ qualitative data؛ أما الـ quantitative data فرقمية (measures، counts) (L5, Types by WHAT).",
       "ow": [
        "الـ Quantitative data رقمية (measures، counts). أوصاف اللي بنعملهم interview بتشرح ليه وإزاي، فهي qualitative (L5).",
        null,
        "الـ \"Average data\" مش نوع research data. حسب الـ WHAT، الـ data يا quantitative (أرقام) يا qualitative (ليه وإزاي) بس (L5).",
        "الـ \"Gathering data\" مجرد تجميع data، مش نوع data. الأوصاف اللي جاية من الـ interviews دي qualitative data (L5)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "جدول المقارنة في L5.",
       "ans": "الـ Primary: إنت اللي بتجمعه (surveys، focus groups، interviews، observations، experiments)؛ specific لاحتياجاتك وإنت متحكم في الـ quality؛ بيكلّف أكتر وبياخد وقت أطول.<br>الـ Secondary: حد تاني جمعه (data موجودة، كتب، journals)؛ رخيص وسريع؛ ممكن يكون قديم أوي أو مش specific كفاية.<br>والاتنين ممكن يبقوا qualitative أو quantitative."
      },
      {
       "why": "ده تمرين L6. الـ labels بتاعة إجاباته كانت: ambiguous scale، changing number of options، reversing scale، leading questions، yes/no questions.",
       "ans": "<b>(i)</b> <b>سؤال yes/no</b> (مش expressive). استخدم ranges: \"In the past seven days, how much time have you spent on social media? 0 / &lt;1 / 1-2 / 3-5 / 6-9 / 10+ hours\".<br><b>(ii)</b> <b>Leading question</b>: بيفترض إن الشخص بيحب التمرين. اسأل \"How do you feel about exercising?\" أو اسأل الأول هو بيتمرن ولا لأ.<br><b>(iii)</b> <b>Loaded question</b>: كلمة \"wasted\" فيها حكم. استخدم \"spent\".<br><b>(iv)</b> <b>Scale مش واضح / معكوس</b>: إن 1 = \"a lot\" ماشي عكس الاتجاه المعتاد من الصغير للكبير، والـ scale من 4 نقط مفيهوش نص محايد.<br><b>(v)</b> <b>عدد الـ options بيتغير</b> (6 هنا ضد 4 في iv) و<b>اتجاه الـ scale معكوس</b> مقارنة بـ (iv). خلي طول الـ scale واتجاهه ثابتين في الـ survey كله."
      },
      {
       "why": "L7 slide 4، وهي كمان الإجابة الرسمية.",
       "ans": "خطط من بدري وجهّز أسئلتك قبل الـ interview.<br>أثناء الـ interview، فيه مفتاحين للنجاح:<br>• اسمع كويس: الـ user هو اللي المفروض يتكلم أغلب الوقت.<br>• اكتب notes: واحد يسأل والتاني يكتب (الـ audio recording مش كفاية)؛ اكتب المشاعر وردود الفعل ونبرة الصوت.<br>سيب شوية وقت بين الـ interviews."
      },
      {
       "why": "L9 slides 5–6.",
       "ans": "• الـ Lo-fi prototypes أسرع وأسهل وأرخص في إنك تعملها.<br>• الـ Hi-fi مش عملي في الأول لأن القرارات عن تفاصيل كتير لسه متاخدتش.<br>• الناس بتبقى مستعدة تتكلم أكتر بكتير لما تديهم sketch من حاجة شكلها خلصان.<br>• Konstan: الـ prototype اللي باين إنه بمجهود قليل (مرسوم بالإيد) بيطلّع constructive feedback أهم وأكتر.<br>• التفاصيل الكتير بتخلي الناس تدّي feedback في مستوى أقل من المطلوب.<br>• Google: في الأول اعرض أفكار high-level؛ وبعدين ركّز على التفاصيل زي شاشات الـ app."
      }
     ]
    },
    {
     "items": [
      {
       "why": "الإجابة الرسمية (L9 slide 13). لو زوّدت الـ 4 purposes تاخد الدرجة كاملة.",
       "ans": "رسم تخطيطي (schematic) للهيكل الأساسي لشاشة في system.<br>• معمول بخطوط وأشكال بسيطة (مستطيلات، دواير…) مع شوية text؛ والخطوط شكلها كأنها معمولة من سلوك (wires).<br>• مفيهوش ألوان ولا font styles عن قصد، عشان نركز على الـ structure.<br>• الـ Wireframe = هيكل (skeleton) فيه placeholders."
      },
      {
       "why": "الممتحنين بيدّوا درجات على تطبيق guidelines بأساميها من L9–L10. اكتب جنب كل قرار القاعدة اللي ماشي عليها.",
       "ans": "<b>الـ Research الأول:</b> مين بيشتري (الأعمار، الأجهزة، موبايلات low-end؟) وأهم الـ tasks بتاعتهم (search، compare، buy، track order)، ودول الـ <b>red routes</b>.<br><b>الـ Home (above the fold):</b> logo فوق على الشمال وبيودّي للـ home؛ search bar؛ category chips؛ banner للعروض؛ tab bar تحت: Home · Categories · Cart · Orders · Account.<br><b>قايمة المنتجات:</b> grid cards (صورة، اسم، سعر، rating) مع filters و sort؛ و breadcrumbs (Home › Men › Shoes) بتوري الـ user هو فين.<br><b>صفحة المنتج:</b> صور، سعر، اختيار المقاس/اللون؛ الـ primary CTA \"Add to cart\" باين أكتر و\"Add to wishlist\" secondary.<br><b>الـ Checkout</b> (path ثابت، فـ <b>progress bar</b>: Cart ← Shipping ← Payment ← Confirm): عنوان و card محفوظين (remove repetitive actions)، hints/formats في الـ fields، والـ errors جنب الـ field.<br><b>Confirmation page</b> فيها رقم الأوردر والـ tracking.<br><b>القواعد الـ visual:</b> palette من 3 ألوان، background بسيط، تجميع بـ frames، alerts ثابتة، حالات hover/press واضحة، والـ Cancel على اليمين ومش لافت للنظر.<br><b>الـ Process:</b> paper wireframes (5+ versions لكل شاشة) ← feedback ← Figma hi-fi ← test مع الـ users ← iterate."
      }
     ]
    }
   ]
  }
 ]
};

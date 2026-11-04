// Egyptian Arabic for Microprocessors & Assembly Language, aligned item by item with micro.js and extra/micro.js.
window.AR = window.AR || {};
AR.micro = {
 "lectures": {
  "1": {
   "notes": [
    {
     "h": "الـ hardware والـ software والـ compiler",
     "pts": [
      "الـ <b>Computer hardware</b> عشان هو جزء من machine، مابيفهمش غير حاجتين بس: <b>on و off</b>. الفكرة دي (الـ on والـ off) اسمها <b>binary</b>.",
      "الـ <b>Computer software</b> بيترجم الأفكار والأوامر اللي البني آدم بيفهمها لحاجة الـ hardware يقدر ينفذها فعلًا. بيقول للكمبيوتر <b>يعمل إيه ويعمله فين</b>. الأوامر دي اسمها <b>source code</b>.",
      "الـ <b>compiler</b> برنامج تاني بيشتغل على الـ source code ويحوّل الأوامر للغة الكمبيوتر بيفهمها. والناتج اسمه <b>executable program</b> (اسم تاني للـ software).",
      "<b>تلات أنواع software</b>: الـ <b>System software</b> (برامج بتخلي الـ hardware يشتغل صح)، الـ <b>Application software</b> (برامج بتخلي الـ user يعمل حاجة غير مجرد تشغيل الـ hardware)، والـ <b>Programming software</b> (بتخلي المبرمجين يبنوا software)."
     ],
     "figH": {
      "mp-l1-source-to-binary": "من أوامر البني آدم لحد الـ on والـ off: الـ source code ثم الـ compiler ثم الـ executable"
     }
    },
    {
     "h": "تلات أنواع programming languages",
     "figH": {
      "mp-l1-language-stack": "سلّم الـ slide: الـ hardware ثم الـ machine ثم الـ assembly ثم الـ high-level languages"
     }
    },
    {
     "h": "الـ Assembly language والـ assembler",
     "pts": [
      "الـ Assembly language <b>hardware dependent</b>: كل نوع CPU ليه الـ machine language والـ assembly language بتوعه، فالبرنامج اللي مكتوب لنوع CPU مش هيشتغل على نوع تاني. وعشان كده الشركات المختلفة محتاجة <b>assemblers مختلفة</b>.",
      "الـ Assembly ليها <b>نفس الـ structure ونفس الأوامر بتاعة الـ machine language</b>، بس بتخلي المبرمج يستخدم <b>أسامي بدل الأرقام</b> (mnemonics زي MOV و ADD).",
      "عشان برنامج الـ assembly يشتغل، لازم يتترجم لـ machine code عن طريق <b>assembler</b>: برنامج بيترجم البرنامج المكتوب بـ low-level language (<b>\"source code\"</b>) لكود executable (<b>\"object code\"</b>). الرسمة:<span class=\"ltr\">Source code (.ASM) → ASSEMBLER → Object code (.OBJ) → Hardware</span>",
      "الـ File extensions (من الـ revision sheet): أي برنامج assembly بيتحفظ <b>.ASM</b>؛ والـ coded object modules بتبقى في ملف <b>.OBJ</b>؛ وبعدين الـ linker بيطلّع الـ <b>.EXE</b>.",
      "الـ <b>debugger</b> بيخلي المبرمج يشغّل البرنامج <b>step by step</b> عشان يلاقي المكان بالظبط اللي فيه الـ error."
     ],
     "figH": {
      "mp-l1-cpu-assembler-match": "يعني إيه hardware dependent: البرنامج بيشتغل بس على نوع الـ CPU اللي الـ assembler بتاعه معمول له",
      "mp-l1-asm-obj-exe": "رحلة البرنامج من الـ source code للـ hardware:<span class=\"ltr\">.ASM → ASSEMBLER → .OBJ → LINKER → .EXE</span>"
     }
    },
    {
     "h": "الـ Debugger مقابل الـ Assembler (سؤال بييجي كتير جدًا في الامتحان)",
     "figH": {
      "mp-l1-debugger-assembler-sort": "صنّف كل جملة: بتاعة الـ debugger ولا الـ assembler؟"
     }
    },
    {
     "h": "الـ block diagram بتاع الـ microcomputer",
     "pts": [
      "الـ <b>Computer hardware</b> هو مجموعة الـ components الفيزيائية اللي بتكوّن الكمبيوتر.",
      "الرسمة المطلوبة: مربع <b>CPU</b> (جواه <b>registers</b>، والـ <b><bdi dir=\"ltr\">ALU | CU | clock</bdi></b>)، والـ <b>Memory Storage Unit</b>، والـ <b><bdi dir=\"ltr\">I/O&nbsp;Device&nbsp;#1</bdi></b> والـ <b><bdi dir=\"ltr\">I/O&nbsp;Device&nbsp;#2</bdi></b>، وكلهم متوصلين بتلات buses أفقية: الـ <b>data bus</b> (فوق)، الـ <b>control bus</b> (متقطع)، والـ <b>address bus</b> (تحت).",
      "الـ <b>CPU</b>: المكان اللي كل الحسابات والـ logic operations بتحصل فيه. جواه عدد محدود من أماكن التخزين اسمها <b>registers</b>، و<b>clock</b> بتردد عالي، و<b>control unit</b>، و<b>arithmetic logic unit</b>.",
      "الـ <b>ALU</b>: بيعمل العمليات الحسابية (جمع، طرح) والعمليات المنطقية (AND, OR, NOT).",
      "الـ <b>CU</b>: بينظّم ترتيب الخطوات اللي محتاجينها عشان ننفذ الـ machine instructions.",
      "الـ <b>Clock</b>: بيعمل synchronize للعمليات الداخلية للـ CPU مع باقي أجزاء السيستم (بيدّي التوقيت الأساسي لشغل الـ processor ولنشاط التحكم في الـ bus).",
      "الـ <b>Memory storage unit</b>: المكان اللي الـ instructions والداتا بتفضل فيه وهو البرنامج شغال. بيستقبل طلبات الداتا من الـ CPU، وبينقل الداتا من الـ RAM للـ CPU، ومن الـ CPU للـ memory."
     ],
     "figH": {
      "mp-l1-block-diagram": "الـ block diagram بتاع الـ microcomputer بيترسم جزء جزء"
     }
    },
    {
     "h": "الـ Buses",
     "pts": [
      "الـ <b>bus</b> هو مجموعة <b>أسلاك متوازية (parallel wires)</b> بتنقل الداتا من جزء في الكمبيوتر لجزء تاني.",
      "الـ <b>Data bus</b>: بينقل <b>الـ instructions والداتا</b> بين الـ CPU والـ memory.",
      "الـ <b>Control bus</b>: بيستخدم <b>binary signals</b> عشان يعمل synchronize لتصرفات كل الأجهزة المتوصلة بالـ system bus.",
      "الـ <b>Address bus</b>: شايل <b>الـ addresses</b> بتاعة الـ instructions والداتا لما الـ instruction اللي شغالة دلوقتي تنقل داتا بين الـ CPU والـ memory."
     ],
     "figH": {
      "mp-l1-bus-read-write": "نقلة read أو write بين الـ CPU والـ memory: الـ address bus ثم الـ control bus ثم الـ data bus"
     }
    },
    {
     "h": "أنواع الـ memory",
     "figH": {
      "mp-l1-memory-chip-lab": "جرّب كل نوع memory: تكتب فيه، تشيل الكهربا، تمسحه بالـ UV، أو تبرمجه"
     }
    },
    {
     "h": "الـ Registers (مقدمة) والـ Lab 1",
     "pts": [
      "الـ <b>register</b> هو <b>مكان تخزين مؤقت سريع جدًا جوه الـ CPU</b>. (في الـ Lab بيتقال عليه <bdi dir=\"ltr\">\"a&nbsp;high-speed&nbsp;memory\"</bdi>؛ وكل register ليه طول معين.)",
      "في <bdi dir=\"ltr\">Lab 1</bdi>: الـ assembly language هي low-level language بتشتغل على الـ memory بتاعة الـ processor. إحنا شغالين على موديل الـ processor <b>Intel 8086</b>، باستخدام الـ emulator <b>emu8086</b>. الخطوات:<span class=\"ltr\">New → empty workspace → write code → <b>emulate</b></span>والـ <b>single step</b> بيشغّل سطر سطر، والـ <b>run</b> بيشغّل البرنامج كله.",
      "أنواع الـ registers في الـ Lab:<br>(1) الـ <b>General purpose</b>: <bdi dir=\"ltr\">AX, BX, CX, DX, SI, DI, SP, BP</bdi><br>(2) الـ <b>Special purpose</b>: <bdi dir=\"ltr\">IP, FLAGS</bdi><br>(3) الـ <b>Segment</b>: <bdi dir=\"ltr\">CS, DS, ES, SS</bdi><br>التفاصيل في <bdi dir=\"ltr\">Lecture 2</bdi>."
     ],
     "figH": {
      "mp-l1-register-map": "خريطة الـ registers في الـ slide: خمس مجموعات، أو التلات أنواع بتوع الـ Lab"
     }
    }
   ],
   "cards": [
    "فكرة الـ on والـ off اللي الـ hardware بيفهمها.",
    "أوامر بيكتبها البني آدم بتقول للكمبيوتر يعمل إيه ويعمله فين.",
    "بيحوّل الـ source code لـ executable program.",
    "الـ System software، والـ programming software، والـ application software.",
    "الـ Machine language، والـ assembly language، والـ high-level language.",
    "اللغة الأصلية للكمبيوتر: سلسلة من 0's و 1's.",
    "لغة low-level على بعد خطوة واحدة من الـ machine language؛ بتستخدم أسامي بدل الأرقام؛ وhardware dependent.",
    "بيترجم الـ low-level source code لـ executable object code.",
    "بيشغّل البرنامج step by step عشان يلاقي مكان الـ error بالظبط؛ سهل في التشغيل وكويس مع البرامج القصيرة.",
    "الـ Assembler: صعب التشغيل، overhead أكتر، معزول عن الـ machine، كويس مع البرامج الطويلة. الـ Debugger: العكس بالظبط.",
    "الـ Registers، و clock بتردد عالي، و control unit (CU)، و ALU.",
    "بينظّم ترتيب الخطوات في تنفيذ الـ machine instructions.",
    "بيعمل synchronize لعمليات الـ CPU الداخلية مع باقي أجزاء السيستم.",
    "مجموعة أسلاك متوازية بتنقل الداتا من جزء في الكمبيوتر لجزء تاني.",
    "بيستخدم binary signals عشان يعمل synchronize لكل الأجهزة المتوصلة بالـ system bus.",
    "شايل الـ addresses بتاعة الـ instructions والداتا وقت النقل بين الـ CPU والـ memory.",
    "بالـ ultraviolet light من خلال شباك شفاف، بعد ما تشيل الـ chip من البورد.",
    "بيتكتب عليه تاني كهربائيًا وهو على البورد، بس ببطء؛ وفيه الـ firmware زي الـ BIOS.",
    "بيتكتب مرة واحدة بس، قبل ما يتركّب، باستخدام PROM programmer.",
    "الـ .ASM للـ source، والـ .OBJ للـ object modules، والـ .EXE للـ executable."
   ],
   "qa": [
    "<table><tr><th dir=\"ltr\">Debugger</th><th dir=\"ltr\">Assembler</th></tr><tr><td>سهل في التشغيل (Easy to run)</td><td>صعب في التشغيل (Hard to run)</td></tr><tr><td>برامج الـ overhead بتاعها قليل</td><td>الـ program overhead أكتر</td></tr><tr><td>قريب من الـ machine</td><td>معزول عن الـ machine</td></tr><tr><td>كويس مع البرامج القصيرة</td><td>كويس مع البرامج الطويلة</td></tr></table>",
    "الـ bus هو مجموعة أسلاك متوازية بتنقل الداتا من جزء في الكمبيوتر لجزء تاني.<br>الـ <b>Data bus</b>: بينقل الـ instructions والداتا بين الـ CPU والـ memory.<br>الـ <b>Control bus</b>: بيستخدم binary signals عشان يعمل synchronize لتصرفات كل الأجهزة المتوصلة بالـ system bus.<br>الـ <b>Address bus</b>: شايل الـ addresses بتاعة الـ instructions والداتا لما الـ instruction اللي بتتنفذ تنقل داتا بين الـ CPU والـ memory.",
    "الرسمة: مربع CPU (الـ registers فوق؛ والـ ALU والـ CU والـ clock تحت)، والـ Memory Storage Unit، والـ <bdi dir=\"ltr\">I/O&nbsp;Device&nbsp;#1</bdi> والـ <bdi dir=\"ltr\">I/O&nbsp;Device&nbsp;#2</bdi>، وكلهم متعلقين في <b>data bus</b> فوق، ومتوصلين من تحت بـ <b>control bus</b> متقطع والـ <b>address bus</b>.<br>الـ CPU: بيعمل كل الحسابات والـ logic؛ جواه registers و clock و CU و ALU. الـ ALU: العمليات الحسابية والمنطقية. الـ CU: بيرتّب خطوات تنفيذ الـ instructions. الـ Clock: بيعمل synchronize لعمليات الـ CPU مع باقي الأجزاء. الـ Memory storage unit: شايلة الـ instructions والداتا وهو البرنامج شغال، وبتنقل الداتا بين الـ RAM والـ CPU.",
    "الـ <b>PROM</b>: الداتا بتتكتب في الـ chip قبل ما تتركّب في الـ circuit، بس بتتكتب <b>مرة واحدة بس</b> باستخدام PROM programmer.<br>الـ <b>EPROM</b>: الداتا ممكن <b>تتكتب تاني</b> بإنك تشيل الـ chip من البورد، وتعرّضها لـ ultraviolet light عشان تتمسح، وبعدين تحطها في PROM programmer. فيها شباك صغير شفاف عشان يدخّل الـ UV light، وبتستخدم في الـ prototypes والإنتاج الصغير.",
    "الـ <b>EPROM</b>: بتتمسح بإنك تشيل الـ chip وتعرّضها لـ <b>ultraviolet light</b> (من الشباك الشفاف)، وبعدين تتبرمج تاني في PROM programmer؛ بتستخدم في الـ prototypes والإنتاج الصغير.<br>الـ <b>EEPROM</b>: بتتكتب تاني <b>كهربائيًا والـ chip لسه على الـ circuit board</b>، بس الكتابة بطيئة؛ بتستخدم عشان تشيل firmware زي الـ BIOS عشان يتعمله update.",
    "لأن كل نوع CPU ليه الـ machine language والـ assembly language بتوعه، فبرنامج الـ assembly المكتوب لنوع CPU مش هيشتغل على نوع تاني. وعشان كده الكمبيوترات من شركات مختلفة محتاجة assemblers و assembly languages مختلفة.",
    "الـ Software: الـ system software (بيخلي الـ hardware يشتغل صح)، الـ application software (بيخلي الـ users يعملوا tasks)، الـ programming software (بيخلي المبرمجين يبنوا software).<br>الـ Languages: الـ machine language (0s و 1s)، الـ assembly language (low level، أسامي بدل أرقام)، الـ high-level language (machine independent، زي C و FORTRAN و Java)."
   ],
   "quiz": [
    [
     "الـ System software (البرامج اللي بتخلي الـ hardware يشتغل صح) ده نوع واحد بس من التلاتة؛ الـ application والـ programming software برضه software، عشان كده الإجابة «All».",
     "الـ Application software (البرامج اللي بتخلي الـ users يعملوا tasks) نوع واحد بس من التلاتة؛ الـ system والـ programming software برضه software.",
     "الـ Programming software (أدوات بناء الـ software) نوع واحد بس من التلاتة؛ المحاضرة حاطة كمان الـ system والـ application software.",
     "صح. الـ software بيتقسم لـ system و programming و application software."
    ],
    [
     "الـ Machine language (الـ 0s والـ 1s) نوع واحد بس من التلاتة؛ الـ assembly والـ high-level languages برضه لغات الـ microcomputer.",
     "الـ Assembly language (low level، خطوة واحدة فوق الـ machine code) نوع واحد بس من التلاتة؛ الاتنين التانيين هما الـ machine والـ high-level languages.",
     "الـ High-level languages (machine independent، زي C و Java) نوع واحد بس؛ المحاضرة حاطة كمان الـ machine والـ assembly language.",
     "صح. Machine و assembly و high-level languages."
    ],
    [
     "صح. الـ Debugger: سهل التشغيل، overhead قليل، قريب من الـ machine، كويس مع البرامج القصيرة.",
     "الـ debugger <b>سهل</b> في التشغيل مش صعب. «صعب في التشغيل» دي خانة الـ assembler في جدول المحاضرة، أما «كويس مع البرامج القصيرة» فدي صح.",
     "«كويس مع البرامج الطويلة» دي بتاعة الـ assembler؛ الـ debugger كويس مع البرامج <b>القصيرة</b> (L1, Debugger vs. Assembler).",
     "صعب في التشغيل وكويس مع البرامج الطويلة ده صف الـ assembler في الجدول؛ الـ debugger عكسه بالظبط: سهل في التشغيل وكويس مع البرامج القصيرة."
    ],
    [
     "سهل في التشغيل وكويس مع البرامج الصغيرة ده وصف الـ debugger؛ الـ assembler صعب في التشغيل وكويس مع البرامج الطويلة.",
     "«صعب في التشغيل» دي مظبوطة للـ assembler، بس هو كويس مع البرامج <b>الطويلة</b>؛ البرامج القصيرة دي نقطة قوة الـ debugger.",
     "الـ assembler كويس مع البرامج الطويلة آه، بس هو <b>صعب</b> في التشغيل (وفيه program overhead أكتر)؛ «سهل في التشغيل» ده الـ debugger.",
     "صح. صعب التشغيل، overhead أكتر، معزول عن الـ machine، كويس مع البرامج الطويلة."
    ],
    [
     "الـ RAM بتقرا وتكتب بأي ترتيب وبتضيّع الداتا لو الكهربا اتقطعت.",
     "صح. ده تعريف الـ ROM في المحاضرة.",
     "الـ CPU ده الـ processor اللي بتحصل فيه الحسابات والـ logic، مش نوع semiconductor memory. الـ memory اللي «بتتكتب مرة وبتفضل من غير كهربا» هي الـ ROM.",
     "مش «None»: الصياغة دي هي تعريف المحاضرة للـ ROM بالظبط، بتتكتب مرة، مابتتغيرش، وبتفضل لما الكهربا تتقطع."
    ],
    [
     "الـ data bus بينقل الـ instructions والداتا بين الـ CPU والـ memory؛ مش بيعمل synchronize للأجهزة. الـ synchronize بالـ binary signals ده الـ control bus.",
     "صح. ده تعريف الـ control bus في المحاضرة.",
     "الـ address bus شايل الـ addresses بتاعة الـ instructions والداتا وقت النقل بين الـ CPU والـ memory؛ إنك تعمل synchronize للأجهزة بالـ binary signals دي وظيفة الـ control bus.",
     "مش «None»: المحاضرة بتعرّف الـ control bus إنه الـ bus اللي بيستخدم binary signals عشان يعمل synchronize لكل الأجهزة اللي على الـ system bus."
    ],
    [
     "صح. الـ EPROM بتتمسح بالـ UV light من الشباك بتاعها.",
     "الـ ROM بتتكتب مرة ومابتتغيرش أبدًا، فمينفعش تتمسح وتتكتب تاني خالص. المسح بالـ UV light بعد ما تشيل الـ chip ده الـ EPROM.",
     "الـ PROM بتتكتب مرة واحدة بالـ PROM programmer ومينفعش تتمسح. الـ EPROM بس هي اللي بتتمسح بالـ UV light من الشباك الشفاف بتاعها.",
     "الـ RAM بتتكتب كهربائيًا في التشغيل العادي، مش بالـ UV."
    ],
    [
     "الـ «EROM» مش من أنواع الـ memory اللي في المحاضرة، وهي:<span class=\"ltr\">RAM, ROM, PROM, EPROM, EEPROM</span>إعادة الكتابة كهربيًا وهي على الـ board مع كتابة بطيئة دي الـ EEPROM.",
     "الـ PROM بتتكتب مرة واحدة بس، قبل التركيب، فمينفعش تتكتب تاني وهي على الـ board. الوصف ده بتاع الـ EEPROM.",
     "صح. Electrically erasable، وهي على البورد، والكتابة بطيئة.",
     "مش «None»: بتتكتب تاني كهربيًا وهي على الـ board، والكتابة بطيئة، ده تعريف المحاضرة للـ EEPROM بالظبط."
    ],
    [
     "صح. الـ PROM معناها:<span class=\"ltr\">PROM = Programmable Read Only Memory</span>بتتكتب مرة واحدة، قبل التركيب، بالـ PROM programmer <bdi dir=\"ltr\">(L1,&nbsp;Types&nbsp;of&nbsp;memory)</bdi>.",
     "الـ PROM بعد ما تتبرمج بتبقى read ONLY memory؛ مش <bdi dir=\"ltr\">read/write</bdi>. القراية والكتابة بأي ترتيب ده وصف الـ RAM.",
     "الـ P معناها Programmable (عشان بتتبرمج بالـ PROM programmer)، مش Portable.",
     "مش «None»: الاختيار a هو فك اختصار الـ PROM بالظبط:<span class=\"ltr\">Programmable Read Only Memory</span>"
    ],
    [
     "الـ E معناها Erasable (الـ EEPROM هي اللي electrically erasable). الـ key بتاع <bdi dir=\"ltr\">2022/23</bdi> حط خط تحت الاختيار ده، بس هو غلط.",
     "الـ EPROM هي read ONLY memory، فـ «read write» غلط؛ وفك الاختصار الصح (Erasable Programmable Read Only Memory) مش موجود في الاختيارات، عشان كده الإجابة «None».",
     "الـ P معناها Programmable مش Portable، فالفك ده غلط؛ والفك الصح مش موجود في الاختيارات.",
     "صح. الـ EPROM معناها:<span class=\"ltr\">EPROM = Erasable Programmable Read Only Memory</span>ودي مش مكتوبة بالظبط في الاختيارات."
    ],
    [
     "صح. الـ EPROM معناها:<span class=\"ltr\">EPROM = Erasable Programmable Read Only Memory</span>بتتمسح بالـ UV light بعد ما تشيل الـ chip، وبعدين تتبرمج تاني <bdi dir=\"ltr\">(L1,&nbsp;Types&nbsp;of&nbsp;memory)</bdi>.",
     "فيه غلطتين: الـ E معناها Erasable (مش Electrically)، والـ chip دي read ONLY memory مش <bdi dir=\"ltr\">read/write</bdi>.",
     "الـ E في EPROM معناها Erasable (بالـ UV light). كلمة «Electrically» دي بتاعة الـ EEPROM، يعني Electrically Erasable PROM.",
     "مش «None»: الاختيار a هو فك الاختصار بالظبط:<span class=\"ltr\">Erasable Programmable Read Only Memory</span>"
    ],
    [
     "ملف الـ .ASM فيه الـ assembly source code اللي المبرمج كتبه؛ الـ assembler بيحوّله للـ object modules اللي بتتخزن في ملف الـ .OBJ.",
     "صح. الـ assembler بيطلّع الـ object code في ملف الـ .OBJ.",
     "الـ .EXE ده الـ executable النهائي اللي الـ linker بيطلّعه من الـ .OBJ modules، مش الـ coded object modules نفسها.",
     "مفيش extension standard اسمه «.OBJECT»؛ الـ object code اللي الـ assembler بيطلّعه بيتخزن في ملف الـ .OBJ."
    ],
    [
     "الـ flexibility الأكتر دي واحدة من المميزات في الـ revision key، بس مش الوحيدة، فالإجابة الكاملة «All of the mentioned».",
     "إن فرص الـ error أقل مذكورة في الـ revision key، بس مع الـ flexibility وسهولة الـ debugging، عشان كده الإجابة «All».",
     "سهولة الـ debugging مذكورة في الـ revision key، بس مع الـ flexibility وقلة الـ errors، فالإجابة «All of the mentioned».",
     "صح. الـ revision sheet key حاطط التلاتة كمميزات للـ assembly programming: الـ flexibility أكتر، وفرص الـ error أقل، والـ debugging سهل."
    ],
    [
     "الـ .ASP ده extension بتاع web (Active Server Pages)، مش ملف assembly. أي برنامج assembly بيتحفظ .ASM.",
     "الـ .ALP مش الـ extension اللي الـ assemblers زي emu8086 أو MASM بتستخدمه؛ ملفات الـ assembly source بتتحفظ .ASM.",
     "صح. أي assembly source program بيتحفظ بالـ extension .ASM؛ الـ assembler بيحوّله لـ .OBJ والـ linker لـ .EXE (L1, Assembly language and the assembler).",
     "الـ .PGM مش extension بتاع assembly؛ الـ extension الأساسي لأي assembly source program هو .ASM."
    ],
    [
     "الـ compiler بيترجم الـ source code لـ executable program؛ مش بيشغّل البرنامج step by step عشان يلاقي الـ errors.",
     "الـ editor بنستخدمه بس عشان نكتب ونعدّل الـ source code؛ إنك تمشي في البرنامج خطوة خطوة عشان تلاقي الـ error ده شغل الـ debugger.",
     "صح. الـ debugger بيخلي المبرمج يشغّل البرنامج step by step عشان يلاقي مكان الـ error بالظبط، زي الـ single step في emu8086 (L1, Assembly language and the assembler).",
     "مش «None»: تشغيل البرنامج step by step عشان تلاقي الـ error هو بالظبط اللي الـ debugger بيعمله."
    ],
    [
     "صح. المحاضرة بتعرّف الـ control bus إنه بيستخدم binary signals عشان يعمل synchronize لكل الأجهزة المتوصلة بالـ system bus (L1, Buses).",
     "الـ buses بتشيل قيم digital (يعني on أو off)؛ والمحاضرة بتقول إن الـ control bus بيستخدم <b>BINARY</b> signals، مش continuous (analog).",
     "الـ binary signals بس هي اللي بتستخدم؛ الـ continuous signals مش جزء من تعريف الـ control bus، فـ «a and b» غلط.",
     "مش «None»: تعريف المحاضرة بيقول إن الـ control bus بيستخدم binary signals."
    ],
    [
     "الـ address لوحده ناقص: كل memory location ليها كمان contents (القيمة المتخزنة فيها)، فالإجابة «a and b».",
     "الـ contents لوحدها ناقصة: كل location كمان بتتعرف بالـ address بتاعها، فالإجابة «a and b».",
     "صح. كل location ليها address و contents.",
     "مش «None»: كل memory location ليها address و contents الاتنين."
    ],
    [
     "كلمة «Conductors» دي كلمة عامة لأي حاجة بتوصّل كهربا؛ اسم مجموعة الأسلاك المتوازية بين المكونات في المحاضرة هو الـ bus.",
     "الـ Connectors دي الفيش والـ sockets اللي بتوصّل الأجزاء ببعض، مش الخطوط الموصّلة المتوازية نفسها، اللي هي الـ buses.",
     "صح. الـ bus مجموعة أسلاك متوازية بتنقل الداتا من جزء في الكمبيوتر لجزء تاني: data و address و control buses (L1, Buses).",
     "كلمة «Consecutives» مش مصطلح hardware أصلًا؛ الخطوط المتوازية اللي بتوصّل مكونات الـ motherboard اسمها buses."
    ],
    [
     "ترجمة الـ high-level language لـ machine code ده شغل الـ compiler؛ الـ assembler بيترجم الـ assembly (low-level) source code.",
     "صح. الـ assembler بيترجم البرنامج المكتوب بالـ low-level assembly language (الـ source code) لـ executable machine code (الـ object code) (L1, Assembly language and the assembler).",
     "الـ assembler بيتعامل مع الـ assembly language بس؛ الـ high-level languages محتاجة compiler، فـ «Both» غلط.",
     "مش «None»: الـ assembler بيترجم الـ assembly-level language لـ machine language."
    ],
    [
     "الـ Application software هو اللي بيخدم tasks معينة؛ الـ system software بيخلي الـ hardware يشتغل.",
     "صح. الـ System software بيخلي الـ hardware يشتغل صح."
    ],
    [
     "صح. الـ Machine language هي اللغة الأصلية للكمبيوتر، سلسلة 0s و 1s، والـ machine بيفهمها وينفذها على طول (L1, Programming languages).",
     "الجملة صح: المحاضرة بتعرّف الـ machine language إنها اللغة الأصلية للكمبيوتر، معمولة من 0s و 1s وبتتنفذ على طول."
    ],
    [
     "صح. الـ clock بيعمل synchronize لعمليات الـ CPU مع باقي الأجزاء.",
     "الجملة صح: الـ clock بيدي الـ basic timing وبيعمل synchronize للعمليات الداخلية بتاعة الـ CPU مع باقي مكونات السيستم."
    ],
    [
     "صح. الـ RAM هي semiconductor memory بنستخدمها للقراية والكتابة بأي ترتيب، حسب ما الـ processor محتاج (L1, Types of memory).",
     "الجملة صح: دي تعريف المحاضرة للـ RAM حرف بحرف، قراية وكتابة بأي ترتيب."
    ],
    [
     "الـ EEPROM آه بتتكتب تاني كهربيًا وهي على الـ board، بس المحاضرة بتأكد إن الكتابة <b>بطيئة</b> مش سريعة، فالجملة غلط.",
     "صح. الـ EEPROM بتتكتب تاني كهربيًا وهي على الـ circuit board، بس الكتابة بطيئة؛ كلمة «fast» هي اللي بتخلي الجملة غلط (L1, Types of memory)."
    ],
    [
     "داتا الـ PROM بتتكتب <b>قبل</b> ما الـ chip تتركّب في الـ circuit (بالـ PROM programmer)، مش بعد، فالجملة غلط.",
     "صح. الـ PROM بتتكتب مرة واحدة، قبل التركيب، بإنك تحطها في PROM programmer؛ والجملة <bdi dir=\"ltr\">«after&nbsp;it&nbsp;is&nbsp;installed»</bdi> هي اللي بتخليها غلط <bdi dir=\"ltr\">(L1,&nbsp;Types&nbsp;of&nbsp;memory)</bdi>."
    ],
    [
     "صح. داتا الـ PROM بتتكتب في الـ chip قبل ما تتركّب، بالـ PROM programmer، ومرة واحدة بس (L1, Types of memory).",
     "الجملة صح: مطابقة لتعريف المحاضرة للـ PROM بالظبط (بتتكتب قبل التركيب، ومرة واحدة بس)."
    ],
    [
     "صح. كل نوع CPU ليه الـ assembly language بتاعته.",
     "الجملة صح: كل نوع CPU ليه الـ machine والـ assembly language بتوعه، فبرامج الـ assembly مش portable بين الـ CPUs."
    ],
    [
     "صح. المحاضرة بتعرّف الـ data bus إنه الـ bus اللي بينقل الـ instructions والداتا بين الـ CPU والـ memory (L1, Buses).",
     "الجملة صح: ده تعريف المحاضرة للـ data bus. الـ addresses بتمشي على الـ address bus، والـ sync signals على الـ control bus."
    ]
   ],
   "extra": [
    [
     "الـ Assembly بيترجمها assembler، مش compiler.",
     "صح. الـ Assembly language هي hardware dependent.",
     "مكان تخزين البرنامج ملوش دعوة بالـ portability؛ البرنامج مش بيشتغل على CPU تاني عشان كل نوع CPU ليه الـ machine والـ assembly language بتوعه.",
     "الـ High-level languages هي اللي machine independent."
    ],
    [
     "الـ ALU بيعمل العمليات الحسابية والمنطقية.",
     "الـ clock بيعمل synchronize للعمليات؛ مش بيرتّب خطوات الـ instruction.",
     "الـ Registers دي تخزين مؤقت سريع جوه الـ CPU؛ بتشيل داتا بس مش بترتّب خطوات تنفيذ الـ instructions. ده شغل الـ control unit.",
     "صح. ده تعريف الـ CU في المحاضرة."
    ],
    [
     "الـ PROM بتتكتب مرة واحدة بس، فالـ firmware اللي عليها عمره ما هيتعمله update خالص.",
     "الـ EPROM لازم تتشال وتتمسح بالـ UV light.",
     "صح. بتتكتب تاني كهربائيًا وهي على البورد (ببطء) وبتستخدم للـ BIOS.",
     "الـ ROM بتتكتب مرة ومابتتغيرش أبدًا، فالـ BIOS لو على ROM عادية مش هينفع يتعمله update."
    ],
    [
     "صح. الـ address bus شايل الـ addresses بتاعة الـ instructions والداتا لما الـ instruction اللي بتتنفذ تنقل داتا بين الـ CPU والـ memory (L1, Buses).",
     "الـ data bus بيشيل الـ instructions والداتا نفسها، مش الـ addresses بتاعتها؛ الـ addresses بتمشي على الـ address bus.",
     "الـ control bus بينقل إشارات الـ synchronization.",
     "الـ clock ده component في الـ CPU بيعمل synchronize للعمليات، مش واحد من التلات buses (data, address, control)."
    ],
    [
     "الزوج ده صح، فهو مش الإجابة: جدول المحاضرة حاطط الـ debugger إنه close to the machine.",
     "الزوج ده صح، فهو مش الإجابة: الـ assembler فيه program overhead أكتر، والـ debugger الـ overhead بتاعه قليل.",
     "ده الاختيار المطلوب (الغلط). الـ debugger كويس مع البرامج <b>القصيرة</b>؛ الـ assembler هو اللي كويس مع الطويلة.",
     "الزوج ده صح، فهو مش الإجابة: الـ assembler صعب في التشغيل، والـ debugger سهل."
    ],
    [
     "الـ assembler بيترجم لتحت، من الـ assembly لـ machine code؛ عمره ما بيطلّع برنامج C (high-level).",
     "صح. الـ Source code بيتترجم لـ object code.",
     "الـ Registers دي hardware في الـ CPU، مش ناتج translator؛ الـ assembler بيطلّع object code في ملف .OBJ.",
     "الـ BIOS ده firmware متخزن في EEPROM؛ الـ assembler كل اللي بيعمله إنه بيحوّل الـ .ASM source لـ .OBJ object code."
    ],
    [
     "الـ System software هي البرامج اللي بتخلي الـ hardware يشتغل صح، مش أدوات لبناء الـ software.",
     "الـ Application software بيخلي الـ users يعملوا tasks على الكمبيوتر غير تشغيل الـ hardware؛ أدوات بناء الـ software دي الـ programming software.",
     "مش من التلات أنواع اللي في المحاضرة.",
     "صح. المحاضرة بتعرّف الـ programming software إنه النوع اللي بيخلي المبرمجين يبنوا computer software (L1, Hardware, software and the compiler)."
    ],
    [
     "صح. الشباك ده بيدخّل الـ UV light اللي بتمسح الـ chip.",
     "المحاضرة مابتتكلمش عن أي battery في الـ EPROM؛ العلامة بتاعتها هي الشباك الشفاف اللي بيدخّل الـ UV light اللي بنمسح بيه.",
     "أي IC package ليها pins عشان تتوصل بالـ board؛ اللي بيميّز الـ EPROM هو الشباك الشفاف الصغير اللي فوقها.",
     "الـ chips مفيهاش keyboards؛ الـ EPROM بتتعرف من الشباك الشفاف اللي بيدخّل الـ UV light عشان تتمسح."
    ],
    [
     "الـ ALU بيعمل العمليات الحسابية (add, subtract) والـ logic (AND, OR, NOT)؛ مش بيعمل synchronize للـ CPU مع باقي المكونات.",
     "صح. الـ clock بيعمل synchronize للعمليات الداخلية بتاعة الـ CPU مع باقي مكونات السيستم، وبيدي الـ basic timing (L1, Microcomputer block diagram).",
     "الـ MAR (memory address register) شايل بس الـ address اللي بنوصله؛ الـ synchronization ده شغل الـ clock.",
     "الـ data bus بينقل الـ instructions والداتا بين الـ CPU والـ memory؛ مش بيدي timing ولا synchronization."
    ],
    [
     "الـ High-level languages دي machine independent وأبعد عن الـ machine language، مش خطوة واحدة بس منها.",
     "الـ Machine language هي نفسها الـ 0s والـ 1s؛ بتستخدم أرقام بس مش أسامي. الـ Assembly هي الخطوة اللي فوقها.",
     "صح. الـ Assembly خطوة واحدة بعيد عن الـ machine language، بنفس الـ structure والأوامر بس بأسامي (mnemonics) بدل الأرقام (L1, Assembly language and the assembler).",
     "الـ Natural language (لغة البني آدمين) مش من التلات أنواع بتوع الـ programming languages؛ اللغة اللي على بعد خطوة من الـ machine code هي الـ assembly."
    ]
   ]
  },
  "2": {
   "notes": [
    {
     "h": "تقسيم الـ Registers",
     "pts": [
      "الـ <b>register</b> هو مكان تخزين مؤقت سريع جدًا جوه الـ CPU.",
      "الـ processor فيه registers <b>user-visible</b> (المبرمج يشوفها) و registers <b>user-invisible</b> (يعني control أو status).",
      "الـ User-visible هي الـ <b>General purpose</b>، والـ <b>Special purpose</b>، والـ <b>Segment registers</b>. الـ User-invisible هي الـ <b>Program Counter (PC)</b>، والـ <b>MAR</b>، والـ <b>MBR</b>، والـ <b>Instruction Register (IR)</b>.",
      "الـ User-visible registers ممكن تبقى general purpose أو ليها استخدام خاص (أرقام fixed أو floating-point، والـ addresses، والـ indexes، والـ segment pointers). أما الـ User-invisible registers فبتستخدم عشان <b>تتحكم في شغل الـ CPU</b>.",
      "الـ <b>user-visible register</b> هو اللي الـ machine language اللي الـ CPU بينفذها تقدر تشاور عليه (reference). فايدتها إنها بتخلي المبرمج <b>يقلل الرجوع للـ main memory</b> بإنه يستخدم الـ registers صح."
     ],
     "figH": {
      "mp-l2-reg-tree": "الـ Registers بتتقسم لـ user-visible و user-invisible، الشجرة اللي في الـ slide خطوة بخطوة"
     }
    },
    {
     "h": "الـ General purpose registers",
     "pts": [
      "أساسًا بتستخدم في <b>الحسابات ونقل الداتا</b>. فيه <b>تمانية</b> في الـ 80x86، وهما:<span class=\"ltr\"><b>EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI</b></span>وفيه instructions كتير بتشتغل أحسن مع register معين، أو لازم تستخدمه هو بالذات.",
      "كل واحد ممكن تتعامل معاه كقيمة <b><bdi dir=\"ltr\">32-bit</bdi></b> أو كقيمة <b><bdi dir=\"ltr\">16-bit</bdi></b>؛ وبعضهم كمان كأجزاء <b><bdi dir=\"ltr\">8-bit</bdi></b>. الـ EAX حجمه 32 bits؛ والـ 16 bit اللي تحت منه هما <b>AX</b>؛ والـ 8 bits العليا من AX هما <b>AH</b>، والـ 8 bits اللي تحت هما <b>AL</b>.",
      "خلي بالك: <b><bdi dir=\"ltr\">AX, BX, CX, DX</bdi></b> بس هما اللي ليهم أنصاص <bdi dir=\"ltr\" style=\"white-space:nowrap\">8-bit</bdi>، وهي:<span class=\"ltr\">AH/AL, BH/BL, CH/CL, DH/DL</span>أما <b><bdi dir=\"ltr\">SI, DI, SP, BP</bdi></b> <b>مالهمش</b> أنصاص <bdi dir=\"ltr\" style=\"white-space:nowrap\">8-bit</bdi>: مفيش حاجة اسمها <bdi dir=\"ltr\">SH/SL</bdi>، فالـ ESP أو الـ ESI تستخدمهم <bdi dir=\"ltr\" style=\"white-space:nowrap\">16</bdi> أو <bdi dir=\"ltr\" style=\"white-space:nowrap\">32 bits</bdi> بس.",
      "مثال الـ Lab: لو<span class=\"ltr\">AX = 0011000000111001b</span>يبقى<span class=\"ltr\">AH = 00110000b, AL = 00111001b</span>ولو غيّرت نص الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">8-bit</bdi>، الـ register الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">16-bit</bdi> بيتغير معاه."
     ],
     "figH": {
      "mp-l2-eax-parts": "إزاي EAX و AX و AH و AL جوه register واحد، وليه الـ SI مالوش أنصاص <bdi dir=\"ltr\">8-bit</bdi>",
      "mp-l2-ax-halves": "مثال الـ Lab bit بـ bit: اكتب في الـ AX أو الـ AH أو الـ AL وشوف الباقي بيتغير إزاي"
     }
    },
    {
     "h": "دور كل register (Lab 1 + الـ programming model)",
     "figH": {
      "mp-l2-prog-model": "الـ programming model اللي في الـ slide: دوس على أي register تعرف اسمه وبيستخدم في إيه"
     }
    },
    {
     "h": "الـ Segment registers",
     "pts": [
      "الـ Segment registers بتستخدم كـ <b>base locations</b> (نقطة بداية) لمناطق في الـ memory متحددة مسبقًا اسمها <b>segments</b>: الـ code segment (instructions البرنامج)، الـ data segment (المتغيرات)، الـ stack segment (المتغيرات المحلية بتاعة الـ functions والـ parameters).",
      "الـ <b>CS</b> (Code Segment): بيشاور على الـ segment اللي البرنامج الـ executable (الـ instructions) متخزن فيه.",
      "الـ <b>DS</b> (Data Segment): بيشاور على الـ segment اللي الداتا متخزنة فيه.",
      "الـ <b>ES</b> (Extra Segment) ده data segment تاني إضافي.",
      "الـ <b>SS</b> (Stack Segment): شايل عنوان البداية بتاع الـ stack segment الشغال دلوقتي. (وفيه كمان FS و GS في الـ 80386 وبعده.)",
      "الـ Segment registers هي registers <b><bdi dir=\"ltr\">16-bit</bdi> user-visible</b>. خلي بالك إن DI و SI <b>مش</b> segment registers. والـ Segment registers ماينفعش تستخدمها كـ operands في الـ arithmetic والـ logical instructions."
     ],
     "figH": {
      "mp-l2-seg-map": "رسمة الـ segments اللي في الـ slide: الـ segment <bdi dir=\"ltr\">8000</bdi> في الـ memory والمكان <bdi dir=\"ltr\">8000:0250</bdi>"
     }
    },
    {
     "h": "الـ Special purpose registers (EIP, EFLAGS)",
     "pts": [
      "فيه اتنين special purpose registers، وهما الـ <b>EIP</b> والـ <b>EFLAGS</b> (<bdi dir=\"ltr\" style=\"white-space:nowrap\">32-bit</bdi>). مابتتعاملش معاهم بنفس طريقة باقي الـ registers؛ الـ CPU هو اللي بيعدّل فيهم مباشرة.",
      "الـ <b>EIP (Instruction Pointer)</b>: فيه <b>عنوان الـ instruction الجاية اللي هتتنفذ</b>. فيه instructions معينة (الـ jumps) بتغيّره عشان البرنامج يتفرّع (branch).",
      "الـ <b>EFLAGS</b> عبارة عن bits منفصلة كل واحد فيهم يا إما <b>بيتحكم في شغل الـ CPU</b> يا إما <b>بيعكس نتيجة</b> عملية عملها الـ CPU (حالة نتيجة عملية الـ ALU). بيتابع حالة البيئة اللي البرنامج شغال فيها. والـ instructions تقدر تختبر الـ flags وتغيّرها."
     ]
    },
    {
     "h": "الـ bits بتاعة الـ EFLAGS",
     "figH": {
      "mp-l2-eflags": "الـ <bdi dir=\"ltr\">32 bits</bdi> بتوع الـ EFLAGS متقسمين: status و control و system flags",
      "mp-l2-zsco": "الـ Z والـ S والـ C والـ O محسوبين لعملية جمع أو طرح <bdi dir=\"ltr\">8-bit</bdi> انت تختارها"
     }
    },
    {
     "h": "الـ User-invisible registers",
     "figH": {
      "mp-l2-fetch": "الـ PC والـ MAR والـ MBR والـ IR وهي بتجيب (fetch) instruction",
      "mp-l2-reg-drill": "تمرين: الـ register ده general purpose ولا special purpose ولا segment ولا user-invisible ولا مش موجود أصلًا؟"
     }
    },
    {
     "h": "الـ MOV instruction",
     "pts": [
      "الـ MOV بتنسخ محتوى register أو memory location (أو immediate data) لـ register أو memory location تاني. الـ Syntax:<pre>MOV destination, source</pre>",
      "الأمر ده بينسخ 100 decimal في EAX:<pre>MOV EAX, 100</pre>وده بينسخ 10 hexadecimal في BL:<pre>MOV BL, 10H</pre>وده بينسخ محتوى CX في DX:<pre>MOV DX, CX</pre>",
      "الـ <b>word</b> حجمه <b><bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes</bdi></b> (<bdi dir=\"ltr\" style=\"white-space:nowrap\">16 bits</bdi>)؛ والـ double word حجمه <bdi dir=\"ltr\" style=\"white-space:nowrap\">4 bytes</bdi>."
     ],
     "figH": {
      "mp-l2-mov": "الـ MOV خطوة بخطوة بالـ 3 أمثلة اللي في الـ slide، وبعدين جرّب MOV بنفسك"
     }
    }
   ],
   "cards": [
    "مكان تخزين مؤقت سريع جدًا جوه الـ CPU.",
    "هو register الـ machine language اللي الـ CPU بينفذها تقدر تشاور عليه؛ بيخلي المبرمج يقلل الرجوع للـ memory.",
    "الـ General purpose، والـ special purpose، والـ segment registers.",
    "الـ PC والـ IR والـ MAR والـ MBR.",
    "التمانية هما:<span class=\"ltr\">EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI</span>",
    "الـ 8 bits العليا / السفلى من AX (اللي هو الـ 16 bit السفلى من EAX).",
    "مالهمش. مفيش <bdi dir=\"ltr\">SL/SH</bdi>؛ استخدمهم <bdi dir=\"ltr\" style=\"white-space:nowrap\">16</bdi> أو <bdi dir=\"ltr\" style=\"white-space:nowrap\">32 bits</bdi> بس.",
    "الـ EIP والـ EFLAGS (<bdi dir=\"ltr\" style=\"white-space:nowrap\">32-bit</bdi>).",
    "عنوان الـ instruction الجاية اللي هتتنفذ.",
    "هي bits بتتحكم في الـ CPU أو بتعكس نتيجة العمليات.",
    "عنوان الـ instruction اللي هتتجاب (fetch).",
    "آخر instruction اتجابت (fetched).",
    "عنوان location في الـ memory.",
    "الـ word اللي هيتكتب في الـ memory أو آخر word اتقرا.",
    "الـ Code segment: شايل الـ instructions اللي الـ microprocessor بينفذها.",
    "الـ Stack segment: عنوان الـ stack segment.",
    "عدّاد (counter) للـ LOOP والـ shifts والـ rotates.",
    "امتداد لـ AX في الـ <bdi dir=\"ltr\">MUL/DIV</bdi>؛ وفيه الباقي (remainder) بعد الـ DIV.",
    "الـ Sign، والـ Overflow، والـ Carry، والـ Zero.",
    "حجمها <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes</bdi>."
   ],
   "qa": [
    "الـ user-visible register هو register الـ machine language اللي الـ CPU بينفذها تقدر تشاور عليه. بيخلي المبرمج يقلل الرجوع للـ main memory بإنه يستخدم الـ registers بكفاءة. الأنواع:<br>(1) الـ general purpose:<span class=\"ltr\">EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI</span>(2) الـ special purpose: <bdi dir=\"ltr\">EIP, EFLAGS</bdi><br>(3) الـ segment registers: <bdi dir=\"ltr\">CS, DS, ES, SS</bdi>",
    "دي control و status registers بتستخدم عشان تتحكم في شغل الـ CPU، ومبرمج الـ assembly مايقدرش يشاور عليها.<br>الـ <b>PC</b>: فيه عنوان الـ instruction اللي هتتجاب.<br>الـ <b>IR</b>: فيه آخر instruction اتجابت.<br>الـ <b>MAR</b>: فيه عنوان location في الـ memory.<br>الـ <b>MBR</b>: فيه word داتا هتتكتب في الـ memory أو آخر word اتقرا.",
    "الـ <b>EIP</b> (instruction pointer) فيه عنوان الـ instruction الجاية اللي هتتنفذ؛ والـ jump instructions بتغيّره عشان البرنامج يتفرّع. الـ <b>EFLAGS</b> عبارة عن bits منفصلة كل واحد يا إما بيتحكم في شغل الـ CPU يا إما بيعكس نتيجة عملية عملها الـ CPU.",
    "الـ <b>ZF</b>: بيتعمله set لو نتيجة العملية الحسابية بصفر.<br>الـ <b>CF</b>: بيتعمله set لو نتيجة عملية <b>unsigned</b> أكبر من إنها تدخل في الـ destination.<br>الـ <b>SF</b>: بيتعمله set لو النتيجة سالبة.<br>الـ <b>OF</b>: بيتعمله set لو النتيجة (signed) أكبر أو أصغر من إنها تدخل في الـ destination.",
    "الـ EAX حجمه <bdi dir=\"ltr\" style=\"white-space:nowrap\">32 bits</bdi>؛ الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">16 bit</bdi> السفلى منه هي AX؛ والـ AX بيتقسم لـ AH (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 bits</bdi> العليا) و AL (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 bits</bdi> السفلى). ونفس الكلام لـ:<span class=\"ltr\">EBX/BX/BH/BL, ECX/CX/CH/CL, EDX/DX/DH/DL</span>أما ESP و EBP و ESI و EDI فليهم أجزاء <bdi dir=\"ltr\" style=\"white-space:nowrap\">16-bit</bdi> بس (<bdi dir=\"ltr\">SP, BP, SI, DI</bdi>)؛ مفيش جزء <bdi dir=\"ltr\" style=\"white-space:nowrap\">8-bit</bdi> زي SL أو SH.",
    "الـ CS: الـ code segment، شايل instructions البرنامج. الـ DS: الـ data segment، شايل المتغيرات. الـ ES: الـ extra segment، وده data segment تاني. الـ SS: الـ stack segment، شايل عنوان البداية بتاع الـ stack الشغال (المتغيرات المحلية، الـ parameters، الـ return addresses)."
   ],
   "quiz": [
    [
     "الـ processor هو الـ CPU كله، مش مكان تخزين جواه. المساحة السريعة المؤقتة اللي مبنية جوه الـ CPU اسمها register.",
     "الـ ALU بيعمل عمليات، مش بيخزّن.",
     "الـ bus ده مجموعة wires متوازية بتنقل الداتا بين أجزاء الكمبيوتر، مابيخزنش أي حاجة جوه الـ CPU.",
     "صح. المحاضرة بتعرّف الـ register إنه high speed temporary storage area مبنية جوه الـ CPU (L2, Register classification)."
    ],
    [
     "مفيش flag اسمه «compute» في الـ EFLAGS؛ الـ C bit هو الـ carry flag (CF)، وبيتعمله set لما نتيجة unsigned تبقى أكبر من الـ destination.",
     "الـ C مش معناها control؛ الـ control flag الوحيد هو الـ DF (direction). الـ C هو الـ carry flag، وده status flag.",
     "صح. الـ C هو الـ carry flag (CF)، بيتعمله set لما نتيجة عملية unsigned تبقى أكبر من إنها تدخل في الـ destination (L2, EFLAGS bits).",
     "مش «None»: الـ carry bit موجود في الاختيار c، والـ CF واحد من الـ six status flags."
    ],
    [
     "الـ S مش معناها status؛ والـ «status flags» ده اسم المجموعة كلها (<bdi dir=\"ltr\">CF, PF, AF, ZF, SF, OF</bdi>). الـ S هو الـ sign flag، بيتعمله set لما النتيجة تبقى سالبة.",
     "صح. الـ SF بيتعمله set لما النتيجة تبقى سالبة.",
     "مفيش flag اسمه «sign extension»؛ الـ S ببساطة هو الـ sign flag، بيتعمله set لما الـ most significant bit بتاع النتيجة يبقى 1 (يعني سالبة).",
     "مش «None»: الـ sign bit موجود في الاختيار b؛ والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">SF = 1</bdi> لما النتيجة تبقى سالبة."
    ],
    [
     "صح. الـ O هو الـ overflow flag (OF)، بيتعمله set لما نتيجة signed تبقى أكبر أو أصغر من إنها تدخل في الـ destination (L2, EFLAGS bits).",
     "مفيش flag اسمه «overload» في الـ EFLAGS؛ الـ O هو الـ overflow flag للنتايج الـ signed اللي مش بتدخل في الـ destination.",
     "الـ segment override ده instruction prefix (زي ES:)، مش bit في الـ EFLAGS؛ الـ O هو الـ overflow flag.",
     "مش «None»: الـ overflow bit موجود في الاختيار a، وهو واحد من الـ status flags في الـ EFLAGS."
    ],
    [
     "صح. الـ Program Counter (PC) شايل عنوان الـ instruction اللي هتتعمل لها fetch، يعني الـ instruction الجاية (L2, User-invisible registers).",
     "الـ MAR فيه عنوان memory location (داتا).",
     "الـ IR فيه آخر instruction اتجابت.",
     "الـ MBR شايل word داتا هتتكتب في الـ memory أو آخر word اتقرت، مش عنوان الـ instruction الجاية."
    ],
    [
     "الـ PC فيه عنوان الـ instruction الجاية.",
     "الـ MAR شايل عنوان مكان في الـ memory، مش الـ instruction نفسها؛ آخر instruction اتعملها fetch بتبقى في الـ IR.",
     "صح. الـ Instruction Register (IR) شايل آخر instruction اتعملها fetch (L2, User-invisible registers).",
     "الـ MBR شايل data word رايحة للـ memory أو جاية منها، مش الـ instruction اللي اتعملها fetch؛ دي قاعدة في الـ IR."
    ],
    [
     "الـ PC شايل عنوان الـ instruction الجاية اللي هتتعمل لها fetch، مش data word رايحة أو جاية من الـ memory.",
     "الـ MAR شايل <b>العنوان</b> بتاع المكان في الـ memory؛ أما الـ data word اللي بتتكتب هناك أو بتتقري منه فدي في الـ MBR.",
     "الـ IR شايل آخر instruction اتعملها fetch، مش data word هتتكتب في الـ memory.",
     "صح. الـ Memory Buffer Register (MBR) شايل word داتا هتتكتب في الـ memory أو آخر word اتقرت (L2, User-invisible registers)."
    ],
    [
     "الـ PC فيه عنوان الـ instruction الجاية بالتحديد.",
     "الـ MBR شايل الـ data word اللي بتتقري من الـ memory أو بتتكتب فيها؛ أما عنوان المكان ده فهو في الـ MAR.",
     "الـ IR شايل آخر instruction اتعملها fetch، مش memory address.",
     "صح. الـ Memory Address Register (MAR) شايل عنوان مكان في الـ memory (L2, User-invisible registers)."
    ],
    [
     "الـ general purpose registers دول <bdi dir=\"ltr\">user visible</bdi>، وهما:<span class=\"ltr\">EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI</span>إنما الـ MBR ده control register من النوع الـ <bdi dir=\"ltr\">user-invisible</bdi>.",
     "صح. الـ PC و IR و MAR و MBR كلهم user invisible.",
     "الـ user-visible registers تقدر الـ machine language تشاور عليها؛ الـ MBR لأ. وشجرة المحاضرة حاطاه تحت الـ user-invisible مع الـ PC والـ IR والـ MAR.",
     "الـ Special purpose registers هي EIP و EFLAGS."
    ],
    [
     "الـ general purpose registers هي EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI؛ الـ PC مش منهم، ده user-invisible register.",
     "شجرة الـ registers في المحاضرة حاطة الـ PC تحت الـ user-<b>INVISIBLE</b> registers (مع الـ MAR والـ MBR والـ IR)، مش الـ user-visible.",
     "صح. في شجرة المحاضرة الـ Program Counter ده <bdi dir=\"ltr\">user-invisible</bdi> register (يعني control أو status)، مع الـ MAR والـ MBR والـ IR <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L2, Register classification)</bdi>.",
     "الـ special purpose registers دي مجموعة user-visible (EIP, EFLAGS)؛ وفي شجرة المحاضرة الـ PC تحت الـ user-invisible registers."
    ],
    [
     "صح. كلهم general purpose و user-visible.",
     "الـ EAX والـ AX فعلًا user visible، بس الـ MAR والـ IR دول control registers من النوع الـ user-invisible، فالمجموعة دي غلط.",
     "الـ ECX والـ DX والـ SS user visible، بس الـ MBR ده user-invisible، فالمجموعة ككل غلط.",
     "مش «None»: الاختيار a (EAX, AX, ESP, BP) كله general purpose registers من النوع الـ user-visible."
    ],
    [
     "الـ CS والـ DS دول <bdi dir=\"ltr\">16-bit</bdi> <b>segment</b> registers؛ الـ special purpose registers هما الـ EIP والـ EFLAGS، وكل واحد فيهم <bdi dir=\"ltr\">32-bit</bdi>.",
     "صح. المحاضرة بتذكر اتنين special purpose registers: الـ EIP والـ EFLAGS، الاتنين <bdi dir=\"ltr\">32-bit</bdi> والـ CPU بيتعامل معاهم مباشرة (L2, Special purpose registers).",
     "الـ ECX والـ EDX دول <bdi dir=\"ltr\">32-bit</bdi> <b>general</b> purpose registers بيستخدموا في الحسابات ونقل الداتا، مش special purpose.",
     "مش «None»: الاختيار b هو الصح، لإن الـ EFLAGS (مع الـ EIP) special purpose register حجمه <bdi dir=\"ltr\">32-bit</bdi>."
    ],
    [
     "الـ CS والـ DS دول <bdi dir=\"ltr\">16-bit</bdi> segment registers، مش general purpose.",
     "الـ EFLAGS ده special purpose register (مع الـ EIP)، مش general purpose.",
     "صح. الـ eight <bdi dir=\"ltr\">32-bit</bdi> general purpose registers هما EAX, EBX, ECX, EDX, EBP, ESP, EDI و ESI، فالـ ECX والـ EDX منهم (L2, General purpose registers).",
     "مش «None»: الاختيار c هو الصح، لإن الـ ECX والـ EDX دول <bdi dir=\"ltr\">32-bit</bdi> general purpose registers."
    ],
    [
     "الـ CS والـ DS دول <bdi dir=\"ltr\">16-bit</bdi> segment registers، مش general purpose.",
     "صح. الـ EAX والـ EBX من الـ eight <bdi dir=\"ltr\">32-bit</bdi> general purpose registers اللي بتستخدم في الحسابات ونقل الداتا (L2, General purpose registers).",
     "الـ EFLAGS ده special purpose. (الـ key بتاع <bdi dir=\"ltr\">2022/23</bdi> حط خط تحت b و c الاتنين؛ بس b بس هو الصح.)",
     "مش «None»: الاختيار b هو الصح، لإن الـ EAX والـ EBX دول <bdi dir=\"ltr\">32-bit</bdi> general purpose registers."
    ],
    [
     "الـ CS والـ DS دول <bdi dir=\"ltr\">16-bit</bdi> segment registers، مش general purpose.",
     "صح. الـ EBX والـ EDX من الـ eight <bdi dir=\"ltr\" style=\"white-space:nowrap\">32-bit</bdi> general purpose registers:<span class=\"ltr\">EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L2, General purpose registers)</bdi>",
     "الـ BX فعلًا general purpose، بس الـ ES ده الـ extra <b>segment</b> register، فالجوز ده مش مجموعة general purpose registers.",
     "الـ EIP والـ EFLAGS هما الاتنين <bdi dir=\"ltr\">32-bit</bdi> special purpose registers، مش general purpose."
    ],
    [
     "صح. الـ segment registers (CS, DS, ES, SS) دي <bdi dir=\"ltr\">16-bit</bdi> user-visible registers بتستخدم كـ base locations للـ segments (L2, Segment registers).",
     "الـ FLAGS ده special purpose register (يعني status أو control)، لا هو general purpose ولا segment register.",
     "الـ ECX والـ EDX دول <bdi dir=\"ltr\">32-bit</bdi> general purpose registers؛ إنما الـ segment registers حجمها <bdi dir=\"ltr\">16-bit</bdi> (CS, DS, ES, SS).",
     "مش «None»: الاختيار a هو الصح، لإن الـ CS والـ DS دول <bdi dir=\"ltr\">16-bit</bdi> user-visible segment registers."
    ],
    [
     "الـ DS (data segment) بيشاور على الـ segment اللي فيه الداتا والـ variables، مش الـ instructions بتاعة البرنامج.",
     "صح. الـ CS (code segment) بيشاور على الـ segment اللي متخزن فيه الـ instructions بتاعة البرنامج اللي بيتنفذ (L2, Segment registers).",
     "الـ SS (stack segment) شايل الـ base بتاع الـ stack الشغال (local variables و parameters)، مش الـ instructions بتاعة البرنامج.",
     "الـ ES (extra segment) ده data segment إضافي، بيستخدم مثلًا كـ destination للـ string instructions، مش للـ code."
    ],
    [
     "الـ general purpose registers بتشيل داتا للحسابات ونقل الداتا؛ مابتتابعش الـ status بتاع الـ running environment.",
     "كلمة «Condition» مش نوع من أنواع الـ registers في المحاضرة؛ الـ status bits (اللي بتوصف حالة النتيجة) موجودة في الـ flags register.",
     "الـ segment registers بتشيل الـ base locations بتاعة الـ code والـ data والـ stack segments، مش معلومات status.",
     "صح. الـ flags register (EFLAGS) بيتابع الـ status بتاع الـ running environment: الـ bits بتاعته بتعكس نتايج العمليات أو بتتحكم في الـ CPU (L2, Special purpose registers)."
    ],
    [
     "الـ flags مابتوصفش حالة الـ memory؛ دي بتعكس نتيجة عمليات الـ CPU (الـ ALU) أو بتتحكم في الـ CPU.",
     "صح. الـ flag bits زي ZF و SF و CF و OF بتبلّغ عن حالة نتيجة عملية الـ ALU (صفر، سالبة، الـ carry، الـ overflow). المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L2, Special purpose registers)</bdi>",
     "ضيقة أوي: الـ flags بتبلّغ عن حالة نتيجة <b>أي</b> عملية ALU (طرح، والـ logic، والـ shifts كمان)، مش الجمع بس.",
     "ضيقة أوي: الـ flags بتبلّغ عن حالة نتيجة أي عملية ALU، مش الطرح بس."
    ],
    [
     "الـ «Instruction segment» مش register؛ الـ instructions متخزنة في الـ code segment، والـ instruction الحالية موجودة في الـ IR.",
     "صح. الـ instruction register (IR) شايل آخر instruction اتعملها fetch، يعني اللي بتتنفذ دلوقتي (L2, User-invisible registers).",
     "الـ instruction register بس هو اللي بيعمل كده؛ «instruction segment» مش register أصلًا، فـ «both» غلط.",
     "مش «None»: الـ instruction register هو اللي بيخزن الـ instruction اللي بتتنفذ دلوقتي."
    ],
    [
     "إنه يشيل نتايج مؤقتة للـ arithmetic والـ logic ده وصف الـ accumulator (AX)، مش الـ program counter.",
     "الـ instruction اللي اتعملها fetch بتتخزن في الـ instruction register (IR)؛ الـ PC بيشيل بس عنوان الـ instruction الجاية.",
     "الـ timing والـ control signals جايين من الـ clock والـ control unit، مش من الـ program counter.",
     "صح. الـ PC (اسمه IP في الـ 8086، وحجمه <bdi dir=\"ltr\">16-bit</bdi>) شايل الـ memory address بتاع الـ instruction الجاية اللي هتتعمل لها fetch وتتنفذ (L2, User-invisible registers)."
    ],
    [
     "صح. الـ PC شايل عنوان الـ instruction اللي هتتعمل لها fetch بعد كده؛ والـ EIP برضه شايل عنوان الـ instruction الجاية (L2, User-invisible registers).",
     "أول ما الـ instruction تتعمل لها fetch، الـ PC بيبقى بيشاور خلاص على الـ instruction <b>الجاية</b>؛ الـ instruction الحالية نفسها قاعدة في الـ IR.",
     "الـ PC مش عدّاد للـ instructions اللي اتنفذت.",
     "مش «None»: الاختيار a هو الصح، لإن الـ PC شايل عنوان الـ instruction الجاية اللي هتتنفذ."
    ],
    [
     "الـ SP ده register، والـ registers مبنية جوه الـ CPU؛ الـ RAM فيها داتا الـ stack نفسها، مش الـ stack pointer.",
     "الـ ROM دي memory دايمة read-only؛ إنما الـ stack pointer بيتغير طول الوقت، وهو register جوه الـ CPU.",
     "الـ SP مش في الـ RAM ولا في الـ ROM: ده register، يعني مكان تخزين مبني جوه الـ microprocessor.",
     "صح. الـ SP ده register، والـ registers هي high-speed temporary storage مبنية جوه الـ CPU، يعني الـ microprocessor (L2, Register classification)."
    ],
    [
     "الـ general purpose فعلًا نوع من أنواع الـ registers، بس الـ segment كمان نوع، فالإجابة الكاملة «a and b».",
     "الـ segment فعلًا نوع من أنواع الـ registers، بس الـ general purpose كمان نوع، فالإجابة الكاملة «a and b».",
     "الـ «Pointer» مش نوع في شجرة المحاضرة (الـ general purpose، والـ special purpose، والـ segment)؛ الـ SP والـ BP دول general purpose registers.",
     "صح. أنواع الـ user-visible في المحاضرة هي general purpose و special purpose و segment registers، فالـ a والـ b الاتنين أنواع (L2, Register classification)."
    ],
    [
     "الـ «Pointer instructions» مش اللي الـ CS بيشاور عليه؛ الـ CS بيشاور على الـ segment اللي فيه الـ code instructions بتاعة البرنامج.",
     "الـ «Path instructions» مش مصطلح في المحاضرة؛ الـ code segment اللي الـ CS بيشاور عليه فيه الـ code instructions بتاعة البرنامج.",
     "صح (حسب الـ revision key). الـ CS بيشاور على الـ code segment، اللي متخزن فيه الـ code instructions اللي الـ processor بينفذها (L2, Segment registers).",
     "الـ «Stream line» ده distractor مالوش معنى؛ الـ code segment اللي الـ CS بيشاور عليه فيه الـ code instructions."
    ],
    [
     "الـ byte الواحد فيه <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 bits</bdi>؛ الـ word ضعفه، يعني <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes (16 bits)</bdi>، قد الـ AX.",
     "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 bytes (64 bits)</bdi> دي quad word؛ الـ word حجمه <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes</bdi> والـ double word حجمه <bdi dir=\"ltr\" style=\"white-space:nowrap\">4 bytes</bdi>.",
     "صح. الـ word حجمه:<span class=\"ltr\">word = 2 bytes = 16 bits</span>قد الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">16-bit</bdi> registers زي الـ AX؛ والـ double word حجمه <bdi dir=\"ltr\" style=\"white-space:nowrap\">4 bytes</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L2, MOV instruction)</bdi>",
     "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bits</bdi> صغيرين جدًا؛ الـ byte لوحده <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 bits</bdi>، والـ word حجمه <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes (16 bits)</bdi>."
    ],
    [
     "صح. الـ segment registers بتشيل الـ base locations بتاعة الـ segments، وماينفعش تبقى operands في الـ arithmetic أو الـ logic instructions (L2, Segment registers).",
     "الأمر ده مش مسموح:<pre>ADD DS, 5</pre>الـ segment registers بتتحمّل بس بـ <bdi dir=\"ltr\">MOV/POP/LDS</bdi> وهكذا."
    ],
    [
     "صح. الـ zero flag (Z) بيتعمله set لـ 1 لما نتيجة الـ <bdi dir=\"ltr\">arithmetic/ALU</bdi> تطلع صفر <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L2, EFLAGS bits)</bdi>.",
     "الجملة صح: الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">ZF = 1</bdi> بالظبط لما نتيجة العملية تطلع صفر."
    ],
    [
     "العكس: الـ ZF بيتعمله set لـ <b>واحد</b> لما النتيجة تبقى صفر، وبيرجع 0 لما النتيجة مش صفر.",
     "صح. الـ ZF بيبقى 1 (مش 0) لما النتيجة تطلع صفر، فالجملة غلط (L2, EFLAGS bits)."
    ],
    [
     "الـ DI والـ SI دول index (general purpose) registers.",
     "صح. الـ segment registers هي CS, DS, ES, SS (وكمان FS, GS)؛ أما DI و SI فدول index registers (general purpose) (L2, Segment registers)."
    ],
    [
     "صح. الـ AX و BX و CX و DX بس اللي ليهم أنصاص <bdi dir=\"ltr\">8-bit</bdi>.",
     "الجملة صح: الـ AX والـ BX والـ CX والـ DX بس اللي ليهم أنصاص <bdi dir=\"ltr\" style=\"white-space:nowrap\">8-bit</bdi>؛ الـ <bdi dir=\"ltr\">SP/ESP</bdi> مالوش SPL ولا SPH، فبيستخدم <bdi dir=\"ltr\" style=\"white-space:nowrap\">16</bdi> أو <bdi dir=\"ltr\" style=\"white-space:nowrap\">32 bit</bdi> بس."
    ],
    [
     "الـ SH والـ SL مش موجودين أصلًا: الـ SI والـ DI والـ SP والـ BP مالهمش أنصاص <bdi dir=\"ltr\">8-bit</bdi>، الأنصاص دي للـ AX, BX, CX, DX بس.",
     "صح. الـ ESI ينفع يتستخدم كـ SI (<bdi dir=\"ltr\" style=\"white-space:nowrap\">16 bits</bdi>) أو ESI (<bdi dir=\"ltr\" style=\"white-space:nowrap\">32 bits</bdi>) بس؛ مفيش <bdi dir=\"ltr\">SH/SL</bdi>، لإن الـ <bdi dir=\"ltr\">AX, BX, CX, DX</bdi> بس اللي ليهم أنصاص <bdi dir=\"ltr\" style=\"white-space:nowrap\">8-bit</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L2, General purpose registers)</bdi>"
    ],
    [
     "صح. دي شجرة الـ registers في المحاضرة. (فيه طالب علّم False على ورقة <bdi dir=\"ltr\">2024/25</bdi>.)",
     "المحاضرة حاطة التلاتة تحت الـ user-visible."
    ],
    [
     "آخر instruction اتعملها fetch موجودة في الـ IR؛ الـ MAR شايل عنوان مكان في الـ memory.",
     "صح. الـ MAR شايل عنوان مكان في الـ memory؛ أما آخر instruction اتعملها fetch فهي في الـ IR (L2, User-invisible registers)."
    ],
    [
     "الـ EX والـ FX مش موجودين؛ الـ <bdi dir=\"ltr\">16-bit</bdi> general registers هي AX, BX, CX, DX, SP, BP, SI و DI.",
     "صح. مفيش registers اسمها EX أو FX؛ الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">16-bit</bdi> general purpose registers هي:<span class=\"ltr\">AX, BX, CX, DX, SP, BP, SI, DI</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L2, General purpose registers)</bdi>"
    ],
    [
     "صح. (نسخة الـ revision اللي بتقول \"hold the offset of the stack\" تبقى False: الـ offset في الـ SP.)",
     "الجملة صح: الـ SS شايل الـ starting address بتاع الـ stack segment الشغال (والـ offset بتاع الـ top موجود في الـ SP)."
    ],
    [
     "الـ PC فيه عنوان الـ instruction الجاية.",
     "صح. الـ PC شايل عنوان الـ instruction الجاية اللي هتتعمل لها fetch؛ مابيعدّش كام instruction اتنفذت (L2, User-invisible registers)."
    ],
    [
     "صح. الـ sign flag بيتعمله set لما النتيجة تبقى سالبة، يعني الـ most significant bit بتاعها بـ 1 <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L2, EFLAGS bits)</bdi>.",
     "الجملة صح: الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">SF = 1</bdi> كل ما نتيجة الـ ALU (مثلًا في الـ accumulator) تطلع سالبة."
    ],
    [
     "صح. الـ CF هو الـ carry flag، بيتعمله set لما نتيجة unsigned تبقى أكبر من الـ destination؛ وهو كمان الـ borrow flag في الـ SBB (L2, EFLAGS bits).",
     "مفيش حاجة اسمها «condition flag»؛ الـ CF هو الـ carry flag، واحد من الـ six status flags.",
     "مفيش «common flag» في الـ EFLAGS؛ الـ C في الـ CF معناها carry.",
     "مش «None»: الاختيار a، الـ carry flag، هو الاسم الصح للـ CF."
    ]
   ],
   "extra": [
    [
     "ده عاكس النصين: الـ AH هو الـ byte <b>العالي</b> من الـ AX (30h)، والـ AL هو الـ byte الواطي (39h).",
     "صح. الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 bits</bdi> العليا بـ <bdi dir=\"ltr\">30h</bdi>، والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 bits</bdi> السفلى بـ <bdi dir=\"ltr\">39h</bdi> (اللي هي <bdi dir=\"ltr\">0011000000111001b</bdi> بتاعة الـ lab).",
     "الـ AH حجمه 8 bits بس، فمايقدرش يشيل القيمة 3039h اللي هي <bdi dir=\"ltr\">16-bit</bdi>؛ هو بيشيل الـ byte العالي 30h.",
     "كل نص شايل byte كامل (two hex digits)، مش digit واحدة:<span class=\"ltr\">AH = 30h, AL = 39h</span>"
    ],
    [
     "الـ AX هو الـ accumulator للحسابات والـ logic (والـ <bdi dir=\"ltr\">MUL/DIV</bdi>)؛ الـ counter بتاع الـ LOOP والـ shifts والـ rotates هو الـ CX.",
     "الـ BX هو الـ base register، بيشيل الـ <bdi dir=\"ltr\">base/offset</bdi> address بتاع مكان في الـ memory؛ الـ LOOP بيعد بالـ CX.",
     "الـ DX هو الـ data register، امتداد للـ AX في الـ <bdi dir=\"ltr\">MUL/DIV</bdi>؛ الـ LOOP بيستخدم الـ CX كـ counter.",
     "صح. الـ CX هو الـ count register، بيستخدم كـ counter للـ LOOP والـ rotate والـ shift instructions (L2, Roles of each register)."
    ],
    [
     "صح. الـ Instruction Register (IR) شايل آخر instruction اتعملها fetch (L2, User-invisible registers).",
     "الـ PC فيه عنوان الـ instruction الجاية.",
     "الـ MAR شايل عنوان مكان في الـ memory، مش الـ instruction اللي اتعملها fetch نفسها.",
     "الـ MBR شايل data word بتتكتب في الـ memory أو بتتقري منها، مش آخر instruction اتعملها fetch."
    ],
    [
     "الـ DF (direction) هو الـ <b>CONTROL</b> flag الوحيد، المبرمج بيعمله set عشان يحدد اتجاه الـ string instructions؛ مابيعكسش نتيجة.",
     "الـ TF (trap) ده system flag بيشغّل الـ single-stepping؛ مابيعكسش نتيجة عملية.",
     "صح. الـ ZF ده status flag: بيعكس نتيجة العملية (بيتعمله set لـ 1 لما النتيجة تطلع صفر)، زيه زي CF, PF, AF, SF, OF (L2, EFLAGS bits).",
     "الـ IF (interrupt) ده system flag بيفعّل أو بيقفل الـ interrupts؛ مابيعكسش نتيجة."
    ],
    [
     "الـ BH موجود: ده الـ high byte بتاع الـ BX، لإن الـ BX واحد من الأربعة registers اللي ليهم أنصاص <bdi dir=\"ltr\">8-bit</bdi>.",
     "صح. الـ SL مش موجود: الـ SI (زي الـ DI والـ SP والـ BP) مالوش أنصاص <bdi dir=\"ltr\">8-bit</bdi>؛ الأنصاص دي للـ AX, BX, CX, DX بس (L2, General purpose registers).",
     "الـ DL موجود: ده الـ low byte بتاع الـ DX، واحد من الأربعة registers اللي ليهم أنصاص <bdi dir=\"ltr\">8-bit</bdi>.",
     "الـ SP موجود: ده الـ <bdi dir=\"ltr\">16-bit</bdi> stack pointer، الـ offset بتاع الـ top of the stack."
    ],
    [
     "الـ SF بيبلّغ إن النتيجة سالبة (<bdi dir=\"ltr\" style=\"white-space:nowrap\">MSB = 1</bdi>)؛ مابيبلّغش إن نتيجة unsigned أكبر من الـ byte.",
     "الـ ZF بيبلّغ إن النتيجة صفر، مش إنها عدّت الـ 255.",
     "الـ OF بيبلّغ عن الـ <b>SIGNED</b> overflow (النتيجة برا الـ signed range)؛ أما نتيجة unsigned أكبر من 255 فالـ CF هو اللي بيبلّغ عنها.",
     "صح. نتيجة unsigned أكبر من الـ destination."
    ],
    [
     "صح. الـ stack segment، اللي الـ SS بيشاور عليه، فيه الـ local function variables والـ function parameters (L2, Segment registers).",
     "الـ CS بيشاور على الـ code segment، اللي فيه الـ instructions بتاعة البرنامج، مش الـ local variables والـ parameters.",
     "الـ DS بيشاور على الـ data segment، اللي فيه الـ variables (الداتا) بتاعة البرنامج، مش الـ locals والـ parameters بتوع الـ functions اللي على الـ stack.",
     "الـ ES ده الـ extra segment، وده data segment تاني؛ الـ local variables والـ parameters بتبقى في الـ stack segment (SS)."
    ],
    [
     "التحكم في شغل الـ CPU ده دور الـ <bdi dir=\"ltr\">user-<b>INVISIBLE</b></bdi> registers (يعني control أو status)، مش ميزة الـ <bdi dir=\"ltr\">user-visible</bdi>.",
     "صح. الـ user-visible registers الـ machine language تقدر تشاور عليها، فالمبرمج يقدر يقلل الـ main memory references لما يستخدم الـ registers بذكاء (L2, Register classification).",
     "الـ registers جوه الـ CPU ومابتغيرش حجم الـ RAM؛ ميزتها إنها بتقلل الـ main memory references.",
     "المحاضرة ماجابتش سيرة الـ cache خالص؛ الميزة اللي ذكرتها هي تقليل الـ main memory references."
    ],
    [
     "الـ SI هو الـ Source Index، بيشيل الـ source data للـ string instructions، مش الـ destination.",
     "الـ BP هو الـ base pointer، بيستخدم عشان نوصل لـ array of data في الـ stack، مش الـ destination بتاع الـ string.",
     "صح. الـ DI هو الـ Destination Index، بيشيل الـ destination data للـ string instructions (L2, Roles of each register).",
     "الـ DX هو الـ data register، امتداد للـ AX في الـ <bdi dir=\"ltr\">MUL/DIV</bdi>؛ الـ destination index هو الـ DI."
    ],
    [
     "الـ 1234h دي الـ upper 16 bits من الـ EAX، ومالهاش اسم لوحدها؛ الـ AX هو الـ <b>LOWER</b> 16 bits، يعني 5678h.",
     "الـ 78h ده أوطى byte بس، يعني الـ AL؛ الـ AX هو الـ lower <bdi dir=\"ltr\" style=\"white-space:nowrap\">16 bits</bdi> كلهم، يعني <bdi dir=\"ltr\">5678h</bdi>، وفيه:<span class=\"ltr\">AH = 56h, AL = 78h</span>",
     "الـ 12345678h دي الـ 32 bits كلهم، يعني الـ EAX نفسه؛ الـ AX هو الـ lower 16 bits بس، 5678h.",
     "صح. الـ AX هو الـ lower <bdi dir=\"ltr\" style=\"white-space:nowrap\">16 bits</bdi> من الـ EAX:<span class=\"ltr\">12345678h → AX = 5678h (AH = 56h, AL = 78h)</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L2, General purpose registers)</bdi>"
    ]
   ]
  },
  "3": {
   "notes": [
    {
     "h": "يعني إيه addressing mode؟",
     "pts": [
      "الـ addressing mode هو <b>الطريقة اللي بنوصل بيها للداتا في الـ memory</b>. الأنواع: register و immediate و direct و displacement addressing (المحاضرة دي)، وبعدها register indirect و indexed و base plus index و base plus index plus displacement (Lecture 4).",
      "بنستخدم الـ MOV instruction عشان نوضّح الفرق بين الـ modes دي."
     ],
     "figH": {
      "mp-modes-overview": "نفس الـ MOV بأربع modes: الداتا بتاعة الـ source جاية منين"
     }
    },
    {
     "h": "الـ Register addressing وقيوده",
     "pts": [
      "ده <b>أشهر</b> شكل لعنونة الداتا: الـ operands الاتنين registers، زي:<pre>MOV AX, BX\nMOV BL, CL</pre>",
      "<b>(1) الـ operands الاتنين لازم يبقوا نفس الحجم.</b> دول غلط:<pre>MOV EAX, BL\nMOV SI, BL</pre>ودول غلط برضه (<bdi dir=\"ltr\" style=\"white-space:nowrap\">32</bdi> مقابل <bdi dir=\"ltr\" style=\"white-space:nowrap\">16 bits</bdi> في الحجم):<pre>MOV EBX, AX\nMOV ECX, AX</pre>",
      "<b>(2) ماينفعش تنقل داتا من segment register لـ segment register تاني</b> في instruction واحدة. دول كلهم غلط:<pre>MOV DS, CS\nMOV DS, ES\nMOV SS, CS</pre>الحل إنك تعدّي على general register:<pre>MOV AX, CS\nMOV DS, AX</pre>",
      "<b>(3) ماينفعش تغيّر قيمة الـ CS</b>، فده غلط:<pre>MOV CS, AX</pre>بس إنك تقرا منه عادي، ودول صح:<pre>MOV AX, CS\nMOV AX, DS</pre>",
      "<b>(4) النقل من memory لـ memory مش مسموح</b> (إلا في الـ string instructions)، فدول غلط:<pre>MOV [DI], [SI]\nMOV [AX], [5000H]</pre>",
      "<b>(5) الـ destination ماينفعش يبقى immediate data</b>، فدول مستحيلين:<pre>MOV 55H, BL\nMOV 100, [DI]</pre>الـ destination يا register يا memory location.",
      "النسخ بين أي general registers من نفس الحجم مسموح: الأمر <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV EAX, ESP</bdi> بينسخ ESP في EAX (والـ source بيفضل بقيمته؛ الـ MOV عمرها ما بتمسح الـ source)."
     ],
     "figH": {
      "mp-seg-detour": "من segment لـ segment: الحل إننا نعدّي على الـ AX في خطوتين",
      "mp-mov-check": "مراجعة الـ MOV: الـ instruction صح ولا غلط، وبتكسر أنهي قاعدة؟"
     }
    },
    {
     "h": "الـ Immediate addressing",
     "pts": [
      "الـ MOV بتنقل نسخة من الـ <b>immediate data</b> (رقم ثابت مكتوب جوه الـ instruction نفسها) لـ register أو memory location. في الـ 8086 بتشتغل على byte أو word.",
      "أمثلة، والحجم جنب كل واحدة:<pre>MOV BL, 44     ; 8 bits\nMOV AX, 44H    ; 16 bits\nMOV CH, 100    ; 8 bits\nMOV EAX, 12    ; 32 bits\nMOV EBX, 100B  ; 32 bits</pre>والأخيرة يعني 100 binary.",
      "الأمر ده تبع الـ <b>immediate</b> addressing:<pre>MOV AX, 0005H</pre>وده تبع الـ <b>register</b> addressing:<pre>MOV AX, BX</pre>",
      "اللواحق بتاعة الأرقام:<span class=\"ltr\">H = hexadecimal, B = binary</span>(زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AX, 1001b</bdi>)، ومن غير لاحقة يبقى decimal."
     ],
     "figH": {
      "mp-immediate": "الـ immediate data: اللاحقة بتحدد القيمة، والـ register بيحدد الحجم"
     }
    },
    {
     "h": "الـ Direct والـ displacement addressing",
     "pts": [
      "الـ <b>Direct addressing</b>: الـ MOV بتنقل داتا بين memory location في الـ data segment وبين <b>AL أو AX أو EAX</b>. هنا الـ segment الـ default هو DS:<pre>MOV AL, [123H]</pre>وهنا الـ segment اتغيّر غصب لـ ES:<pre>MOV EAX, ES:[123H]</pre>",
      "الـ <b>Displacement addressing</b>: نفس الفكرة بس بين الـ memory و<b>كل الـ registers التانية</b>:<pre>MOV CL, [123H]       ; DS\nMOV EBX, ES:[123H]   ; ES</pre>",
      "ملحوظة: الامتحانات ساعات بتسمّي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV EAX, [DI]</bdi> بـ <bdi dir=\"ltr\">\"direct addressing environment\"</bdi>؛ هي في الحقيقة register indirect، شوف <bdi dir=\"ltr\" style=\"white-space:nowrap\">Lecture 4</bdi>، بس حساب العنوان هو هو:<span class=\"ltr\">DS×10 + DI</span>"
     ],
     "figH": {
      "mp-direct-disp": "الـ direct ولا الـ displacement؟ ده بيعتمد على الـ register"
     }
    },
    {
     "h": "الـ <bdi dir=\"ltr\">Segment:offset</bdi> والـ physical address",
     "figH": {
      "mp-phys-addr": "حساب الـ physical address خانة خانة بالـ segment والـ offset"
     }
    },
    {
     "h": "أمثلة المحاضرة <bdi dir=\"ltr\">(DS=1000, ES=1400, DI=150, EAX=1234)</bdi>",
     "figH": {
      "mp-lec3-figure": "رسمة الـ slides: الـ segment في 10 زائد الـ offset بيشاور على الـ byte اللي بيروح للـ AL أو الـ BL"
     }
    },
    {
     "h": "الـ Segment overriding",
     "pts": [
      "الـ <b>Segment overriding</b>: لما الـ offset register مايتستخدمش مع الـ segment register الـ default بتاعه، وتستخدم segment تاني بإنك تكتبه قبل الـ offset. أمثلة:<pre>MOV BL, ES:[1234H]\nMOV AL, CS:[BX]\nMOV AX, DS:[BP]</pre>",
      "الـ default segment <b>ينفع</b> يتعمله override. بس ده <b>غلط (illegal)</b>:<pre>MOV ES:SI, CX</pre>(الأقواس ناقصة: SI هنا register مش memory operand)؛ الصح:<pre>MOV ES:[SI], CX</pre>"
     ],
     "figH": {
      "mp-override": "الـ segment override: الـ prefix بياخد مكان الـ default segment"
     }
    },
    {
     "h": "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Lab 3</bdi>: أول برامج على الـ emu8086",
     "figH": {
      "mp-lab3": "برامج الـ Lab 3 بتتنفذ سطر سطر، أو اكتب برنامجك"
     }
    }
   ],
   "cards": [
    "الطريقة اللي بنوصل بيها للداتا في الـ memory.",
    "الـ Register addressing.",
    "الـ operands الاتنين لازم يبقوا نفس الحجم (MOV EAX, BL غلط).",
    "مش مسموح. استخدم MOV AX, CS وبعدين MOV DS, AX.",
    "غلط: ماينفعش تغيّر الـ CS.",
    "غلط: النقل من memory لـ memory مش مسموح.",
    "مستحيلة: الـ destination ماينفعش يبقى immediate data.",
    "الـ Immediate addressing.",
    "الـ memory في الـ DS مع AL أو AX أو EAX، زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AL, [123H]</bdi>.",
    "الـ memory في الـ DS مع كل الـ registers التانية، زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV CL, [123H]</bdi>.",
    "القانون:<span class=\"ltr\">Segment × 10H + offset</span>",
    "العنوان 11234.",
    "العنوان 15234، والـ segment هو ES.",
    "إنك تستخدم segment غير الـ default بإنك تكتبه قبل الـ offset، زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">ES:[1234H]</bdi>.",
    "الـ DS.",
    "بيبدّل محتوى AX و BX."
   ],
   "qa": [
    "(1) الـ operands الاتنين لازم يبقوا نفس الحجم، فدول غلط:<pre>MOV EAX, BL\nMOV SI, BL</pre>(2) ماينفعش تنقل داتا من segment register لـ segment register تاني في instruction واحدة، فده غلط:<pre>MOV DS, CS</pre>استخدم بداله:<pre>MOV AX, CS\nMOV DS, AX</pre>(3) ماينفعش تغيّر قيمة الـ CS، فده غلط:<pre>MOV CS, AX</pre>(وكمان: مفيش نقل من memory لـ memory، والـ destination ماينفعش يبقى immediate data.)",
    "الأمر <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AX, 100</bdi>: مفيش error.<br>الأمر <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV EBX, AX</bdi>: فيه error، الـ EBX (<bdi dir=\"ltr\" style=\"white-space:nowrap\">32 bits</bdi>) والـ AX (<bdi dir=\"ltr\" style=\"white-space:nowrap\">16 bits</bdi>) مختلفين في الحجم.<br>الأمر <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AX, DS</bdi>: مفيش error (القراية من segment register مسموحة).<br>الأمر <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV CS, DS</bdi>: فيه error، النقل من segment لـ segment مش مسموح، والـ CS ماينفعش يتغير.",
    "لما الـ offset register مايتستخدمش مع الـ segment register الـ default بتاعه، ويتستخدم مع segment تاني مكتوب قبل الـ offset. مثال:<pre>MOV BL, ES:[1234H]</pre>بتستخدم ES بدل الـ DS الـ default، فالعنوان:<span class=\"ltr\">address = ES×10 + 1234</span>",
    "الأمر الأول:<pre>MOV AL, [1234H]</pre>العنوان:<span class=\"ltr\">DS×10 + 1234 = 10000 + 1234 = <b>11234</b></span>والـ byte اللي عند <bdi dir=\"ltr\">11234</bdi> بيتنسخ في AL.<br>الأمر التاني:<pre>MOV BL, ES:[1234H]</pre>العنوان:<span class=\"ltr\">ES×10 + 1234 = 14000 + 1234 = <b>15234</b></span>والـ byte اللي عند <bdi dir=\"ltr\">15234</bdi> بيتنسخ في BL.<br>الرسمة: مربع الـ segment register <bdi dir=\"ltr\" style=\"white-space:nowrap\">×10</bdi> والـ offset داخلين على adder (+)، وسهم بيشاور على الـ memory location، وسهم من خانة الـ memory رايح للـ destination register.",
    "الاتنين بينقلوا داتا بين memory location في الـ data segment (الـ default هو DS، وينفع يتعمله override) وبين register، باستخدام عنوان ثابت. الـ Direct addressing بيستخدم AL أو AX أو EAX (MOV AL, [123H])؛ والـ displacement addressing بيستخدم كل الـ registers التانية (MOV CL, [123H])."
   ],
   "quiz": [
    [
     "الـ Register addressing محتاج register يكون هو الـ source (زي MOV AX, BX)؛ هنا الـ source هو 0005H، ده رقم ثابت مكتوب جوه الـ instruction.",
     "الـ Direct addressing بيقرا من memory location مكتوب بين أقواس زي [0005H]؛ لكن 0005H من غير أقواس دي data، مش address.",
     "صح. الـ source هو 0005H، رقم ثابت مكتوب جوه الـ instruction نفسها، فالـ MOV بتنسخ immediate data جوه الـ AX (L3, Immediate addressing).",
     "الـ Register relative محتاج memory operand زي [BX+4]؛ وهنا مفيش أقواس خالص، فيه بس الرقم الثابت 0005H."
    ],
    [
     "الـ Direct addressing بينقل data بين <bdi dir=\"ltr\">AL/AX/EAX</bdi> وmemory location زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">[1234H]</bdi>؛ لكن هنا الاتنين operands registers.",
     "صح. الاتنين operands (الـ AX والـ BX) registers من نفس الحجم، وده الـ register addressing، وهو أكتر mode مستخدم <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L3, Register addressing)</bdi>.",
     "الـ Indexed addressing بيستخدم SI أو DI بين أقواس كـ pointer على الـ memory (زي [SI])؛ لكن MOV AX, BX مابتلمسش الـ memory أصلًا.",
     "الـ Immediate addressing محتاج رقم ثابت يكون هو الـ source (زي MOV AX, 5)؛ والـ BX ده register."
    ],
    [
     "الـ MOV AX, BX سليمة، دي register addressing: اتنين general registers <bdi dir=\"ltr\">16-bit</bdi> من نفس الحجم.",
     "سليمة: تحميل segment register من general register.",
     "صح. ده نقل من memory لـ memory (وكمان AX ماينفعش يبقى pointer).",
     "الـ PUSH AX سليمة: بتنقّص الـ SP بـ 2 وبتخزن الـ AX اللي هو <bdi dir=\"ltr\">16-bit</bdi> على الـ stack (L5)."
    ],
    [
     "من register لـ register مسموح (وده أكتر mode مستخدم)، طالما الاتنين نفس الحجم، زي MOV AX, BX.",
     "صح. النقل من memory لـ memory مش مسموح بالـ MOV (الـ string instructions بس هي اللي تقدر تعمله)، يعني MOV [DI], [SI] غلط (L3, Register addressing and its restrictions).",
     "الـ memory location مع register مسموح بأي ترتيب، زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV [BX], AX</bdi> أو <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AX, [BX]</bdi>.",
     "مسموح كـ source (بس الـ immediate عمره ما يبقى destination)."
    ],
    [
     "صح. النقل من segment لـ segment مش مسموح.",
     "الـ MOV AX, CS مسموحة: ينفع <b>تقرا</b> الـ CS وتحطه في general register؛ الممنوع بس إنك تغيّر الـ CS (MOV CS, AX).",
     "الـ MOV EAX, ESP مسموحة: الاتنين general purpose registers <bdi dir=\"ltr\">32-bit</bdi>، والـ MOV ببساطة بتنسخ الـ ESP في الـ EAX.",
     "الـ MOV BX, DX مسموحة: اتنين general registers <bdi dir=\"ltr\">16-bit</bdi> من نفس الحجم."
    ],
    [
     "ده فعلًا اللي هي بتحاول تعمله، بس نقل segment register لـ segment register تاني في instruction واحدة مش مسموح؛ الحل: MOV AX, ES وبعدين MOV DS, AX.",
     "الـ MOV بتنسخ الـ source (الـ ES) في الـ destination (الـ DS)، فالاختيار ده عاكس الاتجاه، وأصلًا النقل من segment لـ segment مش مسموح.",
     "الـ MOV عمرها ما بتمسح الـ source بتاعها، وعلى أي حال النقل من segment لـ segment زي MOV DS, ES مش مسموح.",
     "صح. ماينفعش تنقل data من segment register لـ segment register تاني في instruction واحدة، فالـ MOV DS, ES بتعمل error (L3, Register addressing and its restrictions)."
    ],
    [
     "صح. الـ EAX والـ ESP الاتنين general purpose registers <bdi dir=\"ltr\">32-bit</bdi>، فالـ MOV بتنسخ الـ ESP في الـ EAX والـ ESP بيفضل محتفظ بقيمته (L3, Register addressing).",
     "الـ operands هنا هما الـ EAX والـ ESP اللي <bdi dir=\"ltr\">32-bit</bdi>، فالـ 32 bit كلهم بيتنسخوا، مش بس الـ SP اللي <bdi dir=\"ltr\">16-bit</bdi> في الـ AX.",
     "الـ MOV بتنسخ بس؛ الـ source اللي هو الـ ESP بيفضل بقيمته. مفيش حاجة بتتمسح.",
     "مفيش error: الـ EAX والـ ESP general purpose registers من نفس الحجم، فالنقل سليم."
    ],
    [
     "صح. تغيير قيمة الـ CS مش مسموح، فالـ MOV CS, AX بتعمل error (إنما قرايته، MOV AX, CS، عادي) (L3, Register addressing and its restrictions).",
     "الـ MOV EAX, EBP سليمة: الاتنين general purpose registers <bdi dir=\"ltr\">32-bit</bdi>.",
     "الـ MOV CX, [SI] سليمة، دي register indirect addressing: الـ SI بيشاور على word في الـ data segment (DS×10 + SI).",
     "الاتنين سليمين: الـ PUSHA بتعمل push لكل الـ general registers الـ <bdi dir=\"ltr\">16-bit</bdi>، والـ POP AX بتعمل pop لـ word واحدة في الـ AX (L5)."
    ],
    [
     "الـ MOV AX, BX ممكنة: register addressing باتنين registers <bdi dir=\"ltr\">16-bit</bdi>.",
     "الـ MOV AX, [BX] ممكنة: register indirect، بتقرا الـ word اللي عند DS×10 + BX وتحطها في الـ AX.",
     "صح. الـ immediate data ماينفعش تبقى destination.",
     "الـ MOV AL, 55H ممكنة: immediate addressing بتنسخ الـ byte الثابت 55H في الـ AL اللي <bdi dir=\"ltr\">8-bit</bdi>."
    ],
    [
     "الـ MOV AX, [BX] ممكنة: من memory لـ register والـ BX شغال كـ pointer.",
     "الـ MOV AX, 5555H ممكنة: immediate addressing برقم ثابت <bdi dir=\"ltr\">16-bit</bdi> في register <bdi dir=\"ltr\">16-bit</bdi>.",
     "الـ MOV AX, [SI] ممكنة: من memory لـ register والـ SI هو الـ pointer.",
     "صح. الاتنين operands memory locations، والنقل من memory لـ memory مش مسموح بالـ MOV (L3, Register addressing and its restrictions)."
    ],
    [
     "الـ MOV AX, [BX] ممكنة: من memory لـ register والـ BX بيشاور جوه الـ data segment.",
     "الـ MOV AX, 5555H ممكنة: رقم ثابت immediate <bdi dir=\"ltr\">16-bit</bdi> في register <bdi dir=\"ltr\">16-bit</bdi>.",
     "دي كمان غلط على الـ 8086 الحقيقي (الـ <bdi dir=\"ltr\">16-bit</bdi>)، لأن AX ماينفعش يتستخدم كـ pointer، فالاختيار ده ممكن يتدافع عنه هو كمان.",
     "صح (الإجابة المقصودة). الـ immediate value عمرها ما تبقى destination."
    ],
    [
     "الـ MOV [DI], [SI] كانت هتنسخ من memory لـ memory، والـ MOV ماتقدرش تعمل كده؛ وكمان هي بتتكلم عن الـ memory اللي الـ registers بتشاور عليها، مش الـ registers نفسها.",
     "الاتجاه غلط (الـ destination هو [DI])، وعلى أي حال النقل من memory لـ memory مش مسموح بالـ MOV.",
     "الـ MOV عمرها ما بتمسح الـ source، والشكل ده (memory لـ memory) غلط من الأساس.",
     "صح. الاتنين operands memory locations؛ والنقل من memory لـ memory مش مسموح (إلا بالـ string instructions زي MOVS) (L3, Register addressing and its restrictions)."
    ],
    [
     "الـ memory ينفع تبقى destination، بس الـ register كمان ينفع، فالإجابة الكاملة هي \"memory location and register\".",
     "الـ register ينفع يبقى destination، بس الـ memory location كمان ينفع، فالإجابة الكاملة فيها الاتنين.",
     "الـ immediate data عمرها ما تبقى destination، والأمر ده مستحيل:<pre>MOV 55H, BL</pre>لأن الرقم الثابت مايقدرش يستقبل قيمة.",
     "صح. الـ destination ممكن يبقى register أو memory location، لكن عمره ما يبقى immediate data (L3, Register addressing and its restrictions)."
    ],
    [
     "الـ 15243 دي آخر رقمين فيها متبدلين؛ الجمع الصح:<span class=\"ltr\">14000 + 1234 = 15234</span>",
     "صح. الـ override بيقول استخدم الـ ES، يعني:<span class=\"ltr\">ES×10H + 1234H = 14000 + 1234 = 15234</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L3, Lecture examples)</bdi>",
     "الـ 1634 مش طالعة من <bdi dir=\"ltr\">ES×10H + 1234</bdi>؛ لما الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">ES = 1400</bdi> الـ base لوحده بيبقى 14000، فالـ address لازم يبقى 15234.",
     "الـ 1643 نسيت الـ shift (<bdi dir=\"ltr\" style=\"white-space:nowrap\">×10H</bdi>) بتاع الـ ES ومجموعها غلط كمان؛ الـ address هو:<span class=\"ltr\">ES×10 + 1234 = 15234</span>"
    ],
    [
     "صح. الـ prefix اللي هو ES: ده segment override، فالـ ES بياخد مكان الـ DS الـ default في الـ memory access ده (L3, Segment overriding).",
     "الـ DS هو الـ default segment للـ MOV، بس الـ ES: المكتوب عمله override.",
     "الـ SS بيبقى default بس مع الـ addresses اللي معمولة بـ <bdi dir=\"ltr\">BP/SP</bdi>؛ هنا الـ ES مكتوب صريح كـ override.",
     "الـ CS بيُستخدم في جلب الـ instructions (<bdi dir=\"ltr\">CS:IP</bdi>)؛ هنا الـ ES مكتوب صريح، فهو ده الـ segment."
    ],
    [
     "الـ ES بيُستخدم بس لما يتكتب كـ override (<bdi dir=\"ltr\">ES:[1234H]</bdi>)؛ ومن غير prefix بيتطبق الـ default segment.",
     "صح. مفيش segment مكتوب، فبيتستخدم الـ default segment بتاع الـ MOV، اللي هو الـ DS:<span class=\"ltr\">address = DS×10 + 1234</span>المصدر: <bdi dir=\"ltr\">(L3, Segment:offset and the physical address)</bdi>",
     "الـ SS بيبقى default بس لما الـ BP أو الـ SP هما اللي بيكوّنوا الـ address؛ لكن [1234H] بيستخدم الـ DS الـ default.",
     "الـ CS هو الـ segment بتاع جلب الـ instructions (<bdi dir=\"ltr\">CS:IP</bdi>)، مش بتاع الـ data operands زي <bdi dir=\"ltr\">[1234H]</bdi>، دول الـ default بتاعهم DS."
    ],
    [
     "أول operand هو الـ destination، فالـ sub val3, eax بتحسب val3 − eax وتخزن النتيجة في val3، مش في الـ EAX.",
     "صح. الـ syntax هو instruction destination, source: فالـ sub eax, val3 بتحسب EAX − val3 وبتسيب النتيجة في الـ EAX.",
     "كلمة \"subtract\" مش mnemonic في الـ 8086؛ الـ instruction بتاعة الطرح اسمها SUB.",
     "ترتيب الـ operands صح، بس الـ mnemonic اسمه SUB مش \"subtract\"، فدي مش هتعدي من الـ assembler."
    ],
    [
     "صح. نقل segment register لـ segment register تاني في instruction واحدة مش مسموح، وكمان كده هتغيّر الـ CS (L3, Register addressing and its restrictions).",
     "الجملة صح: الـ MOV SS, CS نقل من segment لـ segment، وده مش مسموح؛ لازم تعدّي على general register."
    ],
    [
     "الاتنين operands memory، والنقل من memory لـ memory مش مسموح (وكمان الـ AX مش pointer صالح في الـ 8086)، فهي مش صح.",
     "صح. الـ MOV [AX], [150H] نقل من memory لـ memory، والمحاضرة حاطاه في الـ instructions الغلط (L3, Register addressing and its restrictions)."
    ],
    [
     "صح. لما تكتب segment قبل الـ offset بتعمل override للـ default، زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV BL, ES:[1234H]</bdi> بتستخدم الـ ES بدل الـ DS. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L3, Segment overriding)</bdi>",
     "الجملة صح: الـ segment overriding موجود، زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV BL, ES:[1234H]</bdi> أو <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AL, CS:[BX]</bdi>."
    ],
    [
     "الـ default segments ينفع يتعملها override لما تكتب segment prefix، زي <bdi dir=\"ltr\">ES:[1234H]</bdi> أو <bdi dir=\"ltr\">DS:[BP]</bdi>، فالجملة غلط.",
     "صح. الـ default segment <b>ينفع</b> يتعمله override لما تكتب الـ segment قبل الـ offset، زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV BL, ES:[1234H]</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L3, Segment overriding)</bdi>"
    ],
    [
     "الـ SI من غير أقواس يبقى register، فـ <bdi dir=\"ltr\">ES:SI</bdi> ملهاش معنى.",
     "صح. (نفس الفكرة: الجملة <bdi dir=\"ltr\" style=\"white-space:nowrap\">\"MOV ES:SI,CX is incorrect\"</bdi> تبقى True.)"
    ],
    [
     "صح. الـ <bdi dir=\"ltr\">ES:SI</bdi> مش memory operand لأن الأقواس ناقصة؛ الشكل الصح هو <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV ES:[SI], CX</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L3, Segment overriding)</bdi>",
     "الجملة صح: من غير أقواس الـ SI بيبقى register، فالـ <bdi dir=\"ltr\">ES:SI</bdi> غلط؛ إنما <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV ES:[SI], CX</bdi> كانت هتبقى صح."
    ],
    [
     "صح. الـ CS ماينفعش يبقى destination للـ MOV (و [CS] مش pointer سليم).",
     "الجملة صح: تغيير الـ CS مش مسموح، فالـ CS عمره ما يبقى destination للـ MOV (وكمان [CS] مش pointer صالح)."
    ],
    [
     "الـ CS هنا مستخدم كـ segment override بس؛ الـ CS نفسه مش بيتغير.",
     "صح (بمنطق المحاضرة). الـ override بالـ CS مسموح (<bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AL, CS:[BX]</bdi>). بالظبط كده الـ assembler كان هيحتاج <bdi dir=\"ltr\" style=\"white-space:nowrap\">BYTE PTR</bdi> أو <bdi dir=\"ltr\" style=\"white-space:nowrap\">WORD PTR</bdi> عشان يعرف الحجم."
    ]
   ],
   "extra": [
    [
     "صح. الحساب:<span class=\"ltr\">DS×10H + offset = 25000 + 0120 = 25120</span>المصدر: <bdi dir=\"ltr\">(L3, Segment:offset and the physical address)</bdi>",
     "الـ 2620 جاية من:<span class=\"ltr\">2620 = 2500 + 0120</span>يعني الـ DS اتجمع من غير ما يتضرب في 10H الأول. الـ base هو 25000، فالناتج 25120.",
     "الـ 26200 جاية من:<span class=\"ltr\">26200 = (2500 + 0120)×10</span>يعني الـ offset اتزاح هو كمان. الـ segment بس هو اللي بيتزاح:<span class=\"ltr\">25000 + 0120 = 25120</span>",
     "الـ 25012 جمعت الـ offset متزاح خانة لليمين (كأنه 12 بدل 120)؛ والصح:<span class=\"ltr\">25000 + 0120 = 25120</span>"
    ],
    [
     "الـ 3A0FF0 لزقت الـ segment والـ offset جنب بعض وخلاص. الـ address هو:<span class=\"ltr\">ES×10H + offset = 3A000 + 0FF0 = 3AFF0</span>",
     "صح. الحساب:<span class=\"ltr\">ES×10H + offset = 3A000 + 0FF0 = 3AFF0</span>المصدر: <bdi dir=\"ltr\">(L3, Segment:offset and the physical address)</bdi>",
     "الـ 49F0 جاية من:<span class=\"ltr\">49F0 = 3A00 + 0FF0</span>يعني الـ ES ماتضربش في 10H. بالـ shift بيبقى:<span class=\"ltr\">3A000 + 0FF0 = 3AFF0</span>",
     "الـ 3B0F0 ده <bdi dir=\"ltr\">3A000 + 10F0</bdi>، غلطة في الجمع؛ المجموع الصح:<span class=\"ltr\">3A000 + 0FF0 = 3AFF0</span>"
    ],
    [
     "الـ MOV DS, CS نقل من segment لـ segment، مش مسموح في instruction واحدة؛ انسخ عن طريق الـ AX بدالها.",
     "الـ MOV CS, AX غلط لأن تغيير قيمة الـ CS مش مسموح.",
     "صح. الـ segment register ينفع يتحمّل من general register من نفس الحجم (<bdi dir=\"ltr\">16-bit</bdi>)، فالـ MOV DS, AX سليمة (L3, Register addressing).",
     "الـ MOV AL, BX بتخلط register <bdi dir=\"ltr\">8-bit</bdi> مع register <bdi dir=\"ltr\">16-bit</bdi>؛ والاتنين operands لازم يبقوا نفس الحجم."
    ],
    [
     "الـ MOV DS, CS بتنقل segment register لـ segment register تاني في instruction واحدة، وده مش مسموح.",
     "الـ XCHG برضه ماينفعش تاخد segment registers، وكمان كانت هتغيّر الـ CS، وده مش مسموح.",
     "الـ MOV CS, DS بتغيّر الـ CS (ممنوع)، وهي نقل من segment لـ segment، وكمان الاتجاه معكوس.",
     "صح. النقل من segment لـ segment مش مسموح، فلازم تعدّي على general register:<pre>MOV AX, CS\nMOV DS, AX</pre>المصدر: <bdi dir=\"ltr\">(L3, Register addressing and its restrictions)</bdi>"
    ],
    [
     "صح. الـ Direct addressing للـ <bdi dir=\"ltr\">AL/AX/EAX</bdi>؛ أي register تاني يبقى displacement.",
     "الـ Immediate معناه إن الرقم الثابت هو نفسه الـ data؛ لكن [123H] بين أقواس ده address في الـ memory، فالـ data جاية من الـ memory.",
     "الـ Register addressing كل الـ operands بتوعه registers بس؛ لكن [123H] ده memory operand.",
     "الـ Base plus index محتاج <bdi dir=\"ltr\">BX/BP</bdi> زائد <bdi dir=\"ltr\">SI/DI</bdi> بين أقواس (زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">[BX+SI]</bdi>)؛ لكن <bdi dir=\"ltr\" style=\"white-space:nowrap\">[123H]</bdi> ده offset ثابت وبس."
    ],
    [
     "الـ MOV AX, BX سليمة: الاتنين registers <bdi dir=\"ltr\">16-bit</bdi>.",
     "صح. الـ SI حجمه 16 bit والـ BL حجمه 8 bit؛ والاتنين operands لازم يبقوا نفس الحجم، فالنقل ده غلط (L3, Register addressing and its restrictions).",
     "الـ MOV EAX, EBX سليمة: الاتنين registers <bdi dir=\"ltr\">32-bit</bdi>.",
     "الـ MOV CH, 100 دي immediate addressing سليمة: الـ 100 بتساع في الـ register الـ <bdi dir=\"ltr\">8-bit</bdi> اللي هو CH."
    ],
    [
     "دي القيم <b>قبل</b> الـ XCHG؛ الـ XCHG بتبدّل الـ registers الاتنين، فالـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">AX = 3</bdi> والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">BX = 5</bdi>.",
     "إن الاتنين يبقوا 3 ده اللي كانت هتعمله MOV AX, BX؛ لكن الـ XCHG بتبدّل القيم، فالـ BX بياخد قيمة الـ AX القديمة اللي هي 5.",
     "صح. الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">AX = 5</bdi> والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">BX = 3</bdi>، وبعدين <bdi dir=\"ltr\" style=\"white-space:nowrap\">XCHG AX, BX</bdi> بتبدّلهم، فالـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">AX = 3</bdi> والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">BX = 5</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(Lab 3)</bdi>",
     "الـ XCHG مابتعملش أي حساب؛ هي بتبدّل المحتوى بس، فالـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">AX = 3</bdi> والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">BX = 5</bdi>."
    ],
    [
     "الـ 10 جاية من إنك جمعت الـ 2 (<bdi dir=\"ltr\" style=\"white-space:nowrap\">5 + 3 + 2</bdi>)؛ لكن الـ SUB بتطرحها:<span class=\"ltr\">5 + 3 − 2 = 6</span>",
     "الـ 8 دي قيمة الـ AX بعد الـ ADD بس؛ بعدها SUB AX, 2 بتخليها 6 قبل ما تتنسخ في الـ CX.",
     "الـ 5 دي القيمة الابتدائية للـ AX وبس؛ الـ CX بياخد قيمة الـ AX النهائية بعد الـ ADD والـ SUB، اللي هي 6.",
     "صح. الخطوات:<span class=\"ltr\">AX = 5, ADD → 8, SUB → 6</span>وبعدين <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV CX, AX</bdi> بتنسخها، فالـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">CX = 6</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(Lab 3)</bdi>"
    ],
    [
     "صح. الحساب:<span class=\"ltr\">DS×10H + offset = 0FFF0 + 0010 = 10000</span>(الـ carry في الجمع الـ hex بيمشي لحد الآخر). المصدر: <bdi dir=\"ltr\">(L3, Segment:offset and the physical address)</bdi>",
     "الـ 0FFF10 لزقت أرقام الـ offset جنب الـ segment؛ لكن الـ offset لازم <b>يتجمع</b> على الـ <bdi dir=\"ltr\">DS×10H</bdi>، يعني:<span class=\"ltr\">0FFF0 + 0010 = 10000</span>",
     "الـ 1000F دي غلطة في الـ carry في الجمع الـ hex؛ والصح بالظبط:<span class=\"ltr\">0FFF0 + 0010 = 10000</span>",
     "الـ 0FFFA اعتبرت الـ offset 0010H كأنه 10 decimal، يعني <bdi dir=\"ltr\" style=\"white-space:nowrap\">0AH</bdi>؛ لكن بالـ hex:<span class=\"ltr\">0FFF0 + 10H = 10000</span>"
    ],
    [
     "الـ ESP واحد من الـ eight general purpose registers، فنسخه في الـ EAX (نفس الحجم <bdi dir=\"ltr\">32-bit</bdi>) سليم.",
     "صح. الـ MOV بتنسخ الـ ESP في الـ EAX؛ والـ source بيفضل بقيمته، لأن الـ MOV عمرها ما بتمسح الـ source (L3, Register addressing).",
     "الاتنين operands <bdi dir=\"ltr\">32-bit</bdi>، فالـ 32 bit بتوع الـ ESP كلهم بيروحوا للـ EAX، مش بس الـ SP في الـ AX.",
     "الـ MOV عمرها ما بتغيّر الـ source؛ الـ ESP بيفضل بقيمته والـ EAX بياخد نسخة."
    ]
   ]
  },
  "4": {
   "notes": [
    {
     "h": "الـ Register indirect addressing",
     "pts": [
      "الداتا بنوصلها في أي memory location عن طريق <b>offset متخزن في واحد من BP, BX, DI, SI</b> (الأربعة دول بس اللي ينفع يبقوا pointers في الـ <bdi dir=\"ltr\">16-bit</bdi> mode؛ <code>[AX]</code> و <code>[CX]</code> و <code>[DX]</code> غلط).",
      "<b>الـ default segment لـ BX و DI و SI هو DS</b>، زي:<pre>MOV AL, [BX]\nMOV BL, [DI]\nMOV EAX, [SI]</pre>",
      "<b>الـ default segment لـ BP هو SS</b>: الأمر <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AL, [BP]</bdi> بيستخدم SS.",
      "النقل من memory لـ memory مش مسموح إلا في الـ string instructions، فده غلط:<pre>MOV [DI], [SI]</pre>",
      "الـ Segment overriding بيخليك توصل لـ segments تانية، زي:<pre>MOV AL, CS:[BX]\nMOV AX, DS:[BP]</pre>"
     ],
     "figH": {
      "mp-ri-pointers": "الـ pointers الأربعة: الـ BX والـ DI والـ SI بيشاوروا جوه الـ DS، والـ BP جوه الـ SS"
     }
    },
    {
     "h": "قاعدة الـ default segment (احفظها)",
     "figH": {
      "mp-seg-rule": "أنهي segment؟ اكتب instruction وشوف القاعدة اللي بتحدده"
     }
    },
    {
     "h": "الـ Indexed addressing (register + displacement)",
     "pts": [
      "الـ offset هنا = <b>مجموع displacement ثابت + الـ register المحدد</b>. بيستخدم BX و SI و DI (الـ default هو DS) و BP (الـ default هو SS).",
      "أمثلة، والـ segment جنب كل واحدة:<pre>MOV AL, 20[BX]        ; DS\nMOV AX, 1000[BP]      ; SS\nMOV AX, AB[SI]\nMOV EAX, ES:100[DI]   ; ES</pre>والأخيرة فيها override لـ ES.",
      "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">20[BX]</bdi> هي هي <bdi dir=\"ltr\" style=\"white-space:nowrap\">[BX+20]</bdi>؛ والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">[BP-2]</bdi> والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">[BP+200H]</bdi> سليمين."
     ],
     "figH": {
      "mp-indexed-forms": "الـ Indexed addressing: الـ displacement زائد الـ register، وبيتكتب بطريقتين"
     }
    },
    {
     "h": "الـ Base plus index والـ base plus index plus displacement",
     "pts": [
      "الـ <b>Base plus index</b>: بيستخدم register <b>base</b> واحد (BP أو BX) زائد register <b>index</b> واحد (DI أو SI). الـ base غالبًا شايل بداية الـ array، والـ index شايل مكان العنصر بالنسبة للبداية.",
      "الـ Offset بيتحسب كده:<span class=\"ltr\">Offset = base + index</span>وبعدين تجمع <bdi dir=\"ltr\" style=\"white-space:nowrap\">segment×10</bdi>، زي:<pre>MOV AL, [BX][SI]        ; DS\nMOV EAX, ES:[BX][SI]    ; ES</pre>",
      "الـ <b>Base indexed plus displacement</b>، الشكل:<pre>MOV AL, disp[BX][SI]</pre>زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">100[BX][DI]</bdi> (DS).",
      "خلي بالك: اتنين base (<bdi dir=\"ltr\" style=\"white-space:nowrap\">[BX][BP]</bdi>) أو اتنين index (<bdi dir=\"ltr\" style=\"white-space:nowrap\">[SI][DI]</bdi>) ماينفعش يتجمعوا على الـ 8086 الحقيقي. بس لما الامتحان يسأل عن الـ segment بتاع <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV [BX][BP], AX</bdi>، الإجابة المقصودة SS (عشان فيه BP)."
     ],
     "figH": {
      "mp-array-walk": "الـ Base plus index بيمشي على الـ array: الـ BX ثابت على البداية والـ DI بيتحرك"
     }
    },
    {
     "h": "أمثلة المحاضرة",
     "figH": {
      "mp-lec4-figure": "رسومات الـ memory state بتاعة الـ slides لأمثلة المحاضرة الأربعة، خطوة خطوة"
     }
    },
    {
     "h": "حل الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Sheet 1</bdi> لما <bdi dir=\"ltr\">(DS=1100H, BX=0200H, SI=0500H)</bdi>"
    },
    {
     "h": "سؤال Q14 من الـ Revision sheet <bdi dir=\"ltr\">(SS=2000H, DS=2200H, SI=1200H, BP=0101H)</bdi>",
     "figH": {
      "mp-ea-calc": "حاسبة الـ address: اختار الـ segment، وزقه خانة، واجمع أجزاء الـ offset بالـ hex"
     }
    },
    {
     "h": "إزاي ترسم رسمة الـ \"memory state\"",
     "pts": [
      "على الشمال: مربعات الـ registers وقيمها، وهي:<span class=\"ltr\">EAX, EBX, ECX, EDI/ESI, DS</span>قيمة الـ segment بتعدّي على \"<bdi dir=\"ltr\" style=\"white-space:nowrap\">×10</bdi>\" وتدخل دايرة فيها <b>+</b>؛ والـ offset register (والـ displacement) بيدخلوا الـ adder هما كمان.",
      "سهم خارج من الـ adder بيشاور على العنوان اللي اتحسب في عمود memory على اليمين (اكتب العنوان، زي 1CE51).",
      "وسهم من خانة (أو خانات) الـ memory راجع للـ destination register (الـ AL لـ byte واحد، والـ AX لـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes</bdi>، والـ EAX لـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">4 bytes</bdi>). لو word، الـ byte اللي في العنوان الأصغر بيروح للنص الواطي (little-endian)."
     ],
     "figH": {
      "mp-mem-draw": "ارسم الـ memory state لأي سؤال في الـ sheet، والـ bytes بترتيب الـ little-endian"
     }
    }
   ],
   "cards": [
    "الـ BP والـ BX والـ DI والـ SI.",
    "الـ DS.",
    "الـ SS.",
    "الـ Segment override:<span class=\"ltr\">CS×10 + BX</span>",
    "القانون:<span class=\"ltr\">Displacement + register</span>والـ segment:<span class=\"ltr\">BX, SI, DI → DS; BP → SS</span>",
    "الـ BX والـ BP.",
    "الـ SI والـ DI.",
    "القانون:<span class=\"ltr\">Base + index, then + segment×10</span>",
    "العنوان: <bdi dir=\"ltr\" style=\"white-space:nowrap\">1CE51</bdi>.",
    "العنوان: <bdi dir=\"ltr\" style=\"white-space:nowrap\">1CF51</bdi>.",
    "10250.",
    "القانون:<span class=\"ltr\">(DS×10) + DI + 100</span>",
    "الـ SS.",
    "الـ DS.",
    "سليمة: BP + displacement سالب، والـ segment هو SS."
   ],
   "qa": [
    "الـ offset بتاع الـ memory operand بيبقى متخزن في BP أو BX أو DI أو SI. الـ BX و DI و SI الـ default بتاعهم DS (<bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AL, [BX]</bdi>)؛ والـ BP الـ default بتاعه SS (<bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AL, [BP]</bdi>). النقل من memory لـ memory مش مسموح إلا في الـ string instructions (<bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV [DI], [SI]</bdi> غلط). والـ Segment overriding بيخليك توصل لـ segments تانية:<pre>MOV AL, CS:[BX]\nMOV AX, DS:[BP]</pre>",
    "الـ Memory location:<span class=\"ltr\">DS×10 + disp + base + index<br>= 10000 + 100 + CD01 + 150<br>= 10000 + 100 + CE51 = <b>1CF51</b></span>الرسمة: القيم دي داخلين على الـ adder:<span class=\"ltr\">EBX = CD01, EDI = 150, DS = 1000 (×10), Disp. 100</span>والسهم بيشاور على <bdi dir=\"ltr\" style=\"white-space:nowrap\">1CF51</bdi>؛ والـ byte اللي هناك بيروح AL.",
    "الـ Memory location:<span class=\"ltr\">DS×10 + base + index<br>= 10000 + CD01 + 150<br>= 10000 + CE51 = <b>1CE51</b></span>والـ byte اللي عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">1CE51</bdi> بيتنسخ في AL.",
    "الجزء (a)، العنوان:<span class=\"ltr\">11000 + 120 + 500 = <b>11620</b></span>(الـ EDX بيتخزن في <bdi dir=\"ltr\" style=\"white-space:nowrap\">4 bytes</bdi> من <bdi dir=\"ltr\" style=\"white-space:nowrap\">11620</bdi> لـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">11623</bdi>).<br>الجزء (b)، العنوان:<span class=\"ltr\">11000 + 100 + 200 + 500 = <b>11800</b></span>الجزء (c)، العنوان:<span class=\"ltr\">11000 + 200 + 500 = <b>11700</b></span>",
    "كلهم فيهم BP، فالـ segment هو SS (14000).<br>الجزء (a)، العنوان:<span class=\"ltr\">14000 + 1500 + 200 = <b>15700</b></span>الجزء (b)، العنوان:<span class=\"ltr\">14000 + 1500 + 100 - 200 = <b>15400</b></span>الجزء (c)، العنوان:<span class=\"ltr\">14000 + 1500 + 100 = <b>15600</b></span>",
    "بيستخدم register base واحد (BX أو BP) و register index واحد (SI أو DI). الـ base غالبًا شايل عنوان بداية الـ array والـ index شايل مكان العنصر بالنسبة للبداية، فلما تزوّد الـ index بتمشي على عناصر الـ array. الـ Offset بيتحسب كده:<span class=\"ltr\">Offset = base + index</span>والـ default segment هو DS (و SS لو فيه BP)."
   ],
   "quiz": [
    [
     "صح. الـ BP هو الـ pointer الوحيد اللي الـ default segment بتاعه SS، فالـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">50[BP]</bdi> بتقرا من:<span class=\"ltr\">SS×10 + 50 + BP</span>ومفيش override مكتوب. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Register indirect addressing)</bdi>",
     "الـ CS بيتستخدم مع الـ IP عشان نجيب الـ instructions، عمره ما بيبقى الـ default لـ data pointer. الـ BP الـ default segment بتاعه SS.",
     "وجود BP بيغيّر الـ default لـ SS؛ والـ 50 ده displacement.",
     "الـ ES مش بيتستخدم غير لو مكتوب كـ override (زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">ES:50[BP]</bdi>) أو في الـ string destinations؛ ومن غير override الـ BP بيروح للـ SS."
    ],
    [
     "عشان يبقى ES لازم override صريح زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">ES:30[BP]</bdi>؛ ومفيش حاجة زي كده مكتوبة، فبنستخدم الـ default بتاع الـ BP اللي هو SS.",
     "صح. الـ memory operand فيه BP، والـ BP الـ default segment بتاعه SS، فالعنوان:<span class=\"ltr\">SS×10 + 30 + BP</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Default segment rule)</bdi>",
     "الـ DS هو الـ default للـ BX والـ SI والـ DI والأرقام الثابتة بس؛ أي operand فيه BP زي 30[BP] بيروح للـ SS.",
     "الـ instruction سليمة: بتنقل الـ register BX للـ memory (register to memory)، والـ BP مع displacement ده indexed addressing مسموح."
    ],
    [
     "الـ segment register ده register، مش expression، فالـ «<bdi dir=\"ltr\" style=\"white-space:nowrap\">SS-10</bdi>» ملهاش معنى. الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">-10</bdi> جزء من الـ offset، والـ SI الـ default بتاعه DS.",
     "الـ «<bdi dir=\"ltr\" style=\"white-space:nowrap\">DS*50</bdi>» بتلخبط القانون: الـ DS هو اللي بيتضرب في 10H، والـ 50 ده displacement بيتجمع على الـ offset، مش على الـ segment.",
     "الـ DS مش «شايل» 50: الـ 50 والـ -10 displacements بيتجمعوا على الـ SI عشان يكوّنوا الـ offset. الـ segment هو DS وخلاص.",
     "صح. الـ pointer register هنا SI، والـ default segment بتاعه DS؛ والـ 50 والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">-10</bdi> بيغيروا الـ offset بس:<span class=\"ltr\">DS×10 + 50 + SI - 10</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Indexed addressing)</bdi>"
    ],
    [
     "الـ ES محتاج override صريح (<bdi dir=\"ltr\" style=\"white-space:nowrap\">ES:[SI][BP]</bdi>)؛ ومن غيره، وجود الـ BP بيخلي الـ default segment هو SS.",
     "الـ SI لوحده كان هيستخدم DS، بس أول ما الـ BP يبقى جزء من العنوان الـ default segment بيبقى SS (Sheet 1: الـ [SI][BP] بيستخدم SS).",
     "صح. الـ BP هو الـ base register والـ default بتاعه SS، فالعنوان:<span class=\"ltr\">SS×10 + BP + SI</span>زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AL, [SI][BP]</bdi> في الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Sheet 1</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Base plus index)</bdi>",
     "الـ CS ده الـ code segment اللي بيتستخدم مع الـ IP عشان نجيب الـ instructions؛ الـ data operands الـ default بتاعها DS، أو SS لو فيه BP."
    ],
    [
     "مفيش override ES: مكتوب، يبقى الـ ES مش مستخدم؛ والإجابة المقصودة ماشية على قاعدة الـ BP فبتطلع SS.",
     "الـ BX لوحده كان هيستخدم DS، بس قاعدة الامتحان إن وجود الـ BP في العنوان بيخلي الـ segment هو SS.",
     "صح (الإجابة المقصودة). الـ BP بيروح لـ SS:<span class=\"ltr\">BP → SS</span>خلي بالك: على الـ 8086 الحقيقي ماينفعش تجمع اتنين base registers زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">BX+BP</bdi>.",
     "الـ CS شايل الـ code وبيتستخدم مع الـ IP في الـ instruction fetch؛ عمره ما بيبقى الـ default segment لـ data operand."
    ],
    [
     "مفيش override ES: مكتوب، يبقى الـ ES مش مستخدم؛ والإجابة المقصودة SS عشان الـ BP موجود في العنوان.",
     "الـ BX لوحده كان هيدي DS، بس الـ BP كمان موجود في العنوان، وقاعدة الكورس إن أي وقت فيه BP الـ segment بيبقى SS.",
     "صح (الإجابة المقصودة، ونفس الملحوظة اللي فوق).",
     "الـ CS ده الـ code segment بتاع الـ instruction fetch؛ الـ data operands بتستخدم DS by default، أو SS لو فيه BP."
    ],
    [
     "الـ segment لازم يتزاح خانة hex واحدة (DS×10) قبل ما تجمع الـ offset؛ لو جمعت الـ DS على طول هيطلعلك physical address غلط.",
     "صح. الـ memory location بتتحسب كده:<span class=\"ltr\">segment×10 + displacement + offset</span>والـ DI الـ default بتاعه DS، يبقى:<span class=\"ltr\">(DS×10) + 100 + DI</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Indexed addressing)</bdi>",
     "الـ ES مش بيتستخدم غير مع override زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">ES:100[DI]</bdi>؛ الـ default segment بتاع الـ DI في الـ MOV هو DS.",
     "الـ segment بيتضرب في 10H (يتزاح خانة hex)، مش بيتزود عليه 10؛ فالـ (DS+10) قانون غلط."
    ],
    [
     "صح. الـ BX والـ DI الـ default بتاعهم DS، فالعنوان:<span class=\"ltr\">DS×10 + 100 + BX + DI<br>= 10000 + 100 + CD01 + 150 = 1CF51</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Lecture examples)</bdi>",
     "الـ CF51 ده الـ offset بس (<bdi dir=\"ltr\" style=\"white-space:nowrap\">100 + CD01 + 150</bdi>)؛ لازم تجمع عليه الـ segment base اللي هو <bdi dir=\"ltr\" style=\"white-space:nowrap\">DS×10 = 10000</bdi> فيطلع 1CF51.",
     "الـ FC51 بدّل الـ C والـ F بتوع الـ offset CF51 وكمان نسي الـ segment base 10000؛ المجموع الصح 1CF51.",
     "الـ 1FC50 أرقام الـ offset فيه متلخبطة (FC50 بدل CF51)؛ والصح:<span class=\"ltr\">10000 + 100 + CD01 + 150 = 1CF51</span>"
    ],
    [
     "صح. Indexed addressing بـ displacement سالب، والـ segment هو SS.",
     "الجملة صح: الـ [<bdi dir=\"ltr\">BP-2</bdi>] ده indexed addressing بـ displacement سالب، وده مسموح؛ والمحاضرة حاطة الـ [<bdi dir=\"ltr\">BP-2</bdi>] ضمن الـ valid."
    ],
    [
     "الـ MOV AX, [<bdi dir=\"ltr\">BP-50</bdi>] ده indexed addressing سليم (BP ناقص displacement، والـ segment هو SS)، فإنك تقول عليها incorrect ده غلط.",
     "صح. الـ displacement السالب مع الـ BP ده indexed addressing مسموح، والعنوان:<span class=\"ltr\">SS×10 + BP - 50</span>فجملة إنها «incorrect» غلط <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Indexed addressing)</bdi>."
    ],
    [
     "الـ [<bdi dir=\"ltr\">BP-2</bdi>] مسموحة: الـ BP pointer سليم والـ displacement السالب مسموح، فجملة إنها «illegal» غلط.",
     "صح. المحاضرة حاطة الـ [<bdi dir=\"ltr\">BP-2</bdi>] كـ indexed addressing سليم: الـ BP زائد displacement (سالب)، والـ segment هو SS (L4, Indexed addressing)."
    ],
    [
     "الـ override للـ SS الـ default بتاع BP بـ DS مسموح (الأمر <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AX, DS:[BP]</bdi> مثال من المحاضرة).",
     "صح. الـ segment override مسموح: الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">DS:</bdi> بيحل محل الـ SS اللي هو default الـ BP، فالعنوان:<span class=\"ltr\">DS×10 + BP - 2</span>زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AX, DS:[BP]</bdi> في المحاضرة <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Register indirect addressing)</bdi>."
    ],
    [
     "الـ displacement اللي هو 10 ناقص من المعادلة.",
     "صح. الـ displacement 10 ناقص: عنوان الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">10[SI+BC]</bdi> هو:<span class=\"ltr\">DS×10 + 10 + SI + BC</span>(الـ SI الـ default بتاعه DS). المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Revision sheet Q14)</bdi>"
    ]
   ],
   "extra": [
    [
     "صح. الـ BX والـ SI الـ default بتاعهم DS، فالعنوان:<span class=\"ltr\">DS×10 + BX + SI = 20000 + 300 + 50 = 20350</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Base plus index)</bdi>",
     "الـ 2350 جمع الـ DS من غير ما يزيحه؛ الـ segment لازم يتضرب في 10H الأول، فيبقى:<span class=\"ltr\">20000 + 300 + 50 = 20350</span>",
     "الـ 20305 جمع الـ SI على إنه 5 بدل 50 (خانة غلط)؛ الـ offsets بتتجمع كأرقام hex كاملة:<span class=\"ltr\">20000 + 300 + 50 = 20350</span>",
     "الـ 23050 اعتبر الـ BX قيمته 3000 بدل 0300؛ الـ segment بس هو اللي بيتزاح، فالناتج:<span class=\"ltr\">20000 + 300 + 50 = 20350</span>"
    ],
    [
     "الـ 10210 استخدم DS، بس الـ BP الـ default segment بتاعه SS، فالـ base:<span class=\"ltr\">SS×10 = 30000</span>والناتج 30210.",
     "صح. الـ BP الـ default بتاعه SS، فالعنوان:<span class=\"ltr\">SS×10 + 10 + BP = 30000 + 10 + 200 = 30210</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Indexed addressing)</bdi>",
     "الـ 3210 نسي يزيح الـ SS خانة hex؛ الـ base:<span class=\"ltr\">SS×10 = 30000</span>فالعنوان 30210.",
     "الـ 30201 جمع الـ displacement 10 على إنه 1 (خانة غلط)؛ والصح:<span class=\"ltr\">30000 + 200 + 10 = 30210</span>"
    ],
    [
     "الـ [BX] ده register indirect بالـ BX، والـ default segment بتاعه DS مش SS.",
     "الـ [SI+4] بيستخدم الـ SI مع displacement؛ والـ SI الـ default segment بتاعه DS مش SS.",
     "صح. أي وقت الـ BP يبقى جزء من العنوان الـ default segment بيبقى SS، فالـ [BP+SI] بتقرا من SS×10 + BP + SI (L4, Default segment rule).",
     "الـ [1234H] ده direct addressing بـ offset ثابت؛ والأرقام الثابتة الـ default بتاعها DS مش SS."
    ],
    [
     "صح. العنوان:<span class=\"ltr\">12000 + 20 + 100 = 12120</span>والـ byte الواطي الأول.",
     "الـ Little-endian معناها إن الـ byte الواطي في العنوان الأصغر.",
     "الـ 1320 جمع الـ DS من غير ما يزيحه (<bdi dir=\"ltr\" style=\"white-space:nowrap\">1200 + 20 + 100</bdi>)؛ والصح:<span class=\"ltr\">DS×10 = 12000</span>فالـ AL من 12120 والـ AH من 12121.",
     "الـ 12102 جمع الـ displacement 20 على إنه 2؛ الـ offset الكامل:<span class=\"ltr\">20 + 100 = 120</span>فالـ bytes عند 12120 و 12121."
    ],
    [
     "الـ BX واحد من الـ 4 pointer registers الـ <bdi dir=\"ltr\">16-bit</bdi> (BX, BP, SI, DI)، فالـ [BX] سليمة والـ default segment بتاعها DS.",
     "الـ BP pointer register سليم؛ الـ [BP] مسموحة وبتستخدم SS by default.",
     "الـ DI ده index pointer register سليم؛ الـ [DI] مسموحة وبتستخدم DS by default.",
     "صح. BX و BP و SI و DI بس اللي ينفع يبقوا pointers."
    ],
    [
     "صح. الـ BX والـ DI الـ default بتاعهم DS، فالعنوان:<span class=\"ltr\">10000 + 50 + F00 + 200 = 11150</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Base plus index plus displacement)</bdi>",
     "الـ 10F50 نسي الـ DI (<bdi dir=\"ltr\" style=\"white-space:nowrap\">10000 + F00 + 50</bdi>)؛ لازم تجمع كل أجزاء الـ offset ومنها الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">DI = 200</bdi>، فيطلع 11150.",
     "الـ 11100 نسي الـ displacement 50 (<bdi dir=\"ltr\" style=\"white-space:nowrap\">10000 + F00 + 200</bdi>)؛ لما تجمعه يطلع 11150.",
     "الـ 1F150 مش طالعة من الجمع الصح. أجزاء الـ offset:<span class=\"ltr\">50 + 0F00 + 200 = 1150</span>والـ base:<span class=\"ltr\">DS × 10 = 10000</span>فالعنوان:<span class=\"ltr\">10000 + 1150 = 11150</span>خلي بالك الـ BX قيمته 0F00 مش F000."
    ],
    [
     "الـ SI والـ DI الاتنين index registers؛ الـ base plus index محتاج base واحد (BX أو BP) و index واحد (SI أو DI).",
     "الـ BX والـ BP الاتنين base registers؛ الـ mode ده محتاج base واحد و index واحد، فماينفعش تجمع اتنين base.",
     "صح. الـ base plus index بيستخدم base register واحد (BX أو BP) و index register واحد (SI أو DI)؛ والـ BX + SI ماشيين، زي MOV AL, [BX][SI] (L4, Base plus index).",
     "الـ AX ده general-purpose register ماينفعش يبقى memory pointer؛ الـ bases هما BX و BP بس."
    ],
    [
     "الـ 15600 جاية من:<span class=\"ltr\">14000 + 1500 + 100</span>من غير الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">-200</bdi>؛ ده جواب الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">[SI][BP]</bdi> في الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Sheet 1</bdi>، مش الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">[BP+SI-200H]</bdi>.",
     "الـ 13400 مش طالع من القاعدة: وجود الـ BP معناه SS، فيبقى:<span class=\"ltr\">14000 + 1500 + 100 - 200 = 15400</span>",
     "الـ 15800 جمع الـ 200 بدل ما يطرحها؛ مع الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">-200H</bdi> العنوان:<span class=\"ltr\">14000 + 1500 + 100 - 200 = 15400</span>",
     "صح. الحساب:<span class=\"ltr\">14000 + 1500 + 100 - 200 = 15400</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(Sheet 1)</bdi>"
    ],
    [
     "الـ segment overriding مسموح: الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">DS:</bdi> بيحل محل الـ SS اللي هو default الـ BP. والمحاضرة نفسها جايبة <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AX, DS:[BP]</bdi> كمثال سليم.",
     "صح. الـ DS: بيعمل override على الـ SS اللي هو default الـ BP، فالـ AX بيتحمل من الـ word اللي عند DS×10 + BP (L4, Register indirect addressing).",
     "الأقواس معناها memory: الـ AX بياخد الـ word المتخزنة عند DS×10 + BP، مش المجموع DS + BP نفسه.",
     "العنوان بيتعمل من segment واحد بس؛ الـ override بيبدّل SS بـ DS، فيبقى DS×10 + BP. الـ SS مش مستخدم خالص."
    ],
    [
     "الـ 40FFF نسي الـ displacement <bdi dir=\"ltr\" style=\"white-space:nowrap\">+1</bdi>؛ في الـ hex:<span class=\"ltr\">FFF + 1 = 1000</span>فالعنوان:<span class=\"ltr\">40000 + 1000 = 41000</span>",
     "صح. الـ SI الـ default بتاعه DS، فالعنوان:<span class=\"ltr\">40000 + FFF + 1 = 41000</span>عشان <bdi dir=\"ltr\" style=\"white-space:nowrap\">FFF + 1</bdi> بيعمل carry ويبقى 1000 في الـ hex. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L4, Indexed addressing)</bdi>",
     "الـ 40FFF1 لزق الـ 1 جنب الأرقام بدل ما يجمعه؛ الـ physical address رقم hex من 5 خانات بييجي من الجمع:<span class=\"ltr\">40000 + FFF + 1 = 41000</span>",
     "الـ 4100 نسي يزيح الـ DS خانة hex؛ الـ base:<span class=\"ltr\">DS×10 = 40000</span>فيطلع 41000."
    ]
   ]
  },
  "5": {
   "notes": [
    {
     "h": "الـ stack",
     "pts": [
      "الـ PUSH والـ POP بيخزنوا ويرجّعوا داتا من الـ stack memory اللي شغالة بنظام <b>LIFO</b> (Last-In, First-Out): آخر حاجة تدخل هي أول حاجة تطلع. يعني الـ register اللي اتعمله push الأخير لازم يتعمله pop الأول.",
      "العنوان الـ default للـ stack instructions هو <b><bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi></b>. الـ SS شايل الـ stack segment؛ والـ <b>SP شايل الـ offset بتاع قمة الـ stack (top)</b> (آخر قيمة اتعملها push).",
      "الوصول للـ stack بيبقى بـ <b>SS و SP مع بعض</b>. والـ stack بيكبر <b>لتحت</b>: من العناوين العالية للعناوين الأقل.",
      "الـ Stack instructions بتنقل <b>2 أو 4 bytes</b> حسب حجم الـ register: <code>PUSH AX</code> (2 bytes)، <code>PUSH EAX</code> (4 bytes)، <code>POP BX</code> (2 bytes من الـ stack لـ BX).",
      "في البرنامج (الـ lab): السطر ده بيعرّف stack حجمه 100h:<pre>.stack 100h</pre>والـ stack كمان بيخزن الـ return addresses بتاعة الـ subroutines، فعدد الـ PUSH والـ POP جوه الـ subroutine لازم يبقى متساوي."
     ],
     "figH": {
      "mp-l5-stack-sim": "محاكي الـ stack: الـ PUSH والـ POP بيحرّكوا الـ SP عند <bdi dir=\"ltr\">SS:[SP]</bdi>، وآخر حاجة تدخل أول حاجة تطلع"
     }
    },
    {
     "h": "الـ PUSH",
     "pts": [
      "الـ PUSH <b>الأول بتقلل SP</b> بحجم الـ operand، وبعدين تخزن الـ operand عند [SP]. الـ target ممكن يبقى register أو memory operand أو immediate value.",
      "الـ push الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">16-bit</bdi>: الـ <b>most-significant byte</b> بيروح <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP-1]</bdi>، والـ <b>least-significant byte</b> بيروح <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP-2]</bdi>، وبعدين <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP = SP - 2</bdi>. يعني <bdi dir=\"ltr\" style=\"white-space:nowrap\">PUSH AX</bdi> بتعمل:<pre>SS:[SP-1] = AH\nSS:[SP-2] = AL\nSP = SP - 2</pre>",
      "الـ push الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">32-bit</bdi>: بيتخزن أربع bytes (الـ MSB الأول، من <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP-1</bdi> لحد <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP-4</bdi>)، وبعدين <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP = SP - 4</bdi>. مثال: لو <bdi dir=\"ltr\" style=\"white-space:nowrap\">ESP = 00FFFFE8</bdi>، الأمر <bdi dir=\"ltr\" style=\"white-space:nowrap\">PUSH EAX</bdi> بيخلي <bdi dir=\"ltr\" style=\"white-space:nowrap\">ESP = 00FFFFE4</bdi> ويخزن EAX عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">00FFFFE4</bdi>.",
      "الـ <b>PUSHA</b> بتعمل push للـ registers الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">16-bit</bdi> بالترتيب ده:<span class=\"ltr\"><b>AX, CX, DX, BX, SP, BP, SI, DI</b></span>(يعني <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 words = 16 bytes</bdi>، فالـ SP بيقل 16). والـ <b>PUSHAD</b> بتعمل push لـ:<span class=\"ltr\">EAX, ECX, EDX, EBX, ESP, EBP, ESI, EDI</span>(يعني <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 double words = 32 bytes</bdi>).",
      "الـ <b>PUSHF</b> بتعمل push للـ FLAGS register الـ <bdi dir=\"ltr\">16-bit</bdi>؛ والـ <b>POPF</b> بتعمل pop من الـ stack للـ FLAGS."
     ],
     "figH": {
      "mp-l5-esp-push": "الـ <bdi dir=\"ltr\">PUSH EAX</bdi> من الـ slide: الـ ESP بينزل من <bdi dir=\"ltr\">00FFFFE8</bdi> لـ <bdi dir=\"ltr\">00FFFFE4</bdi> وبعدين الـ EAX بيتخزن",
      "mp-l5-pusha-popa": "الـ PUSHA بتحفظ الـ 8 registers بالترتيب، والـ POPA بترجّعهم بالترتيب العكسي"
     }
    },
    {
     "h": "الـ POP",
     "pts": [
      "الـ POP بتنسخ الداتا اللي عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi> للـ register أو الـ memory operand، <b>وبعدين تزوّد SP</b> بـ 2 أو 4. الـ Target يا register يا memory (مش immediate؛ والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">POP CS</bdi> مش مسموحة).",
      "مثال: لو <bdi dir=\"ltr\" style=\"white-space:nowrap\">ESP = 00FFFFE4</bdi>، الأمر <bdi dir=\"ltr\" style=\"white-space:nowrap\">POP EAX</bdi> بيخلي <bdi dir=\"ltr\" style=\"white-space:nowrap\">ESP = 00FFFFE8</bdi> وبينسخ <bdi dir=\"ltr\" style=\"white-space:nowrap\">4 bytes</bdi> من الـ stack لـ EAX.",
      "الـ <b>POPA</b> بتعمل pop بالترتيب العكسي <b>DI, SI, BP, SP, BX, DX, CX, AX</b>، فبترجّع اللي الـ PUSHA حفظته؛ والـ SP بيزيد 16. والـ <b>POPAD</b> بتعمل pop لـ 8 double words (32 bytes).",
      "الـ PUSH أو الـ POP عمرهم ما بيغيّروا SS؛ الـ SP بس هو اللي بيتغير."
     ],
     "figH": {
      "mp-l5-esp-pop": "الـ <bdi dir=\"ltr\">POP EAX</bdi> من الـ slide: الـ 4 bytes بيروحوا للـ EAX وبعدين الـ ESP بيطلع لـ <bdi dir=\"ltr\">00FFFFE8</bdi>"
     }
    },
    {
     "h": "مثال المحاضرة: PUSH AX",
     "figH": {
      "mp-l5-push-ax-figure": "رسمة الـ slide بتاعة الـ <bdi dir=\"ltr\">PUSH AX</bdi> خطوة بخطوة"
     }
    },
    {
     "h": "مثال الـ Revision: <bdi dir=\"ltr\" style=\"white-space:nowrap\">POP EAX</bdi>",
     "figH": {
      "mp-l5-pop-eax-figure": "رسمة الـ slide بتاعة الـ <bdi dir=\"ltr\">POP EAX</bdi> خطوة بخطوة"
     }
    },
    {
     "h": "سؤال Q5 من الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Sheet 1</bdi>: الأمر <bdi dir=\"ltr\" style=\"white-space:nowrap\">PUSH EAX</bdi> مع <bdi dir=\"ltr\">(EAX=ABCD, SP=0100H, SS=0200H)</bdi>",
     "figH": {
      "mp-l5-stack-calc": "حاسبة الـ PUSH والـ POP: العنوان والـ bytes في الـ memory والـ SP الجديد"
     }
    },
    {
     "h": "أمثلة كود Lab 6",
     "figH": {
      "mp-l5-lab6": "برامج الـ Lab 6 بتتنفذ سطر سطر والـ stack جنبها"
     }
    }
   ],
   "cards": [
    "الـ LIFO: آخر حاجة تدخل أول حاجة تطلع.",
    "العنوان: <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>.",
    "الـ offset بتاع قمة الـ stack (عنوان الـ top of stack).",
    "عنوان الـ stack segment.",
    "بتعمل:<span class=\"ltr\">SS:[SP-1]=AH, SS:[SP-2]=AL, SP=SP-2</span>",
    "الـ SP بيقل 4.",
    "بيزيد 2 (لـ <bdi dir=\"ltr\">16-bit</bdi>) أو 4 (لـ <bdi dir=\"ltr\">32-bit</bdi>).",
    "الترتيب:<span class=\"ltr\">AX, CX, DX, BX, SP, BP, SI, DI</span>",
    "الترتيب:<span class=\"ltr\">DI, SI, BP, SP, BX, DX, CX, AX</span>",
    "التغيير:<span class=\"ltr\">-16 / +16 bytes</span>",
    "الحجم:<span class=\"ltr\">8 double words = 32 bytes</span>",
    "بيعملوا push أو pop للـ FLAGS register الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">16-bit</bdi>.",
    "بيكبر لتحت، من العناوين العالية للواطية.",
    "العنوان <bdi dir=\"ltr\" style=\"white-space:nowrap\">37FE</bdi>، والنتيجة:<span class=\"ltr\">[37FD]=5A, [37FC]=B3; SP=07FC</span>",
    "العنوان <bdi dir=\"ltr\" style=\"white-space:nowrap\">4234</bdi>، والنتيجة:<span class=\"ltr\">EAX=44332211, SP=1238</span>",
    "الـ stack."
   ],
   "qa": [
    "الـ PUSH بتقلل SP بحجم الـ operand (2 أو 4) وتخزن الـ operand عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>؛ في حالة الـ word، الـ most-significant byte بيروح <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP-1</bdi> والـ least-significant بيروح <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP-2</bdi>. الـ POP بتنسخ الداتا اللي عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi> للـ operand وبعدين تزوّد SP بـ 2 أو 4. الـ stack شغال LIFO وبيكبر من العناوين العالية للأقل.",
    "الـ Memory location:<span class=\"ltr\">SS×10 + SP = 3000 + 07FE = <b>37FE</b></span>والنتيجة:<span class=\"ltr\">[37FD] = 5A (AH), [37FC] = B3 (AL), SP = <b>07FC</b></span>الرسمة: <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS (300)×10</bdi> مع SP داخلين على الـ adder اللي بيشاور على <bdi dir=\"ltr\" style=\"white-space:nowrap\">37FE</bdi>؛ وأسهم AH و AL رايحة لـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">37FD</bdi> و <bdi dir=\"ltr\" style=\"white-space:nowrap\">37FC</bdi>؛ والـ SP القديم <bdi dir=\"ltr\" style=\"white-space:nowrap\">07FE</bdi> متشطب عليه ومكتوب <bdi dir=\"ltr\" style=\"white-space:nowrap\">07FC</bdi>.",
    "الـ Memory location:<span class=\"ltr\">SS×10 + SP = 3000 + 1234 = <b>4234</b></span>الـ bytes من <bdi dir=\"ltr\" style=\"white-space:nowrap\">4234</bdi> لـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">4237</bdi> هي:<span class=\"ltr\">11, 22, 33, 44 → EAX = <b>44332211</b> (AL=11, AH=22)</span>والـ SP:<span class=\"ltr\">SP = 1234 + 4 = <b>1238</b></span>",
    "العنوان:<span class=\"ltr\">2000 + 0100 = 2100</span>والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">EAX = 0000ABCD</bdi>، فالـ bytes:<span class=\"ltr\">[20FF]=00, [20FE]=00, [20FD]=AB (AH), [20FC]=CD (AL)</span>والـ SP بيبقى <bdi dir=\"ltr\" style=\"white-space:nowrap\">00FC</bdi>.",
    "الـ PUSHA بتنسخ الـ registers الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">16-bit</bdi> دي على الـ stack (الـ SP بيقل 16):<span class=\"ltr\">AX, CX, DX, BX, SP, BP, SI, DI</span>والـ POPA بتعمل pop بالترتيب العكسي:<span class=\"ltr\">DI, SI, BP, SP, BX, DX, CX, AX</span>عشان كل register يرجعله قيمته هو بالظبط (LIFO). والـ <bdi dir=\"ltr\">PUSHAD/POPAD</bdi> بيعملوا نفس الكلام مع الـ registers الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">32-bit</bdi> (وده <bdi dir=\"ltr\" style=\"white-space:nowrap\">32 bytes</bdi>)."
   ],
   "quiz": [
    [
     "الـ PUSH عمرها ما بتزوّد الـ SP: الـ stack بيكبر لتحت، فالـ SP بيقل، وبيقل 4 (مش 2) عشان الـ EAX register حجمه <bdi dir=\"ltr\">32-bit</bdi>.",
     "الاتجاه صح بس الحجم غلط: الـ EAX حجمه 4 bytes، فالـ SP بيقل 4. النقص بـ 2 ده بتاع الـ PUSH الـ <bdi dir=\"ltr\">16-bit</bdi> زي PUSH AX.",
     "الحجم 4 صح، بس الـ PUSH بتقلل الـ SP (الـ stack بيكبر ناحية الـ addresses الأقل)؛ الزيادة دي شغل الـ POP.",
     "صح. الـ PUSH الأول بتقلل الـ SP بحجم الـ operand، وبعدين تخزّنه؛ والـ EAX حجمه <bdi dir=\"ltr\" style=\"white-space:nowrap\">4 bytes</bdi>، فـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP = SP - 4</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, PUSH)</bdi>"
    ],
    [
     "الـ PUSH بتقلل الـ SP، والـ register الـ <bdi dir=\"ltr\">16-bit</bdi> بينقل 2 bytes، فالزيادة بـ 1 غلط من الناحيتين.",
     "الـ stack instructions بتنقل 2 أو 4 bytes، عمرها ما بتنقل 1؛ والـ AX ده word (يعني 2 bytes)، فالـ SP بيقل 2.",
     "الحجم صح بس الاتجاه لأ: الـ PUSH بتقلل الـ SP؛ أما SP + 2 فده اللي بتعمله POP AX.",
     "صح. الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">PUSH AX</bdi> بتحط الـ AH في <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP-1]</bdi> والـ AL في <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP-2]</bdi>، وبعدين <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP = SP - 2</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, PUSH)</bdi>"
    ],
    [
     "الـ PUSH والـ POP عمرهم ما بيغيّروا الـ SS؛ اللي بيتغير الـ SP بس. الـ SS بيفضل 1300 والـ SP بيروح من 100 لـ 104.",
     "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP = 98</bdi> ده نقص، وده شغل الـ PUSH. الـ POP بتزوّد الـ SP، والـ ECX حجمه <bdi dir=\"ltr\" style=\"white-space:nowrap\">4 bytes</bdi>، يعني:<span class=\"ltr\">100 + 4 = 104</span>",
     "الـ SS مابيتغيرش بالـ POP (ولا بالـ PUSH)؛ اللي بيتحرك الـ stack pointer بس:<span class=\"ltr\">SP = 100 + 4 = 104</span>",
     "صح. الـ POP بتنسخ <bdi dir=\"ltr\" style=\"white-space:nowrap\">4 bytes</bdi> من <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi> للـ ECX، وبعدين تزوّد الـ SP بـ 4:<span class=\"ltr\">100 + 4 = 104</span>والـ SS مابيتغيرش <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, POP)</bdi>."
    ],
    [
     "الـ PUSH عمرها ما بتغيّر الـ SS؛ هي بس بتقلل الـ SP، وهنا بـ 2 عشان الـ CX حجمه 16 bits.",
     "صح (الإجابة المقصودة). الـ SP بيقل 2. خلي بالك: في الـ hex بيبقى <bdi dir=\"ltr\" style=\"white-space:nowrap\">100H - 2 = 0FEH</bdi>؛ الامتحان اتعامل مع 100 على إنها decimal.",
     "الـ SS ده الـ base بتاع الـ stack segment والـ PUSH مابتغيرهوش؛ اللي بيقل الـ SP بس، بـ 2 عشان الـ CX.",
     "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP = 102</bdi> ده زيادة، وده اللي بتعمله الـ POP؛ لكن الـ PUSH بتقلل الـ SP بـ 2 عشان الـ CX الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">16-bit</bdi>."
    ],
    [
     "الـ POP عمرها ما بتغيّر الـ SS؛ هي بتزوّد الـ SP بـ 2 عشان الـ AX حجمه <bdi dir=\"ltr\" style=\"white-space:nowrap\">16 bits</bdi>، فالـ SP بيبقى 162.",
     "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP = 158</bdi> ده نقص، وده شغل الـ PUSH. الـ POP بتزوّد الـ SP، يعني:<span class=\"ltr\">160 + 2 = 162</span>",
     "الـ SS مابيتغيرش بالـ stack operations؛ اللي بيتغير الـ SP بس، من 160 لـ 162.",
     "صح. الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">POP AX</bdi> بتنسخ <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes</bdi> من <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi> للـ AX، وبعدين:<span class=\"ltr\">SP = SP + 2 = 160 + 2 = 162</span>والـ SS بيفضل 1400 <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, POP)</bdi>."
    ],
    [
     "الـ PUSHA بتعمل push، فالـ SP بيقل مش بيزيد؛ وكمان 32 words (يعني 64 bytes) أكتر بكتير من الـ 8 registers اللي بتحفظهم.",
     "الـ 16 bytes هو فعلًا حجم الـ PUSHA (8 words)، بس الـ PUSH instructions بتقلل الـ SP؛ الزيادة بـ 16 دي شغل الـ POPA.",
     "النقص صح، بس <bdi dir=\"ltr\" style=\"white-space:nowrap\">32 words = 64 bytes</bdi>؛ والـ PUSHA بتحفظ 8 registers (<bdi dir=\"ltr\" style=\"white-space:nowrap\">16 bytes</bdi>) والـ PUSHAD بتحفظ 8 double words (<bdi dir=\"ltr\" style=\"white-space:nowrap\">32 bytes</bdi>)، عمرها ما توصل 32 words.",
     "أحسن إجابة موجودة، بس هي مظبوطة بالظبط للـ PUSHAD بس (<bdi dir=\"ltr\" style=\"white-space:nowrap\">8 × 4 bytes</bdi>). الـ PUSHA (<bdi dir=\"ltr\" style=\"white-space:nowrap\">8 × 2 bytes</bdi>) بتقلل SP بـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">16 byte</bdi>، والاختيار ده مش موجود."
    ],
    [
     "الـ 32 ده عدد الـ BYTES اللي الـ POPAD بتعملها pop (<bdi dir=\"ltr\" style=\"white-space:nowrap\">8 × 4</bdi>)؛ لكن السؤال بيسأل عن الـ double words، وده 8.",
     "صح. EDI, ESI, EBP, ESP, EBX, EDX, ECX, EAX.",
     "الـ 16 ده عدد الـ bytes اللي الـ POPA بتعملها pop (8 words × 2)؛ أما الـ POPAD فبتعمل pop لـ 8 double words.",
     "الـ 4 ده حجم double word واحد بالـ bytes، مش العدد؛ الـ POPAD بتعمل pop لـ 8 double words (EDI ... EAX)."
    ],
    [
     "صح. الـ POPA بتعمل pop لـ 8 registers كل واحد <bdi dir=\"ltr\" style=\"white-space:nowrap\">16-bit</bdi>، وهما:<span class=\"ltr\">DI, SI, BP, SP, BX, DX, CX, AX</span>فبيبقى:<span class=\"ltr\">SP = SP + 8 × 2 = SP + 16</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, POP)</bdi>",
     "الـ POPA بتشيل داتا من الـ stack، فالـ SP بيزيد؛ النقص بـ 16 ده اللي بتعمله الـ PUSHA.",
     "الـ POPA بتعمل pop لـ 8 registers، بس كل واحد <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes</bdi> والـ SP بيعد بالـ bytes، يعني <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 × 2 = 16</bdi>، مش 8.",
     "الاتجاه غلط والحجم غلط: الـ POP operations بتزوّد الـ SP، والـ POPA بتنقل 16 bytes مش 8."
    ],
    [
     "الـ PUSHF بتعمل push للـ FLAGS register الـ <bdi dir=\"ltr\">16-bit</bdi> بس، مش لـ register أو memory location انت بتحدده.",
     "الـ POPF بتعمل pop لأعلى قيمة في الـ stack وتحطها جوه الـ FLAGS register؛ يعني مش بتخزّن حاجة على الـ stack.",
     "صح. الـ PUSH بتقلل الـ SP وتخزّن الـ register أو الـ memory operand (أو الـ immediate) اللي انت محدده في <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, PUSH)</bdi>",
     "الـ POP بتعمل العكس: بتنسخ الداتا من أعلى الـ stack لـ register أو memory، وبعدين تزوّد الـ SP."
    ],
    [
     "الـ BX ده register حجمه <bdi dir=\"ltr\">16-bit</bdi>، والـ POP بتنسخ FROM الـ stack لجوه الـ BX؛ نسخ register على الـ stack ده شغل الـ PUSH.",
     "صح. الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">POP BX</bdi> بتنسخ <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes</bdi> من <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi> للـ BX، وبعدين تزوّد الـ SP بـ 2 <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, The stack)</bdi>.",
     "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi> هو أصلًا الـ stack؛ الـ POP بتنسخ الداتا دي من الـ stack لجوه الـ BX، مش للـ stack.",
     "مش \"None\": الاختيار b، إنها بتنسخ 16 bits من الـ stack للـ BX، هو بالظبط اللي بتعمله POP BX."
    ],
    [
     "الـ SP لوحده هو بس الـ offset بتاع الـ top of stack؛ لازم يتجمع مع الـ segment اللي هو SS عشان يطلع <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>.",
     "الـ SS لوحده هو بس الـ segment base؛ والـ offset بتاع الـ top of stack بييجي من الـ SP، فيطلع <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>.",
     "صح. الـ stack instructions بتستخدم الـ address اللي هو <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>: الـ SS بيدّي الـ stack segment، والـ SP بيدّي الـ offset بتاع الـ top <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, The stack)</bdi>.",
     "مش \"None\": الـ stack بيتوصله بالاتنين، SS (الـ segment) و SP (الـ offset)، يعني الاختيار c."
    ],
    [
     "تخزين داتا على الـ stack (PUSH) بيقلل الـ SP، والـ word حجمه 2 bytes، فالزيادة بـ 1 غلط مرتين.",
     "الاتجاه صح، بس الـ data word حجمه 2 bytes، فالـ SP بيقل 2 مش 1.",
     "الـ stack بيكبر لتحت من الـ addresses العالية للواطية، فتخزين word بيقلل الـ SP بـ 2؛ أما +2 فده الاسترجاع (POP).",
     "صح. الـ stack بيكبر لتحت: تخزين word حجمه 2 bytes (PUSH) بيقلل الـ SP بـ 2 (L5, PUSH)."
    ],
    [
     "الـ address (الـ base) بتاع الـ stack segment موجود في الـ SS مش الـ SP؛ الـ SP شايل الـ offset بتاع الـ top جواه.",
     "عبارة \"Pointer address of the segment\" مبهمة ومش هي إجابة الـ key؛ الـ SP شايل الـ offset بتاع الـ top of stack جوه الـ stack segment.",
     "صح. الـ SP شايل الـ offset (جوه الـ stack segment) بتاع الـ top of stack؛ والـ address الكامل هو <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, The stack)</bdi>",
     "الـ SP شايل offset address، مش الداتا نفسها؛ الداتا موجودة في الـ memory عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>."
    ],
    [
     "تقليل الـ SP ده شغل الـ PUSH؛ الـ POP بتقرا <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi> وبعدين تزوّد الـ SP.",
     "صح. الـ POP بتنسخ الداتا اللي عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi> للـ operand، وبعدين تزوّد الـ SP بـ 2 أو 4 <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, POP)</bdi>.",
     "الـ POP عمرها ما بتغيّر الـ SS؛ اللي بيتغير الـ SP بس، وبيزيد.",
     "الـ SS مابيتغيرش بالـ POP؛ اللي بيزيد هو الـ stack pointer يعني الـ SP."
    ],
    [
     "الـ stack ده LIFO: آخر حاجة اتعملها push بتبقى فوق، فبتتعملها pop الأول FIRST، مش الآخر.",
     "كلمة <bdi dir=\"ltr\" style=\"white-space:nowrap\">\"Pushed off\"</bdi> دي مش operation أصلًا؛ الداتا بتتشال من الـ stack بالـ POP، وآخر حاجة اتعملها push بتطلع الأول.",
     "صح. الـ stack ده LIFO (last in, first out): الـ register اللي اتعمله push في الآخر لازم يتعمله pop الأول (L5, The stack).",
     "كلمة <bdi dir=\"ltr\" style=\"white-space:nowrap\">\"Pushed off\"</bdi> ملهاش معنى؛ الشيل بيبقى بالـ POP، وبالـ LIFO آخر حاجة اتعملها push هي اللي بتطلع الأول."
    ],
    [
     "الـ PUSHes الزيادة بتسيب داتا فوق الـ return address، فالـ RET هتعمل pop للداتا دي وتنط على address غلط.",
     "الـ POPs الزيادة هتشيل الـ return address (أو داتا الـ caller) اللي الـ CALL عملها push، فالـ RET هترجع لمكان غلط.",
     "صح. الـ stack كمان شايل الـ return address بتاع الـ subroutine، فلازم عدد الـ PUSH والـ POP يبقى متساوي عشان الـ RET تلاقيه فوق (L5, The stack).",
     "مينفعش يبقوا أي عدد: الـ <bdi dir=\"ltr\">PUSH/POP</bdi> لو مش متوازنين بيبوّظوا الـ stack، والـ RET هتعمل pop لـ return address غلط."
    ],
    [
     "الـ address بتاع الـ data segment موجود في الـ DS؛ الـ SS شايل الـ stack segment.",
     "صح. الـ SS شايل الـ address (الـ base) بتاع الـ stack segment؛ والـ SP شايل الـ offset بتاع الـ top جواه (L5, The stack).",
     "الـ offset بتاع الـ top of stack موجود في الـ SP مش الـ SS؛ الـ SS شايل الـ segment address.",
     "الـ SS ده segment register شايل address، مش الداتا المتخزنة في الـ stack."
    ],
    [
     "الاسترجاع (POP) لقيمة <bdi dir=\"ltr\">16-bit</bdi> بينقل 2 bytes، فالـ SP بيزيد 2 مش 1.",
     "صح. استرجاع word بالـ POP بينسخ <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes</bdi> من <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi> وبعدين يزوّد الـ SP بـ 2 <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, POP)</bdi>.",
     "الـ POP بتزوّد الـ SP؛ النقص (بـ 2 مش 1) ده اللي بيحصل وقت التخزين بالـ PUSH.",
     "النقص بـ 2 ده الـ PUSH (تخزين word)؛ الاسترجاع بالـ POP بيزوّد الـ SP بـ 2."
    ],
    [
     "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP:[SS]</bdi> عاكسة الترتيب: الـ segment بيتكتب الأول والـ offset بين الأقواس، يعني <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>.",
     "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[BP]</bdi> بيتستخدم للوصول للداتا عن طريق الـ BP (زي <bdi dir=\"ltr\" style=\"white-space:nowrap\">MOV AX, [BP]</bdi>)؛ لكن الـ stack instructions بتستخدم الـ stack pointer، يعني <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>.",
     "صح. الـ default memory address لكل الـ stack instructions، ومنهم الـ POPA، هو <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, The stack)</bdi>",
     "الـ SI ده index register والـ default segment بتاعه DS؛ الـ stack instructions بتستخدم <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>."
    ],
    [
     "صح. الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">PUSH AX</bdi> بتحط الـ high byte (AH) في <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP-1]</bdi>، والـ low byte (AL) في <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP-2]</bdi>، وبعدين <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP = SP - 2</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, PUSH)</bdi>",
     "الـ bytes متبدلين: الـ most-significant byte (AH) بيروح <bdi dir=\"ltr\">SP-1</bdi>، والـ least-significant (AL) بيروح <bdi dir=\"ltr\">SP-2.</bdi>",
     "مكان الـ bytes صح، بس الـ PUSH بتقلل الـ SP، يعني <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP = SP - 2</bdi>، مش <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP + 2</bdi>.",
     "الاتجاه غلط: الـ PUSH بتكتب تحت الـ SP (<bdi dir=\"ltr\" style=\"white-space:nowrap\">SP-1</bdi> و <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP-2</bdi>) وبتقلل الـ SP؛ أما <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP+1/SP+2</bdi> و <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP+2</bdi> فده وصف للطلوع لفوق."
    ],
    [
     "الـ SP بيشاور على الـ TOP بتاع الـ stack (آخر قيمة اتعملها push)، مش الـ bottom.",
     "الـ address بتاع الـ instruction اللي بتتنفذ ده مرتبط بالـ IP (<bdi dir=\"ltr\" style=\"white-space:nowrap\">CS:IP</bdi>)، مش بالـ stack pointer.",
     "الـ address بتاع الـ instruction الجاية اللي هتتنفذ موجود في الـ IP؛ الـ SP شايل الـ address بتاع الـ top of stack.",
     "صح. الـ SP شايل الـ offset بتاع الـ top of stack، يعني آخر قيمة اتعملها push (L5, The stack)."
    ],
    [
     "الـ queue ده FIFO، لكن الـ nested calls لازم ترجع بالترتيب العكسي (LIFO)، فعشان كده الـ return addresses بتتحفظ على الـ stack.",
     "صح. الـ CALL بتعمل push للـ return address على الـ stack والـ RET بتعمله pop؛ وترتيب الـ LIFO هو اللي بيظبط الـ nested calls <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, The stack; L8)</bdi>.",
     "الـ data register الواحد مايقدرش يشيل return addresses متداخلة (nested)؛ الـ stack هو اللي بيخزّن الـ subroutine calls.",
     "مش \"None\": الـ return addresses بتاعة الـ subroutines بتتخزن على الـ stack."
    ],
    [
     "الـ address بيتكتب الـ segment الأول والـ offset بين الأقواس، يعني <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>. لكن الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">\"SP:[SS]\"</bdi> عاكساهم، فالجملة False.",
     "صح. الـ default address بتاع الـ PUSH (وكل الـ stack instructions) هو <bdi dir=\"ltr\" style=\"white-space:nowrap\">SS:[SP]</bdi>، مش <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP:[SS]</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, The stack)</bdi>"
    ],
    [
     "الـ <bdi dir=\"ltr\">PUSH/POP</bdi> بيغيّروا SP مش SS، والـ PUSH بتقلل.",
     "صح. الـ PUSH والـ POP عمرهم ما بيغيّروا الـ SS؛ الـ PUSH بتقلل الـ SP والـ POP بتزوّده (L5, POP)."
    ]
   ],
   "extra": [
    [
     "الـ bytes متبدلين: الـ high byte (<bdi dir=\"ltr\" style=\"white-space:nowrap\">AH = 12</bdi>) بيروح <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP-1 (050FF)</bdi>، والـ low byte (<bdi dir=\"ltr\" style=\"white-space:nowrap\">AL = 34</bdi>) بيروح <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP-2 (050FE)</bdi>.",
     "صح. العنوان:<span class=\"ltr\">05000 + 0100 = 05100</span>الـ AH عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">050FF</bdi>، والـ AL عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">050FE</bdi>.",
     "الـ PUSH بتكتب تحت الـ SP وبتقلله؛ الكتابة فوق عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">05101/05102</bdi> مع <bdi dir=\"ltr\" style=\"white-space:nowrap\">SP = 0102</bdi> ده الاتجاه الغلط.",
     "الـ bytes صح، بس الـ PUSH كمان بتقلل الـ SP بـ 2، فالـ SP بيبقى 00FE مش 0100."
    ],
    [
     "صح. كل PUSH بتطرح 2 والـ POP بتزوّد 2، يعني:<span class=\"ltr\">200 - 2 - 2 + 2 = 1FE</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, PUSH and POP)</bdi>",
     "الـ 01FC ده الـ SP بعد الـ PUSHes الاتنين بس؛ الـ POP CX بترجّع 2، فيطلع 01FE.",
     "الـ 0200 محتاجة عدد PUSHes يساوي عدد الـ POPs؛ لكن اتنين push وواحد pop بيسيبوا الـ SP أقل بـ 2، يعني 01FE.",
     "الـ 0202 بتتعامل مع الـ PUSH كأنها بتزوّد الـ SP؛ لكن الـ PUSH بتقلله، فبيبقى:<span class=\"ltr\">200 - 4 + 2 = 1FE</span>"
    ],
    [
     "الـ stack ده LIFO: الـ POP AX بتاخد آخر قيمة اتعملها push (2222h) والـ POP BX بتاخد أول واحدة (1111h)، فالقيم بتتبدل.",
     "الـ POP BX بتتنفذ تاني فبتاخد أول قيمة اتعملها push، اللي هي 1111h بتاعة الـ AX، مش 2222h.",
     "الـ POP AX بتتنفذ الأول فبتاخد آخر قيمة اتعملها push، اللي هي 2222h بتاعة الـ BX، مش 1111h.",
     "صح. LIFO: الـ POP AX بتاخد القيمة اللي فوق 2222h (اللي اتعملها push في الآخر)، وبعدين الـ POP BX بتاخد 1111h، فالـ AX والـ BX اتبدلوا (L5, The stack)."
    ],
    [
     "الـ PUSHA مش بتمشي بالترتيب الأبجدي: بعد الـ AX بييجي CX و DX، وبعدين BX (AX, CX, DX, BX, SP, BP, SI, DI).",
     "الترتيب DI, SI, BP, SP, BX, DX, CX, AX ده ترتيب الـ POPA، يعني العكس اللي بيرجّع اللي الـ PUSHA حفظته.",
     "صح. المحاضرة بتدّي ترتيب الـ PUSHA كده: AX, CX, DX, BX, SP, BP, SI, DI (8 words، يعني SP - 16) (L5, PUSH).",
     "بعد الـ BX، الـ PUSHA بتعمل push للـ SP والـ BP وبعدين بس SI و DI؛ الاختيار ده حاطط SI و DI قبل SP و BP."
    ],
    [
     "صح. الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">PUSH EAX</bdi> بتطرح 4 والـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">PUSH AX</bdi> بتطرح 2، يعني:<span class=\"ltr\">E8 - 4 = E4, E4 - 2 = E2</span>فالـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">ESP = 00FFFFE2</bdi>. المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, PUSH)</bdi>",
     "الـ 00FFFFE4 ده الـ ESP بعد PUSH EAX بس؛ وبعدها الـ PUSH AX بتطرح 2 كمان، فيطلع 00FFFFE2.",
     "الـ 00FFFFE0 طارحة 4 مرتين؛ لكن الـ PUSH AX دي push بـ <bdi dir=\"ltr\">16-bit</bdi> فبتطرح 2 بس، فيطلع 00FFFFE2.",
     "الـ 00FFFFEE زوّدت 6 بدل ما تطرح؛ الـ PUSH بتقلل الـ ESP، فبيبقى:<span class=\"ltr\">E8 - 4 - 2 = E2</span>"
    ],
    [
     "الـ POP بتزوّد SP، وأول byte هو الـ low byte.",
     "صح. الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">POP DX</bdi> بتقرا من:<span class=\"ltr\">SS:[SP] = 20010</span>الـ byte الأقل 78 بيروح الـ DL، و 56 بيروح الـ DH، فالـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">DX = 5678</bdi>؛ وبعدين:<span class=\"ltr\">SP = 0010 + 2 = 0012</span>المصدر: <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, POP)</bdi>",
     "الـ SP صح، بس ترتيب الـ bytes معكوس: الـ byte اللي في الـ address الأقل (78) هو الـ low byte يعني DL، فالـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">DX = 5678</bdi>.",
     "الـ DX صح، بس الـ POP بتزوّد الـ SP بـ 2 بعد القراية، فالـ SP بيبقى 0012 مش 0010."
    ],
    [
     "صح. لو الـ stack مش متوازن، الـ RET هتنط على عنوان غلط.",
     "السرعة ملهاش أي علاقة؛ العدد لازم يبقى متوازن عشان الـ return address يبقى فوق لما الـ RET تعمله pop.",
     "الـ SS عمره ما بيتغير مع الـ PUSH أو الـ POP؛ اللي بيتغير الـ SP بس. المشكلة الحقيقية إن الـ RET تعمل pop للـ return address الصح.",
     "الـ flags ملهاش علاقة؛ توازن الـ <bdi dir=\"ltr\">PUSH/POP</bdi> هو اللي بيخلي الـ return address فوق الـ stack عشان الـ RET."
    ],
    [
     "الـ STC بتخلي الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">CF = 1</bdi> لحد الـ POPF بس، واللي بترجّع الـ FLAGS register كله (ومعاه الـ CF القديم) اللي الـ PUSHF حفظته.",
     "الـ CF مش بيتجبر يبقى 0: الـ POPF بترجّع أي قيمة كانت في الـ CF وقت ما الـ PUSHF حفظت الـ flags.",
     "الـ POPF بترجّع كل flag لقيمته المحفوظة هو؛ مفيش flag بيتحول لـ flag تاني.",
     "صح. الـ PUSHF بتحفظ الـ FLAGS، والـ STC بتخلي الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">CF = 1</bdi>، والـ POPF بترجّع الـ FLAGS المحفوظة، فالـ CF بيرجع لقيمته الأصلية <bdi dir=\"ltr\" style=\"white-space:nowrap\">(L5, PUSH)</bdi>."
    ],
    [
     "الـ PUSH 1234h مسموحة: المحاضرة بتقول إن الـ target بتاع الـ PUSH ممكن يبقى register أو memory operand أو immediate value.",
     "صح. الـ POP محتاجة destination يا register يا memory.",
     "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">PUSH [BX]</bdi> مسموحة: الـ PUSH بتقبل memory operand وبتخزّن الـ word اللي عند <bdi dir=\"ltr\" style=\"white-space:nowrap\">DS:[BX]</bdi> على الـ stack.",
     "الـ POP DS مسموحة (ودي طريقة مشهورة لتحميل الـ DS)؛ الـ segment register الوحيد اللي الـ POP مينفعش تكتب فيه هو الـ CS."
    ],
    [
     "الـ 00F8 طارحة <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 bytes</bdi> بس؛ لكن الـ PUSHA بتحفظ 8 registers كل واحد <bdi dir=\"ltr\" style=\"white-space:nowrap\">2 bytes</bdi>، يعني:<span class=\"ltr\">16 bytes = 10H</span>فيطلع 00F0.",
     "الـ 0110 زوّدت 10H؛ لكن الـ PUSHA دي push، فالـ SP بيقل:<span class=\"ltr\">100 - 10 = F0</span>",
     "صح. الحساب:<span class=\"ltr\">8 words = 16 bytes = 10H: 100 - 10 = F0</span>",
     "الـ 00E0 طارحة <bdi dir=\"ltr\" style=\"white-space:nowrap\">32 bytes (20H)</bdi>، وده الـ PUSHAD (8 double words)؛ لكن الـ PUSHA بتعمل push لـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">8 words = 16 bytes</bdi>، فبيبقى:<span class=\"ltr\">100 - 10 = F0</span>"
    ]
   ]
  },
  "6": {
   "notes": [
    {
     "h": "الـ LEA (Load Effective Address)",
     "pts": [
      "الـ LEA بتحسب الـ source operand بتاعها <b>بنفس طريقة الـ MOV بالظبط</b>، بس بدل ما تحمّل <b>المحتوى</b> اللي في العنوان ده في الـ destination، بتحمّل <b>العنوان نفسه (الـ offset)</b>.",
      "الـ instruction دي:<pre>LEA BX, [DI]</pre>بتحط الـ offset address اللي <bdi dir=\"ltr\">[DI]</bdi> بيشاور عليه (يعني قيمة DI نفسها) في BX.",
      "أما دي:<pre>MOV BX, [DI]</pre>فبتحط <b>الداتا المتخزنة</b> في الـ memory location اللي <bdi dir=\"ltr\">[DI]</bdi> بيشاور عليه في BX."
     ],
     "figH": {
      "mp-l6-lea-mov": "نفس الـ operand وهو <bdi dir=\"ltr\">[DI]</bdi>: الـ LEA بتحمّل العنوان، والـ MOV بتحمّل الداتا اللي فيه"
     }
    },
    {
     "h": "الـ LEA مقابل الـ OFFSET",
     "figH": {
      "mp-l6-offset-lea": "نفس النتيجة بس مين اللي بيحسب: الـ assembler مع الـ OFFSET، والـ microprocessor مع الـ LEA"
     }
    },
    {
     "h": "الـ LDS والـ LES والـ LSS",
     "pts": [
      "الـ LDS والـ LES والـ LSS بيحمّلوا أي register <bdi dir=\"ltr\">16‑bit</bdi> أو <bdi dir=\"ltr\">32‑bit</bdi> بـ <b>offset address</b>، وبيحمّلوا الـ segment register <b>DS أو ES أو SS</b> بـ <b>segment address</b>.",
      "بيقروا <b>4 bytes</b> من الـ memory بادئين من العنوان اللي اتحسب (الـ default هو DS×10 + offset): <b>أول اتنين bytes</b> (العناوين الأصغر) بيروحوا للـ register (الـ offset)، و<b>الاتنين اللي بعدهم</b> بيروحوا للـ segment register.",
      "يعني الـ instruction دي:<pre>LES AX, [DI]</pre>بتنسخ <bdi dir=\"ltr\">[DI]</bdi> و <bdi dir=\"ltr\">[DI+1]</bdi> في AX، و <bdi dir=\"ltr\">[DI+2]</bdi> و <bdi dir=\"ltr\">[DI+3]</bdi> في ES. والـ instruction دي:<pre>LDS AX, [DI]</pre>بتغيّر <b>AX و DS الاتنين</b> (مش AX بس).",
      "مفيش حاجة اسمها \"LCS\" (الـ CS ماينفعش يتحمّل بالطريقة دي)."
     ],
     "figH": {
      "mp-l6-lxs-sim": "محاكي الـ LDS والـ LES والـ LSS: أول word للـ register، وتاني word للـ segment register"
     }
    },
    {
     "h": "مثال المحاضرة: LES BX, [DI]",
     "figH": {
      "mp-l6-les-figure": "رسمة الـ slide بتاعة <bdi dir=\"ltr\">LES BX, [DI]</bdi> خطوة بخطوة"
     }
    },
    {
     "h": "مثال المحاضرة: LDS BX, [DI]",
     "figH": {
      "mp-l6-lds-figure": "نفس الرسمة مع <bdi dir=\"ltr\">LDS BX, [DI]</bdi>، والـ DS بيتغيّر بعد ما اتحسب بيه العنوان"
     }
    },
    {
     "h": "مراجعة الـ Revision والـ Final <bdi dir=\"ltr\">2023/24</bdi>، مثال <bdi dir=\"ltr\">LDS&nbsp;BX,&nbsp;[DI]</bdi> لما <bdi dir=\"ltr\">(DS=1000H, BX=6F2AH, DI=1000H)</bdi>",
     "figH": {
      "mp-l6-rev-lds": "سؤال الـ Revision بالرسمة، والعنوان والنتيجة:<span class=\"ltr\">address = 11000, BX = 127A, DS = 3000</span>"
     }
    },
    {
     "h": "سؤال الـ Final <bdi dir=\"ltr\">2024/25&nbsp;(e)</bdi> و <bdi dir=\"ltr\">2023/24&nbsp;(e)</bdi>، الـ LSS أو الـ LES وبعدها stack أو string instruction",
     "figH": {
      "mp-l6-final-chain": "تنفيذ 2 instructions ورا بعض، والتانية بتستخدم الـ SS أو الـ ES الجديد"
     }
    }
   ],
   "cards": [
    "بتحمّل العنوان (الـ offset) بتاع الـ operand، مش محتواه.",
    "الـ LEA بتحط الـ offset (قيمة DI) في BX؛ والـ MOV بتحط الداتا اللي عند [DI] في BX.",
    "نفس نتيجة LEA BX, LIST بس أسرع: الـ assembler هو اللي بيحسب الـ offset.",
    "لأن الـ microprocessor هو اللي بيحسب العنوان وقت التشغيل (run time).",
    "الـ operands البسيطة زي LIST.",
    "الـ operands المعقدة زي <bdi dir=\"ltr\">[DI]</bdi> و <bdi dir=\"ltr\">LIST[SI]</bdi>.",
    "بيحمّلوا register بـ offset، والـ DS أو الـ ES أو الـ SS بـ segment، من 4 bytes ورا بعض.",
    "بتبقى:<span class=\"ltr\">AX ← [DI],[DI+1]; ES ← [DI+2],[DI+3]</span>",
    "الـ AX والـ DS.",
    "النتيجة:<span class=\"ltr\">BX = 1AB2, ES = 3C00</span>",
    "النتيجة:<span class=\"ltr\">BX = 127A, DS = 3000</span>",
    "بتحمّل الـ register بـ offset address، و SS بـ segment address."
   ],
   "qa": [
    "الـ LEA بتحسب الـ effective address بتاع الـ source زي الـ MOV بس بتحمّل العنوان نفسه. الـ instruction دي:<pre>LEA BX, [DI]</pre>بتحط الـ offset اللي في DI في BX. أما دي:<pre>MOV BX, [DI]</pre>فبتحمّل الداتا المتخزنة في الـ memory location اللي DI بيشاور عليه في BX.",
    "الاتنين دول:<pre>MOV BX, OFFSET LIST\nLEA BX, LIST</pre>بيحمّلوا الـ offset بتاع LIST في BX. الـ OFFSET بيشتغل مع الـ operands البسيطة بس وأسرع، لأن الـ assembler هو اللي بيحسب الـ offset. الـ LEA بيشتغل مع operands معقدة زي <bdi dir=\"ltr\">[DI]</bdi> أو <bdi dir=\"ltr\">LIST[SI]</bdi> وأبطأ، لأن الـ microprocessor هو اللي بيحسب العنوان وقت تنفيذ الـ instruction.",
    "الـ Memory address:<span class=\"ltr\">DS×10 + DI = A0000 + 200 = <b>A0200</b></span>الـ bytes:<span class=\"ltr\">[A0200]=B2, [A0201]=1A, [A0202]=00, [A0203]=3C</span>النتيجة:<span class=\"ltr\">BX = <b>1AB2</b>, ES = <b>3C00</b></span>(الـ ES القديم 200 متشطب).<br>الرسمة: <bdi dir=\"ltr\">DS×10&nbsp;+&nbsp;EDI</bdi> داخلين على الـ adder فيطلع <bdi dir=\"ltr\">A0200</bdi>؛ وسهم من أول اتنين bytes لـ EBX، ومن آخر اتنين bytes لـ ES.",
    "العنوان:<span class=\"ltr\">10000 + 1000 = <b>11000</b></span>الـ bytes:<span class=\"ltr\">[11000]=7A, [11001]=12, [11002]=00, [11003]=30</span>النتيجة:<span class=\"ltr\">BX = <b>127A</b>, DS = <b>3000</b></span>(الـ BX كان 6F2A، والـ DS كان 1000).",
    "بيحمّلوا أي register <bdi dir=\"ltr\">16‑bit</bdi> أو <bdi dir=\"ltr\">32‑bit</bdi> بـ offset address، والـ segment register (DS أو ES أو SS) بـ segment address، والاتنين جايين من أربع bytes ورا بعض في الـ memory: أول word بيروح للـ register، وتاني word بيروح للـ segment register."
   ],
   "quiz": [
    [
     "الـ register الـ <bdi dir=\"ltr\">16/32‑bit</bdi> بياخد OFFSET address (أول word بيتقري، أو doubleword لو الـ register <bdi dir=\"ltr\">32‑bit</bdi>)، مش segment؛ الـ SS بس هو اللي بياخد الـ segment address.",
     "ده معكوس: الـ register بياخد الـ offset (اللي بيتقري الأول من الـ memory) والـ SS بياخد الـ segment (الـ word اللي بعده).",
     "صح. الـ LDS والـ LES والـ LSS بيحمّلوا register 16 أو <bdi dir=\"ltr\">32‑bit</bdi> بـ offset address، والـ DS أو ES أو SS بـ segment address؛ وفي حالة الـ LSS ده بيبقى الـ SS (L6, LDS, LES, LSS).",
     "الـ SS ده segment register، فهو بياخد <b>segment</b> address (تاني word بيتقري)، مش offset."
    ],
    [
     "الـ DX بياخد الـ <b>offset</b> (الـ bytes اللي في [SI] و [SI+1])، مش segment؛ والـ segment word اللي في [SI+2] و [SI+3] بيروح للـ SS.",
     "الـ DX مابياخدش [SI] كعنوان، والـ DS مش destination خالص هنا؛ الـ LSS بتحط الـ offset في DX والـ segment في SS.",
     "صح. الـ LSS DX, [SI] بتقرا 4 bytes من DS×10 + SI: أول word (الـ offset) بيروح DX، وتاني word (الـ segment) بيروح SS (L6, LDS, LES, LSS).",
     "الـ DS بيتستخدم بس عشان نحسب عنوان الـ source؛ الـ LSS بتنسخ تاني word (الـ segment) في SS، مش بتنسخ «DS» في SS."
    ],
    [
     "الـ LDS بتحمّل الـ segment word بتاعها في DS، مش SS. اللي بتحمّل SS هي الـ LSS، فالجملة غلط.",
     "صح. الـ LDS AX, [DI] بتحمّل AX بالـ offset والـ DS (مش SS) بالـ segment address؛ الـ SS مابيتحمّلش غير بالـ LSS (L6, LDS, LES, LSS)."
    ],
    [
     "الـ LDS بتكتب في two registers: الـ AX بياخد أول word والـ DS بياخد تاني word، يعني مش AX بس اللي بيتغير.",
     "صح. الـ LDS AX, [DI] بتغيّر الاتنين: AX (الـ offset من [DI] و [DI+1]) و DS (الـ segment من [DI+2] و [DI+3])، مش AX لوحده (L6, LDS, LES, LSS)."
    ],
    [
     "صح. الـ DS بياخد الـ segment من [DI+2],[DI+3].",
     "الجملة صح: الـ LDS بتنسخ تاني word اتقرى ([DI+2] و [DI+3]) في DS، فالـ DS فعلًا بيتغير."
    ],
    [
     "صح. الـ LES AX, [DI] بتنسخ أول two bytes [DI] و [DI+1] في AX (الـ offset)، والـ two bytes اللي بعدهم [DI+2] و [DI+3] في ES (الـ segment) (L6, LDS, LES, LSS).",
     "الجملة صح: ده بالظبط اللي الـ LES بتعمله، أول word للـ register وتاني word للـ ES."
    ],
    [
     "مفيش LCS أصلًا، والوصف ده بتاع الـ LSS.",
     "صح. مفيش instruction اسمها LCS (الـ CS مابيتحمّلش بالطريقة دي)، والوصف اللي في السؤال ده بتاع الـ LSS (L6, LDS, LES, LSS)."
    ],
    [
     "كده إنت قريت الـ bytes من الـ high الأول. الـ memory بتبقى little-endian: الـ <bdi dir=\"ltr\">[A0200]=B2</bdi> ده الـ <b>low</b> byte، فالنتيجة:<span class=\"ltr\">BX = 1AB2, ES = 3C00</span>",
     "صح. العنوان:<span class=\"ltr\">A0000 + 200 = A0200</span>الحساب:<span class=\"ltr\">[A0200]=B2, [A0201]=1A → BX = 1AB2</span><span class=\"ltr\">[A0202]=00, [A0203]=3C → ES = 3C00</span>(من <bdi dir=\"ltr\">L6</bdi>، مثال المحاضرة <bdi dir=\"ltr\">LES&nbsp;BX,&nbsp;[DI]</bdi>).",
     "قيمة الـ BX صح، بس الـ LES بتحمّل الـ segment word في ES، مش DS؛ الـ DS بيفضل A000H.",
     "الـ words متبدّلة: أول word (العناوين الأصغر) بيروح BX وتاني word بيروح ES، فالنتيجة:<span class=\"ltr\">BX = 1AB2, ES = 3C00</span>"
    ],
    [
     "صح. عنوان الـ source بيستخدم DS:<span class=\"ltr\">DS×10 + DI = A0000 + 200 = A0200</span>(من <bdi dir=\"ltr\">L6</bdi>، مثال المحاضرة <bdi dir=\"ltr\">LES&nbsp;BX,&nbsp;[DI]</bdi>).",
     "الـ A200 جاية من إنك جمعت <bdi dir=\"ltr\">DS&nbsp;+&nbsp;DI</bdi> من غير ما تضرب الـ DS في 10H. الـ physical address:<span class=\"ltr\">A0000 + 200 = A0200</span>",
     "الـ 2200 دي:<span class=\"ltr\">ES×10 + DI = 2000 + 200</span>الـ source بتاع الـ LES موجود في الـ data segment، فبنستخدم DS:<span class=\"ltr\">A0000 + 200 = A0200</span>",
     "الـ A2000 جاية من إنك زحّيت الـ DI بدل ما تزحّي الـ DS بس <bdi dir=\"ltr\">(A0000&nbsp;+&nbsp;2000)</bdi>. الـ segment بس هو اللي بيتضرب في 10H:<span class=\"ltr\">A0000 + 200 = A0200</span>"
    ],
    [
     "الـ LEA الـ microprocessor بيحسبها وقت التشغيل.",
     "صح. الـ MOV BX, OFFSET LIST أسرع عشان الـ assembler بيحسب الـ offset بتاع LIST مسبقًا، إنما في الـ LEA الـ microprocessor هو اللي بيحسب العنوان (L6, LEA vs OFFSET).",
     "مش بياخدوا نفس الوقت: المحاضرة بتقول إن الـ microprocessor بياخد وقت أطول في تنفيذ LEA BX, LIST عن MOV BX, OFFSET LIST.",
     "ولا واحدة فيهم بتقرا داتا من الـ memory؛ ومع ذلك الـ OFFSET أسرع."
    ],
    [
     "الـ 1234H دي الـ <b>داتا</b> المتخزنة في <bdi dir=\"ltr\">DS:0300</bdi>، وده اللي الـ <bdi dir=\"ltr\">MOV&nbsp;BX,&nbsp;[DI]</bdi> بتحمّله. الـ LEA بتحمّل العنوان (الـ offset) نفسه، يعني 0300H.",
     "صح. الـ LEA بتحسب الـ source operand زي الـ MOV بالظبط، بس بتحمّل الـ offset address نفسه، فـ <bdi dir=\"ltr\">BX&nbsp;=&nbsp;DI&nbsp;=&nbsp;0300H</bdi>، مش الداتا 1234H <bdi dir=\"ltr\">(L6, LEA)</bdi>.",
     "الـ <bdi dir=\"ltr\">DS×10&nbsp;+&nbsp;300</bdi> ده الـ physical address؛ الـ LEA بتحمّل في BX الـ offset الـ <bdi dir=\"ltr\">16‑bit</bdi> بس (0300H)، مش العنوان المحسوب بالـ segment.",
     "الـ LEA دايمًا بتكتب في الـ destination بتاعها: الـ BX بياخد الـ offset 0300H."
    ],
    [
     "صح. العنوان:<span class=\"ltr\">DS×10 + DI = 10000 + 1000 = 11000</span>الحساب:<span class=\"ltr\">[11000]=7A, [11001]=12 → BX = 127A</span><span class=\"ltr\">[11002]=00, [11003]=30 → DS = 3000</span>(من <bdi dir=\"ltr\">L6</bdi>، مراجعة <bdi dir=\"ltr\">LDS&nbsp;BX,&nbsp;[DI]</bdi>).",
     "الـ Little-endian: أول byte هو الـ low byte.",
     "الـ <bdi dir=\"ltr\">BX&nbsp;=&nbsp;127A</bdi> صح، بس الـ LDS بتحط الـ segment word في DS، مش ES؛ الـ ES بيتحمّل بالـ LES.",
     "الـ 6F2A دي القيمة القديمة بتاعة BX. الـ LDS بتكتب على BX أول word اتقرى من الـ memory، يعني 127A."
    ]
   ],
   "extra": [
    [
     "الـ 9ABCH دي الداتا اللي في <bdi dir=\"ltr\">DS:0040</bdi>، ودي اللي الـ <bdi dir=\"ltr\">MOV&nbsp;BX,&nbsp;[DI]</bdi> كانت هتحمّلها. الـ LEA بتحمّل الـ offset address نفسه، يعني 0040H.",
     "الـ LEA مابتنسخش segment register؛ هي بتحمّل الـ offset بتاع الـ operand، فـ <bdi dir=\"ltr\">BX&nbsp;=&nbsp;DI&nbsp;=&nbsp;0040H</bdi>.",
     "صح. الـ LEA بتحمّل العنوان اللي [DI] بيشاور عليه، يعني الـ offset 0040H، مش الـ word 9ABCH المتخزن هناك (L6, LEA).",
     "الـ LEA مابتصفّرش الـ register؛ هي بتحمّل الـ offset المحسوب، واللي هنا هو <bdi dir=\"ltr\">DI&nbsp;=&nbsp;0040H</bdi>."
    ],
    [
     "صح. أول word بيروح AX، وتاني word بيروح ES (little-endian).",
     "كده إنت قريت الـ bytes من الـ high الأول. الـ little-endian: الـ <bdi dir=\"ltr\">30010=11</bdi> ده الـ low byte، فالنتيجة:<span class=\"ltr\">AX = 2211, ES = 4433</span>",
     "الـ <bdi dir=\"ltr\">AX&nbsp;=&nbsp;2211</bdi> صح، بس الـ LES بتحمّل تاني word في ES، مش DS؛ الـ DS بيفضل 3000H.",
     "الـ words متبدّلة: أول word (30010 و 30011) بيروح AX، والتاني (30012 و 30013) بيروح ES."
    ],
    [
     "الـ LES BX, [DI] بتحمّل الـ segment word بتاعها في ES؛ الـ DS بيتستخدم بس عشان نوصل للـ source ومابيتغيرش.",
     "الـ LSS SP, [SI] بتحمّل SP و SS؛ الـ DS بيتستخدم في الـ addressing بس بيفضل زي ما هو.",
     "الـ LEA بتحمّل offset بس في BX، وعمرها ما بتلمس أي segment register.",
     "صح. الـ LDS بتحمّل الـ offset في SI، وتاني word اتقرى من الـ memory في DS، فهي بتغيّر DS (L6, LDS, LES, LSS)."
    ],
    [
     "صح. مع الـ OFFSET الـ assembler بيحسب الـ offset بتاع LIST قبل التنفيذ؛ إنما الـ LEA بتخلي الـ microprocessor يحسب العنوان وقت التشغيل، فهي أبطأ (L6, LEA vs OFFSET).",
     "الـ MOV BX, OFFSET LIST مابتقراش من الـ memory أصلًا: الـ offset ده constant الـ assembler حسبه.",
     "ولا واحدة فيهم بتستخدم الـ stack؛ الـ LEA أبطأ بس عشان الـ microprocessor هو اللي بيحسب العنوان بنفسه.",
     "الـ OFFSET مالهاش دعوة بالـ ES ولا بأي segment register؛ دي assembler directive بتدّيك الـ offset بتاع LIST."
    ],
    [
     "الـ LIST ده simple operand، فـ MOV BX, OFFSET LIST تنفع معاه (وكمان أسرع من الـ LEA).",
     "صح. الـ OFFSET بتشتغل بس مع الـ simple operands زي LIST؛ الـ complex operands زي <bdi dir=\"ltr\">[DI]</bdi> أو <bdi dir=\"ltr\">LIST[SI]</bdi> محتاجة LEA، اللي بتتحسب وقت التشغيل (من <bdi dir=\"ltr\">L6</bdi>، جزء الـ LEA vs OFFSET).",
     "الـ data label العادي ده simple operand والـ assembler عارف الـ offset بتاعه، فالـ OFFSET تكفي.",
     "المتغير X اللي ليه اسم ده simple operand، فـ MOV reg, OFFSET X تنفع؛ الـ LEA محتاجينها بس مع الـ complex operands."
    ],
    [
     "صح. الـ 4 bytes بيتقروا بالـ DS <b>القديم</b>:<span class=\"ltr\">DS×10 + DI = 10000 + 200 = 10200</span>الـ DS مابيتغيرش غير بعد القراية (من <bdi dir=\"ltr\">L6</bdi>، مثال المحاضرة <bdi dir=\"ltr\">LDS&nbsp;BX,&nbsp;[DI]</bdi>).",
     "الـ 1200 جاية من <bdi dir=\"ltr\">DS&nbsp;+&nbsp;DI</bdi> من غير ما تضرب الـ DS في 10H. الـ physical address:<span class=\"ltr\">10000 + 200 = 10200</span>",
     "الـ 0200 دي الـ offset اللي في DI بس؛ لازم تزوّد الجزء بتاع الـ segment <bdi dir=\"ltr\">DS×10&nbsp;=&nbsp;10000</bdi>، فيطلع 10200.",
     "العنوان بيتحسب بالـ DS <b>قبل</b> ما يتغير؛ الـ DS الجديد ده مجرد نتيجة الـ instruction."
    ],
    [
     "الـ LSS بتحمّل SP و SS الاتنين، فالـ PUSH اللي بعدها بتستخدم الـ SS <b>الجديد</b> مع الـ SP الجديد.",
     "الـ stack instructions دايمًا بتستخدم <bdi dir=\"ltr\">SS:SP</bdi>، عمرها ما بتستخدم DS؛ وبعد الـ LSS ده بيبقى الـ SS الجديد مع <bdi dir=\"ltr\">SP&nbsp;-&nbsp;2</bdi>.",
     "الـ PUSH بتوصل للـ stack عن طريق SS، مش ES؛ الـ ES ده الـ destination segment بتاع الـ string instructions.",
     "صح. الـ SS والـ SP الاتنين اتحمّلوا، وبعدين الـ PUSH بتقلل SP."
    ],
    [
     "الـ byte الواحد مايكفيش offset و segment؛ الـ LDS بتقرا 4 bytes، منهم word للـ register و word للـ DS.",
     "الـ two bytes كانوا هيملوا الـ offset register بس؛ الـ LDS بتقرا كمان two bytes تانيين للـ DS، يعني 4 في المجموع.",
     "صح: 2 للـ offset register، و 2 للـ DS (في حالة الـ <bdi dir=\"ltr\">16‑bit</bdi>).",
     "الـ 8 bytes كتير: في حالة الـ <bdi dir=\"ltr\">16‑bit</bdi> الـ LDS بتقرا 2 bytes للـ register و 2 للـ DS."
    ],
    [
     "عادةً بيحمّلوا قيم مختلفة: الـ MOV بتحمّل الداتا المتخزنة في [DI]، والـ LEA بتحمّل العنوان DI نفسه.",
     "صح. الـ MOV BX, [DI] بتحمّل الداتا المتخزنة في المكان اللي [DI] بيشاور عليه؛ الـ LEA BX, [DI] بتحمّل الـ offset address نفسه (L6, LEA).",
     "دي معكوسة: الـ MOV بتحمّل الداتا من الـ memory، والـ LEA بتحمّل العنوان.",
     "ولا واحدة فيهم بتغيّر DS؛ اللي بتحمّل DS هي الـ LDS بس. الـ MOV والـ LEA هنا بيكتبوا في BX بس."
    ],
    [
     "مفيش instruction اسمها LCS؛ الـ CS مابيتحمّلش بـ instructions من نوع الـ LDS والـ LES والـ LSS.",
     "الـ destination بتاع الـ LDS لازم يبقى register 16 أو <bdi dir=\"ltr\">32‑bit</bdi> عشان ياخد الـ offset؛ القيمة الـ immediate 5 ماينفعش تبقى destination.",
     "صح. الـ LSS DX, [SI] بتحمّل DX بالـ offset والـ SS بالـ segment من الـ 4 bytes اللي في [SI] (L6, LDS, LES, LSS).",
     "الـ operands معكوسة؛ والـ destination لازم يبقى register."
    ]
   ]
  },
  "7": {
   "notes": [
    {
     "h": "ملخص الـ String instructions",
     "figH": {
      "mp-l7-sim": "محاكي الـ string instructions: اختار الـ LODS أو STOS أو OUTS أو INS والحجم والـ D"
     }
    },
    {
     "h": "القواعد الأساسية",
     "pts": [
      "الـ strings الـ <b>Source</b> بتتقري من <b><bdi dir=\"ltr\">DS:⁠[SI]</bdi></b> (الـ LODS والـ OUTS). والـ strings الـ <b>Destination</b> بتتكتب في <b><bdi dir=\"ltr\">ES:⁠[DI]</bdi></b> (الـ STOS والـ INS).",
      "الـ <b>direction flag D</b> (في EFLAGS) هو اللي بيحدد الاتجاه: لو <b><bdi dir=\"ltr\">D=0</bdi> يبقى positive</b> (الـ <bdi dir=\"ltr\">SI/DI</bdi> بيزيدوا)، ولو <b><bdi dir=\"ltr\">D=1</bdi> يبقى negative</b> (بيقلوا). الـ String instructions <b>بتستخدم</b> D بس <b>مابتغيّرهوش</b> (الـ CLD والـ STD هما اللي بيغيّروه).",
      "الـ LODS والـ STOS <b>مابيأثروش على الـ flags</b> (الـ LODSW مابتأثرش على ZF).",
      "الـ String manipulation instructions هي LODS و STOS و INS و OUTS (وكمان MOVS و CMPS و SCAS). خلي بالك: الـ <b>MOV</b> العادية <b>مش</b> string instruction.",
      "القراية من input port والكتابة على output port بيستخدموا <b>IN</b> و <b>OUT</b>."
     ],
     "figH": {
      "mp-l7-flow": "الـ source بيتقري من <bdi dir=\"ltr\">DS:[SI]</bdi> والـ destination بيتكتب في <bdi dir=\"ltr\">ES:[DI]</bdi>",
      "mp-l7-dflag": "الـ direction flag: الـ CLD والـ STD بيغيّروا الـ D، والـ LODSB بتمشي عليه بس"
     }
    },
    {
     "h": "مثال: LODSW",
     "figH": {
      "mp-l7-lodsw": "الـ LODSW خطوة بخطوة، والنتيجة:<span class=\"ltr\">address = 11000, AX = CDAB, SI = 1002</span>"
     }
    },
    {
     "h": "مثال: STOSD (وملحوظة الـ hex)",
     "figH": {
      "mp-l7-stosd": "الـ STOSD خطوة بخطوة، والـ EAX بيتخزن عند <bdi dir=\"ltr\">2100</bdi> والـ DI بيبقى <bdi dir=\"ltr\">0FCH</bdi> (الـ slide كاتبة 96)"
     }
    },
    {
     "h": "مثال: OUTSB",
     "figH": {
      "mp-l7-outsb": "الـ OUTSB خطوة بخطوة، وبتبعت byte واحد (AB) للـ output device والـ SI بيبقى <bdi dir=\"ltr\">1001</bdi>"
     }
    },
    {
     "h": "مثال: INSD (بييجي تقريبًا في كل final)",
     "figH": {
      "mp-l7-insd": "الـ INSD خطوة بخطوة، والـ bytes بتتخزن عند <bdi dir=\"ltr\">ES:[DI]</bdi> يعني <bdi dir=\"ltr\">2100</bdi> والـ DI بيبقى <bdi dir=\"ltr\">0FCH</bdi>"
     }
    },
    {
     "h": "مراجعة الـ Revision، الـ STOSW بعد الـ LES (من <bdi dir=\"ltr\">Final 2023/24</bdi>)",
     "figH": {
      "mp-l7-les-stosw": "الـ STOSW بعد الـ LES، والـ AX بيتخزن عند <bdi dir=\"ltr\">12540</bdi> والـ byte الصغير الأول، والـ DI بيبقى <bdi dir=\"ltr\">202</bdi>"
     }
    }
   ],
   "cards": [
    "من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> لـ <bdi dir=\"ltr\">AL/AX/EAX</bdi>.",
    "في <bdi dir=\"ltr\">ES:⁠[DI]</bdi> من <bdi dir=\"ltr\">AL/AX/EAX</bdi>.",
    "بتبعت <bdi dir=\"ltr\">byte/word/dword</bdi> من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> لـ output device.",
    "بتخزن داتا جاية من input device في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>.",
    "اتجاه موجب: الـ <bdi dir=\"ltr\">SI/DI</bdi> بيزيدوا.",
    "اتجاه سالب: الـ <bdi dir=\"ltr\">SI/DI</bdi> بيقلوا.",
    "بتعمل:<span class=\"ltr\">AL = DS:[SI]; SI = SI ± 1</span>",
    "بتعمل:<span class=\"ltr\">AX = DS:[SI]; SI = SI ± 2</span>",
    "بتعمل:<span class=\"ltr\">ES:[DI] = EAX; DI = DI ± 4</span>",
    "بتبقى:<span class=\"ltr\">DI = DI - 2</span>",
    "بتبقى:<span class=\"ltr\">SI = SI - 4</span>",
    "لأ، هي بتستخدمه بس.",
    "النتيجة:<span class=\"ltr\">AX = CDAB</span>",
    "العنوان 2100؛ والـ <bdi dir=\"ltr\">DI&nbsp;=&nbsp;0FCH</bdi> (الـ slide كاتبة 96).",
    "الـ IN والـ OUT."
   ],
   "qa": [
    "الـ Memory location:<span class=\"ltr\">DS×10 + SI = 10000 + 1000 = <b>11000</b></span>الـ bytes:<span class=\"ltr\">AL = AB, AH = CD → <b>AX = CDAB</b></span>والـ <bdi dir=\"ltr\">D&nbsp;=&nbsp;0</bdi> يبقى <b><bdi dir=\"ltr\">SI&nbsp;=&nbsp;1002</bdi></b>.<br>الرسمة: <bdi dir=\"ltr\">DS×10&nbsp;+&nbsp;ESI</bdi> داخلين على الـ adder فيطلع 11000؛ والـ bytes اللي هي AB و CD رايحين لـ EAX؛ والـ ESI القديم 1000 متشطب ومكتوب 1002.",
    "الـ INS بتخزن في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>. الـ Memory location:<span class=\"ltr\">ES×10 + DI = 2000 + 100 = <b>2100</b></span>الـ 4 bytes اللي هي AB و CD و 12 و 34 الجايين من الـ input device بيتخزنوا بادئين من 2100 (زي رسمة المحاضرة).<br>والـ <bdi dir=\"ltr\">D&nbsp;=&nbsp;1</bdi> يبقى <bdi dir=\"ltr\">DI&nbsp;=&nbsp;DI&nbsp;-&nbsp;4</bdi>: الـ slide كاتبة <b>96</b>؛ بس في الـ hex:<span class=\"ltr\">100H - 4 = <b>0FCH</b></span>",
    "العنوان:<span class=\"ltr\">ES×10 + DI = 2000 + 100 = <b>2100</b></span>الـ EAX (4 bytes) بيتخزن هناك؛ وبعدها:<span class=\"ltr\">DI = DI - 4 = 0FCH</span>(الـ slide كاتبة 96). ترتيب الـ bytes على الـ 8086 الحقيقي:<span class=\"ltr\">[2100]=34, [2101]=12, [2102]=CD, [2103]=AB</span>(الـ slide راسمة <bdi dir=\"ltr\">AB,&nbsp;CD,&nbsp;12,&nbsp;34</bdi>).",
    "الـ D (في EFLAGS) بيحدد الاتجاه اللي الداتا بتتقري أو تتخزن بيه. لو <bdi dir=\"ltr\">D&nbsp;=&nbsp;0</bdi> يبقى اتجاه موجب، الـ <bdi dir=\"ltr\">SI/DI</bdi> بيزيدوا 1 أو 2 أو 4 بعد كل instruction. ولو <bdi dir=\"ltr\">D&nbsp;=&nbsp;1</bdi> يبقى اتجاه سالب، بيقلوا. الـ String instructions بتتأثر بالـ D بس مابتغيّرهوش.",
    "الـ LODS بتحمّل <bdi dir=\"ltr\">AL/AX/EAX</bdi> من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> <bdi dir=\"ltr\">(SI&nbsp;±&nbsp;1/2/4)</bdi>. الـ STOS بتخزن <bdi dir=\"ltr\">AL/AX/EAX</bdi> في <bdi dir=\"ltr\">ES:⁠[DI]</bdi> <bdi dir=\"ltr\">(DI&nbsp;±&nbsp;1/2/4)</bdi>. الـ OUTS بتبعت داتا من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> لـ output device (الـ SI بيتغير). الـ INS بتاخد داتا من input device وتحطها في <bdi dir=\"ltr\">ES:⁠[DI]</bdi> (الـ DI بيتغير)."
   ],
   "quiz": [
    [
     "الـ <bdi dir=\"ltr\">ES:⁠[DI]</bdi> ده ناحية الـ destination اللي بتستخدمها STOS و INS. الـ LODS دايمًا بتقرا الـ source بتاعها من <bdi dir=\"ltr\">DS:⁠[SI]</bdi>.",
     "صح. الـ LODSW بتحمّل string word من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> في AX (الـ AL من <bdi dir=\"ltr\">[SI]</bdi> والـ AH من <bdi dir=\"ltr\">[SI+1]</bdi>)، وبعدها الـ SI بيتغير بـ 2 (من <bdi dir=\"ltr\">L7, String instruction summary</bdi>).",
     "الـ <bdi dir=\"ltr\">DS:⁠[SI]</bdi> هو الـ source الصح، بس الـ AL ده destination بتاع LODSB؛ الـ LODSW بتحمّل word، يبقى الـ register هو AX.",
     "الـ LODS عمرها ما بتستخدم <bdi dir=\"ltr\">ES:⁠[DI]</bdi> ولا BX: هي بتقرا <bdi dir=\"ltr\">DS:⁠[SI]</bdi> وتحطه في الـ accumulator (AL أو AX أو EAX)."
    ],
    [
     "الـ SI هو الـ pointer الصح بس الـ segment غلط: الـ source strings بتبقى في الـ data segment، يعني <bdi dir=\"ltr\">DS:⁠[SI]</bdi> مش ES.",
     "الـ <bdi dir=\"ltr\">ES:⁠[DI]</bdi> ده الـ destination اللي بتستخدمه STOS و INS؛ الـ LODS بتقرا من <bdi dir=\"ltr\">DS:⁠[SI]</bdi>.",
     "صح. الـ LODS بتنسخ byte أو word أو double word من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> لـ AL أو AX أو EAX (من <bdi dir=\"ltr\">L7, Key rules</bdi>).",
     "الـ DS هو الـ segment الصح، بس الـ DI ده الـ destination pointer؛ الـ LODS بتستخدم SI، يبقى الـ source هو <bdi dir=\"ltr\">DS:⁠[SI]</bdi>."
    ],
    [
     "الـ revision key بيقول إن STOS بتنسخ STRINGS من <bdi dir=\"ltr\">AL/AX/EAX</bdi> للـ memory، وكلمة «numeric values» مش الكلام اللي في المحاضرة.",
     "صح. الـ STOS دي string instruction: بتخزن string data من AL أو AX أو EAX في <bdi dir=\"ltr\">ES:⁠[DI]</bdi> (من الـ revision key، و <bdi dir=\"ltr\">L7, String instruction summary</bdi>).",
     "الـ key مدّي «strings» بس: الـ STOS متعرّفة إنها بتخزن strings من الـ accumulator، فـ «both» مش مقبولة.",
     "مش «None»: الـ STOS بتخزن strings من AL أو AX أو EAX في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>، والـ «Strings» موجودة في الاختيارات."
    ],
    [
     "صح. الـ LODSB (load string byte) بتنسخ byte واحد من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> لـ AL وبتغيّر الـ SI بـ 1 (من <bdi dir=\"ltr\">L7, String instruction summary</bdi>).",
     "الـ LODSW بتحمّل WORD (يعني 2 bytes) في AX، مش byte واحد في AL.",
     "الـ STOSB بتمشي في الاتجاه العكسي: بتخزن AL في الـ memory عند <bdi dir=\"ltr\">ES:⁠[DI]</bdi>، مش بتحمّل AL.",
     "الـ STOSW بتخزن AX في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>؛ يعني بتكتب في الـ memory، مش بتحمّل byte في AL."
    ],
    [
     "الـ MOV بتنسخ بين الـ registers والـ memory، والـ XCHG بتبدّل قيم؛ ولا واحدة فيهم بتتعامل مع الـ <bdi dir=\"ltr\">I/O</bdi> ports. الـ ports ليها IN و OUT.",
     "صح. الـ IN بتقرا داتا من input port، والـ OUT بتكتب داتا على output port (L7, Key rules).",
     "الـ IN صح للقراية، بس الـ MOV ماتقدرش تكتب على <bdi dir=\"ltr\">I/O</bdi> port؛ الكتابة على output port بتبقى بـ OUT.",
     "الـ MOV ماتقدرش تقرا port، والـ IN للقراية مش للكتابة؛ الترتيب الصح IN وبعدين OUT."
    ],
    [
     "الـ OUTS بتقرا الـ source بتاعها من <bdi dir=\"ltr\">DS:⁠[SI]</bdi>، فاللي بيتغير SI مش DI؛ وكمان خطوة الـ double word هي 4 مش 2.",
     "الـ SI وعلامة الطرح صح، بس الـ OUTSD بتنقل double word (يعني 4 bytes)، يبقى <bdi dir=\"ltr\">SI&nbsp;=&nbsp;SI&nbsp;-&nbsp;4</bdi>. الطرح بـ 2 ده بتاع OUTSW.",
     "صح. الـ OUTSD بتبعت 4 bytes من <bdi dir=\"ltr\">DS:⁠[SI]</bdi>؛ ومع <bdi dir=\"ltr\">D=1</bdi> الـ pointer بيقل، يبقى <bdi dir=\"ltr\">SI&nbsp;=&nbsp;SI&nbsp;-&nbsp;4</bdi> (من <bdi dir=\"ltr\">L7, String instruction summary</bdi>).",
     "فيها غلطتين: الـ OUTS بتستخدم SI (مش DI)، والـ <bdi dir=\"ltr\">D=1</bdi> بيقلل بـ 4 (مش بيزوّد بـ 2)."
    ],
    [
     "الـ <bdi dir=\"ltr\">ES:⁠[DI]&nbsp;=&nbsp;AX</bdi> صح، بس <bdi dir=\"ltr\">D=1</bdi> معناها الاتجاه السالب، يبقى <bdi dir=\"ltr\">DI&nbsp;=&nbsp;DI&nbsp;-&nbsp;2</bdi>، مش <bdi dir=\"ltr\">+&nbsp;2</bdi>.",
     "صح. الـ STOSW بتخزن AX عند <bdi dir=\"ltr\">ES:⁠[DI]</bdi>، بس <bdi dir=\"ltr\">D=1</bdi> بيقلل الـ pointer:<span class=\"ltr\">DI = DI - 2</span>والـ <bdi dir=\"ltr\">+2</bdi> محتاجة <bdi dir=\"ltr\">D=0</bdi> (من <bdi dir=\"ltr\">L7, Key rules</bdi>)."
    ],
    [
     "صح. الـ LODSW معناها load string word: يعني 2 bytes من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> بيدخلوا AX (الـ low byte في AL والـ high في AH) (من <bdi dir=\"ltr\">L7, String instruction summary</bdi>).",
     "الجملة صح: الـ LODSW بتحمّل word، يعني 2 bytes، من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> في AX."
    ],
    [
     "الـ LODS بتنسخ الداتا في الـ accumulator وبتحدّث SI وبس؛ مابتأثرش على أي flag، ولا حتى ZF.",
     "صح. الـ LODS والـ STOS مابيأثروش على الـ flags، فالـ LODSW بتسيب ZF زي ما هو (من <bdi dir=\"ltr\">L7, Key rules</bdi>)."
    ],
    [
     "الـ string instructions بتقرا الـ D بس عشان تعرف الـ <bdi dir=\"ltr\">SI/DI</bdi> هيزيدوا ولا يقلوا؛ الـ D بيتغير بـ CLD و STD.",
     "صح. الـ string instructions بتستخدم الـ D بس مابتغيّرهوش؛ اللي بيغيّره الـ CLD <bdi dir=\"ltr\">(D=0)</bdi> والـ STD <bdi dir=\"ltr\">(D=1)</bdi> بس (من <bdi dir=\"ltr\">L7, Key rules</bdi>)."
    ],
    [
     "لأ، هي بتتأثر بيه: الـ D هو اللي بيحدد الاتجاه، الـ <bdi dir=\"ltr\">D=0</bdi> بيزوّد <bdi dir=\"ltr\">SI/DI</bdi> والـ <bdi dir=\"ltr\">D=1</bdi> بيقللهم.",
     "صح. الـ direction flag هو اللي بيحدد اتجاه الـ string instructions: الـ <bdi dir=\"ltr\">D=0</bdi> اتجاه موجب (<bdi dir=\"ltr\">SI/DI</bdi> بيزيدوا)، والـ <bdi dir=\"ltr\">D=1</bdi> سالب (بيقلوا) (من <bdi dir=\"ltr\">L7, Key rules</bdi>)."
    ],
    [
     "الـ MOV العادية مش string instruction (الـ MOVS هي اللي string). الـ string instructions اللي في المحاضرة هي LODS و STOS و INS و OUTS.",
     "صح. الـ LODS والـ STOS string instructions، بس الـ MOV العادية لأ (الـ MOVS هي اللي string)، فالليستة غلط (L7, Key rules)."
    ],
    [
     "الـ LODS و INS و STOS string instructions، بس الـ MOV لأ (الـ MOVS بس هي اللي string)، فالجملة غلط.",
     "صح. الـ MOV دي data transfer instruction عادية، مش string instruction؛ الليستة كانت محتاجة MOVS بدالها (L7, Key rules)."
    ],
    [
     "الـ LODS بتقرا من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> مش <bdi dir=\"ltr\">DS:⁠[DI]</bdi>؛ الـ DI ده الـ destination pointer اللي بيتستخدم مع ES في STOS و INS.",
     "صح. الـ LODS بتحمّل AL أو AX أو EAX من <bdi dir=\"ltr\">DS:⁠[SI]</bdi>؛ والجملة قايلة <bdi dir=\"ltr\">DS:⁠[DI]</bdi>، وده غلط (من <bdi dir=\"ltr\">L7, String instruction summary</bdi>)."
    ],
    [
     "الـ ABCD قاري الـ bytes بالترتيب الغلط: أول byte <bdi dir=\"ltr\">[SI]=AB</bdi> بيروح AL (الـ low)، و CD بيروح AH، يبقى <bdi dir=\"ltr\">AX&nbsp;=&nbsp;CDAB</bdi>.",
     "صح. العنوان:<span class=\"ltr\">10000 + 1000 = 11000</span>الحساب:<span class=\"ltr\">AL = [11000] = AB, AH = [11001] = CD → AX = CDAB</span>والـ <bdi dir=\"ltr\">D=0</bdi> يبقى:<span class=\"ltr\">SI = 1000 + 2 = 1002</span>(من <bdi dir=\"ltr\">L7, Example LODSW</bdi>)",
     "الـ <bdi dir=\"ltr\">AX&nbsp;=&nbsp;CDAB</bdi> صح، بس <bdi dir=\"ltr\">D=0</bdi> ده الاتجاه الموجب، فالـ SI بيزيد لـ 1002، مش بيقل لـ 0FFE.",
     "إنك تحمّل byte واحد وتحرّك SI بـ 1 ده LODSB؛ الـ LODSW بتحمّل word في AX وبتزوّد SI بـ 2."
    ],
    [
     "الـ 11000 ده هيبقى <bdi dir=\"ltr\">DS×10&nbsp;+&nbsp;1000</bdi>، بس الـ INS بتكتب في <bdi dir=\"ltr\">ES:⁠[DI]</bdi> والـ DI قيمته 100:<span class=\"ltr\">ES×10 + DI = 2000 + 100 = 2100</span>",
     "صح. الـ INS بتكتب الـ input في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>، يعني:<span class=\"ltr\">ES×10 + DI = 2000 + 100 = 2100</span>والـ DS مش مستخدم خالص (من <bdi dir=\"ltr\">L7, Example INSD</bdi>).",
     "الـ 10100 ده <bdi dir=\"ltr\">DS×10&nbsp;+&nbsp;DI</bdi>. الـ INS دايمًا بتكتب في الـ extra segment، فبنستخدم ES:<span class=\"ltr\">2000 + 100 = 2100</span>",
     "الـ 300 جاية من <bdi dir=\"ltr\">ES&nbsp;+&nbsp;DI&nbsp;=&nbsp;200&nbsp;+&nbsp;100</bdi> من غير ما تضرب الـ ES في 10H؛ العنوان الصح:<span class=\"ltr\">2000 + 100 = 2100</span>"
    ]
   ],
   "extra": [
    [
     "صح. الـ LODSB بتحمّل الـ byte اللي عند:<span class=\"ltr\">DS×10 + SI = 20000 + 10 = 20010</span>في AL (41h)؛ و <bdi dir=\"ltr\">D=0</bdi> يبقى:<span class=\"ltr\">SI = 0010 + 1 = 0011H</span>(من <bdi dir=\"ltr\">L7, String instruction summary</bdi>)",
     "الـ <bdi dir=\"ltr\">AL&nbsp;=&nbsp;41h</bdi> صح، بس <bdi dir=\"ltr\">D=0</bdi> بيزوّد SI:<span class=\"ltr\">0010 + 1 = 0011H</span>مش 000FH.",
     "الـ LODSB بتحمّل byte واحد في AL وبتحرّك SI بـ 1 (لـ 0011H)؛ الخطوة بـ 2 دي بتاعة LODSW.",
     "كتابة AL في <bdi dir=\"ltr\">ES:⁠[DI]</bdi> دي STOSB؛ الـ LODSB بتقرا <bdi dir=\"ltr\">DS:⁠[SI]</bdi> وتحطه في AL."
    ],
    [
     "الـ bytes معكوسة: الـ low byte <bdi dir=\"ltr\">AL&nbsp;=&nbsp;34</bdi> بيروح للعنوان الأصغر 30020، والـ <bdi dir=\"ltr\">AH&nbsp;=&nbsp;12</bdi> بيروح 30021.",
     "صح. الـ STOSW بتخزن AX عند <bdi dir=\"ltr\">ES×10&nbsp;+&nbsp;DI&nbsp;=&nbsp;30020</bdi>، يعني:<span class=\"ltr\">AL = 34 → 30020, AH = 12 → 30021</span>والـ <bdi dir=\"ltr\">D=0</bdi> يبقى:<span class=\"ltr\">DI = 0020 + 2 = 0022H</span>(من <bdi dir=\"ltr\">L7, String instruction summary</bdi>)",
     "الـ bytes المتخزنة صح، بس <bdi dir=\"ltr\">D=0</bdi> ده الاتجاه الموجب، فالـ DI بيبقى 0022H، مش 001EH.",
     "الـ STOS بتكتب الـ destination بتاعها في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>؛ الـ <bdi dir=\"ltr\">DS:⁠[SI]</bdi> ده ناحية الـ source اللي بتستخدمها LODS و OUTS."
    ],
    [
     "مع <bdi dir=\"ltr\">D=1</bdi> الـ pointer بيقل مش بيزيد؛ الـ 0104H دي النتيجة لو كان <bdi dir=\"ltr\">D=0</bdi>.",
     "الـ 0096 ده <bdi dir=\"ltr\">100&nbsp;-&nbsp;4</bdi> محسوبة decimal (رسمة المحاضرة كاتبة «96»)، بس الـ SI بالـ hex:<span class=\"ltr\">100H - 4 = 00FCH</span>",
     "الـ 00FFH دي خطوة byte واحد (LODSB)؛ الـ LODSD بتنقل double word، فالـ SI بيتغير بـ 4.",
     "صح. الـ LODSD بتقرا 4 bytes و <bdi dir=\"ltr\">D=1</bdi> بيقلل، فبالـ hex:<span class=\"ltr\">SI = 0100H - 4 = 00FCH</span>(من <bdi dir=\"ltr\">L7, Example STOSD hex note</bdi>)"
    ],
    [
     "الـ INS بتمشي في الاتجاه العكسي: بتقرا من input device وبتكتب الداتا في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>.",
     "الـ STOS بتكتب <bdi dir=\"ltr\">AL/AX/EAX</bdi> في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>؛ مابتبعتش حاجة لأي output device.",
     "صح. الـ OUTS بتقرا الـ string data من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> وبتبعتها للـ output device، وبعدين بتحرّك SI (من <bdi dir=\"ltr\">L7, Example OUTSB</bdi>).",
     "الـ LODS بتقرا <bdi dir=\"ltr\">DS:⁠[SI]</bdi> آه، بس بتحمّله في <bdi dir=\"ltr\">AL/AX/EAX</bdi>، مش بتبعته لـ output device."
    ],
    [
     "صح. الـ STD بتعمل set للـ direction flag <bdi dir=\"ltr\">(D=1)</bdi>، وده الاتجاه السالب، فالـ <bdi dir=\"ltr\">SI/DI</bdi> بيقلوا (من <bdi dir=\"ltr\">L7, Key rules</bdi>).",
     "الـ CLD بتصفّر الـ direction flag <bdi dir=\"ltr\">(D=0)</bdi>، وده بيخلي <bdi dir=\"ltr\">SI/DI</bdi> يزيدوا، يعني عكس المطلوب.",
     "الـ STC بتعمل set للـ carry flag CF، مش الـ direction flag، فمالهاش أي تأثير على الـ string pointers.",
     "الـ LODSB بتقرا الـ D بس عشان تختار اتجاه الخطوة؛ الـ string instructions عمرها ما بتغيّر الـ D."
    ],
    [
     "الـ 10005 ده <bdi dir=\"ltr\">DS×10&nbsp;+&nbsp;DI</bdi>. الـ INS دايمًا بتكتب في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>، فالعنوان:<span class=\"ltr\">20000 + 5 = 20005</span>",
     "صح. الـ INSB بتكتب الـ input byte في:<span class=\"ltr\">ES:[DI] = ES×10 + DI = 20000 + 5 = 20005</span>والـ DS والـ SI مش مستخدمين (من <bdi dir=\"ltr\">L7, Key rules</bdi>).",
     "الـ 1005 جمع الـ DS من غير ما يتزاح على الـ DI، وكمان الـ segment غلط؛ الـ ES لازم يتضرب في 10H:<span class=\"ltr\">20000 + 5 = 20005</span>",
     "الـ 30005 جمع الـ DS والـ ES مع بعض؛ اللي بيتستخدم segment واحد بس، وهو ES، فالنتيجة:<span class=\"ltr\">ES×10 + DI = 20005</span>"
    ],
    [
     "الـ SI مع DS ده الـ SOURCE pointer اللي بتستخدمه LODS و OUTS، مش الـ destination.",
     "الـ BX ده base register للـ data addressing، مش string pointer؛ الـ string destinations بتستخدم DI مع ES.",
     "الـ SP مع SS بيشاوروا على الـ stack عشان PUSH و POP، مش على string destinations.",
     "صح. الـ destination strings دايمًا بتتكتب في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>، وده اللي STOS و INS بيستخدموه (من <bdi dir=\"ltr\">L7, Key rules</bdi>)."
    ],
    [
     "صح. العنوان:<span class=\"ltr\">10000 + 200 = 10200</span>الحساب:<span class=\"ltr\">AL = 55, AH = 66 → AX = 6655h</span>والـ <bdi dir=\"ltr\">D=1</bdi> يبقى:<span class=\"ltr\">SI = 0200 - 2 = 01FEH</span>(من <bdi dir=\"ltr\">L7, String instruction summary</bdi>)",
     "ترتيب الـ bytes معكوس: الـ byte اللي في العنوان الأصغر (55h) هو الـ low byte اللي في AL، يبقى <bdi dir=\"ltr\">AX&nbsp;=&nbsp;6655h</bdi>.",
     "الـ AX صح، بس <bdi dir=\"ltr\">D=1</bdi> ده الاتجاه السالب، يبقى <bdi dir=\"ltr\">SI&nbsp;=&nbsp;0200&nbsp;-&nbsp;2&nbsp;=&nbsp;01FEH</bdi>، مش 0202H.",
     "إنك تحمّل AL بس وتتحرك بـ 1 ده LODSB؛ الـ LODSW بتحمّل word في AX وبتتحرك بـ 2."
    ],
    [
     "الـ LODS بتنسخ الداتا وبتحدّث SI وبس؛ مابتأثرش على ZF ولا على أي flag تاني.",
     "الـ LODSW دي data transfer مش عملية حسابية، فبتسيب CF زي ما هو؛ الـ LODS مابتأثرش على أي flag.",
     "صح. الـ LODS والـ STOS مابيأثروش على الـ flags، فالـ LODSW مابتغيّرش ولا واحد فيهم (من <bdi dir=\"ltr\">L7, Key rules</bdi>).",
     "الـ D بيتقري بس عشان يحدد الاتجاه؛ اللي بيغيّره الـ CLD أو الـ STD، مش LODSW."
    ],
    [
     "الـ 0011H دي خطوة byte واحد (STOSB)؛ الـ STOSD بتخزن double word، فالـ DI بيتحرك بـ 4.",
     "صح. الـ STOSD بتخزن EAX (4 bytes) عند <bdi dir=\"ltr\">ES:⁠[DI]</bdi>؛ و <bdi dir=\"ltr\">D=0</bdi> بيزوّد، يبقى:<span class=\"ltr\">DI = 0010 + 4 = 0014H</span>(من <bdi dir=\"ltr\">L7, String instruction summary</bdi>)",
     "الـ 000CH ده هيبقى <bdi dir=\"ltr\">DI&nbsp;-&nbsp;4</bdi>، وده محتاج <bdi dir=\"ltr\">D=1</bdi>؛ مع <bdi dir=\"ltr\">D=0</bdi> الـ pointer بيزيد لـ 0014H.",
     "الـ 0012H دي خطوة الـ word (STOSW)؛ الـ STOSD بتتحرك 4 bytes، يبقى <bdi dir=\"ltr\">DI&nbsp;=&nbsp;0014H</bdi>."
    ]
   ]
  },
  "8": {
   "notes": [
    {
     "h": "الـ Unconditional jumps (JMP)",
     "pts": [
      "الـ Unconditional transfer instructions بتخلي المبرمج <b>يتخطى أجزاء</b> من البرنامج وينط لأي حتة في الـ memory عشان ياخد الـ instruction الجاية منها.",
      "تلات أنواع: <b>short</b> و <b>near</b> و <b>far</b>. افتكر: الـ <b>IP</b> شايل عنوان الـ instruction الجاية؛ والـ <b>CS</b> شايل الـ segment بتاع الكود.",
      "الـ Short والـ near jumps بيغيّروا <b>IP بس</b> (نفس الـ code segment). الـ far jump بس هو اللي بيغيّر <b>CS و IP الاتنين</b>."
     ],
     "figH": {
      "mp-l8-jmp-scope": "الـ CS والـ IP بعد كل jump: الـ short والـ near بيغيّروا الـ IP بس، والـ far بيغيّر الاتنين"
     }
    },
    {
     "h": "أنواع الـ jump التلاتة",
     "figH": {
      "mp-l8-jmp-bytes": "أنواع الـ jump التلاتة byte بـ byte: الطول والمدى والعنوان الجديد"
     }
    },
    {
     "h": "أمثلة المحاضرة، لما <bdi dir=\"ltr\">CS=1000, IP=0002</bdi> والـ JMP عند 10000",
     "figH": {
      "mp-l8-jmp-slides": "رسومات الـ memory في الـ slides للـ short والـ near والـ far jump خطوة بخطوة"
     }
    },
    {
     "h": "سؤال الـ Revision Q12 والـ Final <bdi dir=\"ltr\">2023/24</bdi>، لما <bdi dir=\"ltr\">CS=1000, IP=300</bdi> والـ bytes هي <bdi dir=\"ltr\">JMP, 04, 02, 30, A4</bdi>",
     "figH": {
      "mp-l8-jmp-q12": "حاسبة الـ jump address، والنتايج هنا:<span class=\"ltr\">short = 10304, near = 10504, far = A4504</span>"
     }
    },
    {
     "h": "سؤال الـ Revision Q13 والـ Final <bdi dir=\"ltr\">2024/25</bdi>، لما <bdi dir=\"ltr\">CS=2000, IP=300</bdi> والـ bytes هي <bdi dir=\"ltr\">JMP, 1C, 20, A0, 2D</bdi>",
     "figH": {
      "mp-l8-jmp-q13": "نفس الحاسبة على سؤال Q13، والنتايج:<span class=\"ltr\">short = 2031C, near = 2231C, far = 2FA1C</span>"
     }
    },
    {
     "h": "سؤال الـ Final <bdi dir=\"ltr\">2023/24</bdi>، لما <bdi dir=\"ltr\">CS=3000H, IP=400H</bdi> والـ bytes هي <bdi dir=\"ltr\">JMP, 10, 43, 1C, 20</bdi>",
     "figH": {
      "mp-l8-jmp-f2324": "نفس الحاسبة على سؤال الـ final ده، والنتايج:<span class=\"ltr\">near = 34710, far = 244D0, short = 30410</span>"
     }
    },
    {
     "h": "الـ Interrupts",
     "pts": [
      "الـ <b>interrupt</b> هو الـ mechanism اللي الـ processor بينقل بيه التحكم من البرنامج الحالي لبرنامج تاني <b>الـ priority بتاعه أعلى</b>. بيكسر الترتيب العادي لتنفيذ الـ instructions.",
      "الـ routine اللي بيتنفذ لما يحصل interrupt (أو كذا interrupt) اسمه <b>Interrupt Service Routine (ISR)</b>. وبعد الـ ISR الـ processor لازم يرجع للبرنامج اللي اتقاطع.",
      "<b>خطوات التعامل مع الـ interrupt</b> هي: (1) تحفظ محتوى الـ PC والحالة الحالية (الـ flags والـ registers) <b>في الـ stack</b>؛ وبعدين (2) تحمّل الـ PC بعنوان بداية الـ ISR وتنفذه؛ (3) الـ ISR بيخلص لما الـ return instruction تتنفذ؛ (4) ترجع للنقطة اللي التنفيذ اتقطع عندها.",
      "الـ <b>Vectored</b> interrupts ليها vector address ثابت (بداية الـ subroutine)؛ أما الـ <b>non-vectored</b> فالـ vector address بتاعها مش متحدد مسبقًا.",
      "الـ <b>Maskable</b> interrupts ينفع تتمنع (تتعطل بـ interrupt mask bit). الـ <b>Non-maskable</b> (NMI) ماينفعش تتعمل mask ولا تتجاهل؛ بتستخدم للحاجات المهمة جدًا زي الـ memory parity أو الـ bus faults؛ وليها priority مطلقة: الـ CPU بيخلص الـ memory cycle الحالية وبعدين ينط على الـ handler.",
      "الـ <b>Software</b> interrupts هي instructions خاصة (INT) بتنقل التحكم لـ ISR متحدد مسبقًا. والـ <b>Hardware</b> interrupts هي signals بتتبعت للـ processor."
     ],
     "figH": {
      "mp-l8-int-handle": "التعامل مع الـ interrupt: نحفظ الـ PC والحالة، ننفّذ الـ ISR، ونرجع",
      "mp-l8-int-mask": "جرّب بنفسك: الـ mask bit بتمنع الـ maskable interrupt، لكن عمرها ما تمنع الـ NMI",
      "mp-l8-int-types": "الـ 3 طرق اللي بنقسم بيها الـ interrupts"
     }
    },
    {
     "h": "الـ LOOP (Lab 7)",
     "pts": [
      "الـ LOOP بتكرر block عدد مرات معين. الـ <b>CX</b> بيبقى العدّاد أوتوماتيك: (1) <bdi dir=\"ltr\">CX&nbsp;=&nbsp;CX&nbsp;-&nbsp;1</bdi>؛ (2) لو <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi> ينط على الـ label، غير كده يكمّل على الـ instruction اللي بعدها.",
      "الـ <b><bdi dir=\"ltr\">LOOPE/LOOPZ</bdi></b>: تقلل CX، وتنط لو <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi> <b>و <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi></b>. والـ <b><bdi dir=\"ltr\">LOOPNE/LOOPNZ</bdi></b>: تنط لو <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi> <b>و <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;0</bdi></b>.",
      "في الـ nested loop: احفظ الـ CX بتاع الـ loop الخارجي في variable (أو على الـ stack) قبل ما تحط العدد بتاع الـ loop الداخلي، ورجّعه قبل الـ LOOP الخارجية."
     ],
     "figH": {
      "mp-l8-loop-flow": "الـ LOOP والـ LOOPE والـ LOOPNE: تقلل الـ CX وبعدين تنط أو تكمّل"
     }
    },
    {
     "h": "برامج الـ LOOP (Lab 7)",
     "figH": {
      "mp-l8-loop-trace": "شغّل برامج الـ LOOP التلاتة بتاعة الـ Lab 7 instruction بـ instruction"
     }
    },
    {
     "h": "الـ Procedures: الـ CALL والـ RET (Lab 8)",
     "pts": [
      "الـ <b>subroutine (procedure)</b> جزء خاص من البرنامج ينفع تناديه من أي مكان؛ بيعمل وظيفة محتاجينها كتير. هو المقابل في الـ ASM للـ function في الـ Java والـ <bdi dir=\"ltr\">C++</bdi>. الـ Syntax:<pre>name PROC\n  ...\n  RET\n  ...\nname ENDP</pre>",
      "الـ <b>CALL</b> بتعمل push للـ offset بتاع الـ instruction الجاية على الـ stack، وبتنسخ عنوان الـ procedure المطلوب في (E)IP.",
      "الـ <b>RET</b> بتعمل pop لقمة الـ stack في (E)IP، فترجع للبرنامج الرئيسي. وأي procedure لازم يخلص بـ RET.",
      "الـ Directives: الـ <b>END</b> بتعلّم نهاية البرنامج؛ الـ <b>ENDS</b> بتعلّم نهاية logical segment؛ والـ <b>ENDP</b> بتقفل الـ procedure."
     ],
     "figH": {
      "mp-l8-call-ret": "الـ CALL بتعمل push لعنوان الرجوع وتنط، والـ RET بتعمله pop تاني في الـ IP"
     }
    },
    {
     "h": "أمثلة الـ Procedures (Lab 8)",
     "figH": {
      "mp-l8-tri-area": "تتبّع الـ Triangle_Area، الـ MUL وبعدها الـ DIV، والنتيجة:<span class=\"ltr\">area = 25</span>"
     }
    }
   ],
   "cards": [
    "الـ 2 bytes، المدى من <bdi dir=\"ltr\">+127</bdi> لـ <bdi dir=\"ltr\">-128</bdi>؛ والقانون:<span class=\"ltr\">IPnew = IP + [CS+1]</span>",
    "الـ 3 bytes، المدى <bdi dir=\"ltr\">±32K</bdi>؛ والقانون:<span class=\"ltr\">IPnew = IP + [CS+2][CS+1]</span>",
    "الـ 5 bytes، أي مكان في الـ real memory؛ الـ bytes <bdi dir=\"ltr\">2-3</bdi> هما الـ offset، و <bdi dir=\"ltr\">4-5</bdi> هما الـ segment.",
    "الـ IP بس.",
    "الـ CS والـ IP.",
    "بينقل التحكم من البرنامج الحالي لبرنامج الـ priority بتاعه أعلى.",
    "الـ Interrupt service routine: الـ routine اللي بيتنفذ لما يحصل interrupt (أو أكتر).",
    "تحفظ الـ PC والحالة الحالية (flags, registers) في الـ stack.",
    "ماينفعش يتمنع؛ الـ priority عالية (الـ memory parity والـ bus faults).",
    "الـ vector address بتاعه مش متحدد مسبقًا.",
    "بيحصل لما interrupt instruction تتنفذ.",
    "الـ <bdi dir=\"ltr\">Vectored/non‑vectored</bdi>، والـ <bdi dir=\"ltr\">maskable/non‑maskable</bdi>، والـ <bdi dir=\"ltr\">software/hardware</bdi>.",
    "الـ CX (تقلله، وتنط لو مش صفر).",
    "محتاجين كمان <bdi dir=\"ltr\">ZF=1</bdi> أو <bdi dir=\"ltr\">ZF=0</bdi>.",
    "بتعمل push للـ offset بتاع الـ instruction الجاية، وبتحمّل عنوان الـ procedure في IP.",
    "بتعمل pop لقمة الـ stack في IP.",
    "الـ END بتقفل البرنامج؛ الـ ENDS بتقفل segment.",
    "العنوان <bdi dir=\"ltr\">A4504</bdi>."
   ],
   "qa": [
    "عنوان البداية:<span class=\"ltr\">CS×10 = 10000</span>الـ <b>Short</b> (حجمه <bdi dir=\"ltr\">2-byte</bdi> ومداه <bdi dir=\"ltr\">+127/-128</bdi>)، والحساب:<span class=\"ltr\">IP = 300 + 04 = 304 → <b>10304</b></span>الـ <b>Near</b> (حجمه <bdi dir=\"ltr\">3-byte</bdi> ومداه <bdi dir=\"ltr\">±32K</bdi>؛ الـ bytes 2 و 3 هما الـ displacement):<span class=\"ltr\">IP = 300 + 0204 = 504 → <b>10504</b></span>الـ <b>Far</b> (حجمه <bdi dir=\"ltr\">5-byte</bdi>؛ الـ bytes <bdi dir=\"ltr\">2-3</bdi> offset، و <bdi dir=\"ltr\">4-5</bdi> segment):<span class=\"ltr\">offset = 0204, segment = A430 → A4300 + 0204 = <b>A4504</b></span>",
    "الـ Short:<span class=\"ltr\">20000 + 300 + 1C = <b>2031C</b></span>الـ Near:<span class=\"ltr\">20000 + 300 + 201C = <b>2231C</b></span>الـ Far:<span class=\"ltr\">segment 2DA0 ×10 = 2DA00, offset 201C → <b>2FA1C</b></span>",
    "1) تحفظ محتوى الـ PC ومعلومات الحالة الحالية (flags, registers) في الـ stack. 2) تحمّل الـ PC بعنوان بداية الـ ISR وتنفذه. 3) الـ ISR بيخلص لما الـ return instruction تتنفذ. 4) ترجع للنقطة في البرنامج اللي اتقاطع اللي التنفيذ وقف عندها.",
    "<b>الـ Vectored مقابل الـ non-vectored</b>: الـ vectored ليها vector address ثابت (بداية الـ ISR)؛ والـ non-vectored مالهاش vector address متحدد مسبقًا.<br><b>الـ Maskable مقابل الـ non-maskable</b>: الـ maskable ينفع تتمنع باستخدام interrupt mask bit؛ والـ non-maskable (NMI) ماينفعش تتجاهل، وبتستخدم للأحداث المهمة جدًا زي الـ memory parity أو الـ bus faults، وليها priority مطلقة.<br><b>الـ Software مقابل الـ hardware</b>: الـ software interrupts هي instructions بتنقل التحكم لـ ISR متحدد مسبقًا؛ والـ hardware interrupts هي signals بتتبعت للـ processor.",
    "الـ LOOP الأول بتطرح 1 من CX، وبعدين تقارن CX بالصفر؛ لو CX ≠ 0 تنط على الـ label، غير كده التنفيذ يكمّل بعد الـ LOOP.<br><pre>MOV AX, 0\nMOV CX, 10\nL: ADD AX, CX\n   LOOP L      ; AX = 55</pre>",
    "الـ CALL بتعمل push للـ offset بتاع الـ instruction الجاية (الـ return address) على الـ stack، وبتنسخ عنوان الـ procedure المطلوب في EIP. والـ RET بتعمل pop لقمة الـ stack في EIP، فالتنفيذ يرجع للـ instruction اللي بعد الـ CALL."
   ],
   "quiz": [
    [
     "صح. الـ software interrupts دي instructions مخصوصة (INT) بتنقل التحكم لـ ISR متحدد قبل كده، فأي interrupt بييجي من تنفيذ instruction يبقى software interrupt (L8, Interrupts).",
     "الـ external interrupt بييجي من signal برا الـ CPU (device على interrupt pin)، مش من تنفيذ instruction جوا البرنامج.",
     "الـ hardware interrupts دي signals الـ devices بتبعتها للـ processor؛ إنما الـ interrupt اللي طالع من INT instruction ده software interrupt.",
     "مش \"None\": المحاضرة بتقول إن الـ interrupts اللي بتطلع من instructions مخصوصة (INT) اسمها software interrupts."
    ],
    [
     "صح. الـ interrupt بيكسر التسلسل العادي وبينقل التحكم للـ Interrupt Service Routine (ISR)، وبعدها الـ CPU بيرجع للبرنامج اللي اتقطع (L8, Interrupts).",
     "الـ counter word register مش هو المكان اللي الـ interrupt بيودّي التنفيذ ليه؛ التحكم بيتنقل لـ routine، اللي هو الـ Interrupt Service Routine.",
     "الـ execution unit ده الجزء من الـ CPU اللي بينفذ الـ instructions؛ مش مكان بنروحله. الـ interrupt بيحوّل التنفيذ للـ ISR.",
     "الـ control unit شغال طول الوقت بيرتب خطوات الـ instructions؛ الـ interrupt بينقل التحكم لبرنامج، اللي هو الـ Interrupt Service Routine."
    ],
    [
     "الـ CPU مش بيكمّل عادي على الـ instruction اللي بعدها: الأول بيحفظ حالته في الـ stack وبيـjump للـ ISR.",
     "الـ instructions مش متخزنة في registers؛ الـ CPU بيحط في الـ PC عنوان بداية الـ ISR وبينفذ الـ routine.",
     "صح. المحاضرة بتعرّف الـ interrupt إنه نقل التحكم لبرنامج priority بتاعه أعلى (الـ ISR)، وده بيكسر التسلسل العادي لتنفيذ الـ instructions (L8, Interrupts).",
     "البرنامج مش بيقف: بعد الـ return instruction بتاعة الـ ISR، الـ CPU بيرجع للنقطة اللي اتقطع عندها."
    ],
    [
     "الـ maskable interrupt ينفع يتمنع بـ interrupt mask bit، فهو عكس الـ request اللي مايتقفلش خالص.",
     "صح. الـ non-maskable interrupt (NMI) مايتعملوش mask ولا يتجاهل بأي طريقة؛ بيستخدم للأحداث المهمة جدًا زي الـ memory parity errors (L8, Interrupts).",
     "الـ interrupt مايبقاش الاتنين مع بعض: الـ maskable ينفع يتمنع، والـ request اللي عمره ما يتقفل ده الـ non-maskable بس.",
     "مش \"None\": الـ interrupt input اللي عمره ما يتقفل ده بالتعريف non-maskable interrupt (NMI)."
    ],
    [
     "الـ <bdi dir=\"ltr\">software/hardware</bdi> تقسيمة صح، بس واحدة بس؛ المحاضرة كمان بتقسم الـ interrupts لـ <bdi dir=\"ltr\">maskable/non‑maskable</bdi> و <bdi dir=\"ltr\">vectored/non‑vectored</bdi>.",
     "الـ <bdi dir=\"ltr\">maskable/non‑maskable</bdi> تقسيمة واحدة، بس فيه كمان <bdi dir=\"ltr\">software/hardware</bdi> و <bdi dir=\"ltr\">vectored/non‑vectored</bdi>، فالصح \"All\".",
     "الـ <bdi dir=\"ltr\">vectored/non‑vectored</bdi> تقسيمة واحدة، بس المحاضرة كمان بتدي <bdi dir=\"ltr\">software/hardware</bdi> و <bdi dir=\"ltr\">maskable/non‑maskable</bdi>.",
     "صح. المحاضرة بتقسم الـ interrupts بتلات طرق: software ضد hardware، و maskable ضد non-maskable، و vectored ضد non-vectored (L8, Interrupts)."
    ],
    [
     "الـ jump بينقل التحكم مرة واحدة لمكان تاني؛ إنك تكرر block عدد مرات معين والـ CX هو العداد، ده شغل الـ LOOP.",
     "صح. الـ LOOP بتكرر block عدد مرات معين: بتنقص CX وبترجع للـ label طول ما CX ≠ 0 (L8, LOOP).",
     "الـ shift instructions بتحرك الـ bits شمال أو يمين جوا الـ operand (SHL, SHR, SAR)؛ مش بتكرر instructions.",
     "الـ rotate instructions (ROL, ROR, RCL, RCR) بتلف الـ bits جوا الـ operand؛ مش بتكرر block من الكود."
    ],
    [
     "صح. الـ non-maskable interrupts (NMI) مايتعملهاش mask ولا block ولا تتجاهل؛ الـ priority بتاعتها مطلقة (L8, Interrupts).",
     "الجملة صح: ده تعريف المحاضرة بالظبط. اللي ينفع يتعملها block بـ mask bit هي الـ maskable interrupts."
    ],
    [
     "الـ Short والـ near jumps بيغيّروا IP بس. (فيه طالب علّم True على ورقة <bdi dir=\"ltr\">2024/25</bdi>.)",
     "صح. الـ short والـ near jumps بيفضلوا في نفس الـ code segment وبيغيروا IP بس؛ الـ far jump بس هو اللي بيحمّل CS و IP الاتنين (L8, Unconditional jumps)."
    ],
    [
     "الـ short والـ near jumps بيغيروا IP بس؛ الـ CS بيتغير في الـ far jump بس، فكلمة \"any JMP\" بتخلي الجملة غلط.",
     "صح. الـ far jump بس هو اللي بيغير CS و IP؛ الـ short والـ near بيفضلوا في نفس الـ segment وبيغيروا IP بس (L8, Unconditional jumps)."
    ],
    [
     "الـ far jump <b>خمسة</b> bytes: الـ opcode + offset من 2 byte + segment من 2 byte. الـ short بـ 2 bytes والـ near بـ 3.",
     "صح. الـ far jump خمسة bytes: الـ opcode، وبعده الـ offset (bytes 2 و 3) والـ segment (bytes 4 و 5) (L8, The three jump types)."
    ],
    [
     "الـ near jump فيها 3 bytes بس؛ الكلام ده وصف الـ far jump.",
     "صح. الـ near jump كله 3 bytes بس (opcode + displacement من 2 byte)؛ الـ bytes 4 و 5 اللي بتحدد الـ segment دي بتاعة الـ far jump (L8, The three jump types)."
    ],
    [
     "الـ jump نفسها هي اللي بتحمّل الـ IP الجديد لما تتنفذ.",
     "غالبًا دي الإجابة المقصودة: الـ IP بياخد قيمته الجديدة كنتيجة لتنفيذ الـ jump. (السؤال فيه شك: الـ CPU فعلًا بيزوّد IP بعد الـ instruction وقت الـ fetch.)"
    ],
    [
     "صح. الـ Interrupt Service Routine هو الـ routine اللي بيتنفذ لما يحصل interrupt (أو كذا interrupt) (L8, Interrupts).",
     "الجملة صح: المحاضرة بتعرّف الـ ISR إنه الـ routine اللي بيتنفذ لما يحصل interrupt أو كذا interrupt."
    ],
    [
     "الـ PC والحالة الحالية بيتحفظوا في الـ <b>STACK</b> مش الـ heap؛ وبعدين الـ RET بترجعهم من الـ stack.",
     "صح. الخطوة 1 بتحفظ محتوى الـ PC والحالة الحالية (الـ flags والـ registers) في الـ STACK، مش الـ heap (L8, Interrupts)."
    ],
    [
     "صح. الـ non-vectored interrupts الـ vector address بتاعها مش متحدد مسبقًا؛ إنما الـ vectored ليها vector address ثابت (L8, Interrupts).",
     "الجملة صح: ده تعريف المحاضرة. الـ vectored interrupts هي اللي ليها vector address ثابت ومتحدد مسبقًا."
    ],
    [
     "الـ LOOP بتستخدم CX أوتوماتيك كعداد (<bdi dir=\"ltr\">CX&nbsp;=&nbsp;CX&nbsp;−&nbsp;1</bdi>، وتعمل jump لو <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi>)؛ الـ AX والـ AL مالهمش دعوة بيها.",
     "صح. الـ LOOP معتمدة على CX: بتنقصه وبتعمل jump للـ label طول ما <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi>؛ الـ AX والـ AL مش داخلين في الموضوع (من <bdi dir=\"ltr\">L8, LOOP</bdi>)."
    ],
    [
     "الـ ENDS بتعلّم نهاية logical segment، مش البرنامج كله؛ البرنامج بيخلص بـ END.",
     "صح. الـ END بتعلّم نهاية الـ assembly program؛ الـ ENDS بتقفل segment والـ ENDP بتقفل procedure (L8, Procedures).",
     "الـ END بس هي اللي بتنهي البرنامج؛ الـ ENDS بتقفل logical segment، فإنك تقول الاتنين غلط.",
     "مش \"None\": الـ END directive هي اللي بتعلّم نهاية الـ assembly language program."
    ],
    [
     "صح. الـ ENDS (end segment) بتعلّم نهاية logical segment؛ الـ END بتنهي البرنامج كله (L8, Procedures).",
     "الـ END بتعلّم نهاية البرنامج كله، مش segment واحد؛ الـ segments بتتقفل بـ ENDS.",
     "الـ ENDS بس هي اللي بتقفل logical segment؛ الـ END بتنهي البرنامج، فـ \"ENDS & END\" غلط.",
     "مش \"None\": الـ ENDS directive هي اللي بتعلّم نهاية الـ logical segment."
    ],
    [
     "ده الـ short jump (displacement 1 byte).",
     "صح. في الـ near jump، الـ IP (من الـ bytes <bdi dir=\"ltr\">[CS+2][CS+1]</bdi>) بيبقى:<span class=\"ltr\">IP = 300 + 201C = 231C</span>فالعنوان:<span class=\"ltr\">20000 + 231C = 2231C</span>(من <bdi dir=\"ltr\">L8, Revision Q13</bdi>)",
     "الـ 2FA1C ده الـ FAR jump:<span class=\"ltr\">segment 2DA0 → 2DA00 + offset 201C</span>الـ near jump بيفضل في <bdi dir=\"ltr\">CS&nbsp;=&nbsp;2000</bdi>.",
     "الـ 2201C جاي من <bdi dir=\"ltr\">20000&nbsp;+&nbsp;201C</bdi>، يعني نسيت تجمع <bdi dir=\"ltr\">IP&nbsp;=&nbsp;300</bdi>. قانون الكورس:<span class=\"ltr\">IPnew = IP + displacement = 231C</span>"
    ],
    [
     "صح. في الـ far jump:<span class=\"ltr\">offset = bytes 2,3 = 201C</span><span class=\"ltr\">segment = bytes 4,5 = 2DA0</span><span class=\"ltr\">2DA00 + 201C = 2FA1C</span>(من <bdi dir=\"ltr\">L8, Revision Q13</bdi>)",
     "الـ 2DA00 ده الـ segment <bdi dir=\"ltr\">2DA0&nbsp;×&nbsp;10</bdi> بس؛ لازم تجمع عليه الـ offset 201C (الـ bytes 2 و 3):<span class=\"ltr\">2DA00 + 201C = 2FA1C</span>",
     "الـ A2D1C مش ماشية على القاعدة: الـ bytes بتتقري little-endian، فالـ segment من الـ bytes <bdi dir=\"ltr\">A0,&nbsp;2D</bdi> هو 2DA0 (مش A02D)، والـ offset من <bdi dir=\"ltr\">1C,&nbsp;20</bdi> هو 201C؛ فالنتيجة:<span class=\"ltr\">2DA00 + 201C = 2FA1C</span>",
     "الـ 2231C ده الـ NEAR jump <bdi dir=\"ltr\">(20000&nbsp;+&nbsp;300&nbsp;+&nbsp;201C)</bdi>. الـ far jump بياخد الـ segment بتاعه من الـ bytes 4 و 5."
    ]
   ],
   "extra": [
    [
     "صح. في الـ short jump:<span class=\"ltr\">IP = 0100 + 20 = 0120</span>والعنوان:<span class=\"ltr\">CS × 10 + IP = 40000 + 0120 = 40120</span>(من <bdi dir=\"ltr\">L8, The three jump types</bdi>)",
     "الـ 40100 ده <bdi dir=\"ltr\">CS:IP</bdi> قبل الـ jump بس <bdi dir=\"ltr\">(40000&nbsp;+&nbsp;0100)</bdi>؛ لازم تجمع الـ displacement 20 على IP.",
     "الـ 4120 ناسي يزحزح CS: الـ physical address بيستخدم <bdi dir=\"ltr\">CS&nbsp;×&nbsp;10&nbsp;=&nbsp;40000</bdi>، فالإجابة:<span class=\"ltr\">40000 + 0120 = 40120</span>",
     "الـ 42100 جامع الـ displacement على إنه 2000؛ الـ short jump الـ byte الواحد بتاعه 20 بيتجمع على IP كـ 20h:<span class=\"ltr\">0100 + 20 = 0120</span>"
    ],
    [
     "الـ bytes اتقرت بالترتيب الغلط (3412 بدل 1234).",
     "الـ 41234 ده <bdi dir=\"ltr\">40000&nbsp;+&nbsp;1234</bdi> ونسي IP: الـ IP الجديد:<span class=\"ltr\">0100 + 1234 = 1334</span>فالعنوان 41334.",
     "صح. الحساب:<span class=\"ltr\">IP = 100 + 1234 = 1334 → 40000 + 1334</span>",
     "الـ 41434 جامع IP مرتين (أو فيه غلطة في الـ carry):<span class=\"ltr\">IP = 0100 + 1234 = 1334</span>فالعنوان:<span class=\"ltr\">40000 + 1334 = 41334</span>"
    ],
    [
     "الـ 06050 ملخبط الـ bytes. الـ offset هو الـ bytes <bdi dir=\"ltr\">2,3</bdi> والـ high byte بيتقري الآخر <bdi dir=\"ltr\">(05&nbsp;00&nbsp;→&nbsp;0500)</bdi>، والـ segment هو الـ bytes <bdi dir=\"ltr\">4,5</bdi> <bdi dir=\"ltr\">(60&nbsp;00&nbsp;→&nbsp;6000)</bdi>.",
     "صح. الحساب:<span class=\"ltr\">Offset = 0500, segment = 6000 → 60000 + 0500</span>",
     "الـ 00560 قاري الـ bytes بنفس ترتيب ظهورها. كل زوج بيتقري والـ high byte الآخر:<span class=\"ltr\">offset 0500, segment 6000 → 60500</span>",
     "الـ 65000 واخد الـ offset على إنه 5000. الـ bytes <bdi dir=\"ltr\">00,&nbsp;05</bdi> لما تقراهم والـ high byte الآخر بيدّوا 0500، فالنتيجة:<span class=\"ltr\">60000 + 0500 = 60500</span>"
    ],
    [
     "الـ +32K لـ −32K ده مدى الـ NEAR jump بالـ displacement اللي 2 byte؛ الـ short jump عنده byte واحد بس.",
     "إنك توصل لأي مكان في الـ real memory ده الـ FAR jump، اللي بيحمّل CS و IP جداد.",
     "الـ displacement اللي 1 byte ده signed، فينفع يرجع لورا: المدى +127 لـ <bdi dir=\"ltr\">−128</bdi>، مش 0 لـ +255.",
     "صح. الـ short jump ليه displacement signed من 1 byte، فبيوصل من +127 لـ <bdi dir=\"ltr\">−128</bdi> bytes من IP (L8, The three jump types)."
    ],
    [
     "صح. الـ LOOP بتنقص CX وبتكرر طول ما <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi>، فالـ body بيتنفذ 5 مرات:<span class=\"ltr\">AX = 5 × 2 = 10</span>(من <bdi dir=\"ltr\">L8, LOOP</bdi>)",
     "الـ LOOP بتكرر طول ما CX ≠ 0 بعد ما يقل: يعني 5 لفات.",
     "الـ 12 محتاجة 6 لفات؛ مع <bdi dir=\"ltr\">CX&nbsp;=&nbsp;5</bdi> الـ LOOP بتنفذ الـ body 5 مرات بالظبط:<span class=\"ltr\">CX 5→4→3→2→1→0</span>فـ <bdi dir=\"ltr\">AX&nbsp;=&nbsp;10</bdi>.",
     "الـ 2 دي لفة واحدة بس؛ الـ LOOP بترجع لـ L طول ما CX ≠ 0، فـ ADD AX, 2 بتتنفذ 5 مرات."
    ],
    [
     "الـ 4 دي أول لفة بس <bdi dir=\"ltr\">(AX&nbsp;=&nbsp;0&nbsp;+&nbsp;4)</bdi>؛ الـ LOOP بتكرر طول ما <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi> وبتجمع 3 و 2 و 1 كمان.",
     "الـ 16 فاكر إن CX فاضل 4 كل مرة <bdi dir=\"ltr\">(4&nbsp;×&nbsp;4)</bdi>؛ الـ LOOP بتنقص CX، فالقيم اللي بتتجمع 4 و 3 و 2 و 1.",
     "صح. الـ CX بيتجمع قبل كل إنقاص:<span class=\"ltr\">4 + 3 + 2 + 1 = 10</span>ولما CX يوصل 0 الـ loop بتخلص (من <bdi dir=\"ltr\">L8, LOOP</bdi>).",
     "الـ 6 اللي هي <bdi dir=\"ltr\">3&nbsp;+&nbsp;2&nbsp;+&nbsp;1</bdi> ناقصة أول لفة: الـ <bdi dir=\"ltr\">CX&nbsp;=&nbsp;4</bdi> بيتجمع قبل ما الـ LOOP تنقصه لأول مرة."
    ],
    [
     "إنك تعمل push لكل الـ general registers ده شغل PUSHA؛ الـ CALL بتعمل push للـ return address بس (الـ offset بتاع الـ instruction اللي بعدها).",
     "الـ flags بيتعملهم push بـ PUSHF أو بالـ interrupt، مش بالـ CALL؛ الـ CALL بتعمل push للـ return address بس.",
     "عنوان الـ procedure بيتنسخ في (E)IP، مش بيتعمله push؛ اللي بيتحط في الـ stack هو الـ return address.",
     "صح. الـ CALL بتعمل push للـ offset بتاع الـ instruction اللي بعدها (الـ return address) وبتنسخ عنوان الـ procedure في (E)IP؛ والـ RET بترجّعه بـ pop (L8, Procedures)."
    ],
    [
     "صح. الـ non-maskable interrupt (NMI) مايتعملوش mask ولا يتجاهل، وبيستخدم للأعطال المهمة زي الـ memory parity أو الـ bus errors (L8, Interrupts).",
     "الـ maskable interrupt ينفع يتمنع بـ mask bit، فمش مناسب للأعطال الخطيرة زي الـ memory parity errors.",
     "الـ software interrupt بيشتغل بـ INT instruction في البرنامج، مش بعطل في الـ hardware زي الـ parity error.",
     "الـ <bdi dir=\"ltr\">vectored/non‑vectored</bdi> تقسيمة على حسب هل عنوان الـ ISR ثابت ولا لأ؛ مالهاش علاقة بالـ masking. اللي مايتعملوش mask هو الـ NMI."
    ],
    [
     "لو CX بقى 0 بعد الإنقاص، كل أنواع الـ LOOP بتقف؛ الـ LOOPE بتعمل jump بس طول ما <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi> و <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi>.",
     "صح. الـ <bdi dir=\"ltr\">LOOPE/LOOPZ</bdi> بتنقص CX وبتعمل jump لو <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi> و <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi> مع بعض (من <bdi dir=\"ltr\">L8, LOOP</bdi>).",
     "الشرط <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi> و <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;0</bdi> ده شرط الـ <bdi dir=\"ltr\">LOOPNE/LOOPNZ</bdi>، النوع العكسي.",
     "الـ ZF لوحده مش كفاية: الـ LOOPE كمان بتنقص CX وبتقف لما يوصل 0، فمحتاجة <bdi dir=\"ltr\">CX&nbsp;≠&nbsp;0</bdi> و <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi>."
    ],
    [
     "تحميل الـ PC بعنوان بداية الـ ISR ده الخطوة 2؛ لازم الأول تحفظ الـ PC والحالة، وإلا نقطة الرجوع هتضيع.",
     "الـ return instruction دي الخطوة 3، في آخر الـ ISR؛ مستحيل تبقى أول خطوة.",
     "صح. أول خطوة في الـ interrupt handling إنك تحفظ محتوى الـ PC والحالة الحالية (الـ flags والـ registers) في الـ stack، عشان البرنامج يقدر يكمّل بعدين (L8, Interrupts).",
     "مسح الـ registers هيبوّظ بيانات البرنامج اللي اتقطع؛ الحالة بتتحفظ في الـ stack، مش بتتمسح."
    ]
   ]
  },
  "9": {
   "notes": [
    {
     "h": "الـ Arithmetic instructions (Labs 3 و 4)",
     "figH": {
      "mp-l9-arith": "الـ arithmetic instructions على الـ AL والـ BL، والنتيجة والـ CF والـ ZF"
     }
    },
    {
     "h": "قواعد الـ MUL والـ DIV",
     "pts": [
      "<b>لازم تستخدم AX</b> في الضرب والقسمة: الـ MUL والـ DIV بياخدوا operand واحد بس (register أو memory، عمره ما يبقى immediate)؛ والـ operand التاني دايمًا هو AX.",
      "يعني كود زي ده غلط:<pre>MOV CX,5\nMUL 3</pre>لازم:<pre>MOV AX, 5\nMOV BX, 3\nMUL BX</pre>والنتيجة:<span class=\"ltr\">AX = 15</span>",
      "المثال الأول:<pre>MOV AX, 5\nMOV CX, 2\nDIV CX</pre>النتيجة:<span class=\"ltr\">AX = 2, DX = 1</span>والمثال التاني:<pre>MOV AX, 10\nMOV BX, 2\nDIV BX</pre>النتيجة:<span class=\"ltr\">AX = 5, DX = 0</span>(الـ lab بيشرح القسمة كطرح متكرر: <bdi dir=\"ltr\">10-2-2-2-2-2&nbsp;=&nbsp;0</bdi> في 5 خطوات).",
      "قبل الـ DIV بـ word، الـ DX لازم يبقى فيه الجزء العالي من المقسوم (عادةً 0).",
      "الضرب مقابل الجمع (trade-off): الـ <bdi dir=\"ltr\">C&nbsp;=&nbsp;5x&nbsp;+&nbsp;7</bdi> بالـ MUL بتستخدم 2 registers و 5 instructions؛ وبالـ ADD المتكرر بتستخدم register واحد و 7 instructions. والـ <bdi dir=\"ltr\">C&nbsp;=&nbsp;(3x&nbsp;+&nbsp;4y)&nbsp;-&nbsp;14</bdi>: نسخة الـ MUL فيها 3 registers و 10 instructions؛ ونسخة الـ ADD فيها register واحد و 9 instructions. يعني مش كل مرة الـ MUL أحسن."
     ],
     "figH": {
      "mp-l9-muldiv": "الـ MUL والـ DIV من خلال الـ AX والـ DX، وليه الـ <bdi dir=\"ltr\">MUL&nbsp;3</bdi> غلط",
      "mp-l9-mul-vs-add": "نفس المعادلة بالـ MUL وبالـ ADD المتكرر، وعدد الـ registers والـ instructions"
     }
    },
    {
     "h": "برامج المعادلات في الـ Lab",
     "figH": {
      "mp-l9-formulas": "شغّل برامج المعادلات بتاعة الـ lab سطر سطر بقيمك"
     }
    },
    {
     "h": "الـ Logical instructions (Labs 4 و 5)",
     "figH": {
      "mp-l9-logic": "الـ AND والـ OR والـ XOR والـ TEST bit ورا bit على الـ truth table"
     }
    },
    {
     "h": "الـ NOT والـ NEG والـ TEST",
     "pts": [
      "الـ <b>NOT</b> بتقلب الـ 1 لـ 0 والـ 0 لـ 1 (<bdi dir=\"ltr\">1's&nbsp;complement</bdi>)، مثال:<pre>MOV AL, 5\nNOT AL</pre>النتيجة:<span class=\"ltr\">00000101 → <b>11111010</b> (FAh)</span>",
      "الـ <b>NEG</b> بتجيب الـ <b><bdi dir=\"ltr\">2's&nbsp;complement</bdi></b>: تقلب الـ bits وبعدين تزوّد 1:<pre>MOV AL, 5\nNEG AL</pre>النتيجة:<span class=\"ltr\">11111011 (FBh = -5)</span>",
      "الـ <b>TEST</b> ليها نفس الـ truth table بتاعة الـ AND بس <b>بتأثر على الـ flags بس (ZF)</b>؛ النتيجة مابتتخزنش. لو النتيجة بـ 0 يبقى <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi>؛ ولو النتيجة مش 0 يبقى <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;0</bdi>. مثال:<pre>MOV AX,1\nMOV BX,0\nTEST AX,BX</pre>النتيجة <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi>، والـ AX مابيتغيرش.",
      "الأرقام الـ binary لازم تخلص بـ <b>b</b>:<pre>MOV AX, 1001b</pre>والـ hex بيخلص بـ h؛ ولو رقم الـ hex بيبدأ بحرف لازم تحط 0 قبله (0FFh)."
     ],
     "figH": {
      "mp-l9-not-neg-test": "الـ NOT والـ NEG على الـ 5، والـ TEST اللي بتغيّر الـ ZF من غير ما تخزن:<span class=\"ltr\">NOT 5 = FAh, NEG 5 = FBh</span>",
      "mp-l9-suffix": "الـ assembler بيقرا الأرقام دي إزاي:<span class=\"ltr\">1001b, 1001, 0FFh, FFh</span>"
     }
    },
    {
     "h": "الـ Variables (الـ define directives)",
     "figH": {
      "mp-l9-defines": "الـ DB والـ DW والـ DD والـ DQ والـ DT مترسومين بعدد الـ bytes اللي بيحجزوها"
     }
    },
    {
     "h": "الـ Shift instructions",
     "pts": [
      "الـ Shifting بيحرّك الـ bits شمال أو يمين جوه الـ operand. الـ Syntax:<pre>SHL destination, count</pre>الـ destination يا register يا memory؛ والـ count يا immediate يا <b>CL</b>. الـ Shifts والـ rotates بيأثروا على الـ Carry (والـ Overflow) flags.",
      "الـ <b>Logical shift</b> بيملا الخانة الجديدة بـ <b>0</b>. الـ <b>Arithmetic shift</b> بيملاها بنسخة من الـ <b>sign bit</b>.",
      "الـ <b>SHL</b> (هي نفسها <b>SAL</b>) بتعمل shift لليسار، أقل bit بيتملا بـ 0، وأعلى bit بيروح الـ CF. الـ shift لليسار n bits معناه ضرب في <bdi dir=\"ltr\">2ⁿ</bdi>، مثال:<pre>MOV DL,5\nSHL DL,1   ; → 10\nSHL DL,2   ; → 20</pre>",
      "الـ <b>SHR</b> بتعمل shift لليمين، أعلى bit بيتملا بـ 0، وأقل bit بيروح الـ CF. بيقسم الرقم الـ unsigned على <bdi dir=\"ltr\">2ⁿ</bdi>، مثال:<span class=\"ltr\">DL = 80 (01010000b) → SHR 1 = 40 → SHR 2 = 10</span>",
      "الـ <b>SAR</b> بتعمل shift لليمين مع الحفاظ على الإشارة:<span class=\"ltr\">DL = -80 (10110000b) → SAR 1 = 11011000b = -40 → SAR 2 = 11110110b = -10</span>والـ <bdi dir=\"ltr\">CF&nbsp;=&nbsp;0</bdi>.",
      "عشان تعمل sign-extend لـ AL في AX:<pre>MOV AL,80h\nSHL AX,8   ; AX = 8000h\nSAR AX,8   ; AX = FF80h</pre>"
     ],
     "figH": {
      "mp-l9-shift": "الـ SHL والـ SHR والـ SAR bit ورا bit مع الـ CF على أمثلة الشرح",
      "mp-l9-sign-extend": "الـ sign-extend للـ AL في الـ AX، والنتيجة:<span class=\"ltr\">SHL AX,8 / SAR AX,8 → AX = FF80h</span>"
     }
    },
    {
     "h": "الـ Rotate instructions",
     "pts": [
      "الـ <b>ROL</b>: كل bit بيتحرك شمال؛ وأعلى bit بيروح <b>الـ CF وكمان bit 0</b>. مفيش bits بتضيع. مثال:<span class=\"ltr\">AL=11110000b, ROL AL,1 → 11100001b, CF = 1</span>",
      "الـ <b>ROR</b>: كل bit بيتحرك يمين؛ وأقل bit بيروح <b>الـ CF وكمان أعلى bit</b>. مثال:<span class=\"ltr\">AL=11110000b, ROR AL,1 → 01111000b, CF = 0</span>",
      "تبديل النص العالي (bits <bdi dir=\"ltr\">4-7</bdi>) بالنص الواطي (bits <bdi dir=\"ltr\">0-3</bdi>) في الـ byte:<span class=\"ltr\">DL=3Fh, ROL DL,4 → F3h, CF = 1</span>(أو <bdi dir=\"ltr\">ROR&nbsp;DL,4</bdi>).",
      "الـ <b>RCL</b> بتعمل shift شمال، <b>الـ CF بيدخل الـ LSB</b>، والـ MSB بيروح الـ CF. مثال:<pre>CLC\nMOV BL,88h\nRCL BL,1   ; BL = 00010000b\n           ; CF = 1</pre>ولو عملت <bdi dir=\"ltr\">RCL&nbsp;BL,1</bdi> تاني:<span class=\"ltr\">BL = 00100001b, CF = 0</span>",
      "الـ <b>RCR</b> بتعمل shift يمين، الـ CF بيدخل الـ MSB، والـ LSB بيروح الـ CF. مثال:<pre>STC\nMOV AH,10h\nRCR AH,1   ; AH = 10001000b\n           ; CF = 0</pre>",
      "الـ <b>CLC</b> بتصفّر الـ CF؛ والـ <b>STC</b> بتخليه 1. والـ ROL والـ ROR والـ RCL والـ RCR مش arithmetic instructions."
     ],
     "figH": {
      "mp-l9-rotate": "الـ ROL والـ ROR bit ورا bit، مفيش bits بتضيع، وتبديل النصين في الـ byte:<span class=\"ltr\">3Fh → F3h</span>",
      "mp-l9-rotate-carry": "الـ RCL والـ RCR من خلال الـ carry، بعد الـ CLC أو الـ STC"
     }
    }
   ],
   "cards": [
    "جمع بالـ carry:<span class=\"ltr\">dest + src + CF</span>",
    "طرح بالـ borrow:<span class=\"ltr\">dest - src - CF</span>(الـ CF هو الـ borrow flag).",
    "الـ operand واحد <bdi dir=\"ltr\">register/memory</bdi>؛ والـ AX هو الـ operand الضمني وفيه النتيجة.",
    "الـ AX فيه خارج القسمة (quotient)، والـ DX فيه الباقي (remainder).",
    "النتيجة:<span class=\"ltr\">AX = 2, DX = 1</span>",
    "النتيجة <bdi dir=\"ltr\">11111010&nbsp;(FAh)</bdi>.",
    "النتيجة:<span class=\"ltr\">11111011 = FBh = -5</span>(ده الـ <bdi dir=\"ltr\">2's&nbsp;complement</bdi>).",
    "زي الـ AND بس بتغيّر الـ flags بس؛ لو النتيجة 0 يبقى <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi>.",
    "بيحجزوا:<span class=\"ltr\">1 / 2 / 4 / 8 / 10 bytes</span>",
    "الـ Logical بيملا بـ 0؛ والـ arithmetic بيملا بالـ sign bit.",
    "ضرب في 2ⁿ.",
    "قسمة unsigned على 2ⁿ.",
    "هي هي الـ SHL.",
    "الـ MSB بيروح للـ CF وللـ LSB؛ مفيش bits بتضيع.",
    "الـ CF بيدخل الـ LSB، والـ MSB بيروح الـ CF.",
    "النتيجة:<span class=\"ltr\">DL = F3h, CF = 1</span>(بيبدّل الـ nibbles).",
    "تصفير أو set للـ carry flag.",
    "الـ immediate value أو CL."
   ],
   "qa": [
    "<pre>; using MUL          ; using ADD\nMOV AX, 3            MOV AX, x\nMOV BX, x            ADD AX, x\nMUL BX               ADD AX, x\nMOV BX, AX           ADD AX, y\nMOV CX, 4            ADD AX, y\nMOV AX, y            ADD AX, y\nMUL CX               ADD AX, y\nADD BX, AX           SUB AX, 14\nSUB BX, 14           MOV C, AX\nMOV C, BX</pre>نسخة الـ MUL بتستخدم 3 registers و 10 instructions؛ ونسخة الـ ADD بتستخدم register واحد و 9 instructions. الاتنين صح؛ ومش كل مرة الضرب يبقى أحسن، الموضوع trade-off.",
    "الـ Logical shift بيملا الخانة الجديدة بـ 0؛ أما الـ arithmetic shift فبيملاها بنسخة من الـ sign bit، فالإشارة بتفضل زي ما هي. الـ SHR على 80 (01010000b) بـ 1 بيدّي 40؛ والـ SAR على <bdi dir=\"ltr\">-80</bdi> (10110000b) بـ 1 بيدّي <bdi dir=\"ltr\">11011000b&nbsp;=&nbsp;-40</bdi>، وبـ 2 كمان بيدّي <bdi dir=\"ltr\">11110110b&nbsp;=&nbsp;-10</bdi>.",
    "الـ ROL: الـ bits بتتحرك شمال، والـ MSB بيروح الـ CF والـ LSB. الـ ROR: الـ bits بتتحرك يمين، والـ LSB بيروح الـ CF والـ MSB. الـ RCL: الـ bits بتتحرك شمال من خلال الـ carry: الـ CF بيدخل الـ LSB والـ MSB بيدخل الـ CF. الـ RCR: الـ bits بتتحرك يمين من خلال الـ carry: الـ CF بيدخل الـ MSB والـ LSB بيدخل الـ CF. ومفيش bits بتضيع في أي rotate.",
    "الاتنين بيستخدموا AX ضمنيًا. الـ <bdi dir=\"ltr\">MUL&nbsp;src</bdi> بتحسب <bdi dir=\"ltr\">AX&nbsp;×&nbsp;src</bdi>، والنتيجة في AX (أو <bdi dir=\"ltr\">DX:AX</bdi> لو الـ operands <bdi dir=\"ltr\">16‑bit</bdi>). الـ <bdi dir=\"ltr\">DIV&nbsp;src</bdi> بتقسم الـ AX (والـ DX كـ high word) على src: الـ AX بياخد خارج القسمة الصحيح، والـ DX بياخد الباقي. والـ operand لازم يبقى register أو memory، فالبرنامج لازم يحمّل AX الأول.",
    "الـ NOT بتقلب كل bit (<bdi dir=\"ltr\">1's&nbsp;complement</bdi>)، يعني:<span class=\"ltr\">5 = 00000101 → 11111010</span>أما الـ NEG فبتجيب الـ <bdi dir=\"ltr\">2's&nbsp;complement</bdi> (تقلب وبعدين تزوّد 1)، يعني سالب الرقم:<span class=\"ltr\">5 → 11111011 = -5</span>"
   ],
   "quiz": [
    [
     "الـ MOV هي أساس الـ data transfer: بتنسخ الـ source في الـ destination، يبقى هي <bdi dir=\"ltr\">copy/transfer</bdi> instruction.",
     "الـ PUSH برضه data transfer: بتنسخ register أو word من الـ memory على الـ top بتاع الـ stack.",
     "صح. الـ DAS (decimal adjust after subtraction) دي arithmetic.",
     "الـ POP برضه data transfer: بتنسخ الـ word اللي على الـ top بتاع الـ stack في register أو memory."
    ],
    [
     "صح. MOV AX, val2 وبعدها NEG AX بيدوك −val2، وADD AX, BX بتخليها −val2 + BX، وSUB AX, val4 بتطرح الـ val4 (L9, Lab formula programs).",
     "دي بتحمّل val3 بدل val2، فبتحسب (−val3 + BX) − val4، ودي مش المعادلة المطلوبة.",
     "آخر خطوة هنا ADD للـ val4، فالناتج (−val2 + BX) + val4؛ والمعادلة محتاجة SUB AX, val4.",
     "الـ \"add ax\" من غير source مش instruction صحيحة أصلًا، وكمان من غير <bdi dir=\"ltr\">NEG&nbsp;AX</bdi> الـ val2 عمرها ما هتتعكس إشارتها."
    ],
    [
     "الـ INC بتزود 1 على الـ operand بتاعها (dest + 1)، يبقى دي arithmetic instruction.",
     "الـ CMP arithmetic: بتحسب a − b بس عشان تظبط الـ flags، من غير ما تخزن النتيجة.",
     "الـ DEC بتطرح 1 من الـ operand بتاعها (dest − 1)، يبقى دي arithmetic instruction.",
     "صح. الـ ROL دي rotate instruction: بتحرك الـ bits لليسار والـ MSB بيروح للـ CF وللـ bit 0؛ والـ lab notes بتقول إن الـ rotates مش arithmetic (L9, Rotate instructions)."
    ],
    [
     "الـ variable (اللي بتعرّفه بـ DB أو DW أو …) هو اسم لـ memory location، فينفع يبقى operand، زي:<pre>MOV AX, val2</pre>",
     "صح. الـ operands هي registers أو memory locations (variables) أو immediates؛ إنما الـ assembler ده البرنامج اللي بيترجم الكود، مش جزء من الـ instruction (L1, Assembly language and the assembler).",
     "الـ registers زي AX أو BX هي أشهر operands أصلًا، زي ADD AX, BX.",
     "الـ memory location operand عادي جدًا، زي MOV AX, [BX] أو ADD AX, val4."
    ],
    [
     "صح. الـ <bdi dir=\"ltr\">INC&nbsp;dest</bdi> بتزود 1 بالظبط على الـ destination <bdi dir=\"ltr\">(dest&nbsp;=&nbsp;dest&nbsp;+&nbsp;1)</bdi> <bdi dir=\"ltr\">(L9, Arithmetic instructions)</bdi>.",
     "الـ INC دايمًا بتزود 1 مهما كان حجم الـ operand؛ لو عايز تزود 2 محتاج ADD dest, 2 (أو INC مرتين).",
     "الـ INC بتزود 1 مش 8؛ الـ 8 دي عدد الـ bits في الـ byte وملهاش علاقة بالزيادة.",
     "الـ INC بتزود 1؛ والـ 1024 ملهاش أي علاقة (دي كانت هتحتاج ADD dest, 1024)."
    ],
    [
     "الـ ADD بتحسب dest + src وبتتجاهل الـ CF الجاي؛ عشان تجمع الـ carry من جمع قبلها محتاج ADC.",
     "صح. الـ ADC بتحسب dest + src + CF، فهي اللي بتدعم الجمع لما يكون فيه carry (L9, Arithmetic instructions).",
     "الـ ADC بس هي اللي بتجمع الـ carry flag (dest + src + CF)؛ الـ ADD العادية بتتجاهله.",
     "مش \"None\": الـ ADC (add with carry) هي بالظبط الـ instruction بتاعة الجمع مع الـ carry."
    ],
    [
     "الـ DEC بتطرح 1 بس من الـ operand؛ مابتستخدمش borrow من طرح قبلها.",
     "الـ SUB بتحسب dest − src من غير الـ borrow؛ الطرح مع الـ borrow (− CF) ده الـ SBB.",
     "صح. الـ SBB بتحسب dest − src − CF، يعني طرح with borrow (L9, Arithmetic instructions).",
     "مش \"None\": الـ SBB (subtract with borrow) بتعمل كده بالظبط."
    ],
    [
     "الـ direction flag بيتحكم في إن الـ string instructions تزوّد ولا تنقّص الـ <bdi dir=\"ltr\">SI/DI</bdi>؛ ملوش دعوة بالـ borrow.",
     "صح. الـ SBB بتحسب dest − src − CF: يعني الـ carry flag هو اللي بيشتغل كـ borrow flag (L9, Arithmetic instructions).",
     "الـ parity flag بيقولك النتيجة فيها عدد زوجي من الـ 1 bits ولا لأ؛ مش بيستخدم كـ borrow.",
     "الـ trap flag بيشغّل الـ single-step mode للـ debugging؛ إنما الـ SBB بتستخدم الـ carry flag كـ borrow."
    ],
    [
     "صح. الـ SBB بتحسب:<span class=\"ltr\">dest − src − CF</span>فالـ carry flag CF هو الـ borrow flag <bdi dir=\"ltr\">(L9, Arithmetic instructions)</bdi>.",
     "الجملة صح: في الـ SBB الـ carry flag هو اللي بيشتغل كـ borrow flag (dest − src − CF)."
    ],
    [
     "صح. الـ NOT هي الـ <bdi dir=\"ltr\">1's&nbsp;complement</bdi>: كل bit بيتقلب:<span class=\"ltr\">00000101 → 11111010 = FAh</span>(من <bdi dir=\"ltr\">L9, NOT, NEG, TEST</bdi>)",
     "الـ FBh ده ناتج <bdi dir=\"ltr\">NEG&nbsp;AL</bdi> (الـ <bdi dir=\"ltr\">2's&nbsp;complement</bdi>: اقلب وزوّد 1 فيطلع <bdi dir=\"ltr\">−5</bdi>)؛ إنما الـ NOT بتقلب بس، فالناتج FAh.",
     "00000101 ده الـ AL زي ما هو من غير تغيير؛ الـ NOT بتقلب كل bit فيبقى 11111010.",
     "10000101 دي قالبة الـ sign bit بس؛ الـ NOT بتقلب الـ 8 bits كلهم: 11111010."
    ],
    [
     "صح. الـ <bdi dir=\"ltr\">DIV&nbsp;CX</bdi> بتقسم <bdi dir=\"ltr\">DX:AX&nbsp;=&nbsp;5</bdi> على 2: خارج القسمة 2 بيروح AX، والباقي 1 بيروح DX <bdi dir=\"ltr\">(L9, MUL and DIV rules)</bdi>.",
     "هنا خارج القسمة والباقي معكوسين: <bdi dir=\"ltr\">5&nbsp;÷&nbsp;2&nbsp;=&nbsp;2</bdi> والباقي 1، والـ DIV بتحط خارج القسمة في AX والباقي في DX.",
     "الـ DIV دي integer division: الـ registers بتشيل أرقام صحيحة بس، فـ 5 ÷ 2 بيدي خارج قسمة 2 في AX وباقي 1 في DX.",
     "الـ DIV CX مابتغيرش الـ CX، بس بتكتب فوق الـ AX خارج القسمة (2) وفوق الـ DX الباقي (1)."
    ],
    [
     "صح. الـ ROL بتزق كل الـ bits لليسار؛ والـ MSB القديم (1) بيروح للـ CF وللـ bit 0 مع بعض:<span class=\"ltr\">11110000 → 11100001, CF = 1</span>(من <bdi dir=\"ltr\">L9, Rotate instructions</bdi>)",
     "11100000 ده الـ SHL: الـ bit 0 بيتملا بـ 0 والـ MSB بيضيع في الـ CF. إنما الـ ROL بتنسخ الـ MSB في الـ bit 0 كمان.",
     "الناتج 01111000 و <bdi dir=\"ltr\">CF&nbsp;=&nbsp;0</bdi> ده الـ ROR (أقل bit بيروح للـ CF وللـ MSB). والـ ROL بتلف لليسار.",
     "قيمة الـ AL صح، بس الـ CF بياخد الـ MSB القديم وهو 1، يبقى <bdi dir=\"ltr\">CF&nbsp;=&nbsp;1</bdi>."
    ],
    [
     "صح. الـ ROL بـ 4 بتبدّل الـ nibbles الاتنين:<span class=\"ltr\">0011 1111 → 1111 0011 = F3h</span>والـ CF هو آخر bit اتلف، وهو 1 <bdi dir=\"ltr\">(L9, Rotate instructions)</bdi>.",
     "الـ F0h ده SHL DL, 4: الـ low nibble بيتملا أصفار والـ 3 بيضيع. إنما الـ ROL بترجّع الـ bits دي في الطرف التحتاني.",
     "الـ 03h ده SHR DL, 4: الـ low nibble (F) بيطلع برة ويضيع. الـ rotate بيحافظ على كل الـ bits.",
     "الـ rotate بـ 4 بيغيّر القيمة الـ <bdi dir=\"ltr\">8‑bit</bdi> إلا لو النصين زي بعض."
    ]
   ],
   "extra": [
    [
     "صح. الخطوات:<span class=\"ltr\">10110100 → 01011010 (CF 0) → 00101101 (CF 0)</span>",
     "الـ EDh (11101101) ده SAR بـ 2، اللي بينسخ الـ sign bit (1) فوق. إنما الـ SHR بيملا بأصفار، فالناتج <bdi dir=\"ltr\">00101101&nbsp;=&nbsp;2Dh</bdi>.",
     "الـ AL صح، بس الـ bitين اللي طلعوا (bits 0 و 1 من 10110100) الاتنين 0، يبقى <bdi dir=\"ltr\">CF&nbsp;=&nbsp;0</bdi>.",
     "الـ D2h (11010010) ده <bdi dir=\"ltr\">ROL&nbsp;AL,&nbsp;2</bdi>، يعني rotate لليسار؛ إنما الـ SHR بتحرك الـ bits لليمين وبتملا بـ 0، فالناتج 2Dh."
    ],
    [
     "الـ 4Bh (01001011) ده الـ SHR، اللي بيملا الـ MSB بـ 0. الـ SAR بينسخ الـ sign bit (1)، فالناتج <bdi dir=\"ltr\">11001011&nbsp;=&nbsp;CBh</bdi>.",
     "الـ 2Ch ده shift لليسار (<bdi dir=\"ltr\">96h&nbsp;×&nbsp;2&nbsp;=&nbsp;12Ch</bdi>، واتاخد 8 bits بس). الـ SAR بيزق لليمين وبيحافظ على الإشارة.",
     "صح. الخطوة:<span class=\"ltr\">10010110 → 11001011</span>والـ sign bit اتنسخ.",
     "الـ SAR AL, 1 دايمًا بيحرك كل bit خانة لليمين، فالـ 96h مستحيل تفضل زي ما هي؛ بتبقى CBh."
    ],
    [
     "الـ 02h ده الـ SHL: الـ MSB بيضيع في الـ CF والـ bit 0 بياخد 0. إنما الـ ROL بتنسخ الـ MSB في الـ bit 0 كمان: 03h.",
     "صح. الخطوة:<span class=\"ltr\">10000001 → 00000011</span>الـ MSB بيروح الـ CF والـ bit 0.",
     "الـ C0h (11000000) ده الـ ROR، اللي فيه الـ LSB (1) بيطلع فوق. الـ ROL بتنقل الـ MSB للـ bit 0، فالناتج 03h.",
     "الـ <bdi dir=\"ltr\">BL&nbsp;=&nbsp;03h</bdi> صح، بس الـ CF بياخد الـ MSB القديم بتاع 81h وهو 1، يبقى <bdi dir=\"ltr\">CF&nbsp;=&nbsp;1</bdi>."
    ],
    [
     "الـ RCR بتحط الـ CF القديم (1، من الـ STC) في الـ MSB، فالـ AH بتبقى <bdi dir=\"ltr\">10000000&nbsp;=&nbsp;80h</bdi> مش 00h.",
     "الـ <bdi dir=\"ltr\">AH&nbsp;=&nbsp;80h</bdi> صح، بس الـ LSB القديم بتاع 01h هو 1 وبيروح للـ CF، يبقى <bdi dir=\"ltr\">CF&nbsp;=&nbsp;1</bdi>.",
     "دي ناسية الـ STC: الـ <bdi dir=\"ltr\">CF&nbsp;=&nbsp;1</bdi> بيدخل الـ MSB <bdi dir=\"ltr\">(AH&nbsp;=&nbsp;80h)</bdi>، والـ LSB القديم (1) بيروح للـ CF.",
     "صح. في الـ RCR: الـ CF القديم (1، من الـ STC) بيدخل الـ MSB، والـ LSB القديم (1) بيروح للـ CF:<span class=\"ltr\">00000001 → 10000000 = 80h, CF = 1</span>(من <bdi dir=\"ltr\">L9, Rotate instructions</bdi>)"
    ],
    [
     "صح. الـ <bdi dir=\"ltr\">255&nbsp;+&nbsp;1&nbsp;=&nbsp;256</bdi> مش هتدخل في 8 bits.",
     "الـ AL حجمه 8 bits بس، فمايقدرش يشيل 100h؛ الـ bit التاسعة بتروح للـ CF <bdi dir=\"ltr\">(=&nbsp;1)</bdi> والـ <bdi dir=\"ltr\">AL&nbsp;=&nbsp;00h</bdi>، يبقى <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi>.",
     "الـ <bdi dir=\"ltr\">AL&nbsp;=&nbsp;00h</bdi> والـ <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi> صح، بس <bdi dir=\"ltr\">255&nbsp;+&nbsp;1</bdi> بيطلع منها carry من bit 7، يبقى <bdi dir=\"ltr\">CF&nbsp;=&nbsp;1</bdi>.",
     "الـ ADD بتكتب نتيجتها في الـ AL: الـ <bdi dir=\"ltr\">FFh&nbsp;+&nbsp;1</bdi> بتلف لـ 00h، فالـ AL مش FFh والـ <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi>."
    ],
    [
     "مفيش unsigned carry: الـ <bdi dir=\"ltr\">127&nbsp;+&nbsp;1&nbsp;=&nbsp;128</bdi> بتدخل في 8 bits.",
     "الـ <bdi dir=\"ltr\">7Fh&nbsp;+&nbsp;1&nbsp;=&nbsp;80h</bdi>، ودي مش صفر <bdi dir=\"ltr\">(ZF&nbsp;=&nbsp;0)</bdi> وكمان داخلة في 8 bits كـ unsigned <bdi dir=\"ltr\">(CF&nbsp;=&nbsp;0)</bdi>.",
     "صح. الـ <bdi dir=\"ltr\">+127&nbsp;+&nbsp;1&nbsp;=&nbsp;-128</bdi> في الـ signed، يعني فيه overflow، والنتيجة سالبة.",
     "مش \"None\": الـ 80h الـ sign bit بتاعها 1 <bdi dir=\"ltr\">(SF&nbsp;=&nbsp;1)</bdi>، و <bdi dir=\"ltr\">+127&nbsp;+&nbsp;1</bdi> بتعدّي الـ signed range <bdi dir=\"ltr\">(OF&nbsp;=&nbsp;1)</bdi>."
    ],
    [
     "خارج القسمة والباقي معكوسين: <bdi dir=\"ltr\">17&nbsp;÷&nbsp;5&nbsp;=&nbsp;3</bdi> والباقي 2، وخارج القسمة في AX والباقي في DX.",
     "صح. الـ <bdi dir=\"ltr\">DIV&nbsp;CX</bdi> بتقسم <bdi dir=\"ltr\">DX:AX&nbsp;=&nbsp;17</bdi> على 5:<span class=\"ltr\">17 = 5 × 3 + 2</span>يبقى <bdi dir=\"ltr\">AX&nbsp;=&nbsp;3</bdi> (خارج القسمة) و <bdi dir=\"ltr\">DX&nbsp;=&nbsp;2</bdi> (الباقي) <bdi dir=\"ltr\">(L9, MUL and DIV rules)</bdi>.",
     "الـ <bdi dir=\"ltr\">AX&nbsp;=&nbsp;3</bdi> صح، بس الباقي 2 <bdi dir=\"ltr\">(17&nbsp;−&nbsp;15)</bdi> بيروح في DX، فالـ DX مش 0.",
     "الـ DIV دي integer division: مفيش كسور، النتيجة خارج قسمة 3 في AX وباقي 2 في DX."
    ],
    [
     "الـ <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi> صح، بس الـ TEST مابتخزنش ناتج الـ AND: الـ AX بيفضل 1.",
     "الـ <bdi dir=\"ltr\">AX&nbsp;=&nbsp;1</bdi> صح، بس <bdi dir=\"ltr\">1&nbsp;AND&nbsp;0&nbsp;=&nbsp;0</bdi>، والنتيجة الصفر بتعمل <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi>.",
     "الاتنين غلط: الـ TEST بتسيب <bdi dir=\"ltr\">AX&nbsp;=&nbsp;1</bdi>، والنتيجة الصفر بتاعة <bdi dir=\"ltr\">1&nbsp;AND&nbsp;0</bdi> بتعمل <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi>.",
     "صح. الـ TEST بتعمل AND بس عشان تظبط الـ flags:<span class=\"ltr\">1 AND 0 = 0 → ZF = 1</span>والـ AX بيفضل 1 لأن النتيجة مابتتخزنش <bdi dir=\"ltr\">(L9, NOT, NEG, TEST)</bdi>."
    ],
    [
     "صح. الـ shift لليسار n bits بيضرب في <bdi dir=\"ltr\">2ⁿ</bdi>، يعني:<span class=\"ltr\">5 × 2² = 20 (00000101 → 00010100 = 14h)</span>(من <bdi dir=\"ltr\">L9, Shift instructions</bdi>)",
     "الـ 10 دي ناتج <bdi dir=\"ltr\">SHL&nbsp;DL,&nbsp;1</bdi> <bdi dir=\"ltr\">(5&nbsp;×&nbsp;2)</bdi>؛ إنما الـ count هنا 2، فـ <bdi dir=\"ltr\">5&nbsp;×&nbsp;4&nbsp;=&nbsp;20</bdi>.",
     "الـ 7 دي <bdi dir=\"ltr\">5&nbsp;+&nbsp;2</bdi>، كأن الـ SHL بتجمع الـ count؛ الـ shift لليسار بـ 2 بيضرب في <bdi dir=\"ltr\">2²&nbsp;=&nbsp;4</bdi>، فالناتج 20.",
     "الـ 1 ده shift لليمين:<span class=\"ltr\">SHR DL, 2 = 5 ÷ 4 → 1</span>والـ SHL بتزق لليسار وبتضرب."
    ],
    [
     "الـ MUL ماينفعش تاخد immediate، والـ AX لازم يبقى فيه العامل الأول.",
     "الـ MUL بتاخد operand واحد register أو memory، عمرها ما بتاخد immediate، فـ MUL 4 غلط؛ حط الـ 4 في BX واستخدم MUL BX.",
     "صح. الـ MUL محتاجة AX يكون العامل الأول والـ operand يكون register:<pre>MOV AX, 7\nMOV BX, 4\nMUL BX</pre>النتيجة:<span class=\"ltr\">DX:AX = 28 (1Ch), DX = 0</span>(من <bdi dir=\"ltr\">L9, MUL and DIV rules</bdi>)",
     "الـ <bdi dir=\"ltr\">MUL&nbsp;CX</bdi> بتضرب AX في CX، بس الـ AX عمره ما اتحمّل بـ 7؛ الـ 7 اللي في BX مش مستخدمة، فالنتيجة مش <bdi dir=\"ltr\">7&nbsp;×&nbsp;4</bdi>."
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
       "why": "الـ PC شايل عنوان الـ instruction اللي هتتجاب (L2).",
       "ow": [
        null,
        "الـ MAR شايل عنوان location في الـ memory (للداتا اللي بتتقري أو بتتكتب)، مش بالتحديد عنوان الـ instruction الجاية؛ ده شغل الـ PC.",
        "الـ IR شايل الـ instruction نفسها اللي اتجابت آخر مرة، مش عنوان اللي جاية.",
        "الـ MBR شايل word من الداتا هتتكتب في الـ memory أو آخر word اتقرت، مش عنوان instruction."
       ]
      },
      {
       "why": "في الـ EFLAGS الـ C bit هو الـ carry flag يعني الـ CF، وبيتعمله set لما نتيجة عملية unsigned تبقى أكبر من إنها تتشال في الـ destination (L2, EFLAGS bits).",
       "ow": [
        "مفيش حاجة اسمها \"compute bit\" في الـ EFLAGS؛ الـ C bit هو الـ carry flag، وبيتعمله set لما نتيجة unsigned تبقى أكبر من الـ destination.",
        "الـ control flags في الـ EFLAGS هي bits زي الـ DF (direction)؛ إنما حرف الـ C نفسه بيسمّي الـ carry flag، وده status flag.",
        null,
        "مش \"None\": الـ carry bit موجود في الاختيارات، والـ CF هو بالظبط معنى الـ C bit في الـ EFLAGS."
       ]
      },
      {
       "why": "المحاضرة بتعرّف الـ control bus إنه الـ bus اللي بيستخدم binary signals عشان يعمل synchronize لأفعال كل الـ devices المتوصلة بالـ system bus (L1, Buses).",
       "ow": [
        "الـ data bus بينقل الـ instructions والداتا بين الـ CPU والـ memory؛ مالوش دعوة بالـ synchronization بين الـ devices.",
        null,
        "الـ address bus شايل عناوين الـ instructions والداتا وقت النقل بين الـ CPU والـ memory؛ الـ synchronization بالـ binary signals ده شغل الـ control bus.",
        "مش \"None\": الـ control bus مطابق لتعريف المحاضرة حرف بحرف."
       ]
      },
      {
       "why": "الـ register هو مكان تخزين مؤقت سريع جدًا موجود جوه الـ CPU، والـ CPU فيه عدد محدود منهم (من <bdi dir=\"ltr\">L1, Registers; L2</bdi>).",
       "ow": [
        "الـ processor (الـ CPU) هو الوحدة كلها اللي جواها الـ registers والـ ALU والـ CU والـ clock؛ هو نفسه مش مكان تخزين.",
        "الـ ALU بيعمل العمليات الحسابية والمنطقية (ADD, AND, OR, NOT)؛ مابيخزنش داتا.",
        "الـ bus مجموعة أسلاك parallel بتنقل الداتا بين أجزاء الكمبيوتر، برّه الـ CPU؛ مش storage.",
        null
       ]
      },
      {
       "why": "الـ MOV [AX], [5000H] بتنقل من memory لـ memory، وده مش مسموح غير في الـ string instructions؛ وكمان [AX] مش pointer سليم في الـ <bdi dir=\"ltr\">16‑bit</bdi> (L3, Register addressing restrictions).",
       "ow": [
        "الـ MOV AX, BX سليمة، register addressing عادي: الاتنين general registers <bdi dir=\"ltr\">16‑bit</bdi>.",
        "الـ MOV DS, AX سليمة: ينفع تحمّل segment register من general register (الممنوع بس إنك تغيّر CS، أو تنقل من segment لـ segment).",
        null,
        "الـ <bdi dir=\"ltr\">PUSH&nbsp;AX</bdi> سليمة: بتقلل SP بـ 2 وبتحط AX في <bdi dir=\"ltr\">SS:⁠[SP]</bdi>."
       ]
      },
      {
       "why": "الـ PUSH الأول بتقلل SP بحجم الـ operand، وبعدين بتخزنه؛ والـ EAX حجمه <bdi dir=\"ltr\">32&nbsp;bits&nbsp;=&nbsp;4&nbsp;bytes</bdi>، يبقى <bdi dir=\"ltr\">SP&nbsp;=&nbsp;SP&nbsp;-&nbsp;4</bdi> (من <bdi dir=\"ltr\">L5, PUSH</bdi>).",
       "ow": [
        "الـ PUSH عمرها ما بتزوّد SP (الـ stack بيكبر لتحت)، وكمان 2 ده حجم register <bdi dir=\"ltr\">16‑bit</bdi> زي AX، مش EAX.",
        "النقص بـ 2 ده بتاع PUSH AX (16 bits)؛ إنما EAX حجمه 32 bits، فالـ SP بيقل بـ 4.",
        "زيادة SP بـ 4 دي اللي بتعملها POP EAX؛ إنما الـ PUSH بتقلله.",
        null
       ]
      },
      {
       "why": "الـ LODS بتقرا من <bdi dir=\"ltr\">DS:⁠[SI]</bdi>؛ ونسخة الـ W بتحمّل AX (من <bdi dir=\"ltr\">L7</bdi>).",
       "ow": [
        "الـ <bdi dir=\"ltr\">ES:⁠[DI]</bdi> ده الـ destination اللي بتستخدمه STOS و INS؛ إنما الـ LODS بتقرا الـ source من <bdi dir=\"ltr\">DS:⁠[SI]</bdi>.",
        null,
        "الـ <bdi dir=\"ltr\">DS:⁠[SI]</bdi> صح، بس نسخة الـ W (word) بتحمّل 16 bits في AX؛ الـ AL ده بتاع LODSB.",
        "الـ LODS عمرها ما بتحمّل BX ولا بتقرا من <bdi dir=\"ltr\">ES:⁠[DI]</bdi>؛ الـ LODSW بتنسخ <bdi dir=\"ltr\">DS:⁠[SI]</bdi> في AX."
       ]
      },
      {
       "why": "الـ POP بتزوّد SP بـ 4 للـ register الـ <bdi dir=\"ltr\">32‑bit</bdi>؛ والـ SS عمره ما بيتغير (L5).",
       "ow": [
        "الـ PUSH والـ POP عمرهم ما بيغيّروا SS؛ اللي بيتغير SP بس. إنك تزوّد SS بـ 4 ده خلط بين الـ segment والـ stack pointer.",
        "الـ <bdi dir=\"ltr\">SP&nbsp;=&nbsp;98</bdi> ده ناتج PUSH <bdi dir=\"ltr\">16‑bit</bdi> (<bdi dir=\"ltr\">SP&nbsp;-&nbsp;2</bdi> بالـ decimal)؛ إنما الـ POP بتزوّد SP، والـ ECX حجمه 4 bytes.",
        "الـ <bdi dir=\"ltr\">SS&nbsp;=&nbsp;1298</bdi> بيغيّر الـ segment وبينزل لتحت؛ الـ POP مابتلمسش SS وبتطلّع SP لفوق بـ 4 <bdi dir=\"ltr\">(SP&nbsp;=&nbsp;100&nbsp;+&nbsp;4&nbsp;=&nbsp;104)</bdi>.",
        null
       ]
      },
      {
       "why": "الـ Software interrupts هي instructions مخصوصة (INT) بتنقل الـ control لـ ISR متحدد قبل كده، فالـ interrupt اللي بييجي من تنفيذ instruction يبقى software interrupt (L8, Interrupts).",
       "ow": [
        null,
        "الـ External interrupts بتيجي كـ signals من devices برّه الـ CPU، مش من تنفيذ interrupt instruction.",
        "الـ Hardware interrupts هي signals الـ devices بتبعتها للـ processor؛ إنما الـ interrupt اللي جاي من INT instruction يبقى software interrupt.",
        "مش \"None\": المحاضرة مسمّية الحالة دي صريح، software interrupt."
       ]
      },
      {
       "why": "الـ BP مستخدم كـ base، فالـ default segment هو SS (L4).",
       "ow": [
        "الـ ES بيتستخدم بس لما تكتبه override <bdi dir=\"ltr\">(ES:⁠[...])</bdi> أو في الـ string destinations؛ مفيش حاجة هنا بتختار ES.",
        "الـ DS هو الـ default مع BX أو SI أو DI أو constant، بس أول ما الـ BP يظهر في العنوان الـ default بيبقى SS.",
        null,
        "الـ CS ده الـ segment بتاع جلب الـ instructions (مع IP)، مش للـ data operands اللي بنوصلها عن طريق BP."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "شجرة الـ registers في المحاضرة حاطة التلاتة دول تحت الـ user-visible (L2).",
       "ow": [
        null,
        "الجملة صح: شجرة الـ registers في المحاضرة حاطة الـ general purpose والـ special purpose والـ segment registers تحت الـ user-visible؛ أما PC و IR و MAR و MBR فهم user-invisible."
       ]
      },
      {
       "why": "الـ CS ماينفعش يبقى destination للـ MOV، و [CS] مش memory operand سليم (L3).",
       "ow": [
        null,
        "الجملة صح: تغيير الـ CS بالـ MOV مش مسموح، وكمان [CS] مش memory pointer سليم (المسموح بس BX, BP, SI, DI)."
       ]
      },
      {
       "why": "ده الـ IR؛ الـ MAR فيه عنوان location في الـ memory (L2).",
       "ow": [
        "الـ instruction اللي اتجابت آخر مرة بيشيلها الـ IR؛ إنما الـ MAR فيه عنوان location في الـ memory.",
        null
       ]
      },
      {
       "why": "المحاضرة بتعرّف الـ data bus إنه الـ bus اللي بينقل الـ instructions والداتا بين الـ CPU والـ memory (L1, Buses).",
       "ow": [
        null,
        "الجملة صح: ده تعريف المحاضرة للـ data bus بالظبط. العناوين بتمشي على الـ address bus، والـ timing على الـ control bus."
       ]
      },
      {
       "why": "مع <bdi dir=\"ltr\">D=1</bdi> الـ DI بيقل: <bdi dir=\"ltr\">DI&nbsp;=&nbsp;DI&nbsp;-&nbsp;2</bdi> (من <bdi dir=\"ltr\">L7</bdi>).",
       "ow": [
        "الـ <bdi dir=\"ltr\">ES:⁠[DI]&nbsp;=&nbsp;AX</bdi> صح، بس مع <bdi dir=\"ltr\">D=1</bdi> الاتجاه negative، فالـ DI بيقل:<span class=\"ltr\">DI = DI - 2</span>مش <bdi dir=\"ltr\">+&nbsp;2</bdi>.",
        null
       ]
      },
      {
       "why": "الـ Non-maskable interrupts (NMI) ماينفعش تتعملها mask أو block أو تتجاهل؛ ليها أولوية مطلقة، زي الـ memory parity أو الـ bus faults (L8, Interrupts).",
       "ow": [
        null,
        "الجملة صح: الـ maskable interrupts ينفع تتعملها block بـ mask bit، إنما الـ non-maskable ماينفعش تتعملها block ولا تتجاهل."
       ]
      },
      {
       "why": "الـ LDS بتقرا 4 bytes: أول اتنين بيروحوا في AX (الـ offset) والاتنين اللي بعدهم في DS (الـ segment)، فالاتنين AX و DS بيتغيروا (L6, LDS, LES, LSS).",
       "ow": [
        "الـ LDS بتحمّل pointer كامل: أول 2 bytes في AX والـ 2 اللي بعدهم في DS، فالـ DS بيتغير هو كمان مع AX.",
        null
       ]
      },
      {
       "why": "الـ SI من غير أقواس يبقى register، فالـ segment prefix ملوش معنى؛ الصح <bdi dir=\"ltr\">ES:⁠[SI]</bdi> (من <bdi dir=\"ltr\">L3</bdi>).",
       "ow": [
        null,
        "الجملة صح: الـ SI من غير أقواس يبقى register مش memory operand، فالـ <bdi dir=\"ltr\">ES:</bdi> prefix ملوش معنى. الصح <bdi dir=\"ltr\">ES:⁠[SI]</bdi>."
       ]
      },
      {
       "why": "الـ displacement اللي هو 10 ناقص، والصح:<span class=\"ltr\">DS×10 + 10 + SI + BC</span>(من <bdi dir=\"ltr\">L4</bdi>)",
       "ow": [
        "المعادلة دي ناسية الـ displacement اللي هو 10؛ الـ indexed addressing بيضيفه:<span class=\"ltr\">DS×10 + 10 + SI + BC</span>",
        null
       ]
      },
      {
       "why": "الـ Short والـ near jumps بيغيّروا IP بس؛ الـ far jump بس هو اللي بيغيّر CS (L8).",
       "ow": [
        "الـ far jump بس هو اللي بيغيّر CS و IP مع بعض؛ الـ short والـ near jumps بيفضلوا في نفس الـ code segment وبيغيّروا IP بس.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<table><tr><th dir=\"ltr\">Debugger</th><th dir=\"ltr\">Assembler</th></tr><tr><td>سهل في التشغيل (Easy to run)</td><td>صعب في التشغيل (Hard to run)</td></tr><tr><td>برامج الـ overhead بتاعها قليل</td><td>الـ program overhead أكتر</td></tr><tr><td>قريب من الـ machine</td><td>معزول عن الـ machine</td></tr><tr><td>كويس مع البرامج القصيرة</td><td>كويس مع البرامج الطويلة</td></tr></table>"
      },
      {
       "ans": "الـ Memory location:<span class=\"ltr\">SS×10 + SP = 3000 + 07FE = <b>37FE</b></span>الـ bytes:<span class=\"ltr\">SS:[SP-1] = [37FD] = <b>5A</b> (BH)</span><span class=\"ltr\">SS:[SP-2] = [37FC] = <b>B3</b> (BL)</span>والـ SP:<span class=\"ltr\">SP = 07FE - 2 = <b>07FC</b></span>الرسمة: <bdi dir=\"ltr\">SS&nbsp;(300)&nbsp;×10</bdi> و <bdi dir=\"ltr\">ESP&nbsp;(07FE)</bdi> داخلين على الـ adder اللي بيشاور على 37FE؛ وأسهم BH و BL رايحة لـ 37FD و 37FC؛ والـ SP القديم متشطب ومكتوب 07FC. الـ DS مش مستخدم."
      },
      {
       "ans": "الـ INS بتكتب في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>. الـ Memory location:<span class=\"ltr\">ES×10 + DI = 2000 + 100 = <b>2100</b></span>الـ bytes الجاية من الـ input اللي هي AB و CD و 12 و 34 بتتخزن بادئة من 2100 (زي رسمة المحاضرة).<br>والـ <bdi dir=\"ltr\">D&nbsp;=&nbsp;1</bdi> يبقى <bdi dir=\"ltr\">DI&nbsp;=&nbsp;DI&nbsp;-&nbsp;4</bdi>: المحاضرة والـ key كاتبين <b>96</b>؛ وفي الـ hex:<span class=\"ltr\">100H - 4 = <b>0FCH</b></span>الرسمة: مربع الـ input device مكتوب فيه \"AB CD 12 34\" وسهم داخل الـ memory عند 2100؛ و <bdi dir=\"ltr\">ES&nbsp;(200)×10</bdi> و <bdi dir=\"ltr\">EDI&nbsp;(100)</bdi> داخلين على الـ adder؛ والـ EDI القديم 100 متشطب ومكتوب القيمة الجديدة."
      },
      {
       "ans": "عنوان البداية:<span class=\"ltr\">CS×10 = 20000</span>الـ <b>Near jump</b> (3 bytes؛ الـ bytes 2 و 3 فيهم 201C):<span class=\"ltr\">IP = 300 + 201C = 231C</span>وعنوان الـ jump:<span class=\"ltr\">20000 + 231C = <b>2231C</b></span>الـ <b>Far jump</b> (5 bytes):<span class=\"ltr\">offset = bytes 2,3 = 201C</span><span class=\"ltr\">segment = bytes 4,5 = 2DA0</span><span class=\"ltr\">2DA00 + 201C = <b>2FA1C</b></span>ارسم عمود الـ memory والـ JMP عند 20000 وسهم رايح لعنوان الـ jump."
      },
      {
       "ans": "<b>(1) الـ <bdi dir=\"ltr\">LSS&nbsp;AX,&nbsp;[SI]</bdi></b>، العنوان:<span class=\"ltr\">DS×10 + SI = 20000 + 300 = <b>20300</b></span>والتحميل:<span class=\"ltr\">AX ← [20301][20300] = <b>ABCD</b></span><span class=\"ltr\">SS ← [20303][20302] = <b>1234</b></span><b>(2) الـ <bdi dir=\"ltr\">POP&nbsp;AX</bdi></b> بتستخدم الـ SS الجديد، العنوان:<span class=\"ltr\">SS×10 + SP = 12340 + 200 = <b>12540</b></span>والقراية:<span class=\"ltr\">AL = [SP] = E0, AH = [SP+1] = F1 → <b>AX = F1E0</b></span>(الـ ABCD اتكتب عليها)؛ والـ SP:<span class=\"ltr\">SP = 200 + 2 = <b>202</b></span>الـ <bdi dir=\"ltr\">[SP-1]&nbsp;=&nbsp;44</bdi> تحت قمة الـ stack ومش بتتقري؛ والـ D والـ AX القديم مجرد تمويه."
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
       "why": "الـ register هو مكان تخزين مؤقت سريع جدًا جوه الـ CPU نفسه؛ وخلي بالك إن الـ CPU فيه عدد محدود منهم بس (من <bdi dir=\"ltr\">L1, Registers; L2</bdi>).",
       "ow": [
        "الـ processor (الـ CPU) هو الوحدة كلها اللي جواها الـ registers والـ ALU والـ CU والـ clock؛ هو نفسه مش مكان تخزين.",
        "الـ ALU شغلته العمليات الحسابية والمنطقية (ADD, AND, OR, NOT)؛ مابيخزّنش داتا.",
        "الـ bus ده مجموعة أسلاك parallel بتنقل الداتا بين أجزاء الكمبيوتر، برّه الـ CPU؛ مش مكان تخزين.",
        null
       ]
      },
      {
       "why": "الـ O bit في الـ EFLAGS هو الـ overflow flag (الـ OF)، وبيتعمله set لما نتيجة signed تطلع أكبر أو أصغر من إنها تتشال في الـ destination (L2, EFLAGS bits).",
       "ow": [
        null,
        "مفيش حاجة اسمها «overload» flag في الـ EFLAGS؛ الـ O ده اختصار الـ overflow flag اللي بيقولك إن النتيجة الـ signed ماتساعهاش.",
        "الـ segment override ده prefix بيتكتب في الـ instruction (زي <bdi dir=\"ltr\">ES:⁠[...]</bdi>)، مش flag bit؛ الـ O هو الـ overflow flag.",
        "مش «None»: الـ overflow bit موجود في الاختيارات وهو بالظبط معنى الـ O bit."
       ]
      },
      {
       "why": "الـ POP بتنسخ الداتا اللي عند <bdi dir=\"ltr\">SS:⁠[SP]</bdi> في الـ operand وبعدين تزوّد SP بـ 2 أو 4؛ والـ SS عمره ما بيتغير (من <bdi dir=\"ltr\">L5, POP</bdi>).",
       "ow": [
        "تقليل SP ده شغل الـ PUSH (الـ stack بيكبر لتحت)؛ الـ POP بترجّع SP لفوق.",
        null,
        "الـ PUSH والـ POP مابيغيّروش SS أبدًا، ده شايل الـ stack segment وبس؛ الـ POP بتغيّر SP.",
        "الـ SS مابيتغيرش بالـ stack instructions؛ الـ register اللي الـ POP بتزوّده هو SP."
       ]
      },
      {
       "why": "ماينفعش تنقل داتا من segment register لـ segment register تاني بـ MOV واحدة؛ لازم تعدّي على general register:<pre>MOV AX, ES\nMOV DS, AX</pre>(من <bdi dir=\"ltr\">L3, Register addressing restrictions</bdi>)",
       "ow": [
        "ده كان هيبقى المقصود، بس الـ MOV من segment لـ segment مش مسموح على الـ 8086، فالـ instruction دي error.",
        "الـ MOV بتنسخ الـ source (اليمين) في الـ destination (الشمال)، فده قاري الـ operands بالعكس؛ وكمان الـ MOV من segment لـ segment ممنوع أصلًا.",
        "الـ MOV عمرها ما بتمسح الـ source، والـ MOV من segment لـ segment مش مسموح خالص، فالـ instruction بتعمل error.",
        null
       ]
      },
      {
       "why": "الـ <bdi dir=\"ltr\">ES:</bdi> prefix ده segment override، فالـ memory address بيبقى <bdi dir=\"ltr\">ES×10&nbsp;+&nbsp;1234H</bdi> بدل الـ DS اللي هو الـ default (من <bdi dir=\"ltr\">L3, Direct and displacement addressing</bdi>).",
       "ow": [
        null,
        "الـ DS هو الـ default مع الـ constant offset، بس الـ <bdi dir=\"ltr\">ES:</bdi> prefix المكتوب بيعمله override.",
        "الـ SS بيبقى default بس لما تستخدم BP أو SP؛ هنا الـ segment مكتوب صريح إنه ES.",
        "الـ CS بيتستخدم في الـ instruction fetch مع الـ IP؛ الـ data operand اللي عليه <bdi dir=\"ltr\">ES:</bdi> override بيستخدم ES."
       ]
      },
      {
       "why": "الـ LODS بتقرا الـ source string من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> وتحطه في AL أو AX أو EAX (<bdi dir=\"ltr\">LODSB/W/D</bdi>)، وبعدين تحرّك SI حسب الـ D flag (من <bdi dir=\"ltr\">L7, String instruction summary</bdi>).",
       "ow": [
        "الـ SI هو الـ pointer الصح، بس الـ LODS بتقرا من الـ data segment يعني DS؛ الـ ES بيتستخدم للـ destination strings.",
        "الـ <bdi dir=\"ltr\">ES:⁠[DI]</bdi> ده الـ destination اللي بتستخدمه الـ STOS والـ INS، مش الـ source اللي الـ LODS بتقرا منه.",
        null,
        "الـ DS صح بس الـ DI هو الـ destination pointer؛ الـ LODS بتستخدم SI كـ source pointer."
       ]
      },
      {
       "why": "وجود BP معناه SS (من <bdi dir=\"ltr\">L4</bdi>). بالظبط كده، <bdi dir=\"ltr\">BX+BP</bdi> ماينفعش يتجمعوا على الـ 8086.",
       "ow": [
        "الـ ES بيتستخدم بس مع <bdi dir=\"ltr\">ES:</bdi> override صريح أو للـ string destinations؛ مفيش حاجة هنا بتختار ES.",
        "الـ DS هو الـ default مع BX أو SI أو DI أو constant، بس أول ما BP يظهر في العنوان الـ default بيبقى SS.",
        null,
        "الـ CS ده segment الـ instruction fetch مع الـ IP، مش للداتا اللي بنوصلها عن طريق BP."
       ]
      },
      {
       "why": "الـ LSS بتحمّل الـ offset في الـ register والـ segment في SS (L6).",
       "ow": [
        "الترتيب معكوس: أول 2 bytes (الـ offset) بيروحوا DX، والـ 2 اللي بعدهم (الـ segment) بيروحوا SS.",
        "الـ DX بياخد الـ offset اللي اتقرا من الـ memory عند [SI]، والـ SS (مش DS) هو اللي بياخد الـ segment؛ الـ DS بيتستخدم بس عشان نكوّن العنوان.",
        null,
        "الـ DX فعلًا بياخد الـ offset، بس الـ SS بياخد segment address متقري من الـ memory، مش محتوى الـ DS."
       ]
      },
      {
       "why": "الـ IR (Instruction Register) فيه آخر instruction اتعملها fetch، يعني اللي بتتنفذ دلوقتي؛ وده user-invisible register (L2).",
       "ow": [
        "الـ PC فيه address الـ instruction الجاية اللي هتتعمل fetch، مش الـ instruction نفسها.",
        "الـ MAR فيه address لمكان في الـ memory، مش instruction اتعملها fetch.",
        null,
        "الـ MBR شايل data word هتتكتب في الـ memory أو آخر word اتقرت، مش الـ instruction اللي اتعملها fetch."
       ]
      },
      {
       "why": "الـ PUSH بتقلل SP بـ 2 ومابتلمسش SS (L5). الإجابة المقصودة 98؛ بس في الـ hex هتبقى 0FE.",
       "ow": [
        "الـ PUSH عمرها ما بتغيّر SS؛ بتغيّر SP بس. إنك تزوّد SS بـ 2 ده خلط بين الـ segment والـ stack pointer.",
        null,
        "الـ SS مابيتغيرش بالـ PUSH؛ الـ 2 بيتطرحوا من SP فيطلع 98 (بالـ decimal زي ما الامتحان قاصد).",
        "الـ <bdi dir=\"ltr\">SP&nbsp;=&nbsp;102</bdi> معناها زوّدت 2، وده اللي الـ <bdi dir=\"ltr\">POP&nbsp;CX</bdi> كانت هتعمله؛ الـ PUSH الأول بتقلل SP بـ 2."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ <bdi dir=\"ltr\">ES:SI</bdi> مش operand سليم: الـ SI من غير أقواس يبقى register، فالـ <bdi dir=\"ltr\">ES:</bdi> prefix ملوش معنى؛ الصح <bdi dir=\"ltr\">ES:⁠[SI]</bdi> (من <bdi dir=\"ltr\">L3</bdi>).",
       "ow": [
        "الـ segment prefix بيتحط بس على memory operand جوه أقواس؛ الـ SI لوحده register، فالـ <bdi dir=\"ltr\">ES:SI</bdi> غلط. لو <bdi dir=\"ltr\">ES:⁠[SI]</bdi> كانت هتشتغل.",
        null
       ]
      },
      {
       "why": "الـ far jump حجمها 5 bytes، منهم 1 byte للـ opcode و2 bytes للـ offset و2 bytes للـ segment (الـ short بـ 2 والـ near بـ 3) (من <bdi dir=\"ltr\">L8, The three jump types</bdi>).",
       "ow": [
        "الـ far jump فيها:<span class=\"ltr\">1 opcode + 2 offset + 2 segment bytes = 5 bytes</span>مش 6.",
        null
       ]
      },
      {
       "why": "الـ LODS والـ STOS مابيأثروش على الـ flags، فالـ LODSW بتنسخ <bdi dir=\"ltr\">DS:⁠[SI]</bdi> في AX بس وتسيب الـ ZF زي ما هو (من <bdi dir=\"ltr\">L7, Key rules</bdi>).",
       "ow": [
        "الـ LODS بتنسخ الداتا في AX وتحرّك SI وبس؛ المحاضرة بتقول إن الـ LODS والـ STOS مابيأثروش على الـ flags، والـ ZF منهم.",
        null
       ]
      },
      {
       "why": "الـ RAM هي semiconductor memory بتستخدم للقراية والكتابة بأي ترتيب، حسب ما الـ processor محتاج (L1, Types of memory).",
       "ow": [
        null,
        "الجملة صح: ده تعريف الـ RAM في المحاضرة بالحرف (قراية وكتابة بأي ترتيب)."
       ]
      },
      {
       "why": "الـ short والـ near jumps بيغيّروا IP بس (نفس الـ code segment)؛ الـ far jump بس هي اللي بتغيّر CS و IP الاتنين (L8, Unconditional jumps).",
       "ow": [
        "مش أي JMP: الـ short والـ near بيغيّروا IP بس؛ الـ CS بيتغير بس مع الـ far jump.",
        null
       ]
      },
      {
       "why": "الـ ZF (zero flag) بيبقى 1 لما نتيجة العملية الحسابية أو المنطقية تطلع صفر (L2, EFLAGS bits).",
       "ow": [
        null,
        "الجملة صح: الـ <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;1</bdi> يعني نتيجة الـ ALU كانت صفر، والـ <bdi dir=\"ltr\">ZF&nbsp;=&nbsp;0</bdi> يعني النتيجة مش صفر."
       ]
      },
      {
       "why": "الـ LDS بتقرا 4 bytes: أول اتنين بيروحوا AX (الـ offset) والاتنين اللي بعدهم بيروحوا DS (الـ segment)، فالـ DS بيتغير هو كمان (L6, LDS, LES, LSS).",
       "ow": [
        "الـ LDS بتحمّل pointer كامل: أول 2 bytes في AX والـ 2 اللي بعدهم في DS، فالـ DS بيتغير مع AX.",
        null
       ]
      },
      {
       "why": "الـ Assembly بتعتمد على الـ hardware: كل نوع CPU ليه الـ machine language والـ assembly language بتوعه، فالبرنامج المكتوب لـ CPU مش هيشتغل على التاني (L1).",
       "ow": [
        null,
        "الجملة صح: الـ CPUs المختلفة محتاجة assemblers و assembly languages مختلفة؛ الـ high-level languages هي اللي machine-independent."
       ]
      },
      {
       "why": "الـ SS (Stack Segment) شايل عنوان بداية الـ stack segment الشغّال حاليًا، وبيتستخدم مع SP في الـ PUSH والـ POP (L2, Segment registers).",
       "ow": [
        null,
        "الجملة صح: الـ SS هو الـ stack segment register؛ الـ CS للـ code والـ DS للداتا والـ ES للـ extra segment."
       ]
      },
      {
       "why": "الـ string instructions هي LODS و STOS و INS و OUTS (وكمان MOVS و CMPS و SCAS)؛ الـ MOV العادية مش string instruction، فالليستة غلط (L7, Key rules).",
       "ow": [
        "الـ LODS والـ STOS فعلًا string instructions، بس الـ MOV العادية لأ (اللي منهم هي MOVS)؛ فالليستة غلط.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "دي <bdi dir=\"ltr\">control/status</bdi> registers بتستخدم عشان تتحكم في شغل الـ CPU؛ ومبرمج الـ assembly مايقدرش يشاور عليها.<br>الـ <b>PC</b>: عنوان الـ instruction اللي هتتجاب. الـ <b>IR</b>: آخر instruction اتجابت. الـ <b>MAR</b>: عنوان location في الـ memory. الـ <b>MBR</b>: فيه word داتا هتتكتب في الـ memory أو آخر word اتقرا."
      },
      {
       "ans": "الجزء (i):<span class=\"ltr\">DS×10 + DI - 100 = 2000 + 10 - 100 = <b>1F10</b></span>(الـ DS segment).<br>الجزء (ii)، وجود BP معناه SS:<span class=\"ltr\">15000 + 111 + 110 + 50 = <b>15271</b></span>الجزء (iii):<span class=\"ltr\">DS×10 + SI + AD = 2000 + 110 + AD = <b>21BD</b></span>(ملحوظة على (i): الـ offset اللي هو <bdi dir=\"ltr\">10&nbsp;-&nbsp;100</bdi> سالب؛ والكورس بيطرح عادي. الـ 8086 الحقيقي كان هيلف الـ offset لـ FF10، فالعنوان يبقى 11F10.)"
      },
      {
       "ans": "العنوان:<span class=\"ltr\">ES×10 + DI = 2000 + 100 = <b>2100</b></span>والـ bytes اللي هي AB و CD و 12 و 34 الجاية من الـ input device بتتخزن من 2100؛ والـ DI:<span class=\"ltr\">DI = DI - 4 = <b>0FCH</b></span>(المحاضرة كاتبة 96). الـ DS مش مستخدم."
      },
      {
       "ans": "عنوان البداية 10000.<br>الـ Short:<span class=\"ltr\">IP = 300 + 04 = 304 → <b>10304</b></span>الـ Near:<span class=\"ltr\">IP = 300 + 0204 = 504 → <b>10504</b></span>"
      },
      {
       "ans": "العنوان:<span class=\"ltr\">DS×10 + DI = 10000 + 1000 = <b>11000</b></span>الـ BX:<span class=\"ltr\">[11000]=7A, [11001]=12 → <b>BX = 127A</b></span>(الـ 6F2A متشطب).<br>والـ DS:<span class=\"ltr\">[11002]=00, [11003]=30 → <b>DS = 3000</b></span>(الـ 1000 متشطب)."
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
       "why": "الـ IR (Instruction Register) هو اللي فيه آخر instruction اتعملها fetch، يعني اللي بتتنفذ دلوقتي؛ وده register من النوع الـ user-invisible (L2).",
       "ow": [
        "الـ PC فيه الـ address بتاع الـ instruction الجاية اللي هتتعملها fetch، مش الـ instruction نفسها.",
        "الـ MAR فيه address لمكان في الـ memory، مش instruction اتعملها fetch.",
        null,
        "الـ MBR بيشيل data word هتتكتب في الـ memory أو آخر word اتقرت منها، مش الـ instruction اللي اتعملها fetch."
       ]
      },
      {
       "why": "الـ segment registers (CS, DS, ES, SS) هي registers <bdi dir=\"ltr\">16‑bit</bdi> من النوع الـ user-visible؛ وخلي بالك إنها ماينفعش تستخدمها في الـ arithmetic أو الـ logic instructions (L2, Segment registers).",
       "ow": [
        null,
        "الـ FLAGS ده special purpose register، مش general purpose ولا segment register.",
        "الـ ECX والـ EDX دول general purpose registers <bdi dir=\"ltr\">32‑bit</bdi>؛ إنما الـ segment registers هي <bdi dir=\"ltr\">16‑bit</bdi> زي الـ CS والـ DS.",
        "مش \"None\": الاختيار a، يعني الـ <bdi dir=\"ltr\">16‑bit</bdi> user-visible registers زي الـ CS والـ DS، هو بالظبط وصف المحاضرة."
       ]
      },
      {
       "why": "الـ POPAD بتعمل pop لـ 8 registers من الـ <bdi dir=\"ltr\">32‑bit</bdi>، وهما:<span class=\"ltr\">EDI, ESI, EBP, ESP, EBX, EDX, ECX, EAX</span>يعني 8 double words، يعني 32 bytes (من <bdi dir=\"ltr\">L5, POP</bdi>).",
       "ow": [
        "الـ 32 ده عدد الـ BYTES اللي بتتعملها pop (8 double words × 4)؛ إنما السؤال بيسأل عن عدد الـ double words، وده 8.",
        null,
        "الـ 16 ده عدد الـ bytes بتاع الـ POPA (8 words × 2)، مش عدد الـ double words في الـ POPAD.",
        "الـ 4 ده حجم double word واحدة بالـ bytes؛ والـ POPAD بتعمل pop لـ 8 منهم."
       ]
      },
      {
       "why": "الـ O bit في الـ EFLAGS هو الـ overflow flag الـ OF، وبيتعمله set لما نتيجة signed تطلع أكبر أو أصغر من إنها تتشال في الـ destination (L2, EFLAGS bits).",
       "ow": [
        null,
        "مفيش حاجة اسمها \"overload\" flag في الـ EFLAGS؛ الـ O هو الـ overflow flag، اللي بيقولك إن نتيجة signed مش داخلة في المكان.",
        "الـ segment override ده prefix بتكتبه في الـ instruction (زي <bdi dir=\"ltr\">ES:⁠[...]</bdi>)، مش bit في الـ flags؛ الـ O هو الـ overflow flag.",
        "مش \"None\": الـ overflow bit موجود في الاختيارات، وهو بالظبط معنى الـ O bit."
       ]
      },
      {
       "why": "الـ immediate value ماينفعش تبقى destination (L3). والـ MOV [AX], SI كمان غلط على الـ 8086 الـ <bdi dir=\"ltr\">16‑bit</bdi>.",
       "ow": [
        "الـ MOV AX, [BX] صح، ده register indirect addressing: الـ BX pointer مسموح والـ default segment بتاعه DS.",
        "الـ <bdi dir=\"ltr\">MOV&nbsp;AX,&nbsp;5555H</bdi> صح، ده immediate addressing، يعني constant <bdi dir=\"ltr\">16‑bit</bdi> داخل register <bdi dir=\"ltr\">16‑bit</bdi>.",
        "الإجابة المقصودة بتعتبر دي ممكنة (register لـ memory)، مع إن بالمعنى الدقيق الـ [AX] مش pointer <bdi dir=\"ltr\">16‑bit</bdi> صالح؛ إجابة الـ key هي اللي الـ destination فيها immediate.",
        null
       ]
      },
      {
       "why": "الـ FLAGS (EFLAGS) register هو اللي بيتابع حالة الـ running environment: الـ bits بتاعته يا إما بتتحكم في الـ CPU يا إما بتعكس نتيجة العمليات (L2).",
       "ow": [
        "الـ general purpose registers (AX, BX, CX, DX ...) بتشيل data و addresses، مش حالة الـ processor.",
        "كلمة \"Condition\" مش اسم register في المحاضرة؛ الـ condition bits دي موجودة جوه الـ FLAGS register.",
        "الـ segment registers بتشيل الـ starting addresses بتاعة الـ segments (CS, DS, ES, SS)، مش حالة الـ environment.",
        null
       ]
      },
      {
       "why": "لما الـ BP يبقى موجود في الـ address، الـ default segment بيبقى SS (أما BX و SI و DI فالـ default بتاعهم DS)، فالـ [BX][BP] هتستخدم SS. وخلي بالك إن بالمعنى الدقيق ماينفعش تجمع BX+BP على الـ 8086 (L4).",
       "ow": [
        "الـ ES بيتستخدم بس مع <bdi dir=\"ltr\">ES:</bdi> override صريح أو للـ destination بتاع الـ string instructions؛ مفيش حاجة هنا بتختار ES.",
        "الـ DS هو الـ default مع BX أو SI أو DI أو constant، لكن أول ما الـ BP يظهر في الـ address الـ default بيبقى SS.",
        null,
        "الـ CS ده الـ segment بتاع الـ instruction fetch مع الـ IP، مش للـ data اللي بتتعمل لها addressing بالـ BP."
       ]
      },
      {
       "why": "الـ <bdi dir=\"ltr\">PUSH&nbsp;CX</bdi> بتنقص الـ SP بـ 2 الأول (عشان CX 16 bits) ومابتغيرش الـ SS، يعني:<span class=\"ltr\">SP = 100 - 2 = 98</span>زي ما السؤال قاصد (لو بالـ hex هتبقى 0FE) (من <bdi dir=\"ltr\">L5</bdi>).",
       "ow": [
        "الـ PUSH عمرها ما بتغير الـ SS؛ هي بتغير الـ SP بس. إنك تزود 2 على الـ SS ده لخبطة بين الـ segment والـ stack pointer.",
        null,
        "الـ SS مش بيتغير مع الـ PUSH؛ الـ 2 بتتطرح من الـ SP، فيبقى 98 (على أساس إن الامتحان قاصد decimal).",
        "الـ <bdi dir=\"ltr\">SP&nbsp;=&nbsp;102</bdi> كده إنت زودت 2، ودي اللي بتعملها <bdi dir=\"ltr\">POP&nbsp;CX</bdi>؛ الـ PUSH بتنقص الـ SP بـ 2 الأول."
       ]
      },
      {
       "why": "الـ interrupt بينقل الـ control للـ Interrupt Service Routine (ISR)؛ وبعد الـ return instruction بتاعة الـ ISR الـ processor بيكمل البرنامج اللي اتقطع (L8, Interrupts).",
       "ow": [
        null,
        "مفيش حاجة اسمها \"counter word register\" هنا؛ الـ PC بيتحط فيه الـ start address بتاع الـ ISR، والـ control بيروح للـ routine دي.",
        "الـ execution unit هي اللي بتنفذ الـ instructions في كل الأحوال؛ الـ interrupt بيحول التنفيذ لبرنامج تاني، اللي هو الـ ISR.",
        "الـ control unit بتنظم خطوات الـ instruction؛ الـ interrupt بيغير البرنامج اللي شغال نفسه، اللي هو الـ interrupt service routine."
       ]
      },
      {
       "why": "الـ LSS بتقرا 4 bytes من الـ address المحسوب: أول اتنين (الـ offset) بيروحوا في الـ DX، والاتنين اللي بعدهم (الـ segment) بيروحوا في الـ SS (L6, LDS, LES, LSS).",
       "ow": [
        "الترتيب مقلوب: أول 2 bytes (الـ offset) بيروحوا في الـ DX، والاتنين اللي بعدهم (الـ segment) بيروحوا في الـ SS.",
        "الـ DX بياخد الـ offset اللي اتقرا من الـ memory عند [SI]، والـ SS (مش الـ DS) هو اللي بياخد الـ segment؛ الـ DS بيتستخدم بس عشان يتكون الـ address.",
        null,
        "صحيح الـ DX بياخد الـ offset، بس الـ SS بياخد segment address متقري من الـ memory، مش محتوى الـ DS."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Assembly معتمدة على الـ hardware: كل نوع CPU ليه الـ machine language والـ assembly language بتاعته، فالبرنامج المكتوب لـ CPU مش هيشتغل على التاني (L1).",
       "ow": [
        null,
        "الجملة صح: الـ CPUs المختلفة محتاجة assemblers و assembly languages مختلفة؛ اللغات الـ high-level هي اللي machine-independent."
       ]
      },
      {
       "why": "الـ string instructions بـ<b>تستخدم</b> الـ direction flag الـ D بس عشان تقرر الـ <bdi dir=\"ltr\">SI/DI</bdi> يزيدوا ولا يقلوا؛ اللي بيغير الـ D هما الـ CLD والـ STD (من <bdi dir=\"ltr\">L7, Key rules</bdi>).",
       "ow": [
        "الـ string instructions بتقرا الـ D عشان تعرف الاتجاه بس عمرها ما بتغيره؛ اللي بيعمله set هما الـ CLD <bdi dir=\"ltr\">(D=0)</bdi> والـ STD <bdi dir=\"ltr\">(D=1)</bdi> بس.",
        null
       ]
      },
      {
       "why": "الـ stack instructions بتستخدم <bdi dir=\"ltr\">SS:⁠[SP]</bdi>: الـ SS هو الـ segment والـ SP هو الـ offset، فالـ <bdi dir=\"ltr\">PUSH&nbsp;EBX</bdi> بتخزن عند <bdi dir=\"ltr\">SS×10&nbsp;+&nbsp;SP</bdi> بعد ما <bdi dir=\"ltr\">SP&nbsp;=&nbsp;SP&nbsp;-&nbsp;4</bdi> (من <bdi dir=\"ltr\">L5, The stack</bdi>).",
       "ow": [
        "الترتيب مقلوب: الـ segment register بييجي الأول، فالـ address هو <bdi dir=\"ltr\">SS:⁠[SP]</bdi> مش <bdi dir=\"ltr\">SP:⁠[SS]</bdi>.",
        null
       ]
      },
      {
       "why": "في الـ SBB (subtract with borrow) الـ carry flag الـ CF بيشتغل كـ borrow flag: الـ SBB بتحسب dest - src - CF (Lab, L9).",
       "ow": [
        null,
        "الجملة صح: الـ CF بيشتغل كمان كـ borrow flag في الطرح، والـ SBB بتطرحه مع الـ source."
       ]
      },
      {
       "why": "الـ string instructions هي LODS, STOS, INS, OUTS (وكمان MOVS, CMPS, SCAS)؛ الـ MOV العادية مش string instruction، فالقايمة غلط (L7, Key rules).",
       "ow": [
        "الـ LODS والـ STOS string instructions فعلًا، بس الـ MOV العادية لأ (اللي string هي MOVS)؛ فالقايمة غلط.",
        null
       ]
      },
      {
       "why": "في الـ PROM الـ data بتتكتب في الـ chip قبل ما تتركب، باستخدام PROM programmer، وماينفعش تتكتب غير مرة واحدة بس (L1, Types of memory).",
       "ow": [
        null,
        "الجملة صح: هي مطابقة بالظبط لتعريف الـ PROM في المحاضرة (بتتكتب قبل التركيب، ومرة واحدة بس)."
       ]
      },
      {
       "why": "الـ LDS بتقرا 4 bytes: أول اتنين بيروحوا في الـ AX (الـ offset) والاتنين اللي بعدهم في الـ DS (الـ segment)، فالـ DS بيتغير هو كمان (L6, LDS, LES, LSS).",
       "ow": [
        "الـ LDS بتحمل pointer كامل: أول 2 bytes في الـ AX والاتنين اللي بعدهم في الـ DS، فالـ DS بيتغير مع الـ AX.",
        null
       ]
      },
      {
       "why": "الـ CS هنا مجرد segment override للـ memory اللي هي الـ destination؛ الـ CS نفسه مش بيتغير، والـ override بالـ CS مسموح (من <bdi dir=\"ltr\">L3/L4</bdi>). (الـ assembler كمان كان هيحتاج <bdi dir=\"ltr\">BYTE/WORD&nbsp;PTR</bdi>.)",
       "ow": [
        "الممنوع بس إنك تغير الـ CS نفسه؛ هنا الـ CS: مجرد segment override على الـ memory اللي هي الـ destination، وده مسموح، فالقول إنها \"incorrect\" غلط.",
        null
       ]
      },
      {
       "why": "الـ LODSW (الـ word form) بتنسخ 2 bytes من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> للـ AX: الـ AL من <bdi dir=\"ltr\">[SI]</bdi> والـ AH من <bdi dir=\"ltr\">[SI+1]</bdi>، وبعدين الـ SI بيتحرك بـ 2 (من <bdi dir=\"ltr\">L7</bdi>).",
       "ow": [
        null,
        "الجملة صح: الـ W معناها word يعني 2 bytes، بتتحمل من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> في الـ AX (الـ LODSB بتحمل byte واحدة، والـ LODSD بتحمل 4)."
       ]
      },
      {
       "why": "الـ short والـ near jumps بيغيروا الـ IP بس (نفس الـ code segment)؛ الـ far jump بس هو اللي بيغير الـ CS والـ IP مع بعض (L8, Unconditional jumps).",
       "ow": [
        "مش أي JMP: الـ short والـ near بيغيروا الـ IP بس؛ الـ CS مابيتغيرش غير مع الـ far jump.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الرسمة: الـ CPU (registers؛ والـ ALU والـ CU والـ clock)، والـ Memory Storage Unit، والـ <bdi dir=\"ltr\">I/O&nbsp;Device&nbsp;#1</bdi>، والـ <bdi dir=\"ltr\">I/O&nbsp;Device&nbsp;#2</bdi>، ومتوصلين بالـ data bus (فوق)، والـ control bus (متقطع)، والـ address bus.<br>الـ bus هو مجموعة أسلاك متوازية بتنقل الداتا من جزء في الكمبيوتر لجزء تاني. الـ <b>Data bus</b>: بينقل الـ instructions والداتا بين الـ CPU والـ memory. الـ <b>Control bus</b>: بيستخدم binary signals عشان يعمل synchronize لكل الأجهزة المتوصلة بالـ system bus. الـ <b>Address bus</b>: شايل الـ addresses بتاعة الـ instructions والداتا وقت النقل بين الـ CPU والـ memory."
      },
      {
       "ans": "الجزء (i) بالـ DS:<span class=\"ltr\">2000 + 10 + 100 = <b>2110</b></span>الجزء (ii) بالـ SS (عشان BP):<span class=\"ltr\">15000 + 111 + 110 - 10 = <b>15211</b></span>الجزء (iii) بالـ DS:<span class=\"ltr\">2000 + 110 + BC = <b>21CC</b></span>"
      },
      {
       "ans": "العنوان:<span class=\"ltr\">SS×10 + SP = 3000 + 1234 = <b>4234</b></span>الـ bytes من 4234 لـ 4237 هي:<span class=\"ltr\">11, 22, 33, 44 → <b>EAX = 44332211</b></span>والـ SP:<span class=\"ltr\">SP = 1234 + 4 = <b>1238</b></span>"
      },
      {
       "ans": "عنوان البداية:<span class=\"ltr\">CS×10 = 30000</span>الـ <b>Near</b>:<span class=\"ltr\">IP = 400 + 4310 = 4710 → 30000 + 4710 = <b>34710</b></span>الـ <b>Far</b>:<span class=\"ltr\">offset = 4310, segment = 201C → 201C0 + 4310 = <b>244D0</b></span>"
      },
      {
       "ans": "<b>(1) الـ <bdi dir=\"ltr\">LES&nbsp;AX,&nbsp;[SI]</bdi></b>، العنوان:<span class=\"ltr\">DS×10 + SI = 20000 + 300 = <b>20300</b></span>والنتيجة:<span class=\"ltr\">AX = <b>ABCD</b>, ES = <b>1234</b></span><b>(2) الـ STOSW</b> بتستخدم الـ ES الجديد، العنوان:<span class=\"ltr\">ES×10 + DI = 12340 + 200 = <b>12540</b></span>الـ AX بيتخزن:<span class=\"ltr\">[12540] = CD (AL), [12541] = AB (AH)</span>وبيكتب فوق E0 و F1 (القيم دي مجرد تمويه، زيها زي <bdi dir=\"ltr\">[DI-1]</bdi> والـ AX القديم). والـ <bdi dir=\"ltr\">D&nbsp;=&nbsp;0</bdi> يبقى:<span class=\"ltr\">DI = 200 + 2 = <b>202</b></span>"
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
       "why": "الـ offset هنا معمول بالـ SI (زائد displacement قيمته <bdi dir=\"ltr\">50 − 10</bdi>)، والـ default segment بتاع الـ SI هو الـ DS، فالـ segment register هو الـ DS (L4, Default segment rule).",
       "ow": [
        "الـ SS بيبقى default بس لما نستخدم الـ BP (أو الـ SP)؛ هنا الـ offset بالـ SI يبقى الـ segment هو الـ DS. وكمان مفيش segment register بيتكتب كده «<bdi dir=\"ltr\">SS-10</bdi>».",
        "الـ displacement 50 بيتجمع على الـ offset، مش بيتضرب في الـ segment؛ الـ segment register نفسه هو الـ DS وخلاص.",
        "الـ DS مش شايل 50: الـ 50 ده displacement بيتجمع على الـ SI عشان يطلع الـ offset. الـ segment register هو الـ DS بس.",
        null
       ]
      },
      {
       "why": "الـ special purpose registers اتنين: الـ EIP والـ EFLAGS، الاتنين <bdi dir=\"ltr\">32‑bit</bdi> والـ CPU هو اللي بيتعامل معاهم مباشرة (L2, Special purpose registers).",
       "ow": [
        "الـ CS والـ DS دول الـ <bdi dir=\"ltr\">16‑bit</bdi> segment registers، دي مجموعة تانية من الـ user-visible registers، مش الـ special purpose.",
        null,
        "الـ ECX والـ EDX دول <bdi dir=\"ltr\">32‑bit</bdi> general purpose registers؛ الـ special purpose هما الـ EIP والـ EFLAGS.",
        "مش «None»: الاختيار b صح، الـ EFLAGS (مع الـ EIP) ده <bdi dir=\"ltr\">32‑bit</bdi> special purpose register."
       ]
      },
      {
       "why": "الـ MOV مينفعش تنقل من memory لـ memory (الـ string instructions بس هي اللي تقدر)؛ لازم operand واحد على الأقل يبقى register أو immediate (L3, Register addressing and its restrictions).",
       "ow": [
        "من register لـ register ده الـ register addressing، وده أشهر شكل مسموح، زي MOV AX, BX (نفس الـ size).",
        "من memory لـ register مسموح (<bdi dir=\"ltr\">direct/displacement</bdi> addressing)، زي:<pre>MOV CL, [123H]</pre>",
        null,
        "إنك تحط immediate data في register ده الـ immediate addressing، زي MOV AX, 44H؛ الممنوع بس إن الـ DESTINATION يبقى immediate."
       ]
      },
      {
       "why": "حسب جدول المحاضرة: الـ assembler صعب في التشغيل، الـ program overhead بتاعه أكتر، بعيد عن الـ machine، وكويس مع البرامج الطويلة (L1, Debugger vs. Assembler).",
       "ow": [
        "سهل في التشغيل وكويس مع البرامج الصغيرة ده عمود الـ debugger، عكس الـ assembler خالص.",
        "الـ assembler فعلًا صعب في التشغيل، بس هو كويس مع البرامج الطويلة؛ البرامج القصيرة دي ميزة الـ debugger.",
        "الـ assembler كويس مع البرامج الطويلة بس هو صعب في التشغيل؛ «سهل في التشغيل» ده وصف الـ debugger.",
        null
       ]
      },
      {
       "why": "الـ MBR (Memory Buffer Register) بيشيل الـ word اللي هتتكتب في الـ memory أو آخر word اتقرت منها؛ وده user-invisible <bdi dir=\"ltr\">control/status</bdi> register زيه زي الـ PC والـ IR والـ MAR (من <bdi dir=\"ltr\">L2</bdi>).",
       "ow": [
        "الـ general purpose registers هما EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI؛ والـ programmer أصلًا مايقدرش يوصل للـ MBR.",
        null,
        "الـ user-visible registers هما اللي الـ machine language تقدر تشاور عليهم (general وspecial وsegment)؛ الـ MBR ده user-invisible.",
        "الـ special purpose معناها الـ EIP والـ EFLAGS (ودول مجموعة user-visible)؛ الـ MBR تبع الـ user-invisible registers."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ AX, BX, CX, DX بس هما اللي ليهم أنصاص <bdi dir=\"ltr\">8‑bit</bdi>؛ الـ ESP ليه SP (16 bits) وESP (32 bits) بس، ومفيش byte اسمه SPH أو SPL (L2, General purpose registers).",
       "ow": [
        null,
        "الجملة صح: الـ SI والـ DI والـ SP والـ BP مالهمش أنصاص <bdi dir=\"ltr\">8‑bit</bdi>، فالـ ESP بيتستخدم 16 أو 32 bits بس."
       ]
      },
      {
       "why": "الـ [BP − 50] ده indexed addressing سليم: الـ BP زائد displacement (سالب)، والـ default segment هو الـ SS؛ والمحاضرة نفسها حاطة [BP−2] كمثال سليم (L4, Indexed addressing).",
       "ow": [
        "هي مش غلط: الـ BP واحد من الـ pointer registers الأربعة (BP, BX, SI, DI) ومسموح تطرح displacement، فالـ move سليمة (والـ segment هو الـ SS).",
        null
       ]
      },
      {
       "why": "مينفعش تنقل داتا مباشرة من segment register لـ segment register تاني؛ والـ MOV SS, CS هي نفسها مثال المحاضرة على instruction غلط (L3, rule 2).",
       "ow": [
        null,
        "هي فعلًا غلط: النقل من segment لـ segment لازم يعدي على general register في النص، زي MOV AX, CS وبعدين MOV SS, AX."
       ]
      },
      {
       "why": "الـ segment registers هما CS, DS, ES, SS (وكمان FS, GS من الـ 80386 وطالع)؛ الـ DI والـ SI دول index (general purpose) registers، مش segment registers (L2).",
       "ow": [
        "غلط عشان الـ DI والـ SI دول general purpose index registers؛ اللي segment registers من اللستة دي هما SS, CS, DS, ES بس.",
        null
       ]
      },
      {
       "why": "الـ default segment ينفع يتعمله override لو كتبت segment تاني قبل الـ offset، زي:<pre>MOV BL, ES:[1234H]\nMOV AX, DS:[BP]</pre>(من <bdi dir=\"ltr\">L3, Segment overriding</bdi>)",
       "ow": [
        "الـ segment overriding معمول مخصوص عشان يغيّر الـ default segment، زي:<pre>MOV AL, CS:[BX]</pre>بتستخدم الـ CS بدل الـ DS.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ PROM: الداتا بتتكتب في الـ chip قبل ما تتركّب في الـ circuit، مرة واحدة بس، باستخدام PROM programmer.<br>الـ EPROM: الداتا ممكن تتكتب تاني بإنك تشيل الـ chip، وتمسحها بالـ ultraviolet light من خلال شباك شفاف، وتبرمجها تاني في PROM programmer؛ بتستخدم في الـ prototypes والإنتاج الصغير."
      },
      {
       "ans": "العنوان:<span class=\"ltr\">DS×10 + DI = 20A00 + 2000 = <b>22A00</b></span>الـ EAX بياخد الـ 4 bytes من 22A00 لـ 22A03. الـ SS والـ BP مش مستخدمين."
      }
     ]
    },
    {
     "items": [
      {
       "why": "حسب جدول المحاضرة: الـ debugger سهل في التشغيل، الـ overhead بتاعه قليل، قريب من الـ machine، وكويس مع البرامج القصيرة (L1, Debugger vs. Assembler).",
       "ow": [
        null,
        "الـ debugger سهل في التشغيل؛ «صعب في التشغيل» ده عمود الـ assembler.",
        "«كويس مع البرامج الطويلة» ده الـ assembler؛ الـ debugger كويس مع البرامج القصيرة (الصغيرة).",
        "صعب في التشغيل وكويس مع البرامج الطويلة ده وصف الـ assembler، عكس الـ debugger."
       ]
      },
      {
       "why": "الـ PC (program counter) بيشيل الـ address بتاع الـ instruction الجاية اللي هتتجاب؛ وده user-invisible control register زيه زي الـ IR والـ MAR والـ MBR (L2).",
       "ow": [
        "الـ general purpose registers هما EAX…ESI وبيتستخدموا في الحسابات ونقل الداتا؛ الـ PC الـ programmer مايقدرش يشاور عليه.",
        "الـ user-visible registers هما الـ general والـ special purpose والـ segment registers؛ الـ PC متحط مع الـ user-invisible.",
        null,
        "الـ special purpose registers هما الـ EIP والـ EFLAGS (ودول user visible)؛ الـ PC تبع مجموعة الـ user-invisible."
       ]
      },
      {
       "why": "الـ MOV DS, ES معناها من segment register لـ segment register، وده ممنوع في instruction واحدة؛ لازم تعدي على general register (L3, rule 2).",
       "ow": [
        null,
        "الـ MOV AX, CS سليمة: إنك تقرا الـ CS في general register مسموح؛ الممنوع بس إنك تغيّر الـ CS أو تنقل من segment لـ segment.",
        "الـ MOV EAX, ESP سليمة: اتنين <bdi dir=\"ltr\">32‑bit</bdi> general registers بنفس الـ size.",
        "الـ MOV BX, DX سليمة، ده register addressing بين اتنين <bdi dir=\"ltr\">16‑bit</bdi> general registers."
       ]
      },
      {
       "why": "الـ offset هنا 30 + BP، يعني مستخدم الـ BP، والـ default segment بتاعه هو الـ SS، فالـ memory operand في الـ stack segment (L4, Default segment rule).",
       "ow": [
        "الـ ES بيتستخدم بس لو كتبته override (أو مع الـ string destinations)؛ مع الـ BP الـ default هو الـ SS.",
        null,
        "الـ DS هو الـ default مع الـ BX أو الـ SI أو الـ DI أو constant؛ الـ BP الـ default بتاعه SS.",
        "الـ instruction سليمة: الـ destination هو memory 30[BP] والـ source هو register BX، وده indexed addressing بنفس الـ size (16 bits)."
       ]
      },
      {
       "why": "الـ general purpose registers التمانية هما الـ <bdi dir=\"ltr\">32‑bit</bdi> EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI، وبيتستخدموا أساسًا في الحسابات ونقل الداتا (L2).",
       "ow": [
        "الـ CS والـ DS دول <bdi dir=\"ltr\">16‑bit</bdi> segment registers، مش general purpose.",
        null,
        "الـ EFLAGS ده <bdi dir=\"ltr\">32‑bit</bdi> special purpose register (مع الـ EIP)، مش general purpose.",
        "مش «None»: الاختيار b صح، الـ EAX والـ EBX دول <bdi dir=\"ltr\">32‑bit</bdi> general purpose registers."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ [BP − 2] ده indexed addressing سليم (الـ BP مع displacement، والـ default segment هو الـ SS)، والـ AX حجمه 16 bits؛ والمحاضرة حاطة [<bdi dir=\"ltr\">BP-2</bdi>] كمثال سليم (L4).",
       "ow": [
        null,
        "هي سليمة: الـ BP ينفع يشيل offset ومسموح تطرح displacement؛ الـ word اللي عند SS×10 + BP − 2 بتتنسخ في الـ AX."
       ]
      },
      {
       "why": "فيها كمان EAX و EBX وغيرهم، و EIP و EFLAGS (L2).",
       "ow": [
        "غلط: الـ DI والـ SI دول general purpose، ومش هما بس الزيادة؛ الـ user-visible فيها كمان EAX و EBX… والـ special purpose EIP و EFLAGS.",
        null
       ]
      },
      {
       "why": "الـ AX والـ BX والـ CX والـ DX بس هما اللي ليهم أنصاص <bdi dir=\"ltr\">8‑bit</bdi> (زي الـ AH والـ AL…)؛ الـ ESI مالوش أجزاء byte، ومفيش حاجة اسمها SH أو SL، فبيتستخدم SI (16) أو ESI (32) بس (من <bdi dir=\"ltr\">L2</bdi>).",
       "ow": [
        "مفيش SH ولا SL أصلًا: الـ SI والـ DI والـ SP والـ BP مالهمش أنصاص <bdi dir=\"ltr\">8‑bit</bdi>، عكس الـ AX والـ BX والـ CX والـ DX.",
        null
       ]
      },
      {
       "why": "الـ default segment ينفع يتعمله override لو كتبت segment prefix، زي:<pre>MOV BL, ES:[1234H]</pre>بتستخدم الـ ES بدل الـ DS (من <bdi dir=\"ltr\">L3, Segment overriding</bdi>).",
       "ow": [
        null,
        "الـ overriding مسموح وده موضوع في المحاضرة، الاتنين دول:<pre>MOV AL, CS:[BX]\nMOV AX, DS:[BP]</pre>بيغيّروا الـ default segment."
       ]
      },
      {
       "why": "فيها غلطتين: الـ MOV مينفعش تنقل من memory لـ memory، والـ AX مينفعش يتستخدم كـ pointer (بس الـ BX, BP, SI, DI)؛ والمحاضرة حاطة MOV [AX], [5000H] كمثال غلط (L3).",
       "ow": [
        "هي غلط: الـ operands الاتنين memory locations (وده ممنوع غير في الـ string instructions)، وكمان [AX] مش pointer سليم.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ EPROM: بتتمسح بإنك تشيل الـ chip وتعرّضها لـ UV light (من الشباك الشفاف)، وتتبرمج تاني بـ PROM programmer؛ للـ prototypes والإنتاج الصغير.<br>الـ EEPROM: بتتكتب تاني كهربائيًا والـ chip على الـ circuit board، بس الكتابة بطيئة؛ وفيها الـ firmware زي الـ BIOS عشان يتعمله update."
      },
      {
       "ans": "العنوان:<span class=\"ltr\">DS×10 + DI = 21B00 + 1000 = <b>22B00</b></span>والـ BX بياخد الـ word اللي عند 22B00 (BL) و 22B01 (BH)."
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
       "ans": "الـ Debugger: سهل في التشغيل، برامج الـ overhead بتاعها قليل، قريب من الـ machine، كويس مع البرامج القصيرة. الـ Assembler: صعب في التشغيل، الـ program overhead أكتر، معزول عن الـ machine، كويس مع البرامج الطويلة."
      },
      {
       "ans": "الجزء (i)، وجود BP معناه SS:<span class=\"ltr\">10000 + 111 + 1100 - 80 = <b>11191</b></span>والـ AL بياخد الـ byte اللي عند 11191.<br>الجزء (ii) بالـ DS:<span class=\"ltr\">20000 + 100 + 100 = <b>20200</b></span>والـ AX بياخد الـ word اللي عند 20200 (AL) و 20201 (AH)."
      },
      {
       "ans": "العنوان:<span class=\"ltr\">SS×10 + SP = 11000 + 200 = <b>11200</b></span>الـ <bdi dir=\"ltr\">POP&nbsp;AX</bdi> بتنسخ 2 bytes من قمة الـ stack:<span class=\"ltr\">AL = [SP] = <b>9C</b>, AH = [SP+1]</span>(الـ AH هو الـ byte اللي عند 11201، ومش مدّيينه في السؤال). والـ SP:<span class=\"ltr\">SP = 200 + 2 = <b>202</b></span>الـ <bdi dir=\"ltr\">[SP-1]</bdi> والـ <bdi dir=\"ltr\">[SP-2]</bdi> تحت قمة الـ stack ومش بيتقروا؛ والـ DS والـ SI والـ EBX والـ D والـ AX القديم كلهم تمويه."
      },
      {
       "ans": "العنوان:<span class=\"ltr\">ES×10 + DI = 2000 + 100 = <b>2100</b></span>والـ AB و CD و 12 و 34 بيتخزنوا من 2100؛ والـ <bdi dir=\"ltr\">DI&nbsp;=&nbsp;0FCH</bdi> (الـ slide كاتبة 96)."
      },
      {
       "ans": "العنوان:<span class=\"ltr\">10000 + 1000 = <b>11000</b></span>النتيجة:<span class=\"ltr\">BX = <b>127A</b>, DS = <b>3000</b></span>"
      },
      {
       "ans": "الـ <bdi dir=\"ltr\">MOV&nbsp;AX,&nbsp;5</bdi> صح.<br>الـ <bdi dir=\"ltr\">LDS&nbsp;AX,&nbsp;[DI]</bdi> صح.<br>الـ <b><bdi dir=\"ltr\">MOV&nbsp;DS,&nbsp;CS</bdi></b> غلط، النقل من segment لـ segment مش مسموح.<br>الـ <b><bdi dir=\"ltr\">MOV&nbsp;AL,&nbsp;SL</bdi></b> غلط، مفيش register اسمه SL (الـ SI مالوش أنصاص <bdi dir=\"ltr\">8‑bit</bdi>).<br>الـ STOSD صح (بتخزن EAX في <bdi dir=\"ltr\">ES:⁠[DI]</bdi>).<br>الـ <b><bdi dir=\"ltr\">MOV&nbsp;ECX,&nbsp;AX</bdi></b> غلط، الـ operands مختلفين في الحجم (32 و 16 bits)."
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ EEPROM (Electrically Erasable PROM) بيتكتب عليه تاني بالكهربا والـ chip لسه متركبة على الـ circuit board، بس الكتابة بطيئة؛ وبيتحط عليه firmware زي الـ BIOS (L1).",
       "ow": [
        "مفيش حاجة اسمها \"EROM\" في أنواع الـ memory اللي في المحاضرة (RAM, ROM, PROM, EPROM, EEPROM).",
        "الـ PROM بيتكتب مرة واحدة بس قبل ما يتركب، بـ PROM programmer، فماينفعش يتكتب عليه تاني وهو على الـ board.",
        null,
        "مش \"None\": الوصف ده هو تعريف الـ EEPROM في المحاضرة بالظبط."
       ]
      },
      {
       "why": "الـ MAR (Memory Address Register) شايل عنوان مكان في الـ memory؛ وهو من الـ user-invisible registers (L2, User-invisible registers).",
       "ow": [
        "الـ PC شايل عنوان الـ INSTRUCTION الجاية اللي هتتجاب، مش عنوان أي مكان في الـ memory للـ data.",
        "الـ MBR شايل الـ data word اللي هتتكتب في الـ memory أو آخر واحدة اتقرت، مش العنوان.",
        "الـ IR شايل آخر instruction اتجابت، مش عنوان في الـ memory.",
        null
       ]
      },
      {
       "why": "الـ C هو الـ carry flag (CF): بيبقى set لما نتيجة عملية unsigned تبقى أكبر من إنها تتشال في الـ destination (L2, EFLAGS bits).",
       "ow": [
        null,
        "مفيش \"control bit\" اسمه C؛ الـ control flag في الـ EFLAGS هو الـ DF (direction). الـ C ده status flag وهو الـ Carry.",
        "الـ bits بتاعة الـ EFLAGS بتوصف النتايج والتحكم في الـ CPU؛ مفيش code segment bit. الـ CS ده segment register لوحده.",
        "مش \"None\": الـ C في الـ EFLAGS معناه الـ carry bit."
       ]
      },
      {
       "why": "الـ EBX والـ EDX general purpose؛ والـ EIP والـ EFLAGS special purpose (L2).",
       "ow": [
        "الـ CS والـ DS دول <bdi dir=\"ltr\">16‑bit</bdi> segment registers، مش general purpose.",
        null,
        "الـ ES ده segment register، فالاتنين مش general purpose (الـ BX general purpose، بس كجزء الـ <bdi dir=\"ltr\">16‑bit</bdi> من الـ EBX).",
        "الـ EIP والـ EFLAGS دول الـ <bdi dir=\"ltr\">32‑bit</bdi> special purpose registers، مجموعة تانية غير الـ general purpose."
       ]
      },
      {
       "why": "تغيير قيمة الـ CS بالـ MOV مش مسموح، فالـ MOV CS, AX بتعمل error؛ إنما القراية من الـ CS (MOV AX, CS) عادي (L3, rule 3).",
       "ow": [
        null,
        "الـ MOV EAX, EBP سليمة: اتنين <bdi dir=\"ltr\">32‑bit</bdi> general purpose registers من نفس الحجم.",
        "الـ MOV CX, [SI] سليمة، ده register indirect addressing: الـ word اللي عند DS×10 + SI بتتنقل للـ CX.",
        "الـ <bdi dir=\"ltr\">POP&nbsp;AX</bdi> سليمة: بتنسخ الـ word اللي عند <bdi dir=\"ltr\">SS:⁠[SP]</bdi> في الـ AX، وبعدين تزوّد SP بـ 2."
       ]
      },
      {
       "why": "الـ <bdi dir=\"ltr\">POP&nbsp;AX</bdi> بتنسخ الـ word اللي عند <bdi dir=\"ltr\">SS:⁠[SP]</bdi> في الـ AX، وبعدين تزوّد SP بـ 2:<span class=\"ltr\">SP = 160 + 2 = 162</span>والـ SS عمره ما بيتغير (والـ BX مجرد تشتيت) (من <bdi dir=\"ltr\">L5, POP</bdi>).",
       "ow": [
        "الـ PUSH والـ POP عمرهم ما بيغيروا الـ SS؛ اللي بيتحرك الـ SP بس. الـ 1402 جاية من إنك زوّدت 2 على الـ SS بدل الـ SP.",
        "الـ <bdi dir=\"ltr\">SP&nbsp;−&nbsp;2&nbsp;=&nbsp;158</bdi> ده اللي <bdi dir=\"ltr\">PUSH&nbsp;AX</bdi> كانت هتديه؛ الـ POP بتزوّد الـ SP.",
        "الـ POP مابتغيرش الـ SS، ومفيش حاجة بتتطرح منه؛ الـ 1398 دي خلط بين الـ SS والـ SP وكمان في الاتجاه.",
        null
       ]
      },
      {
       "why": "الـ LODS بتقرا الـ source string من <bdi dir=\"ltr\">DS:⁠[SI]</bdi> وتحطه في AL أو AX أو EAX، وبعدين تحرك الـ SI بـ 1 أو 2 أو 4 حسب الـ D (من <bdi dir=\"ltr\">L7, Key rules</bdi>).",
       "ow": [
        "الـ SI هو الـ source pointer فعلًا، بس الـ segment بتاعه DS؛ الـ ES بيمشي مع الـ DI للـ destinations (STOS, INS).",
        "الـ <bdi dir=\"ltr\">ES:⁠[DI]</bdi> ده الـ DESTINATION اللي بتستخدمه الـ STOS والـ INS، مش الـ source اللي الـ LODS بتقرا منه.",
        null,
        "الـ DI هو الـ destination pointer وبيمشي مع الـ ES؛ الـ LODS بتستخدم الـ SI مع الـ DS."
       ]
      },
      {
       "why": "الاتنين operands أماكن في الـ memory، والنقل من memory لـ memory مش مسموح بالـ MOV (بس الـ string instructions هي اللي بتعمله)، فالـ MOV [DI], [SI] غلط (L3, L4).",
       "ow": [
        "مش هتنسخ أي حاجة: الـ MOV من memory لـ memory مش مسموحة، فالـ assembler هيرفضها.",
        "غير إن الـ MOV بتنقل من الـ source للـ destination (يعني لـ [DI])، الـ instruction أصلًا غلط عشان الاتنين operands memory.",
        "الـ MOV عمرها ما بتمسح الـ source، والـ instruction دي غلط أصلًا (memory لـ memory).",
        null
       ]
      },
      {
       "why": "أحسن اختيار موجود. الـ PUSHA في الحقيقة بتقلل SP بـ 16 byte (8 words)؛ الـ 32 byte دي بتاعة الـ PUSHAD (L5).",
       "ow": [
        "الـ PUSHA بتحط data على الـ stack، والـ stack بيكبر لتحت، فالـ SP بيـ DECREMENT، عمره ما بيزيد؛ وكمان بتحرك 8 words مش 32.",
        "تعليمات الـ PUSH بتقلل الـ SP؛ الـ 16 bytes هي الكمية الصح للـ PUSHA بس الاتجاه غلط.",
        "الـ PUSHA بتعمل push لـ 8 words (16 bytes)؛ والـ 32 WORDS يعني 64 bytes، أكتر بكتير من أي PUSHA أو PUSHAD.",
        null
       ]
      },
      {
       "why": "الـ OUTS بتقرا من <bdi dir=\"ltr\">DS:⁠[SI]</bdi>، فالـ SI هو اللي بيتغير؛ والـ OUTSD بتنقل double word (4 bytes) والـ <bdi dir=\"ltr\">D=1</bdi> معناها decrement:<span class=\"ltr\">SI = SI − 4</span>(من <bdi dir=\"ltr\">L7, String instruction summary</bdi>)",
       "ow": [
        "الـ OUTS بتستخدم الـ SI (الـ source) مش الـ DI؛ الـ DI بيتغير بس مع الـ STOS والـ INS. وكمان الـ D-suffix بيحرك 4 مش 2.",
        "الـ SI هو الـ register الصح والـ <bdi dir=\"ltr\">D=1</bdi> فعلًا بتعمل decrement، بس الـ OUTSD بتنقل 4 bytes؛ الـ <bdi dir=\"ltr\">−2</bdi> دي بتاعة الـ OUTSW.",
        null,
        "الـ DI مش بيستخدم في الـ OUTS، والـ <bdi dir=\"ltr\">D=1</bdi> بتقلل مش بتزوّد؛ الـ <bdi dir=\"ltr\">+2</bdi> دي تنفع مع INSW والـ <bdi dir=\"ltr\">D=0</bdi>."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "غلط. الـ zero flag (ZF) بيبقى SET يعني 1 لما نتيجة العملية تبقى صفر، وبيتعمله clear لـ 0 لما النتيجة مش صفر (L2, Flags).",
       "ow": [
        "الجملة غلط: الـ ZF بيبقى 1 لما النتيجة صفر، وبيبقى 0 لما النتيجة مش صفر.",
        null
       ]
      },
      {
       "why": "الـ LES بتقرا 4 bytes من DS×10 + DI: أول اتنين ([DI], [DI+1]) بيروحوا للـ register (الـ offset)، واللي بعدهم ([DI+2], [DI+3]) بيروحوا للـ ES (L6, LDS, LES, LSS).",
       "ow": [
        null,
        "الجملة صح: مثال المحاضرة LES BX, [DI] بيحمّل الـ BX من أول 2 bytes والـ ES من الـ 2 اللي بعدهم."
       ]
      },
      {
       "why": "الـ PC شايل عنوان الـ instruction الجاية (L2).",
       "ow": [
        "غلط: الـ PC شايل عنوان الـ instruction الجاية اللي هتتجاب؛ مش بيعد الـ instructions اللي اتنفذت.",
        null
       ]
      },
      {
       "why": "الـ segment registers هما CS و DS و ES و SS (و FS و GS من 80386 وطالع)؛ أما الـ DI والـ SI فدول general purpose index registers، مش segment registers (L2).",
       "ow": [
        "غلط عشان الـ DI والـ SI general purpose index registers؛ اللي segment registers هنا CS و DS و ES و SS بس.",
        null
       ]
      },
      {
       "why": "الـ IP بياخد القيمة الجديدة كنتيجة لتنفيذ الـ jump (L8). السؤال فيه شك: الجملة مبهمة.",
       "ow": [
        "حسب المحاضرة، الـ IP بياخد قيمته الجديدة <bdi dir=\"ltr\">(IP&nbsp;+&nbsp;displacement)</bdi> كنتيجة لتنفيذ الـ jump، مش قبله؛ والسلايدز بتقول:<span class=\"ltr\">IPnew = IP + [CS+1]</span>",
        null
       ]
      },
      {
       "why": "الـ override للـ SS الـ default بتاع BP بـ DS مسموح (L4).",
       "ow": [
        "هي مش غلط: إنك تعمل override للـ segment الـ default بتاع BP (الـ SS) بـ DS ده مسموح، والمحاضرة بتدي ده كمثال:<pre>MOV AX, DS:[BP]</pre>",
        null
       ]
      },
      {
       "why": "ده الـ far jump؛ الـ near jumps 3 bytes بس (L8).",
       "ow": [
        "الـ near jumps طولها 3 bytes بس (opcode + displacement من 2 bytes) وبتفضل في نفس الـ segment؛ الـ bytes الرابع والخامس اللي فيهم الـ segment دول بتوع الـ far jump.",
        null
       ]
      },
      {
       "why": "مفيش LCS؛ والوصف ده بتاع الـ LSS (L6).",
       "ow": [
        "مفيش instruction اسمها LCS (الـ CS ماينفعش يتحمّل بالطريقة دي)؛ تحميل register والـ SS بـ offset و segment ده شغل الـ LSS.",
        null
       ]
      },
      {
       "why": "الـ Assembly بتبقى hardware dependent: كل نوع CPU ليه الـ machine language والـ assembly language بتوعه، فالبرنامج المكتوب لنوع CPU مش هيشتغل على نوع تاني (L1).",
       "ow": [
        null,
        "الجملة صح: الـ CPUs بتاعة الشركات المختلفة محتاجة assemblers و assembly languages مختلفة."
       ]
      },
      {
       "why": "الـ LDS AX, [DI] بتحمّل الـ AX من أول 2 bytes عند DS×10 + DI، والـ DS من الـ 2 اللي بعدهم، فالـ DS بيتغير (L6, LDS, LES, LSS).",
       "ow": [
        null,
        "الـ LDS بتغير الاتنين: الـ register والـ DS؛ في مثال المحاضرة <bdi dir=\"ltr\">LDS&nbsp;BX,&nbsp;[DI]</bdi> بيخلي <bdi dir=\"ltr\">DS&nbsp;=&nbsp;3C00</bdi>."
       ]
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
       "ans": "الرسمة: الـ CPU (الـ registers والـ ALU والـ CU والـ clock)، والـ memory storage unit، واتنين <bdi dir=\"ltr\">I/O</bdi> devices، ومتوصلين بالـ data والـ control والـ address buses.<br>الـ <b>IR</b>: فيه آخر instruction اتجابت.<br>الـ <b>MAR</b>: فيه عنوان location في الـ memory. (الـ key الرسمي نقل تعريف الـ MBR هنا بالغلط.)"
      },
      {
       "ans": "العنوان:<span class=\"ltr\">DS×10 + DI = 20A00 + 3000 = <b>23A00</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "جدول المحاضرة: الـ assembler صعب في التشغيل، الـ program overhead بتاعه أكبر، بعيد عن الـ machine، وبيبقى كويس مع البرامج الطويلة (L1, Debugger vs. Assembler).",
       "ow": [
        "سهل التشغيل وكويس مع البرامج الصغيرة ده عمود الـ debugger، يعني عكس الـ assembler بالظبط.",
        "الـ assembler فعلًا صعب في التشغيل، بس هو كويس مع البرامج الطويلة؛ البرامج القصيرة دي نقطة قوة الـ debugger.",
        "الـ assembler كويس مع البرامج الطويلة آه، بس هو صعب في التشغيل؛ كلمة \"easy to run\" دي بتوصف الـ debugger.",
        null
       ]
      },
      {
       "why": "الـ general purpose registers التمانية الـ <bdi dir=\"ltr\">32‑bit</bdi> هما EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI، وبيتستخدموا أساسًا في العمليات الحسابية ونقل الداتا (L2).",
       "ow": [
        "الـ CS والـ DS دول segment registers حجمهم <bdi dir=\"ltr\">16‑bit</bdi>، مش general purpose.",
        "الـ EFLAGS ده special purpose register حجمه <bdi dir=\"ltr\">32‑bit</bdi> (هو والـ EIP)، مش general purpose.",
        null,
        "مش \"None\": اختيار c صح، الـ ECX والـ EDX general purpose registers حجمهم <bdi dir=\"ltr\">32‑bit</bdi>."
       ]
      },
      {
       "why": "الـ MOV مابتسمحش بنقل من memory لـ memory (ده بس في الـ string instructions)، فماينفعش الاتنين operands يبقوا memory locations (من <bdi dir=\"ltr\">L3, Register addressing and its restrictions</bdi>).",
       "ow": [
        "الـ register لـ register ده الـ register addressing، وده أشهر شكل سليم، زي MOV AX, BX (بنفس الحجم).",
        null,
        "الـ memory مع register سليمة (<bdi dir=\"ltr\">direct/displacement</bdi> addressing)، زي:<pre>MOV CL, [123H]\nMOV [DI], AX</pre>",
        "الـ immediate data كـ SOURCE والـ destination register ده immediate addressing سليم، زي MOV AX, 44H (الممنوع بس إن الـ destination يبقى immediate)."
       ]
      },
      {
       "why": "الـ offset هنا 50 + BP، يعني بنستخدم BP، والـ default segment بتاعه SS، فالـ operand بيتقري من الـ stack segment (L4, Default segment rule).",
       "ow": [
        null,
        "الـ CS بيتستخدم بس في جلب الـ instructions (مع IP) أو لما تكتبه override؛ والـ BP الـ default بتاعه SS.",
        "الـ DS هو الـ default مع BX أو SI أو DI أو constant، مش مع BP؛ وكمان الـ 50 ده displacement بيتجمع على BP، مش محتوى الـ DS.",
        "الـ ES بيتستخدم بس كـ override أو للـ string destinations (STOS, INS)؛ مع BP الـ default بيبقى SS."
       ]
      },
      {
       "why": "الـ PROM يعني Programmable Read Only Memory: الداتا بتتكتب مرة واحدة بس، قبل ما الـ chip تتركب، باستخدام PROM programmer (من <bdi dir=\"ltr\">L1, Types of memory</bdi>).",
       "ow": [
        null,
        "الـ PROM بعد ما تتبرمج بتبقى read ONLY؛ إنك تقرا وتكتب بأي ترتيب ده وصف الـ RAM.",
        "حرف الـ P معناه Programmable (بتتكتب بـ PROM programmer)، مش Portable.",
        "مش \"None\": اختيار a هو الاسم الكامل للـ PROM بالظبط."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ AX, BX, CX, DX بس اللي ليهم أنصاص <bdi dir=\"ltr\">8‑bit</bdi>؛ الـ ESP ليه SP (16 bits) و ESP (32 bits) بس، ومفيش byte parts (L2, General purpose registers).",
       "ow": [
        null,
        "الجملة صح: الـ SI والـ DI والـ SP والـ BP مالهمش أنصاص <bdi dir=\"ltr\">8‑bit</bdi>، فالـ ESP ينفع يتستخدم 16 أو 32 bits بس."
       ]
      },
      {
       "why": "الـ segment registers هما CS, DS, ES, SS (و FS, GS من الـ 80386 وطالع)؛ أما DI و SI فدول general purpose index registers، مش segment registers (L2).",
       "ow": [
        "غلط، عشان الـ DI والـ SI general purpose index registers؛ في اللستة دي SS و CS و DS و ES بس هما الـ segment registers.",
        null
       ]
      },
      {
       "why": "الـ default segment ينفع تعمله override لو كتبت segment تاني قبل الـ offset، زي:<pre>MOV BL, ES:[1234H]\nMOV AX, DS:[BP]</pre>(من <bdi dir=\"ltr\">L3, Segment overriding</bdi>)",
       "ow": [
        "الـ segment overriding معمول أصلًا عشان يبدّل الـ default segment، زي:<pre>MOV AL, CS:[BX]</pre>اللي بتستخدم CS بدل DS.",
        null
       ]
      },
      {
       "why": "الـ [BP − 2] ده indexed addressing سليم: BP مطروح منه displacement، والـ default segment هو SS؛ والمحاضرة نفسها حاطة [<bdi dir=\"ltr\">BP-2</bdi>] في السليم (L4, Indexed addressing).",
       "ow": [
        "هي مش غلط: الـ BP واحد من الـ pointer registers الأربعة (BP, BX, SI, DI)، وينفع تطرح displacement، فالـ move سليمة.",
        null
       ]
      },
      {
       "why": "ماينفعش تنقل داتا مباشرة من segment register لـ segment register تاني؛ والـ MOV SS, CS هي المثال اللي المحاضرة نفسها جايباه لـ instruction غلط (L3, rule 2).",
       "ow": [
        null,
        "هي فعلًا غلط: النقل من segment لـ segment محتاج general register في النص، زي MOV AX, CS وبعدين MOV SS, AX."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الرسمة زي الـ Lecture 1.<br>الـ <b>PC</b>: فيه عنوان الـ instruction اللي هتتجاب.<br>الـ <b>MBR</b>: فيه word داتا هتتكتب في الـ memory أو آخر word اتقرا."
      },
      {
       "ans": "العنوان:<span class=\"ltr\">DS×10 + DI = 21B00 + 2000 = <b>23B00</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "جدول المحاضرة: الـ debugger سهل في التشغيل، الـ overhead بتاعه قليل، قريب من الـ machine، وبيبقى كويس مع البرامج القصيرة (L1, Debugger vs. Assembler).",
       "ow": [
        null,
        "الـ debugger سهل في التشغيل؛ \"difficult to run\" دي في عمود الـ assembler.",
        "جملة \"Good on long programs\" دي بتاعة الـ assembler؛ الـ debugger كويس مع البرامج القصيرة (الصغيرة).",
        "صعب في التشغيل وكويس مع البرامج الطويلة ده وصف الـ assembler، عكس الـ debugger."
       ]
      },
      {
       "why": "الـ general purpose registers التمانية هما الـ <bdi dir=\"ltr\">32‑bit</bdi> EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI؛ أما الـ EFLAGS فده special purpose (L2).",
       "ow": [
        "الـ CS والـ DS دول segment registers حجمهم <bdi dir=\"ltr\">16‑bit</bdi>، مش general purpose registers.",
        null,
        "الـ EFLAGS ده special purpose register حجمه <bdi dir=\"ltr\">32‑bit</bdi> (هو والـ EIP)، مش general purpose.",
        "مش \"None\": اختيار b صح، الـ EAX والـ EBX general purpose registers حجمهم <bdi dir=\"ltr\">32‑bit</bdi>."
       ]
      },
      {
       "why": "الـ MOV DS, ES بتنقل segment register لـ segment register تاني، وده مش مسموح في instruction واحدة؛ لازم تعدّي على general register (L3, rule 2).",
       "ow": [
        null,
        "الـ MOV AX, CS سليمة: إنك تقرا الـ CS في general register مسموح؛ الممنوع بس إنك تغيّر الـ CS أو تنقل من segment لـ segment.",
        "الـ MOV EAX, ESP سليمة: الاتنين general registers <bdi dir=\"ltr\">32‑bit</bdi> بنفس الحجم.",
        "الـ MOV BX, DX سليمة، register addressing بين اتنين general registers <bdi dir=\"ltr\">16‑bit</bdi>."
       ]
      },
      {
       "why": "الـ offset هنا 30 + BP، يعني بنستخدم BP، والـ default segment بتاعه SS، فالـ destination اللي في الـ memory بيبقى في الـ stack segment (L4, Default segment rule).",
       "ow": [
        "الـ ES بيتستخدم بس لما تكتبه override (أو للـ string destinations)؛ مع BP الـ default بيبقى SS.",
        "الـ CS بيتستخدم لجلب الـ instructions مع IP، مش للداتا اللي بنوصلها عن طريق BP.",
        null,
        "الـ DS هو الـ default مع BX أو SI أو DI أو constant، مش مع BP؛ وكمان الـ 30 ده displacement بيتجمع على BP، مش محتوى الـ DS."
       ]
      },
      {
       "why": "الـ EPROM يعني Erasable Programmable Read Only Memory؛ ومفيش اختيار مطابق بالظبط (من <bdi dir=\"ltr\">L1</bdi>).",
       "ow": [
        "حرف الـ E معناه Erasable (بيتمسح بالـ UV light)، مش Electrically؛ كلمة \"electrically\" دي بتاعة الـ EEPROM.",
        "الـ EPROM دي read ONLY memory، فكلمة \"read write\" بتخلي الاسم ده غلط.",
        "حرف الـ P معناه Programmable، مش Portable، فالاسم ده غلط.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ [BP − 2] ده indexed addressing سليم (BP مع displacement، والـ default segment هو SS)، والـ AX حجمه 16 bits؛ والمحاضرة حاطة [<bdi dir=\"ltr\">BP-2</bdi>] في السليم (L4).",
       "ow": [
        null,
        "هي صح: الـ word اللي عند SS×10 + BP − 2 بيتنسخ في AX؛ والـ BP ينفع يشيل offset وينفع تطرح منه displacement."
       ]
      },
      {
       "why": "الـ user-visible registers فيها الـ general purpose (EAX…ESI) والـ special purpose (EIP, EFLAGS) والـ segment registers (CS, DS, ES, SS)، مش اللستة دي بس (L2).",
       "ow": [
        "غلط: الـ user-visible registers فيها كمان EAX, EBX, ECX, EDX, EBP, ESP والـ special purpose EIP و EFLAGS، فكلمة \"only\" هي اللي بوّظت الجملة.",
        null
       ]
      },
      {
       "why": "ده الـ segment overriding: لما تكتب segment قبل الـ offset بيحل محل الـ default، زي:<pre>MOV BL, ES:[1234H]</pre>اللي بتستخدم ES بدل DS (من <bdi dir=\"ltr\">L3, Segment overriding</bdi>).",
       "ow": [
        null,
        "الجملة صح: ده تعريف المحاضرة للـ segment overriding بالظبط، زي:<pre>MOV AL, CS:[BX]</pre>"
       ]
      },
      {
       "why": "الـ AX, BX, CX, DX بس اللي ليهم أنصاص <bdi dir=\"ltr\">8‑bit</bdi>؛ الـ ESI مالوش byte parts (مفيش حاجة اسمها SH أو SL)، فبيتستخدم SI (16) أو ESI (32) بس (L2).",
       "ow": [
        "الـ SH والـ SL مش موجودين أصلًا: الـ SI والـ DI والـ SP والـ BP مالهمش أنصاص <bdi dir=\"ltr\">8‑bit</bdi>، على عكس الـ AX والـ BX والـ CX والـ DX.",
        null
       ]
      },
      {
       "why": "فيها غلطتين: الـ MOV ماينفعش تنقل memory لـ memory، والـ AX ماينفعش يتستخدم كـ pointer (بس BX, BP, SI, DI)؛ والمحاضرة حاطة MOV [AX], [5000H] في الغلط (L3).",
       "ow": [
        "هي غلط: الاتنين operands memory locations (وده ممنوع غير في الـ string instructions)، وكمان [AX] مش pointer سليم.",
        null
       ]
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
       "ans": "الـ Debugger: سهل في التشغيل، overhead قليل، قريب من الـ machine، كويس مع البرامج القصيرة. الـ Assembler: صعب في التشغيل، overhead أكتر، معزول عن الـ machine، كويس مع البرامج الطويلة."
      },
      {
       "ans": "مجموعة أسلاك متوازية بتنقل الداتا بين أجزاء الكمبيوتر. الـ Data bus: بينقل الـ instructions والداتا بين الـ CPU والـ memory. الـ Control bus: فيه binary signals بتعمل synchronize لكل الأجهزة اللي على الـ system bus. الـ Address bus: بينقل الـ addresses بتاعة الـ instructions والداتا."
      },
      {
       "ans": "دي registers مبرمج الـ assembly مايقدرش يكتب فيها: الـ PC (عنوان الـ instruction اللي هتتجاب)، والـ IR (آخر instruction اتجابت)، والـ MAR (عنوان memory location)، والـ MBR (word هيتكتب في الـ memory أو آخر word اتقرا)."
      },
      {
       "ans": "الـ <bdi dir=\"ltr\">100[BX][DI]</bdi> بيبقى:<span class=\"ltr\">10000 + 100 + CD01 + 150 = <b>1CF51</b></span>والـ <bdi dir=\"ltr\">[BX][DI]</bdi> بيبقى:<span class=\"ltr\">10000 + CD01 + 150 = <b>1CE51</b></span>"
      },
      {
       "ans": "العنوان:<span class=\"ltr\">3000 + 1234 = <b>4234</b></span>النتيجة:<span class=\"ltr\">EAX = <b>44332211</b>, SP = <b>1238</b></span>"
      },
      {
       "ans": "العنوان:<span class=\"ltr\">A0000 + 200 = <b>A0200</b></span>النتيجة:<span class=\"ltr\">BX = <b>1AB2</b>, ES = <b>3C00</b></span>"
      },
      {
       "ans": "العنوان:<span class=\"ltr\">10000 + 1000 = <b>11000</b></span>النتيجة:<span class=\"ltr\">AX = <b>CDAB</b>, SI = <b>1002</b></span>"
      },
      {
       "ans": "العنوان:<span class=\"ltr\">2000 + 100 = <b>2100</b></span>الـ bytes اللي هي <bdi dir=\"ltr\">AB&nbsp;CD&nbsp;12&nbsp;34</bdi> بتتخزن من 2100؛ والـ DI:<span class=\"ltr\">DI = 100H - 4 = <b>0FCH</b></span>(الـ key كاتب 96)."
      },
      {
       "ans": "العنوان <b>11000</b>، والنتيجة:<span class=\"ltr\">BX = <b>127A</b>, DS = <b>3000</b></span>"
      },
      {
       "ans": "الـ Short:<span class=\"ltr\">10000 + 300 + 04 = <b>10304</b></span>الـ Near:<span class=\"ltr\">10000 + 300 + 0204 = <b>10504</b></span>الـ Far:<span class=\"ltr\">A4300 + 0204 = <b>A4504</b></span>"
      },
      {
       "ans": "الـ Short بيطلع <b>2031C</b>. والـ Near بيطلع <b>2231C</b>. والـ Far:<span class=\"ltr\">2DA00 + 201C = <b>2FA1C</b></span>"
      },
      {
       "ans": "الجزء (i):<span class=\"ltr\">20000 + 101 + 120 = <b>20221</b></span>الجزء (ii):<span class=\"ltr\">20000 + 101 + 1200 - 100 = <b>21201</b></span>الجزء (iii):<span class=\"ltr\">22000 + 1200 + BC = <b>232BC</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ Register: مكان تخزين مؤقت سريع جدًا جوه الـ CPU. الـ Bus: أسلاك متوازية (data و control و address). الـ User visible: دي registers الـ machine language تقدر تشاور عليها، بتستخدم عشان تقلل الرجوع للـ memory. الـ EIP: عنوان الـ instruction الجاية. الـ EFLAGS: فيها bits بتتحكم في الـ CPU أو بتعكس النتايج. الـ ZF: النتيجة صفر؛ والـ CF: نتيجة unsigned أكبر من الـ destination؛ والـ SF: النتيجة سالبة؛ والـ OF: النتيجة أكبر أو أصغر من الـ destination. الـ PC والـ IR والـ MAR والـ MBR زي الـ Lecture 2. الـ Segment overriding: إنك تستخدم segment غير الـ default، زي:<pre>MOV BL, ES:[1234H]</pre>"
      },
      {
       "ans": "الإجابة: (a) <b>11620</b>، و(b) <b>11800</b>، و(c) <b>11700</b>."
      },
      {
       "ans": "كلهم بالـ SS، الإجابة: (a) <b>15700</b>، و(b) <b>15400</b>، و(c) <b>15600</b>."
      },
      {
       "ans": "العنوان:<span class=\"ltr\">2000 + 0100 = 2100</span>الـ bytes:<span class=\"ltr\">[20FF]=00, [20FE]=00, <b>[20FD]=AB (AH)</b>, <b>[20FC]=CD (AL)</b></span>والـ SP:<span class=\"ltr\">SP = <b>00FC</b></span>"
      },
      {
       "ans": "الـ <bdi dir=\"ltr\">MOV&nbsp;EBX,&nbsp;AX</bdi> فيها الحجم مش متساوي. والـ <bdi dir=\"ltr\">MOV&nbsp;CS,&nbsp;DS</bdi> ماينفعش تغيّر CS (وكمان من segment لـ segment). والاتنين التانيين صح."
      }
     ]
    }
   ]
  }
 ]
};

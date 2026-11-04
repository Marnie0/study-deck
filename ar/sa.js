// Egyptian Arabic for Systems Analysis and Design, aligned item by item with sa.js and extra/sa.js.
window.AR = window.AR || {};
AR.sa = {
 "lectures": {
  "1": {
   "notes": [
    {
     "h": "خطة المادة (الـ chapters اللي في خطة الدكتور)",
     "pts": [
      "الفصول من 1 لـ 4:<span class=\"ltr\">Ch 1: Introduction to Information Systems</span><span class=\"ltr\">Ch 2: The Systems Development Environment</span><span class=\"ltr\">Ch 3: Managing the Information Systems Project</span><span class=\"ltr\">Ch 4: Structuring System Process Requirements (DFDs)</span>",
      "الفصول من 5 لـ 9:<span class=\"ltr\">Ch 5: Analyzing Systems Using Data Dictionaries</span><span class=\"ltr\">Ch 6: Structuring System Logical Requirements</span><span class=\"ltr\">Ch 7: Database Design Using the E/R Model</span><span class=\"ltr\">Ch 8: Designing Forms and Reports</span><span class=\"ltr\">Ch 9: Designing Interfaces and Dialogues</span>",
      "اللي اتدرّس واتسأل فيه فعلًا: من Ch 1 لـ Ch 4 ومعاهم الموضوعين الحسابيين <b>COCOMO</b> و<b><bdi dir=\"ltr\">CPM/PERT</bdi></b>. كل final ليه نفس الهيكل: <b>مسألة <bdi dir=\"ltr\">PERT/Gantt</bdi></b>، و<b>مسألة COCOMO</b>، وسؤال <b>\"طلّع 10 errors على الأقل في الـ DFDs دي\"</b>، وتعريفات/توصيل، وأسئلة essay قصيرة (مراحل الـ SDLC، والـ project management process، والـ DFD balancing، والـ CASE)."
     ]
    },
    {
     "h": "يعني إيه information system؟",
     "pts": [
      "الـ <b>Information system</b> (ملخص طالب من الكتاب) هو <b>conceptual system</b> بيخلّي المديرين <b>يتحكموا ويراقبوا (control and monitor)</b> الـ <b>physical systems</b> بتاعة الشركة اللي بتحوّل الـ <b>input resources</b> لـ <b>output resources</b>.",
      "الـ <b>essential feature</b> للـ information system هي استخدام <b>ورق أو data records عشان تمثّل حركة أو حالة أو وجود objects</b> في system تاني (physical). الـ objects دي ممكن تبقى حاجات مادية أو abstractions.",
      "الـ information system هو <b>model (أو representation)</b> للـ physical system، بيستخدم <b>symbols</b> (زي أسامي الحاجات والأرقام) بدل الحاجات نفسها.",
      "تعريف الـ lab: مجموعة <b>interrelated components</b> بت<b>جمع، وتعالج وتخزن، وتطلّع كـ output</b> المعلومات اللي محتاجينها عشان نخلص business task. أمثلة: سيستم تسجيل المواد، سيستم الطلبات أونلاين، الـ online banking.",
      "الـ <b>System</b> يعني مجموعة عناصر مرتبطة ببعض (interrelated). الـ <b>Purposive system</b> يعني system بيسعى لمجموعة goals مرتبطة ببعض. الـ <b>Open system</b> يعني system بيتفاعل مع environment (الـ user يكتب command والكمبيوتر يرد بعرض داتا).",
      "يبقى الـ <b>information system هو open, purposive system</b> بيطلّع information باستخدام دورة الـ <b><bdi dir=\"ltr\">input&nbsp;/&nbsp;process&nbsp;/&nbsp;output</bdi></b>."
     ],
     "figH": {
      "sa-l1-firm-system": "الـ physical system بتاع الشركة، والـ information system بيتحكم فيه ويراقبه (الـ <bdi dir=\"ltr\">Figure 1.7</bdi>)",
      "sa-l1-open-system": "الـ system والـ purposive system والـ open system، ودورة الـ <bdi dir=\"ltr\">input / process / output</bdi>"
     }
    },
    {
     "h": "الـ physical system مقابل الـ information system (مثال المخزن)",
     "figH": {
      "sa-l1-warehouse": "جرّب: حرّك البضاعة في المخزن وشوف الـ information system بيمثّلها إزاي"
     }
    },
    {
     "h": "الـ physical والـ information systems كـ subsystems من المنظمة",
     "pts": [
      "مع إن الـ information system هو <b>model</b> للـ physical system، إلا إنه كمان <b>بيتفاعل</b> معاه.",
      "الاتنين ينفع نعتبرهم <b>subsystems من organization system أكبر</b>.",
      "الـ <b>Inputs</b> اللي داخلة للـ information system من الـ physical system غالبًا بتبقى <b>observations</b> (زي العدد الفعلي للكراتين اللي على الرف).",
      "الـ <b>Outputs</b> اللي خارجة من الـ information system للـ physical system بتبقى <b>actions needed</b> (زي الـ shipping note، معناها أمر إن بضاعة معينة تتحمّل على عربية وتروح لمكان معين)."
     ],
     "figH": {
      "sa-l1-subsystems": "الاتنين subsystems جوه الـ organization، الـ observations داخلة والـ actions needed خارجة"
     }
    },
    {
     "h": "الـ components ودور الكمبيوتر",
     "pts": [
      "<b>مكونات (components) الـ information system</b> هي الـ <b>people والـ procedures والـ data</b>. الناس بتمشي على الـ procedures عشان تتعامل مع الداتا وتطلّع information.",
      "<b>مكونات الـ Computer-Based Information System (CBIS)</b> هي الـ <b>people والـ procedures والـ data والـ programs والـ computers</b>. الـ programs هي تعليمات للكمبيوتر زي ما الـ procedures تعليمات للناس.",
      "<b>دور الكمبيوتر في إنتاج الـ information</b> (جه في امتحان <bdi dir=\"ltr\">2024/25</bdi>):<br>أولاً، يبقى جهاز <b>data storage and retrieval</b>؛<br>ثانياً، يوفّر <b>processing capabilities</b> لإنتاج الـ information (حساب totals و averages ...)؛<br>ثالثاً، يبقى <b>communication device</b> يجيب داتا أو information من كمبيوترات تانية؛<br>رابعاً، <b>يعرض الـ information</b> في شكل tables و reports و charts و graphs ومستندات متنسقة."
     ],
     "figH": {
      "sa-l1-cbis": "الـ IS بـ 3 components قصاد الـ CBIS بـ 5 components"
     }
    },
    {
     "h": "الأنواع الأساسية للـ information systems"
    },
    {
     "h": "الـ TPS بالتفصيل",
     "pts": [
      "أمثلة: سيستمات <b>حجز التذاكر (ticket reservation)</b>، والـ <b>order entry</b>، والـ <b>accounts payable</b>، والـ <b>accounts receivable</b>، والـ <b>payroll processing</b>. كلهم بيساعدوا الشركة تمشّي شغلها وتتابع أنشطتها.",
      "الـ <b>event</b> ممكن يبقى طلب تذكرة حفلة، أو طلب order، أو تقديم شيك عشان يتصرف. الـ event بيتسجل بإنه يتكتب كـ <b>transaction</b>؛ يعني <b>الـ transaction هي representation للـ event</b>. وبرنامج TPS أو أكتر بيعالج الـ transaction على الـ <b>TPS data</b>.",
      "أمثلة TPS data: في حجز التذاكر هي أماكن الكراسي الفاضية؛ في الـ order entry هي لستة المنتجات المتاحة وأسعارها والداتا المرتبطة بيها؛ في الـ check processing هي أرصدة الحسابات ولستة العملاء وداتا تانية.",
      "الـ Model بتاع الـ TPS (الرسمة):<span class=\"ltr\">input physical resources → transform → output physical resources</span>الداتا بتيجي من الـ environment للـ data-processing software والـ database؛ والـ information بتروح للإدارة وترجع للـ environment."
     ],
     "figH": {
      "sa-l1-tps-event": "من الـ event للـ transaction للـ TPS data، في الأمثلة التلاتة",
      "sa-l1-tps-model": "الـ model بتاع الـ TPS خطوة بخطوة (الـ <bdi dir=\"ltr\">Figure 1.8</bdi>)"
     }
    },
    {
     "h": "الـ MIS والـ DSS بالتفصيل",
     "pts": [
      "<b>الـ MIS model</b> (Fig 1.9): الداتا من الـ environment بتدخل database؛ والـ <b>report-writing software</b> والـ <b>mathematical models</b> بيطلّعوا information للـ <b>organizational problem solvers</b>، اللي بيستخدموها كمساعدة في اتخاذ القرار.",
      "الشركات ممكن تتعامل مع الـ suppliers أو غيرهم ويعملوا <b>inter-organizational information systems (IOS)</b>، وفيها الـ MIS بيدّي information لباقي أعضاء الـ IOS بالإضافة لـ users الشركة نفسها.",
      "الـ <b>DSS</b> ليه تلات مصادر information: الـ <b>relational database</b>، والـ <b>knowledge base</b>، والـ <b>multidimensional database</b>. الـ Outputs (<bdi dir=\"ltr\">Fig&nbsp;1.10</bdi>) هي الـ periodic والـ special reports، والـ outputs من الـ mathematical models، والـ outputs من الـ groupware، والـ solutions and explanations (من الـ inference engine)، والـ outputs من الـ OLAP.",
      "نوعين زيادة من الـ software المرتبط بالـ DSS، هما الـ <b>Group Decision Support Systems</b> (بتساعد <b>مجموعة مديرين</b> يوصلوا لقرار مع بعض) والـ <b>Artificial Intelligence</b> (برنامج معمول للكمبيوتر عشان <b>يحلل مشكلة منطقيًا لوحده</b>)."
     ],
     "figH": {
      "sa-l1-mis-model": "الـ MIS model ومعاه الـ IOS (الـ <bdi dir=\"ltr\">Figure 1.9</bdi>)",
      "sa-l1-dss-model": "الـ DSS model، تلات مصادر information والـ outputs بتاعتها (الـ <bdi dir=\"ltr\">Figure 1.10</bdi>)"
     }
    },
    {
     "h": "المديرين كـ users للـ information system",
     "pts": [
      "المديرين موجودين في مستويات إدارية مختلفة وفي business areas مختلفة. <b>المستوى اللي الـ IS معمول له بيأثر على طريقة شغله.</b>",
      "<b>3 مستويات إدارة أساسية</b>: (1) مستوى الـ <b>Strategic planning</b>، و(2) مستوى الـ <b>Management control</b>، و(3) مستوى الـ <b>Operational control</b>.",
      "<b>المديرين بيعملوا إيه</b> (الـ management functions): الـ <b>Plan</b> يخططوا هيعملوا إيه، والـ <b>Organize</b> ينظموا عشان يحققوا الخطة، والـ <b>Staff</b> يملوا المنظمة بالـ resources، والـ <b>Direct</b> يوجهوهم ينفذوا الخطة، والـ <b>Control</b> يتحكموا في الـ resources ويخلوها ماشية في الطريق الصح.",
      "في <bdi dir=\"ltr\">Fig&nbsp;1.11</bdi>: المستوى الإداري بيأثر على <b>مصدر</b> الـ information (الـ strategic أغلبها <b>environmental</b>، والـ operational أغلبها <b>internal</b>) وعلى <b>شكلها</b> (الـ strategic <b>summary</b>، والـ operational <b>detail</b>).",
      "في <bdi dir=\"ltr\">Fig&nbsp;1.12</bdi>: فيه مديرين في كل المستويات وفي كل الـ business areas (الـ finance، والـ human resources، والـ information services، والـ manufacturing، والـ marketing).",
      "في <bdi dir=\"ltr\">Fig&nbsp;1.13</bdi>: المستوى بيأثر على الأهمية النسبية لكل function: مديرين الـ strategic بيصرفوا أغلب مجهودهم في الـ <b>planning</b> (والـ organizing)؛ ومديرين الـ operational في الـ <b>directing and controlling</b>."
     ],
     "figH": {
      "sa-l1-level-info": "المستوى الإداري قصاد مصدر الـ information وشكلها (الـ <bdi dir=\"ltr\">Figure 1.11</bdi>)",
      "sa-l1-level-areas": "مديرين في كل المستويات وفي كل الـ business areas (الـ <bdi dir=\"ltr\">Figure 1.12</bdi>)",
      "sa-l1-functions": "تركيز كل مستوى على الـ plan والـ organize والـ staff والـ direct والـ control (الـ <bdi dir=\"ltr\">Figure 1.13</bdi>)"
     }
    },
    {
     "h": "الـ Lab 1: الـ analysis مقابل الـ design، والـ analyst، وطرق الـ development",
     "pts": [
      "الـ <b>System analysis</b> هو فهم goals واستراتيجيات الـ business وتحديد الـ information requirements اللي بتدعمها. <b>مالوش علاقة بالـ programming</b>. الـ Analysis معناها دراسة <b>المشكلة والـ requirements</b> مش الحل.",
      "الـ <b>System design</b> هو <b>حل conceptual</b> بيحقق الـ requirements، مش الـ implementation.",
      "الـ <b>System analyst</b>: شخص business professional بيستخدم تقنيات الـ analysis والـ design عشان يحل مشاكل الـ business باستخدام الـ IT. دوره: investigate و analyze و design و develop و install و evaluate و maintain الـ IS بتاع الشركة؛ عنده business knowledge؛ بيحل مشاكل الـ business؛ وبيترجم الـ business requirements لـ IT projects.",
      "طريقتين: <b>Traditional (structured)</b> (الـ SADT، والـ information engineering) و<b>Object-oriented</b> (الـ OOA والـ OOD والـ OOP): الـ system عبارة عن مجموعة <b>objects</b> بتتفاعل مع بعض وبترد على messages؛ يعني مفيش processes ولا programs ولا data entities ولا files من الناحية الـ conceptual، فيه objects وبس.",
      "أنواع الـ UML diagrams: الـ <b>structural</b> (building blocks مابتتغيرش مع الوقت، زي الـ class diagram)، والـ <b>behavioral</b> (السيستم بيرد إزاي مع الوقت، زي الـ use case diagram)، والـ <b>interaction</b> (نوع من الـ behavioral بيوضح تبادل الـ messages، زي الـ sequence والـ collaboration diagrams). وفيه تقسيمة تانية: static و dynamic و functional."
     ],
     "figH": {
      "sa-l1-uml-kinds": "أنواع الـ UML diagrams، الـ structural والـ behavioral والـ interaction"
     }
    }
   ],
   "cards": [
    "هو conceptual system بيخلّي المديرين يتحكموا ويراقبوا الـ physical systems بتاعة الشركة اللي بتحوّل الـ input resources لـ output resources.",
    "استخدام ورق أو data records عشان تمثّل حركة أو حالة أو وجود objects في system تاني (physical).",
    "هو system بيسعى لمجموعة goals مرتبطة ببعض.",
    "هو system بيتفاعل مع environment (مثلًا الـ user يكتب command والكمبيوتر يعرض داتا).",
    "هو open, purposive system بيطلّع information باستخدام دورة الـ <bdi dir=\"ltr\">input/process/output</bdi>.",
    "الـ People والـ procedures والـ data.",
    "الـ People والـ procedures والـ data والـ programs والـ computers.",
    "الـ Observations (زي العدد الفعلي للكراتين اللي على الرف).",
    "الـ Actions needed (زي الـ shipping note: حمّل البضاعة على العربية).",
    "البضاعة اللي خارجة من المخزن.",
    "البضاعة اللي داخلة المخزن.",
    "الـ TPS، الـ MIS، الـ DSS، الـ Expert Systems، الـ Office Automation Systems.",
    "الشغل اليومي (day-to-day operations): الحجوزات، الـ order entry، الـ payables، الـ receivables، الـ payroll.",
    "هي representation لـ event، بتتسجل بإنها تتكتب في الـ computer system.",
    "الـ Report-writing software والـ mathematical models اللي بتعمل simulation لعمليات الشركة.",
    "الـ Relational database والـ knowledge base والـ multidimensional database.",
    "بيساعد مجموعة مديرين يوصلوا لقرار مع بعض.",
    "الـ Strategic planning والـ management control والـ operational control.",
    "الـ Plan والـ organize والـ staff والـ direct والـ control.",
    "الـ Data storage and retrieval؛ والـ processing؛ والـ communication؛ وعرض الـ information."
   ],
   "qa": [
    "الـ information system هو conceptual system بيخلّي المديرين يتحكموا ويراقبوا الـ physical systems بتاعة الشركة اللي بتحوّل الـ input resources لـ output resources. الـ essential feature بتاعته إنه بيستخدم ورق أو data records عشان يمثّل حركة أو حالة أو وجود الـ objects في الـ physical system؛ يعني هو model بيستخدم symbols (أسامي وأرقام) بدل الحاجات نفسها. مثال: في المخزن، الـ inventory بيمثّل البضاعة اللي على الرفوف، والـ bill بيمثّل البضاعة الداخلة، والـ shipping note بيمثّل البضاعة الخارجة. الاتنين subsystems من المنظمة وبيتفاعلوا: الـ inputs من الـ physical system للـ IS بتبقى observations (الكراتين الفعلية على الرف)، والـ outputs من الـ IS للـ physical system بتبقى actions needed (الـ shipping note بتقول حمّل البضاعة على العربية).",
    "1) يبقى جهاز data storage and retrieval. 2) يوفّر processing capabilities لإنتاج الـ information (حساب totals و averages ...). 3) يبقى communication device يجيب داتا أو information من كمبيوترات تانية. 4) يعرض الـ information في شكل tables و reports و charts و graphs ومستندات متنسقة.",
    "الأنواع: الـ TPS والـ MIS والـ DSS والـ Expert Systems والـ Office Automation Systems. الـ TPS بيجمع الداتا من الـ physical system بتاع الشركة ومن الـ environment ويدخّلها في الـ database بتاعته، وبعدين يحوّل الداتا لـ information للمديرين وغيرهم. بيدعم الشغل اليومي (حجز التذاكر، والـ order entry، والـ <bdi dir=\"ltr\">accounts payable/receivable</bdi>، والـ payroll). الـ event (طلب تذكرة، أو order، أو شيك متقدّم) بيتكتب كـ transaction، والـ transaction بتمثّل الـ event، وبرامج الـ TPS بتعالجها على الـ TPS data (الكراسي الفاضية؛ المنتجات والأسعار؛ أرصدة الحسابات ولستة العملاء).",
    "الـ MIS بيحوّل الداتا اللي في الـ frontline systems (الـ TPS) لـ information مفيدة للمديرين باستخدام report-writing software و mathematical models؛ والـ information دي بتساعد الـ organizational problem solvers، وممكن تتشارك في الـ inter-organizational systems. أما الـ DSS فبيساعد المديرين ياخدوا قرار في حل مشكلة معينة (specific problem)، وبيعتمد على relational database و knowledge base و multidimensional database، ومعاه software مرتبط زي الـ group DSS والـ artificial intelligence.",
    "الـ IS مكوّن من people و procedures و data؛ الناس بتمشي على الـ procedures عشان تتعامل مع الداتا وتطلّع information. الـ CBIS بيزوّد programs و computers، يعني people و procedures و data و programs و computers؛ والـ programs تعليمات للكمبيوتر زي ما الـ procedures تعليمات للناس.",
    "فيه تلات مستويات: strategic planning و management control و operational control. المستوى بيأثر على مصدر الـ information (الـ strategic بيستخدم أغلبه environmental، والـ operational أغلبه internal) وعلى شكلها (الـ strategic محتاج summaries، والـ operational محتاج detail). وكمان بيغيّر التركيز على الـ functions (الـ plan والـ organize والـ staff والـ direct والـ control)، فمديرين الـ strategic أغلب شغلهم planning، ومديرين الـ operational أغلبه directing و controlling."
   ],
   "quiz": [
    [
     "عرض المعلومات (جداول، و reports و charts و graphs و documents متنسّقة) ده الدور رقم 4 للكمبيوتر في إنتاج المعلومات، يعني هو فعلًا دور <bdi dir=\"ltr\">(L1, Role of the computer)</bdi>.",
     "الـ data storage and retrieval ده الدور رقم 1 للكمبيوتر، يعني هو دور فعلًا؛ اللي مش دور هو إنه «يستبدل الناس»، لأن الـ people بيفضلوا component من مكوّنات الـ CBIS.",
     "صح. الـ people لسه component في الـ CBIS؛ والأدوار الأربعة هي الـ <bdi dir=\"ltr\">storage/retrieval</bdi> والـ processing والـ communication وعرض الـ information.",
     "إن الكمبيوتر يشتغل كـ communication device يجيب data أو معلومات من كمبيوترات تانية ده الدور رقم 3 في لستة المحاضرة، يعني هو دور فعلًا."
    ],
    [
     "صح. الـ IS هو open, purposive system بيستخدم دورة الـ <bdi dir=\"ltr\">input/process/output</bdi>.",
     "الـ IS هو model للـ physical system، مش الـ physical system نفسه.",
     "هو conceptual فعلًا، بس open مش closed.",
     "الـ closed system مابيتفاعلش مع environment."
    ],
    [
     "الـ purchase order نفسه مستند رايح للـ supplier.",
     "البضاعة اللي جاية من الـ supplier بيمثّلها الـ bill (ومعاه الـ purchase order)، مش الـ shipping note (L1, warehouse example).",
     "البضاعة اللي على الرفوف دلوقتي بيمثّلها الـ inventory record؛ الـ shipping note بيمثّل البضاعة اللي خارجة للـ customer.",
     "صح. الـ shipping note بتمثّل البضاعة الخارجة، ومعناها action (حمّل العربية)."
    ],
    [
     "الـ actions needed دي الـ outputs من الـ IS للـ physical system، مش الـ inputs.",
     "صح. زي العدد الفعلي للكراتين اللي على الرف.",
     "الـ programs ده component في الـ CBIS، مش inputs جاية من الـ physical system.",
     "الـ decisions المديرين بياخدوها باستخدام الـ information، مش inputs بتتلاحظ."
    ],
    [
     "صح. الـ CBIS ليه خمس components: الـ people والـ procedures والـ data والـ programs والـ computers. الـ programs هي تعليمات للكمبيوتر زي ما الـ procedures تعليمات للناس <bdi dir=\"ltr\">(L1,&nbsp;Components)</bdi>.",
     "ده الـ processing cycle، مش الـ components.",
     "الـ people والـ procedures والـ data دول مكوّنات الـ information system العادي؛ الـ CBIS بيزوّد عليهم الـ programs والـ computers فيبقوا خمسة.",
     "دي لستة IT عامة، مش لستة الـ CBIS اللي في المحاضرة."
    ],
    [
     "الـ GDSS بيساعد مجموعة مديرين ياخدوا قرار.",
     "الـ DSS بيساعد في حل مشكلة معينة؛ إنما الأمثلة دي بتدعم الشغل الروتيني.",
     "صح. الـ TPS بيدعم الـ day-to-day operations، وأمثلة المحاضرة للـ TPS هي بالظبط الـ ticket reservation والـ order entry والـ <bdi dir=\"ltr\">accounts payable/receivable</bdi> والـ payroll <bdi dir=\"ltr\">(L1,&nbsp;TPS&nbsp;in&nbsp;detail)</bdi>.",
     "الـ Expert systems بتقلّد الخبير باستخدام knowledge base."
    ],
    [
     "الـ word processors والـ e-mail دي أدوات office automation (OAS)؛ المحاضرة بتقول إن modules الـ MIS هي الـ report-writing software والـ mathematical models.",
     "صح. بيعملوا simulation لعمليات الشركة ويطلّعوا reports للـ problem solvers.",
     "دي أجزاء الـ expert system اللي في الـ DSS.",
     "شاشات حجز التذاكر وملفات الـ payroll دي تبع الـ transaction processing systems (TPS)؛ الـ MIS بيشتغل على data الـ TPS باستخدام الـ report writers والـ mathematical models."
    ],
    [
     "الـ inventory والـ bill والـ shipping records دول مثال المخزن بتاع الـ IS اللي بيعمل model للـ physical system، مش مصادر المعلومات بتاعة الـ DSS.",
     "الـ people والـ procedures والـ data دول components الـ information system؛ الـ DSS بياخد معلوماته من relational DB وknowledge base وmultidimensional DB.",
     "الـ TPS والـ MIS والـ OAS دول أنواع information systems، مش المصادر اللي الـ DSS بياخد منها معلوماته (الـ relational DB والـ knowledge base والـ multidimensional DB).",
     "صح. الـ <bdi dir=\"ltr\">Fig&nbsp;1.10</bdi> بتوضّح إن الـ DSS بياخد من تلات مصادر معلومات: الـ relational database والـ knowledge base والـ multidimensional database <bdi dir=\"ltr\">(L1,&nbsp;MIS&nbsp;and&nbsp;DSS)</bdi>."
    ],
    [
     "الـ office automation بيدعم التواصل والإنتاجية في المكتب (الـ word processing والـ e-mail)؛ ما بيحللش مشكلة بشكل منطقي لوحده.",
     "الـ inter-organizational system (IOS) بيربط الـ MIS بتاع الشركة بالـ suppliers أو غيرهم عشان يشاركوا المعلومات؛ ده مش برنامج بيفكّر لوحده.",
     "الـ GDSS بيساعد مجموعة مديرين يوصلوا لقرار مع بعض؛ البرنامج اللي بيحلل المشكلة لوحده ده الـ artificial intelligence.",
     "صح. ده واحد من النوعين الزيادة من الـ software المرتبط بالـ DSS."
    ],
    [
     "ده وصف مستوى الـ operational control.",
     "صح. Fig 1.11: الـ strategic planners بيعتمدوا أغلب الوقت على environmental (خارجية) information ومحتاجينها summarized؛ الـ operational level هو اللي بيستخدم internal, detailed data (L1).",
     "الـ information الـ strategic أغلبها environmental.",
     "معلومات الـ strategic level فعلًا environmental بس محتاجينها summarized؛ الـ detailed information دي اللي بيستخدمها الـ operational control level (Fig 1.11)."
    ],
    [
     "صح. الـ functions الخمسة هي plan و organize و staff و direct و control.",
     "الـ Control (إنك تخلّي الـ resources ماشية في السكة الصح) واحدة من الخمس management functions: الـ plan والـ organize والـ staff والـ direct والـ control. الـ Program مش منهم.",
     "الـ Plan (تقرر هيعملوا إيه) هي أول وظيفة من الخمس management functions: الـ plan والـ organize والـ staff والـ direct والـ control.",
     "الـ Staff (إنك تملا الـ organization بالـ resources) واحدة من الخمس management functions: الـ plan والـ organize والـ staff والـ direct والـ control."
    ],
    [
     "الـ lab بيأكد إن الـ analysis مالوش علاقة بالـ programming.",
     "الجملة «A conceptual solution that fulfills the requirements» دي تعريف الـ lab للـ system design، واللي بييجي بعد الـ analysis.",
     "صح. Lab 1 بيعرّف الـ analysis إنه investigation للمشكلة والـ requirements مش للحل؛ الفكرة إنك تفهم احتياجات الـ business، مش إنك تبرمج.",
     "تركيب واختبار النظام الجديد ده الـ implementation؛ الـ analysis بس بيدرس المشكلة والـ requirements."
    ]
   ],
   "extra": [
    [
     "المثال بيوصف أي IS، مش الـ DSS بالذات.",
     "صح. الـ essential feature للـ IS هي استخدام records تمثّل حركة أو حالة أو وجود الـ objects.",
     "الـ IS هو open system بيتفاعل مع الـ environment بتاعه.",
     "الـ IS بيعمل model للـ physical system وبيتفاعل معاه؛ والاتنين subsystems من المنظمة."
    ],
    [
     "صح. الـ inputs من الـ physical system بتبقى observations؛ والـ outputs ليه بتبقى actions needed.",
     "الـ reorder note بتقول للـ physical system يعمل حاجة، يبقى ده action.",
     "الـ «deliverable» ده مصطلح project management معناه output بتاع phase، وعدّ الرفوف مش transaction بيتكتب؛ الـ inputs بتاعة الـ IS هي observations والـ outputs هي actions needed.",
     "الترتيب معكوس: العدّ بيطلع من الـ physical system ويدخل الـ IS (observation)، وملاحظة إعادة الطلب بتطلع منه للـ physical system (action needed)."
    ],
    [
     "لأ مختلفين: الـ IS ليه تلات components (الـ people والـ procedures والـ data) والـ CBIS ليه خمسة، بيزوّد الـ programs والـ computers.",
     "الـ CBIS بيفضّل الـ people component فيه؛ هو بس بيزوّد الـ programs والـ computers على components الـ IS (الـ people والـ procedures والـ data).",
     "صح. الـ IS مكوّن من people و procedures و data؛ والـ CBIS بيزوّد programs و computers فيبقوا خمس components <bdi dir=\"ltr\">(L1,&nbsp;Components)</bdi>.",
     "بالعكس: الـ CBIS هو اللي بيزوّد الـ programs والـ computers."
    ],
    [
     "الحجوزات الروتينية دي day-to-day operations، يبقى ده TPS مش DSS.",
     "صح. ده مثال حجز التذاكر اللي في المحاضرة.",
     "الـ MIS بيحوّل data الـ TPS لـ reports للمديرين باستخدام report writers وmodels؛ تسجيل كل حجز ده شغل روتيني بتاع الـ TPS.",
     "الـ office automation بيغطّي الـ word processing والـ e-mail؛ نظام حجز الكراسي اللي بيعمل process للـ transactions ده مثال المحاضرة للـ TPS."
    ],
    [
     "الـ payroll system ده TPS بيعمل process لـ transactions المرتبات الروتينية؛ ما بيساعدش المدير ياخد قرار في مشكلة محددة زي فتح فرع جديد.",
     "الـ OAS بيدعم التواصل والإنتاجية في المكتب (الـ word processing والـ e-mail)؛ ما فيهوش knowledge base ولا multidimensional analysis.",
     "الـ TPS بيسجّل الـ transactions اليومية؛ إنما قرار مرة واحدة بيعتمد على knowledge base وmultidimensional DB ده شغل الـ DSS.",
     "صح. الـ DSS بيساعد المديرين ياخدوا قرار في مشكلة معينة، باستخدام relational DB و knowledge base و multidimensional DB."
    ],
    [
     "الـ report-writing software ده module في الـ MIS بيطلّع reports؛ ما بيساعدش مجموعة مديرين يوصلوا لقرار مشترك.",
     "الـ order entry system ده TPS بيسجّل طلبات الـ customers؛ ما بيدعمش الـ group decision making.",
     "الـ AI بيحلل المشكلة لوحده، مش كمجموعة.",
     "صح. الـ GDSS بيساعد مجموعة مديرين يوصلوا لقرار مع بعض."
    ],
    [
     "الـ environmental, summarized information دي مناسبة للـ strategic planning level؛ الـ operational supervisors محتاجين internal, detailed data (Fig 1.11).",
     "صح. Fig 1.11: الـ operational control level بيستخدم أغلب الوقت internal information وبشكل detailed، عكس الـ strategic level (L1, Managers as users).",
     "معلومات الـ operational level فعلًا detailed، بس مصدرها أغلبه internal؛ الـ environmental information دي اللي بيستخدمها الـ strategic planners.",
     "الـ financial forecasts دي معلومات strategic وsummarized؛ الـ operational supervisor محتاج internal, detailed data عن الشغل اليومي."
    ],
    [
     "صح. Fig 1.13: الـ strategic managers بيحطوا أغلب مجهودهم في الـ planning (والـ organizing)، أما الـ operational managers فأغلب شغلهم direct وcontrol (L1).",
     "الـ Staffing نصيبها صغير من المجهود في كل management level في Fig 1.13؛ الـ strategic level الغالب عليه الـ planning.",
     "الـ Control نصيبه صغير بس في المستوى الـ strategic؛ أكبر حتة هناك هي الـ planning.",
     "الـ Directing أغلبه في المستوى الـ operational."
    ],
    [
     "الـ implementation بيركّب النظام والـ maintenance بتخليه شغّال؛ ولا واحد فيهم بيدرس الـ requirements أو بيعمل conceptual solution.",
     "معكوسين: دراسة المشكلة والـ requirements دي الـ analysis، والـ conceptual solution اللي بيحققها ده الـ design (Lab 1).",
     "صح. Lab 1: الـ analysis بيدرس المشكلة والـ requirements مش الحل؛ والـ design هو conceptual solution بيحقق الـ requirements، لسه مش implementation.",
     "ولا جملة فيهم بتتكلم عن planning أو implementation."
    ],
    [
     "الـ DFD ده diagram بتاع الـ structured analysis، مش واحد من تصنيفات الـ UML؛ الـ lab بيحط الـ use case diagram تحت الـ behavioral.",
     "الـ Structural diagrams (زي الـ class diagrams) مابتتغيرش مع الوقت.",
     "صح. بيوضح السيستم بيرد إزاي على الـ requests.",
     "الـ Interaction diagrams هي الـ sequence والـ collaboration diagrams."
    ]
   ]
  },
  "2": {
   "notes": [
    {
     "h": "تعريفات أساسية",
     "pts": [
      "الـ <b>Information systems analysis and design</b> هو <b>complex organizational process</b>، بيُستخدم عشان <b>نطوّر ونعمل maintain للـ computer-based information systems</b>، وبيشتغل بيه <b>team من الـ business والـ systems professionals</b>.",
      "الـ <b>Application software</b> هو software معمول عشان <b>يدعم functions أو processes في المنظمة</b>.",
      "الـ <b>Systems analyst</b>: <b>الدور (role) في المنظمة اللي مسؤول أكتر حاجة عن الـ analysis والـ design</b> للـ information systems.",
      "الـ <b>System development methodology</b> هي <b>standard process</b> المنظمة بتمشي عليه عشان تعمل كل الخطوات اللازمة لـ <b>analyze و design و implement و maintain</b> الـ information systems.",
      "الـ <b>SDLC</b>: الـ <b>traditional methodology</b> اللي بنستخدمها عشان نطوّر ونعمل maintain ونستبدل الـ information systems."
     ]
    },
    {
     "h": "الـ modern approach للـ systems analysis and design (جه في 3 finals)",
     "pts": [
      "إنك تمشي على <b>systems methodology</b>، وتطبّق <b>techniques</b>، وتستخدم <b>tools</b> مناسبة:",
      "(1) عشان <b>تضمن الجودة وإن السيستم مناسب (quality and appropriateness)</b>؛",
      "(2) عشان <b>تدّي structure</b> لعملية الـ systems development، لأنها <b>اتجرّبت واتظبطت قبل كده من ناس تانية (tested and perfected by others)</b>."
     ],
     "figH": {
      "sa-l2-triangle": "الـ <bdi dir=\"ltr\">Figure&nbsp;1-1</bdi>: الـ methodologies والـ techniques والـ tools، وبيدّوك إيه"
     }
    },
    {
     "h": "الـ analysis والـ design اتغيروا إزاي (من الخمسينات لدلوقتي)",
     "figH": {
      "sa-l2-eras": "فترة بفترة: من فن لـ disciplined process، ومن builder لـ integrator"
     }
    },
    {
     "h": "الـ One-tier والـ two-tier والـ three-tier architecture",
     "pts": [
      "الـ <b>One-tier</b>: الـ presentation والـ processing والـ database على جهاز واحد.",
      "الـ <b>Two-tier</b>: جهاز الـ user (presentation + processing) بيكلّم <b>database server</b>.",
      "الـ <b>Three-tier</b>:<span class=\"ltr\">user (presentation) → <b>application server</b> (processing) → <b>database server</b></span>نسخة الويب:<span class=\"ltr\">browser → Internet → web/app server → DB server</span>"
     ],
     "figH": {
      "sa-l2-tiers": "الـ presentation والـ processing والـ database قاعدين فين في كل architecture"
     }
    },
    {
     "h": "مراحل الـ SDLC (بتيجي في كل final)",
     "figH": {
      "sa-l2-sdlc-cycle": "الـ <bdi dir=\"ltr\">Figure&nbsp;1-3</bdi>: دايرة الـ SDLC، مرحلة بمرحلة"
     }
    },
    {
     "h": "الـ traditional waterfall SDLC ومشاكله",
     "pts": [
      "الـ Waterfall: كل phase بتبدأ لما اللي قبلها تخلص، و<b>رجوع ولف قليل جدًا (little backtracking and looping)</b>. الممارسة الحالية بدل كده بتدمج الـ analysis والـ design والـ implementation في process واحدة <b>iterative و parallel</b>.",
      "<b>المشاكل</b>:<br>أولاً، الـ system requirements بتبقى <b>\"locked in\"</b> بعد ما تتحدد (ماينفعش تتغير)؛<br>ثانياً، <b>مشاركة الـ user محدودة</b> (في مرحلة الـ requirements بس)؛<br>ثالثاً، <b>تركيز زيادة على الـ milestone deadlines</b>؛<br>رابعاً، <b>process و documentation كتير</b>: منظمات كتير عندها staff كبير شغلته الوحيدة إنه يعمل ويحافظ على documentation الـ SDLC.",
      "الـ <bdi dir=\"ltr\">Fig&nbsp;1-3</bdi> (الـ SDLC الدايري) أقرب للواقع من <bdi dir=\"ltr\">Fig&nbsp;1-10</bdi> (الـ waterfall) لأنك تقدر ترجع لأي phase."
     ],
     "figH": {
      "sa-l2-heart": "الـ Figures <bdi dir=\"ltr\">1-8</bdi> و <bdi dir=\"ltr\">1-9</bdi>: الـ loop بتاع الـ analysis والـ design والـ code والـ test، وقلب الـ systems development",
      "sa-l2-waterfall": "الـ <bdi dir=\"ltr\">Figure&nbsp;1-10</bdi>: الـ waterfall بيتبني خطوة خطوة، وبعدين مشاكله الأربعة"
     }
    },
    {
     "h": "طرق تحسين الـ development: الـ Prototyping والـ JAD والـ RAD",
     "pts": [
      "ست طرق: <b>الـ Prototyping، والـ CASE tools، والـ JAD، والـ RAD، والـ Agile methodologies، والـ eXtreme Programming</b>.",
      "الـ <b>Prototyping</b> هو process <b>iterative</b> بيتحوّل فيها الـ requirements <b>بسرعة لـ working system</b> وبيت<b>عدّل باستمرار</b> عن طريق <b>شغل قريب بين الـ analyst والـ users</b>. مفيد في تحديد الـ requirements وممكن يبقى أساس السيستم النهائي (مثال: الـ analyst بيعمل sample interfaces بالـ Visual Basic \"on the fly\" قدام الـ sales representative).",
      "الـ <b>JAD (Joint Application Design)</b> هو <b>structured process</b> فيها الـ <b>users والمديرين والـ analysts</b> بيشتغلوا مع بعض <b>كذا يوم</b> في سلسلة <b>اجتماعات مكثفة (intensive meetings)</b> عشان <b>يحددوا أو يراجعوا الـ system requirements</b>. (الـ Lab: الـ JAD ممكن يبدّل سلسلة interviews؛ بيُستخدم لما ثقافة المكان بتدعم حل المشاكل بشكل جماعي والـ analysts متوقعين أفكار أكتر من الـ JAD.)",
      "الـ <b>RAD (Rapid Application Development)</b> هي methodology عشان <b>تقلل جدًا الوقت</b> اللي محتاجينه لـ design و implement الـ IS. فيها <b>مشاركة كبيرة من الـ users، والـ prototyping، والـ JAD sessions، والـ integrated CASE tools والـ code generators</b>. الـ RAD life cycle في <bdi dir=\"ltr\">Fig&nbsp;1-13</bdi> هي:<span class=\"ltr\">requirements planning → <b>user design ⇄ construction</b> (iterative) → cutover</span>"
     ],
     "figH": {
      "sa-l2-prototyping": "الـ <bdi dir=\"ltr\">Figure&nbsp;1-11</bdi>: الـ loop بتاع الـ prototyping، ماشيين فيه بمثال الـ Visual Basic",
      "sa-l2-rad": "الـ <bdi dir=\"ltr\">Figure&nbsp;1-13</bdi>: الـ RAD life cycle، واللي فيه الـ user design والـ construction بس اللي بيعملوا iteration"
     }
    },
    {
     "h": "الـ CASE tools",
     "pts": [
      "الـ <b>CASE tools</b> هي software بيدّي <b>automated support لجزء من الـ SDLC</b>. مبني حوالين <b>repository</b> فيه كل الـ <b>metadata</b> (أسامي الداتا، الـ format، الاستخدامات، المكان) والـ system specifications؛ بيعمل automate للمهام الروتينية ويسمح بـ <b>code and DDL generation</b>، فيقدر يدعم الـ SDLC كله.",
      "<b>الأنواع العامة</b>:<br>(1) الـ <b>Diagramming tools</b>، بترسم الـ processes والداتا والـ control structures بشكل graphical؛<br>(2) الـ <b>Computer display and report generators</b>، بتعمل prototype لشكل السيستم وإحساسه (<bdi dir=\"ltr\">\"look&nbsp;and&nbsp;feel\"</bdi>)؛<br>(3) الـ <b>Analysis tools</b>، بتشيك أوتوماتيك على الـ specifications الناقصة أو المتعارضة أو الغلط في الـ diagrams والـ forms والـ reports؛<br>(4) الـ <b>Central repository</b>، تخزين متكامل للـ specifications والـ diagrams والـ reports ومعلومات الـ project management؛<br>(5) الـ <b>Documentation generators</b>، بتطلّع documentation تقنية وللـ user في formats قياسية؛<br>(6) الـ <b>Code generators</b>، بتطلّع كود البرنامج وتعريفات الـ database مباشرة من مستندات الـ design والـ diagrams والـ forms والـ reports.",
      "الـ <b>repository هو أهم component</b>: بيربط الـ tools والأنشطة ببعض، كل أعضاء الـ team بيستخدموه، وبيدّي <b>single view للمشروع</b>. مميزات تانية: الـ security، والـ version control، والـ <bdi dir=\"ltr\">import/export</bdi>، والـ backup and recovery، والـ user accounts، والـ usage accounting."
     ],
     "figH": {
      "sa-l2-case-hub": "الأنواع العامة للـ CASE tools حوالين الـ central repository"
     }
    },
    {
     "h": "دعم الـ CASE لكل مرحلة في الـ SDLC",
     "figH": {
      "sa-l2-case-phases": "اختار phase: أنهي CASE tools بتدعمها"
     }
    },
    {
     "h": "الـ Agile والـ XP والـ OOAD والـ RUP",
     "pts": [
      "<b>الـ Agile: تلات مبادئ أساسية</b>:<br>أولاً، <b>adaptive مش predictive</b>؛<br>ثانياً، <b>التركيز على الناس مش الأدوار (people rather than roles)</b> (تركيز أقل على الـ process وأكتر على الأفراد)؛<br>ثالثاً، <b>self-adaptive processes</b> (الـ process بتتحسن عن طريق مراجعات الـ team وهما بيطوّروا الـ software).",
      "الـ <b>eXtreme Programming</b>: <b>دورات development قصيرة و incremental</b>، و planning incremental، و<b>automated tests</b> بيكتبها الـ programmers والـ customers، و<b>teams من اتنين programmers</b>، والـ coding والـ testing في نفس الـ process؛ الكود بيتعمله test بعد ما يتكتب بشوية ويتعمله integrate في ساعات. كل الـ phases بتتجمع في coding و testing و listening و designing. المميزات: الـ communication، والـ productivity العالية، والكود اللي جودته عالية.",
      "الـ <b>OOAD</b> هي methodologies مبنية على <b>objects</b> بتجمع <b>الداتا (attributes) والأنشطة (methods)</b> مع بعض، بدل ما الداتا تبقى منفصلة عن الـ processes. الـ <b>Object</b> هو structure بيغلّف attributes و behaviors لكيان حقيقي؛ الـ <b>object class</b> هو تجميع منطقي لـ objects ليها نفس الـ attributes والـ behaviors؛ الـ <b>inheritance</b> معناه إن الـ subclasses بتورث خصائص الـ superclasses.",
      "الـ <b>RUP (Rational Unified Process)</b> هي methodology object-oriented ليها <b>أربع phases</b>: <b>الـ inception، والـ elaboration، والـ construction، والـ transition</b>؛ وكل phase متقسمة لـ <b>iterations</b> منفصلة."
     ],
     "figH": {
      "sa-l2-rup": "الـ <bdi dir=\"ltr\">Figure&nbsp;1-14</bdi>: الأربع phases بتاعة الـ RUP، الـ resources مع الوقت"
     }
    },
    {
     "h": "الـ Labs من 2 لـ 4: مرحلة الـ planning، والـ methodologies، وجمع الـ requirements",
     "pts": [
      "تقسيم وقت الـ SDLC (الـ lab): الـ Planning <b><bdi dir=\"ltr\">15%</bdi></b> (الـ project manager)، والـ Analysis <b><bdi dir=\"ltr\">20%</bdi></b> (الـ system analyst)، والـ Design <b><bdi dir=\"ltr\">35%</bdi></b> (الـ system designer)، والـ Implementation <b><bdi dir=\"ltr\">30%</bdi></b> (الـ developer). استخدم وقت الـ planning عشان تقدّر وقت المشروع كله.",
      "مخرجات مرحلة الـ planning: الـ <b>system request</b>، والـ <b>feasibility study</b>، والـ project plan (الـ methodology، وتقدير الوقت، وتحديد الـ tasks، والـ PERT chart، والـ Gantt chart، والـ scope management). تقنيات الـ Analysis: الـ interview، والـ JAD، والـ questionnaire، والـ use case، والـ DFD، والـ data dictionary، والـ ERD، والـ normalization.",
      "الـ <b>System request</b>: مستند بيوضح أسباب بناء السيستم والقيمة المتوقعة منه. خمس عناصر: <b>الـ project sponsor، والـ business need، والـ business requirements، والـ business value، والـ special issues</b>.",
      "الـ <b>Feasibility study</b>: بيقرر نكمّل ولا لأ وبيحدد الـ risks. تلات أجزاء: feasibility <b>technical و economic و organizational</b>.",
      "الـ Methodologies (الـ lab): الـ waterfall، والـ parallel (المشروع بيتقسم لـ subprojects بيتعملها design و implement بالتوازي)، والـ <bdi dir=\"ltr\">RAD&nbsp;/&nbsp;iterative</bdi> (نسخ السيستم 1 و 2 و 3)، والـ agile (تواصل وش لوش في كل phase).",
      "جمع الـ requirements: الـ <b>interviews</b> (الآراء والمشاعر، الوضع الحالي، أهداف السيستم)، والـ <b>JAD</b>، والـ <b>questionnaires</b> (المعتقدات، السلوكيات، الخصائص؛ مفيدة لما الأعضاء متفرقين في أماكن بعيدة أو العدد كبير)، والـ <b>use case diagrams</b> (الـ actors، والـ use cases، والـ system boundary، والـ association، والـ generalization، والـ <bdi dir=\"ltr\">&lt;&lt;include&gt;&gt;</bdi>، والـ <bdi dir=\"ltr\">&lt;&lt;extend&gt;&gt;</bdi>)."
     ],
     "figH": {
      "sa-l2-time-split": "قدّر وقت المشروع كله من وقت الـ planning، والنسب هي:<span class=\"ltr\">15%, 20%, 35%, 30%</span>",
      "sa-l2-methods": "الأربع methodologies بتوع الـ lab: الـ waterfall والـ parallel والـ RAD والـ agile"
     }
    }
   ],
   "cards": [
    "هو complex organizational process؛ بيُستخدم لتطوير وعمل maintain للـ computer-based IS؛ بيشتغل بيه team من الـ business والـ systems professionals.",
    "هو software معمول عشان يدعم functions أو processes في المنظمة.",
    "الدور في المنظمة اللي مسؤول أكتر حاجة عن الـ analysis والـ design للـ information systems.",
    "إنك تمشي على methodology وتطبّق techniques وتستخدم tools: بيضمن الجودة وإن السيستم مناسب، وبيدّي structure (لأنها اتجرّبت واتظبطت من ناس تانية).",
    "هي standard process المنظمة بتمشي عليه عشان تعمل analyze و design و implement و maintain للـ information systems.",
    "الـ methodology التقليدية لتطوير الـ IS وعمل maintain ليها واستبدالها: الـ planning والـ analysis والـ design والـ implementation والـ maintenance.",
    "الـ functional features بتتوصف من غير ما تعتمد على أي computer platform.",
    "الـ logical specifications بتتحوّل لتفاصيل technology-specific.",
    "الـ requirements بتبقى locked in؛ مشاركة الـ user محدودة؛ تركيز على الـ milestone deadlines؛ وفيه process و documentation كتير.",
    "هو process iterative بتحوّل الـ requirements بسرعة لـ working system، وبيتعدّل باستمرار مع الـ users.",
    "الـ users والمديرين والـ analysts في كذا يوم اجتماعات مكثفة عشان يحددوا أو يراجعوا الـ requirements.",
    "هي methodology بتقلل جدًا وقت الـ design والـ implementation، باستخدام مشاركة الـ users والـ prototyping والـ JAD والـ CASE والـ code generators.",
    "هي software بيدّي automated support لجزء من الـ SDLC، مبني حوالين repository فيه الـ metadata.",
    "الـ central repository (بيربط كل حاجة ببعض وبيدّي single view للمشروع).",
    "إنها adaptive مش predictive؛ الناس مش الأدوار؛ والـ self-adaptive processes.",
    "دورات incremental قصيرة، و automated tests، و teams من اتنين، والـ coding والـ testing مع بعض.",
    "الـ Inception والـ elaboration والـ construction والـ transition.",
    "متركز على الـ processes، والـ <bdi dir=\"ltr\">machine/assembly language</bdi>، وكل حاجة بتتبني من الصفر.",
    "الـ Project sponsor والـ business need والـ business requirements والـ business value والـ special issues.",
    "الـ Technical والـ economic والـ organizational."
   ],
   "qa": [
    "يعني إنك تمشي على systems methodology، وتطبّق techniques، وتستخدم tools مناسبة. ده (1) بيضمن الجودة وإن السيستم اللي بيتبني مناسب (quality and appropriateness)، و(2) بيدّي structure لعملية الـ systems development، لأن الـ methodologies والـ techniques والـ tools دي اتجرّبت واتظبطت قبل كده من ناس تانية. مصطلحات مرتبطة: الـ system development methodology هي standard process المنظمة بتمشي عليه عشان تعمل analyze و design و implement و maintain للـ IS؛ والـ analyst (الدور المسؤول أكتر حاجة عن الـ analysis والـ design) هو اللي بيطبّقها.",
    "الـ SDLC هو الـ methodology التقليدية لتطوير الـ IS وعمل maintain ليها واستبدالها. <b>Planning</b>: احتياجات المنظمة كلها من الـ IS بتتحدد وتتحلل وتترتب حسب الأولوية. <b>Analysis</b>: الـ requirements بتتجمع من الـ users وتتدرس وتتنظم ويتشال التكرار منها؛ والـ output هو الحل المقترح (recommended solution). <b>Design</b>: الحل المقترح بيتحوّل لـ logical specifications (مستقلة عن الـ platform) وبعدين physical specifications (تفاصيل technology-specific). <b>Implementation</b>: الـ IS بيتعمله code و test و install و support. <b>Maintenance</b>: السيستم بيتصلح ويتحسن بشكل منظم (systematically).",
    "1) الـ requirements بتبقى locked in أول ما تتحدد وصعب تتغير. 2) الـ users بيشاركوا في مرحلة الـ requirements بس. 3) تركيز زيادة على الـ milestone deadlines. 4) بيعمل process و documentation كتير؛ منظمات كتير عندها staff شغلتهم الوحيدة يعملوا ويحافظوا على مستندات الـ SDLC. والرجوع لورا قليل لأن كل phase مابتبدأش غير لما اللي قبلها تخلص.",
    "الـ CASE tools هي software بيدّي automated support لجزء من الـ SDLC. مبنية حوالين repository فيه الـ metadata (أسامي الداتا، الـ format، الاستخدامات، المكان) والـ system specifications، بتعمل automate للمهام الروتينية وتقدر تطلّع code و DDL. الأنواع:<br>الـ diagramming tools (رسم الـ processes والداتا والـ control بشكل graphical)؛<br>الـ computer display and report generators (prototype للـ look and feel)؛<br>الـ analysis tools (تشيك على الـ specifications الناقصة أو المتعارضة أو الغلط)؛<br>الـ central repository (تخزين متكامل للـ diagrams والـ reports ومعلومات الـ project management)؛<br>الـ documentation generators (مستندات تقنية وللـ user في formats قياسية)؛<br>الـ code generators (كود البرنامج والـ database من الـ designs).<br>والـ repository هو أهم component.",
    "الـ RAD هي methodology اتعملت عشان تقلل جدًا وقت الـ design والـ implementation للـ IS، باستخدام مشاركة كبيرة من الـ users عن طريق JAD sessions و prototypes، و integrated CASE tools و code generators. في <bdi dir=\"ltr\">Fig&nbsp;1-3</bdi> كل phase بتبقى iterative؛ إنما في الـ RAD بس الـ user design والـ construction هما اللي بيلفّوا (iterate)، بعد مرحلة requirements planning قصيرة، والـ cutover بيقابل الـ implementation. ده بيوصّل فكرة السرعة، اللي بتحصل بفضل الـ prototyping والـ automation بتاع الـ CASE.",
    "الـ Agile methods بتبقى adaptive مش predictive، بتركز على الناس مش الأدوار (تركيز أقل على الـ process وأكتر على الأفراد)، وبتستخدم self-adaptive processes بتتحسن عن طريق مراجعات الـ team. الـ XP هي agile method فيها دورات incremental قصيرة، و planning incremental، و automated tests بيكتبها الـ programmers والـ customers، و teams من اتنين programmers، والـ coding والـ testing في نفس الـ process؛ والكود بيتعمله integrate في ساعات. المميزات: communication و productivity عالية وكود جودته عالية.",
    "الـ OOAD بيجمع الداتا (attributes) والـ processes (methods) في كيانات واحدة اسمها objects، إنما الـ traditional approach بيبقى data-oriented أو process-oriented وبيفصلهم عن بعض. الـ OOAD بيستخدم object classes و inheritance (الـ subclasses بتورث خصائص الـ superclass)، وده مش موجود في الـ traditional approach. وفي الـ OOSAD (زي الـ RUP بمراحله الـ inception والـ elaboration والـ construction والـ transition) الـ iterations بتحصل جوه كل phase."
   ],
   "quiz": [
    [
     "الـ RAD ده methodology واحدة محددة هدفها تقليل وقت الـ design والـ implementation بشكل جذري؛ التعريف المذكور (methodology + techniques + tools) ده الـ modern approach بشكل عام.",
     "الـ Waterfall هي methodology واحدة، مش تعريف الـ modern approach.",
     "صح. جه كـ Q2a في امتحانات <bdi dir=\"ltr\">2023/24</bdi> و <bdi dir=\"ltr\">2024/25</bdi> و <bdi dir=\"ltr\">2025/26</bdi>.",
     "الـ JAD ده technique واحدة بس (كذا يوم اجتماعات مكثفة بين الـ users والمديرين والـ analysts)؛ التعريف المذكور ده الـ modern approach للـ systems analysis and design."
    ],
    [
     "صح. في الـ design phase، الـ logical design بيوصف كل الـ functional features من غير ما يرتبط بأي computer platform؛ وبعدين الـ physical design يزوّد تفاصيل التكنولوجيا (L2, SDLC phases).",
     "الـ Implementation هي المرحلة اللي النظام بيتكتب فيها code ويتعمله test ويتركّب ويتدعم؛ مش وصف للـ features بعيد عن الـ platform.",
     "الـ Prototyping بيحوّل الـ requirements بسرعة لنظام شغّال يتعدّل مع الـ users؛ ده approach للتحسين، مش خطوة الـ design المستقلة عن الـ platform.",
     "الـ Physical design بيحوّل الـ logical specs لتفاصيل technology-specific."
    ],
    [
     "الـ Maintenance هي المرحلة اللي النظام بيتصلّح ويتحسّن فيها بشكل منظم بعد ما يشتغل، مش اللي الـ specs بتتحوّل فيها لتفاصيل تكنولوجية.",
     "الـ Logical design بيوصف الـ functional features بعيد عن أي computer platform؛ تحويل الـ specs دي لتفاصيل خاصة بتكنولوجيا معينة ده الـ physical design.",
     "الـ Analysis بيدرس الـ requirements وينظمها.",
     "صح. الـ Physical design بيحوّل الـ logical specifications لتفاصيل خاصة بالتكنولوجيا تقدر تبرمج وتبني منها (L2, SDLC phases)."
    ],
    [
     "الـ PM بيعمل initiate و plan و execute و close down للمشروع.",
     "صح. ده أول row في سؤال التوصيل بتاع <bdi dir=\"ltr\">2023/24</bdi>.",
     "الـ Programmers بيكتبوا الـ code في الـ implementation؛ الدور المسؤول أكتر عن الـ analysis والـ design هو الـ systems analyst.",
     "الـ project sponsor هو الشخص اللي بيطلب المشروع ويدعمه (اسمه بيتكتب في الـ system request)؛ دور الـ analysis والـ design ده الـ systems analyst."
    ],
    [
     "صح. في الـ planning، احتياجات الـ information system كلها بتاعة الـ organization بتتحدد وتتحلل وتترتب حسب الأولوية قبل ما يتختار project (L2, SDLC phases).",
     "الـ Analysis بيدرس وينظم الـ requirements بتاعة مشروع اتختار خلاص.",
     "الـ Design بيحوّل الحل المقترح لـ specifications.",
     "الـ Maintenance بتصلّح وتحسّن نظام موجود بشكل منظم؛ تحديد كل احتياجات الـ IS وترتيب أولوياتها بيحصل في الـ planning."
    ],
    [
     "الـ requirements اللي بتتقفل بعد ما تتحدد دي المشكلة رقم 1 في لستة مشاكل الـ waterfall في المحاضرة، يعني دي فعلًا مشكلة في الـ waterfall SDLC.",
     "الـ limited user involvement (الـ users موجودين بس في مرحلة الـ requirements) دي مشكلة مذكورة في الـ waterfall، فمينفعش تكون الإجابة.",
     "صح. الـ Waterfall فيه رجوع ولف قليل، فالـ iteration الكتير مش مشكلته.",
     "التركيز الزيادة على الـ milestone deadlines دي المشكلة رقم 3 في لستة مشاكل الـ waterfall، يعني هي فعلًا مشكلة."
    ],
    [
     "الـ Diagramming tools بترسم الـ processes والـ data والـ control structures، بس المحاضرة بتقول إن أهم component في الـ CASE هو الـ central repository.",
     "صح. بيربط الـ tools والأنشطة ببعض وبيدّي single view للمشروع.",
     "الـ Documentation generators بتطلّع documents تقنية وللـ users؛ أهم component هو الـ repository اللي بيربط كل الأدوات ببعض.",
     "الـ Code generators بتطلّع program code وDB code من الـ designs، بس هي معتمدة على الـ repository، اللي المحاضرة بتسميه أهم component."
    ],
    [
     "الـ Display and report generators بتعمل prototype لشكل النظام وإحساسه؛ مراجعة الـ specifications عشان الأخطاء دي شغلة الـ analysis tools.",
     "الـ Code generators بتطلّع program code وdatabase definition code من الـ design documents؛ ما بتراجعش الـ specifications عشان الأخطاء.",
     "الـ Documentation generators بتطلّع technical documentation وuser documentation بـ formats قياسية؛ ما بتعملش validation للـ specifications.",
     "صح. الـ Analysis tools بتراجع أوتوماتيك الـ specifications الناقصة أو المتناقضة أو الغلط في الـ diagrams والـ forms والـ reports (L2, CASE types)."
    ],
    [
     "الـ XP ده agile method فيه cycles قصيرة وprogramming teams من شخصين وautomated tests، مش سلسلة اجتماعات requirements.",
     "الـ RUP ده object-oriented methodology ليها أربع phases (الـ inception والـ elaboration والـ construction والـ transition)، مش technique اجتماعات.",
     "الـ Prototyping هو بناء working system بشكل iterative.",
     "صح. الـ JAD ده structured process فيه الـ users والمديرين والـ analysts بيشتغلوا مع بعض كذا يوم في اجتماعات مكثفة عشان يحددوا أو يراجعوا الـ requirements (L2)."
    ],
    [
     "في السبعينات الـ development بقى أشبه بالـ engineering.",
     "صح. في الـ 1980s الـ microcomputers بقت أدوات أساسية، واستخدام الـ 4GLs زاد، والـ CASE tools اتطورت (L2, How analysis and design changed).",
     "الـ 1990s كان تركيزها على الـ system integration والـ visual programming والـ servers والـ Web؛ الـ microcomputers والـ 4GLs والـ CASE دول بتوع الـ 1980s.",
     "في الـ 1950s كل حاجة كانت بتتكتب من الصفر بالـ machine أو assembly language؛ لسه ماكانش فيه 4GLs ولا CASE tools."
    ],
    [
     "صح. ده عيب الـ waterfall، عكس الـ agile تمامًا.",
     "الـ Self-adaptive processes (بتتحسّن عن طريق مراجعات الـ team) دي agile principle رقم 3، يعني هي فعلًا واحدة من التلات principles.",
     "الـ Adaptive rather than predictive دي agile principle رقم 1، يعني هي فعلًا واحدة من التلات principles.",
     "الـ Emphasize people rather than roles دي agile principle رقم 2، يعني هي فعلًا واحدة من التلات principles."
    ],
    [
     "الـ Initiation والـ planning والـ execution والـ closedown دول phases الـ project management (L3)، مش phases الـ RUP.",
     "الـ Planning والـ analysis والـ design والـ implementation (والـ maintenance) دول phases الـ SDLC، مش phases الـ RUP.",
     "صح. الـ RUP ده object-oriented methodology ليها أربع phases: الـ inception والـ elaboration والـ construction والـ transition، وكل phase متقسّمة iterations <bdi dir=\"ltr\">(L2,&nbsp;RUP)</bdi>.",
     "الـ Requirements planning والـ user design والـ construction والـ cutover دول phases الـ RAD life cycle (<bdi dir=\"ltr\">Fig&nbsp;1-13</bdi>)، مش الـ RUP."
    ],
    [
     "الـ CASE repository بيخزّن الـ project metadata للـ CASE tools؛ مش tier من tiers الـ architecture بتاعة النظام.",
     "الـ database server ده الـ tier التالت (اللي ورا)؛ الـ middle tier هو الـ application server اللي بيعمل الـ processing.",
     "صح. الـ Three-tier: جهاز الـ user (presentation) وبعده الـ application server (processing) وبعده الـ database server؛ وعلى الـ Web: الـ browser ثم الـ <bdi dir=\"ltr\">web/app&nbsp;server</bdi> ثم الـ DB server (L2).",
     "الـ browser بتاع الـ user ده الـ presentation tier اللي قدام؛ الـ processing في النص على الـ application server."
    ]
   ],
   "extra": [
    [
     "صح. requirements مقفولة، مشاركة users محدودة، و documentation تقيلة.",
     "الـ RAD معتمد على user involvement كبير عن طريق الـ JAD والـ prototypes، يعني الـ users مش بيتسألوا مرة واحدة في الأول وخلاص.",
     "الـ Prototyping بيشتغل قريب جدًا من الـ users، وبيعدّل النظام الشغّال بعد كل جولة، يعني الـ users مش بيتقفل عليهم بعد البداية.",
     "الـ Agile ده adaptive وبيركّز على الناس أكتر من الـ roles والـ process، عكس الـ requirements المقفولة والـ documentation التقيلة."
    ],
    [
     "الـ Code generation ده function في الـ CASE بتطلّع code من الـ designs؛ إنك تعدّل الشاشات كذا مرة والـ user بيتفرّج ده الـ prototyping.",
     "الـ Waterfall فيه رجوع لورا قليل جدًا ومشاركة الـ users بس في مرحلة الـ requirements، فمفيهوش لفّات feedback.",
     "الـ JAD هو كذا يوم اجتماعات جماعية structured.",
     "صح. ده مثال الـ Visual Basic اللي في المحاضرة."
    ],
    [
     "الـ Logical design مستقل عن الـ platform؛ اختيار DBMS وserver وnetwork ده قرار خاص بالتكنولوجيا (physical design).",
     "صح. بيحوّل الـ logical specs لتفاصيل technology-specific.",
     "الـ Planning بيحدد احتياجات الـ IS ويرتبها بالأولوية.",
     "الـ Analysis بيدرس الـ requirements وينظّمها ويرشّح حل؛ ما بيختارش التكنولوجيا لـ design متوافق عليه."
    ],
    [
     "صح. بتشيك أوتوماتيك على الـ specifications الناقصة أو المتعارضة أو الغلط.",
     "الـ code generator بيطلّع program code وDB code من الـ designs؛ ما بيراجعش الـ DFD عشان inputs ناقصة.",
     "الـ Display and report generators بتعمل prototype لشكل الشاشات والـ reports؛ مراجعة الـ DFDs بتعملها الـ analysis tools.",
     "الـ Documentation generators بتطلّع documents تقنية وللـ users؛ ما بتراجعش الـ diagrams عشان الـ specifications الناقصة."
    ],
    [
     "الـ Form and report generators بتدعم الـ prototyping في الـ design والـ implementation؛ في الـ maintenance كل الأدوات بتتستخدم مع تركيز على الـ central repository.",
     "في الـ maintenance كل الـ CASE tools بتتستخدم، بس جدول المحاضرة بيخص بالذكر الـ central repository، مش الـ diagramming tools.",
     "صح. هو المرجع لأي تغيير في الـ design والكود.",
     "بتُستخدم في الـ project identification and selection."
    ],
    [
     "الـ 1950s كانت عن أتمتة الـ processes بالـ <bdi dir=\"ltr\">machine/assembly language</bdi> من الصفر؛ الـ CASE tools اتطورت في الـ 1980s.",
     "صح. الـ timeline بتاع المحاضرة بيقول إن في الـ 1970s الـ development بقى منظم أكتر، أقرب للـ engineering (L2, How analysis and design changed).",
     "الـ 1980s جابت الـ microcomputers والـ 4GLs والـ CASE tools؛ التركيز على الـ Internet والـ Web جه في الـ 1990s.",
     "كتابة كل حاجة بالـ <bdi dir=\"ltr\">machine/assembly language</bdi> دي الـ 1950s؛ الـ 1990s كان تركيزها على الـ integration والـ visual programming والـ Web."
    ],
    [
     "الـ JAD ده كذا يوم اجتماعات requirements منظمة، مش programming بشخصين مع automated tests.",
     "الـ Waterfall بيمشي الـ phases ورا بعض ومبيعملش test غير متأخر، مش code بيتعمله integrate خلال ساعات من كتابته.",
     "الـ RUP ده OO methodology ليها أربع iterative phases؛ الـ teams من شخصين والـ automated tests مع الـ customers دي features بتاعة الـ XP.",
     "صح. الـ XP بيستخدم programming teams من شخصين، وautomated tests بيكتبها الـ programmers والـ customers، وبيعمل integrate للـ code خلال ساعات قليلة من كتابته (L2, XP)."
    ],
    [
     "تكرار الخمس phases كلهم ده وصف الـ circular SDLC في <bdi dir=\"ltr\">Fig&nbsp;1-3</bdi>؛ الـ RAD بيكرر بس الـ user design والـ construction.",
     "الـ Inception والـ transition دول phases الـ RUP؛ أما phases الـ RAD هي الـ requirements planning والـ user design والـ construction والـ cutover.",
     "الـ Requirements planning (في الأول) والـ cutover (في الآخر) كل واحدة بتحصل مرة واحدة في الـ RAD؛ اللي بيلفّوا هما الاتنين اللي في النص بس.",
     "صح. في <bdi dir=\"ltr\">Fig&nbsp;1-13</bdi>، بعد الـ requirements planning، الـ RAD بيلف بين الـ user design والـ construction لحد ما يخلص، وبعدين يعمل cutover <bdi dir=\"ltr\">(L2,&nbsp;RAD)</bdi>."
    ],
    [
     "الـ Special issues دي واحدة من الخمس عناصر بتاعة الـ system request (الـ sponsor، والـ business need، والـ business requirements، والـ business value، والـ special issues).",
     "صح. الخمسة هما project sponsor و business need و business requirements و business value و special issues.",
     "الـ project sponsor هو أول عنصر في الـ system request، يعني موجود فيه؛ الـ source code لسه مش موجود أصلًا وقت الـ planning.",
     "الـ Business value (الفايدة المتوقعة) واحدة من الخمس عناصر بتاعة الـ system request، يعني موجودة فيه."
    ],
    [
     "صح. الـ Planning بياخد <bdi dir=\"ltr\">15%</bdi> من المشروع كله، فالإجمالي:<span class=\"ltr\">3 / 0.15 = 20 weeks</span>المرجع: <bdi dir=\"ltr\">Lab&nbsp;2,&nbsp;SDLC&nbsp;time&nbsp;split</bdi>.",
     "الـ 45 جاية من ضرب <bdi dir=\"ltr\">3&nbsp;×&nbsp;15</bdi>؛ الـ planning هو <bdi dir=\"ltr\">15%</bdi> من الإجمالي، فلازم تقسم:<span class=\"ltr\">3 / 0.15 = 20 weeks</span>",
     "الـ 10 جاية من <bdi dir=\"ltr\">3&nbsp;/&nbsp;0.30</bdi>، كده انت استخدمت نسبة الـ implementation (<bdi dir=\"ltr\">30%</bdi>)؛ الـ planning هو <bdi dir=\"ltr\">15%</bdi>، فالصح:<span class=\"ltr\">3 / 0.15 = 20 weeks</span>",
     "الـ 15 جاية من <bdi dir=\"ltr\">3&nbsp;/&nbsp;0.20</bdi>، كده انت استخدمت نسبة الـ analysis (<bdi dir=\"ltr\">20%</bdi>)؛ الـ planning هو <bdi dir=\"ltr\">15%</bdi>، فالصح:<span class=\"ltr\">3 / 0.15 = 20 weeks</span>"
    ]
   ]
  },
  "3": {
   "notes": [
    {
     "h": "مصطلحات أساسية",
     "pts": [
      "الـ <b>Project</b>: مجموعة أنشطة مرتبطة ببعض ومتخطط لها عشان توصل لهدف، وليها <b>بداية ونهاية</b>.",
      "الـ <b>Deliverable</b>: الناتج النهائي (end product) لـ phase من phases الـ SDLC.",
      "الـ <b>Project manager</b> هو systems analyst عنده مهارات متنوعة (<b>الـ management، والـ leadership، والـ technical، والـ conflict management، والـ customer relationship</b>) ومسؤول عن <b>initiating و planning و executing و closing down</b> للمشروع. بيئة شغل الـ PM كلها تغيير مستمر وحل مشاكل.",
      "الـ <b>System Service Request (SSR)</b> هو <b>form قياسي (standard form) لطلب أو اقتراح شغل systems development</b> جوه المنظمة. فيه <b>الـ contact person، والـ problem statement، والـ service request statement، وبيانات الـ liaison</b>.",
      "الـ <b>Project management</b> هو <b>controlled process للـ initiating والـ planning والـ executing والـ closing down</b> للمشروع. الـ Process بتمشي كده: أولاً الـ initiating، ثانياً الـ planning، ثالثاً الـ executing، رابعاً الـ closing down.",
      "الـ Case هي <b>Pine Valley Furniture (PVF)</b>، سيستم الـ purchasing fulfillment؛ الـ project managers هما <b>Juanita Lopez</b> (ممثلة الـ users) و<b>Chris Martin</b> (من جروب تطوير الـ IS، الـ liaison)."
     ],
     "figH": {
      "sa-pm-ssr": "الـ SSR بتاع سيستم الـ Purchasing Fulfillment جزء جزء (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-2</bdi>)",
      "sa-pm-process": "الـ project management process: أربع phases بالترتيب"
     }
    },
    {
     "h": "الأنشطة والمهارات الشائعة للـ project manager <bdi dir=\"ltr\">(Table&nbsp;3-1)</bdi>"
    },
    {
     "h": "المرحلة 1: بداية المشروع (Initiating) (5 أنشطة)",
     "pts": [
      "الـ <b>Project initiation</b>: أول phase، وفيها الأنشطة بتقيّم <b>حجم ونطاق وتعقيد (size, scope and complexity)</b> المشروع وبتحط procedures تدعم الأنشطة اللي بعد كده.",
      "(1) الـ <b>Establish the initiation team</b>: نواة أولية من أعضاء الـ team (في PVF هما Juanita و Chris).<br>(2) الـ <b>Establish a relationship with the customer</b>: بيبني شراكة وثقة؛ وبيتعيّن liaison بين الـ business unit والـ IS.<br>(3) الـ <b>Establish the project initiation plan</b>: أنشطة تنظيم الـ team وهما بيحددوا الـ goals والـ scope (هنتواصل إزاي، الـ deliverables، الخطوات، الـ deadlines، أجندة الاجتماعات).<br>(4) الـ <b>Establish management procedures</b>: هي procedures التواصل والـ reporting جوه الـ team.<br>(5) الـ <b>Establish the project management environment</b> والـ <b>project workbook</b>: تجميع وتنظيم الـ tools.",
      "الـ <b>Project workbook</b> هو <b>repository</b> أونلاين أو ورقي <b>لكل مراسلات المشروع والـ inputs والـ outputs والـ deliverables والـ procedures والـ standards</b>. الـ workbook بتاع PVF كان فيه 9 مستندات: الـ overview، والـ initiation plan والـ SSR، والـ scope and risks، والـ management procedures، والـ data descriptions، والـ process descriptions، والـ team correspondence، والـ statement of work، والـ project schedule.",
      "الـ <b>Project charter</b> (متأكد عليه في slide 25): <b>مستند قصير و high-level</b> معمول لـ <b>الـ stakeholders الداخليين والخارجيين الاتنين</b>؛ <b>بيعلن رسميًا إن المشروع اتعمل</b> وبيوصف باختصار <b>الـ objectives والـ key assumptions والـ stakeholders</b>.",
      "خطوات الـ initiation في PVF <bdi dir=\"ltr\">(Fig&nbsp;3-3)</bdi>: الأول Juanita لاحظت مشاكل، وبعدين كلّمت Chris عشان يبدأوا SSR، وبعدين الـ SSR اتراجع واتوافق عليه من الـ Systems Priority Board، وبعدين اتعيّنت steering committee، وفي الآخر اتعملت project plan تفصيلية واتنفذت."
     ],
     "figH": {
      "sa-pm-init-acts": "الخمس أنشطة بتوع الـ project initiation (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-5</bdi>)",
      "sa-pm-workbook": "الـ project workbook بتاع PVF ومستنداته التسعة (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-6</bdi>)",
      "sa-pm-pvf-init": "خطوات الـ initiation الخمسة في PVF واحدة واحدة (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-3</bdi>)"
     }
    },
    {
     "h": "المرحلة 2: تخطيط المشروع (Planning) (10 أنشطة، <bdi dir=\"ltr\">Fig&nbsp;3-8</bdi>)",
     "pts": [
      "الـ <b>Project planning</b>: تاني phase، بتركز على تحديد <b>أنشطة واضحة ومنفصلة (clear, discrete activities)</b> والشغل المطلوب عشان كل نشاط يخلص جوه مشروع واحد.",
      "(1) الـ <b>Describe project scope, alternatives and feasibility</b>: افهم المحتوى والتعقيد؛ واتفقوا على: إيه المشاكل/الفرص، إيه النتايج اللي تتقاس، إيه اللي لازم يتعمل، النجاح هيتقاس إزاي، وهنعرف إننا خلصنا إزاي؛ وبعدين حدد البدائل وقيّم الـ feasibility بتاعتها.",
      "(2) الـ <b>Divide the project into manageable tasks</b> (الـ WBS).<br>(3) الـ <b>Estimate resources and create a resource plan</b> (الـ COCOMO).<br>(4) الـ <b>Develop a preliminary schedule</b> (الـ Gantt والـ network).<br>(5) الـ <b>Develop a communication plan</b>.<br>(6) الـ <b>Determine project standards and procedures</b> (الـ tools، طرق الـ SDLC، أسلوب الـ documentation، الـ status reporting).<br>(7) الـ <b>Identify and assess risk</b> (مصادر الـ risk ونتايجها).<br>(8) الـ <b>Create a preliminary budget</b> (المصاريف والإيرادات المتخطط لها؛ وفي <bdi dir=\"ltr\">Fig&nbsp;3-12</bdi> الـ cost-benefit بالـ NPV والـ ROI والـ break-even).<br>(9) الـ <b>Develop a Statement of Work</b> أو الـ <b>Project Scope Statement</b> (للـ customer: الشغل اللي هيتعمل، إيه اللي هيتسلّم، الحجم، المدة، النتايج).<br>(10) الـ <b>Set a Baseline Project Plan (BPP)</b>: تقدير للـ tasks والـ resources بيُستخدم كدليل في التنفيذ.",
      "الـ <b>Work Breakdown Structure (WBS)</b>: عملية <b>تقسيم المشروع لـ tasks يتحكم فيها وترتيبها منطقيًا</b> عشان الانتقال بين الـ tasks يبقى سلس. فيه tasks بتمشي بالتوازي وفيه tasks ورا بعض؛ والترتيب بيعتمد على أنهي tasks بتطلّع deliverables محتاجاها tasks تانية.",
      "<b>خصائص الـ task</b>: بيعملها شخص واحد أو جروب محدد كويس؛ ليها deliverable واحد واضح؛ ليها method أو technique معروفة؛ خطوات قبلها وبعدها (predecessor and successor) متفق عليها؛ وتتقاس عشان تعرف نسبة الإنجاز.",
      "الـ <b>COCOMO</b>: طريقة منتشرة بتستخدم parameters مأخوذة من مشاريع قديمة بدرجات تعقيد مختلفة عشان تتوقع الـ human resources المطلوبة للـ systems الـ basic والـ intermediate والمعقدة جدًا (شوف Lecture 5).",
      "أسئلة الـ communication plan: مين الـ stakeholders؛ كل واحد محتاج information إيه؛ إمتى وكل قد إيه؛ من أنهي مصادر؛ مين بيجمعها ويخزنها ويتأكد منها؛ مين بيجهزها؛ مين الـ contact person؛ الـ format؛ وأنهي وسيلة أكفأ."
     ],
     "figH": {
      "sa-pm-plan-acts": "العشر أنشطة بتوع الـ project planning (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-8</bdi>)",
      "sa-pm-budget": "الـ cost-benefit analysis بتاع الـ preliminary budget، الـ NPV والـ ROI والـ break-even خطوة بخطوة (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-12</bdi>)",
      "sa-pm-wbs": "الـ WBS بيتبني task بعد task كـ Gantt chart، وبعدين كـ network diagram (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figures&nbsp;3-9&nbsp;and&nbsp;3-11</bdi>)"
     }
    },
    {
     "h": "المرحلة 3: تنفيذ المشروع (Executing) (5 أنشطة)",
     "pts": [
      "الـ <b>Project execution</b>: التالت phase، وفيها الخطط اللي اتعملت في الـ initiation والـ planning <b>بتتنفذ فعلًا (put into action)</b>.",
      "(1) الـ <b>Executing the BPP</b>: ابدأ الأنشطة، هات الـ resources ووزّعها، عرّف ودرّب الأعضاء الجداد، امشي على الـ schedule، واضمن جودة الـ deliverables.<br>(2) الـ <b>Monitoring progress against the BPP</b>.<br>(3) الـ <b>Managing changes to the BPP</b>: معاد خلصان نشاط اتأخر، نشاط اتعمل غلط ولازم يتعاد، نشاط جديد ظهر بعدين، تغيير مش متوقع في الأفراد (مرض، استقالة، فصل).<br>(4) الـ <b>Maintaining the project workbook</b>.<br>(5) الـ <b>Communicating the project status</b>.",
      "طرق التواصل: الـ meetings، والـ status reports، والـ minutes، والـ seminars and workshops، والـ bulletin boards، والـ memos، والـ specification documents، والـ brown-bag lunches، والـ hallway discussions، والـ newsletters، والـ project workbook."
     ],
     "figH": {
      "sa-pm-exec-acts": "الخمس أنشطة بتوع الـ project execution (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-13</bdi>)",
      "sa-pm-progress": "متابعة التقدم: نسبة الإنجاز على الـ Gantt chart (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-14</bdi>)"
     }
    },
    {
     "h": "طرق التواصل في الـ project team <bdi dir=\"ltr\">(Table&nbsp;3-2)</bdi>",
     "figH": {
      "sa-pm-comm-table": "الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Table&nbsp;3-2</bdi> كرسمة: الـ formality والـ use لكل طريقة"
     }
    },
    {
     "h": "المرحلة 4: قفل المشروع (Closing down) (متأكد عليها)",
     "pts": [
      "الـ <b>Project closedown</b>: <b>آخر phase</b>، بتركز على <b>إنهاء المشروع</b>.",
      "تلات أنشطة للـ closedown، هما: (1) الـ <b>closing down the project</b>، و(2) الـ <b>conducting post-project reviews</b>، و(3) الـ <b>closing the customer contract</b>."
     ],
     "figH": {
      "sa-pm-close-acts": "التلات أنشطة بتوع الـ project closedown (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-15</bdi>)"
     }
    },
    {
     "h": "تمثيل وجدولة خطط المشروع",
     "pts": [
      "الـ <b>Resources</b>: أي شخص، أو مجموعة أشخاص، أو جهاز، أو خامة بتُستخدم عشان نخلص نشاط.",
      "الـ <b>Critical path scheduling</b> هو technique جدولة فيها ترتيب ومدة سلسلة الأنشطة بيأثروا مباشرة على معاد خلصان المشروع.",
      "الـ <b>Critical path</b>: <b>سلسلة أنشطة (task activities) ترتيبها ومدتها بيأثروا مباشرة على معاد خلصان</b> المشروع.",
      "الـ <b>Gantt chart</b>: تمثيل graphical للمشروع بيوضح كل task كـ <b>bar أفقي طوله متناسب مع وقته</b>. الـ <b>Network diagram</b>: بيوضح الـ tasks والعلاقات بينها.",
      "<b>الـ Gantt مقابل الـ network</b> (slide 52): الـ Gantt charts بتوضح <b>مدة الـ tasks</b>، وبتوضح <b>التداخل في الوقت (time overlap)</b>، وبتوضح <b>الـ slack time في الـ duration</b>. الـ Network diagrams بتوضح <b>الـ dependencies بين الـ tasks</b>، <b>مابتوضحش الـ time overlap بس بتوضح الـ parallelism</b>، وبتوضح <b>الـ slack time في الـ boxes</b>.",
      "الـ Network diagramming هو critical path scheduling technique بيُستخدم لما الـ tasks: تبقى <b>محددة كويس (well-defined)</b> ليها بداية ونهاية واضحين؛ ينفع تتعمل <b>مستقلة (independently)</b> عن الـ tasks التانية؛ <b>مترتبة (ordered)</b>؛ و<b>بتخدم هدف</b> المشروع.",
      "الـ <b>Slack time</b> (متأكد عليه slide 68): الوقت اللي النشاط ممكن يتأخره <b>من غير ما يأخر المشروع</b>. الـ <b>Free slack</b>: تأخير من غير ما يأخر الـ early start لأي task جاية بعده على طول. الـ <b>Total slack</b>: تأخير من غير ما يأخر خلصان المشروع."
     ],
     "figH": {
      "sa-pm-abcde-net": "الـ network diagram: الأنشطة دواير والترتيب أسهم (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-18</bdi>)",
      "sa-pm-gantt-net": "الـ Gantt chart قصاد الـ network diagram لنفس مشروع الـ SPTS (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-16</bdi>، slide 52)",
      "sa-pm-slack": "جرّب: أخّر نشاط في الـ SPTS وشوف معاد خلصان المشروع هيتحرك ولا لأ"
     }
    },
    {
     "h": "تقدير الـ PERT ومثال الـ <bdi dir=\"ltr\">PVF&nbsp;/&nbsp;SPTS</bdi>",
     "figH": {
      "sa-pm-pert": "الـ expected time بالـ PERT لأنشطة الـ SPTS صف صف (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figure&nbsp;3-19</bdi>)، ومعاه calculator",
      "sa-pm-spts-cpm": "الـ critical path بتاع الـ SPTS: الـ forward pass والـ backward pass والـ slack (الـ <bdi dir=\"ltr\" style=\"white-space:nowrap\">Figures&nbsp;3-22&nbsp;to&nbsp;3-24</bdi>)"
     }
    },
    {
     "h": "استخدام برامج الـ project management (الـ MS Project)",
     "pts": [
      "بيساعد في: تحديد <b>معاد بداية أو نهاية</b> المشروع؛ <b>إدخال الـ tasks وتحديد العلاقات بينها</b>؛ و<b>اختيار طريقة scheduling</b> عشان تراجع الـ project reports.",
      "في الـ Gantt chart: <b>الخط الأسود اللي فوق معناه summary activity</b> (متكوّن من subtasks)؛ و<b>الـ diamond معناه milestone</b>.",
      "في الـ Network diagram: <b>الـ hexagon معناه milestone</b>؛ و<b>الـ boxes والأسهم الحمرا هي الـ critical path</b> (مفيش slack)."
     ],
     "figH": {
      "sa-pm-msproject": "رموز الـ MS Project: الـ summary bar والـ diamond في الـ Gantt chart، والـ hexagon والـ critical path الأحمر في الـ network"
     }
    }
   ],
   "cards": [
    "مجموعة أنشطة مرتبطة ومتخطط لها عشان توصل لهدف، وليها بداية ونهاية.",
    "الناتج النهائي لـ phase من phases الـ SDLC.",
    "هو systems analyst عنده مهارات management و leadership و technical و conflict-management و customer-relationship، ومسؤول عن initiating و planning و executing و closing down للمشروع.",
    "هو form قياسي لطلب أو اقتراح شغل systems development جوه المنظمة.",
    "الـ Contact person، الـ problem statement، الـ service request statement، بيانات الـ liaison.",
    "هو controlled process للـ initiating والـ planning والـ executing والـ closing down للمشروع.",
    "هو repository أونلاين أو ورقي لكل مراسلات المشروع والـ inputs والـ outputs والـ deliverables والـ procedures والـ standards.",
    "مستند قصير و high-level للـ stakeholders الداخليين والخارجيين، بيعلن المشروع رسميًا ويوصف الـ objectives والـ assumptions والـ stakeholders.",
    "تاني phase: تحديد أنشطة واضحة ومنفصلة والشغل المطلوب لكل واحد.",
    "تقسيم المشروع لـ tasks يتحكم فيها وترتيبها منطقيًا عشان الانتقال بينها يبقى سلس.",
    "تقدير للـ tasks والـ resources المطلوبة للمشروع، بيُستخدم كدليل في التنفيذ.",
    "للـ customer: الشغل اللي هيتعمل وإيه اللي هيتسلّم؛ الحجم، المدة، النتايج.",
    "تالت phase: الخطط اللي اتعملت في الـ initiation والـ planning بتتنفذ.",
    "الـ Closing down the project؛ والـ post-project reviews؛ والـ closing the customer contract.",
    "أي شخص أو مجموعة أشخاص أو جهاز أو خامة بتُستخدم عشان نخلص نشاط.",
    "سلسلة أنشطة ترتيبها ومدتها بيأثروا مباشرة على معاد خلصان المشروع.",
    "الوقت اللي النشاط ممكن يتأخره من غير ما يأخر المشروع.",
    "الـ Gantt بيوضح الـ slack في الـ duration؛ والـ network بيوضحه في الـ boxes.",
    "الـ Diamond في الـ Gantt chart؛ والـ hexagon في الـ network diagram.",
    "المعادلة:<span class=\"ltr\">ET = (o + 4r + p) / 6</span>"
   ],
   "qa": [
    "الـ Project management هو controlled process للـ initiating والـ planning والـ executing والـ closing down للمشروع.<br>الـ <b>Initiation</b>: تقييم الحجم والنطاق والتعقيد وحط procedures (الـ initiation team، العلاقة مع الـ customer، الـ initiation plan، الـ management procedures، الـ PM environment والـ workbook؛ الـ project charter).<br>الـ <b>Planning</b>: تحديد أنشطة واضحة ومنفصلة والشغل المطلوب لكل واحد (الـ scope والـ feasibility، الـ WBS، الـ resources (COCOMO)، الـ schedule، الـ communication plan، الـ standards، الـ risk، الـ budget، الـ statement of work، الـ baseline project plan).<br>الـ <b>Execution</b>: تنفيذ الخطط (تنفيذ الـ BPP، متابعة التقدم، إدارة التغييرات، الحفاظ على الـ workbook، توصيل حالة المشروع).<br>الـ <b>Closedown</b>: إنهاء المشروع (الـ close down the project، والـ post-project reviews، والـ close the customer contract).",
    "الـ SSR هو form قياسي لطلب أو اقتراح شغل systems development جوه المنظمة؛ فيه الـ contact person والـ problem statement والـ service request statement وبيانات الـ liaison. الـ Project charter هو مستند قصير و high-level معمول للـ stakeholders الداخليين والخارجيين الاتنين؛ بيعلن رسميًا إن المشروع اتعمل وبيوصف باختصار الـ objectives والـ key assumptions والـ stakeholders.",
    "الخطوات:<br>(1) الـ Establish the initiation team.<br>(2) الـ Establish a relationship with the customer (تعيين liaison).<br>(3) الـ Establish the initiation plan (التواصل، الـ deliverables، الخطوات، الـ deadlines).<br>(4) الـ Establish management procedures (التواصل والـ reporting).<br>(5) الـ Establish the project management environment والـ project workbook.<br>والـ project charter هو اللي بيعلن المشروع رسميًا.",
    "وصف الـ scope والبدائل والـ feasibility؛ تقسيم المشروع لـ tasks يتحكم فيها (WBS)؛ تقدير الـ resources وعمل resource plan؛ عمل preliminary schedule؛ عمل communication plan؛ تحديد الـ standards والـ procedures؛ تحديد وتقييم الـ risk؛ عمل preliminary budget؛ كتابة statement of work (scope statement)؛ وتحديد baseline project plan.",
    "الـ Gantt charts بتوضح كل task كـ bar متناسب مع مدته، وبتوضح التداخل في الوقت بين الـ tasks، وبتوضح الـ slack time في الـ duration. الـ Network diagrams بتوضح الـ dependencies بين الـ tasks، مابتوضحش الـ time overlap بس بتوضح الـ parallelism، وبتوضح الـ slack time في الـ boxes. والـ network diagramming هو critical path scheduling technique بيُستخدم لما الـ tasks تبقى محددة كويس ليها بداية ونهاية واضحين، ينفع تتعمل مستقلة، مترتبة، وبتخدم هدف المشروع.",
    "الـ WBS هو تقسيم المشروع لـ tasks يتحكم فيها وترتيبها منطقيًا عشان الانتقال بينها يبقى سلس. الـ Slack time هو الوقت اللي النشاط ممكن يتأخره من غير ما يأخر المشروع (الـ free slack: من غير ما يأخر الـ early start للـ tasks اللي بعده؛ الـ total slack: من غير ما يأخر خلصان المشروع). الـ Critical path هو سلسلة أنشطة ترتيبها ومدتها بيأثروا مباشرة على معاد خلصان المشروع (الـ slack بتاعها صفر). الـ Project workbook هو repository أونلاين أو ورقي لكل مراسلات المشروع والـ inputs والـ outputs والـ deliverables والـ procedures والـ standards.",
    "معاد خلصان نشاط يتأخر؛ نشاط اتعمل غلط ولازم يتعاد؛ نشاط جديد يظهر بعدين؛ تغيير مش متوقع في الأفراد بسبب مرض أو استقالة أو فصل."
   ],
   "quiz": [
    [
     "صح. الـ Slack time هو الوقت اللي الـ activity ممكن تتأخره من غير ما المشروع كله يتأخر؛ على الـ network بيتحسب TL − TE (L3, emphasised slide 68).",
     "الـ Free slack ليه علاقة بالـ early start للـ tasks اللي بعده، مش بنهاية المشروع.",
     "الـ baseline project plan ده تقدير الـ tasks والـ resources اللي بيتحدد في آخر الـ planning عشان يوجّه الـ execution؛ مش مقياس للوقت الفاضي.",
     "الـ critical path هو سلسلة الـ activities اللي الـ slack بتاعها صفر، فأي تأخير فيها يأخّر المشروع؛ هو مش الوقت الفاضي نفسه."
    ],
    [
     "الـ deliverable هو الناتج النهائي لـ phase في الـ SDLC.",
     "الـ Stakeholders هما الأطراف المهتمة بالمشروع، مش التعريف ده.",
     "ضيقة أوي؛ الـ resources فيها أجهزة وخامات كمان.",
     "صح. المحاضرة بتعرّف الـ resources إنها أي شخص أو مجموعة ناس أو جهاز أو material بيتستخدم في تنفيذ activity (L3, Representing project plans)."
    ],
    [
     "الـ network diagram بيوضح الـ tasks والعلاقات بينها.",
     "صح. الـ critical path هو تسلسل الـ activities اللي ترتيبها ومددها بيأثروا مباشرة على تاريخ انتهاء المشروع؛ الـ activities بتاعته الـ slack بتاعها صفر (L3).",
     "الـ Gantt chart بيرسم كل task كـ bar أفقي طوله على قد وقتها؛ ده chart، مش التسلسل اللي بيحدد تاريخ الانتهاء.",
     "الـ WBS بيقسّم المشروع لـ tasks يتحكم فيها ومترتبة منطقيًا؛ التسلسل الحرج من ناحية المدة اللي بيعدّي عليهم ده الـ critical path."
    ],
    [
     "صح. الـ WBS هو عملية تقسيم المشروع لـ tasks يتحكم فيها وترتيبها منطقيًا عشان الانتقال بين الـ tasks يمشي بسلاسة (L3, Planning activity 2).",
     "الـ baseline project plan ده تقدير الـ tasks والـ resources اللي بيوجّه الـ execution، وهو آخر activity في الـ planning، مش عملية تقسيم الشغل.",
     "ده مصطلح الـ DFD (تقسيم وصف السيستم لتفاصيل أدق).",
     "الـ project charter ده document قصير high-level بيعلن المشروع رسميًا للـ stakeholders؛ ما بيقسّمش الـ tasks."
    ],
    [
     "الـ status report بيبلّغ الـ team والـ stakeholders بالتقدم أثناء الـ execution (high formality)؛ مش الـ document القصير اللي بيعلن المشروع.",
     "الـ workbook هو repository لكل مستندات المشروع.",
     "صح. الـ project charter ده document قصير high-level للـ stakeholders اللي جوه وبرّه، بيعلن رسميًا عن المشروع وأهدافه والـ assumptions والـ stakeholders بتوعه (L3, slide 25).",
     "الـ SSR هو الـ form القياسي اللي بيتستخدم عشان تطلب أو تقترح شغل development، وبيتملي قبل ما المشروع يبقى موجود أصلًا، مش document للـ stakeholders اللي برّه."
    ],
    [
     "الـ CASE فيه repository، بس الجملة دي تعريف الـ project workbook.",
     "صح. الـ project workbook ده repository (online أو ورق) لكل مراسلات المشروع والـ inputs والـ outputs والـ deliverables والـ procedures والـ standards (L3, Initiation).",
     "الـ BPP ده تقدير الـ tasks والـ resources في آخر الـ planning؛ المكان اللي بيتخزن فيه كل documents المشروع هو الـ project workbook.",
     "الـ project charter ده إعلان قصير high-level عن المشروع، مش repository لكل مراسلاته والـ deliverables بتاعته."
    ],
    [
     "الـ statement of work بيتكتب للـ customer أثناء الـ planning وبيوصف الشغل والـ deliverables والحجم والمدة؛ مش الـ form بتاع الطلب.",
     "الـ project charter بيعلن رسميًا عن project اتوافق عليه؛ طلب أو اقتراح الشغل من الأول بيتعمل بالـ SSR.",
     "الـ feasibility study بتقيّم نكمّل ولا لأ وبتحدد الـ risks؛ الـ form القياسي للطلب هو الـ System Service Request.",
     "صح. الـ SSR ده form قياسي لطلب أو اقتراح شغل systems development؛ فيه الـ contact person والـ problem statement والـ service request statement والـ liaison contact (L3)."
    ],
    [
     "الـ DFDs بتمثّل حركة الداتا، مش tasks المشروع.",
     "الـ Gantt chart بيعرض كل task كـ bar على قد مدتها وبيبيّن الـ time overlap، بس ما بيوضّحش العلاقات بين الـ tasks.",
     "الـ WBS بيقسّم الـ tasks ويرتبها؛ الـ diagram اللي بيوضّح الـ tasks والعلاقات بينها هو الـ network diagram.",
     "صح. المحاضرة بتعرّف الـ network diagram إنه diagram بيوضّح الـ project tasks والعلاقات بينها (dependencies)، والـ slack بيظهر في boxes (L3)."
    ],
    [
     "الـ problem statement واحد من الأربع أجزاء بتوع الـ SSR (الـ contact person، والـ problem statement، والـ service request statement، والـ liaison contact)، يعني موجود فيه.",
     "صح. الـ SSR فيه الـ contact person والـ problem statement والـ service request statement وبيانات الـ liaison.",
     "الـ liaison contact information واحد من الأربع أجزاء بتوع الـ SSR، يعني موجود؛ الـ Gantt chart بيتعمل بعدين في الـ planning.",
     "الـ contact person هو أول جزء من الأربع أجزاء بتوع الـ SSR، يعني موجود في الـ form."
    ],
    [
     "صح. الـ project management هو process متحكَّم فيه: initiating ثم planning ثم executing ثم closing down، بالترتيب ده (L3, Basic terms).",
     "الـ analysis والـ design والـ implementation دول phases الـ SDLC؛ أما phases الـ project management فهي الـ initiating والـ planning والـ executing والـ closing down.",
     "الـ planning لازم ييجي قبل الـ executing: الـ execution بينفّذ الخطط اللي اتعملت في الـ initiation والـ planning.",
     "الـ Initiation هي أول phase (بتقيّم الحجم والـ scope والـ complexity)؛ والـ planning بييجي بعدها."
    ],
    [
     "متابعة التقدم مقارنة بالـ BPP دي activity رقم 2 في الـ execution، مش الـ closedown.",
     "تحديد الـ baseline project plan ده آخر activity في الـ planning (activity 10)، مش الـ closedown.",
     "صح. الـ Closedown فيه الـ close down، والـ post-project reviews، والـ close customer contract.",
     "تكوين الـ initiation team ده أول activity في الـ initiation، في أول المشروع خالص."
    ],
    [
     "الـ task dependencies والـ slack في boxes دي features الـ network diagram في slide 52؛ الـ Gantt charts بتعرض الـ slack كـ duration.",
     "الـ Network diagrams مابتوضحش الـ time overlap؛ بتوضح الـ parallelism.",
     "صح. Slide 52: الـ Gantt charts بتعرض مدد الـ tasks والـ time overlap والـ slack time كـ duration، أما الـ network diagrams فبتعرض الـ dependencies والـ slack في boxes (L3).",
     "الـ network diagrams بس هي اللي بتعرض الـ slack في boxes؛ الـ Gantt charts بتعرض الـ slack time كـ duration على الـ bar."
    ],
    [
     "صح. في الـ network diagram بتاع MS Project، الـ boxes والأسهم الحمرا بتعلّم الـ critical path، يعني الـ activities اللي مفيهاش slack (L3, Project management software).",
     "الخط الأسود اللي فوق في الـ Gantt chart بتاع MS Project ده summary activity متكوّنة من subtasks، مش الـ critical path.",
     "الـ diamond ده milestone على الـ Gantt chart بتاع MS Project، مش الـ critical path.",
     "الـ hexagon ده milestone على الـ network diagram بتاع MS Project؛ الـ critical path لونه أحمر."
    ],
    [
     "إن الـ task يكون ليها predecessor وsuccessor steps واضحين دي واحدة من الخمس خصائص المذكورة للـ task، فمينفعش تكون الإجابة.",
     "إن الـ task يكون ليها deliverable واحد واضح دي واحدة من الخمس خصائص المذكورة، فمينفعش تكون الإجابة.",
     "إن الـ task تكون measurable عشان تعرف الـ percent completed دي واحدة من الخمس خصائص، فمينفعش تكون الإجابة.",
     "صح. الـ task ممكن يعملها شخص واحد أو جروب محدد كويس."
    ],
    [
     "الـ Database design (4) موجودة على الـ critical paths الاتنين:<span class=\"ltr\">1-2-4-6-7-8, 1-3-4-6-7-8</span>وعندها:<span class=\"ltr\">TE = TL = 13</span>يعني الـ slack بتاعها 0.",
     "صح. الـ Activity 5 عندها:<span class=\"ltr\">TE = 18.5, TL = 21</span>فالـ slack:<span class=\"ltr\">slack = 21 − 18.5 = 2.5 weeks</span>وكل الـ activities التانية الـ slack بتاعها صفر <bdi dir=\"ltr\">(L3,&nbsp;SPTS)</bdi>. (لو كانت:<span class=\"ltr\">ET5 = 34/6 ≈ 5.67</span>يبقى الـ slack حوالي <bdi dir=\"ltr\">2.33</bdi>.)",
     "الـ Programming (6) على الـ critical paths:<span class=\"ltr\">1-2-4-6-7-8, 1-3-4-6-7-8</span>وعندها:<span class=\"ltr\">TE = TL = 18</span>يعني الـ slack بتاعها 0.",
     "الـ Testing (7) على الـ critical paths، وعندها:<span class=\"ltr\">TE = TL = 21</span>يعني الـ slack بتاعها 0؛ الوحيدة اللي عندها slack هي activity 5."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">ET = (o + 4r + p)/6 = (3 + 4×7 + 11)/6 = 42/6 = 7</span>المرجع: <bdi dir=\"ltr\">L3,&nbsp;PERT&nbsp;estimate</bdi>.",
     "عشان تطلع 6 لازم البسط يبقى 36؛ بس الـ realistic value وزنها 4، فالمجموع:<span class=\"ltr\">3 + 28 + 11 = 42</span>و:<span class=\"ltr\">ET = 42/6 = 7</span>",
     "عشان تطلع <bdi dir=\"ltr\">7.5</bdi> لازم البسط يبقى 45؛ المجموع الصح:<span class=\"ltr\">3 + 4×7 + 11 = 42</span>و <bdi dir=\"ltr\">42/6</bdi> بالظبط 7.",
     "نسيت تقسم على 6 (أو جمعت o + r + p)."
    ]
   ],
   "extra": [
    [
     "الـ SOW بيوصف الـ deliverables للـ customer.",
     "الـ charter بيتكتب بعد الموافقة عشان يعلن المشروع.",
     "صح. الـ form اللي بيوصف مشكلة ويطلب من الـ IS يبني system هو الـ System Service Request، الـ form القياسي لطلب شغل development؛ في PVF، اللي بدأوه هما Juanita و Chris (L3).",
     "الـ BPP بيتحدد في آخر الـ planning عشان يوجّه الـ execution؛ في مرحلة الطلب المشروع لسه حتى ما اتوافقش عليه."
    ],
    [
     "الـ SSR بس بيطلب أو يقترح الشغل؛ الإعلان الرسمي بعد الموافقة هو الـ project charter.",
     "الـ status report بيبلّغ الناس بالتقدم أثناء الـ execution؛ ما بيعلنش إن المشروع اتعمل.",
     "صح. الـ project charter ده document قصير high-level للـ stakeholders اللي جوه وبرّه، بيعلن رسميًا إن المشروع اتأسس (L3, slide 25).",
     "الـ project workbook ده الـ repository بتاع كل documents ومراسلات المشروع، مش إعلان قصير للـ stakeholders اللي برّه."
    ],
    [
     "صح. الـ Managing changes to the BPP (execution activity 3) بيشمل صراحةً أي تغيير مش متوقع في الـ personnel بسبب مرض أو استقالة أو فصل (L3, Execution).",
     "الـ risk بيتخطط له، بس التغيير الفعلي بيتدار وقت الـ execution.",
     "الـ post-project reviews بتحصل في الـ closedown بعد ما الشغل يخلص؛ عضو الـ team العيّان لازم يتحل أمره والمشروع شغّال.",
     "تكوين الـ initiation team بيعمل أول core team في البداية؛ إنك تبدّل عضو عيّان في نص المشروع ده managing changes أثناء الـ execution."
    ],
    [
     "الـ Specification documents الـ formality بتاعتها high، ووظيفتها إنها تبلّغ وتفضل permanent record <bdi dir=\"ltr\">(Table&nbsp;3-2)</bdi>.",
     "الـ project workbook الـ formality بتاعه high، وبيتستخدم للإبلاغ وكـ permanent record <bdi dir=\"ltr\">(Table&nbsp;3-2)</bdi>.",
     "الـ Status reports الـ formality بتاعتها high، وبتتستخدم للإبلاغ، مش لحل المشاكل <bdi dir=\"ltr\">(Table&nbsp;3-2)</bdi>.",
     "صح. الـ <bdi dir=\"ltr\">Table&nbsp;3-2</bdi> بيحط الـ hallway discussions بـ formality low، وبتتستخدم للإبلاغ وحل المشاكل <bdi dir=\"ltr\">(L3, Communication methods)</bdi>."
    ],
    [
     "الـ project ده شغل مخطط فيه activities كتير مرتبطة ببعض وليه بداية ونهاية؛ الخصائص المذكورة بتوصف task واحدة منه.",
     "صح. الخمس خصائص بتوع الـ task: بيعملها شخص واحد أو مجموعة محددة، ليها deliverable واحد واضح، ليها method معروفة، الـ predecessors والـ successors واضحين، وmeasurable (L3, WBS).",
     "الـ milestone ده event عند نقطة مفيهوش duration (diamond في MS Project)، فمش حاجة بيعملها شخص بـ method.",
     "الـ deliverable ده end product لـ phase في الـ SDLC؛ الخصائص المذكورة (الـ method، والـ predecessors، والتقدم الـ measurable) بتوصف وحدة الشغل، يعني الـ task."
    ],
    [
     "صح. الـ communication plan (planning activity 5) بيسأل: مين الـ stakeholders، كل واحد محتاج معلومات إيه، إمتى وكل قد إيه، وبأي format وmedium (L3).",
     "الـ preliminary budget بيحط المصاريف والإيرادات المخططة (الـ cost-benefit، والـ NPV، والـ ROI)؛ ما بيخططش لمعلومات الـ stakeholders.",
     "الـ Identifying and assessing risk بيبص على مصادر الـ risk ونتايجها، مش على مين محتاج أنهي معلومات.",
     "الـ BPP ده تقدير الـ tasks والـ resources اللي بيوجّه الـ execution، مش خطة تواصل مع الـ stakeholders."
    ],
    [
     "الـ 3 والـ 4 دول بس الـ realistic values (r)؛ الـ PERT بيوزنهم مع o و p:<span class=\"ltr\">(1 + 4×3 + 11)/6 = 4</span><span class=\"ltr\">(2 + 4×4 + 12)/6 = 5</span>",
     "المتوسط العادي هو:<span class=\"ltr\">(1+3+11)/3 = 5</span>وده مش معادلة الـ PERT.",
     "صح. الحساب:<span class=\"ltr\">(1+12+11)/6 = 24/6 = 4</span><span class=\"ltr\">(2+16+12)/6 = 30/6 = 5</span>",
     "الـ 5 والـ 6 دول المتوسط العادي:<span class=\"ltr\">(1+3+11)/3, (2+4+12)/3</span>معادلة الـ PERT بتدي:<span class=\"ltr\">24/6 = 4, 30/6 = 5</span>"
    ],
    [
     "الـ critical activities عندها <bdi dir=\"ltr\">TE&nbsp;=&nbsp;TL</bdi> (الـ slack صفر)؛ هنا:<span class=\"ltr\">TL − TE = 2.5</span>يعني activity 5 مش على الـ critical path.",
     "صح. الـ Slack:<span class=\"ltr\">Slack = TL − TE = 21 − 18.5 = 2.5 weeks</span>يعني activity 5 ممكن تتأخر القدر ده من غير ما المشروع اللي مدته 22 week يتأخر <bdi dir=\"ltr\">(L3,&nbsp;SPTS)</bdi>.",
     "الـ Slack ده وقت فاضي مش تأخير؛ المشروع هيخلص برضه في 22 weeks طالما activity 5 ما اتأخرتش أكتر من 2.5 weeks.",
     "الـ <bdi dir=\"ltr\">TL&nbsp;=&nbsp;21</bdi> ده آخر وقت ممكن activity 5 تخلص فيه (week 21)، مش وقت بدايتها؛ وأبدر وقت تخلص فيه <bdi dir=\"ltr\">18.5</bdi>."
    ],
    [
     "عرض الـ slack كـ duration ده أسلوب الـ Gantt chart؛ الـ network diagrams بتعرضه في boxes (slide 52).",
     "المدد كأطوال bars دي feature بتاعة الـ Gantt chart؛ الـ network diagram بيعرض الـ dependencies بدالها.",
     "الـ time overlap بتعرضه الـ Gantt charts؛ والـ slide 52 بتقول إن الـ network diagrams ما بتعرضش الـ time overlap بس بتعرض الـ parallelism.",
     "صح. Slide 52: الـ network diagrams بتعرض الـ task dependencies والـ slack time في boxes، وده اللي الـ Gantt charts ما بتعملوش (L3, Gantt vs network)."
    ],
    [
     "ده الخط الأسود اللي فوق في الـ Gantt chart.",
     "الـ Dummy activities بتاعة الـ arrow networks، مش الـ MS Project.",
     "الـ critical path بيظهر في MS Project كـ boxes وأسهم حمرا، مش diamonds ولا hexagons.",
     "صح. في MS Project الـ milestone بيبقى diamond على الـ Gantt chart وhexagon على الـ network diagram (L3, Project management software)."
    ]
   ]
  },
  "4": {
   "notes": [
    {
     "h": "الـ Process modeling والـ deliverables",
     "pts": [
      "الـ DFDs بتُستخدم عشان تمثّل المعلومات اللي اتجمعت في الـ <b>requirements determination</b> (في مرحلة الـ <b>analysis</b>: الـ requirements determination وبعدها الـ <b>requirements structuring</b>).",
      "الـ <b>Process modeling</b>: تمثيل graphical للـ processes اللي <b>بتجمع وتعالج وتخزن وتوزّع الداتا (capture, manipulate, store and distribute)</b> بين السيستم والـ environment بتاعه وبين components السيستم وبعضها. أشهر شكل ليه هو الـ DFD. وكمان بتعمل model للـ processing logic والـ timing والـ data structures.",
      "الـ Deliverables هي: الـ <b>context DFD</b> (الـ scope: أنهي عناصر جوه السيستم وأنهي برّاه)؛ والـ <b>DFDs للسيستم الحالي الـ physical والـ logical</b> (عشان نفهم السيستم الحالي)؛ والـ <b>DFDs للسيستم الجديد الـ logical</b> (مستقلة عن التكنولوجيا؛ الـ data flows والـ structure والـ functional requirements)؛ و<b>وصف كامل لكل component في الـ DFD</b>.",
      "الـ <b>DFD</b>: صورة لـ <b>حركة الداتا بين الـ external entities والـ processes والـ data stores</b> جوه السيستم. على عكس الـ system flowcharts، الـ DFDs بتوضح الـ data flow الـ <b>logical</b> بشكل مستقل عن التكنولوجيا؛ إنما الـ flowcharts بتوضح تفاصيل الـ systems الـ <b>physical</b>."
     ],
     "figH": {
      "sa-dfd-sdlc": "مكان الـ DFDs: مرحلة الـ analysis في الـ SDLC (الـ <bdi dir=\"ltr\">Figure&nbsp;7-1</bdi>)"
     }
    },
    {
     "h": "الأربع symbols بتوع الـ DFD",
     "figH": {
      "sa-dfd-symbols": "الأربع symbols بالشكلين، الـ DeMarco and Yourdon قصاد الـ Gane and Sarson (الـ <bdi dir=\"ltr\">Figure&nbsp;7-2</bdi>)"
     }
    },
    {
     "h": "قواعد رسم الـ DFD (متأكد عليها slides 8 لـ 13: سؤال الـ \"errors\")",
     "pts": [
      "الـ <b>Process</b>: مفيش process ينفع يبقى ليه <b>outputs بس</b> (اسمها \"miracle\") أو <b>inputs بس</b> (اسمها \"black hole\")؛ كل process لازم يبقى ليه inputs و outputs الاتنين. والـ process labels بتبقى verb phrases.",
      "الـ <b>Data store</b>: <b>كل الـ flows الداخلة أو الخارجة من الـ data store لازم تعدّي على process</b>؛ الداتا ماينفعش تتنقل مباشرة من store لـ store، ولا بين store و external entity.",
      "الـ <b><bdi dir=\"ltr\">Source/sink</bdi></b>: <b>مفيش داتا بتتنقل مباشرة بين external entities</b> من غير ما تعدّي على process؛ التعاملات دي برّه السيستم ومابتترسمش.",
      "الـ <b>Data flow</b>: الـ flow اللي في الاتجاهين بين process و data store بيترسم <b>سهمين منفصلين</b>. الـ flow الـ <b>forked</b> (مصدر واحد، كذا destination) والـ flow الـ <b>joined</b> (كذا مصدر، destination واحد) لازم يشيروا لـ <b>نفس الـ data item بالظبط</b>. الـ data flow <b>ماينفعش يطلع من process ويرجع لنفس الـ process مباشرة</b>؛ لازم يعدّي على processes في النص. والـ flow labels بتبقى noun phrases.",
      "<b>الـ Update مقابل الـ retrieve</b>: الـ flow <b>من process لـ data store معناه update</b> (insert أو delete أو change)؛ والـ flow <b>من data store لـ process معناه retrieve أو use</b>.",
      "من الـ DFD deck: استخدم الأسهم اللي براسين (double-headed) بس لما الـ process بيقرا ويعدّل في نفس الـ table أو الـ file؛ اسم الـ process بيبقى verb-adjective-noun؛ والـ process بتاع السيستم كله رقمه 0."
     ],
     "figH": {
      "sa-dfd-rules": "كل rule مترسومة: الممنوع قصاد المسموح (slides 9 لـ 13)",
      "sa-dfd-check": "جرّب الـ rules: ضيف flows وشوف أنهي rules بتكسرها، وأنهي flows تبقى update أو retrieve"
     }
    },
    {
     "h": "الـ Decomposition ومستويات الـ DFD",
     "pts": [
      "الـ <b>Functional decomposition</b> هي <b>process iterative بتكسّر فيها وصف السيستم لتفاصيل أدق وأدق</b>؛ الـ processes الـ high-level بتتوصف بـ sub-processes في مستوى أقل؛ وبيترسم DFD لكل مستوى.",
      "الـ <b>Context diagram</b>: بيوضح <b>حدود السيستم (system boundaries)</b>، والـ external entities اللي بتتعامل معاه، والـ information flows الأساسية بينهم وبين السيستم. <b>process symbol واحد بس (رقمه 0)، ومفيش data stores.</b>",
      "الـ <b><bdi dir=\"ltr\">Level-0</bdi> DFD</b> (الـ Diagram 0، تفصيل الـ process 0): <b>الـ processes والـ data flows والـ data stores الأساسية للسيستم في مستوى high-level</b>. الـ processes بتترقم <b><bdi dir=\"ltr\">1.0,&nbsp;2.0,&nbsp;...</bdi></b>؛ المفروض يبقى فيه لحد <b>7 أو 9 processes</b>؛ وبيظهر فيه الـ data stores الأساسية وكل الـ external entities.",
      "الـ <b><bdi dir=\"ltr\">Level-1</bdi> DFD</b>: الـ sub-processes بتوع process واحد من الـ <bdi dir=\"ltr\">Level-0</bdi>؛ لو الـ process هو 4.0 يبقى بيترقموا <b><bdi dir=\"ltr\">4.1,&nbsp;4.2,&nbsp;...</bdi></b>. الـ <b>Level-n</b>: الـ sub-processes بتوع process في <bdi dir=\"ltr\">Level&nbsp;n-1</bdi>، زي <bdi dir=\"ltr\">4.3.1,&nbsp;4.3.2</bdi>. رقم الـ child diagram هو نفس رقم الـ parent process.",
      "الـ External entities عادةً <b>مابتظهرش في الـ child diagrams اللي تحت الـ Diagram 0</b>؛ الـ child ممكن يبقى فيه data store الـ parent متوصل بيه، وممكن يبقى فيه data stores مش ظاهرة في الـ parent. والـ <b>interface data flow</b> هو input أو output للـ child diagram بيقابل flow في الـ parent.",
      "الـ <b>Primitive DFD</b>: <b>أقل مستوى logical للـ decomposition</b>؛ والـ processes اللي مابيتعملهاش child diagram اسمها primitive."
     ],
     "figH": {
      "sa-dfd-levels": "الـ decomposition بتاع Hoosier Burger: الـ context وبعده الـ Level 0 والـ Level 1 للـ <bdi dir=\"ltr\">4.0</bdi> والـ Level 2 للـ <bdi dir=\"ltr\">4.3</bdi>"
     }
    },
    {
     "h": "الـ Balancing والـ data flow splitting (متأكد عليه slide 22)",
     "pts": [
      "الـ <b>DFD balancing</b>: <b>الحفاظ على الـ inputs والـ outputs (conservation)</b> بتوع الـ process لما يتعمله decompose لمستوى أقل.",
      "يعني balanced: عدد (وهوية) الـ <b>inputs</b> للـ DFD اللي في المستوى الأقل بيساوي الـ inputs للـ process المرتبط بيه في المستوى الأعلى، ونفس الكلام للـ <b>outputs</b>.",
      "مثال unbalanced في <bdi dir=\"ltr\">Fig&nbsp;7-10</bdi>: الـ context process ليه <b>input واحد و output واحد</b> بس الـ <bdi dir=\"ltr\">Level-0</bdi> diagram فيه <b>2 inputs</b> (الـ Source One A والـ Source Two C) و output واحد.",
      "أمثلة balanced: الـ context فيه input واحد و 3 outputs، وده نفس الـ <bdi dir=\"ltr\">Level-0</bdi> اللي فيه input واحد و 3 outputs؛ والـ Process 1.0 اللي ليه input واحد و 4 outputs، وده نفس الـ <bdi dir=\"ltr\">Level-1</bdi> diagram بتاعه.",
      "الـ <b>Data flow splitting</b>: الـ flow الـ <b>composite</b> في المستوى الأعلى ممكن يتقسم لأجزاء (disaggregated flows) رايحة لـ processes مختلفة في المستوى الأقل؛ والرسمة بتفضل balanced لأن نفس الداتا هي اللي موجودة."
     ],
     "figH": {
      "sa-dfd-balance": "عدّ الـ inputs والـ outputs: الـ <bdi dir=\"ltr\">Figure&nbsp;7-10</bdi> اللي unbalanced والاتنين balanced بتوع Hoosier Burger",
      "sa-dfd-split": "الـ Payment and Coupon بيتقسم لـ Payment و Coupon (الـ <bdi dir=\"ltr\">Figure&nbsp;7-11</bdi>)"
     }
    },
    {
     "h": "الـ Guidelines وقواعد وقف الـ decomposition (متأكد عليها في الـ slides 30 و 31)",
     "pts": [
      "الـ <b>Completeness</b>: الـ DFD فيه كل الـ components اللازمة للسيستم، وكل component متوصف بالكامل في الـ project dictionary أو الـ CASE repository.",
      "الـ <b>Consistency</b>: لأي درجة المعلومات اللي في مستوى من مجموعة DFDs متداخلة (nested) موجودة كمان في المستويات التانية.",
      "الـ <b>Timing</b>: الوقت مابيتمثلش كويس في الـ DFDs؛ ارسمها كأن السيستم عمره ما بدأ ولا هيقف.",
      "الـ <b>Iterative development</b>: الـ analyst لازم يتوقع إنه <b>هيعيد رسم الـ diagram كذا مرة</b> قبل ما يوصل لأقرب تمثيل للسيستم.",
      "<b>قواعد وقف الـ decomposition</b>:<br>(1) كل process اتقلل لـ <b>decision واحد أو calculation واحد أو database operation واحدة</b>؛<br>(2) كل data store بيمثّل داتا عن <b>entity واحد</b>؛<br>(3) <b>الـ user مش عايز يشوف تفاصيل أكتر</b>؛<br>(4) مفيش data flow محتاج يتقسم أكتر عشان يوضح إن الداتا بتتعامل بطرق مختلفة؛<br>(5) كل business form أو transaction، وكل online display و report بيظهر كـ <b>data flow واحد</b>؛<br>(6) فيه <b>process منفصل لكل اختيار</b> في كل الـ menu options اللي في أقل مستوى."
     ]
    },
    {
     "h": "الـ Case study: سيستم مرتبات الموظفين (employee payroll)",
     "pts": [
      "الـ <b>Context</b>:<span class=\"ltr\">Employee → Time Sheet → (0 Employee Payroll System)</span><span class=\"ltr\">system → Employee Tax Form and Employee Payroll Check → Employee</span><span class=\"ltr\">system → Payroll Report → Accounting Department</span>",
      "الـ <b>Level 0</b>:<br>الـ process <bdi dir=\"ltr\">1.0</bdi> وهو Create Weekly Payroll Record: الـ Time Sheet داخل، بيقرا من <bdi dir=\"ltr\">S1&nbsp;Employee&nbsp;Data&nbsp;File</bdi>، وبيكتب في <bdi dir=\"ltr\">S2&nbsp;Payroll&nbsp;Data&nbsp;File</bdi>؛<br>الـ process <bdi dir=\"ltr\">2.0</bdi> وهو Compute Payroll: الـ Hours Worked داخلة، والـ Paycheck Data رايحة لـ S2، والـ Weekly Paycheck للـ Employee؛<br>الـ process <bdi dir=\"ltr\">3.0</bdi> وهو Prepare Weekly Payroll Summary:<span class=\"ltr\">Payroll Record (from S2) → Payroll Report → Accounting</span>والـ process <bdi dir=\"ltr\">4.0</bdi> وهو Prepare Employee Tax Form، وبيطلّع للـ Employee.",
      "الـ <b>Level 1</b>:<span class=\"ltr\">2.1 Compute Gross Pay<br>2.2 Compute Net Pay<br>2.3 Create Payroll Check</span><span class=\"ltr\">3.1 Sort Payroll Records by Employee<br>3.2 Print Weekly Payroll Summary</span><span class=\"ltr\">4.1 Calculate Payroll Deductions<br>4.2 Print Employee Tax Form</span>",
      "الـ <b>Level 2</b> (الـ functional primitives):<span class=\"ltr\">4.1.1 Calculate Payroll Tax Deductions<br>4.1.2 Calculate Non-tax Deductions<br>4.1.3 Calculate Retirement Allowance<br>4.2.1 Calculate Employee Vacation Pay<br>4.2.2 Print Employee Tax Form</span>",
      "فيه Cases تانية محلولة في الـ slides: الـ Hoosier Burger food ordering (الـ <bdi dir=\"ltr\">Level-0</bdi>، والـ <bdi dir=\"ltr\">Level-1</bdi> للـ process 1.0)، والـ Hoosier Burger inventory logical DFD، والـ video rental (الـ context والـ physical DFD)، والـ order processing، والـ PVF WebStore (فيه 6 processes high-level: الـ browse catalog، والـ select item، والـ display cart، والـ check out، والـ <bdi dir=\"ltr\">add/modify&nbsp;profile</bdi>، والـ order status)."
     ],
     "figH": {
      "sa-payroll-dfd": "الـ DFDs بتوع الـ payroll مستوى ورا مستوى (slides 33 لـ 36)",
      "sa-dfd-cases": "أمثلة تانية: الـ inventory logical DFD والـ video rental context والـ processes بتوع الـ WebStore"
     }
    },
    {
     "h": "إزاي تجاوب سؤال \"طلّع 10 errors على الأقل في الـ DFDs دي\"",
     "pts": [
      "شيّك على كل diagram: أكتر من process أو أي data store في الـ <b>context</b>؛ أو processes ليها <b>inputs بس</b> أو <b>outputs بس</b>؛ data stores ليها inputs بس أو outputs بس، أو متوصلة مباشرة بـ entities أو stores؛ أو flows مباشرة بين entities؛ أو أرقام processes أو أسامي data stores متكررة؛ أو <b>نفس الـ flow label</b> مستخدم لـ flows مختلفة؛ أو flows forked أو joined بـ <b>labels مختلفة</b>؛ أو أسهم براسين بين اتنين processes؛ أو ترقيم child غلط (زي إن <bdi dir=\"ltr\">P1.5.1</bdi> يبقى تحت <bdi dir=\"ltr\">P1.4</bdi>).",
      "وبعدين شيّك على <b>الـ balancing بين المستويات</b>: الـ inputs والـ outputs بتوع P1 في الـ Level 0 لازم تساوي الـ flows الخارجية في الـ <bdi dir=\"ltr\">Level-1</bdi> diagram، والـ flows بتوع P1.4 في الـ Level 1 لازم تساوي الـ flows الخارجية في الـ <bdi dir=\"ltr\">Level-2</bdi> diagram بتاعه؛ والـ data stores المستخدمة لازم تبقى consistent كمان.",
      "اكتب كل error كده: <i>فين</i> (المستوى، الـ symbol) + <i>أنهي rule</i> + <i>التصليح</i>. الإجابة الكاملة المحلولة موجودة في امتحانات <bdi dir=\"ltr\">2023/24</bdi> و <bdi dir=\"ltr\">2025/26</bdi> و <bdi dir=\"ltr\">2021/22</bdi> تحت."
     ],
     "figH": {
      "sa-dfd-errors": "الـ DFDs بتوع امتحان <bdi dir=\"ltr\">2023/24</bdi>: 15 error واحد واحد"
     }
    }
   ],
   "cards": [
    "صورة لحركة الداتا بين الـ external entities والـ processes والـ data stores جوه السيستم.",
    "شغل أو actions بتتعمل على الداتا عشان تتحوّل أو تتخزن أو تتوزّع (جوه السيستم).",
    "داتا ساكنة (at rest) جوه السيستم.",
    "الـ external entity هو مصدر الداتا أو وجهتها (برّه السيستم).",
    "داتا متحركة، بتتنقل كوحدة واحدة من مكان لمكان.",
    "ممنوع (<bdi dir=\"ltr\">black&nbsp;hole&nbsp;/&nbsp;miracle</bdi>). كل process لازم يبقى ليه الاتنين.",
    "لازم تعدّي على process.",
    "مابيترسمش: ده برّه السيستم؛ الداتا ماينفعش تتنقل مباشرة بين الـ entities.",
    "لازم يشير لنفس الـ data item بالظبط.",
    "بيترسم سهمين منفصلين.",
    "الـ Update (insert أو delete أو change).",
    "الـ Retrieve أو الـ use.",
    "بيوضح حدود السيستم والـ external entities والـ flows الأساسية؛ process واحد (0)، ومفيش data stores.",
    "الـ processes والـ flows والـ stores الأساسية للسيستم في مستوى high-level؛ الـ processes بتترقم <bdi dir=\"ltr\">1.0,&nbsp;2.0...</bdi>",
    "هي process iterative بتكسّر فيها وصف السيستم لتفاصيل أدق وأدق.",
    "الحفاظ على الـ inputs والـ outputs بتوع الـ process لما يتعمله decompose لمستوى أقل.",
    "أقل مستوى logical للـ decomposition.",
    "هو flow composite في المستوى الأعلى بيتقسم لأجزاء رايحة لـ processes مختلفة في المستوى الأقل (ولسه balanced).",
    "المعلومات اللي في مستوى من الـ DFDs المتداخلة موجودة كمان في المستويات التانية.",
    "الـ analyst لازم يتوقع إنه هيعيد رسم الـ diagram كذا مرة قبل ما يوصل لأقرب تمثيل."
   ],
   "qa": [
    "الـ DFD هو صورة لحركة الداتا بين الـ external entities والـ processes والـ data stores جوه السيستم؛ بيوضح الـ data flow الـ logical بشكل مستقل عن التكنولوجيا، وبيُستخدم عشان يمثّل الـ requirements اللي اتجمعت في الـ analysis. الـ DFD balancing هو الحفاظ على الـ inputs والـ outputs بتوع الـ process لما يتعمله decompose لمستوى أقل: عدد الـ inputs والـ outputs في الـ diagram الأقل لازم يساوي اللي في الـ parent process. مثال: context process ليه input واحد و output واحد والـ <bdi dir=\"ltr\">Level-0</bdi> بتاعه فيه 2 inputs يبقى unbalanced.",
    "الـ Functional decomposition هي process iterative بتكسّر فيها وصف السيستم لتفاصيل أدق وأدق؛ الـ processes الـ high-level بتتوصف بـ sub-processes في مستوى أقل، وبيترسم DFD لكل مستوى. بنقف لما: 1) كل process يبقى decision واحد أو calculation واحد أو database operation واحدة؛ 2) كل data store يمثّل داتا عن entity واحد؛ 3) الـ user مش عايز يشوف تفاصيل أكتر؛ 4) مفيش data flow محتاج يتقسم أكتر عشان يوضح إن الداتا بتتعامل بطرق مختلفة؛ 5) كل business form أو transaction، وكل online display و report يبقى data flow واحد؛ 6) يبقى فيه process منفصل لكل اختيار في كل الـ menu options اللي في أقل مستوى. والنتيجة هي primitive DFD.",
    "الـ DFD بيصوّر حركة الداتا بين الـ external entities والـ processes والـ data stores جوه السيستم. بيُستخدم في مرحلة الـ analysis عشان ننظم الـ process requirements اللي اتجمعت من الـ users، ونفهم السيستم الحالي (الـ DFDs الحالية الـ physical والـ logical)، ونحدد السيستم الجديد الـ logical من غير ما نعتمد على تكنولوجيا. المستويات:<br>الـ context diagram (حدود السيستم، الـ entities، الـ flows الأساسية، process واحد 0، مفيش data stores)؛<br>الـ <bdi dir=\"ltr\">Level-0</bdi> (الـ processes الأساسية <bdi dir=\"ltr\">1.0,&nbsp;2.0...</bdi>، والـ flows والـ stores)؛<br>الـ <bdi dir=\"ltr\">Level-1</bdi> (decomposition لـ process واحد من الـ <bdi dir=\"ltr\">Level-0</bdi>، زي <bdi dir=\"ltr\">4.1,&nbsp;4.2</bdi>)؛<br>الـ Level-n (decomposition لـ process في <bdi dir=\"ltr\">Level&nbsp;n-1</bdi>، زي <bdi dir=\"ltr\">4.3.1</bdi>)؛<br>وأقل مستوى هو الـ primitive DFD.",
    "الـ Process: لازم يبقى ليه inputs و outputs الاتنين؛ والـ labels بتاعته verb phrases. الـ Data store: كل الـ flows الداخلة له أو الخارجة منه بتعدّي على process؛ والـ labels بتاعته noun phrases. الـ <bdi dir=\"ltr\">Source/sink</bdi>: مفيش داتا بتتنقل مباشرة بين الـ external entities؛ التعاملات دي برّه السيستم؛ والـ labels بتاعته noun phrases. الـ Data flow: الـ flow اللي في الاتجاهين بين process و store بيبقى سهمين؛ الـ forked والـ joined flows لازم يشيروا لنفس الداتا بالظبط؛ الـ flow ماينفعش يطلع من process ويرجع له مباشرة؛ الـ flow للـ store معناه update، ومن الـ store معناه retrieve؛ والـ labels بتاعته noun phrases.",
    "الـ Completeness: الـ DFD لازم يبقى فيه كل الـ components اللازمة للسيستم، وكل component لازم يبقى متوصف بالكامل في الـ project dictionary أو الـ CASE repository. الـ Consistency: لأي درجة المعلومات اللي في مستوى من مجموعة DFDs متداخلة موجودة كمان في المستويات التانية (زي إن الـ flows بتوع الـ parent process بتظهر تاني في الـ child diagram بتاعه).",
    "فيه process واحد بس بيمثّل السيستم كله ورقمه 0؛ كل الـ external entities بتظهر ومعاها الـ data flows الأساسية الداخلة والخارجة منها؛ مفيش data stores؛ وبيوضح حدود السيستم (system boundary)."
   ],
   "quiz": [
    [
     "صح. الـ processes والـ data stores جوه السيستم.",
     "الحاجة الوحيدة اللي برّه النظام هي الـ <bdi dir=\"ltr\">sources/sinks</bdi> (الـ external entities)؛ الـ process ده شغل بيتعمل على الـ data جوه النظام، زيه زي الـ data stores."
    ],
    [
     "الـ Update ده الاتجاه العكسي: flow من process لـ data store معناه update (insert أو delete أو change).",
     "صح. store ← process معناها retrieve أو use."
    ],
    [
     "التعامل بين entity وentity مفيهوش أي process من النظام، فمش جزء منه؛ القاعدة بتقول إنه برّه النظام ومبيترسمش.",
     "صح. مفيش data بتتنقل مباشرة بين الـ external entities؛ أي تعامل بينهم من غير process بيبقى برّه النظام ومبيظهرش في الـ DFD <bdi dir=\"ltr\">(L4,&nbsp;Source/sink&nbsp;rule)</bdi>."
    ],
    [
     "صح. أي flow داخل أو خارج من data store لازم يعدّي على process: الـ data ماينفعش تروح مباشرة من store لـ store أو بين store وexternal entity (L4, Data store rule).",
     "الـ data store ماينفعش يتوصل مباشرة بـ <bdi dir=\"ltr\">source/sink</bdi>."
    ],
    [
     "صح. الـ context diagram فيه process symbol واحد بس، رقمه 0، بيمثّل النظام كله، ومعاه كل الـ external entities والـ major flows (L4, Decomposition).",
     "بيظهر فيه كل الـ external entities، وغالبًا بيبقوا كذا واحد."
    ],
    [
     "الـ processes والـ data stores هما اللي جوه النظام؛ الـ <bdi dir=\"ltr\">source/sink</bdi> ده external entity، يعني هو مصدر أو وجهة الـ data برّه النظام.",
     "صح. الـ <bdi dir=\"ltr\">source/sink</bdi> ده external entity (شخص، أو organization، أو department، أو system تاني) بيبقى مصدر و/أو وجهة الـ data برّه النظام <bdi dir=\"ltr\">(L4,&nbsp;symbols)</bdi>."
    ],
    [
     "صح. الـ flow من process لـ data store معناه update، يعني insert أو delete أو change للـ data اللي في الـ store <bdi dir=\"ltr\">(L4,&nbsp;Update&nbsp;vs&nbsp;retrieve)</bdi>.",
     "الـ Retrieve ده الاتجاه العكسي: flow من data store لـ process معناه retrieve أو use للـ data."
    ],
    [
     "صح. الـ context diagram فيه process واحد (0) والـ external entities والـ major flows، ومفيهوش data stores؛ الـ stores أول ما بتظهر بتظهر في الـ Level 0 (L4).",
     "الـ Sinks (الـ destinations) بتظهر فعلًا في الـ context diagram."
    ],
    [
     "صح. الـ data store دي data at rest جوه النظام، يعني file أو database أو transaction file أو مجموعة tables، وبتتسمّى <bdi dir=\"ltr\">D1,&nbsp;D2...</bdi> <bdi dir=\"ltr\">(L4,&nbsp;symbols)</bdi>.",
     "الـ <bdi dir=\"ltr\">sources/sinks</bdi> بس هما اللي برّه النظام؛ الـ data store شايلة data النظام نفسه وهي at rest، يعني جوه."
    ],
    [
     "صح. الـ forked flow (مصدر واحد، وجهات كتير) والـ joined flow (مصادر كتير، وجهة واحدة) لازم يشيروا لنفس الـ data item بالظبط (L4, Data flow rules).",
     "الـ Feedback flow مش من قواعد الـ DFD في المحاضرة؛ القاعدة بتقول إن الـ joined أو forked flows لازم تشيل نفس الـ data بالظبط."
    ],
    [
     "الـ <bdi dir=\"ltr\">source/sink</bdi> ده external entity واحد، مصدر أو وجهة للـ data؛ الـ diagram اللي بيبيّن الـ boundary وكل الـ entities والـ major flows ده الـ context diagram.",
     "الـ <bdi dir=\"ltr\">Level-0</bdi> بيوضح الـ processes والـ flows والـ stores الأساسية.",
     "صح. الـ context diagram بيوضّح الـ scope بتاع النظام: الـ boundary بتاعه، والـ external entities اللي بتتعامل معاه، والـ major information flows، بـ process واحد رقمه 0 (L4).",
     "الـ primitive DFD ده أوطى logical level في الـ decomposition، يعني الطرف التاني خالص من الـ context diagram اللي بيوضّح الـ scope."
    ],
    [
     "الـ context diagram فيه process واحد بس ومفيهوش data stores، فمينفعش يعرض الـ major processes والـ stores؛ ده الـ Level 0.",
     "صح. الـ <bdi dir=\"ltr\">Level-0</bdi> diagram بيمثّل الـ major processes بتاعة النظام (<bdi dir=\"ltr\">1.0,&nbsp;2.0...</bdi>) والـ data flows والـ data stores على مستوى abstraction عالي (L4).",
     "الـ Level-n diagram بيفكّك process واحد من Level n−1 لـ sub-processes (زي 4.3.1)، يعني تفاصيل أوطى، مش النظرة العامة.",
     "الـ physical DFD بيعرض النظام الحالي بتفاصيل التكنولوجيا بتاعته؛ التعريف المذكور (major processes وflows وstores على مستوى عالي) ده الـ <bdi dir=\"ltr\">Level-0</bdi> diagram."
    ],
    [
     "الـ Data flow splitting بيقسّم composite flow لأجزاء في المستوى الأوطى؛ مسموح بيه لأن الـ balancing لسه متحقق، بس هو مش تعريف الـ balancing.",
     "الـ Functional decomposition هو تفكيك الـ processes لـ sub-processes؛ الـ balancing هو القاعدة اللي بتقول إن الـ inputs والـ outputs لازم تتحافظ عليها وانت بتفكّك.",
     "الـ Consistency بتتكلم عن المعلومات عبر المستويات بشكل عام.",
     "صح. الـ DFD balancing هو الحفاظ على الـ inputs والـ outputs بتوع الـ process لما يتفكّك: الـ child diagram لازم يبقى ليه نفس inputs وoutputs الـ parent (L4, slide 22)."
    ],
    [
     "الـ Completeness معناها إن كل الـ components موجودة ومتوصفة.",
     "الـ Timing معناه ارسم كأن السيستم عمره ما بدأ ولا هيقف.",
     "الـ Functional decomposition هو تفكيك وصف النظام لتفاصيل أدق وأدق؛ إنك تتوقع ترسم الـ diagram كذا مرة ده الـ guideline بتاع الـ iterative development.",
     "صح. الـ Iterative development هو الـ guideline اللي بيقول إن الـ analyst لازم يتوقع يعيد رسم الـ diagram كذا مرة قبل ما يوصل لأقرب تمثيل للنظام (L4, slide 30)."
    ],
    [
     "الـ process ده شغل أو actions بتتعمل على الـ data (تحويلها، تخزينها، توزيعها)، مش الـ data وهي بتتنقل من مكان لمكان.",
     "صح. الـ data flow بيمثّل data in motion، بتتنقل كوحدة واحدة من مكان لمكان في النظام؛ بيترسم كسهم عليه label عبارة عن noun phrase (L4).",
     "الـ <bdi dir=\"ltr\">source/sink</bdi> ده external entity بيبقى مصدر أو وجهة للـ data، مش الـ data in motion نفسها.",
     "الـ data store دي data at rest جوه النظام؛ الـ data in motion اسمها data flow."
    ],
    [
     "صح. الـ primitive DFD ده أوطى logical level في الـ decomposition؛ الـ processes اللي مش متفكّكة لـ child diagram اسمها primitive (L4).",
     "الـ context diagram ده أعلى level (process واحد 0)، عكس أوطى level في الـ decomposition.",
     "الـ Level 1 هو بس تفكيك process واحد من الـ Level 0؛ وممكن يتفكّك أكتر (Level 2، ...)، فمش لازم يكون أوطى level.",
     "الـ <bdi dir=\"ltr\">Level-0</bdi> هو أعلى decomposition للـ process 0."
    ],
    [
     "الـ Balancing هو الحفاظ على الـ inputs والـ outputs لما process يتفكّك، مش وصف الـ processes بالـ sub-processes بتاعتها.",
     "الـ network diagram بيوضّح الـ project tasks والعلاقات بينها (L3)، مش processes متفكّكة لـ sub-processes.",
     "صح. الـ Functional decomposition هو process تكرارية بتفكّك وصف النظام لتفاصيل أدق: الـ high-level processes بتتوصف بالـ sub-processes اللي أوطى منها (L4).",
     "الـ WBS بيقسّم المشروع لـ tasks يتحكم فيها (L3، الـ project management)، مش processes النظام لـ sub-processes."
    ],
    [
     "الـ Gantt charts بتعرض الـ project tasks كـ bars على قد وقتها (L3)؛ ما بتمثّلش الـ requirements.",
     "الـ project workbook ده الـ repository بتاع مراسلات المشروع والـ deliverables (L3)، مش model للـ requirements اللي اتجمعت.",
     "صح. الـ DFDs بتتستخدم عشان تمثّل المعلومات اللي اتجمعت في الـ requirements determination، في خطوة الـ requirements structuring في الـ analysis (L4, Process modeling).",
     "الـ Physical design بيدّي تفاصيل technology-specific."
    ],
    [
     "صح. كل child process محتاج رقم unique (رقم الـ parent، وبعده نقطة، وبعدها رقم child unique).",
     "المشكلة الموصوفة إن فيه اتنين processes بنفس الرقم، مش store متوصّل بـ entity؛ الـ P1.1 التانية المفروض تبقى P1.3.",
     "المشكلة جوه الـ <bdi dir=\"ltr\">Level-1</bdi> diagram نفسه (رقم process متكرر)، مش في الـ balancing بتاع الـ context diagram.",
     "ولا واحدة من الـ P1.1 موصوفة إن ليها inputs بس؛ الغلطة إن الرقم متكرر مرتين، فالتانية المفروض تبقى P1.3."
    ],
    [
     "مفيش forked flow في الوصف أصلًا؛ الـ P3 بتبعت flows بس ومبتستقبلش ولا واحد، وده «miracle».",
     "قاعدة الـ process الواحد دي للـ context diagram؛ الـ P3 في الـ Level 0، وغلطتها إن ليها outputs من غير inputs.",
     "تسمية الـ data stores ملهاش دعوة هنا؛ الـ P3 بتكسر قاعدة الـ process لأن ليها outputs (الـ DF5 والـ DF4) ومفيش inputs.",
     "صح. كل process لازم يكون ليه inputs وoutputs؛ الـ process اللي ليه outputs بس اسمه «miracle» (واللي ليه inputs بس «black hole»)، فالـ P3 محتاجة input (L4, slides <bdi dir=\"ltr\">8–13</bdi>)."
    ],
    [
     "الـ context diagram ماينفعش يبقى فيه غير process 0؛ الـ sub-process بتاع P1.4 مكانه الـ <bdi dir=\"ltr\">Level-2</bdi> diagram بتاع P1.4.",
     "صح. الـ child processes بتشيل رقم الـ parent:<span class=\"ltr\">1.4.1, 1.4.2, 1.4.3</span>",
     "مفيش process 5 في الـ Level 0 أصلًا، والـ child بتاع P1.4 لازم يشيل رقم الـ parent بتاعه (1.4.x)، مش 5.1.",
     "دول الـ inputs بتوع P1.4 وهما اللي مخليين الرسمة balanced."
    ],
    [
     "صح. Rule 1 لوقف الـ decomposition: كل process يكون اتختصر لـ decision واحد أو calculation واحدة أو database operation واحدة (L4, slide 31).",
     "مفيش stopping rule بتعدّ inputs الـ data store؛ قاعدة الـ store إن كل store تمثّل data عن entity واحد بس.",
     "الـ Balancing مطلوب في كل مستوى بس مش rule لوقف الـ decomposition.",
     "الـ 7 لـ 9 دي guide لحجم الـ <bdi dir=\"ltr\">Level-0</bdi>، مش rule للوقف."
    ]
   ],
   "extra": [
    [
     "تسمية الـ data stores ملهاش دعوة هنا؛ الـ process ليه inputs ومفيش output، فبيكسر قاعدة الـ process.",
     "صح. الـ process اللي ليه inputs بس اسمه «black hole»؛ كل process لازم يكون ليه inputs وoutputs، فالـ 3.0 محتاج output زي الـ report (L4, Process rule).",
     "الـ fork هو flow واحد رايح لكذا وجهة؛ هنا فيه بس اتنين inputs ومفيش output، يعني black hole.",
     "قاعدة الـ process الواحد دي للـ context diagram؛ ده Level 0، وممكن يبقى فيه كذا process."
    ],
    [
     "صح. كل الـ flows الداخلة أو الخارجة من الـ data store لازم تعدّي على process.",
     "الـ entity كمان ماينفعش يتوصل مباشرة بـ store.",
     "لو مسحت D1 هترمي data الـ orders اللي النظام محتاجها؛ الحل إنك تعدّي الـ data على process يقرا من D1 ويعمل update لـ D2.",
     "السهم اللي ليه راسين برضه flow مباشر من store لـ store؛ أي flow داخل أو خارج من store لازم يعدّي على process."
    ],
    [
     "مفيش level بيعرض flows بين entity وentity: أي تعامل مفيهوش process في النص بيبقى برّه النظام في كل الـ levels.",
     "الداتا ماينفعش تتنقل مباشرة بين الـ external entities.",
     "صح. مفيش data تتنقل مباشرة بين الـ external entities؛ التعامل اللي مفيهوش process في النص بيبقى برّه النظام ومبيترسمش <bdi dir=\"ltr\">(L4,&nbsp;Source/sink&nbsp;rule)</bdi>.",
     "الـ data store دي data at rest جوه النظام؛ الـ payment اللي رايح بين اتنين entities برّه لا هو at rest ولا جوه النظام."
    ],
    [
     "الـ Splitting بيحافظ على نفس الداتا؛ إنما input زيادة مالوش علاقة لأ.",
     "الـ Balanced معناه إن الـ child ليه نفس inputs الـ parent؛ و 3 inputs في الـ Level 1 قصاد 2 في الـ Level 0، ومن غير splitting، يبقى ده مكسور.",
     "صح. الـ Balancing بيطلب إن الـ child diagram يحافظ على inputs و outputs الـ parent؛ وأي input زيادة ملوش علاقة (3 قصاد 2) بيخليه unbalanced، زي <bdi dir=\"ltr\">Fig&nbsp;7-10</bdi> <bdi dir=\"ltr\">(L4,&nbsp;slide&nbsp;22)</bdi>.",
     "الـ primitive DFD ده أوطى level في الـ decomposition؛ السؤال عن inputs مش مطابقة للـ parent، ودي غلطة balancing."
    ],
    [
     "صح. ده data flow splitting: الـ composite flow (Customer Order) ممكن يتقسم لأجزاء رايحة لـ processes مختلفة في المستوى الأوطى؛ ويفضل balanced لأن نفس الـ data هي اللي موجودة (L4).",
     "الـ Order Lines مترسومة كـ flow داخل على process 1.2، مش data at rest؛ الحالة مقبولة لأنها جزء من الـ composite flow اللي اتقسم.",
     "الـ <bdi dir=\"ltr\">Level-1</bdi> diagram بيفكّك process 1.0؛ الـ context diagram هو أعلى level وفيه process 0 بس.",
     "الـ child diagrams لازم تبقى balanced مع flows الـ parent؛ الحالة دي سليمة بس لأن الـ flowين أجزاء من نفس الـ composite flow."
    ],
    [
     "الـ <bdi dir=\"ltr\">6.0,&nbsp;7.0,&nbsp;8.0</bdi> دي أرقام Level 0 لـ major processes منفصلة؛ أولاد 5.2 لازم يشيلوا رقم الـ parent ‏5.2.",
     "الـ <bdi dir=\"ltr\">2.1,&nbsp;2.2,&nbsp;2.3</bdi> دول هيبقوا أولاد process 2.0؛ الـ parent هنا 5.2، فأولاده:<span class=\"ltr\">5.2.1, 5.2.2, 5.2.3</span>",
     "الـ <bdi dir=\"ltr\">5.1,&nbsp;5.2,&nbsp;5.3</bdi> دول أولاد process 5.0 في الـ Level 1 (و 5.2 واحد منهم)؛ أولاده هو محتاجين level زيادة: <bdi dir=\"ltr\">5.2.1,&nbsp;...</bdi>",
     "صح. رقم الـ parent، وبعده نقطة، وبعدها رقم child unique."
    ],
    [
     "الجملة «The system user does not care to see any more detail» دي rule 3 لوقف الـ decomposition، يعني هي فعلًا rule.",
     "صح. إن الـ diagram يكفي في صفحة واحدة مش من الست stopping rules (decision أو calculation أو DB operation واحدة، store لـ entity واحد، الـ user مش عايز تفاصيل أكتر، ...) (L4, slide 31).",
     "إن يبقى فيه process منفصل لكل اختيار في كل الـ menu options اللي في أوطى level دي rule 6 لوقف الـ decomposition، يعني هي فعلًا rule.",
     "إن كل data store تمثّل data عن entity واحد دي rule 2 لوقف الـ decomposition، يعني هي فعلًا rule."
    ],
    [
     "صح. والـ lab deck كمان بيسمح بسهم واحد براسين لما الـ process بيقرا ويعدّل في نفس الـ file.",
     "الـ data store ماينفعش تتوصّل مباشرة بـ external entity؛ كل الـ flows الداخلة أو الخارجة من store لازم تعدّي على process.",
     "قراية الـ data دي data flow حقيقي (من الـ store للـ process، يعني retrieve) ولازم يترسم زي الـ update بالظبط.",
     "سهم واحد داخل على الـ file بيعرض الـ update بس؛ القراية (من الـ file للـ process، يعني retrieve) لازم تترسم هي كمان كسهم تاني."
    ],
    [
     "الـ context diagram مفيهوش data stores؛ الـ stores أول ما بتظهر بتظهر في الـ <bdi dir=\"ltr\">Level-0</bdi> diagram.",
     "الـ Processes 1.0 و2.0 تبع الـ <bdi dir=\"ltr\">Level-0</bdi> diagram؛ الـ context diagram فيه process واحد بس رقمه 0.",
     "صح. الـ context diagram بيعرض الـ system boundary: فيه process واحد 0، وكل الـ external entities، والـ major flows بينهم وبين النظام، من غير data stores (L4).",
     "الـ Primitive processes بتبقى في أوطى level من الـ decomposition، الطرف التاني خالص من الـ context diagram."
    ],
    [
     "الـ Consistency معناها نفس المعلومات في كل المستويات.",
     "صح. الـ Timing: الوقت مش بيتمثّل كويس في الـ DFDs، فارسمها كأن النظام عمره ما بدأ ولا هيقف (L4, slide 30).",
     "الـ Iterative development معناه إنك تتوقع تعيد رسم الـ diagram كذا مرة لحد ما يقرب من النظام؛ ملوش دعوة بالوقت.",
     "الـ Completeness معناها إن كل الـ components موجودة ومتوصفة."
    ]
   ]
  },
  "5": {
   "notes": [
    {
     "h": "يعني إيه COCOMO",
     "pts": [
      "الـ <b>COCOMO</b> (Constructive Cost Model) واحد من <b>أكتر نماذج تقدير الـ software انتشارًا</b> في العالم، عمله <b>Barry Boehm سنة 1981</b>.",
      "بيتوقع <b>الـ effort والـ schedule</b> لمنتج software بناءً على inputs ليها علاقة بـ <b>حجم الـ software</b> وعدد من الـ <b>cost drivers</b> اللي بتأثر على الـ productivity.",
      "تلات models حسب درجة التعقيد: الـ <b>Basic</b> model، والـ <b>Intermediate</b> model، والـ <b>Detailed</b> model.",
      "<b>الـ Assumptions</b>: أولاً، الـ cost driver الأساسي هو عدد الـ <b>Delivered Source Instructions (DSI)</b> اللي المشروع بيطوّرها؛ تانيًا، المشروع هيبقى عنده <b>إدارة كويسة</b> من الـ developer والـ customer الاتنين؛ تالتًا، <b>الـ requirements specification مش هتتغير بشكل كبير</b> بعد مرحلة الـ plans and requirements."
     ],
     "figH": {
      "sa-cocomo-models": "التلات COCOMO models: كل model بيزوّد إيه علشان يتوقع الـ effort والـ schedule"
     }
    },
    {
     "h": "الـ development modes (خصائص المشروع)",
     "figH": {
      "sa-cocomo-modes": "الـ organic والـ semidetached والـ embedded: من مشروع مألوف وصغير لـ constraints صارمة"
     }
    },
    {
     "h": "معادلات الـ Basic COCOMO (الـ KDSI يعني آلاف الـ DSI)",
     "figH": {
      "sa-cocomo-curves": "الـ effort قصاد الحجم للتلات modes: حرّك الحجم واقرا الـ E والـ TDEV"
     }
    },
    {
     "h": "الكميات المشتقة اللي بتيجي في كل مسألة امتحان",
     "figH": {
      "sa-cocomo-calc": "حاسبة الـ COCOMO: الـ effort والـ schedule والـ staffing والـ productivity والتكلفة بتقريب الكورس",
      "sa-cocomo-tradeoff": "الـ staff في الشهور بيساوي الـ effort: غيّر الـ staff أو الوقت وشوف التاني بيتحرك إزاي"
     }
    },
    {
     "h": "الـ Basic model: استخدامه وعيوبه",
     "pts": [
      "الـ Basic COCOMO بيقدّر الـ effort باستخدام <b>predictor variable واحد بس (الحجم بالـ DSI)</b> والتلات modes.",
      "<b>إمتى نستخدمه</b>: كويس لتقديرات <b>سريعة وبدري وتقريبية (rough order-of-magnitude)</b> لتكلفة الـ software.",
      "<b>العيوب</b>: الدقة محدودة لأنه ناقصه عوامل بتأثر جامد على التكلفة؛ التقديرات بتبقى <b>في حدود factor 1.3 في 29% بس من الحالات</b> و<b>في حدود factor 2 في 60% بس من الحالات</b>."
     ]
    },
    {
     "h": "مثال المحاضرة المحلول: الـ Basic، والـ semidetached، والحجم <bdi dir=\"ltr\">32,000&nbsp;DSI</bdi>",
     "figH": {
      "sa-cocomo-ex-basic": "مثال المحاضرة خطوة بخطوة: <span class=\"ltr\">146 MM, 14 months, 219 DSI/MM, 10 FSP</span>"
     }
    },
    {
     "h": "الـ Intermediate COCOMO",
     "pts": [
      "بيستخدم <b>15 cost driver variable</b> غير الحجم. كل driver ليه <b>effort multiplier</b> حسب الـ rating (من very low لحد extra high)؛ وحاصل ضربهم هو الـ <b>EAF</b> (effort adjustment factor). مثال الـ CPLX بالترتيب:<span class=\"ltr\">0.70, 0.85, 1.00 (nominal), 1.15, 1.30, 1.65</span>",
      "أربع مجالات. الـ <b>Product</b> وفيه الـ RELY (الـ reliability المطلوبة)، والـ DATA (حجم الـ database)، والـ CPLX (تعقيد المنتج). الـ <b>Computer</b> وفيه الـ TIME (قيد وقت التنفيذ)، والـ STOR (قيد الـ main storage)، والـ VIRT (تقلّب الـ virtual machine)، والـ TURN (الـ turnaround time). الـ <b>Personnel</b> وفيه الـ ACAP (قدرة الـ analyst)، والـ AEXP (خبرة في الـ applications)، والـ PCAP (قدرة الـ programmer)، والـ VEXP (خبرة في الـ virtual machine)، والـ LEXP (خبرة في اللغة). الـ <b>Project</b> وفيه الـ MODP (الـ modern programming practices)، والـ TOOL (الـ software tools)، والـ SCED (الـ schedule المطلوب).",
      "المعادلات:<span class=\"ltr\">Organic: E = EAF × <b>3.2</b> × KDSI^1.05</span><span class=\"ltr\">Semidetached: E = EAF × <b>3.0</b> × KDSI^1.12</span><span class=\"ltr\">Embedded: E = EAF × <b>2.8</b> × KDSI^1.20</span>ومعادلات الـ TDEV زي الـ Basic بالظبط.",
      "<b>إمتى نستخدمه</b>: على المنتج كله لتقديرات بدري سهلة وتقريبية، أو على مستوى الـ component لتقديرات أدق في المراحل التفصيلية.",
      "<b>العيوب</b>: التقديرات بتبقى <b>في حدود 20% من الحقيقي في 68% من الحالات</b>؛ الـ effort multipliers <b>مش بتفرّق بين الـ phases (phase-insensitive)</b>؛ و<b>مُرهق جدًا</b> لمنتج فيه components كتير."
     ],
     "figH": {
      "sa-cocomo-cplx": "الـ effort multipliers بتاعة الـ CPLX: اختار rating وشوف الـ EAF بيغيّر الـ effort إزاي",
      "sa-cocomo-drivers": "الـ 15 cost driver في أربع مجالات: الـ product والـ computer والـ personnel والـ project"
     }
    },
    {
     "h": "مثال المحاضرة المحلول: الـ Intermediate، والـ semidetached، والـ RELY عالي",
     "figH": {
      "sa-cocomo-ex-inter": "الـ Basic قصاد الـ Intermediate لنفس المشروع: الـ RELY العالي بيرفع الـ effort<span class=\"ltr\">146 MM → 167 MM (EAF = 1.15)</span>"
     }
    },
    {
     "h": "الـ Detailed COCOMO",
     "pts": [
      "الفروق: <b>effort multipliers بتفرّق بين الـ phases (phase-sensitive)</b> (مختلفة لكل development phase) و<b>hierarchy من module-subsystem-system</b>.",
      "<b>مستوى الـ Module</b>: الـ drivers اللي بتتغير في أقل مستوى، وهي الـ CPLX والـ PCAP والـ VEXP والـ LEXP. <b>مستوى الـ Subsystem</b>: بتتغير من subsystem للتاني بس ثابتة جوه الواحد، وهي الـ RELY والـ DATA والـ TIME والـ STOR والـ VIRT. <b>مستوى الـ System</b>: علاقات المشروع ككل زي معادلات الـ nominal effort والـ schedule.",
      "بيستخدم <b>نفس معادلات الـ Intermediate model</b> بس بـ procedure معقد جدًا (DSIs للـ subsystems والـ modules، و multipliers على مستوى الـ module والـ subsystem).",
      "<b>إمتى نستخدمه</b>: بيقدّر الـ staffing والتكلفة والمدة لكل phase و subsystem و module؛ وبيخليك تجرّب development strategies مختلفة.",
      "<b>العيوب</b>: محتاج وقت ومجهود أكتر بكتير؛ التقديرات بتبقى <b>في حدود 20% من الحقيقي في 70% من الحالات</b>.",
      "<b>الخلاصة</b>: الـ cost models مش بديل عن تقدير تفصيلي task بـ task؛ بتعتمد على معرفة المستخدم بالمجال وقدرته على التحليل وفهمه للـ model؛ والالتزام بالتقدير مهم قد عمله بالظبط."
     ],
     "figH": {
      "sa-cocomo-hierarchy": "الـ hierarchy بتاعة module-subsystem-system وأنهي drivers في كل مستوى",
      "sa-cocomo-accuracy": "دقة كل model: الـ Basic والـ Intermediate والـ Detailed"
     }
    },
    {
     "h": "مسألة المحاضرة <bdi dir=\"ltr\">(b)</bdi>: الـ organic، والحجم <bdi dir=\"ltr\">8,000&nbsp;DSI</bdi>، والمعادلة <bdi dir=\"ltr\">E&nbsp;=&nbsp;3.2·KDSI^1.05</bdi>، والمرتب <bdi dir=\"ltr\">EP&nbsp;5000</bdi>",
     "figH": {
      "sa-cocomo-prob-b": "مسألة (b) محلولة جزء جزء بتقريب الكورس"
     }
    }
   ],
   "cards": [
    "يعني Constructive Cost Model (عمله Barry Boehm سنة 1981).",
    "الـ Effort والـ schedule، من الحجم والـ cost drivers.",
    "الـ Basic، والـ Intermediate، والـ Detailed.",
    "عدد الـ Delivered Source Instructions (DSI).",
    "بيئة مألوفة ومستقرة، شبه مشاريع قبل كده، صغير، ومحتاج innovation قليل.",
    "قيود صارمة ومش مرنة و interface requirements، ومحتاج innovation كبير.",
    "المعادلتين:<span class=\"ltr\">E = 2.4 KDSI^1.05</span><span class=\"ltr\">TDEV = 2.5 E^0.38</span>",
    "المعادلتين:<span class=\"ltr\">E = 3.0 KDSI^1.12</span><span class=\"ltr\">TDEV = 2.5 E^0.35</span>",
    "المعادلتين:<span class=\"ltr\">E = 3.6 KDSI^1.20</span><span class=\"ltr\">TDEV = 2.5 E^0.32</span>",
    "الـ Organic 3.2، الـ semidetached 3.0، الـ embedded 2.8 (مضروبين في الـ EAF).",
    "الـ DSI مقسومة على الـ Effort (بالـ <bdi dir=\"ltr\">DSI/MM</bdi>).",
    "الـ Effort مقسوم على الـ Schedule (بالـ FSP).",
    "في حدود factor 1.3 في 29% بس من الحالات؛ وفي حدود factor 2 في 60% بس.",
    "في حدود 20% من الحقيقي في 68% من الحالات.",
    "في حدود 20% من الحقيقي في 70% من الحالات.",
    "خمستاشر (15)، في أربع مجالات: الـ product، والـ computer، والـ personnel، والـ project.",
    "الـ RELY والـ DATA والـ CPLX.",
    "الـ ACAP والـ AEXP والـ PCAP والـ VEXP والـ LEXP.",
    "الـ CPLX والـ PCAP والـ VEXP والـ LEXP.",
    "الـ RELY والـ DATA والـ TIME والـ STOR والـ VIRT."
   ],
   "qa": [
    "الـ COCOMO، اللي عمله Barry Boehm سنة 1981، واحد من أكتر نماذج تقدير الـ software انتشارًا؛ بيتوقع الـ effort (بالـ man-months) والـ schedule (بالشهور) من حجم الـ software بالـ delivered source instructions ومن الـ cost drivers. بيفترض إن الـ DSI هو الـ cost driver الأساسي، وإن فيه إدارة كويسة من الـ developer والـ customer، وإن الـ requirements ثابتة بعد الـ planning. المشاريع بتتصنف: الـ organic (مألوف، صغير، innovation قليل)، والـ semidetached (في النص)، أو الـ embedded (قيود صارمة، innovation كبير). فيه تلات models. الـ Basic بيعتمد على الحجم بس، ومعادلاته:<span class=\"ltr\">E = a·KDSI^b, TDEV = 2.5·E^c</span>وبيدي تقديرات سريعة وتقريبية، في حدود factor <bdi dir=\"ltr\">2</bdi> في 60% بس من الحالات. الـ Intermediate بيضيف 15 cost driver في مجالات الـ product والـ computer والـ personnel والـ project عن طريق الـ EAF، وبيبقى في حدود 20% في 68% من الحالات. والـ Detailed فيه multipliers بتفرّق بين الـ phases، و hierarchy من الـ module والـ subsystem والـ system، وبيبقى في حدود 20% في 70% من الحالات.",
    "الـ Basic فيه predictor واحد (الحجم) وتلات modes؛ تقديرات سريعة وبدري وتقريبية؛ ودقته محدودة. الـ Intermediate: الحجم + 15 cost driver عن طريق effort multipliers (EAF)؛ بيُستخدم على المنتج كله بدري أو لكل component بعدين؛ في حدود 20% في 68% من الحالات؛ الـ multipliers مش بتفرّق بين الـ phases، ومُرهق لو فيه components كتير. الـ Detailed: نفس معادلات الـ Intermediate بس الـ multipliers بتفرّق بين الـ phases وفيه hierarchy من الـ module والـ subsystem والـ system؛ بيقدّر الـ staffing والتكلفة والمدة لكل phase و module وبيسمح بتجربة strategies مختلفة؛ محتاج مجهود أكتر بكتير؛ في حدود 20% في 70% من الحالات.",
    "الـ Effort:<span class=\"ltr\">Effort = 3.6 × 40^1.20</span><span class=\"ltr\">= 3.6 × 83.65 = 301 MM</span>الـ Duration بالشهور:<span class=\"ltr\">Duration = 2.5 × 301^0.32</span><span class=\"ltr\">= 2.5 × 6.211 = 15.5 ≈ 16</span>الـ Staffing:<span class=\"ltr\">Staffing = 301/16 = 18.8 ≈ 19 FSP</span>نص الـ staff، والـ duration بالشهور:<span class=\"ltr\">19/2 = 9.5 ≈ 10 → duration = 301/10 = 30</span>الـ Staff عشان يخلص في 4 شهور:<span class=\"ltr\">301/4 = 75.25 ≈ 75 FSP</span>",
    "الـ Effort:<span class=\"ltr\">E = 3.0 × 24^1.12</span><span class=\"ltr\">= 3.0 × 35.14 = 105.4 ≈ 105 MM</span>الـ TDEV بالشهور:<span class=\"ltr\">TDEV = 2.5 × 105^0.35</span><span class=\"ltr\">= 2.5 × 5.098 = 12.7 ≈ 13</span>الـ Staff:<span class=\"ltr\">Staff = 105/13 = 8.08 ≈ 8 FSP</span>الـ Productivity:<span class=\"ltr\">24,000/105 = 228.6 ≈ 229 DSI/MM</span>بـ ¾ الـ staff، والمدة بالشهور:<span class=\"ltr\">¾ staff = 6 FSP → 105/6 = 17.5 ≈ 18</span>في نص الوقت:<span class=\"ltr\">6.5 months → 105/6.5 = 16.2 ≈ 16 FSP</span>التكلفة:<span class=\"ltr\">8 × 13 × 5000 = EP 520,000</span>وبالظبط (الـ E × المرتب):<span class=\"ltr\">105 × 5000 = EP 525,000</span>",
    "الـ Assumptions: الـ cost driver الأساسي هو عدد الـ DSI اللي اتطورت؛ المشروع عنده إدارة كويسة من الـ developer والـ customer الاتنين؛ الـ requirements specification مش هتتغير بشكل كبير بعد مرحلة الـ plans and requirements. الـ Modes: الـ organic (بيئة مألوفة ومستقرة، شبه مشاريع قبل كده، صغير نسبيًا، innovation قليل)؛ والـ semidetached (في النص)؛ والـ embedded (قيود صارمة ومش مرنة و interface requirements، و innovation كبير)."
   ],
   "quiz": [
    [
     "الـ <bdi dir=\"ltr\">589&nbsp;MM</bdi> ده الـ effort بتاع الـ embedded لـ <bdi dir=\"ltr\">70&nbsp;KDSI</bdi> (من امتحان <bdi dir=\"ltr\">2024/25</bdi>) بالحساب ده:<span class=\"ltr\">3.6 × 70^1.20</span>هنا الـ <bdi dir=\"ltr\">KDSI&nbsp;=&nbsp;40</bdi>، فالحساب:<span class=\"ltr\">3.6 × 83.65 ≈ 301 MM</span>",
     "الـ <bdi dir=\"ltr\">144&nbsp;=&nbsp;3.6&nbsp;×&nbsp;40</bdi> كده انت شلت الـ exponent؛ الـ Basic COCOMO بيرفع الحجم لـ <bdi dir=\"ltr\">1.20</bdi> الأول:<span class=\"ltr\">40^1.20 = 83.65, E ≈ 301 MM</span>",
     "صح:<span class=\"ltr\">E = 3.6 × 40^1.20</span><span class=\"ltr\">= 3.6 × 83.65 = 301.1 ≈ 301 MM</span>(من الـ L5، الـ Basic embedded equation).",
     "الـ <bdi dir=\"ltr\">230&nbsp;MM</bdi> ده الـ effort بتاع الـ embedded لـ <bdi dir=\"ltr\">32&nbsp;KDSI</bdi> (<bdi dir=\"ltr\">3.6&nbsp;×&nbsp;64</bdi>)؛ مع <bdi dir=\"ltr\">40&nbsp;KDSI</bdi> بيبقى:<span class=\"ltr\">E = 3.6 × 83.65 ≈ 301 MM</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">12&nbsp;months</bdi> قليلة: الـ schedule بتاع الـ embedded بيبقى:<span class=\"ltr\">2.5 × 301^0.32 = 2.5 × 6.21 = 15.5</span>وبتتقرّب لـ <bdi dir=\"ltr\">16&nbsp;months</bdi>.",
     "صح:<span class=\"ltr\">TDEV = 2.5 × E^0.32 = 2.5 × 301^0.32</span><span class=\"ltr\">= 2.5 × 6.21 = 15.5 ≈ 16 months</span>(من الـ L5، الـ Basic embedded schedule).",
     "الـ 19 دي الـ average staffing، مش الـ schedule بالشهور:<span class=\"ltr\">E / TDEV = 301 / 16 = 18.8 ≈ 19 FSP</span>",
     "الـ <bdi dir=\"ltr\">30&nbsp;months</bdi> دي المدة بنص الـ staff:<span class=\"ltr\">19/2 ≈ 10 FSP, 301 / 10 = 30</span>والـ schedule العادي:<span class=\"ltr\">2.5 × 301^0.32 ≈ 16</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">10&nbsp;FSP</bdi> دي نص الـ staff العادي (<bdi dir=\"ltr\">19/2&nbsp;≈&nbsp;10</bdi>)، وبتتستخدم لمدة نص الـ staff؛ عشان تخلص في <bdi dir=\"ltr\">4&nbsp;months</bdi> محتاج <bdi dir=\"ltr\">301&nbsp;/&nbsp;4&nbsp;≈&nbsp;75</bdi>.",
     "الـ <bdi dir=\"ltr\">1204&nbsp;=&nbsp;301&nbsp;×&nbsp;4</bdi> كده انت ضربت الـ effort في الوقت؛ الـ staff المطلوب لوقت معين:<span class=\"ltr\">E / T = 301 / 4 ≈ 75 FSP</span>",
     "ده الـ staffing بتاع الـ schedule اللي 16 شهر.",
     "صح. الـ staff المطلوب لوقت T هو:<span class=\"ltr\">E / T = 301 / 4 = 75.25 ≈ 75 FSP</span>(من الـ L5، الـ Derived quantities)."
    ],
    [
     "الـ <bdi dir=\"ltr\">146&nbsp;MM</bdi> ده مثال المحاضرة لـ <bdi dir=\"ltr\">32&nbsp;KDSI</bdi> semidetached (<bdi dir=\"ltr\">3.0&nbsp;×&nbsp;48.5</bdi>)؛ مع <bdi dir=\"ltr\">24&nbsp;KDSI</bdi> بيبقى:<span class=\"ltr\">E = 3.0 × 35.14 ≈ 105 MM</span>",
     "الـ 229 دي الـ productivity، خطوة بعدين:<span class=\"ltr\">24,000 / 105 DSI/MM</span>والـ effort نفسه:<span class=\"ltr\">3.0 × 24^1.12 ≈ 105 MM</span>",
     "الـ <bdi dir=\"ltr\">72&nbsp;=&nbsp;3&nbsp;×&nbsp;24</bdi> كده انت تجاهلت الـ exponent <bdi dir=\"ltr\">1.12</bdi>. الصح:<span class=\"ltr\">24^1.12 = 35.14, E = 3.0 × 35.14 ≈ 105 MM</span>",
     "صح:<span class=\"ltr\">E = 3.0 × 24^1.12</span><span class=\"ltr\">= 3.0 × 35.14 = 105.4 ≈ 105 MM</span>(من الـ L5، الـ Basic semidetached equation)."
    ],
    [
     "الـ <bdi dir=\"ltr\">0.0044</bdi> اللي هو <bdi dir=\"ltr\">105&nbsp;/&nbsp;24,000</bdi> كده انت قلبت النسبة؛ الـ productivity بتبقى:<span class=\"ltr\">DSI / E = 24,000 / 105 ≈ 229 DSI/MM</span>",
     "صح:<span class=\"ltr\">Productivity = DSI / E = 24,000 / 105</span><span class=\"ltr\">= 228.6 ≈ 229 DSI/MM</span>(من الـ L5، الـ Derived quantities).",
     "الـ 8 دي الـ average staffing:<span class=\"ltr\">E / TDEV = 105 / 13 ≈ 8 FSP</span>والـ productivity بتبقى:<span class=\"ltr\">DSI / E = 24,000 / 105 ≈ 229 DSI/MM</span>",
     "ده <bdi dir=\"ltr\">DSI/TDEV</bdi>، مش الـ productivity بتاعة المحاضرة."
    ],
    [
     "صح. الـ staff الجديد والمدة:<span class=\"ltr\">¾ × 8 = 6 FSP</span><span class=\"ltr\">E / S = 105 / 6 = 17.5 ≈ 18 months</span>(من الـ L5، الـ Derived quantities).",
     "ده ¾ من الـ 13 شهر، يعني تغيير في الوقت مش في الـ staff.",
     "الـ <bdi dir=\"ltr\">26&nbsp;months</bdi> دي المدة بنص الـ staff (<bdi dir=\"ltr\">4&nbsp;FSP</bdi>) يعني:<span class=\"ltr\">105 / 4 = 26.25</span>لكن ¾ الـ staff بيبقى <bdi dir=\"ltr\">6&nbsp;FSP</bdi>، فـ:<span class=\"ltr\">105 / 6 = 17.5 months</span>",
     "الـ <bdi dir=\"ltr\">13&nbsp;months</bdi> دي الـ schedule الأصلي بـ <bdi dir=\"ltr\">8&nbsp;FSP</bdi>؛ بناس أقل (<bdi dir=\"ltr\">6&nbsp;FSP</bdi>) نفس الـ <bdi dir=\"ltr\">105&nbsp;MM</bdi> بياخدوا وقت أطول:<span class=\"ltr\">105 / 6 = 17.5</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">1,145,000&nbsp;=&nbsp;229&nbsp;×&nbsp;5000</bdi> كده انت ضربت الـ productivity (بالـ <bdi dir=\"ltr\">DSI/MM</bdi>) في المرتب؛ الـ cost بيبقى:<span class=\"ltr\">staff × months × salary = 8 × 13 × 5000</span>",
     "الـ <bdi dir=\"ltr\">65,000&nbsp;=&nbsp;13&nbsp;×&nbsp;5000</bdi> دي مرتبات programmer واحد بس؛ لازم تدفع للـ <bdi dir=\"ltr\">8&nbsp;FSP</bdi> كلهم:<span class=\"ltr\">8 × 13 × 5000 = EP 520,000</span>",
     "صح:<span class=\"ltr\">8 FSP × 13 months × 5000 = 520,000</span>وبالظبط (الـ E × المرتب):<span class=\"ltr\">105 × 5000 = 525,000</span>",
     "الـ <bdi dir=\"ltr\">40,000&nbsp;=&nbsp;8&nbsp;×&nbsp;5000</bdi> دي مرتبات الـ team لشهر واحد بس؛ على <bdi dir=\"ltr\">13&nbsp;months</bdi> يبقى:<span class=\"ltr\">8 × 13 × 5000 = EP 520,000</span>"
    ],
    [
     "ده لو استخدمت الـ constant بتاع الـ Intermediate embedded وهو <bdi dir=\"ltr\">2.8</bdi>، بالحساب ده:<span class=\"ltr\">2.8 × 163.7 = 458.4</span>",
     "الـ <bdi dir=\"ltr\">252&nbsp;=&nbsp;3.6&nbsp;×&nbsp;70</bdi> كده انت نسيت الـ exponent. الصح:<span class=\"ltr\">70^1.20 = 163.7, E = 3.6 × 163.7 ≈ 589 MM</span>",
     "صح:<span class=\"ltr\">E = 3.6 × 70^1.20</span><span class=\"ltr\">= 3.6 × 163.7 = 589.4 ≈ 589 MM</span>(من الـ L5، الـ Basic embedded equation).",
     "الـ <bdi dir=\"ltr\">301&nbsp;MM</bdi> ده الـ effort بتاع الـ embedded لـ <bdi dir=\"ltr\">40&nbsp;KDSI</bdi> (من امتحان <bdi dir=\"ltr\">2021/22</bdi>)؛ مع <bdi dir=\"ltr\">70&nbsp;KDSI</bdi> بيبقى:<span class=\"ltr\">E = 3.6 × 163.7 ≈ 589 MM</span>"
    ],
    [
     "صح:<span class=\"ltr\">Staff = 589/19 = 31</span><span class=\"ltr\">0.8 × 31 = 24.8 ≈ 25 FSP</span><span class=\"ltr\">589/25 = 23.6 ≈ 24 months</span>",
     "الـ 31 دي الـ average staffing العادي <bdi dir=\"ltr\">589&nbsp;/&nbsp;19</bdi>؛ السؤال عايز الشهور بـ 80% من الـ staff:<span class=\"ltr\">589 / 25 ≈ 24</span>",
     "الـ <bdi dir=\"ltr\">19&nbsp;months</bdi> دي الـ schedule الأصلي؛ بـ <bdi dir=\"ltr\">25&nbsp;FSP</bdi> بس نفس الـ <bdi dir=\"ltr\">589&nbsp;MM</bdi> بياخدوا وقت أطول:<span class=\"ltr\">589 / 25 = 23.6 ≈ 24 months</span>",
     "80% من الـ 19 شهر ده تغيير في الوقت، مش في الـ staff."
    ],
    [
     "الـ <bdi dir=\"ltr\">31&nbsp;FSP</bdi> دول الـ staffing للـ <bdi dir=\"ltr\">19&nbsp;months</bdi> العادية (<bdi dir=\"ltr\">589&nbsp;/&nbsp;19</bdi>)؛ وقت أقصر <bdi dir=\"ltr\">13&nbsp;months</bdi> محتاج:<span class=\"ltr\">589 / 13 ≈ 45 FSP</span>",
     "الـ 119 دي الـ productivity:<span class=\"ltr\">70,000 / 589 DSI/MM</span>والـ staff لـ 70% من الوقت:<span class=\"ltr\">589 / 13 ≈ 45 FSP</span>",
     "ده 70% من الـ staff، يعني الاتجاه الغلط.",
     "صح:<span class=\"ltr\">0.7 × 19 = 13.3 ≈ 13 months</span><span class=\"ltr\">589/13 = 45.3 ≈ 45</span>(أو 44 لو سبت الـ 13.3 من غير تقريب)."
    ],
    [
     "الـ <bdi dir=\"ltr\">6&nbsp;FSP</bdi> دول 75% من الـ staff، ودي بتنفع لما الـ staff هو اللي يقل (مش الوقت)؛ وقت أقل محتاج ناس أكتر:<span class=\"ltr\">105 / 9.75 ≈ 11</span>",
     "صح:<span class=\"ltr\">0.75 × 13 = 9.75 months</span><span class=\"ltr\">105/9.75 = 10.8 ≈ 11</span>",
     "الـ <bdi dir=\"ltr\">8&nbsp;FSP</bdi> دول الـ staffing للـ schedule الكامل <bdi dir=\"ltr\">13&nbsp;months</bdi>؛ عشان تخلص في <bdi dir=\"ltr\">9.75&nbsp;months</bdi> محتاج:<span class=\"ltr\">105 / 9.75 ≈ 11 FSP</span>",
     "الـ <bdi dir=\"ltr\">16&nbsp;FSP</bdi> دول الـ staff لنص الوقت (<bdi dir=\"ltr\">105&nbsp;/&nbsp;6.5&nbsp;=&nbsp;16.2</bdi>)؛ و75% من الوقت بيبقى <bdi dir=\"ltr\">9.75&nbsp;months</bdi>، فـ:<span class=\"ltr\">105 / 9.75 ≈ 11</span>"
    ],
    [
     "صح. نص الـ staff والمدة:<span class=\"ltr\">8 / 2 = 4 FSP</span><span class=\"ltr\">E / S = 105 / 4 = 26.25 ≈ 26 months</span>(من الـ L5، الـ Derived quantities).",
     "الـ <bdi dir=\"ltr\">13&nbsp;months</bdi> دي المدة الأصلية بـ <bdi dir=\"ltr\">8&nbsp;FSP</bdi>؛ لما الـ staff يبقى النص (4) الوقت بيتضاعف:<span class=\"ltr\">105 / 4 ≈ 26 months</span>",
     "الـ <bdi dir=\"ltr\">17.5&nbsp;months</bdi> دي المدة بـ ¾ الـ staff (<bdi dir=\"ltr\">105&nbsp;/&nbsp;6</bdi>)؛ ونص الـ staff بيبقى <bdi dir=\"ltr\">4&nbsp;FSP</bdi>، فـ:<span class=\"ltr\">105 / 4 ≈ 26 months</span>",
     "ده نص الـ schedule، مش نص الـ staff."
    ],
    [
     "الـ <bdi dir=\"ltr\">91&nbsp;MM</bdi> و<bdi dir=\"ltr\">14&nbsp;months</bdi> و<bdi dir=\"ltr\">7&nbsp;FSP</bdi> دول ناتج معادلة الـ organic:<span class=\"ltr\">2.4 × 32^1.05</span>والمثال semidetached:<span class=\"ltr\">3.0 × 32^1.12 ≈ 146</span>",
     "الـ <bdi dir=\"ltr\">230&nbsp;MM</bdi> و<bdi dir=\"ltr\">14&nbsp;months</bdi> و<bdi dir=\"ltr\">16&nbsp;FSP</bdi> دول من معادلة الـ embedded:<span class=\"ltr\">3.6 × 32^1.20</span>والـ semidetached بيدي:<span class=\"ltr\">3.0 × 48.5 ≈ 146 MM</span>",
     "صح:<span class=\"ltr\">E = 3.0 × 32^1.12 = 145.5 ≈ 146 MM</span><span class=\"ltr\">TDEV = 2.5 × 146^0.35 = 14.3 ≈ 14 months</span><span class=\"ltr\">staff = 146 / 14 ≈ 10 FSP</span>(من الـ L5، المثال المحلول).",
     "ده مثال الـ Intermediate بـ <bdi dir=\"ltr\">RELY&nbsp;=&nbsp;1.15</bdi>."
    ],
    [
     "الـ <bdi dir=\"ltr\">127&nbsp;=&nbsp;146&nbsp;/&nbsp;1.15</bdi> كده انت قسمت على الـ multiplier؛ الـ EAF بيتضرب في الـ nominal effort:<span class=\"ltr\">1.15 × 145.5 ≈ 167 MM</span>",
     "صح:<span class=\"ltr\">E = EAF × 3.0 × 32^1.12</span><span class=\"ltr\">= 1.15 × 145.5 = 167.3 ≈ 167 MM</span>(من الـ L5، مثال الـ Intermediate).",
     "الـ 192 دي الـ productivity بتاعة مثال الـ Intermediate، مش الـ effort:<span class=\"ltr\">32,000 / 167 DSI/MM</span>",
     "الـ <bdi dir=\"ltr\">146&nbsp;MM</bdi> ده الـ nominal effort (<bdi dir=\"ltr\">EAF&nbsp;=&nbsp;1</bdi>)؛ والـ <bdi dir=\"ltr\">RELY&nbsp;=&nbsp;1.15</bdi> بيتضرب فيه:<span class=\"ltr\">1.15 × 145.5 ≈ 167 MM</span>"
    ],
    [
     "الـ Semidetached هو الـ mode اللي في النص بين الـ organic والـ embedded؛ الوصف (مألوف، صغير، innovation قليل) ده الـ organic.",
     "الـ Embedded فيه قيود صارمة ومحتاج innovation كبير.",
     "الـ Detailed ده واحد من التلات COCOMO models (الـ Basic والـ Intermediate والـ Detailed)، مش development mode.",
     "صح. الـ Organic mode: بيتعمل في بيئة مألوفة ومستقرة، شبه مشاريع قبل كده، صغير نسبيًا ومحتاج innovation قليل (L5, Modes)."
    ],
    [
     "الـ 68% دي رقم الـ Intermediate model (في حدود 20% من الفعلي 68% من الوقت)، مش الـ Basic في حدود factor of 2.",
     "الـ 70% دي رقم الـ Detailed model (في حدود 20% من الفعلي 70% من الوقت)، مش الـ Basic في حدود factor of 2.",
     "الـ 29% دي الـ Basic COCOMO في حدود factor of 1.3؛ في حدود factor of 2 بتبقى 60% من الوقت.",
     "صح. الـ Basic COCOMO مفيهوش cost-driver factors، فتقديراته بتبقى في حدود factor of 1.3 بس 29% من الوقت، وفي حدود factor of 2 بس 60% من الوقت (L5, Basic limitations)."
    ],
    [
     "الإدارة الكويسة من الـ developer والـ customer دي assumption رقم 2 في الـ COCOMO، يعني هي فعلًا assumption.",
     "صح. الـ COCOMO بيفترض إن الـ requirements مش هتتغير بشكل كبير بعد الـ planning.",
     "إن الـ requirements ما تتغيرش كتير بعد الـ plans and requirements phase دي assumption رقم 3، يعني هي فعلًا assumption.",
     "إن الـ DSI هو الـ primary cost driver دي assumption رقم 1 في الـ COCOMO، يعني هي فعلًا assumption."
    ],
    [
     "صح. الـ Detailed model بيزوّد phase-sensitive effort multipliers وhierarchy من module-subsystem-system، وبيستخدم نفس معادلات الـ Intermediate (L5, Detailed COCOMO).",
     "الـ Detailed بيستخدم نفس معادلات الـ Intermediate.",
     "الـ Detailed model مش بيتجاهل الـ cost drivers؛ بيطبّقهم على مستوى الـ module (الـ CPLX والـ PCAP والـ VEXP والـ LEXP) ومستوى الـ subsystem (الـ RELY والـ DATA والـ TIME والـ STOR والـ VIRT).",
     "الاعتماد على الحجم بس ده الـ Basic model؛ الـ Detailed بيستخدم الحجم ومعاه phase-sensitive cost drivers لكل module وsubsystem."
    ]
   ],
   "extra": [
    [
     "الـ <bdi dir=\"ltr\">146&nbsp;MM</bdi> و<bdi dir=\"ltr\">14&nbsp;months</bdi> دول ناتج الـ semidetached:<span class=\"ltr\">3.0 × 32^1.12</span>والـ organic بيستخدم:<span class=\"ltr\">2.4 × 32^1.05 ≈ 91 MM</span>",
     "الـ <bdi dir=\"ltr\">230&nbsp;MM</bdi> و<bdi dir=\"ltr\">14&nbsp;months</bdi> دول ناتج الـ embedded:<span class=\"ltr\">3.6 × 32^1.20</span>والـ organic بيستخدم:<span class=\"ltr\">2.4 × 32^1.05 ≈ 91 MM</span>",
     "ده بيستخدم <bdi dir=\"ltr\">2.4&nbsp;×&nbsp;32&nbsp;=&nbsp;76.8</bdi> من غير الأس.",
     "صح:<span class=\"ltr\">32^1.05 = 38.05, × 2.4 = 91.3</span><span class=\"ltr\">91^0.38 = 5.55, × 2.5 = 13.9</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">192&nbsp;=&nbsp;3.0&nbsp;×&nbsp;64</bdi> كده انت استخدمت ثابت الـ semidetached؛ الـ Basic embedded بيستخدم <bdi dir=\"ltr\">3.6</bdi>، فـ:<span class=\"ltr\">E = 3.6 × 64 = 230.4 MM</span>",
     "الـ 64 دي بس <bdi dir=\"ltr\">KDSI^1.20</bdi>؛ الـ Basic COCOMO بيضربها في ثابت الـ mode <bdi dir=\"ltr\">3.6</bdi>، فتطلع <bdi dir=\"ltr\">230&nbsp;MM</bdi>.",
     "الـ <bdi dir=\"ltr\">115&nbsp;=&nbsp;3.6&nbsp;×&nbsp;32</bdi> كده انت شلت الـ exponent؛ لازم تستخدم المعطى:<span class=\"ltr\">32^1.20 = 64</span><span class=\"ltr\">3.6 × 64 = 230 MM</span>",
     "صح:<span class=\"ltr\">E = 3.6 × 32^1.20 = 3.6 × 64</span><span class=\"ltr\">= 230.4 ≈ 230 MM</span>(من الـ L5، الـ Basic embedded equation)."
    ],
    [
     "الـ <bdi dir=\"ltr\">7&nbsp;FSP</bdi> دول تقريبًا نص القيمة الصح؛ الـ average staffing بيبقى:<span class=\"ltr\">E / TDEV = 240 / 17 ≈ 14 FSP</span>",
     "صح:<span class=\"ltr\">Average staffing = E / TDEV</span><span class=\"ltr\">= 240 / 17 = 14.1 ≈ 14 FSP</span>(من الـ L5، الـ Derived quantities).",
     "الـ 208 دي الـ productivity (<bdi dir=\"ltr\">50,000&nbsp;/&nbsp;240</bdi> بالـ <bdi dir=\"ltr\">DSI/MM</bdi>).",
     "الـ <bdi dir=\"ltr\">4080&nbsp;=&nbsp;240&nbsp;×&nbsp;17</bdi> كده انت ضربت الـ effort في الوقت؛ الـ average staffing بيتقسم:<span class=\"ltr\">240 / 17 ≈ 14 FSP</span>"
    ],
    [
     "صح. الـ staff المطلوب لوقت T هو:<span class=\"ltr\">E / T = 60 / 5 = 12 FSP</span>لما الوقت يبقى النص، الـ staff بيتضاعف (من الـ L5، الـ Derived quantities).",
     "الـ <bdi dir=\"ltr\">300&nbsp;=&nbsp;60&nbsp;×&nbsp;5</bdi> كده انت ضربت الـ effort في الوقت؛ الـ staff لوقت مستهدف:<span class=\"ltr\">E / T = 60 / 5 = 12 FSP</span>",
     "الـ <bdi dir=\"ltr\">3&nbsp;FSP</bdi> دول نص الـ staff، وده هيضاعف الوقت لـ <bdi dir=\"ltr\">20&nbsp;months</bdi>؛ عشان تخلص في <bdi dir=\"ltr\">5&nbsp;months</bdi> محتاج:<span class=\"ltr\">60 / 5 = 12 FSP</span>",
     "الـ <bdi dir=\"ltr\">6&nbsp;FSP</bdi> دول الـ staff العادي لـ <bdi dir=\"ltr\">10&nbsp;months</bdi>؛ عشان تخلص في <bdi dir=\"ltr\">5&nbsp;months</bdi> محتاج:<span class=\"ltr\">60 / 5 = 12 FSP</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">2,400,000</bdi> اللي هو <bdi dir=\"ltr\">60&nbsp;×&nbsp;10&nbsp;×&nbsp;4000</bdi> كده انت ضربت الـ man-months في الشهور تاني؛ الـ cost بيبقى:<span class=\"ltr\">6 FSP × 10 months × 4000 = 240,000</span>",
     "الـ <bdi dir=\"ltr\">24,000&nbsp;=&nbsp;6&nbsp;×&nbsp;4000</bdi> دي مرتبات الـ team لشهر واحد بس؛ على <bdi dir=\"ltr\">10&nbsp;months</bdi> يبقى:<span class=\"ltr\">6 × 10 × 4000 = EP 240,000</span>",
     "صح:<span class=\"ltr\">6 × 10 × 4000 = 240,000 (= 60 MM × 4000)</span>",
     "الـ <bdi dir=\"ltr\">40,000&nbsp;=&nbsp;10&nbsp;×&nbsp;4000</bdi> دي بتدفع لشخص واحد بس <bdi dir=\"ltr\">10&nbsp;months</bdi>؛ والـ team فيه 6:<span class=\"ltr\">6 × 10 × 4000 = EP 240,000</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">0.30&nbsp;=&nbsp;1.15&nbsp;−&nbsp;0.85</bdi> كده انت طرحت الـ multipliers؛ الـ EAF هو حاصل ضربهم:<span class=\"ltr\">0.85 × 1.15 = 0.9775</span>",
     "الـ <bdi dir=\"ltr\">2.00&nbsp;=&nbsp;0.85&nbsp;+&nbsp;1.15</bdi> كده انت جمعتهم؛ الـ EAF هو حاصل ضرب الـ effort multipliers:<span class=\"ltr\">0.85 × 1.15 = 0.9775</span>",
     "صح. الـ EAF هو حاصل ضرب الـ effort multipliers بتوع الـ cost drivers:<span class=\"ltr\">0.85 × 1.15 = 0.9775</span>(من الـ L5، الـ Intermediate COCOMO).",
     "الـ 1.15 كده انت استخدمت الـ RELY لوحده؛ كل driver ليه rating بيدخل في الـ EAF، فلازم تضرب في الـ CPLX low (<bdi dir=\"ltr\">0.85</bdi>) كمان:<span class=\"ltr\">0.85 × 1.15 = 0.9775</span>"
    ],
    [
     "صح. الـ STOR (main storage constraint) ده Computer attribute، مع TIME وVIRT وTURN (L5, Intermediate cost drivers).",
     "الـ TOOL (use of software tools) ده Project attribute، مع MODP وSCED.",
     "الـ DATA (database size) ده Product attribute، مع RELY وCPLX.",
     "الـ ACAP (analyst capability) ده Personnel attribute، مع AEXP وPCAP وVEXP وLEXP."
    ],
    [
     "الـ Embedded يعني قيود صارمة و innovation كبير.",
     "الـ Semidetached في النص بين الـ organic والـ embedded؛ و package خامسة شبه اللي قبلها في بيئة مستقرة دي حالة organic.",
     "الـ mode فعلًا organic، بس الـ 3.6 ده coefficient الـ Basic embedded؛ الـ Basic organic بيستخدم:<span class=\"ltr\">E = 2.4 × KDSI^1.05</span>",
     "صح. المشروع المألوف والمستقر والشبه مشاريع قبل كده ده organic، والـ effort في الـ Basic organic هو:<span class=\"ltr\">E = 2.4 × KDSI^1.05</span>(من الـ L5، الـ Modes والـ Basic equations)."
    ],
    [
     "الـ multipliers في الـ Intermediate مش بتفرّق بين الـ phases.",
     "صح. بيقدّر كل phase و subsystem و module.",
     "الـ COCOMO بيغطّي ده فعلًا: الـ Detailed model بيقدّر الـ staffing والـ cost والمدة لكل phase وsubsystem وmodule.",
     "الـ Basic بيدي رقم إجمالي واحد سريع وتقريبي من الحجم بس؛ مايقدرش يقسّم الـ staffing أو الـ cost على الـ phases أو الـ modules."
    ],
    [
     "صح:<span class=\"ltr\">¼ × 3 = 0.75 ≈ 1 FSP</span><span class=\"ltr\">28 / 1 = 28 months</span>(مسألة المحاضرة <bdi dir=\"ltr\">(b)</bdi>).",
     "ده <bdi dir=\"ltr\">4&nbsp;×&nbsp;9</bdi> شهور، وده بيتجاهل التقريب لـ <bdi dir=\"ltr\">1&nbsp;FSP</bdi>.",
     "الـ <bdi dir=\"ltr\">9&nbsp;months</bdi> دي الـ schedule الأصلي بـ <bdi dir=\"ltr\">3&nbsp;FSP</bdi>؛ بـ ¼ الـ staff (<bdi dir=\"ltr\">≈1&nbsp;FSP</bdi>) هياخد:<span class=\"ltr\">28 / 1 = 28 months</span>",
     "الـ <bdi dir=\"ltr\">2.25&nbsp;=&nbsp;9&nbsp;×&nbsp;¼</bdi> كده انت صغّرت الوقت بدل الـ staff؛ ناس أقل بياخدوا وقت أطول، بـ <bdi dir=\"ltr\">≈1&nbsp;FSP</bdi> يبقى:<span class=\"ltr\">28 / 1 = 28 months</span>"
    ]
   ]
  },
  "6": {
   "notes": [
    {
     "h": "الـ CPM والـ PERT",
     "pts": [
      "الـ <b>CPM (Critical Path Method)</b> والـ <b>PERT (Program Evaluation and Review Technique)</b> هما <b>طرق مبنية على network</b> معمولة عشان تساعد في <b>الـ planning والـ scheduling والـ control</b> بتاع المشاريع.",
      "الـ <b>project</b> هو مجموعة أنشطة مرتبطة ببعض، كل نشاط بيستهلك وقت و resources. وهدف الـ CPM والـ PERT إنهم يدّوا طريقة تحليلية لجدولة الأنشطة دي.",
      "المراحل: أولاً، تحديد الـ <b>activities</b> وعلاقات الأسبقية (precedence) بينها والوقت اللي محتاجاه؛ تانيًا، تحويل المشروع لـ <b>network</b>؛ تالتًا، <b>حسابات الـ network</b> اللي بتبني عليها الـ <b>time schedule</b>؛ رابعًا، وقت التنفيذ ممكن الـ schedule مايتحققش زي ما هو، فبيتحدّث: يعني فيه <b>feedback loop</b> من الـ time schedule راجع للـ network.",
      "الفرق: <b>الـ CPM بيفترض إن مدد الأنشطة deterministic</b> (ثابتة ومعروفة)، و<b>الـ PERT بيفترض إنها probabilistic</b> (احتمالية). والاتنين اتعملوا كل واحد لوحده."
     ],
     "figH": {
      "sa-l6-phases": "مراحل تخطيط المشروع بالـ CPM والـ PERT، ومعاها الـ feedback loop (الـ slide رقم 3)"
     }
    },
    {
     "h": "قواعد تمثيل الـ network والـ dummy activities",
     "pts": [
      "كل activity بتتمثّل بـ <b>arc</b> (سهم) في اتجاه التقدم؛ والـ <b>nodes</b> هي اللي بتحدد علاقات الأسبقية.",
      "الـ <b>Rule 1</b>: كل activity بتتمثّل بـ <b>arc واحد وبس</b>. الـ <b>Rule 2</b>: كل activity لازم تتعرّف بـ <b>اتنين end nodes مختلفين</b>.",
      "الـ <b>dummy activity</b> (سهم متقطع) <b>مابتستهلكش وقت ولا resources</b>. بتدّي الـ activities اللي بتحصل في نفس الوقت (زي A و B) end nodes unique (فيه أربع طرق لرسمها)، فـ rule 2 تتحقق.",
      "الـ <b>Rule 3</b>: عشان تحافظ على الأسبقية الصح، جاوب لكل activity على الأسئلة دي: (أ) أنهي activities لازم <b>تسبقها على طول</b>؟ (ب) أنهي activities لازم <b>تيجي بعدها</b>؟ (ج) أنهي activities لازم تحصل <b>في نفس الوقت</b> معاها؟",
      "مثال: C بتبدأ بعد A و B؛ و E بتبدأ بعد B بس. لو جمعت A و B في node واحدة قبل C و E الاتنين يبقى ده <b>غلط</b> (لأنه بيجبر E تستنى A). التصليح: B تنتهي عند node لوحدها، وdummy D يطلع من الـ end node بتاعة B للـ start node بتاعة C."
     ],
     "figH": {
      "sa-l6-dummy-ways": "الـ Rule 2 والأربع طرق لإضافة dummy للـ A والـ B اللي بيحصلوا في نفس الوقت (الـ slide رقم 11)",
      "sa-l6-dummy-fix": "جرّب: خلّص A أو B وشوف أنهي رسمة بتحافظ على الأسبقية الصح (الـ slide رقم 15)"
     }
    },
    {
     "h": "الـ Forward pass والـ backward pass (إزاي تحسب كل حاجة)",
     "figH": {
      "sa-l6-cpm-calc": "حاسبة الـ CPM: الـ ES والـ EF والـ LS والـ LF والـ slack والـ free slack والـ Gantt chart والـ team، لأمثلة المحاضرة أو لمثال من عندك"
     }
    },
    {
     "h": "مثال المحاضرة: 13 activity (من A لـ M)، مع إجابة الدكتور",
     "figH": {
      "sa-l6-net13": "الـ network بتاع الـ 13 activity: الـ forward pass والـ backward pass والـ critical path خطوة بخطوة"
     }
    },
    {
     "h": "مثال الـ 13 activity: الـ critical path والـ Gantt والـ team",
     "figH": {
      "sa-l6-gantt13": "الـ Gantt chart وحدة زمن ورا التانية: أكبر عدد bars شغالة مع بعض هو أقل team"
     }
    },
    {
     "h": "مسألة المحاضرة 2 (10 activities، بالأسابيع)",
     "figH": {
      "sa-l6-problem2": "مسألة 2: غيّر الـ activity 6 من أسبوع لـ 6 أسابيع وشوف الـ critical path بيتنقل إزاي"
     }
    },
    {
     "h": "مسألة المحاضرة 3 (من A لـ G) ومسألة 1 (الـ expected times)",
     "figH": {
      "sa-l6-problem3": "مسألة 3 activity ورا التانية: الـ EF والـ LF والـ slack والـ critical path",
      "sa-l6-pert-et": "مسألة 1: الـ expected time لكل task، أو لتقديرات من عندك"
     }
    },
    {
     "h": "أمثلة Lab 3 (tasks مرحلة الـ planning)",
     "figH": {
      "sa-l6-lab3": "الـ Ex 1 والـ Ex 2 بتوع Lab 3 كـ networks: كل path وطوله"
     }
    },
    {
     "h": "برّه الـ slides: الـ PERT variance والاحتمالات (من الكتاب)",
     "figH": {
      "sa-l6-pert-prob": "الـ variance بتاع الـ critical path واحتمال إن المشروع يخلص قبل وقت معين (مشروع الـ SPTS)"
     }
    }
   ],
   "cards": [
    "الـ CPM بيفترض مدد deterministic؛ والـ PERT بيفترض مدد probabilistic.",
    "إنهم يدّوا طريقة تحليلية لجدولة أنشطة المشروع.",
    "مجموعة أنشطة مرتبطة ببعض، كل واحد بيستهلك وقت و resources.",
    "كل activity بتتمثّل بـ arc واحد وبس.",
    "كل activity لازم تتعرّف بـ اتنين end nodes مختلفين.",
    "سهم متقطع مابيستهلكش وقت ولا resources؛ بيحافظ على إن الـ end nodes تبقى unique وعلى الأسبقية الصح.",
    "إيه اللي لازم يسبقها على طول؟ إيه اللي لازم ييجي بعدها؟ إيه اللي لازم يحصل في نفس الوقت؟",
    "الـ schedule ممكن مايتحققش زي ما اتخطط؛ أنشطة بتتسرّع أو تتأخر فلازم الـ network والـ schedule يتحدّثوا.",
    "المعادلة:<span class=\"ltr\">ET = (o + 4r + p)/6</span>",
    "الـ ES هو أكبر EF للـ predecessors، والـ EF:<span class=\"ltr\">EF = ES + duration</span>",
    "الـ LF هو أصغر LS للـ successors، والـ LS:<span class=\"ltr\">LS = LF - duration</span>",
    "بيتحسب كده:<span class=\"ltr\">LS - ES (= LF - EF)</span>وبيبقى صفر على الـ critical path.",
    "التأخير المسموح من غير ما يأخر الـ early start لأي task جاية بعدها على طول.",
    "طول أطول path في الـ network.",
    "أكبر عدد activities شغالة في نفس الوقت على الـ Gantt chart بتاع الـ earliest-start.",
    "المدة <bdi dir=\"ltr\">T&nbsp;=&nbsp;40</bdi>، والـ critical path هو <bdi dir=\"ltr\">B⁠-⁠E⁠-⁠F⁠-⁠J⁠-⁠L</bdi>، والـ team فيه 4.",
    "المدة 23 أسبوع، والـ critical path هو:<span class=\"ltr\">1-2-4-7-8-10</span>ولو الـ activity 6 خدت 6 أسابيع يبقى 24 أسبوع، والـ path بيبقى:<span class=\"ltr\">1-2-4-6-8-10</span>",
    "المدة <bdi dir=\"ltr\">T&nbsp;=&nbsp;21</bdi>، والـ critical path هو <bdi dir=\"ltr\">A⁠-⁠C⁠-⁠D⁠-⁠F⁠-⁠G</bdi>؛ والـ slack:<span class=\"ltr\">B = 4, E = 3</span>",
    "المعادلة:<span class=\"ltr\">((p - o)/6)²</span>",
    "المعادلة:<span class=\"ltr\">Z = (target - expected) / σ</span>والـ σ هنا بتاع الـ critical path."
   ],
   "qa": [
    "الـ CPM والـ PERT طرق مبنية على network بتساعد في الـ planning والـ scheduling والـ control للمشاريع؛ المشروع مجموعة أنشطة مرتبطة ببعض كل واحد بيستهلك وقت و resources، والاتنين بيدّوا طريقة تحليلية لجدولتها. الـ CPM بيفترض مدد deterministic، والـ PERT probabilistic. المراحل: تحديد الأنشطة والأسبقية والأوقات؛ تحويلها لـ network؛ عمل حسابات الـ network عشان نبني الـ time schedule؛ ووقت التنفيذ نحدّث الـ schedule (feedback loop من الـ time schedule للـ network) لأن الأنشطة ممكن تتسرّع أو تتأخر.",
    "الـ Rule 1: كل activity بتتمثّل بـ arc واحد وبس. الـ Rule 2: كل activity لازم تتعرّف بـ اتنين end nodes مختلفين. الـ Rule 3: عشان الأسبقية تفضل صح، اسأل: أنهي activities لازم تسبقها على طول، وأنهي لازم تيجي بعدها، وأنهي لازم تحصل في نفس الوقت. الـ dummy activity سهم متقطع مابيستهلكش وقت ولا resources؛ بيدّي الأنشطة المتزامنة end nodes unique وبيصلّح الأسبقية (مثلًا C بعد A و B، و E بعد B بس: الـ end node بتاعة B تتوصل بالـ start بتاع C بـ dummy عشان E ماتستناش A).",
    "احسب الـ expected time لكل activity:<span class=\"ltr\">ET = (o+4r+p)/6</span>الـ Forward pass: أبدر وقت خلصان لأي activity هو مجموع الأوقات على أطول path ليها، يعني الـ ES هو أكبر EF للـ predecessors، و:<span class=\"ltr\">EF = ES + t</span>وأكبر EF هو وقت المشروع. الـ Backward pass: أتأخر وقت خلصان هو وقت المشروع ناقص الأوقات على الـ path اللي بعدها، يعني الـ LF هو أصغر LS للـ successors، و:<span class=\"ltr\">LS = LF - t</span>والـ Slack:<span class=\"ltr\">Slack = LF - EF</span>والأنشطة اللي الـ slack بتاعها صفر هي الـ critical path.",
    "الـ Forward pass:<span class=\"ltr\">B 0-10, E 10-20, F 20-29, J 29-36, L 36-40</span><span class=\"ltr\">D 10-18, G 18-21, K 18-22, H 10-14</span><span class=\"ltr\">I 20-25, M 29-32, A 0-5, C 0-3</span>المدة 40 يوم، والـ critical path هو <bdi dir=\"ltr\">B⁠-⁠E⁠-⁠F⁠-⁠J⁠-⁠L</bdi>. الـ Slack:<span class=\"ltr\">A 28, C 26, D 15, G 15, H 22, I 11, K 18, M 8</span>على الـ Gantt chart بتاع الـ earliest-start، العدد في اليوم بيوصل أقصاه 4 (يوم <bdi dir=\"ltr\">20⁠-⁠21</bdi> فيه الـ F والـ G والـ I والـ K)، فأقل team هو 4 أشخاص.",
    "في الأصل المدة <bdi dir=\"ltr\">T&nbsp;=&nbsp;23</bdi> أسبوع، والـ critical path هو:<span class=\"ltr\">1-2-4-7-8-10</span>والـ activity 6 (design screens) كان عندها 4 أسابيع slack (الـ ES بـ 12 والـ LS بـ 16). لما تزيد 5 أسابيع تبقى عدّت الـ slack بأسبوع، والـ path اللي هو <bdi dir=\"ltr\">1⁠-⁠2⁠-⁠4⁠-⁠6⁠-⁠8⁠-⁠10</bdi> بيبقى بالأسابيع:<span class=\"ltr\">2+3+7+6+4+2 = 24</span>المشروع بيتأخر أسبوع واحد ويبقى 24 أسبوع، والـ critical path بيبقى:<span class=\"ltr\">1-2-4-6-8-10</span>والـ activity 7 بقى عندها أسبوع slack."
   ],
   "quiz": [
    [
     "الـ <bdi dir=\"ltr\">19&nbsp;days</bdi> دي بس الـ path <bdi dir=\"ltr\">A⁠-⁠C⁠-⁠F</bdi> (<bdi dir=\"ltr\">5+3+11</bdi>)؛ مدة المشروع هي أطول path، يعني:<span class=\"ltr\">A-D-G-H = 5+8+1+12 = 26 days</span>",
     "الـ <bdi dir=\"ltr\">22&nbsp;days</bdi> دي الـ path <bdi dir=\"ltr\">A⁠-⁠C⁠-⁠E⁠-⁠H</bdi> (<bdi dir=\"ltr\">5+3+2+12</bdi>)، بس المشروع بياخد مدة أطول path، يعني:<span class=\"ltr\">A-D-G-H = 26 days</span>",
     "صح. مدة المشروع هي طول أطول path:<span class=\"ltr\">A-D-G-H = 5 + 8 + 1 + 12 = 26 days</span>والباقي:<span class=\"ltr\">A-C-E-H 22, B-E-H 20, A-C-F 19</span>(من الـ L6، الـ Forward pass).",
     "مفيش path بيوصل 30: أطول واحد هو <bdi dir=\"ltr\">A⁠-⁠D⁠-⁠G⁠-⁠H</bdi> بـ <bdi dir=\"ltr\">26&nbsp;days</bdi>، ودي مدة المشروع."
    ],
    [
     "الـ A-C-F طولها 19 days بس؛ الـ C عندها 4 days slack والـ F عندها 7 days slack، يعني مش critical.",
     "الـ <bdi dir=\"ltr\">B⁠-⁠E⁠-⁠H</bdi> طولها <bdi dir=\"ltr\">6+2+12&nbsp;=&nbsp;20&nbsp;days</bdi> بس؛ الـ B عندها <bdi dir=\"ltr\">6&nbsp;days</bdi> slack والـ E عندها <bdi dir=\"ltr\">4&nbsp;days</bdi>، يعني مش critical.",
     "صح. الـ A وD وG وH الـ slack بتاعهم صفر (<bdi dir=\"ltr\">ES&nbsp;=&nbsp;LS</bdi>) وبيكوّنوا أطول path:<span class=\"ltr\">5 + 8 + 1 + 12 = 26 days</span>(من الـ L6، الـ critical activities الـ slack بتاعها 0).",
     "الـ A-C-E-H طولها 22 days، أقل من 26 بـ 4؛ الـ C والـ E كل واحدة عندها 4 days slack، فده مش الـ critical path."
    ],
    [
     "صح. الـ F حساباتها:<span class=\"ltr\">ES = max(EF B 6, EF C 8) = 8</span><span class=\"ltr\">EF = 19</span>وهي آخر حاجة في المشروع، فـ:<span class=\"ltr\">LF = 26, slack = 26 − 19 = 7</span>(من الـ L6، الـ Total slack):<span class=\"ltr\">Total slack = LF − EF</span>",
     "الـ slack الصفر ده للـ critical activities (الـ A والـ D والـ G والـ H)؛ الـ F بتخلص عند 19 بس ممكن تخلص لحد 26، فعندها 7.",
     "الـ 4 دي slack الـ C (أو الـ E)، اللي الـ paths بتاعتها <bdi dir=\"ltr\">22&nbsp;days</bdi>؛ والـ F عندها:<span class=\"ltr\">LF 26 − EF 19 = 7</span>",
     "الـ 6 دي slack الـ B (<bdi dir=\"ltr\">LF&nbsp;12&nbsp;−&nbsp;EF&nbsp;6</bdi>)؛ و slack الـ F هو:<span class=\"ltr\">LF 26 − EF 19 = 7</span>"
    ],
    [
     "في الـ earliest-start chart أقصى حاجة تلات bars بيتداخلوا (الـ B والـ C والـ D يوم 5؛ والـ D والـ E والـ F أيام <bdi dir=\"ltr\">8⁠–⁠9</bdi>)، عمرهم ما بقوا أربعة.",
     "الـ 8 ده بس عدد الـ activities؛ حجم الـ team هو أكبر عدد bars شغّالين في نفس الوقت، وهو 3.",
     "ده ممكن بس بعد ما تزحزح B و C و E و F جوه الـ slack بتاعهم (resource levelling).",
     "صح. يوم <bdi dir=\"ltr\">5⁠-⁠6</bdi> (الـ B والـ C والـ D) وأيام <bdi dir=\"ltr\">8⁠-⁠10</bdi> (الـ D والـ E والـ F)."
    ],
    [
     "الـ 39 كده انت جمعت كل الـ activities، بس الـ B والـ C شغّالين بالتوازي والـ E جنب F-G؛ المدة هي أطول path، يعني 26 weeks.",
     "صح (والـ B ممكن تبقى C):<span class=\"ltr\">A-B-D-F-G-H = 5+6+2+5+3+5 = 26</span>",
     "الـ 25 دي الـ path اللي معدّي على E:<span class=\"ltr\">A-B-D-E-H = 5+6+2+7+5</span>وأطول path بيعدّي على F وG، وطوله <bdi dir=\"ltr\">26&nbsp;weeks</bdi>.",
     "الـ 22 كانت هتطلع لو الـ H مدتها <bdi dir=\"ltr\">1&nbsp;week</bdi> (نسخة المحاضرة)؛ الامتحان ده فيه <bdi dir=\"ltr\">H&nbsp;=&nbsp;5</bdi>، فتطلع <bdi dir=\"ltr\">26&nbsp;weeks</bdi>."
    ],
    [
     "صح. الـ E حساباتها:<span class=\"ltr\">ES 13, EF 20, LF 21 → 1 week slack</span>",
     "الـ G على أطول path، وطوله <bdi dir=\"ltr\">26&nbsp;weeks</bdi>، وهو:<span class=\"ltr\">A-B/C-D-F-G-H</span>والـ <bdi dir=\"ltr\">ES&nbsp;=&nbsp;LS&nbsp;=&nbsp;18</bdi>، يعني critical.",
     "الـ B والـ C الاتنين critical (بالتوازي وبنفس الطول).",
     "الـ D موجودة على كل الـ paths (بعد B وC وقبل E وF)، والـ <bdi dir=\"ltr\">ES&nbsp;=&nbsp;LS&nbsp;=&nbsp;11</bdi>، يعني critical."
    ],
    [
     "الـ 8 ده عدد الـ activities؛ طريقة المحاضرة بتاخد أكبر عدد bars شغّالين مع بعض، وهو 2.",
     "الـ B والـ C بيتداخلوا، فشخص واحد مش كفاية.",
     "صح. أقصى حاجة اتنين أنشطة بيتداخلوا (B و C؛ وبعدين E مع F أو G).",
     "في الـ earliest-start Gantt chart عمر ما تلات activities اتداخلوا (B‖C، وبعدين E‖F وE‖G)، فـ 2 أشخاص كفاية."
    ],
    [
     "الـ path ده:<span class=\"ltr\">A-B-E-G-H-J = 2+3+6+5+4+2 = 22</span>أقصر بـ week من <bdi dir=\"ltr\">A⁠-⁠B⁠-⁠D⁠-⁠G⁠-⁠H⁠-⁠J</bdi> (<bdi dir=\"ltr\">D&nbsp;=&nbsp;7</bdi> قصاد <bdi dir=\"ltr\">E&nbsp;=&nbsp;6</bdi>)، فالـ E عندها <bdi dir=\"ltr\">1&nbsp;week</bdi> slack.",
     "صح. أطول path هو:<span class=\"ltr\">A-B-D-G-H-J = 2 + 3 + 7 + 5 + 4 + 2</span><span class=\"ltr\">= 23 weeks</span>والـ activities دي الـ slack بتاعها صفر (من الـ L6، الـ Forward pass).",
     "الـ path ده من أقصر الـ paths:<span class=\"ltr\">A-B-I-J = 2+3+8+2 = 15</span>والـ critical path هو الأطول، <bdi dir=\"ltr\">23&nbsp;weeks</bdi>.",
     "الـ path ده:<span class=\"ltr\">A-B-D-F-H-J = 2+3+7+1+4+2 = 19</span>أقصر من <bdi dir=\"ltr\">A⁠-⁠B⁠-⁠D⁠-⁠G⁠-⁠H⁠-⁠J&nbsp;=&nbsp;23</bdi> (<bdi dir=\"ltr\">F&nbsp;=&nbsp;1</bdi> قصاد <bdi dir=\"ltr\">G&nbsp;=&nbsp;5</bdi>)، يعني مش critical."
    ],
    [
     "الـ <bdi dir=\"ltr\">A⁠-⁠B⁠-⁠D⁠-⁠F⁠-⁠H⁠-⁠J</bdi> طوله <bdi dir=\"ltr\">19&nbsp;weeks</bdi>، بس فيه اتنين paths أقصر، الـ <bdi dir=\"ltr\">A⁠-⁠B⁠-⁠I⁠-⁠J</bdi> والـ <bdi dir=\"ltr\">A⁠-⁠B⁠-⁠C⁠-⁠F⁠-⁠H⁠-⁠J</bdi>، الاتنين 15.",
     "الـ 23 weeks دي أطول path (الـ critical) ‏A-B-D-G-H-J، عكس المطلوب.",
     "الـ path لازم يمشي من البداية لحد الـ activity الأخيرة J.",
     "صح:<span class=\"ltr\">A-B-I-J = 2+3+8+2 = 15</span><span class=\"ltr\">A-B-C-F-H-J = 2+3+3+1+4+2 = 15</span>وكل الـ paths التانية من البداية للنهاية أطول (من الـ L6، الـ network paths)."
    ],
    [
     "الـ 4 دي slack الـ F ‏(LF <bdi dir=\"ltr\">17 − EF</bdi> 13)؛ الـ I عندها ES 5 وEF 13 وLF 21، فالـ slack بتاعها 8.",
     "الـ I مش على الـ critical path ‏A-B-D-G-H-J؛ ممكن تخلص لحد week 21 بس بتخلص عند 13، يعني عندها slack.",
     "الـ 1 ده slack الـ E (<bdi dir=\"ltr\">LF&nbsp;12&nbsp;−&nbsp;EF&nbsp;11</bdi>)؛ و slack الـ I هو:<span class=\"ltr\">LF 21 − EF 13 = 8</span>",
     "صح. الـ I حساباتها:<span class=\"ltr\">ES = EF(B) = 5, EF = 13</span>والـ successor بتاعها J عندها <bdi dir=\"ltr\">LS&nbsp;=&nbsp;21</bdi>، فـ:<span class=\"ltr\">LF = 21, slack = 21 − 13 = 8 weeks</span>(من الـ L6، الـ Backward pass)."
    ],
    [
     "الـ 3 ده أحسن رقم ممكن بعد الـ levelling، مش العدد في الـ earliest-start.",
     "صح. لو كل activity بدأت في أبدر وقت ليها، الـ C والـ D والـ E والـ I كلهم شغّالين في weeks <bdi dir=\"ltr\">5⁠–⁠8</bdi> كده:<span class=\"ltr\">C (5–8), D (5–12), E (5–11), I (5–13)</span>يعني أربع bars مع بعض (من الـ L6، الـ team هو أكبر عدد).",
     "الـ 10 ده عدد الـ activities ‏(A لحد J)؛ السؤال عايز أكبر عدد شغّال في نفس الوقت، وهو 4.",
     "في weeks <bdi dir=\"ltr\">5⁠–⁠8</bdi> فيه أربع bars مع بعض (الـ C والـ D والـ E والـ I) في الـ earliest-start chart، فالـ peak هو 4 مش 2."
    ],
    [
     "صح. لو كتبت عدد الـ bars الشغّالة تحت كل يوم في الـ earliest-start Gantt chart، أكبر رقم هيبقى 4 (يوم <bdi dir=\"ltr\">20⁠–⁠21</bdi> فيه الـ F والـ G والـ I والـ K)، ودي إجابة الدكتور (من الـ L6، مثال الـ 13 activity).",
     "الاتنين ممكن توصلهم بس بالـ levelling (مش طريقة المحاضرة).",
     "الـ 13 ده عدد الـ activities ‏(A لحد M)؛ الـ team هو أكبر عدد bars متوازية، وهو 4.",
     "صف العدّ في الـ earliest-start بيوصل 4 عند يوم <bdi dir=\"ltr\">20⁠–⁠21</bdi> (F وG وI وK شغّالين مع بعض)، فـ 3 أشخاص قليلين بطريقة المحاضرة."
    ],
    [
     "الـ activity الأطول ماينفعش تقصّر المشروع.",
     "الـ 6 عندها 4 أسابيع slack بس؛ والزيادة 5.",
     "صح. الـ activity 6 كان عندها <bdi dir=\"ltr\">4&nbsp;weeks</bdi> slack؛ والـ <bdi dir=\"ltr\">+5&nbsp;weeks</bdi> بتعدّيها بـ 1. الـ path:<span class=\"ltr\">1-2-4-6-8-10 = 2+3+7+6+4+2 = 24 > 23</span>فالمشروع ياخد <bdi dir=\"ltr\">24&nbsp;weeks</bdi> (من الـ L6، الـ Problem 2).",
     "لو زوّدت الـ <bdi dir=\"ltr\">5&nbsp;weeks</bdi> كلهم كده انت تجاهلت الـ <bdi dir=\"ltr\">4&nbsp;weeks</bdi> slack بتوع الـ activity 6، اللي بيمتصّوا معظم الزيادة؛ والتأخير:<span class=\"ltr\">5 − 4 = 1 week</span>"
    ],
    [
     "الـ 41 ده بس البسط <bdi dir=\"ltr\">4&nbsp;+&nbsp;4×7&nbsp;+&nbsp;9</bdi>؛ لما تقسمه على 6 يطلع:<span class=\"ltr\">41/6 = 6.83</span>",
     "الـ <bdi dir=\"ltr\">6.67&nbsp;=&nbsp;(4+7+9)/3</bdi> ده متوسط عادي؛ الـ PERT بيدّي الـ r وزن 4 ويقسم على 6:<span class=\"ltr\">(4 + 28 + 9)/6 = 6.83</span>",
     "صح:<span class=\"ltr\">ET = (o + 4r + p)/6</span><span class=\"ltr\">= (4 + 4×7 + 9)/6 = 41/6 = 6.83</span>(من الـ L6، الـ Problem 1، الـ activity J).",
     "الـ 7 ده الـ realistic estimate، يعني الـ r، مش الـ expected time:<span class=\"ltr\">(4 + 28 + 9)/6 = 41/6 = 6.83</span>"
    ],
    [
     "صح. الـ dummy activity ده arc متقطّع ما بيستهلكش وقت ولا resources؛ بيدّي الـ activities المتوازية end nodes مختلفة وبيحافظ على الـ precedence صح (L6, rule 2).",
     "الـ dummy بس بيعبّر عن علاقة precedence؛ بيبقى على الـ critical path بس لو الـ activities اللي بيربطها critical.",
     "الـ dummy ما بيستهلكش وقت ولا resources؛ ده arc متقطّع للـ precedence، مش milestone ليه resources.",
     "الـ dummy وقته صفر؛ ده بس arc متقطّع بيظبط الـ end nodes والـ precedence."
    ],
    [
     "الـ CPM والـ PERT الاتنين network methods مبنيين على precedence relationships؛ الفرق في طريقة التعامل مع المدد.",
     "أي method فيهم ممكن يبقى فيها أكتر من critical path؛ الفرق في المحاضرة هو مدد deterministic ‏(CPM) قصاد probabilistic ‏(PERT).",
     "المدد الـ probabilistic (تلات تقديرات o وr وp) دي افتراض الـ PERT؛ الـ CPM بيفترض مدد deterministic.",
     "صح. المحاضرة بتقول إن الـ CPM بيفترض activity durations ‏deterministic والـ PERT بيفترض durations ‏probabilistic؛ والاتنين اتطوروا كل واحد لوحده (L6)."
    ]
   ],
   "extra": [
    [
     "الـ <bdi dir=\"ltr\">A⁠-⁠B⁠-⁠D</bdi> طولها <bdi dir=\"ltr\">3+4+5&nbsp;=&nbsp;12</bdi> بس ونسيت الـ activity الأخيرة E؛ وأطول path كامل هو <bdi dir=\"ltr\">A⁠-⁠B⁠-⁠D⁠-⁠E</bdi> وطوله 13.",
     "الـ path ده هو الأقصر (<bdi dir=\"ltr\">C&nbsp;=&nbsp;2&nbsp;<&nbsp;B&nbsp;=&nbsp;4</bdi>)، وهو:<span class=\"ltr\">A-C-D-E = 3+2+5+1 = 11</span>والمدة هي أطول path، يعني 13.",
     "صح. أطول path هو:<span class=\"ltr\">A-B-D-E = 3 + 4 + 5 + 1 = 13</span>والـ <bdi dir=\"ltr\">A⁠-⁠C⁠-⁠D⁠-⁠E</bdi> طولها 11 بس، فالـ C عندها slack والـ B هي الـ critical (من الـ L6، الـ Forward pass).",
     "الـ B والـ C بيمشوا بالتوازي؛ ماينفعش تجمعهم الاتنين."
    ],
    [
     "الـ slack الصفر ده للـ critical activities؛ الـ C بتخلص عند 5 بس الـ D ماتقدرش تبدأ قبل ما الـ B تخلص عند 7، فالـ C عندها 2 وحدة فاضيين.",
     "صح. الـ C حساباتها <bdi dir=\"ltr\">ES&nbsp;3,&nbsp;EF&nbsp;5</bdi>؛ والـ D بتبدأ عند <bdi dir=\"ltr\">LS&nbsp;=&nbsp;7</bdi>، فـ:<span class=\"ltr\">LF(C) = 7, slack = 7 − 5 = 2</span>(من الـ L6، الـ Total slack):<span class=\"ltr\">Total slack = LF − EF</span>",
     "الـ 4 دي مدة الـ B؛ و slack الـ C هو:<span class=\"ltr\">LF 7 − EF 5 = 2</span>",
     "الـ 7 ده الـ latest finish (الـ LF) بتاع C، مش الـ slack؛ والـ slack:<span class=\"ltr\">slack = LF − EF = 7 − 5 = 2</span>"
    ],
    [
     "الـ S بتيجي بعد Q وR الاتنين وموجودة على كل الـ paths، ومنهم أطول واحد <bdi dir=\"ltr\">P⁠-⁠R⁠-⁠S⁠-⁠T&nbsp;=&nbsp;14</bdi>، يعني critical.",
     "الـ T هي آخر activity في كل الـ paths، ومنهم الـ critical path اللي طوله 14، فالـ slack بتاعها صفر.",
     "الـ P على أطول path:<span class=\"ltr\">P-R-S-T = 4+3+5+2 = 14</span>فالـ slack بتاعها صفر وهي critical.",
     "صح. الـ <bdi dir=\"ltr\">Q⁠-⁠S⁠-⁠T&nbsp;=&nbsp;13</bdi>، فالـ Q عندها وحدة slack واحدة."
    ],
    [
     "الـ Free slack هو أقل ES للـ successors ناقص الـ EF:<span class=\"ltr\">Free slack = ES(D) − EF(B)</span><span class=\"ltr\">ES(D) = max(2, 5) = 5</span>فيطلع <bdi dir=\"ltr\">5&nbsp;−&nbsp;5&nbsp;=&nbsp;0</bdi>، مش 2.",
     "الـ 5 دي مدة الـ B (وهي الـ EF بتاعها كمان)؛ والـ free slack:<span class=\"ltr\">ES(D) − EF(B) = 5 − 5 = 0</span>",
     "الـ 4 ده الـ total slack بتاع B (التأخير قبل ما نهاية المشروع تتزحزح)؛ الـ free slack بيسمح بس بتأخير من غير ما الـ early start بتاع D يتحرك:<span class=\"ltr\">5 − 5 = 0</span>",
     "صح. B بتخلص عند 5 والـ successor بتاعها D أبدر وقت يبدأ فيه 5، فلو B اتأخرت الـ early start بتاع D هيتأخر."
    ],
    [
     "الـ Rule 1 (arc واحد لكل activity) لسه متحققة؛ الغلطة الحقيقية في الـ precedence، لأن الـ E هتضطر تستنى الـ A.",
     "صح. لو عملت node واحدة مشتركة، الـ E هتبقى بعد A كمان مش بعد B بس؛ الـ B لازم تخلص عند node خاصة بيها، مع dummy من end node بتاعة B لـ start node بتاعة C (L6, rule 3 example).",
     "الـ Dummies مسموحة: ما بتكلّفش وقت ولا resources، والحالة دي بالظبط هي مثال المحاضرة للوقت اللي محتاج فيه dummy.",
     "الـ C هتفضل بعد A وB؛ المشكلة إن الـ E، اللي محتاجة B بس، هتستنى A كمان غلط."
    ],
    [
     "صح:<span class=\"ltr\">(2 + 20 + 14)/6 = 6</span><span class=\"ltr\">((14-2)/6)² = 2² = 4</span>",
     "الـ <bdi dir=\"ltr\">7&nbsp;=&nbsp;(2+5+14)/3</bdi> ده متوسط عادي، مش:<span class=\"ltr\">(o + 4m + p)/6 = 6</span>والـ <bdi dir=\"ltr\">2&nbsp;=&nbsp;(14−2)/6</bdi> ده الـ σ، ومربعه هو الـ variance اللي هي 4.",
     "الـ 5 ده الـ most likely time (الـ m)، مش الـ expected time (<bdi dir=\"ltr\">36/6&nbsp;=&nbsp;6</bdi>)؛ والـ 12 ده <bdi dir=\"ltr\">p&nbsp;−&nbsp;o</bdi>، ولازم يتقسم على 6 ويتربّع، فيطلع 4.",
     "الـ 2 ده الـ standard deviation؛ والـ variance هو 4."
    ],
    [
     "إنك تخلص في الـ expected time فرصته 50% بس:<span class=\"ltr\">Z = (22 − 22)/1.6 = 0, Φ(0) = 0.5</span>",
     "الـ expected time هو نص التوزيع.",
     "صح:<span class=\"ltr\">Z = (target − expected)/σ</span><span class=\"ltr\">= (22 − 22)/1.6 = 0, Φ(0) = 0.5</span>يعني الـ expected time هو نص الـ normal distribution بالظبط (من الـ L6، الـ textbook extension).",
     "الـ 89% دي احتمال <bdi dir=\"ltr\">P(T&nbsp;≤&nbsp;24)</bdi>، بالحساب ده:<span class=\"ltr\">Z = (24 − 22)/1.6 = 1.25, Φ(1.25) ≈ 0.894</span>ولـ <bdi dir=\"ltr\">22&nbsp;weeks</bdi> الـ <bdi dir=\"ltr\">Z&nbsp;=&nbsp;0</bdi>، يعني 50%."
    ],
    [
     "شخص واحد مايقدرش يغطي الفترات اللي فيها 3 أو 4 أنشطة.",
     "اتنين أشخاص مايقدروش يغطّوا الفترات اللي فيها 3 أو 4 activities شغّالين مع بعض؛ الـ team هو أكبر عدد، 4.",
     "صح. بطريقة المحاضرة أقل team هو أكبر عدد bars شغّالين مع بعض في الـ earliest-start Gantt chart:<span class=\"ltr\">max(1,1,3,3,2,4,4,2,1) = 4</span>(من الـ L6).",
     "الـ 21 ده مجموع صف العدّ (إجمالي الـ person-periods)؛ الـ team هو أكبر رقم لوحده، 4."
    ],
    [
     "صح:<span class=\"ltr\">5 - 3 = 2</span>زي مسألة 2 (الـ activity 6: زيادة 5 أسابيع، و slack 4، فالتأخير أسبوع).",
     "الـ <bdi dir=\"ltr\">3&nbsp;weeks</bdi> slack بيمتصّوا جزء من التأخير، فالنهاية بتتحرك بس:<span class=\"ltr\">5 − 3 = 2 weeks</span>",
     "الـ <bdi dir=\"ltr\">8&nbsp;=&nbsp;5&nbsp;+&nbsp;3</bdi> كده انت جمعت الـ slack على التأخير؛ الـ slack بيمتص التأخير، فالنهاية بتتحرك:<span class=\"ltr\">5 − 3 = 2 weeks</span>",
     "التأخير 5 weeks أكبر من الـ 3 weeks slack، فنهاية المشروع بتتأخر 2 weeks."
    ],
    [
     "الـ CPM والـ PERT الاتنين مبنيين على networks من precedence relationships؛ ولا واحد فيهم بيتجاهل الـ precedence.",
     "الـ loop بيرجع من الـ time schedule للـ network.",
     "الـ PERT هو اللي بيستخدم تلات تقديرات؛ الـ CPM بيستخدم وقت واحد deterministic.",
     "صح. الفرق الأساسي في المحاضرة: الـ PERT بيفترض activity durations ‏probabilistic (تلات تقديرات)، والـ CPM بيفترض durations ‏deterministic (L6, CPM and PERT)."
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
       "ans": "<b>الجزء (a): الـ Network (activity on arrow، والـ event times بين القوسين)</b><pre>S(0) --A=5--> 1(5)\nS(0) --B=6--> 2(8)\n1(5) --C=3--> 2(8)\n1(5) --D=8--> 3(13) --G=1--> 4(14)\n2(8) --E=2--> 4(14)\n4(14) --H=12--> End(26)\n2(8)  --F=11--> End(26)</pre>مش محتاجين dummy: الـ E والـ F الاتنين بيبدأوا من node 2 (بعد ما B و C يخلصوا)، والـ H بتبدأ من node 4 (بعد ما G و E يخلصوا).<br><br><b>الـ Forward pass والـ backward pass</b><table><tr><th dir=\"ltr\">Task</th><th dir=\"ltr\">Dur</th><th dir=\"ltr\">ES</th><th dir=\"ltr\">EF</th><th dir=\"ltr\">LS</th><th dir=\"ltr\">LF</th><th dir=\"ltr\">Slack</th></tr><tr><td dir=\"ltr\">A</td><td>5</td><td>0</td><td>5</td><td>0</td><td>5</td><td>0</td></tr><tr><td dir=\"ltr\">B</td><td>6</td><td>0</td><td>6</td><td>6</td><td>12</td><td>6</td></tr><tr><td dir=\"ltr\">C</td><td>3</td><td>5</td><td>8</td><td>9</td><td>12</td><td>4</td></tr><tr><td dir=\"ltr\">D</td><td>8</td><td>5</td><td>13</td><td>5</td><td>13</td><td>0</td></tr><tr><td dir=\"ltr\">E</td><td>2</td><td>8</td><td>10</td><td>12</td><td>14</td><td>4</td></tr><tr><td dir=\"ltr\">F</td><td>11</td><td>8</td><td>19</td><td>15</td><td>26</td><td>7</td></tr><tr><td dir=\"ltr\">G</td><td>1</td><td>13</td><td>14</td><td>13</td><td>14</td><td>0</td></tr><tr><td dir=\"ltr\">H</td><td>12</td><td>14</td><td>26</td><td>14</td><td>26</td><td>0</td></tr></table>الـ Paths:<span class=\"ltr\">A-D-G-H = 26 (critical)</span><span class=\"ltr\">A-C-E-H = 22, B-E-H = 20</span><span class=\"ltr\">A-C-F = 19, B-F = 17</span><b>المشروع مدته 26 يوم، والـ critical path هو:</b><span class=\"ltr\"><b>A → D → G → H</b></span><br><b>الجزء (b): الـ Gantt chart</b>، والرموز:<span class=\"ltr\">= critical, # non-critical, . slack</span><pre>     0    5    10   15   20   25\nA    =====\nB    ######......\nC         ###....\nD         ========\nE            ##....\nF            ###########.......\nG                 =\nH                  ============\nteam 22222322332222222221111111</pre><b>الجزء (c): الـ Team.</b> لما كل activity تبقى عند الـ earliest start بتاعها، الـ count row بيوصل أقصاه <b>3</b> (يوم <bdi dir=\"ltr\">5⁠-⁠6</bdi> فيه الـ B والـ C والـ D؛ وأيام <bdi dir=\"ltr\">8⁠-⁠10</bdi> فيها الـ D والـ E والـ F)، يبقى <b>الـ max team هو 3</b>. وده كمان الـ \"minimum team\" بطريقة المحاضرة. ولو استخدمت الـ slack تقدر تنزّل الـ peak لـ <b>2</b> من غير ما تأخر الـ 26 يوم، بالمواعيد دي:<span class=\"ltr\">A 0-5, B 0-6, C 6-9, D 5-13</span><span class=\"ltr\">E 9-11, F 11-22, G 13-14, H 14-26</span>يبقى <b>الـ min team هو 2</b>. (ولو السؤال قصده أصغر رقم في الـ count row، يبقى 1، في أيام <bdi dir=\"ltr\">19⁠-⁠26</bdi>.)<br><br><b>الجزء (d): الأنشطة اللي ليها slack (total slack) بالأيام:</b><span class=\"ltr\">B = 6, C = 4, E = 4, F = 7</span>والـ Free slack:<span class=\"ltr\">B 2, C 0, E 4, F 7</span>والـ A و D و G و H مالهمش slack."
      }
     ]
    },
    {
     "items": [
      {
       "ans": "إنك تمشي على <b>systems methodology</b>، وتطبّق <b>techniques</b>، وتستخدم <b>tools</b> مناسبة، ودول (1) <b>بيضمنوا الجودة وإن السيستم اللي بيتبني مناسب (quality and appropriateness)</b>، و(2) <b>بيدّوا structure</b> لعملية الـ systems development، لأنهم اتجرّبوا واتظبطوا قبل كده من ناس تانية. (L2)"
      },
      {
       "ans": "الـ <bdi dir=\"ltr\">KDSI&nbsp;=&nbsp;24</bdi> (قرّب كل نتيجة لأقرب رقم صحيح، زي ما المحاضرة بتعمل).<br>الجزء (a)، الـ Effort:<span class=\"ltr\">Effort = 3.0 × 24^1.12 = 3.0 × 35.14</span><span class=\"ltr\">= 105.4 ≈ <b>105 man-months</b></span>الجزء (b)، الـ Duration بالشهور:<span class=\"ltr\">Duration = 2.5 × 105^0.35 = 2.5 × 5.098</span><span class=\"ltr\">= 12.7 ≈ <b>13</b></span>الجزء (c)، الـ Average staffing:<span class=\"ltr\">105 / 13 = 8.08 ≈ <b>8 FSP</b></span>الجزء (d)، الـ Productivity:<span class=\"ltr\">24,000 / 105 = 228.6 ≈ <b>229 DSI/MM</b></span>الجزء (e)، التكلفة:<span class=\"ltr\">8 FSP × 13 months × 5000 = <b>EP 520,000</b></span>وبالشكل المظبوط (الـ E × المرتب):<span class=\"ltr\">105 × 5000 = EP 525,000</span>الجزء (f)، نص الـ staff، والـ duration بالشهور:<span class=\"ltr\">8/2 = 4 FSP → duration = 105 / 4</span><span class=\"ltr\">= 26.25 ≈ <b>26</b></span>الجزء (g)، الـ 75% من 13 شهر، والـ staffing:<span class=\"ltr\">0.75 × 13 = 9.75 months</span><span class=\"ltr\">staffing = 105 / 9.75 = 10.8 ≈ <b>11 FSP</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ <b>DFD</b>: صورة لحركة الداتا بين الـ external entities والـ processes والـ data stores جوه السيستم (logical، ومستقل عن التكنولوجيا). الـ <b>DFD balancing</b>: الحفاظ على الـ inputs والـ outputs بتوع الـ process لما يتعمله decompose لمستوى أقل: عدد الـ inputs والـ outputs في الـ child diagram لازم يساوي اللي في الـ parent process. مثال: context process ليه input واحد و output واحد والـ <bdi dir=\"ltr\">Level-0</bdi> بتاعه فيه 2 inputs يبقى unbalanced. (L4)"
      },
      {
       "ans": "الـ SDLC هو الـ methodology التقليدية لتطوير الـ IS وعمل maintain ليها واستبدالها.<br>الـ <b>Planning</b>: احتياجات المنظمة كلها من الـ IS بتتحدد وتتحلل وتترتب حسب الأولوية.<br>الـ <b>Analysis</b>: الـ requirements بتتجمع من الـ users وتتدرس وتتنظم ويتشال التكرار منها؛ والـ output هو الحل المقترح (recommended solution).<br>الـ <b>Design</b>: الحل المقترح بيتحوّل لـ logical specifications (مستقلة عن الـ platform) وبعدين physical specifications (تفاصيل technology-specific).<br>الـ <b>Implementation</b>: الـ IS بيتعمله code و test و install و support.<br>الـ <b>Maintenance</b>: السيستم بيتصلح ويتحسن بشكل منظم (systematically). (L2)"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ Context diagram</b><br>1) فيه <b>اتنين processes</b> (Education System 1 و 2). الـ context diagram بيبقى فيه <b>process واحد بس</b> رقمه 0. والـ DF2 اللي بينهم ده internal ومايظهرش.<br>2) فيه <b>data store (DS2)</b>. الـ context diagram <b>مافيهوش data stores</b>، وكمان الـ flow الطالع من DS2 مالوش label.<br>3) <b>اتجاه الـ DF1</b>: في الـ context الـ DF1 رايح لـ E1 (output)، بس في الـ Level 0 الـ DF1 جاي من E1 لـ P1 (input). المستويات <b>مش balanced</b>.<br>4) <b>الـ flows بتوع E2 مش balanced</b>. الـ context بيبعت DF3 و DF4 لـ E2. في الـ Level 0، الـ DF3 بيروح لـ DS2 (مش لـ E2)، وفيه DF4 جاي من E2 لـ P2.<br><b>الـ Level 0</b><br>5) <b>الـ P2 ليه inputs بس</b> (الـ DF2 والـ DF6 والـ DF4) ومالوش output، يعني black hole.<br>6) <b>الـ P3 ليه outputs بس</b> (الـ DF5 والـ DF4) ومالوش input، يعني miracle.<br>7) الـ label <b>DF4 مستخدم لـ flows مختلفين</b>:<span class=\"ltr\">E2 → P2</span><span class=\"ltr\">P3 → E2</span>8) <b>الـ DS2 مرسوم مرتين</b>. الـ DS2 اللي تحت بيستقبل بس (الـ DF3 والـ DF5) ومحدش بيقرا منه. والـ DS2 اللي فوق بيدّي DF6 بس ومحدش بيكتب فيه. المفروض يبقوا store واحد فيه الاتنين، أو التاني يتغير اسمه لـ DS1.<br><b>الـ Level 1 (decomposition للـ P1)</b><br>9) <b>فيه اتنين processes رقمهم P1.1</b>. التاني المفروض يبقى <b>P1.3</b>.<br>10) الـ <b>forked flow</b> الطالع من P1.1 عليه اتنين labels (DF7 و DF2). الـ fork لازم يشيل <b>نفس الداتا بالظبط</b>.<br>11) <b>مش balanced مع P1</b>: الـ P1 بيكتب DF3 في DS2، بس الـ Level 1 بيكتب <b>DF6 في DS1</b>، وده store مش موجود في الـ Level 0. المفروض P1.2 يكتب DF3 في DS2.<br>12) الـ output بتاع P1 لـ P2 هو DF2، بس الـ Level 1 بيطلّع <b>DF3</b> من P1.4. المفروض يبقى <b>DF2</b>.<br><b>الـ Level 2 (decomposition للـ P1.4)</b><br>13) <b>الـ P1.5.1 مترقم غلط</b>: مفيش P1.5. المفروض يبقى <b>P1.4.1</b>.<br>14) <b>الـ DF11 براسين</b> بين اتنين processes. الـ flows بين الـ processes بتمشي في اتجاه واحد؛ الـ flow في الاتجاهين مسموح بس بين process و data store، وبيترسم سهمين.<br>15) <b>الـ P1.4.3 مالوش output</b> (DF11 و DF12 و DF2 كلهم داخلين). الـ DF2 لازم <b>يطلع</b> من P1.4.3 عشان يوازن الـ output بتاع P1.4."
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ <b>Functional decomposition</b> هي process iterative بتكسّر فيها وصف السيستم لتفاصيل أدق وأدق. الـ processes الـ high-level بتتوصف بـ sub-processes في مستوى أقل، و DFD لكل مستوى.<br><b>نقف لما</b>: (1) كل process يتقلل لـ decision واحد أو calculation واحد أو database operation واحدة؛ (2) كل data store يمثّل داتا عن entity واحد؛ (3) الـ user مش عايز يشوف تفاصيل أكتر؛ (4) مفيش data flow محتاج يتقسم أكتر عشان يوضح إن الداتا بتتعامل بطرق مختلفة؛ (5) كل business form أو transaction، وكل online display و report يظهر كـ data flow واحد؛ (6) يبقى فيه process منفصل لكل اختيار في كل الـ menu options اللي في أقل مستوى. (L4)"
      },
      {
       "ans": "الـ Project management هو controlled process للـ <b>initiating والـ planning والـ executing والـ closing down</b> للمشروع.<br><b>1. الـ Initiating</b>: تقييم الحجم والنطاق والتعقيد، وحط الـ procedures. الأنشطة: الـ initiation team، العلاقة مع الـ customer، الـ initiation plan، الـ management procedures، الـ PM environment والـ project workbook. والـ project charter بيعلن المشروع.<br><b>2. الـ Planning</b>: تحديد أنشطة واضحة ومنفصلة والشغل المطلوب لكل واحد. بيغطي الـ scope والبدائل والـ feasibility، الـ WBS، الـ resource plan (COCOMO)، الـ schedule، الـ communication plan، الـ standards، الـ risk، الـ budget، الـ statement of work والـ baseline project plan.<br><b>3. الـ Executing</b>: تنفيذ الخطط. تنفيذ الـ BPP، متابعة التقدم مقارنةً بيه، إدارة التغييرات، الحفاظ على الـ workbook وتوصيل حالة المشروع.<br><b>4. الـ Closing down</b>: إنهاء المشروع. قفل المشروع، عمل post-project reviews وقفل عقد الـ customer. (L3)"
      },
      {
       "ans": "الـ CASE tools هي software بيدّي <b>automated support لجزء من الـ SDLC</b>. مبنية حوالين <b>repository</b> فيه كل الـ metadata (أسامي الداتا، الـ formats، الاستخدامات، الأماكن) والـ system specifications. بتعمل automate للمهام الروتينية وتقدر تطلّع code و DDL. الأنواع: الـ diagramming tools، والـ computer display and report generators، والـ analysis tools، والـ central repository، والـ documentation generators والـ code generators. والـ repository هو أهم جزء لأنه بيدّي الـ team كله single view للمشروع. (L2)"
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ flow من data store لـ process معناه retrieve أو use: الـ process بيقرا data موجودة at rest في الـ store (L4, Update vs retrieve).",
       "ow": [
        "الـ Update ده الاتجاه العكسي: flow من process داخل على data store ‏(insert أو delete أو change).",
        null,
        "الـ Slack time هو الوقت اللي الـ activity ممكن تتأخره من غير ما المشروع يتأخر (L3)، مش flow في الـ DFD.",
        "الـ Logical design بيوصف الـ functional features بعيد عن أي platform ‏(L2)، مش flow في الـ DFD."
       ]
      },
      {
       "why": "السهم من الـ process للـ store معناه update (insert أو delete أو change). (L4)",
       "ow": [
        "الـ Retrieve ده الاتجاه العكسي: flow من data store داخل على process، والـ process بيقرا الـ data.",
        "الـ DFDs دي الـ diagrams كلها اللي بتمثّل الـ requirements، مش معنى flow واحد من process لـ store.",
        null,
        "الـ network diagram بيوضّح الـ project tasks والعلاقات بينها (L3)، مش flow في الـ DFD."
       ]
      },
      {
       "why": "الـ DFDs بتمثّل المعلومات اللي اتجمعت كجزء من الـ requirements determination. (L4)",
       "ow": [
        null,
        "الـ Physical design بيحوّل الـ logical specifications لتفاصيل خاصة بالتكنولوجيا (L2)؛ ما بيسجّلش الـ requirements.",
        "الـ WBS بيقسّم المشروع لـ tasks يتحكم فيها ومترتبة (L3)؛ ما بيمثّلش الـ requirements.",
        "الـ SSR ده الـ form القياسي لطلب شغل development ‏(L3)، وبيتملي قبل ما الـ requirements تتجمع أصلًا."
       ]
      },
      {
       "why": "الـ Functional decomposition بيكسّر الـ processes الـ high-level لـ sub-processes. (L4)",
       "ow": [
        "الـ network diagram بيوضّح الـ project tasks والعلاقات بينها (L3)، مش processes متفكّكة لـ sub-processes.",
        null,
        "الـ Logical design بيوصف الـ functional features بتاعة النظام بعيد عن أي platform ‏(L2)، مش مستويات الـ processes.",
        "الـ Update ده flow من process لـ data store ‏(L4)، مش طريقة لوصف الـ processes."
       ]
      },
      {
       "why": "الـ Slack time هو الوقت اللي الـ activity ممكن تتأخره من غير ما المشروع يتأخر؛ على الـ network بيتحسب LF − EF، وبيبقى صفر على الـ critical path (L3, slide 68).",
       "ow": [
        null,
        "الـ network diagram بيوضّح الـ project tasks والعلاقات بينها؛ ممكن يعرض الـ slack في الـ boxes بتاعته بس هو مش الـ slack نفسه.",
        "الـ Retrieve ده flow في الـ DFD من data store لـ process ‏(L4)، ملوش علاقة بتأخير الـ schedule.",
        "الـ Physical design بيحوّل الـ logical specs لتفاصيل خاصة بالتكنولوجيا (L2)، ملوش علاقة بالـ scheduling."
       ]
      },
      {
       "why": "الـ network diagram بيوضح tasks المشروع والعلاقات بينها. (L3)",
       "ow": [
        "الـ DFDs بتوضّح الـ data وهي بتتنقل بين الـ entities والـ processes والـ stores ‏(L4)، مش الـ project tasks.",
        "الـ WBS بيقسّم المشروع لـ tasks يتحكم فيها ويرتبها؛ الـ diagram اللي بيوضّح الـ tasks والعلاقات بينها هو الـ network diagram.",
        null,
        "الـ Functional decomposition بيفكّك processes النظام لـ sub-processes ‏(L4)، مش الـ project tasks."
       ]
      },
      {
       "why": "الـ Work Breakdown Structure هو عملية تقسيم المشروع لـ tasks يتحكم فيها وترتيبها منطقيًا عشان الانتقال بين الـ tasks يمشي بسلاسة (L3, Planning activity 2).",
       "ow": [
        "الـ Functional decomposition بيفكّك وصف النظام (الـ processes) لتفاصيل أدق في الـ DFDs ‏(L4)، مش المشروع لـ tasks.",
        null,
        "الـ SSR ده الـ form القياسي لطلب أو اقتراح شغل development ‏(L3)، مش تقسيم tasks.",
        "الـ Slack time هو قد إيه الـ activity ممكن تتأخر من غير ما المشروع يتأخر (L3)، مش تقسيم tasks."
       ]
      },
      {
       "why": "الـ System Service Request ده form قياسي لطلب أو اقتراح شغل systems development؛ فيه الـ contact person والـ problem statement والـ service request statement والـ liaison contact (L3).",
       "ow": [
        null,
        "الـ Logical design بيوصف الـ functional features بعيد عن أي platform ‏(L2)؛ ده خطوة design، مش form طلب.",
        "الـ Update ده flow في الـ DFD من process لـ data store ‏(L4)، مش document.",
        "الـ network diagram بيوضّح الـ project tasks والعلاقات بينها (L3)، مش طلب شغل."
       ]
      },
      {
       "why": "الـ Logical design هو الجزء من الـ design phase اللي كل الـ functional features اللي اتختارت في الـ analysis بتتوصف فيه بعيد عن أي computer platform؛ وبعدين الـ physical design يزوّد التكنولوجيا (L2, SDLC phases).",
       "ow": [
        "الـ Physical design هو الخطوة اللي بعدها: بيحوّل الـ logical specs لتفاصيل خاصة بالتكنولوجيا، فمش مستقل عن الـ platform.",
        null,
        "الـ DFDs بتمثّل الـ requirements اللي اتجمعت في الـ analysis ‏(L4)؛ الوصف المستقل عن الـ platform للـ features ده الـ logical design.",
        "الـ Retrieve ده flow في الـ DFD من data store لـ process ‏(L4)، مش خطوة design."
       ]
      },
      {
       "why": "الـ Physical design بيطلّع تفاصيل technology-specific. (L2)",
       "ow": [
        "الـ Logical design هو الوصف المستقل عن الـ platform للـ features؛ إضافة التفاصيل الخاصة بالتكنولوجيا ده الـ physical design.",
        "الـ Update ده flow في الـ DFD من process لـ data store ‏(L4)، مش خطوة design.",
        null,
        "الـ Slack time هو قد إيه الـ activity ممكن تتأخر من غير ما المشروع يتأخر (L3)، مش خطوة design."
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
       "ans": "<b>الجزء (a): الـ Network (activity on arrow، والـ event times)</b><pre>S(0) --A=2--> 1(2) --B=3--> 2(5)\n2 --C=3--> 3(12)\n2 --D=7--> 4(12)\n2 --E=6--> 5(12)\n4 ..dummy..> 3\n4 ..dummy..> 5\n(D is needed by both F and G)\n3 --F=1--> 6(17)\n5 --G=5--> 6(17)\n6 --H=4--> 7(21)\n2 --I=8--> 7(21)\n7 --J=2--> End(23)</pre>(الـ dummy موجودة لأن الـ D مطلوبة قبل F و G الاتنين.)<table><tr><th dir=\"ltr\">Act</th><th dir=\"ltr\">Dur</th><th dir=\"ltr\">ES</th><th dir=\"ltr\">EF</th><th dir=\"ltr\">LS</th><th dir=\"ltr\">LF</th><th dir=\"ltr\">Slack</th></tr><tr><td dir=\"ltr\">A</td><td>2</td><td>0</td><td>2</td><td>0</td><td>2</td><td>0</td></tr><tr><td dir=\"ltr\">B</td><td>3</td><td>2</td><td>5</td><td>2</td><td>5</td><td>0</td></tr><tr><td dir=\"ltr\">C</td><td>3</td><td>5</td><td>8</td><td>13</td><td>16</td><td>8</td></tr><tr><td dir=\"ltr\">D</td><td>7</td><td>5</td><td>12</td><td>5</td><td>12</td><td>0</td></tr><tr><td dir=\"ltr\">E</td><td>6</td><td>5</td><td>11</td><td>6</td><td>12</td><td>1</td></tr><tr><td dir=\"ltr\">F</td><td>1</td><td>12</td><td>13</td><td>16</td><td>17</td><td>4</td></tr><tr><td dir=\"ltr\">G</td><td>5</td><td>12</td><td>17</td><td>12</td><td>17</td><td>0</td></tr><tr><td dir=\"ltr\">H</td><td>4</td><td>17</td><td>21</td><td>17</td><td>21</td><td>0</td></tr><tr><td dir=\"ltr\">I</td><td>8</td><td>5</td><td>13</td><td>13</td><td>21</td><td>8</td></tr><tr><td dir=\"ltr\">J</td><td>2</td><td>21</td><td>23</td><td>21</td><td>23</td><td>0</td></tr></table><b>الجزء (b): الـ Gantt chart</b><pre>     0    5    10   15   20\nA    ==\nB      ===\nC         ###........\nD         =======\nE         ######.\nF                #....\nG                =====\nH                     ====\nI         ########........\nJ                         ==\nteam 11111444333231111111111</pre><b>الجزء (c): الـ Team</b>: بالـ earliest starts الـ count row بيوصل أقصاه <b>4</b> (الأسابيع <bdi dir=\"ltr\">5⁠-⁠8</bdi> فيها الـ C والـ D والـ E والـ I)، يبقى <b>الـ max team هو 4</b> (طريقة الـ \"minimum team\" بتاعة المحاضرة). وأصغر عدد هو 1 (الأسابيع <bdi dir=\"ltr\">0⁠-⁠5</bdi> و <bdi dir=\"ltr\">13⁠-⁠23</bdi>). لو زحزحت الأنشطة جوه الـ slack بتاعها تقدر تنزّل الـ peak لـ <b>3</b>، بس مش لـ 2، لأن ده محتاج 18 أسبوع شغل non-critical (الـ C والـ E والـ F والـ I) في window طوله 16 أسبوع جنب الـ critical chain.<br><b>الجزء (d): الـ Paths</b>، والأطول هو الـ <b>critical</b>:<span class=\"ltr\">A-B-D-G-H-J = 23 (critical)</span><span class=\"ltr\">A-B-E-G-H-J = 22</span><span class=\"ltr\">A-B-D-F-H-J = 19</span><span class=\"ltr\">A-B-C-F-H-J = 15</span><span class=\"ltr\">A-B-I-J = 15</span><b>الأقصر 15 أسبوع</b> (<bdi dir=\"ltr\">A⁠-⁠B⁠-⁠I⁠-⁠J</bdi> أو <bdi dir=\"ltr\">A⁠-⁠B⁠-⁠C⁠-⁠F⁠-⁠H⁠-⁠J</bdi>). <b>المشروع مدته 23 أسبوع.</b><br><b>الجزء (e): الـ Slack</b> بالأسابيع:<span class=\"ltr\">C = 8, E = 1, F = 4, I = 8</span>والـ A و B و D و G و H و J الـ slack بتاعهم صفر."
      }
     ]
    },
    {
     "items": [
      {
       "ans": "إنك تمشي على systems methodology، وتطبّق techniques، وتستخدم tools مناسبة، ودول بيضمنوا الجودة وإن السيستم اللي بيتبني مناسب، وبيدّوا structure لعملية الـ development، لأنهم اتجرّبوا واتظبطوا قبل كده من ناس تانية. (L2)"
      },
      {
       "ans": "الـ <bdi dir=\"ltr\">KDSI&nbsp;=&nbsp;70</bdi>.<br>الجزء (a)، الـ Effort:<span class=\"ltr\">Effort = 3.6 × 70^1.20 = 3.6 × 163.73</span><span class=\"ltr\">= 589.4 ≈ <b>589 MM</b></span>الجزء (b)، الـ Duration بالشهور:<span class=\"ltr\">Duration = 2.5 × 589^0.32 = 2.5 × 7.699</span><span class=\"ltr\">= 19.2 ≈ <b>19</b></span>الجزء (c)، الـ Staffing:<span class=\"ltr\">589 / 19 = <b>31 FSP</b></span>الجزء (d)، الـ Productivity:<span class=\"ltr\">70,000 / 589 = 118.8 ≈ <b>119 DSI/MM</b></span>الجزء (e)، والـ duration بالشهور:<span class=\"ltr\">80% × 31 = 24.8 ≈ 25 FSP</span><span class=\"ltr\">duration = 589 / 25 = 23.6 ≈ <b>24</b></span>الجزء (f)، والـ staffing:<span class=\"ltr\">70% × 19 = 13.3 ≈ 13 months</span><span class=\"ltr\">staffing = 589 / 13 = 45.3 ≈ <b>45 FSP</b></span>(أو <bdi dir=\"ltr\">44.3&nbsp;≈&nbsp;44</bdi> لو ماقرّبتش الـ 13.3)<br>(المرتب مدّيينه بس مفيش تكلفة مطلوبة.) ولو احتجتها:<span class=\"ltr\">31 × 19 × 10,000 = EP 5,890,000</span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "1) الـ <b>Initiating</b>: تقييم الحجم والنطاق والتعقيد وحط الـ procedures (الـ initiation team، العلاقة مع الـ customer، الـ initiation plan، الـ management procedures، الـ PM environment والـ workbook، الـ project charter). 2) الـ <b>Planning</b>: تحديد أنشطة واضحة ومنفصلة والشغل المطلوب لكل واحد (الـ scope والـ feasibility، الـ WBS، الـ resources، الـ schedule، الـ communication plan، الـ standards، الـ risk، الـ budget، الـ statement of work، الـ baseline project plan). 3) الـ <b>Executing</b>: تنفيذ الخطط (تنفيذ ومتابعة الـ BPP، إدارة التغييرات، الحفاظ على الـ workbook، توصيل الحالة). 4) الـ <b>Closing down</b>: قفل المشروع، عمل post-project reviews، قفل عقد الـ customer. (L3)"
      },
      {
       "ans": "الـ DFD صورة لحركة الداتا بين الـ external entities والـ processes والـ data stores جوه السيستم. <b>بيُستخدم في</b>: تمثيل الـ requirements اللي اتجمعت في الـ analysis (الـ process modeling)، وفهم السيستم الحالي الـ physical والـ logical، وتحديد السيستم الجديد الـ logical من غير ما نعتمد على تكنولوجيا. <b>المستويات</b>: الـ <b>context</b> (حدود السيستم، الـ external entities، الـ flows الأساسية؛ process واحد 0، مفيش data stores)؛ الـ <b>Level 0</b> (الـ processes الأساسية <bdi dir=\"ltr\">1.0,&nbsp;2.0...</bdi>، والـ flows والـ stores)؛ الـ <b>Level 1</b> (decomposition لـ process واحد من الـ <bdi dir=\"ltr\">Level-0</bdi>، زي <bdi dir=\"ltr\">4.1,&nbsp;4.2</bdi>)؛ الـ <b>Level n</b> (decomposition لـ process في <bdi dir=\"ltr\">Level&nbsp;n⁠-⁠1</bdi>، زي <bdi dir=\"ltr\">4.3.1</bdi>). وأقل مستوى هو الـ <b>primitive DFD</b>. وكل مستوى لازم يبقى balanced مع الـ parent بتاعه. (L4)"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ Planning (تحديد احتياجات الـ IS وتحليلها وترتيبها بالأولوية)؛ الـ Analysis (دراسة الـ requirements وتنظيمها؛ والحل المقترح)؛ الـ Design (logical design مستقل عن الـ platform، وبعدين physical design بتفاصيل technology-specific)؛ الـ Implementation (الـ code والـ test والـ install والـ support)؛ الـ Maintenance (تصليح وتحسين بشكل منظم). (L2)"
      },
      {
       "ans": "الـ COCOMO (عمله Barry Boehm سنة 1981) model منتشر بيتوقع الـ <b>effort</b> بتاع الـ software (بالـ man-months) والـ <b>schedule</b> (بالشهور) من <b>الحجم بالـ DSI</b> والـ <b>cost drivers</b>. الـ Assumptions: الـ DSI هو الـ cost driver الأساسي، الإدارة كويسة، والـ requirements ثابتة بعد الـ planning. الـ Modes هي الـ organic والـ semidetached والـ embedded. الـ <b>Basic</b> معادلاته:<span class=\"ltr\">E = a·KDSI^b, TDEV = 2.5·E^c</span>والثوابت (<bdi dir=\"ltr\">a/b/c</bdi>) بالترتيب:<span class=\"ltr\">organic 2.4/1.05/0.38</span><span class=\"ltr\">semidetached 3.0/1.12/0.35</span><span class=\"ltr\">embedded 3.6/1.20/0.32</span>كويس للتقديرات السريعة التقريبية؛ في حدود factor <bdi dir=\"ltr\">2</bdi> في 60% بس من الحالات. الـ <b>Intermediate</b> بيضيف 15 cost driver (الـ product والـ computer والـ personnel والـ project) عن طريق الـ EAF؛ في حدود 20% من الحقيقي في 68% من الحالات. الـ <b>Detailed</b> فيه multipliers بتفرّق بين الـ phases و hierarchy من الـ module والـ subsystem والـ system؛ في حدود 20% في 70% من الحالات. (L5)"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ Functional decomposition هي process iterative بتكسّر فيها وصف السيستم لتفاصيل أدق وأدق. نقف لما: كل process يبقى decision واحد أو calculation واحد أو database operation واحدة؛ كل data store يمثّل entity واحد؛ الـ user مش عايز يشوف تفاصيل أكتر؛ مفيش flow محتاج يتقسم أكتر؛ كل form و transaction و display و report يبقى data flow واحد؛ ويبقى فيه process منفصل لكل اختيار في الـ menu في أقل مستوى. (L4)"
      },
      {
       "ans": "الـ CASE tools هي software بيدّي automated support لجزء من الـ SDLC. مبنية حوالين repository فيه الـ metadata والـ specifications، بتعمل automate للمهام الروتينية، وبتطلّع code و DDL.<br><b>الأنواع</b>: الـ diagramming tools (بترسم الـ processes والداتا والـ control بشكل graphical)؛ والـ display and report generators (prototype للـ look and feel)؛ والـ analysis tools (بتشيك على الـ specifications الناقصة أو المتعارضة أو الغلط)؛ والـ central repository (تخزين متكامل للـ diagrams والـ reports ومعلومات المشروع؛ وده أهم جزء لأنه بيدّي view واحد للمشروع)؛ والـ documentation generators (مستندات تقنية وللـ user)؛ والـ code generators (كود البرنامج والـ DB من الـ designs).<br><b>الدعم في كل phase</b>: الـ identification and selection (diagramming و matrix tools)؛ الـ initiation and planning (الـ repository والـ documentation generators)؛ الـ analysis (process و logic و data models)؛ الـ design (الـ form و report generators، والـ documentation)؛ الـ implementation (الـ code و DDL generators، والـ documentation)؛ الـ maintenance (كل الـ tools، وأساسًا الـ repository). (L2)"
      },
      {
       "ans": "1) جهاز data storage and retrieval. 2) processing capabilities لإنتاج الـ information (زي الـ totals والـ averages، ...). 3) communication device يجيب داتا أو information من كمبيوترات تانية. 4) عرض الـ information في شكل tables و reports و charts و graphs ومستندات متنسقة. (L1)"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "1) الـ <b>WBS</b>: تقسيم المشروع لـ tasks يتحكم فيها وترتيبها منطقيًا عشان الانتقال بينها يبقى سلس.<br>2) الـ <b>Iterative development</b>: الـ analyst لازم يتوقع إنه هيعيد رسم الـ diagram كذا مرة قبل ما يوصل لأقرب تمثيل للسيستم.<br>3) الـ <b>Primitive DFD</b>: أقل مستوى logical للـ decomposition.<br>4) الـ <b>Project workbook</b> هو repository أونلاين أو ورقي لكل مراسلات المشروع والـ inputs والـ outputs والـ deliverables والـ procedures والـ standards.<br>5) الـ <b>Project charter</b>: مستند قصير و high-level للـ stakeholders الداخليين والخارجيين، بيعلن المشروع رسميًا ويوصف الـ objectives والـ key assumptions والـ stakeholders.<br>6) الـ <b>Slack time</b>: الوقت اللي النشاط ممكن يتأخره من غير ما يأخر المشروع.<br>7) الـ <b>Critical path</b>: سلسلة أنشطة ترتيبها ومدتها بيأثروا مباشرة على معاد خلصان المشروع.<br>8) الـ <b>SSR</b> هو form قياسي لطلب أو اقتراح شغل systems development (الـ contact person، الـ problem statement، الـ service request statement، بيانات الـ liaison).<br>9) الـ <b>DFD balancing</b>: الحفاظ على الـ inputs والـ outputs بتوع الـ process لما يتعمله decompose لمستوى أقل.<br>10) الـ <b>Context DFD</b>: بيوضح الـ scope بتاع السيستم: الحدود، والـ external entities، والـ flows الأساسية، بـ process واحد (0) ومفيش data stores."
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ processes والـ data stores جوه السيستم. (L4)",
       "ow": [
        null,
        "الـ <bdi dir=\"ltr\">sources/sinks</bdi> بس هما اللي برّه النظام؛ الـ processes، زيها زي الـ data stores، جوه."
       ]
      },
      {
       "why": "الـ flow من data store لـ process معناه retrieve أو use: الـ process بيقرا الـ data اللي at rest في الـ store (L4, Update vs retrieve).",
       "ow": [
        "الـ Update ده الاتجاه العكسي، flow من process داخل على store ‏(insert أو delete أو change).",
        null
       ]
      },
      {
       "why": "مفيش data بتتنقل مباشرة بين الـ external entities؛ التعامل بينهم من غير process في النص بيبقى برّه النظام ومبيترسمش في الـ DFD (من الـ L4، قاعدة الـ <bdi dir=\"ltr\">Source/sink</bdi>).",
       "ow": [
        "مفيهاش أي process من النظام، فمينفعش تبقى جوّاه؛ وعشان كده الـ DFD مبيعرضهاش.",
        null
       ]
      },
      {
       "why": "قاعدة الـ data store: كل الـ flows الداخلة أو الخارجة من data store لازم تعدّي على process؛ الـ store ماينفعش تتوصّل مباشرة بـ store تانية أو بـ external entity (L4).",
       "ow": [
        null,
        "الـ store ماينفعش تتوصّل مباشرة بـ <bdi dir=\"ltr\">source/sink</bdi>؛ الـ data لازم تعدّي على process في النص."
       ]
      },
      {
       "why": "الـ context diagram فيه process symbol واحد بس، رقمه 0، بيمثّل النظام كله، وحواليه كل الـ external entities والـ major flows (L4).",
       "ow": [
        null,
        "الـ context diagram بيعرض كل الـ external entities (الـ <bdi dir=\"ltr\">sources/sinks</bdi>)، وغالبًا بيبقوا كذا واحد؛ اللي بيظهر مرة واحدة بس هو الـ process."
       ]
      },
      {
       "why": "الـ <bdi dir=\"ltr\">source/sink</bdi> ده external entity (شخص، أو organization، أو department، أو system تاني) بيبقى مصدر و/أو وجهة الـ data برّه النظام (من الـ L4، الـ symbols).",
       "ow": [
        "الـ processes والـ data stores هما الأجزاء اللي جوه النظام؛ الـ <bdi dir=\"ltr\">sources/sinks</bdi> دول external entities، يعني برّه.",
        null
       ]
      },
      {
       "why": "السهم من الـ process للـ store معناه update (insert أو delete أو change).",
       "ow": [
        null,
        "الـ Retrieve ده الاتجاه العكسي، flow من data store داخل على process."
       ]
      },
      {
       "why": "الـ context diagrams مافيهاش data stores؛ إنما الـ sinks (الـ destinations) بتظهر فعلًا.",
       "ow": [
        null,
        "الـ Destinations ‏(sinks) بتظهر فعلًا في الـ context diagram كـ external entities؛ الـ symbol اللي مش موجود هو الـ data store."
       ]
      },
      {
       "why": "الـ data store دي data at rest جوه النظام: file أو database أو transaction file أو مجموعة tables، بتترسم كمستطيل مفتوح من ناحية (<bdi dir=\"ltr\">D1,&nbsp;D2...</bdi>) (من الـ L4، الـ symbols).",
       "ow": [
        null,
        "الـ <bdi dir=\"ltr\">sources/sinks</bdi> بس هما اللي برّه؛ الـ data store شايلة data النظام نفسه، يعني جوه."
       ]
      },
      {
       "why": "الـ <bdi dir=\"ltr\">forked/joined</bdi> flows لازم يبقوا نفس الـ data item بالظبط.",
       "ow": [
        null,
        "الـ feedback flow مش جزء من قاعدة الـ DFD؛ الـ forked والـ joined flows لازم يشيروا لنفس الـ data item بالظبط."
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
       "ans": "نفس الـ network بتاع امتحان الـ Final <bdi dir=\"ltr\">2025/26</bdi>، سؤال 1.<pre>S(0) --A=5--> 1(5) --C=3--> 2(8)\nS(0) --B=6--> 2(8)\n1(5) --D=8--> 3(13) --G=1--> 4(14)\n2(8) --E=2--> 4(14)\n4(14) --H=12--> End(26)\n2(8) --F=11--> End(26)</pre><b>المشروع مدته 26 يوم، والـ critical path هو <bdi dir=\"ltr\">A⁠-⁠D⁠-⁠G⁠-⁠H</bdi>.</b> الـ Slack:<span class=\"ltr\">B 6, C 4, E 4, F 7</span><pre>     0    5    10   15   20   25\nA    =====\nB    ######......\nC         ###....\nD         ========\nE            ##....\nF            ###########.......\nG                 =\nH                  ============\nteam 22222322332222222221111111</pre><b>الجزء (c):</b> أكبر عدد هو <b>3</b> (يوم <bdi dir=\"ltr\">5⁠-⁠6</bdi> وأيام <bdi dir=\"ltr\">8⁠-⁠10</bdi>)، يبقى الـ minimum team هو <b>3</b> (طريقة المحاضرة؛ والـ Saad key برضه بيقول 3). ولسؤال الـ \"min and max\" بتاع امتحان May: الـ max هو 3 (الـ earliest-start schedule). ولو زحزحت B و C و E و F جوه الـ slack بتاعهم الـ peak ممكن ينزل لـ 2، يبقى الـ min هو 2."
      }
     ]
    },
    {
     "items": [
      {
       "ans": "إنك تمشي على systems methodology، وتطبّق techniques، وتستخدم tools مناسبة: (1) عشان تضمن الجودة وإن السيستم اللي بيتبني مناسب؛ (2) عشان تدّي structure لعملية الـ systems development، لأنها اتجرّبت واتظبطت قبل كده من ناس تانية. (L2)"
      },
      {
       "ans": "الجزء (a)، الـ Effort:<span class=\"ltr\">E = 3.0 × 24^1.12 = 3.0 × 35.14</span><span class=\"ltr\">= 105.4 ≈ <b>105 MM</b></span>الجزء (b)، الـ TDEV بالشهور:<span class=\"ltr\">TDEV = 2.5 × 105^0.35 = 2.5 × 5.098</span><span class=\"ltr\">= 12.7 ≈ <b>13</b></span>الجزء (c)، الـ Staff:<span class=\"ltr\">105 / 13 = 8.08 ≈ <b>8 FSP</b></span>الجزء (d)، الـ Productivity:<span class=\"ltr\">24,000 / 105 = 228.6 ≈ <b>229 DSI/MM</b></span>الجزء (e)، والمدة بالشهور:<span class=\"ltr\">¾ × 8 = 6 FSP → 105 / 6 = <b>17.5</b> (≈ 18)</span>الجزء (f)، نص الوقت بالشهور، والـ staff:<span class=\"ltr\">13 / 2 = 6.5 → 105 / 6.5 = 16.2 ≈ <b>16 FSP</b></span>الجزء (g)، التكلفة:<span class=\"ltr\">8 × 13 × 5000 = <b>EP 520,000</b></span>وبالظبط:<span class=\"ltr\">105 MM × 5000 = EP 525,000</span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ DFD: صورة لحركة الداتا بين الـ external entities والـ processes والـ data stores جوه السيستم. الـ DFD balancing: الحفاظ على الـ inputs والـ outputs بتوع الـ process لما يتعمله decompose لمستوى أقل (الـ child diagram ليه نفس الـ inputs والـ outputs بتوع الـ parent process). (L4)"
      },
      {
       "ans": "الـ slides بتعرّف الـ logical والـ physical <b>design</b> في الـ SDLC. الـ <b>Logical design</b>: كل الـ functional features بتاعة السيستم اللي اتختار بتتوصف <b>من غير ما تعتمد على أي computer platform</b>. وفي الـ database ده يبقى الـ conceptual model: الـ entities والـ attributes والـ relationships والـ keys والـ normalization، من غير ما نختار DBMS لسه. الـ <b>Physical design</b>: الـ logical specifications بتتحوّل لـ <b>تفاصيل technology-specific</b> نقدر نبرمج ونبني منها. وفي الـ database ده معناه اختيار الـ DBMS، والـ tables والـ data types، والـ file and storage structures، والـ indexes والـ partitioning (وساعات denormalizing عشان الـ performance). (L2؛ وتفاصيل الـ database دي من الكتاب.)"
      },
      {
       "ans": "الـ Planning (احتياجات الـ IS كلها بتتحدد وتتحلل وتترتب بالأولوية)؛ الـ Analysis (الـ requirements بتتدرس وتتنظم؛ والحل المقترح)؛ الـ Design (logical specifications وبعدين physical)؛ الـ Implementation (الـ code والـ test والـ install والـ support)؛ الـ Maintenance (تصليح وتحسين بشكل منظم). (L2)"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ Context</b><br>1) فيه اتنين processes. الـ context diagram فيه process واحد بالظبط (0)، فالـ DF2 اللي بين اتنين \"systems\" مايظهرش.<br>2) فيه الـ data store DS2 (ممنوع data stores في الـ context diagram)، والـ flow بتاعه مالوش label.<br>3) مش balanced مع الـ Level 0: الـ context بيبعت DF3 لـ E2، بس في الـ Level 0 الـ DF3 رايح من P1 لـ DS2 ومفيش حاجة اسمها DF3 بتوصل لـ E2.<br><b>الـ Level 0</b><br>4) الـ DS2 مرسوم مرتين (المفروض يبقى store واحد، أو التاني يتسمى DS1).<br>5) الـ DS2 اللي تحت ليه inputs بس (الـ DF3 والـ DF5) ومحدش بيقرا منه.<br>6) الـ DS2 اللي فوق ليه output بس (DF6) ومحدش بيكتب فيه.<br>7) الـ DF4 label لـ flows مختلفين:<span class=\"ltr\">P2 → E2</span><span class=\"ltr\">P3 → E2</span>8) الـ P3 ليه outputs (الـ DF5 والـ DF4) ومالوش input.<br><b>الـ Level 1</b><br>9) فيه اتنين processes رقمهم P1.1؛ التاني المفروض يبقى P1.3.<br>10) الـ forked flow الطالع من P1.1 عليه اتنين labels (DF7 و DF2). الـ fork لازم يشيل نفس الداتا بالظبط.<br>11) الـ P1.2 بيكتب DF6 في DS1، بس الـ parent P1 بيكتب DF3 في DS2. عشان يبقى balanced، المفروض يبقى:<span class=\"ltr\">DF3 → DS2</span>12) الـ P1.4 بيطلّع DF3، بس الـ output بتاع P1 لـ P2 هو DF2. المفروض يبقى DF2.<br><b>الـ Level 2</b><br>13) الـ P1.5.1 المفروض يبقى P1.4.1 (مفيش P1.5).<br>14) الـ P1.4.3 ليه inputs بس (الـ DF11 والـ DF12 والـ DF2) ومالوش output.<br>15) الـ DF2 داخل على P1.4.3. المفروض يطلع من P1.4.3 عشان يوازن الـ output بتاع P1.4."
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ Functional decomposition هي process iterative بتكسّر فيها وصف السيستم لتفاصيل أدق وأدق. نقف لما: كل process يبقى decision واحد أو calculation واحد أو database operation واحدة؛ كل store فيه داتا عن entity واحد؛ الـ user مش عايز يشوف تفاصيل أكتر؛ مفيش flow محتاج يتقسم أكتر؛ كل business form و transaction و display و report يبقى flow واحد؛ ويبقى فيه process منفصل لكل اختيار في الـ menu في أقل مستوى. (L4)"
      },
      {
       "ans": "هي controlled process فيها الـ initiating (الـ initiation team، العلاقة مع الـ customer، الـ initiation plan، الـ management procedures، الـ PM environment والـ workbook، الـ charter)، والـ planning (الـ scope والـ feasibility، الـ WBS، الـ resources، الـ schedule، الـ communication plan، الـ standards، الـ risk، الـ budget، الـ SOW، الـ BPP)، والـ executing (تنفيذ ومتابعة الـ BPP، إدارة التغييرات، الحفاظ على الـ workbook، توصيل الحالة)، والـ closing down (قفل المشروع، الـ post-project reviews، قفل عقد الـ customer). (L3)"
      },
      {
       "ans": "هي software tools بتدّي automated support لجزء من الـ SDLC. مبنية حوالين repository فيه الـ metadata والـ specifications. الأنواع: الـ diagramming tools، والـ display and report generators، والـ analysis tools، والـ central repository، والـ documentation generators والـ code generators. (L2)"
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ systems analyst هو الدور في الـ organization المسؤول أكتر عن الـ analysis والـ design بتوع الـ information systems (L2, Key definitions).",
       "ow": [
        "ده تعريف الـ slack time ‏(L3)، مصطلح scheduling، مش دور في الـ organization.",
        null,
        "ده الـ project workbook ‏(L3)، الـ repository بتاع كل documents المشروع، مش دور لشخص.",
        "ده تعريف الـ resources ‏(L3)؛ الـ analyst واحد من الـ resources، بس المصطلح المطلوب هو دور محدد."
       ]
      },
      {
       "why": "الـ Update معناه data flow من process لـ data store: الـ process بيعمل insert أو delete أو change للـ data اللي في الـ store (L4, Update vs retrieve).",
       "ow": [
        "الـ flow من data store لـ process ده retrieve (الـ process بيقرا الـ data)، عكس الـ update.",
        null,
        "الـ form القياسي لطلب شغل systems ده الـ System Service Request ‏(L3)، مش flow في الـ DFD.",
        "الـ document القصير الـ high-level للـ stakeholders ده الـ project charter ‏(L3)، مش flow في الـ DFD."
       ]
      },
      {
       "why": "الـ Slack time هو الوقت اللي الـ activity ممكن تتأخره من غير ما المشروع يتأخر؛ بيساوي LF − EF وبيبقى صفر على الـ critical path (L3, slide 68).",
       "ow": [
        null,
        "التسلسل اللي ترتيبه ومدده بيأثروا مباشرة على تاريخ الانتهاء ده الـ critical path، والـ activities بتاعته الـ slack بتاعها صفر.",
        "الـ flow من data store لـ process ده retrieve ‏(L4)، مصطلح DFD مش scheduling.",
        "الدور المسؤول أكتر عن الـ analysis والـ design هو الـ systems analyst ‏(L2)، مش الـ slack."
       ]
      },
      {
       "why": "الـ Retrieve معناه data flow من data store لـ process: الـ process بيقرا أو بيستخدم data موجودة at rest في الـ store (L4, Update vs retrieve).",
       "ow": [
        "الـ flow من process لـ data store ده update ‏(insert أو delete أو change)، عكس الـ retrieve.",
        null,
        "الـ repository بتاع documents المشروع ده الـ project workbook ‏(L3)، مش flow في الـ DFD.",
        "تقسيم المشروع لـ tasks يتحكم فيها ده الـ Work Breakdown Structure ‏(L3)، مش flow في الـ DFD."
       ]
      },
      {
       "why": "الـ Resources هي أي شخص أو مجموعة ناس أو جهاز أو material بيتستخدم في تنفيذ activity (L3, Representing project plans).",
       "ow": [
        "الـ document القصير الـ high-level للـ stakeholders ده الـ project charter ‏(L3)، مش الـ resources.",
        null,
        "الوقت اللي الـ activity ممكن تتأخره من غير ما المشروع يتأخر ده الـ slack time ‏(L3).",
        "الـ form القياسي لطلب شغل systems ده الـ System Service Request ‏(L3)."
       ]
      },
      {
       "why": "الـ critical path هو تسلسل الـ task activities اللي ترتيبها ومددها بيأثروا مباشرة على تاريخ انتهاء المشروع؛ والـ activities بتاعته الـ slack بتاعها صفر (L3).",
       "ow": [
        null,
        "تقسيم المشروع لـ tasks يتحكم فيها ده الـ Work Breakdown Structure ‏(L3)، وبييجي قبل ما أي path يتحدد.",
        "الـ repository بتاع كل مراسلات المشروع ده الـ project workbook ‏(L3).",
        "الـ flow من process لـ data store ده update ‏(L4)، مصطلح DFD."
       ]
      },
      {
       "why": "الـ WBS هو عملية تقسيم المشروع لـ tasks يتحكم فيها وترتيبها منطقيًا عشان الانتقال بين الـ tasks يمشي بسلاسة (L3, Planning activity 2).",
       "ow": [
        "الـ form القياسي لطلب أو اقتراح شغل development ده الـ System Service Request ‏(L3).",
        null,
        "تسلسل الـ activities اللي بيحدد تاريخ الانتهاء ده الـ critical path ‏(L3)، وبيتحدد بعد الـ WBS.",
        "الدور المسؤول أكتر عن الـ analysis والـ design هو الـ systems analyst ‏(L2)."
       ]
      },
      {
       "why": "الـ project charter ده document قصير high-level معمول للـ stakeholders اللي جوه وبرّه، بيعلن رسميًا عن المشروع وأهدافه والـ assumptions والـ stakeholders بتوعه (L3, slide 25).",
       "ow": [
        "الـ repository بتاع كل مراسلات المشروع والـ inputs والـ outputs والـ deliverables ده الـ project workbook، مش الـ charter القصير.",
        null,
        "أي شخص أو جهاز بيتستخدم في activity ده تعريف الـ resources ‏(L3).",
        "الـ flow من data store لـ process ده retrieve ‏(L4)، مصطلح DFD."
       ]
      },
      {
       "why": "الـ project workbook ده repository (online أو ورق) لكل مراسلات المشروع والـ inputs والـ outputs والـ deliverables والـ procedures والـ standards (L3, Initiation activity 5).",
       "ow": [
        null,
        "الـ document القصير الـ high-level للـ stakeholders ده الـ project charter ‏(L3)، مش الـ repository الكامل.",
        "الـ form القياسي لطلب شغل systems development ده الـ System Service Request ‏(L3).",
        "الوقت اللي الـ activity ممكن تتأخره ده الـ slack time ‏(L3)."
       ]
      },
      {
       "why": "الـ System Service Request ده form قياسي لطلب أو اقتراح شغل systems development جوه الـ organization؛ فيه الـ contact person والـ problem statement والـ service request statement والـ liaison contact (L3).",
       "ow": [
        "أي شخص أو مجموعة أو جهاز أو material بيتستخدم في activity ده تعريف الـ resources ‏(L3).",
        "تسلسل الـ activities اللي بيحدد تاريخ الانتهاء ده الـ critical path ‏(L3).",
        null,
        "الـ document القصير الـ high-level للـ stakeholders ده الـ project charter ‏(L3)، وبيتكتب بعد ما الطلب يتوافق عليه."
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
       "ans": "الـ Network:<pre>S(0) --A=5--> 1(5) --B=6--> 2(11)\n1(5) --C=6--> 2'(11)\n2'(11) ..dummy..> 2\n(B and C need unique end nodes)\n2(11) --D=2--> 3(13)\n3(13) --F=5--> 4(18)\n4(18) --G=3--> 5(21)\n3(13) --E=7--> 5(21)\n5(21) --H=5--> End(26)</pre>(الـ dummy موجودة عشان B و C يبقى ليهم end nodes unique.)<br>الـ ES والـ EF:<span class=\"ltr\">A 0-5, B 5-11, C 5-11, D 11-13</span><span class=\"ltr\">E 13-20 (LF 21, slack 1), F 13-18</span><span class=\"ltr\">G 18-21, H 21-26</span><b>المشروع مدته 26 أسبوع</b>، والـ critical paths هما:<span class=\"ltr\">A-B-D-F-G-H</span><span class=\"ltr\">A-C-D-F-G-H</span>(الـ E بس اللي ليها slack، أسبوع واحد).<pre>     0    5    10   15   20   25\nA    =====\nB         ======\nC         ======\nD               ==\nE                 #######.\nF                 =====\nG                      ===\nH                         =====\nteam 11111222222112222222111111</pre><b>الجزء (c): الـ Minimum team هو 2</b>، لأن أقصى حاجة اتنين أنشطة شغالين في نفس الوقت (B و C، وبعدين E مع F أو G). وده نفس الـ student key. (نسخة المحاضرة من الجدول ده فيها الـ H مدتها أسبوع واحد، فالنتيجة 22 أسبوع.)"
      }
     ]
    },
    {
     "items": [
      {
       "why": "تعريف الـ context diagram. (L4، الـ glossary بتاع lab 6)",
       "ow": [
        "الشغل أو الـ actions اللي بتتعمل على الـ data ده تعريف الـ process ‏(L4).",
        null,
        "الـ data at rest ده تعريف الـ data store ‏(L4)؛ والـ context diagram مفيهوش ولا واحدة.",
        "أوطى logical level في الـ decomposition ده الـ primitive DFD، الطرف التاني خالص من الـ context diagram."
       ]
      },
      {
       "why": "الـ data store بتمثّل data at rest جوه النظام: file أو database أو transaction file أو مجموعة tables (L4, the four DFD symbols).",
       "ow": [
        null,
        "مصدر و/أو وجهة الـ data ده الـ <bdi dir=\"ltr\">source/sink</bdi> (external entity)، وده برّه النظام.",
        "الـ data in motion دي الـ data flow؛ الـ data store شايلة data at rest.",
        "تفكيك وصف النظام لتفاصيل أدق ده الـ functional decomposition ‏(L4)."
       ]
      },
      {
       "why": "الـ <bdi dir=\"ltr\">Level-0</bdi> diagram بيمثّل الـ major processes بتاعة النظام (<bdi dir=\"ltr\">1.0,&nbsp;2.0...</bdi>) والـ data flows والـ data stores على مستوى abstraction عالي؛ وهو تفكيك (explosion) الـ process 0 (L4).",
       "ow": [
        "الحفاظ على الـ inputs والـ outputs وانت بتفكّك ده الـ DFD balancing ‏(L4).",
        null,
        "الـ data at rest ده تعريف الـ data store ‏(L4).",
        "إنك تتوقع تعيد رسم الـ diagrams كذا مرة ده الـ guideline بتاع الـ iterative development ‏(L4)."
       ]
      },
      {
       "why": "الـ Functional decomposition هو process تكرارية بتفكّك وصف النظام لتفاصيل أدق وأدق؛ الـ high-level processes بتتوصف بـ sub-processes أوطى منها (L4).",
       "ow": [
        null,
        "أوطى logical level في الـ decomposition ده الـ primitive DFD، يعني نتيجة الـ decomposition مش العملية نفسها.",
        "الحفاظ على الـ inputs والـ outputs وانت بتفكّك ده الـ DFD balancing ‏(L4).",
        "الشغل اللي بيتعمل على الـ data ده تعريف الـ process ‏(L4)."
       ]
      },
      {
       "why": "الـ DFD balancing هو الحفاظ على الـ inputs والـ outputs بتوع الـ data flow process لما يتفكّك لـ level أوطى: الـ child لازم يبقى ليه نفس inputs وoutputs الـ parent ‏(L4, slide 22).",
       "ow": [
        "مصدر و/أو وجهة الـ data ده الـ <bdi dir=\"ltr\">source/sink</bdi> (من الـ L4).",
        null,
        "أوطى logical level في الـ decomposition ده الـ primitive DFD ‏(L4).",
        "الـ data in motion ده تعريف الـ data flow ‏(L4)."
       ]
      },
      {
       "why": "الـ Iterative development هو الـ DFD guideline اللي بيقول إن الـ analyst لازم يتوقع يعيد رسم الـ diagram كذا مرة قبل ما يوصل لأقرب تمثيل للنظام اللي بيعمله model ‏(L4, slide 30).",
       "ow": [
        null,
        "تفكيك وصف النظام لتفاصيل أدق ده الـ functional decomposition، حتى لو هو كمان iterative.",
        "الـ data at rest ده تعريف الـ data store ‏(L4).",
        "الشغل أو الـ actions اللي بتتعمل على الـ data ده تعريف الـ process ‏(L4)."
       ]
      },
      {
       "why": "الـ primitive DFD ده أوطى logical level في الـ decomposition؛ الـ processes اللي مش متفكّكة لـ child diagrams اسمها primitive ‏(L4).",
       "ow": [
        "الـ scope بتاع الـ organizational system بالـ boundary والـ entities بتوعه ده الـ context diagram، أعلى level.",
        null,
        "الـ major processes بتاعة النظام على مستوى عالي دي الـ <bdi dir=\"ltr\">Level-0</bdi> diagram ‏(L4).",
        "الـ data in motion ده تعريف الـ data flow ‏(L4)."
       ]
      },
      {
       "why": "الـ data flow بيمثّل data in motion بتتنقل كوحدة واحدة من مكان لمكان في النظام؛ بيترسم كسهم عليه label ‏(L4, the four DFD symbols).",
       "ow": [
        "الـ data at rest ده تعريف الـ data store ‏(L4).",
        "الشغل اللي بيتعمل على الـ data ده تعريف الـ process ‏(L4).",
        null,
        "مصدر الـ data ده الـ source ‏(external entity)، مش الـ data اللي بتتحرك نفسها."
       ]
      },
      {
       "why": "الـ process بيمثّل شغل أو actions بتتعمل على الـ data عشان تتحوّل أو تتخزن أو تتوزع؛ وهو جوه النظام واسمه بيبقى verb phrase ‏(L4, the four DFD symbols).",
       "ow": [
        null,
        "الـ data at rest ده تعريف الـ data store ‏(L4).",
        "مصدر و/أو وجهة الـ data ده الـ <bdi dir=\"ltr\">source/sink</bdi> (من الـ L4).",
        "أوطى logical level في الـ decomposition ده الـ primitive DFD ‏(L4)."
       ]
      },
      {
       "why": "الـ <bdi dir=\"ltr\">source/sink</bdi> ده external entity بيمثّل مصدر و/أو وجهة الـ data؛ وهو برّه النظام (من الـ L4، الـ four DFD symbols).",
       "ow": [
        "الـ data in motion ده تعريف الـ data flow ‏(L4).",
        null,
        "الـ data at rest ده تعريف الـ data store ‏(L4).",
        "الحفاظ على الـ inputs والـ outputs وانت بتفكّك ده الـ DFD balancing ‏(L4)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الجزء (a)، الـ Effort:<span class=\"ltr\">E = 3.6 × 40^1.20 = 3.6 × 83.65</span><span class=\"ltr\">= 301.1 ≈ <b>301 MM</b></span>الجزء (b)، الـ TDEV بالشهور:<span class=\"ltr\">TDEV = 2.5 × 301^0.32 = 2.5 × 6.211</span><span class=\"ltr\">= 15.5 ≈ <b>16</b></span>الجزء (c)، الـ Staff:<span class=\"ltr\">301 / 16 = 18.8 ≈ <b>19 FSP</b></span>الجزء (d)، والمدة بالشهور:<span class=\"ltr\">½ × 19 = 9.5 ≈ 10 FSP → 301 / 10 = 30.1 ≈ <b>30</b></span>الجزء (e):<span class=\"ltr\">301 / 4 = 75.25 ≈ <b>75 FSP</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ <b>DFD</b>: صورة لحركة الداتا بين الـ external entities والـ processes والـ data stores جوه السيستم. الـ <b>Balancing</b>: الحفاظ على الـ inputs والـ outputs بتوع الـ process لما يتعمله decompose لمستوى أقل. الـ <b>Functional decomposition</b> هي process iterative بتكسّر فيها وصف السيستم لتفاصيل أدق وأدق. <b>نقف لما</b>: كل process يبقى decision واحد أو calculation واحد أو database operation واحدة؛ كل store يمثّل entity واحد؛ الـ user مش عايز يشوف تفاصيل أكتر؛ الـ flows مش محتاجة تتقسم أكتر؛ كل form و transaction و display و report يبقى flow واحد؛ ويبقى فيه process منفصل لكل menu option في أقل مستوى. (L4)"
      },
      {
       "ans": "<b>الـ Level 0</b><br>1) الـ DS2 ظاهر مرتين (store واحد، أو التاني يتسمى DS1).<br>2) الـ DS2 اللي بيستقبل DF3 و DF5 مالوش output.<br>3) الـ DS2 اللي بيبعت DF6 مالوش input.<br>4) الـ DF4 label لـ flows مختلفين.<br>5) الـ P3 ليه outputs بس ومالوش input.<br><b>الـ Level 1</b><br>6) الـ forked flow الطالع من P1.1 عليه اتنين labels، هما DF2 و DF7 (الـ fork لازم يبقى نفس الداتا).<br>7) الـ P1.1 متكرر؛ التاني المفروض يبقى P1.3.<br>8) الـ P1.2 المفروض يطلّع DF3 لـ DS2 (مش DF6 لـ DS1) عشان يوازن P1.<br>9) الـ P1.4 المفروض يطلّع DF2 (مش DF3) عشان يوازن P1.<br><b>الـ Level 2</b><br>10) مفيش P1.5، فالـ P1.5.1 المفروض يبقى P1.4.1.<br>11) الـ P1.4.3 ليه inputs ومالوش output.<br>12) الـ DF2 لازم يبقى output من P1.4.3، مش input.<br>(نفس الـ 12 error اللي في الـ student key.)"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ <b>Completeness</b>: الـ DFD لازم يبقى فيه كل الـ components اللازمة للسيستم، وكل component لازم يبقى متوصف بالكامل في الـ project dictionary أو الـ CASE repository. الـ <b>Consistency</b>: لأي درجة المعلومات اللي في مستوى من مجموعة DFDs متداخلة موجودة كمان في المستويات التانية. (الـ guidelines بتاعة L4)"
      },
      {
       "ans": "الـ Project management هو controlled process للـ initiating والـ planning والـ executing والـ closing down للمشروع. الـ <b>Initiating</b>: الـ initiation team، العلاقة مع الـ customer، الـ initiation plan، الـ management procedures، الـ PM environment والـ workbook. الـ <b>Planning</b>: الـ scope، الـ WBS، الـ resources، الـ schedule، الـ communication، الـ standards، الـ risk، الـ budget، الـ SOW، الـ BPP. الـ <b>Executing</b>: تنفيذ ومتابعة وتعديل الـ BPP، الحفاظ على الـ workbook، توصيل الحالة. الـ <b>Closing down</b>: قفل المشروع، post-project reviews، قفل عقد الـ customer. (L3)"
      },
      {
       "ans": "الـ <b>SSR</b> هو form قياسي لطلب أو اقتراح شغل systems development جوه المنظمة. فيه الـ contact person والـ problem statement والـ service request statement وبيانات الـ liaison. الـ <b>Project charter</b>: مستند قصير و high-level للـ stakeholders الداخليين والخارجيين. بيعلن رسميًا إن المشروع اتعمل وبيوصف باختصار الـ objectives والـ key assumptions والـ stakeholders. (L3)"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "(مش موجود في الـ slides اللي اتدرّست؛ من chapter الكتاب \"Designing forms and reports\".)<table><tr><th dir=\"ltr\">Form</th><th dir=\"ltr\">Report</th></tr><tr><td>business document فيه داتا محددة مسبقًا وأماكن الـ users <b>بيدخّلوا أو يغيّروا</b> فيها داتا</td><td>business document فيه <b>داتا محددة مسبقًا بس</b>، بيُستخدم للقراية أو العرض</td></tr><tr><td>غالبًا بيعرض <b>record واحد</b> في المرة (زي order form)</td><td>ممكن يعرض <b>records كتير</b> (زي تقرير المبيعات الشهري)</td></tr><tr><td>أساسًا مستند <b>input</b>، متصمم للشاشة</td><td>أساسًا مستند <b>output</b>، وغالبًا بيتطبع</td></tr><tr><td>الداتا <b>ممكن تتعدّل</b> من خلاله</td><td>الداتا <b>ماينفعش تتعدّل</b> من خلاله</td></tr></table>"
      },
      {
       "ans": "الـ <b>Logical design</b>: كل الـ functional features بتاعة السيستم اللي اتختار في الـ analysis بتتوصف من غير ما تعتمد على أي computer platform. وفي الـ database ده معناه الـ entities والـ attributes والـ relationships والـ normalized relations. الـ <b>Physical design</b>: الـ logical specifications بتتحوّل للتفاصيل الـ technology-specific اللي منها بيتعمل كل الـ programming والبناء. وفي الـ database ده معناه الـ DBMS والـ tables والـ data types والـ file organization والـ indexes. (L2)"
      },
      {
       "ans": "الـ SDLC هو الـ methodology التقليدية لتطوير الـ IS وعمل maintain ليها واستبدالها. الـ Phases هي: الـ <b>planning</b> (تحديد احتياجات الـ IS وتحليلها وترتيبها بالأولوية)، والـ <b>analysis</b> (دراسة الـ requirements وتنظيمها)، والـ <b>design</b> (logical specifications وبعدين physical)، والـ <b>implementation</b> (الـ code والـ test والـ install والـ support)، والـ <b>maintenance</b> (تصليح وتحسين بشكل منظم). (L2)"
      }
     ]
    }
   ]
  }
 ]
};

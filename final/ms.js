// Final-exam revision for ms: every lecture, exam-focused summary in English and Egyptian Arabic per point. Merged by build.mjs.
window.FINAL = window.FINAL || {};
FINAL.ms = {
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
 "scope": "All 8 lectures",
 "scope_ar": "كل الـ 8 محاضرات",
 "sections": [
  {
   "lec": 1,
   "h": "Evaluating a system, and what simulation is",
   "ar_h": "إزاي نقيّم system، يعني إيه simulation",
   "pts": [
    [
     "Three ways to evaluate a system's performance (slide 4): <b>Measurements</b> (use an existing instance of the system), <b>Analysis</b> (a mathematical abstraction plus formulas for the performance), <b>Simulation</b> (a computer program that implements a model of the system; you run experiments with it).",
     "فيه 3 طرق تقيّم بيها الـ performance بتاع system (سلايد 4): الـ <b>Measurements</b> (تقيس على نسخة موجودة فعلًا من الـ system)، والـ <b>Analysis</b> (تعمل abstraction رياضي وتطلّع formulas للـ performance)، والـ <b>Simulation</b> (برنامج كمبيوتر بينفّذ model للـ system وتعمل بيه experiments)."
    ],
    [
     "Problem of each (slide 5): measurements fail if the system <b>does not exist</b>, is not available, or changes are expensive or slow; analysis is <b>only feasible for simple systems</b> (a factory, computer or network is too complex); simulation must make sure model, implementation and analysis do not show randomness, and it suffers from <b>Garbage-In Garbage-Out (GIGO)</b>.",
     "مشكلة كل طريقة (سلايد 5): الـ measurements مش بتنفع لو الـ system <b>مش موجود</b> أو مش متاح أو التغيير فيه غالي وبطيء، والـ analysis <b>بينفع بس مع الـ systems البسيطة</b> (المصنع والكمبيوتر والـ network معقدين أوي)، والـ simulation لازم تتأكد إن الـ model والـ implementation والـ analysis مفيهمش randomness، وعندها مشكلة الـ <b>Garbage-In Garbage-Out (GIGO)</b>."
    ],
    [
     "<b>Simulation</b> = the imitation of the operation of a real-world system <b>over time</b> (slide 16). Method: (1) <b>generate an artificial history</b> of the system; (2) draw inferences from it about the system's characteristics. You develop a model made of <b>entities</b> (objects). Both existing and conceptual systems can be simulated (lecture notes).",
     "الـ <b>Simulation</b> هي تقليد لشغل system حقيقي <b>على مدار الوقت</b> (سلايد 16). الطريقة: (1) <b>تعمل artificial history</b> للـ system، (2) تطلّع منه استنتاجات عن خصائص الـ system. وبتبني model متكوّن من <b>entities</b> (objects). وينفع تعمل simulation لـ system موجود أو لسه conceptual (من الـ lecture notes)."
    ],
    [
     "Examples: clients, network and server drawn as a <b>queueing model</b> (slide 10); a <b>MANET</b> (slide 12) has mobile nodes, <b>no infrastructure</b> (no access points or base stations), nodes talk only inside their mutual communication range, source and destination are several hops apart, so every node forwards data for others. A moving node's position is <b>not uniform</b> (the centre is preferred) and has no closed-form f(x, y), which is why we simulate (slide 13).",
     "أمثلة: الـ clients والـ network والـ server متمثلين كـ <b>queueing model</b> (سلايد 10)، والـ <b>MANET</b> (سلايد 12) فيها mobile nodes و<b>مفيش infrastructure</b> (لا access points ولا base stations)، والـ nodes بتكلم بعض بس جوه الـ communication range المشترك، والـ source والـ destination بينهم كذا hop، فكل node بتعمل forward للداتا بتاعة غيرها. ومكان الـ node وهي بتتحرك <b>مش uniform</b> (النص مفضّل)، ومفيش له formula مقفولة <bdi dir=\"ltr\">f(x, y)</bdi>، وعشان كده بنعمل simulation (سلايد 13)."
    ],
    [
     "Uses of simulation, <b>Elmaghraby [1968]</b> (slide 14): (1) aid to thought, (2) communication, (3) training/education, (4) experimentation, (5) predicting; plus the new use <b>entertainment</b> (video games, serious games). Simulation is <b>not as new as we think</b> (WW1 horse simulator).",
     "استخدامات الـ simulation عند <b>Elmaghraby [1968]</b> (سلايد 14): (1) الـ aid to thought، (2) الـ communication، (3) الـ training/education، (4) الـ experimentation، (5) الـ predicting، وزيادة عليهم الاستخدام الجديد <b>entertainment</b> (الـ video games والـ serious games). والـ simulation <b>مش جديدة زي ما احنا فاكرين</b> (حصان الـ simulator في الحرب العالمية الأولى)."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "When to simulate: appropriate or not, advantages and disadvantages",
   "ar_h": "إمتى نعمل simulation: مناسبة ولا لأ، والمميزات والعيوب",
   "pts": [
    [
     "<b>Appropriate</b> (slide 17): study of experiments with <b>internal interactions</b>; informational, organizational and environmental changes can be simulated; knowledge from simulations <b>can improve</b> the system; results show which variables matter most; a <b>pedagogical device</b>; to <b>verify analytical results</b> (e.g. queueing systems); animation shows the system in action.",
     "الـ simulation <b>مناسبة</b> (سلايد 17): لدراسة experiments فيها <b>internal interactions</b>، ولما عايز تعمل simulation لتغييرات informational أو organizational أو environmental، والمعرفة اللي بتطلع منها <b>ممكن تحسّن</b> الـ system، والنتايج بتوريك أنهي variables أهم، وكـ <b>pedagogical device</b> للتعليم، وعشان <b>تتأكد من نتايج analytical</b> (زي الـ queueing systems)، والـ animation بيوريك الـ system وهو شغال."
    ],
    [
     "<b>Not appropriate</b> (slide 18): solvable by <b>common sense</b>; solvable <b>mathematically</b>; direct experiments are easier; costs exceed savings; no time available; <b>no (input) data</b>; it <b>cannot be verified or validated</b>; behavior <b>too complex or unknown</b> (human behavior). Common-sense example: 50 arrivals/hour, 10 served/hour per server, so 50/10 = <b>5 servers</b>, no simulation needed.",
     "الـ simulation <b>مش مناسبة</b> (سلايد 18): لما المشكلة تتحل بالـ <b>common sense</b>، أو تتحل <b>رياضيًا</b>، أو الـ experiments المباشرة أسهل، أو التكلفة أكتر من التوفير، أو مفيش وقت، أو <b>مفيش input data</b>، أو <b>مينفعش تعملها verify أو validate</b>، أو السلوك <b>معقد جدًا أو مش معروف</b> (زي سلوك البني آدمين). مثال الـ common sense: <bdi dir=\"ltr\">50</bdi> وصول في الساعة وكل server بيخدم <bdi dir=\"ltr\">10</bdi> في الساعة، يبقى:<span class=\"ltr\">50 / 10 = 5 servers</span>من غير simulation."
    ],
    [
     "<b>Advantages</b> (slide 19): explore policies, procedures, decision rules and information flows <b>without disrupting</b> the real system; test new hardware designs, layouts, transportation systems, protocols, computer systems and network architectures <b>without committing resources</b>; test hypotheses for feasibility; <b>compress or expand time</b>; insight into the interaction and importance of variables; <b>bottleneck analysis</b>; see how the system really operates (not how people think it does); answer <b>\"What if …\"</b> questions.",
     "<b>المميزات</b> (سلايد 19): تجرّب policies وprocedures وdecision rules وinformation flows <b>من غير ما تبوّظ</b> الـ system الحقيقي، وتختبر hardware designs وlayouts وtransportation systems وprotocols وcomputer systems وnetwork architectures جديدة <b>من غير ما تصرف resources</b>، وتختبر الـ hypotheses هل هي feasible، و<b>تضغط أو تمط الوقت</b> (slow-down أو speed-up)، وتفهم تفاعل الـ variables وأهميتها، وتعمل <b>bottleneck analysis</b>، وتفهم الـ system شغال إزاي بجد مش زي ما الناس فاكرة، وتجاوب على أسئلة <b>\"What if …\"</b>."
    ],
    [
     "<b>Disadvantages</b> (slide 20): (1) model building <b>requires training</b> (it is like an art); (2) results are <b>difficult to interpret</b> (outputs are random variables: randomness or system behavior?); (3) <b>time consuming and expensive</b>. They are offset by: packages with ready models that only need input data, packages with output analysis, faster computers, and the fact that most real problems have <b>no closed-form solution</b>.",
     "<b>العيوب</b> (سلايد 20): (1) بناء الـ model <b>محتاج training</b> (زي الفن)، (2) النتايج <b>صعب تتفسر</b> (الـ outputs عبارة عن random variables، فمش سهل تعرف ده randomness ولا سلوك الـ system)، (3) <b>بتاخد وقت وغالية</b>. وبيتعوّضوا بإن الـ packages فيها models جاهزة محتاجة input data بس، وفيها output analysis، والكمبيوترات بقت أسرع، وأغلب المشاكل الحقيقية <b>مالهاش closed-form solution</b> أصلًا."
    ],
    [
     "<b>Application areas</b> (slide 21): manufacturing, semiconductor manufacturing, construction and project management, military, logistics/supply chain/distribution, transportation and traffic, business process, health care, call-center, computers and networks, games and entertainment. Trap: \"food industry\" is <b>not</b> on the list.",
     "<b>مجالات الاستخدام</b> (سلايد 21): الـ manufacturing، والـ semiconductor manufacturing، والـ construction والـ project management، والـ military، والـ logistics والـ supply chain والـ distribution، والـ transportation والـ traffic، والـ business process، والـ health care، والـ call-center، والـ computers والـ networks، والـ games والـ entertainment. خد بالك: الـ \"food industry\" <b>مش</b> في الليستة."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Systems: environment, components, discrete and continuous",
   "ar_h": "الـ Systems: الـ environment والمكونات والـ discrete والـ continuous",
   "pts": [
    [
     "<b>System</b> = a group of objects joined together in some regular interaction or interdependence toward some purpose (slide 23). Examples: an <b>automobile factory</b> (machines, parts and workers jointly produce a vehicle); a <b>computer network</b> (users, hosts, routers, lines).",
     "الـ <b>System</b> هو مجموعة objects متربطة ببعض في تفاعل أو اعتماد منتظم عشان يحققوا هدف (سلايد 23). أمثلة: <b>مصنع عربيات</b> (مكن وقطع غيار وعمال بيشتغلوا مع بعض عشان يطلّعوا عربية)، و<b>computer network</b> (users وhosts وrouters وlines)."
    ],
    [
     "<b>System environment</b> = everything outside the system that affects it (slide 24). The <b>boundary</b> between system and environment depends on the <b>purpose of the study</b>. In the factory example the <b>market</b> (arrival of orders) is the environment.",
     "الـ <b>System environment</b> هو كل حاجة برا الـ system بس بتأثر فيه (سلايد 24). والـ <b>boundary</b> بين الـ system والـ environment بيتحدد حسب <b>هدف الدراسة</b>. وفي مثال المصنع الـ <b>market</b> (وصول الطلبات) هو الـ environment."
    ],
    [
     "Components (slide 25): <b>entity</b> (object of interest), <b>attribute</b> (property of an entity), <b>activity</b> (a time period of specified length), <b>system state</b> (variables that describe the system at any time), <b>event</b> (an instantaneous occurrence that might change the state), <b>endogenous</b> (activities and events <b>within</b> the system), <b>exogenous</b> (in the <b>environment</b>, affecting the system). <b>Open</b> system: has exogenous activity; <b>closed</b>: none (lecture notes).",
     "المكونات (سلايد 25): الـ <b>entity</b> هو الـ object اللي يهمنا، والـ <b>attribute</b> خاصية للـ entity، والـ <b>activity</b> فترة زمنية طولها محدد، والـ <b>system state</b> هي الـ variables اللي بتوصف الـ system في أي وقت، والـ <b>event</b> حاجة بتحصل في لحظة وممكن تغيّر الـ state، والـ <b>endogenous</b> هي الـ activities والـ events اللي <b>جوه</b> الـ system، والـ <b>exogenous</b> اللي في الـ <b>environment</b> وبتأثر عليه. والـ system الـ <b>open</b> فيه exogenous activity، والـ <b>closed</b> مفيهوش (من الـ lecture notes)."
    ],
    [
     "Router example (slide 26): entity = router; attributes = {IF1, IF2}; activities = transmit (20 µs, 15 µs) and drop (10 µs); state S = {R1, T1, D1, Q1, R2, T2, D2, Q2} (received, transmitted, dropped, queue length per interface); event = arrival of a packet {IF, Time, Packet length}. Slide 27 table: bank → entity customers, attribute checking-account balance, events arrival and departure, state number of busy tellers and waiting customers.",
     "مثال الـ router (سلايد 26): الـ entity هو الـ router، والـ attributes هي:<span class=\"ltr\">{IF1, IF2}</span>والـ activities هي الـ transmit (<bdi dir=\"ltr\">20 µs</bdi> و<bdi dir=\"ltr\">15 µs</bdi>) والـ drop (<bdi dir=\"ltr\">10 µs</bdi>)، والـ state هي:<span class=\"ltr\">S = {R1, T1, D1, Q1, R2, T2, D2, Q2}</span>(received وtransmitted وdropped وطول الـ queue لكل interface)، والـ event هو وصول packet فيها <bdi dir=\"ltr\">{IF, Time, Packet length}</bdi>. وفي جدول سلايد 27 البنك: الـ entities هم الـ customers، والـ attribute هو رصيد الحساب، والـ events هي الوصول والمغادرة، والـ state هي عدد الـ tellers المشغولين وعدد الـ customers المستنيين."
    ],
    [
     "<b>Discrete</b> system: state variables change only at a discrete set of points in time (bank, gift shop, router, host, jobs in queue): a <b>step</b> graph. <b>Continuous</b>: state changes continuously (head of water behind a dam, temperature): a smooth curve (slide 28).",
     "الـ system الـ <b>Discrete</b> الـ state variables بتاعته بتتغير بس في نقط معينة من الوقت (البنك، الـ gift shop، الـ router، الـ host، الـ jobs في الـ queue)، والرسمة بتاعته <b>سلالم</b>. والـ <b>Continuous</b> الـ state بتتغير باستمرار (منسوب المية ورا السد، ودرجة الحرارة)، والرسمة منحنى ناعم (سلايد 28)."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Models: definition, kinds, examples and principles",
   "ar_h": "الـ Models: التعريف والأنواع والأمثلة والمبادئ",
   "pts": [
    [
     "<b>Model</b> = a representation of a system for the purpose of studying it (slide 34); consider only the aspects that affect the problem. Problems: the <b>granularity</b> of details, and models are <b>not unique</b>. <b>Physical model</b> = a prototype (molecular model, architectural model); <b>mathematical model</b> = symbolic notation and equations.",
     "الـ <b>Model</b> هو تمثيل للـ system عشان ندرسه (سلايد 34)، وبناخد بس الجوانب اللي بتأثر على المشكلة. والمشاكل: الـ <b>granularity</b> بتاعة التفاصيل (ندخّل قد إيه)، والـ models <b>مش unique</b>. والـ <b>Physical model</b> هو prototype (زي موديل جزيء أو ماكيت مبنى)، والـ <b>Mathematical model</b> بيستخدم رموز ومعادلات."
    ],
    [
     "How to study a system (slide 37): experiment with the <b>actual system</b> or with a <b>model</b>; a model is <b>physical or mathematical</b>; a mathematical model is studied by an <b>analytical</b> solution or by <b>simulation</b>.",
     "إزاي تدرس system (سلايد 37): يا تعمل experiment على الـ <b>system الحقيقي</b>، يا على <b>model</b> ليه، والـ model يا <b>physical</b> يا <b>mathematical</b>، والـ mathematical model بيتدرس يا بحل <b>analytical</b> يا بالـ <b>simulation</b>."
    ],
    [
     "Example models (slides 38-45): <b>mobility</b> d = v · t (assumes constant velocity; simple, but seldom valid for a whole travel); <b>free-space radio</b> (assumes line of sight, no obstacles; not useful indoors or in cities); <b>ISO/OSI</b> (7 layers; routers use only network, data link, physical); <b>TCP/IP</b> (no presentation or session; network ↔ Internet layer; data link + physical ↔ host-to-network); six-level computer model; link delays: <b>processing, queueing, transmission</b> (put all bits on the medium), <b>propagation</b> (travel A → B); cellular model; user behavior at user, object and packet level.",
     "أمثلة models (سلايد 38 لـ 45): الـ <b>mobility</b> <bdi dir=\"ltr\">d = v · t</bdi> (بيفترض سرعة ثابتة، بسيط بس نادرًا ما يصح طول الرحلة)، والـ <b>free-space radio</b> (بيفترض line of sight ومفيش عوائق، ومش مفيد جوه المباني ولا في المدن)، والـ <b>ISO/OSI</b> (7 layers، والـ routers فيها بس network وdata link وphysical)، والـ <b>TCP/IP</b> (مفيهوش presentation ولا session، والـ network بتقابل الـ Internet layer، والـ data link مع الـ physical بيقابلوا الـ host-to-network)، والـ six-level computer model، والـ delays على الـ link وهي الـ <b>processing</b> والـ <b>queueing</b> والـ <b>transmission</b> (حط كل الـ bits على الـ medium) والـ <b>propagation</b> (المسافة من A لـ B)، والـ cellular model، وسلوك الـ user على مستوى الـ user والـ object والـ packet."
    ],
    [
     "Principles of modeling (slide 46), the exam-friendly ones: the secret of a good modeler is recognizing the need and having the ability to <b>remodel</b>; modeling is <b>evolutionary</b>; the <b>problem statement</b> is the primary controlling element; in combined systems consider the <b>continuous aspects first</b>; judge a model by its <b>usefulness</b> (absolutely it is neither good nor bad, nor neutral); the purpose of modeling is <b>knowledge and understanding</b>, not models; know when to go top-down or bottom-up; learn the tradeoffs among techniques.",
     "مبادئ الـ modeling (سلايد 46)، وأهمها للامتحان: سر الـ modeler الشاطر إنه يعرف إمتى محتاج و<b>يقدر يعمل remodel</b>، والـ modeling عملية <b>evolutionary</b>، والـ <b>problem statement</b> هو العنصر الأساسي اللي بيتحكم، وفي الـ combined systems بنبدأ بالجوانب الـ <b>continuous</b> الأول، والـ model بيتقيّم بـ <b>فايدته</b> (في المطلق مش كويس ولا وحش ولا neutral)، والهدف من الـ modeling هو <b>المعرفة والفهم</b> مش الـ models نفسها، وتعرف إمتى top-down وإمتى bottom-up، وتتعلم الـ tradeoffs بين التقنيات."
    ],
    [
     "A <b>good model</b> (slide 47) has seven qualities: <b>simplicity, credibility, efficiency, availability, verified, code quality, documentation</b>.",
     "الـ <b>Good model</b> (سلايد 47) ليه 7 صفات: الـ <b>simplicity</b> والـ <b>credibility</b> والـ <b>efficiency</b> والـ <b>availability</b> والـ <b>verified</b> والـ <b>code quality</b> والـ <b>documentation</b>."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Simulation models and discrete-event simulation",
   "ar_h": "الـ Simulation models والـ discrete-event simulation",
   "pts": [
    [
     "A <b>simulation model</b> is a particular type of <b>mathematical model</b> of a system (slide 48).",
     "الـ <b>Simulation model</b> هو نوع معين من الـ <b>mathematical model</b> للـ system (سلايد 48)."
    ],
    [
     "Three pairs (slide 48): <b>static</b> (a system at a particular point in time) vs <b>dynamic</b> (over a time interval); <b>deterministic</b> (no random variables; known inputs give a unique output, e.g. a college timetable) vs <b>stochastic</b> (with random variables, e.g. customer arrivals at a bank); <b>discrete</b> (state changes only at discrete time points) vs <b>continuous</b>.",
     "فيه 3 أزواج (سلايد 48): الـ <b>static</b> (الـ system في لحظة معينة) قصاد الـ <b>dynamic</b> (على فترة زمنية)، والـ <b>deterministic</b> (مفيهوش random variables، ونفس الـ inputs بتدي نفس الـ output، زي جدول محاضرات الكلية) قصاد الـ <b>stochastic</b> (فيه random variables، زي وصول الـ customers للبنك)، والـ <b>discrete</b> (الـ state بتتغير في نقط زمنية معينة بس) قصاد الـ <b>continuous</b>."
    ],
    [
     "Model tree (slide 50): static + stochastic = <b>Monte Carlo simulation</b>; dynamic + stochastic + discrete = <b>discrete-event simulation</b>. The course focuses on <b>discrete, dynamic, stochastic</b> simulation models (slide 49).",
     "شجرة الـ models (سلايد 50): الـ static مع الـ stochastic تبقى <b>Monte Carlo simulation</b>، والـ dynamic مع الـ stochastic مع الـ discrete تبقى <b>discrete-event simulation</b>. والكورس مركّز على الـ models الـ <b>discrete والـ dynamic والـ stochastic</b> (سلايد 49)."
    ],
    [
     "<b>Discrete-event simulation</b> (slide 51): the state changes only at a discrete set of points in time; the model is analyzed by <b>numerical methods</b> (computational procedures that \"solve\" the model); the model is <b>\"run\" rather than \"solved\"</b>.",
     "الـ <b>Discrete-event simulation</b> (سلايد 51): الـ state بتتغير بس في نقط زمنية معينة، والـ model بيتحلل بالـ <b>numerical methods</b> (خطوات حسابية بـ\"تحل\" الـ model)، والـ model <b>بيتعمله \"run\" مش \"solve\"</b>."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Performance metrics and response time",
   "ar_h": "الـ Performance metrics والـ response time",
   "pts": [
    [
     "A request has three outcomes (slide 53): <b>done correctly</b> → response time, throughput (rate), utilization (resources); <b>done incorrectly</b> (error j) → probability of the error, time between errors; <b>cannot do</b> (event k, e.g. server down) → duration of the event, time between events.",
     "الـ request ليه 3 نتايج (سلايد 53): <b>اتعمل صح</b> وليه الـ response time والـ throughput (rate) والـ utilization (resources)، و<b>اتعمل غلط</b> (error j) وليه احتمال الـ error والوقت بين الـ errors، و<b>ماينفعش يتعمل</b> (event k زي إن الـ server واقع) وليه مدة الـ event والوقت بين الـ events."
    ],
    [
     "Web-server values (slide 54): response time 300 ms = 0.3 s; throughput 8420 queries/min (≈ 140.3 per second) = 12.5 MB/s; utilization 48.4%; page-not-found probability p = 0.3; time between errors 30 min = 1800 s; server-down duration 1 hour = 3600 s; time between server-down events 1 day = 86400 s.",
     "قيم الـ web server (سلايد 54): الـ response time هو <bdi dir=\"ltr\">300 ms = 0.3 s</bdi>، والـ throughput هو <bdi dir=\"ltr\">8420 queries/min</bdi> (تقريبًا <bdi dir=\"ltr\">140.3</bdi> في الثانية) يعني <bdi dir=\"ltr\">12.5 MB/s</bdi>، والـ utilization <bdi dir=\"ltr\">48.4%</bdi>، واحتمال page not found هو <bdi dir=\"ltr\">p = 0.3</bdi>، والوقت بين الـ errors <bdi dir=\"ltr\">30 min = 1800 s</bdi>، ومدة وقوع الـ server ساعة يعني <bdi dir=\"ltr\">3600 s</bdi>، والوقت بين مرات الوقوع يوم يعني <bdi dir=\"ltr\">86400 s</bdi>."
    ],
    [
     "Time line (slide 56): <b>reaction time</b> = user finishes request → system starts execution; <b>response time</b> = user finishes request → system <b>starts</b> response (1st definition) or → system <b>completes</b> response (2nd); <b>think time</b> = system <b>completes</b> response → user starts next request. Example: finish 2 s, execution 3 s, response 5 s to 7 s, next request 12 s → reaction 1 s, response 3 s or 5 s, think 5 s.",
     "الـ time line (سلايد 56): الـ <b>reaction time</b> من ما الـ user يخلّص الـ request لحد ما الـ system يبدأ execution، والـ <b>response time</b> من ما الـ user يخلّص الـ request لحد ما الـ system <b>يبدأ</b> الرد (التعريف الأول) أو لحد ما <b>يخلّص</b> الرد (التعريف التاني)، والـ <b>think time</b> من ما الـ system <b>يخلّص</b> الرد لحد ما الـ user يبدأ الـ request اللي بعده. مثال: خلّص عند <bdi dir=\"ltr\">2 s</bdi>، والـ execution عند <bdi dir=\"ltr\">3 s</bdi>، والرد من <bdi dir=\"ltr\">5 s</bdi> لـ <bdi dir=\"ltr\">7 s</bdi>، والـ request الجاي عند <bdi dir=\"ltr\">12 s</bdi>، يبقى الـ reaction <bdi dir=\"ltr\">1 s</bdi>، والـ response <bdi dir=\"ltr\">3 s</bdi> أو <bdi dir=\"ltr\">5 s</bdi>، والـ think <bdi dir=\"ltr\">5 s</bdi>."
    ],
    [
     "Utility classes (slide 57): <b>lower is better</b> (response time), <b>higher is better</b> (throughput), <b>nominal is best</b> (utilization: too low wastes resources, too high causes delays).",
     "تصنيف الـ utility (سلايد 57): <b>lower is better</b> (زي الـ response time)، و<b>higher is better</b> (زي الـ throughput)، و<b>nominal is best</b> (زي الـ utilization، لو قليلة أوي بتضيّع resources ولو عالية أوي بتعمل delays)."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Steps of a simulation study, and simulation tools",
   "ar_h": "خطوات الـ simulation study، والـ simulation tools",
   "pts": [
    [
     "The <b>12 steps</b> (slide 59): (1) problem formulation, (2) setting of objectives and overall project plan, (3) model conceptualization, (4) data collection, (5) model translation, (6) <b>verified?</b> (does the program do what the model describes?), (7) <b>validated?</b> (do the results match reality? calibration), (8) experimental design, (9) production runs and analysis, (10) more runs?, (11) documentation and reporting, (12) implementation.",
     "الـ <b>12 خطوة</b> (سلايد 59):<span class=\"ltr\">(1) problem formulation, (2) setting of objectives and overall project plan, (3) model conceptualization, (4) data collection, (5) model translation, (6) verified?, (7) validated?, (8) experimental design, (9) production runs and analysis, (10) more runs?, (11) documentation and reporting, (12) implementation</span>والـ <b>verified</b> معناها: البرنامج بيعمل اللي الـ model بيوصفه؟ والـ <b>validated</b> معناها: النتايج زي الواقع؟ (calibration)."
    ],
    [
     "Loops: verified = No → back to <b>step 5</b>; validated = No → back to <b>steps 3 and 4</b>; more runs = Yes → back to step 9 or 8. <b>Four phases</b> (slide 60): (1) discovery and orientation, steps 1-2; (2) model building and data collection, steps 3-7; (3) run the model, steps 8-10; (4) implementation, steps 11-12. The <b>most crucial step is validation</b>: an invalid model can lead to dangerous and expensive decisions.",
     "الرجوع: لو الـ verified بـ No ترجع لـ <b>step 5</b>، ولو الـ validated بـ No ترجع لـ <b>steps 3 و 4</b>، ولو more runs بـ Yes ترجع لـ step 9 أو 8. و<b>الـ 4 phases</b> (سلايد 60): (1) الـ discovery and orientation (خطوات 1 و 2)، (2) الـ model building and data collection (من 3 لـ 7)، (3) الـ run the model (من 8 لـ 10)، (4) الـ implementation (11 و 12). و<b>أهم خطوة هي الـ validation</b>، لأن الـ model الغلط ممكن يودّي لقرارات خطيرة وغالية."
    ],
    [
     "Lecture-notes details: <b>verification</b> checks the operational (computer) model: are input parameters and logic correctly represented in the program; <b>validation</b> checks the model is an accurate representation of the real system by <b>calibration</b> (iterative comparison until accuracy is acceptable). Experimental design fixes run length, number of replications and initialization period; documentation is program documentation plus progress documentation.",
     "تفاصيل من الـ lecture notes: الـ <b>verification</b> بتتأكد من الـ operational (computer) model، يعني الـ input parameters والـ logic متمثلين صح في البرنامج، والـ <b>validation</b> بتتأكد إن الـ model بيمثل الـ system الحقيقي بدقة عن طريق الـ <b>calibration</b> (مقارنة متكررة لحد ما الدقة تبقى مقبولة). والـ experimental design بيحدد طول الـ run وعدد الـ replications وفترة الـ initialization، والـ documentation نوعين: program documentation وprogress documentation."
    ],
    [
     "<b>Three tool alternatives</b> (tools slide 2): a <b>general purpose language</b> (FORTRAN, PASCAL, MODULA, ADA, C/C++): little extra software cost, portable, no extra training, but every model starts from scratch, little reusable code, long development, difficult verification. A <b>general simulation language</b> (GPSS, SIMSCRIPT II.5, MODSIM III, SIMULA, SLAM, CSIM): standard modeling features, shorter development, help with verification, readable code, but higher software cost, extra training, limited portability.",
     "فيه <b>3 بدائل للأدوات</b> (tools سلايد 2): الـ <b>general purpose language</b> (زي FORTRAN وPASCAL وMODULA وADA وC/C++): تكلفة software إضافية قليلة وportable ومش محتاجة training زيادة، بس كل model بيبدأ من الصفر والكود اللي بيتعاد استخدامه قليل والتطوير طويل والـ verification صعبة. والـ <b>general simulation language</b> (زي GPSS وSIMSCRIPT II.5 وMODSIM III وSIMULA وSLAM وCSIM): فيها features قياسية للـ modeling والتطوير أقصر وبتساعد في الـ verification والكود مقروء، بس الـ software أغلى ومحتاجة training والـ portability محدودة."
    ],
    [
     "A <b>special purpose simulation package</b> (NETWORK II.5 for computer systems, <b>OPNET</b> for communication networks including wireless, COMNET III for communications networks, <b>SIMFACTORY</b> for manufacturing): very quick development of complex models, short learning cycle, no programming (minimal errors), but high cost, limited scope and <b>limited flexibility</b>. World-views: GPSS = transactions/facilities (block-structured, FORTRAN-based); SIMSCRIPT II.5 = English-like, compiled, complete language.",
     "والـ <b>special purpose simulation package</b> (زي NETWORK II.5 للـ computer systems، و<b>OPNET</b> للـ communication networks ومعاها الـ wireless، وCOMNET III للـ communications networks، و<b>SIMFACTORY</b> للـ manufacturing): تطوير سريع جدًا لـ models معقدة، و learning cycle قصير، ومفيش programming فالأخطاء قليلة، بس غالية ومجالها محدود و<b>الـ flexibility محدودة</b>. والـ world-views: الـ GPSS هي transactions/facilities (block-structured ومبنية على FORTRAN)، والـ SIMSCRIPT II.5 شبه الإنجليزي وcompiled ولغة كاملة."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "MCQs (Final 2025/26): systems that can be simulated → <b>all of the above</b> (transportation, manufacturing, health); software likely needed → <b>all of the above</b> (spreadsheet, simulation package, statistical software); Step 1 of a simulation analysis → <b>prepare a problem statement</b>; special-purpose simulation languages include → <b>GPSS/H</b> (also Final 2024/25; the slides list GPSS among general simulation languages, but it is the only simulation language among C++, Visual Basic and Fortran).",
     "أسئلة الاختياري <bdi dir=\"ltr\">(Final 2025/26)</bdi>: الـ systems اللي ينفع نعملها simulation، والإجابة <b>all of the above</b> (transportation وmanufacturing وhealth)، والـ software اللي غالبًا هنحتاجه، والإجابة <b>all of the above</b> (spreadsheet وsimulation package وstatistical software)، وأول خطوة في الـ simulation analysis، والإجابة <b>prepare a problem statement</b>، والـ special-purpose simulation languages، والإجابة <b>GPSS/H</b> (جت كمان في Final 2024/25؛ السلايدز حاطة الـ GPSS مع الـ general simulation languages، بس هي لغة الـ simulation الوحيدة جنب C++ وVisual Basic وFortran)."
    ],
    [
     "T/F (Final 2025/26): not appropriate when no input data → <b>True</b>; can study new hardware designs, layouts, protocols, networks → <b>True</b>; we use simulation when model building requires training → <b>False</b> (a disadvantage); endogenous = events in the environment → <b>False</b> (that is exogenous); models without random variables are stochastic → <b>False</b> (deterministic); static = a system at a particular point in time → <b>True</b>; Monte Carlo is static-stochastic → <b>True</b>; think time starts when the system <i>starts</i> its response → <b>False</b> (when it completes it); Modula and ADA are general simulation languages → <b>False</b> (general purpose languages; the revision sheet marks it True, the slides decide).",
     "صح وغلط <bdi dir=\"ltr\">(Final 2025/26)</bdi>: مش مناسبة لما مفيش input data، والإجابة <b>True</b>؛ وبتدرس hardware designs وlayouts وprotocols وnetworks جديدة، والإجابة <b>True</b>؛ وبنستخدم الـ simulation لما بناء الـ model يحتاج training، والإجابة <b>False</b> (ده عيب)؛ والـ endogenous هي events في الـ environment، والإجابة <b>False</b> (دي الـ exogenous)؛ والـ models اللي مفيهاش random variables اسمها stochastic، والإجابة <b>False</b> (اسمها deterministic)؛ والـ static بتمثل الـ system في لحظة معينة، والإجابة <b>True</b>؛ والـ Monte Carlo هي static-stochastic، والإجابة <b>True</b>؛ والـ think time بيبدأ لما الـ system <i>يبدأ</i> الرد، والإجابة <b>False</b> (لما يخلّصه)؛ والـ Modula والـ ADA general simulation languages، والإجابة <b>False</b> (دول general purpose languages؛ الـ revision sheet بتقول True بس السلايدز هي اللي بتحكم)."
    ],
    [
     "MCQs (Final 2024/25): not an application area → <b>food industry</b>; a deterministic model contains → <b>no random variables</b>; most common form of dynamic simulation → <b>discrete event simulation</b>; model that follows changes over time → <b>dynamic model</b>; disadvantages (manpower and time, results hard to interpret, expensive) → <b>all of the above</b>.",
     "أسئلة الاختياري <bdi dir=\"ltr\">(Final 2024/25)</bdi>: حاجة مش من الـ application areas، والإجابة <b>food industry</b>؛ والـ deterministic model فيه، والإجابة <b>no random variables</b>؛ وأشهر شكل للـ dynamic simulation، والإجابة <b>discrete event simulation</b>؛ والـ model اللي بيتابع التغيير مع الوقت، والإجابة <b>dynamic model</b>؛ والعيوب (manpower ووقت، ونتايج صعب تتفهم، وغالية)، والإجابة <b>all of the above</b>."
    ],
    [
     "T/F (Final 2024/25): measurements use an existing instance → <b>True</b>; knowledge from simulations cannot improve the system → <b>False</b>; time can be compressed or expanded → <b>True</b>; exogenous = within the system → <b>False</b>; system state definition → <b>True</b>; response time, throughput, utilization for correct service → <b>True</b>; verified = \"does the program do what the model describes?\" → <b>True</b>; a simulation model is a particular type of mathematical model → <b>True</b>.",
     "صح وغلط <bdi dir=\"ltr\">(Final 2024/25)</bdi>: الـ measurements بتستخدم نسخة موجودة من الـ system، والإجابة <b>True</b>؛ والمعرفة من الـ simulation مش بتحسّن الـ system، والإجابة <b>False</b>؛ والوقت ممكن يتضغط أو يتمط، والإجابة <b>True</b>؛ والـ exogenous جوه الـ system، والإجابة <b>False</b>؛ وتعريف الـ system state، والإجابة <b>True</b>؛ والـ response time والـ throughput والـ utilization للخدمة الصح، والإجابة <b>True</b>؛ والـ verified معناها \"البرنامج بيعمل اللي الـ model بيوصفه؟\"، والإجابة <b>True</b>؛ والـ simulation model نوع من الـ mathematical model، والإجابة <b>True</b>."
    ],
    [
     "Revision-sheet traps (same style): reaction time ends when the system <i>starts execution</i>, not response → the \"starts response\" version is <b>False</b>; the study has <b>four</b> phases, not three; there are <b>three</b> tool alternatives, not two; \"portable, no extra cost or training\" are <b>advantages</b> of general purpose languages; head of water and temperature are <b>continuous</b>; applications are not health care and military only.",
     "فخاخ الـ revision sheet (بنفس الأسلوب): الـ reaction time بيخلص لما الـ system <i>يبدأ execution</i> مش لما يبدأ الرد، فجملة \"starts response\" إجابتها <b>False</b>؛ والـ study ليها <b>4</b> phases مش 3؛ وبدائل الأدوات <b>3</b> مش 2؛ و\"portable ومفيش تكلفة ولا training زيادة\" دي <b>مميزات</b> الـ general purpose languages؛ ومنسوب المية ودرجة الحرارة <b>continuous</b>؛ والاستخدامات مش health care وmilitary بس."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Simulation tables and what describes a queueing system",
   "ar_h": "الـ Simulation tables، وإيه اللي بيوصف الـ queueing system",
   "pts": [
    [
     "A <b>simulation table</b> is built in 3 steps (slide 5): (1) determine the characteristics of each input; (2) construct a table with p inputs x<sub>ij</sub> and one response y<sub>i</sub>; (3) for each repetition i generate a value for each input and calculate the response. Done by pen and paper or a spreadsheet.",
     "الـ <b>Simulation table</b> بيتبني في 3 خطوات (سلايد 5): (1) تحدد خصائص كل input، (2) تعمل جدول فيه p inputs <bdi dir=\"ltr\">x<sub>ij</sub></bdi> وresponse واحد <bdi dir=\"ltr\">y<sub>i</sub></bdi>، (3) في كل repetition i تولّد قيمة لكل input وتحسب الـ response. وبيتعمل بالورقة والقلم أو بـ spreadsheet."
    ],
    [
     "A queueing system is described by (slide 8): <b>calling population, arrival rate, service mechanism, system capacity, queueing discipline</b>. Calling population <b>infinite</b>: the arrival rate is not affected by how many joined; <b>finite</b>: it depends on how many are in the system (five tire-curing machines, one worker: all five open → arrival rate <b>0</b>).",
     "الـ queueing system بيتوصف بـ (سلايد 8): الـ <b>calling population</b> والـ <b>arrival rate</b> والـ <b>service mechanism</b> والـ <b>system capacity</b> والـ <b>queueing discipline</b>. لو الـ calling population <b>infinite</b> الـ arrival rate مش بيتأثر بعدد اللي دخلوا، ولو <b>finite</b> بيعتمد على عدد اللي في الـ system (خمس مكن tire-curing وعامل واحد: لو الخمسة open يبقى الـ arrival rate <bdi dir=\"ltr\">0</bdi>)."
    ],
    [
     "Capacity: with a limit we separate the <b>arrival rate</b> from the <b>effective rate</b> (those who arrive and enter); car wash for 10 cars: a customer finding it full returns to the population. Arrivals: <b>random</b> (Poisson process), <b>scheduled</b> (constant, maybe ± a small amount), or <b>at least one customer always present</b>.",
     "الـ capacity: لو فيه حد أقصى بنفرّق بين الـ <b>arrival rate</b> والـ <b>effective rate</b> (اللي وصلوا ودخلوا فعلًا)، زي مغسلة عربيات بتساع 10 عربيات، اللي يلاقيها مليانة يرجع للـ population. والوصول نوعين وتالت: <b>random</b> (Poisson process)، و<b>scheduled</b> (ثابت أو ثابت مع فرق صغير)، أو <b>دايمًا فيه customer واحد على الأقل</b>."
    ],
    [
     "Queue behavior: <b>balk</b> (leave on seeing a long line), <b>renege</b> (leave after waiting because the line moves slowly), <b>jockey</b> (switch lines). Disciplines: <b>FIFO, LIFO, SIRO</b> (random order), <b>SPT</b> (shortest processing time), <b>PR</b> (priority). Service: c = 1, 1 &lt; c &lt; ∞, or c = ∞ (self service).",
     "سلوك الـ queue: الـ <b>balk</b> (يمشي أول ما يشوف الطابور طويل)، والـ <b>renege</b> (يمشي بعد ما استنى عشان الطابور بطيء)، والـ <b>jockey</b> (ينقل من طابور لطابور). والـ disciplines هي:<span class=\"ltr\">FIFO, LIFO, SIRO (random order), SPT (shortest processing time), PR (priority)</span>وعدد الـ servers يا <bdi dir=\"ltr\">c = 1</bdi> يا <bdi dir=\"ltr\">1 &lt; c &lt; ∞</bdi> يا <bdi dir=\"ltr\">c = ∞</bdi> (self service)."
    ],
    [
     "Notation <b>A/B/c/N/K</b>: A = interarrival-time distribution, B = service-time distribution, c = parallel servers, N = system capacity, K = calling-population size. Symbols: <b>M</b> exponential (Markov), <b>D</b> constant, <b>E<sub>k</sub></b> Erlang, <b>GI</b> general independent. M/M/1/∞/∞ = M/M/1; the tire-curing system is G/G/1/5/5.",
     "الـ notation هو <bdi dir=\"ltr\"><b>A/B/c/N/K</b></bdi>، والـ A هو توزيع الـ interarrival time، والـ B توزيع الـ service time، والـ c عدد الـ servers المتوازيين، والـ N هو الـ system capacity، والـ K حجم الـ calling population. والرموز:<span class=\"ltr\">M = exponential (Markov), D = constant, E<sub>k</sub> = Erlang, GI = general independent</span>والـ <bdi dir=\"ltr\">M/M/1/∞/∞</bdi> بنكتبه <bdi dir=\"ltr\">M/M/1</bdi>، والـ tire-curing system هو <bdi dir=\"ltr\">G/G/1/5/5</bdi>."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Single-server queue: state, events and the table rules",
   "ar_h": "الـ Single-server queue: الـ state والـ events وقواعد الجدول",
   "pts": [
    [
     "Assumptions (slide 9): infinite calling population, <b>FIFO</b>, interarrival and service times from distributions; arrival rate <b>less than</b> service rate → <b>stable</b>; otherwise the line grows unbounded → <b>unstable</b>.",
     "الفروض (سلايد 9): الـ calling population infinite، والخدمة <b>FIFO</b>، والـ interarrival والـ service times جايين من distributions، ولو الـ arrival rate <b>أقل من</b> الـ service rate يبقى الـ system <b>stable</b>، غير كده الطابور بيكبر من غير حد ويبقى <b>unstable</b>."
    ],
    [
     "<b>State</b> = number of units in the system + status of the server (idle, busy); <b>events</b> = arrival and departure; a clock tracks simulated time. Arrival: server busy? No → enter service, Yes → enter queue. Departure: another unit waiting? Yes → serve it, No → server idle. <b>Impossible</b> cells: server idle with a non-empty queue; after a service completion, busy with an empty queue.",
     "الـ <b>State</b> هي عدد الـ units في الـ system وحالة الـ server (idle أو busy)، والـ <b>events</b> هي الـ arrival والـ departure، وفيه clock بيعدّ الوقت. في الـ arrival: الـ server busy؟ لو لأ يدخل الخدمة، ولو آه يدخل الـ queue. وفي الـ departure: فيه unit مستنية؟ لو آه تتخدم، ولو لأ الـ server يبقى idle. والحالات <b>المستحيلة</b>: server idle والـ queue مش فاضية، وبعد ما الخدمة تخلص server busy والـ queue فاضية."
    ],
    [
     "Table rules: arrival(i) = arrival(i−1) + interarrival(i), first at 0; <b>begin = max(arrival, previous end)</b>; end = begin + service; <b>wait</b> = begin − arrival; <b>time in system</b> = end − arrival; <b>idle</b> = arrival − previous end if positive, else 0.",
     "قواعد الجدول:<span class=\"ltr\">arrival(i) = arrival(i−1) + interarrival(i), arrival(1) = 0<br>begin = max(arrival, previous end)<br>end = begin + service<br>wait = begin − arrival<br>time in system = end − arrival<br>idle = arrival − previous end (if &gt; 0, else 0)</span>"
    ],
    [
     "Six-customer run (slides 11-12): arrivals 0, 2, 6, 7, 9, 15; services 2, 1, 3, 2, 1, 4. Customer 4 arrives at 7 but 3 is served until 9 → begins 9, ends 11; customer 5 begins 11, ends 12; customer 6 arrives at 15 to an idle server, ends 19. Events can coincide (time 2: departure 1 + arrival 2; time 9: departure 3 + arrival 5); at most <b>2</b> customers are in the system (7 to 11).",
     "الـ run بتاع الـ 6 customers (سلايد 11 و 12): الوصول <bdi dir=\"ltr\">0, 2, 6, 7, 9, 15</bdi> والخدمة <bdi dir=\"ltr\">2, 1, 3, 2, 1, 4</bdi>. الـ customer 4 وصل <bdi dir=\"ltr\">7</bdi> بس 3 بيتخدم لحد <bdi dir=\"ltr\">9</bdi>، فبيبدأ <bdi dir=\"ltr\">9</bdi> ويخلص <bdi dir=\"ltr\">11</bdi>، والـ 5 يبدأ <bdi dir=\"ltr\">11</bdi> ويخلص <bdi dir=\"ltr\">12</bdi>، والـ 6 يوصل <bdi dir=\"ltr\">15</bdi> والـ server فاضي ويخلص <bdi dir=\"ltr\">19</bdi>. والـ events ممكن تحصل في نفس اللحظة (عند <bdi dir=\"ltr\">2</bdi> مغادرة 1 ووصول 2، وعند <bdi dir=\"ltr\">9</bdi> مغادرة 3 ووصول 5)، وأقصى عدد في الـ system هو <bdi dir=\"ltr\">2</bdi> (من <bdi dir=\"ltr\">7</bdi> لـ <bdi dir=\"ltr\">11</bdi>)."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "The grocery: inputs and the seven statistics",
   "ar_h": "الـ Grocery: الـ inputs والـ 7 statistics",
   "pts": [
    [
     "Inputs (slide 14): one checkout counter; interarrival times uniform on {1, …, 8} (0.125 each); service times 1 to 6 with probabilities 0.10, 0.20, 0.30, 0.25, 0.10, 0.05 (cumulative 0.10, 0.30, 0.60, 0.85, 0.95, 1.00). Weak points: the sample is too small and the initial condition is not considered.",
     "الـ inputs (سلايد 14): checkout counter واحد، والـ interarrival times uniform على <bdi dir=\"ltr\">{1, …, 8}</bdi> (كل واحدة <bdi dir=\"ltr\">0.125</bdi>)، والـ service times من 1 لـ 6 باحتمالات:<span class=\"ltr\">0.10, 0.20, 0.30, 0.25, 0.10, 0.05 (cumulative 0.10, 0.30, 0.60, 0.85, 0.95, 1.00)</span>ونقط الضعف: الـ sample صغيرة أوي والـ initial condition مش متحسوبة."
    ],
    [
     "100-customer totals (slide 15): interarrival 415, service 317, waiting 174, time in system 491, idle 101; the last service ends at <b>418</b> (the run time). Statistics (slide 16): w̄ = 174/100 = <b>1.74</b> min; p(wait) = 46/100 = <b>0.46</b>; p(idle) = 101/418 = <b>0.24</b>; s̄ = 317/100 = <b>3.17</b> vs E(s) = Σ s·p(s) = <b>3.2</b>.",
     "إجماليات الـ 100 customer (سلايد 15): interarrival <bdi dir=\"ltr\">415</bdi>، وservice <bdi dir=\"ltr\">317</bdi>، وwaiting <bdi dir=\"ltr\">174</bdi>، وtime in system <bdi dir=\"ltr\">491</bdi>، وidle <bdi dir=\"ltr\">101</bdi>، وآخر خدمة خلصت عند <bdi dir=\"ltr\"><b>418</b></bdi> (ده الـ run time). والـ statistics (سلايد 16):<span class=\"ltr\">w̄ = 174/100 = 1.74 min<br>p(wait) = 46/100 = 0.46<br>p(idle) = 101/418 = 0.24<br>s̄ = 317/100 = 3.17,  E(s) = Σ s·p(s) = 3.2</span>"
    ],
    [
     "Average time between arrivals = 415 / <b>99</b> = 4.19 min (divide by arrivals − 1, since customer 1 arrives at 0) vs E(τ) = (1 + 8)/2 = <b>4.5</b>. Average wait of those who wait = 174/54 = <b>3.22</b> on the slide; the slide is inconsistent (46 waiters elsewhere, giving 174/46 = 3.78), so know the method: total wait ÷ number who waited. t̄ = 491/100 = <b>4.91</b> = w̄ + s̄ = 1.74 + 3.17.",
     "متوسط الوقت بين الـ arrivals هو <bdi dir=\"ltr\">415 / 99 = 4.19 min</bdi> (بنقسم على عدد الـ arrivals ناقص واحد لأن أول customer بيوصل عند صفر)، والمتوقع <bdi dir=\"ltr\">E(τ) = (1 + 8)/2 = 4.5</bdi>. ومتوسط انتظار اللي استنوا على السلايد <bdi dir=\"ltr\">174/54 = 3.22</bdi>، والسلايد مش متسق (في حتة تانية اللي استنوا <bdi dir=\"ltr\">46</bdi> فتطلع <bdi dir=\"ltr\">174/46 = 3.78</bdi>)، فاحفظ الطريقة: إجمالي الانتظار على عدد اللي استنوا فعلًا. و:<span class=\"ltr\">t̄ = 491/100 = 4.91 = w̄ + s̄ = 1.74 + 3.17</span>"
    ],
    [
     "Interpretation (slide 17): the average wait is not high; the server is well loaded (not an undue amount of idle time); nearly half (46%) of the customers wait; a longer run would increase accuracy (the histogram of 50 trials spreads the average wait from 0.5 to over 4.5 minutes).",
     "التفسير (سلايد 17): متوسط الانتظار مش عالي، والـ server شغال كويس (مفيش idle time زيادة)، وتقريبًا نص الـ customers (<bdi dir=\"ltr\">46%</bdi>) بيستنوا، والـ run الأطول بيزوّد الدقة (الـ histogram بتاع 50 trial بيوزّع متوسط الانتظار من <bdi dir=\"ltr\">0.5</bdi> لأكتر من <bdi dir=\"ltr\">4.5</bdi> دقيقة)."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Random digits, Example 2.2 and the Able-Baker carhops",
   "ar_h": "الـ Random digits ومثال 2.2 والـ carhops بتوع Able وBaker",
   "pts": [
    [
     "Random digits are assigned by the <b>cumulative</b> probabilities. Interarrival (3 digits, 0.125 each): 001–125 → 1, 126–250 → 2, …, 876–000 → 8 (e.g. 913 → 8). Service (2 digits): 01–10 → 1, 11–30 → 2, 31–60 → 3, 61–85 → 4, 86–95 → 5, 96–00 → 6. Twenty customers need only <b>19</b> arrival numbers (the first arrives at 0).",
     "الـ random digits بتتوزع حسب الاحتمالات الـ <b>cumulative</b>. الـ interarrival (3 digits، كل واحدة <bdi dir=\"ltr\">0.125</bdi>):<span class=\"ltr\">001–125 → 1, 126–250 → 2, …, 876–000 → 8   (913 → 8)</span>والـ service (2 digits):<span class=\"ltr\">01–10 → 1, 11–30 → 2, 31–60 → 3, 61–85 → 4, 86–95 → 5, 96–00 → 6</span>والـ 20 customer محتاجين بس <bdi dir=\"ltr\">19</bdi> رقم للوصول (الأول بيوصل عند صفر)."
    ],
    [
     "Example 2.2 (20 customers): service 68, wait 56, time in system 124, idle 18, run ends at 86. So w̄ = 56/20 = <b>2.8</b>; p(wait) = 13/20 = <b>0.65</b>; p(idle) = 18/86 = <b>0.21</b> (busy 0.79); s̄ = 68/20 = <b>3.4</b> vs E(S) = 3.2; average interarrival = 82/19 = <b>4.3</b> vs 4.5; wait of waiters = 56/13 = <b>4.3</b>; time in system = 124/20 = <b>6.2</b> = 2.8 + 3.4. (Source slip: customer 15's service digits 79 should give 4 min, the notes use 5.)",
     "مثال 2.2 (20 customer): الخدمة <bdi dir=\"ltr\">68</bdi>، والانتظار <bdi dir=\"ltr\">56</bdi>، والوقت في الـ system <bdi dir=\"ltr\">124</bdi>، والـ idle <bdi dir=\"ltr\">18</bdi>، والـ run بيخلص عند <bdi dir=\"ltr\">86</bdi>. يبقى:<span class=\"ltr\">w̄ = 56/20 = 2.8,  p(wait) = 13/20 = 0.65<br>p(idle) = 18/86 = 0.21 (busy 0.79)<br>s̄ = 68/20 = 3.4 vs E(S) = 3.2<br>interarrival = 82/19 = 4.3 vs 4.5<br>wait of waiters = 56/13 = 4.3<br>time in system = 124/20 = 6.2 = 2.8 + 3.4</span>(غلطة في المصدر: الـ customer 15 الـ service digits بتاعته 79 المفروض تدي 4 دقايق، والـ notes استخدمت 5.)"
    ],
    [
     "<b>Able-Baker</b> (two servers): Able (faster) gets the car if both are idle (<b>seniority</b>); if one is idle it serves; if both are busy the car waits for the first one free. Read the service digits in the table of whoever serves. Arrivals 1–4 min (0.25, 0.40, 0.20, 0.15); Able 2–5 min, Baker 3–6 min. Five event types: arrival, begin/end service with Able, begin/end with Baker.",
     "الـ <b>Able-Baker</b> (اتنين servers): الـ Able (الأسرع) بياخد العربية لو الاتنين فاضيين (<b>seniority</b>)، ولو واحد بس فاضي هو اللي يخدم، ولو الاتنين مشغولين العربية تستنى أول واحد يفضى. والـ service digits بتتقري من جدول اللي بيخدم. الوصول من 1 لـ 4 دقايق (<bdi dir=\"ltr\">0.25, 0.40, 0.20, 0.15</bdi>)، والـ Able من 2 لـ 5، والـ Baker من 3 لـ 6. وفيه 5 أنواع events: وصول، وبداية ونهاية خدمة مع Able، وبداية ونهاية مع Baker."
    ],
    [
     "Able-Baker results (62 minutes, 26 cars): Able busy 56/62 = <b>90%</b>, Baker 43/62 = <b>69%</b>; average wait (all) = 11/26 = <b>0.42</b> min; 9 cars waited, on average 11/9 = <b>1.22</b> min. The system is well balanced: one server is not enough and three would probably be too many.",
     "نتايج الـ Able-Baker (62 دقيقة و26 عربية):<span class=\"ltr\">Able busy = 56/62 = 90%,  Baker busy = 43/62 = 69%<br>average wait (all) = 11/26 = 0.42 min<br>9 cars waited: 11/9 = 1.22 min</span>والـ system متوازن: server واحد مش كفاية، وتلاتة غالبًا كتير."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Inventory: the (M, N) system and the newspaper seller",
   "ar_h": "الـ Inventory: الـ (M, N) system وبتاع الجرايد",
   "pts": [
    [
     "<b>(M, N) system</b> (slide 19): N = review period length, M = standard inventory level, Q<sub>i</sub> = order to fill up to M. Events: demand, review, receipt of an order at the end of each review (with zero lead time review and receipt are <b>simultaneous</b>). Performance measure: total cost (or profit). A buffer stock avoids shortages; stock costs storage space, guards, interest; frequent orders raise ordering cost; shortages lose goodwill.",
     "الـ <b>(M, N) system</b> (سلايد 19): الـ N طول فترة الـ review، والـ M هو الـ standard inventory level، والـ <bdi dir=\"ltr\">Q<sub>i</sub></bdi> الطلبية اللي بتكمّل لحد M. والـ events: الـ demand والـ review واستلام الطلبية آخر كل review (ولو الـ lead time صفر الـ review والاستلام بيحصلوا <b>في نفس الوقت</b>). ومقياس الأداء هو الـ total cost (أو الـ profit). والـ buffer stock بيمنع الـ shortage، والمخزون تكلفته مكان وحراسة وفوايد، والطلب الكتير بيزوّد الـ ordering cost، والـ shortage بيخسّرك الـ goodwill."
    ],
    [
     "<b>Newspaper seller</b>: buy at 33¢, sell at 50¢, scrap at 5¢, bundles of 10. Newsday types good/fair/poor = 0.35/0.45/0.20 (digits 01–35, 36–80, 81–00); demand digits are read in that type's column. Profit = revenue − cost − <b>lost profit</b> (50 − 33 = <b>17¢</b> per paper demanded but not available) + salvage.",
     "بتاع الـ <b>Newspaper</b>: بيشتري بـ <bdi dir=\"ltr\">33¢</bdi> ويبيع بـ <bdi dir=\"ltr\">50¢</bdi> والـ scrap بـ <bdi dir=\"ltr\">5¢</bdi>، وبيشتري حزم 10. أنواع الأيام good وfair وpoor باحتمالات <bdi dir=\"ltr\">0.35/0.45/0.20</bdi> (الأرقام <bdi dir=\"ltr\">01–35</bdi> و<bdi dir=\"ltr\">36–80</bdi> و<bdi dir=\"ltr\">81–00</bdi>)، وأرقام الـ demand بتتقري من عمود نوع اليوم. والربح:<span class=\"ltr\">profit = revenue − cost − lost profit + salvage</span>والـ lost profit هو <bdi dir=\"ltr\">50 − 33 = 17¢</bdi> لكل جورنال اتطلب ومكانش موجود."
    ],
    [
     "Worked (70 papers, cost 70 × 0.33 = <b>$23.10</b>): day 1, demand 60 → $30.00 − $23.10 + 10 × $0.05 = <b>$7.40</b>; day 5, demand 90 → $35.00 − $23.10 − 20 × $0.17 = <b>$8.50</b>. 20-day total = $645.00 − $462.00 − $13.60 + $5.50 = <b>$174.90</b>; repeat for other policies (60, 80, …) and compare.",
     "مثال محلول (70 جورنال، التكلفة <bdi dir=\"ltr\">70 × 0.33 = $23.10</bdi>):<span class=\"ltr\">day 1, demand 60: 30.00 − 23.10 + 10 × 0.05 = $7.40<br>day 5, demand 90: 35.00 − 23.10 − 20 × 0.17 = $8.50<br>20 days: 645.00 − 462.00 − 13.60 + 5.50 = $174.90</span>وبعدين تعيد لـ policies تانية (60 و80 …) وتقارن."
    ],
    [
     "Example 2.5 (M = 11, N = 5): order quantity = M − ending inventory (+ backorders); lead-time digits 1–6 → 1 day, 7–9 → 2, 0 → 3; start with 3 units and 8 arriving in 2 days. Backordered shortages are filled first when an order arrives. Average ending inventory = 88/25 ≈ <b>3.5</b> units; a shortage on <b>2 of 25</b> days.",
     "مثال 2.5 (<bdi dir=\"ltr\">M = 11, N = 5</bdi>): الطلبية = M ناقص الـ ending inventory (زائد الـ backorders)، وأرقام الـ lead time:<span class=\"ltr\">1–6 → 1 day, 7–9 → 2 days, 0 → 3 days</span>والبداية 3 وحدات و8 جايين بعد يومين. ولما الطلبية توصل الـ shortage المتأجل بيتسدّ الأول. ومتوسط الـ ending inventory هو <bdi dir=\"ltr\">88/25 ≈ 3.5</bdi>، والـ shortage حصل في <bdi dir=\"ltr\">2</bdi> من <bdi dir=\"ltr\">25</bdi> يوم."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Inventory slides: reorder point, costs and the 10-day run",
   "ar_h": "سلايدز الـ Inventory: الـ reorder point والتكاليف والـ run بتاع 10 أيام",
   "pts": [
    [
     "Objective: minimize <b>Tc(x, r)</b> over order quantity x and reorder point r; <b>Tc = Hc + Oc + Sc</b>: holding $0.10 per unit per day, ordering $20 per order, shortage $50 per unit. Assumption: never two orders outstanding at once. Start: I₀ = 5, x = 5, r = 3.",
     "الهدف إنك تقلل <bdi dir=\"ltr\"><b>Tc(x, r)</b></bdi> بالنسبة للـ order quantity x والـ reorder point r، و:<span class=\"ltr\">Tc = Hc + Oc + Sc</span>والـ holding <bdi dir=\"ltr\">$0.10</bdi> للوحدة في اليوم، والـ ordering <bdi dir=\"ltr\">$20</bdi> للطلبية، والـ shortage <bdi dir=\"ltr\">$50</bdi> للوحدة. والفرض إن عمر ما يبقى فيه طلبيتين مستنيين مع بعض. والبداية:<span class=\"ltr\">I₀ = 5, x = 5, r = 3</span>"
    ],
    [
     "Random-number intervals include the <b>lower end</b>: demand 0.00–0.49999 → 0, 0.50–0.74999 → 1, 0.75–0.89999 → 2, 0.90–0.94999 → 3, 0.95–0.99999 → 4 (0.866 → 2, 0.975 → 4); lead time 0.00–0.19999 → 1, 0.20–0.29999 → 2, 0.30–0.69999 → 3, 0.70–0.89999 → 4, 0.90–0.99999 → 5 (0.620 → 3, 0.939 → 5). Relative frequency = frequency / total (12/30 = 0.40).",
     "فترات الـ random numbers بتشمل <b>الطرف الأصغر</b>. الـ demand:<span class=\"ltr\">0.00–0.49999 → 0, 0.50–0.74999 → 1, 0.75–0.89999 → 2,<br>0.90–0.94999 → 3, 0.95–0.99999 → 4   (0.866 → 2, 0.975 → 4)</span>والـ lead time:<span class=\"ltr\">0.00–0.19999 → 1, 0.20–0.29999 → 2, 0.30–0.69999 → 3,<br>0.70–0.89999 → 4, 0.90–0.99999 → 5   (0.620 → 3, 0.939 → 5)</span>والـ relative frequency هي الـ frequency على الإجمالي (<bdi dir=\"ltr\">12/30 = 0.40</bdi>)."
    ],
    [
     "Daily flow (inventory slide 8): any arrival → I = I + x; generate demand d; if I ≥ d → I = I − d, else shortage cost 50(d − I) and I = 0; if I ≤ r and <b>no order outstanding</b> → order ($20) and generate lead time L (an order placed on day t with L arrives at the start of day t + L); holding cost 0.10 × I; total = holding + order + shortage.",
     "خطوات اليوم (inventory سلايد 8): لو فيه طلبية وصلت يبقى <bdi dir=\"ltr\">I = I + x</bdi>، وبعدين تولّد الـ demand d، لو <bdi dir=\"ltr\">I ≥ d</bdi> يبقى <bdi dir=\"ltr\">I = I − d</bdi>، غير كده الـ shortage cost هو <bdi dir=\"ltr\">50(d − I)</bdi> و<bdi dir=\"ltr\">I = 0</bdi>، ولو <bdi dir=\"ltr\">I ≤ r</bdi> و<b>مفيش طلبية مستنية</b> تطلب (<bdi dir=\"ltr\">$20</bdi>) وتولّد الـ lead time L (الطلبية اللي اتطلبت يوم t بـ L بتوصل أول يوم <bdi dir=\"ltr\">t + L</bdi>)، والـ holding هو <bdi dir=\"ltr\">0.10 × I</bdi>، والـ total هو مجموعهم."
    ],
    [
     "10-day run: day 4 ends at 3 = r → order, L = 3, arrives day 7; days 5-6 no new order (one outstanding); day 6 starts with 1, demand 4 → 3 short = <b>$150</b>; day 8 ends at 2 → order, L = 5. Averages per day: holding 0.27, order 4.00, shortage 15.00, total <b>$19.27</b>. The 1000-day simulator's best cell is <b>r = 6, x = 20 ($2.10)</b>; in the refined table the slide marks r = 6, x = 22 (2.33), though r = 7, x = 29 shows 2.32.",
     "الـ run بتاع 10 أيام: يوم 4 خلص بـ 3 يعني r فبنطلب و<bdi dir=\"ltr\">L = 3</bdi> فتوصل يوم 7، ويوم 5 و6 مفيش طلب جديد (فيه طلبية مستنية)، ويوم 6 بدأ بـ 1 والـ demand 4 فيبقى 3 ناقصين يعني <bdi dir=\"ltr\">$150</bdi>، ويوم 8 خلص بـ 2 فبنطلب و<bdi dir=\"ltr\">L = 5</bdi>. والمتوسط في اليوم:<span class=\"ltr\">holding 0.27 + order 4.00 + shortage 15.00 = $19.27</span>وأحسن خانة في الـ simulator بتاع 1000 يوم هي <bdi dir=\"ltr\">r = 6, x = 20 ($2.10)</bdi>، وفي الجدول المتفصّل السلايد معلّم <bdi dir=\"ltr\">r = 6, x = 22 (2.33)</bdi> مع إن <bdi dir=\"ltr\">r = 7, x = 29</bdi> فيها <bdi dir=\"ltr\">2.32</bdi>."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "T/F (Final 2025/26): \"the arrival rate must be less than the service rate to say the system is <i>unstable</i>\" → <b>False</b>: arrival rate &lt; service rate means <b>stable</b>.",
     "صح وغلط <bdi dir=\"ltr\">(Final 2025/26)</bdi>: \"الـ arrival rate لازم يبقى أقل من الـ service rate عشان نقول الـ system <i>unstable</i>\"، والإجابة <b>False</b>: لما الـ arrival rate أقل من الـ service rate يبقى <b>stable</b>."
    ],
    [
     "Written (Final 2024/25, Q3-b, a hypermarket inventory, also in the case-study style): weekly demand 0–5 (0.10, 0.30, 0.20, 0.30, 0.05, 0.05), lead time 1–4 weeks (0.20, 0.15, 0.60, 0.05); holding $5 per unit per week, $200 per order, $20 per unit short; I₀ = 10, order 15, reorder point 5; simulate 10 weeks with given random numbers. Method: build the cumulative intervals (lower end included) and follow the daily flow week by week.",
     "سؤال مقالي (<bdi dir=\"ltr\">Final 2024/25, Q3-b</bdi>، مخزون hypermarket، وبنفس أسلوب الـ case studies): الـ demand الأسبوعي من 0 لـ 5 (<bdi dir=\"ltr\">0.10, 0.30, 0.20, 0.30, 0.05, 0.05</bdi>)، والـ lead time من 1 لـ 4 أسابيع (<bdi dir=\"ltr\">0.20, 0.15, 0.60, 0.05</bdi>)، والـ holding <bdi dir=\"ltr\">$5</bdi> للوحدة في الأسبوع، و<bdi dir=\"ltr\">$200</bdi> للطلبية، و<bdi dir=\"ltr\">$20</bdi> للوحدة الناقصة، والبداية 10، والطلبية 15، والـ reorder point 5، وتعمل simulation لـ 10 أسابيع بأرقام عشوائية معطاة. الطريقة: تعمل الفترات الـ cumulative (شاملة الطرف الأصغر) وتمشي على خطوات اليوم أسبوع بأسبوع."
    ],
    [
     "Its result: demand 1, 1, 1, 4, 4, 2, 4, 4, 1, 3; week 4 ends at 3 → order (lead RN 0.248 → 2 weeks, arrives week 6); week 5: demand 4 with 3 on hand → 1 short ($20); week 8 ends at 5 ≤ 5 → order (0.116 → 1 week, arrives week 9). Totals: holding $445, ordering $400, shortage $20, <b>total $865</b> ($86.50 per week).",
     "النتيجة: الـ demand هو <bdi dir=\"ltr\">1, 1, 1, 4, 4, 2, 4, 4, 1, 3</bdi>، وأسبوع 4 خلص بـ 3 فبنطلب (رقم الـ lead <bdi dir=\"ltr\">0.248</bdi> يعني أسبوعين، فتوصل أسبوع 6)، وأسبوع 5 الـ demand 4 والموجود 3 فواحد ناقص (<bdi dir=\"ltr\">$20</bdi>)، وأسبوع 8 خلص بـ <bdi dir=\"ltr\">5 ≤ 5</bdi> فبنطلب (<bdi dir=\"ltr\">0.116</bdi> يعني أسبوع، فتوصل أسبوع 9). والإجماليات:<span class=\"ltr\">holding 445 + ordering 400 + shortage 20 = $865  ($86.50 per week)</span>"
    ],
    [
     "Not yet on the two finals, but the lecture's core methods: a single-server table (begin = max(arrival, previous end)) with its statistics, random-digit lookups, and the newspaper profit per day.",
     "لسه ماجاتش في الـ 2 finals، بس دي الطرق الأساسية في المحاضرة: جدول الـ single server (<bdi dir=\"ltr\">begin = max(arrival, previous end)</bdi>) والـ statistics بتاعته، وقراية الـ random digits، وربح بتاع الجرايد في اليوم."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Random variables, PMF, PDF and CDF",
   "ar_h": "الـ Random variables والـ PMF والـ PDF والـ CDF",
   "pts": [
    [
     "The modeler's world is probabilistic (slide 3). Build a statistical model by sampling: (1) select a known distribution by educated guesses, (2) estimate its parameters, (3) test for goodness of fit.",
     "العالم اللي الـ modeler شايفه probabilistic مش deterministic (سلايد 3). وبتبني statistical model عن طريق الـ sampling: (1) تختار distribution معروف بتخمين مدروس، (2) تقدّر الـ parameters، (3) تعمل test للـ goodness of fit."
    ],
    [
     "<b>Discrete</b> RV: finite or countably infinite values (packets per second at a router: {0, 1, 2, …}). <b>PMF</b> p(x<sub>i</sub>) = P(X = x<sub>i</sub>) with p(x<sub>i</sub>) ≥ 0 and Σ p(x<sub>i</sub>) = 1. Loaded die: p(x) = x/21, x = 1..6 (1/21 + … + 6/21 = 1).",
     "الـ RV الـ <b>Discrete</b> قيمه عددها محدود أو countably infinite (زي عدد الـ packets في الثانية على router:<bdi dir=\"ltr\">{0, 1, 2, …}</bdi>). والـ <b>PMF</b> هي:<span class=\"ltr\">p(xᵢ) = P(X = xᵢ),  p(xᵢ) ≥ 0,  Σ p(xᵢ) = 1</span>ومثال الزهرة المغشوشة <bdi dir=\"ltr\">p(x) = x/21</bdi> لـ x من 1 لـ 6 (المجموع واحد)."
    ],
    [
     "<b>Continuous</b> RV: the range is an interval; <b>PDF</b> f(x) ≥ 0, ∫ f = 1, P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx. Since <b>P(X = x₀) = 0</b>, including the interval ends or not does not matter.",
     "الـ RV الـ <b>Continuous</b> الـ range بتاعه interval، والـ <b>PDF</b> فيها:<span class=\"ltr\">f(x) ≥ 0,  ∫ f(x) dx = 1,  P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx</span>وعشان <bdi dir=\"ltr\">P(X = x₀) = 0</bdi> مش فارقة لو أطراف الـ interval داخلة ولا لأ."
    ],
    [
     "<b>CDF</b> F(x) = P(X ≤ x): nondecreasing, → 1 as x → ∞, → 0 as x → −∞; <b>P(a &lt; X ≤ b) = F(b) − F(a)</b>. Inspection device, f(x) = ½e^(−x/2): F(x) = 1 − e^(−x/2); P(X ≤ 2) = 1 − e⁻¹ = <b>0.632</b>; P(2 ≤ X ≤ 3) = e⁻¹ − e^(−1.5) = 0.368 − 0.223 = <b>0.145</b>.",
     "الـ <b>CDF</b> هي <bdi dir=\"ltr\">F(x) = P(X ≤ x)</bdi>، وبتزيد أو تفضل ثابتة، وبتروح لـ 1 لما x تروح لـ ∞ ولـ 0 لما تروح لـ −∞، و:<span class=\"ltr\">P(a &lt; X ≤ b) = F(b) − F(a)</span>ومثال جهاز الـ inspection <bdi dir=\"ltr\">f(x) = ½e^(−x/2)</bdi>:<span class=\"ltr\">F(x) = 1 − e^(−x/2)<br>P(X ≤ 2) = 1 − e⁻¹ = 0.632<br>P(2 ≤ X ≤ 3) = e⁻¹ − e^(−1.5) = 0.368 − 0.223 = 0.145</span>"
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Mean, variance and measures of centre",
   "ar_h": "الـ Mean والـ variance ومقاييس النص",
   "pts": [
    [
     "<b>E(X)</b> = Σ x<sub>i</sub>p(x<sub>i</sub>) or ∫ x f(x) dx (mean, μ, 1st moment; central tendency). <b>V(X)</b> = E[(X − E X)²] = <b>E(X²) − (E X)²</b>; σ = √V(X), in the same units as the mean.",
     "الـ <b>E(X)</b> (الـ mean أو μ أو الـ 1st moment، ومقياس central tendency) والـ <b>V(X)</b>:<span class=\"ltr\">E(X) = Σ xᵢ p(xᵢ)  or  ∫ x f(x) dx<br>V(X) = E[(X − E X)²] = E(X²) − (E X)²,   σ = √V(X)</span>والـ σ بنفس وحدة الـ mean."
    ],
    [
     "Worked: inspection device E(X) = 2, E(X²) = 8, V = 8 − 4 = <b>4</b>, σ = 2 (integration by parts, u = x, v′ = e^(−x/2)). Loaded die: E(X) = 91/21 = <b>4.33</b>, E(X²) = 441/21 = 21, V = 21 − (91/21)² = <b>2.22</b>, σ = 1.49. Slide 49 PMF (2, 5, 7, 9, 10 with 0.2, 0.2, 0.2, 0.3, 0.1): E = <b>6.5</b>, E(X²) = 49.9, V = <b>7.65</b>, σ = 2.77.",
     "أمثلة محلولة: جهاز الـ inspection <bdi dir=\"ltr\">E(X) = 2, E(X²) = 8, V = 8 − 4 = 4, σ = 2</bdi> (بالـ integration by parts و<bdi dir=\"ltr\">u = x, v′ = e^(−x/2)</bdi>). والزهرة المغشوشة:<span class=\"ltr\">E(X) = 91/21 = 4.33,  E(X²) = 441/21 = 21<br>V = 21 − (91/21)² = 2.22,  σ = 1.49</span>والـ PMF بتاع سلايد 49 (القيم <bdi dir=\"ltr\">2, 5, 7, 9, 10</bdi> باحتمالات <bdi dir=\"ltr\">0.2, 0.2, 0.2, 0.3, 0.1</bdi>):<span class=\"ltr\">E = 6.5,  E(X²) = 49.9,  V = 7.65,  σ = 2.77</span>"
    ],
    [
     "Sums (slide 16): E(Σ a<sub>i</sub>x<sub>i</sub>) = Σ a<sub>i</sub>E(x<sub>i</sub>) for <b>any</b> variables; Var(Σ a<sub>i</sub>x<sub>i</sub>) = Σ a<sub>i</sub>²Var(x<sub>i</sub>) only if <b>independent</b> (constants are squared, so a minus sign does not subtract a variance).",
     "المجاميع (سلايد 16): الـ mean بتاع المجموع هو مجموع الـ means لأي variables، أما الـ variance فبيتجمع بمربع الثوابت بس لو الـ variables <b>independent</b>:<span class=\"ltr\">E(Σ aᵢxᵢ) = Σ aᵢE(xᵢ)<br>Var(Σ aᵢxᵢ) = Σ aᵢ² Var(xᵢ)   (independent)</span>يعني الإشارة السالبة مش بتطرح variance."
    ],
    [
     "<b>C.O.V.</b> = σ/μ: dimensionless, compares data sets better than σ. <b>Covariance</b> Cov(x, y) = E(xy) − E(x)E(y): 0 for independent variables. <b>Correlation</b> ρ = Cov/(σ<sub>x</sub>σ<sub>y</sub>), between −1 and +1.",
     "الـ <b>C.O.V.</b> هو <bdi dir=\"ltr\">σ/μ</bdi>، ملوش وحدة وبيقارن بين data sets أحسن من σ. والـ <b>Covariance</b> هو <bdi dir=\"ltr\">Cov(x, y) = E(xy) − E(x)E(y)</bdi>، وبيبقى صفر للـ independent variables. والـ <b>Correlation</b> هو <bdi dir=\"ltr\">ρ = Cov/(σx σy)</bdi> وقيمته بين <bdi dir=\"ltr\">−1</bdi> و <bdi dir=\"ltr\">+1</bdi>."
    ],
    [
     "<b>Quantile</b> x<sub>α</sub>: F(x<sub>α</sub>) = α; <b>median</b> = 0.5-quantile; <b>mode</b> = most likely value (highest p<sub>i</sub> or PDF maximum). Symmetric single peak: mean = median = mode; long right tail: mode &lt; median &lt; mean; uniform: no mode. Selection flowchart (slide 23): categorical → <b>mode</b>; else total of interest → <b>mean</b>; else skewed → <b>median</b>; else mean.",
     "الـ <b>Quantile</b> هو <bdi dir=\"ltr\">x<sub>α</sub></bdi> اللي <bdi dir=\"ltr\">F(x<sub>α</sub>) = α</bdi>، والـ <b>median</b> هو الـ 0.5-quantile، والـ <b>mode</b> هو القيمة الأكتر احتمالًا (أعلى <bdi dir=\"ltr\">pᵢ</bdi> أو أعلى نقطة في الـ PDF). في القمة الواحدة المتماثلة الـ mean والـ median والـ mode زي بعض، وفي الذيل الطويل يمين <bdi dir=\"ltr\">mode &lt; median &lt; mean</bdi>، والـ uniform ملوش mode. والـ flowchart (سلايد 23): لو الداتا categorical استخدم الـ <b>mode</b>، غير كده لو الـ total يهمك استخدم الـ <b>mean</b>، غير كده لو skewed استخدم الـ <b>median</b>، غير كده الـ mean."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Discrete distributions: Bernoulli, binomial, geometric, Poisson",
   "ar_h": "الـ Discrete distributions: الـ Bernoulli والـ binomial والـ geometric والـ Poisson",
   "pts": [
    [
     "<b>Bernoulli</b> trial: success (p) or failure (q = 1 − p); E = p, V = pq. A Bernoulli process = independent trials with constant p. <b>Binomial</b> = number of successes in n trials: p(x) = C(n, x)p<sup>x</sup>q<sup>n−x</sup>, <b>E = np, V = npq</b>.",
     "الـ <b>Bernoulli</b> trial يا success (p) يا failure (<bdi dir=\"ltr\">q = 1 − p</bdi>)، و<bdi dir=\"ltr\">E = p, V = pq</bdi>، والـ Bernoulli process هي trials مستقلة بنفس الـ p. والـ <b>Binomial</b> هو عدد الـ successes في n trials:<span class=\"ltr\">p(x) = C(n, x) pˣ qⁿ⁻ˣ,   E = np,   V = npq</span>"
    ],
    [
     "Chips (Example 3.5): n = 50, p = 0.02; P(X ≤ 2) = 0.364 + 0.372 + 0.186 = 0.92, so P(stop) = P(X &gt; 2) = <b>0.08</b>; E = 1, V = 0.98. Parameter trap: mean 8, variance 4 → q = 4/8 = 0.5, n = 16; mean 80, variance 4 → q = 0.05, n = 84.2, not a whole number → <b>none of these</b>.",
     "مثال الـ chips (Example 3.5): <bdi dir=\"ltr\">n = 50, p = 0.02</bdi>:<span class=\"ltr\">P(X ≤ 2) = 0.364 + 0.372 + 0.186 = 0.92<br>P(stop) = P(X &gt; 2) = 0.08,   E = 1,   V = 0.98</span>وفخ الـ parameters: mean 8 وvariance 4 يبقى <bdi dir=\"ltr\">q = 4/8 = 0.5</bdi> و<bdi dir=\"ltr\">n = 16</bdi>، أما mean 80 وvariance 4 يبقى <bdi dir=\"ltr\">q = 0.05</bdi> و<bdi dir=\"ltr\">n = 84.2</bdi> ومش رقم صحيح، فالإجابة <b>none of these</b>."
    ],
    [
     "<b>Geometric</b> = number of trials to the 1st success: p(x) = q<sup>x−1</sup>p, x = 1, 2, … (not 0); <b>E = 1/p, V = q/p²</b>. Printers (40% rejected): p(3) = (0.4)²(0.6) = <b>0.096</b>.",
     "الـ <b>Geometric</b> هو عدد الـ trials لحد أول success:<span class=\"ltr\">p(x) = qˣ⁻¹ p,  x = 1, 2, …   E = 1/p,   V = q/p²</span>(x مبتبدأش من صفر). مثال الطابعات (<bdi dir=\"ltr\">40%</bdi> مرفوضة):<span class=\"ltr\">p(3) = (0.4)²(0.6) = 0.096</span>"
    ],
    [
     "<b>Poisson</b>(α): p(x) = e<sup>−α</sup>α<sup>x</sup>/x!, x = 0, 1, …; <b>E = V = α</b>; counts of independent events in a fixed time. Beeps, α = 2/hour: p(3) = 8e⁻²/6 = <b>0.18</b> (or F(3) − F(2) = 0.857 − 0.677); P(X ≥ 2) = 1 − F(1) = 1 − 0.406 = <b>0.594</b>.",
     "الـ <b>Poisson</b>(α):<span class=\"ltr\">p(x) = e^(−α) αˣ / x!,  x = 0, 1, …   E = V = α</span>وبيعدّ events مستقلة في وقت ثابت. مثال الـ beeps بـ <bdi dir=\"ltr\">α = 2</bdi> في الساعة:<span class=\"ltr\">p(3) = 8e⁻²/6 = 0.18   (= F(3) − F(2) = 0.857 − 0.677)<br>P(X ≥ 2) = 1 − F(1) = 1 − 0.406 = 0.594</span>"
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Continuous distributions: uniform, exponential, normal and others",
   "ar_h": "الـ Continuous distributions: الـ uniform والـ exponential والـ normal وغيرهم",
   "pts": [
    [
     "<b>Uniform U(a, b)</b>: f = 1/(b − a), F = (x − a)/(b − a), <b>E = (a + b)/2, V = (b − a)²/12</b>; probability is proportional to interval length; U(0, 1) is the basis of random numbers. Bus example (buses 7:00, 7:20, 7:40; passenger U(0, 30) after 7): P(wait &gt; 5) = 15/30 + 10/30 = <b>5/6</b>.",
     "الـ <b>Uniform U(a, b)</b>:<span class=\"ltr\">f = 1/(b − a),  F = (x − a)/(b − a),  E = (a + b)/2,  V = (b − a)²/12</span>والاحتمال بيتناسب مع طول الفترة، والـ <bdi dir=\"ltr\">U(0, 1)</bdi> هو أساس الـ random numbers. مثال الأتوبيس (أتوبيسات <bdi dir=\"ltr\">7:00, 7:20, 7:40</bdi> والراكب <bdi dir=\"ltr\">U(0, 30)</bdi> بعد 7):<span class=\"ltr\">P(wait &gt; 5) = 15/30 + 10/30 = 5/6</span>"
    ],
    [
     "<b>Exponential(λ)</b>: f = λe<sup>−λx</sup>, F = 1 − e<sup>−λx</sup>, <b>E = 1/λ, V = 1/λ²</b> (mean = standard deviation); PDF intercept = λ; <b>memoryless</b>; models completely random interarrivals and highly variable service times. Lamp, λ = 1/3: P(X &gt; 3) = e⁻¹ = <b>0.368</b>; P(2 ≤ X ≤ 3) = e^(−2/3) − e⁻¹ = 0.513 − 0.368 = <b>0.145</b>.",
     "الـ <b>Exponential(λ)</b>:<span class=\"ltr\">f = λe^(−λx),  F = 1 − e^(−λx),  E = 1/λ,  V = 1/λ²</span>يعني الـ mean زي الـ standard deviation، والـ PDF بتقطع المحور الرأسي عند λ، وهو <b>memoryless</b>، وبيمثل الوصول العشوائي تمامًا والخدمة المتغيرة جدًا. مثال اللمبة <bdi dir=\"ltr\">λ = 1/3</bdi>:<span class=\"ltr\">P(X &gt; 3) = e⁻¹ = 0.368<br>P(2 ≤ X ≤ 3) = e^(−2/3) − e⁻¹ = 0.513 − 0.368 = 0.145</span>"
    ],
    [
     "<b>Normal N(μ, σ²)</b>: symmetric about μ, maximum at μ (mean = mode, and median); no closed form, so use <b>Z = (X − μ)/σ ~ N(0, 1)</b> and Φ(−x) = 1 − Φ(x). Vessel N(12, 4), σ = 2: F(10) = Φ(−1) = 1 − 0.8413 = <b>0.1587</b>; N(50, 9): F(56) = Φ(2) = 0.9772. The second parameter is the <b>variance</b>: N(10, 1/2) has mean 10. Important because it is the most used, sums of normals are normal, and sums of many independent observations are normal.",
     "الـ <b>Normal N(μ, σ²)</b> متماثل حوالين μ وأعلى نقطة عند μ (الـ mean زي الـ mode والـ median)، وملوش closed form فبنستخدم:<span class=\"ltr\">Z = (X − μ)/σ ~ N(0, 1),   Φ(−x) = 1 − Φ(x)</span>مثال الـ vessel <bdi dir=\"ltr\">N(12, 4)</bdi> و<bdi dir=\"ltr\">σ = 2</bdi>:<span class=\"ltr\">F(10) = Φ(−1) = 1 − 0.8413 = 0.1587;   N(50, 9): F(56) = Φ(2) = 0.9772</span>والـ parameter التاني هو الـ <b>variance</b>، فـ <bdi dir=\"ltr\">N(10, 1/2)</bdi> الـ mean بتاعه 10. وأهميته إنه الأكتر استخدامًا، ومجموع normals بيطلع normal، ومجموع observations كتير مستقلة بيطلع normal."
    ],
    [
     "Lecture-notes extras: <b>Weibull</b> (location ν, scale α, shape β; ν = 0, β = 1 gives the exponential with λ = 1/α); <b>triangular</b> (a ≤ b ≤ c, mode b, E = (a + b + c)/3; CPU example F(2.5) = 0.541); <b>lognormal</b> (X = e<sup>Y</sup>, Y normal; μ, σ² are not X's mean and variance). Typical uses: exponential for completely random times, normal for wear or small fluctuations, Weibull for many components with serious defects, Poisson for demand, uniform/triangular/beta when data are limited.",
     "زيادة من الـ lecture notes: الـ <b>Weibull</b> (location ν وscale α وshape β، ولو <bdi dir=\"ltr\">ν = 0, β = 1</bdi> يبقى exponential بـ <bdi dir=\"ltr\">λ = 1/α</bdi>)، والـ <b>triangular</b> (<bdi dir=\"ltr\">a ≤ b ≤ c</bdi> والـ mode هو b و<bdi dir=\"ltr\">E = (a + b + c)/3</bdi>، ومثال الـ CPU <bdi dir=\"ltr\">F(2.5) = 0.541</bdi>)، والـ <b>lognormal</b> (<bdi dir=\"ltr\">X = e^Y</bdi> والـ Y normal، والـ μ والـ σ² مش هما الـ mean والـ variance بتوع X). الاستخدامات: الـ exponential للأوقات العشوائية تمامًا، والـ normal للـ wear أو التذبذب الصغير، والـ Weibull لمكونات كتير بعيوب خطيرة، والـ Poisson للـ demand، والـ uniform والـ triangular والـ beta لما الداتا قليلة."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Poisson process and empirical distributions",
   "ar_h": "الـ Poisson process والـ empirical distributions",
   "pts": [
    [
     "A counting process N(t) is a <b>Poisson process</b> with rate λ if: arrivals occur <b>one at a time</b>, increments are <b>stationary</b> (arrivals in [t, t + s] depend only on s), and increments are <b>independent</b> (non-overlapping intervals). Then N(t) ~ Poisson(λt): P[N(t) = n] = e<sup>−λt</sup>(λt)<sup>n</sup>/n!, <b>E = V = λt</b>.",
     "الـ counting process <bdi dir=\"ltr\">N(t)</bdi> يبقى <b>Poisson process</b> بمعدل λ لو: الوصول <b>واحد واحد</b>، والـ increments <b>stationary</b> (عدد الوصول في <bdi dir=\"ltr\">[t, t + s]</bdi> بيعتمد على s بس)، والـ increments <b>independent</b> (الفترات اللي مش متداخلة مستقلة). ساعتها:<span class=\"ltr\">N(t) ~ Poisson(λt):  P[N(t) = n] = e^(−λt) (λt)ⁿ / n!,   E = V = λt</span>"
    ],
    [
     "Interarrival times A<sub>1</sub>, A<sub>2</sub>, … are <b>independent exponential with mean 1/λ</b>: P(A<sub>1</sub> &gt; t) = P(N(t) = 0) = e<sup>−λt</sup>. Splitting with probability p gives Poisson processes with rates λp and λ(1 − p); pooling rates λ<sub>1</sub> and λ<sub>2</sub> gives λ<sub>1</sub> + λ<sub>2</sub> (lecture notes).",
     "الـ interarrival times <b>exponential مستقلة بـ mean <bdi dir=\"ltr\">1/λ</bdi></b>:<span class=\"ltr\">P(A₁ &gt; t) = P(N(t) = 0) = e^(−λt)</span>ولو قسمت الـ events باحتمال p بيطلع Poisson processes بمعدلات <bdi dir=\"ltr\">λp</bdi> و<bdi dir=\"ltr\">λ(1 − p)</bdi>، ولو جمعت معدلات <bdi dir=\"ltr\">λ₁</bdi> و<bdi dir=\"ltr\">λ₂</bdi> يطلع <bdi dir=\"ltr\">λ₁ + λ₂</bdi> (من الـ lecture notes)."
    ],
    [
     "<b>Empirical distribution</b>: its parameters are the observed sample values; used when a parametric distribution is impossible or unnecessary. Advantage: no assumption beyond the data. Disadvantage: the sample <b>might not cover the entire range</b>. It can be discrete (group sizes: relative frequency = frequency/300) or continuous (conveyor repair times: connect the points [x, F(x)] with straight lines).",
     "الـ <b>Empirical distribution</b> الـ parameters بتاعته هي القيم اللي اتشافت في الـ sample، وبنستخدمه لما مينفعش أو مش لازم نحدد parametric distribution. الميزة: مفيش افتراض غير الداتا. والعيب: الـ sample <b>ممكن متغطيش كل المدى</b>. وممكن يبقى discrete (أحجام المجموعات، والـ relative frequency هي الـ frequency على <bdi dir=\"ltr\">300</bdi>) أو continuous (أوقات تصليح الـ conveyor، بنوصّل النقط <bdi dir=\"ltr\">[x, F(x)]</bdi> بخطوط مستقيمة)."
    ],
    [
     "From a random number to a value (slides 49-52): build the step CDF (0.2, 0.4, 0.6, 0.9, 1.0 for 2, 5, 7, 9, 10) and pick the class with 0.6 &lt; R ≤ 0.9 for R = 0.78 → <b>x = 9</b>.",
     "من random number لقيمة (سلايد 49 لـ 52): تعمل الـ step CDF (<bdi dir=\"ltr\">0.2, 0.4, 0.6, 0.9, 1.0</bdi> للقيم <bdi dir=\"ltr\">2, 5, 7, 9, 10</bdi>) وتختار الفترة اللي فيها R، فلـ <bdi dir=\"ltr\">R = 0.78</bdi> و<bdi dir=\"ltr\">0.6 &lt; R ≤ 0.9</bdi> تطلع <bdi dir=\"ltr\">x = 9</bdi>."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "MCQs: mean of uniform(0, 2) → <b>1</b> (Final 2025/26); for the normal distribution → <b>mean = median</b> (Final 2025/26); mean of normal(10, 1/2) → <b>10</b> (Final 2024/25); binomial with mean 80 and variance 4 → <b>none of these</b> (Final 2024/25); the number of successes in n trials → <b>binomial</b> (Final 2025/26, also in input modeling).",
     "أسئلة الاختياري: الـ mean بتاع <bdi dir=\"ltr\">uniform(0, 2)</bdi>، والإجابة <bdi dir=\"ltr\">1</bdi> <bdi dir=\"ltr\">(Final 2025/26)</bdi>؛ وفي الـ normal distribution، والإجابة <b>mean = median</b> <bdi dir=\"ltr\">(Final 2025/26)</bdi>؛ والـ mean بتاع <bdi dir=\"ltr\">normal(10, 1/2)</bdi>، والإجابة <bdi dir=\"ltr\">10</bdi> <bdi dir=\"ltr\">(Final 2024/25)</bdi>؛ والـ binomial اللي الـ mean بتاعه 80 والـ variance 4، والإجابة <b>none of these</b> <bdi dir=\"ltr\">(Final 2024/25)</bdi>؛ وعدد الـ successes في n trials، والإجابة <b>binomial</b> (<bdi dir=\"ltr\">Final 2025/26</bdi>، وجاية كمان في الـ input modeling)."
    ],
    [
     "T/F (Final 2024/25): \"the median is the most likely value\" → <b>False</b> (that is the mode); \"we can use the mean if the data is categorical\" → <b>False</b> (use the mode).",
     "صح وغلط <bdi dir=\"ltr\">(Final 2024/25)</bdi>: \"الـ median هو القيمة الأكتر احتمالًا\"، والإجابة <b>False</b> (ده الـ mode)؛ و\"ينفع نستخدم الـ mean لو الداتا categorical\"، والإجابة <b>False</b> (نستخدم الـ mode)."
    ],
    [
     "Written: the repair-person beeps, Poisson α = 2 (Final 2025/26, Q3-a): p(3) = <b>0.18</b>, P(two or more) = 1 − 0.406 = <b>0.594</b>. The bubble-jet printers, geometric with q = 0.4 (Final 2024/25, Q3-a(i)): first acceptable is the third → (0.4)²(0.6) = <b>0.096</b>.",
     "أسئلة مقالية: الـ beeps بتوع الـ repair person، Poisson بـ <bdi dir=\"ltr\">α = 2</bdi> <bdi dir=\"ltr\">(Final 2025/26, Q3-a)</bdi>:<span class=\"ltr\">p(3) = 0.18,   P(X ≥ 2) = 1 − 0.406 = 0.594</span>والطابعات bubble-jet، geometric بـ <bdi dir=\"ltr\">q = 0.4</bdi> <bdi dir=\"ltr\">(Final 2024/25, Q3-a(i))</bdi>، إن أول واحدة مقبولة تبقى التالتة:<span class=\"ltr\">(0.4)²(0.6) = 0.096</span>"
    ],
    [
     "Revision-sheet MCQs (same style): mean of binomial(10, 1/2) → <b>5</b>; mean 8, variance 4 → <b>n = 16, p = 1/2</b>; X ~ N(1, 4), Y = (X − 1)/2 → <b>N(0, 1)</b>; Y = (X + 1)/2 has mean 1 and variance 1, not in the options → <b>none of these</b>.",
     "أسئلة الـ revision sheet (بنفس الأسلوب): الـ mean بتاع <bdi dir=\"ltr\">binomial(10, 1/2)</bdi>، والإجابة <bdi dir=\"ltr\">5</bdi>؛ وmean 8 وvariance 4، والإجابة <bdi dir=\"ltr\">n = 16, p = 1/2</bdi>؛ ولو <bdi dir=\"ltr\">X ~ N(1, 4)</bdi> و<bdi dir=\"ltr\">Y = (X − 1)/2</bdi>، والإجابة <bdi dir=\"ltr\">N(0, 1)</bdi>؛ أما <bdi dir=\"ltr\">Y = (X + 1)/2</bdi> فالـ mean بتاعه 1 والـ variance 1 ومش موجودة في الاختيارات، والإجابة <b>none of these</b>."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Random numbers: properties and pseudo-randomness",
   "ar_h": "الـ Random numbers: الخصائص والـ pseudo-randomness",
   "pts": [
    [
     "Two statistical properties: <b>uniformity</b> and <b>independence</b>; each R<sub>i</sub> is drawn independently from U[0, 1]: f(x) = 1 on [0, 1], <b>E(R) = 1/2, V(R) = 1/12</b>. Consequences: with n equal classes each expects N/n observations; the chance of a value in an interval does not depend on earlier values.",
     "فيه خاصيتين: الـ <b>uniformity</b> والـ <b>independence</b>، وكل <bdi dir=\"ltr\">Rᵢ</bdi> بيتسحب مستقل من <bdi dir=\"ltr\">U[0, 1]</bdi>:<span class=\"ltr\">f(x) = 1 on [0, 1],   E(R) = 1/2,   V(R) = 1/12</span>والنتيجة: لو قسمت لـ n فترات متساوية كل فترة متوقع فيها <bdi dir=\"ltr\">N/n</bdi>، واحتمال قيمة في فترة مش بيعتمد على القيم اللي قبلها."
    ],
    [
     "<b>Pseudo-random</b>: numbers are calculated arithmetically, and a known method removes the potential for true randomness; the goal is to <b>imitate</b> the ideal properties. A typical computer generator gives a <b>pseudorandom number sequence</b>.",
     "الـ <b>Pseudo-random</b>: الأرقام بتتحسب بمعادلة، والطريقة المعروفة بتشيل إمكانية الـ randomness الحقيقية، والهدف إنها <b>تقلّد</b> الخصائص المثالية. والـ generator العادي في الكمبيوتر بيطلّع <b>pseudorandom number sequence</b>."
    ],
    [
     "Good routines (slide 7): <b>fast</b>, <b>portable</b>, <b>sufficiently long cycle</b>, <b>replicable</b> (verification, debugging, identical streams for different systems), close to ideal <b>uniformity and independence</b>. Departures (slide 9): not uniform, discrete-valued instead of continuous, mean or variance too high or low; dependence: autocorrelation, numbers successively higher or lower, several above the mean then several below.",
     "الـ routine الكويس (سلايد 7): <b>سريع</b>، و<b>portable</b>، و<b>الـ cycle طويل كفاية</b>، و<b>replicable</b> (للـ verification والـ debugging واستخدام نفس الـ stream لـ systems مختلفة)، وقريب من الـ <b>uniformity والـ independence</b> المثاليين. والانحرافات (سلايد 9): مش uniform، أو discrete بدل continuous، أو الـ mean أو الـ variance عالي أو واطي، والـ dependence: الـ autocorrelation، أو الأرقام بتعلى أو بتوطى ورا بعض، أو كذا رقم فوق الـ mean وبعدهم كذا تحته."
    ],
    [
     "<b>Real random numbers</b> (slides 65-67): www.random.org (from <b>atmospheric noise</b>, used for lotteries, draws, games), www.randomnumbers.info (a <b>quantum</b> generator), and hardware generators (comscire).",
     "الـ <b>Real random numbers</b> (سلايد 65 لـ 67): موقع random.org (من الـ <b>atmospheric noise</b>، وبيستخدموه في الـ lotteries والسحوبات والألعاب)، وrandomnumbers.info (من <b>quantum</b> generator)، والـ hardware generators (comscire)."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Midsquare and the linear congruential method",
   "ar_h": "الـ Midsquare والـ linear congruential method",
   "pts": [
    [
     "<b>Midsquare</b> (von Neumann and Metropolis, 1940s): square a 4-digit Z, pad to 8 digits, take the middle 4; U = Z/10000. 7182² = 51581124 → 5811 (0.5811) → 7677 → 9363 …; problem: the numbers <b>tend to 0</b> and then stay 0.",
     "الـ <b>Midsquare</b> (von Neumann وMetropolis في الأربعينات): تربّع Z من 4 digits، وتكمّلها لـ 8 digits بأصفار، وتاخد الـ 4 اللي في النص، و<bdi dir=\"ltr\">U = Z/10000</bdi>:<span class=\"ltr\">7182² = 51581124 → 5811 (0.5811) → 7677 → 9363 …</span>والمشكلة إن الأرقام <b>بتروح للصفر</b> وتفضل صفر."
    ],
    [
     "<b>LCM</b> (Lehmer 1951): <b>X<sub>i+1</sub> = (aX<sub>i</sub> + c) mod m</b>, R<sub>i</sub> = X<sub>i</sub>/m; a = multiplier, c = increment, m = modulus, X₀ = seed; m &gt; 0 and a, c, X₀ &lt; m. X ∈ {0, …, m − 1}, so R ∈ [0, (m − 1)/m]. c ≠ 0: <b>mixed</b>; c = 0: <b>multiplicative</b>.",
     "الـ <b>LCM</b> (Lehmer سنة 1951):<span class=\"ltr\">Xᵢ₊₁ = (a·Xᵢ + c) mod m,   Rᵢ = Xᵢ / m</span>والـ a هو الـ multiplier، والـ c الـ increment، والـ m الـ modulus، والـ X₀ الـ seed، وشرط <bdi dir=\"ltr\">m &gt; 0</bdi> و<bdi dir=\"ltr\">a, c, X₀ &lt; m</bdi>. والـ X من 0 لـ <bdi dir=\"ltr\">m − 1</bdi>، فالـ R في <bdi dir=\"ltr\">[0, (m − 1)/m]</bdi>. لو <bdi dir=\"ltr\">c ≠ 0</bdi> اسمه <b>mixed</b>، ولو <bdi dir=\"ltr\">c = 0</bdi> اسمه <b>multiplicative</b>."
    ],
    [
     "Example 1 (slide 18): X₀ = 27, a = 17, c = 43, m = 100: X₁ = 502 mod 100 = 2 (0.02), X₂ = 77 (0.77), X₃ = 1352 mod 100 = 52 (0.52), X₄ = 927 mod 100 = 27 = the seed → period only <b>4</b>.",
     "مثال 1 (سلايد 18) بـ <bdi dir=\"ltr\">X₀ = 27, a = 17, c = 43, m = 100</bdi>:<span class=\"ltr\">X₁ = 502 mod 100 = 2 (0.02),  X₂ = 77 (0.77)<br>X₃ = 1352 mod 100 = 52 (0.52),  X₄ = 927 mod 100 = 27</span>رجعنا للـ seed، فالـ period بس <bdi dir=\"ltr\">4</bdi>."
    ],
    [
     "Example 2 (slide 19): a = 13, c = 0, m = 64: the <b>seed matters</b>. X₀ = 1 → 13, 41, 21, 17, … back to 1 after <b>16</b>; X₀ = 3 → period 16; X₀ = 2 → 26, 18, 42, 34, 58, 50, 10, 2: period <b>8</b>; X₀ = 4 → 52, 36, 20, 4: period <b>4</b>.",
     "مثال 2 (سلايد 19) بـ <bdi dir=\"ltr\">a = 13, c = 0, m = 64</bdi>: الـ <b>seed بيفرق</b>.<span class=\"ltr\">X₀ = 1 → 13, 41, 21, 17, … → 1   (period 16)<br>X₀ = 3 → period 16<br>X₀ = 2 → 26, 18, 42, 34, 58, 50, 10, 2   (period 8)<br>X₀ = 4 → 52, 36, 20, 4   (period 4)</span>"
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Maximum period and better generators",
   "ar_h": "الـ Maximum period والـ generators الأحسن",
   "pts": [
    [
     "<b>Maximum density</b>: R<sub>i</sub> should leave no large gaps on [0, 1]; each R<sub>i</sub> is discrete, so use a <b>very large m</b>. <b>Maximum period</b> comes from the choice of a, c, m, X₀; m a power of 2 (or close) helps speed on binary computers.",
     "الـ <b>Maximum density</b>: الـ <bdi dir=\"ltr\">Rᵢ</bdi> متسيبش فراغات كبيرة على <bdi dir=\"ltr\">[0, 1]</bdi>، ولأن كل <bdi dir=\"ltr\">Rᵢ</bdi> discrete بنستخدم <b>m كبير جدًا</b>. والـ <b>Maximum period</b> بييجي من اختيار a وc وm وX₀، وإن m تبقى power of 2 (أو قريبة) بيسرّع على الكمبيوترات الـ binary."
    ],
    [
     "Period rules (slide 21): <b>m = 2<sup>b</sup>, c ≠ 0</b>: P = m if c is relatively prime to m and <b>a = 1 + 4k</b>. <b>m = 2<sup>b</sup>, c = 0</b>: P = m/4 = 2<sup>b−2</sup> if the seed is <b>odd</b> and <b>a = 3 + 8k or 5 + 8k</b>. <b>m prime, c = 0</b>: P = m − 1 if the smallest k with m dividing a<sup>k</sup> − 1 is k = m − 1.",
     "قواعد الـ period (سلايد 21):<span class=\"ltr\">m = 2ᵇ, c ≠ 0:  P = m   if gcd(c, m) = 1 and a = 1 + 4k<br>m = 2ᵇ, c = 0:  P = m/4 = 2ᵇ⁻²   if X₀ odd and a = 3 + 8k or 5 + 8k<br>m prime, c = 0:  P = m − 1   if smallest k with m | aᵏ − 1 is k = m − 1</span>"
    ],
    [
     "Applying them: a = 13 = 5 + 8, c = 0, m = 64 → at most 64/4 = <b>16</b>, only for odd seeds; a = 5 = 1 + 4, c = 13 (odd), m = 64 → <b>64</b> for every seed; a = 21 = 1 + 4·5, c = 17, m = 64 → <b>64</b>. <b>java.util.Random</b> is an LCG: X<sub>i+1</sub> = (25214903917·X<sub>i</sub> + 11) mod 2<sup>48</sup>.",
     "تطبيق: <bdi dir=\"ltr\">a = 13 = 5 + 8, c = 0, m = 64</bdi> يدي بالكتير <bdi dir=\"ltr\">64/4 = 16</bdi> وللـ seeds الفردية بس، و<bdi dir=\"ltr\">a = 5 = 1 + 4, c = 13, m = 64</bdi> يدي <bdi dir=\"ltr\">64</bdi> لأي seed، و<bdi dir=\"ltr\">a = 21 = 1 + 4·5, c = 17, m = 64</bdi> يدي <bdi dir=\"ltr\">64</bdi>. والـ <b>java.util.Random</b> عبارة عن LCG:<span class=\"ltr\">Xᵢ₊₁ = (25214903917·Xᵢ + 11) mod 2⁴⁸</span>"
    ],
    [
     "<b>General congruential</b>: X<sub>i+1</sub> = g(X<sub>i</sub>, X<sub>i−1</sub>, …) mod m: quadratic (aX<sub>i</sub>² + bX<sub>i−1</sub> + c), multiple recursive (a₁X<sub>i</sub> + … + a<sub>k</sub>X<sub>i−k</sub>), Fibonacci (X<sub>i</sub> + X<sub>i−1</sub>).",
     "الـ <b>General congruential</b> هو <bdi dir=\"ltr\">Xᵢ₊₁ = g(Xᵢ, Xᵢ₋₁, …) mod m</bdi>، وأمثلته:<span class=\"ltr\">quadratic: a·Xᵢ² + b·Xᵢ₋₁ + c<br>multiple recursive: a₁Xᵢ + a₂Xᵢ₋₁ + … + aₖXᵢ₋ₖ<br>Fibonacci: Xᵢ + Xᵢ₋₁</span>"
    ],
    [
     "<b>CLCG</b> (longer period for complex systems): combine k multiplicative generators with prime moduli m<sub>j</sub>: X<sub>i</sub> = (Σ (−1)<sup>j−1</sup>X<sub>i,j</sub>) mod (m₁ − 1); R<sub>i</sub> = X<sub>i</sub>/m₁, or (m₁ − 1)/m₁ if X<sub>i</sub> = 0; max period <b>(m₁ − 1)(m₂ − 1)…(m<sub>k</sub> − 1)/2<sup>k−1</sup></b>. L'Ecuyer: m₁ = 2147483563 (a₁ = 40014), m₂ = 2147483399 (a₂ = 40692), period ≈ 2 × 10<sup>18</sup>. Excel 2003 combines three generators (171 mod 30269, 172 mod 30307, 170 mod 30323), R = sum of fractions mod 1, more than 10<sup>13</sup> numbers.",
     "الـ <b>CLCG</b> (عشان period أطول للـ systems المعقدة): بندمج k multiplicative generators بـ prime moduli:<span class=\"ltr\">Xᵢ = ( Σ (−1)ʲ⁻¹ Xᵢ,ⱼ ) mod (m₁ − 1)<br>Rᵢ = Xᵢ/m₁,  or (m₁ − 1)/m₁ if Xᵢ = 0<br>P = (m₁ − 1)(m₂ − 1)…(mₖ − 1) / 2ᵏ⁻¹</span>والـ L'Ecuyer فيه <bdi dir=\"ltr\">m₁ = 2147483563</bdi> (<bdi dir=\"ltr\">a₁ = 40014</bdi>) و<bdi dir=\"ltr\">m₂ = 2147483399</bdi> (<bdi dir=\"ltr\">a₂ = 40692</bdi>)، والـ period تقريبًا <bdi dir=\"ltr\">2 × 10¹⁸</bdi>. والـ Excel 2003 بيدمج 3 generators (<bdi dir=\"ltr\">171 mod 30269</bdi> و<bdi dir=\"ltr\">172 mod 30307</bdi> و<bdi dir=\"ltr\">170 mod 30323</bdi>)، والـ R هو مجموع الكسور <bdi dir=\"ltr\">mod 1</bdi>، وبيطلّع أكتر من <bdi dir=\"ltr\">10¹³</bdi> رقم."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Testing uniformity: hypotheses, KS and chi-square",
   "ar_h": "اختبار الـ uniformity: الـ hypotheses والـ KS والـ chi-square",
   "pts": [
    [
     "Hypotheses (slide 31): uniformity H₀: R<sub>i</sub> ~ U[0, 1]; independence H₀: R<sub>i</sub> independent. Failing to reject H₀ means evidence against it <b>has not been detected</b> (not proof). <b>α = P(reject H₀ | H₀ true)</b>, often 0.01 or 0.05.",
     "الـ hypotheses (سلايد 31): للـ uniformity <bdi dir=\"ltr\">H₀: Rᵢ ~ U[0, 1]</bdi>، وللـ independence <bdi dir=\"ltr\">H₀: Rᵢ independent</bdi>. ولو مرفضتش H₀ يبقى الدليل ضدها <b>مااتلقاش</b> (مش إثبات). و:<span class=\"ltr\">α = P(reject H₀ | H₀ true)</span>وغالبًا <bdi dir=\"ltr\">0.01</bdi> أو <bdi dir=\"ltr\">0.05</bdi>."
    ],
    [
     "Five tests: (1) <b>frequency</b> (Kolmogorov-Smirnov or chi-square) → uniformity; (2) <b>runs</b>, (3) <b>autocorrelation</b>, (4) <b>gap</b> (uses KS), (5) <b>poker</b> (uses chi-square) → independence.",
     "الـ 5 tests: (1) الـ <b>frequency</b> (Kolmogorov-Smirnov أو chi-square) وده للـ uniformity، و(2) الـ <b>runs</b> و(3) الـ <b>autocorrelation</b> و(4) الـ <b>gap</b> (بيستخدم الـ KS) و(5) الـ <b>poker</b> (بيستخدم الـ chi-square) ودول للـ independence."
    ],
    [
     "<b>KS</b>: sort R<sub>(1)</sub> ≤ … ≤ R<sub>(N)</sub>; D⁺ = max(i/N − R<sub>(i)</sub>), D⁻ = max(R<sub>(i)</sub> − (i − 1)/N), D = max(D⁺, D⁻); do not reject if D ≤ D<sub>α</sub> (N = 5: D<sub>0.05</sub> = 0.565; N &gt; 35: 1.36/√N). Example 0.44, 0.81, 0.14, 0.05, 0.93: sorted 0.05, 0.14, 0.44, 0.81, 0.93 → D⁺ = 0.26, D⁻ = 0.21, D = <b>0.26 &lt; 0.565</b> → not rejected. KS works for small samples.",
     "الـ <b>KS</b>: ترتّب الأرقام الأول، وبعدين:<span class=\"ltr\">D⁺ = max(i/N − R₍ᵢ₎),   D⁻ = max(R₍ᵢ₎ − (i − 1)/N),   D = max(D⁺, D⁻)</span>ومترفضش لو <bdi dir=\"ltr\">D ≤ Dα</bdi> (لـ <bdi dir=\"ltr\">N = 5</bdi> الـ <bdi dir=\"ltr\">D0.05 = 0.565</bdi>، ولـ <bdi dir=\"ltr\">N &gt; 35</bdi> هي <bdi dir=\"ltr\">1.36/√N</bdi>). مثال <bdi dir=\"ltr\">0.44, 0.81, 0.14, 0.05, 0.93</bdi> بعد الترتيب <bdi dir=\"ltr\">0.05, 0.14, 0.44, 0.81, 0.93</bdi>:<span class=\"ltr\">D⁺ = 0.26,  D⁻ = 0.21,  D = 0.26 &lt; 0.565  →  not rejected</span>والـ KS بينفع مع الـ samples الصغيرة."
    ],
    [
     "<b>Chi-square</b>: χ₀² = Σ (O<sub>i</sub> − E<sub>i</sub>)²/E<sub>i</sub>, E<sub>i</sub> = N/n, <b>df = n − 1</b>; valid for large samples (N ≥ 50), each E<sub>i</sub> ≥ 5; reject if χ₀² &gt; χ²<sub>α,n−1</sub>. Slide 40: 100 numbers, 10 classes → χ₀² = 11.2 &lt; χ²<sub>0.05,9</sub> = <b>16.9</b> → uniform not rejected (Example 4.5 gives 3.4). Table values: 3.84 (df 1), 5.99 (2), 7.81 (3), 9.49 (4), 16.9 (9).",
     "الـ <b>Chi-square</b>:<span class=\"ltr\">χ₀² = Σ (Oᵢ − Eᵢ)² / Eᵢ,   Eᵢ = N/n,   df = n − 1</span>وبينفع مع الـ samples الكبيرة (<bdi dir=\"ltr\">N ≥ 50</bdi>) وكل <bdi dir=\"ltr\">Eᵢ ≥ 5</bdi>، وبنرفض لو <bdi dir=\"ltr\">χ₀² &gt; χ²α,n−1</bdi>. سلايد 40: 100 رقم و10 فترات:<span class=\"ltr\">χ₀² = 11.2 &lt; χ²0.05,9 = 16.9  →  not rejected</span>(ومثال 4.5 بيطلع <bdi dir=\"ltr\">3.4</bdi>). وقيم الجدول: <bdi dir=\"ltr\">3.84 (df 1), 5.99 (2), 7.81 (3), 9.49 (4), 16.9 (9)</bdi>."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Testing independence: runs, autocorrelation, gap, poker",
   "ar_h": "اختبار الـ independence: الـ runs والـ autocorrelation والـ gap والـ poker",
   "pts": [
    [
     "<b>Runs up and down</b>: write + if the next number is larger, − if smaller; a = number of runs (max N − 1, min 1). <b>μ<sub>a</sub> = (2N − 1)/3, σ<sub>a</sub>² = (16N − 29)/90</b>, Z₀ = (a − μ<sub>a</sub>)/σ<sub>a</sub> (normal for N &gt; 20); do not reject if −z<sub>α/2</sub> ≤ Z₀ ≤ z<sub>α/2</sub>. Slide 57 (N = 40): a = 26, μ = 26.33, σ² = 6.79, Z₀ = <b>−0.13</b> → not rejected. Slide 53: numbers can pass KS and chi-square yet steadily increase, so not random.",
     "الـ <b>Runs up and down</b>: تكتب + لو الرقم اللي بعده أكبر و− لو أصغر، والـ a هو عدد الـ runs (أقصى حاجة <bdi dir=\"ltr\">N − 1</bdi> وأقل حاجة 1):<span class=\"ltr\">μa = (2N − 1)/3,   σa² = (16N − 29)/90,   Z₀ = (a − μa)/σa</span>(normal لـ <bdi dir=\"ltr\">N &gt; 20</bdi>)، ومترفضش لو <bdi dir=\"ltr\">−zα/2 ≤ Z₀ ≤ zα/2</bdi>. سلايد 57 (<bdi dir=\"ltr\">N = 40</bdi>):<span class=\"ltr\">a = 26,  μ = 26.33,  σ² = 6.79,  Z₀ = −0.13  →  not rejected</span>وسلايد 53: أرقام ممكن تعدّي الـ KS والـ chi-square وهي بتزيد بانتظام، يعني مش random."
    ],
    [
     "<b>Runs above and below the mean</b> (lecture notes): n₁ above, n₂ below, b runs; μ<sub>b</sub> = 2n₁n₂/N + 1/2, σ<sub>b</sub>² = 2n₁n₂(2n₁n₂ − N)/[N²(N − 1)]; normal if n₁ or n₂ &gt; 20. Example 4.8: n₁ = 18, n₂ = 22, b = 17 → μ = 20.3, σ² = 9.54, Z₀ = −1.07 → not rejected. The <b>length of runs</b> is tested with chi-square on E(Y<sub>i</sub>).",
     "الـ <b>Runs above and below the mean</b> (من الـ lecture notes): الـ n₁ فوق والـ n₂ تحت والـ b عدد الـ runs:<span class=\"ltr\">μb = 2n₁n₂/N + 1/2,   σb² = 2n₁n₂(2n₁n₂ − N) / [N²(N − 1)]</span>وبيبقى normal لو n₁ أو n₂ أكبر من 20. مثال 4.8:<span class=\"ltr\">n₁ = 18, n₂ = 22, b = 17  →  μ = 20.3, σ² = 9.54, Z₀ = −1.07</span>يعني مش مرفوضة. وطول الـ runs بيتختبر بالـ chi-square على <bdi dir=\"ltr\">E(Yᵢ)</bdi>."
    ],
    [
     "<b>Autocorrelation</b> (lag m, start i): M = largest integer with i + (M + 1)m ≤ N; ρ̂ = [1/(M + 1)] Σ R<sub>i+km</sub>R<sub>i+(k+1)m</sub> − 0.25; σ̂ = √(13M + 7)/[12(M + 1)]; Z₀ = ρ̂/σ̂. ρ &gt; 0: high follows high; ρ &lt; 0: low follows high. Slide 51 (i = 3, m = 5, N = 30): M = 4, products sum 0.2774, ρ̂ = −0.1945, σ̂ = 0.128, Z₀ = <b>−1.52</b> (slide −1.516) → not rejected at α = 0.05.",
     "الـ <b>Autocorrelation</b> (lag m وبداية i):<span class=\"ltr\">M = largest integer with i + (M + 1)m ≤ N<br>ρ̂ = [1/(M + 1)] Σ Rᵢ₊ₖₘ·Rᵢ₊₍ₖ₊₁₎ₘ − 0.25<br>σ̂ = √(13M + 7) / [12(M + 1)],   Z₀ = ρ̂ / σ̂</span>لو ρ موجب يبقى العالي ييجي بعده عالي، ولو سالب الواطي ييجي بعد العالي. سلايد 51 (<bdi dir=\"ltr\">i = 3, m = 5, N = 30</bdi>):<span class=\"ltr\">M = 4,  Σ = 0.2774,  ρ̂ = −0.1945,  σ̂ = 0.128,  Z₀ = −1.52</span>(السلايد كاتب <bdi dir=\"ltr\">−1.516</bdi>)، يعني مش مرفوضة عند <bdi dir=\"ltr\">α = 0.05</bdi>."
    ],
    [
     "<b>Gap test</b>: gap = digits between repetitions of the same digit; gaps for a digit = its occurrences − 1; total = N − 10 (110 digits → 100 gaps). P(gap = x) = 0.9<sup>x</sup>(0.1); <b>F(x) = 1 − 0.9<sup>x+1</sup></b> (F(3) = 0.3439); D = max|F − S<sub>N</sub>| = 0.0224 &lt; 1.36/√100 = 0.136 → not rejected.",
     "الـ <b>Gap test</b>: الـ gap هو عدد الأرقام بين تكرارين لنفس الرقم، وعدد الـ gaps لرقم = مرات ظهوره ناقص واحد، والإجمالي <bdi dir=\"ltr\">N − 10</bdi> (110 رقم يدي 100 gap):<span class=\"ltr\">P(gap = x) = 0.9ˣ(0.1),   F(x) = 1 − 0.9ˣ⁺¹   (F(3) = 0.3439)<br>D = max|F − Sɴ| = 0.0224 &lt; 1.36/√100 = 0.136</span>يعني مش مرفوضة."
    ],
    [
     "<b>Poker test</b> (3 digits): P(all different) = 0.9 × 0.8 = <b>0.72</b>, P(three like) = 0.1 × 0.1 = <b>0.01</b>, P(one pair) = <b>0.27</b>. 1000 numbers: observed 680, 31, 289 vs expected 720, 10, 270 → χ₀² = 2.22 + 44.10 + 1.34 = <b>47.66</b> (slide 47.65) &gt; χ²<sub>0.05,2</sub> = 5.99 → independence <b>rejected</b> (df = 3 classes − 1).",
     "الـ <b>Poker test</b> (3 digits):<span class=\"ltr\">P(all different) = 0.9 × 0.8 = 0.72<br>P(three like) = 0.1 × 0.1 = 0.01<br>P(one pair) = 1 − 0.72 − 0.01 = 0.27</span>ولـ 1000 رقم: الملاحظ <bdi dir=\"ltr\">680, 31, 289</bdi> والمتوقع <bdi dir=\"ltr\">720, 10, 270</bdi>:<span class=\"ltr\">χ₀² = 2.22 + 44.10 + 1.34 = 47.66 (slide 47.65) &gt; χ²0.05,2 = 5.99</span>فالـ independence <b>مرفوضة</b> (الـ df هي 3 فئات ناقص واحد)."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "MCQ (Final 2025/26): the sequence from a typical computer random number generator is a → <b>pseudorandom number sequence</b>.",
     "سؤال اختياري <bdi dir=\"ltr\">(Final 2025/26)</bdi>: الأرقام اللي بيطلّعها الـ generator العادي في الكمبيوتر اسمها، والإجابة <b>pseudorandom number sequence</b>."
    ],
    [
     "LCG, both finals (Q2-a): Final 2025/26: a = 13, c = 0, m = 64, X₀ = 4 → 52, 36, 20, 4, 52 (R = 0.8125, 0.5625, 0.3125, 0.0625, 0.8125); best possible period m/4 = 16 needs an odd seed, this seed repeats after <b>4</b>. a = 21, c = 17, X₀ = 1 → 38, 47, 44, 45, 2; period <b>64</b>. Final 2024/25: a = 5, c = 13, m = 64; X₀ = 1 → 18, 39, 16, 29, 30; X₀ = 3 → 28, 25, 10, 63, 8; period <b>64</b> for both (c odd, a = 1 + 4k).",
     "الـ LCG جه في الـ 2 finals (Q2-a). Final 2025/26:<span class=\"ltr\">a = 13, c = 0, m = 64, X₀ = 4 → 52, 36, 20, 4, 52<br>R = 0.8125, 0.5625, 0.3125, 0.0625, 0.8125</span>وأحسن period ممكن <bdi dir=\"ltr\">m/4 = 16</bdi> محتاج seed فردي، والـ seed ده بيتكرر بعد <bdi dir=\"ltr\">4</bdi>. و:<span class=\"ltr\">a = 21, c = 17, X₀ = 1 → 38, 47, 44, 45, 2   (period 64)</span>وFinal 2024/25:<span class=\"ltr\">a = 5, c = 13, m = 64:  X₀ = 1 → 18, 39, 16, 29, 30;  X₀ = 3 → 28, 25, 10, 63, 8</span>والـ period <bdi dir=\"ltr\">64</bdi> للاتنين (الـ c فردي و<bdi dir=\"ltr\">a = 1 + 4k</bdi>)."
    ],
    [
     "Runs up and down (Final 2025/26, Q2-b) on the 30 autocorrelation numbers, α = 0.05: signs − + + + − + − + + + − + + + − + − + + − − − + + − − + + + → a = <b>16</b>; μ<sub>a</sub> = 59/3 = 19.67, σ<sub>a</sub>² = 451/90 = 5.011, Z₀ = (16 − 19.67)/2.239 = <b>−1.64</b>; inside ±1.96 → not rejected.",
     "الـ runs up and down <bdi dir=\"ltr\">(Final 2025/26, Q2-b)</bdi> على الـ 30 رقم بتوع الـ autocorrelation و<bdi dir=\"ltr\">α = 0.05</bdi>:<span class=\"ltr\">− + + + − + − + + + − + + + − + − + + − − − + + − − + + +   →  a = 16<br>μa = 59/3 = 19.67,  σa² = 451/90 = 5.011<br>Z₀ = (16 − 19.67)/2.239 = −1.64</span>جوه <bdi dir=\"ltr\">±1.96</bdi> يعني مش مرفوضة."
    ],
    [
     "Autocorrelation (Final 2024/25, Q2-b): the slide 51 example (3rd, 8th, 13th, …) at <b>α = 0.01</b>: Z₀ = −1.52, critical z<sub>0.005</sub> = <b>2.576</b> → not rejected. The paper's hint \"Z<sub>0.01</sub> = 1.30\" (also on Final 2025/26) is wrong; comparing with ±1.30 would wrongly reject.",
     "الـ Autocorrelation <bdi dir=\"ltr\">(Final 2024/25, Q2-b)</bdi>: نفس مثال سلايد 51 (التالت والتامن والتلاتاشر …) بس عند <bdi dir=\"ltr\">α = 0.01</bdi>: الـ <bdi dir=\"ltr\">Z₀ = −1.52</bdi> والـ critical هو <bdi dir=\"ltr\">z0.005 = 2.576</bdi>، يعني مش مرفوضة. والـ hint اللي في الورقة <bdi dir=\"ltr\">Z0.01 = 1.30</bdi> (وموجود كمان في Final 2025/26) غلط، ولو قارنت بـ <bdi dir=\"ltr\">±1.30</bdi> هترفض غلط."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Inverse transform: the idea and the exponential",
   "ar_h": "الـ Inverse transform: الفكرة والـ exponential",
   "pts": [
    [
     "<b>Random-variate generation</b> turns uniform random numbers R into values X that follow a desired distribution. All the techniques <b>assume uniform (0, 1) random numbers R1, R2, … are readily available</b>: pdf f_R(x) = 1 and cdf F_R(x) = x for 0 ≤ x ≤ 1. Two techniques: <b>inverse transform</b> (exponential, uniform, triangular, discrete) and <b>acceptance-rejection</b> (Poisson).",
     "الـ <b>Random-variate generation</b> معناها إننا نحوّل random numbers من الـ uniform (اسمها R) لقيم X ماشية على الـ distribution اللي عايزينها. وكل الطرق <b>بتفترض إن الـ uniform (0, 1) random numbers جاهزة</b>، والـ pdf والـ cdf بتوعها:<span class=\"ltr\">f_R(x) = 1 ,  F_R(x) = x   (0 ≤ x ≤ 1)</span>وفيه طريقتين: الـ <b>inverse transform</b> (للـ exponential والـ uniform والـ triangular والـ discrete)، والـ <b>acceptance-rejection</b> (للـ Poisson)."
    ],
    [
     "<b>Inverse transform</b>: find the cdf F(x), <b>set F(X) = R</b>, then solve <b>X = F⁻¹(R)</b>. F⁻¹ is the solution of R = F(X) for X in terms of R, <b>not 1/f</b> and not 1/F. It works because F(X) of a continuous random variable is itself a random variable <b>uniform on (0, 1)</b>.",
     "الـ <b>Inverse transform</b>: هات الـ cdf بتاعة الـ distribution، و<b>خليها تساوي R</b>، وبعدين حل لـ X:<span class=\"ltr\">F(X) = R  ⇒  X = F⁻¹(R)</span>والـ <bdi dir=\"ltr\">F⁻¹</bdi> هنا معناها حل المعادلة <bdi dir=\"ltr\">R = F(X)</bdi> لـ X بدلالة R، <b>مش <bdi dir=\"ltr\">1/f</bdi></b> ولا <bdi dir=\"ltr\">1/F</bdi>. والطريقة شغالة لأن <bdi dir=\"ltr\">F(X)</bdi> لأي continuous random variable هي نفسها random variable <b>uniform على <bdi dir=\"ltr\">(0, 1)</bdi></b>."
    ],
    [
     "<b>Exponential</b>: λ = mean number of occurrences per unit time, E(X) = 1/λ = mean interarrival time; F(x) = 1 − e^(−λx), x ≥ 0. Solve 1 − e^(−λX) = R → e^(−λX) = 1 − R → <b>X = −(1/λ) ln(1 − R)</b> (5.1), the <b>random variate generator</b>. Equation (5.2) uses <b>X = −(1/λ) ln R</b>, allowed because 1 − R and R are both uniform on (0, 1). The same R gives different X values, but both streams have the same distribution.",
     "الـ <b>Exponential</b>: الـ λ هي متوسط عدد الـ occurrences في وحدة الزمن، والـ <bdi dir=\"ltr\">E(X) = 1/λ</bdi> هي متوسط الـ interarrival time، والـ cdf هي <bdi dir=\"ltr\">F(x) = 1 − e^(−λx)</bdi>. والحل:<span class=\"ltr\">1 − e^(−λX) = R  →  e^(−λX) = 1 − R  →  X = −(1/λ) ln(1 − R)   (5.1)</span>ودي اسمها الـ <b>random variate generator</b>. والمعادلة (5.2) بتستخدم <bdi dir=\"ltr\">X = −(1/λ) ln R</bdi>، وده مسموح لأن <bdi dir=\"ltr\">1 − R</bdi> و R الاتنين uniform على <bdi dir=\"ltr\">(0, 1)</bdi>. نفس الـ R بيدّي قيم X مختلفة، بس الاتنين ليهم نفس الـ distribution."
    ],
    [
     "The 4-step procedure: (1) compute the cdf, (2) set F(X) = R on the range of X, (3) solve for X in terms of R, (4) generate R1, R2, … and compute Xi = F⁻¹(Ri). Example λ = 2, R = 0.3: (5.1) X = −0.5 ln 0.7 = <b>0.178</b>; (5.2) X = −0.5 ln 0.3 = <b>0.602</b>.",
     "الخطوات الأربعة: (1) احسب الـ cdf، (2) خليها تساوي R على مدى الـ X، (3) حل لـ X بدلالة R، (4) ولّد <bdi dir=\"ltr\">R1, R2, …</bdi> واحسب <bdi dir=\"ltr\">Xi = F⁻¹(Ri)</bdi>. مثال بـ <bdi dir=\"ltr\">λ = 2</bdi> و <bdi dir=\"ltr\">R = 0.3</bdi>:<span class=\"ltr\">(5.1)  X = −0.5 ln 0.7 = 0.178 ;   (5.2)  X = −0.5 ln 0.3 = 0.602</span>"
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Uniform on [a, b] and the triangular distribution",
   "ar_h": "الـ Uniform على [a, b] والـ triangular",
   "pts": [
    [
     "<b>Uniform on [a, b]</b>: F(x) = (x − a)/(b − a) for a ≤ x ≤ b. Set (X − a)/(b − a) = R → X − a = R(b − a) → <b>X = a + (b − a)R</b> (5.3). Example [2, 10], R = 0.25: X = 2 + 8(0.25) = <b>4</b>.",
     "الـ <b>Uniform على <bdi dir=\"ltr\">[a, b]</bdi></b>: الـ cdf هي <bdi dir=\"ltr\">F(x) = (x − a)/(b − a)</bdi>. نخليها تساوي R ونحل:<span class=\"ltr\">(X − a)/(b − a) = R  →  X = a + (b − a)R   (5.3)</span>مثال على <bdi dir=\"ltr\">[2, 10]</bdi> بـ <bdi dir=\"ltr\">R = 0.25</bdi>:<span class=\"ltr\">X = 2 + 8(0.25) = 4</span>"
    ],
    [
     "<b>Triangular</b> (Figure 5.1): f(x) = x for 0 ≤ x ≤ 1, 2 − x for 1 < x ≤ 2; <b>endpoints 0 and 2, mode 1</b>, peak height 1. cdf: F(x) = x²/2 for 0 < x ≤ 1; 1 − (2 − x)²/2 for 1 < x ≤ 2.",
     "الـ <b>Triangular</b> (شكل 5.1): الـ pdf هي <bdi dir=\"ltr\">x</bdi> من 0 لـ 1، و <bdi dir=\"ltr\">2 − x</bdi> من 1 لـ 2، يعني <b>الأطراف 0 و 2 والـ mode عند 1</b> وارتفاع القمة 1. والـ cdf:<span class=\"ltr\">F(x) = x²/2   (0 < x ≤ 1) ;   F(x) = 1 − (2 − x)²/2   (1 < x ≤ 2)</span>"
    ],
    [
     "Which piece you use depends on R: 0 ≤ X ≤ 1 means <b>0 ≤ R ≤ 1/2</b>, so <b>X = √(2R)</b>; 1 ≤ X ≤ 2 means 1/2 ≤ R ≤ 1, so <b>X = 2 − √(2(1 − R))</b>. Check: R = 1/2 gives X = 1 (the mode) from both. Examples: R = 0.32 → √0.64 = <b>0.8</b>; R = 0.82 → 2 − √0.36 = <b>1.4</b>.",
     "الـ piece اللي هتستخدمها بتعتمد على R: لو <bdi dir=\"ltr\">0 ≤ X ≤ 1</bdi> يبقى <b><bdi dir=\"ltr\">0 ≤ R ≤ 1/2</bdi></b> والحل <bdi dir=\"ltr\">X = √(2R)</bdi>، ولو <bdi dir=\"ltr\">1 ≤ X ≤ 2</bdi> يبقى <bdi dir=\"ltr\">1/2 ≤ R ≤ 1</bdi> والحل <bdi dir=\"ltr\">X = 2 − √(2(1 − R))</bdi>. وللتأكد، <bdi dir=\"ltr\">R = 1/2</bdi> بتدّي <bdi dir=\"ltr\">X = 1</bdi> (الـ mode) من الاتنين. أمثلة:<span class=\"ltr\">R = 0.32 → √0.64 = 0.8 ;   R = 0.82 → 2 − √0.36 = 1.4</span>"
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Discrete distributions: table lookup and formulas",
   "ar_h": "الـ Discrete distributions: الـ table lookup والقوانين",
   "pts": [
    [
     "Discrete variates come from the inverse transform <b>numerically (table lookup)</b> or <b>algebraically (formula)</b>. A discrete cdf is <b>horizontal steps with jumps of size p(x)</b>. Rule: if <b>F(x(i−1)) = r(i−1) &lt; R ≤ ri = F(xi)</b>, set X = xi (r0 = 0).",
     "الـ discrete variates بتطلع من الـ inverse transform يا <b>numerically بالـ table lookup</b> يا <b>algebraically بقانون</b>. والـ cdf بتاعة أي discrete variable عبارة عن <b>خطوط أفقية فيها jumps حجمها <bdi dir=\"ltr\">p(x)</bdi></b>. والقاعدة:<span class=\"ltr\">F(x(i−1)) = r(i−1) < R ≤ ri = F(xi)  ⇒  X = xi   (r0 = 0)</span>"
    ],
    [
     "<b>Example 5.2</b> (shipments 0, 1, 2 with p = 0.50, 0.30, 0.20): r = 0.5, 0.8, 1.0, so X = 0 if R ≤ 0.5, 1 if 0.5 &lt; R ≤ 0.8, 2 if 0.8 &lt; R ≤ 1. <b>R1 = 0.73 → X1 = 1</b>. Graphically: a horizontal line from R on the vertical axis to the jump, then drop a perpendicular. Trap: R equal to F(xi) belongs to xi (R = 0.80 → 1).",
     "<b>مثال 5.2</b> (الـ shipments بقيم 0 و 1 و 2 واحتمالات <bdi dir=\"ltr\">0.50, 0.30, 0.20</bdi>): الـ cumulative هي <bdi dir=\"ltr\">0.5, 0.8, 1.0</bdi>، يعني:<span class=\"ltr\">X = 0 if R ≤ 0.5 ;  1 if 0.5 < R ≤ 0.8 ;  2 if 0.8 < R ≤ 1</span>يبقى <bdi dir=\"ltr\">R1 = 0.73 → X1 = 1</bdi>. وبالرسم: ارسم خط أفقي من R على المحور الرأسي لحد الـ jump، وبعدين انزل عمودي واقرا X. وخد بالك: لو R بالظبط بتساوي <bdi dir=\"ltr\">F(xi)</bdi> تبقى تبع <bdi dir=\"ltr\">xi</bdi> (يعني <bdi dir=\"ltr\">R = 0.80 → 1</bdi>)."
    ],
    [
     "<b>Discrete uniform</b> on {1, …, k}: (i − 1)/k &lt; R ≤ i/k → <b>X = ⌈Rk⌉</b> (round up), e.g. ⌈7.8⌉ = 8. <b>Example 5.4</b>, p(x) = 2x/(k(k + 1)): F(x) = x(x + 1)/(k(k + 1)); solve x² − x − k(k + 1)R = 0 with the positive root x = (1 + √(1 + 4(k² + k)R))/2, then <b>X = ⌈x − 1⌉</b>. k = 10, R = 0.73: x = (1 + √322.2)/2 = 9.475 → X = ⌈8.475⌉ = <b>9</b> (the table agrees: F(8) = 0.655 &lt; 0.73 ≤ F(9) = 0.818).",
     "الـ <b>Discrete uniform</b> على <bdi dir=\"ltr\">{1, …, k}</bdi>: القاعدة بتدّي <bdi dir=\"ltr\">(i − 1)/k < R ≤ i/k</bdi> يعني <bdi dir=\"ltr\">X = ⌈Rk⌉</bdi> (تقريب لفوق)، مثلًا <bdi dir=\"ltr\">⌈7.8⌉ = 8</bdi>. و<b>مثال 5.4</b> بالـ pmf دي <bdi dir=\"ltr\">p(x) = 2x/(k(k + 1))</bdi>:<span class=\"ltr\">F(x) = x(x + 1)/(k(k + 1)) ;  x = (1 + √(1 + 4(k² + k)R))/2 ;  X = ⌈x − 1⌉</span>مثال بـ <bdi dir=\"ltr\">k = 10</bdi> و <bdi dir=\"ltr\">R = 0.73</bdi>:<span class=\"ltr\">x = (1 + √322.2)/2 = 9.475  →  X = ⌈8.475⌉ = 9</span>والجدول بيأكد ده لأن <bdi dir=\"ltr\">F(8) = 0.655 < 0.73 ≤ F(9) = 0.818</bdi>."
    ],
    [
     "<b>Geometric</b> p(x) = p(1 − p)^x, x = 0, 1, 2, …: F(x) = 1 − (1 − p)^(x+1), so <b>X = ⌈ln(1 − R)/ln(1 − p) − 1⌉</b>; on {q, q + 1, …}: X = q + ⌈ln(1 − R)/ln(1 − p) − 1⌉, commonly q = 1. Since ln(1 − p) &lt; 0, dividing by it reverses the inequalities.",
     "الـ <b>Geometric</b> بالـ pmf <bdi dir=\"ltr\">p(x) = p(1 − p)^x</bdi> على <bdi dir=\"ltr\">x = 0, 1, 2, …</bdi>: الـ cdf هي <bdi dir=\"ltr\">F(x) = 1 − (1 − p)^(x+1)</bdi>، والـ generator:<span class=\"ltr\">X = ⌈ ln(1 − R)/ln(1 − p) − 1 ⌉ ;   on {q, q+1, …}:  X = q + ⌈ ln(1 − R)/ln(1 − p) − 1 ⌉</span>وغالبًا <bdi dir=\"ltr\">q = 1</bdi>. وخد بالك إن <bdi dir=\"ltr\">ln(1 − p) < 0</bdi>، فلما تقسم عليه الـ inequalities بتتقلب."
    ],
    [
     "<b>Example 5.6</b> (geometric on {X ≥ 1}, mean 1/p = 2 → <b>p = 1/2, q = 1</b>): R = 0.932: ln 0.068/ln 0.5 = 3.878 → 1 + ⌈2.878⌉ = <b>4</b>; R = 0.105: 0.160 → 1 + ⌈−0.840⌉ = <b>1</b>; R = 0.687: 1.676 → 1 + ⌈0.676⌉ = <b>2</b>.",
     "<b>مثال 5.6</b> (geometric على <bdi dir=\"ltr\">X ≥ 1</bdi> بـ mean <bdi dir=\"ltr\">1/p = 2</bdi> يعني <bdi dir=\"ltr\">p = 1/2</bdi> و <bdi dir=\"ltr\">q = 1</bdi>):<span class=\"ltr\">R = 0.932: ln 0.068/ln 0.5 = 3.878 → 1 + ⌈2.878⌉ = 4</span><span class=\"ltr\">R = 0.105: 0.160 → 1 + ⌈−0.840⌉ = 1</span><span class=\"ltr\">R = 0.687: 1.676 → 1 + ⌈0.676⌉ = 2</span>"
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Acceptance-rejection and the Poisson generator",
   "ar_h": "الـ Acceptance-rejection وتوليد الـ Poisson",
   "pts": [
    [
     "<b>Acceptance-rejection</b> (X uniform on [1/4, 1]): Step 1 generate R; Step 2 <b>accept X = R if R ≥ 1/4</b>, otherwise <b>reject</b> and return to Step 1; Step 3 repeat if another variate is needed. It is correct because accepted values are R conditioned on {R ≥ 1/4}: P(a &lt; R ≤ b | 1/4 ≤ R ≤ 1) = (b − a)/(3/4). <b>Efficiency</b>: the fewer the rejections, the higher the efficiency.",
     "الـ <b>Acceptance-rejection</b> (عشان نطلّع X uniform على <bdi dir=\"ltr\">[1/4, 1]</bdi>): الخطوة 1 ولّد R، الخطوة 2 <b>اقبل <bdi dir=\"ltr\">X = R</bdi> لو <bdi dir=\"ltr\">R ≥ 1/4</bdi></b> وغير كده <b>ارفض</b> وارجع للخطوة 1، والخطوة 3 كرّر لو محتاج variate تاني. والطريقة صح لأن القيم المقبولة هي R بشرط <bdi dir=\"ltr\">R ≥ 1/4</bdi>:<span class=\"ltr\">P(a < R ≤ b | 1/4 ≤ R ≤ 1) = (b − a)/(3/4)</span>والـ <b>efficiency</b>: كل ما الـ rejections تقل، الـ efficiency تزيد."
    ],
    [
     "<b>Poisson</b> p(n) = e^(−α)αⁿ/n!: N = number of arrivals in one time unit when interarrival times Ai are exponential with rate α. <b>N = n ⇔ A1 + … + An ≤ 1 &lt; A1 + … + A(n+1)</b> (5.7). With Ai = −(1/α) ln Ri this becomes <b>Π(i=1..n) Ri ≥ e^(−α) &gt; Π(i=1..n+1) Ri</b>.",
     "الـ <b>Poisson</b> بالـ pmf <bdi dir=\"ltr\">p(n) = e^(−α)αⁿ/n!</bdi>: الـ N هي عدد الـ arrivals في وحدة زمن، لما الـ interarrival times (<bdi dir=\"ltr\">Ai</bdi>) تبقى exponential بـ rate α. يعني الـ Poisson (discrete) مرتبط بالـ exponential (continuous):<span class=\"ltr\">N = n  ⇔  A1 + … + An ≤ 1 < A1 + … + A(n+1)   (5.7)</span>وبـ <bdi dir=\"ltr\">Ai = −(1/α) ln Ri</bdi> الشرط بيبقى:<span class=\"ltr\">Π(i=1..n) Ri ≥ e^(−α) > Π(i=1..n+1) Ri</span>"
    ],
    [
     "Procedure: <b>Step 1</b> n = 0, P = 1; <b>Step 2</b> generate R(n+1), P = P · R(n+1); <b>Step 3</b> if <b>P &lt; e^(−α)</b> accept N = n, else reject n, set n = n + 1 and go back to Step 2. N = n uses <b>n + 1 random numbers</b>, so on average <b>α + 1</b>.",
     "الخطوات: <b>الخطوة 1</b> <bdi dir=\"ltr\">n = 0, P = 1</bdi>، <b>الخطوة 2</b> ولّد <bdi dir=\"ltr\">R(n+1)</bdi> واضرب <bdi dir=\"ltr\">P = P · R(n+1)</bdi>، <b>الخطوة 3</b> لو <bdi dir=\"ltr\">P < e^(−α)</bdi> اقبل <bdi dir=\"ltr\">N = n</bdi>، وغير كده ارفض الـ n وزوّدها واحد وارجع للخطوة 2. والـ <bdi dir=\"ltr\">N = n</bdi> بتاخد <b><bdi dir=\"ltr\">n + 1</bdi> random numbers</b>، يعني في المتوسط <b><bdi dir=\"ltr\">α + 1</bdi></b>."
    ],
    [
     "<b>Example 5.7</b> (α = 0.2, e^(−0.2) = 0.8187): 0.4357 &lt; 0.8187 → <b>N = 0</b>; 0.4146 → <b>N = 0</b>; 0.8353 (reject), × 0.9952 = 0.8312 (reject), × 0.8004 = 0.6654 &lt; 0.8187 → <b>N = 2</b>. Three variates used <b>5</b> random numbers; 1000 variates need about 1000(α + 1) = <b>1200</b>.",
     "<b>مثال 5.7</b> (<bdi dir=\"ltr\">α = 0.2</bdi> و <bdi dir=\"ltr\">e^(−0.2) = 0.8187</bdi>):<span class=\"ltr\">0.4357 < 0.8187 → N = 0 ;   0.4146 → N = 0</span><span class=\"ltr\">0.8353 (reject) → × 0.9952 = 0.8312 (reject) → × 0.8004 = 0.6654 < 0.8187 → N = 2</span>التلات variates أخدوا <b>5</b> random numbers، ولو عايز 1000 variate هتحتاج تقريبًا:<span class=\"ltr\">1000(α + 1) = 1000 × 1.2 = 1200</span>"
    ]
   ]
  },
  {
   "lec": 5,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "MCQ (Final 2024/25, and the Ch3 MCQ revision sheet, Q5): \"If X is a random variable of any continuous distribution, then Y = F(X) has distribution\" → <b>Uniform in (0, 1)</b> (not normal or exponential). This is Step 2 of the inverse transform.",
     "سؤال MCQ (Final <bdi dir=\"ltr\">2024/25</bdi>، وكمان ورقة مراجعة الـ Ch3 MCQ سؤال 5): لو X random variable من أي continuous distribution، الـ <bdi dir=\"ltr\">Y = F(X)</bdi> ليها distribution إيه؟ الإجابة <b><bdi dir=\"ltr\">Uniform in (0, 1)</bdi></b> (مش normal ولا exponential)، ودي الخطوة 2 في الـ inverse transform."
    ],
    [
     "Past finals have no written problem from this lecture. Likely derivations: the generator for the exponential (5.1)/(5.2), uniform (5.3), triangular (two pieces), discrete uniform ⌈Rk⌉, geometric, and Example 5.4, each by the 4 steps.",
     "الامتحانات اللي فاتت مفيهاش مسألة مكتوبة من المحاضرة دي. والـ derivations المتوقعة: الـ generator بتاع الـ exponential (5.1) و (5.2)، والـ uniform (5.3)، والـ triangular بالـ two pieces، والـ discrete uniform <bdi dir=\"ltr\">⌈Rk⌉</bdi>، والـ geometric، ومثال 5.4، كل واحد بالخطوات الأربعة."
    ],
    [
     "Likely calculations: generate values from given R's (exponential, triangular, a table lookup, a geometric with q, a Poisson product trace with the count of random numbers used), and the acceptance-rejection steps for [1/4, 1].",
     "والحسابات المتوقعة: تولّد قيم من R's معطاة (exponential، أو triangular، أو table lookup، أو geometric بـ q، أو Poisson بالضرب خطوة بخطوة مع عدد الـ random numbers اللي استخدمتها)، وخطوات الـ acceptance-rejection على <bdi dir=\"ltr\">[1/4, 1]</bdi>."
    ],
    [
     "Traps: F⁻¹ is not 1/f; the triangular piece depends on R ≤ 1/2, not on X; an R equal to F(xi) gives xi; the Poisson test compares the <b>product P with e^(−α)</b> (not with α) and accepts when P &lt; e^(−α); fewer rejections mean higher efficiency.",
     "الفخاخ: الـ <bdi dir=\"ltr\">F⁻¹</bdi> مش <bdi dir=\"ltr\">1/f</bdi>، والـ piece في الـ triangular بتتحدد بـ <bdi dir=\"ltr\">R ≤ 1/2</bdi> مش بـ X، والـ R اللي بتساوي <bdi dir=\"ltr\">F(xi)</bdi> بتدّي <bdi dir=\"ltr\">xi</bdi>، واختبار الـ Poisson بيقارن <b>حاصل الضرب P بـ <bdi dir=\"ltr\">e^(−α)</bdi></b> (مش بـ α) وبيقبل لما <bdi dir=\"ltr\">P < e^(−α)</bdi>، وكل ما الـ rejections تقل الـ efficiency تزيد."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Input modeling: the 4 steps and data collection",
   "ar_h": "الـ Input modeling: الخطوات الأربعة وجمع الداتا",
   "pts": [
    [
     "<b>Input models provide the driving force for a simulation model</b>; the quality of the output is <b>no better</b> than the quality of the inputs. <b>4 steps</b>: (1) collect data from the real system, (2) identify a probability distribution for the input process, (3) choose its parameters, (4) evaluate the distribution and parameters for <b>goodness of fit</b>.",
     "الـ <b>Input models هي الـ driving force بتاعة الـ simulation model</b>، وجودة الـ output <b>مش أحسن</b> من جودة الـ inputs. و<b>الخطوات الأربعة</b>: (1) اجمع داتا من الـ real system، (2) حدد probability distribution تمثل الـ input process، (3) اختار الـ parameters بتاعتها، (4) قيّم الـ distribution والـ parameters بالـ <b>goodness of fit</b>."
    ],
    [
     "Input data examples: queueing → <b>time between arrivals</b> and <b>service times</b>; inventory → <b>demand</b> and <b>lead time</b>. Data collection is <b>one of the biggest tasks</b>. <b>GIGO</b> (Garbage-In-Garbage-Out): even a valid model misleads if the data are inaccurately collected, inappropriately analyzed, or not representative of the environment.",
     "أمثلة على الـ input data: في الـ queueing الـ <b>time between arrivals</b> والـ <b>service times</b>، وفي الـ inventory الـ <b>demand</b> والـ <b>lead time</b>. وجمع الداتا <b>من أكبر المهام</b>. والـ <b>GIGO</b> يعني Garbage-In-Garbage-Out: حتى لو الـ model صح، النتايج هتضلّل لو الداتا اتجمعت غلط، أو اتحللت غلط، أو مش ممثلة للبيئة."
    ],
    [
     "<b>7 suggestions</b> for data collection: (1) <b>plan ahead</b> (pre-observing session, watch for unusual circumstances); (2) <b>analyze the data as it is collected</b> (check adequacy); (3) <b>combine homogeneous data sets</b>; (4) <b>be aware of data censoring</b>; (5) check for <b>relationships between variables</b> (scatter diagram); (6) check for <b>autocorrelation</b>; (7) collect <b>input data, not performance data</b>.",
     "<b>الـ 7 suggestions</b> لجمع الداتا: (1) <b>plan ahead</b> (جلسة pre-observing وخلي بالك من الظروف الغريبة)، (2) <b>حلّل الداتا وانت بتجمعها</b> (اتأكد إنها كفاية)، (3) <b>combine homogeneous data sets</b>، (4) <b>خد بالك من الـ data censoring</b>، (5) شوف الـ <b>relationship بين المتغيرات</b> (بالـ scatter diagram)، (6) شوف الـ <b>autocorrelation</b>، (7) اجمع <b>input data مش performance data</b>."
    ],
    [
     "Meanings: homogeneous sets → first test that their <b>means</b> are the same; <b>censoring</b> = the quantity is not observed in its entirety (danger of leaving out long process times); <b>autocorrelation</b> = the service time of customer i affects customer i + n; <b>input data</b> (e.g. arrival times) are beyond the system's control, unlike <b>performance data</b> (outputs such as delays).",
     "المعاني: الـ homogeneous sets أول اختبار ليها إن الـ <b>means</b> تبقى زي بعض، والـ <b>censoring</b> معناه إن الكمية متشافتش كلها (خطر إنك تسيب الـ process times الطويلة)، والـ <b>autocorrelation</b> إن الـ service time بتاع العميل i بيأثر على العميل <bdi dir=\"ltr\">i + n</bdi>، والـ <b>input data</b> (زي الـ arrival times) خارج تحكم السيستم، عكس الـ <b>performance data</b> (outputs زي الـ delays)."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Identifying the distribution: histograms, scatter diagrams, families",
   "ar_h": "تحديد الـ distribution: الـ histograms والـ scatter diagrams والـ families",
   "pts": [
    [
     "A <b>histogram</b> shows the <b>shape</b> of a distribution. Number of intervals depends on the number of observations and the dispersion; suggested <b>√n</b> (n = 64 → 8). Continuous data → the histogram matches a <b>PDF</b>; discrete → a <b>PMF</b>. Few data → <b>combine adjacent cells</b>. Intervals too wide → <b>coarse (blocky)</b>; too narrow → <b>ragged</b>.",
     "الـ <b>histogram</b> بيوضح <b>شكل</b> الـ distribution. وعدد الـ intervals بيعتمد على عدد الـ observations والـ dispersion، والمقترح <b><bdi dir=\"ltr\">√n</bdi></b> (يعني <bdi dir=\"ltr\">n = 64 → 8</bdi>). في الـ continuous data الـ histogram بيقابل <b>PDF</b>، وفي الـ discrete بيقابل <b>PMF</b>. ولو الداتا قليلة <b>اعمل combine للـ adjacent cells</b>. ولو الـ intervals واسعة قوي يبقى <b>coarse (blocky)</b>، ولو ضيقة قوي يبقى <b>ragged</b>."
    ],
    [
     "Examples: <b>vehicle arrivals</b> (7:00 to 7:05 am, 100 workdays): discrete, ample data, so <b>one cell per value</b> 0 to 11, right-skewed with a peak of 19 at 2. <b>Chip life</b> (tests at 1.5 times the nominal voltage): continuous, 3-day intervals, a long right tail like an <b>exponential</b>.",
     "أمثلة: الـ <b>vehicle arrivals</b> (من <bdi dir=\"ltr\">7:00</bdi> لـ <bdi dir=\"ltr\">7:05</bdi> الصبح لمدة 100 يوم شغل): وهو discrete والداتا كتير، فبنعمل <b>cell لكل قيمة</b> من 0 لـ 11، وشكله right-skewed وأعلى bar هو 19 عند 2. والـ <b>chip life</b> (اختبارات عند <bdi dir=\"ltr\">1.5</bdi> مرة الـ nominal voltage): وهو continuous بـ intervals كل واحد 3 أيام، وليه ديل طويل ناحية اليمين زي الـ <b>exponential</b>."
    ],
    [
     "<b>Scatter diagram</b>: a quality tool showing the <b>relationship between paired data</b>, X on the x-axis and Y on the y-axis: strong, moderate or no correlation; positive or negative. For a linear relationship: <b>correlation</b> (how well data line up), <b>slope</b> (steepness), <b>direction</b>, <b>Y intercept</b>.",
     "الـ <b>Scatter diagram</b> أداة quality بتوضح <b>العلاقة بين داتا متزوجة (paired)</b>، الـ X على المحور الأفقي والـ Y على الرأسي: correlation قوي أو متوسط أو مفيش، وموجب أو سالب. ولو العلاقة linear بنشوف الـ <b>correlation</b> (الداتا مصفوفة على خط قد إيه)، والـ <b>slope</b> (الميل)، والـ <b>direction</b>، والـ <b>Y intercept</b>."
    ],
    [
     "The family is chosen by the <b>context</b> of the variable and the <b>shape of the histogram</b>. Easier to analyze: <b>exponential, normal, Poisson</b>; difficult: <b>beta, gamma, Weibull</b> (they have a wide array of shapes). The exponential is a special case of the Weibull.",
     "الـ family بتتختار حسب الـ <b>context</b> بتاع المتغير و<b>شكل الـ histogram</b>. الأسهل في التحليل: الـ <b>exponential والـ normal والـ Poisson</b>، والأصعب: الـ <b>beta والـ gamma والـ Weibull</b> (لأن أشكالها كتير). والـ exponential حالة خاصة من الـ Weibull."
    ],
    [
     "<b>Physical basis</b>: binomial = successes in n trials; negative binomial and geometric = trials to achieve k successes; Poisson = independent events in a fixed time or space; normal = <b>sum</b> of component processes; lognormal = <b>product</b> of component processes; exponential = time between independent events (memoryless); Weibull = time to failure; uniform = complete uncertainty (no data); triangular = only min, most likely, max known; empirical = resamples the actual data.",
     "الـ <b>Physical basis</b>: الـ binomial عدد الـ successes في n trials، والـ negative binomial والـ geometric عدد الـ trials لحد k successes، والـ Poisson عدد الأحداث المستقلة في وقت أو مكان ثابت، والـ normal <b>مجموع</b> processes، والـ lognormal <b>حاصل ضرب</b> processes، والـ exponential الوقت بين أحداث مستقلة (memoryless)، والـ Weibull الـ time to failure، والـ uniform عدم يقين كامل (مفيش داتا)، والـ triangular لما نعرف الـ min والـ most likely والـ max بس، والـ empirical بيعيد sampling من الداتا الحقيقية."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Quantile-quantile (Q-Q) plots",
   "ar_h": "الـ Quantile-quantile (Q-Q) plots",
   "pts": [
    [
     "A <b>Q-Q plot</b> evaluates the fit of a chosen distribution (a histogram is not preferred for that). The q-quantile γ satisfies F(γ) = q, γ = F⁻¹(q). Sort the sample y1 ≤ … ≤ yn; <b>yj ≈ F⁻¹[(j − 1/2)/n]</b>; plot yj against F⁻¹[(j − 1/2)/n]. Example n = 20, j = 1: the (0.5/20) = 0.025 quantile.",
     "الـ <b>Q-Q plot</b> بيقيّم الـ fit بتاع الـ distribution اللي اخترناها (الـ histogram مش المفضل لده). والـ q-quantile هي γ اللي بتحقق <bdi dir=\"ltr\">F(γ) = q</bdi> يعني <bdi dir=\"ltr\">γ = F⁻¹(q)</bdi>. رتّب العينة <bdi dir=\"ltr\">y1 ≤ … ≤ yn</bdi>، وارسم كل <bdi dir=\"ltr\">yj</bdi> قصاد الـ quantile بتاعها:<span class=\"ltr\">yj ≈ F⁻¹[(j − 1/2)/n]</span>مثال <bdi dir=\"ltr\">n = 20</bdi> و <bdi dir=\"ltr\">j = 1</bdi>: الـ quantile رقم <bdi dir=\"ltr\">0.5/20 = 0.025</bdi>."
    ],
    [
     "Reading: right family → approximately a <b>straight line</b>; right parameters too → <b>slope 1</b>; wrong distribution → points <b>deviate from a straight line</b>. Points never fall exactly on the line; ranked values are not independent; the extremes have higher variance, so <b>linearity in the middle matters more</b>. Example 6.3 (20 door-installation times, mean 99.99 s, s = 0.2832 s) is close to straight → normal.",
     "القراية: لو الـ family صح النقط بتبقى تقريبًا على <b>خط مستقيم</b>، ولو الـ parameters كمان صح الـ <b>slope بيبقى 1</b>، ولو الـ distribution غلط النقط <b>بتبعد عن الخط</b>. والنقط عمرها ما هتقع على الخط بالظبط، والقيم المترتبة مش independent، والأطراف الـ variance بتاعتها أعلى، فـ <b>الـ linearity في النص أهم</b>. ومثال 6.3 (20 وقت تركيب أبواب، الـ mean <bdi dir=\"ltr\">99.99 s</bdi> والـ s بتساوي <bdi dir=\"ltr\">0.2832 s</bdi>) قريب من الخط المستقيم يبقى normal."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Parameter estimation",
   "ar_h": "الـ Parameter estimation",
   "pts": [
    [
     "The next step after selecting a family. Raw data: <b>X̄ = ΣXi/n</b>, <b>S² = (ΣXi² − nX̄²)/(n − 1)</b>. Grouped discrete (fj = frequency of value Xj): X̄ = ΣfjXj/n, S² = (ΣfjXj² − nX̄²)/(n − 1). Class intervals (midpoints mj, c intervals): X̄ ≈ Σfjmj/n, S² ≈ (Σfjmj² − nX̄²)/(n − 1).",
     "دي الخطوة اللي بعد اختيار الـ family. والقوانين:<span class=\"ltr\">Raw:  X̄ = ΣXi/n ,  S² = (ΣXi² − nX̄²)/(n − 1)</span><span class=\"ltr\">Grouped discrete:  X̄ = ΣfjXj/n ,  S² = (ΣfjXj² − nX̄²)/(n − 1)</span><span class=\"ltr\">Class intervals:  X̄ ≈ Σfjmj/n ,  S² ≈ (Σfjmj² − nX̄²)/(n − 1)</span>والـ <bdi dir=\"ltr\">fj</bdi> هي الـ frequency، والـ <bdi dir=\"ltr\">mj</bdi> هي منتصف الـ interval رقم j."
    ],
    [
     "Vehicle data: n = 100, ΣfjXj = 364, ΣfjXj² = 2080 → <b>X̄ = 3.64</b>, S² = (2080 − 100 × 3.64²)/99 = 755.04/99 = <b>7.63</b>. The histogram suggests Poisson, where μ = σ² = λ, but 3.64 ≠ 7.63 because <b>each estimator is a random variable</b> (not perfect).",
     "داتا الـ vehicles:<span class=\"ltr\">n = 100 ,  ΣfjXj = 364 ,  ΣfjXj² = 2080</span><span class=\"ltr\">X̄ = 3.64 ;   S² = (2080 − 100 × 3.64²)/99 = 755.04/99 = 7.63</span>الـ histogram بيقول Poisson، واللي فيه <bdi dir=\"ltr\">μ = σ² = λ</bdi>، بس <bdi dir=\"ltr\">3.64 ≠ 7.63</bdi> لأن <b>كل estimator هو random variable</b> ومش مثالي."
    ],
    [
     "A <b>parameter is an unknown constant</b>; an <b>estimator is a statistic</b>. Suggested (<b>maximum-likelihood</b>) estimators: Poisson α̂ = X̄; exponential <b>λ̂ = 1/X̄</b>; gamma θ̂ = 1/X̄; normal μ̂ = X̄, σ̂² = S²; lognormal μ̂ = X̄, σ̂² = S² <b>after taking ln of the data</b>.",
     "الـ <b>parameter هو ثابت مجهول</b>، والـ <b>estimator هو statistic</b>. والـ estimators المقترحة (<b>maximum-likelihood</b>):<span class=\"ltr\">Poisson: α̂ = X̄ ;  Exponential: λ̂ = 1/X̄ ;  Gamma: θ̂ = 1/X̄</span><span class=\"ltr\">Normal: μ̂ = X̄, σ̂² = S² ;  Lognormal: μ̂ = X̄, σ̂² = S² (of ln data)</span>يعني في الـ lognormal لازم <b>تاخد الـ ln للداتا الأول</b>."
    ],
    [
     "<b>Example 6.4</b> (lognormal, 10 rates of return 18.8, 27.9, 21.0, 6.1, 37.4, 5.0, 22.9, 1.0, 3.1, 8.3): ln values 2.9, 3.3, 3.0, 1.8, 3.6, 1.6, 3.1, 0, 1.1, 2.1; Σ = 22.5, Σ² = 62.29 → <b>μ̂ = 2.25</b>, <b>σ̂² = (62.29 − 10 × 2.25²)/9 = 1.30</b> (2.27 and 1.32 with unrounded logs).",
     "<b>مثال 6.4</b> (lognormal على 10 rates of return):<span class=\"ltr\">18.8, 27.9, 21.0, 6.1, 37.4, 5.0, 22.9, 1.0, 3.1, 8.3</span>الـ ln بتاعهم:<span class=\"ltr\">2.9, 3.3, 3.0, 1.8, 3.6, 1.6, 3.1, 0, 1.1, 2.1  (Σ = 22.5, Σ² = 62.29)</span><span class=\"ltr\">μ̂ = 22.5/10 = 2.25 ;   σ̂² = (62.29 − 10 × 2.25²)/9 = 1.30</span>ولو الـ logs من غير تقريب يطلعوا <bdi dir=\"ltr\">2.27</bdi> و <bdi dir=\"ltr\">1.32</bdi>."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Goodness of fit: decision errors and the chi-square test",
   "ar_h": "الـ Goodness of fit: أخطاء القرار والـ chi-square test",
   "pts": [
    [
     "Tests: <b>Kolmogorov-Smirnov</b> and <b>chi-square</b>. <b>No single correct distribution</b> exists: with very little data you are unlikely to reject any candidate; with a lot of data you are likely to reject all. <b>Type I error (α)</b> = reject H₀ when it is true (<b>false positive</b>); <b>Type II error (β)</b> = retain H₀ when it is false (<b>false negative</b>).",
     "الاختبارات هي الـ <b>Kolmogorov-Smirnov</b> والـ <b>chi-square</b>. و<b>مفيش distribution واحدة صح</b>: لو الداتا قليلة جدًا غالبًا مش هترفض أي واحدة، ولو الداتا كتير غالبًا هترفضهم كلهم. والـ <b>Type I error (α)</b> إنك ترفض الـ <bdi dir=\"ltr\">H₀</bdi> وهي صح (<b>false positive</b>)، والـ <b>Type II error (β)</b> إنك تقبل الـ <bdi dir=\"ltr\">H₀</bdi> وهي غلط (<b>false negative</b>)."
    ],
    [
     "<b>Chi-square</b>: compares the histogram with the candidate density; valid for <b>large samples</b> with MLE parameters; discrete or continuous. <b>χ₀² = Σ(Oᵢ − Eᵢ)²/Eᵢ</b>, Eᵢ = n·pᵢ, <b>minimum Eᵢ = 5</b>, <b>df = k − s − 1</b> (s = number of estimated parameters). Accept H₀ if χ₀² ≤ χ²α,k−s−1. Discrete: pᵢ = p(xᵢ); continuous: <b>pᵢ = F(aᵢ) − F(aᵢ₋₁)</b>. Combine a small Eᵢ with adjacent cells (and their Oᵢ), reducing k by one per cell combined.",
     "الـ <b>Chi-square</b> بيقارن الـ histogram بالـ density المرشحة، وشغال مع <b>العينات الكبيرة</b> والـ parameters متقدرة بالـ MLE، وينفع discrete أو continuous:<span class=\"ltr\">χ₀² = Σ (Oᵢ − Eᵢ)²/Eᵢ ,  Eᵢ = n·pᵢ ,  df = k − s − 1</span>والـ s هي عدد الـ parameters المتقدرة، وأقل <bdi dir=\"ltr\">Eᵢ</bdi> مقترحة هي 5. اقبل الـ <bdi dir=\"ltr\">H₀</bdi> لو <bdi dir=\"ltr\">χ₀² ≤ χ²α,k−s−1</bdi>. في الـ discrete الـ <bdi dir=\"ltr\">pᵢ = p(xᵢ)</bdi>، وفي الـ continuous <bdi dir=\"ltr\">pᵢ = F(aᵢ) − F(aᵢ₋₁)</bdi>. ولو <bdi dir=\"ltr\">Eᵢ</bdi> صغيرة ادمجها مع اللي جنبها (ومعاها الـ <bdi dir=\"ltr\">Oᵢ</bdi>)، والـ k بتقل واحد لكل cell اتدمجت."
    ],
    [
     "Recommended k: n = 20 → do not use chi-square; n = 50 → 5 to 10; n = 100 → 10 to 20; n &gt; 100 → √n to n/5. <b>Caution</b>: a different grouping (k) can change the result; the same data may be accepted one way and rejected another, and for continuous data the grouping is arbitrary.",
     "الـ k المقترحة:<span class=\"ltr\">n = 20 → don't use ;  n = 50 → 5 to 10 ;  n = 100 → 10 to 20 ;  n > 100 → √n to n/5</span>و<b>خد بالك</b>: تقسيم مختلف (k مختلفة) ممكن يغيّر النتيجة، ونفس الداتا ممكن تتقبل بتقسيم وتترفض بتقسيم تاني، وفي الـ continuous التقسيم اختياري."
    ],
    [
     "<b>Vehicle example</b> (H₀: Poisson, α̂ = 3.64): Eᵢ = 100·e^(−3.64)3.64ˣ/x!. Combine x = 0, 1 (E = 12.2, O = 22) and x = 7 to ≥ 11 (E = 7.6, O = 17) → <b>k = 7, s = 1, df = 5</b>. χ₀² = <b>27.68 &gt; χ²0.05,5 = 11.07</b> → <b>reject</b>: not Poisson.",
     "<b>مثال الـ vehicles</b> (الـ <bdi dir=\"ltr\">H₀</bdi> إنها Poisson بـ <bdi dir=\"ltr\">α̂ = 3.64</bdi>): الـ <bdi dir=\"ltr\">Eᵢ = 100·e^(−3.64)·3.64ˣ/x!</bdi>. ندمج <bdi dir=\"ltr\">x = 0, 1</bdi> (يبقى <bdi dir=\"ltr\">E = 12.2</bdi> و <bdi dir=\"ltr\">O = 22</bdi>) ومن <bdi dir=\"ltr\">x = 7</bdi> لـ <bdi dir=\"ltr\">≥ 11</bdi> (يبقى <bdi dir=\"ltr\">E = 7.6</bdi> و <bdi dir=\"ltr\">O = 17</bdi>):<span class=\"ltr\">k = 7 ,  s = 1 ,  df = 7 − 1 − 1 = 5</span><span class=\"ltr\">χ₀² = 27.68 > χ²0.05,5 = 11.07  →  reject H₀</span>يعني الداتا مش Poisson."
    ],
    [
     "<b>Equal probabilities</b> (continuous): pᵢ = 1/k, Eᵢ = n/k ≥ 5 → <b>k ≤ n/5</b>. Exponential endpoints <b>aᵢ = −(1/λ) ln(1 − i·p)</b>. Example 6.6 (50 chips): λ̂ = 1/11.89 = 0.084, k = 8, Eᵢ = 6.25, a₁ = 1.590, a₂ = 3.425, a₃ = 5.595, …, a₇ = 24.755; df = 8 − 1 − 1 = 6, χ²0.05,6 = 12.6 → <b>reject</b> the exponential. ‡ The notes total 38.72; the third cell is 1.69, not 0.81, so χ₀² = 39.60 (same decision).",
     "الـ <b>Equal probabilities</b> (في الـ continuous): <bdi dir=\"ltr\">pᵢ = 1/k</bdi> و <bdi dir=\"ltr\">Eᵢ = n/k ≥ 5</bdi> يعني <b><bdi dir=\"ltr\">k ≤ n/5</bdi></b>. وأطراف الـ intervals للـ exponential:<span class=\"ltr\">aᵢ = −(1/λ) ln(1 − i·p)</span>مثال 6.6 (50 chip): <bdi dir=\"ltr\">λ̂ = 1/11.89 = 0.084</bdi>، و <bdi dir=\"ltr\">k = 8</bdi>، و <bdi dir=\"ltr\">Eᵢ = 6.25</bdi>:<span class=\"ltr\">a₁ = 1.590, a₂ = 3.425, a₃ = 5.595, …, a₇ = 24.755</span><span class=\"ltr\">df = 8 − 1 − 1 = 6 ,  χ²0.05,6 = 12.6  →  reject</span>يعني الـ exponential اترفض. ‡ النوتس جامعة 38.72، بس الـ cell التالتة <bdi dir=\"ltr\">1.69</bdi> مش <bdi dir=\"ltr\">0.81</bdi>، فالـ <bdi dir=\"ltr\">χ₀² = 39.60</bdi> (نفس القرار)."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Kolmogorov-Smirnov, p-values and models without data",
   "ar_h": "الـ Kolmogorov-Smirnov والـ p-values والـ models من غير داتا",
   "pts": [
    [
     "<b>K-S</b> formalizes the Q-Q idea: compares the hypothesized continuous CDF F(x) with the <b>empirical CDF Sɴ(x)</b>: <b>D = max|F(x) − Sɴ(x)|</b>; for uniformity D⁺ = max(i/N − R(i)), D⁻ = max(R(i) − (i − 1)/N), D = max(D⁺, D⁻). <b>More powerful</b>, useful with <b>small samples</b> and <b>no estimated parameters</b>; with estimated parameters the critical values are <b>biased (too large)</b>, so the test is <b>more conservative</b>. N &gt; 35: D0.05 = 1.36/√N. Do not reject if D &lt; Dα.",
     "الـ <b>K-S</b> بيحوّل فكرة الـ Q-Q لاختبار: بيقارن الـ CDF المفترضة <bdi dir=\"ltr\">F(x)</bdi> بالـ <b>empirical CDF</b> <bdi dir=\"ltr\">Sɴ(x)</bdi>:<span class=\"ltr\">D = max |F(x) − Sɴ(x)| ;  D⁺ = max(i/N − R(i)) ,  D⁻ = max(R(i) − (i − 1)/N)</span>وهو <b>أقوى (more powerful)</b>، ومفيد مع <b>العينات الصغيرة</b> ولما <b>مفيش parameters متقدرة</b>. ولو قدّرنا parameters الـ critical values بتبقى <b>biased (كبيرة زيادة)</b> فالاختبار يبقى <b>more conservative</b>. ولما <bdi dir=\"ltr\">N > 35</bdi> يبقى <bdi dir=\"ltr\">D0.05 = 1.36/√N</bdi>، ومترفضش لو <bdi dir=\"ltr\">D < Dα</bdi>."
    ],
    [
     "<b>Example 6.7</b>: interarrival times over T = 100 min; if they are exponential, the <b>arrival times are uniform on (0, T)</b>. Add the gaps, divide by T, and K-S test the 50 points for uniformity: D⁺ = 0.1054, D⁻ = 0.0080, <b>D = 0.1054 &lt; 1.36/√50 = 0.1923</b> → do not reject: exponential. A similar test is <b>Anderson-Darling</b>.",
     "<b>مثال 6.7</b>: عندنا interarrival times على مدى <bdi dir=\"ltr\">T = 100 min</bdi>. لو هي exponential، يبقى <b>الـ arrival times uniform على <bdi dir=\"ltr\">(0, T)</bdi></b>. اجمع الفواصل واقسم على T واعمل K-S للـ uniformity على الـ 50 نقطة:<span class=\"ltr\">D⁺ = 0.1054 ,  D⁻ = 0.0080 ,  D = 0.1054 < 1.36/√50 = 0.1923</span>يبقى مش هنرفض، والـ interarrival times exponential. وفيه اختبار شبهه اسمه <b>Anderson-Darling</b>."
    ],
    [
     "<b>p-value</b> = the significance level at which you would just reject H₀; a <b>large p-value = good fit</b>. Choosing the largest p-value automatically is risky: the software knows nothing about the physical basis, best-fit tends to pick flexible distributions (gamma, Weibull, exponential), and a p-value is just a summary measure.",
     "الـ <b>p-value</b> هو الـ significance level اللي عنده بالكاد هترفض الـ <bdi dir=\"ltr\">H₀</bdi>، و<b>الـ p-value الكبير معناه fit كويس</b>. وإنك تختار أكبر p-value أوتوماتيك فيه خطر: الـ software مايعرفش حاجة عن الـ physical basis، والـ best-fit بيميل للـ distributions المرنة (الـ gamma والـ Weibull والـ exponential)، والـ p-value مجرد ملخص."
    ],
    [
     "<b>No data</b>: sources are <b>engineering data</b>, <b>expert opinion</b> (optimistic, pessimistic, most likely), <b>physical or conventional limitations</b>, and the <b>nature of the process</b>; use <b>uniform, triangular, beta</b>, refined with <b>breakpoints</b>, and check the sensitivity. Example 6.8 (1000 to 5000 units; 90% &gt; 2000, 25% &gt; 3500, 1% &gt; 4500): P = <b>0.10, 0.65, 0.24, 0.01</b> for the four intervals.",
     "لو <b>مفيش داتا</b>: المصادر هي الـ <b>engineering data</b>، والـ <b>expert opinion</b> (optimistic وpessimistic وmost likely)، والـ <b>physical or conventional limitations</b>، والـ <b>nature of the process</b>. ونستخدم الـ <b>uniform والـ triangular والـ beta</b>، ونحسّنها بـ <b>breakpoints</b>، ونشوف الـ sensitivity. مثال 6.8 (من 1000 لـ 5000 وحدة، 90% أكتر من 2000، و 25% أكتر من 3500، و 1% أكتر من 4500):<span class=\"ltr\">P = 0.10 , 0.90 − 0.25 = 0.65 , 0.25 − 0.01 = 0.24 , 0.01</span>"
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Multivariate and time-series input models",
   "ar_h": "الـ Multivariate والـ time-series input models",
   "pts": [
    [
     "Dependent inputs need <b>multivariate</b> models (lead time and annual demand); a <b>time series</b> is identically distributed but dependent (successive times between orders). <b>ρ = cov(X₁, X₂)/(σ₁σ₂)</b>, between −1 and 1 (covariance can be any value); cov &gt; 0 → same side of the means, cov &lt; 0 → opposite sides, independent → 0. Lag-h autocorrelation ρₕ = corr(Xₜ, Xₜ₊ₕ) (covariance stationary if it depends only on h).",
     "لو الـ inputs معتمدة على بعض بنستخدم <b>multivariate</b> models (زي الـ lead time والـ annual demand)، والـ <b>time series</b> قيمها ليها نفس الـ distribution بس معتمدة على بعض (زي الأوقات بين الـ orders ورا بعض). والـ correlation:<span class=\"ltr\">ρ = cov(X₁, X₂) / (σ₁σ₂) ,   −1 ≤ ρ ≤ 1</span>والـ covariance ممكن تبقى أي قيمة. لو موجبة يبقوا في نفس الناحية من الـ means، ولو سالبة في ناحيتين عكس، ولو independent تبقى صفر. والـ lag-h autocorrelation هي <bdi dir=\"ltr\">ρₕ = corr(Xₜ, Xₜ₊ₕ)</bdi>، والـ series تبقى covariance stationary لو بتعتمد على h بس."
    ],
    [
     "<b>Example 6.9</b> (lead time, demand, 10 years): X̄₁ = 6.14, X̄₂ = 101.80, σ̂₁ = 1.02, σ̂₂ = 9.93, ΣX₁X₂ = 6328.5; cov = [6328.5 − 10(6.14)(101.80)]/9 = <b>8.66</b>; ρ̂ = 8.66/(1.02 × 9.93) = <b>0.86</b>: strongly dependent. Bivariate normal: Z₁, Z₂ from R₁, R₂; X₁ = μ₁ + σ₁Z₁; X₂ = μ₂ + σ₂(ρZ₁ + √(1 − ρ²)Z₂).",
     "<b>مثال 6.9</b> (الـ lead time والـ demand لـ 10 سنين):<span class=\"ltr\">X̄₁ = 6.14 , X̄₂ = 101.80 , σ̂₁ = 1.02 , σ̂₂ = 9.93 , ΣX₁X₂ = 6328.5</span><span class=\"ltr\">cov = [6328.5 − 10(6.14)(101.80)]/9 = 8.66 ;  ρ̂ = 8.66/(1.02 × 9.93) = 0.86</span>يعني معتمدين على بعض بقوة. وعشان نولّد bivariate normal:<span class=\"ltr\">X₁ = μ₁ + σ₁Z₁ ;  X₂ = μ₂ + σ₂(ρZ₁ + √(1 − ρ²) Z₂)</span>والـ <bdi dir=\"ltr\">Z₁, Z₂</bdi> طالعين من <bdi dir=\"ltr\">R₁, R₂</bdi>."
    ],
    [
     "<b>AR(1)</b>: Xₜ = μ + φ(Xₜ₋₁ − μ) + εₜ, εₜ normal (0, σε²), −1 &lt; φ &lt; 1; Var(Xₜ) = <b>σε²/(1 − φ²)</b>, <b>ρₕ = φʰ</b>; φ̂ = lag-1 autocorrelation. <b>EAR(1)</b>: Xₜ = φXₜ₋₁ with probability φ, or φXₜ₋₁ + εₜ (εₜ exponential, mean 1/λ) with probability 1 − φ, 0 ≤ φ &lt; 1; exponential marginals, ρₕ = φʰ, <b>only positive autocorrelation</b>. Example 6.10 (order gaps): ρ̂ = 21.6/26.7 = <b>0.8</b>, λ̂ = 1/5.2 = <b>0.192</b>.",
     "الـ <b>AR(1)</b>:<span class=\"ltr\">Xₜ = μ + φ(Xₜ₋₁ − μ) + εₜ ,  −1 < φ < 1 ,  Var = σε²/(1 − φ²) ,  ρₕ = φʰ</span>والـ <bdi dir=\"ltr\">εₜ</bdi> normal بـ mean صفر، والـ <bdi dir=\"ltr\">φ̂</bdi> هي الـ lag-1 autocorrelation. والـ <b>EAR(1)</b>: الـ <bdi dir=\"ltr\">Xₜ = φXₜ₋₁</bdi> باحتمال φ، أو <bdi dir=\"ltr\">φXₜ₋₁ + εₜ</bdi> (والـ <bdi dir=\"ltr\">εₜ</bdi> exponential بـ mean <bdi dir=\"ltr\">1/λ</bdi>) باحتمال <bdi dir=\"ltr\">1 − φ</bdi>، و <bdi dir=\"ltr\">0 ≤ φ < 1</bdi>، وكل القيم exponential و <bdi dir=\"ltr\">ρₕ = φʰ</bdi>، وبيمثل <b>positive autocorrelation بس</b>. مثال 6.10 (فواصل الـ orders):<span class=\"ltr\">ρ̂ = 21.6/26.7 = 0.8 ,  λ̂ = 1/5.2 = 0.192</span>"
    ]
   ]
  },
  {
   "lec": 6,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Physical-basis MCQs: \"Distribution with the number of successes in n trials\" → <b>Binomial</b> (Final 2025/26); \"Number of independent events that occur in a fixed amount of time or space\" → <b>Poisson</b> (Final 2025/26, and Final 2024/25 with options Normal, Poisson, Binomial, Exponential).",
     "أسئلة MCQ على الـ physical basis: الـ distribution بتاعة عدد الـ successes في n trials هي <b>Binomial</b> (Final <bdi dir=\"ltr\">2025/26</bdi>)، وعدد الأحداث المستقلة في وقت أو مكان ثابت هو <b>Poisson</b> (Final <bdi dir=\"ltr\">2025/26</bdi>، وكمان Final <bdi dir=\"ltr\">2024/25</bdi> والاختيارات كانت Normal و Poisson و Binomial و Exponential)."
    ],
    [
     "MCQ (Final 2025/26): \"A scatter diagram is ……\" → <b>a graph showing x and y values</b> (not a statistical test, not \"linear\" or \"curvilinear\").",
     "سؤال MCQ (Final <bdi dir=\"ltr\">2025/26</bdi>): الـ scatter diagram هو إيه؟ الإجابة <b>graph بيوري قيم x و y</b> (مش statistical test، ومش linear ولا curvilinear)."
    ],
    [
     "Written (Final 2024/25, 5 marks; General revision sheet, Q30): \"Estimate the parameters of a lognormal model\" of the 10 returns → take ln of each value, then <b>μ̂ = 2.25</b> and <b>σ̂² = 1.30</b> (Example 6.4).",
     "سؤال مكتوب (Final <bdi dir=\"ltr\">2024/25</bdi> بـ 5 درجات، وكمان General revision sheet سؤال 30): قدّر الـ parameters بتاعة lognormal model للـ 10 returns. الحل إنك تاخد الـ ln لكل قيمة وبعدين:<span class=\"ltr\">μ̂ = 2.25 ,  σ̂² = 1.30</span>زي مثال 6.4 بالظبط."
    ],
    [
     "General revision sheet, Q31: \"Determine the correlation\" of lead time and demand for 10 years → cov = 8.66, <b>ρ̂ = 0.86</b> (Example 6.9).",
     "الـ General revision sheet سؤال 31: احسب الـ correlation بين الـ lead time والـ demand لـ 10 سنين. الإجابة:<span class=\"ltr\">cov = 8.66 ,  ρ̂ = 0.86</span>زي مثال 6.9."
    ],
    [
     "Also expect: the 4 steps and the 7 data-collection suggestions, the physical-basis table, Type I vs Type II, a chi-square test with combined cells and df = k − s − 1, a K-S decision with 1.36/√N, and the estimators table.",
     "ومتوقع كمان: الخطوات الأربعة والـ 7 suggestions لجمع الداتا، وجدول الـ physical basis، والفرق بين الـ Type I والـ Type II، وchi-square test فيه دمج cells و <bdi dir=\"ltr\">df = k − s − 1</bdi>، وقرار K-S بـ <bdi dir=\"ltr\">1.36/√N</bdi>، وجدول الـ estimators."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Verification vs validation and the 3 steps of model building",
   "ar_h": "الـ Verification والـ validation وخطوات بناء الـ model التلاتة",
   "pts": [
    [
     "V&amp;V is <b>one of the most important and difficult tasks</b> of the model developer, who should work closely with the <b>end users</b> to increase the model's <b>credibility</b>. <b>Verification = building the model right</b>: compares the <b>conceptual model</b> with the <b>computer representation</b>. <b>Validation = building the right model</b>: the model is an <b>accurate representation of the real system</b>; it is achieved through <b>calibration</b>, an iterative compare-and-adjust process.",
     "الـ V&amp;V <b>من أهم وأصعب المهام</b> بتاعة اللي بيبني الـ model، ولازم يشتغل قريب من الـ <b>end users</b> عشان يزوّد الـ <b>credibility</b>. الـ <b>Verification هي building the model right</b>: بتقارن الـ <b>conceptual model</b> بالـ <b>computer representation</b>. والـ <b>Validation هي building the right model</b>: إن الـ model يبقى <b>تمثيل دقيق للـ real system</b>، وبتتحقق بالـ <b>calibration</b>، وهي process متكررة بنقارن ونعدّل فيها."
    ],
    [
     "Validation is an <b>integral part of model development</b> with a two-fold goal: (1) a model that represents <b>true system behavior</b>, so it can <b>substitute for the actual system</b> in experiments; (2) more <b>acceptance and credibility</b>, so <b>managers and other decision makers</b> use it.",
     "الـ Validation <b>جزء أساسي من بناء الـ model</b>، وليها هدفين: (1) model بيمثل <b>السلوك الحقيقي للسيستم</b> عشان ينفع <b>يبقى بديل للـ actual system</b> في التجارب، (2) يزوّد الـ <b>acceptance والـ credibility</b> عشان الـ <b>managers والـ decision makers</b> يستخدموه."
    ],
    [
     "<b>3 steps</b> of model building: (1) <b>observe the real system</b>, the interactions among its components and collect data on its behavior (question people who know the system); (2) build a <b>conceptual model</b> = <b>assumptions</b> on the components and structure + <b>hypotheses</b> on the input parameter values; (3) translate it into a <b>computer-recognizable form</b>, the <b>computerized model</b>. Model building is <b>not a linear process</b>: the builder returns to these steps many times.",
     "<b>الخطوات التلاتة</b> لبناء الـ model: (1) <b>نراقب الـ real system</b> والتفاعلات بين مكوناته ونجمع داتا عن سلوكه (ونسأل الناس اللي عارفة السيستم)، (2) نبني <b>conceptual model</b> وده عبارة عن <b>assumptions</b> على المكونات والـ structure و<b>hypotheses</b> على قيم الـ input parameters، (3) نترجمه لـ <b>شكل الكمبيوتر يفهمه</b> اسمه الـ <b>computerized model</b>. وبناء الـ model <b>مش linear</b>: بنرجع للخطوات دي كذا مرة."
    ],
    [
     "<b>Fig 7.1</b>: real system ↔ conceptual model = <b>conceptual validation</b>; conceptual model ↔ operational (computerized) model = <b>model verification</b>; a loop from the operational model back to the real system = <b>calibration and validation</b>. The conceptual model holds assumptions on components, <b>structural assumptions</b> (interactions between components), and input parameters and data assumptions.",
     "<b>شكل 7.1</b>: الربط بين الـ real system والـ conceptual model اسمه <b>conceptual validation</b>، والربط بين الـ conceptual model والـ operational (computerized) model اسمه <b>model verification</b>، والـ loop اللي راجعة من الـ operational model للـ real system اسمها <b>calibration and validation</b>. والـ conceptual model فيه assumptions على المكونات، و<b>structural assumptions</b> (التفاعلات بين المكونات)، والـ input parameters والـ data assumptions."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Verification: considerations, statistics and the 3 techniques",
   "ar_h": "الـ Verification: الاعتبارات والـ statistics والـ techniques التلاتة",
   "pts": [
    [
     "Purpose: assure the <b>conceptual model is accurately reflected in the operational model</b>. <b>8 considerations</b>: (1) checked by <b>someone other than its developer</b>; (2) a <b>flow diagram</b> of the logic; (3) examine output for <b>reasonableness</b> under many input settings; (4) <b>print the input parameters</b> at the end to confirm they were not changed; (5) <b>self-documenting</b>; (6) check that the <b>animation</b> reflects the real system; (7) use the <b>IRC</b> or debugger; (8) use <b>graphical interfaces</b>.",
     "الهدف إننا نتأكد إن <b>الـ conceptual model متمثل صح في الـ operational model</b>. و<b>الـ 8 considerations</b>: (1) حد <b>غير اللي كتبه</b> يراجعه، (2) <b>flow diagram</b> للـ logic، (3) نفحص الـ output إنه <b>reasonable</b> مع قيم input كتير، (4) <b>نطبع الـ input parameters</b> في الآخر عشان نتأكد إنها متغيرتش، (5) يبقى <b>self-documenting</b>، (6) نتأكد إن الـ <b>animation</b> شبه الـ real system، (7) نستخدم الـ <b>IRC</b> أو الـ debugger، (8) نستخدم <b>graphical interfaces</b>."
    ],
    [
     "The <b>IRC (interactive run controller)</b> or debugger can: (a) <b>monitor</b> the run by advancing to a desired time and displaying information; (b) <b>focus on one or several lines of logic</b> or an entity (pause whenever it becomes active); (c) observe <b>values of selected components</b>; (d) <b>pause</b> the run to view information, reassign values or redirect entities. Standard statistics are <b>collected automatically</b>.",
     "الـ <b>IRC (interactive run controller)</b> أو الـ debugger بيقدر: (a) <b>يتابع</b> الـ run بإنه يقدّمه لوقت معين ويعرض المعلومات، (b) <b>يركز على سطر أو كذا سطر logic</b> أو entity معينة (يقف كل ما تبقى active)، (c) يشوف <b>قيم مكونات معينة</b>، (d) <b>يوقف</b> الـ run مؤقتًا عشان نشوف أو نغيّر قيم أو نوجّه entities. والـ statistics العادية <b>بتتجمع أوتوماتيك</b>."
    ],
    [
     "Reasonableness statistics: <b>current contents</b> = number of items in each component <b>at a given time</b>; <b>total count</b> = items that have <b>entered</b> each component <b>by a given time</b>. High current contents → many entities delayed, <b>queue unstable</b>; total count = 0 → <b>no items entered</b> that subsystem; current count = total count = 1 → an entity <b>captured a resource but never freed it</b>.",
     "الـ statistics اللي بتوضح الـ reasonableness: الـ <b>current contents</b> هي عدد الـ items في كل component <b>في لحظة معينة</b>، والـ <b>total count</b> هي عدد الـ items اللي <b>دخلت</b> كل component <b>لحد وقت معين</b>. لو الـ current contents عالية يبقى entities كتير متأخرة و<b>الـ queue unstable</b>، ولو الـ total count بصفر يبقى <b>مفيش حاجة دخلت</b> الـ subsystem ده، ولو الـ current count والـ total count الاتنين بواحد يبقى entity <b>مسكت resource ومسابتهوش</b>."
    ],
    [
     "Three techniques for model-logic errors: (1) <b>common sense</b>: forecast a <b>reasonable range</b> of selected outputs <b>before</b> running; (2) <b>documentation</b>: brief comments, <b>definitions of all variables and parameters</b>, a description of each major section; (3) <b>trace</b>: a printout of the <b>value of each variable every time one changes</b>, checked by <b>manual calculations</b>; usually <b>restricted</b> (short), or a <b>selective trace</b>. <b>The first two should always be carried out.</b>",
     "الـ techniques التلاتة لاكتشاف أخطاء الـ logic: (1) الـ <b>common sense</b>: نتوقع <b>مدى معقول</b> لـ outputs معينة <b>قبل</b> ما نشغّل، (2) الـ <b>documentation</b>: فيها comments قصيرة و<b>تعريف كل الـ variables والـ parameters</b> ووصف لكل جزء رئيسي، (3) الـ <b>trace</b>: وهو printout فيه <b>قيمة كل variable كل ما واحد يتغير</b>، ونراجعه بـ <b>حسابات يدوية</b>، وغالبًا بيبقى <b>restricted</b> (قصير) أو <b>selective trace</b>. و<b>أول اتنين لازم يتعملوا دايمًا</b>."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Example 7.1: finding an error with a trace",
   "ar_h": "مثال 7.1: إزاي الـ trace بيكشف الغلط",
   "pts": [
    [
     "A single-server queue run for <b>16 time units</b> reports <b>L̂Q = 0.4375 customer</b>; a short run, so a trace is used. Variables: <b>CLOCK</b> (simulation clock), <b>EVTYP</b> (start, arrival, departure, stop), <b>NCUST</b> (customers in the system), <b>STATUS</b> (server: 1 busy, 0 idle).",
     "فيه single-server queue اتشغّل <b>16 time units</b> وطلّع <bdi dir=\"ltr\">L̂Q = 0.4375</bdi> customer، ولأن الـ run قصير استخدمنا trace. والمتغيرات: الـ <b>CLOCK</b> (ساعة الـ simulation)، والـ <b>EVTYP</b> (نوع الـ event، يا start أو arrival أو departure أو stop)، والـ <b>NCUST</b> (عدد العملاء في السيستم)، والـ <b>STATUS</b> (الـ server: 1 مشغول، 0 فاضي)."
    ],
    [
     "The error: at <b>CLOCK = 3</b>, NCUST = 1 but STATUS = 0: a customer is in the system while the server is idle, which is <b>incorrect logic</b>.",
     "الغلط: عند <b><bdi dir=\"ltr\">CLOCK = 3</bdi></b> الـ <bdi dir=\"ltr\">NCUST = 1</bdi> بس الـ <bdi dir=\"ltr\">STATUS = 0</bdi>، يعني فيه عميل في السيستم والـ server فاضي، وده <b>logic غلط</b>."
    ],
    [
     "L̂Q = (1/T) Σ i·TᵢQ, with queue length = NCUST − STATUS per interval: [(0)3 + (1)2 + (0)6 + (1)1 + (1)4]/16 = <b>7/16 = 0.4375</b>. The arithmetic is right, but the result is <b>wrong</b> because STATUS had the wrong value. ‡ The same error appears at CLOCK = 11; with correct STATUS only 12 to 16 has a waiting customer, giving 4/16 = 0.25.",
     "الـ <bdi dir=\"ltr\">L̂Q</bdi> بنحسبه بطول الـ queue (<bdi dir=\"ltr\">NCUST − STATUS</bdi>) مضروب في طول كل interval:<span class=\"ltr\">L̂Q = [(0)3 + (1)2 + (0)6 + (1)1 + (1)4] / 16 = 7/16 = 0.4375</span>الحساب نفسه صح، بس النتيجة <b>غلط</b> لأن الـ STATUS قيمته كانت غلط. ‡ نفس الغلط موجود عند <bdi dir=\"ltr\">CLOCK = 11</bdi>، ولو الـ STATUS صح يبقى فيه عميل مستني من 12 لـ 16 بس، يعني <bdi dir=\"ltr\">4/16 = 0.25</bdi>."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Calibration, face validity and model assumptions",
   "ar_h": "الـ Calibration والـ face validity والـ model assumptions",
   "pts": [
    [
     "Verification and validation are usually done <b>at the same time</b>. <b>Calibration</b> = compare the model to the real system, adjust, compare the revised model, adjust again (Fig 7.2) until judged accurate. <b>Subjective tests</b>: knowledgeable people <b>judge</b> the model and output; <b>objective tests</b>: need <b>data on system behavior</b> and the <b>corresponding data from the model</b>.",
     "الـ Verification والـ validation غالبًا بيتعملوا <b>في نفس الوقت</b>. والـ <b>Calibration</b> إننا نقارن الـ model بالـ real system ونعدّل، ونقارن الـ revised model ونعدّل تاني (شكل 7.2) لحد ما يتحكم عليه إنه دقيق. والـ <b>subjective tests</b> فيها ناس فاهمة السيستم <b>بتحكم</b> على الـ model والـ output، والـ <b>objective tests</b> محتاجة <b>داتا عن سلوك السيستم</b> و<b>الداتا المقابلة من الـ model</b>."
    ],
    [
     "<b>Criticism</b>: calibration may stop once the model is <b>fit to one data set</b>. Fix: collect a <b>new (second) data set</b> for the <b>final validation</b>; on a discrepancy, return to calibration. Each revision costs <b>time, cost and effort</b>; if accuracy is not reached within budget, <b>lower the accuracy level or reject the model</b>.",
     "الـ <b>Criticism</b>: الـ calibration ممكن تقف أول ما الـ model يبقى <b>fit على data set واحدة</b>. والحل إننا نجمع <b>data set تانية جديدة</b> نستخدمها في الـ <b>final validation</b>، ولو فيه اختلاف نرجع للـ calibration. وكل تعديل بيكلّف <b>وقت وفلوس ومجهود</b>، ولو الدقة موصلتش في حدود الـ budget يا <b>نقلل مستوى الدقة يا نرفض الـ model</b>."
    ],
    [
     "<b>Naylor and Finger [1967]</b>: (1) build a model with <b>high face validity</b>; (2) <b>validate model assumptions</b>; (3) <b>compare the model input-output transformations</b> with those of the real system.",
     "خطوات <b><bdi dir=\"ltr\">Naylor and Finger [1967]</bdi></b> للـ validation: (1) نبني model عنده <b>high face validity</b>، (2) <b>نعمل validate للـ model assumptions</b>، (3) <b>نقارن الـ input-output transformations</b> بتاعة الـ model باللي في الـ real system."
    ],
    [
     "<b>Face validity</b>: involve <b>potential users from conceptualization to implementation</b>. Advantages: (1) they evaluate output for reasonableness and help find deficiencies (taking part in calibration); (2) <b>perceived validity (credibility)</b> increases, so the manager trusts the results. <b>Sensitivity analysis</b> also checks it: does the model behave as expected when inputs change? For large models, test the <b>most critical input variables</b>.",
     "الـ <b>Face validity</b>: لازم الـ <b>potential users يشاركوا من الـ conceptualization لحد الـ implementation</b>. والمميزات: (1) بيقيّموا الـ output ويساعدوا يلاقوا العيوب (فيشاركوا في الـ calibration)، (2) الـ <b>perceived validity (الـ credibility)</b> بتزيد فالـ manager يثق في النتايج. والـ <b>Sensitivity analysis</b> كمان بتختبرها: هل الـ model بيتصرف زي المتوقع لما نغيّر الـ inputs؟ وفي الـ models الكبيرة نختبر <b>أهم الـ input variables</b> بس."
    ],
    [
     "Two classes of assumptions: <b>structural</b> (how the system operates; bank: a queue per teller, FCFS, customers may shift to a faster line, fixed or variable tellers; verified by <b>observation at regular intervals</b> and <b>discussions with managers and tellers</b>) and <b>data</b> (reliable data + correct statistical analysis; bank: peak and slack interarrival times, service times for commercial and personal accounts). Combined sets need a <b>homogeneity</b> test. Analysis: (1) <b>identify</b> the distribution, (2) <b>estimate</b> its parameters, (3) <b>validate</b> by goodness-of-fit tests (chi-square, K-S) and graphs.",
     "فيه نوعين assumptions: الـ <b>structural</b> (السيستم بيشتغل إزاي، وفي البنك: queue لكل teller بـ FCFS، والعملاء ممكن ينقلوا لطابور أسرع، وعدد الـ tellers ثابت أو متغير، وبنتأكد منها بـ <b>الملاحظة على فترات منتظمة</b> و<b>النقاش مع الـ managers والـ tellers</b>)، والـ <b>data</b> (داتا موثوقة وتحليل إحصائي صح، وفي البنك: الـ interarrival times في الذروة وفي الهدوء، والـ service times للحسابات التجارية والشخصية). ولو دمجنا sets لازم اختبار <b>homogeneity</b>. والتحليل: (1) <b>نحدد</b> الـ distribution، (2) <b>نقدّر</b> الـ parameters، (3) <b>نعمل validate</b> بالـ goodness-of-fit tests (الـ chi-square والـ K-S) وبالرسم."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Input-output validation, historical data and the Turing test",
   "ar_h": "الـ Input-output validation والداتا التاريخية والـ Turing test",
   "pts": [
    [
     "The model is an <b>input-output transformation</b>: input parameters → <b>output measures of performance</b>. Collect <b>two data sets</b> (calibration and final validation); the <b>main responses of interest</b> are the criteria. Necessary condition: some version of the system <b>exists</b>; in the <b>planning stage</b> complete input-output validation is <b>not possible</b>.",
     "الـ model عبارة عن <b>input-output transformation</b>: بياخد الـ input parameters ويحوّلها لـ <b>output measures of performance</b>. ونجمع <b>2 data sets</b> (واحدة للـ calibration وواحدة للـ final validation)، والـ <b>main responses of interest</b> هي المعيار. والشرط الضروري إن نسخة من السيستم <b>تكون موجودة</b>، ولو السيستم لسه في <b>مرحلة الـ planning</b> يبقى الـ complete input-output validation <b>مش ممكن</b>."
    ],
    [
     "Proposed (non-existent) system: compare responses of the existing and proposed models under similar inputs; confidence can be <b>transferred</b> only for a <b>minor modification</b>. Minor → major: a single numerical parameter (machine speed, arrival rate); a statistical distribution (service time, time to failure); the logical structure of a subsystem (queue discipline); design of a new system (computerized inventory control). Major changes: validate a similar existing subsystem and integrate = <b>partial validation</b>. There is <b>no way to completely validate</b> a non-existing system.",
     "لو السيستم proposed (مش موجود): بنقارن responses الـ model القديم والجديد تحت inputs متشابهة، والثقة <b>تتنقل</b> بس لو التعديل <b>minor</b>. ومن الـ minor للـ major: تغيير parameter رقمي واحد (سرعة machine أو الـ arrival rate)، ثم تغيير statistical distribution (الـ service time أو الـ time to failure)، ثم تغيير الـ logical structure بتاع subsystem (الـ queue discipline)، ثم تصميم سيستم جديد (computerized inventory control). وفي التغييرات الـ major نعمل validate لـ subsystem شبهه موجود وندمجه، وده اسمه <b>partial validation</b>. و<b>مفيش طريقة نعمل validate كامل</b> لسيستم مش موجود."
    ],
    [
     "<b>Historical input data</b>: all inputs and all system responses must be collected <b>during the same time period</b>, otherwise the comparison could be <b>misleading</b>. Difficult for <b>large systems</b> (simultaneous data collection); the accuracy level is judged by both the <b>model builder and the model user</b>.",
     "الـ <b>Historical input data</b>: كل الـ inputs وكل الـ responses لازم تتجمع <b>في نفس الفترة</b>، وإلا المقارنة ممكن <b>تضلّل</b>. وده صعب في الـ <b>large systems</b> (عشان الجمع لازم يبقى في نفس الوقت)، ومستوى الدقة بيحكم عليه <b>اللي بنى الـ model واللي بيستخدمه</b> مع بعض."
    ],
    [
     "<b>Turing test</b> (when no statistical test applies): <b>5 real</b> and <b>5 fake</b> reports in the same format, <b>10 shuffled</b>, given to an engineer. If the fakes are identified → question the engineer and <b>improve the model</b>; if they cannot be distinguished → the model is <b>adequate</b>.",
     "الـ <b>Turing test</b> (لما مفيش statistical test ينفع): بنعمل <b>5 reports حقيقية</b> و<b>5 fake</b> من الـ simulation بنفس الشكل، يعني <b>10 متلخبطين</b> بيروحوا لـ engineer. لو عرف الـ fake نسأله ونستخدم كلامه عشان <b>نحسّن الـ model</b>، ولو معرفش يفرّق يبقى الـ model <b>adequate</b>."
    ],
    [
     "Link to Lecture 1: step 6 <b>Verified?</b> = \"Does the program do what the model describes?\" (No → back to step 5, model translation); step 7 <b>Validated?</b> = \"Do the results match the reality? Calibration?\" (No → back to steps 3 and 4). <b>Validation is the most crucial step</b>; simulation is not appropriate when it cannot be verified or validated.",
     "الربط بالمحاضرة 1: الخطوة 6 <b>Verified?</b> معناها «البرنامج بيعمل اللي الـ model بيوصفه؟» (لو لأ نرجع للخطوة 5 الـ model translation)، والخطوة 7 <b>Validated?</b> معناها «النتايج زي الواقع؟ Calibration؟» (لو لأ نرجع للخطوتين 3 و 4). و<b>الـ validation هي أهم خطوة</b>، والـ simulation مش مناسبة لو مش هينفع نعملها verify أو validate."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Likely questions",
   "ar_h": "أسئلة متوقعة",
   "pts": [
    [
     "The past finals have no question from this lecture. The nearest items: a Lecture 1 True/False (Final 2024/25): \"The verified step … 'Does the program do what the model describes?'\" → <b>True</b>; and Sheet 1, Q11: \"What do you understand by the term face validity of a conceptual model?\"",
     "الامتحانات اللي فاتت مفيهاش سؤال من المحاضرة دي. وأقرب حاجة: سؤال صح وغلط من المحاضرة 1 (Final <bdi dir=\"ltr\">2024/25</bdi>) إن خطوة الـ Verified هي «البرنامج بيعمل اللي الـ model بيوصفه؟» والإجابة <b>True</b>، وسؤال 11 في Sheet 1: إيه معنى الـ face validity بتاعة الـ conceptual model؟"
    ],
    [
     "Essay types: differentiate verification and validation; the two goals of validation; the 3 steps of model building and Fig 7.1; the verification considerations; the 3 techniques (which are always used); calibration and its criticism; Naylor and Finger; structural vs data assumptions; validating a proposed system; historical data; the Turing test.",
     "أسئلة المقالي المتوقعة: الفرق بين الـ verification والـ validation، وهدفين الـ validation، والخطوات التلاتة وشكل 7.1، والـ verification considerations، والـ techniques التلاتة (وأنهي اتنين دايمًا)، والـ calibration ونقدها، وخطوات Naylor and Finger، والفرق بين الـ structural والـ data assumptions، وإزاي نعمل validate لسيستم proposed، والـ historical data، والـ Turing test."
    ],
    [
     "Short MCQ and True/False: the two slogans (right model vs model right), what current contents and total count reveal, the Fig 7.1 labels, the Turing test conclusion, no complete validation in the planning stage, data collected in the same time period.",
     "أسئلة MCQ وصح وغلط قصيرة: الشعارين (building the right model قصاد building the model right)، والـ current contents والـ total count بيكشفوا إيه، وأسامي الأسهم في شكل 7.1، ونتيجة الـ Turing test، وإن مفيش complete validation في مرحلة الـ planning، وإن الداتا لازم تتجمع في نفس الفترة."
    ],
    [
     "Calculation: from a trace, L̂Q = Σ (NCUST − STATUS) × interval length / T, and spot rows with NCUST ≥ 1 and STATUS = 0 (or NCUST = 0 and STATUS = 1) as logic errors. ‡ (the NCUST = 0, STATUS = 1 case is our addition)",
     "الحسابات: من الـ trace نحسب<span class=\"ltr\">L̂Q = Σ (NCUST − STATUS) × interval length / T</span>ونطلّع الصفوف اللي فيها <bdi dir=\"ltr\">NCUST ≥ 1</bdi> و <bdi dir=\"ltr\">STATUS = 0</bdi> (أو <bdi dir=\"ltr\">NCUST = 0</bdi> و <bdi dir=\"ltr\">STATUS = 1</bdi>) على إنها logic errors. ‡ (حالة الـ <bdi dir=\"ltr\">NCUST = 0, STATUS = 1</bdi> إضافة مننا)"
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Labs: random numbers and the unbiased coin",
   "ar_h": "الـ Labs: الـ random numbers والـ unbiased coin",
   "pts": [
    [
     "In problem solving a simulation is <b>valid for the context in which it is applied</b>; its parameters let the user define the <b>context</b>, choose the <b>controls</b> and include the <b>data</b>. Each lab case uses the outline <b>Problem Definition, Assumptions, Model, Flowchart/Algorithm, Code, Output, Statistical Analysis</b>; tools: C++, Excel, AnyLogic.",
     "في الـ problem solving الـ simulation بتبقى <b>valid للـ context اللي بتتطبق فيه</b>، والـ parameters بتاعتها بتخلي الـ user يحدد الـ <b>context</b> ويختار الـ <b>controls</b> ويدخّل الـ <b>data</b>. وكل case في الـ labs بتمشي على نفس الترتيب: <b>Problem Definition ثم Assumptions ثم Model ثم Flowchart/Algorithm ثم Code ثم Output ثم Statistical Analysis</b>، والأدوات هي C++ و Excel و AnyLogic."
    ],
    [
     "<b>Standard algorithm</b> for a random number in [Low, High]: (1) R0 = rand(); (2) <b>normalization</b> R1 = R0/(RAND_MAX + 1); (3) <b>scaling</b> R2 = R1 × (High − Low); (4) <b>truncation</b> for integers; (5) <b>translation</b> R = R2 + Low. Example [1, 10], R1 = 0.5: R2 = 4.5 → 4 → R = <b>5</b>. ‡ R1 &lt; 1, so this RandInt never returns High.",
     "الـ <b>Standard algorithm</b> عشان نطلّع random number في <bdi dir=\"ltr\">[Low, High]</bdi>:<span class=\"ltr\">(1) R0 = rand()  (2) R1 = R0/(RAND_MAX + 1)  (3) R2 = R1 × (High − Low)  (4) truncate  (5) R = R2 + Low</span>يعني normalization ثم scaling ثم truncation (للـ integers) ثم translation. مثال على <bdi dir=\"ltr\">[1, 10]</bdi> بـ <bdi dir=\"ltr\">R1 = 0.5</bdi>:<span class=\"ltr\">R2 = 0.5 × 9 = 4.5 → 4 → R = 4 + 1 = 5</span>‡ لأن <bdi dir=\"ltr\">R1 < 1</bdi> الـ RandInt ده عمره ما بيرجّع الـ High."
    ],
    [
     "<b>Unbiased coin</b> (Activity 2): show P(H) = P(T) = 1/2: toss 100 times with R in (0, 1), R &lt; 0.5 → Head, else Tail; P(H) = Head_count/100, P(T) = Tail_count/100. Excel: =RAND(), =IF(A2&lt;0.5,\"H\",\"T\"), =COUNTIF(…). The lab run gave <b>P(H) = 0.48, P(T) = 0.52</b>, close to 0.5.",
     "الـ <b>Unbiased coin</b> (Activity 2): عايزين نثبت إن <bdi dir=\"ltr\">P(H) = P(T) = 1/2</bdi>. بنرمي 100 مرة بـ R من <bdi dir=\"ltr\">(0, 1)</bdi>، لو <bdi dir=\"ltr\">R < 0.5</bdi> يبقى Head وغير كده Tail:<span class=\"ltr\">P(H) = Head_count/100 ,  P(T) = Tail_count/100</span>وفي الـ Excel بنستخدم <bdi dir=\"ltr\">=RAND()</bdi> و <bdi dir=\"ltr\">=IF(A2<0.5,\"H\",\"T\")</bdi> و <bdi dir=\"ltr\">=COUNTIF(…)</bdi>. والـ run بتاع الـ lab طلّع <bdi dir=\"ltr\">P(H) = 0.48</bdi> و <bdi dir=\"ltr\">P(T) = 0.52</bdi>، قريبين من <bdi dir=\"ltr\">0.5</bdi>."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Gift Shop: a single-channel queue",
   "ar_h": "الـ Gift Shop: الـ single-channel queue",
   "pts": [
    [
     "Target: decrease customer waiting time (and clerk idle time) at a gift-shop check-out. Inter-arrival time <b>uniform 1 to 10 min</b>, service time <b>uniform 1 to 6 min</b>. Outputs: <b>average time in the system</b> (waiting + service) and the <b>percentage of time the clerk is idle</b>. State: number of units in the system and server status; events: <b>arrival</b> and <b>departure</b>.",
     "الهدف إننا نقلل وقت انتظار العملاء (ووقت فضاوة الـ clerk) عند الـ check-out. الـ inter-arrival time <b>uniform من 1 لـ 10 دقايق</b>، والـ service time <b>uniform من 1 لـ 6</b>. والـ outputs: <b>متوسط الوقت في السيستم</b> (انتظار وخدمة) و<b>نسبة الوقت اللي الـ clerk فاضي فيه</b>. والـ state هي عدد الـ units في السيستم وحالة الـ server، والـ events هي الـ <b>arrival</b> والـ <b>departure</b>."
    ],
    [
     "Model: <b>Ar_Clk[i] = Ar_Clk[i−1] + delay[i]</b>; <b>Serv_begin[i] = Max(Ar_Clk[i], Serv_end[i−1])</b>; Serv_end[i] = Serv_begin[i] + Serv_time[i]; <b>WT[i] = Serv_end[i] − Ar_Clk[i]</b> (time in the system); Idle[i] = Ar_Clk[i] − Serv_end[i−1] if positive, else 0. Customer 1: delay 0, arrives at 0, WT = its service time. Ar = ΣWT/n; P = ΣIdle/t × 100 (t = last service end).",
     "الـ model:<span class=\"ltr\">Ar_Clk[i] = Ar_Clk[i−1] + delay[i]</span><span class=\"ltr\">Serv_begin[i] = Max(Ar_Clk[i], Serv_end[i−1])</span><span class=\"ltr\">Serv_end[i] = Serv_begin[i] + Serv_time[i]</span><span class=\"ltr\">WT[i] = Serv_end[i] − Ar_Clk[i]</span><span class=\"ltr\">Idle[i] = Ar_Clk[i] − Serv_end[i−1]  (if > 0, else 0)</span>وأول عميل الـ delay بتاعه صفر وبيوصل عند صفر والـ WT بتاعه هو الـ service time. وبعدين:<span class=\"ltr\">Ar = ΣWT / n ,  P = ΣIdle / t × 100</span>والـ t هي نهاية آخر خدمة."
    ],
    [
     "Worked example (5 customers): Ar = 19/5 = <b>3.8 min</b>, P = 6/21 = <b>28.57%</b> (the lab writes 28.5%). Exercise: Ar = 19/5 = 3.8 min, P = 15/34 = <b>44.12%</b>. The 20-customer program run: ΣWT = 48 → <b>2.4 min</b>; ΣIdle = 57 over 104 min → <b>54.8%</b>, far above the <b>standard clerk idle of 12.5%</b> (H.R.W.).",
     "المثال المحلول (5 عملاء):<span class=\"ltr\">Ar = 19/5 = 3.8 min ,  P = 6/21 = 28.57%</span>(الـ lab كاتبها <bdi dir=\"ltr\">28.5%</bdi>). والـ exercise:<span class=\"ltr\">Ar = 19/5 = 3.8 min ,  P = 15/34 = 44.12%</span>والـ run بتاع البرنامج على 20 عميل:<span class=\"ltr\">Ar = 48/20 = 2.4 min ,  P = 57/104 = 54.8%</span>وده أعلى بكتير من الـ <b>standard clerk idle</b> اللي هو <bdi dir=\"ltr\">12.5%</bdi> (H.R.W.)."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Area under a curve and the pure pursuit problem",
   "ar_h": "المساحة تحت المنحنى ومسألة الـ pure pursuit",
   "pts": [
    [
     "<b>Monte Carlo area</b> (acceptance-rejection case): drop N random points on the rectangle of base (b, c) and height h; a point under y = f(x) is <b>accepted</b>, above it <b>rejected</b>. p = A/(h(c − b)), so <b>A = K h (c − b)/N</b>. Example f(x) = √(1 − x²) on [0, 1], h = 1: A = K/N; 3000 trials → 0.784 against the exact <b>π/4 = 0.7854</b>. Simulation is for problems that are difficult, expensive, hazardous or impossible analytically, and is <b>less accurate than analytic solutions</b>.",
     "الـ <b>Monte Carlo area</b> (حالة الـ acceptance-rejection): بنرمي N نقطة عشوائية على مستطيل قاعدته <bdi dir=\"ltr\">(b, c)</bdi> وارتفاعه h، والنقطة اللي تحت <bdi dir=\"ltr\">y = f(x)</bdi> <b>بتتقبل</b> واللي فوقه <b>بتترفض</b>:<span class=\"ltr\">p = A / (h(c − b))  ⇒  A = K h (c − b) / N</span>مثال <bdi dir=\"ltr\">f(x) = √(1 − x²)</bdi> على <bdi dir=\"ltr\">[0, 1]</bdi> و <bdi dir=\"ltr\">h = 1</bdi> يبقى <bdi dir=\"ltr\">A = K/N</bdi>، وبعد 3000 محاولة طلعت <bdi dir=\"ltr\">0.784</bdi> والقيمة المظبوطة <bdi dir=\"ltr\">π/4 = 0.7854</bdi>. والـ simulation بنستخدمها لما المسألة صعبة أو غالية أو خطيرة أو مستحيلة analytically، ونتايجها <b>أقل دقة من الحل الـ analytic</b>."
    ],
    [
     "<b>Pure pursuit</b>: when will the fighter catch the bomber? Assumptions: same horizontal plane (<b>2-D</b>); fighter speed <b>VF = 20 km/min</b> constant; the bomber's path is <b>specified</b>; every <b>Δt = 1 min</b> the fighter turns toward the bomber. Start: fighter (0, 50), bomber (80, 0). Catch when within <b>10 km</b>; abandon after <b>12 min</b> (bomber escapes). Curved paths cannot normally be solved analytically, so we simulate.",
     "الـ <b>Pure pursuit</b>: الـ fighter هيمسك الـ bomber إمتى؟ الـ assumptions: الاتنين في نفس المستوى الأفقي (<b>2-D</b>)، وسرعة الـ fighter ثابتة <b><bdi dir=\"ltr\">VF = 20 km/min</bdi></b>، ومسار الـ bomber <b>معروف مسبقًا</b>، وكل <b><bdi dir=\"ltr\">Δt = 1 min</bdi></b> الـ fighter بيلف ناحية الـ bomber. البداية الـ fighter عند <bdi dir=\"ltr\">(0, 50)</bdi> والـ bomber عند <bdi dir=\"ltr\">(80, 0)</bdi>. بيمسكه لو المسافة <b><bdi dir=\"ltr\">10 km</bdi></b> أو أقل، ولو عدّت <b>12 دقيقة</b> الـ bomber بيهرب. والمسار المنحني صعب يتحل analytically فبنعمل simulation."
    ],
    [
     "Equations: DIST(t) = √[(YB − YF)² + (XB − XF)²]; sin θ = (YB − YF)/DIST; cos θ = (XB − XF)/DIST; <b>XF(t+1) = XF(t) + VF cos θ</b>; <b>YF(t+1) = YF(t) + VF sin θ</b>. t = 0: DIST = <b>94.34</b>, sin θ = −0.53, cos θ = 0.85 → XF(1) = 17, YF(1) = 39.4. The distance first drops to 10 km or less at <b>t = 9 (2.969 km)</b>: caught.",
     "المعادلات:<span class=\"ltr\">DIST(t) = √[(YB − YF)² + (XB − XF)²]</span><span class=\"ltr\">sin θ = (YB − YF)/DIST ,  cos θ = (XB − XF)/DIST</span><span class=\"ltr\">XF(t+1) = XF(t) + VF cos θ ,  YF(t+1) = YF(t) + VF sin θ</span>عند <bdi dir=\"ltr\">t = 0</bdi>:<span class=\"ltr\">DIST = 94.34 , sin θ = −0.53 , cos θ = 0.85 → XF(1) = 17 , YF(1) = 39.4</span>وأول مرة المسافة تبقى 10 أو أقل عند <b><bdi dir=\"ltr\">t = 9</bdi></b> (<bdi dir=\"ltr\">2.969 km</bdi>)، يعني اتمسك."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Staggering drunk and the flipping coin game",
   "ar_h": "الـ Staggering drunk ولعبة رمي العملة",
   "pts": [
    [
     "<b>Staggering drunk</b>: at each corner he goes N, S, E or W with probability <b>1/4</b>; after <b>10 blocks</b>, is he within 2 blocks of the start? Two-digit RN: <b>00-24 east (X + 1), 25-49 west (X − 1), 50-74 north (Y + 1), 75-99 south (Y − 1)</b>. Success if <b>|X| + |Y| ≤ 2</b>. Table 8-1: 3 of 5 trials succeed → <b>0.6</b>, but 5 trials are insufficient.",
     "الـ <b>Staggering drunk</b>: عند كل ناصية بيروح شمال أو جنوب أو شرق أو غرب باحتمال <b><bdi dir=\"ltr\">1/4</bdi></b>، وبعد <b>10 blocks</b> هل هو على بعد 2 blocks أو أقل من البداية؟ بنستخدم RN من رقمين:<span class=\"ltr\">00-24 east (X + 1) ; 25-49 west (X − 1) ; 50-74 north (Y + 1) ; 75-99 south (Y − 1)</span>والـ trial ناجحة لو <bdi dir=\"ltr\">|X| + |Y| ≤ 2</bdi>. وفي جدول 8-1 نجح 3 من 5 يعني <bdi dir=\"ltr\">0.6</bdi>، بس 5 trials مش كفاية."
    ],
    [
     "<b>Flipping coin game</b> (is it safe?): flip until <b>|H − T| = 3</b>; pay <b>$1 per flip</b>, receive <b>$8</b> at the end; no quitting; repeat 100 games. <b>Net gain = 8 − flips</b> (5 flips → +3, 13 flips → −5). A game always ends after an <b>odd</b> number of flips, never at exactly 8. Statistics: mean ΣX/n, variance (1/N)Σ(Xᵢ − X̄)², SD = √variance, P(success) = wins/N.",
     "<b>لعبة رمي العملة</b> (هل آمنة؟): بنرمي لحد ما <bdi dir=\"ltr\">|H − T| = 3</bdi>، وبندفع <b><bdi dir=\"ltr\">$1</bdi> لكل رمية</b> وبناخد <b><bdi dir=\"ltr\">$8</bdi></b> في الآخر، وممنوع ننسحب، ونكرر 100 لعبة:<span class=\"ltr\">Net gain = 8 − flips   (5 flips → +3 ; 13 flips → −5)</span>واللعبة دايمًا بتخلص بعد عدد رميات <b>فردي</b>، فعمرها ما تخلص عند 8 بالظبط. والـ statistics:<span class=\"ltr\">mean = ΣX/n ,  variance = (1/N) Σ(Xᵢ − X̄)² ,  SD = √variance ,  P(success) = wins/N</span>"
    ],
    [
     "Lab 5 run: <b>P(success) = 0.71</b>, gain 255, loss 247 → \"safe\", mean 0.08, variance 58.034, SD 7.618. Quiz 2 (100 given numbers, R &lt; 0.5 = tail): <b>13 games</b>, net gains sum <b>−5</b>, mean <b>−0.3846</b>, variance 64.237, SD 8.015 → <b>not safe</b>. A different random stream and few games can change the decision, so more runs are needed.",
     "الـ run بتاع Lab 5:<span class=\"ltr\">P(success) = 0.71 , gain 255 , loss 247 , mean 0.08 , variance 58.034 , SD 7.618</span>يعني «safe». أما Quiz 2 (100 رقم معطيين، و <bdi dir=\"ltr\">R < 0.5</bdi> يبقى tail): <b>13 لعبة</b> ومجموع الـ net gains بـ <bdi dir=\"ltr\">−5</bdi>:<span class=\"ltr\">mean = −5/13 = −0.3846 , variance = 64.237 , SD = 8.015</span>يعني <b>مش safe</b>. يعني random stream مختلف وعدد ألعاب قليل ممكن يغيّروا القرار، فمحتاجين runs أكتر."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Newspaper seller (Quiz 5)",
   "ar_h": "الـ Newspaper seller (Quiz 5)",
   "pts": [
    [
     "Cost <b>$0.33</b>, price <b>$0.50</b>, scrap <b>$0.05</b>, lost profit <b>$0.17</b> per unmet demand (= 0.50 − 0.33). Daily profit = revenue (0.50 × min(demand, Q)) − cost (0.33 × Q) − lost profit (0.17 × excess demand) + salvage (0.05 × leftover). Policies Q = 50, 60, …, 100 over 10 days.",
     "التكلفة <b><bdi dir=\"ltr\">$0.33</bdi></b> والسعر <b><bdi dir=\"ltr\">$0.50</bdi></b> والـ scrap <b><bdi dir=\"ltr\">$0.05</bdi></b>، والـ lost profit <b><bdi dir=\"ltr\">$0.17</bdi></b> لكل طلب ماتلبّاش (<bdi dir=\"ltr\">0.50 − 0.33</bdi>):<span class=\"ltr\">Profit = 0.50 × min(d, Q) − 0.33 × Q − 0.17 × max(0, d − Q) + 0.05 × leftover</span>والـ policies اللي بنجربها من <bdi dir=\"ltr\">Q = 50</bdi> لـ 100 على 10 أيام."
    ],
    [
     "Day type: good 0.35 (RN 01-35), fair 0.45 (36-80), poor 0.20 (81-100); then the demand from that day type's column (good 80 = 44-78, fair 60 = 29-68, poor 50 = 01-44, …). Day 1: 0.41 → fair, 0.19 → 50. Q = 60, demand 50: 25.00 − 19.80 + 0.50 = <b>5.70</b>; demand 70: 30.00 − 19.80 − 1.70 = <b>8.50</b>.",
     "نوع اليوم: good <bdi dir=\"ltr\">0.35</bdi> (RN من 01 لـ 35)، و fair <bdi dir=\"ltr\">0.45</bdi> (من 36 لـ 80)، و poor <bdi dir=\"ltr\">0.20</bdi> (من 81 لـ 100)، وبعدين الـ demand من عمود نوع اليوم ده (زي good 80 من 44 لـ 78، و fair 60 من 29 لـ 68، و poor 50 من 01 لـ 44). اليوم الأول <bdi dir=\"ltr\">0.41</bdi> يبقى fair و <bdi dir=\"ltr\">0.19</bdi> يبقى 50. ومع <bdi dir=\"ltr\">Q = 60</bdi>:<span class=\"ltr\">d = 50: 25.00 − 19.80 + 0.50 = 5.70 ;  d = 70: 30.00 − 19.80 − 1.70 = 8.50</span>"
    ],
    [
     "Demands 50, 70, 70, 50, 60, 50, 50, 60, 50, 70. Totals: Q = 50 → $71.40; <b>Q = 60 → $74.40 (best)</b>; Q = 70 → $65.00; 80 → $37.00; 90 → $9.00; 100 → −$19.00. From Q = 70 up every demand is met, so each extra 10 papers a day adds $33 of cost over the 10 days and only $5 of salvage: −$28 per step.",
     "الـ demands كانت:<span class=\"ltr\">50, 70, 70, 50, 60, 50, 50, 60, 50, 70</span>والإجماليات:<span class=\"ltr\">Q=50: 71.40 ; Q=60: 74.40 ; Q=70: 65.00 ; Q=80: 37.00 ; Q=90: 9.00 ; Q=100: −19.00</span>يعني <b>أحسن policy هي <bdi dir=\"ltr\">Q = 60</bdi> بربح <bdi dir=\"ltr\">$74.40</bdi></b>. ومن <bdi dir=\"ltr\">Q = 70</bdi> وطالع كل الطلبات بتتلبّى، فكل 10 جرايد زيادة في اليوم بتزوّد <bdi dir=\"ltr\">$33</bdi> تكلفة على الـ 10 أيام و <bdi dir=\"ltr\">$5</bdi> salvage بس، يعني الربح بيقل <bdi dir=\"ltr\">$28</bdi> كل خطوة."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Cake shop problem",
   "ar_h": "مسألة الـ Cake shop",
   "pts": [
    [
     "How many cakes to bake each day (one batch in the morning) to maximize profit? Cost <b>$2.00</b>, price <b>$4.50</b>, leftovers sold day-old at <b>$1.50</b> (a $0.50 loss each). x = production (<b>controllable input</b>), d = demand (<b>uncontrollable</b>), z = daily profit (<b>output</b>); demand is uncertain, so it is a <b>stochastic model</b>.",
     "عايز يعرف يخبز كام كيكة كل يوم (batch واحدة الصبح) عشان يكسب أكتر؟ التكلفة <b><bdi dir=\"ltr\">$2.00</bdi></b> والسعر <b><bdi dir=\"ltr\">$4.50</bdi></b>، واللي يفضل يتباع day-old بـ <b><bdi dir=\"ltr\">$1.50</bdi></b> (خسارة <bdi dir=\"ltr\">$0.50</bdi> في الواحدة). والـ x هي الإنتاج (<b>controllable input</b>)، والـ d هي الطلب (<b>uncontrollable</b>)، والـ z هي الربح اليومي (<b>output</b>)، ولأن الطلب مش مضمون يبقى <b>stochastic model</b>."
    ],
    [
     "Model: <b>x ≤ d → z = 2.5x</b>; <b>x &gt; d → z = 2.5d − 0.5(x − d) = 3d − 0.5x</b>. General (P price, C cost, S salvage): x ≤ d → z = (P − C)x; x &gt; d → z = d(P − C) + (x − d)(S − C) = (P − S)d + (S − C)x.",
     "الـ model:<span class=\"ltr\">x ≤ d → z = 2.5x ;   x > d → z = 2.5d − 0.5(x − d) = 3d − 0.5x</span>وبالشكل العام (P السعر، C التكلفة، S الـ salvage):<span class=\"ltr\">x ≤ d → z = (P − C)x ;   x > d → z = (P − S)d + (S − C)x</span>"
    ],
    [
     "Demand from 20 past days (Table 8-2): 0: 0.05, 1: 0.10, 2: 0.05, 3: 0.10, 4: 0.15, 5: 0.30, 6: 0.15, 7: 0.05, 8: 0.05 (20 paper slips, drawn with replacement). Random-number intervals <b>include their lower end</b> (0.00-0.04999 → 0, …, 0.45-0.74999 → 5, 0.75-0.89999 → 6, …), so 0.15 → 2 and 0.75 → 6; the Lecture 5 rule F(xᵢ₋₁) &lt; R ≤ F(xᵢ) gives the lower value. <b>State the convention you use.</b>",
     "الطلب من 20 يوم فاتوا (جدول 8-2):<span class=\"ltr\">0: 0.05, 1: 0.10, 2: 0.05, 3: 0.10, 4: 0.15, 5: 0.30, 6: 0.15, 7: 0.05, 8: 0.05</span>(يعني 20 ورقة بنسحب منهم ونرجّع). والـ intervals بتاعة الـ random numbers <b>بتشمل الطرف الصغير</b>:<span class=\"ltr\">0.00–0.04999 → 0 , … , 0.45–0.74999 → 5 , 0.75–0.89999 → 6 , …</span>فـ <bdi dir=\"ltr\">0.15 → 2</bdi> و <bdi dir=\"ltr\">0.75 → 6</bdi>، أما قاعدة المحاضرة 5 <bdi dir=\"ltr\">F(xᵢ₋₁) < R ≤ F(xᵢ)</bdi> فبتدّي القيمة الأصغر. <b>اكتب الـ convention اللي استخدمتها.</b>"
    ],
    [
     "Ten days, demands 5, 1, 6, 3, 4, 4, 8, 0, 5, 6: x = 3 → <b>$60</b> (day 8, d = 0: −$1.50). Same demands for x = 1..8 (Table 8-4): best <b>x = 6 ($90)</b>; ten days is too short (demands 2 and 7 never appeared); a <b>500-day</b> run also gives <b>x = 6</b> ($4467).",
     "لـ 10 أيام والطلبات <bdi dir=\"ltr\">5, 1, 6, 3, 4, 4, 8, 0, 5, 6</bdi>: الـ <bdi dir=\"ltr\">x = 3</bdi> بيدّي <b><bdi dir=\"ltr\">$60</bdi></b> (اليوم 8 الطلب صفر فالربح <bdi dir=\"ltr\">−$1.50</bdi>). وبنفس الطلبات لـ <bdi dir=\"ltr\">x = 1..8</bdi> (جدول 8-4) الأحسن <b><bdi dir=\"ltr\">x = 6</bdi></b> بـ <bdi dir=\"ltr\">$90</bdi>، بس 10 أيام قليلين (الطلب 2 و 7 مظهروش خالص)، والـ run على <b>500 يوم</b> كمان طلّع <bdi dir=\"ltr\">x = 6</bdi> (<bdi dir=\"ltr\">$4467</bdi>)."
    ],
    [
     "<b>Goodwill cost</b> g per unsatisfied order (book Q2, g = $2): x ≤ d → <b>z = 2.5x − 2(d − x) = 4.5x − 2d</b>; x &gt; d unchanged (3d − 0.5x). With the ten demands, x = 6, 7, 8 all give <b>$86</b>: goodwill penalizes under-production, so the best quantity tends to <b>increase</b> (or at least not decrease).",
     "الـ <b>Goodwill cost</b> (g لكل طلب ماتلبّاش، سؤال 2 في الكتاب بـ <bdi dir=\"ltr\">g = $2</bdi>):<span class=\"ltr\">x ≤ d → z = 2.5x − 2(d − x) = 4.5x − 2d ;   x > d → z = 3d − 0.5x</span>وبنفس الـ 10 طلبات الـ <bdi dir=\"ltr\">x = 6, 7, 8</bdi> كلهم بيدّوا <b><bdi dir=\"ltr\">$86</bdi></b>. يعني الـ goodwill بيعاقب على قلة الإنتاج، فالكمية الأحسن <b>بتزيد</b> (أو على الأقل مبتقلش)."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Inventory (Auto Supplies) and the chapter summary",
   "ar_h": "الـ Inventory (Auto Supplies) وملخص الفصل",
   "pts": [
    [
     "Two decision variables, <b>order quantity x</b> and <b>reorder point r</b>; two probabilistic components, <b>daily demand</b> and <b>lead time</b> (same example as Lecture 2). Costs: ordering <b>$20</b> per order, holding <b>$0.10</b> per unit per day, shortage <b>$50</b> per unit. Goal: minimum total cost.",
     "فيه decision variables اتنين: الـ <b>order quantity x</b> والـ <b>reorder point r</b>، وفيه probabilistic components اتنين: الـ <b>daily demand</b> والـ <b>lead time</b> (نفس مثال المحاضرة 2). والتكاليف: الـ ordering <b><bdi dir=\"ltr\">$20</bdi></b> للـ order، والـ holding <b><bdi dir=\"ltr\">$0.10</bdi></b> للوحدة في اليوم، والـ shortage <b><bdi dir=\"ltr\">$50</bdi></b> للوحدة. والهدف أقل total cost."
    ],
    [
     "One day (Figure 8-8): (1) arrivals? <b>I = I + x</b> (orders arrive at the start of the day); (2) generate demand d; (3) if I ≥ d, I = I − d, else shortage cost $50(d − I) and I = 0; (4) if <b>I ≤ r and no order is outstanding</b>, order ($20) and generate lead time L (never two orders outstanding); (5) holding 0.10 × I; (6) total = shortage + ordering + holding.",
     "اليوم الواحد (شكل 8-8): (1) فيه orders وصلت؟ يبقى <bdi dir=\"ltr\">I = I + x</bdi> (الـ orders بتوصل أول اليوم)، (2) ولّد الطلب d، (3) لو <bdi dir=\"ltr\">I ≥ d</bdi> يبقى <bdi dir=\"ltr\">I = I − d</bdi>، وغير كده shortage cost <bdi dir=\"ltr\">$50(d − I)</bdi> و <bdi dir=\"ltr\">I = 0</bdi>، (4) لو <bdi dir=\"ltr\">I ≤ r</bdi> <b>ومفيش order مستني</b> اطلب (<bdi dir=\"ltr\">$20</bdi>) وولّد الـ lead time L (عمر ما يبقى فيه 2 orders مستنيين)، (5) الـ holding <bdi dir=\"ltr\">0.10 × I</bdi>، (6) الإجمالي هو الـ shortage والـ ordering والـ holding."
    ],
    [
     "Results: good solutions around <b>x = 20 to 25</b> and <b>r = 6 or 7</b>; simulation gives <b>near-optimal</b>, not guaranteed optimal, decisions. Summary: simulation ranges from <b>problem solving</b> to <b>insight gathering</b>; questions like \"What would happen if …?\", \"Should we …?\" answered by simulation are <b>problem solving</b>.",
     "النتايج: الحلول الكويسة حوالين <bdi dir=\"ltr\">x = 20</bdi> لـ 25 و <bdi dir=\"ltr\">r = 6</bdi> أو 7، والـ simulation بتدّي قرارات <b>near-optimal</b> مش optimal مضمون. والملخص: الـ simulation استخدامها من الـ <b>problem solving</b> لحد الـ <b>insight gathering</b>، والأسئلة زي «إيه اللي هيحصل لو …؟» و«المفروض نعمل …؟» لو جاوبناها بـ simulation يبقى ده <b>problem solving</b>."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Written (Final 2025/26, Q3-b, 15 marks): cake shop with a goodwill cost of <b>$5</b> per unsatisfied order, P = $8, C = $5, S = $3. (i) Model: x ≤ d → z = (P − C)x − u(d − x) = <b>8x − 5d</b>; x &gt; d → z = (P − S)d + (S − C)x = <b>5d − 2x</b>.",
     "سؤال مكتوب (Final <bdi dir=\"ltr\">2025/26</bdi> سؤال Q3-b بـ 15 درجة): الـ cake shop بـ goodwill cost <b><bdi dir=\"ltr\">$5</bdi></b> لكل طلب ماتلبّاش، والـ <bdi dir=\"ltr\">P = $8</bdi> و <bdi dir=\"ltr\">C = $5</bdi> و <bdi dir=\"ltr\">S = $3</bdi>. (i) الـ model:<span class=\"ltr\">x ≤ d → z = (P − C)x − u(d − x) = 8x − 5d</span><span class=\"ltr\">x > d → z = (P − S)d + (S − C)x = 5d − 2x</span>"
    ],
    [
     "(ii) Demands 0, 10, …, 80 with the Table 8-2 frequencies; RNs 0.99, 0.15, 0.33, 0.35, 0.91, 0.41, 0.60, 0.27, 0.75, 0.88 → (lower end included) <b>80, 20, 40, 40, 70, 40, 50, 30, 60, 60</b>. x = 60 → <b>$950</b>; x = 80 → <b>$850</b>. (iii) Best: <b>x = 60</b> (with the other boundary reading, 850 and 750: still 60).",
     "(ii) الطلبات من 0 لـ 80 كل 10 بنفس frequencies جدول 8-2، والـ RNs:<span class=\"ltr\">0.99, 0.15, 0.33, 0.35, 0.91, 0.41, 0.60, 0.27, 0.75, 0.88</span>بتدّي (والطرف الصغير داخل):<span class=\"ltr\">80, 20, 40, 40, 70, 40, 50, 30, 60, 60</span><span class=\"ltr\">x = 60 → $950 ;   x = 80 → $850</span>(iii) الأحسن <b><bdi dir=\"ltr\">x = 60</bdi></b> (ولو قريت الحدود بالطريقة التانية يطلعوا 850 و 750، وبرضه 60 أحسن)."
    ],
    [
     "Written (Final 2024/25, Q3-b, 10 marks): weekly inventory, Q = 15, r = 5, beginning 10, holding $5/unit/week, ordering $200, shortage $20/unit; 10 demand and 5 lead-time random numbers. Week 4 ends at 3 → order (L = 2, arrives week 6); week 5 is short 1; week 8 ends at 5 → order (L = 1). Totals: holding $445, ordering $400, shortage $20, <b>$865</b> ($86.50/week).",
     "سؤال مكتوب (Final <bdi dir=\"ltr\">2024/25</bdi> سؤال Q3-b بـ 10 درجات): فيه inventory أسبوعي بـ <bdi dir=\"ltr\">Q = 15</bdi> و <bdi dir=\"ltr\">r = 5</bdi> والبداية 10، والـ holding <bdi dir=\"ltr\">$5</bdi> للوحدة في الأسبوع، والـ ordering <bdi dir=\"ltr\">$200</bdi>، والـ shortage <bdi dir=\"ltr\">$20</bdi> للوحدة، ومعاه 10 RNs للطلب و 5 للـ lead time. الأسبوع 4 بيخلص بـ 3 فنطلب (<bdi dir=\"ltr\">L = 2</bdi> فيوصل الأسبوع 6)، والأسبوع 5 فيه عجز وحدة، والأسبوع 8 بيخلص بـ 5 فنطلب (<bdi dir=\"ltr\">L = 1</bdi>). والإجمالي:<span class=\"ltr\">holding 445 + ordering 400 + shortage 20 = $865  ($86.50 / week)</span>"
    ],
    [
     "Lab quiz sheets: <b>Quiz 2</b> (flipping coin game with 100 given numbers → 13 games, mean −0.3846, not safe) and <b>Quiz 5</b> (newspaper seller → best Q = 60, $74.40).",
     "ورق الـ quizzes بتاع الـ labs هو <b>Quiz 2</b> (لعبة العملة بـ 100 رقم معطيين، والنتيجة 13 لعبة و mean <bdi dir=\"ltr\">−0.3846</bdi> يعني مش safe)، و<b>Quiz 5</b> (الـ newspaper seller، وأحسن <bdi dir=\"ltr\">Q = 60</bdi> بـ <bdi dir=\"ltr\">$74.40</bdi>)."
    ],
    [
     "Also expect: fill a Gift Shop table (WT, idle, averages), the first pursuit steps, a drunk trial from given RNs, the Monte Carlo area formula, and the cake shop ten-day table with or without goodwill.",
     "ومتوقع كمان: تملا جدول الـ Gift Shop (الـ WT والـ idle والمتوسطات)، وأول خطوات الـ pursuit، و trial للـ drunk من RNs معطاة، وقانون الـ Monte Carlo area، وجدول الـ cake shop لـ 10 أيام بالـ goodwill أو من غيره."
    ]
   ]
  }
 ]
};

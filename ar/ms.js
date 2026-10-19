// Egyptian Arabic for Modeling & Simulation, aligned item by item with ms.js and extra/ms.js.
window.AR = window.AR || {};
AR.ms = {
 "lectures": {
  "1": {
   "notes": [
    {
     "h": "إزاي تقيّم الـ performance بتاع system؟ (سلايد 1 لـ 6)",
     "pts": [
      "ده الـ Chapter 1 بعنوان <b>Introduction to Modeling and Simulation</b> للدكتور محمد عبد الفتاح (سلايد 1). المحتويات (سلايد 2):<br>• مقدمة (Introduction)<br>• أمثلة على الـ simulation<br>• يعني إيه simulation وبتتعمل إزاي؟<br>• يعني إيه system؟<br>• يعني إيه model؟<br>• يعني إيه performance metric؟<br>• خطوات الـ simulation study",
      "لو عندك system، تقيّم الـ performance بتاعه إزاي؟ فيه 3 طرق (سلايد 4):<br>(1) الـ <b>Measurements</b>: تستخدم نسخة موجودة فعلًا (existing instance) من الـ system وتعمل عليها قياسات للـ performance.<br>(2) الـ <b>Analysis</b>: تعمل تجريد رياضي (mathematical abstraction) للـ system وتطلّع منه formulas بتوصف الـ performance بتاعه.<br>(3) الـ <b>Simulation</b>: تكتب computer program بيعمل implement لـ model للـ system، وتعمل experiments عن طريق إنك تشغّل البرنامج ده.",
      "الرسمة (سلايد 4 و 5): شجرة فوقها صندوق <b><bdi>System: How to evaluate?</bdi></b> وطالع منه 3 فروع <b>Measurements</b> و<b>Analysis</b> و<b>Simulation</b>، وتحت كل فرع صندوق فيه وصفه.",
      "مشاكل كل طريقة (سلايد 5):<br>• الـ <b>Measurements</b>: طب لو الـ system مش موجود في الواقع أصلًا؟ أو لو التغييرات فيه غالية جدًا أو بتاخد وقت كبير؟ أو لو الـ system مش متاح؟<br>• الـ <b>Analysis</b>: بتدي حلول كويسة، بس تنفع بس مع الـ <b>simple systems</b>؛ الـ systems اللي في الواقع معقدة جدًا (زي مصنع أو كمبيوتر أو network).<br>• الـ <b>Simulation</b>: إزاي تضمن إن الـ model والـ implementation والـ analysis مش بيطلّعوا مجرد عشوائية (randomness)؛ وكمان مشكلة <b><bdi>Garbage-In Garbage-Out (GIGO)</bdi></b>، يعني لو دخّلت بيانات زبالة هتطلع نتايج زبالة.",
      "أسئلة مفتوحة الكورس بيجاوب عليها (سلايد 6):<br>• يعني إيه system؟<br>• يعني إيه model؟<br>• يعني إيه performance وإزاي نقيسه؟<br>• الـ performance بيعتمد على إيه؟<br>• إزاي نبني model؟<br>• إزاي نقيّمه رقميًا (numerically)؟<br>• إزاي نفسّر النتايج دي؟"
     ],
     "figH": {
      "ms-evaluate": "تلات طرق نقيّم بيها الـ system، ومشكلة كل طريقة"
     }
    },
    {
     "h": "أمثلة على الـ simulation (سلايد 7 لـ 14)",
     "pts": [
      "الرسمة (سلايد 8): صورتين: <b>حصان خشب ميكانيكي للتدريب (simulator) أيام الحرب العالمية الأولى</b>، و<b>عسكري جوه simulator لسواقة عربية تقيلة بعجل</b>. يعني الـ simulation للتدريب حاجة قديمة.",
      "الرسمة (سلايد 9): الـ <b>Entertainment games</b> (منظر من كابينة flight simulator) والـ <b>Serious games</b> (أوضة تدريب فيها عمال قاعدين قدام شاشات simulation).",
      "مثال الـ <b>Computer network</b> (سلايد 10): الـ clients بيطلبوا service من server عن طريق network.<br>• الـ Client = الـ user والـ web browser<br>• الـ Service = صفحة الويب (web page)<br>• الـ Server = الـ web server<br>• الـ Network = واحدة من دول:<span class=\"ltr\">{local network, Internet, wireless network}</span>",
      "تحليل مثال الـ network: بنشوف الـ performance بتاع الـ <b>server</b> والـ performance بتاع الـ <b>network</b>. خد بالك: في المثال ده الـ server والـ network الاتنين مرسومين بشكل مبسّط جدًا (سلايد 10).",
      "الرسمة (سلايد 10): من Client 1 لحد Client k بيبعتوا requests عبر سحابة مكتوب عليها <b>Network (Internet)</b> لـ <b>Server</b>. وتحتها نفس الحكاية بس كـ queueing model: كل client عبارة عن queue (مربعات) وبعدها server (دايرة)؛ والـ outputs بتاعتهم بتتجمع في queue واحدة وبعدها server (دي الـ network)، وبعدهم queue تانية وبعدها server تاني (دول الـ web server).",
      "الـ <b>networks الكبيرة زي الـ Internet</b> (سلايد 11): لازم تعمل model للـ <b>topology</b> والـ <b>routing</b> والـ <b>traffic</b> والـ <b>background traffic</b>. الرسمة: شبكة (mesh) من routers كتير متوصلين ببعض.",
      "الـ <b><bdi>Mobile multi-hop ad-hoc network</bdi> (MANET)</b> (سلايد 12):<br>• هي wireless network متكونة من mobile nodes<br>• مفيهاش infrastructure، يعني مفيش Access Points ولا Base Stations<br>• أي 2 nodes يقدروا يكلموا بعض لو كل واحدة فيهم جوه الـ communication range بتاع التانية<br>• عادةً الـ source node والـ destination node بتوع الـ connection بيبقوا بعيد عن بعض بكذا hop<br>• عشان كده كل الـ nodes لازم تعمل forward للـ data بتاعة غيرها",
      "الرسمة (سلايد 12): مساحة حركة مربعة فيها nodes، وكل node حواليها دايرة متقطعة (دي الـ <b>communication range</b> بتاعتها). الـ labels هي الـ mobile node والـ communication range والـ source node والـ relay node والـ destination node؛ والـ data بتمشي من الـ source عن طريق الـ relay nodes لحد الـ destination.",
      "أسئلة الـ mobility (سلايد 13): إيه احتمال إن الـ node تبقى عند النقطة دي في مساحة الحركة؟<span class=\"ltr\">p = (x, y)</span>هل التوزيع uniformly distributed (عشان الـ x والـ y بيتختاروا uniformly)؟ ولا فيه مناطق مفضّلة أكتر؟ وإيه تأثير الـ parameters بتاعة الـ <b>velocity</b> والـ <b>pause time</b>؟",
      "الرسمة (سلايد 13): فوق، المسار الزجزاج لـ node واحدة بتتحرك بين نقط عشوائية على مساحة مقاسها:<span class=\"ltr\">1000 × 1000</span>وتحت، سطح ثلاثي الأبعاد لكثافة مكان الـ node، اللي هي <bdi>f(x, y)</bdi>: شكلها تل، أعلى حاجة في <b>نص</b> المساحة (قيمتها هناك في حدود 2E-6 بس) وقريبة من الصفر عند الأطراف. يعني المنتصف مفضّل، والتوزيع مش uniform.",
      "رغم إن الموضوع سهل يتوصف، صعب تطلّع له <b><bdi>closed-form</bdi> formula</b> للـ <bdi>f(x, y)</bdi>؛ وعشان كده بنعمل simulation (سلايد 13).",
      "الخلاصة (سلايد 14): الـ simulation بنستخدمها عشان <b>نقلّد العالم الحقيقي (imitate the real world)</b>؛ وهي مش جديدة زي ما احنا فاكرين.",
      "استخدامات الـ simulation حسب <b>Elmaghraby [1968]</b> (سلايد 14):<br>(1) مساعدة في التفكير (Aid to thought)<br>(2) التواصل (Communication)<br>(3) التدريب والتعليم (<bdi>Training/Education</bdi>)<br>(4) التجريب (Experimentation)<br>(5) التنبؤ (Predicting)<br>• وكمان الـ <b>Entertainment</b> (تطبيق جديد): الـ video games والـ serious games.",
      "الـ Homework H1 (سلايد 14): هات مثال لتطبيق simulation حسب تقسيمة Elmaghraby [1968] (مثلًا حصان الحرب العالمية الأولى ده تبع الـ <bdi>Training/Education</bdi>)."
     ],
     "figH": {
      "ms-netqueue": "الـ clients والـ network والـ server، ونفس الصورة كـ queueing model",
      "ms-internet": "الـ model بتاع network كبيرة محتاج إيه: الـ topology والـ routing والـ traffic والـ background traffic",
      "ms-manet": "الـ MANET: الداتا بتنط من الـ source عبر الـ relay nodes لحد الـ destination",
      "ms-waypoint": "اعمل simulation لـ node بتتحرك: هل مكانها uniform على المساحة؟"
     }
    },
    {
     "h": "يعني إيه simulation وبتتعمل إزاي؟ (سلايد 15 و 16)",
     "pts": [
      "الـ <b>simulation</b> هي <b>تقليد (imitation)</b> لطريقة شغل system حقيقي <b>على مدار الوقت (over time)</b> (سلايد 16).",
      "الرسمة (سلايد 16): محور زمن عليه states <bdi>S0, S1, S2, …</bdi>؛ وفيه أقواس حمرا بتنط من state للي بعدها، والمسافات بينها أطوالها مختلفة: يعني الـ system بينتقل من state لـ state مع مرور الوقت.",
      "الطريقة (سلايد 16):<br>(1) تولّد <b>تاريخ صناعي (artificial history)</b> للـ system.<br>(2) تطلّع <b>استنتاجات (inferences)</b> من التاريخ الصناعي ده عن خصائص الـ system.",
      "بتتعمل إزاي (سلايد 16): بتبني <b>model</b>؛ والـ model بيتكون من <b>entities</b> (objects).",
      "الـ lecture notes بتضيف: الـ simulation فيها إنك تولّد artificial history و<b>تراقبه (observe)</b> عشان تطلّع استنتاجات عن الـ operating characteristics بتاعة الـ system الحقيقي. وتقدر تعمل model بالـ simulation للـ systems <b>الموجودة فعلًا (existing) واللي لسه فكرة (conceptual)</b> الاتنين. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-statetime": "الـ run بينط من state للتانية مع الوقت وبيبني artificial history"
     }
    },
    {
     "h": "إمتى الـ simulation تبقى مناسبة وإمتى لأ؟ (سلايد 17 و 18)",
     "pts": [
      "الـ simulation مناسبة عشان (سلايد 17):<br>(1) الـ simulation بتخليك <b>تدرس experiments</b> فيها تفاعلات داخلية (internal interactions).<br>(2) تقدر تعمل simulation للتغييرات المعلوماتية والتنظيمية والبيئية (informational و organizational و environmental) وتشوف <b>سلوك (behavior)</b> الـ model.<br>(3) المعرفة اللي بتطلع من الـ simulations ممكن تستخدمها عشان <b>تحسّن</b> الـ system.<br>(4) لما تراقب النتايج ممكن تاخد <b>insight</b> عن أنهي variables هي الأهم.<br>(5) ممكن تستخدم الـ simulation كـ <b>أداة تعليمية (pedagogical device)</b> عشان تثبّت المادة العلمية.<br>(6) ممكن تستخدم الـ simulations عشان <b>تتأكد من النتايج التحليلية (verify analytical results)</b>، زي الـ queueing systems.<br>(7) الـ animation بتاع الـ simulation ممكن يوريك الـ system وهو شغال، فتقدر <b>تتخيل (visualize)</b> الخطة.",
      "الـ lecture notes بتضيف: الـ simulation ممكن تتعمل على designs و policies جديدة قبل ما تتنفذ؛ وإنك تعمل simulation لقدرات مختلفة لمكنة بيساعدك تحدد الـ requirements؛ والـ simulation models اللي للتدريب بتخلي التعلّم ممكن من غير تكلفة ولخبطة التعلّم وانت في الشغل نفسه (on the job)؛ والـ systems الحديثة (مصنع أو wafer fabrication plant أو service organization) معقدة جدًا لدرجة إن التفاعلات الداخلية فيها مينفعش تتعامل معاها غير بالـ simulation. ‡ (الـ lecture notes)",
      "الـ simulation <b>مش</b> مناسبة (سلايد 18):<br>(1) لما المشكلة تتحل بـ <b>المنطق العادي (common sense)</b>.<br>(2) لما المشكلة ممكن <b>تتحل رياضيًا</b>.<br>(3) لما <b>التجارب المباشرة تبقى أسهل</b>.<br>(4) لما <b>تكلفة الـ simulation تبقى أكتر من اللي هتوفره</b>.<br>(5) لما الـ simulation تحتاج <b>وقت مش متاح</b>.<br>(6) لما <b>مفيش data (input)</b> متاحة، والـ simulations محتاجة data.<br>(7) لما الـ simulation <b>مينفعش يتعملها verify أو validate</b>.<br>(8) لما سلوك الـ system يبقى <b>معقد جدًا أو مش معروف</b>. مثال: سلوك البني آدمين معقد جدًا إنك تعمل له model.",
      "الـ lecture notes بتنسب ليستة «مش مناسبة» لـ <b>Banks and Gibson [1997]</b> (عشر قواعد). التفاصيل اللي بتضيفها:<br>• القاعدتين 5 و 6: مينفعش تعمل simulation لو الـ <b>resources أو الوقت</b> مش متاحين.<br>• القاعدة 7: لو مفيش data متاحة، <b>ولا حتى تقديرات (estimates)</b>، يبقى الـ simulation مش منصوح بيها (ممكن تحتاج data كتير).<br>• القاعدة 8: القدرة إنك تعمل <b>verify و validate</b> للـ model؛ لو مفيش وقت كفاية أو الناس (personnel) مش متاحين، الـ simulation مش مناسبة.<br>• القاعدة 10: سلوك الـ system معقد جدًا أو <b>مينفعش يتعرّف (cannot be defined)</b>. ‡ (الـ lecture notes)",
      "مثال الـ common sense (من قواعد Banks and Gibson): الزباين بييجوا بشكل عشوائي بمعدل متوسط <b>50 في الساعة</b> وبيتخدموا بمعدل متوسط <b>10 في الساعة</b>. أقل عدد servers مش محتاج simulation خالص، الحساب كده:<span class=\"ltr\">50/10 = 5 servers</span>يعني <b>5 servers</b>. ‡ (الـ lecture notes)",
      "الـ lecture notes بتضيف قاعدة كمان: لو المديرين عندهم <b>توقعات مش منطقية</b> (عايزين حاجات كتير بسرعة أوي) أو مكبّرين قوة الـ simulation زيادة عن اللزوم، ساعتها الـ simulation ممكن متبقاش مناسبة. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-commonsense": "بالـ common sense من غير simulation: كام server محتاجين لـ 50 customer في الساعة؟"
     }
    },
    {
     "h": "مميزات وعيوب الـ simulation (سلايد 19 و 20)",
     "pts": [
      "المميزات (سلايد 19):<br>(1) تقدر تستكشف الـ policies والـ procedures والـ decision rules والـ information flows <b>من غير ما تلخبط الـ system الحقيقي</b>.<br>(2) الـ hardware designs الجديدة والـ physical layouts والـ transportation systems والـ protocols والـ computer systems والـ network architectures ممكن <b>تتختبر من غير ما تحجز resources</b>.<br>(3) الفرضيات (hypotheses) عن إزاي أو ليه ظاهرة معينة بتحصل ممكن <b>تتختبر من ناحية الـ feasibility</b>.<br>(4) <b>الوقت ممكن تضغطه أو تمطّه</b> (تبطّأه أو تسرّعه).<br>(5) فهم (insight) لـ <b>التفاعل</b> بين الـ variables.<br>(6) فهم لـ <b>أهمية</b> الـ variables بالنسبة للـ performance بتاع الـ system.<br>(7) تقدر تعمل <b>Bottleneck analysis</b> عشان تكتشف المشاكل.<br>(8) بتساعدك تفهم الـ system <b>شغال فعلًا إزاي</b> مش الناس فاكرينه شغال إزاي.<br>(9) تقدر تجاوب على أسئلة <b><bdi>\"What if …\"</bdi></b>.",
      "العيوب (سلايد 20):<br>(1) بناء الـ model <b>محتاج تدريب</b>؛ هو <b>زي الفن (like an art)</b> (قارن بناء الـ model بالبرمجة).<br>(2) النتايج ممكن تبقى <b>صعب تفسيرها</b>: أغلب الـ outputs هي في الأساس <b>random variables</b>، فمش سهل تحدد هل الـ output ده عشوائية ولا سلوك الـ system.<br>(3) الـ simulation ممكن <b>تاخد وقت كتير وتبقى غالية</b>؛ ولو بخلت في الوقت والـ resources ممكن تطلع بنتايج ملهاش لازمة أو غلط.",
      "العيوب دي <b>بتتعوّض (offset)</b> كده (سلايد 20):<br>• الـ simulation packages فيها models <b>محتاجة input data بس</b>.<br>• الـ simulation packages فيها <b>إمكانيات output analysis</b>.<br>• تطور تكنولوجيا الكمبيوتر بيحسّن <b>أوقات الـ simulation</b>.<br>• أغلب المشاكل الحقيقية <b>ملهاش <bdi>closed-form</bdi> solutions</b> (فالـ simulation لازمة في كل الأحوال).",
      "الـ lecture notes بتنسب الليستتين دول لـ <bdi>Pegden, Shannon and Sadowski [1995]</bdi>، وبتشرح الـ bottleneck analysis إنها اكتشاف الأماكن اللي الـ work in process والـ materials والـ information وغيرها بيتأخروا فيها. ‡ (الـ lecture notes)"
     ]
    },
    {
     "h": "مجالات تطبيق الـ simulation (سلايد 21)",
     "pts": [
      "مجالات التطبيق (سلايد 21):<br>• تطبيقات التصنيع (Manufacturing applications)<br>• تصنيع الـ semiconductors (Semiconductor manufacturing)<br>• الـ Construction engineering and project management<br>• التطبيقات العسكرية (Military applications)<br>• الـ <bdi>Logistics, supply chain and distribution applications</bdi><br>• الـ Transportation models and traffic<br>• الـ Business process simulation<br>• الرعاية الصحية (Health care)<br>• الـ <bdi>Call-center</bdi><br>• الـ Computers and Networks<br>• الألعاب والترفيه (<bdi>Games, Entertainment</bdi>)<br>• …",
      "الـ lecture notes بتضيف كمان الـ <b>Automated Material Handling Systems (AMHS)</b>. ‡ (الـ lecture notes)"
     ]
    },
    {
     "h": "الـ system والـ system environment (سلايد 22 لـ 24)",
     "pts": [
      "الـ <b>system</b> هو <b>مجموعة objects</b> مربوطة ببعض في تفاعل أو اعتماد متبادل منتظم (regular interaction or interdependence) عشان <b>تحقق هدف معين</b> (سلايد 23).",
      "صياغة الـ lecture notes: الـ system هو <b>تجميعة (aggregation or assemblage) من الـ objects</b> مربوطة في تفاعل أو اعتماد متبادل منتظم؛ والـ system غالبًا بيتأثر بتغييرات بتحصل برّاه، والتغييرات دي بنقول إنها بتحصل في الـ <b>system environment</b>. ‡ (الـ lecture notes)",
      "أمثلة (سلايد 23):<br>• الـ <b>Automobile factory</b>: المكن والقطع والعمال بيشتغلوا مع بعض عشان يطلّعوا عربية.<br>• الـ <b>Computer network</b>: الـ users والـ hosts والـ routers والـ lines بيكوّنوا network.",
      "الرسمة (سلايد 23 و 24): فيه 4 routers جوه سحابة صفرا (دي الـ system)؛ ولابتوب بأنتينا wireless على الشمال وكمبيوتر desktop على اليمين، الاتنين برّه السحابة.",
      "الـ <b>System environment</b>: كل حاجة <b>برّه</b> الـ system، بس <b>بتأثر</b> عليه (سلايد 24).",
      "خد بالك (سلايد 24): مهم جدًا إنك <b>تحدد الحدود (boundary)</b> بين الـ system والـ system environment؛ والقرار ده بيعتمد على <b>هدف الدراسة (purpose of the study)</b>.",
      "مثال الـ lecture notes على system مصنع (Fig 1.1):<span class=\"ltr\">raw materials → Purchasing → Fabrication → Assembly → Shipping → finished products</span>ومعاهم Production Control Department بيستقبل <b>طلبات الزباين (customer orders)</b>. العوامل اللي بتتحكم في وصول الطلبات برّه سيطرة المصنع، فهي جزء من الـ <b>environment</b>: لو الطلب في السوق زاد، الإنتاج بيزيد، وعشان كده <b>السوق هو الـ system environment</b>. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-sysenv": "الـ system والـ environment بتاعه والحدود اللي بينهم",
      "ms-factory": "الـ Fig 1.1: مصنع كـ system، والسوق هو الـ environment بتاعه"
     }
    },
    {
     "h": "مكونات الـ system (سلايد 25 لـ 27)",
     "pts": [
      "المصطلحات العامة (سلايد 25)، شوف الجدول. سطر لكل واحد:<br>• الـ <b>Entity</b>: الـ object اللي يهمنا في الـ system.<br>• الـ <b>Attribute</b>: خاصية (property) للـ entity.<br>• الـ <b>Activity</b>: فترة زمنية طولها محدد.<br>• الـ <b>System state</b>: مجموعة الـ variables اللي محتاجها عشان توصف الـ system في أي لحظة.<br>• الـ <b>Event</b>: حاجة بتحصل في لحظة (instantaneous) وممكن تغيّر الـ state بتاع الـ system.<br>• الـ <b>Endogenous</b>: هي الـ activities والـ events بتحصل <b>جوه</b> الـ system.<br>• الـ <b>Exogenous</b>: هي الـ activities والـ events في الـ <b>environment</b> (برّه الـ system) وبتأثر على الـ system.",
      "الـ lecture notes كاتبة الـ endogenous إنها <bdi>\"occurring with the system\"</bdi> والـ exogenous <bdi>\"occurring with the environment\"</bdi>؛ اقرا كلمة with على إنها <b>within (جوه)</b>، زي سلايد 25. ‡ (الـ lecture notes)",
      "الـ <b>Open system</b>: ده system فيه exogenous activity. والـ <b>Closed system</b>: ده system <b>مفيهوش</b> exogenous activity خالص. ‡ (الـ lecture notes)",
      "مثال على system بسيط: <b>router بـ 2 interfaces</b> (سلايد 26).<br>• الـ Entity: الـ router.<br>• الـ Attributes:<span class=\"ltr\">{IF1, IF2}</span>• الـ Activities:<span class=\"ltr\">Transmit IF1 → IF2, 20 µs<br>Transmit IF2 → IF2, 15 µs<br>Drop on IF1, 10 µs<br>Drop on IF2, 10 µs</span>• الـ System state:<span class=\"ltr\">S = {R1, T1, D1, Q1, R2, T2, D2, Q2}</span>حيث الـ Ri هي الـ packets اللي اتستقبلت (received) على الـ interface رقم i، والـ Ti هي الـ packets اللي اتبعتت (transmitted) عليه، والـ Di هي الـ packets اللي اتعملها drop عنده، والـ Qi هي طول الـ queue بتاعه.<br>• الـ Events: وصول packet ومعاه البيانات دي:<span class=\"ltr\">{IF, Time, Packet length}</span>",
      "في سلايد 26 الـ activity التانية مكتوبة <bdi>\"Transmit IF2 -> IF2, 15µs\"</bdi>؛ وبما إن الـ transmit activity بتبقى بين الـ 2 interfaces، فالأغلب إن المقصود <b><bdi>IF2 → IF1</bdi></b> (غلطة مطبعية في السلايد). ‡",
      "الرسمة (سلايد 26): رمز router وعلى شماله خط مكتوب عليه IF1 وعلى يمينه خط مكتوب عليه IF2.",
      "سلايد 27 بيدي أمثلة تانية لـ systems ومكوناتها (الجدول تحت، زي ما هو في السلايد بالظبط).",
      "نسخة الـ lecture notes (Table 1.1) بتدي الـ attributes بتاعة الـ Bank إنها <b>balance و credit status</b>، والـ activities إنها <b>depositing و withdrawal</b>؛ والـ state variable بتاع الـ Production إنه <b>الـ status of machine</b>، يعني المكنة busy أو idle أو down. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-router": "مثال الـ router: الـ entity والـ attributes والـ activities والـ state والـ events",
      "ms-systable": "الـ systems بتاعة slide 27: اتفرج على الـ components بتاعتها وبعدين اختبر نفسك"
     }
    },
    {
     "h": "الـ Discrete والـ continuous systems (سلايد 28)",
     "pts": [
      "الـ <b>Discrete systems</b>: الـ state variables بتتغير بس عند <b>مجموعة نقط منفصلة (discrete set of points)</b> في الزمن. أمثلة: البنك ومحل الهدايا (gift shop)؛ الـ router والـ host؛ الـ jobs في الـ queue (سلايد 28).",
      "الـ <b>Continuous systems</b>: الـ state variables بتتغير <b>بشكل مستمر مع الوقت</b>. أمثلة: ارتفاع المية ورا السد (head of water behind a dam)؛ ودرجة الحرارة (سلايد 28).",
      "الرسمة (سلايد 28، فوق): عدد الزباين المستنيين <bdi>\"Customers waiting\"</bdi> قصاد الوقت: <b>step function</b>، خطوط مستقيمة بتنط لفوق أو لتحت في لحظات منفردة.",
      "الرسمة (سلايد 28، تحت): ارتفاع المية <bdi>\"Head of water\"</bdi> قصاد الوقت: <b>منحنى ناعم (smooth curve)</b> بيطلع وينزل من غير نطّات.",
      "مثال البنك: عدد الزباين في البنك بيتغير بس لما زبون <b>يوصل</b> أو لما <b>خدمته تخلص</b>. مثال السد: بعد عاصفة مطر المية بتدخل البحيرة اللي ورا السد، والمية بتتسحب عشان التحكم في الفيضان وعشان توليد الكهربا، فارتفاع المية بيتغير بشكل مستمر. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-discont": "الـ discrete state بينط عند لحظات معينة، والـ continuous state بيتغير على طول"
     }
    },
    {
     "h": "الـ Model بتاع system: تعريفه وأنواعه (سلايد 29 لـ 37)",
     "pts": [
      "رسومات الـ models (سلايد 30 لـ 33): كاريكاتير لكمبيوترات ماشية على catwalk قدام جمهور (نكتة على كلمة model)؛ و computer model ثلاثي الأبعاد لمبنى <b>آيا صوفيا (Hagia Sophia)</b>؛ و computer model لـ <b>خطوط المجال المغناطيسي للشمس</b>؛ و <b>climate model بيربط المحيط بالغلاف الجوي</b> (الطاقة الشمسية الداخلة، السحب، الأمطار والبخر، تيارات المحيط، التلج البحري، الرياح، وطبقات الـ model).",
      "سلايد 32 مكتوب في الـ footer بتاعه 1.37؛ بس هو واقع بين 1.31 و 1.33، يبقى هو سلايد 1.32. ‡",
      "الـ <b>model</b> هو <b>تمثيل (representation) لـ system بهدف إننا ندرس الـ system ده</b> (سلايد 34).",
      "الطريقة: بناخد في الاعتبار <b>بس الجوانب</b> اللي بتأثر على المشكلة اللي بندرسها (سلايد 34).",
      "المشاكل: <b>مستوى التفاصيل (granularity of details)</b>، يعني نحط تفاصيل قد إيه؛ وإن <b>الـ models مش unique</b> (سلايد 34).",
      "الرسمة (سلايد 34): سحابة مكتوب عليها <b>System</b> داخل لها سهم Input وطالع منها سهم Output؛ وسهم كبير لتحت لصندوق <b>Model</b> الـ input بتاعه <b>I(t)</b> والـ output بتاعه <b>O(t)</b>.",
      "الـ lecture notes بتعرّف الـ model كمان إنه <b>تبسيط للواقع (simplification of reality)</b>، يعني بنشيل منه التفاصيل اللي ملهاش لازمة. ‡ (الـ lecture notes)",
      "الـ <b>Physical model</b>: هو <b>prototype</b> (نموذج مجسّم) لـ system بهدف دراسته. الرسمة (سلايد 35): إيد ماسكة molecular model بلاستيك (protein).",
      "الـ lecture notes: الـ physical model هو نسخة مادية أصغر أو أكبر من حاجة، زي الماكيت المعماري لمبنى (architectural model)؛ والـ physical models بتخليك <b>تتخيل وتشوف (visualization)</b> الحاجة اللي الـ model بيمثلها. ‡ (الـ lecture notes)",
      "الـ <b>Mathematical model</b>: بيستخدم <b>رموز ومعادلات رياضية (symbolic notation and mathematical equations)</b> عشان يمثل الـ system. الرسمة (سلايد 36): بلوك differential equations (الـ voltages <bdi>v_q, v_d</bdi> والـ torque <bdi>T_e</bdi> وسرعة الـ rotor <bdi>ω_r</bdi>) بيعمل model لمكنة كهربا.",
      "إزاي ندرس system (سلايد 37، شجرة): فوق <b><bdi>System: How to study?</bdi></b> وبيتفرع لـ (1) <b>Experiment with the actual system</b> (تجرّب على الـ system الحقيقي)، أو (2) <b>Experiment with a model of the system</b> (تجرّب على model للـ system). والـ model يا إما <b>Mathematical model</b> يا إما <b>Physical model</b>. والـ mathematical model بندرسه يا إما بـ <b>Analytical model</b> يا إما بالـ <b>Simulation</b>.",
      "الـ lecture notes بتقسم الـ mathematical models لـ <b>static</b> (العلاقات بين الـ attributes لما الـ system يبقى في حالة اتزان (equilibrium)، زي market model بيوازن بين العرض والطلب، والاتنين معتمدين على السعر) و <b>dynamic</b> (التغير في الـ attributes بيتحسب كـ function في الوقت، يا إما بحل تحليلي (analytical solution) يا إما بحسابات عددية (numerical computation)). ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-sysmodel": "من الـ system للـ model بتاعه، بـ input اسمه I(t) و output اسمه O(t)",
      "ms-howstudy": "إزاي ندرس system: شجرة slide 37"
     }
    },
    {
     "h": "أمثلة على models لـ systems (سلايد 38 لـ 45)",
     "pts": [
      "الـ <b>Mobility</b> (سلايد 38): الـ model هو:<span class=\"ltr\">d = v · t</span>الافتراض: سرعة v ثابتة طول الوقت t كله. الميزة: formulas بسيطة ومفهومة بالبديهة. العيب: <b>نادرًا ما بيبقى صح (seldom valid)</b> لرحلة كاملة (بني آدم، عربية، طيارات). الرسمة: عربية على طريق بين علامتين.",
      "الـ <b>Radio propagation</b>، الـ <bdi>Free-Space</bdi> model (سلايد 39): الـ formula تحت. الافتراضات: فيه <b>line of sight (LOS)</b> مباشر بين الطرفين اللي بيتواصلوا؛ و<b>مفيش عوائق (obstacles)</b>. الميزة: formulas بسيطة asymptotic للمساحات المفتوحة. العيب: مش مفيد قوي في البيئات <b>الـ indoor والمدن</b>.",
      "الرسمة (سلايد 39): فيه 2 antennas بينهم مسافة d؛ وجراف لقوة الإشارة المستقبلة بالـ dBm (من -25، إشارة قوية، لحد -60، إشارة ضعيفة) قصاد المسافة من الـ access point بالمتر (من 0 لـ 25). المنحنى النظري الأحمر بينزل بنعومة؛ والـ mean signal strength المقاس (الأزرق) بيعمل زجزاج حواليه، وده بيوضح إن الـ model بيقرّب الواقع بس.",
      "الـ <b><bdi>ISO/OSI</bdi> network model</b> (سلايد 40): الـ Host A والـ Host B كل واحد فيهم عنده 7 layers:<span class=\"ltr\">Application, Presentation, Session, Transport, Network, Data Link, Physical</span>وفوقهم application process؛ أما الـ Router A والـ Router B فعندهم بس الـ Network والـ Data Link والـ Physical. الـ layers المتقابلة بتتكلم مع بعض عن طريق الـ protocols بتاعة الـ Application والـ Presentation والـ Session والـ Transport؛ والـ routers بتستخدم internal protocols.",
      "الـ <b><bdi>TCP/IP</bdi> reference model</b> (سلايد 41) مقارنةً بالـ <bdi>ISO/OSI</bdi>:<span class=\"ltr\">Application ↔ Application<br>Presentation, Session ↔ (don't exist)<br>Transport ↔ Transport<br>Network ↔ Internet layer<br>Data Link + Physical ↔ Host-to-Network layer</span>يعني الـ Presentation والـ Session <b>مش موجودين</b> في الـ <bdi>TCP/IP</bdi>، والـ Network بيقابلها الـ <b>Internet layer</b>، والـ Data Link مع الـ Physical بيقابلهم الـ <b><bdi>Host-to-Network</bdi> layer</b>.",
      "الـ <b><bdi>Six-level</bdi> computer model</b> (سلايد 42)، من فوق لتحت:<span class=\"ltr\">Level 5 Problem-oriented language level (translation: compiler)<br>Level 4 Assembly language level (translation: assembler)<br>Level 3 Operating system machine level (partial interpretation: operating system)<br>Level 2 ISA (Instruction Set Architecture) level (interpretation: microprogram, or direct execution)<br>Level 1 Microarchitecture level (hardware)<br>Level 0 Digital logic level</span>وبين القوسين الطريقة اللي كل level بيتنفذ بيها على اللي تحته (translation أو interpretation أو hardware).",
      "الـ <b>Communication link</b> (سلايد 43): الـ packet في الـ network بتعاني من أنواع delay مختلفة:<br>• الـ <b>Processing</b> في الـ node: فحص الـ header بتاع الـ packet<br>• الـ <b>Queueing</b>: الـ packet مستنية دورها في الـ transmission<br>• الـ <b>Transmission</b>: الوقت اللي بياخده حط كل الـ bits بتاعة الـ packet على الـ medium<br>• الـ <b>Propagation</b>: وقت انتقالها على الـ medium من A لـ B<br>الرسمة: 2 كمبيوتر بيبعتوا packets لـ router A، وهناك بيقفوا في queue، وبعدين بيمشوا على link لـ router B؛ والـ delays مكتوب عليها nodal processing و queueing و transmission و propagation.",
      "الـ <b>Cellular system</b> (سلايد 44): ده model لـ <bdi>multi-cellular</bdi> network system، ينفع للـ cellular networks والـ WLAN والـ WIMAX والـ wireless mesh networks. الرسمة: خلايا سداسية مرسومة فوق خريطة شوارع.",
      "الـ <b>User behavior</b> (سلايد 45): سلوك الـ user وسلوك الـ application، بيتعملهم model على <b>مستوى الـ user ومستوى الـ object ومستوى الـ packet</b>. الرسمة: 3 خطوط زمن؛ actions قصيرة للـ user أو الـ application، كل واحدة بتطلّع object transfer أطول، والـ transfer ده بيتقسم لكذا packet."
     ],
     "figH": {
      "ms-mobility": "جرّب الـ mobility model اللي بيقول إن المسافة تساوي السرعة في الزمن",
      "ms-freespace": "الـ free-space model: الـ path loss مع المسافة، وليه العوائق بتبوّظه",
      "ms-osi": "الـ ISO/OSI: الداتا بتنزل في Host A وتعدي على 2 routers وتطلع في Host B",
      "ms-tcpip": "الـ layers بتاعة الـ TCP/IP قصاد الـ layers بتاعة الـ ISO/OSI",
      "ms-sixlevel": "الـ six-level computer model مستوى مستوى",
      "ms-linkdelay": "الأربع أنواع تأخير اللي الـ packet بتقابلها على الـ link",
      "ms-cells": "الـ multi-cellular network model",
      "ms-userlevels": "سلوك الـ user على مستوى الـ user والـ object والـ packet"
     }
    },
    {
     "h": "مبادئ الـ modeling والـ model الكويس (سلايد 46 و 47)",
     "pts": [
      "مبادئ الـ modeling (سلايد 46، <bdi>Pritsker, Henriksen, Fishwick and Clark, Winter Simulation Conference 1991</bdi>):<br>(1) إنك تتصور (conceptualize) model محتاج <b>معرفة بالـ system</b> وحكم هندسي (engineering judgment) وأدوات لبناء الـ model.<br>(2) سر إنك تبقى modeler كويس هو إنك تعرف إمتى محتاج، وتبقى قادر، إنك <b>تعيد بناء الـ model (remodel)</b>.<br>(3) عملية الـ modeling <b>تطورية (evolutionary)</b> لأن عملية الـ modeling نفسها بتكشف معلومات مهمة حتة حتة.<br>(4) الـ <b>problem statement</b> هو العنصر الأساسي اللي بيتحكم في حل المشاكل المعتمد على الـ models.<br>(5) في الـ modeling بتاع الـ <b>combined systems</b>، الجوانب الـ <b>continuous</b> لازم تتاخد في الاعتبار <b>الأول</b>؛ وبعدين تتعمل الجوانب الـ <b>discrete</b>.<br>(6) الـ model بيتقيّم حسب <b>فايدته (usefulness)</b>؛ ومن منظور مطلق الـ model لا هو كويس ولا وحش، ولا هو محايد.<br>(7) <b>الهدف</b> من الـ modeling هو <b>المعرفة والفهم</b>، مش الـ models نفسها.<br>(8) اعرف إمتى تعمل model <b>\"top-down\"</b> وإمتى تعمل <b>\"bottom-up\"</b>.<br>(9) مهم تتعلم تقنيات الـ modeling، بس الأهم إنك تتعلم توازن <b>الـ tradeoffs</b> بين التقنيات البديلة.",
      "إيه هو الـ model الكويس؟ (سلايد 47) وليه 7 صفات:<br>• البساطة (Simplicity)<br>• المصداقية (Credibility)<br>• الكفاءة (Efficiency)<br>• الإتاحة (Availability)<br>• متعمله verify (Verified)<br>• جودة الكود (Code quality)<br>• التوثيق (Documentation)"
     ]
    },
    {
     "h": "الـ Simulation models والـ <bdi>discrete-event simulation</bdi> (سلايد 48 لـ 51)",
     "pts": [
      "الـ <b>simulation model</b> هو نوع معين من الـ <b>mathematical model</b> لـ system (سلايد 48).",
      "الـ lecture notes بتعرّف الـ simulation model كمان إنه <b>تمثيل رياضي للخصائص الأساسية</b> لـ system أو موقف في الواقع، وممكن يتستخدم عشان <b>يتنبأ بالسلوك المستقبلي</b> تحت ظروف مختلفة كتير. وإنك تبني واحد معناه إنك تحدد الـ system اللي هتحلله، وتحدد الـ variables المرتبطة بيه، وتوصف العلاقات بينها بأدق شكل ممكن. ‡ (الـ lecture notes)",
      "أنواع الـ simulation models (سلايد 48):<br>• الـ <b>Static</b>: بيمثل الـ system في <b>لحظة معينة</b>.<br>• الـ <b>Dynamic</b>: بيمثل الـ system <b>على مدار فترة زمنية</b>.<br>• الـ <b>Deterministic</b>: هي الـ simulation models <b>من غير</b> random variables.<br>• الـ <b>Stochastic</b>: هي الـ simulation models <b>فيها</b> random variables.<br>• الـ <b>Discrete</b>: التغييرات في الـ system state بتحصل بس عند <b>نقط زمنية منفصلة</b>.<br>• الـ <b>Continuous</b>: التغييرات في الـ system state بتحصل <b>بشكل مستمر</b>.",
      "تفاصيل الـ lecture notes: الـ deterministic models ليها مجموعة inputs معروفة بتدي مجموعة outputs <b>وحيدة (unique)</b> (مثال: المحاضرات اللي بتتعمل في الكلية في وقت معين)؛ والـ stochastic models فيها input عشوائي واحد أو أكتر بيدي <b>outputs عشوائية</b> (مثال: وصول الزباين للبنك). والـ notes بتسمي الـ static simulation model بـ <b>Monte Carlo simulation</b>. ‡ (الـ lecture notes)",
      "المقولة في سلايد 49 (لـ Mesut Güneş): «في الكورس ده هنركز على الـ simulation models اللي هي <b>discrete و dynamic و stochastic</b>.»",
      "الرسمة (سلايد 50، شجرة): الـ <b>Models</b> بتتقسم لـ <b>static</b> و <b>dynamic</b>. الـ Static بيتقسم لـ deterministic و stochastic، وده معناه:<span class=\"ltr\"><b>static + stochastic = Monte Carlo Simulation</b></span>والـ Dynamic بيتقسم لـ deterministic و stochastic؛ والـ dynamic stochastic بيتقسم لـ continuous و discrete، وده معناه:<span class=\"ltr\"><b>dynamic + stochastic + discrete = Discrete-event Simulation</b></span>",
      "الرسمة (الـ lecture notes Fig 1.4): الـ Models بتتقسم لـ Physical و Mathematical؛ والـ Mathematical لـ Static و Dynamic؛ والـ Static لـ Numerical و Analytical؛ والـ Dynamic بيروح لـ Numerical وبعدين لـ <b>Simulation</b>، واللي بعد كده بتتوصف إنها static أو dynamic، و deterministic أو stochastic، و discrete أو continuous. ‡ (الـ lecture notes)",
      "الـ <b><bdi>Discrete-event simulation</bdi></b> (سلايد 51):<br>• الـ system state بيتغير بس عند مجموعة نقط منفصلة في الزمن.<br>• الـ simulation model بيتحلل بـ <b>numerical methods</b>.<br>• الـ numerical methods بتستخدم computational procedures عشان «تحل» الـ mathematical models.<br>• الـ model بيتعمله <b>\"run\"</b> أكتر ما بيتعمله <b>\"solve\"</b>."
     ],
     "figH": {
      "ms-taxonomy": "اختار نوع الـ model وشوف مكان الـ Monte Carlo والـ discrete-event simulation",
      "ms-fig14": "الـ Fig 1.4 في الـ lecture notes: أنواع الـ models"
     }
    },
    {
     "h": "الـ Performance metrics (سلايد 52 لـ 57)",
     "pts": [
      "اختيار الـ performance metrics (سلايد 53): فيه <b>request for service i</b> بيدخل الـ <b>system</b>. وليه 3 نتايج:<br>(1) <b>اتعمل صح (Done correctly)</b>: الـ metrics هي <b>Time</b> (الـ response time) و<b>Rate</b> (الـ throughput) و<b>Resources</b> (الـ utilization).<br>(2) <b>اتعمل غلط (Done incorrectly)</b>: بيطلع <b>Error j</b>، والـ metrics هي <b>Probability</b> بتاعة الـ error و<b>Time between errors</b>.<br>(3) <b>مينفعش يتعمل (Cannot do)</b>: بيحصل <b>Event k</b>، والـ metrics هي <b>Duration of the event</b> و<b>Time between events</b>.",
      "مثال (سلايد 54): الـ system هو web server بيقدّم صفحات ويب؛ والـ request هو <bdi>\"Get page name.html\"</bdi>. القيم في الجدول تحت.",
      "الـ <b>Response time</b> (سلايد 55): الوقت بين <b>طلب الـ user</b> و<b>رد الـ system</b>. الرسمة: خط زمن عليه أسهم عند <bdi>\"User request\"</bdi> و<bdi>\"System response\"</bdi> والمسافة بينهم مكتوب عليها Response time.",
      "خط الزمن المفصّل (سلايد 56):<span class=\"ltr\">user starts request → user finishes request → system starts execution → system starts response → system completes response → user starts next request</span>يعني: الـ user يبدأ الطلب، يخلّصه، الـ system يبدأ التنفيذ، يبدأ الرد، يكمّل الرد، وبعدين الـ user يبدأ الطلب اللي بعده.",
      "من رسمة سلايد 56:<br>• الـ <b>Reaction time</b> = من <b>الـ user يخلّص الطلب</b> لحد <b>الـ system يبدأ التنفيذ</b>.<br>• الـ <b>Response time</b> (التعريف الأول) = من <b>الـ user يخلّص الطلب</b> لحد <b>الـ system يبدأ الرد</b>.<br>• الـ <b>Response time</b> (التعريف التاني) = من <b>الـ user يخلّص الطلب</b> لحد <b>الـ system يكمّل الرد</b>.<br>• الـ <b>Think time</b> = من <b>الـ system يكمّل الرد</b> لحد <b>الـ user يبدأ الطلب اللي بعده</b>.",
      "تصنيف الـ performance metrics حسب الـ utility (سلايد 57)، وفيه 3 جرافات utility قصاد الـ metric:<br>• الـ <b>Lower is better</b>: الـ utility بتقل كل ما الـ metric يزيد (زي الـ response time).<br>• الـ <b>Higher is better</b>: الـ utility بتزيد كل ما الـ metric يزيد (زي الـ throughput).<br>• الـ <b>Nominal is best</b>: الـ utility شكلها تل، أعلى حاجة عند قيمة في النص (زي الـ utilization: لو قليلة أوي بتهدر resources، ولو عالية أوي بتعمل delays)."
     ],
     "figH": {
      "ms-metrics": "نتايج الـ request والـ metrics بتاعة كل واحدة، بقيم الـ web server",
      "ms-resptime": "الـ reaction time والـ response time والـ think time على خط الوقت",
      "ms-utility": "الأقل أحسن، والأعلى أحسن، والقيمة اللي في النص أحسن"
     }
    },
    {
     "h": "خطوات الـ simulation study (سلايد 58 لـ 61)",
     "pts": [
      "الـ 12 خطوة (سلايد 59):<br>(1) الـ <b>Problem formulation</b>: افهم المشكلة كويس؛ وأعد صياغتها.<br>(2) الـ <b>Setting of objectives and overall project plan</b>: إيه الأسئلة اللي لازم تتجاوب؟ هل الـ simulation مناسبة؟ التكاليف؟<br>(3) الـ <b>Model conceptualization</b>: مفيش دليل عام؛ فيه أدوات modeling في الأبحاث، زي الـ UML.<br>(4) الـ <b>Data collection</b>: هنجيب الـ data إزاي؟ هل الـ random distributions مناسبة؟<br>(5) الـ <b>Model translation</b>: برنامج بيشتغل على الكمبيوتر.<br>(6) الـ <b>Verified?</b> هل البرنامج بيعمل اللي الـ model بيوصفه؟<br>(7) الـ <b>Validated?</b> هل النتايج مطابقة للواقع؟ محتاج calibration؟ ولو مفيش system حقيقي، صعب تعمل validate.<br>(8) الـ <b>Experimental design</b>: أنهي alternatives نشغّلها؟ أنهي parameters نغيّرها؟<br>(9) الـ <b>Production runs and analysis</b><br>(10) الـ <b>More runs?</b> (محتاجين runs تانية؟)<br>(11) الـ <b>Documentation and reporting</b>: الـ program documentation (البرنامج شغال إزاي) والـ progress documentation (التسلسل الزمني للشغل).<br>(12) الـ <b>Implementation</b>",
      "الخطوة 6 في سلايد 59 مكتوبة <bdi>\"Does the program that, what the model describes?\"</bdi>؛ والمقصود <bdi>\"Does the program <b>do</b> what the model describes?\"</bdi> (ودي الصياغة اللي في الـ revision sheet). ورقم الـ footer في سلايد 59 مكتوب 1.71 والصح 1.59. ‡",
      "الرسمة في سلايد 59 هي flowchart (وهي Fig 1.5 في الـ notes):<span class=\"ltr\">1 → 2 → (3 model conceptualization, 4 data collection, side by side) → 5 model translation → 6 Verified? (No → back to 5) → 7 Validated? (No → back to 3 and 4) → Yes → 8 experimental design → 9 production runs and analysis → 10 More runs? (Yes → back to 9 or 8) → No → 11 documentation and reporting → 12 implementation</span>يعني لو الـ verification فشل بترجع للخطوة 5، ولو الـ validation فشل بترجع للخطوتين 3 و 4، ولو محتاج runs تانية بترجع لـ 9 أو 8.",
      "الـ 4 phases (سلايد 60):<br>• الـ <b><bdi>Phase 1: Discovery and Orientation</bdi></b>: الخطوات من 1 لـ 2.<br>• الـ <b><bdi>Phase 2: Model building and data collection</bdi></b>: الخطوات من 3 لـ 7.<br>• الـ <b><bdi>Phase 3: Run the model</bdi></b>: الخطوات من 8 لـ 10.<br>• الـ <b><bdi>Phase 4: Implementation</bdi></b>: الخطوات 11 و 12.",
      "<b>أهم خطوة على الإطلاق هي الـ validation</b>. لو الـ model مش valid، النتايج ممكن توصّلك لـ <b>قرارات خطيرة وغالية</b> (سلايد 60).",
      "شرح الـ lecture notes: الـ <b>problem formulation</b> ممكن يكتبها الـ analyst أو الـ client، والاتنين لازم يتفقوا عليها؛ والـ <b>setting objectives</b> زي «تحضير proposal» (الأفراد، عدد الأيام، المراحل، التكلفة)؛ والـ <b>model conceptualization</b> لازم يبدأ بسيط ويكبر (مثلًا الـ arrivals والـ queues والـ servers الأول، وبعدين الأعطال والـ shift schedules، وبعدين الـ material handling، وبعدين الـ special features)؛ والـ <b>data collection</b> بياخد جزء كبير من الوقت ولازم يبدأ بدري. ‡ (الـ lecture notes)",
      "الـ <b>Verification</b> بيبقى على الـ operational model (اللي على الكمبيوتر): هل الـ input parameters والـ logical structure متمثلين صح في البرنامج؟ أما الـ <b>Validation</b> فبيحدد إن الـ model تمثيل دقيق للـ system الحقيقي، عن طريق الـ <b>calibration</b>: مقارنة متكررة (iterative) بين الـ model وسلوك الـ system الفعلي لحد ما الدقة تبقى مقبولة. ‡ (الـ lecture notes)",
      "تفاصيل تانية من الـ lecture notes عن الخطوات:<br>• الـ <b>Setting objectives</b>: الـ project plan لازم يبقى فيه وصف للـ alternative systems وطريقة لتقييم فعاليتها.<br>• الـ <b>Model conceptualization</b>: الـ model المعقد زيادة عن اللزوم بيزوّد التكلفة والوقت من غير ما يحسّن جودة الـ output؛ وإنك تخلي الـ client مشارك بيحسّن الـ model وبيزوّد ثقة الـ client فيه.<br>• الـ <b>Model translation</b>: الـ conceptual model بيتكتب بشكل الكمبيوتر يفهمه، يعني <b>operational model</b>، باستخدام simulation language مناسبة. ‡ (الـ lecture notes)",
      "الـ <b>Experimental design</b> بيحدد لكل scenario طول الـ run، و<b>عدد الـ runs (replications)</b>، وطول الـ <b>initialization period</b>. والـ <b>Progress reports</b> هي التاريخ المكتوب للمشروع (التسلسل الزمني للشغل والقرارات). ‡ (الـ lecture notes)",
      "تفاصيل تانية من الـ lecture notes (الخطوات من 9 لـ 12):<br>• الـ <b>Production runs and analysis</b> بتقدّر الـ measures of performance للـ system designs اللي بنعملها simulation.<br>• الـ <b>More runs?</b> الـ analyst بيقرر هل محتاج runs أو experiments زيادة.<br>• الـ <b>Program documentation</b> لازمة عشان البرنامج يتعاد استخدامه أو يتعدّل من نفس الـ analysts أو غيرهم، وعشان الـ client يثق فيه.<br>• الـ <b>Implementation</b> فرصتها في النجاح أكبر لو الـ client كان مشارك طول الوقت وكل الخطوات اتمشى عليها بدقة. ‡ (الـ lecture notes)",
      "الخلاصة (سلايد 61): بدأنا الكورس بأمثلة؛ عرّفنا الـ simulation كفكرة؛ اتكلمنا عن الـ simulation مفيدة في إيه؛ عرّفنا مصطلحات عامة؛ عرّفنا الـ <bdi>discrete-event simulation</bdi>؛ اتكلمنا عن خطوات الـ simulation study؛ والـ performance metrics."
     ],
     "figH": {
      "ms-steps": "الـ 12 خطوة بتوع الـ simulation study خطوة خطوة ومعاهم الـ loops"
     }
    },
    {
     "h": "أدوات الـ Simulation (سلايدات الـ Simulation Tools من 1 لـ 10)",
     "pts": [
      "لو فرضنا إن الـ simulation هي الوسيلة المناسبة، فيه <b>3 بدائل</b> (سلايد 2 في الـ tools):<br>(1) تبني الـ model بـ <b>General Purpose Language</b>.<br>(2) تبني الـ model بـ <b>General Simulation Language</b>.<br>(3) تستخدم <b>Special Purpose Simulation Package</b>.",
      "الـ General purpose languages (سلايد 3 في الـ tools). المميزات: تكلفة software إضافية قليلة أو مفيش؛ متاحة في كل حتة (portable)؛ مش محتاج تدريب إضافي (كله عارف اللغة الفلانية). العيوب: كل model بيبدأ من الصفر؛ كود قليل جدًا ينفع يتعاد استخدامه؛ الـ development cycle طويل لكل model؛ ومرحلة الـ verification صعبة.",
      "الـ General purpose languages اللي بتتستخدم في الـ simulation (سلايد 4 في الـ tools):<br>• الـ <b>FORTRAN</b>: غالبًا اتعمل بيها models أكتر من أي لغة تانية.<br>• الـ <b>PASCAL</b>: مش منتشرة زي الـ FORTRAN.<br>• الـ <b>MODULA</b>: فيها تحسينات كتير عن الـ PASCAL.<br>• الـ <b>ADA</b>: محاولة من الـ Department of Defense لعمل standardization.<br>• الـ <b><bdi>C, C++</bdi></b>: لغة برمجة <bdi>object-oriented</bdi>.",
      "الـ General simulation languages (سلايد 5 في الـ tools). المميزات: فيها features متوحدة (standardized) بتحتاجها كتير في الـ modeling؛ الـ development cycle أقصر لكل model؛ مساعدة كبيرة في الـ model verification؛ وكود سهل القراية جدًا. العيوب: تكلفة software أعلى (في الأول)؛ محتاج تدريب إضافي؛ والـ portability محدودة.",
      "الـ General purpose simulation languages (سلايد 6 لـ 8 في الـ tools): شوف الجدول.",
      "الـ <bdi>Special-purpose</bdi> simulation packages (سلايد 9 في الـ tools). المميزات: development سريع جدًا للـ models المعقدة؛ learning cycle قصير؛ مفيش برمجة، فالأخطاء في الاستخدام قليلة جدًا. العيوب: الـ software غالي؛ مجال الاستخدام (scope) محدود؛ والـ flexibility محدودة (ممكن ميناسبش الـ application بتاعتك بالظبط).",
      "الـ Special purpose packages (سلايد 10 في الـ tools):<br>• الـ <b>NETWORK II.5</b>: ده simulator للـ computer systems.<br>• الـ <b>OPNET</b>: ده simulator للـ communication networks، ومنها الـ wireless networks.<br>• الـ <b>COMNET III</b>: ده simulator للـ communications networks.<br>• الـ <b>SIMFACTORY</b>: ده simulator لعمليات التصنيع (manufacturing operations)."
     ]
    }
   ],
   "cards": [
    "الـ <b>Measurements</b> (على نسخة موجودة من الـ system)، والـ <b>Analysis</b> (formulas رياضية)، والـ <b>Simulation</b> (computer program بيعمل implement لـ model وبنشغّله ونعمل بيه experiments).",
    "هي <b>تقليد (imitation)</b> لطريقة شغل system حقيقي <b>على مدار الوقت (over time)</b>.",
    "تولّد <b>artificial history</b> (تاريخ صناعي) للـ system، وبعدين تطلّع منه <b>inferences</b> (استنتاجات) عن خصائص الـ system.",
    "مساعدة في التفكير (Aid to thought)، والتواصل (Communication)، والتدريب والتعليم (<bdi>Training/Education</bdi>)، والتجريب (Experimentation)، والتنبؤ (Predicting)؛ وكمان الـ Entertainment: الـ video games والـ serious games، ودي تطبيق جديد.",
    "مجموعة objects مربوطة ببعض في تفاعل أو اعتماد متبادل منتظم عشان تحقق هدف معين.",
    "كل حاجة برّه الـ system بس بتأثر عليه. والحدود (boundary) بينهم بتعتمد على هدف الدراسة.",
    "الـ Entity: هي الـ object اللي يهمنا في الـ system. والـ Attribute: خاصية للـ entity.",
    "الـ Activity: فترة زمنية طولها محدد. والـ Event: حاجة بتحصل في لحظة وممكن تغيّر الـ state بتاع الـ system.",
    "مجموعة الـ variables اللي محتاجها عشان توصف الـ system في أي لحظة.",
    "الـ Endogenous: هي الـ activities والـ events اللي بتحصل جوه الـ system. والـ Exogenous: هي الـ activities والـ events اللي في الـ environment (برّه) وبتأثر على الـ system.",
    "الـ Open: فيه exogenous activity. والـ Closed: مفيش exogenous activity (من الـ lecture notes).",
    "الـ Discrete: الـ state variables بتتغير بس عند مجموعة نقط منفصلة في الزمن (البنك، محل الهدايا، الـ router). والـ Continuous: بتتغير بشكل مستمر مع الوقت (ارتفاع المية ورا السد، درجة الحرارة).",
    "تمثيل لـ system بهدف دراسة الـ system ده. بناخد بس الجوانب اللي بتأثر على المشكلة؛ والـ models مش unique.",
    "الـ Physical: نموذج (prototype) للـ system بهدف دراسته. والـ Mathematical: بيستخدم رموز ومعادلات رياضية عشان يمثل الـ system.",
    "نوع معين من الـ mathematical model بتاع system.",
    "الـ Static: بيمثل الـ system في لحظة معينة. والـ Dynamic: بيمثل الـ system على مدار فترة زمنية.",
    "الـ Deterministic: من غير random variables. والـ Stochastic: فيه random variables.",
    "القاعدة:<span class=\"ltr\">Monte Carlo = static + stochastic<br>Discrete-event = dynamic + stochastic + discrete</span>والكورس بيركز على الـ models اللي هي discrete و dynamic و stochastic.",
    "البساطة (Simplicity)، المصداقية (Credibility)، الكفاءة (Efficiency)، الإتاحة (Availability)، متعمله verify (Verified)، جودة الكود (Code quality)، التوثيق (Documentation).",
    "اتعمل صح: الـ response time والـ throughput والـ utilization. اتعمل غلط (error): الـ probability والـ time between errors. مينفعش يتعمل (event): الـ duration of the event والـ time between events.",
    "الـ Reaction: من الـ user يخلّص الطلب لحد الـ system يبدأ التنفيذ. والـ Think: من الـ system يكمّل الرد لحد الـ user يبدأ الطلب اللي بعده.",
    "الـ Lower is better (زي الـ response time)، والـ Higher is better (زي الـ throughput)، والـ Nominal is best (أحسن حاجة عند قيمة في النص).",
    "المراحل: (1) الـ Discovery and orientation (الخطوات 1 و 2)؛ (2) الـ Model building and data collection (من 3 لـ 7)؛ (3) الـ Run the model (من 8 لـ 10)؛ (4) الـ Implementation (11 و 12). وأهم خطوة هي الـ validation.",
    "الـ Verified: هل البرنامج بيعمل اللي الـ model بيوصفه؟ والـ Validated: هل النتايج مطابقة للواقع (calibration)؟",
    "البدائل التلاتة:<br>(1) الـ general purpose language، زي:<span class=\"ltr\">FORTRAN, PASCAL, MODULA, ADA, C/C++</span>(2) الـ general simulation language، زي:<span class=\"ltr\">GPSS, SIMSCRIPT II.5, MODSIM III, SIMULA, SLAM, CSIM</span>(3) الـ special purpose package، زي:<span class=\"ltr\">NETWORK II.5, OPNET, COMNET III, SIMFACTORY</span>"
   ],
   "qa": [
    "(1) الـ <b>Measurements</b>: تستخدم نسخة موجودة من الـ system وتقيس عليها الـ performance. العيب: مستحيلة لو الـ system مش موجود أو مش متاح، والتغييرات ممكن تبقى غالية جدًا أو بتاخد وقت كبير.<br>(2) الـ <b>Analysis</b>: تعمل mathematical abstraction وتطلّع formulas بتوصف الـ performance. العيب: حلول كويسة بس تنفع بس مع الـ simple systems؛ الـ systems الحقيقية (مصنع، كمبيوتر، network) معقدة جدًا.<br>(3) الـ <b>Simulation</b>: تكتب computer program بيعمل implement لـ model للـ system وتشغّل experiments. العيب: لازم تتأكد إن الـ model والـ implementation والـ analysis مش بيطلّعوا مجرد عشوائية، وكمان مشكلة الـ <bdi>Garbage-In Garbage-Out (GIGO)</bdi>.",
    "الـ simulation هي تقليد لطريقة شغل system حقيقي على مدار الوقت. الطريقة: تولّد <b>artificial history</b> للـ system وتطلّع <b>inferences</b> من التاريخ ده عن خصائص الـ system. وبتتعمل عن طريق إنك تبني <b>model</b>، والـ model بيتكون من entities (objects).",
    "الـ system الـ <b>discrete</b> الـ state variables بتاعته بتتغير بس عند مجموعة نقط منفصلة في الزمن، زي البنك (عدد الزباين المستنيين بيتغير بس لما حد يوصل أو يخلّص خدمته)، ومحل الهدايا، والـ router، والـ host، والـ jobs في الـ queue. والجراف بتاعه step function.<br>أما الـ system الـ <b>continuous</b> فالـ state variables بتاعته بتتغير بشكل مستمر مع الوقت، زي ارتفاع المية ورا السد ودرجة الحرارة. والجراف بتاعه منحنى ناعم (smooth curve).",
    "الـ model هو تمثيل لـ system بهدف دراسته. الـ <b>physical model</b> هو prototype للـ system؛ والـ <b>mathematical model</b> بيستخدم رموز ومعادلات، وبندرسه يا إما analytically يا إما بالـ simulation. والـ simulation model هو نوع معين من الـ mathematical model، وبيتصنف كده: static (لحظة واحدة) أو dynamic (على مدار فترة زمنية)؛ deterministic (مفيش random variables) أو stochastic (فيه random variables)؛ discrete (الـ state بيتغير عند نقط زمنية منفصلة) أو continuous. وفي الشجرة (سلايد 50):<span class=\"ltr\">static + stochastic = <b>Monte Carlo simulation</b><br>dynamic + stochastic + discrete = <b>discrete-event simulation</b></span>والـ <bdi>discrete-event simulation</bdi> هي اللي الكورس بيركز عليها.",
    "الـ request بيروح للـ system وليه 3 نتايج ممكنة:<br>(1) <b>اتعمل صح</b>: بنقيس الـ time (الـ response time) والـ rate (الـ throughput) والـ resources (الـ utilization). القيم:<span class=\"ltr\">response time = 300 msec = 0.3 sec<br>throughput = 8420 queries/min = 12.5 MB/sec<br>utilization = 48.4% load</span>(2) <b>اتعمل غلط</b> (الـ error هنا «page not found»): بنقيس الـ probability والـ time between errors:<span class=\"ltr\">p = 0.3<br>time between errors = 30 min = 1800 sec</span>(3) <b>مينفعش يتعمل</b> (الـ event هنا «server down»): بنقيس الـ duration of the event والـ time between events:<span class=\"ltr\">duration of the event = 1 hour = 3600 sec<br>time between events = 1 day = 86400 sec</span>",
    "خط الزمن:<span class=\"ltr\">user starts request → user finishes request → system starts execution → system starts response → system completes response → user starts next request</span>الـ <b>Reaction time</b> = من الـ user يخلّص الطلب (user finishes request) لحد الـ system يبدأ التنفيذ (system starts execution).<br>الـ <b>Response time</b> = من الـ user يخلّص الطلب لحد الـ system يبدأ الرد (system starts response)، أو في التعريف التاني لحد الـ system يكمّل الرد (system completes response).<br>الـ <b>Think time</b> = من الـ system يكمّل الرد لحد الـ user يبدأ الطلب اللي بعده (user starts next request).",
    "الخطوات:<span class=\"ltr\">1 Problem formulation<br>2 Setting of objectives and overall project plan<br>3 Model conceptualization<br>4 Data collection<br>5 Model translation<br>6 Verified?<br>7 Validated?<br>8 Experimental design<br>9 Production runs and analysis<br>10 More runs?<br>11 Documentation and reporting<br>12 Implementation</span>والمراحل: الـ Phase 1 هي Discovery and orientation (الخطوات 1 و 2)؛ والـ Phase 2 هي Model building and data collection (من 3 لـ 7)؛ والـ Phase 3 هي Run the model (من 8 لـ 10)؛ والـ Phase 4 هي Implementation (11 و 12).<br>أهم خطوة هي الـ <b>validation</b>: لو الـ model مش valid، النتايج ممكن توصّل لقرارات خطيرة وغالية. ولو الـ verification فشل ترجع للـ model translation؛ ولو الـ validation فشل ترجع للـ conceptualization والـ data collection.",
    "الـ <b>General purpose language</b>:<span class=\"ltr\">FORTRAN, PASCAL, MODULA, ADA, C/C++</span>مميزاتها: تكلفة software إضافية قليلة أو مفيش، وportable، ومش محتاجة تدريب إضافي؛ بس كل model بيبدأ من الصفر، والكود اللي يتعاد استخدامه قليل، والـ development cycle طويل، والـ verification صعب.<br>الـ <b>General simulation language</b>:<span class=\"ltr\">GPSS, SIMSCRIPT II.5, MODSIM III, SIMULA, SLAM, CSIM</span>مميزاتها: فيها features متوحدة للـ modeling، والـ development cycle أقصر، ومساعدة كبيرة في الـ verification، وكود سهل القراية جدًا؛ بس التكلفة في الأول أعلى، ومحتاجة تدريب إضافي، والـ portability محدودة.<br>الـ <b>Special purpose package</b>:<span class=\"ltr\">NETWORK II.5, OPNET, COMNET III, SIMFACTORY</span>مميزاتها: development سريع جدًا للـ models المعقدة، والـ learning cycle قصير، ومفيش برمجة فأخطاء الاستخدام قليلة جدًا؛ بس غالية، والـ scope محدود، والـ flexibility محدودة.",
    "الـ deterministic simulation model مفيهوش <b>random variables</b> خالص: مجموعة inputs معروفة بتدي مجموعة outputs وحيدة (سلايد 48؛ الـ lecture notes 1.8.2).<br>أمثلة من الكورس:<br>(1) المحاضرات اللي بتتعمل في كلية في وقت معين (ده مثال الـ lecture notes على الـ deterministic model).<br>(2) الـ <b>pure pursuit problem</b> (case study): طيارة fighter بتشوف طيارة bomber بتاعة العدو وبتطير ناحيتها على طول عشان تلحقها وتدمرها؛ ومسار الـ bomber معروف، فأماكن الـ fighter بتتحسب خطوة بخطوة من غير أي random numbers.",
    "(a) الـ <b>Stochastic</b> (فيه random variables كـ inputs، فبيدي outputs عشوائية): وصول الزباين للبنك؛ أو queue (محل هدايا) فيه interarrival times و service times عشوائية.<br>(b) الـ <b>Continuous</b> (الـ state بيتغير بشكل مستمر مع الوقت): ارتفاع المية ورا السد؛ ودرجة الحرارة (سلايد 28).<br>(c) الـ <b>Discrete</b> (الـ state بيتغير بس عند نقط منفصلة في الزمن): عدد الزباين في بنك أو محل هدايا، أو router أو host، أو jobs في queue (سلايد 28).<br>(d) الـ <b>Static</b> (بيمثل الـ system في لحظة معينة؛ وبيتسمى كمان Monte Carlo simulation): حساب مساحة بالـ Monte Carlo (محاضرة الـ case studies)، أو market model في حالة اتزان والعرض فيه بيوازن الطلب (الـ lecture notes).<br>(e) الـ <b>Dynamic</b> (بيمثل الـ system على مدار فترة زمنية، وهو بيتغير مع الوقت): الـ queue بتاع بنك أو محل هدايا بنعمله simulation طول يوم شغل.",
    "الـ <b>model</b> هو تمثيل لـ system بهدف دراسة الـ system ده (سلايد 34). بناخد بس الجوانب اللي بتأثر على المشكلة اللي بندرسها، والـ models مش unique.<br>الـ models اللي في المحاضرة (سلايد 38 لـ 45):<br>(1) الـ <b>Mobility (movement)</b>: الـ model هو:<span class=\"ltr\">d = v × t</span>الافتراض: سرعة v ثابتة طول الوقت t. الميزة: formula بسيطة ومفهومة. العيب: نادرًا ما بيبقى صح لرحلة كاملة (بني آدم، عربية، طيارات).<br>(2) الـ <b>Radio propagation</b> (الـ <bdi>free-space</bdi> model): الـ path loss اللي هو <bdi>PL(d)</bdi> بالـ dB بيعتمد على الـ antenna gains والـ wavelength والمسافة d. الافتراضات: line of sight مباشر، ومفيش عوائق. الميزة: formula بسيطة للمساحات المفتوحة. العيب: مش مفيد جوه المباني أو في المدن.<br>(3) الـ network model بتاع الـ <bdi>ISO/OSI</bdi> اللي فيه 7 layers، والـ reference model بتاع الـ <bdi>TCP/IP</bdi>.<br>(4) الـ <b><bdi>Six-level</bdi> computer model</b> (من الـ digital logic لحد الـ <bdi>problem-oriented</bdi> language).<br>(5) الـ <b>Communication link</b>: الـ packet بتعاني من processing و queueing و transmission و propagation delays.<br>(6) الـ model بتاع الـ <b>Cellular system</b> (الـ cellular networks والـ WLAN والـ WiMAX والـ mesh) و(7) الـ model بتاع الـ <b>user behavior</b> (على مستوى الـ user والـ object والـ packet).",
    "الـ <b>system</b> هو مجموعة objects مربوطة ببعض في تفاعل أو اعتماد متبادل منتظم عشان تحقق هدف معين (سلايد 23)، زي مصنع عربيات (المكن والقطع والعمال بيشتغلوا مع بعض عشان يطلّعوا عربية) أو computer network.<br>الأنواع (سلايد 28):<br>(1) الـ <b>Discrete system</b>: الـ state variables بتتغير بس عند مجموعة نقط منفصلة في الزمن (البنك، محل الهدايا، الـ router، الـ jobs في الـ queue).<br>(2) الـ <b>Continuous system</b>: الـ state variables بتتغير بشكل مستمر مع الوقت (ارتفاع المية ورا السد، درجة الحرارة).<br>والـ lecture notes بتعرّف كمان الـ <b>open system</b> (فيه exogenous activity) والـ <b>closed system</b> (مفيهوش exogenous activity).",
    "الـ <b>Static</b>: بيمثل الـ system في لحظة معينة (وبيتسمى كمان Monte Carlo simulation).<br>الـ <b>Dynamic</b>: بيمثل الـ system على مدار فترة زمنية، يعني وهو بيتغير مع الوقت (سلايد 48).",
    "الـ <b>Discrete</b>: الـ system state بيتغير بس عند نقط منفصلة في الزمن.<br>الـ <b>Continuous</b>: الـ system state بيتغير بشكل مستمر مع الوقت (سلايد 48).",
    "الـ <b>Simulation</b> هي تقليد لطريقة شغل system حقيقي على مدار الوقت (سلايد 16). الطريقة: تولّد artificial history للـ system وتطلّع منه inferences عن خصائص الـ system.<br><b>المميزات</b> (سلايد 19):<br>(1) تقدر تستكشف الـ policies والـ procedures والـ decision rules والـ information flows من غير ما تلخبط الـ system الحقيقي.<br>(2) الـ hardware designs الجديدة والـ physical layouts والـ transportation systems والـ protocols والـ computer systems والـ network architectures ممكن تتختبر من غير ما تحجز resources.<br>(3) الفرضيات عن إزاي أو ليه ظاهرة بتحصل ممكن تتختبر من ناحية الـ feasibility.<br>(4) الوقت ممكن يتضغط أو يتمط (تبطئة أو تسريع).<br>(5) فهم للتفاعل بين الـ variables.<br>(6) فهم لأهمية الـ variables بالنسبة للـ performance.<br>(7) تقدر تعمل bottleneck analysis عشان تكتشف المشاكل.<br>(8) بتساعدك تفهم الـ system شغال فعلًا إزاي، مش الناس فاكرينه شغال إزاي.<br>(9) تقدر تجاوب على أسئلة <bdi>\"What if ...\"</bdi>.<br><b>العيوب</b> (سلايد 20):<br>(1) بناء الـ model محتاج تدريب؛ هو زي الفن.<br>(2) النتايج ممكن تبقى صعب تفسيرها: أغلب الـ outputs هي random variables، فصعب تفرّق بين العشوائية وسلوك الـ system.<br>(3) الـ simulation ممكن تاخد وقت كتير وتبقى غالية؛ ولو بخلت عليها ممكن تطلع بنتايج ملهاش لازمة أو غلط.<br>والعيوب دي بتتعوّض بـ: packages محتاجة input data بس وفيها output analysis، وكمبيوترات أسرع، وإن أغلب المشاكل الحقيقية ملهاش <bdi>closed-form</bdi> solution أصلًا.",
    "مجالات التطبيق (سلايد 21): التصنيع (manufacturing)؛ تصنيع الـ semiconductors؛ الـ construction engineering والـ project management؛ المجال العسكري (military)؛ الـ logistics والـ supply chain والـ distribution؛ الـ transportation models والـ traffic؛ الـ business process simulation؛ الرعاية الصحية (health care)؛ الـ call centers؛ الـ computers والـ networks؛ والألعاب والترفيه (games and entertainment). والـ lecture notes بتضيف الـ automated material handling systems (AMHS).",
    "خطوات الـ simulation study (سلايد 59):<br>(1) الـ <b>Problem formulation</b>: افهم المشكلة كويس (وأعد صياغتها).<br>(2) الـ <b>Setting of objectives and overall project plan</b>: إيه الأسئلة اللي هتتجاوب، وهل الـ simulation مناسبة، والتكاليف.<br>(3) الـ <b>Model conceptualization</b>: تجرّد الـ system الحقيقي لـ conceptual model (مفيش دليل عام؛ فيه أدوات زي الـ UML).<br>(4) الـ <b>Data collection</b>: هتجيب الـ data إزاي، وهل الـ random distributions مناسبة.<br>(5) الـ <b>Model translation</b>: تكتب الـ model كبرنامج بيشتغل على الكمبيوتر.<br>(6) الـ <b>Verified?</b> هل البرنامج بيعمل اللي الـ model بيوصفه؟<br>(7) الـ <b>Validated?</b> هل النتايج مطابقة للواقع (calibration)؟ وده صعب لو مفيش system حقيقي.<br>(8) الـ <b>Experimental design</b>: أنهي alternatives تشغّلها، وأنهي parameters تغيّرها.<br>(9) الـ <b>Production runs and analysis</b>.<br>(10) الـ <b>More runs?</b><br>(11) الـ <b>Documentation and reporting</b>: الـ program documentation والـ progress documentation.<br>(12) الـ <b>Implementation</b>.<br>والـ 4 phases (سلايد 60):<br>(1) الـ discovery and orientation<br>(2) الـ model building and data collection<br>(3) الـ run the model<br>(4) الـ implementation<br>وأهم خطوة هي الـ validation: الـ model اللي مش valid ممكن يوصّل لقرارات خطيرة وغالية.",
    "الـ <b>system state</b> هو مجموعة الـ variables اللي محتاجها عشان توصف الـ system في أي لحظة (سلايد 25). مثال (سلايد 26): في router بـ 2 interfaces:<span class=\"ltr\">S = {R1, T1, D1, Q1, R2, T2, D2, Q2}</span>يعني الـ packets اللي اتستقبلت (received)، واللي اتبعتت (transmitted)، واللي اتعملها drop، وطول الـ queue، لكل interface.",
    "الـ simulation مش مناسبة (سلايد 18؛ الـ lecture notes 1.3):<br>(1) لما المشكلة تتحل بالـ common sense؛ مثلًا الزباين بيوصلوا 50 في الساعة وكل server بيخدم 10 في الساعة، فتحسب على طول:<span class=\"ltr\">50/10 = 5 servers</span>(2) لما المشكلة ممكن تتحل رياضيًا (analytically).<br>(3) لما التجارب المباشرة تبقى أسهل.<br>(4) لما تكاليف الـ simulation تبقى أكتر من اللي هتوفره.<br>(5) لما الـ resources أو الوقت اللازم مش متاحين.<br>(6) لما مفيش input data متاحة (ولا حتى تقديرات)، لأن الـ simulation محتاجة data.<br>(7) لما الـ model مينفعش يتعمله verify أو validate (مفيش وقت أو ناس كفاية).<br>(8) لما المديرين عندهم توقعات مش منطقية (عايزين كتير بسرعة أوي) أو مكبّرين قوة الـ simulation.<br>(9) لما سلوك الـ system يبقى معقد جدًا أو مينفعش يتعرّف (زي سلوك البني آدمين).",
    "(a) الـ <b>Entity</b>: الـ object اللي يهمنا في الـ system.<br>(b) الـ <b>Attribute</b>: خاصية للـ entity.<br>(c) الـ <b>Activity</b>: فترة زمنية طولها محدد.<br>(d) الـ <b>State</b>: مجموعة الـ variables اللي محتاجها عشان توصف الـ system في أي لحظة.<br>(e) الـ <b>Event</b>: حاجة بتحصل في لحظة وممكن تغيّر الـ state بتاع الـ system.<br>(f) الـ <b>Endogenous</b>: هي الـ activities والـ events اللي بتحصل جوه الـ system.<br>(g) الـ <b>Exogenous</b>: هي الـ activities والـ events اللي في الـ environment (برّه الـ system) وبتأثر على الـ system.<br>(h) الـ <b>Open system</b>: ده system فيه exogenous activity.<br>(i) الـ <b>Closed system</b>: ده system مفيهوش exogenous activity.<br>(j) الـ <b>Discrete system</b>: الـ state variables بتتغير بس عند مجموعة نقط منفصلة في الزمن.<br>(k) الـ <b>Continuous system</b>: الـ state variables بتتغير بشكل مستمر مع الوقت.<br>(l) الـ <b>Model</b>: تمثيل لـ system بهدف دراسته (تبسيط للواقع، بنسيب فيه بس الجوانب اللي بتأثر على المشكلة).<br>(m) الـ <b>Static simulation model</b> (الـ Monte Carlo simulation): بيمثل الـ system في لحظة معينة.<br>(n) الـ <b>Dynamic simulation model</b>: بيمثل الـ system وهو بيتغير مع الوقت.<br>(o) الـ <b>Deterministic simulation model</b>: مفيهوش random variables؛ مجموعة inputs معروفة بتدي مجموعة outputs وحيدة (زي محاضرات بتتعمل في وقت ثابت).<br>(p) الـ <b>Stochastic simulation model</b>: فيه input variable عشوائي واحد أو أكتر، فالـ outputs بتطلع عشوائية (زي وصول الزباين للبنك).<br>(q) الـ <b>Continuous simulation model</b>: الـ system state بيتغير في كل لحظات الزمن.<br>(r) الـ <b>Discrete simulation model</b>: الـ system state بيتغير بس عند مجموعة نقط منفصلة في الزمن.",
    "الـ <b>Phase 1</b> (الـ discovery and orientation): الـ problem formulation؛ والـ setting of objectives and overall project plan.<br>الـ <b>Phase 2</b> (الـ model building and data collection): الـ model conceptualization؛ الـ data collection؛ الـ model translation؛ الـ verification؛ الـ validation.<br>الـ <b>Phase 3</b> (الـ run the model): الـ experimental design؛ الـ production runs and analysis؛ والـ additional runs.<br>الـ <b>Phase 4</b> (الـ implementation): الـ documentation and reporting؛ والـ implementation.<br>(دي الـ 12 خطوة اللي في سلايد 59، متجمعة في الـ 4 phases بتوع سلايد 60 والـ lecture notes 1.9.)",
    "الأنواع (سلايد 37؛ الـ lecture notes 1.8.1):<br>(1) الـ <b>Physical model</b>: نسخة مادية (prototype) أصغر أو أكبر من حاجة، زي الماكيت المعماري لمبنى.<br>(2) الـ <b>Mathematical model</b>: بيستخدم رموز ومعادلات رياضية عشان يمثل الـ system. وممكن يبقى:<br>• الـ <b>static</b>: العلاقة بين الـ attributes لما الـ system يبقى في حالة اتزان (زي market model العرض فيه بيوازن الطلب، والاتنين معتمدين على السعر)؛<br>• الـ <b>dynamic</b>: الـ attributes بتتغير كـ function في الوقت، وبنطلّعها analytically أو numerically.<br>والـ mathematical model بندرسه يا إما analytically يا إما بالـ simulation.<br>(3) الـ <b>Simulation model</b>: نوع معين من الـ mathematical model؛ تمثيل رياضي للخصائص الأساسية لـ system حقيقي يقدر يتنبأ بالسلوك المستقبلي تحت ظروف مختلفة. وبيتصنف static أو dynamic، و deterministic أو stochastic، و discrete أو continuous."
   ],
   "quiz": [
    [
     "الـ Transportation models and traffic مجال من مجالات التطبيق، بس الـ manufacturing والـ health care موجودين في الليستة برضه، فالإجابة الكاملة هي «All of the above» (L1, Application areas of simulation).",
     "الـ Manufacturing applications مجال من مجالات التطبيق، بس الـ transportation والـ health care موجودين برضه (L1, Application areas of simulation).",
     "الـ Health care مجال من مجالات التطبيق، بس الـ manufacturing والـ transportation موجودين برضه (L1, Application areas of simulation).",
     "صح. التلاتة موجودين في ليستة مجالات التطبيق اللي في السلايد: الـ manufacturing applications، والـ transportation models and traffic، والـ health care (L1, Application areas of simulation)."
    ],
    [
     "الـ spreadsheets بتتستخدم فعلًا (الـ hand simulations في Lecture 2 بتستخدم Excel)، بس الـ study ممكن تحتاج كمان simulation package و statistical software، فالإجابة «All of the above» (L2, Simulation of Queueing Systems).",
     "الـ simulation packages أداة من الأدوات (L1, Simulation Tools)، بس الـ spreadsheets والـ statistical software بيتستخدموا برضه في الـ study.",
     "الـ statistical software بيتستخدم عشان نعمل fit للـ input distributions (L6)، بس الـ spreadsheets والـ simulation packages بيتستخدموا برضه.",
     "صح. الـ study ممكن تستخدم التلاتة: الـ spreadsheets للـ hand simulations زي Excel و OpenOffice (L2, Simulation of Queueing Systems)، والـ simulation languages والـ packages عشان نبني الـ model (L1, Simulation Tools)، والـ statistical software (بتاع الـ distribution fitting) للـ input modeling (L6, Goodness-of-fit tests)، والجزء ده من الـ lecture notes ‡. ‡ مفيش سلايد بيذكر التلاتة دول مع بعض؛ الإجابة متجمعة من المحاضرات دي."
    ],
    [
     "اختيار الـ input variables تبع الـ model conceptualization والـ data collection (الخطوتين 3 و 4)، يعني بعد ما المشكلة تتصاغ (L1, Steps in a Simulation Study).",
     "الـ entities بتتعمل لما الـ model يتعمله conceptualization و translation (الخطوتين 3 و 5)، مش في الخطوة 1 (L1, Steps in a Simulation Study).",
     "صح. الخطوة 1 هي الـ Problem formulation: <bdi>\"The study begins with defining the problem statement\"</bdi> (L1, Steps in a Simulation Study).",
     "الـ output variables بتتحدد في الـ setting objectives وفي الـ experimental design (الخطوتين 2 و 8)؛ أما الخطوة 1 فهي الـ problem formulation (L1, Steps in a Simulation Study)."
    ],
    [
     "الـ <bdi>C++</bdi> لغة برمجة عامة (general purpose) و object oriented بتتستخدم في الـ simulation، بس هي مش simulation language (L1, Simulation Tools).",
     "الـ Visual Basic لغة برمجة عامة (general purpose)، مش simulation language (L1, Simulation Tools).",
     "صح. الـ GPSS/H هي الـ simulation language الوحيدة في الاختيارات؛ أما الـ <bdi>C++</bdi> والـ Visual Basic والـ Fortran فلغات برمجة عامة (general purpose) (L1, Simulation Tools). ‡ في السلايدات الـ GPSS متحطوطة تحت <bdi>\"General purpose simulation languages\"</bdi> (<bdi>block-structured</bdi>، interpretive، معمولة على FORTRAN، والـ <bdi>world-view</bdi> بتاعها transactions و facilities)؛ والـ <bdi>special-purpose</bdi> packages اللي في السلايدات هي NETWORK II.5 و OPNET و COMNET III و SIMFACTORY. السؤال بيسمي الـ <bdi>GPSS/H</bdi> «special-purpose» بمعنى إنها لغة معمولة مخصوص للـ simulation، فاختارها.",
     "الـ Fortran لغة برمجة عامة (general purpose)، «غالبًا اتعمل بيها models أكتر من أي لغة تانية»، مش simulation language (L1, Simulation Tools)."
    ],
    [
     "صح. سلايد 18 بيذكرها بالحرف تحت <bdi>\"When is simulation not appropriate?\"</bdi> (L1).",
     "دي موجودة في ليستة الحالات اللي الـ simulation فيها مش مناسبة: <bdi>\"When no (input) data is available, but simulations need data\"</bdi> (L1, When is simulation not appropriate?)."
    ],
    [
     "صح. دي ميزة: الـ hardware designs الجديدة والـ physical layouts والـ transportation systems والـ protocols والـ computer systems والـ network architectures ممكن تتختبر من غير ما تحجز resources (L1, Advantages of simulation).",
     "دي واحدة من مميزات الـ simulation اللي في الليستة (L1, Advantages of simulation)."
    ],
    [
     "إن الـ model محتاج تدريب ده مكتوب كعيب من عيوب الـ simulation (L1, Disadvantages of simulation).",
     "صح. الجملة <bdi>\"Model building requires training, it is like an art\"</bdi> دي <b>عيب</b> في الـ simulation، مش سبب نستخدمها عشانه (L1, Disadvantages of simulation). والـ revision sheet بتاعة الدكتور معلّمة نفس الجملة F."
    ],
    [
     "ده وصف الـ exogenous activities؛ أما الـ endogenous فبتحصل جوه الـ system (L1, Components of a System).",
     "صح. ده تعريف الـ Exogenous. أما الـ Endogenous فهي الـ activities والـ events اللي بتحصل جوه الـ system (L1, Components of a System)."
    ],
    [
     "الـ models اللي مفيهاش random variables اسمها deterministic؛ والـ stochastic models هي اللي فيها random variables (L1, Simulation Models).",
     "صح. من غير random variables يبقى deterministic؛ والـ stochastic models فيها random variables (L1, Simulation Models)."
    ],
    [
     "صح. الـ Static بيمثل الـ system في لحظة معينة؛ والـ dynamic على مدار فترة زمنية (L1, Simulation Models).",
     "ده تعريف السلايد للـ static model بالظبط (L1, Simulation Models)."
    ],
    [
     "صح. في شجرة الـ models (سلايد 50) الـ Monte Carlo Simulation واقعة تحت static وبعدين stochastic؛ والـ lecture notes بتقول كمان إن الـ static simulation model اسمه Monte Carlo simulation (L1, Simulation Models).",
     "الـ Monte Carlo simulation هي الفرع الـ static الـ stochastic في شجرة الـ models (L1, Simulation Models)."
    ],
    [
     "على الـ timeline الـ think time بيبدأ لما الـ system <b>يكمّل</b> الرد، مش لما يبدأه (L1, Common performance metrics).",
     "صح. الـ think time من <bdi>\"system completes response\"</bdi> لحد <bdi>\"user starts next request\"</bdi> (الـ timeline في سلايد 56)، مش من ساعة ما الـ system يبدأ الرد (L1, Common performance metrics)."
    ],
    [
     "الـ revision sheet المحلولة بتاعة الدكتور <bdi>(Sheet 2, Q54)</bdi> معلّماها True، بس السلايدات هي اللي بتحكم: سلايد 4 في الـ Simulation Tools بيحط الـ MODULA والـ ADA (مع الـ FORTRAN والـ PASCAL والـ <bdi>C/C++</bdi>) كـ general <b>purpose</b> programming languages بتتستخدم في الـ simulation (L1, Simulation Tools). أما الـ general simulation languages (سلايد 6 لـ 8) فهي:<span class=\"ltr\">GPSS, SIMSCRIPT II.5, MODSIM III, SIMULA, SLAM, CSIM</span>",
     "صح. الـ MODULA (فيها تحسينات كتير عن الـ PASCAL) والـ ADA (محاولة الـ Department of Defense للـ standardization) لغات general purpose بتتستخدم في الـ simulation (سلايد 4 في الـ Simulation Tools)، مش general simulation languages؛ ودول هم (سلايد 6 لـ 8):<span class=\"ltr\">GPSS, SIMSCRIPT II.5, MODSIM III, SIMULA, SLAM, CSIM</span>الـ revision sheet المحلولة بتاعة الدكتور معلّماها True؛ بس السلايدات هي اللي بتكسب."
    ],
    [
     "الـ Military applications موجودة في ليستة مجالات التطبيق (L1, Application areas of simulation).",
     "الـ Semiconductor manufacturing موجود في ليستة مجالات التطبيق (L1, Application areas of simulation).",
     "صح. ليستة مجالات التطبيق فيها الـ military applications والـ semiconductor manufacturing والـ computers and networks (يعني الـ telecommunications)، بس مفيهاش الـ food industry (L1, Application areas of simulation).",
     "الـ Computers and networks (والـ call centers) موجودين في الليستة، ودول بيغطوا الـ telecommunications (L1, Application areas of simulation)."
    ],
    [
     "صح. الـ Deterministic يعني simulation models من غير random variables (L1, Simulation Models).",
     "الـ model اللي فيه random variable واحد أو أكتر يبقى stochastic (L1, Simulation Models).",
     "أي random variable بيخلي الـ model يبقى stochastic؛ والـ deterministic معناه مفيش ولا واحد (L1, Simulation Models).",
     "الـ random variables بتخليه stochastic؛ والـ deterministic models مفيهاش ولا واحد (L1, Simulation Models)."
    ],
    [
     "الـ Static simulation عكس الـ dynamic، لأنها بتمثل الـ system في لحظة واحدة (L1, Simulation Models).",
     "صح. في شجرة الـ models، الفرع dynamic وبعدين stochastic وبعدين discrete هو الـ <bdi>Discrete-event Simulation</bdi>، والكورس بيركز على <bdi>\"discrete, dynamic, stochastic simulation models\"</bdi> (L1, Simulation Models; Discrete-Event System Simulation). ‡ السلايدات مش بتستخدم كلمة «most common»؛ دي القراية اللي متوافقة مع الشجرة.",
     "الـ Stochastic بيوصف العشوائية (وممكن يبقى static أو dynamic)، مش شكل من أشكال الـ dynamic simulation؛ والورقة اللي هي dynamic و stochastic و discrete اسمها <bdi>discrete-event simulation</bdi> (L1, Simulation Models).",
     "الـ <bdi>Discrete-time simulation</bdi> مش موجودة في شجرة المحاضرة؛ الورقة اللي فيها هي الـ <bdi>discrete-event simulation</bdi> (L1, Simulation Models)."
    ],
    [
     "صح. الـ Dynamic models بتمثل الـ system على مدار فترة زمنية، يعني وهو بيتغير مع الوقت (L1, Simulation Models).",
     "الـ static model بيمثل الـ system في لحظة معينة (L1, Simulation Models).",
     "كلمة Analytical بتوصف الـ mathematical model بيتحل إزاي (بـ formulas)، مش هل بيتابع الوقت ولا لأ (L1, Model of a System).",
     "كلمة Numerical بتوصف طريقة الحل (computational procedures)، مش متابعة التغييرات مع الوقت (L1, Discrete-Event System Simulation)."
    ],
    [
     "كلام صح، بس ده عيب واحد بس من العيوب اللي في الليستة؛ والـ B والـ C موجودين برضه (L1, Disadvantages of simulation).",
     "كلام صح (النتايج صعب تفسيرها)، بس الـ A والـ C عيوب برضه (L1, Disadvantages of simulation).",
     "كلام صح (بتاخد وقت وغالية)، بس الـ A والـ B عيوب برضه (L1, Disadvantages of simulation).",
     "صح. العيوب: بناء الـ model محتاج تدريب؛ النتايج ممكن تبقى صعب تفسيرها؛ والـ simulation ممكن تاخد وقت كتير وتبقى غالية (L1, Disadvantages of simulation). والاختيارات التلاتة بيعيدوا صياغة الكلام ده."
    ],
    [
     "صح. الـ Measurements معناها إنك تستخدم نسخة موجودة من الـ system وتعمل عليها قياسات للـ performance (L1, Introduction to Simulation).",
     "ده بالظبط وصف السلايد لطريقة الـ measurement (L1, Introduction to Simulation)."
    ],
    [
     "السلايد بيقول إن المعرفة اللي بتطلع من الـ simulations <b>ممكن</b> تتستخدم عشان تحسّن الـ system (L1, When is simulation appropriate?).",
     "صح. السلايد بيقول <bdi>\"Knowledge from simulations can be used to improve the system\"</bdi> (L1, When is simulation appropriate?)."
    ],
    [
     "صح. دي ميزة: الوقت ممكن يتضغط أو يتمط (تبطئة أو تسريع) (L1, Advantages of simulation).",
     "دي واحدة من المميزات اللي في الليستة (L1, Advantages of simulation)."
    ],
    [
     "الـ activities اللي بتحصل جوه الـ system اسمها endogenous؛ والـ exogenous هي اللي برّه (L1, Components of a System).",
     "صح. ده الـ Endogenous. أما الـ Exogenous فهي الـ activities والـ events اللي في الـ environment (برّه الـ system) وبتأثر على الـ system (L1, Components of a System)."
    ],
    [
     "صح. ده تعريف السلايد للـ system state (L1, Components of a System).",
     "ده تعريف السلايد للـ system state بالظبط (L1, Components of a System)."
    ],
    [
     "صح. للـ request اللي اتعمل صح الـ metrics هي الـ time (الـ response time) والـ rate (الـ throughput) والـ resources (الـ utilization) (L1, Selecting performance metrics).",
     "الـ response time والـ throughput والـ utilization هم بالظبط الـ metrics بتوع فرع «done correctly» (L1, Selecting performance metrics)."
    ],
    [
     "صح. الخطوة 6 في سلايد 59، الـ Verified?، مكتوبة <bdi>\"Does the program that, what the model describes?\"</bdi>، ومعناها <bdi>\"Does the program do what the model describes?\"</bdi> (والـ revision sheet بتاعة الدكتور، Q49، بتستخدم الصياغة دي بالظبط ومعلّماها True) (L1, Steps in a Simulation Study).",
     "الـ verification بيقارن البرنامج بالـ model؛ وده سؤال السلايد للخطوة 6 (L1, Steps in a Simulation Study)."
    ],
    [
     "صح. ده تعريف السلايد (L1, Simulation Models).",
     "ده تعريف السلايد للـ simulation model (L1, Simulation Models)."
    ],
    [
     "صح. الـ Simulation واحدة من التلات طرق لتقييم الـ system (سلايد 4): تكتب computer program بيعمل implement لـ model للـ system وتعمل experiments بإنك تشغّله.",
     "ده بالظبط وصف سلايد 4 للـ simulation، إنها computer program بيعمل implement لـ model، وبنشغّله عشان نعمل experiments (L1, Introduction to Simulation)."
    ],
    [
     "صح. الـ Analysis (سلايد 4) معناها إنك تعمل mathematical abstraction للـ system وتطلّع formulas بتوصف الـ performance بتاعه.",
     "سلايد 4 بيعرّف الـ analysis كده بالظبط، يعني mathematical abstraction ومعاها formulas للـ performance (L1, Introduction to Simulation)."
    ],
    [
     "صح. الـ MANET (wireless network من mobile nodes من غير infrastructure، والـ nodes بتعمل forward للـ data بتاعة غيرها) واحدة من أمثلة الـ simulation في المحاضرة (سلايد 12 و 13).",
     "الـ MANET مذكورة كمثال للـ simulation (سلايد 12 و 13): صعب نطلّع <bdi>closed-form</bdi> formula لمكان الـ node، فبنعمل لها simulation (L1, Simulation examples)."
    ],
    [
     "صح. الـ Serious games موجودة في أمثلة الـ simulation (سلايد 9) وتحت غرض الـ Entertainment (الـ video games والـ serious games) في سلايد 14.",
     "سلايد 9 و 14 بيذكروا الـ serious games (مع الـ entertainment والـ video games) كاستخدامات للـ simulation (L1, Simulation examples)."
    ],
    [
     "صح. طريقة الـ simulation هي إنك تولّد artificial history للـ system وتطلّع منه inferences عن خصائص الـ system (سلايد 16).",
     "توليد الـ artificial history هو نفسه طريقة الـ simulation (سلايد 16) (L1, What is a simulation?)."
    ],
    [
     "صح. مذكورة في سلايد 17 تحت الحالات اللي الـ simulation فيها مناسبة.",
     "سلايد 17 بيذكر دي كسبب إن الـ simulation مناسبة (L1, When is simulation appropriate?)."
    ],
    [
     "صح. مذكورة في سلايد 17 تحت الحالات اللي الـ simulation فيها مناسبة.",
     "سلايد 17 بيذكر دي كسبب إن الـ simulation مناسبة (L1, When is simulation appropriate?)."
    ],
    [
     "صح. مذكورة في سلايد 17 تحت الحالات اللي الـ simulation فيها مناسبة.",
     "سلايد 17 بيذكر دي كسبب إن الـ simulation مناسبة (L1, When is simulation appropriate?)."
    ],
    [
     "صح. مذكورة في سلايد 17 تحت الحالات اللي الـ simulation فيها مناسبة.",
     "سلايد 17 بيذكر دي كسبب إن الـ simulation مناسبة (L1, When is simulation appropriate?)."
    ],
    [
     "سلايد 18 بيقول العكس: لما المشكلة ممكن تتحل رياضيًا، الـ simulation مش مناسبة (L1, When is simulation not appropriate?).",
     "صح. لما المشكلة ممكن تتحل رياضيًا (analytically)، الـ simulation <b>مش</b> مناسبة (سلايد 18)."
    ],
    [
     "سلايد 18 بيذكر غياب الـ input data كسبب إن الـ simulation مش مناسبة (L1, When is simulation not appropriate?).",
     "صح. الجملة <bdi>\"No (input) data is available, but simulations need data\"</bdi> دي حالة الـ simulation فيها <b>مش</b> مناسبة (سلايد 18)."
    ],
    [
     "صح (الـ revision sheet المحلولة بتاعة الدكتور، Q18، معلّماها T). سلايد 18 بيقولها بصيغة النفي: الـ simulation <b>مش</b> مناسبة لما مينفعش يتعملها verify أو validate، والـ lecture notes (Banks and Gibson، القاعدة 8) بتربط ده بإن يبقى فيه وقت وناس كفاية للـ verification والـ validation. يبقى إن الـ model يقدر يتعمله verify و validate شرط عشان الـ simulation تبقى مناسبة (بس مش الشرط الوحيد: الـ data والوقت والتكلفة مهمين برضه)، والـ validation هي أهم خطوة في الـ study (سلايد 60).",
     "مفتاح الدكتور معلّمها True: سلايد 18 بيستبعد الـ simulation بس لما <b>مينفعش</b> يتعملها verify أو validate، فالـ model اللي ينفع يتعمله verify و validate بيحقق الشرط ده عشان الـ simulation تبقى مناسبة (L1, When is simulation not appropriate?)."
    ],
    [
     "سلايد 18 بيذكر «سلوك الـ system معقد جدًا أو مش معروف» كحالة الـ simulation فيها مش مناسبة (L1, When is simulation not appropriate?).",
     "صح. سلايد 18 بيقول: لما سلوك الـ system يبقى معقد جدًا أو مش معروف (زي سلوك البني آدمين)، الـ simulation <b>مش</b> مناسبة."
    ],
    [
     "صح. دي أول ميزة للـ simulation في سلايد 19.",
     "دي أول ميزة في ليستة سلايد 19 (L1, Advantages of simulation)."
    ],
    [
     "صح. سلايد 19 بيقول إن الـ hardware designs الجديدة والـ layouts والـ protocols والـ computer systems والـ network architectures ممكن تتختبر من غير ما تحجز resources.",
     "سلايد 19 بيذكر دي كميزة (L1, Advantages of simulation)."
    ],
    [
     "صح. دي ميزة من مميزات الـ simulation في سلايد 19.",
     "سلايد 19 بيذكر دي كميزة (L1, Advantages of simulation)."
    ],
    [
     "صح. دي ميزة من مميزات الـ simulation في سلايد 19.",
     "سلايد 19 بيذكر دي كميزة (L1, Advantages of simulation)."
    ],
    [
     "صح. دي ميزة من مميزات الـ simulation في سلايد 19.",
     "سلايد 19 بيذكر دي كميزة (L1, Advantages of simulation)."
    ],
    [
     "صح. دي ميزة من مميزات الـ simulation في سلايد 19.",
     "سلايد 19 بيذكر دي كميزة (L1, Advantages of simulation)."
    ],
    [
     "إن النتايج صعب تفسيرها ده عيب في الـ simulation، مش سبب نستخدمها (سلايد 20) (L1, Disadvantages of simulation).",
     "صح. الجملة <bdi>\"Simulation results can be difficult to interpret\"</bdi> دي <b>عيب</b> (سلايد 20): أغلب الـ outputs هي random variables، فصعب تفرّق بين العشوائية وسلوك الـ system."
    ],
    [
     "إن الـ model محتاج تدريب مكتوب كعيب (سلايد 20) (L1, Disadvantages of simulation).",
     "صح. الجملة <bdi>\"Model building requires training, it is like an art\"</bdi> دي <b>عيب</b> في الـ simulation (سلايد 20)، مش سبب نستخدمها عشانه."
    ],
    [
     "الـ Health care والـ military اتنين بس من مجالات تطبيق كتير في سلايد 21 (L1, Application areas of simulation).",
     "صح. سلايد 21 فيه مجالات كتير: الـ manufacturing، والـ semiconductor manufacturing، والـ construction، والـ military، والـ logistics، والـ transportation والـ traffic، والـ business processes، والـ health care، والـ call centers، والـ computers والـ networks، والـ games."
    ],
    [
     "صح. الـ Manufacturing applications والـ semiconductor manufacturing هما أول مجالين في سلايد 21.",
     "الاتنين موجودين في سلايد 21 (L1, Application areas of simulation)."
    ],
    [
     "صح. الـ <bdi>\"Transportation models and traffic\"</bdi> مجال تطبيق في سلايد 21.",
     "موجود في سلايد 21 (L1, Application areas of simulation)."
    ],
    [
     "صح. ده مثال سلايد 23 على الـ system (وكلمة «factor» اللي في الشيت غلطة مطبعية والمقصود factory).",
     "سلايد 23 بيدي المثال ده بالظبط كـ system (L1, System and System Environment)."
    ],
    [
     "صح. ده التعريف اللي في سلايد 24.",
     "سلايد 24 بيعرّف الـ system environment كده بالظبط (L1, System and System Environment)."
    ],
    [
     "صح. ده تعريف الـ system state في سلايد 25.",
     "سلايد 25 بيعرّف الـ system state كده بالظبط (L1, Components of a System)."
    ],
    [
     "كلمة «جوه الـ system» دي تعريف الـ endogenous؛ أما الـ exogenous فبتحصل في الـ environment (سلايد 25) (L1, Components of a System).",
     "صح. الـ Exogenous هي الـ activities والـ events اللي في الـ environment (برّه الـ system) وبتأثر على الـ system؛ أما الـ activities والـ events اللي جوه الـ system فهي <b>ENDOGENOUS</b> (سلايد 25)."
    ],
    [
     "سلايد 28 بيذكرهم كـ continuous systems (L1, Discrete and Continuous Systems).",
     "صح. دول أمثلة لـ <b>CONTINUOUS</b> systems: الـ state variables بتاعتهم بتتغير بشكل مستمر مع الوقت (سلايد 28). أما أمثلة الـ discrete فهي البنك، ومحل الهدايا، والـ router، والـ jobs في الـ queue."
    ],
    [
     "صح. سلايد 39 عنوانه <bdi>\"Model of a System: Radio Propagation\"</bdi> (الـ <bdi>free-space</bdi> model، وبيفترض line of sight مباشر ومفيش عوائق).",
     "سلايد 39 بيعرض الـ radio propagation كـ model لـ system (L1, Model of a System)."
    ],
    [
     "صح. سلايد 47 <bdi>(What is a Good Model?)</bdi> بيذكر السبعة دول بالظبط:<span class=\"ltr\">simplicity, credibility, efficiency, availability, verified, code quality, documentation</span>",
     "دول المعايير السبعة اللي في سلايد 47 (L1, What is a Good Model?)."
    ],
    [
     "صح. ده مبدأ من مبادئ الـ modeling في سلايد 46.",
     "سلايد 46 بيقول المبدأ ده بالحرف (L1, Principles of Modeling)."
    ],
    [
     "صح. ده التعريف اللي في سلايد 48.",
     "سلايد 48 بيعرّف الـ simulation model كده (L1, Simulation Models)."
    ],
    [
     "صح. سلايد 48 بيقول إن الـ static بيمثل الـ system في لحظة معينة (والـ dynamic على مدار فترة زمنية).",
     "سلايد 48 بيعرّف الـ static model كده (L1, Simulation Models)."
    ],
    [
     "صح. سلايد 51 بيقول إن في الـ <bdi>discrete-event simulation</bdi> الـ model بيتحلل بـ numerical methods، والـ numerical methods بتستخدم computational procedures عشان «تحل» الـ mathematical models.",
     "سلايد 51 بيقول إن الـ DES model بيتحلل بـ numerical methods، واللي بتستخدم computational procedures عشان «تحل» الـ models (L1, Discrete-Event System Simulation)."
    ],
    [
     "صح. سلايد 51 بيقول إن الـ model بيتعمله \"run\" أكتر ما بيتعمله \"solved\".",
     "سلايد 51 بيقول كده بالظبط (L1, Discrete-Event System Simulation)."
    ],
    [
     "صح. سلايد 53 بيقول إن لما الـ request يتعمل صح الـ metrics هي الـ time (الـ response time) والـ rate (الـ throughput) والـ resources (الـ utilization).",
     "سلايد 53 بيذكر التلاتة دول للـ request اللي اتعمل صح (L1, Selecting performance metrics)."
    ],
    [
     "صح. سلايد 53 بيقول إن لما الـ request يتعمل غلط الـ metrics هي الـ probability بتاعة الـ error والـ time between errors.",
     "سلايد 53 بيذكرهم للـ request اللي اتعمل غلط (L1, Selecting performance metrics)."
    ],
    [
     "صح. سلايد 53 بيقول إن لما الـ system ميقدرش يعمل الـ request (زي إن الـ server واقع)، الـ metrics هي الـ duration of the event والـ time between events.",
     "سلايد 53 بيذكرهم لحالة «cannot do» (L1, Selecting performance metrics)."
    ],
    [
     "الـ reaction time بيخلص لما الـ system يبدأ الـ execution، مش لما يبدأ الرد (سلايد 56) (L1, Common performance metrics).",
     "صح. في سلايد 56 الـ reaction time من <bdi>\"user finishes request\"</bdi> لحد <bdi>\"system starts EXECUTION\"</bdi>. أما إنه يخلص عند <bdi>\"system starts response\"</bdi> فده تعريف من تعريفات الـ response time."
    ],
    [
     "صح. سلايد 56 بيوري تعريفين للـ response time: من الـ user يخلّص الطلب لحد الـ system يبدأ الرد، ومن الـ user يخلّص الطلب لحد الـ system يكمّل الرد. وده التعريف الأول.",
     "سلايد 56 بيدي ده كواحد من تعريفين للـ response time (L1, Common performance metrics)."
    ],
    [
     "صح. الخطوة 6 في سلايد 59 هي الـ Verified? يعني هل البرنامج بيعمل اللي الـ model بيوصفه؟",
     "دي الخطوة 6 في سلايد 59 (L1, Steps in a Simulation Study)."
    ],
    [
     "صح. الخطوة 11 (سلايد 59) فيها الـ program documentation (البرنامج شغال إزاي) والـ progress documentation (التسلسل الزمني للشغل).",
     "الـ documentation and reporting هي الخطوة 11 في الـ study (سلايد 59) (L1, Steps in a Simulation Study)."
    ],
    [
     "سلايد 60 فيه 4 phases؛ والـ implementation ناقصة هنا (L1, Steps in a Simulation Study).",
     "صح. فيه <b>4</b> phases (سلايد 60):<br>(1) الـ discovery and orientation<br>(2) الـ model building and data collection<br>(3) الـ run the model<br>(4) الـ implementation"
    ],
    [
     "محاضرة الـ tools بتذكر 3 بدائل مش 2؛ والـ general purpose language ناقصة هنا (L1, Simulation Tools).",
     "صح. فيه <b>3</b> بدائل (Simulation Tools، سلايد 2): تبني الـ model بـ general purpose language، أو تبنيه بـ general simulation language، أو تستخدم special purpose simulation package."
    ],
    [
     "التكلفة القليلة والـ portability وإنك مش محتاج تدريب مذكورين كمميزات (L1, Simulation Tools, slide 3).",
     "صح. دي <b>مميزات</b> الـ general purpose languages (تكلفة software إضافية قليلة أو مفيش، ومتاحة في كل حتة وportable، ومش محتاجة تدريب إضافي). أما العيوب فهي: كل model بيبدأ من الصفر، والكود اللي يتعاد استخدامه قليل، والـ development cycle طويل، والـ verification صعب."
    ],
    [
     "مفتاح الشيت بيقول True، بس سلايد 4 في محاضرة الـ tools بيحط الـ Modula والـ ADA كـ general purpose programming languages بتتستخدم في الـ simulation، مش general simulation languages (L1, Simulation Tools). والـ general simulation languages هي:<span class=\"ltr\">GPSS, SIMSCRIPT II.5, MODSIM III, SIMULA, SLAM, CSIM</span>",
     "صح. الـ MODULA والـ ADA لغات general <b>PURPOSE</b> بتتستخدم في الـ simulation (Simulation Tools، سلايد 4، مع الـ FORTRAN والـ PASCAL والـ <bdi>C/C++</bdi>). أما الـ general purpose <b>SIMULATION</b> languages (سلايد 6 لـ 8) فهي:<span class=\"ltr\">GPSS, SIMSCRIPT II.5, MODSIM III, SIMULA, SLAM, CSIM</span>ومفتاح الشيت بيقول True، بس السلايدات بتحطهم كـ general purpose programming languages."
    ],
    [
     "صح. سلايد 9 في الـ Simulation Tools بيقول إن مميزات الـ special purpose packages هي development سريع جدًا للـ models المعقدة، و learning cycle قصير، ومفيش برمجة (فالأخطاء قليلة جدًا).",
     "سلايد 9 في محاضرة الـ tools بيذكر الاتنين كمميزات (L1, Simulation Tools)."
    ],
    [
     "صح. ده التعريف اللي في سلايد 16.",
     "الجملة صح: سلايد 16 بيعرّف الـ simulation كده بالظبط (L1, What is a simulation and how it is done?)."
    ],
    [
     "ده <b>فعلًا</b> سبب إننا منعملش simulation (سلايد 18) (L1, When is simulation appropriate, and when not?).",
     "ده <b>فعلًا</b> سبب إننا منعملش simulation: الـ simulations محتاجة data (سلايد 18).",
     "صح. إنك تتأكد من النتايج التحليلية (verify analytical results) ده سبب إن الـ simulation <b>مناسبة</b> (سلايد 17).",
     "ده <b>فعلًا</b> سبب إننا منعملش simulation (سلايد 18)."
    ],
    [
     "الـ Phase 1 فيها بس الـ problem formulation والـ setting objectives (سلايد 60) (L1, Steps in a simulation study).",
     "صح. الـ Phase 2 هي الخطوات من 3 لـ 7: الـ conceptualization، والـ data collection، والـ translation، والـ verified?، والـ validated? (سلايد 60).",
     "الـ Phase 3 فيها الـ experimental design والـ production runs والـ more runs (سلايد 60).",
     "الـ Phase 4 فيها الـ documentation and reporting والـ implementation (سلايد 60)."
    ],
    [
     "ده عيب في الـ general purpose languages (سلايد 3 في الـ tools)؛ أما الـ packages فبتدي development سريع جدًا (L1, Simulation tools).",
     "صح. وكمان التكلفة العالية والـ scope المحدود (سلايد 9 في الـ tools).",
     "ده عيب في الـ general purpose languages (سلايد 3 في الـ tools).",
     "الـ packages الـ learning cycle بتاعها <b>قصير</b> (سلايد 9 في الـ tools)."
    ],
    [
     "دي activity، يعني فترة زمنية طولها محدد (L1, Components of a system).",
     "صح. الـ state هو:<span class=\"ltr\">S = {R1, T1, D1, Q1, R2, T2, D2, Q2}</span>",
     "ده event (سلايد 26).",
     "دول الـ attributes بتوع الـ entity اللي هي الـ router (سلايد 26)."
    ],
    [
     "موجودة في الليستة (سلايد 14) (L1, Simulation examples).",
     "موجودة في الليستة (سلايد 14).",
     "صح. الـ Bottleneck analysis ميزة من مميزات الـ simulation (سلايد 19)، مش من استخدامات Elmaghraby (اللي هي الـ aid to thought، والـ communication، والتدريب والتعليم، والـ experimentation، والـ predicting).",
     "موجودة في الليستة (سلايد 14)."
    ],
    [
     "صح. سلايد 46 بيقول إن الجوانب الـ continuous في المشكلة لازم تتاخد في الاعتبار الأول؛ وبعدين تتعمل الجوانب الـ discrete.",
     "الجوانب الـ discrete بتتعمل بعد الـ continuous (سلايد 46) (L1, Principles of modeling and a good model).",
     "المبدأ بيتكلم عن الجوانب الـ continuous قصاد الـ discrete، والـ continuous الأول (سلايد 46) (L1, Principles of modeling and a good model).",
     "الـ Documentation صفة من صفات الـ model الكويس (سلايد 47)، مش أول جانب في model لـ combined system (L1, Principles of modeling and a good model)."
    ],
    [
     "الـ Propagation هو وقت الانتقال على الـ medium من A لـ B (سلايد 43) (L1, Examples of system models).",
     "صح. في سلايد 43 الـ transmission هو الوقت اللي بياخده حط كل الـ bits بتاعة الـ packet على الـ medium.",
     "الـ Queueing هو الوقت اللي الـ packet بتستناه قبل الـ transmission (سلايد 43) (L1, Examples of system models).",
     "الـ Processing في الـ node هو فحص الـ header بتاع الـ packet (سلايد 43) (L1, Examples of system models)."
    ],
    [
     "صح. سلايد 41 معلّم صفوف الـ <bdi>TCP/IP</bdi> اللي قصاد الـ Presentation والـ Session إنها <bdi>\"Don't exist\"</bdi>.",
     "الـ Network بيقابلها الـ Internet layer، والـ Data Link مع الـ Physical بيقابلهم الـ <bdi>Host-to-Network</bdi> layer (سلايد 41) (L1, Examples of system models).",
     "الاتنين موجودين في الـ <bdi>TCP/IP</bdi> بنفس الأسامي (سلايد 41) (L1, Examples of system models).",
     "الـ Physical متغطي بالـ <bdi>Host-to-Network</bdi> layer مع الـ Data Link (سلايد 41) (L1, Examples of system models)."
    ],
    [
     "الـ Data collection بتاخد وقت كتير، بس سلايد 60 بيقول إن أهم خطوة هي الـ validation (L1, Steps in a simulation study).",
     "الـ Verification بيقارن البرنامج بالـ model؛ بس سلايد 60 بيقول إن أهم خطوة هي الـ validation (L1, Steps in a simulation study).",
     "صح. سلايد 60 بيقول إن أهم خطوة هي الـ validation؛ لو الـ model مش valid، النتايج ممكن توصّل لقرارات خطيرة وغالية.",
     "الـ Implementation هي آخر خطوة؛ وسلايد 60 بيقول إن الأهم هي الـ validation (L1, Steps in a simulation study)."
    ],
    [
     "صح. سلايد 24 بيقول إنه مهم تحدد الحدود (boundary)، والقرار ده بيعتمد على هدف الدراسة.",
     "الأداة بتتختار بعدين؛ وسلايد 24 بيقول إن الحدود بتعتمد على هدف الدراسة (L1, System and system environment).",
     "سلايد 24 بيقول إن الحدود بتعتمد على هدف الدراسة، مش على عدد الـ entities (L1, System and system environment).",
     "سلايد 24 بيقول إن الحدود بتعتمد على هدف الدراسة (L1, System and system environment)."
    ]
   ],
   "extra": [
    [
     "مش محتاجين: الإجابة بتطلع بالـ common sense، وده سبب إن الـ simulation <b>مش</b> مناسبة (L1, When is simulation appropriate, and when not?).",
     "صح. ده مثال الـ common sense اللي في الـ lecture notes:<span class=\"ltr\">50/10 = 5</span>",
     "النسبة مقلوبة: انت بتقسم معدل الوصول على معدل الخدمة لكل server:<span class=\"ltr\">50/10 = 5</span>",
     "مش محتاجين: الـ common sense بيدي على طول:<span class=\"ltr\">50/10 = 5 servers</span>"
    ],
    [
     "ده state variable (L1, Components of a system).",
     "دي activity، يعني فترة زمنية طولها محدد.",
     "صح. الوصول (arrival) حاجة بتحصل في لحظة وممكن تغيّر الـ state.",
     "ده attribute، يعني خاصية للـ entity."
    ],
    [
     "صح. الحسابات (سلايد 54):<span class=\"ltr\">30 × 60 = 1800<br>60 × 60 = 3600<br>24 × 3600 = 86400</span>",
     "الساعة بـ 3600 sec واليوم بـ 86400 sec (سلايد 54) (L1, Performance metrics).",
     "الـ 30 دقيقة بـ 1800 sec مش 180:<span class=\"ltr\">30 × 60 = 1800 sec</span>",
     "الـ 30 دقيقة بـ 1800 sec واليوم بـ 86400 sec (سلايد 54)."
    ],
    [
     "صح. المسافة:<span class=\"ltr\">d = 20 × 30 = 600 m</span>والعيب اللي في سلايد 38 إن السرعة الثابتة نادرًا ما بتبقى صح لرحلة كاملة.",
     "المسافة مش 30 على 20، الحساب الصح:<span class=\"ltr\">d = v · t = 20 × 30 = 600 m</span>والـ line of sight ده افتراض في الـ radio <bdi>free-space</bdi> model (L1, Examples of system models).",
     "المسافة صح، بس «مش مفيد في البيئات الـ indoor والمدن» ده عيب الـ <bdi>free-space</bdi> radio model (سلايد 39).",
     "المسافة:<span class=\"ltr\">d = 20 × 30 = 600 m</span>وميزة الـ model إنه بسيط ومفهوم بالبديهة (سلايد 38)."
    ],
    [
     "صح. الحسابات:<span class=\"ltr\">Reaction = 3 − 2 = 1 s<br>Think = 12 − 7 = 5 s</span>الـ reaction من خلاص الطلب لحد بداية التنفيذ، والـ think من اكتمال الرد لحد الطلب اللي بعده.",
     "الـ reaction من خلاص الطلب لحد بداية التنفيذ، والـ think من اكتمال الرد لحد الطلب الجاي (L1, Performance metrics):<span class=\"ltr\">Reaction = 3 − 2 = 1 s<br>Think = 12 − 7 = 5 s</span>",
     "الـ think time بيبدأ لما الـ system يكمّل الرد:<span class=\"ltr\">12 − 7 = 5 s (not 12 − 5 = 7 s)</span>",
     "الـ reaction time قيمته ثانية واحدة:<span class=\"ltr\">3 − 2 = 1 s</span>أما الـ 3 s فهي أول response time:<span class=\"ltr\">5 − 2 = 3 s</span>"
    ],
    [
     "صح. من سلايد 56:<span class=\"ltr\">5 − 2 = 3 s (to system starts response)<br>7 − 2 = 5 s (to system completes response)</span>",
     "التعريفين بيبدأوا لما الـ user يخلّص الطلب عند الثانية 2 (L1, Performance metrics):<span class=\"ltr\">5 − 2 = 3 s<br>7 − 2 = 5 s</span>",
     "الـ 1 s ده الـ reaction time (بداية التنفيذ عند الثانية 3).",
     "التعريف التاني بيخلص عند اكتمال الرد (الثانية 7):<span class=\"ltr\">7 − 2 = 5 s</span>"
    ],
    [
     "البرنامج بيعمل اللي الـ model بيقوله، يبقى الـ verification نجح (L1, Steps in a simulation study).",
     "صح. الـ Validated? يعني هل النتايج مطابقة للواقع؟ ولو الإجابة «No» بترجع للخطوتين 3 و 4 (سلايد 59).",
     "المشكلة إن الـ model مش مطابق للواقع، وده فشل في الـ validation.",
     "الـ Implementation آخر خطوة؛ وعدم التطابق مع الواقع بيتكشف في الـ validation."
    ],
    [
     "إحنا بنتابعه مع الوقت (dynamic)، وفيه وصول عشوائي (stochastic)، وبيتغير عند نقط منفصلة (L1, Simulation models and discrete-event simulation).",
     "صح. على مدار فترة زمنية يبقى dynamic؛ والوصول العشوائي يبقى stochastic؛ والتغيير بس عند الـ events يبقى discrete.",
     "الـ Monte Carlo بيمثل الـ system في لحظة واحدة؛ والـ model ده شغال على مدار يوم (dynamic).",
     "الوصول العشوائي بيخليه stochastic، والـ state بيتغير عند نقط منفصلة."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">8420 / 60 ≈ 140.33 queries/sec</span>",
     "ده ضرب في 60 بدل القسمة (L1, Performance metrics):<span class=\"ltr\">8420 × 60 = 505200</span>",
     "الـ 12.5 دي الـ throughput بوحدة <bdi>MB/sec</bdi> في سلايد 54، مش عدد queries في الثانية.",
     "الحساب بيدي 140.3 مش 14.0:<span class=\"ltr\">8420 / 60 ≈ 140.3</span>"
    ],
    [
     "ده محتاج برمجة، وكل model بيبدأ من الصفر، والـ development بياخد وقت طويل (L1, Simulation tools).",
     "صح. الـ development سريع جدًا، والـ learning cycle قصير، ومفيش برمجة؛ والتكلفة عالية والـ flexibility محدودة، والشركة قابلة ده. والـ SIMFACTORY ده simulator لعمليات التصنيع (manufacturing operations).",
     "ده لسه محتاج برمجة وتدريب إضافي (سلايد 5 في الـ tools).",
     "الـ OPNET ده package مخصوص للـ communication networks، مش للتصنيع (سلايد 10 في الـ tools)."
    ]
   ]
  },
  "2": {
   "notes": [
    {
     "h": "الـ Simulation باستخدام table",
     "pts": [
      "الـ Chapter 2 اسمه <b>Simulation Examples</b> (slide 1). والمحتويات (slide 2):<span class=\"ltr\">Simulation using Tables; Simulation of Queueing Systems; Examples (A Grocery, Inventory System); Appendix: Random Digits</span>",
      "الـ simulation بنبدأ نشرحها عن طريق إننا <b>نعمل simulation بإيدينا على table</b>؛ وده ممكن يتعمل <b>بالورقة والقلم (pen and paper)</b> أو على <b>spreadsheet</b> (slide 4).",
      "الرسمة (slides 4 و 5، الـ simulation table) فيها columns هي <b>Repetition i</b> والـ <b>Inputs</b> والـ <b>Response y<sub>i</sub></b>، والـ rows من 1 لحد n:<span class=\"ltr\">Repetition i | x<sub>i1</sub>, x<sub>i2</sub>, …, x<sub>ij</sub>, …, x<sub>ip</sub> | Response y<sub>i</sub><br>rows 1, 2, …, n</span>وفيه قوس (bracket) بيعلّم إن صف الـ header هو <b>static meta data</b>، والـ rows من 1 لحد n هي <b>dynamic data during simulation run</b>، يعني بيانات بتتولد أثناء الـ run.",
      "<b>تلات خطوات</b> (slide 5):<br>(1) نحدد <b>الـ characteristics بتاعة كل input</b> داخل الـ simulation.<br>(2) نبني simulation table فيه <b>p inputs x<sub>ij</sub></b> و<b>response واحد y<sub>i</sub></b>:<span class=\"ltr\">j = 1, 2, …, p<br>i = 1, 2, …, n</span>(3) لكل repetition i، <b>نولّد قيمة لكل واحد من الـ p inputs</b> x<sub>ij</sub> و<b>نحسب الـ response</b> y<sub>i</sub>."
     ],
     "figH": {
      "ms-simtable": "الـ simulation table بيتبني في 3 خطوات"
     }
    },
    {
     "h": "الـ Queueing systems: ليه نعملها simulation، وإيه اللي بيوصفها",
     "pts": [
      "الـ slide 6 بتفتح جزء <b>Simulation of Queueing Systems</b>. والـ slide 7 (<bdi>Why?</bdi>) فيها صورة زباين واقفين في طابور في محل: يعني الـ queues أنظمة بنشوفها كل يوم وتستاهل نحللها.",
      "الـ simulation بتتستخدم كتير عشان نحلل الـ queueing models: الزباين بيوصلوا من وقت للتاني، ويدخلوا <b>queue (طابور انتظار)</b>، وفي الآخر بيتخدموا ويمشوا من الـ system. ‡ (من الـ lecture notes)",
      "الـ <b>customer</b> هو أي حاجة بتطلب خدمة (ناس أو مكن أو عربيات نقل أو مرضى أو طيارات أو email أو orders …). والـ <b>server</b> هو أي حاجة بتقدم الخدمة (موظفين الاستقبال أو الميكانيكية أو الطاقم الطبي أو الأوناش أو الـ runways في المطار أو مكن التغليف الأوتوماتيك …). ‡ (من الـ lecture notes)",
      "مقاييس الأداء (performance measures) المعتادة: <b>الـ server utilization</b> (نسبة الوقت اللي الـ server بيبقى فيه مشغول)، و<b>طول طوابير الانتظار</b>، و<b>تأخير الزباين (delays)</b>. ‡ (من الـ lecture notes)",
      "الـ queueing system بيتوصف بـ (slide 8):<br>• الـ <b>Calling population</b><br>• الـ <b>Arrival rate</b><br>• الـ <b>Service mechanism</b><br>• الـ <b>System capacity</b><br>• الـ <b>Queueing discipline</b>",
      "الرسمة (slide 8): سحابة مكتوب عليها <b>Calling population</b>، منها سهم داخل على صندوق خانات اسمه <b>Waiting line</b>، ومنه سهم لدايرة اسمها <b>Server</b>:<span class=\"ltr\">Calling population → Waiting line → Server</span>والـ Fig 2.1 في الـ notes هي نفس الصورة، بس فيها سهم راجع من الـ server للـ calling population. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-queue-sys": "الـ calling population والـ waiting line والـ server، والخمس حاجات اللي بتوصف الـ queue"
     }
    },
    {
     "h": "الـ Calling population والـ system capacity",
     "pts": [
      "الـ <b>Calling population</b>: هي مجموعة الزباين المحتملين؛ وممكن تكون <b>finite</b> أو <b>infinite</b>. ‡ (من الـ lecture notes)",
      "الـ <b>Finite calling population</b>: الـ arrival rate هنا <b>بيعتمد</b> على عدد الزباين اللي بيتخدموا واللي مستنيين. مثال: <b>خمس مكن tire curing</b> (لمعالجة الكاوتش) وعامل واحد بيخدمهم؛ لما الخمسة يبقوا open (واحد بيتخدم وأربعة مستنيين) الـ arrival rate بيبقى <b>صفر</b>. ‡ (من الـ lecture notes)",
      "الـ <b>Infinite calling population</b>: الـ arrival rate (متوسط عدد اللي بيوصلوا في وحدة الزمن) <b>مش بيتأثر</b> بعدد الزباين اللي خرجوا من الـ population ودخلوا الـ system؛ ولو مفيش rush hours بنفترض إنه ثابت. أمثلة: زباين مطعم أو بنك، أو مجموعة كبيرة جدًا من المكن بيخدمها technician واحد. ‡ (من الـ lecture notes)",
      "الـ <b>System capacity</b>: أنظمة كتير بتحط حد لعدد الزباين في الطابور أو في الـ system. ولما الـ capacity تبقى محدودة بنفرّق بين الـ <b>arrival rate</b> (عدد اللي بيوصلوا في وحدة الزمن) والـ <b>effective rate</b> (اللي بيوصلوا <b>وبيدخلوا فعلًا</b> في وحدة الزمن). ‡ (من الـ lecture notes)",
      "مثال على capacity محدودة: <b>مغسلة عربيات (car wash)</b> أوتوماتيك فيها مكان لـ 10 عربيات بس؛ والزبون اللي يوصل يلاقي الـ system مليان بيرجع على طول للـ calling population. ومثال على capacity مفتوحة: <b>بيع تذاكر حفلة (concert tickets)</b> للطلبة. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "الـ Arrival process وسلوك الطابور والـ queue discipline",
     "pts": [
      "في الـ infinite populations الـ arrival process بيتوصف بالـ <b>interarrival times</b> (الوقت بين وصول زبون واللي بعده)؛ والوصول ممكن يكون في أوقات <b>scheduled</b> (متحددة) أو <b>random</b>. ‡ (من الـ lecture notes)",
      "عندنا تلات حالات:<br>(1) <b>Random arrivals</b>: أهم model فيها هو الـ <b>Poisson arrival process</b> (زي الناس في المطاعم، والبنوك اللي بتخدمك وانت في عربيتك drive in، والمكالمات اللي بتوصل لسنترال).<br>(2) <b>Scheduled arrivals</b>: الـ interarrival times ثابتة، أو ثابتة زائد أو ناقص حتة random صغيرة (زي المرضى اللي رايحين عيادة دكتور بمواعيد، ورحلات الطيران المجدولة).<br>(3) <b>دايمًا فيه زبون واحد على الأقل</b> في الـ queue، فالـ server عمره ما بيقعد idle عشان مفيش زباين (مثلًا الـ raw material دايمًا موجودة). ‡ (من الـ lecture notes)",
      "في الـ finite populations: الزبون بيبقى <b>pending</b> لما يكون برا الـ system (جوا الـ calling population). والـ <b>run time</b> هو الوقت من ساعة ما خرج من الـ system لحد الوصول اللي بعده. والـ run times هي:<span class=\"ltr\">A<sub>1</sub><sup>(i)</sup>, A<sub>2</sub><sup>(i)</sup>, …</span>والـ system times بتاعة الزبون i هي:<span class=\"ltr\">S<sub>1</sub><sup>(i)</sup>, S<sub>2</sub><sup>(i)</sup>, …</span>ولو كل المكن pending عند الزمن 0، يبقى أول وصول عند:<span class=\"ltr\">A<sub>1</sub> = min{A<sub>1</sub><sup>(1)</sup>, …, A<sub>1</sub><sup>(5)</sup>}</span>والـ arrival rate بيبقى function في عدد الزباين اللي pending. ‡ (من الـ lecture notes)",
      "الرسمة (الـ Fig 2.2 في الـ notes، بتاعة الـ machine 3) خط زمني ‡ (من الـ lecture notes):<span class=\"ltr\">Pending (A<sub>1</sub><sup>(3)</sup>) → first arrival of machine 3 → Open, system time (S<sub>1</sub><sup>(3)</sup>) → Pending (A<sub>2</sub><sup>(3)</sup>) → second arrival → Open (S<sub>2</sub><sup>(3)</sup>)</span>",
      "<b>سلوك الطابور (Queue behavior)</b>، يعني الزبون بيعمل إيه وهو مستني:<br>• الـ <b>Balk</b>: يمشي أول ما يشوف الطابور طويل أوي.<br>• الـ <b>Renege</b>: يمشي بعد ما وقف في الطابور شوية لما يلاقيه ماشي ببطء.<br>• الـ <b>Jockey</b>: ينقل من طابور لطابور تاني لو حس إنه اختار طابور بطيء. ‡ (من الـ lecture notes)",
      "الـ <b>Queue discipline</b>: هو الترتيب المنطقي للزباين في الـ queue؛ وهو اللي بيحدد مين يتخدم لما الـ server يفضى:<br>• الـ <b>FIFO</b> (<bdi>first in, first out</bdi>)<br>• الـ <b>LIFO</b> (<bdi>last in, first out</bdi>)<br>• الـ <b>SIRO</b> (<bdi>service in random order</bdi>)<br>• الـ <b>SPT</b> (<bdi>shortest processing time first</bdi>)<br>• الـ <b>PR</b> (<bdi>priority service</bdi>)<br>وفي الـ job shop الـ disciplines ممكن تعتمد على الـ due dates والـ expected processing times. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-finite-pop": "أوقات الـ pending والـ open للـ machine 3، وليه لما الخمسة يفتحوا مفيش arrivals"
     }
    },
    {
     "h": "الـ Service times والـ service mechanism",
     "pts": [
      "الـ service times بتاعة الزباين ورا بعض هي:<span class=\"ltr\">S<sub>1</sub>, S<sub>2</sub>, S<sub>3</sub>, …</span>وممكن تكون <b>constant</b> أو <b>random</b>. ولو random، فالـ sequence دي:<span class=\"ltr\">{S<sub>1</sub>, S<sub>2</sub>, …}</span>غالبًا بتبقى random variables <b>independent and identically distributed (IID)</b>. وبنستخدم توزيعات زي الـ Exponential والـ Weibull والـ gamma وغيرهم كـ models. ‡ (من الـ lecture notes)",
      "الـ service times ممكن تختلف حسب نوع الزبون أو الـ class بتاعه أو الـ priority، وممكن تعتمد على الوقت في اليوم أو طول الطابور. ‡ (من الـ lecture notes)",
      "الـ queueing system فيه <b>service centers</b> وqueues بتوصل بينهم؛ وكل center فيه <b>c parallel servers</b>، يعني:<span class=\"ltr\"><b>single server (c = 1)</b><br><b>multiple servers (1 &lt; c &lt; ∞)</b><br><b>unlimited servers (c = ∞)</b></span>والـ <b>self service</b> عادة بنعامله كأن فيه unlimited servers. ‡ (من الـ lecture notes)",
      "الـ Example 2.1 (discount warehouse، يعني مخزن بيع بالخصم): الزباين يا إما <b>بيخدموا نفسهم</b> يا إما بيستنوا واحد من <b>3 clerks</b>، وبعدين بيدفعوا عند <b>cashier واحد</b>. ‡ (من الـ lecture notes)",
      "الرسمة (الـ Fig 2.3 في الـ notes): الـ Arrivals بتتقسم على مسارين، وبعدين الاتنين بيتجمعوا:<span class=\"ltr\">Queue 1 → Service center 1 (<b>c = ∞</b>, self service)<br>Queue 2 → Service center 2 (<b>c = 3</b>, 3 clerks)<br>both → Queue 3 → Service center 3 (<b>c = 1</b>, cashier) → Departures</span>والـ Fig 2.4 بتوري الـ Service center 2 كصندوق فيه Server 1 و Server 2 و Server 3 جنب بعض (parallel) بين الـ Arrivals والـ Departures. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-warehouse": "الـ discount warehouse وفيه 3 service centers"
     }
    },
    {
     "h": "الـ Queueing notation <bdi>A/B/c/N/K</bdi>",
     "pts": [
      "الـ queueing systems بتتكتب بالشكل ده ‡ (من الـ lecture notes):<span class=\"ltr\"><b>A / B / c / N / K</b></span>",
      "الرموز المشهورة لـ A و B ‡ (من الـ lecture notes):<span class=\"ltr\"><b>M</b> = exponential or Markov<br><b>D</b> = constant or deterministic<br><b>E<sub>k</sub></b> = Erlang of order k<br><b>GI</b> = general independent</span>",
      "الـ <bdi><b>M/M/1/∞/∞</b></bdi> عادة بنختصره لـ <bdi><b>M/M/1</b></bdi>. والـ system بتاع الـ tire curing (عامل واحد وخمس مكن) هو <bdi><b>G/G/1/5/5</b></bdi>. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-notation": "إزاي نقرا الـ A/B/c/N/K في الـ M/M/1 والـ G/G/1/5/5 وفي رموز من اختيارك"
     }
    },
    {
     "h": "الـ Single server queue: الافتراضات والـ state والـ events",
     "pts": [
      "<b>الـ Single server queue</b> (slide 9):<br>• الـ calling population <b>infinite</b>، فالـ arrival rate مش بيتغير.<br>• الـ units بتتخدم بنظام <b>FIFO</b>.<br>• الوصول بيتحدد بالـ distribution بتاع الوقت بين كل وصول واللي بعده، يعني الـ <b>interarrival time</b>.<br>• الـ service times ماشية حسب distribution.<br>• <b>لازم الـ arrival rate يبقى أقل من الـ service rate، وساعتها الـ system يبقى stable</b>.<br>• غير كده الطابور هيكبر من غير حد، ويبقى <b>unstable system</b>.",
      "الـ notes بتزوّد: الوصول بيحصل واحد واحد بشكل random، والـ system capacity ملهاش حد. ‡ (من الـ lecture notes)",
      "<b>الـ state بتاعة الـ queueing system</b> (slide 9):<br>• الـ System فيه <b>server</b> و<b>units</b> (في الـ queue أو بتتخدم) و<b>clock</b>.<br>• الـ State of the system: <b>عدد الـ units في الـ system</b> و<b>حالة الـ server (idle أو busy)</b>.<br>• الـ Events: <b>وصول unit (arrival)</b> و<b>خروج unit (departure)</b>.",
      "الـ <b>Event</b>: مجموعة ظروف بتعمل <b>تغيير لحظي (instantaneous change)</b> في الـ state بتاعة الـ system. فيه 2 events بس بيأثروا على الـ state: دخول unit (الـ <b>arrival event</b>) وخلص الخدمة (الـ <b>departure event</b>؛ والـ notes كاتبينها <bdi>departure unit</bdi>). والـ <b>simulation clock</b> بيتابع الوقت في الـ simulation. ‡ (من الـ lecture notes)",
      "الرسمة (slide 9): الـ Calling population، وبعدها وصول (دايرتين معلّمين بالـ t)، وبعدين طابور الانتظار (تلات دواير)، وبعدين الـ Server (دايرة)، وسهم خارج:<span class=\"ltr\">Calling population → arrivals (t<sub>i+1</sub>, t<sub>i</sub>) → Waiting line → Server → leaving</span>"
     ],
     "figH": {
      "ms-ssq-state": "الـ state بتاعة الـ single-server queue والـ events الاتنين اللي بيغيروها"
     }
    },
    {
     "h": "الـ Arrival والـ departure events (الـ flow diagrams)",
     "pts": [
      "الـ <b>Arrival event</b> (slide 10): لو الـ server فاضي (idle) الـ unit بتاخد الخدمة على طول، غير كده بتدخل الـ queue.",
      "الرسمة (slide 10، والـ Fig 2.6 في الـ notes اللي اسمها <bdi>Unit-entering-system</bdi>):<span class=\"ltr\"><b>Arrival event</b> → <b>Server busy?</b><br>No → <b>Unit enters service</b><br>Yes → <b>Unit enters queue for service</b></span>",
      "الـ <b>Departure event</b> (slide 10): لو الـ queue مش فاضية نبدأ نخدم الـ unit اللي عليها الدور، غير كده الـ server هيبقى idle.",
      "الرسمة (slide 10، والـ Fig 2.5 في الـ notes اللي اسمها <bdi>Service-just-completed</bdi>):<span class=\"ltr\"><b>Departure event</b> → <b>Another unit waiting?</b><br>No → <b>Begin server idle time</b><br>Yes → <b>Remove the waiting unit from the queue</b> → <b>Begin servicing the unit</b></span>",
      "الـ events بتحصل إزاي (slide 10)؟ بتحصل <b>بشكل random</b>؛ وفي المثال الصغير الـ interarrival times من <bdi>{1, …, 6}</bdi> والـ service times من <bdi>{1, …, 4}</bdi>.",
      "الـ Fig 2.7 في الـ notes (الـ unit ممكن تعمل إيه لما توصل)، والـ rows فيها حالة الـ server والـ columns حالة الـ queue:<br>• الـ Busy مع Not empty: تدخل الـ queue<br>• الـ Busy مع Empty: تدخل الـ queue<br>• الـ Idle مع Not empty: <b>مستحيل</b><br>• الـ Idle مع Empty: تدخل الخدمة<br>‡ (من الـ lecture notes)",
      "الـ Fig 2.8 في الـ notes (الـ server بيبقى عامل إيه بعد ما الخدمة تخلص): الحالتين Busy مع Empty و Idle مع Not empty <b>مستحيلين</b>؛ والخانات المضللة (الممكنة) هي Busy مع Not empty (unit تانية تدخل الخدمة) و Idle مع Empty (الـ server يبقى idle). ‡ (من الـ lecture notes)",
      "الـ randomness بتيجي من الـ <b>random numbers</b>، ودي موزعة uniformly و independently على <bdi>(0, 1)</bdi>. والـ <b>random digits</b> موزعة uniform على <bdi>{0, 1, …, 9}</bdi>؛ والـ random number بنكوّنه إننا ناخد عدد الـ digits اللي محتاجينه ونحط علامة عشرية (decimal point) على شمالهم. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-event-flows": "الـ flow diagrams بتوع الـ arrival والـ departure، وبنمشي في كل فرع",
      "ms-event-grids": "أنهي تصرفات للـ unit ونتايج للـ server ممكنة (الـ Fig 2.7 والـ Fig 2.8)"
     }
    },
    {
     "h": "بناء simulation run لـ 6 زباين",
     "pts": [
      "الـ Slide 11: الـ <b>interarrival والـ service times بناخدها من distributions</b>؛ والـ simulation run بنبنيه عن طريق <b>إننا ندمج (mesh) الـ clock والـ arrival times والـ service times</b> مع بعض.",
      "أول table فيه Customer و Interarrival time و Arrival time on clock و Service time؛ والتاني بيدمجهم: Arrival time [clock] و Time service begins [clock] و Service time [duration] و Time service ends [clock].",
      "القواعد المستخدمة:<span class=\"ltr\">arrival time = previous arrival + interarrival time<br>service begins = max(arrival time, previous service end)<br>service ends = begins + service time</span>",
      "صفوف محلولة: الزبون 4 بيوصل عند 7 بس الزبون 3 بيتخدم لحد 9، فالخدمة بتبدأ عند 9 وتخلص عند <bdi>9 + 2 = 11</bdi>؛ والزبون 5 بيوصل عند 9 ويبدأ عند 11 ويخلص عند 12؛ والزبون 6 بيوصل عند 15 يلاقي الـ server فاضي، ويخلص عند 19."
     ],
     "figH": {
      "ms-mesh6": "بندمج الـ clock مع الـ arrival times والـ service times للـ 6 customers"
     }
    },
    {
     "h": "ترتيب الـ events زمنيًا (Chronological ordering)",
     "pts": [
      "الـ Slide 12 بتعرض كل event بترتيب الـ clock، ومعاه عدد الزباين في الـ system بعده.",
      "ملاحظات مهمة (slide 12):<br>• الزبون 1 موجود في الـ system عند الزمن 0.<br>• أحيانًا مفيش ولا زبون.<br>• أحيانًا فيه زبونين.<br>• ممكن كذا event يحصلوا في نفس اللحظة (عند الزمن 2 بيحصل departure للزبون 1 و arrival للزبون 2؛ وعند الزمن 9 بيحصل departure للزبون 3 و arrival للزبون 5).",
      "الرسمة (slide 12، <bdi>Number of customers in the system</bdi>) وهي step plot على الزمن من 0 لحد 20:<br>• المستوى 1 من 0 لـ 3 (الزبون 1، وبعده 2)<br>• المستوى 0 من 3 لـ 6<br>• المستوى 1 من 6 لـ 7 (الزبون 3)<br>• <b>المستوى 2 من 7 لـ 11</b> (الزبونين 3 و 4، وبعدين 4 و 5)<br>• المستوى 1 من 11 لـ 12 (الزبون 5)<br>• المستوى 0 من 12 لـ 15<br>• المستوى 1 من 15 لـ 19 (الزبون 6)<br>• وبعد كده 0."
     ],
     "figH": {
      "ms-chrono": "الـ events بترتيب الـ clock وعدد الـ customers في الـ system"
     }
    },
    {
     "h": "المثال 1: البقالة (A Grocery)، توزيعات الـ input",
     "pts": [
      "الـ Slide 13 (صورة: زباين، وبعدين كاشير، وبعدين زبون خارج). تحليل بقالة صغيرة (slide 14):<br>• فيه checkout counter واحد.<br>• الزباين بيوصلوا في أوقات random من <bdi>{1, 2, …, 8}</bdi> دقايق.<br>• الـ service times بتتراوح من <bdi>{1, 2, …, 6}</bdi> دقايق.<br>• هنشوف الـ system لـ <b>100 زبون</b>.",
      "المشاكل والتبسيطات (slide 14):<br>• حجم العينة صغير أوي عشان نطلع باستنتاجات نعتمد عليها.<br>• الـ initial condition مش واخدينها في الاعتبار.",
      "كل interarrival time من 1 لـ 8 احتماله <b>0.125</b> (uniform). والـ cumulative probability هي المجموع التراكمي للاحتمالات."
     ],
     "figH": {
      "ms-grocery-dist": "الـ probabilities بتاعة الـ interarrival والـ service time في الـ grocery، والـ cumulative بتاعتهم"
     }
    },
    {
     "h": "المثال 1: البقالة، الـ simulation table لـ 100 زبون",
     "pts": [
      "الـ Slide 15: الـ columns من Customer لحد Time service ends بتكوّن الـ <b>Simulation System</b>؛ والـ Waiting time in queue و Time customer in system و Idle time of server هما الـ <b>Performance Measure</b>.",
      "معروض بس الزباين من 1 لـ 6 والزبون 100؛ والـ totals لكل الـ 100 زبون:<span class=\"ltr\">interarrival 415 · service 317 · waiting 174 · time in system 491 · idle 101</span>",
      "نتأكد من الصف 2: وصل عند 1، والـ server مشغول لحد 4، فاستنى <bdi>4 − 1 = 3</bdi>، وقعد في الـ system <bdi>6 − 1 = 5</bdi>. والصف 6: وصل عند 18، والـ server فاضي من 16، فالـ server قعد idle مدة <bdi>18 − 16 = 2</bdi>، والانتظار 0."
     ]
    },
    {
     "h": "معادلات الـ model بتاع البقالة",
     "pts": [
      "ورقة الدكتور (<bdi>Chapter 2, Example 1: A Grocery, simulation run for 100 customers</bdi>) بتكرر table الـ slide 15 وبتكتب معادلات الـ model.",
      "(1) الـ <b>Interarrival time (delay)</b> هو random number uniform لكل زبون.<br>(2) وقت الوصول:<span class=\"ltr\">Arrival time(i) = Arrival time(i−1) + delay(i); i &gt; 1 and Arrival time(0) = 0</span>(3) الـ <b>Service time</b> هو random number uniform لكل زبون.<br>(4) ولحد (8) زي المعادلات اللي تحت.",
      "‡ ملحوظة: الورقة بتقول إن الـ service time هو random number <bdi>uniform</bdi>، بس الـ slide 14 بتدي الـ service times احتمالات مش متساوية (من 0.10 لـ 0.30)؛ والـ interarrival times بس هي اللي uniform. والـ service time بيتولد من الـ distribution بتاعته."
     ],
     "figH": {
      "ms-grocery-eq": "الـ model equations مطبقة على الصفوف من 1 لـ 6 في جدول الـ 100 customer"
     }
    },
    {
     "h": "المثال 1: البقالة، الإحصائيات",
     "pts": [
      "الـ Slide 16 بتحسب سبع إحصائيات من الـ totals بتاعة الـ 100 زبون (المعادلات تحت).",
      "متوسط وقت الانتظار:<span class=\"ltr\">174 / 100 = <b>1.74 min</b></span>",
      "احتمال إن الزبون يستنى:<span class=\"ltr\">46 / 100 = <b>0.46</b></span>",
      "نسبة الوقت اللي الـ server كان فيه idle:<span class=\"ltr\">101 / 418 = <b>0.24</b></span>والـ 418 هي مدة الـ simulation run، يعني الـ clock لما آخر خدمة تخلص.",
      "متوسط الـ service time:<span class=\"ltr\">317 / 100 = <b>3.17 min</b></span>ونقارنه بالـ expected service time:<span class=\"ltr\">E(s) = Σ s·p(s) = 1(0.10) + 2(0.20) + 3(0.30) + 4(0.25) + 5(0.10) + 6(0.05) = <b>3.2 min</b></span>",
      "متوسط الوقت بين كل وصول واللي بعده:<span class=\"ltr\">415 / 99 = <b>4.19 min</b></span>والـ 99 هي عدد الوصول ناقص 1، عشان الزبون 1 بيوصل عند الزمن 0. والقيمة المتوقعة لـ uniform على <bdi>{a, …, b}</bdi> هي:<span class=\"ltr\">E(τ) = (a + b)/2 = (1 + 8)/2 = <b>4.5 min</b></span>",
      "متوسط وقت الانتظار للي استنوا بس:<span class=\"ltr\">174 / 54 = <b>3.22 min</b></span>وده زي ما هو في الـ slide.",
      "‡ ملحوظة: الـ slide هنا بتستخدم <b>54</b> زبون استنوا، بس في الـ p(wait) بتستخدم <b>46</b> (والـ slide 17 بتقول 46%). ولو استخدمنا 46 القيمة تطلع:<span class=\"ltr\">174 / 46 = <b>3.78 min</b></span>الرقمين اللي في الـ slide مش متسقين مع بعض؛ لو اتسألت عن الـ slide امشي على رقم الدكتور 3.22، بس افهم الطريقة: إجمالي وقت الانتظار ÷ عدد اللي استنوا فعلًا.",
      "متوسط الوقت اللي الزبون بيقضيه في الـ system:<span class=\"ltr\">491 / 100 = <b>4.91 min</b><br>t̄ = w̄ + s̄ = 1.74 + 3.17 = 4.91 min</span>"
     ],
     "figH": {
      "ms-grocery-stats": "الـ 7 statistics محسوبين من الـ totals بتاعة الـ 100 customer"
     }
    },
    {
     "h": "المثال 1: البقالة، الـ histogram والتفسير",
     "pts": [
      "نتايج مفيدة للمدير، بس <b>لو طوّلنا الـ simulation run الدقة هتزيد</b> (slide 17).",
      "الرسمة (slide 17، <bdi>Histogram for the Average Customer Waiting Time</bdi>، متوسط 50 trial): الـ x axis هو متوسط وقت انتظار الزبون بالدقايق بخطوات 0.5 من 0 لحد أكبر من 4.5؛ والـ y axis هو عدد مرات الحدوث (عدد الـ trials) من 0 لـ 18. وأطوال الأعمدة في الـ table (مجموعها 50 trial)؛ وأطول عمودين 17 و 15.",
      "شوية تفسيرات (slide 17):<br>• متوسط وقت الانتظار <b>مش عالي</b>.<br>• الـ server <b>مش قاعد idle وقت زيادة عن اللزوم</b>؛ يعني عليه شغل كويس.<br>• <b>تقريبًا نص</b> الزباين لازم يستنوا (46%)."
     ],
     "figH": {
      "ms-wait-hist": "توزيع متوسط الـ waiting time على 50 trial"
     }
    },
    {
     "h": "المثال 2.2: البقالة بـ 20 زبون، التوزيعات والـ random digits",
     "pts": [
      "الـ lecture notes بتعمل simulation لنفس البقالة بـ <b>20 زبون</b> باستخدام random digits. ‡ (من الـ lecture notes)",
      "الاحتمالات في Table 2.1 فيها 3 significant digits، فبنستخدم random numbers من <b>تلات digits</b> (1000 قيمة، من 001 لحد 000)؛ والدقيقة الواحدة (<bdi>p = 0.125</bdi>) بتاخد 125 منهم: <b><bdi>001–125</bdi></b>. أما Table 2.2 فمحتاجة random numbers من <b>رقمين</b> بس. ‡ (من الـ lecture notes)",
      "محتاجين <b>19</b> random number بس للأوقات بين الوصول (لـ 20 زبون)، لأن أول وصول عند الزمن 0. ‡ (من الـ lecture notes)",
      "الاستخدام: ندوّر على الـ range اللي فيه الـ random digits ونقرا القيمة. مثلًا الـ digits <b>913</b> واقعة في <bdi>876–000</bdi> يعني <b>8 دقايق</b>. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-digit-lookup": "من الـ random digits للوقت عن طريق الـ ranges في الـ Table 2.1 والـ Table 2.2"
     }
    },
    {
     "h": "المثال 2.2: الـ interarrival والـ service times المتولدة (Tables 2.3 و 2.4)",
     "pts": [
      "الـ Tables 2.3 و 2.4 بتوع الـ notes مع بعض: الـ random digits والأوقات المتولدة لكل زبون. ‡ (من الـ lecture notes)",
      "‡ ملحوظة: للزبون 15 الـ notes بتدي service digits <b>79</b> و service time <b>5</b>، بس حسب Table 2.2 الـ 79 واقعة في <bdi>61–85</bdi> ودي بتدي <b>4</b> دقايق (الزبون 13 عنده نفس الـ digits 79 وخد 4). والـ simulation table بتاع الـ notes (Table 2.5) بيستخدم 5، فسيبناها هنا عشان نطلع نفس الـ table بتاع الـ notes ونفس الـ totals."
     ]
    },
    {
     "h": "المثال 2.2: الـ simulation table (Table 2.5)",
     "pts": [
      "الزبون 1 بيوصل عند الزمن 0، والخدمة بتبدأ على طول وتخلص عند 4؛ فالزبون قعد في الـ system 4 دقايق. ‡ (من الـ lecture notes)",
      "الزبون 2 بيوصل عند الزمن 8، يعني الـ server كان <b>idle لمدة 4 دقايق</b> <bdi>(8 − 4)</bdi>. ‡ (من الـ lecture notes)",
      "الزبون 4 بيوصل عند 15 بس مش هيتخدم غير عند 18 (الزبون 3 بيخلص عند 18)، فبيستنى <b>3 دقايق</b>. ‡ (من الـ lecture notes)",
      "كل صف في الـ table اللي تحت اتحسب تاني بمعادلات الـ model بتاع البقالة؛ وطابق الـ notes بالظبط ‡ (من الـ lecture notes). والـ totals:<span class=\"ltr\">service 68 · waiting 56 · time in system 124 · idle 18 · last service ends at 86</span>"
     ],
     "figH": {
      "ms-grocery20": "الـ grocery بـ 20 customer، واحد ورا التاني، ومعاها الـ statistics"
     }
    },
    {
     "h": "المثال 2.2: الإحصائيات",
     "pts": [
      "(1) متوسط وقت الانتظار:<span class=\"ltr\">56 / 20 = <b>2.8 min</b></span>‡ (من الـ lecture notes)",
      "(2) احتمال إن الزبون يستنى:<span class=\"ltr\">13 / 20 = <b>0.65</b></span>لأن 13 زبون وقت انتظارهم أكبر من 0. ‡ (من الـ lecture notes)",
      "(3) احتمال إن الـ server يبقى idle:<span class=\"ltr\">18 / 86 = <b>0.21</b></span>واحتمال إنه busy:<span class=\"ltr\">1 − 0.21 = <b>0.79</b></span>‡ (من الـ lecture notes)",
      "(4) متوسط الـ service time:<span class=\"ltr\">68 / 20 = <b>3.4 min</b></span>والـ expected service time هو <bdi>E(S) = 3.2 min</bdi>، يعني أقل شوية. وكل ما الـ simulation تطول، المتوسط بيقرب أكتر من الـ E(S). ‡ (من الـ lecture notes)",
      "(5) متوسط الوقت بين الوصول:<span class=\"ltr\">82 / 19 = <b>4.3 min</b></span>وطرحنا واحد لأن أول وصول عند الزمن 0. والقيمة المتوقعة أعلى شوية:<span class=\"ltr\">E(A) = (1 + 8)/2 = <b>4.5 min</b></span>‡ (من الـ lecture notes)",
      "(6) متوسط الانتظار للي استنوا بس:<span class=\"ltr\">56 / 13 = <b>4.3 min</b></span>‡ (من الـ lecture notes)",
      "(7) متوسط الوقت في الـ system:<span class=\"ltr\">124 / 20 = <b>6.2 min</b><br>2.8 + 3.4 = 6.2 min</span>يعني الانتظار + الخدمة. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "المثال 2.3: مشكلة الـ carhops بتوع Able و Baker، التوزيعات",
     "pts": [
      "مطعم drive in فيه <b>carhops</b> بياخدوا الأوردر ويجيبوا الأكل لحد العربية. فيه اتنين carhops هما <b>Able</b> (الأسرع) و<b>Baker</b>. ده مثال فيه <b>أكتر من service channel</b> (يعني 2 servers). ‡ (من الـ lecture notes)",
      "قاعدة للتبسيط: <b>لو الاتنين فاضيين، Able ياخد الزبون</b> (عنده أقدمية seniority). ولو واحد بس فاضي هو اللي يخدم؛ ولو الاتنين مشغولين العربية تستنى أول واحد يفضى. ‡ (من الـ lecture notes)",
      "المطلوب: نعرف الترتيب الحالي شغال كويس قد إيه عن طريق simulation لـ <b>60 دقيقة</b> شغل. ‡ (من الـ lecture notes)",
      "فيه events أكتر من الـ single server queue:<br>• زبون يوصل<br>• زبون يبدأ خدمة عند Able<br>• زبون يخلص خدمة عند Able<br>• زبون يبدأ خدمة عند Baker<br>• زبون يخلص خدمة عند Baker ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "المثال 2.3: الـ simulation table بتاع Able و Baker (Table 2.9)",
     "pts": [
      "الـ service digits بنقراها من الـ table بتاع Able (2.7) أو الـ table بتاع Baker (2.8)، حسب مين اللي هيخدم العربية. ‡ (من الـ lecture notes)",
      "صفوف كأمثلة: الزبون 2 بيوصل عند 2 و Able مشغول (لحد 5)، فـ Baker هو اللي يخدم (الـ digits 21 يعني 3 دقايق، ويخلص عند 5). والزبون 6 بيوصل عند 14؛ و Able بيفضى عند 15 و Baker عند 18، فالعربية بتستنى دقيقة واحدة لـ Able. ‡ (من الـ lecture notes)",
      "الزبون 15 بيوصل عند 33؛ والاتنين Able و Baker مشغولين لحد 35، فـ Able (بالأقدمية) ياخده عند 35: يعني يستنى دقيقتين. ‡ (من الـ lecture notes)",
      "كل صف اتحسب تاني بالقواعد دي؛ وطابق الـ notes (Able مشغول 56 دقيقة، و Baker مشغول 43 دقيقة، وإجمالي الانتظار 11 دقيقة، و 9 عربيات استنوا، وآخر خدمة بتخلص عند 62). ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-able-baker": "الـ Able والـ Baker بيخدموا الـ 26 عربية، وكل واحد فيهم كان مشغول قد إيه"
     }
    },
    {
     "h": "المثال 2.3: تحليل Able و Baker",
     "pts": [
      "من فترة الـ <b>62 دقيقة</b>، Able كان مشغول:<span class=\"ltr\">56 / 62 = <b>90%</b></span>من الوقت. ‡ (من الـ lecture notes)",
      "أما Baker فكان مشغول:<span class=\"ltr\">43 / 62 = <b>69%</b></span>من الوقت. ‡ (من الـ lecture notes)",
      "متوسط وقت الانتظار لكل الـ 26 زبون:<span class=\"ltr\">11 / 26 = <b>0.42 minute</b></span>يعني حوالي 25 ثانية، وده صغير جدًا. ‡ (من الـ lecture notes)",
      "<b>تسع</b> زباين اضطروا يستنوا، بمتوسط:<span class=\"ltr\">11 / 9 = <b>1.22 minutes</b></span>وده قليل كمان. ‡ (من الـ lecture notes)",
      "عمومًا الـ system شكله <b>متوازن (well balanced)</b>؛ يعني server واحد مش هيقدر يخدم كل الزباين، وتلاتة غالبًا هيبقوا كتير. ولو زودنا server الانتظار هيقل لحد قرب الصفر، بس التكلفة هتبقى عالية أوي. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "الـ Inventory systems: الـ <bdi>(M, N)</bdi> model",
     "pts": [
      "الـ Slide 18 بتفتح <bdi><b>Example 2: Inventory System</b></bdi>؛ والـ slides 19 و 20 عنوانهم <bdi><b>Example 3: Inventory System</b></bdi>. ‡ ملحوظة: نفس المثال مترقّم 2 في الـ slide 18 و 3 في الـ slides من 19 لـ 20 (والـ contents slide فيها مثالين بس: A Grocery و Inventory System).",
      "الـ inventory systems <b>نوع مهم من مشاكل الـ simulation</b>. ومقياس الأداء هو <b>الـ total cost (أو الـ total profit)</b> (slide 19).",
      "الـ Parameters (slide 19):<br>• الـ <b>N</b>: طول الـ review period<br>• الـ <b>M</b>: الـ standard inventory level<br>• الـ <b>Q<sub>i</sub></b>: كمية الـ order رقم i عشان نملا لحد M",
      "عند كل review (كل N وحدة زمن) بنشيك على الـ inventory ونعمل order يرجّعه لحد M. وفي نسخة الـ notes الـ lead time (الوقت بين ما نطلب الـ order ونستلمه) بيساوي صفر. ‡ (من الـ lecture notes)",
      "الرسمة (slide 19، الـ inventory chart؛ والـ Fig 2.9 في الـ notes <bdi>Probabilistic order-level inventory system</bdi>): كمية الـ inventory I مقابل الزمن T. المستوى بيقل خلال كل period طولها N، وبعدين بيقفز تاني لحد الخط المتقطع M بالـ orders <bdi>Q<sub>1</sub>, Q<sub>2</sub>, Q<sub>3</sub></bdi>. وفي الـ period التانية المستوى بينزل تحت الصفر (shortage) قبل ما Q<sub>2</sub> يوصل.",
      "في الـ notes الـ demand مرسوم كأنه uniform على طول الـ period، بس الـ demand الحقيقي بيتذبذب؛ ممكن الطلبات كلها تيجي في أول الـ cycle، أو الـ lead time يبقى random. والوحدات الناقصة بتبقى <b>backordered</b>: لما الـ order يوصل، الـ backorders بتتغطى الأول. ‡ (من الـ lecture notes)",
      "الـ Events في <bdi>(M, N)</bdi> inventory system (slide 20):<br>• الـ Demand على الأصناف<br>• الـ Review للـ inventory<br>• استلام order في آخر كل review<br>ولو الـ lead time بصفر، آخر اتنين بيحصلوا في نفس الوقت (inventory slide 3).",
      "عشان نتجنب الـ shortages محتاجين <b>buffer stock</b>. وتكلفة الـ stock (slide 20): <b>مساحة التخزين (storage space)</b> و<b>الحراسة (guards)</b>.",
      "تكاليف تانية مذكورة في الـ notes: الفوايد اللي بتدفعها على فلوس مستلفة عشان تشتري الأصناف؛ والـ reviews والمشتريات الكتير بتعمل <b>ordering cost</b>؛ وإن الـ inventory يبقى قليل ممكن يخسّرك <b>ثقة الزباين (loss of goodwill)</b>. ‡ (من الـ lecture notes)",
      "الـ inventory الأكبر بيقلل الـ shortages، بس لازم نوازن بين التكاليف عشان نقلل الـ total cost؛ والـ total cost (أو الـ profit) بيتأثر بتغيير M و N. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-mn-chart": "رسمة الـ inventory system اللي بيشتغل بـ M و N، بتترسم فترة ورا فترة"
     }
    },
    {
     "h": "المثال 2.4: مشكلة بياع الجرايد",
     "pts": [
      "مشكلة inventory كلاسيكية: البياع <b>بيشتري الجرنان بـ 33 cents</b> و<b>بيبيعه بـ 50 cents</b>. والجرايد اللي ما تتباعش آخر اليوم بتتباع <b>scrap بـ 5 cents</b>. والجرايد بتتشترى <b>bundles كل واحدة فيها 10</b> (يعني 50 أو 60 أو …). ‡ (من الـ lecture notes)",
      "فيه تلات أنواع أيام: <b>good</b> و<b>fair</b> و<b>poor</b> باحتمالات <b>0.35 و 0.45 و 0.20</b>. المطلوب: نلاقي أحسن عدد جرايد نشتريه؛ ونعمل simulation للـ demand لمدة <b>20 يوم</b> ونسجل الربح كل يوم. ‡ (من الـ lecture notes)",
      "الربح الضايع من الـ demand الزيادة:<span class=\"ltr\">50 − 33 = <b>17 cents</b></span>لكل جرنان اتطلب ومكانش موجود. والـ salvage هو 5 cents لكل جرنان scrap. ملحوظة:<span class=\"ltr\">$1 = 100 cents</span>‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "المثال 2.4: توزيع الـ random digits (Tables 2.11 و 2.12)",
     "pts": [
      "نوع اليوم (Table 2.11):<span class=\"ltr\">Good 0.35 (cumulative 0.35) → digits <b>01–35</b><br>Fair 0.45 (0.80) → <b>36–80</b><br>Poor 0.20 (1.00) → <b>81–00</b></span>‡ (من الـ lecture notes)",
      "الـ demand digits بنقراها من الـ column بتاع نوع اليوم ده (Table 2.12 تحت). ‡ (من الـ lecture notes)",
      "الحل بالـ simulation محتاج نحدد <b>policy</b> (نشتري عدد معين كل يوم)، ونعمل simulation للـ demand لمدة 20 يوم عشان نطلع الـ total profit، وبعدين نغير الـ policy ونعيد لحد ما نوصل لأحسن قيمة. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "المثال 2.4: الـ simulation table لـ 70 جرنان (Table 2.13)",
     "pts": [
      "الـ Policy: نشتري <b>70</b> جرنان في اليوم؛ والتكلفة:<span class=\"ltr\">70 × $0.33 = <b>$23.10</b> per day</span>‡ (من الـ lecture notes)",
      "اليوم 1: الـ demand بـ 60، والـ revenue:<span class=\"ltr\">60 × $0.50 = $30</span>وفضل 10 جرايد، والـ salvage:<span class=\"ltr\">10 × $0.05 = $0.50</span>والربح:<span class=\"ltr\">Profit = $30.00 − $23.10 − 0 + $0.50 = <b>$7.40</b></span>‡ (من الـ lecture notes)",
      "اليوم 5: الـ demand بـ 90 وده أكبر من 70، فالـ revenue بـ $35؛ وكان ممكن نبيع 20 زيادة، فالـ lost profit:<span class=\"ltr\">20 × $0.17 = $3.40</span>والربح:<span class=\"ltr\">Profit = $35.00 − $23.10 − $3.40 + 0 = <b>$8.50</b></span>‡ (من الـ lecture notes)",
      "الإجمالي لـ 20 يوم:<span class=\"ltr\">$645.00 − $462.00 − $13.60 + $5.50 = <b>$174.90</b><br>462.00 = 20 × 23.10</span>وكل صف تحت اتحسب تاني وطابق الـ notes. ‡ (من الـ lecture notes)",
      "الـ simulation بتتعاد لـ policies تانية (60 أو 80 أو …) وأحسن policy بنعرفها بمقارنة الأرباح. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-newspaper": "بياع الجرايد في الـ 20 يوم وهو بيشتري 70 جرنال، ومعاها policies تانية"
     }
    },
    {
     "h": "المثال 2.5: الـ <bdi>(M, N)</bdi> inventory simulation، المدخلات",
     "pts": [
      "الـ <b>M بـ 11</b> وحدة (أقصى مستوى للـ inventory)، والـ review period <b>N بـ 5</b> أيام. الهدف: نقدّر <b>متوسط الوحدات الفاضلة في الـ inventory آخر اليوم (average ending units in inventory)</b> و<b>عدد الأيام اللي حصل فيها shortage</b>. ‡ (من الـ lecture notes)",
      "الـ orders بتتعمل <b>آخر اليوم (close of business)</b> وبتوصل <b>أول اليوم (beginning of business)</b>، حسب الـ lead time. والـ order quantity:<span class=\"ltr\">Order quantity = M − ending inventory (+ any backordered shortage)</span>‡ (من الـ lecture notes)",
      "الـ simulation بتبدأ بـ inventory <b>3 وحدات</b> و order بـ <b>8 وحدات</b> هيوصل بعد يومين. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "المثال 2.5: الـ simulation table (Table 2.16)",
     "pts": [
      "معروض خمس cycles بس. الـ order بتاع الـ 8 وحدات بيوصل الصبح في اليوم 3 من الـ cycle 1، فالـ inventory بيطلع من 1 لـ 9. ‡ (من الـ lecture notes)",
      "آخر الـ cycle 1: الـ ending inventory بـ 2، فالـ order:<span class=\"ltr\">11 − 2 = <b>9</b> units</span>والـ lead time digit بـ 5 يعني يوم واحد؛ فبيتضاف الصبح في اليوم 2 من الـ cycle 2:<span class=\"ltr\">2 + 9 = 11</span>‡ (من الـ lecture notes)",
      "الـ order بتاع الـ cycle 2 كان 9 وحدات بالـ digit 0 يعني 3 أيام، فبيوصل في اليوم 4 من الـ cycle 3. وفي الوقت ده الـ cycle 3 بيخلص اللي عنده: shortage بـ 2 في اليوم 2، وبـ 4 (تراكمي، backordered) في اليوم 3. وفي اليوم 4 الـ 9 وحدات بيوصلوا (الـ beginning inventory بـ 9)، والـ 4 الـ backordered بيتغطوا الأول، والـ demand بـ 1، فبيفضل:<span class=\"ltr\">9 − 4 − 1 = 4</span>‡ (من الـ lecture notes)",
      "كل صف تحت اتحسب تاني؛ وطابق الـ notes. ومتوسط الـ ending inventory:<span class=\"ltr\">88 / 25 ≈ <b>3.5 units</b></span>وكان فيه shortage في <b>يومين من 25</b>. ‡ (من الـ lecture notes)",
      "عشان نقدّر الـ mean ending inventory كويس لازم نعمل simulation لـ cycles كتير، ونغير M و N. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-mn-sim": "الـ inventory بتاع المثال 2.5 (بـ M و N) يوم بيوم"
     }
    },
    {
     "h": "الـ Simulation of inventory systems: الـ review والـ events",
     "pts": [
      "أول slide في الـ inventory deck عنوانها <b>Simulation of Inventory Systems</b>، للدكتور <bdi>Dr. Mohammed AbdelFattah</bdi>.",
      "الـ inventory systems نوع مهم من الـ simulation. الـ inventory system فيه <b>periodic review طولها N</b>، وعندها بنشيك على مستوى الـ inventory؛ و<b>بنعمل order يرجّع الـ inventory لحد المستوى M</b> (inventory slide 2، وفيها نفس الـ chart بتاع I مقابل الزمن اللي في الـ slide 19).",
      "في <bdi>(M, N)</bdi> inventory system الـ events هي (inventory slide 3):<br>• الـ demand<br>• الـ review لوضع الـ inventory<br>• استلام order في آخر كل review period<br>ولو <b>الـ lead time بصفر</b>، الـ review والاستلام بيحصلوا <b>في نفس اللحظة</b>. والـ slide مكتوب فيها <bdi>.M;N/</bdi>، ودي غلطة في الـ font والمقصود <bdi>(M, N)</bdi>."
     ]
    },
    {
     "h": "الـ Inventory: الهدف والتكاليف",
     "pts": [
      "الـ <b>Objective</b>: نقلل الـ <b>total cost (Tc)</b> بالنسبة للـ <b>reorder point (r)</b> والـ <b>order quantity (x)</b> (inventory slide 4).",
      "الـ total cost فيه تلات تكاليف:<br>(1) الـ <b>Holding cost (Hc)</b>: بـ $0.10 لكل وحدة في اليوم.<br>(2) الـ <b>Order cost (Oc)</b>: بـ $20 لكل order.<br>(3) الـ <b>Shortage cost (Sc)</b>: بـ $50 لكل وحدة.",
      "افتراض (متعلّم عليه في الـ slide): <b>عمرنا ما هنحتاج يبقى فيه اتنين orders لسه ما وصلوش (outstanding) في نفس الوقت</b>."
     ]
    },
    {
     "h": "الـ Inventory: توزيع الـ lead time",
     "pts": [
      "أول probabilistic component (inventory slide 5): الـ <b>lead time (L)</b>، وهو الوقت بين ما نعمل الـ order ووصوله، وده الـ frequency distribution بتاعه (30 observation).",
      "الـ relative frequency هي الـ frequency على 30 (مثلًا <bdi>12 / 30 = 0.40</bdi>)؛ والـ cumulative هي المجموع التراكمي.",
      "الـ random number intervals للـ lead time (الطرف الأصغر داخل في الـ interval):<span class=\"ltr\">0.00 to 0.19999 → 1 day<br>0.20 to 0.29999 → 2 days<br>0.30 to 0.69999 → 3 days<br>0.70 to 0.89999 → 4 days<br>0.90 to 0.99999 → 5 days</span>يعني <bdi>R = 0.620</bdi> بيدي 3 أيام، و <bdi>R = 0.939</bdi> بيدي 5 أيام (في الـ table بتاع الـ 10 أيام). ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "الـ Inventory: توزيع الـ daily demand",
     "pts": [
      "تاني probabilistic component (inventory slide 6): الـ <b>daily demand (d)</b>، من بيانات 300 يوم.",
      "الـ random number R بنحطه في interval من الـ cumulative column (الطرف الأصغر داخل في الـ interval):<span class=\"ltr\">0.00 to 0.49999 → 0<br>0.50 to 0.74999 → 1<br>0.75 to 0.89999 → 2<br>0.90 to 0.94999 → 3<br>0.95 to 0.99999 → 4</span>مثلًا <bdi>R = 0.093</bdi> بيدي 0، و <bdi>R = 0.866</bdi> بيدي 2، و <bdi>R = 0.975</bdi> بيدي 4. ‡ (من الـ lecture notes؛ والـ notes كاتبة الـ interval بتاع الـ demand 3 كده <bdi>0.90 to 0.49999</bdi>، ودي غلطة مطبعية والصح <bdi>0.90 to 0.94999</bdi>)"
     ],
     "figH": {
      "ms-r-lookup": "من الـ random number R للـ daily demand أو للـ lead time"
     }
    },
    {
     "h": "الـ Inventory: مكونات الـ model والـ process اليومي",
     "pts": [
      "مكونات الـ Model (inventory slide 7):<br>• الـ Inventory level (I): <b><bdi>I₀ = 5 units</bdi></b><br>• الـ Order quantity (x): <b><bdi>x = 5 units</bdi></b><br>• الـ Reorder point (r): <b><bdi>r = 3 units</bdi></b><br>• الـ Daily demand (d)<br>• الـ Total cost (Tc)",
      "الرسمة (inventory slide 8، الـ daily simulation process):<span class=\"ltr\"><b>Begin Day</b> → <b>Any arrivals?</b> (yes → <b>Update inventory I = I + x</b>) → <b>Generate daily demand d</b> → <b>Can inventory satisfy demand (I ≥ d)?</b></span>",
      "لو الإجابة No:<span class=\"ltr\"><b>Compute shortage cost $50 (d − I)</b> → <b>Update inventory I = 0</b></span>ولو Yes:<span class=\"ltr\"><b>Update inventory I = I − d</b></span>ملحوظة: الـ slide كاتبة <bdi>%50</bdi> بدل $50، والسهم اللي طالع من <bdi>I = 0</bdi> داخل على صندوق <bdi>I = I − d</bdi>؛ وفي الـ table المحلول يوم الـ shortage بيخلص ببساطة بـ <bdi>I = 0</bdi>.",
      "بعد كده:<span class=\"ltr\"><b>Has reorder point been reached (I ≤ r)?</b> → Yes → <b>Is an order currently outstanding?</b> → No → <b>Place an order (cost = $20)</b> → <b>Generate lead time L</b></span>والـ slide كاتبة <bdi>Land Time</bdi> بدل lead time. وكل المسارات بتروح لـ:<span class=\"ltr\"><b>Compute holding cost (0.10)(I)</b> → <b>Compute total daily cost</b></span>",
      "معاني الرموز (Legend):<span class=\"ltr\">I = inventory level<br>x = order quantity<br>r = reorder point<br>d = daily demand</span>"
     ],
     "figH": {
      "ms-inv-flow": "الـ flowchart اليومي للـ inventory، وبنمشي فيه لكل يوم في المثال"
     }
    },
    {
     "h": "الـ Inventory: الـ simulation لـ 10 أيام بـ <bdi>(r = 3, x = 5)</bdi>",
     "pts": [
      "الـ Inventory slide 9 بتعمل simulation لـ 10 أيام. أول column فيه random numbers بيدينا الـ demand، والتاني بيدينا الـ lead time لما نعمل order.",
      "اليوم 4: الـ demand بـ 1 فبيفضل 3، وده يساوي r، ومفيش order outstanding، فنعمل order ($20)؛ و <bdi>R = 0.620 ≤ 0.7</bdi> يعني lead time بـ <b>3</b>، فالـ 5 وحدات بيوصلوا أول اليوم 7.",
      "اليومين 5 و 6: الـ inventory عند r أو أقل، بس فيه order outstanding، فمفيش order جديد. واليوم 6: البداية 1، والـ demand بـ 4 <bdi>(R = 0.975)</bdi>، فالـ shortage <bdi>3 units × $50 = <b>$150</b></bdi>، و <bdi>I = 0</bdi>.",
      "اليوم 8: الـ inventory بـ 2 وده أقل من أو يساوي 3، ومفيش order outstanding، فنعمل order ($20)؛ و <bdi>R = 0.939</bdi> يعني lead time بـ <b>5</b>.",
      "المتوسطات لـ 10 أيام:<span class=\"ltr\">holding 2.70 / 10 = <b>0.27</b><br>order 40 / 10 = <b>4.00</b><br>shortage 150 / 10 = <b>15.00</b><br>total 192.70 / 10 = <b>$19.27</b> per day</span>وكل صف تحت اتحسب تاني وطابق الـ slide.",
      "‡ ملحوظة: الـ slide كاتبة الـ order cost بتاع اليوم 5 <bdi>000</bdi>؛ والمقصود 0.00."
     ],
     "figH": {
      "ms-inv10": "الـ inventory simulation على 10 أيام بالتكاليف اليومية، وجرّب r و x من عندك"
     }
    },
    {
     "h": "الـ Inventory: نتايج 1000 يوم، <bdi>5 ≤ x ≤ 50</bdi> و <bdi>1 ≤ r ≤ 10</bdi>",
     "pts": [
      "برنامج simulation على الكمبيوتر (simulator) بيجرب order quantities و reorder points كتير على عدد كبير من الأيام (inventory slide 10). والقيم هي متوسط الـ total cost اليومي.",
      "أحسن خانة متعلّم عليها: <b>الـ reorder level <bdi>r = 6</bdi></b> و<b>الـ order quantity <bdi>x = 20</bdi></b>، ومتوسط التكلفة <b>2.10</b> (أصغر قيمة في الـ table).",
      "‡ ملحوظة: الـ lecture notes بتطبع نفس الـ table بس فيه خانتين مختلفين (<bdi>r = 4, x = 5: 0.90</bdi> و <bdi>r = 6, x = 20: 2.60</bdi>)، وبتقول في الكلام إن أقل تكلفة عند <bdi>x = 25, r = 6</bdi> بـ $2.39، ودي قيمة مش موجودة في الـ table (الـ table فيه 3.39). امشي على الـ slide: <bdi>r = 6, x = 20</bdi> بتكلفة 2.10."
     ],
     "figH": {
      "ms-cost-grid": "متوسط التكلفة اليومية لكل reorder level وكل order quantity"
     }
    },
    {
     "h": "الـ Inventory: نتايج أدق، <bdi>21 ≤ x ≤ 30</bdi>",
     "pts": [
      "الـ Inventory slide 11 بتدقق البحث لـ 1000 يوم في <bdi>21 ≤ x ≤ 30</bdi> (العنوان بيقول <bdi>1 ≤ r ≤ 10</bdi>، بس المعروض r من 4 لـ 8 بس). والـ slide بتعلّم على <b><bdi>r = 6, x = 22</bdi></b> بتكلفة <b>2.33</b> إنها الأحسن.",
      "‡ ملحوظة: الـ table فيه كمان <b>2.32</b> عند <bdi>r = 7, x = 29</bdi>، وده أقل من الـ 2.33 المتعلّم عليها؛ فبأرقام الـ table نفسه <bdi>(r = 7, x = 29)</bdi> هو الأصغر. والفرق صغير جدًا وجوا حدود الـ simulation noise.",
      "الـ Inventory slide 12: النهاية (END)."
     ],
     "figH": {
      "ms-cost-fine": "البحث الأدق: الخانة اللي الـ slide اختارتها وأقل قيمة في الجدول"
     }
    },
    {
     "h": "الـ Appendix: الـ random digits",
     "pts": [
      "الـ Slide 21 بتفتح الـ Appendix بتاع الـ Random digits. والـ slide 22 عن <b>إزاي نطلع random numbers من random digits</b>.",
      "نختار رقم بشكل random من الـ table، مثلًا:<br>• رقم واحد (one digit) يدينا <b>0.9</b><br>• رقمين (two digits) يدونا <b>0.19</b><br>• تلات أرقام (three digits) يدونا <b>0.219</b>",
      "وبعدين نمشي في <b>اتجاه ثابت (systematic direction)</b>، مثلًا الأول لتحت وبعدين يمين، أو الأول لفوق وبعدين شمال.",
      "الرسمة (slide 22) وهي table فيه مجموعات random digits كل واحدة خمس أرقام؛ وفيه سهم بيشاور على الخانة المتعلّم عليها <b>99219</b>، ودي نقطة البداية للأمثلة اللي فوق (الـ 0.9 والـ 0.19 والـ 0.219 هما آخر رقم وآخر رقمين وآخر تلات أرقام فيها)."
     ],
     "figH": {
      "ms-rand-digits": "إزاي نطلّع random numbers من جدول الـ random digits"
     }
    },
    {
     "h": "الملخص",
     "pts": [
      "الـ chapter ده عرّفنا مفاهيم الـ simulation عن طريق <b>أمثلة</b> (slide 23).",
      "أمثلة الـ simulation اتعملت <b>على table بالإيد</b>:<br>• استخدم <b>spreadsheet</b> للتجارب الكبيرة (Excel و OpenOffice).<br>• الـ <b>Input data مهمة</b>.<br>• ممكن نستخدم <b>random variables</b>.<br>• الـ <b>Output analysis</b> مهم وصعب.<br>• الـ tables اللي استخدمناها كانت <b>ad hoc</b>؛ ومحتاجين طريقة منهجية أكتر."
     ]
    }
   ],
   "cards": [
    "(1) نحدد الـ characteristics بتاعة كل input.<br>(2) نبني table فيه p inputs x<sub>ij</sub> و response واحد y<sub>i</sub>.<br>(3) لكل repetition i، نولّد الـ p inputs ونحسب y<sub>i</sub>.",
    "الـ Calling population والـ arrival rate والـ service mechanism والـ system capacity والـ queueing discipline.",
    "الـ Stable: لما الـ arrival rate يبقى أقل من الـ service rate. غير كده الطابور بيكبر من غير حد (unstable).",
    "عدد الـ units في الـ system، وحالة الـ server (idle أو busy).",
    "وصول unit (arrival) وخروج unit (departure).",
    "لو الـ server فاضي (idle) الـ unit بتاخد الخدمة؛ غير كده بتدخل الـ queue.",
    "لو الـ queue مش فاضية نبدأ نخدم الـ unit اللي بعدها؛ غير كده الـ server يبقى idle.",
    "الـ Finite: الـ arrival rate بيعتمد على عدد الزباين اللي في الـ system فعلًا. الـ Infinite: الـ arrival rate مش بيتأثر (بنفترضه ثابت).",
    "لما الـ capacity تبقى محدودة: الـ arrival rate هو عدد اللي بيوصلوا في وحدة الزمن؛ والـ effective rate هو اللي بيوصلوا <b>وبيدخلوا</b> في وحدة الزمن.",
    "الـ Balk: يمشي عشان الطابور طويل أوي. الـ Renege: يمشي بعد ما استنى عشان الطابور ماشي ببطء. الـ Jockey: ينقل من طابور لطابور.",
    "الـ FIFO والـ LIFO والـ SIRO (<bdi>service in random order</bdi>) والـ SPT (<bdi>shortest processing time first</bdi>) والـ PR (priority).",
    "الـ A هو توزيع الـ interarrival، والـ B توزيع الـ service، والـ c عدد الـ parallel servers، والـ N الـ system capacity، والـ K حجم الـ calling population. والرموز:<span class=\"ltr\">M = exponential (Markov)<br>D = deterministic<br>E<sub>k</sub> = Erlang k<br>GI = general independent</span>",
    "بنختار الأكبر بين وقت وصوله ووقت ما الزبون اللي قبله خلص:<span class=\"ltr\">MAX(Arrival time(i), Time service ends(i−1))</span>",
    "الانتظار والوقت في الـ system:<span class=\"ltr\">Wait = service begins − arrival<br>Time in system = service ends − arrival = wait + service</span>",
    "لو الوصول جه بعد ما خدمة اللي قبله خلصت:<span class=\"ltr\">Arrival(i) − Service ends(i−1)</span>غير كده بيبقى 0.",
    "إجمالي الـ idle time على إجمالي مدة الـ simulation run. وفي البقالة:<span class=\"ltr\">101 / 418 = 0.24</span>",
    "مجموع الـ interarrival times على (عدد الوصول ناقص 1)؛ وبنطرح 1 لأن أول وصول عند الزمن 0. وفي البقالة:<span class=\"ltr\">415 / 99 = 4.19</span>",
    "القانون:<span class=\"ltr\">E = (a + b)/2</span>وفي الـ interarrival بتاع البقالة <bdi>{1 … 8}</bdi> بيطلع 4.5 min.",
    "بنضرب كل قيمة في احتمالها ونجمع:<span class=\"ltr\">Σ s·p(s) = 1(0.10) + 2(0.20) + 3(0.30) + 4(0.25) + 5(0.10) + 6(0.05) = 3.2 min</span>",
    "خد رقم أو رقمين أو تلاتة وحط قبلهم علامة عشرية <bdi>(0.9, 0.19, 0.219)</bdi>؛ وبعدين امشي في اتجاه ثابت في الـ table.",
    "الـ N هو طول الـ review period، والـ M هو الـ standard (maximum) inventory level، والـ Q<sub>i</sub> هو الـ order رقم i اللي بيملا لحد M.",
    "الـ Demand، والـ review للـ inventory، واستلام order في آخر كل review؛ ولو الـ lead time بصفر آخر اتنين بيحصلوا مع بعض.",
    "القانون:<span class=\"ltr\">Tc = Hc + Oc + Sc</span>والـ holding بـ $0.10 للوحدة في اليوم، والـ order بـ $20 للـ order الواحد، والـ shortage بـ $50 للوحدة؛ وبنقلل التكلفة على r و x.",
    "القانون:<span class=\"ltr\">Profit = revenue − cost − lost profit from excess demand + salvage</span>بيشتري بـ 33¢ وبيبيع بـ 50¢ والـ scrap بـ 5¢، والـ lost profit بـ 17¢ لكل جرنان اتطلب ومكانش موجود.",
    "لو الـ carhops الاتنين فاضيين، Able (بالأقدمية) ياخد العربية؛ وفي الـ run بتاع الـ 62 دقيقة Able كان مشغول 90% و Baker كان مشغول 69%."
   ],
   "qa": [
    "(1) نحدد الـ characteristics بتاعة كل input في الـ simulation.<br>(2) نبني simulation table فيه p inputs x<sub>ij</sub> و response واحد y<sub>i</sub>:<span class=\"ltr\">j = 1, …, p<br>i = 1, …, n</span>(3) لكل repetition i، نولّد قيمة لكل واحد من الـ p inputs x<sub>ij</sub> ونحسب الـ response y<sub>i</sub>.<br>الـ table فيه column اسمه Repetition i، و columns للـ inputs من x<sub>i1</sub> لحد x<sub>ip</sub>، و column للـ Response y<sub>i</sub>؛ والـ header هو static meta data، والـ rows من 1 لحد n هي dynamic data بتتولد أثناء الـ run. وممكن يتعمل بالورقة والقلم أو على spreadsheet.",
    "الـ queueing system بيتوصف بالـ <b>calling population</b> والـ <b>arrival rate</b> والـ <b>service mechanism</b> والـ <b>system capacity</b> والـ <b>queueing discipline</b>.<br>الـ <b>Calling population</b>: الزباين المحتملين؛ ممكن تبقى finite (الـ arrival rate بيعتمد على عدد اللي في الـ system فعلًا، زي 5 مكن tire curing وعامل واحد) أو infinite (الـ arrival rate مش بيتأثر، زي زباين البنك).<br>الـ <b>System capacity</b>: الحد الأقصى للزباين في الطابور أو في الـ system (زي car wash فيها مكان لـ 10 عربيات) أو مفتوحة (زي تذاكر حفلة للطلبة)؛ ولما يبقى فيه حد، الـ arrival rate بيختلف عن الـ effective arrival rate.<br>الـ <b>Queue discipline</b>: الترتيب اللي بنختار بيه الزبون المستني لما الـ server يفضى، زي الـ FIFO والـ LIFO والـ SIRO والـ SPT والـ PR.",
    "الـ A هو توزيع الـ interarrival time، والـ B توزيع الـ service time، والـ c عدد الـ parallel servers، والـ N الـ system capacity، والـ K حجم الـ calling population. والرموز:<span class=\"ltr\">M = exponential (Markov)<br>D = deterministic<br>E<sub>k</sub> = Erlang of order k<br>GI = general independent</span>الـ <b><bdi>M/M/1</bdi></b> هو اختصار <bdi>M/M/1/∞/∞</bdi>: يعني interarrival و service times من نوع exponential، و server واحد، و capacity مفتوحة، و population لا نهائية.<br>الـ <b><bdi>G/G/1/5/5</bdi></b> (الـ system بتاع الـ tire curing): يعني توزيعات general، و server واحد (العامل)، و capacity بـ 5، و calling population من 5 مكن.",
    "أوقات الوصول:<span class=\"ltr\">Arrivals: 0, 2, 6, 7, 9, 15</span>والخدمة بتبدأ عند الأكبر بين الوصول وخلص اللي قبله:<span class=\"ltr\">Begins: 0, 2, 6, 9, 11, 15<br>Ends: 2, 3, 9, 11, 12, 19</span>والانتظار = البداية − الوصول:<span class=\"ltr\">Waiting: 0, 0, 0, 2, 2, 0 → total 4 → average 4/6 = <b>0.67 min</b></span>يعني 2 من 6 زباين استنوا.<br>الـ idle time: قبل الزبون 3 المدة <bdi>6 − 3 = 3</bdi>، وقبل الزبون 6 المدة <bdi>15 − 12 = 3</bdi>، فالمجموع <b>6 دقايق</b> من run طوله 19 دقيقة:<span class=\"ltr\">p(idle) = 6/19 = <b>0.32</b></span>والوقت في الـ system = النهاية − الوصول:<span class=\"ltr\">2, 1, 3, 4, 3, 4 → 17 → average 17/6 = <b>2.83 min</b><br>(= 0.67 + 13/6 = 0.67 + 2.17)</span>",
    "(1) الـ <b>Interarrival time (delay)</b> هو random number uniform لكل زبون.<br>(2) وقت الوصول:<span class=\"ltr\">Arrival time(i) = Arrival time(i−1) + delay(i)</span>ووقت وصول أول زبون بيساوي 0.<br>(3) الـ <b>Service time</b> هو random number uniform لكل زبون. ‡ (الـ slide 14 بتدي الـ service times احتمالات مش متساوية، فالحقيقة إن الـ interarrival time بس هو اللي uniform؛ والـ service time بيتولد من الـ distribution بتاعته.)<br>(4) بداية الخدمة:<span class=\"ltr\">Time service begins(i) = MAX(Arrival time(i), Time service ends(i−1))</span>(5) نهاية الخدمة:<span class=\"ltr\">Time service ends(i) = Time service begins(i) + Service time(i)</span>(6) الانتظار في الـ queue:<span class=\"ltr\">Waiting time in queue(i) = Time service begins(i) − Arrival time(i)</span>(7) الوقت في الـ system:<span class=\"ltr\">Time in system(i) = Time service ends(i) − Arrival time(i)</span>(8) الـ idle time بتاع الـ server:<span class=\"ltr\">Idle time of server(i) = Arrival time(i) − Time service ends(i−1)<br>if Arrival time(i) &gt; Time service ends(i−1), else 0</span>",
    "متوسط وقت الانتظار:<span class=\"ltr\">174/100 = <b>1.74 min</b></span>والـ P(wait):<span class=\"ltr\">46/100 = <b>0.46</b></span>والـ P(idle server):<span class=\"ltr\">101/418 = <b>0.24</b></span>ومتوسط الـ service time (والمتوقع <bdi>E(s) = 3.2 min</bdi>):<span class=\"ltr\">317/100 = <b>3.17 min</b></span>ومتوسط الوقت بين الوصول (والمتوقع <bdi>(1 + 8)/2 = 4.5 min</bdi>):<span class=\"ltr\">415/99 = <b>4.19 min</b></span>ومتوسط الانتظار للي استنوا بس (زي ما هو في الـ slide 16):<span class=\"ltr\">174/54 = <b>3.22 min</b></span>‡ الـ slide هنا بتستخدم 54 زبون استنوا، بس في الـ P(wait) بتستخدم 46؛ ولو استخدمنا 46 القيمة:<span class=\"ltr\">174/46 = 3.78 min</span>ومتوسط الوقت في الـ system:<span class=\"ltr\">491/100 = <b>4.91 min</b> = 1.74 + 3.17</span>",
    "متوسط وقت الانتظار:<span class=\"ltr\">56/20 = <b>2.8 min</b></span>والـ P(wait):<span class=\"ltr\">13/20 = <b>0.65</b></span>والـ P(idle)، يعني الـ P(busy) بـ <b>0.79</b>:<span class=\"ltr\">18/86 = <b>0.21</b></span>ومتوسط الـ service time (والـ <bdi>E(S) = 3.2</bdi>):<span class=\"ltr\">68/20 = <b>3.4 min</b></span>ومتوسط الوقت بين الوصول (والـ <bdi>E(A) = 4.5</bdi>):<span class=\"ltr\">82/19 = <b>4.3 min</b></span>ومتوسط الانتظار للي استنوا بس:<span class=\"ltr\">56/13 = <b>4.3 min</b></span>ومتوسط الوقت في الـ system:<span class=\"ltr\">124/20 = <b>6.2 min</b> = 2.8 + 3.4</span>",
    "التكلفة:<span class=\"ltr\">70 × 0.33 = $23.10</span>لما الـ demand يبقى 60: الـ revenue <bdi>60 × 0.50 = $30.00</bdi>؛ وفاضل 10 scrap <bdi>10 × 0.05 = $0.50</bdi>؛ ومفيش lost profit. والربح:<span class=\"ltr\">Profit = 30.00 − 23.10 − 0 + 0.50 = <b>$7.40</b></span>لما الـ demand يبقى 90: بنبيع 70 بس، والـ revenue بـ $35.00؛ و 20 اتطلبوا ومكانوش موجودين، فالـ lost profit <bdi>20 × 0.17 = $3.40</bdi>؛ ومفيش scrap. والربح:<span class=\"ltr\">Profit = 35.00 − 23.10 − 3.40 + 0 = <b>$8.50</b></span>وعلى الـ 20 يوم بتوع الـ notes:<span class=\"ltr\">645.00 − 462.00 − 13.60 + 5.50 = <b>$174.90</b></span>",
    "كل يوم بنمشي كده:<br>• لو فيه order وصل نزوّد الـ inventory <bdi>I = I + x</bdi>.<br>• نولّد الـ demand d.<br>• لو <bdi>I ≥ d</bdi> يبقى <bdi>I = I − d</bdi>؛ غير كده الـ shortage cost <bdi>50(d − I)</bdi> و <bdi>I = 0</bdi>.<br>• لو <bdi>I ≤ r</bdi> ومفيش order outstanding، نعمل order ($20) ونولّد الـ lead time بتاعه.<br>• الـ holding cost <bdi>0.10 × I</bdi>.<br>• التكلفة اليومية هي مجموع الـ holding والـ order والـ shortage.<br><b>اليوم 4</b>: البداية 4، و <bdi>R = 0.528</bdi> يعني <bdi>d = 1</bdi>، فالـ I بقى 3 وده ≤ r ومفيش order outstanding، فنعمل order بـ $20، و <bdi>R = 0.620</bdi> يعني lead time بـ 3؛ والـ holding بـ 0.30؛ والإجمالي <b>$20.30</b>.<br><b>اليوم 6</b>: البداية 1، و <bdi>R = 0.975</bdi> يعني <bdi>d = 4 &gt; 1</bdi>، فالـ shortage <bdi>3 × 50 = $150</bdi> و <bdi>I = 0</bdi>؛ والـ order لسه outstanding فمفيش order جديد؛ والـ holding بصفر؛ والإجمالي <b>$150.00</b>.<br>متوسطات الـ 10 أيام: الـ holding بـ 0.27 والـ order بـ 4.00 والـ shortage بـ 15.00، والإجمالي <b>$19.27</b>.",
    "طول الـ run هو 62 دقيقة (آخر خدمة خلصت عند 62). مجموع الـ service time بتاع Able هو 56:<span class=\"ltr\">56/62 = <b>0.90</b></span>وبتاع Baker هو 43:<span class=\"ltr\">43/62 = <b>0.69</b></span>وإجمالي الانتظار 11 دقيقة على 26 زبون (يعني حوالي 25 ثانية):<span class=\"ltr\">11/26 = <b>0.42 min</b></span>وتسع زباين استنوا:<span class=\"ltr\">11/9 = <b>1.22 min</b></span>الخلاصة: الـ system متوازن؛ server واحد مكانش هيقدر على كل العربيات، وتلاتة غالبًا كتير؛ ولو زودنا server الانتظار هيقرب من الصفر بس بتكلفة عالية.",
    "الـ <bdi>M = 11</bdi> و <bdi>N = 5</bdi> أيام؛ والـ demand اليومي والـ lead time random (Tables 2.14 و 2.15). الـ orders بتتعمل آخر اليوم عند كل review بكمية M ناقص الـ ending inventory (زائد الـ backorders)، وبتوصل أول اليوم بعد الـ lead time. والـ shortages بتبقى backordered وبتتغطى الأول لما الـ order يوصل.<br>البداية: inventory بـ 3، و order بـ 8 هيوصل بعد يومين (يعني في اليوم 3). وآخر الـ cycle 1: الـ inventory بـ 2، فالـ order بـ 9، والـ lead time يوم واحد، فبيوصل في اليوم 2 من الـ cycle 2.<br>على 5 cycles (25 يوم)، إجمالي الـ ending inventory بـ 88:<span class=\"ltr\">88/25 ≈ <b>3.5 units</b></span>وكان فيه shortage في <b>يومين من 25</b>. ومحتاجين cycles أكتر بكتير، وقيم M و N مختلفة، عشان نوصل لتقدير كويس.",
    "الـ <b>Queue discipline</b> هو الترتيب المنطقي للزباين في الـ queue؛ وهو اللي بيحدد مين يتخدم لما الـ server يفضى. الأنواع:<br>(1) الـ FIFO: اللي يدخل الأول يخرج الأول (<bdi>first in, first out</bdi>).<br>(2) الـ LIFO: اللي يدخل الآخر يخرج الأول (<bdi>last in, first out</bdi>).<br>(3) الـ SIRO: الخدمة بترتيب random (<bdi>service in random order</bdi>).<br>(4) الـ SPT: أقصر processing time الأول (<bdi>shortest processing time first</bdi>).<br>(5) الـ PR: خدمة بالأولوية (<bdi>priority service</bdi>).<br>وفي الـ job shop الـ discipline أحيانًا بيعتمد على الـ due dates والـ expected processing times."
   ],
   "quiz": [
    [
     "الـ arrival rate الأقل من الـ service rate ده شرط الـ system الـ stable، مش الـ unstable (L2, Simulation of Queueing Systems).",
     "صح. الـ arrival rate لو أقل من الـ service rate بيدي system من نوع STABLE؛ غير كده الطابور بيكبر من غير حد، وده unstable system (L2, Simulation of Queueing Systems)."
    ],
    [
     "ده واحد من الخمس حاجات (L2, Queueing systems: why simulate, and what describes them).",
     "ده واحد من الخمس حاجات (L2, Queueing systems: why simulate, and what describes them).",
     "ده واحد من الخمس حاجات (L2, Queueing systems: why simulate, and what describes them).",
     "صح. الـ review period N ده parameter في الـ <bdi>(M, N)</bdi> inventory system، مش في الـ queueing system."
    ],
    [
     "دول أجزاء من الـ system، مش الـ state بتاعته (L2, Single-server queue: assumptions, state and events).",
     "صح. زي ما هو مكتوب في الـ slide 9.",
     "دي الـ events اللي بتغيّر الـ state (L2, Single-server queue: assumptions, state and events).",
     "دي inputs (L2, Single-server queue: assumptions, state and events)."
    ],
    [
     "صح. الـ Departure event: لو الـ queue مش فاضية نبدأ نخدم الـ unit اللي بعدها، غير كده الـ server هيبقى idle (slide 10).",
     "الـ departure flow diagram <bdi>(L2, Arrival and departure events (flow diagrams))</bdi> ماشي كده:<span class=\"ltr\">Another unit waiting? No → Begin server idle time</span>"
    ],
    [
     "دي القيمة المتوسطة من الـ simulation <bdi>415/99</bdi> (L2, Example 1: A Grocery, statistics).",
     "صح. القانون:<span class=\"ltr\">E(τ) = (a + b)/2 = (1 + 8)/2 = 4.5</span>",
     "متوسط الـ uniform من 1 لـ 8 هو <bdi>(1 + 8)/2 = 4.5</bdi> (L2, Example 1: A Grocery, statistics).",
     "دي الـ expected service time E(s) (L2, Example 1: A Grocery, statistics)."
    ],
    [
     "دي القيمة المتوسطة من الـ simulation <bdi>317/100</bdi> (L2, Example 1: A Grocery, statistics).",
     "دي هتبقى المتوسط لو القيم الست كانت ليها نفس الاحتمال (L2, Example 1: A Grocery, statistics).",
     "صح. المجموع:<span class=\"ltr\">0.1 + 0.4 + 0.9 + 1.0 + 0.5 + 0.3 = 3.2</span>",
     "دي متوسط الـ 20 زبون <bdi>68/20</bdi> في الـ notes (L2, Example 2.2: statistics)."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">101 / 418 = 0.24</span>",
     "القسمة <bdi>101/317</bdi> بتستخدم الـ service time مش الـ run time (L2, Example 1: A Grocery, statistics).",
     "القسمة <bdi>101/100</bdi> بتقسم على عدد الزباين مش على الـ run time (L2, Example 1: A Grocery, statistics).",
     "دي نسبة الـ busy <bdi>1 − 0.24</bdi> (L2, Example 1: A Grocery, statistics)."
    ],
    [
     "كل الزباين بيتخدموا؛ السبب هو أول وصول (L2, Example 2.2: statistics).",
     "صح. أول زبون ملوش interarrival time، فعندنا <bdi>n − 1</bdi> interarrival times.",
     "الـ idle time ملوش دخل هنا (L2, Example 2.2: statistics).",
     "مفيش زبون بيعمل balk في المثال (L2, Example 2.2: statistics)."
    ],
    [
     "الـ Balking يعني يمشي أول ما يوصل عشان الطابور طويل أوي (L2, Arrival process, queue behavior and queue discipline).",
     "الـ Jockeying يعني ينقل لطابور تاني (L2, Arrival process, queue behavior and queue discipline).",
     "صح. الـ Renege يعني يمشي بعد ما وقف في الطابور لما يلاقيه ماشي ببطء.",
     "الـ <bdi>Pending</bdi> بتوصف زبون في finite population وهو برا الـ system (L2, Arrival process, queue behavior and queue discipline)."
    ],
    [
     "ده الـ c (L2, Queueing notation A/B/c/N/K).",
     "صح.",
     "ده الـ K (L2, Queueing notation A/B/c/N/K).",
     "ده مش جزء من الـ notation (L2, Queueing notation A/B/c/N/K)."
    ],
    [
     "صح. في الـ Inventory slide 3: لو الـ lead time بصفر، الـ review والاستلام بيحصلوا في نفس الوقت.",
     "لما الـ lead time يبقى صفر الـ order بيوصل أول ما يتعمل عند الـ review (L2, Simulation of inventory systems: review and events)."
    ],
    [
     "عشان يطلع 1 لازم <bdi>0.50 ≤ R &lt; 0.75</bdi> (L2, Inventory: daily demand distribution).",
     "صح. الحساب:<span class=\"ltr\">0.75 ≤ 0.866 &lt; 0.90 → 2</span>وده اليوم 5 في الـ table بتاع الـ 10 أيام.",
     "عشان يطلع 3 لازم <bdi>0.90 ≤ R &lt; 0.95</bdi> (L2, Inventory: daily demand distribution).",
     "عشان يطلع 4 لازم <bdi>R ≥ 0.95</bdi> (L2, Inventory: daily demand distribution)."
    ],
    [
     "صح. القانون:<span class=\"ltr\">Tc = Hc + Oc + Sc</span>",
     "الـ slide بتذكر holding و order و shortage costs (L2, Inventory: objective and costs).",
     "الـ lead time ده input random، مش تكلفة (L2, Inventory: objective and costs).",
     "ده ربح بياع الجرايد (L2, Example 2.4: the newspaper seller's problem)."
    ],
    [
     "الـ 50¢ ده سعر البيع؛ والـ lost profit هو <bdi>50 − 33</bdi> (L2, Example 2.4: the newspaper seller's problem).",
     "الـ 33¢ ده سعر الشرا (L2, Example 2.4: the newspaper seller's problem).",
     "صح. الحساب:<span class=\"ltr\">50 − 33 = 17 cents</span>",
     "الـ 5¢ دي قيمة الـ scrap (L2, Example 2.4: the newspaper seller's problem)."
    ],
    [
     "الـ system بيبقى فاضي بس في الفترات <bdi>3–6</bdi> و <bdi>12–15</bdi> (L2, Chronological ordering of events).",
     "عند 7 الزبون 4 بيوصل والزبون 3 لسه بيتخدم (L2, Chronological ordering of events).",
     "صح. الزبون 3 (بيتخدم) والزبون 4 (مستني) موجودين من 7 لحد 9.",
     "الـ plot عمره ما بيعدي 2 (L2, Chronological ordering of events)."
    ]
   ],
   "extra": [
    [
     "صح. الانتظار لكل زبون:<span class=\"ltr\">0, 0, 0, 2, 2, 0 → 4/6 = 0.67</span>",
     "ده وقت انتظار الزبون 4 لوحده (أو 5)، مش المتوسط (L2, Building a simulation run: 6 customers).",
     "ده متوسط الوقت في الـ system <bdi>17/6</bdi> (L2, Building a simulation run: 6 customers).",
     "اقسم إجمالي الانتظار 4 على الـ 6 زباين كلهم، مش على 3 (L2, Building a simulation run: 6 customers)."
    ],
    [
     "فيه فترتين idle هما <bdi>3–6</bdi> و <bdi>12–15</bdi> (L2, Chronological ordering of events).",
     "صح. الـ idle بـ <bdi>3 + 3 = 6</bdi> دقايق من 19.",
     "اقسم على الـ run time اللي هو 19، مش الـ busy time اللي هو 13 (L2, Example 1: A Grocery, statistics).",
     "دي نسبة الـ busy (L2, Chronological ordering of events)."
    ],
    [
     "دي بتقسم على الـ 100 زبون كلهم (L2, Example 1: A Grocery, statistics).",
     "دي <bdi>174/54</bdi>، رقم الـ slide، وبيستخدم عدد مختلف للي استنوا (L2, Example 1: A Grocery, statistics).",
     "صح. الحساب:<span class=\"ltr\">174 / 46 = 3.78</span>",
     "ده متوسط الوقت في الـ system (L2, Example 1: A Grocery, statistics)."
    ],
    [
     "الـ 2 بتغطي <bdi>126–250</bdi> (L2, Example 2.2: grocery with 20 customers, distributions and random digits).",
     "صح. الـ 359 واقعة في <bdi>251–375</bdi>.",
     "الـ 4 بتغطي <bdi>376–500</bdi> (L2, Example 2.2: grocery with 20 customers, distributions and random digits).",
     "الـ 5 بتغطي <bdi>501–625</bdi> (L2, Example 2.2: grocery with 20 customers, distributions and random digits)."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">40 × 0.50 = 20.00<br>cost 23.10<br>scrap 30 × 0.05 = 1.50<br>20.00 − 23.10 + 1.50 = −1.60</span>",
     "نسيت الـ salvage بتاع الـ 30 جرنان scrap ($1.50) (L2, Example 2.4: the newspaper seller's problem).",
     "ده الربح لما الـ demand يبقى 50 <bdi>(L2, Example 2.4: simulation table for 70 newspapers (Table 2.13))</bdi>.",
     "ده الـ revenue بس (L2, Example 2.4: the newspaper seller's problem)."
    ],
    [
     "ده بيتجاهل الـ lost profit (L2, Example 2.4: the newspaper seller's problem):<span class=\"ltr\">30.00 − 19.80 = 10.20</span>بس لازم نطرح <bdi>20 × 0.17 = 3.40</bdi>.",
     "صح. الـ Revenue <bdi>60 × 0.50 = 30.00</bdi>؛ والتكلفة <bdi>60 × 0.33 = 19.80</bdi>؛ والـ lost <bdi>20 × 0.17 = 3.40</bdi>؛ والربح:<span class=\"ltr\">30.00 − 19.80 − 3.40 = 6.80</span>",
     "ده بيجمع الـ lost profit بدل ما يطرحه (L2, Example 2.4: the newspaper seller's problem):<span class=\"ltr\">30.00 − 19.80 + 3.40 = 13.60</span>",
     "ده الـ lost profit بس (L2, Example 2.4: the newspaper seller's problem)."
    ],
    [
     "ده الـ ending inventory <bdi>(L2, Example 2.5: (M, N) inventory simulation, inputs)</bdi>.",
     "ده الـ M نفسه <bdi>(L2, Example 2.5: (M, N) inventory simulation, inputs)</bdi>.",
     "صح. الحساب:<span class=\"ltr\">Q = M − ending inventory = 11 − 4 = 7</span>وده الـ cycle 3 في Table 2.16.",
     "الـ Q بيملا لحد M، مش <bdi>M + I</bdi> <bdi>(L2, Example 2.5: (M, N) inventory simulation, inputs)</bdi>."
    ],
    [
     "لازم كمان نعمل order لأن <bdi>I = 0 ≤ r</bdi> ومفيش order outstanding (L2, Inventory: model components and daily process).",
     "صح. الحساب:<span class=\"ltr\">shortage 1 × 50 = 50<br>I = 0 ≤ 3, no order outstanding → order 20<br>holding 0.10 × 0 = 0<br>total 70</span>",
     "الـ holding بيتحسب على الـ inventory آخر اليوم، وهو 0 (L2, Inventory: model components and daily process).",
     "الناقص وحدة واحدة بس، <bdi>3 − 2 = 1</bdi> (L2, Inventory: model components and daily process)."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">56/62 = 0.90<br>43/62 = 0.69</span>",
     "دول بيقسموا على 60 بدل الـ run اللي طوله 62 دقيقة (L2, Example 2.3: Able-Baker analysis).",
     "دول نصيب كل واحد من إجمالي الـ service time (99)، مش utilizations (L2, Example 2.3: Able-Baker analysis).",
     "معكوسين؛ Able الأسرع هو الأكتر انشغالًا (L2, Example 2.3: Able-Baker analysis)."
    ],
    [
     "لما يحصل تعادل Able عنده الأقدمية (L2, Example 2.3: the Able-Baker carhop problem, distributions).",
     "صح. الاتنين فاضيين عند 35؛ فـ Able ياخد العربية؛ والانتظار <bdi>35 − 33 = 2</bdi>.",
     "الـ Able مشغول لحد 35 <bdi>(L2, Example 2.3: Able-Baker simulation table (Table 2.9))</bdi>.",
     "المثال بيفترض إن مفيش balking <bdi>(L2, Example 2.3: Able-Baker simulation table (Table 2.9))</bdi>."
    ]
   ]
  },
  "3": {
   "notes": [
    {
     "h": "الهدف ونظرة عامة",
     "pts": [
      "محتوى الـ Chapter 3 (slide 2):<br>(1) المفاهيم الأساسية في الـ probability theory<br>(2) الـ discrete distributions<br>(3) الـ continuous distributions<br>(4) الـ Poisson process<br>(5) الـ empirical distributions",
      "العالم اللي بيشوفه اللي بيبني الـ model عالم <b>probabilistic مش deterministic</b>؛ وممكن يبقى فيه statistical model يوصف التغيرات دي كويس (slide 3).",
      "ممكن نطلّع model مناسب عن طريق إننا <b>ناخد samples من الظاهرة اللي بندرسها</b>:<br>(1) نختار distribution معروف بتخمين مبني على فهم (educated guesses)<br>(2) نعمل estimate للـ parameters<br>(3) نعمل test للـ goodness of fit",
      "في الـ chapter ده: هنراجع كذا probability distribution مهم، ونعرض شوية applications نموذجية للـ models دي."
     ]
    },
    {
     "h": "مراجعة المصطلحات: الـ random variables",
     "pts": [
      "المفاهيم اللي هنراجعها (slide 5): الـ discrete random variables والـ continuous random variables والـ cumulative distribution function والـ expected value.",
      "الـ <b>random variable</b> هو قاعدة بتدّي رقم لكل نتيجة (outcome) من نتايج التجربة، زي رمي الزهرة اللي بيطلّع قيمة من 1 لـ 6. ‡ (الـ lecture notes)",
      "الـ <b>Discrete random variable</b>: الـ X بيبقى discrete لو عدد القيم الممكنة ليه <b>محدود (finite) أو countably infinite</b> (slide 6).",
      "مثال محدود: نرمي عملة 3 مرات، والـ X هو عدد مرات الـ heads، والقيم هي:<span class=\"ltr\">{0, 1, 2, 3}</span>ومثال لا نهائي: الـ X هو عدد الشركات في محفظة mutual fund، والقيم هي:<span class=\"ltr\">{2, 3, 4, ...}</span>يعني مفيش حد أعلى متقال. ‡ (الـ lecture notes)",
      "في مثال الـ slide الـ X هو عدد الـ packets اللي بتوصل الـ router كل ثانية. والـ <b>R<sub>X</sub></b> هو الـ range space بتاع X:<span class=\"ltr\">R<sub>X</sub> = {0, 1, 2, ...}; p(x<sub>i</sub>) = P(X = x<sub>i</sub>)</span>",
      "مجموعة الأزواج <bdi>(x<sub>i</sub>, p(x<sub>i</sub>))</bdi> اسمها الـ <b>probability distribution</b> بتاع X، والـ <bdi>p(x<sub>i</sub>)</bdi> اسمها الـ <b>probability mass function (PMF)</b> بتاع X."
     ]
    },
    {
     "h": "الـ Example 3.1: زهرة متلاعب فيها (من الـ lecture notes)",
     "pts": [
      "بنرمي زهرة واحدة، والـ X هو عدد النقط على الوش اللي فوق. الـ notes بتستخدم زهرة متلاعب فيها (loaded die) بحيث الـ p(x) متناسبة مع x، فالمجموع:<span class=\"ltr\">1 + 2 + ... + 6 = 21</span>والـ notes بتكتب <bdi>\"N = 21\"</bdi>. ‡ (الـ lecture notes)",
      "الشرطين بتوع الـ PMF متحققين: كل <bdi>p(xᵢ) ≥ 0</bdi>، والمجموع:<span class=\"ltr\">1/21 + 2/21 + ... + 6/21 = 21/21 = 1</span>‡ (الـ lecture notes)",
      "الرسمة (Fig 3.1): أعمدة رأسية عند x من 1 لـ 6، وارتفاعاتها بتزيد من <bdi>1/21</bdi> لحد <bdi>6/21</bdi>. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-die": "الـ PMF بتاعة الزهر المتلعّب فيه وشرطينها"
     }
    },
    {
     "h": "الـ Continuous random variables",
     "pts": [
      "الـ X بيبقى <b>continuous random variable</b> لو الـ range space بتاعه R<sub>X</sub> عبارة عن <b>interval أو مجموعة intervals</b> (slide 7).",
      "الـ f(x) هي الـ <b>probability density function (PDF)</b> بتاعة X.",
      "عشان <bdi>P(X = x₀) = 0</bdi>، مش فارقة إذا كانت أطراف الـ interval داخلة ولا لأ.",
      "الرسمة (slide 7): منحنى PDF اسمه f(x)؛ والمساحة المتظللة تحت المنحنى بين a و b هي <bdi>P(X ∈ [a, b])</bdi>.",
      "مثال على continuous variable: الـ X هو طول حاجة بالسنتيمتر (أي رقم حقيقي موجب). ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-pdf-area": "الاحتمال هو المساحة تحت الـ PDF بين a و b"
     }
    },
    {
     "h": "مثال: عمر جهاز الـ inspection (الـ PDF)",
     "pts": [
      "عمر جهاز inspection هو X، والـ PDF بتاعه (slide 8):<span class=\"ltr\">f(x) = (1/2)e^(−x/2) for x ≥ 0, and 0 otherwise</span>وفي الـ notes ده جهاز ليزر <bdi>(laser-ray)</bdi> بيكشف الشروخ في أجنحة الطيارات (Example 3.2). ‡ (الـ lecture notes)",
      "الـ X ليه <b>exponential distribution والـ mean بتاعه 2 سنة</b>.",
      "الرسمة (slide 8): الـ PDF بيبدأ من 0.5 عند <bdi>x = 0</bdi> وبيقل لحد ما يقرب من 0 عند 10 سنين؛ والمساحة بين 2 و 3 متظللة بالأحمر.",
      "الحساب:<span class=\"ltr\">P(2 ≤ X ≤ 3) = (1/2)∫₂³ e^(−x/2) dx = (1/2)[−2e^(−x/2)] from 2 to 3 = −e^(−3/2) + e^(−1) = −0.223 + 0.368 = <b>0.145</b></span>"
     ],
     "figH": {
      "ms-device-pdf": "جهاز الفحص: الاحتمال بين 2 و 3 سنين هو المساحة المظللة"
     }
    },
    {
     "h": "الـ Cumulative distribution function (CDF)",
     "pts": [
      "الـ <b>CDF</b> هي <bdi>F(x) = P(X ≤ x)</bdi> (slide 9).",
      "خصايصها:<br>(1) الـ F <b>nondecreasing</b> (مش بتقل أبدًا): لو <bdi>a ≤ b</bdi> يبقى <bdi>F(a) ≤ F(b)</bdi><br>(2) الـ limit بتاع F(x) بيساوي 1 لما <bdi>x → ∞</bdi><br>(3) الـ limit بتاع F(x) بيساوي 0 لما <bdi>x → −∞</bdi>",
      "أي سؤال probability عن X ممكن نجاوبه بالـ CDF:<span class=\"ltr\">P(a < X ≤ b) = F(b) − F(a), for all a < b</span>",
      "الرسمة (slide 9): منحنى على شكل حرف S طالع من 0 ناحية الخط المتقطع <bdi>F(x) = 1</bdi>."
     ],
     "figH": {
      "ms-cdf-props": "خصائص الـ CDF على منحنى شكله S"
     }
    },
    {
     "h": "مثال: جهاز الـ inspection (الـ CDF)",
     "pts": [
      "الـ CDF بتاعة جهاز الـ inspection (slide 10):<span class=\"ltr\">F(x) = (1/2)∫₀ˣ e^(−t/2) dt = 1 − e^(−x/2)</span>",
      "إنه يعيش أقل من سنتين:<span class=\"ltr\">P(0 ≤ X ≤ 2) = F(2) − F(0) = F(2) = 1 − e^(−1) = <b>0.632</b></span>",
      "إنه يعيش بين 2 و 3 سنين:<span class=\"ltr\">P(2 ≤ X ≤ 3) = F(3) − F(2) = (1 − e^(−3/2)) − (1 − e^(−1)) = <b>0.145</b></span>ودي نفس الإجابة اللي طلعت من الـ integration للـ PDF.",
      "الـ notes (Example 3.3) بتكتب:<span class=\"ltr\">−e^(−3/2) + e^(−1) = −0.233 + 0.368 = 0.145</span>بس الحقيقة إن <bdi>e^(−3/2)</bdi> قيمتها 0.223 (زي ما في الـ Example 3.2)، و <bdi>0.368 − 0.223 = 0.145</bdi>. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-device-cdf": "جهاز الفحص: الاحتمالات من الـ CDF"
     }
    },
    {
     "h": "الـ Expected value",
     "pts": [
      "الـ expected value بتاع X بنرمزله بـ E(X) (slide 11).",
      "ومعروف كمان (a.k.a.) باسم الـ <b>mean</b> أو m أو μ أو الـ <b>1st moment</b> بتاع X.",
      "هو <b>مقياس للـ central tendency</b> (النزعة المركزية).",
      "الـ moment رقم n:<span class=\"ltr\">E(Xⁿ) = Σ xᵢⁿ p(xᵢ) (discrete) or ∫ xⁿ f(x) dx (continuous)</span>‡ (الـ lecture notes)"
     ]
    },
    {
     "h": "الـ Variance والـ standard deviation",
     "pts": [
      "الـ variance بنرمزله بـ <b>V(X)</b> أو <b>Var(X)</b> أو <b>σ²</b> (slide 12).",
      "بيقيس <b>الانتشار (spread) أو التباين (variation)</b> للقيم الممكنة بتاعة X حوالين الـ mean.",
      "الرسمة (slide 12): منحنيين على شكل جرس متمركزين عند μ؛ واحد عريض مكتوب عليه <bdi>σ² large</bdi>، وواحد ضيق وعالي مكتوب عليه <bdi>σ² small</bdi>.",
      "الـ <b>Standard deviation</b> هو <bdi>σ = √V(X)</bdi> (slide 13).",
      "الـ standard deviation بيتقاس <b>بنفس وحدات الـ mean</b>؛ ودايمًا افهم σ مع الـ mean مع بعض.",
      "خلي بالك: الـ standard deviations بتوع مجموعتين data مختلفتين ممكن يبقى صعب نقارنهم (وعشان كده بنستخدم الـ coefficient of variation)."
     ],
     "figH": {
      "ms-variance": "الـ variance الكبيرة والصغيرة حوالين نفس المتوسط"
     }
    },
    {
     "h": "مثال: الـ mean والـ variance بتوع جهاز الـ inspection",
     "pts": [
      "الـ mean (slide 14):<span class=\"ltr\">E(X) = (1/2)∫₀^∞ x e^(−x/2) dx = [−x e^(−x/2)]₀^∞ + ∫₀^∞ e^(−x/2) dx = 0 + 2 = <b>2</b> years</span>",
      "وبعدين:<span class=\"ltr\">E(X²) = (1/2)∫₀^∞ x² e^(−x/2) dx = [−x² e^(−x/2)]₀^∞ + ∫₀^∞ 2x e^(−x/2) dx = 0 + 2(4) = <b>8</b></span>لأن <bdi>∫₀^∞ x e^(−x/2) dx = 2E(X) = 4</bdi>.",
      "الـ variance والـ standard deviation:<span class=\"ltr\">V(X) = E(X²) − (E(X))² = 8 − 2² = <b>4</b>; σ = √V(X) = <b>2</b> years</span>",
      "الـ slide 15 بيوضّح الـ <b>partial integration</b> (integration by parts) اللي استخدمناه في E(X): بنحط <bdi>u(x) = x</bdi> و <bdi>v′(x) = e^(−x/2)</bdi>، فيطلع <bdi>u′(x) = 1</bdi> و <bdi>v(x) = −2e^(−x/2)</bdi>. وبعدين:<span class=\"ltr\">E(X) = (1/2)[(x·(−2e^(−x/2)))₀^∞ − ∫₀^∞ 1·(−2e^(−x/2)) dx] = (1/2)(0 + 4) = 2</span>"
     ]
    },
    {
     "h": "الـ Example 3.4: الـ mean والـ variance والـ SD للزهرة المتلاعب فيها (من الـ lecture notes)",
     "pts": [
      "باستخدام <bdi>p(x) = x/21</bdi> لقيم x من 1 لـ 6 (Example 3.1). ‡ (الـ lecture notes)",
      "الـ mean:<span class=\"ltr\">E(X) = 1(1/21) + 2(2/21) + ... + 6(6/21) = 91/21 = <b>4.33</b></span>‡ (الـ lecture notes)",
      "وبعدين:<span class=\"ltr\">E(X²) = 1²(1/21) + 2²(2/21) + ... + 6²(6/21) = 441/21 = <b>21</b></span>‡ (الـ lecture notes)",
      "الـ variance والـ SD:<span class=\"ltr\">V(X) = 21 − (4.33)² = <b>2.22</b>; σ = √2.22 = <b>1.49</b></span>ملحوظة: الـ 2.22 جاية من الـ mean المظبوط <bdi>91/21</bdi>، يعني <bdi>21 − 18.78</bdi>؛ ولو ربّعنا الـ 4.33 المقرّبة هيطلع 2.25. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-die-moments": "مثال 3.4 صف بصف: المتوسط والتباين والـ standard deviation"
     }
    },
    {
     "h": "الـ Mean والـ variance بتوع الـ sums",
     "pts": [
      "لو <bdi>x₁, ..., x_k</bdi> عبارة عن k random variables، و <bdi>a₁, ..., a_k</bdi> عبارة عن k constants، يبقى الـ mean بتاع المجموع هو مجموع الـ means (slide 16). وده صح لأي random variables.",
      "لو المتغيرات <b>independent</b>، الـ variance بتاع المجموع بيبقى مجموع الـ variances مضروبة في مربع الـ constants."
     ]
    },
    {
     "h": "الـ Coefficient of variation والـ covariance والـ correlation",
     "pts": [
      "الـ <b>Coefficient of variation (C.O.V.)</b>: هو النسبة بين الـ standard deviation والـ mean؛ وهو <b>ملوش وحدات (dimensionless)</b> و<b>مقياس normalized للتشتت (dispersion)</b> (slide 17).",
      "ممكن نستخدم الـ C.O.V. بدل الـ standard deviation عشان نقارن مجموعات data مختلفة.",
      "الـ <b>Covariance</b> بتاع x و y (والـ means بتوعهم μx و μy) بيقيس الاعتماد (dependency) بين x و y، يعني x و y بيتغيروا مع بعض إزاي (slide 18).",
      "لو المتغيرات <b>independent</b> الـ covariance بيبقى <b>صفر</b>، لأن <bdi>E(xy) = E(x)E(y)</bdi>.",
      "الـ <b>Correlation coefficient</b> (أو correlation بس): هو القيمة الـ normalized للـ covariance؛ وبتبقى بين <b>−1 و +1</b> (slide 19)."
     ]
    },
    {
     "h": "الـ Quantile والـ mean والـ median والـ mode",
     "pts": [
      "قيمة x اللي الـ CDF عندها بتاخد القيمة α اسمها الـ <b>α-quantile</b>، ورمزها xα (slide 20):<span class=\"ltr\">P(X ≤ xα) = F(xα) = α, α ∈ [0, 1]</span>",
      "الرسمة (slide 20): على منحنى الـ CDF فيه خط أفقي على ارتفاع α بيقابل المنحنى؛ ولما ننزل منه لتحت بنوصل لـ xα على المحور الأفقي.",
      "الـ <b>median</b> هو الـ <b><bdi>0.5-quantile</bdi></b>.",
      "تلات مقاييس للـ central tendency (slide 21):<br>(1) الـ <b>Mean</b>:<span class=\"ltr\">E(X) = μ = Σ pᵢxᵢ or ∫ x f(x) dx</span>(2) الـ <b>Median</b>: هو الـ <bdi>0.5-quantile</bdi>؛ يعني نص القيم أصغر منه والنص التاني أكبر<br>(3) الـ <b>Mode</b>: القيمة الأكثر احتمالًا، يعني الـ xᵢ اللي ليها أعلى probability pᵢ، أو الـ x اللي الـ PDF عندها maximum",
      "الرسمة (slide 22) فيها 5 PDFs:<br>• منحنى متماثل بقمة واحدة: الـ median والـ mean والـ mode متساويين في النص<br>• منحنى بقمتين (bimodal): فيه اتنين mode؛ والـ median والـ mean في النص<br>• منحنى مسطح (uniform): مفيش mode؛ والـ median بيساوي الـ mean في النص<br>• ديل طويل ناحية اليمين: الـ mode أصغر من الـ median، والـ median أصغر من الـ mean<br>• ديل طويل ناحية الشمال: الـ mean أصغر من الـ median، والـ median أصغر من الـ mode",
      "في الحالة الـ discrete، الـ mode هو القيمة اللي بتتكرر أكتر؛ وفي الحالة الـ continuous، هو القيمة اللي الـ PDF عندها maximum. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-quantile": "إزاي نقرا الـ α-quantile من الـ CDF",
      "ms-mmm": "الـ mean والـ median والـ mode على الخمس أشكال"
     }
    },
    {
     "h": "إزاي نختار بين الـ mean والـ median والـ mode",
     "pts": [
      "الـ flowchart (slide 23):<br>(1) هل الـ data categorical؟ لو أيوه: <b>استخدم الـ mode</b><br>(2) لو لأ، هل الـ total هو اللي يهمنا؟ لو أيوه: <b>استخدم الـ mean</b><br>(3) لو لأ، هل الـ distribution skewed؟ لو أيوه: <b>استخدم الـ median</b><br>(4) لو لأ: <b>استخدم الـ mean</b>"
     ],
     "figH": {
      "ms-central-flow": "امشي في الـ flowchart واختار المقياس المناسب"
     }
    },
    {
     "h": "الـ Statistical models المفيدة (من الـ lecture notes)",
     "pts": [
      "الـ simulation بتستخدم أحداث probabilistic: الـ queueing (الـ interarrival times والـ service times)، والـ inventory (الوقت بين الطلبات والـ lead time)، والـ reliability (الوقت لحد الـ failure). ‡ (الـ lecture notes)",
      "في الـ queueing: لو الـ service times عشوائية تمامًا نستخدم <b>exponential</b>؛ ولو الـ service time ثابت مع تذبذبات عشوائية صغيرة (زي مخرطة lathe بتشتغل على عمود shaft طوله 10 سم وصلابته بتختلف) نستخدم <b>normal</b>؛ ولو فيه service times كبيرة أكتر نستخدم <b>Weibull</b>؛ والـ exponential والـ gamma والـ Weibull بيتستخدموا للـ interarrival times والـ service times. ‡ (الـ lecture notes)",
      "الـ mode بتاع الـ PDF: في الـ exponential عند نقطة الأصل (origin)؛ وفي الـ gamma والـ Weibull عند نقطة أكبر من أو تساوي صفر. والـ tail: في الـ gamma والـ exponential طويل؛ وفي الـ Weibull بيقل بسرعة نسبيًا. ‡ (الـ lecture notes)",
      "الـ inventory فيه 3 random variables:<br>(1) عدد الوحدات المطلوبة في كل order أو في كل فترة زمنية<br>(2) الوقت بين الطلبات<br>(3) الـ lead time ‡ (الـ lecture notes)",
      "في الـ inventory: الـ geometric distribution الـ mode بتاعه عند الواحد (unity) (بشرط إن فيه طلب واحد على الأقل)؛ ولو الـ demand ليه tail طويل نستخدم <b>negative binomial</b>؛ والـ demand غالبًا بنعمله model بالـ <b>Poisson</b>. ‡ (الـ lecture notes)",
      "في الـ reliability: لو الـ failures عشوائية بس نستخدم <b>exponential</b>؛ ولو الـ failures بسبب الاستهلاك (wear) نستخدم <b>normal</b>؛ ولبعض الـ components نستخدم <b>lognormal</b>؛ ولو components كتير والـ failures بسبب عيوب خطيرة نستخدم <b>Weibull</b>. ‡ (الـ lecture notes)",
      "لو الـ data قليلة: <b>uniform</b> (عشوائي بس مش عارفين حاجة تانية)، و<b>triangular</b> (بنفترض القيم الـ minimum والـ maximum والـ modal)، و<b>beta</b>. ‡ (الـ lecture notes)"
     ]
    },
    {
     "h": "الـ Discrete distributions: الـ Bernoulli",
     "pts": [
      "الـ discrete random variables بتوصف ظواهر عشوائية مش ممكن يطلع فيها غير <b>قيم صحيحة (integers) بس</b> (slide 25).",
      "اللي هنغطيه: الـ Bernoulli trials والـ Bernoulli distribution، والـ binomial، والـ geometric والـ negative binomial، والـ Poisson.",
      "الـ <b>Bernoulli trials</b>: تجربة فيها n محاولة (trials)، كل واحدة يا success يا failure؛ والـ Xⱼ بيساوي 1 لو التجربة رقم j نجحت (success)، وبيساوي 0 لو فشلت (failure) (slide 26).",
      "الرسمة (slide 26): صف من الدواير، الأبيض معناه failure والأسود معناه success.",
      "الـ <b>Bernoulli process</b>: عبارة عن n Bernoulli trials والـ trials تكون <b>independent</b> (slide 27)؛ والـ notes بتزوّد: كل trial ليها نتيجتين بس، والـ probability of success بتفضل ثابتة من trial للتانية. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-bernoulli": "جرّب الـ Bernoulli trials: نجاح أو فشل في كل مرة"
     }
    },
    {
     "h": "الـ Binomial distribution",
     "pts": [
      "الـ X اللي هو <b>عدد الـ successes في n Bernoulli trials</b> ليه binomial distribution (slide 28).",
      "الـ <bdi>C(n, x)</bdi> هو عدد النتايج اللي فيها العدد المطلوب من الـ successes والـ failures؛ والـ <bdi>pˣqⁿ⁻ˣ</bdi> هي الـ probability إن يبقى فيه x successes و <bdi>(n − x)</bdi> failures.",
      "الـ mean والـ variance بيطلعوا من إن X مجموع n Bernoulli variables مستقلين (كل واحد الـ mean بتاعه p والـ variance بتاعه pq):<span class=\"ltr\">X = X₁ + X₂ + … + Xₙ</span>"
     ]
    },
    {
     "h": "الـ Example 3.5: الـ chips اللي مش مطابقة للمواصفات (من الـ lecture notes)",
     "pts": [
      "فيه process بتطلّع chips، وفي المتوسط 2% منها مش مطابقة للمواصفات <bdi>(non-conforming)</bdi>. كل يوم بناخد sample فيها 50؛ ولو فيها <b>أكتر من اتنين</b> مش مطابقين بنوقف الـ process. المطلوب: الـ probability إن الـ process تقف. ‡ (الـ lecture notes)",
      "المعطيات:<span class=\"ltr\">n = 50, p = 0.02, q = 0.98</span>والـ X هو عدد الـ chips اللي مش مطابقة، وتوزيعه binomial. ‡ (الـ lecture notes)",
      "الحساب:<span class=\"ltr\">P(X ≤ 2) = (0.98)⁵⁰ + 50(0.02)(0.98)⁴⁹ + 1225(0.02)²(0.98)⁴⁸ = 0.364 + 0.372 + 0.186 = <b>0.92</b></span>‡ (الـ lecture notes)",
      "وبالتالي:<span class=\"ltr\">P(X > 2) = 1 − 0.92 = <b>0.08</b></span>والقيمة بالظبط 0.0784. ‡ (الـ lecture notes)",
      "الـ mean والـ variance:<span class=\"ltr\">E(X) = np = 50(0.02) = <b>1</b>; V(X) = npq = 50(0.02)(0.98) = <b>0.98</b></span>‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-binomial": "استكشف الـ binomial PMF ومعاه مثال 3.5"
     }
    },
    {
     "h": "الـ Geometric distribution",
     "pts": [
      "هو <b>عدد الـ Bernoulli trials (X) لحد ما نوصل لأول success</b> (slide 29).",
      "الرسمة (slide 29): صف دواير بيضا (failures) وفي آخره دايرة سودا واحدة (success).",
      "الحدث <bdi>{X = x}</bdi> معناه <bdi>x − 1</bdi> failures وبعدهم success:<span class=\"ltr\">P(FF…FS) = qˣ⁻¹p</span>‡ (الـ lecture notes)",
      "الـ slide بيكتب الـ range كده <bdi>x = 0, 1, 2, …, n</bdi>. ‡ الـ range الصح هو <bdi>x = 1, 2, …</bdi> (لازم trial واحدة على الأقل، ومفيش حد أعلى)، زي ما في الـ lecture notes.",
      "الـ notes بتقول <bdi>\"each failure has an associated probability p\"</bdi> ‡ (الـ lecture notes). ‡ الصح إن كل failure الـ probability بتاعتها q، والـ success الـ probability بتاعته p، زي ما القانون <bdi>P(FF…FS) = qˣ⁻¹p</bdi> بيوضّح."
     ],
     "figH": {
      "ms-geometric": "الـ geometric: فشل لحد أول نجاح، ومعاه مثال 3.6"
     }
    },
    {
     "h": "الـ Example 3.6: طابعات الـ bubble jet (من الـ lecture notes)",
     "pts": [
      "نسبة 40% من الطابعات اللي بتتجمّع بتترفض في الـ inspection. المطلوب الـ probability إن أول طابعة مقبولة تبقى التالتة اللي بنفحصها. ‡ (الـ lecture notes)",
      "القيم:<span class=\"ltr\">q = 0.4 (reject), p = 1 − 0.4 = 0.6 (accept)</span>‡ (الـ lecture notes)",
      "الحساب:<span class=\"ltr\">p(3) = q²p = (0.4)²(0.6) = <b>0.096</b></span>يعني في حوالي 10% من الحالات الطابعة التالتة هي أول واحدة تتقبل. ‡ (الـ lecture notes)"
     ]
    },
    {
     "h": "الـ Poisson distribution",
     "pts": [
      "الـ Poisson distribution بيوصف random processes كتير بشكل كويس جدًا، وكمان بسيط رياضيًا (slide 30).",
      "الـ parameter هو <bdi>α > 0</bdi>؛ والـ mean والـ variance متساويين:<span class=\"ltr\">E(X) = α = V(X)</span>",
      "بيعبّر عن الـ probability إن عدد معين من الأحداث يحصل في فترة زمنية ثابتة، لما الأحداث دي بتحصل بمعدل متوسط معروف ومن غير ما تعتمد على الوقت اللي عدّى من آخر حدث؛ ومعظم الـ arrival والـ departure processes في الـ queueing بتتوصف بيه. ‡ (الـ lecture notes)",
      "الـ slide بيسمّي الـ p(x) باسم <bdi>\"PDF\"</bdi>. ‡ في الـ discrete distribution اسمها الـ PMF.",
      "الرسمة (slide 30): الجزء (a) أعمدة الـ PMF (الارتفاعات بتطابق <bdi>α = 2</bdi>):<span class=\"ltr\">p(0) ≈ 0.135, p(1) = p(2) ≈ 0.27, p(3) ≈ 0.18, p(4) ≈ 0.09, then smaller</span>والجزء (b) الـ CDF على شكل سلالم بتطلع:<span class=\"ltr\">0.135, 0.406, 0.677, 0.857, 0.947, … → 1</span>"
     ],
     "figH": {
      "ms-poisson": "الـ Poisson PMF والـ CDF ومعاهم مثال الـ beeps"
     }
    },
    {
     "h": "مثال: الـ beeps بتاعة فني الصيانة (Poisson)",
     "pts": [
      "فني صيانة كمبيوتر بيجيله beep كل ما يبقى فيه طلب service؛ وعدد الـ beeps في الساعة توزيعه Poisson بـ <bdi>α = 2</bdi> في الساعة (slide 31).",
      "احتمال 3 beeps في الساعة الجاية:<span class=\"ltr\">p(3) = 2³/3! · e⁻² = (8)(0.135)/6 = <b>0.18</b></span>",
      "وكمان من الجدول الـ cumulative (Table A.4):<span class=\"ltr\">p(3) = F(3) − F(2) = 0.857 − 0.677 = <b>0.18</b></span>",
      "احتمال 2 beeps أو أكتر في ساعة:<span class=\"ltr\">p(2 or more) = 1 − (p(0) + p(1)) = 1 − F(1) = 1 − 0.406 = <b>0.594</b></span>",
      "السؤال ده بالظبط كان <bdi>Question 3-a</bdi> في امتحان الـ final بتاع يناير 2026."
     ]
    },
    {
     "h": "الـ Continuous distributions: الـ uniform",
     "pts": [
      "الـ continuous random variables بتوصف ظواهر المتغير فيها ممكن ياخد أي قيمة في interval معين (slide 33). واللي هندرسه: الـ uniform والـ exponential والـ normal.",
      "الـ X بيبقى <b>uniformly distributed على <bdi>(a, b)</bdi></b>، ونكتبه <bdi>U(a, b)</bdi>، وليه الـ PDF والـ CDF اللي تحت (slide 34).",
      "الـ <bdi>P(x₁ < X < x₂)</bdi> <b>متناسبة مع طول الـ interval</b>:<span class=\"ltr\">F(x₂) − F(x₁) = (x₂ − x₁)/(b − a)</span>",
      "الـ <b><bdi>U(0, 1)</bdi></b> هو اللي بيدّينا وسيلة نولّد بيها random numbers، ومنها نقدر نولّد random variates.",
      "الرسمة (slide 34): لـ <bdi>U(1, 6)</bdi> الـ PDF خط مسطح على ارتفاع 0.2 بين 1 و 6؛ والـ CDF خط مستقيم من 0 عند <bdi>x = 1</bdi> لحد 1 عند <bdi>x = 6</bdi>، وبعدين بيفضل ثابت عند 1."
     ],
     "figH": {
      "ms-uniform": "الـ uniform PDF والـ CDF زي الـ slide 34"
     }
    },
    {
     "h": "الـ Example 3.8: مستني الأتوبيس (من الـ lecture notes)",
     "pts": [
      "فيه أتوبيس بييجي كل 20 دقيقة، من <bdi>6:40</bdi> الصبح لحد <bdi>8:40</bdi> الصبح. وراكب بيوصل بشكل uniform بين <bdi>7:00</bdi> و <bdi>7:30</bdi> الصبح. المطلوب الـ probability إنه يستنى أكتر من 5 دقايق. ‡ (الـ lecture notes)",
      "الأتوبيسات بتيجي الساعة <bdi>7:00</bdi> و <bdi>7:20</bdi> و <bdi>7:40</bdi>. والانتظار بيبقى أكتر من 5 دقايق بس لو الوصول بين <bdi>7:00</bdi> و <bdi>7:15</bdi> أو بين <bdi>7:20</bdi> و <bdi>7:30</bdi>. ‡ (الـ lecture notes)",
      "الـ X هو عدد الدقايق بعد الساعة 7 الصبح، و <bdi>X ~ U(0, 30)</bdi>. الحساب:<span class=\"ltr\">P = P(0 < X < 15) + P(20 < X < 30) = F(15) − F(0) + F(30) − F(20) = 15/30 − 0 + 1 − 20/30 = <b>5/6</b></span>‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-bus": "مثال 3.8 على خط الزمن: إمتى الانتظار يزيد عن 5 دقايق؟"
     }
    },
    {
     "h": "الـ Exponential distribution",
     "pts": [
      "الـ X بيبقى exponentially distributed بالـ parameter <b><bdi>λ > 0</bdi></b> لو الـ PDF والـ CDF بتوعه زي اللي تحت (slide 35).",
      "الـ mean والـ standard deviation متساويين (الاتنين <bdi>1/λ</bdi>). ‡ (الـ lecture notes)",
      "الرسمة (slide 35): الـ PDF بيبدأ على ارتفاع λ عند <bdi>x = 0</bdi> وبيقل ناحية 0؛ والـ CDF بيبدأ من 0 وبيطلع ناحية 1.",
      "بيتستخدم في الـ modeling بتاع <b>الـ interarrival times لما الـ arrivals تبقى عشوائية تمامًا</b>، والـ <b>service times اللي متغيرة جدًا</b> (slide 36). هنا الـ λ معدل (rate)، زي arrivals في الساعة أو services في الدقيقة؛ وفي أعمار الـ components الـ λ هو الـ failure rate. ‡ (الـ lecture notes)",
      "لكذا PDF من النوع exponential (الرسمة في slide 36 بـ <bdi>λ = 0.5, 1, 1.5, 2</bdi>) الـ intercept على المحور الرأسي هو <b>λ</b>، وكل الـ PDFs في الآخر بتتقاطع.",
      "الـ exponential distribution <b>memoryless</b> (ملوش ذاكرة). ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-exponential": "الـ exponential PDF والـ CDF ومعاهم لمبة مثال 3.9",
      "ms-exp-family": "منحنيات الـ exponential PDF لأربع قيم مختلفة للـ λ"
     }
    },
    {
     "h": "الـ Example 3.9: لمبة صناعية (من الـ lecture notes)",
     "pts": [
      "عمر اللمبة (بالآلاف ساعة) توزيعه exponential بـ failure rate <bdi>λ = 1/3</bdi> (يعني failure واحد كل 3000 ساعة في المتوسط). ‡ (الـ lecture notes)",
      "إنها تعيش أكتر من الـ mean life بتاعها (3000 ساعة):<span class=\"ltr\">P(X > 3) = 1 − F(3) = 1 − (1 − e^(−3/3)) = e⁻¹ = <b>0.368</b></span>‡ (الـ lecture notes)",
      "إنها تعيش بين 2000 و 3000 ساعة:<span class=\"ltr\">P(2 ≤ X ≤ 3) = F(3) − F(2) = (1 − e^(−1)) − (1 − e^(−2/3)) = −0.368 + 0.513 = <b>0.145</b></span>وبدقة أكتر 0.1455. ‡ (الـ lecture notes)"
     ]
    },
    {
     "h": "الـ Normal distribution",
     "pts": [
      "الـ X بيبقى normally distributed بـ mean μ <bdi>(−∞ < μ < ∞)</bdi> و variance <bdi>σ² > 0</bdi>، ونكتبه <b><bdi>X ~ N(μ, σ²)</bdi></b> (slide 37).",
      "خصايصه:<br>(1) الـ limit بتاع f(x) بيساوي 0 لما <bdi>x → −∞</bdi> ولما <bdi>x → ∞</bdi><br>(2) الـ PDF <b>متماثل (symmetric) حوالين μ</b> لأن <bdi>f(μ − x) = f(μ + x)</bdi><br>(3) أعلى قيمة للـ PDF بتحصل عند <bdi>x = μ</bdi>، فـ <b>الـ mean والـ mode متساويين</b>",
      "الرسمة (slide 37): منحنى على شكل جرس متمركز عند μ.",
      "حساب الـ distribution (slide 38): بنستخدم طرق numerical (<b>مفيش closed form</b>)؛ والنتايج مش بتعتمد على μ و σ لما نستخدم الـ <b>standard normal distribution <bdi>Z ~ N(0, 1)</bdi></b> بالتحويل ده:<span class=\"ltr\">Z = (X − μ)/σ</span>",
      "الـ notes بتقول <bdi>\"Since the above equation is in closed form, it is not possible to evaluate\"</bdi>. ‡ المفروض تبقى <bdi>\"not in closed form\"</bdi> (زي ما slide 38 بيقول). ‡ (الـ lecture notes)",
      "ليه الـ normal distribution مهم؟ (slide 40)<br>(1) أكتر distribution بيتستخدم في تحليل الـ data<br>(2) مجموع n normal variates مستقلين بيطلع normal variate<br>(3) مجموع عدد كبير من الـ observations المستقلة من أي distribution بيبقى ليه normal distribution"
     ],
     "figH": {
      "ms-normal-shape": "خصائص منحنى الـ normal والتحويل لـ Z"
     }
    },
    {
     "h": "أمثلة على الـ normal",
     "pts": [
      "مثال الـ <b>Vessel loading</b> (تحميل السفينة) (slide 39): <bdi>X ~ N(12, 4)</bdi> و <bdi>μ = 12</bdi> و <bdi>σ = 2</bdi>. احتمال إنها تتحمّل في أقل من 10 ساعات:<span class=\"ltr\">F(10) = Φ((10 − 12)/2) = Φ(−1) = 1 − Φ(1) = 1 − 0.8413 = <b>0.1587</b></span>",
      "باستخدام خاصية الـ symmetry، الـ <bdi>Φ(1)</bdi> هو الـ complement بتاع <bdi>Φ(−1)</bdi>، يعني <bdi>Φ(−x) = 1 − Φ(x)</bdi>.",
      "الرسمة (slide 39): الجزء (a) الـ standard normal والـ tail اللي على يمين <bdi>z = 1</bdi> متظلل ومساحته 0.1587؛ والجزء (b) نفس المساحة على شمال <bdi>z = −1</bdi>.",
      "الـ <b>Example 3.10</b>: <bdi>X ~ N(50, 9)</bdi> يعني <bdi>σ = 3</bdi>. الحساب:<span class=\"ltr\">F(56) = Φ((56 − 50)/3) = Φ(2) = <b>0.9772</b></span>من الـ Table A.3؛ والـ 56 أعلى من الـ mean بـ 2σ. ‡ (الـ lecture notes)",
      "الـ <b>Example 3.12</b>: الوقت اللي بياخده الواحد عشان يعدّي طابور الكافيتريا توزيعه <bdi>N(15, 9)</bdi>. الحساب:<span class=\"ltr\">P(14 ≤ X ≤ 17) = F(17) − F(14) = Φ((17 − 15)/3) − Φ((14 − 15)/3) = Φ(0.667) − Φ(−0.333) = <b>0.3780</b></span>والـ Fig 3.8(a) في الـ notes كاتبة الـ mean <bdi>μ = 10</bdi>؛ ‡ والصح <bdi>μ = 15</bdi>. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-normal": "احتمالات الـ normal: تحميل السفينة ومثالين 3.10 و 3.12"
     }
    },
    {
     "h": "الـ Weibull والـ triangular والـ lognormal distributions (من الـ lecture notes)",
     "pts": [
      "التلاتة دول موجودين بس في الـ lecture notes (Sections 3.4.4 لـ 3.4.6) وفي الـ revision sheet؛ والـ slides بتغطي الـ uniform والـ exponential والـ normal بس. ‡ (الـ lecture notes)",
      "الـ parameters بتوع الـ <b>Weibull</b>:<span class=\"ltr\">ν = location (−∞ < ν < ∞), α = scale (α > 0), β = shape (β > 0)</span>ولو <bdi>ν = 0</bdi> و <bdi>β = 1</bdi> بيتحوّل للـ exponential بـ <bdi>λ = 1/α</bdi>. ‡ (الـ lecture notes)",
      "الـ <b>Example 3.13</b>: وقت هبوط الطيارة وإخلاء الممر توزيعه Weibull بالقيم دي:<span class=\"ltr\">ν = 1.34 min, β = 0.5, α = 0.04 min</span>والـ notes بتحسب:<span class=\"ltr\">P(X > 1.5) = 1 − F(1.5) = 1 − exp[−((1.5 − 1.34)/0.04)^0.5] = 1 − e^(−√4) = 1 − e⁻² = 1 − 0.135 = <b>0.865</b></span>‡ بس مع الـ CDF <bdi>F(x) = 1 − exp[−((x − ν)/α)^β]</bdi>، الإجابة <bdi>P(X > 1.5) = e⁻² = 0.135</bdi>؛ والقيمة 0.865 دي هي <bdi>F(1.5) = P(X ≤ 1.5)</bdi>. ‡ (الـ lecture notes)",
      "الـ <b>Triangular</b> بـ <bdi>a ≤ b ≤ c</bdi>: الـ mode عند <bdi>x = b</bdi>؛ وارتفاع القمة <bdi>2/(c − a)</bdi>. ‡ (الـ lecture notes)",
      "الـ <b>Example 3.14</b>: الـ CPU requirement توزيعه triangular بالقيم دي:<span class=\"ltr\">a = 0.05 s, b = 1.1 s, c = 6.5 s</span>وبما إن <bdi>1.1 < 2.5 ≤ 6.5</bdi>:<span class=\"ltr\">F(2.5) = 1 − (6.5 − 2.5)²/((6.5 − 0.05)(6.5 − 1.1)) = 1 − 16/34.83 = <b>0.541</b></span>‡ (الـ lecture notes)",
      "الـ <b>Lognormal</b>: لو <bdi>Y ~ N(μ, σ²)</bdi> يبقى <bdi>X = e^Y</bdi> توزيعه lognormal بالـ parameters μ و σ²؛ والـ parameters دي <b>مش</b> هي الـ mean والـ variance بتوع X. ‡ (الـ lecture notes)",
      "الـ notes سايبة قانون الـ variance بتاع الـ lognormal فاضي (صفحة 52). ‡ النتيجة المعروفة:<span class=\"ltr\">V(X) = e^(2μ+σ²)(e^(σ²) − 1)</span>"
     ],
     "figH": {
      "ms-more-dists": "الـ Weibull والـ triangular والـ lognormal ومعاهم مثالين 3.13 و 3.14"
     }
    },
    {
     "h": "الـ Poisson process",
     "pts": [
      "الـ <b>N(t)</b> هي counting function: يعني عدد الأحداث اللي حصلت في <bdi>[0, t]</bdi> (slide 42).",
      "الـ counting process <bdi>{N(t), t ≥ 0}</bdi> بيبقى <b>Poisson process بـ mean rate λ</b> لو:<br>(1) الـ arrivals بتيجي <b>واحد واحد</b><br>(2) ليه <b>stationary increments</b>: عدد الـ arrivals في <bdi>[t, t + s]</bdi> بيعتمد على s بس، مش على نقطة البداية t؛ والـ arrivals عشوائية تمامًا<br>(3) ليه <b>independent increments</b>: أعداد الـ arrivals في فترات زمنية مش متداخلة بتبقى independent؛ والـ arrivals الجاية بتحصل بشكل عشوائي تمامًا",
      "الخصايص (slide 43): الـ N(t) توزيعه Poisson بالـ parameter <bdi>α = λt</bdi>، فالـ mean والـ variance متساويين:<span class=\"ltr\">E[N(t)] = V[N(t)] = λt</span>",
      "الـ stationary increment: عدد الـ arrivals من الوقت s للوقت t <bdi>(s < t)</bdi> برضه Poisson بـ mean <bdi>λ(t − s)</bdi>.",
      "أمثلة على الأحداث دي: jobs بتوصل لـ job shop، وطيارات بتوصل لـ runway، ومكالمات بتوصل لـ switchboard. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-pp-sim": "اعمل simulation لـ Poisson process والـ N(t) بتاعتها"
     }
    },
    {
     "h": "الـ Poisson process: الـ interarrival times",
     "pts": [
      "الـ A₁ و A₂ و … هي الـ interarrival times؛ والـ Aᵢ هو الوقت اللي عدّى بين الـ arrival رقم i والـ arrival رقم <bdi>i + 1</bdi> (slide 44).",
      "الرسمة (slide 44): خط زمني عليه:<span class=\"ltr\">0, t, A₁, A₁ + A₂, …</span>والـ A₁ هي المسافة من 0 لأول arrival، والـ A₂ هي المسافة لحد التاني.",
      "أول arrival بيحصل بعد الوقت t <b>إذا وفقط إذا (iff)</b> مفيش arrivals في <bdi>[0, t]</bdi>، فبالتالي:<span class=\"ltr\">P(A₁ > t) = P(N(t) = 0) = e^(−λt) and P(A₁ ≤ t) = 1 − e^(−λt)</span>ودي الـ CDF بتاعة <bdi>exp(λ)</bdi>.",
      "الـ interarrival times <bdi>A₁, A₂, …</bdi> بتبقى <b>exponentially distributed و independent والـ mean بتاعها <bdi>1/λ</bdi></b>.",
      "الـ summary diagram:<span class=\"ltr\">arrival counts ~ Poisson(λ) (stationary and independent) ⟷ interarrival time ~ exp(1/λ) (memoryless)</span>الـ slide بيكتب <bdi>exp(1/λ)</bdi> وقصده mean قيمته <bdi>1/λ</bdi>، يعني rate قيمته λ.",
      "الـ <b>Random splitting</b>: لو كل حدث بيبقى من type I باحتمال p (بشكل independent)، يبقى <bdi>N₁(t)</bdi> و <bdi>N₂(t)</bdi> الاتنين Poisson processes بـ rates <bdi>λp</bdi> و <bdi>λ(1 − p)</bdi>. ‡ (الـ lecture notes)",
      "الـ <b>Pooled process</b>: لو دمجنا Poisson processes مستقلين بـ rates <bdi>λ₁</bdi> و <bdi>λ₂</bdi> بيطلع Poisson process بـ rate <bdi>λ₁ + λ₂</bdi>. ‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-pp-times": "ليه الـ interarrival times بتبقى exponential (الـ slide 44)"
     }
    },
    {
     "h": "الـ Empirical distributions",
     "pts": [
      "هو distribution الـ parameters بتوعه هي <b>القيم اللي اتشافت في sample من الـ data</b> (slide 46).",
      "ممكن نستخدمه لما يبقى مستحيل أو مش ضروري نثبت إن الـ random variable ليه parametric distribution معين.",
      "<b>الميزة</b>: مفيش أي افتراض غير القيم اللي اتشافت في الـ sample.",
      "<b>العيب</b>: الـ sample ممكن ما تغطيش كل الـ range بتاع القيم الممكنة.",
      "الـ empirical distribution ممكن يبقى continuous أو discrete. ‡ (الـ lecture notes)"
     ]
    },
    {
     "h": "مثال empirical: أحجام المجموعات (discrete)",
     "pts": [
      "الزباين بيوصلوا في مجموعات من 1 لـ 8 أشخاص؛ واتسجّل آخر 300 مجموعة (slide 47؛ وفي الـ notes ده Example 3.15، مطعم وقت الغدا).",
      "الـ relative frequency هي الـ frequency مقسومة على 300، مثلًا <bdi>30/300 = 0.10</bdi> و <bdi>110/300 = 0.37</bdi>.",
      "عمود الـ cumulative بيجمع الـ relative frequencies المقرّبة. ‡ القيم الـ cumulative المظبوطة للأحجام 4 و 5 هي <bdi>256/300 = 0.853</bdi> و <bdi>268/300 = 0.893</bdi> (الـ slide بيوري 0.86 و 0.90).",
      "الرسمة (slide 48): على الشمال bar chart للـ relative frequency (الأعلى عند الحجم 2، وبعده 4 ثم 3 ثم 1)؛ وعلى اليمين الـ empirical CDF طالعة من 0.10 عند الحجم 1 لحد 1.00 عند الحجم 8."
     ],
     "figH": {
      "ms-groups": "أحجام المجموعات: الـ relative frequency والـ empirical CDF"
     }
    },
    {
     "h": "الـ Example 3.16: أوقات تصليح الـ conveyor (continuous، من الـ lecture notes)",
     "pts": [
      "أوقات تصليح conveyor system لآخر 100 failure (Table 3.4). ‡ (الـ lecture notes)",
      "الـ empirical CDF بتتعمل بإننا نوصّل النقط <bdi>[x, F(x)]</bdi> بخطوط مستقيمة:<span class=\"ltr\">(0, 0), (0.5, 0.21), (1.0, 0.33), (1.5, 0.62), (2.0, 0.81), (2.5, 0.89), (3.0, 1.00)</span>‡ (الـ lecture notes)"
     ],
     "figH": {
      "ms-conveyor": "أوقات تصليح الـ conveyor: الـ empirical CDF بخطوط مستقيمة"
     }
    },
    {
     "h": "مثال محلول: discrete distribution والـ CDF والـ random numbers",
     "pts": [
      "الـ X (slide 49) بياخد القيم دي بالـ probabilities دي:<span class=\"ltr\">x = 2, 5, 7, 9, 10<br>p = 0.2, 0.2, 0.2, 0.3, 0.1</span>المطلوب:<br>(a) ارسم الـ CDF<br>(b) هات قيمة X اللي بتقابل الـ uniform variate 0.78 على <bdi>[0, 1]</bdi><br>(c) احسب الـ mean والـ variance والـ standard deviation",
      "الجزء (a): نجمع الـ probabilities تراكميًا (slide 50):<span class=\"ltr\">CDF = 0.2, 0.4, 0.6, 0.9, 1.00</span>",
      "الرسمة (slide 51): الـ CDF على شكل سلالم، فيها درجات عند 2 و 5 و 7 و 9 و 10 (الارتفاعات 0.2 و 0.4 و 0.6 و 0.9 و 1)؛ وسهم على ارتفاع 0.78 بيروح بالعرض لحد الدرجة اللي عند 9 وبعدين بينزل لـ <bdi>x = 9</bdi>.",
      "الـ random numbers بتتحوّل كده (slide 52):<span class=\"ltr\">0 ≤ R ≤ 0.2: x = 2<br>0.2 < R ≤ 0.4: x = 5<br>0.4 < R ≤ 0.6: x = 7<br>0.6 < R ≤ 0.9: x = 9<br>0.9 < R ≤ 1.00: x = 10</span>",
      "الجزء (b): بما إن <bdi>0.6 < 0.78 ≤ 0.9</bdi>، يبقى <b><bdi>x = 9</bdi></b>.",
      "الجزء (c): الـ slide سايبه تمرين (<bdi>\"Try to compute\"</bdi>). والحل:<span class=\"ltr\">E(X) = 2(0.2) + 5(0.2) + 7(0.2) + 9(0.3) + 10(0.1) = 0.4 + 1 + 1.4 + 2.7 + 1 = <b>6.5</b></span>",
      "وبعدين:<span class=\"ltr\">E(X²) = 4(0.2) + 25(0.2) + 49(0.2) + 81(0.3) + 100(0.1) = 0.8 + 5 + 9.8 + 24.3 + 10 = 49.9<br>V(X) = 49.9 − 6.5² = 49.9 − 42.25 = <b>7.65</b><br>σ = √7.65 = <b>2.77</b></span>"
     ],
     "figH": {
      "ms-disc-cdf": "من الـ random number للقيمة X على الـ step CDF",
      "ms-disc-moments": "الجزء (c) صف بصف: المتوسط والتباين والـ standard deviation"
     }
    }
   ],
   "cards": [
    "الـ X اللي عدد القيم الممكنة ليه محدود (finite) أو countably infinite؛ وبيتوصف بـ PMF:<span class=\"ltr\">p(xᵢ) = P(X = xᵢ)</span>",
    "الشرطين:<span class=\"ltr\">p(xᵢ) ≥ 0 for all i, and Σ p(xᵢ) = 1</span>",
    "الـ X اللي الـ range space بتاعه R_X عبارة عن interval أو مجموعة intervals؛ وبيتوصف بـ PDF اسمها f(x)، بحيث:<span class=\"ltr\">P(a ≤ X ≤ b) = ∫ₐᵇ f(x)dx</span>",
    "قيمتها 0، وعشان كده:<span class=\"ltr\">P(a ≤ X ≤ b) = P(a < X ≤ b) = P(a ≤ X < b) = P(a < X < b)</span>",
    "الـ CDF هي <bdi>F(x) = P(X ≤ x)</bdi>؛ وهي nondecreasing، و <bdi>F(−∞) = 0</bdi> و <bdi>F(∞) = 1</bdi>؛ والقانون:<span class=\"ltr\">P(a < X ≤ b) = F(b) − F(a)</span>",
    "القانون:<span class=\"ltr\">V(X) = E((X − E[X])²) = E(X²) − (E(X))²</span>وهو مقياس للانتشار حوالين الـ mean. والـ <bdi>σ = √V(X)</bdi>.",
    "القانون <bdi>C.O.V. = σ/μ</bdi> (بشرط <bdi>μ > 0</bdi>)؛ ملوش وحدات (dimensionless)، ومقياس normalized للتشتت؛ وبنستخدمه عشان نقارن مجموعات data مختلفة.",
    "الـ covariance:<span class=\"ltr\">Cov(x,y) = E(xy) − E(x)E(y)</span>وبيبقى صفر لو المتغيرات independent. والـ correlation:<span class=\"ltr\">ρ = σ²xy/(σxσy)</span>وقيمته بين −1 و +1.",
    "الـ xα هي القيمة اللي عندها <bdi>F(xα) = α</bdi>؛ والـ median هو الـ <bdi>0.5-quantile</bdi>؛ والـ mode هو القيمة الأكثر احتمالًا (أعلى pᵢ أو الـ maximum بتاع الـ PDF).",
    "لو الـ data categorical: الـ mode. لو الـ total هو اللي يهمنا: الـ mean. لو skewed: الـ median. غير كده: الـ mean.",
    "محاولة واحدة:<span class=\"ltr\">p(1) = p, p(0) = q = 1 − p; E = p, V = pq</span>",
    "عدد الـ successes في n Bernoulli trials:<span class=\"ltr\">p(x) = C(n,x)pˣqⁿ⁻ˣ, x = 0..n; E = np, V = npq</span>",
    "عدد الـ trials لحد أول success:<span class=\"ltr\">p(x) = qˣ⁻¹p, x = 1, 2, …; E = 1/p, V = q/p²</span>",
    "القانون:<span class=\"ltr\">p(x) = αˣe^(−α)/x!, x = 0, 1, …; E(X) = V(X) = α</span>",
    "القوانين:<span class=\"ltr\">f = 1/(b − a); F = (x − a)/(b − a); E = (a + b)/2; V = (b − a)²/12</span>والـ <bdi>U(0,1)</bdi> هو اللي بيولّد الـ random numbers.",
    "القوانين:<span class=\"ltr\">f = λe^(−λx), F = 1 − e^(−λx), x ≥ 0; E = 1/λ, V = 1/λ²</span>وهو memoryless؛ والـ intercept بتاع الـ PDF بيساوي λ؛ وبيعمل model للـ interarrival times العشوائية تمامًا.",
    "متماثل (symmetric) حوالين μ؛ وأعلى قيمة عند μ (يعني الـ mean = الـ mode)؛ ومفيش CDF في closed form، فبنستخدم <bdi>Z = (X − μ)/σ ~ N(0,1)</bdi> والـ Φ، والقاعدة:<span class=\"ltr\">Φ(−x) = 1 − Φ(x)</span>",
    "أكتر distribution بيتستخدم في تحليل الـ data؛ ومجموع normals مستقلين بيطلع normal؛ ومجموع observations كتير مستقلة من أي distribution بيطلع normal.",
    "الـ arrivals بتيجي واحد واحد؛ و stationary increments؛ و independent increments.",
    "القوانين:<span class=\"ltr\">P[N(t) = n] = (λt)ⁿe^(−λt)/n!<br>E[N(t)] = V[N(t)] = λt<br>N(t) − N(s) ~ Poisson(λ(t − s))</span>",
    "بتبقى exponential و independent والـ mean بتاعها <bdi>1/λ</bdi>:<span class=\"ltr\">P(A₁ > t) = P(N(t) = 0) = e^(−λt)</span>",
    "الـ parameters هي قيم الـ sample اللي اتشافت. <b>الميزة</b>: مفيش افتراض غير الـ data. <b>العيب</b>: الـ sample ممكن ما تغطيش الـ range كله.",
    "الـ parameters هي <bdi>a ≤ b ≤ c</bdi>، والـ mode عند b، والـ mean:<span class=\"ltr\">E(X) = (a + b + c)/3</span>",
    "الـ location ν والـ scale α والـ shape β؛ ولو <bdi>ν = 0</bdi> و <bdi>β = 1</bdi> بيبقى exponential بـ <bdi>λ = 1/α</bdi>."
   ],
   "qa": [
    "الـ random variable X بيبقى <b>discrete</b> لو عدد القيم الممكنة ليه محدود أو countably infinite (زي عدد الـ packets اللي بتوصل الـ router كل ثانية، و <bdi>R_X = {0, 1, 2, …}</bdi>). والـ <b>PMF</b> بتاعه <bdi>p(xᵢ) = P(X = xᵢ)</bdi> لازم تحقق:<br>(1) إن <bdi>p(xᵢ) ≥ 0</bdi> لكل i<br>(2) إن <bdi>Σ p(xᵢ) = 1</bdi><br>والـ X بيبقى <b>continuous</b> لو الـ range space بتاعه interval أو مجموعة intervals. والـ <b>PDF</b> بتاعه f(x) بتدّينا:<span class=\"ltr\">P(a ≤ X ≤ b) = ∫ₐᵇ f(x)dx</span>ولازم تحقق:<br>(1) إن <bdi>f(x) ≥ 0</bdi> على R_X<br>(2) إن <bdi>∫ f(x)dx = 1</bdi> على R_X<br>(3) إن <bdi>f(x) = 0</bdi> برا R_X<br>ولأي X من النوع continuous بيبقى <bdi>P(X = x₀) = 0</bdi>.",
    "الـ CDF:<span class=\"ltr\">F(x) = ½∫₀ˣ e^(−t/2)dt = 1 − e^(−x/2)</span>أقل من سنتين:<span class=\"ltr\">P(0 ≤ X ≤ 2) = F(2) − F(0) = 1 − e⁻¹ = 0.632</span>بين 2 و 3 سنين:<span class=\"ltr\">P(2 ≤ X ≤ 3) = F(3) − F(2) = e⁻¹ − e^(−1.5) = 0.368 − 0.223 = 0.145</span>الـ mean (بالـ integration by parts مع <bdi>u = x</bdi> و <bdi>v′ = e^(−x/2)</bdi> و <bdi>v = −2e^(−x/2)</bdi>):<span class=\"ltr\">E(X) = ½∫₀^∞ x e^(−x/2)dx = 2</span>وبعدين:<span class=\"ltr\">E(X²) = ½∫₀^∞ x²e^(−x/2)dx = 8<br>V(X) = 8 − 2² = 4, σ = 2 years</span>",
    "الـ <bdi>{N(t), t ≥ 0}</bdi> بيبقى Poisson process بـ rate λ لو:<br>(1) الـ arrivals بتيجي واحد واحد<br>(2) ليه stationary increments (الـ arrivals في <bdi>[t, t + s]</bdi> بتعتمد على s بس)<br>(3) ليه independent increments (الأعداد في الفترات اللي مش متداخلة independent)<br>ساعتها:<span class=\"ltr\">P[N(t) = n] = (λt)ⁿe^(−λt)/n!, E = V = λt</span>أول arrival بيبقى بعد t إذا وفقط إذا (iff) <bdi>N(t) = 0</bdi>، فبالتالي:<span class=\"ltr\">P(A₁ > t) = e^(−λt), P(A₁ ≤ t) = 1 − e^(−λt)</span>ودي الـ exponential CDF. يعني الـ interarrival times بتبقى exponential و independent والـ mean بتاعها <bdi>1/λ</bdi>، وكمان memoryless.",
    "الجزء (a): الـ CDF دالة سلالم (step function):<span class=\"ltr\">F(2) = 0.2, F(5) = 0.4, F(7) = 0.6, F(9) = 0.9, F(10) = 1.0</span>الجزء (b): الـ ranges:<span class=\"ltr\">[0, 0.2] → 2, (0.2, 0.4] → 5, (0.4, 0.6] → 7, (0.6, 0.9] → 9, (0.9, 1] → 10</span>وبما إن <bdi>0.6 < 0.78 ≤ 0.9</bdi>، يبقى <b><bdi>x = 9</bdi></b>.<br>الجزء (c):<span class=\"ltr\">E(X) = 0.4 + 1.0 + 1.4 + 2.7 + 1.0 = 6.5<br>E(X²) = 0.8 + 5 + 9.8 + 24.3 + 10 = 49.9<br>V(X) = 49.9 − 6.5² = 7.65<br>σ = √7.65 = 2.77</span>",
    "الـ empirical distribution الـ parameters بتوعه هي القيم اللي اتشافت في sample من الـ data. بنستخدمه لما يبقى مستحيل أو مش ضروري نثبت parametric distribution معين. <b>الميزة</b>: مفيش افتراض غير القيم اللي اتشافت. <b>العيب</b>: الـ sample ممكن ما تغطيش كل الـ range بتاع القيم الممكنة.<br>المثال: 300 مجموعة، كل واحدة من 1 لـ 8 زباين؛ والـ frequencies:<span class=\"ltr\">30, 110, 45, 71, 12, 13, 7, 12</span>بتدّي relative frequencies:<span class=\"ltr\">0.10, 0.37, 0.15, 0.24, 0.04, 0.04, 0.02, 0.04</span>والـ cumulative:<span class=\"ltr\">0.10, 0.47, 0.62, 0.86, 0.90, 0.94, 0.96, 1.00</span>ودي بتكوّن الـ empirical CDF.",
    "الجزء (a):<span class=\"ltr\">p(1) = 1/15 ≈ 0.067, p(2) = 2/15 ≈ 0.133, p(3) = 3/15 = 0.2, p(4) = 4/15 ≈ 0.267, p(5) = 5/15 ≈ 0.333</span>ومجموعهم <bdi>15/15 = 1</bdi>. والرسم: خطوط رأسية بالارتفاعات دي عند <bdi>x = 1, ..., 5</bdi>.<br>الجزء (b): الـ <bdi>F(x) = Σ p(xᵢ)</bdi> لكل <bdi>xᵢ ≤ x</bdi>:<span class=\"ltr\">F(1) = 1/15; F(2) = 3/15 = 1/5; F(3) = 6/15 = 2/5; F(4) = 10/15 = 2/3; F(5) = 15/15 = 1</span>و <bdi>F(x) = 0</bdi> لما <bdi>x < 1</bdi>. والرسم: step function بتنط عند <bdi>x = 1, 2, 3, 4, 5</bdi> وبتفضل مسطحة بينهم.<br>الجزء (c): القيم <bdi>x = 2, 3, 4</bdi> بس هي اللي جوه <bdi>[1.9999, 4.0001]</bdi>:<span class=\"ltr\">P = (2 + 3 + 4)/15 = 9/15 = <b>3/5 = 0.6</b> (= F(4) − F(1) = 10/15 − 1/15)</span>الجزء (d):<span class=\"ltr\">E(X) = Σ x p(x) = (1 + 4 + 9 + 16 + 25)/15 = 55/15 = <b>11/3 ≈ 3.667</b></span>الجزء (e):<span class=\"ltr\">E(X²) = Σ x² p(x) = (1 + 8 + 27 + 64 + 125)/15 = 225/15 = 15<br>V(X) = E(X²) − [E(X)]² = 15 − (11/3)² = 15 − 121/9 = 14/9 ≈ <b>1.556</b></span>",
    "ده exponential pdf بـ <bdi>λ = 1/2</bdi>، فـ <bdi>F(x) = 1 − e^(−x/2)</bdi> لما <bdi>x ≥ 0</bdi>.<br>الجزء (1):<span class=\"ltr\">P(0 ≤ X ≤ 2) = F(2) − F(0) = (1 − e^(−1)) − 0 = 1 − 0.368 = <b>0.632</b></span>الجزء (2):<span class=\"ltr\">P(2 ≤ X ≤ 3) = ∫₂³ (1/2)e^(−x/2) dx = [−e^(−x/2)]₂³ = −e^(−3/2) + e^(−1) = −0.223 + 0.368 = <b>0.145</b></span>(حل الـ sheet لـ Q9 كاتب −0.233 في سطر منهم؛ والصح <bdi>e^(−1.5) = 0.223</bdi>. والـ 0.145 النهائية صح.)",
    "هنا الزهرة متلاعب فيها بحيث <bdi>p(x) = x/21</bdi> (لأن <bdi>1 + 2 + ... + 6 = 21</bdi>):<br><table><tr><th>x</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>p(x)</td><td>1/21</td><td>2/21</td><td>3/21</td><td>4/21</td><td>5/21</td><td>6/21</td></tr></table>الـ mean:<span class=\"ltr\">E(X) = Σ x p(x) = (1 + 4 + 9 + 16 + 25 + 36)/21 = 91/21 = <b>4.33</b></span>وبعدين:<span class=\"ltr\">E(X²) = Σ x² p(x) = (1 + 8 + 27 + 64 + 125 + 216)/21 = 441/21 = 21</span>الـ variance:<span class=\"ltr\">V(X) = E(X²) − [E(X)]² = 21 − (4.33)² = <b>2.22</b></span>الـ standard deviation:<span class=\"ltr\">σ = √2.22 = <b>1.49</b></span>",
    "عندنا <bdi>n = 50</bdi> من الـ Bernoulli trials، و <bdi>p = 0.02</bdi> و <bdi>q = 0.98</bdi>. والـ X (عدد الـ chips اللي مش مطابقة) توزيعه:<span class=\"ltr\">X ~ Binomial(50, 0.02): p(x) = C(50, x)(0.02)^x(0.98)^(50−x)</span>المطلوب <bdi>P(X > 2) = 1 − P(X ≤ 2)</bdi>، حيث:<span class=\"ltr\">P(X ≤ 2) = (0.98)^50 + 50(0.02)(0.98)^49 + 1225(0.02)²(0.98)^48 = 0.3642 + 0.3716 + 0.1858 = 0.9216 ≈ 0.92</span>يبقى:<span class=\"ltr\">P(X > 2) = 1 − 0.92 = <b>0.08</b> (0.0784)</span>يعني الـ process بتقف في حوالي 8% من الأيام.<br>الـ mean والـ variance:<span class=\"ltr\">E(X) = np = 50(0.02) = <b>1</b>; V(X) = npq = 50(0.02)(0.98) = <b>0.98</b></span>",
    "الـ X (عدد الـ trials لحد أول success، يعني أول قبول) توزيعه <b>geometric</b>:<span class=\"ltr\">p(x) = q^(x−1) p, x = 1, 2, ...</span>القيم:<span class=\"ltr\">q = 0.4 (rejected), p = 1 − 0.4 = 0.6 (accepted)</span>الحساب:<span class=\"ltr\">p(3) = (0.4)²(0.6) = <b>0.096</b></span>يعني في حوالي 10% من الحالات الطابعة التالتة هي أول واحدة تتقبل.",
    "الـ Poisson:<span class=\"ltr\">p(x) = e^(−α) α^x / x!, α = 2</span>الجزء (1):<span class=\"ltr\">p(3) = e^(−2)·2³/3! = 0.1353 × 8/6 = <b>0.18</b></span>ومن جدول الـ cumulative Poisson (A.4):<span class=\"ltr\">F(3) − F(2) = 0.857 − 0.677 = 0.18</span>الجزء (2):<span class=\"ltr\">P(X ≥ 2) = 1 − p(0) − p(1) = 1 − F(1) = 1 − (0.135 + 0.271) = 1 − 0.406 = <b>0.594</b></span>",
    "الأتوبيسات بتيجي <bdi>7:00</bdi> و <bdi>7:20</bdi> و <bdi>7:40</bdi> (في الفترة اللي تهمنا). نخلّي X عدد الدقايق بعد <bdi>7:00</bdi> اللي الراكب بيوصل فيها؛ يبقى <bdi>X ~ U(0, 30)</bdi> و <bdi>F(x) = x/30</bdi>.<br>الانتظار بيزيد عن 5 دقايق لو الراكب وصل بين <bdi>7:00</bdi> و <bdi>7:15</bdi> (الأتوبيس الجاي <bdi>7:20</bdi>) أو بين <bdi>7:20</bdi> و <bdi>7:30</bdi> (الأتوبيس الجاي <bdi>7:40</bdi>).<br>الحساب:<span class=\"ltr\">P = P(0 < X < 15) + P(20 < X < 30) = [F(15) − F(0)] + [F(30) − F(20)] = 15/30 − 0 + 1 − 20/30 = <b>5/6 ≈ 0.833</b></span>",
    "الـ exponential:<span class=\"ltr\">F(x) = 1 − e^(−λx), λ = 1/3</span>والـ x هنا بالآلاف ساعة.<br>الجزء (1):<span class=\"ltr\">P(X > 3) = 1 − F(3) = 1 − (1 − e^(−3/3)) = e^(−1) = <b>0.368</b></span>وده صح لأي exponential:<span class=\"ltr\">P(X > mean) = e^(−1)</span>الجزء (2):<span class=\"ltr\">P(2 ≤ X ≤ 3) = F(3) − F(2) = (1 − e^(−1)) − (1 − e^(−2/3)) = −0.368 + 0.513 = <b>0.145</b></span>",
    "عندنا <bdi>μ = 12</bdi> و <bdi>σ² = 4</bdi> يعني <bdi>σ = 2</bdi>.<br>الحساب:<span class=\"ltr\">F(10) = Φ((10 − 12)/2) = Φ(−1) = 1 − Φ(1) = 1 − 0.8413 = <b>0.1587</b></span>ودي المساحة اللي في الـ tail اللي على الشمال.",
    "عندنا <bdi>μ = 15</bdi> و <bdi>σ² = 9</bdi> يعني <bdi>σ = 3</bdi>.<br>الحساب:<span class=\"ltr\">P(14 ≤ X ≤ 17) = F(17) − F(14) = Φ((17 − 15)/3) − Φ((14 − 15)/3) = Φ(0.667) − Φ(−0.333) = 0.7475 − 0.3696 = <b>0.378</b></span>",
    "الـ Weibull CDF:<span class=\"ltr\">F(x) = 1 − exp[−((x − ν)/α)^β] for x ≥ ν</span>نحسب:<span class=\"ltr\">((1.5 − 1.34)/0.04)^0.5 = (0.16/0.04)^0.5 = 4^0.5 = 2<br>F(1.5) = 1 − e^(−2) = 1 − 0.135 = 0.865<br>P(X > 1.5) = 1 − F(1.5) = e^(−2) = <b>0.135</b></span>(الـ key بتاع الـ sheet والـ lecture notes بيقولوا 0.865، بس الرقم ده هو <bdi>F(1.5) = P(X ≤ 1.5)</bdi>، يعني احتمال إن الطيارة تاخد 1.5 دقيقة أو أقل؛ والخطوة <bdi>\"1 − exp[...]\"</bdi> هي أصلًا F(1.5)، ولو طرحناها من 1 تاني يفضل <bdi>exp(−2) = 0.135</bdi>.)",
    "للـ triangular distribution اللي الـ minimum بتاعه a والـ mode بتاعه b والـ maximum بتاعه c، لما <bdi>b < x ≤ c</bdi>:<span class=\"ltr\">F(x) = 1 − (c − x)² / [(c − a)(c − b)]</span>وبما إن <bdi>1.1 < 2.5 ≤ 6.5</bdi>:<span class=\"ltr\">F(2.5) = 1 − (6.5 − 2.5)² / [(6.5 − 0.05)(6.5 − 1.1)] = 1 − 16 / (6.45 × 5.4) = 1 − 16/34.83 = 1 − 0.459 = <b>0.541</b></span>"
   ],
   "quiz": [
    [
     "صح. الـ mean هو <bdi>E(X) = (a + b)/2 = (0 + 2)/2 = 1</bdi> <bdi>(L3, Uniform Distribution)</bdi>.",
     "غلط: الـ 5 مش هي <bdi>(0 + 2)/2</bdi>. في <bdi>U(a, b)</bdi> الـ mean هو <bdi>(a + b)/2 = 1</bdi> <bdi>(L3, Uniform Distribution)</bdi>.",
     "غلط: الـ 10 مش هي <bdi>(0 + 2)/2</bdi>. الـ mean هو <bdi>(a + b)/2 = 1</bdi> <bdi>(L3, Uniform Distribution)</bdi>.",
     "غلط: فيه اختيار صح، لأن <bdi>(0 + 2)/2 = 1</bdi> <bdi>(L3, Uniform Distribution)</bdi>."
    ],
    [
     "صح. الـ normal PDF متماثل (symmetric) حوالين μ، يعني <bdi>f(μ − x) = f(μ + x)</bdi>، فنص القيم تحت μ: يبقى الـ mean = الـ median (وكمان الـ mode، لأن الـ PDF أعلى قيمة ليها عند <bdi>x = μ</bdi>) <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: الـ mean > الـ median بيحصل في distribution عنده right skew؛ لكن الـ normal PDF متماثل حوالين μ، فالـ mean = الـ median <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: الـ mean < الـ median بيحصل في distribution عنده left skew؛ لكن الـ normal متماثل، فالـ mean = الـ median <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: الـ mean = الـ median صح في الـ normal distribution (متماثل حوالين μ) <bdi>(L3, Normal Distribution)</bdi>."
    ],
    [
     "صح. الـ <bdi>N(μ, σ²)</bdi> الـ mean بتاعه μ، فالـ <bdi>N(10, 1/2)</bdi> الـ mean بتاعه 10 (والـ variance بتاعه <bdi>1/2</bdi>) <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: الـ 5 ده يبقى الـ mean بتاع <bdi>Binomial(10, 1/2)</bdi> اللي هو np؛ لكن في <bdi>N(10, 1/2)</bdi> أول parameter هو الـ mean، يعني 10 <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: الـ 1 مش parameter هنا؛ والـ <bdi>N(μ, σ²)</bdi> الـ mean بتاعه <bdi>μ = 10</bdi> <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: الاختيار A هو الصح: الـ mean بتاع <bdi>N(10, 1/2)</bdi> هو 10 <bdi>(L3, Normal Distribution)</bdi>."
    ],
    [
     "غلط: القيم <bdi>N = 16, p = 1/2</bdi> بتدّي mean قيمته 8 و variance قيمته 4، مش mean قيمته 80 <bdi>(L3, Binomial Distribution)</bdi>.",
     "غلط: القيم <bdi>N = 16, p = 1/4</bdi> بتدّي mean قيمته 4 و variance قيمته 3 <bdi>(L3, Binomial Distribution)</bdi>.",
     "غلط: القيم <bdi>N = 32, p = 1/4</bdi> بتدّي mean قيمته 8 و variance قيمته 6 <bdi>(L3, Binomial Distribution)</bdi>.",
     "صح. الحساب:<span class=\"ltr\">np = 80 and npq = 4 → q = 4/80 = 0.05, p = 0.95, n = 80/0.95 = 84.2</span>والـ n دي مش رقم صحيح، فمفيش اختيار ينفع <bdi>(L3, Binomial Distribution)</bdi>. والـ Ch3 MCQ review بتاع الدكتور فيه نفس السؤال ده بالظبط وإجابته D. (ولو الـ mean كان 8 والـ variance كان 4 كانت الإجابة <bdi>N = 16, p = 1/2</bdi>.)"
    ],
    [
     "غلط: القيمة الأكثر احتمالًا هي الـ mode؛ أما الـ median فهو الـ <bdi>0.5-quantile</bdi> <bdi>(L3, Mean, median, and mode)</bdi>.",
     "صح. الـ MODE هو القيمة الأكثر احتمالًا؛ والـ median هو الـ <bdi>0.5-quantile</bdi> (نص القيم أصغر منه ونصها أكبر) <bdi>(L3, Mean, median, and mode)</bdi>."
    ],
    [
     "غلط: لو الـ data categorical الـ flowchart بيقول استخدم الـ mode مش الـ mean <bdi>(L3, Selecting among mean, median, and mode)</bdi>.",
     "صح. في اختيار الـ central tendency: لو الـ data categorical يبقى نستخدم الـ mode <bdi>(L3, Selecting among mean, median, and mode)</bdi>."
    ],
    [
     "صح. الـ normal PDF متماثل حوالين μ وأعلى قيمة ليه عند <bdi>x = μ</bdi> (slide 37)، فنص القيم على كل ناحية من μ: يعني الـ mean = الـ median = الـ mode.",
     "غلط: الـ mean > الـ median بيحصل في distribution عنده right skew؛ لكن الـ normal PDF متماثل حوالين μ <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: الـ mean < الـ median بيحصل في distribution عنده left skew؛ لكن الـ normal PDF متماثل حوالين μ <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: الاختيار A صح: التماثل حوالين μ بيخلّي الـ mean = الـ median <bdi>(L3, Normal Distribution)</bdi>."
    ],
    [
     "غلط: الـ 10 هي n، يعني عدد الـ trials. والـ mean هو <bdi>n×p = 10 × 1/2 = 5</bdi> <bdi>(L3, Binomial Distribution)</bdi>.",
     "صح. الـ mean هو <bdi>E(X) = n×p = 10 × 1/2 = 5</bdi> (slide 28).",
     "غلط: الـ mean هو <bdi>n×p = 10 × 0.5 = 5</bdi>، مش 1 <bdi>(L3, Binomial Distribution)</bdi>.",
     "غلط: الاختيار B هو الصح، لأن <bdi>n×p = 5</bdi> <bdi>(L3, Binomial Distribution)</bdi>."
    ],
    [
     "صح. الـ mean هو <bdi>E(X) = (a + b)/2 = (0 + 2)/2 = 1</bdi> (slide 34).",
     "غلط: الـ mean هو <bdi>E(X) = (a + b)/2 = (0 + 2)/2 = 1</bdi> <bdi>(L3, Uniform Distribution)</bdi>.",
     "غلط: الـ mean هو <bdi>E(X) = (a + b)/2 = 1</bdi>؛ والـ 10 مش حتى جوه <bdi>(0, 2)</bdi> <bdi>(L3, Uniform Distribution)</bdi>.",
     "غلط: الاختيار A هو الصح، لأن <bdi>(0 + 2)/2 = 1</bdi> <bdi>(L3, Uniform Distribution)</bdi>."
    ],
    [
     "صح. القسمة <bdi>npq/np = q = 4/8 = 1/2</bdi>، يبقى <bdi>p = 1/2</bdi> و <bdi>n = 8/(1/2) = 16</bdi>. وللتأكد: <bdi>np = 8</bdi> و <bdi>npq = 16 × 1/2 × 1/2 = 4</bdi>.",
     "غلط: الـ mean كان هيبقى <bdi>16 × 1/4 = 4</bdi>، مش 8 <bdi>(L3, Binomial Distribution: E(X) = np, V(X) = npq)</bdi>.",
     "غلط: الـ mean <bdi>32 × 1/4 = 8</bdi> صح، بس الـ variance <bdi>32 × 1/4 × 3/4 = 6</bdi>، مش 4 <bdi>(L3, Binomial Distribution)</bdi>.",
     "غلط: الـ mean كان هيبقى <bdi>2 × 1/2 = 1</bdi>، مش 8 <bdi>(L3, Binomial Distribution)</bdi>."
    ],
    [
     "غلط: ده بيدّي mean قيمته 8 و variance قيمته 4، مش mean قيمته 80 <bdi>(L3, Binomial Distribution)</bdi>.",
     "غلط: ده بيدّي mean قيمته 4 و variance قيمته 3 <bdi>(L3, Binomial Distribution)</bdi>.",
     "غلط: ده بيدّي mean قيمته 8 و variance قيمته 6 <bdi>(L3, Binomial Distribution)</bdi>.",
     "صح. القسمة <bdi>q = npq/np = 4/80 = 0.05</bdi>، يبقى <bdi>p = 0.95</bdi> و <bdi>n = 80/0.95 ≈ 84.2</bdi>، ودي مش حتى رقم صحيح؛ ومفيش ولا pair من اللي في الاختيارات بيدّي mean قيمته 80."
    ],
    [
     "غلط: الـ <bdi>E(Y) = (1 − 1)/2 = 0</bdi> و <bdi>V(Y) = 4/2² = 1</bdi>؛ والـ variance بصفر مستحيل في الـ normal <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: ده X نفسه؛ لكن طرح μ والقسمة على σ بيغيّروه <bdi>(L3, Normal Distribution)</bdi>.",
     "صح. الـ <bdi>σ = √4 = 2</bdi>، فالـ <bdi>Y = (X − μ)/σ</bdi> هو تحويل الـ standard normal <bdi>Z ~ N(0, 1)</bdi> (slide 38).",
     "غلط: الـ mean بيبقى <bdi>(1 − 1)/2 = 0</bdi>، مش 1 <bdi>(L3, Normal Distribution)</bdi>."
    ],
    [
     "صح. الـ <bdi>N(μ, σ²)</bdi> بيتكتب والـ mean الأول (slide 37)، فـ <bdi>μ = 10</bdi> (والـ variance <bdi>1/2</bdi>).",
     "غلط: الـ <bdi>N(μ, σ²)</bdi> الـ mean بتاعه <bdi>μ = 10</bdi> <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: الـ <bdi>N(μ, σ²)</bdi> الـ mean بتاعه <bdi>μ = 10</bdi> <bdi>(L3, Normal Distribution)</bdi>.",
     "غلط: الاختيار A هو الصح: <bdi>μ = 10</bdi> <bdi>(L3, Normal Distribution)</bdi>."
    ],
    [
     "غلط: الـ mean بيبقى <bdi>(1 + 1)/2 = 1</bdi>، بس الـ variance <bdi>4/2² = 1</bdi>، مش 0 <bdi>(L3, Mean and variance of sums: V(aX) = a²V(X))</bdi>.",
     "غلط: الـ mean بيبقى 1، بس القسمة على 2 بتقسم الـ variance على <bdi>2² = 4</bdi>: يعني <bdi>V(Y) = 4/4 = 1</bdi> <bdi>(L3, Mean and variance of sums)</bdi>.",
     "غلط: الـ <bdi>(X − 1)/2</bdi> بس هو اللي الـ mean بتاعه 0؛ هنا <bdi>E(Y) = (1 + 1)/2 = 1</bdi> <bdi>(L3, Normal Distribution)</bdi>.",
     "صح. الـ Y توزيعه normal بـ mean <bdi>(1 + 1)/2 = 1</bdi> و variance <bdi>4/2² = 1</bdi>، يعني <bdi>N(1, 1)</bdi>، وده مش موجود في الاختيارات من A لـ C. (الـ key بتاع الـ sheet بيقول D وده صح، بس الشرح بتاعه كاتب الـ variance كده <bdi>(4/2)² = 1</bdi>؛ والصح <bdi>4/2² = 1</bdi>.)"
    ],
    [
     "غلط: الـ <bdi>f(x₀)</bdi> ده density مش probability <bdi>(L3, Continuous random variables)</bdi>.",
     "غلط: الـ <bdi>F(x₀)</bdi> معناها <bdi>P(X ≤ x₀)</bdi> <bdi>(L3, Cumulative distribution function)</bdi>.",
     "صح. الـ integral للـ <bdi>f(x)dx</bdi> من x₀ لـ x₀ بيساوي 0.",
     "غلط: المساحة الكلية تحت الـ PDF بس هي اللي بتساوي 1 <bdi>(L3, Continuous random variables)</bdi>."
    ],
    [
     "غلط: الـ C.O.V. بيستخدم σ مش σ² <bdi>(L3, Coefficient of variation, covariance and correlation)</bdi>.",
     "صح. الـ C.O.V. هو الـ standard deviation على الـ mean، بشرط <bdi>μ > 0</bdi>.",
     "غلط: ده مقلوب الـ C.O.V. <bdi>(L3, Coefficient of variation, covariance and correlation)</bdi>.",
     "غلط: ده الـ covariance <bdi>(L3, Coefficient of variation, covariance and correlation)</bdi>."
    ],
    [
     "غلط: الـ mode بنختاره بس لما الـ data تبقى categorical <bdi>(L3, Selecting among mean, median and mode)</bdi>.",
     "غلط: الـ mean بنختاره لما الـ total يهمنا، أو لما الـ distribution ما يكونش skewed <bdi>(L3, Selecting among mean, median and mode)</bdi>.",
     "صح. الـ data مش categorical، والـ total مش مهم، والـ distribution skewed: يبقى نستخدم الـ median.",
     "غلط: الـ standard deviation بيقيس الانتشار مش الـ central tendency <bdi>(L3, Variance and standard deviation)</bdi>."
    ],
    [
     "غلط: الـ binomial بيعد عدد الـ successes في عدد ثابت n من الـ trials <bdi>(L3, Binomial distribution)</bdi>.",
     "صح. الـ geometric distribution هو عدد الـ Bernoulli trials لحد أول success:<span class=\"ltr\">p(x) = qˣ⁻¹p, E(X) = 1/p</span>",
     "غلط: الـ Poisson بيعد الأحداث في فترة زمنية ثابتة بمعدل متوسط معروف <bdi>(L3, Poisson distribution)</bdi>.",
     "غلط: الـ uniform ده continuous distribution على interval <bdi>(a, b)</bdi> <bdi>(L3, Continuous distributions: uniform)</bdi>."
    ],
    [
     "غلط: الـ <bdi>V(X) = α</bdi> مش α² <bdi>(L3, Poisson distribution)</bdi>.",
     "صح. الـ mean والـ variance بتوع الـ Poisson الاتنين α.",
     "غلط: دول الـ mean والـ variance بتوع الـ exponential لما <bdi>λ = α</bdi> <bdi>(L3, Exponential distribution)</bdi>.",
     "غلط: دول بتوع الـ binomial <bdi>(L3, Binomial distribution)</bdi>."
    ],
    [
     "غلط: الـ 3.5 ده الـ mean <bdi>(a + b)/2 = (1 + 6)/2</bdi> <bdi>(L3, Continuous distributions: uniform)</bdi>.",
     "صح. القانون:<span class=\"ltr\">V(X) = (b − a)²/12 = (6 − 1)²/12 = 25/12 ≈ 2.08</span>",
     "غلط: الفرق <bdi>(b − a)</bdi> لازم يتربّع: <bdi>(b − a)²/12 = 25/12</bdi> <bdi>(L3, Continuous distributions: uniform)</bdi>.",
     "غلط: الـ 0.2 ده ارتفاع الـ PDF، يعني <bdi>1/(b − a) = 1/5</bdi> <bdi>(L3, Continuous distributions: uniform)</bdi>."
    ],
    [
     "صح. الـ <bdi>f(0) = λe⁰ = λ</bdi>، فلما الـ λ تختلف المنحنيات بتبدأ من ارتفاعات مختلفة وفي الآخر بتتقاطع.",
     "غلط: الـ <bdi>f(0) = λe^(−λ·0) = λ</bdi> <bdi>(L3, Exponential distribution)</bdi>."
    ],
    [
     "صح. الـ <bdi>E(X) = 1/λ</bdi> و <bdi>V(X) = 1/λ²</bdi>، فـ <bdi>σ = √(1/λ²) = 1/λ = E(X)</bdi>؛ والـ lecture notes بتقول <bdi>\"mean and standard deviation are equal\"</bdi>.",
     "غلط: الـ <bdi>E(X) = 1/λ</bdi> و <bdi>σ = √V(X) = √(1/λ²) = 1/λ</bdi>، يعني متساويين <bdi>(L3, Exponential distribution)</bdi>."
    ],
    [
     "غلط: أعداد الـ arrivals هي اللي Poisson؛ أما الأوقات بين الـ arrivals فـ exponential <bdi>(L3, Poisson process: interarrival times)</bdi>.",
     "صح. الـ <bdi>P(A₁ > t) = P(N(t) = 0) = e^(−λt)</bdi>.",
     "غلط: الـ interarrival times بتبقى exponential مش uniform <bdi>(L3, Poisson process: interarrival times)</bdi>.",
     "غلط: هي exponential <bdi>(L3, Poisson process: interarrival times)</bdi>."
    ],
    [
     "غلط: ده الشرط رقم 1 <bdi>(L3, Poisson process)</bdi>.",
     "غلط: ده الشرط رقم 2 <bdi>(L3, Poisson process)</bdi>.",
     "غلط: ده الشرط رقم 3 <bdi>(L3, Poisson process)</bdi>.",
     "صح. ده مش شرط؛ وفي الحقيقة الـ interarrival times في الـ Poisson process بتبقى exponential."
    ],
    [
     "غلط: هو مش بيفترض أي حاجة غير القيم اللي اتشافت؛ ودي ميزته <bdi>(L3, Empirical distributions)</bdi>.",
     "صح. ده العيب اللي مكتوب في الـ slide.",
     "غلط: ممكن يبقى discrete أو continuous <bdi>(L3, Empirical distributions)</bdi>.",
     "غلط: دي خاصية الـ Poisson <bdi>(L3, Poisson distribution)</bdi>."
    ]
   ],
   "extra": [
    [
     "صح. الـ <bdi>p(0) = e⁻² = 0.135</bdi>.",
     "غلط: ده <bdi>p(1) = 2e⁻²</bdi> <bdi>(L3, Poisson distribution)</bdi>.",
     "غلط: ده <bdi>F(1) = p(0) + p(1)</bdi> <bdi>(L3, Example: repair person beeps (Poisson))</bdi>.",
     "غلط: ده <bdi>P(X ≥ 2) = 1 − F(1)</bdi> <bdi>(L3, Example: repair person beeps (Poisson))</bdi>."
    ],
    [
     "غلط: ده <bdi>F(3) = 1 − e⁻¹</bdi>، يعني احتمال إنها تبوظ قبل 3000 ساعة <bdi>(L3, Example 3.9)</bdi>.",
     "صح. الـ <bdi>P(X > 3) = 1 − F(3) = e^(−3/3) = e⁻¹ = 0.368</bdi>.",
     "غلط: ده <bdi>P(2 ≤ X ≤ 3) = e^(−2/3) − e⁻¹</bdi> <bdi>(L3, Example 3.9)</bdi>.",
     "غلط: ده <bdi>e^(−2/3) = P(X > 2)</bdi> <bdi>(L3, Example 3.9)</bdi>."
    ],
    [
     "غلط: ده احتمال إنه يستنى أكتر من 5 دقايق <bdi>(L3, Example 3.8)</bdi>.",
     "صح. عشان يستنى 5 دقايق أو أقل لازم يوصل في <bdi>(15, 20]</bdi> دقيقة بعد <bdi>7:00</bdi>:<span class=\"ltr\">5/30 = 1/6 = 1 − 5/6</span>",
     "غلط: اللي بيوصلوا في <bdi>(0, 15)</bdi> و <bdi>(20, 30)</bdi> بيستنوا أكتر من 5 دقايق؛ والفترة <bdi>[15, 20]</bdi> بس هي اللي بتدّي انتظار 5 دقايق أو أقل <bdi>(L3, Example 3.8: waiting for a bus)</bdi>.",
     "غلط: فترة 5 دقايق بس من الـ 30 هي اللي بتدّي انتظار قصير، يعني <bdi>1/6</bdi> <bdi>(L3, Example 3.8)</bdi>."
    ],
    [
     "غلط: ده <bdi>F(56) = Φ(2)</bdi> <bdi>(L3, Normal examples)</bdi>.",
     "صح. الحساب:<span class=\"ltr\">P(X > 56) = 1 − Φ((56 − 50)/3) = 1 − Φ(2) = 1 − 0.9772 = 0.0228</span>",
     "غلط: ده <bdi>Φ(−1)</bdi> اللي استخدمناه في مثال الـ vessel <bdi>(L3, Normal examples)</bdi>.",
     "غلط: الـ <bdi>z = (56 − 50)/3 = 2</bdi> لأن <bdi>σ = √9 = 3</bdi>، مش 9 <bdi>(L3, Normal examples)</bdi>."
    ],
    [
     "غلط: ده الـ mean E(X) <bdi>(L3, Worked example: discrete distribution, CDF and random numbers)</bdi>.",
     "غلط: ده <bdi>E(X²)</bdi>؛ لازم نطرح منه <bdi>(E(X))² = 42.25</bdi> <bdi>(L3, Worked example: discrete distribution, CDF and random numbers)</bdi>.",
     "صح. الحساب:<span class=\"ltr\">V(X) = E(X²) − (E(X))² = 49.9 − 6.5² = 49.9 − 42.25 = 7.65</span>",
     "غلط: ده الـ standard deviation <bdi>√7.65</bdi> <bdi>(L3, Worked example: discrete distribution, CDF and random numbers)</bdi>."
    ],
    [
     "غلط: الحجم 2 بيغطي <bdi>0.10 < R ≤ 0.47</bdi>؛ والـ 0.50 أكبر من كده <bdi>(L3, Empirical example: group sizes (discrete))</bdi>.",
     "صح. بما إن <bdi>0.47 < 0.50 ≤ 0.62</bdi>، يبقى حجم المجموعة 3.",
     "غلط: الحجم 4 بيغطي <bdi>0.62 < R ≤ 0.86</bdi> <bdi>(L3, Empirical example: group sizes (discrete))</bdi>.",
     "غلط: الحجم 5 بيغطي <bdi>0.86 < R ≤ 0.90</bdi> <bdi>(L3, Empirical example: group sizes (discrete))</bdi>."
    ],
    [
     "صح. ده geometric بـ <bdi>p = 0.6</bdi> و <bdi>q = 0.4</bdi>:<span class=\"ltr\">E = 1/p = 1/0.6 = 1.667, V = q/p² = 0.4/0.36 = 1.111</span>",
     "غلط: القيم دي بتستخدم <bdi>p = 0.4</bdi> (احتمال الرفض) على إنه احتمال الـ success <bdi>(L3, Geometric distribution)</bdi>.",
     "غلط: دول الـ mean p والـ variance pq بتوع الـ Bernoulli <bdi>(L3, Discrete distributions: Bernoulli)</bdi>.",
     "غلط: الـ 0.096 ده p(3) مش الـ mean <bdi>(L3, Example 3.6)</bdi>."
    ],
    [
     "غلط: ده لساعة واحدة؛ لكن لـ <bdi>t = 3</bdi> الـ parameter بيبقى λt <bdi>(L3, Poisson process)</bdi>.",
     "صح. الـ <bdi>E[N(t)] = V[N(t)] = λt = 2 × 3 = 6</bdi>.",
     "غلط: في الـ Poisson process الـ variance بيساوي الـ mean اللي هو λt، مش مربعه <bdi>(L3, Poisson process)</bdi>.",
     "غلط: الـ <bdi>3/2</bdi> ده <bdi>t/λ</bdi>، وده مش كمية ليها علاقة بالـ Poisson process <bdi>(L3, Poisson process)</bdi>."
    ],
    [
     "غلط: ده <bdi>P(A₁ ≤ 1) = 1 − e⁻²</bdi> <bdi>(L3, Poisson process: interarrival times)</bdi>.",
     "صح. الـ <bdi>P(A₁ > t) = P(N(t) = 0) = e^(−λt) = e⁻² = 0.135</bdi>.",
     "غلط: الـ 0.5 ساعة دي هي الـ mean interarrival time <bdi>1/λ</bdi>، مش probability <bdi>(L3, Poisson process: interarrival times)</bdi>.",
     "غلط: ده <bdi>P(N(1) = 1) = 2e⁻²</bdi> <bdi>(L3, Poisson distribution)</bdi>."
    ],
    [
     "غلط: الـ 1.1 ده الـ mode b، مش الـ mean <bdi>(L3, Weibull, triangular and lognormal distributions)</bdi>.",
     "صح. القانون:<span class=\"ltr\">E(X) = (a + b + c)/3 = (0.05 + 1.1 + 6.5)/3 = 7.65/3 = 2.55 s</span>",
     "غلط: الـ <bdi>(a + c)/2</bdi> بيتجاهل الـ mode؛ والـ mean بتاع الـ triangular هو <bdi>(a + b + c)/3</bdi> <bdi>(L3, Weibull, triangular and lognormal distributions)</bdi>.",
     "غلط: الـ 0.541 ده الـ probability <bdi>F(2.5)</bdi> من Example 3.14، مش وقت <bdi>(L3, Weibull, triangular and lognormal distributions)</bdi>."
    ]
   ]
  },
  "4": {
   "notes": [
    {
     "h": "نظرة عامة ومحتويات المحاضرة",
     "pts": [
      "ده الـ Chapter 4 من سلايدات الدكتور، وعنوانه <b>Random‑Number Generation</b> يعني توليد الأرقام العشوائية (سلايد 1).",
      "المحتويات (سلايد 2):<br>• خصائص الـ random numbers <bdi>(Properties of Random Numbers)</bdi><br>• الـ <bdi>Pseudo-Random Numbers</bdi><br>• إزاي بنولّد random numbers، وفيها الـ <bdi>Linear Congruential Method</bdi> والـ <bdi>Combined Linear Congruential Method</bdi><br>• الاختبارات اللي بنعملها على الـ random numbers <bdi>(Tests for Random Numbers)</bdi><br>• الـ random numbers الحقيقية <bdi>(Real Random Numbers)</bdi>",
      "النظرة العامة (سلايد 3): هنتكلم عن خصائص الـ random numbers وإزاي بنولّدها، وبعدين ندخل على اختبارات العشوائية زي الـ <b>frequency test</b> والـ <b>autocorrelation test</b>.",
      "الصورة (سلايد 3): صورة نرد (dice) وكاريكاتير Dilbert. فيه مرشد سياحي بيورّي الناس الـ <bdi>\"random number generator\"</bdi>، وده كائن عمّال يقول <bdi>\"nine nine nine nine nine nine\"</bdi>. لما حد سأله <bdi>\"Are you sure that's random?\"</bdi> المرشد رد وقال <bdi>\"That's the problem with randomness: you can never be sure.\"</bdi> يعني إيه؟ إن ممكن تطلع لك سلسلة شكلها مش عشوائية خالص وهي جاية من مصدر عشوائي فعلًا، وعشان كده لازم نختبر العشوائية بالإحصاء مش بالعين.",
      "الـ <b>random number</b> هو رقم طالع من عملية نتيجتها مش ممكن تتوقعها، ومش ممكن تعيد إنتاجها تاني بشكل مضمون بعد كده. والـ random numbers دي هي الطوب الأساسي اللي بتتبني عليه كل خوارزميات الـ simulation. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "الـ Pseudo‑random numbers",
     "pts": [
      "<b>الطريقة</b>: بنولّد الـ random numbers حسابيًا، يعني بمعادلة وحسابات (سلايد 5).",
      "<b>ليه اسمها \"Pseudo\"</b>: لما بتولّد الأرقام بطريقة معروفة، كده إنت شيلت إمكانية إنها تبقى عشوائية بجد (سلايد 5). وبما إن السلسلة deterministic (محددة مسبقًا)، بنسمي الأرقام دي pseudo‑random يعني عشوائية \"شكلًا\". ‡ (من الـ lecture notes)",
      "<b>الهدف</b>: إننا نطلع سلسلة أرقام ما بين 0 و 1 بتقلّد (simulate) الخصائص المثالية للـ random numbers أو الـ RN (سلايد 6).",
      "الخصائص المهمة لأي routine كويسة بتولّد random numbers (سلايد 7):<br>(1) تكون <b>سريعة (Fast)</b><br>(2) تكون <b>Portable</b> يعني تشتغل على كمبيوترات مختلفة<br>(3) يكون ليها <b>cycle طويلة</b> كفاية<br>(4) تكون <b>Replicable</b> يعني تقدر تعيد نفس الأرقام: عشان الـ verification والـ debugging، وعشان تستخدم نفس الـ stream من الأرقام مع systems مختلفة<br>(5) تقرّب جدًا من الخصائص الإحصائية المثالية، وهي الـ <b>uniformity</b> والـ <b>independence</b>"
     ]
    },
    {
     "h": "خصائص الـ random numbers: الـ uniformity والـ independence",
     "pts": [
      "فيه خاصيتين إحصائيتين مهمين: الـ <b>uniformity</b> (التوزيع المنتظم) والـ <b>independence</b> (الاستقلال) (سلايد 8).",
      "كل random number اسمه R<sub>i</sub> لازم يتسحب بشكل مستقل من uniform distribution على الفترة من 0 لـ 1، والـ PDF بتاعته هي اللي تحت (سلايد 8).",
      "الرسمة (سلايد 8، الـ PDF بتاعة الـ random numbers): الـ f(x) خط أفقي مستوي ارتفاعه 1 من x بـ 0 لحد x بـ 1، وصفر في أي حتة تانية، يعني مستطيل مساحته 1.",
      "الـ variance بتاع R بيساوي 1 على 12. ‡ (من الـ lecture notes)",
      "النتايج اللي بتترتب على الـ uniformity والـ independence:<br>(1) لو قسمنا الفترة من 0 لـ 1 لـ n فئات (classes) طولهم متساوي، يبقى العدد المتوقع من الـ observations في كل فئة هو N على n (والـ N هو العدد الكلي للـ observations).<br>(2) احتمال إنك تلاقي قيمة في فترة معينة ملوش علاقة بالقيم اللي اتسحبت قبلها. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-rn-uniform": "الـ PDF بتاع الـ random number: مستطيل على الفترة من 0 لـ 1، والـ mean نص والـ variance واحد على 12"
     }
    },
    {
     "h": "مشاكل بتحصل وإحنا بنولّد pseudo‑random numbers",
     "pts": [
      "حاجات بتبعدنا عن العشوائية المثالية (سلايد 9):<br>(1) الأرقام اللي طلعت ممكن تكون <b>مش موزعة بانتظام (not uniformly distributed)</b><br>(2) ممكن تطلع <b>discrete بدل ما تكون continuous</b><br>(3) الـ <b>mean</b> بتاعها ممكن يكون عالي أوي أو واطي أوي<br>(4) الـ <b>variance</b> بتاعها ممكن يكون عالي أوي أو واطي أوي",
      "ممكن كمان يبقى فيه <b>dependence</b> يعني الأرقام معتمدة على بعض (سلايد 9):<br>• فيه <b>autocorrelation</b> بين الأرقام<br>• أرقام كل واحد فيها أعلى أو أوطى من اللي جنبه على التوالي<br>• كذا رقم فوق الـ mean وبعدهم كذا رقم تحت الـ mean"
     ]
    },
    {
     "h": "توليد الـ random numbers: الطرق والتاريخ",
     "pts": [
      "الطرق اللي هناخدها (سلايد 11): الـ <b>Midsquare method</b> والـ <b>Linear Congruential Method (LCM)</b> والـ <b>Combined Linear Congruential Generators (CLCG)</b>.",
      "لمحة تاريخية (سلايد 11):<span class=\"ltr\">• The Middle-Square (midsquare) Method (1949)<br>• Linear-Congruential Generation (LCG) (1951-1958)<br>• Mersenne Twister (MT) (1998)<br>• Philox (2011)<br>• 64-bit MELG (2018)<br>• Squares RNG (Philox 4x32-10) (2020)</span>",
      "السلايد بيحيلك لصفحة Wikipedia اللي اسمها <bdi>\"List of random number generators\"</bdi> عشان تشوف خوارزميات pseudo‑random كتير غير دول (سلايد 11).",
      "الـ LCM أول من اقترحه كان <b>Lehmer</b> سنة <b>1951</b>، وهو أكتر تقنية مستخدمة. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "الـ Midsquare method",
     "pts": [
      "ده <b>أول generator حسابي</b>، عملوه <b>von Neumann و Metropolis</b> في الأربعينات (سلايد 13).",
      "الخطوات (سلايد 13):<br>(1) ابدأ برقم صحيح موجب من 4 خانات اسمه Z₀<br>(2) احسب مربعه، يعني Z₀ في Z₀، هيطلع لك رقم لحد 8 خانات (ولو أقل كمّله أصفار من الشمال لحد ما يبقى 8 خانات)<br>(3) خد <b>الـ 4 خانات اللي في النص</b> وده يبقى الرقم الجاي، والـ U<sub>i</sub> بيساوي Z<sub>i</sub> مقسوم على 10000",
      "مثال لما Z₀ بـ 7182 (سلايد 13 و 14):<span class=\"ltr\">7182² = 51581124 → middle digits 5811 → U₁ = 0.5811<br>5811² = 33767721 → 7677<br>7677² = 58936329 → 9363 …</span>وهكذا (الجدول كامل تحت).",
      "<b>المشكلة</b>: الأرقام اللي بتطلع <b>بتميل للصفر</b> (سلايد 14). من أول i بـ 9 القيم بتصغر:<span class=\"ltr\">78, 60, 36, 12, 1 → 0</span>ولما توصل للصفر الـ generator بيفضل واقف على الصفر على طول.",
      "ملحوظة: السلايد كاتب الكسور العشرية بفاصلة (يعني <bdi>0,5811</bdi> هي 0.5811)، وكاتب U₁₀ على إنها 0.006 (وهي نفسها 0.0060)."
     ],
     "figH": {
      "ms-midsquare": "الـ midsquare method خطوة بخطوة على مثال الـ slide، ومع الـ seed بتاعك"
     }
    },
    {
     "h": "الـ Linear Congruential Method (LCM)",
     "pts": [
      "بيطلع سلسلة أرقام صحيحة X₁ و X₂ و … كلها ما بين 0 و m−1، عن طريق علاقة recursive (كل رقم بيتحسب من اللي قبله) (سلايد 16).",
      "الـ <b>a</b> هو الـ multiplier (المضروب فيه)، والـ <b>c</b> هو الـ increment (الزيادة)، والـ <b>m</b> هو الـ modulus (سلايد 16). والقيمة الابتدائية X₀ اسمها الـ <b>seed</b>. ‡ (من الـ lecture notes)",
      "الافتراض (سلايد 16):<span class=\"ltr\">m > 0,  a < m,  c < m,  X₀ < m</span>",
      "اختيار a و c و m و X₀ <b>بيأثر جامد جدًا</b> على الخصائص الإحصائية وعلى طول الـ cycle (سلايد 16).",
      "الأرقام الصحيحة العشوائية X<sub>i</sub> بتتولد في الفترة من 0 لـ m−1، وبعدين بنحوّلها لـ random numbers بالقسمة على m (سلايد 17):<span class=\"ltr\">R<sub>i</sub> = X<sub>i</sub>/m</span>",
      "ملحوظة (سلايد 17):<span class=\"ltr\">X<sub>i</sub> ∈ {0, 1, …, m−1},  R<sub>i</sub> ∈ [0, (m−1)/m]</span>",
      "لو الـ c مش بصفر الطريقة اسمها <b>mixed congruential method</b>، ولو الـ c بصفر يبقى اسمها <b>multiplicative congruential method</b>. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "مثال LCM الأول: X₀ بـ 27 و a بـ 17 و c بـ 43 و m بـ 100",
     "pts": [
      "مثال محلول (سلايد 18):<span class=\"ltr\">X₁ = (17×27 + 43) mod 100 = 502 mod 100 = 2 → R₁ = 0.02<br>X₂ = (17×2 + 43) mod 100 = 77 mod 100 = 77 → R₂ = 0.77<br>X₃ = (17×77 + 43) mod 100 = 1352 mod 100 = 52 → R₃ = 0.52<br>X₄ = (17×52 + 43) mod 100 = 927 mod 100 = 27 → R₃ = 0.27</span>",
      "الـ X₄ طلع 27 وده هو الـ seed نفسه (معلّم بالأحمر على السلايد)، يعني السلسلة هتعيد نفسها، والـ period طوله <b>4</b> بس.",
      "آخر سطر في السلايد كاتب الرقم الرابع على إنه R₃ بـ 0.27، والصح إنه <b>R₄ بـ 0.27</b>. ‡"
     ],
     "figH": {
      "ms-lcg": "الـ linear congruential generator رقم ورا رقم لحد ما الـ seed يرجع"
     }
    },
    {
     "h": "مثال LCM التاني: تأثير الـ seed (a بـ 13 و c بـ 0 و m بـ 64)",
     "pts": [
      "سلايد 19: لما a بـ 13 و c بـ 0 و m بـ 64، الـ <b>period بتاع الـ generator بيبقى قصير جدًا</b>، والـ <b>seed X₀ بيأثر على السلسلة</b>.",
      "بما إن c بصفر و m هي 2⁶ يعني 64، والـ a بـ 13 على شكل <bdi>5 + 8k</bdi> (لأن 13 هي <bdi>5 + 8</bdi> في 1)، يبقى أقصى period هو m على 4، يعني 64 على 4 بـ 16، وده بيحصل بس مع الـ <b>seeds الفردية</b> (X₀ بـ 1 و 3). ‡ (من الـ lecture notes)",
      "خطوات من المثال:<span class=\"ltr\">X₁ = (13×1) mod 64 = 13;  X₂ = 169 mod 64 = 41;  X₃ = 533 mod 64 = 21;  …  X₁₆ = (13×5) mod 64 = 65 mod 64 = 1</span>يعني رجعنا للـ seed. ولو X₀ بـ 2:<span class=\"ltr\">X₈ = (13×10) mod 64 = 130 mod 64 = 2</span>‡ (من الـ lecture notes)",
      "النتيجة: X₀ بـ 1 و X₀ بـ 3 بيدّوا period طوله <b>16</b>، والـ X₀ بـ 2 بيدّي period <b>8</b>، والـ X₀ بـ 4 بيدّي period <b>4</b>. والقيمة اللي الـ seed بيرجع عندها معلّمة بالأحمر على السلايد.",
      "السطور المحلولة في الـ lecture notes كاتبة أول قيمة على إنها X₂ لما X₀ بـ 1 و i بـ 1، والصح إنها X₁ (الجدول نفسه صح). ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-lcg-seeds": "الـ cycle بتاعة كل seed: الـ periods بتطلع 16 و 8 و 16 و 4"
     }
    },
    {
     "h": "شيت المحاضرة: مثال LCM (a بـ 13 و c بـ 0 و m بـ 32)",
     "pts": [
      "الشيت <bdi>Linear_Conq_Method_Example.xlsx</bdi> (الـ sheet اسمها \"LCM\") بيحسب القيم دي بالقيم a بـ 13 و c بـ 0 و m بـ 32 (شيت المحاضرة):<span class=\"ltr\">X<sub>i+1</sub> = MOD(a·X<sub>i</sub> + c, m),  R<sub>i</sub> = X<sub>i</sub>/m</span>",
      "لما الـ seed بـ 2:<span class=\"ltr\">X = 26, 18, 10, 2, 26 → R = 0.8125, 0.5625, 0.3125, 0.0625, 0.8125</span>الـ seed رجع بعد 4 خطوات (الـ period بـ 4).",
      "لما الـ seed بـ 6:<span class=\"ltr\">X = 14, 22, 30, 6, 14, 22, 30, 6 → R = 0.4375, 0.6875, 0.9375, 0.1875, …</span>وبرضه الـ period بـ 4.",
      "الـ seed في الحالتين زوجي، فالـ period طلع أقل من أقصى قيمة وهي m على 4 (يعني 32 على 4 بـ 8)، اللي كان هيدّيها seed فردي (لأن a بـ 13 على شكل <bdi>5 + 8k</bdi>)."
     ],
     "figH": {
      "ms-lcg-sheet": "الـ seeds الاتنين بتوع الـ spreadsheet: الاتنين الـ period بتاعهم 4"
     }
    },
    {
     "h": "مواصفات الـ generator الكويس",
     "pts": [
      "<b>أقصى density (Maximum density)</b> (سلايد 20): القيم اللي بياخدها R<sub>i</sub> (لـ i بـ 1 و 2 و …) متسيبش فجوات كبيرة في الفترة من 0 لـ 1.<br>• المشكلة: بدل ما كل R<sub>i</sub> يبقى continuous، هو في الحقيقة discrete.<br>• الحل: نختار modulus m رقم صحيح كبير جدًا (وساعتها التقريب ده تأثيره بيبان بسيط).",
      "<b>أقصى period (Maximum period)</b> (سلايد 20): عشان نوصل لأقصى density ونتجنب الـ cycling (إن الأرقام تعيد نفسها)، وده بيتحقق بإننا نختار a و c و m و X₀ صح.",
      "أغلب الكمبيوترات الرقمية بتمثّل الأرقام بالـ binary، فالسرعة والكفاءة بيتحسنوا لما الـ modulus m يكون <b>power of 2</b> (أو قريب منه) (سلايد 20).",
      "الرسمة (سلايد 22، من غير عنوان): فيها two scatter plots للـ random numbers المتتالية. في الـ 2-D النقط بتقع على شبكة منتظمة من خطوط مايلة متوازية، وفي الـ 3-D بتقع على كام خط أو مستوى متوازيين. الشكل المنتظم ده معناه إن الأرقام مش independent.",
      "الرسمة (سلايد 23، من غير عنوان): رسمتين كمان. الـ plot الـ 2-D لسه باين فيه النقط مترتبة في شرايط أفقية، أما الـ plot الـ 3-D فبيورّي سحابة نقط مالية الـ unit cube بانتظام، وده الشكل اللي المفروض الـ generator الكويس يطلّعه."
     ],
     "figH": {
      "ms-lcg-lattice": "الأرقام ورا بعض مرسومة في 2-D و 3-D: يا lattice منتظمة يا سحابة متوزعة بالتساوي"
     }
    },
    {
     "h": "الـ LCM: إزاي نختار الـ parameters صح",
     "pts": [
      "الحالة الأولى: <b>لما m هي 2<sup>b</sup> و c مش بصفر</b>: أطول period ممكن وهو <b>P بـ m يعني 2<sup>b</sup></b> بيتحقق لو الـ c و m <b>relatively prime</b> (ملهمش عامل مشترك)، والـ <b>a على شكل <bdi>1 + 4k</bdi></b> حيث k رقم صحيح (سلايد 21).",
      "الحالة التانية: <b>لما m هي 2<sup>b</sup> و c بصفر</b>: أطول period ممكن هو:<span class=\"ltr\">P = m/4 = 2<sup>b−2</sup></span>وبيتحقق لو الـ seed X₀ <b>فردي</b>، والـ a على شكل <b><bdi>3 + 8k</bdi> أو <bdi>5 + 8k</bdi></b> لـ k بـ 0 و 1 و … (سلايد 21).",
      "الحالة التالتة: <b>لما m عدد أولي (prime) و c بصفر</b>: أطول period ممكن هو <b>P بـ <bdi>m − 1</bdi></b>، وبيتحقق لو أصغر k يخلّي <bdi>a<sup>k</sup> − 1</bdi> يقبل القسمة على m هو k بـ <bdi>m − 1</bdi> (سلايد 21).",
      "السلايد فيه لينك لقايمة parameters الـ LCG اللي بيستخدمها الـ compilers المشهورة (<bdi>\"Common Compilers\"</bdi>، سلايد 21)."
     ],
     "figH": {
      "ms-lcg-rules": "قارن قواعد الـ maximum period التلاتة بالـ period اللي بيطلع فعلًا"
     }
    },
    {
     "h": "الـ random numbers في Java",
     "pts": [
      "الـ <code>java.util.Random</code> هو في الأصل LCG (سلايد 24)، والقيم بتاعته:<span class=\"ltr\">multiplier = 0x5DEECE66D = 25214903917<br>addend (increment) = 0xB = 11<br>mask = (1 &lt;&lt; 48) − 1 = 2⁴⁸ − 1 = 281474976710655</span>",
      "القانون بتاعه:<span class=\"ltr\">nextseed = (oldseed × multiplier + addend) &amp; mask<br>X<sub>i+1</sub> = (25214903917·X<sub>i</sub> + 11) mod 2⁴⁸</span>يعني الـ mask هنا شغال كأنه mod 2⁴⁸، والـ method بترجّع الـ bits اللي فوق باستخدام unsigned right shift <bdi>(>>>)</bdi>."
     ]
    },
    {
     "h": "الـ General congruential generators",
     "pts": [
      "الـ LCGs حالة خاصة من generators على الشكل ده:<span class=\"ltr\">X<sub>i+1</sub> = g(X<sub>i</sub>, X<sub>i−1</sub>, …) mod m</span>والـ g() دي function في قيم X<sub>i</sub> اللي فاتت، والـ X<sub>i</sub> بيبقى ما بين 0 و m−1، والـ R<sub>i</sub> بيساوي X<sub>i</sub> على m (سلايد 25).",
      "تلات أمثلة (سلايد 25): الـ <b>quadratic congruential generator</b> والـ <b>multiple recursive generators</b> والـ <b>Fibonacci generator</b> (المعادلات تحت)."
     ]
    },
    {
     "h": "الـ Combined Linear Congruential Generators (CLCG)",
     "pts": [
      "<b>السبب</b>: محتاجين generator الـ period بتاعه أطول، لأن الـ systems اللي بنعملها simulation بقت معقدة أكتر وأكتر (سلايد 26).",
      "<b>الطريقة</b>: بنجمع (combine) اتنين أو أكتر من الـ <b>multiplicative</b> congruential generators (سلايد 26).",
      "نفترض إن <bdi>X<sub>i,1</sub></bdi> و <bdi>X<sub>i,2</sub></bdi> و … و <bdi>X<sub>i,k</sub></bdi> هم الـ output رقم i من k generators مختلفين من النوع الـ multiplicative congruential. الـ generator رقم j (سلايد 26):<br>• الـ modulus بتاعه m<sub>j</sub> وده عدد أولي، والـ multiplier بتاعه a<sub>j</sub>، والـ period بتاعه <bdi>m<sub>j</sub> − 1</bdi><br>• بيطلّع أرقام صحيحة <bdi>X<sub>i,j</sub></bdi> موزعة تقريبًا بانتظام من 0 لحد <bdi>m<sub>j</sub> − 1</bdi> (الـ notes بتقول من 1 لحد <bdi>m<sub>j</sub> − 1</bdi>)<br>• القيمة <bdi>W<sub>i,j</sub></bdi> اللي هي <bdi>X<sub>i,j</sub> − 1</bdi> بتبقى موزعة تقريبًا بانتظام على الأرقام الصحيحة من 0 لحد <bdi>m<sub>j</sub> − 2</bdi>",
      "سلايد 26 كاتب الـ generator رقم j كده:<span class=\"ltr\">X<sub>i+1,j</sub> = (a<sub>j</sub>X<sub>i</sub> + c<sub>j</sub>) mod m<sub>j</sub></span>بس في الـ multiplicative generator الـ c<sub>j</sub> بصفر، والقيمة اللي قبلها هي <bdi>X<sub>i,j</sub></bdi>، يعني الصح:<span class=\"ltr\">X<sub>i+1,j</sub> = a<sub>j</sub>X<sub>i,j</sub> mod m<sub>j</sub></span>وده اللي مستخدم في سلايد 28. ‡",
      "<b>النظرية (Theorem)</b>: لو <bdi>W<sub>i,1</sub></bdi> و … و <bdi>W<sub>i,k</sub></bdi> متغيرات عشوائية discrete ومستقلة، والـ <bdi>W<sub>i,1</sub></bdi> موزع بانتظام على الأرقام الصحيحة من 0 لـ m₁ − 2، يبقى:<span class=\"ltr\">W<sub>i</sub> = (Σ W<sub>i,j</sub>) mod (m₁ − 1)</span>برضه موزع بانتظام على الأرقام الصحيحة من 0 لـ m₁ − 2. ‡ (من الـ lecture notes)",
      "الشكل المقترح للـ combined generator والـ R<sub>i</sub> بتاعه (سلايد 27) موجودين تحت. والمعامل <bdi>(−1)<sup>j−1</sup></bdi> بيعمل الطرح <bdi>X<sub>i,1</sub> − 1</bdi> بشكل ضمني. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "مثال CLCG: الـ generator بتاع L'Ecuyer للكمبيوترات الـ 32‑bit",
     "pts": [
      "بنجمع generatorين (k بـ 2) بالقيم دي (سلايد 28):<span class=\"ltr\">m₁ = 2147483563,  a₁ = 40014<br>m₂ = 2147483399,  a₂ = 40692</span>والـ generator ده اقترحه L'Ecuyer سنة 1988. ‡ (من الـ lecture notes)",
      "الخوارزمية (سلايد 28):<span class=\"ltr\">Step 1: select seeds X<sub>0,1</sub> in [1, 2147483562] and X<sub>0,2</sub> in [1, 2147483398]; set i = 0<br>Step 2: X<sub>i+1,1</sub> = 40014 × X<sub>i,1</sub> mod 2147483563<br>        X<sub>i+1,2</sub> = 40692 × X<sub>i,2</sub> mod 2147483399<br>Step 3: X<sub>i+1</sub> = (X<sub>i+1,1</sub> − X<sub>i+1,2</sub>) mod 2147483562<br>Step 4: R<sub>i+1</sub> = X<sub>i+1</sub>/2147483563 if X<sub>i+1</sub> > 0<br>        R<sub>i+1</sub> = 2147483562/2147483563 if X<sub>i+1</sub> = 0<br>Step 5: i = i + 1, go back to Step 2</span>يعني: (1) نختار الـ seeds ونبدأ بـ i بصفر<br>(2) نحسب الخطوة الجاية لكل generator لوحده<br>(3) نطرحهم ونعمل mod<br>(4) نرجّع الـ R، ولو الناتج صفر نرجّع القيمة الخاصة اللي فوق<br>(5) نزوّد i ونرجع للخطوة التانية.",
      "الـ period بتاع الـ combined generator (سلايد 28):<span class=\"ltr\">(m₁ − 1)(m₂ − 1)/2 ≈ 2 × 10¹⁸</span>وللتأكد:<span class=\"ltr\">2147483562 × 2147483398 / 2 ≈ 2.3 × 10¹⁸</span>",
      "شيت المحاضرة <bdi>(Ex_Comb_Cong_Method.xlsx)</bdi> بيشغّل الخوارزمية دي بالـ seeds دي: <bdi>X<sub>0,1</sub></bdi> بـ 111 و <bdi>X<sub>0,2</sub></bdi> بـ 222. أول خطوة:<span class=\"ltr\">X<sub>1,1</sub> = 40014×111 mod m₁ = 4441554<br>X<sub>1,2</sub> = 40692×222 mod m₂ = 9033624<br>X₁ = (4441554 − 9033624) mod 2147483562 = −4592070 mod 2147483562 = 2142891492<br>R₁ = 2142891492/2147483563 = 0.997862</span>",
      "في الشيت، الخلية بتاعة X₂ بتستخدم mod m₁ بدل mod (m₁ − 1)؛ بس النتيجة هنا واحدة لأن الفرق موجب وأصغر من m₁ − 1. (من شيت المحاضرة)"
     ],
     "figH": {
      "ms-clcg": "الـ combined generator بتاع L'Ecuyer بالخطوات من 1 لـ 5، بالـ seeds بتوع الـ spreadsheet"
     }
    },
    {
     "h": "الـ random numbers في Excel 2003",
     "pts": [
      "الـ Excel 2003 والـ 2007 بيستخدموا random number generator جديد بيجمع تلات multiplicative generators (سلايد 29)، والـ seeds هي X و Y و Z وكل واحد فيهم من 1 لحد 30000.",
      "بيقولوا إن الطريقة دي بتطلّع أكتر من 10¹³ رقم (سلايد 29). المرجع:<span class=\"ltr\">http://support.microsoft.com/kb/828795</span>"
     ]
    },
    {
     "h": "اختبارات الـ random numbers: الـ hypotheses والـ significance level",
     "pts": [
      "فيه نوعين من الاختبارات (سلايد 31): اختبار الـ <b>uniformity</b> واختبار الـ <b>independence</b>.",
      "الـ Uniformity:<span class=\"ltr\">H₀: R<sub>i</sub> ~ U[0,1]<br>H₁: R<sub>i</sub> ≁ U[0,1]</span>و<b>إننا منرفضش الـ H₀ (Failure to reject H₀)</b> معناها إننا ملقيناش دليل إن الأرقام مش uniform، مش إننا أثبتنا إنها uniform (سلايد 31).",
      "الـ Independence:<span class=\"ltr\">H₀: R<sub>i</sub> ~ independent<br>H₁: R<sub>i</sub> ≁ independent</span>وبرضه إننا منرفضش الـ H₀ معناها إننا ملقيناش دليل على الـ dependence (سلايد 31).",
      "<b>الـ Level of significance α</b>: هو احتمال إننا نرفض الـ H₀ وهي صح (سلايد 31):<span class=\"ltr\">α = P(reject H₀ | H₀ is true)</span>وغالبًا بنختار α بـ 0.01 أو 0.05. ‡ (من الـ lecture notes)",
      "إننا منرفضش الـ H₀ ده ميعنيش إننا خلاص مش محتاجين نختبر الـ generator تاني للـ independence. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "خمس أنواع من اختبارات الـ random numbers",
     "pts": [
      "(1) الـ <b>Frequency test</b>: بيستخدم الـ Kolmogorov–Smirnov test أو الـ chi‑square test عشان يقارن توزيع الأرقام اللي اتولدت بالـ <b>uniform</b> distribution (سلايد 32).",
      "(2) الـ <b>Runs test</b>: بيختبر الـ runs up and down أو الـ runs above and below the mean، عن طريق إنه يقارن القيم الفعلية بالقيم المتوقعة، والـ statistic اللي بنقارن بيه هو الـ chi‑square (سلايد 32). (الاختبارات اللي على <i>عدد</i> الـ runs بتستخدم Z statistic في سلايد 55 و 56، والـ chi‑square بيتستخدم مع <i>طول</i> الـ runs. ‡ (من الـ lecture notes))",
      "(3) الـ <b>Autocorrelation test</b>: بيختبر الـ correlation بين الأرقام، وبيقارن الـ sample correlation بالـ correlation المتوقع اللي هو صفر (سلايد 32).",
      "(4) الـ <b>Gap test</b>: بيعدّ كام digit بيظهروا ما بين كل تكرار والتاني لـ digit معين، وبعدين بيستخدم الـ Kolmogorov–Smirnov test عشان يقارن بالعدد المتوقع من الـ gaps (سلايد 33).",
      "(5) الـ <b>Poker test</b>: بيعامل كل مجموعة أرقام مع بعض كأنها poker hand (إيد في لعبة البوكر)، وبيقارن الـ hands اللي طلعت باللي متوقع باستخدام الـ chi‑square test (سلايد 33).",
      "أول اختبار بيشيّك على الـ <b>uniformity</b>، والاختبارات من 2 لـ 5 بتشيّك على الـ <b>independence</b>. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-rn-tests": "كل test بيختبر إيه: الـ uniformity ولا الـ independence"
     }
    },
    {
     "h": "الـ Frequency test الأول: اختبار Kolmogorov–Smirnov (KS)",
     "pts": [
      "بيقارن الـ CDF الـ continuous بتاعة الـ uniform distribution واللي اسمها F(x)، بالـ <b>empirical CDF</b> اللي اسمها <b>S<sub>N</sub>(x)</b> والمحسوبة من الـ N observations بتوع العينة (سلايد 35).",
      "الرسمة (سلايد 35): الـ F(x) بصفر لما x أقل من صفر، وبعدين بتطلع خط مستقيم من النقطة <bdi>(0,0)</bdi> لحد النقطة <bdi>(1,1)</bdi>، وبتفضل بـ 1 لما x أكبر من 1.",
      "الـ empirical CDF دي step function (شكلها سلم) بتنط عند كل قيمة اتشافت في العينة، وكل ما N يكبر الـ S<sub>N</sub>(x) بتقرب من F(x). ‡ (من الـ lecture notes)",
      "الاختبار مبني على الـ statistic ده:<span class=\"ltr\">D = max |F(x) − S<sub>N</sub>(x)|</span>والـ sampling distribution بتاع D معروف ومتحط في جدول اسمه Table A.8 (سلايد 35).",
      "الخطوات (سلايد 36):<br>(1) رتّب الداتا من الأصغر للأكبر:<span class=\"ltr\">R<sub>(1)</sub> ≤ R<sub>(2)</sub> ≤ … ≤ R<sub>(N)</sub></span>(2) احسب D⁺ و D⁻ (المعادلات تحت)<br>(3) احسب D اللي هي الأكبر فيهم:<span class=\"ltr\">D = max(D⁺, D⁻)</span>(4) هات الـ critical value اللي اسمها D<sub>α</sub> للـ significance level α وحجم العينة N<br>(5) لو D أقل من أو بيساوي D<sub>α</sub> اقبل (يعني منرفضش الـ H₀)، غير كده ارفض الـ H₀",
      "الـ D⁺ هو أكبر انحراف للـ S<sub>N</sub>(x) <b>فوق</b> الـ F(x)، والـ D⁻ هو أكبر انحراف للـ S<sub>N</sub>(x) <b>تحت</b> الـ F(x). ‡ (من الـ lecture notes)",
      "الـ KS test أقوى من الـ chi‑square لأنه ينفع يتطبق على عينات صغيرة، أما الـ chi‑square فمحتاج عينة كبيرة (مثلًا N من 50 وأكتر). ‡ (من الـ lecture notes)",
      "الـ critical values بتاعة الـ KS (سلايد 36، وهي نفسها Table A.8) موجودة في الجدول، ولو N أكبر من 35 استخدم:<span class=\"ltr\">1.22/√N,  1.36/√N,  1.63/√N</span>"
     ],
     "figH": {
      "ms-ks-cdf": "الـ F(x) والـ empirical CDF وهي بتقرب منها كل ما الـ N يكبر"
     }
    },
    {
     "h": "مثال KS: عينة فيها 5 أرقام",
     "pts": [
      "الداتا (سلايد 37) والـ α بـ 0.05:<span class=\"ltr\">0.44, 0.81, 0.14, 0.05, 0.93</span>",
      "الخطوة الأولى، الأرقام بعد الترتيب:<span class=\"ltr\">R<sub>(i)</sub> = 0.05, 0.14, 0.44, 0.81, 0.93</span>الخطوة التانية في الجدول اللي تحت (العلامة \"-\" معناها قيمة سالبة، ودي مستحيل تبقى الـ maximum).",
      "النتايج:<span class=\"ltr\">D⁺ = max{i/N − R<sub>(i)</sub>} = 0.26   (at i = 2)<br>D⁻ = max{R<sub>(i)</sub> − (i−1)/N} = 0.21   (at i = 4)</span>",
      "الخطوة التالتة:<span class=\"ltr\">D = max(D⁺, D⁻) = 0.26</span>الخطوة الرابعة: لما α بـ 0.05 و N بـ 5:<span class=\"ltr\">D<sub>α</sub> = 0.565 > D = 0.26</span>عشان كده <b>مش هنرفض الـ H₀</b> (ملقيناش فرق عن الـ uniform distribution).",
      "الرسمة (سلايد 37): السلم S<sub>N</sub>(x) بينط 0.2 عند كل R<sub>(i)</sub>، ومرسوم قصاد الخط المايل F(x) اللي بيساوي x. الفجوات الرأسية مكتوب عليها:<span class=\"ltr\">0.05, 0.15, 0.26, 0.04, 0.16, 0.21, 0.13, 0.07</span>وأكبرهم 0.26 وجاية على طول بعد R<sub>(2)</sub> اللي هي 0.14.",
      "الـ sheet اللي اسمها \"KSTest\" في شيت المحاضرة بتطبّق معادلات D⁺ و D⁻ على الأرقام بترتيبها الأصلي من غير ما ترتّبها، فالقيم اللي طالعة فيها (زي 0.75 و 0.61) مش هي الـ KS statistics. لازم ترتّب الأول (الخطوة الأولى)، والنتيجة الصح هي D بـ 0.26 زي سلايد 37. ‡"
     ],
     "figH": {
      "ms-ks": "الـ KS test على الخمس أرقام خطوة بخطوة، وعلى أرقامك انت"
     }
    },
    {
     "h": "الـ Frequency test التاني: الـ chi‑square test",
     "pts": [
      "بيستخدم الـ sample statistic اللي اسمه χ₀² (سلايد 39)، والـ n هو عدد الـ classes، والـ O<sub>i</sub> هو العدد اللي اتشاف فعلًا (observed) في الـ class رقم i، والـ E<sub>i</sub> هو العدد المتوقع (expected) في الـ class رقم i.",
      "الـ χ₀² بيمشي تقريبًا على الـ chi‑square distribution بـ <b><bdi>n − 1</bdi> degrees of freedom</b> (سلايد 39).",
      "في الـ uniform distribution الـ E<sub>i</sub> بيساوي N على n، والـ N هو العدد الكلي للـ observations (سلايد 39).",
      "<b>بيشتغل صح مع العينات الكبيرة بس</b>، مثلًا N من 50 وأكتر (سلايد 39).",
      "ارفض الـ H₀ لو:<span class=\"ltr\">χ₀² > χ²<sub>α,n−1</sub></span>غير كده منرفضش. واختار n بحيث كل E<sub>i</sub> يبقى 5 أو أكتر. ‡ (من الـ lecture notes)",
      "قيم مفيدة من Table A.6 لما α بـ 0.05:<span class=\"ltr\">χ²<sub>0.05,1</sub> = 3.84,  χ²<sub>0.05,2</sub> = 5.99,  χ²<sub>0.05,3</sub> = 7.81,  χ²<sub>0.05,4</sub> = 9.49,  χ²<sub>0.05,9</sub> = 16.9</span>"
     ]
    },
    {
     "h": "مثال chi‑square من سلايد 40 على 100 رقم و 10 فترات",
     "pts": [
      "عندنا 100 رقم من الفترة من 0 لـ 1، والـ α بـ 0.05، و 10 فترات، يبقى (سلايد 40):<span class=\"ltr\">E<sub>i</sub> = 100/10 = 10,  df = 9,  χ²<sub>0.05,9</sub> = 16.9</span>",
      "النتيجة:<span class=\"ltr\">χ₀² = 11.2 < χ²<sub>0.05,9</sub> = 16.9</span>يعني <b>نقبل</b> (منرفضش) فرضية الـ uniformity.",
      "في صف الـ \"Sum\" السلايد كاتب صفر تحت عمود <bdi>(O<sub>i</sub>−E<sub>i</sub>)²</bdi>، والحقيقة إن مجموع العمود ده 112:<span class=\"ltr\">0+1+25+16+36+9+0+9+0+16 = 112</span>بس الـ χ₀² النهائي اللي هو 11.2 صح. ‡"
     ],
     "figH": {
      "ms-chisq-slide": "مجموع الـ chi‑square بتاع الـ slide 40 خطوة بخطوة"
     }
    },
    {
     "h": "مثال chi‑square محلول من الـ notes (Example 4.5)",
     "pts": [
      "عندنا 100 رقم كل واحد من خانتين، وبنختبرهم للـ uniformity بـ α بـ 0.05، والـ n بـ 10 classes:<span class=\"ltr\">(0.01-0.10), (0.11-0.20), …, (0.91-1.00)</span>والـ E<sub>i</sub> بيساوي 100 على 10 يعني 10. ‡ (من الـ lecture notes)",
      "الداتا (100 رقم زي ما هي مطبوعة في الـ notes):<span class=\"ltr\">0.34 0.90 0.25 0.89 0.87 0.44 0.12 0.21 0.46 0.67<br>0.83 0.76 0.79 0.64 0.70 0.81 0.94 0.74 0.22 0.74<br>0.96 0.99 0.77 0.67 0.56 0.41 0.52 0.73 0.99 0.02<br>0.47 0.30 0.17 0.82 0.56 0.05 0.45 0.31 0.78 0.05<br>0.79 0.71 0.23 0.19 0.82 0.93 0.65 0.37 0.39 0.42<br>0.99 0.17 0.99 0.46 0.05 0.66 0.10 0.42 0.18 0.49<br>0.37 0.51 0.54 0.01 0.81 0.28 0.69 0.34 0.75 0.49<br>0.72 0.43 0.56 0.97 0.30 0.94 0.96 0.58 0.73 0.05<br>0.6 0.39 0.84 0.24 0.40 0.64 0.40 0.19 0.79 0.62<br>0.18 0.26 0.97 0.88 0.64 0.47 0.60 0.11 0.29 0.78</span>‡ (من الـ lecture notes)",
      "الأعداد اللي اتشافت فعلًا (والمجموع 100):<span class=\"ltr\">8, 8, 10, 9, 12, 8, 10, 14, 10, 11</span>والحساب:<span class=\"ltr\">χ₀² = 0.4+0.4+0+0.1+0.4+0.4+0+1.6+0+0.1 = 3.4 < χ²<sub>0.05,9</sub> = 16.9</span>يعني فرضية الـ uniformity <b>مش هتترفض</b> (الـ χ₀² طلع <b>3.4</b>). ‡ (من الـ lecture notes)",
      "في الداتا فيه قيمة مطبوعة <bdi>\"0.6\"</bdi> (في الصف التاسع)، وأعداد الجدول مش بتظبط غير لو هي 0.06. لو قريناها 0.60، الأعداد في الـ class الأولى والسادسة هتبقى 7 و 9، والـ χ₀² هيبقى 3.6، والنتيجة النهائية زي ما هي. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-chisq-data": "مثال 4.5: الـ 100 رقم بيتوزعوا على 10 classes"
     }
    },
    {
     "h": "الـ Gap test",
     "pts": [
      "الـ gap test بيقيس <b>عدد الـ digits اللي ما بين كل ظهور والظهور اللي بعده لنفس الـ digit</b> (سلايد 42).",
      "الـ 110 digit بتوع المثال (سلايد 42، والـ 3 متعلّم تحتها بالأحمر):<span class=\"ltr\">4, 1, 3, 5, 1, 7, 2, 8, 2, 0, 7, 9, 1, 3, 5, 2, 7, 9, 4, 1, 6, 3<br>3, 9, 6, 3, 4, 8, 2, 3, 1, 9, 4, 4, 6, 8, 4, 1, 3, 8, 9, 5, 5, 7<br>3, 9, 5, 9, 8, 5, 3, 2, 2, 3, 7, 4, 7, 0, 3, 6, 3, 5, 9, 9, 5, 5<br>5, 0, 4, 6, 8, 0, 4, 7, 0, 3, 3, 0, 9, 5, 7, 9, 5, 1, 6, 6, 3, 8<br>8, 8, 9, 2, 9, 1, 8, 5, 4, 4, 5, 0, 2, 3, 9, 7, 1, 2, 0, 3, 6, 3</span>",
      "المثال (سلايد 42): الـ gaps بتاعة الـ digit رقم 3 في لستة فيها 110 digit. فيه <b>18 مرة ظهرت فيها الـ 3</b>، يعني <b>17 gap</b>، وأول gap طوله 10. كل الأطوال:<span class=\"ltr\">10, 7, 0, 2, 3, 8, 5, 5, 2, 4, 1, 14, 0, 9, 14, 5, 1</span>",
      "عدد الـ gaps لـ digit واحد بيساوي عدد مرات ظهوره ناقص 1. وبشكل عام عدد الـ gaps بيساوي N (حجم الداتا) ناقص عدد الـ digits (سلايد 42):<span class=\"ltr\">110 − 10 = 100 gaps</span>",
      "اللي يهمنا هو <b>تكرار الـ gaps (frequency of gaps)</b> (سلايد 43). احتمال gap طوله 10 هو حاصل ضرب P(not 3) عشر مرات في P(3):<span class=\"ltr\">P(gap of 10) = P(not 3) × … × P(not 3) × P(3) = (0.9)¹⁰(0.1)</span>",
      "وبشكل عام، احتمال إن الـ digit t ييجي بعده بالظبط x digits مش t هو:<span class=\"ltr\">(0.9)<sup>x</sup>(0.1),  x = 0, 1, 2, …</span>‡ (من الـ lecture notes)",
      "الـ CDF النظرية لطول الـ gap لو الـ digits مترتبة عشوائيًا (سلايد 43):<span class=\"ltr\">F(x) = 1 − 0.9<sup>x+1</sup></span>والتكرارات اللي اتشافت لكل الـ digits بنقارنها بيها باستخدام الـ <b>Kolmogorov–Smirnov test</b>.",
      "سلايد 43 كاتب <bdi>\"F(x) = 0.1 − Σ (0.9)<sup>n</sup>\"</bdi>، والصح إنها ضرب مش طرح (زي الـ lecture notes):<span class=\"ltr\">F(x) = 0.1 × Σ<sub>n=0..x</sub> (0.9)<sup>n</sup> = 1 − 0.9<sup>x+1</sup></span>‡",
      "الخطوات:<br>(1) حدّد الـ F(x) اللي هي:<span class=\"ltr\">F(x) = 1 − 0.9<sup>x+1</sup></span>(2) رتّب الـ gaps اللي اتشافت في cumulative distribution بنفس الـ classes، واسمها S<sub>N</sub>(x)<br>(3) احسب:<span class=\"ltr\">D = max |F(x) − S<sub>N</sub>(x)|</span>(4) هات الـ D<sub>α</sub> من Table A.8 حسب α و N<br>(5) لو D أكبر من D<sub>α</sub> ارفض فرضية الـ independence. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-gap-digits": "الـ gaps بين تكرارات نفس الـ digit في الـ 110 digit"
     }
    },
    {
     "h": "مثال على الـ Gap test (110 digit، والـ α بـ 0.05)",
     "pts": [
      "المطلوب (سلايد 44): بناءً على تكرار ظهور الـ gaps، اختبر هل الـ 110 digit دول independent ولا لأ، بـ α بـ 0.05. عدد الـ gaps:<span class=\"ltr\">110 − 10 = 100</span>",
      "عدد الـ gaps لكل digit (سلايد 44)، والمجموع 100:<span class=\"ltr\">digit 0: 7,  1: 8,  2: 8,  3: 17,  4: 10,  5: 13,  6: 7,  7: 8,  8: 9,  9: 13</span>",
      "أطوال الـ gaps متجمعة في classes عرض كل واحدة 4 (الجدول تحت، سلايد 45). والـ F(x) بتتحسب عند الطرف العالي من كل class، مثلًا:<span class=\"ltr\">F(3) = 1 − 0.9⁴ = 0.3439</span>",
      "أكبر انحراف هو <b>D بـ 0.0224</b> (في الـ class من 8 لـ 11). والـ critical value (سلايد 46):<span class=\"ltr\">D<sub>0.05</sub> = 1.36/√100 = 0.136</span>",
      "بما إن D بـ 0.0224 أصغر من 0.136، <b>مش هنرفض</b> فرضية الـ independence على أساس الاختبار ده (سلايد 46).",
      "مراجعة لسلايد 45: في الـ class من 24 لـ 27 القيمة الصح:<span class=\"ltr\">F(27) = 1 − 0.9²⁸ = 0.9477   (not 0.9497)</span>والانحراف المكتوب 0.0223 ماشي مع 0.9477. ولو عدّينا الـ digits زي ما هي مطبوعة هنلاقي gap واحد في الـ class من 36 لـ 39 (طوله 38)، واتنين في الـ class من 44 لـ 47 (أطوالهم 45 و 47)، بدل اتنين وواحد. ولا تغيير من دول بيأثر على D بـ 0.0224 ولا على النتيجة.  وكمان في الـ class بتاعة 36 لـ 39 الفرق الصح هو<span class=\"ltr\">0.99 − 0.9852 = 0.0048</span>مش 0.0043 زي ما السلايد كاتبة. ‡"
     ],
     "figH": {
      "ms-gap-ks": "جدول الـ KS بتاع الـ gap test خطوة بخطوة"
     }
    },
    {
     "h": "الـ Autocorrelation test",
     "pts": [
      "الـ autocorrelation بيهتم بـ <b>الاعتماد (dependence) بين الأرقام اللي في سلسلة واحدة</b> (سلايد 48).",
      "مثال (سلايد 48) فيه 30 رقم:<span class=\"ltr\">0.12 0.01 0.23 0.28 0.89 0.31 0.64 0.28 0.83 0.93<br>0.99 0.15 0.33 0.35 0.91 0.41 0.60 0.27 0.75 0.88<br>0.68 0.49 0.05 0.43 0.95 0.58 0.19 0.36 0.69 0.87</span>",
      "الأرقام اللي في المكان الخامس والعاشر والخامس عشر و … شبه بعض جدًا (كلهم كبار). الأرقام دي ممكن تبقى صغيرة أو كبيرة أو بتبدّل بين الاتنين (سلايد 48). والسلسلة ممكن تعدّي الاختبارات التانية وبرضه تبقى dependent. ‡ (من الـ lecture notes)",
      "بنختبر الـ autocorrelation بين كل m رقم (والـ m اسمه الـ <b>lag</b>)، بادئين من الرقم رقم i، يعني الـ ρ<sub>im</sub> بين الأرقام دي (سلايد 49):<span class=\"ltr\">R<sub>i</sub>, R<sub>i+m</sub>, R<sub>i+2m</sub>, …, R<sub>i+(M+1)m</sub></span>",
      "الـ <b>M</b> هو أكبر رقم صحيح يحقق الشرط ده (سلايد 49):<span class=\"ltr\">i + (M+1)m ≤ N</span>",
      "الـ Hypotheses (سلايد 49):<span class=\"ltr\">H₀: ρ<sub>im</sub> = 0   (numbers independent)<br>H₁: ρ<sub>im</sub> ≠ 0   (numbers dependent)</span>",
      "لو القيم مفيش بينها correlation، يبقى لما M يكون كبير الـ estimator ρ̂<sub>im</sub> بيبقى تقريبًا normal (سلايد 49)، والـ Z₀ بيمشي على <bdi>N(0,1)</bdi> (سلايد 50).",
      "منرفضش الـ H₀ لو:<span class=\"ltr\">−z<sub>α/2</sub> ≤ Z₀ ≤ z<sub>α/2</sub></span>‡ (من الـ lecture notes)",
      "لو ρ<sub>im</sub> أكبر من صفر: يبقى فيه <b>positive autocorrelation</b>، يعني الـ random numbers الكبيرة غالبًا بييجي بعدها أرقام كبيرة، والعكس (سلايد 50).",
      "لو ρ<sub>im</sub> أصغر من صفر: يبقى فيه <b>negative autocorrelation</b>، يعني الـ random numbers الصغيرة غالبًا بييجي بعدها أرقام كبيرة، والعكس (سلايد 50)."
     ]
    },
    {
     "h": "مثال Autocorrelation: الأرقام التالت والتامن والتلاتاشر و …",
     "pts": [
      "عايزين نختبر هل الأرقام التالت والتامن والتلاتاشر و … من الـ 30 رقم اللي فوق فيها autocorrelation (سلايد 51):<span class=\"ltr\">α = 0.05,  i = 3,  m = 5,  N = 30</span>",
      "حساب الـ M (سلايد 51):<span class=\"ltr\">3 + (M+1)·5 ≤ 30 ⇒ M ≤ 4.4</span>يعني <b>M بـ 4</b>.",
      "الأرقام اللي هنستخدمها:<span class=\"ltr\">R₃ = 0.23,  R₈ = 0.28,  R₁₃ = 0.33,  R₁₈ = 0.27,  R₂₃ = 0.05,  R₂₈ = 0.36</span>",
      "حساب الـ ρ̂₃₅ (والنتيجة <b>−0.1945</b>):<span class=\"ltr\">ρ̂₃₅ = (1/(4+1))[(0.23)(0.28) + (0.28)(0.33) + (0.33)(0.27) + (0.27)(0.05) + (0.05)(0.36)] − 0.25<br>= (0.2774)/5 − 0.25 = −0.1945</span>",
      "حساب الـ σ̂<sub>ρ35</sub> (والنتيجة <b>0.128</b>):<span class=\"ltr\">σ̂<sub>ρ35</sub> = √(13(4) + 7) / [12(4+1)] = √59/60 = 0.128</span>",
      "الـ Z₀ (سلايد 51):<span class=\"ltr\">Z₀ = −0.1945/0.1280 = −1.516,   z<sub>0.025</sub> = 1.96,   −1.96 ≤ Z₀ ≤ 1.96</span>عشان كده الفرضية <b>مش هتترفض</b>.",
      "القسمة بالظبط بتدّي:<span class=\"ltr\">−0.1945/0.1280 = −1.519</span>(وهي القيمة اللي في الـ lecture notes)، مش −1.516 زي السلايد، والنتيجة زي ما هي. ‡"
     ],
     "figH": {
      "ms-autocorr": "الـ autocorrelation test على الأرقام التالت والتامن والتلاتاشر وهكذا"
     }
    },
    {
     "h": "الـ Runs test: الـ runs up and down",
     "pts": [
      "الـ <b>run</b> هو سلسلة أحداث شبه بعض، قبلها وبعدها حدث مختلف، والـ <b>run length</b> هو عدد الأحداث اللي في الـ run. ‡ (من الـ lecture notes)",
      "مثال العملة: السلسلة دي فيها 6 runs:<span class=\"ltr\">H T T H H T T T H T</span>وأطوالهم:<span class=\"ltr\">1, 2, 2, 3, 1, 1</span>‡ (من الـ lecture notes)",
      "الدافع من سلايد 53: خد الـ 40 رقم دول:<span class=\"ltr\">0.08 0.09 0.23 0.29 0.42 0.55 0.58 0.72 0.89 0.91<br>0.11 0.16 0.18 0.31 0.41 0.53 0.71 0.73 0.74 0.84<br>0.02 0.09 0.30 0.32 0.45 0.47 0.69 0.74 0.91 0.95<br>0.12 0.13 0.29 0.36 0.38 0.54 0.68 0.86 0.88 0.91</span>الـ KS والـ chi‑square الاتنين هيقولوا إنهم uniform، <b>بس الأرقام دي مش عشوائية</b>: كل صف بيزيد باستمرار.",
      "اللي بنهتم بيه (سلايد 54): <b>عدد الـ runs</b> و<b>طول الـ runs</b>.",
      "الـ <b>Up run</b>: سلسلة أرقام كل واحد فيها بييجي بعده رقم أكبر، والـ <b>down run</b>: كل واحد بييجي بعده رقم أصغر. بنكتب '+' لو الرقم جه بعده رقم أكبر، و '−' لو جه بعده رقم أصغر. ‡ (من الـ lecture notes)",
      "توضيح: الأرقام دي:<span class=\"ltr\">0.87 0.15 0.23 0.45 0.69 0.32 0.30 0.19 0.24 0.18 0.65 0.82 0.93 0.22</span>بتدّي الإشارات دي:<span class=\"ltr\">− + + + − − − + − + + + −</span>يعني 7 runs أطوالهم:<span class=\"ltr\">1, 3, 3, 1, 1, 3, 1</span>منهم 3 up runs و 4 down runs. ‡ (من الـ lecture notes)",
      "لو N هو عدد الأرقام، يبقى <b>أقصى عدد runs هو <bdi>N − 1</bdi></b> و<b>أقل عدد هو run واحد</b> (سلايد 54).",
      "لو a هو العدد الكلي للـ runs، الـ mean والـ variance بتوعه تحت (سلايد 55). ولما <b>N أكبر من 20</b>، الـ a بيبقى تقريبًا normal بالشكل N(μ<sub>a</sub>, σ<sub>a</sub>²)، وده اللي بنستخدمه عشان نختبر الـ independence (سلايد 55).",
      "منطقة القبول لفرضية الـ independence (سلايد 56):<span class=\"ltr\">−z<sub>α/2</sub> ≤ Z₀ ≤ z<sub>α/2</sub></span>",
      "الرسمة (سلايد 56): منحنى standard normal، والطرفين اللي بعد −z<sub>α/2</sub> و z<sub>α/2</sub> متظللين، وكل طرف مساحته α/2 (منطقة الرفض)، والمنطقة اللي في النص هي <bdi>\"fail to reject\"</bdi>.",
      "سلايد 55 كاتب الـ μ<sub>a</sub> بـ n صغيرة:<span class=\"ltr\">μ<sub>a</sub> = (2n − 1)/3</span>وهي نفسها الـ N (عدد الأرقام) اللي في σ<sub>a</sub>². ‡",
      "العيب: مش كفاية عشان نراجع الـ independence بتاعة مجموعات من الأرقام. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-runs-why": "العدّات uniform بس الأرقام مش random: أرقام الـ slide 53 بالترتيب",
      "ms-z-region": "منطقة القبول بتاعة الـ Z₀ وقيم الـ Z₀ اللي في المحاضرة"
     }
    },
    {
     "h": "مثال runs up and down (40 رقم، والـ α بـ 0.05)",
     "pts": [
      "الداتا (سلايد 57):<span class=\"ltr\">0.41 0.68 0.89 0.94 0.74 0.91 0.55 0.62 0.36 0.27<br>0.19 0.72 0.75 0.08 0.54 0.02 0.01 0.36 0.16 0.28<br>0.18 0.01 0.95 0.69 0.18 0.47 0.23 0.32 0.82 0.53<br>0.31 0.42 0.73 0.04 0.83 0.45 0.13 0.57 0.63 0.29</span>",
      "سلسلة الـ runs up and down (سلايد 58)، وفيها 39 إشارة لـ 40 رقم:<span class=\"ltr\">+ + + − + − + − − − + + − + − − + − + − − + − − + − + + − − + + − + − − + + −</span>",
      "فيه <b>a بـ 26</b> run، والـ N بـ 40.",
      "الحسابات:<span class=\"ltr\">μ<sub>a</sub> = [2(40) − 1]/3 = 26.33<br>σ<sub>a</sub>² = [16(40) − 29]/90 = 6.79</span>",
      "الـ Z₀ (والنتيجة <b>−0.13</b>):<span class=\"ltr\">Z₀ = (26 − 26.33)/√6.79 = −0.13</span>",
      "الـ critical value هي z<sub>0.025</sub> بـ 1.96، والـ Z₀ واقع جوه الفترة:<span class=\"ltr\">−1.96 ≤ −0.13 ≤ 1.96</span>يعني <b>مقدرش نرفض الـ independence بتاعة الأرقام</b> على أساس الاختبار ده (سلايد 58)."
     ],
     "figH": {
      "ms-runs-ud": "الـ runs up and down: الإشارات والـ runs والـ Z test"
     }
    },
    {
     "h": "الـ Runs above and below the mean",
     "pts": [
      "العلامة '+' معناها رقم فوق الـ mean، و '−' معناها رقم تحته. ولو الأرقام uniform من خانتين، الـ mean اللي بنستخدمه:<span class=\"ltr\">(0.99 + 0.00)/2 = 0.495</span>‡ (من الـ lecture notes)",
      "توضيح: الأرقام دي:<span class=\"ltr\">0.40 0.84 0.75 0.18 0.13 0.92 0.57 0.77 0.30 0.71 0.42 0.05 0.78 0.74 0.68 0.03 0.18 0.51 0.10 0.37</span>بتدّي:<span class=\"ltr\">− + + − − + + + − + − − + + + − − + − −</span>يعني 11 run، منهم 5 فوق الـ mean و 6 تحته. ‡ (من الـ lecture notes)",
      "الـ n₁ هو عدد الـ observations اللي فوق الـ mean، والـ n₂ عدد اللي تحته، والـ N هو n₁ + n₂، والـ b هو العدد الكلي للـ runs. ‡ (من الـ lecture notes)",
      "لو n₁ أو n₂ أكبر من 20، الـ b بيبقى تقريبًا normal، ومنرفضش الـ H₀ لو:<span class=\"ltr\">−z<sub>α/2</sub> ≤ Z₀ ≤ z<sub>α/2</sub></span>‡ (من الـ lecture notes)",
      "مثال 4.8 (نفس الـ 40 رقم بتوع سلايد 57، والـ α بـ 0.05)، السلسلة:<span class=\"ltr\">− + + + + + + + − − − + + − + − − − − − − − + + − − − − + + − − + − + − − + + −<br>n₁ = 18,  n₂ = 22,  N = 40,  b = 17</span>‡ (من الـ lecture notes)",
      "الحسابات:<span class=\"ltr\">μ<sub>b</sub> = 2(18)(22)/40 + 1/2 = 20.3<br>σ<sub>b</sub>² = 2(18)(22)[2(18)(22) − 40] / [40²(40 − 1)] = 9.54</span>وبما إن n₂ أكبر من 20 الـ normal approximation مقبول. ‡ (من الـ lecture notes)",
      "الـ Z₀:<span class=\"ltr\">Z₀ = (17 − 20.3)/√9.54 = −1.07,   −1.96 ≤ −1.07 ≤ 1.96</span>يعني مقدرش نرفض الـ independence. ‡ (من الـ lecture notes)",
      "العيب: لو الأرقام بتبدّل بنمط معين (اتنين تحت الـ mean واتنين فوقه وهكذا) تبقى dependent، والعدّ ده ممكن ميكشفش ده. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-runs-ab": "الـ runs above and below the mean: الإشارات والـ runs والـ Z test"
     }
    },
    {
     "h": "الـ Runs test: طول الـ runs",
     "pts": [
      "الـ Y<sub>i</sub> هو عدد الـ runs اللي طولها i في سلسلة فيها N رقم. الاختبار بيقارن الـ O<sub>i</sub> اللي اتشاف بالـ E(Y<sub>i</sub>) المتوقع باستخدام الـ chi‑square بـ <bdi>L − 1</bdi> degrees of freedom (والـ L هو عدد الـ classes بعد ما نجمع الصغيرين مع بعض). ‡ (من الـ lecture notes)",
      "داتا مثال 4.9 ومثال 4.10 (والـ N بـ 60):<span class=\"ltr\">0.30 0.48 0.36 0.01 0.54 0.34 0.96 0.06 0.61 0.85<br>0.48 0.86 0.14 0.86 0.89 0.37 0.49 0.60 0.04 0.83<br>0.42 0.83 0.37 0.21 0.90 0.89 0.91 0.79 0.57 0.99<br>0.95 0.27 0.41 0.81 0.96 0.31 0.09 0.06 0.23 0.77<br>0.73 0.47 0.13 0.55 0.11 0.75 0.36 0.25 0.23 0.72<br>0.60 0.84 0.70 0.30 0.26 0.38 0.05 0.19 0.73 0.44</span>‡ (من الـ lecture notes)",
      "مثال 4.9 (runs up and down، والـ N بـ 60، والـ α بـ 0.05): فيه 59 إشارة:<span class=\"ltr\">+ − − + − + − + + − + − + + − + + − + − + − − + − + − − + − − + + + − − − + + − − − + − + − − − + − + − − − + − + + −</span>أطوال الـ runs (40 run):<span class=\"ltr\">1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 3, 3, 2, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 2, 1</span>يعني:<span class=\"ltr\">O₁ = 26,  O₂ = 9,  O₃ = 5,  O₄ = 0</span>‡ (من الـ lecture notes)",
      "القيم المتوقعة ومجموعها 38.89:<span class=\"ltr\">E(Y₁) = 2/4! [60(5) − (−1)] = 25.08<br>E(Y₂) = 2/5! [60(11) − 14] = 10.77<br>E(Y₃) = 2/6! [60(19) − 47] = 3.04<br>μ<sub>a</sub> = (2(60) − 1)/3 = 39.67<br>E(Y≥4) = 39.67 − 38.89 = 0.78</span>‡ (من الـ lecture notes)",
      "بنجمع الأطوال 2 و 3 و 4 وأكتر مع بعض (لأن القيم المتوقعة صغيرة أوي)، فيبقى الـ O بـ 14 والـ E بـ 14.59:<span class=\"ltr\">χ₀² = (26 − 25.08)²/25.08 + (14 − 14.59)²/14.59 = 0.03 + 0.02 ≈ 0.05   (0.057 unrounded) < χ²<sub>0.05,1</sub> = 3.84</span>يعني الـ independence مش هتترفض. ‡ (من الـ lecture notes)",
      "الجدول 4.3 في الـ notes كاتب E(Y₃) بـ 3.82، بس القيمة المحسوبة هي 3.04 (والمجموع ده بيظبط مع الإجمالي بعد التجميع):<span class=\"ltr\">10.77 + 3.04 + 0.78 = 14.59</span>‡ (من الـ lecture notes)",
      "مثال 4.10 (runs above and below الـ mean اللي هو 0.495، ونفس الـ 60 رقم): فيه 60 إشارة:<span class=\"ltr\">− − − − + − + − + + − + − + + − − + − + − + − − + + + + + + + − − + + − − − − + + − − + − + − − − + + + + − − − − − + −</span>فيه n₁ بـ 28 فوق و n₂ بـ 32 تحت، وأطوال الـ runs (31 run):<span class=\"ltr\">4, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 7, 2, 2, 4, 2, 2, 1, 1, 1, 3, 4, 5, 1, 1</span>يعني:<span class=\"ltr\">O₁ = 17,  O₂ = 8,  O₃ = 1,  O≥4 = 5</span>‡ (من الـ lecture notes)",
      "الحسابات:<span class=\"ltr\">w₁ = 0.498,  w₂ = 0.249,  w₃ = 0.125<br>E(I) = 28/32 + 32/28 = 2.02<br>E(Y₁) = 60(0.498)/2.02 = 14.79,  E(Y₂) = 7.40,  E(Y₃) = 3.71<br>E(A) = 60/2.02 = 29.7<br>E(Y≥4) = 29.7 − 25.9 = 3.8</span>‡ (من الـ lecture notes)",
      "بنجمع الطول 3 والـ 4 وأكتر، فيبقى الـ O بـ 6 والـ E بـ 7.51:<span class=\"ltr\">χ₀² = 0.33 + 0.05 + 0.30 = 0.68 < χ²<sub>0.05,2</sub> = 5.99</span>يعني الـ independence مش هتترفض (والـ χ₀² من غير تقريب حوالي 0.69). ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-runs-len": "طول الـ runs: المشاهد قصاد المتوقع، وبعدين الـ chi‑square"
     }
    },
    {
     "h": "الـ Poker test",
     "pts": [
      "الـ <b>Poker test</b>: مبني على تكرار إن digits معينة تتعاد جوه الرقم (سلايد 60).",
      "مثال (سلايد 60):<span class=\"ltr\">0.255 0.577 0.331 0.414 0.828 0.909</span>لاحظ إن كل رقم فيه pair (اتنين digits زي بعض)، وده يخليك تشك.",
      "في الأرقام اللي من 3 خانات فيه 3 احتمالات بس (سلايد 61):<br>(1) احتمال 3 digits مختلفين = احتمال التاني يختلف عن الأول × احتمال التالت يختلف عن الأول والتاني، والنتيجة <b>0.72</b>:<span class=\"ltr\">P(3 different digits) = (0.9)(0.8) = 0.72</span>(2) احتمال الـ 3 زي بعض = احتمال التاني زي الأول × احتمال التالت زي الأول، والنتيجة <b>0.01</b>:<span class=\"ltr\">P(3 like digits) = (0.1)(0.1) = 0.01</span>(3) احتمال pair واحد بالظبط، والنتيجة <b>0.27</b>:<span class=\"ltr\">P(exactly one pair) = 1 − 0.72 − 0.01 = 0.27</span>",
      "مثال (سلايد 62 و 63): عندنا 1000 رقم من 3 خانات، منهم 680 فيهم 3 digits مختلفين، و 289 فيهم pair واحد بالظبط، و 31 فيهم الـ 3 digits زي بعض، والـ α بـ 0.05. القيم المتوقعة (الجدول تحت):<span class=\"ltr\">1000 × 0.72 = 720,  1000 × 0.01 = 10,  1000 × 0.27 = 270</span>",
      "الـ degrees of freedom بيساوي عدد الـ classes ناقص 1، يعني 2. وبما إن:<span class=\"ltr\">χ²<sub>0.05,2</sub> = 5.99 < 47.65</span>يبقى <b>الـ independence بتاعة الأرقام اترفضت</b> على أساس الاختبار ده (سلايد 63).",
      "مراجعة لسلايد 63:<span class=\"ltr\">1600/720 = 2.22   (not 2.24)<br>361/270 = 1.337 ≈ 1.34<br>exact total = 47.66</span>(والـ 2.22 هي قيمة الـ notes)، والقرار زي ما هو. ‡"
     ],
     "figH": {
      "ms-poker": "الـ poker test: الاحتمالات التلاتة والـ chi‑square على 1000 رقم"
     }
    },
    {
     "h": "الـ Real random numbers (الأرقام العشوائية الحقيقية)",
     "pts": [
      "فيه كمان مصادر لـ <b>random numbers حقيقية (true)</b> على الإنترنت (سلايد 65).",
      "موقع <b>www.random.org</b>: بيدّي random numbers حقيقية لأي حد على الإنترنت، والعشوائية جاية من <b>الـ atmospheric noise</b> (الضوضاء الجوية)، وده في حاجات كتير أحسن من خوارزميات الـ pseudo‑random. الناس بتستخدمها في اليانصيب والسحوبات والمسابقات والألعاب ومواقع القمار (سلايد 65).",
      "الرسمة (سلايد 65) فيها bitmap مربعة من pixels أبيض وأسود عشوائية، جاية من <bdi>random.org/analysis</bdi>، ومفيهاش أي نمط باين.",
      "موقع <b>www.randomnumbers.info</b>: تقدر تنزّل منه random numbers حقيقية متولدة بـ <b>quantum random number generator</b> عند الطلب (سلايد 66).",
      "توليد الـ random numbers <b>بالـ hardware</b>، زي موقع <bdi>http://www.comscire.com</bdi> (سلايد 67). الرسمة: جهاز خارجي و PCI card بيولّدوا random numbers بالـ hardware."
     ],
     "figH": {
      "ms-rn-bitmap": "صورة bitmap من pixels عشوائية مفيهاش أي pattern"
     }
    },
    {
     "h": "الملخص والـ activity",
     "pts": [
      "الـ chapter ده شرح (سلايد 68):<br>• إزاي بنولّد الـ random numbers<br>• اختبار الـ uniformity والـ independence<br>• مصادر الـ random numbers الحقيقية",
      "الـ Activity رقم 4 وهي self study (سلايد 68): اكتب report عن التطبيقات الحديثة لتوليد الـ random numbers (GRN) في الـ computer science، وابدأ من مقالة الـ Code Project اللي في اللينك."
     ]
    }
   ],
   "cards": [
    "الـ <b>Uniformity</b> والـ <b>independence</b>: يعني كل R<sub>i</sub> عينة مستقلة مسحوبة من الـ uniform distribution على الفترة من 0 لـ 1.",
    "الـ PDF والـ mean والـ variance:<span class=\"ltr\">f(x) = 1 for 0 ≤ x ≤ 1 (0 otherwise)<br>E(R) = 1/2<br>V(R) = 1/12</span>",
    "لأن توليد الأرقام بطريقة معروفة (deterministic) بيشيل إمكانية إنها تبقى عشوائية بجد.",
    "تكون سريعة (fast)، و portable، وليها cycle طويلة كفاية، و replicable (عشان الـ debugging ونستخدم نفس الـ stream مع systems مختلفة)، وقريبة من الـ uniformity والـ independence المثاليين.",
    "عملها von Neumann و Metropolis في الأربعينات: بتربّع Z<sub>i</sub> اللي من 4 خانات، وتاخد الـ 4 خانات اللي في نص الناتج اللي من 8 خانات. المشكلة: الأرقام بتميل للصفر.",
    "القانون:<span class=\"ltr\">X<sub>i+1</sub> = (aX<sub>i</sub> + c) mod m,   R<sub>i</sub> = X<sub>i</sub>/m</span>والـ a هو الـ multiplier، والـ c هو الـ increment، والـ m هو الـ modulus، والـ X₀ هو الـ seed.",
    "لو الـ c مش بصفر يبقى <b>mixed</b>، ولو الـ c بصفر يبقى <b>multiplicative</b>.",
    "المدى:<span class=\"ltr\">X<sub>i</sub> ∈ {0, 1, …, m−1},   R<sub>i</sub> ∈ [0, (m−1)/m]</span>",
    "الـ period الأقصى:<span class=\"ltr\">P = m = 2<sup>b</sup></span>وده لو الـ c و m relatively prime، والـ a على شكل <bdi>1 + 4k</bdi>.",
    "الـ period الأقصى:<span class=\"ltr\">P = m/4 = 2<sup>b−2</sup></span>وده لو الـ X₀ فردي، والـ a على شكل <bdi>3 + 8k</bdi> أو <bdi>5 + 8k</bdi>.",
    "الـ period الأقصى هو <bdi>P = m − 1</bdi>، وده لو أصغر k يخلّي <bdi>a<sup>k</sup> − 1</bdi> يقبل القسمة على m هو <bdi>k = m − 1</bdi>.",
    "قيم R<sub>i</sub> متسيبش فجوات كبيرة في الفترة من 0 لـ 1، وده بيتحقق لما نختار modulus m كبير جدًا.",
    "لأن الكمبيوترات بتشتغل بالـ binary، فلما الـ modulus يكون power of 2 (أو قريب منه) ده بيساعد في السرعة والكفاءة.",
    "الشكل والـ period الأقصى:<span class=\"ltr\">X<sub>i</sub> = (Σ(−1)<sup>j−1</sup>X<sub>i,j</sub>) mod (m₁ − 1)<br>P = (m₁−1)(m₂−1)…(m<sub>k</sub>−1)/2<sup>k−1</sup></span>",
    "القيم:<span class=\"ltr\">m₁ = 2147483563,  a₁ = 40014,  m₂ = 2147483399,  a₂ = 40692<br>X = (X₁ − X₂) mod 2147483562<br>period ≈ 2 × 10¹⁸</span>",
    "هو احتمال إننا نرفض الـ H₀ وهي صح:<span class=\"ltr\">α = P(reject H₀ | H₀ is true)</span>",
    "الـ Frequency (بالـ KS أو الـ chi‑square، وده للـ uniformity)، والـ runs، والـ autocorrelation، والـ gap، والـ poker (ودول للـ independence).",
    "الـ statistics:<span class=\"ltr\">D⁺ = max{i/N − R<sub>(i)</sub>}<br>D⁻ = max{R<sub>(i)</sub> − (i−1)/N}<br>D = max(D⁺, D⁻)</span>وارفض الـ H₀ لو D أكبر من D<sub>α</sub>.",
    "القانون:<span class=\"ltr\">χ₀² = Σ(O<sub>i</sub> − E<sub>i</sub>)²/E<sub>i</sub>,   E<sub>i</sub> = N/n,   df = n − 1</span>وبيشتغل صح مع العينات الكبيرة بس (N من 50 وأكتر).",
    "الـ CDF:<span class=\"ltr\">F(x) = 1 − 0.9<sup>x+1</sup></span>وبنقارنها بالـ CDF بتاعة الـ gaps اللي اتشافت باستخدام الـ KS test. وعدد الـ gaps بيساوي N ناقص 10 (عدد الـ digits).",
    "الـ statistic:<span class=\"ltr\">ρ̂<sub>im</sub> = [1/(M+1)]ΣR<sub>i+km</sub>R<sub>i+(k+1)m</sub> − 0.25<br>σ̂ = √(13M+7)/[12(M+1)]<br>Z₀ = ρ̂/σ̂</span>والـ M هو أكبر رقم يحقق:<span class=\"ltr\">i + (M+1)m ≤ N</span>",
    "القوانين:<span class=\"ltr\">μ<sub>a</sub> = (2N − 1)/3<br>σ<sub>a</sub>² = (16N − 29)/90<br>Z₀ = (a − μ<sub>a</sub>)/σ<sub>a</sub></span>والتوزيع بيبقى normal لما N أكبر من 20.",
    "القوانين:<span class=\"ltr\">μ<sub>b</sub> = 2n₁n₂/N + 1/2<br>σ<sub>b</sub>² = 2n₁n₂(2n₁n₂ − N)/[N²(N−1)]</span>",
    "الـ 3 مختلفين احتمالهم 0.72، والـ pair واحد بالظبط احتماله 0.27، والـ 3 زي بعض احتمالهم 0.01.",
    "موقع random.org (من الـ atmospheric noise)، وموقع randomnumbers.info (من quantum generator)، والـ hardware generators (زي comscire.com)."
   ],
   "qa": [
    "الـ pseudo‑random numbers بتتولد حسابيًا بطريقة معروفة (deterministic)، فهي مش عشوائية بجد؛ والهدف إننا نطلع سلسلة ما بين 0 و 1 بتقلّد الخصائص المثالية للـ random numbers. الـ routine الكويسة لازم تكون:<br>(1) سريعة (fast)<br>(2) portable وتشتغل على كمبيوترات مختلفة<br>(3) ليها cycle طويلة كفاية<br>(4) replicable (عشان الـ verification والـ debugging، وعشان نستخدم نفس الـ stream مع systems مختلفة)<br>(5) قريبة جدًا من الخصائص الإحصائية المثالية: الـ uniformity والـ independence.",
    "ابدأ بـ Z₀ من 4 خانات، ربّعه هيطلع لحد 8 خانات (كمّل بأصفار)، خد الـ 4 خانات اللي في النص يبقوا الـ Z الجاي، والـ U<sub>i</sub> بيساوي Z<sub>i</sub> على 10000.<span class=\"ltr\">7182² = 51581124 → Z₁ = 5811, U₁ = 0.5811<br>5811² = 33767721 → Z₂ = 7677, U₂ = 0.7677<br>7677² = 58936329 → Z₃ = 9363, U₃ = 0.9363</span>المشكلة: الأرقام بتميل للصفر (في المثال ده الـ Z بيوصل لـ 78 و 60 و 36 و 12 و 1 وبعدين صفر على طول).",
    "(1) لما m هي 2<sup>b</sup> و c مش بصفر:<span class=\"ltr\">P = m = 2<sup>b</sup></span>لو الـ c و m relatively prime والـ a على شكل <bdi>1 + 4k</bdi> (والـ k رقم صحيح).<br>(2) لما m هي 2<sup>b</sup> و c بصفر:<span class=\"ltr\">P = m/4 = 2<sup>b−2</sup></span>لو الـ seed X₀ فردي والـ a على شكل <bdi>3 + 8k</bdi> أو <bdi>5 + 8k</bdi> (لـ k بـ 0 و 1 و …).<br>(3) لما m عدد أولي و c بصفر:<span class=\"ltr\">P = m − 1</span>لو أصغر رقم صحيح k يخلّي <bdi>a<sup>k</sup> − 1</bdi> يقبل القسمة على m هو <bdi>k = m − 1</bdi>.",
    "الـ systems اللي بنعملها simulation بقت معقدة أكتر وأكتر، فمحتاجين generator الـ period بتاعه أطول؛ والـ CLCG بيجمع اتنين أو أكتر من الـ multiplicative congruential generators.<br>بالقيم دي:<span class=\"ltr\">m₁ = 2147483563,  a₁ = 40014,  m₂ = 2147483399,  a₂ = 40692</span>الخطوات:<span class=\"ltr\">Step 1: seeds X<sub>0,1</sub> ∈ [1, 2147483562], X<sub>0,2</sub> ∈ [1, 2147483398]<br>Step 2: X<sub>i+1,1</sub> = 40014X<sub>i,1</sub> mod 2147483563;  X<sub>i+1,2</sub> = 40692X<sub>i,2</sub> mod 2147483399<br>Step 3: X<sub>i+1</sub> = (X<sub>i+1,1</sub> − X<sub>i+1,2</sub>) mod 2147483562<br>Step 4: R<sub>i+1</sub> = X<sub>i+1</sub>/2147483563 if X<sub>i+1</sub> > 0, else 2147483562/2147483563<br>Step 5: i = i + 1, go to step 2</span>والـ period:<span class=\"ltr\">(m₁ − 1)(m₂ − 1)/2 ≈ 2 × 10¹⁸</span>",
    "(1) الـ Frequency test: بيقارن توزيع الأرقام اللي اتولدت بالـ uniform distribution باستخدام الـ Kolmogorov–Smirnov أو الـ chi‑square test.<br>(2) الـ Runs test: بيختبر الـ runs up and down أو الـ runs above and below the mean، وبيقارن القيم الفعلية بالمتوقعة.<br>(3) الـ Autocorrelation test: بيختبر الـ correlation بين الأرقام وبيقارن الـ sample correlation بالـ correlation المتوقع اللي هو صفر.<br>(4) الـ Gap test: بيعدّ الـ digits اللي ما بين تكرارات digit معين، وبيستخدم الـ KS test عشان يقارن بالعدد المتوقع من الـ gaps.<br>(5) الـ Poker test: بيعامل كل مجموعة digits كأنها poker hand، وبيقارن الـ hands باللي متوقع باستخدام الـ chi‑square.",
    "بعد الترتيب والـ N بـ 5:<span class=\"ltr\">R<sub>(i)</sub> = 0.05, 0.14, 0.44, 0.81, 0.93<br>i/N = 0.2, 0.4, 0.6, 0.8, 1.0<br>i/N − R<sub>(i)</sub> = 0.15, 0.26, 0.16, −0.01, 0.07 → D⁺ = 0.26<br>R<sub>(i)</sub> − (i−1)/N = 0.05, −0.06, 0.04, 0.21, 0.13 → D⁻ = 0.21<br>D = max(0.26, 0.21) = 0.26<br>D<sub>0.05</sub> (N = 5) = 0.565</span>وبما إن 0.26 أصغر من 0.565، الـ H₀ (الـ uniformity) مش هتترفض.",
    "(s) الـ <b>Frequency test</b>: بيستخدم الـ Kolmogorov–Smirnov أو الـ chi‑square test عشان يقارن توزيع مجموعة الأرقام اللي اتولدت بالـ uniform distribution.<br>(t) الـ <b>Runs test</b>: بيختبر الـ runs up and down أو الـ runs above and below the mean عن طريق مقارنة القيم الفعلية بالقيم المتوقعة؛ والـ statistic اللي بنقارن بيه هو الـ chi‑square.<br>(u) الـ <b>Autocorrelation test</b>: بيختبر الـ correlation بين الأرقام وبيقارن الـ sample correlation بالـ correlation المتوقع اللي هو صفر.<br>(v) الـ <b>Gap test</b>: بيعدّ كام digit بيظهروا ما بين تكرارات digit معين، وبعدين بيستخدم الـ Kolmogorov–Smirnov test عشان يقارن بالحجم المتوقع للـ gaps.<br>(w) الـ <b>Poker test</b>: بيعامل كل مجموعة أرقام مع بعض كأنها poker hand، والـ hands اللي طلعت بتتقارن باللي متوقع باستخدام الـ chi‑square test.",
    "الخاصيتين الإحصائيتين المهمين هما:<br>(1) الـ <b>Uniformity</b><br>(2) الـ <b>Independence</b><br>كل random number اسمه Rᵢ هو عينة مستقلة مسحوبة من continuous uniform distribution ما بين 0 و 1:<span class=\"ltr\">pdf f(x) = 1 for 0 ≤ x ≤ 1;   E(R) = 1/2,   V(R) = 1/12</span>",
    "القانون:<span class=\"ltr\">Xᵢ₊₁ = (a Xᵢ + c) mod m,   Rᵢ = Xᵢ/m,   i = 1, 2, ...</span>والأرقام الصحيحة Xᵢ بتبقى من 0 لـ 99.<span class=\"ltr\">X₁ = (17 × 27 + 43) mod 100 = 502 mod 100 = 2,  R₁ = 0.02<br>X₂ = (17 × 2 + 43) mod 100 = 77 mod 100 = 77,  R₂ = 0.77<br>X₃ = (17 × 77 + 43) mod 100 = 1352 mod 100 = 52,  R₃ = 0.52</span>(ولو كمّلنا:<span class=\"ltr\">X₄ = (17 × 52 + 43) mod 100 = 927 mod 100 = 27,  R₄ = 0.27</span>يعني الـ seed اللي هو 27 رجع، فالسلسلة هتعيد نفسها من هنا.)",
    "الـ c بصفر (multiplicative)، والـ m هي 2⁶ يعني 64، والـ a بـ 13 وده على شكل <bdi>5 + 8k</bdi> بـ k بـ 1:<span class=\"ltr\">a = 13 = 5 + 8(1)</span>القاعدة: لما m هي 2^b و c بصفر، أطول period ممكن هو:<span class=\"ltr\">P = m/4 = 2^(b−2) = 16</span>وبيتحقق لما X₀ يكون فردي والـ a على شكل <bdi>3 + 8k</bdi> أو <bdi>5 + 8k</bdi>. يعني متوقعين الـ period الأقصى 16 لما X₀ بـ 1 و 3.<br>القانون:<span class=\"ltr\">Xᵢ₊₁ = 13 Xᵢ mod 64</span>لما X₀ بـ 1، والـ <b>period بـ 16</b>:<span class=\"ltr\">13, 41, 21, 17, 29, 57, 37, 33, 45, 9, 53, 49, 61, 25, 5, 1<br>(e.g. 13 × 13 = 169 mod 64 = 41;  13 × 41 = 533 mod 64 = 21;  13 × 5 = 65 mod 64 = 1)</span>لما X₀ بـ 2، والـ <b>period بـ 8</b>:<span class=\"ltr\">26, 18, 42, 34, 58, 50, 10, 2<br>(13 × 26 = 338 mod 64 = 18;  13 × 10 = 130 mod 64 = 2)</span>لما X₀ بـ 3، والـ <b>period بـ 16</b>:<span class=\"ltr\">39, 59, 63, 51, 23, 43, 47, 35, 7, 27, 31, 19, 55, 11, 15, 3</span>لما X₀ بـ 4، والـ <b>period بـ 4</b>:<span class=\"ltr\">52, 36, 20, 4</span>الخلاصة: الـ seeds الفردية (1 و 3) بتدّي الـ period الأقصى 16، والـ seeds الزوجية بتدّي periods أقصر (8 لما X₀ بـ 2، و 4 لما X₀ بـ 4).",
    "الـ H₀: الأرقام <bdi>U(0, 1)</bdi>. عندنا N بـ 100، و n بـ 10 classes متساويين:<span class=\"ltr\">0.01-0.10, 0.11-0.20, ..., 0.91-1.00,   Eᵢ = N/n = 10</span>والـ statistic:<span class=\"ltr\">χ₀² = Σ (Oᵢ − Eᵢ)²/Eᵢ</span><table><tr><th>الفترة</th><th>Oᵢ</th><th>Eᵢ</th><th>Oᵢ − Eᵢ</th><th>(Oᵢ − Eᵢ)²/Eᵢ</th></tr><tr><td>0.01-0.10</td><td>8</td><td>10</td><td>−2</td><td>0.4</td></tr><tr><td>0.11-0.20</td><td>8</td><td>10</td><td>−2</td><td>0.4</td></tr><tr><td>0.21-0.30</td><td>10</td><td>10</td><td>0</td><td>0.0</td></tr><tr><td>0.31-0.40</td><td>9</td><td>10</td><td>−1</td><td>0.1</td></tr><tr><td>0.41-0.50</td><td>12</td><td>10</td><td>2</td><td>0.4</td></tr><tr><td>0.51-0.60</td><td>8</td><td>10</td><td>−2</td><td>0.4</td></tr><tr><td>0.61-0.70</td><td>10</td><td>10</td><td>0</td><td>0.0</td></tr><tr><td>0.71-0.80</td><td>14</td><td>10</td><td>4</td><td>1.6</td></tr><tr><td>0.81-0.90</td><td>10</td><td>10</td><td>0</td><td>0.0</td></tr><tr><td>0.91-1.00</td><td>11</td><td>10</td><td>1</td><td>0.1</td></tr><tr><td>المجموع</td><td>100</td><td>100</td><td>0</td><td>3.4</td></tr></table>الـ χ₀² طلع 3.4، والـ critical value من table A.6 بـ <bdi>n − 1 = 9</bdi> degrees of freedom:<span class=\"ltr\">χ²₀.₀₅,₉ = 16.9</span>وبما إن 3.4 أصغر من 16.9، فالـ null hypothesis إن التوزيع uniform <b>مش هتترفض</b>.",
    "حط + لو الرقم جه بعده رقم أكبر، و − لو جه بعده رقم أصغر (39 إشارة):<span class=\"ltr\">+ + + − + − + − − − + + − + − − + − + − − + − − + − + + − − + + − + − − + + −</span>عدد الـ runs هو a بـ <b>26</b>، والـ N بـ 40.<span class=\"ltr\">μₐ = (2N − 1)/3 = (80 − 1)/3 = 26.33<br>σₐ² = (16N − 29)/90 = (640 − 29)/90 = 6.79<br>Z₀ = (a − μₐ)/σₐ = (26 − 26.33)/√6.79 = −0.13</span>الـ critical value هي z₀.₀₂₅ بـ 1.96 (من table A.3). وبما إن:<span class=\"ltr\">−1.96 ≤ −0.13 ≤ 1.96</span>يبقى الـ independence <b>مقدرش نرفضها</b>.",
    "الـ mean اللي بنستخدمه هو 0.495 (وده الـ mean بتاع الأرقام اللي من خانتين من 0.00 لـ 0.99):<span class=\"ltr\">(0.99 + 0.00)/2 = 0.495</span>حط + لو الرقم فوق 0.495، و − لو تحته:<span class=\"ltr\">− + + + + + + + − − − + + − + − − − − − − − + + − − − − + + − − + − + − − + + −<br>n₁ (above) = 18,  n₂ (below) = 22,  N = 40,  b = 17</span>يعني عدد الـ runs هو b بـ <b>17</b>.<span class=\"ltr\">μ_b = 2n₁n₂/N + 1/2 = 2(18)(22)/40 + 0.5 = 19.8 + 0.5 = 20.3<br>σ_b² = 2n₁n₂(2n₁n₂ − N) / [N²(N − 1)] = 792(792 − 40) / (1600 × 39) = 595,584/62,400 = 9.54</span>وبما إن n₂ أكبر من 20، ينفع نستخدم الـ normal approximation.<span class=\"ltr\">Z₀ = (17 − 20.3)/√9.54 = −1.07<br>z₀.₀₂₅ = 1.96;   −1.96 ≤ −1.07 ≤ 1.96</span>يعني الـ independence <b>مقدرش نرفضها</b>.",
    "الـ N بـ 60. الإشارات (+ طالع و − نازل) وعددها 59 إشارة:<span class=\"ltr\">+ − − + − + − + + − + − + + − + + − + − + − − + − + − − + − − + + + − − − + + − − − + − + − − − + − + − − − + − + + −</span>أطوال الـ runs (40 run):<span class=\"ltr\">1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 3, 3, 2, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 2, 1</span>اللي اتشاف فعلًا:<span class=\"ltr\">O₁ = 26,  O₂ = 9,  O₃ = 5,  O₄₊ = 0</span>العدد المتوقع من الـ runs اللي طولها i (لما i أقل من أو بيساوي <bdi>N − 2</bdi>):<span class=\"ltr\">E(Yᵢ) = 2/(i + 3)! × [N(i² + 3i + 1) − (i³ + 3i² − i − 4)]<br>E(Y₁) = (2/4!)[60(5) − (−1)] = (2/24)(301) = 25.08<br>E(Y₂) = (2/5!)[60(11) − 14] = (2/120)(646) = 10.77<br>E(Y₃) = (2/6!)[60(19) − 47] = (2/720)(1093) = 3.04<br>E(Y₁) + E(Y₂) + E(Y₃) = 38.89</span>والعدد الكلي المتوقع للـ runs:<span class=\"ltr\">μₐ = (2N − 1)/3 = 119/3 = 39.67<br>E(Y≥4) = 39.67 − 38.89 = 0.78</span>الخلايا اللي الـ E بتاعها أقل من 5 بنجمعها، فيطلع عندنا خليتين:<table><tr><th>طول الـ run</th><th>Oᵢ</th><th>E(Yᵢ)</th><th>(Oᵢ − Eᵢ)²/Eᵢ</th></tr><tr><td>1</td><td>26</td><td>25.08</td><td>0.03</td></tr><tr><td>2, 3, ≥4</td><td>9 + 5 + 0 = 14</td><td>10.77 + 3.04 + 0.78 = 14.59</td><td>0.02</td></tr><tr><td>المجموع</td><td>40</td><td>39.67</td><td>χ₀² = 0.05</td></tr></table>الـ degrees of freedom بـ 1:<span class=\"ltr\">df = 2 − 1 = 1;   χ²₀.₀₅,₁ = 3.84</span>وبما إن 0.05 أصغر من 3.84، الـ independence <b>مش هتترفض</b> (مقبولة).",
    "الـ mean:<span class=\"ltr\">(0.99 + 0.00)/2 = 0.495</span>الإشارات (+ فوق و − تحت) وعددها 60 إشارة:<span class=\"ltr\">− − − − + − + − + + − + − + + − − + − + − + − − + + + + + + + − − + + − − − − + + − − + − + − − − + + + + − − − − − + −<br>n₁ (above) = 28,  n₂ (below) = 32,  N = 60</span>أطوال الـ runs (31 run):<span class=\"ltr\">4, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 7, 2, 2, 4, 2, 2, 1, 1, 1, 3, 4, 5, 1, 1</span>اللي اتشاف فعلًا:<span class=\"ltr\">O₁ = 17,  O₂ = 8,  O₃ = 1,  O₄₊ = 5</span>احتمال run طوله i:<span class=\"ltr\">wᵢ = (n₁/N)^i (n₂/N) + (n₁/N)(n₂/N)^i<br>w₁ = (28/60)(32/60) + (28/60)(32/60) = 0.498;  w₂ = 0.249;  w₃ = 0.125</span>متوسط طول الـ run المتوقع:<span class=\"ltr\">E(I) = n₁/n₂ + n₂/n₁ = 28/32 + 32/28 = 2.02</span>والأعداد المتوقعة:<span class=\"ltr\">E(Yᵢ) = N wᵢ / E(I)<br>E(Y₁) = 60(0.498)/2.02 = 14.79   (14.80 unrounded)<br>E(Y₂) = 60(0.249)/2.02 = 7.40<br>E(Y₃) = 60(0.125)/2.02 = 3.71   (3.72)</span>العدد الكلي المتوقع للـ runs:<span class=\"ltr\">E(A) = N/E(I) = 60/2.02 = 29.7<br>E(Y≥4) = 29.7 − 25.9 = 3.8</span>بنجمع الطول 3 والـ 4 وأكتر (لأن القيم المتوقعة أقل من 5):<table><tr><th>طول الـ run</th><th>Oᵢ</th><th>E(Yᵢ)</th><th>(Oᵢ − Eᵢ)²/Eᵢ</th></tr><tr><td>1</td><td>17</td><td>14.79</td><td>0.33</td></tr><tr><td>2</td><td>8</td><td>7.40</td><td>0.05</td></tr><tr><td>3, ≥4</td><td>1 + 5 = 6</td><td>3.71 + 3.80 = 7.51</td><td>0.30</td></tr><tr><td>المجموع</td><td>31</td><td>29.70</td><td>χ₀² = 0.68</td></tr></table>الـ degrees of freedom بـ 2:<span class=\"ltr\">df = 3 − 1 = 2;   χ²₀.₀₅,₂ = 5.99</span>وبما إن 0.68 أصغر من 5.99، الـ independence <b>مش هتترفض</b> (مقبولة). (ولو من غير تقريب الـ χ₀² بيطلع 0.69، ونفس النتيجة.)",
    "البداية i بـ 3، والـ lag m بـ 5، والـ N بـ 30. الـ M هو أكبر رقم صحيح يحقق الشرط:<span class=\"ltr\">i + (M + 1)m ≤ N:   3 + (M + 1)5 ≤ 30  ⇒  M ≤ 4.4  ⇒  M = 4</span>الأرقام اللي هنستخدمها (في الأماكن 3 و 8 و 13 و 18 و 23 و 28):<span class=\"ltr\">0.23, 0.28, 0.33, 0.27, 0.05, 0.36</span>حساب الـ ρ̂ (والنتيجة <b>−0.1945</b>):<span class=\"ltr\">ρ̂ = [1/(M + 1)] Σₖ₌₀^M R(i+km) R(i+(k+1)m) − 0.25<br>= (1/5)[(0.23)(0.28) + (0.28)(0.33) + (0.33)(0.27) + (0.27)(0.05) + (0.05)(0.36)] − 0.25<br>= (1/5)(0.0644 + 0.0924 + 0.0891 + 0.0135 + 0.0180) − 0.25 = 0.2774/5 − 0.25 = 0.0555 − 0.25 = −0.1945</span>والـ σ والـ Z₀ (والنتيجة <b>−1.519</b>):<span class=\"ltr\">σ(ρ̂) = √(13M + 7) / [12(M + 1)] = √59 / 60 = 0.1280<br>Z₀ = ρ̂/σ(ρ̂) = −0.1945/0.1280 = −1.519<br>z₀.₀₂₅ = 1.96;   −1.96 ≤ −1.519 ≤ 1.96</span>يعني فرضية الـ independence <b>مش هتترفض</b>.",
    "عدد الـ gaps لكل digit (من 0 لـ 9)، والإجمالي:<span class=\"ltr\">7, 8, 8, 17, 10, 13, 7, 8, 9, 13;   total gaps = 110 − 10 = 100</span>الـ CDF النظرية لطول الـ gap لو الـ digits عشوائية:<span class=\"ltr\">F(x) = 1 − 0.9^(x+1)     (P(gap = x) = 0.9^x × 0.1)</span><table><tr><th>طول الـ gap</th><th>التكرار</th><th>التكرار النسبي</th><th>التراكمي S_N(x)</th><th>F(x)</th><th>|F(x) − S_N(x)|</th></tr><tr><td>0-3</td><td>35</td><td>0.35</td><td>0.35</td><td>0.3439</td><td>0.0061</td></tr><tr><td>4-7</td><td>22</td><td>0.22</td><td>0.57</td><td>0.5695</td><td>0.0005</td></tr><tr><td>8-11</td><td>17</td><td>0.17</td><td>0.74</td><td>0.7176</td><td>0.0224</td></tr><tr><td>12-15</td><td>9</td><td>0.09</td><td>0.83</td><td>0.8147</td><td>0.0153</td></tr><tr><td>16-19</td><td>5</td><td>0.05</td><td>0.88</td><td>0.8784</td><td>0.0016</td></tr><tr><td>20-23</td><td>6</td><td>0.06</td><td>0.94</td><td>0.9202</td><td>0.0198</td></tr><tr><td>24-27</td><td>3</td><td>0.03</td><td>0.97</td><td>0.9477</td><td>0.0223</td></tr><tr><td>28-31</td><td>0</td><td>0.00</td><td>0.97</td><td>0.9657</td><td>0.0043</td></tr><tr><td>32-35</td><td>0</td><td>0.00</td><td>0.97</td><td>0.9775</td><td>0.0075</td></tr><tr><td>36-39</td><td>2</td><td>0.02</td><td>0.99</td><td>0.9852</td><td>0.0043</td></tr><tr><td>40-43</td><td>0</td><td>0.00</td><td>0.99</td><td>0.9903</td><td>0.0003</td></tr><tr><td>44-47</td><td>1</td><td>0.01</td><td>1.00</td><td>0.9936</td><td>0.0064</td></tr></table>أكبر فرق هو D بـ <b>0.0224</b>، والـ critical value:<span class=\"ltr\">D = max |F(x) − S_N(x)| = 0.0224<br>D₀.₀₅ = 1.36/√100 = 0.136</span>وبما إن D أصغر من D₀.₀₅، فرضية الـ independence <b>مش هتترفض</b>.<br>ملاحظات: الشيت كاتب F(x) بـ 0.9497 في الـ class من 24 لـ 27، والصح:<span class=\"ltr\">1 − 0.9²⁸ = 0.9477</span>(والفرق اللي فيه 0.0223 محسوب على 0.9477). كمان لو عدّينا الـ digits المكتوبة تاني هنلاقي gap واحد في الـ class من 36 لـ 39 (طوله 38) واتنين في الـ class من 44 لـ 47 (أطوالهم 45 و 47) بدل اتنين وواحد؛ ده بيغيّر صفوف الـ class من 36 لـ 39 ومن 40 لـ 43 لـ 0.0052 و 0.0103، بس الـ D بيفضل 0.0224، فالنتيجة زي ما هي.",
    "الاحتمالات للأرقام اللي من 3 خانات:<span class=\"ltr\">P(three different digits) = (0.9)(0.8) = 0.72<br>P(three like digits) = (0.1)(0.1) = 0.01<br>P(exactly one pair) = 1 − 0.72 − 0.01 = 0.27</span>الأعداد المتوقعة من الـ 1000 هي 720 و 270 و 10.<table><tr><th>النوع</th><th>Oᵢ</th><th>Eᵢ</th><th>(Oᵢ − Eᵢ)²/Eᵢ</th></tr><tr><td>3 digits مختلفين</td><td>680</td><td>720</td><td>2.22</td></tr><tr><td>pair واحد بالظبط</td><td>289</td><td>270</td><td>1.34</td></tr><tr><td>3 digits زي بعض</td><td>31</td><td>10</td><td>44.10</td></tr><tr><td>المجموع</td><td>1000</td><td>1000</td><td>χ₀² = 47.65</td></tr></table>الـ degrees of freedom بـ 2:<span class=\"ltr\">df = 3 − 1 = 2;   χ²₀.₀₅,₂ = 5.99</span>وبما إن 47.65 أكبر من 5.99، الـ independence بتاعة الأرقام <b>اترفضت</b>.<br>(الجدول في الشيت أسماء صفوفه مزحلقة سطر؛ الأرقام اللي فوق متوصّلة بالصفوف الصح. وبما إن:<span class=\"ltr\">19²/270 = 1.337</span>فالمجموع بالظبط 47.66، والشيت كاتبه 47.65.)",
    "القيم:<span class=\"ltr\">a = 5,  c = 13,  m = 64,  Rᵢ = Xᵢ/m</span>(a) لما X₀ بـ 3:<span class=\"ltr\">X₁ = (5 × 3 + 13) mod 64 = 28,  R₁ = 28/64 = 0.4375<br>X₂ = (5 × 28 + 13) mod 64 = 153 mod 64 = 25,  R₂ = 25/64 = 0.3906<br>X₃ = (5 × 25 + 13) mod 64 = 138 mod 64 = 10,  R₃ = 10/64 = 0.1563<br>X₄ = (5 × 10 + 13) mod 64 = 63,  R₄ = 63/64 = 0.9844</span>(b) لما X₀ بـ 1:<span class=\"ltr\">X₁ = (5 × 1 + 13) mod 64 = 18,  R₁ = 18/64 = 0.2813<br>X₂ = (5 × 18 + 13) mod 64 = 103 mod 64 = 39,  R₂ = 39/64 = 0.6094<br>X₃ = (5 × 39 + 13) mod 64 = 208 mod 64 = 16,  R₃ = 16/64 = 0.25<br>X₄ = (5 × 16 + 13) mod 64 = 93 mod 64 = 29,  R₄ = 29/64 = 0.4531</span>الـ period الأقصى: الـ m هي 64 يعني 2⁶ (power of 2)، والـ c بـ 13 مش بصفر. أطول period ممكن هو P بـ m يعني 64، وبيتحقق لما الـ c و m يكونوا relatively prime (وفعلًا <bdi>gcd(13, 64) = 1</bdi>) والـ a على شكل <bdi>1 + 4k</bdi> (وفعلًا <bdi>5 = 1 + 4(1)</bdi>). يعني الـ generator ليه <b>full period بـ 64</b> مع أي seed.<br>(حل الـ quiz كمان كاتب <bdi>X₀/m</bdi> يعني <bdi>3/64</bdi> و <bdi>1/64</bdi> كأول أرقام؛ بس في المحاضرة الـ Rᵢ اللي هو Xᵢ/m بيبدأ من i بـ 1، فالـ seed نفسه مش من الـ random numbers. والـ quiz بيسمي القاعدة دي Hull‑Dobell theorem، والمحاضرة بتقولها زي ما هي فوق.)"
   ],
   "quiz": [
    [
     "الـ random numbers الحقيقية (true أو real) بتيجي من مصادر فيزيائية زي الـ atmospheric noise (موقع random.org) أو الـ quantum generators، مش من معادلة على الكمبيوتر (L4, Real Random Numbers).",
     "المصادر الفيزيائية (الـ hardware generators) هي اللي بتدّي random numbers حقيقية؛ أما الـ RNG بتاع الكمبيوتر فبيستخدم معادلة حسابية (L4, Real Random Numbers).",
     "صح. الكمبيوتر بيحسب الـ random numbers حسابيًا؛ وهي \"pseudo\" لأن الطريقة المعروفة بتشيل إمكانية العشوائية الحقيقية (L4, Pseudo-Random Numbers).",
     "مفيش generator حسابي perfect؛ هو بس بيقلّد الـ uniformity والـ independence، فالناتج بتاعه pseudo‑random (L4, Pseudo-Random Numbers)."
    ],
    [
     "صح. كل R<sub>i</sub> لازم يتسحب بشكل مستقل من الـ uniform distribution على الفترة من 0 لـ 1 (L4, Properties of random numbers).",
     "دي خصائص الـ routine الكويسة اللي بتولّد، مش الخصائص الإحصائية للأرقام نفسها (L4, Pseudo-random numbers).",
     "الـ random numbers بتبقى uniform على الفترة من 0 لـ 1، مش normal (L4, Properties of random numbers).",
     "دي مواصفات الـ LCG الكويس، مش الخاصيتين الإحصائيتين (L4, Characteristics of a good generator)."
    ],
    [
     "الـ 1 ده ارتفاع الـ PDF، مش الـ mean (L4, Properties of random numbers).",
     "الـ <bdi>1/12</bdi> ده الـ variance (L4, Properties of random numbers).",
     "صح. الحساب:<span class=\"ltr\">E(R) = ∫₀¹ x dx = 1/2</span>",
     "الـ 1/4 ده E(R)²، واللي بنطرحه في الـ variance وفي الـ ρ̂<sub>im</sub> (L4, Autocorrelation test)."
    ],
    [
     "الـ midsquare method ملهاش modulus أصلًا؛ ده الـ LCM (L4, LCM: proper choice of parameters).",
     "صح. في مثال السلايد الـ Z بينزل لـ 78 و 60 و 36 و 12 و 1، وبعدين بيفضل واقف على الصفر.",
     "السرعة مش هي المشكلة اللي السلايدات ذكرتها (L4, Midsquare method).",
     "الـ U<sub>i</sub> بيساوي Z<sub>i</sub> على 10000، فدايمًا أقل من 1 (L4, Midsquare method)."
    ],
    [
     "الـ a هو الـ multiplier (L4, Linear Congruential Method).",
     "الـ m هو الـ modulus (L4, Linear Congruential Method).",
     "صح. الـ c هو الـ increment؛ ولو الـ c بصفر الطريقة بتبقى multiplicative.",
     "الـ seed هو X₀ (L4, Linear Congruential Method)."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">(17×27 + 43) mod 100 = 502 mod 100 = 2</span>يعني R₁ بـ 0.02.",
     "الـ 502 لازم نعمله mod 100 الأول (L4, LCM example 1).",
     "الـ 77 ده X₂:<span class=\"ltr\">X₂ = (17×2 + 43) mod 100 = 77</span>(L4, LCM example 1)",
     "الـ 27 ده الـ seed، وبيرجع تاني عند X₄ (L4, LCM example 1)."
    ],
    [
     "الـ period اللي بيساوي m محتاج إن c مش بصفر، والـ c و m relatively prime، والـ a على شكل <bdi>1 + 4k</bdi> (L4, LCM: proper choice of parameters).",
     "الـ <bdi>m − 1</bdi> ده حالة الـ modulus الأولي (prime) مع c بصفر (L4, LCM: proper choice of parameters).",
     "صح. القانون:<span class=\"ltr\">P = m/4 = 2<sup>b−2</sup></span>",
     "دي مش حالة من حالات السلايدات؛ والـ seed لازم يكون فردي (L4, LCM: proper choice of parameters)."
    ],
    [
     "الـ 16 ده الـ period بتاع الـ seeds الفردية 1 و 3 (L4, LCM example 2).",
     "صح. السلسلة:<span class=\"ltr\">26, 18, 42, 34, 58, 50, 10, 2</span>والـ seed رجع بعد 8 خطوات.",
     "الـ 4 ده الـ period لما X₀ بـ 4 (L4, LCM example 2).",
     "الـ period اللي بيساوي m محتاج إن c مش بصفر (L4, LCM: proper choice of parameters)."
    ],
    [
     "صح. كل R<sub>i</sub> بيبقى discrete، والـ m الكبير جدًا بيخلّي التقريب ده تأثيره بسيط.",
     "السلايد بيعرّف الـ maximum density بالظبط كده، والحل هو m كبير جدًا (L4, Characteristics of a good generator)."
    ],
    [
     "صح. لما k بـ 2 ده بيدّي الـ period بتاع generator الـ L'Ecuyer:<span class=\"ltr\">(m₁ − 1)(m₂ − 1)/2 ≈ 2 × 10¹⁸</span>",
     "الـ periods بتتضرب في بعض، مش بتتجمع (L4, Combined Linear Congruential Generators).",
     "ده الـ period بتاع multiplicative generator واحد الـ modulus بتاعه prime (L4, Combined Linear Congruential Generators).",
     "كل معامل هو <bdi>m<sub>j</sub> − 1</bdi>، والضرب كله بيتقسم على <bdi>2<sup>k−1</sup></bdi> (L4, Combined Linear Congruential Generators)."
    ],
    [
     "الـ α بتتكلم عن رفض H₀ صح، مش قبول H₀ غلط (L4, Tests for random numbers: hypotheses and significance level).",
     "صح. زي ما مكتوب في سلايد 31.",
     "الـ α هي احتمال شرطي (conditional) إننا نرفض الـ H₀ (L4, Tests for random numbers: hypotheses and significance level).",
     "الـ critical value بتعتمد على α بس هي مش α (L4, Tests for random numbers: hypotheses and significance level)."
    ],
    [
     "الـ poker test بيشيّك على الـ independence باستخدام الـ chi‑square (L4, Poker test).",
     "ده بيشيّك على الـ independence (الـ correlation بين الأرقام) (L4, Autocorrelation test).",
     "صح. الـ frequency test بيقارن الأرقام بالـ uniform distribution باستخدام الـ KS أو الـ chi‑square.",
     "الـ gap test بيشيّك على الـ independence (L4, Gap test)."
    ],
    [
     "فيه degree of freedom واحدة بتضيع (L4, Frequency test 2: chi-square test).",
     "صح. الـ χ₀² بيمشي تقريبًا على chi‑square بـ <bdi>n − 1</bdi> degrees of freedom.",
     "الـ N ده عدد الـ observations، مش عدد الـ classes (L4, Frequency test 2: chi-square test).",
     "الـ N/n ده العدد المتوقع E<sub>i</sub> في كل class (L4, Frequency test 2: chi-square test)."
    ],
    [
     "الـ N رقم بيدّوا <bdi>N − 1</bdi> إشارة بس، فالأقصى هو <bdi>N − 1</bdi> (L4, Runs test: runs up and down).",
     "صح. أقصى عدد runs هو <bdi>N − 1</bdi> وأقل عدد هو run واحد."
    ],
    [
     "الـ 0.72 ده احتمال الـ 3 digits مختلفين:<span class=\"ltr\">0.9 × 0.8 = 0.72</span>(L4, Poker test)",
     "الـ 0.01 ده احتمال الـ 3 digits زي بعض:<span class=\"ltr\">0.1 × 0.1 = 0.01</span>(L4, Poker test)",
     "صح. الحساب:<span class=\"ltr\">1 − 0.72 − 0.01 = 0.27</span>",
     "دي مش واحدة من احتمالات الـ poker التلاتة (L4, Poker test)."
    ]
   ],
   "extra": [
    [
     "صح. الحساب:<span class=\"ltr\">(9·7 + 3) = 66 mod 32 = 2<br>(9·2 + 3) = 21<br>(9·21 + 3) = 192 mod 32 = 0<br>(9·0 + 3) = 3</span>والـ m هي 2⁵، والـ c بـ 3 و 32 relatively prime، والـ a على شكل <bdi>1 + 4k</bdi>:<span class=\"ltr\">a = 9 = 1 + 4(2)  ⇒  P = m = 32</span>",
     "الـ period بتاع m/4 يعني 8 ده حالة c بصفر (L4, LCM: proper choice of parameters).",
     "الـ 66 والـ 192 لازم نعملهم mod 32، فيبقوا 2 و 0 (L4, Linear Congruential Method).",
     "الـ <bdi>m − 1</bdi> ده حالة الـ modulus الأولي مع c بصفر؛ والـ 32 مش عدد أولي (L4, LCM: proper choice of parameters)."
    ],
    [
     "الـ c بصفر، فالـ period مينفعش يزيد عن m/4 يعني 8 (L4, LCM: proper choice of parameters).",
     "صح. الـ a على شكل <bdi>3 + 8k</bdi> (لأن 11 هي <bdi>3 + 8(1)</bdi>)، والـ X₀ بـ 5 فردي، فالـ period هو m/4 يعني 8:<span class=\"ltr\">23, 29, 31, 21, 7, 13, 15, 5</span>والـ X₀ بـ 2 زوجي:<span class=\"ltr\">22, 18, 6, 2</span>يعني period بـ 4.",
     "الأقصى m/4 محتاج seed فردي؛ والـ X₀ بـ 2 بيدّي (period بـ 4):<span class=\"ltr\">22, 18, 6, 2</span>(L4, LCM example 2)",
     "الـ <bdi>m − 1</bdi> ده حالة الـ modulus الأولي؛ والـ 32 مش عدد أولي (L4, LCM: proper choice of parameters)."
    ],
    [
     "صح. السلسلة:<span class=\"ltr\">3,  9 mod 7 = 2,  6,  18 mod 7 = 4,  12 mod 7 = 5,  15 mod 7 = 1</span>وأصغر k يخلّي <bdi>3ᵏ − 1</bdi> يقبل القسمة على 7 هو k بـ 6 اللي هو <bdi>m − 1</bdi>، فبنوصل لأطول period ممكن:<span class=\"ltr\">P = m − 1 = 6</span>",
     "لما m أولي و c بصفر أطول period ممكن هو <bdi>m − 1 = 6</bdi> مش m؛ والـ seed بيرجع بعد 6 خطوات (L4, LCM: proper choice of parameters).",
     "دي السلسلة بتاعة a بـ 2 (لأن <bdi>2³ − 1 = 7</bdi> بيقبل القسمة على 7 من أول k بـ 3، فالـ period بـ 3 بس)؛ أما مع a بـ 3 فالـ period بـ 6 (L4, LCM: proper choice of parameters).",
     "كل حاصل ضرب لازم نعمله mod 7 (يعني <bdi>9 mod 7 = 2</bdi> و <bdi>27 mod 7 = 6</bdi> و …) (L4, Linear Congruential Method)."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">μ<sub>a</sub> = (2·60 − 1)/3 = 39.67<br>σ<sub>a</sub>² = (16·60 − 29)/90 = 931/90 = 10.34,   σ<sub>a</sub> = 3.22<br>Z₀ = (40 − 39.67)/3.22 = 0.10,   −1.96 ≤ 0.10 ≤ 1.96</span>",
     "الـ 0.03 طالعة من القسمة على الـ variance اللي هو 10.34 بدل الـ standard deviation اللي هو σ<sub>a</sub> بـ 3.22 (L4, Runs test: runs up and down).",
     "الـ μ<sub>a</sub> بيساوي 39.67 مش 40:<span class=\"ltr\">μ<sub>a</sub> = (2N − 1)/3 = 119/3 = 39.67   (not 2N/3 = 40)</span>(L4, Runs test: runs up and down)",
     "الـ H₀ بتترفض بس لو Z₀ وقع برّه الفترة دي:<span class=\"ltr\">−z<sub>0.025</sub> ≤ Z₀ ≤ z<sub>0.025</sub> = 1.96</span>(L4, Runs test: runs up and down)"
    ],
    [
     "الـ −0.13 دي بتاعة مثال سلايد 58 اللي فيه a بـ 26 (L4, Runs up and down example).",
     "صح. الحساب:<span class=\"ltr\">μ<sub>a</sub> = 26.33,   σ<sub>a</sub> = √6.79 = 2.61<br>Z₀ = (7 − 26.33)/2.61 = −7.42 < −1.96</span>وعشان كده السلايد بيقول إن الـ KS والـ chi‑square هيقبلوا الـ uniformity <bdi>\"but, not so\"</bdi>.",
     "الـ normal approximation محتاج N أكبر من 20، والـ N هنا بـ 40 (L4, Runs test: runs up and down).",
     "لما الـ runs تبقى قليلة أوي الـ Z₀ بيطلع سالب، ولو القيمة المطلقة بتاعته أكبر من 1.96 يبقى رفض (L4, Runs test: runs up and down)."
    ],
    [
     "ده حالة i بـ 3 (L4, Autocorrelation example).",
     "الـ M لازم يحقق الشرط ده، فيبقى M بـ 4:<span class=\"ltr\">5 + (M+1)5 ≤ 30</span>(L4, Autocorrelation test)",
     "صح. الأرقام:<span class=\"ltr\">0.89, 0.93, 0.91, 0.88, 0.95, 0.87</span>ومجموع حواصل الضرب 4.1373:<span class=\"ltr\">ρ̂ = 4.1373/5 − 0.25 = 0.577<br>σ̂ = √59/60 = 0.128<br>Z₀ = 4.51 > 1.96</span>يعني الأرقام الكبيرة بييجي بعدها أرقام كبيرة.",
     "الـ 0.827 دي ناسية تطرح 0.25 (L4, Autocorrelation test)."
    ],
    [
     "صح. الشرط بيدّي M بـ 4:<span class=\"ltr\">2 + (M+1)5 ≤ 30</span>والأرقام:<span class=\"ltr\">0.01, 0.64, 0.15, 0.60, 0.49, 0.19</span>والحساب:<span class=\"ltr\">sum of products = 0.0064 + 0.0960 + 0.0900 + 0.2940 + 0.0931 = 0.5795<br>ρ̂ = 0.5795/5 − 0.25 = −0.1341<br>σ̂ = √59/60 = 0.128<br>Z₀ = −1.05</span>وده جوه الفترة ما بين −1.96 و 1.96.",
     "الـ M لازم يحقق الشرط ده، يعني M أقل من أو بيساوي 4.6، فيبقى M بـ 4 وبنستخدم 6 أرقام:<span class=\"ltr\">2 + (M+1)5 ≤ 30</span>(L4, Autocorrelation test)",
     "الـ 0.116 دي هي 0.5795 على 5 وناسية تطرح 0.25 (L4, Autocorrelation test).",
     "القيمة المطلقة للـ Z₀ هي 1.05 وده أصغر من z<sub>0.025</sub> بـ 1.96، فالـ H₀ مش هتترفض؛ وإشارة الـ ρ̂ لوحدها مش هي اللي بتقرر (L4, Autocorrelation test)."
    ],
    [
     "صح. بعد الترتيب:<span class=\"ltr\">0.1875, 0.4375, 0.6875, 0.9375</span>كل قيم <bdi>i/N − R<sub>(i)</sub></bdi> بـ 0.0625 (ودي الـ D⁺)، وكل قيم <bdi>R<sub>(i)</sub> − (i−1)/N</bdi> بـ 0.1875 (ودي الـ D⁻)؛ يعني D بـ 0.1875، ولما N بـ 4 الـ D<sub>0.05</sub> بـ 0.624.",
     "الـ D هو الأكبر ما بين D⁺ و D⁻، والـ D⁻ اللي هو 0.1875 أكبر (L4, Frequency test 1: Kolmogorov-Smirnov test).",
     "الـ 0.8125 طالعة من تطبيق المعادلات من غير ما نرتّب الداتا الأول (L4, KS example).",
     "القانون <bdi>1.36/√N</bdi> بيتستخدم بس لما N أكبر من 35 (L4, Frequency test 1: Kolmogorov-Smirnov test)."
    ],
    [
     "الـ 0.93 دي متجاهلة الـ class بتاعة الـ 3 زي بعض، واللي الحد بتاعها هو المسيطر:<span class=\"ltr\">(20 − 10)²/10 = 10</span>(L4, Poker test)",
     "صح. الحساب:<span class=\"ltr\">(700−720)²/720 = 0.56<br>(280−270)²/270 = 0.37<br>(20−10)²/10 = 10<br>total = 10.93 > χ²<sub>0.05,2</sub> = 5.99</span>",
     "فيه 3 classes بس، فالـ df بـ 2 مش 9 (L4, Poker test).",
     "الـ 47.65 دي بتاعة مثال السلايد اللي فيه 680 و 289 و 31 (L4, Poker test)."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">1234² = 01522756 → 5227<br>5227² = 27321529 → 3215<br>3215² = 10336225 → 3362</span>",
     "خد الـ 4 خانات اللي في نص المربع اللي من 8 خانات، مش أول 4 (L4, Midsquare method).",
     "الـ 2732 دي أول 4 خانات من 27321529؛ أما الـ 4 اللي في النص فهي 3215 (L4, Midsquare method).",
     "المربع لازم نكمّله لـ 8 خانات (01522756) قبل ما ناخد الـ 4 اللي في النص (L4, Midsquare method)."
    ]
   ]
  },
  "5": {
   "notes": [
    {
     "h": "نظرة عامة على الشابتر",
     "pts": [
      "الـ <b>random variate generation</b> يعني إننا ناخد الـ uniform random numbers <bdi>R</bdi> ونحوّلها لقيم <bdi>X</bdi> ماشية على الـ distribution اللي إحنا عايزينه (صفحة 83).",
      "محتوى الشابتر (صفحة 83):<br>• الـ inverse transform technique: للـ exponential والـ uniform والـ triangular والـ discrete (الـ empirical والـ discrete uniform والـ geometric)<br>• الـ <bdi>acceptance-rejection</bdi> technique: للـ Poisson distribution",
      "قايمة المحتويات بترقّم الطريقتين <bdi>\"5.3\"</bdi> و<bdi>\"5.4\"</bdi> وجزء الـ Poisson <bdi>\"5.2 1\"</bdi>، بس الكلام نفسه بيرقّمهم 5.1 و5.2 و5.2.1 ‡ (وإحنا ماشيين تحت بترقيم الكلام نفسه، يعني 5.1 و 5.2).",
      "كل الطرق دي <b>بتفترض إن الـ uniform random numbers على <bdi>(0, 1)</bdi> زي <bdi>R1, R2, …</bdi> موجودة وجاهزة</b> (صفحة 83)."
     ]
    },
    {
     "h": "الجزء 5.1: فكرة الـ inverse transform technique",
     "pts": [
      "الطريقة دي اتشرحت بالتفصيل على الـ exponential distribution (صفحة 83).",
      "الطريقة: لو معاك الـ pdf أو الـ pmf بتاع distribution، <b>هات الـ cdf <bdi>F(X)</bdi></b>، حيث <bdi>X</bdi> هو الـ random variate.",
      "<b>ساوي الـ cdf بالـ <bdi>R</bdi></b>:<span class=\"ltr\">F(X) = R</span>حيث <bdi>R</bdi> ده random number.",
      "بعد كده <b>يطلع</b>:<span class=\"ltr\">X = F⁻¹(R)</span>والـ <bdi>F⁻¹</bdi> معناها حل المعادلة<span class=\"ltr\">R = F(X)</span>بدلالة <bdi>R</bdi>، <b>مش <bdi>1/f</bdi></b>."
     ]
    },
    {
     "h": "الجزء 5.1.1: الـ exponential distribution",
     "pts": [
      "الـ <bdi>λ</bdi> هي <b>متوسط عدد مرات الحدوث (occurrences) في وحدة الزمن</b> (صفحة 84).",
      "<b>مثال 5.1</b>: لو الـ interarrival times <bdi>X1, X2, X3, …</bdi> ماشيين exponential بـ rate <bdi>λ</bdi>، يبقى <bdi>λ</bdi> هي متوسط عدد الـ arrivals في وحدة الزمن، و<span class=\"ltr\">E(Xi) = 1/λ</span>هي <b>متوسط الـ interarrival time</b> (صفحة 84)."
     ]
    },
    {
     "h": "خطوات الـ inverse transform (على الـ exponential)",
     "pts": [
      "<b>الخطوة 1</b>: احسب الـ cdf بتاع الـ random variable <bdi>X</bdi> اللي عايزه. في الـ exponential:<span class=\"ltr\">F(x) = 1 − e^(−λx),  x ≥ 0</span>",
      "<b>الخطوة 2</b>: خلّي <bdi>F(X) = R</bdi> على مدى قيم <bdi>X</bdi>:<span class=\"ltr\">1 − e^(−λX) = R</span>وبما إن <bdi>X</bdi> random variable، يبقى <bdi>1 − e^(−λX)</bdi> برضه random variable، و<b>uniformly distributed على <bdi>(0, 1)</bdi></b>.",
      "<b>الخطوة 3</b>: حل <bdi>F(X) = R</bdi> عشان تطلّع <bdi>X</bdi> بدلالة <bdi>R</bdi> (الاشتقاق في بوكس المعادلات). المعادلة (5.1) اسمها <b>random variate generator</b> للـ exponential distribution، وبتتكتب<span class=\"ltr\">X = F⁻¹(R)</span>",
      "<b>الخطوة 4</b>: ولّد uniform random numbers <bdi>R1, R2, R3, …</bdi> واحسب<span class=\"ltr\">Xi = F⁻¹(Ri),  i = 1, 2, …</span>",
      "المعادلة (5.2) بتحط <bdi>Ri</bdi> مكان <bdi>1 − Ri</bdi>. <b>ملحوظة</b>: ده مسموح لأن الاتنين <bdi>1 − Ri</bdi> و<bdi>Ri</bdi> uniformly distributed على <bdi>(0, 1)</bdi> (صفحة 84).",
      "لو استخدمت (5.1) و(5.2) على نفس الـ <bdi>R</bdi> هتطلع قيم <bdi>X</bdi> مختلفة، بس السلسلتين ليهم نفس الـ exponential distribution."
     ],
     "figH": {
      "ms-exp-inv": "الـ inverse transform للـ exponential، الـ R على الـ cdf بتدّينا الـ X"
     }
    },
    {
     "h": "الجزء 5.1.2: الـ uniform distribution على <bdi>[a, b]</bdi>",
     "pts": [
      "هنا <bdi>X</bdi> هو random variable متوزّع uniformly على <bdi>[a, b]</bdi>، و<bdi>R</bdi> هو random number (صفحة 85).",
      "فيه تخمين صح لتوليد <bdi>X</bdi> وهو<span class=\"ltr\">X = a + (b − a)R          (5.3)</span>والخطوات اللي تحت بتشتقّه.",
      "<b>الخطوة 1</b>: الـ cdf هو<span class=\"ltr\">F(x) = 0 for x < a;  (x − a)/(b − a) for a ≤ x ≤ b;  1 for x > b</span>",
      "<b>الخطوة 2</b>: خلّي<span class=\"ltr\">F(X) = (X − a)/(b − a) = R</span>",
      "<b>الخطوة 3</b>: حل عشان <bdi>X</bdi>:<span class=\"ltr\">X − a = R(b − a)  ⇒  X = a + (b − a)R</span>"
     ],
     "figH": {
      "ms-unif-inv": "الـ uniform على الفترة من a لـ b، والـ X بتتقري من الـ cdf"
     }
    },
    {
     "h": "الجزء 5.1.3: الـ triangular distribution",
     "pts": [
      "الـ pdf هو<span class=\"ltr\">f(x) = x for 0 ≤ x ≤ 1;  2 − x for 1 < x ≤ 2;  0 otherwise</span>وده في صفحة 85.",
      "الشكل 5.1 (صفحة 85): الـ density بتاع الـ triangular distribution، مثلث طالع من <bdi>(0, 0)</bdi> لحد قمة ارتفاعها 1 عند <bdi>x = 1</bdi> ونازل تاني لـ 0 عند <bdi>x = 2</bdi>: يعني <b>الأطراف <bdi>(0, 2)</bdi> والـ mode عند 1</b>.",
      "الـ cdf هو (صفحة 86):<span class=\"ltr\">F(x) = 0 for x ≤ 0;  x²/2 for 0 < x ≤ 1;  1 − (2 − x)²/2 for 1 < x ≤ 2;  1 for x > 2</span>",
      "لما <bdi>0 ≤ X ≤ 1</bdi>:<span class=\"ltr\">R = X²/2          (5.4)</span>وبما إن <bdi>0 ≤ X ≤ 1</bdi> معناها <b><bdi>0 ≤ R ≤ 1/2</bdi></b>، يبقى<span class=\"ltr\">X = √(2R)</span>",
      "لما <bdi>1 ≤ X ≤ 2</bdi>:<span class=\"ltr\">R = 1 − (2 − X)²/2          (5.5)</span>وبما إن <bdi>1 ≤ X ≤ 2</bdi> معناها <b><bdi>1/2 ≤ R ≤ 1</bdi></b>، يبقى<span class=\"ltr\">X = 2 − √(2(1 − R))</span>",
      "للتأكد: <bdi>R = 1/2</bdi> بتدّي <bdi>X = √1 = 1</bdi> من الحتّتين الاتنين (وده الـ mode)."
     ],
     "figH": {
      "ms-tri-pdf": "شكل Fig 5.1، كثافة الـ triangular والـ mode عند 1",
      "ms-tri-inv": "الـ inverse transform للـ triangular، والجزء بيتحدد حسب الـ R"
     }
    },
    {
     "h": "الجزء 5.1.4: الـ discrete distributions",
     "pts": [
      "الـ discrete distributions ممكن نولّدها بالـ inverse transform يا إما <b>numerically (بطريقة الـ table lookup)</b> يا إما <b>algebraically (بمعادلة)</b> (صفحة 86).",
      "اللي هنغطيه: الـ <b>empirical</b> distribution، واتنين من الـ discrete distributions المشهورة هما الـ <b>(discrete) uniform</b> والـ <b>geometric</b>."
     ]
    },
    {
     "h": "مثال 5.2: الـ empirical discrete distribution (الشحنات)",
     "pts": [
      "في آخر اليوم، عدد الشحنات (shipments) اللي على رصيف التحميل في شركة ABC بيبقى 0 أو 1 أو 2، والـ relative frequencies بتاعتهم 0.50 و0.30 و0.20 بالترتيب. الاستشاريين محتاجين يولّدوا <bdi>X</bdi> اللي هو عدد الشحنات على الرصيف في آخر كل يوم (صفحة 86).",
      "الـ pmf:<span class=\"ltr\">p(0) = P(X = 0) = 0.50,  p(1) = P(X = 1) = 0.30,  p(2) = P(X = 2) = 0.20</span>وده في صفحة 87.",
      "جدول 5.2 (توليد الـ discrete variate <bdi>X</bdi>)، والـ <bdi>r</bdi> هو الـ input والـ <bdi>x</bdi> هو الـ output:<span class=\"ltr\">i = 1: r1 = 0.50 → x1 = 0;   i = 2: r2 = 0.80 → x2 = 1;   i = 3: r3 = 1.00 → x3 = 2</span>",
      "الـ cdf بتاع أي discrete random variable دايمًا عبارة عن <b>خطوط أفقية فيها jumps حجمها <bdi>p(x)</bdi></b> عند النقط <bdi>x</bdi> اللي الـ variable ممكن ياخدها: jump قدّها 0.5 عند <bdi>x = 0</bdi>، و0.3 عند <bdi>x = 1</bdi>، و0.2 عند <bdi>x = 2</bdi>.",
      "الـ cdf:<span class=\"ltr\">F(x) = 0 for x < 0;  0.5 for 0 ≤ x < 1;  0.8 for 1 ≤ x < 2;  1 for 2 ≤ x</span>",
      "الشكل 5.2 (صفحة 87): رسمة على شكل سلالم للـ <bdi>F(x)</bdi> بمستويات 0.5 و0.8 و1؛ وفيها خط أفقي متقطّع عند <bdi>R1 = 0.73</bdi> بيقابل الـ jump عند <bdi>x = 1</bdi>، وخط رأسي متقطّع نازل منه بيدّي <bdi>X1 = 1</bdi>.",
      "التوليد باستخدام <bdi>R1 = 0.73</bdi>:",
      "<b>(1) بالرسم</b>: حدّد <bdi>R1 = 0.73</bdi> على المحور الرأسي، وارسم خط أفقي لحد ما يخبط في <bdi>'jump'</bdi> في الـ cdf، وبعدين نزّل عمود على المحور الأفقي واقرا الـ variate (<bdi>X1 = 1</bdi>).",
      "<b>(2) طريقة الـ table lookup</b> (صفحة 88): دوّر على الفترة اللي <bdi>R</bdi> واقعة فيها، يعني لو<span class=\"ltr\">F(x(i−1)) = r(i−1) < R ≤ ri = F(xi)</span>يبقى <bdi>X = xi</bdi>. وهنا <bdi>r0 = 0</bdi> و<bdi>x0 = −∞</bdi>، والقيم الممكنة هي <bdi>x1, …, xn</bdi>، و<span class=\"ltr\">rk = p(x1) + … + p(xk),   k = 1, 2, …, n</span>",
      "في المثال ده:<span class=\"ltr\">n = 3,  x1 = 0,  x2 = 1,  x3 = 2   ⇒   r1 = 0.5,  r2 = 0.8,  r3 = 1.0</span>وبما إن<span class=\"ltr\">r1 = 0.5 < R1 = 0.73 ≤ r2 = 0.8</span>يبقى <b><bdi>X1 = x2 = 1</bdi></b>."
     ],
     "figH": {
      "ms-ship-cdf": "شكل Fig 5.2، بنقرا الـ R1 على الـ cdf بتاع الـ shipments",
      "ms-ship-lookup": "طريقة الـ table lookup، بندوّر على الفترة اللي فيها الـ R"
     }
    },
    {
     "h": "مثال 5.3: الـ discrete uniform distribution على <bdi>{1, 2, …, k}</bdi>",
     "pts": [
      "الـ pmf:<span class=\"ltr\">p(x) = 1/k,  x = 1, 2, …, k</span>وده في صفحة 88.",
      "الـ cdf:<span class=\"ltr\">F(x) = 0 for x < 1;  1/k for 1 ≤ x < 2;  2/k for 2 ≤ x < 3;  …;  (k − 1)/k for k − 1 ≤ x < k;  1 for k ≤ x</span>",
      "خلّي <bdi>xi = i</bdi> و<span class=\"ltr\">ri = p(1) + … + p(xi) = F(xi) = i/k,    F(x(i−1)) = (i − 1)/k</span>وده في صفحة 89.",
      "باستخدام<span class=\"ltr\">F(x(i−1)) = r(i−1) < R ≤ ri = F(xi)</span>الـ <bdi>R</bdi> بتحقّق<span class=\"ltr\">(i − 1)/k < R ≤ i/k          (5.6)</span>وبعدين نخلّي <bdi>X = i</bdi>.",
      "لو حلّينا (5.6) عشان نطلّع <bdi>i</bdi>:<span class=\"ltr\">i − 1 < Rk ≤ i,   i.e.   Rk ≤ i < Rk + 1</span>",
      "ده بيدّينا المعادلة <b><bdi>X = ⌈Rk⌉</bdi></b> (يعني نقرّب <bdi>Rk</bdi> لفوق). مثال:<span class=\"ltr\">X1 = ⌈7.8⌉ = 8</span>"
     ],
     "figH": {
      "ms-dunif": "الـ discrete uniform، بنضرب الـ R في الـ k ونقرّب لفوق"
     }
    },
    {
     "h": "مثال 5.4: الـ pmf <bdi>p(x) = 2x / (k(k + 1))</bdi>",
     "pts": [
      "الـ pmf هو<span class=\"ltr\">p(x) = 2x/(k(k + 1))</span>للـ integer <bdi>x</bdi> اللي في <bdi>{1, 2, …, k}</bdi> (صفحة 89).",
      "الـ cdf:<span class=\"ltr\">F(x) = Σ (i = 1 to x) 2i/(k(k + 1)) = (2/(k(k + 1))) · x(x + 1)/2 = x(x + 1)/(k(k + 1))</span>",
      "نستخدم <bdi>F(x − 1) < R ≤ F(x)</bdi>:<span class=\"ltr\">(x − 1)x/(k(k + 1)) < R ≤ x(x + 1)/(k(k + 1))</span>يعني<span class=\"ltr\">(x − 1)x < k(k + 1)R ≤ x(x + 1)</span>وده في صفحة 90.",
      "ناخد أول متباينة كأنها معادلة:<span class=\"ltr\">(x − 1)x = k(k + 1)R   ⇒   x² − x − k(k + 1)R = 0</span>",
      "نستخدم الـ quadratic formula بـ<span class=\"ltr\">a = 1,  b = −1,  c = −k(k + 1)R</span>ونسيب بس الـ root الموجب:<span class=\"ltr\">x = (1 + √(1 + 4(k² + k)R))/2</span>",
      "لما نقرّب لفوق يطلع <b><bdi>X = ⌈x − 1⌉</bdi></b>."
     ],
     "figH": {
      "ms-ex54": "مثال 5.4، الـ quadratic formula بتدّي نفس نتيجة الـ table lookup"
     }
    },
    {
     "h": "مثال 5.5: الـ geometric distribution",
     "pts": [
      "الـ pmf:<span class=\"ltr\">p(x) = p(1 − p)^x,   x = 0, 1, 2, …,   0 < p < 1</span>وده في صفحة 90.",
      "الـ cdf، باستخدام قانون مجموع الـ geometric series (صفحة 91):<span class=\"ltr\">F(x) = Σ (i = 0 to x) p(1 − p)^i = p[1 + (1 − p) + (1 − p)² + … + (1 − p)^x] = p · (1 − (1 − p)^(x+1)) / (1 − (1 − p)) = 1 − (1 − p)^(x+1)</span>",
      "نستخدم <bdi>F(x − 1) < R ≤ F(x)</bdi>:<span class=\"ltr\">1 − (1 − p)^x < R ≤ 1 − (1 − p)^(x+1),   0 < R < 1</span>",
      "يبقى<span class=\"ltr\">(1 − p)^(x+1) ≤ 1 − R < (1 − p)^x</span>ولما ناخد الـ log:<span class=\"ltr\">(x + 1) ln(1 − p) ≤ ln(1 − R) < x ln(1 − p)</span>",
      "لما نقسم على <bdi>ln(1 − p)</bdi>، النوتس كاتبة النتيجة كده:<span class=\"ltr\">(x + 1) ≤ ln(1 − R)/ln(1 − p) < x</span>‡ بما إن <bdi>ln(1 − p) < 0</bdi> علامات المتباينة لازم تنعكس هنا، والسطر الصح هو<span class=\"ltr\">x < ln(1 − R)/ln(1 − p) ≤ x + 1</span>والسطر اللي بعده في النوتس صح.",
      "وبما إن <bdi>1 − p < 1</bdi> معناها <bdi>ln(1 − p) < 0</bdi>:<span class=\"ltr\">ln(1 − R)/ln(1 − p) − 1 ≤ x < ln(1 − R)/ln(1 − p)</span>",
      "الـ <bdi>X</bdi> هو الـ integer <bdi>x</bdi> اللي بيحقّق ده؛ وبدالة التقريب لفوق:<span class=\"ltr\">X = ⌈ln(1 − R)/ln(1 − p) − 1⌉</span>",
      "لو الـ geometric variate بياخد القيم <bdi>{q, q + 1, q + 2, …}</bdi> والـ pmf بتاعه <bdi>p(x) = p(1 − p)^(x − q)</bdi>، يبقى<span class=\"ltr\">X = q + ⌈ln(1 − R)/ln(1 − p) − 1⌉</span>",
      "<b>ملحوظة</b>: غالبًا <bdi>q = 1</bdi>."
     ]
    },
    {
     "h": "مثال 5.6: تلات geometric variates بـ mean قدّه 2",
     "pts": [
      "عايزين نولّد 3 قيم من geometric distribution على <bdi>{X ≥ 1}</bdi> والـ mean بتاعه 2: الـ pmf هو <bdi>p(x) = p(1 − p)^(x − 1)</bdi> لـ <bdi>x = 1, 2, …</bdi>، والـ mean هو <bdi>1/p = 2</bdi>. والـ random numbers هي <bdi>R1 = 0.932, R2 = 0.105, R3 = 0.687</bdi> (من table A.2) (صفحة 92).",
      "الحل: <bdi>p = 1/2</bdi> و<bdi>q = 1</bdi>، و<span class=\"ltr\">X = 1 + ⌈ln(1 − R)/ln(1 − 0.5) − 1⌉</span>",
      "القيمة الأولى:<span class=\"ltr\">X1 = 1 + ⌈ln(1 − 0.932)/ln(0.5) − 1⌉ = ⌈3.8⌉ = 4</span>يعني <b>4</b> (وبالضبط<span class=\"ltr\">ln 0.068/ln 0.5 = 3.878   ⇒   1 + ⌈2.878⌉ = 4</span>).",
      "القيمة التانية:<span class=\"ltr\">X2 = 1 + ⌈ln(1 − 0.105)/ln(0.5) − 1⌉ = ⌈0.166⌉ = 1</span>يعني <b>1</b>. ‡ القيمة المظبوطة<span class=\"ltr\">ln 0.895/ln 0.5 = 0.160</span>يعني الكمية 0.160 مش 0.166؛ والإجابة <bdi>X2 = 1</bdi> ما بتتغيّرش.",
      "القيمة التالتة:<span class=\"ltr\">X3 = 1 + ⌈ln(1 − 0.687)/ln(0.5) − 1⌉ = ⌈1.67⌉ = 2</span>يعني <b>2</b> (وبالضبط<span class=\"ltr\">ln 0.313/ln 0.5 = 1.676</span>).",
      "في السطور دي النوتس بتدخّل الـ 1 جوه الـ ceiling، لأن 1 integer:<span class=\"ltr\">1 + ⌈y⌉ = ⌈1 + y⌉</span>"
     ],
     "figH": {
      "ms-geom": "مثال 5.6 خطوة بخطوة، والـ variates اللي طالعة 4 و 1 و 2"
     }
    },
    {
     "h": "الجزء 5.2: الـ <bdi>acceptance-rejection</bdi> technique",
     "pts": [
      "المثال التوضيحي: توليد <bdi>X</bdi> متوزّع uniformly بين <bdi>1/4</bdi> و<bdi>1</bdi> (صفحة 92).",
      "<b>الخطوة 1</b>: ولّد random number <bdi>R</bdi>.",
      "<b>الخطوة 2</b>: فيها حالتين؛ (أ) لو <bdi>R ≥ 1/4</bdi> <b>اقبل (accept)</b> <bdi>X = R</bdi> وروح للخطوة 3؛ (ب) لو <bdi>R < 1/4</bdi> <b>ارفض (reject)</b> الـ <bdi>R</bdi> وارجع للخطوة 1.",
      "<b>الخطوة 3</b>: لو محتاج uniform variate تاني على <bdi>[1/4, 1]</bdi> كرّر من الخطوة 1؛ غير كده وقّف.",
      "الخطوة 1 بتولّد <bdi>R</bdi> جديد كل مرة بتتنفّذ فيها. الخطوة 2أ هي <b>acceptance</b>، والخطوة 2ب هي <b>rejection</b>. ولما الشرط يتحقّق في الآخر، <bdi>X = R</bdi>.",
      "ليه الطريقة صح: القيم اللي اتقبلت هي <bdi>R</bdi> <b>بشرط الحدث <bdi>{R ≥ 1/4}</bdi></b> (يعني conditioned عليه)، والقيم دي ليها الـ distribution اللي إحنا عايزينه (الإثبات في بوكس المعادلات، صفحة 92 لـ 93).",
      "يعني لو <bdi>1/4 ≤ R ≤ 1</bdi> نخلّي <bdi>X = R</bdi> (صفحة 93).",
      "الـ <b>efficiency</b> بتعتمد على عدد الـ rejections: كل ما الـ rejections تقل، الـ efficiency تزيد.",
      "الطريقة دي بتتوضّح بالـ Poisson distribution."
     ],
     "figH": {
      "ms-acc-rej": "الـ acceptance-rejection، بنقبل الـ R بس لو مش أقل من 1/4"
     }
    },
    {
     "h": "الجزء 5.2.1: الـ Poisson distribution",
     "pts": [
      "الـ pmf:<span class=\"ltr\">p(n) = P(N = n) = e^(−α) αⁿ / n!,   n = 0, 1, 2, …</span>والـ <bdi>N</bdi> هو الـ Poisson random variate، و<bdi>α > 0</bdi> هو الـ mean (صفحة 93).",
      "ممكن نفهم <bdi>N</bdi> على إنه <b>عدد الـ arrivals من Poisson arrival process في وحدة زمن واحدة</b>؛ وفي الـ exponential distribution الـ <bdi>α</bdi> هي متوسط عدد الـ arrivals في وحدة الزمن. عشان كده الـ Poisson (الـ discrete) والـ exponential (الـ continuous) مرتبطين ببعض.",
      "الـ <bdi>N = n</bdi> لو وبس لو<span class=\"ltr\">A1 + … + An ≤ 1 < A1 + … + An + A(n+1)          (5.7)</span>حيث <bdi>A1, A2, …</bdi> هي الـ interarrival times، وهي exponential بـ rate <bdi>α</bdi>.",
      "السبب: <bdi>N = n</bdi> معناها إن فيه بالظبط <bdi>n</bdi> arrivals في وحدة زمن واحدة؛ و(5.7) معناها إن الـ arrival رقم <bdi>n</bdi> جه قبل الزمن 1، والـ arrival رقم <bdi>n + 1</bdi> جه بعد الزمن 1. الجملتين دول نفس المعنى بالظبط.",
      "باستخدام (5.2):<span class=\"ltr\">Ai = −(1/α) ln Ri          (5.8)</span>ولما نعوّض في (5.7):<span class=\"ltr\">Σ (i = 1 to n) −(1/α) ln Ri ≤ 1 < Σ (i = 1 to n+1) −(1/α) ln Ri</span>",
      "لما نضرب في <bdi>−α</bdi> علامات المتباينة بتنعكس، ومجموع الـ logs بيبقى log لحاصل الضرب (صفحة 94):<span class=\"ltr\">ln Π(i=1..n) Ri ≥ −α > ln Π(i=1..n+1) Ri</span>",
      "وباستخدام <bdi>e^(ln x) = x</bdi>:<span class=\"ltr\">Π(i=1..n) Ri ≥ e^(−α) > Π(i=1..n+1) Ri</span>وده مكافئ لـ (5.7)."
     ],
     "figH": {
      "ms-pois-time": "الـ N هي عدد الـ arrivals اللي قبل الزمن 1"
     }
    },
    {
     "h": "خطوات توليد Poisson variate <bdi>N</bdi>",
     "pts": [
      "<b>الخطوة 1</b>: خلّي <bdi>n = 0</bdi> و<bdi>P = 1</bdi> (صفحة 94).",
      "<b>الخطوة 2</b>: ولّد random number <bdi>R(n+1)</bdi> وبدّل <bdi>P</bdi> بـ <bdi>P · R(n+1)</bdi>.",
      "<b>الخطوة 3</b>: لو <bdi>P < e^(−α)</bdi> اقبل <bdi>N = n</bdi>؛ غير كده ارفض الـ <bdi>n</bdi> الحالي، وزوّد <bdi>n</bdi> واحد، وارجع للخطوة 2.",
      "ملحوظة: لو <bdi>P ≥ e^(−α)</bdi> في الخطوة 3، الـ <bdi>n</bdi> بيترفض، ولازم العملية تعدّي على trial واحدة زيادة على الأقل.",
      "ملحوظة: لو <bdi>N = n</bdi> يبقى محتاجين <b><bdi>n + 1</bdi> random numbers</b>، يعني المتوسط هو <b><bdi>E(N + 1) = α + 1</bdi></b>."
     ]
    },
    {
     "h": "مثال 5.7: تلات Poisson variates بـ <bdi>α = 0.2</bdi>",
     "pts": [
      "الـ random numbers من table A.2، و<span class=\"ltr\">e^(−α) = e^(−0.2) = 0.8187</span>وده في صفحة 94.",
      "الـ variate الأول:<span class=\"ltr\">n = 0,  P = 1;   R1 = 0.4357,  P = 0.4357;   0.4357 < 0.8187</span>يبقى نقبل <b><bdi>N = 0</bdi></b>.",
      "الـ variate التاني:<span class=\"ltr\">n = 0,  P = 1;   R1 = 0.4146,  P = 0.4146;   0.4146 < 0.8187</span>يبقى نقبل <b><bdi>N = 0</bdi></b> (صفحة 95).",
      "الـ variate التالت:<span class=\"ltr\">n = 0,  P = 1;   R1 = 0.8353,  P = 0.8353 ≥ e^(−α)</span>يبقى نرفض <bdi>n = 0</bdi> ونروح للخطوة 2 بـ <bdi>n = 1</bdi>.",
      "بعدها:<span class=\"ltr\">R2 = 0.9952,  P = 0.8353 × 0.9952 = 0.8312 ≥ e^(−α)</span>يبقى نرفض <bdi>n = 1</bdi> ونروح للخطوة 2 بـ <bdi>n = 2</bdi>.",
      "بعدها:<span class=\"ltr\">R3 = 0.8004,  P = 0.8312 × 0.8004 = 0.6654 < e^(−α)</span>يبقى نقبل <b><bdi>N = n = 2</bdi></b>.",
      "(النوتس جوه كل variate بتبدأ ترقيم الـ random numbers من <bdi>R1</bdi> تاني.)",
      "توليد 3 Poisson variates أخد <b>5 random numbers</b>. ولو عايز 1000 Poisson variate بـ <bdi>α = 0.2</bdi> هتحتاج تقريبًا<span class=\"ltr\">1000(α + 1) = 1200</span>يعني حوالي <b>1200</b> random number."
     ],
     "figH": {
      "ms-pois-gen": "مثال 5.7، طريقة الضرب صف بصف"
     }
    }
   ],
   "cards": [
    "الـ uniform random numbers على <bdi>(0, 1)</bdi> زي <bdi>R1, R2, …</bdi> موجودة وجاهزة (الـ pdf هو <bdi>f(x) = 1</bdi> على <bdi>[0, 1]</bdi>، والـ cdf هو <bdi>F(x) = x</bdi> على <bdi>[0, 1]</bdi>).",
    "هات الـ cdf <bdi>F(X)</bdi>، وساويه بـ <bdi>R</bdi>، وحل عشان تطلّع <bdi>X</bdi>:<span class=\"ltr\">X = F⁻¹(R)</span>يعني حل المعادلة <bdi>R = F(X)</bdi> بدلالة <bdi>R</bdi>، مش <bdi>1/f</bdi>.",
    "(1) احسب الـ cdf <bdi>F(x)</bdi><br>(2) خلّي <bdi>F(X) = R</bdi> على مدى قيم <bdi>X</bdi><br>(3) حل <bdi>F(X) = R</bdi> عشان تطلّع <bdi>X</bdi> بدلالة <bdi>R</bdi><br>(4) ولّد <bdi>R1, R2, …</bdi> واحسب <bdi>Xi = F⁻¹(Ri)</bdi>.",
    "الاتنين لـ <bdi>x ≥ 0</bdi>:<span class=\"ltr\">f(x) = λe^(−λx);    F(x) = 1 − e^(−λx)</span>",
    "الـ <bdi>λ</bdi> هي متوسط عدد الـ arrivals (الـ occurrences) في وحدة الزمن؛ والـ <bdi>1/λ = E(Xi)</bdi> هو متوسط الـ interarrival time.",
    "الـ generator هو<span class=\"ltr\">X = −(1/λ) ln(1 − R)</span>",
    "بنحط <bdi>Ri</bdi> مكان <bdi>1 − Ri</bdi>:<span class=\"ltr\">Xi = −(1/λ) ln Ri</span>وده مسموح لأن الاتنين uniform على <bdi>(0, 1)</bdi>.",
    "الـ generator هو<span class=\"ltr\">X = a + (b − a)R</span>وجاي من<span class=\"ltr\">F(X) = (X − a)/(b − a) = R</span>",
    "الـ cdf هو<span class=\"ltr\">F(x) = x²/2 for 0 < x ≤ 1;    1 − (2 − x)²/2 for 1 < x ≤ 2</span>",
    "الـ generator هو<span class=\"ltr\">X = √(2R) for 0 ≤ R ≤ 1/2;    X = 2 − √(2(1 − R)) for 1/2 < R ≤ 1</span>",
    "خطوط أفقية فيها jumps حجمها <bdi>p(x)</bdi> عند كل قيمة <bdi>x</bdi> الـ variable ممكن ياخدها.",
    "القاعدة: لو<span class=\"ltr\">F(x(i−1)) = r(i−1) < R ≤ ri = F(xi)</span>يبقى <bdi>X = xi</bdi> (مع <bdi>r0 = 0</bdi> و<bdi>x0 = −∞</bdi> و<bdi>rk = p(x1) + … + p(xk)</bdi>).",
    "بما إن<span class=\"ltr\">r1 = 0.5 < 0.73 ≤ r2 = 0.8</span>يبقى <bdi>X = 1</bdi>.",
    "الـ generator هو <bdi>X = ⌈Rk⌉</bdi> (يعني نقرّب <bdi>Rk</bdi> لفوق)، وجاي من <bdi>i − 1 < Rk ≤ i</bdi>. مثلًا <bdi>⌈7.8⌉ = 8</bdi>.",
    "الـ cdf والـ generator:<span class=\"ltr\">F(x) = x(x+1)/(k(k+1));    X = ⌈(1 + √(1 + 4(k² + k)R))/2 − 1⌉</span>",
    "الـ cdf والـ generator:<span class=\"ltr\">F(x) = 1 − (1 − p)^(x+1);    X = ⌈ln(1 − R)/ln(1 − p) − 1⌉</span>",
    "الـ generator هو<span class=\"ltr\">X = q + ⌈ln(1 − R)/ln(1 − p) − 1⌉</span>وغالبًا <bdi>q = 1</bdi>.",
    "هنا <bdi>p = 1/2</bdi> و<bdi>q = 1</bdi>، والنتايج:<span class=\"ltr\">X1 = 4,   X2 = 1,   X3 = 2</span>",
    "ولّد <bdi>R</bdi>؛ لو <bdi>R ≥ 1/4</bdi> اقبل <bdi>X = R</bdi>، غير كده ارفضه وولّد <bdi>R</bdi> جديد. والقيم اللي اتقبلت هي <bdi>R</bdi> بشرط <bdi>{R ≥ 1/4}</bdi>.",
    "كل ما الـ rejections تقل، الـ efficiency تزيد.",
    "الـ pmf هو<span class=\"ltr\">p(n) = e^(−α) αⁿ / n!,   n = 0, 1, 2, …</span>والـ <bdi>α > 0</bdi> هو الـ mean.",
    "الـ <bdi>N = n</bdi> لو وبس لو<span class=\"ltr\">A1 + … + An ≤ 1 < A1 + … + A(n+1)</span>والـ <bdi>Ai</bdi> هي exponential interarrival times بـ rate <bdi>α</bdi>؛ وده مكافئ لـ<span class=\"ltr\">Π(1..n) Ri ≥ e^(−α) > Π(1..n+1) Ri</span>",
    "(1) خلّي <bdi>n = 0</bdi> و<bdi>P = 1</bdi><br>(2) ولّد <bdi>R(n+1)</bdi> وخلّي <bdi>P = P·R(n+1)</bdi><br>(3) لو <bdi>P < e^(−α)</bdi> اقبل <bdi>N = n</bdi>، غير كده خلّي <bdi>n = n + 1</bdi> وارجع للخطوة 2.",
    "الـ <bdi>N = n</bdi> محتاجة <bdi>n + 1</bdi> random numbers؛ والمتوسط <bdi>E(N + 1) = α + 1</bdi> (يعني 1200 لـ 1000 variate لو <bdi>α = 0.2</bdi>).",
    "القيمة <bdi>e^(−0.2) = 0.8187</bdi>، والـ variates طلعت <bdi>N = 0, 0, 2</bdi> باستخدام 5 random numbers."
   ],
   "qa": [
    "لو معاك الـ pdf بتاع <bdi>X</bdi>، هات الـ cdf <bdi>F(X)</bdi>، وساويه بـ <bdi>R</bdi> (و<bdi>R</bdi> ده uniform random number)، وحل عشان تطلّع <bdi>X = F⁻¹(R)</bdi>.<br>الخطوة 1: الـ cdf هو<span class=\"ltr\">F(x) = 1 − e^(−λx),  x ≥ 0</span><br>الخطوة 2: خلّي<span class=\"ltr\">1 − e^(−λX) = R</span>والـ <bdi>R</bdi> هنا uniform على <bdi>(0, 1)</bdi>.<br>الخطوة 3: نحل:<span class=\"ltr\">e^(−λX) = 1 − R   ⇒   −λX = ln(1 − R)   ⇒   X = −(1/λ) ln(1 − R)   (5.1)</span>وده الـ random variate generator.<br>الخطوة 4: ولّد <bdi>R1, R2, …</bdi> واحسب<span class=\"ltr\">Xi = −(1/λ) ln(1 − Ri)</span>أو بنفس المعنى<span class=\"ltr\">Xi = −(1/λ) ln Ri   (5.2)</span>لأن <bdi>1 − Ri</bdi> و<bdi>Ri</bdi> الاتنين uniform على <bdi>(0, 1)</bdi>.",
    "الـ pdf هو <bdi>f(x) = 1/(b − a)</bdi> لـ <bdi>a ≤ x ≤ b</bdi>.<br>الخطوة 1: الـ cdf هو<span class=\"ltr\">F(x) = 0 for x < a;   (x − a)/(b − a) for a ≤ x ≤ b;   1 for x > b</span><br>الخطوة 2: خلّي<span class=\"ltr\">(X − a)/(b − a) = R</span><br>الخطوة 3: يبقى <bdi>X − a = R(b − a)</bdi>، وبالتالي<span class=\"ltr\">X = a + (b − a)R   (5.3)</span>",
    "الـ cdf هو<span class=\"ltr\">F(x) = x²/2 for 0 < x ≤ 1;   1 − (2 − x)²/2 for 1 < x ≤ 2</span><br>لما <bdi>0 ≤ X ≤ 1</bdi>:<span class=\"ltr\">R = X²/2   (5.4)</span>والـ <bdi>R</bdi> بتمشي على <bdi>[0, 1/2]</bdi>، يبقى <bdi>X = √(2R)</bdi>.<br>لما <bdi>1 ≤ X ≤ 2</bdi>:<span class=\"ltr\">R = 1 − (2 − X)²/2   (5.5)</span>والـ <bdi>R</bdi> بتمشي على <bdi>[1/2, 1]</bdi>:<span class=\"ltr\">(2 − X)² = 2(1 − R)   ⇒   X = 2 − √(2(1 − R))</span><br>الـ generator:<span class=\"ltr\">X = √(2R) if 0 ≤ R ≤ 1/2;   X = 2 − √(2(1 − R)) if 1/2 < R ≤ 1</span>",
    "الـ cumulative probabilities:<span class=\"ltr\">r1 = F(0) = 0.50,   r2 = F(1) = 0.80,   r3 = F(2) = 1.00</span><br>الـ table lookup: لو <bdi>r(i−1) < R ≤ ri</bdi> يبقى <bdi>X = xi</bdi>.<br>الطريقة كلها:<span class=\"ltr\">X = 0 if R ≤ 0.5;   X = 1 if 0.5 < R ≤ 0.8;   X = 2 if 0.8 < R ≤ 1.0</span><br>لما <bdi>R1 = 0.73</bdi>:<span class=\"ltr\">0.5 < 0.73 ≤ 0.8</span>يبقى <b><bdi>X1 = 1</bdi></b>. وبالرسم: خط أفقي عند 0.73 بيخبط في الـ jump بتاع الـ cdf عند <bdi>x = 1</bdi>.",
    "بما إن <bdi>p(x) = 1/k</bdi>، يبقى <bdi>F(xi) = ri = i/k</bdi> و<bdi>F(x(i−1)) = (i − 1)/k</bdi>.<br>متباينة الـ table lookup:<span class=\"ltr\">(i − 1)/k < R ≤ i/k   (5.6)</span>وبعدين <bdi>X = i</bdi>.<br>نضرب في <bdi>k</bdi>:<span class=\"ltr\">i − 1 < Rk ≤ i,   i.e.   Rk ≤ i < Rk + 1</span><br>يبقى <b><bdi>X = ⌈Rk⌉</bdi></b> (تقريب لفوق). مثال: لو <bdi>Rk = 7.8</bdi> يبقى <bdi>X = 8</bdi>.",
    "الـ cdf:<span class=\"ltr\">F(x) = Σ (i=0..x) p(1 − p)^i = p(1 − (1 − p)^(x+1))/(1 − (1 − p)) = 1 − (1 − p)^(x+1)</span><br>نستخدم <bdi>F(x − 1) < R ≤ F(x)</bdi>:<span class=\"ltr\">1 − (1 − p)^x < R ≤ 1 − (1 − p)^(x+1)</span><br>يبقى<span class=\"ltr\">(1 − p)^(x+1) ≤ 1 − R < (1 − p)^x</span>وبالتالي<span class=\"ltr\">(x + 1) ln(1 − p) ≤ ln(1 − R) < x ln(1 − p)</span><br>نقسم على <bdi>ln(1 − p) < 0</bdi> (العلامات بتنعكس):<span class=\"ltr\">ln(1 − R)/ln(1 − p) − 1 ≤ x < ln(1 − R)/ln(1 − p)</span><br>يبقى<span class=\"ltr\">X = ⌈ln(1 − R)/ln(1 − p) − 1⌉</span>ولو القيم بتبدأ من <bdi>q</bdi>:<span class=\"ltr\">X = q + ⌈ln(1 − R)/ln(1 − p) − 1⌉</span>",
    "الـ mean هو <bdi>1/p = 2</bdi>، يبقى <bdi>p = 1/2</bdi>؛ و<bdi>q = 1</bdi>؛ و<span class=\"ltr\">X = 1 + ⌈ln(1 − R)/ln(0.5) − 1⌉</span><br>القيمة <bdi>X1</bdi>:<span class=\"ltr\">ln(0.068)/ln(0.5) = 3.878;   1 + ⌈2.878⌉ = 4</span>يعني <b>4</b>.<br>القيمة <bdi>X2</bdi>:<span class=\"ltr\">ln(0.895)/ln(0.5) = 0.160;   1 + ⌈−0.840⌉ = 1 + 0 = 1</span>يعني <b>1</b>.<br>القيمة <bdi>X3</bdi>:<span class=\"ltr\">ln(0.313)/ln(0.5) = 1.676;   1 + ⌈0.676⌉ = 2</span>يعني <b>2</b>.",
    "الخطوة 1: ولّد <bdi>R</bdi>. الخطوة 2: لو <bdi>R ≥ 1/4</bdi> اقبل <bdi>X = R</bdi> وروح للخطوة 3؛ لو <bdi>R < 1/4</bdi> ارفض الـ <bdi>R</bdi> وارجع للخطوة 1. الخطوة 3: لو محتاج variate تاني كرّر من الخطوة 1، غير كده وقّف.<br>ليه صح: القيم اللي اتقبلت هي <bdi>R</bdi> بشرط <bdi>{R ≥ 1/4}</bdi>. لو <bdi>1/4 ≤ a < b ≤ 1</bdi>:<span class=\"ltr\">P(a < R ≤ b | 1/4 ≤ R ≤ 1) = P(a < R ≤ b)/P(1/4 ≤ R ≤ 1) = (b − a)/(3/4)</span>وده الـ uniform distribution على <bdi>[1/4, 1]</bdi>.<br>الـ efficiency بتعتمد على الـ rejections: كل ما الـ rejections تقل، الـ efficiency تزيد.",
    "الـ <bdi>N</bdi> (Poisson بـ mean <bdi>α</bdi>) هو عدد الـ arrivals في وحدة زمن واحدة؛ والـ interarrival times <bdi>A1, A2, …</bdi> هي exponential بـ rate <bdi>α</bdi>. الـ <bdi>N = n</bdi> لو وبس لو<span class=\"ltr\">A1 + … + An ≤ 1 < A1 + … + A(n+1)   (5.7)</span>يعني الـ arrival رقم <bdi>n</bdi> قبل الزمن 1، واللي رقم <bdi>n + 1</bdi> بعده.<br>ومع<span class=\"ltr\">Ai = −(1/α) ln Ri   (5.8)</span>يطلع<span class=\"ltr\">Σ(1..n) −(1/α) ln Ri ≤ 1 < Σ(1..n+1) −(1/α) ln Ri</span><br>نضرب في <bdi>−α</bdi> (العلامات بتنعكس) ونحوّل مجموع الـ logs لـ log حاصل الضرب:<span class=\"ltr\">ln Π(1..n) Ri ≥ −α > ln Π(1..n+1) Ri</span><br>نطبّق <bdi>e^(ln x) = x</bdi>:<span class=\"ltr\">Π(1..n) Ri ≥ e^(−α) > Π(1..n+1) Ri</span>",
    "القيمة <bdi>e^(−0.2) = 0.8187</bdi>. الخطوات: <bdi>n = 0</bdi> و<bdi>P = 1</bdi>؛ <bdi>P = P·R</bdi>؛ لو <bdi>P < e^(−α)</bdi> اقبل <bdi>N = n</bdi>، غير كده <bdi>n = n + 1</bdi> وكرّر.<br>الـ variate الأول:<span class=\"ltr\">P = 0.4357 < 0.8187   ⇒   N = 0</span><br>الـ variate التاني:<span class=\"ltr\">P = 0.4146 < 0.8187   ⇒   N = 0</span><br>الـ variate التالت:<span class=\"ltr\">P = 0.8353 ≥ 0.8187 (reject n = 0);   P = 0.8353 × 0.9952 = 0.8312 ≥ 0.8187 (reject n = 1);   P = 0.8312 × 0.8004 = 0.6654 < 0.8187   ⇒   N = 2</span><br>النتايج 0 و0 و2 باستخدام 5 random numbers. كل variate <bdi>N = n</bdi> بيستخدم <bdi>n + 1</bdi> رقم، والمتوسط<span class=\"ltr\">E(N + 1) = α + 1 = 1.2</span>يعني 1000 variate محتاجين حوالي <b>1200</b> random number.",
    "الـ cdf:<span class=\"ltr\">F(x) = Σ(i=1..x) 2i/(k(k+1)) = (2/(k(k+1))) · x(x+1)/2 = x(x+1)/(k(k+1))</span><br>الشرط <bdi>F(x − 1) < R ≤ F(x)</bdi> بيدّي<span class=\"ltr\">(x − 1)x < k(k+1)R ≤ x(x+1)</span><br>من<span class=\"ltr\">(x − 1)x = k(k+1)R   ⇒   x² − x − k(k+1)R = 0</span>نستخدم الـ quadratic formula بـ<span class=\"ltr\">a = 1,  b = −1,  c = −k(k+1)R</span>والـ root الموجب:<span class=\"ltr\">x = (1 + √(1 + 4(k² + k)R))/2</span><br>نقرّب لفوق:<span class=\"ltr\">X = ⌈(1 + √(1 + 4(k² + k)R))/2 − 1⌉</span>"
   ],
   "quiz": [
    [
     "صح. في خطوات الـ inverse transform، الخطوة 2 بتخلّي <bdi>F(X) = R</bdi> وبتقول إن بما إن <bdi>X</bdi> random variable، يبقى <bdi>F(X)</bdi> برضه random variable متوزّع uniformly على <bdi>(0, 1)</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>؛ وده اللي بيخلّي <bdi>X = F⁻¹(R)</bdi> تشتغل مع أي continuous cdf <bdi>F</bdi>. ومراجعة الـ MCQ بتاعة الدكتور لـ Ch3 برضه إجابتها A.",
     "غلط: الـ <bdi>F(X)</bdi> قيمه في <bdi>[0, 1]</bdi> وهو uniform هناك مش normal؛ وعشان كده <bdi>X = F⁻¹(R)</bdi> بتشتغل مع <bdi>R</bdi> الـ uniform <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>.",
     "غلط: الـ <bdi>F(X)</bdi> هو uniform على <bdi>(0, 1)</bdi>؛ والـ exponential بيتولّد منه بـ <bdi>X = −(1/λ) ln(1 − R)</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>.",
     "غلط: الاختيار A هو الصح، لأن <bdi>F(X)</bdi> uniform على <bdi>(0, 1)</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>."
    ],
    [
     "صح. في خطوات الـ inverse transform، الخطوة 2 بتخلّي <bdi>F(X) = R</bdi> وبتقول إن بما إن <bdi>X</bdi> random variable، يبقى <bdi>F(X)</bdi> برضه random variable متوزّع uniformly على <bdi>(0, 1)</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>؛ وده اللي بيخلّي <bdi>X = F⁻¹(R)</bdi> تشتغل مع أي continuous cdf <bdi>F</bdi>. ومراجعة الـ MCQ بتاعة الدكتور لـ Ch3 برضه إجابتها A.",
     "غلط: الـ <bdi>F(X)</bdi> قيمه في <bdi>[0, 1]</bdi> وهو uniform هناك مش normal؛ وعشان كده <bdi>X = F⁻¹(R)</bdi> بتشتغل مع <bdi>R</bdi> الـ uniform <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>.",
     "غلط: الـ <bdi>F(X)</bdi> هو uniform على <bdi>(0, 1)</bdi>؛ والـ exponential بيتولّد منه بـ <bdi>X = −(1/λ) ln(1 − R)</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>.",
     "غلط: الاختيار A هو الصح، لأن <bdi>F(X)</bdi> uniform على <bdi>(0, 1)</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>."
    ],
    [
     "صح. النوتس بتعرّف <bdi>F⁻¹</bdi> على إنها حل المعادلة <bdi>R = F(X)</bdi> بدلالة <bdi>R</bdi>.",
     "غلط: النوتس بتأكّد إن <bdi>F⁻¹</bdi> هي حل <bdi>R = F(X)</bdi>، مش <bdi>1/f</bdi> <bdi>(L5, 5.1 Inverse transform technique (idea))</bdi>.",
     "غلط: دي الـ inverse function بتاعة <bdi>F</bdi>، مش مقلوبها <bdi>(L5, 5.1 Inverse transform technique (idea))</bdi>.",
     "غلط: تفاضل الـ cdf هو الـ pdf؛ لكن <bdi>F⁻¹</bdi> بتيجي من حل <bdi>R = F(X)</bdi> <bdi>(L5, 5.1 Inverse transform technique (idea))</bdi>."
    ],
    [
     "غلط: لازم نقسم على <bdi>λ</bdi>، يعني <bdi>X = −(1/λ) ln(1 − R)</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>.",
     "صح. لما نحل <bdi>1 − e^(−λX) = R</bdi> يطلع <bdi>X = −(1/λ) ln(1 − R)</bdi>.",
     "غلط: ده شكل الـ cdf، مش الـ inverse بتاعه <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>.",
     "غلط: الـ <bdi>ln(1 − R)</bdi> سالب، فمحتاجين علامة سالب عشان <bdi>X ≥ 0</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>."
    ],
    [
     "صح. دي الملحوظة اللي تحت المعادلة (5.2).",
     "غلط: النوتس كاتبة السبب ده صراحة لـ (5.2) <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">X = 3 + 5 × 0.36 = 3 + 1.8 = 4.8</span>",
     "غلط: الـ 1.8 دي بس <bdi>(b − a)R</bdi>؛ لازم نزوّد <bdi>a = 3</bdi> <bdi>(L5, 5.1.2 Uniform distribution on [a, b])</bdi>.",
     "غلط: دي <bdi>8 × 0.36</bdi>؛ المعادلة بتستخدم <bdi>(b − a) = 5</bdi> وبتزوّد <bdi>a</bdi> <bdi>(L5, 5.1.2 Uniform distribution on [a, b])</bdi>.",
     "غلط: دي <bdi>8 − 1.8</bdi>؛ المعادلة هي <bdi>a + (b − a)R</bdi> <bdi>(L5, 5.1.2 Uniform distribution on [a, b])</bdi>."
    ],
    [
     "غلط: الـ <bdi>√(2R)</bdi> بتتستخدم بس لـ <bdi>0 ≤ R ≤ 1/2</bdi> (L5, 5.1.3 Triangular distribution).",
     "صح. الـ <bdi>R > 1/2</bdi>، يبقى<span class=\"ltr\">X = 2 − √0.36 = 2 − 0.6 = 1.4</span>",
     "غلط: الـ <bdi>X = R</bdi> بس في حالة الـ uniform على <bdi>(0, 1)</bdi> (L5, 5.1.3 Triangular distribution).",
     "غلط: المعادلة هي <bdi>2 − √(2(1 − R))</bdi> (L5, 5.1.3 Triangular distribution)."
    ],
    [
     "غلط: الـ <bdi>√(2R)</bdi> هي الحتّة بتاعة <bdi>0 ≤ R ≤ 1/2</bdi>، لأن <bdi>0 ≤ X ≤ 1</bdi> معناها <bdi>0 ≤ R ≤ 1/2</bdi> (L5, 5.1.3 Triangular distribution).",
     "صح. لما <bdi>1/2 < R ≤ 1</bdi> الـ generator هو <bdi>X = 2 − √(2(1 − R))</bdi>."
    ],
    [
     "غلط: ممكن كمان نولّدها numerically بالـ table lookup (L5, 5.1.4 Discrete distributions).",
     "صح. النوتس ذاكرة الطريقتين.",
     "غلط: الـ inverse transform بيشتغل مع الـ discrete distributions برضه (L5, 5.1.4 Discrete distributions).",
     "غلط: القراية بالرسم مجرد توضيح؛ والطرق المذكورة هي الـ table lookup والمعادلة (L5, 5.1.4 Discrete distributions)."
    ],
    [
     "غلط: الـ <bdi>X = 0</bdi> محتاجة <bdi>R ≤ 0.5</bdi> <bdi>(L5, Example 5.2: empirical discrete distribution (shipments))</bdi>.",
     "صح. القاعدة إن <bdi>0.5 < R ≤ 0.8</bdi> بتدّي <bdi>X = 1</bdi>، و<bdi>0.80 ≤ 0.8</bdi>.",
     "غلط: الـ <bdi>X = 2</bdi> محتاجة <bdi>0.8 < R ≤ 1.0</bdi>؛ و<bdi>R = 0.80</bdi> مش أكبر من 0.8 <bdi>(L5, Example 5.2: empirical discrete distribution (shipments))</bdi>.",
     "غلط: الـ <bdi>X</bdi> بياخد القيم 0 و1 و2 بس <bdi>(L5, Example 5.2: empirical discrete distribution (shipments))</bdi>."
    ],
    [
     "صح. ده مكتوب في مثال 5.2 (jumps قدّها 0.5 و0.3 و0.2 عند 0 و1 و2).",
     "غلط: النوتس قايلة كده بالظبط <bdi>(L5, Example 5.2: empirical discrete distribution (shipments))</bdi>."
    ],
    [
     "غلط: الـ <bdi>Rk = 2.52</bdi> لازم تتقرّب لفوق مش لتحت <bdi>(L5, Example 5.3: discrete uniform distribution on {1, 2, …, k})</bdi>.",
     "صح. الحساب:<span class=\"ltr\">X = ⌈Rk⌉ = ⌈0.42 × 6⌉ = ⌈2.52⌉ = 3</span>",
     "غلط: الـ <bdi>X</bdi> لازم يبقى integer، و<bdi>X = ⌈Rk⌉</bdi> <bdi>(L5, Example 5.3: discrete uniform distribution on {1, 2, …, k})</bdi>.",
     "غلط: الـ <bdi>⌈2.52⌉ = 3</bdi> <bdi>(L5, Example 5.3: discrete uniform distribution on {1, 2, …, k})</bdi>."
    ],
    [
     "صح. لما نجمع الـ geometric series <bdi>p[1 + (1 − p) + … + (1 − p)^x]</bdi> يطلع ده.",
     "غلط: ده <bdi>F(x − 1)</bdi>؛ المجموع من 0 لـ <bdi>x</bdi> فيه <bdi>x + 1</bdi> حد (L5, Example 5.5: geometric distribution).",
     "غلط: ده الـ pmf (L5, Example 5.5: geometric distribution).",
     "غلط: ده شبه الـ exponential cdf (L5, Example 5.5: geometric distribution)."
    ],
    [
     "غلط: الـ mean هو <bdi>1/p = 2</bdi> يعني <bdi>p = 1/2</bdi>؛ والمدى بيبدأ من 1 يعني <bdi>q = 1</bdi> (L5, Example 5.6: three geometric variates with mean 2).",
     "صح. الـ mean <bdi>1/p = 2</bdi> بيدّي <bdi>p = 1/2</bdi>؛ و<bdi>X ≥ 1</bdi> بتدّي <bdi>q = 1</bdi>.",
     "غلط: المدى هو <bdi>{X ≥ 1}</bdi>، يبقى <bdi>q = 1</bdi> (L5, Example 5.6: three geometric variates with mean 2).",
     "غلط: الـ <bdi>1/p = 2</bdi> معناها <bdi>p = 1/2</bdi> (L5, Example 5.6: three geometric variates with mean 2)."
    ],
    [
     "غلط: الـ <bdi>R < 1/4</bdi> بيترفض <bdi>(L5, 5.2 Acceptance-rejection technique)</bdi>.",
     "صح. الخطوة 2ب: لو <bdi>R < 1/4</bdi> ارفض الـ <bdi>R</bdi> وارجع للخطوة 1.",
     "غلط: القيم اللي بتتقبل بنستخدمها كـ <bdi>X = R</bdi> من غير أي إزاحة <bdi>(L5, 5.2 Acceptance-rejection technique)</bdi>.",
     "غلط: القيم اللي أقل من <bdi>1/4</bdi> مش بتتقرّب لفوق؛ دي بتترفض <bdi>(L5, 5.2 Acceptance-rejection technique)</bdi>."
    ],
    [
     "غلط: النوتس بتقول إن أقل rejections بتدّي أعلى efficiency <bdi>(L5, 5.2 Acceptance-rejection technique)</bdi>.",
     "صح. كل ما الـ rejections تقل، الـ efficiency تزيد."
    ],
    [
     "صح. الخطوة 3: لو <bdi>P < e^(−α)</bdi> اقبل <bdi>N = n</bdi>.",
     "غلط: ساعتها الـ <bdi>n</bdi> بيترفض، ومحتاجين trial واحدة زيادة على الأقل (L5, Procedure for generating a Poisson variate N).",
     "غلط: الـ <bdi>P</bdi> بيتقارن بـ <bdi>e^(−α)</bdi> مش بـ <bdi>α</bdi> (L5, Procedure for generating a Poisson variate N).",
     "غلط: اللي بيتقارن بـ <bdi>e^(−α)</bdi> هو حاصل الضرب <bdi>P</bdi> اللي بيتراكم، مش <bdi>R</bdi> واحد لوحده (L5, Procedure for generating a Poisson variate N)."
    ]
   ],
   "extra": [
    [
     "صح. الحساب:<span class=\"ltr\">X = −2 ln(0.25) = 2 × 1.3863 = 2.773</span>",
     "غلط: دي <bdi>−2 ln(0.75)</bdi>، يعني استخدمت <bdi>ln R</bdi> بدل <bdi>ln(1 − R)</bdi> في (5.1) <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>.",
     "غلط: دي <bdi>−0.5 ln(0.25)</bdi>؛ المعامل هو <bdi>1/λ = 2</bdi> مش <bdi>λ</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>.",
     "غلط: دي <bdi>−ln(0.25)</bdi> من غير المعامل <bdi>1/λ = 2</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">−0.5 ln 0.6 = 0.255,    −0.5 ln 0.4 = 0.458</span>قيم مختلفة بس نفس الـ distribution.",
     "غلط: نفس الـ <bdi>R</bdi> بيدّي قيم مختلفة؛ اللي بيبقى زي بعضه هو الـ distribution بس <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>.",
     "غلط: دول متبدّلين؛ الـ <bdi>ln(1 − R) = ln 0.6</bdi> بيتستخدم في (5.1) <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>.",
     "غلط: دول مضروبين في <bdi>λ = 2</bdi> بدل <bdi>1/λ</bdi> <bdi>(L5, Procedure for the inverse transform (exponential))</bdi>."
    ],
    [
     "صح. الـ <bdi>R ≤ 1/2</bdi>، يبقى<span class=\"ltr\">X = √(2 × 0.32) = √0.64 = 0.8</span>",
     "غلط: دي <bdi>√0.32</bdi>؛ المعادلة هي <bdi>√(2R)</bdi> (L5, 5.1.3 Triangular distribution).",
     "غلط: دي <bdi>2 − √(2 × 0.68)</bdi>، وهي الحتّة بتاعة <bdi>R > 1/2</bdi> (L5, 5.1.3 Triangular distribution).",
     "غلط: الـ <bdi>0.64 = 2R</bdi>؛ والـ <bdi>X</bdi> هو الجذر التربيعي بتاعها (L5, 5.1.3 Triangular distribution)."
    ],
    [
     "صح. الخطوات:<span class=\"ltr\">0.12 ≤ 0.5 → 0;   0.91 > 0.8 → 2;   0.50 ≤ 0.5 → 0;   0.5 < 0.66 ≤ 0.8 → 1</span>",
     "غلط: الـ <bdi>R = 0.50</bdi> بيحقّق <bdi>R ≤ 0.5</bdi>، يبقى <bdi>X = 0</bdi> <bdi>(L5, Example 5.2: empirical discrete distribution (shipments))</bdi>.",
     "غلط: الـ <bdi>0.12 ≤ 0.5</bdi> بتدّي <bdi>X = 0</bdi> <bdi>(L5, Example 5.2: empirical discrete distribution (shipments))</bdi>.",
     "غلط: الـ <bdi>0.91 > 0.8</bdi> بتدّي <bdi>X = 2</bdi> <bdi>(L5, Example 5.2: empirical discrete distribution (shipments))</bdi>."
    ],
    [
     "غلط: الـ root الموجب هو <bdi>x = 9.475</bdi>، يعني <bdi>x − 1 = 8.475</bdi>، ودي لازم تتقرّب لفوق مش لتحت <bdi>(L5, Example 5.4: pmf p(x) = 2x / (k(k + 1)))</bdi>.",
     "صح. الحساب:<span class=\"ltr\">(1 + √(1 + 440 × 0.73))/2 − 1 = (1 + √322.2)/2 − 1 = 8.475</span>ولما نقرّبها لفوق تبقى 9. للتأكد:<span class=\"ltr\">F(8) = 72/110 = 0.655 < 0.73 ≤ F(9) = 90/110 = 0.818</span>",
     "غلط: الـ <bdi>F(9) = 0.818 ≥ 0.73</bdi> أصلًا، يبقى <bdi>X = 9</bdi> <bdi>(L5, Example 5.4: pmf p(x) = 2x / (k(k + 1)))</bdi>.",
     "غلط: الـ <bdi>F(7) = 56/110 = 0.509 < 0.73</bdi> <bdi>(L5, Example 5.4: pmf p(x) = 2x / (k(k + 1)))</bdi>."
    ],
    [
     "غلط: الحساب<span class=\"ltr\">ln 0.4/ln 0.75 = 3.185;   1 + ⌈2.185⌉ = 4</span>وده في (L5, Example 5.5: geometric distribution).",
     "صح. الحساب:<span class=\"ltr\">ln 0.4/ln 0.75 = 3.185,   ⌈2.185⌉ = 3,   X = 1 + 3 = 4</span>",
     "غلط: الـ <bdi>⌈2.185⌉ = 3</bdi> مش 4 (L5, Example 5.5: geometric distribution).",
     "غلط: مع <bdi>q = 1</bdi> الـ cdf هو <bdi>F(x) = 1 − 0.75^x</bdi>، و<bdi>F(2) = 0.4375 < 0.6</bdi>، يبقى <bdi>X = 2</bdi> صغيرة؛ والـ <bdi>X = 4</bdi> هي اللي بتحقّق<span class=\"ltr\">F(3) = 0.578 < 0.6 ≤ F(4) = 0.684</span>وده في (L5, Example 5.5: geometric distribution)."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">ln 0.895/ln 0.5 = 0.160</span>ولما نطرح 1 تبقى <bdi>−0.840</bdi>، و<bdi>⌈−0.840⌉ = 0</bdi>.",
     "غلط: المعادلة بتستخدم <bdi>ln(1 − R) = ln(0.895)</bdi> مش <bdi>ln R</bdi>؛ وكمان <bdi>ln(0.105)/ln(0.5) − 1 = 2.25</bdi> كانت هتدّي <bdi>1 + ⌈2.25⌉ = 4</bdi> مش 1 (L5, Example 5.6: three geometric variates with mean 2).",
     "غلط: دي معادلة الـ discrete uniform <bdi>⌈Rk⌉</bdi> <bdi>(L5, Example 5.3: discrete uniform distribution on {1, 2, …, k})</bdi>.",
     "غلط: أقل قيمة هي <bdi>q = 1</bdi>؛ و<bdi>X = q + ⌈…⌉</bdi> (L5, Example 5.5: geometric distribution)."
    ],
    [
     "غلط: الـ <bdi>P = 0.9 ≥ 0.3679</bdi>، يبقى <bdi>n = 0</bdi> بيترفض (L5, Procedure for generating a Poisson variate N).",
     "غلط: الـ <bdi>P = 0.9 × 0.6 = 0.54 ≥ 0.3679</bdi>، يبقى <bdi>n = 1</bdi> بيترفض (L5, Procedure for generating a Poisson variate N).",
     "صح. الـ <bdi>P</bdi> بيبقى 0.9، وبعدين 0.54، وبعدين <bdi>0.27 < 0.3679</bdi>، فنقبل <bdi>N = 2</bdi>.",
     "غلط: الـ <bdi>P = 0.27 < e^(−1)</bdi> من عند <bdi>n = 2</bdi> أصلًا (L5, Procedure for generating a Poisson variate N)."
    ],
    [
     "غلط: دي <bdi>500α</bdi>؛ كل variate <bdi>N = n</bdi> بيستخدم <bdi>n + 1</bdi> رقم، يبقى المتوسط <bdi>α + 1</bdi> (L5, Procedure for generating a Poisson variate N).",
     "غلط: الـ rejections معناها إن المتوسط أكتر من رقم واحد لكل variate (L5, Procedure for generating a Poisson variate N).",
     "صح. الحساب:<span class=\"ltr\">500(α + 1) = 500 × 1.6 = 800</span>",
     "غلط: المعامل هو <bdi>α + 1 = 1.6</bdi> مش 2.2 (L5, Procedure for generating a Poisson variate N)."
    ],
    [
     "غلط: الـ <bdi>1/4</bdi> دي احتمال الـ rejection <bdi>(R < 1/4)</bdi> <bdi>(L5, 5.2 Acceptance-rejection technique)</bdi>.",
     "صح. القبول محتاج <bdi>R ≥ 1/4</bdi>، و<bdi>P(1/4 ≤ R ≤ 1) = 3/4</bdi>، وده المقام في إثبات صحة الطريقة.",
     "غلط: القيم <bdi>R < 1/4</bdi> بتترفض <bdi>(L5, 5.2 Acceptance-rejection technique)</bdi>.",
     "غلط: الحساب الصح <bdi>P(R ≥ 1/4) = 1 − 1/4 = 3/4</bdi> <bdi>(L5, 5.2 Acceptance-rejection technique)</bdi>."
    ]
   ]
  },
  "6": {
   "notes": [
    {
     "h": "الهدف ونظرة عامة (سلايد 1 لـ 3)",
     "pts": [
      "الـ title slide بتاع الـ deck مكتوب عليها <b><bdi>Chapter 5: Input Modeling</bdi></b>، بينما الـ footer بتاع كل slide مكتوب فيه <b><bdi>Ch. 6 Input Modeling</bdi></b>؛ وفي الـ lecture notes هو <b><bdi>Chapter 6</bdi></b> (سلايد 1). الرسمة (سلايد 1): صورة network للزينة (فيها routers ولابتوب wireless وكمبيوتر desktop) ومعاها plot صغير لاتنين noisy signals.",
      "المحتويات (سلايد 2):<br>(1) جمع الـ data <bdi>(Data Collection)</bdi><br>(2) تحديد الـ distribution من الـ data <bdi>(Identifying the Distribution with Data)</bdi><br>(3) تقدير الـ parameters <bdi>(Parameter Estimation)</bdi><br>(4) اختبارات الـ goodness of fit <bdi>(Goodness-of-Fit Tests)</bdi><br>(5) عمل fit لـ nonstationary Poisson process <bdi>(Fitting a Nonstationary Poisson Process)</bdi><br>(6) اختيار الـ input models من غير data <bdi>(Selecting Input Models without Data)</bdi><br>(7) الـ input data اللي multivariate واللي time series <bdi>(Multivariate and Time-Series Input Data)</bdi>",
      "ملحوظة: الجزء <bdi>\"Fitting a Nonstationary Poisson Process\"</bdi> مكتوب في سلايد 2 بس ملوش أي slides ولا section في الـ lecture notes، فمش هنتكلم عنه أكتر من كده هنا.",
      "<b>الـ input models هي القوة اللي بتحرّك (driving force) الـ simulation model</b> (سلايد 3).",
      "جودة الـ output <b>عمرها ما هتبقى أحسن</b> من جودة الـ inputs (سلايد 3).",
      "الـ <b>4 خطوات بتوع بناء الـ input model</b> (سلايد 3):<br>(1) نجمع data من الـ system الحقيقي<br>(2) نحدد probability distribution تمثّل الـ input process<br>(3) نختار الـ parameters بتاعة الـ distribution دي<br>(4) نقيّم الـ distribution والـ parameters اللي اخترناها من ناحية الـ goodness of fit",
      "أمثلة على الـ input data: في الـ queueing system، الـ distributions بتاعة <b>الوقت بين الـ arrivals</b> و<b>الـ service times</b>؛ وفي الـ inventory system، الـ distributions بتاعة <b>الـ demand</b> و<b>الـ lead time</b>. ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "جمع الـ data (سلايد 4 لـ 6)",
     "pts": [
      "جمع الـ data ده <b>من أكبر المهام</b> في حل أي مشكلة حقيقية (سلايد 5).",
      "الـ <b>GIGO</b> يعني <b><bdi>Garbage-In-Garbage-Out</bdi></b>: لو الـ input data وحشة الـ output هيطلع وحش، مهما كان الـ model كويس (سلايد 5).",
      "الرسمة في سلايد 5 فيها flow ماشي من الشمال لليمين:<span class=\"ltr\"><b>Raw Data</b> (cloud) → <b>Input Data</b> (document) → <b>System Performance Simulation</b> (process box) → <b>Output</b> (cylinder)</span>",
      "حتى لو الـ model structure نفسه valid، نتايج الـ simulation ممكن تبقى مضللة لو الـ input data:<br>• اتجمعت بشكل مش دقيق<br>• اتحللت بطريقة مش مناسبة<br>• مش ممثلة للبيئة الحقيقية (سلايد 5)",
      "جمع الـ data محتاج وقت وموارد كتير. ولو الـ data مش موجودة، لازم نعتمد على رأي الخبراء (expert opinion) ومعرفتنا بالـ process عشان نعمل تخمينات مدروسة (educated guesses). ‡ (من الـ lecture notes)",
      "اقتراحات ممكن تحسّن وتسهّل جمع الـ data (سلايد 6):<br>(1) <b>خطط بدري (Plan ahead)</b>: ابدأ بـ session تجريبية أو ملاحظة مبدئية، وخلي بالك من الظروف الغريبة<br>(2) <b>حلل الـ data وانت بتجمعها</b>: اتأكد إنها كافية (adequacy)<br>(3) <b>ادمج الـ data sets المتجانسة (homogeneous)</b>: فترات زمنية ورا بعض، أو نفس الفترة في أيام ورا بعض<br>(4) <b>خلي بالك من الـ data censoring</b>: يعني الكمية مش بتتشاف كلها، والخطر إنك تسيب الـ process times الطويلة<br>(5) <b>اتأكد لو فيه علاقة بين الـ variables</b> (باستخدام الـ scatter diagram)<br>(6) <b>اتأكد لو فيه autocorrelation</b><br>(7) <b>اجمع input data مش performance data</b>",
      "التخطيط بتفصيل أكتر: جهّز الـ data‑collection forms قبل ما تبدأ تلاحظ (وغالبًا بتتعدل كذا مرة)؛ قرر هتتعامل إزاي مع الظروف الغريبة؛ ولو الـ data موجودة أصلًا، سيب وقت كفاية عشان تحولها لشكل ينفع يتستخدم. ‡ (من الـ lecture notes)",
      "دمج الـ data sets المتجانسة: أول test مبدئي إنك تشوف هل الـ <b>means</b> بتاعة الـ distributions زي بعض. ‡ (من الـ lecture notes)",
      "الـ <b>autocorrelation</b>: لو الـ service time بتاع الـ customer رقم <bdi>i</bdi> بيأثر على الـ customer رقم <bdi>(i + n)</bdi>، يبقى فيه autocorrelation. ‡ (من الـ lecture notes)",
      "الفرق بين <b>الـ input data والـ performance data</b>: الـ input data بتمثل كميات مش مؤكدة (uncertain) أغلبها خارج سيطرة الـ system، ومش هتتغير بالتعديلات اللي بنعملها عشان نحسّن الـ system (زي الـ arrival times)، عكس الـ performance data (اللي هي الـ outputs زي الـ delays). ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-in-gigo": "من الـ raw data للـ output، والـ GIGO"
     }
    },
    {
     "h": "الـ Histograms (سلايد 7 لـ 9)",
     "pts": [
      "الـ <b>frequency distribution أو الـ histogram</b> مفيد إننا نعرف بيه <b>شكل (shape)</b> الـ distribution (سلايد 8).",
      "عدد الـ class intervals بيعتمد على:<br>• عدد الـ observations<br>• مدى انتشار (dispersion) الـ data<br>• العدد المقترح للـ intervals هو <b>الجذر التربيعي لحجم الـ sample</b> (سلايد 8)",
      "في الـ <b>continuous data</b>، الـ histogram بيقابل الـ <b>probability density function (PDF)</b> بتاعة distribution نظرية (سلايد 8).",
      "في الـ <b>discrete data</b>، الـ histogram بيقابل الـ <b>probability mass function (PMF)</b> (سلايد 8).",
      "لو الـ data points قليلة، <b>ادمج الـ cells اللي جنب بعض</b> عشان تشيل الشكل المسنن (ragged) بتاع الـ histogram (سلايد 8).",
      "الرسمة (سلايد 9، نفس الـ data بأحجام intervals مختلفة): تلات histograms لنفس الـ 100 قيمة من 0 لـ 20. الـ intervals الضيقة اللي عرضها 2 بتدي 11 bar مش منتظمين (تقريبًا<span class=\"ltr\">5, 10, 11, 6, 8, 9, 7, 10, 8, 12, 14</span>وشكلهم ragged)؛ والـ intervals اللي عرضها 4 بتدي 5 bars (تقريبًا<span class=\"ltr\">26, 14, 16, 18, 26</span>كده)؛ والـ intervals اللي عرضها حوالي 7 (والـ labels<span class=\"ltr\">7, 14, 20</span>يعني) بتدي 3 bars بس (تقريبًا<span class=\"ltr\">36, 30, 34</span>وشكلهم قريب من المسطّح). يعني الشكل اللي بتشوفه بيعتمد على عرض الـ interval.",
      "طريقة الرسم:<br>(1) قسّم الـ range بتاع الـ data لـ intervals عرضها متساوي (ممكن نستخدم عروض مش متساوية)<br>(2) اكتب labels على المحور الأفقي حسب الـ intervals اللي اخترتها<br>(3) احسب الـ frequency (عدد مرات الظهور) جوه كل interval<br>(4) اكتب labels على المحور الرأسي بحيث تقدر ترسم إجمالي الظهور لكل interval<br>(5) ارسم الـ frequencies على المحور الرأسي ‡ (من الـ lecture notes)",
      "لو الـ intervals <b>واسعة أوي</b>، الـ histogram بيطلع <b>خشن أو مكعبات (coarse أو blocky)</b>؛ ولو <b>ضيقة أوي</b>، بيطلع <b>مسنن (ragged)</b>. ‡ (من الـ lecture notes)",
      "الرسمة (Fig 6.1 في الـ notes) بتوري histograms من الأنواع ragged و coarse و appropriate:<br>(a) الـ data الأصلية في cells عرضها 1 من 0 لـ 24، وده ragged زيادة عن اللزوم<br>(b) الـ cells اتدمجت لـ<span class=\"ltr\">0-7, 8-15, 16-23</span>وده coarse زيادة عن اللزوم<br>(c) الـ cells اتدمجت لـ<span class=\"ltr\">0-2, 3-5, 6-8, 9-11, 12-14, 15-17, 18-20, 21-24</span>وده المناسب، شكل ناعم وليه قمة واحدة. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-in-hist-widths": "نفس الـ 100 قيمة بتلات عروض مختلفة للـ interval",
      "ms-in-hist-cells": "الـ histogram لما يبقى ragged أو coarse أو appropriate"
     }
    },
    {
     "h": "أمثلة على الـ histogram (سلايد 10 لـ 12)",
     "pts": [
      "<b>مثال وصول العربيات (vehicle arrival)</b> (سلايد 10): اتراقب عدد العربيات اللي بتوصل لتقاطع من <bdi>7 am</bdi> لـ <bdi>7:05 am</bdi> لمدة <b>100 يوم شغل عشوائي</b> (الـ notes بتقول خمس أيام شغل على مدار 20 أسبوع، وده برضه 100 فترة).",
      "الـ data كتير، فالـ histogram ممكن يبقى فيه <b>cell لكل قيمة ممكنة</b> في الـ range بتاع الـ data (سلايد 10). والـ variable هنا discrete.",
      "الرسمة في سلايد 10 عبارة عن histogram فيه bar لكل قيمة من 0 لـ 11، وارتفاعاتهم هي الـ frequencies اللي في الجدول؛ بيبدأ من 12 و 10 ويطلع لقمة 19 عند القيمة 2، وبعدين ينزل بالتدريج لحد 1 عند القيمة 11 (يعني right‑skewed).",
      "<b>مثال عمر الـ electronic components</b> (سلايد 11): اتعملت life tests على electronic components على <b>1.5 مرة من الـ nominal voltage</b>، واتسجل عمرهم. العمر (lifetime) ده continuous variable، ومتجمّع في intervals عرضها 3 أيام.",
      "الرسمة في سلايد 11 (عمر الـ chip بالأيام) عبارة عن histogram أول bar فيه طويل (23) للفترة من 0 لـ 3، وبعده 10 وبعده 5، وبعدين bars ارتفاعها 1 أو 2 متفرقة لحد 147 يوم: يعني ذيل طويل ناحية اليمين، وده شكل الـ exponential density.",
      "الـ notes بتدي الجدول كامل:<span class=\"ltr\">0-3: 23, 3-6: 10, 6-9: 5, 9-12: 1, 12-15: 1, 15-18: 2, 18-21: 0, 21-24: 1, 24-27: 1, 27-30: 0, 30-33: 1, 33-36: 1, 42-45: 1, 57-60: 1, 78-81: 1, 144-147: 1</span>والمجموع 50 chip، أعمارهم من 0.002 لـ 144.695 يوم. ‡ (من الـ lecture notes)",
      "‡ لو عدّينا الـ 50 lifetime اللي في الـ notes هنلاقي 24 في <bdi>[0, 3)</bdi> و 9 في <bdi>[3, 6)</bdi> وواحدة في <bdi>[15, 18)</bdi> وواحدة في <bdi>[18, 21)</bdi> (اللي هما 17.967 و 18.387)، مش 23 و 10 و 2 و 0 زي ما في الجدول. بس الشكل العام (شبه الـ exponential) هو هو.",
      "الرسمة في سلايد 12 (الـ histograms بتاعة normData) بتوري نفس الـ data اللي normally distributed (متمركزة عند 0، والـ range تقريبًا من 4- لـ 4) مرسومة بـ <b>5 و 10 و 20 و 50 و 100 و 200 bin</b>. بـ 5 bins الشكل بيطلع سلالم مكعبة؛ ومن 10 لـ 50 bin شكل الجرس (bell) بيبان واضح؛ وبـ 100 و 200 bin الـ bars بتبقى رفيعة ومسننة. يعني عدد الـ bins بيغير شكل الـ distribution اللي بنشوفه."
     ],
     "figH": {
      "ms-in-vehicle-hist": "وصول العربيات بـ cell لكل قيمة",
      "ms-in-chip-hist": "أعمار الـ chips في intervals كل واحدة 3 أيام",
      "ms-in-hist-bins": "عينة normal واحدة بعدد bins من 5 لـ 200"
     }
    },
    {
     "h": "جدول عمر الـ components (سلايد 11)",
     "pts": [
      "الجدول بالظبط زي ما هو في سلايد 11 (والنقط معناها صفوف مش ظاهرة على الـ slide)."
     ]
    },
    {
     "h": "الـ Scatter diagrams (سلايد 13 لـ 15)",
     "pts": [
      "الـ <b>scatter diagram</b> ده quality tool بيوضح <b>العلاقة بين data متزوّجة (paired)</b> (سلايد 14):<br>• الـ random variable اللي هو X يمثّل <bdi>Data 1</bdi><br>• الـ random variable اللي هو Y يمثّل <bdi>Data 2</bdi><br>• نرسم X على الـ x‑axis و Y على الـ y‑axis",
      "الرسمة (سلايد 14): تلات scatter plots. <b>Strong correlation</b>: النقط قريبة جدًا من خط مستقيم طالع من <bdi>(0, 0)</bdi> لحد حوالي <bdi>(30, 31)</bdi>. <b>Moderate correlation</b>: النقط طالعة من حوالي 10 لـ 45 بس منتشرة كتير حوالين الـ trend. <b>No correlation</b>: النقط متبعترة في كل حتة من 0 لـ 30 من غير أي pattern.",
      "في حالة الـ <b>linear relationship</b> (سلايد 15):<br>• الـ <b>Correlation</b>: بيقيس الـ data متصفّة على خط قد إيه<br>• الـ <b>Slope</b>: بيقيس انحدار (steepness) الـ data<br>• الـ <b>Direction</b> (الاتجاه)<br>• الـ <b>Y intercept</b>",
      "الرسمة في سلايد 15: الـ <b>Positive correlation</b>: النقط بتطلع من حوالي 4 عند <bdi>x = 0</bdi> لحد حوالي 31 عند <bdi>x = 30</bdi>. <b>Negative correlation</b>: النقط بتنزل من حوالي 35 عند <bdi>x = 0</bdi> لحد حوالي 4 عند <bdi>x = 30</bdi>."
     ],
     "figH": {
      "ms-in-scatter-corr": "الـ correlation القوي والمتوسط والمعدوم",
      "ms-in-scatter-dir": "الـ correlation الموجب والسالب مع الـ slope والـ Y intercept"
     }
    },
    {
     "h": "اختيار الـ family بتاعة الـ distributions (سلايد 16 لـ 18)",
     "pts": [
      "الـ family بتاعة الـ distributions بنختارها على أساس (سلايد 17):<br>• الـ <b>context</b> بتاع الـ input variable<br>• <b>شكل الـ histogram</b>",
      "الـ distributions اللي بتقابلنا كتير (سلايد 17):<br>• <b>أسهل في التحليل</b>: الـ Exponential و الـ Normal و الـ Poisson<br>• <b>أصعب في التحليل</b>: الـ Beta و الـ Gamma و الـ Weibull",
      "الرسمة في سلايد 17 فيها exponential density بتبدأ بارتفاع λ عند <bdi>x = 0</bdi> وبتقل؛ و normal density على شكل جرس متمركزة عند μ؛ واتنين plots فيهم families من الـ curves للـ distributions الأصعب، واحد الـ curves فيه عليها<span class=\"ltr\">β = 1, 2, 3</span>والتاني عليها<span class=\"ltr\">β = 1/2, 1, 2, 4</span>وده بيوضح إزاي الـ shape parameter β بيغير شكل الـ curve (من curve بيقل لـ curve ليه قمة).",
      "الـ gamma والـ Weibull بيدّوا <b>أشكال كتير جدًا (wide array of shapes)</b>، وعشان كده تحليلهم أصعب. ‡ (من الـ lecture notes)",
      "استخدم <b>الأساس الفيزيائي (physical basis)</b> بتاع الـ distribution كدليل (سلايد 18): بص على الجدول.",
      "ملاحظات تانية: الـ <b>Gamma</b> بيمثّل random variables مش سالبة، وممكن نزحزحه بعيد عن الـ 0 بإننا نضيف constant؛ والـ <b>exponential حالة خاصة (special case) من الـ Weibull</b>؛ والـ uniform بيتستخدم كتير لما <b>مايبقاش فيه data</b>؛ والـ <b>empirical</b> distribution بيتستخدم لما مفيش distribution نظرية مناسبة. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-in-families": "عائلات التوزيعات السهلة والصعبة في التحليل"
     }
    },
    {
     "h": "الـ Quantile‑quantile (Q‑Q) plots (من الـ lecture notes؛ والـ K‑S test في سلايد 31 بيحوّل الفكرة دي لـ test رسمي)",
     "pts": [
      "الـ <b>Q‑Q plot</b> أداة مفيدة عشان <b>نقيّم الـ fit بتاع الـ distribution</b>؛ أما الـ histogram فمش مفضّل إننا نقيّم بيه الـ fit بتاع distribution اخترناها. ‡ (من الـ lecture notes)",
      "لو X ليه CDF اسمها F، يبقى الـ <b>q‑quantile</b> بتاع X هو القيمة γ اللي بتحقق:<span class=\"ltr\">F(γ) = P(X ≤ γ) = q,  0 &lt; q &lt; 1,  i.e. γ = F⁻¹(q)</span>‡ (من الـ lecture notes)",
      "رتّب الـ sample كده:<span class=\"ltr\">y₁ ≤ y₂ ≤ … ≤ yₙ</span>والـ j هنا هو الترتيب (rank)، يعني 1 لأصغر قيمة و n لأكبر قيمة. القيمة yⱼ بتعتبر تقدير للـ <b>quantile رقم <bdi>(j − 1/2)/n</bdi></b> بتاع X، يعني:<span class=\"ltr\">yⱼ ≈ F⁻¹[(j − 1/2)/n]</span>وبعدين نرسم yⱼ قصاد <bdi>F⁻¹[(j − 1/2)/n]</bdi>. ‡ (من الـ lecture notes)",
      "إزاي نقرا الـ plot:<br>• لو F من family مناسبة، الـ plot هيطلع تقريبًا <b>خط مستقيم</b><br>• ولو كمان الـ parameters بتاعة F مناسبة، الخط هيبقى <b>slope بتاعه 1</b><br>• ولو الـ distribution اللي فرضناها مش مناسبة، النقط <b>هتبعد عن الخط المستقيم</b> ‡ (من الـ lecture notes)",
      "وإحنا بنحكم على الـ linearity:<br>(1) النقط عمرها ما هتقع بالظبط على خط مستقيم<br>(2) القيم المرتبة مش independent (لأنها متقسّمة بالترتيب)، فالنقط بتتبعتر حوالين الخط<br>(3) الـ variances عند الأطراف (extremes) أعلى من النص، فمقبول يبقى فيه اختلافات أكبر عند الأطراف؛ <b>الـ linearity في النص أهم</b> ‡ (من الـ lecture notes)",
      "<b>مثال 6.3 (normal Q‑Q plot)</b>: فيه robot بيركّب أبواب العربيات؛ وعندنا 20 installation time بالثواني:<span class=\"ltr\">99.79, 99.56, 100.17, 100.33, 100.26, 100.41, 99.98, 99.83, 100.23, 100.27, 100.02, 100.47, 99.55, 99.62, 99.65, 99.82, 99.96, 99.90, 100.06, 99.85</span>الـ sample mean طلع 99.99 ثانية، والـ sample variance طلع <bdi>(0.2832)² s²</bdi>. القيم بعد الترتيب ماشية كده:<span class=\"ltr\">99.55, 99.56, 99.62, … , 100.41, 100.47</span>وبنرسمها قصاد الـ normal quantiles؛ والـ plot (Fig 6.4) طالع قريب من خط مستقيم، وده بيدعم إن الـ model يبقى normal. ‡ (من الـ lecture notes)",
      "‡ في Table 6.3 في الـ notes، العمود اللي عنوانه <bdi>F⁻¹((j − 1/2)/20)</bdi> فعليًا فيه قيم <bdi>(j − 1/2)/20</bdi> متقرّبة (<bdi>0.03, 0.08, … , 0.98</bdi>)، مش الـ quantiles. الـ normal quantiles الحقيقية بـ mean قيمته 99.99 و standard deviation قيمته 0.2832 تقريبًا:<span class=\"ltr\">99.43, 99.58, 99.66, … , 100.40, 100.55   (j = 1, 2, 3, … , 19, 20)</span>"
     ],
     "figH": {
      "ms-in-qq": "مثال 6.3 خطوة بخطوة ورسم الـ normal Q-Q plot"
     }
    },
    {
     "h": "تقدير الـ parameters: الـ sample mean والـ sample variance (سلايد 19 لـ 21)",
     "pts": [
      "تقدير الـ parameters (parameter estimation) هو <b>الخطوة اللي بعد ما نختار الـ family</b> بتاعة الـ distributions (سلايد 20).",
      "لـ sample زي <bdi>X₁, X₂, …, Xₙ</bdi> (raw data سواء discrete أو continuous)، بنستخدم الـ <b>sample mean</b> والـ <b>sample variance</b> (سلايد 20).",
      "لو الـ data <b>discrete ومتجمّعة (grouped)</b> في frequency distribution، يبقى fⱼ هو الـ observed frequency للقيمة Xⱼ (سلايد 20).",
      "‡ سلايد 20 كاتب مجاميع الـ grouped data كـ Σ من <bdi>j = 1</bdi> لـ n؛ لكن الـ notes بتجمع من <bdi>j = 1</bdi> لـ <b>k</b>، و k هنا هو عدد <b>القيم المختلفة (distinct values)</b> بتاعة X (أما n فهو إجمالي عدد الـ observations، و <bdi>Σfⱼ = n</bdi>).",
      "لو الـ raw data مش موجودة (والـ data متجمّعة في <b>class intervals</b>)، بنستخدم الـ sample mean والـ variance <b>التقريبيين</b> بالـ midpoints بتاعة الـ intervals (سلايد 21): الـ fⱼ هو الـ observed frequency في الـ class interval رقم j، و mⱼ هو الـ midpoint بتاع الـ interval رقم j، و c هو عدد الـ class intervals.",
      "‡ في سلايد 21 المجموع اللي في S² مكتوب من <bdi>j = 1</bdi> لـ n؛ والصح إنه يمشي على الـ <b>c</b> class intervals زي الـ mean بالظبط (الـ notes بتستخدم c في الاتنين).",
      "الـ <b>parameter ده ثابت (constant) مش معروف</b>، لكن الـ <b>estimator ده statistic</b> (سلايد 21)."
     ]
    },
    {
     "h": "مثال على تقدير الـ parameters: وصول العربيات (سلايد 22)",
     "pts": [
      "بنحلل جدول وصول العربيات فنطلع بالقيم دي:<span class=\"ltr\">n = 100,  f₁ = 12,  X₁ = 0,  f₂ = 10,  X₂ = 1, …,  Σ fⱼXⱼ = 364,  Σ fⱼXⱼ² = 2080</span>وده من سلايد 22.",
      "‡ سلايد 22 بيقول إن الجدول موجود <bdi>\"in the histogram of the example on Slide 11\"</bdi>؛ لكن جدول العربيات في <b>سلايد 10</b> (سلايد 11 ده مثال عمر الـ components).",
      "الـ sample mean:<span class=\"ltr\">X̄ = 364 / 100 = <b>3.64</b></span>",
      "الـ sample variance:<span class=\"ltr\">S² = (2080 − 100 × 3.64²) / 99 = (2080 − 1324.96) / 99 = 755.04 / 99 = <b>7.63</b></span>",
      "الرسمة (سلايد 22): الـ histogram بتاع العربيات (bars من 0 لـ 11) وفوقه Poisson curve باللون الأحمر؛ الـ curve قمته حوالي 21 قريب من <bdi>x = 3</bdi>، أعلى من الـ bars اللي هناك.",
      "الـ histogram بيوحي إن X ليه <b>Poisson distribution</b>. بس الـ sample mean (3.64) مش مساوي للـ sample variance (7.63)، مع إن نظريًا في الـ Poisson اللي parameter بتاعه λ بيبقى <bdi><b>μ = σ² = λ</b></bdi> (سلايد 22؛ والرمز اللي بعد λ مكتوب بشكل بايظ على الـ slide).",
      "السبب: <b>كل estimator هو random variable</b>؛ يعني مش perfect (سلايد 22)."
     ],
     "figH": {
      "ms-in-vehicle-est": "الـ sample mean والـ variance لبيانات العربيات ومنحنى الـ Poisson"
     }
    },
    {
     "h": "الـ estimators المقترحة (maximum‑likelihood) (سلايد 23)",
     "pts": [
      "الـ estimators المقترحة للـ distributions اللي بتتستخدم كتير في الـ simulation هي <b>maximum‑likelihood estimators</b> (سلايد 23).",
      "في الـ lognormal، بنحسب μ̂ و σ̂² <b>بعد ما ناخد الـ ln للـ data</b> (الـ call‑out في سلايد 23).",
      "‡ في الـ gamma، سلايد 23 بيدي بس <bdi>θ̂ = 1/X̄</bdi>؛ أما Table 6.4 في الـ notes فبيذكر كمان β̂ (الـ shape) كـ parameter لازم يتقدّر، من غير ما يكتب قانونه.",
      "الـ notes معلّمة إن <bdi>σ̂² = S²</bdi> في الـ normal هو الـ estimator الـ <b>unbiased</b>؛ والـ parameter بتاع الـ Poisson مكتوب α والـ estimator بتاعه α̂. ‡ (من الـ lecture notes)",
      "<b>مثال 6.4 (lognormal)</b>: الـ rates of return لـ 10 استثمارات:<span class=\"ltr\">18.8, 27.9, 21.0, 6.1, 37.4, 5.0, 22.9, 1.0, 3.1, 8.3</span>ناخد الـ natural log:<span class=\"ltr\">2.9, 3.3, 3.0, 1.8, 3.6, 1.6, 3.1, 0, 1.1, 2.1</span>وبعدين:<span class=\"ltr\">μ̂ = X̄ = 22.5 / 10 = <b>2.25</b>,   σ̂² = S² ≈ <b>1.3</b></span>والحسابات دي معمولة على قيم الـ ln. ‡ (من الـ lecture notes)",
      "مراجعة مثال 6.4: بالـ logs المتقرّبة، مجموع الـ ln بيطلع 22.5 ومجموع مربعاتها 62.29، فـ:<span class=\"ltr\">S² = (62.29 − 10 × 2.25²) / 9 = 11.665 / 9 = 1.296 ≈ 1.3</span>ولو استخدمنا الـ logs من غير تقريب هيطلع <bdi>μ̂ = 2.27</bdi> و <bdi>σ̂² = 1.32</bdi>. (المثال ده جه في الـ final بتاع <bdi>2024/25</bdi>.) ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-in-lognormal": "مثال 6.4 وحساب تقديرات الـ lognormal من الـ logs"
     }
    },
    {
     "h": "اختبارات الـ goodness of fit وأخطاء القرار (سلايد 24 لـ 26)",
     "pts": [
      "نعمل <b>hypothesis testing</b> على الـ distribution بتاعة الـ input data باستخدام (سلايد 25):<br>• الـ <b>Kolmogorov‑Smirnov test</b><br>• الـ <b>Chi‑square test</b>",
      "<b>مفيش distribution واحدة صح</b> في أي تطبيق حقيقي (سلايد 25):<br>• لو الـ data المتاحة <b>قليلة جدًا</b>، <b>غالبًا مش هنرفض ولا</b> candidate distribution<br>• ولو الـ data المتاحة <b>كتير</b>، <b>غالبًا هنرفض كل</b> الـ candidate distributions",
      "خلي بالك من الأخطاء في اتخاذ القرار (سلايد 26):<br>• الـ <b>Type I error (α)</b>: خطأ من النوع الأول، يعني <b>false positive</b>: إننا نرفض H₀ وهي صح<br>• الـ <b>Type II error (β)</b>: خطأ من النوع التاني، يعني <b>false negative</b>: إننا نحتفظ بـ H₀ وهي مش صح"
     ],
     "figH": {
      "ms-in-errors": "الـ Type I والـ Type II errors (دوس على أي قرار)"
     }
    },
    {
     "h": "الـ Chi‑square test (سلايد 27 لـ 29)",
     "pts": [
      "الفكرة: <b>نقارن الـ histogram بتاع الـ data بشكل الـ density أو الـ mass function المرشّحة</b> (سلايد 27).",
      "الـ test ده valid في الـ <b>sample sizes الكبيرة</b> لما الـ parameters تكون متقدّرة بالـ <b>maximum likelihood</b> (سلايد 27).",
      "الـ test ده ينفع يتستخدم مع الافتراضات اللي <b>discrete واللي continuous</b> الاتنين. ‡ (من الـ lecture notes)",
      "رتّب الـ n observations في مجموعة من <b>k class intervals</b> (سلايد 27).",
      "الـ Oᵢ هو الـ observed frequency في الـ class رقم i؛ والـ Eᵢ هو الـ expected frequency ويساوي <bdi>n × pᵢ</bdi>، و pᵢ هي الـ theoretical probability بتاعة الـ interval رقم i؛ و<b>أقل Eᵢ مقترح هو 5</b> (سلايد 27).",
      "الـ χ₀² ماشي تقريبًا على chi‑square distribution بـ <b><bdi>k − s − 1</bdi> degrees of freedom</b>، و <b>s هو عدد الـ parameters</b> بتاعة الـ distribution المفترضة اللي اتقدّرت من الـ sample statistics (سلايد 27).",
      "الـ hypotheses (سلايد 28):<br>• الـ H₀: الـ random variable اللي هو X ماشي على الـ distribution المفترضة بالـ parameter(s) اللي جت من التقدير<br>• الـ H₁: الـ X مش ماشي عليها",
      "القرار (سلايد 28):<span class=\"ltr\">accept H₀ if χ₀² ≤ χ²α,k−s−1;   reject H₀ if χ₀² &gt; χ²α,k−s−1</span>والـ critical values موجودة في Table A.6 في الـ notes، مثلًا:<span class=\"ltr\">χ²0.05,5 = 11.07,   χ²0.05,6 = 12.59</span>",
      "في الـ distribution الـ <b>discrete</b>: كل قيمة للـ random variable المفروض تبقى class interval لوحدها إلا لو احتجنا ندمج؛ ولو مش محتاجين ندمج cells جنب بعض (يعني Eᵢ فوق الحد الأدنى) يبقى:<span class=\"ltr\">pᵢ = p(xᵢ) = P(X = xᵢ)</span>وده من سلايد 28. غير كده، pᵢ بتبقى مجموع الـ probabilities بتاعة الـ cells اللي اتدمجت.",
      "لو فيه Eᵢ صغيرة أوي، ادمجها مع الـ cells اللي جنبها: وادمج الـ Oᵢ المقابلة ليها كمان، و<b>قلّل k بواحد مع كل cell بتدمجها</b>. ‡ (من الـ lecture notes)",
      "في الـ distribution الـ <b>continuous</b>:<span class=\"ltr\">pᵢ = ∫ f(x) dx over [aᵢ₋₁, aᵢ) = F(aᵢ) − F(aᵢ₋₁)</span>والـ aᵢ₋₁ و aᵢ هما أطراف الـ class interval رقم i، و f(x) هي الـ PDF المفترضة، و F(x) هي الـ CDF المفترضة (سلايد 29).",
      "في الـ discrete data، الـ k هو عدد الـ cells اللي فاضلة بعد الدمج؛ وفي الـ continuous data لازم نحدد k (استخدم الجدول). ‡ (من الـ lecture notes)",
      "<b>تحذير</b>: لو جمّعنا الـ data بشكل مختلف (يعني k مختلفة) ممكن نتيجة الـ hypothesis test تتغير (سلايد 29).",
      "عيوب الـ chi‑square test:<br>• تغيير عدد الـ classes وعرض الـ interval بيأثر على الـ chi‑square المحسوبة واللي من الجدول<br>• ممكن hypothesis تتقبل لما نجمّع الـ data بطريقة، وتترفض لما نجمّعها بطريقة تانية<br>• لازم نحط الـ data في class intervals؛ وفي الـ continuous data التجميع ده عشوائي (arbitrary) ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "مثال على الـ Chi‑square: وصول العربيات (سلايد 30)",
     "pts": [
      "الـ H₀: الـ random variable ده Poisson distributed. والـ H₁: مش Poisson distributed (سلايد 30). والـ parameter متقدّر كده: <bdi>α̂ = X̄ = 3.64</bdi>.",
      "الـ expected frequencies:<span class=\"ltr\">Eᵢ = n · p(x) = n · e^(−α) αˣ / x!   with n = 100, α = 3.64</span>وده من الـ call‑out في سلايد 30. والـ notes بتدي:<span class=\"ltr\">p(0) = 0.026, p(1) = 0.096, p(2) = 0.174, p(3) = 0.211, p(4) = 0.192, p(5) = 0.140, p(6) = 0.085, p(7) = 0.044, p(8) = 0.020, p(9) = 0.008, p(10) = 0.003, p(11) = 0.001</span>",
      "الـ cells <b>اتدمجت بسبب الافتراض إن أقل Eᵢ هو 5</b>: مثلًا <bdi>E₁ = 2.6 &lt; 5</bdi>، فبندمجها مع E₂ (القيم 0 و 1 مع بعض: <bdi>O = 22, E = 12.2</bdi>). ومن فوق، القيم من 7 لحد 11 أو أكتر اتدمجت (<bdi>O = 17, E = 7.6</bdi>) (سلايد 30).",
      "بعد الدمج بقى عندنا <bdi>k = 7</bdi> cells؛ واتقدّر parameter واحد (α)، فـ <bdi>s = 1</bdi>.",
      "الـ degrees of freedom:<span class=\"ltr\">k − s − 1 = 7 − 1 − 1 = <b>5</b>,   χ₀² = <b>27.68</b> &gt; χ²0.05,5 = <b>11.1</b> (11.07 in Table A.6)</span>وعشان كده <b>الـ hypothesis اترفضت</b> عند <bdi>α = 0.05</bdi> (سلايد 30). يعني الـ data مش Poisson بـ <bdi>α = 3.64</bdi>.",
      "‡ في سلايد 30، عمود الـ observed بيوري <bdi>O = 19</bdi> عند <bdi>x = 4</bdi> و <bdi>O = 6</bdi> عند <bdi>x = 5</bdi>؛ لكن الـ data (سلايد 10) بتدي <b>10 و 8</b>. والـ 10 والـ 8 بس هما اللي بيخلّوا مجموع العمود 100، وبيدّوا الـ contributions اللي على الـ slide:<span class=\"ltr\">4.41 = (10 − 19.2)²/19.2,   2.57 = (8 − 14.0)²/14.0</span>وآخر صف مكتوب عليه <bdi>\"&gt; 11\"</bdi> معناه <bdi>x ≥ 11</bdi>.",
      "مراجعة كل term:<span class=\"ltr\">(22 − 12.2)²/12.2 = 7.87;  (19 − 17.4)²/17.4 = 0.15;  (17 − 21.1)²/21.1 = 0.80;  (10 − 19.2)²/19.2 = 4.41;  (8 − 14.0)²/14.0 = 2.57;  (7 − 8.5)²/8.5 = 0.26;  (17 − 7.6)²/7.6 = 11.62;  total = 27.68</span>"
     ],
     "figH": {
      "ms-in-chisq-poisson": "الـ chi-square test لبيانات العربيات ضد الـ Poisson خطوة بخطوة"
     }
    },
    {
     "h": "الـ Chi‑square test بـ probabilities متساوية (من الـ lecture notes)",
     "pts": [
      "في الافتراض الـ <b>continuous</b>، المفروض نستخدم class intervals <b>متساوية في الـ probability</b> بدل ما تبقى متساوية في العرض:<span class=\"ltr\">pᵢ = 1/k,   Eᵢ = n pᵢ = n/k ≥ 5   ⇒   <b>k ≤ n/5</b></span>‡ (من الـ lecture notes)",
      "في الـ normal والـ exponential والـ Weibull الأطراف (endpoints) سهل نلاقيها؛ لكن في الـ gamma وغيرها محتاجين numerical integration للـ density. ‡ (من الـ lecture notes)",
      "<b>مثال 6.6</b>: الـ 50 chip lifetime (data سلايد 11) شكلهم exponential. والتقدير:<span class=\"ltr\">λ̂ = 1/X̄ = 1/11.89 = <b>0.084</b></span>الـ H₀: الأعمار exponentially distributed؛ والـ H₁: مش كده. وعشان <bdi>n = 50</bdi> يبقى <bdi>k ≤ 10</bdi>؛ فنختار <b><bdi>k = 8</bdi></b>، و <bdi>p = 1/8 = 0.125</bdi>، و <bdi>Eᵢ = 50/8 = 6.25</bdi>. ‡ (من الـ lecture notes)",
      "الأطراف بتطلع من <bdi>F(aᵢ) = 1 − e^(−λaᵢ) = i·p</bdi>، فـ:<span class=\"ltr\"><b>aᵢ = −(1/λ) ln(1 − i·p)</b>,   i = 0, 1, …, k   (always a₀ = 0, aₖ = ∞)</span>يعني:<span class=\"ltr\">a₁ = −(1/0.084) ln(1 − 0.125) = 1.590;  a₂ = −(1/0.084) ln(1 − 0.25) = 3.425;  a₃ = 5.595;  a₄ = 8.252;  a₅ = 11.677;  a₆ = 16.503;  a₇ = 24.755</span>‡ (من الـ lecture notes)",
      "الـ degrees of freedom:<span class=\"ltr\">k − s − 1 = 8 − 1 − 1 = <b>6</b>,   χ²0.05,6 = 12.6</span>وبما إن χ₀² أكبر من 12.6، يبقى <b>الـ null hypothesis اترفضت</b>: الـ exponential model بـ <bdi>λ = 0.084</bdi> مش fit. ‡ (من الـ lecture notes)",
      "‡ في Table 6.7 الـ cell التالتة مكتوب فيها <bdi>(3 − 6.25)²/6.25 = 0.81</bdi> والمجموع 38.72؛ والصح إنها <bdi>10.5625/6.25 = <b>1.69</b></bdi>، فيبقى <bdi>χ₀² = <b>39.60</b></bdi>. والنتيجة (الرفض، لأن 39.60 أكبر من 12.6) مش بتتغير."
     ],
     "figH": {
      "ms-in-chisq-exp": "مثال 6.6 بـ intervals متساوية في الاحتمال للـ exponential"
     }
    },
    {
     "h": "الـ Kolmogorov‑Smirnov test (سلايد 31)",
     "pts": [
      "الفكرة: <b>نحوّل الفكرة اللي ورا بصّتنا على الـ Q‑Q plot لـ test رسمي</b> (سلايد 31).",
      "الـ test بيقارن الـ continuous CDF اللي هي F(x) بتاعة الـ distribution المفترضة بالـ <b>empirical CDF</b> اللي هي Sɴ(x) بتاعة الـ N observations، على أساس statistic <b>أكبر فرق</b>:<span class=\"ltr\">D = max |F(x) − Sɴ(x)|</span>وده من سلايد 31.",
      "ده <b>test أقوى (more powerful)</b>، ومفيد خصوصًا لما (سلايد 31):<br>• الـ sample sizes تكون <b>صغيرة</b><br>• <b>مفيش parameters</b> اتقدّرت من الـ data",
      "لما يكون فيه parameters اتقدّرت (سلايد 31):<br>• الـ critical values بتبقى <b>biased، يعني كبيرة زيادة</b><br>• والـ test بيبقى <b>more conservative</b>، يعني الـ Type I error الفعلي أصغر من اللي محدّدينه",
      "أي افتراض continuous ينفع نختبره بالـ K‑S؛ أما الافتراضات الـ discrete فبنختبرها بالـ gap test. ‡ (من الـ lecture notes)",
      "الـ critical values من Table A.8:<span class=\"ltr\">N = 5: D0.05 = 0.565;  N = 10: 0.410;  N = 20: 0.294;  N &gt; 35: D0.10 = 1.22/√N,  D0.05 = 1.36/√N,  D0.01 = 1.63/√N</span>ومنرفضش H₀ لو <bdi>D &lt; Dα</bdi>. ‡ (من الـ lecture notes)",
      "<b>مثال 6.7</b>: اتجمعت interarrival times (بالدقايق) على مدار 100 دقيقة (<bdi>T = 100</bdi>). الـ H₀: الـ interarrival times ماشية exponential؛ والـ H₁: مش كده. لو الـ interarrival times كانت exponential، يبقى <b>الـ arrival times بتبقى uniform على <bdi>(0, T)</bdi></b>. بنجمع الـ interarrival times عشان نطلع الـ arrival times كده:<span class=\"ltr\">T₁, T₁ + T₂, …</span>وبعدين نقسم على T عشان نعملها normalize على <bdi>(0, 1)</bdi>، ونطبّق الـ K‑S test للـ uniformity على الـ 50 نقطة:<span class=\"ltr\">0.0044, 0.0097, 0.0301, …, 0.9744</span>‡ (من الـ lecture notes)",
      "النتيجة:<span class=\"ltr\">D⁺ = 0.1054,  D⁻ = 0.0080,  D = max(0.1054, 0.0080) = <b>0.1054</b></span>والـ critical value:<span class=\"ltr\">D0.05 = 1.36/√50 = <b>0.1923</b></span>وبما إن <bdi>D &lt; Dα</bdi>، يبقى منرفضش H₀: والـ interarrival times بنعتبرها exponentially distributed. ‡ (من الـ lecture notes)",
      "مراجعة: قيمة <bdi>D⁺ = 0.1054</bdi> جاية من <bdi>i = 24</bdi>:<span class=\"ltr\">24/50 − 0.3746 = 0.48 − 0.3746</span>‡ الـ notes طابعة 48 interarrival time بس، في حين إن الـ normalized list فيها 50 نقطة (الفجوات<span class=\"ltr\">0.7880 → 0.7982 → 0.8206</span>معناها إن فيه قيمتين زيادة، هما 1.02 و 2.24، مش مطبوعين).",
      "فيه test شبهه اسمه <b>Anderson‑Darling test</b>، وبرضه مبني على الفرق بين الـ empirical CDF والـ fitted CDF. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-in-ks": "مثال 6.7 والـ K-S test على الـ 50 arrival time"
     }
    },
    {
     "h": "الـ p‑values والـ \"best fits\" (من الـ lecture notes)",
     "pts": [
      "الـ <b>p‑value</b> هو الـ significance level اللي عنده بالكاد هنرفض H₀ لقيمة الـ test statistic اللي عندنا. الـ <b>p‑value الكبير</b> معناه <b>fit كويس</b>؛ والـ p‑value الصغير بيوحي إن الـ fit وحش. ‡ (من الـ lecture notes)",
      "ممكن نعمل fit لكل الـ distributions المتاحة ونختار اللي ليها أكبر p‑value، بس:<br>(1) الـ software مش عارف حاجة عن الـ physical basis بتاع الـ data، واللي ممكن يقترح families مناسبة<br>(2) الـ best‑fit procedures الأوتوماتيك بتميل إنها تختار distributions مرنة أكتر (الـ notes بتذكر الـ gamma و الـ Weibull و الـ exponential) لأن المرونة بتخليها تطابق الـ data أكتر، وده مش دايمًا الـ model الأنسب<br>(3) الـ p‑value ده مجرد summary measure ‡ (من الـ lecture notes)"
     ]
    },
    {
     "h": "اختيار الـ input models من غير data (من الـ lecture notes)",
     "pts": [
      "بيتستخدم في demonstration أو دراسة مبدئية قبل ما يبقى فيه أي process data؛ والـ modeler بيختار الـ input models و<b>بيشيّك على الـ sensitivity</b> بتاعة النتايج ليها. ‡ (من الـ lecture notes)",
      "مصادر المعلومات لما مايبقاش فيه data:<br>(1) الـ <b>Engineering data</b>: القيم بتاعة المصنّعين بتدي قيمة مركزية نبدأ منها<br>(2) الـ <b>Expert opinion</b>: ناس عندها خبرة بتدي قيمة متفائلة (optimistic) وقيمة متشائمة (pessimistic) والقيمة الأرجح (most likely)<br>(3) الـ <b>Physical or conventional limitations</b>: متتجاهلش الحدود الواضحة اللي بتضيّق الـ range (مثلًا إدخال الـ data بالكمبيوتر أسرع من إن شخص يكتبها)<br>(4) <b>طبيعة الـ process</b>: اختار الـ distribution بعد ما تفهم الـ process ‡ (من الـ lecture notes)",
      "من غير data، بنستخدم الـ distributions الـ <b>uniform و triangular و beta</b>. وفيه تحسين مفيد بيستخدم الـ minimum والـ maximum ونقطة أو أكتر من الـ <b>breakpoints</b>: يعني قيمة في النص والـ probability إن القيمة تبقى أقل من أو تساوي القيمة دي. ‡ (من الـ lecture notes)",
      "<b>مثال 6.8</b>: مبيعات المنتج XYZ: مش أقل من 1000 وحدة (بسبب العقود الموجودة)، ومش أكتر من 5000 (السوق كله)؛ وفيه احتمال 90% إننا نبيع أكتر من 2000، و 25% إننا نبيع أكتر من 3500، و 1% إننا نبيع أكتر من 4500. فيبقى:<span class=\"ltr\">P(1000 ≤ x ≤ 2000) = 0.10,  P(2000 &lt; x ≤ 3500) = 0.90 − 0.25 = 0.65,  P(3500 &lt; x ≤ 4500) = 0.25 − 0.01 = 0.24,  P(4500 &lt; x ≤ 5000) = 0.01</span>‡ (من الـ lecture notes)",
      "‡ الـ notes كاتبة سطر كده <bdi>\"25% = 0.24 chance of selling more than 3500 units\"</bdi>؛ والمقصود إن فيه احتمال 0.24 إننا نبيع ما بين 3500 و 4500 (الـ 25% ناقص الـ 1% اللي فوق 4500). وعنوان الجدول <bdi>\"Interval (hours)\"</bdi> المفروض يبقى units."
     ],
     "figH": {
      "ms-in-nodata": "مثال 6.8 وبناء الـ input model من الـ breakpoints"
     }
    },
    {
     "h": "الـ Multivariate input models: الـ covariance والـ correlation (من الـ lecture notes)",
     "pts": [
      "لما الـ inputs تبقى dependent على بعض، نستخدم <b>multivariate input models</b> (مثلًا الـ lead time والـ annual demand في الـ inventory system). والـ <b>time‑series models</b> بتمثّل sequence من inputs dependent على بعض (مثلًا الأوقات بين الـ orders ورا بعض). ‡ (من الـ lecture notes)",
      "الـ covariance والـ correlation بيقيسوا الـ <b>linear dependence</b> بين X₁ و X₂، يعني الـ model ده بيوصفهم كويس قد إيه:<span class=\"ltr\">(X₁ − μ₁) = β(X₂ − μ₂) + ε</span>والـ ε هنا الـ mean بتاعه 0 و independent عن X₂. لو X₁ و X₂ independent يبقى <bdi>β = 0</bdi>؛ ولو <bdi>β &gt; 0</bdi> معناه إنهم بيميلوا يبقوا في نفس الناحية من الـ means بتاعتهم، ولو <bdi>β &lt; 0</bdi> يبقوا في نواحي عكس بعض. ‡ (من الـ lecture notes)",
      "القواعد:<span class=\"ltr\">cov = 0 ⇒ β = 0;   cov &lt; 0 ⇒ β &lt; 0;   cov &gt; 0 ⇒ β &gt; 0</span>الـ covariance ممكن ياخد أي قيمة من <bdi>−∞</bdi> لـ <bdi>∞</bdi>؛ والـ <b>correlation</b> بيعمله standardize فيبقى بين 1- و 1. وكل ما ρ تقرب من 1- أو 1، كل ما الـ linear relationship تبقى أقوى. ‡ (من الـ lecture notes)",
      "الـ <b>time series</b> هي sequence زي <bdi>X₁, X₂, …</bdi> كلها identically distributed بس ممكن تبقى dependent. والـ <bdi>cov(Xₜ, Xₜ₊ₕ)</bdi> اسمه الـ <b>lag‑h autocovariance</b>، والـ <bdi>corr(Xₜ, Xₜ₊ₕ)</bdi> اسمه الـ <b>lag‑h autocorrelation</b>. ولو الـ autocovariance بيعتمد على h بس ومش على t، يبقى الـ series ده <b>covariance stationary</b>، و <bdi>ρₕ = corr(Xₜ, Xₜ₊ₕ)</bdi>. ‡ (من الـ lecture notes)",
      "لو X₁ و X₂ الاتنين normal، نمثّلهم بـ <b>bivariate normal</b> بالـ parameters دي:<span class=\"ltr\">μ₁, μ₂, σ₁², σ₂², ρ = corr(X₁, X₂)</span>‡ (من الـ lecture notes)",
      "<b>مثال 6.9</b>: الـ <bdi>(lead time, demand)</bdi> لمدة 10 سنين:<span class=\"ltr\">(6.5, 103), (4.3, 83), (6.9, 116), (6.0, 97), (6.9, 112), (6.9, 104), (5.8, 106), (7.3, 109), (4.5, 92), (6.3, 96)</span>والحسابات:<span class=\"ltr\">X̄₁ = 6.14,  X̄₂ = 101.80;  σ̂₁² = (386.44 − 10 × 37.7)/9 = 1.04,  σ̂₁ = 1.02,  σ̂₂ = 9.93;  Σ X₁X₂ = 6328.5;  cov = [6328.5 − 10(6.14)(101.80)]/9 = 8.66;  ρ̂ = 8.66/(1.02 × 9.93) = <b>0.86</b></span>يعني الـ lead time والـ demand dependent على بعض بقوة. ‡ (من الـ lecture notes)",
      "‡ لو حسبناها من غير تقريب:<span class=\"ltr\">σ̂₁² = 9.444/9 = 1.049,  σ̂₁ = 1.024,  σ̂₂ = 9.931,  ρ̂ = 0.85</span>والنتيجة (dependence موجبة وقوية) هي هي.",
      "الـ algorithm اللي بيطلع bivariate normal variates:<br>(1) الخطوة 1: نطلّع standard normals مستقلين:<span class=\"ltr\">Z₁ = (−2 ln R₁)^½ cos(2πR₂),   Z₂ = (−2 ln R₁)^½ sin(2πR₂)</span>(2) الخطوة 2:<span class=\"ltr\">X₁ = μ₁ + σ₁Z₁</span>(3) الخطوة 3:<span class=\"ltr\">X₂ = μ₂ + σ₂(ρZ₁ + √(1 − ρ²) Z₂)</span>‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-in-corr": "مثال 6.9 والـ covariance والـ correlation بين الـ lead time والـ demand",
      "ms-in-bivar": "توليد أزواج bivariate normal بالـ algorithm"
     }
    },
    {
     "h": "الـ Time‑series input models: الـ AR(1) والـ EAR(1) (من الـ lecture notes)",
     "pts": [
      "للـ X₁, X₂, … اللي identically distributed و dependent و covariance‑stationary، فيه اتنين models: الـ <b>AR(1)</b> (autoregressive من order 1) والـ <b>EAR(1)</b> (exponential autoregressive من order 1). ‡ (من الـ lecture notes)",
      "الـ <b>AR(1)</b>:<span class=\"ltr\">Xₜ = μ + φ(Xₜ₋₁ − μ) + εₜ,   t = 2, 3, …</span>والـ εₜ هنا i.i.d. normal (الـ mean بتاعها 0 والـ variance بتاعها σε²) و <bdi>−1 &lt; φ &lt; 1</bdi>. ساعتها Xₜ بيبقى normal بـ mean قيمته μ و variance قيمته <bdi>σε²/(1 − φ²)</bdi>، و <bdi>ρₕ = φʰ</bdi>. والـ φ هي نفسها ρ₁، يعني الـ lag‑1 autocorrelation. ‡ (من الـ lecture notes)",
      "تقدير الـ AR(1):<span class=\"ltr\">μ̂ = X̄;   φ̂ = cov̂(Xₜ, Xₜ₊₁)/σ̂²;   σ̂ε² = σ̂²(1 − φ̂²)</span>وفيها:<span class=\"ltr\">cov̂(Xₜ, Xₜ₊₁) = (1/(n − 1)) [Σₜ₌₁ⁿ⁻¹ XₜXₜ₊₁ − (n − 1)X̄²]</span>‡ (من الـ lecture notes)",
      "توليد الـ AR(1):<br>(1) الخطوة 1: نطلّع X₁ من normal الـ mean بتاعه μ والـ variance بتاعه <bdi>σε²/(1 − φ²)</bdi>؛ ونخلي <bdi>t = 2</bdi><br>(2) الخطوة 2: نطلّع εₜ من normal الـ mean بتاعه 0 والـ variance بتاعه σε²<br>(3) الخطوة 3: نحسب<span class=\"ltr\">Xₜ = μ + φ(Xₜ₋₁ − μ) + εₜ</span>(4) الخطوة 4: نخلي <bdi>t = t + 1</bdi> ونرجع للخطوة 2 ‡ (من الـ lecture notes)",
      "الـ <b>EAR(1)</b>:<span class=\"ltr\">Xₜ = φXₜ₋₁  with probability φ;   Xₜ = φXₜ₋₁ + εₜ  with probability 1 − φ</span>والـ εₜ هنا i.i.d. exponential (الـ mean بتاعها <bdi>1/λ</bdi>) و <bdi>0 ≤ φ &lt; 1</bdi>. ساعتها كل الـ Xₜ بيبقوا exponential بـ mean قيمته <bdi>1/λ</bdi>، و <bdi>ρₕ = φʰ</bdi>. وده يقدر يمثّل <b>positive autocorrelation</b> بس. والتقدير: <bdi>φ̂ = ρ̂</bdi> (الـ lag‑1 autocorrelation) و <bdi>λ̂ = 1/X̄</bdi>. ‡ (من الـ lecture notes)",
      "توليد الـ EAR(1):<br>(1) الخطوة 1: نطلّع X₁ exponential بـ mean قيمته <bdi>1/λ</bdi>؛ ونخلي <bdi>t = 2</bdi><br>(2) الخطوة 2: نطلّع U من uniform على <bdi>[0, 1]</bdi>؛ لو <bdi>U ≤ φ</bdi> نخلي <bdi>Xₜ = φXₜ₋₁</bdi>، وغير كده نطلّع εₜ exponential (الـ mean بتاعها <bdi>1/λ</bdi>) ونخلي <bdi>Xₜ = φXₜ₋₁ + εₜ</bdi><br>(3) الخطوة 3: نخلي <bdi>t = t + 1</bdi> ونرجع للخطوة 2 ‡ (من الـ lecture notes)",
      "<b>مثال 6.10</b>: عندنا 20 فجوة زمنية (بالثواني) بين أوامر الشرا والبيع (buy and sell orders):<span class=\"ltr\">1.95, 1.75, 1.58, 1.42, 1.28, 1.15, 1.04, 0.93, 0.84, 0.75, 0.68, 0.61, 11.98, 10.79, 9.71, 14.02, 12.62, 11.36, 10.22, 9.20</span>والحسابات:<span class=\"ltr\">X̄ = 5.2,  σ̂² = 26.7,  Σ XₜXₜ₊₁ = 924.1,  cov̂ = [924.1 − 19(5.2)²]/19 = 21.6,  ρ̂ = 21.6/26.7 = <b>0.8</b></span>فنمثّلها بـ EAR(1) بـ <bdi>λ̂ = 1/5.2 = <b>0.192</b></bdi> و <bdi>φ̂ = <b>0.8</b></bdi>، بشرط إن الـ exponential يكون model كويس للفجوات الفردية. ‡ (من الـ lecture notes)"
     ],
     "figH": {
      "ms-in-ts-gen": "توليد سلسلة AR(1) أو EAR(1) خطوة بخطوة",
      "ms-in-ear-ex": "مثال 6.10 والـ lag-1 autocorrelation للفواصل بين الأوامر"
     }
    }
   ],
   "cards": [
    "(1) نجمع data من الـ system الحقيقي<br>(2) نحدد probability distribution<br>(3) نختار الـ parameters بتاعتها<br>(4) نقيّم الـ distribution والـ parameters من ناحية الـ goodness of fit.",
    "يعني <bdi>Garbage-In-Garbage-Out</bdi>: لو الـ input data اتجمعت بشكل مش دقيق، أو اتحللت بطريقة مش مناسبة، أو مش ممثلة للواقع، النتايج هتبقى مضللة حتى لو الـ model نفسه valid.",
    "الكمية مش بتتشاف كلها؛ والخطر إننا نسيب الـ process times الطويلة.",
    "اجمع input data (كميات مش مؤكدة خارج سيطرة الـ system، زي الـ arrivals)، مش performance data (اللي هي الـ output).",
    "الجذر التربيعي لحجم الـ sample، يعني <bdi>√n</bdi>.",
    "الـ continuous: بيقابل الـ PDF. والـ discrete: بيقابل الـ PMF.",
    "ادمج الـ cells اللي جنب بعض عشان تشيل الشكل الـ ragged (لو واسعة أوي يطلع coarse، ولو ضيقة أوي يطلع ragged).",
    "ده quality tool بيوضح العلاقة بين data متزوّجة (paired): الـ X على الـ x‑axis والـ Y على الـ y‑axis. وبيوري الـ correlation والـ slope والـ direction والـ y‑intercept.",
    "الأسهل: الـ exponential و الـ normal و الـ Poisson. والأصعب: الـ beta و الـ gamma و الـ Weibull.",
    "الـ Normal: مجموع (sum) component processes. والـ Lognormal: حاصل ضرب (product) component processes.",
    "الـ Exponential: الوقت بين events مستقلة، و memoryless. والـ Weibull: الوقت لحد ما الـ components تبوظ (time to failure). والـ Triangular: لما يبقى معروف بس الـ min والـ most likely والـ max.",
    "الـ Binomial: عدد النجاحات (successes) في n trials. والـ negative binomial والـ geometric: عدد الـ trials لحد ما نوصل لـ k successes. والـ Poisson: بيعدّ events مستقلة في وقت أو مساحة ثابتة.",
    "القانون:<span class=\"ltr\">S² = (Σ Xᵢ² − n X̄²) / (n − 1)</span>",
    "القوانين:<span class=\"ltr\">X̄ ≈ Σ fⱼmⱼ / n,   S² ≈ (Σ fⱼmⱼ² − nX̄²)/(n − 1)</span>والـ mⱼ هو الـ midpoint، و c هو عدد الـ intervals.",
    "الـ parameter ده ثابت مش معروف؛ والـ estimator ده statistic (يعني random variable).",
    "الحسابات:<span class=\"ltr\">X̄ = 364/100 = 3.64,   S² = (2080 − 100·3.64²)/99 = 7.63</span>والـ Poisson متقترح رغم إن الـ mean مش بيساوي الـ variance.",
    "الـ estimators:<span class=\"ltr\">Poisson: α̂ = X̄;  exponential: λ̂ = 1/X̄;  gamma: θ̂ = 1/X̄;  normal: μ̂ = X̄, σ̂² = S²</span>والـ lognormal نفس الكلام بس بعد ما ناخد الـ ln للـ data.",
    "الـ Type I (α): نرفض H₀ وهي صح، يعني false positive. والـ Type II (β): نحتفظ بـ H₀ وهي غلط، يعني false negative.",
    "لو الـ data قليلة: غالبًا مش هنرفض ولا candidate. ولو الـ data كتير: غالبًا هنرفض كل الـ candidates.",
    "القانون:<span class=\"ltr\">χ₀² = Σ (Oᵢ − Eᵢ)²/Eᵢ,   Eᵢ = n pᵢ (min 5),   df = k − s − 1</span>ونرفض لو<span class=\"ltr\">χ₀² &gt; χ²α,k−s−1</span>",
    "الجدول:<span class=\"ltr\">n = 20: don't use chi-square;   n = 50: 5 to 10;   n = 100: 10 to 20;   n &gt; 100: √n to n/5</span>",
    "النتيجة:<span class=\"ltr\">k = 7,  s = 1,  df = 5;   χ₀² = 27.68 &gt; χ²0.05,5 = 11.1</span>فالـ Poisson hypothesis بتترفض.",
    "القانون:<span class=\"ltr\">D = max|F(x) − Sɴ(x)|</span>وهو أقوى في الـ samples الصغيرة ولما مفيش parameters متقدّرة؛ ولو فيه parameters متقدّرة الـ critical values بتبقى كبيرة زيادة (يعني conservative).",
    "نرسم الـ yⱼ المرتبة قصاد<span class=\"ltr\">F⁻¹((j − 1/2)/n)</span>ولو طلع خط مستقيم يبقى الـ family مناسبة، ولو الـ slope بتاعه 1 يبقى الـ parameters كمان مناسبة. ‡ (من الـ lecture notes)",
    "نستخدم الـ engineering data والـ expert opinion والـ physical limits وطبيعة الـ process؛ والـ distributions اللي بنستخدمها uniform أو triangular أو beta. ‡ (من الـ lecture notes)"
   ],
   "qa": [
    "الـ input models هي القوة اللي بتحرّك الـ simulation model، وجودة الـ output عمرها ما هتبقى أحسن من جودة الـ inputs (يعني GIGO). والـ 4 خطوات هما:<br>(1) نجمع data من الـ system الحقيقي<br>(2) نحدد probability distribution تمثّل الـ input process<br>(3) نختار الـ parameters بتاعة الـ distribution<br>(4) نقيّم الـ distribution والـ parameters اللي اخترناها من ناحية الـ goodness of fit.",
    "(1) خطط بدري (Plan ahead): ابدأ بـ session تجريبية أو ملاحظة مبدئية وخلي بالك من الظروف الغريبة.<br>(2) حلل الـ data وانت بتجمعها: اتأكد إنها كافية (adequacy).<br>(3) ادمج الـ data sets المتجانسة: فترات زمنية ورا بعض، أو نفس الفترة في أيام ورا بعض.<br>(4) خلي بالك من الـ data censoring: الكمية مش بتتشاف كلها، فممكن الـ process times الطويلة تتساب.<br>(5) اتأكد لو فيه علاقات بين الـ variables (باستخدام الـ scatter diagram).<br>(6) اتأكد لو فيه autocorrelation.<br>(7) اجمع input data، مش performance data.",
    "الـ histogram (أو الـ frequency distribution) بيوري شكل الـ data. في الـ continuous data بيقابل الـ PDF بتاعة distribution نظرية؛ وفي الـ discrete data بيقابل الـ PMF. وعدد الـ intervals بيعتمد على عدد الـ observations ومدى انتشار الـ data؛ والعدد المقترح هو الجذر التربيعي لحجم الـ sample. ولو الـ intervals واسعة أوي الـ histogram يطلع coarse و blocky؛ ولو ضيقة أوي يطلع ragged؛ ولو الـ data points قليلة، ادمج الـ cells اللي جنب بعض.",
    "الـ Binomial: عدد النجاحات (successes) في n trials.<br>الـ Poisson: عدد الـ events المستقلة اللي بتحصل في وقت أو مساحة ثابتة.<br>الـ Normal: عبارة عن process هو مجموع (sum) عدد من الـ component processes.<br>الـ Lognormal: حاصل ضرب (product) عدد من الـ component processes.<br>الـ Exponential: الوقت بين events مستقلة، أو process time من غير ذاكرة (memoryless).<br>الـ Weibull: الوقت لحد ما الـ components تبوظ (time to failure).<br>الـ Uniform (سواء discrete أو continuous): عدم يقين كامل (complete uncertainty).<br>الـ Triangular: لما يبقى معروف بس الـ minimum والـ most likely والـ maximum.<br>الـ Empirical: بياخد samples من تاني (resamples) من الـ data الحقيقية.<br>(والـ Negative binomial والـ geometric: عدد الـ trials لحد ما نوصل لـ k successes.)",
    "الـ sample mean:<span class=\"ltr\">X̄ = Σ fⱼXⱼ / n = 364/100 = 3.64</span>والـ sample variance:<span class=\"ltr\">S² = (Σ fⱼXⱼ² − nX̄²)/(n − 1) = (2080 − 100 × 3.64²)/99 = (2080 − 1324.96)/99 = 755.04/99 = 7.63</span>الـ histogram بيوحي بـ Poisson distribution، واللي نظريًا فيها <bdi>μ = σ² = λ</bdi>. والـ sample mean والـ variance مش متساويين لأن كل estimator هو random variable ومش perfect. والـ MLE هو <bdi>α̂ = X̄ = 3.64</bdi>.",
    "الـ Type I error (α): خطأ من النوع الأول، يعني false positive: إننا نرفض H₀ وهي صح. والـ Type II error (β): خطأ من النوع التاني، يعني false negative: إننا نحتفظ بـ H₀ (نقبلها) وهي مش صح.<br><table><tr><th>القرار</th><th>H₀ صح</th><th>H₀ غلط</th></tr><tr><td>نقبل H₀</td><td>صح</td><td>Type II error (false negative)</td></tr><tr><td>نرفض H₀</td><td>Type I error (false positive)</td><td>صح</td></tr></table>",
    "رتّب الـ n observations في k class intervals. والـ statistic:<span class=\"ltr\">χ₀² = Σ (Oᵢ − Eᵢ)²/Eᵢ</span>والـ Oᵢ هو الـ observed frequency في الـ class رقم i، والـ Eᵢ هو الـ expected frequency ويساوي <bdi>n pᵢ</bdi> (في الـ discrete <bdi>pᵢ = P(X = xᵢ)</bdi>، وفي الـ continuous <bdi>pᵢ = F(aᵢ) − F(aᵢ₋₁)</bdi>). أقل Eᵢ مقترح هو 5؛ والـ cells الأصغر بتتدمج مع اللي جنبها. والـ χ₀² ماشي تقريبًا على chi‑square بـ <bdi>k − s − 1</bdi> degrees of freedom (و s هو عدد الـ parameters المتقدّرة). الـ H₀: الـ X ماشي على الـ distribution المفترضة بالـ parameters المتقدّرة؛ والـ H₁: مش ماشي عليها. نقبل H₀ لو<span class=\"ltr\">χ₀² ≤ χ²α,k−s−1</span>وغير كده نرفض. والـ k المقترحة للـ continuous data:<span class=\"ltr\">n = 20: do not use;   n = 50: 5 to 10;   n = 100: 10 to 20;   n &gt; 100: √n to n/5</span>والتجميع المختلف ممكن يغيّر النتيجة. والـ test ده valid في الـ samples الكبيرة لما الـ parameters تكون متقدّرة بالـ maximum likelihood.",
    "الـ H₀: Poisson؛ والـ H₁: مش Poisson. والـ expected frequencies:<span class=\"ltr\">Eᵢ = 100 · e^(−3.64) 3.64ˣ/x!</span>ندمج القيم 0 و 1 (<bdi>E = 2.6 + 9.6 = 12.2, O = 22</bdi>) والقيم من 7 لحد 11 أو أكتر (<bdi>E = 7.6, O = 17</bdi>) عشان كل Eᵢ تبقى 5 أو أكتر.<br>الـ terms:<span class=\"ltr\">(22 − 12.2)²/12.2 = 7.87;  (19 − 17.4)²/17.4 = 0.15;  (17 − 21.1)²/21.1 = 0.80;  (10 − 19.2)²/19.2 = 4.41;  (8 − 14.0)²/14.0 = 2.57;  (7 − 8.5)²/8.5 = 0.26;  (17 − 7.6)²/7.6 = 11.62;  χ₀² = 27.68</span>والـ degrees of freedom:<span class=\"ltr\">k = 7,  s = 1,  df = 7 − 1 − 1 = 5;   χ²0.05,5 = 11.1</span>وبما إن 27.68 أكبر من 11.1، يبقى نرفض H₀.",
    "الـ test ده بيحوّل الفكرة اللي ورا الـ Q‑Q plot لـ test رسمي: بيقارن الـ continuous CDF اللي هي F(x) بتاعة الـ distribution المفترضة بالـ empirical CDF اللي هي Sɴ(x) بتاعة الـ N observations، باستخدام:<span class=\"ltr\">D = max|F(x) − Sɴ(x)|</span>لو D أقل من الـ critical value اللي هي Dα (من Table A.8، مثلًا <bdi>1.36/√N</bdi> عند <bdi>α = 0.05</bdi> لما <bdi>N &gt; 35</bdi>)، منرفضش H₀. وهو أقوى (more powerful) ومفيد خصوصًا لما الـ sample sizes تكون صغيرة ومفيش parameters اتقدّرت من الـ data. أما لو فيه parameters اتقدّرت، الـ critical values بتبقى biased (كبيرة زيادة)، فالـ test بيبقى more conservative: يعني الـ Type I error الفعلي أصغر من اللي محدّدينه.",
    "نستخدم:<br>(1) الـ engineering data (القيم بتاعة المصنّعين بتدي قيمة مركزية)<br>(2) الـ expert opinion (قيم optimistic و pessimistic و most likely)<br>(3) الحدود الفيزيائية أو المتعارف عليها (physical or conventional limits) اللي بتحدد الـ range<br>(4) طبيعة الـ process.<br>والـ distributions المعتادة هي uniform و triangular و beta؛ وفيه تحسين بيستخدم الـ minimum والـ maximum والـ breakpoints (قيمة والـ probability إن القيمة تبقى أقل من أو تساوي دي). ولازم الـ modeler يشيّك على الـ sensitivity بتاعة النتايج للـ models اللي اختارها.",
    "في الـ lognormal، الـ parameters بتتقدّر من الـ natural logs بتاعة الـ data: يعني <bdi>μ̂ = X̄</bdi> و <bdi>σ̂² = S²</bdi> بتوع قيم الـ ln.<br>الـ ln بتاع الـ data:<span class=\"ltr\">2.93, 3.33, 3.04, 1.81, 3.62, 1.61, 3.13, 0, 1.13, 2.12</span>والـ sheet بتقرّبهم لـ:<span class=\"ltr\">2.9, 3.3, 3.0, 1.8, 3.6, 1.6, 3.1, 0, 1.1, 2.1</span>الـ mean:<span class=\"ltr\">μ̂ = X̄ = Σ ln xᵢ / n = 22.5/10 = <b>2.25</b>   (2.27 with unrounded logs)</span>والـ variance:<span class=\"ltr\">σ̂² = S² = (Σ (ln xᵢ)² − n X̄²)/(n − 1) = (62.29 − 10 × 2.25²)/9 = (62.29 − 50.63)/9 = <b>1.3</b>   (1.32 with unrounded logs)</span>يعني الـ model اللي طلع lognormal بـ <bdi>μ ≈ 2.25</bdi> و <bdi>σ² ≈ 1.3</bdi> (ودول الـ mean والـ variance بتوع ln X، مش بتوع X نفسه).",
    "نخلي X₁ هو الـ lead time و X₂ هو الـ demand، و <bdi>n = 10</bdi>.<br>الـ means:<span class=\"ltr\">X̄₁ = 61.4/10 = 6.14;   X̄₂ = 1018/10 = 101.80</span>الـ variances:<span class=\"ltr\">σ̂₁² = (Σ X₁² − n X̄₁²)/(n − 1) = (386.44 − 10 × 37.70)/9 = 1.04,   σ̂₁ = 1.02</span><span class=\"ltr\">σ̂₂² = (Σ X₂² − n X̄₂²)/(n − 1) = (104,520 − 10 × 10,363.24)/9 = 98.62,   σ̂₂ = 9.93</span>الـ covariance:<span class=\"ltr\">côv = [Σ X₁ⱼ X₂ⱼ − n X̄₁ X̄₂]/(n − 1) = [6328.5 − 10(6.14)(101.80)]/9 = (6328.5 − 6250.52)/9 = 8.66</span>الـ correlation:<span class=\"ltr\">ρ̂ = côv/(σ̂₁ σ̂₂) = 8.66/(1.02 × 9.93) = 8.66/10.13 = <b>0.86</b>   (0.85 with unrounded σ's)</span>والـ ρ̂ قريبة من 1+، فالـ lead time والـ demand <b>dependent على بعض بقوة (موجب)</b>: يعني الـ lead times الأطول بتيجي مع demand أعلى."
   ],
   "quiz": [
    [
     "الـ Normal هو distribution بتاعة process عبارة عن مجموع (sum) عدد من الـ component processes (L6, Selecting the Family of Distributions).",
     "الـ Lognormal هو distribution بتاعة process عبارة عن حاصل ضرب (product) عدد من الـ component processes (L6, Selecting the Family of Distributions).",
     "صح. الـ slide بتقول <bdi>\"Binomial: Number of successes in n trials\"</bdi> (L6, Selecting the Family of Distributions)؛ وعدد النجاحات في n Bernoulli trials ليه binomial distribution (L3, Binomial Distribution).",
     "الـ Empirical بياخد samples من تاني من الـ data الحقيقية اللي اتجمعت؛ ملوش علاقة بعدّ النجاحات (L6, Selecting the Family of Distributions)."
    ],
    [
     "الـ Normal هو مجموع عدد من الـ component processes (L6, Selecting the Family of Distributions).",
     "الـ Lognormal هو حاصل ضرب عدد من الـ component processes (L6, Selecting the Family of Distributions).",
     "صح. الـ slide بتقول <bdi>\"Poisson: Number of independent events that occur in a fix amount of time or space\"</bdi> (L6, Selecting the Family of Distributions).",
     "الـ Empirical بياخد samples من تاني من الـ data الحقيقية اللي اتجمعت (L6, Selecting the Family of Distributions)."
    ],
    [
     "ده graph (يعني <bdi>\"quality tool\"</bdi>)، مش statistical test؛ الـ tests هما الـ chi‑square أو الـ K‑S (L6, Scatter Diagrams).",
     "كلمة <bdi>\"Linear\"</bdi> بتوصف علاقة من العلاقات اللي ممكن الـ scatter diagram يوريها، مش هي تعريف الـ diagram نفسه (L6, Scatter Diagrams).",
     "كلمة <bdi>\"Curvilinear\"</bdi> دي pattern ممكن النقط تاخده، مش تعريف الـ diagram (L6, Scatter Diagrams).",
     "صح. الـ scatter diagram بيرسم data متزوّجة: الـ random variable اللي هو X على الـ x‑axis و Y على الـ y‑axis، عشان يوري العلاقة بينهم (L6, Scatter Diagrams)؛ والـ notes بتوصفه إنه <bdi>\"a dotted graph with one variable on x-axis and one variable on y-axis\"</bdi> ‡ (من الـ lecture notes). (رقم السؤال 8 ناقص في الورقة.)"
    ],
    [
     "الـ Normal هو مجموع عدد من الـ component processes (L6, Selecting the Family of Distributions).",
     "صح. الـ slide بتقول <bdi>\"Poisson: Number of independent events that occur in a fix amount of time or space\"</bdi> (L6, Selecting the Family of Distributions).",
     "الـ Binomial بيعدّ النجاحات في n trials، مش الـ events في وقت ثابت (L6, Selecting the Family of Distributions).",
     "الـ Exponential هو الـ <b>وقت بين</b> الـ events المستقلة، مش عددهم (L6, Selecting the Family of Distributions)."
    ],
    [
     "دي الخطوة 1 (L6, Purpose and overview).",
     "دي الخطوة 2 (L6, Purpose and overview).",
     "دي الخطوة 4 (L6, Purpose and overview).",
     "صح. الـ Verification ده تبع Lecture 7 (الـ <bdi>V&amp;V</bdi>)؛ أما الـ 4 خطوات بتوع الـ input فهما: نجمع، نحدد، نختار الـ parameters، نختبر الـ fit."
    ],
    [
     "صح. الـ input data الوحشة بتدي output مضلل حتى لو الـ model structure نفسه valid.",
     "الاختصار اللي في الـ slide هو <bdi>Garbage-In-Garbage-Out</bdi> (L6, Data collection).",
     "ده مش المصطلح المستخدم (L6, Data collection).",
     "ده مش المصطلح المستخدم (L6, Data collection)."
    ],
    [
     "صح. العدد المقترح للـ intervals هو<span class=\"ltr\">√n = √64 = 8</span>",
     "ده <bdi>n/2</bdi>؛ والقاعدة هي الجذر التربيعي لحجم الـ sample (L6, Histograms).",
     "ده <bdi>n/5</bdi>، اللي هو الحد الأعلى لعدد الـ cells في الـ chi‑square لما <bdi>n &gt; 100</bdi>، مش قاعدة الـ histogram (L6, Histograms).",
     "إن يبقى فيه interval لكل observation ده مش القاعدة (L6, Histograms)."
    ],
    [
     "ده للـ continuous data (L6, Histograms).",
     "صح. الـ discrete data بتقابل الـ PMF؛ والـ continuous data بتقابل الـ PDF.",
     "الـ histogram بيوري الـ frequencies في كل cell، مش قيم تراكمية (cumulative) (L6, Histograms).",
     "الـ empirical CDF بيتستخدم في الـ K‑S test (L6, Kolmogorov-Smirnov test)."
    ],
    [
     "الـ Binomial هو عدد النجاحات في n trials (L6, Selecting the family).",
     "الـ Poisson هو عدد الـ events المستقلة في وقت أو مساحة ثابتة (L6, Selecting the family).",
     "صح. سلايد 18: عدد الـ trials لحد ما نوصل لـ k successes.",
     "الـ Weibull هو الوقت لحد ما الـ components تبوظ (L6, Selecting the family)."
    ],
    [
     "صح. سلايد 18.",
     "الـ Normal هو مجموع component processes (L6, Selecting the family).",
     "الـ Uniform بيمثّل عدم يقين كامل، ومعروف فيه الـ range بس (L6, Selecting the family).",
     "الـ Empirical بياخد samples من تاني من الـ data اللي اتجمعت (L6, Selecting the family)."
    ],
    [
     "الـ Normal للـ sum بتاع component processes (L6, Selecting the family).",
     "صح. سلايد 18.",
     "الـ Exponential هو الوقت بين events مستقلة (L6, Selecting the family).",
     "ده مش الـ physical basis اللي في الـ slide للـ product (L6, Selecting the family)."
    ],
    [
     "دول مذكورين إنهم صعبين في التحليل (L6, Selecting the family).",
     "صح. سلايد 17.",
     "دي مش القايمة اللي في الـ slide (L6, Selecting the family).",
     "الـ Weibull من المجموعة الصعبة (L6, Selecting the family)."
    ],
    [
     "ده الـ X̄ نفسه؛ وفي الـ exponential <bdi>λ̂ = 1/X̄</bdi> (L6, Suggested estimators).",
     "صح. والحساب:<span class=\"ltr\">λ̂ = 1/X̄ = 1/11.89 = 0.084</span>وده من مثال 6.6.",
     "ده X̄²؛ ومش estimator موجود في الجدول (L6, Suggested estimators).",
     "مفيش حساب هنا بيطلع 0.5؛ والصح <bdi>λ̂ = 1/X̄</bdi> (L6, Suggested estimators)."
    ],
    [
     "صح. سلايد 26: الـ Type I error هو α، يعني خطأ من النوع الأول.",
     "الـ Type II هو إننا نحتفظ بـ H₀ وهي مش صح (L6, Goodness-of-fit tests).",
     "رفض H₀ وهي صح ده خطأ (L6, Goodness-of-fit tests).",
     "ده مش مصطلح موجود في الـ decision table (L6, Goodness-of-fit tests)."
    ],
    [
     "صح. سلايد 25: لو الـ data قليلة جدًا غالبًا مش هنرفض ولا candidate؛ ولو الـ data كتير غالبًا هنرفضهم كلهم.",
     "سلايد 25 بيقول الكلام ده بالظبط (L6, Goodness-of-fit tests)."
    ],
    [
     "ده <bdi>k − 1</bdi>، واللي بيتجاهل الـ 2 parameters المتقدّرين (L6, Chi-square test).",
     "ده بيطرح parameter واحد بس (L6, Chi-square test).",
     "صح. والحساب:<span class=\"ltr\">df = k − s − 1 = 10 − 2 − 1 = 7</span>",
     "الـ df لازم تبقى أقل من k (L6, Chi-square test)."
    ],
    [
     "صغير أوي؛ الـ slide بتقترح 5 (L6, Chi-square test).",
     "صح. سلايد 27: الحد الأدنى المقترح هو 5؛ والـ cells الأصغر بتتدمج.",
     "الـ slide بتقترح 5 (L6, Chi-square test).",
     "الـ 20 ده حجم الـ sample اللي عنده مش المفروض نستخدم الـ chi‑square (L6, Chi-square test)."
    ],
    [
     "صح. سلايد 31.",
     "سلايد 31 بيقول الكلام ده بالظبط؛ ولو فيه parameters متقدّرة الـ critical values بتاعته بتبقى كبيرة زيادة (L6, Kolmogorov-Smirnov test)."
    ],
    [
     "ده لما <bdi>n = 20</bdi> (L6, Chi-square test).",
     "صح. جدول سلايد 29.",
     "ده لما <bdi>n = 100</bdi> (L6, Chi-square test).",
     "ده لما <bdi>n &gt; 100</bdi> (L6, Chi-square test)."
    ]
   ],
   "extra": [
    [
     "صح. الحساب:<span class=\"ltr\">Σ fX = 0 + 10 + 6 + 6 = 22 → X̄ = 1.1;   Σ fX² = 0 + 10 + 12 + 18 = 40 → S² = (40 − 20 × 1.21)/19 = 15.8/19 = 0.83</span>",
     "ده بيقسم على <bdi>n = 20</bdi> بدل <bdi>n − 1 = 19</bdi> (L6, Parameter estimation).",
     "ده متوسط القيم من 0 لـ 3 العادي، من غير ما ياخد الـ frequencies في الاعتبار (L6, Parameter estimation).",
     "ده <bdi>Σ fX²/n = 40/20</bdi> من غير ما يطرح <bdi>nX̄²</bdi> (L6, Parameter estimation)."
    ],
    [
     "ده الـ midpoint بتاع الـ range كله، من غير ما ياخد الـ frequencies في الاعتبار (L6, Parameter estimation).",
     "صح. الـ midpoints هما 1 و 3 و 5، والحساب:<span class=\"ltr\">Σ fm = 4 + 18 + 50 = 72,   X̄ = 72/20 = 3.6   (and S² = (308 − 20 × 12.96)/19 = 2.57)</span>",
     "ده بيستخدم الأطراف الصغيرة 0 و 2 و 4 يعني <bdi>(0 + 12 + 40)/20</bdi>؛ والقاعدة بتستخدم الـ midpoints اللي هي mⱼ (L6, Parameter estimation).",
     "ده Σ fm مقسوم على عدد الـ intervals اللي هو <bdi>c = 3</bdi>؛ والصح نقسم على <bdi>n = 20</bdi> (L6, Parameter estimation)."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">df = k − s − 1 = 6 − 1 − 1 = 4 → critical value = 9.49;   10.2 &gt; 9.49</span>فالـ H₀ بتترفض.",
     "ده بيستخدم <bdi>df = 5 = k − 1</bdi>، وناسي الـ parameter المتقدّر (L6, Chi-square test).",
     "مفيش قاعدة زي دي؛ بنرفض لما<span class=\"ltr\">χ₀² &gt; χ²α,k−s−1</span>وده من (L6, Chi-square test).",
     "أي k مسموحة طالما كل Eᵢ أكبر من أو تساوي 5 (L6, Chi-square test)."
    ],
    [
     "ده a₁، يعني <bdi>−(1/0.084) ln(0.875)</bdi> (L6, Chi-square test with equal probabilities).",
     "ده a₂، يعني <bdi>−(1/0.084) ln(0.75)</bdi> (L6, Chi-square test with equal probabilities).",
     "صح. الحساب:<span class=\"ltr\">a₃ = −(1/0.084) ln(1 − 3 × 0.125) = −(1/0.084) ln(0.625) = 0.4700/0.084 = 5.595</span>",
     "ده a₄، يعني <bdi>−(1/0.084) ln(0.5)</bdi> (L6, Chi-square test with equal probabilities)."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">Eᵢ = n/k ≥ 5 → k ≤ n/5 = 10;   k = 8 → Eᵢ = 50/8 = 6.25</span>",
     "القيمة <bdi>√50 ≈ 7</bdi> دي الطرف الأصغر في قاعدة <bdi>n &gt; 100</bdi>، مش الحد بتاع الـ equal‑probability (L6, Chi-square test with equal probabilities).",
     "الـ Eᵢ بتساوي 5 بس لما <bdi>k = 10</bdi> (L6, Chi-square test with equal probabilities).",
     "القيمة 0.125 دي pᵢ، مش <bdi>Eᵢ = n pᵢ</bdi> (L6, Chi-square test with equal probabilities)."
    ],
    [
     "الـ D بنقارنه بالـ critical value، مش بـ D⁻ (L6, Kolmogorov-Smirnov test).",
     "صح. الحساب:<span class=\"ltr\">D = max(D⁺, D⁻) = 0.1054;   D0.05 = 1.36/√50 = 0.1923</span>وده من مثال 6.7.",
     "الـ D هو الأكبر ما بين D⁺ و D⁻، مش مجموعهم (L6, Kolmogorov-Smirnov test).",
     "الـ D هو الأكبر ما بين D⁺ و D⁻، يعني 0.1054 (L6, Kolmogorov-Smirnov test)."
    ],
    [
     "صح. من Table A.8: لما <bdi>N = 10</bdi> يبقى <bdi>D0.05 = 0.410</bdi>.",
     "ده D0.10 لما <bdi>N = 10</bdi> (L6, Kolmogorov-Smirnov test).",
     "الحساب <bdi>1.36/√10 = 0.430</bdi>؛ بس قانون الـ √N ده لما N أكبر من 35 بس (L6, Kolmogorov-Smirnov test).",
     "ده D0.01 لما <bdi>N = 10</bdi> (L6, Kolmogorov-Smirnov test)."
    ],
    [
     "صح. لما <bdi>n &gt; 100</bdi> الجدول بيدي:<span class=\"ltr\">√n to n/5 = √400 to 400/5 = 20 to 80</span>وده من سلايد 29.",
     "ده صف <bdi>n = 100</bdi>، مش <bdi>n &gt; 100</bdi> (L6, Chi-square test).",
     "ده صف <bdi>n = 50</bdi> (L6, Chi-square test).",
     "ده صف <bdi>n = 20</bdi>؛ ومع <bdi>n = 400</bdi> الـ chi‑square test ينفع عادي (L6, Chi-square test)."
    ],
    [
     "ده <bdi>P(x &gt; 3500)</bdi> (L6, Selecting input models without data).",
     "صح. الحساب:<span class=\"ltr\">P(x &gt; 2000) − P(x &gt; 3500) = 0.90 − 0.25 = 0.65</span>وده من مثال 6.8.",
     "ده <bdi>P(3500 &lt; x ≤ 4500) = 0.25 − 0.01</bdi> (L6, Selecting input models without data).",
     "ده الاحتمال التراكمي <bdi>P(x ≤ 3500)</bdi> (L6, Selecting input models without data)."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">φ̂ = ρ̂ = 21.6/26.7 = 0.81 ≈ 0.8;   λ̂ = 1/X̄ = 1/5.2 = 0.192</span>وده من مثال 6.10.",
     "ده قالب النسبة (<bdi>26.7/21.6</bdi>) واستخدم X̄ بدل <bdi>1/X̄</bdi> (L6, Time-series input models).",
     "الـ <bdi>λ̂ = 1/X̄</bdi>، مش X̄ (L6, Time-series input models).",
     "الـ EAR(1) يقدر يمثّل positive autocorrelation بس، يعني <bdi>0 ≤ φ &lt; 1</bdi> (L6, Time-series input models)."
    ]
   ]
  },
  "7": {
   "notes": [
    {
     "h": "ليه الـ verification والـ validation مهمين",
     "pts": [
      "الـ verification والـ validation بتوع الـ simulation model من <b>أهم وأصعب المهام</b> اللي على الـ model developer. ولازم الـ developer يشتغل قريب جدًا من الـ <b>end users</b> طول فترة التطوير علشان يزوّد الـ <b>credibility</b> بتاعة الموديل (صفحة 121).",
      "محتويات الشابتر:<span class=\"ltr\">7.1 Model building, verification and validation; 7.2 Verification of simulation models; 7.3 Calibration and validation of models, with 7.3.1 Face validity, 7.3.2 Validation of model assumptions, 7.3.3 Validating input-output transformations, 7.3.4 Input-output validation using historical input data, 7.3.5 Input-output validation using a Turing test.</span>",
      "<b>الـ validation جزء أساسي (integral part) من تطوير الموديل.</b> وهدفها عملية من شقين:<br>(1) إننا نطلع موديل بيمثل <b>السلوك الحقيقي للسيستم (true system behavior)</b>، علشان نقدر نستخدمه <b>بديل للسيستم الحقيقي (substitute for the actual system)</b> ونعمل عليه تجارب.<br>(2) إننا نزوّد <b>الـ acceptance والـ credibility</b> بتوع الموديل، علشان <b>المديرين وباقي صناع القرار (managers and other decision makers)</b> يستخدموه فعلًا.",
      "الـ <b>Verification</b> معناها <b>building the model right</b> (بنبني الموديل صح): بتقارن الـ <b>conceptual model</b> بالـ <b>computer representation</b> بتاعه.",
      "الـ <b>Validation</b> معناها <b>building the right model</b> (بنبني الموديل الصح): بتتأكد إن الموديل <b>تمثيل دقيق للسيستم الحقيقي (accurate representation of the real system)</b>.",
      "الـ validation بتتحقق عن طريق الـ <b>calibration</b>: وهي عملية <b>iterative</b> (بتتكرر) بنقارن فيها الموديل بسلوك السيستم الحقيقي، ونفضل نعيدها لحد ما دقة الموديل تبقى مقبولة."
     ]
    },
    {
     "h": "بناء الموديل والـ verification والـ validation (الجزء 7.1 وفيه 3 خطوات)",
     "pts": [
      "بناء الموديل (model building) بيتكون من <b>3 خطوات</b>:",
      "<b>الخطوة 1</b>:<br>• نراقب السيستم الحقيقي<br>• نشوف الـ interactions بين مكوناته المختلفة<br>• نجمع data عن سلوكه<br>الخطوة دي بتوصّلنا لفهم سلوك السيستم. ولازم نسأل الناس اللي عارفين السيستم أو الـ subsystem علشان نستفيد من خبرتهم الخاصة. ومع تقدم التطوير بتظهر أسئلة جديدة، فالـ developers بيرجعوا للخطوة دي تاني.",
      "<b>الخطوة 2</b>: بناء <b>conceptual model</b>: وهو مجموعة <b>assumptions</b> (افتراضات) عن مكونات السيستم وتركيبه، و<b>hypotheses</b> (فرضيات) عن قيم الـ input parameters بتاعة الموديل.",
      "<b>الخطوة 3</b>: ترجمة الـ operational model لـ <b>شكل الكمبيوتر يفهمه (<bdi>computer-recognizable form</bdi>)</b>، وده اللي بنسميه الـ <b>computerized model</b>.",
      "بناء الموديل <b>مش عملية linear (مش خط مستقيم)</b>: اللي بيبني الموديل بيرجع للخطوات دي كذا مرة وهو بيبنيه وبيعمله verification وvalidation.",
      "الشكل 7.1 (صفحة 122) عن الـ model building والـ verification والـ validation: تلات صناديق من فوق لتحت. الـ <b>Real system</b> (دايرة) ↔ الـ <b>Conceptual model</b> (فيه assumptions عن مكونات السيستم، والـ structural assumptions اللي بتحدد الـ interactions بين مكونات السيستم، وassumptions عن الـ input parameters والـ data)، والسهم المزدوج اللي بينهم مكتوب عليه <b>Conceptual validation</b>. والـ Conceptual model ↔ الـ <b>Operational model (computerized representation)</b>، والسهم المزدوج مكتوب عليه <b>Model verification</b>. وفيه loop على الشمال مكتوب عليها <b>Calibration and validation</b> بتوصّل الـ operational model تاني بالـ conceptual model والـ real system."
     ],
     "figH": {
      "ms-vv-build": "شكل 7.1 خطوة بخطوة: الـ real system والـ conceptual model والـ operational model والروابط بينهم"
     }
    },
    {
     "h": "الـ Verification: الهدف والحاجات اللي نراعيها (الجزء 7.2)",
     "pts": [
      "الهدف الأساسي من الـ <b>verification</b> إننا نتأكد إن <b>الـ conceptual model متمثل بدقة في الـ operational model</b> (الـ computerized representation). والـ conceptual model فيه درجة من الـ <b>abstraction</b> (تبسيط وتجريد) لطريقة شغل السيستم.",
      "الحاجات اللي نراعيها في الـ verification وعددها 8:<br>(1) الـ computerized model لازم <b>يراجعه حد غير اللي عمله</b>.<br>(2) اعمل <b>flow diagram</b> (الـ logic flow) لعمليات السيستم، علشان نعرف إيه العمليات اللي بتحصل لما الـ events تحصل.<br>(3) <b>بُص كويس على الـ output بتاع الموديل وشوف هل هو منطقي (reasonable)</b> مع إعدادات مختلفة للـ input parameters.<br>(4) في آخر الـ simulation، خلّي الـ computerized representation <b>يطبع الـ input parameters</b>، علشان تتأكد إنها ماتغيرتش ولا اتعدلت.<br>(5) خلّي الـ computerized model <b><bdi>self-documenting</bdi></b> (بيشرح نفسه) على قد ما تقدر.<br>(6) لو الـ computerized representation فيه <b>animation</b>، اتأكد إن الـ animation بتعكس السيستم الحقيقي.<br>(7) استخدم الـ <b>interactive run controller (IRC)</b> أو الـ debugger علشان تلاقي الأخطاء وتصلحها.<br>(8) استخدم <b>graphical interfaces</b> علشان تمثل الموديل بالرسم، وده بيسهّل فهمه.",
      "الـ <b>IRC أو الـ debugger</b> بيساعد بالطرق دي:<br>(a) نقدر <b>نراقب (monitor)</b> الـ simulation وهي ماشية، بإننا نقدّمها لوقت معين وبعدين نعرض معلومات الموديل.<br>(b) نقدر <b>نركز على سطر أو كذا سطر من الـ logic</b> في procedure أو على entity معينة، مثلًا الـ simulation تقف كل مرة entity محددة تبقى active.<br>(c) نقدر نشوف <b>قيم مكونات معينة في الموديل</b>.<br>(d) نقدر <b>نوقف الـ simulation مؤقتًا (pause)</b> علشان نشوف معلومات، أو نغير قيم، أو نوجّه الـ entities لمكان تاني.",
      "الإحصائيات القياسية (زي الـ average waiting time والـ average queue length وغيرها) <b>بتتجمع أوتوماتيك</b> في لغات الـ simulation، فعرض كل الإحصائيات اللي تهمنا مش بياخد وقت."
     ]
    },
    {
     "h": "إحصائيات بتوضح هل الموديل منطقي",
     "pts": [
      "فيه مجموعتين إحصائيات بيوضحوا هل الموديل منطقي (reasonableness):<br>(1) الـ <b>Current contents</b>: عدد العناصر (items) الموجودة في كل مكون في السيستم <b>في لحظة معينة</b>.<br>(2) الـ <b>Total count</b>: إجمالي عدد العناصر اللي <b>دخلت</b> كل مكون في السيستم <b>لحد وقت معين</b>.",
      "ممكن يكشفوا إيه:<br>• لو الـ <b>current contents عالية</b> في جزء من السيستم ← يبقى entities كتير متأخرة والـ <b>queue مش مستقرة (unstable)</b>.<br>• لو الـ <b>total count بصفر</b> لـ subsystem ← يبقى <b>مفيش ولا item دخل</b> الـ subsystem ده.<br>• لو الـ <b>current count والـ total count الاتنين بواحد</b> ← يبقى فيه entity <b>مسكت resource وعمرها ما سابته (never freed it)</b>."
     ]
    },
    {
     "h": "تلات تقنيات للـ verification: الـ common sense والـ documentation والـ trace",
     "pts": [
      "علشان نكتشف الأخطاء في الـ logic بتاع الموديل محتاجين تقييم دقيق. وفيه 3 تقنيات بتساعد:",
      "(1) الـ <b>Common sense technique</b>: بنتوقع <b>range معقول من القيم</b> لإحصائيات output معينة <b>قبل</b> ما نشغّل الموديل. وده بيقلل الـ discrepancies (الفروقات) والـ output الغريب.",
      "(2) الـ <b>Documentation</b>: تعليقات (comments) قصيرة، و<b>تعريف لكل الـ variables والـ parameters</b>، ووصف لكل جزء رئيسي في الـ computerized model. وده بيوضح الـ logic بتاع الموديل.",
      "(3) الـ <b>Trace</b> (تقنية أكثر تطورًا): ده printout مفصل من الكمبيوتر بيدي <b>قيمة كل variable كل مرة أي واحد فيهم يتغير</b>. والغرض منه إننا نعمل verification للبرنامج بإننا نعمل <b>حسابات يدوية (manual calculations)</b> مفصلة. وبسبب الوقت اللي بياخده، الـ trace run عادةً بيبقى <b>محدود (restricted)</b> يعني قصير، وممكن نعمل <b>selective trace</b> لأماكن معينة في الموديل.",
      "التوصية: <b>أول تقنيتين لازم يتعملوا دايمًا</b>. والفحص الدقيق للـ output علشان نشوف هل هو منطقي مفيد جدًا وبيدي معلومات كتير."
     ]
    },
    {
     "h": "المثال 7.1: إزاي الـ trace طلّع غلطة",
     "pts": [
      "عندنا موديل <bdi>single-server</bdi> queue اشتغل لمدة <b>16 time units</b>، ومتوسط طول الطابور بالنسبة للوقت (<bdi>time-average length of the waiting line</bdi>) طلع:<span class=\"ltr\"><b>L̂Q = 0.4375 customer</b></span>وده run قصير، فالـ analyst بيعمل verification مفصل بالـ trace (الجدول 7.1، صفحة 124).",
      "الـ variables هي: الـ <b>CLOCK</b> ساعة الـ simulation، والـ <b>EVTYP</b> نوع الـ event (start أو arrival أو departure أو stop)، والـ <b>NCUST</b> عدد الزباين في السيستم عند الوقت CLOCK، والـ <b>STATUS</b> حالة الـ server (القيمة 1 يعني busy والقيمة 0 يعني idle). وكل صف بيمثل الحالة بعد الـ event المكتوب جنبه مباشرةً.",
      "الغلطة: عند <b><bdi>CLOCK = 3</bdi></b> قيمة الـ NCUST بواحد بس الـ STATUS بصفر (idle). يعني فيه زبون في السيستم والـ server فاضي: ده <b>logic غلط (incorrect logic)</b>، يبقى لقينا error.",
      "الـ L̂Q بيتحسب من القانون اللي تحت باستخدام data الـ trace. والحساب اللي البرنامج عمله صح بالنسبة لقيم الـ STATUS اللي طبعها، بس النتيجة <b>غلط</b> لأن الـ attribute اللي اسمه STATUS ماكانش واخد القيمة الصح.",
      "نراجع الأرقام: الفترات الزمنية هي<span class=\"ltr\">0–3, 3–5, 5–11, 11–12, 12–16</span>وأطوالها<span class=\"ltr\">3, 2, 6, 1, 4 (sum 16)</span>وطول الطابور بيساوي<span class=\"ltr\">queue length = NCUST − STATUS → 0, 1, 0, 1, 1</span>وبالتالي<span class=\"ltr\">L̂Q = (0 + 2 + 0 + 1 + 4)/16 = 7/16 = 0.4375</span>",
      "‡ نفس الغلطة موجودة كمان عند <b><bdi>CLOCK = 11</bdi></b> (<bdi>NCUST = 1, STATUS = 0</bdi>)، مع إن النوتس شاورت على <bdi>CLOCK = 3</bdi> بس. ولو الـ STATUS كان صح (يعني قيمته 1 كل ما يكون <bdi>NCUST ≥ 1</bdi>)، فالفترة الوحيدة اللي فيها زبون مستني هي 12–16، والـ L̂Q كانت هتبقى:<span class=\"ltr\">L̂Q = 4/16 = <b>0.25</b></span>(ده حسابنا إحنا، مش موجود في النوتس)."
     ],
     "figH": {
      "ms-vv-trace": "تتبّع المثال 7.1: الـ clock بيتحرك event ورا event، والـ error بيبان، والـ L̂Q بيتجمع"
     }
    },
    {
     "h": "الـ Calibration والـ validation (الجزء 7.3)",
     "pts": [
      "الـ verification والـ validation عادةً بيتعملوا <b>في نفس الوقت</b>، بس الـ <b>validation</b> هي العملية الشاملة اللي <b>بنقارن فيها الموديل وسلوكه بالسيستم الحقيقي</b>.",
      "الـ <b>Calibration</b> هي العملية الـ <b>iterative</b> اللي بنقارن فيها الموديل بالسيستم الحقيقي، ونعمل تعديلات، ونقارن الموديل المعدل بالواقع، ونعمل تعديلات تاني، ونقارن تاني.",
      "مقارنة الموديل بالواقع بتستخدم:<br>(1) الـ <b>Subjective tests</b>: ناس فاهمين جانب أو أكتر من السيستم <b>بيحكموا</b> على الموديل والـ output بتاعه.<br>(2) الـ <b>Objective tests</b>: محتاجة <b>data عن سلوك السيستم</b> و<b>الـ data المقابلة اللي الموديل طلعها</b>.",
      "الشكل 7.2 (صفحة 126، العملية الـ iterative لعمل calibration للموديل): الـ <b>Real system</b> (شكل بيضاوي طويل) على الشمال؛ وعلى اليمين عمود فيه:<span class=\"ltr\"><b>Initial model</b> → Revise → <b>First revision of model</b> → Revise → <b>Second revision of model</b> → Revise</span>وكل موديل متوصل بالـ real system بسهم مزدوج مكتوب عليه:<span class=\"ltr\"><b>Compare model to reality</b> / <b>Compare revised model to reality</b> / <b>Compare second revision to reality</b></span>",
      "المقارنة والتعديل للـ conceptual model والـ operational model بيفضلوا مستمرين <b>لحد ما نحكم إن الموديل دقيق</b>.",
      "<b>النقد (Criticism)</b> اللي على الـ calibration: ممكن نوقف بمجرد ما الموديل يبقى <b><bdi>“fit”</bdi> على data set واحدة</b>. الحل: نجمع <b>data set جديدة (تانية)</b> من السيستم ونستخدمها في الـ <b>final validation</b> بعد ما نعمل calibration بالـ data الأصلية. ولو فيه فرق (discrepancy)، نرجع للـ calibration ونعدل الموديل لحد ما يبقى مقبول.",
      "كل revision بتكلف <b>وقت وفلوس ومجهود</b>. فالـ modeler بيوازن بين الزيادة في الدقة وتكلفة validation زيادة. ولو الدقة المطلوبة ماتحققتش في حدود الـ budget، يا إما <b>نقلل مستوى الدقة يا إما نرفض الموديل</b>.",
      "الـ approach بتاع <b>Naylor and Finger [1967]</b> للـ validation من 3 خطوات:<br>(1) نبني موديل عنده <b>face validity عالية</b>.<br>(2) نعمل <b>validation للـ model assumptions</b>.<br>(3) <b>نقارن الـ <bdi>input-output</bdi> transformations بتاعة الموديل</b> بالـ <bdi>input-output</bdi> transformations المقابلة في السيستم الحقيقي."
     ],
     "figH": {
      "ms-vv-calib": "شكل 7.2 خطوة بخطوة: نقارن بالواقع ونعدّل ونقارن تاني",
      "ms-vv-naylor": "خطوات Naylor and Finger التلاتة، وكل خطوة في أنهي جزء"
     }
    },
    {
     "h": "الـ Face validity (الجزء 7.3.1)",
     "pts": [
      "لازم الـ <b>potential users</b> (المستخدمين المتوقعين) يشاركوا في بناء الموديل <b>من أول الـ conceptualization لحد الـ implementation</b>، علشان الواقع يتبني جوه الموديل من خلال assumptions عن تركيب السيستم وdata موثوقة.",
      "مميزات إننا نشرك الـ potential users:<br>(1) يقدروا <b>يقيّموا الـ output ويشوفوا هل هو منطقي</b> ويساعدوا في اكتشاف العيوب (deficiencies)، فيبقوا جزء من الـ calibration وإحنا بنحسن الموديل.<br>(2) الـ <b>perceived validity (credibility)</b> بتاعة الموديل بتزيد، فالمدير يثق في نتايج الـ simulation ويعتمد عليها في اتخاذ القرار.",
      "الـ <b>Sensitivity analysis</b> كمان ممكن تختبر الـ face validity: بنسأل الـ user هل الموديل <b>بيتصرف بالشكل المتوقع لما نغير input variable واحد أو أكتر</b>. والاتنين، الـ user والـ builder، بيحكموا على ده من خبرتهم وملاحظتهم للسيستم الحقيقي.",
      "الموديلات الكبيرة (<bdi>large-scale</bdi>) فيها input variables كتير، فممكن نعمل sensitivity tests كتير. ولو الاختبار غالي أو بياخد وقت كبير، الـ builder بيختار <b>أهم الـ input variables (most critical)</b>."
     ]
    },
    {
     "h": "الـ Validation بتاعة الـ model assumptions (الجزء 7.3.2)",
     "pts": [
      "الـ model assumptions بتتقسم <b>نوعين عامين</b>: الـ structural assumptions والـ data assumptions.",
      "(1) الـ <b>Structural assumptions</b>: أسئلة عن <b>السيستم بيشتغل إزاي</b>، مع التبسيطات والـ abstractions اللي بنعملها للواقع.",
      "مثال البنك (structural): الزباين بيعملوا queue لكل teller ويتخدموا بنظام <bdi>first-come, first-served</bdi>؛ ولو فيه queues كتير ممكن الزبون ينقل للطابور اللي ماشي أسرع؛ وعدد الـ tellers ثابت أو متغير. والحاجات دي بنتأكد منها عن طريق <b>الملاحظة على فترات منتظمة</b> و<b>النقاش مع المديرين والـ tellers</b> عن سياسات البنك وإزاي بتتطبق.",
      "(2) الـ <b>Data assumptions</b>: إننا نجمع <b>data موثوقة (reliable)</b> ونعمل عليها <b>تحليل إحصائي صح</b>.",
      "مثال البنك (الـ data اللي اتجمعت):<br>(1) الـ interarrival times للزباين في كذا فترة مدتها ساعتين وقت الزحمة (peak loading).<br>(2) الـ interarrival times في فترة الهدوء (slack period).<br>(3) الـ service times للحسابات التجارية (commercial accounts).<br>(4) الـ service times للحسابات الشخصية (personal accounts).",
      "موثوقية الـ data بنتأكد منها بإننا نسأل مديرين البنك، وهم بيحددوا أوقات الهدوء والزحمة المعتادة. ولما <b>ندمج (combine)</b> اتنين أو أكتر من الـ data sets، بنعمل statistical test موضوعي للـ <b>homogeneity</b> (التجانس). وممكن نعمل tests زيادة نشوف فيه <b>correlation</b> في الـ data ولا لأ. والتحليل الإحصائي بيبدأ لما الـ analyst يتأكد إن الـ data دي <b>random sample</b>.",
      "التحليل ليه <b>3 خطوات</b>:<br>(1) <b>نحدد (identify)</b> الـ probability distribution المناسب.<br>(2) <b>نقدّر الـ parameters</b> بتاعة الـ distribution اللي افترضناه.<br>(3) نعمل <b>validation</b> باستخدام <b><bdi>goodness-of-fit</bdi> tests</b> (<bdi>chi-square</bdi> أو <bdi>Kolmogorov-Smirnov</bdi>) وبالطرق البيانية (graphical methods).",
      "ملحوظة: الـ <bdi>goodness-of-fit</bdi> tests <b>جزء مهم من الـ validation بتاع الـ model assumptions</b> (شوف المحاضرة 6 بتاعة الـ Input Modeling)."
     ]
    },
    {
     "h": "الـ Validation للـ <bdi>input-output</bdi> transformations (الجزء 7.3.3)",
     "pts": [
      "بنبص للموديل على إنه <b><bdi>input-output</bdi> transformation</b>: بياخد قيم الـ input parameters ويحولها لـ <b>output measures of performance</b> (مقاييس أداء).",
      "الـ modeler بيجمع <b>اتنين data sets</b>: واحدة بيستخدمها وهو بيطور الموديل ويعمله calibration، والتانية (لو محتاجينها) للـ <b>final validation test</b>.",
      "الـ <b>main responses of interest</b> (أهم الـ responses اللي تهمنا) هي اللي لازم تبقى المعايير (criteria) اللي نعمل بيها validation للموديل.",
      "<b>شرط ضروري (Necessary condition)</b>: لازم يكون فيه نسخة من السيستم اللي بندرسه <b>موجودة فعلًا</b>، علشان نقدر نجمع data (على الأقل set واحدة من الـ input conditions) ونقارنها بتوقعات الموديل. ولو السيستم لسه في <b>مرحلة التخطيط (planning stage)</b> ومفيش operating data، يبقى <b>الـ <bdi>input-output</bdi> validation الكاملة مش ممكنة</b>.",
      "موديل لـ <b>سيستم مقترح مش موجود (<bdi>non-existent</bdi> proposed system)</b>، أو لسيستم موجود تحت input conditions جديدة:<br>• الـ responses بتاعة الموديلين (الموجود والمقترح) تحت input conditions متشابهة هي اللي بنستخدمها كمعايير للمقارنة.<br>• في أغلب الحالات السيستم المقترح بيبقى <b>تعديل (modification)</b> على الموجود، فالـ modeler بيتمنى إن الثقة في الموديل القديم <b>تتنقل (transferred)</b> للجديد. وده يبقى مبرر بس لو الموديل الجديد <b>تعديل بسيط نسبيًا (minor modification)</b> على الـ computerized representation القديم.",
      "لو التغييرات <b>بسيطة (minor)</b>، نقدر نعملها verification بعناية ونقبل الـ output بتاع الموديل الجديد بثقة.",
      "أما لو التغييرات <b>كبيرة (major)</b>، ولو فيه subsystem شبهه موجود في مكان تاني، نقدر نعمل validation للـ <bdi>sub-model</bdi> بتاعه وبعدين ندمجه مع <bdi>sub-models</bdi> تانية متعمللها validation علشان نبني الموديل الكامل: وده <b>partial validation</b> للتغييرات الكبيرة.",
      "<b>مفيش أي طريقة نعمل بيها validation كاملة</b> للـ <bdi>input-output</bdi> transformations بتاعة موديل لـ <b>سيستم مش موجود</b>. وفي حدود الوقت والـ budget، الـ modeler لازم يستخدم أكبر عدد ممكن من التقنيات، ومنها <bdi>input-output</bdi> validation للـ subsystem models لما نقدر نجمع الـ operating data بتاعتها."
     ]
    },
    {
     "h": "الـ <bdi>input-output</bdi> validation باستخدام historical input data (الجزء 7.3.4)",
     "pts": [
      "كل الـ input data (<bdi>Aₙ, Sₙ, ...</bdi>) وكل الـ system response data (زي متوسط الـ delay <bdi>Z₂</bdi>) لازم تتجمع <b>في نفس الفترة الزمنية</b>. وإلا المقارنة بين responses الموديل والسيستم ممكن تبقى <b>مضللة (misleading)</b>، لأن الـ responses بتعتمد على الـ inputs وعلى تركيب السيستم أو الموديل الاتنين.",
      "ده <b>صعب في السيستمات الكبيرة</b> علشان محتاجين <b>نجمع الـ data في نفس الوقت (simultaneous data collection)</b>؛ والعدادات والأجهزة الإلكترونية بتسهّل جمع الـ data.",
      "الـ modeler بيتمنى إن الـ simulation تبقى <b>نسخة طبق الأصل (replica) من السيستم الحقيقي</b>؛ ومستوى الدقة بيتحدد بحكم الاتنين: <b>الـ model builder والـ model user</b>."
     ]
    },
    {
     "h": "الـ <bdi>input-output</bdi> validation باستخدام Turing test (الجزء 7.3.5)",
     "pts": [
      "بنستخدمه لما <b>مايكونش فيه statistical test ينفع بسهولة</b>: ناس <b>فاهمين سلوك السيستم كويس</b> بيقارنوا الـ output بتاع الموديل بالـ output بتاع السيستم.",
      "مثال: بنجهز <b>5 تقارير حقيقية</b> عن أداء السيستم في 5 أيام مختلفة، ونستخدم output الـ simulation علشان نطلع <b>5 تقارير مزيفة (fake)</b>، فيبقى عندنا <b>10 تقارير</b> بنفس الشكل بالظبط. و<b>بنخلطهم عشوائيًا (shuffle)</b> ونديهم لـ engineer يحدد مين المزيف ومين الحقيقي.",
      "لو الـ engineer <b>عرف يطلع التقارير المزيفة</b>، الـ model builder بيسأله ويستخدم المعلومات دي علشان <b>يحسّن الموديل</b>. ولو الـ engineer <b>ماقدرش يفرّق</b> بينهم، الـ modeler بيستنتج إن الموديل <b>كافي (adequate)</b>.",
      "الـ <b>Turing test</b> أداة قيمة لاكتشاف عيوب الموديل (inadequacies) وزيادة الـ credibility بتاعته."
     ],
     "figH": {
      "ms-vv-turing": "الـ Turing test: خمس تقارير real وخمسة fake بيتلخبطوا ويحكم عليهم engineer"
     }
    },
    {
     "h": "الربط بالمحاضرة 1: الـ verification والـ validation في الـ simulation study",
     "pts": [
      "في الـ 12 خطوة بتوع الـ simulation study (المحاضرة 1، الـ slides من 59 لـ 60)، <b>الخطوة 6 <bdi>Verified?</bdi></b> بتسأل: <b><bdi>Does the program do what the model describes?</bdi></b> يعني البرنامج بيعمل اللي الموديل بيوصفه؟ وفي الـ flowchart (الـ slide 60)، لو الإجابة No نرجع للخطوة 5 (الـ model translation).",
      "<b>الخطوة 7 <bdi>Validated?</bdi></b> (الـ slide 59) بتسأل: <b><bdi>Do the results match the reality? Calibration?</bdi></b> يعني النتايج مطابقة للواقع؟ ومحتاجين calibration؟ وفي الحالات اللي مفيش فيها سيستم حقيقي في الواقع بيبقى <b>صعب نعمل validation</b>. وفي الـ flowchart (الـ slide 60)، لو No نرجع للخطوة 3 (الـ model conceptualization) والخطوة 4 (الـ data collection)؛ ولو Yes نكمل للخطوة 8 (الـ experimental design).",
      "الـ slide 60 (المحاضرة 1): الخطوات من 3 لـ 7 بتكوّن <b><bdi>Phase 2: Model building and data collection</bdi></b>. و<b>أهم خطوة (the most crucial) هي الـ validation</b>: لو الموديل invalid، النتايج ممكن توصّلنا لـ <b>قرارات خطيرة وغالية</b>.",
      "الـ slide 18 (المحاضرة 1): الـ simulation <b>مش مناسبة</b> لما الـ simulation <b>مانقدرش نعملها verification أو validation</b>.",
      "الـ slide 47 (المحاضرة 1): الـ <b>Verified</b> والـ <b>Credibility</b> من معايير الموديل الكويس (مع الـ simplicity والـ efficiency والـ availability والـ code quality والـ documentation)."
     ],
     "figH": {
      "ms-vv-study": "جرّب الـ checks الاتنين (Verified? و Validated?) في الخطوات من 3 لـ 8 في الـ simulation study"
     }
    }
   ],
   "cards": [
    "معناها <b>building the model right</b> (بنبني الموديل <b>صح</b>): بنتأكد إن الـ conceptual model متمثل بدقة في الـ operational (computerized) model.",
    "معناها <b>building the right model</b> (بنبني الموديل <b>الصح</b>): بنتأكد إن الموديل تمثيل دقيق للسيستم الحقيقي.",
    "(1) موديل بيمثل السلوك الحقيقي للسيستم ونقدر نستخدمه بديل للسيستم الحقيقي في التجارب.<br>(2) نزوّد الـ acceptance والـ credibility بتوع الموديل علشان المديرين وصناع القرار يستخدموه.",
    "العملية الـ iterative اللي بنقارن فيها الموديل بالسيستم الحقيقي، ونعدله، ونقارن الموديل المعدل تاني، وهكذا لحد ما الدقة تبقى مقبولة.",
    "(1) نراقب السيستم الحقيقي والـ interactions بين مكوناته، ونجمع data.<br>(2) نبني conceptual model (فيه assumptions وhypotheses عن الـ input parameters).<br>(3) نترجمه لـ computerized model.",
    "اللي بين الـ real system والـ conceptual model اسمه <b>conceptual validation</b>، واللي بين الـ conceptual والـ operational model اسمه <b>model verification</b>، والـ loop الكبيرة كلها اسمها <b>calibration and validation</b>.",
    "ده debugger بيخليك تراقب الـ run، وتركز على سطور من الـ logic أو على entity معينة، وتشوف قيم مختارة، وتوقف مؤقتًا (pause) علشان تشوف أو تغير قيم أو توجه الـ entities لمكان تاني.",
    "الـ Current contents: عدد العناصر في كل مكون <b>في لحظة معينة</b>. والـ Total count: عدد العناصر اللي <b>دخلت</b> كل مكون <b>لحد وقت معين</b>.",
    "يعني فيه entity مسكت resource وعمرها ما سابته (never freed it).",
    "يعني مفيش ولا item دخل الـ subsystem ده.",
    "(1) الـ Common sense technique (نتوقع range معقول للـ output قبل التشغيل).<br>(2) الـ Documentation.<br>(3) الـ Trace. وأول اتنين لازم يتعملوا دايمًا.",
    "هو printout مفصل بيدي قيمة كل variable كل مرة تتغير، وبنستخدمه علشان نعمل verification للبرنامج بالحساب اليدوي؛ وعادةً بيبقى run قصير، أو selective trace.",
    "عند <bdi>CLOCK = 3</bdi> كان <bdi>NCUST = 1</bdi> بس <bdi>STATUS = 0</bdi>: يعني فيه زبون في السيستم والـ server فاضي (idle).",
    "القانون:<span class=\"ltr\">L̂Q = (1/T) Σ i·TᵢQ</span>وده متوسط عدد الزباين في الطابور بالنسبة للوقت (<bdi>time-average number in queue</bdi>). وفي المثال 7.1:<span class=\"ltr\">7/16 = 0.4375</span>",
    "الـ Subjective: ناس فاهمة السيستم بيحكموا على الموديل والـ output بتاعه. والـ Objective: بيقارن data سلوك السيستم بالـ data المقابلة من الموديل.",
    "(1) نبني موديل عنده face validity عالية.<br>(2) نعمل validation للـ model assumptions.<br>(3) نقارن الـ <bdi>input-output</bdi> transformations بتاعة الموديل باللي في السيستم الحقيقي.",
    "إننا نشرك الـ potential users من الـ conceptualization لحد الـ implementation علشان الواقع يتبني جوه الموديل والموديل يبان لهم منطقي؛ وممكن نختبرها بالـ sensitivity analysis.",
    "بنسأل هل الموديل بيتصرف بالشكل المتوقع لما نغير input variable واحد أو أكتر.",
    "الـ Structural assumptions (السيستم بيشتغل إزاي) والـ data assumptions (data موثوقة وتحليل إحصائي صح).",
    "(1) نحدد الـ distribution.<br>(2) نقدّر الـ parameters بتاعته.<br>(3) نعمل validation بـ <bdi>goodness-of-fit</bdi> tests (<bdi>chi-square</bdi> و<bdi>Kolmogorov-Smirnov</bdi>) وبالرسومات.",
    "لازم يكون فيه نسخة من السيستم موجودة علشان نجمع data؛ ولو السيستم لسه في مرحلة التخطيط (planning stage) يبقى الـ <bdi>input-output</bdi> validation الكاملة مش ممكنة.",
    "كل الـ input data وكل الـ system response data لازم تتجمع في <b>نفس الفترة الزمنية</b>.",
    "تقارير حقيقية وتقارير طالعة من الموديل بنفس الشكل بنخلطهم ونديهم لخبير؛ ولو ماقدرش يفرّق بينهم، بنحكم إن الموديل كافي (adequate).",
    "ممكن الموديل يبقى fit على data set واحدة بس. الحل: نستخدم data set تانية جديدة للـ final validation.",
    "الـ Validation: لأن الموديل الـ invalid ممكن يوصّلنا لقرارات خطيرة وغالية."
   ],
   "qa": [
    "الـ <b>Verification</b> معناها building the model right: بتتأكد إن الـ conceptual model متمثل بدقة في الـ operational (computerized) model، يعني البرنامج بيعمل اللي الموديل بيوصفه.<br>الـ <b>Validation</b> معناها building the right model: بتتأكد إن الموديل تمثيل دقيق للسيستم الحقيقي. وبتتحقق عن طريق الـ calibration، وهي عملية iterative بنقارن فيها الموديل بسلوك السيستم الحقيقي ونعدله لحد ما الدقة تبقى مقبولة.",
    "الـ validation عملية من شقين:<br>(1) نطلع موديل بيمثل السلوك الحقيقي للسيستم، علشان يبقى بديل للسيستم الحقيقي في التجارب.<br>(2) نزوّد الـ acceptance والـ credibility بتوع الموديل، علشان المديرين وصناع القرار يستخدموه.",
    "الخطوة 1: نراقب السيستم الحقيقي والـ interactions بين مكوناته، ونجمع data عن سلوكه (ونسأل الناس اللي عارفين السيستم).<br>الخطوة 2: نبني conceptual model: فيه assumptions عن المكونات والتركيب، وhypotheses عن قيم الـ input parameters.<br>الخطوة 3: نترجمه لشكل الكمبيوتر يفهمه (computerized model).<br>الشكل 7.1:<span class=\"ltr\">Real system ↔ (conceptual validation) ↔ Conceptual model ↔ (model verification) ↔ Operational model (computerized representation)</span>ومعاهم loop للـ calibration والـ validation من الـ operational model راجعة للـ conceptual model والـ real system. والعملية مش linear؛ الـ builder بيرجع للخطوات كذا مرة.",
    "(1) خلّي حد غير اللي عمل الـ computerized model يراجعه.<br>(2) اعمل flow diagram للـ logic.<br>(3) افحص الـ output وشوف هل هو منطقي مع إعدادات input مختلفة.<br>(4) اطبع الـ input parameters في آخر الـ run علشان تتأكد إنها ماتغيرتش.<br>(5) خلّي الموديل <bdi>self-documenting</bdi> على قد ما تقدر.<br>(6) لو فيه animation، اتأكد إنها بتعكس السيستم الحقيقي.<br>(7) استخدم الـ interactive run controller (IRC) أو الـ debugger: تراقب الـ run، وتركز على سطور logic أو entity، وتشوف قيم مختارة، وتوقف مؤقتًا علشان تشوف وتغير قيم أو توجه الـ entities.<br>(8) استخدم graphical interfaces علشان تسهّل الفهم.",
    "الـ <b>Current contents</b>: عدد العناصر في كل مكون في لحظة معينة. والـ <b>Total count</b>: إجمالي عدد العناصر اللي دخلت كل مكون لحد وقت معين.<br>• الـ current contents العالية في جزء من السيستم ← entities كتير متأخرة والـ queue مش مستقرة.<br>• الـ total count بصفر لـ subsystem ← مفيش حاجة دخلته.<br>• الـ current count والـ total count الاتنين بواحد ← فيه entity مسكت resource وعمرها ما سابته.",
    "(1) الـ <b>Common sense technique</b>: نتوقع range معقول لإحصائيات output مختارة قبل ما نشغّل الموديل، وده بيقلل الـ discrepancies والـ output الغريب.<br>(2) الـ <b>Documentation</b>: تعليقات قصيرة، وتعريف لكل الـ variables والـ parameters، ووصف لكل جزء رئيسي؛ وبتوضح الـ logic بتاع الموديل.<br>(3) الـ <b>Trace</b>: هو printout مفصل لكل variable كل مرة يتغير، بنستخدمه نعمل verification للبرنامج بالحساب اليدوي؛ وعادةً بيبقى محدود بـ run قصير أو selective trace.<br>وأول اتنين لازم يتعملوا دايمًا.",
    "فترات الـ trace (والقيمتين بين القوسين هما NCUST وSTATUS):<span class=\"ltr\">0–3 (0, 0), 3–5 (1, 0), 5–11 (0, 0), 11–12 (1, 0), 12–16 (2, 1)</span>وطول الطابور:<span class=\"ltr\">queue length = NCUST − STATUS</span>وبالتالي:<span class=\"ltr\">L̂Q = (1/T) Σ i·TᵢQ = [(0)3 + (1)2 + (0)6 + (1)1 + (1)4] / (3+2+6+1+4) = 7/16 = <b>0.4375</b></span>الغلطة: عند <bdi>CLOCK = 3</bdi> فيه زبون واحد في السيستم بس الـ server فاضي (<bdi>STATUS = 0</bdi>)، وده logic غلط. البرنامج حسب الـ L̂Q صح من قيم الـ STATUS، بس القيمة غلط لأن الـ STATUS نفسه كان غلط. (ونفس المشكلة باينة كمان عند <bdi>CLOCK = 11</bdi>؛ ولو قيم الـ STATUS كانت صح كان الـ L̂Q هيطلع <bdi>4/16 = 0.25</bdi>.)",
    "الـ Calibration هي العملية الـ iterative اللي بنقارن فيها الموديل بالسيستم الحقيقي، ونعدله، ونقارن الموديل المعدل بالواقع، ونعدل تاني، وهكذا لحد ما نحكم إن الموديل دقيق. والشكل 7.2 بيوضحها، وكل نسخة فيه بتتقارن بالسيستم الحقيقي:<span class=\"ltr\">initial model → first revision → second revision</span>النقد: ممكن نوقف بمجرد ما الموديل يبقى fit على data set واحدة. الحل: نجمع data set جديدة من السيستم؛ وبعد ما نعمل calibration بالـ data الأصلية، نعمل الـ final validation بالـ data set التانية، ولو فيه فرق نرجع للـ calibration. ولأن كل revision بتكلف وقت وفلوس، لو الدقة ماتحققتش في حدود الـ budget، نقلل مستوى الدقة أو نرفض الموديل.",
    "(1) نبني موديل عنده face validity عالية.<br>(2) نعمل validation للـ model assumptions.<br>(3) نقارن الـ <bdi>input-output</bdi> transformations بتاعة الموديل باللي في السيستم الحقيقي.<br>الـ <b>Face validity</b>: الـ potential users بيشاركوا من الـ conceptualization لحد الـ implementation، علشان الواقع يتبني جوه الموديل. وبيقيّموا الـ output ويشوفوا هل هو منطقي ويساعدوا يلاقوا العيوب (فيبقوا جزء من الـ calibration)، والـ credibility بتاعة الموديل بتزيد فالمديرين يثقوا في نتايجه. والـ Sensitivity analysis كمان بتختبر الـ face validity: هل الموديل بيتصرف زي ما متوقع لما الـ inputs تتغير؟ وفي الموديلات الكبيرة، بنختبر أهم الـ inputs (most critical).",
    "الـ <b>Structural assumptions</b>: السيستم بيشتغل إزاي. في البنك: queue لكل teller، وخدمة FCFS، والزبون ممكن ينط لطابور أسرع، وعدد الـ tellers ثابت أو متغير؛ وبنتأكد منها بالملاحظة والنقاش مع المديرين والـ tellers.<br>الـ <b>Data assumptions</b>: يعني data موثوقة وتحليل إحصائي صح. في البنك: الـ interarrival times في فترات الزحمة اللي مدتها ساعتين، والـ interarrival times في فترات الهدوء، والـ service times للحسابات التجارية، والـ service times للحسابات الشخصية. والـ data sets اللي بتتدمج بنعملها test للـ homogeneity (وللـ correlation). والتحليل: نحدد الـ distribution، ونقدّر الـ parameters بتاعته، ونعمل validation بـ <bdi>goodness-of-fit</bdi> tests (<bdi>chi-square</bdi> و<bdi>Kolmogorov-Smirnov</bdi>) وبالرسومات.",
    "الـ <bdi>input-output</bdi> validation الكاملة مستحيلة لأن مفيش operating data. بدل كده: نقارن responses الموديل الموجود والموديل المقترح تحت inputs متشابهة؛ وننقل الثقة من الموديل المتعمله validation للسيستم الموجود لما يكون الموديل الجديد تعديل بسيط بس (التغييرات البسيطة: parameter رقمي واحد زي الـ arrival rate، أو statistical distribution زي الـ service time). وللتغييرات الكبيرة (الـ logical structure بتاع subsystem زي الـ queue discipline، أو design جديد زي inventory control متعمل computerized)، بنعمل validation لـ <bdi>sub-models</bdi> بتاعة subsystems شبهها موجودة في أماكن تانية وندمجهم (partial validation). ونستخدم أكبر عدد من التقنيات يسمح بيه الوقت والـ budget.",
    "الـ <b>Historical input data</b>: بندّي الموديل الـ inputs الحقيقية (<bdi>Aₙ, Sₙ, ...</bdi>) ونقارن الـ responses بتاعته (زي متوسط الـ delay <bdi>Z₂</bdi>) باللي طلع من السيستم؛ ولازم كل الـ inputs والـ responses تتجمع في نفس الفترة الزمنية، وإلا المقارنة تبقى مضللة. وده صعب في السيستمات الكبيرة (لازم نجمع في نفس الوقت). والدقة بيحكم عليها الـ builder والـ user.<br>الـ <b>Turing test</b>: بنستخدمه لما مفيش statistical test ينفع. مثلًا 5 تقارير يومية حقيقية و5 تقارير مزيفة من output الموديل، بنفس الشكل، بنخلطهم ونديهم لـ engineer. لو عرف يطلع المزيفين، الـ builder يتعلم منه ويحسن الموديل؛ ولو ماعرفش، بنحكم إن الموديل كافي (adequate).",
    "الـ <b>Face validity</b> هي أول خطوة في الـ approach بتاع Naylor and Finger للـ validation اللي من 3 خطوات:<br>(1) نبني موديل عنده face validity عالية.<br>(2) نعمل validation للـ model assumptions.<br>(3) نقارن الـ <bdi>input-output</bdi> transformation بتاعة الموديل بالـ <bdi>input-output</bdi> transformation المقابلة في السيستم الحقيقي.<br>علشان نبني موديل عنده face validity عالية، لازم الـ <b>potential users</b> يشاركوا في بنائه <b>من أول الـ conceptualization لحد الـ implementation</b>، علشان الواقع يتبني جوه الموديل من خلال assumptions عن تركيب السيستم وdata موثوقة.<br>مميزات إننا نشرك الـ potential users:<br>(1) يقدروا يقيّموا الـ output ويشوفوا هل هو منطقي ويساعدوا يلاقوا العيوب، فيبقوا جزء من الـ calibration وإحنا بنحسن الموديل خطوة بخطوة.<br>(2) الـ perceived validity (credibility) بتاعة الموديل بتزيد، فالمدير يثق في نتايج الـ simulation كأساس لاتخاذ القرار.<br>الـ <b>Sensitivity analysis</b> كمان ممكن تختبر الـ face validity: بنسأل الـ user هل الموديل بيتصرف بالشكل المتوقع لما نغير input variable واحد أو أكتر. وفي الموديلات الكبيرة اللي فيها inputs كتير، الـ builder بيختبر أهم الـ input variables لو الاختبار غالي أو بياخد وقت كبير.<br>(الإجابة النموذجية في الشيت بتعرّف بس الـ verification، يعني building the model right، والـ validation، يعني building the right model؛ والـ face validity هي الجزء من الـ validation اللي اتشرح فوق، <bdi>L7, 7.3.1</bdi>.)"
   ],
   "quiz": [
    [
     "صح. الـ verification بتتأكد إن الـ conceptual model متمثل بدقة في الـ computerized model.",
     "ده الـ validation <bdi>(L7, Why verification and validation matter)</bdi>.",
     "دي الخطوة 1 من الـ model building <bdi>(L7, 7.1)</bdi>.",
     "ده الـ experimental design، الخطوة 8 في الـ simulation study <bdi>(L1)</bdi>."
    ],
    [
     "مقارنة البرنامج بالـ conceptual model دي verification <bdi>(L7, 7.2)</bdi>.",
     "صح. الـ validation بتتأكد إن الموديل تمثيل دقيق للسيستم الحقيقي.",
     "الـ flow diagram أداة بتساعد في الـ verification <bdi>(L7, 7.2)</bdi>.",
     "إن حد تاني يراجع الكود دي من حاجات الـ verification <bdi>(L7, 7.2)</bdi>."
    ],
    [
     "الـ Conceptual validation بتربط الـ real system بالـ conceptual model <bdi>(L7, 7.1)</bdi>.",
     "صح. الـ verification بتراجع الـ computerized model على الـ conceptual model.",
     "دي الـ loop اللي راجعة للـ real system <bdi>(L7, 7.1)</bdi>.",
     "الـ Turing test طريقة من طرق الـ <bdi>input-output</bdi> validation <bdi>(L7, 7.3.5)</bdi>."
    ],
    [
     "الـ queue الغير مستقرة بتبان من الـ current contents العالية <bdi>(L7, Statistics that show model reasonableness)</bdi>.",
     "ده بيبان من الـ total count لما يبقى بصفر <bdi>(L7, Statistics that show model reasonableness)</bdi>.",
     "صح.",
     "الإحصائيات دي verification checks مش validation <bdi>(L7, 7.2)</bdi>."
    ],
    [
     "الـ Trace بيطبع كل تغيير في أي variable أثناء الـ run <bdi>(L7, Three verification techniques)</bdi>.",
     "الـ Documentation فيها comments وتعريفات للـ variables ووصف للأجزاء <bdi>(L7, Three verification techniques)</bdi>.",
     "صح. وبتقلل الـ discrepancies والـ output الغريب.",
     "الـ Turing test طريقة validation بتعتمد على خبرا <bdi>(L7, 7.3.5)</bdi>."
    ],
    [
     "صح. وبنستخدمه نعمل verification للبرنامج بحسابات يدوية مفصلة.",
     "الجملة صح <bdi>(L7, Three verification techniques)</bdi>."
    ],
    [
     "الـ Trace تقنية أكثر تطورًا بس عادةً بيبقى محدود بسبب الوقت <bdi>(L7, Three verification techniques)</bdi>.",
     "صح. النوتس بتوصي إن أول اتنين يتعملوا دايمًا.",
     "الـ Trace مش مطلوب كل مرة <bdi>(L7, Three verification techniques)</bdi>.",
     "أول اتنين بيتوصى بيهم دايمًا <bdi>(L7, Three verification techniques)</bdi>."
    ],
    [
     "في الـ <bdi>single-server</bdi> queue، الزبون اللي بيوصل والـ server فاضي بيبدأ خدمته على طول، فالـ STATUS المفروض يبقى 1 <bdi>(L7, Example 7.1)</bdi>.",
     "صح. ده logic غلط، يعني لقينا error.",
     "قيم الـ clock بتزيد بشكل طبيعي <bdi>(L7, Example 7.1)</bdi>:<span class=\"ltr\">0, 3, 5, 11, 12, 16</span>",
     "الـ run قصير (16 time units)، وعلشان كده الـ trace عملي <bdi>(L7, Example 7.1)</bdi>."
    ],
    [
     "الـ Calibration بتتكرر، مش مقارنة واحدة <bdi>(L7, 7.3)</bdi>.",
     "صح (الشكل 7.2).",
     "ده الـ model translation، الخطوة 3 من الـ model building <bdi>(L7, 7.1)</bdi>.",
     "دي من حاجات الـ verification <bdi>(L7, 7.2)</bdi>."
    ],
    [
     "ده objective test <bdi>(L7, 7.3)</bdi>.",
     "صح.",
     "الـ trace تقنية verification <bdi>(L7, Three verification techniques)</bdi>.",
     "الـ <bdi>chi-square</bdi> ده <bdi>goodness-of-fit</bdi> test بنستخدمه نعمل validation للـ data assumptions <bdi>(L7, 7.3.2)</bdi>."
    ],
    [
     "دي الخطوة 1 <bdi>(L7, 7.3)</bdi>.",
     "دي الخطوة 2 <bdi>(L7, 7.3)</bdi>.",
     "دي الخطوة 3 <bdi>(L7, 7.3)</bdi>.",
     "صح. دي من حاجات الـ verification <bdi>(L7, 7.2)</bdi>، مش خطوة من خطوات Naylor and Finger."
    ],
    [
     "الـ Structural assumptions بتخص السيستم بيشتغل إزاي، زي queue لكل teller وFCFS <bdi>(L7, 7.3.2)</bdi>.",
     "صح. دي بتخص جمع data موثوقة وتحليلها صح.",
     "دي inputs للموديل، مش outputs <bdi>(L7, 7.3.3)</bdi>.",
     "الـ trace variables في المثال 7.1 هي CLOCK وEVTYP وNCUST وSTATUS <bdi>(L7, Example 7.1)</bdi>."
    ],
    [
     "السيستم ده مفيهوش operating data، فالـ <bdi>input-output</bdi> validation الكاملة مش ممكنة <bdi>(L7, 7.3.3)</bdi>.",
     "صح. الشرط الضروري إن يكون فيه نسخة من السيستم موجودة علشان نجمع data."
    ],
    [
     "صح.",
     "إعادة البناء أو التحسين بتحصل لما الـ engineer يعرف يطلع المزيفين <bdi>(L7, 7.3.5)</bdi>.",
     "الـ test بيفترض إن الشخص فاهم السيستم؛ وإنه مايعرفش يفرّق بينهم ده بيدعم الموديل <bdi>(L7, 7.3.5)</bdi>.",
     "الـ Turing test بنستخدمه بالظبط لما مايكونش فيه statistical test ينفع بسهولة <bdi>(L7, 7.3.5)</bdi>."
    ]
   ],
   "extra": [
    [
     "دي القيمة لو الـ STATUS كان صح (الفترة 12–16 بس فيها حد مستني):<span class=\"ltr\">4/16 = 0.25</span>",
     "صح.<span class=\"ltr\">[(0)3 + (1)2 + (0)6 + (1)1 + (1)4]/16 = 7/16 = 0.4375</span>",
     "ده متوسط العدد في السيستم بالنسبة للوقت، مش في الطابور:<span class=\"ltr\">Σ NCUST·Δt/16 = 11/16</span>",
     "الـ 7 ده البسط (المساحة تحت منحنى طول الطابور)؛ ولازم نقسمه على <bdi>T = 16</bdi>."
    ],
    [
     "دي القيمة اللي اتطبعت (الغلط) بناءً على الـ STATUS الغلط.",
     "صح. طول الطابور بصفر غير في الفترة 12–16 اللي بيبقى فيها 1، فـ:<span class=\"ltr\">L̂Q = 4/16 = 0.25</span>",
     "في الفترة 12–16 فيه 2 زباين وserver واحد، فزبون واحد بيستنى 4 time units.",
     "ده كان محتاج انتظار 2 time units بس؛ لكن الانتظار بيستمر 4 units (من 12 لـ 16)."
    ],
    [
     "عند <bdi>CLOCK = 5</bdi> كان <bdi>NCUST = 0</bdi> و<bdi>STATUS = 0</bdi>، وده متسق.",
     "صح. تاني <bdi>NCUST = 1</bdi> بس <bdi>STATUS = 0</bdi>: فيه زبون موجود والـ server فاضي.",
     "عند <bdi>CLOCK = 12</bdi> كان <bdi>NCUST = 2</bdi> و<bdi>STATUS = 1</bdi>، وده متسق.",
     "عند <bdi>CLOCK = 16</bdi> كان <bdi>NCUST = 1</bdi> و<bdi>STATUS = 1</bdi>، وده متسق."
    ],
    [
     "صح. ده بيأكد إن قيم الـ parameters ماتغيرتش ولا اتعدلت.",
     "الـ Turing test خبير بيقارن فيه تقارير الموديل بالتقارير الحقيقية <bdi>(L7, 7.3.5)</bdi>.",
     "الـ Sensitivity analysis بتختبر الـ face validity بإننا نغير الـ inputs <bdi>(L7, 7.3.1)</bdi>.",
     "الـ Homogeneity tests بنستخدمها لما ندمج data sets <bdi>(L7, 7.3.2)</bdi>."
    ],
    [
     "الـ total count بصفر معناه إن مفيش حاجة دخلت؛ هنا العناصر بتتكوم.",
     "صح.",
     "ده بيوضح entity واحدة ماسكة resource.",
     "الـ contents عالية مش واطية، والفحوصات دي verification مش validation."
    ],
    [
     "ده بالظبط النقد اللي على الـ calibration: الموديل ممكن يبقى fit على data set واحدة بس <bdi>(L7, 7.3)</bdi>.",
     "صح. ولو فيه فرق (discrepancy)، نرجع للـ calibration.",
     "الـ trace بيعمل verification للـ logic بتاع البرنامج؛ مش بيختبر الـ fit على data جديدة <bdi>(L7, Three verification techniques)</bdi>.",
     "تقليل مستوى الدقة ده الاختيار لما الدقة ماتتحققش في حدود الـ budget <bdi>(L7, 7.3)</bdi>."
    ],
    [
     "أمثلة النوع ده زي سرعة الماكينة أو الـ arrival rate <bdi>(L7, 7.3.3)</bdi>.",
     "مثال: الـ distribution بتاع الـ service time <bdi>(L7, 7.3.3)</bdi>.",
     "صح. مثال النوتس هو تغيير الـ queue discipline في موديل <bdi>waiting-line</bdi>.",
     "مثال: سيستم inventory control متعمل computerized <bdi>(L7, 7.3.3)</bdi>."
    ],
    [
     "الـ inputs والـ responses لازم يبقوا من نفس الفترة <bdi>(L7, 7.3.4)</bdi>.",
     "صح. الـ responses بتعتمد على الـ inputs، فالاتنين لازم يبقوا من نفس الفترة.",
     "الـ Turing test للحالات اللي مفيش فيها statistical test ينفع <bdi>(L7, 7.3.5)</bdi>.",
     "الـ historical data بنستخدمها في الـ <bdi>input-output</bdi> validation <bdi>(L7, 7.3.4)</bdi>."
    ],
    [
     "فيه كمان 5 تقارير حقيقية <bdi>(L7, 7.3.5)</bdi>.",
     "صح. فيه 5 تقارير حقيقية عن 5 أيام و5 تقارير مزيفة من output الـ simulation، متلخبطين مع بعض.",
     "نصهم تقارير مزيفة طالعة من output الموديل <bdi>(L7, 7.3.5)</bdi>.",
     "المثال بيستخدم 5 أيام، فيبقى المجموع 10 تقارير <bdi>(L7, 7.3.5)</bdi>."
    ],
    [
     "صح. الـ Sensitivity analysis بتشوف هل الموديل بيتصرف زي ما متوقع لما الـ inputs تتغير.",
     "الـ trace بيطبع تغييرات الـ variables علشان يراجع الـ logic بتاع البرنامج <bdi>(L7, Three verification techniques)</bdi>.",
     "دي بتقارن الـ outputs بـ responses حقيقية من نفس الفترة <bdi>(L7, 7.3.4)</bdi>.",
     "الـ <bdi>goodness-of-fit</bdi> بيراجع الـ input distributions <bdi>(L7, 7.3.2)</bdi>."
    ]
   ]
  },
  "8": {
   "notes": [
    {
     "h": "مقدمة (8-1): الـ simulation كأداة لحل المشاكل",
     "pts": [
      "في سيناريو حل المشاكل، الـ simulation بتتعتبر <b>valid في الـ context اللي بتتطبق فيه</b> (الكتاب صفحة 131).",
      "الشابتر ده بيدّي <b>case studies</b> كتمارين عشان الطلبة يفهموا الـ simulation بتتطبق إزاي كـ <b><bdi>problem-solving</bdi> tool</b>.",
      "الـ simulations اللي بتتستخدم في حل المشاكل ليها <b>parameters</b> بتخلّي الـ user:<br>(1) يحدد أجزاء معينة من الـ <b>context</b> بتاع الـ simulation<br>(2) يختار الـ <b>controls</b> المهمة في الـ simulation<br>(3) يدخّل <b>data</b> بتحدد الـ simulation المفروض تشتغل إزاي.",
      "الـ labs (المعيدة <bdi>T.A. Noha Ali</bdi>) بتدرس كل case بنفس شكل التقرير:<span class=\"ltr\"><b>Problem Definition, Assumptions, Model, Flowchart/Algorithm, Code, Output, Statistical Analysis</b></span>وده في Lab 1 و Activity 3.",
      "الأسابيع العملي في خطة الكورس (Lab 1):<br>• الأسبوع 1: الـ random numbers؛ و Activity 2 إننا نثبت إن <bdi>P(H) = P(T) = 1/2</bdi> لعملة unbiased<br>• الـ Case study (1): مشكلة الـ Gift Shop (queue بسيط) وده Activity 3<br>• الـ Case study (2): مشكلة الـ Pursuit وده Activity 4<br>• الـ Case study (3): لعبة الـ Flipping Coin وده Activity 5<br>• الـ Case study (4): الـ Newspaper Sales وده Activity 9<br>• الـ Case study (5): المساحة تحت المنحنى (integration و <bdi>acceptance-rejection</bdi>) وده Activity 10<br>• الـ Case study (6): مشكلة الـ Cake Shop وده Activity 11<br>• الـ Case study (7): مشكلة الـ Inventory وده Activity 12.",
      "الليستة اللي في آخر الخطة للـ case studies:<br>(1) الـ Unbiased Coin<br>(2) مشكلة الـ Gift Shop<br>(3) مشكلة الـ Pursuit<br>(4) مشكلة الـ Newspaper Seller<br>(5) مشكلة الـ Cake Shop<br>(6) مشكلة الـ Inventory.",
      "تقييم الكورس (Lab 1): الـ <bdi>mid-term</bdi> exam عليه 20، والـ year work (الـ assignments مع الـ mini project) عليه 10، والعملي (project) عليه 10، والـ final exam عليه 60؛ والمجموع 100.",
      "الشابتر 8 في الكتاب بيضيف مشكلة الـ <b>Staggering Drunk</b> (الـ random walk).",
      "أدوات الـ lab: الـ Microsoft Visual Studio بلغة <b><bdi>C++</bdi></b>، والـ <b>Excel</b> spreadsheet، وبرنامج الـ simulation اللي اسمه <b>AnyLogic</b> (Lab 1)."
     ]
    },
    {
     "h": "تعريفات الـ lab: الـ system والـ model والـ modeling والـ simulation",
     "pts": [
      "الـ <b>System</b>: مجموعة entities (ناس، قطع، messages، مكن، servers، ...) بتتصرف وتتفاعل مع بعض عشان توصل لهدف معين. هو حاجة في العالم الحقيقي احنا مهتمين بيها؛ وغالبًا بيبقى معقد، فبنقرر أنهي تفاصيل ممكن نبسّطها أو نشيلها (abstraction) (Lab 1).",
      "الـ <b>Model</b>: هو نتيجة الـ abstraction؛ وبيحتوي على الـ features اللي شايفينها أساسية. ممكن يتمثل كـ diagrams ومعادلات بتتستخدم في التحليل الرياضي. الـ model هو <b>تبسيط (simplification) للـ system الحقيقي</b>.",
      "الـ <b>Modeling</b>: هي عملية إننا نمثّل system بأداة معينة عشان ندرس سلوكه تحت ظروف مختلفة؛ وبتحدد الـ parameters والعلاقات والـ assumptions عشان تمثّل الواقع بشكل منظم.",
      "الـ <b>Simulation</b>: هي عملية تصميم model لـ system حقيقي وعمل تجارب عليه عشان نفهم سلوك الـ system و/أو نقيّم strategies لتشغيله. وبتسمح بالـ testing من غير ما نأثر على الـ system الحقيقي.",
      "مميزات الـ simulation (Lab 1):<br>(1) ندرس systems موجودة من غير ما نعطّل الشغل اللي ماشي<br>(2) الـ systems المقترحة ممكن تتجرب قبل ما نصرف resources<br>(3) بتتعامل مع systems كبيرة ومعقدة<br>(4) بتجاوب على أسئلة <bdi>\"what-if\"</bdi><br>(5) مش بتتدخل في الـ system الحقيقي<br>(6) بتسمح بدراسة التفاعل بين الـ variables<br>(7) ممكن نعمل <bdi>\"time compression\"</bdi> يعني نضغط الوقت.",
      "التطبيقات اللي اتعرضت في Lab 1:<br>(1) الـ networks<br>(2) التطبيقات العسكرية<br>(3) الـ call centers<br>(4) المرور على الطرق<br>(5) البنوك<br>(6) تقاطع الـ highway."
     ]
    },
    {
     "h": "توليد الـ random numbers بالـ <bdi>C++</bdi> (Lab 1)",
     "pts": [
      "الـ library هي <code>#include&lt;stdlib.h&gt;</code>؛ وفيه 2 helpers: الـ <b><bdi>IntegerRand(Min, Max)</bdi></b> للـ integers والـ <b><bdi>RealRand(Min, Max)</bdi></b> للـ reals.",
      "الـ <b>Standard algorithm</b> عشان نطلّع random number في الفترة <bdi>[Low, High]</bdi>:<br>(1) نولّد integer:<span class=\"ltr\">R0 = rand(),   R0 ∈ [0, ∞[</span>وفي الواقع قيمته من 0 لحد الـ RAND_MAX<br>(2) الـ <b>Normalization</b>:<span class=\"ltr\">R1 = R0 / (RAND_MAX + 1)</span>والـ lab كاتب <bdi>\"R1 values [0,1]\"</bdi>. ‡ الصح إنها <bdi>[0, 1)</bdi> بالظبط، لأن <bdi>R0 ≤ RAND_MAX &lt; RAND_MAX + 1</bdi><br>(3) الـ <b>Scaling</b> بطول الفترة:<span class=\"ltr\">R2 = R1 × (High − Low)</span>(4) للـ integers بنعمل <b>truncation</b> لـ R2<br>(5) الـ <b>Translation</b>:<span class=\"ltr\">R = R2 + Low</span>",
      "مثال محلول، random number في الفترة <bdi>[1, 10]</bdi>:<span class=\"ltr\">R1 = 0.5 → R2 = 0.5 × (10 − 1) = 4.5 → truncate → 4 → R = 4 + 1 = 5</span>يعني النتيجة <b>5</b>.",
      "الـ RAND_MAX ده macro بيدّي أكبر قيمة ممكن الـ rand() ترجعها.",
      "في الـ Excel (Lab 1 و Lab 2): الـ <b>RAND()</b> بتدّي real في <bdi>[0,1)</bdi>، والـ <b>RANDBETWEEN()</b> بتدّي integer في range، والـ <b>SUM()</b> بتجمع؛ والجداول ممكن يبقى فيها serial numbers أوتوماتيك.",
      "‡ مراجعة: بالـ algorithm ده الـ R1 دايمًا أقل من 1، فـ<span class=\"ltr\">int(R1 × (High − Low)) ≤ High − Low − 1</span>وبالتالي <b>الـ RandInt عمرها ما بترجع الـ High</b>: الـ <bdi>RandInt(1,10)</bdi> بتدّي من 1 لـ 9، والـ <bdi>RandInt(1,6)</bdi> بتدّي من 1 لـ 5 (وفعلاً الـ output بتاع الـ Gift Shop في Lab 3 مفيهوش delays أكتر من 9 ولا service times أكتر من 5). عشان تدخّل الـ High، اعمل scaling بـ<span class=\"ltr\">(High − Low + 1)</span>",
      "الـ assignment بتاع Lab 1: تقرير عن أداة الـ AnyLogic، وفكرة <bdi>mini-project</bdi> والـ team بتاعه."
     ],
     "figH": {
      "ms-rand-alg": "الـ standard algorithm خطوة بخطوة من الـ R0 لحد الـ translation"
     }
    },
    {
     "h": "العملة الـ unbiased (Lab 2)",
     "pts": [
      "الهدف (Activity 2): نستخدم الـ simulation عشان نوضّح إن<span class=\"ltr\">P(H) = P(T) = 1/2</span>لأي عملة unbiased (fair). وده تطبيق على الـ standard <bdi>random-number</bdi> algorithm.",
      "العملة ليها وشّين بس، Head أو Tail؛ و<span class=\"ltr\">P(H) = P(T) ≃ 0.5</span>وبننفذها بـ random number في الفترة <bdi>(0,1)</bdi>.",
      "الخطوات:<br>(1) نرمي العملة 100 مرة<br>(2) نعدّ الـ Heads<br>(3) نعدّ الـ Tails<br>(4) نحسب:<span class=\"ltr\">P(H) = Head_count / 100,   P(T) = Tail_count / 100</span>",
      "الرسمة (flowchart بيستخدم الـ RealRand): بنبدأ بـ<span class=\"ltr\">H = 0, T = 0, R = 0, i = 0</span>وبعدين نسأل هل <bdi>i &lt; 100</bdi>؟ لو Yes:<span class=\"ltr\">R = RealRand(0,1)</span>ولو <bdi>R &lt; 0.5</bdi> يبقى <bdi>H++</bdi>، غير كده <bdi>T++</bdi>، وبعدين <bdi>i++</bdi> ونلف تاني. لو No:<span class=\"ltr\">PH = H/100,   PT = T/100</span>ونطبع <bdi>(PH, PT)</bdi> وننهي.",
      "الرسمة (flowchart بيستخدم الـ IntRand): نفس الـ loop، بس<span class=\"ltr\">R = integerRand(0,1)</span>والاختبار هو <bdi>R == 0</bdi> يبقى <bdi>H++</bdi>، غير كده <bdi>T++</bdi>.",
      "‡ بالـ RandInt بتاعة Lab 1 هيبقى<span class=\"ltr\">integerRand(0,1) = 0 + int(d × 1) = 0</span>في كل مرة (شوف الملاحظة اللي فوق)، فكل رمية هتطلع Head؛ والعملة الـ integer محتاجة <bdi>RandInt(0,2)</bdi> مع الـ function دي.",
      "ملاحظة: الـ flowchart بيعدّ Head لما <bdi>R &lt; 0.5</bdi>، لكن الـ <bdi>C++</bdi> code بيستخدم <code>res &lt;= 0.5</code>؛ والاتنين بيدّوا probability قدها 0.5.",
      "نسخة الـ Excel: العمود A فيه <code>=RAND()</code>، والعمود B فيه <code>=IF(A2&lt;0.5,\"H\",\"T\")</code>، والعدّ بـ <code>=COUNTIF(B2:B101,\"H\")</code> و <code>=COUNTIF(B2:B101,\"T\")</code>. والـ run بتاع الـ lab طلّع <b><bdi>P(H) = 48 (48.00%)</bdi></b> و <b><bdi>P(T) = 52 (52.00%)</bdi></b>، قريب من 0.5."
     ],
     "figH": {
      "ms-coin-flow": "الـ flowcharts بتاعة العملة الـ unbiased بالـ RealRand وبالـ IntRand",
      "ms-coin-sim": "ارمي العملة 100 مرة أو أكتر وشوف الـ P(H) والـ P(T) بيقربوا من 0.5"
     }
    },
    {
     "h": "مشكلة الـ Gift Shop: التعريف والـ assumptions (Lab 3)",
     "pts": [
      "الهدف الأساسي: <b>نقلل وقت انتظار الـ customers</b> في محل الهدايا (والوقت اللي الـ clerk بيبقى فيه idle).",
      "المشكلة: <b><bdi>single-channel</bdi> queuing system</b>، زي الكاشير (<bdi>check-out</bdi> stand) بتاع محل هدايا صغير.",
      "الوقت بين الـ arrivals <b>uniformly distributed من 1 لـ 10 دقايق</b>؛ والـ service time <b>uniformly distributed من 1 لـ 6 دقايق</b> (كل الأوقات متقرّبة لأقرب دقيقة).",
      "الـ outputs اللي تهمنا: <b>متوسط الوقت اللي الـ customer بيقضيه في الـ system</b> (انتظار + خدمة) و<b>نسبة الوقت اللي الـ clerk بيبقى فيه idle</b>.",
      "الـ queuing system فيه: <b>server</b> (الـ clerk)، و<b>units</b> (الـ customers، في الـ queue أو بيتخدموا)، و<b>clock</b>.",
      "الـ state بتاعة الـ system: <b>عدد الـ units في الـ system</b> و<b>حالة الـ server</b> (idle أو busy).",
      "الـ events هي <b>arrival</b> لـ unit و<b>departure</b> لـ unit.",
      "الـ assumptions: الـ <bdi>inter-arrival</bdi> time بين 1 و 10 دقايق؛ والـ service time بين 1 و 6 دقايق.",
      "متوسط وقت الانتظار:<span class=\"ltr\">Ar = Σ Wt(i) / n</span>وده الوقت في الـ system كله (انتظار + خدمة).",
      "نسبة الـ idle بتاعة الـ clerk:<span class=\"ltr\">P = Σ Idle(i) / t × 100</span>حيث t هو إجمالي الوقت المتسمّل (simulated)، يعني نهاية خدمة آخر customer زي ما في الـ code."
     ]
    },
    {
     "h": "الـ Gift Shop: الـ model والـ flowchart",
     "pts": [
      "لكل customer رقم i من عينة فيها N، بنولّد 2 uniform random numbers:<span class=\"ltr\">R_d ∈ [Low_d, High_d]   (delay = inter-arrival time)<br>R_st ∈ [Low_st, High_st]   (service time)</span>وبعدين نحسب الـ 5 كميات اللي تحت.",
      "أول customer: الـ delay قيمته 0، والـ arrival clock قيمته 0، والخدمة بتبدأ عند 0، والـ waiting time بيساوي الـ service time بتاعه، والـ idle قيمته 0.",
      "الرسمة (arrival event): لما يحصل arrival event نسأل هل الـ server busy؟ لو No: الـ unit يدخل الخدمة. لو Yes: الـ unit يدخل الـ queue يستنى الخدمة.",
      "الرسمة (departure event): لما يحصل departure event نسأل هل فيه unit تانية مستنية؟ لو No: الـ server يبدأ idle time. لو Yes: نشيل الـ unit المستنية من الـ queue ونبدأ نخدمها."
     ],
     "figH": {
      "ms-gift-events": "شغّل events الوصول والخروج واتبع الـ flowcharts بتاعتهم"
     }
    },
    {
     "h": "الـ Gift Shop: مثال محلول (5 customers)",
     "pts": [
      "الـ customer رقم 3 بيوصل عند 6 بس الـ clerk مشغول لحد 9، فالخدمة بتبدأ عند 9 و<span class=\"ltr\">WT = 10 − 6 = 4</span>يعني دقيقة خدمة + 3 دقايق انتظار.",
      "الـ customer رقم 2 بيوصل عند 4 والـ clerk فاضي من عند 2، فـ<span class=\"ltr\">idle = 4 − 2 = 2</span>والـ customer رقم 4:<span class=\"ltr\">idle = 14 − 10 = 4</span>",
      "متوسط وقت الانتظار:<span class=\"ltr\">Ar = (2 + 5 + 4 + 4 + 4)/5 = 19/5 = 3.8 min</span>يعني <b>3.8 دقيقة</b>.",
      "نسبة الـ idle بتاعة الـ clerk:<span class=\"ltr\">P = (2 + 4)/21 × 100 = 6/21 × 100 = 28.5%</span>يعني <b>28.5%</b>. ‡ القسمة بتطلع <bdi>6/21 = 0.2857</bdi> يعني 28.57%، بس الـ lab بيعمل truncation.",
      "الـ standard clerk idle هو <b>12.5%</b> حسب H.R.W."
     ],
     "figH": {
      "ms-gift-ex": "المثال المحلول بيتملي customer ورا التاني مع وقت شغل وفراغ الـ clerk"
     }
    },
    {
     "h": "الـ Gift Shop: تمرين (5 customers)",
     "pts": [
      "هنا مفيش customer بيستنى في الـ queue: كل arrival بيلاقي الـ clerk فاضي، فكل waiting time بيساوي الـ service time.",
      "متوسط وقت الانتظار:<span class=\"ltr\">Ar = (1 + 4 + 6 + 6 + 2)/5 = 19/5 = 3.8 min</span>يعني <b>3.8 دقيقة</b>.",
      "نسبة الـ idle بتاعة الـ clerk:<span class=\"ltr\">P = (9 + 3 + 1 + 2)/34 × 100 = 15/34 × 100 = 44.11%</span>يعني <b>44.11%</b>. ‡ القسمة بتطلع <bdi>15/34 = 0.44118</bdi> يعني 44.12% لو قرّبنا."
     ],
     "figH": {
      "ms-gift-exr": "التمرين بيتملي customer ورا التاني وكل واحد بيلاقي الـ clerk فاضي"
     }
    },
    {
     "h": "الـ Gift Shop: الـ <bdi>C++</bdi> code (لـ 20 customer)",
     "pts": [
      "فيه <code>struct customer</code> شايل delay و st (الـ service time) و ar_clk و s_begin و s_end و wt و idle؛ وبيتعمل array فيه <bdi>n+1</bdi> customers بـ <code>new</code>.",
      "الـ customer الأول بيتحط بإيدينا (الـ delay بصفر، والـ arrival بصفر، والـ wt بيساوي الـ st، والـ idle بصفر)؛ والـ customers من 2 لـ n بيستخدموا <bdi>RandInt(1,10)</bdi> للـ delay و <bdi>RandInt(1,6)</bdi> للـ service time، ومعاهم الـ 5 معادلات بتوع الـ model.",
      "النتايج:<span class=\"ltr\">Av_wait = T_time / n,    P = T_idle / c[n].s_end</span>والـ P بتتطبع مضروبة في 100 جنب الـ standard بتاع H.R.W. اللي هو 12.5%."
     ]
    },
    {
     "h": "الـ Gift Shop: الـ output بتاع البرنامج والـ statistical analysis",
     "pts": [
      "الـ customer رقم 9 بس هو اللي بيستنى في الـ queue (بيوصل عند 49 والـ clerk مشغول لحد 50):<span class=\"ltr\">WT = 51 − 49 = 2</span>",
      "مجموع الـ WT بيساوي 48، فمتوسط وقت الانتظار<span class=\"ltr\">Ar = 48/20 = 2.4 min</span>يعني <b>2.4 دقيقة</b>: وده waiting time كويس للـ customer.",
      "مجموع الـ Idle بيساوي 57 على مدى وقت كلي t قدره 104 دقيقة، فـ<span class=\"ltr\">P = 57/104 × 100 = 54.8%</span>يعني <b>54.8%</b> (البرنامج بيطبع 54.8077%).",
      "الخلاصة: الـ clerk بيقعد idle وقت طويل مقارنة بالـ <b>standard clerk idle اللي هو 12.5%</b> (H.R.W.).",
      "الـ assignments: تقرير عن simulation language؛ وتعمل simulation للـ Gift Shop على Excel؛ وفي Activity 3 توسّعها لـ <bdi>multi-queue</bdi> (<bdi>time-sharing</bdi>) system."
     ],
     "figH": {
      "ms-gift-run": "الـ 20 customer بتوع البرنامج خطوة بخطوة ونسبة الـ idle للـ clerk"
     }
    },
    {
     "h": "المساحة تحت المنحنى (8-2): الـ Monte Carlo integration",
     "pts": [
      "المساحة المظللة A اللي محصورة بين منحنى غير سالب<span class=\"ltr\">y = f(x)</span>ومحور الـ x والخطين الرأسيين<span class=\"ltr\">x = b ,   x = c</span>هي الـ definite integral:<span class=\"ltr\">A = ∫ from b to c of f(x) dx,    0 ≤ f(x) ≤ h,    b ≤ x ≤ c</span>",
      "الشكل 8-1: المنحنى<span class=\"ltr\">y = f(x)</span>جوه المستطيل R اللي قاعدته <bdi>(b, c)</bdi> وارتفاعه h؛ وأي نقطة عشوائية <bdi>(xᵢ, yᵢ)</bdi> تحت المنحنى بتبقى <b>accepted</b>، والنقطة اللي فوقه بتبقى <b>rejected</b>.",
      "إننا نرمي نقطة عشوائيًا على R ده زي ما نرمي سهم (dart) بحيث كل جزء من R ليه نفس الفرصة إنه يتصاب.",
      "احتمال إن النقطة تقع جوه A:<span class=\"ltr\">p = A / (h(c − b))</span>ولو رمينا N نقطة وK منهم وقعوا جوه A، يبقى<span class=\"ltr\"><b>A = K h (c − b) / N</b></span>وده المعادلة 2.",
      "في خطة الكورس دي هي الـ case study بتاعة الـ <b><bdi>acceptance-rejection</bdi></b> (Case study 5 و Activity 10).",
      "‡ النص بيقول <bdi>\"In figure (1 – 2) the shaded area\"</bdi>؛ بس الشكل هو Figure 8-1، وجدول الـ output بتاع برنامج الـ Pascal مكتوب تحته برضه <bdi>\"Figure (8–2)\"</bdi>، نفس رقم الـ flowchart."
     ],
     "figH": {
      "ms-area-fig": "الـ Figure 8-1: النقطة تحت المنحنى accepted وفوقه rejected"
     }
    },
    {
     "h": "المساحة تحت المنحنى: الـ flowchart والـ output والتحقق التحليلي",
     "pts": [
      "الشكل 8-2، وهو flowchart: بنبدأ بـ<span class=\"ltr\">N, K ← 0</span>وبعدين<span class=\"ltr\">N ← N + 1</span>ونسأل هل <bdi>N &gt; 3000</bdi>؟ لو Yes: نخلص (End). لو No: نولّد random numbers مستقلة وموزعة uniform<span class=\"ltr\">(x, y),   0 ≤ y ≤ h,   b ≤ x ≤ c</span>ونحسب f(x)، وبعدين نسأل هل <bdi>y ≤ f(x)</bdi>؟ لو Yes:<span class=\"ltr\">K ← K + 1</span>يعني النقطة تبع المساحة. بعد كده نسأل هل<span class=\"ltr\">N mod 500 = 0</span>ولو Yes: نطبع N و<span class=\"ltr\">A = K h (c − b)/N</span>وبعدين نرجع لـ<span class=\"ltr\">N ← N + 1</span>",
      "مثال: برنامج Pascal فيه<span class=\"ltr\">N = 3000,  b = 0,  c = 1,  h = 1,  f(x) = √(1 − x²)</span>وفيه library random number generator في الفترة <bdi>(0,1)</bdi>. وهنا<span class=\"ltr\">A = K/N</span>",
      "الحل التحليلي: بنعوّض<span class=\"ltr\">x = sin θ,   dx = cos θ dθ    (x = 0 → θ = 0,   x = 1 → θ = π/2)</span>فيبقى<span class=\"ltr\">A = ∫₀^(π/2) cos²θ dθ</span>وباستخدام<span class=\"ltr\">cos 2θ = 2cos²θ − 1   ⇒   cos²θ = ½(1 + cos 2θ)</span>يطلع<span class=\"ltr\">A = ½[θ + ½ sin 2θ]₀^(π/2) = ½[π/2 + 0] = π/4 = 0.7853981</span>يعني الناتج <b><bdi>π/4 = 0.7853981</bdi></b>.",
      "‡ الكتاب كاتب <bdi>\"so A = ½ ∫ (1 + Cos² θ) dθ\"</bdi>؛ والصح إنها <bdi>(1 + cos 2θ)</bdi>، زي ما السطر اللي بعده <bdi>[θ + ½ sin 2θ]</bdi> بيوضح.",
      "بعد 3000 تجربة، المساحة المتسمّلة 0.78399998 بتختلف عن π/4 بحوالي 0.0014.",
      "الـ simulation بتبقى مغرية بس لما المشكلة تبقى <b>صعبة أو بتاخد وقت أو مكلفة أو خطيرة أو مستحيلة</b> تتحل بالطرق التقليدية (analytic أو numeric أو تجارب فيزيائية). ونتايج الـ simulation غالبًا <b>أقل دقة من الحلول التحليلية (analytic)</b>."
     ],
     "figH": {
      "ms-area-flow": "الـ Figure 8-2 خطوة بخطوة على مثال الكتاب",
      "ms-area-sim": "ارمي 3000 نقطة عشوائية وقارن المساحة بتشغيلة الكتاب وبالـ π/4"
     }
    },
    {
     "h": "مشكلة الـ Pure pursuit: التعريف والـ assumptions (8-3 و Lab 4)",
     "pts": [
      "الهدف الأساسي: نحدد <b>إمتى الـ fighter هيمسك الـ bomber</b>.",
      "طيارة fighter بتشوف bomber عدو وبتطير ناحيته على طول عشان تمسكه وتدمّره. الـ bomber (الـ target) بيفضل طاير على منحنى محدد، فالـ fighter (الـ pursuer) لازم يفضل يغيّر اتجاهه عشان يوجّه نفسه ناحية الـ target.",
      "عايزين نعرف الـ <b>attack course</b> بتاع الـ fighter و<b>هياخد قد إيه</b> لحد ما يمسك الـ bomber.",
      "لو الـ target طاير في خط مستقيم المشكلة ممكن تتحل analytically؛ لكن لو مساره منحني بتبقى أصعب بكتير وغالبًا مش بتتحل مباشرة، فبنلجأ لـ <b>الـ simulation</b>.",
      "الـ assumptions المبسّطة:<br>(1) الطيارتين طايرين في <b>نفس المستوى الأفقي</b> وفاضلين فيه، فالـ model <b><bdi>two-dimensional</bdi></b><br>(2) سرعة الـ fighter <b>VF ثابتة (20 km في الدقيقة)</b><br>(3) مسار الـ target (مكانه كـ function في الوقت) <b>معروف ومحدد</b><br>(4) بعد فترة زمنية ثابتة <b>Δt (كل دقيقة)</b> الـ fighter بيغيّر اتجاهه عشان يوجّه نفسه للـ bomber (لمدة 12 دقيقة).",
      "الإحداثيات: نقطة الأصل (origin) جنوب الـ fighter بالظبط وغرب الـ target بالظبط في البداية؛ والمسافات بالـ km والوقت بالدقايق؛ والوقت بيبدأ لما الـ fighter يشوف الـ bomber لأول مرة.",
      "الشكل 8-3، وفيه الأماكن عند الزمن صفر: الـ fighter عند <bdi>(0, 50)</bdi> على محور الـ North، والـ bomber عند <bdi>(80, 0)</bdi> على محور الـ East، وبينهم خط نظر (line of sight) متقطع.",
      "الـ fighter بيبدأ من<span class=\"ltr\"><b>XF(0) = 0,   YF(0) = 50 km</b></span>",
      "الـ fighter بيضرب الـ target بـ missile أول ما يبقى <b>في حدود 10 km</b> من الـ bomber؛ ولو الـ bomber ما اتمسكش خلال <b>12 دقيقة</b> المطاردة بتتلغي (الـ bomber بيهرب)."
     ],
     "figH": {
      "ms-pursuit-pos": "الـ Figure 8-3: الأماكن عند الزمن صفر ومسار الـ bomber المتحدد"
     }
    },
    {
     "h": "مشكلة الـ Pursuit: الـ model والـ flowchart",
     "pts": [
      "الـ strategy: عند اللحظة t الـ fighter بيبص على الـ target و<b>بيظبط الـ velocity vector بتاعه على خط النظر (line of sight)</b>؛ وبيطير في الاتجاه ده دقيقة واحدة لحد <bdi>t + 1</bdi>، وبعدين يبص تاني ويعيد الضبط.",
      "بالمكان الجديد، المسافة بتتحسب تاني بالمعادلة (2-1)؛ لو طلعت <b>10 km أو أقل</b> المطاردة بتخلص، غير كده بنحسب θ تاني والعملية تكمل.",
      "الشكل 8-4، وهو flowchart: نقرا مسار الـ bomber يعني XB(t) و YB(t) لـ t من 0 لـ 12، ومكان الـ fighter الأولاني XF(0) و YF(0) وسرعته VF، وبعدين نبدأ بـ<span class=\"ltr\">t = 0</span>ونحسب المسافة الحالية ومكان الـ fighter الجاي عند <bdi>t + 1</bdi>. هل المسافة ≤ 10؟ لو Yes: نطبع t والمسافة ونقف. لو No: هل <bdi>t &gt; 11</bdi>؟ لو Yes: نطبع <bdi>'target escaped'</bdi> ونقف. لو No:<span class=\"ltr\">t = t + 1</span>ونكرر. (الـ flowchart بتاع الـ lab كاتب نفس الاختبار كـ <bdi>\"is t &lt; 12?\"</bdi> والـ Yes بيودّي لـ <bdi>t = t + 1</bdi>.)",
      "ليه الـ simulation؟ لأننا analytically ماكناش هنقدر نعمل توقع طويل المدى لمسار الـ fighter، لكن الـ simulation بتخلّي الكمبيوتر يمشي من لحظة للحظة، لأي عدد لحظات احنا عايزينه. وده كان ممكن بس لأننا عارفين الـ <b>basic process</b> (الـ fighter بيتصرف إزاي في أي لحظة)؛ والمعرفة دي أساسية في كل تجارب الـ simulation."
     ],
     "figH": {
      "ms-pursuit-flow": "الـ Figure 8-4 خطوة بخطوة لحد ما الـ fighter يمسك الـ bomber"
     }
    },
    {
     "h": "مشكلة الـ Pursuit: مثال محلول (Lab 4)",
     "pts": [
      "عند الزمن صفر:<span class=\"ltr\">Dist(0) = √[(0 − 50)² + (80 − 0)²] = 94.33<br>sin θ = −50/94.33 = −0.53,    cos θ = 80/94.33 = 0.85<br>XF(1) = 0 + 20(0.85) = 17,    YF(1) = 50 + 20(−0.53) = 39.4</span>يعني المسافة <b>94.33</b>، والمكان الجديد <b>17</b> للـ X و<b>39.4</b> للـ Y.",
      "عند الدقيقة 1:<span class=\"ltr\">Dist(1) = √[(−2 − 39.4)² + (90 − 17)²] = 83.922<br>sin θ = −41.4/83.922 = −0.49,    cos θ = 73/83.922 = 0.87<br>XF(2) = 17 + 20(0.87) = 34.4,    YF(2) = 39.4 + 20(−0.49) = 29.6</span>يعني المسافة <b>83.922</b>، والمكان الجديد <b>34.4</b> للـ X و<b>29.6</b> للـ Y.",
      "نكرر لحد ما المسافة تبقى ≤ 10 (اتمسك) أو تعدّي 12 دقيقة (هرب).",
      "الـ lab بيقرّب الـ sin والـ cos لرقمين عشريين؛ لكن البرنامج بيحتفظ بالدقة الكاملة<span class=\"ltr\">XF(1) = 16.96,    Dist(1) = 83.957</span>فأرقامه بتختلف شوية عن الخطوات اليدوية.",
      "تحت مسار الـ fighter متحسوب تاني (بدقة كاملة): المسافة أول مرة تنزل لـ 10 km أو أقل عند <b>الدقيقة 9</b> (2.969 km)، يعني <b>الـ fighter بيمسك الـ bomber ويدمّره عند الدقيقة 9</b>."
     ],
     "figH": {
      "ms-pursuit-sim": "المطاردة دقيقة بدقيقة بمعادلات المادة"
     }
    },
    {
     "h": "مشكلة الـ Pursuit: الـ <bdi>C++</bdi> code والـ output (Lab 4)",
     "pts": [
      "الـ output بتاع البرنامج بيطبع المسافة (The Distance) في كل دقيقة:<span class=\"ltr\">94.340 (t = 0), 83.957 (1), 73.289 (2), 63.116 (3), 53.007 (4), 42.363 (5), 31.770 (6), 21.710 (7), 11.447 (8), 2.969 (t = 9)</span>وبعدين بيطبع <bdi>\"The Fighter Catch &amp; Destroy The Bomber at Distance = 2.969 &amp; Time = 9\"</bdi>.",
      "ملاحظة: الـ code بيحدّث xf و yf قبل ما يختبر <bdi>dist ≤ 10</bdi>، بس بيطبع المسافة والزمن t اللي اتختبروا، فالنتيجة واحدة."
     ]
    },
    {
     "h": "مشكلة الـ staggering drunk (8-4): الـ random walk",
     "pts": [
      "واحد سكران واقف على ناصية شارع وقرر يتمشى؛ وعند كل ناصية بيروح <b>شمال أو جنوب أو شرق أو غرب باحتمال متساوي قدره 1/4 لكل اتجاه</b>. لو مشي <b>10 blocks</b>، إيه احتمال إنه يخلص <b>في حدود 2 blocks</b> من المكان اللي بدأ منه؟",
      "مكانه عبارة عن vector ببعدين <bdi>(X, Y)</bdi>: الـ X هو محور شرق-غرب، والـ Y محور شمال-جنوب، والبداية عند <bdi>(0, 0)</bdi>.",
      "كل ناصية بتستخدم <b>random number من رقمين</b> اسمه RN:<br>• من 00 لـ 24: شرق، <bdi>X = X + 1</bdi><br>• من 25 لـ 49: غرب، <bdi>X = X − 1</bdi><br>• من 50 لـ 74: شمال، <bdi>Y = Y + 1</bdi><br>• من 75 لـ 99: جنوب، <bdi>Y = Y − 1</bdi>.",
      "بعد 10 blocks: لو<span class=\"ltr\">|X| + |Y| &gt; 2</span>يبقى خلص على بعد أكتر من 2 blocks (failure)؛ غير كده، يعني لو<span class=\"ltr\">|X| + |Y| ≤ 2</span>التجربة بتبقى success.",
      "الشكل 8-5، وهو الـ logic flow: نبدأ بـ<span class=\"ltr\">X = 0,   Y = 0</span>ونختار RN من رقمين؛ لو <bdi>RN &lt; 25</bdi> يبقى<span class=\"ltr\">x = x + 1</span>غير كده لو <bdi>RN &lt; 50</bdi> يبقى<span class=\"ltr\">x = x − 1</span>غير كده لو <bdi>RN &lt; 75</bdi> يبقى<span class=\"ltr\">y = y + 1</span>غير كده<span class=\"ltr\">y = y − 1</span>وبعدين نسأل هل <bdi>N = 1</bdi>؟ لو No:<span class=\"ltr\">N = N − 1</span>ونختار الـ RN اللي بعده. لو Yes: نطبع X و Y ونقف.",
      "الجدول 8-1 فيه 5 تجارب؛ 3 من 5 نجحوا، يعني تقدير قدره<span class=\"ltr\">3/5 = 0.6</span>والـ 5 تجارب دول <b>مش كفاية</b> عشان نطلّع تقدير كويس للاحتمال الحقيقي.",
      "‡ النص بيشاور على الشكل والجدول دول بـ <bdi>\"Figure (4-3)\"</bdi> و <bdi>\"Table (4-1)\"</bdi>؛ بس هما Figure 8-5 و Table 8-1، لأن الشابتر محتفظ بأرقام قديمة في كذا <bdi>cross-reference</bdi>، زي <bdi>\"table (4-2)\"</bdi> بدل Table 8-2 و <bdi>\"figure (4-5)\"</bdi> بدل Figure 8-7."
     ],
     "figH": {
      "ms-drunk-flow": "الـ Figure 8-5 خطوة بخطوة بأرقام أول trial",
      "ms-drunk-sim": "الـ Table 8-1 block ورا block على خريطة الشوارع، و1000 trial عشوائية"
     }
    },
    {
     "h": "لعبة الـ Flipping coin: الـ assumptions والـ model (Lab 5)",
     "pts": [
      "الهدف الأساسي: نقرر هل اللعبة <b>آمنة نلعبها (safe to play)</b> ولا لأ (ناخد قرار).",
      "الـ assumptions:<br>(1) بترمي عملة unbiased كذا مرة، و<bdi>P(H) = P(T) = 0.5</bdi><br>(2) اللعبة بتقف لما الفرق بين الـ heads والـ tails يبقى 3، يعني <bdi>|H − T| = 3</bdi><br>(3) بتدفع <b>$1 على كل رمية</b> وبتاخد <b>$8 في آخر</b> اللعبة<br>(4) مش مسموحلك تنسحب في نص اللعبة<br>(5) بتكسب فلوس لو عدد الرميات أقل من 8 وبتخسر لو أكتر من 8<br>(6) عدد الرميات لازم يبقى أقل من 8، غير كده اللاعب بيخسر اللعبة<br>(7) اللعبة بتتكرر <b>100 مرة</b> عشان نحسب نسبة المكسب.",
      "صافي المكسب (net gain) للعبة الواحدة:<span class=\"ltr\">Net gain = 8 − (number of flips)</span>مثال: لو 5 رميات يبقى +$3؛ ولو 13 رمية يبقى −$5. واللعبة دايمًا بتخلص بعد عدد فردي من الرميات (3 و 5 و 7 و 9 وهكذا)، فعمرها ما بتخلص عند 8 رميات بالظبط.",
      "الـ statistical parameters بتاعة صافي المكاسب: الـ mean والـ variance والـ standard deviation (Activity 5)."
     ]
    },
    {
     "h": "لعبة الـ Flipping coin: الـ flowchart والـ <bdi>C++</bdi> code (Lab 5)",
     "pts": [
      "الرسمة (flowchart): نبدأ بـ<span class=\"ltr\">Success = 0, Game = 0, Toss = 0, T_Gain = 0, T_loss = 0</span>وكل لعبة تبدأ بـ<span class=\"ltr\">H = 0, T = 0, Toss = 1</span>ونولّد r في الفترة <bdi>[0,1]</bdi>؛ لو <bdi>r &lt; 0.5</bdi> يبقى <bdi>T++</bdi>، غير كده <bdi>H++</bdi>. هل <bdi>|H − T| = 3</bdi>؟ لو No: نزوّد <bdi>Toss++</bdi> ونولّد تاني. لو Yes: هل <bdi>Toss &lt; 8</bdi>؟ لو Yes: نزوّد <bdi>Success++</bdi> و<span class=\"ltr\">T_Gain = T_Gain + (8 − Toss)</span>ولو No:<span class=\"ltr\">T_Loss = T_Loss − (8 − Toss)</span>بعد كده: هل <bdi>Game &lt; 100</bdi>؟ لو Yes: نزوّد <bdi>Game++</bdi> ونبدأ لعبة جديدة. لو No:<span class=\"ltr\">P = Success / Game</span>ونطبع P و T_Gain و T_Loss وننهي.",
      "الـ T_loss بيجمّع <bdi>−(8 − Toss)</bdi>، يعني قيمة موجبة لكل لعبة خسرانة.",
      "الـ output بتاع الـ lab:<span class=\"ltr\"><b>P(Success) = 0.71</b>,   Total Gain = 255,   Total Loss = 247</span>فطلع <bdi>\"It's Safe to Play This Game\"</bdi>؛ و<span class=\"ltr\">Mean = 0.08,   Variance = 58.034,   Standard Deviation = 7.618</span>",
      "مراجعة: متوسط صافي المكسب<span class=\"ltr\">(255 − 247)/100 = 0.08</span>والجذر<span class=\"ltr\">√58.034 = 7.618</span>",
      "الـ Assignment 5: غيّر الـ assumptions، ونفّذها بـ <bdi>C++</bdi>، واكتب تقرير."
     ],
     "figH": {
      "ms-flip-flow": "الـ flowchart بتاع الـ lab خطوة بخطوة على أول games في Quiz 2"
     }
    },
    {
     "h": "لعبة الـ Flipping coin: مثال محلول بـ random numbers معطاة (Quiz 2)",
     "pts": [
      "الـ Quiz 2 بيستخدم ليستة ثابتة فيها <b>100 random number</b>؛ لو <bdi>rn &lt; 0.5</bdi> تبقى tail (الـ diff ينقص 1)، غير كده head (الـ diff يزيد 1)؛ واللعبة بتخلص لما <bdi>|diff| = 3</bdi> وصافي مكسبها <bdi>8 − flips</bdi>.",
      "الـ random numbers:<span class=\"ltr\">0.34, 0.90, 0.25, 0.89, 0.87, 0.44, 0.12, 0.21, 0.46, 0.67, 0.83, 0.76, 0.79, 0.64, 0.70, 0.81, 0.94, 0.74, 0.22, 0.74, 0.96, 0.99, 0.77, 0.67, 0.56, 0.41, 0.52, 0.73, 0.99, 0.02, 0.47, 0.30, 0.17, 0.82, 0.56, 0.05, 0.45, 0.31, 0.78, 0.05, 0.79, 0.71, 0.23, 0.19, 0.82, 0.93, 0.65, 0.37, 0.39, 0.42, 0.99, 0.17, 0.99, 0.46, 0.05, 0.66, 0.10, 0.42, 0.18, 0.49, 0.37, 0.51, 0.54, 0.01, 0.81, 0.28, 0.69, 0.34, 0.75, 0.49, 0.72, 0.43, 0.56, 0.97, 0.30, 0.94, 0.96, 0.58, 0.73, 0.05, 0.06, 0.39, 0.84, 0.24, 0.40, 0.64, 0.40, 0.19, 0.79, 0.60, 0.18, 0.26, 0.97, 0.88, 0.64, 0.47, 0.60, 0.11, 0.29, 0.78</span>",
      "اللعبة 1 خطوة بخطوة:<span class=\"ltr\">0.34 (T, −1), 0.90 (H, 0), 0.25 (T, −1), 0.89 (H, 0), 0.87 (H, +1), 0.44 (T, 0), 0.12 (T, −1), 0.21 (T, −2), 0.46 (T, −3)</span>يعني 9 رميات، وصافي المكسب<span class=\"ltr\">8 − 9 = −1</span>",
      "عدد الألعاب طلع <b>13</b>؛ وصافي المكاسب:<span class=\"ltr\">−1, 5, 5, 5, 3, 3, 3, −17, 5, −5, 3, 5, −19</span>ومجموعهم <b>−5</b>.",
      "الـ Mean:<span class=\"ltr\">−5/13 ≈ <b>−0.3846</b></span>والـ variance:<span class=\"ltr\">Σ(netᵢ − mean)²/n ≈ <b>64.237</b></span>(البرنامج: 64.2367)؛ والـ standard deviation حوالي <b>8.015</b> (البرنامج: 8.0148).",
      "بعد إعادة الحساب: 9 من الـ 13 لعبة كسبانين (أقل من 8 رميات)، وإجمالي المكسب $37، وإجمالي الخسارة $42.",
      "‡ اللعبة رقم 13 محتاجة 27 رمية بس فاضل 18 رقم بس (الأرقام من 83 لـ 100)؛ والـ code بياخد <code>rns[idx % total]</code>، فبيرجع يستخدم الأرقام من 1 لـ 9 من أول الليستة.",
      "الخلاصة (Quiz 2): متوسط صافي المكسب سالب، وده معناه خسارة متوقعة على المدى الطويل، فـ<b>اللعبة مش آمنة (not safe to play)</b>.",
      "قارن: الـ run بتاع الـ 100 لعبة في Lab 5 طلّع mean موجب صغير (0.08) و<bdi>\"safe\"</bdi>؛ لكن مجموعة random numbers مختلفة وعدد ألعاب قليل ممكن يغيّروا القرار، فمحتاجين runs أكتر قبل ما نقرر."
     ],
     "figH": {
      "ms-flip-quiz": "الـ 13 game بتوع Quiz 2 رمية رمية مع المتوسط والـ variance والقرار"
     }
    },
    {
     "h": "مشكلة الـ Newspaper seller: المعطيات (Quiz 5)",
     "pts": [
      "مشكلة الـ newspaper seller الكلاسيكية اتشرحت في Lecture 2 (في Example 2.4 عملنا simulation لـ 20 يوم لـ policy بـ 70 جرنال). والـ Quiz 5 بيختبر 6 purchase policies على مدى 10 أيام.",
      "المعطيات: تكلفة الشرا <b>$0.33</b> للجرنال، وسعر البيع <b>$0.50</b>، وسعر الـ scrap (salvage) <b>$0.05</b>، والـ lost profit لكل طلب ما اتلبّاش <b>$0.17</b>، يعني<span class=\"ltr\">0.50 − 0.33 = 0.17</span>",
      "الـ order quantities (الـ policies) اللي اتجربت:<span class=\"ltr\"><b>Q = 50, 60, 70, 80, 90, 100</b></span>",
      "أنواع اليوم (newsday):<span class=\"ltr\">Good 0.35   (cumulative 0.35, RN 01-35)<br>Fair 0.45   (0.80, RN 36-80)<br>Poor 0.20   (1.00, RN 81-100)</span>",
      "ملاحظة: جدول الـ demand في Quiz 5 بيبدأ من 50 (مفيش demand قدره 40): في الأيام الـ good والـ fair، الـ ranges بتاعة 40 و 50 في Table 2.12 بتاع Lecture 2 اتدمجوا في 50 (الـ good من 01 لـ 08 والـ fair من 01 لـ 28)، والـ ranges بتاعة الأيام الـ poor هي نفسها بتاعة Table 2.12 بس متزحزحة 10 جرايد لفوق:<span class=\"ltr\">L2: 40 = 01-44 ...    →    Quiz 5: 50 = 01-44 ...</span>",
      "الـ random numbers قيم بعلامتين عشريتين (مثلاً 0.41 معناها RN قدره 41 على مقياس من 01 لـ 100)."
     ]
    },
    {
     "h": "الـ Newspaper seller: الأيام المتولّدة والـ policy بتاعة الـ 60 جرنال (Quiz 5)",
     "pts": [
      "اليوم 1:<span class=\"ltr\">RN(type) 0.41 → Fair;   RN(demand) 0.19 → 50 (Fair 01-28)</span>واليوم 10:<span class=\"ltr\">0.27 → Good;   0.28 → 70 (Good 24-43)</span>",
      "مع الـ policy<span class=\"ltr\">Q = 60</span>اليوم 1: الـ demand 50، اتباع 50، وفاضل 10:<span class=\"ltr\">profit = 25.00 − 19.80 + 0.50 = <b>5.70</b></span>اليوم 2: الـ demand 70، اتباع 60، و 10 ضاعوا:<span class=\"ltr\">30.00 − 19.80 − 1.70 = <b>8.50</b></span>اليوم 5: الـ demand 60:<span class=\"ltr\">30.00 − 19.80 = <b>10.20</b></span>",
      "إجماليات الـ policy بتاعة 60 جرنال: الـ revenue 275.00، والـ salvage 2.50، والـ lost profit 5.10، والـ cost 198.00، والـ profit <b>$74.40</b>.",
      "مع 50 جرنال (كل الأيام بتبيع 50): الربح اليومي<span class=\"ltr\">25.00 − 16.50 − lost profit</span>مثلاً اليوم 2:<span class=\"ltr\">25.00 − 16.50 − 3.40 = 5.10</span>والإجمالي $71.40."
     ],
     "figH": {
      "ms-news-days": "الـ 10 أيام بتوع Quiz 5 يوم بيوم لأي policy شراء"
     }
    },
    {
     "h": "الـ Newspaper seller: ملخص الـ policies والقرار (Quiz 5)",
     "pts": [
      "الـ demands على مدى الـ 10 أيام:<span class=\"ltr\">50, 70, 70, 50, 60, 50, 50, 60, 50, 70    (total 580)</span>",
      "من 70 جرنال وطالع كل الطلب بيتلبّى، فالـ revenue بيفضل 290.00 والـ lost profit بيفضل 0؛ وكل 10 جرايد زيادة بيضيفوا $33 تكلفة و $5 بس salvage، فالربح بينزل $28 في كل خطوة:<span class=\"ltr\">65 → 37 → 9 → −19</span>",
      "الربح اليومي ليوم الـ demand فيه 50:<span class=\"ltr\">Q=50: 8.50,   Q=70: 2.90,   Q=80: 0.10,   Q=90: −2.70,   Q=100: −5.50</span>",
      "أحسن policy (أعلى إجمالي ربح على مدى الـ 10 أيام المتسمّلة): <b>الـ Q بـ 60 جرنال، والربح الكلي $74.40</b>."
     ],
     "figH": {
      "ms-news-best": "الربح الكلي للست policies وأحسنهم شراء 60 جرنال"
     }
    },
    {
     "h": "مشكلة الـ Cake shop (8-5): التعريف",
     "pts": [
      "صاحب محل كيك عايز يعرف <b>يعمل كام تورتة عيد ميلاد بيضا مقاس 10 بوصة كل يوم عشان يكبّر الربح</b>.",
      "الطريقة الحالية: أحسن تخمين عنده للـ demand اليومي (مثلاً يقدّر 5 فيخبز 5). وكل الكيك بيتخبز في <b>batch واحدة الصبح بدري</b> (أوفر).",
      "تكلفة الإنتاج <b>$2.00</b> للتورتة. والكيك اللي يفضل بيتباع لمحل <bdi>day-old</bdi> بـ <b>$1.50</b>، يعني خسارة <b>$0.50</b> في كل تورتة زيادة.",
      "الـ demand اليومي مش مضمون: فيه أيام مفيهاش طلب خالص، ويوم في الأسبوع اللي فات كان الطلب فيه 8 تورتات.",
      "هو عايز كمية الإنتاج اللي تكبّر الربح على المدى الطويل، يعني طريقة ينفّذ بيها الـ <bdi>trial-and-error</bdi> بتاعه <b>من غير ما يعمل التجارب فعلاً</b>: والـ computer simulation بتعمل كده بالظبط.",
      "الطريقة: نبني mathematical model و computer program لشغل المحل؛ ونختار كمية إنتاج تجريبية، ونعمل simulation لـ demands يومية افتراضية كتير، ونحسب الربح الكلي؛ ونكرر بكميات تانية. والحل الـ <bdi>\"best\"</bdi> اللي الـ simulation بتطلّعه مش مضمون إنه optimum، بس المفروض يبقى <b>قريب من الـ optimal solution</b>."
     ]
    },
    {
     "h": "الـ Cake shop: بناء الـ model",
     "pts": [
      "الـ variables: الـ <b>x</b> هو عدد التورتات اللي اتعملت، والـ <b>d</b> هو الـ demand اليومي، والـ <b>z</b> هو الربح اليومي لما ننتج x تورتة.",
      "فيه حالتين: (1) الإنتاج ≤ الـ demand و (2) الإنتاج &gt; الـ demand.",
      "الحالة 1 (لما <bdi>x ≤ d</bdi>): كل الـ x تورتة بيتباعوا بربح $2.50 للواحدة:<span class=\"ltr\">z = 2.5x</span>",
      "‡ الكتاب كاتب عنوان الحالة 1 <bdi>\"production quantity is greater than the daily demand\"</bdi> بس الشرط هو <bdi>x ≤ d</bdi> (أقل من أو يساوي)، زي ما الصيغة العامة بتقول بعدين.",
      "الحالة 2 (لما <bdi>x &gt; d</bdi>): الـ d تورتة بيكسبوا $2.50 للواحدة، والـ <bdi>x − d</bdi> اللي اتعملوا زيادة بيخسروا $0.50 للواحدة:<span class=\"ltr\">z = 2.5d − 0.5(x − d) = 3d − 0.5x</span>",
      "الرموز العامة: الـ <b>P</b> هو سعر البيع، والـ <b>C</b> هو التكلفة للوحدة، والـ <b>S</b> هو سعر الـ <bdi>day-old</bdi> (salvage). وهنا<span class=\"ltr\">P = $4.50,   C = $2.00,   S = $1.50</span>",
      "الشكل 8-6، وهو model المحل: الـ controllable input هو كمية الإنتاج x، والـ uncontrollable input هو الـ demand اليومي d، وصندوق الـ model فيه<span class=\"ltr\">if x ≤ d:  z = 2.50x<br>if x &gt; d:  z = 3.00d − 0.50x</span>والـ output هو الربح اليومي z. ولأن الـ demand مش مضمون، ده <b>stochastic model</b>."
     ],
     "figH": {
      "ms-cake-model": "الـ Figure 8-6: اختار x و d وشوف أنهي حالة في الـ model بتدّي الـ z"
     }
    },
    {
     "h": "الـ Cake shop: خطوات الـ simulation وتوليد الـ demand",
     "pts": [
      "الشكل 8-7، وهو flowchart لـ N يوم: نختار كمية إنتاج (مثلاً <bdi>x = 3</bdi>)، ونولّد قيمة للـ demand اليومي (مثلاً <bdi>d = 5</bdi>)، ونحسب الربح اليومي<span class=\"ltr\">x = 3,  d = 5  →  z = 3(2.50) = 7.50</span>ونضيفه للربح الكلي، ونرجع نكرر لـ N يوم افتراضي.",
      "الربح الكلي للفترة دي بيقدّر الربح اللي هيتحقق لو استخدمنا كمية الإنتاج دي لنفس عدد الأيام في الحقيقة.",
      "الـ demands المتولّدة لازم تمثّل الـ demand الحقيقي: لو الـ demand distribution مش دقيق، نتايج الـ simulation ملهاش قيمة (inputs مش دقيقة بتطلّع outputs ملهاش لازمة).",
      "الـ relative frequency هي عدد مرات الملاحظة على إجمالي عدد الملاحظات وده من آخر 20 يوم في Table 8-2.",
      "الطريقة اليدوية: نقطّع ورق لـ <b>20 حتة متساوية</b> ونكتب 0 على حتة واحدة، و 1 على اتنين، و 2 على واحدة، و 3 على اتنين، و 4 على تلاتة، و 5 على ستة، و 6 على تلاتة، و 7 على واحدة، و 8 على واحدة. وبعدين نقلّبهم ونسحب ورقة (with replacement) لكل يوم متسمّل.",
      "على المدى الطويل ده بيطلّع 0 حوالي 5% من الوقت، و 1 حوالي 10%، وهكذا.",
      "تحويل الـ random numbers لـ demand (لما الكمبيوتر ياخد مكان الورق): الـ lecture notes بتدّي كل قيمة interval من الـ <bdi>pseudo-random</bdi> numbers <b>شامل الطرف الأصغر</b>، زي في الـ Auto Supplies Tables 8-8 و 8-9، يعني من 0.00 لـ 0.49999 يبقى 0، ومن 0.50 لـ 0.74999 يبقى 1، وهكذا. بالنسبة لـ Table 8-2 ده بيدّي:<span class=\"ltr\">0: 0.00 to 0.04999<br>1: 0.05 to 0.14999<br>2: 0.15 to 0.19999<br>3: 0.20 to 0.29999<br>4: 0.30 to 0.44999<br>5: 0.45 to 0.74999<br>6: 0.75 to 0.89999<br>7: 0.90 to 0.94999<br>8: 0.95 to 0.99999</span>",
      "عشان كده الـ random number اللي يساوي cumulative probability (زي 0.15 أو 0.75) بيروح للقيمة <b>اللي بعدها</b>:<span class=\"ltr\">0.15 → 2,    0.75 → 6</span>أما قراءة الـ random digits في Lecture 2 و Quiz 5 <bdi>(01-05, 06-15, ...)</bdi> والقاعدة<span class=\"ltr\">F(xᵢ₋₁) &lt; R ≤ F(xᵢ)</span>بتاعة Lecture 5 فبيحطّوه في القيمة الأصغر:<span class=\"ltr\">0.15 → 1,    0.75 → 5</span>ولازم تقول إنت ماشي بأنهي convention."
     ],
     "figH": {
      "ms-cake-flow": "الـ Figure 8-7 خطوة بخطوة بـ 3 كيكات وأول أيام",
      "ms-cake-slips": "طلّع الـ demands بالـ 20 ورقة أو بفترات الأرقام العشوائية"
     }
    },
    {
     "h": "الـ Cake shop: الـ simulation اليدوي لـ 10 أيام بـ 3 تورتات (Table 8-3)",
     "pts": [
      "اليوم 1:<span class=\"ltr\">d = 5 &gt; x = 3</span>يعني <bdi>under-production</bdi> بـ 2، فالربح<span class=\"ltr\">z = 2.5(3) = $7.50</span>والإجمالي $7.50.",
      "اليوم 2: الورقة بترجع والورق بيتقلّب تاني، و<span class=\"ltr\">d = 1 &lt; x</span>فـ<span class=\"ltr\">z = 3(1) − 0.5(3) = $1.50</span>والإجمالي $9.00.",
      "اليوم 8:<span class=\"ltr\">d = 0:   z = 3(0) − 0.5(3) = −$1.50</span>يعني الـ 3 تورتات اتباعوا <bdi>day-old</bdi> بخسارة $0.50 للواحدة.",
      "الربح المتوقع للـ 10 أيام مع<span class=\"ltr\">x = 3</span>هو <b>$60.00</b>."
     ],
     "figH": {
      "ms-cake-sim": "الـ 10 أيام لأي كمية إنتاج بالـ goodwill cost أو من غيره"
     }
    },
    {
     "h": "الـ Cake shop: مقارنة كميات الإنتاج والخلاصة (Tables 8-4 و 8-5)",
     "pts": [
      "لو استخدمنا <b>نفس</b> الـ 10 demands<span class=\"ltr\">5, 1, 6, 3, 4, 4, 8, 0, 5, 6</span>لكل x من 1 لـ 8 بيطلع Table 8-4؛ وأحسن ربح للـ 10 أيام عند <b><bdi>x = 6</bdi> بربح $90</b>.",
      "مثال لـ <bdi>x = 6</bdi>: الأيام اللي فيها <bdi>d ≥ 6</bdi> (6 و 8 و 6) بيكسبوا 15 لكل يوم؛ والباقي:<span class=\"ltr\">d = 5:  3(5) − 3 = 12   (twice)<br>d = 4:  9   (twice)<br>d = 3:  6<br>d = 1:  0<br>d = 0:  −3</span>والمجموع 90.",
      "الـ 10 أيام مدة قصيرة أوي عشان نثق في النتيجة: الـ demands بتاعة 2 و 7 ما ظهروش خالص مع إن Table 8-2 بيدّي كل واحد فيهم 5% (‡ الكتاب بيقول <bdi>\"such demands occur 10% of the time\"</bdi>، وده صح بس للاتنين مع بعض).",
      "كل ما نشغّل أطول، الـ demands المتسمّلة بتمشي مع Table 8-2 أكتر. والـ computer simulation لـ <b>500 يوم</b> في Table 8-5 برضه بتدّي <b><bdi>x = 6</bdi></b> كأحسن اختيار (إجمالي $4467).",
      "الخلاصة: لو الـ model والـ demand distribution مناسبين، كمية الإنتاج المقترحة هي <b><bdi>x = 6</bdi> تورتات في اليوم</b>."
     ],
     "figH": {
      "ms-cake-compare": "الجدولين 8-4 و 8-5: الـ 10 أيام والـ 500 يوم الاتنين بيختاروا 6 كيكات"
     }
    },
    {
     "h": "مشكلة الـ Inventory (8-6): الـ Auto Supplies، شوف Lecture 2",
     "pts": [
      "الـ case دي (فيها 2 decision variables: الـ <b>order quantity x</b> والـ <b>reorder point r</b>؛ و 2 probabilistic components: الـ <b>daily demand</b> والـ <b>lead time</b>) هي نفس مثال الـ Auto Supplies بتاع Lecture 2 في الـ section اللي اسمه <bdi>\"Simulation of Inventory Systems\"</bdi>: الـ distributions بتاعته، وجدول الـ 10 أيام (<bdi>x = 5, r = 3</bdi>، ومتوسط تكلفة $19.27 في اليوم)، والـ cost grids بتاعة الـ 1000 يوم موجودين هناك ومش هنكررهم هنا.",
      "الـ lecture notes بتدّي نفس الـ distributions بتاعة Lecture 2 (Tables 8-6 و 8-7)، وبعدين intervals من الـ <bdi>pseudo-random</bdi> numbers احتمالها بيساوي الـ relative frequency، وده في Tables 8-8 و 8-9، وكل interval شامل الطرف الأصغر، يعني مثلاً <bdi>R = 0.50</bdi> بيدّي demand قدره 1 مش 0.",
      "المشكلة: شركة <bdi>Auto Supplies, Inc.</bdi> عندها أكتر من 1000 item؛ والـ demand على tool cabinet بيتغير، والـ lead time بيتغير من 1 لـ 5 أيام. الهدف: order quantity و reorder point بـ <b>أقل total cost</b>، يعني أقل مجموع للـ ordering والـ holding والـ shortage cost.",
      "التكاليف: الـ ordering <b>$20 للـ order</b>، والـ holding <b>$0.10 للوحدة في اليوم</b>، والـ shortage <b>$50 للوحدة</b> (بيعة ضايعة و goodwill).",
      "الـ distributions بتيجي من السجلات التاريخية لو موجودة (الـ demand على مدى 300 يوم، والـ lead time على مدى 30 order)، غير كده من التقدير الشخصي أو الخبرة أو الإحساس (intuition).",
      "يوم واحد متسمّل (الشكل 8-8):<br>(1) فيه arrivals؟ نحدّث <bdi>I = I + x</bdi> (الـ orders بتوصل أول اليوم)<br>(2) نولّد الـ daily demand d<br>(3) لو <bdi>I ≥ d</bdi> يبقى <bdi>I = I − d</bdi>؛ غير كده shortage cost قدرها <bdi>$50(d − I)</bdi> و <bdi>I = 0</bdi> (الـ customer بياخد الموجود ويشتري الباقي من مكان تاني)<br>(4) لو <bdi>I ≤ r</bdi> ومفيش order لسه ما وصلش: نطلب order ($20) ونولّد lead time L (عمره ما يبقى فيه 2 orders مستنيين في نفس الوقت)<br>(5) الـ holding cost بيساوي <bdi>0.10 × I</bdi><br>(6) الـ total daily cost بيساوي مجموع الـ shortage والـ ordering والـ holding.",
      "النتايج والخلاصة: الحلول الكويسة بتبقى حوالين <b>order quantities من 20 لـ 25</b> و<b>reorder points 6 أو 7</b>. الـ simulation مش بتضمن الـ optimum، بس بتحدد قرارات <b><bdi>near-optimal</bdi></b> بتكلفة قليلة؛ والاختيار النهائي بتاع الـ analyst.",
      "‡ النص بيقول إن أقل تكلفة في <bdi>Table 8-11</bdi> عند <bdi>x = 25, r = 6</bdi> بـ $2.39 في اليوم، بس الجدول بيبيّن 3.39 هناك (وأصغر قيمة فيه غير الـ 0.90 المشكوك فيها عند <bdi>x = 5, r = 4</bdi> هي 2.42 عند <bdi>x = 20, r = 5</bdi>). والنص بيقول إن أصغر تكلفة في <bdi>Table 8-12</bdi> هي $2.33 عند <bdi>x = 22, r = 6</bdi>، بس الجدول بيبيّن برضه 2.32 عند <bdi>x = 29, r = 7</bdi>.",
      "‡ الجدول 8-7 كاتب الـ relative frequency لـ lead time بـ 5 أيام 1.10؛ والصح 0.10 (يعني 3 من 30). والجدول 8-8 كاتب الـ interval بتاع demand قدره 3 كـ <bdi>\"0.90 to 0.49999\"</bdi>؛ والصح من 0.90 لـ 0.94999.",
      "‡ الـ <bdi>Table 8-11</bdi> في الـ lecture notes بيختلف عن الـ slide بتاع Lecture 2 في خانتين: الخانة <bdi>(r = 4, x = 5)</bdi> قيمتها 0.90 في الـ notes بس 3.90 في الـ slide، والخانة <bdi>(r = 6, x = 20)</bdi> قيمتها 2.60 في الـ notes بس 2.10 (أحسن قيمة، والمعلّم عليها) في الـ slide. وجدول الـ 10 أيام (Table 8-10، ومتوسط $19.27 في اليوم) هو هو في الاتنين، ومفيش ولا random number فيه واقع على حدود interval."
     ],
     "figH": {
      "ms-inv-day": "الـ Figure 8-8: يوم واحد في الـ simulation، اختار الإجابات واتبع المسار"
     }
    },
    {
     "h": "ملخص الشابتر (8-7)",
     "pts": [
      "الـ simulation ليها spectrum من أنماط الاستخدام، من <b>حل المشاكل (problem solving)</b> لحد <b>جمع الـ insight (insight gathering)</b> في ظروف فيها uncertainty عالية.",
      "لو user بيسأل أسئلة زي:<span class=\"ltr\">What would happen if ...?<br>How will a ...?<br>Why would a ...?<br>Can a ...?<br>Does the ...?<br>Should we ...?</span>واستخدم الـ simulation عشان يجاوب، يبقى الـ user غالبًا بيعمل <b>problem solving</b> بالـ simulation."
     ]
    },
    {
     "h": "أسئلة آخر الشابتر (8-8): من الكتاب",
     "pts": [
      "في السؤال 1: الجزء (a) اكتب برنامج يحسب بـ Monte Carlo المساحة المحصورة بين<span class=\"ltr\">y = f(x) = x/(1 + x²)</span>ومحور الـ x والخطين <bdi>x = b</bdi> و <bdi>x = c</bdi>؛ والجزء (b) اعرض المساحة والنقط المتولّدة بشكل رسومي.",
      "السؤال 2 (الـ cake shop مع goodwill cost قدرها $2 لكل طلب يومي ما اتلبّاش): الجزء (i) وضّح الـ profit model؛ والجزء (ii) استخدم الـ 10 أيام من الـ demand المتسمّل عشان تعمل simulation لـ <bdi>x = 6, 7, 8</bdi>؛ والجزء (iii) أنهي الأحسن، وإيه اللي بيحصل لقرار الإنتاج لما نحسب الـ goodwill costs؟ (‡ الكتاب بيقول <bdi>\"table (8-1)\"</bdi>، بس الـ 10 طلبات اليومية المتسمّلة موجودين في الجدول 8-3 مش في الجدول ده.)",
      "الـ goodwill model (لما <bdi>g = $2</bdi>):<span class=\"ltr\">x ≤ d  →  z = 2.5x − 2(d − x) = 4.5x − 2d<br>x &gt; d  →  z = 3d − 0.5x   (unchanged)</span>",
      "بالـ demands<span class=\"ltr\">5, 1, 6, 3, 4, 4, 8, 0, 5, 6</span>النتايج:<span class=\"ltr\">x = 6  →  12, 0, 15, 6, 9, 9, 11, −3, 12, 15 = <b>$86</b><br>x = 7  →  <b>$86</b><br>x = 8  →  <b>$86</b></span>يعني تعادل بين التلاتة (<bdi>three-way</bdi> tie). ومن غير الـ goodwill كانت <bdi>x = 7</bdi> و <bdi>x = 8</bdi> بيدّوا 88 و 86، أقل من <bdi>x = 6</bdi> اللي بتدّي 90: الـ goodwill cost بتعاقب الـ <bdi>under-production</bdi>، فأحسن كمية إنتاج بتميل إنها <b>تزيد</b> (أو على الأقل ما تقلّش).",
      "السؤال 3 (بتاع Jim Nelson): الاختيار الأول أتوبيس + مشي، والتاني إنه يسوق للـ parking وبعدين يركن ويمشي:<span class=\"ltr\">bus + walk: 25/30/35/40 min with 0.50/0.25/0.15/0.10<br>driving to the parking lot: 20/25/30/35 min with 0.40/0.40/0.10/0.10<br>parking + walking: 2/4/6 min with 0.15/0.75/0.10</span>الجزء (a) هات الـ <bdi>random-number</bdi> intervals؛ والجزء (b) اعمل simulation لـ 10 أيام لكل اختيار واقترح policy.",
      "السؤال 4 (بيّاع مجلات <bdi>door-to-door</bdi>): مفيش حد بيرد في 30% من البيوت؛ واللي بيردّوا 80% منهم ستات و 20% رجالة. الست: فيه 15% فرصة بيع، والاشتراكات<span class=\"ltr\">1/2/3 with 0.60/0.30/0.10</span>الراجل: فيه 25% فرصة بيع، والاشتراكات<span class=\"ltr\">1/2/3/4 with 0.10/0.40/0.30/0.20</span>الربح $2 لكل اشتراك. الجزء (a) ارسم flowchart الـ output بتاعه الربح الكلي لـ N بيت؛ والجزء (b) اعمل simulation لـ 25 زيارة؛ والجزء (c) المبيعات والربح المتوقعين لـ 100 بيت في اليوم.",
      "السؤال 5 (الـ inventory بتاع Bristol Bikes): الـ weekly demand من 0 لـ 5 باحتمالات<span class=\"ltr\">0.20/0.50/0.10/0.10/0.05/0.05</span>والـ lead time من 1 لـ 4 أسابيع باحتمالات<span class=\"ltr\">0.10/0.25/0.60/0.05</span>والـ holding بـ $1 للوحدة في الأسبوع، والـ ordering بـ $20، والـ shortage بـ $25 للوحدة، والـ beginning inventory قدره 7؛ اعمل simulation لـ 10 أسابيع بـ order quantity قدرها 12 و reorder point قدره 5."
     ]
    }
   ],
   "cards": [
    "الـ Problem definition، والـ assumptions، والـ model، والـ <bdi>flowchart/algorithm</bdi>، والـ code، والـ output، والـ statistical analysis.",
    "الخطوات:<span class=\"ltr\">R0 = rand();   R1 = R0/(RAND_MAX+1);   R2 = R1 × (High − Low)</span>بعدين truncate للـ integers، وفي الآخر<span class=\"ltr\">R = R2 + Low</span>",
    "الـ <bdi>inter-arrival</bdi> time uniform من 1 لـ 10 دقايق؛ والـ service time uniform من 1 لـ 6 دقايق (<bdi>single-channel</bdi> queue).",
    "القيمة هي<span class=\"ltr\">Max(Ar_Clk[i], Serv_end[i−1])</span>",
    "بيساوي<span class=\"ltr\">Serv_end[i] − Ar_Clk[i]</span>يعني الوقت في الـ system كله: انتظار + خدمة.",
    "بيساوي<span class=\"ltr\">Ar_Clk[i] − Serv_end[i−1]</span>لو الـ customer وصل بعد ما اللي قبله مشي؛ وغير كده بيبقى 0.",
    "القانون:<span class=\"ltr\">P = Σ Idle / t × 100</span>حيث t هي نهاية آخر خدمة. والـ standard idle هو 12.5% (H.R.W.).",
    "متوسط الانتظار<span class=\"ltr\">48/20 = 2.4 min</span>وده كويس؛ والـ idle<span class=\"ltr\">57/104 = 54.8%</span>يعني الـ clerk قاعد idle وقت طويل.",
    "القانون:<span class=\"ltr\">A = K h (c − b) / N</span>حيث K من N نقطة عشوائية في المستطيل <bdi>h × (c − b)</bdi> وقعوا تحت المنحنى.",
    "القيمة المظبوطة <bdi>π/4 = 0.7853981</bdi>؛ والـ simulation بـ 3000 نقطة طلّعت 0.78399998.",
    "نفس المستوى الأفقي (2-D)، وسرعة الـ fighter ثابتة 20 km في الدقيقة، ومسار الـ bomber معروف، والـ fighter بيعيد التوجيه كل دقيقة؛ وبيتمسك في حدود 10 km؛ وبيهرب بعد 12 دقيقة.",
    "التحديث:<span class=\"ltr\">XF(t+1) = XF(t) + VF cos θ<br>YF(t+1) = YF(t) + VF sin θ</span>حيث<span class=\"ltr\">cos θ = (XB − XF)/DIST,    sin θ = (YB − YF)/DIST</span>",
    "الـ fighter بيمسك الـ bomber عند الدقيقة 9، والمسافة 2.969 km.",
    "من 00 لـ 24 شرق <bdi>(X+1)</bdi>، ومن 25 لـ 49 غرب <bdi>(X−1)</bdi>، ومن 50 لـ 74 شمال <bdi>(Y+1)</bdi>، ومن 75 لـ 99 جنوب <bdi>(Y−1)</bdi>.",
    "بعد 10 blocks لازم<span class=\"ltr\">|X| + |Y| ≤ 2</span>والـ 5 تجارب بتوع الكتاب فيهم 3 نجاحات.",
    "نرمي لحد ما<span class=\"ltr\">|H − T| = 3</span>وبندفع $1 على كل رمية وناخد $8 في الآخر؛ والصافي<span class=\"ltr\">net = 8 − flips</span>ونكسب لو عدد الرميات أقل من 8.",
    "في Lab 5 (100 لعبة):<span class=\"ltr\">P(success) 0.71,  gain 255,  loss 247,  mean 0.08</span>يعني safe. وفي Quiz 2 (13 لعبة):<span class=\"ltr\">mean −0.3846,  var 64.237,  SD 8.015</span>يعني not safe.",
    "التكلفة $0.33، والسعر $0.50، والـ scrap $0.05، والـ lost profit $0.17 لكل طلب ما اتلبّاش.",
    "نشتري 60 جرنال (<bdi>Q = 60</bdi>)، والربح الكلي للـ 10 أيام $74.40.",
    "الموديل:<span class=\"ltr\">x ≤ d:  z = 2.5x<br>x > d:  z = 3d − 0.5x</span>بالقيم<span class=\"ltr\">P = 4.50,   C = 2.00,   S = 1.50</span>",
    "الصيغة العامة:<span class=\"ltr\">x ≤ d:  z = (P − C)x<br>x > d:  z = (P − S)d + (S − C)x</span>",
    "الـ controllable هو كمية الإنتاج x؛ والـ uncontrollable هو الـ demand اليومي d (وعشان كده الـ model بيبقى stochastic).",
    "الإجابة <bdi>x = 6</bdi> (في 10 أيام $90؛ وفي 500 يوم $4467).",
    "الـ order بـ $20 للطلب، والـ holding بـ $0.10 للوحدة في اليوم، والـ shortage بـ $50 للوحدة (شوف Lecture 2).",
    "أسئلة زي:<span class=\"ltr\">What would happen if...?   How will a...?   Why would a...?   Can a...?   Does the...?   Should we...?</span>"
   ],
   "qa": [
    "الخطوات:<br>(1) نولّد<span class=\"ltr\">R0 = rand()</span>(2) نعمل normalize:<span class=\"ltr\">R1 = R0/(RAND_MAX + 1) ∈ [0,1)</span>(3) نعمل scale:<span class=\"ltr\">R2 = R1 × (High − Low)</span>(4) نعمل truncate (للـ integers)<br>(5) نعمل translate:<span class=\"ltr\">R = R2 + Low</span>المثال:<span class=\"ltr\">R2 = 0.5 × (10 − 1) = 4.5 → 4 → R = 4 + 1 = 5</span>",
    "لكل customer رقم i:<span class=\"ltr\">Ar_Clk[i] = Ar_Clk[i−1] + delay[i]<br>Serv_begin[i] = Max(Ar_Clk[i], Serv_end[i−1])<br>Serv_end[i] = Serv_begin[i] + Serv_time[i]<br>WT[i] = Serv_end[i] − Ar_Clk[i]<br>Idle[i] = Ar_Clk[i] − Serv_end[i−1]   (if positive, else 0)</span>متوسط الوقت في الـ system:<span class=\"ltr\">Ar = Σ WT(i)/n</span>ونسبة الـ idle بتاعة الـ clerk:<span class=\"ltr\">P = Σ Idle/t × 100</span>حيث t هي نهاية خدمة آخر customer (والـ standard هو 12.5% حسب H.R.W.).",
    "الجدول:<table><tr><th>العميل</th><th>الوصول</th><th>بداية الخدمة</th><th>نهاية الخدمة</th><th>WT</th><th>Idle</th></tr><tr><td>1</td><td>0</td><td>0</td><td>2</td><td>2</td><td>0</td></tr><tr><td>2</td><td>4</td><td>4</td><td>9</td><td>5</td><td>2</td></tr><tr><td>3</td><td>6</td><td>9</td><td>10</td><td>4</td><td>0</td></tr><tr><td>4</td><td>14</td><td>14</td><td>18</td><td>4</td><td>4</td></tr><tr><td>5</td><td>17</td><td>18</td><td>21</td><td>4</td><td>0</td></tr></table>متوسط الانتظار<span class=\"ltr\">19/5 = 3.8 min</span>ونسبة الـ idle<span class=\"ltr\">6/21 × 100 ≈ 28.57%</span>والـ lab كاتبها 28.5%، وده أعلى بكتير من الـ standard اللي هو 12.5%.",
    "نحط المساحة جوه مستطيل قاعدته <bdi>(c − b)</bdi> وارتفاعه <bdi>h ≥ f(x)</bdi>. نرمي N نقطة عشوائية uniform <bdi>(x, y)</bdi>، ونعدّ K نقطة فيهم <bdi>y ≤ f(x)</bdi>. وبما إن<span class=\"ltr\">p = A/(h(c − b))</span>يبقى<span class=\"ltr\">A = K h (c − b)/N</span>ولـ<span class=\"ltr\">f(x) = √(1 − x²),   b = 0,   c = 1,   h = 1</span>يبقى <bdi>A = K/N</bdi>؛ ومع 3000 نقطة البرنامج طلّع 0.78399998، قصاد القيمة المظبوطة <bdi>π/4 = 0.7853981</bdi>. والقيمة دي جاية من التعويض:<span class=\"ltr\">x = sin θ,   A = ∫₀^(π/2) cos²θ dθ = ½[θ + ½ sin 2θ] = π/4</span>والـ simulation أقل دقة من الحل التحليلي، وتستاهل بس لما الطرق التحليلية أو العددية أو التجارب الفيزيائية تبقى صعبة أو مكلفة أو خطيرة أو مستحيلة.",
    "الـ assumptions: الطيارتين في نفس المستوى الأفقي (model بـ 2-D)؛ وسرعة الـ fighter ثابتة 20 km في الدقيقة؛ ومسار الـ bomber معروف؛ والـ fighter بيعيد التوجيه كل دقيقة؛ وبيتمسك لما <bdi>DIST ≤ 10 km</bdi>؛ وبيهرب بعد 12 دقيقة.<br>الـ model:<span class=\"ltr\">DIST = √[(YB − YF)² + (XB − XF)²]<br>sin θ = (YB − YF)/DIST<br>cos θ = (XB − XF)/DIST<br>XF(t+1) = XF(t) + VF cos θ<br>YF(t+1) = YF(t) + VF sin θ</span>عند الزمن 0:<span class=\"ltr\">DIST = √(50² + 80²) = 94.34;   sin θ = −0.53,  cos θ = 0.85;   XF(1) = 17,  YF(1) = 39.4</span>عند الزمن 1:<span class=\"ltr\">DIST = √(41.4² + 73²) = 83.922;   sin θ = −0.49,  cos θ = 0.87;   XF(2) = 34.4,  YF(2) = 29.6</span>ولو كمّلنا (بالبرنامج)، المسافة بتنزل لـ 2.969 km عند الدقيقة 9، فالـ bomber بيتدمر بعد 9 دقايق.",
    "نبدأ عند <bdi>(0,0)</bdi>؛ ولكل block نسحب RN من رقمين: من 00 لـ 24 شرق <bdi>(X+1)</bdi>، ومن 25 لـ 49 غرب <bdi>(X−1)</bdi>، ومن 50 لـ 74 شمال <bdi>(Y+1)</bdi>، ومن 75 لـ 99 جنوب <bdi>(Y−1)</bdi>. وبعد 10 blocks التجربة بتنجح لو<span class=\"ltr\">|X| + |Y| ≤ 2</span>التجربة 1:<span class=\"ltr\">73 → (0,1), 21 → (1,1), 45 → (0,1), 76 → (0,0), 96 → (0,−1), 94 → (0,−2), 53 → (0,−1), 57 → (0,0), 96 → (0,−1), 43 → (−1,−1)</span>ويبقى<span class=\"ltr\">|−1| + |−1| = 2 ≤ 2</span>يعني success. ومن الـ 5 تجارب بتوع الكتاب 3 نجحوا (تقدير 0.6)، بس 5 تجارب قليلين أوي على تقدير كويس.",
    "الـ x هو عدد التورتات اللي اتعملت، والـ d هو الـ demand اليومي، والـ z هو الربح اليومي.<br>لما<span class=\"ltr\">x ≤ d:   z = (P − C)x = 2.5x</span>ولما<span class=\"ltr\">x &gt; d:   z = d(P − C) + (x − d)(S − C) = (P − S)d + (S − C)x = 3d − 0.5x</span>الـ inputs: كمية الإنتاج x (controllable)، والـ demand اليومي d (uncontrollable، فالـ model بيبقى stochastic). والـ output: الربح اليومي z.",
    "الأيام اللي فيها <bdi>d ≥ 3</bdi> بتكسب <bdi>2.5(3) = 7.50</bdi>؛ ويوم <bdi>d = 1</bdi> بيكسب <bdi>3(1) − 1.5 = 1.50</bdi>؛ ويوم <bdi>d = 0</bdi> بيدّي −1.50. الأرباح اليومية:<span class=\"ltr\">7.50, 1.50, 7.50, 7.50, 7.50, 7.50, 7.50, −1.50, 7.50, 7.50</span>والتراكمي:<span class=\"ltr\">7.50, 9.00, 16.50, 24.00, 31.50, 39.00, 46.50, 45.00, 52.50, 60.00</span>والإجمالي $60.<br>وبنفس الـ demands:<span class=\"ltr\">x = 1..8  →  22, 41, 60, 76, 86, 90, 88, 86</span>فـ <bdi>x = 6</bdi> هي الأحسن. والـ run على الكمبيوتر لـ 500 يوم برضه بيدّي <bdi>x = 6</bdi> ($4467)، وهي الكمية المقترحة.",
    "لما<span class=\"ltr\">x ≤ d:   z = 2.5x − 2(d − x) = 4.5x − 2d</span>ولما<span class=\"ltr\">x &gt; d:   z = 3d − 0.5x</span>النتايج:<span class=\"ltr\">x = 6:  12, 0, 15, 6, 9, 9, 11, −3, 12, 15 = $86<br>x = 7:  11.5, −0.5, 14.5, 5.5, 8.5, 8.5, 15.5, −3.5, 11.5, 14.5 = $86<br>x = 8:  11, −1, 14, 5, 8, 8, 20, −4, 11, 14 = $86</span>يعني التلاتة متعادلين عند $86 في الـ 10 أيام دول. والـ goodwill cost بتخلّي الـ <bdi>under-production</bdi> أغلى، فعمومًا بتزق أحسن كمية إنتاج لفوق.",
    "الخطوات:<br>(1) لو فيه order وصل نحدّث <bdi>I = I + x</bdi> (أول اليوم)<br>(2) نولّد الـ demand d<br>(3) لو <bdi>I ≥ d</bdi> يبقى <bdi>I = I − d</bdi>؛ غير كده shortage cost قدرها <bdi>$50(d − I)</bdi> و <bdi>I = 0</bdi><br>(4) لو <bdi>I ≤ r</bdi> ومفيش order مستني: نطلب order (تكلفته $20) ونولّد lead time L<br>(5) الـ holding cost بيساوي <bdi>$0.10 × I</bdi><br>(6) الـ total daily cost بيساوي مجموع الـ shortage والـ ordering والـ holding.<br>ونكرر لأيام كتير ولأزواج <bdi>(x, r)</bdi> كتير عشان نلاقي policy قريبة من الـ optimal (التفاصيل والجداول في Lecture 2).",
    "الـ model: صافي مكسب اللعبة<span class=\"ltr\">net gain = 8 − (number of flips)</span>بتكسب فلوس لو اللعبة احتاجت أقل من 8 رميات وبتخسر لو احتاجت أكتر (وعدد الرميات دايمًا فردي: 3 و 5 و 7 وهكذا).<br>الـ simulation بالـ 100 رقم بتدّي 13 لعبة كاملة (آخر لعبة بتعدّي الرقم رقم 100 وبترجع تلف من أول الليستة):<table><tr><th>اللعبة</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th></tr><tr><td>الرميات</td><td>9</td><td>3</td><td>3</td><td>3</td><td>5</td><td>5</td><td>5</td><td>25</td><td>3</td><td>13</td><td>5</td><td>3</td><td>27</td></tr><tr><td>صافي المكسب ($)</td><td>−1</td><td>5</td><td>5</td><td>5</td><td>3</td><td>3</td><td>3</td><td>−17</td><td>5</td><td>−5</td><td>3</td><td>5</td><td>−19</td></tr></table>مثلاً اللعبة 1:<span class=\"ltr\">T H T H H T T T T    (0.34, 0.90, 0.25, 0.89, 0.87, 0.44, 0.12, 0.21, 0.46)</span>الفرق بيوصل لـ 3 tails بعد 9 رميات، فالصافي<span class=\"ltr\">8 − 9 = −1</span>الـ Mean:<span class=\"ltr\">μ = Σ net / n = −5/13 = <b>−0.3846</b></span>الـ Variance:<span class=\"ltr\">σ² = (1/N) Σ (netᵢ − μ)² = 835.08/13 = <b>64.237</b></span>الـ Standard deviation:<span class=\"ltr\">σ = √64.237 = <b>8.015</b></span>اتكسب 9 من الـ 13 لعبة، بس الخساير كبيرة (لحد −$19)، فمتوسط صافي المكسب سالب: يعني اللاعب متوقع يخسر فلوس على المدى الطويل. واللعبة <b>مش آمنة (not safe to play)</b>.<br>(الـ case study بتقول نكرر اللعبة 100 مرة؛ بس بـ 100 random number بس الـ quiz قدر يكمّل 13 لعبة.)",
    "<b>الخطوة 1: نوع اليوم والـ demand</b><table><tr><th>اليوم</th><th>RN النوع</th><th>النوع</th><th>RN الـ demand</th><th>الـ demand</th></tr><tr><td>1</td><td>0.41</td><td>Fair</td><td>0.19</td><td>50</td></tr><tr><td>2</td><td>0.68</td><td>Fair</td><td>0.72</td><td>70</td></tr><tr><td>3</td><td>0.89</td><td>Poor</td><td>0.75</td><td>70</td></tr><tr><td>4</td><td>0.94</td><td>Poor</td><td>0.08</td><td>50</td></tr><tr><td>5</td><td>0.74</td><td>Fair</td><td>0.54</td><td>60</td></tr><tr><td>6</td><td>0.91</td><td>Poor</td><td>0.02</td><td>50</td></tr><tr><td>7</td><td>0.55</td><td>Fair</td><td>0.01</td><td>50</td></tr><tr><td>8</td><td>0.62</td><td>Fair</td><td>0.36</td><td>60</td></tr><tr><td>9</td><td>0.36</td><td>Fair</td><td>0.16</td><td>50</td></tr><tr><td>10</td><td>0.27</td><td>Good</td><td>0.28</td><td>70</td></tr></table><b>الخطوة 2: الربح اليومي</b> = الإيراد من البيع − تكلفة الجرايد − الـ lost profit من الطلب الزيادة + الـ salvage من الـ scrap:<span class=\"ltr\">Profit = 0.50 × min(D, Q) − 0.33 × Q − 0.17 × max(D − Q, 0) + 0.05 × max(Q − D, 0)</span>أمثلة لـ 50 جرنال:<span class=\"ltr\">demand 50:  25.00 − 16.50 = $8.50<br>demand 70:  25.00 − 16.50 − 0.17 × 20 = $5.10</span>ولـ 60 جرنال:<span class=\"ltr\">demand 50:  25.00 − 19.80 + 0.05 × 10 = $5.70<br>demand 60:  30.00 − 19.80 = $10.20<br>demand 70:  30.00 − 19.80 − 1.70 = $8.50</span>ولـ 70 جرنال:<span class=\"ltr\">demand 50:  25.00 − 23.10 + 1.00 = $2.90<br>demand 60:  $7.40<br>demand 70:  $11.90</span><b>الخطوة 3: الإجماليات على مدى الـ 10 أيام</b> (الـ demand قدره 50 جه 5 مرات، و 60 مرتين، و 70 تلات مرات)<table><tr><th>Q</th><th>الإيراد</th><th>التكلفة</th><th>الـ Salvage</th><th>الـ Lost profit</th><th>الربح الكلي</th></tr><tr><td>50</td><td>250.00</td><td>165.00</td><td>0.00</td><td>13.60</td><td>71.40</td></tr><tr><td>60</td><td>275.00</td><td>198.00</td><td>2.50</td><td>5.10</td><td><b>74.40</b></td></tr><tr><td>70</td><td>290.00</td><td>231.00</td><td>6.00</td><td>0.00</td><td>65.00</td></tr><tr><td>80</td><td>290.00</td><td>264.00</td><td>11.00</td><td>0.00</td><td>37.00</td></tr><tr><td>90</td><td>290.00</td><td>297.00</td><td>16.00</td><td>0.00</td><td>9.00</td></tr><tr><td>100</td><td>290.00</td><td>330.00</td><td>21.00</td><td>0.00</td><td>−19.00</td></tr></table>مثلاً لـ 60 جرنال:<span class=\"ltr\">275.00 − 198.00 − 5.10 + 2.50 = 74.40</span><b>أحسن policy</b>: نشتري <b>60 جرنال</b> في اليوم (<bdi>Q = 60</bdi>، والربح الكلي $74.40 على مدى الـ 10 أيام المتسمّلة)."
   ],
   "quiz": [
    [
     "الـ expression ده مش موجود في الـ model (L8, Gift Shop model)؛ الموجود هو<span class=\"ltr\">Ar_Clk[i] = Ar_Clk[i−1] + delay[i]</span>",
     "صح. الخدمة بتبدأ عند وصول الـ customer أو لما اللي قبله يمشي، أيهما أبعد.",
     "الخدمة مينفعش تبدأ قبل ما الـ customer يوصل أو قبل ما الـ clerk يفضى (L8, Gift Shop model).",
     "ده الـ waiting time يعني WT[i] (L8, Gift Shop model)."
    ],
    [
     "الـ 12.5% دي الـ standard بتاع H.R.W.، مش النتيجة (L8, Gift Shop output).",
     "دي بتاعة مثال الـ 5 customers يعني <bdi>6/21</bdi> (L8, Gift Shop worked example).",
     "صح، لأن<span class=\"ltr\">57/104 × 100 = 54.8%</span>",
     "الـ 2.4 ده متوسط وقت الانتظار بالدقايق <bdi>(48/20)</bdi> (L8, Gift Shop output)."
    ],
    [
     "مقلوبة: نسبة الإصابات هي <bdi>K/N</bdi> (L8, 8-2 Area under a curve).",
     "مساحة المستطيل بتضرب مش بتقسم (L8, 8-2 Area under a curve).",
     "صح. المعادلة (2):<span class=\"ltr\">p = A/(h(c − b))</span>وبنقدّرها بـ <bdi>K/N</bdi>.",
     "الـ <bdi>K/N</bdi> لوحدها تبقى المساحة بس لما <bdi>h(c − b) = 1</bdi>، زي مثال الـ <bdi>√(1 − x²)</bdi> (L8, 8-2)."
    ],
    [
     "ده الناتج المتسمّل بعد 3000 تجربة (L8, area output table).",
     "صح. بالتعويض <bdi>x = sin θ</bdi> التكامل بيبقى <bdi>∫ cos²θ dθ</bdi> على الفترة <bdi>[0, π/2]</bdi> ويساوي π/4.",
     "الـ ½ اللي جاي من<span class=\"ltr\">cos²θ = ½(1 + cos 2θ)</span>بيخلّيها π/4 (L8, analytic solution).",
     "الـ 1 دي مساحة المربع R كله (L8, 8-2)."
    ],
    [
     "صح. الـ VF ثابتة 20 km في الدقيقة، والـ bomber بيتضرب أول ما يبقى في حدود 10 km.",
     "مقلوبين (L8, Pursuit assumptions).",
     "الـ fighter بيضرب missile في حدود 10 km (L8, Pursuit assumptions).",
     "السرعة ثابتة؛ والـ 12 دي عدد الدقايق قبل ما المطاردة تتلغي (L8, Pursuit assumptions)."
    ],
    [
     "ده <bdi>80 + 50</bdi>، مش المسافة الـ Euclidean (L8, Pursuit worked example).",
     "صح، لأن<span class=\"ltr\">√(50² + 80²) = √8900 = 94.34</span>",
     "دي <bdi>DIST(1)</bdi> (L8, Pursuit worked example).",
     "دي <bdi>DIST(3)</bdi> في الـ output بتاع البرنامج (L8, Pursuit output)."
    ],
    [
     "الـ 11.447 أكبر من 10 km، فلسه ما اتمسكش (L8, Pursuit output).",
     "صح. المسافة أول مرة تنزل لـ 10 km أو أقل عند الدقيقة 9.",
     "الـ bomber بيتمسك قبل الدقيقة 12 (L8, Pursuit output).",
     "البرنامج بيطبع <bdi>\"The Fighter Catch &amp; Destroy The Bomber\"</bdi> (L8, Pursuit output)."
    ],
    [
     "الشرق من 00 لـ 24 (L8, 8-4 Staggering drunk).",
     "الغرب من 25 لـ 49 (L8, 8-4).",
     "صح. من 50 لـ 74 يعني شمال.",
     "الجنوب من 75 لـ 99 (L8, 8-4)."
    ],
    [
     "صح. التجارب 1 و 4 و 5 بتخلص عند <bdi>(−1,−1)</bdi> و <bdi>(2,0)</bdi> و <bdi>(−1,1)</bdi>، وكلهم في حدود 2 blocks.",
     "الجملة صح: التجربتين 2 <bdi>(0,−4)</bdi> و 3 <bdi>(4,−2)</bdi> فشلوا، والـ 3 الباقيين نجحوا (L8, 8-4 Table 8-1)."
    ],
    [
     "إنت بتدفع $1 على كل رمية، فالصافي <bdi>8 − 5 = 3</bdi> (L8, Flipping coin assumptions).",
     "صح. بتاخد $8 وبتدفع $5 على 5 رميات.",
     "أقل من 8 رميات يبقى مكسب (L8, Flipping coin assumptions).",
     "الصافي <bdi>8 − 5 = 3</bdi>؛ واللعبة دايمًا بتخلص بعد عدد فردي من الرميات، فصافي $0 (يعني 8 رميات بالظبط) عمره ما بيحصل (L8, Flipping coin assumptions)."
    ],
    [
     "صح. <bdi>−5/13 ≈ −0.3846</bdi> يعني خسارة متوقعة على المدى الطويل.",
     "الـ 0.08 دي بتاعة الـ run بتاع الـ 100 لعبة في Lab 5، مش Quiz 2 (L8, Quiz 2 worked example).",
     "الـ −5 ده المجموع؛ والـ mean بيتقسم على 13 (L8, Quiz 2 worked example).",
     "الـ 64.237 دي الـ variance (L8, Quiz 2 worked example)."
    ],
    [
     "ده لو الـ demand كان 70، يعني <bdi>35 − 23.10</bdi> (L8, Newspaper seller summary).",
     "صح، لأن<span class=\"ltr\">25.00 − 23.10 + 20 × 0.05 = 2.90</span>",
     "الـ 20 جرنال اللي ما اتباعوش بيجيبوا $1.00 salvage (L8, Newspaper seller)، فالربح<span class=\"ltr\">25 − 23.1 + 1 = 2.90</span>",
     "ده لـ <bdi>Q = 60</bdi> مع demand قدره 50 (L8, Newspaper seller policy Q = 60)."
    ],
    [
     "الـ <bdi>Q = 60</bdi> أعلى، بـ $74.40 (L8, Newspaper seller summary).",
     "صح. ده أعلى ربح كلي على مدى الـ 10 أيام.",
     "الـ <bdi>Q = 60</bdi> أعلى (L8, Newspaper seller summary).",
     "الـ <bdi>Q = 100</bdi> بيخسر فلوس (L8, Newspaper seller summary)."
    ],
    [
     "دي حالة <bdi>x ≤ d</bdi> (L8, Cake shop model).",
     "صح، لأن<span class=\"ltr\">z = (P − S)d + (S − C)x = 3d − 0.5x</span>",
     "الوحدات اللي ما اتباعتش عددها <bdi>x − d</bdi> (L8, Cake shop model)، فـ<span class=\"ltr\">z = 2.5d − 0.5(x − d) = 3d − 0.5x</span>",
     "ده بيتجاهل الـ salvage بتاع الـ leftovers اللي هو $1.50 (L8, Cake shop model)."
    ],
    [
     "كمية الإنتاج x هي الـ controllable input، والـ demand d هو الـ uncontrollable input، والربح اليومي z هو الـ output (L8, Cake shop model, Figure 8-6).",
     "صح. الـ x هي الـ controllable، والـ d هو الـ uncontrollable (فالـ model بيبقى stochastic)، والـ z هو الـ output."
    ]
   ],
   "extra": [
    [
     "صح. الـ arrivals عند<span class=\"ltr\">0, 2, 8, 9, 14</span>والنهايات<span class=\"ltr\">3, 7, 10, 13, 16</span>والـ WT<span class=\"ltr\">3, 5, 2, 4, 2 = 16 → 3.2</span>والـ idle<span class=\"ltr\">1 + 1 = 2   over 16 min = 12.5%</span>",
     "الـ 2.8 ده متوسط الـ service time <bdi>(14/5)</bdi>؛ والـ WT فيه وقت الـ queue كمان (L8, Gift Shop model).",
     "الـ idle دقيقتين بس (الـ customers 3 و 5 كل واحد فيهم بيلاقي الـ clerk فاضي دقيقة)؛ و <bdi>2/16 = 12.5%</bdi> (L8, Gift Shop model).",
     "مجموع الـ WT بيساوي 16، فـ <bdi>16/5 = 3.2</bdi>؛ والـ clerk بيبقى idle دقيقتين (L8, Gift Shop model)."
    ],
    [
     "الـ d أقل من 1، فـ <bdi>int(d × 5) ≤ 4</bdi> والـ 6 عمرها ما بتطلع (L8, Generating random numbers ‡).",
     "صح. الـ <bdi>int(d × 5)</bdi> قيمته من 0 لـ 4، فالنتيجة من 1 لـ 5 (والـ output بتاع الـ lab بيبيّن service times لحد 5 بس).",
     "بنضيف الـ Low اللي هو 1، فأقل قيمة 1 (L8, Generating random numbers).",
     "أقل قيمة هي <bdi>Low + 0 = 1</bdi> (L8, Generating random numbers)."
    ],
    [
     "صح. <bdi>A = K/N</bdi>، فـ<span class=\"ltr\">K = 0.784 × 3000 = 2352</span>",
     "دي هتبقى <bdi>π/4 × 3000 ≈ 2356</bdi>، يعني العدد المتوقع مش اللي طلع في الـ simulation (L8, area output).",
     "دي 784 إصابة من 1000؛ وهنا الـ N بـ 3000 (L8, area output).",
     "الـ 648 ده عدد النقط اللي فوق المنحنى <bdi>(3000 − 2352)</bdi> (L8, area output)."
    ],
    [
     "صح، لأن<span class=\"ltr\">XF(2) = 17 + 20(0.87) = 34.4<br>YF(2) = 39.4 + 20(−0.49) = 29.6</span>",
     "الإحداثيات متبدّلة (L8, Pursuit worked example).",
     "الـ sin θ سالب، فالـ YF بيقل (L8, Pursuit model).",
     "ده مكان الـ bomber عند الدقيقة 1 (L8, Pursuit data)."
    ],
    [
     "صح. الحركات<span class=\"ltr\">E, N, S, W, W, E, S, S, N, E → (1, −1)</span>و<span class=\"ltr\">|1| + |−1| = 2 ≤ 2</span>",
     "ده المكان بعد 6 blocks؛ ولسه فيه 4 حركات بعدها (L8, 8-4).",
     "الـ success معناه <bdi>|X| + |Y| ≤ 2</bdi>، و <bdi>2 ≤ 2</bdi> (L8, 8-4).",
     "الإشارات مقلوبة: من 00 لـ 24 شرق <bdi>(+X)</bdi>، ومن 75 لـ 99 جنوب <bdi>(−Y)</bdi> (L8, 8-4)."
    ],
    [
     "صح. الـ diff:<span class=\"ltr\">−1, 0, −1, 0, +1, 0, −1, −2, −3</span>فبتقف عند 9 رميات، و <bdi>8 − 9 = −1</bdi>.",
     "الـ <bdi>|H − T|</bdi> بيوصل 3 بس بعد الرقم التاسع (L8, Quiz 2 worked example).",
     "صافي المكسب <bdi>8 − flips = −1</bdi> (L8, Flipping coin assumptions).",
     "بعد 7 أرقام الـ diff بيبقى −1، مش ±3 (L8, Quiz 2 worked example)."
    ],
    [
     "ده بيتجاهل الـ lost profit اللي هو <bdi>20 × 0.17 = 3.40</bdi> (L8, Newspaper seller formulas).",
     "صح، لأن<span class=\"ltr\">35.00 − 23.10 − 3.40 + 0 = 8.50</span>",
     "الإيراد محدود بالـ 70 جرنال اللي اتباعوا: $35 مش $45 (L8, Newspaper seller formulas).",
     "الـ lost profit بيتطرح مش بيتجمع (L8, Newspaper seller formulas)."
    ],
    [
     "ده بتاع <bdi>x = 6</bdi> (L8, Table 8-4).",
     "صح، لأن<span class=\"ltr\">12.5, 0.5, 12.5, 6.5, 9.5, 9.5, 12.5, −2.5, 12.5, 12.5 = 86</span>",
     "ده بتاع <bdi>x = 4</bdi> (L8, Table 8-4).",
     "ده لو <bdi>2.5 × 5</bdi> كل يوم، متجاهلين الأيام اللي فيها <bdi>d &lt; 5</bdi> (L8, Cake shop model)."
    ],
    [
     "ده بيتجاهل الـ goodwill cost بتاعة الـ 2 تورتة اللي ما اتلبّوش (L8, 8-8 Questions, goodwill model).",
     "صح، لأن<span class=\"ltr\">z = 2.5(6) − 2(8 − 6) = 15 − 4 = 11    (= 4.5x − 2d)</span>",
     "الـ goodwill دي تكلفة، فبتتطرح (L8, goodwill model).",
     "الـ <bdi>3d − 0.5x</bdi> بتتطبق بس لما <bdi>x &gt; d</bdi> (L8, Cake shop model)."
    ],
    [
     "صح. الـ runs الأطول بتخلّي الـ demand المتسمّل يمشي مع Table 8-2؛ وأحسن نتيجة في الـ run بتاع الـ 500 يوم هي <bdi>x = 6</bdi> ($4467).",
     "الكتاب بيأكد <bdi>x = 6</bdi> بـ simulation لـ 500 يوم، مش بحل تحليلي (L8, Cake shop conclusion).",
     "الـ <bdi>x = 7</bdi> بيدّي $4397، أقل من $4467 بتاع <bdi>x = 6</bdi> (L8, Table 8-5).",
     "الـ distribution التاريخي بتاع الـ 20 يوم موجود في الجدول 8-2 وبنستخدمه (L8, Cake shop demand generation)."
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
       "why": "التلاتة موجودين في لستة الـ application areas في السلايد: الـ manufacturing applications والـ transportation models and traffic والـ health care (L1, Application areas of simulation).",
       "ow": [
        "الـ transportation models and traffic واحدة من الـ application areas، بس الـ manufacturing والـ health care موجودين في اللستة كمان، فالإجابة الكاملة هي <bdi>\"All of the above\"</bdi> (L1, Application areas of simulation).",
        "الـ manufacturing applications واحدة من الـ application areas، بس الـ transportation والـ health care موجودين في اللستة كمان (L1, Application areas of simulation).",
        "الـ health care واحدة من الـ application areas، بس الـ manufacturing والـ transportation موجودين في اللستة كمان (L1, Application areas of simulation).",
        null
       ]
      },
      {
       "why": "الـ study ممكن تستخدم التلاتة: الـ spreadsheets للـ hand simulations (زي Excel و OpenOffice) (L2, Simulation of Queueing Systems)، والـ simulation languages والـ packages عشان تبني الـ model (L1, Simulation Tools)، والـ statistical software (اللي بيعمل distribution fitting) للـ input modeling (L6, Goodness-of-fit tests) ‡ (من الـ lecture notes). ‡ مفيش سلايد بيذكر التلاتة مع بعض؛ الإجابة متجمعة من المحاضرات دي.",
       "ow": [
        "الـ spreadsheets بتستخدم فعلًا (الـ hand simulations في Lecture 2 معمولة على Excel)، بس الـ study ممكن تحتاج كمان simulation package و statistical software، فالإجابة <bdi>\"All of the above\"</bdi> (L2, Simulation of Queueing Systems).",
        "الـ simulation packages أداة من الأدوات (L1, Simulation Tools)، بس الـ spreadsheets والـ statistical software بيستخدموا في الـ study كمان.",
        "الـ statistical software بيستخدم عشان نعمل fit للـ input distributions (L6)، بس الـ spreadsheets والـ simulation packages بيستخدموا كمان.",
        null
       ]
      },
      {
       "why": "الـ mean بتاع الـ uniform بيتحسب كده (L3, Uniform Distribution):<span class=\"ltr\">E(X) = (a + b)/2 = (0 + 2)/2 = 1</span>",
       "ow": [
        null,
        "الرقم 5 مش هو الناتج. للـ <bdi dir=\"ltr\">U(a, b)</bdi> الـ mean بيساوي (L3, Uniform Distribution):<span class=\"ltr\">(a + b)/2 = (0 + 2)/2 = 1</span>",
        "الرقم 10 مش هو الناتج. الـ mean بيساوي (L3, Uniform Distribution):<span class=\"ltr\">(a + b)/2 = (0 + 2)/2 = 1</span>",
        "فيه اختيار صح: الـ mean بيساوي (L3, Uniform Distribution):<span class=\"ltr\">(0 + 2)/2 = 1</span>"
       ]
      },
      {
       "why": "الـ normal PDF متماثل (symmetric) حوالين الـ μ، يعني:<span class=\"ltr\">f(μ − x) = f(μ + x)</span>فنص القيم تحت الـ μ، وبالتالي الـ mean بيساوي الـ median (وكمان الـ mode، لأن الـ PDF أعلى نقطة فيه عند <bdi dir=\"ltr\">x = μ</bdi>) (L3, Normal Distribution).",
       "ow": [
        null,
        "إن الـ mean يبقى أكبر من الـ median ده بيحصل في distribution عندها skew لليمين (right skewed)؛ لكن الـ normal PDF متماثل حوالين الـ μ، فالـ mean بيساوي الـ median (L3, Normal Distribution).",
        "إن الـ mean يبقى أصغر من الـ median ده بيحصل في distribution عندها skew للشمال (left skewed)؛ لكن الـ normal متماثل، فالـ mean بيساوي الـ median (L3, Normal Distribution).",
        "الـ mean بيساوي الـ median فعلًا في الـ normal distribution (متماثل حوالين الـ μ) (L3, Normal Distribution)."
       ]
      },
      {
       "why": "في السلايد: <bdi>\"Binomial: Number of successes in n trials\"</bdi> (L6, Selecting the Family of Distributions)؛ وعدد الـ successes في n من الـ Bernoulli trials ليه binomial distribution (L3, Binomial Distribution).",
       "ow": [
        "الـ Normal هو الـ distribution بتاع process عبارة عن مجموع (sum) عدد من الـ component processes (L6, Selecting the Family of Distributions).",
        "الـ Lognormal هو الـ distribution بتاع process عبارة عن حاصل ضرب (product) عدد من الـ component processes (L6, Selecting the Family of Distributions).",
        null,
        "الـ Empirical بيعمل resample من الداتا الحقيقية اللي اتجمعت؛ ملوش علاقة بعدّ الـ successes (L6, Selecting the Family of Distributions)."
       ]
      },
      {
       "why": "الـ Step 1 هي الـ Problem formulation: <bdi>\"The study begins with defining the problem statement\"</bdi> (L1, Steps in a Simulation Study).",
       "ow": [
        "اختيار الـ input variables ده جزء من الـ model conceptualization والـ data collection (الخطوتين 3 و 4)، وده بييجي بعد ما المشكلة تتصاغ (L1, Steps in a Simulation Study).",
        "الـ entities بتتعمل لما الـ model يتعمله conceptualization ويتترجم (الخطوتين 3 و 5)، مش في الخطوة 1 (L1, Steps in a Simulation Study).",
        null,
        "الـ output variables بتتحدد وقت تحديد الـ objectives وفي الـ experimental design (الخطوتين 2 و 8)؛ والخطوة 1 هي الـ problem formulation (L1, Steps in a Simulation Study)."
       ]
      },
      {
       "why": "في السلايد: <bdi>\"Poisson: Number of independent events that occur in a fix amount of time or space\"</bdi> (L6, Selecting the Family of Distributions).",
       "ow": [
        "الـ Normal هو مجموع (sum) عدد من الـ component processes (L6, Selecting the Family of Distributions).",
        "الـ Lognormal هو حاصل ضرب (product) عدد من الـ component processes (L6, Selecting the Family of Distributions).",
        null,
        "الـ Empirical بيعمل resample من الداتا الحقيقية اللي اتجمعت (L6, Selecting the Family of Distributions)."
       ]
      },
      {
       "why": "الـ scatter diagram بيرسم داتا متزوّجة (paired data): الـ random variable X على الـ x axis والـ Y على الـ y axis، عشان يبيّن العلاقة بينهم (L6, Scatter Diagrams)؛ وفي الـ lecture notes ‡ مكتوب: <bdi>\"a dotted graph with one variable on x-axis and one variable on y-axis\"</bdi>. (رقم 8 مش مكتوب في الورقة.)",
       "ow": [
        "ده graph (<bdi>\"quality tool\"</bdi>)، مش statistical test؛ الـ tests زي الـ <bdi dir=\"ltr\">chi-square</bdi> أو الـ <bdi dir=\"ltr\">K-S</bdi> (L6, Scatter Diagrams).",
        "كلمة <bdi>\"Linear\"</bdi> بتوصف علاقة واحدة ممكن الـ scatter diagram يبيّنها، مش تعريف الـ diagram نفسه (L6, Scatter Diagrams).",
        "كلمة <bdi>\"Curvilinear\"</bdi> شكل ممكن النقط تاخده، مش تعريف الـ diagram (L6, Scatter Diagrams).",
        null
       ]
      },
      {
       "why": "الكمبيوتر بيحسب الـ random numbers بطريقة حسابية (arithmetic)؛ واسمها <bdi>\"pseudo\"</bdi> لأن وجود method معروفة بيلغي إمكانية الـ randomness الحقيقية (L4, Pseudo-Random Numbers).",
       "ow": [
        "الـ random numbers الحقيقية (true أو real) بتيجي من مصادر فيزيائية زي الـ atmospheric noise (موقع random.org) أو الـ quantum generators، مش من formula في الكمبيوتر (L4, Real Random Numbers).",
        "المصادر الفيزيائية (الـ hardware generators) بتدّي real random numbers؛ أما الـ RNG بتاع الكمبيوتر فبيستخدم arithmetic formula (L4, Real Random Numbers).",
        null,
        "مفيش arithmetic generator مثالي (perfect)؛ هو بس بيقلّد الـ uniformity والـ independence، فالـ output بتاعه <bdi dir=\"ltr\">pseudo-random</bdi> (L4, Pseudo-Random Numbers)."
       ]
      },
      {
       "why": "الـ GPSS/H هي الـ simulation language الوحيدة في الاختيارات؛ أما الـ C++ والـ Visual Basic والـ Fortran فدول general purpose programming languages (L1, Simulation Tools). ‡ في السلايدات الـ GPSS متحطوطة تحت <bdi>\"General purpose simulation languages\"</bdi> (يعني block structured و interpretive و FORTRAN based، والـ world view بتاعها <bdi dir=\"ltr\">transactions/facilities</bdi>)؛ أما الـ special purpose packages في السلايدات فهي:<span class=\"ltr\">NETWORK II.5, OPNET, COMNET III, SIMFACTORY</span>السؤال بيسمّي الـ <bdi dir=\"ltr\">GPSS/H</bdi> <bdi>\"special-purpose\"</bdi> بمعنى إنها language معمولة مخصوص للـ simulation، فاختارها.",
       "ow": [
        "الـ C++ دي general purpose programming language (object oriented) بتستخدم في الـ simulation، بس هي مش simulation language (L1, Simulation Tools).",
        "الـ Visual Basic دي general purpose programming language، مش simulation language (L1, Simulation Tools).",
        null,
        "الـ Fortran دي general purpose programming language (<bdi>\"probably more models than any other language\"</bdi>)، مش simulation language (L1, Simulation Tools)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "سلايد 18 بيذكرها بالنص تحت <bdi>\"When is simulation not appropriate?\"</bdi> (L1).",
       "ow": [
        null,
        "دي موجودة في لستة الحالات اللي الـ simulation فيها مش مناسبة: <bdi>\"When no (input) data is available, but simulations need data\"</bdi> (L1, When is simulation not appropriate?)."
       ]
      },
      {
       "why": "من الـ advantages: تقدر تختبر الـ hardware designs الجديدة والـ physical layouts والـ transportation systems والـ protocols والـ computer systems والـ network architectures من غير ما تلتزم بأي resources (L1, Advantages of simulation).",
       "ow": [
        null,
        "دي واحدة من الـ advantages المذكورة للـ simulation (L1, Advantages of simulation)."
       ]
      },
      {
       "why": "جملة <bdi>\"Model building requires training, it is like an art\"</bdi> دي من الـ <b>DISADVANTAGES</b> بتاعة الـ simulation، مش سبب إننا نستخدمها (L1, Disadvantages of simulation). وورقة المراجعة بتاعة الدكتور بتعلّم نفس الجملة F.",
       "ow": [
        "إن الموضوع محتاج training ده مذكور كـ disadvantage للـ simulation (L1, Disadvantages of simulation).",
        null
       ]
      },
      {
       "why": "ده تعريف الـ Exogenous. الـ Endogenous هي الـ activities والـ events اللي بتحصل جوه الـ system (L1, Components of a System).",
       "ow": [
        "ده وصف الـ exogenous activities؛ أما الـ endogenous فبتحصل جوه الـ system (L1, Components of a System).",
        null
       ]
      },
      {
       "why": "الـ models اللي مفيهاش random variables اسمها deterministic؛ والـ stochastic models فيها random variables (L1, Simulation Models).",
       "ow": [
        "الـ models اللي مفيهاش random variables اسمها deterministic؛ والـ stochastic models فيها random variables (L1, Simulation Models).",
        null
       ]
      },
      {
       "why": "الـ Static بيمثّل الـ system عند لحظة معينة (particular point in time)؛ والـ dynamic بيمثّله على مدى فترة زمنية (time interval) (L1, Simulation Models).",
       "ow": [
        null,
        "ده تعريف السلايد للـ static model (L1, Simulation Models)."
       ]
      },
      {
       "why": "في الـ model tree (سلايد 50) الـ Monte Carlo Simulation موجودة تحت الفرع static ثم stochastic؛ والـ lecture notes كمان بتقول إن الـ static simulation model اسمه Monte Carlo simulation (L1, Simulation Models).",
       "ow": [
        null,
        "الـ Monte Carlo simulation هي الفرع الـ static والـ stochastic في الـ model tree (L1, Simulation Models)."
       ]
      },
      {
       "why": "الـ Think time بيبدأ من <bdi>\"system completes response\"</bdi> لحد <bdi>\"user starts next request\"</bdi> (الـ timeline في سلايد 56)، مش من لحظة ما الـ system يبدأ الـ response (L1, Common performance metrics).",
       "ow": [
        "على الـ timeline الـ think time بيبدأ لما الـ system <b>يخلّص</b> الـ response، مش لما يبدأه (L1, Common performance metrics).",
        null
       ]
      },
      {
       "why": "الـ MODULA (فيها improvements كتير عن الـ PASCAL) والـ ADA (محاولة الـ Department of Defense للـ standardization) دول general purpose programming languages بتستخدم في الـ simulation (سلايد 4 في الـ Simulation Tools)، مش general simulation languages؛ الـ general simulation languages هي:<span class=\"ltr\">GPSS, SIMSCRIPT II.5, MODSIM III, SIMULA, SLAM, CSIM</span>(سلايدات 6 لـ 8). ورقة المراجعة المحلولة بتاعة الدكتور بتعلّمها True؛ بس السلايدات هي اللي بتكسب.",
       "ow": [
        "ورقة المراجعة المحلولة بتاعة الدكتور <bdi dir=\"ltr\">(Sheet 2, Q54)</bdi> بتعلّمها True، بس السلايدات هي اللي بتحسم: سلايد 4 في الـ Simulation Tools بيذكر الـ MODULA والـ ADA (مع الـ FORTRAN والـ PASCAL والـ <bdi dir=\"ltr\">C/C++</bdi>) على إنهم general <b>purpose</b> programming languages بتستخدم في الـ simulation. أما الـ general simulation languages فهي:<span class=\"ltr\">GPSS, SIMSCRIPT II.5, MODSIM III, SIMULA, SLAM, CSIM</span>(سلايدات 6 لـ 8) (L1, Simulation Tools).",
        null
       ]
      },
      {
       "why": "لو الـ arrival rate أقل من الـ service rate يبقى الـ system <b>STABLE</b>؛ غير كده الـ waiting line بيكبر من غير حدود، ويبقى الـ system unstable (L2, Simulation of Queueing Systems).",
       "ow": [
        "إن الـ arrival rate يبقى أقل من الـ service rate ده شرط الـ stable system، مش الـ unstable (L2, Simulation of Queueing Systems).",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "المرجع (L4, Linear Congruential Method): المثال اللي فيه<span class=\"ltr\">a = 13, c = 0, m = 64</span>وجزء الـ proper choice of parameters. اكتب كل X<sub>i</sub>، وقيمة<span class=\"ltr\">R<sub>i</sub> = X<sub>i</sub>/m</span>والقاعدة اللي استخدمتها للـ period.",
       "ans": "<b>الـ Linear congruential method:</b><span class=\"ltr\">X<sub>i+1</sub> = (aX<sub>i</sub> + c) mod m, R<sub>i</sub> = X<sub>i</sub>/m</span><br><b>الـ Sequence 1</b>:<span class=\"ltr\">a = 13, c = 0, m = 64, X<sub>0</sub> = 4</span><table><tr><th>i</th><th>X<sub>i</sub> = 13X<sub>i−1</sub> mod 64</th><th>R<sub>i</sub> = X<sub>i</sub>/64</th></tr><tr><td>1</td><td>13×4 = 52 mod 64 = 52</td><td>0.8125</td></tr><tr><td>2</td><td>13×52 = 676 mod 64 = 36</td><td>0.5625</td></tr><tr><td>3</td><td>13×36 = 468 mod 64 = 20</td><td>0.3125</td></tr><tr><td>4</td><td>13×20 = 260 mod 64 = 4</td><td>0.0625</td></tr><tr><td>5</td><td>13×4 = 52 mod 64 = 52</td><td>0.8125</td></tr></table><b>الـ Maximum period:</b> هنا<span class=\"ltr\">m = 64 = 2<sup>6</sup>, c = 0</span>فأطول period ممكن هو<span class=\"ltr\">P = m/4 = 2<sup>b−2</sup> = <b>16</b></span>وده بيحصل بس لو الـ X<sub>0</sub> فردي (odd) والـ a على الشكل:<span class=\"ltr\">a = 3 + 8k or a = 5 + 8k (a = 13 = 5 + 8·1 ✓)</span>هنا الـ seed <bdi dir=\"ltr\">X<sub>0</sub> = 4</bdi> زوجي (even)، فالـ sequence بتتكرر بعد <b>4</b> أرقام:<span class=\"ltr\">4 → 52 → 36 → 20 → 4</span>وده بالظبط عمود الـ <bdi dir=\"ltr\">X<sub>0</sub> = 4</bdi> في مثال المحاضرة.<br><br><b>الـ Sequence 2</b>:<span class=\"ltr\">a = 21, c = 17, m = 64, X<sub>0</sub> = 1</span><table><tr><th>i</th><th>X<sub>i</sub> = (21X<sub>i−1</sub> + 17) mod 64</th><th>R<sub>i</sub></th></tr><tr><td>1</td><td>21×1 + 17 = 38 mod 64 = 38</td><td>0.59375</td></tr><tr><td>2</td><td>21×38 + 17 = 815 mod 64 = 47</td><td>0.734375</td></tr><tr><td>3</td><td>21×47 + 17 = 1004 mod 64 = 44</td><td>0.6875</td></tr><tr><td>4</td><td>21×44 + 17 = 941 mod 64 = 45</td><td>0.703125</td></tr><tr><td>5</td><td>21×45 + 17 = 962 mod 64 = 2</td><td>0.03125</td></tr></table><b>الـ Maximum period:</b> هنا<span class=\"ltr\">m = 2<sup>6</sup>, c ≠ 0</span>وأطول period ممكن<span class=\"ltr\">P = m = <b>64</b></span>بيتحقق، لأن الـ <bdi dir=\"ltr\">c = 17</bdi> relatively prime مع الـ 64 (فردي)، والـ a على الشكل:<span class=\"ltr\">a = 1 + 4k: a = 21 = 1 + 4·5 ✓</span>(اتأكدنا بتشغيل الـ generator: بيرجع لـ <bdi dir=\"ltr\">X<sub>0</sub> = 1</bdi> بعد 64 خطوة بالظبط.)"
      },
      {
       "why": "المرجع (L4, Runs test: runs up and down). نفس طريقة مثال المحاضرة اللي فيه 40 رقم؛ والـ 30 رقم دول هما داتا مثال الـ autocorrelation في المحاضرة. ‡ الـ hint كاتب إن Z0.01 بيساوي 1.30 وده غلط، الصح إنها 2.326، بس مش محتاجينها هنا.",
       "ans": "<b>الـ H<sub>0</sub>:</b> الأرقام independent. وعندنا:<span class=\"ltr\">N = 30, α = 0.05</span>اكتب + لو الرقم اللي بعده أكبر منه، و − لو اللي بعده أصغر (29 علامة):<br><table><tr><th>الصف</th><th>الأرقام</th><th>العلامات</th></tr><tr><td>1</td><td>0.12 0.01 0.23 0.28 0.89 0.31 0.64 0.28 0.83 0.93</td><td>− + + + − + − + + (0.93→0.99) +</td></tr><tr><td>2</td><td>0.99 0.15 0.33 0.35 0.91 0.41 0.60 0.27 0.75 0.88</td><td>− + + + − + − + + (0.88→0.68) −</td></tr><tr><td>3</td><td>0.68 0.49 0.05 0.43 0.95 0.58 0.19 0.36 0.69 0.87</td><td>− − + + − − + + +</td></tr></table>الـ Sequence:<span class=\"ltr\"><b>− +++ − + − +++ − +++ − + − ++ −−− ++ −− +++</b></span>الـ Runs:<span class=\"ltr\">|−|+++|−|+|−|+++|−|+++|−|+|−|++|−−−|++|−−|+++| → <b>a = 16 runs</b></span><br><span class=\"ltr\">μ<sub>a</sub> = (2N − 1)/3 = (60 − 1)/3 = <b>19.67</b></span><span class=\"ltr\">σ<sub>a</sub>² = (16N − 29)/90 = (480 − 29)/90 = <b>5.011</b>, σ<sub>a</sub> = √5.011 = 2.239</span><span class=\"ltr\">Z<sub>0</sub> = (a − μ<sub>a</sub>)/σ<sub>a</sub> = (16 − 19.67)/2.239 = <b>−1.64</b></span><br>الـ critical value هي:<span class=\"ltr\">Z<sub>α/2</sub> = Z<sub>0.025</sub> = 1.96</span>وبما إن<span class=\"ltr\">−1.96 ≤ −1.64 ≤ 1.96</span>يبقى الـ Z<sub>0</sub> في الـ acceptance region:<br><b>الـ hypothesis of independence مش هتترفض (cannot be rejected)</b> على أساس الـ test ده."
      }
     ]
    },
    {
     "items": [
      {
       "why": "المرجع (L3, Poisson Distribution): ده مثال المحاضرة نفسه، والإجابات 0.18 و 0.594.",
       "ans": "نعرّف X على إنه عدد الـ beeps في الساعة، وده Poisson بـ α = 2:<span class=\"ltr\">p(x) = e<sup>−α</sup>α<sup>x</sup>/x!</span><table><tr><th>x</th><th>0</th><th>1</th><th>2</th><th>3</th></tr><tr><td>p(x)</td><td>e<sup>−2</sup> = 0.1353</td><td>2e<sup>−2</sup> = 0.2707</td><td>0.2707</td><td>0.1804</td></tr><tr><td>F(x)</td><td>0.135</td><td>0.406</td><td>0.677</td><td>0.857</td></tr></table><b>الجزء (i):</b><span class=\"ltr\">p(3) = 2³e<sup>−2</sup>/3! = 8(0.1353)/6 = <b>0.18</b></span>وتقدر تجيبها كمان من الـ F:<span class=\"ltr\">F(3) − F(2) = 0.857 − 0.677 = 0.18</span><b>الجزء (ii):</b> احتمال 2 أو أكتر:<span class=\"ltr\">p(2 or more) = 1 − [p(0) + p(1)] = 1 − F(1) = 1 − 0.406 = <b>0.594</b></span>"
      },
      {
       "why": "المرجع (L8, Cake shop problem): ده تمرين الـ lecture notes <bdi dir=\"ltr\">(8.8 Q2)</bdi> بأرقام جديدة. من غير الـ goodwill الـ model هو:<span class=\"ltr\">z = (P − C)x for x ≤ d; z = (P − S)d + (S − C)x for x > d</span>والـ goodwill cost بيدخل بس في حالة <bdi dir=\"ltr\">x ≤ d</bdi>.",
       "ans": "<b>الرموز:</b><br>الـ x: كمية الإنتاج اليومية (daily production quantity)<br>الـ d: الطلب اليومي (عدد الـ orders)<br>الـ z: الربح اليومي (daily profit)<br>الـ P: سعر البيع، والـ C: التكلفة، والـ S: سعر الـ scrap (الحاجة البايتة من امبارح)<br>الـ u: الـ goodwill cost لكل order متلبّاش<br><br><b>الحالة 1:</b> <bdi dir=\"ltr\">x ≤ d</bdi> (كل الـ x بيتباع، وفيه <bdi dir=\"ltr\">d − x</bdi> orders متلبّتش):<span class=\"ltr\">z = (P − C)x − u(d − x)</span><b>الحالة 2:</b> <bdi dir=\"ltr\">x > d</bdi> (بيتباع d بس، والـ <bdi dir=\"ltr\">x − d</bdi> الباقيين بيتباعوا scrap):<span class=\"ltr\">z = d(P − C) + (x − d)(S − C) = (P − S)d + (S − C)x</span>ومفيش goodwill cost هنا، لأن كل order اتلبّى.<br><br><b>بالأرقام:</b><span class=\"ltr\">P = 8, C = 5, S = 3, u = 5</span><span class=\"ltr\">x ≤ d: z = 3x − 5(d − x) = <b>8x − 5d</b></span><span class=\"ltr\">x > d: z = 3d − 2(x − d) = <b>5d − 2x</b></span>"
      },
      {
       "why": "المراجع (L8, Cake shop problem: demand generation and model) و (L8, Inventory: Tables 8-8 and 8-9 for the lower-end-inclusive intervals). وضّح الـ mapping بتاع الـ demand وعمود profit لكل كمية.",
       "ans": "حوّل كل random number لـ demand باستخدام intervals من الـ pseudorandom numbers بتشمل الطرف الأصغر بتاعها (lower end)، وده الـ convention بتاع الـ lecture notes، زي جداول الـ Auto Supplies <bdi dir=\"ltr\">(Tables 8-8, 8-9)</bdi>:<span class=\"ltr\">0.00 to 0.49999, 0.50 to 0.74999, ...</span><table><tr><th>الطلب اليومي</th><th>0</th><th>10</th><th>20</th><th>30</th><th>40</th><th>50</th><th>60</th><th>70</th><th>80</th></tr><tr><td>Relative freq.</td><td>0.05</td><td>0.10</td><td>0.05</td><td>0.10</td><td>0.15</td><td>0.30</td><td>0.15</td><td>0.05</td><td>0.05</td></tr><tr><td>التراكمي</td><td>0.05</td><td>0.15</td><td>0.20</td><td>0.30</td><td>0.45</td><td>0.75</td><td>0.90</td><td>0.95</td><td>1.00</td></tr><tr><td>Random-number interval</td><td>0.00–0.04999</td><td>0.05–0.14999</td><td>0.15–0.19999</td><td>0.20–0.29999</td><td>0.30–0.44999</td><td>0.45–0.74999</td><td>0.75–0.89999</td><td>0.90–0.94999</td><td>0.95–0.99999</td></tr></table>فالـ 0.15 بيدّي 20، والـ 0.75 بيدّي 60 (الرقم اللي بيساوي قيمة cumulative بيبدأ الـ class اللي بعدها).<br>الربح اليومي:<span class=\"ltr\">x ≤ d → z = 8x − 5d; x &gt; d → z = 5d − 2x</span><table><tr><th>اليوم</th><th>RN</th><th>Demand d</th><th>x = 60: z</th><th>المجموع</th><th>x = 80: z</th><th>المجموع</th></tr><tr><td>1</td><td>0.99</td><td>80</td><td>80</td><td>80</td><td>240</td><td>240</td></tr><tr><td>2</td><td>0.15</td><td>20</td><td>-20</td><td>60</td><td>-60</td><td>180</td></tr><tr><td>3</td><td>0.33</td><td>40</td><td>80</td><td>140</td><td>40</td><td>220</td></tr><tr><td>4</td><td>0.35</td><td>40</td><td>80</td><td>220</td><td>40</td><td>260</td></tr><tr><td>5</td><td>0.91</td><td>70</td><td>130</td><td>350</td><td>190</td><td>450</td></tr><tr><td>6</td><td>0.41</td><td>40</td><td>80</td><td>430</td><td>40</td><td>490</td></tr><tr><td>7</td><td>0.60</td><td>50</td><td>130</td><td>560</td><td>90</td><td>580</td></tr><tr><td>8</td><td>0.27</td><td>30</td><td>30</td><td>590</td><td>-10</td><td>570</td></tr><tr><td>9</td><td>0.75</td><td>60</td><td>180</td><td>770</td><td>140</td><td>710</td></tr><tr><td>10</td><td>0.88</td><td>60</td><td>180</td><td>950</td><td>140</td><td>850</td></tr></table>أمثلة على صفوف:<span class=\"ltr\">Day 1, d = 80: x = 60 ≤ 80 → z = 8(60) − 5(80) = 80; x = 80 ≤ 80 → z = 8(80) − 5(80) = 240</span><span class=\"ltr\">Day 2, d = 20: x = 60 &gt; 20 → z = 5(20) − 2(60) = −20; x = 80 → 5(20) − 2(80) = −60</span><span class=\"ltr\">Day 9, d = 60: x = 60 ≤ 60 → 8(60) − 5(60) = 180; x = 80 &gt; 60 → 5(60) − 2(80) = 140</span><b>ربح الـ 10 أيام:</b><span class=\"ltr\"><b>x = 60 → $950; x = 80 → $850</b></span>قراءة تانية: لو استخدمت الـ random digit assignment بتاع Lecture 2:<span class=\"ltr\">01–05, 06–15, ..., 46–75, ...</span>يعني الشرط بتاع Lecture 5:<span class=\"ltr\">F(x<sub>i−1</sub>) &lt; R ≤ F(x<sub>i</sub>)</span>ساعتها الـ 0.15 بيدّي 10 والـ 0.75 بيدّي 50، فربح يوم 2 ويوم 9 بيبقى:<span class=\"ltr\">day 2: −70 / −110, day 9: 130 / 90</span>والنتيجة:<span class=\"ltr\">x = 60 → $850; x = 80 → $750</span>وأحسن كمية هي 60 في الحالتين."
      },
      {
       "why": "المرجع (L8, Cake shop problem): اختار الـ trial quantity اللي ليها أعلى total profit في الـ simulation.",
       "ans": "الكمية <b><bdi dir=\"ltr\">x = 60</bdi></b> هي الأحسن من الـ trial quantities الاتنين: الربح بتاعها في الـ 10 أيام ($950) أعلى من <bdi dir=\"ltr\">x = 80</bdi> ($850). (ولو استخدمت قراءة الـ boundary التانية، المجموع بيبقى $850 و $750؛ وبرضه <bdi dir=\"ltr\">x = 60</bdi> هي الأحسن.) الـ goodwill cost اللي هو $5 لكل order متلبّاش بيخلّي الـ <bdi dir=\"ltr\">under-production</bdi> غالي، بس إنك تنتج 80 كل يوم بيسيب وحدات كتير بتتباع scrap بخسارة <bdi dir=\"ltr\">C − S = $2</bdi> للوحدة. وزي ما في المحاضرة، عشر أيام دي run قصيرة؛ محتاج simulation أطول عشان تبقى واثق من النتيجة."
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
       "why": "لستة الـ application areas فيها الـ military applications والـ semiconductor manufacturing والـ computers and networks (telecommunications)، بس مفيهاش food industry (L1, Application areas of simulation).",
       "ow": [
        "الـ Military applications موجودة في لستة الـ application areas (L1, Application areas of simulation).",
        "الـ Semiconductor manufacturing موجودة في لستة الـ application areas (L1, Application areas of simulation).",
        null,
        "الـ Computers and networks (والـ call centers) موجودين في اللستة، وده بيغطي الـ telecommunications (L1, Application areas of simulation)."
       ]
      },
      {
       "why": "في السلايد: <bdi>\"Poisson: Number of independent events that occur in a fix amount of time or space\"</bdi> (L6, Selecting the Family of Distributions).",
       "ow": [
        "الـ Normal هو مجموع (sum) عدد من الـ component processes (L6, Selecting the Family of Distributions).",
        null,
        "الـ Binomial بيعدّ الـ successes في n trials، مش الـ events في وقت ثابت (L6, Selecting the Family of Distributions).",
        "الـ Exponential هو <b>الوقت بين</b> الـ independent events، مش عددهم (L6, Selecting the Family of Distributions)."
       ]
      },
      {
       "why": "الـ <bdi dir=\"ltr\">N(μ, σ²)</bdi> الـ mean بتاعه μ، فالـ <bdi dir=\"ltr\">N(10, 1/2)</bdi> الـ mean بتاعه 10 (والـ variance بتاعه <bdi dir=\"ltr\">1/2</bdi>) (L3, Normal Distribution).",
       "ow": [
        null,
        "الـ 5 ده يبقى mean الـ <bdi dir=\"ltr\">Binomial(10, 1/2)</bdi> لأن <bdi dir=\"ltr\">mean = np</bdi>؛ لكن في الـ <bdi dir=\"ltr\">N(10, 1/2)</bdi> الـ parameter الأول هو الـ mean، يعني 10 (L3, Normal Distribution).",
        "الـ 1 مش parameter هنا؛ الـ <bdi dir=\"ltr\">N(μ, σ²)</bdi> الـ mean بتاعه μ يعني 10 (L3, Normal Distribution).",
        "الاختيار A هو الصح: الـ mean بتاع <bdi dir=\"ltr\">N(10, 1/2)</bdi> هو 10 (L3, Normal Distribution)."
       ]
      },
      {
       "why": "عندنا:<span class=\"ltr\">np = 80, npq = 4 → q = 4/80 = 0.05, p = 0.95, n = 80/0.95 = 84.2</span>والـ n دي مش رقم صحيح، فمفيش اختيار ينفع (L3, Binomial Distribution). ومراجعة الـ MCQ بتاعة Ch3 من الدكتور فيها السؤال ده بالظبط والإجابة D. (لو الـ mean كان 8 والـ variance كان 4، كانت الإجابة <bdi dir=\"ltr\">N = 16, p = 1/2</bdi>.)",
       "ow": [
        "القيم <bdi dir=\"ltr\">N = 16, p = 1/2</bdi> بتدّي mean 8 و variance 4، مش mean 80 (L3, Binomial Distribution).",
        "القيم <bdi dir=\"ltr\">N = 16, p = 1/4</bdi> بتدّي mean 4 و variance 3 (L3, Binomial Distribution).",
        "القيم <bdi dir=\"ltr\">N = 32, p = 1/4</bdi> بتدّي mean 8 و variance 6 (L3, Binomial Distribution).",
        null
       ]
      },
      {
       "why": "الـ Deterministic models هي الـ simulation models اللي مفيهاش random variables (L1, Simulation Models).",
       "ow": [
        null,
        "الـ model اللي فيه random variable واحد أو أكتر بيبقى stochastic (L1, Simulation Models).",
        "أي random variable بيخلّي الـ model يبقى stochastic؛ والـ deterministic معناه مفيش ولا واحد (L1, Simulation Models).",
        "الـ random variables بتخلّيه stochastic؛ والـ deterministic models مفيهاش أي random variables (L1, Simulation Models)."
       ]
      },
      {
       "why": "في الـ inverse transform procedure، الـ Step 2 بتخلّي <bdi dir=\"ltr\">F(X) = R</bdi> وبتوضّح إن بما إن X random variable، فالـ F(X) كمان random variable و uniformly distributed على <bdi dir=\"ltr\">(0, 1)</bdi> <bdi dir=\"ltr\">(L5, Procedure for the inverse transform (exponential))</bdi>؛ وده اللي بيخلّي <bdi dir=\"ltr\">X = F⁻¹(R)</bdi> تشتغل مع أي continuous cdf اسمه F. ومراجعة الـ MCQ بتاعة Ch3 من الدكتور برضه بتدّي الإجابة A.",
       "ow": [
        null,
        "الـ F(X) قيمها في <bdi dir=\"ltr\">[0, 1]</bdi> وهي uniform هناك، مش normal؛ وعشان كده <bdi dir=\"ltr\">X = F⁻¹(R)</bdi> بتشتغل مع R uniform <bdi dir=\"ltr\">(L5, Procedure for the inverse transform (exponential))</bdi>.",
        "الـ F(X) uniform على <bdi dir=\"ltr\">(0, 1)</bdi>؛ والـ exponential بيتولّد منها <bdi dir=\"ltr\">(L5, Procedure for the inverse transform (exponential))</bdi> بالقانون:<span class=\"ltr\">X = −(1/λ) ln(1 − R)</span>",
        "الاختيار A هو الصح، الـ F(X) uniform على <bdi dir=\"ltr\">(0, 1)</bdi> <bdi dir=\"ltr\">(L5, Procedure for the inverse transform (exponential))</bdi>."
       ]
      },
      {
       "why": "في الـ model tree، الفرع dynamic ثم stochastic ثم discrete هو الـ <bdi dir=\"ltr\">Discrete-event Simulation</bdi>، والكورس مركّز على <bdi>\"discrete, dynamic, stochastic simulation models\"</bdi> (L1, Simulation Models; Discrete-Event System Simulation). ‡ السلايدات مش بتستخدم كلمة <bdi>\"most common\"</bdi>؛ ودي القراءة اللي ماشية مع الـ tree.",
       "ow": [
        "الـ Static simulation عكس الـ dynamic (بتمثّل الـ system عند لحظة واحدة) (L1, Simulation Models).",
        null,
        "الـ Stochastic بتوصف الـ randomness (وممكن تبقى static أو dynamic)، مش نوع من الـ dynamic simulation؛ والـ leaf اللي هي dynamic و stochastic و discrete اسمها <bdi dir=\"ltr\">discrete-event simulation</bdi> (L1, Simulation Models).",
        "الـ <bdi dir=\"ltr\">Discrete-time simulation</bdi> مش موجودة في الـ tree بتاع المحاضرة؛ الـ leaf اللي ظاهرة هي الـ <bdi dir=\"ltr\">discrete-event simulation</bdi> (L1, Simulation Models)."
       ]
      },
      {
       "why": "الـ Dynamic models بتمثّل الـ system على مدى time interval، يعني وهو بيتغيّر مع الوقت (L1, Simulation Models).",
       "ow": [
        null,
        "الـ static model بيمثّل الـ system عند لحظة معينة (L1, Simulation Models).",
        "كلمة Analytical بتوصف إزاي الـ mathematical model بيتحل (بالـ formulas)، مش هو بيتابع الوقت ولا لأ (L1, Model of a System).",
        "كلمة Numerical بتوصف طريقة الحل (computational procedures)، مش متابعة التغيّرات مع الوقت (L1, Discrete-Event System Simulation)."
       ]
      },
      {
       "why": "الـ Disadvantages: الـ model building محتاج training؛ والـ results ممكن تبقى صعبة في التفسير؛ والـ simulation ممكن تاخد وقت وتبقى غالية (L1, Disadvantages of simulation). والتلات اختيارات بيعيدوا صياغة الكلام ده.",
       "ow": [
        "صح، بس دي واحدة بس من الـ disadvantages المذكورة؛ والـ B والـ C مذكورين كمان (L1, Disadvantages of simulation).",
        "صح (الـ results صعبة في التفسير)، بس الـ A والـ C برضه disadvantages (L1, Disadvantages of simulation).",
        "صح (بتاخد وقت وغالية)، بس الـ A والـ B برضه disadvantages (L1, Disadvantages of simulation).",
        null
       ]
      },
      {
       "why": "الـ GPSS/H هي الـ simulation language الوحيدة في الاختيارات؛ أما الـ C++ والـ Visual Basic والـ Fortran فدول general purpose programming languages (L1, Simulation Tools). ‡ في السلايدات الـ GPSS متحطوطة تحت <bdi>\"General purpose simulation languages\"</bdi> (يعني block structured و interpretive و FORTRAN based، والـ world view بتاعها <bdi dir=\"ltr\">transactions/facilities</bdi>)؛ أما الـ special purpose packages في السلايدات فهي:<span class=\"ltr\">NETWORK II.5, OPNET, COMNET III, SIMFACTORY</span>السؤال بيسمّي الـ <bdi dir=\"ltr\">GPSS/H</bdi> <bdi>\"special-purpose\"</bdi> بمعنى إنها language معمولة مخصوص للـ simulation، فاختارها.",
       "ow": [
        "الـ C++ دي general purpose programming language (object oriented) بتستخدم في الـ simulation، بس هي مش simulation language (L1, Simulation Tools).",
        "الـ Visual Basic دي general purpose programming language، مش simulation language (L1, Simulation Tools).",
        null,
        "الـ Fortran دي general purpose programming language (<bdi>\"probably more models than any other language\"</bdi>)، مش simulation language (L1, Simulation Tools)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Measurements معناها إننا بنستخدم instance موجود من الـ system عشان نعمل performance measurements (L1, Introduction to Simulation).",
       "ow": [
        null,
        "ده بالظبط وصف السلايد لطريقة الـ measurement (L1, Introduction to Simulation)."
       ]
      },
      {
       "why": "السلايد بيقول: <bdi>\"Knowledge from simulations can be used to improve the system\"</bdi> (L1, When is simulation appropriate?).",
       "ow": [
        "السلايد بيقول إن المعرفة اللي جاية من الـ simulations <b>ينفع</b> تتستخدم عشان نحسّن الـ system (L1, When is simulation appropriate?).",
        null
       ]
      },
      {
       "why": "من الـ advantages: الوقت ممكن يتضغط أو يتمدّ (slow down أو speed up) (L1, Advantages of simulation).",
       "ow": [
        null,
        "دي واحدة من الـ advantages المذكورة (L1, Advantages of simulation)."
       ]
      },
      {
       "why": "ده تعريف الـ Endogenous. الـ Exogenous هي الـ activities والـ events اللي في الـ environment (برّه الـ system) وبتأثر على الـ system (L1, Components of a System).",
       "ow": [
        "الـ activities اللي بتحصل جوه الـ system اسمها endogenous؛ والـ exogenous هي اللي برّه (L1, Components of a System).",
        null
       ]
      },
      {
       "why": "ده تعريف السلايد للـ system state (L1, Components of a System).",
       "ow": [
        null,
        "ده تعريف السلايد للـ system state بالظبط (L1, Components of a System)."
       ]
      },
      {
       "why": "للـ request اللي اتعمل صح (done correctly) الـ metrics هي: الوقت (response time)، والـ rate (throughput)، والـ resources (utilization) (L1, Selecting performance metrics).",
       "ow": [
        null,
        "الـ Response time والـ throughput والـ utilization هما بالظبط الـ metrics بتوع فرع <bdi>\"done correctly\"</bdi> (L1, Selecting performance metrics)."
       ]
      },
      {
       "why": "الخطوة 6 في سلايد 59، اللي هي <bdi>Verified?</bdi>، مكتوب فيها <bdi>\"Does the program that, what the model describes?\"</bdi>، ومعناها <bdi>\"Does the program do what the model describes?\"</bdi> (ورقة المراجعة بتاعة الدكتور، في Q49، بتستخدم نفس الصياغة دي بالظبط وبتعلّمها True) (L1, Steps in a Simulation Study).",
       "ow": [
        null,
        "الـ Verification بتشيّك الـ program على الـ model؛ ودي سؤال السلايد للخطوة 6 (L1, Steps in a Simulation Study)."
       ]
      },
      {
       "why": "تعريف السلايد (L1, Simulation Models).",
       "ow": [
        null,
        "ده تعريف السلايد للـ simulation model (L1, Simulation Models)."
       ]
      },
      {
       "why": "الـ <b>MODE</b> هو الـ most likely value؛ أما الـ median فهو الـ <bdi dir=\"ltr\">0.5-quantile</bdi> (نص القيم أصغر منه ونصها أكبر) (L3, Mean, median, and mode).",
       "ow": [
        "الـ most likely value هي الـ mode؛ والـ median هو الـ <bdi dir=\"ltr\">0.5-quantile</bdi> (L3, Mean, median, and mode).",
        null
       ]
      },
      {
       "why": "في اختيار الـ central tendency: لو الداتا categorial استخدم الـ mode (L3, Selecting among mean, median, and mode).",
       "ow": [
        "للداتا الـ categorial الـ flowchart بيقول استخدم الـ mode، مش الـ mean (L3, Selecting among mean, median, and mode).",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "المرجع (L4, Linear Congruential Method; Proper choice of parameters).",
       "ans": "القانون:<span class=\"ltr\">X<sub>i+1</sub> = (5X<sub>i</sub> + 13) mod 64, R<sub>i</sub> = X<sub>i</sub>/64</span><table><tr><th>i</th><th>Seed X<sub>0,1</sub> = 1</th><th>R<sub>i</sub></th><th>Seed X<sub>0,2</sub> = 3</th><th>R<sub>i</sub></th></tr><tr><td>1</td><td>5(1)+13 = 18</td><td>0.28125</td><td>5(3)+13 = 28</td><td>0.4375</td></tr><tr><td>2</td><td>5(18)+13 = 103 mod 64 = 39</td><td>0.609375</td><td>5(28)+13 = 153 mod 64 = 25</td><td>0.390625</td></tr><tr><td>3</td><td>5(39)+13 = 208 mod 64 = 16</td><td>0.25</td><td>5(25)+13 = 138 mod 64 = 10</td><td>0.15625</td></tr><tr><td>4</td><td>5(16)+13 = 93 mod 64 = 29</td><td>0.453125</td><td>5(10)+13 = 63</td><td>0.984375</td></tr><tr><td>5</td><td>5(29)+13 = 158 mod 64 = 30</td><td>0.46875</td><td>5(63)+13 = 328 mod 64 = 8</td><td>0.125</td></tr></table><b>الـ Maximum period:</b> هنا<span class=\"ltr\">m = 64 = 2<sup>6</sup>, c = 13 ≠ 0</span>وأطول period ممكن هو<span class=\"ltr\">P = m = <b>64</b></span>وبيتحقق لما الـ c يبقى relatively prime مع الـ m (الـ 13 فردي ✓) والـ a على الشكل:<span class=\"ltr\">a = 1 + 4k (5 = 1 + 4·1 ✓)</span>ولما <bdi dir=\"ltr\">c ≠ 0</bdi> الـ seed مش بيفرق، فـ<b>الـ sequences الاتنين الـ period بتاعهم 64</b> (اتأكدنا بتشغيل الـ generator: كل واحدة بترجع للـ seed بتاعها بعد 64 خطوة)."
      },
      {
       "why": "المرجع (L4, Autocorrelation test): ده مثال المحاضرة (سلايد 51) بس الـ α اتغيّرت من 0.05 لـ 0.01. ‡ السلايد كاتب Z0 بيساوي −1.516؛ لكن الحساب:<span class=\"ltr\">−0.1945/0.1280 = −1.5195</span>والـ lecture notes بتدّي −1.519.",
       "ans": "عندنا:<span class=\"ltr\">i = 3, m (lag) = 5, N = 30</span>والـ M هو أكبر integer يحقق:<span class=\"ltr\">i + (M + 1)m ≤ N: 3 + (M + 1)5 ≤ 30 → M ≤ 4.4 → <b>M = 4</b></span>الأرقام اللي هنختبرها:<span class=\"ltr\">R<sub>3</sub>, R<sub>8</sub>, R<sub>13</sub>, R<sub>18</sub>, R<sub>23</sub>, R<sub>28</sub></span><table><tr><th>الترتيب</th><th>3</th><th>8</th><th>13</th><th>18</th><th>23</th><th>28</th></tr><tr><td>R</td><td>0.23</td><td>0.28</td><td>0.33</td><td>0.27</td><td>0.05</td><td>0.36</td></tr></table>حاصل ضرب كل رقمين جنب بعض:<span class=\"ltr\">(0.23)(0.28) = 0.0644, (0.28)(0.33) = 0.0924, (0.33)(0.27) = 0.0891, (0.27)(0.05) = 0.0135, (0.05)(0.36) = 0.0180; sum = 0.2774</span><span class=\"ltr\">ρ̂<sub>35</sub> = [1/(M + 1)] Σ R<sub>i+km</sub>R<sub>i+(k+1)m</sub> − 0.25 = 0.2774/5 − 0.25 = <b>−0.1945</b></span><span class=\"ltr\">σ<sub>ρ̂</sub> = √(13M + 7) / [12(M + 1)] = √59 / 60 = <b>0.1280</b></span><span class=\"ltr\">Z<sub>0</sub> = ρ̂/σ<sub>ρ̂</sub> = −0.1945/0.1280 = <b>−1.52</b></span><br>بما إن α = 0.01، الـ critical value هي (من جدول الـ appendix، صف الـ ∞):<span class=\"ltr\">Z<sub>α/2</sub> = Z<sub>0.005</sub> = <b>2.576</b></span>وبما إن<span class=\"ltr\">−2.576 ≤ −1.52 ≤ 2.576</span><b>الـ hypothesis of independence مش هتترفض</b>: يعني مفيش دليل إن الأرقام اللي ترتيبها 3 و 8 و 13 و… autocorrelated (لو <bdi dir=\"ltr\">ρ̂ &lt; 0</bdi> كان معناها negative autocorrelation، بس هي مش significant).<br><br>‡ الـ hint في الورقة كاتب <bdi dir=\"ltr\">Z<sub>0.01</sub> = 1.30</bdi> وده غلط: الصح <bdi dir=\"ltr\">z<sub>0.01</sub> = 2.326</bdi>، والـ 1.30 قريبة من <bdi dir=\"ltr\">z<sub>0.10</sub> = 1.282</bdi>. لو قارنت −1.52 بـ ±1.30 هترفض الـ H<sub>0</sub> غلط. وحتى عند α = 0.05 (يعني <bdi dir=\"ltr\">Z<sub>0.025</sub> = 1.96</bdi>، ودي نسخة المحاضرة من المثال ده) الـ H<sub>0</sub> مش بتترفض."
      }
     ]
    },
    {
     "items": [
      {
       "why": "المرجع (L3, Geometric Distribution): ده Example 3.6 من الـ lecture notes.",
       "ans": "كل printer بنفحصه ده Bernoulli trial؛ والـ success معناه إنه acceptable:<span class=\"ltr\">q = P(rejected) = 0.4, p = 1 − 0.4 = 0.6</span>والـ X هو رقم الفحص اللي أول printer acceptable بيظهر عنده، وده Geometric:<span class=\"ltr\">p(x) = q<sup>x−1</sup>p</span><span class=\"ltr\">p(3) = (0.4)²(0.6) = 0.16 × 0.6 = <b>0.096</b></span>يعني حوالي 10%: اتنين rejected، وبعدين واحد acceptable."
      },
      {
       "why": "المرجع (L6, Parameter Estimation: suggested estimators, lognormal μ̂ = X̄, σ̂² = S² after taking ln of the data): ده Example 6.4 من الـ lecture notes.",
       "ans": "للـ lognormal model، خد الـ ln بتاع الداتا واحسب الـ mean والـ variance للـ logs:<span class=\"ltr\">Y = ln X, μ̂ = Ȳ, σ̂² = S² (of the logs)</span><table><tr><th>X</th><th>18.8</th><th>27.9</th><th>21.0</th><th>6.1</th><th>37.4</th><th>5.0</th><th>22.9</th><th>1.0</th><th>3.1</th><th>8.3</th></tr><tr><td>ln X</td><td>2.9</td><td>3.3</td><td>3.0</td><td>1.8</td><td>3.6</td><td>1.6</td><td>3.1</td><td>0.0</td><td>1.1</td><td>2.1</td></tr></table><span class=\"ltr\">Σ ln X = 22.5, Σ (ln X)² = 62.29, n = 10</span><span class=\"ltr\"><b>μ̂</b> = Ȳ = 22.5/10 = <b>2.25</b></span><span class=\"ltr\"><b>σ̂²</b> = S² = [Σ Y² − nȲ²]/(n − 1) = [62.29 − 10(2.25)²]/9 = (62.29 − 50.625)/9 = <b>1.30</b></span>النتايج دي مطابقة لمثال الـ lecture notes. ولو استخدمت الـ logs من غير تقريب، هتطلع:<span class=\"ltr\">μ̂ = 2.27, σ̂² = 1.32</span>"
      },
      {
       "why": "المراجع (L2, Inventory Systems) و (L8, Inventory simulation with two decision variables): نفس الـ flowchart ونفس شكل الجدول بتوع simulation الـ auto supplies اللي في المحاضرة على 10 أيام.",
       "ans": "الـ order quantity والـ reorder point والـ beginning inventory:<span class=\"ltr\">Q = 15, r = 5, beginning inventory = 10</span>الـ holding بـ $5 للوحدة في الأسبوع على الـ ending inventory، والـ ordering بـ $200 للـ order، والـ shortage بـ $20 لكل وحدة ناقصة (الـ demand اللي متلبّاش بيضيع).<br><b>الـ Random number intervals</b> (الطرف الأصغر داخل، زي جداول الـ auto supplies في المحاضرة):<br><table><tr><th>Demand</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><td>Probability</td><td>0.10</td><td>0.30</td><td>0.20</td><td>0.30</td><td>0.05</td><td>0.05</td></tr><tr><td>Cumulative</td><td>0.10</td><td>0.40</td><td>0.60</td><td>0.90</td><td>0.95</td><td>1.00</td></tr><tr><td>RN interval</td><td>0.000–0.099</td><td>0.100–0.399</td><td>0.400–0.599</td><td>0.600–0.899</td><td>0.900–0.949</td><td>0.950–0.999</td></tr></table><table><tr><th>Lead time (أسابيع)</th><th>1</th><th>2</th><th>3</th><th>4</th></tr><tr><td>Probability</td><td>0.20</td><td>0.15</td><td>0.60</td><td>0.05</td></tr><tr><td>Cumulative</td><td>0.20</td><td>0.35</td><td>0.95</td><td>1.00</td></tr><tr><td>RN interval</td><td>0.000–0.199</td><td>0.200–0.349</td><td>0.350–0.949</td><td>0.950–0.999</td></tr></table><b>كل أسبوع</b> (حسب الـ flowchart بتاع المحاضرة):<br>(1) استلم أي order معاده جه<br>(2) ولّد الـ demand<br>(3) لو الـ inventory أكبر من أو يساوي الـ demand:<span class=\"ltr\">I = I − d</span>غير كده:<span class=\"ltr\">shortage cost = 20(d − I), I = 0</span>(4) لو <bdi dir=\"ltr\">I ≤ r</bdi> ومفيش order لسه مستني (outstanding)، اعمل order ($200) وولّد الـ lead time<br>(5) الـ holding cost بيساوي 5 × الـ ending inventory<br>(6) اجمع الـ total.<br>الـ order اللي يتعمل في آخر أسبوع t بـ lead time L بيوصل في أول أسبوع <bdi dir=\"ltr\">t + L</bdi> (زي المحاضرة: اتعمل يوم 4 بـ <bdi dir=\"ltr\">L = 3</bdi>، ووصل يوم 7).<table><tr><th>الأسبوع</th><th>Beg. inv.</th><th>Units rec'd</th><th>RN</th><th>Demand</th><th>End inv.</th><th>RN (lead)</th><th>Lead time</th><th>Holding $</th><th>Order $</th><th>Shortage $</th><th>Total $</th></tr><tr><td>1</td><td>10</td><td>0</td><td>0.356</td><td>1</td><td>9</td><td></td><td></td><td>45</td><td>0</td><td>0</td><td>45</td></tr><tr><td>2</td><td>9</td><td>0</td><td>0.132</td><td>1</td><td>8</td><td></td><td></td><td>40</td><td>0</td><td>0</td><td>40</td></tr><tr><td>3</td><td>8</td><td>0</td><td>0.185</td><td>1</td><td>7</td><td></td><td></td><td>35</td><td>0</td><td>0</td><td>35</td></tr><tr><td>4</td><td>7</td><td>0</td><td>0.946</td><td>4</td><td>3</td><td>0.248</td><td>2</td><td>15</td><td>200</td><td>0</td><td>215</td></tr><tr><td>5</td><td>3</td><td>0</td><td>0.921</td><td>4</td><td>0 (ناقص 1)</td><td></td><td></td><td>0</td><td>0</td><td>20</td><td>20</td></tr><tr><td>6</td><td>0</td><td>15</td><td>0.438</td><td>2</td><td>13</td><td></td><td></td><td>65</td><td>0</td><td>0</td><td>65</td></tr><tr><td>7</td><td>13</td><td>0</td><td>0.941</td><td>4</td><td>9</td><td></td><td></td><td>45</td><td>0</td><td>0</td><td>45</td></tr><tr><td>8</td><td>9</td><td>0</td><td>0.938</td><td>4</td><td>5</td><td>0.116</td><td>1</td><td>25</td><td>200</td><td>0</td><td>225</td></tr><tr><td>9</td><td>5</td><td>15</td><td>0.382</td><td>1</td><td>19</td><td></td><td></td><td>95</td><td>0</td><td>0</td><td>95</td></tr><tr><td>10</td><td>19</td><td>0</td><td>0.611</td><td>3</td><td>16</td><td></td><td></td><td>80</td><td>0</td><td>0</td><td>80</td></tr><tr><td>المجموع</td><td></td><td></td><td></td><td>25</td><td></td><td></td><td></td><td>445</td><td>400</td><td>20</td><td>865</td></tr><tr><td>المتوسط في الأسبوع</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>44.5</td><td>40</td><td>2</td><td>86.5</td></tr></table>في الأسبوع 4: الـ ending inventory بقى 3، وده ≤ 5، فبنطلب 15؛ والـ lead RN هو 0.248 يعني <bdi dir=\"ltr\">L = 2</bdi>، فالـ order يوصل الأسبوع 6.<br>في الأسبوع 5: الـ demand كان 4 والموجود 3 بس، فيه وحدة ناقصة ($20) والـ inventory بقى 0؛ ومفيش order جديد لأن فيه واحد لسه outstanding.<br>في الأسبوع 8: الـ ending inventory بقى 5، وده ≤ 5، فبنطلب؛ والـ lead RN هو 0.116 يعني <bdi dir=\"ltr\">L = 1</bdi>، فيوصل الأسبوع 9.<br>استخدمنا بس 2 من الـ 5 random numbers بتوع الـ lead time.<br><b>المجموع في 10 أسابيع:</b> الـ holding بـ $445 والـ ordering بـ $400 والـ shortage بـ $20، <b>والـ total cost بـ $865</b> (يعني المتوسط $86.50 في الأسبوع).<br>‡ لو حسبت الـ lead time بحيث الـ order يوصل بعدها بأسبوع (أول أسبوع <bdi dir=\"ltr\">t + L + 1</bdi>)، الاستلام اللي في الأسبوع 6 و 9 هيتنقل لـ 7 و 10 والتكاليف هتتغيّر؛ ومثال المحاضرة بيستخدم <bdi dir=\"ltr\">t + L</bdi>."
      }
     ]
    }
   ]
  }
 ]
};

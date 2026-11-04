// Egyptian Arabic for Operations Research, aligned item by item with or.js and extra/or.js.
window.AR = window.AR || {};
AR.or = {
 "lectures": {
  "1": {
   "notes": [
    {
     "h": "يعني إيه Operations Research (OR)؟",
     "pts": [
      "الـ OR بيهتم بـ <b>توزيع الـ resources المحدودة (scarce) بكفاءة (efficient)</b>. هو <b>فن وعلم</b> في نفس الوقت: الفن هنا إنك تقدر تحوّل مفاهيم زي <i>efficient</i> و<i>scarce</i> لـ <b>mathematical model</b> واضح ومحدد للموقف اللي قدامك.",
      "<b>البداية (Origins)</b>: الـ OR بشكل رسمي بدأ في <b>إنجلترا أيام الحرب العالمية التانية</b>، لما فريق علماء بريطانيين اشتغلوا على قرارات أحسن استخدام لمعدات الحرب. وبعد الحرب الأفكار دي اتنقلت لـ <b>القطاع المدني (civilian sector)</b> عشان تحسّن الكفاءة والإنتاجية. والنهارده الـ OR أداة أساسية في اتخاذ القرار.",
      "<b>التعريف (بصيغة الامتحان)</b>: الـ Operations research بيهتم بـ <b>إننا نقرر بشكل علمي إزاي نصمم ونشغّل الـ man-machine systems بأحسن طريقة</b>، وغالبًا ده بيحتاج <b>allocation of scarce resources</b>.",
      "خلي بالك من الفخ: أسئلة الـ <bdi dir=\"ltr\">T/F</bdi> في الامتحان بتلزق التعريف ده على \"linear programming\" أو \"formulation problem\" أو \"dynamic programming\". الجملة دي بتاعة <b>operations research</b> بس."
     ],
     "figH": {
      "or-model-deftrap": "تعريف الامتحان وفخ أسئلة الصح والغلط: الجملة دي بتاعة الـ operations research بس"
     }
    },
    {
     "h": "الـ Linear programming والـ optimization problems",
     "pts": [
      "الـ <b>Linear programming</b>: عايزين <b>نعمل maximize أو minimize لـ function تحت قيود (constraints)</b>. مثال: مصنع عايز يكبّر الربح وعنده حدود على الماكينات والعمالة.",
      "الـ <b>Optimization problem</b>: بندوّر نعمل max أو min لكمية معينة اسمها الـ <b>objective</b>، وهي بتعتمد على عدد محدود من الـ <b>input (decision) variables</b>. الـ variables دي ممكن تبقى مستقلة أو مربوطة ببعض عن طريق <b>constraint</b> أو أكتر.",
      "الـ <b>mathematical program</b> هو optimization problem الـ objective والـ constraints فيه مكتوبين كـ mathematical functions وعلاقات رياضية.",
      "الـ <b>Linear programming problem (LPP)</b>: إنك تلاقي الـ optimal value (max أو min) لـ function <b>linear</b> (الـ objective function) في كذا variable، بشرط إن الـ variables تبقى <b><bdi dir=\"ltr\">non-negative</bdi></b> وتحقق مجموعة <b>linear inequalities</b> (الـ linear constraints).",
      "كلمة <b>linear</b> معناها إن كل العلاقات الرياضية في المسألة linear. وكلمة <b>programming</b> معناها طريقة تحديد <b>program أو خطة عمل (plan of action)</b> معينة."
     ],
     "figH": {
      "or-model-family": "الـ optimization problem جواه الـ mathematical program، وجواه الـ LPP، ومعنى كلمة linear وكلمة programming"
     }
    },
    {
     "h": "الشكل العام للـ mathematical program",
     "figH": {
      "or-model-general": "الشكل العام بيتبني جزء جزء، وبعدين الـ Example 1 بنفس الشكل"
     }
    },
    {
     "h": "أهم التعريفات (Revision 1)",
     "figH": {
      "or-model-terms": "دوس على أي مصطلح وشوف هو أنهي جزء في الـ model بتاع الـ Example 1"
     }
    },
    {
     "h": "خطوات الـ formulation الأربعة",
     "pts": [
      "الـ <b>Step I</b>: عرّف الـ <b>decision variables</b> <bdi dir=\"ltr\">(x1, x2, ...)</bdi>، وقول بوضوح كل واحد بيعدّ إيه.",
      "الـ <b>Step II</b>: لخّص البيانات المهمة في <b>جدول (table form)</b>، واربط الأعمدة بالـ decision variables لو ينفع (الـ resources في الصفوف، المتاح في آخر عمود، والـ <bdi dir=\"ltr\">profit/cost</bdi> في آخر صف).",
      "الـ <b>Step III</b>: حدد الـ <b>objective</b> واكتب <b>linear objective function</b> (Max Z أو Min Z).",
      "الـ <b>Step IV</b>: اكتب الـ <b>constraints</b> والـ <b><bdi dir=\"ltr\">non-negativity</bdi> condition</b>.",
      "<b>الكلمات المفتاحية</b> (ملخص طلبة): الكلمات <i>profit و sold و sales و revenue</i> بتدّي <b>Max</b>؛ وكلمة <i>cost</i> بتدّي <b>Min</b>؛ والكلمات <i>available و has و at most و no more than و can use</i> بتدّي <b>≤</b>؛ والكلمات <i>at least و contains و minimum needs و must deliver</i> بتدّي <b>≥</b>.",
      "<b>الـ constraints المستخبية (Hidden constraints)</b>: مثلًا \"عدد أيام الأسبوع\" بيدّيك x ≤ 7، و\"أيام شهر سبتمبر\" بتدّيك x ≤ 30، و\"بيتدفعله يوم كامل حتى لو اشتغل جزء من اليوم\" معناها إن الـ variables لازم تبقى <b>integer</b>."
     ],
     "figH": {
      "or-formulate-keywords": "الكلمات المفتاحية: صنّف جمل المحاضرة لـ Max أو Min أو constraint نوعه أصغر من أو أكبر من (ومعاهم المستخبي)"
     }
    },
    {
     "h": "الـ Example 1: ماكينتين و revenue (من Lecture 1)",
     "figH": {
      "or-formulate-steps": "الـ Example 1 بالـ 4 steps: الكلام بيتحول لجدول، والجدول بيتحول لـ model"
     }
    },
    {
     "h": "الـ Examples من 2 لـ 5 (من Lecture 1)",
     "figH": {
      "or-formulate-builder": "ورشة الـ formulation: جدول كل مثال والـ model اللي بيطلع منه، أو اكتب مسألتك أنت"
     }
    },
    {
     "h": "تمارين المحاضرة Q1 و Q2 (محلولة)",
     "figH": {
      "or-model-check": "جرّب plan في الـ Q1 والـ Q2: أنهي constraints متحققة، وإيه اللي فاضل، وقيمة الـ Z"
     }
    },
    {
     "h": "الـ formulations من الامتحانات فيها شروط خاصة",
     "figH": {
      "or-formulate-hidden": "الـ constraints المستخبية: أيام الأسبوع أو أيام سبتمبر، والأيام الكاملة (integer)"
     }
    }
   ],
   "cards": [
    "بيهتم بإننا نقرر بشكل علمي إزاي نصمم ونشغّل الـ man-machine systems بأحسن طريقة، وغالبًا بيحتاج allocation of scarce resources.",
    "في إنجلترا، أيام الحرب العالمية التانية (علماء بريطانيين بيقرروا أحسن استخدام لمعدات الحرب).",
    "الفن إنك تعبّر عن \"efficient\" و\"scarce\" في mathematical model واضح ومحدد.",
    "إنك تترجم المسألة الحقيقية لـ mathematical equations ينفع تتحل.",
    "بتعمل maximize للـ profit أو minimize للـ <bdi dir=\"ltr\">loss/cost</bdi>، بناءً على الـ constraints والـ decision variables.",
    "الـ linear inequalities اللي على variables الـ LPP.",
    "كل الـ decision variables لازم قيمتها تبقى ≥ 0.",
    "كل العلاقات الرياضية في المسألة linear.",
    "طريقة تحديد program أو plan of action معينة.",
    "أولاً الـ decision variables، تانيًا جدول تلخيص، تالتًا linear objective function، رابعًا الـ constraints + الـ <bdi dir=\"ltr\">non-negativity</bdi>.",
    "الـ constraint من نوع ≥.",
    "الـ constraint من نوع ≤.",
    "معناها Maximize.",
    "معناها Minimize.",
    "يعني optimization problem الـ objective والـ constraints بتوعه mathematical functions.",
    "الشرط <bdi dir=\"ltr\">xi&nbsp;≤&nbsp;7</bdi> (و integer لو اليوم بيتدفع كامل)."
   ],
   "qa": [
    "الـ Operations research بيهتم بإننا نقرر بشكل علمي إزاي نصمم ونشغّل الـ man-machine systems بأحسن طريقة، وغالبًا بيحتاج allocation of scarce resources. بدأ في إنجلترا أيام الحرب العالمية التانية لما علماء بريطانيين قرروا أحسن استخدام لمعدات الحرب؛ وبعد الحرب الأفكار اتطبقت على الصناعة المدنية.",
    "الـ Step I: عرّف الـ decision variables. الـ Step II: لخّص البيانات المهمة في جدول يربط الأعمدة بالـ decision variables. الـ Step III: حدد الـ objective واكتب linear objective function. الـ Step IV: اكتب الـ constraints والـ <bdi dir=\"ltr\">non-negativity</bdi> condition.",
    "كلمة \"Linear\" معناها إن كل العلاقات الرياضية في المسألة (الـ objective والـ constraints) linear. وكلمة \"Programming\" معناها طريقة تحديد program أو plan of action معينة.",
    "الـ Objective function: الـ function اللي بنعملها maximize (profit) أو minimize (<bdi dir=\"ltr\">cost/loss</bdi>) بناءً على الـ constraints والـ decision variables. الـ Constraints: الـ linear inequalities اللي على الـ variables (capacity، المتاح، الـ resources). الـ <bdi dir=\"ltr\">Non-negativity</bdi>: كل decision variable لازم يبقى ≥ 0.",
    "نعرّف <bdi dir=\"ltr\">x1</bdi> = عدد وحدات A، و<bdi dir=\"ltr\">x2</bdi> = عدد وحدات B. والموديل:<span class=\"ltr\">Max Z = 200x1 + 175x2</span>بشرط (subject to):<span class=\"ltr\">10x1 + 22x2 ≤ 2640</span><span class=\"ltr\">15x1 + 18x2 ≤ 2500</span><span class=\"ltr\">x1, x2 ≥ 0</span>",
    "نعرّف <bdi dir=\"ltr\">xi</bdi> = عدد الأيام اللي الـ mine i بيشتغلها. والـ objective بالـ <bdi dir=\"ltr\">$1000</bdi> هي:<span class=\"ltr\">Min Z = 20x1 + 22x2 + 18x3</span>بشرط (s.t.):<span class=\"ltr\">4x1 + 6x2 + x3 ≥ 54 (high grade)</span><span class=\"ltr\">4x1 + 4x2 + 6x3 ≥ 65 (low grade)</span>الـ Hidden constraints: <bdi dir=\"ltr\">xi&nbsp;≥&nbsp;0</bdi>، و<bdi dir=\"ltr\">xi&nbsp;≤&nbsp;7</bdi> (الأسبوع 7 أيام)، و xi integer لأن العمال بياخدوا يوم كامل حتى لو اشتغلوا جزء من اليوم."
   ],
   "quiz": [
    [
     "صح. ده تعريف الـ OR بالظبط في المحاضرة وفي Revision 1.",
     "الـ LP بيعمل max أو min لـ linear function تحت constraints؛ ده أداة من أدوات الـ OR، مش التعريف ده.",
     "الـ Formulation هو ترجمة المسألة الحقيقية لـ mathematical equations.",
     "الـ DP بيتعامل مع الـ optimization للـ multistage decision problems."
    ],
    [
     "الـ objective function هي الكمية اللي بنعملها max أو min، مش الـ inequalities.",
     "الـ LP هو المسألة كلها، مش الـ inequalities.",
     "صح. الـ Constraints هي الـ linear inequalities اللي على الـ variables.",
     "الـ Decision variables هي المجاهيل x1, x2, ...، مش الـ inequalities."
    ],
    [
     "كلمة \"Programming\" معناها تحديد plan of action.",
     "الـ Non-negative constraints كل اللي بتعمله إنها بتجبر كل decision variable يبقى ≥ 0؛ مالهاش أي علاقة بإن العلاقات تبقى linear (L1, Key definitions).",
     "صح. \"Linear\" معناها إن كل العلاقات linear.",
     "كلمة \"Feasible\" بتوصف النقط اللي بتحقق كل الـ constraints."
    ],
    [
     "الجملة دي تعريف كلمة \"linear\" مش \"programming\".",
     "صح. \"Programming\" معناها تحديد program أو plan of action معينة؛ وجملة الـ linear relations دي تعريف \"linear\"."
    ],
    [
     "ده تعريف الـ operations research، مش الـ formulation.",
     "صح. الـ Formulation معناها ترجمة المسألة الحقيقية لـ mathematical equations. والتعريف المكتوب ده بتاع الـ OR."
    ],
    [
     "صح. ده تعريف الـ constraints في المحاضرة.",
     "لو قلت False تبقى بتنكر تعريف المحاضرة نفسه: الـ constraints هي بالظبط الـ linear inequalities على variables الـ LPP (زي الـ capacity والـ availability والـ resources)."
    ],
    [
     "صح. ده تعريف الـ operations research من المحاضرة كلمة بكلمة: إننا نقرر بشكل علمي إزاي نصمم ونشغّل الـ man-machine systems بأحسن طريقة، وغالبًا بنوزّع scarce resources (L1, What is OR).",
     "اختيار False هنا معناه إنك بترفض تعريف الـ OR الحرفي من L1؛ الفخ الحقيقي لما نفس الجملة تتلزق على الـ LP أو الـ formulation أو الـ dynamic programming."
    ],
    [
     "الجملة دي تعريف كلمة \"programming\".",
     "صح. الـ Non-negativity معناها إن كل الـ decision variables لازم تبقى ≥ 0."
    ],
    [
     "الـ OR بيستخدم methods علمية (scientific) مش \"economical\"؛ ونموذج إجابة الطلبة معلّمها False (\"مش التعريف\").",
     "صح. الـ OR بيطبق methods <b>scientific</b>؛ وتعريف المحاضرة هو:<span class=\"ltr\">\"scientifically deciding how to best design and operate man-machine systems\"</span>"
    ],
    [
     "صح. تعريف الـ formulation (Revision 1).",
     "اختيار False هنا بيرفض تعريف Revision 1: الـ formulation هو إنك تترجم المشكلة الحقيقية لـ mathematical equations ينفع تتحل."
    ],
    [
     "صح. تعريف الـ non-negativity restriction.",
     "اختيار False هنا بيرفض تعريف المحاضرة: الـ <bdi dir=\"ltr\">non-negativity</bdi> restriction معناها إن كل decision variable لازم يبقى ≥ 0."
    ],
    [
     "صح (جت في امتحان أغسطس كـ statement 8).",
     "اختيار False هنا بينكر تعريف المحاضرة: الـ constraints هي الـ linear inequalities على variables الـ LPP."
    ],
    [
     "صح. ده Column B item A في سؤال التوصيل بتاع أغسطس <bdi dir=\"ltr\">2023/24</bdi>.",
     "العنصر اللي في تقاطع الـ pivot column والـ pivot row ده الـ pivot element بتاع الـ simplex method (L3)، مش الـ non-negativity.",
     "إنك تلاقي أقصر مسافة بين two nodes بأقل تكلفة ده الـ shortest route problem بتاع الـ dynamic programming (L9).",
     "إننا نقرر بشكل علمي إزاي نصمم ونشغّل الـ man-machine systems ده تعريف الـ operations research (L1)، مش الـ non-negativity."
    ],
    [
     "صح. التكاليف بنعملها minimize، و\"at least\" بتدّي ≥.",
     "التكاليف بنعملها minimize، والاحتياجات اللي \"at least\" بتبقى ≥ مش ≤.",
     "ده بيبدّل دور التكاليف والاحتياجات (شكله dual، مش الـ model).",
     "اختيار A موديل كامل وصح:<span class=\"ltr\">Min cost 40x1 + 50x2</span>مع ≥ لاحتياجات الـ glass والـ aluminum اللي هي <bdi dir=\"ltr\">'at least'</bdi>، فـ <bdi dir=\"ltr\">'None'</bdi> غلط."
    ],
    [
     "ناقصه شرط الـ integer وحد الـ 7 أيام.",
     "لسه ناقصه x ≤ 7 (الـ mine مايقدرش يشتغل أكتر من 7 أيام في الأسبوع).",
     "صح. فيه الـ hidden constraints الاتنين: 7 أيام بالكتير، وعدد أيام integer.",
     "اختيار C هو الـ model الكامل اللي في حل الـ revision."
    ],
    [
     "التكاليف المفروض تبقى minimize، والاحتياجات \"at least\" (≥)؛ وكمان الـ carbohydrate بتاع C هو 20 مش 30.",
     "صح. بنعمل minimize لتكلفة الأكل، وعبارة:<span class=\"ltr\">'at least 70 protein / 100 carbs'</span>بتدّينا constraints من نوع ≥:<span class=\"ltr\">20x1 + 30x2 + 40x3 ≥ 70</span><span class=\"ltr\">50x1 + 30x2 + 20x3 ≥ 100</span>المصدر: <bdi dir=\"ltr\">(L1, Exam formulations)</bdi>.",
     "ده شكل قريب من الـ dual (الاحتياجات بقت costs)؛ مش الـ formulation المطلوب.",
     "اختيار B هو الموديل الصح (Min cost، و≥ للحد الأدنى من الـ protein والـ carbohydrate)، فـ 'None of the above' غلط."
    ]
   ],
   "extra": [
    [
     "ده شرط على الـ variables، مش الكمية اللي بنعملها optimize.",
     "عبارة <bdi dir=\"ltr\">\"At most / available\"</bdi> بتدّي ≤؛ لكن \"at least\" بتدّي ≥.",
     "صح. \"At least\" معناها إن الطرف الشمال لازم يبقى أكبر من أو يساوي 20.",
     "الـ Non-negativity بتقول بس إن كل variable ≥ 0."
    ],
    [
     "الـ Profit حاجة عايزينها أكبر ما يمكن؛ قاعدة الـ key words بتقول إن الـ <bdi dir=\"ltr\">profit/sales/revenue</bdi> بتدّي Max، والـ cost بس بتدّي Min <bdi dir=\"ltr\">(L1)</bdi>.",
     "صح. الربح لكل وحدة مضروب في عدد الوحدات من كل منتج.",
     "دي ساعات (معاملات constraints)، مش أرباح.",
     "الـ 150 ده المتاح من العمالة (الـ right-hand side)، مش معامل."
    ],
    [
     "دي معناها إن Y بالكتير ضعف X، يعني العلاقة بالعكس.",
     "ده constraint على إجمالي الإنتاج، مش نسبة.",
     "الـ x1 ≤ 2x2 معناها إن X على الأكتر ضعف Y؛ لكن 'at least twice' محتاجة x1 ≥ 2x2، يعني x1 − 2x2 ≥ 0.",
     "صح. <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;2x2</bdi>، ونقلناها كلها في طرف واحد <bdi dir=\"ltr\">(Final 2025/26 Q2)</bdi>."
    ],
    [
     "صح. الـ protein من A زائد الـ protein من B لازم يوصل 20 <bdi dir=\"ltr\">(Lecture 1, Example 5)</bdi>.",
     "عبارة 'At least 20 units' دي حد أدنى، فقاعدة الـ key words بتدّيك ≥؛ الـ ≤ كانت هتخلي الـ protein ميعديش 20.",
     "المعاملات متحطة على الأكلات الغلط.",
     "الاحتياج مكانه في الـ right-hand side."
    ],
    [
     "مينفعش يشتغل أكتر من 31 يوم، فده الاتجاه الغلط.",
     "الـ x ≤ 7 ده الحد المخفي لأيام الأسبوع (Universal Mines)؛ لكن هنا شهر 31 يوم، فيبقى x ≤ 31.",
     "صح. الأيام محدودة بالشهر، والدفع بيوم كامل بيخلي الكسور مالهاش لازمة.",
     "حد الأيام والـ integrality الاتنين مفهومين ضمنًا."
    ],
    [
     "المحاضرة بتقول إن الـ OR الرسمي بدأ في إنجلترا أيام الحرب العالمية التانية، مش في أمريكا أيام الـ Depression.",
     "صح. علماء بريطانيين قرروا أحسن استخدام لمعدات الحرب.",
     "مصر في السبعينات مش مذكورة خالص؛ المحاضرة بتقول إن الـ OR بدأ في إنجلترا أيام الحرب العالمية التانية مع علماء بريطانيين.",
     "الترتيب معكوس: الـ OR بدأ في الاستخدام العسكري (معدات الحرب في WWII) وبعد الحرب اتنقل للـ civilian sector."
    ],
    [
     "إنك تعرّف الـ decision variables (x1, x2, ...) ده Step I في الـ formulation procedure، يعني هي فعلًا من الخطوات.",
     "تلخيص الداتا في table (الـ resources في الصفوف والـ availability في آخر عمود) ده Step II، يعني هي فعلًا خطوة من خطوات الـ formulation.",
     "كتابة الـ constraints وشرط الـ non-negativity ده Step IV، آخر خطوة في الـ formulation، يعني هي من الخطوات.",
     "صح. دي تبع الـ simplex method، مش الـ formulation."
    ],
    [
     "صح. مجموع المنتجين لازم يوصل 30.",
     "دي بتطلب 30 من <i>كل</i> منتج (يعني 60 في المجموع).",
     "الـ ≤ هتخلي الـ 30 حد أقصى؛ لكن 'at least 30' ده حد أدنى، فقاعدة الـ key words بتدّيك x1 + x2 ≥ 30.",
     "المعاملات (1 لكل وحدة من كل منتج) والـ RHS (30) متبدلين؛ المجموع هو x1 + x2 ولازم يوصل 30."
    ],
    [
     "الخشب تمام:<span class=\"ltr\">4 + 2 = 6 ≤ 6</span>بس الساعات بتقع:<span class=\"ltr\">7(2) + 8(2) = 30 &gt; 28</span>فالنقطة <bdi dir=\"ltr\">(2,&nbsp;2)</bdi> infeasible.",
     "صح. الخشب:<span class=\"ltr\">2 + 2 = 4 ≤ 6</span>والساعات:<span class=\"ltr\">7 + 16 = 23 ≤ 28</span>",
     "الخشب بيقع:<span class=\"ltr\">2(3) + 1 = 7 &gt; 6</span>والساعات كمان بتقع:<span class=\"ltr\">21 + 8 = 29 &gt; 28</span>فالنقطة <bdi dir=\"ltr\">(3,&nbsp;1)</bdi> infeasible.",
     "الخشب تمام:<span class=\"ltr\">0 + 4 = 4 ≤ 6</span>بس الساعات بتقع:<span class=\"ltr\">8(4) = 32 &gt; 28</span>فالنقطة <bdi dir=\"ltr\">(0,&nbsp;4)</bdi> infeasible."
    ],
    [
     "الـ 130 ده المخزون المتاح؛ مكانه في الـ right-hand side (ده الغلط اللي في حل طالب).",
     "ده معناه 3 باوند cherries لكل باوند mixture.",
     "صح. تلت كل باوند cherries، فالـ constraint يبقى:<span class=\"ltr\">(1/2)x1 + (1/3)x2 ≤ 130</span>",
     "التلتين (<bdi dir=\"ltr\">two-thirds</bdi>) من mixture 2 دول نصيب الـ mint؛ نصيب الـ cherries هو التلت، فالـ cherries المستخدمة <bdi dir=\"ltr\">x2/3</bdi>."
    ]
   ]
  },
  "2": {
   "notes": [
    {
     "h": "تعريفات الـ graphical method",
     "figH": {
      "or-lp-terms": "التعريفات على رسمة حقيقية: اختار المصطلح، أو دوس على أي نقطة علشان تختبرها"
     }
    },
    {
     "h": "الخطوات: الـ geometric method لما يبقى عندك variablين",
     "pts": [
      "الـ <b>Step 1</b>: ارسم الـ feasible region. حوّل كل inequality لـ equation، هات الـ intercepts بتوعها (حط <bdi dir=\"ltr\">x1&nbsp;=&nbsp;0</bdi> وبعدين <bdi dir=\"ltr\">x2&nbsp;=&nbsp;0</bdi>)، ارسم الخط وظلّل الناحية الصح (الـ ≤ ناحية الـ origin، والـ ≥ بعيد عنه). لو فيه optimal solution، هات إحداثيات كل <b>corner point</b>.",
      "الـ <b>Step 2</b>: اعمل <b>corner point table</b> فيه قيمة الـ objective function عند كل corner point.",
      "الـ <b>Step 3</b>: حدد الـ <bdi dir=\"ltr\">optimal&nbsp;solution(s)</bdi> من الجدول: <b>الـ Max ← أكبر Z</b>، و<b>الـ Min ← أصغر Z</b>.",
      "الـ <b>Step 4</b>: لو المسألة تطبيقية، <b>فسّر (interpret)</b> الـ optimal solution بلغة المسألة الأصلية.",
      "عشان تجيب corner جاي من تقاطع خطين، حل المعادلتين مع بعض (اضرب معادلة في رقم عشان variable يتشال، وبعدين اجمع).",
      "خطوط زي <bdi dir=\"ltr\">x2&nbsp;=&nbsp;2</bdi> أفقية، و <bdi dir=\"ltr\">x1&nbsp;=&nbsp;1</bdi> رأسية؛ الـ <bdi dir=\"ltr\">x2&nbsp;≥&nbsp;2</bdi> معناها فوق الخط الأفقي، والـ <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;1</bdi> معناها شمال الخط الرأسي."
     ],
     "figH": {
      "or-lp-steps": "الخطوات الأربعة للـ geometric method على Example 2",
      "or-lp-intersect": "إزاي نجيب corner من تقاطع خطين: نضرب ونجمع ونحل سطر بسطر",
      "or-lp-shade": "قيد واحد: الخط بتاعه والـ intercepts وأنهي ناحية نظلّلها"
     }
    },
    {
     "h": "الـ Example 1 (من Lecture 2):<span class=\"ltr\">Max Z = 200x1 + 175x2</span>",
     "figH": {
      "or-lp-ex1": "حل Example 1 بالرسم خطوة بخطوة"
     }
    },
    {
     "h": "الـ Example 2: محل Jay للحلويات،<span class=\"ltr\">Max Z = 25x1 + 20x2</span>",
     "figH": {
      "or-lp-ex2": "حل Example 2 بتاع الـ Jay بالرسم خطوة بخطوة"
     }
    },
    {
     "h": "الـ Example 5: الـ Diet،<span class=\"ltr\">Min Z = 1.20x1 + 0.80x2</span>",
     "figH": {
      "or-lp-ex5": "حل Example 5 بتاع الـ diet: مسألة MIN على منطقة مفتوحة خطوة بخطوة"
     }
    },
    {
     "h": "مسائل graphical محلولة زيادة (السكاشن والشيتات)",
     "figH": {
      "or-lp-solver": "حلّال بالرسم: مسائل السكاشن والشيتات أو مسألة من عندك"
     }
    },
    {
     "h": "الحالات الخاصة اللي لازم تعرفها من الرسمة",
     "pts": [
      "الـ <b>Infeasible</b>: المناطق المظللة مش بتتقاطع. مثال من الـ revision Q14:<span class=\"ltr\">Max 200x1 + 300x2</span>مع:<span class=\"ltr\">2x1 + 3x2 ≥ 1200</span><span class=\"ltr\">x1 + x2 ≤ 400</span><span class=\"ltr\">2x1 + 1.5x2 ≥ 900</span>جوه <bdi dir=\"ltr\">x1&nbsp;+&nbsp;x2&nbsp;≤&nbsp;400</bdi> أكبر قيمة لـ <bdi dir=\"ltr\">2x1&nbsp;+&nbsp;1.5x2</bdi> هي:<span class=\"ltr\">2(400) = 800 &lt; 900</span>يعني مفيش ولا نقطة بتحقق كل الـ constraints، فده <b>infeasible solution</b>.",
      "الـ <b>Unbounded</b>: في مسألة MAX المنطقة بتمتد من غير نهاية في الاتجاه اللي بيزوّد Z، فـ <bdi dir=\"ltr\">Z&nbsp;→&nbsp;∞</bdi>.",
      "الـ <b>Multiple optima</b>: خط الـ objective موازي لـ binding constraint؛ فيه اتنين corners جنب بعض بيدّوا نفس أحسن Z.",
      "الـ <b>Redundant constraint</b>: ده constraint مش بيلمس الـ feasible region أصلًا (لو شلته مفيش حاجة هتتغير)."
     ],
     "figH": {
      "or-lp-special": "الحالات الخاصة الأربعة على الرسمة: الـ infeasible والـ unbounded والـ multiple optima والـ redundant"
     }
    }
   ],
   "cards": [
    "المنطقة المشتركة اللي بتحددها كل الـ constraints ومعاهم الـ non-negative constraints.",
    "أي نقطة جوه الـ feasible region.",
    "نقطة في الـ feasible region بتدّي الـ optimal value (max أو min) للـ objective.",
    "تقاطع خطين من حدود منطقة الحل.",
    "أي نقط برا الـ feasible region.",
    "يعني LP الـ feasible set بتاعها فاضي.",
    "الـ objective function قيمتها infinite.",
    "فيه اتنين optimal corners؛ وكل نقطة على الخط اللي بينهم optimal.",
    "ارسم الـ feasible region وهات الـ corner points.",
    "اعمل corner-point table فيه قيم Z.",
    "اختار الـ optimal Z (max أو min) من الجدول.",
    "فسّر الحل بلغة المسألة الأصلية.",
    "مفيد بس لما يبقى عندك 2 decision variables وعدد constraints قليل نسبيًا.",
    "النقطة <bdi dir=\"ltr\">C(6,&nbsp;8)</bdi>، و<bdi dir=\"ltr\">Z&nbsp;=&nbsp;$310</bdi>.",
    "النقطة <bdi dir=\"ltr\">B(4,&nbsp;4)</bdi>، أقل تكلفة <bdi dir=\"ltr\">Z&nbsp;=&nbsp;$8</bdi>."
   ],
   "qa": [
    "الـ Feasible region: المنطقة اللي بتحددها كل الـ constraints ومعاهم الـ non-negativity. الـ Feasible solution: أي نقطة واحدة جوه المنطقة دي. الـ Optimal solution: نقطة feasible بتدّي أحسن قيمة (max أو min) للـ objective function على المنطقة كلها.",
    "أولاً ارسم الـ feasible region، ولو فيه optimum هات إحداثيات كل corner point. تانيًا اعمل corner point table فيه Z عند كل corner. تالتًا حدد الـ <bdi dir=\"ltr\">optimal&nbsp;solution(s)</bdi> من الجدول. رابعًا فسّر الـ optimal solution بلغة المسألة الأصلية.",
    "الـ Intercepts هي <bdi dir=\"ltr\">(0,11),&nbsp;(22,0)</bdi> و <bdi dir=\"ltr\">(0,20),&nbsp;(10,0)</bdi>. الـ Corner C بطرح المعادلتين:<span class=\"ltr\">3x1 = 18, x1 = 6, x2 = 8</span>الـ Corners:<span class=\"ltr\">(0,0) = 0, (10,0) = 250,</span><span class=\"ltr\">(6,8) = 310, (0,11) = 220</span>الـ Optimum هو:<span class=\"ltr\">x1 = 6, x2 = 8, Z = 310</span>",
    "المنطقة فوق الخطين الاتنين. الـ Corners:<span class=\"ltr\">A(0,20) Z = 16</span><span class=\"ltr\">B(4,4) Z = 8</span><span class=\"ltr\">C(8,0) Z = 9.6</span>أقل <bdi dir=\"ltr\">Z&nbsp;=&nbsp;8</bdi> عند <bdi dir=\"ltr\">(4,4)</bdi>.",
    "الـ Infeasible LP: الـ feasible set فاضي، مفيش نقطة بتحقق كل الـ constraints. الـ Unbounded: الـ objective ممكن يكبر من غير حد (الـ objective function infinite). الـ Multiple optima: فيه اتنين corner points الاتنين optimal، فكل نقطة على الخط اللي بيوصلهم optimal برضه."
   ],
   "quiz": [
    [
     "الـ corner point هي نقطة تقاطع واحدة بين خطين من الحدود.",
     "الـ optimal solution هي النقطة اللي بتدّي أحسن قيمة للـ objective.",
     "صح. الـ feasible region هي المنطقة المشتركة اللي بتحددها كل الـ constraints، ومعاها الـ non-negativity constraints؛ وأي نقطة جواها بتحقق القيود دي كلها (L2, Definitions).",
     "الـ infeasible solutions بتبقى برا الـ feasible region."
    ],
    [
     "صح. ده تعريف Revision 1: الـ feasible region هي المنطقة المشتركة بين كل الـ constraints ومعاهم x ≥ 0 (L2, Definitions).",
     "لو قلت False تبقى بترفض التعريف كلمة بكلمة؛ المنطقة اللي كل الـ constraints (ومعاهم x ≥ 0) بيشتركوا فيها هي بالظبط الـ feasible region."
    ],
    [
     "صح. Revision 1 بيعرّف الـ unbounded solution إنها الحالة اللي الـ objective function فيها بتبقى infinite: في مسألة MAX المنطقة بتفضل ممتدة لما لا نهاية في الاتجاه اللي بيحسّن Z (L2, Special cases).",
     "لو قلت False تبقى بترفض تعريف Revision 1: الـ unbounded solution معناها إن Z تقدر تكبر من غير حد، يعني الـ objective بيبقى infinite."
    ],
    [
     "النقط اللي برا الـ feasible region اسمها infeasible solutions.",
     "صح. النقط اللي برا المنطقة هي <b>infeasible</b> solutions؛ والـ unbounded معناها إن الـ objective infinite."
    ],
    [
     "صح. الـ Infeasible solutions هي أي نقط برّه الـ feasible region: كل واحدة فيهم بتكسر constraint واحد على الأقل <bdi dir=\"ltr\">(L2,&nbsp;Definitions)</bdi>؛ وفي توصيل <bdi dir=\"ltr\">2023/24</bdi> الإجابة <bdi dir=\"ltr\">1&nbsp;→&nbsp;D</bdi>.",
     "لما تشيل كل الـ integer أو الـ <bdi dir=\"ltr\">0-1</bdi> constraints من الـ IP بتطلع الـ LP relaxation <bdi dir=\"ltr\">(L6,&nbsp;Branch&nbsp;and&nbsp;Bound)</bdi>، مش الـ infeasible solutions.",
     "الـ activity اللي لازم تخلص قبل ما activity تانية تبدأ على طول اسمها predecessor activity (L7, CPM network terms).",
     "الـ activity اللي مينفعش تبدأ غير لما activity تانية تخلص اسمها successor activity (L7, CPM network terms)، ومالهاش علاقة بالنقط الـ infeasible."
    ],
    [
     "صح. الـ feasible region هي المنطقة المشتركة اللي بتحددها كل الـ constraints ومعاها الـ <bdi dir=\"ltr\">non-negative</bdi> constraints <bdi dir=\"ltr\">(L2,&nbsp;Definitions)</bdi>؛ وفي توصيل <bdi dir=\"ltr\">2023/24</bdi> الإجابة <bdi dir=\"ltr\">1&nbsp;→&nbsp;C</bdi>.",
     "الـ integer program اللي فيه بس بعض الـ variables لازم تبقى integers اسمه mixed integer program (L6)، مش الـ feasible region.",
     "إنك تبدأ الـ allocation في الخانة اللي أقل cost دي الـ least (minimum) cost method بتاعة الـ transportation problem (L4).",
     "الوقت اللي الـ activity تقدر تتأخره من غير ما المشروع كله يتأخر ده الـ total float (L7, CPM)، مش الـ feasible region."
    ],
    [
     "مفيش نقطة بتحقق التلاتة: مع <bdi dir=\"ltr\">x1&nbsp;+&nbsp;x2&nbsp;≤&nbsp;400</bdi>، أقصى قيمة لـ <bdi dir=\"ltr\">2x1&nbsp;+&nbsp;1.5x2</bdi> هي <bdi dir=\"ltr\">800&nbsp;&lt;&nbsp;900</bdi>.",
     "إنك تظلل فوق<span class=\"ltr\">2x1 + 3x2 = 1200</span>بس كده بتتجاهل القيدين:<span class=\"ltr\">x1 + x2 ≤ 400</span><span class=\"ltr\">2x1 + 1.5x2 ≥ 900</span>المنطقة لازم تحقق التلاتة مع بعض، ومفيش ولا نقطة بتحققهم.",
     "صح. الـ constraints مالهاش منطقة مشتركة، فالـ LP يبقى infeasible.",
     "اختيار <bdi dir=\"ltr\">'None'</bdi> غلط لأن <bdi dir=\"ltr\">'Infeasible&nbsp;solution'</bdi> بتوصف الحالة بالظبط: جوه <bdi dir=\"ltr\">x1&nbsp;+&nbsp;x2&nbsp;≤&nbsp;400</bdi> أكبر قيمة لـ <bdi dir=\"ltr\">2x1&nbsp;+&nbsp;1.5x2</bdi> هي <bdi dir=\"ltr\">800&nbsp;&lt;&nbsp;900</bdi>، فمفيش منطقة مشتركة خالص."
    ],
    [
     "الـ origin بيدي:<span class=\"ltr\">Z = 200(0) + 175(0) = 0</span>وده أصغر قيمة بين الـ corners؛ وفي مسألة MAX إحنا عايزين الأكبر، وده عند B.",
     "صح. Z ≈ 33,333، أكبر قيمة بين الـ corners.",
     "الـ <bdi dir=\"ltr\">C(49.87,&nbsp;97.33)</bdi> بتدي:<span class=\"ltr\">Z = 200(49.87) + 175(97.33) ≈ 27,007</span>وده أقل من <bdi dir=\"ltr\">33,333</bdi> عند B، فـ C مش الـ optimal.",
     "الـ <bdi dir=\"ltr\">D(0,&nbsp;120)</bdi> بتدي:<span class=\"ltr\">Z = 175 × 120 = 21,000</span>أقل قيمة غير الصفر بين الـ corners؛ أما الـ maximum فهو <bdi dir=\"ltr\">B(166.7,&nbsp;0)</bdi> بـ <bdi dir=\"ltr\">33,333</bdi>."
    ],
    [
     "الحساب:<span class=\"ltr\">Z(0, 20) = 0.8 × 20 = $16</span>ودي أكبر قيمة بين الـ corners؛ ومسألة الـ MIN بتختار الأصغر، اللي هي <bdi dir=\"ltr\">$8</bdi> عند <bdi dir=\"ltr\">(4,&nbsp;4)</bdi>.",
     "الحساب:<span class=\"ltr\">Z(8, 0) = 1.2 × 8 = $9.6</span>ده corner feasible بس أكبر من <bdi dir=\"ltr\">$8</bdi> عند <bdi dir=\"ltr\">(4,&nbsp;4)</bdi>، فمش هو الـ minimum.",
     "صح. الـ corner B بييجي من حل المعادلتين مع بعض:<span class=\"ltr\">2x1 + 2x2 = 16</span><span class=\"ltr\">4x1 + x2 = 20</span>فيطلع <bdi dir=\"ltr\">(4,&nbsp;4)</bdi>؛ والقيمة:<span class=\"ltr\">Z = 1.2(4) + 0.8(4) = 8</span>وده الأصغر بين 16 و 8 و 9.6 <bdi dir=\"ltr\">(L2,&nbsp;Example&nbsp;5)</bdi>.",
     "الـ <bdi dir=\"ltr\">(0,&nbsp;0)</bdi> مش feasible:<span class=\"ltr\">2(0) + 2(0) = 0 &lt; 16</span>بتكسر الـ ≥ constraints، فمستحيل توصل لـ <bdi dir=\"ltr\">$0</bdi>."
    ],
    [
     "أصغر Z بنختارها في مسألة MINIMIZATION؛ الـ Step 3 في الـ graphical method بيقول الـ Max ← أكبر Z <bdi dir=\"ltr\">(L2)</bdi>.",
     "صح. الـ Step 3 في الـ graphical method: من الـ corner point table، الـ Max ← أكبر Z، والـ Min ← أصغر Z <bdi dir=\"ltr\">(L2,&nbsp;Procedure)</bdi>.",
     "الـ origin غالبًا corner بس نادرًا ما يبقى optimal في الـ max.",
     "النقط اللي جوه المنطقة عمرها ما بتبقى أحسن من الـ corners: لو فيه optimum، هيبقى عند corner point، وعشان كده بنحط الـ corners بس في الجدول."
    ],
    [
     "صح. الطرح بيدّي <bdi dir=\"ltr\">3x1&nbsp;=&nbsp;18</bdi>، يعني <bdi dir=\"ltr\">x1&nbsp;=&nbsp;6</bdi> و <bdi dir=\"ltr\">x2&nbsp;=&nbsp;8</bdi>.",
     "الـ <bdi dir=\"ltr\">(8,&nbsp;6)</bdi> قالبة الإحداثيات:<span class=\"ltr\">8 + 2(6) = 20 ≠ 22</span>لو حليت هتلاقي <bdi dir=\"ltr\">3x1&nbsp;=&nbsp;18</bdi>، يعني <bdi dir=\"ltr\">x1&nbsp;=&nbsp;6</bdi> و <bdi dir=\"ltr\">x2&nbsp;=&nbsp;8</bdi>.",
     "الـ <bdi dir=\"ltr\">(10,&nbsp;0)</bdi> ده بس الـ <bdi dir=\"ltr\">x1-intercept</bdi> بتاع:<span class=\"ltr\">4x1 + 2x2 = 40</span>(الـ corner B)؛ ومش واقع على:<span class=\"ltr\">x1 + 2x2 = 22</span>",
     "الـ <bdi dir=\"ltr\">(0,&nbsp;11)</bdi> ده بس الـ <bdi dir=\"ltr\">x2-intercept</bdi> بتاع:<span class=\"ltr\">x1 + 2x2 = 22</span>(الـ corner D)؛ ومش واقع على:<span class=\"ltr\">4x1 + 2x2 = 40</span>"
    ],
    [
     "الـ 8 دي غلطة الـ slide: عوّضت بـ <bdi dir=\"ltr\">x1&nbsp;=&nbsp;2</bdi> بدل 3، يعني <bdi dir=\"ltr\">3(2)&nbsp;+&nbsp;2</bdi>. القيمة الصح:<span class=\"ltr\">3(3) + 2 = 11</span>",
     "الـ 9 بتيجي لو قلبت الإحداثيات، <bdi dir=\"ltr\">3(2)&nbsp;+&nbsp;3</bdi>؛ لكن عند <bdi dir=\"ltr\">(3,&nbsp;2)</bdi> القيمة:<span class=\"ltr\">Z = 3(3) + 2 = 11</span>",
     "صح.<span class=\"ltr\">3(3) + 2 = 11</span>ولسه أقل من 12 عند <bdi dir=\"ltr\">(4,&nbsp;0)</bdi>، فالـ optimum مش بيتغير.",
     "الـ 12 دي قيمة الـ corner التاني <bdi dir=\"ltr\">(4,&nbsp;0)</bdi>، والحساب:<span class=\"ltr\">3(4) + 0 = 12</span>عند <bdi dir=\"ltr\">(3,&nbsp;2)</bdi> القيمة 11."
    ]
   ],
   "extra": [
    [
     "صح. الطرح بيدّي <bdi dir=\"ltr\">2x2&nbsp;=&nbsp;4</bdi>، يعني <bdi dir=\"ltr\">x2&nbsp;=&nbsp;2</bdi> و <bdi dir=\"ltr\">x1&nbsp;=&nbsp;3</bdi>.",
     "الـ <bdi dir=\"ltr\">(2,&nbsp;3)</bdi> قالبة الإحداثيات:<span class=\"ltr\">2(2) + 3 = 7 ≠ 8</span>لو طرحت المعادلتين هيطلع <bdi dir=\"ltr\">2x2&nbsp;=&nbsp;4</bdi>، فالنقطة <bdi dir=\"ltr\">(3,&nbsp;2)</bdi>.",
     "ده الـ x1-intercept بتاع الخط الأول بس.",
     "ده الـ x2-intercept بتاع الخط التاني بس."
    ],
    [
     "الـ <bdi dir=\"ltr\">(4,&nbsp;0)</bdi> corner وقيمته:<span class=\"ltr\">Z = 5(4) = 20</span>بس الـ corner <bdi dir=\"ltr\">(3,&nbsp;2)</bdi> بيدي 23، فبالنسبة للـ MAX ده مش الـ optimal.",
     "الـ <bdi dir=\"ltr\">(0,&nbsp;5)</bdi> corner وقيمته:<span class=\"ltr\">Z = 4(5) = 20</span>بس <bdi dir=\"ltr\">(3,&nbsp;2)</bdi> بتدي:<span class=\"ltr\">5(3) + 4(2) = 23</span>وده أكبر.",
     "صح. الـ Corners:<span class=\"ltr\">(0,0) 0, (4,0) 20, (3,2) 23, (0,5) 20</span>",
     "الـ <bdi dir=\"ltr\">(5,&nbsp;0)</bdi> مش feasible:<span class=\"ltr\">2(5) + 0 = 10 &gt; 8</span>بتكسر الـ constraint التاني، فالـ <bdi dir=\"ltr\">Z&nbsp;=&nbsp;25</bdi> بتاعتها مستحيل نوصلها."
    ],
    [
     "الـ <bdi dir=\"ltr\">(3,&nbsp;1)</bdi> corner feasible، بس:<span class=\"ltr\">Z = 3(3) + 2(1) = 11</span>أكبر من 8 عند <bdi dir=\"ltr\">(0,&nbsp;4)</bdi>، فمش هو الـ minimum.",
     "صح. الـ Corners:<span class=\"ltr\">(0,4) = 8, (3,1) = 11, (6,0) = 18</span>",
     "الـ <bdi dir=\"ltr\">(0,&nbsp;0)</bdi> مش feasible، لأن <bdi dir=\"ltr\">0&nbsp;&lt;&nbsp;4</bdi> و <bdi dir=\"ltr\">0&nbsp;&lt;&nbsp;6</bdi> بيكسروا الـ ≥ constraints الاتنين، فالـ <bdi dir=\"ltr\">Z&nbsp;=&nbsp;0</bdi> مش ممكنة.",
     "القيمة <bdi dir=\"ltr\">Z(6,&nbsp;0)&nbsp;=&nbsp;18</bdi> دي أكبر قيمة بين الـ corners؛ ومسألة الـ MIN بتختار الأصغر، 8 عند <bdi dir=\"ltr\">(0,&nbsp;4)</bdi>."
    ],
    [
     "الـ <bdi dir=\"ltr\">250&nbsp;=&nbsp;2500/10</bdi> جاية من معامل غلط؛ الـ intercepts هي <bdi dir=\"ltr\">2500/15&nbsp;=&nbsp;166.7</bdi> على x1 و <bdi dir=\"ltr\">2500/18&nbsp;=&nbsp;138.9</bdi> على x2.",
     "دي المعاملات، مش الـ intercepts.",
     "الـ <bdi dir=\"ltr\">(264,&nbsp;0)</bdi> و <bdi dir=\"ltr\">(0,&nbsp;120)</bdi> دول intercepts الخط التاني:<span class=\"ltr\">10x1 + 22x2 = 2640</span>من Example 1.",
     "صح.<span class=\"ltr\">2500/15 = 166.7</span><span class=\"ltr\">2500/18 = 138.9</span>"
    ],
    [
     "صح. الـ corners اللي على الطرفين وكل نقطة بينهم optimal.",
     "التوازي ده بيخص خط الـ objective، مش الـ constraints؛ الـ feasible region لسه موجودة، فالـ LP مش infeasible.",
     "الـ Unboundedness محتاجة منطقة مفتوحة في اتجاه التحسين.",
     "الـ two corners اللي جنب بعض على الـ edge ده بيدوا نفس أحسن Z، وكمان كل نقطة بينهم، فالـ optimum مش unique."
    ],
    [
     "الـ origin مستبعد بسبب الـ ≥ constraints اللي الـ RHS بتاعها موجب.",
     "المنطقة مش فاضية، هي بس مفتوحة ناحية فوق يمين؛ الـ infeasible معناها إن المناطق المظللة مش بتتقاطع خالص.",
     "صح. Z ممكن يكبر من غير حد، فالـ objective infinite.",
     "الـ Multiple optima محتاجة خط الـ objective يبقى موازي لـ binding edge عند أحسن قيمة محدودة؛ هنا Z بتفضل تكبر، فمفيش أحسن قيمة أصلًا."
    ],
    [
     "ده للـ ≥ constraints (لما الـ origin يفشل في الاختبار).",
     "صح. 0 ≤ 12 صح، فناحية الـ origin هي الـ feasible.",
     "الناحيتين بتوع الخط فيهم نقط فوق محور الـ x1؛ الناحية بتتحدد إنك تختبر نقطة زي الـ origin.",
     "الناحية مش بتتختار عشوائي: اختبر الـ origin:<span class=\"ltr\">2(0) + 3(0) = 0 ≤ 12</span>ودي صح، فظلل الناحية اللي فيها <bdi dir=\"ltr\">(0,&nbsp;0)</bdi>."
    ],
    [
     "الـ <bdi dir=\"ltr\">(6,&nbsp;0)</bdi> بتدي:<span class=\"ltr\">Z = 2(6) = 12</span>أقل من 16 على الـ edge:<span class=\"ltr\">x1 + 2x2 = 8</span>فلا هي unique ولا optimal.",
     "المنطقة محدودة بـ <bdi dir=\"ltr\">x1&nbsp;+&nbsp;2x2&nbsp;≤&nbsp;8</bdi> و <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;6</bdi> والمحاور، يعني polygon مقفول، فـ Z مش ممكن تكبر لما لا نهاية.",
     "الـ origin بيحقق 0 ≤ 8 و 0 ≤ 6، فالـ feasible region مش فاضية والـ LP مش infeasible.",
     "صح. القيمة:<span class=\"ltr\">Z = 2(x1 + 2x2) = 16</span>على طول الحافة <bdi dir=\"ltr\">x1&nbsp;+&nbsp;2x2&nbsp;=&nbsp;8</bdi> كلها."
    ],
    [
     "الحساب:<span class=\"ltr\">6 + 16 = 22</span><span class=\"ltr\">24 + 16 = 40</span>الاتنين متحققين (دي الـ corner C).",
     "الـ <bdi dir=\"ltr\">(10,&nbsp;0)</bdi> feasible، لأن <bdi dir=\"ltr\">10&nbsp;≤&nbsp;22</bdi> و <bdi dir=\"ltr\">4(10)&nbsp;=&nbsp;40&nbsp;≤&nbsp;40</bdi> (ده الـ corner B على الحدود).",
     "صح. الـ <bdi dir=\"ltr\">(8,&nbsp;8)</bdi> بتدي:<span class=\"ltr\">x1 + 2x2 = 8 + 16 = 24 &gt; 22</span>وكمان:<span class=\"ltr\">4(8) + 2(8) = 48 &gt; 40</span>فبتكسر الـ constraints وواقعة برّه الـ feasible region <bdi dir=\"ltr\">(L2)</bdi>.",
     "الـ <bdi dir=\"ltr\">(0,&nbsp;11)</bdi> feasible:<span class=\"ltr\">0 + 22 = 22 ≤ 22</span>وكمان:<span class=\"ltr\">0 + 22 = 22 ≤ 40</span>(ده الـ corner D)."
    ],
    [
     "صح. في الـ minimization اختار أصغر قيمة corner (النقطة <bdi dir=\"ltr\">B(1.5,&nbsp;4)</bdi> في مثال السكشن).",
     "الـ 70 دي أكبر قيمة بين الـ corners؛ دي اللي كنا هنختارها في مسألة MAX، لكن الـ MIN بياخد الأصغر، 52.",
     "الـ 56 أصغر من 70 بس أكبر من 52؛ ومسألة الـ MIN بتاخد أصغر قيمة corner، اللي هي 52.",
     "قيم الـ corners بتتقارن مش بتتجمع؛ الـ optimum هو corner واحد بس، الأحسن، وهنا هو الأصغر، 52."
    ]
   ]
  },
  "3": {
   "notes": [
    {
     "h": "ليه الـ simplex method؟ أهم التعريفات",
     "figH": {
      "or-simplex-terms": "كل مصطلح متعلّم عليه في الـ initial tableau بتاع المحاضرة"
     }
    },
    {
     "h": "خطوات الـ Simplex (مسألة max، وكل الـ constraints ≤)",
     "pts": [
      "الـ <b>Step 1</b>: حوّل الـ inequalities لـ equations باستخدام الـ slack variables، واكتب الـ objective على شكل:<span class=\"ltr\">Z − c1x1 − c2x2 − ... = 0</span>",
      "الـ <b>Step 2</b>: اعمل الـ initial simplex tableau وحدد الـ basic variables (الـ slacks و Z).",
      "الـ <b>Step 3</b>: اختار الـ <b>pivot column</b>: أكتر رقم سالب في الصف الأخير (من غير آخر عمود). لو فيه تعادل: اختار أي واحد.",
      "الـ <b>Step 4</b>: اختار الـ <b>pivot row</b>: اقسم كل RHS على الرقم <b>الموجب</b> اللي قصاده في الـ pivot column؛ و<b>أصغر ratio موجبة</b> هي اللي بتكسب. لو فيه تعادل: اختار أي واحد. لو مفيش ولا رقم موجب في الـ pivot column، يبقى البرنامج <b>ملوش (bounded) solution</b>. وصف الـ Z عمره ما بياخد ratio.",
      "الـ <b>Step 5</b>: الـ pivot element هو اللي عند تقاطعهم (ولازم يبقى موجب).",
      "الـ <b>Step 6</b>: استخدم الـ elementary row operations: اقسم الـ pivot row على الـ pivot عشان الـ pivot يبقى 1، وبعدين خلّي كل رقم تاني في الـ pivot column يبقى 0. الـ entering variable بياخد مكان الـ exiting variable في عمود الـ basis.",
      "الـ <b>Step 7</b>: كرر لحد ما <b>مايبقاش فيه أرقام سالبة في الصف الأخير</b> (من غير آخر عمود). وبعدين اقرا الحل: الـ basic variables بتساوي الـ RHS، والـ <bdi dir=\"ltr\">non-basic</bdi> بتساوي 0، والـ Z بتساوي الرقم اللي تحت خالص على اليمين.",
      "تأثير الـ pivot الواحد: الـ non-basic variable اللي داخل بيبقى basic، والـ basic variable اللي خارج بيبقى non-basic، و Z بيزيد (أو في حالات بيفضل زي ما هو)."
     ],
     "figH": {
      "or-simplex-slack": "الـ slack variables هي ساعات المكنة اللي مش مستخدمة: حرّك الـ x1 والـ x2 وشوف الـ s1 والـ s2",
      "or-simplex-loop": "الخطوات السبعة كـ loop، ماشيين بيها على مثال المحاضرة",
      "or-simplex-corner-move": "الـ pivot الواحد بينقل الحل من الـ corner اللي عند <bdi dir=\"ltr\">(0,&nbsp;0)</bdi> للي عند <bdi dir=\"ltr\">(4,&nbsp;0)</bdi>، فالـ x1 بيدخل والـ s1 بيخرج والـ Z بيزيد من 0 لـ 12"
     }
    },
    {
     "h": "معادلات الـ row operations (طريقة المحاضرة واختصار السكشن)",
     "figH": {
      "or-simplex-rectangle": "دوس على أي رقم وشوف قيمته الجديدة باختصار المستطيل"
     }
    },
    {
     "h": "مثال المحاضرة (الـ initial tableau):<span class=\"ltr\">Max Z = 3x1 + x2</span><span class=\"ltr\">2x1 + x2 ≤ 8</span><span class=\"ltr\">2x1 + 3x2 ≤ 12</span>",
     "figH": {
      "or-simplex-pivot-pick": "الـ slide رقم 13: الـ pivot column وبعده الـ ratios والـ pivot row والـ pivot element"
     }
    },
    {
     "h": "مثال المحاضرة بعد pivot واحد (optimal)",
     "figH": {
      "or-simplex-read": "إزاي نقرا الـ optimal tableau: الـ basic قيمته من الـ b، والـ non-basic بصفر، والـ Z تحت على اليمين"
     }
    },
    {
     "h": "خطوات حل الـ pivot بتاع المحاضرة",
     "figH": {
      "or-simplex-lecture-run": "الـ pivot بتاع المحاضرة صف صف، والـ tableau الجديد بيتملا"
     }
    },
    {
     "h": "مثال الـ Revision:<span class=\"ltr\">Max Z = 8x1 + 5x2</span><span class=\"ltr\">x1 + 4x2 ≤ 4</span><span class=\"ltr\">3x1 + 5x2 ≤ 24</span>",
     "figH": {
      "or-simplex-revision-run": "مثال الـ revision خطوة خطوة: الـ x1 بيدخل والـ s1 بيخرج والـ Z بتطلع 32"
     }
    },
    {
     "h": "مثال الـ Revision: إجابات الـ MCQs",
     "pts": [
      "الـ Pivot column هو x1 (أكتر سالب <bdi dir=\"ltr\">−8</bdi>)؛ الـ ratios هي <bdi dir=\"ltr\">4/1&nbsp;=&nbsp;4</bdi> و <bdi dir=\"ltr\">24/3&nbsp;=&nbsp;8</bdi>، فالـ pivot row هو s1؛ <b>الـ pivot element هو 1</b>؛ الداخل x1 والخارج s1.",
      "بعد pivot واحد:<span class=\"ltr\">x1 = 4, s2 = 12, Z = 32</span>كل أرقام صف الـ Z قيمتها <bdi dir=\"ltr\">≥&nbsp;0</bdi>، يبقى ده optimal: <bdi dir=\"ltr\">Z&nbsp;=&nbsp;32</bdi> عند <bdi dir=\"ltr\">x1&nbsp;=&nbsp;4</bdi> و <bdi dir=\"ltr\">x2&nbsp;=&nbsp;0</bdi>.",
      "تشييك باختصار السكشن: الـ x2 في صف s2:<span class=\"ltr\">5 − (4 × 3)/1 = −7</span>الـ RHS بتاع s2:<span class=\"ltr\">24 − (4 × 3)/1 = 12</span>الـ Z تحت x2:<span class=\"ltr\">−5 − (4 × (−8))/1 = 27</span>"
     ]
    },
    {
     "h": "نتايج الـ tableaux اللي في الامتحانات (متراجعة)",
     "figH": {
      "or-simplex-sim": "محاكي الـ simplex: أي tableau من الامتحانات أو مسألتك إنت، pivot ورا pivot"
     }
    },
    {
     "h": "الـ Duality (جت مرة واحدة، <bdi dir=\"ltr\">Final&nbsp;2021/22</bdi>)",
     "pts": [
      "كل LP (اسمه الـ <b>primal</b>) ليه <b>dual</b>. لو الـ primal مسألة MAX في الـ canonical form (كله ≤): الـ dual بيبقى مسألة MIN؛ كل constraint في الـ primal بيدّي dual variable واحد yi؛ قيم الـ RHS بتبقى معاملات الـ dual objective؛ ومعاملات الـ objective بتبقى الـ dual RHS؛ والـ coefficient matrix بتتعملها transpose؛ والـ dual constraints بتبقى ≥.",
      "قواعد الإشارة (primal max):<span class=\"ltr\">constraint ≤ → yi ≥ 0</span><span class=\"ltr\">constraint ≥ → yi ≤ 0</span>(أو اضربه في <bdi dir=\"ltr\">−1</bdi> الأول)؛ ولو الـ constraint من نوع = يبقى <bdi dir=\"ltr\">yi</bdi> <b>unrestricted</b> في الإشارة. الـ primal variable <bdi dir=\"ltr\">xj&nbsp;≥&nbsp;0</bdi> ← الـ dual constraint رقم j بيبقى ≥.",
      "عند الـ optimum، الـ Z بتاع الـ primal بيساوي الـ W بتاع الـ dual (strong duality). الموضوع ده مش في الـ slides بتاعة <bdi dir=\"ltr\">2024</bdi>؛ ده كلام كتب معروف."
     ],
     "figH": {
      "or-simplex-dual": "بناء الـ dual بتاع مسألة الـ Final <bdi dir=\"ltr\">2021/22</bdi> خطوة خطوة"
     }
    }
   ],
   "cards": [
    "بتمشي من basic feasible solution لـ basic feasible solution تانية، وبتزوّد (أو بتقلل) Z باستمرار لحد ما توصل للـ optimality.",
    "لما يبقى فيه decision variables أكتر و constraints أكتر.",
    "بيتضاف لـ constraint ≤ عشان يبقى equation؛ بيمثل الـ resource اللي مااستخدمتش.",
    "أكتر رقم سالب في الصف الأخير (صف Z)، من غير الـ RHS.",
    "أصغر ratio موجبة: RHS ÷ الرقم الموجب في الـ pivot column.",
    "تقاطع الـ pivot column مع الـ pivot row؛ ولازم يبقى موجب.",
    "الـ variable بتاع الـ pivot column.",
    "الـ basic variable بتاع الـ pivot row.",
    "مفيش أرقام سالبة في الصف الأخير (من غير آخر عمود).",
    "البرنامج ملوش (bounded) solution.",
    "الـ slack variables (والـ decision variables بتبدأ <bdi dir=\"ltr\">non-basic</bdi> بقيمة 0).",
    "الـ Z بيزيد، أو في حالات بيفضل زي ما هو.",
    "الجديد = القديم − (رقم الـ pivot-row × رقم الـ pivot-column) ÷ الـ pivot.",
    "بنكتب:<span class=\"ltr\">Z − 3x1 − x2 = 0</span>لـ <bdi dir=\"ltr\">Max&nbsp;Z&nbsp;=&nbsp;3x1&nbsp;+&nbsp;x2</bdi> (المعاملات بتبقى سالبة).",
    "يعني Unrestricted في الإشارة.",
    "القيمة <bdi dir=\"ltr\">Z&nbsp;=&nbsp;12</bdi> عند <bdi dir=\"ltr\">x1&nbsp;=&nbsp;4</bdi> و <bdi dir=\"ltr\">x2&nbsp;=&nbsp;0</bdi> بعد pivot واحد."
   ],
   "qa": [
    "الـ simplex method بتمشي من basic feasible solution لواحدة تانية بحيث تزوّد (أو تقلل) الـ objective function باستمرار لحد ما توصل للـ optimality. بتستخدم لما يبقى فيه decision variables أكتر و constraints أكتر؛ لكن الـ graphical method بتشتغل بس مع 2 variables وconstraints قليلة.",
    "الـ Slack variable هو variable غير سالب بيتضاف لـ constraint ≤ عشان يبقى equation (بيمثل الـ resource اللي مااستخدمتش). الـ Basic variables هي اللي في عمود الـ basis في الـ tableau، وقيمتها من الـ RHS. الـ <bdi dir=\"ltr\">Non-basic</bdi> variables هي كل الباقي، وقيمتهم صفر.",
    "الـ Pivot column: العمود اللي فيه أكتر رقم سالب في الصف الأخير (الـ entering variable). الـ Pivot row: الصف اللي فيه أصغر ratio موجبة RHS ÷ الرقم الموجب في الـ pivot column (الـ exiting variable). الـ Pivot element: تقاطعهم؛ لازم يبقى موجب، وبنخليه 1 بالـ row operations.",
    "أولاً، دوّر على أكتر رقم سالب في الصف الأخير (من غير آخر عمود): ده الـ pivot column. تانيًا، اعمل ratios بإنك تقسم الـ RHS على الأرقام الموجبة في الـ pivot column؛ الأصغر بتحدد الـ pivot؛ ولو مفيش أرقام موجبة يبقى مفيش solution. تالتًا، استخدم الـ row operations عشان الـ pivot يبقى 1 وكل باقي أرقام الـ pivot column تبقى 0. رابعًا، كرر لحد ما مايفضلش أرقام سالبة في الصف الأخير.",
    "المعادلات:<span class=\"ltr\">2x1 + x2 + s1 = 8</span><span class=\"ltr\">2x1 + 3x2 + s2 = 12</span><span class=\"ltr\">Z − 3x1 − x2 = 0</span>الـ Pivot column هو x1 (<bdi dir=\"ltr\">−3</bdi>)؛ الـ ratios هي 4 و 6، فالـ pivot هو 2 في صف s1. صف x1 الجديد:<span class=\"ltr\">(1, 1/2, 1/2, 0 | 4)</span>صف s2:<span class=\"ltr\">(0, 2, −1, 1 | 4)</span>صف Z:<span class=\"ltr\">(0, 1/2, 3/2, 0 | 12)</span>مفيش سوالب، يبقى optimal: <bdi dir=\"ltr\">Z&nbsp;=&nbsp;12</bdi> عند <bdi dir=\"ltr\">x1&nbsp;=&nbsp;4</bdi> و <bdi dir=\"ltr\">x2&nbsp;=&nbsp;0</bdi>.",
    "الـ non-basic variable الداخل بيبقى basic، والـ basic variable الخارج بيبقى non-basic، وقيمة الـ objective function بتزيد أو في حالات بتفضل زي ما هي.",
    "اكتب الـ constraint اللي ≥ على شكل:<span class=\"ltr\">−2x1 − 5x2 ≤ −20</span>الـ Dual variables هي <bdi dir=\"ltr\">y1&nbsp;≥&nbsp;0</bdi> و <bdi dir=\"ltr\">y2&nbsp;≥&nbsp;0</bdi> و <bdi dir=\"ltr\">y3</bdi> unrestricted (عشان الـ equality). والـ dual:<span class=\"ltr\">Min W = 56y1 − 20y2 + 40y3</span>بشرط (s.t.):<span class=\"ltr\">4y1 − 2y2 + 5y3 ≥ 12</span><span class=\"ltr\">7y1 − 5y2 + 4y3 ≥ 4</span>تشييك: الـ optimum في الاتنين:<span class=\"ltr\">1520/17 ≈ 89.41</span>"
   ],
   "quiz": [
    [
     "الـ graphical method محدودة بـ 2 variables و constraints قليلة.",
     "صح. الـ simplex method طريقة algebraic وiterative، فبتقدر تتعامل مع decision variables وconstraints كتير، على عكس الـ graphical method اللي محدودة بـ two variables بس (L3, Simplex method).",
     "الـ activity مصطلح من الـ project scheduling (مهمة بتاخد وقت وresources في الـ <bdi dir=\"ltr\">CPM/PERT</bdi> network، من L7)، مش طريقة حل.",
     "الـ northwest corner method بتطلّع بس starting allocation لمسألة الـ transportation (L4)؛ مش طريقة عامة لحل الـ LP."
    ],
    [
     "الـ pivot operation هي عملية الـ row operations نفسها.",
     "صح. ده تعريف الـ pivot (الـ pivot element).",
     "الـ 'pivot solution' مش مصطلح موجود في المحاضرة؛ الرقم اللي عند تقاطع الـ pivot column مع الـ pivot row اسمه الـ pivot (الـ pivot element).",
     "الـ exiting variable هو الـ basic variable بتاع الـ pivot row."
    ],
    [
     "اللي عند التقاطع هو الـ pivot <b>element</b>، مش الـ pivot operation.",
     "صح. الـ pivot element هو اللي عند التقاطع؛ والـ pivot operation هي عملية الـ row reduction."
    ],
    [
     "الـ exiting variable هو الـ basic variable بتاع الـ pivot row.",
     "صح. الـ <b>pivot element</b> هو اللي عند التقاطع."
    ],
    [
     "شحن commodity من sources لـ destinations ده تعريف الـ transportation problem (L4)، مش الـ simplex method.",
     "صح. شحن سلعة بين sources وdestinations ده تعريف الـ transportation problem."
    ],
    [
     "الـ optimization لـ multistage decision problem ده تعريف الـ dynamic programming (L9)؛ إنما الـ simplex بيتنقل بين الـ basic feasible solutions بتاعة الـ LP.",
     "صح. الـ optimization للـ multistage decisions هي dynamic programming."
    ],
    [
     "صح. الـ simplex بيبدأ من basic feasible solution ويتنقل لغيرها بحيث الـ Z تفضل تزيد (أو تقل) لحد ما نوصل للـ optimality <bdi dir=\"ltr\">(L3,&nbsp;Definitions)</bdi>؛ وفي توصيل <bdi dir=\"ltr\">2023/24</bdi> الإجابة <bdi dir=\"ltr\">2&nbsp;→&nbsp;F</bdi>.",
     "إنك تبدأ الـ allocation من الخانة اللي فوق على الشمال ده الـ northwest corner method بتاع الـ transportation problem (L4).",
     "النقط اللي برا الـ feasible region دي الـ infeasible solutions (L2, graphical method)، مالهاش علاقة بالـ simplex method.",
     "لما تشيل كل الـ integer constraints من الـ IP بيطلع الـ LP relaxation (L6, Branch and Bound)، مش الـ simplex method."
    ],
    [
     "صح. الـ Pivot column هو x1 (<bdi dir=\"ltr\">−8</bdi>)؛ الـ ratios هي <bdi dir=\"ltr\">4/1&nbsp;=&nbsp;4</bdi> و <bdi dir=\"ltr\">24/3&nbsp;=&nbsp;8</bdi>، يبقى صف s1.",
     "الـ 3 موجود في الـ pivot column بس في صف s2، والـ ratio بتاعه <bdi dir=\"ltr\">24/3&nbsp;=&nbsp;8</bdi> أكبر من <bdi dir=\"ltr\">4/1&nbsp;=&nbsp;4</bdi>؛ وأصغر ratio بيختار صف s1.",
     "الـ 4 في عمود x2، وده مش الـ pivot column.",
     "فيه pivot فعلًا: العمود x1 (أكتر رقم سالب <bdi dir=\"ltr\">−8</bdi>)، وأصغر ratio هو <bdi dir=\"ltr\">4/1</bdi> في صف s1، يبقى الـ pivot element هو 1."
    ],
    [
     "صح. أكتر رقم سالب في صف Z هو <bdi dir=\"ltr\">−8</bdi> وهو تحت x1.",
     "الـ x2 قصاده <bdi dir=\"ltr\">−5</bdi> في صف Z، وده أقل سلبية من <bdi dir=\"ltr\">−8</bdi>؛ والـ entering variable بياخد أكتر رقم سالب في صف Z، يعني x1.",
     "الـ s1 دلوقتي basic وهو اللي هيخرج من الـ basis (أصغر <bdi dir=\"ltr\">ratio&nbsp;=&nbsp;4</bdi>)؛ إنما الـ entering variable بيتحدد من صف Z، يعني x1.",
     "فيه رقم سالب (<bdi dir=\"ltr\">−8</bdi> تحت x1)، يعني الـ tableau لسه مش optimal والـ x1 هو اللي داخل؛ فـ 'None' غلط."
    ],
    [
     "الـ x1 هو الـ ENTERING variable (أكتر رقم سالب في صف Z، وهو <bdi dir=\"ltr\">−8</bdi>)؛ أما الـ exiting variable فهو الـ basic variable بتاع الـ pivot row.",
     "الـ x2 non-basic (قيمته 0 ومش موجود في عمود الـ basis)، فمينفعش يخرج؛ اللي بيخرج لازم يكون basic variable.",
     "صح. الـ exiting variable هو الـ basic variable بتاع الـ pivot row: الـ ratios هي <bdi dir=\"ltr\">4/1&nbsp;=&nbsp;4</bdi> (s1) و <bdi dir=\"ltr\">24/3&nbsp;=&nbsp;8</bdi> (s2)، والأصغر صف s1، يبقى s1 هو اللي خارج <bdi dir=\"ltr\">(L3,&nbsp;Step&nbsp;II)</bdi>.",
     "صف s1 هو اللي كسب الـ ratio test (<bdi dir=\"ltr\">4&nbsp;&lt;&nbsp;8</bdi>)، فالـ s1 هو اللي بيخرج؛ و<bdi dir=\"ltr\">'None'</bdi> غلط."
    ],
    [
     "الـ 4 دي قيمة x1 الجديدة (صف s1 ÷ الـ pivot 1)؛ إنما s2 بيتحدّث بـ s2 ناقص 3 × صف x1 الجديد:<span class=\"ltr\">24 − 12 = 12</span>",
     "الـ s2 مش هو اللي خارج من الـ basis (اللي خارج s1)، فبيفضل basic وقيمته:<span class=\"ltr\">24 − 3 × 4 = 12</span>مش 0.",
     "صح. صف x1 الجديد هو صف s1 ÷ 1:<span class=\"ltr\">(1, 4, 1, 0 | 4)</span>و s2 الجديد هو s2 القديم ناقص 3 × صف x1 الجديد، فالـ RHS بتاعه:<span class=\"ltr\">24 − 3 × 4 = 12</span>المصدر: <bdi dir=\"ltr\">(L3,&nbsp;pivot&nbsp;operation)</bdi>.",
     "الـ row operation بتدّي:<span class=\"ltr\">s2 = 24 − 3 × 4 = 12</span>وده موجود في الاختيارات، فـ <bdi dir=\"ltr\">'None'</bdi> غلط."
    ],
    [
     "الـ 4 دي قيمة x1 الجديدة، مش Z؛ الـ Z بيتحدّث بـ Z زائد 8 × صف x1 الجديد:<span class=\"ltr\">0 + 8 × 4 = 32</span>",
     "صح. صف Z الجديد هو Z القديم زائد:<span class=\"ltr\">8 × (1, 4, 1, 0 | 4)</span>يعني:<span class=\"ltr\">(0, 27, 8, 0 | 32)</span>ومفيش أرقام سالبة فاضلة، يبقى <bdi dir=\"ltr\">Z&nbsp;=&nbsp;32</bdi> هي الـ optimal <bdi dir=\"ltr\">(L3,&nbsp;pivot&nbsp;operation)</bdi>.",
     "الـ 12 دي قيمة s2 الجديدة (<bdi dir=\"ltr\">24&nbsp;−&nbsp;3&nbsp;×&nbsp;4</bdi>)؛ إنما الـ RHS بتاع Z بيبقى:<span class=\"ltr\">0 + 8 × 4 = 32</span>",
     "الـ pivot بيدّي:<span class=\"ltr\">Z = 0 + 8 × 4 = 32</span>وده اختيار B، فـ <bdi dir=\"ltr\">'None'</bdi> غلط."
    ],
    [
     "الـ 1 ده في صف s1، والـ ratio بتاعه <bdi dir=\"ltr\">20/1&nbsp;=&nbsp;20</bdi> أكبر من <bdi dir=\"ltr\">35/2&nbsp;=&nbsp;17.5</bdi>؛ وأصغر ratio بيختار صف s2 والـ pivot 2.",
     "صح. الـ Pivot column هو x1؛ الـ ratios هي <bdi dir=\"ltr\">20/1&nbsp;=&nbsp;20</bdi> و <bdi dir=\"ltr\">35/2&nbsp;=&nbsp;17.5</bdi>، والـ <bdi dir=\"ltr\">−3</bdi> بنتخطاه. الأصغر هو صف s2.",
     "الـ <bdi dir=\"ltr\">−3</bdi> سالب، والـ ratio test بيستخدم بس الأرقام الموجبة في الـ pivot column، فالـ <bdi dir=\"ltr\">−3</bdi> عمره ما يبقى pivot.",
     "فيه pivot صحيح: العمود x1 (<bdi dir=\"ltr\">−5</bdi>)، وأصغر ratio موجبة <bdi dir=\"ltr\">35/2&nbsp;=&nbsp;17.5</bdi> في صف s2، يبقى الـ pivot هو 2."
    ],
    [
     "صح. الحساب هو Z زائد 5 × الصف الجديد:<span class=\"ltr\">(1, 0.5, 0, 0.5, 0 | 17.5)</span>",
     "ده مش ناتج من أي row operation صح هنا.",
     "الصف:<span class=\"ltr\">(0, 1, 5, 0, 0 | 100)</span>ده:<span class=\"ltr\">Z + 5 × (1, 1, 1, 0, 0 | 20)</span>يعني كأنك عملت pivot على صف s1، بس s2 هو اللي الـ ratio بتاعه أصغر (<bdi dir=\"ltr\">17.5&nbsp;&lt;&nbsp;20</bdi>).",
     "اختيار A، يعني:<span class=\"ltr\">Z + 5 × (1, 0.5, 0, 0.5, 0 | 17.5)</span><span class=\"ltr\">= (0, −1.5, 0, 2.5, 0 | 87.5)</span>هو الصف الصح، فـ <bdi dir=\"ltr\">'None'</bdi> غلط."
    ],
    [
     "ده صف s3 مقسوم على +3. بعد الـ pivot، كل صف غير الـ pivot row لازم يبقى فيه 0 تحت الـ pivot column x1؛ والصف ده لسه فيه <bdi dir=\"ltr\">−1</bdi> هناك.",
     "الصف ده سايب <bdi dir=\"ltr\">−3</bdi> تحت x1، بس بعد الـ pivot كل صف غير الـ pivot row لازم يبقى فيه 0 في الـ pivot column؛ وجمع s3 على 3 × الـ pivot row الجديد بيدّي 0.",
     "ده صف s3 مقسوم على <bdi dir=\"ltr\">−3</bdi>، ودي مش خطوة من خطوات الـ pivot (اللي بيتقسم هو الـ pivot row بس)؛ وكمان سايب 1 تحت x1 بدل 0.",
     "صح. جمع s3 على 3 × الـ pivot row الجديد بيدّي:<span class=\"ltr\">(0, 2.5, 0, 1.5, 1 | 64.5)</span>ودي مش موجودة في الاختيارات."
    ],
    [
     "الـ pivot row الجديد لازم يبقى فيه 1 تحت الـ entering variable x1 (هو صف s2 ÷ 2)؛ والصف ده فيه 0 هناك، فده مش الصف التاني.",
     "ده صف s2 القديم من غير أي تغيير؛ الـ pivot row لازم يتقسم على الـ pivot 2 عشان الـ x1 ياخد coefficient بيساوي 1.",
     "صح. الـ pivot row بيتقسم على الـ pivot:<span class=\"ltr\">(2, 1, 0, 1, 0 | 35) ÷ 2</span><span class=\"ltr\">= (1, 0.5, 0, 0.5, 0 | 17.5)</span>والـ x1 بياخد مكان s2 كـ basic variable <bdi dir=\"ltr\">(L3,&nbsp;Step&nbsp;III)</bdi>.",
     "اختيار C، يعني صف s2 ÷ 2:<span class=\"ltr\">(1, 0.5, 0, 0.5, 0 | 17.5)</span>هو الصف الجديد الصح، فـ <bdi dir=\"ltr\">'None'</bdi> غلط."
    ],
    [
     "الـ ratio <bdi dir=\"ltr\">7&nbsp;÷&nbsp;(1/5)&nbsp;=&nbsp;35</bdi> هي الأكبر، مش الأصغر.",
     "صح. الـ Pivot column هو x1؛ الـ ratios:<span class=\"ltr\">3.75, 2.86, 35</span>فالـ pivot element هو <bdi dir=\"ltr\">7/5</bdi> في صف s2."
    ],
    [
     "الأرقام صح بس الـ basic variable غلط.",
     "صح (زي نموذج الطلبة). الأرقام دي هي الـ pivot row الجديد، بس x1 دخل و s2 خرج، فالصف لازم يتكتب عليه x1 مش s2."
    ],
    [
     "الـ pivot هو <bdi dir=\"ltr\">7/5</bdi> (صف s2)؛ والصف الجديد:<span class=\"ltr\">(1, 0, 0, 5/7, −3/7 | 20/7)</span>و Z زائد <bdi dir=\"ltr\">(22/5)</bdi> × الصف ده بيدّي:<span class=\"ltr\">(0, 0, 0, 22/7, −2/7 | 480/7 ≈ 68.57)</span>مش الصف المكتوب.",
     "صح. صف Z الجديد هو:<span class=\"ltr\">(0, 0, 0, 22/7, −2/7 | 480/7 ≈ 68.57)</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">1/2</bdi> موجود في الـ pivot column x2، بس صفه بيدّي <bdi dir=\"ltr\">30&nbsp;÷&nbsp;1/2&nbsp;=&nbsp;60</bdi>، وده أكبر من <bdi dir=\"ltr\">50&nbsp;÷&nbsp;5/2&nbsp;=&nbsp;20</bdi>؛ فالـ pivot هو <bdi dir=\"ltr\">5/2</bdi> في صف s1.",
     "صح. الـ Pivot column هو x2؛ الـ ratios:<span class=\"ltr\">50 ÷ 5/2 = 20</span><span class=\"ltr\">30 ÷ 1/2 = 60</span><span class=\"ltr\">160 ÷ 1 = 160</span>فالـ pivot هو <bdi dir=\"ltr\">5/2</bdi> في صف s1."
    ],
    [
     "صح. صف x2 الجديد:<span class=\"ltr\">(0, 1, 2/5, −1/3, 0 | 20)</span>و s3 ناقص 1 × الصف ده:<span class=\"ltr\">(0, 0, −2/5, −1, 1 | 140)</span>",
     "اختيار False غلط: صف x2 الجديد هو s1 مقسوم على <bdi dir=\"ltr\">5/2</bdi>، يعني:<span class=\"ltr\">(0, 1, 2/5, −1/3, 0 | 20)</span>و s3 ناقص 1 × الصف ده بيطلع بالظبط:<span class=\"ltr\">(0, 0, −2/5, −1, 1 | 140)</span>"
    ],
    [
     "صح. الحساب:<span class=\"ltr\">Z + (3/2) × (0, 1, 2/5, −1/3, 0 | 20)</span><span class=\"ltr\">= (0, 0, 3/5, 1/3, 0 | 180)</span>وده optimal.",
     "اختيار False غلط:<span class=\"ltr\">Z + (3/2) × (0, 1, 2/5, −1/3, 0 | 20)</span>بيدّي:<span class=\"ltr\">(0, 0, 3/5, 1/3, 0 | 150 + 30 = 180)</span>وده الصف المكتوب بالظبط."
    ],
    [
     "الصف الأول هو الـ pivot row؛ وبيبقى:<span class=\"ltr\">x2 (0, 1, 2/5, −1/3, 0 | 20)</span>",
     "صح. الصف الأول بيبقى:<span class=\"ltr\">x2 | 0, 1, 2/5, −1/3, 0 | 20</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">−20</bdi> في صف Z؛ والـ pivot عمره ما بيبقى في صف Z ولا بيبقى سالب.",
     "صح. الـ Pivot column هو x2؛ الـ ratios:<span class=\"ltr\">3 ÷ 1/2 = 6</span><span class=\"ltr\">5 ÷ 3/2 = 3.33</span>فالـ pivot هو <bdi dir=\"ltr\">3/2</bdi>."
    ],
    [
     "صح. صف s2 ÷ <bdi dir=\"ltr\">3/2</bdi> بيدّي:<span class=\"ltr\">(0, 1, −5/3, 2/3 | 10/3)</span>ومكتوب عليه x2.",
     "اختيار False غلط: الـ pivot هو <bdi dir=\"ltr\">3/2</bdi> (الـ ratio <bdi dir=\"ltr\">5&nbsp;÷&nbsp;3/2&nbsp;=&nbsp;3.33</bdi> أصغر من <bdi dir=\"ltr\">3&nbsp;÷&nbsp;1/2&nbsp;=&nbsp;6</bdi>)، و s2 ÷ <bdi dir=\"ltr\">3/2</bdi> بيدّي:<span class=\"ltr\">(0, 1, −5/3, 2/3 | 10/3)</span><span class=\"ltr\">= (0, 1, −1.67, 0.67 | 3.33)</span>"
    ],
    [
     "صح. Z زائد 20 × صف x2 الجديد:<span class=\"ltr\">(0, 0, 80/3, 40/3 | 1280/3)</span>",
     "اختيار False غلط:<span class=\"ltr\">Z + 20 × (0, 1, −5/3, 2/3 | 10/3)</span><span class=\"ltr\">= (0, 0, 60 − 33.3, 13.3 | 360 + 66.7)</span><span class=\"ltr\">= (0, 0, 26.7, 13.3 | 426.7)</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">−6</bdi> رقم من صف Z؛ أرقام صف Z بتختار الـ pivot column بس عمرها ما بتبقى pivots. الـ pivot هو 5 (العمود x1، والـ ratio <bdi dir=\"ltr\">20/5&nbsp;=&nbsp;4</bdi> أصغر من <bdi dir=\"ltr\">28/4&nbsp;=&nbsp;7</bdi>).",
     "صح. الـ Pivot column هو x1 (<bdi dir=\"ltr\">−7</bdi>)؛ الـ ratios <bdi dir=\"ltr\">20/5&nbsp;=&nbsp;4</bdi> و <bdi dir=\"ltr\">28/4&nbsp;=&nbsp;7</bdi>، فالـ pivot هو 5."
    ],
    [
     "الرقم اللي تحت s2 والـ RHS غلط: الـ s2 قيمته 0 في الـ pivot row (<bdi dir=\"ltr\">non-basic</bdi>)، فالحساب:<span class=\"ltr\">Z + 7 × (1, 0.4, 0.2, 0 | 4)</span>بيسيب <bdi dir=\"ltr\">s2&nbsp;=&nbsp;0</bdi> والـ RHS بيطلع 28.",
     "صح.<span class=\"ltr\">Z + 7 × (1, 0.4, 0.2, 0 | 4)</span><span class=\"ltr\">= (0, −3.2, 1.4, 0 | 28)</span>"
    ],
    [
     "صح.<span class=\"ltr\">0 + 7 × 4 = 28</span>(الـ Z لسه مش optimal: لسه فيه <bdi dir=\"ltr\">−3.2</bdi>؛ والـ optimum النهائي <bdi dir=\"ltr\">316/9&nbsp;≈&nbsp;35.1</bdi>.)",
     "اختيار False غلط: الـ pivot 5 بيدّي صف x1 الجديد:<span class=\"ltr\">(1, 0.4, 0.2, 0 | 4)</span>والـ RHS بتاع Z بيبقى:<span class=\"ltr\">0 + 7 × 4 = 28</span>(لسه مش optimal، بس <bdi dir=\"ltr\">Z&nbsp;=&nbsp;28</bdi>)."
    ]
   ],
   "extra": [
    [
     "الصيغة:<span class=\"ltr\">Z − 5x1 − 4x2 = 0</span>بتدّي معاملات سالبة.",
     "صح. لما بتنقل حدود الـ objective للشمال بتبقى سالبة.",
     "الـ slack variables الـ coefficients بتاعتهم في الـ objective صفر، فقيمتهم في صف Z بتبقى 0 مش 1:<span class=\"ltr\">Z − 5x1 − 4x2 + 0s1 + 0s2 = 0</span>",
     "الـ <bdi dir=\"ltr\">(1,&nbsp;1,&nbsp;0,&nbsp;0&nbsp;|&nbsp;5)</bdi> ده (تقريبًا) صف أول constraint:<span class=\"ltr\">x1 + x2 + s1 = 5</span>مش صف الـ objective."
    ],
    [
     "صف s1 مش هو اللي بيتختار: الـ ratio بتاعه <bdi dir=\"ltr\">5/1&nbsp;=&nbsp;5</bdi> أكبر من <bdi dir=\"ltr\">8/2&nbsp;=&nbsp;4</bdi> بتاع صف s2، وأصغر ratio هو اللي بيكسب.",
     "الـ <bdi dir=\"ltr\">−5</bdi> رقم من صف Z؛ هو اللي بيختار الـ pivot column x1 بس عمره ما بيبقى هو الـ pivot، اللي لازم يبقى رقم موجب في صف constraint.",
     "الـ Z entry بتاع x2 هو <bdi dir=\"ltr\">−4</bdi>، وده أقل سلبية من <bdi dir=\"ltr\">−5</bdi> بتاع x1، فالـ x2 مش الـ pivot column في أول iteration.",
     "صح. الـ Pivot column هو x1؛ الـ ratios 5 و 4 ← صف s2."
    ],
    [
     "صح. <bdi dir=\"ltr\">x1&nbsp;=&nbsp;4</bdi>، يبقى:<span class=\"ltr\">Z = 5 × 4 = 20</span>وصف Z بيبقى:<span class=\"ltr\">0, −1.5, 0, 2.5 | 20</span>",
     "الـ 23 ده الـ optimum النهائي بعد pivot تاني.",
     "الـ 8 ده الـ RHS القديم بتاع تاني constraint؛ بعد الـ pivot:<span class=\"ltr\">x1 = 8/2 = 4</span><span class=\"ltr\">Z = 0 + 5 × 4 = 20</span>",
     "الـ 4 دي قيمة x1 الجديدة (<bdi dir=\"ltr\">8&nbsp;÷&nbsp;2</bdi>)، مش Z؛ الـ Z بتبقى <bdi dir=\"ltr\">5&nbsp;×&nbsp;4&nbsp;=&nbsp;20</bdi>."
    ],
    [
     "الأرقام الصفر والسالبة في الـ pivot column بنتخطاها في الـ ratio test؛ القسمة عليها بتدّي ratios مالهاش معنى أو سالبة.",
     "بنختار أصغر ratio موجبة (SMALLEST)؛ لو اخترت واحدة أكبر هتخلي basic variable تاني يبقى سالب (infeasible).",
     "صح. الـ ratio test بيقسم كل RHS على الأرقام الموجبة بس في الـ pivot column وياخد أصغر ratio؛ والصف ده هو الـ pivot row (L3, Step II).",
     "صف Z وظيفته بس إنه يختار الـ pivot column؛ عمره ما بيدخل في الـ ratio test."
    ],
    [
     "الـ 2 ده عدد الـ decision variables؛ الـ slacks بتتعد على الـ constraints، واحد لكل ≤ constraint، فمحتاجين تلاتة.",
     "صح. بنضيف slack variable واحد لكل ≤ constraint عشان يحوّلها لـ equation (وهو الـ resource اللي مش مستخدم)، فتلات ≤ constraints محتاجين s1, s2, s3 (L3, Step 1).",
     "ده إجمالي عدد الـ variables بعد ما ضفنا الـ slacks.",
     "الـ slack الواحد مينفعش يحوّل تلات inequalities لـ equations؛ كل ≤ constraint بياخد slack خاص بيه، فمحتاجين تلاتة."
    ],
    [
     "صح. ده الـ stopping rule بتاع Step IV: لما مفيش أرقام سالبة فاضلة في صف Z (من غير الـ RHS)، الـ Z مش هتتحسن أكتر والـ tableau يبقى optimal (L3).",
     "الـ Feasibility بتبان من إن قيم الـ RHS غير سالبة.",
     "الـ Unboundedness بتبان لما الـ pivot column مافيهوش ولا رقم موجب.",
     "الـ Degeneracy معناها basic variable قيمته صفر، ملهاش علاقة."
    ],
    [
     "الـ pivot لازم يبقى موجب؛ pivot سالب أو صفر هيخلي الـ basic variables سالبة، وعشان كده الـ ratio test بيتخطى الأرقام دي.",
     "الـ tableau مش optimal لأن لسه فيه رقم سالب في صف Z (العمود اللي اخترناه)؛ المشكلة إن مفيش أي صف بيحدّ المتغير ده.",
     "تبديل الصفوف مش بيغيّر حاجة في الـ pivot column؛ ولو مفيش رقم موجب يبقى مفيش ratio أصلًا، وده معناه إن الـ LP unbounded.",
     "صح. البرنامج ملوش (bounded) solution: يعني unbounded. ومن L3:<span class=\"ltr\">\"If no element in the work column is positive, the program has no solution\"</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">17&nbsp;=&nbsp;5&nbsp;+&nbsp;12</bdi> يعني جمعت حاصل الضرب؛ إنما الـ shortcut هو:<span class=\"ltr\">new = old − (pivot-row element × pivot-column element)/pivot</span><span class=\"ltr\">= 5 − 12 = −7</span>",
     "الأعمدة اللي فيها 0 في الـ pivot row بس هي اللي مابتتغيرش.",
     "صح.<span class=\"ltr\">5 − (4 × 3)/1 = −7</span>(مثال الـ revision، والـ x2 في صف s2).",
     "الـ 12 ده حاصل الضرب <bdi dir=\"ltr\">4&nbsp;×&nbsp;3</bdi> بس؛ لازم يتقسم على الـ pivot ويتطرح من الـ old element:<span class=\"ltr\">5 − 12/1 = −7</span>"
    ],
    [
     "لسه فيه <bdi dir=\"ltr\">−1.5</bdi> في صف Z بعد أول pivot، يبقى مش optimal.",
     "صح. تاني pivot: العمود x2، الـ ratios <bdi dir=\"ltr\">1/0.5&nbsp;=&nbsp;2</bdi> و <bdi dir=\"ltr\">4/0.5&nbsp;=&nbsp;8</bdi>، فالنتيجة:<span class=\"ltr\">x2 = 2, x1 = 3, Z = 23</span>(نفس الرسم).",
     "النقطة <bdi dir=\"ltr\">(0,&nbsp;5)</bdi> feasible بس بتدي <bdi dir=\"ltr\">Z&nbsp;=&nbsp;4&nbsp;×&nbsp;5&nbsp;=&nbsp;20</bdi>، أقل من 23. والـ simplex أصلاً مش بيعدّي عليها: الطريق بتاعه:<span class=\"ltr\">(0, 0) → (4, 0) → (3, 2)</span>وبيقف لما مايبقاش فيه أي قيمة سالبة في الـ Z row.",
     "النقطة <bdi dir=\"ltr\">(5,&nbsp;0)</bdi> infeasible:<span class=\"ltr\">2(5) = 10 &gt; 8</span>بتكسر تاني constraint، فمينفعش نوصل لـ <bdi dir=\"ltr\">Z&nbsp;=&nbsp;25</bdi>."
    ],
    [
     "صح. الـ RHS بقى costs، والأعمدة بقت صفوف، والـ ≤ بقت ≥.",
     "الـ dual بتاع مسألة max بيبقى مسألة min بـ ≥.",
     "دور معاملات الـ objective والـ RHS اتبدّل غلط.",
     "الـ matrix لازم تتعمل transpose عمود عمود: عمود x1 اللي هو (1, 1) بيدّي y1 + y2 ≥ 3."
    ]
   ]
  },
  "4": {
   "notes": [
    {
     "h": "الـ transportation problem",
     "pts": [
      "هي مسألة إنك تلاقي <b>أقل تكلفة لتوزيع (<bdi dir=\"ltr\">minimum-cost</bdi> distribution)</b> سلعة معينة من مجموعة <b>supply centers (sources)</b> <bdi dir=\"ltr\">i&nbsp;=&nbsp;1,&nbsp;...,&nbsp;m</bdi> لمجموعة <b>receiving centers (destinations)</b> <bdi dir=\"ltr\">j&nbsp;=&nbsp;1,&nbsp;...,&nbsp;n</bdi>. تعريف الـ revision: بتهتم بـ:<span class=\"ltr\"><b>shipping a commodity between a set of sources and a set of destinations</b></span>",
      "كل source عنده supply S<sub>i</sub>؛ وكل destination عنده demand D<sub>j</sub>؛ وتكلفة الشحن من source لـ destination <b>بتتناسب طرديًا مع عدد الوحدات اللي اتشحنت</b> (تكلفة الوحدة c<sub>ij</sub>، والكمية x<sub>ij</sub>).",
      "محتاج: أولاً <b>الـ capacity بتاع كل supply point</b> (الـ supply أو المخزون)، وتانيًا <b>الكمية المطلوبة عند كل demand point</b> (الـ demand)، وتالتًا <b>تكلفة نقل الوحدة</b> من كل supply point لكل demand point.",
      "شكل الـ Network: الـ sources على الشمال، والـ destinations على اليمين، وفيه arc (i, j) لكل route بتكلفة c<sub>ij</sub> و flow x<sub>ij</sub>.",
      "مسألة <b>Balanced</b>: إجمالي الـ supply بيساوي إجمالي الـ demand (كل أمثلة الكورس كده). لو مش كده، ضيف dummy source أو dummy destination تكاليفه صفر عشان ياخد الفرق (قاعدة الكتب).",
      "الـ basic feasible solution فيها <b><bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1</bdi></b> خانة متوزع فيها (مثلًا 3 sources × 4 destinations يبقى 6 خانات). طرق الـ initial BFS: الـ <b>Northwest corner rule</b>، والـ <b>Least cost (minimum cost) method</b>، والـ <b>Vogel's approximation method</b>."
     ],
     "figH": {
      "or-tp-network": "الـ network: الـ sources بالـ supply، والـ destinations بالـ demand، و arc لكل route عليه تكلفة وكمية",
      "or-tp-balance": "المسألة Balanced ولا لأ؟ الـ dummy بياخد الفرق، والـ BFS فيها خانات متوزع فيها عددها <bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1</bdi>"
     }
    },
    {
     "h": "بيانات المحاضرة (البسلة المعلبة، بالـ truckloads)"
    },
    {
     "h": "الـ Northwest corner rule",
     "pts": [
      "أول allocation بيتعمل في الخانة اللي في <b>الركن الشمال فوق (upper <bdi dir=\"ltr\">left-hand</bdi> corner)</b> من الـ tableau. حط <b>أكبر كمية ممكنة</b>، وهي <bdi dir=\"ltr\">min(supply,&nbsp;demand)</bdi>، اشطب الصف أو العمود اللي اتقفل، وبعدين اتحرك <b>يمين</b> (لو الصف لسه فيه supply) أو <b>تحت</b> (لو العمود لسه فيه demand). التكاليف مش بتفرق هنا خالص.",
      "في المحاضرة (بالترتيب):<span class=\"ltr\">C1W1 = 75 (C1 خلص)</span><span class=\"ltr\">→ C2W1 = 5 (W1 خلص)</span><span class=\"ltr\">→ C2W2 = 65</span><span class=\"ltr\">→ C2W3 = 55 (C2 خلص)</span><span class=\"ltr\">→ C3W3 = 15</span><span class=\"ltr\">→ C3W4 = 85</span>",
      "<b><span class=\"ltr\">Z = 464×75 + 352×5 + 216×65</span><span class=\"ltr\">+ 690×55 + 388×15 + 685×85</span><span class=\"ltr\">= $152,595</span></b>"
     ],
     "figH": {
      "or-tp-nwc": "الـ Northwest corner rule خانة خانة: الـ tableau بتاع المحاضرة لحد <bdi dir=\"ltr\">Z&nbsp;=&nbsp;$152,595</bdi>"
     }
    },
    {
     "h": "الـ Least cost (minimum cost) method",
     "pts": [
      "أول allocation بيتعمل في الخانة اللي فيها <b>أقل تكلفة</b> في الـ tableau كله؛ حط <bdi dir=\"ltr\">min(supply,&nbsp;demand)</bdi>، اشطب الصف/العمود اللي اتقفل، وكرر مع أقل تكلفة فاضلة.",
      "في المحاضرة (بالترتيب):<span class=\"ltr\">216 (C2W2) = 65</span><span class=\"ltr\">→ 352 (C2W1) = 60 (C2 خلص)</span><span class=\"ltr\">→ 388 (C3W3) = 70</span><span class=\"ltr\">→ 464 (C1W1) = 20 (W1 خلص)</span><span class=\"ltr\">→ 685 (C3W4) = 30 (C3 خلص)</span><span class=\"ltr\">→ 867 (C1W4) = 55</span>",
      "<b><span class=\"ltr\">Z = 464×20 + 867×55 + 352×60</span><span class=\"ltr\">+ 216×65 + 388×70 + 685×30</span><span class=\"ltr\">= $139,835</span></b>(أرخص من الـ NWC، وفي البيانات دي هو optimal أصلًا)."
     ],
     "figH": {
      "or-tp-lcm": "الـ Least cost method خانة خانة: دايمًا أرخص خانة مفتوحة، لحد <bdi dir=\"ltr\">Z&nbsp;=&nbsp;$139,835</bdi>"
     }
    },
    {
     "h": "الـ Vogel's approximation method (VAM)",
     "pts": [
      "<b>1.</b> الـ Penalty بتاع كل صف وعمود = <b>تاني أقل تكلفة − أقل تكلفة</b> في الصف/العمود ده (الخانات اللي مش متشطبة بس).",
      "<b>2.</b> اختار الصف أو العمود اللي ليه <b>أعلى penalty</b> (التعادل: اختار أي واحد أو اللي فيه الخانة الأرخص).",
      "<b>3.</b> حط أكبر كمية ممكنة في <b>أرخص خانة feasible</b> في الصف أو العمود ده.",
      "<b>4.</b> اشطب الصف/العمود اللي اتقفل، احسب الـ penalties تاني، وكرر لحد ما كل الـ rim requirements (الـ supply والـ demand) تتحقق.",
      "تكة طلبة: \"أصغر، أكبر، أصغر\": أصغر تكلفتين ← أكبر penalty ← أرخص خانة. الـ VAM غالبًا بيدّي أحسن starting solution من التلاتة."
     ]
    },
    {
     "h": "مثال الـ VAM في المحاضرة (الـ supplies <bdi dir=\"ltr\">200,&nbsp;350,&nbsp;150,&nbsp;90</bdi>؛ والـ demands <bdi dir=\"ltr\">100,&nbsp;140,&nbsp;300,&nbsp;250</bdi>)",
     "figH": {
      "or-tp-vam": "الـ Vogel خطوة بخطوة: الـ penalties، وأعلى واحد، وأرخص خانة فيه، لحد <bdi dir=\"ltr\">$10,330</bdi>"
     }
    },
    {
     "h": "التكلفة الكلية بالـ VAM"
    },
    {
     "h": "الـ Stepping stone method (تحسين الـ BFS، جت في <bdi dir=\"ltr\">Final&nbsp;2025/26</bdi>)",
     "pts": [
      "لكل خانة <b>فاضية (unoccupied)</b>، ارسم <b>closed path</b> يبدأ من الخانة دي، ويتحرك أفقي/رأسي بس، وميلفّش غير عند خانات <b>مليانة (occupied)</b>. علّم الأركان بالتبادل <b>+, −, +, −</b>، وابدأ بـ + عند الخانة الفاضية.",
      "الـ <b>Improvement index</b> بيساوي مجموع تكاليف خانات الـ <bdi dir=\"ltr\">+</bdi> ناقص مجموع تكاليف خانات الـ <bdi dir=\"ltr\">−</bdi>. ده معناه التغيير في التكلفة الكلية لكل وحدة بتنقلها للخانة الفاضية.",
      "لو كل الـ indices ≥ 0، يبقى الحل <b>optimal</b> (في الـ minimization). غير كده اختار <b>أكتر index سالب</b>، وانقل θ = <b>أصغر allocation في خانات الـ −</b> على المسار (زوّد θ في الـ + واطرحه من الـ −). الخانة اللي توصل 0 بتخرج. وكرر.",
      "التكلفة الجديدة = التكلفة القديمة + (الـ index × θ)."
     ],
     "figH": {
      "or-tp-loop": "مسار مقفول واحد ركن ركن: العلامات، والـ improvement index، والـ θ، والتكلفة الجديدة"
     }
    },
    {
     "h": "الـ <bdi dir=\"ltr\">Final&nbsp;2025/26</bdi> محلول: الـ LCM وبعدين الـ stepping stone",
     "figH": {
      "or-tp-stone": "محاكي الـ stepping stone: الـ index لكل خانة فاضية، ودخّل أكتر واحد سالب، وكرر لحد ما كلهم يبقوا مش سالبين"
     }
    },
    {
     "h": "مثال الـ Revision:<span class=\"ltr\">S1: 100 140 75 | 300</span><span class=\"ltr\">S2: 90 20 110 | 320</span><span class=\"ltr\">S3: 60 130 220 | 380</span><span class=\"ltr\">demand 250 550 200</span>",
     "figH": {
      "or-tp-compare": "مقارنة الـ NWC والـ least cost والـ VAM على نفس البيانات، قصاد الـ optimum"
     }
    }
   ],
   "cards": [
    "شحن سلعة بين مجموعة sources ومجموعة destinations بأقل تكلفة.",
    "الـ Supply بتاع كل source، والـ demand بتاع كل destination، وتكلفة نقل الوحدة على كل route.",
    "أول allocation في الخانة اللي في الركن الشمال فوق؛ وبتتجاهل التكلفة.",
    "أول allocation في الخانة اللي فيها أقل تكلفة في الـ tableau.",
    "تاني أقل تكلفة − أقل تكلفة في صف أو عمود.",
    "الخط (صف/عمود) اللي ليه أعلى penalty، وبعدين أرخص خانة فيه.",
    "العدد <bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1</bdi>.",
    "إجمالي الـ supply بيساوي إجمالي الـ demand.",
    "$152,595.",
    "$139,835.",
    "$10,330.",
    "مجموع تكاليف خانات الـ + − مجموع تكاليف خانات الـ − على الـ closed path.",
    "كل الـ improvement indices ≥ 0.",
    "أصغر allocation في خانات الـ − على المسار.",
    "بتتناسب طرديًا مع عدد الوحدات اللي اتشحنت.",
    "الـ Vogel's approximation (وكمان الـ NWC والـ LCM)."
   ],
   "qa": [
    "بتهتم بشحن سلعة بين مجموعة sources ومجموعة destinations، وبتدوّر على أقل تكلفة توزيع. محتاج: الـ supply (الـ capacity) بتاع كل source، والـ demand بتاع كل destination، وتكلفة نقل الوحدة من كل source لكل destination.",
    "الـ NWC: ابدأ من الخانة اللي فوق على الشمال، حط أكبر كمية ممكنة (الـ min بين الـ supply والـ demand)، اشطب الصف/العمود اللي اتقفل واتحرك يمين أو تحت لحد ما كل الـ <bdi dir=\"ltr\">supply/demand</bdi> يخلص؛ التكاليف مش بتدخل. الـ LCM: دايمًا حط في الخانة اللي فيها أقل تكلفة في الـ tableau الفاضل، أكبر كمية ممكنة، اشطب وكرر.",
    "أولاً، لكل صف وعمود احسب الـ penalty، وهي تاني أقل تكلفة ناقص أقل تكلفة. تانيًا، اختار الصف/العمود اللي ليه أعلى penalty (التعادل: أي واحد أو حسب أرخص خانة). تالتًا، حط أكبر كمية ممكنة في أرخص خانة في الخط ده. رابعًا، اشطب الخط اللي اتقفل، احسب الـ penalties تاني، وكرر لحد ما كل الـ rim requirements تتحقق.",
    "بتبدأ من initial BFS فيها <bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1</bdi> خانة مليانة، ولكل خانة فاضية بترسم closed path ميلفّش غير عند الخانات المليانة، والإشارات بالتبادل <bdi dir=\"ltr\">+,&nbsp;−</bdi>. الـ Improvement index بيساوي مجموع تكاليف الـ <bdi dir=\"ltr\">+</bdi> ناقص مجموع تكاليف الـ <bdi dir=\"ltr\">−</bdi>. لو كل الـ indices <bdi dir=\"ltr\">≥&nbsp;0</bdi> يبقى الحل optimal؛ غير كده دخّل الخانة اللي ليها أكتر index سالب، وانقل θ بتساوي أصغر allocation في الـ <bdi dir=\"ltr\">−</bdi>، وكرر.",
    "الخطوات بالترتيب:<span class=\"ltr\">20: S2D2 = 320 (S2 خلص)</span><span class=\"ltr\">60: S3D1 = 250 (D1 خلص)</span><span class=\"ltr\">75: S1D3 = 200 (D3 خلص)</span><span class=\"ltr\">130: S3D2 = 130 (S3 خلص)</span><span class=\"ltr\">140: S1D2 = 100</span>والتكلفة:<span class=\"ltr\">Z = 20×320 + 60×250 + 75×200</span><span class=\"ltr\">+ 130×130 + 140×100 = $67,300</span>",
    "عندك m معادلة supply و n معادلة demand، بس في المسألة الـ balanced واحدة منهم redundant (إجمالي الـ supply بيساوي إجمالي الـ demand)، فاللي مستقلين فعلًا <bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1</bdi> بس، وده بيدّي <bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1</bdi> basic variables. لو الخانات الموجبة أقل من كده يبقى الحل degenerate."
   ],
   "quiz": [
    [
     "صح. واسمها كمان الـ minimum cost method.",
     "الـ northwest corner method بتعمل أول allocation في الخانة اللي فوق على الشمال، ومش بتبص على التكاليف خالص (L4, NWC).",
     "الـ VAM الأول بيحسب الـ penalties لكل صف وعمود (الفرق بين أقل تكلفتين)، وبيعمل الـ allocation في الصف أو العمود اللي الـ penalty بتاعه أعلى، مش في أرخص خانة على طول.",
     "الـ Hungarian method بتحل الـ assignment problem (L5) بالـ <bdi dir=\"ltr\">row/column</bdi> reduction؛ مالهاش دعوة بالـ allocations بتاعة الـ transportation."
    ],
    [
     "صح. Revision 1 (تعريف 16): الـ transportation problem بتهتم بشحن سلعة من مجموعة sources لمجموعة destinations بأقل تكلفة (L4).",
     "الـ Assignment بيوزّع resources على عدد مساوي من الـ activities.",
     "دي بتلاقي أقصر مسافة بين node اتنين.",
     "الـ simplex method دي algorithm عامة للـ LP (L3) بتتنقل بين الـ basic feasible solutions؛ مش هي اللي التعريف ده بيوصفها."
    ],
    [
     "إنك تبدأ من الخانة اللي فوق على الشمال ده الـ northwest corner method؛ الـ VAM أول allocation بيعملها في الصف أو العمود اللي عنده أكبر penalty.",
     "صح. الـ VAM بيوزّع بالـ penalties؛ والبداية من فوق على الشمال دي الـ NWC."
    ],
    [
     "صح. Revision 1 تعريف 17: في الـ northwest corner method أول allocation بتتعمل في الخانة اللي فوق على الشمال، وبعدين بنتحرك يمين أو تحت من غير ما نبص على التكاليف (L4).",
     "لو قلت False تبقى بترفض تعريف Revision 1: الـ NWC دايمًا بتبدأ من الخانة اللي فوق على الشمال (الـ northwest) في الـ tableau."
    ],
    [
     "صح. الـ VAM طريقة لإيجاد initial BFS للـ transportation problem.",
     "اختيار False غلط: الـ VAM واحدة من التلات طرق اللي بنبدأ بيها حل الـ transportation problem (الـ NWC، والـ least cost، والـ Vogel) في L4."
    ],
    [
     "الـ 150 دي قيمة M22 في الـ NWC (<bdi dir=\"ltr\">Q2D2&nbsp;=&nbsp;170&nbsp;−&nbsp;20</bdi>)؛ لكن M12 بس <bdi dir=\"ltr\">100&nbsp;−&nbsp;80&nbsp;=&nbsp;20</bdi>، اللي فاضل مع Q1 بعد <bdi dir=\"ltr\">Q1D1&nbsp;=&nbsp;80</bdi>.",
     "صح.<span class=\"ltr\">Q1D1 = 80</span>وبعدين:<span class=\"ltr\">Q1D2 = 100 − 80 = 20</span>"
    ],
    [
     "الـ Q2 بيخلص عند D3:<span class=\"ltr\">Q2D2 = 150, Q2D3 = 50</span>",
     "صح. <bdi dir=\"ltr\">M24&nbsp;=&nbsp;0</bdi>؛ والـ 50 في خانة <bdi dir=\"ltr\">(Q2,&nbsp;D3)</bdi>."
    ],
    [
     "الـ Q3 عنده 300، بس الـ D3 محتاج <bdi dir=\"ltr\">190&nbsp;−&nbsp;50&nbsp;=&nbsp;140</bdi> بس بعد <bdi dir=\"ltr\">Q2D3&nbsp;=&nbsp;50</bdi>، فـ <bdi dir=\"ltr\">M33&nbsp;=&nbsp;140</bdi> والـ 160 الباقيين بيروحوا لـ D4.",
     "صح. الـ NWC:<span class=\"ltr\">Q1D1 = 80, Q1D2 = 20,</span><span class=\"ltr\">Q2D2 = 150, Q2D3 = 50</span>يبقى الـ D3 محتاج <bdi dir=\"ltr\">190&nbsp;−&nbsp;50&nbsp;=&nbsp;140</bdi> كمان، يعني <bdi dir=\"ltr\">M33&nbsp;=&nbsp;140</bdi> مش 300 <bdi dir=\"ltr\">(L4,&nbsp;NWC)</bdi>."
    ],
    [
     "صح. بعد <bdi dir=\"ltr\">Q3D3&nbsp;=&nbsp;140</bdi>، الـ Q3 فاضله 160، وده بالظبط الـ demand بتاع D4.",
     "اختيار False غلط: بعد <bdi dir=\"ltr\">Q3D3&nbsp;=&nbsp;140</bdi>، الـ Q3 فاضله <bdi dir=\"ltr\">300&nbsp;−&nbsp;140&nbsp;=&nbsp;160</bdi> والـ D4 محتاج 160 بالظبط، فـ <bdi dir=\"ltr\">M34&nbsp;=&nbsp;160</bdi>."
    ],
    [
     "إجمالي الـ NWC:<span class=\"ltr\">7×80 + 3×20 + 6×150 + 11×50 + 7×140 + 6×160 = 4010</span>مش 4000.",
     "صح.<span class=\"ltr\">7×80 + 3×20 + 6×150 + 11×50 + 7×140 + 6×160</span><span class=\"ltr\">= 560 + 60 + 900 + 550 + 980 + 960 = 4010</span>"
    ],
    [
     "الـ NWC دايمًا بتبدأ بإنها تملا الخانة اللي فوق على الشمال.",
     "صح. الـ NWC بتبدأ من الخانة اللي فوق على الشمال وبتحط فيها أكبر كمية ممكنة:<span class=\"ltr\">M11 = min(supply 250, demand 200) = 200</span>يعني مش صفر <bdi dir=\"ltr\">(L4,&nbsp;NWC)</bdi>."
    ],
    [
     "صح.<span class=\"ltr\">Q1D1 = 200, Q1D2 = 50, Q2D2 = 250,</span><span class=\"ltr\">Q2D3 = 100, Q3D3 = 250, Q3D4 = 150</span><span class=\"ltr\">M22 = M33 = 250</span>",
     "اختيار False غلط: الـ NWC بتدّي:<span class=\"ltr\">Q2D2 = 300 − 50 = 250</span><span class=\"ltr\">Q3D3 = 350 − 100 = 250</span>يعني M22 و M33 متساويين."
    ],
    [
     "إجمالي الـ NWC:<span class=\"ltr\">600 + 50 + 1500 + 500 + 750 + 300 = 3700</span>(والـ least cost هتدّي 2450)؛ ولا واحدة فيهم 2400.",
     "صح.<span class=\"ltr\">3×200 + 1×50 + 6×250 + 5×100 + 3×250 + 2×150</span><span class=\"ltr\">= 600 + 50 + 1500 + 500 + 750 + 300 = 3700</span>"
    ],
    [
     "الـ S2 بيتستخدم كله في أرخص خانة عنده (S2, D2).",
     "صح. الـ LCM بيحط 320 في S2D2 الأول؛ والـ 250 بتوع D1 بيروحوا لـ S3 (تكلفة 60). و <bdi dir=\"ltr\">M21&nbsp;=&nbsp;0</bdi>."
    ],
    [
     "صح.<span class=\"ltr\">20×320 + 60×250 + 75×200 + 130×130 + 140×100 = 67,300</span>",
     "اختيار False غلط: الـ LCM بتدّي:<span class=\"ltr\">S2D2 = 320, S3D1 = 250, S1D3 = 200,</span><span class=\"ltr\">S3D2 = 130, S1D2 = 100</span>والإجمالي:<span class=\"ltr\">6400 + 15000 + 15000 + 16900 + 14000 = 67,300</span>"
    ],
    [
     "صح.<span class=\"ltr\">S1D1 = 250, S1D2 = 50</span>وبعدين <bdi dir=\"ltr\">S2D2&nbsp;=&nbsp;320</bdi>.",
     "اختيار False غلط: الـ NWC بتدّي:<span class=\"ltr\">S1D1 = 250</span><span class=\"ltr\">S1D2 = 300 − 250 = 50</span>وبعدين:<span class=\"ltr\">S2D2 = min(320, 500) = 320</span>"
    ],
    [
     "الـ 180 دي قيمة الخانة <bdi dir=\"ltr\">(S3,&nbsp;D2)</bdi> في الـ NWC (<bdi dir=\"ltr\">550&nbsp;−&nbsp;50&nbsp;−&nbsp;320</bdi>)؛ والـ 200 الباقيين مع S3 بيروحوا لـ D3، فـ <bdi dir=\"ltr\">M33&nbsp;=&nbsp;200</bdi>.",
     "صح. الـ NWC:<span class=\"ltr\">S1D1 = 250, S1D2 = 50, S2D2 = 320</span><span class=\"ltr\">S3D2 = 550 − 370 = 180</span>وبعدين:<span class=\"ltr\">S3D3 = 380 − 180 = 200</span>يبقى <bdi dir=\"ltr\">M33&nbsp;=&nbsp;200</bdi> مش 180 <bdi dir=\"ltr\">(L4,&nbsp;NWC)</bdi>."
    ],
    [
     "صح.<span class=\"ltr\">100×250 + 140×50 + 20×320 + 130×180 + 220×200 = 105,800</span>",
     "اختيار False غلط: تكلفة الـ NWC:<span class=\"ltr\">100×250 + 140×50 + 20×320 + 130×180 + 220×200</span><span class=\"ltr\">= 25000 + 7000 + 6400 + 23400 + 44000 = 105,800</span>"
    ],
    [
     "الـ D4 محتاج 110، بس الـ Q1 فاضله <bdi dir=\"ltr\">120&nbsp;−&nbsp;40&nbsp;=&nbsp;80</bdi> بس بعد <bdi dir=\"ltr\">Q1D2&nbsp;=&nbsp;40</bdi>، فـ <bdi dir=\"ltr\">M14&nbsp;=&nbsp;80</bdi>.",
     "صح. أول خطوة بتختار D2 (penalty 15): <bdi dir=\"ltr\">Q1D2&nbsp;=&nbsp;40</bdi>؛ تاني خطوة بتختار Q1 (penalty 13): <bdi dir=\"ltr\">Q1D4&nbsp;=&nbsp;80</bdi>."
    ],
    [
     "صح. في حل الـ VAM الـ 70 وحدة بتوع Q2 بيتقسموا: <bdi dir=\"ltr\">Q2D3&nbsp;=&nbsp;30</bdi> (كل الـ D3) والباقي لـ D4 و D1؛ والـ key بيدّي:<span class=\"ltr\">Q2D3 = Q2D4 = 30</span>المصدر: <bdi dir=\"ltr\">(L4,&nbsp;Vogel)</bdi>.",
     "اختيار False غلط: الـ allocations بتاعة الـ VAM بتدّي <bdi dir=\"ltr\">Q2D3&nbsp;=&nbsp;30</bdi> و <bdi dir=\"ltr\">Q2D4&nbsp;=&nbsp;30</bdi>، يعني الخانتين متساويين."
    ],
    [
     "صح.<span class=\"ltr\">22×40 + 4×80 + 9×30 + 7×30 + 32×50 + 24×10</span><span class=\"ltr\">= 880 + 320 + 270 + 210 + 1600 + 240 = 3520</span>",
     "اختيار False غلط: تكلفة الـ VAM:<span class=\"ltr\">22×40 + 4×80 + 9×30 + 7×30 + 32×50 + 24×10</span><span class=\"ltr\">= 880 + 320 + 270 + 210 + 1600 + 240 = 3520</span>"
    ],
    [
     "الـ Q3 عنده 18 وحدة، بس الـ D2 محتاج 8 بس، فالـ VAM بيحط <bdi dir=\"ltr\">min(18,&nbsp;8)&nbsp;=&nbsp;8</bdi> في <bdi dir=\"ltr\">(Q3,&nbsp;D2)</bdi>.",
     "صح. أول اختيار بالـ penalty هو D2 (22):<span class=\"ltr\">Q3D2 = min(18, 8) = 8</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">$797</bdi> فيها رقمين متبدلين: تكلفة الـ allocations بتاعة الـ VAM:<span class=\"ltr\">64 + 95 + 200 + 20 + 120 + 280 = $779</span>",
     "صح.<span class=\"ltr\">Q3D2 = 8, Q1D1 = 5, Q3D4 = 10,</span><span class=\"ltr\">Q1D4 = 2, Q2D4 = 2, Q2D3 = 7</span>والتكلفة:<span class=\"ltr\">64 + 95 + 200 + 20 + 120 + 280 = 779</span>"
    ],
    [
     "صح. بعد ما الخانات اللي تكلفتها 1 و 2 و 4 اتملت، أرخص خانة مفتوحة في Q1 هي D2 (تكلفة 6)، وبتاخد 400.",
     "اختيار False غلط: الـ LCM بتملا:<span class=\"ltr\">Q2D1 = 200 (1), Q3D3 = 300 (2),</span><span class=\"ltr\">Q2D3 = 100 (4)</span>وبعدين أرخص خانة مفتوحة لـ Q1 هي D2 (6)، فبتاخد الـ 400 كلهم."
    ],
    [
     "الخانة Q2D3 تكلفتها 4، تالت أرخص خانة؛ بعد <bdi dir=\"ltr\">Q2D1&nbsp;=&nbsp;200</bdi> و <bdi dir=\"ltr\">Q3D3&nbsp;=&nbsp;300</bdi> بتاخد <bdi dir=\"ltr\">min(300,&nbsp;100)&nbsp;=&nbsp;100</bdi>، مش صفر.",
     "صح.<span class=\"ltr\">Q2D1 = 200, Q3D3 = 300</span>وبعدين <bdi dir=\"ltr\">Q2D3&nbsp;=&nbsp;100</bdi>."
    ],
    [
     "الـ <bdi dir=\"ltr\">$2500</bdi> مش تكلفة الـ LCM:<span class=\"ltr\">1×200 + 2×300 + 4×100 + 6×400 + 8×200 = $5200</span>",
     "صح.<span class=\"ltr\">1×200 + 2×300 + 4×100 + 6×400 + 8×200 = 5200</span>"
    ],
    [
     "صح. المسار مابيلفّش غير عند خانات مليانة: Q3D3، و Q2D3، و Q2D2. الـ Index:<span class=\"ltr\">3 − 2 + 4 − 8 = −3</span>",
     "اختيار False غلط: من الخانة الفاضية Q3D2 الـ path بيلف بس عند خانات occupied (Q3D3 و Q2D3 و Q2D2) ويرجع، يبقى ده closed path سليم."
    ],
    [
     "مش هنوصل لـ 4100: الـ index السالب الوحيد (<bdi dir=\"ltr\">−3</bdi> عند Q3D2) مع <bdi dir=\"ltr\">θ&nbsp;=&nbsp;200</bdi> بينزّل الـ 5200 بـ 600 لـ 4600، وده الـ optimal.",
     "صح. <bdi dir=\"ltr\">θ&nbsp;=&nbsp;200</bdi> على المسار اللي الـ index بتاعه <bdi dir=\"ltr\">−3</bdi>، والحساب:<span class=\"ltr\">5200 − 600 = 4600</span>وكل الـ indices الجديدة <bdi dir=\"ltr\">≥&nbsp;0</bdi>."
    ],
    [
     "صح. الـ minimum (least) cost method بتعمل أول allocation في الخانة اللي تكلفتها أقل حاجة في الـ tableau <bdi dir=\"ltr\">(L4)</bdi>؛ وفي توصيل <bdi dir=\"ltr\">2023/24</bdi> الإجابة <bdi dir=\"ltr\">2&nbsp;→&nbsp;D</bdi>.",
     "البداية من الركن اللي فوق على الشمال دي الـ northwest corner method، اللي مش بتبص على التكاليف أصلًا (L4).",
     "الـ integer program اللي بعض الـ variables بس فيه integers اسمه mixed integer program (L6).",
     "مجموعة من الـ activities المرتبطة ببعض ده تعريف الـ project (L7, CPM)، مش طريقة transportation."
    ]
   ],
   "extra": [
    [
     "الـ 230 دي اللي بتطلع من الـ least cost method (والـ VAM) للداتا دي؛ الـ NWC مش بتبص على التكاليف وبتدّي 250.",
     "صح.<span class=\"ltr\">S1D1 = 10, S1D2 = 10, S2D2 = 15, S2D3 = 15</span>والتكلفة:<span class=\"ltr\">40 + 60 + 45 + 105 = 250</span>",
     "الـ 270 مش طالعة من خطة الـ NWC:<span class=\"ltr\">4×10 + 6×10 + 3×15 + 7×15</span><span class=\"ltr\">= 40 + 60 + 45 + 105 = 250</span>",
     "الـ 200 أقل من الـ optimal cost اللي هو 230 للداتا دي، يعني مفيش أي خطة شحن feasible ممكن تكلفتها تبقى 200."
    ],
    [
     "الـ 250 دي تكلفة الـ northwest corner؛ الـ LCM بتبدأ من أرخص خانة S2D2 (تكلفة 3) وبتخلص عند 230.",
     "الـ 210 أقل من الـ optimal cost اللي هو 230 للداتا دي، فمفيش starting method ممكن تطلّعها.",
     "الـ 240 مش مجموع الـ LCM:<span class=\"ltr\">S2D2 = 25, S1D1 = 10, S2D3 = 5, S1D3 = 10</span>تكلفتهم:<span class=\"ltr\">75 + 40 + 35 + 80 = 230</span>",
     "صح.<span class=\"ltr\">S2D2 = 25 (3), S1D1 = 10 (4),</span><span class=\"ltr\">S2D3 = 5 (7), S1D3 = 10 (8)</span>والتكلفة:<span class=\"ltr\">75 + 40 + 35 + 80 = 230</span>(وهي optimal كمان)."
    ],
    [
     "صح. أعلى penalty هو D2 (3)؛ وأرخص خانة فيه هي S2 بتكلفة 3؛ حط <bdi dir=\"ltr\">min(30,&nbsp;25)</bdi>.",
     "الـ penalty بتاع D1 بس <bdi dir=\"ltr\">5&nbsp;−&nbsp;4&nbsp;=&nbsp;1</bdi>؛ الـ VAM بيعمل الـ allocation في الصف أو العمود اللي عنده أعلى penalty، وده D2 (<bdi dir=\"ltr\">6&nbsp;−&nbsp;3&nbsp;=&nbsp;3</bdi>).",
     "الـ D2 هو العمود الصح، بس الـ VAM بيحط الـ allocation في أرخص خانة فيه، S2 (تكلفة 3)، مش S1 (تكلفة 6).",
     "الـ penalty بتاع D3 بيساوي <bdi dir=\"ltr\">8&nbsp;−&nbsp;7&nbsp;=&nbsp;1</bdi>، مش الأعلى؛ الـ VAM أول allocation بيعملها في العمود D2 (penalty 3)."
    ],
    [
     "الـ <bdi dir=\"ltr\">12&nbsp;=&nbsp;3&nbsp;×&nbsp;4</bdi> ده إجمالي عدد الخانات؛ الـ basic feasible solution بتستخدم <bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1</bdi> بس منهم.",
     "الـ <bdi dir=\"ltr\">7&nbsp;=&nbsp;m&nbsp;+&nbsp;n</bdi>؛ في المسألة الـ balanced فيه equation زيادة (redundant)، فالـ BFS فيها <bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1&nbsp;=&nbsp;6</bdi> خانات allocated.",
     "صح. الـ basic feasible solution الـ <bdi dir=\"ltr\">non-degenerate</bdi> لمسألة balanced حجمها <bdi dir=\"ltr\">m&nbsp;×&nbsp;n</bdi> فيها <bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1</bdi> خانة allocated:<span class=\"ltr\">3 + 4 − 1 = 6</span>المصدر: <bdi dir=\"ltr\">(L4,&nbsp;Stepping&nbsp;stone&nbsp;check)</bdi>.",
     "الـ 4 ده مجرد عدد الـ destinations؛ لو فيه 4 خانات بس يبقى الحل degenerate، لأننا محتاجين <bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1&nbsp;=&nbsp;6</bdi>."
    ],
    [
     "لو مسحت source تبقى بترمي supply حقيقي وبتغيّر المسألة نفسها؛ الصح إنك تضيف dummy column ياخد الـ 50 وحدة الزيادة بتكلفة صفر.",
     "صح. ده بيعمل balance للمسألة (قاعدة الكتب).",
     "الـ dummy source بنحتاجه لما الـ demand يبقى أكبر من الـ supply.",
     "الـ NWC والـ LCM والـ VAM كلهم بيفترضوا إن الـ total supply بيساوي الـ total demand؛ وبما إن <bdi dir=\"ltr\">300&nbsp;≠&nbsp;250</bdi> لازم الأول نعمل balance للمسألة بـ dummy."
    ],
    [
     "صح.<span class=\"ltr\">5 − 6 + 8 − 1 = 6 ≥ 0</span>يعني لو دخلنا الخانة دي التكلفة هتزيد.",
     "الإشارات: اجمع خانات الـ + واطرح خانات الـ −.",
     "الـ 20 جاية من:<span class=\"ltr\">5 + 6 + 8 + 1 = 20</span>كده جمعت كل التكاليف؛ خانات الـ <bdi dir=\"ltr\">−</bdi> لازم تتطرح:<span class=\"ltr\">5 − 6 + 8 − 1 = 6</span>",
     "المجموع بالإشارات مش صفر:<span class=\"ltr\">5 − 6 + 8 − 1 = +6</span>يعني لو دخّلنا الخانة دي التكلفة هتزيد 6 لكل وحدة."
    ],
    [
     "لو نقلت 300 الخانة الـ <bdi dir=\"ltr\">−</bdi> اللي فيها 200 هتبقى سالبة (<bdi dir=\"ltr\">200&nbsp;−&nbsp;300&nbsp;=&nbsp;−100</bdi>)؛ الـ θ لازم تبقى أصغر allocation في خانات الـ <bdi dir=\"ltr\">−</bdi>.",
     "الـ 500 ده مجموع خانتين الـ −؛ الـ θ محدودة بأصغر allocation في الـ −، اللي هي 200، عشان مفيش خانة تبقى سالبة.",
     "الـ 100 مالهاش علاقة بأي خانة؛ الـ θ بتساوي أصغر allocation في خانات الـ −، اللي هي 200، ودي اللي بتفضّي الخانة دي.",
     "صح. θ = أصغر allocation في خانات الـ −."
    ],
    [
     "الـ improvement index السالب معناه إن كل وحدة بتنقلها بتقلل التكلفة، فالتغيير:<span class=\"ltr\">−4 × 50 = −200</span>مش <bdi dir=\"ltr\">+200</bdi>.",
     "الـ <bdi dir=\"ltr\">−54</bdi> كده جمعت الـ index والـ θ؛ التغيير هو حاصل ضربهم:<span class=\"ltr\">−4 × 50 = −200</span>",
     "صح. الـ improvement index هو التغيير في التكلفة لكل وحدة بتتنقل، فالتغيير الكلي:<span class=\"ltr\">index × θ = −4 × 50 = −200</span>المصدر: <bdi dir=\"ltr\">(L4,&nbsp;Stepping&nbsp;stone)</bdi>.",
     "الـ <bdi dir=\"ltr\">−4</bdi> ده التغيير لكل وحدة بس؛ ومع <bdi dir=\"ltr\">θ&nbsp;=&nbsp;50</bdi> وحدة اتنقلوا، التغيير الكلي:<span class=\"ltr\">−4 × 50 = −200</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">9&nbsp;=&nbsp;22&nbsp;−&nbsp;13</bdi> ده الأكبر ناقص الأصغر؛ الـ Vogel penalty بتستخدم أقل تكلفتين:<span class=\"ltr\">16 − 13 = 3</span>",
     "صح. أقل اتنين هما 13 و 16:<span class=\"ltr\">16 − 13 = 3</span>",
     "الـ <bdi dir=\"ltr\">1&nbsp;=&nbsp;17&nbsp;−&nbsp;16</bdi> كده قارنت تاني وتالت أقل تكلفة؛ الـ penalty هي الفرق بين أقل تكلفتين:<span class=\"ltr\">16 − 13 = 3</span>",
     "الـ 13 دي أقل تكلفة نفسها؛ الـ penalty هي الفرق بين أقل تكلفتين:<span class=\"ltr\">16 − 13 = 3</span>"
    ],
    [
     "صح. دايمًا بتبدأ من الخانة اللي فوق على الشمال، فغالبًا بتدّي أعلى تكلفة.",
     "الـ least cost method دايمًا بتحط في أرخص خانة فاضلة، يعني ماشية بالتكاليف.",
     "الـ penalties بتاعة Vogel هي الفرق بين أقل تكلفتين في كل صف وعمود، يعني الـ VAM بيستخدم التكاليف مباشرةً.",
     "الـ Stepping stone أصلًا مش starting method؛ دي بتختبر حل موجود بإنها تجمع التكاليف (+/−) على الـ closed paths."
    ]
   ]
  },
  "5": {
   "notes": [
    {
     "h": "الـ assignment model",
     "pts": [
      "الـ assignment model هو <b>شكل خاص من الـ linear programming model</b> شبه الـ transportation model؛ والفرق إن <b>الـ supply عند كل source والـ demand عند كل destination كل واحد فيهم محدود بوحدة واحدة</b>.",
      "<b>التعريف (Revision 1)</b>: الـ assignment problem حالة خاصة من الـ transportation problem هدفها إنك <b>توزّع عدد من الـ resources على عدد مساوي من الـ activities</b> بحيث <b>تقلل التكلفة الكلية أو تزوّد الربح الكلي</b> للتوزيع.",
      "المسألة دي بتطلع لأن الـ resources (ناس، ماكينات...) كفاءتها بتختلف من activity للتانية، فالتكلفة أو الربح أو الخسارة بتختلف.",
      "كل صف (شخص أو job) بياخد عمود واحد بالظبط (ماكينة أو programmer)، وكل عمود بياخد صف واحد بالظبط. المسألة <bdi dir=\"ltr\">n&nbsp;×&nbsp;n</bdi> فيها n assignments.",
      "امتدادات من الكتب: مسألة <b>maximization</b> بنحوّلها بإننا نطرح كل خانة من أكبر خانة؛ والـ matrix الـ <b>unbalanced</b> بنضيفلها dummy row أو dummy column كله أصفار."
     ],
     "figH": {
      "or-assign-model": "الـ transportation model لما الـ supply والـ demand يبقوا وحدة واحدة: كل صف بياخد عمود واحد بالظبط"
     }
    },
    {
     "h": "الـ Hungarian method (خطوات المحاضرة)",
     "pts": [
      "<b>الخطوة 1 (Step 1، الـ row reduction)</b>: اطرح أصغر رقم في كل صف من كل أرقام الصف ده.",
      "<b>الخطوة 2 (Step 2، الـ column reduction)</b>: اطرح أصغر رقم في كل عمود من كل أرقام العمود ده.",
      "<b>الخطوة 3 (Step 3)</b>: غطّي كل الأصفار بـ <b>أقل عدد من الخطوط الأفقية أو الرأسية</b>. طريقة المحاضرة: <b>الـ row scanning</b>: صف فيه صفر واحد بس مش متعلّم ← اعمله box (assign) واشطب باقي الأصفار اللي في عموده؛ وبعدين <b>الـ column scanning</b>: عمود فيه صفر واحد بس ← اعمله box واشطب أصفار صفه.",
      "لو عدد الـ assignments اللي عليها box (اللي هو عدد الخطوط) يساوي n، يبقى الـ assignment ده optimal. والتكلفة الكلية بتتقري من الـ matrix <b>الأصلية</b>.",
      "<b>الخطوة 4 (Step 4، الـ marking، لو أقل من n)</b>: علّم (√) الصفوف اللي مافيهاش assignment؛ علّم الأعمدة اللي فيها صفر في صف متعلّم؛ علّم الصفوف اللي فيها assigned zero في عمود متعلّم؛ وكرر. ارسم خطوط على <b>الصفوف اللي مش متعلّمة</b> و<b>الأعمدة المتعلّمة</b>.",
      "<b>الخطوة 5 (Step 5)</b>: الـ θ هي أصغر رقم <b>مش متغطي (uncovered)</b>. الأرقام اللي مش متغطية تبقى <bdi dir=\"ltr\">C&nbsp;−&nbsp;θ</bdi>، واللي عليها خط واحد تفضل C زي ما هي، واللي عند تقاطع خطين تبقى <bdi dir=\"ltr\">C&nbsp;+&nbsp;θ</bdi>. وارجع لـ step 3.",
      "اختصار السكشن: ارسم الخطوط على الصفوف/الأعمدة اللي فيها أكتر أصفار؛ لو عدد الخطوط = عدد الصفوف، اعمل assign؛ غير كده عدّل بـ θ وارسم تاني."
     ],
     "figH": {
      "or-hungarian-scan": "الـ Step 3 خطوة بخطوة: الـ row scanning وبعدين الـ column scanning، مع الـ box والشطب للأصفار",
      "or-hungarian-mark": "الـ Step 4 (الـ marking): العلامات بتبدأ من الصف اللي مفيهوش assignment، وبعدين بنرسم الخطوط",
      "or-hungarian-theta": "الـ Step 5: الـ θ بتتطرح من الأرقام اللي مش متغطية وبتتجمع عند تقاطع خطين",
      "or-hungarian-flow": "الـ Hungarian method كـ flowchart، ومعاه الرجوع لـ step 3"
     }
    },
    {
     "h": "مثال المحاضرة (صفحة <bdi dir=\"ltr\">107</bdi>): الأعمدة <bdi dir=\"ltr\">D,&nbsp;E,&nbsp;F</bdi>",
     "figH": {
      "or-hungarian-p107": "مثال Page 107 متحلول خطوة بخطوة، والتكلفة <bdi dir=\"ltr\">$950</bdi>"
     }
    },
    {
     "h": "نتيجة مثال المحاضرة"
    },
    {
     "h": "مثال المحاضرة 2: الـ jobs <bdi dir=\"ltr\">J1..J4</bdi> على الـ persons <bdi dir=\"ltr\">P1..P4</bdi>"
    },
    {
     "h": "الـ marking والإجابة في Example 2",
     "figH": {
      "or-hungarian-ex2": "الـ Example 2 من الـ matrix الأصلية لحد الحل الـ optimal بتكلفة <bdi dir=\"ltr\">$234</bdi>، مرحلة مرحلة"
     }
    },
    {
     "h": "من الـ <bdi dir=\"ltr\">Sheet 1 / Final Aug 2022/23 Q2</bdi> (متراجعة)",
     "figH": {
      "or-hungarian-solver": "حلّال الـ Hungarian method: مصفوفات الشيت والامتحانات، أو مصفوفتك انت"
     }
    },
    {
     "h": "امتحانات assignment تانية محلولة"
    }
   ],
   "cards": [
    "هي transportation problem خاصة بتوزّع resources على عدد مساوي من الـ activities عشان تقلل التكلفة أو تزوّد الربح.",
    "كل واحد فيهم محدود بوحدة واحدة.",
    "اطرح أصغر رقم في كل صف من الصف.",
    "اطرح أصغر رقم في كل عمود من العمود.",
    "غطّي كل الأصفار بأقل عدد من الخطوط.",
    "عدد الخطوط (الـ independent assignments) يساوي n.",
    "أصغر رقم مش متغطي.",
    "بيبقى <bdi dir=\"ltr\">C&nbsp;−&nbsp;θ</bdi>.",
    "زي ما هو.",
    "بيبقى <bdi dir=\"ltr\">C&nbsp;+&nbsp;θ</bdi>.",
    "الصفوف اللي مش متعلّمة والأعمدة المتعلّمة.",
    "من الـ cost matrix الأصلية.",
    "التوزيع:<span class=\"ltr\">J1→P4, J2→P1, J3→P3, J4→P2</span>والتكلفة <bdi dir=\"ltr\">$234</bdi>.",
    "التوزيع:<span class=\"ltr\">A→E, B→F, C→D</span>والتكلفة <bdi dir=\"ltr\">$950</bdi>.",
    "اطرح كل الخانات من أكبر خانة، وبعدين اعمل minimize."
   ],
   "qa": [
    "هي حالة خاصة من الـ transportation problem هدفها توزيع عدد من الـ resources على عدد مساوي من الـ activities عشان تقلل التكلفة الكلية أو تزوّد الربح الكلي. وعلى عكس الـ transportation، الـ supply بتاع كل source والـ demand بتاع كل destination بيساوي وحدة واحدة، فكل صف بياخد عمود واحد بالظبط.",
    "(1) الـ Row reduction.<br>(2) الـ Column reduction.<br>(3) غطّي كل الأصفار بأقل عدد خطوط (بالـ row scanning والـ column scanning). لو عدد الخطوط يساوي n، اعمل assign واحسب التكلفة من الـ matrix الأصلية.<br>(4) غير كده علّم الصفوف اللي مالهاش assignment، والأعمدة اللي فيها أصفارهم، والصفوف اللي فيها assignments في الأعمدة المتعلّمة؛ وارسم خطوط على الصفوف اللي مش متعلّمة والأعمدة المتعلّمة.<br>(5) الـ θ هي أصغر رقم مش متغطي؛ اطرح θ من اللي مش متغطي، وزوّد θ عند التقاطعات، وسيب اللي عليه خط واحد؛ وكرر.",
    "الـ Row mins هي <bdi dir=\"ltr\">1,&nbsp;7,&nbsp;4,&nbsp;5</bdi> والصفوف بتبقى:<span class=\"ltr\">(0,3,5,2), (2,0,3,2), (0,1,7,3), (3,2,3,0)</span>الـ Column mins هي <bdi dir=\"ltr\">0,&nbsp;0,&nbsp;3,&nbsp;0</bdi> والصفوف بتبقى:<span class=\"ltr\">(0,3,2,2), (2,0,0,2), (0,1,4,3), (3,2,0,0)</span>عندنا 3 خطوط أقل من 4، فـ <bdi dir=\"ltr\">θ&nbsp;=&nbsp;1</bdi> والصفوف بتبقى:<span class=\"ltr\">(0,2,1,1), (3,0,0,2), (0,0,3,2), (4,2,0,0)</span>الـ Assign:<span class=\"ltr\">1→A, 2→C, 3→B, 4→D</span>والتكلفة:<span class=\"ltr\">1 + 10 + 5 + 5 = 21</span>",
    "الـ Row mins هي <bdi dir=\"ltr\">40,&nbsp;10,&nbsp;20,&nbsp;10</bdi> والصفوف بتبقى:<span class=\"ltr\">(0,20,20,30), (0,50,60,20), (0,30,20,0), (20,10,0,30)</span>الـ Column mins هي <bdi dir=\"ltr\">0,&nbsp;10,&nbsp;0,&nbsp;0</bdi> والصفوف بتبقى:<span class=\"ltr\">(0,10,20,30), (0,40,60,20), (0,20,20,0), (20,0,0,30)</span>عندنا 3 خطوط ← <bdi dir=\"ltr\">θ&nbsp;=&nbsp;10</bdi> والصفوف بتبقى:<span class=\"ltr\">(0,0,10,30), (0,30,50,20), (0,10,10,0), (30,0,0,40)</span>الـ Assign:<span class=\"ltr\">J2→P1, J1→P2, J3→P4, J4→P3</span>والتكلفة:<span class=\"ltr\">10 + 60 + 20 + 10 = 100</span>",
    "الـ θ هو أصغر رقم مش متغطي بأي خط. اطرح θ من كل رقم مش متغطي، وسيب الأرقام اللي عليها خط واحد زي ما هي، وزوّد θ على الأرقام اللي عليها خطين (التقاطعات). كده بيطلع صفر جديد من غير ما تبوّظ الـ assignments الموجودة."
   ],
   "quiz": [
    [
     "صح. الـ assignment problem حالة خاصة من الـ transportation problem: بتوزّع n resources على نفس العدد من الـ activities، واحد لكل واحدة، عشان تقلل الـ total cost أو تزوّد الـ profit (من <bdi dir=\"ltr\">L5</bdi>؛ وفي توصيل أغسطس <bdi dir=\"ltr\">2023/24</bdi> الإجابة <bdi dir=\"ltr\">3&nbsp;→&nbsp;B</bdi>).",
     "إيجاد أقصر مسافة بين two nodes بأقل تكلفة ده الـ shortest route problem، وبيتحل بالـ dynamic programming (L9).",
     "إنك تقرر بشكل علمي إزاي تصمم وتشغّل الـ man-machine systems ده تعريف الـ operations research نفسه (L1).",
     "العنصر اللي بيتقاطع فيه الـ pivot column مع الـ pivot row ده الـ pivot element بتاع الـ simplex method (L3)."
    ],
    [
     "صح. لو أقل عدد خطوط بيغطي كل الأصفار يساوي n، يبقى فيه n independent zeros، واحد في كل صف وكل عمود، فتقدر تعمل optimal assignment (L5, Step 3).",
     "الـ row reduction دايمًا بيعمل كده، بس ممكن الـ independent zeros لسه يبقوا أقل من n.",
     "الـ θ هو أصغر رقم مش متغطي ودايمًا موجب لما بنستخدمه.",
     "أقل عدد covering lines عمره ما يعدّي n، لأن n خط على الصفوف لوحدهم بيغطوا كل الأصفار؛ الاختبار هو إن عدد الخطوط يساوي n."
    ],
    [
     "الـ 19 أقل من الـ minimum الحقيقي: أرخص one-to-one assignment للـ matrix دي بـ 21، فمستحيل توصل لـ 19.",
     "صح. التوزيع:<span class=\"ltr\">1→A (1), 2→C (10), 3→B (5), 4→D (5)</span>",
     "الـ 23 مجموع assignment feasible، بس الـ Hungarian method بيوصل لـ:<span class=\"ltr\">1→A, 2→C, 3→B, 4→D = 1 + 10 + 5 + 5 = 21</span>وده أقل.",
     "الـ 25 assignment feasible بس أغلى؛ الـ optimum بعد خطوة <bdi dir=\"ltr\">θ&nbsp;=&nbsp;1</bdi> واحدة هو:<span class=\"ltr\">1 + 10 + 5 + 5 = 21</span>"
    ],
    [
     "مستحيل: أرخص حاجة لـ J1 (40) وأرخص حاجة لـ J2 (10) الاتنين على P1.",
     "مفيش one-to-one assignment للـ matrix دي مجموعه 90؛ أقل حاجة ممكنة 100، بالتوزيع:<span class=\"ltr\">J1→P2, J2→P1, J3→P4, J4→P3</span>",
     "صح. التوزيع:<span class=\"ltr\">J1→P2 (60), J2→P1 (10), J3→P4 (20), J4→P3 (10)</span>",
     "الـ 110 assignment feasible بس مش الأرخص؛ بعد <bdi dir=\"ltr\">θ&nbsp;=&nbsp;10</bdi> الـ Hungarian method بيدّي:<span class=\"ltr\">60 + 10 + 20 + 10 = 100</span>"
    ],
    [
     "صح. أصغر رقم مش متغطي هو 1 عند (J3, P3).",
     "الـ 2 موجود في J1 بس مش أصغر رقم مش متغطي.",
     "الـ 4 فعلًا مش متغطي (عند J1, P1) بس مش أصغر واحد؛ الـ θ هو <b>أصغر</b> عنصر مش متغطي، وده 1 عند (J3, P3).",
     "الـ θ لازم يبقى أصغر رقم موجب مش متغطي."
    ],
    [
     "الـ C − θ دي قاعدة العناصر اللي <b>مش متغطية</b>؛ العنصر اللي عند تقاطع خطين بياخد C + θ.",
     "إن الـ C يفضل زي ما هو دي قاعدة العناصر اللي عليها خط واحد بالظبط؛ اللي عليها خطين بياخدوا C + θ.",
     "صح. أرقام التقاطع بتزيد بـ θ.",
     "مفيش قاعدة بتخلّي العناصر 0؛ الـ θ بيتطرح من اللي مش متغطيين، واللي عليهم خطين بيبقوا C + θ."
    ],
    [
     "الـ assignment problem ممكن يعمل minimize للتكلفة أو maximize للربح (والـ max problem بيتحوّل الأول)، فـ «دايمًا بيعمل maximize» غلط.",
     "صح. الـ assignment problem هو transportation problem خاص، كل source فيه بيدّي 1 unit بالظبط وكل destination عايز 1 unit بالظبط (job واحدة لكل شخص) (L5).",
     "ده ممكن يتكتب LP عادي (حالة <bdi dir=\"ltr\">0‑1</bdi> خاصة من الـ transportation LP)؛ الـ Hungarian method بس بيحله أسرع.",
     "الـ Hungarian method محتاج <b>square</b> matrix (عدد الصفوف = عدد الأعمدة)؛ لو المسألة مش متساوية بنعملها balance الأول بـ dummy row أو column."
    ],
    [
     "الـ 43 أقل من الـ minimum: مفيش one-to-one assignment للـ matrix دي تكلفته أقل من 45.",
     "صح. التوزيع:<span class=\"ltr\">Mohamed→J1 7, Ahmed→J4 11, Samy→J3 10, Eslam→J2 17</span>",
     "مفيش one-to-one assignment للـ matrix دي مجموعه 47؛ الـ optimum هو:<span class=\"ltr\">7 + 11 + 10 + 17 = 45</span>",
     "الـ 49 assignment feasible بس أغلى؛ الـ optimum هو:<span class=\"ltr\">Mohamed→J1, Ahmed→J4, Samy→J3, Eslam→J2 = 45</span>"
    ],
    [
     "ده عكس القاعدة: الخطوط بتتعمل على الصفوف <b>اللي مش متعلّم عليها</b> والأعمدة <b>المتعلّم عليها</b>، وكده بتغطي كل الأصفار بأقل عدد خطوط.",
     "صح. الـ marking في Step 4: علّم (tick) الصفوف اللي مفيهاش assignment، بعدين الأعمدة اللي فيها أصفار في الصفوف المتعلّمة، بعدين الصفوف اللي فيها assignments في الأعمدة المتعلّمة؛ وارسم الخطوط على الصفوف اللي مش متعلّمة والأعمدة المتعلّمة (L5).",
     "لو رسمت خط على كل صف فيه صفر ممكن تستخدم خطوط أكتر من اللازم؛ قاعدة الـ marking هي اللي بتديك أقل عدد خطوط.",
     "الـ covering lines بتستخدم الصفوف كمان: الصفوف اللي مش متعلّمة والأعمدة المتعلّمة، فـ «الأعمدة بس» غلط."
    ],
    [
     "الـ <bdi dir=\"ltr\">$850</bdi> أقل من الـ minimum، لأن A و C الاتنين عايزين العمود D (مينفعش 250 و 200 مع بعض)، فمفيش assignment تكلفته أقل من <bdi dir=\"ltr\">$950</bdi>.",
     "صح. الـ row و column reduction بيوصلوك لـ:<span class=\"ltr\">A→E (400), B→F (350), C→D (200)</span>واحد لكل صف وعمود:<span class=\"ltr\">400 + 350 + 200 = $950</span>والأرقام بتتقري من الـ original matrix <bdi dir=\"ltr\">(L5)</bdi>.",
     "الـ <bdi dir=\"ltr\">$1000</bdi> assignment feasible، بس التوزيع ده:<span class=\"ltr\">A→E, B→F, C→D</span>تكلفته <bdi dir=\"ltr\">$950</bdi> بس.",
     "الـ <bdi dir=\"ltr\">$1050</bdi> assignment feasible بس أغلى؛ الـ minimum هو:<span class=\"ltr\">400 + 350 + 200 = $950</span>"
    ],
    [
     "صح. Row reduction، وبعدين column reduction.",
     "إنك تبدأ التوزيع من الـ upper left-hand cell دي الـ northwest corner method بتاعة الـ transportation problem (L4).",
     "الـ penalties (الفرق بين أقل تكلفتين) دي بتاعة الـ Vogel's approximation method في الـ transportation (L4).",
     "الـ slack variables بتتضاف للـ ≤ constraints في الـ simplex method (L3)، مش في الـ Hungarian method."
    ],
    [
     "الـ Hungarian method بيعمل minimize؛ لو طبقته على الأرباح على طول هيطلعلك <b>أقل</b> assignment ربحًا.",
     "صح (تحويل الكتب؛ والربح بعد كده بيتقري من الـ matrix الأصلية).",
     "الضرب في رقم مش بيحوّل الـ minimization لـ maximization.",
     "الـ northwest corner rule بيجيب starting solution للـ transportation (L4)؛ بيتجاهل التكاليف ومش بيحل الـ assignment problems."
    ]
   ],
   "extra": [
    [
     "مش feasible: الـ 2 والـ 1 جايين من صف 1 وصف 3، بس أرخص حاجة في صف 2 (3) في نفس عمود C بتاع صف 3.",
     "الـ 10 مجموع assignment feasible، بس التوزيع ده:<span class=\"ltr\">1→B (2), 2→A (6), 3→C (1)</span>تكلفته 9 بس.",
     "صح. الـ row reduction بيدّي:<span class=\"ltr\">(7, 0, 5), (3, 1, 0), (4, 7, 0)</span>والـ column reduction بيوصلك لـ:<span class=\"ltr\">1→B (2), 2→A (6), 3→C (1)</span>والمجموع:<span class=\"ltr\">2 + 6 + 1 = 9</span>من <bdi dir=\"ltr\">L5</bdi>.",
     "مفيش one-to-one assignment للـ matrix دي مجموعه 12؛ المجاميع الممكنة منها 9 و 10 و 14، والـ minimum هو 9."
    ],
    [
     "اطرح الـ MINIMUM بتاع الصف (44)، مش أول رقم.",
     "ده الصف زي ما هو من غير تغيير؛ الـ row reduction بيطرح أصغر رقم في الصف (44) من كل عنصر.",
     "صح. الـ row reduction بيطرح الـ row minimum وهو 44 من كل عنصر:<span class=\"ltr\">48 − 44, 48 − 44, 50 − 44, 44 − 44 = (4, 4, 6, 0)</span>من <bdi dir=\"ltr\">L5,&nbsp;lecture&nbsp;example&nbsp;2</bdi>.",
     "الـ <bdi dir=\"ltr\">(2,&nbsp;2,&nbsp;4,&nbsp;0)</bdi> ده اللي هيطلع لو طرحت 46 من أول تلات عناصر؛ بس الـ minimum هو 44، فـ:<span class=\"ltr\">48 − 44 = 4</span>"
    ],
    [
     "الـ 11 (يعني <bdi dir=\"ltr\">12&nbsp;−&nbsp;θ</bdi>) دي قاعدة العناصر <b>اللي مش متغطية</b>؛ العنصر اللي عند تقاطع خطين بيبقى:<span class=\"ltr\">12 + 1 = 13</span>",
     "صح. أرقام التقاطع بتزيد بـ θ.",
     "إنه يفضل زي ما هو دي قاعدة العناصر اللي عليها خط <b>واحد</b> بس؛ عند تقاطع خطين بيبقى:<span class=\"ltr\">12 + 1 = 13</span>",
     "مفيش خطوة بتخلّي عنصر 0 بشكل مباشر؛ الأصفار بتظهر بس لما الـ θ يتطرح من عنصر مش متغطي قيمته = θ."
    ],
    [
     "الـ 11 (يعني <bdi dir=\"ltr\">5&nbsp;+&nbsp;6</bdi>) ده الـ assignment بتاع القطر (<bdi dir=\"ltr\">1→A,&nbsp;2→B</bdi>)، وده الأصغر من المجموعين الممكنين.",
     "الـ 13 مش مجموع ممكن، لأن الـ matrix الـ <bdi dir=\"ltr\">2&nbsp;×&nbsp;2</bdi> فيها احتمالين بس:<span class=\"ltr\">5 + 6 = 11  or  8 + 7 = 15</span>",
     "الـ 14 مش مجموع ممكن، لأن الـ matrix الـ <bdi dir=\"ltr\">2&nbsp;×&nbsp;2</bdi> فيها احتمالين بس:<span class=\"ltr\">5 + 6 = 11  or  8 + 7 = 15</span>",
     "صح. التوزيع:<span class=\"ltr\">1 → B (8), 2 → A (7)</span>بالتحويل، <bdi dir=\"ltr\">8&nbsp;−&nbsp;profit</bdi> بيدّي:<span class=\"ltr\">(3, 0), (1, 2)</span>وأقل regret:<span class=\"ltr\">0 + 1</span>"
    ],
    [
     "صح. لو عدد الخطوط أقل من n، معناها إن الـ optimal assignment لسه مش ممكن.",
     "مع 3 خطوط بس فيه 3 independent zeros بس، يعني job هتفضل من غير assignment؛ تقدر توقف بس لما عدد الخطوط يساوي <bdi dir=\"ltr\">n&nbsp;=&nbsp;4</bdi>.",
     "الـ dummy row بيتستخدم بس لما الـ matrix مش square؛ ودي أصلًا <bdi dir=\"ltr\">4&nbsp;×&nbsp;4</bdi>.",
     "الصفوف فيها أصفار خلاص؛ مش هيغير حاجة."
    ],
    [
     "لو مسحت ماكينة عشوائي ممكن ترمي أحسن ماكينة؛ إنك تضيف dummy job بتكلفة صفر بيخلّي كل الماكينات متاحة.",
     "في الـ assignment problem كل ماكينة بتاخد job واحدة بالظبط؛ الـ balancing بيتعمل بـ dummy job، مش إنك تدّي ماكينة شغلانتين.",
     "صح. ده بيخلي الـ matrix square (قاعدة الكتب)؛ والماكينة اللي تاخد الـ dummy job بتفضل فاضية.",
     "الـ northwest corner rule طريقة بداية للـ transportation (L4)؛ الـ unbalanced assignment محتاج dummy row عشان يبقى square."
    ],
    [
     "الـ reduced matrix فيها opportunity costs (كل الخانات المختارة فيها 0)؛ التكلفة الحقيقية لازم تتقري من الـ original matrix.",
     "صح. اجمع التكاليف الأصلية للخانات اللي اخترتها.",
     "الـ row minima جزء بس من اللي اتطرح (الـ column minima وخطوات الـ θ بيغيروه كمان)؛ استخدم التكاليف الأصلية.",
     "الـ θ بس بيعدّل الـ matrix عشان يطلّع أصفار جديدة؛ المجموع هو مجموع التكاليف <b>الأصلية</b> للخانات اللي اتعملها assign."
    ],
    [
     "الـ 230 غلطة في الجمع:<span class=\"ltr\">44 + 56 = 100</span><span class=\"ltr\">100 + 90 = 190</span><span class=\"ltr\">190 + 44 = 234</span>",
     "الـ 244 زيادة 10، لأن:<span class=\"ltr\">44 + 56 + 90 + 44 = 234</span>",
     "الـ 224 ناقص 10 عن المجموع الحقيقي:<span class=\"ltr\">44 + 56 = 100, + 90 = 190, + 44 = 234</span>",
     "صح. المجموع بيتقري من الـ original matrix:<span class=\"ltr\">J1→P4 44 + J2→P1 56 + J3→P3 90 + J4→P2 44 = $234</span>من <bdi dir=\"ltr\">L5,&nbsp;lecture&nbsp;example&nbsp;2</bdi>."
    ],
    [
     "الـ initial BFS بتاع الـ transportation problem بيتجاب بالـ NWC أو الـ least cost أو Vogel (L4)، مش بالـ Hungarian method.",
     "الـ shortest route problem بيتحل بالـ dynamic programming، بالـ backward approach (L9).",
     "الـ project scheduling بيستخدم شبكات الـ CPM (L7) والـ PERT (L8)، مش الـ Hungarian method.",
     "صح. الـ Hungarian method (الـ row reduction، والـ column reduction، والـ covering lines، وخطوات الـ θ) هو طريقة المحاضرة لحل الـ assignment problem <bdi dir=\"ltr\">(L5)</bdi>."
    ],
    [
     "صح. في الـ assignment الـ <bdi dir=\"ltr\">n&nbsp;×&nbsp;n</bdi> كل صف بياخد عمود واحد بالظبط وكل عمود صف واحد، فيبقى عدد الـ assignments بالظبط <bdi dir=\"ltr\">n&nbsp;=&nbsp;5</bdi> (من <bdi dir=\"ltr\">L5</bdi>).",
     "الـ <bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1&nbsp;=&nbsp;9</bdi> دي للـ BFS بتاع الـ transportation؛ الـ assignment محتاج n بالظبط.",
     "الـ 25 دي كل خانات الـ matrix الـ <bdi dir=\"ltr\">5&nbsp;×&nbsp;5</bdi>؛ الـ assignment بيستخدم خانة واحدة بس لكل صف وعمود، يعني 5.",
     "الـ 10 هي عدد الصفوف + عدد الأعمدة؛ الـ assignment محتاج خانة واحدة لكل صف (ولكل عمود)، يعني 5 بالظبط."
    ]
   ]
  },
  "6": {
   "notes": [
    {
     "h": "التعريفات",
     "figH": {
      "or-ip-kinds": "الـ LP relaxation والـ pure والـ mixed والـ binary على نفس القيود: أنهي نقط تنفع، وأحسن Z في كل واحدة"
     }
    },
    {
     "h": "ليه مانقرّبش إجابة الـ LP وخلاص؟",
     "pts": [
      "تقريب الـ LP optimum ممكن يدّيك نقطة <b>infeasible</b> أو نقطة <b>مش optimal</b>. مثال (من الـ Sheet 2): الـ LP optimum هو <bdi dir=\"ltr\">(2.75,&nbsp;1.25)</bdi>؛ ولو قرّبته لـ <bdi dir=\"ltr\">(3,&nbsp;1)</bdi> هيكسر القيد:<span class=\"ltr\">10x1 + 6x2 ≤ 35   (36 &gt; 35)</span>",
      "في مسألة MAX، الـ Z بتاع الـ LP relaxation هو <b>upper bound</b> لأحسن Z integer؛ وكل branch ممكن بس يقلله.",
      "مسائل الـ Integer بتظهر لما الوحدات ماينفعش تتقسم: عدد الأيام اللي المصنع بيشتغلها (بيتدفع يوم كامل)، عدد الماكينات، الناس، العربيات."
     ],
     "figH": {
      "or-ip-round": "تقريب النقطة <bdi dir=\"ltr\">(2.75,&nbsp;1.25)</bdi> بيدّي نقطة infeasible أو مش optimal، ودوس على أي نقطة integer علشان تختبرها"
     }
    },
    {
     "h": "خطوات الـ Branch and bound (بالرسم)",
     "pts": [
      "<b>1.</b> حل الـ LP relaxation بالرسم (corner point table). لو الـ optimum طلع integer، خلاص وقف.",
      "<b>(2)</b> غير كده اعمل <b>branch</b> على variable فيه كسر (المحاضرة بتختار الـ variable اللي <b>الجزء العشري بتاعه أكبر</b>): لو <bdi dir=\"ltr\">x1&nbsp;=&nbsp;2.75</bdi>، اعمل اتنين sub-problems بإضافة <b><bdi dir=\"ltr\">x1&nbsp;≤&nbsp;2</bdi></b> و <b><bdi dir=\"ltr\">x1&nbsp;≥&nbsp;3</bdi></b>. كده الشريط <bdi dir=\"ltr\">2&nbsp;&lt;&nbsp;x1&nbsp;&lt;&nbsp;3</bdi> بيتشال.",
      "<b>3.</b> حل كل sub-problem بالرسم (كل constraint جديد عبارة عن خط رأسي أو أفقي).",
      "<b>4.</b> الـ node بيبقى <b>fathomed</b> (نوقف الـ branching عنده) لما: الحل بتاعه يطلع integer (ويبقى الـ incumbent لو أحسن)، أو يطلع <b>infeasible</b>، أو الـ Z بتاعه مش أحسن من أحسن Z integer لقيناه لحد دلوقتي.",
      "<b>5.</b> كمّل branching على الـ nodes اللي فيها كسور لحد ما مايفضلش ولا live node. وأحسن integer solution لقيتها هي الـ optimal.",
      "ملحوظة:<span class=\"ltr\">x ≥ y and x ≤ y ⇒ x = y</span>يعني لو branch ضاف <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;3</bdi> فوق <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;3</bdi>، يبقى <bdi dir=\"ltr\">x1&nbsp;=&nbsp;3</bdi> وده خط."
     ],
     "figH": {
      "or-bb-branch": "الـ branching على <bdi dir=\"ltr\">x1&nbsp;=&nbsp;2.75</bdi> بيشيل الشريط اللي بين 2 و 3، وكل sub-problem بيتحل بالرسم",
      "or-bb-fathom": "التلات حالات اللي الـ node فيها بتبقى fathomed، على الـ nodes بتاعة الـ Sheet 2",
      "or-bb-flow": "الخطوات كـ flowchart ماشية على الـ Sheet 2، ومعاها الرجوع للخطوة 2",
      "or-bb-equal": "لما القيدين <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;3</bdi> و <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;3</bdi> يجتمعوا مايفضلش غير الخط <bdi dir=\"ltr\">x1&nbsp;=&nbsp;3</bdi>"
     }
    },
    {
     "h": "مسألة الـ <bdi dir=\"ltr\">Sheet 2 / Final 2021/22 Q4</bdi> هي:<span class=\"ltr\">Max Z = 40x1 + 30x2</span><span class=\"ltr\">10x1 + 6x2 ≤ 35; x1 + x2 ≤ 4</span>",
     "figH": {
      "or-bb-sheet2": "حل الـ Sheet 2 بالـ branch and bound نود نود: المنطقة والـ corner table والـ tree وهي بتكبر"
     }
    },
    {
     "h": "مسألة الـ <bdi dir=\"ltr\">Sheet 1 / Final Aug 2022/23 Q4</bdi> هي:<span class=\"ltr\">Max Z = 3x1 + 4x2</span><span class=\"ltr\">x1 + 3x2 ≤ 13; 5x1 + 2x2 ≤ 20</span>",
     "figH": {
      "or-bb-sheet1": "حل الـ Sheet 1 بالـ branch and bound نود نود لحد الإجابة دي <bdi dir=\"ltr\">x1&nbsp;=&nbsp;1,&nbsp;x2&nbsp;=&nbsp;4,&nbsp;Z&nbsp;=&nbsp;19</bdi>"
     }
    },
    {
     "h": "مسائل branch-and-bound محلولة زيادة",
     "figH": {
      "or-bb-solver": "الـ branch and bound على كل مسألة في الجدول، أو على مسألة من عندك"
     }
    }
   ],
   "cards": [
    "هي optimization problem الـ decision variables بتوعها integer.",
    "هو الـ LP اللي بيطلع لما تشيل كل الـ integer أو الـ <bdi dir=\"ltr\">0‑1</bdi> constraints.",
    "كل الـ variables لازم تبقى integers.",
    "بعض الـ variables بس لازم تبقى integers.",
    "كل الـ variables لازم تساوي 0 أو 1.",
    "بيطلع sub-problems فيها <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;2</bdi> و <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;3</bdi>.",
    "اللي الجزء العشري بتاعه أكبر.",
    "لو الحل integer، أو infeasible، أو Z مش أحسن من الـ incumbent.",
    "هو upper bound للـ integer optimum.",
    "الحل:<span class=\"ltr\">x1 = 2, x2 = 2, Z = 140</span>",
    "الحل:<span class=\"ltr\">x1 = 1, x2 = 4, Z = 19</span>",
    "الحل:<span class=\"ltr\">x1 = 4, x2 = 2, Z = 410</span>",
    "الحل:<span class=\"ltr\">x1 = 1, x2 = 6, Z = 200</span>",
    "الحل:<span class=\"ltr\">X = 1, Y = 6, Z = 1000</span>",
    "ممكن يطلع infeasible أو مش optimal."
   ],
   "qa": [
    "الـ Pure: كل decision variable لازم يبقى integer.<br>الـ Mixed: بعض الـ variables بس لازم تبقى integers، والباقي ممكن يبقى continuous.<br>الـ Binary <bdi dir=\"ltr\">(0‑1)</bdi>: كل variable لازم يساوي 0 أو 1 (قرارات أيوه/لأ).",
    "الـ Integer programming هو optimization problem الـ decision variables بتوعه integer. والـ LP relaxation هو الـ linear program اللي بيطلع لما تشيل كل الـ integer أو الـ <bdi dir=\"ltr\">0‑1</bdi> constraints من على الـ variables؛ والـ optimum بتاعه بيحدّ الـ integer optimum (upper bound في الـ max).",
    "حل الـ LP relaxation. لو فيه variable طالع بكسر (مثلًا <bdi dir=\"ltr\">x1&nbsp;=&nbsp;2.75</bdi>)، اعمل branch لاتنين sub-problems فيهم <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;2</bdi> و <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;3</bdi>. حل كل واحد؛ ووقّف أي branch لما يطلع infeasible، أو يدّي integer solution، أو الـ Z بتاعه مايقدرش يغلب أحسن integer solution. كمّل لحد ما مايفضلش branches؛ وأحسن integer solution هي الـ optimal.",
    "الـ LP:<span class=\"ltr\">(2.75, 1.25), Z = 147.5</span>الـ branch <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;2</bdi> بيدّي:<span class=\"ltr\">(2,2), Z = 140 (integer)</span>الـ branch <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;3</bdi> بيدّي:<span class=\"ltr\">(3, 0.83), Z = 145</span>وبعدين <bdi dir=\"ltr\">x2&nbsp;≥&nbsp;1</bdi> بيطلع infeasible، و <bdi dir=\"ltr\">x2&nbsp;≤&nbsp;0</bdi> بيدّي:<span class=\"ltr\">(3.5,0), Z = 140</span>ومايقدرش يحسّن (وبعدين <bdi dir=\"ltr\">(3,0)&nbsp;=&nbsp;120</bdi>).<br>الـ Optimum هو:<span class=\"ltr\">x1 = 2, x2 = 2, Z = 140</span>",
    "الـ LP:<span class=\"ltr\">(2.615, 3.462), Z = 21.69</span>الـ branch <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;2</bdi> بيدّي:<span class=\"ltr\">(2, 3.667), Z = 20.67</span>ومنه <bdi dir=\"ltr\">x2&nbsp;≤&nbsp;3</bdi> بيدّي:<span class=\"ltr\">(2,3), Z = 18</span>و <bdi dir=\"ltr\">x2&nbsp;≥&nbsp;4</bdi> بيدّي:<span class=\"ltr\">(1,4), Z = 19</span>الـ branch <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;3</bdi> بيدّي:<span class=\"ltr\">(3, 2.5), Z = 19</span>ومنه <bdi dir=\"ltr\">x2&nbsp;≤&nbsp;2</bdi> بيدّي:<span class=\"ltr\">(3.2, 2), Z = 17.6</span>و <bdi dir=\"ltr\">x2&nbsp;≥&nbsp;3</bdi> بيطلع infeasible.<br>الـ Optimum هو:<span class=\"ltr\">x1 = 1, x2 = 4, Z = 19</span>"
   ],
   "quiz": [
    [
     "صح. في Revision 1: الـ integer program اللي <b>بعض</b> الـ variables بس فيه لازم تبقى integers اسمه <b>mixed</b> integer programming problem (من <bdi dir=\"ltr\">L6,&nbsp;Types&nbsp;of&nbsp;IP</bdi>).",
     "الـ pure integer program بيطلب إن <b>كل</b> الـ decision variables تبقى integers؛ إنما «بعضها بس» ده وصف الـ mixed IP.",
     "الـ binary <bdi dir=\"ltr\">(0‑1)</bdi> program بيحصر كل الـ variables في 0 أو 1 بس؛ ده مش الحالة اللي فيها بعض الـ variables بس لازم تبقى integers.",
     "الـ relaxation بيشيل الـ integer constraints خالص."
    ],
    [
     "في الـ LP العادي الـ decision variables بتبقى continuous (أي قيمة حقيقية ≥ 0)؛ أول ما الـ variables تبقى integer المسألة بتبقى integer program.",
     "صح. في Revision 1: الـ integer programming problem هو optimization problem الـ decision variables فيه integers (سواء pure أو mixed أو <bdi dir=\"ltr\">0‑1</bdi>) (من <bdi dir=\"ltr\">L6</bdi>).",
     "الـ relaxation بيشيل شرط الـ integer.",
     "الـ Dynamic programming بيعمل optimize لمسائل القرارات اللي على مراحل (multistage) (L9)؛ تعريفه مالوش علاقة بإن الـ decision variables تبقى integers."
    ],
    [
     "صح. تعريف 22 في Revision 1. (ورقة طالب متصححة معلّمها ✗، وده غلط.)",
     "لو قلت False تبقى بترفض تعريف 22 في Revision 1: لما تشيل كل الـ integer أو الـ <bdi dir=\"ltr\">0‑1</bdi> constraints من الـ IP بيطلع عندك الـ LP relaxation بتاعه."
    ],
    [
     "ده تعريف الـ integer programming problem.",
     "صح. الـ relaxation بيشيل الـ integer constraints."
    ],
    [
     "إن بعض القيم integer وبعضها non-integer ده وصف الـ <b>MIXED</b> integer model؛ في الـ pure integer model كل variable لازم يبقى integer.",
     "صح. الـ Pure معناها كل الـ variables integer؛ و\"بعضها\" معناها mixed."
    ],
    [
     "صح. الـ LP relaxation هو نفس الـ IP بعد ما تشيل كل الـ integer أو الـ <bdi dir=\"ltr\">0‑1</bdi> constraints، والـ branch and bound بيحله الأول (من <bdi dir=\"ltr\">L6</bdi>؛ وفي توصيل <bdi dir=\"ltr\">2023/24</bdi> الإجابة <bdi dir=\"ltr\">4&nbsp;→&nbsp;C</bdi>).",
     "النقط اللي برة الـ feasible region دي اسمها infeasible solutions (L2)، مش الـ LP relaxation.",
     "الـ activity اللي ماينفعش تبدأ غير لما activity تانية تخلص دي الـ successor activity (من <bdi dir=\"ltr\">L7,&nbsp;CPM</bdi>).",
     "الـ activity اللي لازم تخلص قبل ما activity تانية تبدأ على طول دي الـ predecessor activity (من <bdi dir=\"ltr\">L7,&nbsp;CPM</bdi>)."
    ],
    [
     "صح. الـ mixed integer program هو اللي بعض الـ variables بس فيه لازم تبقى integers (من <bdi dir=\"ltr\">L6</bdi>؛ وفي توصيل <bdi dir=\"ltr\">2023/24</bdi> الإجابة <bdi dir=\"ltr\">3&nbsp;→&nbsp;B</bdi>).",
     "المنطقة المشتركة اللي بتحددها كل الـ constraints دي الـ feasible region في الـ graphical method (L2).",
     "إنك توزع الأول على الـ cell اللي تكلفتها أقل حاجة ده الـ minimum (least) cost method في الـ transportation problem (L4).",
     "مجموعة الـ activities المرتبطة ببعض (interrelated) دي تعريف الـ project (L7)، مش الـ mixed IP."
    ],
    [
     "ده feasible بس <bdi dir=\"ltr\">(2,2)</bdi> بيدّي أكتر. (نموذج إجابة طالب وقف هنا، وده غلط.)",
     "صح. الـ node <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;2</bdi> بيدّي <bdi dir=\"ltr\">(2,2)&nbsp;=&nbsp;140</bdi>، والـ branch التاني مايقدرش يعدّي 140 بأرقام integer.",
     "الـ <bdi dir=\"ltr\">(2.75,&nbsp;1.25)</bdi> مع <bdi dir=\"ltr\">Z&nbsp;=&nbsp;147.5</bdi> ده الـ LP relaxation (الـ root node)؛ الـ variables فيه كسور، فهو مش integer solution.",
     "الـ <bdi dir=\"ltr\">(3,&nbsp;1)</bdi> ده نقطة الـ LP بعد التقريب، بس:<span class=\"ltr\">10(3) + 6(1) = 36 &gt; 35</span>فهي infeasible."
    ],
    [
     "الـ <bdi dir=\"ltr\">(25/6,&nbsp;2)</bdi> ده الـ LP relaxation (الـ root node)؛ الـ <bdi dir=\"ltr\">x1&nbsp;=&nbsp;4.17</bdi> فيه كسر، فلسه محتاج تعمل branch على x1.",
     "الـ <bdi dir=\"ltr\">(5,&nbsp;0)</bdi> feasible (لأن <bdi dir=\"ltr\">12&nbsp;×&nbsp;5&nbsp;=&nbsp;60</bdi>) بس <bdi dir=\"ltr\">Z&nbsp;=&nbsp;400</bdi> أقل من 410 اللي عند <bdi dir=\"ltr\">(4,&nbsp;2)</bdi>.",
     "صح. الـ root LP بيدّي <bdi dir=\"ltr\">(25/6,&nbsp;2)</bdi>؛ الـ branch <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;4</bdi> بيدّي <bdi dir=\"ltr\">(4,&nbsp;2)</bdi>، والتحقق:<span class=\"ltr\">4 + 2 ≤ 7,  48 + 10 = 58 ≤ 60</span>فـ:<span class=\"ltr\">Z = 320 + 90 = 410</span>والـ branch <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;5</bdi> أقصاه 400 <bdi dir=\"ltr\">(L6)</bdi>.",
     "الـ <bdi dir=\"ltr\">(4,&nbsp;0)</bdi> feasible بس <bdi dir=\"ltr\">Z&nbsp;=&nbsp;320</bdi> أقل بكتير من 410؛ عند <bdi dir=\"ltr\">x1&nbsp;=&nbsp;4</bdi> لسه تقدر تعلّي x2 لحد 2."
    ],
    [
     "صح. الشريط اللي فيه كسور <bdi dir=\"ltr\">2&nbsp;&lt;&nbsp;x1&nbsp;&lt;&nbsp;3</bdi> بيتشال.",
     "الـ <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;2.75</bdi> والـ <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;2.75</bdi> الاتنين لسه فيهم النقطة اللي فيها كسر؛ الـ branching لازم يشيل الشريط <bdi dir=\"ltr\">2&nbsp;&lt;&nbsp;x1&nbsp;&lt;&nbsp;3</bdi>.",
     "الـ branches بتبقى inequalities (x1 ≤ 2 و x1 ≥ 3)، فكل sub-problem بيحتفظ بكل الـ integer values اللي في ناحيته، مش قيمة واحدة بس.",
     "الـ branching بيتعمل على الـ variable اللي فيه كسر، وهنا ده <bdi dir=\"ltr\">x1&nbsp;=&nbsp;2.75</bdi>، مش x2."
    ],
    [
     "صح. الـ node بتتقفل (fathomed) لما الـ LP solution بتاعها يطلع كله integer (candidate)، أو لما تبقى infeasible، أو لما الـ Z بتاعها مايقدرش يغلب أحسن integer Z لقيناه لحد دلوقتي (من <bdi dir=\"ltr\">L6,&nbsp;Branch&nbsp;and&nbsp;bound</bdi>).",
     "ساعتها ممكن لسه يبقى فيه integer point أحسن؛ كمّل branching.",
     "وجود variable فيه كسر هو بالظبط السبب إنك تكمل branch (تقسم عليه)، إلا لو الـ Z بتاع الـ node أصلًا مايغلبش الـ incumbent.",
     "الـ nodes اللي integer أو اللي dominated بتبقى fathomed برضه."
    ],
    [
     "الـ <bdi dir=\"ltr\">(1,&nbsp;6.17)</bdi> مع <bdi dir=\"ltr\">Z&nbsp;=&nbsp;1025</bdi> ده الـ LP relaxation؛ الـ Y فيه كسر، فلازم تعمل branch لـ <bdi dir=\"ltr\">Y&nbsp;≤&nbsp;6</bdi> و <bdi dir=\"ltr\">Y&nbsp;≥&nbsp;7</bdi>.",
     "صح. الـ Branch <bdi dir=\"ltr\">Y&nbsp;≤&nbsp;6</bdi> بيدّي <bdi dir=\"ltr\">(1,6)</bdi>؛ و <bdi dir=\"ltr\">Y&nbsp;≥&nbsp;7</bdi> بيطلع infeasible، لأن:<span class=\"ltr\">15 + 210 &gt; 200</span>",
     "الـ <bdi dir=\"ltr\">(0,&nbsp;6)</bdi> feasible بس:<span class=\"ltr\">Z = 150 × 6 = 900</span>وده أقل من 1000 اللي عند <bdi dir=\"ltr\">(1,&nbsp;6)</bdi>.",
     "الـ <bdi dir=\"ltr\">(1,&nbsp;7)</bdi> بيكسر القيد:<span class=\"ltr\">15X + 30Y ≤ 200:  15 + 210 = 225 &gt; 200</span>فالـ branch <bdi dir=\"ltr\">Y&nbsp;≥&nbsp;7</bdi> يبقى infeasible."
    ]
   ],
   "extra": [
    [
     "الـ (3.75, 1.25) ده الـ LP relaxation (الـ root node)؛ القيمتين فيهم كسور، فده مش integer solution.",
     "الـ <bdi dir=\"ltr\">(4,&nbsp;0)</bdi> feasible (لأن <bdi dir=\"ltr\">40&nbsp;≤&nbsp;45</bdi>) بس <bdi dir=\"ltr\">Z&nbsp;=&nbsp;20</bdi> أقل من 23 اللي عند <bdi dir=\"ltr\">(3,&nbsp;2)</bdi>.",
     "صح. التحقق:<span class=\"ltr\">10(3) + 6(2) = 42 ≤ 45</span><span class=\"ltr\">3 + 2 = 5 ≤ 5</span>",
     "الـ <bdi dir=\"ltr\">(4,&nbsp;1)</bdi> بيكسر القيد:<span class=\"ltr\">10x1 + 6x2 ≤ 45:  40 + 6 = 46 &gt; 45</span>فهو infeasible."
    ],
    [
     "الـ x2 ≤ 3.4 والـ x2 ≥ 3.4 الاتنين لسه فيهم النقطة اللي فيها كسر؛ الـ branching على 3.4 بيستخدم أقرب integers ليها: x2 ≤ 3 و x2 ≥ 4.",
     "الـ <bdi dir=\"ltr\">x2&nbsp;≤&nbsp;2</bdi> والـ <bdi dir=\"ltr\">x2&nbsp;≥&nbsp;5</bdi> بيشيلوا كمان الـ integers 3 و4، واللي ممكن يكون فيهم الـ optimum؛ المسموح تشيله بس هو <bdi dir=\"ltr\">3&nbsp;&lt;&nbsp;x2&nbsp;&lt;&nbsp;4</bdi>.",
     "صح. الـ branching على <bdi dir=\"ltr\">x2&nbsp;=&nbsp;3.4</bdi> بيستخدم الـ integers اللي على الناحيتين، <bdi dir=\"ltr\">x2&nbsp;≤&nbsp;3</bdi> و <bdi dir=\"ltr\">x2&nbsp;≥&nbsp;4</bdi>، وبيشيل بس الشريط اللي فيه كسور <bdi dir=\"ltr\">3&nbsp;&lt;&nbsp;x2&nbsp;&lt;&nbsp;4</bdi> (من <bdi dir=\"ltr\">L6</bdi>).",
     "الـ variable اللي فيه كسر هو <bdi dir=\"ltr\">x2&nbsp;=&nbsp;3.4</bdi>، فالـ branches لازم تبقى على x2 مش x1."
    ],
    [
     "الـ branching مش هيفيد: في مسألة MAX كل الـ sub-nodes هيبقى Z بتاعها ≤ 39، وده مايقدرش يغلب الـ incumbent اللي هو 40.",
     "صح. الـ bound بتاعه مش أحسن من الـ incumbent.",
     "الـ incumbent لازم يبقى solution كله integer، وكمان 39 أسوأ من 40 أصلًا.",
     "مفيش حاجة غلط في الـ tree؛ الـ node دي بس بتتقص (pruned) والطريقة بتكمل مع باقي الـ live nodes."
    ],
    [
     "صح. الـ binary <bdi dir=\"ltr\">(0‑1)</bdi> variable هو integer variable محصور في 0 أو 1 بالظبط، وغالبًا بيمثل قرار <bdi dir=\"ltr\">yes/no</bdi> (من <bdi dir=\"ltr\">L6</bdi>).",
     "أي قيمة integer ده وصف الـ general integer variable؛ الـ binary variable محصور في 0 أو 1 بس.",
     "القيم اللي بين 0 و1 (زي 0.5) دي وصف continuous variable حده الأقصى 1؛ الـ binary بيسمح بـ 0 أو 1 بس.",
     "الـ binary variable ممكن يبقى 0 (no) زي ما ممكن يبقى 1 (yes)."
    ],
    [
     "التقريب ممكن يطلّعك برة الـ feasible region أو يفوّت عليك الـ optimum؛ وهنا الـ <bdi dir=\"ltr\">(3,&nbsp;1)</bdi> بيكسر القيد:<span class=\"ltr\">10x1 + 6x2 ≤ 35</span>",
     "الـ (3,1) كانت هتدّي 150، أعلى؛ المشكلة في الـ feasibility.",
     "الـ integer values مسموحة عادي جدًا في الـ LP؛ المشكلة إن النقطة بعد التقريب بتكسر constraint.",
     "صح. التقريب ممكن يطلّعك برا الـ feasible region؛ والـ optimum الحقيقي:<span class=\"ltr\">(2, 2), Z = 140</span>"
    ],
    [
     "في الـ MAX، إضافة قيود الـ integer يا إما بتسيب الـ Z زي ما هو يا إما بتقلله، فالـ Z بتاع الـ LP relaxation يبقى <b>UPPER</b> bound مش lower.",
     "صح. إضافة شروط الـ integer ممكن بس تسيب Z زي ما هو أو تقلله.",
     "بس لما حل الـ LP يطلع integer بالصدفة.",
     "الـ Z بتاع الـ relaxation بيحدّ الـ integer optimum من فوق (في الـ MAX)، وده بالظبط اللي الـ branch and bound بيستخدمه عشان يقص الـ nodes."
    ],
    [
     "أصغر نقطة فيه (3, 1) بتكسر الـ constraint أصلًا.",
     "الـ node دي محدودة بالقيدين:<span class=\"ltr\">10x1 + 6x2 ≤ 35, x1 + x2 ≤ 4</span>هي مش unbounded، هي فاضية.",
     "صح. أصغر نقطة فيها <bdi dir=\"ltr\">(3,&nbsp;1)</bdi> بتدّي أصلًا:<span class=\"ltr\">10(3) + 6(1) = 36 &gt; 35</span>فمفيش ولا نقطة بتحقق <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;3</bdi> و <bdi dir=\"ltr\">x2&nbsp;≥&nbsp;1</bdi> والـ constraint مع بعض، والـ node دي infeasible (من <bdi dir=\"ltr\">L6,&nbsp;Sheet&nbsp;2</bdi>).",
     "الـ <bdi dir=\"ltr\">Z&nbsp;=&nbsp;145</bdi> عند <bdi dir=\"ltr\">(3,&nbsp;0.83)</bdi> ده الـ parent node بتاع <bdi dir=\"ltr\">x1&nbsp;≥&nbsp;3</bdi>، وهو فيه كسر؛ الـ child node دي مفيهاش ولا نقطة feasible."
    ],
    [
     "صح. التحقق:<span class=\"ltr\">6 + 2 = 8 ≤ 9,  9 + 1 = 10 ≤ 10</span>(والـ LP relaxation بيدّي <bdi dir=\"ltr\">(2.75,&nbsp;1.75)</bdi> مع <bdi dir=\"ltr\">Z&nbsp;=&nbsp;11.75</bdi>.)",
     "الـ <bdi dir=\"ltr\">(2,&nbsp;2)</bdi> feasible (<bdi dir=\"ltr\">8&nbsp;≤&nbsp;9, 8&nbsp;≤&nbsp;10</bdi>) بس <bdi dir=\"ltr\">Z&nbsp;=&nbsp;10</bdi> أقل من 11 اللي عند <bdi dir=\"ltr\">(3,&nbsp;1)</bdi>.",
     "الـ <bdi dir=\"ltr\">(3,&nbsp;2)</bdi> بيكسر القيد:<span class=\"ltr\">2x1 + 2x2 ≤ 9:  6 + 4 = 10 &gt; 9</span>(وكمان <bdi dir=\"ltr\">9&nbsp;+&nbsp;2&nbsp;=&nbsp;11&nbsp;&gt;&nbsp;10</bdi>)، فهو infeasible.",
     "الـ (2.75, 1.75) ده الـ LP relaxation؛ القيم اللي فيها كسور مش مسموحة، فهو مجرد upper bound."
    ],
    [
     "صح. بعض الـ variables بس لازم تبقى integers.",
     "عدد العمال كله integers، يعني كل variable integer: ده pure integer program.",
     "لو كل variable قرار <bdi dir=\"ltr\">yes/no</bdi> يبقى ده binary <bdi dir=\"ltr\">(0‑1)</bdi> integer program، مش mixed.",
     "لو مفيش ولا variable integer يبقى ده LP عادي؛ الـ mixed IP محتاج بعض (مش كل) الـ variables تبقى integer."
    ],
    [
     "الـ <bdi dir=\"ltr\">(2,&nbsp;4)</bdi> بيكسر القيد:<span class=\"ltr\">x1 + 3x2 ≤ 13:  2 + 12 = 14 &gt; 13</span>فالـ x1 لازم ينزل لـ 1.",
     "الـ node دي feasible، لأن الـ <bdi dir=\"ltr\">(1,&nbsp;4)</bdi> بيدّي:<span class=\"ltr\">1 + 12 = 13 ≤ 13,  5 + 8 = 13 ≤ 20</span>",
     "الـ <bdi dir=\"ltr\">(2,&nbsp;3.67)</bdi> مع <bdi dir=\"ltr\">Z&nbsp;=&nbsp;20.67</bdi> ده الـ parent node بتاع <bdi dir=\"ltr\">x1&nbsp;≤&nbsp;2</bdi>؛ لما تضيف <bdi dir=\"ltr\">x2&nbsp;≥&nbsp;4</bdi> الحل بيتنقل لـ <bdi dir=\"ltr\">(1,&nbsp;4)</bdi>.",
     "صح. على الخط <bdi dir=\"ltr\">x1&nbsp;+&nbsp;3x2&nbsp;=&nbsp;13</bdi> مع <bdi dir=\"ltr\">x2&nbsp;=&nbsp;4</bdi>، يبقى <bdi dir=\"ltr\">x1&nbsp;=&nbsp;1</bdi>؛ وده الـ optimum."
    ]
   ]
  },
  "7": {
   "notes": [
    {
     "h": "مصطلحات الـ Project (تعريفات Revision 1)"
    },
    {
     "h": "رسم الـ CPM network (قواعد السكشن)",
     "pts": [
      "المطلوب عادةً: ارسم الـ network؛ حدد الـ critical path ووقت الانتهاء؛ الـ earliest والـ latest times؛ الـ total floats؛ والـ activities الـ critical والـ non-critical.",
      "الـ activities اللي مالهاش predecessor بتطلع من <b>start node واحدة</b>؛ والـ activities اللي مش predecessor لحد بتدخل على <b>end node واحدة</b>.",
      "الـ activities اللي ليها نفس الـ predecessors بتبدأ من نفس الـ node (مثلًا D و E و F كلهم بعد C، فبيطلعوا من الـ end node بتاعة C).",
      "مينفعش اتنين activities يبقى ليهم نفس الـ start node ونفس الـ end node: افصل بينهم بـ node زيادة و <b>dummy</b>.",
      "استخدم dummy لما activity تعتمد على جزء بس من مجموعة (مثلًا F بعد C بس، لكن D بعد A و C): وصّل بسهم dummy متقطع."
     ]
    },
    {
     "h": "معادلات الأوقات"
    },
    {
     "h": "مثال محلول (من الـ <bdi dir=\"ltr\">Final&nbsp;2019/20</bdi>، سكشن):<span class=\"ltr\">A 15; B 17 (A); C 21 (A); D 19 (B); E 22 (B); F 18 (C, D); G 15 (E, F)</span>"
    },
    {
     "h": "نتيجة المثال"
    },
    {
     "h": "مثال السكشن:<span class=\"ltr\">A 5; B 7 (A); C 10 (A); D 2 (B); E 8 (C); F 10 (C); G 5 (D, E, F); H 3 (G)</span>"
    },
    {
     "h": "امتحان الـ <bdi dir=\"ltr\">Final&nbsp;2024/25</bdi> (بالأيام):<span class=\"ltr\">A 6; G 2; J 13; B 4 (A); C 7 (B); D 2 (A); E 4 (D); F 10 (E); H 10 (G); I 6 (J, H); K 9 (A); L 3 (C, K); M 5 (I, L)</span>"
    },
    {
     "h": "نتيجة الـ <bdi dir=\"ltr\">Final&nbsp;2024/25</bdi>"
    },
    {
     "h": "امتحان الـ <bdi dir=\"ltr\">Final&nbsp;2023/24</bdi> (سنة تالتة):<span class=\"ltr\">A 3; B 3 (A); C 3 (A); D 5 (C); E 6 (B, C); F 9 (D, E); G 5 (E); H 3 (G); I 5 (G, F); J 6 (I, H); K 4 (J)</span>"
    },
    {
     "h": "امتحان الـ <bdi dir=\"ltr\">Final&nbsp;2023/24</bdi> (سنة تانية):<span class=\"ltr\">A 5; B 5; C 2 (B); D 2 (A, C); E 3 (A, C); F 1 (A, C); G 2 (B); H 7 (B); I 13 (E); J 6 (E, D); K 4 (F, G, H); L 5 (H); M 5 (J, K, L)</span>"
    }
   ],
   "cards": [
    "مجموعة activities مرتبطة ببعض بتتنفذ بترتيب معين قبل ما الشغلانة كلها تخلص.",
    "شغلانة محتاجة وقت و resources عشان تخلص.",
    "لازم تخلص مباشرةً قبل ما activity تانية تبدأ.",
    "ماينفعش تبدأ غير لما activity تانية من الـ activities تخلص.",
    "مالهاش predecessor.",
    "مابتستهلكش أي resources؛ بس بتوضح الـ technological dependence.",
    "تسلسل متصل من nodes و activities بالتبادل، من الـ start event لحد الـ end event.",
    "تحديد الوقت اللازم لإنهاء الـ project، والـ activities المهمة اللي المدير لازم يركز عليها.",
    "ماينفعش تتأخر؛ والـ total float بتاعها بيساوي 0.",
    "التأخير في انتهاء activity اللي مابيأثرش على انتهاء الـ project (LS − ES).",
    "التأخير اللي مابيأثرش على الـ earliest start بتاع الـ immediate successors.",
    "الوقت اللازم لإنهاء كل الـ activities من الـ start للـ end event، وهو أطول path.",
    "بيساوي:<span class=\"ltr\">EF = ES + duration</span>يعني الـ ES + المدة.",
    "بيساوي:<span class=\"ltr\">LS = LF − duration</span>يعني الـ LF − المدة.",
    "أكبر EF من الـ activities الداخلة.",
    "أصغر LS من الـ activities الخارجة.",
    "تقدير واحد؛ deterministic.",
    "الـ Critical path هو <bdi dir=\"ltr\">A‑B‑D‑F‑G</bdi>، و84 شهر."
   ],
   "qa": [
    "الـ predecessor activity لازم تخلص مباشرةً قبل ما activity تانية تبدأ. (والعكس بتاعها، الـ successor activity، ماينفعش تبدأ غير لما activity تانية تخلص.)",
    "الـ path في الـ network هو تسلسل متصل من nodes و activities بالتبادل، بيبدأ من الـ start event وبيقف عند الـ end event بتاع الـ network.",
    "الـ Total float: الوقت اللي ممكن انتهاء الـ activity يتأخره من غير ما يأثر على انتهاء الـ project:<span class=\"ltr\">TF = LS − ES = LF − EF</span>الـ Free float: الوقت اللي ممكن انتهاء الـ activity يتأخره من غير ما يأثر على الـ earliest start time بتاع الـ immediate successors:<span class=\"ltr\">FF = min ES(successors) − EF</span>",
    "فيه start node واحدة (الـ activities اللي مالهاش predecessors بتطلع منها) و end node واحدة (الـ activities اللي مش قبل أي حاجة بتدخل عليها). كل activity سهم بين اتنين nodes؛ والـ activities اللي ليها نفس الـ predecessors بتطلع من نفس الـ node. مينفعش اتنين activities يشتركوا في الـ start والـ end nodes مع بعض: حط node و dummy. واستخدم الـ dummies (مدتها صفر ومن غير resources) عشان توضح الاعتماد على جزء من مجموعة.",
    "الـ Forward pass:<span class=\"ltr\">A 0–15, B 15–32, C 15–36, D 32–51, E 32–54, F 51–69, G 69–84</span>الـ Backward:<span class=\"ltr\">G 69–84, F 51–69, E 47–69, D 32–51, C 30–51, B 15–32, A 0–15</span>الـ Floats:<span class=\"ltr\">C 15, E 15</span>والباقي 0. الـ Critical path هو:<span class=\"ltr\">A-B-D-F-G = 84</span>",
    "الـ CPM بيستخدم تقدير وقت واحد (deterministic) لكل activity، من غير ما يحسب حساب لعدم التأكد. الـ PERT بيستخدم تلات تقديرات (الـ optimistic، والـ most likely، والـ pessimistic) وبيتعامل مع الوقت على إنه probabilistic، فتقدر تحسب احتمال إنك تخلص قبل تاريخ معين."
   ],
   "quiz": [
    [
     "الـ successor ماينفعش تبدأ غير لما activity تانية تخلص.",
     "صح. الـ dummy activity (سهم متقطع ووقته صفر) مابتستهلكش أي resources، هي بس بتوضح الـ technological dependence بين الـ activities (L7, Network terms).",
     "الـ predecessor لازم تخلص مباشرةً قبل activity تانية.",
     "الـ critical activity دي واقعة على الـ critical path والـ float بتاعها صفر؛ بس هي بتاخد وقت وresources حقيقية، عكس الـ dummy خالص."
    ],
    [
     "الـ Free float بيحمي الـ earliest start بتاع الـ immediate successors.",
     "الـ project completion time هو طول أطول path (الـ critical path)، يعني الوقت اللازم لإنهاء كل الـ activities، مش مقدار التأخير المسموح بيه.",
     "صح. الـ Total float:<span class=\"ltr\">TF = LS − ES = LF − EF</span>يعني الـ activity تقدر تتأخر قد إيه في إنهاءها من غير ما المشروع كله يتأخر (من <bdi dir=\"ltr\">L7,&nbsp;Floats</bdi>).",
     "الـ dummy activity ده سهم وقته صفر بيوضح الـ dependence بس؛ مش مقدار وقت أصلًا."
    ],
    [
     "صح. ده تعريف المحاضرة للـ total float (<bdi dir=\"ltr\">TF&nbsp;=&nbsp;LF&nbsp;−&nbsp;EF</bdi>): التأخير اللي الـ activity تستحمله من غير ما الـ project completion يتأخر (من <bdi dir=\"ltr\">L7,&nbsp;Floats</bdi>).",
     "لو قلت False تبقى رفضت تعريف المحاضرة للـ total float، اللي بيحمي الـ project completion time (أما الـ free float فبيحمي الـ ES بتاع الـ successors)."
    ],
    [
     "جملة «مايبدأش غير لما activity تانية تخلص» دي تعريف الـ SUCCESSOR؛ الـ predecessor هو اللي لازم يخلص قبل ما activity تانية تبدأ على طول.",
     "صح. الـ predecessor لازم تخلص مباشرةً قبل ما activity تانية تبدأ."
    ],
    [
     "صح. الـ Free float بيساوي الـ ES بتاع الـ immediate successors ناقص الـ EF بتاع الـ activity:<span class=\"ltr\">FF = ES(successors) − EF</span>يعني التأخير المسموح من غير ما يأثر على الـ earliest start لأي successor (من <bdi dir=\"ltr\">L7,&nbsp;Floats</bdi>).",
     "لو قلت False تبقى رفضت تعريف المحاضرة للـ free float، اللي بيتقاس بالنسبة للـ earliest start بتاع الـ immediate successors."
    ],
    [
     "جملة «<bdi dir=\"ltr\">combinations of interrelated activities executed in a certain order</bdi>» دي تعريف الـ PROJECT؛ الـ operations research بيهتم بالتصميم والتشغيل العلمي للـ man-machine systems.",
     "صح. ده تعريف الـ <b>project</b>."
    ],
    [
     "الجملة دي تعريف الـ PROJECT؛ أما الـ CPM فهو الطريقة اللي بتحسب وقت المشروع وبتطلّع الـ critical activities.",
     "صح. الـ CPM هدفه تحديد وقت الـ project والـ activities المهمة."
    ],
    [
     "إنها ماتستهلكش resources وبس توضح الـ dependence ده تعريف الـ DUMMY activity؛ الـ start activity هي اللي ملهاش predecessor.",
     "صح. الـ start activity مالهاش predecessor؛ والجملة دي تعريف الـ dummy."
    ],
    [
     "«لازم تخلص قبل بداية activity تانية على طول» ده تعريف الـ PREDECESSOR؛ الـ dummy وقتها صفر وبتوضح الـ dependence بس.",
     "صح. الـ dummy مابتستهلكش resources وبس بتوضح الـ dependence."
    ],
    [
     "صح. الـ successor activity ماينفعش تبدأ غير لما activity أو أكتر (الـ predecessors بتوعها) يخلصوا (L7, Network terms).",
     "لو قلت False تبقى رفضت تعريف المحاضرة: الـ successor بالظبط هي الـ activity اللي مستنية غيرها يخلص."
    ],
    [
     "صح. الـ path هو تسلسل متصل من nodes وactivities بالتبادل، من الـ start event لحد الـ end event بتاع الـ network (L7, Network terms).",
     "لو قلت False تبقى رفضت تعريف المحاضرة للـ path: سلسلة متصلة من nodes وactivities من الـ start event للـ end event."
    ],
    [
     "صح. تعريف 31 في Revision 1: الـ CPM هدفه يحدد الـ project completion time والـ activities المهمة (الـ critical) اللي المدير لازم يركز عليها (L7).",
     "لو قلت False تبقى رفضت تعريف Revision 1: الـ CPM بيحدد الـ completion time والـ critical activities اللي محتاجة اهتمام."
    ],
    [
     "الـ critical path هو <b>أطول</b> path في الـ network؛ طوله هو اللي بيحدد الـ project completion time، فمش «الأسهل» خالص.",
     "صح. الـ critical path هو <b>أطول</b> path (هو اللي بيحدد وقت الانتهاء)."
    ],
    [
     "التأخير من غير ما يأثر على بداية الـ activities اللي بعدها ده الـ FREE float؛ الـ total float بيتقاس بالنسبة للـ project completion time.",
     "صح. التأخير اللي مابيأثرش على بداية الـ successors اسمه free float؛ والـ total float بيحمي انتهاء الـ project."
    ],
    [
     "صح. الـ CPM اختصار Critical Path Method، وهي تقنية الـ project scheduling اللي بتطلّع الـ critical path ومدة المشروع (L7).",
     "الإجابة False غلط: في الـ project management الـ CPM هي بالظبط الـ Critical Path Method اللي اتشرحت في <bdi dir=\"ltr\">L7</bdi>."
    ],
    [
     "صح. أطول path هو:<span class=\"ltr\">A-B-C-L-M = 25</span>والخمسة الـ float بتاعهم صفر.",
     "الإجابة False غلط: الـ forward والـ backward passes بيدّوا <bdi dir=\"ltr\">TF&nbsp;=&nbsp;0</bdi> لـ A و B و C و L و M، وده أطول path:<span class=\"ltr\">A-B-C-L-M = 25</span>"
    ],
    [
     "صح. أطول path هو:<span class=\"ltr\">A-B-C-L-M = 6 + 4 + 7 + 3 + 5 = 25</span>يعني 25 يوم، فالـ <bdi dir=\"ltr\">EF(M)&nbsp;=&nbsp;25</bdi> هو الـ completion time (من <bdi dir=\"ltr\">L7,&nbsp;forward&nbsp;pass</bdi>).",
     "الإجابة False غلط: <bdi dir=\"ltr\">A‑B‑C‑L‑M&nbsp;=&nbsp;25</bdi> هو أطول path؛ الـ paths التانية زي <bdi dir=\"ltr\">J‑I‑M&nbsp;(24)</bdi> أو <bdi dir=\"ltr\">A‑D‑E‑F&nbsp;(22)</bdi> أقصر."
    ],
    [
     "كلهم بيـ<i>بدأوا</i> عند 0 (الـ ES)، بس الـ LFs بتاعتهم مختلفة.",
     "صح. A و G و J كلهم الـ ES بتاعهم 0، بس الـ backward pass بيدّي:<span class=\"ltr\">LF(A) = 6</span><span class=\"ltr\">LF(G) = LS(H) = 4</span><span class=\"ltr\">LF(J) = LS(I) = 14</span>يعني مختلفين <bdi dir=\"ltr\">(L7)</bdi>."
    ],
    [
     "صح. الـ predecessor الوحيد لـ E هو D:<span class=\"ltr\">ES(D) = EF(A) = 6</span><span class=\"ltr\">EF(D) = 6 + 2 = 8</span>فـ <bdi dir=\"ltr\">ES(E)&nbsp;=&nbsp;8</bdi> (من <bdi dir=\"ltr\">L7,&nbsp;forward&nbsp;pass</bdi>).",
     "الإجابة False غلط: E جاية بعد D بس، و:<span class=\"ltr\">EF(D) = ES(D) + 2 = 6 + 2 = 8</span>فـ <bdi dir=\"ltr\">ES(E)&nbsp;=&nbsp;8</bdi>."
    ],
    [
     "الـ 9 دي مدة K؛ الـ EF بتاعها <bdi dir=\"ltr\">6&nbsp;+&nbsp;9&nbsp;=&nbsp;15</bdi> والـ LF:<span class=\"ltr\">LF = LS(L) = 17</span>فـ «<bdi dir=\"ltr\">LF&nbsp;=&nbsp;9</bdi>» غلط.",
     "صح. الـ successor الوحيد لـ K هو L، و:<span class=\"ltr\">LS(L) = 20 − 3 = 17</span>فـ <bdi dir=\"ltr\">LF(K)&nbsp;=&nbsp;17</bdi>، والـ <bdi dir=\"ltr\">EF(K)&nbsp;=&nbsp;15</bdi> والـ <bdi dir=\"ltr\">TF&nbsp;=&nbsp;2</bdi> (من <bdi dir=\"ltr\">L7,&nbsp;backward&nbsp;pass</bdi>)."
    ],
    [
     "الـ 20 دي الـ ES بتاع M (اللي بيساوي الـ LS) عشان M critical؛ أما الـ LF بتاعها فبيساوي الـ project completion time اللي هو 25.",
     "صح. M آخر activity، فالـ backward pass بيبدأ بـ:<span class=\"ltr\">LF(M) = project time = 25</span>والـ <bdi dir=\"ltr\">ES&nbsp;=&nbsp;LS&nbsp;=&nbsp;20</bdi> (من <bdi dir=\"ltr\">L7</bdi>)."
    ],
    [
     "الـ 11 ده <bdi dir=\"ltr\">EF(D)</bdi> بس؛ F مستنية E كمان اللي بتخلص عند 12، والـ ES بيساوي أكبر EF للـ predecessors.",
     "صح. الحساب:<span class=\"ltr\">ES(F) = max(EF D = 11, EF E = 12) = 12</span>"
    ],
    [
     "الـ C مش non-critical، لأن:<span class=\"ltr\">ES(C) = LS(C) = 3  (TF = 0)</span>على الـ path:<span class=\"ltr\">A-C-E-F-I-J-K = 36</span>الـ non-critical هم D (<bdi dir=\"ltr\">TF&nbsp;1</bdi>) و G (4) و H (6).",
     "صح. الـ C critical (<bdi dir=\"ltr\">A‑C‑E‑F‑I‑J‑K&nbsp;=&nbsp;36</bdi>)؛ والـ non-critical هم D و G و H."
    ],
    [
     "صح. أطول path هو:<span class=\"ltr\">A-C-E-F-I-J-K = 3 + 3 + 6 + 9 + 5 + 6 + 4 = 36</span>فالمشروع بياخد 36 (من <bdi dir=\"ltr\">L7,&nbsp;forward&nbsp;pass</bdi>).",
     "الإجابة False غلط: الـ forward pass بيدّي <bdi dir=\"ltr\">EF(K)&nbsp;=&nbsp;36</bdi>، وده طول الـ critical path <bdi dir=\"ltr\">A‑C‑E‑F‑I‑J‑K</bdi>."
    ],
    [
     "الـ forward pass بيخلص عند <bdi dir=\"ltr\">EF(I)&nbsp;=&nbsp;23</bdi>؛ أطول path هو:<span class=\"ltr\">B-C-E-I = 5 + 2 + 3 + 13 = 23</span>مش 32.",
     "صح. في الـ forward pass الـ C بتخلص عند 7، و E عند 10، و I عند <bdi dir=\"ltr\">10&nbsp;+&nbsp;13&nbsp;=&nbsp;23</bdi>، أما M فبتخلص عند 22 بس، فالـ completion time هو 23 عن طريق <bdi dir=\"ltr\">B‑C‑E‑I</bdi> (من <bdi dir=\"ltr\">L7</bdi>)."
    ],
    [
     "الـ H مش critical، لأن:<span class=\"ltr\">ES(H) = 5, LS(H) = 6  →  TF = 1</span>(الـ path <bdi dir=\"ltr\">B‑H‑L‑M&nbsp;=&nbsp;22&nbsp;&lt;&nbsp;23</bdi>). اللي الـ float بتاعهم صفر هم B و C و E و I بس.",
     "صح. B و C و E و I بس اللي عندهم <bdi dir=\"ltr\">TF&nbsp;=&nbsp;0</bdi> (الـ path <bdi dir=\"ltr\">B‑C‑E‑I&nbsp;=&nbsp;23</bdi>)؛ الـ H عندها <bdi dir=\"ltr\">TF&nbsp;=&nbsp;1</bdi> عشان <bdi dir=\"ltr\">B‑H‑L‑M</bdi> طوله 22 بس <bdi dir=\"ltr\">(L7)</bdi>."
    ],
    [
     "الـ C جاية بعد B بس، فـ <bdi dir=\"ltr\">ES(C)&nbsp;=&nbsp;5</bdi>؛ أما D و E فمستنيين A و C الاتنين، فـ:<span class=\"ltr\">ES(D) = ES(E) = EF(C) = 7</span>",
     "صح. الحساب:<span class=\"ltr\">ES(C) = EF(B) = 5</span>بينما D و E محتاجين A (5) و C (7) الاتنين:<span class=\"ltr\">ES(D) = ES(E) = max(5, 7) = 7</span>فالتلاتة مش متساويين <bdi dir=\"ltr\">(L7)</bdi>."
    ],
    [
     "صح. الـ B أول الـ critical path <bdi dir=\"ltr\">B‑C‑E‑I&nbsp;(23)</bdi>، فـ:<span class=\"ltr\">ES(B) = LS(B) = 0  →  TF(B) = 0</span>من <bdi dir=\"ltr\">L7</bdi>.",
     "الإجابة False غلط: الـ B واقعة على الـ critical path <bdi dir=\"ltr\">B‑C‑E‑I</bdi>، وأي critical activity الـ total float بتاعها صفر."
    ],
    [
     "صح. الـ project هو مجموعة activities مرتبطة ببعض بتتنفذ بترتيب معين قبل ما الشغل كله يخلص (من <bdi dir=\"ltr\">L7</bdi>؛ وفي توصيل <bdi dir=\"ltr\">2023/24</bdi> الإجابة <bdi dir=\"ltr\">4&nbsp;→&nbsp;E</bdi>).",
     "التأخير المسموح من غير ما يأثر على الـ project completion ده الـ total float، مش الـ project.",
     "المنطقة المشتركة اللي بتحددها كل الـ constraints دي الـ feasible region في الـ LP (L2).",
     "الـ integer program اللي فيه بعض الـ variables بس integers ده الـ mixed IP (L6)."
    ]
   ],
   "extra": [
    [
     "الـ 8 ده طول الـ path <bdi dir=\"ltr\">A‑C‑E</bdi> بس (<bdi dir=\"ltr\">3&nbsp;+&nbsp;2&nbsp;+&nbsp;3</bdi>)؛ المشروع بياخد قد <b>أطول</b> path، اللي هو <bdi dir=\"ltr\">B‑D‑E&nbsp;=&nbsp;12</bdi>.",
     "صح. أطول path هو:<span class=\"ltr\">B-D-E = 4 + 5 + 3 = 12</span>",
     "الـ 11 ده الـ path <bdi dir=\"ltr\">A‑D‑E (3&nbsp;+&nbsp;5&nbsp;+&nbsp;3)</bdi>؛ بس ده أطول:<span class=\"ltr\">B-D-E = 4 + 5 + 3 = 12</span>فهو اللي بيحدد وقت المشروع.",
     "الـ 17 ده مجموع كل المدد؛ الـ activities اللي على paths مختلفة بتشتغل parallel، فالوقت هو أطول path، يعني 12."
    ],
    [
     "الـ A مش critical:<span class=\"ltr\">EF(A) = 3, LF(A) = LS(D) = 4</span>فعندها float وحدة واحدة (الـ critical path هو <bdi dir=\"ltr\">B‑D‑E</bdi>).",
     "الـ 4 ده الـ total float بتاع C (<bdi dir=\"ltr\">9&nbsp;−&nbsp;5</bdi>)؛ الـ A محكومة بـ D:<span class=\"ltr\">LF(A) = LS(D) = 4, EF(A) = 3  →  TF(A) = 1</span>",
     "صح. الحساب:<span class=\"ltr\">LF(A) = min(LS C = 7, LS D = 4) = 4</span><span class=\"ltr\">EF(A) = 3;  TF = 1</span>",
     "الـ 3 دي مدة A؛ الـ total float:<span class=\"ltr\">TF = LF − EF = 4 − 3 = 1</span>"
    ],
    [
     "صح. الحساب:<span class=\"ltr\">ES = 3, EF = 5, LF = LS(E) = 9</span><span class=\"ltr\">TF = 9 − 5 = 4</span>",
     "الـ C مش critical: ممكن تخلص متأخر لحد <bdi dir=\"ltr\">LS(E)&nbsp;=&nbsp;9</bdi> بس هي بتخلص بدري عند 5، فـ <bdi dir=\"ltr\">TF&nbsp;=&nbsp;4</bdi>.",
     "الـ 2 دي مدة C، مش الـ float بتاعها:<span class=\"ltr\">TF = LF − EF = 9 − 5 = 4</span>",
     "الـ 7 ده:<span class=\"ltr\">LS(C) = LF − duration = 9 − 2</span>والـ total float:<span class=\"ltr\">LS − ES = 7 − 3 = 4</span>"
    ],
    [
     "لو بدأت عند 11 هتبدأ قبل ما الـ predecessor التاني يخلص عند 12؛ الـ ES بيساوي <b>أكبر</b> EF لكل الـ predecessors.",
     "الـ 23 (يعني <bdi dir=\"ltr\">11&nbsp;+&nbsp;12</bdi>) جمعت الوقتين؛ الـ predecessors بيشتغلوا parallel، فـ:<span class=\"ltr\">ES = max(11, 12) = 12</span>",
     "المتوسط هنا مالوش أي معنى: الـ activity لازم تستنى الـ predecessor اللي بيخلص متأخر، فـ:<span class=\"ltr\">ES = max(11, 12) = 12</span>",
     "صح. قاعدة الـ forward pass: الـ activity ماتبدأش غير لما <b>كل</b> الـ predecessors بتوعها يخلصوا، فـ:<span class=\"ltr\">ES = max(EF) = max(11, 12) = 12</span>من <bdi dir=\"ltr\">L7</bdi>."
    ],
    [
     "المدة الطويلة بتتكتب ببساطة كرقم على السهم؛ الـ dummies ليها علاقة بالـ dependence، مش بالمدة.",
     "صح. الـ dummy بنحتاجها عشان اتنين activities مايبقاش ليهم نفس الـ start node ونفس الـ end node، أو عشان نوضح إن activity معتمدة على جزء بس من مجموعة activities تانية (L7, network rules).",
     "وجود اتنين critical paths معناه بس اتنين paths طولهم واحد والـ float بتاعهم صفر؛ رسمهم مش محتاج أي سهم dummy.",
     "الـ activity اللي ملهاش predecessor دي start activity وبتطلع من الـ start node على طول؛ مش محتاجة dummy."
    ],
    [
     "الـ C عندها وقت فاضي فعلًا: E مش هتبدأ قبل 9 (مستنية D)، والـ C بتخلص عند 5، فـ:<span class=\"ltr\">FF = 9 − 5 = 4</span>",
     "الـ 1 ده الـ total float بتاع A؛ الـ free float بتاع C:<span class=\"ltr\">FF = ES(E) − EF(C) = 9 − 5 = 4</span>",
     "صح. الـ Free float بيساوي الـ ES بتاع الـ successor ناقص الـ EF بتاع الـ activity:<span class=\"ltr\">ES(E) = max(5, 9) = 9</span><span class=\"ltr\">EF(C) = 3 + 2 = 5</span>فـ <bdi dir=\"ltr\">FF&nbsp;=&nbsp;4</bdi> (من <bdi dir=\"ltr\">L7,&nbsp;Floats</bdi>).",
     "الـ 2 دي مدة C، مش الـ float بتاعها:<span class=\"ltr\">FF = ES(E) − EF(C) = 9 − 5 = 4</span>"
    ],
    [
     "صح. في الـ backward pass الـ latest start بيساوي الـ latest finish ناقص المدة:<span class=\"ltr\">LS = LF − t</span>من <bdi dir=\"ltr\">L7</bdi>.",
     "الـ ES + duration ده الـ EARLIEST FINISH (EF) من الـ forward pass، مش الـ latest start.",
     "الـ <bdi dir=\"ltr\">LF&nbsp;−&nbsp;ES</bdi> بيخلط وقت من الـ backward بوقت من الـ forward ومالوش معنى؛ الصح:<span class=\"ltr\">LS = LF − duration</span>",
     "الـ <bdi dir=\"ltr\">EF&nbsp;−&nbsp;LF</bdi> ده سالب الـ total float (<bdi dir=\"ltr\">TF&nbsp;=&nbsp;LF&nbsp;−&nbsp;EF</bdi>)، مش وقت بداية؛ الصح:<span class=\"ltr\">LS = LF − duration</span>"
    ],
    [
     "الـ <bdi dir=\"ltr\">A‑C‑E</bdi> طوله 8 بس؛ الـ critical path هو الأطول، <bdi dir=\"ltr\">B‑D‑E&nbsp;=&nbsp;12</bdi>، والـ A و C الـ floats بتاعتهم 1 و 4.",
     "الـ <bdi dir=\"ltr\">A‑D‑E&nbsp;=&nbsp;11</bdi> أقصر من <bdi dir=\"ltr\">B‑D‑E&nbsp;=&nbsp;12</bdi>، فالـ A عندها float 1 ومش critical.",
     "الـ A (TF 1) والـ C (TF 4) ليهم float موجب، فالـ critical هم B و D و E بس اللي على أطول path.",
     "صح. الـ float صفر على أطول path اللي هو B-D-E."
    ],
    [
     "صح. قاعدة الـ network: كل الـ starting activities بتطلع من start node واحدة، وكل الـ final activities بتنتهي في end node واحدة (L7, section rules).",
     "كل الـ activities اللي ملهاش predecessors بتطلع من <b>نفس</b> الـ start node؛ لو عملت start nodes منفصلة هتكسر قاعدة الـ start الواحدة.",
     "الـ network لازم يبقى فيها start node واحدة بالظبط و end node واحدة، فـ «أي عدد» غلط.",
     "اتنين start أو end nodes بيكسروا قاعدة إن فيه start event واحد و end event واحد بس."
    ],
    [
     "الـ 12 ده طول الـ critical path <bdi dir=\"ltr\">B‑D‑E</bdi>؛ أما:<span class=\"ltr\">A-C-E = 3 + 2 + 3 = 8</span>",
     "الـ 10 ده غلطة في الجمع:<span class=\"ltr\">A-C-E = 3 + 2 + 3 = 8</span>",
     "صح. طول الـ path هو مجموع مدد الـ activities اللي عليه:<span class=\"ltr\">A (3) + C (2) + E (3) = 8</span>من <bdi dir=\"ltr\">L7</bdi>.",
     "الـ 5 ده حسب A و C بس (<bdi dir=\"ltr\">3&nbsp;+&nbsp;2</bdi>)؛ الـ path بيكمل لحد الـ end event عن طريق E، فـ:<span class=\"ltr\">3 + 2 + 3 = 8</span>"
    ]
   ]
  },
  "8": {
   "notes": [
    {
     "h": "فكرة الـ PERT والتلات تقديرات للوقت",
     "pts": [
      "في الـ <b>CPM</b> الوقت <b>deterministic</b>، تقدير واحد لكل activity. وفي الـ <b>PERT</b> الوقت <b>probabilistic</b>، وفيه تلات تقديرات ممكنة للـ activities اللي بتربط بين اتنين events.",
      "الـ <b>Optimistic time</b> (<bdi dir=\"ltr\">O, t<sub>o</sub></bdi>): التقدير في <b>أحسن</b> الظروف (كل حاجة ماشية تمام).",
      "الـ <b>Most likely time</b> (<bdi dir=\"ltr\">M, t<sub>m</sub></bdi>): التقدير في الظروف <b>العادية (normal)</b>.",
      "الـ <b>Pessimistic time</b> (<bdi dir=\"ltr\">P, t<sub>p</sub></bdi>): التقدير في <b>أسوأ</b> الظروف.",
      "الأسئلة المعتادة: ارسم الـ network؛ الـ expected duration والـ variance لكل activity؛ الـ critical path ووقت انتهاء الـ project؛ واحتمال إن الـ project يخلص في تاريخ معين أو قبله."
     ],
     "figH": {
      "or-pert-three": "كل activity ليها تلات تقديرات: الـ O والـ M والـ P على خط الوقت، وبعدين الـ te والـ σ²"
     }
    },
    {
     "h": "معادلات الـ PERT",
     "figH": {
      "or-pert-formula": "حاسبة الـ te والـ σ²: activities من الـ notes أو تلات تقديرات من عندك",
      "or-pert-prob": "من الـ μ والـ σ² والـ X للاحتمال: الـ z والـ normal table والمساحة المظللة"
     }
    },
    {
     "h": "مثال المحاضرة: الـ expected times والـ variances",
     "figH": {
      "or-pert-table-lec": "جدول المحاضرة بيتملي صف صف: الـ te والـ σ² من A لـ J"
     }
    },
    {
     "h": "مثال المحاضرة: الـ critical path والاحتمال (في 22 أسبوع أو قبلها)",
     "figH": {
      "or-pert-net": "الـ network بتاعة المحاضرة: كل مسار والـ critical path والـ σ واحتمال إنه يخلص في 22 أسبوع"
     }
    },
    {
     "h": "امتحان الـ <bdi dir=\"ltr\">Final&nbsp;2021/22</bdi> والـ Revision: مشروع بناء، سنتين (104 أسابيع)",
     "figH": {
      "or-pert-table-rev": "جدول مشروع البناء بيتملي صف صف"
     }
    },
    {
     "h": "إجابة الـ 104 أسبوع",
     "figH": {
      "or-pert-paths-rev": "المسارات الستة كأعمدة، والـ critical path، وبعدين الـ σ² واحتمال إنه يخلص في 104 أسبوع"
     }
    },
    {
     "h": "إجابات PERT تانية من الامتحانات (متراجعة)",
     "figH": {
      "or-pert-solver": "حلّال PERT: مشاريع الامتحانات أو جدول من عندك"
     }
    }
   ],
   "cards": [
    "اختصار لـ:<span class=\"ltr\">Project Evaluation and Review Technique</span>",
    "التقدير في أحسن الظروف.",
    "التقدير في الظروف العادية.",
    "التقدير في أسوأ الظروف.",
    "بيساوي:<span class=\"ltr\">te = (to + 4tm + tp) / 6</span>",
    "بيساوي:<span class=\"ltr\">σ² = ((tp − to) / 6)²</span>",
    "مجموع الـ variances بتاعة الـ critical activities بس.",
    "مجموع الـ expected times على الـ critical path.",
    "بيساوي:<span class=\"ltr\">z = (X − μ) / σ</span>",
    "يعني:<span class=\"ltr\">P(T ≤ X)</span>",
    "0.5 + المساحة من الجدول.",
    "0.5 − المساحة من الجدول.",
    "الوقت فيه Probabilistic (تلات تقديرات).",
    "الإجابة:<span class=\"ltr\">C-F-H-J, μ = 17, σ = 2.19</span><span class=\"ltr\">P(≤ 22) = 0.9887</span>",
    "الإجابة:<span class=\"ltr\">μ = 99.83, σ = 9.48, z = 0.44, P = 0.67</span>"
   ],
   "qa": [
    "الـ PERT (Project Evaluation and Review Technique) بيستخدم تلات تقديرات للوقت لكل activity بتربط بين اتنين events، فوقت الـ activity بيبقى probabilistic: الـ optimistic time (أحسن الظروف)، والـ most likely time (الظروف العادية)، والـ pessimistic time (أسوأ الظروف).",
    "المعادلات:<span class=\"ltr\">te = (to + 4tm + tp)/6</span><span class=\"ltr\">σ² = ((tp − to)/6)²</span>الـ μ بتاع الـ project هو مجموع الـ te على الـ critical path، والـ σ² بتاع الـ project هو مجموع الـ variances بتاعة الـ critical activities:<span class=\"ltr\">μ = Σ te,  σ² = Σ variances</span><span class=\"ltr\">z = (X − μ)/σ</span><span class=\"ltr\">P(T ≤ X) = 0.5 ± table area</span>يعني 0.5 زائد مساحة الجدول لو <bdi dir=\"ltr\">z&nbsp;&gt;&nbsp;0</bdi>، وناقصها لو <bdi dir=\"ltr\">z&nbsp;&lt;&nbsp;0</bdi>.",
    "الـ Critical path هو <bdi dir=\"ltr\">A‑C‑E‑G‑H‑J</bdi> و <bdi dir=\"ltr\">μ&nbsp;=&nbsp;99.83</bdi> أسبوع.<span class=\"ltr\">σ² = 12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86</span><span class=\"ltr\">σ = 9.48</span><span class=\"ltr\">z = (104 − 99.83)/9.48 = 0.44</span><span class=\"ltr\">P = 0.5 + 0.17 = 0.67</span>",
    "مدة الـ project بتساوي طول الـ critical path، فالعشوائية بتاعتها جاية من الـ activities اللي على الـ path ده. ولو افترضنا إن أوقات الـ activities مستقلة، يبقى variance المجموع بيساوي مجموع الـ variances الـ critical.",
    "الـ te والـ σ² لكل activity:<span class=\"ltr\">te/σ²: A 4/1, B 7/4, C 11/16, D 9/1, E 14/16, F 6/4</span>الـ Paths:<span class=\"ltr\">A-C-D-F = 30, A-C-E = 29, B-D-F = 22, B-E = 21</span>الـ Critical هو <bdi dir=\"ltr\">A‑C‑D‑F</bdi> وفيه:<span class=\"ltr\">μ = 30, σ² = 22, σ = 4.69</span><span class=\"ltr\">z = 4/4.69 = 0.85,  P = 0.5 + 0.3023 = 0.80</span>"
   ],
   "quiz": [
    [
     "\"كل حاجة ماشية تمام\" ده وصف الـ optimistic time.",
     "صح. الـ Most likely معناها الظروف العادية؛ والظروف المثالية معناها optimistic."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">(1 + 16 + 7)/6 = 4</span><span class=\"ltr\">((7 − 1)/6)² = 1</span>",
     "الإجابة False غلط:<span class=\"ltr\">te = (a + 4m + b)/6 = (1 + 16 + 7)/6 = 4</span><span class=\"ltr\">σ² = ((b − a)/6)² = (6/6)² = 1</span>يعني القيمتين زي ما الجملة قالت بالظبط."
    ],
    [
     "الـ te صح:<span class=\"ltr\">te = (3 + 24 + 15)/6 = 7</span>بس الـ σ² مش 1:<span class=\"ltr\">σ² = ((15 − 3)/6)² = 2² = 4</span>فالجملة كلها False.",
     "صح. الحساب:<span class=\"ltr\">te = (3 + 24 + 15)/6 = 7</span>بس:<span class=\"ltr\">σ² = (12/6)² = 4</span>"
    ],
    [
     "الـ 27 دي الـ pessimistic time مش الـ te:<span class=\"ltr\">te = (3 + 36 + 27)/6 = 11</span><span class=\"ltr\">σ² = ((27 − 3)/6)² = 16</span>",
     "صح. الحساب:<span class=\"ltr\">te = (3 + 36 + 27)/6 = 11</span><span class=\"ltr\">σ² = (24/6)² = 16</span>"
    ],
    [
     "صح. الحساب:<span class=\"ltr\">te = (a + 4m + b)/6 = (6 + 48 + 30)/6 = 14</span><span class=\"ltr\">σ² = ((b − a)/6)² = (24/6)² = 16</span>من <bdi dir=\"ltr\">L8</bdi>، معادلات الـ PERT.",
     "الإجابة False غلط:<span class=\"ltr\">(6 + 4×12 + 30)/6 = 84/6 = 14</span><span class=\"ltr\">((30 − 6)/6)² = 4² = 16</span>نفس القيم اللي في الجملة بالظبط."
    ],
    [
     "الـ 22 ده الـ VARIANCE. نموذج الطلبة معلّمها True، بس ده خلط بين الـ variance والـ standard deviation.",
     "صح. الـ Project variance:<span class=\"ltr\">1 + 16 + 1 + 4 = 22</span>فـ:<span class=\"ltr\">σ = √22 = 4.69</span>"
    ],
    [
     "الـ 0.85 دي قيمة الـ z، يعني <bdi dir=\"ltr\">(34&nbsp;−&nbsp;30)/4.69</bdi>؛ الاحتمال نفسه بيساوي 0.5 + مساحة الجدول 0.3023:<span class=\"ltr\">P = 0.5 + 0.3023 ≈ 0.80</span>",
     "صح. الحساب:<span class=\"ltr\">z = (34 − 30)/4.69 = 0.85</span><span class=\"ltr\">P = 0.5 + 0.3023 = 0.80</span>"
    ],
    [
     "الـ te مش 7.5:<span class=\"ltr\">te = (4 + 4×7 + 10)/6 = 42/6 = 7</span>(أما الـ variance <bdi dir=\"ltr\">(6/6)²&nbsp;=&nbsp;1</bdi> فصح).",
     "صح. الحساب:<span class=\"ltr\">te = (4 + 28 + 10)/6 = 7</span><span class=\"ltr\">σ² = (6/6)² = 1</span>"
    ],
    [
     "صح. الحساب:<span class=\"ltr\">(6 + 40 + 20)/6 = 11</span><span class=\"ltr\">(14/6)² = 5.44</span>",
     "الإجابة False غلط:<span class=\"ltr\">te = (6 + 40 + 20)/6 = 11</span><span class=\"ltr\">σ² = ((20 − 6)/6)² = (14/6)² = 5.44</span>القيمتين زي ما الجملة قالت."
    ],
    [
     "الـ critical path هو <bdi dir=\"ltr\">A‑B‑D‑E</bdi> والـ te بتاعه:<span class=\"ltr\">5 + 7 + 11 + 6 = 29</span>فالـ project بياخد 29 أسبوع مش 28.",
     "صح. الـ te:<span class=\"ltr\">A 5, B 7, C 9, D 11, E 6</span>والـ paths:<span class=\"ltr\">A-B-D-E = 29,  A-C-E = 20</span>فوقت الانتهاء 29 مش 28 <bdi dir=\"ltr\">(L8)</bdi>."
    ],
    [
     "الـ C موجودة بس على الـ path:<span class=\"ltr\">A-C-E = 5 + 9 + 6 = 20</span>وده أقصر من الـ critical اللي هو 29، فـ:<span class=\"ltr\">TF(C) = 29 − 20 = 9</span>مش صفر.",
     "صح. الـ C مش على الـ critical path <bdi dir=\"ltr\">A‑B‑D‑E&nbsp;(29)</bdi>، وعندنا:<span class=\"ltr\">ES(C) = 5</span><span class=\"ltr\">LS(C) = LS(E) − 9 = 23 − 9 = 14</span>فالـ <bdi dir=\"ltr\">TF&nbsp;=&nbsp;9</bdi> (من <bdi dir=\"ltr\">L8</bdi>)."
    ],
    [
     "الـ 0.4893 دي مساحة الجدول بس بين 0 و <bdi dir=\"ltr\">z&nbsp;=&nbsp;2.30</bdi>؛ الاحتمال:<span class=\"ltr\">P(T ≤ 36) = 0.5 + 0.4893 = 0.9893</span>",
     "صح. الحساب:<span class=\"ltr\">z = (36 − 29)/√9.22 = 2.30</span><span class=\"ltr\">P = 0.5 + 0.4893 = 0.9893</span>"
    ],
    [
     "الـ te مش 1.5:<span class=\"ltr\">te = (7 + 4×16 + 28)/6 = 99/6 = 16.5</span>(أما الـ variance <bdi dir=\"ltr\">(21/6)²&nbsp;=&nbsp;12.25</bdi> فصح).",
     "صح. الحساب:<span class=\"ltr\">(7 + 64 + 28)/6 = 16.5</span><span class=\"ltr\">σ² = (21/6)² = 12.25</span>"
    ],
    [
     "الـ path ده ناقصه الـ G: الـ H معتمدة على الـ G، والـ G بتيجي بعد الـ E، فالـ critical path الصح هو A-C-E-G-H-J (99.83).",
     "صح. الـ critical path هو A-C-E-G-H-J (99.83)."
    ],
    [
     "لو جمعت الـ variances بتاعة الـ critical activities هتطلع:<span class=\"ltr\">12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86</span>مش 98.9.",
     "صح. الحساب:<span class=\"ltr\">12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86</span>"
    ],
    [
     "الـ 0.44 دي قيمة الـ z، يعني:<span class=\"ltr\">(104 − 99.83)/9.48</span>والاحتمال:<span class=\"ltr\">P = 0.5 + 0.17 = 0.67</span>",
     "صح. الحساب:<span class=\"ltr\">σ = √89.86 = 9.48</span><span class=\"ltr\">z = (104 − 99.83)/9.48 = 0.44</span>ومساحة الجدول 0.17، فـ:<span class=\"ltr\">P = 0.5 + 0.17 = 0.67</span>مش 0.44 <bdi dir=\"ltr\">(L8)</bdi>."
    ],
    [
     "الـ 0.33 جاية من إنك عكست معادلة الـ z؛ الصح:<span class=\"ltr\">z = (X − μ)/σ = (104 − 99.83)/9.48 = +0.44</span>وده بيدّي 0.67، مش <bdi dir=\"ltr\">−0.44</bdi>.",
     "الـ 0.17 دي مساحة الجدول بس بين 0 و <bdi dir=\"ltr\">z&nbsp;=&nbsp;0.44</bdi>؛ ولما <bdi dir=\"ltr\">X&nbsp;&gt;&nbsp;μ</bdi> لازم تزوّد 0.5، فـ <bdi dir=\"ltr\">P&nbsp;=&nbsp;0.67</bdi>.",
     "صح. الحساب:<span class=\"ltr\">z = (104 − 99.83)/9.48 = +0.44 → 0.5 + 0.17</span>",
     "الـ 0.44 دي قيمة الـ z نفسها؛ الاحتمال:<span class=\"ltr\">P = 0.5 + table(0.44) = 0.5 + 0.17 = 0.67</span>"
    ],
    [
     "صح. الحساب:<span class=\"ltr\">te = (2 + 4×4 + 6)/6 = 24/6 = 4</span><span class=\"ltr\">σ² = ((6 − 2)/6)² = (4/6)² = 0.44</span>من <bdi dir=\"ltr\">L8</bdi>، معادلات الـ PERT.",
     "الإجابة False غلط:<span class=\"ltr\">(2 + 16 + 6)/6 = 4</span><span class=\"ltr\">((6 − 2)/6)² = 0.44</span>القيمتين زي ما الجملة قالت."
    ],
    [
     "الـ te صح:<span class=\"ltr\">te = (1 + 8 + 3)/6 = 2</span>بس الـ σ² مش 0.44:<span class=\"ltr\">σ² = ((3 − 1)/6)² = (1/3)² = 0.11</span>",
     "صح. الحساب:<span class=\"ltr\">te = (1 + 4×2 + 3)/6 = 2</span>بس:<span class=\"ltr\">σ² = ((3 − 1)/6)² = 0.11</span>مش 0.44، فالجملة False <bdi dir=\"ltr\">(L8)</bdi>."
    ],
    [
     "الـ 4 دي الـ pessimistic time بتاع الـ G؛ الـ te:<span class=\"ltr\">te = (2 + 4×3 + 4)/6 = 18/6 = 3</span>(والـ variance 0.11 صح).",
     "صح. الـ te مش 4:<span class=\"ltr\">te = (2 + 12 + 4)/6 = 3</span>والـ σ²:<span class=\"ltr\">σ² = ((4 − 2)/6)² = 0.11</span>فالزوج <bdi dir=\"ltr\">(4,&nbsp;0.11)</bdi> غلط <bdi dir=\"ltr\">(L8)</bdi>."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">3 + 4 + 5 + 3 + 2 + 3 = 20</span>(والـ <bdi dir=\"ltr\">A‑B‑E‑G‑I‑J</bdi> و <bdi dir=\"ltr\">A‑C‑F‑H‑I‑J</bdi> كل واحد فيهم 19).",
     "الإجابة False غلط:<span class=\"ltr\">A-B-D-G-I-J = 3 + 4 + 5 + 3 + 2 + 3 = 20</span>وده أطول path؛ أما <bdi dir=\"ltr\">A‑B‑E‑G‑I‑J</bdi> و <bdi dir=\"ltr\">A‑C‑F‑H‑I‑J</bdi> فكل واحد فيهم 19."
    ],
    [
     "الـ 22 دي التاريخ المستهدف في سؤال الاحتمال؛ لكن الـ expected completion time هو طول الـ critical path، يعني 20.",
     "صح. الـ critical path <bdi dir=\"ltr\">A‑B‑D‑G‑I‑J</bdi> الـ te بتاعه:<span class=\"ltr\">3 + 4 + 5 + 3 + 2 + 3 = 20</span>فالـ <bdi dir=\"ltr\">μ&nbsp;=&nbsp;20</bdi> أسبوع مش 22 <bdi dir=\"ltr\">(L8)</bdi>."
    ],
    [
     "الاحتمال دايمًا بين 0 و1، فـ 9.31 مستحيلة؛ الصح:<span class=\"ltr\">z = (22 − 20)/1.29 = 1.55</span>وده بيدّي <bdi dir=\"ltr\">P&nbsp;=&nbsp;0.9394</bdi>.",
     "صح. الحساب:<span class=\"ltr\">σ² = 1.67, σ = 1.29</span><span class=\"ltr\">z = 2/1.29 = 1.55</span><span class=\"ltr\">P = 0.5 + 0.4394 = 0.9394</span>"
    ],
    [
     "الـ D مش critical:<span class=\"ltr\">A-D-G-H = 6 + 5 + 7 + 4 = 22  vs  33</span>فالـ D ليها float بيساوي 11. الـ critical path هو <bdi dir=\"ltr\">A‑C‑F‑H</bdi>.",
     "صح. الـ Critical path هو:<span class=\"ltr\">A-C-F-H = 6 + 12 + 11 + 4 = 33</span>والـ D ليها float بيساوي 11."
    ],
    [
     "صح. الـ paths:<span class=\"ltr\">A-C-F-H = 33  (B-E-I = 29, A-C-G-H = 29)</span>",
     "الإجابة False غلط:<span class=\"ltr\">A-C-F-H = 6 + 12 + 11 + 4 = 33</span>وده أطول path، والباقي:<span class=\"ltr\">B-E-I = 29, A-C-G-H = 29</span>"
    ],
    [
     "الـ te صح:<span class=\"ltr\">te = (8 + 64 + 18)/6 = 15</span>بس الـ σ²:<span class=\"ltr\">σ² = ((18 − 8)/6)² = 2.78</span>والـ 1.78 دي <bdi dir=\"ltr\">(8/6)²</bdi>، استخدمت <bdi dir=\"ltr\">m&nbsp;−&nbsp;a</bdi> بدل <bdi dir=\"ltr\">b&nbsp;−&nbsp;a</bdi>.",
     "صح. الحساب:<span class=\"ltr\">te = (8 + 64 + 18)/6 = 15</span><span class=\"ltr\">σ² = (10/6)² = 2.78</span>"
    ],
    [
     "صح. الحساب:<span class=\"ltr\">σ² = 1 + 4 + 1 + 0.44 = 6.44</span><span class=\"ltr\">σ = 2.54</span>",
     "الإجابة False غلط: الـ variances بتاعة الـ critical activities هي:<span class=\"ltr\">A 1, C 4, F 1, H 0.44</span>فـ:<span class=\"ltr\">σ² = 6.44,  σ = √6.44 = 2.54</span>"
    ],
    [
     "عشان <bdi dir=\"ltr\">32&nbsp;&lt;&nbsp;μ&nbsp;=&nbsp;33</bdi> يبقى:<span class=\"ltr\">z = (32 − 33)/2.54 = −0.39</span>ومساحة الجدول 0.1517، فـ:<span class=\"ltr\">P = 0.5 − 0.1517 = 0.3483</span>مش 0.3937.",
     "صح. الحساب:<span class=\"ltr\">z = (32 − 33)/2.54 = −0.39</span><span class=\"ltr\">P = 0.5 − 0.1517 = 0.3483</span>"
    ],
    [
     "الـ 0.4887 دي مساحة الجدول بس بين 0 و <bdi dir=\"ltr\">z&nbsp;=&nbsp;2.28</bdi>؛ وعشان <bdi dir=\"ltr\">22&nbsp;&gt;&nbsp;μ</bdi> يبقى:<span class=\"ltr\">P = 0.5 + 0.4887 = 0.9887</span>",
     "صح. الحساب:<span class=\"ltr\">z = (X − μ)/σ = (22 − 17)/2.19 = 2.28</span>ومساحة الجدول 0.4887، وعشان <bdi dir=\"ltr\">X&nbsp;&gt;&nbsp;μ</bdi> يبقى:<span class=\"ltr\">P(T ≤ 22) = 0.5 + 0.4887 = 0.9887</span>من <bdi dir=\"ltr\">L8</bdi>.",
     "الـ 0.0113 (يعني <bdi dir=\"ltr\">1&nbsp;−&nbsp;0.9887</bdi>) دي احتمال إنه يخلص بعد الـ 22 أسبوع، مش في أو قبل الـ 22.",
     "الـ 2.28 دي قيمة الـ z؛ والاحتمال لازم يبقى بين 0 و1. الصح:<span class=\"ltr\">P = 0.5 + 0.4887 = 0.9887</span>"
    ]
   ],
   "extra": [
    [
     "الـ 7 ده المتوسط العادي:<span class=\"ltr\">(2 + 5 + 14)/3</span>لكن الـ PERT بيدّي الـ most likely وزن 4:<span class=\"ltr\">(2 + 20 + 14)/6 = 6</span>",
     "صح. الـ PERT expected time:<span class=\"ltr\">te = (a + 4m + b)/6 = (2 + 4×5 + 14)/6 = 36/6 = 6</span>من <bdi dir=\"ltr\">L8</bdi>.",
     "الـ 5 ده الـ most likely time m بس؛ الـ te بيستخدم كمان الـ optimistic والـ pessimistic:<span class=\"ltr\">(2 + 20 + 14)/6 = 6</span>",
     "الـ 8 ده نص المسافة بين الطرفين <bdi dir=\"ltr\">(2&nbsp;+&nbsp;14)/2</bdi>؛ الصح:<span class=\"ltr\">te = (2 + 4×5 + 14)/6 = 6</span>"
    ],
    [
     "الـ 2 (يعني <bdi dir=\"ltr\">(14&nbsp;−&nbsp;2)/6</bdi>) ده الـ standard deviation؛ الـ variance هو مربعه:<span class=\"ltr\">2² = 4</span>",
     "الـ 12 (يعني <bdi dir=\"ltr\">b&nbsp;−&nbsp;a</bdi>) ده الفرق بين الطرفين بس؛ الـ σ²:<span class=\"ltr\">σ² = ((b − a)/6)² = (12/6)² = 4</span>",
     "الـ 16 (يعني <bdi dir=\"ltr\">4²</bdi>) معناها إنك ربّعت الـ variance مرة تانية؛ الصح:<span class=\"ltr\">σ² = ((14 − 2)/6)² = 2² = 4</span>",
     "صح. الـ PERT variance:<span class=\"ltr\">σ² = ((b − a)/6)² = ((14 − 2)/6)² = 2² = 4</span>من <bdi dir=\"ltr\">L8</bdi>."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">z = (X − μ)/σ = (23 − 20)/2 = 1.5</span>وهي موجبة عشان الـ target بعد الـ expected time <bdi dir=\"ltr\">(L8)</bdi>.",
     "الـ <bdi dir=\"ltr\">−1.5</bdi> دي عكست المعادلة؛ الصح:<span class=\"ltr\">z = (X − μ)/σ = (23 − 20)/2 = +1.5</span>",
     "الـ 3 (يعني <bdi dir=\"ltr\">23&nbsp;−&nbsp;20</bdi>) ده الفرق بس؛ لازم تقسمه على <bdi dir=\"ltr\">σ&nbsp;=&nbsp;2</bdi>، فـ <bdi dir=\"ltr\">z&nbsp;=&nbsp;1.5</bdi>.",
     "الـ 0.75 (يعني <bdi dir=\"ltr\">3/4</bdi>) دي قسمت على الـ variance <bdi dir=\"ltr\">σ²&nbsp;=&nbsp;4</bdi>؛ لكن الـ z بنقسم فيها على الـ standard deviation <bdi dir=\"ltr\">σ&nbsp;=&nbsp;2</bdi>، فـ <bdi dir=\"ltr\">z&nbsp;=&nbsp;1.5</bdi>."
    ],
    [
     "الـ 0.4332 دي مساحة الجدول بس بين 0 و <bdi dir=\"ltr\">z&nbsp;=&nbsp;1.5</bdi>؛ ولما <bdi dir=\"ltr\">X&nbsp;&gt;&nbsp;μ</bdi> لازم تزوّد النص الشمال:<span class=\"ltr\">0.5 + 0.4332 = 0.9332</span>",
     "الـ 0.0668 (يعني <bdi dir=\"ltr\">0.5&nbsp;−&nbsp;0.4332</bdi>) ده <bdi dir=\"ltr\">P(T&nbsp;&gt;&nbsp;23)</bdi>، يعني إنه يخلص بعد الـ 23 أسبوع.",
     "صح. عشان <bdi dir=\"ltr\">23&nbsp;&gt;&nbsp;μ</bdi> (و <bdi dir=\"ltr\">z&nbsp;=&nbsp;+1.5</bdi>)، يبقى الـ <bdi dir=\"ltr\">P(T&nbsp;≤&nbsp;23)</bdi> بيساوي 0.5 (النص الشمال من المنحنى) + 0.4332 (مساحة الجدول من 0 لـ z):<span class=\"ltr\">P(T ≤ 23) = 0.5 + 0.4332 = 0.9332</span>من <bdi dir=\"ltr\">L8</bdi>.",
     "الـ 1.5 دي قيمة الـ z؛ والاحتمال لازم يبقى بين 0 و1. الصح:<span class=\"ltr\">P = 0.5 + 0.4332 = 0.9332</span>"
    ],
    [
     "الـ 0.8413 (يعني <bdi dir=\"ltr\">0.5&nbsp;+&nbsp;0.3413</bdi>) دي لـ <bdi dir=\"ltr\">z&nbsp;=&nbsp;+1</bdi> (يعني الـ target بعد الـ μ)؛ هنا <bdi dir=\"ltr\">26&nbsp;&lt;&nbsp;30</bdi> فـ <bdi dir=\"ltr\">z&nbsp;=&nbsp;−1</bdi>، يعني:<span class=\"ltr\">P = 0.5 − 0.3413</span>",
     "صح. الحساب:<span class=\"ltr\">z = (26 − 30)/4 = −1 → 0.5 − 0.3413</span>",
     "الـ 0.3413 دي مساحة الجدول بس بين 0 و <bdi dir=\"ltr\">|z|&nbsp;=&nbsp;1</bdi>؛ ولـ <bdi dir=\"ltr\">z&nbsp;=&nbsp;−1</bdi> يبقى:<span class=\"ltr\">P = 0.5 − 0.3413 = 0.1587</span>",
     "الـ <bdi dir=\"ltr\">−1</bdi> دي قيمة الـ z يعني <bdi dir=\"ltr\">(26&nbsp;−&nbsp;30)/4</bdi>؛ والاحتمال عمره ما يبقى سالب. الصح:<span class=\"ltr\">P = 0.5 − 0.3413 = 0.1587</span>"
    ],
    [
     "صح. الـ variances بتاعة الـ critical activities هي اللي بتتجمع:<span class=\"ltr\">σ² = 1 + 4 + 0.44 = 5.44</span><span class=\"ltr\">σ = √5.44 = 2.33</span>من <bdi dir=\"ltr\">L8</bdi>.",
     "الـ 5.44 ده الـ VARIANCE بتاع الـ project؛ الـ standard deviation هو الجذر بتاعه:<span class=\"ltr\">√5.44 = 2.33</span>",
     "الـ 3.44 (يعني <bdi dir=\"ltr\">1&nbsp;+&nbsp;2&nbsp;+&nbsp;0.44</bdi>) خلطت standard deviations مع variance؛ اجمع الـ variances (5.44) وخد الجذر: 2.33.",
     "الـ 1.81 مش √5.44؛ الـ variances مجموعها 5.44، والجذر بتاعها 2.33."
    ],
    [
     "الـ <bdi dir=\"ltr\">P(T&nbsp;≤&nbsp;35)</bdi> ده لـ '<bdi dir=\"ltr\">in / on / before 35 weeks</bdi>'؛ لكن 'after' هو المكمّل، يعني:<span class=\"ltr\">1 − P(T ≤ 35)</span>",
     "الـ T ده normal variable الـ continuous، فـ <bdi dir=\"ltr\">P(T&nbsp;=&nbsp;35)&nbsp;=&nbsp;0</bdi>؛ و'<bdi dir=\"ltr\">after&nbsp;35&nbsp;weeks</bdi>' معناها <bdi dir=\"ltr\">P(T&nbsp;≥&nbsp;35)</bdi>.",
     "الـ 0.5 بتطلع بس لو 35 بيساوي μ (يعني <bdi dir=\"ltr\">z&nbsp;=&nbsp;0</bdi>)؛ عمومًا احسب الـ z وخد:<span class=\"ltr\">1 − P(T ≤ 35)</span>",
     "صح. الـ '<bdi dir=\"ltr\">After&nbsp;X</bdi>' ده الذيل اليمين من الـ normal curve:<span class=\"ltr\">P(T ≥ X) = 1 − P(T ≤ X)</span>والـ <bdi dir=\"ltr\">P(T&nbsp;≤&nbsp;X)</bdi> بتجيبه من:<span class=\"ltr\">z = (X − μ)/σ</span>من <bdi dir=\"ltr\">L8</bdi>، قواعد الاحتمال."
    ],
    [
     "الـ 6 ده المتوسط العادي:<span class=\"ltr\">(4 + 4 + 10)/3</span>لكن الـ PERT بيدّي الـ m وزن 4:<span class=\"ltr\">(4 + 16 + 10)/6 = 5</span>",
     "الـ 4 دي قيمة الـ optimistic والـ most likely؛ الـ te لازم يدخّل الـ pessimistic اللي هو 10:<span class=\"ltr\">(4 + 16 + 10)/6 = 5</span>",
     "صح. الحساب:<span class=\"ltr\">te = (a + 4m + b)/6 = (4 + 4×4 + 10)/6 = 30/6 = 5</span>من <bdi dir=\"ltr\">L8</bdi>.",
     "الـ 7 ده نص المسافة بين الطرفين <bdi dir=\"ltr\">(4&nbsp;+&nbsp;10)/2</bdi>؛ الصح:<span class=\"ltr\">te = (4 + 16 + 10)/6 = 5</span>"
    ],
    [
     "صح. الحساب:<span class=\"ltr\">σ² = ((b − a)/6)² = ((7 − 1)/6)² = 1² = 1</span>من <bdi dir=\"ltr\">L8</bdi>، معادلات الـ PERT.",
     "الـ 6 (يعني <bdi dir=\"ltr\">b&nbsp;−&nbsp;a</bdi>) ده الفرق بين الطرفين بس؛ الـ σ²:<span class=\"ltr\">σ² = ((7 − 1)/6)² = 1</span>",
     "الـ 4 ده الـ expected time <bdi dir=\"ltr\">(1&nbsp;+&nbsp;16&nbsp;+&nbsp;7)/6</bdi>؛ الـ variance هو:<span class=\"ltr\">((7 − 1)/6)² = 1</span>",
     "الـ 0.5 مش طالعة من المعادلة خالص؛ الصح:<span class=\"ltr\">σ² = ((7 − 1)/6)² = 1² = 1</span>"
    ],
    [
     "مش صفر؛ نص منحنى الـ normal تحت μ.",
     "صح. عند <bdi dir=\"ltr\">X&nbsp;=&nbsp;μ</bdi> يبقى:<span class=\"ltr\">z = (μ − μ)/σ = 0</span>ومساحة الجدول 0، فـ <bdi dir=\"ltr\">P&nbsp;=&nbsp;0.5</bdi>، لأن الـ normal curve متماثل حوالين الـ μ <bdi dir=\"ltr\">(L8)</bdi>.",
     "لو <bdi dir=\"ltr\">P&nbsp;=&nbsp;1</bdi> يبقى معناها إن الـ project عمره ما يتأخر، بس نص الـ normal curve موجود فوق الـ μ.",
     "الـ 0.8413 (يعني <bdi dir=\"ltr\">0.5&nbsp;+&nbsp;0.3413</bdi>) ده <bdi dir=\"ltr\">P(T&nbsp;≤&nbsp;μ&nbsp;+&nbsp;σ)</bdi> يعني لـ <bdi dir=\"ltr\">z&nbsp;=&nbsp;1</bdi>؛ لكن عند الـ μ نفسها <bdi dir=\"ltr\">z&nbsp;=&nbsp;0</bdi> والـ <bdi dir=\"ltr\">P&nbsp;=&nbsp;0.5</bdi>."
    ]
   ]
  },
  "9": {
   "notes": [
    {
     "h": "التعريفات",
     "pts": [
      "الـ <b>Dynamic programming</b> هو mathematical technique بيتعامل مع <b>الـ optimization للـ multistage decision problems</b>. المسألة الكبيرة بتتقسم لـ <b>stages</b>؛ وكل stage بتتحل باستخدام الـ optimal results بتاعة الـ stage اللي بعدها.",
      "الـ <b>Shortest route problem</b>: المعيار بتاعها إنك تلاقي <b>أقصر مسافة بين اتنين nodes بأقل تكلفة</b>.",
      "الـ <b>Backward approach</b>: ابدأ من آخر stage (الـ nodes اللي جنب الـ destination) وارجع لورا لحد الـ source؛ وعند كل node احتفظ بس بـ <b>أقل</b> مسافة للـ destination.",
      "الـ Recursion: الـ <bdi dir=\"ltr\">d(node,&nbsp;T)</bdi> بتساوي الـ min على كل الـ arcs <bdi dir=\"ltr\">(node&nbsp;→&nbsp;next)</bdi> لـ:<span class=\"ltr\">[ length(node → next) + d(next, T) ]</span>سجّل الـ next node اللي بيدّي الـ minimum، وبعدين اقرا الـ path من الأول للآخر.",
      "اختصار معيد: اكتب كل الـ paths وخد أقصرهم؛ بس الامتحان بيطلب الشغل الـ backward stage بـ stage، فلازم توضح الـ stages."
     ],
     "figH": {
      "or-dp-stages": "الـ network بتاعة الـ slide متقسمة stages، وبتتحل backward من الـ destination لحد الـ source",
      "or-dp-node": "الـ Recursion عند node واحدة: طول الـ arc زائد الـ d بتاع الـ node اللي بعدها لكل arc، وناخد الأقل",
      "or-dp-allpaths": "الاختصار: كل الـ paths مكتوبة ومتجمعة، قصاد الـ stages الـ backward"
     }
    },
    {
     "h": "امتحان الـ Final <bdi dir=\"ltr\">2021/22</bdi> والـ Sheet 2: من M1 لـ M7",
     "figH": {
      "or-dp-m1m7": "من الـ M1 للـ M7 بالـ backward node بـ node، لحد الـ path ده:<span class=\"ltr\">M1-M2-M4-M6-M7 = 25</span>"
     }
    },
    {
     "h": "امتحان الـ Final <bdi dir=\"ltr\">2019/20</bdi>: من S لـ T",
     "figH": {
      "or-dp-st": "من الـ S للـ T بالـ backward stage بـ stage، لحد الـ path ده:<span class=\"ltr\">S-A-E-T = 9</span>وبعدها جرّب network بتاعتك"
     }
    },
    {
     "h": "امتحانات الـ Final <bdi dir=\"ltr\">2023/24</bdi> (الورقتين): من node 1 لـ node 10",
     "figH": {
      "or-dp-n10": "من الـ node 1 للـ node 10 بالـ backward في الورقتين: الـ arcs مختلفة بس نفس الـ path:<span class=\"ltr\">1-2-5-8-10 = 15</span>"
     }
    },
    {
     "h": "امتحان الـ Final <bdi dir=\"ltr\">2025/26</bdi>: من J1 لـ J8",
     "figH": {
      "or-dp-j8": "من الـ J1 للـ J8 بالـ backward node بـ node، لحد الـ path ده:<span class=\"ltr\">J1-J2-J6-J8 = 16</span>"
     }
    },
    {
     "h": "سؤال الـ MCQ رقم 21 في الـ Revision: من N1 لـ N6",
     "figH": {
      "or-dp-n6": "من الـ N1 للـ N6 بالـ backward، والنتيجة:<span class=\"ltr\">d(N1) = 7: N1, N3, N5, N6</span>ودي الإجابة D."
     }
    }
   ],
   "cards": [
    "هو mathematical technique للـ optimization بتاع الـ multistage decision problems.",
    "إنك تلاقي أقصر مسافة بين اتنين nodes بأقل تكلفة.",
    "ابدأ من الـ stage اللي جنب الـ destination وارجع لورا لحد الـ source.",
    "الـ min على كل j:<span class=\"ltr\">d(i) = min [ c(i, j) + d(j) ]</span>",
    "مجموعة nodes في نفس الخطوة من الـ network.",
    "امشي ورا الـ arcs اللي سجلتها (اللي بتدّي الـ minimum) من الـ source لقدام.",
    "الإجابة:<span class=\"ltr\">M1-M2-M4-M6-M7 = 25</span>",
    "الإجابة:<span class=\"ltr\">S-A-E-T = 9</span>",
    "الإجابة:<span class=\"ltr\">1-2-5-8-10 = 15</span>",
    "الإجابة:<span class=\"ltr\">J1-J2-J6-J8 = 16</span>",
    "الإجابة:<span class=\"ltr\">N1-N3-N5-N6 = 7</span>",
    "بيعيد استخدام أحسن مسافة لكل node، فالشغل بيزيد مع عدد الـ arcs مش مع عدد الـ paths."
   ],
   "qa": [
    "الـ Dynamic programming هو mathematical technique بيتعامل مع الـ optimization للـ multistage decision problems: المسألة بتتقسم لـ stages وبتتحل stage بـ stage، وكل stage بتستخدم الـ optimal results بتاعة اللي بعدها.",
    "قسّم الـ network لـ stages. ابدأ بالـ nodes اللي قبل الـ destination على طول: المسافة بتاعتها هي طول الـ arc. ارجع stage لورا: لكل node احسب الـ min على الـ arcs بتاعتها:<span class=\"ltr\">d(node) = min (arc length + d(next node))</span>وسجّل الـ arc اللي استخدمته. كمّل لحد الـ source؛ الـ <bdi dir=\"ltr\">d(source)</bdi> هي أقصر مسافة، والـ arcs اللي سجلتها بتدّيك الـ path.",
    "الـ Stage 4:<span class=\"ltr\">d(M5) = 6, d(M6) = 8</span>الـ Stage 3:<span class=\"ltr\">d(M3) = 11 + 6 = 17</span><span class=\"ltr\">d(M4) = min(6 + 6, 3 + 8) = 11</span>الـ Stage 2:<span class=\"ltr\">d(M2) = min(7 + 17, 9 + 11) = 20</span>الـ Stage 1:<span class=\"ltr\">d(M1) = 5 + 20 = 25</span>الـ Path هو:<span class=\"ltr\">M1-M2-M4-M6-M7 = 25</span>",
    "الـ Stage 3:<span class=\"ltr\">d(D) = 8, d(E) = 2</span>الـ Stage 2:<span class=\"ltr\">d(A) = min(3 + 8, 6 + 2) = 8</span><span class=\"ltr\">d(B) = min(4 + 8, 10 + 2) = 12</span><span class=\"ltr\">d(C) = min(10, 3 + 2) = 5</span>الـ Stage 1:<span class=\"ltr\">d(S) = min(1 + 8, 2 + 12, 7 + 5) = 9</span>الـ Path هو:<span class=\"ltr\">S-A-E-T = 9</span>",
    "المعيار بتاع الـ shortest route problem إنك تلاقي أقصر مسافة بين اتنين nodes بأقل تكلفة (مثلًا بين مدينتين في شبكة طرق)."
   ],
   "quiz": [
    [
     "صح. ده تعريف 20 في Revision 1: الـ shortest route problem بيستخدم عشان نلاقي أقصر مسافة بين two nodes بأقل cost (L9).",
     "لو قلت False تبقى بترفض تعريف Revision 1 نفسه: الـ shortest route problem فعلًا بيدوّر على المسافة اللي بأقل cost بين two nodes."
    ],
    [
     "صح. الـ shortest route problem بيستخدم عشان نلاقي أقصر مسافة بين two nodes بأقل cost <bdi dir=\"ltr\">(L9)</bdi>، وفي توصيل أغسطس <bdi dir=\"ltr\">2023/24</bdi> الإجابة <bdi dir=\"ltr\">2&nbsp;→&nbsp;C</bdi>.",
     "الحالة الخاصة من الـ transportation problem (n resources على n activities) دي الـ assignment problem (L5)، مش الـ shortest route.",
     "إن كل الـ decision variables ≥ 0 ده الـ non-negativity restriction بتاع الـ LP (L1)، مالوش علاقة بالـ shortest route problem.",
     "العنصر اللي عند تقاطع الـ pivot column والـ pivot row ده الـ pivot element في الـ simplex (L3)."
    ],
    [
     "شحن commodity بين sources وdestinations ده الـ transportation problem (L4)، مش الـ dynamic programming.",
     "صح. تعريف 38 في Revision 1: الـ dynamic programming هو mathematical technique بيتعامل مع الـ optimization بتاع الـ multistage decision problems، وبيتحل stage ورا stage (L9).",
     "توزيع resources على عدد مساوي من الـ activities ده الـ assignment problem (L5)، وبيتحل بالـ Hungarian method.",
     "التلات time estimates (optimistic وmost likely وpessimistic) لكل activity دول بتوع الـ PERT (L8)."
    ],
    [
     "الـ path <bdi dir=\"ltr\">N1-N2-N4-N6</bdi> طوله:<span class=\"ltr\">4 + 3 + 2 = 9</span>وده أطول من:<span class=\"ltr\">N1-N3-N5-N6 = 7</span>",
     "الـ path <bdi dir=\"ltr\">N1-N2-N5-N6</bdi> طوله:<span class=\"ltr\">4 + 2 + 2 = 8</span>لسه أطول من:<span class=\"ltr\">N1-N3-N5-N6 = 7</span>",
     "صح. نمشي backward:<span class=\"ltr\">d(N4) = d(N5) = 2</span><span class=\"ltr\">d(N2) = min{3 + 2, 2 + 2} = 4</span><span class=\"ltr\">d(N3) = 3 + 2 = 5</span><span class=\"ltr\">d(N1) = min{4 + 4, 2 + 5} = 7</span>عن طريق <bdi dir=\"ltr\">N3-N5-N6</bdi> (L9).",
     "الـ backward recursion بيدّي <bdi dir=\"ltr\">d(N1)&nbsp;=&nbsp;7</bdi> على الـ path ده:<span class=\"ltr\">N1-N3-N5-N6</span>وده اختيار C، فـ 'None' غلط."
    ],
    [
     "صح. نمشي backward:<span class=\"ltr\">d(M4) = min{6 + 6, 3 + 8} = 11</span><span class=\"ltr\">d(M2) = min{7 + 17, 9 + 11} = 20</span><span class=\"ltr\">d(M1) = 5 + 20 = 25</span>عن طريق <bdi dir=\"ltr\">M1-M2-M4-M6-M7</bdi> (L9).",
     "الـ 26 دي الـ path:<span class=\"ltr\">M1-M2-M4-M5-M7 = 5 + 9 + 6 + 6</span>لو رحت <bdi dir=\"ltr\">M4→M6</bdi> بدلها توفّر 1:<span class=\"ltr\">3 + 8 = 11 &lt; 6 + 6 = 12</span>",
     "الـ 29 دي الـ path:<span class=\"ltr\">M1-M2-M3-M5-M7 = 5 + 7 + 11 + 6</span>وده أطول من الـ 25 اللي عن طريق M4 وM6.",
     "الـ 20 دي <bdi dir=\"ltr\">d(M2,&nbsp;M7)</bdi>، يعني قيمة الـ stage اللي بعد أول خطوة؛ لما تزوّد أول arc <bdi dir=\"ltr\">M1→M2&nbsp;=&nbsp;5</bdi> تطلع 25."
    ],
    [
     "الطريق ده:<span class=\"ltr\">S-B-D-T = 2 + 4 + 8 = 14</span>أحسن تكملة من B هي <bdi dir=\"ltr\">d(B)&nbsp;=&nbsp;12</bdi>، فالطريق من S عن طريق B بـ <bdi dir=\"ltr\">14&nbsp;&gt;&nbsp;9</bdi>.",
     "الطريق ده:<span class=\"ltr\">S-C-E-T = 7 + 3 + 2 = 12</span>الـ arc <bdi dir=\"ltr\">S→C&nbsp;=&nbsp;7</bdi> طويل أوي ومش هيغلب:<span class=\"ltr\">S-A-E-T = 9</span>",
     "صح. نمشي backward، والـ A عن طريق E:<span class=\"ltr\">d(A) = min{3 + 8, 6 + 2} = 8</span>وبعدين:<span class=\"ltr\">d(B) = 12, d(C) = 5</span>فـ:<span class=\"ltr\">d(S) = min{1 + 8, 2 + 12, 7 + 5} = 9</span>عن طريق <bdi dir=\"ltr\">S-A-E-T</bdi> (L9).",
     "الطريق ده:<span class=\"ltr\">S-A-D-T = 1 + 3 + 8 = 12</span>من A الأقصر إنك تروح E:<span class=\"ltr\">6 + 2 = 8 &lt; 3 + 8 = 11</span>"
    ],
    [
     "صح. نمشي backward:<span class=\"ltr\">d(J6) = 4, d(J5) = 13, d(J7) = 15</span><span class=\"ltr\">d(J2) = min{12 + 13, 8 + 4} = 12</span><span class=\"ltr\">d(J1) = min{4 + 12, 9 + 14, 11 + 24} = 16</span>عن طريق <bdi dir=\"ltr\">J2-J6-J8</bdi> (L9).",
     "الـ 23 دي:<span class=\"ltr\">J1-J3-J6-J8 = 9 + 10 + 4</span>الوصول لـ J6 عن طريق J2 <bdi dir=\"ltr\">(4&nbsp;+&nbsp;8)</bdi> أقصر من عن طريق J3 <bdi dir=\"ltr\">(9&nbsp;+&nbsp;10)</bdi>.",
     "الـ 29 دي:<span class=\"ltr\">J1-J2-J5-J8 = 4 + 12 + 13</span>من J2 الطريق عن طريق J6 <bdi dir=\"ltr\">(8&nbsp;+&nbsp;4&nbsp;=&nbsp;12)</bdi> أحسن من J5 <bdi dir=\"ltr\">(12&nbsp;+&nbsp;13&nbsp;=&nbsp;25)</bdi>.",
     "الـ 35 دي:<span class=\"ltr\">J1-J4-J7-J8 = 11 + 9 + 15</span>وده أطول طريق في الاختيارات كلها."
    ],
    [
     "مفيش أي route من node 1 لـ node 10 بالقِصر ده: الـ backward recursion بيدّي أقل قيمة <bdi dir=\"ltr\">d(1)&nbsp;=&nbsp;15</bdi>.",
     "صح. نمشي backward:<span class=\"ltr\">d(5) = 8, d(6) = 7, d(7) = 13</span><span class=\"ltr\">d(2) = min{3 + 8, 6 + 7} = 11</span><span class=\"ltr\">d(1) = min{4 + 11, 6 + 15, 4 + 20} = 15</span>عن طريق <bdi dir=\"ltr\">1-2-5-8-10</bdi> (L9).",
     "الـ 17 دي الـ route:<span class=\"ltr\">1-2-6-8-10 = 4 + 6 + 5 + 2</span>من node 2 الأقصر إنك تروح 5 <bdi dir=\"ltr\">(3&nbsp;+&nbsp;8&nbsp;=&nbsp;11)</bdi> مش 6 <bdi dir=\"ltr\">(6&nbsp;+&nbsp;7&nbsp;=&nbsp;13)</bdi>.",
     "الـ 21 دي أحسن route بيعدّي على node 3:<span class=\"ltr\">6 + d(3) = 6 + 15</span>لكن عن طريق node 2 المسافة 15 بس."
    ],
    [
     "إنك تبدأ بالـ arcs اللي طالعة من الـ source ده الـ forward approach؛ الـ backward approach بيبدأ من الـ destination.",
     "صح. الـ Backward بيبدأ من جنب الـ destination.",
     "ترتيب الـ stages بيتحدد من شكل الـ network (بُعد الـ stage عن الـ destination)، مش من طول الـ arc.",
     "الـ stages في الـ DP بتتحل بترتيب ثابت، كل stage بتستخدم نتايج الـ stage اللي بعدها، فالترتيب العشوائي مينفعش."
    ],
    [
     "الـ 12 دي أول arc بس:<span class=\"ltr\">6 + 6 = 12</span>التاني بيدّي:<span class=\"ltr\">3 + 8 = 11</span>والـ node بتاخد الـ minimum.",
     "صح. قيمة الـ node هي الـ min على كل الـ arcs لـ (طول الـ arc وعليه d بتاع الـ node اللي بعده):<span class=\"ltr\">min{6 + 6, 3 + 8} = min{12, 11} = 11</span>ودي الـ recursion في (L9).",
     "أطوال الـ arcs لوحدها بتتجاهل المسافات الباقية.",
     "الـ 14 دي <bdi dir=\"ltr\">6&nbsp;+&nbsp;8</bdi> وبتربط الـ arc بالـ node الغلط؛ كل arc لازم يتجمع على d بتاع الـ node اللي هو رايح له."
    ],
    [
     "الجملة دي صح: الـ DP بيقسم المسألة لـ stages بتتحل واحدة ورا التانية، فهي مش الجملة الغلط.",
     "الجملة دي صح: كل stage بتستخدم الـ optimal values اللي اتحسبت قبل كده للـ stages اللي بعدها (backward recursion).",
     "الاختيار الصح (الجملة الغلط): توزيع الـ jobs بيستخدم الـ Hungarian method.",
     "الجملة دي صح: الـ shortest route problem هو أهم تطبيق للـ DP في الكورس (L9)."
    ],
    [
     "الـ optimization بتاع multistage decision problem ده تعريف الـ DYNAMIC PROGRAMMING؛ الـ simplex بيتنقل بين الـ basic feasible solutions بتاعة الـ LP.",
     "صح. ده تعريف الـ dynamic programming، مش الـ simplex."
    ]
   ],
   "extra": [
    [
     "الطريق ده:<span class=\"ltr\">S-A-C-T = 2 + 4 + 6 = 12</span>من A الطريق عن طريق D <bdi dir=\"ltr\">(7&nbsp;+&nbsp;2&nbsp;=&nbsp;9)</bdi> أحسن من C <bdi dir=\"ltr\">(4&nbsp;+&nbsp;6&nbsp;=&nbsp;10)</bdi>، وكمان الطريق من S عن طريق B أقصر.",
     "الطريق ده:<span class=\"ltr\">S-A-D-T = 2 + 7 + 2 = 11</span>ودي <bdi dir=\"ltr\">d(S)</bdi> لو عدّيت على A؛ لكن عن طريق B بتطلع <bdi dir=\"ltr\">5&nbsp;+&nbsp;5&nbsp;=&nbsp;10</bdi>.",
     "صح.<span class=\"ltr\">d(C) = 6, d(D) = 2</span><span class=\"ltr\">d(A) = 9, d(B) = min(7, 5) = 5</span><span class=\"ltr\">d(S) = min(2 + 9, 5 + 5) = 10</span>",
     "الطريق ده:<span class=\"ltr\">S-B-C-T = 5 + 1 + 6 = 12</span>من B الطريق عن طريق D <bdi dir=\"ltr\">(3&nbsp;+&nbsp;2&nbsp;=&nbsp;5)</bdi> أحسن من C <bdi dir=\"ltr\">(1&nbsp;+&nbsp;6&nbsp;=&nbsp;7)</bdi>."
    ],
    [
     "صح.<span class=\"ltr\">d(A) = min{c(A,C) + d(C), c(A,D) + d(D)}</span><span class=\"ltr\">= min{4 + 6, 7 + 2} = 9</span>عن طريق D (من الـ recursion في L9).",
     "الـ 10 دي <bdi dir=\"ltr\">4&nbsp;+&nbsp;6</bdi>، الطريق عن طريق C؛ عن طريق D بتطلع <bdi dir=\"ltr\">7&nbsp;+&nbsp;2&nbsp;=&nbsp;9</bdi>، والـ node بتاخد الـ minimum.",
     "الـ 11 دي <bdi dir=\"ltr\">2&nbsp;+&nbsp;9</bdi>، المسافة من S لو عدّيت على A، يعني stage لورا كمان، مش <bdi dir=\"ltr\">d(A)</bdi>.",
     "الـ 2 دي <bdi dir=\"ltr\">d(D,&nbsp;T)</bdi>؛ الـ A لازم الأول تمشي الـ arc <bdi dir=\"ltr\">A→D&nbsp;=&nbsp;7</bdi>، فـ <bdi dir=\"ltr\">d(A)&nbsp;=&nbsp;9</bdi>."
    ],
    [
     "الـ <bdi dir=\"ltr\">d(S,&nbsp;A)</bdi> والـ <bdi dir=\"ltr\">d(S,&nbsp;B)</bdi> بيبدأوا من الـ source، وده الاتجاه الـ forward؛ الـ backward بيبدأ من الـ nodes اللي جنب T.",
     "صح. ابدأ بالـ nodes اللي جنب الـ destination.",
     "الـ A بعيدة عن T بـ stage زيادة؛ قيمتها محتاجة <bdi dir=\"ltr\">d(C)</bdi> و<bdi dir=\"ltr\">d(D)</bdi> يتحسبوا الأول.",
     "إنك تعدّ كل الـ paths الكاملة ده بالظبط اللي الـ DP بيتجنبه؛ هو بيحسب قيم الـ nodes stage واحدة في المرة."
    ],
    [
     "الـ optimum مابيعتمدش على الاتجاه.",
     "الـ forward والـ backward recursions الاتنين DP schemes صح على نفس الـ network، فمفيش واحد فيهم بيدّي نتيجة infeasible.",
     "الـ optimal distance واحدة في الحالتين؛ ممكن يطلع path مختلف بس لو فيه two paths متعادلين في الـ minimum.",
     "صح. الاتنين DP schemes صح؛ والكورس بيطلب الـ backward."
    ],
    [
     "الـ 12 دي <bdi dir=\"ltr\">6&nbsp;+&nbsp;6</bdi> عن طريق M5، وهي أكبر من <bdi dir=\"ltr\">3&nbsp;+&nbsp;8&nbsp;=&nbsp;11</bdi> عن طريق M6، والـ node بتاخد الـ minimum.",
     "صح.<span class=\"ltr\">d(M4) = min{6 + d(M5), 3 + d(M6)}</span><span class=\"ltr\">= min{6 + 6, 3 + 8} = min{12, 11} = 11</span>فأحسن node بعدها هي M6 <bdi dir=\"ltr\">(L9)</bdi>.",
     "الـ 9 دي <bdi dir=\"ltr\">3&nbsp;+&nbsp;6</bdi> وبتربط الـ arc اللي رايح M6 بـ <bdi dir=\"ltr\">d(M5)</bdi>؛ عن طريق M6 الصح:<span class=\"ltr\">3 + d(M6) = 3 + 8 = 11</span>",
     "الـ 14 دي <bdi dir=\"ltr\">6&nbsp;+&nbsp;8</bdi> وبتربط الـ arc اللي رايح M5 بـ <bdi dir=\"ltr\">d(M6)</bdi>؛ عن طريق M5 الصح <bdi dir=\"ltr\">6&nbsp;+&nbsp;6&nbsp;=&nbsp;12</bdi>، والـ minimum هو 11 عن طريق M6."
    ],
    [
     "صح. ده الأساس اللي الـ recursion بتاع الـ dynamic programming قايم عليه.",
     "الـ northwest corner rule دي starting method في الـ transportation (L4)، مش مبدأ من مبادئ الـ DP.",
     "الـ branch and bound دي طريقة الـ integer programming (L6) اللي بتقسم الـ LP relaxation على الـ fractional variables.",
     "الـ critical path هو أطول path في الـ CPM project network (L7)، مش مبدأ من مبادئ الـ DP."
    ],
    [
     "لما <bdi dir=\"ltr\">M4→M6</bdi> تبقى 5 الطريق ده يبقى:<span class=\"ltr\">5 + 9 + 5 + 8 = 27</span>وده أطول من طريق M5 اللي بـ 26.",
     "الطريق:<span class=\"ltr\">M1-M2-M3-M5-M7 = 5 + 7 + 11 + 6 = 29</span>لسه أطول من الـ 26 اللي عن طريق M4 وM5.",
     "صح.<span class=\"ltr\">d(M4) = min{6 + 6, 5 + 8} = 12</span><span class=\"ltr\">d(M2) = min{24, 21} = 21</span><span class=\"ltr\">d(M1) = 26</span>",
     "أحسن path قديم كان بيستخدم <bdi dir=\"ltr\">M4→M6</bdi>؛ لما تبقى 5 تكلفته 27، فالـ optimum بيتنقل لـ <bdi dir=\"ltr\">M4→M5</bdi> ويبقى 26."
    ],
    [
     "الـ 3 بتعدّ route واحد بس لكل أول arc (الـ <bdi dir=\"ltr\">S→A</bdi> والـ <bdi dir=\"ltr\">S→B</bdi> والـ <bdi dir=\"ltr\">S→C</bdi>)؛ لكن A وB كل واحدة بتتفرع مرتين وC مرتين، فالمجموع 6.",
     "الـ 4 ناقصها routes: كل واحد من <bdi dir=\"ltr\">S→A</bdi> و<bdi dir=\"ltr\">S→B</bdi> ليه تكملتين (D أو E)، و<bdi dir=\"ltr\">S→C</bdi> ليه تكملتين (E أو T)، فالمجموع:<span class=\"ltr\">2 + 2 + 2 = 6</span>",
     "الـ 5 ناقصها route واحد؛ كل واحد من <bdi dir=\"ltr\">S→A</bdi> و<bdi dir=\"ltr\">S→B</bdi> و<bdi dir=\"ltr\">S→C</bdi> بيوصّل لتكملتين:<span class=\"ltr\">2 + 2 + 2 = 6</span>",
     "صح. الـ paths هي:<span class=\"ltr\">S-A-D-T, S-A-E-T, S-B-D-T,</span><span class=\"ltr\">S-B-E-T, S-C-E-T, S-C-T</span>"
    ],
    [
     "تقسيم الـ network لـ stages ده خطوة أساسية في الـ DP: هو اللي بيحدد ترتيب حساب قيم الـ nodes.",
     "الاختيار الصح. الـ DP بيحسب قيم الـ stages بدل ما يعدّ الـ paths (إنك تكتبهم كلهم ده مجرد اختصار بعض المعيدين بيقولوه).",
     "إنك تاخد الـ minimum لـ (arc + d اللي بعده) عند كل node ده هو الـ DP recursion نفسه، فهو جزء من الطريقة.",
     "تسجيل الـ arc اللي ادّى كل minimum مطلوب فعلًا: هو اللي بيخليك ترجع تتتبع الـ optimal path forward بعد الـ recursion."
    ],
    [
     "صح. طول الـ arc + أحسن مسافة فاضلة.",
     "لو أخدت الـ maximum هيطلعلك أطول route؛ الـ shortest route محتاج الـ minimum عند كل node.",
     "جمع كل الـ arcs الطالعة بيخلط الـ routes البديلة في بعض؛ كل node المفروض تختار arc واحد بس هو الأحسن وتجمع عليه <bdi dir=\"ltr\">d(j)</bdi>.",
     "لو أخدت أقصر arc بس هتتجاهل المسافة الباقية بعد node j؛ الـ recursion لازم يزوّد <bdi dir=\"ltr\">d(j)</bdi>."
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
       "why": "ده تعريف الـ operations research من المحاضرة حرفيًا: إننا نقرر بشكل علمي إزاي نصمم ونشغّل الـ man-machine systems أحسن تشغيل، وغالبًا ده بيحتاج توزيع موارد محدودة (scarce resources) (L1).",
       "ow": [
        null,
        "الـ False معناها إنك بترفض تعريف الـ OR نفسه من L1؛ فخ الامتحان إنه يلزق الجملة دي في الـ LP أو الـ formulation أو الـ DP، بس هنا هي مكتوبة على الـ OR فعلًا."
       ]
      },
      {
       "why": "الـ CPM اختصار Critical Path Method، وهي تقنية جدولة المشاريع اللي بتطلّع وقت انتهاء الـ project والـ critical activities (L7).",
       "ow": [
        null,
        "الـ False غلط: في الـ project management الـ CPM هي بالظبط الـ Critical Path Method اللي اتشرحت في L7."
       ]
      },
      {
       "why": "تعريف 20 في Revision 1: الـ shortest route problem بيستخدم عشان نلاقي أقصر مسافة بين two nodes بأقل تكلفة، وبيتحل بالـ DP backward recursion (L9).",
       "ow": [
        null,
        "الـ False معناها إنك بترفض تعريف الـ shortest route problem من Revision 1 (أقل مسافة بأقل تكلفة بين two nodes)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "ترتيب الـ LCM <bdi dir=\"ltr\">(L4)</bdi>:<br>تكلفة 1:<span class=\"ltr\">Q2D1 = 200</span>تكلفة 2 (والـ Q3 خلص):<span class=\"ltr\">Q3D3 = 300</span>تكلفة 3 متشطبة.<br>تكلفة 4 (والـ D3 خلص):<span class=\"ltr\">Q2D3 = 100</span>تكلفة 5 متشطبة (الـ D1 خلص).<br>تكلفة 6:<span class=\"ltr\">Q1D2 = 400</span>تكلفة 8:<span class=\"ltr\">Q2D2 = 200</span>",
       "ow": [
        null,
        "الـ False غلط: بعد ما الخانات اللي تكلفتها 1 و 2 و 4 اتملت، أرخص خانة فاضية لـ Q1 هي D2 (تكلفتها 6)، وبتاخد الـ 400 بتوع الـ supply بتاع Q1 كلهم."
       ]
      },
      {
       "why": "الـ 200 بتوع D1 بيروحوا لأرخص خانة <bdi dir=\"ltr\">(Q2,&nbsp;D1)</bdi> اللي تكلفتها 1؛ يبقى <bdi dir=\"ltr\">M11&nbsp;=&nbsp;0</bdi>.",
       "ow": [
        "الـ LCM بيملا أرخص خانة الأول: الـ 200 بتوع D1 كلهم بيروحوا لـ <bdi dir=\"ltr\">(Q2,&nbsp;D1)</bdi> اللي تكلفتها 1، فـ <bdi dir=\"ltr\">(Q1,&nbsp;D1)</bdi> بتفضل فاضية <bdi dir=\"ltr\">(M11&nbsp;=&nbsp;0)</bdi>.",
        null
       ]
      },
      {
       "why": "بالـ LCM، تكلفة 1:<span class=\"ltr\">Q2D1 = 200</span>تكلفة 2:<span class=\"ltr\">Q3D3 = 300</span>وبعدين تكلفة 4 بتدّي:<span class=\"ltr\">Q2D3 = min(300, 400 − 300) = 100</span>يبقى <bdi dir=\"ltr\">M23&nbsp;=&nbsp;100</bdi> مش صفر <bdi dir=\"ltr\">(L4)</bdi>.",
       "ow": [
        "الـ Q2D3 تكلفتها 4، يعني تالت أرخص خانة؛ بعد <bdi dir=\"ltr\">Q3D3&nbsp;=&nbsp;300</bdi> الـ D3 لسه محتاج 100 والـ Q2 هو اللي بيدّيهم، يبقى <bdi dir=\"ltr\">M23&nbsp;=&nbsp;100</bdi>.",
        null
       ]
      },
      {
       "why": "التكلفة 2 هي تاني أرخص خانة:<span class=\"ltr\">min(300, 400) = 300</span>",
       "ow": [
        null,
        "الـ False غلط: الـ <bdi dir=\"ltr\">(Q3,&nbsp;D3)</bdi> تكلفتها 2، تاني أرخص خانة، وبتاخد:<span class=\"ltr\">min(supply 300, demand 400) = 300</span>"
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">1×200 + 2×300 + 4×100 + 6×400 + 8×200</span><span class=\"ltr\">= 200 + 600 + 400 + 2400 + 1600 = $5200</span>",
       "ow": [
        "الـ $2500 مش تكلفة الـ LCM:<span class=\"ltr\">1×200 + 2×300 + 4×100 + 6×400 + 8×200</span><span class=\"ltr\">= $5200</span>",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "المسار مابيلفّش غير عند خانات مليانة (الـ Q3D3 والـ Q2D3 والـ Q2D2). الـ Index بيبقى:<span class=\"ltr\">+3 − 2 + 4 − 8 = −3</span>وده الـ index السالب الوحيد <bdi dir=\"ltr\">(L4)</bdi>، والباقيين:<span class=\"ltr\">Q1D1 = +6, Q1D3 = +5, Q3D1 = +10</span>",
       "ow": [
        null,
        "الـ False غلط: من الخانة الفاضية <bdi dir=\"ltr\">(Q3,&nbsp;D2)</bdi> المسار مابيلفّش غير عند خانات مليانة Q3D3 و Q2D3 و Q2D2 وبيرجع لنفس الخانة، يبقى ده closed path صحيح."
       ]
      },
      {
       "why": "التحسين على المسار اللي الـ index بتاعه <bdi dir=\"ltr\">−3</bdi> بينقل:<span class=\"ltr\">θ = min(300, 200) = 200</span>الـ Q2D2 بتنزل من 200 لـ 0 وبتخرج من الـ basis، والباقي:<span class=\"ltr\">Q3D2 = 200, Q3D3 = 100, Q2D3 = 300</span>",
       "ow": [
        null,
        "الـ False غلط: الـ θ هي أصغر خانة عليها <bdi dir=\"ltr\">−</bdi> على المسار:<span class=\"ltr\">θ = min(Q3D3 300, Q2D2 200) = 200</span>فالـ Q2D2 بتنزل لـ 0 وبتخرج من الـ basis."
       ]
      },
      {
       "why": "التكلفة الجديدة:<span class=\"ltr\">5200 − 3 × 200 = 4600</span>والـ indices بعد ما اتحسبت تاني <bdi dir=\"ltr\">(3,&nbsp;2,&nbsp;3,&nbsp;10)</bdi> كلها <bdi dir=\"ltr\">≥&nbsp;0</bdi>، يبقى 4600 هي الأقل.",
       "ow": [
        "الـ 4100 مش بنوصلها: الـ index السالب الوحيد <bdi dir=\"ltr\">(−3)</bdi> مع <bdi dir=\"ltr\">θ&nbsp;=&nbsp;200</bdi> بيقلّل الـ 5200 بـ 600 لحد 4600، والـ indices الجديدة كلها <bdi dir=\"ltr\">≥&nbsp;0</bdi>.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Pivot column هو x1 (الـ <bdi dir=\"ltr\">−7</bdi> أكتر سالب)؛ الـ ratios:<span class=\"ltr\">20/5 = 4, 28/4 = 7</span>يبقى الـ pivot هو 5 <bdi dir=\"ltr\">(L3)</bdi>.",
       "ow": [
        "الـ <bdi dir=\"ltr\">−6</bdi> رقم في صف الـ Z؛ أرقام صف الـ Z بتختار الـ pivot column بس وعمرها ما بتبقى pivot. الـ pivot هو 5، لأن الـ ratio:<span class=\"ltr\">20/5 = 4 &lt; 28/4 = 7</span>",
        null
       ]
      },
      {
       "why": "الأرقام هي <bdi dir=\"ltr\">R1&nbsp;÷&nbsp;5</bdi>، بس الـ basic variable بتاع الصف الأول بيبقى x1 (الـ x1 داخل والـ s1 خارج)، فالصف بالشكل المكتوب ده مش صح.",
       "ow": [
        "الأرقام فعلًا هي <bdi dir=\"ltr\">R1&nbsp;÷&nbsp;5</bdi>، بس بعد الـ pivot الـ x1 بيدخل والـ s1 بيخرج، فالصف لازم يتكتب عليه x1 مش s1.",
        null
       ]
      },
      {
       "why": "باستخدام الـ R1 الجديد:<span class=\"ltr\">R2 − 4·R1</span><span class=\"ltr\">= (0, 7 − 1.6, 0 − 0.8, 1 | 28 − 16)</span><span class=\"ltr\">= (0, 5.4, −0.8, 1 | 12)</span>",
       "ow": [
        "الصف المكتوب غلط، باستخدام الـ R1 الجديد:<span class=\"ltr\">R2 − 4 × R1</span><span class=\"ltr\">= (0, 7 − 1.6, −0.8, 1 | 28 − 16)</span><span class=\"ltr\">= (0, 5.4, −0.8, 1 | 12)</span>",
        null
       ]
      },
      {
       "why": "باستخدام الـ R1 الجديد:<span class=\"ltr\">Z + 7·R1 = (0, −6 + 2.8, 1.4, 0 | 28)</span><span class=\"ltr\">= (0, −3.2, 1.4, 0 | 28)</span>",
       "ow": [
        "قيمة الـ s2 والـ RHS غلط:<span class=\"ltr\">Z + 7 × (1, 0.4, 0.2, 0 | 4)</span>بيسيب الـ <bdi dir=\"ltr\">s2&nbsp;=&nbsp;0</bdi> والـ <bdi dir=\"ltr\">RHS&nbsp;=&nbsp;28</bdi>، مش 6 و 20.",
        null
       ]
      },
      {
       "why": "بعد الـ pivot الـ x1 بيبقى basic وقيمته 4 (وعند الـ optimum النهائي <bdi dir=\"ltr\">x1&nbsp;=&nbsp;28/9&nbsp;≈&nbsp;3.11</bdi>)، عمره ما بيبقى 0.",
       "ow": [
        "الـ x1 بيدخل الـ basis، فبعد الـ pivot بياخد الـ RHS بتاع صفه، <bdi dir=\"ltr\">20/5&nbsp;=&nbsp;4</bdi>، مش 0.",
        null
       ]
      },
      {
       "why": "الـ RHS بتاع صف Z بعد pivot واحد:<span class=\"ltr\">0 + 7 × 4 = 28</span>ولسه مش optimal لأن فيه <bdi dir=\"ltr\">−3.2</bdi>.",
       "ow": [
        null,
        "الـ False غلط: بعد pivot واحد الـ RHS بتاع صف الـ Z:<span class=\"ltr\">0 + 7 × 4 = 28</span>لسه مش optimal، بس <bdi dir=\"ltr\">Z&nbsp;=&nbsp;28</bdi>."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الحساب <bdi dir=\"ltr\">(L8)</bdi> بيبقى:<span class=\"ltr\">(1 + 12 + 5)/6 = 3</span><span class=\"ltr\">((5 − 1)/6)² = 0.44</span>",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">te = (1 + 4×3 + 5)/6 = 3</span><span class=\"ltr\">σ² = ((5 − 1)/6)² = 0.44</span>الاتنين زي المكتوب بالظبط."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (a + 4m + b)/6 = (2 + 16 + 6)/6 = 4</span><span class=\"ltr\">σ² = ((b − a)/6)² = (4/6)² = 0.44</span>زي المكتوب <bdi dir=\"ltr\">(L8)</bdi>.",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">(2 + 4×4 + 6)/6 = 4</span><span class=\"ltr\">((6 − 2)/6)² = 0.44</span>الاتنين زي المكتوب."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (1 + 8 + 3)/6 = 2</span>بس:<span class=\"ltr\">σ² = (2/6)² = 0.11</span>",
       "ow": [
        "الـ <bdi dir=\"ltr\">te&nbsp;=&nbsp;2</bdi> صح، بس:<span class=\"ltr\">σ² = ((3 − 1)/6)² = 0.11</span>مش 0.44، فالزوج ككل غلط.",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (2 + 12 + 4)/6 = 3</span>والـ variance 0.11 صح.",
       "ow": [
        "الـ 4 دي الـ pessimistic time بتاع G؛ لكن:<span class=\"ltr\">te = (2 + 4×3 + 4)/6 = 3</span>والـ variance 0.11 صح.",
        null
       ]
      },
      {
       "why": "الـ te لكل activity:<span class=\"ltr\">A 3, B 4, C 2, D 5, E 4,</span><span class=\"ltr\">F 5, G 3, H 4, I 2, J 3</span>الـ Paths:<span class=\"ltr\">A-B-D-G-I-J = 20</span><span class=\"ltr\">A-B-E-G-I-J = 19</span><span class=\"ltr\">A-C-F-H-I-J = 19</span>",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">A-B-D-G-I-J = 3 + 4 + 5 + 3 + 2 + 3 = 20</span>وده أطول path؛ الباقيين 19."
       ]
      },
      {
       "why": "الـ critical path <bdi dir=\"ltr\">A-B-D-G-I-J</bdi> الـ te بتاعه:<span class=\"ltr\">3 + 4 + 5 + 3 + 2 + 3 = 20</span>يبقى الـ expected completion time هو 20 أسبوع مش 22 <bdi dir=\"ltr\">(L8)</bdi>.",
       "ow": [
        "الـ 22 دي الـ target date بتاع الجملة اللي بعدها؛ الـ expected completion time هو طول الـ critical path، يعني 20.",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">σ² = 0.44 + 0.44 + 0.44 + 0.11 + 0.11 + 0.11</span><span class=\"ltr\">= 1.67</span><span class=\"ltr\">σ = 1.29</span><span class=\"ltr\">z = (22 − 20)/1.29 = 1.55</span><span class=\"ltr\">→ P = 0.5 + 0.4394 = 0.9394</span>والاحتمال عمره ما يعدّي 1.",
       "ow": [
        "الاحتمال لازم يبقى بين 0 و 1، فـ 9.31 مستحيلة؛<span class=\"ltr\">z = (22 − 20)/1.29 = 1.55</span>بيدّي <bdi dir=\"ltr\">P&nbsp;=&nbsp;0.9394</bdi>.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ Decision variables</b>: الـ x هي عدد وحدات X في الأسبوع، والـ y هي عدد وحدات Y في الأسبوع.<br><table><tr><th></th><th dir=\"ltr\">X</th><th dir=\"ltr\">Y</th><th>المتاح</th></tr><tr><td>ساعات الماكينة</td><td>1</td><td>2</td><td dir=\"ltr\">≤ 300</td></tr><tr><td>ساعات العمالة</td><td>4</td><td>5</td><td dir=\"ltr\">≤ 600</td></tr><tr><td>الربح (LE)</td><td>10</td><td>20</td><td></td></tr></table>الـ Objective:<span class=\"ltr\"><b>Max Z = 10x + 20y</b></span>الـ Subject to، ساعات الماكينة:<span class=\"ltr\">x + 2y ≤ 300</span>ساعات العمالة:<span class=\"ltr\">4x + 5y ≤ 600</span>إنتاج X على الأقل ضعف Y:<span class=\"ltr\">x ≥ 2y</span>يعني:<span class=\"ltr\">x − 2y ≥ 0</span>إجمالي الإنتاج:<span class=\"ltr\">x + y ≥ 30</span>أرقام حقيقية، مفيش شرط integer:<span class=\"ltr\">x, y ≥ 0</span><i>مش مطلوب، بس الـ LP optimum هو:</i><span class=\"ltr\"><i>x = 1200/13 ≈ 92.3, y = 600/13 ≈ 46.2, Z ≈ 1846</i></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ LP relaxation</b>، الخطوط:<span class=\"ltr\">8000X + 4000Y = 40000</span><span class=\"ltr\">(intercepts (0,10), (5,0))</span><span class=\"ltr\">15X + 30Y = 200</span><span class=\"ltr\">(intercepts (0, 6.67), (13.3, 0))</span><span class=\"ltr\">Y = 6, X = 1</span>المنطقة هي المساحة الصغيرة:<span class=\"ltr\">0 ≤ X ≤ 1</span>بين <bdi dir=\"ltr\">Y&nbsp;=&nbsp;6</bdi> والخط <bdi dir=\"ltr\">15X&nbsp;+&nbsp;30Y&nbsp;=&nbsp;200</bdi>، وأول constraint مش binding هناك.<br>الـ Corners:<span class=\"ltr\">(0, 6): Z = 900</span><span class=\"ltr\">(1, 6): Z = 1000</span><span class=\"ltr\">(1, 37/6 = 6.17): Z = 100 + 925 = 1025</span><span class=\"ltr\">(0, 6.67): Z = 1000</span><b>الـ Node 1</b>:<span class=\"ltr\">X = 1, Y = 6.17, Z = 1025</span>الـ Y فيه كسر، فاعمل branch على Y.<br><b>الـ Node 2 <bdi dir=\"ltr\">(Y&nbsp;≤&nbsp;6)</bdi></b>: مع <bdi dir=\"ltr\">Y&nbsp;≥&nbsp;6</bdi> ده بيجبر <bdi dir=\"ltr\">Y&nbsp;=&nbsp;6</bdi>؛ أحسن نقطة <bdi dir=\"ltr\">(1,&nbsp;6)</bdi> و<bdi dir=\"ltr\">Z&nbsp;=&nbsp;1000</bdi>، وده integer (الـ incumbent).<br><b>الـ Node 3 <bdi dir=\"ltr\">(Y&nbsp;≥&nbsp;7)</bdi></b> بيدّي:<span class=\"ltr\">15X + 210 ≤ 200</span>ده مستحيل، يبقى infeasible.<br><b>الـ Optimal integer solution</b> <bdi dir=\"ltr\">(L6)</bdi> هو:<span class=\"ltr\"><b>X = 1, Y = 6, Z = 1000</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ Backward approach <bdi dir=\"ltr\">(L9)</bdi>:<br><b>الـ Stage 3</b>:<span class=\"ltr\">d(J5, J8) = 13</span><span class=\"ltr\">d(J6, J8) = 4</span><span class=\"ltr\">d(J7, J8) = 15</span><b>الـ Stage 2</b>، والـ J2 عن طريق J6:<span class=\"ltr\">d(J2) = min{12 + 13, 8 + 4} = min{25, 12} = 12</span><span class=\"ltr\">d(J3) = 10 + 4 = 14</span><span class=\"ltr\">d(J4) = 9 + 15 = 24</span><b>الـ Stage 1</b>:<span class=\"ltr\">d(J1) = min{4 + 12, 9 + 14, 11 + 24}</span><span class=\"ltr\">= min{16, 23, 35} = 16</span><b>أقصر path، والمسافة 16:</b><span class=\"ltr\"><b>J1 → J2 → J6 → J8</b></span>"
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
       "why": "ده تعريف الـ project؛ لكن الـ CPM بيحدد وقت الـ project والـ activities المهمة (L7).",
       "ow": [
        "الجملة دي تعريف الـ PROJECT؛ لكن الـ CPM هي الـ method اللي بتطلّع وقت الـ project والـ critical activities.",
        null
       ]
      },
      {
       "why": "ده تعريف الـ dummy activity؛ الـ start activity هي اللي مالهاش predecessor.",
       "ow": [
        "إنها ماتستهلكش موارد وبتوضح الـ dependence بس ده تعريف الـ DUMMY activity؛ الـ start activity ببساطة هي اللي مالهاش predecessor.",
        null
       ]
      },
      {
       "why": "جملة «لازم تخلص قبل ما activity تانية تبدأ على طول» دي تعريف الـ PREDECESSOR؛ الـ dummy مابتاخدش وقت ولا موارد وبتوضح الـ dependence بس (L7).",
       "ow": [
        "الجملة دي تعريف الـ predecessor activity؛ الـ dummy مجرد سهم وقته صفر بيوضح الـ dependence بس.",
        null
       ]
      },
      {
       "why": "ده تعريف المحاضرة: الـ successor activity ماينفعش تبدأ غير لما activity أو أكتر (الـ predecessors بتوعها) يخلصوا (L7).",
       "ow": [
        null,
        "الـ False معناها إنك بترفض تعريف L7: الـ successor هي بالظبط الـ activity اللي بتستنى غيرها يخلص."
       ]
      },
      {
       "why": "ده تعريف المحاضرة للـ path: سلسلة متصلة من nodes و activities بالتبادل، من الـ start event لحد الـ end event (L7).",
       "ow": [
        null,
        "الـ False معناها إنك بترفض تعريف L7 للـ path في الـ network."
       ]
      },
      {
       "why": "ده تعريف \"linear\"؛ والـ \"programming\" معناها تحديد plan of action (L1).",
       "ow": [
        "جملة إن كل العلاقات linear دي تعريف كلمة 'linear'؛ لكن 'programming' معناها تحديد program أو plan of action معيّن.",
        null
       ]
      },
      {
       "why": "ده تعريف الـ integer programming؛ والـ relaxation بيشيل الـ integer constraints (L6).",
       "ow": [
        "الـ optimization problem اللي الـ decision variables بتاعتها integer ده INTEGER program؛ والـ LP relaxation بتاعه بيشيل الـ integer constraints.",
        null
       ]
      },
      {
       "why": "الجملة دي تعريف الـ operations research (L1)؛ لكن الـ formulation معناها إننا نترجم المشكلة الحقيقية لمعادلات رياضية ينفع تتحل.",
       "ow": [
        "ده تعريف الـ OR متلزّق على مصطلح غلط؛ الـ formulation هي ترجمة المشكلة الحقيقية لمعادلات ينفع تتحل.",
        null
       ]
      },
      {
       "why": "ده تعريف L1: الـ constraints هي الـ linear inequalities على متغيرات الـ LPP (الـ capacity والـ availability والـ resources).",
       "ow": [
        null,
        "الـ False معناها إنك بترفض تعريف L1 للـ constraints حرفيًا."
       ]
      },
      {
       "why": "الـ pivot element هو اللي عند التقاطع (L3).",
       "ow": [
        "العنصر اللي عند تقاطع الـ pivot column والـ pivot row ده الـ PIVOT؛ الـ exiting variable هو الـ basic variable بتاع الـ pivot row.",
        null
       ]
      },
      {
       "why": "الـ A critical <bdi dir=\"ltr\">(L7)</bdi> يعني:<span class=\"ltr\">ES = LS = 0, LF = EF = 6</span>",
       "ow": [
        null,
        "الـ False غلط: الـ A critical <bdi dir=\"ltr\">(A-B-C-L-M)</bdi>، فـ:<span class=\"ltr\">LF(A) = EF(A) = 0 + 6 = 6</span>"
       ]
      },
      {
       "why": "أطول path هو:<span class=\"ltr\">A-B-C-L-M = 6 + 4 + 7 + 3 + 5 = 25</span>وكلهم الـ total float بتاعهم صفر.",
       "ow": [
        null,
        "الـ False غلط: الـ path ده:<span class=\"ltr\">A-B-C-L-M = 25</span>وده أطول path، والخمس activities دول الـ total float بتاعهم صفر."
       ]
      },
      {
       "why": "الـ paths التانية:<span class=\"ltr\">J-I-M 24, G-H-I-M 23,</span><span class=\"ltr\">A-K-L-M 23, A-D-E-F 22</span>",
       "ow": [
        null,
        "الـ False غلط: الـ forward pass بيخلص عند <bdi dir=\"ltr\">EF(M)&nbsp;=&nbsp;25</bdi> عن طريق <bdi dir=\"ltr\">A-B-C-L-M</bdi>؛ وكل الـ paths التانية أقصر."
       ]
      },
      {
       "why": "الـ A والـ G والـ J مالهمش predecessors، فالـ forward pass بيبدّأ التلاتة عند <bdi dir=\"ltr\">ES&nbsp;=&nbsp;0</bdi> (L7).",
       "ow": [
        null,
        "الـ False غلط: الـ A والـ G والـ J كلهم طالعين من الـ start node ومالهمش predecessors، فكل واحد فيهم <bdi dir=\"ltr\">ES&nbsp;=&nbsp;0</bdi>."
       ]
      },
      {
       "why": "القيم:<span class=\"ltr\">LF(A) = 6</span><span class=\"ltr\">LF(G) = LS(H) = 4</span><span class=\"ltr\">LF(J) = LS(I) = 14</span>",
       "ow": [
        "هما مشتركين في <bdi dir=\"ltr\">ES&nbsp;=&nbsp;0</bdi>، بس الـ backward pass بيدّي:<span class=\"ltr\">LF(A) = 6</span><span class=\"ltr\">LF(G) = LS(H) = 4</span><span class=\"ltr\">LF(J) = LS(I) = 14</span>",
        null
       ]
      },
      {
       "why": "الـ predecessor الوحيد لـ E هو D:<span class=\"ltr\">ES(D) = EF(A) = 6, EF(D) = 6 + 2 = 8</span>يبقى <bdi dir=\"ltr\">ES(E)&nbsp;=&nbsp;8</bdi> (L7، الـ forward pass).",
       "ow": [
        null,
        "الـ False غلط: الـ E جاية بعد D بس، و<bdi dir=\"ltr\">EF(D)&nbsp;=&nbsp;6&nbsp;+&nbsp;2&nbsp;=&nbsp;8</bdi>، يبقى <bdi dir=\"ltr\">ES(E)&nbsp;=&nbsp;8</bdi>."
       ]
      },
      {
       "why": "الـ Floats:<span class=\"ltr\">G 2, J 1, D 3, E 3, F 3, H 2, I 1, K 2</span>كلها مش صفر، ودول بالظبط الـ activities اللي برا الـ path ده:<span class=\"ltr\">A-B-C-L-M</span>",
       "ow": [
        null,
        "الـ False غلط: كل activity برا <bdi dir=\"ltr\">A-B-C-L-M</bdi> ليها float موجب:<span class=\"ltr\">J 1, I 1, G 2, H 2, K 2, D 3, E 3, F 3</span>"
       ]
      },
      {
       "why": "الـ successor الوحيد لـ K هو L:<span class=\"ltr\">LS(L) = 20 − 3 = 17</span>يبقى <bdi dir=\"ltr\">LF(K)&nbsp;=&nbsp;17</bdi>؛ والـ 9 دي الـ duration بتاع K، والـ <bdi dir=\"ltr\">EF(K)&nbsp;=&nbsp;15</bdi> (L7، الـ backward pass).",
       "ow": [
        "الـ 9 دي الـ duration بتاع K؛ لكن:<span class=\"ltr\">LF(K) = LS(L) = 17</span><span class=\"ltr\">EF(K) = 6 + 9 = 15</span>",
        null
       ]
      },
      {
       "why": "الـ G مالهاش predecessor، فبتبدأ من الـ start node بـ <bdi dir=\"ltr\">ES&nbsp;=&nbsp;0</bdi> (L7، الـ forward pass).",
       "ow": [
        null,
        "الـ False غلط: الـ G مالهاش predecessor، فالـ earliest start بتاعها بيساوي 0."
       ]
      },
      {
       "why": "الـ M آخر activity: الـ <bdi dir=\"ltr\">LF&nbsp;=&nbsp;25</bdi> (والـ ES بتاعها 20).",
       "ow": [
        "الـ 20 دي الـ ES بتاع M (وهي نفس الـ LS، لأن M critical)؛ وبما إنها آخر activity الـ LF بتاعها بيساوي وقت الـ project، يعني 25.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "المسألة Balanced <bdi dir=\"ltr\">(17&nbsp;=&nbsp;17)</bdi>. الـ LCM <bdi dir=\"ltr\">(L4)</bdi>:<br>(1) تكلفة 0:<span class=\"ltr\">(Q2, D2) = min(1, 5) = 1</span>فالـ Q2 خلص، والـ D2 محتاج 4.<br>(2) خانات التكلفة 1 في Q2 متشطبة. تكلفة 2:<span class=\"ltr\">(Q1, D1) = min(6, 7) = 6</span>فالـ Q1 خلص، والـ D1 محتاج 1.<br>(3) تكلفة 3 <bdi dir=\"ltr\">(Q1,&nbsp;D2)</bdi> متشطبة. تكلفة 5:<span class=\"ltr\">(Q3, D1) = 1</span>فالـ D1 خلص.<br>(4) تكلفة 8:<span class=\"ltr\">(Q3, D2) = 4</span>فالـ D2 خلص. تكلفة 9:<span class=\"ltr\">(Q3, D4) = 2</span>فالـ D4 خلص. تكلفة 15:<span class=\"ltr\">(Q3, D3) = 3</span><table><tr><th></th><th dir=\"ltr\">D1</th><th dir=\"ltr\">D2</th><th dir=\"ltr\">D3</th><th dir=\"ltr\">D4</th><th dir=\"ltr\">S</th></tr><tr><td dir=\"ltr\">Q1</td><td>6</td><td dir=\"ltr\">–</td><td dir=\"ltr\">–</td><td dir=\"ltr\">–</td><td>6</td></tr><tr><td dir=\"ltr\">Q2</td><td dir=\"ltr\">–</td><td>1</td><td dir=\"ltr\">–</td><td dir=\"ltr\">–</td><td>1</td></tr><tr><td dir=\"ltr\">Q3</td><td>1</td><td>4</td><td>3</td><td>2</td><td>10</td></tr></table>عدد الخانات المتوزع فيها:<span class=\"ltr\">6 = m + n − 1</span><b>التكلفة الكلية:</b><span class=\"ltr\"><b>2×6 + 0×1 + 5×1 + 8×4 + 15×3 + 9×2</b></span><span class=\"ltr\"><b>= 12 + 0 + 5 + 32 + 45 + 18 = 112</b></span><i>للمعلومية: الـ VAM بيدّي 102، والـ optimum الحقيقي 100.</i>"
      },
      {
       "ans": "الـ Pivot column هو x1 (الـ <bdi dir=\"ltr\">−12</bdi> أكتر سالب). الـ Ratios:<span class=\"ltr\">12/3 = 4, 18/2 = 9</span>يبقى الـ pivot row هو s1، و<b>الـ pivot element هو 3</b>؛ الـ x1 داخل والـ s1 خارج <bdi dir=\"ltr\">(L3)</bdi>.<br>صف x1 الجديد:<span class=\"ltr\">R1 ÷ 3 = (1, 2, 1/3, 0 | 4)</span>صف s2 الجديد (باستخدام صف x1 الجديد):<span class=\"ltr\">R2 − 2 × x1</span><span class=\"ltr\">= (2 − 2, 9 − 4, 0 − 2/3, 1 − 0 | 18 − 8)</span><span class=\"ltr\">= (0, 5, −2/3, 1 | 10)</span>صف Z الجديد (باستخدام صف x1 الجديد):<span class=\"ltr\">Z + 12 × x1</span><span class=\"ltr\">= (0, −7 + 24, 0 + 4, 0 | 0 + 48)</span><span class=\"ltr\">= (0, 17, 4, 0 | 48)</span><table><tr><th dir=\"ltr\">B.V</th><th dir=\"ltr\">x1</th><th dir=\"ltr\">x2</th><th dir=\"ltr\">s1</th><th dir=\"ltr\">s2</th><th dir=\"ltr\">b</th></tr><tr><td dir=\"ltr\">x1</td><td>1</td><td>2</td><td dir=\"ltr\">1/3</td><td>0</td><td>4</td></tr><tr><td dir=\"ltr\">s2</td><td>0</td><td>5</td><td dir=\"ltr\">−2/3</td><td>1</td><td>10</td></tr><tr><td dir=\"ltr\">Z</td><td>0</td><td>17</td><td>4</td><td>0</td><td>48</td></tr></table>مفيش أرقام سالبة فاضلة في صف Z، يبقى ده optimal:<span class=\"ltr\"><b>x1 = 4, x2 = 0, s2 = 10, Z = 48</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ Variables</b>: الـ x1 هي أطنان X في اليوم، والـ x2 هي أطنان Y في اليوم.<br>الـ Objective:<span class=\"ltr\"><b>Max Z = 80x1 + 120x2</b></span>الـ Subject to، الطاقة الإنتاجية:<span class=\"ltr\">x1 + x2 ≤ 9</span>عقد X:<span class=\"ltr\">x1 ≥ 2</span>عقد Y:<span class=\"ltr\">x2 ≥ 3</span>ساعات الماكينة:<span class=\"ltr\">20x1 + 50x2 ≤ 360</span>وأخيرًا:<span class=\"ltr\">x1, x2 ≥ 0</span><i>مش مطلوب، بس الـ optimum بالرسم عند تقاطع:</i><span class=\"ltr\"><i>x1 + x2 = 9, 20x1 + 50x2 = 360</i></span><i>وهو:</i><span class=\"ltr\"><i>x1 = 3, x2 = 6, Z = Rs 960</i></span>"
      },
      {
       "ans": "<b>الـ LP relaxation</b>، الـ corners:<span class=\"ltr\">(0,0) 0; (3,0) 9; (2.79, 0.36) ≈ 12.6;</span><span class=\"ltr\">(1.5, 1) 16.5; (0,1) 12</span>يعني الـ Node 1:<span class=\"ltr\">x1 = 1.5, x2 = 1, Z = 16.5</span>اعمل branch على x1.<br><b>الـ Node 2 <bdi dir=\"ltr\">(x1&nbsp;≤&nbsp;1)</bdi></b>، الـ corners:<span class=\"ltr\">(0,1) 12, (1,1) 15, (1,0) 3</span><span class=\"ltr\">→ (1, 1), Z = 15</span>وده integer، يبقى الـ incumbent.<br><b>الـ Node 3 <bdi dir=\"ltr\">(x1&nbsp;≥&nbsp;2)</bdi></b>، الـ corners:<span class=\"ltr\">(2, 0.75) 15, (2,0) 6, (3,0) 9,</span><span class=\"ltr\">(2.79, 0.36) 12.6</span><span class=\"ltr\">→ (2, 0.75), Z = 15</span>مش أحسن من 15 (fathomed). ولو عملت branch برضه:<span class=\"ltr\">x2 ≤ 0 → (3,0), Z = 9</span><span class=\"ltr\">x2 ≥ 1 → infeasible</span><b>الـ Optimal integer solution</b> <bdi dir=\"ltr\">(L6)</bdi> هو:<span class=\"ltr\"><b>x1 = 1, x2 = 1, Z = 15</b></span>"
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
       "ans": "التوصيل (تعريفات Revision 1):<span class=\"ltr\">1 → <b>D</b> · 2 → <b>C</b> · 3 → <b>B</b> ·</span><span class=\"ltr\">4 → <b>E</b> · 5 → <b>A</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Pivot column هو x2 <bdi dir=\"ltr\">(−20)</bdi>؛ الـ ratios:<span class=\"ltr\">3 ÷ 1/2 = 6, 5 ÷ 3/2 = 3.33</span>يبقى الـ pivot هو <bdi dir=\"ltr\">3/2</bdi> في صف s2 (L3).",
       "ow": [
        "الـ <bdi dir=\"ltr\">−20</bdi> ده رقم في صف الـ Z، وهو اللي بيحدد الـ pivot column (x2)؛ أرقام صف الـ Z عمرها ما بتبقى pivot. الـ pivot هو <bdi dir=\"ltr\">3/2</bdi> (الـ ratio بتاعه <bdi dir=\"ltr\">3.33&nbsp;&lt;&nbsp;6</bdi>).",
        null
       ]
      },
      {
       "why": "الصف الصح هو:<span class=\"ltr\">x1 | 1 | 0 | 1.33 | −0.33 | 1.33</span>وقيم الـ x1 والـ x2 متبدلين في الجملة.",
       "ow": [
        "قيم الـ x1 والـ x2 متبدلين: الـ R1 ناقص نص صف x2 الجديد بيسيب 1 تحت x1 و 0 تحت x2، فالصف الصح:<span class=\"ltr\">x1 | 1, 0, 1.33, −0.33 | 1.33</span>",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">R2 ÷ 1.5 = (0, 1, −5/3, 2/3 | 10/3)</span>ومكتوب عليه x2.",
       "ow": [
        null,
        "الـ False غلط: الـ pivot row (s2) لما تقسمه على <bdi dir=\"ltr\">3/2</bdi> يطلع:<span class=\"ltr\">(0, 1, −5/3, 2/3 | 10/3)</span><span class=\"ltr\">= (0, 1, −1.67, 0.67 | 3.33)</span>ومكتوب عليه x2."
       ]
      },
      {
       "why": "صف الـ Z زائد 20 مرة صف x2 الجديد:<span class=\"ltr\">(0, 0, 60 − 33.3, 13.3 | 360 + 66.7)</span>",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">Z + 20 × (0, 1, −5/3, 2/3 | 10/3)</span><span class=\"ltr\">= (0, 0, 26.7, 13.3 | 426.7)</span>بالظبط زي المكتوب."
       ]
      },
      {
       "why": "الـ te لكل activity:<span class=\"ltr\">A 6, B 5, C 12, D 5, E 9,</span><span class=\"ltr\">F 11, G 7, H 4, I 15</span>الـ Critical path هو <bdi dir=\"ltr\">A-C-F-H&nbsp;=&nbsp;33</bdi>؛ والـ D ليها float بيساوي 11 (L8).",
       "ow": [
        "الـ D مش critical:<span class=\"ltr\">A-D-G-H = 6 + 5 + 7 + 4 = 22</span>قصاد 33، يعني الـ D ليها float بيساوي 11. الـ critical path هو <bdi dir=\"ltr\">A-C-F-H</bdi>.",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">A-C-F-H = 6 + 12 + 11 + 4 = 33</span>والباقي:<span class=\"ltr\">B-E-I = 29, A-C-G-H = 29</span>",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">A-C-F-H = 6 + 12 + 11 + 4 = 33</span>وده أطول path (الـ B-E-I والـ A-C-G-H كل واحد فيهم 29)."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (a + 4m + b)/6 = (4 + 20 + 6)/6 = 5</span><span class=\"ltr\">σ² = ((b − a)/6)² = (2/6)² = 0.11</span>زي المكتوب بالظبط (L8).",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">(4 + 4×5 + 6)/6 = 5</span><span class=\"ltr\">((6 − 4)/6)² = 0.11</span>الاتنين زي المكتوب."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te(C) = (6 + 48 + 18)/6 = 12</span>لكن:<span class=\"ltr\">te(H) = (2 + 16 + 6)/6 = 4</span>يبقى مش متساويين (L8).",
       "ow": [
        "الحساب:<span class=\"ltr\">te(C) = (6 + 4×12 + 18)/6 = 12</span><span class=\"ltr\">te(H) = (2 + 4×4 + 6)/6 = 4</span>يعني مختلفين.",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">σ²(G) = ((11 − 3)/6)² = 1.78</span>لكن:<span class=\"ltr\">σ²(I) = ((18 − 8)/6)² = 2.78</span>يبقى الـ variances مختلفة (L8).",
       "ow": [
        "الحساب:<span class=\"ltr\">σ²(G) = (8/6)² = 1.78</span><span class=\"ltr\">σ²(I) = (10/6)² = 2.78</span>الفرق <bdi dir=\"ltr\">b&nbsp;−&nbsp;a</bdi> مختلف (8 و 10).",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (2 + 4×5 + 8)/6 = 30/6 = 5</span><span class=\"ltr\">σ² = ((8 − 2)/6)² = 1</span>زي المكتوب (L8).",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">(2 + 20 + 8)/6 = 5</span><span class=\"ltr\">((8 − 2)/6)² = 1</span>الاتنين زي المكتوب."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (8 + 64 + 18)/6 = 15</span>بس:<span class=\"ltr\">σ² = (10/6)² = 2.78</span>",
       "ow": [
        "الـ <bdi dir=\"ltr\">te&nbsp;=&nbsp;15</bdi> صح، بس:<span class=\"ltr\">σ² = ((18 − 8)/6)² = 2.78</span>والـ <bdi dir=\"ltr\">1.78&nbsp;=&nbsp;(8/6)²</bdi> دي جاية من إنك استخدمت <bdi dir=\"ltr\">m&nbsp;−&nbsp;a</bdi> بدل <bdi dir=\"ltr\">b&nbsp;−&nbsp;a</bdi>.",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (8 + 4×11 + 14)/6 = 66/6 = 11</span><span class=\"ltr\">σ² = ((14 − 8)/6)² = 1</span>زي المكتوب (L8).",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">(8 + 44 + 14)/6 = 11</span><span class=\"ltr\">((14 − 8)/6)² = 1</span>الاتنين زي المكتوب."
       ]
      },
      {
       "why": "الـ critical هم الـ A والـ C والـ F والـ H:<span class=\"ltr\">σ² = 1 + 4 + 1 + 0.44 = 6.44</span><span class=\"ltr\">→ σ = 2.54</span>",
       "ow": [
        null,
        "الـ False غلط: الـ variances بتاعة الـ critical activities:<span class=\"ltr\">A 1 + C 4 + F 1 + H 0.44 = 6.44</span><span class=\"ltr\">σ = √6.44 = 2.54</span>"
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">z = (32 − 33)/2.54 = −0.39</span><span class=\"ltr\">→ P = 0.5 − 0.1517 = 0.3483</span>",
       "ow": [
        "عشان <bdi dir=\"ltr\">32&nbsp;&lt;&nbsp;μ&nbsp;=&nbsp;33</bdi>، الـ <bdi dir=\"ltr\">z&nbsp;=&nbsp;−0.39</bdi> والمساحة من الجدول 0.1517، يبقى:<span class=\"ltr\">P = 0.5 − 0.1517 = 0.3483</span>مش 0.3937.",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">z = (35 − 33)/2.54 = 0.79</span><span class=\"ltr\">→ P = 0.5 + 0.2852 = 0.7852</span>مش 0.7874.",
       "ow": [
        "الحساب:<span class=\"ltr\">z = (35 − 33)/2.54 = 0.79</span>والمساحة من الجدول 0.2852، يبقى:<span class=\"ltr\">P = 0.5 + 0.2852 = 0.7852</span>الـ 0.7874 المكتوبة مش مطابقة للجدول.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ Penalty هي تاني أقل تكلفة ناقص أقل تكلفة <bdi dir=\"ltr\">(L4)</bdi>.<br><b>الـ Step 1</b>، الصفوف:<span class=\"ltr\">60, 126, 90, 116</span>والأعمدة:<span class=\"ltr\">18, 237, 70, 100</span>يبقى D2 <bdi dir=\"ltr\">(237)</bdi>، وأرخص خانة 198:<span class=\"ltr\"><b>Q4D2 = 30</b></span>الـ Q4 خلص، والـ D2 محتاج 15.<br><b>الـ Step 2</b>، الصفوف:<span class=\"ltr\">60, 126, 90</span>والأعمدة:<span class=\"ltr\">18, 15, 70, 100</span>يبقى Q2 <bdi dir=\"ltr\">(126)</bdi>، وأرخص خانة 315:<span class=\"ltr\"><b>Q2D1 = 35</b></span>الـ D1 خلص، والـ Q2 فاضله 15.<br><b>الـ Step 3</b>، الصفوف:<span class=\"ltr\">60, 9, 90</span>والأعمدة:<span class=\"ltr\">D2 15, D3 70, D4 100</span>يبقى D4 <bdi dir=\"ltr\">(100)</bdi>، وأرخص خانة 200:<span class=\"ltr\"><b>Q3D4 = 20</b></span>الـ D4 خلص، والـ Q3 فاضله 20.<br><b>الـ Step 4</b>، الصفوف:<span class=\"ltr\">Q1 152, Q2 9, Q3 145</span>والأعمدة:<span class=\"ltr\">15, 70</span>يبقى Q1 <bdi dir=\"ltr\">(152)</bdi>، وأرخص خانة 360:<span class=\"ltr\"><b>Q1D3 = 20</b></span>الـ Q1 خلص، والـ D3 محتاج 20.<br><b>الـ Step 5</b>، الصفوف:<span class=\"ltr\">Q2 9, Q3 145</span>والأعمدة:<span class=\"ltr\">D2 15, D3 151</span>يبقى D3، وأرخص خانة 290:<span class=\"ltr\"><b>Q3D3 = 20</b></span><b>الـ Step 6</b>، الباقي:<span class=\"ltr\"><b>Q2D2 = 15</b></span><table><tr><th></th><th dir=\"ltr\">D1</th><th dir=\"ltr\">D2</th><th dir=\"ltr\">D3</th><th dir=\"ltr\">D4</th></tr><tr><td dir=\"ltr\">Q1</td><td></td><td></td><td>20</td><td></td></tr><tr><td dir=\"ltr\">Q2</td><td>35</td><td>15</td><td></td><td></td></tr><tr><td dir=\"ltr\">Q3</td><td></td><td></td><td>20</td><td>20</td></tr><tr><td dir=\"ltr\">Q4</td><td></td><td>30</td><td></td><td></td></tr></table><b>الـ Total:</b><span class=\"ltr\"><b>360×20 + 315×35 + 450×15</b></span><span class=\"ltr\"><b>+ 290×20 + 200×20 + 198×30</b></span><span class=\"ltr\"><b>= 7200 + 11025 + 6750</b></span><span class=\"ltr\"><b>+ 5800 + 4000 + 5940 = 40,715</b></span>فيه 6 خانات بس، و<bdi dir=\"ltr\">m&nbsp;+&nbsp;n&nbsp;−&nbsp;1&nbsp;=&nbsp;7</bdi>، يبقى الحل degenerate. ودي كمان الـ optimal cost."
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ Row reduction</b>، والـ mins هي:<span class=\"ltr\">9, 43, 28, 27, 11</span>الصفوف بتبقى:<span class=\"ltr\">M1 (0,13,49,2,10)</span><span class=\"ltr\">M2 (0,35,29,7,20)</span><span class=\"ltr\">M3 (13,0,63,9,17)</span><span class=\"ltr\">M4 (47,15,0,22,12)</span><span class=\"ltr\">M5 (25,0,46,11,14)</span><b>الـ Column reduction</b>، والـ mins هي:<span class=\"ltr\">0, 0, 0, 2, 10</span>الصفوف بتبقى:<span class=\"ltr\">M1 (0,13,49,0,0)</span><span class=\"ltr\">M2 (0,35,29,5,10)</span><span class=\"ltr\">M3 (13,0,63,7,7)</span><span class=\"ltr\">M4 (47,15,0,20,2)</span><span class=\"ltr\">M5 (25,0,46,9,4)</span>أقل عدد خطوط 4 (الصف M1، والأعمدة A وB وC)، وده أقل من 5، يبقى:<span class=\"ltr\">θ = 2 (M4, E)</span>الصفوف بتبقى:<span class=\"ltr\">M1 (2,15,51,0,0)</span><span class=\"ltr\">M2 (0,35,29,3,8)</span><span class=\"ltr\">M3 (13,0,63,5,5)</span><span class=\"ltr\">M4 (47,15,0,18,0)</span><span class=\"ltr\">M5 (25,0,46,7,2)</span>الخطوط 4 (الصفوف M1 وM4، والأعمدة A وB)، يبقى:<span class=\"ltr\">θ = 2 (M5, E)</span>الصفوف بتبقى:<span class=\"ltr\">M1 (4,17,51,0,0)</span><span class=\"ltr\">M2 (0,35,27,1,6)</span><span class=\"ltr\">M3 (13,0,61,3,3)</span><span class=\"ltr\">M4 (49,17,0,18,0)</span><span class=\"ltr\">M5 (25,0,44,5,0)</span>دلوقتي 5 خطوط، اعمل assign:<span class=\"ltr\">M2 → A, M3 → B, M4 → C,</span><span class=\"ltr\">M1 → D, M5 → E</span><b>التكلفة الكلية</b> <bdi dir=\"ltr\">(L5)</bdi> هي:<span class=\"ltr\"><b>43 + 28 + 27 + 11 + 25 = 134</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ x1 هي عدد الـ bookcases الكبيرة، والـ x2 هي عدد الـ bookcases الصغيرة.<br>الـ Model:<span class=\"ltr\"><b>Max Z = 50x1 + 20x2</b></span><span class=\"ltr\">s.t. 6x1 + 2x2 ≤ 24, x1 ≥ 2, x2 ≥ 3,</span><span class=\"ltr\">x1, x2 ≥ 0</span>الرسم: الخط <bdi dir=\"ltr\">6x1&nbsp;+&nbsp;2x2&nbsp;=&nbsp;24</bdi> بيعدّي على <bdi dir=\"ltr\">(4,&nbsp;0)</bdi> و<bdi dir=\"ltr\">(0,&nbsp;12)</bdi>؛ وخط رأسي <bdi dir=\"ltr\">x1&nbsp;=&nbsp;2</bdi>؛ وخط أفقي <bdi dir=\"ltr\">x2&nbsp;=&nbsp;3</bdi>. أركان المثلث الـ feasible:<span class=\"ltr\">(2, 3): Z = 100 + 60 = 160</span><span class=\"ltr\">(2, 6): 12 + 12 = 24</span><span class=\"ltr\">→ Z = 100 + 120 = <b>220</b></span>والركن <bdi dir=\"ltr\">(3,&nbsp;3)</bdi> على الخط:<span class=\"ltr\">6x1 + 2(3) = 24 → x1 = 3</span><span class=\"ltr\">Z = 150 + 60 = 210</span><b>أقصى ربح $220 في الأسبوع: 2 كبار و 6 صغيرين</b> (L2)."
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
       "ans": "التوصيل:<span class=\"ltr\">1 → <b>C</b> · 2 → <b>D</b> · 3 → <b>B</b> ·</span><span class=\"ltr\">4 → <b>E</b> · 5 → <b>F</b> · 6 → <b>A</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ penalties في الـ Step 1، الصفوف:<span class=\"ltr\">9, 10, 12</span>والأعمدة:<span class=\"ltr\">21, 22, 10, 10</span>يبقى D2 <bdi dir=\"ltr\">(22)</bdi>، وأرخص خانة 8 عند Q3، حط <bdi dir=\"ltr\">min(18,&nbsp;8)&nbsp;=&nbsp;8</bdi> (L4).",
       "ow": [
        "الـ Q3 عنده 18 unit، بس الـ D2 طالب 8 بس، فالـ VAM بيحط <bdi dir=\"ltr\">min(18,&nbsp;8)&nbsp;=&nbsp;8</bdi> في <bdi dir=\"ltr\">(Q3,&nbsp;D2)</bdi>.",
        null
       ]
      },
      {
       "why": "الـ Step 2، الصفوف:<span class=\"ltr\">9, 0, 20</span>والأعمدة:<span class=\"ltr\">D1 21, D3 10, D4 10</span>يبقى D1 <bdi dir=\"ltr\">(21)</bdi>، وأرخص خانة 19 عند Q1، وبتاخد 5.",
       "ow": [
        null,
        "الـ False غلط: بعد ما الـ D2 يتملي، الـ D1 بيبقى عنده أعلى penalty (21)، وأرخص خانة فيه Q1 (19)، فبتاخد الـ 5 كلهم."
       ]
      },
      {
       "why": "الـ Step 3: الـ penalty بتاع Q3 بيساوي 50، فـ:<span class=\"ltr\">Q3D4 = 10</span>والـ Q3 خلص. الـ Step 4: الـ penalty بتاع D4 بيساوي 50، فـ:<span class=\"ltr\">Q1D4 = 2</span>والـ Q1 خلص. الـ Step 5:<span class=\"ltr\">Q2D4 = 2</span>وبعدين:<span class=\"ltr\">Q2D3 = 7</span>يبقى:<span class=\"ltr\">M14 = M24 = 2</span>",
       "ow": [
        null,
        "الـ False غلط: الـ VAM بيدي <bdi dir=\"ltr\">Q1D4&nbsp;=&nbsp;2</bdi> (آخر 2 units عند Q1)، و<bdi dir=\"ltr\">Q2D4&nbsp;=&nbsp;2</bdi> (آخر 2 units طالبهم D4)، يبقى متساويين."
       ]
      },
      {
       "why": "الـ Q3 فاضله <bdi dir=\"ltr\">18&nbsp;−&nbsp;8&nbsp;=&nbsp;10</bdi>، وكلهم راحوا لـ D4 (تكلفة 20).",
       "ow": [
        null,
        "الـ False غلط: بعد <bdi dir=\"ltr\">Q3D2&nbsp;=&nbsp;8</bdi>، الـ Q3 فاضله <bdi dir=\"ltr\">18&nbsp;−&nbsp;8&nbsp;=&nbsp;10</bdi>، والـ VAM بيبعت الـ 10 كلهم لـ D4 (تكلفة 20)."
       ]
      },
      {
       "why": "الـ D2 اتغطى كله من Q3؛ يعني <bdi dir=\"ltr\">M22&nbsp;=&nbsp;0</bdi>. والـ 9 بتوع Q2 راحوا لـ D3 (7) والـ D4 (2).",
       "ow": [
        "الـ 8 units بتوع D2 كلهم جايين من Q3 (تكلفة 8)، فـ <bdi dir=\"ltr\">M22&nbsp;=&nbsp;0</bdi>؛ والـ 9 units بتوع Q2 راحوا لـ D3 (7) والـ D4 (2).",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">8×8 + 19×5 + 20×10 + 10×2 + 60×2 + 40×7</span><span class=\"ltr\">= 64 + 95 + 200 + 20 + 120 + 280 = $779</span>والـ optimum الحقيقي 721.",
       "ow": [
        "الـ $797 فيها رقمين متبدلين؛ حل الـ VAM:<span class=\"ltr\">64 + 95 + 200 + 20 + 120 + 280 = $779</span>",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Pivot column هو x2 <bdi dir=\"ltr\">(−3/2)</bdi>. الـ Ratios:<span class=\"ltr\">50 ÷ 5/2 = 20, 30 ÷ 1/2 = 60,</span><span class=\"ltr\">160 ÷ 1 = 160</span>يبقى الـ pivot هو <bdi dir=\"ltr\">5/2</bdi> (الصف 1) (L3).",
       "ow": [
        "الـ <bdi dir=\"ltr\">1/2</bdi> موجود في الـ pivot column (x2)، بس الـ ratio بتاعه:<span class=\"ltr\">30 ÷ 1/2 = 60</span>أكبر من:<span class=\"ltr\">50 ÷ 5/2 = 20</span>فالـ pivot هو <bdi dir=\"ltr\">5/2</bdi>.",
        null
       ]
      },
      {
       "why": "الصف 1 هو الـ pivot row:<span class=\"ltr\">R1 ÷ 5/2 = x2 | 0, 1, 2/5, −1/3, 0 | 20</span>",
       "ow": [
        "الصف 1 هو الـ pivot row نفسه، فبيتقسم على <bdi dir=\"ltr\">5/2</bdi> وبيتسمى x2:<span class=\"ltr\">(0, 1, 2/5, −1/3, 0 | 20)</span>",
        null
       ]
      },
      {
       "why": "الـ R2 ناقص نص صف x2 الجديد بيدّي:<span class=\"ltr\">x1 | 1, 0, −1/5, 1/3, 0 | 20</span>",
       "ow": [
        "الـ R2 ناقص نص صف x2 الجديد بيدّي:<span class=\"ltr\">x1 | 1, 0, −1/5, 1/3, 0 | 20</span>الصف المكتوب قيم الـ x1 والـ x2 والـ RHS فيه غلط.",
        null
       ]
      },
      {
       "why": "الـ R3 ناقص صف x2 الجديد (مضروب في 1) بيدّي:<span class=\"ltr\">(0, 0, −2/5, −4/3 + 1/3, 1 | 160 − 20)</span><span class=\"ltr\">= (0, 0, −2/5, −1, 1 | 140)</span>",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">R3 − 1 × (0, 1, 2/5, −1/3, 0 | 20)</span><span class=\"ltr\">= (0, 0, −2/5, −1, 1 | 140)</span>بالظبط زي المكتوب."
       ]
      },
      {
       "why": "الـ Z زائد <bdi dir=\"ltr\">3/2</bdi> مرة صف x2 الجديد بيدّي:<span class=\"ltr\">(0, 0, 3/5, 5/6 − 1/2, 0 | 150 + 30)</span><span class=\"ltr\">= (0, 0, 3/5, 1/3, 0 | 180)</span>ده optimal:<span class=\"ltr\">x1 = 20, x2 = 20, Z = 180</span>",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">Z + 3/2 × (0, 1, 2/5, −1/3, 0 | 20)</span><span class=\"ltr\">= (0, 0, 3/5, 1/3, 0 | 180)</span>وده الصف الـ optimal."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ A مالهاش predecessor، فبتبدأ من الـ start node، والـ forward pass بيدي <bdi dir=\"ltr\">ES(A)&nbsp;=&nbsp;0</bdi> (L7).",
       "ow": [
        null,
        "الـ False غلط: الـ A مالهاش predecessor، فالـ earliest start بتاعها 0."
       ]
      },
      {
       "why": "الـ ES:<span class=\"ltr\">C 5, D/E/F 7, G/H 5, I 10, J 10,</span><span class=\"ltr\">K 12, L 12, M 17</span>الـ I بتخلص عند 23، والـ M عند 22، يبقى:<span class=\"ltr\">T = 23</span>والـ critical path هو <bdi dir=\"ltr\">B-C-E-I</bdi>.",
       "ow": [
        "الـ forward pass بيخلص عند <bdi dir=\"ltr\">EF(I)&nbsp;=&nbsp;23</bdi> عن طريق:<span class=\"ltr\">B-C-E-I (5 + 2 + 3 + 13)</span>مفيش path بيوصل 32.",
        null
       ]
      },
      {
       "why": "الـ H ليها total float بيساوي 1 (الـ LS 6، والـ ES 5). الـ Critical هم الـ B والـ C والـ E والـ I.",
       "ow": [
        "الـ H مش critical: الـ <bdi dir=\"ltr\">ES(H)&nbsp;=&nbsp;5</bdi> لكن الـ <bdi dir=\"ltr\">LS(H)&nbsp;=&nbsp;6</bdi>، لأن:<span class=\"ltr\">B-H-L-M = 22 &lt; 23</span>يعني <bdi dir=\"ltr\">TF&nbsp;=&nbsp;1</bdi>. الـ critical هم الـ B والـ C والـ E والـ I بس.",
        null
       ]
      },
      {
       "why": "الـ Floats:<span class=\"ltr\">A 2, D 3, F 6, G 7, J 2, K 2, L 1, M 1</span>كلها موجبة، فكل activity في القايمة non-critical (والـ H، اللي الـ float بتاعها 1، هي كمان non-critical بس مش مذكورة).",
       "ow": [
        null,
        "الـ False غلط: الـ floats دي:<span class=\"ltr\">A 2, D 3, F 6, G 7, J 2, K 2, L 1, M 1</span>كلهم ليهم float موجب، يبقى كلهم non-critical."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">ES(C) = 5</span><span class=\"ltr\">ES(D) = ES(E) = max(EF A 5, EF C 7) = 7</span>",
       "ow": [
        "الحساب:<span class=\"ltr\">ES(C) = EF(B) = 5</span>لكن الـ D والـ E مستنيين الـ A والـ C الاتنين:<span class=\"ltr\">ES = max(5, 7) = 7</span>يبقى التلاتة مش متساويين.",
        null
       ]
      },
      {
       "why": "الـ predecessor الوحيد للـ I هو E:<span class=\"ltr\">ES(E) = max(EF A 5, EF C 7) = 7</span><span class=\"ltr\">EF(E) = 7 + 3 = 10</span>يبقى <bdi dir=\"ltr\">ES(I)&nbsp;=&nbsp;10</bdi> (L7).",
       "ow": [
        null,
        "الـ False غلط: الـ I جاية بعد E بس، و:<span class=\"ltr\">EF(E) = 7 + 3 = 10</span>يبقى <bdi dir=\"ltr\">ES(I)&nbsp;=&nbsp;10</bdi>."
       ]
      },
      {
       "why": "الـ B أول activity في الـ critical path اللي هو <bdi dir=\"ltr\">B-C-E-I</bdi> وطوله 23، يعني:<span class=\"ltr\">ES(B) = LS(B) = 0</span>فالـ total float بتاعها صفر (L7).",
       "ow": [
        null,
        "الـ False غلط: الـ B على الـ critical path اللي هو:<span class=\"ltr\">B-C-E-I</span>والـ critical activities الـ total float بتاعها صفر."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ Row reduction</b>، بالـ mins:<span class=\"ltr\">7, 4, 3, 1</span>الصفوف:<span class=\"ltr\">J1 (5,1,0,1)</span><span class=\"ltr\">J2 (2,2,0,4)</span><span class=\"ltr\">J3 (0,2,4,1)</span><span class=\"ltr\">J4 (0,2,4,3)</span><b>الـ Column reduction</b>، بالـ mins:<span class=\"ltr\">0, 1, 0, 1</span>الصفوف:<span class=\"ltr\">J1 (5,0,0,0)</span><span class=\"ltr\">J2 (2,1,0,3)</span><span class=\"ltr\">J3 (0,1,4,0)</span><span class=\"ltr\">J4 (0,1,4,2)</span>الـ Row scanning: الـ J2 فيه صفر واحد، يبقى:<span class=\"ltr\">J2 → P3</span>واشطب صفر J1 اللي في P3. الـ J4 فيه صفر واحد، يبقى:<span class=\"ltr\">J4 → P1</span>واشطب صفر J3 اللي في P1. وبعدين:<span class=\"ltr\">J3 → P4, J1 → P2</span>عدد الـ assignments بقى 4، يعني optimal، ومش محتاجين خطوة θ.<br><b>الحل</b> <bdi dir=\"ltr\">(L5)</bdi> هو:<span class=\"ltr\"><b>J1 → P2 (8), J2 → P3 (4),</b></span><span class=\"ltr\"><b>J3 → P4 (4), J4 → P1 (1)</b></span><b>والمجموع 17.</b>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ Dynamic programming هو mathematical technique بيتعامل مع الـ optimization للـ multistage decision problems (المسألة بتتحل stage بـ stage، وكل stage بتستخدم الـ optimal results بتاعة الـ stage اللي بعدها) (L9)."
      },
      {
       "ans": "<b>الـ Stage 4</b>:<span class=\"ltr\">d(8) = 2, d(9) = 6</span><b>الـ Stage 3</b>، والـ node 5 والـ node 7 عن طريق 8:<span class=\"ltr\">d(5) = min{6 + 2, 7 + 6} = 8</span><span class=\"ltr\">d(6) = 8 + 6 = 14</span><span class=\"ltr\">d(7) = min{9 + 2, 7 + 6} = 11</span><b>الـ Stage 2</b>، والـ node 3 عن طريق 5:<span class=\"ltr\">d(2) = 3 + 8 = 11</span><span class=\"ltr\">d(3) = min{7 + 8, 8 + 14, 7 + 11} = 15</span><span class=\"ltr\">d(4) = 7 + 11 = 18</span><b>الـ Stage 1</b>:<span class=\"ltr\">d(1) = min{4 + 11, 6 + 15, 4 + 18} = 15</span><b>أقصر path، وطوله 15</b> (L9)، هو:<span class=\"ltr\"><b>1 → 2 → 5 → 8 → 10</b></span>أرقام الـ arcs متقرية من الصورة؛ ونسخة سنة تالتة من نفس الـ network بتدّي نفس الإجابة."
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ x1 هي ساعات الشغل، والـ x2 هي ساعات الـ ping-pong.<br>الـ Objective:<span class=\"ltr\"><b>Max Z (fun) = x1 + 5x2</b></span>الـ Subject to، يوم 8 ساعات:<span class=\"ltr\">x1 + x2 ≤ 8</span>الشغل على الأقل تلات أضعاف الساعات:<span class=\"ltr\">x1 ≥ 3x2</span>يعني:<span class=\"ltr\">x1 − 3x2 ≥ 0</span>وأخيرًا:<span class=\"ltr\">x1, x2 ≥ 0</span><i>مش مطلوب، بس الـ optimum هو:</i><span class=\"ltr\"><i>x1 = 6, x2 = 2, fun = 16</i></span>"
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
       "ans": "التوصيل (مطابق لنموذج الطلبة):<span class=\"ltr\">1 → <b>D</b> · 2 → <b>F</b> · 3 → <b>A</b> ·</span><span class=\"ltr\">4 → <b>C</b> · 5 → <b>E</b> · 6 → <b>B</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ penalties في الـ Step 1، الصفوف:<span class=\"ltr\">13, 2, 4</span>والأعمدة:<span class=\"ltr\">4, 15, 8, 3</span>يبقى D2 <bdi dir=\"ltr\">(15)</bdi>، وأرخص خانة 22 عند Q1 <bdi dir=\"ltr\">(L4)</bdi> بتاخد:<span class=\"ltr\">M12 = 40</span>",
       "ow": [
        "أول step في الـ VAM بتختار العمود D2 (الـ penalty بتاعه 15) وأرخص خانة فيه Q1 (22)، وبتديله كل الـ demand بتاع D2: يعني <bdi dir=\"ltr\">M12&nbsp;=&nbsp;40</bdi>، مش 10.",
        null
       ]
      },
      {
       "why": "الـ Step 2: الـ penalty بتاع Q1 بيساوي 13، فالتكلفة 4 بتاخد الـ min بين الـ 80 اللي فاضلين والـ 110:<span class=\"ltr\">min(80, 110) = 80</span>",
       "ow": [
        "الـ D4 عايز 110، بس الـ Q1 مفضلش فيه غير <bdi dir=\"ltr\">120&nbsp;−&nbsp;40&nbsp;=&nbsp;80</bdi> بعد Q1D2، فـ <bdi dir=\"ltr\">M14&nbsp;=&nbsp;80</bdi>.",
        null
       ]
      },
      {
       "why": "الـ Step 3: الـ penalty بتاع عمود D3 بيساوي 11، فـ:<span class=\"ltr\">Q2D3 = 30</span>الـ Step 4: الـ penalty بتاع Q2 بيساوي 17، فـ:<span class=\"ltr\">Q2D4 = 30</span>الاتنين 30.",
       "ow": [
        null,
        "الـ False غلط: الـ VAM بتدي <bdi dir=\"ltr\">Q2D3&nbsp;=&nbsp;30</bdi> (كل الـ D3)، وبعدين <bdi dir=\"ltr\">Q2D4&nbsp;=&nbsp;30</bdi> (اللي فاضل من الـ D4، وهو <bdi dir=\"ltr\">110&nbsp;−&nbsp;80</bdi>)، يعني الاتنين متساويين."
       ]
      },
      {
       "why": "الـ Step 5: الـ penalty بتاع Q3 بيساوي 32، فـ:<span class=\"ltr\">Q3D1 = 50</span>وبعدين:<span class=\"ltr\">Q2D1 = 10</span>",
       "ow": [
        "الـ supply بتاع Q3 كله 50، ولما يبقى D1 هو العمود الوحيد المفتوح قدام Q3، الـ VAM بتدي <bdi dir=\"ltr\">Q3D1&nbsp;=&nbsp;50</bdi>، مش 40.",
        null
       ]
      },
      {
       "why": "الـ VAM بتدي <bdi dir=\"ltr\">Q2D3&nbsp;=&nbsp;30</bdi> و<bdi dir=\"ltr\">Q2D4&nbsp;=&nbsp;30</bdi>، فالـ Q2 فاضله:<span class=\"ltr\">70 − 30 − 30 = 10</span>والـ D1 لسه محتاج <bdi dir=\"ltr\">60&nbsp;−&nbsp;50&nbsp;=&nbsp;10</bdi> بعد <bdi dir=\"ltr\">Q3D1&nbsp;=&nbsp;50</bdi>، يعني <bdi dir=\"ltr\">M21&nbsp;=&nbsp;10</bdi> (L4).",
       "ow": [
        null,
        "الـ False غلط: الـ Q2 فاضله:<span class=\"ltr\">70 − 30 − 30 = 10</span>والـ D1 لسه محتاج <bdi dir=\"ltr\">60&nbsp;−&nbsp;50&nbsp;=&nbsp;10</bdi>، فـ <bdi dir=\"ltr\">M21&nbsp;=&nbsp;10</bdi>."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">22×40 + 4×80 + 9×30 + 7×30 + 32×50 + 24×10</span><span class=\"ltr\">= 880 + 320 + 270 + 210 + 1600 + 240 = 3520</span>",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">22×40 + 4×80 + 9×30 + 7×30 + 32×50 + 24×10</span><span class=\"ltr\">= 880 + 320 + 270 + 210 + 1600 + 240 = 3520</span>"
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Pivot column هو x1. الـ Ratios:<span class=\"ltr\">3 ÷ 4/5 = 3.75, 4 ÷ 7/5 = 2.86,</span><span class=\"ltr\">7 ÷ 1/5 = 35</span>يبقى الـ pivot هو <bdi dir=\"ltr\">7/5</bdi> (L3).",
       "ow": [
        "الـ <bdi dir=\"ltr\">1/5</bdi> موجود فعلًا في الـ pivot column، بس الـ ratio بتاعه <bdi dir=\"ltr\">7&nbsp;÷&nbsp;1/5&nbsp;=&nbsp;35</bdi> وده الأكبر؛ الأصغر هو:<span class=\"ltr\">4 ÷ 7/5 = 2.86</span>فالـ pivot هو <bdi dir=\"ltr\">7/5</bdi>.",
        null
       ]
      },
      {
       "why": "الـ R1 ناقص <bdi dir=\"ltr\">4/5</bdi> مرة صف x1 الجديد بيدّي:<span class=\"ltr\">s1 | 0, 0, 1, −4/7, 1/7 | 5/7</span>",
       "ow": [
        "الـ R1 ناقص <bdi dir=\"ltr\">4/5</bdi> مرة صف x1 الجديد بيدّي:<span class=\"ltr\">s1 | 0, 0, 1, −4/7, 1/7 | 5/7</span>إنما الصف المكتوب فيه <bdi dir=\"ltr\">−4</bdi> تحت x2 والـ RHS بتاعه غلط.",
        null
       ]
      },
      {
       "why": "الأرقام هي <bdi dir=\"ltr\">R2&nbsp;÷&nbsp;7/5</bdi>، بس الـ x1 بياخد مكان s2 كـ basic variable، فالصف لازم يتكتب عليه x1.",
       "ow": [
        "الأرقام صح وهي <bdi dir=\"ltr\">R2&nbsp;÷&nbsp;7/5</bdi>، بس بعد الـ pivot الـ x1 بياخد مكان s2 في الـ basis، فالصف لازم يتكتب عليه x1 مش s2.",
        null
       ]
      },
      {
       "why": "الـ Z زائد <bdi dir=\"ltr\">22/5</bdi> مرة صف x1 الجديد بيدّي:<span class=\"ltr\">(0, 0, 0, 22/7, −2/7 | 480/7 ≈ 68.57)</span>",
       "ow": [
        "الحساب:<span class=\"ltr\">Z + 22/5 × (1, 0, 0, 5/7, −3/7 | 20/7)</span><span class=\"ltr\">= (0, 0, 0, 22/7, −2/7 | 480/7 ≈ 68.57)</span>ودي مش الصف المكتوب.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ B والـ C الاتنين الـ predecessor الوحيد بتاعهم هو A، فـ:<span class=\"ltr\">ES(B) = ES(C) = EF(A) = 0 + 3 = 3</span>وده الـ forward pass في L7.",
       "ow": [
        null,
        "الـ False غلط: الـ B والـ C الاتنين جايين بعد A بس، فالاتنين بيبدأوا عند <bdi dir=\"ltr\">EF(A)&nbsp;=&nbsp;3</bdi>."
       ]
      },
      {
       "why": "الـ predecessor الوحيد بتاع D هو C:<span class=\"ltr\">ES(C) = 3, EF(C) = 3 + 3 = 6</span>فـ <bdi dir=\"ltr\">ES(D)&nbsp;=&nbsp;6</bdi> (L7، الـ forward pass).",
       "ow": [
        null,
        "الـ False غلط: الـ D جاي بعد C بس، و:<span class=\"ltr\">EF(C) = 3 + 3 = 6</span>فـ <bdi dir=\"ltr\">ES(D)&nbsp;=&nbsp;6</bdi>."
       ]
      },
      {
       "why": "الـ F لازم يستنى الـ D والـ E الاتنين:<span class=\"ltr\">EF(D) = 6 + 5 = 11, EF(E) = 6 + 6 = 12</span>فـ:<span class=\"ltr\">ES(F) = max(11, 12) = 12</span>مش 11 (L7، الـ forward pass).",
       "ow": [
        "الـ 11 ده <bdi dir=\"ltr\">EF(D)</bdi> بس؛ الـ F كمان مستني E اللي بيخلص عند 12، فـ:<span class=\"ltr\">ES(F) = max(11, 12) = 12</span>",
        null
       ]
      },
      {
       "why": "الـ H جاي بعد G بس، فـ <bdi dir=\"ltr\">ES(H)&nbsp;=&nbsp;EF(G)&nbsp;=&nbsp;17</bdi>؛ إنما الـ I مستني G (17) وF (21)، فـ:<span class=\"ltr\">ES(I) = max(17, 21) = 21</span>يعني مختلفين (L7).",
       "ow": [
        "الحساب:<span class=\"ltr\">ES(H) = EF(G) = 17</span>بس الـ I مستني G (17) وF (21) الاتنين، فـ <bdi dir=\"ltr\">ES(I)&nbsp;=&nbsp;21</bdi>.",
        null
       ]
      },
      {
       "why": "الـ C critical، على الـ path:<span class=\"ltr\">A-C-E-F-I-J-K = 36</span>والـ non-critical هم الـ D (float 1)، والـ G (4)، والـ H (6).",
       "ow": [
        "الـ C critical <bdi dir=\"ltr\">(ES&nbsp;=&nbsp;LS&nbsp;=&nbsp;3)</bdi> على الـ path:<span class=\"ltr\">A-C-E-F-I-J-K = 36</span>الـ non-critical activities هم الـ D (TF 1)، والـ G (4)، والـ H (6) بس.",
        null
       ]
      },
      {
       "why": "كلهم الـ float بتاعهم صفر؛ وفيه اتنين critical paths واحد عن طريق B والتاني عن طريق C.",
       "ow": [
        null,
        "الـ False غلط: الـ activities دي كلها <bdi dir=\"ltr\">ES&nbsp;=&nbsp;LS</bdi> (الـ float صفر):<span class=\"ltr\">A, B, C, E, F, I, J, K</span>والاتنين critical paths الفرق بينهم بس B أو C."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">A-B-E-F-I-J-K = 3 + 3 + 6 + 9 + 5 + 6 + 4 = 36</span>وده بيساوي الـ project time، وكل activity عليه الـ float بتاعها صفر، فهو critical path (L7).",
       "ow": [
        null,
        "الـ False غلط: طول الـ path ده:<span class=\"ltr\">3 + 3 + 6 + 9 + 5 + 6 + 4 = 36</span>وده بيساوي الـ project time، فهو critical."
       ]
      },
      {
       "why": "أطول paths هم:<span class=\"ltr\">A-B-E-F-I-J-K</span><span class=\"ltr\">A-C-E-F-I-J-K</span>والاتنين مجموعهم 36، فالـ forward pass بيخلص عند <bdi dir=\"ltr\">EF(K)&nbsp;=&nbsp;36</bdi> (L7).",
       "ow": [
        null,
        "الـ False غلط: الـ forward pass بيدي <bdi dir=\"ltr\">EF(K)&nbsp;=&nbsp;36</bdi>، وده طول الاتنين critical paths."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ Row reduction</b>، بالـ mins:<span class=\"ltr\">40, 10, 20, 10</span>الصفوف:<span class=\"ltr\">J1 (0,20,20,30)</span><span class=\"ltr\">J2 (0,50,60,20)</span><span class=\"ltr\">J3 (0,30,20,0)</span><span class=\"ltr\">J4 (20,10,0,30)</span><b>الـ Column reduction</b>، بالـ mins:<span class=\"ltr\">0, 10, 0, 0</span>الصفوف:<span class=\"ltr\">J1 (0,10,20,30)</span><span class=\"ltr\">J2 (0,40,60,20)</span><span class=\"ltr\">J3 (0,20,20,0)</span><span class=\"ltr\">J4 (20,0,0,30)</span>أقل عدد خطوط 3 (عمود P1، وعمود P4، وصف J4)، وده أقل من 4، يبقى <bdi dir=\"ltr\">θ&nbsp;=&nbsp;10</bdi> (أصغر رقم مش متغطي، <bdi dir=\"ltr\">J1-P2</bdi>)، والصفوف:<span class=\"ltr\">J1 (0,0,10,30)</span><span class=\"ltr\">J2 (0,30,50,20)</span><span class=\"ltr\">J3 (0,10,10,0)</span><span class=\"ltr\">J4 (30,0,0,40)</span>دلوقتي 4 خطوط، اعمل assign (الـ J2 عنده الصفر الوحيد في P1):<span class=\"ltr\">J2 → P1, J1 → P2, J3 → P4, J4 → P3</span><b>المجموع</b> (مطابق لنموذج الطلبة) <bdi dir=\"ltr\">(L5)</bdi> هو:<span class=\"ltr\"><b>60 + 10 + 20 + 10 = $100</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ path في الـ network هو تسلسل متصل من nodes و activities بالتبادل، بيبدأ من الـ start event وبيقف عند الـ end event بتاع الـ network (L7)."
      },
      {
       "ans": "<b>الـ Stage 4</b>:<span class=\"ltr\">d(8, 10) = 2, d(9, 10) = 6</span><b>الـ Stage 3</b>، والـ node 6 عن طريق 8:<span class=\"ltr\">d(5) = 6 + 2 = 8</span><span class=\"ltr\">d(6) = min{5 + 2, 8 + 6} = 7</span><span class=\"ltr\">d(7) = 7 + 6 = 13</span><b>الـ Stage 2</b>، والـ node 2 عن طريق 5، والـ node 3 عن طريق 6:<span class=\"ltr\">d(2) = min{3 + 8, 6 + 7} = 11</span><span class=\"ltr\">d(3) = min{8 + 7, 7 + 13} = 15</span><span class=\"ltr\">d(4) = 7 + 13 = 20</span><b>الـ Stage 1</b>:<span class=\"ltr\">d(1) = min{4 + 11, 6 + 15, 4 + 20} = 15</span><b>أقصر path</b> (L9) هو:<span class=\"ltr\"><b>1 → 2 → 5 → 8 → 10</b></span><span class=\"ltr\"><b>= 4 + 3 + 6 + 2 = 15</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ x1 هي عدد الـ hotdogs، والـ x2 هي عدد الـ sodas.<br>الـ Objective:<span class=\"ltr\"><b>Max Z = 0.08x1 + 0.04x2</b></span>الـ Subject to، وزن العربية:<span class=\"ltr\">(1/8)x1 + (1/2)x2 ≤ 210</span>الـ sodas:<span class=\"ltr\">x2 ≥ 60</span>الـ hotdogs:<span class=\"ltr\">x1 ≥ 80</span>وكمان soda واحدة لكل اتنين hotdogs:<span class=\"ltr\">x2 ≥ (1/2)x1</span>يعني:<span class=\"ltr\">x1 − 2x2 ≤ 0</span>وأخيرًا:<span class=\"ltr\">x1, x2 ≥ 0</span><i>مش مطلوب، بس الـ optimum هو:</i><span class=\"ltr\"><i>x1 = 560, x2 = 280, Z = $56</i></span>"
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
       "why": "ده تعريف المحاضرة للـ total float <bdi dir=\"ltr\">(TF&nbsp;=&nbsp;LF&nbsp;−&nbsp;EF)</bdi>: هو قد إيه ممكن نأخر خلصان الـ activity من غير ما الـ project كله يتأخر (L7).",
       "ow": [
        null,
        "لو قلت False كده بترفض تعريف الـ total float في L7، واللي بيتقاس بالنسبة لخلصان الـ project."
       ]
      },
      {
       "why": "ده تعريف الـ successor؛ الـ predecessor لازم تخلص مباشرةً قبل activity تانية.",
       "ow": [
        "«مينفعش تبدأ غير لما activity تانية تخلص» ده تعريف الـ SUCCESSOR؛ أما الـ predecessor فهي اللي لازم تخلص مباشرةً قبل ما activity تانية تبدأ.",
        null
       ]
      },
      {
       "why": "تعريف 22 في Revision 1: لو شلنا كل الـ integer أو الـ <bdi dir=\"ltr\">0-1</bdi> constraints من الـ IP، اللي بيفضل اسمه الـ linear programming relaxation (L6).",
       "ow": [
        null,
        "لو قلت False كده بترفض تعريف الـ LP relaxation في L6 وهو مكتوب حرفيًا كده."
       ]
      },
      {
       "why": "شحن commodity بين sources وdestinations ده تعريف الـ transportation problem (L4)؛ لكن الـ simplex بيتنقل بين الـ basic feasible solutions بتاعة الـ LP (L3).",
       "ow": [
        "الجملة دي بتعرّف الـ transportation problem (L4)؛ والـ simplex method ده algorithm عام لحل أي LP.",
        null
       ]
      },
      {
       "why": "دي الـ infeasible solutions؛ والـ unbounded معناها إن الـ objective infinite (L2).",
       "ow": [
        "النقط اللي برة الـ feasible region اسمها INFEASIBLE solutions؛ إنما الـ unbounded solution معناها إن الـ objective بيوصل لـ infinity.",
        null
       ]
      },
      {
       "why": "تعريف 17 في Revision 1: الـ NWC بيعمل أول allocation في الخانة اللي فوق على الشمال في الـ tableau، ومن غير ما يبص على الـ costs (L4).",
       "ow": [
        null,
        "لو قلت False كده بترفض تعريف L4: الـ NWC دايمًا بيبدأ من الخانة اللي فوق على الشمال (الـ northwest)."
       ]
      },
      {
       "why": "العنصر اللي عند تقاطع الـ pivot column والـ pivot row اسمه الـ pivot ELEMENT؛ أما الـ pivot operation فهي عملية الـ row operations اللي بتتعمل حواليه (L3).",
       "ow": [
        "اللي عند التقاطع هو الـ pivot element؛ الـ pivot operation هي مجموعة الـ row operations اللي بتستخدمه.",
        null
       ]
      },
      {
       "why": "ده تعريف L1: الـ constraints هي الـ linear inequalities اللي على الـ variables بتاعة الـ LPP.",
       "ow": [
        null,
        "لو قلت False كده بترفض تعريف الـ constraints في L1 وهو مكتوب حرفيًا كده."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الحساب:<span class=\"ltr\">min(100, 80) = 80</span>الـ NWC:<span class=\"ltr\">Q1D1 80, Q1D2 20, Q2D2 150,</span><span class=\"ltr\">Q2D3 50, Q3D3 140, Q3D4 160</span>",
       "ow": [
        null,
        "الـ False غلط: الـ NWC بيبدأ من <bdi dir=\"ltr\">(Q1,&nbsp;D1)</bdi> وبيحط:<span class=\"ltr\">min(supply 100, demand 80) = 80</span>"
       ]
      },
      {
       "why": "بعد <bdi dir=\"ltr\">Q1D1&nbsp;=&nbsp;80</bdi>، الـ Q1 فاضله <bdi dir=\"ltr\">100&nbsp;−&nbsp;80&nbsp;=&nbsp;20</bdi> بس، فالـ NWC بيدي <bdi dir=\"ltr\">M12&nbsp;=&nbsp;20</bdi>؛ والـ 150 دي قيمة M22 (L4).",
       "ow": [
        "الـ 150 دي قيمة M22 في الـ NWC؛ الـ Q1 فاضله <bdi dir=\"ltr\">100&nbsp;−&nbsp;80&nbsp;=&nbsp;20</bdi> بس للـ D2.",
        null
       ]
      },
      {
       "why": "الـ NWC بيوزع الـ 200 بتوع Q2 على D2 (150) والـ D3 (50)؛ الـ Q2 بيخلص قبل ما يوصل لـ D4، فـ <bdi dir=\"ltr\">M24&nbsp;=&nbsp;0</bdi> (L4).",
       "ow": [
        "الـ 50 دي بتروح للخانة <bdi dir=\"ltr\">(Q2,&nbsp;D3)</bdi>؛ الـ 200 بتوع Q2 بيخلصوا في D2 (150) والـ D3 (50)، فـ <bdi dir=\"ltr\">M24&nbsp;=&nbsp;0</bdi>.",
        null
       ]
      },
      {
       "why": "الـ D3 محتاج <bdi dir=\"ltr\">190&nbsp;−&nbsp;50&nbsp;=&nbsp;140</bdi> كمان بعد <bdi dir=\"ltr\">Q2D3&nbsp;=&nbsp;50</bdi>، فالـ NWC بيدي <bdi dir=\"ltr\">M33&nbsp;=&nbsp;140</bdi>، والـ 160 الباقيين من Q3 بيروحوا لـ D4 (L4).",
       "ow": [
        "الـ Q3 عنده 300 آه، بس الـ D3 محتاج <bdi dir=\"ltr\">190&nbsp;−&nbsp;50&nbsp;=&nbsp;140</bdi> بس، فـ <bdi dir=\"ltr\">M33&nbsp;=&nbsp;140</bdi>.",
        null
       ]
      },
      {
       "why": "بعد <bdi dir=\"ltr\">Q3D3&nbsp;=&nbsp;140</bdi>، الـ Q3 فاضله <bdi dir=\"ltr\">300&nbsp;−&nbsp;140&nbsp;=&nbsp;160</bdi>، وده بالظبط الـ demand بتاع D4، فـ <bdi dir=\"ltr\">M34&nbsp;=&nbsp;160</bdi> (L4، الـ NWC).",
       "ow": [
        null,
        "الـ False غلط: الـ 160 الباقيين من Q3 بيغطوا الـ demand بتاع D4 (160) بالظبط."
       ]
      },
      {
       "why": "الـ NWC cost:<span class=\"ltr\">7×80 + 3×20 + 6×150 + 11×50 + 7×140 + 6×160</span><span class=\"ltr\">= 560 + 60 + 900 + 550 + 980 + 960 = 4010</span>مش 4000 (L4).",
       "ow": [
        "الـ total بتاع الـ NWC:<span class=\"ltr\">560 + 60 + 900 + 550 + 980 + 960 = 4010</span>مش 4000.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الحساب:<span class=\"ltr\">te = (a + 4m + b)/6 = (1 + 16 + 7)/6 = 4</span><span class=\"ltr\">σ² = ((b − a)/6)² = (6/6)² = 1</span>زي ما هو مكتوب (L8).",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">(1 + 4×4 + 7)/6 = 4</span><span class=\"ltr\">((7 − 1)/6)² = 1</span>الاتنين زي المكتوب."
       ]
      },
      {
       "why": "الـ te صح:<span class=\"ltr\">te = (3 + 4×6 + 15)/6 = 7</span>بس:<span class=\"ltr\">σ² = ((15 − 3)/6)² = 4</span>مش 1، فالـ pair كله False (L8).",
       "ow": [
        "الـ <bdi dir=\"ltr\">te&nbsp;=&nbsp;7</bdi> صح، بس:<span class=\"ltr\">σ² = ((15 − 3)/6)² = 2² = 4</span>مش 1.",
        null
       ]
      },
      {
       "why": "الـ 27 دي الـ pessimistic time بتاع C، والصح <bdi dir=\"ltr\">(L8)</bdi> هو:<span class=\"ltr\">te = (3 + 4×9 + 27)/6 = 11</span><span class=\"ltr\">σ² = ((27 − 3)/6)² = 16</span>",
       "ow": [
        "الـ 27 دي الـ pessimistic estimate؛ الـ <bdi dir=\"ltr\">te&nbsp;=&nbsp;11</bdi> والـ <bdi dir=\"ltr\">σ²&nbsp;=&nbsp;(24/6)²&nbsp;=&nbsp;16</bdi>.",
        null
       ]
      },
      {
       "why": "الـ <bdi dir=\"ltr\">te(D)&nbsp;=&nbsp;9</bdi> صح، بس الـ variance:<span class=\"ltr\">((b − a)/6)² = (6/6)² = 1</span>مش 9 (L8).",
       "ow": [
        "الـ <bdi dir=\"ltr\">te&nbsp;=&nbsp;9</bdi> صح، بس <bdi dir=\"ltr\">σ²&nbsp;=&nbsp;((b&nbsp;−&nbsp;a)/6)²&nbsp;=&nbsp;1</bdi>؛ الـ 9 دي مجرد تكرار للـ expected time.",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (6 + 4×12 + 30)/6 = 14</span><span class=\"ltr\">σ² = ((30 − 6)/6)² = 16</span>زي ما هو مكتوب (L8).",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">(6 + 48 + 30)/6 = 14</span><span class=\"ltr\">(24/6)² = 16</span>الاتنين زي المكتوب."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (2 + 4×5 + 14)/6 = 6</span><span class=\"ltr\">σ² = ((14 − 2)/6)² = 4</span>زي ما هو مكتوب (L8).",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">(2 + 20 + 14)/6 = 6</span><span class=\"ltr\">(12/6)² = 4</span>الاتنين زي المكتوب."
       ]
      },
      {
       "why": "الـ paths:<span class=\"ltr\">A-C-D-F = 4 + 11 + 9 + 6 = 30</span><span class=\"ltr\">A-C-E = 29</span><span class=\"ltr\">B-D-F = 22</span><span class=\"ltr\">B-E = 21</span>",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">A-C-D-F = 4 + 11 + 9 + 6 = 30</span>هو أطول path، والباقي:<span class=\"ltr\">A-C-E = 29, B-D-F = 22</span>"
       ]
      },
      {
       "why": "الـ critical path <bdi dir=\"ltr\">A-C-D-F</bdi> الـ te بتاعه:<span class=\"ltr\">4 + 11 + 9 + 6 = 30</span>فالـ expected completion time هو 30 أسبوع (L8).",
       "ow": [
        null,
        "الـ False غلط: أطول path وهو <bdi dir=\"ltr\">A-C-D-F</bdi> مجموعه 30."
       ]
      },
      {
       "why": "الـ 22 دي الـ VARIANCE بتاعة الـ project (مجموع <bdi dir=\"ltr\">1&nbsp;+&nbsp;16&nbsp;+&nbsp;1&nbsp;+&nbsp;4</bdi> على <bdi dir=\"ltr\">A-C-D-F</bdi>)؛ والـ standard deviation <bdi dir=\"ltr\">(L8)</bdi> هو:<span class=\"ltr\">√22 = 4.69</span>",
       "ow": [
        "الـ 22 دي الـ variance؛ الـ standard deviation هو الـ square root بتاعها، <bdi dir=\"ltr\">√22&nbsp;=&nbsp;4.69</bdi>.",
        null
       ]
      },
      {
       "why": "الـ <bdi dir=\"ltr\">−0.43</bdi> دي قيمة الـ z:<span class=\"ltr\">z = (28 − 30)/4.69</span>الـ probability:<span class=\"ltr\">0.5 − 0.1664 = 0.3336</span>والـ probability عمرها ما تبقى سالبة (L8).",
       "ow": [
        "الـ <bdi dir=\"ltr\">−0.43</bdi> دي z؛ والـ probability عمرها ما تبقى سالبة:<span class=\"ltr\">P = 0.5 − 0.1664 = 0.3336</span>",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">z = 4/4.69 = 0.85</span><span class=\"ltr\">→ P = 0.5 + 0.3023 = 0.8023</span>",
       "ow": [
        "الـ 0.85 دي قيمة الـ z:<span class=\"ltr\">z = 4/4.69</span>والـ P:<span class=\"ltr\">P = 0.5 + 0.3023 = 0.8023</span>",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ Row mins:<span class=\"ltr\">1, 7, 4, 5 → (0,3,5,2), (2,0,3,2),</span><span class=\"ltr\">(0,1,7,3), (3,2,3,0)</span>الـ Column mins:<span class=\"ltr\">0, 0, 3, 0 → (0,3,2,2), (2,0,0,2),</span><span class=\"ltr\">(0,1,4,3), (3,2,0,0)</span>3 خطوط (الصفين 2 و 4، والعمود A)، وده أقل من 4:<span class=\"ltr\">θ = 1 → (0,2,1,1), (3,0,0,2),</span><span class=\"ltr\">(0,0,3,2), (4,2,0,0)</span>الـ Assign:<span class=\"ltr\">1 → A, 3 → B, 2 → C, 4 → D</span><b>المجموع</b> (نفس الشيت المحلول) <bdi dir=\"ltr\">(L5)</bdi> هو:<span class=\"ltr\"><b>1 + 5 + 10 + 5 = 21</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ x1 والـ x2 والـ x3 هم عدد الأيام اللي المصانع A وB وC بتشتغلها في سبتمبر.<br>الـ Objective:<span class=\"ltr\"><b>Min Z = 210000x1 + 190000x2</b></span><span class=\"ltr\"><b>+ 182000x3</b></span>الـ Subject to، الـ golf carts:<span class=\"ltr\">40x1 + 65x2 ≥ 1500</span>الـ snowmobiles:<span class=\"ltr\">35x1 + 53x3 ≥ 1100</span>سبتمبر 30 يوم:<span class=\"ltr\">x1, x2, x3 ≤ 30</span>وأخيرًا:<span class=\"ltr\">x1, x2, x3 ≥ 0</span>و integer (اليوم بيتدفع كامل) (L1)."
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الخطوط:<span class=\"ltr\">x1 + 3x2 = 13 → (0, 4.33), (13, 0)</span><span class=\"ltr\">5x1 + 2x2 = 20 → (0, 10), (4, 0)</span><b>الـ Node 1 (LP)</b>، الـ corners:<span class=\"ltr\">(0, 4.33) 17.33; (4, 0) 12;</span><span class=\"ltr\">(2.615, 3.462) 21.69</span>اعمل branch على <bdi dir=\"ltr\">x1&nbsp;=&nbsp;2.615</bdi>.<br><b>الـ Node 2 <bdi dir=\"ltr\">(x1&nbsp;≥&nbsp;3)</bdi></b>، الـ corners:<span class=\"ltr\">(3, 2.5) 19; (4, 0) 12; (3, 0) 9</span><span class=\"ltr\">→ (3, 2.5), Z = 19</span><b>الـ Node 3 <bdi dir=\"ltr\">(x1&nbsp;≤&nbsp;2)</bdi></b> بيدّي:<span class=\"ltr\">(2, 3.667) 20.67; (0, 4.33) 17.33;</span><span class=\"ltr\">(2, 0) 6</span>اعمل branch على x2.<br><b>الـ Node 4</b>:<span class=\"ltr\">(x1 ≤ 2, x2 ≤ 3): (2, 3), Z = 18</span>وده integer.<br><b>الـ Node 5</b>:<span class=\"ltr\">(x1 ≤ 2, x2 ≥ 4): (1, 4), Z = 19</span>وده integer (الأحسن).<br>الـ bound بتاع Node 2 بيساوي 19 ومايقدرش يغلب 19 (الـ branches بتاعته بتدّي <bdi dir=\"ltr\">(3.2,&nbsp;2)</bdi> بـ 17.6، و node infeasible).<br><b>الـ Optimal</b> (نفس الشيت المحلول) <bdi dir=\"ltr\">(L6)</bdi> هو:<span class=\"ltr\"><b>x1 = 1, x2 = 4, Z = 19</b></span>"
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
       "why": "الـ NWC <bdi dir=\"ltr\">(L4)</bdi> بيدّي:<span class=\"ltr\">Q1D1 = 200, Q1D2 = 50, Q2D2 = 250,</span><span class=\"ltr\">Q2D3 = 100, Q3D3 = 250, Q3D4 = 150</span>",
       "ow": [
        "الـ NWC دايمًا بيملا الخانة اللي فوق على الشمال الأول بـ:<span class=\"ltr\">min(250, 200) = 200</span>يعني <bdi dir=\"ltr\">M11&nbsp;=&nbsp;200</bdi> مش صفر.",
        null
       ]
      },
      {
       "why": "الـ NWC:<span class=\"ltr\">Q1D1 = 200, Q1D2 = 50,</span><span class=\"ltr\">Q2D2 = 300 − 50 = 250, Q2D3 = 100,</span><span class=\"ltr\">Q3D3 = 350 − 100 = 250, Q3D4 = 150</span>يبقى <bdi dir=\"ltr\">M22&nbsp;=&nbsp;M33&nbsp;=&nbsp;250</bdi> (L4).",
       "ow": [
        null,
        "الـ False غلط: الـ NWC بيدي:<span class=\"ltr\">Q2D2 = 300 − 50 = 250</span><span class=\"ltr\">Q3D3 = 350 − 100 = 250</span>يعني الاتنين متساويين."
       ]
      },
      {
       "why": "بعد <bdi dir=\"ltr\">Q3D3&nbsp;=&nbsp;250</bdi>، الـ Q3 بيفضل معاه <bdi dir=\"ltr\">400&nbsp;−&nbsp;250&nbsp;=&nbsp;150</bdi>، وده بالظبط الـ demand بتاع D4، فالـ NWC بيدي <bdi dir=\"ltr\">M34&nbsp;=&nbsp;150</bdi> (L4).",
       "ow": [
        "الـ 250 دي M33؛ الباقي من Q3 وهو <bdi dir=\"ltr\">400&nbsp;−&nbsp;250&nbsp;=&nbsp;150</bdi> بيروح لـ D4، يبقى <bdi dir=\"ltr\">M34&nbsp;=&nbsp;150</bdi>.",
        null
       ]
      },
      {
       "why": "تكلفة الـ NWC:<span class=\"ltr\">3×200 + 1×50 + 6×250</span><span class=\"ltr\">+ 5×100 + 3×250 + 2×150</span><span class=\"ltr\">= 600 + 50 + 1500 + 500 + 750 + 300 = 3700</span>مش 2400 (L4).",
       "ow": [
        "مجموع الـ NWC هو:<span class=\"ltr\">600 + 50 + 1500 + 500 + 750 + 300 = 3700</span>فالـ total cost مش 2400.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الحساب:<span class=\"ltr\">te = (a + 4m + b)/6 = (2 + 20 + 8)/6 = 5</span><span class=\"ltr\">σ² = ((b − a)/6)² = (6/6)² = 1</span>زي ما مكتوب بالظبط (L8).",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">(2 + 4×5 + 8)/6 = 5</span><span class=\"ltr\">((8 − 2)/6)² = 1</span>الاتنين زي ما مكتوب."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (4 + 4×7 + 10)/6 = 42/6 = 7</span>مش 7.5 (الـ <bdi dir=\"ltr\">σ²&nbsp;=&nbsp;(6/6)²&nbsp;=&nbsp;1</bdi> صح)، فالـ pair كله غلط (L8).",
       "ow": [
        "الحساب:<span class=\"ltr\">te = (4 + 28 + 10)/6 = 7</span>مش 7.5؛ الصح بس هو الـ variance اللي هي 1.",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (4 + 4×9 + 14)/6 = 54/6 = 9</span><span class=\"ltr\">σ² = ((14 − 4)/6)² = 2.78</span>يبقى <bdi dir=\"ltr\">(10,&nbsp;2.9)</bdi> غلط (L8).",
       "ow": [
        "الحساب:<span class=\"ltr\">te = (4 + 36 + 14)/6 = 9</span>مش 10، و:<span class=\"ltr\">σ² = (10/6)² = 2.78</span>مش 2.9.",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (6 + 4×10 + 20)/6 = 11</span><span class=\"ltr\">σ² = ((20 − 6)/6)² = 5.44</span>زي ما مكتوب (L8).",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">(6 + 40 + 20)/6 = 11</span><span class=\"ltr\">(14/6)² = 5.44</span>الاتنين زي ما مكتوب."
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">te = (4 + 4×5 + 12)/6 = 6</span><span class=\"ltr\">σ² = ((12 − 4)/6)² = 1.78</span>زي ما مكتوب (L8).",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">(4 + 20 + 12)/6 = 6</span><span class=\"ltr\">(8/6)² = 1.78</span>الاتنين زي ما مكتوب."
       ]
      },
      {
       "why": "الـ path ده:<span class=\"ltr\">A-B-D-E = 5 + 7 + 11 + 6 = 29</span>وده أطول من الـ path التاني الوحيد:<span class=\"ltr\">A-C-E = 5 + 9 + 6 = 20</span>فهو الـ critical path (L8).",
       "ow": [
        null,
        "الـ False غلط:<span class=\"ltr\">A-B-D-E = 5 + 7 + 11 + 6 = 29</span>أطول من الـ path التاني الوحيد <bdi dir=\"ltr\">A-C-E&nbsp;=&nbsp;20</bdi>."
       ]
      },
      {
       "why": "الـ critical path <bdi dir=\"ltr\">A-B-D-E</bdi> الـ te بتاعه:<span class=\"ltr\">5 + 7 + 11 + 6 = 29</span>يبقى الـ completion time هو 29 مش 28 (L8).",
       "ow": [
        "أطول path هو:<span class=\"ltr\">A-B-D-E = 5 + 7 + 11 + 6 = 29</span>مش 28.",
        null
       ]
      },
      {
       "why": "الـ C موجودة بس على:<span class=\"ltr\">A-C-E = 5 + 9 + 6 = 20</span>وده أقصر بـ 9 من الـ critical اللي هو 29، يبقى <bdi dir=\"ltr\">TF(C)&nbsp;=&nbsp;9</bdi> (L8).",
       "ow": [
        "الـ C مش على الـ critical path <bdi dir=\"ltr\">A-B-D-E</bdi>؛ الـ <bdi dir=\"ltr\">A-C-E</bdi> طوله 20 قصاد 29، فالـ C عندها float بيساوي 9.",
        null
       ]
      },
      {
       "why": "الـ project variance بنجمع فيها variances الـ critical activities بس:<span class=\"ltr\">A 1 + B 1 + D 5.44 + E 1.78 = 9.22</span>مش 8.22 (L8).",
       "ow": [
        "لو جمعت الـ critical variances:<span class=\"ltr\">1 + 1 + 5.44 + 1.78</span>هتطلع 9.22، مش 8.22.",
        null
       ]
      },
      {
       "why": "الحساب:<span class=\"ltr\">z = 7/3.04 = 2.30</span><span class=\"ltr\">→ P = 0.5 + 0.4893 = 0.9893</span>",
       "ow": [
        "الـ 0.4893 دي بس المساحة من الجدول لـ <bdi dir=\"ltr\">z&nbsp;=&nbsp;2.30</bdi>؛ وبما إن <bdi dir=\"ltr\">X&nbsp;&gt;&nbsp;μ</bdi>، يبقى:<span class=\"ltr\">P = 0.5 + 0.4893 = 0.9893</span>",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ OR بيطبق methods علمية (scientific) (L1)؛ النموذج: \"مش التعريف\".",
       "ow": [
        "الـ OR بيطبق methods علمية (SCIENTIFIC) مش اقتصادية، وتعريف L1 هو:<span class=\"ltr\">'scientifically deciding how to best design and operate man-machine systems'</span>",
        null
       ]
      },
      {
       "why": "الـ NWC بيعمل أول allocation في الخانة اللي فوق على الشمال (top-left) في الـ tableau، وبعدين يتحرك يمين أو تحت (L4).",
       "ow": [
        null,
        "الـ False غلط: الركن الشمال فوق هو بالظبط الـ northwest cell، وده المكان اللي الـ NWC بيبدأ منه."
       ]
      },
      {
       "why": "الـ Vogel's approximation method واحدة من التلات starting methods (مع الـ NWC والـ least cost) اللي بتجيب initial BFS للـ transportation problem (L4).",
       "ow": [
        null,
        "الـ False غلط: الـ VAM starting method بتاعة الـ transportation problem واتدرست في L4."
       ]
      },
      {
       "why": "الـ critical path هو <b>أطول</b> path في الـ network (LONGEST)، وطوله هو اللي بيحدد الـ project completion time (L7).",
       "ow": [
        "الـ critical path هو أطول path مش 'الأسهل'؛ والـ activities اللي عليه الـ float بتاعها صفر.",
        null
       ]
      },
      {
       "why": "التأخير من غير ما يأثر على بداية الـ succeeding activities ده تعريف الـ FREE float؛ إنما الـ total float بيتقاس بالنسبة للـ project completion (L7).",
       "ow": [
        "الجملة دي بتعرّف الـ free float؛ الـ total float هو التأخير المسموح من غير ما يأثر على الـ project completion time.",
        null
       ]
      },
      {
       "why": "الوقت اللي محتاجه لو كل حاجة مشيت perfect ده الـ OPTIMISTIC time (a)؛ إنما الـ most likely time (m) هو أكتر تقدير واقعي (L8).",
       "ow": [
        "الجملة 'Everything goes perfectly' دي وصف الـ optimistic time؛ الـ most likely time هو التقدير الأكتر واقعية.",
        null
       ]
      },
      {
       "why": "الـ path هو sequence متصلة من الـ activities (والـ nodes) من الـ start node لحد الـ end node في الـ network، وده مطابق لتعريف L7.",
       "ow": [
        null,
        "الـ False غلط: sequence of activities من الـ starting node للـ completion node هو بالظبط تعريف الـ path في L7."
       ]
      },
      {
       "why": "إن شوية variables تبقى integer وشوية لأ ده وصف الـ MIXED integer model؛ في الـ pure integer model كل الـ variables لازم تبقى integer (L6).",
       "ow": [
        "ده وصف الـ mixed integer model؛ الـ pure integer model لازم كل variable فيه يبقى integer.",
        null
       ]
      },
      {
       "why": "ده تعريف Revision 1: الـ formulation معناها إنك تترجم المشكلة الحقيقية لـ mathematical equations تتحل (L1).",
       "ow": [
        null,
        "لو قلت False تبقى بترفض تعريف الـ formulation بتاع L1 بالحرف."
       ]
      },
      {
       "why": "ده تعريف L1: الـ non-negativity restriction معناها إن كل decision variable لازم يبقى ≥ 0.",
       "ow": [
        null,
        "لو قلت False تبقى بترفض تعريف الـ non-negativity restriction بتاع L1."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Pivot column هو x1؛ الـ ratios هي 20 و17.5 (والـ <bdi dir=\"ltr\">−3</bdi> بنتخطاه)، يبقى الـ pivot هو 2 (L3).",
       "ow": [
        "الـ ratio بتاع صف s1 هي <bdi dir=\"ltr\">20/1&nbsp;=&nbsp;20</bdi>، وده أكبر من <bdi dir=\"ltr\">35/2&nbsp;=&nbsp;17.5</bdi>، فالـ 1 مش الـ pivot.",
        null,
        "الـ <bdi dir=\"ltr\">−3</bdi> سالبة؛ والـ ratio test بيستخدم الأرقام الموجبة بس، فالـ <bdi dir=\"ltr\">−3</bdi> عمرها ما تبقى pivot.",
        "فيه pivot فعلًا: الـ column هو x1، وأصغر ratio هي 17.5 في صف s2، والـ pivot بيساوي 2."
       ]
      },
      {
       "why": "الـ entering variable هو اللي عنده أكتر رقم سالب في صف الـ Z: الـ <bdi dir=\"ltr\">−5</bdi> تحت x1 أكبر في السالب من <bdi dir=\"ltr\">−4</bdi> تحت x2 (L3).",
       "ow": [
        null,
        "الـ <bdi dir=\"ltr\">−4</bdi> بتاعة x2 أقل في السالب من <bdi dir=\"ltr\">−5</bdi> بتاعة x1، فالـ x2 مش هو اللي يدخل الأول.",
        "الـ Z ده صف الـ objective، عمره ما يبقى entering variable؛ الـ entering variables بتبقى decision أو slack variables.",
        "الـ x1 هو اللي بيدخل (أكتر رقم سالب <bdi dir=\"ltr\">−5</bdi>)، فـ 'None' غلط."
       ]
      },
      {
       "why": "الـ exiting variable هو الـ basic variable بتاع الـ pivot row، والـ ratios هي:<span class=\"ltr\">20/1 = 20 (s1), 35/2 = 17.5 (s2)</span>والـ s3 بنتخطاه <bdi dir=\"ltr\">(−3)</bdi>، فالـ s2 هو اللي بيخرج (L3).",
       "ow": [
        "الـ ratio بتاعة s1 هي 20، أكبر من 17.5 بتاعة s2، فالـ s1 بيفضل basic.",
        null,
        "الـ s3 عنده <bdi dir=\"ltr\">−3</bdi> في الـ pivot column، والـ ratio test بيتخطاها، فالـ s3 مينفعش يخرج.",
        "الـ s2 عنده أصغر ratio وهو اللي بيخرج، فـ 'None' غلط."
       ]
      },
      {
       "why": "من L3، الـ Z زائد 5 مرات الـ pivot row الجديد:<span class=\"ltr\">Z + 5 × (1, 0.5, 0, 0.5, 0 | 17.5)</span><span class=\"ltr\">= (0, −1.5, 0, 2.5, 0 | 87.5)</span>",
       "ow": [
        null,
        "الصف ده مينفعش يطلع من الـ Z زائد 5 مرات الـ pivot row الجديد؛ ده بيدي:<span class=\"ltr\">(0, −1.5, 0, 2.5, 0 | 87.5)</span>",
        "الصف ده:<span class=\"ltr\">(0, 1, 5, 0, 0 | 100)</span>هو الـ Z زائد 5 مرات صف s1، يعني كأنك عملت pivot على s1، بس الـ s2 هو اللي عنده الـ ratio الأصغر.",
        "الاختيار A هو صف الـ Z الجديد الصح، فـ 'None' غلط."
       ]
      },
      {
       "why": "الـ s3 زائد 3 مرات الصف الجديد بيدّي:<span class=\"ltr\">(0, 2.5, 0, 1.5, 1 | 64.5)</span>ومش موجود في الاختيارات.",
       "ow": [
        "ده صف s3 مقسوم على 3؛ بعد الـ pivot كل صف غير الـ pivot row لازم يبقى فيه 0 في column x1.",
        "ده سايب <bdi dir=\"ltr\">−3</bdi> تحت x1، بس الـ s3 زائد 3 مرات الـ pivot row الجديد لازم يخلي الخانة دي 0.",
        "ده صف s3 مقسوم على <bdi dir=\"ltr\">−3</bdi>، مش خطوة pivot، وكمان سايب 1 تحت x1 بدل 0.",
        null
       ]
      },
      {
       "why": "الـ pivot row (s2) بيتقسم على الـ pivot اللي هو 2:<span class=\"ltr\">(2, 1, 0, 1, 0 | 35) ÷ 2</span><span class=\"ltr\">= (1, 0.5, 0, 0.5, 0 | 17.5)</span>والـ x1 بياخد مكان s2 (L3).",
       "ow": [
        "الـ pivot row الجديد لازم يبقى فيه 1 تحت x1 (صف s2 ÷ 2)؛ الصف ده فيه 0 هناك.",
        "ده صف s2 القديم زي ما هو؛ لازم يتقسم على الـ pivot اللي هو 2.",
        null,
        "الاختيار C، اللي هو صف s2 ÷ 2، صح، فـ 'None' غلط."
       ]
      },
      {
       "why": "تكلفة الأكل بنعملها minimize، والعبارة:<span class=\"ltr\">'at least 70 protein / 100 carbs'</span>معناها علامة <bdi dir=\"ltr\">≥</bdi>، يعني:<span class=\"ltr\">20x1 + 30x2 + 40x3 ≥ 70</span><span class=\"ltr\">50x1 + 30x2 + 20x3 ≥ 100</span>من L1 (الـ key words).",
       "ow": [
        "التكاليف بنعملها minimize مش maximize، و'at least' محتاجة ≥ مش ≤.",
        null,
        "ده حاطط الـ requirements في الـ objective (شكل شبه الـ dual)؛ إنما الـ model بيعمل minimize لتكاليف الأكل <bdi dir=\"ltr\">2,&nbsp;3,&nbsp;5</bdi>.",
        "الاختيار B هو الـ formulation الصح، فـ 'None' غلط."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الخطوط:<span class=\"ltr\">x1 + x2 = 7 → (0,7), (7,0)</span><span class=\"ltr\">12x1 + 5x2 = 60 → (0,12), (5,0)</span>وخط رأسي <bdi dir=\"ltr\">x1&nbsp;=&nbsp;4</bdi>، وخط أفقي <bdi dir=\"ltr\">x2&nbsp;=&nbsp;2</bdi>.<br>أركان الـ feasible region:<span class=\"ltr\">(4, 0) 320; (5, 0) 400; (4, 2) 410;</span><span class=\"ltr\">(25/6, 2) = (4.17, 2):</span><span class=\"ltr\">12x1 + 10 = 60 → x1 = 25/6,</span><span class=\"ltr\">Z = 333.3 + 90 = 423.33</span><b>الـ Node 1</b>:<span class=\"ltr\">x1 = 4.17, x2 = 2, Z = 423.33</span>اعمل branch على x1.<br><b>الـ Node 2 <bdi dir=\"ltr\">(x1&nbsp;≤&nbsp;4)</bdi></b>: الـ <bdi dir=\"ltr\">x1&nbsp;=&nbsp;4</bdi>، وأحسن نقطة <bdi dir=\"ltr\">(4,&nbsp;2)</bdi> و<bdi dir=\"ltr\">Z&nbsp;=&nbsp;410</bdi> (integer).<br><b>الـ Node 3 <bdi dir=\"ltr\">(x1&nbsp;≥&nbsp;5)</bdi></b> بيدّي <bdi dir=\"ltr\">(5,&nbsp;0)</bdi> بس، و<bdi dir=\"ltr\">Z&nbsp;=&nbsp;400</bdi> (integer، أسوأ).<br><b>الـ Optimal</b> (مطابق للنموذج) <bdi dir=\"ltr\">(L6)</bdi> هو:<span class=\"ltr\"><b>x1 = 4, x2 = 2, Z = 410</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ Start activities هم A و B؛ والـ end activities هم I و J.<br>الأسهم:<span class=\"ltr\">Node 1 (start) → A → node 2</span><span class=\"ltr\">node 1 → B → node 3</span><span class=\"ltr\">Node 3 → C → node 4</span><span class=\"ltr\">node 3 → I → node 9 (end)</span>وفيه dummy من node 4 لـ node 2 (الـ D محتاجة A و C الاتنين، لكن الـ F محتاجة C بس).<br>وبعدين:<span class=\"ltr\">Node 2 → D → node 5 → E → node 7</span><span class=\"ltr\">Node 4 → F → node 6</span><span class=\"ltr\">node 6 → G → node 7</span><span class=\"ltr\">node 6 → H → node 8</span>و dummy من node 8 لـ node 7 (الـ G والـ H طالعين من نفس الـ node والاتنين قبل J، فالـ dummy بيمنع إن يبقى فيه سهمين متوازيين).<br>وأخيرًا:<span class=\"ltr\">Node 7 → J → node 9 (end)</span>يعني start node واحدة، و end node واحدة، واتنين dummies (L7)."
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
       "ans": "أولًا، <b>الـ Non-negativity restriction</b>: كل الـ decision variables لازم قيمتها تبقى أكبر من أو تساوي صفر.<br>ثانيًا، <b>الـ Infeasible solutions</b>: أي نقط برا الـ feasible region.<br>ثالثًا، <b>الـ PERT</b>: هو technique لجدولة الـ projects فيها تلات تقديرات ممكنة للوقت للـ activities اللي بتربط بين اتنين events (الـ optimistic والـ most likely والـ pessimistic)، فالوقت بيبقى probabilistic."
      },
      {
       "ans": "<b>الـ Stage 4</b>:<span class=\"ltr\">d(M5, M7) = 6, d(M6, M7) = 8</span><b>الـ Stage 3</b>، والـ M4 عن طريق M6:<span class=\"ltr\">d(M3) = 11 + 6 = 17</span><span class=\"ltr\">d(M4) = min{6 + 6, 3 + 8} = 11</span><b>الـ Stage 2</b>، عن طريق M4:<span class=\"ltr\">d(M2) = min{7 + 17, 9 + 11} = 20</span><b>الـ Stage 1</b>:<span class=\"ltr\">d(M1) = 5 + 20 = 25</span><b>أقصر path</b> (L9) هو:<span class=\"ltr\"><b>M1 → M2 → M4 → M6 → M7 = 25</b></span>"
      },
      {
       "ans": "تكلفة 20 (والـ S2 خلص، والـ D2 محتاج 230):<span class=\"ltr\">S2D2 = 320</span>تكلفة 60 (والـ D1 خلص):<span class=\"ltr\">S3D1 = 250</span>تكلفة 75 (والـ D3 خلص):<span class=\"ltr\">S1D3 = 200</span>تكلفة 130 (والـ S3 خلص):<span class=\"ltr\">S3D2 = 130</span>تكلفة 140:<span class=\"ltr\">S1D2 = 100</span><b>الـ Z</b> <bdi dir=\"ltr\">(L4)</bdi> بيساوي:<span class=\"ltr\"><b>20×320 + 60×250 + 75×200</b></span><span class=\"ltr\"><b>+ 130×130 + 140×100</b></span><span class=\"ltr\"><b>= 6400 + 15000 + 15000</b></span><span class=\"ltr\"><b>+ 16900 + 14000 = 67,300</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "حط مسألة الـ max على شكل <bdi dir=\"ltr\">≤</bdi>: الـ constraint اللي <bdi dir=\"ltr\">≥</bdi> بيبقى:<span class=\"ltr\">−2x1 − 5x2 ≤ −20</span>والـ equality بتفضل ليها dual variable حر.<br>الـ Dual variables: الـ y1 من الـ <bdi dir=\"ltr\">≤</bdi> constraint <bdi dir=\"ltr\">(y1&nbsp;≥&nbsp;0)</bdi>، والـ y2 من الـ <bdi dir=\"ltr\">≥</bdi> constraint <bdi dir=\"ltr\">(y2&nbsp;≥&nbsp;0)</bdi>، والـ y3 من الـ equality (unrestricted).<br>الـ Objective:<span class=\"ltr\"><b>Min W = 56y1 − 20y2 + 40y3</b></span>الـ subject to:<span class=\"ltr\">4y1 − 2y2 + 5y3 ≥ 12</span><span class=\"ltr\">7y1 − 5y2 + 4y3 ≥ 4</span>و<bdi dir=\"ltr\">y1,&nbsp;y2&nbsp;≥&nbsp;0</bdi>، والـ y3 unrestricted في الإشارة.<br>شكل مكافئ، مع <bdi dir=\"ltr\">y2&nbsp;≤&nbsp;0</bdi>، هو:<span class=\"ltr\">Min 56y1 + 20y2 + 40y3</span>تشييك <bdi dir=\"ltr\">(L3)</bdi>: الـ optimum بتاع الـ primal والـ dual الاتنين بيساوي:<span class=\"ltr\">1520/17 ≈ 89.41</span>"
      },
      {
       "ans": "الـ x1 والـ x2 والـ x3 هم عدد الأيام اللي الـ mines I وII وIII بتشتغلها الأسبوع ده.<br>الـ Objective (بالـ $1000):<span class=\"ltr\"><b>Min Z = 20x1 + 22x2 + 18x3</b></span>الـ high grade:<span class=\"ltr\">4x1 + 6x2 + x3 ≥ 54</span>الـ low grade:<span class=\"ltr\">4x1 + 4x2 + 6x3 ≥ 65</span>أيام الأسبوع:<span class=\"ltr\">x1 ≤ 7, x2 ≤ 7, x3 ≤ 7</span>وأخيرًا:<span class=\"ltr\">x1, x2, x3 ≥ 0</span>و integer (اليوم بيتدفع كامل) (L1)."
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ Network</b>:<span class=\"ltr\">1 →A→ 2; 2 →B→ 3; 2 →C→ 4</span>وفيه dummy من 3 لـ 4 (الـ E والـ I محتاجين B و C)، وبعدين:<span class=\"ltr\">3 →D→ 5; 4 →E→ 5; 3 →F→ 6;</span><span class=\"ltr\">5 →G→ 6; 6 →H→ 7; 4 →I→ 7;</span><span class=\"ltr\">7 →J→ 8</span><b>الـ Expected times والـ variances</b>:<span class=\"ltr\">A 16.5/12.25, B 17.5/12.25,</span><span class=\"ltr\">C 18.5/20.25, D 16/25,</span><span class=\"ltr\">E 20.33/11.11, F 23.33/5.44,</span><span class=\"ltr\">G 8.5/6.25, H 23/36,</span><span class=\"ltr\">I 25/16, J 13/4</span><b>الجزء (a)</b>، الـ Paths:<span class=\"ltr\">A-B-D-G-H-J 94.5</span><span class=\"ltr\">A-B-E-G-H-J 98.83</span><span class=\"ltr\">A-B-F-H-J 93.33</span><span class=\"ltr\">A-B-I-J 72</span><span class=\"ltr\"><b>A-C-E-G-H-J 99.83</b></span><span class=\"ltr\">A-C-I-J 73</span>الـ Critical path هو:<span class=\"ltr\">A-C-E-G-H-J</span>ووقت الانتهاء <b>99.83 أسبوع</b>.<br><b>الجزء (b)</b>، من L8:<span class=\"ltr\">σ² = 12.25 + 20.25 + 11.11 + 6.25</span><span class=\"ltr\">+ 36 + 4 = 89.86, σ = 9.48</span><span class=\"ltr\">P(X ≤ 104) = P(z ≤ (104 − 99.83)/9.48)</span><span class=\"ltr\">= P(z ≤ 0.44) = 0.5 + 0.1700 = <b>0.67</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الخطوط:<span class=\"ltr\">10x1 + 6x2 = 35 → (0, 5.83), (3.5, 0)</span><span class=\"ltr\">x1 + x2 = 4 → (0, 4), (4, 0)</span><b>الـ Node 1 (LP)</b>، الـ corners:<span class=\"ltr\">(0,0) 0; (3.5, 0) 140;</span><span class=\"ltr\">(2.75, 1.25) 147.5; (0, 4) 120</span><span class=\"ltr\">→ x1 = 2.75, x2 = 1.25, Z = 147.5</span><b>الـ Node 2 <bdi dir=\"ltr\">(x1&nbsp;≤&nbsp;2)</bdi></b>، الـ corners:<span class=\"ltr\">(2, 0) 80; (2, 2) 140; (0, 4) 120</span><span class=\"ltr\">→ (2, 2), Z = 140</span>وده integer (الـ incumbent).<br><b>الـ Node 3 <bdi dir=\"ltr\">(x1&nbsp;≥&nbsp;3)</bdi></b>، الـ corners:<span class=\"ltr\">(3, 0) 120; (3.5, 0) 140;</span><span class=\"ltr\">(3, 0.83) 145</span><span class=\"ltr\">→ (3, 0.83), Z = 145</span>اعمل branch على x2:<br>&nbsp;&nbsp;الـ Node 4 <bdi dir=\"ltr\">(x2&nbsp;≥&nbsp;1)</bdi> بيدّي:<span class=\"ltr\">10(3) + 6 = 36 > 35 → infeasible</span>&nbsp;&nbsp;الـ Node 5 <bdi dir=\"ltr\">(x2&nbsp;≤&nbsp;0)</bdi> بيدّي <bdi dir=\"ltr\">(3.5,&nbsp;0)</bdi> و<bdi dir=\"ltr\">Z&nbsp;=&nbsp;140</bdi>، مش أحسن من 140 (الـ branches بتاعته بتدّي <bdi dir=\"ltr\">(3,&nbsp;0)&nbsp;=&nbsp;120</bdi> و<bdi dir=\"ltr\">x1&nbsp;≥&nbsp;4</bdi> اللي infeasible).<br><b>الـ Optimal</b> <bdi dir=\"ltr\">(L6)</bdi> هو:<span class=\"ltr\"><b>x1 = 2, x2 = 2, Z = 140</b></span>"
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
       "why": "ده تعريف \"programming\"؛ والـ non-negativity معناها إن كل الـ variables تبقى <bdi dir=\"ltr\">≥&nbsp;0</bdi> (L1).",
       "ow": [
        "جملة \"determining a particular plan of action\" دي تعريف كلمة \"programming\"؛ إنما الـ non-negativity معناها إن كل الـ variables ≥ 0.",
        null
       ]
      },
      {
       "why": "ده تعريف Revision 1: الـ feasible region هي المنطقة المشتركة اللي بتحددها كل الـ constraints، ومنها الـ non-negativity constraints (L2).",
       "ow": [
        null,
        "لو قلت False تبقى بترفض تعريف الـ feasible region اللي في L2 بالحرف."
       ]
      },
      {
       "why": "الـ Revision 1 بتعرّف الـ unbounded solution إنه الحل اللي الـ objective function فيه infinite: يعني الـ Z ممكن يكبر من غير حد جوه الـ feasible region (L2).",
       "ow": [
        null,
        "لو قلت False تبقى بترفض تعريف L2: الـ unbounded solution معناه إن الـ objective بيبقى infinite."
       ]
      },
      {
       "ans": "الـ x1 هي عدد باوندات mixture 1، والـ x2 هي عدد باوندات mixture 2.<br><table><tr><th></th><th dir=\"ltr\">Mix 1</th><th dir=\"ltr\">Mix 2</th><th>المخزون</th></tr><tr><td dir=\"ltr\">Cherries</td><td dir=\"ltr\">1/2</td><td dir=\"ltr\">1/3</td><td>130</td></tr><tr><td dir=\"ltr\">Mints</td><td dir=\"ltr\">1/2</td><td dir=\"ltr\">2/3</td><td>170</td></tr><tr><td>السعر</td><td dir=\"ltr\">$2.00</td><td dir=\"ltr\">$1.25</td><td></td></tr></table>الـ Objective:<span class=\"ltr\"><b>Max Z = 2x1 + 1.25x2</b></span>الـ cherries:<span class=\"ltr\">(1/2)x1 + (1/3)x2 ≤ 130</span>الـ mints:<span class=\"ltr\">(1/2)x1 + (2/3)x2 ≤ 170</span>وأخيرًا:<span class=\"ltr\">x1, x2 ≥ 0</span><i>مش مطلوب، بس الـ optimum هو:</i><span class=\"ltr\"><i>x1 = 260, x2 = 0, Z = $520</i></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ Pure IP</b>: كل الـ variables لازم تبقى integers. <b>الـ Mixed IP</b>: بعض الـ variables بس لازم تبقى integers. <b>الـ Binary <bdi dir=\"ltr\">(0-1)</bdi> IP</b>: كل الـ variables لازم تساوي 0 أو 1 (L6)."
      },
      {
       "ans": "الخطوط:<span class=\"ltr\">3x1 + 6x2 = 40 → (0, 6.67), (13.3, 0)</span><span class=\"ltr\">10x1 + 5x2 = 50 → (0, 10), (5, 0)</span><span class=\"ltr\">x2 = 6, x1 = 1</span>أركان الـ feasible region:<span class=\"ltr\">(0, 6) 180; (1, 6) 200;</span><span class=\"ltr\">(1, 37/6 = 6.17) 205; (0, 6.67) 200</span><b>الـ Node 1</b>:<span class=\"ltr\">x1 = 1, x2 = 6.17, Z = 205</span>اعمل branch على x2.<br>الفرع <b><bdi dir=\"ltr\">x2&nbsp;≤&nbsp;6</bdi></b> بيدّي:<span class=\"ltr\">(1, 6), Z = 200</span>وده integer. والفرع <b><bdi dir=\"ltr\">x2&nbsp;≥&nbsp;7</bdi></b> بيدّي:<span class=\"ltr\">3x1 + 42 > 40 → infeasible</span><b>الـ Optimal</b> <bdi dir=\"ltr\">(L6)</bdi> هو:<span class=\"ltr\"><b>x1 = 1, x2 = 6, Z = 200</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "تكلفة 15 (والـ S3 خلص، والـ D3 محتاج 200):<span class=\"ltr\">S3D3 = 600</span>تكلفة 20 <bdi dir=\"ltr\">(S3D2)</bdi> متشطبة. تكلفة 21 (والـ D2 خلص، والـ S2 فاضله 100):<span class=\"ltr\">S2D2 = 900</span>تكلفة 23 متشطبة. تكلفة 24 (والـ S2 خلص، والـ D1 محتاج 200):<span class=\"ltr\">S2D1 = 100</span>تكلفة 25 متشطبة. تكلفة 30 متشطبة. تكلفة 31:<span class=\"ltr\">S1D1 = 200</span>تكلفة 42:<span class=\"ltr\">S1D3 = 200</span><b>الـ Total</b> <bdi dir=\"ltr\">(L4)</bdi> بيساوي:<span class=\"ltr\"><b>15×600 + 21×900 + 24×100</b></span><span class=\"ltr\"><b>+ 31×200 + 42×200</b></span><span class=\"ltr\"><b>= 9000 + 18900 + 2400</b></span><span class=\"ltr\"><b>+ 6200 + 8400 = 44,900</b></span><i>حل الطالب كاتب 42,500 لأنه ناسي <bdi dir=\"ltr\">24&nbsp;×&nbsp;100</bdi>. (والـ VAM كان هيدّي 42,700، وده الـ optimal.)</i>"
      },
      {
       "ans": "الـ Row mins:<span class=\"ltr\">7, 11, 10, 14 → (0,2,1,6), (5,5,4,0),</span><span class=\"ltr\">(6,9,0,5), (2,3,0,2)</span>الـ Column mins:<span class=\"ltr\">0, 2, 0, 0 → (0,0,1,6), (5,3,4,0),</span><span class=\"ltr\">(6,7,0,5), (2,1,0,2)</span>3 خطوط (صف Mohamed، والأعمدة J3 وJ4):<span class=\"ltr\">θ = 1 → (0,0,2,7), (4,2,4,0),</span><span class=\"ltr\">(5,6,0,5), (1,0,0,2)</span>الـ Assign (الـ Ahmed عنده الصفر الوحيد):<span class=\"ltr\">Ahmed → J4, Samy → J3,</span><span class=\"ltr\">Eslam → J2, Mohamed → J1</span><b>المجموع</b> <bdi dir=\"ltr\">(L5)</bdi> هو:<span class=\"ltr\"><b>7 + 11 + 10 + 17 = 45</b></span>"
      }
     ]
    },
    {
     "items": [
      {
       "ans": "الـ predecessor activity لازم تخلص مباشرةً قبل ما activity تانية تبدأ (L7)."
      },
      {
       "ans": "<b>الجزء (a)</b>:<span class=\"ltr\">1 →A→ 2; 2 →B→ 3;</span><span class=\"ltr\">2 →C→ 4; 3 →D→ 4;</span><span class=\"ltr\">3 →E→ 5; 4 →F→ 5;</span><span class=\"ltr\">5 →G→ 6</span><b>الجزء (b)</b>، الـ Paths:<span class=\"ltr\">A-B-E-G = 69; A-B-D-F-G = 84;</span><span class=\"ltr\">A-C-F-G = 69</span>الـ ES والـ LF لكل node:<span class=\"ltr\">node 1: 0/0, node 2: 15/15,</span><span class=\"ltr\">node 3: 32/32, node 4: 51/51,</span><span class=\"ltr\">node 5: 69/69, node 6: 84/84</span><b>الـ Critical path هو <bdi dir=\"ltr\">A-B-D-F-G</bdi>، ووقت الانتهاء 84 شهر.</b><br><b>الجزء (c)</b>، الـ Critical activities:<span class=\"ltr\"><b>A, B, D, F, G</b></span>والـ non-critical هم C و E، والـ total float لكل واحد 15 (L7)."
      }
     ]
    },
    {
     "items": [
      {
       "ans": "<b>الـ Stage 3</b>:<span class=\"ltr\">d(D, T) = 8, d(E, T) = 2</span><b>الـ Stage 2</b>، والـ A والـ C عن طريق E:<span class=\"ltr\">d(A) = min{3 + 8, 6 + 2} = 8</span><span class=\"ltr\">d(B) = min{4 + 8, 10 + 2} = 12</span><span class=\"ltr\">d(C) = min{10, 3 + 2} = 5</span><b>الـ Stage 1</b>:<span class=\"ltr\">d(S) = min{1 + 8, 2 + 12, 7 + 5}</span><span class=\"ltr\">= min{9, 14, 12} = 9</span><b>أقصر path، والمسافة 9</b> (L9)، هو:<span class=\"ltr\"><b>S → A → E → T</b></span>"
      }
     ]
    }
   ]
  }
 ]
};

window.AR = window.AR || {};
AR.or = { lectures: {}, exams: [] };

AR.or.lectures["1"] = {
  notes: [
    { h: `يعني إيه Operations Research (OR)؟`, pts: [
      `الـ OR بيهتم بـ <b>توزيع الـ resources المحدودة (scarce) بكفاءة (efficient)</b>. هو <b>فن وعلم</b> في نفس الوقت: الفن هنا إنك تقدر تحوّل مفاهيم زي <i>efficient</i> و<i>scarce</i> لـ <b>mathematical model</b> واضح ومحدد للموقف اللي قدامك.`,
      `<b>البداية (Origins)</b>: الـ OR بشكل رسمي بدأ في <b>إنجلترا أيام الحرب العالمية التانية</b>، لما فريق علماء بريطانيين اشتغلوا على قرارات أحسن استخدام لمعدات الحرب. وبعد الحرب الأفكار دي اتنقلت لـ <b>القطاع المدني (civilian sector)</b> عشان تحسّن الكفاءة والإنتاجية. والنهارده الـ OR أداة أساسية في اتخاذ القرار.`,
      `<b>التعريف (بصيغة الامتحان)</b>: الـ Operations research بيهتم بـ <b>إننا نقرر بشكل علمي إزاي نصمم ونشغّل الـ man-machine systems بأحسن طريقة</b>، وغالبًا ده بيحتاج <b>allocation of scarce resources</b>.`,
      `خلي بالك من الفخ: أسئلة الـ T/F في الامتحان بتلزق التعريف ده على "linear programming" أو "formulation problem" أو "dynamic programming". الجملة دي بتاعة <b>operations research</b> بس.`
    ] },
    { h: `الـ Linear programming والـ optimization problems`, pts: [
      `<b>Linear programming</b>: عايزين <b>نعمل maximize أو minimize لـ function تحت قيود (constraints)</b>. مثال: مصنع عايز يكبّر الربح وعنده حدود على الماكينات والعمالة.`,
      `<b>Optimization problem</b>: بندوّر نعمل max أو min لكمية معينة اسمها الـ <b>objective</b>، وهي بتعتمد على عدد محدود من الـ <b>input (decision) variables</b>. الـ variables دي ممكن تبقى مستقلة أو مربوطة ببعض عن طريق <b>constraint</b> أو أكتر.`,
      `الـ <b>mathematical program</b> هو optimization problem الـ objective والـ constraints فيه مكتوبين كـ mathematical functions وعلاقات رياضية.`,
      `<b>Linear programming problem (LPP)</b>: إنك تلاقي الـ optimal value (max أو min) لـ function <b>linear</b> (الـ objective function) في كذا variable، بشرط إن الـ variables تبقى <b>non-negative</b> وتحقق مجموعة <b>linear inequalities</b> (الـ linear constraints).`,
      `كلمة <b>linear</b> معناها إن كل العلاقات الرياضية في المسألة linear. وكلمة <b>programming</b> معناها طريقة تحديد <b>program أو خطة عمل (plan of action)</b> معينة.`
    ] },
    { h: `الشكل العام للـ mathematical program` },
    { h: `أهم التعريفات (Revision 1)` },
    { h: `خطوات الـ formulation الأربعة`, pts: [
      `<b>Step I</b>: عرّف الـ <b>decision variables</b> (x1, x2, ...)، وقول بوضوح كل واحد بيعدّ إيه.`,
      `<b>Step II</b>: لخّص البيانات المهمة في <b>جدول (table form)</b>، واربط الأعمدة بالـ decision variables لو ينفع (الـ resources في الصفوف، المتاح في آخر عمود، والـ profit/cost في آخر صف).`,
      `<b>Step III</b>: حدد الـ <b>objective</b> واكتب <b>linear objective function</b> (Max Z أو Min Z).`,
      `<b>Step IV</b>: اكتب الـ <b>constraints</b> والـ <b>non-negativity condition</b>.`,
      `<b>الكلمات المفتاحية</b> (ملخص طلبة): <i>profit, sold, sales, revenue</i> → <b>Max</b>؛ <i>cost</i> → <b>Min</b>؛ <i>available, has, at most, no more than, can use</i> ← <b>≤</b>؛ <i>at least, contains, minimum needs, must deliver</i> ← <b>≥</b>.`,
      `<b>الـ constraints المستخبية (Hidden constraints)</b>: مثلًا "عدد أيام الأسبوع" بيدّيك x ≤ 7، و"أيام شهر سبتمبر" بتدّيك x ≤ 30، و"بيتدفعله يوم كامل حتى لو اشتغل جزء من اليوم" معناها إن الـ variables لازم تبقى <b>integer</b>.`
    ] },
    { h: `Example 1: ماكينتين و revenue (Lecture 1)` },
    { h: `Examples من 2 لـ 5 (Lecture 1)` },
    { h: `تمارين المحاضرة Q1 و Q2 (محلولة)` },
    { h: `formulations من الامتحانات فيها شروط خاصة` }
  ],
  cards: [
    `بيهتم بإننا نقرر بشكل علمي إزاي نصمم ونشغّل الـ man-machine systems بأحسن طريقة، وغالبًا بيحتاج allocation of scarce resources.`,
    `في إنجلترا، أيام الحرب العالمية التانية (علماء بريطانيين بيقرروا أحسن استخدام لمعدات الحرب).`,
    `الفن إنك تعبّر عن "efficient" و"scarce" في mathematical model واضح ومحدد.`,
    `إنك تترجم المسألة الحقيقية لـ mathematical equations ينفع تتحل.`,
    `بتعمل maximize للـ profit أو minimize للـ loss/cost، بناءً على الـ constraints والـ decision variables.`,
    `الـ linear inequalities اللي على variables الـ LPP.`,
    `كل الـ decision variables لازم قيمتها تبقى ≥ 0.`,
    `كل العلاقات الرياضية في المسألة linear.`,
    `طريقة تحديد program أو plan of action معينة.`,
    `1) الـ decision variables، 2) جدول تلخيص، 3) linear objective function، 4) الـ constraints + الـ non-negativity.`,
    `constraint من نوع ≥.`,
    `constraint من نوع ≤.`,
    `Maximize.`,
    `Minimize.`,
    `optimization problem الـ objective والـ constraints بتوعه mathematical functions.`,
    `xi ≤ 7 (و integer لو اليوم بيتدفع كامل).`
  ],
  qa: [
    `الـ Operations research بيهتم بإننا نقرر بشكل علمي إزاي نصمم ونشغّل الـ man-machine systems بأحسن طريقة، وغالبًا بيحتاج allocation of scarce resources. بدأ في إنجلترا أيام الحرب العالمية التانية لما علماء بريطانيين قرروا أحسن استخدام لمعدات الحرب؛ وبعد الحرب الأفكار اتطبقت على الصناعة المدنية.`,
    `Step I: عرّف الـ decision variables. Step II: لخّص البيانات المهمة في جدول يربط الأعمدة بالـ decision variables. Step III: حدد الـ objective واكتب linear objective function. Step IV: اكتب الـ constraints والـ non-negativity condition.`,
    `"Linear" معناها إن كل العلاقات الرياضية في المسألة (الـ objective والـ constraints) linear. و"Programming" معناها طريقة تحديد program أو plan of action معينة.`,
    `الـ Objective function: الـ function اللي بنعملها maximize (profit) أو minimize (cost/loss) بناءً على الـ constraints والـ decision variables. الـ Constraints: الـ linear inequalities اللي على الـ variables (capacity، المتاح، الـ resources). الـ Non-negativity: كل decision variable لازم يبقى ≥ 0.`,
    `x1 = عدد وحدات A، x2 = عدد وحدات B. Max Z = 200x1 + 175x2 subject to 10x1 + 22x2 ≤ 2640، 15x1 + 18x2 ≤ 2500، x1, x2 ≥ 0.`,
    `xi = عدد الأيام اللي الـ mine i بيشتغلها. Min Z = 20x1 + 22x2 + 18x3 (بالـ $1000) s.t. 4x1 + 6x2 + x3 ≥ 54 (high grade)، 4x1 + 4x2 + 6x3 ≥ 65 (low grade). الـ Hidden constraints: xi ≥ 0، xi ≤ 7 (الأسبوع 7 أيام)، و xi integer لأن العمال بياخدوا يوم كامل حتى لو اشتغلوا جزء من اليوم.`
  ],
  quiz: [
    [`صح. ده تعريف الـ OR بالظبط في المحاضرة وفي Revision 1.`, `الـ LP بيعمل max أو min لـ linear function تحت constraints؛ ده أداة من أدوات الـ OR، مش التعريف ده.`, `الـ Formulation هو ترجمة المسألة الحقيقية لـ mathematical equations.`, `الـ DP بيتعامل مع الـ optimization للـ multistage decision problems.`],
    [`الـ objective function هي الكمية اللي بنعملها max أو min، مش الـ inequalities.`, `الـ LP هو المسألة كلها، مش الـ inequalities.`, `صح. الـ Constraints هي الـ linear inequalities اللي على الـ variables.`, `الـ Decision variables هي المجاهيل x1, x2, ...، مش الـ inequalities.`],
    [`"Programming" معناها تحديد plan of action.`, `دي بس بتجبر الـ variables تبقى ≥ 0.`, `صح. "Linear" معناها إن كل العلاقات linear.`, `"Feasible" بتوصف النقط اللي بتحقق كل الـ constraints.`],
    [`الجملة دي تعريف كلمة "linear" مش "programming".`, `صح. "Programming" معناها تحديد program أو plan of action معينة؛ وجملة الـ linear relations دي تعريف "linear".`],
    [`ده تعريف الـ operations research، مش الـ formulation.`, `صح. الـ Formulation = ترجمة المسألة الحقيقية لـ mathematical equations. والتعريف المكتوب ده بتاع الـ OR.`],
    [`صح. ده تعريف الـ constraints في المحاضرة.`, `هو مطابق للتعريف كلمة بكلمة.`],
    [`صح. ده تعريف الـ OR بالظبط (L1).`, `هو التعريف بالظبط.`],
    [`الجملة دي تعريف كلمة "programming".`, `صح. الـ Non-negativity معناها إن كل الـ decision variables لازم تبقى ≥ 0.`],
    [`الـ OR بيستخدم methods علمية (scientific) مش "economical"؛ ونموذج إجابة الطلبة معلّمها False ("مش التعريف").`, `صح. الـ OR بيطبق methods <b>scientific</b>؛ وتعريف المحاضرة هو "scientifically deciding how to best design and operate man-machine systems".`],
    [`صح. تعريف الـ formulation (Revision 1).`, `هو التعريف بالظبط.`],
    [`صح. تعريف الـ non-negativity restriction.`, `هو التعريف بالظبط.`],
    [`صح (جت في امتحان أغسطس كـ statement 8).`, `مطابقة للتعريف.`],
    [`صح. ده Column B item A في سؤال التوصيل بتاع أغسطس 2023/24.`, `ده الـ pivot element.`, `ده الـ shortest route problem.`, `ده الـ operations research.`],
    [`صح. التكاليف بنعملها minimize، و"at least" بتدّي ≥.`, `التكاليف بنعملها minimize، والاحتياجات اللي "at least" بتبقى ≥ مش ≤.`, `ده بيبدّل دور التكاليف والاحتياجات (شكله dual، مش الـ model).`, `اختيار A هو الـ formulation الصح.`],
    [`ناقصه شرط الـ integer وحد الـ 7 أيام.`, `لسه ناقصه x ≤ 7 (الـ mine مايقدرش يشتغل أكتر من 7 أيام في الأسبوع).`, `صح. فيه الـ hidden constraints الاتنين: 7 أيام بالكتير، وعدد أيام integer.`, `اختيار C هو الـ model الكامل اللي في حل الـ revision.`],
    [`التكاليف المفروض تبقى minimize، والاحتياجات "at least" (≥)؛ وكمان الـ carbohydrate بتاع C هو 20 مش 30.`, `صح. Minimize للتكلفة، و≥ للاحتياجات الأدنى.`, `ده شكل قريب من الـ dual (الاحتياجات بقت costs)؛ مش الـ formulation المطلوب.`, `اختيار B هو الصح.`]
  ],
  extra: [
    [`ده شرط على الـ variables، مش الكمية اللي بنعملها optimize.`, `"At most / available" بتدّي ≤؛ لكن "at least" بتدّي ≥.`, `صح. "At least" معناها إن الطرف الشمال لازم يبقى أكبر من أو يساوي 20.`, `الـ Non-negativity بتقول بس إن كل variable ≥ 0.`],
    [`الـ Profit بنعمله maximize مش minimize.`, `صح. الربح لكل وحدة مضروب في عدد الوحدات من كل منتج.`, `دي ساعات (معاملات constraints)، مش أرباح.`, `الـ 150 ده المتاح من العمالة (الـ right-hand side)، مش معامل.`],
    [`دي معناها إن Y بالكتير ضعف X، يعني العلاقة بالعكس.`, `ده constraint على إجمالي الإنتاج، مش نسبة.`, `الـ inequality معكوسة.`, `صح. x1 ≥ 2x2، ونقلناها كلها في طرف واحد (Final 2025/26 Q2).`],
    [`صح. الـ protein من A زائد الـ protein من B لازم يوصل 20 (Lecture 1، Example 5).`, `"At least" محتاجة ≥.`, `المعاملات متحطة على الأكلات الغلط.`, `الاحتياج مكانه في الـ right-hand side.`],
    [`مينفعش يشتغل أكتر من 31 يوم، فده الاتجاه الغلط.`, `الـ 7 دي للأسبوع، مش للشهر.`, `صح. الأيام محدودة بالشهر، والدفع بيوم كامل بيخلي الكسور مالهاش لازمة.`, `حد الأيام والـ integrality الاتنين مفهومين ضمنًا.`],
    [`المحاضرة بتقول إنجلترا، الحرب العالمية التانية.`, `صح. علماء بريطانيين قرروا أحسن استخدام لمعدات الحرب.`, `مش مذكور في المحاضرة.`, `الاستخدام المدني جه بعد الحرب.`],
    [`دي Step I.`, `دي Step II.`, `دي Step IV.`, `صح. دي تبع الـ simplex method، مش الـ formulation.`],
    [`صح. مجموع المنتجين لازم يوصل 30.`, `دي بتطلب 30 من <i>كل</i> منتج (يعني 60 في المجموع).`, `"At least" يعني ≥.`, `المعاملات والـ RHS متلخبطين.`],
    [`الساعات: 14 + 16 = 30 > 28، يبقى infeasible.`, `صح. الخشب 2 + 2 = 4 ≤ 6 والساعات 7 + 16 = 23 ≤ 28.`, `الخشب: 6 + 1 = 7 > 6، يبقى infeasible.`, `الساعات: 32 > 28، يبقى infeasible.`],
    [`الـ 130 ده المخزون المتاح؛ مكانه في الـ right-hand side (ده الغلط اللي في حل طالب).`, `ده معناه 3 باوند cherries لكل باوند mixture.`, `صح. تلت كل باوند cherries، فالـ constraint يبقى (1/2)x1 + (1/3)x2 ≤ 130.`, `التلتين دول نصيب الـ mint.`]
  ]
};

AR.or.lectures["2"] = {
  notes: [
    { h: `تعريفات الـ graphical method` },
    { h: `الخطوات: الـ geometric method لما يبقى عندك variablين`, pts: [
      `<b>Step 1</b>: ارسم الـ feasible region. حوّل كل inequality لـ equation، هات الـ intercepts بتوعها (حط x1 = 0 وبعدين x2 = 0)، ارسم الخط وظلّل الناحية الصح (الـ ≤ ناحية الـ origin، والـ ≥ بعيد عنه). لو فيه optimal solution، هات إحداثيات كل <b>corner point</b>.`,
      `<b>Step 2</b>: اعمل <b>corner point table</b> فيه قيمة الـ objective function عند كل corner point.`,
      `<b>Step 3</b>: حدد الـ optimal solution(s) من الجدول: <b>Max ← أكبر Z</b>، <b>Min ← أصغر Z</b>.`,
      `<b>Step 4</b>: لو المسألة تطبيقية، <b>فسّر (interpret)</b> الـ optimal solution بلغة المسألة الأصلية.`,
      `عشان تجيب corner جاي من تقاطع خطين، حل المعادلتين مع بعض (اضرب معادلة في رقم عشان variable يتشال، وبعدين اجمع).`,
      `خطوط زي x2 = 2 أفقية، و x1 = 1 رأسية؛ الـ x2 ≥ 2 معناها فوق الخط الأفقي، والـ x1 ≤ 1 معناها شمال الخط الرأسي.`
    ] },
    { h: `Example 1: Max Z = 200x1 + 175x2 (Lecture 2)` },
    { h: `Example 2: محل Jay للحلويات، Max Z = 25x1 + 20x2` },
    { h: `Example 5: الـ Diet، Min Z = 1.20x1 + 0.80x2` },
    { h: `مسائل graphical محلولة زيادة (السكاشن والشيتات)` },
    { h: `الحالات الخاصة اللي لازم تعرفها من الرسمة`, pts: [
      `<b>Infeasible</b>: المناطق المظللة مش بتتقاطع. مثال (revision Q14): Max 200x1 + 300x2 مع 2x1 + 3x2 ≥ 1200، x1 + x2 ≤ 400، 2x1 + 1.5x2 ≥ 900. جوه x1 + x2 ≤ 400 أكبر قيمة لـ 2x1 + 1.5x2 هي 2(400) = 800 < 900، يعني مفيش ولا نقطة بتحقق كل الـ constraints → <b>infeasible solution</b>.`,
      `<b>Unbounded</b>: في مسألة MAX المنطقة بتمتد من غير نهاية في الاتجاه اللي بيزوّد Z، فـ Z → ∞.`,
      `<b>Multiple optima</b>: خط الـ objective موازي لـ binding constraint؛ فيه اتنين corners جنب بعض بيدّوا نفس أحسن Z.`,
      `<b>Redundant constraint</b>: constraint مش بيلمس الـ feasible region أصلًا (لو شلته مفيش حاجة هتتغير).`
    ] }
  ],
  cards: [
    `المنطقة المشتركة اللي بتحددها كل الـ constraints ومعاهم الـ non-negative constraints.`,
    `أي نقطة جوه الـ feasible region.`,
    `نقطة في الـ feasible region بتدّي الـ optimal value (max أو min) للـ objective.`,
    `تقاطع خطين من حدود منطقة الحل.`,
    `أي نقط برا الـ feasible region.`,
    `LP الـ feasible set بتاعها فاضي.`,
    `الـ objective function قيمتها infinite.`,
    `فيه اتنين optimal corners؛ وكل نقطة على الخط اللي بينهم optimal.`,
    `ارسم الـ feasible region وهات الـ corner points.`,
    `اعمل corner-point table فيه قيم Z.`,
    `اختار الـ optimal Z (max أو min) من الجدول.`,
    `فسّر الحل بلغة المسألة الأصلية.`,
    `مفيد بس لما يبقى عندك 2 decision variables وعدد constraints قليل نسبيًا.`,
    `C(6, 8)، Z = $310.`,
    `B(4, 4)، أقل تكلفة Z = $8.`
  ],
  qa: [
    `الـ Feasible region: المنطقة اللي بتحددها كل الـ constraints ومعاهم الـ non-negativity. الـ Feasible solution: أي نقطة واحدة جوه المنطقة دي. الـ Optimal solution: نقطة feasible بتدّي أحسن قيمة (max أو min) للـ objective function على المنطقة كلها.`,
    `1) ارسم الـ feasible region، ولو فيه optimum هات إحداثيات كل corner point. 2) اعمل corner point table فيه Z عند كل corner. 3) حدد الـ optimal solution(s) من الجدول. 4) فسّر الـ optimal solution بلغة المسألة الأصلية.`,
    `الـ Intercepts: (0,11),(22,0) و (0,20),(10,0). الـ Corner C بطرح المعادلتين: 3x1 = 18، x1 = 6، x2 = 8. الـ Corners: (0,0)=0، (10,0)=250، (6,8)=310، (0,11)=220. الـ Optimum هو x1 = 6، x2 = 8، Z = 310.`,
    `المنطقة فوق الخطين الاتنين. الـ Corners: A(0,20) Z = 16، B(4,4) Z = 8، C(8,0) Z = 9.6. أقل Z = 8 عند (4,4).`,
    `الـ Infeasible LP: الـ feasible set فاضي، مفيش نقطة بتحقق كل الـ constraints. الـ Unbounded: الـ objective ممكن يكبر من غير حد (الـ objective function infinite). الـ Multiple optima: فيه اتنين corner points الاتنين optimal، فكل نقطة على الخط اللي بيوصلهم optimal برضه.`
  ],
  quiz: [
    [`الـ corner point هي نقطة تقاطع واحدة بين خطين من الحدود.`, `الـ optimal solution هي النقطة اللي بتدّي أحسن قيمة للـ objective.`, `صح. ده تعريف الـ feasible region.`, `الـ infeasible solutions بتبقى برا الـ feasible region.`],
    [`صح. ده التعريف.`, `هو مطابق للتعريف.`],
    [`صح. تعريف رقم 13 في Revision 1.`, `هو التعريف بالظبط.`],
    [`النقط اللي برا الـ feasible region اسمها infeasible solutions.`, `صح. النقط اللي برا المنطقة هي <b>infeasible</b> solutions؛ والـ unbounded معناها إن الـ objective infinite.`],
    [`صح (توصيل 2023/24: 1 → D).`, `ده الـ LP relaxation.`, `ده الـ predecessor activity.`, `ده الـ successor activity.`],
    [`صح (توصيل 2023/24: 1 → C).`, `ده الـ mixed integer programming.`, `دي الـ minimum cost method.`, `ده الـ total float.`],
    [`مفيش نقطة بتحقق التلاتة: مع x1 + x2 ≤ 400، أقصى قيمة لـ 2x1 + 1.5x2 هي 800 < 900.`, `ده بيتجاهل الـ constraints التانيين.`, `صح. الـ constraints مالهاش منطقة مشتركة، فالـ LP يبقى infeasible.`, `"Infeasible solution" بتوصفها بالظبط.`],
    [`Z = 0 هناك.`, `صح. Z ≈ 33,333، أكبر قيمة بين الـ corners.`, `Z ≈ 27,000 هناك، أصغر من B.`, `Z = 21,000 هناك.`],
    [`دي أكبر قيمة بين الـ corners.`, `مش الأصغر.`, `صح. 1.2(4) + 0.8(4) = 8.`, `الـ (0,0) بتكسر الـ ≥ constraints الاتنين.`],
    [`ده للـ minimization.`, `صح. الـ Max بياخد أكبر قيمة.`, `الـ origin غالبًا corner بس نادرًا ما يبقى optimal في الـ max.`, `الـ optimum بتاع الـ LP (لو unique) بيبقى عند corner.`],
    [`صح. الطرح بيدّي 3x1 = 18، يعني x1 = 6 و x2 = 8.`, `اتأكد: 8 + 12 = 20 ≠ 22.`, `ده الـ x1-intercept بتاع الخط التاني.`, `ده الـ x2-intercept بتاع الخط الأول.`],
    [`الـ slide عوّضت بـ 2 بدل 3 في x1.`, `3(3) + 2 = 11 مش 9.`, `صح. 3(3) + 2 = 11، ولسه أقل من 12 عند (4, 0)، فالـ optimum مش بيتغير.`, `الـ 12 دي قيمة Z عند (4, 0).`]
  ],
  extra: [
    [`صح. الطرح بيدّي 2x2 = 4، يعني x2 = 2 و x1 = 3.`, `اتأكد: 2(2) + 3 = 7 ≠ 8.`, `ده الـ x1-intercept بتاع الخط الأول بس.`, `ده الـ x2-intercept بتاع الخط التاني بس.`],
    [`corner بس مش الأحسن.`, `corner بس مش الأحسن.`, `صح. الـ Corners: (0,0) 0، (4,0) 20، (3,2) 23، (0,5) 20.`, `Infeasible: 2(5) = 10 > 8.`],
    [`corner بس مش أصغر قيمة.`, `صح. الـ Corners (0,4) = 8، (3,1) = 11، (6,0) = 18.`, `الـ (0,0) بتكسر الـ ≥ constraints الاتنين.`, `دي أكبر قيمة بين الـ corners.`],
    [`اقسم الـ 2500 على كل معامل لوحده.`, `دي المعاملات، مش الـ intercepts.`, `دول بتوع 10x1 + 22x2 = 2640.`, `صح. 2500/15 = 166.7 و 2500/18 = 138.9.`],
    [`صح. الـ corners اللي على الطرفين وكل نقطة بينهم optimal.`, `التوازي مش بيفضّي المنطقة.`, `الـ Unboundedness محتاجة منطقة مفتوحة في اتجاه التحسين.`, `فيه اتنين corners متعادلين.`],
    [`الـ origin مستبعد بسبب الـ ≥ constraints اللي الـ RHS بتاعها موجب.`, `المنطقة موجودة؛ هي بس مفتوحة.`, `صح. Z ممكن يكبر من غير حد، فالـ objective infinite.`, `مش مفهوم ضمنًا.`],
    [`ده للـ ≥ constraints (لما الـ origin يفشل في الاختبار).`, `صح. 0 ≤ 12 صح، فناحية الـ origin هي الـ feasible.`, `الناحيتين فيهم نقط فوق المحور.`, `اختبر نقطة (غالبًا الـ origin).`],
    [`Z(6,0) = 12، أقل من 16.`, `المنطقة مقفولة (polygon).`, `الـ (0,0) feasible.`, `صح. Z = 2(x1 + 2x2) = 16 على طول الحافة x1 + 2x2 = 8 كلها.`],
    [`6 + 16 = 22 و 24 + 16 = 40، الاتنين متحققين (دي الـ corner C).`, `10 ≤ 22 و 40 ≤ 40.`, `صح. 8 + 16 = 24 > 22.`, `22 ≤ 22 و 22 ≤ 40.`],
    [`صح. في الـ minimization اختار أصغر قيمة corner (B(1.5, 4) في مثال السكشن).`, `دي الأكبر.`, `مش الأصغر.`, `قيم الـ corners بتتقارن، مش بتتجمع.`]
  ]
};

AR.or.lectures["3"] = {
  notes: [
    { h: `ليه الـ simplex method؟ أهم التعريفات` },
    { h: `خطوات الـ Simplex (مسألة max، وكل الـ constraints ≤)`, pts: [
      `<b>Step 1</b>: حوّل الـ inequalities لـ equations باستخدام الـ slack variables، واكتب الـ objective على شكل Z − c1x1 − c2x2 − ... = 0.`,
      `<b>Step 2</b>: اعمل الـ initial simplex tableau وحدد الـ basic variables (الـ slacks و Z).`,
      `<b>Step 3</b>: اختار الـ <b>pivot column</b>: أكتر رقم سالب في الصف الأخير (من غير آخر عمود). لو فيه تعادل: اختار أي واحد.`,
      `<b>Step 4</b>: اختار الـ <b>pivot row</b>: اقسم كل RHS على الرقم <b>الموجب</b> اللي قصاده في الـ pivot column؛ و<b>أصغر ratio موجبة</b> هي اللي بتكسب. لو فيه تعادل: اختار أي واحد. لو مفيش ولا رقم موجب في الـ pivot column، يبقى البرنامج <b>ملوش (bounded) solution</b>. وصف الـ Z عمره ما بياخد ratio.`,
      `<b>Step 5</b>: الـ pivot element هو اللي عند تقاطعهم (ولازم يبقى موجب).`,
      `<b>Step 6</b>: استخدم الـ elementary row operations: اقسم الـ pivot row على الـ pivot عشان الـ pivot يبقى 1، وبعدين خلّي كل رقم تاني في الـ pivot column يبقى 0. الـ entering variable بياخد مكان الـ exiting variable في عمود الـ basis.`,
      `<b>Step 7</b>: كرر لحد ما <b>مايبقاش فيه أرقام سالبة في الصف الأخير</b> (من غير آخر عمود). وبعدين اقرا الحل: الـ basic variables = الـ RHS، والـ non-basic = 0، و Z = الرقم اللي تحت خالص على اليمين.`,
      `تأثير الـ pivot الواحد: الـ non-basic variable اللي داخل بيبقى basic، والـ basic variable اللي خارج بيبقى non-basic، و Z بيزيد (أو في حالات بيفضل زي ما هو).`
    ] },
    { h: `معادلات الـ row operations (طريقة المحاضرة واختصار السكشن)` },
    { h: `مثال المحاضرة: Max Z = 3x1 + x2، 2x1 + x2 ≤ 8، 2x1 + 3x2 ≤ 12 (الـ initial tableau)` },
    { h: `مثال المحاضرة بعد pivot واحد (optimal)` },
    { h: `خطوات حل الـ pivot بتاع المحاضرة` },
    { h: `مثال الـ Revision: Max Z = 8x1 + 5x2، x1 + 4x2 ≤ 4، 3x1 + 5x2 ≤ 24` },
    { h: `مثال الـ Revision: إجابات الـ MCQs`, pts: [
      `الـ Pivot column هو x1 (أكتر سالب −8)؛ الـ ratios 4/1 = 4 و 24/3 = 8 ← الـ pivot row هو s1؛ <b>الـ pivot element = 1</b>؛ الداخل x1 والخارج s1.`,
      `بعد pivot واحد: x1 = 4، s2 = 12، Z = 32. كل أرقام صف الـ Z ≥ 0، يبقى ده optimal: Z = 32 عند x1 = 4، x2 = 0.`,
      `تشييك باختصار السكشن: x2 في صف s2 = 5 − (4 × 3)/1 = −7؛ الـ RHS بتاع s2 = 24 − (4 × 3)/1 = 12؛ Z تحت x2 = −5 − (4 × (−8))/1 = 27.`
    ] },
    { h: `نتايج الـ tableaux اللي في الامتحانات (متراجعة)` },
    { h: `الـ Duality (جت مرة واحدة، Final 2021/22)`, pts: [
      `كل LP (اسمه الـ <b>primal</b>) ليه <b>dual</b>. لو الـ primal مسألة MAX في الـ canonical form (كله ≤): الـ dual بيبقى مسألة MIN؛ كل constraint في الـ primal بيدّي dual variable واحد yi؛ قيم الـ RHS بتبقى معاملات الـ dual objective؛ ومعاملات الـ objective بتبقى الـ dual RHS؛ والـ coefficient matrix بتتعملها transpose؛ والـ dual constraints بتبقى ≥.`,
      `قواعد الإشارة (primal max): constraint ≤ → yi ≥ 0؛ constraint ≥ → yi ≤ 0 (أو اضربه في −1 الأول)؛ constraint = → yi <b>unrestricted</b> في الإشارة. الـ primal variable xj ≥ 0 ← الـ dual constraint رقم j بيبقى ≥.`,
      `عند الـ optimum، الـ Z بتاع الـ primal = الـ W بتاع الـ dual (strong duality). الموضوع ده مش في slides 2024؛ ده كلام كتب معروف.`
    ] }
  ],
  cards: [
    `بتمشي من basic feasible solution لـ basic feasible solution تانية، وبتزوّد (أو بتقلل) Z باستمرار لحد ما توصل للـ optimality.`,
    `لما يبقى فيه decision variables أكتر و constraints أكتر.`,
    `بيتضاف لـ constraint ≤ عشان يبقى equation؛ بيمثل الـ resource اللي مااستخدمتش.`,
    `أكتر رقم سالب في الصف الأخير (صف Z)، من غير الـ RHS.`,
    `أصغر ratio موجبة: RHS ÷ الرقم الموجب في الـ pivot column.`,
    `تقاطع الـ pivot column مع الـ pivot row؛ ولازم يبقى موجب.`,
    `الـ variable بتاع الـ pivot column.`,
    `الـ basic variable بتاع الـ pivot row.`,
    `مفيش أرقام سالبة في الصف الأخير (من غير آخر عمود).`,
    `البرنامج ملوش (bounded) solution.`,
    `الـ slack variables (والـ decision variables بتبدأ non-basic = 0).`,
    `Z بيزيد، أو في حالات بيفضل زي ما هو.`,
    `الجديد = القديم − (رقم الـ pivot-row × رقم الـ pivot-column) ÷ الـ pivot.`,
    `Z − 3x1 − x2 = 0 لـ Max Z = 3x1 + x2 (المعاملات بتبقى سالبة).`,
    `Unrestricted في الإشارة.`,
    `Z = 12 عند x1 = 4، x2 = 0 بعد pivot واحد.`
  ],
  qa: [
    `الـ simplex method بتمشي من basic feasible solution لواحدة تانية بحيث تزوّد (أو تقلل) الـ objective function باستمرار لحد ما توصل للـ optimality. بتستخدم لما يبقى فيه decision variables أكتر و constraints أكتر؛ لكن الـ graphical method بتشتغل بس مع 2 variables وconstraints قليلة.`,
    `الـ Slack variable: variable غير سالب بيتضاف لـ constraint ≤ عشان يبقى equation (بيمثل الـ resource اللي مااستخدمتش). الـ Basic variables: اللي في عمود الـ basis في الـ tableau، وقيمتها من الـ RHS. الـ Non-basic variables: كل الباقي، وقيمتهم صفر.`,
    `الـ Pivot column: العمود اللي فيه أكتر رقم سالب في الصف الأخير (الـ entering variable). الـ Pivot row: الصف اللي فيه أصغر ratio موجبة RHS ÷ الرقم الموجب في الـ pivot column (الـ exiting variable). الـ Pivot element: تقاطعهم؛ لازم يبقى موجب، وبنخليه 1 بالـ row operations.`,
    `I) دوّر على أكتر رقم سالب في الصف الأخير (من غير آخر عمود): ده الـ pivot column. II) اعمل ratios: RHS ÷ الأرقام الموجبة في الـ pivot column؛ الأصغر بتحدد الـ pivot؛ ولو مفيش أرقام موجبة يبقى مفيش solution. III) استخدم الـ row operations عشان الـ pivot يبقى 1 وكل باقي أرقام الـ pivot column تبقى 0. IV) كرر لحد ما مايفضلش أرقام سالبة في الصف الأخير.`,
    `المعادلات: 2x1 + x2 + s1 = 8، 2x1 + 3x2 + s2 = 12، Z − 3x1 − x2 = 0. الـ Pivot column هو x1 (−3)؛ الـ ratios 4 و 6 ← الـ pivot هو 2 في صف s1. صف x1 الجديد (1, 1/2, 1/2, 0 | 4)؛ صف s2 (0, 2, −1, 1 | 4)؛ صف Z (0, 1/2, 3/2, 0 | 12). مفيش سوالب ← optimal: Z = 12 عند x1 = 4، x2 = 0.`,
    `الـ non-basic variable الداخل بيبقى basic، والـ basic variable الخارج بيبقى non-basic، وقيمة الـ objective function بتزيد أو في حالات بتفضل زي ما هي.`,
    `اكتب الـ constraint اللي ≥ على شكل −2x1 − 5x2 ≤ −20. الـ Dual variables: y1 ≥ 0، y2 ≥ 0، y3 unrestricted (عشان الـ equality). Min W = 56y1 − 20y2 + 40y3 s.t. 4y1 − 2y2 + 5y3 ≥ 12، 7y1 − 5y2 + 4y3 ≥ 4. تشييك: الـ optimum في الاتنين = 1520/17 ≈ 89.41.`
  ],
  quiz: [
    [`الـ graphical method محدودة بـ 2 variables و constraints قليلة.`, `صح (L3).`, `الـ activity مصطلح من الـ project management.`, `الـ NWC طريقة بداية في الـ transportation.`],
    [`الـ pivot operation هي عملية الـ row operations نفسها.`, `صح. ده تعريف الـ pivot (الـ pivot element).`, `ده مش مصطلح من المحاضرة.`, `الـ exiting variable هو الـ basic variable بتاع الـ pivot row.`],
    [`اللي عند التقاطع هو الـ pivot <b>element</b>، مش الـ pivot operation.`, `صح. الـ pivot element هو اللي عند التقاطع؛ والـ pivot operation هي عملية الـ row reduction.`],
    [`الـ exiting variable هو الـ basic variable بتاع الـ pivot row.`, `صح. الـ <b>pivot element</b> هو اللي عند التقاطع.`],
    [`ده الـ transportation problem.`, `صح. شحن سلعة بين sources وdestinations ده تعريف الـ transportation problem.`],
    [`ده تعريف الـ dynamic programming.`, `صح. الـ optimization للـ multistage decisions = dynamic programming.`],
    [`صح (توصيل 2023/24: 2 → F).`, `دي الـ northwest corner method.`, `دي الـ Infeasible solutions.`, `ده الـ LP relaxation.`],
    [`صح. الـ Pivot column هو x1 (−8)؛ الـ ratios 4/1 = 4 و 24/3 = 8، يبقى صف s1.`, `صف s2 الـ ratio بتاعه أكبر (8).`, `الـ 4 في عمود x2، وده مش الـ pivot column.`, `الـ pivot element هو 1.`],
    [`صح. أكتر رقم سالب في صف Z هو −8 وهو تحت x1.`, `الـ −5 أقل سلبية من −8.`, `الـ s1 هو الـ exiting variable.`, `الـ x1 هو اللي داخل.`],
    [`الـ x1 داخل، مش خارج.`, `الـ x2 non-basic.`, `صح. صف s1 فيه أصغر ratio (4).`, `الـ s1 هو اللي خارج.`],
    [`الـ 4 دي قيمة x1 الجديدة.`, `الـ s2 بيفضل basic وقيمته موجبة.`, `صح. 24 − 3 × 4 = 12.`, `s2 = 12.`],
    [`ده x1.`, `صح. 0 + 8 × 4 = 32 (وده optimal).`, `ده s2.`, `Z = 32.`],
    [`صف s1 الـ ratio بتاعه 20، أكبر من 17.5.`, `صح. الـ Pivot column هو x1؛ الـ ratios 20/1 = 20، 35/2 = 17.5، والـ −3 بنتخطاه. الأصغر هو صف s2.`, `الـ pivot عمره ما يبقى سالب.`, `الـ pivot هو 2.`],
    [`صح. Z + 5 × الصف الجديد (1, 0.5, 0, 0.5, 0 | 17.5).`, `ده مش ناتج من أي row operation صح هنا.`, `ده كان هيطلع لو عملنا pivot على صف s1.`, `اختيار A هو الصح.`],
    [`ده معناه إنك قسمت الصف التالت على −3، ودي مش خطوة صح.`, `مش نتيجة صح.`, `مش نتيجة صح.`, `صح. s3 + 3 × الـ pivot row الجديد = (0, 2.5, 0, 1.5, 1 | 64.5)، ودي مش موجودة في الاختيارات.`],
    [`مش نتيجة صح.`, `ده الصف القديم من غير تغيير.`, `صح. صف s2 ÷ 2؛ والـ x1 بقى basic.`, `اختيار C هو الصح.`],
    [`الـ ratio 7 ÷ (1/5) = 35 هي الأكبر، مش الأصغر.`, `صح. الـ Pivot column هو x1؛ الـ ratios 3.75، 2.86، 35 ← الـ pivot element هو 7/5 في صف s2.`],
    [`الأرقام صح بس الـ basic variable غلط.`, `صح (زي نموذج الطلبة). الأرقام دي هي الـ pivot row الجديد، بس x1 دخل و s2 خرج، فالصف لازم يتكتب عليه x1 مش s2.`],
    [`احسب Z + (22/5) × الـ pivot row الجديد.`, `صح. صف Z الجديد هو (0, 0, 0, 22/7, −2/7 | 480/7 ≈ 68.57).`],
    [`صف x1 بيدّي ratio = 60، مش الأصغر.`, `صح. الـ Pivot column هو x2؛ الـ ratios 50 ÷ 5/2 = 20، 30 ÷ 1/2 = 60، 160 ÷ 1 = 160 ← الـ pivot هو 5/2 في صف s1.`],
    [`صح. صف x2 الجديد = (0, 1, 2/5, −1/3, 0 | 20)؛ و s3 − 1 × الصف ده = (0, 0, −2/5, −1, 1 | 140).`, `هو مطابق للحساب.`],
    [`صح. Z + (3/2) × (0, 1, 2/5, −1/3, 0 | 20) = (0, 0, 3/5, 1/3, 0 | 180)، وده optimal.`, `هو مطابق للحساب.`],
    [`الصف الأول هو الـ pivot row؛ وبيبقى x2 (0, 1, 2/5, −1/3, 0 | 20).`, `صح. الصف الأول بيبقى x2 | 0, 1, 2/5, −1/3, 0 | 20.`],
    [`الـ −20 في صف Z؛ والـ pivot عمره ما بيبقى في صف Z ولا بيبقى سالب.`, `صح. الـ Pivot column هو x2؛ الـ ratios 3 ÷ 1/2 = 6، 5 ÷ 3/2 = 3.33 ← الـ pivot هو 3/2.`],
    [`صح. صف s2 ÷ 3/2 = (0, 1, −5/3, 2/3 | 10/3)، ومكتوب عليه x2.`, `هو مطابق للحساب.`],
    [`صح. Z + 20 × صف x2 الجديد = (0, 0, 80/3, 40/3 | 1280/3).`, `هو مطابق للحساب.`],
    [`أرقام صف Z عمرها ما بتبقى pivots.`, `صح. الـ Pivot column هو x1 (−7)؛ الـ ratios 20/5 = 4، 28/4 = 7 ← الـ pivot هو 5.`],
    [`الرقم اللي تحت s2 والـ RHS غلط.`, `صح. Z + 7 × (1, 0.4, 0.2, 0 | 4) = (0, −3.2, 1.4, 0 | 28).`],
    [`صح. 0 + 7 × 4 = 28. (Z لسه مش optimal: لسه فيه −3.2؛ والـ optimum النهائي 316/9 ≈ 35.1.)`, `بعد pivot واحد الـ RHS بتاع صف Z = 28.`]
  ],
  extra: [
    [`Z − 5x1 − 4x2 = 0 بتدّي معاملات سالبة.`, `صح. لما بتنقل حدود الـ objective للشمال بتبقى سالبة.`, `الـ Slacks تكلفتهم 0 في صف Z.`, `ده صف أول constraint.`],
    [`الـ ratio 5/1 = 5 أكبر من 8/2 = 4.`, `أرقام صف Z عمرها ما بتبقى pivots.`, `الـ x2 مش الـ pivot column (−4 > −5).`, `صح. الـ Pivot column هو x1؛ الـ ratios 5 و 4 ← صف s2.`],
    [`صح. x1 = 4، يبقى Z = 5 × 4 = 20 (صف Z بيبقى 0, −1.5, 0, 2.5 | 20).`, `الـ 23 ده الـ optimum النهائي بعد pivot تاني.`, `الـ 8 ده right-hand side.`, `الـ 4 دي قيمة x1 الجديدة.`],
    [`الأرقام السالبة أو الصفر بنتخطاها.`, `بنختار أصغر ratio موجبة.`, `صح (L3، step II).`, `صف Z عمره ما بياخد ratio.`],
    [`الـ Slacks على عدد الـ constraints، مش الـ variables.`, `صح. slack واحد لكل constraint ≤.`, `ده إجمالي عدد الـ variables بعد ما ضفنا الـ slacks.`, `كل constraint محتاج slack خاص بيه.`],
    [`صح. ده الـ stopping rule بتاع step IV.`, `الـ Feasibility بتبان من إن قيم الـ RHS غير سالبة.`, `الـ Unboundedness بتبان لما الـ pivot column مافيهوش ولا رقم موجب.`, `الـ Degeneracy معناها basic variable قيمته صفر، ملهاش علاقة.`],
    [`الـ pivot لازم يبقى موجب.`, `لسه فيه رقم سالب في صف Z.`, `ده مش بيحل حاجة.`, `صح. البرنامج ملوش (bounded) solution: يعني unbounded (L3: "If no element in the work column is positive, the program has no solution").`],
    [`حاصل الضرب بيتطرح، مش بيتجمع.`, `الأعمدة اللي فيها 0 في الـ pivot row بس هي اللي مابتتغيرش.`, `صح. 5 − (4 × 3)/1 = −7 (مثال الـ revision، x2 في صف s2).`, `الـ 12 ده حاصل الضرب نفسه.`],
    [`لسه فيه −1.5 في صف Z بعد أول pivot، يبقى مش optimal.`, `صح. تاني pivot: العمود x2، الـ ratios 1/0.5 = 2 و 4/0.5 = 8 → x2 = 2، x1 = 3، Z = 23 (نفس الرسم).`, `مش optimal.`, `Infeasible.`],
    [`صح. الـ RHS بقى costs، والأعمدة بقت صفوف، والـ ≤ بقت ≥.`, `الـ dual بتاع مسألة max بيبقى مسألة min بـ ≥.`, `دور معاملات الـ objective والـ RHS اتبدّل غلط.`, `الـ matrix لازم تتعمل transpose عمود عمود: عمود x1 اللي هو (1, 1) بيدّي y1 + y2 ≥ 3.`]
  ]
};

AR.or.lectures["4"] = {
  notes: [
    { h: `الـ transportation problem`, pts: [
      `هي مسألة إنك تلاقي <b>أقل تكلفة لتوزيع (minimum-cost distribution)</b> سلعة معينة من مجموعة <b>supply centers (sources)</b> i = 1, ..., m لمجموعة <b>receiving centers (destinations)</b> j = 1, ..., n. تعريف الـ revision: بتهتم بـ <b>shipping a commodity between a set of sources and a set of destinations</b>.`,
      `كل source عنده supply S<sub>i</sub>؛ وكل destination عنده demand D<sub>j</sub>؛ وتكلفة الشحن من source لـ destination <b>بتتناسب طرديًا مع عدد الوحدات اللي اتشحنت</b> (تكلفة الوحدة c<sub>ij</sub>، والكمية x<sub>ij</sub>).`,
      `محتاج: (1) <b>الـ capacity بتاع كل supply point</b> (الـ supply أو المخزون)، (2) <b>الكمية المطلوبة عند كل demand point</b> (الـ demand)، (3) <b>تكلفة نقل الوحدة</b> من كل supply point لكل demand point.`,
      `شكل الـ Network: الـ sources على الشمال، والـ destinations على اليمين، وفيه arc (i, j) لكل route بتكلفة c<sub>ij</sub> و flow x<sub>ij</sub>.`,
      `مسألة <b>Balanced</b>: إجمالي الـ supply = إجمالي الـ demand (كل أمثلة الكورس كده). لو مش كده، ضيف dummy source أو dummy destination تكاليفه صفر عشان ياخد الفرق (قاعدة الكتب).`,
      `الـ basic feasible solution فيها <b>m + n − 1</b> خانة متوزع فيها (مثلًا 3 sources × 4 destinations → 6 خانات). طرق الـ initial BFS: الـ <b>Northwest corner rule</b>، الـ <b>Least cost (minimum cost) method</b>، والـ <b>Vogel's approximation method</b>.`
    ] },
    { h: `بيانات المحاضرة (البسلة المعلبة، بالـ truckloads)` },
    { h: `الـ Northwest corner rule`, pts: [
      `أول allocation بيتعمل في الخانة اللي في <b>الركن الشمال فوق (upper left-hand corner)</b> من الـ tableau. حط <b>أكبر كمية ممكنة</b> = min(supply, demand)، اشطب الصف أو العمود اللي اتقفل، وبعدين اتحرك <b>يمين</b> (لو الصف لسه فيه supply) أو <b>تحت</b> (لو العمود لسه فيه demand). التكاليف مش بتفرق هنا خالص.`,
      `في المحاضرة: C1W1 = 75 (C1 خلص) ← C2W1 = 5 (W1 خلص) ← C2W2 = 65 → C2W3 = 55 (C2 خلص) ← C3W3 = 15 → C3W4 = 85.`,
      `<b>Z = 464×75 + 352×5 + 216×65 + 690×55 + 388×15 + 685×85 = $152,595</b>`
    ] },
    { h: `الـ Least cost (minimum cost) method`, pts: [
      `أول allocation بيتعمل في الخانة اللي فيها <b>أقل تكلفة</b> في الـ tableau كله؛ حط min(supply, demand)، اشطب الصف/العمود اللي اتقفل، وكرر مع أقل تكلفة فاضلة.`,
      `في المحاضرة: 216 (C2W2) = 65 → 352 (C2W1) = 60 (C2 خلص) ← 388 (C3W3) = 70 → 464 (C1W1) = 20 (W1 خلص) ← 685 (C3W4) = 30 (C3 خلص) ← 867 (C1W4) = 55.`,
      `<b>Z = 464×20 + 867×55 + 352×60 + 216×65 + 388×70 + 685×30 = $139,835</b> (أرخص من الـ NWC، وفي البيانات دي هو optimal أصلًا).`
    ] },
    { h: `الـ Vogel's approximation method (VAM)`, pts: [
      `<b>1.</b> الـ Penalty بتاع كل صف وعمود = <b>تاني أقل تكلفة − أقل تكلفة</b> في الصف/العمود ده (الخانات اللي مش متشطبة بس).`,
      `<b>2.</b> اختار الصف أو العمود اللي ليه <b>أعلى penalty</b> (التعادل: اختار أي واحد أو اللي فيه الخانة الأرخص).`,
      `<b>3.</b> حط أكبر كمية ممكنة في <b>أرخص خانة feasible</b> في الصف أو العمود ده.`,
      `<b>4.</b> اشطب الصف/العمود اللي اتقفل، احسب الـ penalties تاني، وكرر لحد ما كل الـ rim requirements (الـ supply والـ demand) تتحقق.`,
      `تكة طلبة: "أصغر، أكبر، أصغر": أصغر تكلفتين ← أكبر penalty ← أرخص خانة. الـ VAM غالبًا بيدّي أحسن starting solution من التلاتة.`
    ] },
    { h: `مثال الـ VAM في المحاضرة (supplies 200, 350, 150, 90؛ demands 100, 140, 300, 250)` },
    { h: `التكلفة الكلية بالـ VAM` },
    { h: `الـ Stepping stone method (تحسين الـ BFS، جت في Final 2025/26)`, pts: [
      `لكل خانة <b>فاضية (unoccupied)</b>، ارسم <b>closed path</b> يبدأ من الخانة دي، ويتحرك أفقي/رأسي بس، وميلفّش غير عند خانات <b>مليانة (occupied)</b>. علّم الأركان بالتبادل <b>+, −, +, −</b>، وابدأ بـ + عند الخانة الفاضية.`,
      `الـ <b>Improvement index</b> = مجموع تكاليف خانات الـ + − مجموع تكاليف خانات الـ −. ده معناه التغيير في التكلفة الكلية لكل وحدة بتنقلها للخانة الفاضية.`,
      `لو كل الـ indices ≥ 0، يبقى الحل <b>optimal</b> (في الـ minimization). غير كده اختار <b>أكتر index سالب</b>، وانقل θ = <b>أصغر allocation في خانات الـ −</b> على المسار (زوّد θ في الـ + واطرحه من الـ −). الخانة اللي توصل 0 بتخرج. وكرر.`,
      `التكلفة الجديدة = التكلفة القديمة + (الـ index × θ).`
    ] },
    { h: `Final 2025/26 محلول: LCM وبعدين stepping stone` },
    { h: `مثال الـ Revision (S1: 100 140 75 | 300، S2: 90 20 110 | 320، S3: 60 130 220 | 380؛ demand 250 550 200)` }
  ],
  cards: [
    `شحن سلعة بين مجموعة sources ومجموعة destinations بأقل تكلفة.`,
    `الـ Supply بتاع كل source، والـ demand بتاع كل destination، وتكلفة نقل الوحدة على كل route.`,
    `أول allocation في الخانة اللي في الركن الشمال فوق؛ وبتتجاهل التكلفة.`,
    `أول allocation في الخانة اللي فيها أقل تكلفة في الـ tableau.`,
    `تاني أقل تكلفة − أقل تكلفة في صف أو عمود.`,
    `الخط (صف/عمود) اللي ليه أعلى penalty، وبعدين أرخص خانة فيه.`,
    `m + n − 1.`,
    `إجمالي الـ supply = إجمالي الـ demand.`,
    `$152,595.`,
    `$139,835.`,
    `$10,330.`,
    `مجموع تكاليف خانات الـ + − مجموع تكاليف خانات الـ − على الـ closed path.`,
    `كل الـ improvement indices ≥ 0.`,
    `أصغر allocation في خانات الـ − على المسار.`,
    `بتتناسب طرديًا مع عدد الوحدات اللي اتشحنت.`,
    `الـ Vogel's approximation (وكمان الـ NWC والـ LCM).`
  ],
  qa: [
    `بتهتم بشحن سلعة بين مجموعة sources ومجموعة destinations، وبتدوّر على أقل تكلفة توزيع. محتاج: الـ supply (الـ capacity) بتاع كل source، والـ demand بتاع كل destination، وتكلفة نقل الوحدة من كل source لكل destination.`,
    `الـ NWC: ابدأ من الخانة اللي فوق على الشمال، حط أكبر كمية ممكنة (min بين الـ supply والـ demand)، اشطب الصف/العمود اللي اتقفل واتحرك يمين أو تحت لحد ما كل الـ supply/demand يخلص؛ التكاليف مش بتدخل. الـ LCM: دايمًا حط في الخانة اللي فيها أقل تكلفة في الـ tableau الفاضل، أكبر كمية ممكنة، اشطب وكرر.`,
    `1) لكل صف وعمود احسب الـ penalty = تاني أقل تكلفة − أقل تكلفة. 2) اختار الصف/العمود اللي ليه أعلى penalty (التعادل: أي واحد أو حسب أرخص خانة). 3) حط أكبر كمية ممكنة في أرخص خانة في الخط ده. 4) اشطب الخط اللي اتقفل، احسب الـ penalties تاني، وكرر لحد ما كل الـ rim requirements تتحقق.`,
    `بتبدأ من initial BFS فيها m + n − 1 خانة مليانة، ولكل خانة فاضية بترسم closed path ميلفّش غير عند الخانات المليانة، والإشارات بالتبادل +, −. الـ Improvement index = Σ(تكاليف الـ +) − Σ(تكاليف الـ −). لو كل الـ indices ≥ 0 يبقى الحل optimal؛ غير كده دخّل الخانة اللي ليها أكتر index سالب، وانقل θ = أصغر allocation في الـ −، وكرر.`,
    `20: S2D2 = 320 (S2 خلص). 60: S3D1 = 250 (D1 خلص). 75: S1D3 = 200 (D3 خلص). 130: S3D2 = 130 (S3 خلص). 140: S1D2 = 100. Z = 20×320 + 60×250 + 75×200 + 130×130 + 140×100 = $67,300.`,
    `عندك m معادلة supply و n معادلة demand، بس في المسألة الـ balanced واحدة منهم redundant (إجمالي الـ supply = إجمالي الـ demand)، فاللي مستقلين فعلًا m + n − 1 بس، وده بيدّي m + n − 1 basic variables. لو الخانات الموجبة أقل من كده يبقى الحل degenerate.`
  ],
  quiz: [
    [`صح. واسمها كمان الـ minimum cost method.`, `الـ NWC بتبدأ من الركن الشمال فوق.`, `الـ VAM بيستخدم الـ penalties الأول.`, `دي بتحل الـ assignment problem.`],
    [`صح (Revision 1، تعريف 16).`, `الـ Assignment بيوزّع resources على عدد مساوي من الـ activities.`, `دي بتلاقي أقصر مسافة بين node اتنين.`, `الـ Simplex بيحل الـ LPs بشكل عام.`],
    [`ده وصف الـ northwest corner method.`, `صح. الـ VAM بيوزّع بالـ penalties؛ والبداية من فوق على الشمال دي الـ NWC.`],
    [`صح. تعريف 17 في Revision 1.`, `ده التعريف.`],
    [`صح. الـ VAM طريقة لإيجاد initial BFS للـ transportation problem.`, `هي طريقة transportation.`],
    [`الـ 150 دي M22.`, `صح. Q1D1 = 80، وبعدين Q1D2 = 100 − 80 = 20.`],
    [`الـ Q2 بيخلص عند D3 (Q2D2 = 150، Q2D3 = 50).`, `صح. M24 = 0؛ والـ 50 في خانة (Q2, D3).`],
    [`الـ D3 محتاج بس 190 − 50 = 140 كمان.`, `صح. Q3D3 = 140، Q3D4 = 160.`],
    [`صح. بعد Q3D3 = 140، الـ Q3 فاضله 160، وده بالظبط الـ demand بتاع D4.`, `هي 160.`],
    [`احسبها: الإجابة 4010.`, `صح. 7×80 + 3×20 + 6×150 + 11×50 + 7×140 + 6×160 = 560 + 60 + 900 + 550 + 980 + 960 = 4010.`],
    [`الـ NWC دايمًا بتبدأ بإنها تملا الخانة اللي فوق على الشمال.`, `صح. M11 = min(250, 200) = 200.`],
    [`صح. Q1D1 = 200، Q1D2 = 50، Q2D2 = 250، Q2D3 = 100، Q3D3 = 250، Q3D4 = 150. M22 = M33 = 250.`, `الاتنين = 250.`],
    [`تكلفة الـ NWC = 3700.`, `صح. 3×200 + 1×50 + 6×250 + 5×100 + 3×250 + 2×150 = 600 + 50 + 1500 + 500 + 750 + 300 = 3700.`],
    [`الـ S2 بيتستخدم كله في أرخص خانة عنده (S2, D2).`, `صح. الـ LCM بيحط 320 في S2D2 الأول؛ والـ 250 بتوع D1 بيروحوا لـ S3 (تكلفة 60). M21 = 0.`],
    [`صح. 20×320 + 60×250 + 75×200 + 130×130 + 140×100 = 67,300.`, `هي 67,300.`],
    [`صح. S1D1 = 250، S1D2 = 50، وبعدين S2D2 = 320.`, `هي 320.`],
    [`الـ 180 في خانة (S3, D2).`, `صح. S3D2 = 180 و S3D3 = 200.`],
    [`صح. 100×250 + 140×50 + 20×320 + 130×180 + 220×200 = 105,800.`, `هي 105,800.`],
    [`بعد Q1D2 = 40، الـ Q1 فاضله 80 بس.`, `صح. أول خطوة بتختار D2 (penalty 15): Q1D2 = 40؛ تاني خطوة بتختار Q1 (penalty 13): Q1D4 = 80.`],
    [`صح. Q2D3 = 30 و Q2D4 = 30.`, `الاتنين 30.`],
    [`صح. 22×40 + 4×80 + 9×30 + 7×30 + 32×50 + 24×10 = 880 + 320 + 270 + 210 + 1600 + 240 = 3520.`, `هي 3520.`],
    [`الـ D2 محتاج 8 بس.`, `صح. أول اختيار بالـ penalty هو D2 (22): Q3D2 = min(18, 8) = 8.`],
    [`تكلفة الـ VAM = 779 (الأرقام متبدلة).`, `صح. Q3D2 = 8، Q1D1 = 5، Q3D4 = 10، Q1D4 = 2، Q2D4 = 2، Q2D3 = 7: 64 + 95 + 200 + 20 + 120 + 280 = 779.`],
    [`صح. بعد ما الخانات اللي تكلفتها 1 و 2 و 4 اتملت، أرخص خانة مفتوحة في Q1 هي D2 (تكلفة 6): 400.`, `هي 400.`],
    [`التكلفة 4 هي تالت أرخص خانة متاحة.`, `صح. Q2D1 = 200، Q3D3 = 300، وبعدين Q2D3 = 100.`],
    [`الـ LCM بيدّي $5200.`, `صح. 1×200 + 2×300 + 4×100 + 6×400 + 8×200 = 5200.`],
    [`صح. المسار مابيلفّش غير عند خانات مليانة: Q3D3، Q2D3، Q2D2. الـ Index = 3 − 2 + 4 − 8 = −3.`, `ده الـ closed path الصح.`],
    [`التكلفة بعد التحسين (الـ optimal) = 4600.`, `صح. θ = 200 على المسار اللي الـ index بتاعه −3: 5200 − 600 = 4600، وكل الـ indices الجديدة ≥ 0.`],
    [`صح (توصيل 2023/24: 2 → D).`, `دي الـ Northwest corner method.`, `ده الـ Mixed IP.`, `ده الـ Project.`]
  ],
  extra: [
    [`دي نتيجة الـ least-cost (والـ VAM).`, `صح. S1D1 = 10، S1D2 = 10، S2D2 = 15، S2D3 = 15: 40 + 60 + 45 + 105 = 250.`, `راجع: 4×10 + 6×10 + 3×15 + 7×15 = 250.`, `قليلة أوي؛ مفيش خطة feasible تكلفتها 200.`],
    [`دي الـ NWC.`, `أقل من الـ optimum، مستحيل.`, `راجع الـ allocations.`, `صح. S2D2 = 25 (3)، S1D1 = 10 (4)، S2D3 = 5 (7)، S1D3 = 10 (8): 75 + 40 + 35 + 80 = 230 (وهي optimal كمان).`],
    [`صح. أعلى penalty هو D2 (3)؛ وأرخص خانة فيه هي S2 بتكلفة 3؛ حط min(30, 25).`, `الـ D1 الـ penalty بتاعه 1 بس.`, `أرخص خانة في D2 هي S2 (3)، مش S1 (6).`, `الـ D3 الـ penalty بتاعه 1.`],
    [`ده إجمالي عدد الخانات.`, `ده m + n.`, `صح. m + n − 1 = 3 + 4 − 1.`, `قليل أوي.`],
    [`كده بتضيّع معلومات.`, `صح. ده بيعمل balance للمسألة (قاعدة الكتب).`, `الـ dummy source بنحتاجه لما الـ demand يبقى أكبر من الـ supply.`, `الطرق دي محتاجة supply = demand.`],
    [`صح. 5 − 6 + 8 − 1 = 6 ≥ 0، يعني لو دخلنا الخانة دي التكلفة هتزيد.`, `الإشارات: اجمع خانات الـ + واطرح خانات الـ −.`, `كده جمعت التكاليف الأربعة كلها.`, `احسب 5 − 6 + 8 − 1.`],
    [`كده الخانة اللي فيها 200 هتبقى سالبة.`, `مش كمية صح.`, `مفيش سبب للـ 100.`, `صح. θ = أصغر allocation في خانات الـ −.`],
    [`الـ index السالب بيقلل التكلفة.`, `اضرب، ماتجمعش.`, `صح. التغيير = الـ index × θ = −4 × 50.`, `ده التغيير لكل وحدة.`],
    [`ده الأكبر − الأصغر.`, `صح. أقل اتنين هما 13 و 16: 16 − 13 = 3.`, `مش أقل اتنين.`, `ده أقل تكلفة نفسها.`],
    [`صح. دايمًا بتبدأ من الخانة اللي فوق على الشمال، فغالبًا بتدّي أعلى تكلفة.`, `دايمًا بتدوّر على أقل تكلفة.`, `الـ Penalties متبنية من التكاليف.`, `بيقيّم التكاليف على الـ closed paths.`]
  ]
};

AR.or.lectures["5"] = {
  notes: [
    { h: `الـ assignment model`, pts: [
      `الـ assignment model هو <b>شكل خاص من الـ linear programming model</b> شبه الـ transportation model؛ والفرق إن <b>الـ supply عند كل source والـ demand عند كل destination كل واحد فيهم محدود بوحدة واحدة</b>.`,
      `<b>التعريف (Revision 1)</b>: الـ assignment problem حالة خاصة من الـ transportation problem هدفها إنك <b>توزّع عدد من الـ resources على عدد مساوي من الـ activities</b> بحيث <b>تقلل التكلفة الكلية أو تزوّد الربح الكلي</b> للتوزيع.`,
      `المسألة دي بتطلع لأن الـ resources (ناس، ماكينات...) كفاءتها بتختلف من activity للتانية، فالتكلفة أو الربح أو الخسارة بتختلف.`,
      `كل صف (شخص/job) بياخد عمود واحد بالظبط (ماكينة/programmer)، وكل عمود بياخد صف واحد بالظبط. المسألة n × n فيها n assignments.`,
      `امتدادات من الكتب: مسألة <b>maximization</b> بنحوّلها بإننا نطرح كل خانة من أكبر خانة؛ والـ matrix الـ <b>unbalanced</b> بنضيفلها dummy row/column كله أصفار.`
    ] },
    { h: `الـ Hungarian method (خطوات المحاضرة)`, pts: [
      `<b>Step 1 (row reduction)</b>: اطرح أصغر رقم في كل صف من كل أرقام الصف ده.`,
      `<b>Step 2 (column reduction)</b>: اطرح أصغر رقم في كل عمود من كل أرقام العمود ده.`,
      `<b>Step 3</b>: غطّي كل الأصفار بـ <b>أقل عدد من الخطوط الأفقية/الرأسية</b>. طريقة المحاضرة: <b>row scanning</b>: صف فيه صفر واحد بس مش متعلّم ← اعمله box (assign) واشطب باقي الأصفار اللي في عموده؛ وبعدين <b>column scanning</b>: عمود فيه صفر واحد بس ← اعمله box واشطب أصفار صفه.`,
      `لو عدد الـ assignments اللي عليها box (= عدد الخطوط) يساوي n، يبقى الـ assignment ده optimal. والتكلفة الكلية بتتقري من الـ matrix <b>الأصلية</b>.`,
      `<b>Step 4 (الـ marking، لو أقل من n)</b>: علّم (√) الصفوف اللي مافيهاش assignment؛ علّم الأعمدة اللي فيها صفر في صف متعلّم؛ علّم الصفوف اللي فيها assigned zero في عمود متعلّم؛ وكرر. ارسم خطوط على <b>الصفوف اللي مش متعلّمة</b> و<b>الأعمدة المتعلّمة</b>.`,
      `<b>Step 5</b>: θ = أصغر رقم <b>مش متغطي (uncovered)</b>. الأرقام اللي مش متغطية تبقى C − θ، واللي عليها خط واحد تفضل C زي ما هي، واللي عند تقاطع خطين تبقى C + θ. وارجع لـ step 3.`,
      `اختصار السكشن: ارسم الخطوط على الصفوف/الأعمدة اللي فيها أكتر أصفار؛ لو عدد الخطوط = عدد الصفوف، اعمل assign؛ غير كده عدّل بـ θ وارسم تاني.`
    ] },
    { h: `مثال المحاضرة (Page 107): D، E، F` },
    { h: `نتيجة مثال المحاضرة` },
    { h: `مثال المحاضرة 2: jobs J1..J4 على persons P1..P4` },
    { h: `الـ marking والإجابة في Example 2` },
    { h: `Sheet 1 / Final Aug 2022/23 Q2 (متراجعة)` },
    { h: `امتحانات assignment تانية محلولة` }
  ],
  cards: [
    `transportation problem خاصة بتوزّع resources على عدد مساوي من الـ activities عشان تقلل التكلفة أو تزوّد الربح.`,
    `كل واحد فيهم محدود بوحدة واحدة.`,
    `اطرح أصغر رقم في كل صف من الصف.`,
    `اطرح أصغر رقم في كل عمود من العمود.`,
    `غطّي كل الأصفار بأقل عدد من الخطوط.`,
    `عدد الخطوط (الـ independent assignments) = n.`,
    `أصغر رقم مش متغطي.`,
    `C − θ.`,
    `زي ما هو.`,
    `C + θ.`,
    `الصفوف اللي مش متعلّمة والأعمدة المتعلّمة.`,
    `من الـ cost matrix الأصلية.`,
    `J1→P4، J2→P1، J3→P3، J4→P2: $234.`,
    `A→E، B→F، C→D: $950.`,
    `اطرح كل الخانات من أكبر خانة، وبعدين اعمل minimize.`
  ],
  qa: [
    `هي حالة خاصة من الـ transportation problem هدفها توزيع عدد من الـ resources على عدد مساوي من الـ activities عشان تقلل التكلفة الكلية أو تزوّد الربح الكلي. وعلى عكس الـ transportation، الـ supply بتاع كل source والـ demand بتاع كل destination = وحدة واحدة، فكل صف بياخد عمود واحد بالظبط.`,
    `1) Row reduction. 2) Column reduction. 3) غطّي كل الأصفار بأقل عدد خطوط (row و column scanning). لو الخطوط = n، اعمل assign واحسب التكلفة من الـ matrix الأصلية. 4) غير كده علّم الصفوف اللي مالهاش assignment، والأعمدة اللي فيها أصفارهم، والصفوف اللي فيها assignments في الأعمدة المتعلّمة؛ وارسم خطوط على الصفوف اللي مش متعلّمة والأعمدة المتعلّمة. 5) θ = أصغر رقم مش متغطي؛ اطرح θ من اللي مش متغطي، وزوّد θ عند التقاطعات، وسيب اللي عليه خط واحد؛ وكرر.`,
    `الـ Row mins 1، 7، 4، 5 → (0,3,5,2)، (2,0,3,2)، (0,1,7,3)، (3,2,3,0). الـ Column mins 0،0،3،0 → (0,3,2,2)، (2,0,0,2)، (0,1,4,3)، (3,2,0,0). 3 خطوط < 4 → θ = 1 → (0,2,1,1)، (3,0,0,2)، (0,0,3,2)، (4,2,0,0). Assign 1→A، 2→C، 3→B، 4→D: 1 + 10 + 5 + 5 = 21.`,
    `الـ Row mins 40، 10، 20، 10 → (0,20,20,30)، (0,50,60,20)، (0,30,20,0)، (20,10,0,30). الـ Column mins 0، 10، 0، 0 → (0,10,20,30)، (0,40,60,20)، (0,20,20,0)، (20,0,0,30). 3 خطوط ← θ = 10 → (0,0,10,30)، (0,30,50,20)، (0,10,10,0)، (30,0,0,40). Assign J2→P1، J1→P2، J3→P4، J4→P3: 10 + 60 + 20 + 10 = 100.`,
    `الـ θ هو أصغر رقم مش متغطي بأي خط. اطرح θ من كل رقم مش متغطي، وسيب الأرقام اللي عليها خط واحد زي ما هي، وزوّد θ على الأرقام اللي عليها خطين (التقاطعات). كده بيطلع صفر جديد من غير ما تبوّظ الـ assignments الموجودة.`
  ],
  quiz: [
    [`صح (توصيل أغسطس 2023/24: 3 → B).`, `ده الـ Shortest route problem.`, `ده الـ Operations research.`, `ده الـ Pivot.`],
    [`صح. ساعتها بيبقى فيه n independent zeros.`, `الـ row reduction دايمًا بيعمل كده، بس ممكن الـ independent zeros لسه يبقوا أقل من n.`, `الـ θ هو أصغر رقم مش متغطي ودايمًا موجب لما بنستخدمه.`, `عدد الخطوط عمره ما يعدّي n.`],
    [`مفيش assignment one-to-one feasible بيدّي 19.`, `صح. 1→A (1)، 2→C (10)، 3→B (5)، 4→D (5).`, `مش optimal.`, `مش optimal.`],
    [`مستحيل: أرخص حاجة لـ J1 (40) وأرخص حاجة لـ J2 (10) الاتنين على P1.`, `مايتحققش لو كل عمود بياخد task واحدة.`, `صح. J1→P2 (60)، J2→P1 (10)، J3→P4 (20)، J4→P3 (10).`, `مش optimal.`],
    [`صح. أصغر رقم مش متغطي هو 1 عند (J3, P3).`, `الـ 2 موجود في J1 بس مش أصغر رقم مش متغطي.`, `كبير أوي.`, `الـ θ لازم يبقى أصغر رقم موجب مش متغطي.`],
    [`ده للأرقام اللي مش متغطية.`, `ده للأرقام اللي عليها خط واحد.`, `صح. أرقام التقاطع بتزيد بـ θ.`, `مش قاعدة.`],
    [`ممكن يقلل التكلفة أو يزوّد الربح.`, `صح (المحاضرة).`, `هو شكل خاص من الـ LP.`, `محتاج عدد متساوي (square matrix).`],
    [`مش feasible لو كل programmer بياخد job واحدة.`, `صح. Mohamed→J1 7، Ahmed→J4 11، Samy→J3 10، Eslam→J2 17.`, `مش optimal.`, `مش optimal.`],
    [`معكوسة.`, `صح (step 4 في المحاضرة).`, `ده ممكن يستخدم خطوط أكتر من اللازم.`, `الصفوف بتتستخدم برضه.`],
    [`مش feasible: A و C مايقدروش ياخدوا D هما الاتنين.`, `صح. A→E 400، B→F 350، C→D 200.`, `مش optimal.`, `مش optimal.`],
    [`صح. Row reduction، وبعدين column reduction.`, `دي الـ NWC في الـ transportation.`, `دي طريقة Vogel.`, `ده الـ simplex method.`],
    [`الطريقة دي بتعمل minimize.`, `صح (تحويل الكتب؛ والربح بعد كده بيتقري من الـ matrix الأصلية).`, `الضرب في رقم مش بيحوّل الـ minimization لـ maximization.`, `مش للـ assignment.`]
  ],
  extra: [
    [`مش feasible: الـ 2 والـ 1 جايين من صف 1 وصف 3، بس أرخص حاجة في صف 2 (3) في نفس عمود C بتاع صف 3.`, `مش optimal.`, `صح. 1 → B (2)، 2 → A (6)، 3 → C (1).`, `مش optimal.`],
    [`اطرح الـ MINIMUM بتاع الصف (44)، مش أول رقم.`, `ماحصلش reduction.`, `صح. كل رقم ناقص 44.`, `غلط في الحساب.`],
    [`الأرقام اللي مش متغطية هي اللي بتقل بـ θ.`, `صح. أرقام التقاطع بتزيد بـ θ.`, `الأرقام اللي عليها خط واحد بس هي اللي بتفضل زي ما هي.`, `مفيش قاعدة بتخليه 0.`],
    [`ده 5 + 6 (القطر)، مش الأحسن.`, `مش مجموع assignment صح.`, `مش مجموع assignment صح.`, `صح. 1 → B (8)، 2 → A (7). بالتحويل: 8 − الربح بيدّي (3, 0)، (1, 2)؛ وأقل regret = 0 + 1.`],
    [`صح. خطوط < n معناها إن الـ optimal assignment لسه مش ممكن.`, `فيه 3 independent zeros بس.`, `الـ matrix أصلًا square.`, `الصفوف فيها أصفار خلاص؛ مش هيغير حاجة.`],
    [`كده ممكن تمسح أحسن ماكينة.`, `كل ماكينة بتاخد job واحدة بالكتير.`, `صح. ده بيخلي الـ matrix square (قاعدة الكتب)؛ والماكينة اللي تاخد الـ dummy job بتفضل فاضية.`, `دي للـ transportation.`],
    [`الأرقام الـ reduced دي opportunity costs.`, `صح. اجمع التكاليف الأصلية للخانات اللي اخترتها.`, `دول جزء من التكلفة بس.`, `الـ θ خطوة تعديل.`],
    [`غلط في الحساب.`, `غلط في الحساب.`, `غلط في الحساب.`, `صح. 44 + 56 + 90 + 44 = 234.`],
    [`دي بتستخدم NWC أو LCM أو VAM.`, `دي بتستخدم dynamic programming.`, `دي بتستخدم CPM/PERT.`, `صح.`],
    [`صح. واحد لكل صف وواحد لكل عمود.`, `الـ m + n − 1 = 9 دي للـ BFS بتاع الـ transportation؛ الـ assignment محتاج n بالظبط.`, `ده كل الخانات.`, `مالهوش معنى.`]
  ]
};

AR.or.lectures["6"] = {
  notes: [
    { h: `التعريفات` },
    { h: `ليه مانقرّبش إجابة الـ LP وخلاص؟`, pts: [
      `تقريب الـ LP optimum ممكن يدّيك نقطة <b>infeasible</b> أو نقطة <b>مش optimal</b>. مثال (Sheet 2): الـ LP optimum هو (2.75, 1.25)؛ ولو قرّبته لـ (3, 1) هيكسر 10x1 + 6x2 ≤ 35 (36 > 35).`,
      `في مسألة MAX، الـ Z بتاع الـ LP relaxation هو <b>upper bound</b> لأحسن Z integer؛ وكل branch ممكن بس يقلله.`,
      `مسائل الـ Integer بتظهر لما الوحدات ماينفعش تتقسم: عدد الأيام اللي المصنع بيشتغلها (بيتدفع يوم كامل)، عدد الماكينات، الناس، العربيات.`
    ] },
    { h: `خطوات الـ Branch and bound (بالرسم)`, pts: [
      `<b>1.</b> حل الـ LP relaxation بالرسم (corner point table). لو الـ optimum طلع integer، خلاص وقف.`,
      `<b>2.</b> غير كده اعمل <b>branch</b> على variable فيه كسر (المحاضرة بتختار الـ variable اللي <b>الجزء العشري بتاعه أكبر</b>): لو x1 = 2.75، اعمل اتنين sub-problems بإضافة <b>x1 ≤ 2</b> و <b>x1 ≥ 3</b>. كده الشريط 2 < x1 < 3 بيتشال.`,
      `<b>3.</b> حل كل sub-problem بالرسم (كل constraint جديد عبارة عن خط رأسي أو أفقي).`,
      `<b>4.</b> الـ node بيبقى <b>fathomed</b> (نوقف الـ branching عنده) لما: الحل بتاعه يطلع integer (ويبقى الـ incumbent لو أحسن)، أو يطلع <b>infeasible</b>، أو الـ Z بتاعه مش أحسن من أحسن Z integer لقيناه لحد دلوقتي.`,
      `<b>5.</b> كمّل branching على الـ nodes اللي فيها كسور لحد ما مايفضلش ولا live node. وأحسن integer solution لقيتها هي الـ optimal.`,
      `ملحوظة "x ≥ y و x ≤ y ⇒ x = y": لو branch ضاف x1 ≥ 3 فوق x1 ≤ 3، يبقى x1 = 3 وده خط.`
    ] },
    { h: `Sheet 2 / Final 2021/22 Q4: Max Z = 40x1 + 30x2؛ 10x1 + 6x2 ≤ 35؛ x1 + x2 ≤ 4` },
    { h: `Sheet 1 / Final Aug 2022/23 Q4: Max Z = 3x1 + 4x2؛ x1 + 3x2 ≤ 13؛ 5x1 + 2x2 ≤ 20` },
    { h: `مسائل branch-and-bound محلولة زيادة` }
  ],
  cards: [
    `optimization problem الـ decision variables بتوعها integer.`,
    `الـ LP اللي بيطلع لما تشيل كل الـ integer أو الـ 0-1 constraints.`,
    `كل الـ variables لازم تبقى integers.`,
    `بعض الـ variables بس لازم تبقى integers.`,
    `كل الـ variables لازم تساوي 0 أو 1.`,
    `sub-problems فيها x1 ≤ 2 و x1 ≥ 3.`,
    `اللي الجزء العشري بتاعه أكبر.`,
    `لو الحل integer، أو infeasible، أو Z مش أحسن من الـ incumbent.`,
    `upper bound للـ integer optimum.`,
    `x1 = 2، x2 = 2، Z = 140.`,
    `x1 = 1، x2 = 4، Z = 19.`,
    `x1 = 4، x2 = 2، Z = 410.`,
    `x1 = 1، x2 = 6، Z = 200.`,
    `X = 1، Y = 6، Z = 1000.`,
    `ممكن يطلع infeasible أو مش optimal.`
  ],
  qa: [
    `الـ Pure: كل decision variable لازم يبقى integer. الـ Mixed: بعض الـ variables بس لازم تبقى integers، والباقي ممكن يبقى continuous. الـ Binary (0-1): كل variable لازم يساوي 0 أو 1 (قرارات أيوه/لأ).`,
    `الـ Integer programming هو optimization problem الـ decision variables بتوعه integer. والـ LP relaxation هو الـ linear program اللي بيطلع لما تشيل كل الـ integer أو الـ 0-1 constraints من على الـ variables؛ والـ optimum بتاعه بيحدّ الـ integer optimum (upper bound في الـ max).`,
    `حل الـ LP relaxation. لو فيه variable طالع بكسر (مثلًا x1 = 2.75)، اعمل branch لاتنين sub-problems فيهم x1 ≤ 2 و x1 ≥ 3. حل كل واحد؛ ووقّف أي branch لما يطلع infeasible، أو يدّي integer solution، أو الـ Z بتاعه مايقدرش يغلب أحسن integer solution. كمّل لحد ما مايفضلش branches؛ وأحسن integer solution هي الـ optimal.`,
    `الـ LP: (2.75, 1.25)، Z = 147.5. x1 ≤ 2: (2,2)، Z = 140 (integer). x1 ≥ 3: (3, 0.83)، Z = 145؛ وبعدين x2 ≥ 1 بيطلع infeasible و x2 ≤ 0 بيدّي (3.5,0)، Z = 140 ومايقدرش يحسّن (وبعدين (3,0) = 120). الـ Optimum هو x1 = 2، x2 = 2، Z = 140.`,
    `الـ LP: (2.615, 3.462)، Z = 21.69. x1 ≤ 2: (2, 3.667)، Z = 20.67 → x2 ≤ 3: (2,3)، Z = 18؛ x2 ≥ 4: (1,4)، Z = 19. x1 ≥ 3: (3, 2.5)، Z = 19 → x2 ≤ 2: (3.2, 2)، Z = 17.6؛ x2 ≥ 3 infeasible. الـ Optimum هو x1 = 1، x2 = 4، Z = 19.`
  ],
  quiz: [
    [`صح.`, `الـ Pure بيطلب كل الـ variables تبقى integers.`, `الـ Binary بيطلب كل الـ variables تبقى 0 أو 1.`, `الـ relaxation بيشيل الـ integer constraints خالص.`],
    [`variables الـ LP بتبقى continuous.`, `صح.`, `الـ relaxation بيشيل شرط الـ integer.`, `الـ DP بتاع الـ multistage decisions.`],
    [`صح. تعريف 22 في Revision 1. (ورقة طالب متصححة معلّمها ✗، وده غلط.)`, `ده التعريف بالظبط.`],
    [`ده تعريف الـ integer programming problem.`, `صح. الـ relaxation بيشيل الـ integer constraints.`],
    [`ده وصف الـ mixed integer model.`, `صح. الـ Pure = كل الـ variables integer؛ و"بعضها" = mixed.`],
    [`صح (توصيل 2023/24: 4 → C).`, `دي الـ Infeasible solutions.`, `ده الـ Successor activity.`, `ده الـ Predecessor.`],
    [`صح (توصيل 2023/24: 3 → B).`, `دي الـ Feasible region.`, `دي الـ Minimum cost method.`, `ده الـ Project.`],
    [`feasible بس (2,2) بيدّي أكتر. (نموذج إجابة طالب وقف هنا، وده غلط.)`, `صح. الـ node x1 ≤ 2 بيدّي (2,2) = 140، والـ branch التاني مايقدرش يعدّي 140 بأرقام integer.`, `ده الـ LP relaxation، مش integer.`, `Infeasible: 10(3) + 6(1) = 36 > 35.`],
    [`ده الـ LP relaxation (الـ x1 مش integer).`, `feasible بس أسوأ من 410.`, `صح. الـ Branch x1 ≤ 4 بيدّي (4,2)، Z = 410.`, `feasible بس أسوأ.`],
    [`صح. الشريط اللي فيه كسور 2 < x1 < 3 بيتشال.`, `دول بيسيبوا النقطة اللي فيها كسر.`, `الـ Branches بتبقى inequalities.`, `الـ variable اللي فيه كسر هنا هو x1.`],
    [`صح. التلاتة دول بيقفلوا الـ branch.`, `ساعتها ممكن لسه يبقى فيه integer point أحسن؛ كمّل branching.`, `ساعتها بتعمل branch عليه.`, `الـ nodes اللي integer أو اللي dominated بتبقى fathomed برضه.`],
    [`ده الـ LP relaxation (الـ Y مش integer).`, `صح. الـ Branch Y ≤ 6 بيدّي (1,6)؛ و Y ≥ 7 بيطلع infeasible (15 + 210 > 200).`, `feasible بس أسوأ.`, `Infeasible.`]
  ],
  extra: [
    [`ده الـ LP relaxation، مش integer.`, `feasible بس مش الأحسن.`, `صح. 10(3) + 6(2) = 42 ≤ 45 و 3 + 2 = 5 ≤ 5.`, `Infeasible: 40 + 6 = 46 > 45.`],
    [`النقطة اللي فيها كسر لازم تتشال.`, `ده بيشيل غلط الأرقام الـ integer 3 و 4.`, `صح.`, `اعمل branch على الـ variable اللي فيه كسر، اللي هو x2.`],
    [`أحسن قيمة ممكنة ليه 39 ومش هتغلب 40.`, `صح. الـ bound بتاعه مش أحسن من الـ incumbent.`, `ده فيه كسر وكمان أسوأ.`, `مش محتاج.`],
    [`صح.`, `ده general integer variable.`, `ده continuous bounded variable.`, `الـ 0 مسموح كمان.`],
    [`مش صح بشكل عام.`, `الـ (3,1) كانت هتدّي 150، أعلى؛ المشكلة في الـ feasibility.`, `مالوش علاقة.`, `صح. التقريب ممكن يطلّعك برا الـ feasible region؛ والـ optimum الحقيقي (2, 2)، Z = 140.`],
    [`هو upper bound.`, `صح. إضافة شروط الـ integer ممكن بس تسيب Z زي ما هو أو تقلله.`, `بس لما حل الـ LP يطلع integer بالصدفة.`, `هو بيحدّه.`],
    [`أصغر نقطة فيه (3, 1) بتكسر الـ constraint أصلًا.`, `المنطقة bounded.`, `صح. 10(3) + 6(1) = 36 > 35.`, `الـ (3, 0.83) ده الـ parent node، مش ده.`],
    [`صح. 6 + 2 = 8 ≤ 9 و 9 + 1 = 10 ≤ 10. (الـ LP relaxation بيدّي (2.75, 1.75)، Z = 11.75.)`, `feasible بس أسوأ.`, `Infeasible: 6 + 4 = 10 > 9.`, `مش integer.`],
    [`صح. بعض الـ variables بس لازم تبقى integers.`, `ده pure IP.`, `ده binary IP.`, `ده LP عادي.`],
    [`Infeasible: 2 + 12 = 14 > 13.`, `الـ (1, 4) بتحقق كل حاجة.`, `ده الـ parent node x1 ≤ 2.`, `صح. على x1 + 3x2 = 13 مع x2 = 4، يبقى x1 = 1؛ وده الـ optimum.`]
  ]
};

AR.or.lectures["7"] = {
  notes: [
    { h: `مصطلحات الـ Project (تعريفات Revision 1)` },
    { h: `رسم الـ CPM network (قواعد السكشن)`, pts: [
      `المطلوب عادةً: ارسم الـ network؛ حدد الـ critical path ووقت الانتهاء؛ الـ earliest والـ latest times؛ الـ total floats؛ والـ activities الـ critical والـ non-critical.`,
      `الـ activities اللي مالهاش predecessor بتطلع من <b>start node واحدة</b>؛ والـ activities اللي مش predecessor لحد بتدخل على <b>end node واحدة</b>.`,
      `الـ activities اللي ليها نفس الـ predecessors بتبدأ من نفس الـ node (مثلًا D و E و F كلهم بعد C، فبيطلعوا من الـ end node بتاعة C).`,
      `مينفعش اتنين activities يبقى ليهم نفس الـ start node ونفس الـ end node: افصل بينهم بـ node زيادة و <b>dummy</b>.`,
      `استخدم dummy لما activity تعتمد على جزء بس من مجموعة (مثلًا F بعد C بس، لكن D بعد A و C): وصّل بسهم dummy متقطع.`
    ] },
    { h: `معادلات الأوقات` },
    { h: `مثال محلول (Final 2019/20، سكشن): A 15؛ B 17 (A)؛ C 21 (A)؛ D 19 (B)؛ E 22 (B)؛ F 18 (C, D)؛ G 15 (E, F)` },
    { h: `نتيجة المثال` },
    { h: `مثال السكشن: A 5؛ B 7 (A)؛ C 10 (A)؛ D 2 (B)؛ E 8 (C)؛ F 10 (C)؛ G 5 (D, E, F)؛ H 3 (G)` },
    { h: `Final 2024/25 (بالأيام): A 6؛ G 2؛ J 13؛ B 4 (A)؛ C 7 (B)؛ D 2 (A)؛ E 4 (D)؛ F 10 (E)؛ H 10 (G)؛ I 6 (J, H)؛ K 9 (A)؛ L 3 (C, K)؛ M 5 (I, L)` },
    { h: `نتيجة Final 2024/25` },
    { h: `Final 2023/24 (سنة تالتة): A 3؛ B 3 (A)؛ C 3 (A)؛ D 5 (C)؛ E 6 (B, C)؛ F 9 (D, E)؛ G 5 (E)؛ H 3 (G)؛ I 5 (G, F)؛ J 6 (I, H)؛ K 4 (J)` },
    { h: `Final 2023/24 (سنة تانية): A 5؛ B 5؛ C 2 (B)؛ D 2 (A, C)؛ E 3 (A, C)؛ F 1 (A, C)؛ G 2 (B)؛ H 7 (B)؛ I 13 (E)؛ J 6 (E, D)؛ K 4 (F, G, H)؛ L 5 (H)؛ M 5 (J, K, L)` }
  ],
  cards: [
    `مجموعة activities مرتبطة ببعض بتتنفذ بترتيب معين قبل ما الشغلانة كلها تخلص.`,
    `شغلانة محتاجة وقت و resources عشان تخلص.`,
    `لازم تخلص مباشرةً قبل ما activity تانية تبدأ.`,
    `ماينفعش تبدأ غير لما activity تانية من الـ activities تخلص.`,
    `مالهاش predecessor.`,
    `مابتستهلكش أي resources؛ بس بتوضح الـ technological dependence.`,
    `تسلسل متصل من nodes و activities بالتبادل، من الـ start event لحد الـ end event.`,
    `تحديد الوقت اللازم لإنهاء الـ project، والـ activities المهمة اللي المدير لازم يركز عليها.`,
    `ماينفعش تتأخر؛ الـ total float = 0.`,
    `التأخير في انتهاء activity اللي مابيأثرش على انتهاء الـ project (LS − ES).`,
    `التأخير اللي مابيأثرش على الـ earliest start بتاع الـ immediate successors.`,
    `الوقت اللازم لإنهاء كل الـ activities من الـ start للـ end event = أطول path.`,
    `ES + المدة.`,
    `LF − المدة.`,
    `أكبر EF من الـ activities الداخلة.`,
    `أصغر LS من الـ activities الخارجة.`,
    `تقدير واحد؛ deterministic.`,
    `الـ Critical path هو A-B-D-F-G، 84 شهر.`
  ],
  qa: [
    `الـ predecessor activity لازم تخلص مباشرةً قبل ما activity تانية تبدأ. (والعكس بتاعها، الـ successor activity، ماينفعش تبدأ غير لما activity تانية تخلص.)`,
    `الـ path في الـ network هو تسلسل متصل من nodes و activities بالتبادل، بيبدأ من الـ start event وبيقف عند الـ end event بتاع الـ network.`,
    `الـ Total float: الوقت اللي ممكن انتهاء الـ activity يتأخره من غير ما يأثر على انتهاء الـ project، TF = LS − ES = LF − EF. الـ Free float: الوقت اللي ممكن انتهاء الـ activity يتأخره من غير ما يأثر على الـ earliest start time بتاع الـ immediate successors، FF = min ES(successors) − EF.`,
    `start node واحدة (الـ activities اللي مالهاش predecessors بتطلع منها) و end node واحدة (الـ activities اللي مش قبل أي حاجة بتدخل عليها). كل activity سهم بين اتنين nodes؛ والـ activities اللي ليها نفس الـ predecessors بتطلع من نفس الـ node. مينفعش اتنين activities يشتركوا في الـ start والـ end nodes مع بعض: حط node و dummy. واستخدم الـ dummies (مدتها صفر ومن غير resources) عشان توضح الاعتماد على جزء من مجموعة.`,
    `الـ Forward pass: A 0–15، B 15–32، C 15–36، D 32–51، E 32–54، F 51–69، G 69–84. الـ Backward: G 69–84، F 51–69، E 47–69، D 32–51، C 30–51، B 15–32، A 0–15. الـ Floats: C 15، E 15، والباقي 0. الـ Critical path هو A-B-D-F-G = 84.`,
    `الـ CPM بيستخدم تقدير وقت واحد (deterministic) لكل activity، من غير ما يحسب حساب لعدم التأكد. الـ PERT بيستخدم تلات تقديرات (optimistic، most likely، pessimistic) وبيتعامل مع الوقت على إنه probabilistic، فتقدر تحسب احتمال إنك تخلص قبل تاريخ معين.`
  ],
  quiz: [
    [`الـ successor ماينفعش تبدأ غير لما activity تانية تخلص.`, `صح.`, `الـ predecessor لازم تخلص مباشرةً قبل activity تانية.`, `الـ critical activity ماينفعش تتأخر.`],
    [`الـ Free float بيحمي الـ earliest start بتاع الـ immediate successors.`, `ده الوقت اللازم لإنهاء كل الـ activities.`, `صح.`, `الـ dummy سهم dependency وقته صفر.`],
    [`صح. تعريف الـ total float.`, `ده التعريف.`],
    [`الجملة دي تعريف الـ successor activity.`, `صح. الـ predecessor لازم تخلص مباشرةً قبل ما activity تانية تبدأ.`],
    [`صح. تعريف الـ free float.`, `ده التعريف بالظبط.`],
    [`الجملة دي تعريف الـ project.`, `صح. ده تعريف الـ <b>project</b>.`],
    [`ده تعريف الـ project.`, `صح. الـ CPM هدفه تحديد وقت الـ project والـ activities المهمة.`],
    [`ده تعريف الـ dummy activity.`, `صح. الـ start activity مالهاش predecessor؛ والجملة دي تعريف الـ dummy.`],
    [`ده تعريف الـ predecessor activity.`, `صح. الـ dummy مابتستهلكش resources وبس بتوضح الـ dependence.`],
    [`صح. تعريف الـ successor activity.`, `ده التعريف.`],
    [`صح. تعريف الـ path.`, `ده التعريف.`],
    [`صح. تعريف 31 في Revision 1.`, `ده التعريف.`],
    [`الـ critical path هو أطول path.`, `صح. الـ critical path هو <b>أطول</b> path (هو اللي بيحدد وقت الانتهاء).`],
    [`ده وصف الـ free float.`, `صح. التأخير اللي مابيأثرش على بداية الـ successors = free float؛ والـ total float بيحمي انتهاء الـ project.`],
    [`صح. CPM = Critical Path Method.`, `ده المعنى المعروف.`],
    [`صح. A-B-C-L-M = 25 وهو أطول path؛ والخمسة الـ float بتاعهم صفر.`, `كلهم TF = 0.`],
    [`صح. 6 + 4 + 7 + 3 + 5 = 25.`, `أطول path = 25.`],
    [`كلهم بيـ<i>بدأوا</i> عند 0 (الـ ES)، بس الـ LFs بتاعتهم مختلفة.`, `صح. LF(A) = 6، LF(G) = 4، LF(J) = 14.`],
    [`صح. ES(E) = EF(D) = 6 + 2 = 8.`, `هو 8.`],
    [`الـ 9 دي مدة K (والـ EF هيبقى 15).`, `صح. LF(K) = LS(L) = 17.`],
    [`الـ 20 دي الـ ES/LS بتاع M.`, `صح. M آخر activity: LF = 25.`],
    [`الـ 11 ده EF بتاع D، بس F مستنية E كمان.`, `صح. ES(F) = max(EF D = 11، EF E = 12) = 12.`],
    [`الـ C الـ float بتاعها صفر.`, `صح. الـ C critical (A-C-E-F-I-J-K = 36)؛ والـ non-critical هم D و G و H.`],
    [`صح. 3 + 3 + 6 + 9 + 5 + 6 + 4 = 36.`, `هو 36.`],
    [`أطول path هو 23 بس.`, `صح. B-C-E-I = 5 + 2 + 3 + 13 = 23.`],
    [`الـ H الـ float بتاعها 1 (B-H-L-M = 22).`, `صح. الـ Critical هم B و C و E و I بس.`],
    [`الـ D والـ E مستنيين A و C.`, `صح. ES(C) = 5، ES(D) = ES(E) = 7.`],
    [`صح. الـ B على الـ critical path اللي هو B-C-E-I.`, `الـ B critical.`],
    [`صح (توصيل 2023/24: 4 → E).`, `ده الـ Total float.`, `دي الـ Feasible region.`, `ده الـ Mixed IP.`]
  ],
  extra: [
    [`ده الـ path A-C-E بس.`, `صح. أطول path هو B-D-E = 4 + 5 + 3 = 12.`, `ده A-D-E.`, `ده مجموع كل المدد، مش path.`],
    [`الـ A مش على الـ critical path اللي هو B-D-E.`, `ده الـ float بتاع C.`, `صح. LF(A) = min(LS C = 7، LS D = 4) = 4؛ EF(A) = 3؛ TF = 1.`, `الـ 3 دي مدة A.`],
    [`صح. ES = 3، EF = 5، LF = LS(E) = 9: TF = 9 − 5 = 4.`, `الـ C مش critical.`, `الـ 2 دي مدتها.`, `الـ 7 ده LS(C).`],
    [`لازم تستنى الـ predecessors <i>الاتنين</i>.`, `الأوقات مابتتجمعش.`, `مفيش متوسطات.`, `صح. الـ ES = أكبر EF للـ predecessors.`],
    [`المدة مالهاش علاقة بالـ dummies.`, `صح (قواعد السكشن).`, `وجود اتنين critical paths مش محتاج dummy.`, `دي start activity.`],
    [`الـ E أصلًا مش هتبدأ قبل 9.`, `ده الـ total float بتاع A.`, `صح. FF = ES(E) − EF(C) = 9 − 5 = 4.`, `الـ 2 دي مدة C.`],
    [`صح.`, `ده الـ EF.`, `ده بيخلط أوقات الـ forward والـ backward.`, `ده سالب الـ total float.`],
    [`الـ A-C-E = 8 بس.`, `الـ A الـ float بتاعها 1.`, `الـ A و الـ C ليهم floats موجبة.`, `صح. الـ float صفر على أطول path اللي هو B-D-E.`],
    [`صح (قاعدة السكشن: end node واحدة بس).`, `كل الـ activities اللي بتبدأ بتطلع من نفس الـ node.`, `لازم start و end nodes واحدة بس.`, `لأ.`],
    [`ده الـ critical path اللي هو B-D-E.`, `غلط في الحساب.`, `صح. 3 + 2 + 3 = 8.`, `A و C بس.`]
  ]
};

AR.or.lectures["8"] = {
  notes: [
    { h: `فكرة الـ PERT والتلات تقديرات للوقت`, pts: [
      `<b>CPM</b>: الوقت <b>deterministic</b>، تقدير واحد لكل activity. <b>PERT</b>: الوقت <b>probabilistic</b>، وفيه تلات تقديرات ممكنة للـ activities اللي بتربط بين اتنين events.`,
      `<b>Optimistic time (O، t<sub>o</sub>)</b>: التقدير في <b>أحسن</b> الظروف (كل حاجة ماشية تمام).`,
      `<b>Most likely time (M، t<sub>m</sub>)</b>: التقدير في الظروف <b>العادية (normal)</b>.`,
      `<b>Pessimistic time (P، t<sub>p</sub>)</b>: التقدير في <b>أسوأ</b> الظروف.`,
      `الأسئلة المعتادة: ارسم الـ network؛ الـ expected duration والـ variance لكل activity؛ الـ critical path ووقت انتهاء الـ project؛ واحتمال إن الـ project يخلص في تاريخ معين أو قبله.`
    ] },
    { h: `معادلات الـ PERT` },
    { h: `مثال المحاضرة: الـ expected times والـ variances` },
    { h: `مثال المحاضرة: الـ critical path والاحتمال (في 22 أسبوع أو قبلها)` },
    { h: `Final 2021/22 والـ Revision: مشروع بناء، سنتين (104 أسابيع)` },
    { h: `إجابة الـ 104 أسبوع` },
    { h: `إجابات PERT تانية من الامتحانات (متراجعة)` }
  ],
  cards: [
    `Project Evaluation and Review Technique.`,
    `التقدير في أحسن الظروف.`,
    `التقدير في الظروف العادية.`,
    `التقدير في أسوأ الظروف.`,
    `(to + 4tm + tp) / 6.`,
    `((tp − to) / 6)².`,
    `مجموع الـ variances بتاعة الـ critical activities بس.`,
    `مجموع الـ expected times على الـ critical path.`,
    `(X − μ) / σ.`,
    `P(T ≤ X).`,
    `0.5 + المساحة من الجدول.`,
    `0.5 − المساحة من الجدول.`,
    `Probabilistic (تلات تقديرات).`,
    `C-F-H-J، μ = 17، σ = 2.19، P(≤ 22) = 0.9887.`,
    `μ = 99.83، σ = 9.48، z = 0.44، P = 0.67.`
  ],
  qa: [
    `الـ PERT (Project Evaluation and Review Technique) بيستخدم تلات تقديرات للوقت لكل activity بتربط بين اتنين events، فوقت الـ activity بيبقى probabilistic: الـ optimistic time (أحسن الظروف)، والـ most likely time (الظروف العادية)، والـ pessimistic time (أسوأ الظروف).`,
    `te = (to + 4tm + tp)/6؛ σ² = ((tp − to)/6)². الـ μ بتاع الـ project = Σ te على الـ critical path؛ والـ σ² بتاع الـ project = Σ variances الـ critical activities؛ z = (X − μ)/σ؛ P(T ≤ X) = 0.5 ± مساحة الجدول (زائد لو z > 0، ناقص لو z < 0).`,
    `الـ Critical path هو A-C-E-G-H-J و μ = 99.83 أسبوع. σ² = 12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86، σ = 9.48. z = (104 − 99.83)/9.48 = 0.44. P = 0.5 + 0.17 = 0.67.`,
    `مدة الـ project = طول الـ critical path، فالعشوائية بتاعتها جاية من الـ activities اللي على الـ path ده. ولو افترضنا إن أوقات الـ activities مستقلة، يبقى variance المجموع = مجموع الـ variances الـ critical.`,
    `te/σ²: A 4/1، B 7/4، C 11/16، D 9/1، E 14/16، F 6/4. الـ Paths: A-C-D-F = 30، A-C-E = 29، B-D-F = 22، B-E = 21. الـ Critical هو A-C-D-F، μ = 30، σ² = 22، σ = 4.69. z = 4/4.69 = 0.85، P = 0.5 + 0.3023 = 0.80.`
  ],
  quiz: [
    [`"كل حاجة ماشية تمام" ده وصف الـ optimistic time.`, `صح. الـ Most likely = الظروف العادية؛ والظروف المثالية = optimistic.`],
    [`صح. (1 + 16 + 7)/6 = 4؛ ((7 − 1)/6)² = 1.`, `القيمتين صح.`],
    [`الـ variance غلط.`, `صح. te = (3 + 24 + 15)/6 = 7، بس σ² = (12/6)² = 4.`],
    [`القيم متبدلة/غلط.`, `صح. te = (3 + 36 + 27)/6 = 11، σ² = (24/6)² = 16.`],
    [`صح. (6 + 48 + 30)/6 = 14؛ (24/6)² = 16.`, `القيمتين صح.`],
    [`الـ 22 ده الـ VARIANCE. نموذج الطلبة معلّمها True، بس ده خلط بين الـ variance والـ standard deviation.`, `صح. الـ Project variance = 1 + 16 + 1 + 4 = 22، فـ σ = √22 = 4.69.`],
    [`الـ 0.85 دي قيمة z، مش الاحتمال.`, `صح. z = (34 − 30)/4.69 = 0.85 → P = 0.5 + 0.3023 = 0.80.`],
    [`الـ te = 7 مش 7.5.`, `صح. te = (4 + 28 + 10)/6 = 7، σ² = (6/6)² = 1.`],
    [`صح. (6 + 40 + 20)/6 = 11؛ (14/6)² = 5.44.`, `القيمتين صح.`],
    [`الـ Critical path هو A-B-D-E = 5 + 7 + 11 + 6 = 29.`, `صح. وقت الانتهاء = 29.`],
    [`الـ C مش critical.`, `صح. A-C-E = 20 قصاد 29، فالـ C ليها float = 9.`],
    [`الـ 0.4893 دي مساحة الجدول بس.`, `صح. z = (36 − 29)/√9.22 = 2.30 → P = 0.5 + 0.4893 = 0.9893.`],
    [`الـ te = 16.5 مش 1.5.`, `صح. (7 + 64 + 28)/6 = 16.5؛ σ² = (21/6)² = 12.25.`],
    [`الـ G ناقصة: الـ E بتودّي لـ G، والـ H محتاجة G.`, `صح. الـ critical path هو A-C-E-G-H-J (99.83).`],
    [`اجمع الـ variances الـ critical.`, `صح. 12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86.`],
    [`الـ 0.44 دي z.`, `صح. z = 0.44 → P = 0.5 + 0.17 = 0.67.`],
    [`معادلة z هي (X − μ)/σ، مش (μ − X)/σ.`, `دي مساحة الجدول بس.`, `صح. z = (104 − 99.83)/9.48 = +0.44 → 0.5 + 0.17.`, `دي z نفسها.`],
    [`صح. (2 + 16 + 6)/6 = 4؛ (4/6)² = 0.44.`, `القيمتين صح.`],
    [`الـ variance غلط.`, `صح. te = 2، بس σ² = (2/6)² = 0.11.`],
    [`الـ te = 3.`, `صح. te = (2 + 12 + 4)/6 = 3؛ σ² = 0.11.`],
    [`صح. 3 + 4 + 5 + 3 + 2 + 3 = 20 (والـ A-B-E-G-I-J و A-C-F-H-I-J كل واحد فيهم 19).`, `ده أطول path.`],
    [`الـ 22 دي التاريخ المستهدف في الـ statement اللي بعدها.`, `صح. μ = 20 أسبوع.`],
    [`الاحتمال عمره ما يعدّي 1.`, `صح. σ² = 1.67، σ = 1.29، z = 2/1.29 = 1.55 → P = 0.5 + 0.4394 = 0.9394.`],
    [`الـ D مش critical.`, `صح. الـ Critical path هو A-C-F-H = 6 + 12 + 11 + 4 = 33؛ والـ D ليها float = 11.`],
    [`صح. A-C-F-H = 33 (B-E-I = 29، A-C-G-H = 29).`, `هو 33.`],
    [`الـ variance غلط.`, `صح. te = (8 + 64 + 18)/6 = 15، σ² = (10/6)² = 2.78.`],
    [`صح. σ² = 1 + 4 + 1 + 0.44 = 6.44، σ = 2.54.`, `هو 2.54.`],
    [`استخدم الجدول مع z = −0.39.`, `صح. z = (32 − 33)/2.54 = −0.39 → P = 0.5 − 0.1517 = 0.3483.`],
    [`دي مساحة الجدول بس لـ z = 2.28.`, `صح. z = 5/2.19 = 2.28 → 0.5 + 0.4887.`, `ده P(T > 22).`, `دي z.`]
  ],
  extra: [
    [`ده المتوسط العادي (2 + 5 + 14)/3.`, `صح. (2 + 4×5 + 14)/6 = 36/6 = 6.`, `ده الـ most likely بس.`, `غلط في الحساب.`],
    [`ده الـ standard deviation (12/6).`, `ده tp − to.`, `غلط في الحساب.`, `صح. ((14 − 2)/6)² = 2² = 4.`],
    [`صح. z = (23 − 20)/2.`, `استخدم (X − μ)/σ، مش (μ − X)/σ.`, `اقسم على σ.`, `اقسم على σ = 2، مش على σ² = 4.`],
    [`دي المساحة بين 0 و z بس.`, `ده P(T > 23).`, `صح. 0.5 + 0.4332.`, `دي z.`],
    [`ده لـ z = +1.`, `صح. z = (26 − 30)/4 = −1 → 0.5 − 0.3413.`, `مساحة الجدول بس.`, `دي z.`],
    [`صح. σ² = 5.44، σ = √5.44 = 2.33.`, `ده الـ variance.`, `مجموع الـ standard deviations مش بيتستخدم.`, `غلط في الحساب.`],
    [`ده لـ "in / on / before".`, `في الـ normal variable الـ continuous ده = 0.`, `بس لو 35 = μ.`, `صح (قاعدة ملخص الطلبة).`],
    [`ده المتوسط العادي.`, `بيتجاهل الـ pessimistic estimate.`, `صح. (4 + 16 + 10)/6 = 5.`, `غلط في الحساب.`],
    [`صح. ((7 − 1)/6)² = 1.`, `ده tp − to.`, `ده الـ expected time.`, `غلط في الحساب.`],
    [`مش صفر؛ نص منحنى الـ normal تحت μ.`, `صح. z = 0، فـ P = 0.5.`, `الـ project ممكن ياخد وقت أطول.`, `ده لـ z = 1.`]
  ]
};

AR.or.lectures["9"] = {
  notes: [
    { h: `التعريفات`, pts: [
      `الـ <b>Dynamic programming</b> هو mathematical technique بيتعامل مع <b>الـ optimization للـ multistage decision problems</b>. المسألة الكبيرة بتتقسم لـ <b>stages</b>؛ وكل stage بتتحل باستخدام الـ optimal results بتاعة الـ stage اللي بعدها.`,
      `الـ <b>Shortest route problem</b>: المعيار بتاعها إنك تلاقي <b>أقصر مسافة بين اتنين nodes بأقل تكلفة</b>.`,
      `الـ <b>Backward approach</b>: ابدأ من آخر stage (الـ nodes اللي جنب الـ destination) وارجع لورا لحد الـ source؛ وعند كل node احتفظ بس بـ <b>أقل</b> مسافة للـ destination.`,
      `الـ Recursion: d(node, T) = min على كل الـ arcs (node → next) لـ [ length(node → next) + d(next, T) ]. سجّل الـ next node اللي بيدّي الـ minimum، وبعدين اقرا الـ path من الأول للآخر.`,
      `اختصار معيد: اكتب كل الـ paths وخد أقصرهم؛ بس الامتحان بيطلب الشغل الـ backward stage بـ stage، فلازم توضح الـ stages.`
    ] },
    { h: `Final 2021/22 و Sheet 2: M1 → M7` },
    { h: `Final 2019/20: S → T` },
    { h: `Finals 2023/24 (الورقتين): node 1 → node 10` },
    { h: `Final 2025/26: J1 → J8` },
    { h: `Revision MCQ 21: N1 → N6` }
  ],
  cards: [
    `mathematical technique للـ optimization بتاع الـ multistage decision problems.`,
    `إنك تلاقي أقصر مسافة بين اتنين nodes بأقل تكلفة.`,
    `ابدأ من الـ stage اللي جنب الـ destination وارجع لورا لحد الـ source.`,
    `d(i) = min على j لـ [ c(i, j) + d(j) ].`,
    `مجموعة nodes في نفس الخطوة من الـ network.`,
    `امشي ورا الـ arcs اللي سجلتها (اللي بتدّي الـ minimum) من الـ source لقدام.`,
    `M1-M2-M4-M6-M7 = 25.`,
    `S-A-E-T = 9.`,
    `1-2-5-8-10 = 15.`,
    `J1-J2-J6-J8 = 16.`,
    `N1-N3-N5-N6 = 7.`,
    `بيعيد استخدام أحسن مسافة لكل node، فالشغل بيزيد مع عدد الـ arcs مش مع عدد الـ paths.`
  ],
  qa: [
    `الـ Dynamic programming هو mathematical technique بيتعامل مع الـ optimization للـ multistage decision problems: المسألة بتتقسم لـ stages وبتتحل stage بـ stage، وكل stage بتستخدم الـ optimal results بتاعة اللي بعدها.`,
    `قسّم الـ network لـ stages. ابدأ بالـ nodes اللي قبل الـ destination على طول: المسافة بتاعتها هي طول الـ arc. ارجع stage لورا: لكل node، d(node) = min على الـ arcs بتاعتها لـ (طول الـ arc + d(next node))، وسجّل الـ arc اللي استخدمته. كمّل لحد الـ source؛ الـ d(source) هي أقصر مسافة، والـ arcs اللي سجلتها بتدّيك الـ path.`,
    `Stage 4: d(M5) = 6، d(M6) = 8. Stage 3: d(M3) = 11 + 6 = 17؛ d(M4) = min(6 + 6, 3 + 8) = 11. Stage 2: d(M2) = min(7 + 17, 9 + 11) = 20. Stage 1: d(M1) = 5 + 20 = 25. الـ Path هو M1-M2-M4-M6-M7 = 25.`,
    `Stage 3: d(D) = 8، d(E) = 2. Stage 2: d(A) = min(3 + 8, 6 + 2) = 8؛ d(B) = min(4 + 8, 10 + 2) = 12؛ d(C) = min(10, 3 + 2) = 5. Stage 1: d(S) = min(1 + 8, 2 + 12, 7 + 5) = 9. الـ Path هو S-A-E-T = 9.`,
    `المعيار بتاع الـ shortest route problem إنك تلاقي أقصر مسافة بين اتنين nodes بأقل تكلفة (مثلًا بين مدينتين في شبكة طرق).`
  ],
  quiz: [
    [`صح. تعريف 20 في Revision 1.`, `ده التعريف.`],
    [`صح (توصيل أغسطس 2023/24: 2 → C).`, `ده الـ Assignment problem.`, `ده الـ Non-negativity.`, `ده الـ Pivot.`],
    [`ده الـ transportation problem.`, `صح. تعريف 38 في Revision 1.`, `ده الـ assignment problem.`, `ده الـ PERT.`],
    [`الطول 4 + 3 + 2 = 9.`, `الطول 4 + 2 + 2 = 8.`, `صح. الطول 2 + 3 + 2 = 7، وده الأقل.`, `اختيار C هو الأقصر.`],
    [`صح. M1-M2-M4-M6-M7 = 5 + 9 + 3 + 8.`, `ده M1-M2-M4-M5-M7.`, `ده M1-M2-M3-M5-M7.`, `الـ 20 دي d(M2, M7)، مش من M1.`],
    [`مش الأقل.`, `مش الأقل.`, `صح. 1 + 6 + 2 = 9.`, `1 + 3 + 8 = 12.`],
    [`صح. J1-J2-J6-J8 = 4 + 8 + 4.`, `ده J1-J3-J6-J8.`, `ده J1-J2-J5-J8.`, `ده J1-J4-J7-J8.`],
    [`صغيرة أوي: مفيش path طوله 13.`, `صح. 1-2-5-8-10 = 4 + 3 + 6 + 2.`, `مش الأقل.`, `ده الطريق اللي بيعدّي على node 3.`],
    [`ده الـ forward approach.`, `صح. الـ Backward بيبدأ من جنب الـ destination.`, `طول الـ arc مش هو اللي بيحدد الترتيب.`, `الـ Stages بتتحل بالترتيب.`],
    [`ده الاختيار الأول بس (6 + 6).`, `صح. min{6 + 6, 3 + 8} = 11.`, `أطوال الـ arcs لوحدها بتتجاهل المسافات الباقية.`, `مش minimum.`],
    [`جملة صح.`, `جملة صح.`, `الاختيار الصح (الجملة الغلط): توزيع الـ jobs بيستخدم الـ Hungarian method.`, `جملة صح.`],
    [`الجملة دي تعريف الـ dynamic programming.`, `صح. ده تعريف الـ dynamic programming، مش الـ simplex.`]
  ],
  extra: [
    [`مش الأقل.`, `مش الأقل.`, `صح. d(C) = 6، d(D) = 2؛ d(A) = 9، d(B) = min(7, 5) = 5؛ d(S) = min(2 + 9, 5 + 5) = 10.`, `مش الأقل.`],
    [`صح. min{4 + 6, 7 + 2} = 9 (عن طريق D).`, `ده عن طريق C.`, `ده d(S) عن طريق A.`, `ده d(D).`],
    [`ده الاتجاه الـ forward.`, `صح. ابدأ بالـ nodes اللي جنب الـ destination.`, `الـ A بعيدة stage كمان لورا.`, `الـ DP بيتجنب إنك تعدّ كل الـ paths.`],
    [`الـ optimum مابيعتمدش على الاتجاه.`, `الاتجاهين صح.`, `بس لو فيه تعادل.`, `صح. الاتنين DP schemes صح؛ والكورس بيطلب الـ backward.`],
    [`12 > 11.`, `صح. min{12, 11} = 11.`, `نسيت d(M6).`, `غلط في الحساب.`],
    [`صح. ده الأساس اللي الـ recursion بتاع الـ dynamic programming قايم عليه.`, `دي طريقة transportation.`, `دي طريقة integer programming.`, `ده مصطلح project scheduling.`],
    [`دلوقتي 5 + 9 + 5 + 8 = 27، أطول.`, `أطول.`, `صح. d(M4) = min{6 + 6, 5 + 8} = 12، d(M2) = min{24, 21} = 21، d(M1) = 26.`, `أحسن path قديم بقى أطول.`],
    [`عدّ كل طريق بيعدّي على الـ stages.`, `فيه طرق ناقصة.`, `فيه طريق ناقص.`, `صح. S-A-D-T، S-A-E-T، S-B-D-T، S-B-E-T، S-C-E-T، S-C-T.`],
    [`مطلوب.`, `الاختيار الصح. الـ DP بيحسب قيم الـ stages بدل ما يعدّ الـ paths (إنك تكتبهم كلهم ده مجرد اختصار بعض المعيدين بيقولوه).`, `مطلوب.`, `محتاجه عشان ترجّع الـ path.`],
    [`صح. طول الـ arc + أحسن مسافة فاضلة.`, `الـ Max بيدّي أطول طريق.`, `جمع كل الـ arcs مالوش معنى هنا.`, `بيتجاهل المسافة الباقية بعد node j.`]
  ]
};

AR.or.exams = [
  // 0: Final Exam 2025/2026
  { sections: [
    { items: [
      { why: `ده تعريف الـ OR بالظبط (L1).` },
      { why: `CPM = Critical Path Method (L7).` },
      { why: `تعريف 20 في Revision 1 (L9).` }
    ] },
    { items: [
      { why: `ترتيب الـ LCM: تكلفة 1 → Q2D1 = 200؛ تكلفة 2 → Q3D3 = 300 (Q3 خلص)؛ تكلفة 3 متشطبة؛ تكلفة 4 → Q2D3 = 100 (D3 خلص)؛ تكلفة 5 متشطبة (D1 خلص)؛ تكلفة 6 → Q1D2 = 400؛ تكلفة 8 → Q2D2 = 200 (L4).` },
      { why: `الـ 200 بتوع D1 بيروحوا لأرخص خانة (Q2, D1) اللي تكلفتها 1؛ يبقى M11 = 0.` },
      { why: `M23 = 100 (الـ D3 محتاج 400 − 300).` },
      { why: `التكلفة 2 هي تاني أرخص خانة: min(300, 400) = 300.` },
      { why: `1×200 + 2×300 + 4×100 + 6×400 + 8×200 = 200 + 600 + 400 + 2400 + 1600 = $5200.` }
    ] },
    { items: [
      { why: `المسار مابيلفّش غير عند خانات مليانة (Q3D3، Q2D3، Q2D2). الـ Index = +3 − 2 + 4 − 8 = −3 (وده الـ index السالب الوحيد: Q1D1 = +6، Q1D3 = +5، Q3D1 = +10) (L4).` },
      { why: `التحسين على المسار اللي الـ index بتاعه −3 بينقل θ = min(300, 200) = 200: الـ Q2D2 بتنزل من 200 لـ 0 وبتخرج من الـ basis (Q3D2 = 200، Q3D3 = 100، Q2D3 = 300).` },
      { why: `التكلفة الجديدة = 5200 − 3 × 200 = 4600. والـ indices بعد ما اتحسبت تاني (3، 2، 3، 10) كلها ≥ 0، يبقى 4600 هي الأقل.` }
    ] },
    { items: [
      { why: `الـ Pivot column هو x1 (−7 أكتر سالب)؛ الـ ratios 20/5 = 4، 28/4 = 7 ← الـ pivot هو 5 (L3).` },
      { why: `الأرقام = R1 ÷ 5، بس الـ basic variable بتاع الصف الأول بيبقى x1 (x1 داخل و s1 خارج)، فالصف بالشكل المكتوب ده مش صح.` },
      { why: `R2 − 4·R1(الجديد) = (0, 7 − 1.6, 0 − 0.8, 1 | 28 − 16) = (0, 5.4, −0.8, 1 | 12).` },
      { why: `Z + 7·R1(الجديد) = (0, −6 + 2.8, 1.4, 0 | 28) = (0, −3.2, 1.4, 0 | 28).` },
      { why: `بعد الـ pivot الـ x1 بيبقى basic وقيمته 4 (وعند الـ optimum النهائي x1 = 28/9 ≈ 3.11)، عمره ما بيبقى 0.` },
      { why: `الـ RHS بتاع صف Z بعد pivot واحد = 0 + 7 × 4 = 28 (لسه مش optimal لأن فيه −3.2).` }
    ] },
    { items: [
      { why: `(1 + 12 + 5)/6 = 3؛ ((5 − 1)/6)² = 0.44 (L8).` },
      { why: `(2 + 16 + 6)/6 = 4؛ (4/6)² = 0.44.` },
      { why: `te = (1 + 8 + 3)/6 = 2 بس σ² = (2/6)² = 0.11.` },
      { why: `te = (2 + 12 + 4)/6 = 3 (الـ variance 0.11 صح).` },
      { why: `te: A 3، B 4، C 2، D 5، E 4، F 5، G 3، H 4، I 2، J 3. الـ Paths: A-B-D-G-I-J = 20، A-B-E-G-I-J = 19، A-C-F-H-I-J = 19.` },
      { why: `وقت الانتهاء = 20 أسبوع.` },
      { why: `σ² = 0.44 + 0.44 + 0.44 + 0.11 + 0.11 + 0.11 = 1.67، σ = 1.29؛ z = (22 − 20)/1.29 = 1.55 → P = 0.5 + 0.4394 = 0.9394. والاحتمال عمره ما يعدّي 1.` }
    ] },
    { items: [
      { ans: `<b>الـ Decision variables</b>: x = عدد وحدات X في الأسبوع، y = عدد وحدات Y في الأسبوع.<br><table><tr><th></th><th>X</th><th>Y</th><th>المتاح</th></tr><tr><td>ساعات الماكينة</td><td>1</td><td>2</td><td>≤ 300</td></tr><tr><td>ساعات العمالة</td><td>4</td><td>5</td><td>≤ 600</td></tr><tr><td>الربح (LE)</td><td>10</td><td>20</td><td></td></tr></table><b>Max Z = 10x + 20y</b><br>Subject to:<br>x + 2y ≤ 300 (ساعات الماكينة)<br>4x + 5y ≤ 600 (ساعات العمالة)<br>x ≥ 2y، يعني x − 2y ≥ 0 (إنتاج X على الأقل ضعف Y)<br>x + y ≥ 30 (إجمالي الإنتاج)<br>x, y ≥ 0 (أرقام حقيقية، مفيش شرط integer).<br><i>(مش مطلوب: الـ LP optimum هو x = 1200/13 ≈ 92.3، y = 600/13 ≈ 46.2، Z ≈ 1846.)</i>` }
    ] },
    { items: [
      { ans: `<b>الـ LP relaxation</b>: الخطوط 8000X + 4000Y = 40000 (الـ intercepts (0,10)، (5,0))؛ 15X + 30Y = 200 (الـ intercepts (0, 6.67)، (13.3, 0))؛ Y = 6؛ X = 1. المنطقة هي المساحة الصغيرة 0 ≤ X ≤ 1 بين Y = 6 و 15X + 30Y = 200 (أول constraint مش binding هناك).<br>الـ Corners: (0, 6) Z = 900؛ (1, 6) Z = 1000؛ (1, 37/6 = 6.17) Z = 100 + 925 = 1025؛ (0, 6.67) Z = 1000.<br><b>Node 1</b>: X = 1، Y = 6.17، Z = 1025 (الـ Y فيه كسر) ← اعمل branch على Y.<br><b>Node 2 (Y ≤ 6)</b>: مع Y ≥ 6 ده بيجبر Y = 6؛ أحسن نقطة (1, 6)، Z = 1000 → integer (الـ incumbent).<br><b>Node 3 (Y ≥ 7)</b>: 15X + 210 ≤ 200 مستحيل ← infeasible.<br><b>الـ Optimal integer solution: X = 1، Y = 6، Z = 1000</b> (L6).` }
    ] },
    { items: [
      { ans: `الـ Backward approach (L9):<br><b>Stage 3</b>: d(J5, J8) = 13؛ d(J6, J8) = 4؛ d(J7, J8) = 15.<br><b>Stage 2</b>: d(J2) = min{12 + 13, 8 + 4} = min{25, 12} = 12 (عن طريق J6)؛ d(J3) = 10 + 4 = 14؛ d(J4) = 9 + 15 = 24.<br><b>Stage 1</b>: d(J1) = min{4 + 12, 9 + 14, 11 + 24} = min{16, 23, 35} = 16.<br><b>أقصر path: J1 → J2 → J6 → J8، المسافة 16.</b>` }
    ] }
  ] },
  // 1: Final Exam 2024/2025
  { sections: [
    { items: [
      { why: `ده تعريف الـ project؛ لكن الـ CPM بيحدد وقت الـ project والـ activities المهمة (L7).` },
      { why: `ده تعريف الـ dummy activity؛ الـ start activity هي اللي مالهاش predecessor.` },
      { why: `ده تعريف الـ predecessor activity.` },
      { why: `تعريف الـ successor activity.` },
      { why: `تعريف الـ path (L7).` },
      { why: `ده تعريف "linear"؛ و"programming" = تحديد plan of action (L1).` },
      { why: `ده تعريف الـ integer programming؛ والـ relaxation بيشيل الـ integer constraints (L6).` },
      { why: `ده تعريف الـ operations research (L1).` },
      { why: `تعريف الـ constraints (L1).` },
      { why: `الـ pivot element هو اللي عند التقاطع (L3).` },
      { why: `الـ A critical: ES = LS = 0، LF = EF = 6 (L7).` },
      { why: `أطول path هو A-B-C-L-M = 6 + 4 + 7 + 3 + 5 = 25؛ وكلهم الـ total float بتاعهم صفر.` },
      { why: `الـ paths التانية: J-I-M 24، G-H-I-M 23، A-K-L-M 23، A-D-E-F 22.` },
      { why: `التلاتة مالهمش predecessors: ES = 0.` },
      { why: `LF(A) = 6، LF(G) = LS(H) = 4، LF(J) = LS(I) = 14.` },
      { why: `ES(E) = EF(D) = 6 + 2 = 8.` },
      { why: `الـ Floats: G 2، J 1، D 3، E 3، F 3، H 2، I 1، K 2؛ كلها مش صفر، ودول بالظبط الـ activities اللي برا A-B-C-L-M.` },
      { why: `LF(K) = LS(L) = 17 (و EF(K) = 15).` },
      { why: `الـ G مالهاش predecessor.` },
      { why: `الـ M آخر activity: LF = 25 (والـ ES بتاعها 20).` }
    ] },
    { items: [
      { ans: `المسألة Balanced (17 = 17). الـ LCM (L4):<br>1) تكلفة 0: (Q2, D2) = min(1, 5) = 1 → Q2 خلص، و D2 محتاج 4.<br>2) خانات التكلفة 1 في Q2 (متشطبة). تكلفة 2: (Q1, D1) = min(6, 7) = 6 → Q1 خلص، و D1 محتاج 1.<br>3) تكلفة 3 (Q1, D2) متشطبة. تكلفة 5: (Q3, D1) = 1 → D1 خلص.<br>4) تكلفة 8: (Q3, D2) = 4 → D2 خلص. تكلفة 9: (Q3, D4) = 2 → D4 خلص. تكلفة 15: (Q3, D3) = 3.<br><table><tr><th></th><th>D1</th><th>D2</th><th>D3</th><th>D4</th><th>S</th></tr><tr><td>Q1</td><td>6</td><td>–</td><td>–</td><td>–</td><td>6</td></tr><tr><td>Q2</td><td>–</td><td>1</td><td>–</td><td>–</td><td>1</td></tr><tr><td>Q3</td><td>1</td><td>4</td><td>3</td><td>2</td><td>10</td></tr></table>عدد الخانات المتوزع فيها = 6 = m + n − 1.<br><b>التكلفة الكلية = 2×6 + 0×1 + 5×1 + 8×4 + 15×3 + 9×2 = 12 + 0 + 5 + 32 + 45 + 18 = 112.</b><br><i>(للمعلومية: الـ VAM بيدّي 102 والـ optimum الحقيقي 100.)</i>` },
      { ans: `الـ Pivot column هو x1 (−12 أكتر سالب). الـ Ratios: 12/3 = 4، 18/2 = 9 ← الـ pivot row هو s1، و<b>الـ pivot element = 3</b>؛ x1 داخل و s1 خارج (L3).<br>صف x1 الجديد = R1 ÷ 3 = (1, 2, 1/3, 0 | 4).<br>صف s2 الجديد = R2 − 2 × x1 الجديد = (2 − 2, 9 − 4, 0 − 2/3, 1 − 0 | 18 − 8) = (0, 5, −2/3, 1 | 10).<br>صف Z الجديد = Z + 12 × x1 الجديد = (0, −7 + 24, 0 + 4, 0 | 0 + 48) = (0, 17, 4, 0 | 48).<br><table><tr><th>B.V</th><th>x1</th><th>x2</th><th>s1</th><th>s2</th><th>b</th></tr><tr><td>x1</td><td>1</td><td>2</td><td>1/3</td><td>0</td><td>4</td></tr><tr><td>s2</td><td>0</td><td>5</td><td>−2/3</td><td>1</td><td>10</td></tr><tr><td>Z</td><td>0</td><td>17</td><td>4</td><td>0</td><td>48</td></tr></table>مفيش أرقام سالبة فاضلة في صف Z، يبقى ده optimal: <b>x1 = 4، x2 = 0، s2 = 10، Z = 48</b>.` }
    ] },
    { items: [
      { ans: `<b>الـ Variables</b>: x1 = أطنان X في اليوم، x2 = أطنان Y في اليوم.<br><b>Max Z = 80x1 + 120x2</b><br>Subject to:<br>x1 + x2 ≤ 9 (الطاقة الإنتاجية)<br>x1 ≥ 2 (عقد X)<br>x2 ≥ 3 (عقد Y)<br>20x1 + 50x2 ≤ 360 (ساعات الماكينة)<br>x1, x2 ≥ 0.<br><i>(مش مطلوب: الـ optimum بالرسم عند تقاطع x1 + x2 = 9 و 20x1 + 50x2 = 360: x1 = 3، x2 = 6، Z = Rs 960.)</i>` },
      { ans: `<b>الـ LP relaxation</b>: الـ corners (0,0) 0؛ (3,0) 9؛ (2.79, 0.36) ≈ 12.6؛ (1.5, 1) 16.5؛ (0,1) 12. → Node 1: x1 = 1.5، x2 = 1، Z = 16.5. اعمل branch على x1.<br><b>Node 2 (x1 ≤ 1)</b>: الـ corners (0,1) 12، (1,1) 15، (1,0) 3 → (1, 1)، Z = 15، integer ← الـ incumbent.<br><b>Node 3 (x1 ≥ 2)</b>: الـ corners (2, 0.75) 15، (2,0) 6، (3,0) 9، (2.79, 0.36) 12.6 → (2, 0.75)، Z = 15، مش أحسن من 15 (fathomed). ولو عملت branch برضه: x2 ≤ 0 → (3,0)، Z = 9؛ x2 ≥ 1 → infeasible.<br><b>الـ Optimal integer solution: x1 = 1، x2 = 1، Z = 15</b> (L6).` }
    ] }
  ] },
  // 2: Final Exam 2023/2024 (August)
  { sections: [
    { items: [
      { ans: `1 → <b>D</b> · 2 → <b>C</b> · 3 → <b>B</b> · 4 → <b>E</b> · 5 → <b>A</b> (تعريفات Revision 1).` }
    ] },
    { items: [
      { why: `الـ Pivot column هو x2 (−20)؛ الـ ratios 3 ÷ 1/2 = 6، 5 ÷ 3/2 = 3.33 ← الـ pivot هو 3/2 في صف s2 (L3).` },
      { why: `الصف الصح هو x1 | 1 | 0 | 1.33 | −0.33 | 1.33 (قيم x1 و x2 متبدلين في الجملة).` },
      { why: `R2 ÷ 1.5 = (0, 1, −5/3, 2/3 | 10/3)، ومكتوب عليه x2.` },
      { why: `Z + 20 × صف x2 الجديد = (0, 0, 60 − 33.3, 13.3 | 360 + 66.7).` },
      { why: `te: A 6، B 5، C 12، D 5، E 9، F 11، G 7، H 4، I 15. الـ Critical path هو A-C-F-H = 33؛ والـ D ليها float = 11 (L8).` },
      { why: `A-C-F-H = 6 + 12 + 11 + 4 = 33 (B-E-I = 29، A-C-G-H = 29).` },
      { why: `(4 + 20 + 6)/6 = 5؛ (2/6)² = 0.11.` },
      { why: `C = 12، H = 4.` },
      { why: `G: (8/6)² = 1.78؛ I: (10/6)² = 2.78.` },
      { why: `(2 + 20 + 8)/6 = 5؛ (6/6)² = 1.` },
      { why: `te = (8 + 64 + 18)/6 = 15 بس σ² = (10/6)² = 2.78.` },
      { why: `(8 + 44 + 14)/6 = 11؛ (6/6)² = 1.` },
      { why: `σ² = 1 + 4 + 1 + 0.44 = 6.44 (الـ critical هم A، C، F، H) → σ = 2.54.` },
      { why: `z = (32 − 33)/2.54 = −0.39 → P = 0.5 − 0.1517 = 0.3483.` },
      { why: `z = (35 − 33)/2.54 = 0.79 → P = 0.5 + 0.2852 = 0.7852، مش 0.7874.` }
    ] },
    { items: [
      { ans: `الـ Penalty = تاني أقل تكلفة − أقل تكلفة (L4).<br><b>Step 1</b>: الصفوف 60، 126، 90، 116؛ الأعمدة 18، 237، 70، 100 → D2 (237) ← أرخص خانة 198: <b>Q4D2 = 30</b> (Q4 خلص؛ D2 محتاج 15).<br><b>Step 2</b>: الصفوف 60، 126، 90؛ الأعمدة 18، 15، 70، 100 → Q2 (126) ← أرخص خانة 315: <b>Q2D1 = 35</b> (D1 خلص؛ Q2 فاضله 15).<br><b>Step 3</b>: الصفوف 60، 9، 90؛ الأعمدة D2 15، D3 70، D4 100 → D4 (100) ← أرخص خانة 200: <b>Q3D4 = 20</b> (D4 خلص؛ Q3 فاضله 20).<br><b>Step 4</b>: الصفوف Q1 152، Q2 9، Q3 145؛ الأعمدة 15، 70 → Q1 (152) ← أرخص خانة 360: <b>Q1D3 = 20</b> (Q1 خلص؛ D3 محتاج 20).<br><b>Step 5</b>: الصفوف Q2 9، Q3 145؛ الأعمدة D2 15، D3 151 → D3 ← أرخص خانة 290: <b>Q3D3 = 20</b>.<br><b>Step 6</b>: الباقي <b>Q2D2 = 15</b>.<br><table><tr><th></th><th>D1</th><th>D2</th><th>D3</th><th>D4</th></tr><tr><td>Q1</td><td></td><td></td><td>20</td><td></td></tr><tr><td>Q2</td><td>35</td><td>15</td><td></td><td></td></tr><tr><td>Q3</td><td></td><td></td><td>20</td><td>20</td></tr><tr><td>Q4</td><td></td><td>30</td><td></td><td></td></tr></table><b>Total = 360×20 + 315×35 + 450×15 + 290×20 + 200×20 + 198×30 = 7200 + 11025 + 6750 + 5800 + 4000 + 5940 = 40,715</b> (6 خانات؛ و m + n − 1 = 7، يبقى الحل degenerate). ودي كمان الـ optimal cost.` }
    ] },
    { items: [
      { ans: `<b>الـ Row reduction</b> (الـ mins 9، 43، 28، 27، 11): M1 (0,13,49,2,10)، M2 (0,35,29,7,20)، M3 (13,0,63,9,17)، M4 (47,15,0,22,12)، M5 (25,0,46,11,14).<br><b>الـ Column reduction</b> (الـ mins 0، 0، 0، 2، 10): M1 (0,13,49,0,0)، M2 (0,35,29,5,10)، M3 (13,0,63,7,7)، M4 (47,15,0,20,2)، M5 (25,0,46,9,4).<br>أقل عدد خطوط = 4 (الصف M1، والأعمدة A، B، C) &lt; 5 → θ = 2 (M4, E): M1 (2,15,51,0,0)، M2 (0,35,29,3,8)، M3 (13,0,63,5,5)، M4 (47,15,0,18,0)، M5 (25,0,46,7,2).<br>الخطوط = 4 (الصفوف M1، M4؛ والأعمدة A، B) → θ = 2 (M5, E): M1 (4,17,51,0,0)، M2 (0,35,27,1,6)، M3 (13,0,61,3,3)، M4 (49,17,0,18,0)، M5 (25,0,44,5,0).<br>دلوقتي 5 خطوط ← اعمل assign: M2 → A، M3 → B، M4 → C، M1 → D، M5 → E.<br><b>التكلفة الكلية = 43 + 28 + 27 + 11 + 25 = 134</b> (L5).` }
    ] },
    { items: [
      { ans: `x1 = عدد الـ bookcases الكبيرة، x2 = عدد الـ bookcases الصغيرة.<br><b>Max Z = 50x1 + 20x2</b> s.t. 6x1 + 2x2 ≤ 24، x1 ≥ 2، x2 ≥ 3، x1, x2 ≥ 0.<br>الرسم: 6x1 + 2x2 = 24 بيعدّي على (4, 0) و (0, 12)؛ خط رأسي x1 = 2؛ خط أفقي x2 = 3. أركان المثلث الـ feasible:<br>(2, 3): Z = 100 + 60 = 160<br>(2, 6): 12 + 12 = 24 → Z = 100 + 120 = <b>220</b><br>(3, 3): على الخط، 6x1 + 2(3) = 24 → x1 = 3: Z = 150 + 60 = 210<br><b>أقصى ربح $220 في الأسبوع: 2 كبار و 6 صغيرين</b> (L2).` }
    ] }
  ] },
  // 3: Final Exam 2023/2024 (January, 2nd year)
  { sections: [
    { items: [
      { ans: `1 → <b>C</b> · 2 → <b>D</b> · 3 → <b>B</b> · 4 → <b>E</b> · 5 → <b>F</b> · 6 → <b>A</b>.` }
    ] },
    { items: [
      { why: `الـ penalties في Step 1: الصفوف 9، 10، 12؛ الأعمدة 21، 22، 10، 10 → D2 (22) ← أرخص خانة 8 عند Q3: حط min(18, 8) = 8 (L4).` },
      { why: `Step 2: الصفوف 9، 0، 20؛ الأعمدة D1 21، D3 10، D4 10 → D1 (21) ← أرخص خانة 19 عند Q1: 5.` },
      { why: `Step 3: الـ penalty بتاع Q3 = 50 → Q3D4 = 10 (Q3 خلص). Step 4: الـ penalty بتاع D4 = 50 → Q1D4 = 2 (Q1 خلص). Step 5: Q2D4 = 2، وبعدين Q2D3 = 7. يبقى M14 = M24 = 2.` },
      { why: `الـ Q3 فاضله 18 − 8 = 10، وكلهم راحوا لـ D4 (تكلفة 20).` },
      { why: `الـ D2 اتغطى كله من Q3؛ M22 = 0. والـ 9 بتوع Q2 راحوا لـ D3 (7) و D4 (2).` },
      { why: `8×8 + 19×5 + 20×10 + 10×2 + 60×2 + 40×7 = 64 + 95 + 200 + 20 + 120 + 280 = $779 (والـ optimum الحقيقي 721).` }
    ] },
    { items: [
      { why: `الـ Pivot column هو x2 (−3/2). الـ Ratios: 50 ÷ 5/2 = 20، 30 ÷ 1/2 = 60، 160 ÷ 1 = 160 ← الـ pivot هو 5/2 (الصف 1) (L3).` },
      { why: `الصف 1 هو الـ pivot row: R1 ÷ 5/2 = x2 | 0, 1, 2/5, −1/3, 0 | 20.` },
      { why: `R2 − 1/2 × صف x2 الجديد = x1 | 1, 0, −1/5, 1/3, 0 | 20.` },
      { why: `R3 − 1 × صف x2 الجديد = (0, 0, −2/5, −4/3 + 1/3, 1 | 160 − 20) = (0, 0, −2/5, −1, 1 | 140).` },
      { why: `Z + 3/2 × صف x2 الجديد = (0, 0, 3/5, 5/6 − 1/2, 0 | 150 + 30) = (0, 0, 3/5, 1/3, 0 | 180). ده optimal: x1 = 20، x2 = 20، Z = 180.` }
    ] },
    { items: [
      { why: `الـ A مالهاش predecessor (L7).` },
      { why: `الـ ES: C 5، D/E/F 7، G/H 5، I 10، J 10، K 12، L 12، M 17. الـ I بتخلص عند 23، والـ M عند 22 → T = 23 (الـ critical path هو B-C-E-I).` },
      { why: `الـ H ليها total float = 1 (LS 6، ES 5). الـ Critical هم B، C، E، I.` },
      { why: `الـ Floats: A 2، D 3، F 6، G 7، J 2، K 2، L 1، M 1، كلها موجبة، فكل activity في القايمة non-critical (والـ H، اللي الـ float بتاعها 1، non-critical برضه بس مش مذكورة).` },
      { why: `ES(C) = 5؛ ES(D) = ES(E) = max(EF A 5، EF C 7) = 7.` },
      { why: `ES(I) = EF(E) = 7 + 3 = 10.` },
      { why: `الـ B على الـ critical path اللي هو B-C-E-I.` }
    ] },
    { items: [
      { ans: `<b>الـ Row reduction</b> (7، 4، 3، 1): J1 (5,1,0,1)، J2 (2,2,0,4)، J3 (0,2,4,1)، J4 (0,2,4,3).<br><b>الـ Column reduction</b> (0، 1، 0، 1): J1 (5,0,0,0)، J2 (2,1,0,3)، J3 (0,1,4,0)، J4 (0,1,4,2).<br>الـ Row scanning: J2 فيه صفر واحد ← J2 → P3 (اشطب صفر J1 اللي في P3)؛ J4 فيه صفر واحد ← J4 → P1 (اشطب صفر J3 اللي في P1)؛ J3 → P4؛ J1 → P2. أربع assignments = 4 → optimal، ومش محتاجين خطوة θ.<br><b>J1 → P2 (8)، J2 → P3 (4)، J3 → P4 (4)، J4 → P1 (1)؛ المجموع = 17</b> (L5).` }
    ] },
    { items: [
      { ans: `الـ Dynamic programming هو mathematical technique بيتعامل مع الـ optimization للـ multistage decision problems (المسألة بتتحل stage بـ stage، وكل stage بتستخدم الـ optimal results بتاعة الـ stage اللي بعدها) (L9).` },
      { ans: `<b>Stage 4</b>: d(8) = 2؛ d(9) = 6.<br><b>Stage 3</b>: d(5) = min{6 + 2, 7 + 6} = 8 (عن طريق 8)؛ d(6) = 8 + 6 = 14؛ d(7) = min{9 + 2, 7 + 6} = 11 (عن طريق 8).<br><b>Stage 2</b>: d(2) = 3 + 8 = 11؛ d(3) = min{7 + 8, 8 + 14, 7 + 11} = 15 (عن طريق 5)؛ d(4) = 7 + 11 = 18.<br><b>Stage 1</b>: d(1) = min{4 + 11, 6 + 15, 4 + 18} = 15.<br><b>أقصر path هو 1 → 2 → 5 → 8 → 10، وطوله 15</b> (L9). (أرقام الـ arcs متقرية من الصورة؛ ونسخة سنة تالتة من نفس الـ network بتدّي نفس الإجابة.)` }
    ] },
    { items: [
      { ans: `x1 = ساعات الشغل، x2 = ساعات الـ ping-pong.<br><b>Max Z (fun) = x1 + 5x2</b><br>Subject to: x1 + x2 ≤ 8 (يوم 8 ساعات)<br>x1 ≥ 3x2، يعني x1 − 3x2 ≥ 0 (الشغل على الأقل تلات أضعاف الساعات)<br>x1, x2 ≥ 0.<br><i>(مش مطلوب: الـ optimum هو x1 = 6، x2 = 2، fun = 16.)</i>` }
    ] }
  ] },
  // 4: Final Exam 2023/2024 (January, 3rd year)
  { sections: [
    { items: [
      { ans: `1 → <b>D</b> · 2 → <b>F</b> · 3 → <b>A</b> · 4 → <b>C</b> · 5 → <b>E</b> · 6 → <b>B</b> (مطابقة لنموذج الطلبة).` }
    ] },
    { items: [
      { why: `الـ penalties في Step 1: الصفوف 13، 2، 4؛ الأعمدة 4، 15، 8، 3 → D2 (15) ← أرخص خانة 22 عند Q1: M12 = 40 (L4).` },
      { why: `Step 2: الـ penalty بتاع Q1 = 13 ← التكلفة 4: min(80 فاضلين، 110) = 80.` },
      { why: `Step 3: الـ penalty بتاع عمود D3 = 11 → Q2D3 = 30. Step 4: الـ penalty بتاع Q2 = 17 → Q2D4 = 30. الاتنين 30.` },
      { why: `Step 5: الـ penalty بتاع Q3 = 32 → Q3D1 = 50؛ وبعدين Q2D1 = 10.` },
      { why: `الـ Q2 فاضله 70 − 30 − 30 = 10 لـ D1.` },
      { why: `22×40 + 4×80 + 9×30 + 7×30 + 32×50 + 24×10 = 880 + 320 + 270 + 210 + 1600 + 240 = 3520.` }
    ] },
    { items: [
      { why: `الـ Pivot column هو x1. الـ Ratios 3 ÷ 4/5 = 3.75، 4 ÷ 7/5 = 2.86، 7 ÷ 1/5 = 35 ← الـ pivot هو 7/5 (L3).` },
      { why: `R1 − 4/5 × صف x1 الجديد = s1 | 0, 0, 1, −4/7, 1/7 | 5/7.` },
      { why: `الأرقام هي R2 ÷ 7/5، بس x1 بياخد مكان s2 كـ basic variable، فالصف لازم يتكتب عليه x1.` },
      { why: `Z + 22/5 × صف x1 الجديد = (0, 0, 0, 22/7, −2/7 | 480/7 ≈ 68.57).` }
    ] },
    { items: [
      { why: `الاتنين بعد A: ES = 3 (L7).` },
      { why: `ES(D) = EF(C) = 6.` },
      { why: `ES(F) = max(EF D = 11، EF E = 12) = 12.` },
      { why: `ES(H) = 17، ES(I) = max(17, 21) = 21.` },
      { why: `الـ C critical (A-C-E-F-I-J-K = 36)؛ والـ non-critical هم D (float 1)، G (4)، H (6).` },
      { why: `كلهم الـ float بتاعهم صفر؛ وفيه اتنين critical paths واحد عن طريق B والتاني عن طريق C.` },
      { why: `3 + 3 + 6 + 9 + 5 + 6 + 4 = 36 = T.` },
      { why: `أطول path = 36.` }
    ] },
    { items: [
      { ans: `<b>الـ Row reduction</b> (40، 10، 20، 10): J1 (0,20,20,30)، J2 (0,50,60,20)، J3 (0,30,20,0)، J4 (20,10,0,30).<br><b>الـ Column reduction</b> (0، 10، 0، 0): J1 (0,10,20,30)، J2 (0,40,60,20)، J3 (0,20,20,0)، J4 (20,0,0,30).<br>أقل عدد خطوط = 3 (عمود P1، عمود P4، صف J4) &lt; 4 → θ = 10 (أصغر رقم مش متغطي، J1-P2): J1 (0,0,10,30)، J2 (0,30,50,20)، J3 (0,10,10,0)، J4 (30,0,0,40).<br>4 خطوط ← اعمل assign: J2 → P1 (الصفر الوحيد)، J1 → P2، J3 → P4، J4 → P3.<br><b>المجموع = 60 + 10 + 20 + 10 = $100</b> (مطابق لنموذج الطلبة) (L5).` }
    ] },
    { items: [
      { ans: `الـ path في الـ network هو تسلسل متصل من nodes و activities بالتبادل، بيبدأ من الـ start event وبيقف عند الـ end event بتاع الـ network (L7).` },
      { ans: `<b>Stage 4</b>: d(8, 10) = 2؛ d(9, 10) = 6.<br><b>Stage 3</b>: d(5) = 6 + 2 = 8؛ d(6) = min{5 + 2, 8 + 6} = 7 (عن طريق 8)؛ d(7) = 7 + 6 = 13.<br><b>Stage 2</b>: d(2) = min{3 + 8, 6 + 7} = 11 (عن طريق 5)؛ d(3) = min{8 + 7, 7 + 13} = 15 (عن طريق 6)؛ d(4) = 7 + 13 = 20.<br><b>Stage 1</b>: d(1) = min{4 + 11, 6 + 15, 4 + 20} = 15.<br><b>أقصر path هو 1 → 2 → 5 → 8 → 10 = 4 + 3 + 6 + 2 = 15</b> (L9).` }
    ] },
    { items: [
      { ans: `x1 = عدد الـ hotdogs، x2 = عدد الـ sodas.<br><b>Max Z = 0.08x1 + 0.04x2</b><br>Subject to:<br>(1/8)x1 + (1/2)x2 ≤ 210 (وزن العربية)<br>x2 ≥ 60 (الـ sodas)<br>x1 ≥ 80 (الـ hotdogs)<br>x2 ≥ (1/2)x1، يعني x1 − 2x2 ≤ 0 (soda واحدة لكل اتنين hotdogs)<br>x1, x2 ≥ 0.<br><i>(مش مطلوب: الـ optimum هو x1 = 560، x2 = 280، Z = $56.)</i>` }
    ] }
  ] },
  // 5: Final Exam 2022/2023 (August)
  { sections: [
    { items: [
      { why: `تعريف الـ total float (L7).` },
      { why: `ده تعريف الـ successor؛ الـ predecessor لازم تخلص مباشرةً قبل activity تانية.` },
      { why: `التعريف بالظبط (L6).` },
      { why: `ده الـ transportation problem (L4).` },
      { why: `دي الـ infeasible solutions؛ والـ unbounded = الـ objective infinite (L2).` },
      { why: `تعريف الـ NWC (L4).` },
      { why: `اللي عند التقاطع هو الـ pivot element (L3).` },
      { why: `التعريف (L1).` }
    ] },
    { items: [
      { why: `min(100, 80) = 80. الـ NWC: Q1D1 80، Q1D2 20، Q2D2 150، Q2D3 50، Q3D3 140، Q3D4 160.` },
      { why: `الـ Q1 فاضله 20: M12 = 20.` },
      { why: `الـ Q2 بيخلص عند D3 (فيها 50)؛ M24 = 0.` },
      { why: `الـ D3 محتاج 140 كمان: M33 = 140.` },
      { why: `الباقي من Q3 = 160 = الـ demand بتاع D4.` },
      { why: `560 + 60 + 900 + 550 + 980 + 960 = 4010.` }
    ] },
    { items: [
      { why: `(1 + 16 + 7)/6 = 4؛ (6/6)² = 1 (L8).` },
      { why: `te = 7 بس σ² = (12/6)² = 4.` },
      { why: `te = (3 + 36 + 27)/6 = 11، σ² = (24/6)² = 16.` },
      { why: `te = 9 بس σ² = (6/6)² = 1.` },
      { why: `(6 + 48 + 30)/6 = 14؛ (24/6)² = 16.` },
      { why: `(2 + 20 + 14)/6 = 6؛ (12/6)² = 4.` },
      { why: `A-C-D-F = 4 + 11 + 9 + 6 = 30؛ A-C-E = 29؛ B-D-F = 22؛ B-E = 21.` },
      { why: `أطول path = 30.` },
      { why: `الـ Variance = 1 + 16 + 1 + 4 = 22، فـ σ = √22 = 4.69.` },
      { why: `الـ −0.43 دي z؛ P = 0.5 − 0.1664 = 0.3336.` },
      { why: `z = 4/4.69 = 0.85 → P = 0.5 + 0.3023 = 0.8023.` }
    ] },
    { items: [
      { ans: `الـ Row mins 1، 7، 4، 5 → (0,3,5,2)، (2,0,3,2)، (0,1,7,3)، (3,2,3,0).<br>الـ Column mins 0، 0، 3، 0 → (0,3,2,2)، (2,0,0,2)، (0,1,4,3)، (3,2,0,0).<br>3 خطوط (الصفين 2 و 4، والعمود A) &lt; 4 → θ = 1 → (0,2,1,1)، (3,0,0,2)، (0,0,3,2)، (4,2,0,0).<br>Assign 1 → A، 3 → B، 2 → C، 4 → D.<br><b>المجموع = 1 + 5 + 10 + 5 = 21</b> (نفس الشيت المحلول) (L5).` }
    ] },
    { items: [
      { ans: `x1, x2, x3 = عدد الأيام اللي المصانع A، B، C بتشتغلها في سبتمبر.<br><b>Min Z = 210000x1 + 190000x2 + 182000x3</b><br>Subject to:<br>40x1 + 65x2 ≥ 1500 (الـ golf carts)<br>35x1 + 53x3 ≥ 1100 (الـ snowmobiles)<br>x1, x2, x3 ≤ 30 (سبتمبر 30 يوم)<br>x1, x2, x3 ≥ 0 و integer (اليوم بيتدفع كامل) (L1).` }
    ] },
    { items: [
      { ans: `الخطوط: x1 + 3x2 = 13 → (0, 4.33)، (13, 0)؛ 5x1 + 2x2 = 20 → (0, 10)، (4, 0).<br><b>Node 1 (LP)</b>: الـ corners (0, 4.33) 17.33؛ (4, 0) 12؛ (2.615, 3.462) 21.69 ← اعمل branch على x1 = 2.615.<br><b>Node 2 (x1 ≥ 3)</b>: الـ corners (3, 2.5) 19؛ (4, 0) 12؛ (3, 0) 9 → (3, 2.5)، Z = 19.<br><b>Node 3 (x1 ≤ 2)</b>: (2, 3.667) 20.67؛ (0, 4.33) 17.33؛ (2, 0) 6 ← اعمل branch على x2.<br><b>Node 4 (x1 ≤ 2، x2 ≤ 3)</b>: (2, 3) Z = 18 integer.<br><b>Node 5 (x1 ≤ 2، x2 ≥ 4)</b>: (1, 4) Z = 19 integer (الأحسن).<br>الـ bound بتاع Node 2 = 19 ومايقدرش يغلب 19 (الـ branches بتاعته بتدّي (3.2, 2) 17.6 و node infeasible).<br><b>الـ Optimal: x1 = 1، x2 = 4، Z = 19</b> (نفس الشيت المحلول) (L6).` }
    ] }
  ] },
  // 6: Final Exam 2022/2023 (January)
  { sections: [
    { items: [
      { why: `الـ NWC: Q1D1 = 200، Q1D2 = 50، Q2D2 = 250، Q2D3 = 100، Q3D3 = 250، Q3D4 = 150 (L4).` },
      { why: `الاتنين 250.` },
      { why: `M34 = 150.` },
      { why: `600 + 50 + 1500 + 500 + 750 + 300 = 3700.` }
    ] },
    { items: [
      { why: `(2 + 20 + 8)/6 = 5؛ (6/6)² = 1 (L8).` },
      { why: `te = (4 + 28 + 10)/6 = 7.` },
      { why: `te = (4 + 36 + 14)/6 = 9؛ σ² = (10/6)² = 2.78.` },
      { why: `(6 + 40 + 20)/6 = 11؛ (14/6)² = 5.44.` },
      { why: `(4 + 20 + 12)/6 = 6؛ (8/6)² = 1.78.` },
      { why: `A-B-D-E = 5 + 7 + 11 + 6 = 29 > A-C-E = 20.` },
      { why: `هو 29.` },
      { why: `الـ C مش critical: الـ float بتاعها 9.` },
      { why: `1 + 1 + 5.44 + 1.78 = 9.22.` },
      { why: `z = 7/3.04 = 2.30 → P = 0.5 + 0.4893 = 0.9893.` }
    ] },
    { items: [
      { why: `الـ OR بيطبق methods علمية (scientific) (L1)؛ النموذج: "مش التعريف".` },
      { why: `الركن الشمال فوق (L4).` },
      { why: `الـ VAM بيلاقي initial BFS للـ transportation problem.` },
      { why: `الـ critical path هو أطول path.` },
      { why: `ده الـ free float (L7).` },
      { why: `ده الـ optimistic time.` },
      { why: `مطابق لتعريف الـ path.` },
      { why: `ده الـ mixed (L6).` },
      { why: `التعريف (L1).` },
      { why: `التعريف (L1).` }
    ] },
    { items: [
      { why: `الـ Pivot column هو x1؛ الـ ratios 20، 17.5 (والـ −3 بنتخطاه) ← 2 (L3).` },
      { why: `أكتر رقم سالب في صف Z هو −5.` },
      { why: `أصغر ratio هي 17.5 في صف s2.` },
      { why: `Z + 5 × (1, 0.5, 0, 0.5, 0 | 17.5).` },
      { why: `s3 + 3 × الصف الجديد = (0, 2.5, 0, 1.5, 1 | 64.5)، ومش موجود في الاختيارات.` },
      { why: `R2 ÷ 2.` },
      { why: `Minimize للتكلفة، و"at least" → ≥ (L1).` }
    ] },
    { items: [
      { ans: `الخطوط: x1 + x2 = 7 → (0,7)، (7,0)؛ 12x1 + 5x2 = 60 → (0,12)، (5,0)؛ x1 = 4 (رأسي)؛ x2 = 2 (أفقي).<br>أركان الـ feasible region: (4, 0) 320؛ (5, 0) 400؛ (4, 2) 410؛ (25/6, 2) = (4.17, 2): 12x1 + 10 = 60 → x1 = 25/6، Z = 333.3 + 90 = 423.33.<br><b>Node 1</b>: x1 = 4.17، x2 = 2، Z = 423.33 ← اعمل branch على x1.<br><b>Node 2 (x1 ≤ 4)</b>: x1 = 4 ← أحسن نقطة (4, 2)، Z = 410 (integer).<br><b>Node 3 (x1 ≥ 5)</b>: (5, 0) بس، Z = 400 (integer، أسوأ).<br><b>الـ Optimal: x1 = 4، x2 = 2، Z = 410</b> (مطابق للنموذج) (L6).` }
    ] },
    { items: [
      { ans: `الـ Start activities هم A و B؛ والـ end activities هم I و J.<br>Node 1 (start) → A → node 2؛ node 1 → B → node 3.<br>Node 3 → C → node 4؛ node 3 → I → node 9 (end).<br>Dummy من node 4 لـ node 2 (الـ D محتاجة A و C الاتنين، لكن الـ F محتاجة C بس).<br>Node 2 → D → node 5 → E → node 7.<br>Node 4 → F → node 6؛ node 6 → G → node 7؛ node 6 → H → node 8، و dummy من node 8 لـ node 7 (الـ G والـ H طالعين من نفس الـ node والاتنين قبل J، فالـ dummy بيمنع إن يبقى فيه سهمين متوازيين).<br>Node 7 → J → node 9 (end).<br>start node واحدة، end node واحدة، واتنين dummies (L7).` }
    ] }
  ] },
  // 7: Final Exam 2021/2022
  { sections: [
    { items: [
      { ans: `i. <b>الـ Non-negativity restriction</b>: كل الـ decision variables لازم قيمتها تبقى أكبر من أو تساوي صفر.<br>ii. <b>الـ Infeasible solutions</b>: أي نقط برا الـ feasible region.<br>iii. <b>الـ PERT</b>: technique لجدولة الـ projects فيها تلات تقديرات ممكنة للوقت للـ activities اللي بتربط بين اتنين events (optimistic، most likely، pessimistic)، فالوقت بيبقى probabilistic.` },
      { ans: `<b>Stage 4</b>: d(M5, M7) = 6؛ d(M6, M7) = 8.<br><b>Stage 3</b>: d(M3) = 11 + 6 = 17؛ d(M4) = min{6 + 6, 3 + 8} = 11 (عن طريق M6).<br><b>Stage 2</b>: d(M2) = min{7 + 17, 9 + 11} = 20 (عن طريق M4).<br><b>Stage 1</b>: d(M1) = 5 + 20 = 25.<br><b>أقصر path هو M1 → M2 → M4 → M6 → M7 = 25</b> (L9).` },
      { ans: `تكلفة 20: S2D2 = 320 (S2 خلص، و D2 محتاج 230). تكلفة 60: S3D1 = 250 (D1 خلص). تكلفة 75: S1D3 = 200 (D3 خلص). تكلفة 130: S3D2 = 130 (S3 خلص). تكلفة 140: S1D2 = 100.<br><b>Z = 20×320 + 60×250 + 75×200 + 130×130 + 140×100 = 6400 + 15000 + 15000 + 16900 + 14000 = 67,300</b> (L4).` }
    ] },
    { items: [
      { ans: `حط مسألة الـ max على شكل ≤: الـ constraint اللي ≥ بيبقى −2x1 − 5x2 ≤ −20؛ والـ equality بتفضل ليها dual variable حر.<br>الـ Dual variables: y1 (من الـ ≤ constraint، y1 ≥ 0)، y2 (من الـ ≥ constraint، y2 ≥ 0)، y3 (من الـ equality، unrestricted).<br><b>Min W = 56y1 − 20y2 + 40y3</b><br>subject to 4y1 − 2y2 + 5y3 ≥ 12<br>7y1 − 5y2 + 4y3 ≥ 4<br>y1, y2 ≥ 0، و y3 unrestricted في الإشارة.<br>(شكل مكافئ: Min 56y1 + 20y2 + 40y3 مع y2 ≤ 0.) تشييك: الـ optimum بتاع الـ primal والـ dual الاتنين = 1520/17 ≈ 89.41 (L3).` },
      { ans: `x1, x2, x3 = عدد الأيام اللي الـ mines I، II، III بتشتغلها الأسبوع ده.<br><b>Min Z = 20x1 + 22x2 + 18x3</b> ($1000)<br>4x1 + 6x2 + x3 ≥ 54 (high grade)<br>4x1 + 4x2 + 6x3 ≥ 65 (low grade)<br>x1 ≤ 7، x2 ≤ 7، x3 ≤ 7 (أيام الأسبوع)<br>x1, x2, x3 ≥ 0 و integer (اليوم بيتدفع كامل) (L1).` }
    ] },
    { items: [
      { ans: `<b>الـ Network</b>: 1 →A→ 2؛ 2 →B→ 3؛ 2 →C→ 4؛ dummy من 3 لـ 4 (الـ E والـ I محتاجين B و C)؛ 3 →D→ 5؛ 4 →E→ 5؛ 3 →F→ 6؛ 5 →G→ 6؛ 6 →H→ 7؛ 4 →I→ 7؛ 7 →J→ 8.<br><b>الـ Expected times / variances</b>: A 16.5/12.25، B 17.5/12.25، C 18.5/20.25، D 16/25، E 20.33/11.11، F 23.33/5.44، G 8.5/6.25، H 23/36، I 25/16، J 13/4.<br><b>a)</b> الـ Paths: A-B-D-G-H-J 94.5؛ A-B-E-G-H-J 98.83؛ A-B-F-H-J 93.33؛ A-B-I-J 72؛ <b>A-C-E-G-H-J 99.83</b>؛ A-C-I-J 73. الـ Critical path هو A-C-E-G-H-J، ووقت الانتهاء <b>99.83 أسبوع</b>.<br><b>b)</b> σ² = 12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86، σ = 9.48.<br>P(X ≤ 104) = P(z ≤ (104 − 99.83)/9.48) = P(z ≤ 0.44) = 0.5 + 0.1700 = <b>0.67</b> (L8).` }
    ] },
    { items: [
      { ans: `الخطوط: 10x1 + 6x2 = 35 → (0, 5.83)، (3.5, 0)؛ x1 + x2 = 4 → (0, 4)، (4, 0).<br><b>Node 1 (LP)</b>: الـ corners (0,0) 0؛ (3.5, 0) 140؛ (2.75, 1.25) 147.5؛ (0, 4) 120 → x1 = 2.75، x2 = 1.25، Z = 147.5.<br><b>Node 2 (x1 ≤ 2)</b>: الـ corners (2, 0) 80؛ (2, 2) 140؛ (0, 4) 120 → (2, 2)، Z = 140، integer (الـ incumbent).<br><b>Node 3 (x1 ≥ 3)</b>: الـ corners (3, 0) 120؛ (3.5, 0) 140؛ (3, 0.83) 145 → (3, 0.83)، Z = 145 ← اعمل branch على x2:<br>&nbsp;&nbsp;Node 4 (x2 ≥ 1): 10(3) + 6 = 36 > 35 → infeasible.<br>&nbsp;&nbsp;Node 5 (x2 ≤ 0): (3.5, 0)، Z = 140، مش أحسن من 140 (الـ branches بتاعته بتدّي (3, 0) = 120 و x1 ≥ 4 اللي infeasible).<br><b>الـ Optimal: x1 = 2، x2 = 2، Z = 140</b> (L6).` }
    ] }
  ] },
  // 8: Final Exam 2019/2020
  { sections: [
    { items: [
      { why: `ده تعريف "programming"؛ والـ non-negativity = كل الـ variables ≥ 0 (L1).` },
      { why: `التعريف (L2).` },
      { why: `التعريف (L2).` },
      { ans: `x1 = عدد باوندات mixture 1، x2 = عدد باوندات mixture 2.<br><table><tr><th></th><th>Mix 1</th><th>Mix 2</th><th>المخزون</th></tr><tr><td>Cherries</td><td>1/2</td><td>1/3</td><td>130</td></tr><tr><td>Mints</td><td>1/2</td><td>2/3</td><td>170</td></tr><tr><td>السعر</td><td>$2.00</td><td>$1.25</td><td></td></tr></table><b>Max Z = 2x1 + 1.25x2</b><br>(1/2)x1 + (1/3)x2 ≤ 130 (الـ cherries)<br>(1/2)x1 + (2/3)x2 ≤ 170 (الـ mints)<br>x1, x2 ≥ 0.<br><i>(مش مطلوب: الـ optimum هو x1 = 260، x2 = 0، Z = $520.)</i>` }
    ] },
    { items: [
      { ans: `<b>الـ Pure IP</b>: كل الـ variables لازم تبقى integers. <b>الـ Mixed IP</b>: بعض الـ variables بس لازم تبقى integers. <b>الـ Binary (0-1) IP</b>: كل الـ variables لازم تساوي 0 أو 1 (L6).` },
      { ans: `الخطوط: 3x1 + 6x2 = 40 → (0, 6.67)، (13.3, 0)؛ 10x1 + 5x2 = 50 → (0, 10)، (5, 0)؛ x2 = 6؛ x1 = 1.<br>أركان الـ feasible region: (0, 6) 180؛ (1, 6) 200؛ (1, 37/6 = 6.17) 205؛ (0, 6.67) 200.<br><b>Node 1</b>: x1 = 1، x2 = 6.17، Z = 205 ← اعمل branch على x2.<br><b>x2 ≤ 6</b>: (1, 6)، Z = 200 integer. <b>x2 ≥ 7</b>: 3x1 + 42 > 40 → infeasible.<br><b>الـ Optimal: x1 = 1، x2 = 6، Z = 200</b> (L6).` }
    ] },
    { items: [
      { ans: `تكلفة 15: S3D3 = 600 (S3 خلص؛ و D3 محتاج 200). تكلفة 20 (S3D2) متشطبة. تكلفة 21: S2D2 = 900 (D2 خلص؛ و S2 فاضله 100). تكلفة 23 متشطبة. تكلفة 24: S2D1 = 100 (S2 خلص؛ و D1 محتاج 200). تكلفة 25 متشطبة. تكلفة 30 متشطبة. تكلفة 31: S1D1 = 200. تكلفة 42: S1D3 = 200.<br><b>Total = 15×600 + 21×900 + 24×100 + 31×200 + 42×200 = 9000 + 18900 + 2400 + 6200 + 8400 = 44,900</b> (L4).<br><i>حل الطالب كاتب 42,500 لأنه ناسي 24 × 100. (والـ VAM كان هيدّي 42,700، وده الـ optimal.)</i>` },
      { ans: `الـ Row mins 7، 11، 10، 14 → (0,2,1,6)، (5,5,4,0)، (6,9,0,5)، (2,3,0,2).<br>الـ Column mins 0، 2، 0، 0 → (0,0,1,6)، (5,3,4,0)، (6,7,0,5)، (2,1,0,2).<br>3 خطوط (صف Mohamed، والأعمدة J3، J4) → θ = 1 → (0,0,2,7)، (4,2,4,0)، (5,6,0,5)، (1,0,0,2).<br>الـ Assign: Ahmed → J4 (الصفر الوحيد)، Samy → J3، Eslam → J2، Mohamed → J1.<br><b>المجموع = 7 + 11 + 10 + 17 = 45</b> (L5).` }
    ] },
    { items: [
      { ans: `الـ predecessor activity لازم تخلص مباشرةً قبل ما activity تانية تبدأ (L7).` },
      { ans: `<b>a.</b> 1 →A→ 2؛ 2 →B→ 3؛ 2 →C→ 4؛ 3 →D→ 4؛ 3 →E→ 5؛ 4 →F→ 5؛ 5 →G→ 6.<br><b>b.</b> الـ Paths: A-B-E-G = 69؛ A-B-D-F-G = 84؛ A-C-F-G = 69. الـ ES/LF: node 1: 0/0، node 2: 15/15، node 3: 32/32، node 4: 51/51، node 5: 69/69، node 6: 84/84. <b>الـ Critical path هو A-B-D-F-G، ووقت الانتهاء 84 شهر.</b><br><b>c.</b> الـ Critical activities: <b>A، B، D، F، G</b> (والـ non-critical هم C و E، والـ total float لكل واحد 15) (L7).` }
    ] },
    { items: [
      { ans: `<b>Stage 3</b>: d(D, T) = 8؛ d(E, T) = 2.<br><b>Stage 2</b>: d(A) = min{3 + 8, 6 + 2} = 8 (عن طريق E)؛ d(B) = min{4 + 8, 10 + 2} = 12؛ d(C) = min{10, 3 + 2} = 5 (عن طريق E).<br><b>Stage 1</b>: d(S) = min{1 + 8, 2 + 12, 7 + 5} = min{9, 14, 12} = 9.<br><b>أقصر path هو S → A → E → T، والمسافة 9</b> (L9).` }
    ] }
  ] }
];

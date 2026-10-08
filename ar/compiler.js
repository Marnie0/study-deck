window.AR = window.AR || {};
AR.compiler = { lectures: {}, exams: [] };

AR.compiler.lectures["1"] = {
  notes: [
    { h: `يعني إيه compiler؟`, pts: [
      `الـ <b>compiler</b> بيترجم (يعمل compile) لبرنامج مكتوب بلغة <b>high-level</b> مناسبة للمبرمجين، ويحوّله لـ <b>low-level machine language</b> اللي الكمبيوتر محتاجها. وهو بيعمل كده كمان بيحاول <b>يمسك ويبلّغ عن أخطاء المبرمج الواضحة</b>.`,
      `الـ <b>interpreter</b> طريقة تانية لتنفيذ لغة البرمجة. الـ interpretation فيها حاجات كتير شبه الـ compiling.`,
      `كود المادة على السلايدز: <b>3CS – CS309-Credit</b>. الامتحانات بتستخدم <b>CS321</b> (Compiler Design and Theory) و <b>CS309</b> (Compiler Theory).`
    ] },
    { h: `الـ compilers مقابل الـ interpreters` },
    { h: `مراحل (phases) الـ compiler (ارسم الشكل ده)`, pts: [
      `الـ six phases كلهم بيتعاملوا مع الـ <b>literal table</b> والـ <b>symbol table</b> والـ <b>error handler</b>. دول data structures وأدوات مساعدة، <b>مش phases</b>. الامتحانات كتير بتسأل "الـ symbol table مش phase".`,
      `سلسلة الـ input/output هي: <b>source code → tokens → syntax tree → annotated tree → intermediate code → target code → (optimized) target code</b>.`,
      `الـ "Testing" <b>مش</b> phase من phases الـ compiler.`
    ] },
    { h: `1) الـ Lexical analysis (الـ scanner)`, pts: [
      `بيجمّع سلاسل الحروف في وحدات ليها معنى اسمها <b>tokens</b>.`,
      `مثال: <code>a[index]=4+2</code> بيطلّع: <code>a</code> identifier، <code>[</code> left bracket، <code>index</code> identifier، <code>]</code> right bracket، <code>=</code> assignment، <code>4</code> number، <code>+</code> plus sign، <code>2</code> number.`
    ] },
    { h: `2) الـ Syntax analysis (الـ parser)`, pts: [
      `بيحدد <b>تركيب (structure)</b> البرنامج. النتيجة بتبقى <b>parse tree</b> أو <b>syntax tree</b> (abstract syntax tree).`,
      `الـ parse tree بتاع <code>a[index]=4+2</code> بيحتفظ بكل node في الـ grammar: expression → assign-expression → expression = expression → subscript-expression (expression [ expression ]) و additive-expression (expression + expression) → وبعدين الأوراق identifier/number.`,
      `الـ <b>syntax tree</b> (AST) هو النسخة المختصرة: assign-expression وتحته children هما subscript-expression(a, index) و additive-expression(4, 2).`
    ] },
    { h: `3) الـ Semantic analyzer`, pts: [
      `الـ semantics بتاعة البرنامج هي <b>"معناه"</b>، عكس الـ syntax اللي هو التركيب. الـ semantics بتحدد جزء من سلوك البرنامج وقت التشغيل <b>قبل</b> ما يتنفّذ.`,
      `الـ <b>Static semantics</b>: الـ declarations والـ type checking.`,
      `الـ <b>Attributes</b>: معلومات زيادة الـ semantic analyzer بيحسبها. والنتيجة هي الـ <b>annotated syntax tree</b>: <code>a</code> = array of integer، <code>index</code> = integer، <code>4</code> و <code>2</code> = integer، الـ subscript-expression = integer، الـ additive-expression = integer.`
    ] },
    { h: `4) الـ Source code optimizer`, pts: [
      `أول نقطة لمعظم خطوات الـ optimization هي <b>بعد الـ semantic analysis على طول</b>.`,
      `تحسين الكود ده بيعتمد على الـ source code بس، وهو phase لوحده. الـ compilers بتختلف جدًا في أنواع الـ optimization اللي بتعملها وفين بتحطها.`,
      `الـ <b>Constant folding</b> على الـ annotated tree: <code>4+2</code> بتتحوّل لـ node واحدة هي <code>6</code>.`,
      `أو على الـ intermediate code (three-address code، p-code): <code>t = 4 + 2; a[index] = t</code> → <code>t = 6; a[index] = t</code> → <code>a[index] = 6</code>.`
    ] },
    { h: `5) الـ Code generator و 6) الـ target code optimizer`, pts: [
      `الـ <b>code generator</b> بياخد الـ intermediate code (IR) ويطلّع كود للـ <b>target machine</b>. هنا <b>خصائص الـ target machine</b> بتبقى العامل الأساسي: الـ instructions بتاعتها وطريقة تمثيل الداتا. المثال بيستخدم assembly language افتراضية (MUL R0,2 عشان الـ integer حجمه 2 bytes).`,
      `الـ <b>target code optimizer</b> بيحسّن الكود اللي اتولّد: <b>اختيار الـ address modes</b>، <b>استبدال instructions</b> (الضرب في 2 يبقى SHL، يعني shift left) و <b>شيل الـ instructions الزيادة (redundant)</b>.`
    ] },
    { h: `الـ data structures الأساسية للتواصل بين الـ phases`, pts: [
      `الـ <b>Tokens</b>: الـ scanner بيجمّع الحروف في token، وبيتخزن كـ <b>قيمة من enumerated data type</b>. ممكن كمان يحتفظ بالـ string أو معلومات تانية (اسم الـ identifier، قيمة الرقم). بيتخزن في <b>global variable واحد</b> أو <b>array</b> من الـ tokens.`,
      `الـ <b>Syntax tree</b>: structure عادي <b>pointer-based</b> الـ parser هو اللي بيبنيه. كل node فيها معلومات جمعها الـ parser أو phases بعده. الـ nodes محتاجة attributes مختلفة حسب نوع التركيب في اللغة (variable record).`,
      `الـ <b>Symbol table</b>: بيحتفظ بمعلومات عن الـ identifiers (functions، variables، constants، data types). بيتعامل مع <b>تقريبًا كل phase</b>. الوصول ليه لازم يبقى <b>constant-time</b>، عشان كده غالبًا بيستخدموا <b>hash table</b> واحد أو أكتر.`,
      `الـ <b>Literal table</b>: بيخزّن الـ <b>constants والـ strings</b>، وده بيقلل حجم البرنامج. الـ insertion والـ lookup السريع مهمين جدًا.`,
      `الـ <b>Intermediate code</b>: بيتخزن كـ array من text strings، أو text مؤقت، أو linked list من structures (زي three-address code، p-code). لازم يبقى سهل نعيد ترتيبه.`,
      `الـ <b>Temporary files</b>: بتشيل نواتج الخطوات الوسطانية. بتحل مشكلة قلة الـ memory وبتسمح بالـ <b>back-patching</b> للعناوين أثناء الـ code generation.`
    ] }
  ],
  cards: [
    `بيترجم برنامج high-level لـ low-level machine language وبيبلّغ عن أخطاء المبرمج الواضحة.`,
    `الـ Interpreter: statement واحدة في المرة. الـ Compiler: البرنامج كله مرة واحدة.`,
    `الـ compiler (وبعدها محتاج linking). الـ interpreters مش بتطلّع intermediate object code.`,
    `ناتج الـ compiler. الـ compilers بتاخد وقت أطول في الـ analysis بس التنفيذ أسرع.`,
    `Scanner، parser، semantic analyzer، source code optimizer، code generator، target code optimizer.`,
    `Literal table، symbol table، error handler (ودول مش phases).`,
    `Tokens.`,
    `parse tree / syntax tree.`,
    `الـ annotated syntax tree.`,
    `الـ annotated syntax tree (والـ output بتاعه intermediate code).`,
    `الـ Declarations والـ type checking.`,
    `معلومات زيادة بيحسبها الـ semantic analyzer (زي الـ types).`,
    `الـ 4+2 بتتبدّل بـ 6 وقت الـ compile.`,
    `اختيار الـ address modes، استبدال الـ instructions، وشيل الكود الـ redundant.`,
    `عشان عمليات الوصول لازم تبقى constant-time.`,
    `بيخزّن الـ constants والـ strings عشان يقلل حجم البرنامج.`
  ],
  qa: [
    `Source code → Scanner → tokens → Parser → syntax tree → Semantic analyzer → annotated tree → Source code optimizer → intermediate code → Code generator → target code → Target code optimizer → target code. وكل الـ phases متوصلة بالـ literal table والـ symbol table والـ error handler.`,
    `الـ Interpreter: statement واحدة في المرة؛ وقت analysis أقل بس التنفيذ أبطأ؛ مفيش intermediate object code فبيوفّر memory؛ أمثلة: JavaScript، Python، Ruby. الـ Compiler: البرنامج كله مرة واحدة؛ وقت analysis أكتر بس التنفيذ أسرع؛ بيطلّع intermediate object code محتاج linking فبياخد memory أكتر؛ أمثلة: C، C++، Java.`,
    `الـ Scanner: a(id) [ index(id) ] = 4(num) + 2(num). الـ Parser: syntax tree هو assign(subscript(a,index), add(4,2)). الـ Semantic: بيعمل annotate لـ a إنها array of integer والباقي integer. الـ Optimizer: بيعمل fold لـ 4+2 لـ 6 فتبقى a[index]=6. الـ Code generator: MOV R0,index; MUL R0,2; MOV R1,&a; ADD R1,R0; MOV *R1,6. الـ Target optimizer: MOV R0,index; SHL R0; MOV &a[R0],6.`,
    `الـ Tokens، الـ syntax tree، الـ symbol table، الـ literal table، الـ intermediate code، والـ temporary files.`
  ],
  quiz: [
    [`الـ scanner هو phase 1 (الـ lexical analysis).`, `صح. الـ symbol table ده data structure كل الـ phases بتستخدمه، مش phase.`, `الـ parser هو phase 2 (الـ syntax analysis).`, `الـ source والـ target code optimizers الاتنين phases.`],
    [`دي phase.`, `دي phase.`, `صح. الـ Testing نشاط من software engineering، مش phase في الـ compiler.`, `دي phase (الـ source والـ target code optimizers).`],
    [`صح. البرامج اللي اتعملها compile بتتنفذ <b>أسرع</b>؛ الـ interpreters هي اللي وقت تنفيذها أكتر.`, `دي صفة فعلًا في الـ compilers: الأخطاء مش بتظهر غير بعد ما البرنامج كله يتعمله analysis.`, `دي صفة فعلًا في الـ compilers.`, `ده تعريف الـ compiler نفسه.`],
    [`جزء من الإجابة.`, `مش دي إجابة الـ key.`, `جزء من الإجابة.`, `صح (حسب الـ official key). الـ machine code هو نفسه binary code.`],
    [`صح (حسب الـ official key). الـ syntax errors بتتمسك وقت الـ compile.`, `الـ logic errors بتطلّع نتايج غلط وقت التشغيل؛ الـ compiler مش بيشوفها.`, `الـ runtime errors بتحصل أثناء التنفيذ، بعد الـ compilation.`, `الـ compiler بيبلّغ عن الـ syntax errors بس.`],
    [`مش دي نقطة الاختلاف في جدول المحاضرة.`, `صح. الـ compilers بتطلّع intermediate object code؛ الـ interpreters لأ.`, `الاتنين محتاجين semantic checking.`, `(b) هي الفرق.`],
    [`الـ syntax analysis بتاخد tokens.`, `صح. الـ semantic analyzer بيطلّع الـ annotated tree، والـ source code optimizer بياخده.`, `الـ semantic analysis هي اللي <b>بتطلّع</b> الـ annotated tree؛ الـ input بتاعها هو الـ syntax tree.`, `دي مش phase.`],
    [`ده input الـ syntax analysis.`, `صح.`, `ده output الـ semantic analysis.`, `ده output الـ code generator.`],
    [`صح.`, `دي بتتشيك على الـ structure.`, `دي بتتشيك على المعنى والـ types.`, `(a) هي الصح.`],
    [`الـ optimizer التاني بيشتغل على الـ target code (assembly) اللي اتولّد في مثال المحاضرة.`, `صح. Source code optimizer + target code optimizer (والـ target code هنا assembly: MOV، MUL...).`, `الـ optimizer الأول بيشتغل على الـ source/intermediate code.`, `مش دي صياغة المحاضرة.`],
    [`مش ده اللي في السلايد.`, `صح. الضرب في 2 = shift left بـ bit واحدة (instruction replacement).`, `ده بيغيّر المعنى.`, `الـ index لسه محتاج يتضرب (scaling).`],
    [`هو كمان محتاج insert/lookup سريع، بس السلايد ذكر الـ hashing للـ symbol table.`, `صح.`, `ده tree بيعتمد على pointers.`, `بتتستخدم للنواتج الوسطانية والـ back-patching.`]
  ],
  extra: [
    [`ده بيعد الـ identifiers والأرقام وoperator واحد بس. الأقواس والـ = والـ + كلهم tokens برضه.`, `صح. a، [، index، ]، =، 4، +، 2: identifier، left bracket، identifier، right bracket، assignment، number، plus sign، number.`, `كده نسيت القوسين، والمحاضرة بتعدّهم tokens منفصلة.`, `ده بيعد حروف "index" لوحدها. الـ scanner بيجمّع i-n-d-e-x في identifier token <b>واحد</b>.`],
    [`الـ Constant folding حصل قبل كده وملوش علاقة بالـ scaling بتاع الـ index.`, `حجم الـ array مش مستخدم هنا. الـ 2 ده حجم element واحد.`, `صح. الـ code generator بيستخدم طريقة تمثيل الداتا في الـ target machine: الـ a[index] مكانها &a + index × 2.`, `الـ target code optimizer بعد كده <b>بيستبدل</b> الضرب في 2 بـ SHL؛ هو مش اللي عامله.`],
    [`نص الشغل بس: لازم الجمع يتعمله fold الأول، وبعدين الـ temporary يختفي.`, `ده شال الـ temporary بس عمره ما عمل fold للـ constant.`, `الـ assignment لـ a[index] هو أصلًا هدف الـ statement ومينفعش يتشال.`, `صح. t = 4+2 تبقى t = 6، وبعدين نعوّض بـ t، فتبقى a[index] = 6.`],
    [`صح. هو بيحوّل الـ intermediate code لكود للـ target machine، فالـ instructions وأحجام الداتا بتاعة الجهاز هي اللي بتتحكم فيه.`, `ده بيحسب attributes زي الـ types؛ مش معتمد على instructions الـ target machine.`, `الـ scanner بيجمّع الحروف في tokens بس.`, `المحاضرة بتقول إن التحسين ده معتمد على الـ source code بس.`],
    [`موجودة: مثلًا MOV &a[R0], 6 بتستخدم indexed address mode.`, `صح. الـ Type checking شغل الـ semantic analyzer (static semantics)، مش الـ target code optimizer.`, `موجودة: MUL R0, 2 بتبقى SHL R0.`, `موجودة: MOV R1, &a و ADD R1, R0 بيختفوا في الكود المتحسّن.`],
    [`ده وصف الـ symbol table.`, `دي الطريقة اللي الـ scanner بيمثّل بيها الـ tokens.`, `صح. والـ insertion والـ lookup السريع مهمين جدًا ليه.`, `ده وصف الـ temporary files.`],
    [`الـ symbol table بيتخزن في hash tables في الـ memory؛ الـ temporary files مش متذكرة معاه.`, `الـ literal table ليه data structure لوحده.`, `المحاضرة مش بتقول السبب ده.`, `صح. السببين الاتنين موجودين في السلايد.`],
    [`صح. مثلًا اسم الـ identifier أو قيمة الرقم ممكن يتحفظوا كمان، في global variable أو array من الـ tokens.`, `ده الـ syntax tree اللي الـ parser بيبنيه.`, `ده intermediate code، وبيطلع بعدها بكتير.`, `الـ constants والـ strings بس هي اللي بتروح الـ literal table، والـ tokens مش بتتمثّل كده.`],
    [`صح. ده بالظبط جدول المقارنة في المحاضرة: الـ interpreters بتعمل analysis أقل بس أبطأ في التشغيل؛ الـ compilers بتعمل analysis أكتر بس أسرع.`, `الجملة مطابقة للجدول. الفخ هنا إنك تلخبط بين وقت الـ analysis ووقت التنفيذ.`],
    [`الـ a هي الـ array نفسها؛ الـ subscript-expression a[index] بس هي اللي integer.`, `صح. الـ a بتتعمل annotate إنها <b>array of integer</b>؛ والـ index و 4 و 2 والـ subscript-expression والـ additive-expression كلهم integer.`]
  ]
};

AR.compiler.lectures["2"] = {
  notes: [
    { h: `يعني إيه مرحلة الـ lexical analysis؟`, pts: [
      `هي <b>أول phase</b> في الـ compiler. بتقرا حروف الـ input وتطلّع <b>sequence من الـ tokens</b> الـ parser بيستخدمها في الـ syntax analysis.`,
      `كمان <b>بتشيل الـ comments والـ white space</b> (blank، tab، newline).`,
      `وكمان <b>بتربط رسايل الأخطاء</b> بتاعة الـ compiler بالـ source program (أرقام السطور).`,
      `اسمها كمان <b>scanning</b>: سيل الحروف بيتقري من الشمال لليمين ويتجمّع في tokens. والـ keywords بيتعرفوا هنا.`,
      `الـ <b>Token مقابل الـ lexeme</b> (من نوتس المحاضرة): الـ token هو category منطقية (id، relop، number)؛ الـ lexeme هو الـ string الحقيقي نفسه (زي <code>distance</code>). <code>if distance &gt;= rate * (time1 – time0) then distance := maxdist;</code> → <code>if id relop id * ( id – id ) then id := id ;</code>`
    ] },
    { h: `الـ Alphabets والـ strings`, pts: [
      `الـ <b>alphabet (Σ)</b> هو set محدودة، مش فاضية، ومرتّبة من الـ symbols أو الحروف أو الـ characters.`,
      `الـ <b>string</b> (وبيتقال لها word أو token) هي sequence محدودة من symbols من alphabet. <code>011</code> string طولها 3 على Σ = {0,1}؛ <code>0101</code> طولها 4؛ <code>for</code> string طولها 3 على alphabet الـ C++.`,
      `مجموعة من الـ strings اسمها <b>language</b>. الـ integers بتستخدم الـ alphabet من 0–9؛ أسماء الـ variables بتستخدم حروف وأرقام (وممكن underscore).`
    ] },
    { h: `العمليات على الـ languages`, pts: [
      `الـ <b>Union</b>: {abc, ab, ba} ∪ {ba, bb} = {abc, ab, ba, bb}. الـ union عملية commutative: L1 ∪ L2 = L2 ∪ L1 (الترتيب مش فارق).`,
      `الـ <b>Concatenation</b>: كل string من الأولى وبعدها كل string من التانية. {ab, c}{d, ef} = {abd, abef, cd, cef}.<br>لو L1 = {a,b}، L2 = {0,11}: يبقى L1L2 = {a0, a11, b0, b11} لكن L2L1 = {0a, 0b, 11a, 11b}. يعني <b>L1L2 ≠ L2L1: الترتيب فارق في الـ concatenation</b>.`,
      `الـ <b>Kleene closure</b> Σ*: صفر أو أكتر من الـ concatenations. {a}* = {ε, a, aa, aaa, …}.`,
      `الـ <b>ε</b> هي الـ empty string (طولها 0). {ε} دي set فيها element واحد. هي <b>مش</b> الـ empty set Φ.`,
      `الـ <b>Positive closure</b> Σ+: واحد أو أكتر. {a}+ = {a, aa, aaa, …}.`,
      `الـ <b>Or operator</b>: a|b|c = {a, b, c}.`
    ] },
    { h: `الـ Regular expressions`, pts: [
      `على X = {a,b,c}، أمثلة على regular expressions: <code>ab*</code>، <code>a|b|c*</code>.`,
      `الأولوية (precedence): الـ <b>*</b> الأقوى، بعدها الـ <b>concatenation</b>، بعدها الـ <b>|</b>. يعني <code>a|ab*</code> معناها <code>a|(a(b*))</code>.`,
      `أمثلة: 0|1 = {0,1}؛ 0* = {ε,0,00,…}؛ (0|1)(0|1) = {00,01,10,11}؛ 0|0*1 = {0,1,01,001,…}؛ b واحدة بالظبط على {a,b,c}: (a|c)*b(a|c)*.`
    ] },
    { h: `الخواص الجبرية (algebraic properties) للـ regular expressions`, pts: [
      `فخاخ الامتحان: <b>aε = εa = a</b> (مش ε). <b>Yε = εY</b> (فجملة "Yε ≠ εY" غلط). <b>(X|Y)* ≠ X*|Y*</b>: الـ (X|Y)* فيها XY، لكن X*|Y* مفيهاش.`
    ] },
    { h: `الـ Finite automata`, pts: [
      `الـ finite automata <b>بتتعرّف على الـ tokens</b> اللي الـ regular expression بيوصفها، وممكن تتحوّل لـ algorithm يعمل matching للـ input strings.`,
      `الـ finite automaton هو machine فيها <b>عدد محدود من الـ states</b> و<b>عدد محدود من الـ transitions</b> بينهم. الـ state دايرة، والـ transition سهم عليه input token، والـ start state داخل عليها سهم "start"، والـ final (accept) state دايرة مزدوجة.`,
      `الـ FA بتاع <b>01</b>: q0 –0→ q1 –1→ (q2).`,
      `<b>a*</b>: state واحدة هي start و final مع بعض وعليها loop بـ a. <b>a+</b>: q0 (عليها loop بـ a) –a→ (q1). <b>(a|b)*</b>: state واحدة start+final عليها loop بـ a,b.`,
      `<b>1*01(0|1)*</b>: q0 (loop بـ 1) –0→ q1 –1→ (q2) (loop بـ 0,1).`
    ] },
    { h: `الـ NFA مقابل الـ DFA` }
  ],
  cards: [
    `الـ Input: الـ source code (حروف). الـ Output: list من الـ tokens.`,
    `بيشيل الـ comments والـ white space؛ وبيربط رسايل الأخطاء بالـ source.`,
    `set محدودة، مش فاضية، ومرتّبة من الـ symbols.`,
    `sequence محدودة من symbols من alphabet (وبيتقال لها word أو token).`,
    `set من الـ strings على alphabet.`,
    `أيوه: L1 ∪ L2 = L2 ∪ L1.`,
    `لأ: {a,b}{0,11} = {a0,a11,b0,b11} لكن {0,11}{a,b} = {0a,0b,11a,11b}.`,
    `{ε, a, aa, aaa, ...} (صفر أو أكتر).`,
    `{a, aa, aaa, ...} (واحد أو أكتر).`,
    `a (الـ ε محايدة في الـ concatenation).`,
    `s*`,
    `s+ (وكمان = s*s)`,
    `الـ * الأعلى، بعدها الـ concatenation، بعدها الـ |.`,
    `بتتعرّف على الـ tokens اللي الـ regular expressions بتوصفها.`,
    `الـ DFA مينفعش يستخدمها؛ الـ NFA ينفع.`
  ],
  qa: [
    `هي أول phase في الـ compiler. بتقرا حروف الـ input وتطلّع sequence من الـ tokens للـ parser، وبتشيل الـ comments والـ white space (blank، tab، newline)، وبتربط رسايل الأخطاء بالـ source program.`,
    `(a|b)*a(a|b)*a(a|b)* ; b*ab*ab* ; (a|b)*a(a|b)*b(a|b)* | (a|b)*b(a|b)*a(a|b)* ; (a|b)* ; b* | ab* ; (a|b)*(aa|bb)(a|b)* ; a*ba*ba* | a*ba*ba*ba* (من Sheet One).`,
    `الـ q0 عليها loop بـ b؛ q0 --a--> q1؛ الـ q1 عليها loop بـ a؛ q1 --c--> q2 و q1 --d--> q2؛ والـ q2 هي الـ final state.`,
    `الـ q0 عليها loop بـ a,b؛ q0 --c--> q1 (final، وعليها loop بـ c)؛ q0 --d--> q2 (final، وعليها loop بـ d).`,
    `الـ DFA: مفيهوش ε transitions، فيه next state واحدة بالظبط لكل (state, input)، أسرع في التشغيل، والـ next state محددة بوضوح. الـ NFA: ممكن يستخدم ε transitions، صفر أو أكتر من الـ next states لكل (state, input)، أبطأ، وكل pair ممكن يبقى ليها next states كتير محتملة.`
  ],
  quiz: [
    [`الـ machine code ده الـ output النهائي للـ compiler، مش الـ input بتاع الـ scanner.`, `معكوسة.`, `صح.`, `(c) بس هي الصح.`],
    [`صح، بس دي نص الإجابة بس.`, `صح، بس دي نص الإجابة بس.`, `الـ SDT تبع الـ semantic analysis.`, `صح. الـ regular expressions بتوصف الـ tokens والـ finite automata بتتعرّف عليها.`],
    [`متأخر أوي.`, `دي مش phase من المحاضرة.`, `صح. الـ keywords دي tokens.`, `الـ parser بيستلم الـ keywords وهي متعرّفة خلاص كـ tokens.`],
    [`صح.`, `لأ.`, `كلمة مبهمة أوي.`, `دي كلمة من الـ networking.`],
    [`غلط. ده فخ الامتحان: الـ ε هي العنصر المحايد، مش "صفر".`, `صح. sε = s = εs.`, `لأ.`, `لأ.`],
    [`غلط. الـ (X|Y)* فيها XY، واللي X*|Y* مش بتقدر تطلّعه.`, `صح. الـ X*|Y* بتطلّع بس strings من X لوحدها أو من Y لوحدها.`, `مش دي فكرة السؤال.`, `ملهاش معنى.`],
    [`دي L1L2.`, `صح. كل string من L2 وبعدها كل string من L1.`, `ده الـ union.`, `ناقص combinations.`],
    [`صح. الأقواس ملهاش لازمة (الـ * أقوى من الـ concatenation) والـ | commutative.`, `الـ | commutative: s|t = t|s.`, `الـ (b)*(c) معناها b*c.`, `ملهاش علاقة.`],
    [`دي <b>على الأقل</b> اتنين a.`, `صح. مسموح بـ b's بس حوالين الـ a's الاتنين.`, `بتجبر الـ a's يبقوا الأول وجنب بعض.`, `أي عدد من الـ a's.`],
    [`دي بتقبل a* (ومعاها ε).`, `صح. لازم نقرا a واحدة على الأقل قبل ما نوصل للـ final state.`, `بتقبل "a" بس.`, `دي (a|b)*.`],
    [`ده concatenation.`, `صح.`, `الـ ε مش موجودة.`, `لأ.`],
    [`غلط. L1L2 ≠ L2L1.`, `صح. الترتيب فارق في الـ concatenation (ومش فارق في الـ union).`, `لأ.`, `لأ.`]
  ],
  extra: [
    [`كده ناقص identifiers، زي maxdist أو واحد من متغيرات الـ time.`, `الـ 5 دي عدد الـ lexemes <b>المختلفة</b>. الـ distance ظاهرة مرتين وكل مرة ليها id token لوحدها.`, `صح. if id relop id * ( id – id ) then id := id ; بتدّي distance، rate، time1، time0، distance، maxdist.`, `الـ "if" والـ "then" دول keywords، مش ids.`],
    [`صح. الـ * الأقوى، بعدها الـ concatenation، بعدها الـ |.`, `كده إديت الـ | أولوية أعلى من الـ concatenation، وده بالعكس.`, `الـ * بتتطبّق على b بس، مش على ab كلها.`, `مفيش star حوالين الـ expression كله.`],
    [`الـ 0*1 لازم تخلص بـ 1، والاختيار الشمال هو 0 واحدة بس.`, `كل string من 0*1 بتخلص بـ 1، والـ string التانية الوحيدة هي 0.`, `مش 0 ومش بتخلص بـ 1.`, `صح. 0*1 بـ اتنين 0. الـ language هي {0, 1, 01, 001, …}.`],
    [`بعد 1,1,0 بنبقى في q1، والـ q1 مفيهاش transition على 0، فبتترفض.`, `صح. 1,1 loop على q0؛ 0 → q1؛ 1 → q2 (final)؛ 0 بتلف على q2. فبتخلص في الـ final state.`, `بتخلص في q1، ودي مش final. لازم 01 تظهر.`, `بتقف في q1، مش الـ final state q2.`],
    [`في الاتنين: a واحدة.`, `في الاتنين.`, `صح. الـ Kleene closure صفر أو أكتر من الـ concatenations، فبتشمل الـ empty string؛ الـ positive closure واحد أو أكتر.`, `الـ Φ دي set، مش string. ومفيش closure فيهم فيها Φ كـ element.`],
    [`صح: الـ | commutative.`, `صح: الـ * idempotent.`, `صح بالتعريف (وكمان = s*s).`, `ده الاختيار الصح: الخاصية دي غلط. الـ concatenation بيتوزّع على الـ |، فـ r(s|t) = rs|rt.`],
    [`صح. ده شغل الـ parser (الـ syntax analysis).`, `موجودة: الـ blank والـ tab والـ newline بيتشالوا.`, `موجودة: مثلًا بأرقام السطور.`, `موجودة: الـ keywords بتتعرف أثناء الـ scanning.`],
    [`الـ set مفيهاش تكرار؛ الـ ba بتظهر مرة واحدة.`, `صح. كل string من أي set فيهم، والـ ba بتتعد مرة واحدة.`, `ده الـ intersection، مش الـ union.`, `ده الـ concatenation بتاع الـ two languages.`],
    [`الـ ε دي string طولها 0. والـ {ε} set فيها element واحد، إنما الـ Φ مفيهاش ولا واحد.`, `صح. المحاضرة بتأكد إن الـ ε مش هي الـ Φ.`],
    [`معكوسة. الجدول بيقول إن الـ DFA بياخد وقت أقل والـ NFA أكتر.`, `صح. الـ DFA فيه next state واحدة بالظبط لكل input، فبيشغّل أي input string في وقت أقل.`]
  ]
};

AR.compiler.lectures["3"] = {
  notes: [
    { h: `إيه اللي يخلّي الـ automaton يبقى NFA؟`, pts: [
      `الـ NFA (Non-Deterministic Finite Automaton) بيبقى فيه <b>واحدة أو أكتر</b> من الصفات دي:`,
      `1) <b>فيه ε</b> (transition بالـ empty string).`,
      `2) <b>فيه loop على input symbol وبعدها transition بنفس الـ input symbol</b>. مثال: q0 عليها loop على 0,1 و q0 –0→ q1 –1→ (q2). على 0، الـ q0 ممكن تفضل مكانها أو تروح q1.`,
      `3) <b>فيه أكتر من path لنفس الـ input string</b> اللي بيعرف يقبله (جرّب 001 على الـ automaton بتاع السلايد A/B/C: A عليها loop على 0,1؛ A –0→ C؛ A –1→ B؛ B –1→ C؛ C عليها loop على 0,1).`,
      `يعني <b>الـ loop لوحده مش بيخلّي الـ automaton non-deterministic</b>. الـ DFA ممكن يبقى فيه loops. وكمان إن يكون فيه أكتر من accept state مش بيخليه NFA.`
    ] },
    { h: `الـ Transition tables`, pts: [
      `الـ <b>transition table</b> هو طريقة نكتب بيها الـ automaton في جدول: الصفوف = الـ states، الأعمدة = الـ input symbols، الخانات = الـ next state(s)، و "-" = مفيش transition.`
    ] },
    { h: `تحويل NFA → DFA (subset construction) بطريقة المحاضرة`, pts: [
      `<b>Step 1</b>: اعمل أول transition table <b>وفيه عمود ε</b> (كل state بتوصل لنفسها بالـ ε).`,
      `<b>Step 2</b>: اعمل تاني table <b>من غير ε</b>: ابدأ من الـ start state (الـ ε-closure بتاعها)، وأي SET جديدة من الـ states تظهر في خانة تبقى row جديد. كرّر لحد ما مفيش sets جديدة تظهر.`,
      `<b>Step 3</b>: ارسم الـ DFA. أي set فيها final state من الأصل تبقى final. الخانة الفاضية (-) معناها dead state أو ببساطة مفيش transition.`,
      `مثال السلايد: A (loop على 0,1) –0→ (B).`
    ] },
    { h: `NFA امتحان محلول 1 (جه في امتحانات 2021–2025)`, pts: [
      `الـ NFA: الـ start هو 1؛ الـ final هو 3. 1 –0→ 3؛ 3 –0→ 1؛ 3 –1→ 3 (loop)؛ 3 –1→ 2؛ 2 –0→ 3. (بيترسم برضه بالـ states S, R, M.)`,
      `<b>ليه non-deterministic؟</b> الـ state 3 عليها loop على 1 وكمان transition بنفس الـ symbol 1 للـ state 2، فالـ (3,1) ليها اتنين next states.`
    ] },
    { h: `NFA امتحان محلول 2 (فيه ε)، امتحان 2024/25`, pts: [
      `الـ NFA: الـ start والـ final هو 1؛ 1 –b→ 2؛ 1 –ε→ 3؛ 2 –a→ 2؛ 2 –a,b→ 3؛ 3 –a→ 1.`,
      `الـ ε-closures: E(1) = {1,3}، E(2) = {2}، E(3) = {3}. يبقى الـ DFA بيبدأ من {1,3}. الـ final states في الـ DFA = اللي فيها 1.`
    ] }
  ],
  cards: [
    `فيه ε transition؛ أو loop على symbol ومعاه transition تاني بنفس الـ symbol؛ أو أكتر من path لنفس الـ string.`,
    `لأ. الـ DFA ممكن يبقى فيه loops.`,
    `لأ. الـ ε لوحدها كفاية.`,
    `لأ. ممكن يبقى فيه أكتر من واحدة.`,
    `طريقة نكتب بيها الـ automaton في جدول: states × input symbols → next state(s).`,
    `أيوه، بالـ subset construction.`,
    `الـ ε-closure بتاعة الـ start state بتاعة الـ NFA.`,
    `أي set فيها final state من الأصل.`,
    `NFA.`,
    `لأ. الـ ε مش بتستهلك input، و sε = s.`
  ],
  qa: [
    `إنه يكون فيه ε transition؛ أو فيه loop على input symbol وبعده transition بنفس الـ input symbol؛ أو فيه أكتر من path لنفس الـ input string.`,
    `{1}: 0->{3}، 1->dead. {3}: 0->{1}، 1->{2,3}. {2,3}: 0->{1,3}، 1->{2,3}. {1,3}: 0->{1,3}، 1->{2,3}. الـ start هو {1}؛ والـ final هم {3} و {2,3} و {1,3}.`,
    `A: 0->{A,B}، 1->A. {A,B}: 0->{A,B}، 1->A. الـ start هو A، والـ final هو {A,B}. بيقبل الـ strings اللي بتخلص بـ 0.`,
    `{0}: a->{1}، b->{2}. {1}: b->{3}. {2}: a->{2,3}. {2,3}: a->{2,3}. {3}: مفيش. الـ final: {3} و {2,3}. الـ language هي ab | ba+.`
  ],
  quiz: [
    [`صح. الـ ε transitions موجودة في الـ NFAs بس.`, `الـ DFA ممكن يبقى فيه أكتر من accept state.`, `الـ DFA ممكن يبقى فيه loops. اللي بيعمل non-determinism هو loop وبعدها transition على نفس الـ symbol بالظبط.`, `(a) بس هي اللي دايماً بتعمل كده.`],
    [`الـ DFA مينفعش يستخدم ε.`, `صح.`, `ده مش مصطلح أصلاً.`, `(b) هي الصح.`],
    [`صح. مثلاً الـ DFA بتاع 1*01(0|1)* فيه loops على q0 و q2.`, `الـ loops عادي طالما كل (state, symbol) ليها next state واحدة بالظبط.`, `أي loop عادي.`, `الـ DFA عمره ما بيبقى فيه ε.`],
    [`كده نسيت الـ edge 3 --1--> 2.`, `كده نسيت الـ self-loop.`, `صح. الـ 3 والـ 2 الاتنين بنوصلهم على 1.`, `فيه transitions على 1.`],
    [`صح. 2 --0--> 3 و 3 --0--> 1.`, `كده نسيت 3 --0--> 1.`, `كده نسيت 2 --0--> 3.`, `ده الـ transition على 1.`],
    [`لازم تاخد الـ ε-closure.`, `صح. E(1) = {1,3}.`, `الـ 1 نفسها جوه الـ closure كمان.`, `الـ 2 مش بنوصلها بالـ ε.`],
    [`كده نسيت 3 --a--> 1 والـ closure بتاع 1.`, `كده نسيت 2 --a--> 2 و 2 --a--> 3.`, `صح. الـ 2 بتدّي {2,3}؛ والـ 3 بتدّي 1، والـ ε-closure بتاعها {1,3}. الـ union = {1,2,3}.`, `فيه a-transitions.`],
    [`كل automaton فيه final states.`, `صح. الـ (A,0) ليها اتنين next states: A و B.`, `مفيش ε edge في الرسمة.`, `ملهوش علاقة.`],
    [`الـ ε-closures بتحل موضوع الـ ε.`, `صح (subset construction).`, `ممكن يبقى فيه states أكتر (لحد 2^n).`, `الـ language بتفضل زي ما هي.`],
    [`الـ ε مش بتستهلك input؛ والـ concatenation مع ε مش بيغيّر حاجة (sε = s).`, `صح (دي إجابتنا؛ مفيش model answer رسمي). الـ ε move بتغيّر الـ state من غير ما تقرا input، فالـ language بتتكتب بنفس الشكل.`, `الـ DFA مفيهوش ε أصلاً.`, `لأ.`]
  ],
  extra: [
    [`ده الـ transition على 0.`, `كده نسيت 3 –1→ 2.`, `الـ state 1 ملهاش move على 1، بس الـ state 3 ليها.`, `صح. الـ 1 مش بتضيف حاجة على 1؛ والـ 3 بتروح للـ 3 والـ 2 الاتنين.`],
    [`صح. {1}، {3}، {2,3}، {1,3}؛ وكل set ما عدا {1} فيها الـ final state 3.`, `أي set فيها final state من الأصل بتبقى final، مش {3} بس.`, `كده نسيت الـ start state {1}.`, `الـ {2} لوحدها عمرها ما بتظهر: الـ 3 على 1 دايماً بتجيب 2 مع 3.`],
    [`لازم تاخد الـ ε-closure بتاعة 1، واللي فيها 3 كمان.`, `صح. 3 –a→ 1، و E(1) = {1,3}.`, `الـ state 3 ملهاش a-loop؛ هي بتروح لـ 1.`, `ده الناتج من {2,3} على a، اللي بيدخل فيه moves الـ 2 كمان.`],
    [`next state واحدة بس يبقى deterministic.`, `الـ self-loop لوحده مش بيعمل non-determinism.`, `صح. على a، الـ Q ممكن تفضل في Q أو تروح T: يعني اتنين next states.`, `الـ transition الناقص (مفيش next state) مش هو العلامة اللي في المحاضرة للـ non-determinism.`],
    [`0 –a→ 1 –b→ 3، وبعدين 3 ملهاش move على a: مرفوض.`, `0 –b→ 2 –a→ {2,3}، وبعدين ولا واحدة فيهم ليها b-move: مرفوض.`, `بعد a بنبقى في 1، ومالهاش a-move: مرفوض.`, `صح. 0 –b→ 2، وبعدين كل a بتدّي {2,3}، واللي فيها الـ final state 3. الـ language هي ab | ba+.`],
    [`صح. بيخلص بـ 0، فالـ DFA بيقف في {A,B}، وهي final.`, `آخر 1 بيرجّع {A,B} لـ A، ودي مش final.`, `بيفضل في A.`, `الـ 0 بتوصل {A,B}، بس الـ 1 بترجّع لـ A.`],
    [`الـ rows بتيجي من الـ sets اللي بنوصلها فعلاً، مش من الـ states الأصلية.`, `صح. ابدأ من (الـ ε-closure بتاعة) الـ start state وكرّر لحد ما مفيش sets جديدة تظهر.`, `الـ sets اللي مش final محتاجة rows برضه (زي {2} و {3} في مثال الـ ε-NFA).`, `التاني table ملوش عمود ε.`],
    [`الـ acceptance بتعتمد على إن الـ set فيها final state من الأصل، مش على الخانات الفاضية.`, `الـ DFA مفيهوش ε transitions.`, `صح. ده اللي بيقوله Step 3 في الطريقة.`, `التحويل ممكن دايماً.`],
    [`الـ {1} مفيهاش الـ final state الأصلية 3.`, `صح. الـ sets اللي فيها 3 بس هي اللي final: {3} و {2,3} و {1,3}.`],
    [`صح. الـ {1,3} فيها الـ final state الأصلية 1، فهي start و final مع بعض (بنعلّم عليها →*).`, `أي set في الـ DFA فيها final state من الأصل بتبقى final، والـ {1,3} فيها 1.`]
  ]
};

AR.compiler.lectures["4"] = {
  notes: [
    { h: `ليه الـ syntax analysis محتاج CFGs`, pts: [
      `الـ Syntax analysis (<b>parsing</b>) هو <b>تاني phase</b>. الـ lexer بيلاقي الـ tokens بالـ regular expressions، بس <b>مايقدرش يتشيك على الـ syntax</b> بتاع الجملة بسبب حدود الـ regular expressions.`,
      `الـ regular expressions <b>ماتقدرش تتشيك على الـ tokens المتوازنة</b> زي الأقواس، فالـ phase دي بتستخدم <b>context-free grammar (CFG)</b>.`,
      `الـ parser بياخد الـ <b>token stream</b> من الـ lexer، ويقارنه بالـ production rules عشان يكتشف الـ errors، ويطلّع <b>parse tree</b>. الـ Parsing = عملية إننا نلاقي parse tree لـ string من الـ tokens.`
    ] },
    { h: `المكونات الأربعة للـ CFG`, pts: [
      `<b>Non-terminals (V)</b>: syntactic variables بتمثّل sets من الـ strings.`,
      `<b>Terminals (Σ)</b>: الـ tokens، الرموز الأساسية اللي الـ strings بتتكوّن منها.`,
      `<b>Productions (P)</b>: بتوضّح إزاي الـ terminals والـ non-terminals بيتجمعوا. كل واحدة ليها left side (non-terminal)، وسهم، و right side (tokens و/أو non-terminals).`,
      `<b>Start symbol (S)</b>: المكان اللي الـ derivation بيبدأ منه. الـ strings بتتعمل derive من الـ start symbol إننا نفضل نبدّل non-terminal بالـ right side بتاع واحدة من الـ productions بتاعته.`,
      `مفيش حاجة اسمها <b>"end symbol"</b> في الـ CFG (اختيار غلط مشهور في الامتحانات).`,
      `مثال: S→ABC، A→a|Aa، B→b|Bb، C→c. الـ terminals {a,b,c}؛ الـ non-terminals {S,A,B,C}؛ الـ start هو S.`
    ] },
    { h: `الـ Derivations`, pts: [
      `الـ <b>derivation</b> هو سلسلة production rules بنطبّقها عشان نوصل للـ input string. في كل خطوة بنقرر (1) أنهي non-terminal هنبدّله و(2) أنهي production هنستخدمها.`,
      `<b>Leftmost derivation</b>: دايماً بدّل الـ non-terminal اللي على أقصى الشمال (امشي من الشمال لليمين). <b>Rightmost</b>: دايماً بدّل اللي على أقصى اليمين (امشي من اليمين للشمال).`,
      `الـ top-down parser بيطلّع <b>leftmost derivation</b>. الـ Bottom-up parsers (shift-reduce, LR) بيطلّعوا rightmost derivation بالعكس.`
    ] },
    { h: `مثال: int*int مع E→TX, X→+E|ε, T→int Y|(E), Y→*T|ε` },
    { h: `الـ Parse trees`, pts: [
      `الـ <b>parse tree</b> هو رسمة بتوضّح الـ derivation. الـ <b>start symbol هو الـ root</b>.`,
      `<b>كل الـ leaf nodes بتبقى terminals</b>؛ <b>كل الـ interior (non-leaf) nodes بتبقى non-terminals</b>؛ والـ <b>in-order traversal بيدّيك الـ input string الأصلي</b>.`,
      `الـ parse tree بيوضّح الـ <b>associativity والـ precedence</b>: أعمق sub-tree بيتحسب الأول، فالـ operator بتاعه ليه precedence على الـ operators اللي في الـ parent nodes.`,
      `السلايدز بتبني الـ leftmost tree لـ id+id*id خطوة خطوة: E→E*E، E→E+E*E، E→id+E*E، E→id+id*E، E→id+id*id.`,
      `إجابة الـ revision sheet الرسمية: "A leftmost parsing tree grows from the <b>right</b> side" (جاوب الـ MCQ/T-F كده).`
    ] },
    { h: `الـ Ambiguity`, pts: [
      `الـ grammar بيبقى <b>ambiguous</b> لو فيه <b>أكتر من parse tree</b> (أكتر من leftmost، أو أكتر من rightmost، derivation) لـ <b>string واحد على الأقل</b>.`,
      `إن يبقى فيه leftmost derivation واحد و rightmost derivation واحد لنفس الـ string ده مش بيثبت الـ ambiguity. لازم يبقى عندك اتنين LEFTMOST مختلفين (أو اتنين rightmost مختلفين) derivations/trees.`,
      `لو فيه leftmost (أو rightmost) tree واحد بس لكل sentence، يبقى الـ grammar <b>unambiguous</b>.`,
      `مثال: E→E+E | E–E | id ده ambiguous. الـ id–id+id ليها اتنين trees (تحت).`
    ] },
    { h: `إثباتات ambiguity زيادة من الشيتات` },
    { h: `الـ Left recursion`, pts: [
      `الـ grammar بيبقى <b>left-recursive</b> لو فيه non-terminal A ليه derivation فيه A نفسه كـ <b>left-most symbol</b>.`,
      `دي مشكلة للـ <b>top-down parsers</b>: بيبدأوا من الـ start symbol، ويفضلوا يعملوا expand لنفس الـ non-terminal اللي على الشمال، ومايعرفوش يقفوا إمتى فيدخلوا في <b>infinite loop</b>. عشان كده <b>الـ LL(1) مينفعش يتطبّق على left-recursive grammar</b>.`,
      `(1) A → Aα | β ده <b>immediate</b> left recursion. (2) S → Aα | β مع A ⇒ Sd ده <b>indirect</b> left recursion.`,
      `الـ A → Ab | c ده left-recursive.`
    ] },
    { h: `إزالة الـ left recursion` }
  ],
  cards: [
    `الـ regular expressions ماتقدرش تتشيك على الـ tokens المتوازنة زي الأقواس.`,
    `Non-terminals، terminals، productions، start symbol.`,
    `لأ.`,
    `إننا نلاقي parse tree لـ string من الـ tokens (وبيتسمى برضه syntax analysis).`,
    `الـ Input: stream من الـ tokens. الـ Output: parse (syntax) tree.`,
    `دايماً بدّل الـ non-terminal اللي على أقصى الشمال الأول.`,
    `Terminals.`,
    `Non-terminals.`,
    `الـ input string الأصلي.`,
    `أكتر من parse tree (اتنين leftmost أو اتنين rightmost derivations) لـ string واحد على الأقل.`,
    `non-terminal A الـ derivation بتاعه فيه A كـ left-most symbol.`,
    `الـ top-down parsers بيفضلوا في loop للأبد وهم بيعملوا expand لنفس الـ non-terminal.`,
    `A → βA', A' → αA' | ε`,
    `leftmost derivation.`,
    `Right (اليمين).`
  ],
  qa: [
    `الـ regular expressions (اللي الـ lexer بيستخدمها) ماتقدرش تتشيك على الـ tokens المتوازنة زي الأقواس، فماتقدرش تتشيك على الـ syntax بتاع الجملة. إنما الـ CFG يقدر يوصف structures متداخلة ومتوازنة.`,
    `LMD1: E => E+E => E-E+E => id-E+E => id-id+E => id-id+id (الـ root هو +، والـ left child هو id-id). LMD2: E => E-E => id-E => id-E+E => id-id+E => id-id+id (الـ root هو -، والـ right child هو id+id). يبقى فيه اتنين leftmost derivations/parse trees مختلفين لـ string واحد، يبقى الـ grammar ambiguous.`,
    `LMD1: S => 0A => 00AA => 001SA => 0011BA => 00110A => 001101. LMD2: S => 0A => 00AA => 001A => 0011S => 00110A => 001101. اتنين leftmost derivations (اتنين parse trees)، يبقى الـ grammar ambiguous.`,
    `E -> TE' و E' -> +TE' | epsilon.`,
    `LMD1: S => AB => AAB => aAB => aaB => aaTc => aaac (الـ A بتدّي aa، والـ T بتدّي a). LMD2: S => AB => aB => aTc => aaTc => aaac (الـ A بتدّي a، والـ T بتدّي aa). اتنين leftmost derivations وtrees مختلفين، يبقى الـ grammar ambiguous.`
  ],
  quiz: [
    [`عامة أوي.`, `الـ recognizer بيقول yes/no بس.`, `صح.`, `ده الـ lexical analysis.`],
    [`صح.`, `دول الـ interior nodes.`, `ده الـ root.`, `الـ productions هي الوصلات من الـ parent للـ children.`],
    [`جزء من الـ CFG.`, `جزء من الـ CFG.`, `صح. الـ CFG فيه V و Σ و P و S بس.`, `جزء من الـ CFG.`],
    [`الـ Ambiguous معناها أكتر من tree.`, `صح.`, `دي مش صفة من صفات الـ grammar.`, `دي مش صفة من صفات الـ grammar.`],
    [`الـ rule دي لوحدها بتدّي tree واحد لكل string (c, cb, cbb…).`, `صح. الـ A ظاهرة كـ left-most symbol في الـ right side بتاعها هي.`, `دي مش صفة من صفات الـ grammar.`, `(b) بس.`],
    [`صح. الـ scanner هو اللي بيطلّعه.`, `ده الـ output بتاع الـ syntax analysis.`, `ده الـ output بتاع الـ semantic analysis.`, `ده الـ output بتاع الـ code generation.`],
    [`لأ.`, `لأ.`, `صح.`, `الـ regular grammars/expressions بتوصف الـ lexical analysis.`],
    [`دي مش الإجابة الرسمية.`, `لأ.`, `صح حسب إجابة الـ revision sheet الرسمية (Q52) وامتحان 2023/24.`, `لأ.`],
    [`أي grammar unambiguous برضه فيه الاتنين. ده مش بيثبت حاجة.`, `ده كلام عن الـ language، مش عن الـ ambiguity.`, `صح.`, `(c) هي الصح.`],
    [`صح (واحدة من الاتنين؛ التانية هي S ⇒ aaB ⇒ aab)، يبقى الـ grammar ambiguous.`, `ده بيعمل derive لـ ab، مش aab.`, `الـ B → b بس.`, `مفيش production اسمها S → AaB.`],
    [`الـ β هي aB (الاختيار اللي مش recursive)، مش d.`, `صح. A → Aα | β مع α = d و β = aB.`, `ده بيغيّر الـ language.`, `دي مش CFG production.`],
    [`الـ top-down parser هيفضل في loop للأبد على A → Aα.`, `صح. شيل الـ left recursion الأول.`, `برضه هيفضل في loop.`, `الـ LL(1) ده predictive ومفيهوش backtracking.`]
  ],
  extra: [
    [`السرعة مش هي السبب المذكور.`, `صح. الـ CFG يقدر يوصف structures متداخلة ومتوازنة.`, `الـ Keywords الـ lexer بيتعرف عليها فعلاً.`, `الأقواس tokens، مش white space.`],
    [`ده تاني form في الـ LEFTMOST derivation (اتبدّلت T الأول).`, `ده بعد أول خطوة.`, `ده بعد تالت خطوة.`, `صح. E ⇒ TX، وبعدين الـ rightmost non-terminal اللي هو X بيتبدّل بـ ε، فيطلع T.`],
    [`صح. E ⇒ TX ⇒ int Y X ⇒ int * T X (Y → *T).`, `ده بعد تاني خطوة.`, `ده بعد رابع خطوة.`, `ده من الـ rightmost derivation، اللي الـ X اتشالت فيه بدري.`],
    [`كده ضاع الاختيار الـ recursive التاني Aa.`, `الـ Bα والـ a هم أجزاء الـ α؛ مكانهم في A'، والـ β = a مكانها في A.`, `صح. β = a؛ والـ α's هي Bα و a، كل واحدة وراها A'، بالإضافة لـ ε.`, `ده بيغطي الـ strings اللي فيها تكرار واحد بس.`],
    [`الـ α والـ β متبدلين: الـ β هي T والـ α هي +T.`, `صح. A → Aα | β بتبقى A → βA', A' → αA' | ε مع α = +T و β = T.`, `من غير alternative تاني، الـ E عمرها ما هتقف عن الـ derivation، وده مش الـ pattern بتاع المحاضرة A → βA', A' → αA' | ε.`, `من غير E' → ε الـ derivation عمره ما هيقف.`],
    [`الـ Immediate هو A → Aα، يعني الـ non-terminal نفسه أول symbol في الـ production بتاعته على طول.`, `الـ S بترجع تظهر على الـ LEFT، عن طريق A.`, `S ⇒ Aα ⇒ Sdα، يعني الـ S ليها derivation هي نفسها فيه الـ left-most symbol.`, `صح. الـ left recursion بيعدّي من خلال non-terminal تاني (A).`],
    [`صح. الـ A بتدّي aa، والـ B بتدّي bbb، والـ C بتدّي c. الـ language هي a واحدة أو أكتر، و b واحدة أو أكتر، وبعدين c واحدة.`, `الـ C → c بتدّي c واحدة بالظبط.`, `الـ A لازم تطلّع a واحدة على الأقل.`, `مفيش حاجة ينفع تيجي بعد C.`],
    [`ده الـ tree اللي الـ + فيه في الـ root.`, `الـ parse tree دايماً بيوضّح ترتيب: أعمق sub-tree الأول.`, `صح. الـ + sub-tree هو الأعمق، فبيتحسب الأول؛ والـ – اللي في الـ root بييجي في الآخر.`, `المحاضرة بتقول إن الـ parse trees بتوضّح الـ precedence والـ associativity.`],
    [`صح. دي واحدة من خصائص الـ parse tree في المحاضرة، مع: الـ root = start symbol، الـ leaves = terminals، الـ interior nodes = non-terminals.`, `المحاضرة كاتبة دي كخاصية من خصائص الـ parse tree.`],
    [`المحاضرة بتستخدم الـ grammar ده كمثال على الـ UNAMBIGUOUS: الـ id+id*id ليها leftmost derivation واحد بس.`, `صح. الـ LMD الوحيد هو E ⇒ E+T ⇒ T+T ⇒ F+T ⇒ id+T ⇒ id+T*F ⇒ id+F*F ⇒ id+id*F ⇒ id+id*id.`]
  ]
};

AR.compiler.lectures["6"] = {
  notes: [
    { h: `الـ FIRST والـ FOLLOW`, pts: [
      `<b>FIRST(α)</b> = مجموعة الـ terminals اللي ممكن تبدأ بيها أي strings طالعة من α. ولو α ⇒* ε يبقى ε كمان بتدخل في FIRST(α).`,
      `في الـ predictive parsing، لو عندنا A → α | β، ولو FIRST(α) وFIRST(β) مفيش بينهم حاجة مشتركة (disjoint)، بنختار الـ A-production الصح بإننا نبص على الـ input symbol اللي جاي.`,
      `<b>FOLLOW(A)</b> = مجموعة الـ terminals a اللي ممكن تيجي على يمين A على طول في أي sentential form (S ⇒* αAaβ). لو A ممكن تبقى آخر symbol على اليمين، يبقى <b>$</b> في FOLLOW(A). والـ FOLLOW عمره ما بيكون فيه ε.`
    ] },
    { h: `قواعد الـ FIRST`, pts: [
      `1. لو X عبارة عن terminal، يبقى FIRST(X) = {X}.`,
      `2. لو X → Y1Y2…Yk، حط a في FIRST(X) لو a ∈ FIRST(Yi) وكانت ε موجودة في كل FIRST(Y1)…FIRST(Yi-1). ولو ε موجودة في كل FIRST(Yj)، ضيف ε لـ FIRST(X).`,
      `3. لو X → ε production موجودة، ضيف ε لـ FIRST(X).`
    ] },
    { h: `قواعد الـ FOLLOW`, pts: [
      `1. حط $ في FOLLOW(S)، وS هنا هو الـ start symbol.`,
      `2. لو A → αBβ، كل اللي في FIRST(β) ما عدا ε بيدخل في FOLLOW(B).`,
      `3. لو A → αB، أو A → αBβ وFIRST(β) فيها ε، يبقى كل اللي في FOLLOW(A) بيدخل في FOLLOW(B).`
    ] },
    { h: `الـ LL(1) grammars`, pts: [
      `الـ predictive parsers هي recursive-descent parsers مش محتاجة <b>backtracking</b> خالص. والـ grammars اللي نقدر نبني لها parser من النوع ده اسمها <b>LL(1)</b>.`,
      `أول <b>L</b>: بنقرا الـ input من الشمال لليمين (Left to right). تاني <b>L</b>: Leftmost derivation. والـ <b>1</b>: بنبص على input symbol واحد قدام (lookahead).`,
      `الـ G تبقى LL(1) لو وبس لو لكل زوج A → α | β: (1) α وβ مايطلعوش الاتنين strings بتبدأ بنفس الـ terminal؛ (2) واحد بس منهم على الأكتر ممكن يطلّع ε؛ (3) لو α ⇒* ε، يبقى β مايطلّعش أي string بيبدأ بـ terminal موجود في FOLLOW(A).`,
      `يعني باختصار: مفيش left recursion، مفيش ambiguity، ومفيش خانة في الجدول فيها entry-ين.`
    ] },
    { h: `بناء الـ predictive parsing table M`, pts: [
      `لكل production A → α:`,
      `1. لكل terminal a في FIRST(α)، ضيف A → α في M[A, a].`,
      `2. لو ε ∈ FIRST(α)، ضيف A → α في M[A, b] لكل b في FOLLOW(A) (ومعاهم $).`,
      `الخانات الفاضية معناها errors.`,
      `<b>الـ Parsing</b>: الـ stack بيبدأ S$ والـ input بيبقى w$. لو الـ top عبارة عن terminal بيساوي الـ input symbol، يبقى <b>match</b> (pop ونقدّم في الـ input). لو هو non-terminal A، بنبدّله بالـ right side بتاع M[A, a] (بنعمله push بحيث أول symbol يبقى فوق). بنعمل accept لما الاتنين يبقوا $.`
    ] },
    { h: `مثال 1: S → A, A → aB | Ad, B → b, C → g`, pts: [
      `بعد ما نشيل الـ left recursion: S → A, A → aBA', A' → dA' | ε, B → b, C → g.`
    ] },
    { h: `مثال 1: عمل parse لـ abd` },
    { h: `مثال 2: الـ expression grammar`, pts: [
      `E → TE', E' → +TE' | ε, T → FT', T' → *FT' | ε, F → (E) | id.`
    ] },
    { h: `جرامر الامتحان: S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε`, pts: [
      `FOLLOW(S): فيها $ (عشان هو الـ start)، و")" من U → (S)، وb من U → aSb.`,
      `FOLLOW(U): فيها FIRST(VW) − ε = {a, c}؛ وبما إن VW ممكن تختفي، بنضيف FOLLOW(S).`,
      `FOLLOW(V): فيها FIRST(W) − ε = {c}، وكمان FOLLOW(S) عشان W هي nullable. وFOLLOW(W) = FOLLOW(S).`,
      `مفيش خانة فيها entry-ين، يبقى الـ grammar ده LL(1). والـ parse الكامل لـ (dc)ac موجود في امتحان 2024/25 تحت.`
    ] }
  ],
  cards: [
    `الـ terminals اللي ممكن تبدأ بيها الـ strings الطالعة من α (وكمان ε لو α ⇒* ε).`,
    `الـ terminals اللي ممكن تيجي بعد A على طول؛ و$ لو A ممكن تبقى آخر حاجة على اليمين.`,
    `لأ.`,
    `$`,
    `FIRST(β) − {ε} ⊆ FOLLOW(B).`,
    `FOLLOW(A) ⊆ FOLLOW(B).`,
    `Left-to-right scan، وLeftmost derivation، وlookahead symbol واحد.`,
    `recursive-descent parser مش محتاج backtracking.`,
    `لكل terminal a في FIRST(α)، حط A → α في M[A,a].`,
    `لو ε ∈ FIRST(α)، حط A → α في M[A,b] لكل b في FOLLOW(A)، ومعاهم $.`,
    `Error.`,
    `لما الـ stack والـ input يبقوا الاتنين $.`,
    `{(, id}`,
    `{+, *, ), $}`
  ],
  qa: [
    `لكل زوج productions A -> alpha | beta: مفيش terminal a بيبدأ بيه strings طالعة من alpha ومن beta مع بعض؛ وواحد بس على الأكتر من alpha وbeta بيطلّع الـ empty string؛ ولو alpha بيطلّع الـ empty string، يبقى beta مايطلّعش أي string بيبدأ بـ terminal موجود في FOLLOW(A).`,
    `لكل production A -> alpha: لكل terminal a في FIRST(alpha) حط A -> alpha في M[A,a]؛ ولو epsilon موجودة في FIRST(alpha)، حط A -> alpha في M[A,b] لكل b في FOLLOW(A) (وفي M[A,$] لو $ موجودة في FOLLOW(A)). وكل الخانات اللي فاضلة تبقى errors.`,
    `FIRST(E)=FIRST(T)=FIRST(F)={(,id}؛ وFIRST(E')={+,e}؛ وFIRST(T')={*,e}. وFOLLOW(E)=FOLLOW(E')={),$}؛ وFOLLOW(T)=FOLLOW(T')={+,),$}؛ وFOLLOW(F)={+,*,),$}.`,
    `الأول نشيل الـ left recursion: A -> bA', A' -> bcA' | e. الـ FIRST: S{a}, A{b}, A'{b,e}, B{d}. الـ FOLLOW: S{$}, A{d}, A'{d}, B{e}. الـ Parse: S -> aABe، match a، A -> bA'، match b، A' -> bcA'، match b، match c، A' -> e (على d)، B -> d، match d، match e، accept.`
  ],
  quiz: [
    [`صح.`, `الـ left recursion ممنوع أصلاً في LL(1).`, `لأ.`, `ده يبقى LR.`],
    [`صح. FIRST(E') − ε = {+}، وE' هي nullable فبنضيف FOLLOW(E) = {), $}.`, `ده FOLLOW(F).`, `ده FOLLOW(E) وFOLLOW(E').`, `ده FIRST(T).`],
    [`ده بيتحط تحت *.`, `صح. ")" ∈ FOLLOW(T') وT' عندها ε production.`, `")" موجودة في FOLLOW(T').`, `ده row غلط.`],
    [`ده بيتحط تحت id.`, `صح. FIRST((E)) = {(}.`, `ده row غلط.`, `فيه entry موجودة.`],
    [`ناقصها FIRST(A').`, `صح. FIRST(A') − ε = {d}؛ وA' هي nullable، فبنضيف FOLLOW(A) = {$}.`, `ده FIRST(B).`, `ده FIRST(A'). والـ FOLLOW عمره ما بيكون فيه ε.`],
    [`S كمان بتظهر جوه U → (S) وU → aSb.`, `صح. $ (عشان start)، و) من (S)، وb من aSb.`, `ده خالط معاه FOLLOW(U).`, `ده FIRST(S).`],
    [`V وW الاتنين nullable، فلازم نضيف FOLLOW(S) كمان.`, `صح. FIRST(VW) − ε زائد FOLLOW(S).`, `ناقصها FIRST(V) وFIRST(W).`, `ناقصها حاجات كتير.`],
    [`دي بتتحط تحت a بس.`, `صح. ")" ∈ FOLLOW(V) = {c, $, ), b}.`, `")" موجودة في FOLLOW(V).`, `ده row غلط.`],
    [`الـ Expand ده للـ non-terminals.`, `صح.`, `الـ Reduce ده action بتاع الـ bottom-up (LR).`, `بيحصل بس لو فيه mismatch.`],
    [`لأ.`, `صح.`, `ده الـ bottom-up (LR / shift-reduce).`, `لأ.`],
    [`صح. α = bc، وβ = b.`, `α وβ متبدّلين.`, `لسه left-recursive.`, `ده بيغيّر الـ language.`]
  ],
  extra: [
    [`ده FIRST(F).`, `ده FOLLOW(T) وFOLLOW(T'). ناقصه الـ * اللي جاية من FIRST(T').`, `ده FIRST(T'). والـ FOLLOW عمره ما بيكون فيه ε.`, `صح. T' → *FT' بتدّي * (FIRST(T') − ε)؛ وT' هي nullable، فبنضيف FOLLOW(T') = {+, ), $}.`],
    [`فيها T' → ε، عشان + ∈ FOLLOW(T').`, `صح. FIRST(TE') = {(, id}، وE معندهاش ε-production، فـ E ليها entries بس تحت ( وid.`, `فيها E' → ε، عشان $ ∈ FOLLOW(E').`, `فيها F → id.`],
    [`صح. M[E,id] وM[T,id] وM[F,id]؛ وبعدين match id، وT' → ε، وE' → ε، وaccept.`, `ده ترتيب bottom-up. الـ LL(1) بيعمل expand من الـ start symbol (leftmost derivation).`, `مينفعش نعمل match لـ id وفيه non-terminal (T) فوق الـ stack.`, `الـ top بتاع الـ stack بعد E → TE' هو T، مش E'.`],
    [`V هي nullable، فلازم نضيف FIRST(W) كمان.`, `V وW الاتنين nullable، فـ ε لازم تبقى في FIRST(VW).`, `صح. FIRST(V) − ε = {a}؛ وV هي nullable فبنضيف FIRST(W) − ε = {c}؛ والاتنين nullable فبنضيف ε.`, `ده FOLLOW(V).`],
    [`ده FIRST(W). والـ FOLLOW عمره ما بيكون فيه ε.`, `ده FOLLOW(V). مفيش حاجة بتيجي بعد W جوه S → UVW، فمش بنضيف c.`, `ده FOLLOW(U).`, `صح. W هي آخر symbol في S → UVW، فـ FOLLOW(W) = FOLLOW(S).`],
    [`الـ right side بيتعمله push بحيث أول symbol فيه يبقى فوق، مش بالعكس.`, `صح. الـ action اللي بعدها: match a.`, `ده الـ stack بعد ما نعمل match لـ a.`, `A' لازم يتعملها push هي كمان.`],
    [`الـ entry دي تحت b، مش d.`, `B لسه مش فوق الـ stack؛ لازم A' تتشال الأول.`, `صح. d ∈ FOLLOW(A') = FOLLOW(A) = FIRST(B) = {d}، فـ M[A', d] = A' → ε.`, `M[A', d] مش فاضية عشان A' هي nullable وd موجودة في FOLLOW(A').`],
    [`ولا alternative فيهم بيبدأ بـ A.`, `ولا alternative فيهم بيطلّع ε.`, `الـ FOLLOW عمره ما بيكون فيه ε.`, `صح. ده بيكسر أول شرط من شروط LL(1): α وβ مينفعش يبدأوا الاتنين بنفس الـ terminal.`],
    [`ε ممكن تبقى في FIRST(A)، لكن الـ FOLLOW بيجمع terminals بس (و$).`, `صح. الـ FOLLOW عمره ما بيكون فيه ε. لما A تبقى nullable، الـ ε بتروح في FIRST(A)، والـ table entries بتتحط تحت FOLLOW(A).`],
    [`صح. كل خانة في rows الـ S وU وV وW فيها production واحد على الأكتر.`, `الجدول اللي اتبنى في المحاضرة مفيهوش conflicts، يبقى الـ grammar ده LL(1).`]
  ]
};

AR.compiler.lectures["7"] = {
  notes: [
    { h: `الـ Semantic analysis`, pts: [
      `بيتأكد إن الـ declarations والـ statements بتاعة البرنامج <b>صح من ناحية المعنى (semantically correct)</b>.`,
      `بيستخدم <b>الـ syntax tree والـ symbol table</b> عشان يشوف البرنامج ماشي مع تعريف اللغة ولا لأ. بيجمع <b>type information</b> ويخزنها في الـ syntax tree أو الـ symbol table. والـ compiler بيستخدم ده بعدين في <b>intermediate-code generation</b>.`,
      `الـ Type checking بيتعمل أثناء الـ semantic analysis، يعني أثناء الـ <b>syntax-directed translation</b>. الـ Input: syntax tree. الـ Output: <b>annotated syntax tree</b> (parse tree بيبيّن قيم الـ attributes عند كل node).`
    ] },
    { h: `الـ Semantic errors اللي الـ analyzer لازم يكتشفها`, pts: [
      `Type mismatch.`,
      `Undeclared variable (متغير مش متعرّف).`,
      `Reserved identifier misuse (استخدام كلمة محجوزة غلط).`,
      `Multiple declaration لمتغير في نفس الـ scope.`,
      `الوصول لمتغير out-of-scope.`,
      `Actual and formal parameter mismatch.`
    ] },
    { h: `الـ Attribute grammar`, pts: [
      `نوع خاص من الـ CFG بنزوّد فيه معلومات إضافية (<b>attributes</b>) على واحد أو أكتر من الـ <b>non-terminals</b> بتوعه، عشان يدّي معلومات context-sensitive. كل attribute ليه domain واضح (integer, float, character, string, expressions).`,
      `بيدّي <b>semantics</b> للـ CFG ويقدر يوصف الـ syntax والـ semantics مع بعض. ولو بصّينا عليه كـ parse tree، يقدر ينقل قيم بين الـ nodes.`,
      `مثال: <code>E → E + T { E.value = E.value + T.value }</code>. هنا "value" دي attribute.`,
      `يعني الـ attribute grammar بيطلع لما <b>نربط attributes بكل non-terminal في الـ CFG</b>. والـ semantic analysis بيستخدم الـ <b>attribute</b> grammar عشان يحوّل الـ <b>syntax</b> tree لـ <b>annotated syntax</b> tree.`
    ] },
    { h: `الـ Syntax Directed Translation (SDT)`, pts: [
      `الـ SDT = <b>augmented rules بنضيفها للـ grammar عشان تسهّل الـ semantic analysis</b>.`,
      `المعلومات بتتنقل <b>bottom-up و/أو top-down</b> في الـ parse tree على شكل attributes متعلقة بالـ nodes. قواعد الـ SDT بتستخدم 1) الـ <b>lexical values</b> بتاعة الـ nodes، 2) <b>constants</b>، و3) الـ <b>attributes</b> بتاعة الـ non-terminals.`,
      `الطريقة العامة: نبني parse/syntax tree ونحسب قيم الـ attributes عند الـ nodes بإننا نزورها بترتيب معيّن. وغالباً ده ممكن يتعمل أثناء الـ parsing من غير ما نبني tree صريحة.`,
      `بشكل عام، الـ SDT بيربط 1) <b>مجموعة attributes بكل node</b> في الـ grammar و2) <b>مجموعة translation rules بكل production</b>، باستخدام attributes وconstants وlexical values. والنتيجة هي الـ annotated syntax tree.`
    ] },
    { h: `مثال SDT: 2 + 3 * 4`, pts: [
      `الـ 2 و3 و4 اسمهم <b>lexical values</b>.`,
      `بنحسب بـ <b>depth-first traversal واحد</b>. المعلومات بتمشي <b>bottom-up</b>: كل attributes الـ children بتتحسب قبل الـ parent.`,
      `الـ nodes اللي على الـ right-hand side ساعات بنكتبها بـ subscript 1 (E → E1 + T) عشان نفرّق الـ child عن الـ parent.`
    ] },
    { h: `الـ Synthesized مقابل الـ inherited attributes` },
    { h: `الـ Definite assignment analysis (نوتس المحاضرة، شيت المراجعة)`, pts: [
      `ده data-flow analysis بيتأكد إن المتغير دايماً بياخد قيمة قبل ما يتستخدم. المتغير بيبقى في حالة من تلات حالات:`,
      `<b>Definitely assigned</b>: متأكدين إنه أخد قيمة.`,
      `<b>Definitely unassigned</b>: متأكدين إنه ماخدش قيمة.`,
      `<b>Unknown</b>: ممكن يكون أخد قيمة وممكن لأ.`
    ] }
  ],
  cards: [
    `الـ syntax tree والـ symbol table.`,
    `الـ annotated syntax tree.`,
    `Type mismatch، undeclared variable، reserved identifier misuse، multiple declaration في نفس الـ scope، out-of-scope access، actual/formal parameter mismatch.`,
    `CFG متزوّد على الـ non-terminals بتوعه attributes عشان يدّي معلومات context-sensitive.`,
    `بإننا نربط attributes بكل non-terminal في الـ CFG.`,
    `Syntax Directed Translation.`,
    `Augmented rules بنضيفها للـ grammar عشان تسهّل الـ semantic analysis.`,
    `الـ lexical values بتاعة الـ nodes، والـ constants، والـ attributes بتاعة الـ non-terminals.`,
    `قيم الـ tokens اللي عند الـ leaves، زي 2 و3 و4 في 2+3*4.`,
    `بياخد قيمته من الـ child nodes بتاعته (بتطلع لفوق).`,
    `بياخد قيمته من الـ parent و/أو الـ siblings (بتنزل لتحت).`,
    `الـ Syntax directed translation (الـ semantic analysis).`,
    `متأكدين بنسبة 100% إن المتغير أخد قيمة.`,
    `المتغير ممكن يكون أخد قيمة وممكن لأ.`
  ],
  qa: [
    `الـ SDT بيضيف augmented rules للـ grammar عشان تسهّل الـ semantic analysis. بينقل المعلومات bottom-up و/أو top-down في الـ parse tree على شكل attributes متعلقة بالـ nodes. بيبني parse/syntax tree ويحسب قيم الـ attributes عند الـ nodes بإنه يزورها بترتيب معيّن، فيطلع الـ annotated syntax tree. وبشكل عام بيربط مجموعة attributes بكل node في الـ grammar ومجموعة translation rules بكل production، باستخدام attributes وconstants وlexical values.`,
    `الـ Synthesized attributes بتاخد قيمها من قيم attributes الـ child nodes بتاعتها، وبتتنقل لفوق من الـ leaves للـ root (مثلاً E -> E + T، الـ E.val بييجي من الـ children بتوعه)؛ وعمرها ما بتاخد قيم من الـ parents أو الـ siblings. أما الـ Inherited attributes فبتاخد قيمها من الـ parent و/أو الـ siblings وبتتنقل لتحت (في S -> ABC، الـ A ممكن ياخد قيم من S وB وC). والـ symbol table بيبقى synthesized من الـ declaration وinherited للـ scope بتاع الـ declaration.`,
    `Bottom-up، depth-first: F=2، T=2، E=2؛ F=3، T=3؛ F=4؛ T = 3*4 = 12؛ E = 2 + 12 = 14. الـ root بياخد E.val = 14.`,
    `Type mismatch؛ undeclared variable؛ reserved identifier misuse؛ multiple declaration لمتغير في نفس الـ scope؛ الوصول لمتغير out-of-scope؛ actual and formal parameter mismatch.`
  ],
  quiz: [
    [`ده مش نوع من أنواع الـ attributes.`, `ده مش نوع من أنواع الـ attributes.`, `صح.`, `الـ Inherited attributes بتيجي من الـ parent/siblings.`],
    [`ده الـ synthesized.`, `لأ.`, `صح (ده الـ official key؛ والمحاضرة بتزوّد "و/أو الـ siblings").`, `ده مش مصطلح أصلاً.`],
    [`الـ annotated tree بيطلع لما <b>نحسب (EVALUATE)</b> الـ attribute grammar على syntax tree.`, `الـ attributes مش بتغيّر الـ ambiguity.`, `لأ.`, `صح. شيت الـ official سؤال Q53: "Attribute grammar is generated by attaching attributes to each nonterminal of the CFG".`],
    [`فخ مشهور.`, `صح.`, `لأ.`, `لأ.`],
    [`الـ grammar هنا هو الـ ATTRIBUTE grammar.`, `الاتجاه غلط.`, `صح.`, `مفيش حاجة اسمها "semantic tree" في الكورس.`],
    [`متأخر أوي.`, `صح (الـ official key).`, `الـ lexer معندوش type information.`, `الـ syntax analysis بيشيك على الـ structure بس.`],
    [`صح.`, `مفيهوش قيم attributes.`, `ده مش مصطلح في الكورس.`, `اختيار (a) هو الصح.`],
    [`ده (2+3)*4. الـ grammar بيدّي الـ * precedence أعلى (أعمق في الـ tree).`, `صح. T.val = 3*4 = 12، وبعدين E.val = 2 + 12.`, `لأ.`, `ده جامع كل حاجة.`],
    [`هما مصدر الـ synthesis، بس المحاضرة بتسميهم اسم تاني.`, `صح (INT.lexval).`, `دي category منفصلة في قواعد الـ SDT.`, `لأ.`],
    [`ده لما نبقى متأكدين إنه <b>ماخدش</b> قيمة.`, `صح.`, `ده لما نبقى متأكدين إنه أخد قيمة.`, `اختيار (b) هو الصح.`],
    [`صح. الـ SDT بيحسب القواعد المربوطة بـ productions الـ CFG على الـ tree، فيطلع الـ annotated syntax tree.`, `شيت المراجعة بيقول إن الـ attribute grammar/SDT على الـ syntax tree بيطلّع الـ annotated syntax tree.`, `لأ.`, `الـ SDT ممكن يمشي في الاتجاهين.`]
  ],
  extra: [
    [`ده 3*(2+4). الـ grammar بيحط الـ * أعمق في الـ tree، فبتتحسب الأول.`, `صح. T.val = 3*2 = 6، وبعدين E.val = 6 + 4 = 10.`, `ده بيجمع كل الـ lexical values وخلاص.`, `ده بيضرب كل الـ lexical values.`],
    [`ده ((5+2)*3)+1، يعني حساب عادي من الشمال لليمين متجاهل الـ precedence.`, `ده (5+2)*(3+1).`, `ده الـ E.val بتاع الـ E اللي جوه (5+2*3) قبل الـ +1 الأخيرة.`, `صح. الـ T بتاع 2*3 = 6؛ الـ E اللي جوه = 5 + 6 = 11؛ الـ root E = 11 + 1 = 12.`],
    [`صح. a متعرّفة مرتين في نفس الـ block.`, `a متعرّفة، ومرتين كمان.`, `الاتنين declarations بنفس الـ type ومفيش قيمة اتحطت.`, `الاتنين declarations جوه نفس الـ scope.`],
    [`مفيش keyword اتستخدم كاسم.`, `مفيش حاجة اتعرّفت مرتين.`, `صح. actual parameter واحد قصاد اتنين formal parameters.`, `f وp وq كلهم متعرّفين.`],
    [`موجودة في الليستة.`, `صح. الأقواس اللي مش متقفلة دي <b>SYNTAX</b> error، والـ parser هو اللي بيمسكها باستخدام الـ CFG.`, `موجودة في الليستة.`, `موجودة في الليستة.`],
    [`ده وصف الـ synthesized attribute.`, `المحاضرة بتقول إن B يقدر يستخدم S وA وC.`, `الـ lexical values موجودة عند الـ leaves؛ والـ inherited attributes بتيجي من الـ parent والـ siblings.`, `صح. الـ Inherited attributes بتيجي من الـ parent (S) و/أو الـ siblings (A, C).`],
    [`صح. ده مثال المحاضرة على النوعين وهما شغالين مع بعض.`, `معكوس.`, `هو كمان inherited للـ scope بتاع الـ declaration.`, `الـ lexical values هي قيم tokens زي 2 و3 و4.`],
    [`الـ phase دي جت قبل كده ومعندهاش type information.`, `الـ Parsing بييجي قبل الـ semantic analysis.`, `صح. المحاضرة بتقول إن الـ type information بتتخزن في الـ syntax tree أو الـ symbol table عشان كده.`, `الـ scanner هو اللي بيعمل كده.`],
    [`الـ attributes بتتربط بالـ <b>NON-terminals</b> (زي E.value). الـ terminals بتدّي lexical values.`, `صح. الـ attribute grammar بيزوّد attributes على واحد أو أكتر من الـ non-terminals بتوع الـ CFG.`],
    [`صح. القيم synthesized، فالمعلومات بتمشي bottom-up: F وT وE للـ 2؛ وبعدين 3 و4؛ T = 12؛ E = 14.`, `المحاضرة بتقول إن depth-first traversal واحد bottom-up كفاية هنا.`]
  ]
};

AR.compiler.lectures["8"] = {
  notes: [
    { h: `ربط الـ objects (الـ scoping)`, pts: [
      `الـ binding بيربط الـ <b>declaration</b> بالـ <b>uses</b> بتوعه. والـ <b>scope</b> بتاع الـ identifier هو الجزء من البرنامج اللي تقدر توصله فيه.`,
      `نفس الـ identifier ممكن يشاور على حاجات مختلفة في أجزاء مختلفة من البرنامج. الـ scopes المختلفة لنفس الاسم مش بتتداخل. والـ identifier ممكن يكون الـ scope بتاعه محدود.`
    ] },
    { h: `الـ static binding مقابل الـ dynamic binding` },
    { h: `مثال على الـ scoping (من المحاضرة)`, pts: [
      `الـ x اللي جوه الـ block الداخلي بيخبّي الـ x اللي برّه لحد قوس القفل بتاع الـ block الداخلي.`,
      `اتفاقية الكورس لـ "dynamic" في التمارين دي: آخر declaration اتنفّذ (الـ x الداخلي) بيفضل مستخدم حتى بعد الـ block. فالـ y النهائي = <b>6 (static)</b> أو <b>8 (dynamic)</b>.`,
      `نسخة الـ revision sheet (int x = 3 جوه، و cout بعد كل +=): الـ output في الـ static <b>5, 6</b>؛ وفي الـ dynamic <b>5, 8</b>.`
    ] },
    { h: `الـ Symbol tables`, pts: [
      `data structure جوه الـ compiler/interpreter كل identifier فيها مربوط بمعلومات عن الـ declaration أو الظهور بتاعه: <b>type، scope level</b> وأحيانًا <b>location</b>.`
    ] },
    { h: `طرق التنفيذ والـ approaches`, pts: [
      `التنفيذ: <b>unordered list</b>، <b>ordered list</b>، <b>binary search trees</b>، <b>hash tables</b> (الأشهر).`,
      `الـ approaches: <b>symbol table لكل scope</b>، أو <b>symbol table واحدة لكل الـ scopes</b>. يعني فيه أكتر من approach.`
    ] },
    { h: `symbol table لكل scope (شرح السلايدز خطوة بخطوة)`, pts: [
      `ندخل block 1 → نعمل <b>ST1</b> (الأعمدة: Symb, Token, Dtype, Init?).`,
      `الـ type declaration → نضيف a, b, c (id, int, Init = No). وكل assignment: "موجود في الـ ST الحالية؟ Yes" → نعلّم إنه initiated.`,
      `ندخل block 2 → نعمل <b>ST2</b> ونضيف c, d. في <code>c = a + 1</code>: الـ c لقيناه في ST2 → نعلّمه initiated؛ الـ a مش في ST2، فبندوّر في الـ parent اللي هي ST1: لقيناه وهو initiated.`,
      `الـ <code>print d</code> الأخير برّه block 2، فالـ d مش visible (ده access لمتغير out-of-scope).`
    ] },
    { h: `مشكلة table لكل scope والحلول`, pts: [
      `<b>المشكلة</b>: كل hash table ليها <b>memory overhead</b>، فإنك تعمل table لكل scope ده مش كويس للميموري. وكمان ممكن نحتاج <b>ندوّر في كذا table</b>، وده أبطأ.`,
      `<b>الحل</b>: <b>hash table واحدة لكل الـ scopes</b>: memory overhead أقل وبحث واحد بس.`,
      `<b>Solution 1</b>: ندّي كل scope رقم unique (الـ global scope_id = 0، ونزوّد واحد مع كل scope جديد). الـ Key = <code>"identifier,scope_id"</code>. عشان ندوّر، بنلزّق الـ scope_id الحالي في الـ identifier. وده <b>ممكن لسه يحتاج كذا بحث</b>.`,
      `<b>Solution 2</b>: الـ key = الـ identifier؛ والـ value = <b>linked list</b> من pointers لـ records، record لكل usage (declaration) للـ identifier. في الـ single-pass compiler كل insertion جديد بيتحط في <b>أول</b> الـ list، وفيه structure منفصلة بتتابع الـ identifiers المعرّفة في الـ scope الحالي (عشان نمسحهم لما نخرج من الـ scope).`,
      `مع solution 2، كل الـ entries بتبقى في scopes مفتوحة، و<b>أول item دايمًا هو الصح</b> للـ scope الحالي. ومش بياخد وقت.`
    ] }
  ],
  cards: [
    `الجزء من البرنامج اللي الـ identifier يقدر يتوصل له فيه.`,
    `scoping مبني على structure الـ syntax tree (الأقواس)؛ بيعتمد على نص البرنامج بس.`,
    `آخر declaration قابلناه وقت الـ execution هو اللي بيحدد الاستخدام الحالي.`,
    `أغلب اللغات، زي Java و C.`,
    `Lisp و SNOBOL و Perl (من خلال keywords معينة).`,
    `لأ.`,
    `معلومات كل identifier: الـ type، الـ scope level، وأحيانًا الـ location.`,
    `Unordered list، ordered list، binary search tree، hash table (الأشهر).`,
    `الـ memory overhead (وكمان كذا بحث).`,
    `"identifier,scope_id" (ولسه ممكن يحتاج كذا بحث).`,
    `الـ Key = الـ identifier؛ والـ value = linked list من الـ records، والأحدث في الأول.`,
    `local_lookup(x) للـ scope المحلي؛ و look_up(x) عن طريق قواعد الـ scoping.`,
    `Static 6، و dynamic 8.`
  ],
  qa: [
    `الـ Static binding: الـ scoping ماشي ورا structure الـ syntax tree (الأقواس)؛ بيعتمد على نص البرنامج بس وبيتحل في الـ compile time (Java, C). الـ Dynamic binding: آخر declaration اتقابل وقت الـ execution هو اللي بيحدد الاستخدام؛ بيعتمد على التنفيذ، وبيطلع لفوق في الـ stack بتاع الـ symbol tables، وماينفعش يتحل في الـ compile time (Lisp, SNOBOL, Perl).`,
    `كل hash table ليها memory overhead وممكن نحتاج ندوّر في كذا table (بطيء). الحل إننا نستخدم table واحدة لكل الـ scopes: Solution 1 بتخزّن الـ entries بـ key "identifier,scope_id" (ولسه ممكن تحتاج كذا بحث)؛ و Solution 2 بتربط كل identifier بـ linked list فيها الـ declarations بتاعته والأحدث في الأول، فأول item دايمًا هو بتاع الـ scope الحالي.`,
    `جوه الـ block: b = 20*30 = 600، وبيطبع 600 في الحالتين. بعد الـ block: الـ static بيستخدم الـ a اللي برّه = 10، فـ b = 610 وبيطبع 610. الـ Dynamic (حسب اتفاقية الكورس) بيستخدم آخر a = 30، فـ b = 630 وبيطبع 630.`,
    `High level: enter scope، process a declaration، process a use، exit scope. Low level: enter_scope()، insert_symbol(x)، local_lookup(x)، look_up(x)، exit_scope().`
  ],
  quiz: [
    [`ملهاش علاقة.`, `دي optimization technique، مش مشكلة.`, `دي مشكلة في الـ grammar.`, `صح. كل hash table بتكلّف ميموري، وممكن نحتاج ندوّر في كذا table.`],
    [`صح.`, `الـ dynamic binding ماشي ورا ترتيب التنفيذ، مش الـ structure.`, `لأ.`, `الاختيار (a) هو الصح.`],
    [`ده وصف الـ STATIC binding.`, `صح. الـ dynamic binding بيستخدم آخر declaration اتقابل وقت الـ run time.`, `الـ C لغة statically scoped.`, `الـ dynamic scope في Lisp بيعتمد على التنفيذ.`],
    [`لأ.`, `صح.`, `الـ LL(1) table فيها productions.`, `فيها structure البرنامج.`],
    [`ممكن، بس بطيء.`, `ممكن.`, `ممكن.`, `صح. السلايدز بتقول إنها الطريقة الأشهر.`],
    [`ده Solution 2.`, `صح.`, `لأ.`, `لأ.`],
    [`غلط. أول item دايمًا هو الصح، فالـ lookup سريع.`, `صح (حسب الـ official key).`, `لأ.`, `الـ key بيقول False.`],
    [`ده الـ y بعد الـ block الداخلي بس.`, `صح. 2+3 = 5، وبعدين الـ x اللي برّه = 1 فتبقى 6.`, `ده جواب الـ dynamic.`, `لأ.`],
    [`ده جواب الـ static.`, `وقف بدري.`, `صح. آخر x اتقابل (3) بيتستخدم تاني: 5 + 3.`, `لأ.`],
    [`غلط.`, `صح. table لكل scope أو table واحدة لكل الـ scopes، باستخدام lists أو BSTs أو hash tables.`, `لأ.`, `لأ.`],
    [`الـ memory overhead دي مشكلة table لكل SCOPE؛ الـ single table هي الحل.`, `صح.`, `لأ.`, `تقدر تحدد.`]
  ],
  extra: [
    [`معكوسين. الـ static بيستخدم الـ p اللي برّه بعد الـ block؛ والـ dynamic بيستخدم آخر p.`, `الـ dynamic binding بيفضل يستخدم آخر declaration اتنفّذ اللي هو p = 5.`, `صح. جوه الـ block: q = 1×5 = 5. الـ Static: q = 5 + 4 = 9 (الـ p اللي برّه). الـ Dynamic: q = 5 + 5 = 10.`, `الـ 5 دي قيمة q قبل آخر statement؛ والـ static binding لسه هيزوّد الـ p اللي برّه = 4.`],
    [`Block 2 بيعرّف c و d بس.`, `صح. الـ a مش في ST2، فبندوّر في الـ parent table اللي هي ST1.`, `Block 3 لسه ما دخلناهوش، ومش parent لـ Block 2 أصلًا.`, `البحث بيكمّل في الـ table بتاعة الـ scope اللي حواليه وبيلاقيه.`],
    [`الـ c بتاع Block 3 نفسه بيخبّيه.`, `Block 2 اتقفل، ومش scope حوالين Block 3.`, `الـ c متعرّف في Block 3 نفسه.`, `صح. الـ table الحالية (local) بيتدوّر فيها الأول.`],
    [`صح. ده access لمتغير out-of-scope: الـ d اتعرّف في Block 2 بس. بعد قوس قفل Block 2، الـ d مابقاش visible.`, `مع الـ static scoping، الـ scope بتاع d بيخلص مع Block 2.`, `Block 3 بيعرّف a و c، مش d.`, `الـ d متعرّف مرة واحدة بس.`],
    [`دي بتشيك بس إذا كان x موجود في الـ LOCAL (الحالي) scope.`, `دي بتضيف x للـ table (معالجة declaration).`, `صح.`, `دي بتبدأ nested scope جديد.`],
    [`الـ identifiers بتاعة scope 1 بتتمسح لما نخرج من الـ scope، باستخدام الـ structure المنفصلة اللي بتتابع أسماء الـ scope الحالي.`, `اللي بيتشال الـ declaration الداخلي بس؛ الـ x اللي برّه لسه موجود.`, `الـ records مش بتتدمج.`, `صح. أول item دايمًا هو الصح للـ scope الحالي.`],
    [`صح. المحاضرة بتذكر Lisp و SNOBOL و Perl (من خلال keywords).`, `الـ C لغة statically scoped.`, `الـ Java لغة statically scoped.`, `أغلب اللغات، ومنهم الاتنين دول، بيستخدموا static binding.`],
    [`بتخزّن أكتر من كده عن الـ declaration.`, `صح.`, `الـ code ده output الـ code generator، مش محتوى الـ symbol table.`, `الـ parse trees بيبنيها الـ parser وهي حاجة منفصلة.`],
    [`الـ static binding هو اللي بيتحل في الـ compile time، عشان بيعتمد على نص البرنامج بس.`, `صح. الـ dynamic binding بيعتمد على التنفيذ؛ السيستم بيطلع لفوق في الـ stack بتاع الـ symbol tables وقت الـ run time.`],
    [`صح. لو x مش موجود تحت الـ scope_id الحالي، لازم نعيد الـ lookup بالـ ids بتاعة الـ scopes اللي حواليه.`, `المحاضرة بتقول إن Solution 1 ممكن لسه تحتاج كذا بحث، وده اللي الـ linked lists في Solution 2 بتتجنبه.`]
  ]
};

AR.compiler.lectures["9"] = {
  notes: [
    { h: `الـ Runtime environment`, pts: [
      `الـ <b>Runtime</b> = برنامج شغّال (في التنفيذ). والـ <b>runtime environment</b> هو حالة الـ target machine (software libraries، environment variables…) اللي بتقدّم خدمات للـ processes اللي شغّالة.`,
      `الـ <b>runtime support system</b> ده package، غالبًا بيتعمل مع الـ executable نفسه، وبيظبط التواصل بين الـ process والـ runtime environment. وهو اللي بياخد باله من <b>memory allocation و de-allocation</b> وإنت البرنامج شغّال.`
    ] },
    { h: `الـ Storage allocation: إيه اللي محتاج ميموري`, pts: [
      `الـ <b>Code</b>: الـ text part، ومش بيتغير وقت الـ runtime. احتياجه من الميموري <b>معروف في الـ compile time</b>.`,
      `الـ <b>Procedures</b>: الـ text بتاعها static، بس بتتنادى بترتيب عشوائي، فالـ <b>stack</b> هو اللي بيدير الـ procedure calls والـ activations.`,
      `الـ <b>Variables</b>: بتتعرف بس وقت الـ runtime (إلا لو global أو constant). والـ <b>Heap</b> allocation هو اللي بيديرها.`
    ] },
    { h: `الـ 3 أنواع بتوع الـ storage allocation`, pts: [
      `الـ <b>Static allocation</b>: الداتا بتترتبط بـ <b>location ثابت</b> مش بيتغير طول التنفيذ. وبما إن الأحجام والأماكن معروفة من الأول، <b>مش محتاجين runtime support package</b> للـ allocation/de-allocation.`,
      `الـ <b>Stack allocation</b>: الـ procedure calls والـ activations بتتدار بـ stack (<b>LIFO</b>). مفيد جدًا للـ <b>recursive</b> calls.`,
      `الـ <b>Heap allocation</b>: الميموري بتتحجز وتتفك dynamically وقت الـ runtime وبترجع لما مانحتاجهاش. ودي لازمة للغات اللي بتسمح بـ <b>dynamic data structures</b>.`,
      `ماعدا الـ static area، الـ <b>stack والـ heap بيكبروا ويصغروا dynamically</b>، فماينفعش ندّيهم كمية ميموري ثابتة. عشان كده الـ compiler بيستخدم storage حجمه ثابت (static) و storage حجمه متغير (stack/heap).`
    ] },
    { h: `الـ Memory layout (ارسم الشكل ده)`, pts: [
      `الـ text part بياخد كمية ميموري ثابتة. والـ stack والـ heap موجودين في <b>الطرفين</b> بتوع ميموري البرنامج و<b>بيكبروا ويصغروا ناحية بعض</b>.`,
      `الـ Lecture notes (layout بتاع C): text segment، initialized data segment (globals/statics ليها قيمة)، uninitialized data segment (BSS: globals/statics من غير قيمة)، stack (automatic variables، stack frames فيها الـ return addresses)، heap (malloc/realloc/free).`
    ] },
    { h: `الـ Formal مقابل الـ actual parameters`, pts: [
      `الـ <b>Formal parameters</b>: متغيرات في <b>تعريف (definition)</b> الـ function اللي اتنادت، وبتستقبل المعلومات اللي الـ caller بعتها.`,
      `الـ <b>Actual parameters</b>: المتغيرات اللي قيمها أو عناوينها بتتبعت؛ وبتظهر في الـ <b>function call</b> كـ arguments.`,
      `الـ formal parameters بتشيل معلومات الـ actual parameter: قيمة أو عنوان، حسب طريقة الـ passing.`
    ] },
    { h: `طرق الـ Parameter-passing (مثال المحاضرة)` },
    { h: `أغراض الـ Symbol table (من ناحية الـ runtime)`, pts: [
      `بتخزّن معلومات عن أسماء المتغيرات، أسماء الـ functions، الـ objects، الـ classes، الـ interfaces…`,
      `الأغراض: تخزين أسماء كل الـ entities في مكان واحد منظّم؛ التأكد إن المتغير اتعمله declare؛ تنفيذ الـ <b>type checking</b> (إن الـ assignments والـ expressions صح semantically)؛ تحديد الـ <b>scope</b> بتاع الاسم (scope resolution). وممكن كمان تستخدم في الـ storage allocation.`
    ] },
    { h: `الـ Peephole optimization`, pts: [
      `code optimization بيتعمل على <b>جزء صغير من الكود</b>. المجموعة الصغيرة دي من الـ instructions اسمها <b>peephole</b> أو <b>window</b>.`,
      `بيشتغل بالـ <b>replacement</b>: جزء من الكود بيتبدّل بكود أقصر وأسرع وبيدّي نفس الـ output. وهو <b>machine dependent</b>.`,
      `الأهداف: <b>تحسين الـ performance</b>؛ <b>تقليل حجم الكود</b> وتحسين استخدام الميموري.`,
      `<b>Redundant load and store elimination</b>: <code>y = x + 5; i = y; z = i; w = z * 3;</code> → <code>y = x + 5; i = y; w = y * 3;</code>`,
      `<b>Constant folding</b>: نبسّط اللي ينفع يتحسب في الـ compile time: <code>x = 2 * 3;</code> → <code>x = 6;</code>`,
      `<b>Combine operations</b>: كذا operation بتتبدّل بواحدة مكافئة. مثال السلايد: <code>X = (2*3)+5; y = X – Sqrt(3*8);</code> (ممكن تبقى <code>X = 11; y = 11 – Sqrt(24);</code>).`
    ] },
    { h: `الـ Loop optimization`, pts: [
      `الـ loop optimization بيحسّن الـ <b>cache performance</b> وبيقلل الـ <b>overheads</b> بتاعة تنفيذ الـ loops.`,
      `نسخة الامتحان: <code>for (i=0; i &lt; a→length-1; i++) swap_elements(a[i], a[i+1]);</code> → <code>int x = a→length-1; for (i=0; i &lt; x; i++) swap_elements(a[i], a[i+1]);</code> فالـ length-1 بيتحسب مرة واحدة بدل ما يتحسب كل iteration، وده بيوفّر processing ووقت.`
    ] }
  ],
  cards: [
    `حالة الـ target machine (libraries، env variables…) اللي بتخدم الـ processes الشغّالة.`,
    `package بيتعمل مع الـ executable وبيظبط الـ memory allocation/de-allocation وقت الـ run time.`,
    `تلاتة: static، stack، heap.`,
    `memory locations ثابتة ومعروفة من الأول؛ مش محتاج runtime support.`,
    `الـ Procedure/function calls والـ activations (LIFO)؛ كويس للـ recursion.`,
    `المتغيرات/الـ data structures اللي بتتحجز dynamically وقت الـ run time.`,
    `الـ Stack والـ heap، ناحية بعض؛ والـ text والـ static data ثابتين.`,
    `بتتعرّف في definition الـ function اللي اتنادت؛ وبتستقبل المعلومات اللي اتبعتت.`,
    `الـ arguments اللي بتتدّى في الـ call.`,
    `مفيش حاجة بتدخل؛ الـ formals بتتنسخ ترجع للـ actuals لما نرجع (return).`,
    `نسخ للداخل وقت الـ call ونسخ راجع وقت الـ return.`,
    `المجموعة الصغيرة من الـ instructions اللي الـ peephole optimization بيشتغل عليها.`,
    `أيوه.`,
    `Redundant load/store elimination، constant folding، combine operations.`,
    `تحسين الـ cache performance وتقليل الـ overheads بتاعة الـ loops.`
  ],
  qa: [
    `فوق: ميموري الـ text (code)، ثابتة؛ وبعدها الـ static data، ثابتة. تحت: ميموري الـ stack بتكبر لتحت، وفي الطرف التاني ميموري الـ heap بتكبر لفوق؛ وبيكبروا ويصغروا ناحية بعض. الـ Static allocation بيربط الداتا بـ locations ثابتة معروفة من الأول (مش محتاج runtime support). الـ Stack allocation بيدير الـ procedure calls/activations بترتيب LIFO (كويس للـ recursion). الـ Heap allocation بيحجز ويفك المتغيرات dynamically وقت الـ run time. والـ stack والـ heap ماينفعش يبقى ليهم حجم ثابت.`,
    `int x = a->length-1; for (i=0; i &lt; x; i++) swap_elements(a[i], a[i+1]); الـ loop bound بيتحسب مرة واحدة ويتخزن في x بدل ما ننادي length-1 كل iteration، وده بيوفّر وقت الـ processing (loop optimization / code hoisting).`,
    `optimization بيعتمد على الـ machine (machine-dependent) على window صغيرة (peephole) من الكود، بيبدّلها بكود أقصر/أسرع وبنفس الـ output، عشان يحسّن الـ performance ويقلل حجم الكود. الـ Techniques: redundant load and store elimination (y=x+5; i=y; z=i; w=z*3 تبقى y=x+5; i=y; w=y*3)، و constant folding (x=2*3 تبقى x=6)، و combine operations (X=(2*3)+5 تبقى X=11).`,
    `الـ Formal parameters بتتعرّف في definition الـ procedure اللي اتنادت وبتستقبل المعلومات اللي اتبعتت (value أو address). الـ Actual parameters هي المتغيرات/القيم اللي في الـ call statement واللي قيمها أو عناوينها بتتبعت.`,
    `Value: 2 1 2 3 / 3 5 1 0 3 / 2 1 0 3. Result: 2 1 2 3 / 1 3 1 0 3 / 1 1 3 3. Value-result: 2 1 2 3 / 3 5 1 0 3 / 3 1 5 3.`
  ],
  quiz: [
    [`لأ.`, `صح. Static، stack، heap.`, `لأ.`, `الـ C layout فيه خمس segments، بس أنواع الـ storage في المحاضرة تلاتة.`],
    [`دي الـ static storage.`, `صح.`, `الـ Code ده static (text).`, `(b) بس.`],
    [`صح.`, `مش نوع storage في الـ compiler.`, `الـ Arrays ممكن تبقى static.`, `حجمه ثابت.`],
    [`صح.`, `"Dynamic" مش class لوحده.`, `مفيش queue.`, `(a) هو الصح.`],
    [`الـ Globals دي static.`, `مش ده السبب.`, `الـ Recursion محتاج الـ stack.`, `صح.`],
    [`دي peephole technique.`, `دي peephole technique.`, `الاتنين methods فعلًا.`, `صح. ده data structure، مش optimization.`],
    [`"Variable folding" مش موجود في الكورس.`, `الـ Definite assignment ده analysis.`, `صح.`, `لأ.`],
    [`العكس.`, `صح.`, `لأ.`, `ليه تلات techniques.`],
    [`ده pass by value.`, `صح. j بيخلص بـ 1 و x بـ 3 (بيبدأوا من 0) وبيتنسخوا راجعين لـ i و a[2].`, `ده value-result.`, `ده by reference.`],
    [`صح. j=3 بيتنسخ لـ i و x=5 لـ a[2]، وبيكتب فوق الـ a[2]:=0.`, `By value.`, `By result.`, `By reference.`],
    [`مفيش constants اتعملها fold.`, `صح.`, `مفيش loop.`, `مش ده الاسم اللي على السلايد.`],
    [`صح (كلام المحاضرة).`, `السلايد بيقول كده بالظبط.`, `لأ.`, `لأ.`]
  ],
  extra: [
    [`ده pass by result، اللي فيه الـ formals بتبدأ من 0.`, `ده pass by reference، اللي فيه x هو alias لـ a[2].`, `الـ a[2] := 0 بيغيّر الـ global array a حتى مع pass by value.`, `صح. j = 2+1 = 3، و x = 2+3 = 5 (نسخ)، والـ global a بتبقى (1,0,3).`],
    [`صح. x هو نفسه a[2]: الـ x := x+3 بيخلّي a[2] = 5، وبعدين a[2] := 0 بيخلّي x = 0 كمان. و j هو alias لـ i = 3.`, `ده pass by value؛ بيتجاهل إن x و a[2] نفس الـ location.`, `الـ a[2] := 0 بيتنفّذ بعد x := x+3، فالقيمة النهائية 0.`, `ده pass by result.`],
    [`ده pass by value: مفيش حاجة بتتنسخ راجعة.`, `ده بينسخ j راجع لـ i بس نسي ينسخ x راجع لـ a[3].`, `صح. j = 3→4، x = 7→10، a[2] := 0. وعند الـ return، i ← 4 و a[3] (العنوان اتثبّت وقت الـ call) ← 10.`, `ده pass by result: الـ formals بتبدأ من 0، فـ j = 1 و x = 3 هما اللي بيتنسخوا راجعين.`],
    [`الـ v ظاهر في الـ call، يبقى هو الـ actual parameter.`, `صح. الـ Formal parameters بتستقبل المعلومات اللي الـ caller بعتها.`, `دورين مختلفين: v هو actual، و w هو formal.`, `الـ 10 دي القيمة اللي بتتبعت.`],
    [`الـ Recursion محتاج stack allocation.`, `الـ Heap allocation نوع storage تاني منفصل و dynamic.`, `الـ static data بتتستخدم؛ هي بس بتفضل في مكانها.`, `صح. الداتا مربوطة بـ locations ثابتة.`],
    [`صح. الـ Globals والـ statics اللي من غير قيمة بتروح الـ BSS؛ واللي ليها قيمة بتروح الـ initialized data segment.`, `الـ heap فيه الميموري اللي جاية من malloc/realloc، وبتتفك بـ free.`, `الـ stack فيه الـ automatic (local) variables والـ stack frames.`, `الـ text segment فيه الكود.`],
    [`اتعمله fold جزئي بس: 6+5 ممكن يتحسب هو كمان، و X ممكن يتبدّل بقيمته.`, `2*(3+5) = 16 بتتجاهل الأقواس: (2*3)+5 = 11.`, `صح. (2*3)+5 = 11 و 3*8 = 24 بيتحسبوا في الـ compile time.`, `3*8 كمان constant expression وممكن يتعمله fold لـ 24.`],
    [`ده بيغيّر الـ output بتاع البرنامج.`, `ده بينطّ عناصر وبيغيّر النتيجة.`, `n متغير، فـ n*2 ماينفعش يتعمله fold في الـ compile time.`, `صح. زي arr.length → size، الـ bound بيتحسب مرة واحدة بدل كل iteration.`],
    [`الـ text والـ static data بس هما اللي ثابتين. الـ Stack والـ heap بيكبروا ويصغروا.`, `صح. الـ Stack والـ heap في الطرفين بتوع الميموري وبيكبروا ويصغروا ناحية بعض، فماينفعش يبقى ليهم حجم ثابت.`],
    [`صح. الـ procedure calls والـ activations بتاعتها بتتدار LIFO على الـ stack، وده مناسب للـ recursion.`, `المحاضرة بتقول صراحة إن الـ stack allocation مفيد جدًا للـ recursive calls.`]
  ]
};

AR.compiler.exams = [];
AR.compiler.exams[0] = { sections: [
  { items: [
    { why: `ده الشكل بتاع Lecture 9 مع الـ three storage types. والـ revision sheet في essay Q3 بتدي نفس الإجابة دي.`, ans: `<pre>┌──────────────────────┐
│  Text (code) memory  │  fixed
├──────────────────────┤
│  Static data         │  fixed
├──────────────────────┤
│  Stack memory   ↓    │  dynamic
│      free space      │
│  Heap memory    ↑    │  dynamic
└──────────────────────┘</pre><b>Static allocation</b>: الداتا بتتربط بمكان ثابت في الميموري ومبيتغيرش طول التنفيذ. الأحجام والأماكن معروفة من الأول، فمش محتاجين runtime support package.<br><b>Stack allocation</b>: الـ procedure calls والـ activations بتاعتها بيتداروا بـ stack (LIFO)؛ مفيدة جدًا في الـ recursive calls.<br><b>Heap allocation</b>: الميموري بتاعة المتغيرات بتتحجز وتتفك بشكل dynamic وقت الـ run time، وبترجع لما متبقاش محتاجينها.<br>الجزء بتاع الـ text بياخد حجم ميموري ثابت. الـ stack والـ heap في الطرفين وبيكبروا ويصغروا في اتجاه بعض، عشان كده مينفعش نديهم حجم ثابت.` },
  ] },
  { items: [
    { why: `ابدأ من الـ ε-closure بتاع 1. لكل set ولكل symbol، اجمع الـ moves وخد الـ ε-closure بتاعها (يعني 3 –a→ 1 بتجيب معاها 3 كمان). جدول Q16 في الـ revision sheet بيدي نفس النتيجة.`, ans: `الـ ε-closures: E(1) = {1,3}، E(2) = {2}، E(3) = {3}.<br>الجدول بالـ ε (step 1):<table><tr><th>State</th><th>a</th><th>b</th><th>ε</th></tr><tr><td>1</td><td>-</td><td>2</td><td>1,3</td></tr><tr><td>2</td><td>2,3</td><td>3</td><td>2</td></tr><tr><td>3</td><td>1 (→ closure 1,3)</td><td>-</td><td>3</td></tr></table>الـ DFA (step 2):<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→* {1,3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>{2}</td><td>{2,3}</td><td>{3}</td></tr><tr><td>{2,3}</td><td>{1,2,3}</td><td>{3}</td></tr><tr><td>{3}</td><td>{1,3}</td><td>∅</td></tr><tr><td>* {1,2,3}</td><td>{1,2,3}</td><td>{2,3}</td></tr></table>الـ Start = {1,3}. الـ final states هي اللي فيها 1: {1,3} و {1,2,3}. والـ ∅ دي dead state (أو ببساطة متكتبش الـ transition دي خالص).` },
  ] },
  { items: [
    { why: `في tree 1، الـ A بتطلّع aa والـ T بتطلّع a. في tree 2، الـ A بتطلّع a والـ T بتطلّع aa. فيه أزواج تانية صح برضه، زي مثلًا A → AA → AAA متجمعة بطريقتين لـ string أطول. الدرجات: اتنين LMDs صح + اتنين trees + الاستنتاج.`, ans: `<pre>LMD 1: S ⇒ AB ⇒ AAB ⇒ aAB ⇒ aaB ⇒ aaTc ⇒ aaac
LMD 2: S ⇒ AB ⇒ aB ⇒ aTc ⇒ aaTc ⇒ aaac

Tree 1:        S                Tree 2:       S
             /                             /               A     B                        A     B
           /    /                        |    /           A   A T   c                      a   T   c
          |   | |                             /           a   a a                            a   T
                                                 |
                                                 a</pre>فيه اتنين leftmost derivations مختلفين (يعني اتنين parse trees مختلفين) لنفس الـ string اللي هو aaac، يبقى الـ grammar دي <b>ambiguous</b>.` },
  ] },
  { items: [
    { why: `في الـ <b>by value</b>: مفيش حاجة بترجع تتنسخ، فالـ main دايمًا شايفة value = 2 والـ list الأصلية. في الـ <b>by value-result</b>: الـ a والـ b بيتنسخوا تاني وقت الـ return على الـ addresses اللي اتحددت وقت الـ call (list[0] في call 1، و list[1] في call 2، عشان value = 1 ساعتها). بعد call 2، value = 3، والـ main بتطبع list[value] = list[3] = 7. ده ماشي على قاعدة المحاضرة (في concentrate(i, a[i]) النتيجة بتروح لـ a[2]، اللي اتحددت وقت الـ call). لو افترضت إن الـ address بيتحسب تاني وقت الـ return (value = 3، يبقى list[3] = 1)، السطر الأخير هيبقى "3 1"، وده اللي مكتوب في الـ pencil note بتاعة الطالب على الـ scan.`, ans: `<table><tr><th>Line</th><th>By value</th><th>By value-result</th></tr><tr><td>swap(value, list[0])</td><td>1 2</td><td>1 2</td></tr><tr><td>main</td><td>2 1</td><td>1 2  (value=1, list[0]=2 copied back)</td></tr><tr><td>swap(value, list[value])</td><td>5 2  (list[2]=5)</td><td>3 1  (value=1, so list[1]=3)</td></tr><tr><td>main</td><td>2 5</td><td>3 7  (value=3, list[1]=1; list[3]=7 printed)</td></tr></table><b>Optimizations</b>:<br>1) <b>Constant folding</b>: <code>double y = 1.5*3;</code> → <code>double y = 4.5;</code> (بتتحسب مرة واحدة وقت الـ compile).<br>2) <b>Dead code elimination</b>: الـ x والـ y متعرّفين بس عمرهم ما اتستخدموا، فنشيلهم (بيوفّر ميموري).<br>3) جوه الـ swap، ممكن الـ three assignments بتوع التبديل يتدمجوا/يتبسطوا، بس المكسب الأساسي في 1 و 2.` },
  ] },
  { items: [
    { why: `الـ FOLLOW(S) بياخد $ (عشان هو الـ start)، و ) من U → (S)، و b من U → aSb. الـ FOLLOW(U) = FIRST(VW) − ε ∪ FOLLOW(S) عشان V و W الاتنين nullable. الـ FOLLOW(V) = {c} ∪ FOLLOW(S). الـ FOLLOW(W) = FOLLOW(S). الـ ε-productions بتتحط تحت الـ FOLLOW symbols. مفيش ولا cell فيها entry اتنين، يبقى الـ grammar دي LL(1) والـ string اتعملها accept.`, ans: `مفيش left recursion، فمش محتاجين نعمل أي transformation.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{ (, a, d }</td><td>{ $, ), b }</td></tr><tr><td>U</td><td>{ (, a, d }</td><td>{ a, c, $, ), b }</td></tr><tr><td>V</td><td>{ a, ε }</td><td>{ c, $, ), b }</td></tr><tr><td>W</td><td>{ c, ε }</td><td>{ $, ), b }</td></tr></table>الـ Parsing table:<table><tr><th></th><th>(</th><th>a</th><th>d</th><th>c</th><th>b</th><th>)</th><th>$</th></tr><tr><td>S</td><td>S→UVW</td><td>S→UVW</td><td>S→UVW</td><td></td><td></td><td></td><td></td></tr><tr><td>U</td><td>U→(S)</td><td>U→aSb</td><td>U→d</td><td></td><td></td><td></td><td></td></tr><tr><td>V</td><td></td><td>V→aV</td><td></td><td>V→ε</td><td>V→ε</td><td>V→ε</td><td>V→ε</td></tr><tr><td>W</td><td></td><td></td><td></td><td>W→cW</td><td>W→ε</td><td>W→ε</td><td>W→ε</td></tr></table>الـ Parsing بتاع (dc)ac:<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>(dc)ac$</td><td>S→UVW</td></tr><tr><td>UVW$</td><td>(dc)ac$</td><td>U→(S)</td></tr><tr><td>(S)VW$</td><td>(dc)ac$</td><td>match (</td></tr><tr><td>S)VW$</td><td>dc)ac$</td><td>S→UVW</td></tr><tr><td>UVW)VW$</td><td>dc)ac$</td><td>U→d</td></tr><tr><td>dVW)VW$</td><td>dc)ac$</td><td>match d</td></tr><tr><td>VW)VW$</td><td>c)ac$</td><td>V→ε</td></tr><tr><td>W)VW$</td><td>c)ac$</td><td>W→cW</td></tr><tr><td>cW)VW$</td><td>c)ac$</td><td>match c</td></tr><tr><td>W)VW$</td><td>)ac$</td><td>W→ε</td></tr><tr><td>)VW$</td><td>)ac$</td><td>match )</td></tr><tr><td>VW$</td><td>ac$</td><td>V→aV</td></tr><tr><td>aVW$</td><td>ac$</td><td>match a</td></tr><tr><td>VW$</td><td>c$</td><td>V→ε</td></tr><tr><td>W$</td><td>c$</td><td>W→cW</td></tr><tr><td>cW$</td><td>c$</td><td>match c</td></tr><tr><td>W$</td><td>$</td><td>W→ε</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>` },
  ] },
  { items: [
    { why: `الـ Parsing = إننا نلاقي parse tree (L4).` },
    { why: `الـ symbol table دي data structure مشتركة بين الـ phases، مش phase (L1).` },
    { why: `الـ Leaves = terminals؛ والـ interior nodes = non-terminals (L4).` },
    { why: `كل hash table بتكلّف ميموري (L8). علامة الرصاص على (b) غلط.` },
    { why: `الـ semantic analysis بتطلّع الـ annotated tree، والـ source code optimizer هو اللي بياخدها (L1؛ revision sheet Q37).` },
    { why: `الـ CFG فيها V, Σ, P, S بس (L4).` },
    { why: `الـ Ambiguous معناها أكتر من tree واحدة (L4).` },
    { why: `L7.` },
    { why: `الـ tokens اللي طالعة من الـ scanner (L1, L4).` },
    { why: `الـ A ظاهرة كأول symbol على الشمال في الـ production بتاعتها هي نفسها (L5).` },
    { why: `الـ revision sheet Q53: الـ attribute grammar بتتولّد لما نربط attributes بكل non-terminal في الـ CFG. علامة الرصاص على (a) غلط: الـ annotated tree بتيجي من إننا نحسب الـ attributes على tree.` },
    { why: `الـ compilers بتطلّع intermediate object code؛ الـ interpreters لأ (جدول L1).` },
    { why: `الـ regular expressions بتوصف الـ tokens؛ والـ finite automata بتتعرّف عليها (L2).` },
    { why: `الـ loops ووجود كذا accept state مسموحين في الـ DFAs (L3).` },
    { why: `L2.` },
  ] },
  { items: [
    { why: `ده <b>STATIC</b> binding. الـ Dynamic binding بيستخدم آخر declaration اتنفّذ (L8).` },
    { why: `الـ (X|Y)* فيها XY؛ إنما X*|Y* لأ (L2).` },
    { why: `مفتاح الـ revision sheet بتاع الدكتور (Q52) بيقول إن الـ leftmost parsing tree بتكبر من الناحية <b>اليمين</b>، فالإجابة False. (المحاضرات مبتقولش القاعدة دي بشكل مباشر.)` },
    { why: `دي واحدة من الـ three peephole techniques (L9). علامة الـ ✗ بالرصاص على الـ scan غلط.` },
    { why: `الـ SDT بتربط rules بالـ CFG productions وبتحسبها على الـ tree، فبتدّينا الـ annotated syntax tree (L7؛ revision sheet T/F 13).` },
  ] },
] };
AR.compiler.exams[1] = { sections: [
  { items: [
    { why: `من الـ parent (و/أو الـ siblings) (L7؛ الـ sheet Q42).` },
    { why: `L4.` },
    { why: `L4.` },
    { why: `مفتاح الـ revision sheet في Q12: الاتنين A و C.` },
    { why: `L2.` },
    { why: `L1.` },
    { why: `L4؛ الـ sheet Q27.` },
    { why: `مفتاح الـ revision sheet في Q28: <b>ambiguous</b> (المقصود "أكتر من واحدة").` },
    { why: `Static و stack و heap (L9).` },
    { why: `L4.` },
  ] },
  { items: [
    { why: `الـ strings بتتعمل لها derive من الـ start symbol (L4).` },
    { why: `بس الـ loop اللي بعدها transition على <b>نفس</b> الـ symbol هي اللي بتعمل كده؛ الـ DFAs ممكن يبقى فيها loops عادي (L3).` },
    { why: `L1.` },
    { why: `aε = εa = a؛ الـ ε هي الـ neutral element في الـ concatenation (L2).` },
    { why: `ده متوافق مع مفتاح الـ revision sheet بتاع الدكتور (Q52: right).` },
    { why: `الـ Interpreters مبتطلّعش intermediate object code (L1).` },
    { why: `L7.` },
    { why: `الـ compiler بيبلّغ عن الـ syntax errors؛ أما الـ runtime errors فبتظهر بس وقت التنفيذ (مفتاح الـ revision sheet في Q29: syntax بس).` },
    { why: `الـ Compilers بتاخد وقت طويل في الـ <b>ANALYZE</b>، بس التنفيذ بيبقى أسرع (L1؛ الـ sheet T/F 2 = False).` },
    { why: `L1L2 ≠ L2L1 (L2).` },
  ] },
  { items: [
    { why: `الشكل بتاع L1. ارسم الـ six phases، والداتا اللي بتعدّي بينهم، والـ three shared components.`, ans: `<pre>Source code
   ↓
Scanner ─────────────┐
   ↓ tokens          │
Parser               │     Literal table
   ↓ syntax tree     │
Semantic analyzer    ├──── Symbol table
   ↓ annotated tree  │
Source code optimizer│     Error handler
   ↓ intermediate code
Code generator       │
   ↓ target code     │
Target code optimizer┘
   ↓
Target code</pre>` },
    { why: `الـ revision sheet essay Q4؛ نفس فكرة مثال arr.length → size اللي في السلايد (L9).`, ans: `<pre>int x = a→length-1;
for (i=0; i &lt; x ; i++)
   swap_elements(a[i],a[i+1]);</pre>بدل ما نحسب length-1 في كل iteration، نخزّنه مرة واحدة في x ونستخدم x كـ terminating condition. كده length-1 بيتحسب مرة واحدة بس، وده بيوفّر processing ووقت (<b>loop optimization</b>).` },
    { why: `نفس الـ NFA ونفس الإجابة موجودين في الـ revision sheet (Q11) وفي الـ midterm sheet.`, ans: `الجدول بالـ ε:<table><tr><th>State</th><th>0</th><th>1</th><th>ε</th></tr><tr><td>1</td><td>3</td><td>-</td><td>1</td></tr><tr><td>2</td><td>3</td><td>-</td><td>2</td></tr><tr><td>3</td><td>1</td><td>2,3</td><td>3</td></tr></table>الـ DFA:<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>- (dead)</td></tr><tr><td>* {3}</td><td>{1}</td><td>{2,3}</td></tr><tr><td>* {2,3}</td><td>{1,3}</td><td>{2,3}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2,3}</td></tr></table>الـ Start هو {1}؛ والـ final states: أي set فيها 3.<br>هي non-deterministic عشان state 3 فيها loop على 1 وكمان transition تانية على نفس الـ symbol 1 (رايحة لـ 2).` },
    { why: `الـ b* = loop عند الـ start؛ الـ a+ = a واحدة عشان ندخل q1 وبعدين loop؛ وبعد كده واحدة بالظبط من c أو d. في التانية، الـ c واحدة أو أكتر <b>أو</b> الـ d واحدة أو أكتر محتاجين final states منفصلة عشان ميتخلطوش مع بعض (revision sheet Q7).`, ans: `<b>b*a+(c|d)</b>: الـ q0 (start، فيها loop على b) –a→ q1 (فيها loop على a)؛ q1 –c→ q2؛ q1 –d→ q2؛ والـ q2 final.<br><b>(a|b)*(c+|d+)</b>: الـ q0 (start، فيها loop على a,b) –c→ q1 (final، فيها loop على c)؛ q0 –d→ q2 (final، فيها loop على d).` },
    { why: `Tree 1 بتحسب (id-id)+id؛ و tree 2 بتحسب id-(id+id).`, ans: `<pre>LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id
LMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id

Tree 1:       E                Tree 2:     E
            / |                         / |            E  +  E                      E  -  E
         / |    |                      |   / |         E  -  E  id                     id E  +  E
        |     |                            |     |
        id    id                           id    id</pre>اتنين leftmost derivations (اتنين parse trees) لنفس الـ string، يبقى الـ grammar دي <b>ambiguous</b>.` },
  ] },
] };
AR.compiler.exams[2] = { sections: [
  { items: [
    { why: `مفتاح الـ revision sheet في Q29: <b>syntax</b>.` },
    { why: `L4.` },
    { why: `الـ Keywords دي tokens (L2).` },
    { why: `الـ revision sheet Q10: storage allocation و type checking و suppressing duplicate errors. اللي موجود هنا من دول هو storage allocation بس.` },
    { why: `L4.` },
    { why: `L1.` },
    { why: `الـ interior nodes هي الـ non-terminals (L4).` },
    { why: `L3.` },
    { why: `Static و stack و heap (L9).` },
    { why: `الـ Constant folding والـ combine operations دول peephole techniques (L9).` },
  ] },
  { items: [
    { why: `Yε = εY = Y (الـ algebraic properties في L2).` },
    { why: `الفرق بينهم بس في أنهي non-terminal بيتبدّل الأول؛ ولا واحد فيهم الـ inverse بتاع التاني. الـ Bottom-up parsers هي اللي بتطلّع rightmost derivation <b>بالعكس</b> (L4).` },
    { why: `L8.` },
    { why: `الأقواس ملهاش لازمة، والـ | عملية commutative (L2).` },
    { why: `بالـ Subset construction (L3).` },
    { why: `L4.` },
    { why: `L1.` },
    { why: `من الـ parent و/أو الـ siblings (L7؛ الـ sheet Q42).` },
    { why: `الـ ε هي الـ empty string؛ مبتاكلش أي input و sε = s، فمبتغيّرش الـ expression اللي الـ automaton بيقبله. (دي إجابتنا إحنا؛ مفيش key.)` },
    { why: `L2.` },
  ] },
  { items: [
    { why: `الشكل بتاع L1 (بص على امتحان 2024/25 (50) عشان الرسمة).`, ans: `الـ Source code → <b>Scanner</b> → tokens → <b>Parser</b> → syntax tree → <b>Semantic analyzer</b> → annotated tree → <b>Source code optimizer</b> → intermediate code → <b>Code generator</b> → target code → <b>Target code optimizer</b> → target code. كل الـ phases متوصّلة بالـ literal table والـ symbol table والـ error handler.` },
    { why: `نفس Q2-c بتاع 2024/25 (50) بالظبط، ونفس revision sheet Q11.`, ans: `<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>-</td></tr><tr><td>* {3}</td><td>{1}</td><td>{2,3}</td></tr><tr><td>* {2,3}</td><td>{1,3}</td><td>{2,3}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2,3}</td></tr></table>الـ Final states: كل الـ sets اللي فيها 3.` },
    { why: `في الـ <b>By value</b>: نسخ بتدخل ومفيش حاجة بترجع، بس a[2]:=0 بتغيّر الـ global array. في الـ <b>By result</b>: مفيش value بتدخل (الـ formals بتبدأ بـ 0، زي مثال المحاضرة)، ووقت الـ return الـ j بتتنسخ في i والـ x في a[2] (الـ address اللي اتحدد وقت الـ call، i = 2)، فبتكتب فوق الـ 0. الـ revision sheet Q12 بتدي نفس الـ outputs.`, ans: `<table><tr><th></th><th>By value</th><th>By result</th></tr><tr><td>Before call</td><td>2 10 20 30</td><td>2 10 20 30</td></tr><tr><td>Inside</td><td>j=2→3, x=30→33<br>3 33 10 20 0</td><td>j=0→1, x=0→3<br>1 3 10 20 0</td></tr><tr><td>After call</td><td>2 10 20 0</td><td>1 10 20 3<br>(i ← j = 1, a[2] ← x = 3)</td></tr></table>` },
    { why: `<b>Loop optimization</b> (L9؛ revision sheet Q4).`, ans: `<pre>int x = a→length-1;
for (i=0; i &lt; x ; i++)
   swap_elements(a[i],a[i+1]);</pre>الـ length-1 بيتحسب مرة واحدة بدل ما يتحسب في كل iteration، وده بيوفّر processing time.` },
    { why: `L4.`, ans: `LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id (الـ root هو +).<br>LMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id (الـ root هو -).<br>اتنين leftmost derivations/parse trees مختلفين، يبقى الـ grammar دي <b>ambiguous</b> (الـ trees مرسومة في إجابة 2024/25 (50)).` },
  ] },
] };
AR.compiler.exams[3] = { sections: [
  { items: [
    { why: `سلسلة الـ phases في L1.` },
    { why: `L2.` },
    { why: `L4.` },
    { why: `الـ parser بيشتغل من الـ CFG (الـ sheet Q17).` },
    { why: `L4.` },
    { why: `الـ sheet Q29.` },
    { why: `مفتاح الـ revision sheet في Q52.` },
    { why: `الـ <b>Static binding</b> بيمشي على structure بتاع الـ syntax tree (L8؛ الـ sheet Q45). علامة الرصاص على (b) غلط.` },
    { why: `L7.` },
    { why: `L1, L9.` },
  ] },
  { items: [
    { why: `L4.` },
    { why: `L2.` },
    { why: `دي data structure بتستخدمها الـ phases، مش phase (L1).` },
    { why: `L2/L3 (زي مثلًا الـ DFA بتاعة 1*01(0|1)*).` },
    { why: `فيه source code optimizer + target code optimizer (L1).` },
    { why: `الـ Left recursion بتعمل infinite loop في الـ top-down parsers؛ لازم تشيلها الأول (L5–6).` },
    { why: `بتتولّد بالـ lexical analysis (L2).` },
    { why: `L9.` },
    { why: `هي بتطلّع الـ annotated syntax tree (L1, L7).` },
    { why: `دي اسمها inherited؛ الـ synthesized بتيجي من الـ children (L7).` },
  ] },
  { items: [
    { why: `L7؛ revision sheet Q13.`, ans: `الـ SDT بتضيف augmented (translation) rules للـ grammar عشان تسهّل الـ semantic analysis. بتعدّي المعلومات bottom-up و/أو top-down في الـ parse tree على شكل attributes متعلقة بالـ nodes، باستخدام الـ lexical values والـ constants والـ attributes. بتبني الـ parse/syntax tree وتحسب قيم الـ attributes عند الـ nodes وهي بتزورهم بترتيب معيّن، فبتطلّع الـ <b>annotated syntax tree</b>. بشكل عام، الـ SDT بتربط set of attributes بكل grammar node، و set of translation rules بكل production.` },
    { why: `في الـ <b>Static</b>: بعد القوس اللي بيقفل، الـ a اللي جوه بتبقى out of scope، فبنستخدم الـ a اللي برا = 10. في الـ <b>Dynamic</b> (حسب convention الكورس، مثال lecture 8): آخر declaration قابلناه (a = 30) لسه هو اللي بيتستخدم.`, ans: `<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Inner block: b = 20 × 30</td><td>600</td><td>600</td></tr><tr><td>After block: b += a</td><td>600 + 10 = <b>610</b> (outer a)</td><td>600 + 30 = <b>630</b> (most recent a)</td></tr><tr><td>Output</td><td>600 610</td><td>600 630</td></tr></table>` },
    { why: `L4.`, ans: `LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id<br>LMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id<br>Tree 1 الـ root بتاعها + و (id-id) على الشمال؛ و tree 2 الـ root بتاعها - و (id+id) على اليمين. اتنين trees، يبقى الـ grammar دي <b>ambiguous</b>.` },
    { why: `الـ {2} على a بتروح لـ 2 و 3 الاتنين، فبتدّينا {2,3}؛ ومن {2,3}، الـ a بتودّي 2 → {2,3} و 3 → ولا حاجة. الـ transitions الناقصة بتروح لـ dead state.`, ans: `<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→ {0}</td><td>{1}</td><td>{2}</td></tr><tr><td>{1}</td><td>-</td><td>{3}</td></tr><tr><td>{2}</td><td>{2,3}</td><td>-</td></tr><tr><td>* {2,3}</td><td>{2,3}</td><td>-</td></tr><tr><td>* {3}</td><td>-</td><td>-</td></tr></table>الـ Final states: {3} و {2,3}. الـ DFA دي بتقبل ab | ba+.<br>هي NFA عشان state 2 فيها loop على a وكمان transition تانية على a (رايحة لـ 3).` },
    { why: `شوف جدول الـ stack/input كامل في امتحان 2024/25 (60).`, ans: `نفس الـ grammar ونفس الـ string بتوع Q1-e في 2024/25 (60).<br>الـ FIRST: S = U = {(, a, d}؛ V = {a, ε}؛ W = {c, ε}.<br>الـ FOLLOW: S = {$, ), b}؛ U = {a, c, $, ), b}؛ V = {c, $, ), b}؛ W = {$, ), b}.<br>الـ Table: M[S,(]=M[S,a]=M[S,d] = S→UVW؛ M[U,(]=U→(S)؛ M[U,a]=U→aSb؛ M[U,d]=U→d؛ M[V,a]=V→aV؛ M[V,c|b|)|$]=V→ε؛ M[W,c]=W→cW؛ M[W,b|)|$]=W→ε.<br>الـ Actions: S→UVW, U→(S), match (, S→UVW, U→d, match d, V→ε, W→cW, match c, W→ε, match ), V→aV, match a, V→ε, W→cW, match c, W→ε, accept.` },
  ] },
] };
AR.compiler.exams[4] = { sections: [
  { items: [
    { why: `فيه source code optimizer و target code optimizer؛ والـ target code في المحاضرة هو assembly (MOV, MUL…) (L1).` },
    { why: `L4.` },
    { why: `L2.` },
    { why: `L1.` },
    { why: `L4.` },
    { why: `الـ compiler بيبلّغ عن الـ syntax errors بس؛ الـ logic والـ runtime errors بتظهر وقت التنفيذ.` },
    { why: `L4.` },
    { why: `L7.` },
    { why: `L1.` },
    { why: `L9.` },
  ] },
  { items: [
    { why: `L8.` },
    { why: `الـ ε transition لوحدها كفاية تخلّيها NFA (L3).` },
    { why: `الـ Union عملية commutative: L1 ∪ L2 = L2 ∪ L1 (L2).` },
    { why: `الـ Automata ممكن يبقى فيها كذا accept state (زي الـ DFA اللي طالعة من تحويلات الـ NFA).` },
    { why: `"The earliest point of most optimization steps is just after semantic analysis" يعني أبدر نقطة لمعظم خطوات الـ optimization هي بعد الـ semantic analysis على طول (L1).` },
    { why: `دي عكس مفتاح الـ revision sheet اللي بيقول "a leftmost parsing tree grows from the right side". مش مذكورة بشكل مباشر في المحاضرات.` },
    { why: `فيه كمان redundant load/store elimination و combine operations و loop optimization (L9).` },
    { why: `فيه Static (ثابت) وكمان stack و heap (بيكبروا ويصغروا) (L9).` },
    { why: `اسمها <b>Syntax</b> Directed Translation (L7).` },
    { why: `L7.` },
  ] },
  { items: [
    { why: `جدول L1.`, ans: `<table><tr><th>Interpreter</th><th>Compiler</th></tr><tr><td>Translates one statement at a time</td><td>Scans the entire program and translates it as a whole</td></tr><tr><td>Less analysis time, slower overall execution</td><td>More analysis time, faster overall execution</td></tr><tr><td>No intermediate object code, so memory efficient</td><td>Generates intermediate object code that needs linking, so more memory</td></tr><tr><td>JavaScript, Python, Ruby</td><td>C, C++, Java</td></tr></table>` },
    { why: `في tree 1 أول A → 1S والتانية A → 1. في tree 2 أول A → 1 والتانية A → 1S. الـ revision sheet essay Q2 بتستخدم نفس الـ derivations.`, ans: `<pre>LMD 1: S ⇒ 0A ⇒ 00AA ⇒ 001SA ⇒ 0011BA ⇒ 00110A ⇒ 001101
LMD 2: S ⇒ 0A ⇒ 00AA ⇒ 001A  ⇒ 0011S  ⇒ 00110A ⇒ 001101

Tree 1:  S                    Tree 2:  S
        /                            /        0   A                         0   A
         / |                          / |         0  A  A                       0  A  A
          /                            |  /          1   S  1                        1 1   S
            /                                /            1   B                             0   A
               |                                 |
               0                                 1</pre>اتنين leftmost derivations/parse trees مختلفين، يبقى الـ grammar دي <b>ambiguous</b>.` },
    { why: `الـ {S} على 0: الـ loop بتاعة S و S → R بيدّونا {S,R}. الـ {S,R} على 0: الـ S بتدّي {S,R} والـ R بتدّي S، يبقى {S,R}؛ وعلى 1: الـ R بتدّي {R,M}. الـ {R,M} على 0: R → S و M → R، يبقى {S,R}؛ وعلى 1: {R,M}.`, ans: `<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {S}</td><td>{S,R}</td><td>- (dead)</td></tr><tr><td>* {S,R}</td><td>{S,R}</td><td>{R,M}</td></tr><tr><td>* {R,M}</td><td>{S,R}</td><td>{R,M}</td></tr></table>الـ Start هو {S}؛ والـ final states هي {S,R} و {R,M} (عشان فيهم R).` },
    { why: `في الـ <b>Static</b>: بعد الـ block، الـ x اللي برا = 1 بتبقى visible تاني، فـ y = 8 + 1 = 9. في الـ <b>Dynamic</b> (حسب convention الكورس): بنستخدم آخر x = 6، فـ y = 8 + 6 = 14 والـ x بتتطبع 6.`, ans: `<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Inner block (x = 6, y = 2+6)</td><td>x= 6 y= 8</td><td>x= 6 y= 8</td></tr><tr><td>After block</td><td>x= 1 y= 9</td><td>x= 6 y= 14</td></tr></table><b>Optimizations</b>:<br>1) <b>Constant folding</b>: <code>int x = 3*2</code> → <code>int x = 6</code>؛ <code>result = (2+3)*sqrt(2*8)</code> → <code>result = 5*sqrt(16)</code> → <code>result = 20</code>. بتتحسب مرة واحدة وقت الـ compile.<br>2) <b>Combine operations</b>: الـ expression كلها بتبقى constant assignment واحد.<br>3) <b>Dead code elimination</b>: الـ d و s[10] (والـ result كمان، عمرها ما اتستخدمت) ممكن نشيلهم عشان نوفّر ميموري.` },
    { why: `الـ A → Abc | b فيها left recursion، فلازم تتحوّل الأول. FOLLOW(A) = FIRST(B) = {d}، FOLLOW(A') = FOLLOW(A)، FOLLOW(B) = {e}.`, ans: `نشيل الـ left recursion: S → aABe, A → bA', A' → bcA' | ε, B → d.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{a}</td><td>{$}</td></tr><tr><td>A</td><td>{b}</td><td>{d}</td></tr><tr><td>A'</td><td>{b, ε}</td><td>{d}</td></tr><tr><td>B</td><td>{d}</td><td>{e}</td></tr></table>الـ Table: M[S,a] = S→aABe؛ M[A,b] = A→bA'؛ M[A',b] = A'→bcA'؛ M[A',d] = A'→ε؛ M[B,d] = B→d.<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>abbcde$</td><td>S→aABe</td></tr><tr><td>aABe$</td><td>abbcde$</td><td>match a</td></tr><tr><td>ABe$</td><td>bbcde$</td><td>A→bA'</td></tr><tr><td>bA'Be$</td><td>bbcde$</td><td>match b</td></tr><tr><td>A'Be$</td><td>bcde$</td><td>A'→bcA'</td></tr><tr><td>bcA'Be$</td><td>bcde$</td><td>match b</td></tr><tr><td>cA'Be$</td><td>cde$</td><td>match c</td></tr><tr><td>A'Be$</td><td>de$</td><td>A'→ε</td></tr><tr><td>Be$</td><td>de$</td><td>B→d</td></tr><tr><td>de$</td><td>de$</td><td>match d</td></tr><tr><td>e$</td><td>e$</td><td>match e</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>الـ string اتعملها accept، يبقى هي صح.` },
  ] },
] };


// ===== Arabic for PAPERS.compiler (appended exams + quiz) =====
AR.compiler.exams.push(
  { sections: [
    { items: [
      { why: `الـ parser بياخد الـ stream بتاع الـ tokens من الـ scanner ويبني parse/syntax tree (سلسلة الـ phases في L1، و L4). أما "source code, tokens" فده وصف الـ <b>LEXICAL</b> analyzer.` },
      { why: `الـ tokens بتتوصف بالـ regular expressions وبيتعرفوا بالـ finite automata (L2). الـ CFG بتعمل model للـ syntax analysis، والـ attribute grammar للـ semantic analysis، والـ symbol table دي data structure.` },
      { why: `الـ peephole techniques في L9: redundant load/store elimination، constant folding، combine operations. باقي الاختيارات متألفة.` },
      { why: `الـ definite-assignment states في L7: definitely assigned، definitely unassigned، unknown (سؤال Q41 في الـ revision sheet).` },
      { why: `الـ leaves هي الـ terminals؛ والـ interior nodes هي الـ non-terminals (L4).` },
      { why: `الـ semantic analyzer بيحوّل الـ syntax tree لـ annotated tree (L1؛ سؤال Q36 في الـ revision sheet).` },
      { why: `الـ Testing مش phase في الـ compiler (L1؛ سؤال Q30 في الـ revision sheet).` },
      { why: `الـ CFG هي (V, Σ, P, S): non-terminals و terminals و productions و start symbol. مفيش حاجة اسمها "end symbol" (L4؛ سؤال Q23 في الـ sheet).` },
      { why: `الـ key بتاع سؤال Q29 في الـ revision sheet: syntax. الـ logic والـ runtime errors مش بتبان غير لما البرنامج يشتغل.` },
      { why: `الإجابة هي "synthesized attributes" (L7)، ودي مش موجودة في الاختيارات. الاختيارات اتنقلت من سؤال تاني (غلطة طباعة)، فالاختيار الوحيد الصح هو "none of the mentioned".` },
    ] },
    { items: [
      { why: `الـ intermediate code موجود عشان مانحتاجش compiler جديد كامل لكل target machine (سؤال Q51 في الـ revision sheet: "eliminate the need of a unique compiler for each machine")، والـ compilers فعلًا بتطلّع intermediate code (L1). الإجابة المقصودة True. بالظبط كده، الورقة المفروض تقول "full compiler" مش "full interpreter".` },
      { why: `الـ peephole optimization بيشتغل على أي window صغيرة من الكود (L9). الـ loop optimization دي technique منفصلة.` },
      { why: `الـ symbol table دي data structure كل الـ phases بتستخدمها، مش phase (L1).` },
      { why: `جدول L1: الـ interpreters بتعمل analysis بسرعة بس وقت التنفيذ في المجمل أبطأ من الكود اللي اتعمله compile. (قارن بـ T/F 2 في الـ revision sheet: "Compilers take long time to execute source code" = False.)` },
      { why: `في العموم L1L2 ≠ L2L1، مثلًا {a}{b} = {ab} لكن {b}{a} = {ba} (L2؛ T/F 11 في الـ sheet).` },
      { why: `فيه طريقتين: table لكل scope أو table واحدة لكل الـ scopes؛ وفيه كذا implementation (lists، BST، hash table) (L8؛ T/F 6 في الـ sheet).` },
      { why: `دي Syntax Directed Translation (L7).` },
      { why: `الـ optimization هدفه يقلّل استخدام الميموري ويزوّد السرعة، مثلًا بإنه يشيل الـ redundant loads/stores والـ dead code (L1، L9).` },
      { why: `الـ ε transition بتخلّي الـ automaton تبقى NFA (L3).` },
      { why: `الـ derivation بيبدأ من الـ start symbol S (L4).` },
    ] },
    { items: [
      { why: `جدول L1؛ والـ essay Q10 في الـ revision sheet.`, ans: `<table><tr><th>Interpreter</th><th>Compiler</th></tr><tr><td>بيترجم البرنامج statement واحدة في المرة</td><td>بيعمل scan للبرنامج كله ويترجمه مرة واحدة لـ machine code</td></tr><tr><td>وقت أقل في الـ analysis للـ source code، بس التنفيذ في المجمل أبطأ</td><td>وقت أكتر في الـ analysis للـ source code، بس التنفيذ في المجمل أسرع</td></tr><tr><td>مش بيطلّع intermediate object code، فبيبقى موفّر في الميموري</td><td>بيطلّع intermediate object code محتاج linking، فبيحتاج ميموري أكتر</td></tr><tr><td>JavaScript, Python, Ruby</td><td>C, C++, Java</td></tr></table>` },
      { why: `في tree 1 أول A في 0AA بتستخدم A → 1S (و S → 1B → 10) وتاني A بتستخدم A → 1. في tree 2 أول A بتستخدم A → 1 والتانية بتستخدم A → 1S (S → 0A → 01). الاتنين بيطلّعوا 0·0·1·1·0·1. نفس الـ essay Q2 في الـ revision sheet وورقة 2023/24 (50).`, ans: `<pre>LMD 1: S ⇒ 0A ⇒ 00AA ⇒ 001SA ⇒ 0011BA ⇒ 00110A ⇒ 001101
LMD 2: S ⇒ 0A ⇒ 00AA ⇒ 001A  ⇒ 0011S  ⇒ 00110A ⇒ 001101

Tree 1:  S                    Tree 2:  S
        /                            /        0   A                         0   A
         / |                          / |         0  A  A                       0  A  A
          /                            |  /          1   S  1                        1 1   S
            /                                /            1   B                             0   A
               |                                 |
               0                                 1</pre>اتنين leftmost derivations مختلفين (يعني two parse trees مختلفين) لنفس الـ string 001101، يبقى الـ grammar دي ambiguous.` },
      { why: `الـ subset construction من {1}: الـ {1} على 0 → {3}. الـ {3} على 0 → {1,3} (الـ edge لـ 1 زائد الـ loop)؛ وعلى 1 → {2}. الـ {1,3} على 0 → {3} ∪ {1,3} = {1,3}؛ وعلى 1 → {2}. الـ {2} على 0 → {3}؛ وعلى 1 مفيش. مفيش sets جديدة بتظهر، فالـ DFA فيها 4 states زائد dead state. الـ label بتاع الـ loop في الـ scan هو نفس شكل باقي الـ 0 labels، وواضح إنه مختلف عن الـ "1" اللي على الـ edge 3 → 2.`, ans: `<b>السبب</b>: الـ state 3 عندها loop على 0 و transition تانية على نفس الـ symbol 0 (لـ 1)، فـ δ(3, 0) = {1, 3} ليها اتنين next states محتملين.<br>الـ Transition table (بالـ ε):<table><tr><th>State</th><th>0</th><th>1</th><th>ε</th></tr><tr><td>1</td><td>3</td><td>-</td><td>1</td></tr><tr><td>2</td><td>3</td><td>-</td><td>2</td></tr><tr><td>3</td><td>1,3</td><td>2</td><td>3</td></tr></table>DFA:<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>∅ (dead)</td></tr><tr><td>* {3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>{2}</td><td>{3}</td><td>∅ (dead)</td></tr></table>الـ Start = {1}. الـ Final states = الـ sets اللي فيها 3: {3} و {1,3}.<br><br><b>لو قرينا الـ loop على إنها 1</b> (نسخة الـ revision sheet / 2024/25: 3 –1→ 3): السبب = الـ state 3 عندها loop على 1 و transition تانية على 1 (لـ 2). DFA: {1} –0→ {3}; {3} –0→ {1}, –1→ {2,3}; {2,3} –0→ {1,3}, –1→ {2,3}; {1,3} –0→ {1,3}, –1→ {2,3}؛ والـ finals هي {3}، {2,3}، {1,3}.` },
      { why: `الـ Static: بعد قفلة الـ brace الـ i الداخلية بتطلع برا الـ scope، فبنستخدم الـ i اللي برا = 10. الـ Dynamic (حسب convention الكورس، L8 وسؤال Q9 في الـ revision sheet): آخر declaration اتنفذ (i = 3) لسه هو اللي بيتستخدم. الـ Symbol table: نفس شكل سؤال Q9 في الـ revision sheet (x → [1|YES|next] → [0|YES|NULL]، y → [0|YES|NULL])؛ الـ i الداخلية بتاعة scope 1 بتقعد قدّام الـ i اللي برا بتاعة scope 0.`, ans: `(i)<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>الـ Inner block: w = 20 + 3</td><td>23</td><td>23</td></tr><tr><td>بعد الـ block: w += i</td><td>23 + 10 = <b>33</b> (الـ i اللي برا)</td><td>23 + 3 = <b>26</b> (آخر i)</td></tr><tr><td>Output</td><td>23 33</td><td>23 26</td></tr></table>(ii) hash table واحدة، كل identifier → linked list فيها الـ declarations بتاعته، والأحدث في الأول (الـ fields: scope | initialized? | next):<pre>i  ->  [ 1 | YES | next ] -> [ 0 | YES | NULL ]
w  ->  [ 0 | YES | NULL ]</pre>` },
      { why: `حسب convention الكورس (مثال الـ concentrate في L9، وسؤال Q12 في الـ revision sheet): الـ by result مش بيدخّل أي قيمة، فالـ formals بتبدأ بـ 0؛ وعند الـ return الـ formals بتتنسخ تاني لعناوين الـ actuals اللي اتحددت وقت الـ call (a[1]، مش a[الـ i الجديدة]). الـ a[2] := 0 بتغيّر الـ global array على طول ومش بتتكتب فوقها لأن الـ x مربوطة بـ a[1]. اتراجعت مرتين: الـ result 2+0=2، 0+8=8؛ والـ value-result 1+2=3، 4+8=12.`, ans: `الـ call هو method(i, a[1]) لأن i = 1: y ↔ i، x ↔ a[1].<table><tr><th></th><th>By result</th><th>By value-result</th></tr><tr><td>قبل الـ call</td><td>1 2 4 6</td><td>1 2 4 6</td></tr><tr><td>الـ Copy in</td><td>مفيش: y = 0, x = 0</td><td>y = 1, x = 4</td></tr><tr><td>جوّه</td><td>y = 2, x = 8, a = {2,4,0}<br><b>2 8 2 4 0</b></td><td>y = 3, x = 12, a = {2,4,0}<br><b>3 12 2 4 0</b></td></tr><tr><td>الـ Copy back</td><td>i ← 2, a[1] ← 8</td><td>i ← 3, a[1] ← 12</td></tr><tr><td>بعد الـ call</td><td><b>2 2 8 0</b></td><td><b>3 2 12 0</b></td></tr></table>` },
    ] },
  ] },
  { sections: [
    { items: [
      { why: `L2؛ سؤال Q2 في الـ revision sheet.` },
      { why: `الـ semantic analysis بيستخدم attribute grammar عشان يحوّل الـ syntax tree لـ annotated syntax tree (L7). الـ Context free grammar بتعمل model للـ <b>SYNTAX</b> analysis (سؤال Q3 في الـ sheet).` },
      { why: `امشي على الـ key بتاع الدكتور في الـ revision sheet (right)؛ ونفس السؤال موجود في ورقة 2023/24 (60).` },
      { why: `الـ regular expressions بتوصف الـ tokens؛ والـ finite automata بتتعرف عليهم (L2؛ سؤال Q6 في الـ sheet).` },
      { why: `L1.` },
      { why: `الـ parser بيـ check البرنامج على الـ CFG (L4؛ سؤال Q18 في الـ sheet).` },
      { why: `L4.` },
      { why: `الـ symbol table بتتعامل مع تقريبًا كل phase وهي نفسها مش phase (L1؛ سؤال Q24 في الـ sheet).` },
      { why: `الـ Stack والـ heap هما الـ dynamic؛ والـ text/static ثابتين. الـ Queue والـ array مش أنواع storage في الـ runtime layout (L9).` },
      { why: `الاتنين peephole techniques (L9؛ سؤال Q50 في الـ sheet). الـ annotated syntax tree ده output الـ semantic analyzer.` },
    ] },
    { items: [
      { why: `الـ compilers بتطلّع intermediate object code؛ الـ interpreters لأ (L1).` },
      { why: `دي الـ synthesized attributes؛ أما الـ inherited فبتيجي من الـ parent و/أو الـ siblings (L7؛ T/F 14 في الـ sheet).` },
      { why: `الـ memory overhead دي مشكلة إن يبقى فيه table <b>لكل scope</b>؛ الـ single table هي الحل (L8).` },
      { why: `الـ interpreters بتعمل analysis بسرعة بس التنفيذ في المجمل أبطأ من الكود اللي اتعمله compile (L1).` },
      { why: `في العموم L1L2 ≠ L2L1 (L2).` },
      { why: `الـ derivations بتبدأ من الـ start symbol (L4).` },
      { why: `الـ ε هي الـ identity في الـ concatenation (L2).` },
      { why: `هي Static و <b>STACK</b> و heap (L9؛ سؤال Q49 في الـ sheet).` },
      { why: `الـ DFAs ممكن يبقى فيها loops. الـ loop بس لو معاها transition تانية على <b>نفس</b> الـ symbol (أو ε move) هي اللي بتعمل non-determinism (L3).` },
      { why: `L9؛ T/F 15 في الـ sheet.` },
    ] },
    { items: [
      { why: `نفس كود ورقة 2023/24 (50). الـ Static: بعد الـ block الـ x اللي برا = 1 بتبقى visible تاني، فـ y = 8 + 1 = 9. الـ Dynamic (حسب convention الكورس): آخر declaration x = 6 لسه هو اللي بيتستخدم، فـ y = 8 + 6 = 14 والـ x بتتطبع 6.`, ans: `<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Inner block (x = 6, y = 2 + 6)</td><td>x= 6 y= 8</td><td>x= 6 y= 8</td></tr><tr><td>After block (y += x)</td><td>x= 1 y= 9</td><td>x= 6 y= 14</td></tr></table><b>الـ Optimizations</b>:<br>1) <b>Constant folding</b>: <code>int x = 3*2</code> → <code>int x = 6</code>; <code>result = (2+3)*sqrt(2*8)</code> → <code>result = 5*sqrt(16)</code> → <code>result = 20</code>. بتتحسب مرة واحدة وقت الـ compile بدل وقت الـ run.<br>2) <b>Combine operations</b>: الـ expression كلها بتبقى constant assignment واحد.<br>3) <b>Dead code elimination</b>: الـ d و s[10] عمرهم ما اتستخدموا (والـ result اتعملها assign بس عمرها ما اتستخدمت)، فممكن نشيلهم عشان نوفّر ميموري.` },
      { why: `L7؛ والـ essay Q13 في الـ revision sheet.`, ans: `الـ SDT بتضيف augmented (translation) rules على الـ grammar عشان تسهّل الـ semantic analysis. بتعدّي المعلومات bottom-up و/أو top-down في الـ parse tree على شكل <b>attributes</b> متعلّقة في الـ nodes. الطريقة العامة إننا نبني parse tree أو syntax tree ونحسب قيم الـ attributes عند الـ nodes بتاعتها وإحنا بنزورهم بترتيب معيّن، فيطلع الـ <b>annotated syntax tree</b>. في العموم، الـ SDT بتزوّد الـ CFG بإنها تربط (1) مجموعة attributes بكل grammar symbol/node و (2) مجموعة translation (semantic) rules بكل production، باستخدام attributes و constants و lexical values. مثال: E → E1 + T { E.val = E1.val + T.val } بيدّي E.val = 14 لـ 2+3*4.` },
      { why: `جوّه الأقواس فيه طريقة واحدة بس نجيب بيها num / num (الـ / مش ممكن تيجي غير من op). الـ ambiguity في الـ +: tree 1 بتستخدم op → +، و tree 2 بتستخدم op → ε و E → +E. الاتنين derivations دول leftmost (الـ leftmost non-terminal بيتبدّل في كل خطوة).`, ans: `الـ + ممكن تطلع يا إما كـ binary operator (op → +) يا إما كـ unary plus (E → +E) بعد operator فاضي (op → ε).<pre>LMD 1: E ⇒ E op E ⇒ (E) op E ⇒ (E op E) op E ⇒ (num op E) op E
         ⇒ (num / E) op E ⇒ (num / num) op E ⇒ (num / num) + E
         ⇒ (num / num) + num
LMD 2: E ⇒ E op E ⇒ (E) op E ⇒ (E op E) op E ⇒ (num op E) op E
         ⇒ (num / E) op E ⇒ (num / num) op E ⇒ (num / num) E      [op → ε]
         ⇒ (num / num) + E ⇒ (num / num) + num                  [E → +E]

Tree 1:            E                 Tree 2:            E
             /     |                             /     |                 E      op     E                      E      op     E
          / |     |      |                    / |     |     /          (  E  )   +     num                  (  E  )   ε    +   E
          / |                                 / |              |
         E  op  E                             E  op  E          num
         |  |   |                             |  |   |
        num /  num                           num /  num</pre>نفس الـ string ليها اتنين leftmost derivations مختلفين و two parse trees مختلفين، يبقى الـ grammar دي ambiguous.` },
      { why: `الـ {0} على a → {2}، وعلى b → {1}. الـ {2} على a → {1}. الـ {1} على a → {1,2} (الـ loop + الـ edge لـ 2). الـ {1,2} على a → {1,2} ∪ {1} = {1,2}. مفيش state ليها b-move غير 0. اتراجعت مرتين.`, ans: `دي NFA لأن الـ state 1 عندها loop على a و transition تانية على a (لـ 2).<br>الـ NFA table:<table><tr><th>State</th><th>a</th><th>b</th></tr><tr><td>0</td><td>2</td><td>1</td></tr><tr><td>1</td><td>1,2</td><td>-</td></tr><tr><td>2</td><td>1</td><td>-</td></tr></table>DFA:<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→ {0}</td><td>{2}</td><td>{1}</td></tr><tr><td>* {2}</td><td>{1}</td><td>∅ (dead)</td></tr><tr><td>{1}</td><td>{1,2}</td><td>∅ (dead)</td></tr><tr><td>* {1,2}</td><td>{1,2}</td><td>∅ (dead)</td></tr></table>الـ Start = {0}. الـ Final states = الـ sets اللي فيها 2: {2} و {1,2}. كل الـ b-moves ما عدا اللي من {0} بتروح لـ dead state (أو بنسيبها).` },
      { why: `نفس الـ grammar والـ string بتوع ورقة 2023/24 (50). الـ A → Abc | b فيها left recursion، فلازم تتكتب من الأول. FOLLOW(A) = FIRST(B) = {d}؛ FOLLOW(A') = FOLLOW(A) = {d}؛ FOLLOW(B) = {e}. مفيش خانة في الـ table فيها اتنين entries، يبقى الـ grammar دي LL(1).`, ans: `نشيل الـ left recursion: S → aABe, A → bA', A' → bcA' | ε, B → d.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{a}</td><td>{$}</td></tr><tr><td>A</td><td>{b}</td><td>{d}</td></tr><tr><td>A'</td><td>{b, ε}</td><td>{d}</td></tr><tr><td>B</td><td>{d}</td><td>{e}</td></tr></table>الـ Table: M[S,a] = S→aABe; M[A,b] = A→bA'; M[A',b] = A'→bcA'; M[A',d] = A'→ε; M[B,d] = B→d.<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>abbcde$</td><td>S→aABe</td></tr><tr><td>aABe$</td><td>abbcde$</td><td>match a</td></tr><tr><td>ABe$</td><td>bbcde$</td><td>A→bA'</td></tr><tr><td>bA'Be$</td><td>bbcde$</td><td>match b</td></tr><tr><td>A'Be$</td><td>bcde$</td><td>A'→bcA'</td></tr><tr><td>bcA'Be$</td><td>bcde$</td><td>match b</td></tr><tr><td>cA'Be$</td><td>cde$</td><td>match c</td></tr><tr><td>A'Be$</td><td>de$</td><td>A'→ε</td></tr><tr><td>Be$</td><td>de$</td><td>B→d</td></tr><tr><td>de$</td><td>de$</td><td>match d</td></tr><tr><td>e$</td><td>e$</td><td>match e</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>الـ input اتعمله accept، يبقى abbcde جملة صح في الـ grammar.` },
    ] },
  ] },
  { sections: [
    { items: [
      { why: `L2.` },
      { why: `L2.` },
      { why: `L4.` },
      { why: `تعريف L1. الـ (b) بتوصف interpreter، والـ (c) assembler، والـ (d) loader.` },
      { why: `الـ Parsing بيحدد هل string من الـ tokens ممكن الـ grammar تطلّعها ولا لأ (L4).` },
      { why: `L2.` },
      { why: `الـ scanner (الـ lexical analyzer) بيجمّع الـ characters في tokens (L1).` },
      { why: `الـ Type checking ده static semantics، وبيتعمل بالـ SDT/attribute rules أثناء الـ semantic analysis (L1، L7).` },
      { why: `L1، L2.` },
      { why: `L8/L9: الـ symbol table بتدعم الـ type checking والـ scope resolution والـ storage allocation.` },
      { why: `التلاتة phases (L1).` },
      { why: `الـ Official key: machine code، يعني binary code.` },
      { why: `L4.` },
      { why: `L4.` },
      { why: `الـ Top-down (LL) parsers بتطلّع leftmost derivation؛ والـ bottom-up parsers بتطلّع rightmost derivation in reverse (L4، L6).` },
      { why: `الـ Top-down parsing بيبدأ من الـ root (الـ start symbol) ويعمل expand ناحية الـ input (L4، L6).` },
      { why: `الـ parser بيشتغل من الـ CFG (L4).` },
      { why: `L4.` },
      { why: `الـ Keywords دي tokens (L2).` },
      { why: `البرامج اللي اتعملها compile بتتنفذ <b>أسرع</b> (جدول L1)؛ والتلاتة التانيين صفات في الـ compiler فعلًا.` },
      { why: `ده تعريف الـ left recursion (L4–5).` },
      { why: `Leftmost derivation (L4).` },
      { why: `L4.` },
      { why: `L1: الـ symbol table بتتعامل مع تقريبًا كل phase.` },
      { why: `L4 (نفس Q14 بس الاختيارات مترتبة بشكل تاني).` },
      { why: `L7.` },
      { why: `L4 (كلمة "paring" غلطة إملائية والمقصود parsing).` },
      { why: `اقراها على إنها "أكتر من parse tree"، وده تعريف الـ ambiguity (L4). جاوب ambiguous في الامتحان، لأن ورقة 2024/25 (50) بتكرر نفس السؤال بالظبط.` },
      { why: `الـ Compile-time errors هي الـ syntax errors؛ أما الـ logic والـ runtime errors فبتظهر أثناء التنفيذ.` },
      { why: `L1.` },
      { why: `L4.` },
      { why: `نفس Q8.` },
      { why: `L1، L8.` },
      { why: `L9. الـ Recursion محتاج <b>STACK</b>؛ والـ globals محتاجة static storage.` },
      { why: `الـ annotated tree اللي طالعة من الـ semantic analyzer بتروح للـ phase اللي بتطلّع الـ intermediate code (الـ source code optimizer في رسمة L1).` },
      { why: `L1.` },
      { why: `L1: الـ source code optimizer هو اللي بياخد الـ annotated tree.` },
      { why: `L1.` },
      { why: `L7.` },
      { why: `L7.` },
      { why: `L7.` },
      { why: `L7 (الـ parent و/أو الـ siblings).` },
      { why: `L7.` },
      { why: `L8.` },
      { why: `L8.` },
      { why: `اتنين leftmost derivations مختلفين (أو اتنين rightmost مختلفين) = ambiguity. إن يبقى فيه LMD واحد و RMD واحد ده طبيعي لأي string (L4).` },
      { why: `L4.` },
      { why: `Static و stack و heap (L9).` },
      { why: `L9.` },
      { why: `L9.` },
      { why: `مع الـ intermediate code الـ back end بس هو اللي بيتغيّر مع كل target machine، فمش محتاجين compiler native كامل لكل machine.` },
      { why: `نفس السؤال ده بالظبط اتكرر في 2023/24 (60) و 2023/24 Summer، ونسخة الـ T/F منه في 2024/25. استخدم "right".` },
      { why: `L7.` },
    ] },
    { items: [
      { why: `L9.` },
      { why: `الـ compilers بتاخد وقت طويل في الـ <b>ANALYZE</b>؛ لكن التنفيذ أسرع (L1).` },
      { why: `L1.` },
      { why: `L2.` },
      { why: `L7.` },
      { why: `L8: يا tables لكل scope يا table واحدة لكل الـ scopes.` },
      { why: `الحل التاني في L8: الـ item اللي في الأول هو دايمًا الصح، فمش بياخد وقت.` },
      { why: `الـ interpreters مش بتطلّع أي intermediate code (L1).` },
      { why: `الـ syntax analysis بيطلّع الـ syntax tree؛ والـ annotated tree بتيجي من الـ semantic analysis (L1).` },
      { why: `L2.` },
      { why: `في العموم L1L2 ≠ L2L1 (L2).` },
      { why: `أي string ليها leftmost و rightmost derivation؛ الـ ambiguity محتاجة اتنين leftmost مختلفين (أو اتنين rightmost)، يعني two parse trees (L4).` },
      { why: `L7.` },
      { why: `ده الـ synthesized؛ أما الـ inherited فبتيجي من الـ parent/siblings (L7).` },
      { why: `L9.` },
    ] },
    { items: [
      { why: `الـ sheet بتجاوب برسمة L1 بس.`, ans: `<pre>Source code
   ↓
Scanner ─────────────┐
   ↓ tokens          │
Parser               │     Literal table
   ↓ syntax tree     │
Semantic analyzer    ├──── Symbol table
   ↓ annotated tree  │
Source code optimizer│     Error handler
   ↓ intermediate code
Code generator       │
   ↓ target code     │
Target code optimizer┘
   ↓
Target code</pre>` },
      { why: `الإجابة الرسمية؛ واتراجعت خطوة خطوة. الـ parse trees مرسومة في إجابة Q2-b بتاعة 2021/22.`, ans: `<pre>LMD 1: S ⇒ 0A ⇒ 00AA ⇒ 001SA ⇒ 0011BA ⇒ 00110A ⇒ 001101
        (A→0AA, A→1S, S→1B, B→0, A→1)
LMD 2: S ⇒ 0A ⇒ 00AA ⇒ 001A ⇒ 0011S ⇒ 00110A ⇒ 001101
        (A→0AA, A→1, A→1S, S→0A, A→1)</pre>بما إن فيه أكتر من leftmost derivation لنفس الـ string، يبقى الـ grammar دي ambiguous.` },
      { why: `الإجابة الرسمية (L9).`, ans: `<pre>┌──────────────────────┐  ┐
│  Text memory         │  │ fixed
├──────────────────────┤  │
│  Static data         │  ┘
├──────────────────────┤  ┐
│  Stack memory   ↓    │  │
│                      │  │ dynamic
│  Heap memory    ↑    │  │
└──────────────────────┘  ┘</pre><b>الـ Static allocation</b>: الـ data بتتربط بمكان ثابت مش بيتغيّر أثناء التنفيذ؛ أماكن الـ storage معروفة من الأول، فمش محتاجين runtime support package.<br><b>الـ Stack allocation</b>: الـ procedure calls والـ activations بتاعتها بتتدار بـ stack (LIFO)؛ ومفيدة جدًا للـ recursive calls.<br><b>الـ Heap allocation</b>: الميموري بتتعمل allocate و de-allocate وقت الـ run بس، وبترجع تاني لما مانحتاجهاش. الـ Stack والـ heap بيكبروا ويصغروا dynamically، فمينفعش نديهم مساحة ميموري ثابتة.` },
      { why: `Loop optimization / code hoisting (مثال الـ arr.length في L9).`, ans: `<pre>int x = a→length-1;
for (i=0; i &lt; x ; i++)
   swap_elements(a[i],a[ i+1]);</pre>بدل ما نحسب length-1 عدد مرات قد طول الـ array، نخزّنها مرة واحدة في integer x ونخلّي الـ x هي الـ terminating condition. كده الـ length-1 بتتحسب مرة واحدة بس، وده بيوفّر processing ووقت.` },
      { why: `الإجابة الرسمية. في LMD 2، الـ A → Aa وبعدين A → a.`, ans: `<pre>LMD 1: S ⇒ aaB ⇒ aab
LMD 2: S ⇒ Ab ⇒ Aab ⇒ aab</pre>` },
      { why: `الإجابة الرسمية. Tree 1 بتقسم الـ string كده (aabb)(ccdd)؛ و tree 2 بتتداخل من برا لجوّه (a…d، a…d، b…c، b…c).`, ans: `<pre>LMD 1: S ⇒ AB ⇒ aAbB ⇒ aabbB ⇒ aabbcBd ⇒ aabbccdd
LMD 2: S ⇒ C ⇒ aCd ⇒ aaDdd ⇒ aabDcdd ⇒ aabbccdd

Tree 1:        S                Tree 2:   S
            /                            |
           A       B                      C
         / |    / |                   / |         a  A  b c  B  d                a  C  d
          /      /                    / |          a   b   c   d                 a  D  d
                                        / |                                        b  D  c
                                         /                                         b   c</pre>` },
      { why: `الرسومات الرسمية. في التانية، الـ c's والـ d's محتاجين final states منفصلة عشان مايتخلطوش.`, ans: `<b>b*a+(c|d)</b>: →0 (loop b) –a→ 1 (loop a)؛ 1 –c→ 2؛ 1 –d→ 2؛ والـ 2 final.<br><b>(a|b)*(c+|d+)</b>: →0 (loop a,b)؛ 0 –c→ 2 (final، loop c)؛ 0 –d→ 3 (final، loop d).` },
      { why: `الإجابة الرسمية (L7).`, ans: `الـ Synthesized attributes بتتعدّى لفوق في الـ syntax tree، من الـ leaves لحد الـ root (قيمة الـ node بتتحسب من الـ children بتوعها). الـ Inherited attributes بتتعدّى لتحت (من الـ parent و/أو الـ siblings). المعلومة اللي اتعملها synthesize في subtree ممكن تتعمل inherit في subtree تانية، أو في pass بعد كده في نفس الـ subtree. مثال: الـ symbol table بتتعمل synthesize من الـ declaration وبتتعمل inherit في الـ scope بتاع الـ declaration.` },
      { why: `الإجابة الرسمية؛ وهي اللي بتحدد convention الكورس في الـ dynamic binding (L8).`, ans: `الـ Static: جوّه y = 2 + 3 = 5 → بتطبع <b>5</b>؛ بعد الـ block y = 5 + 1 = 6 → بتطبع <b>6</b>.<br>الـ Dynamic: جوّه بتطبع <b>5</b>؛ بعد الـ block بنستخدم آخر x = 3: y = 5 + 3 = 8 → بتطبع <b>8</b>.<pre>x  ->  [ 1 | YES | next ] -> [ 0 | YES | NULL ]
y  ->  [ 0 | YES | NULL ]</pre>` },
      { why: `الجدول الرسمي (L1).`, ans: `<table><tr><th>Interpreter</th><th>Compiler</th></tr><tr><td>بيترجم البرنامج statement واحدة في المرة</td><td>بيعمل scan للبرنامج كله ويترجمه مرة واحدة لـ machine code</td></tr><tr><td>وقت أقل في الـ analysis للـ source code؛ والتنفيذ في المجمل أبطأ</td><td>وقت أكتر في الـ analysis للـ source code؛ والتنفيذ في المجمل أسرع</td></tr><tr><td>مفيش intermediate object code، فبيبقى موفّر في الميموري</td><td>بيطلّع intermediate object code محتاج linking، فبياخد ميموري أكتر</td></tr><tr><td>JavaScript, Python, Ruby</td><td>C, C++, Java</td></tr></table>` },
      { why: `اتراجعت: الـ {2,3} على 0 = {3} ∪ {1} = {1,3}؛ الـ {1,3} على 0 = {3} ∪ {1} = {1,3}؛ وعلى 1 الاتنين بيدّوا {2,3}.`, ans: `(a) الـ State 3 عندها loop على 1 و transition تانية على نفس الـ symbol 1 (لـ 2).<br>(b) <table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>-</td></tr><tr><td>* {3}</td><td>{1}</td><td>{2,3}</td></tr><tr><td>* {2,3}</td><td>{1,3}</td><td>{2,3}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2,3}</td></tr></table>الـ Final states: أي set فيها 3.` },
      { why: `الإجابة الرسمية. الـ call هو my_function(i, a[2]). الـ by result والـ value-result بينسخوا الـ j تاني لـ i والـ x تاني لـ a[2] (الـ address اللي اتحدد وقت الـ call)، فبيكتبوا فوق الـ a[2] := 0. الـ local int i = 0 مش بتأثر على أي حاجة بتتطبع. في الـ symbol table، الـ local i (scope 1) قدّام الـ global i (scope 0).`, ans: `<table><tr><th></th><th>By value</th><th>By result</th><th>By value-result</th></tr><tr><td>قبل</td><td>2 10 20 30</td><td>2 10 20 30</td><td>2 10 20 30</td></tr><tr><td>جوّه</td><td>j=3, x=33: 3 33 10 20 0</td><td>j=0→1, x=0→3: 1 3 10 20 0</td><td>j=3, x=33: 3 33 10 20 0</td></tr><tr><td>بعد</td><td>2 10 20 0</td><td>1 10 20 3</td><td>3 10 20 33</td></tr></table>b-<pre>i     ->  [ 1 | YES | next ] -> [ 0 | YES | NULL ]
a[3]  ->  [ 0 | YES | NULL ]</pre>` },
      { why: `الإجابة الرسمية (L7).`, ans: `الـ SDT هي augmented rules بتتضاف على الـ grammar عشان تسهّل الـ semantic analysis. بتعدّي المعلومات bottom-up و/أو top-down في الـ parse tree على شكل attributes متعلّقة في الـ nodes. الطريقة العامة إننا نبني parse tree أو syntax tree ونحسب قيم الـ attributes عند الـ nodes بتاعتها وإحنا بنزورهم بترتيب معيّن. وبشكل عام، الـ SDT بتربط (1) مجموعة attributes بكل node في الـ grammar و (2) مجموعة translation rules بكل production، باستخدام attributes و constants و lexical values.` },
      { why: `الـ path الفوقاني: ε، بعدين a* (الـ loop عند 2)، بعدين a، بعدين b → a*ab = a+b. الـ path التحتاني: a، بعدين b* (الـ loop عند 4)، بعدين b → ab*b = ab+. والاتنين بيتجمعوا بـ |.`, ans: `الحل الرسمي: <b>e a+b | ab+</b>، يعني <b>a+b | ab+</b> لما الـ e تبقى ε.` },
      { why: `الإجابة الرسمية. Tree 1 = (id-id)+id، و tree 2 = id-(id+id).`, ans: `<pre>LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id
LMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id

Tree 1:       E                Tree 2:     E
            / |                         / |            E  +  E                      E  -  E
         / |    |                      |   / |         E  -  E  id                     id E  +  E
        |     |                            |     |
        id    id                           id    id</pre>اتنين leftmost derivations / parse trees لنفس الـ string، يبقى الـ grammar دي ambiguous.` },
      { why: `الإجابة الرسمية، وهي نفس Q1-b بتاع 2024/25 (60). اتراجعت: الـ {2,3} على a = {2,3} ∪ E(1) = {1,2,3}؛ الـ {1,2,3} على b = {2} ∪ {3} = {2,3}.`, ans: `الـ ε-closures: E(1) = {1,3}, E(2) = {2}, E(3) = {3}.<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→* {1,3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>{2}</td><td>{2,3}</td><td>{3}</td></tr><tr><td>{2,3}</td><td>{1,2,3}</td><td>{3}</td></tr><tr><td>{3}</td><td>{1,3}</td><td>-</td></tr><tr><td>* {1,2,3}</td><td>{1,2,3}</td><td>{2,3}</td></tr></table>الـ Final states: {1,3} و {1,2,3} (عشان فيهم 1).` },
      { why: `FOLLOW(B) = FIRST(A') − ε ∪ FOLLOW(A) = {d, $}. الـ C عمرها ما بتظهر في أي right-hand side، فالـ FOLLOW set بتاعها فاضية (الـ sheet كاتبة {-}).`, ans: `a- نشيل الـ left recursion: S → A, A → aBA', A' → dA' | ε, B → b, C → g.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{a}</td><td>{$}</td></tr><tr><td>A</td><td>{a}</td><td>{$}</td></tr><tr><td>A'</td><td>{d, ε}</td><td>{$}</td></tr><tr><td>B</td><td>{b}</td><td>{d, $}</td></tr><tr><td>C</td><td>{g}</td><td>{ } (الـ C مش reachable)</td></tr></table>الـ Table: M[S,a] = S→A; M[A,a] = A→aBA'; M[A',d] = A'→dA'; M[A',$] = A'→ε; M[B,b] = B→b; M[C,g] = C→g.<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>abd$</td><td>S→A</td></tr><tr><td>A$</td><td>abd$</td><td>A→aBA'</td></tr><tr><td>aBA'$</td><td>abd$</td><td>match a</td></tr><tr><td>BA'$</td><td>bd$</td><td>B→b</td></tr><tr><td>bA'$</td><td>bd$</td><td>match b</td></tr><tr><td>A'$</td><td>d$</td><td>A'→dA'</td></tr><tr><td>dA'$</td><td>d$</td><td>match d</td></tr><tr><td>A'$</td><td>$</td><td>A'→ε</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>` },
    ] },
  ] },
);
AR.compiler.lectures["1"].quiz.push(
  [`الـ syntax analysis بيطلّع الـ syntax tree العادية (من غير annotations).`, `صح. الـ semantic analyzer بيضيف attributes (زي الـ types وغيرها) على الـ syntax tree.`, `الـ lexical analysis بيطلّع tokens.`, `الـ code optimizer بياخد الـ annotated tree كـ <b>input</b> ويطلّع intermediate code.`],
  [`صح. الـ compiler بيترجم البرنامج الـ high-level كله لبرنامج lower-level (object/machine).`, `ده وصف الـ interpreter.`, `ده الـ assembler.`, `ده الـ loader.`],
  [`هي phase فعلًا، بس الباقيين كمان phases.`, `هي phase فعلًا، بس الباقيين كمان phases.`, `هي phase فعلًا، بس الباقيين كمان phases.`, `صح. التلاتة phases في الـ compiler.`],
  [`كلمة عامة أوي؛ ومش دي إجابة الكورس.`, `مش structure مشتركة في الـ compiler.`, `صح. الـ symbol table بتتعامل مع تقريبًا كل phase.`, `عامة أوي؛ الإجابة المحددة هي الـ symbol table.`],
  [`الـ symbol table <b>مش</b> phase.`, `الـ automata بتتبني للـ lexical analyzer، مش بالـ symbol table.`, `صح. كل phase ممكن تقرا منها أو تعدّل فيها.`, `اختيار c هو الصح.`],
  [`الـ lexical analysis بيغذّي الـ parser.`, `الـ syntax analysis بيغذّي الـ semantic analyzer.`, `صح (حسب الـ official key). الـ annotated tree اللي طالعة من الـ semantic analyzer هي اللي بتتحوّل لـ intermediate code.`, `الـ error handler ده helper، مش phase في السلسلة.`],
  [`الـ parse trees لسه بتتبني قبل الـ intermediate code.`, `صح. الـ back end بس هو اللي بيتغيّر مع كل target machine، فمش محتاجين compiler native كامل لكل machine.`, `الـ CFG لسه محتاجينها في الـ parsing.`, `الـ NFAs تبع الـ lexical analysis وملهاش علاقة هنا.`],
  [`صح (الإجابة المقصودة). الـ compilers بتطلّع intermediate code عشان مانحتاجش compiler جديد كامل لكل machine. بالظبط كده، كلمة "interpreter" المفروض تبقى "compiler".`, `الـ compilers فعلًا بتطلّع intermediate code، والهدف منه بالظبط إننا نتفادى translator كامل لكل machine.`],
  [`الـ interpreters مش بتطلّع <b>أي</b> intermediate object code.`, `صح. الـ compilers بس هي اللي بتطلّع intermediate code.`],
  [`صح. الـ compilers بتطلّع intermediate object code ومحتاج بعدها linking.`, `ده الكلام اللي بيتقال على الـ interpreters، مش الـ compilers.`],
  [`صح. وعشان كده الـ interpreters موفّرة في الميموري.`, `إن يطلع intermediate object code دي صفة <b>الـ compiler</b>.`],
  [`الـ symbol table دي data structure مشتركة بين الـ phases.`, `صح. الـ six phases هما: scanner, parser, semantic analyzer, source optimizer, code generator, target optimizer.`],
  [`صح. الـ interpreters بتعمل analysis بسرعة، بس التنفيذ في المجمل أبطأ من الكود اللي اتعمله compile.`, `بطء التنفيذ في المجمل هو بالظبط عيب الـ interpreter.`],
  [`الـ compilers بتاخد وقت طويل في الـ <b>ANALYZE</b> (الترجمة)، بس النتيجة بتتنفذ أسرع.`, `صح. البرامج اللي اتعملها compile بتتنفذ أسرع من اللي بتتعمل interpret.`],
  [`الـ syntax analysis بيطلّع الـ syntax tree العادية.`, `صح. الـ annotated tree هي output الـ semantic analysis.`],
);
AR.compiler.lectures["2"].quiz.push(
  [`الـ CFG بتعمل model للـ syntax analysis.`, `دي data structure، مش modeling formalism.`, `صح. الـ tokens بتتوصف بالـ regular expressions وبيتعرفوا بالـ finite automata.`, `الـ attribute grammar بتعمل model للـ semantic analysis.`],
  [`صح. الـ scanner (الـ lexical analyzer) بيجمّع الـ characters في tokens.`, `بيطلّع الـ target code.`, `بيحسّن الكود.`, `الـ parser بيستهلك الـ tokens؛ مش هو اللي بيعملها.`],
  [`مش phase في الـ compiler.`, `مش مصطلح في الـ compiler.`, `صح. الـ lexical analysis = scanning.`, `الـ lexical analysis بس هي اللي تنفع.`],
  [`صح. الـ scanner بيطلّع tokens.`, `الـ syntax analysis بيستهلك الـ tokens؛ الـ lexical analysis هو اللي بيطلّعها.`],
  [`كل path محتاج على الأقل a واحدة (الفوقاني) وعلى الأقل b واحدة (التحتاني): a*ab = a+b و ab*b = ab+.`, `صح. الـ path الفوقاني ε·a*·a·b = a+b؛ والتحتاني a·b*·b = ab+.`, `بتقبل strings زي bab، والـ FA بترفضها.`, `بتقبل aabb، ومفيش ولا path بيقبلها.`],
);
AR.compiler.lectures["3"].quiz.push(
  [`الـ ε move بتخلّي الـ machine تغيّر الـ state من غير input، وده non-deterministic.`, `صح. أي ε transition بتخلّي الـ automaton تبقى NFA.`],
  [`الـ DFAs ممكن يبقى فيها loops (زي الـ DFA بتاعة 1*01(0|1)*).`, `صح. الـ loop بس لو معاها transition تانية على <b>نفس</b> الـ symbol (أو ε move) هي اللي بتعمل non-determinism.`],
  [`الـ loop لوحدها مفيهاش مشكلة. وكمان 3 على 0 بتوصل لـ 1.`, `صح. δ(3,0) = {1,3} (الـ edge لـ 1 زائد الـ loop)، فالـ DFA state هي {1,3}.`, `في الورقة دي الـ loop على 0، والـ 3 ليها move واحدة بس على 1 (لـ 2).`, `مفيش ε move، والـ 2 مابنوصلهاش غير على 1.`],
  [`ناقصها الـ edge 1 –a→ 2.`, `ناقصها الـ self-loop على a.`, `صح. الـ 1 على a بتروح لـ 1 (الـ loop) و 2، فبيطلع الـ final DFA state {1,2}.`, `الـ 1 ليها moves على a فعلًا.`],
);
AR.compiler.lectures["4"].quiz.push(
  [`ترتيب ملوش معنى؛ الـ machine code ده الـ output النهائي للـ compiler.`, `صح. الـ parser بيقرا الـ token stream ويبني الـ parse/syntax tree.`, `ده الـ <b>LEXICAL</b> analyzer.`, `(a) غلط.`],
  [`الـ optimization بيحسّن كود اتعمله check خلاص.`, `بيـ check المعنى (types, declarations)، مش الـ grammar.`, `بيطلّع الـ target code.`, `صح. الـ parser بيـ check الـ token stream على الـ CFG.`],
  [`عامة أوي.`, `صح. الـ parsing بيحدد هل الـ grammar بتعمل derive للـ token string (وإزاي).`, `الترجمة دي شغلانة الـ compiler كله.`, `مش ده المصطلح اللي الكورس بيستخدمه.`],
  [`بيشتغل على الـ intermediate/target code.`, `بيمشي حسب الـ target machine، مش الـ grammar.`, `صح. الـ parser بيتبني من الـ CFG.`, `بيستخدم regular expressions/finite automata.`],
  [`ده ترتيب derivation، مش property في الـ grammar.`, `صح. A ⇒+ Aα ده left recursion؛ وبيخلّي الـ top-down parsers تفضل تلف للأبد.`, `بيشيل الـ common prefixes؛ ده transformation تانية.`, `مش مصطلح standard هنا.`],
  [`دي property في الـ grammar، مش ترتيب derivation.`, `مش نوع derivation.`, `مش نوع derivation.`, `صح. Leftmost derivation.`],
  [`كل الـ phases بتستخدم الـ symbol table؛ دي مش شغلانة الـ parser.`, `الـ types بيتعامل معاها الـ semantic analysis.`, `صح. الـ parser بيبني الـ parse/syntax tree.`, `اختيار c هو الصح.`],
  [`الـ Unambiguous معناها tree واحدة بالظبط.`, `صح (حسب الـ official key). اقرا "one or more" على إنها "أكتر من واحدة": وده الـ ambiguity.`, `الـ key اختار ambiguous.`, `الـ key اختار ambiguous.`],
  [`الـ semantic analysis بيـ check المعنى.`, `الـ lexical analysis = scanning.`, `صح. الـ parsing = syntax analysis.`, `اختيار c هو الصح.`],
  [`بيستخدم regular expressions.`, `صح. الـ syntax analysis معمولها model على الـ CFG.`, `بيستخدم attribute grammar.`, `اختيار b هو الصح.`],
  [`الـ derivations بتاعة الـ sentences دايمًا بتبدأ من الـ start symbol.`, `صح. الـ derivation بيبدأ من الـ start symbol S.`],
  [`أي string ليها leftmost derivation و rightmost derivation، حتى في grammar مش ambiguous.`, `صح. الـ ambiguity محتاجة اتنين <b>LEFTMOST</b> derivations مختلفين (أو اتنين rightmost مختلفين)، يعني two parse trees.`],
  [`الـ / مش ممكن تيجي غير من op → /.`, `صح. Tree 1: E op E والـ op = +. Tree 2: E op E والـ op = ε والـ E اللي على اليمين = +E.`, `الأقواس terminals ولازم تظهر زي ما هي مكتوبة بالظبط.`, `الـ op عمرها ما بتعمل derive لـ num.`],
);
AR.compiler.lectures["6"].quiz.push(
  [`الـ Bottom-up بيبدأ من الـ input ويعمل reduce لحد الـ start symbol.`, `صح. الـ Top-down (زي LL(1)) بيبدأ من الـ root S ويعمل expand ناحية الـ input.`, `اختيار b هو الصح.`, `الـ top-down بس هو اللي بيبدأ من الـ start symbol.`],
  [`الـ entry دي تحت d (FIRST(dA') = {d}).`, `صح. FOLLOW(A') = {$}، فالـ ε-production بتتحط تحت $. (الـ sheet كاتبها غلط "A→ε".)`, `دي M[A, a].`, `الـ $ موجودة في FOLLOW(A')، فالخانة مليانة.`],
);
AR.compiler.lectures["7"].quiz.push(
  [`صح. دي واحدة من الـ three definite-assignment states.`, `مش واحدة من الـ states.`, `مش واحدة من الـ states؛ الحالة اللي مش متأكدين فيها اسمها "unknown".`, `اختيار a هو الصح.`],
  [`مش نوع attribute.`, `ده ترتيب derivation، مش نوع attribute.`, `ده ترتيب derivation، مش نوع attribute.`, `صح. الإجابة هي "synthesized attributes"، ومش موجودة في الاختيارات (الاختيارات اتطبعت غلط).`],
  [`دي لغة الـ input بتاعة الـ compiler، مش model.`, `دي ناحية الـ output.`, `الـ CFG بتعمل model للـ <b>SYNTAX</b> analysis.`, `صح. الـ semantic analysis بيستخدم attribute grammar عشان يطلّع الـ annotated tree.`],
  [`ده وصف الـ synthesized attributes.`, `صح. الـ inherited attributes بتيجي من الـ parent و/أو الـ siblings.`],
  [`صح. لما نـ evaluate الـ attribute rules على الـ syntax tree بتطلع الـ annotated tree.`, `دي بالظبط شغلانة الـ semantic analyzer.`],
);
AR.compiler.lectures["8"].quiz.push(
  [`صح، بس مش ده الاستخدام الوحيد.`, `صح، بس مش ده الاستخدام الوحيد.`, `صح، بس مش ده الاستخدام الوحيد.`, `صح (حسب الـ official key). الـ symbol table بتدعم التلاتة.`],
  [`صح. جوّه: 20+3 = 23. بعد الـ block: الـ static بيستخدم الـ i اللي برا = 10 (33)؛ والـ dynamic (حسب convention الكورس) لسه بيستخدم i = 3 (26).`, `معكوسة: الـ static هو اللي بيرجع للـ i اللي برا.`, `الـ block الداخلي بيستخدم i = 3 في الحالتين.`, `حسب الـ dynamic convention بتاعة الكورس، آخر i = 3 لسه هي اللي بتتستخدم.`],
  [`الـ declaration الأحدث بتتحط في <b>الأول</b>، فـ scope 1 بييجي الأول.`, `صح. الـ i الداخلية (scope 1) قدّام الـ i اللي برا (scope 0).`, `الـ i اللي برا لسه في scope مفتوح وبتفضل في الـ list.`, `الـ declaration الداخلي ناقص.`],
  [`ده نتيجة الـ static binding.`, `صح. آخر x = 6 لسه هي اللي بتتستخدم: y = 8 + 6 = 14.`, `ده الـ print الداخلي؛ الـ y بتتغيّر تاني بعد الـ block.`, `بيتجاهل الـ y += x اللي جوّه.`],
);
AR.compiler.lectures["9"].quiz.push(
  [`مش technique في الكورس.`, `صح. الـ peephole techniques: redundant load/store elimination، constant folding، combine operations.`, `مش technique؛ الـ annotated tree دي ناتج الـ semantic analysis.`, `الـ NFAs تبع الـ lexical analysis.`],
  [`صح، بس b كمان صح.`, `صح، بس a كمان صح.`, `صح. الاتنين peephole optimization techniques.`, `ده output الـ semantic analyzer، مش optimization.`],
  [`الـ peephole optimization بيشتغل على أي window صغيرة من الـ instructions.`, `صح. الـ loops هي هدف الـ <b>LOOP</b> optimization، ودي technique منفصلة.`],
  [`صح. الـ optimization بيقلّل استخدام الميموري ويزوّد السرعة، زي الـ redundant load/store elimination.`, `إننا نشيل الـ redundancy عشان نوفّر وقت ومساحة ده تعريف الـ optimization نفسه.`],
  [`ده الـ pass by value: مفيش حاجة بتترجع.`, `صح. الـ formals بتبدأ بـ 0: y = 2، x = 8؛ وبيترجعوا لـ i و a[1] (الـ address اللي اتحدد وقت الـ call).`, `ده الـ value-result (القيم الأولية بتتنسخ جوّه).`, `الـ x مربوطة بـ a[1] (الـ i كانت 1 وقت الـ call)، مش a[2].`],
  [`صح. y = 1+2 = 3، x = 4+8 = 12، وبيترجعوا لـ i و a[1]؛ والـ a[2] = 0 بتفضل زي ما هي.`, `ده الـ pass by result (الـ formals بتبدأ بـ 0).`, `الـ x بترجع لـ a[1]، الـ address اللي اتحدد وقت الـ call، مش a[2] ولا a[الـ i الجديدة].`, `ده الـ pass by value.`],
);

// Egyptian Arabic for Compiler Design, aligned item by item with compiler.js and extra/compiler.js.
window.AR = window.AR || {};
AR.compiler = {
 "lectures": {
  "1": {
   "notes": [
    {
     "h": "يعني إيه compiler؟",
     "pts": [
      "الـ <b>compiler</b> بيترجم (يعمل compile) لبرنامج مكتوب بلغة <b>high-level</b> مناسبة للمبرمجين، ويحوّله لـ <b>low-level machine language</b> اللي الكمبيوتر محتاجها. وهو بيعمل كده كمان بيحاول <b>يمسك ويبلّغ عن أخطاء المبرمج الواضحة</b>.",
      "الـ <b>interpreter</b> طريقة تانية لتنفيذ لغة البرمجة. الـ interpretation فيها حاجات كتير شبه الـ compiling.",
      "كود المادة على السلايدز: <b>3CS – CS309-Credit</b>. الامتحانات بتستخدم <b>CS321</b> (Compiler Design and Theory) و <b>CS309</b> (Compiler Theory)."
     ]
    },
    {
     "h": "الـ compilers مقابل الـ interpreters",
     "figH": {
      "cc-comp-vs-interp": "الـ interpreter مقابل الـ compiler صف بصف: الترجمة والسرعة والـ memory واللغات"
     }
    },
    {
     "h": "مراحل (phases) الـ compiler (ارسم الشكل ده)",
     "pts": [
      "الـ six phases كلهم بيتعاملوا مع الـ <b>literal table</b> والـ <b>symbol table</b> والـ <b>error handler</b>. دول data structures وأدوات مساعدة، <b>مش phases</b>. الامتحانات كتير بتسأل \"الـ symbol table مش phase\".",
      "سلسلة الـ input/output هي: <b>source code → tokens → syntax tree → annotated tree → intermediate code → target code → (optimized) target code</b>.",
      "الـ \"Testing\" <b>مش</b> phase من phases الـ compiler."
     ],
     "figH": {
      "cc-phases": "المثال <bdi>a[index]=4+2</bdi> وهو بيعدّي على الـ six phases، ومعاهم الـ three helpers المشتركين",
      "cc-is-phase": "جرّب: ده phase ولا مش phase؟"
     }
    },
    {
     "h": "1) الـ Lexical analysis (الـ scanner)",
     "pts": [
      "بيجمّع سلاسل الحروف في وحدات ليها معنى اسمها <b>tokens</b>.",
      "مثال: <code>a[index]=4+2</code> بيطلّع: <code>a</code> identifier، <code>[</code> left bracket، <code>index</code> identifier، <code>]</code> right bracket، <code>=</code> assignment، <code>4</code> number، <code>+</code> plus sign، <code>2</code> number."
     ],
     "figH": {
      "cc-scanner": "جرّب: اعمل scan للـ <bdi>a[index]=4+2</bdi> (أو لسطر من عندك) token ورا token"
     }
    },
    {
     "h": "2) الـ Syntax analysis (الـ parser)",
     "pts": [
      "بيحدد <b>تركيب (structure)</b> البرنامج. النتيجة بتبقى <b>parse tree</b> أو <b>syntax tree</b> (abstract syntax tree).",
      "الـ parse tree بتاع <code>a[index]=4+2</code> بيحتفظ بكل node في الـ grammar: expression → assign-expression → expression = expression → subscript-expression (expression [ expression ]) و additive-expression (expression + expression) → وبعدين الأوراق identifier/number.",
      "شكل (slide 7, The Parse Tree): <b>expression</b> → <b>Assign-expression</b>؛ والـ Assign-expression ليها 3 children: expression و = و expression. الـ expression الشمال → <b>subscript-expression</b>، والـ children بتوعها Expression و [ و expression و ]؛ الـ Expression → identifier → <code>a</code>؛ والـ expression → identifier → <code>index</code>. الـ expression اليمين → <b>additive-expression</b>، والـ children بتوعها expression و + و expression؛ الـ expression → number → <code>4</code>؛ والـ expression → number → <code>2</code>.",
      "الـ <b>syntax tree</b> (AST) هو النسخة المختصرة: assign-expression وتحته children هما subscript-expression(a, index) و additive-expression(4, 2).",
      "شكل (slide 8, The Syntax Tree): الـ <b>Assign-expression</b> ليها 2 children، هما <b>subscript-expression</b> و <b>additive-expression</b>. الـ subscript-expression → identifier (<code>a</code>) و identifier (<code>index</code>). الـ additive-expression → number (<code>4</code>) و number (<code>2</code>)."
     ],
     "figH": {
      "cc-parse-tree": "الـ parse tree بتاع <bdi>a[index]=4+2</bdi> بكل nodes الـ grammar (slide 7)",
      "cc-syntax-tree": "الـ syntax tree المختصرة (AST) بتاعة <bdi>a[index]=4+2</bdi> (slide 8)"
     }
    },
    {
     "h": "3) الـ Semantic analyzer",
     "pts": [
      "الـ semantics بتاعة البرنامج هي <b>\"معناه\"</b>، عكس الـ syntax اللي هو التركيب. الـ semantics بتحدد جزء من سلوك البرنامج وقت التشغيل <b>قبل</b> ما يتنفّذ.",
      "الـ <b>Static semantics</b>: الـ declarations والـ type checking.",
      "الـ <b>Attributes</b>: معلومات زيادة الـ semantic analyzer بيحسبها. والنتيجة هي الـ <b>annotated syntax tree</b>: <code>a</code> = array of integer، <code>index</code> = integer، <code>4</code> و <code>2</code> = integer، الـ subscript-expression = integer، الـ additive-expression = integer.",
      "شكل (slide 10, The Annotated Syntax Tree): الـ syntax tree بتاع <code>a[index]=4+2</code> وتحت كل node الـ attribute بتاعها. الـ <b>Assign-expression</b> ليها 2 children: <b>subscript-expression</b> (integer) و <b>additive-expression</b> (integer). الـ subscript-expression → identifier <code>a</code> (array of integer) و identifier <code>index</code> (integer). الـ additive-expression → number <code>4</code> (integer) و number <code>2</code> (integer)."
     ],
     "figH": {
      "cc-annotated-tree": "الـ semantic analyzer بيضيف الـ types، فتطلع الـ annotated syntax tree (slide 10)"
     }
    },
    {
     "h": "4) الـ Source code optimizer",
     "pts": [
      "أول نقطة لمعظم خطوات الـ optimization هي <b>بعد الـ semantic analysis على طول</b>.",
      "تحسين الكود ده بيعتمد على الـ source code بس، وهو phase لوحده. الـ compilers بتختلف جدًا في أنواع الـ optimization اللي بتعملها وفين بتحطها.",
      "الـ <b>Constant folding</b> على الـ annotated tree: <code>4+2</code> بتتحوّل لـ node واحدة هي <code>6</code>.",
      "شكل (slides 12 و 13, Optimizations on Annotated Tree): قبل، الشجرة هي الـ annotated syntax tree. بعد الـ folding، الـ <b>Assign-expression</b> ليها 2 children: الـ <b>subscript-expression</b> (integer) وتحتها identifier <code>a</code> (array of integer) و identifier <code>index</code> (integer)، و <b>number <code>6</code></b> واحد (integer) بياخد مكان الـ additive-expression والـ numbers بتوعها 4 و 2.",
      "أو على الـ intermediate code (three-address code، p-code): <code>t = 4 + 2; a[index] = t</code> → <code>t = 6; a[index] = t</code> → <code>a[index] = 6</code>."
     ],
     "figH": {
      "cc-fold-tree": "الـ constant folding على الـ annotated tree، والـ <bdi>4+2</bdi> بتبقى node واحدة <bdi>6</bdi>",
      "cc-fold-ir": "نفس الـ folding على الـ intermediate code، من سطرين لـ <bdi>a[index]=6</bdi>"
     }
    },
    {
     "h": "5) الـ Code generator و 6) الـ target code optimizer",
     "pts": [
      "الـ <b>code generator</b> بياخد الـ intermediate code (IR) ويطلّع كود للـ <b>target machine</b>. هنا <b>خصائص الـ target machine</b> بتبقى العامل الأساسي: الـ instructions بتاعتها وطريقة تمثيل الداتا. المثال code sequence بـ assembly language افتراضية (‡ MUL R0,2 عشان الـ integer معتبر حجمه 2 bytes على الجهاز ده؛ السلايد مش بيقول السبب).",
      "الـ <b>target code optimizer</b> بيحسّن الكود اللي اتولّد: <b>اختيار الـ address modes</b>، <b>استبدال instructions</b> (الضرب في 2 يبقى SHL، يعني shift left) و <b>شيل الـ instructions الزيادة (redundant)</b>."
     ],
     "figH": {
      "cc-codegen": "من <bdi>a[index]=6</bdi> لـ assembly، وبعدين الـ 5 instructions بيبقوا 3 بعد الـ optimization"
     }
    },
    {
     "h": "الـ data structures الأساسية للتواصل بين الـ phases",
     "pts": [
      "الـ <b>Tokens</b>: الـ scanner بيجمّع الحروف في token، وبيتخزن كـ <b>قيمة من enumerated data type</b>. ممكن كمان يحتفظ بالـ string أو معلومات تانية (اسم الـ identifier، قيمة الرقم). بيتخزن في <b>global variable واحد</b> أو <b>array</b> من الـ tokens.",
      "الـ <b>Syntax tree</b>: structure عادي <b>pointer-based</b> الـ parser هو اللي بيبنيه. كل node بتمثّل معلومات جمعها الـ parser أو phases بعده، والمعلومات دي ممكن تبقى <b>dynamically allocated أو متخزنة في الـ symbol table</b>. الـ node محتاجة attributes مختلفة حسب نوع التركيب في اللغة، وده ممكن يتمثّل كـ <b>variable record</b>.",
      "الـ <b>Symbol table</b>: بيحتفظ بمعلومات عن الـ identifiers (functions، variables، constants، data types). بيتعامل مع <b>تقريبًا كل phase</b>. الوصول ليه لازم يبقى <b>constant-time</b>، عشان كده غالبًا بيستخدموا <b>hash table</b> واحد أو أكتر.",
      "الـ <b>Literal table</b>: بيخزّن الـ <b>constants والـ strings</b>، وده بيقلل حجم البرنامج. الـ insertion والـ lookup السريع مهمين جدًا.",
      "الـ <b>Intermediate code</b>: بيتخزن كـ array من text strings، أو text مؤقت، أو linked list من structures (زي three-address code، p-code). لازم يبقى سهل نعيد ترتيبه.",
      "الـ <b>Temporary files</b>: بتشيل نواتج الخطوات الوسطانية. بتحل مشكلة قلة الـ memory وبتسمح بالـ <b>back-patching</b> للعناوين أثناء الـ code generation."
     ],
     "figH": {
      "cc-data-structs": "جرّب: الـ six data structures اللي بتنقل المعلومات بين الـ phases"
     }
    }
   ],
   "cards": [
    "بيترجم برنامج high-level لـ low-level machine language وبيبلّغ عن أخطاء المبرمج الواضحة.",
    "الـ Interpreter: statement واحدة في المرة. الـ Compiler: البرنامج كله مرة واحدة.",
    "الـ compiler (وبعدها محتاج linking). الـ interpreters مش بتطلّع intermediate object code.",
    "ناتج الـ compiler. الـ compilers بتاخد وقت أطول في الـ analysis بس التنفيذ أسرع.",
    "Scanner، parser، semantic analyzer، source code optimizer، code generator، target code optimizer.",
    "Literal table، symbol table، error handler (ودول مش phases).",
    "Tokens.",
    "parse tree / syntax tree.",
    "الـ annotated syntax tree.",
    "الـ annotated syntax tree (والـ output بتاعه intermediate code).",
    "الـ Declarations والـ type checking.",
    "معلومات زيادة بيحسبها الـ semantic analyzer (زي الـ types).",
    "الـ 4+2 بتتبدّل بـ 6 وقت الـ compile.",
    "اختيار الـ address modes، استبدال الـ instructions، وشيل الكود الـ redundant.",
    "عشان عمليات الوصول لازم تبقى constant-time.",
    "بيخزّن الـ constants والـ strings عشان يقلل حجم البرنامج."
   ],
   "qa": [
    "Source code → Scanner → tokens → Parser → syntax tree → Semantic analyzer → annotated tree → Source code optimizer → intermediate code → Code generator → target code → Target code optimizer → target code. وكل الـ phases متوصلة بالـ literal table والـ symbol table والـ error handler.",
    "الـ Interpreter: statement واحدة في المرة؛ وقت analysis أقل بس التنفيذ أبطأ؛ مفيش intermediate object code فبيوفّر memory؛ أمثلة: JavaScript، Python، Ruby. الـ Compiler: البرنامج كله مرة واحدة؛ وقت analysis أكتر بس التنفيذ أسرع؛ بيطلّع intermediate object code محتاج linking فبياخد memory أكتر؛ أمثلة: C، C++، Java.",
    "الـ Scanner: a(id) [ index(id) ] = 4(num) + 2(num). الـ Parser: syntax tree هو assign(subscript(a,index), add(4,2)). الـ Semantic: بيعمل annotate لـ a إنها array of integer والباقي integer. الـ Optimizer: بيعمل fold لـ 4+2 لـ 6 فتبقى a[index]=6. الـ Code generator: MOV R0,index; MUL R0,2; MOV R1,&a; ADD R1,R0; MOV *R1,6. الـ Target optimizer: MOV R0,index; SHL R0; MOV &a[R1],6 (زي ما مكتوب في السلايد؛ ‡ الـ R1 مبقاش بيتحمّل، فالمقصود &a[R0]).",
    "الـ Tokens، الـ syntax tree، الـ symbol table، الـ literal table، الـ intermediate code، والـ temporary files."
   ],
   "quiz": [
    [
     "الـ scanner هو phase 1 (الـ lexical analysis): بياخد الـ source code ويحوّله لـ tokens، يعني هو phase حقيقية.",
     "صح. الـ symbol table ده data structure كل الـ phases بتستخدمه، مش phase.",
     "الـ parser هو phase 2 (الـ syntax analysis): بياخد الـ tokens ويطلّع الـ syntax tree، يعني هو phase حقيقية.",
     "الـ source والـ target code optimizers الاتنين phases."
    ],
    [
     "الـ syntax analysis (الـ parser) هي phase 2 في رسمة المحاضرة: tokens داخلة وsyntax tree طالعة.",
     "الـ semantic analysis هي phase 3: بتعمل type checking على الـ syntax tree وتطلّع الـ annotated tree.",
     "صح. الـ Testing نشاط من software engineering، مش phase في الـ compiler.",
     "الـ optimization phase فعلًا، وبتحصل مرتين في الرسمة: الـ source code optimizer (phase 4) والـ target code optimizer (phase 6)."
    ],
    [
     "صح. البرامج اللي اتعملها compile بتتنفذ <b>أسرع</b>؛ الـ interpreters هي اللي وقت تنفيذها أكتر.",
     "دي صفة فعلًا في الـ compilers: الأخطاء مش بتظهر غير بعد ما البرنامج كله يتعمله analysis.",
     "دي صفة فعلًا في الـ compilers: البرنامج كله بيتحلل الأول، ومش بيشتغل غير لما يتعمله compile من غير أي syntax errors.",
     "ده صح: جدول المحاضرة بيقول إن الـ compiler بيعمل scan للبرنامج كله ويترجمه مرة واحدة على بعضه لـ machine code."
    ],
    [
     "الـ machine code صح، بس الـ binary code صح برضه (الـ machine code أصلًا binary)، فالإجابة الكاملة هي «both a and c».",
     "المحاضرة بتقول إن الـ compiler بيطلّع low-level machine language؛ هو بيطلّع object code لسه محتاج linking عشان يبقى executable.",
     "الـ binary code صح، بس الـ machine code هو نفس الحاجة حسب تعريف المحاضرة، فالإجابة الكاملة هي «both a and c».",
     "صح (حسب الـ official key). الـ machine code هو نفسه binary code."
    ],
    [
     "صح (حسب الـ official key). الـ syntax errors بتتمسك وقت الـ compile.",
     "الـ logic errors بتطلّع نتايج غلط وقت التشغيل؛ الـ compiler مش بيشوفها.",
     "الـ runtime errors بتحصل أثناء التنفيذ، بعد الـ compilation.",
     "الـ compiler بيبلّغ عن الـ syntax errors بس."
    ],
    [
     "مش دي نقطة الاختلاف في جدول المحاضرة.",
     "صح. الـ compilers بتطلّع intermediate object code؛ الـ interpreters لأ.",
     "الـ compilers والـ interpreters الاتنين لازم يتشيكوا على المعنى والـ types، فالـ semantic analysis مش هي اللي بتفرّق بينهم.",
     "فيه فرق فعلًا: جدول المحاضرة بيقول إن الـ compilers بتطلّع intermediate object code والـ interpreters لأ."
    ],
    [
     "الـ syntax analysis بتاخد الـ tokens من الـ scanner وتطلّع الـ syntax tree العادية، مش الـ annotated.",
     "صح. الـ semantic analyzer بيطلّع الـ annotated tree، والـ source code optimizer بياخده.",
     "الـ semantic analysis هي اللي <b>بتطلّع</b> الـ annotated tree؛ الـ input بتاعها هو الـ syntax tree.",
     "الـ derivation دي فكرة في الـ parsing (إنك تعيد الكتابة بقواعد الـ grammar)، مش واحدة من الـ six compiler phases."
    ],
    [
     "الـ stream of tokens ده output الـ scanner وinput الـ parser (الـ syntax analysis).",
     "صح. الـ parser بيطلّع الـ syntax tree، والـ semantic analyzer بياخدها ويزوّد عليها attributes زي الـ types (L1, Phases of a compiler).",
     "الـ annotated syntax tree ده output الـ semantic analyzer؛ وبعدين بيروح للـ source code optimizer.",
     "الـ assembly (target) code بيطلع من الـ code generator قرب الآخر، بعد الـ semantic analysis بكتير."
    ],
    [
     "صح. الـ optimizers (الـ source code والـ target code) بيحسّنوا الكود عشان يشتغل أسرع وياخد memory أقل، زي الـ constant folding إن 4+2 → 6 وإن MUL → SHL (L1, Source/Target code optimizer).",
     "الـ syntax analysis بتحدد بس الـ structure بتاع البرنامج (الـ parse tree أو الـ syntax tree)؛ مش بتحسّن الكود.",
     "الـ semantic analysis بتتشيك على المعنى (الـ declarations والـ type checking)؛ مش بتخلّي الكود أسرع أو أصغر.",
     "الـ code optimization هي بالظبط الـ phase اللي هدفها السرعة والـ memory، فـ «none» غلط."
    ],
    [
     "الـ optimizer التاني بيشتغل على الـ target code (assembly) اللي اتولّد في مثال المحاضرة.",
     "صح. Source code optimizer + target code optimizer (والـ target code هنا assembly: MOV، MUL...).",
     "الـ optimizer الأول بيشتغل على الـ source/intermediate code.",
     "الـ optimizer التاني في المحاضرة شغال على الـ target code اللي متعرض كـ assembly (MOV, MUL, SHL)، مش على binary code."
    ],
    [
     "الـ ADD R0,R0 كانت هتضاعف R0 برضه، بس الكود المتحسّن في السلايد بيستخدم SHL R0 (shift left)، مش ADD.",
     "صح. الضرب في 2 = shift left بـ bit واحدة (instruction replacement).",
     "الـ MOV R0,2 هتكتب 2 فوق الـ index بدل ما تضاعفه، يعني هتغيّر معنى البرنامج.",
     "الـ index لسه لازم يتضرب في 2 (حجم الـ integer) عشان نوصل للـ address، فالـ instruction بتتبدل بـ SHL، مش بتتشال."
    ],
    [
     "هو كمان محتاج insert/lookup سريع، بس السلايد ذكر الـ hashing للـ symbol table.",
     "صح. عمليات الوصول للـ symbol table لازم تبقى constant-time، فغالبًا بيستخدموا hash table واحد أو أكتر (L1, Principal data structures).",
     "الـ syntax tree ده structure عادي معمول بالـ pointers والـ parser هو اللي بيبنيه، مش hash table.",
     "بتتستخدم للنواتج الوسطانية والـ back-patching."
    ],
    [
     "الـ syntax analysis بيطلّع الـ syntax tree العادية (من غير annotations).",
     "صح. الـ semantic analyzer بيضيف attributes (زي الـ types وغيرها) على الـ syntax tree.",
     "الـ lexical analysis بيطلّع tokens؛ الـ annotated tree بتيجي بعدها بـ phaseين، من الـ semantic analyzer.",
     "الـ code optimizer بياخد الـ annotated tree كـ <b>input</b> ويطلّع intermediate code."
    ],
    [
     "صح. الـ compiler بيترجم البرنامج الـ high-level كله لبرنامج lower-level (object/machine).",
     "إنه يبان كأنه بينفّذ الـ source program على طول ده وصف الـ interpreter، اللي بيشغّله statement by statement.",
     "ترجمة الـ assembly language لـ machine language دي شغلانة الـ assembler، مش الـ compiler.",
     "إنك تحط البرامج في الـ memory وتجهّزها للتشغيل دي شغلانة الـ loader، مش الـ compiler."
    ],
    [
     "الـ code generation هي phase 5، بس الـ scanner والـ parser phases هما كمان، فالإجابة الكاملة «all of the mentioned».",
     "الـ syntax analyzer (الـ parser) هو phase 2، بس الاختيارين التانيين phases برضه، فاختار «all of the mentioned».",
     "الـ lexical analyzer (الـ scanner) هو phase 1، بس الاختيارين التانيين phases برضه، فاختار «all of the mentioned».",
     "صح. الـ lexical analyzer (phase 1) والـ syntax analyzer (phase 2) والـ code generator (phase 5) التلاتة موجودين في رسمة الـ phases في المحاضرة (L1, Phases of a compiler)."
    ],
    [
     "كلمة «Records» عامة أوي؛ الـ structure اللي المحاضرة بتقول إن الـ phases كلها بتشاركها هو الـ symbol table.",
     "البرنامج ده الحاجة اللي الـ compiler بيترجمها، مش data structure مشتركة بين الـ phases بتاعته.",
     "صح. الـ symbol table بتتعامل مع تقريبًا كل phase.",
     "عامة أوي؛ الإجابة المحددة هي الـ symbol table."
    ],
    [
     "الـ symbol table ده data structure جنب الـ phases في الرسمة، مش phase في حد ذاته (فخ مشهور في الامتحانات).",
     "الـ automata بتتبني للـ lexical analyzer، مش بالـ symbol table.",
     "صح. الـ symbol table بيحتفظ بمعلومات عن الـ identifiers وبيتعامل مع كل phase تقريبًا في الـ compiler (L1, Principal data structures).",
     "المحاضرة بتقول إن الـ symbol table بيستخدمه (بيتعامل معاه) كل phase تقريبًا، فاختيار c هو الصح."
    ],
    [
     "الـ lexical analysis بيطلّع tokens، ودي بتروح للـ parser، مش للـ intermediate code generation.",
     "الـ syntax analysis بيطلّع الـ syntax tree، ودي بتروح للـ semantic analyzer قبل ما أي intermediate code يتعمل.",
     "صح (حسب الـ official key). الـ annotated tree اللي طالعة من الـ semantic analyzer هي اللي بتتحوّل لـ intermediate code.",
     "الـ error handler ده helper، مش phase في السلسلة."
    ],
    [
     "الـ parse trees لسه بتتبني قبل الـ intermediate code.",
     "صح. الـ back end بس هو اللي بيتغيّر مع كل target machine، فمش محتاجين compiler native كامل لكل machine.",
     "الـ context-free grammar لسه الـ parser محتاجها؛ الـ intermediate code مش بيلغيها.",
     "الـ NFAs تبع الـ lexical analysis وملهاش علاقة هنا."
    ],
    [
     "صح (الإجابة المقصودة). الـ compilers بتطلّع intermediate code عشان مانحتاجش compiler جديد كامل لكل machine. بالظبط كده، كلمة \"interpreter\" المفروض تبقى \"compiler\".",
     "الـ compilers فعلًا بتطلّع intermediate code، والهدف منه بالظبط إننا نتفادى translator كامل لكل machine."
    ],
    [
     "الـ interpreters مش بتطلّع <b>أي</b> intermediate object code.",
     "صح. الـ compilers بس هي اللي بتطلّع intermediate code."
    ],
    [
     "صح. الـ compilers بتطلّع intermediate object code ومحتاج بعدها linking.",
     "«False» ده وصف الـ interpreter: جدول المحاضرة بيقول إن الـ interpreters مش بتطلّع intermediate object code، إنما الـ compilers بتطلّع."
    ],
    [
     "صح. وعشان كده الـ interpreters موفّرة في الميموري.",
     "إن يطلع intermediate object code دي صفة <b>الـ compiler</b>."
    ],
    [
     "الـ symbol table دي data structure مشتركة بين الـ phases.",
     "صح. الـ six phases هما: scanner, parser, semantic analyzer, source optimizer, code generator, target optimizer."
    ],
    [
     "صح. الـ interpreters بتعمل analysis بسرعة، بس التنفيذ في المجمل أبطأ من الكود اللي اتعمله compile.",
     "بطء التنفيذ في المجمل هو بالظبط عيب الـ interpreter."
    ],
    [
     "الـ compilers بتاخد وقت طويل في الـ <b>ANALYZE</b> (الترجمة)، بس النتيجة بتتنفذ أسرع.",
     "صح. البرامج اللي اتعملها compile بتتنفذ أسرع من اللي بتتعمل interpret."
    ],
    [
     "الـ syntax analysis بيطلّع الـ syntax tree العادية.",
     "صح. الـ annotated tree هي output الـ semantic analysis."
    ]
   ],
   "extra": [
    [
     "ده بيعد الـ identifiers والأرقام وoperator واحد بس. الأقواس والـ = والـ + كلهم tokens برضه.",
     "صح. a، [، index، ]، =، 4، +، 2: identifier، left bracket، identifier، right bracket، assignment، number، plus sign، number.",
     "كده نسيت القوسين، والمحاضرة بتعدّهم tokens منفصلة.",
     "حتى لو عدّيت كل حرف لوحده هيطلعوا 12 (a، [، i، n، d، e، x، ]، =، 4، +، 2) مش 11. الـ scanner بيجمّع i-n-d-e-x في identifier token <b>واحد</b>، فالـ tokens عددهم 8."
    ],
    [
     "الـ Constant folding حصل قبل كده وملوش علاقة بالـ scaling بتاع الـ index.",
     "حجم الـ array مش مستخدم هنا. الـ 2 ده حجم element واحد.",
     "صح. ‡ السلايد مش بيشرح الـ 2، بس ده المعنى: الـ code generator بيستخدم طريقة تمثيل الداتا في الـ target machine، فالـ a[index] مكانها &a + index × 2 (الـ integer معتبر 2 bytes).",
     "الـ target code optimizer بعد كده <b>بيستبدل</b> الضرب في 2 بـ SHL؛ هو مش اللي عامله."
    ],
    [
     "نص الشغل بس: لازم الجمع يتعمله fold الأول، وبعدين الـ temporary يختفي.",
     "ده شال الـ temporary بس عمره ما عمل fold للـ constant.",
     "الـ assignment لـ a[index] هو أصلًا هدف الـ statement ومينفعش يتشال.",
     "صح. t = 4+2 تبقى t = 6، وبعدين نعوّض بـ t، فتبقى a[index] = 6."
    ],
    [
     "صح. هو بيحوّل الـ intermediate code لكود للـ target machine، فالـ instructions وأحجام الداتا بتاعة الجهاز هي اللي بتتحكم فيه.",
     "ده بيحسب attributes زي الـ types؛ مش معتمد على instructions الـ target machine.",
     "الـ scanner بيجمّع الحروف في tokens بس.",
     "المحاضرة بتقول إن التحسين ده معتمد على الـ source code بس."
    ],
    [
     "موجودة: مثلًا MOV &a[R1],6 في السلايد (‡ المقصود &a[R0]) بتستخدم indexed address mode.",
     "صح. الـ Type checking شغل الـ semantic analyzer (static semantics)، مش الـ target code optimizer.",
     "موجودة في القايمة: الـ instruction replacing مهمة من مهامه، زي إن MUL R0, 2 تبقى SHL R0 الأرخص.",
     "موجودة: MOV R1, &a و ADD R1, R0 بيختفوا في الكود المتحسّن."
    ],
    [
     "الـ identifiers مع الـ types بتاعتها والوصول الـ constant-time (hash table) ده وصف الـ symbol table، مش الـ literal table.",
     "تخزين الـ tokens كـ values من enumerated type دي الطريقة اللي الـ scanner بيمثّل بيها الـ tokens، مش الـ literal table.",
     "صح. الـ literal table بيخزّن الـ constants والـ strings، وده بيقلّل حجم البرنامج؛ والـ insertion والـ lookup السريع أساسيين فيه (L1, Principal data structures).",
     "إنه يشيل نواتج الخطوات الوسطانية ويسمح بالـ back-patching ده وصف الـ temporary files."
    ],
    [
     "الـ symbol table بيتخزن في hash tables في الـ memory؛ الـ temporary files مش متذكرة معاه.",
     "الـ literal table ليه data structure لوحده للـ constants والـ strings؛ السلايد مش بيقول إنه بيتحفظ في temporary files.",
     "السلايد عمره ما ربط الـ temporary files بسرعة الـ scanner؛ الأسباب اللي بيقولها هي حدود الـ memory والـ back-patching.",
     "صح. الـ temporary files بتشيل نواتج الخطوات الوسطانية، فبتحل مشكلة الـ memory constraints وبتسمح بالـ back-patching للـ addresses أثناء الـ code generation (L1, Principal data structures)."
    ],
    [
     "صح. مثلًا اسم الـ identifier أو قيمة الرقم ممكن يتحفظوا كمان، في global variable أو array من الـ tokens.",
     "الـ tree node المعمول بالـ pointers ده الطريقة اللي الـ parser بيبني بيها الـ syntax tree، مش الطريقة اللي الـ scanner بيخزّن بيها الـ token.",
     "ده intermediate code، وبيطلع بعدها بكتير.",
     "الـ constants والـ strings بس هي اللي بتروح الـ literal table، والـ tokens مش بتتمثّل كده."
    ],
    [
     "صح. ده بالظبط جدول المقارنة في المحاضرة: الـ interpreters بتعمل analysis أقل بس أبطأ في التشغيل؛ الـ compilers بتعمل analysis أكتر بس أسرع.",
     "الجملة مطابقة للجدول. الفخ هنا إنك تلخبط بين وقت الـ analysis ووقت التنفيذ."
    ],
    [
     "الـ a هي الـ array نفسها؛ الـ subscript-expression a[index] بس هي اللي integer.",
     "صح. الـ a بتتعمل annotate إنها <b>array of integer</b>؛ والـ index و 4 و 2 والـ subscript-expression والـ additive-expression كلهم integer."
    ]
   ]
  },
  "2": {
   "notes": [
    {
     "h": "يعني إيه مرحلة الـ lexical analysis؟",
     "pts": [
      "هي <b>أول phase</b> في الـ compiler. بتقرا حروف الـ input وتطلّع <b>sequence من الـ tokens</b> الـ parser بيستخدمها في الـ syntax analysis.",
      "كمان <b>بتشيل الـ comments والـ white space</b> (blank، tab، newline).",
      "وكمان بتربط رسايل الأخطاء اللي طالعة من الـ compiler بالـ source program. ‡ مثلاً بإنها تحط أرقام السطور (line numbers) في رسايل الأخطاء.",
      "اسمها كمان <b>scanning</b>: سيل الحروف بيتقري من الشمال لليمين ويتجمّع في tokens. والـ keywords بيتعرفوا هنا.",
      "الـ <b>Token مقابل الـ lexeme</b> (من نوتس المحاضرة): الـ token هو category منطقية (id، relop، number)؛ الـ lexeme هو الـ string الحقيقي نفسه (زي <code>distance</code>). <code>if distance &gt;= rate * (time1 – time0) then distance := maxdist;</code> → <code>if id relop id * ( id – id ) then id := id ;</code>"
     ],
     "figH": {
      "cc-lexer": "الـ scanner وهو شغال: الـ tokens والـ lexemes والـ keywords، وشيل الـ comments والـ white space، والـ errors بأرقام السطور"
     }
    },
    {
     "h": "الـ Alphabets والـ strings",
     "pts": [
      "الـ <b>alphabet (Σ)</b> هو set محدودة، مش فاضية، ومرتّبة من الـ symbols أو الحروف أو الـ characters.",
      "الـ <b>string</b> (وبيتقال لها word أو token) هي sequence محدودة من symbols من alphabet. <code>011</code> string طولها 3 على Σ = {0,1}؛ <code>0101</code> طولها 4؛ <code>for</code> string طولها 3 على alphabet الـ C++.",
      "مجموعة كل الـ integer constants أو مجموعة كل أسماء الـ variables دي sets من الـ strings، والحروف اللي فيها متاخدة من alphabet معيّنة.",
      "الـ set دي من الـ strings اسمها language. في الـ integers الـ alphabet بتتكوّن من الـ digits من 0 لـ 9، وفي أسماء الـ variables الـ alphabet فيها letters و digits مع بعض (وممكن كام character تاني، زي الـ underscore)."
     ],
     "figH": {
      "cc-strings": "جرّب: الكلمة بتاعتك string على الـ alphabet ولا لأ، وطولها كام؟"
     }
    },
    {
     "h": "العمليات على الـ languages",
     "pts": [
      "الـ <b>Union</b>: الـ union بين two sets هي الـ set اللي فيها كل الـ elements اللي في كل set من الاتنين ومفيهاش أي حاجة تانية. الـ union بين الـ languages L1 = {abc, ab, ba} وL2 = {ba, bb} هي {abc, ab, ba, bb}. لاحظ إن L1 ∪ L2 = L2 ∪ L1 (الـ union commutative: الترتيب مش فارق).",
      "الـ <b>Concatenation</b>: الـ concatenation بين two languages هي الـ language اللي بتتكوّن لما نلزق كل string في language مع كل string في الـ language التانية. الـ concatenation بين {ab, c} و{d, ef} بتدّي {abd, abef, cd, cef}. لو L1 = {a,b} وL2 = {0,11}: يبقى L1L2 = {a0, a11, b0, b11} لكن L2L1 = {0a, 0b, 11a, 11b}. لاحظ إن L1L2 ≠ L2L1: الترتيب فارق في الـ concatenation.",
      "الـ <b>Kleene closure</b>: الـ Σ* هي set كل الـ strings اللي ممكن نعملها بـ concatenation لصفر أو أكتر من الـ strings اللي في Σ. {a}* = {ε, a, aa, aaa, aaaa, …}.",
      "<b>يعني إيه ε transition؟</b> هي رمز للـ empty string، زي Φ، بحيث إن {ε} تبقى set فيها element واحد هو الـ empty string. ‡ الـ ε هي الـ string اللي طولها 0؛ والـ Φ عادةً اسم الـ empty set (مفيهاش elements)، فالـ {ε} والـ Φ مش نفس الـ set.",
      "الـ <b>Positive closure</b>: الـ Σ+ هي set كل الـ strings اللي ممكن نعملها بـ concatenation لواحد أو أكتر من الـ strings اللي في Σ. {a}+ = {a, aa, aaa, aaaa, …}.",
      "الـ <b>Or operator</b>: a|b|c = {a, b, c}."
     ],
     "figH": {
      "cc-lang-ops": "جرّب: الـ union والـ concatenation والـ Kleene والـ positive closure والـ or operator"
     }
    },
    {
     "h": "الـ Regular expressions",
     "pts": [
      "على X = {a,b,c}، أمثلة على regular expressions: <code>ab*</code>، <code>a|b|c*</code>.",
      "الأولوية (precedence): الـ <b>*</b> الأقوى، بعدها الـ <b>concatenation</b>، بعدها الـ <b>|</b>. يعني <code>a|ab*</code> معناها <code>a|(a(b*))</code>.",
      "أمثلة: 0|1 = {0,1}؛ 0* = {ε,0,00,…}؛ (0|1)(0|1) = {00,01,10,11}؛ 0|0*1 = {0,1,01,001,…}؛ b واحدة بالظبط على {a,b,c}: (a|c)*b(a|c)*."
     ],
     "figH": {
      "cc-regex-test": "جرّب: اختبر strings على الـ regular expressions بتاعة السلايدز، ومعاها الـ precedence"
     }
    },
    {
     "h": "الخواص الجبرية (algebraic properties) للـ regular expressions",
     "pts": [
      "فخاخ الامتحان: <b>aε = εa = a</b> (مش ε). <b>Yε = εY</b> (فجملة \"Yε ≠ εY\" غلط). <b>(X|Y)* ≠ X*|Y*</b>: الـ (X|Y)* فيها XY، لكن X*|Y* مفيهاش."
     ],
     "figH": {
      "cc-re-algebra": "جرّب: اتأكد من كل law بمقارنة الـ strings اللي كل جنب بيطلّعها"
     }
    },
    {
     "h": "الـ Finite automata",
     "pts": [
      "الـ finite automata <b>بتتعرّف على الـ tokens</b> اللي الـ regular expression بيوصفها، وممكن تتحوّل لـ algorithm يعمل matching للـ input strings.",
      "الـ finite automaton هو machine فيها <b>عدد محدود من الـ states</b> و<b>عدد محدود من الـ transitions</b> بينهم. الـ state دايرة، والـ transition سهم عليه input token، والـ start state داخل عليها سهم \"start\"، والـ final (accept) state دايرة مزدوجة.",
      "الشكل (سلايد 9، State وTransition): الـ <b>State</b> بتترسم دايرة واسمها جوّاها (q1). الـ <b>Transition</b> بتترسم سهم عليه \"input token\"؛ السلايد فيها سهمين زي كده، واحد ناحية اليمين وواحد ناحية الشمال، وكل واحد مكتوب عليه \"input token\".",
      "الشكل (سلايد 10، A finite automata for the expression 01): start → q0 –0→ q1 –1→ q2. الـ q0 مكتوب تحتها <b>Start State</b>؛ والـ q2 دايرة دبل مكتوب تحتها <b>End State</b>. (الـ transition table تحت.)",
      "الشكل (سلايد 10، a* وa+ و(a|b)*): <b>a*</b>: state واحدة متظللة عليها سهم start، مرسومة دايرة دبل (start وfinal)، وعليها loop بـ a. <b>a+</b>: start state متظللة عليها loop بـ a، وطالع منها edge بـ a لـ state تانية مرسومة دايرة دبل (final). <b>(a|b)*</b>: state واحدة q2 عليها سهم start، مرسومة دايرة دبل (start وfinal)، وعليها loop بـ a,b.",
      "اعمل finite automaton يتعرّف على الـ regular expression 1*01(0|1)* (slide 11): start → q0 (loop 1) –0→ q1 –1→ q2. الـ q2 هي الـ Final state (double circle) وعليها loop مكتوب عليه 0,1. (الـ transition table بتاعها في سكشن \"Finite automaton for 1*01(0|1)*\".)"
     ],
     "figH": {
      "cc-state-transition": "الـ states والـ transitions: إزاي الـ finite automaton بيترسم (slide 9)",
      "cc-fa-01": "جرّب: شغّل strings على الـ automaton بتاع <bdi>01</bdi>"
     }
    },
    {
     "h": "الـ finite automata بتاعة a* وa+ و(a|b)*",
     "pts": [
      "الـ transition table بتاعة الـ three automata اللي في سلايد 10 (→ الـ start state، * الـ final state، – مفيش transition). ‡ السلايد مسمّتش الـ states بتاعة a* وa+؛ الأسامي S وS0 وS1 إحنا اللي حاطينها هنا. في a+ الـ start state طالع منها two edges بـ a: الـ loop والـ edge اللي رايحة للـ final state."
     ],
     "figH": {
      "cc-fa-closures": "جرّب: شغّل strings على الـ automata بتاعة <span class=\"ltr\">a*, a+, (a|b)*</span>"
     }
    },
    {
     "h": "الـ finite automaton بتاعة 1*01(0|1)*",
     "pts": [
      "الـ transition table بتاعة الـ automaton اللي في سلايد 11 (→ الـ start state، * الـ final state، – مفيش transition): الـ q0 عليها loop بـ 1 وبتروح لـ q1 بـ 0؛ الـ q1 بتروح لـ q2 بـ 1؛ الـ q2 final وعليها loop بـ 0 و1."
     ],
     "figH": {
      "cc-fa-1s01": "جرّب: شغّل strings على الـ automaton بتاع <bdi>1*01(0|1)*</bdi>"
     }
    },
    {
     "h": "الـ NFA مقابل الـ DFA",
     "pts": [
      "المثال (سلايد 12، DFA): سهم داخل على state على الشمال؛ طالع منها two edges لـ state على اليمين، الـ edge اللي فوق عليها s واللي تحت عليها t؛ وفيه خط طالع من الـ state اللي على اليمين.",
      "مثال (slide 12, NFA): arrow داخل على state على الشمال؛ edge مكتوب عليه ε طالع لفوق لـ oval جواه s، و edge تاني مكتوب عليه ε نازل لتحت لـ oval جواه t؛ ومن كل oval فيه edge مكتوب عليه ε داخل على state على اليمين، والـ state دي طالع منها edge مكتوب عليه ε."
     ],
     "figH": {
      "cc-nfa-dfa": "الـ NFA مقابل الـ DFA على مثالين السلايد، صف بصف"
     }
    }
   ],
   "cards": [
    "الـ Input: الـ source code (حروف). الـ Output: list من الـ tokens.",
    "(1) بيشيل الـ comments، (2) بيشيل الـ white spaces (الـ blank والـ tab والـ newline)، (3) بيربط رسايل الأخطاء اللي طالعة من الـ compiler بالـ source program.",
    "set محدودة، مش فاضية، ومرتّبة من الـ symbols.",
    "sequence محدودة من symbols من alphabet (وبيتقال لها word أو token).",
    "set من الـ strings على alphabet.",
    "أيوه: L1 ∪ L2 = L2 ∪ L1.",
    "لأ: {a,b}{0,11} = {a0,a11,b0,b11} لكن {0,11}{a,b} = {0a,0b,11a,11b}.",
    "{ε, a, aa, aaa, ...} (صفر أو أكتر).",
    "{a, aa, aaa, ...} (واحد أو أكتر).",
    "a (الـ ε محايدة في الـ concatenation).",
    "s*",
    "s+ (وكمان = s*s)",
    "الـ * الأعلى، بعدها الـ concatenation، بعدها الـ |.",
    "بتتعرّف على الـ tokens اللي الـ regular expressions بتوصفها.",
    "الـ DFA مينفعش يستخدمها؛ الـ NFA ينفع."
   ],
   "qa": [
    "هي أول phase في الـ compiler. بتقرا حروف الـ input وتطلّع sequence من الـ tokens للـ parser، وبتشيل الـ comments والـ white space (blank، tab، newline)، وبتربط رسايل الأخطاء بالـ source program.",
    "(a|b)*a(a|b)*a(a|b)* ; b*ab*ab* ; (a|b)*a(a|b)*b(a|b)* | (a|b)*b(a|b)*a(a|b)* ; (a|b)* ; b* | ab* ; (a|b)*(aa|bb)(a|b)* ; a*ba*ba* | a*ba*ba*ba* (من Sheet One).",
    "الـ q0 عليها loop بـ b؛ q0 --a--> q1؛ الـ q1 عليها loop بـ a؛ q1 --c--> q2 و q1 --d--> q2؛ والـ q2 هي الـ final state.",
    "الـ q0 عليها loop بـ a,b؛ q0 --c--> q1 (final، وعليها loop بـ c)؛ q0 --d--> q2 (final، وعليها loop بـ d).",
    "الـ DFA: مش قادر يستخدم empty string (ε) transition؛ عدد الـ next state واحد؛ الوقت الكلي لتشغيل أي input string أقل من الـ NFA؛ والـ next possible state محددة بوضوح. الـ NFA: يقدر يستخدم empty string transition؛ عدد الـ next state/states يا صفر يا واحد (ده كلام الـ slide؛ ‡ في العموم الـ NFA ممكن يكون ليه صفر أو واحد أو كذا next state)؛ الوقت الكلي لتشغيل أي input string أكبر من الـ DFA؛ وكل pair من الـ input symbols والـ states ممكن يبقى ليها next states كتير محتملة.",
    "الـ states هي q0 وq1 وq2. start → q0؛ الـ q0 عليها loop بـ 1؛ q0 --0--> q1؛ q1 --1--> q2؛ الـ q2 هي الـ final state وعليها loop بـ 0,1. الـ table: q0: 0→q1، 1→q0؛ q1: 1→q2؛ q2 (final): 0→q2، 1→q2."
   ],
   "quiz": [
    [
     "الـ machine code ده الـ output النهائي للـ compiler، مش الـ input بتاع الـ scanner.",
     "دي معكوسة: الـ scanner بيقرا characters الـ source وبيطلّع tokens، والـ parser هو اللي بيستخدمها بعد كده.",
     "صح. الـ lexical analyzer بيقرا الـ input characters بتاعة الـ source program وبيطلّع sequence of tokens للـ parser (L2, What is lexical analysis).",
     "اختيار b معكوس (الـ tokens هي الـ output مش الـ input)، فـ «a and b» مينفعش تبقى صح؛ c بس هي الصح."
    ],
    [
     "الـ finite automata هي اللي بتتعرّف على الـ tokens، بس الـ tokens نفسها بتتوصف بالـ regular expressions، فالإجابة الكاملة «a and b».",
     "الـ regular expressions بتوصف الـ tokens، بس الـ finite automata هي اللي بتتعرّف عليها (بتعمل match)، فالإجابة الكاملة «a and b».",
     "الـ syntax-directed translation تبع الـ semantic analysis، اللي شغالة على الـ parse tree، مش على مطابقة الـ tokens.",
     "صح. الـ regular expressions بتوصف الـ tokens والـ finite automata بتتعرّف عليها."
    ],
    [
     "الـ code generation هي phase 5؛ ساعتها الـ keywords كان الـ scanner حوّلها لـ tokens من بدري.",
     "الـ data flow analysis دي optimization technique، مش المكان اللي الـ keywords بتتعرف فيه؛ ده بيحصل في الـ scanning.",
     "صح. الـ keywords زي if وthen وfor دي tokens، والـ scanner بيتعرّف عليها وهو بيجمّع الـ characters في tokens (L2, What is lexical analysis).",
     "الـ parser بيستلم الـ keywords وهي متعرّفة خلاص كـ tokens."
    ],
    [
     "صح. الـ lexical analysis بتجمّع sequences of characters في وحدات ليها معنى اسمها tokens، زي a[index]=4+2 → id [ id ] = number + number (L1/L2, Lexical analysis).",
     "الـ scanner مش بيقسّم البرنامج لسطور؛ هو بيشيل الـ newlines على إنها white space وبيجمّع الـ characters في tokens.",
     "كلمة «Groups» مبهمة أوي؛ المصطلح اللي المحاضرة بتستخدمه للوحدات اللي ليها معنى واللي الـ scanner بيطلّعها هو tokens.",
     "الـ packets دي مصطلح networking (وحدات data بتتبعت على الشبكة)، مش حاجة الـ compiler بيطلّعها."
    ],
    [
     "ده فخ الامتحان: الـ ε هي العنصر المحايد، مش \"صفر\".",
     "صح. الـ ε هي العنصر المحايد في الـ concatenation: sε = s = εs، يعني aε = εa = a (L2, Algebraic properties).",
     "الـ aa محتاجة a تانية؛ الـ concatenation مع ε مش بتزوّد حاجة، فالناتج a بس.",
     "الـ Φ هي الـ empty set، مش الـ empty string ε؛ الـ concatenation بين a وε بتسيب a زي ما هي، مش بتدّي Φ."
    ],
    [
     "الـ (X|Y)* فيها XY، واللي X*|Y* مش بتقدر تطلّعه.",
     "صح. الـ X*|Y* بتطلّع بس strings من X لوحدها أو من Y لوحدها.",
     "لو X = ε يبقى (X|Y)* = Y* وX*|Y* = ε|Y* = Y*، فهيبقوا متساويين؛ بس في العموم مختلفين، فالإجابة No.",
     "الـ equivalence بين الـ regular expressions معناها إن الـ languages اللي بيوصفوها واحدة؛ ملهاش علاقة بالـ DFAs."
    ],
    [
     "الـ {a0, a11, b0, b11} دي L1L2 (strings الـ L1 الأول). الـ L2L1 بتحط string الـ L2 الأول: {0a, 0b, 11a, 11b}.",
     "صح. كل string من L2 وبعدها كل string من L1.",
     "الـ {a, b, 0, 11} دي الـ union L1 ∪ L2، مش الـ concatenation.",
     "الـ concatenation بتوصّل <b>كل</b> string في L2 بـ<b>كل</b> string في L1، يعني 2 × 2 = 4 strings؛ هنا ناقص 0b و11a."
    ],
    [
     "صح. الأقواس ملهاش لازمة (الـ * أقوى من الـ concatenation) والـ | commutative.",
     "الـ | commutative (s|t = t|s)، فلو بدّلت الاختيارين الـ language مش هتتغير.",
     "الـ * أقوى (precedence أعلى) من الـ concatenation، فـ (b)*(c) معناها b*c: أي عدد من الـ b's وبعدين c واحدة، مش (bc)*.",
     "الـ expressionين متساويين بالـ algebraic laws أيًّا كان الـ alphabet؛ إنك تحدده مش بيغيّر حاجة."
    ],
    [
     "أجزاء الـ (a|b)* ممكن يبقى فيها a's زيادة، فدي بتدّي <b>على الأقل</b> اتنين a، مثلًا aaa بتتقبل.",
     "صح. مسموح بـ b's بس حوالين الـ a's الاتنين.",
     "الـ aab* بتجبر الـ a's الاتنين ييجوا في الأول وجنب بعض، فـ strings زي abab أو baba بتضيع.",
     "الـ (ab)* بتدّي أي عدد من الـ a's (0, 1, 2, 3…) وبس بالشكل abab…، مش اتنين بالظبط."
    ],
    [
     "state واحدة start/final وعليها a-loop بتقبل ε كمان، فدي الـ FA بتاعة a* في المحاضرة، مش a+.",
     "صح. لازم نقرا a واحدة على الأقل قبل ما نوصل للـ final state.",
     "الـ q0 –a→ q1 من غير loop بتقبل string واحدة بس هي \"a\"، مش aa، aaa، …",
     "state واحدة start/final وعليها a,b loop بتقبل أي string على {a,b}، يعني (a|b)*."
    ],
    [
     "الـ {ab} دي الـ concatenation ab؛ الـ | معناها «أو»، فبتدّي a أو b كـ strings منفصلة.",
     "صح. الـ or operator بيدّي أي واحد من الاختيارين: a|b = {a, b}، زي ما a|b|c = {a, b, c} (L2, Operations on languages).",
     "الـ ε كانت هتبقى موجودة بس مع a? أو (a|b|ε)؛ الـ a|b مفيهاش اختيار فاضي.",
     "الـ ab والـ ba محتاجين concatenation، زي (a|b)(a|b)؛ الـ a|b لوحدها بتدّي symbols مفردة بس."
    ],
    [
     "الجملة دي غلط: السلايد بيوضّح إن L1L2 = {a0, a11, b0, b11} لكن L2L1 = {0a, 0b, 11a, 11b}، يعني L1L2 ≠ L2L1.",
     "صح. الترتيب فارق في الـ concatenation (ومش فارق في الـ union).",
     "المثال المضاد في المحاضرة بيستخدم finite languages ({a,b} و{0,11}) والترتيب برضه فرق.",
     "الـ concatenation مع ε بتدّي نفس النتيجة في الاتجاهين (sε = εs)، بس دي حالة خاصة؛ في العموم الترتيب بيفرق."
    ],
    [
     "الـ context-free grammars بتعمل model للـ syntax analysis (الـ parser)، مش للـ lexical analysis.",
     "الـ symbol table ده data structure مشتركة بين الـ phases، مش formalism بنوصف بيه الـ tokens.",
     "صح. الـ tokens بتتوصف بالـ regular expressions وبيتعرفوا بالـ finite automata.",
     "الـ attribute grammars بتعمل model للـ semantic analysis (attributes متعلّقة على الـ nonterminals بتاعة الـ CFG)."
    ],
    [
     "صح. الـ scanner (الـ lexical analyzer) بيجمّع الـ characters في tokens.",
     "الـ code generator بيحوّل الـ intermediate code لـ target machine code؛ عمره ما بيشوف الـ characters الخام.",
     "الـ code optimizer بيحسّن كود اتعمل خلاص (زي الـ constant folding)؛ مش بيكوّن tokens.",
     "الـ parser بيستهلك الـ tokens؛ مش هو اللي بيعملها."
    ],
    [
     "الـ Modeling مش phase في الـ compiler؛ التجميع من الشمال لليمين في tokens ده الـ lexical analysis.",
     "كلمة «Diversion» مش مصطلح في الـ compilers؛ قراية الـ characters من الشمال لليمين وتحويلها لـ tokens ده الـ lexical analysis.",
     "صح. الـ lexical analysis، واسمها كمان scanning، بتقرا characters الـ source من الشمال لليمين وتجمّعها في tokens (L2, What is lexical analysis).",
     "الـ Modeling والـ diversion مش compiler phases، فالـ lexical analysis بس هي اللي تنفع، مش كلهم."
    ],
    [
     "صح. الـ lexical analysis (الـ scanner) بتقرا characters الـ source وبتطلّع الـ sequence of tokens اللي الـ parser بيستخدمها (L2, What is lexical analysis).",
     "الـ syntax analysis بيستهلك الـ tokens؛ الـ lexical analysis هو اللي بيطلّعها."
    ],
    [
     "كل path محتاج على الأقل a واحدة (الفوقاني) وعلى الأقل b واحدة (التحتاني): a*ab = a+b و ab*b = ab+.",
     "صح. الـ path الفوقاني ε·a*·a·b = a+b؛ والتحتاني a·b*·b = ab+.",
     "بتقبل strings زي bab، والـ FA بترفضها.",
     "الـ a+b+ بتقبل aabb، بس الـ path اللي فوق a+b بيسمح بـ b واحدة بس، واللي تحت ab+ بيسمح بـ a واحدة بس."
    ]
   ],
   "extra": [
    [
     "كده ناقص identifiers، زي maxdist أو واحد من متغيرات الـ time.",
     "الـ 5 دي عدد الـ lexemes <b>المختلفة</b>. الـ distance ظاهرة مرتين وكل مرة ليها id token لوحدها.",
     "صح. if id relop id * ( id – id ) then id := id ; بتدّي distance، rate، time1، time0، distance، maxdist.",
     "الـ \"if\" والـ \"then\" دول keyword tokens، مش ids؛ لو عدّيت واحدة منهم هيطلع معاك 7 بدل الـ 6 identifiers الحقيقيين."
    ],
    [
     "صح. الـ * الأقوى، بعدها الـ concatenation، بعدها الـ |.",
     "كده إديت الـ | أولوية أعلى من الـ concatenation، وده بالعكس.",
     "الـ * بتتطبّق على الـ symbol اللي قبلها على طول بس (b)، فـ ab* معناها a(b*)، مش (ab)*.",
     "مفيش star حوالين الـ expression كله."
    ],
    [
     "الـ 0*1 لازم تخلص بـ 1، والاختيار الشمال هو 0 واحدة بس.",
     "كل string من 0*1 بتخلص بـ 1، والـ string التانية الوحيدة هي 0.",
     "الـ 010 مش هي الـ string الوحيدة 0، وكمان بتخلص بـ 0، فمستحيل تيجي من 0*1.",
     "صح. 0*1 بـ اتنين 0. الـ language هي {0, 1, 01, 001, …}."
    ],
    [
     "بعد 1,1,0 بنبقى في q1، والـ q1 مفيهاش transition على 0، فبتترفض.",
     "صح. 1,1 loop على q0؛ 0 → q1؛ 1 → q2 (final)؛ 0 بتلف على q2. فبتخلص في الـ final state.",
     "بتخلص في q1، ودي مش final. لازم 01 تظهر.",
     "قراية 0 بتنقلنا من q0 → q1، والـ input بيخلص هناك؛ والـ q1 مش final، فـ \"0\" بتترفض (لازم 01 تظهر)."
    ],
    [
     "الـ a دي concatenation واحدة، فهي موجودة في {a}* (zero or more) وفي {a}+ (one or more).",
     "الـ aa دي اتنين concatenations، فهي موجودة في {a}* و{a}+ الاتنين.",
     "صح. الـ Kleene closure صفر أو أكتر من الـ concatenations، فبتشمل الـ empty string؛ الـ positive closure واحد أو أكتر.",
     "الـ Φ دي set، مش string. ومفيش closure فيهم فيها Φ كـ element."
    ],
    [
     "القاعدة دي صح: الـ | commutative، فـ s|t وt|s بيوصفوا نفس الـ language.",
     "القاعدة دي صح: الـ * idempotent، يعني لو عملت star على expression عليها star أصلًا مش هتزوّد حاجة جديدة.",
     "القاعدة دي صح بالتعريف: ss* = s+ = s*s (نسخة واحدة أو أكتر من s).",
     "ده الاختيار الصح: الخاصية دي غلط. الـ concatenation بيتوزّع على الـ |، فـ r(s|t) = rs|rt."
    ],
    [
     "صح. ده شغل الـ parser (الـ syntax analysis).",
     "موجودة في السلايد: الـ scanner بيشيل الـ comments والـ white space (الـ blank والـ tab والـ newline).",
     "موجودة في السلايد: الـ scanner بيربط الـ error messages بتاعة الـ compiler بالـ source program، مثلًا بأرقام السطور.",
     "موجودة: الـ keywords بتتعرف أثناء الـ scanning."
    ],
    [
     "الـ set مفيهاش تكرار، فالـ ba اللي موجودة في الـ languages الاتنين بتظهر مرة واحدة بس في الـ union.",
     "صح. كل string من أي set فيهم، والـ ba بتتعد مرة واحدة.",
     "الـ {ba} دي الـ intersection (الـ strings اللي في الـ setين <b>الاتنين</b>)؛ الـ union بيحتفظ بكل string موجودة في أي واحدة منهم.",
     "ده الـ concatenation بتاع الـ two languages."
    ],
    [
     "الـ ε دي string طولها 0. والـ {ε} set فيها element واحد، إنما الـ Φ مفيهاش ولا واحد.",
     "صح. ‡ الـ ε هي string طولها 0، فالـ {ε} set فيها element واحد (الـ empty string)، إنما الـ empty set Φ مفيهاش ولا element. خلي بالك: سلايد 6 كاتباها \"a notation of an empty string, such as Φ\"؛ لو الدكتورة سألت السؤال ده ممكن تكون مستنية الصياغة بتاعتها."
    ],
    [
     "معكوسة. الجدول بيقول إن الـ DFA بياخد وقت أقل والـ NFA أكتر.",
     "صح. الـ DFA فيه next state واحدة بالظبط لكل input، فبيشغّل أي input string في وقت أقل."
    ]
   ]
  },
  "3": {
   "notes": [
    {
     "h": "إيه اللي يخلّي الـ automaton يبقى NFA؟",
     "pts": [
      "الـ NFA (Non-Deterministic Finite Automaton) بيبقى فيه <b>واحدة أو أكتر</b> من الصفات دي:",
      "1) <b>فيه ε</b> (transition بالـ empty string).",
      "الرسمة (slide 2، فيها ε): الـ a هي الـ start state وكمان final state (دايرة مزدوجة)؛ a –ε→ b؛ b –0→ a؛ a –1→ c؛ الـ c عليها loop بـ 0؛ c –0,1→ b.",
      "2) <b>فيه loop على input symbol وبعدها transition بنفس الـ input symbol</b>. الرسمة (slide 2): الـ q0 هي الـ start state وعليها loop على 0,1؛ q0 –0→ q1؛ q1 –1→ q2؛ الـ q2 هي الـ final state (دايرة مزدوجة). على 0، الـ q0 ممكن تفضل مكانها أو تروح q1.",
      "3) فيه أكتر من path لنفس الـ input string والـ automaton يقدر يتعرّف عليها (جرّب الـ expression <b>001</b>). الرسمة (slide 3): الـ A عليها loop بـ 0,1؛ A –0→ C؛ A –1→ B؛ B –1→ C؛ الـ C عليها loop بـ 0,1؛ الـ B والـ C هما الـ final states (دواير مزدوجة). ‡ للـ 001: A –0→ A –0→ A –1→ B، و A –0→ A –0→ C –1→ C، و A –0→ C –0→ C –1→ C، كلهم بيخلصوا في final state.",
      "يعني <b>الـ loop لوحده مش بيخلّي الـ automaton non-deterministic</b>. الـ DFA ممكن يبقى فيه loops. وكمان إن يكون فيه أكتر من accept state مش بيخليه NFA."
     ],
     "figH": {
      "cc-nfa-signs": "جرّب: العلامات التلاتة بتاعة الـ NFA، كل واحدة على الـ automaton بتاعها في السلايد"
     }
    },
    {
     "h": "الـ NFA مقابل الـ DFA",
     "pts": [
      "مثال (DFA)، الرسمة في slide 4: start state (داخل عليها سهم) طالع منها two edges لـ state تانية، واحد عليه <b>s</b> (فوق) وواحد عليه <b>t</b> (تحت)؛ والـ state التانية طالع منها خط؛ مفيش ε edges.",
      "مثال (NFA)، الرسمة في slide 4: الـ start state –ε→ الـ box بتاع <b>s</b> –ε→ آخر state، والـ start state –ε→ الـ box بتاع <b>t</b> –ε→ آخر state؛ وآخر state طالع منها ε edge.",
      "‡ السلايد بتقول إن عدد الـ next states في الـ NFA «either zero or one»؛ بس في الحقيقة الـ NFA ممكن يبقى ليه صفر أو واحدة أو أكتر من الـ next states لكل (state, symbol)، زي ما آخر row في الجدول بيقول («many possible next states»)."
     ],
     "figH": {
      "cc-nfa-vs-dfa": "الـ DFA والـ NFA بتوع slide 4 جنب بعض، ومعاهم المقارنة في 4 صفوف"
     }
    },
    {
     "h": "الـ Transition tables",
     "pts": [
      "الـ <b>transition table</b> هو طريقة نكتب بيها الـ automaton في جدول: الصفوف = الـ states، الأعمدة = الـ input symbols، الخانات = الـ next state(s)، و \"-\" = مفيش transition.",
      "الرسمة (slide 5): الـ S هي الـ start state؛ S –a→ P؛ S –b→ Q؛ P –b→ R؛ R –b→ F؛ الـ Q عليها loop بـ a؛ Q –a→ T؛ الـ T عليها loop بـ b؛ T –a→ F؛ الـ F هي الـ final state (دايرة مزدوجة)."
     ],
     "figH": {
      "cc-trans-table": "الـ automaton بتاع slide 5 بيتحوّل لـ transition table، صف ورا صف"
     }
    },
    {
     "h": "تحويل الـ NFA لـ DFA: أول transition table (بالـ empty transition)",
     "pts": [
      "الـ NFA بتاع السلايد (slide 6): الـ A هي الـ start state وعليها loop بـ 0,1؛ A –0→ B؛ الـ B هي الـ final state (دايرة مزدوجة).",
      "اعمل أول transition table (بالـ empty transition): الأعمدة 0 و 1 و ε؛ وخانة الـ ε لكل state فيها الـ state نفسها."
     ],
     "figH": {
      "cc-first-table": "ملء أول transition table (بالـ ε) للـ NFA بتاع slide 6، خانة خانة"
     }
    },
    {
     "h": "تحويل NFA → DFA (subset construction) بطريقة المحاضرة",
     "pts": [
      "<b>Step 1</b>: اعمل أول transition table <b>وفيه عمود ε</b> (كل state بتوصل لنفسها بالـ ε).",
      "<b>Step 2</b>: اعمل تاني table <b>من غير ε</b>: ابدأ من الـ start state (الـ ε-closure بتاعها)، وأي SET جديدة من الـ states تظهر في خانة تبقى row جديد. كرّر لحد ما مفيش sets جديدة تظهر.",
      "<b>Step 3</b>: ارسم الـ DFA. أي set فيها final state من الأصل تبقى final. الخانة الفاضية (-) معناها dead state أو ببساطة مفيش transition.",
      "مثال السلايد: الـ NFA هو A (start، عليها loop بـ 0,1) –0→ B (final). اعمل تاني transition table (من غير empty transition)، وبعدين الـ DFA:",
      "الرسمة (slide 6، الـ DFA): الـ A هي الـ start state وعليها loop بـ 1؛ A –0→ {A,B}؛ الـ {A,B} عليها loop بـ 0؛ {A,B} –1→ A؛ الـ {A,B} هي الـ final state (دايرة مزدوجة)."
     ],
     "figH": {
      "cc-subset": "جرّب: خطوات المحاضرة التلاتة بتحوّل الـ NFA بتاع slide 6 لـ DFA"
     }
    },
    {
     "h": "NFA امتحان محلول 1 (جه في امتحانات 2021–2025)",
     "pts": [
      "الـ NFA: الـ start هو 1؛ الـ final هو 3. 1 –0→ 3؛ 3 –0→ 1؛ 3 –1→ 3 (loop)؛ 3 –1→ 2؛ 2 –0→ 3. (بيترسم برضه بالـ states S, R, M.)",
      "<b>ليه non-deterministic؟</b> الـ state 3 عليها loop على 1 وكمان transition بنفس الـ symbol 1 للـ state 2، فالـ (3,1) ليها اتنين next states."
     ],
     "figH": {
      "cc-subset-exam1": "جرّب: تحويل NFA الامتحان 1 لـ DFA خطوة خطوة"
     }
    },
    {
     "h": "NFA امتحان محلول 2 (فيه ε)، امتحان 2024/25",
     "pts": [
      "الـ NFA: الـ start والـ final هو 1؛ 1 –b→ 2؛ 1 –ε→ 3؛ 2 –a→ 2؛ 2 –a,b→ 3؛ 3 –a→ 1.",
      "الـ ε-closures: E(1) = {1,3}، E(2) = {2}، E(3) = {3}. يبقى الـ DFA بيبدأ من {1,3}. الـ final states في الـ DFA = اللي فيها 1."
     ],
     "figH": {
      "cc-subset-exam2": "جرّب: تحويل NFA الامتحان 2 (فيه ε) لـ DFA، والـ ε-closures الأول"
     }
    }
   ],
   "cards": [
    "فيه ε transition؛ أو loop على symbol ومعاه transition تاني بنفس الـ symbol؛ أو أكتر من path لنفس الـ string.",
    "لأ. الـ DFA ممكن يبقى فيه loops.",
    "لأ. الـ ε لوحدها كفاية.",
    "لأ. ممكن يبقى فيه أكتر من واحدة.",
    "طريقة نكتب بيها الـ automaton في جدول: states × input symbols → next state(s).",
    "أيوه، بالـ subset construction.",
    "الـ ε-closure بتاعة الـ start state بتاعة الـ NFA.",
    "أي set فيها final state من الأصل.",
    "NFA.",
    "لأ. الـ ε مش بتستهلك input، و sε = s."
   ],
   "qa": [
    "إنه يكون فيه ε transition؛ أو فيه loop على input symbol وبعده transition بنفس الـ input symbol؛ أو فيه أكتر من path لنفس الـ input string.",
    "{1}: 0->{3}، 1->dead. {3}: 0->{1}، 1->{2,3}. {2,3}: 0->{1,3}، 1->{2,3}. {1,3}: 0->{1,3}، 1->{2,3}. الـ start هو {1}؛ والـ final هم {3} و {2,3} و {1,3}.",
    "A: 0->{A,B}، 1->A. {A,B}: 0->{A,B}، 1->A. الـ start هو A، والـ final هو {A,B}. بيقبل الـ strings اللي بتخلص بـ 0.",
    "{0}: a->{1}، b->{2}. {1}: b->{3}. {2}: a->{2,3}. {2,3}: a->{2,3}. {3}: مفيش. الـ final: {3} و {2,3}. الـ language هي ab | ba+."
   ],
   "quiz": [
    [
     "صح. أول علامة للـ NFA في السلايدز هي «فيه ε»: الـ DFA مش قادر يستخدم empty-string transition، فأي ε edge بتخلّي الـ automaton يبقى NFA (L3, What is NFA?).",
     "عدد الـ accept states ملوش علاقة بالـ determinism. الـ DFA ممكن يبقى فيه كذا final state؛ كل اللي محتاجه إن كل (state, symbol) ليها next state واحدة بالظبط.",
     "الـ DFA ممكن يبقى فيه loops. اللي بيعمل non-determinism هو loop وبعدها transition على نفس الـ symbol بالظبط.",
     "مش كلهم: الـ accept states والـ loops مسموحين في الـ DFA. الـ ε بس هي اللي دايمًا بتجبره يبقى NFA؛ والـ loop بتفرق بس لو فيه edge تاني طالع على نفس الـ symbol."
    ],
    [
     "الـ DFA مش قادر يستخدم empty-string transition (جدول المقارنة في L3)، فأي automaton فيه ε مينفعش يبقى DFA.",
     "صح. جدول الـ NFA vs DFA بيقول إن الـ NFA يقدر يستخدم empty-string (ε) transition، والـ DFA لأ (L3, NFA vs. DFA).",
     "«FFA» مش نوع automaton في الكورس؛ المحاضرة بتقارن بين الـ DFA والـ NFA بس، والـ ε تبع الـ NFA.",
     "فيه إجابة صح: الـ automaton اللي فيه ε transitions يبقى NFA، حسب أول خاصية للـ NFA في المحاضرة."
    ],
    [
     "صح. مثلاً الـ DFA بتاع 1*01(0|1)* فيه loops على q0 و q2.",
     "الـ loops عادي طالما كل (state, symbol) ليها next state واحدة بالظبط.",
     "القاعدة مش مقصورة على الـ self-loops: أي cycle مسموح في الـ DFA طالما كل (state, symbol) ليها next state واحدة بالظبط.",
     "الـ DFA عمره ما يبقى فيه ε («DFA is not capable of using an empty string transition»)؛ والـ loops مسموحة من غير أي ε."
    ],
    [
     "كده خدت الـ self-loop 3 –1→ 3 بس ونسيت الـ edge 3 –1→ 2. في الـ DFA، الخانة بتجمع كل الـ states اللي نوصلها على الـ symbol ده.",
     "كده خدت 3 –1→ 2 بس وشلت الـ self-loop 3 –1→ 3؛ الـ state 3 بتفضل في 3 كمان على input 1.",
     "صح. من 3 على input 1 فيه edgeين: الـ loop 3 –1→ 3 و3 –1→ 2، فخانة الـ DFA هي الـ set {2,3} (L3, subset construction).",
     "الـ ∅ معناها إن مفيش state ليها move على 1، بس الـ state 3 ليها اتنين: الـ loop لـ 3 والـ edge لـ 2."
    ],
    [
     "صح. خد الـ union بتاع الـ 0-moves لكل عضو: 2 –0→ 3 و3 –0→ 1، فيطلع {1,3}، وده row جديد في الـ DFA (L3, subset construction).",
     "كده خدت 2 –0→ 3 بس ونسيت إن الـ state 3 كمان بتتحرك على 0، لـ state 1.",
     "كده خدت 3 –0→ 1 بس ونسيت إن الـ state 2 كمان بتتحرك على 0، لـ state 3.",
     "الـ {2,3} دي نتيجة {2,3} على input 1 (3 –1→ 3 و3 –1→ 2)، مش على input 0."
    ],
    [
     "الـ {1} ناسية الـ ε edge: الـ DFA بيبدأ من الـ ε-closure بتاع الـ start state، والـ 1 بتوصل لـ 3 من غير ما تقرا input.",
     "صح. الـ start state بتاع الـ DFA هو الـ ε-closure بتاع start الـ NFA: الـ 1 نفسها وكمان 3 عن طريق 1 –ε→ 3، يعني E(1) = {1,3} (L3, NFA → DFA with ε).",
     "الـ ε-closure دايمًا فيها الـ state نفسها (كل state بتوصل لنفسها بالـ ε، step 1)، فالـ 1 لازم تبقى في الـ set كمان.",
     "الـ state 2 مش بنوصلها من 1 بالـ ε moves لوحدها؛ الـ edge الوحيد المجاني هو 1 –ε→ 3، فـ E(1) = {1,3}."
    ],
    [
     "كده خدت الـ a-moves بتاعة state 2 بس (لـ 2 و3) ونسيت 3 –a→ 1، اللي الـ ε-closure بتاعها {1,3} بتزوّد state 1.",
     "كده خدت move الـ state 3 بس (3 –a→ 1، والـ closure {1,3}) ونسيت إن 2 –a→ 2 و2 –a→ 3 بيزوّدوا state 2.",
     "صح. الـ 2 بتدّي {2,3}؛ والـ 3 بتدّي 1، والـ ε-closure بتاعها {1,3}. الـ union = {1,2,3}.",
     "الـ ∅ غلط لأن العضوين الاتنين بيتحركوا على a: الـ 2 بتروح لـ 2 و3، والـ 3 بتروح لـ 1."
    ],
    [
     "إن يبقى فيه final state ده عادي في الـ DFAs والـ NFAs، فمش بيقول حاجة عن الـ determinism.",
     "صح. دي تاني علامة للـ NFA في المحاضرة: loop على symbol وبعدها transition على نفس الـ symbol، فـ (A,0) ليها اتنين next states، A وB (L3, What is NFA?).",
     "الرسمة مفيهاش ε edge؛ الـ non-determinism هنا جاي من إن A ليها اتنين moves على 0.",
     "عدد الـ states مش هو اللي بيحدد الـ determinism؛ ممكن يبقى فيه DFA من two states. المهم إن A ليها اتنين next states على 0."
    ],
    [
     "الـ ε بتتحل في step 1 من طريقة المحاضرة (الـ table اللي فيه عمود ε) وبالـ ε-closure لكل set، فالـ ε-NFAs بتتحوّل هي كمان.",
     "صح. أي NFA، بـ ε أو من غيرها، ممكن يتحوّل لـ DFA مكافئ بالـ subset construction: كل set من NFA states نقدر نوصلها بتبقى DFA state واحدة (L3, NFA into DFA).",
     "الـ DFA ممكن يبقى فيه states أكتر، لأن كل DFA state هي set من NFA states (لحد 2^n sets لو الـ NFA فيه n states).",
     "الـ DFA مكافئ للـ NFA: بيقبل نفس الـ strings بالظبط، بس من غير non-determinism."
    ],
    [
     "الـ ε مش بتستهلك input؛ والـ concatenation مع ε مش بيغيّر حاجة (sε = s).",
     "صح (دي إجابتنا؛ مفيش model answer رسمي). الـ ε move بتغيّر الـ state من غير ما تقرا input، فالـ language بتتكتب بنفس الشكل.",
     "الـ DFA مينفعش يبقى فيه ε أصلًا (جدول المقارنة في L3)، فمفيش حالة DFA الـ ε ممكن تغيّر فيها حاجة.",
     "الـ ε معناها قراية الـ empty string في أي مكان تظهر فيه، فالـ start state ملهاش دعوة: الـ language بتفضل زي ما هي."
    ],
    [
     "الـ ε move بتخلّي الـ machine تغيّر الـ state من غير input، وده non-deterministic.",
     "صح. أي ε transition بتخلّي الـ automaton تبقى NFA."
    ],
    [
     "الـ DFAs ممكن يبقى فيها loops (زي الـ DFA بتاعة 1*01(0|1)*).",
     "صح. الـ loop بس لو معاها transition تانية على <b>نفس</b> الـ symbol (أو ε move) هي اللي بتعمل non-determinism."
    ],
    [
     "الـ loop لوحدها مفيهاش مشكلة. وكمان 3 على 0 بتوصل لـ 1.",
     "صح. δ(3,0) = {1,3} (الـ edge لـ 1 زائد الـ loop)، فالـ DFA state هي {1,3}.",
     "في الورقة دي الـ loop على 0، والـ 3 ليها move واحدة بس على 1 (لـ 2).",
     "مفيش ε move، والـ 2 مابنوصلهاش غير على 1."
    ],
    [
     "كده خدت الـ self-loop 1 –a→ 1 بس ونسيت الـ edge 1 –a→ 2، اللي هو كمان طالع من state 1 على a.",
     "كده خدت 1 –a→ 2 بس ونسيت إن الـ state 1 كمان بترجع لنفسها بـ loop على a.",
     "صح. الـ 1 على a بتروح لـ 1 (الـ loop) و 2، فبيطلع الـ final DFA state {1,2}.",
     "الـ ∅ معناها إن state 1 ملهاش a-moves، بس هي ليها اتنين: الـ loop لـ 1 والـ edge لـ 2."
    ]
   ],
   "extra": [
    [
     "الـ {1,3} دي المكان اللي {1,3} بتروحله على input 0 (1 –0→ 3، 3 –0→ 1)، مش على input 1.",
     "كده خدت الـ loop 3 –1→ 3 بس ونسيت الـ edge 3 –1→ 2.",
     "الـ state 1 ملهاش move على 1، بس الـ state 3 اللي في نفس الـ set ليها (لـ 3 ولـ 2)، فالخانة مش فاضية.",
     "صح. الـ 1 مش بتضيف حاجة على 1؛ والـ 3 بتروح للـ 3 والـ 2 الاتنين."
    ],
    [
     "صح. {1}، {3}، {2,3}، {1,3}؛ وكل set ما عدا {1} فيها الـ final state 3.",
     "أي set فيها final state من الأصل بتبقى final، مش {3} بس.",
     "كده نسيت الـ start row {1}. دي DFA state برضه رغم إنها مش final، لأنها مفيهاش state 3.",
     "الـ {2} لوحدها عمرها ما بتظهر: الـ 3 على 1 دايماً بتجيب 2 مع 3."
    ],
    [
     "لازم تاخد الـ ε-closure بتاعة 1، واللي فيها 3 كمان.",
     "صح. 3 –a→ 1، والخانة بتاخد الـ ε-closure للنتيجة: E(1) = {1,3} لأن 1 –ε→ 3 (L3, worked ε-NFA).",
     "الـ state 3 ملهاش a-loop؛ على a بتروح لـ 1، والـ ε-closure بتاع 1 هو {1,3}، مش {3}.",
     "ده الناتج من {2,3} على a، اللي بيدخل فيه moves الـ 2 كمان."
    ],
    [
     "الـ (S, a) = P ليها next state واحدة بالظبط، وده سلوك deterministic.",
     "الـ self-loop لوحده مش بيعمل non-determinism.",
     "صح. على a، الـ Q ممكن تفضل في Q أو تروح T: يعني اتنين next states.",
     "الـ transition الناقص (مفيش next state) مش هو العلامة اللي في المحاضرة للـ non-determinism."
    ],
    [
     "0 –a→ 1 –b→ 3، وبعدين 3 ملهاش move على a: مرفوض.",
     "0 –b→ 2 –a→ {2,3}، وبعدين ولا واحدة فيهم ليها b-move: مرفوض.",
     "بعد a بنبقى في 1، ومالهاش a-move: مرفوض.",
     "صح. 0 –b→ 2، وبعدين كل a بتدّي {2,3}، واللي فيها الـ final state 3. الـ language هي ab | ba+."
    ],
    [
     "صح. بيخلص بـ 0، فالـ DFA بيقف في {A,B}، وهي final.",
     "آخر 1 بيرجّع {A,B} لـ A، ودي مش final.",
     "الـ \"1\" بتسيب الـ DFA في A (A على 1 → A)، والـ A مش final لأنها مفيهاش B.",
     "الـ 0 بتودّينا لـ {A,B}، بس الـ 1 اللي في الآخر بترجّع {A,B} لـ A، والـ A مش final، فالـ 01 بتترفض."
    ],
    [
     "الـ rows بتيجي من الـ sets اللي بنوصلها فعلاً، مش من الـ states الأصلية.",
     "صح. ابدأ من (الـ ε-closure بتاعة) الـ start state وكرّر لحد ما مفيش sets جديدة تظهر.",
     "الـ sets اللي مش final محتاجة rows برضه (زي {2} و {3} في مثال الـ ε-NFA).",
     "الـ table التاني بيتعمل من غير ε: الـ ε بتظهر في أول table بس وبتتشال جوه الـ ε-closures."
    ],
    [
     "الـ acceptance بتعتمد على إن الـ set فيها final state من الأصل، مش على الخانات الفاضية.",
     "الـ DFA table ملوش عمود ε خالص؛ الـ ε موجودة بس في أول NFA table.",
     "صح. ده Step 3 في طريقة المحاضرة: لما الخانة تبقى فاضية (-)، الـ DFA بيروح لـ dead state، أو ببساطة مش بنرسم transition (L3, NFA → DFA method).",
     "الخانة الفاضية دي نتيجة عادية؛ التحويل دايمًا بينجح، والـ \"-\" معناها بس إن الـ set دي ملهاش move على الـ symbol ده."
    ],
    [
     "الـ {1} مفيهاش الـ final state الأصلية 3.",
     "صح. الـ sets اللي فيها 3 بس هي اللي final: {3} و {2,3} و {1,3}."
    ],
    [
     "صح. الـ {1,3} فيها الـ final state الأصلية 1، فهي start و final مع بعض (بنعلّم عليها →*).",
     "أي set في الـ DFA فيها final state من الأصل بتبقى final، والـ {1,3} فيها 1."
    ]
   ]
  },
  "4": {
   "notes": [
    {
     "h": "ليه الـ syntax analysis محتاج CFGs",
     "pts": [
      "الـ Syntax analysis (<b>parsing</b>) هو <b>تاني phase</b>. الـ lexer بيلاقي الـ tokens بالـ regular expressions، بس <b>مايقدرش يتشيك على الـ syntax</b> بتاع الجملة بسبب حدود الـ regular expressions.",
      "الـ regular expressions <b>ماتقدرش تتشيك على الـ tokens المتوازنة</b> زي الأقواس، فالـ phase دي بتستخدم <b>context-free grammar (CFG)</b>.",
      "الـ parser بياخد الـ <b>token stream</b> من الـ lexer، ويقارنه بالـ production rules عشان يكتشف الـ errors، ويطلّع <b>parse tree</b>. الـ Parsing = عملية إننا نلاقي parse tree لـ string من الـ tokens."
     ],
     "figH": {
      "cc-parse-pipeline": "من الحروف للـ parse tree: الـ lexer مش بيشوف الأقواس اللي مش متوازنة، والـ parser بيشوفها"
     }
    },
    {
     "h": "المكونات الأربعة للـ CFG",
     "pts": [
      "<b>Non-terminals (V)</b>: syntactic variables بتمثّل sets من الـ strings.",
      "<b>Terminals (Σ)</b>: الـ tokens، الرموز الأساسية اللي الـ strings بتتكوّن منها.",
      "<b>Productions (P)</b>: بتوضّح إزاي الـ terminals والـ non-terminals بيتجمعوا. كل واحدة ليها left side (non-terminal)، وسهم، و right side (tokens و/أو non-terminals).",
      "<b>Start symbol (S)</b>: المكان اللي الـ derivation بيبدأ منه. الـ strings بتتعمل derive من الـ start symbol إننا نفضل نبدّل non-terminal بالـ right side بتاع واحدة من الـ productions بتاعته.",
      "مفيش حاجة اسمها <b>\"end symbol\"</b> في الـ CFG (اختيار غلط مشهور في الامتحانات).",
      "مثال: S→ABC، A→a|Aa، B→b|Bb، C→c. الـ terminals {a,b,c}؛ الـ non-terminals {S,A,B,C}؛ الـ start هو S."
     ],
     "figH": {
      "cc-cfg-parts": "الأربع components بتوع الـ grammar في slide 5، ومفيش end symbol"
     }
    },
    {
     "h": "الـ Derivations",
     "pts": [
      "الـ <b>derivation</b> هو سلسلة production rules بنطبّقها عشان نوصل للـ input string. في كل خطوة بنقرر (1) أنهي non-terminal هنبدّله و(2) أنهي production هنستخدمها.",
      "<b>Leftmost derivation</b>: دايماً بدّل الـ non-terminal اللي على أقصى الشمال (امشي من الشمال لليمين). <b>Rightmost</b>: دايماً بدّل اللي على أقصى اليمين (امشي من اليمين للشمال).",
      "الـ top-down parser بيطلّع <b>leftmost derivation</b>. الـ Bottom-up parsers (shift-reduce, LR) بيطلّعوا rightmost derivation بالعكس."
     ],
     "figH": {
      "cc-cfg-derive": "اعمل derive لـ string بنفسك: اختار الـ non-terminal وبعدين الـ production",
      "cc-top-bottom": "الـ top-down بيبني الـ leftmost derivation، والـ bottom-up بيمشي في الـ rightmost بالعكس"
     }
    },
    {
     "h": "مثال: int*int مع E→TX, X→+E|ε, T→int Y|(E), Y→*T|ε",
     "figH": {
      "cc-int-derive": "جدول slide 8 خطوة خطوة، والـ parse tree بيكبر معاه"
     }
    },
    {
     "h": "الـ Parse trees",
     "pts": [
      "الـ <b>parse tree</b> هو رسمة بتوضّح الـ derivation. الـ <b>start symbol هو الـ root</b>.",
      "<b>كل الـ leaf nodes بتبقى terminals</b>؛ <b>كل الـ interior (non-leaf) nodes بتبقى non-terminals</b>؛ والـ <b>in-order traversal بيدّيك الـ input string الأصلي</b>.",
      "الـ parse tree بيوضّح الـ <b>associativity والـ precedence</b>: أعمق sub-tree بيتحسب الأول، فالـ operator بتاعه ليه precedence على الـ operators اللي في الـ parent nodes.",
      "السلايدز بتبني الـ leftmost tree لـ id+id*id خطوة خطوة: E→E*E، E→E+E*E، E→id+E*E، E→id+id*E، E→id+id*id.",
      "إجابة الـ revision sheet الرسمية: \"A leftmost parsing tree grows from the <b>right</b> side\" (جاوب الـ MCQ/T-F كده)."
     ],
     "figH": {
      "cc-tree-parts": "الـ leaves والـ interior nodes والـ in-order traversal، وأعمق sub-tree الأول",
      "cc-lm-tree": "الـ leftmost parsing tree بتاع id+id*id، متبني في الخمس خطوات بتوع السلايدز"
     }
    },
    {
     "h": "الـ Ambiguity",
     "pts": [
      "الـ grammar بيبقى <b>ambiguous</b> لو فيه <b>أكتر من parse tree</b> (أكتر من leftmost، أو أكتر من rightmost، derivation) لـ <b>string واحد على الأقل</b>.",
      "إن يبقى فيه leftmost derivation واحد و rightmost derivation واحد لنفس الـ string ده مش بيثبت الـ ambiguity. لازم يبقى عندك اتنين LEFTMOST مختلفين (أو اتنين rightmost مختلفين) derivations/trees.",
      "لو فيه leftmost (أو rightmost) tree واحد بس لكل sentence، يبقى الـ grammar <b>unambiguous</b>.",
      "مثال: E→E+E | E–E | id ده ambiguous. الـ id–id+id ليها اتنين trees (تحت)."
     ],
     "figH": {
      "cc-lmd-rmd": "الـ leftmost والـ rightmost لنفس الـ string ممكن يبقى ليهم tree واحدة",
      "cc-ambig-trees": "اتنين leftmost derivations للـ id-id+id، واتنين parse trees"
     }
    },
    {
     "h": "إثباتات ambiguity زيادة من الشيتات",
     "figH": {
      "cc-ambig-finder": "كل الـ leftmost derivations للـ strings بتاعة الشيتات، أو للـ grammar بتاعتك"
     }
    },
    {
     "h": "الـ Left recursion",
     "pts": [
      "الـ grammar بيبقى <b>left-recursive</b> لو فيه non-terminal A ليه derivation فيه A نفسه كـ <b>left-most symbol</b>.",
      "دي مشكلة للـ <b>top-down parsers</b>: بيبدأوا من الـ start symbol، ويفضلوا يعملوا expand لنفس الـ non-terminal اللي على الشمال، ومايعرفوش يقفوا إمتى فيدخلوا في <b>infinite loop</b>. عشان كده <b>الـ LL(1) مينفعش يتطبّق على left-recursive grammar</b>.",
      "(1) A → Aα | β ده <b>immediate</b> left recursion. (2) S → Aα | β مع A ⇒ Sd ده <b>indirect</b> left recursion.",
      "الـ A → Ab | c ده left-recursive."
     ],
     "figH": {
      "cc-lr-loop": "الـ grammar اللي فيها left recursion بتدخّل الـ top-down parser في infinite loop، وبعد التعديل لأ",
      "cc-lr-kinds": "الـ immediate والـ indirect left recursion من slide 15"
     }
    },
    {
     "h": "إزالة الـ left recursion",
     "figH": {
      "cc-lr-remove": "شيل الـ left recursion خطوة خطوة: قسّم الاختيارات لـ α و β وبعدين ضيف non-terminal جديد"
     }
    }
   ],
   "cards": [
    "الـ regular expressions ماتقدرش تتشيك على الـ tokens المتوازنة زي الأقواس.",
    "Non-terminals، terminals، productions، start symbol.",
    "لأ.",
    "إننا نلاقي parse tree لـ string من الـ tokens (وبيتسمى برضه syntax analysis).",
    "الـ Input: stream من الـ tokens. الـ Output: parse (syntax) tree.",
    "دايماً بدّل الـ non-terminal اللي على أقصى الشمال الأول.",
    "Terminals.",
    "Non-terminals.",
    "الـ input string الأصلي.",
    "أكتر من parse tree (اتنين leftmost أو اتنين rightmost derivations) لـ string واحد على الأقل.",
    "non-terminal A الـ derivation بتاعه فيه A كـ left-most symbol.",
    "الـ top-down parsers بيفضلوا في loop للأبد وهم بيعملوا expand لنفس الـ non-terminal.",
    "A → βA', A' → αA' | ε",
    "leftmost derivation.",
    "Right (اليمين)."
   ],
   "qa": [
    "الـ regular expressions (اللي الـ lexer بيستخدمها) ماتقدرش تتشيك على الـ tokens المتوازنة زي الأقواس، فماتقدرش تتشيك على الـ syntax بتاع الجملة. إنما الـ CFG يقدر يوصف structures متداخلة ومتوازنة.",
    "LMD1: E => E+E => E-E+E => id-E+E => id-id+E => id-id+id (الـ root هو +، والـ left child هو id-id). LMD2: E => E-E => id-E => id-E+E => id-id+E => id-id+id (الـ root هو -، والـ right child هو id+id). يبقى فيه اتنين leftmost derivations/parse trees مختلفين لـ string واحد، يبقى الـ grammar ambiguous.",
    "LMD1: S => 0A => 00AA => 001SA => 0011BA => 00110A => 001101. LMD2: S => 0A => 00AA => 001A => 0011S => 00110A => 001101. اتنين leftmost derivations (اتنين parse trees)، يبقى الـ grammar ambiguous.",
    "E -> TE' و E' -> +TE' | epsilon.",
    "LMD1: S => AB => AAB => aAB => aaB => aaTc => aaac (الـ A بتدّي aa، والـ T بتدّي a). LMD2: S => AB => aB => aTc => aaTc => aaac (الـ A بتدّي a، والـ T بتدّي aa). اتنين leftmost derivations وtrees مختلفين، يبقى الـ grammar ambiguous."
   ],
   "quiz": [
    [
     "كلمة «Analysis» عامة أوي: الـ front end فيه lexical وsyntax وsemantic analysis. إنك تلاقي الـ parse tree ده بالتحديد اسمه parsing.",
     "الـ recognizer بيرد بـ yes أو no بس على الـ string؛ لكن المحاضرة بتعرّف إيجاد الـ parse tree نفسها على إنه parsing.",
     "صح. الـ syntax analysis أو الـ parsing بياخد الـ stream of tokens ويطلّع parse tree، يبقى الـ parsing هو عملية إيجاد parse tree لـ string of tokens (L4, Syntax Analysis).",
     "الـ Tokenization ده الـ lexical analysis: هو اللي بيطلّع الـ tokens. إنك تبني tree من الـ tokens دي شغلانة الـ parser."
    ],
    [
     "صح. في الـ parse tree كل الـ leaf nodes بتبقى terminals، وكل الـ interior nodes بتبقى non-terminals، ولو قريت الـ leaves بالترتيب (in-order) هتطلع الـ input string (L4, Parse Tree).",
     "الـ non-terminals هي الـ interior nodes (اللي مش leaves) في الـ parse tree؛ الـ leaves نفسها terminals.",
     "الـ start symbol هو الـ root بتاع الـ parse tree، مش الـ leaves.",
     "الـ productions هي الوصلات من الـ parent للـ children."
    ],
    [
     "الـ start symbol S واحد من الأربع components بتوع الـ CFG: الـ derivation بيبدأ منه.",
     "الـ non-terminals (V)، اللي هي الـ syntactic variables، واحدة من الأربع components بتوع الـ CFG.",
     "صح. الـ CFG ليه أربع components: non-terminals (V) وterminals (Σ) وproductions (P) وstart symbol (S). مفيش حاجة اسمها «end symbol» (L4, Context-Free Grammar).",
     "الـ terminals (Σ)، اللي هي الـ tokens اللي الـ strings معمولة منها، واحدة من الأربع components بتوع الـ CFG."
    ],
    [
     "الـ Ambiguous معناها أكتر من parse tree (يعني أكتر من leftmost أو rightmost derivation) لـ string واحدة على الأقل، وده عكس الحالة اللي في السؤال.",
     "صح. الـ grammar بتبقى ambiguous لو فيه string ليها أكتر من parse tree؛ لكن لو كل sentence ليها leftmost (أو rightmost) tree واحدة بس، تبقى unambiguous (L4, Ambiguity).",
     "«Static» مش صفة من صفات الـ grammars في الكورس؛ الـ grammars بتتقسم لـ ambiguous أو unambiguous.",
     "«Dynamic» مش صفة للـ grammar في الكورس؛ الصفة اللي ليها علاقة بعدد الـ parse trees هي الـ (un)ambiguity."
    ],
    [
     "الـ rule دي لوحدها بتدّي tree واحد لكل string (c, cb, cbb…).",
     "صح. الـ A ظاهرة كـ left-most symbol في الـ right side بتاعها هي.",
     "«Dynamic» مش صفة للـ grammar؛ الـ A → Ab | c دي left recursive لإن A هي أول symbol على الشمال في الـ right side بتاعها.",
     "الـ left recursion بس هو اللي ينطبق: «dynamic» مش صفة للـ grammar، والـ rule دي بتدّي tree واحدة بس لكل string، فهي مش ambiguous."
    ],
    [
     "صح. الـ parser بياخد الـ input بتاعه من الـ lexical analyzer على شكل stream of tokens ويـ check عليه بالـ production rules (L4, Syntax Analysis).",
     "الـ syntax (parse) tree ده الـ OUTPUT بتاع الـ syntax analysis، مش الـ input.",
     "الـ annotated syntax tree بيطلّعه الـ semantic analysis، اللي بييجي بعد الـ parser.",
     "الـ assembly أو الـ target code بيطلع في آخر الـ compiler، من الـ code generation."
    ],
    [
     "الـ source program مكتوب بـ high-level language آه، بس الـ parser بيـ check عليه باستخدام context-free grammar.",
     "الـ low-level language ده الـ target بتاع الـ code generation، مش الـ model بتاع الـ syntax analysis.",
     "صح. الـ regular expressions مش بتقدر تـ check الـ balancing tokens زي الأقواس، عشان كده الـ syntax analysis بيستخدم context-free grammar (L4, Syntax Analysis).",
     "الـ regular grammars/expressions بتوصف الـ lexical analysis."
    ],
    [
     "الـ key الرسمي بتاع الـ revision sheet (Q52) وامتحان 2023/24 بيقولوا «right»، فجاوب right، مع إن الـ leftmost derivation بيفك الـ non-terminal اللي على الشمال الأول.",
     "الـ leftmost tree مش بتكبر بالتساوي من الناحيتين؛ والـ key الرسمي للسؤال ده «right».",
     "صح حسب إجابة الـ revision sheet الرسمية (Q52) وامتحان 2023/24.",
     "الناحية ممكن تتحدد: الـ key الرسمي بتاع الـ revision sheet (Q52) بيقول إن الـ leftmost parsing tree بتكبر من الـ right side."
    ],
    [
     "أي grammar unambiguous برضه فيه الاتنين. ده مش بيثبت حاجة.",
     "لو مش قادرة تعمل derive لـ string يبقى الـ string دي مش في الـ language؛ الـ ambiguity بتتكلم عن strings بتتعمل derive فعلاً بأكتر من طريقة.",
     "صح. الـ grammar بتبقى ambiguous لو فيه string واحدة على الأقل ليها أكتر من parse tree، يعني اتنين leftmost derivations مختلفين (أو اتنين rightmost) (L4, Ambiguity).",
     "فيه إجابة صح: اختيار (c)، إن نفس الـ string توصلّها بأكتر من leftmost أو rightmost derivation، ده بالظبط تعريف الـ ambiguity."
    ],
    [
     "صح (واحدة من الاتنين؛ التانية هي S ⇒ aaB ⇒ aab)، يبقى الـ grammar ambiguous.",
     "الـ S ⇒ Ab ⇒ ab استخدمت A → a وطلّعت ab، اللي فيها a واحدة بس؛ والمطلوب aab.",
     "الخطوة aaB ⇒ aaBb مستحيلة: الـ rule الوحيدة لـ B هي B → b، ودي بتبدّل B ومبتزودش حاجة بعدها.",
     "الـ S ليها S → Ab وS → aaB بس؛ مفيش production اسمها S → AaB، فأول خطوة أصلاً غلط."
    ],
    [
     "ده بيبدّل الأدوار: d جاية بعد الـ A الـ recursive، يعني α = d ومكانها في A'، والاختيار اللي مش recursive β = aB هو اللي يبدأ بيه A.",
     "صح. A → Aα | β بتبقى A → βA', A' → αA' | ε. هنا α = d وβ = aB، فيطلع A → aBA', A' → dA' | ε (L4, Removing left recursion).",
     "الـ A → aB | dA دي right-recursive وبتطلّع strings زي daB والـ d في الأول، لكن الـ language الأصلية هي aB وبعدها أي عدد من الـ d's.",
     "الـ d* دي notation بتاعة regular expressions، مش CFG production؛ المحاضرة بتكتب التكرار ده بـ non-terminal جديد A'."
    ],
    [
     "الـ top-down parser هيفضل في loop للأبد على A → Aα.",
     "صح. الـ top-down parser بيفضل يفك نفس الـ non-terminal اللي على الشمال، ومش بيعرف إمتى يقف فيدخل في loop للأبد، عشان كده لازم تشيل الـ left recursion قبل الـ LL(1) (L4, Left Recursion).",
     "الـ ambiguity حاجة تانية خالص: E → E+T | T دي unambiguous بس برضه left-recursive، والـ top-down parser هيفضل في loop عليها.",
     "الـ LL(1) ده predictive parser بيختار بـ lookahead واحد ومبيعملش backtracking أبداً؛ الحل إنك تشيل الـ left recursion."
    ],
    [
     "ترتيب ملوش معنى؛ الـ machine code ده الـ output النهائي للـ compiler.",
     "صح. الـ parser بيقرا الـ token stream ويبني الـ parse/syntax tree.",
     "source code داخل وtokens خارجة ده الـ lexical analyzer (scanner)، أول phase؛ الـ parser بيبدأ من الـ tokens.",
     "اختيار (a) غلط (الـ machine code ده الـ output النهائي للـ compiler، مش الـ input بتاع الـ parser)، فـ «both» مينفعش تبقى صح."
    ],
    [
     "الـ code optimization بيحسّن intermediate أو target code عدّى خلاص من الـ syntax والـ semantic checks.",
     "بيـ check المعنى (types, declarations)، مش الـ grammar.",
     "الـ code generation بيطلّع الـ target code في آخر الـ compiler؛ الـ check على الـ grammar بيحصل بدري قبلها بكتير، في الـ parser.",
     "صح. الـ parser بيـ check الـ token stream على الـ CFG."
    ],
    [
     "«Analyzing» عامة أوي؛ إنك تقرر هل الـ grammar بتطلّع الـ token string ولا لأ ده بالتحديد اسمه parsing.",
     "صح. الـ parsing بيحدد هل الـ grammar بتعمل derive للـ token string (وإزاي).",
     "الـ Translating ده اللي الـ compiler كله بيعمله (من source لـ target program)، مش الـ check ده على الـ grammar لوحده.",
     "الـ key بتاع الدكتور والمحاضرة بيسموها parsing؛ الـ recognizer لوحده مش هو المصطلح اللي الكورس بيستخدمه هنا."
    ],
    [
     "الـ code optimization بيشتغل على الـ intermediate أو الـ target code ومبيستخدمش الـ grammar.",
     "بيمشي حسب الـ target machine، مش الـ grammar.",
     "صح. الـ parser (syntax analysis) بيـ check الـ token stream على الـ production rules بتاعة الـ context-free grammar وبيبني منها الـ parse tree (L4, Syntax Analysis).",
     "الـ lexical analysis بيستخدم regular expressions وpattern rules؛ والمحاضرة بتقول إنه مش بيقدر يـ check الـ syntax، وعشان كده الـ parser بيستخدم CFG."
    ],
    [
     "الـ Leftmost derivation ده ترتيب لتبديل الـ non-terminals، مش property في الـ grammar؛ الـ property اللي في السؤال هي الـ left recursion.",
     "صح. A ⇒+ Aα ده left recursion؛ وبيخلّي الـ top-down parsers تفضل تلف للأبد.",
     "بيشيل الـ common prefixes؛ ده transformation تانية.",
     "«Left parsing» مش مصطلح من المحاضرة؛ لما non-terminal يعمل derive لنفسه كأول symbol على الشمال يبقى ده left recursion."
    ],
    [
     "الـ Left recursion دي property في الـ grammar (A ⇒ Aα)، مش ترتيب تطبيق الـ productions في الـ derivation.",
     "«Left non-terminal» مش نوع derivation؛ المحاضرة فيها نوعين بس: leftmost وrightmost.",
     "«Left pushdown» مش نوع derivation؛ المحاضرة بتعرّف leftmost وrightmost derivations بس.",
     "صح. في الـ leftmost derivation الـ sentential form بيتقري من الشمال لليمين وبيتبدل الـ non-terminal اللي على الشمال خالص في كل خطوة (L4, Derivation)."
    ],
    [
     "كل الـ phases بتستخدم الـ symbol table؛ دي مش شغلانة الـ parser.",
     "تجميع الـ data types والـ check عليها ده الـ semantic analysis (type checking)، اللي بيشتغل بعد الـ parser.",
     "صح. الـ parser بيبني الـ parse/syntax tree.",
     "اختيار (c) هو الصح: المحاضرة بتقول إن الـ output بتاع الـ syntax analyzer هو parse tree."
    ],
    [
     "الـ Unambiguous معناها parse tree واحدة بالظبط لكل sentence؛ أكتر من tree يبقى ambiguous.",
     "صح (حسب الـ official key). اقرا \"one or more\" على إنها \"أكتر من واحدة\": وده الـ ambiguity.",
     "مينفعش تبقى الاتنين: الـ key الرسمي اختار ambiguous، وفهم «one or more» على إنها أكتر من parse tree لـ sentence.",
     "الـ key الرسمي اختار ambiguous: إن يبقى فيه أكتر من parse tree لـ sentence ده تعريف الـ ambiguity في المحاضرة."
    ],
    [
     "الـ Semantic analysis بيـ check المعنى (types، declarations) بعد الـ parsing؛ الـ parsing نفسه هو الـ syntax phase.",
     "الـ Lexical analysis (scanning) هو أول phase وبيطلّع tokens؛ ده مش parsing.",
     "صح. المحاضرة بتبدأ بـ «Syntax analysis or parsing is the second phase of a compiler»، يعني الـ parsing هو الـ syntax analysis (L4, Syntax Analysis).",
     "اختيار (c) هو الصح: المحاضرة بتستخدم «syntax analysis» و«parsing» لنفس الـ phase."
    ],
    [
     "الـ Lexical analysis بيستخدم regular expressions وpattern rules، ودول مش بيقدروا يـ check الـ balancing tokens.",
     "صح. الـ regular expressions مش بتقدر تـ check الـ structures المتوازنة زي الأقواس، عشان كده الـ syntax analysis phase بيستخدم context-free grammar (L4, Syntax Analysis).",
     "الـ Semantic analysis بيستخدم attribute grammars (semantic rules متعلقة على الـ productions)؛ الـ CFG العادي هو الـ model بتاع الـ parser.",
     "اختيار (b) هو الصح: الـ context-free grammars هي الـ model بتاع الـ syntax analysis phase."
    ],
    [
     "الـ derivations بتاعة الـ sentences دايمًا بتبدأ من الـ start symbol.",
     "صح. الـ derivation بيبدأ من الـ start symbol S."
    ],
    [
     "أي string ليها leftmost derivation و rightmost derivation، حتى في grammar مش ambiguous.",
     "صح. الـ ambiguity محتاجة اتنين <b>LEFTMOST</b> derivations مختلفين (أو اتنين rightmost مختلفين)، يعني two parse trees."
    ],
    [
     "الـ / ليها مصدر واحد بس، op → /، فهي مش المكان اللي الـ two trees بيختلفوا فيه؛ الاختلاف في الطريقة اللي الـ + بتتعمل بيها.",
     "صح. Tree 1: E op E والـ op = +. Tree 2: E op E والـ op = ε والـ E اللي على اليمين = +E.",
     "الأقواس terminals ولازم تظهر زي ما هي مكتوبة بالظبط.",
     "الـ op بتعمل derive لـ + - * / أو ε بس، عمرها ما بتطلّع num؛ الـ num بييجي من E → num بس."
    ]
   ],
   "extra": [
    [
     "المحاضرة بتقول إن الـ lexer مش بيقدر يـ check الـ syntax بسبب حدود اللي الـ regular expressions تقدر تعبّر عنه، مش عشان هي بطيئة.",
     "صح. الـ CFG يقدر يوصف structures متداخلة ومتوازنة.",
     "الـ lexer بيتعرف على الـ keywords فعلاً كـ tokens؛ مشكلته إن الـ regular expressions مش بتقدر تـ match الـ structures المتداخلة والمتوازنة.",
     "الأقواس tokens بتتبعت للـ parser، مش white space. المشكلة إن الـ regular expressions مش بتقدر تـ check إنها متوازنة."
    ],
    [
     "ده تاني form في الـ LEFTMOST derivation (اتبدّلت T الأول).",
     "الـ TX دي الـ form بعد أول خطوة (E ⇒ TX)؛ في تاني خطوة الـ non-terminal اللي على اليمين خالص X بيتبدل بـ ε.",
     "الـ int Y دي بعد تالت خطوة (T → int Y)، بعد ما X اتشالت خلاص في خطوة 2.",
     "صح. E ⇒ TX، وبعدين الـ rightmost non-terminal اللي هو X بيتبدّل بـ ε، فيطلع T."
    ],
    [
     "صح. E ⇒ TX ⇒ int Y X ⇒ int * T X (Y → *T).",
     "الـ int Y X دي بعد تاني خطوة (T → int Y)؛ تالت خطوة بتبدّل Y بـ *T.",
     "الـ int * int Y X دي بعد رابع خطوة، لما الـ T اللي في int * T X اتبدلت بـ int Y.",
     "ده من الـ rightmost derivation، اللي الـ X اتشالت فيه بدري."
    ],
    [
     "ده بيتعامل مع الاختيار α = Bα بس وبيضيّع الاختيار الـ recursive التاني Aa، فلازم A' يبقى فيها aA' كمان.",
     "الـ Bα والـ a هم أجزاء الـ α؛ مكانهم في A'، والـ β = a مكانها في A.",
     "صح. β = a؛ والـ α's هي Bα و a، كل واحدة وراها A'، بالإضافة لـ ε.",
     "ده بيغطي الـ strings اللي فيها تكرار واحد بس."
    ],
    [
     "الـ α والـ β متبدلين: الـ β اللي مش recursive = T لازم تبدأ بيها E، والـ α = +T مكانها في E' (E → TE', E' → +TE' | ε).",
     "صح. A → Aα | β بتبقى A → βA', A' → αA' | ε مع α = +T و β = T.",
     "من غير alternative تاني، الـ E عمرها ما هتقف عن الـ derivation، وده مش الـ pattern بتاع المحاضرة A → βA', A' → αA' | ε.",
     "من غير E' → ε الـ derivation عمره ما هيقف."
    ],
    [
     "الـ Immediate هو A → Aα، يعني الـ non-terminal نفسه أول symbol في الـ production بتاعته على طول.",
     "الـ Right recursion معناها الـ non-terminal يرجع في الآخر على اليمين؛ هنا S بترجع على الـ LEFT، عن طريق A (S ⇒ Aα ⇒ Sdα).",
     "S ⇒ Aα ⇒ Sdα، يعني الـ S ليها derivation هي نفسها فيه الـ left-most symbol.",
     "صح. الـ left recursion بيعدّي من خلال non-terminal تاني (A)."
    ],
    [
     "صح. الـ A بتدّي aa، والـ B بتدّي bbb، والـ C بتدّي c. الـ language هي a واحدة أو أكتر، و b واحدة أو أكتر، وبعدين c واحدة.",
     "الـ abcc مستحيلة لإن C → c هي الـ rule الوحيدة لـ C وبتدّي c واحدة بالظبط.",
     "الـ bbc مفيهاش a، لكن A → a | Aa دايماً بتطلّع a واحدة على الأقل قبل الـ b's.",
     "الـ abca فيها a بعد الـ c، لكن S → ABC بتخلص بـ C → c، فمفيش حاجة بتيجي بعد الـ c الوحيدة."
    ],
    [
     "الـ (id–id)+id ده الـ grouping بتاع الـ tree التانية، اللي الـ + فيها في الـ root والـ sub-tree بتاعة الـ – أعمق، فالـ – بيتنفذ الأول.",
     "الـ parse tree دايماً بيوضّح ترتيب: أعمق sub-tree الأول.",
     "صح. الـ + sub-tree هو الأعمق، فبيتحسب الأول؛ والـ – اللي في الـ root بييجي في الآخر.",
     "المحاضرة بتقول إن الـ parse trees بتوضّح الـ precedence والـ associativity."
    ],
    [
     "صح. دي واحدة من خصائص الـ parse tree في المحاضرة، مع: الـ root = start symbol، الـ leaves = terminals، الـ interior nodes = non-terminals.",
     "المحاضرة كاتبة دي كخاصية من خصائص الـ parse tree."
    ],
    [
     "المحاضرة بتستخدم الـ grammar ده كمثال على الـ UNAMBIGUOUS: الـ id+id*id ليها leftmost derivation واحد بس.",
     "صح. الـ LMD الوحيد هو E ⇒ E+T ⇒ T+T ⇒ F+T ⇒ id+T ⇒ id+T*F ⇒ id+F*F ⇒ id+id*F ⇒ id+id*id."
    ]
   ]
  },
  "6": {
   "notes": [
    {
     "h": "الـ FIRST والـ FOLLOW",
     "pts": [
      "<b>FIRST(α)</b> = مجموعة الـ terminals اللي ممكن تبدأ بيها أي strings طالعة من α. ولو α ⇒* ε يبقى ε كمان بتدخل في FIRST(α).",
      "في الـ predictive parsing، لو عندنا A → α | β، ولو FIRST(α) وFIRST(β) مفيش بينهم حاجة مشتركة (disjoint)، بنختار الـ A-production الصح بإننا نبص على الـ input symbol اللي جاي.",
      "<b>FOLLOW(A)</b> = مجموعة الـ terminals a اللي ممكن تيجي على يمين A على طول في أي sentential form (S ⇒* αAaβ). لو A ممكن تبقى آخر symbol على اليمين، يبقى <b>$</b> في FOLLOW(A). والـ FOLLOW عمره ما بيكون فيه ε."
     ],
     "figH": {
      "cc-first-pick": "لما الـ FIRST sets تبقى disjoint، فرمز واحد من الـ input بيختار الـ production",
      "cc-follow-form": "الـ FIRST والـ FOLLOW من الـ sentential forms بتاعة Example 1"
     }
    },
    {
     "h": "قواعد الـ FIRST",
     "pts": [
      "1. لو X عبارة عن terminal، يبقى FIRST(X) = {X}.",
      "2. لو X → Y1Y2…Yk، حط a في FIRST(X) لو a ∈ FIRST(Yi) وكانت ε موجودة في كل FIRST(Y1)…FIRST(Yi-1). ولو ε موجودة في كل FIRST(Yj)، ضيف ε لـ FIRST(X).",
      "3. لو X → ε production موجودة، ضيف ε لـ FIRST(X)."
     ],
     "figH": {
      "cc-first-sets": "حساب الـ FIRST production ورا production، وكل مرة باسم القاعدة"
     }
    },
    {
     "h": "قواعد الـ FOLLOW",
     "pts": [
      "1. حط $ في FOLLOW(S)، وS هنا هو الـ start symbol.",
      "2. لو A → αBβ، كل اللي في FIRST(β) ما عدا ε بيدخل في FOLLOW(B).",
      "3. لو A → αB، أو A → αBβ وFIRST(β) فيها ε، يبقى كل اللي في FOLLOW(A) بيدخل في FOLLOW(B)."
     ],
     "figH": {
      "cc-follow-sets": "حساب الـ FOLLOW مكان ورا مكان بالقواعد التلاتة"
     }
    },
    {
     "h": "الـ LL(1) grammars",
     "pts": [
      "الـ predictive parsers هي recursive-descent parsers مش محتاجة <b>backtracking</b> خالص. والـ grammars اللي نقدر نبني لها parser من النوع ده اسمها <b>LL(1)</b>.",
      "أول <b>L</b>: بنقرا الـ input من الشمال لليمين (Left to right). تاني <b>L</b>: Leftmost derivation. والـ <b>1</b>: بنبص على input symbol واحد قدام (lookahead).",
      "الـ G تبقى LL(1) لو وبس لو لكل زوج A → α | β: (1) α وβ مايطلعوش الاتنين strings بتبدأ بنفس الـ terminal؛ (2) واحد بس منهم على الأكتر ممكن يطلّع ε؛ (3) لو α ⇒* ε، يبقى β مايطلّعش أي string بيبدأ بـ terminal موجود في FOLLOW(A).",
      "يعني باختصار: مفيش left recursion، مفيش ambiguity، ومفيش خانة في الجدول فيها entry-ين."
     ],
     "figH": {
      "cc-ll1-letters": "الـ scan من الشمال لليمين والـ leftmost derivation والـ lookahead الواحد على <bdi>abd</bdi>",
      "cc-ll1-check": "الـ 3 شروط بتوع الـ LL(1) متشيّكة على كل زوج alternatives"
     }
    },
    {
     "h": "بناء الـ predictive parsing table M",
     "pts": [
      "لكل production A → α:",
      "1. لكل terminal a في FIRST(α)، ضيف A → α في M[A, a].",
      "2. لو ε ∈ FIRST(α)، ضيف A → α في M[A, b] لكل b في FOLLOW(A) (ومعاهم $).",
      "الخانات الفاضية معناها errors.",
      "<b>الـ Parsing</b>: الـ stack بيبدأ S$ والـ input بيبقى w$. لو الـ top عبارة عن terminal بيساوي الـ input symbol، يبقى <b>match</b> (pop ونقدّم في الـ input). لو هو non-terminal A، بنبدّله بالـ right side بتاع M[A, a] (بنعمله push بحيث أول symbol يبقى فوق). بنعمل accept لما الاتنين يبقوا $."
     ],
     "figH": {
      "cc-ll1-moves": "حركات الـ parser: الـ expand والـ match والـ accept والـ error"
     }
    },
    {
     "h": "مثال 1: S → A, A → aB | Ad, B → b, C → g",
     "pts": [
      "بعد ما نشيل الـ left recursion: S → A, A → aBA', A' → dA' | ε, B → b, C → g."
     ],
     "figH": {
      "cc-leftrec-ex1": "إزالة الـ left recursion من <bdi>A → aB | Ad</bdi>",
      "cc-table-ex1": "الجدول M بتاع Example 1 بيتملا production ورا production"
     }
    },
    {
     "h": "مثال 1: عمل parse لـ abd",
     "figH": {
      "cc-parse-abd": "عمل parse لـ <bdi>abd</bdi>: الـ stack والـ input والـ action، والـ parse tree بتكبر"
     }
    },
    {
     "h": "مثال 2: الـ expression grammar",
     "pts": [
      "E → TE', E' → +TE' | ε, T → FT', T' → *FT' | ε, F → (E) | id."
     ],
     "figH": {
      "cc-table-expr": "الـ FIRST والـ FOLLOW والجدول M بتوع الـ expression grammar خانة خانة"
     }
    },
    {
     "h": "جرامر الامتحان: S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε",
     "pts": [
      "FOLLOW(S): فيها $ (عشان هو الـ start)، و\")\" من U → (S)، وb من U → aSb.",
      "FOLLOW(U): فيها FIRST(VW) − ε = {a, c}؛ وبما إن VW ممكن تختفي، بنضيف FOLLOW(S).",
      "FOLLOW(V): فيها FIRST(W) − ε = {c}، وكمان FOLLOW(S) عشان W هي nullable. وFOLLOW(W) = FOLLOW(S).",
      "مفيش خانة فيها entry-ين، يبقى الـ grammar ده LL(1). والـ parse الكامل لـ (dc)ac موجود في امتحان 2024/25 تحت."
     ],
     "figH": {
      "cc-exam-follow": "الـ FOLLOW sets بتاعة جرامر الامتحان خطوة خطوة",
      "cc-exam-table": "الجدول M بتاع جرامر الامتحان: مفيش خانة فيها entry-ين",
      "cc-exam-parse": "عمل parse لـ <bdi>(dc)ac</bdi> بجدول جرامر الامتحان"
     }
    }
   ],
   "cards": [
    "الـ terminals اللي ممكن تبدأ بيها الـ strings الطالعة من α (وكمان ε لو α ⇒* ε).",
    "الـ terminals اللي ممكن تيجي بعد A على طول؛ و$ لو A ممكن تبقى آخر حاجة على اليمين.",
    "لأ.",
    "$",
    "FIRST(β) − {ε} ⊆ FOLLOW(B).",
    "FOLLOW(A) ⊆ FOLLOW(B).",
    "Left-to-right scan، وLeftmost derivation، وlookahead symbol واحد.",
    "recursive-descent parser مش محتاج backtracking.",
    "لكل terminal a في FIRST(α)، حط A → α في M[A,a].",
    "لو ε ∈ FIRST(α)، حط A → α في M[A,b] لكل b في FOLLOW(A)، ومعاهم $.",
    "Error.",
    "لما الـ stack والـ input يبقوا الاتنين $.",
    "{(, id}",
    "{+, *, ), $}"
   ],
   "qa": [
    "لكل زوج productions A -> alpha | beta: مفيش terminal a بيبدأ بيه strings طالعة من alpha ومن beta مع بعض؛ وواحد بس على الأكتر من alpha وbeta بيطلّع الـ empty string؛ ولو alpha بيطلّع الـ empty string، يبقى beta مايطلّعش أي string بيبدأ بـ terminal موجود في FOLLOW(A).",
    "لكل production A -> alpha: لكل terminal a في FIRST(alpha) حط A -> alpha في M[A,a]؛ ولو epsilon موجودة في FIRST(alpha)، حط A -> alpha في M[A,b] لكل b في FOLLOW(A) (وفي M[A,$] لو $ موجودة في FOLLOW(A)). وكل الخانات اللي فاضلة تبقى errors.",
    "FIRST(E)=FIRST(T)=FIRST(F)={(,id}؛ وFIRST(E')={+,e}؛ وFIRST(T')={*,e}. وFOLLOW(E)=FOLLOW(E')={),$}؛ وFOLLOW(T)=FOLLOW(T')={+,),$}؛ وFOLLOW(F)={+,*,),$}.",
    "الأول نشيل الـ left recursion: A -> bA', A' -> bcA' | e. الـ FIRST: S{a}, A{b}, A'{b,e}, B{d}. الـ FOLLOW: S{$}, A{d}, A'{d}, B{e}. الـ Parse: S -> aABe، match a، A -> bA'، match b، A' -> bcA'، match b، match c، A' -> e (على d)، B -> d، match d، match e، accept."
   ],
   "quiz": [
    [
     "صح. أول L معناها إن الـ input بيتقري من الشمال لليمين (Left to right)، وتاني L معناها إنه بيبني Leftmost derivation، والـ 1 معناها symbol واحد lookahead من الـ input (L6, LL(1) grammars).",
     "أول L هي الـ left-to-right scan، مش الـ left recursion؛ بالعكس، الـ LL(1) grammars لازم تبقى خالية من الـ left recursion. والـ 1 بتعد الـ lookahead symbols، مش states.",
     "الـ LL(1) ملهاش علاقة بـ lexical أو logical phases أو passes: L = Left-to-right scan، وL = Leftmost derivation، و1 = lookahead symbol واحد.",
     "الـ rightmost derivation (بالعكس) ده اللي بيبنيه الـ bottom-up LR parsers. الـ LL(1) ده top-down، فتاني L بتاعته Leftmost derivation."
    ],
    [
     "صح. FIRST(E') − ε = {+}، وE' هي nullable فبنضيف FOLLOW(E) = {), $}.",
     "ده FOLLOW(F): الـ * جاية من T' → *FT'، اللي بتحط FIRST(T') بعد F. مفيش حاجة في الـ grammar بتحط * بعد T على طول.",
     "ده FOLLOW(E) = FOLLOW(E'). ناقصه الـ + اللي T بتاخدها من E' → +TE' (الـ FIRST(E') − ε = {+} بتيجي بعد T).",
     "ده FIRST(T) = FIRST(F) = {(, id}: الـ terminals اللي T بتبدأ بيها، مش اللي ممكن تيجي بعدها. الـ FOLLOW(T) = {+, ), $}."
    ],
    [
     "الـ T' → *FT' بتتحط في M[T', *] بس، عشان FIRST(*FT') = {*}. تحت ) الـ parser لازم يخلّي T' تختفي.",
     "صح. \")\" ∈ FOLLOW(T') وT' عندها ε production.",
     "الخانة مليانة: T' بتبقى nullable و) ∈ FOLLOW(T') = {+, ), $}، فـ table rule 2 بتحط T' → ε في M[T', )].",
     "الـ T → FT' دي production بتاعة T، فمكانها في row T بس (تحت id و( ). الـ row بتاع T' فيه productions بتاعة T' بس."
    ],
    [
     "الـ F → id مكانها M[F, id]، عشان FIRST(id) = {id}. تحت ( الـ parser لازم يختار F → (E).",
     "صح. table rule 1: الـ FIRST((E)) = {(}، فـ F → (E) بتتحط في M[F, (] (L6, Building the predictive parsing table).",
     "الـ E → TE' مكانها row E (موجودة في M[E, (] وM[E, id]). الـ row بتاع F فيه productions بتاعة F بس.",
     "الخانة مش فاضية: FIRST((E)) = {(}، فـ M[F, (] = F → (E). الخانات الفاضية في row F هي +، *، ) و$."
    ],
    [
     "الـ {$} ده FOLLOW(A) وFOLLOW(A'). الـ B بييجي بعدها A' في A → aBA'، فلازم تزوّد FIRST(A') − ε = {d} على FOLLOW(B).",
     "صح. FIRST(A') − ε = {d}؛ وA' هي nullable، فبنضيف FOLLOW(A) = {$}.",
     "الـ {b} ده FIRST(B)، الـ terminal اللي B بتبدأ بيه. الـ FOLLOW(B) بيعدّ اللي ممكن ييجي بعد B: {d, $}.",
     "الـ {d, ε} ده FIRST(A'). الـ FOLLOW sets عمرها ما بيبقى فيها ε؛ وبما إن A' ممكن تختفي، بنزوّد بدالها الـ $ من FOLLOW(A)، فيطلع {d, $}."
    ],
    [
     "الـ $ لوحدها بتتجاهل الأماكن اللي S بتظهر فيها جوه: U → (S) بتحط ) بعد S، وU → aSb بتحط b بعد S، فـ FOLLOW(S) = {$, ), b}.",
     "صح. الـ $ عشان S هي الـ start symbol، والـ ) من U → (S)، والـ b من U → aSb، باستخدام FOLLOW rules 1 و2 (L6, Exam grammar).",
     "الـ {a, c} جايين من FIRST(VW)، ودول مكانهم FOLLOW(U)، مش FOLLOW(S). مفيش حاجة بتحط a أو c بعد S على طول.",
     "الـ {(, a, d} ده FIRST(S) = FIRST(U): الـ terminals اللي S ممكن تبدأ بيها. الـ FOLLOW(S) هو {$, ), b}."
    ],
    [
     "V وW الاتنين nullable، فلازم نضيف FOLLOW(S) كمان.",
     "صح. في S → UVW، الـ FIRST(VW) − ε = {a, c} بيدخل FOLLOW(U)؛ وبما إن VW ممكن تعمل derive لـ ε، بنزوّد FOLLOW(S) = {$, ), b} كمان (L6, Rules for FOLLOW).",
     "الـ {$, ), b} ده جزء الـ FOLLOW(S) بس. ناقصه FIRST(VW) − ε = {a, c}، الـ terminals اللي بتيجي بعد U على طول في S → UVW.",
     "الـ {a} واخد FIRST(V) بس. بما إن V بتبقى nullable بنزوّد c من FIRST(W)، وبما إن VW كلها nullable بنزوّد FOLLOW(S) = {$, ), b} كمان."
    ],
    [
     "الـ V → aV مكانها M[V, a] بس، عشان FIRST(aV) = {a}. على ) الـ parser لازم يخلّي V تختفي.",
     "صح. الـ V بتبقى nullable و) ∈ FOLLOW(V) = {c} ∪ FOLLOW(S) = {c, $, ), b}، فـ table rule 2 بتحط V → ε في M[V, )] (L6, Exam grammar).",
     "الخانة مليانة: ) ∈ FOLLOW(V) (جاية من FOLLOW(S) عشان W بتبقى nullable)، فـ V → ε بتتحط هناك.",
     "الـ W → ε دي production بتاعة W، فمكانها row W (تحت b، )، $). الـ row بتاع V فيه productions بتاعة V بس."
    ],
    [
     "الـ Expansion (إنك تبدّل الـ top بالـ right side بتاع M[A, a]) بيحصل بس لما الـ top of the stack يبقى non-terminal A.",
     "صح. لما الـ terminal اللي فوق يساوي الـ input symbol، الـ parser بيعمل match: بيعمل pop للـ stack ويقدّم الـ input، زي aBA'$ / abd$ → BA'$ / bd$ (L6, parsing abd).",
     "الـ Reduce ده بتاع الـ bottom-up shift-reduce (LR) parsing. الـ LL(1) parser بيعمل expand أو match أو accept أو بيطلّع error بس.",
     "الـ error بيطلع بس لو الـ terminal اللي فوق مختلف عن الـ input symbol، أو non-terminal قابل خانة فاضية في الـ table. هنا الاتنين متساويين."
    ],
    [
     "مفيش حاجة بتبني leftmost derivation بالعكس. الـ top-down parser بيبني الـ leftmost derivation لقدّام، من الـ start symbol للـ input.",
     "صح. الـ top-down parser بيبدأ من الـ start symbol ودايماً بيفك الـ non-terminal اللي على الشمال، فبيطلّع leftmost derivation؛ والـ LL معناها Leftmost derivation (L6, LL(1) grammars).",
     "الـ rightmost derivation بالعكس ده اللي بيطلّعه الـ bottom-up (shift-reduce, LR) parser، وهو بيعمل reduce للـ input لحد ما يرجع للـ start symbol.",
     "الـ top-down parser دايماً بيفك الـ non-terminal اللي على الشمال الأول، فالـ derivation بتاعه leftmost، مش rightmost."
    ],
    [
     "صح. الـ A → Abc | b على شكل A → Aα | β مع α = bc وβ = b، فبتبقى A → βA' = bA'، وA' → αA' | ε = bcA' | ε (L4-5, Removing left recursion).",
     "ده بيبدّل α وβ: الـ β = b (الاختيار اللي مش recursive) لازم يبدأ بيه A، والـ α = bc (اللي كانت بعد A) مكانها A'. هنا A هتبدأ بـ bc.",
     "الـ A → Abc' لسه بتبدأ بـ A، فالـ grammar لسه left-recursive. القاعدة هي A → βA', A' → αA' | ε.",
     "الـ A → Abc | b بتطلّع b، bbc، bbcbc، … (b وبعدها أي عدد من bc). الـ A → b | bc بتضيّع معظم الـ strings دي وبتغيّر الـ language."
    ],
    [
     "الـ Bottom-up بيبدأ من الـ input ويعمل reduce لحد الـ start symbol.",
     "صح. الـ Top-down (زي LL(1)) بيبدأ من الـ root S ويعمل expand ناحية الـ input.",
     "مش صح: الـ top-down parsing (اختيار b) هو بالظبط الطريقة اللي بتبني الـ tree من الـ start symbol لتحت لحد الـ input symbols.",
     "الـ Bottom-up parsing ماشي في الاتجاه التاني، من الـ input symbols لفوق لحد الـ start symbol، فالـ top-down بس هو اللي ينفع، مش الاتنين."
    ],
    [
     "الـ A' → dA' مكانها M[A', d] عشان FIRST(dA') = {d}. تحت $ الـ parser لازم يخلّي A' تختفي.",
     "صح. FOLLOW(A') = {$}، فالـ ε-production بتتحط تحت $. (الـ sheet كاتبها غلط \"A→ε\".)",
     "الـ A → aBA' دي production بتاعة A ومكانها M[A, a]. الـ row بتاع A' فيه productions بتاعة A' بس.",
     "الخانة مش فاضية: A' بتبقى nullable و$ ∈ FOLLOW(A') = {$}، فـ table rule 2 بتحط A' → ε في M[A', $]."
    ]
   ],
   "extra": [
    [
     "الـ {(, id} ده FIRST(F)، الـ terminals اللي F بتبدأ بيها. الـ FOLLOW(F) هو اللي ممكن ييجي بعد F: {+, *, ), $}.",
     "ده FOLLOW(T) وFOLLOW(T'). ناقصه الـ * اللي جاية من FIRST(T').",
     "الـ {*, ε} ده FIRST(T'). الـ FOLLOW sets عمرها ما بيبقى فيها ε؛ وعشان T' ممكن تختفي، بنزوّد بدالها FOLLOW(T') = {+, ), $}.",
     "صح. T' → *FT' بتدّي * (FIRST(T') − ε)؛ وT' هي nullable، فبنضيف FOLLOW(T') = {+, ), $}."
    ],
    [
     "مش فاضية: T' بتبقى nullable و+ ∈ FOLLOW(T') = {+, ), $}، فـ M[T', +] = T' → ε.",
     "صح. FIRST(TE') = {(, id}، وE معندهاش ε-production، فـ E ليها entries بس تحت ( وid.",
     "مش فاضية: E' بتبقى nullable و$ ∈ FOLLOW(E') = {), $}، فـ M[E', $] = E' → ε.",
     "مش فاضية: FIRST(id) = {id}، فـ table rule 1 بتحط F → id في M[F, id]."
    ],
    [
     "صح. M[E,id] وM[T,id] وM[F,id]؛ وبعدين match id، وT' → ε، وE' → ε، وaccept.",
     "ده ترتيب bottom-up. الـ LL(1) بيعمل expand من الـ start symbol (leftmost derivation).",
     "مينفعش نعمل match لـ id وفيه non-terminal (T) فوق الـ stack.",
     "الـ top بتاع الـ stack بعد E → TE' هو T، مش E'."
    ],
    [
     "V هي nullable، فلازم نضيف FIRST(W) كمان.",
     "V وW الاتنين nullable، فـ ε لازم تبقى في FIRST(VW).",
     "صح. FIRST(V) − ε = {a}؛ وV هي nullable فبنضيف FIRST(W) − ε = {c}؛ والاتنين nullable فبنضيف ε.",
     "الـ {c, $, ), b} ده FOLLOW(V)، الـ terminals اللي بتيجي بعد V. الـ FIRST(VW) بيسأل VW ممكن تبدأ بإيه: {a, c, ε}."
    ],
    [
     "الـ {c, ε} ده FIRST(W)، من W → cW | ε. الـ FOLLOW sets عمرها ما بيبقى فيها ε، والـ W آخر حاجة في S → UVW، فـ FOLLOW(W) = FOLLOW(S).",
     "ده FOLLOW(V). مفيش حاجة بتيجي بعد W جوه S → UVW، فمش بنضيف c.",
     "الـ {a, c, $, ), b} ده FOLLOW(U): الـ a والـ c جايين من VW اللي بعد U. مفيش حاجة بعد W في S → UVW، فـ FOLLOW(W) = {$, ), b}.",
     "صح. W هي آخر symbol في S → UVW، فـ FOLLOW(W) = FOLLOW(S)."
    ],
    [
     "الـ right side بيتعمله push بحيث أول symbol فيه يبقى فوق، مش بالعكس.",
     "صح. الـ right side aBA' بتاخد مكان A وبتتعمل push بحيث أول symbol فيها يبقى فوق، فيطلع aBA'$؛ والـ action اللي بعدها match a (L6, Example 1: parsing abd).",
     "الـ BA'$ ده الـ stack بعدها بخطوة، بعد ما a تتعمل match وpop. الـ expand لـ A بيعمل push لـ aBA' كلها الأول.",
     "الـ expand لـ A بيعمل push للـ right side كلها aBA'. لو شلت A' مش هيبقى فيه طريقة تعمل match للـ d اللي في الآخر (A' → dA')."
    ],
    [
     "الـ A' → bcA' مكانها M[A', b] بس، عشان FIRST(bcA') = {b}. على input d الـ parser لازم يخلّي A' تختفي عشان B تعمل match لـ d.",
     "B لسه مش فوق الـ stack؛ لازم A' تتشال الأول.",
     "صح. d ∈ FOLLOW(A') = FOLLOW(A) = FIRST(B) = {d}، فـ M[A', d] = A' → ε.",
     "M[A', d] مش فاضية عشان A' هي nullable وd موجودة في FOLLOW(A')."
    ],
    [
     "الـ grammar بتبقى left-recursive لما A تعمل derive لـ string بتبدأ بـ A. هنا الاختيارين بيبدأوا بالـ terminal a، مش بـ A.",
     "الـ aB بتطلّع ab بس والـ aC بتطلّع ac بس، فولا واحد فيهم بيطلّع ε. الـ conflict إن الاتنين بيبدأوا بـ a.",
     "الـ FOLLOW sets عمرها ما بيبقى فيها ε (terminals و$ بس). المشكلة إن FIRST(aB) وFIRST(aC) الاتنين فيهم a.",
     "صح. ده بيكسر أول شرط من شروط LL(1): α وβ مينفعش يبدأوا الاتنين بنفس الـ terminal."
    ],
    [
     "ε ممكن تبقى في FIRST(A)، لكن الـ FOLLOW بيجمع terminals بس (و$).",
     "صح. الـ FOLLOW عمره ما بيكون فيه ε. لما A تبقى nullable، الـ ε بتروح في FIRST(A)، والـ table entries بتتحط تحت FOLLOW(A)."
    ],
    [
     "صح. كل خانة في rows الـ S وU وV وW فيها production واحد على الأكتر.",
     "الجدول اللي اتبنى في المحاضرة مفيهوش conflicts، يبقى الـ grammar ده LL(1)."
    ]
   ]
  },
  "7": {
   "notes": [
    {
     "h": "الـ Semantic analysis",
     "pts": [
      "بيتأكد إن الـ declarations والـ statements بتاعة البرنامج <b>صح من ناحية المعنى (semantically correct)</b>.",
      "بيستخدم <b>الـ syntax tree والـ symbol table</b> عشان يشوف البرنامج ماشي مع تعريف اللغة ولا لأ. بيجمع <b>type information</b> ويخزنها في الـ syntax tree أو الـ symbol table. والـ compiler بيستخدم ده بعدين في <b>intermediate-code generation</b>.",
      "الـ Type checking بيتعمل أثناء الـ semantic analysis، يعني أثناء الـ <b>syntax-directed translation</b>. الـ Input: syntax tree. الـ Output: <b>annotated syntax tree</b> (parse tree بيبيّن قيم الـ attributes عند كل node)."
     ],
     "figH": {
      "cc-sem-pipeline": "الـ semantic analysis بياخد إيه وبيطلّع إيه"
     }
    },
    {
     "h": "الـ Semantic errors اللي الـ analyzer لازم يكتشفها",
     "pts": [
      "Type mismatch.",
      "Undeclared variable (متغير مش متعرّف).",
      "Reserved identifier misuse (استخدام كلمة محجوزة غلط).",
      "Multiple declaration لمتغير في نفس الـ scope.",
      "الوصول لمتغير out-of-scope.",
      "Actual and formal parameter mismatch."
     ]
    },
    {
     "h": "الـ Attribute grammar",
     "pts": [
      "نوع خاص من الـ CFG بنزوّد فيه معلومات إضافية (<b>attributes</b>) على واحد أو أكتر من الـ <b>non-terminals</b> بتوعه، عشان يدّي معلومات context-sensitive. كل attribute ليه domain واضح (integer, float, character, string, expressions).",
      "بيدّي <b>semantics</b> للـ CFG ويقدر يوصف الـ syntax والـ semantics مع بعض. ولو بصّينا عليه كـ parse tree، يقدر ينقل قيم بين الـ nodes.",
      "مثال: <code>E → E + T { E.value = E.value + T.value }</code>. هنا \"value\" دي attribute.",
      "يعني الـ attribute grammar بيطلع لما <b>نربط attributes بكل non-terminal في الـ CFG</b>. والـ semantic analysis بيستخدم الـ <b>attribute</b> grammar عشان يحوّل الـ <b>syntax</b> tree لـ <b>annotated syntax</b> tree."
     ],
     "figH": {
      "cc-attr-grammar": "إزاي production في الـ CFG بتبقى attribute grammar"
     }
    },
    {
     "h": "الـ Syntax Directed Translation (SDT)",
     "pts": [
      "الـ SDT = <b>augmented rules بنضيفها للـ grammar عشان تسهّل الـ semantic analysis</b>.",
      "المعلومات بتتنقل <b>bottom-up و/أو top-down</b> في الـ parse tree على شكل attributes متعلقة بالـ nodes. قواعد الـ SDT بتستخدم 1) الـ <b>lexical values</b> بتاعة الـ nodes، 2) <b>constants</b>، و3) الـ <b>attributes</b> بتاعة الـ non-terminals.",
      "الطريقة العامة: نبني parse/syntax tree ونحسب قيم الـ attributes عند الـ nodes بإننا نزورها بترتيب معيّن. وغالباً ده ممكن يتعمل أثناء الـ parsing من غير ما نبني tree صريحة.",
      "بشكل عام، الـ SDT بيربط 1) <b>مجموعة attributes بكل node</b> في الـ grammar و2) <b>مجموعة translation rules بكل production</b>، باستخدام attributes وconstants وlexical values. والنتيجة هي الـ annotated syntax tree."
     ],
     "figH": {
      "cc-sdt-augment": "الـ grammar بعد ما زوّدنا عليها قواعد الـ SDT من <bdi>PR#1</bdi> لـ <bdi>PR#5</bdi>",
      "cc-sdt-approach": "نبني الـ tree ونزور الـ nodes، أو نحسب أثناء الـ parsing"
     }
    },
    {
     "h": "مثال SDT: 2 + 3 * 4",
     "pts": [
      "الـ 2 و3 و4 اسمهم <b>lexical values</b>.",
      "بنحسب بـ <b>depth-first traversal واحد</b>. المعلومات بتمشي <b>bottom-up</b>: كل attributes الـ children بتتحسب قبل الـ parent.",
      "الـ nodes اللي على الـ right-hand side ساعات بنكتبها بـ subscript 1 (E → E1 + T) عشان نفرّق الـ child عن الـ parent."
     ],
     "figH": {
      "cc-sdt-eval": "حساب قيمة المثال على الـ parse tree قاعدة بقاعدة (أو جرّب expression بتاعك)"
     }
    },
    {
     "h": "الـ Synthesized مقابل الـ inherited attributes",
     "figH": {
      "cc-syn-inh": "الـ attribute بياخد قيمته منين في <bdi>S → ABC</bdi>"
     }
    },
    {
     "h": "الـ Definite assignment analysis (نوتس المحاضرة، شيت المراجعة)",
     "pts": [
      "ده data-flow analysis بيتأكد إن المتغير دايماً بياخد قيمة قبل ما يتستخدم. المتغير بيبقى في حالة من تلات حالات:",
      "<b>Definitely assigned</b>: متأكدين إنه أخد قيمة.",
      "<b>Definitely unassigned</b>: متأكدين إنه ماخدش قيمة.",
      "<b>Unknown</b>: ممكن يكون أخد قيمة وممكن لأ."
     ],
     "figH": {
      "cc-def-assign": "التلات حالات بتوع المتغير عند المكان اللي بيتستخدم فيه"
     }
    }
   ],
   "cards": [
    "الـ syntax tree والـ symbol table.",
    "الـ annotated syntax tree.",
    "Type mismatch، undeclared variable، reserved identifier misuse، multiple declaration في نفس الـ scope، out-of-scope access، actual/formal parameter mismatch.",
    "CFG متزوّد على الـ non-terminals بتوعه attributes عشان يدّي معلومات context-sensitive.",
    "بإننا نربط attributes بكل non-terminal في الـ CFG.",
    "Syntax Directed Translation.",
    "Augmented rules بنضيفها للـ grammar عشان تسهّل الـ semantic analysis.",
    "الـ lexical values بتاعة الـ nodes، والـ constants، والـ attributes بتاعة الـ non-terminals.",
    "قيم الـ tokens اللي عند الـ leaves، زي 2 و3 و4 في 2+3*4.",
    "بياخد قيمته من الـ child nodes بتاعته (بتطلع لفوق).",
    "بياخد قيمته من الـ parent و/أو الـ siblings (بتنزل لتحت).",
    "الـ Syntax directed translation (الـ semantic analysis).",
    "متأكدين بنسبة 100% إن المتغير أخد قيمة.",
    "المتغير ممكن يكون أخد قيمة وممكن لأ."
   ],
   "qa": [
    "الـ SDT بيضيف augmented rules للـ grammar عشان تسهّل الـ semantic analysis. بينقل المعلومات bottom-up و/أو top-down في الـ parse tree على شكل attributes متعلقة بالـ nodes. بيبني parse/syntax tree ويحسب قيم الـ attributes عند الـ nodes بإنه يزورها بترتيب معيّن، فيطلع الـ annotated syntax tree. وبشكل عام بيربط مجموعة attributes بكل node في الـ grammar ومجموعة translation rules بكل production، باستخدام attributes وconstants وlexical values.",
    "الـ Synthesized attributes بتاخد قيمها من قيم attributes الـ child nodes بتاعتها، وبتتنقل لفوق من الـ leaves للـ root (مثلاً E -> E + T، الـ E.val بييجي من الـ children بتوعه)؛ وعمرها ما بتاخد قيم من الـ parents أو الـ siblings. أما الـ Inherited attributes فبتاخد قيمها من الـ parent و/أو الـ siblings وبتتنقل لتحت (في S -> ABC، الـ A ممكن ياخد قيم من S وB وC). والـ symbol table بيبقى synthesized من الـ declaration وinherited للـ scope بتاع الـ declaration.",
    "Bottom-up، depth-first: F=2، T=2، E=2؛ F=3، T=3؛ F=4؛ T = 3*4 = 12؛ E = 2 + 12 = 14. الـ root بياخد E.val = 14.",
    "Type mismatch؛ undeclared variable؛ reserved identifier misuse؛ multiple declaration لمتغير في نفس الـ scope؛ الوصول لمتغير out-of-scope؛ actual and formal parameter mismatch."
   ],
   "quiz": [
    [
     "«Static» مش من أنواع الـ attributes في المحاضرة. الـ attributes بتتقسم لنوعين بس: synthesized (من الـ children) وinherited (من الـ parent أو الـ siblings).",
     "«Dynamic» مش نوع attribute في المحاضرة. النوعين هما synthesized وinherited attributes.",
     "صح. الـ synthesized attributes بتاخد قيمها من الـ attribute values بتاعة الـ child nodes، زي في E → E + T الـ E اللي فوق بتاخد قيمتها من الـ children بتوعها (L7, Synthesized vs inherited attributes).",
     "الـ Inherited attributes بتيجي من الـ parent/siblings."
    ],
    [
     "إنها تاخد القيم من الـ child nodes ده تعريف الـ synthesized attributes. الـ inherited بتاخد من الـ parent و/أو الـ siblings.",
     "الـ leaf nodes فيها lexical values (زي 2، 3، 4) اللي الـ synthesized attributes بتتبني منها؛ أما الـ inherited attributes فبتيجي من الـ parent و/أو الـ siblings.",
     "صح (ده الـ official key؛ والمحاضرة بتزوّد \"و/أو الـ siblings\").",
     "«Semantic nodes» مش مصطلح مستخدم في المحاضرة. الـ inherited attributes بتاخد قيمها من الـ parent و/أو الـ sibling nodes."
    ],
    [
     "الـ annotated tree بيطلع لما <b>نحسب (EVALUATE)</b> الـ attribute grammar على syntax tree.",
     "إضافة الـ attributes بتدّي الـ CFG معنى (semantics)؛ مش بتغيّر الـ productions ولا عدد الـ parse trees للـ sentence، فمش بتخليها unambiguous.",
     "الـ attributes مش بتخلّي الـ grammar ambiguous؛ الـ ambiguity بتعتمد على الـ productions بس. إضافة الـ attributes بتدّيك attribute grammar.",
     "صح. شيت الـ official سؤال Q53: \"Attribute grammar is generated by attaching attributes to each nonterminal of the CFG\"."
    ],
    [
     "فخ مشهور: الـ S معناها Syntax، مش Semantic. الـ translation بيوجّهها الـ syntax بتاع الـ grammar (rules متعلقة على الـ productions).",
     "صح. الـ SDT = Syntax Directed Translation: augmented rules بتتضاف للـ grammar وبتسهّل الـ semantic analysis (L7, Syntax Directed Translation).",
     "مفيش حاجة اسمها «Syntax Double Translation». الـ SDT معناها Syntax Directed Translation: translation rules متعلقة على الـ productions بتاعة الـ grammar.",
     "الـ SDT مش table. معناها Syntax Directed Translation، مجموعة translation rules متعلقة على الـ productions بتاعة الـ grammar."
    ],
    [
     "الـ CFG العادي ده اللي الـ parser بيستخدمه. الـ semantic analysis بيستخدم الـ attribute grammar (CFG ومعاه attributes) عشان يعمل annotate للـ syntax tree.",
     "ده عاكس الاتجاه: الـ input بتاع الـ semantic analysis هو الـ syntax tree والـ output هو الـ annotated syntax tree، مش syntax tree.",
     "صح. الـ semantic analysis بيستخدم الـ attribute grammar عشان يحوّل الـ syntax tree (اللي جاية من الـ parser) لـ annotated syntax tree (L7, Attribute grammar).",
     "الـ grammar هنا هي الـ attribute grammar، والـ output هو الـ annotated syntax tree. الكورس مفيهوش حاجة اسمها «semantic tree»."
    ],
    [
     "الـ code optimization بيشتغل على الـ intermediate code بعد الـ semantic analysis؛ ساعتها لازم تكون الـ type errors اتمسكت خلاص.",
     "صح. الـ type checking جزء من الـ semantic analysis، واللي بيتعمل عن طريق الـ syntax directed translation على الـ syntax tree (الـ official key؛ L7, Semantic analysis).",
     "الـ lexer بيجمّع الـ characters في tokens بس؛ معندوش أي type information. الـ types بتتجمع في الـ semantic analysis.",
     "الـ syntax analysis بيـ check الـ structure على الـ CFG وبيبني الـ syntax tree بس. الـ types بتتـ check بعد كده، في الـ semantic analysis."
    ],
    [
     "صح. الـ annotated parse (syntax) tree بتوضح قيم الـ attributes عند كل node؛ وهي الـ output بتاع الـ semantic analysis (L7, Semantic analysis).",
     "الـ syntax tree هي الـ output بتاع الـ parser قبل ما الـ attributes تتحسب؛ بتوضح الـ structure بس من غير قيم attributes.",
     "«Semantic tree» مش مصطلح في الكورس. الـ tree اللي بتوضح قيم الـ attributes عند كل node هي الـ annotated parse tree.",
     "مش صح: اختيار (a)، الـ annotated parse tree، هي بالظبط الـ tree اللي بتوضح قيم الـ attributes عند كل node."
    ],
    [
     "ده (2+3)*4. الـ grammar بيدّي الـ * precedence أعلى (أعمق في الـ tree).",
     "صح. T.val = 3*4 = 12، وبعدين E.val = 2 + 12.",
     "الـ 24 دي 2*3*4، يعني ضربت كل الـ lexical values. الـ + اللي في 2+3*4 عمرها ما بتتحول لضرب.",
     "الـ 9 دي 2+3+4، يعني اعتبرت الـ * كأنها +. الـ PR#3 بتحسب T.val = 3 * 4 = 12 الأول وبعدين E تزوّد 2."
    ],
    [
     "هما مصدر الـ synthesis، بس المحاضرة بتسميهم اسم تاني.",
     "صح. المحاضرة بتسمي القيم اللي في الـ leaves (2، 3، 4) lexical values؛ والـ PR#5 بتطلّعها لفوق بـ F.val = INT.lexval (L7, SDT example).",
     "الـ Constants نوع قيم تاني منفصل بيتكتب جوه الـ SDT rules. قيم الـ tokens 2، 3، 4 اللي في الـ leaves اسمها lexical values.",
     "الـ inherited attributes بتاخد قيمها من الـ parent و/أو الـ siblings بتوع الـ node. قيم الـ leaves 2، 3، 4 جاية من الـ tokens: lexical values."
    ],
    [
     "الـ Definitely unassigned معناها إننا متأكدين إن الـ variable <b>ماخدش</b> قيمة؛ هنا ممكن ياخد وممكن لأ.",
     "صح. الـ definite assignment analysis فيها تلت states؛ والـ variable اللي ممكن ياخد قيمة وممكن لأ حالته «unknown» (L7, Definite assignment analysis).",
     "الـ Definitely assigned معناها إننا متأكدين إن الـ variable أخد قيمة؛ هنا ممكن ياخد وممكن لأ.",
     "مش صح: اختيار (b)، «unknown»، هو الـ state بتاع الـ variable اللي ممكن ياخد قيمة وممكن لأ."
    ],
    [
     "صح. الـ SDT بيحسب القواعد المربوطة بـ productions الـ CFG على الـ tree، فيطلع الـ annotated syntax tree.",
     "شيت المراجعة بيقول إن الـ attribute grammar/SDT على الـ syntax tree بيطلّع الـ annotated syntax tree.",
     "الـ SDT بيطلّع الـ annotated syntax tree أياً كان نوع الـ attribute؛ ممكن ينقل المعلومة bottom-up (synthesized) و/أو top-down (inherited).",
     "المحاضرة بتقول إن الـ SDT بينقل المعلومة bottom-up و/أو top-down، فالجملة مش مقصورة على الـ bottom-up."
    ],
    [
     "صح. دي واحدة من الـ three definite-assignment states.",
     "«Definitely known» مش state. التلت states هما definitely assigned وdefinitely unassigned وunknown.",
     "مش واحدة من الـ states؛ الحالة اللي مش متأكدين فيها اسمها \"unknown\".",
     "مش صح: اختيار (a)، «definitely assigned»، هو الـ state بتاع الـ variable اللي متأكدين إنه أخد قيمة."
    ],
    [
     "الـ left-most parse tree مش نوع attribute؛ الـ attributes اللي بتاخد قيمها من الـ children اسمها synthesized attributes، وده مش موجود في الاختيارات.",
     "الـ left-most derivation طريقة لعمل derive للـ string، مش نوع attribute. الإجابة الصح، synthesized attributes، مش موجودة.",
     "الـ right-most derivation ترتيب derivation، مش نوع attribute. الإجابة الصح، synthesized attributes، مش موجودة.",
     "صح. الإجابة هي \"synthesized attributes\"، ومش موجودة في الاختيارات (الاختيارات اتطبعت غلط)."
    ],
    [
     "دي لغة الـ input بتاعة الـ compiler، مش model.",
     "الـ low-level (target) code ده اللي الـ compiler بيطلّعه في الآخر؛ مش هو الـ model اللي الـ semantic analysis مبني عليه.",
     "الـ CFG العادي بيعمل model للـ syntax analysis (الـ parser). الـ semantic analysis مبني على الـ attribute grammar، يعني CFG متضاف عليه attributes.",
     "صح. الـ semantic analysis بيستخدم attribute grammar عشان يطلّع الـ annotated tree."
    ],
    [
     "الجملة غلط: إن الـ node تاخد قيمتها من الـ children ده وصف الـ synthesized attributes. الـ inherited بتيجي من الـ parent و/أو الـ siblings.",
     "صح. الـ inherited attributes بتيجي من الـ parent و/أو الـ siblings."
    ],
    [
     "صح. لما نـ evaluate الـ attribute rules على الـ syntax tree بتطلع الـ annotated tree.",
     "الجملة صح: الـ semantic analysis بيستخدم الـ attribute grammar على الـ syntax tree عشان يطلّع الـ annotated syntax tree."
    ]
   ],
   "extra": [
    [
     "ده 3*(2+4). الـ grammar بيحط الـ * أعمق في الـ tree، فبتتحسب الأول.",
     "صح. T.val = 3*2 = 6، وبعدين E.val = 6 + 4 = 10.",
     "الـ 9 دي 3+2+4، يعني اعتبرت الـ * كأنها +. الـ PR#3 بتحسب الأول T.val = 3 * 2 = 6، وبعدين E تزوّد 4.",
     "الـ 24 دي 3*2*4، يعني اعتبرت الـ + كأنها *. اللي بيتضرب 3*2 بس؛ وبعدين E.val = 6 + 4."
    ],
    [
     "ده ((5+2)*3)+1، يعني حساب عادي من الشمال لليمين متجاهل الـ precedence.",
     "الـ 28 دي (5+2)*(3+1) = 7 * 4، يعني جمعت الجمعتين الأول. الـ grammar بتحط الـ * أعمق في الـ tree، فالـ 2*3 بتتحسب الأول.",
     "ده الـ E.val بتاع الـ E اللي جوه (5+2*3) قبل الـ +1 الأخيرة.",
     "صح. الـ T بتاع 2*3 = 6؛ الـ E اللي جوه = 5 + 6 = 11؛ الـ root E = 11 + 1 = 12."
    ],
    [
     "صح. a متعرّفة مرتين في نفس الـ block.",
     "الـ undeclared variable ده variable بيتستخدم من غير أي declaration. هنا a متعرّفة، بس مرتين في نفس الـ block.",
     "الاتنين declarations بنفس الـ type ومفيش قيمة اتحطت.",
     "الـ out-of-scope access معناه إنك تستخدم variable برّه الـ block اللي متعرّف فيه. الاتنين declarations بتوع a في نفس الـ block."
    ],
    [
     "الـ reserved identifier misuse معناه إنك تستخدم keyword (زي int أو if) كاسم. الـ f وp وq identifiers عادية.",
     "الـ multiple declaration معناه إنك تعرّف نفس الاسم مرتين في نفس الـ scope. هنا f وp وq كل واحد متعرّف مرة واحدة.",
     "صح. actual parameter واحد قصاد اتنين formal parameters.",
     "الـ undeclared variable بيتستخدم من غير declaration. الـ f متعرّفة؛ المشكلة إن اتبعت argument واحد لـ two parameters."
    ],
    [
     "الـ Type mismatch موجودة في ليستة الـ semantic errors في المحاضرة، يعني الـ semantic analyzer المفروض يتعرف عليها.",
     "صح. الأقواس اللي مش متقفلة دي <b>SYNTAX</b> error، والـ parser هو اللي بيمسكها باستخدام الـ CFG.",
     "الـ Undeclared variable موجودة في ليستة الست semantic errors في المحاضرة، يعني الـ semantic analyzer المفروض يتعرف عليها.",
     "الـ Accessing an out-of-scope variable موجودة في ليستة الـ semantic errors في المحاضرة، فالـ semantic analyzer المفروض يتعرف عليها."
    ],
    [
     "إنه ياخد القيم من الـ children بتوعه بس ده وصف الـ synthesized attribute. الـ inherited attribute بتاع B بيستخدم الـ parent والـ siblings.",
     "الـ inherited attributes مش مقصورة على الـ sibling اللي على الشمال: المحاضرة بتقول إن B يقدر ياخد قيم من S وA وC.",
     "الـ lexical values موجودة عند الـ leaves؛ والـ inherited attributes بتيجي من الـ parent والـ siblings.",
     "صح. الـ Inherited attributes بتيجي من الـ parent (S) و/أو الـ siblings (A, C)."
    ],
    [
     "صح. ده مثال المحاضرة على النوعين وهما شغالين مع بعض.",
     "ده عاكس كلام المحاضرة: الـ symbol table بتبقى synthesized من الـ declaration وبعدين inherited للـ scope بتاع الـ declaration ده.",
     "هو كمان inherited للـ scope بتاع الـ declaration.",
     "الـ lexical values هي قيم tokens زي 2 و3 و4."
    ],
    [
     "الـ phase دي جت قبل كده ومعندهاش type information.",
     "الـ Parsing بييجي قبل الـ semantic analysis وبيبني الـ syntax tree بس، فمينفعش يستخدم type information لسه هتتجمع بعده.",
     "صح. المحاضرة بتقول إن الـ type information بتتخزن في الـ syntax tree أو الـ symbol table عشان كده.",
     "الـ comments بيشيلها الـ scanner في الأول، قبل ما يبقى فيه أي type information بكتير. الـ types بتتستخدم في الـ intermediate-code generation."
    ],
    [
     "الـ attributes بتتربط بالـ <b>NON-terminals</b> (زي E.value). الـ terminals بتدّي lexical values.",
     "صح. الـ attribute grammar بيزوّد attributes على واحد أو أكتر من الـ non-terminals بتوع الـ CFG."
    ],
    [
     "صح. القيم synthesized، فالمعلومات بتمشي bottom-up: F وT وE للـ 2؛ وبعدين 3 و4؛ T = 12؛ E = 14.",
     "المحاضرة بتقول إن depth-first traversal واحد bottom-up كفاية هنا."
    ]
   ]
  },
  "8": {
   "notes": [
    {
     "h": "ربط الـ objects (الـ scoping)",
     "pts": [
      "الـ binding بيربط الـ <b>declaration</b> بالـ <b>uses</b> بتوعه. والـ <b>scope</b> بتاع الـ identifier هو الجزء من البرنامج اللي تقدر توصله فيه.",
      "نفس الـ identifier ممكن يشاور على حاجات مختلفة في أجزاء مختلفة من البرنامج. الـ scopes المختلفة لنفس الاسم مش بتتداخل. والـ identifier ممكن يكون الـ scope بتاعه محدود."
     ],
     "figH": {
      "cc-binding-scope": "كل x مربوط بأنهي declaration، والـ scope بتاع كل x فين"
     }
    },
    {
     "h": "الـ static binding مقابل الـ dynamic binding",
     "figH": {
      "cc-static-dynamic": "الـ static مقابل الـ dynamic binding على آخر سطر في مثال المحاضرة"
     }
    },
    {
     "h": "مثال على الـ scoping (من المحاضرة)",
     "pts": [
      "الـ x اللي جوه الـ block الداخلي بيخبّي الـ x اللي برّه لحد قوس القفل بتاع الـ block الداخلي.",
      "اتفاقية الكورس لـ \"dynamic\" في التمارين دي: آخر declaration اتنفّذ (الـ x الداخلي) بيفضل مستخدم حتى بعد الـ block. فالـ y النهائي = <b>6 (static)</b> أو <b>8 (dynamic)</b>.",
      "نسخة الـ revision sheet (int x = 3 جوه، و cout بعد كل +=): الـ output في الـ static <b>5, 6</b>؛ وفي الـ dynamic <b>5, 8</b>."
     ],
     "figH": {
      "cc-scope-run": "شغّل برامج الكورس سطر سطر بالـ static والـ dynamic binding"
     }
    },
    {
     "h": "الـ Symbol tables",
     "pts": [
      "data structure جوه الـ compiler/interpreter كل identifier فيها مربوط بمعلومات عن الـ declaration أو الظهور بتاعه: <b>type، scope level</b> وأحيانًا <b>location</b>."
     ],
     "figH": {
      "cc-symtab-ops": "عمليات الـ symbol table الـ high level والـ low level وإحنا ماشيين في مثال المحاضرة"
     }
    },
    {
     "h": "طرق التنفيذ والـ approaches",
     "pts": [
      "التنفيذ: <b>unordered list</b>، <b>ordered list</b>، <b>binary search trees</b>، <b>hash tables</b> (الأشهر).",
      "الـ approaches: <b>symbol table لكل scope</b>، أو <b>symbol table واحدة لكل الـ scopes</b>. يعني فيه أكتر من approach."
     ],
     "figH": {
      "cc-symtab-impl": "الـ look_up في unordered list و ordered list و binary search tree و hash table"
     }
    },
    {
     "h": "symbol table لكل scope (شرح السلايدز خطوة بخطوة)",
     "pts": [
      "ندخل block 1 → نعمل <b>ST1</b> (الأعمدة: Symb, Token, Dtype, Init?).",
      "الـ type declaration → نضيف a, b, c (id, int, Init = No). وكل assignment: \"موجود في الـ ST الحالية؟ Yes\" → نعلّم إنه initiated.",
      "ندخل block 2 → نعمل <b>ST2</b> ونضيف c, d. في <code>c = a + 1</code>: الـ c لقيناه في ST2 → نعلّمه initiated؛ الـ a مش في ST2، فبندوّر في الـ parent اللي هي ST1: لقيناه وهو initiated.",
      "الـ <code>print d</code> الأخير برّه block 2، فالـ d مش visible (ده access لمتغير out-of-scope)."
     ],
     "figH": {
      "cc-st-per-scope": "الـ symbol table لكل scope: الـ ST1 والـ ST2 والـ ST3 بيتملوا event ورا event"
     }
    },
    {
     "h": "مشكلة table لكل scope والحلول",
     "pts": [
      "<b>المشكلة</b>: كل hash table ليها <b>memory overhead</b>، فإنك تعمل table لكل scope ده مش كويس للميموري. وكمان ممكن نحتاج <b>ندوّر في كذا table</b>، وده أبطأ.",
      "<b>الحل</b>: <b>hash table واحدة لكل الـ scopes</b>: memory overhead أقل وبحث واحد بس.",
      "<b>Solution 1</b>: ندّي كل scope رقم unique (الـ global scope_id = 0، ونزوّد واحد مع كل scope جديد). الـ Key = <code>\"identifier,scope_id\"</code>. عشان ندوّر، بنلزّق الـ scope_id الحالي في الـ identifier. وده <b>ممكن لسه يحتاج كذا بحث</b>.",
      "<b>Solution 2</b>: الـ key = الـ identifier؛ والـ value = <b>linked list</b> من pointers لـ records، record لكل usage (declaration) للـ identifier. في الـ single-pass compiler كل insertion جديد بيتحط في <b>أول</b> الـ list، وفيه structure منفصلة بتتابع الـ identifiers المعرّفة في الـ scope الحالي (عشان نمسحهم لما نخرج من الـ scope).",
      "مع solution 2، كل الـ entries بتبقى في scopes مفتوحة، و<b>أول item دايمًا هو الصح</b> للـ scope الحالي. ومش بياخد وقت."
     ],
     "figH": {
      "cc-st-one-vs-all": "الـ table لكل scope بتكلّف memory وبحث زيادة، والـ table الواحدة لكل الـ scopes لأ",
      "cc-st-sol1": "الحل الأول: كل key بالشكل <bdi>\"identifier,scope_id\"</bdi>، وعدد مرات البحث",
      "cc-st-sol2": "الحل التاني: linked list لكل identifier وأحدث declaration في الأول"
     }
    }
   ],
   "cards": [
    "الجزء من البرنامج اللي الـ identifier يقدر يتوصل له فيه.",
    "scoping مبني على structure الـ syntax tree (الأقواس)؛ بيعتمد على نص البرنامج بس.",
    "آخر declaration قابلناه وقت الـ execution هو اللي بيحدد الاستخدام الحالي.",
    "أغلب اللغات، زي Java و C.",
    "Lisp و SNOBOL و Perl (من خلال keywords معينة).",
    "لأ.",
    "معلومات كل identifier: الـ type، الـ scope level، وأحيانًا الـ location.",
    "Unordered list، ordered list، binary search tree، hash table (الأشهر).",
    "الـ memory overhead (وكمان كذا بحث).",
    "\"identifier,scope_id\" (ولسه ممكن يحتاج كذا بحث).",
    "الـ Key = الـ identifier؛ والـ value = linked list من الـ records، والأحدث في الأول.",
    "local_lookup(x) للـ scope المحلي؛ و look_up(x) عن طريق قواعد الـ scoping.",
    "Static 6، و dynamic 8."
   ],
   "qa": [
    "الـ Static binding: الـ scoping ماشي ورا structure الـ syntax tree (الأقواس)؛ بيعتمد على نص البرنامج بس وبيتحل في الـ compile time (Java, C). الـ Dynamic binding: آخر declaration اتقابل وقت الـ execution هو اللي بيحدد الاستخدام؛ بيعتمد على التنفيذ، وبيطلع لفوق في الـ stack بتاع الـ symbol tables، وماينفعش يتحل في الـ compile time (Lisp, SNOBOL, Perl).",
    "كل hash table ليها memory overhead وممكن نحتاج ندوّر في كذا table (بطيء). الحل إننا نستخدم table واحدة لكل الـ scopes: Solution 1 بتخزّن الـ entries بـ key \"identifier,scope_id\" (ولسه ممكن تحتاج كذا بحث)؛ و Solution 2 بتربط كل identifier بـ linked list فيها الـ declarations بتاعته والأحدث في الأول، فأول item دايمًا هو بتاع الـ scope الحالي.",
    "جوه الـ block: b = 20*30 = 600، وبيطبع 600 في الحالتين. بعد الـ block: الـ static بيستخدم الـ a اللي برّه = 10، فـ b = 610 وبيطبع 610. الـ Dynamic (حسب اتفاقية الكورس) بيستخدم آخر a = 30، فـ b = 630 وبيطبع 630.",
    "High level: enter scope، process a declaration، process a use، exit scope. Low level: enter_scope()، insert_symbol(x)، local_lookup(x)، look_up(x)، exit_scope()."
   ],
   "quiz": [
    [
     "الـ redundant code ده حاجة الـ optimization بيشيلها، مش تكلفة من تكاليف الـ symbol tables. المشكلة اللي في السلايد لما تعمل table لكل scope هي الـ memory overhead (وكمان إنك بتدوّر في كذا table).",
     "الـ peephole optimization دي technique من techniques الـ code optimization في L9، مش مشكلة في الـ symbol tables. الـ table لكل scope تكلفتها memory overhead.",
     "الـ ambiguity مشكلة في الـ grammar (string واحد ليه اتنين parse trees، L4)، مش مشكلة في الـ symbol table. الـ table لكل scope بتضيّع memory على كل hash table.",
     "صح. كل hash table بتكلّف ميموري، وممكن نحتاج ندوّر في كذا table."
    ],
    [
     "صح. الـ static binding هو الـ scoping المبني على structure الـ syntax tree (الـ blocks والـ braces)؛ بيعتمد على نص البرنامج بس (L8, Static vs dynamic binding).",
     "الـ dynamic binding ماشي ورا ترتيب التنفيذ، مش الـ structure.",
     "الـ static binding بس هو اللي ماشي على structure الشجرة. الـ dynamic binding بيستخدم آخر declaration قابلناه وقت التنفيذ، فمش كل أنواع الـ binding ينطبق عليها الكلام ده.",
     "الـ static binding بينطبق على الوصف بالظبط: scoping مبني على structure الـ syntax tree، يعني الـ braces."
    ],
    [
     "إنك تمشي على structure الـ parse tree (الـ braces) ده تعريف الـ STATIC binding. الـ dynamic binding بيعتمد على ترتيب التنفيذ.",
     "صح. الـ dynamic binding بيستخدم آخر declaration اتقابل وقت الـ run time.",
     "الـ C لغة statically scoped (السلايدز بتذكر C و Java)، وكمان الجملة نفسها لاخبطة التعريفات: قاعدة الـ braces دي الـ static binding.",
     "الـ Lisp فعلًا dynamically scoped، بس الـ binding فيها بيعتمد على ترتيب التنفيذ مش على الـ braces، فالجملة غلط حتى بالنسبة لـ Lisp."
    ],
    [
     "الـ semantic stack بيشيل قيم الـ attributes أثناء الـ syntax-directed translation؛ مش بيحتفظ بسجل لـ attributes كل identifier.",
     "صح. الـ symbol table بيربط كل identifier بمعلومات عن الـ declaration بتاعه: الـ type والـ scope level وأحيانًا الـ location (L8, Symbol tables).",
     "الـ LL(1) parsing table (L6) بتقول للـ parser يطبّق أنهي production؛ مش بتخزّن أي حاجة عن الـ variables.",
     "الـ (abstract) syntax tree بيمثّل structure البرنامج؛ لكن الـ types والـ scopes بتاعة الـ identifiers بتتحفظ في الـ symbol table."
    ],
    [
     "الـ unordered list واحدة من الـ mechanisms اللي اتذكرت، بس الـ search فيها linear وبطيء؛ السلايدز بتقول إن الـ hash table هو الأشهر.",
     "الـ ordered list ينفع تبقى mechanism (تقدر تعمل فيها binary search بس الـ insert فيها مكلّف)؛ السلايدز بتقول إن الـ hash table هو الأشهر.",
     "الـ binary search tree من الـ mechanisms اللي اتذكرت، بس السلايدز بتقول إن الـ hash table هو أشهر طريقة لتنفيذ الـ symbol tables.",
     "صح. السلايدز بتقول إنها الطريقة الأشهر."
    ],
    [
     "إنك تستخدم الـ identifier لوحده كـ key ده Solution 2، اللي الـ value فيه linked list من الـ records. Solution 1 بيضيف رقم الـ scope على الـ key.",
     "صح. كل scope بياخد scope_id مميز (0 للـ global، وبيزيد مع كل scope جديد)، والـ identifier بيتدخل بالـ key \"identifier,scope_id\" (L8, Solution 1).",
     "الـ scope_id لوحده هيحط كل الأسامي اللي في الـ scope تحت key واحد. Solution 1 بيجمع الاتنين: \"identifier,scope_id\".",
     "الـ data type بيتخزّن كمعلومة جوه الـ entry، مش بيُستخدم كـ key. الـ key في Solution 1 هو \"identifier,scope_id\"."
    ],
    [
     "أول item دايمًا هو الصح، فالـ lookup سريع.",
     "صح (حسب الـ official key). في Solution 2 الـ declarations الجديدة بتتحط في أول الـ list، فأول item دايمًا هو الصح للـ scope الحالي: مفيش search طويل (L8, Solutions).",
     "السلايدز بتوصف Solution 2 لـ single-pass compiler ومش بتربط الكلام ده بالـ multi-pass compilers؛ والـ lookup سريع لأن أول item هو الصح.",
     "تقدر تحدد: السلايدز بتقول إن أول item في الـ list دايمًا هو المناسب، فالـ structure مش time consuming (الـ key: False)."
    ],
    [
     "الـ 5 دي قيمة y بعد الـ block الداخلي بس (2 + 3). الجملة اللي بعد الـ block بتزوّد الـ x الخارجي = 1 تاني، فتطلع 6.",
     "صح. 2+3 = 5، وبعدين الـ x اللي برّه = 1 فتبقى 6.",
     "الـ 8 دي إجابة الـ dynamic binding، اللي فيها الـ x الداخلي = 3 لسه مستخدم بعد الـ block. في الـ static binding الـ x الخارجي = 1 بيرجع.",
     "الـ 4 جاية من إنك تجاهلت الـ x الداخلي وزوّدت الـ x الخارجي = 1 مرتين (2 + 1 + 1). جوه الـ block الـ x الداخلي = 3 بيخبّي الخارجي."
    ],
    [
     "الـ 6 دي إجابة الـ static: الـ x الخارجي = 1 بيرجع بعد الـ block. لكن في convention الكورس للـ dynamic، آخر x = 3 لسه هو المستخدم.",
     "الـ 5 دي قيمة y بعد الـ block الداخلي بس (2 + 3)؛ ناسية الـ y += x التانية اللي بتتنفذ بعد الـ block.",
     "صح. آخر x اتقابل (3) بيتستخدم تاني: 5 + 3.",
     "الـ 7 مش ماشية مع أي قاعدة: الـ static بيدي 5 + 1 = 6 والـ dynamic (convention الكورس) بيدي 5 + 3 = 8."
    ],
    [
     "السلايدز بتذكر approachين (table لكل scope، و table واحد لكل الـ scopes) وأربع mechanisms (lists و BSTs و hash tables).",
     "صح. table لكل scope أو table واحدة لكل الـ scopes، باستخدام lists أو BSTs أو hash tables.",
     "الـ approaches دي مش مربوطة بلغة معينة؛ أي compiler، والـ C منهم، يقدر يستخدم table لكل scope أو table واحد لكل الـ scopes.",
     "الـ static binding مش بيحدد الاختيار: الأمثلة اللي في المحاضرة على الـ symbol table كلها statically scoped ومع ذلك بتوضح أكتر من approach."
    ],
    [
     "الـ memory overhead دي مشكلة table لكل SCOPE؛ الـ single table هي الحل.",
     "صح. الـ memory overhead دي مشكلة الـ hash table لكل SCOPE؛ لكن الـ hash table الواحد لكل الـ scopes هو الحل اللي في السلايدز، بـ overhead أقل و search واحد (L8, Problems of one table per scope).",
     "مشكلة الـ memory تبع إنك تعمل table لكل scope، أيًا كان الـ binding؛ والـ table الواحد بيقلّل الـ overhead في الحالتين.",
     "السلايدز حسمتها: الـ hash table الواحد هو الحل اللي بيعمل memory overhead أقل، فالجملة False."
    ],
    [
     "الـ storage allocation استخدام فعلًا (الـ table بيسجّل الأسامي موجودة فين)، بس الـ type checking ومنع تكرار رسايل الـ error استخدامات برضه، فاختار \"All\".",
     "الـ type checking غرض متذكر (L9: التأكد من الـ assignments والـ expressions)، بس الاختيارين التانيين استخدامات برضه، فالإجابة \"All\".",
     "إنك تسجّل اسم undeclared اتعمله report بيمنع نفس الـ error يتكرر، بس الـ storage allocation والـ type checking استخدامات كمان، فالإجابة \"All\".",
     "صح (حسب الـ official key). الـ symbol table بتدعم التلاتة."
    ],
    [
     "صح. جوّه: 20+3 = 23. بعد الـ block: الـ static بيستخدم الـ i اللي برا = 10 (33)؛ والـ dynamic (حسب convention الكورس) لسه بيستخدم i = 3 (26).",
     "معكوسة: الـ static هو اللي بيرجع للـ i اللي برا.",
     "الـ 30 و 40 جايين من إنك زوّدت الـ i الخارجي = 10 جوه الـ block كمان. لكن الـ int i = 3 الداخلي بيخبّيه هناك، فالـ bindingين الاتنين بيطبعوا 23 الأول.",
     "حسب الـ dynamic convention بتاعة الكورس، آخر i = 3 لسه هي اللي بتتستخدم."
    ],
    [
     "الـ declaration الأحدث بتتحط في <b>الأول</b>، فـ scope 1 بييجي الأول.",
     "صح. الـ i الداخلية (scope 1) قدّام الـ i اللي برا (scope 0).",
     "الـ i اللي برا لسه في scope مفتوح وبتفضل في الـ list.",
     "ده فيه الـ i الخارجي بس (scope 0) وناسي الـ declaration الداخلي بتاع scope 1، اللي لازم يتحط في أول الـ list."
    ],
    [
     "الـ x = 1، y = 9 دي نتيجة الـ static: بعد الـ block الـ x الخارجي = 1 بيرجع، فـ y = 8 + 1. لكن convention الكورس للـ dynamic بيفضّل x = 6.",
     "صح. آخر x = 6 لسه هي اللي بتتستخدم: y = 8 + 6 = 14.",
     "ده الـ print الداخلي؛ الـ y بتتغيّر تاني بعد الـ block.",
     "الـ y = 3 دي 2 + 1، يعني متجاهلة الـ y += x اللي جوه الـ block (y بقت 8). وبعدها الـ x الداخلي = 6 لسه مستخدم: y = 14."
    ]
   ],
   "extra": [
    [
     "معكوسين. الـ static بيستخدم الـ p اللي برّه بعد الـ block؛ والـ dynamic بيستخدم آخر p.",
     "الـ dynamic binding بيفضل يستخدم آخر declaration اتنفّذ اللي هو p = 5.",
     "صح. جوه الـ block: q = 1×5 = 5. الـ Static: q = 5 + 4 = 9 (الـ p اللي برّه). الـ Dynamic: q = 5 + 5 = 10.",
     "الـ 5 دي قيمة q قبل آخر statement؛ والـ static binding لسه هيزوّد الـ p اللي برّه = 4."
    ],
    [
     "Block 2 بيعرّف c و d بس، فالـ a مش موجودة في ST2؛ الـ lookup بيكمّل على الـ parent table اللي هو ST1.",
     "صح. الـ a مش في ST2، فبندوّر في الـ parent table اللي هي ST1.",
     "Block 3 لسه ما دخلناهوش، ومش parent لـ Block 2 أصلًا.",
     "البحث بيكمّل في الـ table بتاعة الـ scope اللي حواليه وبيلاقيه."
    ],
    [
     "الـ c بتاع Block 1 متخبّي: Block 3 بيعرّف int c بتاعه، والـ table الحالي ST3 بيتدوّر فيه الأول.",
     "Block 2 اتقفل، ومش scope حوالين Block 3.",
     "الـ c متعرّف في Block 3 نفسه (string a; int c;)، فهو in scope ولقيناه في ST3.",
     "صح. الـ table الحالية (local) بيتدوّر فيها الأول."
    ],
    [
     "صح. ده access لمتغير out-of-scope: الـ d اتعرّف في Block 2 بس. بعد قوس قفل Block 2، الـ d مابقاش visible.",
     "مع الـ static scoping، الـ scope بتاع d بيخلص مع Block 2.",
     "Block 3 بيعرّف a و c بس (وهو كمان اتقفل)، فمفيش عنده d يتستخدم.",
     "الـ d متعرّف مرة واحدة بس، في Block 2. المشكلة إنك بتستخدمه برا الـ block ده، يعني out-of-scope access."
    ],
    [
     "دي بتشيك بس إذا كان x موجود في الـ LOCAL (الحالي) scope.",
     "دي بتضيف x للـ table (معالجة declaration).",
     "صح. الـ look_up(x) بتلاقي الـ x الحالي عن طريق الـ scoping rules، وبتدوّر من الـ scope الحالي لبرا (L8, Symbol tables: low-level operations).",
     "الـ enter_scope() بتبدأ nested scope جديد؛ مش بتدوّر على أي identifier. اللي بيعمل كده هو look_up(x)."
    ],
    [
     "الـ identifiers بتاعة scope 1 بتتمسح لما نخرج من الـ scope، باستخدام الـ structure المنفصلة اللي بتتابع أسماء الـ scope الحالي.",
     "اللي بيتشال الـ declaration الداخلي بس؛ الـ x اللي برّه لسه موجود.",
     "الـ records عمرها ما بتتدمج: لما الـ scope يخلص الـ record بتاع scope 1 بيتشال، والـ record بتاع scope 0 بيبقى في الأول.",
     "صح. أول item دايمًا هو الصح للـ scope الحالي."
    ],
    [
     "صح. المحاضرة بتذكر Lisp و SNOBOL و Perl (من خلال keywords).",
     "الـ C لغة statically scoped: السلايدز بتذكر Java و C كأمثلة على الـ static scope، اللي معظم اللغات بتستخدمه.",
     "الـ Java لغة statically scoped: السلايدز بتذكرها مع C كلغة static scope. أمثلة الـ dynamic هي Lisp و SNOBOL و Perl.",
     "أغلب اللغات، ومنهم الاتنين دول، بيستخدموا static binding."
    ],
    [
     "الاسم لوحده ده مجرد الـ key. الـ table كمان بيخزّن معلومات عن الـ declaration: الـ type والـ scope level وأحيانًا الـ location.",
     "صح. تعريف السلايد: كل identifier مربوط بمعلومات عن الـ declaration بتاعه، زي الـ type والـ scope level وأحيانًا الـ location (L8, Symbol tables).",
     "الـ code ده output الـ code generator، مش محتوى الـ symbol table.",
     "الـ parse trees بيبنيها الـ parser وهي حاجة منفصلة."
    ],
    [
     "الـ static binding هو اللي بيتحل في الـ compile time، عشان بيعتمد على نص البرنامج بس.",
     "صح. الـ dynamic binding بيعتمد على التنفيذ؛ السيستم بيطلع لفوق في الـ stack بتاع الـ symbol tables وقت الـ run time."
    ],
    [
     "صح. لو x مش موجود تحت الـ scope_id الحالي، لازم نعيد الـ lookup بالـ ids بتاعة الـ scopes اللي حواليه.",
     "المحاضرة بتقول إن Solution 1 ممكن لسه تحتاج كذا بحث، وده اللي الـ linked lists في Solution 2 بتتجنبه."
    ]
   ]
  },
  "9": {
   "notes": [
    {
     "h": "الـ Runtime environment",
     "pts": [
      "الـ <b>Runtime</b> = برنامج شغّال (في التنفيذ). والـ <b>runtime environment</b> هو حالة الـ target machine (software libraries، environment variables…) اللي بتقدّم خدمات للـ processes اللي شغّالة.",
      "الـ <b>runtime support system</b> ده package، غالبًا بيتعمل مع الـ executable نفسه، وبيظبط التواصل بين الـ process والـ runtime environment. وهو اللي بياخد باله من <b>memory allocation و de-allocation</b> وإنت البرنامج شغّال."
     ],
     "figH": {
      "cc-runtime-env": "الـ process والـ runtime support system والـ runtime environment"
     }
    },
    {
     "h": "الـ Storage allocation: إيه اللي محتاج ميموري",
     "pts": [
      "الـ <b>Code</b>: الـ text part، ومش بيتغير وقت الـ runtime. احتياجه من الميموري <b>معروف في الـ compile time</b>.",
      "الـ <b>Procedures</b>: الـ text بتاعها static، بس بتتنادى بترتيب عشوائي، فالـ <b>stack</b> هو اللي بيدير الـ procedure calls والـ activations.",
      "الـ <b>Variables</b>: بتتعرف بس وقت الـ runtime (إلا لو global أو constant). والـ <b>Heap</b> allocation هو اللي بيديرها."
     ],
     "figH": {
      "cc-mem-needs": "الـ code والـ procedures والـ variables، وكل واحد بيتدار بأنهي storage"
     }
    },
    {
     "h": "الـ 3 أنواع بتوع الـ storage allocation",
     "pts": [
      "الـ <b>Static allocation</b>: الداتا بتترتبط بـ <b>location ثابت</b> مش بيتغير طول التنفيذ. وبما إن الأحجام والأماكن معروفة من الأول، <b>مش محتاجين runtime support package</b> للـ allocation/de-allocation.",
      "الـ <b>Stack allocation</b>: الـ procedure calls والـ activations بتتدار بـ stack (<b>LIFO</b>). مفيد جدًا للـ <b>recursive</b> calls.",
      "الـ <b>Heap allocation</b>: الميموري بتتحجز وتتفك dynamically وقت الـ runtime وبترجع لما مانحتاجهاش. ودي لازمة للغات اللي بتسمح بـ <b>dynamic data structures</b>.",
      "ماعدا الـ static area، الـ <b>stack والـ heap بيكبروا ويصغروا dynamically</b>، فماينفعش ندّيهم كمية ميموري ثابتة. عشان كده الـ compiler بيستخدم storage حجمه ثابت (static) و storage حجمه متغير (stack/heap)."
     ],
     "figH": {
      "cc-alloc-kinds": "الـ static والـ stack والـ heap وقت التشغيل: مين بيكبر ويصغر"
     }
    },
    {
     "h": "الـ Memory layout (ارسم الشكل ده)",
     "pts": [
      "الـ text part بياخد كمية ميموري ثابتة. والـ stack والـ heap موجودين في <b>الطرفين</b> بتوع ميموري البرنامج و<b>بيكبروا ويصغروا ناحية بعض</b>.",
      "الـ Lecture notes (layout بتاع C): text segment، initialized data segment (globals/statics ليها قيمة)، uninitialized data segment (BSS: globals/statics من غير قيمة)، stack (automatic variables، stack frames فيها الـ return addresses)، heap (malloc/realloc/free)."
     ],
     "figH": {
      "cc-mem-layout": "الـ memory layout: الـ text والـ static data ثابتين، والـ stack والـ heap بيكبروا ناحية بعض"
     }
    },
    {
     "h": "الـ Formal مقابل الـ actual parameters",
     "pts": [
      "الـ <b>Formal parameters</b>: متغيرات في <b>تعريف (definition)</b> الـ function اللي اتنادت، وبتستقبل المعلومات اللي الـ caller بعتها.",
      "الـ <b>Actual parameters</b>: المتغيرات اللي قيمها أو عناوينها بتتبعت؛ وبتظهر في الـ <b>function call</b> كـ arguments.",
      "الـ formal parameters بتشيل معلومات الـ actual parameter: قيمة أو عنوان، حسب طريقة الـ passing."
     ],
     "figH": {
      "cc-formal-actual": "الـ fun_one بتبعت الـ actual_parameter للـ formal_parameter بتاع fun_two، كقيمة أو كعنوان"
     }
    },
    {
     "h": "طرق الـ Parameter-passing (مثال المحاضرة)",
     "figH": {
      "cc-param-modes": "تشغيل الـ concentrate خطوة بخطوة بالـ value والـ result والـ value-result والـ reference"
     }
    },
    {
     "h": "أغراض الـ Symbol table (من ناحية الـ runtime)",
     "pts": [
      "بتخزّن معلومات عن أسماء المتغيرات، أسماء الـ functions، الـ objects، الـ classes، الـ interfaces…",
      "الأغراض: تخزين أسماء كل الـ entities في مكان واحد منظّم؛ التأكد إن المتغير اتعمله declare؛ تنفيذ الـ <b>type checking</b> (إن الـ assignments والـ expressions صح semantically)؛ تحديد الـ <b>scope</b> بتاع الاسم (scope resolution). وممكن كمان تستخدم في الـ storage allocation."
     ]
    },
    {
     "h": "الـ Peephole optimization",
     "pts": [
      "code optimization بيتعمل على <b>جزء صغير من الكود</b>. المجموعة الصغيرة دي من الـ instructions اسمها <b>peephole</b> أو <b>window</b>.",
      "بيشتغل بالـ <b>replacement</b>: جزء من الكود بيتبدّل بكود أقصر وأسرع وبيدّي نفس الـ output. وهو <b>machine dependent</b>.",
      "الأهداف: <b>تحسين الـ performance</b>؛ <b>تقليل حجم الكود</b> وتحسين استخدام الميموري.",
      "<b>Redundant load and store elimination</b>: <code>y = x + 5; i = y; z = i; w = z * 3;</code> → <code>y = x + 5; i = y; w = y * 3;</code>",
      "<b>Constant folding</b>: نبسّط اللي ينفع يتحسب في الـ compile time: <code>x = 2 * 3;</code> → <code>x = 6;</code>",
      "<b>Combine operations</b>: كذا operation بتتبدّل بواحدة مكافئة. مثال السلايد: <code>X = (2*3)+5; y = X – Sqrt(3*8);</code> (ممكن تبقى <code>X = 11; y = 11 – Sqrt(24);</code>)."
     ],
     "figH": {
      "cc-peep-redundant": "الـ peephole window بتمشي على الكود: الـ redundant load and store elimination",
      "cc-peep-fold": "الـ constant folding والـ combine operations على كود الـ slide"
     }
    },
    {
     "h": "الـ Loop optimization",
     "pts": [
      "الـ loop optimization بيحسّن الـ <b>cache performance</b> وبيقلل الـ <b>overheads</b> بتاعة تنفيذ الـ loops.",
      "نسخة الامتحان: <code>for (i=0; i &lt; a→length-1; i++) swap_elements(a[i], a[i+1]);</code> → <code>int x = a→length-1; for (i=0; i &lt; x; i++) swap_elements(a[i], a[i+1]);</code> فالـ length-1 بيتحسب مرة واحدة بدل ما يتحسب كل iteration، وده بيوفّر processing ووقت."
     ],
     "figH": {
      "cc-loop-hoist": "حساب حد الـ loop مرة واحدة: عدد مرات الحساب في كل check"
     }
    }
   ],
   "cards": [
    "حالة الـ target machine (libraries، env variables…) اللي بتخدم الـ processes الشغّالة.",
    "package بيتعمل مع الـ executable وبيظبط الـ memory allocation/de-allocation وقت الـ run time.",
    "تلاتة: static، stack، heap.",
    "memory locations ثابتة ومعروفة من الأول؛ مش محتاج runtime support.",
    "الـ Procedure/function calls والـ activations (LIFO)؛ كويس للـ recursion.",
    "المتغيرات/الـ data structures اللي بتتحجز dynamically وقت الـ run time.",
    "الـ Stack والـ heap، ناحية بعض؛ والـ text والـ static data ثابتين.",
    "بتتعرّف في definition الـ function اللي اتنادت؛ وبتستقبل المعلومات اللي اتبعتت.",
    "الـ arguments اللي بتتدّى في الـ call.",
    "مفيش حاجة بتدخل؛ الـ formals بتتنسخ ترجع للـ actuals لما نرجع (return).",
    "نسخ للداخل وقت الـ call ونسخ راجع وقت الـ return.",
    "المجموعة الصغيرة من الـ instructions اللي الـ peephole optimization بيشتغل عليها.",
    "أيوه.",
    "Redundant load/store elimination، constant folding، combine operations.",
    "تحسين الـ cache performance وتقليل الـ overheads بتاعة الـ loops."
   ],
   "qa": [
    "فوق: ميموري الـ text (code)، ثابتة؛ وبعدها الـ static data، ثابتة. تحت: ميموري الـ stack بتكبر لتحت، وفي الطرف التاني ميموري الـ heap بتكبر لفوق؛ وبيكبروا ويصغروا ناحية بعض. الـ Static allocation بيربط الداتا بـ locations ثابتة معروفة من الأول (مش محتاج runtime support). الـ Stack allocation بيدير الـ procedure calls/activations بترتيب LIFO (كويس للـ recursion). الـ Heap allocation بيحجز ويفك المتغيرات dynamically وقت الـ run time. والـ stack والـ heap ماينفعش يبقى ليهم حجم ثابت.",
    "int x = a->length-1; for (i=0; i &lt; x; i++) swap_elements(a[i], a[i+1]); الـ loop bound بيتحسب مرة واحدة ويتخزن في x بدل ما ننادي length-1 كل iteration، وده بيوفّر وقت الـ processing (loop optimization / code hoisting).",
    "optimization بيعتمد على الـ machine (machine-dependent) على window صغيرة (peephole) من الكود، بيبدّلها بكود أقصر/أسرع وبنفس الـ output، عشان يحسّن الـ performance ويقلل حجم الكود. الـ Techniques: redundant load and store elimination (y=x+5; i=y; z=i; w=z*3 تبقى y=x+5; i=y; w=y*3)، و constant folding (x=2*3 تبقى x=6)، و combine operations (X=(2*3)+5 تبقى X=11).",
    "الـ Formal parameters بتتعرّف في definition الـ procedure اللي اتنادت وبتستقبل المعلومات اللي اتبعتت (value أو address). الـ Actual parameters هي المتغيرات/القيم اللي في الـ call statement واللي قيمها أو عناوينها بتتبعت.",
    "Value: 2 1 2 3 / 3 5 1 0 3 / 2 1 0 3. Result: 2 1 2 3 / 1 3 1 0 3 / 1 1 3 3. Value-result: 2 1 2 3 / 3 5 1 0 3 / 3 1 5 3."
   ],
   "quiz": [
    [
     "الـ اتنين دول تقسيمة fixed-size و dynamic-size storage. لكن المحاضرة بتذكر تلات أنواع storage allocation: static و stack و heap.",
     "صح. التلات أنواع storage allocation في المحاضرة هما static (locations ثابتة)، و stack (الـ procedure calls، LIFO)، و heap (الـ dynamic variables) (L9, Types of storage allocation).",
     "المحاضرة بتذكر تلات أنواع بالظبط: static و stack و heap. مفيش نوع storage رابع.",
     "الـ C layout فيه خمس segments، بس أنواع الـ storage في المحاضرة تلاتة."
    ],
    [
     "الـ objects اللي ليها locations ثابتة ومعروفة من الأول بتستخدم الـ static allocation، مش الـ stack.",
     "صح. الـ procedure calls والـ activations بتاعتها بتتدار بالـ stack allocation (LIFO)، وده مفيد جدًا للـ recursive calls (L9, Types of storage allocation).",
     "الكود (الـ text part) مش بيتغير وقت الـ runtime وحجمه معروف وقت الـ compile، فبياخد memory ثابتة (static).",
     "اختيار a ده static allocation مش stack، فـ b بس (الـ procedure والـ function calls) هو الصح."
    ],
    [
     "صح. الـ heap allocation بيعمل allocate للـ memory للـ variables بشكل dynamic وقت الـ runtime، وبيرجّعها لما تبطّل تتحتاج (L9, Types of storage allocation).",
     "الـ queue دي data structure، مش نوع من أنواع الـ storage بتاعة الـ compiler (static، stack، heap).",
     "الـ array دي data structure ممكن تعيش في static أو stack أو heap storage؛ هي نفسها مش نوع storage.",
     "الـ text (الكود) ثابت: حجمه معروف وقت الـ compile ومش بيتغير وقت الـ runtime."
    ],
    [
     "صح. أنواع الـ storage allocation في المحاضرة هي static و stack و heap (L9, Types of storage allocation).",
     "كلمة \"Dynamic\" بتوصف الـ stack والـ heap (الاتنين بيكبروا ويصغروا)؛ مش class تالت لوحدها. الـ class الناقصة هي static.",
     "مفيش حاجة اسمها queue storage. الـ procedure calls بتستخدم stack (LIFO)، فالـ classes هي static و stack و heap.",
     "اختيار a فيه التلات classes بتوع المحاضرة بالظبط: static و stack و heap."
    ],
    [
     "الـ global variables ليها locations ثابتة ومعروفة من الأول، فالـ static allocation كفاية؛ مش محتاجين heap.",
     "الـ dynamic scoping بيتكلم عن الاسم بيشاور على أنهي declaration (L8)، مش عن الـ allocation بتاع الـ memory وقت الـ runtime.",
     "الـ recursion بيتخدم بالـ stack allocation: كل call بتعمل push لـ activation، بنظام LIFO.",
     "صح. الـ dynamic data structures بتتعمل وتتشال وقت الـ runtime، وده بالظبط شغل الـ heap allocation: allocate وقت الحاجة وترجّع الـ memory اللي مبقتش محتاجها (L9, Heap allocation)."
    ],
    [
     "الـ constant folding دي technique من techniques الـ peephole optimization (x = 2 * 3 بتبقى x = 6).",
     "الـ combine operations دي peephole technique: كذا operation بيتبدلوا بـ operation واحدة مكافئة.",
     "a و b الاتنين فعلًا optimization methods، فـ \"a and b\" مينفعش تكون هي اللي مش method.",
     "صح. ده data structure، مش optimization."
    ],
    [
     "مفيش حاجة اسمها \"variable folding\": الـ folding بيشتغل على الـ constants بس، اللي قيمتها معروفة وقت الـ compile.",
     "الـ definite assignment ده semantic analysis (L7) بيتأكد إن الـ variables اتعملها assign قبل ما تتستخدم؛ مش optimization.",
     "صح. الـ constant folding والـ combine operations الاتنين peephole optimization techniques، ومعاهم الـ redundant load and store elimination (L9, Peephole optimization).",
     "اختيار a واختيار b كل واحد فيهم فيه حاجة مش optimization (variable folding، definite assignment)، فـ \"a and b\" غلط."
    ],
    [
     "ده عكس السلايدز: الـ peephole optimization بيبقى machine dependent وبيشتغل على window صغيرة، مش على البرنامج كله.",
     "صح. بيشتغل على جزء صغير من الكود اسمه الـ peephole أو الـ window، وبيبدّله بكود أقصر وأسرع، وهو machine dependent (L9, Peephole optimization).",
     "الـ lexical analysis هي أول phase (الـ tokens)؛ لكن الـ peephole optimization بيشتغل على الكود في مرحلة الـ optimization.",
     "الـ constant folding واحدة بس من التلات techniques بتوعه، ومعاها الـ redundant load and store elimination والـ combine operations."
    ],
    [
     "الـ 2 1 0 3 دي pass by value: مفيش حاجة بتتنسخ راجعة، فـ i بتفضل 2 و a[2] بيفضل فيه الـ 0. لكن الـ by result بينسخ j = 1 و x = 3 راجعين.",
     "صح. j بيخلص بـ 1 و x بـ 3 (بيبدأوا من 0) وبيتنسخوا راجعين لـ i و a[2].",
     "الـ 3 1 5 3 دي value-result: القيم الأولية (2 و 2) بتتنسخ جوه. في الـ by result الـ formals بتبدأ من 0، فـ j = 1 و x = 3.",
     "الـ 3 1 0 3 دي pass by reference: الـ x هو نفسه a[2]، فـ a[2] := 0 بتسيبه 0. لكن الـ by result بينسخ x = 0 + 3 = 3 راجع في a[2]."
    ],
    [
     "صح. j=3 بيتنسخ لـ i و x=5 لـ a[2]، وبيكتب فوق الـ a[2]:=0.",
     "الـ 2 1 0 3 دي pass by value: مفيش حاجة بتتنسخ راجعة. الـ value-result بينسخ j = 3 في i و x = 5 في a[2] وقت الـ return.",
     "الـ 1 1 3 3 دي pass by result، اللي الـ formals فيه بتبدأ من 0. الـ value-result بينسخ القيم الأولية جوه، فـ j = 2+1 = 3 و x = 2+3 = 5.",
     "الـ 3 1 0 3 دي pass by reference: الـ x هو alias لـ a[2]، فـ a[2] := 0 هي النهائية. الـ value-result بينسخ x = 5 راجع فوق الـ 0 ده."
    ],
    [
     "الـ constant folding بيحسب الـ constant expressions (x = 2 * 3 → x = 6)؛ هنا مفيش constant اتحسب، اللي حصل إن copy اتشال.",
     "صح. الـ z = i بتنسخ قيمة y تاني وخلاص، فبتتشال و w بتستخدم y على طول. ده مثال السلايد على الـ redundant load and store elimination (L9, Peephole techniques).",
     "مفيش loop في الكود ده؛ الـ loop optimization بيطلّع الشغل برا الـ loops، زي إنك تحسب arr.length مرة واحدة.",
     "الـ combine operations بيدمج كذا operation في واحدة مكافئة، زي (2*3)+5 → 11. هنا اللي حصل إن copy زيادة اتشال."
    ],
    [
     "صح. السلايد بيقول إن الـ loop optimization ليه دور مهم في تحسين الـ cache performance وتقليل الـ overheads بتاعة تنفيذ الـ loops (L9, Loop optimization).",
     "الجملة دي هي كلام السلايد: الـ loop optimization بيحسّن الـ cache performance وبيقلّل الـ overheads بتاعة الـ loops.",
     "مثال السلايد مكتوب بـ Java، بس الفكرة بتنطبق على الـ loops في أي لغة؛ مفيش حاجة بتقصرها على Java.",
     "الـ loop optimization بيستهدف الـ loops (زي إنك تحسب arr.length مرة واحدة قبل الـ loop)، مش الـ recursion."
    ],
    [
     "\"Token optimization\" مش من techniques الكورس؛ الـ peephole techniques هي الـ load/store elimination والـ constant folding والـ combine operations.",
     "صح. الـ peephole techniques: redundant load/store elimination، constant folding، combine operations.",
     "مش technique؛ الـ annotated tree دي ناتج الـ semantic analysis.",
     "الـ NFAs تبع الـ lexical analysis (L3)؛ تحويلها لـ DFAs مش peephole optimization technique."
    ],
    [
     "الـ constant folding فعلًا optimization method، بس الـ combine operations كمان، فالإجابة الكاملة \"a and b\".",
     "الـ combine operations فعلًا optimization method، بس الـ constant folding كمان، فالإجابة الكاملة \"a and b\".",
     "صح. الاتنين peephole optimization techniques.",
     "ده output الـ semantic analyzer، مش optimization."
    ],
    [
     "الـ peephole optimization بيشتغل على أي window صغيرة من الـ instructions.",
     "صح. الـ loops هي هدف الـ <b>LOOP</b> optimization، ودي technique منفصلة."
    ],
    [
     "صح. الـ optimization بيقلّل استخدام الميموري ويزوّد السرعة، زي الـ redundant load/store elimination.",
     "إننا نشيل الـ redundancy عشان نوفّر وقت ومساحة ده تعريف الـ optimization نفسه."
    ],
    [
     "ده الـ pass by value: مفيش حاجة بتترجع.",
     "صح. الـ formals بتبدأ بـ 0: y = 2، x = 8؛ وبيترجعوا لـ i و a[1] (الـ address اللي اتحدد وقت الـ call).",
     "ده الـ value-result (القيم الأولية بتتنسخ جوّه).",
     "الـ x مربوطة بـ a[1] (الـ i كانت 1 وقت الـ call)، مش a[2]."
    ],
    [
     "صح. y = 1+2 = 3، x = 4+8 = 12، وبيترجعوا لـ i و a[1]؛ والـ a[2] = 0 بتفضل زي ما هي.",
     "الـ 2 2 8 0 دي pass by result: الـ formals بتبدأ من 0، فـ y = 2 و x = 8. لكن الـ value-result بينسخ i = 1 و a[1] = 4 جوه الأول.",
     "الـ x بترجع لـ a[1]، الـ address اللي اتحدد وقت الـ call، مش a[2] ولا a[الـ i الجديدة].",
     "الـ 1 2 4 0 دي pass by value: الـ a[2] := 0 بس هي اللي بتغيّر الـ global array؛ مفيش حاجة بتتنسخ راجعة لـ i أو a[1]."
    ]
   ],
   "extra": [
    [
     "ده pass by result، اللي فيه الـ formals بتبدأ من 0.",
     "ده pass by reference، اللي فيه x هو alias لـ a[2].",
     "الـ a[2] := 0 بيغيّر الـ global array a حتى مع pass by value.",
     "صح. j = 2+1 = 3، و x = 2+3 = 5 (نسخ)، والـ global a بتبقى (1,0,3)."
    ],
    [
     "صح. x هو نفسه a[2]: الـ x := x+3 بيخلّي a[2] = 5، وبعدين a[2] := 0 بيخلّي x = 0 كمان. و j هو alias لـ i = 3.",
     "ده pass by value؛ بيتجاهل إن x و a[2] نفس الـ location.",
     "الـ a[2] := 0 بيتنفّذ بعد x := x+3، فالقيمة النهائية 0.",
     "الـ 1 3 1 0 3 دي output الـ pass by result (الـ formals بتبدأ من 0). في الـ by reference الـ j والـ x هما alias لـ i و a[2]، فـ j = 3 و x = 0."
    ],
    [
     "ده pass by value: مفيش حاجة بتتنسخ راجعة.",
     "ده بينسخ j راجع لـ i بس نسي ينسخ x راجع لـ a[3].",
     "صح. j = 3→4، x = 7→10، a[2] := 0. وعند الـ return، i ← 4 و a[3] (العنوان اتثبّت وقت الـ call) ← 10.",
     "ده pass by result: الـ formals بتبدأ من 0، فـ j = 1 و x = 3 هما اللي بيتنسخوا راجعين."
    ],
    [
     "الـ v ظاهر في الـ call، يبقى هو الـ actual parameter.",
     "صح. الـ Formal parameters بتستقبل المعلومات اللي الـ caller بعتها.",
     "دورين مختلفين: v هو actual، و w هو formal.",
     "الـ 10 دي القيمة اللي بتتبعت، مش parameter. الـ w المتعرّف في definition بتاع fun_two هو الـ formal parameter."
    ],
    [
     "الـ recursive procedures محتاجة stack allocation، لأن كل call بتعمل activation جديدة وقت الـ runtime.",
     "الـ Heap allocation نوع storage تاني منفصل و dynamic.",
     "الـ static data بتتستخدم وقت الـ runtime عادي؛ هي بس بتفضل في نفس الـ location الثابت طول التنفيذ.",
     "صح. الداتا مربوطة بـ location ثابت مش بيتغير أثناء التنفيذ؛ وبما إن احتياجات الـ memory والـ locations معروفة من الأول، مش محتاجين runtime support package (L9, Static allocation)."
    ],
    [
     "صح. الـ Globals والـ statics اللي من غير قيمة بتروح الـ BSS؛ واللي ليها قيمة بتروح الـ initialized data segment.",
     "الـ heap فيه الميموري اللي جاية من malloc/realloc، وبتتفك بـ free.",
     "الـ stack فيه الـ automatic (local) variables والـ stack frames.",
     "الـ text segment فيه كود البرنامج، مش variables. الـ globals اللي من غير قيمة بتروح الـ uninitialized data segment (BSS)."
    ],
    [
     "اتعمله fold جزئي بس: 6+5 ممكن يتحسب هو كمان، و X ممكن يتبدّل بقيمته.",
     "2*(3+5) = 16 بتتجاهل الأقواس: (2*3)+5 = 11.",
     "صح. (2*3)+5 = 11 و 3*8 = 24 بيتحسبوا في الـ compile time.",
     "3*8 كمان constant expression وممكن يتعمله fold لـ 24."
    ],
    [
     "الـ loop بتجمع كل b[k] لـ k من 0 لحد n*2 − 1؛ لو بدّلتها بعنصر واحد الـ output هيتغير.",
     "لو مشيت بـ 2 هتنطّ عنصر وعنصر، فالـ sum هيتغير. الـ optimization لازم يحافظ على نفس الـ output.",
     "n متغير، فـ n*2 ماينفعش يتعمله fold في الـ compile time.",
     "صح. زي arr.length → size، الـ bound بيتحسب مرة واحدة بدل كل iteration."
    ],
    [
     "الـ text والـ static data بس هما اللي ثابتين. الـ Stack والـ heap بيكبروا ويصغروا.",
     "صح. الـ Stack والـ heap في الطرفين بتوع الميموري وبيكبروا ويصغروا ناحية بعض، فماينفعش يبقى ليهم حجم ثابت."
    ],
    [
     "صح. الـ procedure calls والـ activations بتاعتها بتتدار LIFO على الـ stack، وده مناسب للـ recursion.",
     "المحاضرة بتقول صراحة إن الـ stack allocation مفيد جدًا للـ recursive calls."
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
       "why": "ده الشكل بتاع Lecture 9 مع الـ three storage types. والـ revision sheet في essay Q3 بتدي نفس الإجابة دي.",
       "ans": "<pre>┌──────────────────────┐\n│  Text (code) memory  │  fixed\n├──────────────────────┤\n│  Static data         │  fixed\n├──────────────────────┤\n│  Stack memory   ↓    │  dynamic\n│      free space      │\n│  Heap memory    ↑    │  dynamic\n└──────────────────────┘</pre><b>Static allocation</b>: الداتا بتتربط بمكان ثابت في الميموري ومبيتغيرش طول التنفيذ. الأحجام والأماكن معروفة من الأول، فمش محتاجين runtime support package.<br><b>Stack allocation</b>: الـ procedure calls والـ activations بتاعتها بيتداروا بـ stack (LIFO)؛ مفيدة جدًا في الـ recursive calls.<br><b>Heap allocation</b>: الميموري بتاعة المتغيرات بتتحجز وتتفك بشكل dynamic وقت الـ run time، وبترجع لما متبقاش محتاجينها.<br>الجزء بتاع الـ text بياخد حجم ميموري ثابت. الـ stack والـ heap في الطرفين وبيكبروا ويصغروا في اتجاه بعض، عشان كده مينفعش نديهم حجم ثابت."
      }
     ]
    },
    {
     "items": [
      {
       "why": "ابدأ من الـ ε-closure بتاع 1. لكل set ولكل symbol، اجمع الـ moves وخد الـ ε-closure بتاعها (يعني 3 –a→ 1 بتجيب معاها 3 كمان). جدول Q16 في الـ revision sheet بيدي نفس النتيجة.",
       "ans": "الـ ε-closures: E(1) = {1,3}، E(2) = {2}، E(3) = {3}.<br>الجدول بالـ ε (step 1):<table><tr><th>State</th><th>a</th><th>b</th><th>ε</th></tr><tr><td>1</td><td>-</td><td>2</td><td>1,3</td></tr><tr><td>2</td><td>2,3</td><td>3</td><td>2</td></tr><tr><td>3</td><td>1 (→ closure 1,3)</td><td>-</td><td>3</td></tr></table>الـ DFA (step 2):<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→* {1,3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>{2}</td><td>{2,3}</td><td>{3}</td></tr><tr><td>{2,3}</td><td>{1,2,3}</td><td>{3}</td></tr><tr><td>{3}</td><td>{1,3}</td><td>∅</td></tr><tr><td>* {1,2,3}</td><td>{1,2,3}</td><td>{2,3}</td></tr></table>الـ Start = {1,3}. الـ final states هي اللي فيها 1: {1,3} و {1,2,3}. والـ ∅ دي dead state (أو ببساطة متكتبش الـ transition دي خالص)."
      }
     ]
    },
    {
     "items": [
      {
       "why": "في tree 1، الـ A بتطلّع aa والـ T بتطلّع a. في tree 2، الـ A بتطلّع a والـ T بتطلّع aa. فيه أزواج تانية صح برضه، زي مثلًا A → AA → AAA متجمعة بطريقتين لـ string أطول. الدرجات: اتنين LMDs صح + اتنين trees + الاستنتاج.",
       "ans": "<pre>LMD 1: S ⇒ AB ⇒ AAB ⇒ aAB ⇒ aaB ⇒ aaTc ⇒ aaac\nLMD 2: S ⇒ AB ⇒ aB ⇒ aTc ⇒ aaTc ⇒ aaac\n\nTree 1:        S                Tree 2:       S\n             /                             /               A     B                        A     B\n           /    /                        |    /           A   A T   c                      a   T   c\n          |   | |                             /           a   a a                            a   T\n                                                 |\n                                                 a</pre>فيه اتنين leftmost derivations مختلفين (يعني اتنين parse trees مختلفين) لنفس الـ string اللي هو aaac، يبقى الـ grammar دي <b>ambiguous</b>."
      }
     ]
    },
    {
     "items": [
      {
       "why": "في الـ <b>by value</b>: مفيش حاجة بترجع تتنسخ، فالـ main دايمًا شايفة value = 2 والـ list الأصلية. في الـ <b>by value-result</b>: الـ a والـ b بيتنسخوا تاني وقت الـ return على الـ addresses اللي اتحددت وقت الـ call (list[0] في call 1، و list[1] في call 2، عشان value = 1 ساعتها). بعد call 2، value = 3، والـ main بتطبع list[value] = list[3] = 7. ده ماشي على قاعدة المحاضرة (في concentrate(i, a[i]) النتيجة بتروح لـ a[2]، اللي اتحددت وقت الـ call). لو افترضت إن الـ address بيتحسب تاني وقت الـ return (value = 3، يبقى list[3] = 1)، السطر الأخير هيبقى \"3 1\"، وده اللي مكتوب في الـ pencil note بتاعة الطالب على الـ scan.",
       "ans": "<table><tr><th>Line</th><th>By value</th><th>By value-result</th></tr><tr><td>swap(value, list[0])</td><td>1 2</td><td>1 2</td></tr><tr><td>main</td><td>2 1</td><td>1 2  (value=1, list[0]=2 copied back)</td></tr><tr><td>swap(value, list[value])</td><td>5 2  (list[2]=5)</td><td>3 1  (value=1, so list[1]=3)</td></tr><tr><td>main</td><td>2 5</td><td>3 7  (value=3, list[1]=1; list[3]=7 printed)</td></tr></table><b>Optimizations</b>:<br>1) <b>Constant folding</b>: <code>double y = 1.5*3;</code> → <code>double y = 4.5;</code> (بتتحسب مرة واحدة وقت الـ compile).<br>2) <b>Dead code elimination</b>: الـ x والـ y متعرّفين بس عمرهم ما اتستخدموا، فنشيلهم (بيوفّر ميموري).<br>3) جوه الـ swap، ممكن الـ three assignments بتوع التبديل يتدمجوا/يتبسطوا، بس المكسب الأساسي في 1 و 2."
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ FOLLOW(S) بياخد $ (عشان هو الـ start)، و ) من U → (S)، و b من U → aSb. الـ FOLLOW(U) = FIRST(VW) − ε ∪ FOLLOW(S) عشان V و W الاتنين nullable. الـ FOLLOW(V) = {c} ∪ FOLLOW(S). الـ FOLLOW(W) = FOLLOW(S). الـ ε-productions بتتحط تحت الـ FOLLOW symbols. مفيش ولا cell فيها entry اتنين، يبقى الـ grammar دي LL(1) والـ string اتعملها accept.",
       "ans": "مفيش left recursion، فمش محتاجين نعمل أي transformation.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{ (, a, d }</td><td>{ $, ), b }</td></tr><tr><td>U</td><td>{ (, a, d }</td><td>{ a, c, $, ), b }</td></tr><tr><td>V</td><td>{ a, ε }</td><td>{ c, $, ), b }</td></tr><tr><td>W</td><td>{ c, ε }</td><td>{ $, ), b }</td></tr></table>الـ Parsing table:<table><tr><th></th><th>(</th><th>a</th><th>d</th><th>c</th><th>b</th><th>)</th><th>$</th></tr><tr><td>S</td><td>S→UVW</td><td>S→UVW</td><td>S→UVW</td><td></td><td></td><td></td><td></td></tr><tr><td>U</td><td>U→(S)</td><td>U→aSb</td><td>U→d</td><td></td><td></td><td></td><td></td></tr><tr><td>V</td><td></td><td>V→aV</td><td></td><td>V→ε</td><td>V→ε</td><td>V→ε</td><td>V→ε</td></tr><tr><td>W</td><td></td><td></td><td></td><td>W→cW</td><td>W→ε</td><td>W→ε</td><td>W→ε</td></tr></table>الـ Parsing بتاع (dc)ac:<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>(dc)ac$</td><td>S→UVW</td></tr><tr><td>UVW$</td><td>(dc)ac$</td><td>U→(S)</td></tr><tr><td>(S)VW$</td><td>(dc)ac$</td><td>match (</td></tr><tr><td>S)VW$</td><td>dc)ac$</td><td>S→UVW</td></tr><tr><td>UVW)VW$</td><td>dc)ac$</td><td>U→d</td></tr><tr><td>dVW)VW$</td><td>dc)ac$</td><td>match d</td></tr><tr><td>VW)VW$</td><td>c)ac$</td><td>V→ε</td></tr><tr><td>W)VW$</td><td>c)ac$</td><td>W→cW</td></tr><tr><td>cW)VW$</td><td>c)ac$</td><td>match c</td></tr><tr><td>W)VW$</td><td>)ac$</td><td>W→ε</td></tr><tr><td>)VW$</td><td>)ac$</td><td>match )</td></tr><tr><td>VW$</td><td>ac$</td><td>V→aV</td></tr><tr><td>aVW$</td><td>ac$</td><td>match a</td></tr><tr><td>VW$</td><td>c$</td><td>V→ε</td></tr><tr><td>W$</td><td>c$</td><td>W→cW</td></tr><tr><td>cW$</td><td>c$</td><td>match c</td></tr><tr><td>W$</td><td>$</td><td>W→ε</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Parsing (الـ syntax analysis) هو إننا نلاقي parse tree لسلسلة الـ tokens اللي طلّعها الـ scanner (L4).",
       "ow": [
        "الـ Analysis ده الـ front end كله (lexical وsyntax وsemantic analysis)؛ كلمة عامة أوي ومش بتوصف بناء الـ tree بالذات.",
        "الـ recognizer بيرد بآه أو لأ بس (الـ string مقبولة ولا لأ)؛ مش لازم يبني parse tree.",
        null,
        "الـ Tokenization هو الـ lexical analysis: بيجمّع الحروف في tokens، قبل ما يكون فيه أي parse tree."
       ]
      },
      {
       "why": "الـ symbol table دي data structure مشتركة بين الـ phases، مش phase (L1).",
       "ow": [
        "الـ Syntax analysis (الـ parser) هو phase 2 في الـ compiler، بعد الـ lexical analysis.",
        null,
        "الـ scanner هو الـ lexical analyzer، يعني phase 1 في الـ compiler.",
        "الـ Code optimization phase فعلًا: الـ source code optimizer (والـ target code optimizer) موجودين في لستة الـ phases في L1."
       ]
      },
      {
       "why": "الـ Leaves = terminals؛ والـ interior nodes = non-terminals (L4).",
       "ow": [
        null,
        "الـ Non-terminals بتبقى على الـ interior nodes في الـ parse tree، لأن كل واحد فيهم بيتفرد بـ production.",
        "الـ start symbol بيبقى على الـ root بتاع الـ parse tree، مش على الـ leaves.",
        "الـ Productions مش labels على nodes؛ كل interior node مع ولادها بتمثّل تطبيق production واحدة."
       ]
      },
      {
       "why": "كل hash table بتكلّف ميموري (L8). علامة الرصاص على (b) غلط.",
       "ow": [
        "الـ Redundant code حاجة الـ optimizer بيشيلها؛ ملهاش علاقة بتنظيم الـ symbol tables.",
        "الـ Peephole optimization تكنيك من تكنيكات الـ code optimization (L9)، مش مشكلة في الـ symbol tables.",
        "الـ Ambiguity خاصية في الـ grammars (أكتر من parse tree، L4)، مش في الـ symbol tables.",
        null
       ]
      },
      {
       "why": "الـ semantic analysis بتطلّع الـ annotated tree، والـ source code optimizer هو اللي بياخدها (L1؛ revision sheet Q37).",
       "ow": [
        "الـ Syntax analysis بياخد tokens ويطلّع الـ syntax tree العادية؛ الـ annotated tree بتيجي بعد كده.",
        null,
        "الـ Semantic analysis هي اللي بتطلّع الـ annotated syntax tree؛ الـ input بتاعها هو الـ syntax tree اللي جاية من الـ parser.",
        "الـ Derivation مش phase في الـ compiler؛ دي سلسلة خطوات الـ productions اللي بتولّد string من الـ CFG (L4)."
       ]
      },
      {
       "why": "الـ CFG هي 4-tuple (V, Σ, P, S): non-terminals وterminals وproductions وstart symbol. مفيش حاجة اسمها \"end symbol\" (L4).",
       "ow": [
        "الـ start symbol S واحد من الأربع أجزاء بتوع الـ CFG (V, Σ, P, S).",
        "الـ non-terminals V واحد من الأربع أجزاء بتوع الـ CFG (V, Σ, P, S).",
        null,
        "الـ terminals Σ واحد من الأربع أجزاء بتوع الـ CFG (V, Σ, P, S)."
       ]
      },
      {
       "why": "الـ grammar بتبقى unambiguous لما كل sentence يكون ليها leftmost derivation واحدة بس (أو rightmost واحدة)، يعني parse tree واحدة؛ الـ ambiguous معناها أكتر من واحدة (L4).",
       "ow": [
        "الـ Ambiguous هي الحالة العكس: فيه sentence ليها <b>أكتر</b> من leftmost (أو rightmost) derivation/parse tree (L4).",
        null,
        "الـ Static مصطلح بتاع الـ binding/scoping (L8)، مش خاصية في الـ grammars.",
        "الـ Dynamic مصطلح بتاع الـ binding/scoping (L8)، مش خاصية في الـ grammars."
       ]
      },
      {
       "why": "الـ Synthesized attributes بتتحسب من قيم الـ attributes بتاعة ولاد الـ node، فالقيم بتطلع لفوق في الـ tree (L7، الـ attribute grammars).",
       "ow": [
        "كلمة \"Static\" بتوصف binding/scoping متحدد من نص البرنامج (L8)، مش نوع attribute.",
        "كلمة \"Dynamic\" بتوصف binding بيتحل وقت الـ run time (L8)، مش نوع attribute.",
        null,
        "الـ Inherited attributes بتاخد قيمها من الـ parent و/أو الـ siblings، فالقيم بتنزل لتحت أو بتمشي بالعرض في الـ tree (L7)."
       ]
      },
      {
       "why": "الـ input بتاع الـ parser هو الـ stream of tokens اللي طلّعه الـ scanner (الـ lexical analyzer)؛ والـ output بتاعه هو الـ syntax tree (L1, L4).",
       "ow": [
        null,
        "الـ syntax tree هي الـ <b>OUTPUT</b> بتاع الـ syntax analysis والـ input بتاع الـ semantic analysis.",
        "الـ annotated syntax tree هي الـ output بتاع الـ semantic analysis، يعني بعدها بخطوتين.",
        "الـ Assembly code بيطلع في الآخر من الـ code generator (الـ target code)."
       ]
      },
      {
       "why": "الـ A ظاهرة كأول symbol على الشمال في الـ production بتاعتها هي نفسها (L5).",
       "ow": [
        "الـ Ambiguity محتاجة string ليها اتنين parse trees؛ إنما A → Ab | c بتولّد c b* وكل واحدة ليها tree واحدة بالظبط.",
        null,
        "كلمة \"Dynamic\" مصطلح بتاع الـ binding (L8)، مش خاصية في الـ grammar.",
        "اللي ينطبق هو الـ left recursion بس؛ الـ grammar مش ambiguous، و\"dynamic\" مش خاصية grammar أصلًا."
       ]
      },
      {
       "why": "الـ revision sheet Q53: الـ attribute grammar بتتولّد لما نربط attributes بكل non-terminal في الـ CFG. علامة الرصاص على (a) غلط: الـ annotated tree بتيجي من إننا نحسب الـ attributes على tree.",
       "ow": [
        "الـ annotated syntax tree بتيجي بعد كده لما نحسب الـ attributes على parse tree، مش لما نربطها بالـ grammar.",
        "ربط الـ attributes مش بيغيّر الـ productions بتاعة الـ grammar، فمش بيخلّي الـ CFG تبقى unambiguous.",
        "ربط الـ attributes مش بيغيّر الـ productions بتاعة الـ grammar، فمش بيخلّي الـ CFG تبقى ambiguous.",
        null
       ]
      },
      {
       "why": "الـ compilers بتطلّع intermediate object code؛ الـ interpreters لأ (جدول L1).",
       "ow": [
        "الـ compilers والـ interpreters الاتنين ممكن يعملوا optimization؛ جدول L1 مش بيعتبره هو الفرق.",
        null,
        "الـ compilers والـ interpreters الاتنين لازم يعملوا semantic checking، فده مش فرق.",
        "فيه فرق فعلًا في جدول L1: الـ compilers بتطلّع intermediate object code، والـ interpreters لأ."
       ]
      },
      {
       "why": "الـ regular expressions بتوصف الـ tokens؛ والـ finite automata بتتعرّف عليها (L2).",
       "ow": [
        "الـ Finite automata نص الإجابة بس: هي اللي بتتعرّف على الـ tokens، إنما الـ regular expressions هي اللي بتوصف الـ patterns (L2).",
        "الـ Regular expressions نص الإجابة بس: هي اللي بتوصف الـ patterns، إنما الـ finite automata هي اللي بتنفّذ الـ recognizer (L2).",
        "الـ Syntax-directed translation بتربط semantic rules بالـ CFG productions (L7)؛ مش بتستخدم للـ tokens.",
        null
       ]
      },
      {
       "why": "الـ loops ووجود كذا accept state مسموحين في الـ DFAs (L3).",
       "ow": [
        null,
        "الـ DFA ممكن يبقى فيه كذا accept state؛ ده لوحده مش بيخلّيه nondeterministic (L3).",
        "الـ DFA ممكن يبقى فيه loops (زي self-loop على state)؛ الـ loops مش بتخلّيه NFA (L3).",
        "الـ ε-transitions بس هي اللي بتجبره يبقى NFA؛ إنما كذا accept state والـ loops مسموحين في الـ DFAs."
       ]
      },
      {
       "why": "الـ lexical analyzer (الـ scanner) بيقرا حروف الـ source program ويجمّعها في lexemes، ويطلّع stream of tokens للـ parser (L2).",
       "ow": [
        "الـ Machine code ده الـ output النهائي بتاع الـ compiler كله، مش الـ input بتاع الـ lexical analyzer.",
        "معكوسة: الـ tokens هي الـ output بتاع الـ scanner، والـ source code هو الـ input بتاعه.",
        null,
        "(b) معكوسة، فمينفعش \"a and b\" تبقى صح؛ الصح بس source code → tokens."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "ده <b>STATIC</b> binding. الـ Dynamic binding بيستخدم آخر declaration اتنفّذ (L8).",
       "ow": [
        "الـ scoping حسب شكل الـ tree (الـ braces) ده <b>STATIC</b> binding؛ الـ dynamic binding بيستخدم آخر declaration اتنفّذ وقت الـ run time (L8).",
        null
       ]
      },
      {
       "why": "الـ (X|Y)* فيها strings متلخبطة زي XY، إنما X*|Y* فيها بس strings كلها X أو كلها Y، فهما مختلفين (L2).",
       "ow": [
        "الـ (X|Y)* فيها strings متلخبطة زي XY، لكن X*|Y* فيها بس strings كلها X أو كلها Y، فمش متساويين (L2).",
        null
       ]
      },
      {
       "why": "مفتاح الـ revision sheet بتاع الدكتور (Q52) بيقول إن الـ leftmost parsing tree بتكبر من الناحية <b>اليمين</b>، فالإجابة False. (المحاضرات مبتقولش القاعدة دي بشكل مباشر.)",
       "ow": [
        "مفتاح الـ revision sheet (Q52) اللي الدكتور ماشي بيه بيقول إن الـ leftmost parsing tree بتكبر من الناحية <b>اليمين</b>، فالجملة دي False.",
        null
       ]
      },
      {
       "why": "دي واحدة من الـ three peephole techniques (L9). علامة الـ ✗ بالرصاص على الـ scan غلط.",
       "ow": [
        null,
        "الـ Combine operations واحدة من الـ three peephole techniques في L9 (مع الـ redundant load/store elimination والـ constant folding)."
       ]
      },
      {
       "why": "الـ SDT بتربط rules بالـ CFG productions وبتحسبها على الـ tree، فبتدّينا الـ annotated syntax tree (L7؛ revision sheet T/F 13).",
       "ow": [
        null,
        "الـ SDT فعلًا بتطلّع الـ annotated syntax tree: الـ semantic rules المربوطة بالـ CFG productions بتتحسب على الـ tree (L7)."
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
       "why": "الـ Inherited attributes بتاخد قيمها من الـ parent node و/أو الـ sibling nodes، فالقيم بتنزل لتحت في الـ tree (L7؛ الـ sheet Q42).",
       "ow": [
        "إن القيم تيجي من الـ child nodes ده وصف الـ <b>SYNTHESIZED</b> attributes، مش الـ inherited (L7).",
        "الـ Leaves فيها terminals والـ attributes بتاعتها غالبًا جاية من الـ lexer؛ إنما الـ inherited attributes بتيجي من الـ parent/siblings.",
        null,
        "\"Semantic nodes\" مش مصطلح في المادة أصلًا؛ الـ inherited values بتيجي من الـ parent و/أو الـ siblings (L7)."
       ]
      },
      {
       "why": "الـ Syntax analysis مبني على context-free grammar: الـ parser بيقارن الـ token stream بالـ CFG productions ويبني الـ parse tree (L4).",
       "ow": [
        "الـ high-level language هي الـ source اللي بنحلّله، مش الـ formal model اللي الـ parser مبني عليه.",
        "الـ Low-level (machine) language ده الـ target بتاع الـ compiler، مش الـ model بتاع الـ syntax analysis.",
        null,
        "الـ Regular grammars/expressions بتوصف الـ lexical analysis (الـ tokens، L2)؛ مبتقدرش توصف syntax متداخل زي الأقواس المتوازنة."
       ]
      },
      {
       "why": "الـ Parsing اسم تاني للـ syntax analysis، يعني phase 2: بيقارن الـ token stream بالـ grammar ويبني الـ parse tree (L4).",
       "ow": [
        "الـ Semantic analysis هي phase 3: بتشيك على المعنى (الـ types والـ declarations) على الـ syntax tree بعد الـ parsing.",
        "الـ Lexical analysis هو الـ scanning (phase 1)، اللي بيطلّع الـ tokens اللي الـ parser بيقراها بعد كده.",
        null,
        "الـ Parsing ليه اسم في الاختيارات: هو الـ syntax analysis (L4)."
       ]
      },
      {
       "why": "مفتاح الـ revision sheet في Q12: الاتنين A و C. الـ compiler بيترجم الـ source code لـ machine code، والـ machine code هو نفسه binary code (L1).",
       "ow": [
        "الـ Machine code لوحده نص المفتاح بس؛ مفتاح الـ revision sheet (Q12) هو \"both a and c\" لأن الـ machine code هو الـ binary code.",
        "مفتاح الـ revision sheet (Q12) مش بيختار الـ executable code؛ الـ output بتاع الـ compiler المذكور هناك هو الـ machine (binary) code.",
        "الـ Binary code لوحده نص المفتاح بس؛ الـ machine code والـ binary code حاجة واحدة، فالمفتاح \"both a and c\".",
        null
       ]
      },
      {
       "why": "الـ lexical analyzer (الـ scanner) بيقرا حروف الـ source program ويجمّعها في lexemes، ويطلّع stream of tokens للـ parser (L2).",
       "ow": [
        "الـ Machine code ده الـ output النهائي بتاع الـ compiler كله، مش الـ input بتاع الـ lexical analyzer.",
        "معكوسة: الـ tokens هي الـ output بتاع الـ scanner، والـ source code هو الـ input بتاعه.",
        null,
        "(b) معكوسة، فمينفعش \"both a and b\" تبقى صح؛ الصح بس source code → tokens."
       ]
      },
      {
       "why": "الـ symbol table دي data structure مشتركة بين كل الـ phases، مش phase في حد ذاتها؛ إنما الـ scanner والـ parser والـ code optimizer phases (L1).",
       "ow": [
        "الـ scanner هو الـ lexical analyzer، phase 1 في الـ compiler.",
        null,
        "الـ parser هو الـ syntax analyzer، phase 2 في الـ compiler.",
        "الـ code optimizer phase فعلًا (source code optimizer وtarget code optimizer، L1)."
       ]
      },
      {
       "why": "الـ syntax analyzer (الـ parser) بيقارن الـ tokens بالـ grammar ويبني الـ parse (syntax) tree (L4؛ الـ sheet Q27).",
       "ow": [
        "الـ symbol table كل الـ phases بتتعامل معاه مع بعض؛ مش هو الشغلانة اللي بتعرّف الـ syntax analyzer.",
        "تجميع معلومات الـ types بيحصل في الـ semantic analysis (الـ type checking)، مش الـ syntax analysis.",
        null,
        "الـ syntax analyzer ليه شغلانة واضحة فعلًا: إنه يبني الـ parse tree."
       ]
      },
      {
       "why": "مفتاح الـ revision sheet في Q28: <b>ambiguous</b> (المقصود \"أكتر من واحدة\").",
       "ow": [
        "الـ Unambiguous معناها parse tree واحدة بالظبط لكل sentence، مش أكتر من واحدة.",
        null,
        "الاتنين عكس بعض، فمينفعش \"a or b\" يبقى تعريف؛ أكتر من tree يعني ambiguous.",
        "فيه اختيار مظبوط: أكتر من parse tree لنفس الـ sentence معناها إن الـ grammar ambiguous (L4)."
       ]
      },
      {
       "why": "الـ compiler بيستخدم تلات أنواع storage allocation: الـ static (الـ globals، متحددة وقت الـ compile)، والـ stack (الـ activation records)، والـ heap (الـ dynamic data) (L9).",
       "ow": [
        "اتنين ناقصين واحد من التلاتة: الـ static والـ stack والـ heap allocation (L9).",
        null,
        "هما تلاتة بس: static وstack وheap (L9).",
        "هما تلاتة بس: static وstack وheap (L9)."
       ]
      },
      {
       "why": "الـ Syntax analysis بيشيك إن الـ token stream ماشي على الـ grammar (الـ CFG) بتاعة لغة البرمجة ويبني الـ parse tree (L4).",
       "ow": [
        null,
        "الـ Semantic analysis بتشيك على المعنى (الـ types والـ declarations والـ scope) بعد ما الـ grammar يكون اتشيّك خلاص.",
        "الـ Code generation بيطلّع target code من الـ intermediate code؛ مش بيشيك على الـ grammar.",
        "الـ Code optimization بيحسّن سرعة/حجم الكود؛ وبيفترض إن البرنامج سليم grammatically من الأول."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ strings بتتعمل لها derive من الـ start symbol (L4).",
       "ow": [
        null,
        "كل derivation بتبدأ من الـ start symbol S؛ والـ language بتاعة الـ grammar هي مجموعة الـ strings اللي بتتولّد من S (L4)."
       ]
      },
      {
       "why": "بس الـ loop اللي بعدها transition على <b>نفس</b> الـ symbol هي اللي بتعمل كده؛ الـ DFAs ممكن يبقى فيها loops عادي (L3).",
       "ow": [
        "الـ DFA ممكن يبقى فيه loops؛ اللي بيخلّيه nondeterministic بس إن يبقى فيه loop على symbol وبعدها transition تانية على <b>نفس</b> الـ symbol (L3).",
        null
       ]
      },
      {
       "why": "الـ phases بتاعة الـ compiler هي lexical وsyntax وsemantic analysis، والـ intermediate code generation، والـ optimization، والـ code generation؛ إنما الـ testing ده نشاط بتاع software engineering (L1).",
       "ow": [
        null,
        "الـ Testing مش موجود في لستة الـ phases في L1 (lexical وsyntax وsemantic analysis، intermediate code، optimization، code generation)."
       ]
      },
      {
       "why": "aε = εa = a؛ الـ ε هي الـ neutral element في الـ concatenation (L2).",
       "ow": [
        "الـ ε هو الـ identity بتاع الـ concatenation: aε = εa = a، مش ε (الـ algebraic properties في L2).",
        null
       ]
      },
      {
       "why": "ده ماشي مع مفتاح الـ revision sheet بتاع الدكتور (Q52)، اللي بيقول إن الـ leftmost parsing tree بتكبر من الناحية اليمين. المحاضرات مش بتقول القاعدة دي بشكل مباشر.",
       "ow": [
        null,
        "مفتاح الـ revision sheet (Q52) اللي الدكتور ماشي بيه بيقول إن الـ leftmost parsing tree بتكبر من الناحية <b>اليمين</b>، فالجملة True."
       ]
      },
      {
       "why": "الـ Interpreters مبتطلّعش intermediate object code (L1).",
       "ow": [
        "في جدول المقارنة في L1، الـ compilers بتطلّع intermediate object code والـ interpreters لأ.",
        null
       ]
      },
      {
       "why": "الـ Synthesized attributes بتتحسب من قيم الـ attributes بتاعة ولاد الـ node، فالقيم بتطلع لفوق في الـ tree (L7).",
       "ow": [
        null,
        "ده بالظبط تعريف الـ synthesized attributes في L7؛ لو القيم جاية من الـ parent/siblings تبقى inherited."
       ]
      },
      {
       "why": "الـ compiler بيبلّغ عن الـ syntax errors؛ أما الـ runtime errors فبتظهر بس وقت التنفيذ (مفتاح الـ revision sheet في Q29: syntax بس).",
       "ow": [
        "الـ compiler بيطلّع الـ syntax errors وقت الـ compile، لكن الـ runtime errors مبتظهرش غير وإحنا بنشغّل البرنامج (مفتاح الـ sheet Q29: syntax بس).",
        null
       ]
      },
      {
       "why": "الـ Compilers بتاخد وقت طويل في الـ <b>ANALYZE</b>، بس التنفيذ بيبقى أسرع (L1؛ الـ sheet T/F 2 = False).",
       "ow": [
        "الـ Compilers بتاخد وقت طويل في إنها <b>تحلّل</b> الـ source، لكن البرنامج المتكمبل بيتنفّذ أسرع من الـ interpreter (L1).",
        null
       ]
      },
      {
       "why": "الـ Concatenation مش commutative: L1L2 بتحط strings الـ L1 الأول، فعمومًا L1L2 ≠ L2L1 (مثلًا ab ≠ ba) (L2).",
       "ow": [
        "الـ Concatenation مش commutative: عمومًا L1L2 ≠ L2L1، مثلًا {a}{b} = {ab} لكن {b}{a} = {ba} (L2).",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الشكل بتاع L1. ارسم الـ six phases، والداتا اللي بتعدّي بينهم، والـ three shared components.",
       "ans": "<pre>Source code\n   ↓\nScanner ─────────────┐\n   ↓ tokens          │\nParser               │     Literal table\n   ↓ syntax tree     │\nSemantic analyzer    ├──── Symbol table\n   ↓ annotated tree  │\nSource code optimizer│     Error handler\n   ↓ intermediate code\nCode generator       │\n   ↓ target code     │\nTarget code optimizer┘\n   ↓\nTarget code</pre>"
      },
      {
       "why": "الـ revision sheet essay Q4؛ نفس فكرة مثال arr.length → size اللي في السلايد (L9).",
       "ans": "<pre>int x = a→length-1;\nfor (i=0; i &lt; x ; i++)\n   swap_elements(a[i],a[i+1]);</pre>بدل ما نحسب length-1 في كل iteration، نخزّنه مرة واحدة في x ونستخدم x كـ terminating condition. كده length-1 بيتحسب مرة واحدة بس، وده بيوفّر processing ووقت (<b>loop optimization</b>)."
      },
      {
       "why": "نفس الـ NFA ونفس الإجابة موجودين في الـ revision sheet (Q11) وفي الـ midterm sheet.",
       "ans": "الجدول بالـ ε:<table><tr><th>State</th><th>0</th><th>1</th><th>ε</th></tr><tr><td>1</td><td>3</td><td>-</td><td>1</td></tr><tr><td>2</td><td>3</td><td>-</td><td>2</td></tr><tr><td>3</td><td>1</td><td>2,3</td><td>3</td></tr></table>الـ DFA:<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>- (dead)</td></tr><tr><td>* {3}</td><td>{1}</td><td>{2,3}</td></tr><tr><td>* {2,3}</td><td>{1,3}</td><td>{2,3}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2,3}</td></tr></table>الـ Start هو {1}؛ والـ final states: أي set فيها 3.<br>هي non-deterministic عشان state 3 فيها loop على 1 وكمان transition تانية على نفس الـ symbol 1 (رايحة لـ 2)."
      },
      {
       "why": "الـ b* = loop عند الـ start؛ الـ a+ = a واحدة عشان ندخل q1 وبعدين loop؛ وبعد كده واحدة بالظبط من c أو d. في التانية، الـ c واحدة أو أكتر <b>أو</b> الـ d واحدة أو أكتر محتاجين final states منفصلة عشان ميتخلطوش مع بعض (revision sheet Q7).",
       "ans": "<b>b*a+(c|d)</b>: الـ q0 (start، فيها loop على b) –a→ q1 (فيها loop على a)؛ q1 –c→ q2؛ q1 –d→ q2؛ والـ q2 final.<br><b>(a|b)*(c+|d+)</b>: الـ q0 (start، فيها loop على a,b) –c→ q1 (final، فيها loop على c)؛ q0 –d→ q2 (final، فيها loop على d)."
      },
      {
       "why": "Tree 1 بتحسب (id-id)+id؛ و tree 2 بتحسب id-(id+id).",
       "ans": "<pre>LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id\nLMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id\n\nTree 1:       E                Tree 2:     E\n            / |                         / |            E  +  E                      E  -  E\n         / |    |                      |   / |         E  -  E  id                     id E  +  E\n        |     |                            |     |\n        id    id                           id    id</pre>اتنين leftmost derivations (اتنين parse trees) لنفس الـ string، يبقى الـ grammar دي <b>ambiguous</b>."
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
       "why": "الـ compiler بيكتشف ويطلّع الـ syntax errors وهو بيحلّل البرنامج؛ إنما الـ logic والـ runtime errors مش بتتمسك وقت الـ compile (مفتاح الـ revision sheet في Q29: <b>syntax</b>).",
       "ow": [
        null,
        "الـ Logic errors بتدّي نتايج غلط من كود سليم؛ الـ compiler ميعرفش المبرمج كان قاصد إيه، فمش هيقدر يطلّعها.",
        "الـ Runtime errors (زي القسمة على صفر) مبتظهرش غير وإحنا بنشغّل البرنامج، بعد الـ compilation.",
        "في مفتاح الـ revision sheet (Q29) الـ compiler بيطلّع الـ syntax errors بس؛ مش الـ logic ولا الـ runtime."
       ]
      },
      {
       "why": "الـ Parsing اسم تاني للـ syntax analysis، يعني phase 2: بيقارن الـ token stream بالـ grammar ويبني الـ parse tree (L4).",
       "ow": [
        "الـ Semantic analysis هي phase 3: بتشيك على المعنى (الـ types والـ declarations) على الـ syntax tree بعد الـ parsing.",
        "الـ Lexical analysis هو الـ scanning (phase 1)، اللي بيطلّع الـ tokens اللي الـ parser بيقراها بعد كده.",
        null,
        "الـ Parsing ليه اسم في الاختيارات: هو الـ syntax analysis (L4)."
       ]
      },
      {
       "why": "الـ Keywords زي if وwhile وint دي tokens؛ الـ lexical analyzer بيتعرّف عليها وهو بيجمّع الحروف في lexemes (L2).",
       "ow": [
        "الـ Code generation آخر phase؛ ساعتها الـ keywords كانت اتعرفت من بدري كـ tokens في الـ lexical analysis.",
        "الـ Data-flow analysis جزء من الـ optimization؛ بيشتغل على الـ intermediate code، مش على الـ keywords في نص الـ source.",
        null,
        "الـ parser بيستلم الـ keywords جاهزة كـ tokens من الـ scanner؛ هو بس بيشيك على ترتيبها حسب الـ grammar."
       ]
      },
      {
       "why": "الـ revision sheet Q10: storage allocation و type checking و suppressing duplicate errors. اللي موجود هنا من دول هو storage allocation بس.",
       "ow": [
        null,
        "الـ symbol table ده structure بتاع وقت الـ compile؛ تنفيذ الكود مش من استخداماته (الـ sheet Q10: storage allocation وtype checking وsuppressing duplicate errors).",
        "الـ context-free grammar بتوصف الـ syntax (L4)؛ إنما الـ symbol table بيخزّن الأسامي والـ attributes بتاعتها، مش rules بتاعة grammar.",
        "فيه اختيار من الاستخدامات المذكورة فعلًا: الـ storage allocation (الـ revision sheet Q10)."
       ]
      },
      {
       "why": "الـ Syntax analysis بيشيك إن الـ token stream ماشي على الـ grammar (الـ CFG) بتاعة لغة البرمجة ويبني الـ parse tree (L4).",
       "ow": [
        null,
        "الـ Semantic analysis بتشيك على المعنى (الـ types والـ declarations والـ scope) بعد ما الـ grammar يكون اتشيّك خلاص.",
        "الـ Code generation بيطلّع target code من الـ intermediate code؛ مش بيشيك على الـ grammar.",
        "الـ Code optimization بيحسّن سرعة/حجم الكود؛ وبيفترض إن البرنامج سليم grammatically من الأول."
       ]
      },
      {
       "why": "الـ Testing نشاط بتاع software engineering، مش phase في الـ compiler؛ إنما الـ syntax analysis والـ semantic analysis والـ optimization كلهم phases (L1).",
       "ow": [
        "الـ Syntax analysis (الـ parsing) هو phase 2 في الـ compiler.",
        "الـ Semantic analysis هي phase 3 في الـ compiler، وبتطلّع الـ annotated syntax tree.",
        null,
        "الـ Optimization phase فعلًا: الـ source code optimizer والـ target code optimizer (L1)."
       ]
      },
      {
       "why": "الـ interior (non-leaf) nodes في الـ syntax/parse tree هي الـ non-terminals، وكل واحد فيهم بيتفرد بـ production؛ والـ leaves هي الـ terminals (L4).",
       "ow": [
        null,
        "الـ Terminal symbols هي الـ <b>LEAVES</b> بتاعة الـ tree؛ عمرها ما بتتفرد.",
        "الـ start symbol هو الـ root بس، يعني non-leaf node واحدة؛ إنما كل الـ non-leaf nodes non-terminals.",
        "فيه اختيار مظبوط: كل interior (non-leaf) node هي non-terminal بيتفرد بـ production (L4)."
       ]
      },
      {
       "why": "الـ ε-transition بتخلّي الـ automaton يتحرك من غير ما يقرا input، وده nondeterministic، فأي automaton فيه ε يبقى NFA (L3).",
       "ow": [
        "الـ DFA ليه move واحدة بالظبط لكل state وinput symbol ومفيهوش ε-moves (L3).",
        null,
        "\"FFA\" مش نوع automaton في المادة؛ النوعين هما DFA وNFA (L3).",
        "فيه اختيار مظبوط: الـ ε-transition بتخلّي الـ automaton يبقى NFA (L3)."
       ]
      },
      {
       "why": "الـ compiler بيستخدم تلات أنواع storage allocation: الـ static (الـ globals، متحددة وقت الـ compile)، والـ stack (الـ activation records)، والـ heap (الـ dynamic data) (L9).",
       "ow": [
        "اتنين ناقصين واحد من التلاتة: الـ static والـ stack والـ heap allocation (L9).",
        null,
        "هما تلاتة بس: static وstack وheap (L9).",
        "هما تلاتة بس: static وstack وheap (L9)."
       ]
      },
      {
       "why": "الـ Constant folding والـ combine operations دول peephole techniques (L9).",
       "ow": [
        "الـ Constant folding (زي إننا نبدّل 2*3 بـ 6 وقت الـ compile) تكنيك من تكنيكات الـ peephole optimization (L9).",
        "الـ Combine operations واحدة من الـ three peephole techniques (L9).",
        "الـ constant folding والـ combine operations الاتنين <b>فعلًا</b> methods للـ optimization، فمش هما الإجابة.",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ ε هو الـ identity element بتاع الـ concatenation، فـ Yε = εY = Y والطرفين متساويين (الـ algebraic properties في L2).",
       "ow": [
        "الـ ε هو الـ identity بتاع الـ concatenation: Yε = εY = Y، فالطرفين متساويين (L2).",
        null
       ]
      },
      {
       "why": "الفرق بينهم بس في أنهي non-terminal بيتبدّل الأول؛ ولا واحد فيهم الـ inverse بتاع التاني. الـ Bottom-up parsers هي اللي بتطلّع rightmost derivation <b>بالعكس</b> (L4).",
       "ow": [
        "الفرق بين الـ leftmost والـ rightmost derivation بس في أنهي non-terminal بيتبدّل الأول؛ ولا واحدة فيهم عكس التانية (L4).",
        null
       ]
      },
      {
       "why": "كل hash table ليها memory overhead، فإن يبقى فيه table لكل scope ده بيضيّع ميموري (وممكن نحتاج ندوّر في كذا table)؛ والحل table واحدة (L8).",
       "ow": [
        null,
        "L8 بتقول إن الـ memory overhead (ومعاه البحث في كذا table) هو بالظبط مشكلة الـ symbol table لكل scope."
       ]
      },
      {
       "why": "الأقواس ملهاش لازمة، والـ | عملية commutative (L2).",
       "ow": [
        null,
        "الأقواس مش بتضيف حاجة والـ | commutative، فـ (a)|((b)*(c)) = a | b*c = b*c | a (L2)."
       ]
      },
      {
       "why": "أي NFA ممكن يتحوّل لـ DFA مكافئ ليه بالـ subset construction، باستخدام الـ ε-closures والـ move sets (L3).",
       "ow": [
        null,
        "L3 بتحوّل الـ NFAs لـ DFAs بالـ subset construction؛ وكل NFA ليه DFA مكافئ."
       ]
      },
      {
       "why": "كل derivation بتبدأ من الـ start symbol S؛ والـ language بتاعة الـ CFG هي مجموعة الـ terminal strings اللي ممكن تتولّد من S (L4).",
       "ow": [
        null,
        "الـ derivation بتاعة أي sentence دايمًا بتبدأ من الـ start symbol S؛ وده اللي بيتعرّف بيه الـ language بتاعة الـ grammar (L4)."
       ]
      },
      {
       "why": "في جدول المقارنة في L1، الـ compilers بتطلّع intermediate object code والـ interpreters مبتطلّعش، فالجملة False (L1).",
       "ow": [
        "في جدول L1، الـ interpreters مبتطلّعش intermediate object code؛ الـ compilers هي اللي بتطلّعه.",
        null
       ]
      },
      {
       "why": "الـ Inherited attributes بتاخد قيمها من الـ parent و/أو الـ sibling nodes (L7؛ الـ sheet Q42).",
       "ow": [
        null,
        "ده تعريف L7 بالظبط: الـ inherited attributes بتيجي من الـ parent (و/أو الـ siblings)؛ لو القيم جاية من الولاد تبقى synthesized."
       ]
      },
      {
       "why": "الـ ε هي الـ empty string؛ مبتاكلش أي input و sε = s، فمبتغيّرش الـ expression اللي الـ automaton بيقبله. (دي إجابتنا إحنا؛ مفيش key.)",
       "ow": [
        "الـ ε هو الـ empty string ومش بياكل أي input؛ وبما إن sε = s، الـ ε-move مش بتغيّر الـ language اللي الـ automaton بيقبلها.",
        null
       ]
      },
      {
       "why": "الـ alternation a|b معناها الـ union بين الـ languages {a} و{b}، يعني الـ set {a, b} (L2).",
       "ow": [
        null,
        "a|b معناها a <b>OR</b> b: الـ union {a} ∪ {b} = {a, b} (L2)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الشكل بتاع L1 (بص على امتحان 2024/25 (50) عشان الرسمة).",
       "ans": "الـ Source code → <b>Scanner</b> → tokens → <b>Parser</b> → syntax tree → <b>Semantic analyzer</b> → annotated tree → <b>Source code optimizer</b> → intermediate code → <b>Code generator</b> → target code → <b>Target code optimizer</b> → target code. كل الـ phases متوصّلة بالـ literal table والـ symbol table والـ error handler."
      },
      {
       "why": "نفس Q2-c بتاع 2024/25 (50) بالظبط، ونفس revision sheet Q11.",
       "ans": "<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>-</td></tr><tr><td>* {3}</td><td>{1}</td><td>{2,3}</td></tr><tr><td>* {2,3}</td><td>{1,3}</td><td>{2,3}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2,3}</td></tr></table>الـ Final states: كل الـ sets اللي فيها 3."
      },
      {
       "why": "في الـ <b>By value</b>: نسخ بتدخل ومفيش حاجة بترجع، بس a[2]:=0 بتغيّر الـ global array. في الـ <b>By result</b>: مفيش value بتدخل (الـ formals بتبدأ بـ 0، زي مثال المحاضرة)، ووقت الـ return الـ j بتتنسخ في i والـ x في a[2] (الـ address اللي اتحدد وقت الـ call، i = 2)، فبتكتب فوق الـ 0. الـ revision sheet Q12 بتدي نفس الـ outputs.",
       "ans": "<table><tr><th></th><th>By value</th><th>By result</th></tr><tr><td>Before call</td><td>2 10 20 30</td><td>2 10 20 30</td></tr><tr><td>Inside</td><td>j=2→3, x=30→33<br>3 33 10 20 0</td><td>j=0→1, x=0→3<br>1 3 10 20 0</td></tr><tr><td>After call</td><td>2 10 20 0</td><td>1 10 20 3<br>(i ← j = 1, a[2] ← x = 3)</td></tr></table>"
      },
      {
       "why": "<b>Loop optimization</b> (L9؛ revision sheet Q4).",
       "ans": "<pre>int x = a→length-1;\nfor (i=0; i &lt; x ; i++)\n   swap_elements(a[i],a[i+1]);</pre>الـ length-1 بيتحسب مرة واحدة بدل ما يتحسب في كل iteration، وده بيوفّر processing time."
      },
      {
       "why": "L4.",
       "ans": "LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id (الـ root هو +).<br>LMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id (الـ root هو -).<br>اتنين leftmost derivations/parse trees مختلفين، يبقى الـ grammar دي <b>ambiguous</b> (الـ trees مرسومة في إجابة 2024/25 (50))."
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
       "why": "في سلسلة الـ phases في L1، الـ parser بيطلّع الـ syntax tree، والـ semantic analysis بتاخدها كـ input وتطلّع الـ annotated syntax tree.",
       "ow": [
        "الـ stream of tokens ده الـ input بتاع الـ syntax analysis، يعني phase قبلها.",
        null,
        "الـ annotated syntax tree هي الـ <b>OUTPUT</b> بتاع الـ semantic analysis (والـ input بتاع الـ code optimizer/الـ intermediate code).",
        "الـ Assembly code بيطلع في الآخر خالص من الـ code generator."
       ]
      },
      {
       "why": "الـ lexical analyzer (الـ scanner) بيقرا حروف الـ source program ويجمّعها في lexemes، ويطلّع stream of tokens للـ parser (L2).",
       "ow": [
        "الـ Machine code ده الـ output النهائي بتاع الـ compiler كله، مش الـ input بتاع الـ lexical analyzer.",
        "معكوسة: الـ tokens هي الـ output بتاع الـ scanner، والـ source code هو الـ input بتاعه.",
        null,
        "(b) معكوسة، فمينفعش \"both a and b\" تبقى صح؛ الصح بس source code → tokens."
       ]
      },
      {
       "why": "الـ grammar بتبقى unambiguous لما كل sentence يكون ليها rightmost derivation واحدة بس (أو leftmost واحدة)، يعني parse tree واحدة (L4).",
       "ow": [
        "الـ Ambiguous معناها إن فيه sentence ليها <b>أكتر</b> من rightmost (أو leftmost) derivation/parse tree (L4).",
        null,
        "الـ ambiguous والـ unambiguous عكس بعض؛ tree واحدة بالظبط معناها unambiguous وبس.",
        "فيه اختيار مظبوط: rightmost tree واحدة لكل sentence معناها إن الـ grammar unambiguous."
       ]
      },
      {
       "why": "الـ parser (الـ syntax analyzer) مبني من الـ context-free grammar: بيقارن الـ tokens بالـ CFG productions ويبني الـ parse tree (L4؛ الـ sheet Q17).",
       "ow": [
        "الـ Code optimization بيشتغل على الـ intermediate أو الـ target code عشان يحسّن السرعة/الحجم؛ مش بيستخدم الـ grammar.",
        "الـ Code generation بيحوّل الـ intermediate code لـ target code؛ مش مبني على rules الـ grammar.",
        "الـ Lexical analysis بيستخدم regular expressions وfinite automata (L2)، مش الـ context-free grammar.",
        null
       ]
      },
      {
       "why": "الـ interior nodes في الـ parse tree هي الـ non-terminals، وكل واحد فيهم بيتفرد بـ production لولاده؛ والـ leaves هي الـ terminals (L4).",
       "ow": [
        null,
        "الـ Terminals هي الـ <b>LEAVES</b> بتاعة الـ parse tree، مش الـ interior nodes.",
        "الـ start symbol هو الـ root بس؛ باقي الـ interior nodes non-terminals تانيين.",
        "الـ Productions مش labels على nodes؛ الـ interior node مع ولادها بتمثّل تطبيق production واحدة."
       ]
      },
      {
       "why": "الـ compiler بيكتشف الـ syntax errors وهو بيحلّل البرنامج؛ إنما الـ logic والـ runtime errors مبتظهرش غير لما البرنامج يشتغل (مفتاح الـ sheet Q29: syntax).",
       "ow": [
        "الـ Logic errors بتدّي نتايج غلط من كود سليم؛ الـ compiler ميعرفش المعنى المقصود، فمش بيطلّعها.",
        "الـ Runtime errors (زي القسمة على صفر) مبتظهرش غير وقت التنفيذ، بعد الـ compilation.",
        null,
        "الـ Runtime errors الـ compiler مش بيكتشفها، فـ \"b & c\" غلط؛ الـ syntax errors بس (الـ sheet Q29)."
       ]
      },
      {
       "why": "مفتاح الـ revision sheet بتاع الدكتور (Q52) بيقول إن الـ leftmost parsing tree بتكبر من الناحية اليمين. المحاضرات مش بتقول القاعدة دي بشكل مباشر.",
       "ow": [
        "مفتاح الـ revision sheet (Q52) بيقول right، مش left.",
        "مفتاح الـ revision sheet (Q52) بيحدد ناحية واحدة، اللي هي اليمين.",
        null,
        "مفتاح الـ revision sheet (Q52) بيحدد ناحية فعلًا: اليمين."
       ]
      },
      {
       "why": "الـ <b>Static binding</b> بيمشي على structure بتاع الـ syntax tree (L8؛ الـ sheet Q45). علامة الرصاص على (b) غلط.",
       "ow": [
        null,
        "الـ Dynamic binding بيستخدم آخر declaration اتنفّذ وقت الـ run time، مش شكل الـ tree (L8).",
        "الـ static binding بس هو اللي ماشي على شكل الـ tree؛ الـ dynamic binding ماشي على ترتيب التنفيذ (L8).",
        "فيه اختيار مظبوط: الـ static binding مبني على شكل الـ syntax tree زي الـ braces (L8)."
       ]
      },
      {
       "why": "الـ SDT اختصار Syntax Directed Translation: الـ semantic rules المربوطة بالـ CFG productions هي اللي بتسوق الـ translation (L7).",
       "ow": [
        "أول كلمة Syntax: الـ translation بتمشي حسب الـ syntax بتاع الـ grammar (الـ productions)، مش حسب \"semantics\".",
        null,
        "كلمة \"Double\" غلط: الـ SDT هي Syntax <b>DIRECTED</b> Translation (L7).",
        "الكلمتين غلط: الـ SDT هي Syntax Directed Translation، مش table (L7)."
       ]
      },
      {
       "why": "الـ Code optimization بيحسّن الـ intermediate/target code عشان البرنامج يشتغل أسرع ويستهلك ميموري أقل، من غير ما يغيّر الـ output بتاعه (L1, L9).",
       "ow": [
        null,
        "الـ Syntax analysis بيشيك على الـ grammar ويبني الـ parse tree؛ مش بيحسّن السرعة ولا الميموري.",
        "الـ Semantic analysis بتشيك على المعنى (الـ types والـ declarations)؛ مش بتحسّن السرعة ولا الميموري.",
        "فيه اختيار مظبوط: الـ code optimization هدفه بالظبط كده (L1, L9)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "كل derivation بتبدأ من الـ start symbol S؛ والـ language بتاعة الـ CFG هي مجموعة الـ terminal strings اللي ممكن تتولّد من S (L4).",
       "ow": [
        null,
        "الـ derivation بتاعة أي sentence دايمًا بتبدأ من الـ start symbol S؛ وده اللي بيتعرّف بيه الـ language بتاعة الـ grammar (L4)."
       ]
      },
      {
       "why": "الـ (X|Y)* فيها strings متلخبطة زي XY، إنما X*|Y* فيها بس strings كلها X أو كلها Y، فهما مختلفين (L2).",
       "ow": [
        "الـ (X|Y)* فيها strings متلخبطة زي XY، لكن X*|Y* فيها بس strings كلها X أو كلها Y، فمش متساويين (L2).",
        null
       ]
      },
      {
       "why": "دي data structure بتستخدمها الـ phases، مش phase (L1).",
       "ow": [
        "الـ symbol table دي data structure مشتركة بين كل الـ phases، مش phase في الـ compiler (L1).",
        null
       ]
      },
      {
       "why": "الـ DFA ممكن يبقى فيه loops؛ مثلًا الـ DFA بتاعة 1*01(0|1)* فيها 1-loop على q0 و0,1-loop على الـ final state (L2/L3).",
       "ow": [
        null,
        "الـ Loops مش بتخلّي الـ automaton nondeterministic؛ الـ DFA بتاعة 1*01(0|1)* فيها two loops (L2/L3)."
       ]
      },
      {
       "why": "فيه source code optimizer + target code optimizer (L1).",
       "ow": [
        null,
        "L1 فيها الاتنين: source code optimizer (على الـ intermediate code) وtarget code optimizer (على الـ assembly/target code)."
       ]
      },
      {
       "why": "الـ Left recursion بتعمل infinite loop في الـ top-down parsers؛ لازم تشيلها الأول (L5–6).",
       "ow": [
        "الـ left-recursive production بتخلّي الـ top-down (LL(1)) parser يلف في loop مالهاش نهاية؛ لازم نشيل الـ left recursion الأول (L5–6).",
        null
       ]
      },
      {
       "why": "الـ Tokens بتطلع من الـ lexical analysis (الـ scanner)؛ والـ syntax analysis بياخدها عشان يبني الـ parse tree (L2).",
       "ow": [
        "الـ Syntax analysis بياخد الـ tokens؛ هي بتتولّد قبله في الـ lexical analysis (الـ scanner) (L2).",
        null
       ]
      },
      {
       "why": "الـ Peephole optimization بيشتغل على مجموعة instructions صغيرة اسمها الـ peephole أو الـ window، ويبدّلها بكود أقصر/أسرع (L9).",
       "ow": [
        null,
        "ده تعريف L9 بالظبط: optimization على حتة صغيرة من الكود اسمها الـ peephole أو الـ \"window\"."
       ]
      },
      {
       "why": "هي بتطلّع الـ annotated syntax tree (L1, L7).",
       "ow": [
        "الـ Semantic analysis بتطلّع الـ annotated syntax tree؛ مفيش output اسمه \"semantic table\" (L1, L7).",
        null
       ]
      },
      {
       "why": "دي اسمها inherited؛ الـ synthesized بتيجي من الـ children (L7).",
       "ow": [
        "القيم اللي جاية من الـ parent nodes دي تعريف الـ <b>INHERITED</b> attributes؛ الـ synthesized بتاخد قيمها من الولاد (L7).",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "L7؛ revision sheet Q13.",
       "ans": "الـ SDT بتضيف augmented (translation) rules للـ grammar عشان تسهّل الـ semantic analysis. بتعدّي المعلومات bottom-up و/أو top-down في الـ parse tree على شكل attributes متعلقة بالـ nodes، باستخدام الـ lexical values والـ constants والـ attributes. بتبني الـ parse/syntax tree وتحسب قيم الـ attributes عند الـ nodes وهي بتزورهم بترتيب معيّن، فبتطلّع الـ <b>annotated syntax tree</b>. بشكل عام، الـ SDT بتربط set of attributes بكل grammar node، و set of translation rules بكل production."
      },
      {
       "why": "في الـ <b>Static</b>: بعد القوس اللي بيقفل، الـ a اللي جوه بتبقى out of scope، فبنستخدم الـ a اللي برا = 10. في الـ <b>Dynamic</b> (حسب convention الكورس، مثال lecture 8): آخر declaration قابلناه (a = 30) لسه هو اللي بيتستخدم.",
       "ans": "<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Inner block: b = 20 × 30</td><td>600</td><td>600</td></tr><tr><td>After block: b += a</td><td>600 + 10 = <b>610</b> (outer a)</td><td>600 + 30 = <b>630</b> (most recent a)</td></tr><tr><td>Output</td><td>600 610</td><td>600 630</td></tr></table>"
      },
      {
       "why": "L4.",
       "ans": "LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id<br>LMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id<br>Tree 1 الـ root بتاعها + و (id-id) على الشمال؛ و tree 2 الـ root بتاعها - و (id+id) على اليمين. اتنين trees، يبقى الـ grammar دي <b>ambiguous</b>."
      },
      {
       "why": "الـ {2} على a بتروح لـ 2 و 3 الاتنين، فبتدّينا {2,3}؛ ومن {2,3}، الـ a بتودّي 2 → {2,3} و 3 → ولا حاجة. الـ transitions الناقصة بتروح لـ dead state.",
       "ans": "<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→ {0}</td><td>{1}</td><td>{2}</td></tr><tr><td>{1}</td><td>-</td><td>{3}</td></tr><tr><td>{2}</td><td>{2,3}</td><td>-</td></tr><tr><td>* {2,3}</td><td>{2,3}</td><td>-</td></tr><tr><td>* {3}</td><td>-</td><td>-</td></tr></table>الـ Final states: {3} و {2,3}. الـ DFA دي بتقبل ab | ba+.<br>هي NFA عشان state 2 فيها loop على a وكمان transition تانية على a (رايحة لـ 3)."
      },
      {
       "why": "شوف جدول الـ stack/input كامل في امتحان 2024/25 (60).",
       "ans": "نفس الـ grammar ونفس الـ string بتوع Q1-e في 2024/25 (60).<br>الـ FIRST: S = U = {(, a, d}؛ V = {a, ε}؛ W = {c, ε}.<br>الـ FOLLOW: S = {$, ), b}؛ U = {a, c, $, ), b}؛ V = {c, $, ), b}؛ W = {$, ), b}.<br>الـ Table: M[S,(]=M[S,a]=M[S,d] = S→UVW؛ M[U,(]=U→(S)؛ M[U,a]=U→aSb؛ M[U,d]=U→d؛ M[V,a]=V→aV؛ M[V,c|b|)|$]=V→ε؛ M[W,c]=W→cW؛ M[W,b|)|$]=W→ε.<br>الـ Actions: S→UVW, U→(S), match (, S→UVW, U→d, match d, V→ε, W→cW, match c, W→ε, match ), V→aV, match a, V→ε, W→cW, match c, W→ε, accept."
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
       "why": "فيه source code optimizer و target code optimizer؛ والـ target code في المحاضرة هو assembly (MOV, MUL…) (L1).",
       "ow": [
        "الـ optimization التانية بتحصل على الـ target code، اللي في المحاضرة هو assembly (MOV, MUL …)، مش machine code خام.",
        null,
        "الـ optimization الأولى بتحصل على ناحية الـ source (الـ intermediate code من الـ source optimizer)، مش على الـ assembly؛ التانية هي اللي على الـ assembly.",
        "الـ optimization التانية على الـ target (assembly) code؛ الـ binary/machine code مش هو المكان اللي الـ target optimizer بتاع المحاضرة بيشتغل عليه."
       ]
      },
      {
       "why": "الـ CFG هي 4-tuple (V, Σ, P, S): non-terminals وterminals وproductions وstart symbol. مفيش حاجة اسمها \"end symbol\" (L4).",
       "ow": [
        "الـ start symbol S واحد من الأربع أجزاء بتوع الـ CFG (V, Σ, P, S).",
        "الـ non-terminals V واحد من الأربع أجزاء بتوع الـ CFG (V, Σ, P, S).",
        null,
        "الـ terminals Σ واحد من الأربع أجزاء بتوع الـ CFG (V, Σ, P, S)."
       ]
      },
      {
       "why": "الـ Keywords زي if وwhile وint دي tokens؛ الـ lexical analyzer بيتعرّف عليها وهو بيجمّع الحروف في lexemes (L2).",
       "ow": [
        "الـ Code generation آخر phase؛ الـ keywords كانت اتعرفت من بدري كـ tokens في الـ lexical analysis.",
        null,
        "الـ Semantic analysis بتشيك على المعنى (الـ types والـ declarations) على الـ syntax tree؛ الـ keywords بتكون وصلت كـ tokens خلاص.",
        "الـ Derivation مفهوم بتاع الـ grammar (إعادة الكتابة بالـ productions، L4)، مش الخطوة اللي بتتعرّف على الـ keywords."
       ]
      },
      {
       "why": "الـ symbol table دي data structure مشتركة بين كل الـ phases، مش phase في حد ذاتها؛ إنما الـ lexical والـ syntax والـ semantic analysis phases (L1).",
       "ow": [
        "الـ Syntax analysis (الـ parsing) هو phase 2 في الـ compiler.",
        "الـ Semantic analysis هي phase 3 في الـ compiler.",
        null,
        "الـ Lexical analysis (الـ scanning) هو phase 1 في الـ compiler."
       ]
      },
      {
       "why": "الـ leaves في الـ parse tree هي الـ terminals؛ ولو قريناها من الشمال لليمين بتطلع الـ sentence اللي اتولّدت. والـ interior nodes هي الـ non-terminals (L4).",
       "ow": [
        "الـ Non-terminals هي الـ <b>INTERIOR</b> nodes، وكل واحد فيهم بيتفرد بـ production؛ عمرها ما بتبقى leaves في tree كاملة.",
        null,
        "الـ start symbol بيبقى على الـ root بتاع الـ parse tree، مش على الـ leaves.",
        "الـ Productions مش labels على nodes؛ الـ interior node مع ولادها بتمثّل تطبيق production واحدة."
       ]
      },
      {
       "why": "الـ compiler بيبلّغ عن الـ syntax errors بس؛ الـ logic والـ runtime errors بتظهر وقت التنفيذ.",
       "ow": [
        "الـ Syntax errors الـ compiler <b>بيطلّعها</b> فعلًا (الـ sheet Q29)، فمش هي الإجابة.",
        "صحيح الـ logic errors مش بتطلع، بس الـ runtime errors كمان مش بتطلع، فالإجابة الكاملة \"b & c\".",
        "صحيح الـ runtime errors مش بتطلع، بس الـ logic errors كمان مش بتطلع، فالإجابة الكاملة \"b & c\".",
        null
       ]
      },
      {
       "why": "الـ grammar بتبقى unambiguous لما كل sentence يكون ليها leftmost derivation واحدة بس (أو rightmost واحدة)، يعني parse tree واحدة (L4).",
       "ow": [
        "الـ Ambiguous معناها إن فيه sentence ليها <b>أكتر</b> من leftmost (أو rightmost) derivation/parse tree (L4).",
        null,
        "الـ ambiguous والـ unambiguous عكس بعض؛ tree واحدة بالظبط معناها unambiguous وبس.",
        "فيه اختيار مظبوط: leftmost tree واحدة لكل sentence معناها إن الـ grammar unambiguous."
       ]
      },
      {
       "why": "الـ Semantic analysis بتستخدم attribute grammar (CFG + attributes + semantic rules) عشان تحوّل الـ syntax tree لـ annotated syntax tree (L7).",
       "ow": [
        "الـ CFG العادية مفيهاش attributes ولا semantic rules، فمتقدرش تعمل annotate للـ tree؛ الـ semantic analysis محتاجة attribute grammar.",
        "الترتيب غلط: الـ input هو الـ syntax tree والـ output هو الـ annotated syntax tree، مش \"semantic\" tree.",
        null,
        "الـ CFG العادية متقدرش تعمل annotate، والـ output اسمه annotated syntax tree، مش \"semantic tree\" (L7)."
       ]
      },
      {
       "why": "الـ input بتاع الـ parser هو الـ stream of tokens اللي طلّعه الـ scanner؛ والـ output بتاعه هو الـ syntax tree (سلسلة الـ phases في L1).",
       "ow": [
        null,
        "الـ syntax tree هي الـ <b>OUTPUT</b> بتاع الـ syntax analysis والـ input بتاع الـ semantic analysis.",
        "الـ annotated syntax tree هي الـ output بتاع الـ semantic analysis، يعني بعدها بخطوتين.",
        "الـ Assembly code بيطلع في الآخر من الـ code generator (الـ target code)."
       ]
      },
      {
       "why": "الـ Stack allocation بيشيل الـ activation records (الـ locals والـ parameters والـ return addresses) اللي بتتعمل لما نعمل call لـ procedure/function وبتتشال لما ترجع (L9).",
       "ow": [
        "الـ Objects اللي حجمها وعمرها ثابت بتستخدم <b>STATIC</b> allocation، اللي بيتحدد وقت الـ compile، مش الـ stack.",
        null,
        "الكود نفسه بيتحط في الـ static (text) area، مش على الـ stack.",
        "(a) ده static allocation مش stack، فـ \"a & b\" غلط؛ الـ procedure/function calls بس هي اللي بتستخدم الـ stack."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Static binding بيحل الأسامي باستخدام شكل الـ syntax tree (الـ braces/الـ blocks)، من نص البرنامج بس، وقت الـ compile (L8).",
       "ow": [
        null,
        "ده تعريف الـ static binding في L8: الـ scoping ماشي على شكل الـ tree زي الـ braces."
       ]
      },
      {
       "why": "الـ NFA مش لازم يبقى فيه loop: الـ ε-transition لوحدها (أو two moves على نفس الـ symbol) كفاية تخلّيه nondeterministic (L3).",
       "ow": [
        "الـ NFA مش لازم يبقى فيه loop؛ ε-transition أو two moves على نفس الـ symbol كفاية يخلّوه nondeterministic (L3).",
        null
       ]
      },
      {
       "why": "الـ Union عملية commutative: L1 ∪ L2 = L2 ∪ L1 (L2).",
       "ow": [
        "الـ Union commutative: L1 ∪ L2 = L2 ∪ L1، فالترتيب مش فارق (الـ concatenation هي العملية اللي الترتيب فيها بيفرق) (L2).",
        null
       ]
      },
      {
       "why": "الـ automaton ممكن يبقى فيه كذا accept state؛ مثلًا الـ DFAs اللي بنبنيها من الـ NFAs في L3 كتير بيبقى فيها أكتر من final state.",
       "ow": [
        "كذا accept state مسموح؛ الـ DFA اللي طالعة من تحويل الـ NFA في L3 فيها 3 final states من 4.",
        null
       ]
      },
      {
       "why": "\"The earliest point of most optimization steps is just after semantic analysis\" يعني أبدر نقطة لمعظم خطوات الـ optimization هي بعد الـ semantic analysis على طول (L1).",
       "ow": [
        null,
        "L1 بتقول إن أبدري نقطة لمعظم خطوات الـ optimization هي بعد الـ semantic analysis على طول، على الـ annotated tree/الـ intermediate code."
       ]
      },
      {
       "why": "دي عكس مفتاح الـ revision sheet اللي بيقول \"a leftmost parsing tree grows from the right side\". مش مذكورة بشكل مباشر في المحاضرات.",
       "ow": [
        null,
        "المادة ماشية على اصطلاح الـ revision sheet (Q52: الـ leftmost بتكبر من اليمين)، فالـ rightmost tree بتكبر من الشمال: True."
       ]
      },
      {
       "why": "فيه كمان redundant load/store elimination و combine operations و loop optimization (L9).",
       "ow": [
        "L9 فيها تكنيكات تانية: الـ redundant load/store elimination والـ combine operations (والـ loop optimization كمان)، فالـ constant folding مش الوحيد.",
        null
       ]
      },
      {
       "why": "فيه Static (ثابت) وكمان stack و heap (بيكبروا ويصغروا) (L9).",
       "ow": [
        null,
        "الـ runtime environment بيستخدم الاتنين فعلًا: الـ static storage (حجم ثابت) والـ stack والـ heap اللي بيكبروا ويصغروا وقت الـ run time (L9)."
       ]
      },
      {
       "why": "الـ SDT اختصار <b>Syntax</b> Directed Translation، مش Semantic Directed Translation: الـ semantic rules المربوطة بالـ CFG productions هي اللي بتسوقها (L7).",
       "ow": [
        "الـ SDT اختصار Syntax Directed Translation: الـ rules المربوطة بالـ productions بتاعة الـ grammar هي اللي بتسوقها (L7).",
        null
       ]
      },
      {
       "why": "الـ Synthesized attributes بتتحسب من قيم الـ attributes بتاعة ولاد الـ node، فالقيم بتطلع لفوق في الـ tree (L7).",
       "ow": [
        null,
        "ده بالظبط تعريف الـ synthesized attributes في L7؛ لو القيم جاية من الـ parent/siblings تبقى inherited."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "جدول L1.",
       "ans": "<table><tr><th>Interpreter</th><th>Compiler</th></tr><tr><td>Translates one statement at a time</td><td>Scans the entire program and translates it as a whole</td></tr><tr><td>Less analysis time, slower overall execution</td><td>More analysis time, faster overall execution</td></tr><tr><td>No intermediate object code, so memory efficient</td><td>Generates intermediate object code that needs linking, so more memory</td></tr><tr><td>JavaScript, Python, Ruby</td><td>C, C++, Java</td></tr></table>"
      },
      {
       "why": "في tree 1 أول A → 1S والتانية A → 1. في tree 2 أول A → 1 والتانية A → 1S. الـ revision sheet essay Q2 بتستخدم نفس الـ derivations.",
       "ans": "<pre>LMD 1: S ⇒ 0A ⇒ 00AA ⇒ 001SA ⇒ 0011BA ⇒ 00110A ⇒ 001101\nLMD 2: S ⇒ 0A ⇒ 00AA ⇒ 001A  ⇒ 0011S  ⇒ 00110A ⇒ 001101\n\nTree 1:  S                    Tree 2:  S\n        /                            /        0   A                         0   A\n         / |                          / |         0  A  A                       0  A  A\n          /                            |  /          1   S  1                        1 1   S\n            /                                /            1   B                             0   A\n               |                                 |\n               0                                 1</pre>اتنين leftmost derivations/parse trees مختلفين، يبقى الـ grammar دي <b>ambiguous</b>."
      },
      {
       "why": "الـ {S} على 0: الـ loop بتاعة S و S → R بيدّونا {S,R}. الـ {S,R} على 0: الـ S بتدّي {S,R} والـ R بتدّي S، يبقى {S,R}؛ وعلى 1: الـ R بتدّي {R,M}. الـ {R,M} على 0: R → S و M → R، يبقى {S,R}؛ وعلى 1: {R,M}.",
       "ans": "<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {S}</td><td>{S,R}</td><td>- (dead)</td></tr><tr><td>* {S,R}</td><td>{S,R}</td><td>{R,M}</td></tr><tr><td>* {R,M}</td><td>{S,R}</td><td>{R,M}</td></tr></table>الـ Start هو {S}؛ والـ final states هي {S,R} و {R,M} (عشان فيهم R)."
      },
      {
       "why": "في الـ <b>Static</b>: بعد الـ block، الـ x اللي برا = 1 بتبقى visible تاني، فـ y = 8 + 1 = 9. في الـ <b>Dynamic</b> (حسب convention الكورس): بنستخدم آخر x = 6، فـ y = 8 + 6 = 14 والـ x بتتطبع 6.",
       "ans": "<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Inner block (x = 6, y = 2+6)</td><td>x= 6 y= 8</td><td>x= 6 y= 8</td></tr><tr><td>After block</td><td>x= 1 y= 9</td><td>x= 6 y= 14</td></tr></table><b>Optimizations</b>:<br>1) <b>Constant folding</b>: <code>int x = 3*2</code> → <code>int x = 6</code>؛ <code>result = (2+3)*sqrt(2*8)</code> → <code>result = 5*sqrt(16)</code> → <code>result = 20</code>. بتتحسب مرة واحدة وقت الـ compile.<br>2) <b>Combine operations</b>: الـ expression كلها بتبقى constant assignment واحد.<br>3) <b>Dead code elimination</b>: الـ d و s[10] (والـ result كمان، عمرها ما اتستخدمت) ممكن نشيلهم عشان نوفّر ميموري."
      },
      {
       "why": "الـ A → Abc | b فيها left recursion، فلازم تتحوّل الأول. FOLLOW(A) = FIRST(B) = {d}، FOLLOW(A') = FOLLOW(A)، FOLLOW(B) = {e}.",
       "ans": "نشيل الـ left recursion: S → aABe, A → bA', A' → bcA' | ε, B → d.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{a}</td><td>{$}</td></tr><tr><td>A</td><td>{b}</td><td>{d}</td></tr><tr><td>A'</td><td>{b, ε}</td><td>{d}</td></tr><tr><td>B</td><td>{d}</td><td>{e}</td></tr></table>الـ Table: M[S,a] = S→aABe؛ M[A,b] = A→bA'؛ M[A',b] = A'→bcA'؛ M[A',d] = A'→ε؛ M[B,d] = B→d.<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>abbcde$</td><td>S→aABe</td></tr><tr><td>aABe$</td><td>abbcde$</td><td>match a</td></tr><tr><td>ABe$</td><td>bbcde$</td><td>A→bA'</td></tr><tr><td>bA'Be$</td><td>bbcde$</td><td>match b</td></tr><tr><td>A'Be$</td><td>bcde$</td><td>A'→bcA'</td></tr><tr><td>bcA'Be$</td><td>bcde$</td><td>match b</td></tr><tr><td>cA'Be$</td><td>cde$</td><td>match c</td></tr><tr><td>A'Be$</td><td>de$</td><td>A'→ε</td></tr><tr><td>Be$</td><td>de$</td><td>B→d</td></tr><tr><td>de$</td><td>de$</td><td>match d</td></tr><tr><td>e$</td><td>e$</td><td>match e</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>الـ string اتعملها accept، يبقى هي صح."
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
       "why": "الـ parser بياخد الـ stream بتاع الـ tokens من الـ scanner ويبني parse/syntax tree (سلسلة الـ phases في L1، و L4). أما \"source code, tokens\" فده وصف الـ <b>LEXICAL</b> analyzer.",
       "ow": [
        "الـ Machine code بيطلع في الآخر خالص من الـ code generator، والـ tokens هي الـ <b>INPUT</b> بتاع الـ parser مش الـ output بتاعه (سلسلة الـ phases في L1).",
        null,
        "source code داخل وtokens طالعة ده وصف الـ <b>LEXICAL</b> analyzer (الـ scanner)، الـ phase اللي قبل الـ parser (L1, L2).",
        "ولا a ولا b صح: a بتخلط الـ output بتاع الـ code generator مع الـ tokens، وb بتوصف الـ scanner مش الـ parser (L1)."
       ]
      },
      {
       "why": "الـ tokens بتتوصف بالـ regular expressions وبيتعرفوا بالـ finite automata (L2). الـ CFG بتعمل model للـ syntax analysis، والـ attribute grammar للـ semantic analysis، والـ symbol table دي data structure.",
       "ow": [
        "الـ Context free grammar بتوصف الـ <b>SYNTAX</b> analysis (الـ parser)، مش الـ lexical analysis (L4).",
        "الـ symbol table دي data structure مشتركة بين كل الـ phases، مش modeling criterion للـ scanner (L1).",
        null,
        "الـ Attribute grammar بتوصف الـ <b>SEMANTIC</b> analysis، اللي بتعمل annotate للـ syntax tree (L7)."
       ]
      },
      {
       "why": "الـ peephole techniques في L9: redundant load/store elimination، constant folding، combine operations. باقي الاختيارات متألفة.",
       "ow": [
        "مفيش حاجة اسمها 'token optimization'؛ الـ tokens بتاعة الـ lexical analysis. تكنيكات الـ peephole في L9 هي redundant load/store elimination وconstant folding وcombine operations.",
        null,
        "الـ annotated syntax tree هي الـ output بتاع الـ semantic analyzer (L1)، مش تكنيك peephole. L9 فيها redundant load/store elimination وconstant folding وcombine operations.",
        "تحويل الـ NFA لـ DFA تبع الـ lexical analysis (L3)، مش الـ peephole optimization، اللي بيشتغل على window صغيرة من الكود المتولّد (L9)."
       ]
      },
      {
       "why": "الـ definite-assignment states في L7: definitely assigned، definitely unassigned، unknown (سؤال Q41 في الـ revision sheet).",
       "ow": [
        null,
        "'Definitely known' مش واحدة من حالات الـ definite assignment؛ الحالات هي definitely assigned وdefinitely unassigned وunknown (الـ revision sheet Q41-43).",
        "'Indefinitely assigned' مش حالة؛ المتغير اللي ممكن يكون اتعمله assign وممكن لأ اسمه 'unknown' (الـ revision sheet Q43).",
        "فيه اختيار صح: المتغير اللي متأكدين إنه اتعمله assign اسمه 'definitely assigned' (الـ revision sheet Q41)."
       ]
      },
      {
       "why": "الـ leaves هي الـ terminals؛ والـ interior nodes هي الـ non-terminals (L4).",
       "ow": [
        null,
        "مفيش حاجة اسمها 'sub-terminal' في الـ CFG؛ الـ symbols يا terminals (الـ leaves) يا non-terminals (الـ interior nodes) (L4).",
        "مفيش حاجة اسمها 'half-terminal' في الـ CFG؛ الـ leaves بتاعة الـ parse tree هي الـ terminals (L4).",
        "الـ Non-terminals هي الـ interior nodes في الـ parse tree (والـ root هو الـ start symbol)؛ بتتفرد لولاد، فمش leaves (L4)."
       ]
      },
      {
       "why": "الـ semantic analyzer بيحوّل الـ syntax tree لـ annotated tree (L1؛ سؤال Q36 في الـ revision sheet).",
       "ow": [
        "الـ Syntax analysis بيطلّع الـ syntax (parse) tree العادية؛ وبعدين الـ semantic analyzer هو اللي بيعملها annotate (سلسلة الـ phases في L1).",
        null,
        "الـ Lexical analysis بيطلّع stream of tokens، مش tree (L1, L2).",
        "الـ code optimizer بياخد الـ annotated tree/الـ intermediate code كـ <b>INPUT</b> ويطلّع optimized intermediate code (L1)."
       ]
      },
      {
       "why": "الـ Testing مش phase في الـ compiler (L1؛ سؤال Q30 في الـ revision sheet).",
       "ow": [
        "الـ Syntax analysis (الـ parsing) هو تاني phase في الـ compiler (سلسلة الـ phases في L1).",
        null,
        "الـ Lexical analysis (الـ scanning) هو أول phase في الـ compiler (سلسلة الـ phases في L1).",
        "فيه اختيار مش phase <b>فعلًا</b>: الـ testing بيتعمل على البرامج، مش الـ compiler هو اللي بيعمله (L1)."
       ]
      },
      {
       "why": "الـ CFG هي (V, Σ, P, S): non-terminals و terminals و productions و start symbol. مفيش حاجة اسمها \"end symbol\" (L4؛ سؤال Q23 في الـ sheet).",
       "ow": [
        null,
        "الـ start symbol S واحد من الأربع أجزاء بتوع الـ CFG (V, T, P, S) (L4).",
        "الـ Non-terminals (الـ variables، V) واحد من الأربع أجزاء بتوع الـ CFG (L4).",
        "الـ Terminals (T، الـ tokens) واحد من الأربع أجزاء بتوع الـ CFG (L4)."
       ]
      },
      {
       "why": "الـ key بتاع سؤال Q29 في الـ revision sheet: syntax. الـ logic والـ runtime errors مش بتبان غير لما البرنامج يشتغل.",
       "ow": [
        null,
        "الـ Logic errors (algorithm غلط) بتتكمبل عادي؛ الـ compiler ميقدرش يكتشفها. مفتاح المادة: الـ compiler بيطلّع الـ syntax errors (الـ revision sheet Q29).",
        "الـ Runtime errors مبتظهرش غير لما البرنامج يتنفّذ، بعد الـ compilation. مفتاح المادة بيقول الـ compiler بيطلّع الـ syntax errors (الـ sheet Q29).",
        "الـ compiler مش بيطلّعهم كلهم: الـ logic والـ runtime errors بيعدّوا منه. مفتاح الـ sheet Q29: الـ syntax errors بس."
       ]
      },
      {
       "why": "الإجابة هي \"synthesized attributes\" (L7)، ودي مش موجودة في الاختيارات. الاختيارات اتنقلت من سؤال تاني (غلطة طباعة)، فالاختيار الوحيد الصح هو \"none of the mentioned\".",
       "ow": [
        "الـ leftmost parsing tree دي parse tree، مش نوع attribute. الـ attributes اللي بتاخد قيمها من الولاد اسمها synthesized attributes (L7).",
        "الـ Leftmost derivation طريقة لفرد الـ non-terminals (L4)، مش نوع attribute. الإجابة synthesized attributes (L7).",
        "الـ Rightmost derivation ترتيب derivation (L4)، مش نوع attribute. الإجابة synthesized attributes (L7).",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ intermediate code موجود عشان مانحتاجش compiler جديد كامل لكل target machine (سؤال Q51 في الـ revision sheet: \"eliminate the need of a unique compiler for each machine\")، والـ compilers فعلًا بتطلّع intermediate code (L1). الإجابة المقصودة True. بالظبط كده، الورقة المفروض تقول \"full compiler\" مش \"full interpreter\".",
       "ow": [
        null,
        "False غلط: الـ compilers فعلًا بتطلّع intermediate code (L1) عشان نفس الـ front end يتعاد استخدامه ومنحتاجش compiler جديد كامل لكل machine (الـ sheet Q51)."
       ]
      },
      {
       "why": "الـ peephole optimization بيشتغل على أي window صغيرة من الكود (L9). الـ loop optimization دي technique منفصلة.",
       "ow": [
        "True غلط: الـ peephole optimization بيبص على أي window صغيرة من الـ target code، زي إنه يشيل redundant load/store (L9). مش لازم يبقى فيه loops.",
        null
       ]
      },
      {
       "why": "الـ symbol table دي data structure كل الـ phases بتستخدمها، مش phase (L1).",
       "ow": [
        "True غلط: الـ symbol table دي data structure بتستخدمها كل الـ phases (الـ sheet Q24)، مش واحدة من الـ phases في سلسلة L1.",
        null
       ]
      },
      {
       "why": "جدول L1: الـ interpreters بتعمل analysis بسرعة بس وقت التنفيذ في المجمل أبطأ من الكود اللي اتعمله compile. (قارن بـ T/F 2 في الـ revision sheet: \"Compilers take long time to execute source code\" = False.)",
       "ow": [
        null,
        "False غلط: حسب L1، الـ interpreters بتحلّل بسرعة بس التنفيذ في المجمل أبطأ من تشغيل كود متكمبل."
       ]
      },
      {
       "why": "في العموم L1L2 ≠ L2L1، مثلًا {a}{b} = {ab} لكن {b}{a} = {ba} (L2؛ T/F 11 في الـ sheet).",
       "ow": [
        null,
        "False غلط: الـ concatenation مش commutative؛ {a}{b} = {ab} لكن {b}{a} = {ba}، فالترتيب فارق (L2؛ الـ sheet T/F 11)."
       ]
      },
      {
       "why": "فيه طريقتين: table لكل scope أو table واحدة لكل الـ scopes؛ وفيه كذا implementation (lists، BST، hash table) (L8؛ T/F 6 في الـ sheet).",
       "ow": [
        "True غلط: L8 بتدّي two approaches (table لكل scope، أو table واحدة لكل الـ scopes) وكذا structure زي الـ lists والـ BST والـ hash table.",
        null
       ]
      },
      {
       "why": "الـ SDT معناها Syntax Directed Translation: الـ semantic actions/rules بتتربط بالـ productions بتاعة الـ grammar (الـ syntax)، فـ 'Semantic Directed' غلط (L7).",
       "ow": [
        "True غلط: الـ SDT اختصار Syntax Directed Translation، يعني semantic rules مربوطة بالـ grammar productions (L7).",
        null
       ]
      },
      {
       "why": "الـ optimization هدفه يقلّل استخدام الميموري ويزوّد السرعة، مثلًا بإنه يشيل الـ redundant loads/stores والـ dead code (L1، L9).",
       "ow": [
        null,
        "False غلط: الـ optimizer هدفه يقلّل الميموري ويزوّد السرعة، زي إنه يشيل الـ redundant load/store والـ dead code (L1, L9)."
       ]
      },
      {
       "why": "L3: الـ ε (empty-string) transition من علامات الـ NFA؛ وعمود الـ DFA في الجدول بيقول إن الـ DFA مينفعش يستخدم empty-string transitions.",
       "ow": [
        "True غلط: جدول L3 بيقول إن الـ DFA مش قادر يعمل empty-string (ε) transition؛ الـ NFA بس هو اللي يقدر.",
        null
       ]
      },
      {
       "why": "الـ derivation بيبدأ من الـ start symbol S (L4).",
       "ow": [
        "True غلط: كل derivation بتبدأ من الـ start symbol S بتاع الـ grammar وبتبدّل الـ non-terminals لحد ما يفضل terminals بس (L4).",
        null
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "جدول L1؛ والـ essay Q10 في الـ revision sheet.",
       "ans": "<table><tr><th>Interpreter</th><th>Compiler</th></tr><tr><td>بيترجم البرنامج statement واحدة في المرة</td><td>بيعمل scan للبرنامج كله ويترجمه مرة واحدة لـ machine code</td></tr><tr><td>وقت أقل في الـ analysis للـ source code، بس التنفيذ في المجمل أبطأ</td><td>وقت أكتر في الـ analysis للـ source code، بس التنفيذ في المجمل أسرع</td></tr><tr><td>مش بيطلّع intermediate object code، فبيبقى موفّر في الميموري</td><td>بيطلّع intermediate object code محتاج linking، فبيحتاج ميموري أكتر</td></tr><tr><td>JavaScript, Python, Ruby</td><td>C, C++, Java</td></tr></table>"
      },
      {
       "why": "في tree 1 أول A في 0AA بتستخدم A → 1S (و S → 1B → 10) وتاني A بتستخدم A → 1. في tree 2 أول A بتستخدم A → 1 والتانية بتستخدم A → 1S (S → 0A → 01). الاتنين بيطلّعوا 0·0·1·1·0·1. نفس الـ essay Q2 في الـ revision sheet وورقة 2023/24 (50).",
       "ans": "<pre>LMD 1: S ⇒ 0A ⇒ 00AA ⇒ 001SA ⇒ 0011BA ⇒ 00110A ⇒ 001101\nLMD 2: S ⇒ 0A ⇒ 00AA ⇒ 001A  ⇒ 0011S  ⇒ 00110A ⇒ 001101\n\nTree 1:  S                    Tree 2:  S\n        /                            /        0   A                         0   A\n         / |                          / |         0  A  A                       0  A  A\n          /                            |  /          1   S  1                        1 1   S\n            /                                /            1   B                             0   A\n               |                                 |\n               0                                 1</pre>اتنين leftmost derivations مختلفين (يعني two parse trees مختلفين) لنفس الـ string 001101، يبقى الـ grammar دي ambiguous."
      },
      {
       "why": "الـ subset construction من {1}: الـ {1} على 0 → {3}. الـ {3} على 0 → {1,3} (الـ edge لـ 1 زائد الـ loop)؛ وعلى 1 → {2}. الـ {1,3} على 0 → {3} ∪ {1,3} = {1,3}؛ وعلى 1 → {2}. الـ {2} على 0 → {3}؛ وعلى 1 مفيش. مفيش sets جديدة بتظهر، فالـ DFA فيها 4 states زائد dead state. الـ label بتاع الـ loop في الـ scan هو نفس شكل باقي الـ 0 labels، وواضح إنه مختلف عن الـ \"1\" اللي على الـ edge 3 → 2.",
       "ans": "<b>السبب</b>: الـ state 3 عندها loop على 0 و transition تانية على نفس الـ symbol 0 (لـ 1)، فـ δ(3, 0) = {1, 3} ليها اتنين next states محتملين.<br>الـ Transition table (بالـ ε):<table><tr><th>State</th><th>0</th><th>1</th><th>ε</th></tr><tr><td>1</td><td>3</td><td>-</td><td>1</td></tr><tr><td>2</td><td>3</td><td>-</td><td>2</td></tr><tr><td>3</td><td>1,3</td><td>2</td><td>3</td></tr></table>DFA:<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>∅ (dead)</td></tr><tr><td>* {3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>{2}</td><td>{3}</td><td>∅ (dead)</td></tr></table>الـ Start = {1}. الـ Final states = الـ sets اللي فيها 3: {3} و {1,3}.<br><br><b>لو قرينا الـ loop على إنها 1</b> (نسخة الـ revision sheet / 2024/25: 3 –1→ 3): السبب = الـ state 3 عندها loop على 1 و transition تانية على 1 (لـ 2). DFA: {1} –0→ {3}; {3} –0→ {1}, –1→ {2,3}; {2,3} –0→ {1,3}, –1→ {2,3}; {1,3} –0→ {1,3}, –1→ {2,3}؛ والـ finals هي {3}، {2,3}، {1,3}."
      },
      {
       "why": "الـ Static: بعد قفلة الـ brace الـ i الداخلية بتطلع برا الـ scope، فبنستخدم الـ i اللي برا = 10. الـ Dynamic (حسب convention الكورس، L8 وسؤال Q9 في الـ revision sheet): آخر declaration اتنفذ (i = 3) لسه هو اللي بيتستخدم. الـ Symbol table: نفس شكل سؤال Q9 في الـ revision sheet (x → [1|YES|next] → [0|YES|NULL]، y → [0|YES|NULL])؛ الـ i الداخلية بتاعة scope 1 بتقعد قدّام الـ i اللي برا بتاعة scope 0.",
       "ans": "(i)<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>الـ Inner block: w = 20 + 3</td><td>23</td><td>23</td></tr><tr><td>بعد الـ block: w += i</td><td>23 + 10 = <b>33</b> (الـ i اللي برا)</td><td>23 + 3 = <b>26</b> (آخر i)</td></tr><tr><td>Output</td><td>23 33</td><td>23 26</td></tr></table>(ii) hash table واحدة، كل identifier → linked list فيها الـ declarations بتاعته، والأحدث في الأول (الـ fields: scope | initialized? | next):<pre>i  ->  [ 1 | YES | next ] -> [ 0 | YES | NULL ]\nw  ->  [ 0 | YES | NULL ]</pre>"
      },
      {
       "why": "حسب convention الكورس (مثال الـ concentrate في L9، وسؤال Q12 في الـ revision sheet): الـ by result مش بيدخّل أي قيمة، فالـ formals بتبدأ بـ 0؛ وعند الـ return الـ formals بتتنسخ تاني لعناوين الـ actuals اللي اتحددت وقت الـ call (a[1]، مش a[الـ i الجديدة]). الـ a[2] := 0 بتغيّر الـ global array على طول ومش بتتكتب فوقها لأن الـ x مربوطة بـ a[1]. اتراجعت مرتين: الـ result 2+0=2، 0+8=8؛ والـ value-result 1+2=3، 4+8=12.",
       "ans": "الـ call هو method(i, a[1]) لأن i = 1: y ↔ i، x ↔ a[1].<table><tr><th></th><th>By result</th><th>By value-result</th></tr><tr><td>قبل الـ call</td><td>1 2 4 6</td><td>1 2 4 6</td></tr><tr><td>الـ Copy in</td><td>مفيش: y = 0, x = 0</td><td>y = 1, x = 4</td></tr><tr><td>جوّه</td><td>y = 2, x = 8, a = {2,4,0}<br><b>2 8 2 4 0</b></td><td>y = 3, x = 12, a = {2,4,0}<br><b>3 12 2 4 0</b></td></tr><tr><td>الـ Copy back</td><td>i ← 2, a[1] ← 8</td><td>i ← 3, a[1] ← 12</td></tr><tr><td>بعد الـ call</td><td><b>2 2 8 0</b></td><td><b>3 2 12 0</b></td></tr></table>"
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
       "why": "الـ scanner بيجمّع سلاسل الحروف في وحدات ليها معنى اسمها tokens، زي الـ identifiers والـ brackets في a[index]=4+2 (L1, L2؛ الـ revision sheet Q2).",
       "ow": [
        null,
        "الـ Lines مش هي وحدة الـ scanning؛ الـ scanner بيجمّع الحروف في وحدات ليها معنى اسمها tokens (L1, L2).",
        "كلمة 'Groups' عامة أوي؛ الوحدات اللي ليها معنى اللي الـ scanner بيطلّعها اسمها tokens (L1, L2).",
        "الـ Packets مصطلح networking؛ الـ lexical analysis بيطلّع tokens (L1, L2)."
       ]
      },
      {
       "why": "الـ semantic analysis بيستخدم attribute grammar عشان يحوّل الـ syntax tree لـ annotated syntax tree (L7). الـ Context free grammar بتعمل model للـ <b>SYNTAX</b> analysis (سؤال Q3 في الـ sheet).",
       "ow": [
        "الـ high-level language هي الـ source language بتاعة الـ compiler، مش model للـ semantic analysis، اللي بتستخدم attribute grammar (L7).",
        "الـ Low-level language ده الـ target بتاع الـ code generation، مش الـ model بتاع الـ semantic analysis (الـ attribute grammar، L7).",
        "الـ Context free grammar بتوصف الـ <b>SYNTAX</b> analysis (L4؛ الـ sheet Q3)؛ الـ semantic analysis بتوسّعها بالـ attributes (الـ attribute grammar، L7).",
        null
       ]
      },
      {
       "why": "امشي على الـ key بتاع الدكتور في الـ revision sheet (right)؛ ونفس السؤال موجود في ورقة 2023/24 (60).",
       "ow": [
        "مفتاح المادة (الـ revision sheet Q52) بيقول إن الـ leftmost parsing tree بتكبر من الناحية <b>اليمين</b> (والـ rightmost من الشمال)، فـ 'left' متعلّمة غلط.",
        null,
        "الـ tree مش بتكبر بالتساوي من الناحيتين؛ مفتاح المادة (الـ sheet Q52) بيقول إن الـ leftmost parsing tree بتكبر من اليمين.",
        "'Center' مش ناحية نمو؛ مفتاح المادة (الـ sheet Q52) بيقول إن الـ leftmost parsing tree بتكبر من اليمين."
       ]
      },
      {
       "why": "الـ regular expressions بتوصف الـ tokens؛ والـ finite automata بتتعرف عليهم (L2؛ سؤال Q6 في الـ sheet).",
       "ow": [
        "الـ Finite automata لوحدها ناقصة: هي اللي بت<b>تعرّف</b> على الـ tokens إنما الـ regular expressions هي اللي بت<b>وصفها</b>، فالاتنين بيستخدموا (L2؛ الـ sheet Q6).",
        "الـ Regular expressions لوحدها ناقصة: بتوصف الـ token patterns والـ finite automata بتتعرّف عليها، فالاتنين بيستخدموا (L2).",
        "الـ Context free grammar بتوصف الـ syntax للـ parser (L4)، مش مطابقة الـ tokens في الـ scanner.",
        null
       ]
      },
      {
       "why": "سلسلة الـ phases في L1 هي scanner وparser وsemantic analyzer وoptimizer وcode generator وtarget optimizer. الـ Testing مش phase (الـ revision sheet Q30).",
       "ow": [
        "الـ Syntax analysis (الـ parser) هو تاني phase في الـ compiler (سلسلة الـ phases في L1).",
        "الـ Semantic analysis phase في الـ compiler: بتحوّل الـ syntax tree لـ annotated tree (L1).",
        null,
        "الـ Optimization phase في الـ compiler: الـ source code optimizer والـ target code optimizer موجودين في سلسلة L1."
       ]
      },
      {
       "why": "الـ parser بيـ check البرنامج على الـ CFG (L4؛ سؤال Q18 في الـ sheet).",
       "ow": [
        "الـ Code optimization بيحسّن intermediate/target code اتشيّك خلاص عشان السرعة والميموري (L1, L9)؛ مش بيشيك على الـ grammar.",
        "الـ Semantic analysis بتشيك على المعنى (الـ types والـ declarations) على الـ syntax tree (L7)، بعد ما الـ grammar يكون اتشيّك.",
        "الـ Code generation بيطلّع target code من الـ intermediate code (L1, L9)؛ الـ grammar اتشيّك قبل كده في الـ parser.",
        null
       ]
      },
      {
       "why": "في الـ parse/syntax tree الـ leaves هي الـ terminal symbols (الـ tokens)، والـ interior nodes، ومنها الـ root اللي هو الـ start symbol، هي الـ non-terminals (L4).",
       "ow": [
        "الـ Non-terminals هي الـ interior nodes في الـ tree لأنها بتتفرد لولاد (L4).",
        null,
        "الـ start symbol هو الـ <b>ROOT</b> بتاع الـ tree، مش leaf (L4).",
        "فيه اختيار صح: الـ leaves هي الـ terminal symbols (L4)."
       ]
      },
      {
       "why": "الـ symbol table بتتعامل مع تقريبًا كل phase وهي نفسها مش phase (L1؛ سؤال Q24 في الـ sheet).",
       "ow": [
        "الـ symbol table دي data structure مش phase؛ مش موجودة في سلسلة الـ phases في L1 (الـ sheet Q24).",
        "الـ Automata بتتبني من الـ regular expressions في الـ lexical analysis (L2, L3)؛ إنما الـ symbol table بيخزّن معلومات الـ identifiers.",
        null,
        "فيه اختيار صح: الـ symbol table بتستخدمه (وبتتعامل معاه) كل الـ phases بتاعة الـ compiler (L1؛ الـ sheet Q24)."
       ]
      },
      {
       "why": "الـ Stack والـ heap هما الـ dynamic؛ والـ text/static ثابتين. الـ Queue والـ array مش أنواع storage في الـ runtime layout (L9).",
       "ow": [
        null,
        "الـ queue مش من أنواع الـ storage؛ L9 فيها static وstack وheap.",
        "الـ array دي data structure، مش نوع runtime storage؛ L9 فيها static وstack وheap، والـ heap هو اللي بيتعمله allocate dynamically.",
        "الـ Text (الكود) هو الجزء الثابت من الميموري المعروف وقت الـ compile، مش dynamically allocated (L9)."
       ]
      },
      {
       "why": "الاتنين peephole techniques (L9؛ سؤال Q50 في الـ sheet). الـ annotated syntax tree ده output الـ semantic analyzer.",
       "ow": [
        "الـ Constant folding لوحده ناقص: الـ combine operations كمان تكنيك peephole في L9، فالإجابة الكاملة 'a and b'.",
        "الـ Combine operations لوحدها ناقصة: الـ constant folding كمان تكنيك peephole في L9، فالإجابة الكاملة 'a and b'.",
        null,
        "الـ annotated syntax tree هي الـ output بتاع الـ semantic analyzer (L1)، مش method للـ optimization."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ compilers بتطلّع intermediate object code؛ الـ interpreters لأ (L1).",
       "ow": [
        null,
        "False غلط: سلسلة الـ phases في L1 بتورّي إن الـ compiler بيطلّع intermediate code (زي الـ three-address code والـ p-code) قبل الـ code generation."
       ]
      },
      {
       "why": "دي الـ synthesized attributes؛ أما الـ inherited فبتيجي من الـ parent و/أو الـ siblings (L7؛ T/F 14 في الـ sheet).",
       "ow": [
        "True غلط: إن القيم تيجي من الولاد ده تعريف الـ <b>SYNTHESIZED</b> attributes؛ الـ inherited بتيجي من الـ parent و/أو الـ siblings (L7).",
        null
       ]
      },
      {
       "why": "الـ memory overhead دي مشكلة إن يبقى فيه table <b>لكل scope</b>؛ الـ single table هي الحل (L8).",
       "ow": [
        "True غلط: الـ memory overhead دي مشكلة hash table <b>لكل SCOPE</b>؛ L8 بتقدّم الـ single table كحل بـ overhead أقل.",
        null
       ]
      },
      {
       "why": "الـ interpreters بتعمل analysis بسرعة بس التنفيذ في المجمل أبطأ من الكود اللي اتعمله compile (L1).",
       "ow": [
        null,
        "False غلط: حسب L1، الـ interpreters بتحلّل بسرعة بس التنفيذ في المجمل أبطأ من تشغيل كود متكمبل."
       ]
      },
      {
       "why": "الـ Concatenation مش commutative: L1L2 في العموم مش زي L2L1، مثلًا {a}{b} = {ab} بينما {b}{a} = {ba}، فالترتيب فارق (L2).",
       "ow": [
        null,
        "False غلط: الـ concatenation مش commutative؛ {a}{b} = {ab} لكن {b}{a} = {ba} (L2)."
       ]
      },
      {
       "why": "الـ derivation دايمًا بتبدأ من الـ start symbol S بتاع الـ grammar وبتفضل تبدّل الـ non-terminals لحد ما يفضل terminals بس (L4).",
       "ow": [
        "True غلط: الـ derivations بتبدأ من الـ start symbol S بس، مش من أي non-terminal (L4).",
        null
       ]
      },
      {
       "why": "الـ ε هو الـ empty string والـ identity بتاع الـ concatenation: لو حطيته قبل أو بعد أي string Y، الـ Y مبتتغيّرش، فـ Yε = εY = Y (L2).",
       "ow": [
        null,
        "False غلط: الـ ε طولها صفر، فلو عملنالها concatenate على أي ناحية من Y مفيش حاجة بتتغيّر؛ Yε = εY = Y (L2)."
       ]
      },
      {
       "why": "L9 بتقسّم الـ runtime storage لـ static و<b>STACK</b> وheap (الـ sheet Q49). الـ queue مش نوع storage، فالجملة غلط.",
       "ow": [
        "True غلط: التلات أنواع هما static و<b>STACK</b> وheap (L9)؛ الـ stack storage هو اللي بيدير الـ procedure calls والـ activations، مش queue.",
        null
       ]
      },
      {
       "why": "الـ DFAs ممكن يبقى فيها loops. الـ loop بس لو معاها transition تانية على <b>نفس</b> الـ symbol (أو ε move) هي اللي بتعمل non-determinism (L3).",
       "ow": [
        "True غلط: الـ DFAs ممكن يبقى فيها loops. L3: الـ non-determinism بييجي من الـ ε moves، أو من loop على symbol وبعدها transition على <b>نفس</b> الـ symbol.",
        null
       ]
      },
      {
       "why": "L9: الـ peephole optimization بيشتغل على حتة صغيرة (window اسمها 'peephole') من الكود، باستخدام الـ redundant load/store elimination والـ constant folding والـ combine operations (الـ sheet T/F 15).",
       "ow": [
        null,
        "False غلط: L9 بتعرّف الـ peephole optimization إنه code optimization بيتعمل على حتة صغيرة من الكود."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "نفس كود ورقة 2023/24 (50). الـ Static: بعد الـ block الـ x اللي برا = 1 بتبقى visible تاني، فـ y = 8 + 1 = 9. الـ Dynamic (حسب convention الكورس): آخر declaration x = 6 لسه هو اللي بيتستخدم، فـ y = 8 + 6 = 14 والـ x بتتطبع 6.",
       "ans": "<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Inner block (x = 6, y = 2 + 6)</td><td>x= 6 y= 8</td><td>x= 6 y= 8</td></tr><tr><td>After block (y += x)</td><td>x= 1 y= 9</td><td>x= 6 y= 14</td></tr></table><b>الـ Optimizations</b>:<br>1) <b>Constant folding</b>: <code>int x = 3*2</code> → <code>int x = 6</code>; <code>result = (2+3)*sqrt(2*8)</code> → <code>result = 5*sqrt(16)</code> → <code>result = 20</code>. بتتحسب مرة واحدة وقت الـ compile بدل وقت الـ run.<br>2) <b>Combine operations</b>: الـ expression كلها بتبقى constant assignment واحد.<br>3) <b>Dead code elimination</b>: الـ d و s[10] عمرهم ما اتستخدموا (والـ result اتعملها assign بس عمرها ما اتستخدمت)، فممكن نشيلهم عشان نوفّر ميموري."
      },
      {
       "why": "L7؛ والـ essay Q13 في الـ revision sheet.",
       "ans": "الـ SDT بتضيف augmented (translation) rules على الـ grammar عشان تسهّل الـ semantic analysis. بتعدّي المعلومات bottom-up و/أو top-down في الـ parse tree على شكل <b>attributes</b> متعلّقة في الـ nodes. الطريقة العامة إننا نبني parse tree أو syntax tree ونحسب قيم الـ attributes عند الـ nodes بتاعتها وإحنا بنزورهم بترتيب معيّن، فيطلع الـ <b>annotated syntax tree</b>. في العموم، الـ SDT بتزوّد الـ CFG بإنها تربط (1) مجموعة attributes بكل grammar symbol/node و (2) مجموعة translation (semantic) rules بكل production، باستخدام attributes و constants و lexical values. مثال: E → E1 + T { E.val = E1.val + T.val } بيدّي E.val = 14 لـ 2+3*4."
      },
      {
       "why": "جوّه الأقواس فيه طريقة واحدة بس نجيب بيها num / num (الـ / مش ممكن تيجي غير من op). الـ ambiguity في الـ +: tree 1 بتستخدم op → +، و tree 2 بتستخدم op → ε و E → +E. الاتنين derivations دول leftmost (الـ leftmost non-terminal بيتبدّل في كل خطوة).",
       "ans": "الـ + ممكن تطلع يا إما كـ binary operator (op → +) يا إما كـ unary plus (E → +E) بعد operator فاضي (op → ε).<pre>LMD 1: E ⇒ E op E ⇒ (E) op E ⇒ (E op E) op E ⇒ (num op E) op E\n         ⇒ (num / E) op E ⇒ (num / num) op E ⇒ (num / num) + E\n         ⇒ (num / num) + num\nLMD 2: E ⇒ E op E ⇒ (E) op E ⇒ (E op E) op E ⇒ (num op E) op E\n         ⇒ (num / E) op E ⇒ (num / num) op E ⇒ (num / num) E      [op → ε]\n         ⇒ (num / num) + E ⇒ (num / num) + num                  [E → +E]\n\nTree 1:            E                 Tree 2:            E\n             /     |                             /     |                 E      op     E                      E      op     E\n          / |     |      |                    / |     |     /          (  E  )   +     num                  (  E  )   ε    +   E\n          / |                                 / |              |\n         E  op  E                             E  op  E          num\n         |  |   |                             |  |   |\n        num /  num                           num /  num</pre>نفس الـ string ليها اتنين leftmost derivations مختلفين و two parse trees مختلفين، يبقى الـ grammar دي ambiguous."
      },
      {
       "why": "الـ {0} على a → {2}، وعلى b → {1}. الـ {2} على a → {1}. الـ {1} على a → {1,2} (الـ loop + الـ edge لـ 2). الـ {1,2} على a → {1,2} ∪ {1} = {1,2}. مفيش state ليها b-move غير 0. اتراجعت مرتين.",
       "ans": "دي NFA لأن الـ state 1 عندها loop على a و transition تانية على a (لـ 2).<br>الـ NFA table:<table><tr><th>State</th><th>a</th><th>b</th></tr><tr><td>0</td><td>2</td><td>1</td></tr><tr><td>1</td><td>1,2</td><td>-</td></tr><tr><td>2</td><td>1</td><td>-</td></tr></table>DFA:<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→ {0}</td><td>{2}</td><td>{1}</td></tr><tr><td>* {2}</td><td>{1}</td><td>∅ (dead)</td></tr><tr><td>{1}</td><td>{1,2}</td><td>∅ (dead)</td></tr><tr><td>* {1,2}</td><td>{1,2}</td><td>∅ (dead)</td></tr></table>الـ Start = {0}. الـ Final states = الـ sets اللي فيها 2: {2} و {1,2}. كل الـ b-moves ما عدا اللي من {0} بتروح لـ dead state (أو بنسيبها)."
      },
      {
       "why": "نفس الـ grammar والـ string بتوع ورقة 2023/24 (50). الـ A → Abc | b فيها left recursion، فلازم تتكتب من الأول. FOLLOW(A) = FIRST(B) = {d}؛ FOLLOW(A') = FOLLOW(A) = {d}؛ FOLLOW(B) = {e}. مفيش خانة في الـ table فيها اتنين entries، يبقى الـ grammar دي LL(1).",
       "ans": "نشيل الـ left recursion: S → aABe, A → bA', A' → bcA' | ε, B → d.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{a}</td><td>{$}</td></tr><tr><td>A</td><td>{b}</td><td>{d}</td></tr><tr><td>A'</td><td>{b, ε}</td><td>{d}</td></tr><tr><td>B</td><td>{d}</td><td>{e}</td></tr></table>الـ Table: M[S,a] = S→aABe; M[A,b] = A→bA'; M[A',b] = A'→bcA'; M[A',d] = A'→ε; M[B,d] = B→d.<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>abbcde$</td><td>S→aABe</td></tr><tr><td>aABe$</td><td>abbcde$</td><td>match a</td></tr><tr><td>ABe$</td><td>bbcde$</td><td>A→bA'</td></tr><tr><td>bA'Be$</td><td>bbcde$</td><td>match b</td></tr><tr><td>A'Be$</td><td>bcde$</td><td>A'→bcA'</td></tr><tr><td>bcA'Be$</td><td>bcde$</td><td>match b</td></tr><tr><td>cA'Be$</td><td>cde$</td><td>match c</td></tr><tr><td>A'Be$</td><td>de$</td><td>A'→ε</td></tr><tr><td>Be$</td><td>de$</td><td>B→d</td></tr><tr><td>de$</td><td>de$</td><td>match d</td></tr><tr><td>e$</td><td>e$</td><td>match e</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>الـ input اتعمله accept، يبقى abbcde جملة صح في الـ grammar."
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
       "why": "الـ lexical analyzer (الـ scanner) بيقرا الـ characters بتاعة الـ source program ويجمّعها في tokens، وبيبعتها للـ parser (L1، L2).",
       "ow": [
        "الـ machine code ده الـ output النهائي بتاع الـ code generator، مش الـ input بتاع الـ scanner؛ الـ scanner بياخد source code ويطلّع tokens (L1، L2).",
        "ده معكوس: الـ tokens هي الـ OUTPUT بتاع الـ lexical analysis، والـ source code هو الـ input بتاعه (L2).",
        null,
        "بما إن (a) و (b) الاتنين غلط، فـ 'both' مينفعش تكون صح؛ الـ scanner بياخد source code ويطلّع tokens (L2)."
       ]
      },
      {
       "why": "الـ lexical analysis بيعمل scan للـ character stream من الشمال لليمين ويجمّع الـ characters في وحدات ليها معنى اسمها tokens (keywords، identifiers، operators...) (L2).",
       "ow": [
        null,
        "الـ lines دي مجرد الشكل الفيزيائي للـ source؛ الوحدات اللي الـ scanner بيطلّعها هي tokens، مش lines (L2).",
        "كلمة 'Groups' مش المصطلح التقني؛ مجموعات الـ characters اللي الـ scanner بيكوّنها اسمها tokens (lexemes متطابقة مع token types) (L2).",
        "الـ packets دي تبع الـ networking مش الـ compilers؛ الـ lexical analysis بيقسّم الـ characters لـ tokens (L2)."
       ]
      },
      {
       "why": "الـ syntax analysis مبني على context-free grammar: الـ parser بيشوف هل الـ token stream ممكن يتعمله derive من الـ CFG، وبيبني الـ parse tree (L4).",
       "ow": [
        "الـ high-level language ده الحاجة اللي بنحللها، مش الـ formal model؛ الـ parser مبني على context-free grammar (L4).",
        "الـ low-level language ده الهدف بتاع الترجمة، مش model للـ parsing؛ الـ syntax analysis بيستخدم CFG (L4).",
        null,
        "الـ regular grammars/expressions بتوصف الـ LEXICAL phase (الـ tokens)؛ مبتعرفش تعبّر عن الـ nesting، عشان كده الـ syntax analysis بيستخدم CFG (L2، L4)."
       ]
      },
      {
       "why": "تعريف L1. الـ (b) بتوصف interpreter، والـ (c) assembler، والـ (d) loader.",
       "ow": [
        null,
        "إنه يبان كأنه بينفّذ الـ source program على طول ده وصف الـ interpreter، مش الـ compiler؛ الـ compiler بيطلّع object program (L1).",
        "ترجمة الـ assembly language لـ machine language دي شغلانة الـ assembler؛ الـ compiler بيترجم high-level language (L1).",
        "إنك تحط البرامج في الـ memory وتجهّزها للتنفيذ دي شغلانة الـ loader، مش الـ compiler (L1)."
       ]
      },
      {
       "why": "الـ Parsing بيحدد هل string من الـ tokens ممكن الـ grammar تطلّعها ولا لأ (L4).",
       "ow": [
        "كلمة 'Analyzing' عامة ومش محددة؛ المصطلح المحدد لإنك تتأكد إن الـ tokens ممكن الـ grammar تطلّعها هو الـ parsing (L4).",
        null,
        "الـ translating ده شغل الـ compiler كله (من source لـ target)، مش الـ check بتاع هل الكلام تبع الـ grammar، اللي هو الـ parsing (L1، L4).",
        "كلمة 'Recognizing' مش الاسم اللي المحاضرة بتستخدمه؛ إنك تحدد هل الـ grammar بتطلّع الـ token string ده اسمه parsing (L4)."
       ]
      },
      {
       "why": "الـ token patterns بتتكتب كـ regular expressions وبيتعرف عليها بالـ finite automata (NFA/DFA مبنيين منها)، فـ (a) و (b) الاتنين بيوصفوا الـ token matching (L2، L3).",
       "ow": [
        "الـ finite automata لوحدها نص الإجابة بس؛ الـ regular expressions كمان بتوصف الـ token patterns، فالإجابة a and b (L2، L3).",
        "الـ regular expressions لوحدها نص الإجابة بس؛ الـ finite automata هي اللي بتتعرف عليها، فالإجابة a and b (L2، L3).",
        "الـ context-free grammars بتوصف الـ syntax للـ PARSER، مش الـ token matching في الـ scanner (L4).",
        null
       ]
      },
      {
       "why": "الـ scanner (الـ lexical analyzer) بيجمّع الـ characters في tokens (L1).",
       "ow": [
        null,
        "الـ code generator بيحوّل الـ intermediate code لـ target machine code؛ مش بيجمّع characters في tokens (L1).",
        "الـ code optimizer بيحسّن الـ intermediate/target code؛ تجميع الـ characters في tokens ده شغل الـ scanner (L1).",
        "الـ parser بـ<b>يستقبل</b> الـ tokens ويبني الـ syntax tree؛ اللي بيكوّن الـ tokens هو الـ scanner (L1، L4)."
       ]
      },
      {
       "why": "الـ Type checking ده static semantics، وبيتعمل بالـ SDT/attribute rules أثناء الـ semantic analysis (L1، L7).",
       "ow": [
        "الـ code optimization بيشتغل بعد ما الـ semantic checks تخلص؛ الـ type checking بيحصل قبل كده، عن طريق SDT rules في الـ semantic analysis (L1، L7).",
        null,
        "الـ lexical analysis بيكوّن tokens بس ومايعرفش حاجة عن الـ types؛ الـ type checking بيتعمل بالـ SDT أثناء الـ semantic analysis (L2، L7).",
        "الـ syntax analysis بيتأكد من structure الـ grammar بس؛ الـ type compatibility ده semantic check بيعمله الـ SDT (L4، L7)."
       ]
      },
      {
       "why": "الـ lexical analysis (الـ scanning) بيقرا الـ source characters من الشمال لليمين ويجمّعها في tokens؛ وهو أول phase في الـ compiler (L1، L2).",
       "ow": [
        "الـ 'Modeling' مش phase في الـ compiler؛ قراية الـ characters وتجميعها في tokens ده الـ lexical analysis (L1، L2).",
        "الـ 'Diversion' مش مصطلح في الـ compilers أصلًا؛ العملية الموصوفة هي الـ lexical analysis (الـ scanning) (L2).",
        null,
        "الـ lexical analysis بس هو اللي ينفع؛ الـ modeling والـ diversion مش phases في الـ compiler، فـ 'all of the mentioned' غلط (L1)."
       ]
      },
      {
       "why": "L8/L9: الـ symbol table بتدعم الـ type checking والـ scope resolution والـ storage allocation.",
       "ow": [
        "الـ storage allocation استخدام واحد، بس الـ symbol table كمان بتدعم الـ type checking والـ error handling، فالإجابة 'all' (L8، L9).",
        "الـ type compatibility checking استخدام واحد بس مش الوحيد؛ الـ storage allocation والـ error handling بيستخدموها كمان (L8).",
        "منع تكرار رسايل الـ error استخدام واحد، بس الـ storage allocation والـ type checking بيستخدموها برضه، فاختار 'all' (L8).",
        null
       ]
      },
      {
       "why": "الـ code generation والـ syntax analyzer والـ lexical analyzer كلهم phases في سلسلة الـ phases بتاعة L1، فالإجابة all of the mentioned.",
       "ow": [
        "الـ code generation فعلًا phase، بس الـ syntax والـ lexical analysis كمان phases، فالإجابة 'all of the mentioned' (L1).",
        "الـ syntax analyzer فعلًا phase، بس الاختيارين التانيين كمان phases، فالإجابة 'all of the mentioned' (L1).",
        "الـ lexical analyzer فعلًا phase، بس الـ code generation والـ syntax analysis كمان phases، فـ 'all of the mentioned' هي الصح (L1).",
        null
       ]
      },
      {
       "why": "الـ compiler بيترجم الـ source program لـ target machine code، والـ machine code ده binary code، فالـ official key بيختار A و C الاتنين (L1).",
       "ow": [
        "الـ machine code صح بس ده نص الـ key؛ الـ machine code هو نفسه binary code، فالـ key بيختار 'Both A and C' (L1).",
        "الـ key مش بيختار 'executable code': الـ compiler بيطلّع object (machine) code لسه محتاج linking عشان يبقى executable (L1).",
        "الـ binary code صح بس ده نص الـ key؛ هو نفسه الـ machine code، فالإجابة 'Both A and C' (L1).",
        null
       ]
      },
      {
       "why": "الـ syntax analysis (الـ parsing) بيتأكد إن الـ token stream ماشي على الـ grammar بتاعة اللغة، باستخدام الـ CFG، وبيطلّع الـ syntax errors (L1، L4).",
       "ow": [
        null,
        "الـ semantic analysis بيتأكد من المعنى (types، declarations، scope)، مش الـ grammar؛ الـ grammar بتتشيك في الـ syntax analysis (L1، L7).",
        "الـ code generation بيطلّع الـ target code بعد كل الـ checks؛ الـ grammar بتتشيك قبل كده، في الـ syntax analysis (L1، L4).",
        "الـ code optimization بيحسّن كود اتشيك عليه خلاص؛ تشييك الـ grammar بيعمله الـ syntax analysis (L1، L4)."
       ]
      },
      {
       "why": "الـ parsing هو عملية إنك تلاقي parse tree لـ string من الـ tokens، يعني توضّح الـ grammar بتطلّعه إزاي (L4).",
       "ow": [
        "كلمة 'Analyzing' عامة أوي؛ العملية اللي بتلاقي parse tree لـ token string اسمها parsing (L4).",
        "كلمة 'Recognizing' مش مصطلح المحاضرة؛ إنك تلاقي parse tree للـ tokens ده parsing (L4).",
        null,
        "الـ tokenizing (الـ lexical analysis) هو اللي بيطلّع الـ tokens؛ إنك تلاقي parse tree ليها ده parsing (L2، L4)."
       ]
      },
      {
       "why": "الـ Top-down (LL) parsers بتطلّع leftmost derivation؛ والـ bottom-up parsers بتطلّع rightmost derivation in reverse (L4، L6).",
       "ow": [
        "الـ leftmost derivation in reverse مش حاجة أي parser في المحاضرة بيبنيها؛ الـ top-down بيدي leftmost derivation (L4، L6).",
        null,
        "الـ rightmost derivation in reverse ده اللي الـ BOTTOM-UP parser بيطلّعه، مش الـ top-down (L4).",
        "الـ top-down parsers بتعمل expand لأشمل non-terminal الأول، فبتدي leftmost derivation (مش rightmost) (L4، L6)."
       ]
      },
      {
       "why": "الـ Top-down parsing بيبدأ من الـ root (الـ start symbol) ويعمل expand ناحية الـ input (L4، L6).",
       "ow": [
        "الـ bottom-up parsing بيبدأ من الـ input symbols ويعمل reduce لحد الـ start symbol، يعني الاتجاه العكسي (L4).",
        null,
        "الـ top-down parsing بينطبق على الوصف بالظبط، فـ 'none of the mentioned' غلط (L4، L6).",
        "الـ top-down بس هو اللي بيبدأ من الـ start symbol؛ الـ bottom-up بيروح من الـ input للـ start symbol، فمش الاتنين (L4)."
       ]
      },
      {
       "why": "الـ parser بيشتغل بالـ context-free grammar: بيشوف هل الـ tokens ممكن تتعمل derive من الـ grammar وبيبني الـ parse tree (L4).",
       "ow": [
        "الـ code optimization بيحسّن الـ intermediate code؛ مش بيعتمد على الـ grammar زي الـ parser (L4، L9).",
        "الـ code generation بيحوّل الـ intermediate code لـ target code؛ مفهوم الـ grammar بيستخدمه الـ parser أساسًا (L4).",
        null,
        "الـ lexical analysis بيستخدم regular expressions و finite automata، مش الـ CFG؛ الـ parser هو الـ phase المبني على الـ grammar (L2، L4)."
       ]
      },
      {
       "why": "الـ syntax analysis هو اللي بيشيك على الـ grammar بتاعة البرنامج: الـ parser بيقارن الـ token stream بالـ CFG وبيطلّع الـ syntax errors (L1، L4).",
       "ow": [
        "الـ code optimization بيشتغل على كود عدّى كل الـ checks خلاص؛ تشييك الـ grammar ده الـ syntax analysis (L1، L4).",
        "الـ semantic analysis بيشيك على المعنى (types، declarations)، مش الـ grammar؛ ده شغل الـ syntax analysis (L1، L7).",
        "الـ code generation هو آخر phase وبيطلّع الـ target code؛ مش بيشيك على الـ grammar (L1).",
        null
       ]
      },
      {
       "why": "الـ keywords (if، while، int...) دي token types، فالـ scanner بيتعرف عليها أثناء الـ lexical analysis لما بيجمّع الـ characters في tokens (L2).",
       "ow": [
        "الـ code generation آخر phase وبيشتغل على الـ intermediate code؛ الـ keywords اتعرفت من بدري، في الـ lexical analysis (L1، L2).",
        "الـ data flow analysis دي optimization technique؛ الـ keywords بيتعرف عليها كـ tokens في الـ lexical analysis (L2).",
        null,
        "الـ parsing بيستلم الـ keywords وهي متعرفة كـ tokens خلاص؛ التعرّف عليها شغل الـ scanner (L2، L4)."
       ]
      },
      {
       "why": "'More execution time' مش صفة في الـ compiler: البرامج اللي اتعملها compile بتتنفذ <b>أسرع</b>؛ الـ interpreters هي اللي تنفيذها أبطأ (جدول L1).",
       "ow": [
        null,
        "دي صفة في الـ compiler فعلًا: الـ errors بتظهر بعد ما يحلل البرنامج كله بس، فالـ debugging أبطأ من الـ interpreter (L1).",
        "دي صفة في الـ compiler فعلًا: البرنامج مايشتغلش غير بعد ما كل الـ syntax errors تتشال ويتعمله compile (L1).",
        "دي صفة في الـ compiler فعلًا: بيعمل scan للبرنامج كله ويترجمه مرة واحدة، عكس الـ interpreter اللي بيمشي statement by statement (L1)."
       ]
      },
      {
       "why": "الـ left recursion هو إن non-terminal A يطلّع string بادئ بـ A نفسه (A → Aα)؛ ولازم يتشال عشان الـ top-down parsing (L4-5).",
       "ow": [
        "الـ leftmost derivation معناه إنك تبدّل أشمل non-terminal في كل خطوة؛ مالوش علاقة بإن A يطلّع نفسه (L4).",
        null,
        "الـ left factoring بيشيل الـ common prefixes من الـ alternatives (A → αβ1 | αβ2)؛ مش إن A يطلّع A في الأول (L4-5).",
        "الـ 'Left parsing' مش هو المصطلح؛ إن non-terminal يطلّع نفسه كأشمل symbol ده اسمه left recursion (L4-5)."
       ]
      },
      {
       "why": "في الـ leftmost derivation، أشمل non-terminal في الـ sentential form هو اللي بيتبدل في كل خطوة (L4).",
       "ow": [
        "الـ left recursion ده خاصية في الـ grammar (A → Aα)، مش ترتيب derivation؛ إنك تبدّل أشمل non-terminal ده leftmost derivation (L4).",
        "'Left non-terminal' مش نوع derivation؛ الاسم الصح leftmost derivation (L4).",
        "'Left pushdown' مش derivation؛ الـ pushdown automata موضوع تاني خالص. الإجابة leftmost derivation (L4).",
        null
       ]
      },
      {
       "why": "الـ CFG بيتعرّف بالـ terminals والـ non-terminals والـ productions والـ start symbol؛ مفيش حاجة اسمها 'end symbol' في التعريف بتاعه (L4).",
       "ow": [
        null,
        "الـ start symbol واحد من الأربع أجزاء بتوع الـ CFG، فهو ليه علاقة بيه فعلًا (L4).",
        "الـ non-terminals واحدة من الأربع أجزاء بتوع الـ CFG، فليها علاقة بيه فعلًا (L4).",
        "الـ terminals (الـ tokens) واحدة من الأربع أجزاء بتوع الـ CFG، فليها علاقة بيه فعلًا (L4)."
       ]
      },
      {
       "why": "L1: الـ symbol table بتتعامل مع تقريبًا كل phase.",
       "ow": [
        "الـ 'Records' دي الـ entries اللي جوه الـ symbol table، مش الـ structure نفسه اللي بيتستخدم في كل الـ phases (L1، L8).",
        "الـ program ده الحاجة اللي بنعملها compile، مش structure مشترك بين الـ phases؛ ده الـ symbol table (L1).",
        null,
        "كلمة 'Table' عامة أوي؛ الـ structure المحدد اللي كل الـ phases بتستخدمه هو الـ symbol table (L1)."
       ]
      },
      {
       "why": "الـ parsing هو عملية إنك تلاقي parse tree لـ string من الـ tokens (L4)؛ وده نفس Q14 بس الاختيارات مترتبة بشكل تاني.",
       "ow": [
        "كلمة 'Analyzing' عامة أوي؛ إنك تلاقي parse tree لـ token string ده parsing (L4).",
        "كلمة 'Recognizing' مش مصطلح المحاضرة؛ الإجابة parsing (L4).",
        "الـ tokenizing بيطلّع الـ tokens؛ إنك تبني الـ parse tree ليها ده parsing (L2، L4).",
        null
       ]
      },
      {
       "why": "الـ annotated parse tree بيوضّح قيم الـ attributes عند كل node، واللي بتتحسب بالـ semantic rules بتاعة الـ attribute grammar (L7).",
       "ow": [
        null,
        "الـ syntax tree بيوضّح الـ structure بس، من غير قيم attributes؛ لما تضيفها بيبقى annotated parse tree (L7).",
        "'Semantic tree' مش مصطلح في المحاضرة؛ الشجرة اللي فيها قيم الـ attributes اسمها annotated parse tree (L7).",
        "الـ annotated parse tree هو ده بالظبط، فـ 'none of the mentioned' غلط (L7)."
       ]
      },
      {
       "why": "الـ syntactic analyzer (الـ parser) بياخد الـ tokens ويبني الـ parse tree (كلمة \"paring\" غلطة إملائية والمقصود parsing) (L4).",
       "ow": [
        "الـ symbol table صيانتها شغل مشترك بين الـ phases؛ الشغل الخاص بالـ parser هو إنه يبني الـ parse tree (L1، L4).",
        "تجميع الـ data types جزء من الـ semantic analysis (الـ type checking)، مش الـ syntax analysis (L7).",
        null,
        "الـ parser فعلًا بيبني الـ parse tree، فـ 'none of the mentioned' غلط (L4)."
       ]
      },
      {
       "why": "اقراها على إنها \"أكتر من parse tree\"، وده تعريف الـ ambiguity (L4). جاوب ambiguous في الامتحان، لأن ورقة 2024/25 (50) بتكرر نفس السؤال بالظبط.",
       "ow": [
        "الـ unambiguous grammar بتدي parse tree <b>واحدة</b> بالظبط لكل sentence؛ لو أكتر من واحدة تبقى ambiguous (L4).",
        null,
        "واحد بس اللي ينفع: الـ grammar اللي ليها أكتر من parse tree لـ sentence تبقى ambiguous، مش unambiguous (L4).",
        "'Ambiguous' بتنطبق على التعريف، فـ 'none' غلط (L4)."
       ]
      },
      {
       "why": "الـ Compile-time errors هي الـ syntax errors؛ أما الـ logic والـ runtime errors فبتظهر أثناء التنفيذ.",
       "ow": [
        null,
        "الـ logic errors بتطلّع نتايج غلط وقت الـ run time؛ الـ compiler مايقدرش يكتشفها، هو بيطلّع الـ syntax errors (L1).",
        "الـ runtime errors بتحصل أثناء التنفيذ، بعد الـ compilation؛ الـ compiler بيطلّع الـ syntax errors (L1).",
        "الـ logic والـ runtime errors الـ compiler مش بيطلّعها، فمش 'all'؛ الـ syntax errors بس (L1)."
       ]
      },
      {
       "why": "الـ testing ده حاجة المبرمجين بيعملوها على البرنامج بعد ما يخلص؛ مش واحد من phases الـ compiler (scanner، parser، semantic analysis، optimization، code generation) (L1).",
       "ow": [
        "الـ syntax analysis فعلًا phase في الـ compiler (الـ parser) (L1).",
        null,
        "الـ lexical analysis فعلًا phase في الـ compiler (الـ scanner)، وهو أول واحد (L1).",
        "الـ testing مش phase، يعني فيه اختيار بينطبق فعلًا، فـ 'none' غلط (L1)."
       ]
      },
      {
       "why": "الـ parsing اسمه برضه syntax analysis: الـ parser بيشيك على الـ token stream قصاد الـ grammar وبيبني الـ parse tree (L4).",
       "ow": [
        "الـ semantic analysis بيشيك على المعنى والـ types بعد الـ parsing؛ مش اسم تاني للـ parsing (L7).",
        "الـ lexical analysis هو الـ scanning (تكوين الـ tokens)، الـ phase اللي <b>قبل</b> الـ parsing (L2).",
        null,
        "الـ syntax analysis هو الاسم الصح، فـ 'none' غلط (L4)."
       ]
      },
      {
       "why": "الـ type checking ده semantic check بيتعمل بـ syntax directed translation (SDT) rules متعلّقة على الـ grammar (L7)؛ نفس Q8.",
       "ow": [
        null,
        "الـ lexical analysis بيبني tokens بس ومايعرفش حاجة عن الـ types؛ الـ type checking بيعمله الـ SDT (L2، L7).",
        "الـ code optimization بييجي بعد الـ semantic checks؛ الـ type checking بيعمله الـ SDT (L7).",
        "الـ syntax analysis بيشيك على structure الـ grammar بس؛ الـ type checking ده semantic check بيعمله الـ SDT (L4، L7)."
       ]
      },
      {
       "why": "الـ symbol table بيخزّن كل identifier مع معلومات عنه، زي الـ type والـ scope level وأحيانًا الـ location (L1، L8).",
       "ow": [
        "الـ semantic stack بيشيل قيم أثناء الـ translation؛ مش بيدير الـ identifiers والـ attributes بتاعتها (L8).",
        null,
        "الـ parser table (زي الـ LL(1) table) بيوجّه قرارات الـ parsing؛ مش بيخزّن أي معلومات عن الـ variables (L6).",
        "الـ abstract syntax tree بيمثّل structure البرنامج، مش table للـ variables والـ attributes بتاعتها (L1، L8)."
       ]
      },
      {
       "why": "L9. الـ Recursion محتاج <b>STACK</b>؛ والـ globals محتاجة static storage.",
       "ow": [
        "الـ global variables بتاخد addresses ثابتة في الـ static storage، فمش محتاجة الـ heap (L9).",
        "الـ dynamic scoping بيتكلم عن الاسم بيشاور على أنهي declaration (L8)؛ الـ heap بنحتاجه للداتا اللي بتتعمل وقت الـ run time (L9).",
        "الـ recursion محتاج الـ <b>STACK</b> (activation records لكل call)، مش الـ heap (L9).",
        null
       ]
      },
      {
       "why": "الـ annotated tree اللي طالعة من الـ semantic analyzer بتروح للـ phase اللي بتطلّع الـ intermediate code (الـ source code optimizer في رسمة L1).",
       "ow": [
        "الـ lexical analysis بيبعت tokens للـ parser، مش للـ intermediate code generation (L1).",
        "الـ syntax analysis بيطلّع الـ syntax tree، واللي بتروح للـ semantic analysis الأول (L1).",
        null,
        "الـ error handling مش phase في السلسلة اللي بتغذّي الـ intermediate code؛ ده شغال جنب كل الـ phases (L1)."
       ]
      },
      {
       "why": "الـ semantic analysis بياخد الـ syntax tree، ويضيف الـ types وقيم الـ attributes، ويطلّع الـ annotated syntax tree (L1).",
       "ow": [
        "الـ syntax analysis بيطلّع الـ syntax tree العادية؛ الـ annotation بيضيفه الـ semantic analysis (L1).",
        null,
        "الـ lexical analysis بيطلّع tokens، مش tree (L1، L2).",
        "الـ code optimizer بـ<b>ياخد</b> الـ annotated tree كـ input؛ مش هو اللي بيطلّعها (L1)."
       ]
      },
      {
       "why": "L1: الـ source code optimizer هو اللي بياخد الـ annotated tree.",
       "ow": [
        "الـ syntax analysis بياخد tokens كـ input، مش الـ annotated tree (L1).",
        "الـ semantic analysis هو اللي بـ<b>يطلّع</b> الـ annotated tree؛ الـ input بتاعه هو الـ syntax tree (L1).",
        "الـ lexical analysis بياخد الـ source code كـ input (L1، L2).",
        null
       ]
      },
      {
       "why": "الـ symbol table ده data structure كل الـ phases بتستخدمه، مش phase في حد ذاته؛ الـ scanner والـ parser والـ code optimizer هما الـ phases (L1).",
       "ow": [
        "الـ scanner (الـ lexical analysis) فعلًا phase، وهو أول واحد خالص، وبيطلّع الـ tokens (L1).",
        null,
        "الـ parser (الـ syntax analysis) فعلًا phase؛ بيبني الـ syntax tree من الـ tokens (L1، L4).",
        "الـ code optimizer فعلًا phase من phases الـ compiler (L1)."
       ]
      },
      {
       "why": "الـ SDT اختصار Syntax Directed Translation: الـ semantic rules المتعلّقة على الـ grammar productions هي اللي بتوجّه الترجمة (L7).",
       "ow": [
        null,
        "هو SYNTAX directed مش semantic directed: الـ rules متعلّقة على الـ productions بتاعة الـ grammar (L7).",
        "الـ D معناها 'Directed' مش 'Derivation': Syntax Directed Translation (L7).",
        "'Derivation' و 'Transition' الاتنين غلط؛ SDT = Syntax Directed Translation (L7)."
       ]
      },
      {
       "why": "الـ synthesized attributes بتاخد قيمها من قيم الـ attributes بتاعة الـ child nodes (زي S → ABC، الـ S بتاخد قيم من A و B و C) (L7).",
       "ow": [
        "الـ inherited attributes بتاخد قيمها من الـ parent و/أو الـ sibling nodes، مش من الـ children (L7).",
        "'Child attributes' مش مصطلح في المحاضرة؛ الـ attributes اللي بتتحسب من الـ children اسمها synthesized (L7).",
        null,
        "الـ synthesized attributes بتنطبق بالظبط، فـ 'none' غلط (L7)."
       ]
      },
      {
       "why": "حسب الـ key بتاع الـ revision sheet، الـ variable اللي متأكدين إنه اتعمله assign (في كل الـ paths) اسمه 'definitely assigned'.",
       "ow": [
        null,
        "'Definitely known' مش هو المصطلح؛ اسم الـ variable اللي متأكدين إنه اتعمله assign في الـ key هو 'definitely assigned'.",
        "'Indefinitely assigned' معناها العكس (مش متأكدين إنه اتعمله assign)؛ إجابة الـ key هي 'definitely assigned'.",
        "'Definitely assigned' بتنطبق، فـ 'none of the mentioned' غلط."
       ]
      },
      {
       "why": "الـ inherited attributes بتاخد قيمها من الـ parent و/أو الـ sibling nodes، عكس الـ synthesized attributes اللي بتيجي من الـ children (L7).",
       "ow": [
        "إنها تاخد قيم من الـ child nodes ده وصف الـ <b>SYNTHESIZED</b> attributes، مش الـ inherited (L7).",
        "الـ leaf nodes مش هي المصدر؛ الـ inherited attributes بتيجي من الـ parent و/أو الـ siblings (L7).",
        null,
        "'Semantic nodes' مش مصطلح في المحاضرة؛ الـ inherited attributes بتيجي من الـ parent (والـ siblings) (L7)."
       ]
      },
      {
       "why": "حسب الـ key بتاع الـ revision sheet، الـ variable اللي ممكن يكون اتعمله assign وممكن لأ (اتعمله assign في بعض الـ paths بس) بيبقى في حالة 'unknown'.",
       "ow": [
        "'Definitely unassigned' معناها إنه أكيد <b>مش</b> متعمله assign؛ لكن الـ variable اللي ممكن يكون اتعمله assign وممكن لأ ده 'unknown'.",
        null,
        "'Definitely assigned' معناها إنه أكيد اتعمله assign؛ الحالة اللي مش متأكدين فيها اسمها 'unknown'.",
        "'Unknown' بتنطبق على الوصف، فـ 'none of the mentioned' غلط."
       ]
      },
      {
       "why": "كل hash table لكل scope ليها memory overhead خاص بيها، فالـ table لكل scope مش كفء في الـ memory؛ و L8 بتحل ده بـ table واحد لكل الـ scopes.",
       "ow": [
        null,
        "L8 بتقول إن الـ memory overhead هي <b>المشكلة</b> (والـ multiple searches مشكلة سرعة ثانوية)، فـ 'large processing time' مش إجابة الـ key.",
        "الـ redundant code ده حاجة الـ optimizer بيشيلها؛ مالوش علاقة بتنظيم الـ symbol table (L8، L9).",
        "الـ memory overhead هي العيب المذكور، فـ 'none' غلط (L8)."
       ]
      },
      {
       "why": "الـ static binding (الـ static scope) مبني على structure الـ syntax tree، يعني نص البرنامج والـ braces بتاعته، مش على سلوكه وقت الـ runtime (L8).",
       "ow": [
        null,
        "الـ code optimizer مالوش أي علاقة بالـ scoping؛ الـ static binding ماشي على structure الـ syntax tree (الـ braces) (L8).",
        "الـ data types مش هي اللي بتحدد الاسم مربوط بأنهي declaration؛ الـ block structure بتاع الـ syntax tree هو اللي بيحدد (L8).",
        "structure الـ syntax tree بتنطبق، فـ 'none' غلط (L8)."
       ]
      },
      {
       "why": "اتنين leftmost derivations مختلفين (أو اتنين rightmost مختلفين) = ambiguity. إن يبقى فيه LMD واحد و RMD واحد ده طبيعي لأي string (L4).",
       "ow": [
        "أي string ليها leftmost و rightmost derivation حتى في الـ unambiguous grammars؛ ده لوحده مش ambiguity (L4).",
        "الـ grammar اللي ماتقدرش تطلّع string يبقى ببساطة مش بتولّده؛ الـ ambiguity معناها أكتر من parse tree (L4).",
        null,
        "اختيار (c) بيقول تعريف الـ ambiguity صح، فـ 'none' غلط (L4)."
       ]
      },
      {
       "why": "الـ context-free grammars بتوصف الـ syntax بتاع اللغة، والـ parser بيستخدمها في الـ syntax analysis phase (L4).",
       "ow": [
        "الـ lexical analysis بيستخدم regular expressions و finite automata، مش CFGs (L2).",
        null,
        "الـ semantic analysis بيستخدم attribute grammars/SDT مبنية على الـ CFG، بس الـ phase بتاعة الـ CFG نفسها هي الـ syntax analysis (L4، L7).",
        "الـ syntax analysis هي الصح، فـ 'none' غلط (L4)."
       ]
      },
      {
       "why": "الـ compiler محتاج تلات أنواع storage: static (الـ globals والكود الثابت)، و stack (الـ procedure activations)، و heap (الـ dynamic data) (L9).",
       "ow": [
        "اتنين قليل؛ L9 بتذكر تلاتة: static و stack و heap.",
        null,
        "أربعة كتير؛ L9 بتذكر تلاتة بالظبط: static و stack و heap.",
        "خمسة كتير؛ L9 بتذكر تلاتة بالظبط: static و stack و heap."
       ]
      },
      {
       "why": "L9 بتقسّم الـ storage allocation لـ static و stack و heap: الـ static للداتا الثابتة، والـ stack للـ procedure calls، والـ heap للـ dynamic data.",
       "ow": [
        null,
        "'Dynamic' مش نوع لوحده؛ النوع الأول هو STATIC (والـ stack والـ heap هما الـ dynamic) (L9).",
        "مفيش حاجة اسمها queue storage؛ الـ procedure calls بتستخدم الـ STACK (L9).",
        "static و stack و heap صح، فـ 'none' غلط (L9)."
       ]
      },
      {
       "why": "الـ constant folding والـ combine operations الاتنين peephole optimization techniques في L9 (ومعاهم الـ redundant load/store elimination).",
       "ow": [
        "'Variable folding' مش technique؛ الـ peephole techniques في L9 هي الـ redundant load/store elimination والـ constant folding والـ combine operations.",
        "الـ definite assignment مفهوم من الـ semantic analysis، مش optimization؛ الـ constant folding بتيجي مع الـ combine operations (L9).",
        null,
        "(a) و (b) كل واحد فيهم فيه مصطلح مش optimization، فـ 'a and b' غلط (L9)."
       ]
      },
      {
       "why": "مع الـ intermediate code الـ back end بس هو اللي بيتغيّر مع كل target machine، فمش محتاجين compiler native كامل لكل machine.",
       "ow": [
        "الـ parse trees لسه الـ front end محتاجها؛ الـ intermediate code بيشيل الحاجة لـ compiler كامل لكل machine (L1).",
        null,
        "الـ CFG لسه محتاجينها عشان نعمل parse للـ source؛ الـ intermediate code مش بيستبدلها (L4).",
        "الـ NFAs بتتستخدم في بناء الـ scanner؛ الـ intermediate code مالوش علاقة بإنه يلغيها (L3)."
       ]
      },
      {
       "why": "نفس السؤال ده بالظبط اتكرر في 2023/24 (60) و 2023/24 Summer، ونسخة الـ T/F منه في 2024/25. استخدم \"right\".",
       "ow": [
        "الـ key بتاع الـ revision sheet (واتكرر في امتحانات بعد كده) بيقول إن الـ leftmost parsing tree بتكبر من ناحية الـ RIGHT، مش الـ left.",
        "الـ key بيدي ناحية محددة (الـ right)، فـ 'equal sides' غلط.",
        null,
        "الـ key بيقول إن الناحية <b>ممكن</b> تتحدد: هي ناحية الـ right."
       ]
      },
      {
       "why": "الـ attribute grammar هي CFG متعلّق على الـ non-terminals بتوعها attributes، ومعاها semantic rules عشان تحسبها (L7).",
       "ow": [
        null,
        "شيل الكود الزيادة ده optimization، مش الطريقة اللي بتتبني بيها الـ attribute grammar (L7، L9).",
        "الـ attributes بتتعلّق على الـ symbols بتوع الـ grammar (الـ non-terminals)، مش على الـ stack storage (L7).",
        "اختيار (a) هو التعريف الصح، فـ 'none' غلط (L7)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "L9: الـ loop optimization ليه دور مهم في تحسين الـ cache performance وتقليل الـ overheads بتاعة تنفيذ الـ loops.",
       "ow": [
        null,
        "L9 بتقول ده بالظبط: الـ loop optimization بيحسّن الـ cache performance وبيقلّل الـ overheads بتاعة تنفيذ الـ loops، فالجملة True."
       ]
      },
      {
       "why": "الـ compilers بتاخد وقت طويل في الـ <b>ANALYZE</b>؛ لكن التنفيذ أسرع (L1).",
       "ow": [
        "الـ compilers بتاخد وقت طويل في الـ <b>ANALYZE</b>، لكن البرنامج المتعمله compile بيتنفذ أسرع من الكود الـ interpreted (جدول L1).",
        null
       ]
      },
      {
       "why": "في جدول المقارنة في L1، الـ interpreters مش بتطلّع intermediate object code (عشان كده memory efficient)، أما الـ compilers فبتطلّعه.",
       "ow": [
        null,
        "جدول L1 بيقول إن الـ interpreters <b>مش</b> بتطلّع intermediate object code؛ الـ compilers بس اللي بتطلّعه، فالجملة True."
       ]
      },
      {
       "why": "الـ lexical analysis بيقرا الـ source code كـ stream من الـ characters ويطلّع tokens للـ parser (L1، L2).",
       "ow": [
        null,
        "ده بالظبط الـ input والـ output بتوع الـ scanner: source code داخل و tokens طالعة (L2)، فالجملة True."
       ]
      },
      {
       "why": "L7 بتعرّف الـ synthesized attributes إنها اللي بتاخد قيمها من قيم الـ attributes بتاعة الـ child nodes (زي E → E + T).",
       "ow": [
        null,
        "ده تعريف L7 بالحرف: الـ synthesized attributes بتيجي من الـ child nodes، عمرها ما بتيجي من الـ parent أو الـ siblings."
       ]
      },
      {
       "why": "L8: يا tables لكل scope يا table واحدة لكل الـ scopes.",
       "ow": [
        "L8 بتدي أكتر من approach: table لكل scope، أو table واحد لكل الـ scopes (وليه حلّين).",
        null
       ]
      },
      {
       "why": "الحل التاني في L8: الـ item اللي في الأول هو دايمًا الصح، فمش بياخد وقت.",
       "ow": [
        "في solution 2 في L8، أول item في الـ linked list بتاعة الـ identifier هو دايمًا الصح للـ scope الحالي، فالـ lookup مش بياخد وقت.",
        null
       ]
      },
      {
       "why": "الـ interpreters مش بتطلّع أي intermediate code (L1).",
       "ow": [
        "الـ interpreters مش بتطلّع أي intermediate object code (L1)؛ إنك تتجنب compiler كامل لكل machine ده سبب بيخلي الـ <b>COMPILERS</b> تستخدم intermediate code.",
        null
       ]
      },
      {
       "why": "الـ syntax analysis بيطلّع الـ syntax tree؛ والـ annotated tree بتيجي من الـ semantic analysis (L1).",
       "ow": [
        "الـ syntax analysis بيطلّع الـ syntax tree العادية؛ الـ annotated syntax tree هي output الـ semantic analysis (L1).",
        null
       ]
      },
      {
       "why": "الـ tokens هي output الـ lexical analysis: الـ scanner بيجمّع الـ source characters في tokens ويبعتها للـ parser (L2).",
       "ow": [
        null,
        "إنه يطلّع tokens ده بالظبط شغل الـ lexical analysis (L2)، فالجملة True."
       ]
      },
      {
       "why": "الـ concatenation مش commutative: إنك تحط L1 وبعدين L2 بيدي strings غير لما تحط L2 وبعدين L1، زي {ab, c}{d} ≠ {d}{ab, c} (L2).",
       "ow": [
        "الترتيب مهم: L1L2 بتحط strings الـ L1 الأول، فبشكل عام L1L2 ≠ L2L1 (L2).",
        null
       ]
      },
      {
       "why": "أي string ليها leftmost و rightmost derivation؛ الـ ambiguity محتاجة اتنين leftmost مختلفين (أو اتنين rightmost)، يعني two parse trees (L4).",
       "ow": [
        "أي string ليها leftmost و rightmost derivation؛ الـ ambiguity محتاجة أكتر من parse tree، يعني اتنين LMDs أو RMDs مختلفين (L4).",
        null
       ]
      },
      {
       "why": "لما تطبّق الـ semantic rules بتاعة الـ attribute grammar على الـ syntax tree، بتحسب قيم الـ attributes، وده بيطلّع الـ annotated syntax tree (L7).",
       "ow": [
        null,
        "هي دي طريقة عمل الـ annotated tree: rules الـ attribute grammar بتتحسب على الـ syntax tree (L7)، فالجملة True."
       ]
      },
      {
       "why": "ده الـ synthesized؛ أما الـ inherited فبتيجي من الـ parent/siblings (L7).",
       "ow": [
        "إنها تاخد قيم من الـ child nodes ده تعريف الـ <b>SYNTHESIZED</b> attributes؛ الـ inherited بتيجي من الـ parent و/أو الـ siblings (L7).",
        null
       ]
      },
      {
       "why": "L9 بتعرّف الـ peephole optimization إنه optimization بيتعمل على جزء صغير من الكود، اسمه الـ peephole أو الـ window.",
       "ow": [
        null,
        "ده تعريف L9: الـ peephole optimization بيشتغل على جزء صغير من الكود (الـ window)، فالجملة True."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ sheet بتجاوب برسمة L1 بس.",
       "ans": "<pre>Source code\n   ↓\nScanner ─────────────┐\n   ↓ tokens          │\nParser               │     Literal table\n   ↓ syntax tree     │\nSemantic analyzer    ├──── Symbol table\n   ↓ annotated tree  │\nSource code optimizer│     Error handler\n   ↓ intermediate code\nCode generator       │\n   ↓ target code     │\nTarget code optimizer┘\n   ↓\nTarget code</pre>"
      },
      {
       "why": "الإجابة الرسمية؛ واتراجعت خطوة خطوة. الـ parse trees مرسومة في إجابة Q2-b بتاعة 2021/22.",
       "ans": "<pre>LMD 1: S ⇒ 0A ⇒ 00AA ⇒ 001SA ⇒ 0011BA ⇒ 00110A ⇒ 001101\n        (A→0AA, A→1S, S→1B, B→0, A→1)\nLMD 2: S ⇒ 0A ⇒ 00AA ⇒ 001A ⇒ 0011S ⇒ 00110A ⇒ 001101\n        (A→0AA, A→1, A→1S, S→0A, A→1)</pre>بما إن فيه أكتر من leftmost derivation لنفس الـ string، يبقى الـ grammar دي ambiguous."
      },
      {
       "why": "الإجابة الرسمية (L9).",
       "ans": "<pre>┌──────────────────────┐  ┐\n│  Text memory         │  │ fixed\n├──────────────────────┤  │\n│  Static data         │  ┘\n├──────────────────────┤  ┐\n│  Stack memory   ↓    │  │\n│                      │  │ dynamic\n│  Heap memory    ↑    │  │\n└──────────────────────┘  ┘</pre><b>الـ Static allocation</b>: الـ data بتتربط بمكان ثابت مش بيتغيّر أثناء التنفيذ؛ أماكن الـ storage معروفة من الأول، فمش محتاجين runtime support package.<br><b>الـ Stack allocation</b>: الـ procedure calls والـ activations بتاعتها بتتدار بـ stack (LIFO)؛ ومفيدة جدًا للـ recursive calls.<br><b>الـ Heap allocation</b>: الميموري بتتعمل allocate و de-allocate وقت الـ run بس، وبترجع تاني لما مانحتاجهاش. الـ Stack والـ heap بيكبروا ويصغروا dynamically، فمينفعش نديهم مساحة ميموري ثابتة."
      },
      {
       "why": "Loop optimization / code hoisting (مثال الـ arr.length في L9).",
       "ans": "<pre>int x = a→length-1;\nfor (i=0; i &lt; x ; i++)\n   swap_elements(a[i],a[ i+1]);</pre>بدل ما نحسب length-1 عدد مرات قد طول الـ array، نخزّنها مرة واحدة في integer x ونخلّي الـ x هي الـ terminating condition. كده الـ length-1 بتتحسب مرة واحدة بس، وده بيوفّر processing ووقت."
      },
      {
       "why": "الإجابة الرسمية. في LMD 2، الـ A → Aa وبعدين A → a.",
       "ans": "<pre>LMD 1: S ⇒ aaB ⇒ aab\nLMD 2: S ⇒ Ab ⇒ Aab ⇒ aab</pre>"
      },
      {
       "why": "الإجابة الرسمية. Tree 1 بتقسم الـ string كده (aabb)(ccdd)؛ و tree 2 بتتداخل من برا لجوّه (a…d، a…d، b…c، b…c).",
       "ans": "<pre>LMD 1: S ⇒ AB ⇒ aAbB ⇒ aabbB ⇒ aabbcBd ⇒ aabbccdd\nLMD 2: S ⇒ C ⇒ aCd ⇒ aaDdd ⇒ aabDcdd ⇒ aabbccdd\n\nTree 1:        S                Tree 2:   S\n            /                            |\n           A       B                      C\n         / |    / |                   / |         a  A  b c  B  d                a  C  d\n          /      /                    / |          a   b   c   d                 a  D  d\n                                        / |                                        b  D  c\n                                         /                                         b   c</pre>"
      },
      {
       "why": "الرسومات الرسمية. في التانية، الـ c's والـ d's محتاجين final states منفصلة عشان مايتخلطوش.",
       "ans": "<b>b*a+(c|d)</b>: →0 (loop b) –a→ 1 (loop a)؛ 1 –c→ 2؛ 1 –d→ 2؛ والـ 2 final.<br><b>(a|b)*(c+|d+)</b>: →0 (loop a,b)؛ 0 –c→ 2 (final، loop c)؛ 0 –d→ 3 (final، loop d)."
      },
      {
       "why": "الإجابة الرسمية (L7).",
       "ans": "الـ Synthesized attributes بتتعدّى لفوق في الـ syntax tree، من الـ leaves لحد الـ root (قيمة الـ node بتتحسب من الـ children بتوعها). الـ Inherited attributes بتتعدّى لتحت (من الـ parent و/أو الـ siblings). المعلومة اللي اتعملها synthesize في subtree ممكن تتعمل inherit في subtree تانية، أو في pass بعد كده في نفس الـ subtree. مثال: الـ symbol table بتتعمل synthesize من الـ declaration وبتتعمل inherit في الـ scope بتاع الـ declaration."
      },
      {
       "why": "الإجابة الرسمية؛ وهي اللي بتحدد convention الكورس في الـ dynamic binding (L8).",
       "ans": "الـ Static: جوّه y = 2 + 3 = 5 → بتطبع <b>5</b>؛ بعد الـ block y = 5 + 1 = 6 → بتطبع <b>6</b>.<br>الـ Dynamic: جوّه بتطبع <b>5</b>؛ بعد الـ block بنستخدم آخر x = 3: y = 5 + 3 = 8 → بتطبع <b>8</b>.<pre>x  ->  [ 1 | YES | next ] -> [ 0 | YES | NULL ]\ny  ->  [ 0 | YES | NULL ]</pre>"
      },
      {
       "why": "الجدول الرسمي (L1).",
       "ans": "<table><tr><th>Interpreter</th><th>Compiler</th></tr><tr><td>بيترجم البرنامج statement واحدة في المرة</td><td>بيعمل scan للبرنامج كله ويترجمه مرة واحدة لـ machine code</td></tr><tr><td>وقت أقل في الـ analysis للـ source code؛ والتنفيذ في المجمل أبطأ</td><td>وقت أكتر في الـ analysis للـ source code؛ والتنفيذ في المجمل أسرع</td></tr><tr><td>مفيش intermediate object code، فبيبقى موفّر في الميموري</td><td>بيطلّع intermediate object code محتاج linking، فبياخد ميموري أكتر</td></tr><tr><td>JavaScript, Python, Ruby</td><td>C, C++, Java</td></tr></table>"
      },
      {
       "why": "اتراجعت: الـ {2,3} على 0 = {3} ∪ {1} = {1,3}؛ الـ {1,3} على 0 = {3} ∪ {1} = {1,3}؛ وعلى 1 الاتنين بيدّوا {2,3}.",
       "ans": "(a) الـ State 3 عندها loop على 1 و transition تانية على نفس الـ symbol 1 (لـ 2).<br>(b) <table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>-</td></tr><tr><td>* {3}</td><td>{1}</td><td>{2,3}</td></tr><tr><td>* {2,3}</td><td>{1,3}</td><td>{2,3}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2,3}</td></tr></table>الـ Final states: أي set فيها 3."
      },
      {
       "why": "الإجابة الرسمية. الـ call هو my_function(i, a[2]). الـ by result والـ value-result بينسخوا الـ j تاني لـ i والـ x تاني لـ a[2] (الـ address اللي اتحدد وقت الـ call)، فبيكتبوا فوق الـ a[2] := 0. الـ local int i = 0 مش بتأثر على أي حاجة بتتطبع. في الـ symbol table، الـ local i (scope 1) قدّام الـ global i (scope 0).",
       "ans": "<table><tr><th></th><th>By value</th><th>By result</th><th>By value-result</th></tr><tr><td>قبل</td><td>2 10 20 30</td><td>2 10 20 30</td><td>2 10 20 30</td></tr><tr><td>جوّه</td><td>j=3, x=33: 3 33 10 20 0</td><td>j=0→1, x=0→3: 1 3 10 20 0</td><td>j=3, x=33: 3 33 10 20 0</td></tr><tr><td>بعد</td><td>2 10 20 0</td><td>1 10 20 3</td><td>3 10 20 33</td></tr></table>b-<pre>i     ->  [ 1 | YES | next ] -> [ 0 | YES | NULL ]\na[3]  ->  [ 0 | YES | NULL ]</pre>"
      },
      {
       "why": "الإجابة الرسمية (L7).",
       "ans": "الـ SDT هي augmented rules بتتضاف على الـ grammar عشان تسهّل الـ semantic analysis. بتعدّي المعلومات bottom-up و/أو top-down في الـ parse tree على شكل attributes متعلّقة في الـ nodes. الطريقة العامة إننا نبني parse tree أو syntax tree ونحسب قيم الـ attributes عند الـ nodes بتاعتها وإحنا بنزورهم بترتيب معيّن. وبشكل عام، الـ SDT بتربط (1) مجموعة attributes بكل node في الـ grammar و (2) مجموعة translation rules بكل production، باستخدام attributes و constants و lexical values."
      },
      {
       "why": "الـ path الفوقاني: ε، بعدين a* (الـ loop عند 2)، بعدين a، بعدين b → a*ab = a+b. الـ path التحتاني: a، بعدين b* (الـ loop عند 4)، بعدين b → ab*b = ab+. والاتنين بيتجمعوا بـ |.",
       "ans": "الحل الرسمي: <b>e a+b | ab+</b>، يعني <b>a+b | ab+</b> لما الـ e تبقى ε."
      },
      {
       "why": "الإجابة الرسمية. Tree 1 = (id-id)+id، و tree 2 = id-(id+id).",
       "ans": "<pre>LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id\nLMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id\n\nTree 1:       E                Tree 2:     E\n            / |                         / |            E  +  E                      E  -  E\n         / |    |                      |   / |         E  -  E  id                     id E  +  E\n        |     |                            |     |\n        id    id                           id    id</pre>اتنين leftmost derivations / parse trees لنفس الـ string، يبقى الـ grammar دي ambiguous."
      },
      {
       "why": "الإجابة الرسمية، وهي نفس Q1-b بتاع 2024/25 (60). اتراجعت: الـ {2,3} على a = {2,3} ∪ E(1) = {1,2,3}؛ الـ {1,2,3} على b = {2} ∪ {3} = {2,3}.",
       "ans": "الـ ε-closures: E(1) = {1,3}, E(2) = {2}, E(3) = {3}.<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→* {1,3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>{2}</td><td>{2,3}</td><td>{3}</td></tr><tr><td>{2,3}</td><td>{1,2,3}</td><td>{3}</td></tr><tr><td>{3}</td><td>{1,3}</td><td>-</td></tr><tr><td>* {1,2,3}</td><td>{1,2,3}</td><td>{2,3}</td></tr></table>الـ Final states: {1,3} و {1,2,3} (عشان فيهم 1)."
      },
      {
       "why": "FOLLOW(B) = FIRST(A') − ε ∪ FOLLOW(A) = {d, $}. الـ C عمرها ما بتظهر في أي right-hand side، فالـ FOLLOW set بتاعها فاضية (الـ sheet كاتبة {-}).",
       "ans": "a- نشيل الـ left recursion: S → A, A → aBA', A' → dA' | ε, B → b, C → g.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{a}</td><td>{$}</td></tr><tr><td>A</td><td>{a}</td><td>{$}</td></tr><tr><td>A'</td><td>{d, ε}</td><td>{$}</td></tr><tr><td>B</td><td>{b}</td><td>{d, $}</td></tr><tr><td>C</td><td>{g}</td><td>{ } (الـ C مش reachable)</td></tr></table>الـ Table: M[S,a] = S→A; M[A,a] = A→aBA'; M[A',d] = A'→dA'; M[A',$] = A'→ε; M[B,b] = B→b; M[C,g] = C→g.<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>abd$</td><td>S→A</td></tr><tr><td>A$</td><td>abd$</td><td>A→aBA'</td></tr><tr><td>aBA'$</td><td>abd$</td><td>match a</td></tr><tr><td>BA'$</td><td>bd$</td><td>B→b</td></tr><tr><td>bA'$</td><td>bd$</td><td>match b</td></tr><tr><td>A'$</td><td>d$</td><td>A'→dA'</td></tr><tr><td>dA'$</td><td>d$</td><td>match d</td></tr><tr><td>A'$</td><td>$</td><td>A'→ε</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>"
      }
     ]
    }
   ]
  }
 ]
};

// Final-exam revision for compiler: every lecture, exam-focused summary in English and Egyptian Arabic per point. Merged by build.mjs.
window.FINAL = window.FINAL || {};
FINAL.compiler = {
 "lecs": [
  1,
  2,
  3,
  4,
  6,
  7,
  8,
  9
 ],
 "scope": "All 8 lectures",
 "scope_ar": "كل الـ 8 محاضرات",
 "sections": [
  {
   "lec": 1,
   "h": "Compiler vs interpreter",
   "ar_h": "الـ compiler مقابل الـ interpreter",
   "pts": [
    [
     "A <b>compiler</b> translates a program in a <b>high-level</b> language into <b>low-level machine language</b>, and also tries to <b>spot and report obvious programmer mistakes</b>.",
     "الـ <b>compiler</b> بيترجم برنامج مكتوب بلغة <b>high-level</b> لـ <b>low-level machine language</b>، وكمان بيحاول <b>يمسك ويبلّغ عن أخطاء المبرمج الواضحة</b>."
    ],
    [
     "An <b>interpreter</b> is another way of implementing a programming language; interpretation shares many aspects with compiling.",
     "الـ <b>interpreter</b> طريقة تانية لتنفيذ لغة البرمجة، والـ interpretation فيها حاجات كتير شبه الـ compiling."
    ],
    [
     "<b>Interpreter</b>: one statement at a time; less analysis time but <b>slower execution</b>; <b>no intermediate object code</b> so memory efficient; JavaScript, Python, Ruby.<br><b>Compiler</b>: the <b>entire program</b> as a whole; long analysis time but <b>faster execution</b>; <b>generates intermediate object code</b> that needs linking, so more memory; C, C++, Java.",
     "الـ <b>interpreter</b> بيترجم statement واحدة في المرة، وقت التحليل أقل لكن <b>التنفيذ أبطأ</b>، و<b>مبيطلّعش intermediate object code</b> فهو موفّر في الـ memory، وبتستخدمه لغات زي الـ JavaScript والـ Python والـ Ruby.<br>الـ <b>compiler</b> بيعمل scan لـ <b>البرنامج كله</b> مرة واحدة، وقت التحليل كبير لكن <b>التنفيذ أسرع</b>، و<b>بيطلّع intermediate object code</b> محتاج linking فبياخد memory أكتر، وبتستخدمه لغات زي الـ C والـ <bdi dir=\"ltr\">C++</bdi> والـ Java."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "The six phases and what flows between them",
   "ar_h": "الـ six phases واللي بيتنقل بينهم",
   "pts": [
    [
     "Order and data: <b>source code → Scanner → tokens → Parser → syntax tree → Semantic analyzer → annotated tree → Source code optimizer → intermediate code → Code generator → target code → Target code optimizer → target code</b>.",
     "الترتيب والداتا اللي بتتنقل:<span class=\"ltr\"><b>source code → Scanner → tokens → Parser → syntax tree → Semantic analyzer → annotated tree → Source code optimizer → intermediate code → Code generator → target code → Target code optimizer → target code</b></span>"
    ],
    [
     "All six phases use the <b>literal table</b>, <b>symbol table</b> and <b>error handler</b>: these are helpers, <b>not phases</b>. \"Testing\" is not a phase either.",
     "الـ six phases كلهم بيستخدموا الـ <b>literal table</b> والـ <b>symbol table</b> والـ <b>error handler</b>، ودول أدوات مساعدة <b>مش phases</b>. وكمان الـ \"Testing\" مش phase."
    ],
    [
     "<b>Scanner</b>: groups characters into <b>tokens</b>. <code>a[index]=4+2</code> gives 8 tokens: a (identifier), [ (left bracket), index (identifier), ] (right bracket), = (assignment), 4 (number), + (plus sign), 2 (number).",
     "الـ <b>Scanner</b> بيجمّع الحروف في <b>tokens</b>. مثلاً <code>a[index]=4+2</code> بتطلّع 8 tokens:<span class=\"ltr\">a (identifier), [ (left bracket), index (identifier), ] (right bracket), = (assignment), 4 (number), + (plus sign), 2 (number)</span>"
    ],
    [
     "<b>Parser</b>: determines the <b>structure</b>; output is a <b>parse tree</b> (every grammar node) or the condensed <b>syntax tree</b> (AST): assign-expression(subscript-expression(a, index), additive-expression(4, 2)).",
     "الـ <b>Parser</b> بيحدد الـ <b>structure</b>، والناتج <b>parse tree</b> (فيه كل node في الـ grammar) أو الـ <b>syntax tree</b> المختصر (AST):<span class=\"ltr\">assign-expression(subscript-expression(a, index), additive-expression(4, 2))</span>"
    ],
    [
     "<b>Semantic analyzer</b>: semantics = <b>meaning</b> (vs syntax = structure). <b>Static semantics</b> = declarations and type checking. It computes <b>attributes</b> and outputs the <b>annotated syntax tree</b>: <code>a</code> = array of integer; index, 4, 2, subscript-expression, additive-expression = integer.",
     "الـ <b>Semantic analyzer</b>: الـ semantics يعني <b>المعنى</b> (والـ syntax يعني التركيب). الـ <b>Static semantics</b> هي الـ declarations والـ type checking. بيحسب <b>attributes</b> ويطلّع الـ <b>annotated syntax tree</b>، فيها الـ <code>a</code> نوعها array of integer، والباقي كله integer (الـ index والـ 4 والـ 2 والـ subscript-expression والـ additive-expression)."
    ],
    [
     "<b>Source code optimizer</b>: earliest point is <b>just after semantic analysis</b>. <b>Constant folding</b>: <code>4+2</code> becomes <code>6</code>; on three-address code <code>t = 4 + 2; a[index] = t</code> → <code>t = 6; a[index] = t</code> → <code>a[index] = 6</code>.",
     "الـ <b>Source code optimizer</b>: أول نقطة ليه <b>بعد الـ semantic analysis على طول</b>. الـ <b>Constant folding</b> بيحوّل <bdi dir=\"ltr\">4+2</bdi> لـ <bdi dir=\"ltr\">6</bdi>. على الـ three-address code، قبل:<pre>t = 4 + 2; a[index] = t</pre>بعد خطوة:<pre>t = 6; a[index] = t</pre>وفي الآخر:<pre>a[index] = 6</pre>"
    ],
    [
     "<b>Code generator</b>: IR → code for the <b>target machine</b>; the <b>properties of the target machine</b> are the major factor (<code>MUL R0, 2</code> since an integer is 2 bytes there). <b>Target code optimizer</b>: <b>choosing address modes</b>, <b>replacing instructions</b> (MUL by 2 → <code>SHL R0</code>), <b>eliminating redundant</b> instructions.",
     "الـ <b>Code generator</b> بياخد الـ IR ويطلّع كود للـ <b>target machine</b>، و<b>خصائص الـ target machine</b> هي العامل الأساسي (فيه <bdi dir=\"ltr\">MUL&nbsp;R0,&nbsp;2</bdi> عشان الـ integer حجمه 2 bytes هناك). الـ <b>Target code optimizer</b> شغله <b>اختيار الـ address modes</b>، و<b>استبدال instructions</b> (الضرب في 2 بيبقى <code>SHL R0</code>)، و<b>شيل الـ instructions الزيادة</b>."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Data structures shared by the phases",
   "ar_h": "الـ data structures اللي بين الـ phases",
   "pts": [
    [
     "<b>Tokens</b>: a value of an <b>enumerated data type</b> (maybe with the string or value), in a single global variable or an array. <b>Syntax tree</b>: <b>pointer-based</b>, nodes may be a <b>variable record</b>.",
     "الـ <b>Tokens</b> بتتخزن كقيمة من <b>enumerated data type</b> (ومعاها ممكن الـ string أو القيمة)، في global variable واحد أو array. والـ <b>Syntax tree</b> structure <b>pointer-based</b>، والـ node ممكن تبقى <b>variable record</b>."
    ],
    [
     "<b>Symbol table</b>: info about identifiers (functions, variables, constants, data types), used by <b>almost every phase</b>, needs <b>constant-time</b> access so <b>hash tables</b>. <b>Literal table</b>: <b>constants and strings</b>, reduces program size.",
     "الـ <b>Symbol table</b> فيه معلومات الـ identifiers (الـ functions والـ variables والـ constants والـ data types)، و<b>تقريبًا كل phase</b> بتستخدمه، والوصول لازم يبقى <b>constant-time</b> فبنستخدم <b>hash tables</b>. والـ <b>Literal table</b> بيخزّن الـ <b>constants والـ strings</b> عشان يقلل حجم البرنامج."
    ],
    [
     "<b>Intermediate code</b>: array of text strings, temporary text or linked list of structures (three-address code, p-code), easy to reorganize. <b>Temporary files</b>: hold intermediate products, solve memory constraints, allow <b>back-patching</b> of addresses.",
     "الـ <b>Intermediate code</b> بيتخزن كـ array من text strings أو text مؤقت أو linked list من structures (زي الـ three-address code والـ p-code)، ولازم يبقى سهل نعيد ترتيبه. والـ <b>Temporary files</b> بتشيل نواتج الخطوات الوسطانية، وبتحل مشكلة الـ memory، وبتسمح بالـ <b>back-patching</b> للعناوين."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "\"……… is not a phase of a compiler\" → <b>Symbol table</b> (Finals 2024/25 (60) and (50), 2023/24 (50); Midterm 2026/27 twice) or <b>testing</b> (Finals 2021/22, Summer 2025, Summer 2023/24). T/F \"Symbol table is a (basic) phase\" → <b>False</b> (Finals 2023/24 (60), 2021/22); \"Testing is not a phase\" → <b>True</b> (Final 2024/25 (50)). The symbol table is used <b>by all phases</b> (Summer 2023/24), and \"code generation, syntax analyzer, lexical analyzer: which are phases?\" → <b>All of the mentioned</b> (Midterm 2026/27).",
     "سؤال \"……… is not a phase\" إجابته <b>Symbol table</b> <bdi dir=\"ltr\">(Finals 2024/25 (60), 2024/25 (50), 2023/24 (50); Midterm 2026/27)</bdi> أو <b>testing</b> <bdi dir=\"ltr\">(Finals 2021/22, Summer 2025, Summer 2023/24)</bdi>. وصح وغلط \"الـ symbol table phase\" إجابته <b>غلط</b> <bdi dir=\"ltr\">(Finals 2023/24 (60), 2021/22)</bdi>، و\"الـ Testing مش phase\" <b>صح</b> <bdi dir=\"ltr\">(Final 2024/25 (50))</bdi>. الـ symbol table <b>كل الـ phases بتستخدمه</b> <bdi dir=\"ltr\">(Summer 2023/24)</bdi>، وسؤال أنهي فيهم phases (الـ code generation والـ syntax analyzer والـ lexical analyzer) إجابته <b>All of the mentioned</b> <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>."
    ],
    [
     "Inputs/outputs: the annotated syntax tree is the <b>input to code optimization</b> (Final 2024/25 (60), Midterm 2026/27) and the <b>output of semantic analysis</b> (Final 2021/22); the <b>syntax tree</b> is the input to semantic analysis (Final 2023/24 (60)). T/F \"Annotated tree is the output of syntax analysis\" → False (revision sheet).",
     "أسئلة الـ input والـ output: الـ annotated syntax tree هي <b>input الـ code optimization</b> <bdi dir=\"ltr\">(Final 2024/25 (60), Midterm 2026/27)</bdi> و<b>output الـ semantic analysis</b> <bdi dir=\"ltr\">(Final 2021/22)</bdi>، والـ <b>syntax tree</b> هي input الـ semantic analysis <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>. وصح وغلط إن الـ annotated tree طالعة من الـ syntax analysis إجابته غلط <bdi dir=\"ltr\">(revision sheet)</bdi>."
    ],
    [
     "Compiler vs interpreter T/F: \"Compilers take long time to execute\" → <b>False</b> (Final 2024/25 (50), Midterm 2026/27); \"Interpreters take long time to execute\" → <b>True</b> (Finals 2021/22, Summer 2023/24); \"Interpreters generate intermediate code\" → <b>False</b> (Finals 2024/25 (50), Summer 2025, Midterm 2026/27). The major difference between their phases is <b>intermediate code generation</b> (Final 2024/25 (60)). Written: <b>compare compilers and interpreters</b> (Finals 2023/24 (50), 2021/22).",
     "صح وغلط الـ compiler مقابل الـ interpreter: الـ compilers بتاخد وقت طويل في التنفيذ <b>غلط</b> <bdi dir=\"ltr\">(Final 2024/25 (50), Midterm 2026/27)</bdi>، والـ interpreters بتاخد وقت طويل في التنفيذ <b>صح</b> <bdi dir=\"ltr\">(Finals 2021/22, Summer 2023/24)</bdi>، والـ interpreters بتطلّع intermediate code <b>غلط</b> <bdi dir=\"ltr\">(Finals 2024/25 (50), Summer 2025, Midterm 2026/27)</bdi>. والفرق الأساسي بين phases الاتنين هو الـ <b>intermediate code generation</b> <bdi dir=\"ltr\">(Final 2024/25 (60))</bdi>. وفي الـ written: <b>قارن بين الـ compilers والـ interpreters</b> <bdi dir=\"ltr\">(Finals 2023/24 (50), 2021/22)</bdi>."
    ],
    [
     "What a compiler does: it translates the source code to <b>both machine code and binary code</b> (Final 2024/25 (50), Midterm 2026/27); it is a program that accepts a high-level program and produces a machine-language program (Midterm 2026/27). It indicates the <b>syntax</b> error (Finals Summer 2025, 2023/24 (60), 2021/22; Midterm 2026/27), it does <b>not</b> indicate logic and runtime errors (Final 2023/24 (50)), so \"indicates the syntax and runtime errors\" → False (Final 2024/25 (50), Midterm 2026/27), and writing * instead of / is detected by <b>none of the mentioned</b> (Midterm 2026/27).",
     "الـ compiler بيعمل إيه: بيترجم الـ source code لـ <b>machine code و binary code الاتنين</b> <bdi dir=\"ltr\">(Final 2024/25 (50), Midterm 2026/27)</bdi>، وهو برنامج بياخد برنامج high-level ويطلّع برنامج machine language <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>. بيبلّغ عن الـ <b>syntax</b> error <bdi dir=\"ltr\">(Finals Summer 2025, 2023/24 (60), 2021/22; Midterm 2026/27)</bdi>، و<b>مش</b> بيبلّغ عن الـ logic والـ runtime errors <bdi dir=\"ltr\">(Final 2023/24 (50))</bdi>، فجملة إنه بيبلّغ عن الـ syntax والـ runtime errors <b>غلط</b> <bdi dir=\"ltr\">(Final 2024/25 (50), Midterm 2026/27)</bdi>، ولو المبرمج كتب ضرب بدل قسمة فاللي هيكتشفها <b>none of the mentioned</b> <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>."
    ],
    [
     "Intermediate code and optimization: compilers generate intermediate code so as <b>not to need a unique compiler for each machine</b> (revision sheet; T/F → True in Final 2021/22). Code optimization is done <b>twice, on source and assembly code</b> (Final 2023/24 (50); T/F → True in Final 2023/24 (60)), aims at minimizing memory and maximizing speed (Final 2023/24 (60)), and is applied <b>immediately after semantic analysis</b> (T/F → True in Final 2023/24 (50)).",
     "الـ intermediate code والـ optimization: الـ compilers بتطلّع intermediate code عشان <b>منحتاجش compiler مخصوص لكل machine</b> <bdi dir=\"ltr\">(revision sheet)</bdi>، وصح وغلط عليها إجابته <b>صح</b> <bdi dir=\"ltr\">(Final 2021/22)</bdi>. والـ code optimization بيتعمل <b>مرتين، على الـ source code والـ assembly code</b> <bdi dir=\"ltr\">(Final 2023/24 (50))</bdi>، وصح وغلط عليها <b>صح</b> <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>، وهدفه تقليل الـ memory وزيادة السرعة <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>، وبيتعمل <b>بعد الـ semantic analysis على طول</b> (صح، <bdi dir=\"ltr\">Final 2023/24 (50)</bdi>)."
    ],
    [
     "Written: <b>\"Show by figure the phases of the compiler\"</b> (Finals 2024/25 (50), Summer 2025; revision sheet): the six phases in order with what flows between them, and the literal table, symbol table and error handler at the side.",
     "في الـ written: <b>«ارسم الـ phases بتاعة الـ compiler»</b> <bdi dir=\"ltr\">(Finals 2024/25 (50), Summer 2025; revision sheet)</bdi>: الـ six phases بالترتيب واللي بيتنقل بينهم، وعلى الجنب الـ literal table والـ symbol table والـ error handler."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Lexical analysis (the scanner)",
   "ar_h": "الـ Lexical analysis (الـ scanner)",
   "pts": [
    [
     "The <b>first phase</b>: input = source code characters, output = a <b>sequence of tokens</b> for the parser. Also called <b>scanning</b>: characters are read <b>left to right</b> and grouped into tokens; <b>keywords</b> are recognized here.",
     "هي <b>أول phase</b>، الـ input بتاعها حروف الـ source code والـ output <b>sequence من الـ tokens</b> للـ parser. اسمها كمان <b>scanning</b>، يعني الحروف بتتقري <b>من الشمال لليمين</b> وتتجمّع في tokens، والـ <b>keywords</b> بيتعرفوا هنا."
    ],
    [
     "Extra jobs: <b>removes comments</b>, <b>removes white space</b> (blank, tab, newline), <b>correlates error messages</b> with the source program.",
     "شغلها الزيادة: <b>بتشيل الـ comments</b>، و<b>بتشيل الـ white space</b> (الـ blank والـ tab والـ newline)، و<b>بتربط رسايل الأخطاء</b> بالـ source program."
    ],
    [
     "<b>Token</b> = logical category (id, relop, number); <b>lexeme</b> = the actual string (<code>distance</code>). <code>if distance &gt;= rate * (time1 – time0) then distance := maxdist;</code> → <code>if id relop id * ( id – id ) then id := id ;</code>",
     "الـ <b>Token</b> هو الـ category المنطقية (زي الـ id والـ relop والـ number)، والـ <b>lexeme</b> هو الـ string الحقيقي (زي <code>distance</code>). المثال:<pre>if distance &gt;= rate *\n   (time1 – time0)\nthen distance := maxdist;</pre>بيبقى:<pre>if id relop id * ( id – id )\nthen id := id ;</pre>"
    ],
    [
     "Finite automata and regular expressions are used to describe generating tokens; <b>finite automata</b> are a modeling criterion of the lexical analysis phase.",
     "الـ finite automata والـ regular expressions بيتستخدموا في وصف توليد الـ tokens، والـ <b>finite automata</b> من الـ modeling criteria بتاعة الـ lexical analysis phase."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Languages and regular expressions",
   "ar_h": "الـ languages والـ regular expressions",
   "pts": [
    [
     "<b>Alphabet Σ</b>: finite, non-empty, ordered set of symbols. <b>String</b> (word/token): finite sequence of symbols (<code>0101</code> has length 4). <b>Language</b>: a set of strings over an alphabet.",
     "الـ <b>Alphabet Σ</b> هي set محدودة ومش فاضية ومرتّبة من الـ symbols. والـ <b>String</b> (أو word أو token) هي sequence محدودة من الـ symbols (الـ <code>0101</code> طولها 4). والـ <b>Language</b> هي set من الـ strings على alphabet."
    ],
    [
     "<b>Union</b> is commutative: {abc, ab, ba} ∪ {ba, bb} = {abc, ab, ba, bb}. <b>Concatenation</b>: each string of L1 followed by each of L2, <b>order matters</b>: {a,b}{0,11} = {a0, a11, b0, b11} but {0,11}{a,b} = {0a, 0b, 11a, 11b}.",
     "الـ <b>Union</b> commutative، مثال:<span class=\"ltr\">{abc, ab, ba} ∪ {ba, bb} = {abc, ab, ba, bb}</span>والـ <b>Concatenation</b> بتلزق كل string من L1 قبل كل string من L2، و<b>الترتيب فارق</b>:<span class=\"ltr\">{a,b}{0,11} = {a0, a11, b0, b11}</span><span class=\"ltr\">{0,11}{a,b} = {0a, 0b, 11a, 11b}</span>"
    ],
    [
     "<b>Kleene closure</b> (zero or more): {a}* = {ε, a, aa, …}. <b>Positive closure</b> (one or more): {a}+ = {a, aa, …}. ε is the empty string; {ε} has one element. <b>Or</b>: a|b|c = {a, b, c}.",
     "الـ <b>Kleene closure</b> (صفر أو أكتر):<span class=\"ltr\">{a}* = {ε, a, aa, …}</span>والـ <b>Positive closure</b> (واحد أو أكتر):<span class=\"ltr\">{a}+ = {a, aa, …}</span>الـ ε هي الـ empty string، والـ <bdi dir=\"ltr\">{ε}</bdi> فيها element واحد. والـ <b>Or</b>:<span class=\"ltr\">a|b|c = {a, b, c}</span>"
    ],
    [
     "<b>Precedence</b>: <b>*</b> first, then <b>concatenation</b>, then <b>|</b>: <code>a|ab*</code> = <code>a|(a(b*))</code>. Examples: (0|1)(0|1) = {00,01,10,11}; 0|0*1 = {0,1,01,001,…}; exactly one b over {a,b,c}: (a|c)*b(a|c)*.",
     "الـ <b>Precedence</b>: الـ <b>*</b> الأول، بعدها الـ <b>concatenation</b>، بعدها الـ <b>|</b>، يعني:<span class=\"ltr\">a|ab* = a|(a(b*))</span>أمثلة:<span class=\"ltr\">(0|1)(0|1) = {00,01,10,11}</span><span class=\"ltr\">0|0*1 = {0,1,01,001,…}</span>وعشان b واحدة بالظبط على <bdi dir=\"ltr\">{a,b,c}</bdi> نكتب:<span class=\"ltr\">(a|c)*b(a|c)*</span>"
    ],
    [
     "Algebra traps: <b>aε = εa = a</b>; Yε = εY; <b>(X|Y)* ≠ X*|Y*</b> (only the first contains XY). Laws: s|t = t|s, s|s = s, s? = s|ε, r(s|t) = rs|rt, (s*)* = s*, s*s* = s*, ss* = s+ = s*s.",
     "فخاخ الـ algebra:<span class=\"ltr\">aε = εa = a, Yε = εY</span><span class=\"ltr\">(X|Y)* ≠ X*|Y*</span>(الأولى بس فيها XY). والقوانين:<span class=\"ltr\">s|t = t|s, s|s = s, s? = s|ε, r(s|t) = rs|rt</span><span class=\"ltr\">(s*)* = s*, s*s* = s*, ss* = s+ = s*s</span>"
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Finite automata, DFA vs NFA",
   "ar_h": "الـ Finite automata والـ DFA مقابل الـ NFA",
   "pts": [
    [
     "A <b>finite automaton</b> recognizes the tokens of a regular expression: finite states (circles) and transitions (labelled arrows); start state has a \"start\" arrow; final state is a <b>double circle</b>. In a table: → start, * final, – no transition.",
     "الـ <b>finite automaton</b> بيتعرّف على الـ tokens بتاعة الـ regular expression، وفيه states محدودة (دواير) و transitions محدودة (أسهم عليها input). الـ start state عليها سهم \"start\"، والـ final state <b>دايرة دبل</b>. وفي الـ table السهم يعني start، والنجمة يعني final، والشرطة يعني مفيش transition."
    ],
    [
     "<b>1*01(0|1)*</b>: q0 (loop 1) –0→ q1 –1→ q2 (final, loop 0,1). Trace: 1101 → q0,q0,q1,q2 → accepted; 100 stops at q1 with no move on 0 → rejected.",
     "الـ <bdi dir=\"ltr\">1*01(0|1)*</bdi> شكلها:<span class=\"ltr\">q0 (loop 1) –0→ q1 –1→ q2 (final, loop 0,1)</span>مثال trace للـ input <bdi dir=\"ltr\">1101</bdi> بيمشي كده:<span class=\"ltr\">q0 → q0 → q1 → q2</span>فهو accepted. أما <bdi dir=\"ltr\">100</bdi> فبيقف عند q1 ومفيش transition بـ 0، فهو rejected."
    ],
    [
     "<b>a*</b>: one state, start and final, loop a. <b>a+</b>: start state with loop a, then a to a separate final state. <b>(a|b)*</b>: one start/final state with loop a,b.",
     "الـ <bdi dir=\"ltr\">a*</bdi> هي state واحدة start وfinal وعليها loop بـ a. والـ <bdi dir=\"ltr\">a+</bdi> هي start state عليها loop بـ a، وبعدين a لـ final state تانية. والـ <bdi dir=\"ltr\">(a|b)*</bdi> هي state واحدة start وfinal وعليها loop بـ <bdi dir=\"ltr\">a,b</bdi>."
    ],
    [
     "<b>DFA</b>: no ε transitions, exactly one next state, less time per input string, next state clearly set. <b>NFA</b>: can use ε transitions, a (state, input) pair may have many next states, more time than a DFA.",
     "الـ <b>DFA</b> مينفعش فيها <bdi dir=\"ltr\">ε</bdi> transitions، وليها next state واحدة بالظبط، ووقت أقل لكل input string، والـ next state واضحة. والـ <b>NFA</b> ينفع فيها <bdi dir=\"ltr\">ε</bdi> transitions، وكل pair من state و input ممكن يبقى ليه next states كتير، وبتاخد وقت أكتر من الـ DFA."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Fill the blank: the lexical analyzer takes <b>source code</b> and produces <b>tokens</b> (Finals 2024/25 (60) and (50), 2023/24 (60); Midterm 2026/27); generating tokens is described by <b>finite automata and regular expressions</b> (\"a and b\": Final 2024/25 (60), Summer 2023/24); keywords are recognized in <b>lexical analysis</b> (Finals Summer 2025, 2023/24 (50)); grouping characters into tokens → <b>scanner</b> (Midterm 2026/27); a modeling criterion of lexical analysis → <b>finite automata</b> (Final 2021/22). \"Tokens are generated by syntax analysis\" → False (Final 2023/24 (60)).",
     "أسئلة الفراغات: الـ lexical analyzer بياخد <b>source code</b> ويطلّع <b>tokens</b> <bdi dir=\"ltr\">(Finals 2024/25 (60), 2024/25 (50), 2023/24 (60); Midterm 2026/27)</bdi>، وتوليد الـ tokens بيتوصف بالـ <b>finite automata والـ regular expressions</b>، يعني «a and b» <bdi dir=\"ltr\">(Final 2024/25 (60), Summer 2023/24)</bdi>، والـ keywords بتتعرف في الـ <b>lexical analysis</b> <bdi dir=\"ltr\">(Finals Summer 2025, 2023/24 (50))</bdi>، واللي بيجمّع الحروف في tokens هو الـ <b>scanner</b> <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>، ومن الـ modeling criteria بتاعة الـ lexical analysis الـ <b>finite automata</b> <bdi dir=\"ltr\">(Final 2021/22)</bdi>. وجملة إن الـ tokens بتطلع من الـ syntax analysis <b>غلط</b> <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>."
    ],
    [
     "Regex algebra: aε = εa = <b>a</b>, so \"= ε\" → False (Final 2024/25 (50)); \"Yε ≠ εY\" → False (Summer 2025) and \"Yε = εY = Y\" → True (Summer 2023/24); (X|Y)* is equivalent to X*|Y* → <b>False</b> (Finals 2024/25 (60), 2023/24 (60); Midterm 2026/27); a|b denotes <b>{a, b}</b> (Summer 2025 T/F, Midterm 2026/27 MCQ).",
     "أسئلة الـ algebra:<span class=\"ltr\">aε = εa = a</span>فلو قالوا إنها بتساوي ε يبقى <b>غلط</b> <bdi dir=\"ltr\">(Final 2024/25 (50))</bdi>. وجملة <bdi dir=\"ltr\">Yε ≠ εY</bdi> <b>غلط</b> <bdi dir=\"ltr\">(Summer 2025)</bdi>، وجملة <bdi dir=\"ltr\">Yε = εY = Y</bdi> <b>صح</b> <bdi dir=\"ltr\">(Summer 2023/24)</bdi>. والـ <bdi dir=\"ltr\">(X|Y)*</bdi> مش زي <bdi dir=\"ltr\">X*|Y*</bdi>، فالجملة <b>غلط</b> <bdi dir=\"ltr\">(Finals 2024/25 (60), 2023/24 (60); Midterm 2026/27)</bdi>. والـ <bdi dir=\"ltr\">a|b</bdi> معناها <bdi dir=\"ltr\">{a, b}</bdi> <bdi dir=\"ltr\">(Summer 2025, Midterm 2026/27)</bdi>."
    ],
    [
     "Equivalent expressions: (a)|((b)*(c)) and b*c|a → equivalent, True (Summer 2025); a|(b*c) is equivalent to <b>b*c|a</b>; \"ab(c) is equivalent to (a)bc\" → <b>True</b>; \"a(b|c) is not equal to ab|ac\" → <b>False</b>, since r(s|t) = rs|rt (all Midterm 2026/27).",
     "أسئلة التساوي: الـ <bdi dir=\"ltr\">(a)|((b)*(c))</bdi> و <bdi dir=\"ltr\">b*c|a</bdi> متساويين، يعني <b>صح</b> <bdi dir=\"ltr\">(Summer 2025)</bdi>. والـ <bdi dir=\"ltr\">a|(b*c)</bdi> بتساوي <bdi dir=\"ltr\">b*c|a</bdi>، وجملة إن <bdi dir=\"ltr\">ab(c)</bdi> بتساوي <bdi dir=\"ltr\">(a)bc</bdi> <b>صح</b>، وجملة إن <bdi dir=\"ltr\">a(b|c)</bdi> مش زي <bdi dir=\"ltr\">ab|ac</bdi> <b>غلط</b> عشان<span class=\"ltr\">r(s|t) = rs|rt</span><bdi dir=\"ltr\">(Midterm 2026/27)</bdi>"
    ],
    [
     "Order: \"Order is not important in concatenation\" → <b>False</b> (Final 2024/25 (50), Midterm 2026/27); \"order is important / significant in concatenation\" → <b>True</b> (Finals 2021/22, Summer 2023/24); \"L1L2 gives the same strings as L2L1\" → False (Midterm 2026/27); \"in union the order of the produced elements is important\" → False (Final 2023/24 (50)).",
     "أسئلة الترتيب: جملة «الترتيب مش مهم في الـ concatenation» <b>غلط</b> <bdi dir=\"ltr\">(Final 2024/25 (50), Midterm 2026/27)</bdi>، وجملة «الترتيب مهم في الـ concatenation» <b>صح</b> <bdi dir=\"ltr\">(Finals 2021/22, Summer 2023/24)</bdi>، وإن <bdi dir=\"ltr\">L1L2</bdi> بتطلّع نفس strings الـ <bdi dir=\"ltr\">L2L1</bdi> <b>غلط</b> <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>، وإن الترتيب مهم في الـ union <b>غلط</b> <bdi dir=\"ltr\">(Final 2023/24 (50))</bdi>."
    ],
    [
     "Writing regular expressions (Midterm 2026/27): exactly two a's over {a,b,c} → <b>(b|c)*a(b|c)*a(b|c)*</b>; a single a followed by any number of b's or a single b followed by any number of a's → <b>ab* | ba*</b>; bbbb is recognized by <b>(a|b)*</b>. Sheet One: exactly two a's over {a,b} → <code>b*ab*ab*</code>.",
     "كتابة regular expressions <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>: اتنين a بالظبط على <bdi dir=\"ltr\">{a,b,c}</bdi> إجابتها<span class=\"ltr\">(b|c)*a(b|c)*a(b|c)*</span>وa واحدة وبعدها أي عدد b أو b واحدة وبعدها أي عدد a إجابتها <bdi dir=\"ltr\">ab* | ba*</bdi>، والـ bbbb بتتعرف بالـ <bdi dir=\"ltr\">(a|b)*</bdi>. ومن Sheet One: اتنين a بالظبط على <bdi dir=\"ltr\">{a,b}</bdi> إجابتها <code>b*ab*ab*</code>."
    ],
    [
     "Drawing: an FA for <b>b*a+(c|d)</b> and for <b>(a|b)*(c+|d+)</b> (Final 2024/25 (50), revision sheet); the regular expression of a drawn FA, e.g. a+b | ab+ (revision sheet); an FA for a regex like 1*01(0|1)*; comparing DFA and NFA.",
     "أسئلة الرسم: ارسم FA لـ <bdi dir=\"ltr\">b*a+(c|d)</bdi> ولـ <bdi dir=\"ltr\">(a|b)*(c+|d+)</bdi> <bdi dir=\"ltr\">(Final 2024/25 (50), revision sheet)</bdi>، واستخرج الـ regular expression من FA مرسوم، زي <bdi dir=\"ltr\">a+b | ab+</bdi> <bdi dir=\"ltr\">(revision sheet)</bdi>، وارسم FA لـ regex زي <bdi dir=\"ltr\">1*01(0|1)*</bdi>، وقارن بين الـ DFA والـ NFA."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Signs of an NFA, and NFA vs DFA",
   "ar_h": "علامات الـ NFA، والفرق بين الـ NFA والـ DFA",
   "pts": [
    [
     "An automaton is an <b>NFA</b> if it has one or more of these <b>3 signs</b>: (1) it <b>contains ε</b>; (2) a <b>loop on an input symbol followed by a transition with the same symbol</b> (e.g. q0 loops on 0,1 and q0 –0→ q1); (3) <b>multiple paths for the same input string</b> (try 001 on the slide-3 automaton).",
     "الـ automaton بيبقى <b>NFA</b> لو فيه علامة أو أكتر من الـ <b>3 علامات</b> دول: (1) <b>فيه <bdi dir=\"ltr\">ε</bdi></b>؛ (2) <b>loop على input symbol وبعدها transition بنفس الـ symbol</b> (زي الـ q0 اللي عليها loop بـ <bdi dir=\"ltr\">0,1</bdi> وكمان <bdi dir=\"ltr\">q0&nbsp;–0→&nbsp;q1</bdi>)، والعلامة (3) <b>أكتر من path لنفس الـ input string</b> (جرّب الـ 001 على automaton الـ slide 3)."
    ],
    [
     "<b>Trap</b>: a <b>loop by itself does NOT</b> make an automaton an NFA (a DFA may contain loops), and <b>several accept states do not</b> either. An NFA does not need a loop: ε alone is enough.",
     "<b>فخ</b>: الـ <b>loop لوحده مش</b> بيخلّي الـ automaton يبقى NFA (الـ DFA ممكن يبقى فيه loops)، وكمان <b>إن يكون فيه أكتر من accept state مش</b> بيخليه NFA. والـ NFA مش لازم يبقى فيه loop، الـ <bdi dir=\"ltr\">ε</bdi> لوحدها كفاية."
    ],
    [
     "<b>DFA vs NFA</b> (lecture table): ε transition: DFA <b>cannot</b>, NFA <b>can</b>. Next states: DFA <b>exactly one</b>; NFA zero, one or more (the slide writes \"zero or one\"). Time: running a string takes <b>less time in a DFA</b>. Next possible set: <b>clearly set</b> in a DFA; in an NFA every (state, symbol) pair <b>may have many possible next states</b>.",
     "<b>الفرق بين الـ DFA والـ NFA</b> (جدول المحاضرة): الـ <bdi dir=\"ltr\">ε</bdi> transition مينفعش في الـ DFA وينفع في الـ NFA. عدد الـ next states في الـ DFA <b>واحدة بس</b>، وفي الـ NFA ممكن صفر أو واحدة أو أكتر (السلايد كاتبة «zero or one»). الوقت: تشغيل أي string <b>أسرع في الـ DFA</b>. الـ next state في الـ DFA <b>محددة بوضوح</b>، وفي الـ NFA كل (state, symbol) <b>ممكن يبقى ليها next states كتير</b>."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Transition tables and the 3-step NFA → DFA method",
   "ar_h": "الـ transition tables وطريقة تحويل الـ NFA لـ DFA في 3 خطوات",
   "pts": [
    [
     "A <b>transition table</b> is a tabular representation of an automaton: <b>rows = states</b>, <b>columns = input symbols</b>, cells = next state(s), <b>\"-\" = no transition</b>. Slide 5: (Q, a) = Q, T is the non-deterministic entry; (T, a) = F, (T, b) = T.",
     "الـ <b>transition table</b> هو كتابة الـ automaton في جدول: <b>الصفوف هي الـ states</b>، و<b>الأعمدة هي الـ input symbols</b>، والخانات فيها الـ next states، و<b>الـ \"-\" معناها مفيش transition</b>. في slide 5 الخانة <bdi dir=\"ltr\">(Q,&nbsp;a)</bdi> فيها Q و T وهي الخانة اللي بتخليه non-deterministic، وكمان <bdi dir=\"ltr\">(T,&nbsp;a)</bdi> بتروح F، و <bdi dir=\"ltr\">(T,&nbsp;b)</bdi> بتروح T."
    ],
    [
     "<b>Step 1</b>: first transition table <b>with an ε column</b> (each state's ε cell holds the state itself). <b>Step 2</b>: second table <b>without ε</b>: start from the start state's <b>ε-closure</b>; every new <b>set</b> of states in a cell becomes a new row; repeat until no new sets. <b>Step 3</b>: draw the DFA; every set containing an original final state is <b>final</b>; an empty cell (-) is a dead state or no transition.",
     "<b>الخطوة 1</b>: أول transition table <b>فيه عمود <bdi dir=\"ltr\">ε</bdi></b> (خانة الـ <bdi dir=\"ltr\">ε</bdi> لكل state فيها الـ state نفسها). <b>الخطوة 2</b>: تاني table <b>من غير <bdi dir=\"ltr\">ε</bdi></b>، بنبدأ من الـ <b><bdi dir=\"ltr\">ε-closure</bdi></b> بتاعة الـ start state، وأي <b>set</b> جديدة تظهر في خانة تبقى row جديد، ونكرّر لحد ما مفيش sets جديدة. <b>الخطوة 3</b>: نرسم الـ DFA، وأي set فيها final state من الأصل تبقى <b>final</b>، والخانة الفاضية (-) معناها dead state أو مفيش transition."
    ],
    [
     "Slide example: A (start, loop on 0,1) –0→ B (final). First table: A: 0 → A,B, 1 → A, ε → A; B: ε → B. DFA: <b>A: 0 → {A,B}, 1 → A; {A,B}: 0 → {A,B}, 1 → A</b>; {A,B} is final (it contains B).",
     "مثال السلايد: الـ A هي الـ start وعليها loop بـ <bdi dir=\"ltr\">0,1</bdi>، والـ B هي الـ final، والـ edge:<span class=\"ltr\">A –0→ B</span>والـ DFA الناتج:<span class=\"ltr\">A: 0 → {A,B}, 1 → A</span><span class=\"ltr\">{A,B}: 0 → {A,B}, 1 → A</span>والـ <bdi dir=\"ltr\">{A,B}</bdi> هي الـ final لأنها فيها B."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "The two exam NFAs",
   "ar_h": "الـ NFAs بتوع الامتحانات",
   "pts": [
    [
     "<b>Exam NFA 1</b> (2021–2025): start 1, final 3; 1 –0→ 3, 3 –0→ 1, 3 –1→ 3, 3 –1→ 2, 2 –0→ 3. Non-deterministic because <b>(3, 1) has two next states</b> (loop on 1 and 3 –1→ 2).",
     "<b>الـ NFA الأول بتاع الامتحانات</b> (من 2021 لـ 2025): الـ start هو 1 والـ final هو 3، والـ edges:<span class=\"ltr\">1 –0→ 3; 3 –0→ 1; 3 –1→ 3; 3 –1→ 2; 2 –0→ 3</span>وهو non-deterministic لأن الـ <bdi dir=\"ltr\">(3,&nbsp;1)</bdi> <b>ليها اتنين next states</b> (الـ loop على 1 والـ edge اللي رايح لـ 2)."
    ],
    [
     "DFA of NFA 1: <b>{1}: 0 → {3}, 1 → ∅</b>; <b>{3}: 0 → {1}, 1 → {2,3}</b>; <b>{2,3}: 0 → {1,3}, 1 → {2,3}</b>; <b>{1,3}: 0 → {1,3}, 1 → {2,3}</b>. Start {1}; 4 states, 3 final ({3}, {2,3}, {1,3}).",
     "الـ DFA بتاع الـ NFA الأول:<span class=\"ltr\">{1}: 0 → {3}, 1 → ∅</span><span class=\"ltr\">{3}: 0 → {1}, 1 → {2,3}</span><span class=\"ltr\">{2,3}: 0 → {1,3}, 1 → {2,3}</span><span class=\"ltr\">{1,3}: 0 → {1,3}, 1 → {2,3}</span>والـ start هي <bdi dir=\"ltr\">{1}</bdi>، وفيه 4 states منهم 3 final (<bdi dir=\"ltr\">{3}</bdi> و <bdi dir=\"ltr\">{2,3}</bdi> و <bdi dir=\"ltr\">{1,3}</bdi>)."
    ],
    [
     "<b>Exam NFA 2</b> (with ε, 2024/25): start and final 1; 1 –b→ 2, 1 –ε→ 3, 2 –a→ 2, 2 –a,b→ 3, 3 –a→ 1. ε-closures E(1) = {1,3}, E(2) = {2}, E(3) = {3}, so the <b>DFA starts at {1,3}</b>.",
     "<b>الـ NFA التاني</b> (فيه <bdi dir=\"ltr\">ε</bdi>، امتحان <bdi dir=\"ltr\">2024/25</bdi>): الـ start والـ final هو 1، والـ edges:<span class=\"ltr\">1 –b→ 2; 1 –ε→ 3; 2 –a→ 2; 2 –a,b→ 3; 3 –a→ 1</span>والـ <bdi dir=\"ltr\">ε-closures</bdi> هي:<span class=\"ltr\">E(1) = {1,3}, E(2) = {2}, E(3) = {3}</span>يبقى <b>الـ DFA بيبدأ من <bdi dir=\"ltr\">{1,3}</bdi></b>."
    ],
    [
     "DFA of NFA 2: <b>{1,3}: a → {1,3}, b → {2}</b>; <b>{2}: a → {2,3}, b → {3}</b>; <b>{2,3}: a → {1,2,3}, b → {3}</b>; <b>{3}: a → {1,3}, b → ∅</b>; <b>{1,2,3}: a → {1,2,3}, b → {2,3}</b>. Final = sets containing 1: {1,3} and {1,2,3}. After each move, take the ε-closure (3 –a→ 1 gives {1,3}).",
     "الـ DFA بتاع الـ NFA التاني:<span class=\"ltr\">{1,3}: a → {1,3}, b → {2}</span><span class=\"ltr\">{2}: a → {2,3}, b → {3}</span><span class=\"ltr\">{2,3}: a → {1,2,3}, b → {3}</span><span class=\"ltr\">{3}: a → {1,3}, b → ∅</span><span class=\"ltr\">{1,2,3}: a → {1,2,3}, b → {2,3}</span>والـ final هي الـ sets اللي فيها 1، يعني <bdi dir=\"ltr\">{1,3}</bdi> و <bdi dir=\"ltr\">{1,2,3}</bdi>. وبعد كل move خد الـ <bdi dir=\"ltr\">ε-closure</bdi> (الـ <bdi dir=\"ltr\">3&nbsp;–a→&nbsp;1</bdi> بتدّي <bdi dir=\"ltr\">{1,3}</bdi>)."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Conditions MCQ: \"The following condition will cause any automaton to be an NFA\" → <b>having an ε</b>, not more than one accept state and not loops (Final 2024/25 (60)). \"The automaton with ε symbol is said to be\" → <b>NFA</b> (Summer 2025).",
     "سؤال الشروط: إيه الشرط اللي بيخلّي أي automaton يبقى NFA؟ الإجابة <b>having an <bdi dir=\"ltr\">ε</bdi></b>، مش أكتر من accept state ومش الـ loops <bdi dir=\"ltr\">(Final 2024/25 (60))</bdi>. والـ automaton اللي فيه <bdi dir=\"ltr\">ε</bdi> اسمه <b>NFA</b> <bdi dir=\"ltr\">(Summer 2025)</bdi>."
    ],
    [
     "T/F on loops and ε: \"A DFA may contain a loop\" → <b>True</b> (Final 2023/24 (60)); \"Any loop causes the automaton to be nondeterministic\" → <b>False</b> (Finals 2024/25 (50), Summer 2023/24; Midterm 2026/27); \"Any NFA must contain a loop\" and \"Any automaton must have only one accept state\" → <b>False</b> (Final 2023/24 (50)); \"The ε transition can exist in DFA\" → False (Final 2021/22); \"ε changes the regular expression accepted\" → False (Summer 2025, Midterm 2026/27).",
     "صح وغلط على الـ loops والـ <bdi dir=\"ltr\">ε</bdi>: الـ DFA ممكن يبقى فيه loop <b>صح</b> <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>، وأي loop بيخلي الـ automaton nondeterministic <b>غلط</b> <bdi dir=\"ltr\">(Finals 2024/25 (50), Summer 2023/24; Midterm 2026/27)</bdi>، وإن أي NFA لازم يبقى فيه loop أو إن أي automaton ليه accept state واحدة بس <b>غلط</b> <bdi dir=\"ltr\">(Final 2023/24 (50))</bdi>، والـ <bdi dir=\"ltr\">ε</bdi> transition ممكن تبقى في الـ DFA <b>غلط</b> <bdi dir=\"ltr\">(Final 2021/22)</bdi>، والـ <bdi dir=\"ltr\">ε</bdi> بتغيّر الـ regular expression <b>غلط</b> <bdi dir=\"ltr\">(Summer 2025, Midterm 2026/27)</bdi>."
    ],
    [
     "What automata can do (Midterm 2026/27 unless stated): NFA → DFA \"is possible\" → <b>True</b> (also Summer 2025); \"For every NFA a DFA can be found that accepts the same language\" → <b>True</b>; \"DFAs and NFAs only recognize regular expressions\" → <b>True</b>; \"Any NFA accepts ……\" → <b>regular expression</b>.",
     "الـ automata بتقدر تعمل إيه <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>: تحويل الـ NFA لـ DFA ممكن <b>صح</b> (وكمان في <bdi dir=\"ltr\">Summer 2025</bdi>)، ولكل NFA فيه DFA بيقبل نفس الـ language <b>صح</b>، والـ DFAs والـ NFAs بيتعرفوا على regular expressions بس <b>صح</b>، وأي NFA بيقبل <b>regular expression</b>."
    ],
    [
     "The big written question: <b>\"Why is this NFA non-deterministic? Convert it to a DFA\"</b>: exam NFA 1 (Finals 2024/25 (50), Summer 2025; revision sheet), its loop-on-0 variant (Final 2021/22), and the ε-NFA 2 (Final 2024/25 (60), revision sheet). MCQs may ask single DFA moves, e.g. {3} on 1 → {2,3}, {2,3} on 0 → {1,3}, the DFA start {1,3}, {2,3} on a → {1,2,3}.",
     "السؤال الكبير في الـ written: <b>«ليه الـ NFA ده non-deterministic؟ حوّله لـ DFA»</b>: الـ NFA الأول <bdi dir=\"ltr\">(Finals 2024/25 (50), Summer 2025; revision sheet)</bdi>، ونسخته اللي فيها loop على 0 <bdi dir=\"ltr\">(Final 2021/22)</bdi>، والـ NFA التاني اللي فيه <bdi dir=\"ltr\">ε</bdi> <bdi dir=\"ltr\">(Final 2024/25 (60), revision sheet)</bdi>. وأسئلة الـ MCQ ممكن تسأل على move واحدة، زي:<span class=\"ltr\">{3} on 1 → {2,3}; {2,3} on 0 → {1,3}</span><span class=\"ltr\">DFA start = {1,3}; {2,3} on a → {1,2,3}</span>"
    ],
    [
     "Other exam NFAs: <b>Final 2023/24 (60)</b>: start 0, final 3; 0 –a→ 1, 0 –b→ 2, 2 loops on a, 2 –a→ 3, 1 –b→ 3 → {0}: a → {1}, b → {2}; {1}: b → {3}; {2}: a → {2,3}; {2,3}: a → {2,3}; finals {3}, {2,3} (accepts ab | ba+). <b>Final 2023/24 (50)</b>: S (loop 0) –0→ R, R –0→ S, R loops on 1, R –1→ M, M –0→ R → {S}: 0 → {S,R}; {S,R}: 0 → {S,R}, 1 → {R,M}; {R,M}: 0 → {S,R}, 1 → {R,M}. <b>Summer 2023/24</b>: {0}: a → {2}, b → {1}; {2}: a → {1}; {1}: a → {1,2}; {1,2}: a → {1,2}; finals {2}, {1,2}.",
     "باقي الـ NFAs بتوع الامتحانات: <b><bdi dir=\"ltr\">Final 2023/24 (60)</bdi></b>: الـ start هو 0 والـ final هو 3، والـ DFA:<span class=\"ltr\">{0}: a → {1}, b → {2}; {1}: b → {3}</span><span class=\"ltr\">{2}: a → {2,3}; {2,3}: a → {2,3}</span>والـ finals هي <bdi dir=\"ltr\">{3}</bdi> و <bdi dir=\"ltr\">{2,3}</bdi>، وبيقبل <bdi dir=\"ltr\">ab | ba+</bdi>. <b><bdi dir=\"ltr\">Final 2023/24 (50)</bdi></b> بالـ states S و R و M:<span class=\"ltr\">{S}: 0 → {S,R}</span><span class=\"ltr\">{S,R}: 0 → {S,R}, 1 → {R,M}</span><span class=\"ltr\">{R,M}: 0 → {S,R}, 1 → {R,M}</span>و<b><bdi dir=\"ltr\">Summer 2023/24</bdi></b>:<span class=\"ltr\">{0}: a → {2}, b → {1}; {2}: a → {1}</span><span class=\"ltr\">{1}: a → {1,2}; {1,2}: a → {1,2}</span>والـ finals هي <bdi dir=\"ltr\">{2}</bdi> و <bdi dir=\"ltr\">{1,2}</bdi>."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Syntax analysis and the CFG",
   "ar_h": "الـ Syntax analysis والـ CFG",
   "pts": [
    [
     "Syntax analysis (<b>parsing</b>) is the <b>second phase</b>. The lexer uses regular expressions, which <b>cannot check balancing tokens</b> such as parentheses, so this phase is modeled on a <b>context-free grammar (CFG)</b>.",
     "الـ Syntax analysis (<b>parsing</b>) هو <b>تاني phase</b>. الـ lexer بيستخدم regular expressions، ودي <b>ماتقدرش تتشيك على الـ tokens المتوازنة</b> زي الأقواس، فالـ phase دي معمولة على أساس <b>context-free grammar (CFG)</b>."
    ],
    [
     "The parser: <b>input = stream of tokens</b>, checks it against the production rules to detect errors, <b>output = parse tree</b>. <b>Parsing</b> = the process of finding a parse tree for a string of tokens.",
     "الـ parser بياخد <b>stream of tokens</b> كـ input، ويقارنه بالـ production rules عشان يكتشف الـ errors، ويطلّع <b>parse tree</b> كـ output. والـ <b>Parsing</b> هو عملية إننا نلاقي parse tree لـ string من الـ tokens."
    ],
    [
     "<b>The 4 components of a CFG</b>: <b>Non-terminals (V)</b> = syntactic variables denoting sets of strings; <b>Terminals (Σ)</b> = tokens; <b>Productions (P)</b> = left side (a non-terminal) → right side; <b>Start symbol (S)</b> = where derivation begins. There is <b>no \"end symbol\"</b>.",
     "<b>الـ 4 مكوّنات بتوع الـ CFG</b>: الـ <b>Non-terminals (V)</b> وهي syntactic variables بتمثّل sets من الـ strings، والـ <b>Terminals (Σ)</b> وهي الـ tokens، والـ <b>Productions (P)</b> وكل واحدة فيها left side (non-terminal) وسهم و right side، والـ <b>Start symbol (S)</b> اللي الـ derivation بيبدأ منه. ومفيش حاجة اسمها <b>\"end symbol\"</b>."
    ],
    [
     "Example: S→ABC, A→a|Aa, B→b|Bb, C→c. Terminals {a,b,c}; non-terminals {S,A,B,C}; start S.",
     "مثال:<span class=\"ltr\">S→ABC, A→a|Aa, B→b|Bb, C→c</span>الـ terminals هي <bdi dir=\"ltr\">{a,b,c}</bdi>، والـ non-terminals هي <bdi dir=\"ltr\">{S,A,B,C}</bdi>، والـ start هو S."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Derivations and parse trees",
   "ar_h": "الـ Derivations والـ parse trees",
   "pts": [
    [
     "A <b>derivation</b> is a sequence of production rules applied from the <b>start symbol</b> to get the input string; at each step choose (1) which non-terminal and (2) which production. <b>Leftmost</b>: always replace the leftmost non-terminal; <b>rightmost</b>: the rightmost one. Top-down parsers give a <b>leftmost</b> derivation; bottom-up (shift-reduce, LR) give a <b>rightmost derivation in reverse</b>.",
     "الـ <b>derivation</b> هو سلسلة production rules بنطبّقها من الـ <b>start symbol</b> لحد ما نوصل للـ input string، وفي كل خطوة بنختار (1) أنهي non-terminal و(2) أنهي production. الـ <b>Leftmost</b> بيبدّل دايماً الـ non-terminal اللي على أقصى الشمال، والـ <b>rightmost</b> اللي على أقصى اليمين. الـ top-down parser بيطلّع <b>leftmost</b>، والـ bottom-up (shift-reduce, LR) بيطلّع <b>rightmost derivation بالعكس</b>."
    ],
    [
     "int*int with E→TX, X→+E|ε, T→int Y|(E), Y→*T|ε. Leftmost: TX ⇒ int Y X ⇒ int * T X ⇒ int * int Y X ⇒ int * int X ⇒ int * int. Rightmost: TX ⇒ T ⇒ int Y ⇒ int * T ⇒ int * int Y ⇒ int * int.",
     "مثال الـ <bdi dir=\"ltr\">int*int</bdi> بالـ grammar ده:<span class=\"ltr\">E→TX, X→+E|ε, T→int Y|(E), Y→*T|ε</span>الـ Leftmost:<span class=\"ltr\">TX ⇒ int Y X ⇒ int * T X ⇒ int * int Y X ⇒ int * int X ⇒ int * int</span>والـ Rightmost:<span class=\"ltr\">TX ⇒ T ⇒ int Y ⇒ int * T ⇒ int * int Y ⇒ int * int</span>"
    ],
    [
     "<b>Parse tree</b> = graphical depiction of a derivation: <b>root = start symbol</b>, <b>leaves = terminals</b>, <b>interior nodes = non-terminals</b>, <b>in-order traversal = the input string</b>. It shows <b>precedence</b>: the deepest sub-tree is evaluated first. Official key: a leftmost parsing tree grows from the <b>right</b> side.",
     "الـ <b>Parse tree</b> هو رسمة للـ derivation: الـ <b>root هو الـ start symbol</b>، والـ <b>leaves هي الـ terminals</b>، والـ <b>interior nodes هي الـ non-terminals</b>، والـ <b>in-order traversal بيدّي الـ input string</b>. وبيوضّح الـ <b>precedence</b>، أعمق sub-tree بيتحسب الأول. وإجابة الـ key الرسمي إن الـ leftmost parsing tree بيكبر من ناحية <b>الـ right</b>."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Ambiguity and left recursion",
   "ar_h": "الـ Ambiguity والـ left recursion",
   "pts": [
    [
     "<b>Ambiguous</b> = more than one parse tree (two different <b>leftmost</b>, or two different <b>rightmost</b>, derivations) for <b>at least one string</b>. <b>Trap</b>: one leftmost + one rightmost derivation of the same string proves nothing. Only one tree per sentence → <b>unambiguous</b>.",
     "الـ grammar يبقى <b>ambiguous</b> لو فيه أكتر من parse tree (اتنين <b>leftmost</b> مختلفين، أو اتنين <b>rightmost</b> مختلفين) لـ <b>string واحد على الأقل</b>. <b>فخ</b>: إن يبقى فيه leftmost واحد و rightmost واحد لنفس الـ string ده مش بيثبت حاجة. ولو فيه tree واحد بس لكل sentence يبقى <b>unambiguous</b>."
    ],
    [
     "Proof example: E→E+E | E–E | id, string id–id+id. LMD 1: E ⇒ E+E ⇒ E–E+E ⇒ ... (root +); LMD 2: E ⇒ E–E ⇒ id–E ⇒ id–E+E ⇒ ... (root –). Two trees, so ambiguous. E→E+T|T, T→T*F|F, F→(E)|id is <b>unambiguous</b>.",
     "مثال إثبات بالـ string <bdi dir=\"ltr\">id–id+id</bdi> والـ grammar ده:<span class=\"ltr\">E→E+E | E–E | id</span>الـ LMD الأول:<span class=\"ltr\">E ⇒ E+E ⇒ E–E+E ⇒ ... (root +)</span>والـ LMD التاني:<span class=\"ltr\">E ⇒ E–E ⇒ id–E ⇒ id–E+E ⇒ ... (root –)</span>يبقى فيه اتنين trees، فهو ambiguous. أما ده فـ <b>unambiguous</b>:<span class=\"ltr\">E→E+T|T, T→T*F|F, F→(E)|id</span>"
    ],
    [
     "<b>Left recursion</b>: a non-terminal A derives a string with <b>A itself as the left-most symbol</b>. <b>Immediate</b>: A → Aα | β. <b>Indirect</b>: S → Aα | β with A ⇒ Sd. Top-down parsers keep expanding the same non-terminal → <b>infinite loop</b>, so <b>LL(1) cannot be applied</b>.",
     "الـ <b>Left recursion</b> معناه إن فيه non-terminal A بيعمل derive لحاجة <b>أولها A نفسه</b>. الـ <b>Immediate</b> زي:<span class=\"ltr\">A → Aα | β</span>والـ <b>Indirect</b> زي:<span class=\"ltr\">S → Aα | β, A ⇒ Sd</span>والـ top-down parsers بيفضلوا يعملوا expand لنفس الـ non-terminal فيدخلوا في <b>infinite loop</b>، عشان كده <b>الـ <bdi dir=\"ltr\">LL(1)</bdi> مينفعش يتطبّق</b>."
    ],
    [
     "<b>Removal</b>: A → Aα | β becomes <b>A → βA', A' → αA' | ε</b>. E.g. E → E+T | T → E → TE', E' → +TE' | ε; A → aB | Ad → A → aBA', A' → dA' | ε; A → Abc | b → A → bA', A' → bcA' | ε.",
     "<b>إزالة الـ left recursion</b>: القاعدة دي:<span class=\"ltr\">A → Aα | β</span>بتبقى:<span class=\"ltr\">A → βA', A' → αA' | ε</span>أمثلة:<span class=\"ltr\">E → E+T | T  ⟹  E → TE', E' → +TE' | ε</span><span class=\"ltr\">A → aB | Ad  ⟹  A → aBA', A' → dA' | ε</span><span class=\"ltr\">A → Abc | b  ⟹  A → bA', A' → bcA' | ε</span>"
    ]
   ]
  },
  {
   "lec": 4,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Fill the blank: \"……… is a process of finding a parse tree for a string of tokens\" → <b>Parsing</b> (Final 2024/25 (60), Midterm 2026/27; revision sheet); parsing is also called <b>syntax</b> analysis (Finals 2024/25 (50), Summer 2025); input → <b>stream of tokens</b> (Finals 2024/25 (60), 2023/24 (50)); the syntax analyzer takes <b>tokens</b> and produces a <b>parsing tree</b> (Final 2021/22), so \"what does a syntax analyzer do?\" → <b>create parsing tree</b> (Final 2024/25 (50), Midterm 2026/27) and \"Syntax analysis generates parse tree\" → True (Midterm 2026/27).",
     "أسئلة املا الفراغ: الـ <b>Parsing</b> هو عملية إيجاد parse tree لـ string من الـ tokens <bdi dir=\"ltr\">(Final 2024/25 (60), Midterm 2026/27; revision sheet)</bdi>، والـ parsing اسمه كمان <b>syntax</b> analysis <bdi dir=\"ltr\">(Finals 2024/25 (50), Summer 2025)</bdi>، والـ input هو <b>stream of tokens</b> <bdi dir=\"ltr\">(Finals 2024/25 (60), 2023/24 (50))</bdi>، والـ syntax analyzer بياخد <b>tokens</b> ويطلّع <b>parsing tree</b> <bdi dir=\"ltr\">(Final 2021/22)</bdi>، فسؤال الـ syntax analyzer بيعمل إيه إجابته <b>create parsing tree</b> <bdi dir=\"ltr\">(Final 2024/25 (50), Midterm 2026/27)</bdi>، وجملة إن الـ syntax analysis بتطلّع parse tree <b>صح</b> <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>."
    ],
    [
     "The grammar: syntax analysis is modeled on <b>context free grammar</b> (Final 2024/25 (50), Midterm 2026/27); CFGs are used in the <b>syntax analysis</b> phase (Midterm 2026/27); the grammar of the program is checked at <b>syntax analysis</b> (Finals 2024/25 (50), Summer 2025, Summer 2023/24; Midterm 2026/27); the part that highly uses grammar → <b>Parser</b> (Final 2023/24 (60)).",
     "أسئلة الـ grammar: الـ syntax analysis معمولة على أساس <b>context free grammar</b> <bdi dir=\"ltr\">(Final 2024/25 (50), Midterm 2026/27)</bdi>، والـ CFGs بتتستخدم في الـ <b>syntax analysis</b> <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>، والـ grammar بتاع البرنامج بيتشيك في الـ <b>syntax analysis</b> <bdi dir=\"ltr\">(Finals 2024/25 (50), Summer 2025, Summer 2023/24; Midterm 2026/27)</bdi>، والجزء اللي بيستخدم الـ grammar أكتر حاجة هو الـ <b>Parser</b> <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>."
    ],
    [
     "CFG and trees: <b>not</b> a part of a CFG → <b>end symbol</b> (Finals 2024/25 (60), 2023/24 (50), 2021/22; Midterm 2026/27); leaf nodes → <b>terminals</b> (Finals 2024/25 (60), 2023/24 (50), 2021/22, Summer 2023/24); interior (non-leaf) nodes → <b>non-terminals</b> (Finals 2023/24 (60), Summer 2025).",
     "أسئلة الـ CFG والـ trees: الحاجة اللي <b>مش</b> جزء من الـ CFG هي الـ <b>end symbol</b> <bdi dir=\"ltr\">(Finals 2024/25 (60), 2023/24 (50), 2021/22; Midterm 2026/27)</bdi>، والـ leaf nodes هي الـ <b>terminals</b> <bdi dir=\"ltr\">(Finals 2024/25 (60), 2023/24 (50), 2021/22, Summer 2023/24)</bdi>، والـ interior nodes (اللي مش leaves) هي الـ <b>non-terminals</b> <bdi dir=\"ltr\">(Finals 2023/24 (60), Summer 2025)</bdi>."
    ],
    [
     "Tree growth (official key, not stated in the slides): a leftmost parsing tree grows from the <b>right</b> (MCQ in Finals 2023/24 (60), Summer 2023/24; T/F \"from the right\" → True in Final 2024/25 (50) and Midterm 2026/27; \"from the left\" → False in Final 2024/25 (60)); \"a rightmost parsing tree grows from the left\" → True (Final 2023/24 (50)). Midterm 2026/27 \"which statement is false?\" → <b>none of the mentioned</b>.",
     "نمو الـ tree (ده الـ key الرسمي، مش مكتوب في السلايدز): الـ leftmost parsing tree بيكبر من ناحية الـ <b>right</b>، ده جه MCQ في <bdi dir=\"ltr\">Finals 2023/24 (60), Summer 2023/24</bdi>، وصح وغلط «من الـ right» <b>صح</b> <bdi dir=\"ltr\">(Final 2024/25 (50), Midterm 2026/27)</bdi>، و«من الـ left» <b>غلط</b> <bdi dir=\"ltr\">(Final 2024/25 (60))</bdi>. وجملة إن الـ rightmost parsing tree بيكبر من الـ left <b>صح</b> <bdi dir=\"ltr\">(Final 2023/24 (50))</bdi>. وسؤال الـ Midterm «أنهي جملة غلط؟» إجابته <b>none of the mentioned</b> <bdi dir=\"ltr\">(Midterm 2026/27)</bdi>."
    ],
    [
     "Derivations: \"Derivation can only / must be started with the start symbol\" → <b>True</b> (Finals 2024/25 (50), 2023/24 (60), Summer 2025; Midterm 2026/27); \"Derivation can start with any non-terminal\" → <b>False</b> (Finals 2021/22, Summer 2023/24); \"Leftmost derivation is the inverse of rightmost derivation\" → False (Summer 2025). Replacing the leftmost non-terminal at each step → <b>Leftmost</b> derivation; a top-down parser generates a <b>leftmost</b> derivation (revision sheet).",
     "أسئلة الـ derivation: إن الـ derivation لازم يبدأ بالـ start symbol <b>صح</b> <bdi dir=\"ltr\">(Finals 2024/25 (50), 2023/24 (60), Summer 2025; Midterm 2026/27)</bdi>، وإنه ممكن يبدأ بأي non-terminal <b>غلط</b> <bdi dir=\"ltr\">(Finals 2021/22, Summer 2023/24)</bdi>، وإن الـ leftmost derivation هو عكس الـ rightmost <b>غلط</b> <bdi dir=\"ltr\">(Summer 2025)</bdi>. وتبديل الـ leftmost non-terminal كل خطوة اسمه <b>Leftmost</b> derivation، والـ top-down parser بيطلّع <b>leftmost</b> derivation <bdi dir=\"ltr\">(revision sheet)</bdi>."
    ],
    [
     "Ambiguity: only one leftmost or rightmost tree per sentence → <b>unambiguous</b> (Finals 2024/25 (60), 2023/24 (60), 2023/24 (50)); one or more trees / more than one rightmost tree → <b>ambiguous</b> (Final 2024/25 (50), Midterm 2026/27); one leftmost + one rightmost derivation of a string is <b>not</b> a proof (revision sheet). Written (8 marks): <b>prove ambiguity with two leftmost derivations and two trees</b> on id–id+id (Finals 2024/25 (50), Summer 2025, 2023/24 (60); revision sheet), 001101 (Finals 2023/24 (50), 2021/22), aaac (Final 2024/25 (60)), (num / num) + num (Summer 2023/24), aab and aabbccdd (revision sheet).",
     "أسئلة الـ ambiguity: لو فيه tree واحد بس (leftmost أو rightmost) لكل sentence يبقى <b>unambiguous</b> <bdi dir=\"ltr\">(Finals 2024/25 (60), 2023/24 (60), 2023/24 (50))</bdi>، ولو أكتر من tree أو أكتر من rightmost tree يبقى <b>ambiguous</b> <bdi dir=\"ltr\">(Final 2024/25 (50), Midterm 2026/27)</bdi>، و leftmost واحد مع rightmost واحد لنفس الـ string <b>مش</b> إثبات <bdi dir=\"ltr\">(revision sheet)</bdi>. وفي الـ written (<bdi dir=\"ltr\">8 marks</bdi>): <b>أثبت الـ ambiguity باتنين leftmost derivations واتنين trees</b> على <bdi dir=\"ltr\">id–id+id</bdi> <bdi dir=\"ltr\">(Finals 2024/25 (50), Summer 2025, 2023/24 (60); revision sheet)</bdi>، و <bdi dir=\"ltr\">001101</bdi> <bdi dir=\"ltr\">(Finals 2023/24 (50), 2021/22)</bdi>، و aaac <bdi dir=\"ltr\">(Final 2024/25 (60))</bdi>، و <bdi dir=\"ltr\">(num / num) + num</bdi> <bdi dir=\"ltr\">(Summer 2023/24)</bdi>، و aab و aabbccdd <bdi dir=\"ltr\">(revision sheet)</bdi>."
    ],
    [
     "Left recursion: A → Ab | c makes the grammar <b>left recursive</b> (Final 2024/25 (60)); \"LL(1) can be applied on left recursive CFG\" → <b>False</b> (Final 2023/24 (60)); removing it is the first step of the LL(1) problems: A → Abc | b (Finals 2023/24 (50), Summer 2023/24) and A → aB | Ad (revision sheet).",
     "أسئلة الـ left recursion: القاعدة <bdi dir=\"ltr\">A → Ab | c</bdi> بتخلي الـ grammar <b>left recursive</b> <bdi dir=\"ltr\">(Final 2024/25 (60))</bdi>، وإن الـ <bdi dir=\"ltr\">LL(1)</bdi> ينفع على left recursive CFG <b>غلط</b> <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>، وإزالته أول خطوة في مسائل الـ <bdi dir=\"ltr\">LL(1)</bdi>: <bdi dir=\"ltr\">A → Abc | b</bdi> <bdi dir=\"ltr\">(Finals 2023/24 (50), Summer 2023/24)</bdi> و <bdi dir=\"ltr\">A → aB | Ad</bdi> <bdi dir=\"ltr\">(revision sheet)</bdi>."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "FIRST and FOLLOW",
   "ar_h": "الـ FIRST والـ FOLLOW",
   "pts": [
    [
     "<b>FIRST(α)</b> = the terminals that begin strings derived from α; if α ⇒* ε, ε is in FIRST(α) too. <b>FOLLOW(A)</b> = the terminals that can appear <b>immediately to the right of A</b> in some sentential form; <b>$</b> is in it if A can be the rightmost symbol. FOLLOW <b>never contains ε</b>.",
     "الـ <b><bdi dir=\"ltr\">FIRST(α)</bdi></b> هي الـ terminals اللي بتبدأ بيها الـ strings الطالعة من α، ولو <bdi dir=\"ltr\">α ⇒* ε</bdi> يبقى ε كمان فيها. والـ <b><bdi dir=\"ltr\">FOLLOW(A)</bdi></b> هي الـ terminals اللي ممكن تيجي <b>على يمين A على طول</b> في أي sentential form، و<b>$</b> بتدخل فيها لو A ممكن تبقى آخر symbol على اليمين. والـ FOLLOW <b>عمره ما بيبقى فيه ε</b>."
    ],
    [
     "FIRST rules: (1) X terminal → FIRST(X) = {X}; (2) X → Y1Y2…Yk: add FIRST(Yi) − ε as long as Y1…Yi-1 can all derive ε; add ε only if every Yj can; (3) X → ε adds ε.",
     "قواعد الـ FIRST: (1) لو X terminal يبقى <bdi dir=\"ltr\">FIRST(X) = {X}</bdi>؛ (2) لو <bdi dir=\"ltr\">X → Y1Y2…Yk</bdi> ضيف <bdi dir=\"ltr\">FIRST(Yi) − ε</bdi> طول ما <bdi dir=\"ltr\">Y1…Yi-1</bdi> كلهم ممكن يطلّعوا ε، وضيف ε بس لو كلهم ممكن يطلّعوا ε؛ (3) لو فيه <bdi dir=\"ltr\">X → ε</bdi> ضيف ε."
    ],
    [
     "FOLLOW rules: (1) $ ∈ FOLLOW(S) for the start symbol; (2) A → αBβ: FIRST(β) − ε goes into FOLLOW(B); (3) A → αB, or A → αBβ with ε ∈ FIRST(β): FOLLOW(A) goes into FOLLOW(B).",
     "قواعد الـ FOLLOW: (1) الـ $ بتدخل في الـ FOLLOW بتاع الـ start symbol؛ (2) لو <bdi dir=\"ltr\">A → αBβ</bdi> يبقى <bdi dir=\"ltr\">FIRST(β) − ε</bdi> بتدخل في <bdi dir=\"ltr\">FOLLOW(B)</bdi>؛ (3) لو <bdi dir=\"ltr\">A → αB</bdi>، أو <bdi dir=\"ltr\">A → αBβ</bdi> و ε في <bdi dir=\"ltr\">FIRST(β)</bdi>، يبقى <bdi dir=\"ltr\">FOLLOW(A)</bdi> كله بيدخل في <bdi dir=\"ltr\">FOLLOW(B)</bdi>."
    ],
    [
     "Why we need them: for A → α | β, if FIRST(α) and FIRST(β) are <b>disjoint</b>, the next input symbol picks the right production (predictive parsing). FIRST fills the table; FOLLOW places the ε-productions.",
     "محتاجينهم ليه: في <bdi dir=\"ltr\">A → α | β</bdi>، لو <bdi dir=\"ltr\">FIRST(α)</bdi> و <bdi dir=\"ltr\">FIRST(β)</bdi> <b>ملهمش حاجة مشتركة</b>، الـ input symbol اللي جاي هو اللي بيختار الـ production الصح (الـ predictive parsing). الـ FIRST بيملا الـ table، والـ FOLLOW بيحدد مكان الـ ε-productions."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "LL(1) grammars, the table M and the parser",
   "ar_h": "الـ LL(1) grammars والـ table M والـ parser",
   "pts": [
    [
     "A <b>predictive parser</b> is a recursive-descent parser that needs <b>no backtracking</b>; grammars that allow one are <b>LL(1)</b>: <b>L</b>eft-to-right scan, <b>L</b>eftmost derivation, <b>1</b> lookahead symbol.",
     "الـ <b>predictive parser</b> هو recursive-descent parser <b>مش محتاج backtracking</b>، والـ grammars اللي ينفع نعملها واحد اسمها <b><bdi dir=\"ltr\">LL(1)</bdi></b>: أول L يعني الـ scan من الشمال لليمين (Left-to-right)، وتاني L يعني Leftmost derivation، والـ 1 يعني lookahead symbol واحد."
    ],
    [
     "G is LL(1) iff for every A → α | β: (1) α and β do not both derive strings beginning with the same terminal; (2) at most one of them derives ε; (3) if α ⇒* ε, β derives no string beginning with a terminal in FOLLOW(A). So: <b>no left recursion, no ambiguity, no table cell with two entries</b>.",
     "الـ G تبقى <bdi dir=\"ltr\">LL(1)</bdi> لو لكل <bdi dir=\"ltr\">A → α | β</bdi>: (1) α و β ميطلّعوش الاتنين strings بتبدأ بنفس الـ terminal؛ (2) واحدة بس منهم على الأكتر تطلّع ε؛ (3) لو <bdi dir=\"ltr\">α ⇒* ε</bdi> يبقى β متطلّعش string بيبدأ بـ terminal من <bdi dir=\"ltr\">FOLLOW(A)</bdi>. يعني: <b>مفيش left recursion، ومفيش ambiguity، ومفيش خانة في الـ table فيها اتنين entries</b>."
    ],
    [
     "Building M, for each production A → α: (1) put A → α in M[A, a] for every terminal a in FIRST(α); (2) if ε ∈ FIRST(α), put A → α in M[A, b] for every b in FOLLOW(A), including $. Empty cells are <b>errors</b>. Trap: ε-productions go under <b>FOLLOW</b>, never under FIRST.",
     "بناء الـ M، لكل production <bdi dir=\"ltr\">A → α</bdi>: (1) حطها في <bdi dir=\"ltr\">M[A, a]</bdi> لكل terminal a في <bdi dir=\"ltr\">FIRST(α)</bdi>؛ (2) لو ε في <bdi dir=\"ltr\">FIRST(α)</bdi> حطها في <bdi dir=\"ltr\">M[A, b]</bdi> لكل b في <bdi dir=\"ltr\">FOLLOW(A)</bdi>، ومعاهم الـ $. والخانات الفاضية معناها <b>error</b>. <b>فخ</b>: الـ ε-productions بتتحط تحت الـ <b>FOLLOW</b>، عمرها ما تتحط تحت الـ FIRST."
    ],
    [
     "Parsing: the stack starts as <b>S$</b> and the input as <b>w$</b>. Top terminal = input symbol → <b>match</b> (pop and advance). Top non-terminal A → replace it with the right side of M[A, a], first symbol on top. Both $ → <b>accept</b>. Empty cell → error. The expansions, in order, form the <b>leftmost derivation</b>.",
     "الـ Parsing: الـ stack بيبدأ <bdi dir=\"ltr\">S$</bdi> والـ input <bdi dir=\"ltr\">w$</bdi>. لو الـ top terminal وبيساوي الـ input symbol نعمل <b>match</b> (pop ونتقدم). لو الـ top non-terminal A نبدّله بالـ right side بتاعة <bdi dir=\"ltr\">M[A, a]</bdi> وأول symbol يبقى فوق. لو الاتنين $ يبقى <b>accept</b>. ولو الخانة فاضية يبقى error. والـ expansions بالترتيب بتكوّن الـ <b>leftmost derivation</b>."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "The expression grammar and Example 1",
   "ar_h": "الـ expression grammar ومثال 1",
   "pts": [
    [
     "<b>E → TE', E' → +TE' | ε, T → FT', T' → *FT' | ε, F → (E) | id</b>. FIRST(E) = FIRST(T) = FIRST(F) = {(, id} (T and F cannot vanish, so rule 2 stops at the first symbol); FIRST(E') = {+, ε}; FIRST(T') = {*, ε}.",
     "الـ grammar:<span class=\"ltr\">E → TE', E' → +TE' | ε, T → FT', T' → *FT' | ε, F → (E) | id</span>والـ FIRST:<span class=\"ltr\">FIRST(E) = FIRST(T) = FIRST(F) = {(, id}</span><span class=\"ltr\">FIRST(E') = {+, ε}, FIRST(T') = {*, ε}</span>(الـ T والـ F مش بيطلّعوا ε، فقاعدة 2 بتقف عند أول symbol)."
    ],
    [
     "FOLLOW(E) = FOLLOW(E') = {), $}; FOLLOW(T) = FOLLOW(T') = {+, ), $}; FOLLOW(F) = {+, *, ), $}. Table: E → TE' and T → FT' under ( and id; E' → +TE' under +, E' → ε under ) and $; T' → *FT' under *, T' → ε under +, ) and $; F → (E) under (, F → id under id: 13 entries, no conflicts.",
     "الـ FOLLOW:<span class=\"ltr\">FOLLOW(E) = FOLLOW(E') = {), $}</span><span class=\"ltr\">FOLLOW(T) = FOLLOW(T') = {+, ), $}</span><span class=\"ltr\">FOLLOW(F) = {+, *, ), $}</span>والـ table: الـ <bdi dir=\"ltr\">E → TE'</bdi> والـ <bdi dir=\"ltr\">T → FT'</bdi> تحت ( و id، والـ <bdi dir=\"ltr\">E' → +TE'</bdi> تحت +، والـ <bdi dir=\"ltr\">E' → ε</bdi> تحت ) و $، والـ <bdi dir=\"ltr\">T' → *FT'</bdi> تحت *، والـ <bdi dir=\"ltr\">T' → ε</bdi> تحت + و ) و $، والـ <bdi dir=\"ltr\">F → (E)</bdi> تحت (، والـ <bdi dir=\"ltr\">F → id</bdi> تحت id. يعني <bdi dir=\"ltr\">13</bdi> entry ومفيش conflicts."
    ],
    [
     "<b>Example 1: S → A, A → aB | Ad, B → b, C → g</b>. Remove the left recursion first: A → aBA', A' → dA' | ε. FIRST: S = A = {a}, A' = {d, ε}, B = {b}, C = {g}. FOLLOW: S = A = A' = {$}; B = {d, $} (FIRST(A') − ε, plus FOLLOW(A) because A' can vanish); C = { } because C never appears on a right side.",
     "<b>مثال 1</b>:<span class=\"ltr\">S → A, A → aB | Ad, B → b, C → g</span>نشيل الـ left recursion الأول:<span class=\"ltr\">A → aBA', A' → dA' | ε</span>الـ FIRST هي <bdi dir=\"ltr\">S = A = {a}</bdi>، و <bdi dir=\"ltr\">A' = {d, ε}</bdi>، و <bdi dir=\"ltr\">B = {b}</bdi>، و <bdi dir=\"ltr\">C = {g}</bdi>. والـ FOLLOW هي <bdi dir=\"ltr\">S = A = A' = {$}</bdi>، و <bdi dir=\"ltr\">B = {d, $}</bdi> (من <bdi dir=\"ltr\">FIRST(A') − ε</bdi> وكمان <bdi dir=\"ltr\">FOLLOW(A)</bdi> عشان <bdi dir=\"ltr\">A'</bdi> ممكن تختفي)، و <bdi dir=\"ltr\">C = { }</bdi> عشان C مش موجودة في أي right side."
    ],
    [
     "Its table: M[S,a] = S → A; M[A,a] = A → aBA'; M[A',d] = A' → dA'; M[A',$] = A' → ε; M[B,b] = B → b; M[C,g] = C → g. Parsing <b>abd</b>: S → A, A → aBA', match a, B → b, match b, A' → dA', match d, A' → ε, accept.",
     "الـ table بتاعه:<span class=\"ltr\">M[S,a] = S → A; M[A,a] = A → aBA'</span><span class=\"ltr\">M[A',d] = A' → dA'; M[A',$] = A' → ε</span><span class=\"ltr\">M[B,b] = B → b; M[C,g] = C → g</span>وتتبّع الـ <b>abd</b>:<span class=\"ltr\">S → A, A → aBA', match a, B → b, match b, A' → dA', match d, A' → ε, accept</span>"
    ]
   ]
  },
  {
   "lec": 6,
   "h": "The two exam grammars",
   "ar_h": "الـ grammars بتوع الامتحانات",
   "pts": [
    [
     "<b>S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε</b> (no left recursion). FIRST: S = U = {(, a, d}; V = {a, ε}; W = {c, ε}. FOLLOW: S = {$, ), b} ($ as start, ) from U → (S), b from U → aSb); U = {a, c, $, ), b} (FIRST(VW) − ε, plus FOLLOW(S) since VW can vanish); V = {c, $, ), b}; W = {$, ), b}.",
     "الـ grammar الأول:<span class=\"ltr\">S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε</span>مفيهوش left recursion. الـ FIRST هي <bdi dir=\"ltr\">S = U = {(, a, d}</bdi>، و <bdi dir=\"ltr\">V = {a, ε}</bdi>، و <bdi dir=\"ltr\">W = {c, ε}</bdi>. والـ FOLLOW:<span class=\"ltr\">S = {$, ), b}</span>(الـ $ عشان start، والـ ) من <bdi dir=\"ltr\">U → (S)</bdi>، والـ b من <bdi dir=\"ltr\">U → aSb</bdi>)<span class=\"ltr\">U = {a, c, $, ), b}</span>(من <bdi dir=\"ltr\">FIRST(VW) − ε</bdi> وكمان <bdi dir=\"ltr\">FOLLOW(S)</bdi> عشان VW ممكن تختفي)<span class=\"ltr\">V = {c, $, ), b}, W = {$, ), b}</span>"
    ],
    [
     "Its table: S → UVW under (, a, d; U → (S), U → aSb, U → d under (, a, d; V → aV under a, V → ε under c, b, ), $; W → cW under c, W → ε under b, ), $. No cell has two entries, so it is <b>LL(1)</b>. Parsing <b>(dc)ac</b>: S → UVW, U → (S), match (, S → UVW, U → d, match d, V → ε, W → cW, match c, W → ε, match ), V → aV, match a, V → ε, W → cW, match c, W → ε, accept (11 expansions, 6 matches).",
     "الـ table بتاعه: <bdi dir=\"ltr\">S → UVW</bdi> تحت ( و a و d، والـ U بالتلات productions تحت ( و a و d، و <bdi dir=\"ltr\">V → aV</bdi> تحت a، و <bdi dir=\"ltr\">V → ε</bdi> تحت c و b و ) و $، و <bdi dir=\"ltr\">W → cW</bdi> تحت c، و <bdi dir=\"ltr\">W → ε</bdi> تحت b و ) و $. مفيش خانة فيها اتنين، فهو <b><bdi dir=\"ltr\">LL(1)</bdi></b>. وتتبّع الـ <b><bdi dir=\"ltr\">(dc)ac</bdi></b>:<span class=\"ltr\">S → UVW, U → (S), match (, S → UVW, U → d, match d, V → ε, W → cW, match c, W → ε, match ), V → aV, match a, V → ε, W → cW, match c, W → ε, accept</span>يعني <bdi dir=\"ltr\">11</bdi> expansion و <bdi dir=\"ltr\">6</bdi> matches."
    ],
    [
     "<b>S → aABe, A → Abc | b, B → d</b>: A → Abc | b is left-recursive, so first A → bA', A' → bcA' | ε. FIRST: S {a}, A {b}, A' {b, ε}, B {d}. FOLLOW: S {$}, A {d} (FIRST(B)), A' {d} (= FOLLOW(A)), B {e}. Table: M[S,a] = S → aABe, M[A,b] = A → bA', M[A',b] = A' → bcA', M[A',d] = A' → ε, M[B,d] = B → d.",
     "الـ grammar التاني:<span class=\"ltr\">S → aABe, A → Abc | b, B → d</span>الـ <bdi dir=\"ltr\">A → Abc | b</bdi> فيها left recursion، فالأول:<span class=\"ltr\">A → bA', A' → bcA' | ε</span>الـ FIRST هي <bdi dir=\"ltr\">S {a}</bdi>، و <bdi dir=\"ltr\">A {b}</bdi>، و <bdi dir=\"ltr\">A' {b, ε}</bdi>، و <bdi dir=\"ltr\">B {d}</bdi>. والـ FOLLOW هي <bdi dir=\"ltr\">S {$}</bdi>، و <bdi dir=\"ltr\">A {d}</bdi> (من <bdi dir=\"ltr\">FIRST(B)</bdi>)، و <bdi dir=\"ltr\">A' {d}</bdi> (زي <bdi dir=\"ltr\">FOLLOW(A)</bdi>)، و <bdi dir=\"ltr\">B {e}</bdi>. والـ table:<span class=\"ltr\">M[S,a] = S → aABe, M[A,b] = A → bA'</span><span class=\"ltr\">M[A',b] = A' → bcA', M[A',d] = A' → ε, M[B,d] = B → d</span>"
    ],
    [
     "Parsing <b>abbcde</b>: S → aABe, match a, A → bA', match b, A' → bcA', match b, match c, A' → ε (input d), B → d, match d, match e, accept, so the string is correct.",
     "تتبّع الـ <b>abbcde</b>:<span class=\"ltr\">S → aABe, match a, A → bA', match b, A' → bcA', match b, match c, A' → ε (input d), B → d, match d, match e, accept</span>يبقى الـ string صح."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "The 12-mark written problem: <b>construct the LL(1) predictive parser for S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε, then give the parsing actions for (dc)ac</b> (Finals 2024/25 (60), 2023/24 (60)): FIRST, FOLLOW, the table, then the stack / input / action trace.",
     "مسألة الـ <bdi dir=\"ltr\">12 marks</bdi>: <b>ابني الـ <bdi dir=\"ltr\">LL(1)</bdi> predictive parser للـ grammar بتاع <bdi dir=\"ltr\">S → UVW</bdi> وطلّع الـ parsing actions للـ <bdi dir=\"ltr\">(dc)ac</bdi></b> <bdi dir=\"ltr\">(Finals 2024/25 (60), 2023/24 (60))</bdi>: الـ FIRST والـ FOLLOW والـ table، وبعدين جدول الـ stack والـ input والـ action."
    ],
    [
     "<b>\"Use LL(1) parsing to prove the correctness of abbcde\"</b> for S → aABe, A → Abc | b, B → d (Finals 2023/24 (50), Summer 2023/24): remove the left recursion first, then FIRST/FOLLOW, the table and a trace that ends in accept. The revision sheet asks the same for <b>abd</b> with S → A, A → aB | Ad, B → b, C → g.",
     "<b>«استخدم الـ <bdi dir=\"ltr\">LL(1)</bdi> parsing عشان تثبت إن abbcde صح»</b> للـ grammar بتاع <bdi dir=\"ltr\">S → aABe</bdi> <bdi dir=\"ltr\">(Finals 2023/24 (50), Summer 2023/24)</bdi>: شيل الـ left recursion الأول، وبعدين الـ FIRST والـ FOLLOW والـ table وتتبّع بيخلص بـ accept. والـ revision sheet بيسأل نفس السؤال على <b>abd</b> بالـ grammar بتاع <bdi dir=\"ltr\">S → A, A → aB | Ad</bdi>."
    ],
    [
     "Short questions: \"LL(1) can be applied on left recursive CFG\" → <b>False</b> (Final 2023/24 (60)); a top-down parser generates a <b>leftmost derivation</b> and builds the tree from the start symbol down to the input (revision sheet); single cells and sets of these grammars, e.g. FOLLOW(S) = {$, ), b}, FOLLOW(U) = {a, c, $, ), b}, M[V, )] = V → ε (Final 2024/25 (60)), FOLLOW(B) = {d, $} and M[A', $] = A' → ε (revision sheet).",
     "الأسئلة القصيرة: إن الـ <bdi dir=\"ltr\">LL(1)</bdi> ينفع على left recursive CFG <b>غلط</b> <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>، والـ top-down parser بيطلّع <b>leftmost derivation</b> وبيبني الـ tree من الـ start symbol لحد الـ input <bdi dir=\"ltr\">(revision sheet)</bdi>، وأسئلة على خانة أو set واحدة من الـ grammars دي، زي:<span class=\"ltr\">FOLLOW(S) = {$, ), b}, FOLLOW(U) = {a, c, $, ), b}, M[V, )] = V → ε</span><bdi dir=\"ltr\">(Final 2024/25 (60))</bdi>، و:<span class=\"ltr\">FOLLOW(B) = {d, $}, M[A', $] = A' → ε</span><bdi dir=\"ltr\">(revision sheet)</bdi>"
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Semantic analysis",
   "ar_h": "الـ Semantic analysis",
   "pts": [
    [
     "Semantic analysis makes sure the declarations and statements are <b>semantically correct</b>. It uses the <b>syntax tree and the symbol table</b> to check consistency with the language definition, and gathers <b>type information</b> into the syntax tree or symbol table; the compiler later uses it in <b>intermediate-code generation</b>.",
     "الـ semantic analysis بتتأكد إن الـ declarations والـ statements <b>صح من ناحية المعنى</b>. بتستخدم الـ <b>syntax tree والـ symbol table</b> عشان تتشيك إن البرنامج ماشي مع تعريف اللغة، وبتجمّع <b>type information</b> وتحطها في الـ syntax tree أو الـ symbol table، والـ compiler بيستخدمها بعدين في الـ <b>intermediate-code generation</b>."
    ],
    [
     "Type checking is done during semantic analysis, i.e. during <b>syntax-directed translation</b>. Input: <b>syntax tree</b>. Output: <b>annotated syntax tree</b>, a parse tree showing the attribute values at each node.",
     "الـ type checking بيتعمل في الـ semantic analysis، يعني في الـ <b>syntax-directed translation</b>. الـ input هو الـ <b>syntax tree</b>، والـ output هو الـ <b>annotated syntax tree</b>، وده parse tree فيه قيم الـ attributes عند كل node."
    ],
    [
     "The 6 semantic errors: <b>type mismatch</b>, <b>undeclared variable</b>, <b>reserved identifier misuse</b>, <b>multiple declaration</b> of a variable in a scope, <b>accessing an out-of-scope variable</b>, <b>actual and formal parameter mismatch</b>. Trap: a missing parenthesis is a syntax error, not one of these.",
     "الـ 6 semantic errors: الـ <b>type mismatch</b>، والـ <b>undeclared variable</b>، والـ <b>reserved identifier misuse</b>، والـ <b>multiple declaration</b> لـ variable في نفس الـ scope، والـ <b>accessing an out-of-scope variable</b>، والـ <b>actual and formal parameter mismatch</b>. <b>فخ</b>: القوس الناقص ده syntax error، مش واحد منهم."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Attribute grammar",
   "ar_h": "الـ Attribute grammar",
   "pts": [
    [
     "An <b>attribute grammar</b> is a special CFG where <b>attributes</b> are appended to one or more of its <b>non-terminals</b> to give context-sensitive information. Each attribute has a well-defined domain (integer, float, character, string, expressions).",
     "الـ <b>attribute grammar</b> هي CFG مخصوصة بنضيف فيها <b>attributes</b> لواحد أو أكتر من الـ <b>non-terminals</b> عشان تدّي معلومات context-sensitive. وكل attribute ليه domain واضح (زي الـ integer والـ float والـ character والـ string والـ expressions)."
    ],
    [
     "It gives <b>semantics</b> to the CFG (it can specify both syntax and semantics) and, viewed as a parse tree, passes values among the nodes. Example: E → E + T { E.value = E.value + T.value }, where \"value\" is the attribute.",
     "بتدّي <b>semantics</b> للـ CFG (تقدر توصف الـ syntax والـ semantics الاتنين)، ولو بصّينا لها كـ parse tree بتنقل قيم بين الـ nodes. مثال:<span class=\"ltr\">E → E + T { E.value = E.value + T.value }</span>والـ \"value\" هنا هي الـ attribute."
    ],
    [
     "It is produced by <b>attaching attributes to each non-terminal of the CFG</b>. Semantic analysis uses the <b>attribute</b> grammar to transform the <b>syntax</b> tree into the <b>annotated syntax</b> tree.",
     "بتتعمل بإننا <b>نلزق attributes لكل non-terminal في الـ CFG</b>. والـ semantic analysis بتستخدم الـ <b>attribute</b> grammar عشان تحوّل الـ <b>syntax</b> tree لـ <b>annotated syntax</b> tree."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Syntax Directed Translation (SDT)",
   "ar_h": "الـ Syntax Directed Translation (SDT)",
   "pts": [
    [
     "<b>SDT</b> (Syntax Directed Translation) = <b>augmented rules added to the grammar that facilitate semantic analysis</b>. Information is passed <b>bottom-up and/or top-down</b> the parse tree as attributes attached to the nodes.",
     "الـ <b>SDT</b> (Syntax Directed Translation) هي <b>قواعد زيادة بنضيفها للـ grammar عشان تسهّل الـ semantic analysis</b>. المعلومات بتتنقل <b>من تحت لفوق و/أو من فوق لتحت</b> في الـ parse tree على شكل attributes متعلقة في الـ nodes."
    ],
    [
     "SDT rules use 3 things: <b>lexical values</b> of nodes, <b>constants</b>, and <b>attributes</b> of non-terminals. In general SDT associates a <b>set of attributes with every node</b> and a <b>set of translation rules with every production</b>; the result is the annotated syntax tree.",
     "قواعد الـ SDT بتستخدم 3 حاجات: الـ <b>lexical values</b> بتاعة الـ nodes، والـ <b>constants</b>، والـ <b>attributes</b> بتاعة الـ non-terminals. وبشكل عام الـ SDT بتربط <b>set من الـ attributes بكل node</b> و<b>set من الـ translation rules بكل production</b>، والناتج هو الـ annotated syntax tree."
    ],
    [
     "General approach: build a parse or syntax tree and compute the attribute values at its nodes by visiting them in some order; often this is done during parsing, without an explicit tree.",
     "الطريقة العامة: نبني parse tree أو syntax tree ونحسب قيم الـ attributes عند الـ nodes بإننا نزورها بترتيب معين، وكتير بيتعمل ده وقت الـ parsing من غير ما نبني tree صريحة."
    ],
    [
     "Worked example <b>2 + 3 * 4</b> with these rules:<pre>E -> E + T  {E.val=E.val+T.val}\nE -> T      {E.val=T.val}\nT -> T * F  {T.val=T.val*F.val}\nT -> F      {T.val=F.val}\nF -> INT    {F.val=INT.lexval}</pre>One depth-first traversal, bottom-up (children before the parent): F = 2 → T = 2 → E = 2; F = 3 → T = 3; F = 4; T = 3 * 4 = 12; E = 2 + 12 = <b>14</b>. The 2, 3, 4 are <b>lexical values</b>; writing E → E1 + T tells the child from the parent.",
     "مثال <b><bdi dir=\"ltr\">2 + 3 * 4</bdi></b> بالقواعد دي:<pre>E -> E + T  {E.val=E.val+T.val}\nE -> T      {E.val=T.val}\nT -> T * F  {T.val=T.val*F.val}\nT -> F      {T.val=F.val}\nF -> INT    {F.val=INT.lexval}</pre>بنعمل depth-first traversal واحد من تحت لفوق (الـ children قبل الـ parent):<span class=\"ltr\">F = 2 → T = 2 → E = 2; F = 3 → T = 3; F = 4</span><span class=\"ltr\">T = 3 * 4 = 12; E = 2 + 12 = 14</span>والـ 2 والـ 3 والـ 4 اسمهم <b>lexical values</b>، وكتابة <bdi dir=\"ltr\">E → E1 + T</bdi> بتفرّق الـ child عن الـ parent."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Synthesized vs inherited; definite assignment",
   "ar_h": "الـ synthesized مقابل الـ inherited، والـ definite assignment",
   "pts": [
    [
     "<b>Synthesized</b> attributes get their values from their <b>child nodes</b> and pass <b>upwards</b> (leaves → root, e.g. E → E + T); they never take values from parent or siblings. In S → ABC, S takes values from A, B, C.",
     "الـ <b>Synthesized</b> attributes بتاخد قيمها من الـ <b>child nodes</b> وبتطلع <b>لفوق</b> (من الـ leaves للـ root، زي <bdi dir=\"ltr\">E → E + T</bdi>)، وعمرها ما بتاخد من الـ parent أو الـ siblings. في <bdi dir=\"ltr\">S → ABC</bdi> الـ S بتاخد من A و B و C."
    ],
    [
     "<b>Inherited</b> attributes get their values from their <b>parent and/or sibling</b> nodes and pass <b>downwards</b> (and sideways). In S → ABC: A from S, B, C; B from S, A, C; C from S, A, B. A symbol table is <b>synthesized by a declaration</b> and <b>inherited by the scope</b> of that declaration.",
     "الـ <b>Inherited</b> attributes بتاخد قيمها من الـ <b>parent و/أو الـ siblings</b> وبتنزل <b>لتحت</b> (وللجنب). في <bdi dir=\"ltr\">S → ABC</bdi>: الـ A بتاخد من S و B و C، والـ B من S و A و C، والـ C من S و A و B. والـ symbol table بيبقى <b>synthesized من الـ declaration</b> و<b>inherited في الـ scope</b> بتاع الـ declaration ده."
    ],
    [
     "<b>Definite assignment analysis</b>: a data-flow analysis that ensures a variable is always assigned before it is used. States: <b>definitely assigned</b> (known with certainty to be assigned), <b>definitely unassigned</b> (known with certainty to be unassigned), <b>unknown</b> (may or may not be assigned).",
     "الـ <b>Definite assignment analysis</b> هي data-flow analysis بتتأكد إن الـ variable دايماً بياخد قيمة قبل ما يتستخدم. الحالات: الـ <b>definitely assigned</b> (أكيد اتعمله assign)، والـ <b>definitely unassigned</b> (أكيد ماتعملوش assign)، والـ <b>unknown</b> (ممكن يكون اتعمله وممكن لأ)."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Attribute direction: from child nodes → <b>synthesized</b> (Final 2024/25 (60) MCQ; T/F → True in Finals 2024/25 (50), 2023/24 (50); revision sheet); from parent nodes → <b>inherited</b> (Final 2024/25 (50) MCQ; T/F → True in Summer 2025). Traps: \"Inherited attributes get values from their child nodes\" → False (Summer 2023/24, revision sheet); \"Attributes that get values from parent nodes are called synthesized\" → False (Final 2023/24 (60)). Final 2021/22 printed only derivation options, so its key is <b>none of the mentioned</b>.",
     "اتجاه الـ attributes: اللي بتاخد من الـ child nodes هي الـ <b>synthesized</b>، جت MCQ في <bdi dir=\"ltr\">Final 2024/25 (60)</bdi>، وصح وغلط إجابته <b>صح</b> <bdi dir=\"ltr\">(Finals 2024/25 (50), 2023/24 (50); revision sheet)</bdi>. واللي بتاخد من الـ parent nodes هي الـ <b>inherited</b>، جت MCQ في <bdi dir=\"ltr\">Final 2024/25 (50)</bdi>، وصح وغلط <b>صح</b> <bdi dir=\"ltr\">(Summer 2025)</bdi>. الفخاخ: إن الـ inherited بتاخد من الـ child nodes <b>غلط</b> <bdi dir=\"ltr\">(Summer 2023/24, revision sheet)</bdi>، وإن اللي بتاخد من الـ parent اسمها synthesized <b>غلط</b> <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>. وامتحان <bdi dir=\"ltr\">2021/22</bdi> حط اختيارات derivations بس، فالإجابة <b>none of the mentioned</b>."
    ],
    [
     "Attribute grammar: attaching attributes to each non-terminal of the CFG produces an <b>attribute grammar</b> (Final 2024/25 (60), revision sheet); semantic analysis is modeled on <b>attribute grammar</b> (Summer 2023/24); it uses <b>attribute</b> grammar to transform <b>syntax</b> tree into <b>annotated syntax</b> tree (Final 2023/24 (50)); \"Attribute grammar is used on the syntax tree to generate the annotated syntax tree\" → True (revision sheet); \"Semantic analysis produces semantic table\" → False (Final 2023/24 (60)).",
     "أسئلة الـ attribute grammar: لزق attributes لكل non-terminal في الـ CFG بيطلّع <b>attribute grammar</b> <bdi dir=\"ltr\">(Final 2024/25 (60), revision sheet)</bdi>، والـ semantic analysis معمولة على أساس الـ <b>attribute grammar</b> <bdi dir=\"ltr\">(Summer 2023/24)</bdi>، وبتستخدم الـ <b>attribute</b> grammar عشان تحوّل الـ <b>syntax</b> tree لـ <b>annotated syntax</b> tree <bdi dir=\"ltr\">(Final 2023/24 (50))</bdi>، وإن الـ attribute grammar بيتستخدم على الـ syntax tree عشان يطلّع الـ annotated syntax tree <b>صح</b> <bdi dir=\"ltr\">(revision sheet)</bdi>، وإن الـ semantic analysis بتطلّع semantic table <b>غلط</b> <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>."
    ],
    [
     "SDT: the abbreviation is <b>Syntax Directed Translation</b> (Final 2023/24 (60) MCQ; \"Semantic Directed Translation\" → False in Finals 2023/24 (50), 2021/22); \"SDT is the process of using the CFG along the syntax tree to get the annotated syntax tree\" → True (Final 2024/25 (60)); type checking is done during <b>SDT</b>, and a parse tree showing the attribute values at each node is the <b>annotated parse tree</b> (revision sheet).",
     "أسئلة الـ SDT: الاختصار معناه <b>Syntax Directed Translation</b>، جت MCQ في <bdi dir=\"ltr\">Final 2023/24 (60)</bdi>، وإنها Semantic Directed Translation <b>غلط</b> <bdi dir=\"ltr\">(Finals 2023/24 (50), 2021/22)</bdi>. وإن الـ SDT هي استخدام الـ CFG مع الـ syntax tree عشان نوصل للـ annotated syntax tree <b>صح</b> <bdi dir=\"ltr\">(Final 2024/25 (60))</bdi>. والـ type checking بيتعمل في الـ <b>SDT</b>، والـ parse tree اللي فيه قيم الـ attributes عند كل node اسمه <b>annotated parse tree</b> <bdi dir=\"ltr\">(revision sheet)</bdi>."
    ],
    [
     "Definite assignment: known with certainty to be assigned → <b>definitely assigned</b> (Final 2021/22, revision sheet); may or may not be assigned → <b>unknown</b> (revision sheet). Written: <b>\"What is the purpose of SDT?\" / \"Describe SDT\"</b> (Final 2023/24 (60) 4 marks, Summer 2023/24 8 marks, revision sheet) and <b>\"Differentiate between synthesized and inherited attributes\"</b> (revision sheet).",
     "الـ definite assignment: لو أكيد اتعمله assign يبقى <b>definitely assigned</b> <bdi dir=\"ltr\">(Final 2021/22, revision sheet)</bdi>، ولو ممكن وممكن لأ يبقى <b>unknown</b> <bdi dir=\"ltr\">(revision sheet)</bdi>. وفي الـ written: <b>«إيه الغرض من الـ SDT؟» أو «اوصف الـ SDT»</b> <bdi dir=\"ltr\">(Final 2023/24 (60) 4 marks, Summer 2023/24 8 marks, revision sheet)</bdi>، و<b>«فرّق بين الـ synthesized والـ inherited attributes»</b> <bdi dir=\"ltr\">(revision sheet)</bdi>."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Binding and scope: static vs dynamic",
   "ar_h": "الـ Binding والـ scope: الـ static مقابل الـ dynamic",
   "pts": [
    [
     "<b>Binding</b> connects a <b>declaration</b> and its <b>uses</b>. The <b>scope</b> of an identifier is the portion of the program where it is accessible. The same name may refer to different things in different parts; different scopes of the same name <b>do not overlap</b>.",
     "الـ <b>Binding</b> بيربط الـ <b>declaration</b> بالـ <b>uses</b> بتوعه. والـ <b>scope</b> بتاع الـ identifier هو الجزء من البرنامج اللي تقدر توصله فيه. نفس الاسم ممكن يشاور على حاجات مختلفة في أماكن مختلفة، والـ scopes المختلفة لنفس الاسم <b>مش بتتداخل</b>."
    ],
    [
     "<b>Static binding</b>: scoping based on the <b>structure of the syntax tree</b> (braces / blocks); depends only on the <b>program text</b>; resolved at <b>compile time</b>; most languages, e.g. <b>Java, C</b>.",
     "الـ <b>Static binding</b>: الـ scoping ماشي على <b>structure الـ syntax tree</b> (الأقواس والـ blocks)، وبيعتمد على <b>نص البرنامج</b> بس، وبيتحل في الـ <b>compile time</b>، ومعظم اللغات زي الـ <b>Java والـ C</b>."
    ],
    [
     "<b>Dynamic binding</b>: the declaration <b>most recently encountered during execution</b> defines the current use; depends on execution, walking up the symbol-table stack to find the right instance; <b>cannot</b> be resolved at compile time; a few languages: <b>Lisp, SNOBOL, Perl</b> (via keywords).",
     "الـ <b>Dynamic binding</b>: الـ declaration <b>اللي اتقابل آخر مرة وقت التنفيذ</b> هو اللي بيحدد الاستخدام الحالي، وبيعتمد على التنفيذ، وبيطلع لفوق في الـ symbol-table stack عشان يلاقي النسخة الصح، و<b>مينفعش</b> يتحل في الـ compile time، ولغات قليلة بتستخدمه: الـ <b>Lisp والـ SNOBOL والـ Perl</b> (بـ keywords معينة)."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Working out binding outputs",
   "ar_h": "إزاي تحسب الـ output في الـ binding",
   "pts": [
    [
     "Method: inside the inner block both rules use the inner declaration, so the inner print is the same. After the closing brace: <b>static</b> → the outer declaration again; <b>dynamic</b> (course convention) → the most recently executed (inner) declaration is still used.",
     "الطريقة: جوه الـ block الداخلي الاتنين بيستخدموا الـ declaration الداخلي، فالـ print اللي جوه واحد. بعد قوس القفل: الـ <b>static</b> بيرجع للـ declaration اللي برّه، والـ <b>dynamic</b> (اتفاقية الكورس) بيفضل يستخدم آخر declaration اتنفّذ (الداخلي)."
    ],
    [
     "Lecture example:<pre>{ int x = 1; int y = 2;\n  { double x = 3.14159;\n    y += (int)x; }  // y = 5\n  y += (int)x;\n}  // static 6, dynamic 8</pre>The revision-sheet version (int x = 3 inside, cout after each +=) prints <b>5 6</b> static and <b>5 8</b> dynamic.",
     "مثال المحاضرة:<pre>{ int x = 1; int y = 2;\n  { double x = 3.14159;\n    y += (int)x; }  // y = 5\n  y += (int)x;\n}  // static 6, dynamic 8</pre>ونسخة الـ revision sheet (فيها <bdi dir=\"ltr\">int x = 3</bdi> جوه و cout بعد كل <bdi dir=\"ltr\">+=</bdi>) بتطبع <bdi dir=\"ltr\">5 6</bdi> في الـ static و <bdi dir=\"ltr\">5 8</bdi> في الـ dynamic."
    ],
    [
     "Exam codes: a = 10, b = 20; { a = 30; b *= a; print b } b += a; print b → static <b>600 610</b>, dynamic <b>600 630</b> (Final 2023/24 (60)). i = 10, w = 20; { i = 3; w += i; print w } w += i; print w → static <b>23 33</b>, dynamic <b>23 26</b> (Final 2021/22).",
     "أكواد الامتحانات: لو <bdi dir=\"ltr\">a = 10, b = 20</bdi> وجوه الـ block <bdi dir=\"ltr\">a = 30; b *= a</bdi> وبعدين <bdi dir=\"ltr\">b += a</bdi>، يبقى الـ static <bdi dir=\"ltr\">600 610</bdi> والـ dynamic <bdi dir=\"ltr\">600 630</bdi> <bdi dir=\"ltr\">(Final 2023/24 (60))</bdi>. ولو <bdi dir=\"ltr\">i = 10, w = 20</bdi> وجوه <bdi dir=\"ltr\">i = 3; w += i</bdi> وبعدين <bdi dir=\"ltr\">w += i</bdi>، يبقى الـ static <bdi dir=\"ltr\">23 33</bdi> والـ dynamic <bdi dir=\"ltr\">23 26</bdi> <bdi dir=\"ltr\">(Final 2021/22)</bdi>."
    ],
    [
     "x = 1, y = 2; { x = 3*2; y += x; print x, y } y += x; print x, y → inner <b>x= 6 y= 8</b> in both; after the block static <b>x= 1 y= 9</b>, dynamic <b>x= 6 y= 14</b> (Finals 2023/24 (50), Summer 2023/24).",
     "ولو <bdi dir=\"ltr\">x = 1, y = 2</bdi> وجوه <bdi dir=\"ltr\">x = 3*2; y += x</bdi> وبعدين <bdi dir=\"ltr\">y += x</bdi>: جوه الاتنين بيطبعوا <bdi dir=\"ltr\">x= 6 y= 8</bdi>، وبعد الـ block الـ static <bdi dir=\"ltr\">x= 1 y= 9</bdi> والـ dynamic <bdi dir=\"ltr\">x= 6 y= 14</bdi> <bdi dir=\"ltr\">(Finals 2023/24 (50), Summer 2023/24)</bdi>."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Symbol tables: contents, operations, implementations",
   "ar_h": "الـ Symbol tables: محتواها وعملياتها وطرق تنفيذها",
   "pts": [
    [
     "A <b>symbol table</b> associates each identifier with information about its declaration or appearance: <b>type, scope level</b> and sometimes <b>location</b>.",
     "الـ <b>symbol table</b> بيربط كل identifier بمعلومات عن الـ declaration بتاعه أو ظهوره: الـ <b>type</b> والـ <b>scope level</b> وأحياناً الـ <b>location</b>."
    ],
    [
     "Operations. High level: enter scope, process a declaration, process a use, exit scope. Low level: <b>enter_scope()</b>, <b>insert_symbol(x)</b>, <b>local_lookup(x)</b> (is x in the local scope?), <b>look_up(x)</b> (find the current x via scoping rules), <b>exit_scope()</b>.",
     "العمليات: الـ high level هي enter scope و process a declaration و process a use و exit scope. والـ low level هي <bdi dir=\"ltr\">enter_scope()</bdi> و <bdi dir=\"ltr\">insert_symbol(x)</bdi> و <bdi dir=\"ltr\">local_lookup(x)</bdi> (هل x في الـ local scope؟) و <bdi dir=\"ltr\">look_up(x)</bdi> (يلاقي الـ x الحالي بقواعد الـ scoping) و <bdi dir=\"ltr\">exit_scope()</bdi>."
    ],
    [
     "Implementations: unordered list, ordered list, binary search trees, <b>hash tables</b> (the most common). Approaches: <b>one symbol table per scope</b> or <b>one symbol table for all scopes</b>, so there is more than one approach.",
     "طرق التنفيذ: الـ unordered list والـ ordered list والـ binary search trees والـ <b>hash tables</b> (الأشهر). والـ approaches: <b>symbol table لكل scope</b> أو <b>symbol table واحد لكل الـ scopes</b>، يعني فيه أكتر من approach."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "One table per scope vs a single table",
   "ar_h": "table لكل scope مقابل table واحد",
   "pts": [
    [
     "Slide walkthrough: entering block 1 creates <b>ST1</b> (Symb, Token, Dtype, Init?); a, b, c are added with Init = No and marked initiated by the assignments. Block 2 creates <b>ST2</b> with c, d; in c = a + 1, c is found in ST2 but a is not, so the parent ST1 is searched. The final print d is outside block 2: an <b>out-of-scope access</b>.",
     "مثال السلايد: لما ندخل block 1 بيتعمل <b>ST1</b> (فيه Symb و Token و Dtype و Init?)، والـ a و b و c بيتضافوا والـ Init بتاعهم No، وبعدين الـ assignments بتعلّمهم initiated. والـ block 2 بيعمل <b>ST2</b> فيه c و d، وفي <bdi dir=\"ltr\">c = a + 1</bdi> الـ c موجودة في ST2 لكن الـ a لأ، فبندوّر في الـ parent اللي هو ST1. والـ print d الأخيرة برّه block 2، فدي <b>out-of-scope access</b>."
    ],
    [
     "<b>Problem</b> with one table per scope: each hash table has <b>memory overhead</b>, and we may need to <b>search several tables</b> (slower). <b>Solution</b>: a <b>single hash table for all scopes</b>: less memory overhead and only one search.",
     "<b>المشكلة</b> في table لكل scope: كل hash table ليه <b>memory overhead</b>، وممكن نحتاج <b>ندوّر في كذا table</b> (أبطأ). <b>الحل</b>: <b>hash table واحد لكل الـ scopes</b>، فالـ memory overhead أقل والبحث مرة واحدة."
    ],
    [
     "<b>Solution 1</b>: key = <b>\"identifier,scope_id\"</b> (global scope_id = 0, incremented for each new scope); a lookup appends the current scope_id. It <b>may still need multiple searches</b>.",
     "<b>الحل 1</b>: الـ key هو <bdi dir=\"ltr\">\"identifier,scope_id\"</bdi> (الـ global بياخد <bdi dir=\"ltr\">scope_id = 0</bdi> وبنزوّد واحد مع كل scope جديد)، والـ lookup بيلزق الـ scope_id الحالي في الاسم. و<b>ممكن لسه يحتاج كذا search</b>."
    ],
    [
     "<b>Solution 2</b>: key = identifier, value = a <b>linked list</b> of records, one per declaration; in a single-pass compiler each new one goes at the <b>front</b>, and a separate structure tracks the current scope's identifiers to delete them at scope exit. The front item is always the right one, so it is <b>not time consuming</b>. For x = 1, y = 2, { x = 3 }: x → [1 | YES | next] → [0 | YES | NULL]; y → [0 | YES | NULL].",
     "<b>الحل 2</b>: الـ key هو الـ identifier، والـ value هي <b>linked list</b> من records، واحد لكل declaration. في الـ single-pass compiler كل واحد جديد بيتحط في <b>الأول</b>، وفيه structure تانية بتتابع identifiers الـ scope الحالي عشان تمسحهم لما نخرج منه. أول item دايماً هو الصح، فهو <b>مش بياخد وقت</b>. للكود ده <bdi dir=\"ltr\">x = 1, y = 2, { x = 3 }</bdi>:<span class=\"ltr\">x → [1 | YES | next] → [0 | YES | NULL]</span><span class=\"ltr\">y → [0 | YES | NULL]</span>"
    ]
   ]
  },
  {
   "lec": 8,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Binding: \"……… is done based on the structure of the parsing tree such as braces\" → <b>Static binding</b> (Final 2023/24 (60); T/F → True in Final 2023/24 (50); revision sheet); \"<b>Dynamic</b> object binding is done based on … braces\" → False (Final 2024/25 (60)).",
     "أسئلة الـ binding: اللي بيتعمل على أساس structure الـ parsing tree زي الأقواس هو الـ <b>Static binding</b> <bdi dir=\"ltr\">(Final 2023/24 (60); revision sheet)</bdi>، وصح وغلط عليها <b>صح</b> <bdi dir=\"ltr\">(Final 2023/24 (50))</bdi>. وإن الـ <b>Dynamic</b> binding هو اللي ماشي على الأقواس <b>غلط</b> <bdi dir=\"ltr\">(Final 2024/25 (60))</bdi>."
    ],
    [
     "Symbol tables: the major problem of a table per scope → <b>memory overhead</b> (Final 2024/25 (60) MCQ; T/F → True in Summer 2025; revision sheet); \"The problem of using a single hash table is memory overhead\" → False (Summer 2023/24); \"There is only one approach to implement symbol tables\" → False (Final 2021/22, revision sheet); \"A linked list of usages is time consuming\" → False, and the data structure managing variables and their attributes → <b>symbol table</b> (revision sheet).",
     "أسئلة الـ symbol tables: المشكلة الكبيرة في table لكل scope هي الـ <b>memory overhead</b>، جت MCQ في <bdi dir=\"ltr\">Final 2024/25 (60)</bdi> وفي الـ revision sheet، وصح وغلط عليها <b>صح</b> <bdi dir=\"ltr\">(Summer 2025)</bdi>. وإن مشكلة الـ hash table الواحد هي الـ memory overhead <b>غلط</b> <bdi dir=\"ltr\">(Summer 2023/24)</bdi>، وإن فيه approach واحد بس <b>غلط</b> <bdi dir=\"ltr\">(Final 2021/22, revision sheet)</bdi>، وإن الـ linked list بتاخد وقت <b>غلط</b>، والـ data structure اللي بيدير معلومات الـ variables هو الـ <b>symbol table</b> <bdi dir=\"ltr\">(revision sheet)</bdi>."
    ],
    [
     "Written (8 marks): <b>\"Show the printed output in static and dynamic binding\"</b> (Finals 2023/24 (60), 2023/24 (50), Summer 2023/24, 2021/22; revision sheet), often with <b>\"draw a symbol table with a linked list for all scopes\"</b> (Final 2021/22: i → [1 | YES | next] → [0 | YES | NULL], w → [0 | YES | NULL]; revision sheet), and in Final 2023/24 (50) and Summer 2023/24 also \"propose optimizations\" (Lecture 9).",
     "في الـ written (<bdi dir=\"ltr\">8 marks</bdi>): <b>«طلّع الـ output في الـ static والـ dynamic binding»</b> <bdi dir=\"ltr\">(Finals 2023/24 (60), 2023/24 (50), Summer 2023/24, 2021/22; revision sheet)</bdi>، وكتير معاها <b>«ارسم symbol table بـ linked list لكل الـ scopes»</b>، زي <bdi dir=\"ltr\">Final 2021/22</bdi>:<span class=\"ltr\">i → [1 | YES | next] → [0 | YES | NULL]</span><span class=\"ltr\">w → [0 | YES | NULL]</span>وفي <bdi dir=\"ltr\">Final 2023/24 (50)</bdi> و <bdi dir=\"ltr\">Summer 2023/24</bdi> كمان «اقترح optimizations» (محاضرة 9)."
    ]
   ]
  },
  {
   "lec": 9,
   "h": "Runtime environment and storage allocation",
   "ar_h": "الـ Runtime environment والـ storage allocation",
   "pts": [
    [
     "<b>Runtime</b> = a program in execution. The <b>runtime environment</b> is a state of the target machine (software libraries, environment variables…) that provides services to running processes. The <b>runtime support system</b> is a package, mostly generated with the executable, that handles <b>memory allocation and de-allocation</b> while the program runs.",
     "الـ <b>Runtime</b> يعني برنامج شغّال. والـ <b>runtime environment</b> هو حالة الـ target machine (الـ software libraries والـ environment variables…) اللي بتقدّم خدمات للـ processes الشغّالة. والـ <b>runtime support system</b> package غالباً بيتعمل مع الـ executable، وبيظبط الـ <b>memory allocation والـ de-allocation</b> وقت التشغيل."
    ],
    [
     "What needs memory: <b>code</b> (the text part, unchanged at runtime, known at compile time); <b>procedures</b> (text is static but they are called in random order, so a <b>stack</b> manages calls and activations); <b>variables</b> (known only at runtime unless global or constant, so the <b>heap</b>).",
     "مين محتاج memory: الـ <b>code</b> (الـ text part، مش بيتغير وقت الـ runtime، ومعروف في الـ compile time)، والـ <b>procedures</b> (الـ text بتاعها static بس بتتنادى بترتيب عشوائي، فالـ <b>stack</b> بيدير الـ calls والـ activations)، والـ <b>variables</b> (بتتعرف وقت الـ runtime بس إلا لو global أو constant، فبنستخدم الـ <b>heap</b>)."
    ],
    [
     "The <b>3 types</b>: <b>static</b> (data bound to a fixed location; sizes and locations known in advance, so <b>no runtime support package</b>); <b>stack</b> (LIFO, procedure calls and activations, very useful for <b>recursion</b>); <b>heap</b> (allocated and de-allocated dynamically at runtime, reclaimed when unneeded; needed by languages with <b>dynamic data structures</b>).",
     "الـ <b>3 أنواع</b>: الـ <b>static</b> (الداتا مربوطة بـ location ثابت، والأحجام والأماكن معروفة من الأول، فـ <b>مش محتاجين runtime support package</b>)، والـ <b>stack</b> (LIFO، للـ procedure calls والـ activations، ومفيد جداً للـ <b>recursion</b>)، والـ <b>heap</b> (بيتحجز ويتفك dynamically وقت الـ runtime ويرجع لما مانحتاجوش، ولازم للغات اللي فيها <b>dynamic data structures</b>)."
    ],
    [
     "Memory layout (draw it):<pre>┌──────────────────┐\n│ Text (code)      │ fixed\n├──────────────────┤\n│ Static data      │ fixed\n├──────────────────┤\n│ Stack   ↓        │ dynamic\n│   (free space)   │\n│ Heap    ↑        │ dynamic\n└──────────────────┘</pre>Text and static data are fixed; stack and heap sit at the <b>two extremes</b> and grow and shrink against each other, so they cannot get a fixed size: the compiler uses fixed-size and dynamic-size storage. In the C layout: text, initialized data, uninitialized data (BSS), stack (automatic variables, frames with return addresses), heap (malloc/realloc/free).",
     "الـ Memory layout (ارسمه):<pre>┌──────────────────┐\n│ Text (code)      │ fixed\n├──────────────────┤\n│ Static data      │ fixed\n├──────────────────┤\n│ Stack   ↓        │ dynamic\n│   (free space)   │\n│ Heap    ↑        │ dynamic\n└──────────────────┘</pre>الـ text والـ static data ثابتين، والـ stack والـ heap في <b>الطرفين</b> وبيكبروا ويصغروا قصاد بعض، فمينفعش ناخدلهم حجم ثابت، يعني الـ compiler بيستخدم storage ثابت الحجم و storage متغير الحجم. وفي layout الـ C: الـ text، والـ initialized data، والـ uninitialized data (الـ BSS)، والـ stack (الـ automatic variables والـ frames بالـ return addresses)، والـ heap (الـ malloc والـ realloc والـ free)."
    ]
   ]
  },
  {
   "lec": 9,
   "h": "Parameters and parameter passing",
   "ar_h": "الـ Parameters وطرق تمريرها",
   "pts": [
    [
     "<b>Formal parameters</b>: variables in the <b>definition</b> of the called function that receive the passed information. <b>Actual parameters</b>: the arguments in the <b>function call</b>, whose values or addresses are passed.",
     "الـ <b>Formal parameters</b> هي الـ variables اللي في <b>تعريف</b> الـ function اللي بتتنادى، وبتستقبل المعلومات. والـ <b>Actual parameters</b> هي الـ arguments اللي في <b>الـ call</b>، واللي قيمها أو عناوينها بتتبعت."
    ],
    [
     "Modes: <b>by value</b>: formals get copies, nothing is copied back; <b>by result</b>: nothing goes in (formals start as 0), formals are copied back to the actuals at return; <b>by value-result</b>: copied in at the call and back at return, to the addresses fixed at the call; <b>by reference</b>: formals are aliases of the actuals.",
     "الطرق: الـ <b>by value</b>: الـ formals بتاخد نسخ ومفيش حاجة بترجع؛ والـ <b>by result</b>: مفيش قيمة بتدخل (الـ formals بتبدأ بـ 0)، وفي الآخر الـ formals بتتنسخ للـ actuals؛ والـ <b>by value-result</b>: بتتنسخ وقت الـ call وبترجع في الآخر على العناوين اللي اتحددت وقت الـ call؛ والـ <b>by reference</b>: الـ formals أسماء تانية (aliases) للـ actuals."
    ],
    [
     "Lecture example:<pre>a = (1,2,3); i = 2\nconcentrate(j, x):\n  j := j+1; x := x+3\n  a[2] := 0\n  print(j, x, a)\nmain: concentrate(i, a[i])</pre>The call is concentrate(i, a[2]). Before / inside / after: value <b>2 1 2 3 / 3 5 1 0 3 / 2 1 0 3</b>; result <b>2 1 2 3 / 1 3 1 0 3 / 1 1 3 3</b>; value-result <b>2 1 2 3 / 3 5 1 0 3 / 3 1 5 3</b>; reference <b>2 1 2 3 / 3 0 1 0 3 / 3 1 0 3</b>.",
     "مثال المحاضرة:<pre>a = (1,2,3); i = 2\nconcentrate(j, x):\n  j := j+1; x := x+3\n  a[2] := 0\n  print(j, x, a)\nmain: concentrate(i, a[i])</pre>الـ call هي <bdi dir=\"ltr\">concentrate(i, a[2])</bdi>. قبل وجوه وبعد:<span class=\"ltr\">value: 2 1 2 3 / 3 5 1 0 3 / 2 1 0 3</span><span class=\"ltr\">result: 2 1 2 3 / 1 3 1 0 3 / 1 1 3 3</span><span class=\"ltr\">value-result: 2 1 2 3 / 3 5 1 0 3 / 3 1 5 3</span><span class=\"ltr\">reference: 2 1 2 3 / 3 0 1 0 3 / 3 1 0 3</span>"
    ],
    [
     "Trap: a[2] := 0 changes the global array in every mode, but by result and value-result the copy-back of x then overwrites a[2]. Exam values: a = {10,20,30}, i = 2, my_function(i, a[i]) → after the call value <b>2 10 20 0</b>, result <b>1 10 20 3</b>, value-result <b>3 10 20 33</b> (Summer 2025, revision sheet). a = {2,4,6}, i = 1, y+2 and x+8 → result <b>2 2 8 0</b>, value-result <b>3 2 12 0</b> (Final 2021/22).",
     "<b>فخ</b>: الـ <bdi dir=\"ltr\">a[2] := 0</bdi> بتغيّر الـ array الـ global في كل الطرق، بس في الـ result والـ value-result نسخ الـ x في الآخر بيكتب فوق الـ <bdi dir=\"ltr\">a[2]</bdi>. قيم الامتحانات: لو <bdi dir=\"ltr\">a = {10,20,30}, i = 2</bdi> والـ call <bdi dir=\"ltr\">my_function(i, a[i])</bdi>، يبقى بعد الـ call الـ value <bdi dir=\"ltr\">2 10 20 0</bdi> والـ result <bdi dir=\"ltr\">1 10 20 3</bdi> والـ value-result <bdi dir=\"ltr\">3 10 20 33</bdi> <bdi dir=\"ltr\">(Summer 2025, revision sheet)</bdi>. ولو <bdi dir=\"ltr\">a = {2,4,6}, i = 1</bdi> مع <bdi dir=\"ltr\">y+2</bdi> و <bdi dir=\"ltr\">x+8</bdi>، يبقى الـ result <bdi dir=\"ltr\">2 2 8 0</bdi> والـ value-result <bdi dir=\"ltr\">3 2 12 0</bdi> <bdi dir=\"ltr\">(Final 2021/22)</bdi>."
    ]
   ]
  },
  {
   "lec": 9,
   "h": "Symbol table purposes and peephole optimization",
   "ar_h": "أغراض الـ symbol table والـ peephole optimization",
   "pts": [
    [
     "Symbol table purposes (runtime view): store the names of all entities (variables, functions, objects, classes, interfaces) in one structured place; verify that a variable has been declared; implement <b>type checking</b>; determine the <b>scope</b> of a name (scope resolution). It can also be used for <b>storage allocation</b>.",
     "أغراض الـ symbol table: يخزّن أسماء كل الحاجات (الـ variables والـ functions والـ objects والـ classes والـ interfaces) في مكان واحد منظّم، ويتأكد إن الـ variable اتعمله declare، ويعمل الـ <b>type checking</b>، ويحدد الـ <b>scope</b> بتاع الاسم (scope resolution). وكمان ينفع يتستخدم في الـ <b>storage allocation</b>."
    ],
    [
     "<b>Peephole optimization</b>: optimization on a <b>small part of the code</b>, called the <b>peephole</b> or <b>window</b>; it works by <b>replacement</b> with shorter, faster code giving the same output, and is <b>machine dependent</b>. Objectives: improve performance; reduce code size and improve memory usage.",
     "الـ <b>Peephole optimization</b>: optimization على <b>جزء صغير من الكود</b> اسمه الـ <b>peephole</b> أو الـ <b>window</b>، وبيشتغل بالـ <b>replacement</b>، يعني بيبدّل الجزء ده بكود أقصر وأسرع وبنفس الـ output، وهو <b>machine dependent</b>. أهدافه: تحسين الـ performance، وتصغير حجم الكود وتحسين استخدام الـ memory."
    ],
    [
     "Techniques: <b>redundant load and store elimination</b>: y = x + 5; i = y; z = i; w = z * 3; → y = x + 5; i = y; w = y * 3;. <b>Constant folding</b>: x = 2 * 3; → x = 6;. <b>Combine operations</b>: X = (2*3)+5; y = X – Sqrt(3*8); → X = 11; y = 11 – Sqrt(24);.",
     "الـ techniques: الـ <b>redundant load and store elimination</b>:<span class=\"ltr\">y = x + 5; i = y; z = i; w = z * 3;  ⟹  y = x + 5; i = y; w = y * 3;</span>والـ <b>constant folding</b>:<span class=\"ltr\">x = 2 * 3;  ⟹  x = 6;</span>والـ <b>combine operations</b>:<span class=\"ltr\">X = (2*3)+5; y = X – Sqrt(3*8);  ⟹  X = 11; y = 11 – Sqrt(24);</span>"
    ]
   ]
  },
  {
   "lec": 9,
   "h": "Loop optimization and the exam optimizations",
   "ar_h": "الـ Loop optimization و optimizations الامتحانات",
   "pts": [
    [
     "<b>Loop optimization</b> improves <b>cache performance</b> and reduces the <b>overheads</b> of executing loops. Lecture: <code>for(i=0;i&lt;arr.length;i++)</code> evaluates arr.length every iteration; store it once in <code>size</code> and loop to size (code hoisting).",
     "الـ <b>Loop optimization</b> بيحسّن الـ <b>cache performance</b> ويقلل الـ <b>overheads</b> بتاعة تنفيذ الـ loops. في المحاضرة الـ <code>arr.length</code> بيتحسب في كل لفة، فبنخزّنه مرة واحدة في <code>size</code> ونلف لحد الـ size (code hoisting)."
    ],
    [
     "Exam loop <code>for (i=0; i &lt; a→length-1; i++) swap_elements(a[i],a[i+1]);</code> becomes<pre>int x = a->length-1;\nfor (i=0; i &lt; x; i++)\n  swap_elements(a[i],a[i+1]);</pre>length-1 is computed once instead of on every iteration, which saves processing time.",
     "الـ loop بتاع الامتحان <code>for (i=0; i &lt; a→length-1; i++)</code> بيبقى:<pre>int x = a->length-1;\nfor (i=0; i &lt; x; i++)\n  swap_elements(a[i],a[i+1]);</pre>فالـ <bdi dir=\"ltr\">length-1</bdi> بيتحسب مرة واحدة بدل ما يتحسب في كل لفة، وده بيوفّر وقت المعالجة."
    ],
    [
     "\"Propose optimizations\" answers on the site: <b>constant folding</b> int x = 3*2 → int x = 6 and double y = 1.5*3 → 4.5; folding result = (2+3) * sqrt(2*8) to 5 * sqrt(16) = 20 (the slide's own example leaves Sqrt(24) as it is); <b>combine operations</b> into one constant assignment; removing variables that are never used ‡.",
     "إجابات «اقترح optimizations» على الموقع: الـ <b>constant folding</b>، زي <bdi dir=\"ltr\">int x = 3*2 → int x = 6</bdi> و <bdi dir=\"ltr\">double y = 1.5*3 → 4.5</bdi>، وكمان <bdi dir=\"ltr\">result = (2+3) * sqrt(2*8)</bdi> بتبقى <bdi dir=\"ltr\">5 * sqrt(16) = 20</bdi> (مثال السلايد نفسه ساب <bdi dir=\"ltr\">Sqrt(24)</bdi> زي ما هي)؛ والـ <b>combine operations</b> في assignment واحد بقيمة ثابتة؛ وشيل الـ variables اللي مش بتتستخدم ‡."
    ]
   ]
  },
  {
   "lec": 9,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Storage: a compiler needs <b>three</b> types of storage (Finals 2024/25 (50), Summer 2025): <b>static, stack and heap</b> (revision sheet; \"static, queue & heap\" → False in Summer 2023/24); stack → <b>procedures and functions calling</b> (Final 2023/24 (50)); dynamically allocated → <b>heap</b> (Summer 2023/24); heap is needed by languages with <b>dynamic data structures</b> (revision sheet); \"fixed size and dynamic size storages\" → True (Final 2023/24 (50)); the symbol table can be used for <b>storage allocation</b> (Summer 2025).",
     "أسئلة الـ storage: الـ compiler محتاج <b>تلات</b> أنواع storage <bdi dir=\"ltr\">(Finals 2024/25 (50), Summer 2025)</bdi>: الـ <b>static والـ stack والـ heap</b> <bdi dir=\"ltr\">(revision sheet)</bdi>، وإنها static و queue و heap <b>غلط</b> <bdi dir=\"ltr\">(Summer 2023/24)</bdi>. والـ stack للـ <b>procedures and functions calling</b> <bdi dir=\"ltr\">(Final 2023/24 (50))</bdi>، واللي بيتحجز dynamically هو الـ <b>heap</b> <bdi dir=\"ltr\">(Summer 2023/24)</bdi>، والـ heap لازم للغات اللي فيها <b>dynamic data structures</b> <bdi dir=\"ltr\">(revision sheet)</bdi>، وإن الـ compiler بيستخدم storage ثابت ومتغير الحجم <b>صح</b> <bdi dir=\"ltr\">(Final 2023/24 (50))</bdi>، والـ symbol table ينفع للـ <b>storage allocation</b> <bdi dir=\"ltr\">(Summer 2025)</bdi>."
    ],
    [
     "Optimization: not a method → <b>annotated syntax tree</b> (Summer 2025); methods → constant folding and combine operations, \"a and b\" (Summer 2023/24, revision sheet); \"Combine operations is a technique\" → True (Final 2024/25 (60)); \"Constant folding is the only technique\" → False (Final 2023/24 (50)); a peephole method → <b>constant folding</b> (Final 2021/22); peephole works on a small part of the code, the \"window\" → True (Final 2023/24 (60), Summer 2023/24, revision sheet); \"Peephole is only done on codes with loops\" → False and \"Optimization removes code redundancy to save time and storage\" → True (Final 2021/22); loop optimization improves cache performance and reduces overheads → True (revision sheet).",
     "أسئلة الـ optimization: اللي مش method هو الـ <b>annotated syntax tree</b> <bdi dir=\"ltr\">(Summer 2025)</bdi>، والـ methods هي الـ constant folding والـ combine operations يعني «a and b» <bdi dir=\"ltr\">(Summer 2023/24, revision sheet)</bdi>، وإن الـ combine operations technique <b>صح</b> <bdi dir=\"ltr\">(Final 2024/25 (60))</bdi>، وإن الـ constant folding هو الـ technique الوحيد <b>غلط</b> <bdi dir=\"ltr\">(Final 2023/24 (50))</bdi>، ومن methods الـ peephole الـ <b>constant folding</b> <bdi dir=\"ltr\">(Final 2021/22)</bdi>، والـ peephole على جزء صغير اسمه «window» <b>صح</b> <bdi dir=\"ltr\">(Final 2023/24 (60), Summer 2023/24, revision sheet)</bdi>، وإن الـ peephole على الـ loops بس <b>غلط</b>، وإن الـ optimization بيشيل التكرار عشان يوفّر وقت ومساحة <b>صح</b> <bdi dir=\"ltr\">(Final 2021/22)</bdi>، وإن الـ loop optimization بيحسّن الـ cache performance <b>صح</b> <bdi dir=\"ltr\">(revision sheet)</bdi>."
    ],
    [
     "Written: the <b>memory layout figure</b> (Final 2024/25 (60) 6 marks, revision sheet); <b>parameter-passing outputs</b>: by value and value-result (Final 2024/25 (60)), by value and result (Summer 2025), by result and value-result (Final 2021/22), all three (revision sheet); <b>optimize the length-1 loop</b> (Finals 2024/25 (50), Summer 2025; revision sheet); <b>propose optimizations</b> for a given code (Finals 2024/25 (60), 2023/24 (50), Summer 2023/24).",
     "في الـ written: <b>رسمة الـ memory layout</b> <bdi dir=\"ltr\">(Final 2024/25 (60) 6 marks, revision sheet)</bdi>، و<b>الـ output بطرق تمرير الـ parameters</b>: الـ value والـ value-result <bdi dir=\"ltr\">(Final 2024/25 (60))</bdi>، والـ value والـ result <bdi dir=\"ltr\">(Summer 2025)</bdi>، والـ result والـ value-result <bdi dir=\"ltr\">(Final 2021/22)</bdi>، والتلاتة <bdi dir=\"ltr\">(revision sheet)</bdi>؛ و<b>optimize الـ loop بتاع length-1</b> <bdi dir=\"ltr\">(Finals 2024/25 (50), Summer 2025; revision sheet)</bdi>؛ و<b>اقترح optimizations</b> لكود <bdi dir=\"ltr\">(Finals 2024/25 (60), 2023/24 (50), Summer 2023/24)</bdi>."
    ]
   ]
  }
 ]
};

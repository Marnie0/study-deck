// Midterm scope and exam-focused summary for compiler: English and Egyptian Arabic per point. Merged by build.mjs.
window.MIDTERM = window.MIDTERM || {};
MIDTERM.compiler = {
 "lecs": [
  1,
  2,
  3,
  4
 ],
 "scope": "Up to Syntax Analysis (L1–L4)",
 "scope_ar": "لحد الـ Syntax Analysis، من المحاضرة 1 لـ 4",
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
   "h": "What the doctor asks (Lecture 1)",
   "ar_h": "الدكتورة بتسأل إيه (محاضرة 1)",
   "pts": [
    [
     "\"……… is not a phase of a compiler\" → <b>Symbol table</b> (or <b>testing</b>). T/F \"Symbol table is a basic phase\" → <b>False</b>; the symbol table is used <b>by all phases</b>.",
     "سؤال \"……… is not a phase\" إجابته <b>Symbol table</b> (أو <b>testing</b>). وسؤال صح وغلط \"الـ symbol table phase أساسية\" إجابته <b>غلط</b>، لأن الـ symbol table <b>كل الـ phases بتستخدمه</b>."
    ],
    [
     "Inputs/outputs: annotated syntax tree is the <b>output of semantic analysis</b> and the <b>input to code optimization</b>; the <b>syntax tree</b> is the input to semantic analysis. T/F \"Annotated tree is the output of syntax analysis\" → False.",
     "أسئلة الـ input والـ output: الـ annotated syntax tree هي <b>output الـ semantic analysis</b> و<b>input الـ code optimization</b>، والـ <b>syntax tree</b> هي input الـ semantic analysis. وسؤال صح وغلط إن الـ annotated tree طالعة من الـ syntax analysis إجابته غلط."
    ],
    [
     "Compiler vs interpreter T/F: interpreters take long to execute (True), compilers take long to execute (False), interpreters generate no intermediate object code (True); the major difference between their phases is <b>intermediate code generation</b>.",
     "أسئلة الـ compiler مقابل الـ interpreter (صح وغلط): الـ interpreters بتاخد وقت طويل في التنفيذ (صح)، والـ compilers بتاخد وقت طويل في التنفيذ (غلط)، والـ interpreters مبتطلّعش intermediate object code (صح). والفرق الأساسي بين phases الاتنين هو الـ <b>intermediate code generation</b>."
    ],
    [
     "Intermediate code: compilers generate it so as <b>not to need a unique compiler (full interpreter) for each machine</b>. Code optimization is done <b>twice</b>: on <b>source</b> and <b>assembly</b> code; its aim is minimizing memory and maximizing speed.",
     "الـ intermediate code: الـ compilers بتطلّعه عشان <b>منحتاجش compiler (أو interpreter كامل) مخصوص لكل machine</b>. والـ code optimization بيتعمل <b>مرتين</b>، على الـ <b>source</b> code وعلى الـ <b>assembly</b> code، وهدفه تقليل الـ memory وزيادة السرعة."
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
   "h": "What the doctor asks (Lecture 2)",
   "ar_h": "الدكتورة بتسأل إيه (محاضرة 2)",
   "pts": [
    [
     "Fill the blank: the lexical analyzer takes <b>source code</b> and produces <b>tokens</b>; tokens are described by <b>finite automata and regular expressions</b>; keywords are recognized in <b>lexical analysis</b>; grouping characters into tokens is done by the <b>scanner</b>.",
     "أسئلة الفراغات: الـ lexical analyzer بياخد <b>source code</b> ويطلّع <b>tokens</b>، والـ tokens بتتوصف بالـ <b>finite automata والـ regular expressions</b>، والـ keywords بتتعرف في الـ <b>lexical analysis</b>، واللي بيجمّع الحروف في tokens هو الـ <b>scanner</b>."
    ],
    [
     "Regex algebra: aε = εa = <b>a</b>; (X|Y)* vs X*|Y* → <b>not equivalent</b>; a|b denotes <b>{a, b}</b>; (a)|((b)*(c)) and b*c|a → <b>equivalent</b>; \"order is not important in concatenation\" → <b>False</b>.",
     "أسئلة الـ algebra: الـ <bdi dir=\"ltr\">aε = εa</bdi> بتساوي <b>a</b>، والـ <bdi dir=\"ltr\">(X|Y)*</bdi> مش زي <bdi dir=\"ltr\">X*|Y*</bdi>، والـ <bdi dir=\"ltr\">a|b</bdi> معناها <bdi dir=\"ltr\">{a, b}</bdi>، والـ <bdi dir=\"ltr\">(a)|((b)*(c))</bdi> و <bdi dir=\"ltr\">b*c|a</bdi> <b>متساويين</b>، وجملة \"الترتيب مش مهم في الـ concatenation\" <b>غلط</b>."
    ],
    [
     "Writing regular expressions over {a,b} (Sheet One), e.g. exactly two a's → <code>b*ab*ab*</code>; reading a regex from a drawn FA; drawing an FA for a regex like 1*01(0|1)*; comparing DFA and NFA.",
     "كتابة regular expressions على <bdi dir=\"ltr\">{a,b}</bdi> (من Sheet One)، مثلاً اتنين a بالظبط إجابتها <code>b*ab*ab*</code>. وكمان استخراج الـ regex من FA مرسوم، ورسم FA لـ regex زي <bdi dir=\"ltr\">1*01(0|1)*</bdi>، والمقارنة بين الـ DFA والـ NFA."
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
   "h": "What the doctor asks",
   "ar_h": "الدكتورة بتسأل في إيه",
   "pts": [
    [
     "Conditions MCQ: \"The following condition will cause any automaton to be an NFA\" → <b>having an ε</b> (not more than one accept state, not loops). \"The automaton with ε symbol is said to be\" → <b>NFA</b>.",
     "سؤال الشروط: إيه الشرط اللي بيخلّي أي automaton يبقى NFA؟ والإجابة <b>having an <bdi dir=\"ltr\">ε</bdi></b> (مش أكتر من accept state ومش الـ loops). وسؤال الـ automaton اللي فيه <bdi dir=\"ltr\">ε</bdi> اسمه إيه؟ والإجابة <b>NFA</b>."
    ],
    [
     "True/False: \"A DFA may contain a loop\" → <b>True</b>; \"Any loop causes the automaton to be nondeterministic\" → <b>False</b>; \"The ε transition can exist in DFA\" → <b>False</b>; \"ε changes the regular expression accepted\" → <b>False</b>; NFA → DFA conversion is <b>always possible</b>.",
     "أسئلة صح وغلط: إن الـ DFA ممكن يبقى فيه loop <b>صح</b>، وإن أي loop بيخلي الـ automaton nondeterministic <b>غلط</b>، وإن الـ <bdi dir=\"ltr\">ε</bdi> transition ممكن تبقى في الـ DFA <b>غلط</b>، وإن الـ <bdi dir=\"ltr\">ε</bdi> بتغيّر الـ regular expression <b>غلط</b>، وتحويل الـ NFA لـ DFA <b>ممكن دايماً</b>."
    ],
    [
     "The big question: <b>\"Why is this NFA non-deterministic? Convert it to a DFA\"</b> (exam NFA 1, its 2021/22 variant with a loop on 0, the ε-NFA 2, and the Summer 2023/24 FA). MCQs then ask single DFA moves, e.g. {3} on 1 → {2,3}, {2,3} on 0 → {1,3}, the DFA start {1,3}, {2,3} on a → {1,2,3}.",
     "السؤال الكبير: <b>«ليه الـ NFA ده non-deterministic؟ حوّله لـ DFA»</b> (الـ NFA الأول، ونسخة <bdi dir=\"ltr\">2021/22</bdi> اللي فيها loop على 0، والـ NFA التاني اللي فيه <bdi dir=\"ltr\">ε</bdi>، والـ FA بتاع Summer <bdi dir=\"ltr\">2023/24</bdi>). وأسئلة الـ MCQ بتسأل على move واحدة في الـ DFA، زي:<span class=\"ltr\">{3} on 1 → {2,3}; {2,3} on 0 → {1,3}</span><span class=\"ltr\">DFA start = {1,3}; {2,3} on a → {1,2,3}</span>"
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
   "h": "What the doctor asks",
   "ar_h": "الدكتورة بتسأل في إيه",
   "pts": [
    [
     "Fill the blank: \"……… is a process of finding a parse tree for a string of tokens\" → <b>Parsing</b>; \"Parsing is also called ……… analysis\" → <b>syntax</b>; input of syntax analysis → <b>stream of tokens</b>; output → <b>parsing tree</b>; modeled on → <b>context free grammar</b>; the part that highly uses grammar → <b>Parser</b>.",
     "أسئلة املا الفراغ: الـ <b>Parsing</b> هو عملية إيجاد parse tree، والـ Parsing اسمه كمان <b>syntax</b> analysis، والـ input هو <b>stream of tokens</b>، والـ output هو <b>parsing tree</b>، والـ phase معمولة على <b>context free grammar</b>، والجزء اللي بيستخدم الـ grammar أكتر حاجة هو الـ <b>Parser</b>."
    ],
    [
     "CFG and trees: <b>not</b> a part of a CFG → <b>end symbol</b>; leaf nodes → <b>terminals</b>; leftmost tree grows from the <b>right</b> side; derivation from any non-terminal → <b>False</b>; replacing the leftmost non-terminal each step → <b>Leftmost</b> derivation.",
     "أسئلة الـ CFG والـ trees: الحاجة اللي <b>مش</b> جزء من الـ CFG هي الـ <b>end symbol</b>، والـ leaf nodes هي الـ <b>terminals</b>، والـ leftmost tree بيكبر من ناحية الـ <b>right</b>، وإن الـ derivation يبدأ من أي non-terminal ده <b>غلط</b>، وتبديل الـ leftmost non-terminal كل خطوة اسمه <b>Leftmost</b> derivation."
    ],
    [
     "Ambiguity and left recursion: one tree per sentence → <b>unambiguous</b>; leftmost + rightmost of the same string → not a proof (<b>False</b>); <b>prove ambiguity</b> with two LMDs (id–id+id, 001101, aab, aaac); A → Ab | c → <b>left recursive</b>; LL(1) on left-recursive grammar → <b>False</b>; <b>remove left recursion</b> (A → aB | Ad).",
     "أسئلة الـ ambiguity والـ left recursion: إن يبقى فيه tree واحد لكل sentence يبقى <b>unambiguous</b>، و leftmost مع rightmost لنفس الـ string مش إثبات (<b>غلط</b>)، و<b>إثبات الـ ambiguity</b> باتنين LMD (زي <bdi dir=\"ltr\">id–id+id</bdi> و <bdi dir=\"ltr\">001101</bdi> و aab و aaac)، والـ <bdi dir=\"ltr\">A&nbsp;→&nbsp;Ab&nbsp;|&nbsp;c</bdi> يبقى <b>left recursive</b>، والـ <bdi dir=\"ltr\">LL(1)</bdi> على left-recursive grammar <b>غلط</b>، و<b>إزالة الـ left recursion</b> زي <bdi dir=\"ltr\">A&nbsp;→&nbsp;aB&nbsp;|&nbsp;Ad</bdi>."
    ]
   ]
  }
 ]
};

window.COURSES = window.COURSES || {};
COURSES.compiler = {
  id: `compiler`,
  name: `Compiler Design`,
  short: `Compiler`,
  code: `CS321 / CS309`,
  by: `Dr. Lamiaa Hassaan (exams also Dr. Ahmed Ibrahim)`,
  lectures: [
    /* ───────────────────────── LECTURE 1 ───────────────────────── */
    {
      n: 1, title: `Introduction to Compilers`,
      notes: [
        { h: `What is a compiler?`, pts: [
          `A <b>compiler</b> translates (compiles) a program written in a <b>high-level</b> language that suits human programmers into the <b>low-level machine language</b> that computers need. While doing this it also tries to <b>spot and report obvious programmer mistakes</b>.`,
          `An <b>interpreter</b> is another way of implementing a programming language. Interpretation shares many aspects with compiling.`,
          `Course code on the slides: <b>3CS – CS309-Credit</b>. The exams use <b>CS321</b> (Compiler Design and Theory) and <b>CS309</b> (Compiler Theory).`
        ]},
        { h: `Compilers vs interpreters`, table: [
          [`Interpreter`, `Compiler`],
          [`Translates the program <b>one statement at a time</b>.`, `Scans the <b>entire program</b> and translates it as a whole into machine code.`],
          [`Usually takes <b>less time to analyze</b> the source code, but overall <b>execution is slower</b>.`, `Usually takes a <b>large amount of time to analyze</b> the source code, but overall <b>execution is faster</b>.`],
          [`<b>No intermediate object code</b> is generated, so it is memory efficient.`, `<b>Generates intermediate object code</b>, which then needs linking, so it needs more memory.`],
          [`Used by JavaScript, Python, Ruby.`, `Used by C, C++, Java.`]
        ]},
        { h: `Phases of a compiler (draw this figure)`, code: `Source code
   │
[1 Scanner]                  ──┐
   │ tokens                    │
[2 Parser]                     │      ┌───────────────┐
   │ syntax tree               ├──────│ Literal table │
[3 Semantic analyzer]          │      ├───────────────┤
   │ annotated tree            ├──────│ Symbol table  │
[4 Source code optimizer]      │      ├───────────────┤
   │ intermediate code         ├──────│ Error handler │
[5 Code generator]             │      └───────────────┘
   │ target code               │
[6 Target code optimizer]    ──┘
   │
Target code`, pts: [
          `All six phases talk to the <b>literal table</b>, the <b>symbol table</b> and the <b>error handler</b>. These are data structures and helpers, <b>not phases</b>. The exams often ask "symbol table is not a phase".`,
          `The input/output chain is <b>source code → tokens → syntax tree → annotated tree → intermediate code → target code → (optimized) target code</b>.`,
          `"Testing" is <b>not</b> a phase of a compiler.`
        ]},
        { h: `1) Lexical analysis (scanner)`, pts: [
          `Collects sequences of characters into meaningful units called <b>tokens</b>.`,
          `Example: <code>a[index]=4+2</code> gives: <code>a</code> identifier, <code>[</code> left bracket, <code>index</code> identifier, <code>]</code> right bracket, <code>=</code> assignment, <code>4</code> number, <code>+</code> plus sign, <code>2</code> number.`
        ]},
        { h: `2) Syntax analysis (parser)`, pts: [
          `Determines the <b>structure</b> of the program. The result is a <b>parse tree</b> or a <b>syntax tree</b> (abstract syntax tree).`,
          `The parse tree for <code>a[index]=4+2</code> keeps every grammar node: expression → assign-expression → expression = expression → subscript-expression (expression [ expression ]) and additive-expression (expression + expression) → identifier/number leaves.`,
          `The <b>syntax tree</b> (AST) is the condensed version: assign-expression with children subscript-expression(a, index) and additive-expression(4, 2).`
        ]},
        { h: `3) Semantic analyzer`, pts: [
          `The semantics of a program are its <b>"meaning"</b>, as opposed to its syntax (structure). Semantics determine some of its running-time behaviour <b>before</b> execution.`,
          `<b>Static semantics</b>: declarations and type checking.`,
          `<b>Attributes</b>: the extra pieces of information computed by the semantic analyzer. The result is the <b>annotated syntax tree</b>: <code>a</code> = array of integer, <code>index</code> = integer, <code>4</code> and <code>2</code> = integer, subscript-expression = integer, additive-expression = integer.`
        ]},
        { h: `4) Source code optimizer`, pts: [
          `The earliest point of most optimization steps is <b>just after semantic analysis</b>.`,
          `This code improvement depends only on the source code and is a separate phase. Compilers vary widely in the kinds of optimization they do and where they place them.`,
          `<b>Constant folding</b> on the annotated tree: <code>4+2</code> becomes the single node <code>6</code>.`,
          `Or on intermediate code (three-address code, p-code): <code>t = 4 + 2; a[index] = t</code> → <code>t = 6; a[index] = t</code> → <code>a[index] = 6</code>.`
        ]},
        { h: `5) Code generator and 6) target code optimizer`, code: `a[index]=6   ──code generator──►   MOV R0, index
                                     MUL R0, 2
                                     MOV R1, &a
                                     ADD R1, R0
                                     MOV *R1, 6

──target code optimizer──►   MOV R0, index
                             SHL R0
                             MOV &a[R0], 6     (slide prints &a[R1])`, pts: [
          `The <b>code generator</b> takes the intermediate code (IR) and generates code for the <b>target machine</b>. The <b>properties of the target machine</b> become the major factor: its instructions and data representation. The example is a hypothetical assembly language (MUL R0,2 because an integer is 2 bytes).`,
          `The <b>target code optimizer</b> improves the generated code: <b>choosing address modes</b>, <b>replacing instructions</b> (MUL by 2 becomes SHL, a shift left) and <b>eliminating redundant</b> instructions.`
        ]},
        { h: `Principal data structures for communication among phases`, pts: [
          `<b>Tokens</b>: the scanner collects characters into a token, stored as a <b>value of an enumerated data type</b>. It may also keep the string or other derived information (identifier name, number value). Stored in a <b>single global variable</b> or an <b>array</b> of tokens.`,
          `<b>Syntax tree</b>: a standard <b>pointer-based</b> structure built by the parser. Each node holds information collected by the parser or later. The nodes need different attributes depending on the kind of language structure (a variable record).`,
          `<b>Symbol table</b>: keeps information about identifiers (functions, variables, constants, data types). It interacts with <b>almost every phase</b>. Access must be <b>constant-time</b>, so one or several <b>hash tables</b> are often used.`,
          `<b>Literal table</b>: stores <b>constants and strings</b>, reducing program size. Quick insertion and lookup are essential.`,
          `<b>Intermediate code</b>: kept as an array of text strings, a temporary text, or a linked list of structures (e.g. three-address code, p-code). It should be easy to reorganize.`,
          `<b>Temporary files</b>: hold the products of intermediate steps. They solve memory constraints and allow <b>back-patching</b> of addresses during code generation.`
        ]}
      ],
      cards: [
        [`Compiler (definition)`, `Translates a high-level program into low-level machine language and reports obvious programmer mistakes.`],
        [`Interpreter vs compiler: translation unit`, `Interpreter: one statement at a time. Compiler: the whole program at once.`],
        [`Which one generates intermediate object code?`, `The compiler (it then needs linking). Interpreters generate no intermediate object code.`],
        [`Which one executes faster overall?`, `The compiler's output. Compilers take longer to analyze but execution is faster.`],
        [`The 6 phases in order`, `Scanner, parser, semantic analyzer, source code optimizer, code generator, target code optimizer.`],
        [`3 helpers shared by all phases`, `Literal table, symbol table, error handler (they are not phases).`],
        [`Output of the scanner`, `Tokens.`],
        [`Output of the parser`, `A parse tree / syntax tree.`],
        [`Output of the semantic analyzer`, `The annotated syntax tree.`],
        [`Input to the source code optimizer`, `The annotated syntax tree (its output is intermediate code).`],
        [`Static semantics`, `Declarations and type checking.`],
        [`Attributes`, `Extra pieces of information computed by the semantic analyzer (e.g. types).`],
        [`Constant folding example`, `4+2 is replaced by 6 at compile time.`],
        [`Target code optimizer tasks`, `Choosing address modes, replacing instructions, eliminating redundant code.`],
        [`Why hash tables for the symbol table?`, `Access operations need to be constant-time.`],
        [`Literal table`, `Stores constants and strings to reduce program size.`]
      ],
      qa: [
        [`State with a figure the phases of the compiler.`, `Source code → Scanner → tokens → Parser → syntax tree → Semantic analyzer → annotated tree → Source code optimizer → intermediate code → Code generator → target code → Target code optimizer → target code. All phases connect to the literal table, symbol table and error handler.`],
        [`Compare between compilers and interpreters.`, `Interpreter: one statement at a time; less analysis time but slower execution; no intermediate object code so memory efficient; e.g. JavaScript, Python, Ruby. Compiler: whole program at once; more analysis time but faster execution; generates intermediate object code that needs linking so more memory; e.g. C, C++, Java.`],
        [`Trace a[index]=4+2 through the compiler phases.`, `Scanner: a(id) [ index(id) ] = 4(num) + 2(num). Parser: syntax tree assign(subscript(a,index), add(4,2)). Semantic: annotate a=array of integer, others integer. Optimizer: fold 4+2 to 6 giving a[index]=6. Code generator: MOV R0,index; MUL R0,2; MOV R1,&a; ADD R1,R0; MOV *R1,6. Target optimizer: MOV R0,index; SHL R0; MOV &a[R0],6.`],
        [`List the principal data structures used for communication among phases.`, `Tokens, the syntax tree, the symbol table, the literal table, intermediate code and temporary files.`]
      ],
      quiz: [
        { q: `……… is not a phase of a compiler.`, o: [
          [`Scanner`, `The scanner is phase 1 (lexical analysis).`],
          [`Symbol table`, `Correct. The symbol table is a data structure used BY all phases, not a phase.`],
          [`Parser`, `The parser is phase 2 (syntax analysis).`],
          [`Code optimizer`, `Source and target code optimizers are phases.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `The following is not a phase of a compiler:`, o: [
          [`syntax analysis`, `A phase.`],
          [`semantic analysis`, `A phase.`],
          [`testing`, `Correct. Testing is a software-engineering activity, not a compiler phase.`],
          [`optimization`, `A phase (source and target code optimizers).`]
        ], a: 2, src: `Exam Summer 2025` },
        { q: `Which of the following is NOT a characteristic of the compiler?`, o: [
          [`More execution time`, `Correct. Compiled programs execute FASTER; interpreters have more execution time.`],
          [`Debugging process is slow`, `True of compilers: errors appear only after the whole program is analyzed.`],
          [`Execution takes place after removal of all syntax errors`, `True of compilers.`],
          [`It scans the entire program then transforms it into machine code`, `That is the definition of a compiler.`]
        ], a: 0, src: `Final revision sheet` },
        { q: `Compiler translates the source code to:`, o: [
          [`Machine code`, `Part of the answer.`],
          [`Executable code`, `Not the key's answer.`],
          [`Binary code`, `Part of the answer.`],
          [`Both a and c`, `Correct (official key). Machine code is binary code.`]
        ], a: 3, src: `Exam 2024/25 (50)` },
        { q: `A compiler indicates the ……… error.`, o: [
          [`syntax`, `Correct (official key). Syntax errors are detected at compile time.`],
          [`logic`, `Logic errors give wrong results at run time; the compiler cannot see them.`],
          [`runtime`, `Runtime errors happen during execution, after compilation.`],
          [`All of the mentioned`, `Only syntax errors are reported by the compiler.`]
        ], a: 0, src: `Exam Summer 2025` },
        { q: `The following is a major difference between the phases of compilers and interpreters:`, o: [
          [`code optimization`, `Not the distinguishing point in the lecture table.`],
          [`intermediate code generation`, `Correct. Compilers generate intermediate object code; interpreters do not.`],
          [`semantic analysis`, `Both need semantic checking.`],
          [`none of the mentioned`, `(b) is the difference.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `Annotated syntax tree is the input to the ……… phase.`, o: [
          [`syntax analysis`, `Syntax analysis takes tokens.`],
          [`code optimization`, `Correct. The semantic analyzer outputs the annotated tree, and the source code optimizer takes it.`],
          [`semantic analysis`, `Semantic analysis PRODUCES the annotated tree; its input is the syntax tree.`],
          [`derivation`, `Not a phase.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `……… is the input to the semantic analysis phase.`, o: [
          [`stream of tokens`, `Input to syntax analysis.`],
          [`syntax tree`, `Correct.`],
          [`annotated syntax tree`, `Output of semantic analysis.`],
          [`assembly code`, `Output of the code generator.`]
        ], a: 1, src: `Exam 2023/24 (60)` },
        { q: `A phase of the compiler that aims at minimizing memory usage and maximizing speed of processing is:`, o: [
          [`code optimization`, `Correct.`],
          [`syntax analysis`, `It checks structure.`],
          [`semantic analysis`, `It checks meaning and types.`],
          [`none of the mentioned`, `(a) is right.`]
        ], a: 0, src: `Exam 2023/24 (60)` },
        { q: `Code optimization is done twice, on ……… code and ……… code within the phases of a compiler.`, o: [
          [`source, machine`, `The second optimizer works on the generated target (assembly) code in the lecture example.`],
          [`source, assembly`, `Correct. Source code optimizer + target code optimizer (the target code is assembly: MOV, MUL...).`],
          [`assembly, machine`, `The first optimizer works on source/intermediate code.`],
          [`source, binary`, `Not the lecture's wording.`]
        ], a: 1, src: `Exam 2023/24 (50)` },
        { q: `In the target code optimizer example, MUL R0,2 is replaced with:`, o: [
          [`ADD R0,R0`, `Not what the slide shows.`],
          [`SHL R0`, `Correct. Multiplying by 2 = shift left by one bit (instruction replacement).`],
          [`MOV R0,2`, `Changes the meaning.`],
          [`Nothing, it is removed`, `The index still needs scaling.`]
        ], a: 1 },
        { q: `Which data structure needs constant-time access and is usually implemented with hash tables?`, o: [
          [`Literal table`, `Needs quick insert/lookup too, but the slide names hashing for the symbol table.`],
          [`Symbol table`, `Correct.`],
          [`Syntax tree`, `A pointer-based tree.`],
          [`Temporary files`, `Used for intermediate products and back-patching.`]
        ], a: 1 }
      ]
    },
    /* ───────────────────────── LECTURE 2 ───────────────────────── */
    {
      n: 2, title: `Lexical Analysis, Regular Expressions and Finite Automata`,
      notes: [
        { h: `What is the lexical analysis phase?`, pts: [
          `The <b>first phase</b> of the compiler. It reads the input characters and produces a <b>sequence of tokens</b> that the parser uses for syntax analysis.`,
          `It also <b>removes comments and white space</b> (blank, tab, newline).`,
          `It also <b>correlates error messages</b> from the compiler with the source program (line numbers).`,
          `Also called <b>scanning</b>: the stream of characters is read left to right and grouped into tokens. Keywords are recognized here.`,
          `<b>Token vs lexeme</b> (lecture notes): a token is a logical category (id, relop, number); a lexeme is the actual string instance (e.g. <code>distance</code>). <code>if distance &gt;= rate * (time1 – time0) then distance := maxdist;</code> → <code>if id relop id * ( id – id ) then id := id ;</code>`
        ]},
        { h: `Alphabets and strings`, pts: [
          `An <b>alphabet (Σ)</b> is a finite, non-empty, ordered set of symbols, letters or characters.`,
          `A <b>string</b> (also called a word or token) is a finite sequence of symbols from an alphabet. <code>011</code> is a string of length 3 over Σ = {0,1}; <code>0101</code> has length 4; <code>for</code> is a string of length 3 over the C++ alphabet.`,
          `A set of strings is called a <b>language</b>. Integers use the alphabet 0–9; variable names use letters, digits (and maybe underscore).`
        ]},
        { h: `Operations on languages`, pts: [
          `<b>Union</b>: {abc, ab, ba} ∪ {ba, bb} = {abc, ab, ba, bb}. Union is commutative: L1 ∪ L2 = L2 ∪ L1 (order does not matter).`,
          `<b>Concatenation</b>: each string of the first followed by each string of the second. {ab, c}{d, ef} = {abd, abef, cd, cef}.<br>L1 = {a,b}, L2 = {0,11}: L1L2 = {a0, a11, b0, b11} but L2L1 = {0a, 0b, 11a, 11b}. So <b>L1L2 ≠ L2L1: order matters in concatenation</b>.`,
          `<b>Kleene closure</b> Σ*: zero or more concatenations. {a}* = {ε, a, aa, aaa, …}.`,
          `<b>ε</b> is the empty string (length 0). {ε} is a set with one element. It is <b>not</b> the empty set Φ.`,
          `<b>Positive closure</b> Σ+: one or more. {a}+ = {a, aa, aaa, …}.`,
          `<b>Or operator</b>: a|b|c = {a, b, c}.`
        ]},
        { h: `Regular expressions`, pts: [
          `Over X = {a,b,c}, examples of regular expressions: <code>ab*</code>, <code>a|b|c*</code>.`,
          `Precedence: <b>*</b> binds tightest, then <b>concatenation</b>, then <b>|</b>. So <code>a|ab*</code> means <code>a|(a(b*))</code>.`,
          `Examples: 0|1 = {0,1}; 0* = {ε,0,00,…}; (0|1)(0|1) = {00,01,10,11}; 0|0*1 = {0,1,01,001,…}; exactly one b over {a,b,c}: (a|c)*b(a|c)*.`
        ]},
        { h: `Algebraic properties of regular expressions`, table: [
          [`Law`, `Meaning`],
          [`(r|s)|t = r|s|t = r|(s|t)`, `| is associative`],
          [`s|t = t|s`, `| is commutative`],
          [`s|s = s`, `| is idempotent`],
          [`s? = s|ε`, `by definition`],
          [`(rs)t = rst = r(st)`, `concatenation is associative`],
          [`sε = s = εs`, `ε is a neutral element for concatenation`],
          [`r(s|t) = rs|rt`, `concatenation distributes over |`],
          [`(r|s)t = rt|st`, `concatenation distributes over |`],
          [`(s*)* = s*`, `* is idempotent`],
          [`s*s* = s*`, `0 or more twice is still 0 or more`],
          [`ss* = s+ = s*s`, `by definition`]
        ], pts: [
          `Exam traps: <b>aε = εa = a</b> (not ε). <b>Yε = εY</b> (so "Yε ≠ εY" is false). <b>(X|Y)* ≠ X*|Y*</b>: (X|Y)* contains XY, but X*|Y* does not.`
        ]},
        { h: `Finite automata`, pts: [
          `Finite automata <b>recognize the tokens</b> specified by a regular expression and can be converted into an algorithm for matching input strings.`,
          `A finite automaton is a machine with a <b>finite number of states</b> and a <b>finite number of transitions</b> between them. A state is a circle, a transition is an arrow labelled with an input token, the start state has an incoming "start" arrow, and a final (accept) state is a double circle.`,
          `FA for <b>01</b>: q0 –0→ q1 –1→ (q2).`,
          `<b>a*</b>: one state that is both start and final with an a-loop. <b>a+</b>: q0 (a-loop) –a→ (q1). <b>(a|b)*</b>: one start+final state with an a,b loop.`,
          `<b>1*01(0|1)*</b>: q0 (loop 1) –0→ q1 –1→ (q2) (loop 0,1).`
        ]},
        { h: `NFA vs DFA`, table: [
          [``, `DFA`, `NFA`],
          [`Empty-string transition`, `Cannot use an ε transition`, `Can use ε transitions`],
          [`Transition function`, `Exactly one next state`, `Zero, one or several next states (slide says "zero or one")`],
          [`Time complexity`, `Less time to run any input string`, `More time than a DFA`],
          [`Next possible state`, `Clearly set`, `Each (state, input) pair may have many possible next states`]
        ]}
      ],
      cards: [
        [`Lexical analysis: input and output`, `Input: source code (characters). Output: a list of tokens.`],
        [`3 extra jobs of the scanner`, `Removes comments and white space; correlates error messages with the source.`],
        [`Alphabet Σ`, `A finite non-empty ordered set of symbols.`],
        [`String`, `A finite sequence of symbols from an alphabet (also called word or token).`],
        [`Language`, `A set of strings over an alphabet.`],
        [`Is union commutative?`, `Yes: L1 ∪ L2 = L2 ∪ L1.`],
        [`Is concatenation commutative?`, `No: {a,b}{0,11} = {a0,a11,b0,b11} but {0,11}{a,b} = {0a,0b,11a,11b}.`],
        [`Kleene closure {a}*`, `{ε, a, aa, aaa, ...} (zero or more).`],
        [`Positive closure {a}+`, `{a, aa, aaa, ...} (one or more).`],
        [`aε = ?`, `a (ε is neutral for concatenation).`],
        [`s*s* = ?`, `s*`],
        [`ss* = ?`, `s+ (also = s*s)`],
        [`Precedence in regular expressions`, `* highest, then concatenation, then |.`],
        [`What do finite automata do?`, `Recognize the tokens specified by regular expressions.`],
        [`DFA vs NFA: ε transitions`, `DFA cannot use them; NFA can.`]
      ],
      qa: [
        [`What is the lexical analysis phase?`, `The first phase of the compiler. It reads the input characters and produces a sequence of tokens for the parser, removes comments and white space (blank, tab, newline) and correlates error messages with the source program.`],
        [`Over Σ = {a,b}, write regular expressions for: at least two a's; exactly two a's; at least one a and one b; all strings; b's only or an a followed by b's; containing aa or bb; exactly two or three b's.`, `(a|b)*a(a|b)*a(a|b)* ; b*ab*ab* ; (a|b)*a(a|b)*b(a|b)* | (a|b)*b(a|b)*a(a|b)* ; (a|b)* ; b* | ab* ; (a|b)*(aa|bb)(a|b)* ; a*ba*ba* | a*ba*ba*ba* (Sheet One).`],
        [`Draw a finite automaton for b*a+(c|d).`, `q0 has a loop on b; q0 --a--> q1; q1 has a loop on a; q1 --c--> q2 and q1 --d--> q2; q2 is the final state.`],
        [`Draw a finite automaton for (a|b)*(c+|d+).`, `q0 has a loop on a,b; q0 --c--> q1 (final, loop on c); q0 --d--> q2 (final, loop on d).`],
        [`Compare DFA and NFA.`, `DFA: no ε transitions, exactly one next state per (state, input), runs faster, next state clearly set. NFA: may use ε transitions, zero or more next states per (state, input), slower, each pair may have many possible next states.`]
      ],
      quiz: [
        { q: `The lexical analyzer takes ……… as input and produces a list of ……… as output.`, o: [
          [`machine code, tokens`, `Machine code is the final output of the compiler, not the scanner's input.`],
          [`tokens, source code`, `Reversed.`],
          [`source code, tokens`, `Correct.`],
          [`a and b`, `Only (c) is right.`]
        ], a: 2, src: `Exam 2024/25 (60)` },
        { q: `The process of generating (searching for matched) tokens is typically described using:`, o: [
          [`finite automata`, `Correct, but only half of the answer.`],
          [`regular expressions`, `Correct, but only half of the answer.`],
          [`syntax directed translation`, `SDT belongs to semantic analysis.`],
          [`a and b`, `Correct. Regular expressions specify tokens and finite automata recognize them.`]
        ], a: 3, src: `Exam 2024/25 (60)` },
        { q: `Keywords are recognized in a compiler during:`, o: [
          [`code generation`, `Too late.`],
          [`data flow analysis`, `Not a lecture phase.`],
          [`lexical analysis`, `Correct. Keywords are tokens.`],
          [`program parsing`, `The parser receives keywords already recognized as tokens.`]
        ], a: 2, src: `Exam Summer 2025` },
        { q: `Lexical analysis is about breaking a sequence of characters into:`, o: [
          [`Tokens`, `Correct.`],
          [`Lines`, `No.`],
          [`Groups`, `Too vague.`],
          [`Packets`, `Networking term.`]
        ], a: 0, src: `Exam 2023/24 Summer` },
        { q: `The expression aε = εa = ?`, o: [
          [`ε`, `Wrong. This is the exam trap: ε is the neutral element, not a "zero".`],
          [`a`, `Correct. sε = s = εs.`],
          [`aa`, `No.`],
          [`Φ (empty set)`, `No.`]
        ], a: 1, src: `Exam 2024/25 (50) T/F` },
        { q: `Is (X|Y)* equivalent to X*|Y*?`, o: [
          [`Yes, always`, `Wrong. (X|Y)* contains XY, which X*|Y* cannot produce.`],
          [`No`, `Correct. X*|Y* only gives strings made of X's alone or Y's alone.`],
          [`Only if X = ε`, `Not the point of the question.`],
          [`Only for DFAs`, `Meaningless.`]
        ], a: 1, src: `Exam 2024/25 (60) T/F` },
        { q: `L1 = {a,b}, L2 = {0,11}. L2L1 = ?`, o: [
          [`{a0, a11, b0, b11}`, `That is L1L2.`],
          [`{0a, 0b, 11a, 11b}`, `Correct. Each string of L2 followed by each string of L1.`],
          [`{a, b, 0, 11}`, `That is the union.`],
          [`{0a, 11b}`, `Missing combinations.`]
        ], a: 1 },
        { q: `Are the regular expressions (a)|((b)*(c)) and b*c|a equivalent?`, o: [
          [`Yes`, `Correct. The parentheses are redundant (* binds tighter than concatenation) and | is commutative.`],
          [`No, the order of | matters`, `| is commutative: s|t = t|s.`],
          [`No, (b)*(c) means (bc)*`, `(b)*(c) is b*c.`],
          [`Only over {a,b}`, `Irrelevant.`]
        ], a: 0, src: `Exam Summer 2025 T/F` },
        { q: `Which regular expression gives strings over {a,b} with EXACTLY two a's?`, o: [
          [`(a|b)*a(a|b)*a(a|b)*`, `That is AT LEAST two a's.`],
          [`b*ab*ab*`, `Correct. Only b's are allowed around the two a's.`],
          [`aab*`, `Forces the a's to be first and adjacent.`],
          [`(ab)*`, `Any number of a's.`]
        ], a: 1, src: `Sheet One` },
        { q: `Which state machine accepts a+?`, o: [
          [`One start/final state with an a-loop`, `That accepts a* (including ε).`],
          [`q0 (a-loop) --a--> final q1`, `Correct. At least one a must be read before reaching the final state.`],
          [`q0 --a--> q1 with no loops`, `Accepts only "a".`],
          [`q0 with a,b loop`, `That is (a|b)*.`]
        ], a: 1 },
        { q: `Regular expression a|b denotes:`, o: [
          [`{ab}`, `That is concatenation.`],
          [`{a, b}`, `Correct.`],
          [`{ε, a, b}`, `ε is not included.`],
          [`{a, b, ab, ba}`, `No.`]
        ], a: 1, src: `Exam Summer 2025 T/F` },
        { q: `"In concatenation of two alphabets/languages, order is not important." This is:`, o: [
          [`True`, `Wrong. L1L2 ≠ L2L1.`],
          [`False`, `Correct. Order matters for concatenation (it matters NOT for union).`],
          [`True only for finite languages`, `No.`],
          [`True only with ε`, `No.`]
        ], a: 1, src: `Exam 2024/25 (50) T/F` }
      ]
    },
    /* ───────────────────────── LECTURE 3 ───────────────────────── */
    {
      n: 3, title: `NFA vs DFA and NFA → DFA Conversion`,
      notes: [
        { h: `What makes an automaton an NFA?`, pts: [
          `An NFA (Non-Deterministic Finite Automaton) has <b>one or more</b> of these characteristics:`,
          `1) It <b>contains ε</b> (an empty-string transition).`,
          `2) It <b>contains a loop with an input symbol followed by a transition with the same input symbol</b>. Example: q0 has a loop on 0,1 and q0 –0→ q1 –1→ (q2). On 0, q0 can stay or move to q1.`,
          `3) It <b>contains multiple paths with the same input string</b> that it can recognize (try 001 on the slide's A/B/C automaton: A loops on 0,1; A –0→ C; A –1→ B; B –1→ C; C loops on 0,1).`,
          `So <b>a loop by itself does NOT make an automaton non-deterministic</b>. A DFA may contain loops. Having several accept states does not either.`
        ]},
        { h: `Transition tables`, pts: [
          `A <b>transition table</b> is a tabular representation of an automaton: rows = states, columns = input symbols, cells = next state(s), "-" = no transition.`
        ], table: [
          [`State`, `a`, `b`],
          [`→ S`, `P`, `Q`],
          [`P`, `-`, `R`],
          [`Q`, `Q, T`, `-`],
          [`R`, `-`, `F`],
          [`T`, `F`, `T`],
          [`F (final)`, `-`, `-`]
        ]},
        { h: `NFA → DFA (subset construction), lecture method`, pts: [
          `<b>Step 1</b>: build the first transition table <b>with an ε column</b> (every state reaches itself by ε).`,
          `<b>Step 2</b>: build the second table <b>without ε</b>: start from the start state (its ε-closure), and every new SET of states that appears in a cell becomes a new row. Repeat until no new sets appear.`,
          `<b>Step 3</b>: draw the DFA. Every set containing an original final state is final. An empty cell (-) is a dead state or simply no transition.`,
          `Slide example: A (loop 0,1) –0→ (B).`
        ], table: [
          [`State`, `0`, `1`],
          [`→ A`, `{A,B}`, `A`],
          [`* {A,B}`, `{A,B}`, `A`]
        ]},
        { h: `Worked exam NFA 1 (appears in 2021–2025 papers)`, pts: [
          `NFA: start 1; final 3. 1 –0→ 3; 3 –0→ 1; 3 –1→ 3 (loop); 3 –1→ 2; 2 –0→ 3. (Also drawn with states S, R, M.)`,
          `<b>Why non-deterministic?</b> State 3 has a loop on 1 AND a transition on the same symbol 1 to state 2, so (3,1) has two next states.`
        ], table: [
          [`DFA state`, `0`, `1`],
          [`→ {1}`, `{3}`, `∅`],
          [`* {3}`, `{1}`, `{2,3}`],
          [`* {2,3}`, `{1,3}`, `{2,3}`],
          [`* {1,3}`, `{1,3}`, `{2,3}`]
        ]},
        { h: `Worked exam NFA 2 (with ε), 2024/25 paper`, pts: [
          `NFA: start and final 1; 1 –b→ 2; 1 –ε→ 3; 2 –a→ 2; 2 –a,b→ 3; 3 –a→ 1.`,
          `ε-closures: E(1) = {1,3}, E(2) = {2}, E(3) = {3}. So the DFA starts at {1,3}. Final DFA states = those containing 1.`
        ], table: [
          [`DFA state`, `a`, `b`],
          [`→* {1,3}`, `{1,3}`, `{2}`],
          [`{2}`, `{2,3}`, `{3}`],
          [`{2,3}`, `{1,2,3}`, `{3}`],
          [`{3}`, `{1,3}`, `∅`],
          [`* {1,2,3}`, `{1,2,3}`, `{2,3}`]
        ]}
      ],
      cards: [
        [`3 signs of an NFA`, `ε transition; a loop on a symbol plus another transition on the same symbol; multiple paths for the same string.`],
        [`Does any loop make an automaton an NFA?`, `No. A DFA may contain loops.`],
        [`Must an NFA contain a loop?`, `No. ε alone is enough.`],
        [`Must an automaton have exactly one accept state?`, `No. It may have several.`],
        [`Transition table`, `A tabular representation of an automaton: states × input symbols → next state(s).`],
        [`Is NFA → DFA conversion always possible?`, `Yes, by the subset construction.`],
        [`DFA start state when the NFA has ε`, `The ε-closure of the NFA start state.`],
        [`Which DFA states are final?`, `Every set that contains an original final state.`],
        [`Automaton with an ε symbol is a…`, `NFA.`],
        [`Does ε change the language?`, `No. ε consumes no input and sε = s.`]
      ],
      qa: [
        [`State the reasons for an automaton being non-deterministic.`, `It contains an ε transition; or it contains a loop on an input symbol followed by a transition with the same input symbol; or it has multiple paths for the same input string.`],
        [`Convert the NFA with start 1, final 3 and edges 1-0->3, 3-0->1, 3-1->3, 3-1->2, 2-0->3 into a DFA.`, `{1}: 0->{3}, 1->dead. {3}: 0->{1}, 1->{2,3}. {2,3}: 0->{1,3}, 1->{2,3}. {1,3}: 0->{1,3}, 1->{2,3}. Start {1}; final {3}, {2,3}, {1,3}.`],
        [`Convert the NFA A (loop on 0,1) --0--> B (final) into a DFA.`, `A: 0->{A,B}, 1->A. {A,B}: 0->{A,B}, 1->A. Start A, final {A,B}. It accepts strings ending in 0.`],
        [`Convert the NFA 0 --b--> 2, 0 --a--> 1, 2 --a--> 2, 2 --a--> 3, 1 --b--> 3 (start 0, final 3) into a DFA.`, `{0}: a->{1}, b->{2}. {1}: b->{3}. {2}: a->{2,3}. {2,3}: a->{2,3}. {3}: none. Final: {3} and {2,3}. Language ab | ba+.`]
      ],
      quiz: [
        { q: `The following condition will cause any automaton to be an NFA:`, o: [
          [`having an ε`, `Correct. ε transitions exist only in NFAs.`],
          [`having more than one accept state`, `DFAs may have several accept states.`],
          [`having loops`, `DFAs can have loops. Only a loop followed by a transition on the SAME symbol causes non-determinism.`],
          [`all of the mentioned`, `Only (a) always causes it.`]
        ], a: 0, src: `Exam 2024/25 (60)` },
        { q: `The automaton with ε symbol is said to be:`, o: [
          [`DFA`, `A DFA cannot use ε.`],
          [`NFA`, `Correct.`],
          [`FFA`, `Not a term.`],
          [`none`, `(b) is right.`]
        ], a: 1, src: `Exam Summer 2025` },
        { q: `"A DFA may contain a loop or more."`, o: [
          [`True`, `Correct. E.g. the DFA for 1*01(0|1)* has loops on q0 and q2.`],
          [`False`, `Loops are fine as long as each (state, symbol) has exactly one next state.`],
          [`Only self-loops`, `Any loop is fine.`],
          [`Only if it has ε`, `A DFA never has ε.`]
        ], a: 0, src: `Exam 2023/24 (60) T/F` },
        { q: `In the NFA 1 --0--> 3, 3 --0--> 1, 3 --1--> 3, 3 --1--> 2, 2 --0--> 3, what is the DFA transition from {3} on input 1?`, o: [
          [`{3}`, `Misses the edge 3 --1--> 2.`],
          [`{2}`, `Misses the self-loop.`],
          [`{2,3}`, `Correct. Both 3 and 2 are reachable on 1.`],
          [`∅`, `There are transitions on 1.`]
        ], a: 2, src: `Exam 2024/25 (50)` },
        { q: `Same NFA: DFA transition from {2,3} on input 0?`, o: [
          [`{1,3}`, `Correct. 2 --0--> 3 and 3 --0--> 1.`],
          [`{3}`, `Misses 3 --0--> 1.`],
          [`{1}`, `Misses 2 --0--> 3.`],
          [`{2,3}`, `That is the transition on 1.`]
        ], a: 0, src: `Exam 2024/25 (50)` },
        { q: `NFA with 1 --ε--> 3 (1 is the start). The DFA start state is:`, o: [
          [`{1}`, `You must take the ε-closure.`],
          [`{1,3}`, `Correct. E(1) = {1,3}.`],
          [`{3}`, `1 itself is also in the closure.`],
          [`{1,2,3}`, `2 is not reachable by ε.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `In the ε-NFA (1 --b--> 2, 1 --ε--> 3, 2 --a--> 2, 2 --a,b--> 3, 3 --a--> 1), DFA transition from {2,3} on a:`, o: [
          [`{2,3}`, `Forgets 3 --a--> 1 and the closure of 1.`],
          [`{1,3}`, `Forgets 2 --a--> 2 and 2 --a--> 3.`],
          [`{1,2,3}`, `Correct. 2 gives {2,3}; 3 gives 1, whose ε-closure is {1,3}. Union = {1,2,3}.`],
          [`∅`, `There are a-transitions.`]
        ], a: 2, src: `Exam 2024/25 (60)` },
        { q: `Why is the NFA "A (loop 0,1) --0--> B" non-deterministic?`, o: [
          [`It has a final state`, `Every automaton has final states.`],
          [`It has a loop on 0 and another transition on the same symbol 0`, `Correct. (A,0) has two next states: A and B.`],
          [`It has an ε edge`, `There is no ε edge in the drawing.`],
          [`It has two states`, `Irrelevant.`]
        ], a: 1 },
        { q: `Which statement about the NFA → DFA conversion is correct?`, o: [
          [`It is impossible for NFAs with ε`, `ε-closures handle ε.`],
          [`It is always possible`, `Correct (subset construction).`],
          [`The DFA always has fewer states`, `It can have more (up to 2^n).`],
          [`It changes the accepted language`, `The language stays the same.`]
        ], a: 1, src: `Exam Summer 2025 T/F` },
        { q: `"Epsilon transition causes a change of the regular expression accepted by an automaton."`, o: [
          [`True`, `ε consumes no input; concatenating with ε changes nothing (sε = s).`],
          [`False`, `Correct (our answer; no official key). An ε move changes state without reading input, so the language is expressed the same way.`],
          [`True only for DFA`, `DFAs have no ε.`],
          [`Depends on the start state`, `No.`]
        ], a: 1, src: `Exam Summer 2025 T/F` }
      ]
    },
    /* ───────────────────────── LECTURES 4–5 ───────────────────────── */
    {
      n: 4, title: `Syntax Analysis: CFG, Derivations, Parse Trees, Ambiguity, Left Recursion (Lec 4–5)`,
      notes: [
        { h: `Why syntax analysis needs CFGs`, pts: [
          `Syntax analysis (<b>parsing</b>) is the <b>second phase</b>. The lexer finds tokens with regular expressions, but it <b>cannot check the syntax</b> of a sentence because of the limits of regular expressions.`,
          `Regular expressions <b>cannot check balancing tokens</b> such as parentheses, so this phase uses a <b>context-free grammar (CFG)</b>.`,
          `The parser takes the <b>token stream</b> from the lexer, checks it against the production rules to detect errors, and outputs a <b>parse tree</b>. Parsing = the process of finding a parse tree for a string of tokens.`
        ]},
        { h: `The four components of a CFG`, pts: [
          `<b>Non-terminals (V)</b>: syntactic variables that denote sets of strings.`,
          `<b>Terminals (Σ)</b>: tokens, the basic symbols from which strings are formed.`,
          `<b>Productions (P)</b>: how terminals and non-terminals combine. Each has a left side (a non-terminal), an arrow, and a right side (tokens and/or non-terminals).`,
          `<b>Start symbol (S)</b>: where derivation begins. Strings are derived from the start symbol by repeatedly replacing a non-terminal by the right side of one of its productions.`,
          `There is <b>no "end symbol"</b> in a CFG (common exam distractor).`,
          `Example: S→ABC, A→a|Aa, B→b|Bb, C→c. Terminals {a,b,c}; non-terminals {S,A,B,C}; start S.`
        ]},
        { h: `Derivations`, pts: [
          `A <b>derivation</b> is a sequence of production rules applied to get the input string. At each step we decide (1) which non-terminal to replace and (2) which production to use.`,
          `<b>Leftmost derivation</b>: always replace the leftmost non-terminal (scan left to right). <b>Rightmost</b>: always replace the rightmost one (scan right to left).`,
          `A top-down parser produces a <b>leftmost derivation</b>. Bottom-up (shift-reduce, LR) parsers produce a rightmost derivation in reverse.`
        ]},
        { h: `Example: int*int with E→TX, X→+E|ε, T→int Y|(E), Y→*T|ε`, table: [
          [`Leftmost`, `Sentential form`, `Rightmost`, `Sentential form`],
          [`E → TX`, `TX`, `E → TX`, `TX`],
          [`T → int Y`, `int Y X`, `X → ε`, `T`],
          [`Y → *T`, `int * T X`, `T → int Y`, `int Y`],
          [`T → int Y`, `int * int Y X`, `Y → *T`, `int * T`],
          [`Y → ε`, `int * int X`, `T → int Y`, `int * int Y`],
          [`X → ε`, `int * int`, `Y → ε`, `int * int`]
        ]},
        { h: `Parse trees`, pts: [
          `A <b>parse tree</b> is a graphical depiction of a derivation. The <b>start symbol is the root</b>.`,
          `<b>All leaf nodes are terminals</b>; <b>all interior (non-leaf) nodes are non-terminals</b>; an <b>in-order traversal gives the original input string</b>.`,
          `A parse tree shows <b>associativity and precedence</b>: the deepest sub-tree is evaluated first, so its operator has precedence over operators in parent nodes.`,
          `Slides build the leftmost tree for id+id*id step by step: E→E*E, E→E+E*E, E→id+E*E, E→id+id*E, E→id+id*id.`,
          `Official revision-sheet key: "A leftmost parsing tree grows from the <b>right</b> side" (answer the MCQ/T-F this way).`
        ]},
        { h: `Ambiguity`, pts: [
          `A grammar is <b>ambiguous</b> if it has <b>more than one parse tree</b> (more than one leftmost, or more than one rightmost, derivation) for <b>at least one string</b>.`,
          `One leftmost and one rightmost derivation for the same string do NOT prove ambiguity. You need two different LEFTMOST (or two different rightmost) derivations/trees.`,
          `If only one leftmost (or rightmost) tree exists for every sentence, the grammar is <b>unambiguous</b>.`,
          `Example: E→E+E | E–E | id is ambiguous. id–id+id has two trees (below).`
        ], code: `LMD 1 (root is +)            LMD 2 (root is -)
E ⇒ E+E                       E ⇒ E-E
  ⇒ E-E+E                       ⇒ id-E
  ⇒ id-E+E                      ⇒ id-E+E
  ⇒ id-id+E                     ⇒ id-id+E
  ⇒ id-id+id                    ⇒ id-id+id

Tree 1:        E               Tree 2:     E
            /  |  \                     /  |  \
           E   +   E                   E   -   E
         / | \     |                   |     / | \
        E  -  E    id                  id   E  +  E
        |     |                             |     |
        id    id                            id    id`},
        { h: `More ambiguity proofs from the sheets`, code: `S → 0A | 1B,  A → 0AA | 1S | 1,  B → 1BB | 0S | 0,   string 001101
LMD 1: S ⇒ 0A ⇒ 00AA ⇒ 001SA ⇒ 0011BA ⇒ 00110A ⇒ 001101
LMD 2: S ⇒ 0A ⇒ 00AA ⇒ 001A  ⇒ 0011S  ⇒ 00110A ⇒ 001101

S → Ab | aaB,  A → a | Aa,  B → b,   string aab
LMD 1: S ⇒ aaB ⇒ aab
LMD 2: S ⇒ Ab ⇒ Aab ⇒ aab

S → AB | C, A → aAb | ab, B → cBd | cd, C → aCd | aDd, D → bDc | bc,  string aabbccdd
LMD 1: S ⇒ AB ⇒ aAbB ⇒ aabbB ⇒ aabbcBd ⇒ aabbccdd
LMD 2: S ⇒ C ⇒ aCd ⇒ aaDdd ⇒ aabDcdd ⇒ aabbccdd

Unambiguous check: E → E+T | T, T → T*F | F, F → (E) | id,   string id+id*id
E ⇒ E+T ⇒ T+T ⇒ F+T ⇒ id+T ⇒ id+T*F ⇒ id+F*F ⇒ id+id*F ⇒ id+id*id`},
        { h: `Left recursion`, pts: [
          `A grammar is <b>left-recursive</b> if a non-terminal A has a derivation containing A itself as the <b>left-most symbol</b>.`,
          `It is a problem for <b>top-down parsers</b>: they start from the start symbol, keep expanding the same left non-terminal, can't judge when to stop and go into an <b>infinite loop</b>. So <b>LL(1) cannot be applied to a left-recursive grammar</b>.`,
          `(1) A → Aα | β is <b>immediate</b> left recursion. (2) S → Aα | β with A ⇒ Sd is <b>indirect</b> left recursion.`,
          `A → Ab | c is left-recursive.`
        ]},
        { h: `Removing left recursion`, formula: [
          `A → Aα | β      becomes      A → βA'`,
          `                             A' → αA' | ε`,
          `E → E+T | T     becomes      E → TE'  ,  E' → +TE' | ε`,
          `A → ABα | Aa | a   becomes   A → aA'  ,  A' → BαA' | aA' | ε`,
          `A → aB | Ad        becomes   A → aBA' ,  A' → dA' | ε`,
          `A → Abc | b        becomes   A → bA'  ,  A' → bcA' | ε`
        ]}
      ],
      cards: [
        [`Why can't the lexer check syntax?`, `Regular expressions cannot check balanced tokens such as parentheses.`],
        [`4 components of a CFG`, `Non-terminals, terminals, productions, start symbol.`],
        [`Is an "end symbol" part of a CFG?`, `No.`],
        [`Parsing`, `Finding a parse tree for a string of tokens (also called syntax analysis).`],
        [`Input and output of syntax analysis`, `Input: a stream of tokens. Output: a parse (syntax) tree.`],
        [`Leftmost derivation`, `Always replace the leftmost non-terminal first.`],
        [`Leaf nodes of a parse tree`, `Terminals.`],
        [`Interior (non-leaf) nodes of a parse tree`, `Non-terminals.`],
        [`In-order traversal of a parse tree gives…`, `The original input string.`],
        [`Ambiguous grammar`, `More than one parse tree (two leftmost or two rightmost derivations) for at least one string.`],
        [`Left recursion`, `A non-terminal A whose derivation contains A as its left-most symbol.`],
        [`Why is left recursion bad?`, `Top-down parsers loop forever expanding the same non-terminal.`],
        [`Remove A → Aα | β`, `A → βA', A' → αA' | ε`],
        [`Top-down parser generates…`, `A leftmost derivation.`],
        [`Leftmost parsing tree grows from the … side (official key)`, `Right.`]
      ],
      qa: [
        [`Why does syntax analysis use a context-free grammar instead of regular expressions?`, `Regular expressions (used by the lexer) cannot check balancing tokens such as parentheses, so they cannot check the syntax of a sentence. A CFG can describe nested, balanced structures.`],
        [`Prove that E -> E+E | E-E | id is ambiguous using the string id-id+id.`, `LMD1: E => E+E => E-E+E => id-E+E => id-id+E => id-id+id (root +, left child id-id). LMD2: E => E-E => id-E => id-E+E => id-id+E => id-id+id (root -, right child id+id). Two different leftmost derivations/parse trees for one string, so the grammar is ambiguous.`],
        [`Consider S -> 0A | 1B, A -> 0AA | 1S | 1, B -> 1BB | 0S | 0. Derive 001101 and state whether the grammar is ambiguous.`, `LMD1: S => 0A => 00AA => 001SA => 0011BA => 00110A => 001101. LMD2: S => 0A => 00AA => 001A => 0011S => 00110A => 001101. Two leftmost derivations (two parse trees), so the grammar is ambiguous.`],
        [`Remove left recursion from E -> E+T | T.`, `E -> TE' and E' -> +TE' | epsilon.`],
        [`Given S -> AB, A -> AA | a, B -> Tc, T -> aT | a, prove ambiguity using aaac.`, `LMD1: S => AB => AAB => aAB => aaB => aaTc => aaac (A gives aa, T gives a). LMD2: S => AB => aB => aTc => aaTc => aaac (A gives a, T gives aa). Two different leftmost derivations and trees, so the grammar is ambiguous.`]
      ],
      quiz: [
        { q: `……… is a process of finding a parse tree for a string of tokens.`, o: [
          [`Analysis`, `Too general.`],
          [`Recognition`, `A recognizer only says yes/no.`],
          [`Parsing`, `Correct.`],
          [`Tokenization`, `That is lexical analysis.`]
        ], a: 2, src: `Exam 2024/25 (60)` },
        { q: `Leaf nodes of a parsing tree indicate ……… of a context-free grammar.`, o: [
          [`terminals`, `Correct.`],
          [`non-terminals`, `Those are interior nodes.`],
          [`start symbol`, `That is the root.`],
          [`production rules`, `Productions are the parent-to-children links.`]
        ], a: 0, src: `Exam 2024/25 (60)` },
        { q: `The following is not a part of a context-free grammar:`, o: [
          [`start symbol`, `Part of a CFG.`],
          [`non-terminal symbols`, `Part of a CFG.`],
          [`end symbol`, `Correct. A CFG has V, Σ, P and S only.`],
          [`terminal symbols`, `Part of a CFG.`]
        ], a: 2, src: `Exam 2024/25 (60)` },
        { q: `When only one rightmost or only one leftmost parsing tree is produced for a sentence, the grammar is:`, o: [
          [`ambiguous`, `Ambiguous means more than one tree.`],
          [`unambiguous`, `Correct.`],
          [`static`, `Not a grammar property.`],
          [`dynamic`, `Not a grammar property.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `The rule A → Ab | c will cause the grammar to be:`, o: [
          [`ambiguous`, `This rule alone gives one tree per string (c, cb, cbb…).`],
          [`left recursive`, `Correct. A appears as the left-most symbol of its own right side.`],
          [`dynamic`, `Not a grammar property.`],
          [`all of the mentioned`, `Only (b).`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `……… is the input to the syntax analysis phase.`, o: [
          [`stream of tokens`, `Correct. Produced by the scanner.`],
          [`syntax tree`, `The output of syntax analysis.`],
          [`annotated syntax tree`, `The output of semantic analysis.`],
          [`assembly code`, `The output of code generation.`]
        ], a: 0, src: `Exam 2024/25 (60)` },
        { q: `The phase Syntax Analysis is modeled on the basis of:`, o: [
          [`high level language`, `No.`],
          [`low level language`, `No.`],
          [`context free grammar`, `Correct.`],
          [`regular grammar`, `Regular grammars/expressions model lexical analysis.`]
        ], a: 2, src: `Exam 2024/25 (50)` },
        { q: `A leftmost parsing tree grows from the ……… side.`, o: [
          [`left`, `Not the official key.`],
          [`equal sides`, `No.`],
          [`right`, `Correct per the official revision-sheet key (Q52) and the 2023/24 exam.`],
          [`the side cannot be determined`, `No.`]
        ], a: 2, src: `Exam 2023/24 (60)` },
        { q: `A context-free grammar is said to be ambiguous when:`, o: [
          [`it has a leftmost and a rightmost derivation for the same string`, `Every unambiguous grammar also has both. That proves nothing.`],
          [`it can't accept a specific string`, `That is about the language, not ambiguity.`],
          [`it achieves the same string following more than one path using either leftmost or rightmost derivation`, `Correct.`],
          [`None`, `(c) is right.`]
        ], a: 2, src: `Final revision sheet` },
        { q: `For S → Ab | aaB, A → a | Aa, B → b, which is a valid leftmost derivation of aab?`, o: [
          [`S ⇒ Ab ⇒ Aab ⇒ aab`, `Correct (one of the two; the other is S ⇒ aaB ⇒ aab), so the grammar is ambiguous.`],
          [`S ⇒ Ab ⇒ ab`, `That derives ab, not aab.`],
          [`S ⇒ aaB ⇒ aaBb`, `B → b only.`],
          [`S ⇒ AaB ⇒ aab`, `No production S → AaB.`]
        ], a: 0, src: `Final revision sheet` },
        { q: `Removing left recursion from A → aB | Ad gives:`, o: [
          [`A → dA', A' → aBA' | ε`, `β is aB (the non-recursive option), not d.`],
          [`A → aBA', A' → dA' | ε`, `Correct. A → Aα | β with α = d, β = aB.`],
          [`A → aB | dA`, `That changes the language.`],
          [`A → aBd*`, `Not a CFG production.`]
        ], a: 1, src: `Lecture 6 example` },
        { q: `"LL(1) can be applied on a left-recursive context-free grammar."`, o: [
          [`True`, `A top-down parser would loop forever on A → Aα.`],
          [`False`, `Correct. Remove the left recursion first.`],
          [`True if it is unambiguous`, `Still loops.`],
          [`True with backtracking`, `LL(1) is predictive and has no backtracking.`]
        ], a: 1, src: `Exam 2023/24 (60) T/F` }
      ]
    },
    /* ───────────────────────── LECTURE 6 ───────────────────────── */
    {
      n: 6, title: `LL(1) Parsing: FIRST, FOLLOW and Predictive Parsing Tables`,
      notes: [
        { h: `FIRST and FOLLOW`, pts: [
          `<b>FIRST(α)</b> = the set of terminals that begin strings derived from α. If α ⇒* ε then ε is also in FIRST(α).`,
          `In predictive parsing, for A → α | β, if FIRST(α) and FIRST(β) are disjoint, we pick the right A-production by looking at the next input symbol.`,
          `<b>FOLLOW(A)</b> = the set of terminals a that can appear immediately to the right of A in some sentential form (S ⇒* αAaβ). If A can be the rightmost symbol, <b>$</b> is in FOLLOW(A). FOLLOW never contains ε.`
        ]},
        { h: `Rules for FIRST`, pts: [
          `1. If X is a terminal, FIRST(X) = {X}.`,
          `2. If X → Y1Y2…Yk, put a in FIRST(X) if a ∈ FIRST(Yi) and ε is in all of FIRST(Y1)…FIRST(Yi-1). If ε is in every FIRST(Yj), add ε to FIRST(X).`,
          `3. If X → ε is a production, add ε to FIRST(X).`
        ]},
        { h: `Rules for FOLLOW`, pts: [
          `1. Put $ in FOLLOW(S), where S is the start symbol.`,
          `2. If A → αBβ, everything in FIRST(β) except ε is in FOLLOW(B).`,
          `3. If A → αB, or A → αBβ where FIRST(β) contains ε, then everything in FOLLOW(A) is in FOLLOW(B).`
        ]},
        { h: `LL(1) grammars`, pts: [
          `Predictive parsers are recursive-descent parsers that need <b>no backtracking</b>. Grammars for which we can build them are <b>LL(1)</b>.`,
          `<b>L</b>: scan input Left to right. <b>L</b>: Leftmost derivation. <b>1</b>: one input symbol of lookahead.`,
          `G is LL(1) iff for every pair A → α | β: (1) α and β do not both derive strings beginning with the same terminal; (2) at most one of them can derive ε; (3) if α ⇒* ε, then β derives no string beginning with a terminal in FOLLOW(A).`,
          `So: no left recursion, no ambiguity, and no two entries in one table cell.`
        ]},
        { h: `Building the predictive parsing table M`, pts: [
          `For each production A → α:`,
          `1. For each terminal a in FIRST(α), add A → α to M[A, a].`,
          `2. If ε ∈ FIRST(α), add A → α to M[A, b] for each b in FOLLOW(A) (including $).`,
          `Empty entries are errors.`,
          `<b>Parsing</b>: stack starts as S$ and input as w$. If the top is a terminal equal to the input symbol, <b>match</b> (pop and advance). If it is a non-terminal A, replace it with the right side of M[A, a] (pushed so the first symbol is on top). Accept when both are $.`
        ]},
        { h: `Example 1: S → A, A → aB | Ad, B → b, C → g`, pts: [
          `After removing left recursion: S → A, A → aBA', A' → dA' | ε, B → b, C → g.`
        ], table: [
          [`NT`, `FIRST`, `FOLLOW`, `a`, `b`, `d`, `g`, `$`],
          [`S`, `{a}`, `{$}`, `S → A`, ``, ``, ``, ``],
          [`A`, `{a}`, `{$}`, `A → aBA'`, ``, ``, ``, ``],
          [`A'`, `{d, ε}`, `{$}`, ``, ``, `A' → dA'`, ``, `A' → ε`],
          [`B`, `{b}`, `{d, $}`, ``, `B → b`, ``, ``, ``],
          [`C`, `{g}`, `{-}`, ``, ``, ``, `C → g`, ``]
        ]},
        { h: `Example 1: parsing abd`, table: [
          [`Stack`, `Input`, `Action`],
          [`S$`, `abd$`, `S → A`],
          [`A$`, `abd$`, `A → aBA'`],
          [`aBA'$`, `abd$`, `match a`],
          [`BA'$`, `bd$`, `B → b`],
          [`bA'$`, `bd$`, `match b`],
          [`A'$`, `d$`, `A' → dA'`],
          [`dA'$`, `d$`, `match d`],
          [`A'$`, `$`, `A' → ε`],
          [`$`, `$`, `accept`]
        ]},
        { h: `Example 2: expression grammar`, pts: [
          `E → TE', E' → +TE' | ε, T → FT', T' → *FT' | ε, F → (E) | id.`
        ], table: [
          [`NT`, `FIRST`, `FOLLOW`, `id`, `+`, `*`, `(`, `)`, `$`],
          [`E`, `{(, id}`, `{), $}`, `E → TE'`, ``, ``, `E → TE'`, ``, ``],
          [`E'`, `{+, ε}`, `{), $}`, ``, `E' → +TE'`, ``, ``, `E' → ε`, `E' → ε`],
          [`T`, `{(, id}`, `{+, ), $}`, `T → FT'`, ``, ``, `T → FT'`, ``, ``],
          [`T'`, `{*, ε}`, `{+, ), $}`, ``, `T' → ε`, `T' → *FT'`, ``, `T' → ε`, `T' → ε`],
          [`F`, `{(, id}`, `{+, *, ), $}`, `F → id`, ``, ``, `F → (E)`, ``, ``]
        ]},
        { h: `Exam grammar: S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε`, table: [
          [`NT`, `FIRST`, `FOLLOW`, `(`, `a`, `d`, `c`, `b`, `)`, `$`],
          [`S`, `{(, a, d}`, `{$, ), b}`, `S → UVW`, `S → UVW`, `S → UVW`, ``, ``, ``, ``],
          [`U`, `{(, a, d}`, `{a, c, $, ), b}`, `U → (S)`, `U → aSb`, `U → d`, ``, ``, ``, ``],
          [`V`, `{a, ε}`, `{c, $, ), b}`, ``, `V → aV`, ``, `V → ε`, `V → ε`, `V → ε`, `V → ε`],
          [`W`, `{c, ε}`, `{$, ), b}`, ``, ``, ``, `W → cW`, `W → ε`, `W → ε`, `W → ε`]
        ], pts: [
          `FOLLOW(S): $ (start), ")" from U → (S), b from U → aSb.`,
          `FOLLOW(U): FIRST(VW) − ε = {a, c}; VW can vanish, so add FOLLOW(S).`,
          `FOLLOW(V): FIRST(W) − ε = {c}, plus FOLLOW(S) because W is nullable. FOLLOW(W) = FOLLOW(S).`,
          `No cell has two entries, so the grammar is LL(1). The full parse of (dc)ac is in the 2024/25 exam below.`
        ]}
      ],
      cards: [
        [`FIRST(α)`, `The terminals that can begin strings derived from α (plus ε if α ⇒* ε).`],
        [`FOLLOW(A)`, `The terminals that can appear immediately after A; $ if A can be rightmost.`],
        [`Can FOLLOW contain ε?`, `No.`],
        [`FOLLOW(start symbol) always contains…`, `$`],
        [`Rule: A → αBβ`, `FIRST(β) − {ε} ⊆ FOLLOW(B).`],
        [`Rule: A → αB (or β nullable)`, `FOLLOW(A) ⊆ FOLLOW(B).`],
        [`LL(1) letters`, `Left-to-right scan, Leftmost derivation, 1 lookahead symbol.`],
        [`Predictive parser`, `A recursive-descent parser that needs no backtracking.`],
        [`Table rule 1`, `For each terminal a in FIRST(α), put A → α in M[A,a].`],
        [`Table rule 2`, `If ε ∈ FIRST(α), put A → α in M[A,b] for each b in FOLLOW(A), including $.`],
        [`Empty table cell means…`, `Error.`],
        [`When does LL(1) parsing accept?`, `When the stack and the input are both $.`],
        [`FIRST(E) in the expression grammar`, `{(, id}`],
        [`FOLLOW(F) in the expression grammar`, `{+, *, ), $}`]
      ],
      qa: [
        [`State the conditions for a grammar to be LL(1).`, `For every pair of productions A -> alpha | beta: no terminal a starts strings derived from both alpha and beta; at most one of alpha, beta derives the empty string; and if alpha derives the empty string, beta derives no string beginning with a terminal in FOLLOW(A).`],
        [`Explain how the predictive parsing table is constructed.`, `For each production A -> alpha: for each terminal a in FIRST(alpha) put A -> alpha in M[A,a]; if epsilon is in FIRST(alpha), put A -> alpha in M[A,b] for every b in FOLLOW(A) (and in M[A,$] if $ is in FOLLOW(A)). All remaining entries are errors.`],
        [`Compute FIRST and FOLLOW for E -> TE', E' -> +TE' | e, T -> FT', T' -> *FT' | e, F -> (E) | id.`, `FIRST(E)=FIRST(T)=FIRST(F)={(,id}; FIRST(E')={+,e}; FIRST(T')={*,e}. FOLLOW(E)=FOLLOW(E')={),$}; FOLLOW(T)=FOLLOW(T')={+,),$}; FOLLOW(F)={+,*,),$}.`],
        [`Parse abbcde with S -> aABe, A -> Abc | b, B -> d using LL(1).`, `Remove left recursion: A -> bA', A' -> bcA' | e. FIRST: S{a}, A{b}, A'{b,e}, B{d}. FOLLOW: S{$}, A{d}, A'{d}, B{e}. Parse: S -> aABe, match a, A -> bA', match b, A' -> bcA', match b, match c, A' -> e (on d), B -> d, match d, match e, accept.`]
      ],
      quiz: [
        { q: `In LL(1), the two L's and the 1 stand for:`, o: [
          [`Left-to-right scan, Leftmost derivation, 1 lookahead symbol`, `Correct.`],
          [`Left recursion, Leftmost derivation, 1 state`, `Left recursion is forbidden in LL(1).`],
          [`Lexical, Logical, 1 pass`, `No.`],
          [`Left-to-right scan, Rightmost derivation, 1 lookahead`, `That would be LR.`]
        ], a: 0 },
        { q: `For E → TE', E' → +TE' | ε, T → FT', T' → *FT' | ε, F → (E) | id, FOLLOW(T) is:`, o: [
          [`{+, ), $}`, `Correct. FIRST(E') − ε = {+}, and E' is nullable so FOLLOW(E) = {), $} is added.`],
          [`{*, +, ), $}`, `That is FOLLOW(F).`],
          [`{), $}`, `That is FOLLOW(E) and FOLLOW(E').`],
          [`{(, id}`, `That is FIRST(T).`]
        ], a: 0, src: `Lecture 6 example` },
        { q: `Same grammar: M[T', )] = ?`, o: [
          [`T' → *FT'`, `That goes under *.`],
          [`T' → ε`, `Correct. ")" ∈ FOLLOW(T') and T' has an ε production.`],
          [`error`, `")" is in FOLLOW(T').`],
          [`T → FT'`, `Wrong row.`]
        ], a: 1, src: `Lecture 6 example` },
        { q: `Same grammar: M[F, (] = ?`, o: [
          [`F → id`, `That goes under id.`],
          [`F → (E)`, `Correct. FIRST((E)) = {(}.`],
          [`E → TE'`, `Wrong row.`],
          [`error`, `There is an entry.`]
        ], a: 1 },
        { q: `For S → A, A → aBA', A' → dA' | ε, B → b, what is FOLLOW(B)?`, o: [
          [`{$}`, `Misses FIRST(A').`],
          [`{d, $}`, `Correct. FIRST(A') − ε = {d}; A' is nullable, so FOLLOW(A) = {$} is added.`],
          [`{b}`, `That is FIRST(B).`],
          [`{d, ε}`, `That is FIRST(A'). FOLLOW never contains ε.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `For S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε, FOLLOW(S) is:`, o: [
          [`{$}`, `S also appears inside U → (S) and U → aSb.`],
          [`{$, ), b}`, `Correct. $ (start), ) from (S), b from aSb.`],
          [`{a, c, $}`, `That mixes in FOLLOW(U).`],
          [`{(, a, d}`, `That is FIRST(S).`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `Same grammar: FOLLOW(U) is:`, o: [
          [`{a, c}`, `V and W are nullable, so FOLLOW(S) must be added too.`],
          [`{a, c, $, ), b}`, `Correct. FIRST(VW) − ε plus FOLLOW(S).`],
          [`{$, ), b}`, `Misses FIRST(V) and FIRST(W).`],
          [`{a}`, `Misses a lot.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `Same grammar: which entry is M[V, )]?`, o: [
          [`V → aV`, `Only under a.`],
          [`V → ε`, `Correct. ")" ∈ FOLLOW(V) = {c, $, ), b}.`],
          [`error`, `")" is in FOLLOW(V).`],
          [`W → ε`, `Wrong row.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `During LL(1) parsing the stack top is a terminal equal to the current input symbol. The action is:`, o: [
          [`Expand`, `Expansion is for non-terminals.`],
          [`Match (pop and advance the input)`, `Correct.`],
          [`Reduce`, `Reduce is a bottom-up (LR) action.`],
          [`Error`, `Only on a mismatch.`]
        ], a: 1 },
        { q: `A top-down parser generates:`, o: [
          [`left-most derivation in reverse`, `No.`],
          [`left-most derivation`, `Correct.`],
          [`right-most derivation in reverse`, `That is bottom-up (LR / shift-reduce).`],
          [`right-most derivation`, `No.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `S → aABe, A → Abc | b, B → d. After removing left recursion, which is correct?`, o: [
          [`A → bA', A' → bcA' | ε`, `Correct. α = bc, β = b.`],
          [`A → bcA', A' → bA' | ε`, `α and β are swapped.`],
          [`A → Abc', A' → b`, `Still left-recursive.`],
          [`A → b | bc`, `Changes the language.`]
        ], a: 0, src: `Exam 2023/24 (50)` }
      ]
    },
    /* ───────────────────────── LECTURE 7 ───────────────────────── */
    {
      n: 7, title: `Semantic Analysis: Attribute Grammars and SDT`,
      notes: [
        { h: `Semantic analysis`, pts: [
          `Makes sure that the declarations and statements of a program are <b>semantically correct</b>.`,
          `It uses the <b>syntax tree and the symbol table</b> to check whether the program is consistent with the language definition. It gathers <b>type information</b> and stores it in the syntax tree or the symbol table. The compiler later uses this during <b>intermediate-code generation</b>.`,
          `Type checking is done during semantic analysis, i.e. during <b>syntax-directed translation</b>. Input: syntax tree. Output: <b>annotated syntax tree</b> (a parse tree showing the attribute values at each node).`
        ]},
        { h: `Semantic errors the analyzer should recognize`, pts: [
          `Type mismatch.`,
          `Undeclared variable.`,
          `Reserved identifier misuse.`,
          `Multiple declaration of a variable in one scope.`,
          `Accessing an out-of-scope variable.`,
          `Actual and formal parameter mismatch.`
        ]},
        { h: `Attribute grammar`, pts: [
          `A special form of CFG where additional information (<b>attributes</b>) is appended to one or more of its <b>non-terminals</b> to provide context-sensitive information. Each attribute has a well-defined domain (integer, float, character, string, expressions).`,
          `It gives <b>semantics</b> to the CFG and can specify both syntax and semantics. Viewed as a parse tree, it can pass values among the nodes.`,
          `Example: <code>E → E + T { E.value = E.value + T.value }</code>. Here "value" is an attribute.`,
          `So an attribute grammar is produced by <b>attaching attributes to each non-terminal of the CFG</b>. Semantic analysis uses the <b>attribute</b> grammar to transform the <b>syntax</b> tree into the <b>annotated syntax</b> tree.`
        ]},
        { h: `Syntax Directed Translation (SDT)`, pts: [
          `SDT = <b>augmented rules added to the grammar that facilitate semantic analysis</b>.`,
          `Information is passed <b>bottom-up and/or top-down</b> the parse tree as attributes attached to the nodes. SDT rules use 1) <b>lexical values</b> of nodes, 2) <b>constants</b> and 3) <b>attributes</b> of non-terminals.`,
          `General approach: build a parse/syntax tree and compute the attribute values at its nodes by visiting them in some order. Often this can be done during parsing, without an explicit tree.`,
          `In general, SDT associates 1) a <b>set of attributes to every node</b> of the grammar and 2) a <b>set of translation rules to every production</b>, using attributes, constants and lexical values. The result is the annotated syntax tree.`
        ]},
        { h: `SDT example: 2 + 3 * 4`, code: `E -> E + T   { E.val = E.val + T.val }   PR#1
E -> T       { E.val = T.val }           PR#2
T -> T * F   { T.val = T.val * F.val }   PR#3
T -> F       { T.val = F.val }           PR#4
F -> INT     { F.val = INT.lexval }      PR#5

Evaluation (depth-first, bottom-up, left to right):
F.val = 2  -> T.val = 2  -> E.val = 2
F.val = 3  -> T.val = 3
F.val = 4
T.val = T.val * F.val = 3 * 4 = 12
E.val = E.val + T.val = 2 + 12 = 14`, pts: [
          `2, 3 and 4 are called <b>lexical values</b>.`,
          `Evaluate with <b>one depth-first traversal</b>. The information flows <b>bottom-up</b>: all children's attributes are computed before the parent's.`,
          `Right-hand-side nodes are sometimes written with subscript 1 (E → E1 + T) to tell the child from the parent.`
        ]},
        { h: `Synthesized vs inherited attributes`, table: [
          [`Synthesized`, `Inherited`],
          [`Get values from the attribute values of their <b>child nodes</b>.`, `Get values from their <b>parent and/or sibling</b> nodes.`],
          [`S → ABC: S takes values from A, B, C.`, `S → ABC: A can take values from S, B, C; B from S, A, C; C from S, A, B.`],
          [`<b>Never</b> take values from parent or sibling nodes.`, `Information passes <b>downwards</b> (and sideways) in the tree.`],
          [`Passed <b>upwards</b>, leaves → root (e.g. E → E + T).`, `Example: a symbol table is synthesized by a declaration and inherited by the scope of that declaration.`]
        ]},
        { h: `Definite assignment analysis (lecture notes, revision sheet)`, pts: [
          `A data-flow analysis that ensures a variable is always assigned before it is used. A variable is in one of three states:`,
          `<b>Definitely assigned</b>: known with certainty to be assigned.`,
          `<b>Definitely unassigned</b>: known with certainty to be unassigned.`,
          `<b>Unknown</b>: may or may not be assigned.`
        ]}
      ],
      cards: [
        [`Semantic analysis uses…`, `The syntax tree and the symbol table.`],
        [`Output of semantic analysis`, `The annotated syntax tree.`],
        [`6 semantic errors`, `Type mismatch, undeclared variable, reserved identifier misuse, multiple declaration in a scope, out-of-scope access, actual/formal parameter mismatch.`],
        [`Attribute grammar`, `A CFG with attributes appended to its non-terminals to give context-sensitive information.`],
        [`How is an attribute grammar produced?`, `By attaching attributes to each non-terminal of the CFG.`],
        [`SDT stands for`, `Syntax Directed Translation.`],
        [`SDT (definition)`, `Augmented rules added to the grammar that facilitate semantic analysis.`],
        [`3 things SDT rules use`, `Lexical values of nodes, constants, attributes of non-terminals.`],
        [`Lexical values`, `The token values at the leaves, e.g. 2, 3, 4 in 2+3*4.`],
        [`Synthesized attribute`, `Gets its value from its child nodes (passed upwards).`],
        [`Inherited attribute`, `Gets its value from its parent and/or siblings (passed downwards).`],
        [`Type checking is done during…`, `Syntax directed translation (semantic analysis).`],
        [`Definitely assigned`, `The variable is known with certainty to be assigned.`],
        [`Unknown (definite assignment)`, `The variable may or may not be assigned.`]
      ],
      qa: [
        [`Explain the purpose of SDT.`, `SDT adds augmented rules to the grammar that facilitate semantic analysis. It passes information bottom-up and/or top-down the parse tree as attributes attached to the nodes. It builds a parse/syntax tree and computes attribute values at the nodes by visiting them in some order, giving the annotated syntax tree. In general it associates a set of attributes with every grammar node and a set of translation rules with every production, using attributes, constants and lexical values.`],
        [`Differentiate between synthesized and inherited attributes.`, `Synthesized attributes get their values from the attribute values of their child nodes and are passed upwards from the leaves to the root (e.g. E -> E + T, E.val from its children); they never take values from parents or siblings. Inherited attributes get values from the parent and/or siblings and are passed downwards (in S -> ABC, A can take values from S, B and C). A symbol table is synthesized by a declaration and inherited by the declaration's scope.`],
        [`Evaluate 2+3*4 with the SDT rules E -> E+T {E.val = E.val + T.val}, E -> T, T -> T*F {T.val = T.val * F.val}, T -> F, F -> INT {F.val = INT.lexval}.`, `Bottom-up, depth-first: F=2, T=2, E=2; F=3, T=3; F=4; T = 3*4 = 12; E = 2 + 12 = 14. The root gets E.val = 14.`],
        [`List the semantic errors that a semantic analyzer is expected to recognize.`, `Type mismatch; undeclared variable; reserved identifier misuse; multiple declaration of a variable in a scope; accessing an out-of-scope variable; actual and formal parameter mismatch.`]
      ],
      quiz: [
        { q: `Attributes that get their values from their child nodes of the syntax tree are called ……… attributes.`, o: [
          [`static`, `Not an attribute category.`],
          [`dynamic`, `Not an attribute category.`],
          [`synthesized`, `Correct.`],
          [`inherited`, `Inherited attributes come from the parent/siblings.`]
        ], a: 2, src: `Exam 2024/25 (60)` },
        { q: `Inherited attributes get their attribute values from:`, o: [
          [`child nodes`, `That is synthesized.`],
          [`leaves nodes`, `No.`],
          [`parent nodes`, `Correct (official key; the lecture adds "and/or siblings").`],
          [`semantic nodes`, `Not a term.`]
        ], a: 2, src: `Exam 2024/25 (50)` },
        { q: `Attaching attributes to each non-terminal of the CFG will produce:`, o: [
          [`annotated syntax tree`, `The annotated tree is produced by EVALUATING an attribute grammar on a syntax tree.`],
          [`unambiguous CFG`, `Attributes do not change ambiguity.`],
          [`ambiguous CFG`, `No.`],
          [`attribute grammar`, `Correct. Official sheet Q53: "Attribute grammar is generated by attaching attributes to each nonterminal of the CFG".`]
        ], a: 3, src: `Exam 2024/25 (60)` },
        { q: `SDT is an abbreviation of:`, o: [
          [`Semantic Directed Translation`, `Common trap.`],
          [`Syntax Directed Translation`, `Correct.`],
          [`Syntax Double Translation`, `No.`],
          [`Semantic Directed Table`, `No.`]
        ], a: 1, src: `Exam 2023/24 (60)` },
        { q: `Semantic analysis uses ……… grammar in order to transform ……… tree into ……… tree.`, o: [
          [`context free, syntax, annotated syntax`, `The grammar is the ATTRIBUTE grammar.`],
          [`attribute, semantic, syntax`, `Wrong direction.`],
          [`attribute, syntax, annotated syntax`, `Correct.`],
          [`context free, syntax, semantic`, `No "semantic tree" in the course.`]
        ], a: 2, src: `Exam 2023/24 (50)` },
        { q: `Type checking is normally done during:`, o: [
          [`code optimization`, `Too late.`],
          [`syntax directed translation`, `Correct (official key).`],
          [`lexical analysis`, `The lexer has no type information.`],
          [`syntax analysis`, `Syntax analysis checks structure only.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `A parse tree showing the value of attributes at each node is a(n):`, o: [
          [`Annotated parse tree`, `Correct.`],
          [`Syntax tree`, `No attribute values.`],
          [`Semantic tree`, `Not a course term.`],
          [`None of the mentioned`, `(a) is right.`]
        ], a: 0, src: `Final revision sheet` },
        { q: `With the SDT rules for E → E+T | T, T → T*F | F, F → INT, what is E.val at the root for 2+3*4?`, o: [
          [`20`, `That is (2+3)*4. The grammar gives * higher precedence (deeper in the tree).`],
          [`14`, `Correct. T.val = 3*4 = 12, then E.val = 2 + 12.`],
          [`24`, `No.`],
          [`9`, `Adds everything.`]
        ], a: 1, src: `Lecture 7 example` },
        { q: `In the SDT example, the values 2, 3 and 4 at the leaves are called:`, o: [
          [`synthesized attributes`, `They are the source of synthesis, but the lecture names them differently.`],
          [`lexical values`, `Correct (INT.lexval).`],
          [`constants`, `A separate category in SDT rules.`],
          [`inherited attributes`, `No.`]
        ], a: 1 },
        { q: `When a variable may or may not be assigned, its definite-assignment state is:`, o: [
          [`definitely unassigned`, `That is certainty of NOT assigned.`],
          [`unknown`, `Correct.`],
          [`definitely assigned`, `That is certainty of assigned.`],
          [`none of the mentioned`, `(b) is right.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `"SDT is the process of using the context-free grammar along the syntax tree to get the annotated syntax tree."`, o: [
          [`True`, `Correct. SDT evaluates rules attached to CFG productions over the tree, producing the annotated syntax tree.`],
          [`False`, `The revision sheet says attribute grammar/SDT on the syntax tree generates the annotated syntax tree.`],
          [`True only for inherited attributes`, `No.`],
          [`True only bottom-up`, `SDT can go both ways.`]
        ], a: 0, src: `Exam 2024/25 (60) T/F` }
      ]
    },
    /* ───────────────────────── LECTURE 8 ───────────────────────── */
    {
      n: 8, title: `Semantic Analysis Part 2: Scoping, Binding and Symbol Tables`,
      notes: [
        { h: `Object binding (scoping)`, pts: [
          `Binding connects a <b>declaration</b> and its <b>uses</b>. The <b>scope</b> of an identifier is the portion of the program where it is accessible.`,
          `The same identifier may refer to different things in different parts of the program. Different scopes for the same name do not overlap. An identifier may have restricted scope.`
        ]},
        { h: `Static vs dynamic binding`, table: [
          [`Static binding`, `Dynamic binding`],
          [`Scoping based on the <b>structure of the syntax tree</b> (i.e. braces / blocks).`, `The declaration <b>most recently encountered during execution</b> defines the current use of the name.`],
          [`Scope depends only on the <b>program text</b>, not run-time behaviour.`, `Scope depends on the <b>execution</b> of the program. The compiler/interpreter walks up the symbol-table stack to find the right instance.`],
          [`Most languages: <b>Java, C</b>.`, `A few: <b>Lisp, SNOBOL, Perl</b> (via keywords).`],
          [`Resolved at <b>compile time</b>.`, `<b>Cannot</b> be resolved at compile time.`]
        ]},
        { h: `Scoping example (lecture)`, code: `{
   int x = 1; int y = 2;
   {
      double x = 3.14159265358979;
      y += (int)x;        // inner x = 3  -> y = 5
   }
   y += (int)x;           // static: outer x = 1 -> y = 6
}                         // dynamic (course): x = 3 still -> y = 8`, pts: [
          `The inner block's x hides the outer x until the inner closing brace.`,
          `The course's convention for "dynamic" in these exercises: the most recently executed declaration (the inner x) is still used after the block. So final y = <b>6 (static)</b> or <b>8 (dynamic)</b>.`,
          `Revision sheet version (int x = 3 inside, cout after each +=): static output <b>5, 6</b>; dynamic output <b>5, 8</b>.`
        ]},
        { h: `Symbol tables`, pts: [
          `A data structure in a compiler/interpreter where each identifier is associated with information about its declaration or appearance: <b>type, scope level</b> and sometimes <b>location</b>.`
        ], table: [
          [`High-level operations`, `Low-level operations`],
          [`enter scope`, `enter_scope(): start a new nested scope`],
          [`process a declaration`, `insert_symbol(x): add symbol x to the table`],
          [`process a use`, `local_lookup(x): is x in the local scope?`],
          [`exit scope`, `look_up(x): find the current x via scoping rules`],
          [``, `exit_scope(): exit the current scope`]
        ]},
        { h: `Implementation techniques and approaches`, pts: [
          `Implementation: <b>unordered list</b>, <b>ordered list</b>, <b>binary search trees</b>, <b>hash tables</b> (the most common).`,
          `Approaches: <b>one symbol table per scope</b>, or <b>one symbol table for all scopes</b>. So there is more than one approach.`
        ]},
        { h: `One symbol table per scope (slide walkthrough)`, code: `{ int a, b, c;                      Block 1
  a = 0; b = 0; c = 0;
  { int c, d;                        Block 2
    c = a + 1;
    d = c; }
  { string a; int c;                 Block 3
    print c; }
  print d
}`, pts: [
          `Enter block 1 → create <b>ST1</b> (columns: Symb, Token, Dtype, Init?).`,
          `Type declaration → add a, b, c (id, int, Init = No). Each assignment: "found in current ST? Yes" → mark initiated.`,
          `Enter block 2 → create <b>ST2</b>, add c, d. <code>c = a + 1</code>: c is found in ST2 → mark initiated; a is not in ST2, so look in the parent ST1: found and initiated.`,
          `The final <code>print d</code> is outside block 2, so d is not visible (an out-of-scope access).`
        ]},
        { h: `Problem with one table per scope and the solutions`, pts: [
          `<b>Problem</b>: each hash table has <b>memory overhead</b>, so a table per scope is memory inefficient. We may also need to <b>search several tables</b>, which is slower.`,
          `<b>Solution</b>: a <b>single hash table for all scopes</b>: less memory overhead and only one search.`,
          `<b>Solution 1</b>: give each scope a unique number (global scope_id = 0, increment for each new scope). Key = <code>"identifier,scope_id"</code>. To look up, append the current scope_id to the identifier. This <b>may still need multiple searches</b>.`,
          `<b>Solution 2</b>: key = identifier; value = a <b>linked list</b> of pointers to records, one per usage (declaration) of the identifier. In a single-pass compiler each new insertion goes at the <b>front</b> of the list, and a separate structure tracks the identifiers defined in the current scope (used to delete them on scope exit).`,
          `With solution 2, all entries are in open scopes, and the <b>front item is always the right one</b> for the current scope. It is not time consuming.`
        ], code: `Linked-list symbol table for:  int x=1; int y=2; { int x=3; ... }
x  ->  [scope 1 | init YES | next] -> [scope 0 | init YES | NULL]
y  ->  [scope 0 | init YES | NULL]`}
      ],
      cards: [
        [`Scope of an identifier`, `The portion of the program in which the identifier is accessible.`],
        [`Static binding`, `Scoping based on the structure of the syntax tree (braces); depends only on the program text.`],
        [`Dynamic binding`, `The most recently encountered declaration during execution defines the current use.`],
        [`Static-scope languages`, `Most languages, e.g. Java and C.`],
        [`Dynamic-scope languages`, `Lisp, SNOBOL, Perl (through certain keywords).`],
        [`Can dynamic binding be resolved at compile time?`, `No.`],
        [`Symbol table stores…`, `Each identifier's information: type, scope level, sometimes location.`],
        [`Symbol table implementations`, `Unordered list, ordered list, binary search tree, hash table (most common).`],
        [`Main problem of one symbol table per scope`, `Memory overhead (plus several searches).`],
        [`Solution 1 key`, `"identifier,scope_id" (still may need multiple searches).`],
        [`Solution 2 structure`, `Key = identifier; value = linked list of records, newest in front.`],
        [`low-level lookup operations`, `local_lookup(x) for the local scope; look_up(x) via scoping rules.`],
        [`Scoping example final y`, `Static 6, dynamic 8.`]
      ],
      qa: [
        [`Compare static and dynamic binding.`, `Static binding: scoping follows the structure of the syntax tree (braces); it depends only on the program text and is resolved at compile time (Java, C). Dynamic binding: the declaration most recently encountered during execution defines the use; it depends on execution, walks up the symbol-table stack, and cannot be resolved at compile time (Lisp, SNOBOL, Perl).`],
        [`What is the problem of using one symbol table per scope, and how is it solved?`, `Each hash table has memory overhead and we may need to search several tables (slow). Use a single table for all scopes: Solution 1 keys entries by "identifier,scope_id" (may still need several searches); Solution 2 maps each identifier to a linked list of its declarations with the newest in front, so the front item is always the one for the current scope.`],
        [`Show the output of: int a=10; int b=20; { int a=30; b*=a; cout<<b; } b+=a; cout<<b; in static and dynamic binding.`, `Inner block: b = 20*30 = 600, prints 600 in both. After the block: static uses the outer a=10, so b = 610 and prints 610. Dynamic (course convention) uses the most recent a=30, so b = 630 and prints 630.`],
        [`List the symbol table operations.`, `High level: enter scope, process a declaration, process a use, exit scope. Low level: enter_scope(), insert_symbol(x), local_lookup(x), look_up(x), exit_scope().`]
      ],
      quiz: [
        { q: `……… is a major problem when creating a symbol table per scope.`, o: [
          [`Redundant code`, `Not related.`],
          [`Peephole optimization`, `An optimization technique, not a problem.`],
          [`Ambiguity`, `A grammar problem.`],
          [`Memory overhead`, `Correct. Each hash table costs memory, and several tables may need searching.`]
        ], a: 3, src: `Exam 2024/25 (60)` },
        { q: `……… is done based on the structure of the parsing tree, such as braces.`, o: [
          [`Static binding`, `Correct.`],
          [`Dynamic binding`, `Dynamic binding follows execution order, not structure.`],
          [`All types of binding`, `No.`],
          [`None of the mentioned`, `(a) is right.`]
        ], a: 0, src: `Exam 2023/24 (60)` },
        { q: `"Dynamic object binding is done based on the structure of the parsing tree such as braces."`, o: [
          [`True`, `That describes STATIC binding.`],
          [`False`, `Correct. Dynamic binding uses the most recently encountered declaration at run time.`],
          [`True for C only`, `C is statically scoped.`],
          [`True for Lisp only`, `Lisp's dynamic scope depends on execution.`]
        ], a: 1, src: `Exam 2024/25 (60) T/F` },
        { q: `The data structure responsible for managing information about variables and their attributes is:`, o: [
          [`semantic stack`, `No.`],
          [`symbol table`, `Correct.`],
          [`parser table`, `The LL(1) table holds productions.`],
          [`abstract syntax tree`, `Holds program structure.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `The most common way to implement symbol tables is:`, o: [
          [`Unordered list`, `Possible, but slow.`],
          [`Ordered list`, `Possible.`],
          [`Binary search tree`, `Possible.`],
          [`Hash table`, `Correct. The slides call it the most common means.`]
        ], a: 3 },
        { q: `In the single-table "Solution 1", the key used to enter an identifier is:`, o: [
          [`the identifier only`, `That is Solution 2.`],
          [`"identifier,scope_id"`, `Correct.`],
          [`the scope_id only`, `No.`],
          [`the data type`, `No.`]
        ], a: 1 },
        { q: `"The structure of a symbol table is time consuming when an identifier returns a linked list of usages of itself."`, o: [
          [`True`, `Wrong. The front item is always the right one, so lookup is fast.`],
          [`False`, `Correct (official key).`],
          [`True for multi-pass compilers only`, `No.`],
          [`Cannot be determined`, `The key says False.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `{ int x=1; int y=2; { int x=3; y+=x; } y+=x; } Final y with STATIC binding?`, o: [
          [`5`, `That is y after the inner block only.`],
          [`6`, `Correct. 2+3 = 5, then the outer x = 1 gives 6.`],
          [`8`, `That is the dynamic answer.`],
          [`4`, `No.`]
        ], a: 1, src: `Lecture 8 example` },
        { q: `Same code, DYNAMIC binding (course convention):`, o: [
          [`6`, `Static answer.`],
          [`5`, `Stops too early.`],
          [`8`, `Correct. The most recently encountered x (3) is used again: 5 + 3.`],
          [`7`, `No.`]
        ], a: 2, src: `Lecture 8 example` },
        { q: `"There is only one approach to implement symbol tables."`, o: [
          [`True`, `Wrong.`],
          [`False`, `Correct. One table per scope or one table for all scopes, with lists, BSTs or hash tables.`],
          [`True for C`, `No.`],
          [`True for static binding`, `No.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `"The problem of using a single hash table as a symbol table is memory overhead."`, o: [
          [`True`, `Memory overhead is the problem of one table PER SCOPE; the single table is the solution.`],
          [`False`, `Correct.`],
          [`True only for dynamic binding`, `No.`],
          [`Cannot be determined`, `It can.`]
        ], a: 1, src: `Exam 2023/24 Summer T/F` }
      ]
    },
    /* ───────────────────────── LECTURE 9 ───────────────────────── */
    {
      n: 9, title: `Runtime Environment, Parameter Passing and Code Optimization`,
      notes: [
        { h: `Runtime environment`, pts: [
          `<b>Runtime</b> = a program in execution. The <b>runtime environment</b> is a state of the target machine (software libraries, environment variables…) that provides services to running processes.`,
          `The <b>runtime support system</b> is a package, mostly generated with the executable itself, that handles communication between the process and the runtime environment. It takes care of <b>memory allocation and de-allocation</b> while the program runs.`
        ]},
        { h: `Storage allocation: what needs memory`, pts: [
          `<b>Code</b>: the text part, which does not change at runtime. Its memory needs are <b>known at compile time</b>.`,
          `<b>Procedures</b>: their text is static, but they are called in a random order, so <b>stack</b> storage manages procedure calls and activations.`,
          `<b>Variables</b>: known only at runtime (unless global or constant). <b>Heap</b> allocation manages them.`
        ]},
        { h: `The 3 types of storage allocation`, pts: [
          `<b>Static allocation</b>: data is bound to a <b>fixed location</b> that does not change during execution. Since sizes and locations are known in advance, <b>no runtime support package</b> is needed for allocation/de-allocation.`,
          `<b>Stack allocation</b>: procedure calls and activations are managed with a stack (<b>LIFO</b>). Very useful for <b>recursive</b> calls.`,
          `<b>Heap allocation</b>: memory is allocated and de-allocated dynamically at runtime and reclaimed when no longer needed. Needed by languages that allow <b>dynamic data structures</b>.`,
          `Except for the static area, <b>stack and heap grow and shrink dynamically</b>, so they cannot be given a fixed amount of memory. The compiler therefore uses fixed-size (static) and dynamic-size (stack/heap) storage.`
        ]},
        { h: `Memory layout (draw this figure)`, code: `┌──────────────────────┐  low address
│  Text (code) memory  │  ┐
├──────────────────────┤  │ fixed (static)
│  Static data         │  ┘  (initialized data + BSS)
├──────────────────────┤
│  Stack memory   ↓    │  ┐
│                      │  │ dynamic:
│   (free space)       │  │ stack and heap grow
│                      │  │ toward each other
│  Heap memory    ↑    │  ┘
└──────────────────────┘`, pts: [
          `The text part gets a fixed amount of memory. Stack and heap are at the <b>two extremes</b> of the program's memory and <b>grow and shrink against each other</b>.`,
          `Lecture notes (C layout): text segment, initialized data segment (globals/statics with a value), uninitialized data segment (BSS: globals/statics without one), stack (automatic variables, stack frames with return addresses), heap (malloc/realloc/free).`
        ]},
        { h: `Formal vs actual parameters`, code: `fun_one() {
   int actual_parameter = 10;
   call fun_two(int actual_parameter);
}
fun_two(int formal_parameter) {
   print formal_parameter;
}`, pts: [
          `<b>Formal parameters</b>: variables in the <b>definition</b> of the called function that receive the information passed by the caller.`,
          `<b>Actual parameters</b>: variables whose values or addresses are passed; they appear in the <b>function call</b> as arguments.`,
          `Formal parameters hold the actual parameter's information: a value or an address, depending on the passing technique.`
        ]},
        { h: `Parameter-passing mechanisms (lecture example)`, code: `var a: array[1..3] of integer := (1,2,3);
var i: integer := 2;
proc concentrate(mode j, x: integer) is
   var i: integer := 0;
begin
   j := j+1;  x := x+3;  a[2] := 0;
   print(j); print(x); print(a);
end concentrate;
begin
   print(i); print(a);
   concentrate(i, a[i]);        -- i.e. concentrate(i, a[2])
   print(i); print(a);
end`, table: [
          [`Mode`, `How it works`, `Output`],
          [`By value`, `Formals get copies; nothing is copied back.`, `2 1 2 3 / 3 5 1 0 3 / 2 1 0 3`],
          [`By result`, `No value goes in (formals start as 0); on return the formals are copied back to the actuals.`, `2 1 2 3 / 1 3 1 0 3 / 1 1 3 3`],
          [`By value-result`, `Copied in at the call AND copied back at return (addresses fixed at call time: a[2]).`, `2 1 2 3 / 3 5 1 0 3 / 3 1 5 3`],
          [`By reference (notes)`, `Formals are aliases of the actuals (x IS a[2]).`, `2 1 2 3 / 3 0 1 0 3 / 3 1 0 3`]
        ]},
        { h: `Symbol table purposes (runtime view)`, pts: [
          `Stores information about variable names, function names, objects, classes, interfaces…`,
          `Purposes: store the names of all entities in one structured place; verify that a variable has been declared; implement <b>type checking</b> (assignments and expressions are semantically correct); determine the <b>scope</b> of a name (scope resolution). It can also be used for storage allocation.`
        ]},
        { h: `Peephole optimization`, pts: [
          `Code optimization performed on a <b>small part of the code</b>. That small set of instructions is called the <b>peephole</b> or <b>window</b>.`,
          `It works by <b>replacement</b>: part of the code is replaced by shorter, faster code with the same output. It is <b>machine dependent</b>.`,
          `Objectives: <b>improve performance</b>; <b>reduce code size</b> and improve memory usage.`,
          `<b>Redundant load and store elimination</b>: <code>y = x + 5; i = y; z = i; w = z * 3;</code> → <code>y = x + 5; i = y; w = y * 3;</code>`,
          `<b>Constant folding</b>: simplify what can be computed at compile time: <code>x = 2 * 3;</code> → <code>x = 6;</code>`,
          `<b>Combine operations</b>: several operations replaced by one equivalent. Slide example: <code>X = (2*3)+5; y = X – Sqrt(3*8);</code> (can become <code>X = 11; y = 11 – Sqrt(24);</code>).`
        ]},
        { h: `Loop optimization`, code: `int arr[]={1,2,3,4,5,6,7,8,9,10};
for(int i=0;i<arr.length;i++)          // arr.length evaluated every iteration
   System.out.println(arr[i]);

// optimized:
int arr[]={1,2,3,4,5,6,7,8,9,10};
int size = arr.length;                 // evaluated once (code hoisting)
for(int i=0;i<size;i++)
   System.out.println(arr[i]);`, pts: [
          `Loop optimization improves <b>cache performance</b> and reduces the <b>overheads</b> of executing loops.`,
          `Exam version: <code>for (i=0; i &lt; a→length-1; i++) swap_elements(a[i], a[i+1]);</code> → <code>int x = a→length-1; for (i=0; i &lt; x; i++) swap_elements(a[i], a[i+1]);</code> so length-1 is computed once instead of on every iteration, saving processing and time.`
        ]}
      ],
      cards: [
        [`Runtime environment`, `The state of the target machine (libraries, env variables…) that serves running processes.`],
        [`Runtime support system`, `A package generated with the executable that handles memory allocation/de-allocation at run time.`],
        [`How many types of storage does a compiler need?`, `Three: static, stack, heap.`],
        [`Static allocation`, `Fixed memory locations known in advance; no runtime support needed.`],
        [`Stack allocation is used for…`, `Procedure/function calls and activations (LIFO); good for recursion.`],
        [`Heap allocation is used for…`, `Dynamically allocated variables/data structures at run time.`],
        [`Which areas grow and shrink?`, `Stack and heap, toward each other; text and static data are fixed.`],
        [`Formal parameters`, `Declared in the called function's definition; receive the passed info.`],
        [`Actual parameters`, `The arguments given in the call.`],
        [`Pass by result`, `Nothing passed in; formals copied back to actuals on return.`],
        [`Pass by value-result`, `Copy in at call and copy back at return.`],
        [`Peephole / window`, `The small set of instructions that peephole optimization works on.`],
        [`Is peephole optimization machine dependent?`, `Yes.`],
        [`3 peephole techniques`, `Redundant load/store elimination, constant folding, combine operations.`],
        [`Loop optimization goal`, `Improve cache performance and reduce loop overheads.`]
      ],
      qa: [
        [`Describe and show by figure the memory layout allocated by a compiler.`, `Top: text (code) memory, fixed; then static data, fixed. Below: stack memory growing downwards and, at the other extreme, heap memory growing upwards; they grow and shrink against each other. Static allocation binds data to fixed locations known in advance (no runtime support needed). Stack allocation manages procedure calls/activations in LIFO order (good for recursion). Heap allocation allocates and frees variables dynamically at run time. Stack and heap cannot have a fixed size.`],
        [`Propose an optimized version of: for (i=0; i < a->length-1; i++) swap_elements(a[i], a[i+1]);`, `int x = a->length-1; for (i=0; i < x; i++) swap_elements(a[i], a[i+1]); The loop bound is computed once and stored in x instead of calling length-1 on every iteration, which saves processing time (loop optimization / code hoisting).`],
        [`What is peephole optimization? Give its techniques.`, `Machine-dependent optimization on a small window (peephole) of code, replacing it with shorter/faster code with the same output, to improve performance and reduce code size. Techniques: redundant load and store elimination (y=x+5; i=y; z=i; w=z*3 becomes y=x+5; i=y; w=y*3), constant folding (x=2*3 becomes x=6), combine operations (X=(2*3)+5 becomes X=11).`],
        [`Differentiate between formal and actual parameters.`, `Formal parameters are declared in the definition of the called procedure and receive the passed information (value or address). Actual parameters are the variables/values in the call statement whose values or addresses are passed.`],
        [`Give the output of the lecture's concentrate(i, a[i]) example for pass by value, result and value-result.`, `Value: 2 1 2 3 / 3 5 1 0 3 / 2 1 0 3. Result: 2 1 2 3 / 1 3 1 0 3 / 1 1 3 3. Value-result: 2 1 2 3 / 3 5 1 0 3 / 3 1 5 3.`]
      ],
      quiz: [
        { q: `A compiler needs ……… types of storage.`, o: [
          [`two`, `No.`],
          [`three`, `Correct. Static, stack, heap.`],
          [`four`, `No.`],
          [`five`, `The C layout has five segments, but the lecture's storage types are three.`]
        ], a: 1, src: `Exam 2024/25 (50)` },
        { q: `A compiler uses stack memory allocation for:`, o: [
          [`static allocation of objects`, `That is static storage.`],
          [`procedures & functions calling`, `Correct.`],
          [`allocation of the code itself`, `Code is static (text).`],
          [`a & b`, `Only (b).`]
        ], a: 1, src: `Exam 2023/24 (50)` },
        { q: `The following type of storage used by a compiler is dynamically allocated:`, o: [
          [`heap`, `Correct.`],
          [`queue`, `Not a compiler storage type.`],
          [`array`, `Arrays can be static.`],
          [`text`, `Fixed size.`]
        ], a: 0, src: `Exam 2023/24 Summer` },
        { q: `Storage used by a compiler can be classified into:`, o: [
          [`static, stack and heap`, `Correct.`],
          [`dynamic, stack and heap`, `"Dynamic" is not a separate class.`],
          [`static, queue and heap`, `No queue.`],
          [`None`, `(a) is right.`]
        ], a: 0, src: `Final revision sheet` },
        { q: `Languages that need heap allocation in the runtime environment are:`, o: [
          [`those that use global variables`, `Globals are static.`],
          [`those that use dynamic scoping`, `Not the reason.`],
          [`those that support recursion`, `Recursion needs the stack.`],
          [`those that allow dynamic data structures`, `Correct.`]
        ], a: 3, src: `Final revision sheet` },
        { q: `The following is NOT a method of optimization:`, o: [
          [`constant folding`, `A peephole technique.`],
          [`combine operations`, `A peephole technique.`],
          [`a and b`, `Both are methods.`],
          [`annotated syntax tree`, `Correct. It is a data structure, not an optimization.`]
        ], a: 3, src: `Exam Summer 2025` },
        { q: `……… and ……… are considered mechanisms of code optimization.`, o: [
          [`constant folding, variable folding`, `"Variable folding" is not in the course.`],
          [`constant folding, definite assignment`, `Definite assignment is an analysis.`],
          [`constant folding, combine operations`, `Correct.`],
          [`a and b`, `No.`]
        ], a: 2, src: `Final revision sheet` },
        { q: `Peephole optimization is:`, o: [
          [`machine independent and applied to the whole program`, `Opposite.`],
          [`machine dependent and applied to a small window of code`, `Correct.`],
          [`part of lexical analysis`, `No.`],
          [`only constant folding`, `It has three techniques.`]
        ], a: 1 },
        { q: `Lecture example with pass-by-RESULT: what does the main program print after the call?`, o: [
          [`2 1 0 3`, `That is pass by value.`],
          [`1 1 3 3`, `Correct. j ends at 1 and x at 3 (they start at 0) and are copied back to i and a[2].`],
          [`3 1 5 3`, `That is value-result.`],
          [`3 1 0 3`, `That is by reference.`]
        ], a: 1, src: `Lecture 9 example` },
        { q: `Lecture example with pass-by-VALUE-RESULT: output after the call?`, o: [
          [`3 1 5 3`, `Correct. j=3 is copied to i and x=5 to a[2], overwriting the a[2]:=0.`],
          [`2 1 0 3`, `By value.`],
          [`1 1 3 3`, `By result.`],
          [`3 1 0 3`, `By reference.`]
        ], a: 0, src: `Lecture 9 example` },
        { q: `y = x + 5; i = y; z = i; w = z * 3; → y = x + 5; i = y; w = y * 3; is an example of:`, o: [
          [`constant folding`, `No constants are folded.`],
          [`redundant load and store elimination`, `Correct.`],
          [`loop optimization`, `No loop.`],
          [`combine operations`, `Not the slide's label.`]
        ], a: 1 },
        { q: `"Loop optimization is necessary to improve cache performance and reduce overheads."`, o: [
          [`True`, `Correct (lecture wording).`],
          [`False`, `The slide says exactly this.`],
          [`True only for Java`, `No.`],
          [`Only for recursion`, `No.`]
        ], a: 0, src: `Final revision sheet` }
      ]
    }
  ],
  exams: [
    {
      title: `Final Exam 2024/2025 (60 marks)`,
      meta: `CS321 Compiler Design and Theory · 1st term · 2 hours · 60 marks · Dr. Lamia Hassaan, Dr. Ahmed Ibrahim`,
      note: `No official answer key was published. The answers below are worked out from the lectures and the doctor's final revision sheet. The scan has a student's pencil marks; some of them are wrong (e.g. Q2-I-4, Q2-I-11, T/F 4), so don't rely on them.`,
      sections: [
        { title: `Q1-a · Memory layout`, marks: `6 marks`, items: [
          { type: `written`, q: `Describe and show by figure the memory layout allocated by a compiler.`, ans: `<pre>┌──────────────────────┐
│  Text (code) memory  │  fixed
├──────────────────────┤
│  Static data         │  fixed
├──────────────────────┤
│  Stack memory   ↓    │  dynamic
│      free space      │
│  Heap memory    ↑    │  dynamic
└──────────────────────┘</pre><b>Static allocation</b>: data is bound to a fixed location that does not change during execution. Sizes and locations are known in advance, so no runtime support package is needed.<br><b>Stack allocation</b>: procedure calls and their activations are managed by a stack (LIFO); very useful for recursive calls.<br><b>Heap allocation</b>: memory for variables is allocated and de-allocated dynamically at run time and reclaimed when no longer needed.<br>The text part gets a fixed amount of memory. Stack and heap are at the two extremes and grow and shrink against each other, so they cannot be given a fixed size.`, why: `Lecture 9 figure plus the three storage types. Revision sheet essay Q3 gives this same answer.` }
        ]},
        { title: `Q1-b · NFA → DFA`, marks: `6 marks`, items: [
          { type: `written`, q: `Convert the given NFA into its equivalent DFA. NFA: start state 1 (also the accept state); 1 –b→ 2; 1 –ε→ 3; 2 –a→ 2 (loop); 2 –a,b→ 3; 3 –a→ 1.`, ans: `ε-closures: E(1) = {1,3}, E(2) = {2}, E(3) = {3}.<br>Table with ε (step 1):<table><tr><th>State</th><th>a</th><th>b</th><th>ε</th></tr><tr><td>1</td><td>-</td><td>2</td><td>1,3</td></tr><tr><td>2</td><td>2,3</td><td>3</td><td>2</td></tr><tr><td>3</td><td>1 (→ closure 1,3)</td><td>-</td><td>3</td></tr></table>DFA (step 2):<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→* {1,3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>{2}</td><td>{2,3}</td><td>{3}</td></tr><tr><td>{2,3}</td><td>{1,2,3}</td><td>{3}</td></tr><tr><td>{3}</td><td>{1,3}</td><td>∅</td></tr><tr><td>* {1,2,3}</td><td>{1,2,3}</td><td>{2,3}</td></tr></table>Start = {1,3}. Final states = those containing 1: {1,3} and {1,2,3}. ∅ is a dead state (or simply leave the transition out).`, why: `Start from the ε-closure of 1. For each set and symbol, collect the moves and take the ε-closure (3 –a→ 1 brings in 3 as well). The revision sheet's Q16 table gives the same result.` }
        ]},
        { title: `Q1-c · Ambiguity`, marks: `8 marks`, items: [
          { type: `written`, q: `Consider the CFG S → AB, A → AA | a, B → Tc, T → aT | a. Use leftmost derivations and parsing trees to prove its ambiguity. Input string: aaac.`, ans: `<pre>LMD 1: S ⇒ AB ⇒ AAB ⇒ aAB ⇒ aaB ⇒ aaTc ⇒ aaac
LMD 2: S ⇒ AB ⇒ aB ⇒ aTc ⇒ aaTc ⇒ aaac

Tree 1:        S                Tree 2:       S
             /   \                          /   \
            A     B                        A     B
           / \   / \                       |    / \
          A   A T   c                      a   T   c
          |   | |                             / \
          a   a a                            a   T
                                                 |
                                                 a</pre>Two different leftmost derivations (two different parse trees) for the same string aaac, so the grammar is ambiguous.`, why: `In tree 1, A derives aa and T derives a. In tree 2, A derives a and T derives aa. Other valid pairs exist too, e.g. A → AA → AAA grouped two ways for a longer string. Marks: two correct LMDs + two trees + the conclusion.` }
        ]},
        { title: `Q1-d · Parameter passing and optimization`, marks: `8 marks`, items: [
          { type: `written`, q: `Show the printed output when parameters are passed by value and by value-result. Also propose, with reasons, a code optimization.<pre>void swap(int a, int b)
{ int temp;
  temp = a;
  a = b;
  b = temp;
  cout&lt;&lt; a &lt;&lt; " "&lt;&lt; b &lt;&lt; endl;
}
void main()
{ int x;  double y=1.5*3;
  int value = 2;
  int list [5] = {1, 3, 5, 7, 9};
  swap(value, list[0]);
  cout &lt;&lt; value &lt;&lt; " " &lt;&lt; list[0] &lt;&lt; endl;
  swap(value, list[value]);
  cout &lt;&lt; value &lt;&lt; " " &lt;&lt; list[value] &lt;&lt; endl;
}</pre>`, ans: `<table><tr><th>Line</th><th>By value</th><th>By value-result</th></tr><tr><td>swap(value, list[0])</td><td>1 2</td><td>1 2</td></tr><tr><td>main</td><td>2 1</td><td>1 2  (value=1, list[0]=2 copied back)</td></tr><tr><td>swap(value, list[value])</td><td>5 2  (list[2]=5)</td><td>3 1  (value=1, so list[1]=3)</td></tr><tr><td>main</td><td>2 5</td><td>3 7  (value=3, list[1]=1; list[3]=7 printed)</td></tr></table><b>Optimizations</b>:<br>1) <b>Constant folding</b>: <code>double y = 1.5*3;</code> → <code>double y = 4.5;</code> (computed once at compile time).<br>2) <b>Dead code elimination</b>: x and y are declared but never used, so remove them (saves memory).<br>3) In swap, the three-assignment swap could be combined/simplified, but the main gains are 1 and 2.`, why: `By value: nothing is copied back, so main always sees value = 2 and the original list. By value-result: a and b are copied back at return to the addresses fixed at the call (list[0] in call 1, list[1] in call 2, since value = 1 then). After call 2, value = 3, and main prints list[value] = list[3] = 7. This follows the lecture's rule (in concentrate(i, a[i]) the result goes to a[2], chosen at call time). If you assume the address is re-evaluated at return (value = 3, so list[3] = 1), the last line would be "3 1", which is what the student's pencil note on the scan shows.` }
        ]},
        { title: `Q1-e · LL(1) parser`, marks: `12 marks`, items: [
          { type: `written`, q: `Given S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε. Construct its LL(1) predictive parser, then give the parsing actions for the input string (dc)ac.`, ans: `No left recursion, so no transformation is needed.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{ (, a, d }</td><td>{ $, ), b }</td></tr><tr><td>U</td><td>{ (, a, d }</td><td>{ a, c, $, ), b }</td></tr><tr><td>V</td><td>{ a, ε }</td><td>{ c, $, ), b }</td></tr><tr><td>W</td><td>{ c, ε }</td><td>{ $, ), b }</td></tr></table>Parsing table:<table><tr><th></th><th>(</th><th>a</th><th>d</th><th>c</th><th>b</th><th>)</th><th>$</th></tr><tr><td>S</td><td>S→UVW</td><td>S→UVW</td><td>S→UVW</td><td></td><td></td><td></td><td></td></tr><tr><td>U</td><td>U→(S)</td><td>U→aSb</td><td>U→d</td><td></td><td></td><td></td><td></td></tr><tr><td>V</td><td></td><td>V→aV</td><td></td><td>V→ε</td><td>V→ε</td><td>V→ε</td><td>V→ε</td></tr><tr><td>W</td><td></td><td></td><td></td><td>W→cW</td><td>W→ε</td><td>W→ε</td><td>W→ε</td></tr></table>Parsing (dc)ac:<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>(dc)ac$</td><td>S→UVW</td></tr><tr><td>UVW$</td><td>(dc)ac$</td><td>U→(S)</td></tr><tr><td>(S)VW$</td><td>(dc)ac$</td><td>match (</td></tr><tr><td>S)VW$</td><td>dc)ac$</td><td>S→UVW</td></tr><tr><td>UVW)VW$</td><td>dc)ac$</td><td>U→d</td></tr><tr><td>dVW)VW$</td><td>dc)ac$</td><td>match d</td></tr><tr><td>VW)VW$</td><td>c)ac$</td><td>V→ε</td></tr><tr><td>W)VW$</td><td>c)ac$</td><td>W→cW</td></tr><tr><td>cW)VW$</td><td>c)ac$</td><td>match c</td></tr><tr><td>W)VW$</td><td>)ac$</td><td>W→ε</td></tr><tr><td>)VW$</td><td>)ac$</td><td>match )</td></tr><tr><td>VW$</td><td>ac$</td><td>V→aV</td></tr><tr><td>aVW$</td><td>ac$</td><td>match a</td></tr><tr><td>VW$</td><td>c$</td><td>V→ε</td></tr><tr><td>W$</td><td>c$</td><td>W→cW</td></tr><tr><td>cW$</td><td>c$</td><td>match c</td></tr><tr><td>W$</td><td>$</td><td>W→ε</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>`, why: `FOLLOW(S) gets $ (start), ) from U → (S) and b from U → aSb. FOLLOW(U) = FIRST(VW) − ε ∪ FOLLOW(S) because V and W are nullable. FOLLOW(V) = {c} ∪ FOLLOW(S). FOLLOW(W) = FOLLOW(S). ε-productions go under the FOLLOW symbols. No cell has two entries, so the grammar is LL(1) and the string is accepted.` }
        ]},
        { title: `Q2-I · Choose the correct answer`, marks: `15 marks`, items: [
          { type: `mcq`, q: `……… is a process of finding a parse tree for a string of tokens.`, o: [`Analysis`, `Recognition`, `Parsing`, `Tokenization`], a: 2, why: `Parsing = finding a parse tree (L4).` },
          { type: `mcq`, q: `All of the following are phases of a compiler except:`, o: [`syntax analysis`, `symbol table`, `scanner`, `code optimization`], a: 1, why: `The symbol table is a data structure shared by the phases (L1).` },
          { type: `mcq`, q: `Leaf nodes of a parsing tree indicate ……… of a context free grammar.`, o: [`terminals`, `non-terminals`, `start symbol`, `production rules`], a: 0, why: `Leaves = terminals; interior nodes = non-terminals (L4).` },
          { type: `mcq`, q: `……… is a major problem when creating a symbol table per scope.`, o: [`Redundant code`, `Peephole optimization`, `Ambiguity`, `Memory overhead`], a: 3, why: `Each hash table costs memory (L8). The pencil mark on (b) is wrong.` },
          { type: `mcq`, q: `Annotated syntax tree is the input to ……… phase.`, o: [`syntax analysis`, `code optimization`, `semantic analysis`, `derivation`], a: 1, why: `Semantic analysis outputs the annotated tree and the source code optimizer takes it (L1; revision sheet Q37).` },
          { type: `mcq`, q: `The following is not a part of a context free grammar:`, o: [`start symbol`, `non-terminal symbols`, `end symbol`, `terminal symbols`], a: 2, why: `A CFG has V, Σ, P, S only (L4).` },
          { type: `mcq`, q: `When only one rightmost or only one leftmost parsing tree is produced for a sentence, the grammar is…`, o: [`ambiguous`, `unambiguous`, `static`, `dynamic`], a: 1, why: `Ambiguous means more than one tree (L4).` },
          { type: `mcq`, q: `Attributes that get their values from their child nodes of the syntax tree are called ……… attributes.`, o: [`static`, `dynamic`, `synthesized`, `inherited`], a: 2, why: `L7.` },
          { type: `mcq`, q: `……… is the input to syntax analysis phase.`, o: [`stream of tokens`, `syntax tree`, `annotated syntax tree`, `assembly code`], a: 0, why: `The scanner's tokens (L1, L4).` },
          { type: `mcq`, q: `The rule A→Ab | c will cause the grammar to be…`, o: [`ambiguous`, `left recursive`, `dynamic`, `all of the mentioned`], a: 1, why: `A appears as the left-most symbol of its own production (L5).` },
          { type: `mcq`, q: `Attaching attributes to each nonterminal of the CFG will produce:`, o: [`annotated syntax tree`, `unambiguous CFG`, `ambiguous CFG`, `attribute grammar`], a: 3, why: `Revision sheet Q53: attribute grammar is generated by attaching attributes to each non-terminal of the CFG. The pencil mark on (a) is wrong: the annotated tree comes from evaluating the attributes on a tree.` },
          { type: `mcq`, q: `The following is a major difference between phases of compilers and interpreters:`, o: [`code optimization`, `intermediate code generation`, `semantic analysis`, `none of the mentioned`], a: 1, why: `Compilers generate intermediate object code; interpreters do not (L1 table).` },
          { type: `mcq`, q: `The process of generating tokens is typically described using………`, o: [`finite automata`, `regular expressions`, `syntax directed translation`, `a and b`], a: 3, why: `Regular expressions specify tokens; finite automata recognize them (L2).` },
          { type: `mcq`, q: `The following condition will cause any automaton to be NFA:`, o: [`having an ε`, `having more than one accept state`, `having loops`, `all of the mentioned`], a: 0, why: `Loops and several accept states are allowed in DFAs (L3).` },
          { type: `mcq`, q: `The lexical analyzer takes …… as input and produces a list of ……. as output`, o: [`machine code, tokens`, `tokens, source code`, `source code, tokens`, `a and b`], a: 2, why: `L2.` }
        ]},
        { title: `Q2-II · True or False`, marks: `5 marks`, items: [
          { type: `tf`, q: `Dynamic object binding is done based on the structure of the parsing tree such as braces.`, a: 1, why: `That is STATIC binding. Dynamic binding uses the most recently executed declaration (L8).` },
          { type: `tf`, q: `(X | Y)* is equivalent to X* | Y*.`, a: 1, why: `(X|Y)* contains XY; X*|Y* does not (L2).` },
          { type: `tf`, q: `A leftmost parsing tree grows from the left side.`, a: 1, why: `The doctor's revision-sheet key (Q52) says a leftmost parsing tree grows from the RIGHT side, so answer False. (The lectures don't state this rule directly.)` },
          { type: `tf`, q: `Combine operations is one of the techniques of code optimization.`, a: 0, why: `It is one of the three peephole techniques (L9). The pencil ✗ on the scan is wrong.` },
          { type: `tf`, q: `SDT is the process of using context free grammar along the syntax tree to get annotated syntax tree.`, a: 0, why: `SDT attaches rules to CFG productions and evaluates them on the tree, giving the annotated syntax tree (L7; revision sheet T/F 13).` }
        ]}
      ]
    },
    {
      title: `Final Exam 2024/2025 (50 marks)`,
      meta: `CS309 Compiler Theory · 1st term · 2 hours · 50 marks · Dr. Lamia Hassaan, Dr. Ahmed Ibrahim`,
      note: `No official answer key was published. The answers are worked out from the lectures and the doctor's final revision sheet (which contains most of these MCQs with answers).`,
      sections: [
        { title: `Q1-I · Choose the correct answer`, marks: `10 marks · 1 each`, items: [
          { type: `mcq`, q: `Inherited attributes get their attribute values from`, o: [`child nodes`, `leaves nodes`, `parent nodes`, `semantic nodes`], a: 2, why: `Parent (and/or siblings) (L7; sheet Q42).` },
          { type: `mcq`, q: `The phase Syntax Analysis is modeled on the basis of……….`, o: [`high level language`, `low level language`, `context free grammar`, `Regular grammar`], a: 2, why: `L4.` },
          { type: `mcq`, q: `Parsing is also called………analysis`, o: [`semantic`, `lexical`, `syntax`, `none of the mentioned`], a: 2, why: `L4.` },
          { type: `mcq`, q: `Compiler translates the source code to……….`, o: [`machine code`, `executable code`, `binary code`, `both a and c`], a: 3, why: `Revision sheet Q12 key: both A and C.` },
          { type: `mcq`, q: `The lexical analyzer takes ……. as input and produces a list of …….as output`, o: [`machine code, tokens`, `tokens, source code`, `source code, tokens`, `both a and b`], a: 2, why: `L2.` },
          { type: `mcq`, q: `………… is not a phase of a compiler`, o: [`Scanner`, `Symbol table`, `Parser`, `Code optimizer`], a: 1, why: `L1.` },
          { type: `mcq`, q: `What does a syntax analyzer do?`, o: [`maintain symbol table`, `collect data types`, `create parsing tree`, `none of the mentioned`], a: 2, why: `L4; sheet Q27.` },
          { type: `mcq`, q: `One or more parse tree for some sentence, that is ………grammar.`, o: [`unambiguous`, `ambiguous`, `a or b`, `none of the mentioned`], a: 1, why: `Revision sheet Q28 key: ambiguous (the intended meaning is "more than one").` },
          { type: `mcq`, q: `A compiler needs …….. types of storage`, o: [`two`, `three`, `four`, `five`], a: 1, why: `Static, stack, heap (L9).` },
          { type: `mcq`, q: `Grammar of the programming is checked at ……… phase of compiler.`, o: [`Syntax analysis`, `Semantic analysis`, `Code generation`, `Code optimization`], a: 0, why: `L4.` }
        ]},
        { title: `Q1-II · True or False`, marks: `10 marks · 1 each`, items: [
          { type: `tf`, q: `Derivation can only be started with the start symbol of the context free grammar.`, a: 0, why: `Strings are derived from the start symbol (L4).` },
          { type: `tf`, q: `Any loop causes the automaton to be nondeterministic.`, a: 1, why: `Only a loop followed by a transition on the SAME symbol does; DFAs can have loops (L3).` },
          { type: `tf`, q: `Testing is not a phase of compilers.`, a: 0, why: `L1.` },
          { type: `tf`, q: `The expression aε = εa = ε.`, a: 1, why: `aε = εa = a; ε is the neutral element for concatenation (L2).` },
          { type: `tf`, q: `A leftmost parsing tree grows from the right hand side.`, a: 0, why: `Matches the doctor's revision-sheet key (Q52: right).` },
          { type: `tf`, q: `Interpreters generate intermediate code.`, a: 1, why: `Interpreters generate no intermediate object code (L1).` },
          { type: `tf`, q: `Synthesized attributes are attributes that get values from the attribute values of their child.`, a: 0, why: `L7.` },
          { type: `tf`, q: `A compiler indicates the syntax and runtime errors.`, a: 1, why: `A compiler reports syntax errors; runtime errors appear only during execution (revision sheet Q29 key: syntax only).` },
          { type: `tf`, q: `Compilers take long time to execute source code.`, a: 1, why: `Compilers take long to ANALYZE, but execution is faster (L1; sheet T/F 2 = False).` },
          { type: `tf`, q: `Order is not important in concatenation operation of two alphabets.`, a: 1, why: `L1L2 ≠ L2L1 (L2).` }
        ]},
        { title: `Q2 · Written`, marks: `30 marks · 6 each`, items: [
          { type: `written`, q: `a) Show by figure the phases of the compiler.`, ans: `<pre>Source code
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
Target code</pre>`, why: `L1 figure. Show the six phases, the data passed between them, and the three shared components.` },
          { type: `written`, q: `b) Propose an optimized version of the following loop with explanation:<pre>for (i=0; i &lt; a→length-1 ; i++)
   swap_elements(a[i],a[i+1]);</pre>`, ans: `<pre>int x = a→length-1;
for (i=0; i &lt; x ; i++)
   swap_elements(a[i],a[i+1]);</pre>Instead of computing length-1 on every iteration, store it once in x and use x as the terminating condition. length-1 is then evaluated only once, which saves processing and time (loop optimization).`, why: `Revision sheet essay Q4; the same idea as the slide's arr.length → size example (L9).` },
          { type: `written`, q: `c) Convert the following NFA into DFA. NFA: start 1, final 3; 1 –0→ 3; 3 –0→ 1; 3 –1→ 3 (loop); 3 –1→ 2; 2 –0→ 3.`, ans: `Table with ε:<table><tr><th>State</th><th>0</th><th>1</th><th>ε</th></tr><tr><td>1</td><td>3</td><td>-</td><td>1</td></tr><tr><td>2</td><td>3</td><td>-</td><td>2</td></tr><tr><td>3</td><td>1</td><td>2,3</td><td>3</td></tr></table>DFA:<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>- (dead)</td></tr><tr><td>* {3}</td><td>{1}</td><td>{2,3}</td></tr><tr><td>* {2,3}</td><td>{1,3}</td><td>{2,3}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2,3}</td></tr></table>Start {1}; final states: every set containing 3.<br>It is non-deterministic because state 3 has a loop on 1 and another transition on the same symbol 1 (to 2).`, why: `The same NFA and answer appear in the revision sheet (Q11) and the midterm sheet.` },
          { type: `written`, q: `d) Draw a finite automaton for each of the following two regular expressions: b*a+(c|d) and (a|b)*(c+|d+).`, ans: `<b>b*a+(c|d)</b>: q0 (start, loop b) –a→ q1 (loop a); q1 –c→ q2; q1 –d→ q2; q2 final.<br><b>(a|b)*(c+|d+)</b>: q0 (start, loop a,b) –c→ q1 (final, loop c); q0 –d→ q2 (final, loop d).`, why: `b* = loop at the start; a+ = one a to enter q1 plus a loop; then exactly one of c or d. For the second, one or more c's OR one or more d's need separate final states so they can't mix (revision sheet Q7).` },
          { type: `written`, q: `e) Consider the grammar E → E + E | E-E | id. Prove that the grammar is ambiguous using leftmost derivations and parsing trees on the string id-id+id.`, ans: `<pre>LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id
LMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id

Tree 1:       E                Tree 2:     E
            / | \                        / | \
           E  +  E                      E  -  E
         / | \   |                      |   / | \
        E  -  E  id                     id E  +  E
        |     |                            |     |
        id    id                           id    id</pre>Two leftmost derivations (two parse trees) for the same string, so the grammar is ambiguous.`, why: `Tree 1 computes (id-id)+id; tree 2 computes id-(id+id).` }
        ]}
      ]
    },
    {
      title: `Final Exam Summer 2025 (60 marks)`,
      meta: `CS321 Compiler Design and Theory · Summer term 2024/2025 · 2 hours · 60 marks · Dr. Lamia Hassaan, Dr. Ahmed Ibrahim`,
      note: `No official answer key. Solved from the lectures and the revision sheet. The Q2-b NFA is the same as in the 2024/25 (50) paper (the small scan was checked against it).`,
      sections: [
        { title: `Q1-I · Choose the correct answer`, marks: `10 marks · 1 each`, items: [
          { type: `mcq`, q: `A compiler indicates the ………error.`, o: [`syntax`, `logic`, `runtime`, `all of the mentioned`], a: 0, why: `Revision sheet Q29 key: syntax.` },
          { type: `mcq`, q: `Parsing is also called………analysis`, o: [`semantic`, `lexical`, `syntax`, `none of the mentioned`], a: 2, why: `L4.` },
          { type: `mcq`, q: `Keywords are recognized in a compiler during…………`, o: [`code generation`, `data flow analysis`, `lexical analysis`, `program parsing`], a: 2, why: `Keywords are tokens (L2).` },
          { type: `mcq`, q: `Symbol table can be used for……………`, o: [`storage allocation`, `code execution`, `context free grammar`, `none`], a: 0, why: `Revision sheet Q10: storage allocation, type checking, suppressing duplicate errors. Only storage allocation appears here.` },
          { type: `mcq`, q: `Grammar of the programming is checked at ………… phase of compiler.`, o: [`syntax analysis`, `semantic analysis`, `code generation`, `code optimization`], a: 0, why: `L4.` },
          { type: `mcq`, q: `The following is not a phase of a compiler`, o: [`syntax analysis`, `semantic analysis`, `testing`, `optimization`], a: 2, why: `L1.` },
          { type: `mcq`, q: `Non-leaf nodes of a syntax tree represent…….`, o: [`nonterminal symbols`, `terminal symbols`, `start symbols`, `none`], a: 0, why: `Interior nodes are non-terminals (L4).` },
          { type: `mcq`, q: `The automaton with ε symbol is said to be……`, o: [`DFA`, `NFA`, `FFA`, `none`], a: 1, why: `L3.` },
          { type: `mcq`, q: `A compiler needs …….. types of storage`, o: [`two`, `three`, `four`, `five`], a: 1, why: `Static, stack, heap (L9).` },
          { type: `mcq`, q: `The following is not a method of optimization`, o: [`constant folding`, `combine operations`, `a and b`, `annotated syntax tree`], a: 3, why: `Constant folding and combine operations are peephole techniques (L9).` }
        ]},
        { title: `Q1-II · True or False`, marks: `10 marks · 1 each`, items: [
          { type: `tf`, q: `The expression Yε ≠ εY.`, a: 1, why: `Yε = εY = Y (L2 algebraic properties).` },
          { type: `tf`, q: `Leftmost derivation is the inverse of rightmost derivation.`, a: 1, why: `They differ only in which non-terminal is replaced first; neither is the inverse of the other. Bottom-up parsers produce a rightmost derivation IN REVERSE (L4).` },
          { type: `tf`, q: `The problem of using a symbol table per scope is memory overhead.`, a: 0, why: `L8.` },
          { type: `tf`, q: `The regular expressions (a)|((b)*(c)) and b*c | a are equivalent.`, a: 0, why: `The parentheses are redundant and | is commutative (L2).` },
          { type: `tf`, q: `Conversion of NFA into DFA is possible.`, a: 0, why: `Subset construction (L3).` },
          { type: `tf`, q: `Derivation must be started by the start symbol of the context free grammar.`, a: 0, why: `L4.` },
          { type: `tf`, q: `Interpreters generate intermediate code.`, a: 1, why: `L1.` },
          { type: `tf`, q: `Inherited attributes get their attribute values from parent nodes.`, a: 0, why: `Parent and/or siblings (L7; sheet Q42).` },
          { type: `tf`, q: `Epsilon transition causes a change of the regular expression accepted by an automaton.`, a: 1, why: `ε is the empty string; it consumes no input and sε = s, so it does not change the accepted expression. (Our answer; no key.)` },
          { type: `tf`, q: `Regular expression a|b denotes the set {a, b}.`, a: 0, why: `L2.` }
        ]},
        { title: `Q2 · Written`, marks: `40 marks · 8 each`, items: [
          { type: `written`, q: `a) Show by figure only the phases of a compiler.`, ans: `Source code → <b>Scanner</b> → tokens → <b>Parser</b> → syntax tree → <b>Semantic analyzer</b> → annotated tree → <b>Source code optimizer</b> → intermediate code → <b>Code generator</b> → target code → <b>Target code optimizer</b> → target code. All phases connect to the literal table, the symbol table and the error handler.`, why: `L1 figure (see the 2024/25 (50) paper for the drawing).` },
          { type: `written`, q: `b) Convert the following NFA into its equivalent DFA. (Start 1, final 3; 1 –0→ 3; 3 –0→ 1; 3 –1→ 3; 3 –1→ 2; 2 –0→ 3.)`, ans: `<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>-</td></tr><tr><td>* {3}</td><td>{1}</td><td>{2,3}</td></tr><tr><td>* {2,3}</td><td>{1,3}</td><td>{2,3}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2,3}</td></tr></table>Final states: all sets containing 3.`, why: `Identical to the 2024/25 (50) Q2-c and revision sheet Q11.` },
          { type: `written`, q: `c) State the output of the program when parameters are passed by value and by result.<pre>int a[ ]={10,20,30};
int i=2;
void my_function(int j, int x)
{  j:=j+1;
   x:=x+3;
   a[2]:=0;
   cout&lt;&lt;j; cout&lt;&lt;x; cout&lt;&lt;a[0]; cout&lt;&lt;a[1]; cout&lt;&lt;a[2];
}
void main()
{  cout&lt;&lt; i; cout&lt;&lt;a[0]; cout&lt;&lt;a[1]; cout&lt;&lt;a[2];
   my_function (i, a[i]);
   cout&lt;&lt; i; cout&lt;&lt;a[0]; cout&lt;&lt;a[1]; cout&lt;&lt;a[2];
}</pre>`, ans: `<table><tr><th></th><th>By value</th><th>By result</th></tr><tr><td>Before call</td><td>2 10 20 30</td><td>2 10 20 30</td></tr><tr><td>Inside</td><td>j=2→3, x=30→33<br>3 33 10 20 0</td><td>j=0→1, x=0→3<br>1 3 10 20 0</td></tr><tr><td>After call</td><td>2 10 20 0</td><td>1 10 20 3<br>(i ← j = 1, a[2] ← x = 3)</td></tr></table>`, why: `By value: copies go in and nothing comes back, but a[2]:=0 changes the global array. By result: no value goes in (formals start at 0, as in the lecture's example), and at return j is copied to i and x to a[2] (the address fixed at the call, i = 2), overwriting the 0. The revision sheet Q12 gives the same outputs.` },
          { type: `written`, q: `d) Propose an optimized version of the following loop with explanation: for (i=0; i &lt; a→length-1 ; i++) swap_elements(a[i],a[i+1]);`, ans: `<pre>int x = a→length-1;
for (i=0; i &lt; x ; i++)
   swap_elements(a[i],a[i+1]);</pre>length-1 is computed once instead of on every iteration, which saves processing time.`, why: `Loop optimization (L9; revision sheet Q4).` },
          { type: `written`, q: `e) Consider the grammar E → E + E | E-E | id. Prove that the grammar is ambiguous using leftmost derivations and parsing trees on the string id-id+id.`, ans: `LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id (root +).<br>LMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id (root -).<br>Two different leftmost derivations/parse trees, so the grammar is ambiguous (trees drawn in the 2024/25 (50) answer).`, why: `L4.` }
        ]}
      ]
    },
    {
      title: `Final Exam 2023/2024 (60 marks)`,
      meta: `CS321 Compiler Design and Theory · 1st term · 2 hours · 60 marks · Dr. Lamia Hassaan, Dr. Ahmed Ibrahim`,
      note: `No official key. The student marks on the scan are mostly consistent with the revision sheet, but Q1-I-8 is marked "Dynamic binding", which is wrong (static).`,
      sections: [
        { title: `Q1-I · Choose the correct answer`, marks: `10 marks`, items: [
          { type: `mcq`, q: `……… is the input to semantic analysis phase`, o: [`stream of tokens`, `syntax tree`, `annotated syntax tree`, `assembly code`], a: 1, why: `L1 phase chain.` },
          { type: `mcq`, q: `The lexical analyzer takes …… as input and produces a list of …… as output`, o: [`Machine code, tokens`, `Tokens, source code`, `Source code, tokens`, `Both a and b`], a: 2, why: `L2.` },
          { type: `mcq`, q: `When only one rightmost parsing tree is produced for some sentence, that is ………grammar.`, o: [`ambiguous`, `unambiguous`, `a or b`, `None of the mentioned`], a: 1, why: `L4.` },
          { type: `mcq`, q: `Which part of the compiler highly used the grammar concept?`, o: [`Code optimization`, `Code generation`, `Lexical analysis`, `Parser`], a: 3, why: `The parser works from the CFG (sheet Q17).` },
          { type: `mcq`, q: `Interior nodes of a parsing tree indicate ………. of a context free grammar`, o: [`non-terminal symbols`, `terminal symbols`, `start symbol`, `production rules`], a: 0, why: `L4.` },
          { type: `mcq`, q: `A compiler indicates the ……… error.`, o: [`logic`, `runtime`, `syntax`, `b & c`], a: 2, why: `Sheet Q29.` },
          { type: `mcq`, q: `A leftmost parsing tree grows from the ……. side`, o: [`left`, `equal sides`, `right`, `the side cannot be determined`], a: 2, why: `Revision sheet Q52 key.` },
          { type: `mcq`, q: `…… is done based on the structure of the parsing tree such as braces`, o: [`Static binding`, `Dynamic binding`, `All types of binding`, `none of the mentioned`], a: 0, why: `Static binding follows the syntax-tree structure (L8; sheet Q45). The pencil mark on (b) is wrong.` },
          { type: `mcq`, q: `SDT is an abbreviation of ………`, o: [`Semantic Directed Translation`, `Syntax Directed Translation`, `Syntax Double Translation`, `Semantic Directed Table`], a: 1, why: `L7.` },
          { type: `mcq`, q: `A phase of the compiler that aims at minimizing memory usage and maximizing speed of processing is…`, o: [`code optimization`, `syntax analysis`, `semantic analysis`, `none of the mentioned`], a: 0, why: `L1, L9.` }
        ]},
        { title: `Q1-II · True or False`, marks: `10 marks`, items: [
          { type: `tf`, q: `Derivation can only be started with the start symbol of the context free grammar.`, a: 0, why: `L4.` },
          { type: `tf`, q: `(X | Y)* is equivalent to X* | Y*.`, a: 1, why: `L2.` },
          { type: `tf`, q: `Symbol table is a phase of a compiler.`, a: 1, why: `It is a data structure used by the phases (L1).` },
          { type: `tf`, q: `A DFA may contain a loop or more.`, a: 0, why: `L2/L3 (e.g. the DFA for 1*01(0|1)*).` },
          { type: `tf`, q: `Code optimization is applied on assembly code and source code.`, a: 0, why: `Source code optimizer + target code optimizer (L1).` },
          { type: `tf`, q: `LL(1) can be applied on left recursive context free grammar.`, a: 1, why: `Left recursion causes an infinite loop in top-down parsers; remove it first (L5–6).` },
          { type: `tf`, q: `Tokens are generated by syntax analysis.`, a: 1, why: `By lexical analysis (L2).` },
          { type: `tf`, q: `Peephole optimization is a type of code optimization performed on a small part of the code called "window".`, a: 0, why: `L9.` },
          { type: `tf`, q: `Semantic analysis produces semantic table.`, a: 1, why: `It produces the annotated syntax tree (L1, L7).` },
          { type: `tf`, q: `Attributes that get their values from parent nodes are called synthesized attributes.`, a: 1, why: `Those are inherited; synthesized come from the children (L7).` }
        ]},
        { title: `Q2 · Written`, marks: `40 marks`, items: [
          { type: `written`, q: `a) What is the purpose of the (SDT) process? (4 marks)`, ans: `SDT adds augmented (translation) rules to the grammar to facilitate semantic analysis. It passes information bottom-up and/or top-down the parse tree as attributes attached to the nodes, using lexical values, constants and attributes. It builds the parse/syntax tree and computes the attribute values at the nodes by visiting them in some order, producing the annotated syntax tree. In general, SDT associates a set of attributes with every grammar node and a set of translation rules with every production.`, why: `L7; revision sheet Q13.` },
          { type: `written`, q: `b) Show the printed output in cases of static and dynamic binding environments. (8 marks)<pre>void main() {
   int a = 10;
   int b = 20;
   {
      int a = 30;
      b *= a;
      cout&lt;&lt;b;
   }
   b += a;
   cout&lt;&lt; b;
}</pre>`, ans: `<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Inner block: b = 20 × 30</td><td>600</td><td>600</td></tr><tr><td>After block: b += a</td><td>600 + 10 = <b>610</b> (outer a)</td><td>600 + 30 = <b>630</b> (most recent a)</td></tr><tr><td>Output</td><td>600 610</td><td>600 630</td></tr></table>`, why: `Static: after the closing brace, the inner a is out of scope, so the outer a = 10 is used. Dynamic (course convention, lecture 8 example): the most recently encountered declaration (a = 30) is still used.` },
          { type: `written`, q: `c) Consider the grammar E → E + E | E-E | id. Prove that it is ambiguous using leftmost derivations and parsing trees on id-id+id. (8 marks)`, ans: `LMD 1: E ⇒ E+E ⇒ E-E+E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id<br>LMD 2: E ⇒ E-E ⇒ id-E ⇒ id-E+E ⇒ id-id+E ⇒ id-id+id<br>Tree 1 has + at the root with (id-id) on the left; tree 2 has - at the root with (id+id) on the right. Two trees, so the grammar is ambiguous.`, why: `L4.` },
          { type: `written`, q: `d) Transform the following NFA into its equivalent DFA. (8 marks) NFA: start 0, final 3; 0 –b→ 2; 0 –a→ 1; 2 –a→ 2 (loop); 2 –a→ 3; 1 –b→ 3.`, ans: `<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→ {0}</td><td>{1}</td><td>{2}</td></tr><tr><td>{1}</td><td>-</td><td>{3}</td></tr><tr><td>{2}</td><td>{2,3}</td><td>-</td></tr><tr><td>* {2,3}</td><td>{2,3}</td><td>-</td></tr><tr><td>* {3}</td><td>-</td><td>-</td></tr></table>Final states: {3} and {2,3}. The DFA accepts ab | ba+.<br>It is an NFA because state 2 has a loop on a and another transition on a (to 3).`, why: `{2} on a goes to both 2 and 3, giving {2,3}; from {2,3}, a gives 2 → {2,3} and 3 → nothing. Missing transitions go to a dead state.` },
          { type: `written`, q: `e) Given S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε. Construct its LL(1) predictive parser, then give the parsing actions for the input string (dc)ac. (12 marks)`, ans: `Same grammar and string as the 2024/25 (60) Q1-e.<br>FIRST: S = U = {(, a, d}; V = {a, ε}; W = {c, ε}.<br>FOLLOW: S = {$, ), b}; U = {a, c, $, ), b}; V = {c, $, ), b}; W = {$, ), b}.<br>Table: M[S,(]=M[S,a]=M[S,d] = S→UVW; M[U,(]=U→(S); M[U,a]=U→aSb; M[U,d]=U→d; M[V,a]=V→aV; M[V,c|b|)|$]=V→ε; M[W,c]=W→cW; M[W,b|)|$]=W→ε.<br>Actions: S→UVW, U→(S), match (, S→UVW, U→d, match d, V→ε, W→cW, match c, W→ε, match ), V→aV, match a, V→ε, W→cW, match c, W→ε, accept.`, why: `See the full stack/input table in the 2024/25 (60) paper.` }
        ]}
      ]
    },
    {
      title: `Final Exam 2023/2024 (50 marks)`,
      meta: `CS309 Compiler Theory · 1st term · 2 hours · 50 marks · Dr. Lamia Hassaan, Dr. Ahmed Ibrahim`,
      note: `No official key. Solved from the lectures. T/F 6 ("a rightmost parsing tree grows from the left side") is not covered directly by the lectures; the answer follows the revision-sheet convention (leftmost grows from the right).`,
      sections: [
        { title: `Q1-I · Choose the correct answer`, marks: `10 marks`, items: [
          { type: `mcq`, q: `Code optimization is done twice on …… code and ……. code within the phases of a compiler.`, o: [`source, machine`, `source, assembly`, `assembly, machine`, `source, binary`], a: 1, why: `Source code optimizer and target code optimizer; the lecture's target code is assembly (MOV, MUL…) (L1).` },
          { type: `mcq`, q: `The following is not a part of a context free grammar:`, o: [`start symbol`, `non-terminal symbols`, `end symbol`, `terminal symbols`], a: 2, why: `L4.` },
          { type: `mcq`, q: `Keywords are recognized in a compiler during……….`, o: [`code generation`, `lexical analysis`, `semantic analysis`, `derivation`], a: 1, why: `L2.` },
          { type: `mcq`, q: `The following is not one of the phases of the compiler:`, o: [`Syntax analysis`, `Semantic analysis`, `Symbol Table`, `Lexical analysis`], a: 2, why: `L1.` },
          { type: `mcq`, q: `Leaf nodes of a parsing tree indicate………. of a context free grammar`, o: [`non-terminal symbols`, `terminal symbols`, `start symbol`, `production rules`], a: 1, why: `L4.` },
          { type: `mcq`, q: `A compiler does not indicate the ………error.`, o: [`syntax`, `logic`, `runtime`, `b & c`], a: 3, why: `A compiler indicates syntax errors only; logic and runtime errors show up at execution.` },
          { type: `mcq`, q: `When only one leftmost parsing tree is produced for some sentence, that is ………grammar.`, o: [`ambiguous`, `unambiguous`, `a or b`, `None of the mentioned`], a: 1, why: `L4.` },
          { type: `mcq`, q: `Semantic analysis uses …….. grammar in order to transform …….. tree into ……… tree`, o: [`context free, syntax, annotated syntax`, `attribute, semantic, syntax`, `attribute, syntax, annotated syntax`, `context free, syntax, semantic`], a: 2, why: `L7.` },
          { type: `mcq`, q: `……………. is the input to syntax analysis phase`, o: [`stream of tokens`, `syntax tree`, `annotated syntax tree`, `assembly code`], a: 0, why: `L1.` },
          { type: `mcq`, q: `A compiler uses stack memory allocation for the following:`, o: [`static allocation of objects`, `procedures & functions calling`, `allocation of the code itself`, `a & b`], a: 1, why: `L9.` }
        ]},
        { title: `Q1-II · True or False`, marks: `10 marks`, items: [
          { type: `tf`, q: `Static object binding is done based on the structure of the parsing tree such as braces.`, a: 0, why: `L8.` },
          { type: `tf`, q: `Any NFA must contain a loop.`, a: 1, why: `An ε transition alone makes an NFA (L3).` },
          { type: `tf`, q: `Union operation is one of the operations done on alphabets where order of the produced elements is important.`, a: 1, why: `Union is commutative: L1 ∪ L2 = L2 ∪ L1 (L2).` },
          { type: `tf`, q: `Any automaton must have only one accept state.`, a: 1, why: `Automata may have several accept states (e.g. the DFA from the NFA conversions).` },
          { type: `tf`, q: `Code optimization is applied immediately after semantic analysis.`, a: 0, why: `"The earliest point of most optimization steps is just after semantic analysis" (L1).` },
          { type: `tf`, q: `A rightmost parsing tree grows from the left side.`, a: 0, why: `This is the mirror of the revision-sheet key "a leftmost parsing tree grows from the right side". Not stated directly in the lectures.` },
          { type: `tf`, q: `Constant folding is the only technique of code optimization.`, a: 1, why: `Also redundant load/store elimination, combine operations and loop optimization (L9).` },
          { type: `tf`, q: `Compiler uses fixed size and dynamic size storages as a part of its runtime environment.`, a: 0, why: `Static (fixed) plus stack and heap (grow and shrink) (L9).` },
          { type: `tf`, q: `SDT is an abbreviation of Semantic Directed Translation.`, a: 1, why: `Syntax Directed Translation (L7).` },
          { type: `tf`, q: `Attributes that get their values from child nodes are called synthesized attributes.`, a: 0, why: `L7.` }
        ]},
        { title: `Q2 · Written`, marks: `30 marks · 6 each`, items: [
          { type: `written`, q: `a) Differentiate between compilers and interpreters.`, ans: `<table><tr><th>Interpreter</th><th>Compiler</th></tr><tr><td>Translates one statement at a time</td><td>Scans the entire program and translates it as a whole</td></tr><tr><td>Less analysis time, slower overall execution</td><td>More analysis time, faster overall execution</td></tr><tr><td>No intermediate object code, so memory efficient</td><td>Generates intermediate object code that needs linking, so more memory</td></tr><tr><td>JavaScript, Python, Ruby</td><td>C, C++, Java</td></tr></table>`, why: `L1 table.` },
          { type: `written`, q: `b) Consider S → 0A | 1B, A → 0AA | 1S | 1, B → 1BB | 0S | 0. Use leftmost derivations and parsing trees to prove its ambiguity using the string 001101.`, ans: `<pre>LMD 1: S ⇒ 0A ⇒ 00AA ⇒ 001SA ⇒ 0011BA ⇒ 00110A ⇒ 001101
LMD 2: S ⇒ 0A ⇒ 00AA ⇒ 001A  ⇒ 0011S  ⇒ 00110A ⇒ 001101

Tree 1:  S                    Tree 2:  S
        / \                           / \
       0   A                         0   A
         / | \                         / | \
        0  A  A                       0  A  A
          / \  \                         |  / \
         1   S  1                        1 1   S
            / \                               / \
           1   B                             0   A
               |                                 |
               0                                 1</pre>Two different leftmost derivations/parse trees, so the grammar is ambiguous.`, why: `In tree 1 the first A → 1S and the second A → 1. In tree 2 the first A → 1 and the second A → 1S. Revision sheet essay Q2 uses the same derivations.` },
          { type: `written`, q: `c) Transform the following NFA into its equivalent DFA. NFA: start S (loop on 0), final R; S –0→ R; R –0→ S; R –1→ R (loop); R –1→ M; M –0→ R.`, ans: `<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {S}</td><td>{S,R}</td><td>- (dead)</td></tr><tr><td>* {S,R}</td><td>{S,R}</td><td>{R,M}</td></tr><tr><td>* {R,M}</td><td>{S,R}</td><td>{R,M}</td></tr></table>Start {S}; final states {S,R} and {R,M} (they contain R).`, why: `{S} on 0: the S loop and S → R give {S,R}. {S,R} on 0: S gives {S,R} and R gives S, so {S,R}; on 1: R gives {R,M}. {R,M} on 0: R → S and M → R, so {S,R}; on 1: {R,M}.` },
          { type: `written`, q: `d) State the output in both static and dynamic binding, and propose (with reasons) optimizations to the code.<pre>void main()
{  double d; string s[10];
   int result;
   int x = 1;   int y = 2;
   {
      int x = 3*2;
      result = (2+3) * sqrt(2*8);
      y += x;
      cout&lt;&lt;"x= "&lt;&lt;x&lt;&lt;"y= "&lt;&lt;y;
   }
   y += x;
   cout&lt;&lt;"x= "&lt;&lt;x&lt;&lt;"y= "&lt;&lt;y;
}</pre>`, ans: `<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Inner block (x = 6, y = 2+6)</td><td>x= 6 y= 8</td><td>x= 6 y= 8</td></tr><tr><td>After block</td><td>x= 1 y= 9</td><td>x= 6 y= 14</td></tr></table><b>Optimizations</b>:<br>1) <b>Constant folding</b>: <code>int x = 3*2</code> → <code>int x = 6</code>; <code>result = (2+3)*sqrt(2*8)</code> → <code>result = 5*sqrt(16)</code> → <code>result = 20</code>. Computed once at compile time.<br>2) <b>Combine operations</b>: the whole expression becomes one constant assignment.<br>3) <b>Dead code elimination</b>: d, s[10] (and result, which is never used) can be removed to save memory.`, why: `Static: after the block, the outer x = 1 is visible again, so y = 8 + 1 = 9. Dynamic (course convention): the most recent x = 6 is used, so y = 8 + 6 = 14 and x prints as 6.` },
          { type: `written`, q: `e) Consider S → aABe, A → Abc | b, B → d. Apply LL(1) parsing to prove the correctness of the string abbcde.`, ans: `Remove left recursion: S → aABe, A → bA', A' → bcA' | ε, B → d.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{a}</td><td>{$}</td></tr><tr><td>A</td><td>{b}</td><td>{d}</td></tr><tr><td>A'</td><td>{b, ε}</td><td>{d}</td></tr><tr><td>B</td><td>{d}</td><td>{e}</td></tr></table>Table: M[S,a] = S→aABe; M[A,b] = A→bA'; M[A',b] = A'→bcA'; M[A',d] = A'→ε; M[B,d] = B→d.<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>abbcde$</td><td>S→aABe</td></tr><tr><td>aABe$</td><td>abbcde$</td><td>match a</td></tr><tr><td>ABe$</td><td>bbcde$</td><td>A→bA'</td></tr><tr><td>bA'Be$</td><td>bbcde$</td><td>match b</td></tr><tr><td>A'Be$</td><td>bcde$</td><td>A'→bcA'</td></tr><tr><td>bcA'Be$</td><td>bcde$</td><td>match b</td></tr><tr><td>cA'Be$</td><td>cde$</td><td>match c</td></tr><tr><td>A'Be$</td><td>de$</td><td>A'→ε</td></tr><tr><td>Be$</td><td>de$</td><td>B→d</td></tr><tr><td>de$</td><td>de$</td><td>match d</td></tr><tr><td>e$</td><td>e$</td><td>match e</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>The string is accepted, so it is correct.`, why: `A → Abc | b is left-recursive, so it must be transformed first. FOLLOW(A) = FIRST(B) = {d}, FOLLOW(A') = FOLLOW(A), FOLLOW(B) = {e}.` }
        ]}
      ]
    }
  ]
};

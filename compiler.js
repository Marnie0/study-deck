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
          [`Scanner`, `The scanner is phase 1 (lexical analysis): it turns the source code into tokens, so it is a real phase.`],
          [`Symbol table`, `Correct. The symbol table is a data structure used BY all phases, not a phase.`],
          [`Parser`, `The parser is phase 2 (syntax analysis): it turns tokens into the syntax tree, so it is a real phase.`],
          [`Code optimizer`, `Source and target code optimizers are phases.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `The following is not a phase of a compiler:`, o: [
          [`syntax analysis`, `Syntax analysis (the parser) is phase 2 in the lecture figure: tokens in, syntax tree out.`],
          [`semantic analysis`, `Semantic analysis is phase 3: it type-checks the syntax tree and outputs the annotated tree.`],
          [`testing`, `Correct. Testing is a software-engineering activity, not a compiler phase.`],
          [`optimization`, `Optimization is a phase, done twice in the figure: the source code optimizer (phase 4) and the target code optimizer (phase 6).`]
        ], a: 2, src: `Exam Summer 2025` },
        { q: `Which of the following is NOT a characteristic of the compiler?`, o: [
          [`More execution time`, `Correct. Compiled programs execute FASTER; interpreters have more execution time.`],
          [`Debugging process is slow`, `True of compilers: errors appear only after the whole program is analyzed.`],
          [`Execution takes place after removal of all syntax errors`, `This is true of compilers: the whole program is analyzed first, and it can only run once it compiles without syntax errors.`],
          [`It scans the entire program then transforms it into machine code`, `This is true: the lecture table says a compiler scans the entire program and translates it as a whole into machine code.`]
        ], a: 0, src: `Final revision sheet` },
        { q: `Compiler translates the source code to:`, o: [
          [`Machine code`, `Machine code is right, but so is binary code (machine code is binary), so the full answer is "both a and c".`],
          [`Executable code`, `The lecture says the compiler produces low-level machine language; it outputs object code that still needs linking to become executable.`],
          [`Binary code`, `Binary code is right, but machine code is the same thing in the lecture's definition, so the full answer is "both a and c".`],
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
          [`semantic analysis`, `Both compilers and interpreters must check meaning and types, so semantic analysis does not separate them.`],
          [`none of the mentioned`, `There is a difference: the lecture table says compilers generate intermediate object code and interpreters do not.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `Annotated syntax tree is the input to the ……… phase.`, o: [
          [`syntax analysis`, `Syntax analysis takes tokens from the scanner and produces the plain syntax tree, not the annotated one.`],
          [`code optimization`, `Correct. The semantic analyzer outputs the annotated tree, and the source code optimizer takes it.`],
          [`semantic analysis`, `Semantic analysis PRODUCES the annotated tree; its input is the syntax tree.`],
          [`derivation`, `Derivation is a parsing idea (rewriting with grammar rules), not one of the six compiler phases.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `……… is the input to the semantic analysis phase.`, o: [
          [`stream of tokens`, `The stream of tokens is the scanner's output and the parser's (syntax analysis) input.`],
          [`syntax tree`, `Correct. The parser outputs the syntax tree, and the semantic analyzer takes it and adds attributes such as types (L1, Phases of a compiler).`],
          [`annotated syntax tree`, `The annotated syntax tree is the semantic analyzer's output; it then goes to the source code optimizer.`],
          [`assembly code`, `Assembly (target) code comes out of the code generator near the end, long after semantic analysis.`]
        ], a: 1, src: `Exam 2023/24 (60)` },
        { q: `A phase of the compiler that aims at minimizing memory usage and maximizing speed of processing is:`, o: [
          [`code optimization`, `Correct. The optimizers (source code and target code) improve the code so it runs faster and uses less memory, e.g. constant folding 4+2 → 6 and MUL → SHL (L1, Source/Target code optimizer).`],
          [`syntax analysis`, `Syntax analysis only determines the program's structure (parse tree or syntax tree); it does not improve the code.`],
          [`semantic analysis`, `Semantic analysis checks meaning (declarations and type checking); it does not make the code faster or smaller.`],
          [`none of the mentioned`, `Code optimization is exactly the phase that aims at speed and memory, so "none" is wrong.`]
        ], a: 0, src: `Exam 2023/24 (60)` },
        { q: `Code optimization is done twice, on ……… code and ……… code within the phases of a compiler.`, o: [
          [`source, machine`, `The second optimizer works on the generated target (assembly) code in the lecture example.`],
          [`source, assembly`, `Correct. Source code optimizer + target code optimizer (the target code is assembly: MOV, MUL...).`],
          [`assembly, machine`, `The first optimizer works on source/intermediate code.`],
          [`source, binary`, `The lecture's second optimizer works on the target code shown as assembly (MOV, MUL, SHL), not on binary code.`]
        ], a: 1, src: `Exam 2023/24 (50)` },
        { q: `In the target code optimizer example, MUL R0,2 is replaced with:`, o: [
          [`ADD R0,R0`, `ADD R0,R0 would also double R0, but the slide's optimized code uses SHL R0 (shift left), not ADD.`],
          [`SHL R0`, `Correct. Multiplying by 2 = shift left by one bit (instruction replacement).`],
          [`MOV R0,2`, `MOV R0,2 would overwrite the index with 2 instead of doubling it, so it changes the program's meaning.`],
          [`Nothing, it is removed`, `The index still has to be multiplied by 2 (integer size) to get the address, so the instruction is replaced by SHL, not dropped.`]
        ], a: 1 },
        { q: `Which data structure needs constant-time access and is usually implemented with hash tables?`, o: [
          [`Literal table`, `Needs quick insert/lookup too, but the slide names hashing for the symbol table.`],
          [`Symbol table`, `Correct. The symbol table's access operations need to be constant-time, so one or several hash tables are often used (L1, Principal data structures).`],
          [`Syntax tree`, `The syntax tree is a standard pointer-based structure built by the parser, not a hash table.`],
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
          [`tokens, source code`, `This is reversed: the scanner reads source characters and outputs tokens, which the parser then uses.`],
          [`source code, tokens`, `Correct. The lexical analyzer reads the input characters of the source program and produces a sequence of tokens for the parser (L2, What is lexical analysis).`],
          [`a and b`, `Option b is reversed (tokens are the output, not the input), so "a and b" cannot be right; only c is.`]
        ], a: 2, src: `Exam 2024/25 (60)` },
        { q: `The process of generating (searching for matched) tokens is typically described using:`, o: [
          [`finite automata`, `Finite automata recognize tokens, but tokens are specified by regular expressions, so the full answer is "a and b".`],
          [`regular expressions`, `Regular expressions specify tokens, but finite automata are what recognize (match) them, so the full answer is "a and b".`],
          [`syntax directed translation`, `Syntax-directed translation belongs to semantic analysis, which works on the parse tree, not on matching tokens.`],
          [`a and b`, `Correct. Regular expressions specify tokens and finite automata recognize them.`]
        ], a: 3, src: `Exam 2024/25 (60)` },
        { q: `Keywords are recognized in a compiler during:`, o: [
          [`code generation`, `Code generation is phase 5; by then keywords have long been turned into tokens by the scanner.`],
          [`data flow analysis`, `Data flow analysis is an optimization technique, not where keywords are recognized; that happens in scanning.`],
          [`lexical analysis`, `Correct. Keywords such as if, then and for are tokens, and the scanner recognizes them while grouping characters into tokens (L2, What is lexical analysis).`],
          [`program parsing`, `The parser receives keywords already recognized as tokens.`]
        ], a: 2, src: `Exam Summer 2025` },
        { q: `Lexical analysis is about breaking a sequence of characters into:`, o: [
          [`Tokens`, `Correct. Lexical analysis collects sequences of characters into meaningful units called tokens, e.g. a[index]=4+2 → id [ id ] = number + number (L1/L2, Lexical analysis).`],
          [`Lines`, `The scanner does not split the program into lines; it removes newlines as white space and groups characters into tokens.`],
          [`Groups`, `"Groups" is too vague; the lecture's term for the meaningful units the scanner produces is tokens.`],
          [`Packets`, `Packets are a networking term (data units sent over a network), not something a compiler produces.`]
        ], a: 0, src: `Exam 2023/24 Summer` },
        { q: `The expression aε = εa = ?`, o: [
          [`ε`, `Wrong. This is the exam trap: ε is the neutral element, not a "zero".`],
          [`a`, `Correct. ε is the neutral element for concatenation: sε = s = εs, so aε = εa = a (L2, Algebraic properties).`],
          [`aa`, `aa would need a second a; concatenating with ε adds nothing, so the result is just a.`],
          [`Φ (empty set)`, `Φ is the empty set, not the empty string ε; concatenating a with ε leaves a unchanged, it does not give Φ.`]
        ], a: 1, src: `Exam 2024/25 (50) T/F` },
        { q: `Is (X|Y)* equivalent to X*|Y*?`, o: [
          [`Yes, always`, `Wrong. (X|Y)* contains XY, which X*|Y* cannot produce.`],
          [`No`, `Correct. X*|Y* only gives strings made of X's alone or Y's alone.`],
          [`Only if X = ε`, `If X = ε then (X|Y)* = Y* and X*|Y* = ε|Y* = Y*, so they would match; but in general they differ, so the answer is No.`],
          [`Only for DFAs`, `Equivalence of regular expressions is about the languages they denote; it does not depend on DFAs.`]
        ], a: 1, src: `Exam 2024/25 (60) T/F` },
        { q: `L1 = {a,b}, L2 = {0,11}. L2L1 = ?`, o: [
          [`{a0, a11, b0, b11}`, `{a0, a11, b0, b11} is L1L2 (L1 strings first). L2L1 puts the L2 string first: {0a, 0b, 11a, 11b}.`],
          [`{0a, 0b, 11a, 11b}`, `Correct. Each string of L2 followed by each string of L1.`],
          [`{a, b, 0, 11}`, `{a, b, 0, 11} is the union L1 ∪ L2, not the concatenation.`],
          [`{0a, 11b}`, `Concatenation pairs EVERY string of L2 with EVERY string of L1, giving 2 × 2 = 4 strings; 0b and 11a are missing here.`]
        ], a: 1 },
        { q: `Are the regular expressions (a)|((b)*(c)) and b*c|a equivalent?`, o: [
          [`Yes`, `Correct. The parentheses are redundant (* binds tighter than concatenation) and | is commutative.`],
          [`No, the order of | matters`, `| is commutative (s|t = t|s), so swapping the two alternatives does not change the language.`],
          [`No, (b)*(c) means (bc)*`, `* binds tighter than concatenation, so (b)*(c) is b*c: any number of b's then one c, not (bc)*.`],
          [`Only over {a,b}`, `The two expressions are equal by the algebraic laws, whatever the alphabet; restricting it changes nothing.`]
        ], a: 0, src: `Exam Summer 2025 T/F` },
        { q: `Which regular expression gives strings over {a,b} with EXACTLY two a's?`, o: [
          [`(a|b)*a(a|b)*a(a|b)*`, `(a|b)* parts can contain more a's, so this gives AT LEAST two a's, e.g. aaa is accepted.`],
          [`b*ab*ab*`, `Correct. Only b's are allowed around the two a's.`],
          [`aab*`, `aab* forces both a's to come first and side by side, so strings like abab or baba are missed.`],
          [`(ab)*`, `(ab)* gives any number of a's (0, 1, 2, 3…) and only in the pattern abab…, not exactly two.`]
        ], a: 1, src: `Sheet One` },
        { q: `Which state machine accepts a+?`, o: [
          [`One start/final state with an a-loop`, `A single start/final state with an a-loop accepts ε too, so it is the lecture's FA for a*, not a+.`],
          [`q0 (a-loop) --a--> final q1`, `Correct. At least one a must be read before reaching the final state.`],
          [`q0 --a--> q1 with no loops`, `q0 –a→ q1 with no loop accepts only the single string "a", not aa, aaa, …`],
          [`q0 with a,b loop`, `One start/final state with an a,b loop accepts every string over {a,b}, i.e. (a|b)*.`]
        ], a: 1 },
        { q: `Regular expression a|b denotes:`, o: [
          [`{ab}`, `{ab} is the concatenation ab; | means "or", giving a or b as separate strings.`],
          [`{a, b}`, `Correct. The or operator gives either alternative: a|b = {a, b}, just as a|b|c = {a, b, c} (L2, Operations on languages).`],
          [`{ε, a, b}`, `ε would only be included with a? or (a|b|ε); a|b has no empty alternative.`],
          [`{a, b, ab, ba}`, `ab and ba need concatenation, as in (a|b)(a|b); a|b alone gives only single symbols.`]
        ], a: 1, src: `Exam Summer 2025 T/F` },
        { q: `"In concatenation of two alphabets/languages, order is not important." This is:`, o: [
          [`True`, `False statement: the slide shows L1L2 = {a0, a11, b0, b11} but L2L1 = {0a, 0b, 11a, 11b}, so L1L2 ≠ L2L1.`],
          [`False`, `Correct. Order matters for concatenation (it matters NOT for union).`],
          [`True only for finite languages`, `The lecture's counterexample uses finite languages ({a,b} and {0,11}) and order still matters.`],
          [`True only with ε`, `Concatenating with ε gives the same result either way (sε = εs), but that is a special case; in general order matters.`]
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
          [`having an ε`, `Correct. The first NFA sign on the slides is "contains ε": a DFA is not capable of using an empty-string transition, so any ε edge makes the automaton an NFA (L3, What is NFA?).`],
          [`having more than one accept state`, `The number of accept states has nothing to do with determinism. A DFA may have several final states; it only needs exactly one next state per (state, symbol).`],
          [`having loops`, `DFAs can have loops. Only a loop followed by a transition on the SAME symbol causes non-determinism.`],
          [`all of the mentioned`, `Not all of them: accept states and loops are allowed in a DFA. Only ε always forces an NFA; a loop matters only when another edge leaves on the same symbol.`]
        ], a: 0, src: `Exam 2024/25 (60)` },
        { q: `The automaton with ε symbol is said to be:`, o: [
          [`DFA`, `A DFA is not capable of using an empty-string transition (L3 comparison table), so an automaton with ε cannot be a DFA.`],
          [`NFA`, `Correct. The NFA vs DFA table says an NFA can use an empty-string (ε) transition, while a DFA cannot (L3, NFA vs. DFA).`],
          [`FFA`, `"FFA" is not a type of automaton in the course; the lecture only compares DFA and NFA, and ε belongs to the NFA.`],
          [`none`, `There is a right answer: an automaton with ε transitions is an NFA, per the lecture's first NFA characteristic.`]
        ], a: 1, src: `Exam Summer 2025` },
        { q: `"A DFA may contain a loop or more."`, o: [
          [`True`, `Correct. E.g. the DFA for 1*01(0|1)* has loops on q0 and q2.`],
          [`False`, `Loops are fine as long as each (state, symbol) has exactly one next state.`],
          [`Only self-loops`, `The rule is not limited to self-loops: any cycle is allowed in a DFA as long as each (state, symbol) pair has exactly one next state.`],
          [`Only if it has ε`, `A DFA can never have ε ("DFA is not capable of using an empty string transition"); loops are allowed without any ε.`]
        ], a: 0, src: `Exam 2023/24 (60) T/F` },
        { q: `In the NFA 1 --0--> 3, 3 --0--> 1, 3 --1--> 3, 3 --1--> 2, 2 --0--> 3, what is the DFA transition from {3} on input 1?`, o: [
          [`{3}`, `This keeps only the self-loop 3 –1→ 3 and misses the edge 3 –1→ 2. In the DFA, a cell collects every state reachable on that symbol.`],
          [`{2}`, `This keeps only 3 –1→ 2 and drops the self-loop 3 –1→ 3; state 3 also stays in 3 on input 1.`],
          [`{2,3}`, `Correct. From 3 on input 1 there are two edges: the loop 3 –1→ 3 and 3 –1→ 2, so the DFA cell is the set {2,3} (L3, subset construction).`],
          [`∅`, `∅ would mean no state has a move on 1, but state 3 has two: the loop to 3 and the edge to 2.`]
        ], a: 2, src: `Exam 2024/25 (50)` },
        { q: `Same NFA: DFA transition from {2,3} on input 0?`, o: [
          [`{1,3}`, `Correct. Take the union of each member's 0-moves: 2 –0→ 3 and 3 –0→ 1, giving {1,3}, a new DFA row (L3, subset construction).`],
          [`{3}`, `This includes only 2 –0→ 3 and forgets that state 3 also moves on 0, to state 1.`],
          [`{1}`, `This includes only 3 –0→ 1 and forgets that state 2 also moves on 0, to state 3.`],
          [`{2,3}`, `{2,3} is the result of {2,3} on input 1 (3 –1→ 3 and 3 –1→ 2), not on input 0.`]
        ], a: 0, src: `Exam 2024/25 (50)` },
        { q: `NFA with 1 --ε--> 3 (1 is the start). The DFA start state is:`, o: [
          [`{1}`, `{1} forgets the ε edge: the DFA starts at the ε-closure of the start state, and 1 reaches 3 without reading input.`],
          [`{1,3}`, `Correct. The DFA start state is the ε-closure of the NFA start: 1 itself plus 3 via 1 –ε→ 3, so E(1) = {1,3} (L3, NFA → DFA with ε).`],
          [`{3}`, `The ε-closure always contains the state itself (every state reaches itself by ε, step 1), so 1 must be in the set too.`],
          [`{1,2,3}`, `State 2 cannot be reached from 1 by ε moves alone; only the edge 1 –ε→ 3 is free, so E(1) = {1,3}.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `In the ε-NFA (1 --b--> 2, 1 --ε--> 3, 2 --a--> 2, 2 --a,b--> 3, 3 --a--> 1), DFA transition from {2,3} on a:`, o: [
          [`{2,3}`, `This keeps only state 2's a-moves (to 2 and 3) and forgets 3 –a→ 1, whose ε-closure {1,3} adds state 1.`],
          [`{1,3}`, `This keeps only state 3's move (3 –a→ 1, closure {1,3}) and forgets that 2 –a→ 2 and 2 –a→ 3 add state 2.`],
          [`{1,2,3}`, `Correct. 2 gives {2,3}; 3 gives 1, whose ε-closure is {1,3}. Union = {1,2,3}.`],
          [`∅`, `∅ is wrong because both members move on a: 2 goes to 2 and 3, and 3 goes to 1.`]
        ], a: 2, src: `Exam 2024/25 (60)` },
        { q: `Why is the NFA "A (loop 0,1) --0--> B" non-deterministic?`, o: [
          [`It has a final state`, `Having a final state is normal for both DFAs and NFAs, so it says nothing about determinism.`],
          [`It has a loop on 0 and another transition on the same symbol 0`, `Correct. This is the lecture's second NFA sign: a loop on a symbol followed by a transition on the same symbol, so (A,0) has two next states, A and B (L3, What is NFA?).`],
          [`It has an ε edge`, `The drawing has no ε edge; the non-determinism here comes from A having two moves on 0.`],
          [`It has two states`, `The number of states does not decide determinism; a two-state DFA is possible. What matters is that A has two next states on 0.`]
        ], a: 1 },
        { q: `Which statement about the NFA → DFA conversion is correct?`, o: [
          [`It is impossible for NFAs with ε`, `ε is handled by step 1 of the lecture method (the table with an ε column) and the ε-closure of each set, so ε-NFAs convert too.`],
          [`It is always possible`, `Correct. Every NFA, with or without ε, can be converted to an equivalent DFA by the subset construction: each reachable set of NFA states becomes one DFA state (L3, NFA into DFA).`],
          [`The DFA always has fewer states`, `The DFA can have more states, because each DFA state is a set of NFA states (up to 2^n sets for n NFA states).`],
          [`It changes the accepted language`, `The DFA is equivalent to the NFA: it accepts exactly the same strings, only without non-determinism.`]
        ], a: 1, src: `Exam Summer 2025 T/F` },
        { q: `"Epsilon transition causes a change of the regular expression accepted by an automaton."`, o: [
          [`True`, `ε consumes no input; concatenating with ε changes nothing (sε = s).`],
          [`False`, `Correct (our answer; no official key). An ε move changes state without reading input, so the language is expressed the same way.`],
          [`True only for DFA`, `A DFA cannot contain ε at all (L3 comparison table), so there is no DFA case where ε could change anything.`],
          [`Depends on the start state`, `ε means reading the empty string wherever it appears, so the start state does not matter: the language stays the same.`]
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
          [`Analysis`, `"Analysis" is too general: the front end has lexical, syntax and semantic analysis. Finding the parse tree is specifically parsing.`],
          [`Recognition`, `A recognizer only answers yes or no for a string; the lecture defines finding the parse tree itself as parsing.`],
          [`Parsing`, `Correct. Syntax analysis, or parsing, takes the token stream and outputs a parse tree, so parsing is the process of finding a parse tree for a string of tokens (L4, Syntax Analysis).`],
          [`Tokenization`, `Tokenization is lexical analysis: it produces the tokens. Building a tree from those tokens is the parser's job.`]
        ], a: 2, src: `Exam 2024/25 (60)` },
        { q: `Leaf nodes of a parsing tree indicate ……… of a context-free grammar.`, o: [
          [`terminals`, `Correct. In a parse tree all leaf nodes are terminals, all interior nodes are non-terminals, and an in-order traversal of the leaves gives the input string (L4, Parse Tree).`],
          [`non-terminals`, `Non-terminals are the interior (non-leaf) nodes of a parse tree; the leaves are terminals.`],
          [`start symbol`, `The start symbol is the root of the parse tree, not its leaves.`],
          [`production rules`, `Productions are the parent-to-children links.`]
        ], a: 0, src: `Exam 2024/25 (60)` },
        { q: `The following is not a part of a context-free grammar:`, o: [
          [`start symbol`, `The start symbol S is one of the four CFG components: derivation begins from it.`],
          [`non-terminal symbols`, `Non-terminals (V), the syntactic variables, are one of the four components of a CFG.`],
          [`end symbol`, `Correct. A CFG has four components: non-terminals (V), terminals (Σ), productions (P) and a start symbol (S). There is no "end symbol" (L4, Context-Free Grammar).`],
          [`terminal symbols`, `Terminals (Σ), the tokens strings are made of, are one of the four components of a CFG.`]
        ], a: 2, src: `Exam 2024/25 (60)` },
        { q: `When only one rightmost or only one leftmost parsing tree is produced for a sentence, the grammar is:`, o: [
          [`ambiguous`, `Ambiguous means more than one parse tree (more than one leftmost or rightmost derivation) for at least one string, which is the opposite case.`],
          [`unambiguous`, `Correct. A grammar is ambiguous if some string has more than one parse tree; when every sentence has only one leftmost (or rightmost) tree, it is unambiguous (L4, Ambiguity).`],
          [`static`, `"Static" is not a property of grammars in the course; grammars are classed as ambiguous or unambiguous.`],
          [`dynamic`, `"Dynamic" is not a grammar property in the course; the property about the number of parse trees is (un)ambiguity.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `The rule A → Ab | c will cause the grammar to be:`, o: [
          [`ambiguous`, `This rule alone gives one tree per string (c, cb, cbb…).`],
          [`left recursive`, `Correct. A appears as the left-most symbol of its own right side.`],
          [`dynamic`, `"Dynamic" is not a grammar property; A → Ab | c is left recursive because A is the left-most symbol of its own right side.`],
          [`all of the mentioned`, `Only left recursion applies: "dynamic" is not a grammar property, and this rule gives just one tree per string, so it is not ambiguous.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `……… is the input to the syntax analysis phase.`, o: [
          [`stream of tokens`, `Correct. The parser takes its input from the lexical analyzer as a stream of tokens and checks it against the production rules (L4, Syntax Analysis).`],
          [`syntax tree`, `The syntax (parse) tree is the OUTPUT of syntax analysis, not its input.`],
          [`annotated syntax tree`, `The annotated syntax tree is produced by semantic analysis, which comes after the parser.`],
          [`assembly code`, `Assembly or target code is produced at the end of the compiler, by code generation.`]
        ], a: 0, src: `Exam 2024/25 (60)` },
        { q: `The phase Syntax Analysis is modeled on the basis of:`, o: [
          [`high level language`, `The source program is written in a high-level language, but the parser checks it using a context-free grammar.`],
          [`low level language`, `Low-level language is the target of code generation, not the model of syntax analysis.`],
          [`context free grammar`, `Correct. Regular expressions cannot check balancing tokens such as parentheses, so syntax analysis uses a context-free grammar (L4, Syntax Analysis).`],
          [`regular grammar`, `Regular grammars/expressions model lexical analysis.`]
        ], a: 2, src: `Exam 2024/25 (50)` },
        { q: `A leftmost parsing tree grows from the ……… side.`, o: [
          [`left`, `The official revision-sheet key (Q52) and the 2023/24 exam say "right", so answer right, even though a leftmost derivation expands the left-most non-terminal first.`],
          [`equal sides`, `A leftmost tree does not grow evenly on both sides; the official key for this question is "right".`],
          [`right`, `Correct per the official revision-sheet key (Q52) and the 2023/24 exam.`],
          [`the side cannot be determined`, `The side can be stated: the official revision-sheet key (Q52) says a leftmost parsing tree grows from the right side.`]
        ], a: 2, src: `Exam 2023/24 (60)` },
        { q: `A context-free grammar is said to be ambiguous when:`, o: [
          [`it has a leftmost and a rightmost derivation for the same string`, `Every unambiguous grammar also has both. That proves nothing.`],
          [`it can't accept a specific string`, `Failing to derive a string means it is not in the language; ambiguity is about strings that ARE derived in more than one way.`],
          [`it achieves the same string following more than one path using either leftmost or rightmost derivation`, `Correct. A grammar is ambiguous if at least one string has more than one parse tree, i.e. two different leftmost (or two different rightmost) derivations (L4, Ambiguity).`],
          [`None`, `There is a right answer: option (c), the same string reached by more than one leftmost or rightmost derivation, is the definition of ambiguity.`]
        ], a: 2, src: `Final revision sheet` },
        { q: `For S → Ab | aaB, A → a | Aa, B → b, which is a valid leftmost derivation of aab?`, o: [
          [`S ⇒ Ab ⇒ Aab ⇒ aab`, `Correct (one of the two; the other is S ⇒ aaB ⇒ aab), so the grammar is ambiguous.`],
          [`S ⇒ Ab ⇒ ab`, `S ⇒ Ab ⇒ ab uses A → a and derives ab, which has only one a; the target string is aab.`],
          [`S ⇒ aaB ⇒ aaBb`, `The step aaB ⇒ aaBb is impossible: the only rule for B is B → b, which replaces B and adds nothing after it.`],
          [`S ⇒ AaB ⇒ aab`, `S has only S → Ab and S → aaB; there is no production S → AaB, so the first step is invalid.`]
        ], a: 0, src: `Final revision sheet` },
        { q: `Removing left recursion from A → aB | Ad gives:`, o: [
          [`A → dA', A' → aBA' | ε`, `This swaps the roles: d follows the recursive A, so α = d goes in A', and the non-recursive option β = aB starts A.`],
          [`A → aBA', A' → dA' | ε`, `Correct. A → Aα | β becomes A → βA', A' → αA' | ε. Here α = d and β = aB, giving A → aBA', A' → dA' | ε (L4, Removing left recursion).`],
          [`A → aB | dA`, `A → aB | dA is right-recursive and generates strings like daB with d first, while the original language is aB followed by any number of d's.`],
          [`A → aBd*`, `d* is regular-expression notation, not a CFG production; the lecture rewrites the repetition with a new non-terminal A'.`]
        ], a: 1, src: `Lecture 6 example` },
        { q: `"LL(1) can be applied on a left-recursive context-free grammar."`, o: [
          [`True`, `A top-down parser would loop forever on A → Aα.`],
          [`False`, `Correct. A top-down parser keeps expanding the same left non-terminal, cannot judge when to stop and loops forever, so left recursion must be removed before LL(1) (L4, Left Recursion).`],
          [`True if it is unambiguous`, `Ambiguity is separate: E → E+T | T is unambiguous but still left-recursive, and the top-down parser still loops on it.`],
          [`True with backtracking`, `LL(1) is a predictive parser that chooses with one lookahead and never backtracks; left recursion must be removed instead.`]
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
          [`Left-to-right scan, Leftmost derivation, 1 lookahead symbol`, `Correct. The first L means the input is scanned Left to right, the second L means a Leftmost derivation is built, and 1 means one input symbol of lookahead (L6, LL(1) grammars).`],
          [`Left recursion, Leftmost derivation, 1 state`, `The first L is the left-to-right scan, not left recursion; LL(1) grammars must actually be free of left recursion. And 1 counts lookahead symbols, not states.`],
          [`Lexical, Logical, 1 pass`, `LL(1) has nothing to do with lexical or logical phases or passes: L = Left-to-right scan, L = Leftmost derivation, 1 = one lookahead symbol.`],
          [`Left-to-right scan, Rightmost derivation, 1 lookahead`, `A rightmost derivation (in reverse) is what bottom-up LR parsers build. LL(1) is top-down, so its second L is a Leftmost derivation.`]
        ], a: 0 },
        { q: `For E → TE', E' → +TE' | ε, T → FT', T' → *FT' | ε, F → (E) | id, FOLLOW(T) is:`, o: [
          [`{+, ), $}`, `Correct. FIRST(E') − ε = {+}, and E' is nullable so FOLLOW(E) = {), $} is added.`],
          [`{*, +, ), $}`, `That is FOLLOW(F): the * comes from T' → *FT', which puts FIRST(T') after F. Nothing in the grammar puts * right after T.`],
          [`{), $}`, `That is FOLLOW(E) = FOLLOW(E'). It misses the + that T gets from E' → +TE' (FIRST(E') − ε = {+} follows T).`],
          [`{(, id}`, `That is FIRST(T) = FIRST(F) = {(, id}: the terminals that begin T, not the ones that can appear after it. FOLLOW(T) = {+, ), $}.`]
        ], a: 0, src: `Lecture 6 example` },
        { q: `Same grammar: M[T', )] = ?`, o: [
          [`T' → *FT'`, `T' → *FT' goes only in M[T', *], because FIRST(*FT') = {*}. Under ) the parser must let T' vanish.`],
          [`T' → ε`, `Correct. ")" ∈ FOLLOW(T') and T' has an ε production.`],
          [`error`, `The cell is filled: T' is nullable and ) ∈ FOLLOW(T') = {+, ), $}, so table rule 2 puts T' → ε in M[T', )].`],
          [`T → FT'`, `T → FT' is a production of T, so it can only appear in row T (under id and ( ). Row T' holds only T' productions.`]
        ], a: 1, src: `Lecture 6 example` },
        { q: `Same grammar: M[F, (] = ?`, o: [
          [`F → id`, `F → id goes in M[F, id], since FIRST(id) = {id}. Under ( the parser must choose F → (E).`],
          [`F → (E)`, `Correct. Table rule 1: FIRST((E)) = {(}, so F → (E) is placed in M[F, (] (L6, Building the predictive parsing table).`],
          [`E → TE'`, `E → TE' belongs in row E (it is in M[E, (] and M[E, id]). Row F can only contain productions of F.`],
          [`error`, `The cell is not empty: FIRST((E)) = {(}, so M[F, (] = F → (E). F's empty cells are +, *, ) and $.`]
        ], a: 1 },
        { q: `For S → A, A → aBA', A' → dA' | ε, B → b, what is FOLLOW(B)?`, o: [
          [`{$}`, `{$} is FOLLOW(A) and FOLLOW(A'). B is followed by A' in A → aBA', so FIRST(A') − ε = {d} must be added to FOLLOW(B).`],
          [`{d, $}`, `Correct. FIRST(A') − ε = {d}; A' is nullable, so FOLLOW(A) = {$} is added.`],
          [`{b}`, `{b} is FIRST(B), the terminal B begins with. FOLLOW(B) lists what can come after B: {d, $}.`],
          [`{d, ε}`, `{d, ε} is FIRST(A'). FOLLOW sets never contain ε; since A' can vanish, $ from FOLLOW(A) is added instead, giving {d, $}.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `For S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε, FOLLOW(S) is:`, o: [
          [`{$}`, `$ alone ignores the inner uses of S: U → (S) puts ) after S and U → aSb puts b after S, so FOLLOW(S) = {$, ), b}.`],
          [`{$, ), b}`, `Correct. $ because S is the start symbol, ) from U → (S) and b from U → aSb, using FOLLOW rules 1 and 2 (L6, Exam grammar).`],
          [`{a, c, $}`, `{a, c} come from FIRST(VW), which belongs in FOLLOW(U), not FOLLOW(S). Nothing puts a or c directly after S.`],
          [`{(, a, d}`, `{(, a, d} is FIRST(S) = FIRST(U): the terminals S can begin with. FOLLOW(S) is {$, ), b}.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `Same grammar: FOLLOW(U) is:`, o: [
          [`{a, c}`, `V and W are nullable, so FOLLOW(S) must be added too.`],
          [`{a, c, $, ), b}`, `Correct. In S → UVW, FIRST(VW) − ε = {a, c} goes into FOLLOW(U); VW can derive ε, so FOLLOW(S) = {$, ), b} is added too (L6, Rules for FOLLOW).`],
          [`{$, ), b}`, `{$, ), b} is only the FOLLOW(S) part. It misses FIRST(VW) − ε = {a, c}, the terminals that directly follow U in S → UVW.`],
          [`{a}`, `{a} only takes FIRST(V). Since V is nullable, c from FIRST(W) is added, and since VW is nullable, FOLLOW(S) = {$, ), b} too.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `Same grammar: which entry is M[V, )]?`, o: [
          [`V → aV`, `V → aV goes only in M[V, a], because FIRST(aV) = {a}. On ) the parser must let V vanish.`],
          [`V → ε`, `Correct. V is nullable and ) ∈ FOLLOW(V) = {c} ∪ FOLLOW(S) = {c, $, ), b}, so table rule 2 puts V → ε in M[V, )] (L6, Exam grammar).`],
          [`error`, `The cell is filled: ) ∈ FOLLOW(V) (it comes from FOLLOW(S) because W is nullable), so V → ε goes there.`],
          [`W → ε`, `W → ε is a production of W, so it sits in row W (under b, ), $). Row V only holds V productions.`]
        ], a: 1, src: `Exam 2024/25 (60)` },
        { q: `During LL(1) parsing the stack top is a terminal equal to the current input symbol. The action is:`, o: [
          [`Expand`, `Expansion (replacing the top with the right side of M[A, a]) is only done when the top of the stack is a non-terminal A.`],
          [`Match (pop and advance the input)`, `Correct. When the top terminal equals the input symbol, the parser matches: it pops the stack and advances the input, e.g. aBA'$ / abd$ → BA'$ / bd$ (L6, parsing abd).`],
          [`Reduce`, `Reduce belongs to bottom-up shift-reduce (LR) parsing. An LL(1) parser only expands, matches, accepts or reports an error.`],
          [`Error`, `An error is reported only if the top terminal differs from the input symbol, or a non-terminal meets an empty table cell. Here they are equal.`]
        ], a: 1 },
        { q: `A top-down parser generates:`, o: [
          [`left-most derivation in reverse`, `Nothing builds a leftmost derivation in reverse. A top-down parser builds the leftmost derivation forward, from the start symbol to the input.`],
          [`left-most derivation`, `Correct. A top-down parser starts at the start symbol and always expands the leftmost non-terminal, so it produces a leftmost derivation; LL means Leftmost derivation (L6, LL(1) grammars).`],
          [`right-most derivation in reverse`, `A rightmost derivation in reverse is what a bottom-up (shift-reduce, LR) parser produces, reducing the input back to the start symbol.`],
          [`right-most derivation`, `A top-down parser always expands the leftmost non-terminal first, so its derivation is leftmost, not rightmost.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `S → aABe, A → Abc | b, B → d. After removing left recursion, which is correct?`, o: [
          [`A → bA', A' → bcA' | ε`, `Correct. A → Abc | b has the form A → Aα | β with α = bc and β = b, so it becomes A → βA' = bA', A' → αA' | ε = bcA' | ε (L4-5, Removing left recursion).`],
          [`A → bcA', A' → bA' | ε`, `This swaps α and β: β = b (the non-recursive option) must start A, and α = bc (what followed A) goes into A'. Here A would start with bc.`],
          [`A → Abc', A' → b`, `A → Abc' still begins with A, so the grammar is still left-recursive. The rule is A → βA', A' → αA' | ε.`],
          [`A → b | bc`, `A → Abc | b derives b, bbc, bbcbc, … (b followed by any number of bc). A → b | bc loses most of these strings and changes the language.`]
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
          [`static`, `"Static" is not one of the lecture's attribute categories. Attributes are divided only into synthesized (from children) and inherited (from parent/siblings).`],
          [`dynamic`, `"Dynamic" is not an attribute category in the lecture. The two categories are synthesized and inherited attributes.`],
          [`synthesized`, `Correct. Synthesized attributes get their values from the attribute values of their child nodes, e.g. in E → E + T the parent E gets its value from its children (L7, Synthesized vs inherited attributes).`],
          [`inherited`, `Inherited attributes come from the parent/siblings.`]
        ], a: 2, src: `Exam 2024/25 (60)` },
        { q: `Inherited attributes get their attribute values from:`, o: [
          [`child nodes`, `Getting values from child nodes is the definition of synthesized attributes. Inherited ones come from the parent and/or siblings.`],
          [`leaves nodes`, `Leaf nodes hold lexical values (like 2, 3, 4) that synthesized attributes are built from; inherited attributes come from the parent and/or siblings.`],
          [`parent nodes`, `Correct (official key; the lecture adds "and/or siblings").`],
          [`semantic nodes`, `"Semantic nodes" is not a term used in the lecture. Inherited attributes take values from the parent and/or sibling nodes.`]
        ], a: 2, src: `Exam 2024/25 (50)` },
        { q: `Attaching attributes to each non-terminal of the CFG will produce:`, o: [
          [`annotated syntax tree`, `The annotated tree is produced by EVALUATING an attribute grammar on a syntax tree.`],
          [`unambiguous CFG`, `Adding attributes gives the CFG semantics; it does not change its productions or how many parse trees a sentence has, so it does not make it unambiguous.`],
          [`ambiguous CFG`, `Attributes do not make a grammar ambiguous; ambiguity depends only on the productions. Attaching attributes gives an attribute grammar.`],
          [`attribute grammar`, `Correct. Official sheet Q53: "Attribute grammar is generated by attaching attributes to each nonterminal of the CFG".`]
        ], a: 3, src: `Exam 2024/25 (60)` },
        { q: `SDT is an abbreviation of:`, o: [
          [`Semantic Directed Translation`, `A common trap: the S stands for Syntax, not Semantic. The translation is directed by the grammar's syntax (rules attached to productions).`],
          [`Syntax Directed Translation`, `Correct. SDT = Syntax Directed Translation: augmented rules added to the grammar that facilitate semantic analysis (L7, Syntax Directed Translation).`],
          [`Syntax Double Translation`, `There is no "Syntax Double Translation". SDT stands for Syntax Directed Translation: translation rules attached to the grammar's productions.`],
          [`Semantic Directed Table`, `SDT is not a table. It stands for Syntax Directed Translation, a set of translation rules attached to the grammar's productions.`]
        ], a: 1, src: `Exam 2023/24 (60)` },
        { q: `Semantic analysis uses ……… grammar in order to transform ……… tree into ……… tree.`, o: [
          [`context free, syntax, annotated syntax`, `The plain CFG is what the parser uses. Semantic analysis uses the attribute grammar (a CFG with attributes) to annotate the syntax tree.`],
          [`attribute, semantic, syntax`, `This reverses the flow: the input of semantic analysis is the syntax tree and its output is the annotated syntax tree, not a syntax tree.`],
          [`attribute, syntax, annotated syntax`, `Correct. Semantic analysis uses the attribute grammar to transform the syntax tree (from the parser) into the annotated syntax tree (L7, Attribute grammar).`],
          [`context free, syntax, semantic`, `The grammar is the attribute grammar, and the output is the annotated syntax tree. The course has no "semantic tree".`]
        ], a: 2, src: `Exam 2023/24 (50)` },
        { q: `Type checking is normally done during:`, o: [
          [`code optimization`, `Code optimization works on intermediate code after semantic analysis; by then type errors must already have been found.`],
          [`syntax directed translation`, `Correct. Type checking is part of semantic analysis, which is carried out by syntax directed translation over the syntax tree (official key; L7, Semantic analysis).`],
          [`lexical analysis`, `The lexer only groups characters into tokens; it has no type information. Types are gathered during semantic analysis.`],
          [`syntax analysis`, `Syntax analysis only checks the structure against the CFG and builds the syntax tree. Types are checked afterwards, in semantic analysis.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `A parse tree showing the value of attributes at each node is a(n):`, o: [
          [`Annotated parse tree`, `Correct. The annotated parse (syntax) tree shows the attribute values at each node; it is the output of semantic analysis (L7, Semantic analysis).`],
          [`Syntax tree`, `The syntax tree is the parser's output before the attributes are evaluated; it shows structure but no attribute values.`],
          [`Semantic tree`, `"Semantic tree" is not a course term. A tree showing attribute values at each node is the annotated parse tree.`],
          [`None of the mentioned`, `Not true: option (a), the annotated parse tree, is exactly the tree that shows the attribute values at each node.`]
        ], a: 0, src: `Final revision sheet` },
        { q: `With the SDT rules for E → E+T | T, T → T*F | F, F → INT, what is E.val at the root for 2+3*4?`, o: [
          [`20`, `That is (2+3)*4. The grammar gives * higher precedence (deeper in the tree).`],
          [`14`, `Correct. T.val = 3*4 = 12, then E.val = 2 + 12.`],
          [`24`, `24 is 2*3*4, multiplying all the lexical values. The + in 2+3*4 is never turned into a multiplication.`],
          [`9`, `9 is 2+3+4, which treats the * as a +. PR#3 computes T.val = 3 * 4 = 12 before E adds 2.`]
        ], a: 1, src: `Lecture 7 example` },
        { q: `In the SDT example, the values 2, 3 and 4 at the leaves are called:`, o: [
          [`synthesized attributes`, `They are the source of synthesis, but the lecture names them differently.`],
          [`lexical values`, `Correct. The lecture calls the values at the leaves (2, 3, 4) lexical values; PR#5 copies them up with F.val = INT.lexval (L7, SDT example).`],
          [`constants`, `Constants are a separate kind of value written inside SDT rules. The token values 2, 3, 4 at the leaves are lexical values.`],
          [`inherited attributes`, `Inherited attributes get values from a node's parent and/or siblings. The leaf values 2, 3, 4 come from the tokens: lexical values.`]
        ], a: 1 },
        { q: `When a variable may or may not be assigned, its definite-assignment state is:`, o: [
          [`definitely unassigned`, `Definitely unassigned means it is known with certainty that the variable is NOT assigned; here it may or may not be.`],
          [`unknown`, `Correct. Definite assignment analysis has three states; a variable that may or may not be assigned is "unknown" (L7, Definite assignment analysis).`],
          [`definitely assigned`, `Definitely assigned means it is known with certainty that the variable IS assigned; here it may or may not be.`],
          [`none of the mentioned`, `Not true: option (b), "unknown", is the state for a variable that may or may not be assigned.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `"SDT is the process of using the context-free grammar along the syntax tree to get the annotated syntax tree."`, o: [
          [`True`, `Correct. SDT evaluates rules attached to CFG productions over the tree, producing the annotated syntax tree.`],
          [`False`, `The revision sheet says attribute grammar/SDT on the syntax tree generates the annotated syntax tree.`],
          [`True only for inherited attributes`, `SDT gives the annotated syntax tree whatever the attribute kind; it can pass information bottom-up (synthesized) and/or top-down (inherited).`],
          [`True only bottom-up`, `The lecture says SDT passes information bottom-up and/or top-down, so the statement is not limited to bottom-up.`]
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
          [`Redundant code`, `Redundant code is what optimization removes; it is not a cost of symbol tables. The slide's problem with a table per scope is memory overhead (plus searching several tables).`],
          [`Peephole optimization`, `Peephole optimization is a code-optimization technique from L9, not a problem of symbol tables. One table per scope costs memory overhead.`],
          [`Ambiguity`, `Ambiguity is a grammar problem (one string, two parse trees, L4), not a symbol-table one. A table per scope wastes memory on each hash table.`],
          [`Memory overhead`, `Correct. Each hash table costs memory, and several tables may need searching.`]
        ], a: 3, src: `Exam 2024/25 (60)` },
        { q: `……… is done based on the structure of the parsing tree, such as braces.`, o: [
          [`Static binding`, `Correct. Static binding is scoping based on the structure of the syntax tree (blocks and braces); it depends only on the program text (L8, Static vs dynamic binding).`],
          [`Dynamic binding`, `Dynamic binding follows execution order, not structure.`],
          [`All types of binding`, `Only static binding follows the tree's structure. Dynamic binding uses the declaration most recently met during execution, so not all types qualify.`],
          [`None of the mentioned`, `Static binding fits the description exactly: scoping based on the structure of the syntax tree, i.e. braces.`]
        ], a: 0, src: `Exam 2023/24 (60)` },
        { q: `"Dynamic object binding is done based on the structure of the parsing tree such as braces."`, o: [
          [`True`, `Following the structure of the parse tree (braces) is the definition of STATIC binding. Dynamic binding depends on the order of execution.`],
          [`False`, `Correct. Dynamic binding uses the most recently encountered declaration at run time.`],
          [`True for C only`, `C is statically scoped (the slides name C and Java), and the statement mixes up the definitions anyway: the braces rule is static binding.`],
          [`True for Lisp only`, `Lisp is dynamically scoped, but its binding depends on the execution order, not on braces, so the statement is false for Lisp too.`]
        ], a: 1, src: `Exam 2024/25 (60) T/F` },
        { q: `The data structure responsible for managing information about variables and their attributes is:`, o: [
          [`semantic stack`, `A semantic stack holds attribute values during syntax-directed translation; it does not keep a record of each identifier's attributes.`],
          [`symbol table`, `Correct. The symbol table associates each identifier with information about its declaration: type, scope level and sometimes location (L8, Symbol tables).`],
          [`parser table`, `The LL(1) parsing table (L6) tells the parser which production to apply; it stores nothing about variables.`],
          [`abstract syntax tree`, `The (abstract) syntax tree represents the program's structure; identifiers' types and scopes are kept in the symbol table.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `The most common way to implement symbol tables is:`, o: [
          [`Unordered list`, `An unordered list is one of the listed mechanisms, but searching it is linear and slow; the slides name the hash table as the most common.`],
          [`Ordered list`, `An ordered list is a possible mechanism (binary-searchable but costly to insert into); the slides name the hash table as the most common.`],
          [`Binary search tree`, `A binary search tree is a listed mechanism, but the slides call the hash table the most common means of implementing symbol tables.`],
          [`Hash table`, `Correct. The slides call it the most common means.`]
        ], a: 3 },
        { q: `In the single-table "Solution 1", the key used to enter an identifier is:`, o: [
          [`the identifier only`, `Keying by the identifier alone is Solution 2, where the value is a linked list of records. Solution 1 appends the scope number to the key.`],
          [`"identifier,scope_id"`, `Correct. Each scope gets a unique scope_id (0 for global, incremented per new scope), and an identifier is entered with the key "identifier,scope_id" (L8, Solution 1).`],
          [`the scope_id only`, `The scope_id alone would put every name of a scope under one key. Solution 1 combines both: "identifier,scope_id".`],
          [`the data type`, `The data type is stored as information in the entry, not used as the key. Solution 1's key is "identifier,scope_id".`]
        ], a: 1 },
        { q: `"The structure of a symbol table is time consuming when an identifier returns a linked list of usages of itself."`, o: [
          [`True`, `Wrong. The front item is always the right one, so lookup is fast.`],
          [`False`, `Correct (official key). In Solution 2 new declarations are inserted at the front of the list, so the front item is always the right one for the current scope: no long search (L8, Solutions).`],
          [`True for multi-pass compilers only`, `The slides describe Solution 2 for a single-pass compiler and do not tie the claim to multi-pass compilers; lookup is fast because the front item is the right one.`],
          [`Cannot be determined`, `It can be determined: the slides say the front item of the list is always the appropriate one, so the structure is not time consuming (key: False).`]
        ], a: 1, src: `Final revision sheet` },
        { q: `{ int x=1; int y=2; { int x=3; y+=x; } y+=x; } Final y with STATIC binding?`, o: [
          [`5`, `5 is y after the inner block only (2 + 3). The statement after the block adds the outer x = 1 again, giving 6.`],
          [`6`, `Correct. 2+3 = 5, then the outer x = 1 gives 6.`],
          [`8`, `8 is the dynamic-binding answer, where the inner x = 3 is still used after the block. With static binding the outer x = 1 is restored.`],
          [`4`, `4 comes from ignoring the inner x and adding the outer x = 1 twice (2 + 1 + 1). Inside the block the inner x = 3 hides the outer one.`]
        ], a: 1, src: `Lecture 8 example` },
        { q: `Same code, DYNAMIC binding (course convention):`, o: [
          [`6`, `6 is the static answer: the outer x = 1 is restored after the block. Under the course's dynamic convention the latest x = 3 is still used.`],
          [`5`, `5 is y after the inner block only (2 + 3); it misses the second y += x that runs after the block.`],
          [`8`, `Correct. The most recently encountered x (3) is used again: 5 + 3.`],
          [`7`, `7 fits neither rule: static gives 5 + 1 = 6 and dynamic (course convention) gives 5 + 3 = 8.`]
        ], a: 2, src: `Lecture 8 example` },
        { q: `"There is only one approach to implement symbol tables."`, o: [
          [`True`, `The slides list two approaches (one table per scope, one table for all scopes) and four mechanisms (lists, BSTs, hash tables).`],
          [`False`, `Correct. One table per scope or one table for all scopes, with lists, BSTs or hash tables.`],
          [`True for C`, `The approaches are not language-specific; any compiler, C included, can use a table per scope or a single table for all scopes.`],
          [`True for static binding`, `Static binding does not limit the choice: the lecture's symbol-table walkthroughs are statically scoped and still show more than one approach.`]
        ], a: 1, src: `Final revision sheet` },
        { q: `"The problem of using a single hash table as a symbol table is memory overhead."`, o: [
          [`True`, `Memory overhead is the problem of one table PER SCOPE; the single table is the solution.`],
          [`False`, `Correct. Memory overhead is the problem of one hash table PER SCOPE; a single hash table for all scopes is the slides' solution, with less overhead and one search (L8, Problems of one table per scope).`],
          [`True only for dynamic binding`, `The memory problem belongs to keeping a table per scope, whatever the binding; the single table reduces overhead in both cases.`],
          [`Cannot be determined`, `The slides settle it: the single hash table is the solution that causes less memory overhead, so the statement is False.`]
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
          [`two`, `Two is the split into fixed-size and dynamic-size storage. The lecture lists three types of storage allocation: static, stack and heap.`],
          [`three`, `Correct. The lecture's three types of storage allocation are static (fixed locations), stack (procedure calls, LIFO) and heap (dynamic variables) (L9, Types of storage allocation).`],
          [`four`, `The lecture names exactly three types: static, stack and heap. There is no fourth storage type.`],
          [`five`, `The C layout has five segments, but the lecture's storage types are three.`]
        ], a: 1, src: `Exam 2024/25 (50)` },
        { q: `A compiler uses stack memory allocation for:`, o: [
          [`static allocation of objects`, `Objects with fixed locations known in advance use static allocation, not the stack.`],
          [`procedures & functions calling`, `Correct. Procedure calls and their activations are managed with stack allocation (LIFO), which is very useful for recursive calls (L9, Types of storage allocation).`],
          [`allocation of the code itself`, `The code (text part) does not change at runtime and its size is known at compile time, so it gets fixed (static) memory.`],
          [`a & b`, `Option a is static allocation, not stack, so only b (procedure and function calls) is right.`]
        ], a: 1, src: `Exam 2023/24 (50)` },
        { q: `The following type of storage used by a compiler is dynamically allocated:`, o: [
          [`heap`, `Correct. Heap allocation dynamically allocates memory to variables at runtime and claims it back when they are no longer needed (L9, Types of storage allocation).`],
          [`queue`, `A queue is a data structure, not one of the compiler's storage types (static, stack, heap).`],
          [`array`, `An array is a data structure that can live in static, stack or heap storage; it is not itself a storage type.`],
          [`text`, `The text (code) part is fixed: its size is known at compile time and it does not change at runtime.`]
        ], a: 0, src: `Exam 2023/24 Summer` },
        { q: `Storage used by a compiler can be classified into:`, o: [
          [`static, stack and heap`, `Correct. The lecture's storage allocation types are static, stack and heap (L9, Types of storage allocation).`],
          [`dynamic, stack and heap`, `"Dynamic" describes stack and heap (both grow and shrink); it is not a third class. The missing class is static.`],
          [`static, queue and heap`, `There is no queue storage. Procedure calls use a stack (LIFO), so the classes are static, stack and heap.`],
          [`None`, `Option a lists the lecture's three classes exactly: static, stack and heap.`]
        ], a: 0, src: `Final revision sheet` },
        { q: `Languages that need heap allocation in the runtime environment are:`, o: [
          [`those that use global variables`, `Global variables have fixed locations known in advance, so static allocation serves them; no heap is needed.`],
          [`those that use dynamic scoping`, `Dynamic scoping is about which declaration a name refers to (L8), not about allocating memory at runtime.`],
          [`those that support recursion`, `Recursion is served by stack allocation: each call pushes an activation, LIFO.`],
          [`those that allow dynamic data structures`, `Correct. Dynamic data structures are created and freed at runtime, which is what heap allocation does: allocate on demand and reclaim memory no longer needed (L9, Heap allocation).`]
        ], a: 3, src: `Final revision sheet` },
        { q: `The following is NOT a method of optimization:`, o: [
          [`constant folding`, `Constant folding is a peephole optimization technique (x = 2 * 3 becomes x = 6).`],
          [`combine operations`, `Combine operations is a peephole technique: several operations are replaced by one equivalent operation.`],
          [`a and b`, `Both a and b ARE optimization methods, so "a and b" cannot be the one that is not.`],
          [`annotated syntax tree`, `Correct. It is a data structure, not an optimization.`]
        ], a: 3, src: `Exam Summer 2025` },
        { q: `……… and ……… are considered mechanisms of code optimization.`, o: [
          [`constant folding, variable folding`, `There is no "variable folding": folding only works on constants, whose values are known at compile time.`],
          [`constant folding, definite assignment`, `Definite assignment is a semantic analysis (L7) that checks variables are assigned before use; it is not an optimization.`],
          [`constant folding, combine operations`, `Correct. Constant folding and combine operations are both peephole optimization techniques, with redundant load and store elimination (L9, Peephole optimization).`],
          [`a and b`, `Options a and b each contain a non-optimization (variable folding, definite assignment), so "a and b" is wrong.`]
        ], a: 2, src: `Final revision sheet` },
        { q: `Peephole optimization is:`, o: [
          [`machine independent and applied to the whole program`, `This is the opposite of the slides: peephole optimization is machine dependent and works on a small window, not the whole program.`],
          [`machine dependent and applied to a small window of code`, `Correct. It works on a small part of the code called the peephole or window, replacing it with shorter, faster code, and it is machine dependent (L9, Peephole optimization).`],
          [`part of lexical analysis`, `Lexical analysis is the first phase (tokens); peephole optimization works on code in the optimization phase.`],
          [`only constant folding`, `Constant folding is only one of its three techniques, with redundant load and store elimination and combine operations.`]
        ], a: 1 },
        { q: `Lecture example with pass-by-RESULT: what does the main program print after the call?`, o: [
          [`2 1 0 3`, `2 1 0 3 is pass by value: nothing is copied back, so i stays 2 and a[2] keeps the 0. By result copies j = 1 and x = 3 back.`],
          [`1 1 3 3`, `Correct. j ends at 1 and x at 3 (they start at 0) and are copied back to i and a[2].`],
          [`3 1 5 3`, `3 1 5 3 is value-result: the initial values (2 and 2) are copied in. By result the formals start at 0, so j = 1 and x = 3.`],
          [`3 1 0 3`, `3 1 0 3 is pass by reference: x is a[2], so a[2] := 0 leaves 0. By result copies x = 0 + 3 = 3 back into a[2].`]
        ], a: 1, src: `Lecture 9 example` },
        { q: `Lecture example with pass-by-VALUE-RESULT: output after the call?`, o: [
          [`3 1 5 3`, `Correct. j=3 is copied to i and x=5 to a[2], overwriting the a[2]:=0.`],
          [`2 1 0 3`, `2 1 0 3 is pass by value: nothing is copied back. Value-result copies j = 3 to i and x = 5 to a[2] at return.`],
          [`1 1 3 3`, `1 1 3 3 is pass by result, where formals start at 0. Value-result copies the initial values in, so j = 2+1 = 3 and x = 2+3 = 5.`],
          [`3 1 0 3`, `3 1 0 3 is pass by reference: x aliases a[2], so a[2] := 0 is final. Value-result copies x = 5 back over that 0.`]
        ], a: 0, src: `Lecture 9 example` },
        { q: `y = x + 5; i = y; z = i; w = z * 3; → y = x + 5; i = y; w = y * 3; is an example of:`, o: [
          [`constant folding`, `Constant folding computes constant expressions (x = 2 * 3 → x = 6); here no constant is computed, a copy is removed.`],
          [`redundant load and store elimination`, `Correct. z = i only copies y's value again, so it is dropped and w uses y directly. This is the slide's example of redundant load and store elimination (L9, Peephole techniques).`],
          [`loop optimization`, `There is no loop in this code; loop optimization moves work out of loops, like computing arr.length once.`],
          [`combine operations`, `Combine operations merges several operations into one equivalent, e.g. (2*3)+5 → 11. Here a redundant copy is removed.`]
        ], a: 1 },
        { q: `"Loop optimization is necessary to improve cache performance and reduce overheads."`, o: [
          [`True`, `Correct. The slide says loop optimization plays an important role in improving cache performance and reducing the overheads of executing loops (L9, Loop optimization).`],
          [`False`, `The statement repeats the slide: loop optimization improves cache performance and reduces loop overheads.`],
          [`True only for Java`, `The slide's example is Java, but the idea applies to loops in any language; nothing limits it to Java.`],
          [`Only for recursion`, `Loop optimization targets loops (e.g. computing arr.length once before the loop), not recursion.`]
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
          { type: `mcq`, q: `……… is a process of finding a parse tree for a string of tokens.`, o: [`Analysis`, `Recognition`, `Parsing`, `Tokenization`], a: 2, why: `Parsing (syntax analysis) is the process of finding a parse tree for the string of tokens produced by the scanner (L4).`, ow: [`Analysis is the whole front end (lexical, syntax and semantic analysis); it is too general to name tree-building in particular.`, `A recognizer only answers yes or no (string accepted or not); it does not have to build a parse tree.`, null, `Tokenization is lexical analysis: it groups characters into tokens, before any parse tree exists.`] },
          { type: `mcq`, q: `All of the following are phases of a compiler except:`, o: [`syntax analysis`, `symbol table`, `scanner`, `code optimization`], a: 1, why: `The symbol table is a data structure shared by the phases (L1).`, ow: [`Syntax analysis (the parser) is phase 2 of the compiler, after lexical analysis.`, null, `The scanner is the lexical analyzer, phase 1 of the compiler.`, `Code optimization is a phase: the source code optimizer (and the target code optimizer) are in the phase list of L1.`] },
          { type: `mcq`, q: `Leaf nodes of a parsing tree indicate ……… of a context free grammar.`, o: [`terminals`, `non-terminals`, `start symbol`, `production rules`], a: 0, why: `Leaves = terminals; interior nodes = non-terminals (L4).`, ow: [null, `Non-terminals label the interior nodes of a parse tree, since each one is expanded by a production.`, `The start symbol labels the root of the parse tree, not the leaves.`, `Productions are not node labels; each interior node with its children shows one production being applied.`] },
          { type: `mcq`, q: `……… is a major problem when creating a symbol table per scope.`, o: [`Redundant code`, `Peephole optimization`, `Ambiguity`, `Memory overhead`], a: 3, why: `Each hash table costs memory (L8). The pencil mark on (b) is wrong.`, ow: [`Redundant code is something the optimizer removes; it has nothing to do with how symbol tables are organized.`, `Peephole optimization is a code optimization technique (L9), not a problem of symbol tables.`, `Ambiguity is a property of grammars (more than one parse tree, L4), not of symbol tables.`, null] },
          { type: `mcq`, q: `Annotated syntax tree is the input to ……… phase.`, o: [`syntax analysis`, `code optimization`, `semantic analysis`, `derivation`], a: 1, why: `Semantic analysis outputs the annotated tree and the source code optimizer takes it (L1; revision sheet Q37).`, ow: [`Syntax analysis takes tokens and produces the (plain) syntax tree; the annotated tree comes later.`, null, `Semantic analysis produces the annotated syntax tree; its input is the syntax tree from the parser.`, `Derivation is not a compiler phase; it is the sequence of production steps that generates a string from a CFG (L4).`] },
          { type: `mcq`, q: `The following is not a part of a context free grammar:`, o: [`start symbol`, `non-terminal symbols`, `end symbol`, `terminal symbols`], a: 2, why: `A CFG is the 4-tuple (V, Σ, P, S): non-terminals, terminals, productions and a start symbol. There is no "end symbol" (L4).`, ow: [`The start symbol S is one of the four parts of a CFG (V, Σ, P, S).`, `The non-terminals V are one of the four parts of a CFG (V, Σ, P, S).`, null, `The terminals Σ are one of the four parts of a CFG (V, Σ, P, S).`] },
          { type: `mcq`, q: `When only one rightmost or only one leftmost parsing tree is produced for a sentence, the grammar is…`, o: [`ambiguous`, `unambiguous`, `static`, `dynamic`], a: 1, why: `A grammar is unambiguous when every sentence has exactly one leftmost (or one rightmost) derivation, i.e. one parse tree; ambiguous means more than one (L4).`, ow: [`Ambiguous is the opposite case: some sentence has MORE than one leftmost (or rightmost) derivation/parse tree (L4).`, null, `Static is a binding/scoping term (L8), not a property of grammars.`, `Dynamic is a binding/scoping term (L8), not a property of grammars.`] },
          { type: `mcq`, q: `Attributes that get their values from their child nodes of the syntax tree are called ……… attributes.`, o: [`static`, `dynamic`, `synthesized`, `inherited`], a: 2, why: `Synthesized attributes are computed from the attribute values of the node's children, so values flow up the tree (L7, attribute grammars).`, ow: [`"Static" describes binding/scoping fixed by the program text (L8), not a kind of attribute.`, `"Dynamic" describes binding resolved at run time (L8), not a kind of attribute.`, null, `Inherited attributes take their values from the parent and/or siblings, so values flow down or across the tree (L7).`] },
          { type: `mcq`, q: `……… is the input to syntax analysis phase.`, o: [`stream of tokens`, `syntax tree`, `annotated syntax tree`, `assembly code`], a: 0, why: `The parser's input is the stream of tokens produced by the scanner (lexical analyzer); its output is the syntax tree (L1, L4).`, ow: [null, `The syntax tree is the OUTPUT of syntax analysis and the input of semantic analysis.`, `The annotated syntax tree is the output of semantic analysis, two steps later.`, `Assembly code is produced at the end by the code generator (target code).`] },
          { type: `mcq`, q: `The rule A→Ab | c will cause the grammar to be…`, o: [`ambiguous`, `left recursive`, `dynamic`, `all of the mentioned`], a: 1, why: `A appears as the left-most symbol of its own production (L5).`, ow: [`Ambiguity needs some string with two parse trees; A → Ab | c generates c b* with exactly one tree each.`, null, `"Dynamic" is a binding term (L8), not a grammar property.`, `Only left recursion applies; the grammar is not ambiguous and "dynamic" is not a grammar property.`] },
          { type: `mcq`, q: `Attaching attributes to each nonterminal of the CFG will produce:`, o: [`annotated syntax tree`, `unambiguous CFG`, `ambiguous CFG`, `attribute grammar`], a: 3, why: `Revision sheet Q53: attribute grammar is generated by attaching attributes to each non-terminal of the CFG. The pencil mark on (a) is wrong: the annotated tree comes from evaluating the attributes on a tree.`, ow: [`The annotated syntax tree is obtained later by evaluating the attributes on a parse tree, not by attaching them to the grammar.`, `Attaching attributes does not change the grammar's productions, so it does not make the CFG unambiguous.`, `Attaching attributes does not change the grammar's productions, so it does not make the CFG ambiguous.`, null] },
          { type: `mcq`, q: `The following is a major difference between phases of compilers and interpreters:`, o: [`code optimization`, `intermediate code generation`, `semantic analysis`, `none of the mentioned`], a: 1, why: `Compilers generate intermediate object code; interpreters do not (L1 table).`, ow: [`Both compilers and interpreters can optimize code; the L1 table does not use this as the difference.`, null, `Both compilers and interpreters must do semantic checking, so it is not a difference.`, `There is a difference in the L1 table: compilers generate intermediate object code, interpreters do not.`] },
          { type: `mcq`, q: `The process of generating tokens is typically described using………`, o: [`finite automata`, `regular expressions`, `syntax directed translation`, `a and b`], a: 3, why: `Regular expressions specify tokens; finite automata recognize them (L2).`, ow: [`Finite automata are only half: they recognize tokens, while regular expressions specify the token patterns (L2).`, `Regular expressions are only half: they specify the patterns, while finite automata implement the recognizer (L2).`, `Syntax-directed translation attaches semantic rules to CFG productions (L7); it is not used for tokens.`, null] },
          { type: `mcq`, q: `The following condition will cause any automaton to be NFA:`, o: [`having an ε`, `having more than one accept state`, `having loops`, `all of the mentioned`], a: 0, why: `Loops and several accept states are allowed in DFAs (L3).`, ow: [null, `A DFA may have several accept states; that alone does not make it nondeterministic (L3).`, `A DFA may have loops (e.g. a self-loop on a state); loops do not make it an NFA (L3).`, `Only ε-transitions force an NFA; several accept states and loops are allowed in DFAs.`] },
          { type: `mcq`, q: `The lexical analyzer takes …… as input and produces a list of ……. as output`, o: [`machine code, tokens`, `tokens, source code`, `source code, tokens`, `a and b`], a: 2, why: `The lexical analyzer (scanner) reads the source program's characters and groups them into lexemes, producing a stream of tokens for the parser (L2).`, ow: [`Machine code is the final output of the whole compiler, not the input of the lexical analyzer.`, `Reversed: tokens are the scanner's output, and source code is its input.`, null, `(b) is reversed, so "a and b" cannot be right; only source code → tokens is correct.`] }
        ]},
        { title: `Q2-II · True or False`, marks: `5 marks`, items: [
          { type: `tf`, q: `Dynamic object binding is done based on the structure of the parsing tree such as braces.`, a: 1, why: `That is STATIC binding. Dynamic binding uses the most recently executed declaration (L8).`, ow: [`Scoping by the structure of the tree (braces) is STATIC binding; dynamic binding uses the most recently executed declaration at run time (L8).`, null] },
          { type: `tf`, q: `(X | Y)* is equivalent to X* | Y*.`, a: 1, why: `(X|Y)* contains mixed strings such as XY, while X*|Y* contains only strings of all X's or all Y's, so they differ (L2).`, ow: [`(X|Y)* includes mixed strings such as XY, but X*|Y* contains only all-X or all-Y strings, so they are not equal (L2).`, null] },
          { type: `tf`, q: `A leftmost parsing tree grows from the left side.`, a: 1, why: `The doctor's revision-sheet key (Q52) says a leftmost parsing tree grows from the RIGHT side, so answer False. (The lectures don't state this rule directly.)`, ow: [`The revision-sheet key (Q52) used by the professor says a leftmost parsing tree grows from the RIGHT side, so this statement is False.`, null] },
          { type: `tf`, q: `Combine operations is one of the techniques of code optimization.`, a: 0, why: `It is one of the three peephole techniques (L9). The pencil ✗ on the scan is wrong.`, ow: [null, `Combine operations is one of the three peephole techniques in L9 (with redundant load/store elimination and constant folding).`] },
          { type: `tf`, q: `SDT is the process of using context free grammar along the syntax tree to get annotated syntax tree.`, a: 0, why: `SDT attaches rules to CFG productions and evaluates them on the tree, giving the annotated syntax tree (L7; revision sheet T/F 13).`, ow: [null, `SDT does produce the annotated syntax tree: semantic rules attached to CFG productions are evaluated on the tree (L7).`] }
        ]}
      ]
    },
    {
      title: `Final Exam 2024/2025 (50 marks)`,
      meta: `CS309 Compiler Theory · 1st term · 2 hours · 50 marks · Dr. Lamia Hassaan, Dr. Ahmed Ibrahim`,
      note: `No official answer key was published. The answers are worked out from the lectures and the doctor's final revision sheet (which contains most of these MCQs with answers).`,
      sections: [
        { title: `Q1-I · Choose the correct answer`, marks: `10 marks · 1 each`, items: [
          { type: `mcq`, q: `Inherited attributes get their attribute values from`, o: [`child nodes`, `leaves nodes`, `parent nodes`, `semantic nodes`], a: 2, why: `Inherited attributes take their values from the parent node and/or sibling nodes, so values flow down the tree (L7; sheet Q42).`, ow: [`Getting values from child nodes describes SYNTHESIZED attributes, not inherited ones (L7).`, `Leaves hold terminals whose attributes usually come from the lexer; inherited attributes come from the parent/siblings.`, null, `"Semantic nodes" is not a term in the course; inherited values come from the parent and/or siblings (L7).`] },
          { type: `mcq`, q: `The phase Syntax Analysis is modeled on the basis of……….`, o: [`high level language`, `low level language`, `context free grammar`, `Regular grammar`], a: 2, why: `Syntax analysis is based on a context-free grammar: the parser checks the token stream against the CFG productions and builds the parse tree (L4).`, ow: [`The high-level language is the source being analyzed, not the formal model the parser is built on.`, `Low-level (machine) language is the target of the compiler, not the model of syntax analysis.`, null, `Regular grammars/expressions model lexical analysis (tokens, L2); they cannot describe nested syntax such as balanced parentheses.`] },
          { type: `mcq`, q: `Parsing is also called………analysis`, o: [`semantic`, `lexical`, `syntax`, `none of the mentioned`], a: 2, why: `Parsing is another name for syntax analysis, phase 2: it checks the token stream against the grammar and builds the parse tree (L4).`, ow: [`Semantic analysis is phase 3: it checks meaning (types, declarations) on the syntax tree after parsing.`, `Lexical analysis is scanning (phase 1), which produces the tokens that the parser then reads.`, null, `Parsing has a name in the list: it is syntax analysis (L4).`] },
          { type: `mcq`, q: `Compiler translates the source code to……….`, o: [`machine code`, `executable code`, `binary code`, `both a and c`], a: 3, why: `Revision sheet Q12 key: both A and C. The compiler translates source code into machine code, and machine code is binary code (L1).`, ow: [`Machine code alone is only half of the key; the revision-sheet key (Q12) is "both a and c" since machine code is binary code.`, `The revision-sheet key (Q12) does not choose executable code; the compiler output named there is machine (binary) code.`, `Binary code alone is only half of the key; machine code and binary code are the same thing, so the key is "both a and c".`, null] },
          { type: `mcq`, q: `The lexical analyzer takes ……. as input and produces a list of …….as output`, o: [`machine code, tokens`, `tokens, source code`, `source code, tokens`, `both a and b`], a: 2, why: `The lexical analyzer (scanner) reads the source program's characters and groups them into lexemes, producing a stream of tokens for the parser (L2).`, ow: [`Machine code is the final output of the whole compiler, not the input of the lexical analyzer.`, `Reversed: tokens are the scanner's output, and source code is its input.`, null, `(b) is reversed, so "both a and b" cannot be right; only source code → tokens is correct.`] },
          { type: `mcq`, q: `………… is not a phase of a compiler`, o: [`Scanner`, `Symbol table`, `Parser`, `Code optimizer`], a: 1, why: `The symbol table is a data structure shared by all the phases, not a phase itself; scanner, parser and code optimizer are phases (L1).`, ow: [`The scanner is the lexical analyzer, phase 1 of the compiler.`, null, `The parser is the syntax analyzer, phase 2 of the compiler.`, `The code optimizer is a phase (source code optimizer and target code optimizer, L1).`] },
          { type: `mcq`, q: `What does a syntax analyzer do?`, o: [`maintain symbol table`, `collect data types`, `create parsing tree`, `none of the mentioned`], a: 2, why: `The syntax analyzer (parser) checks the tokens against the grammar and creates the parse (syntax) tree (L4; sheet Q27).`, ow: [`The symbol table is maintained by all the phases together; it is not the job that defines the syntax analyzer.`, `Collecting type information is done during semantic analysis (type checking), not syntax analysis.`, null, `The syntax analyzer does have a defining job: creating the parse tree.`] },
          { type: `mcq`, q: `One or more parse tree for some sentence, that is ………grammar.`, o: [`unambiguous`, `ambiguous`, `a or b`, `none of the mentioned`], a: 1, why: `Revision sheet Q28 key: ambiguous (the intended meaning is "more than one").`, ow: [`Unambiguous means exactly one parse tree for every sentence, not more than one.`, null, `The two are opposites, so "a or b" cannot be the definition; more than one tree means ambiguous.`, `One of the options fits: more than one parse tree for a sentence means the grammar is ambiguous (L4).`] },
          { type: `mcq`, q: `A compiler needs …….. types of storage`, o: [`two`, `three`, `four`, `five`], a: 1, why: `The compiler uses three types of storage allocation: static (globals, fixed at compile time), stack (activation records) and heap (dynamic data) (L9).`, ow: [`Two misses one of the three: static, stack and heap allocation (L9).`, null, `There are only three: static, stack and heap (L9).`, `There are only three: static, stack and heap (L9).`] },
          { type: `mcq`, q: `Grammar of the programming is checked at ……… phase of compiler.`, o: [`Syntax analysis`, `Semantic analysis`, `Code generation`, `Code optimization`], a: 0, why: `Syntax analysis checks that the token stream follows the grammar (CFG) of the programming language and builds the parse tree (L4).`, ow: [null, `Semantic analysis checks meaning (types, declarations, scope) after the grammar has already been checked.`, `Code generation produces target code from intermediate code; it does not check the grammar.`, `Code optimization improves the code's speed/size; it assumes the program is already grammatically correct.`] }
        ]},
        { title: `Q1-II · True or False`, marks: `10 marks · 1 each`, items: [
          { type: `tf`, q: `Derivation can only be started with the start symbol of the context free grammar.`, a: 0, why: `Strings are derived from the start symbol (L4).`, ow: [null, `Every derivation starts from the start symbol S; the language of the grammar is the set of strings derived from S (L4).`] },
          { type: `tf`, q: `Any loop causes the automaton to be nondeterministic.`, a: 1, why: `Only a loop followed by a transition on the SAME symbol does; DFAs can have loops (L3).`, ow: [`A DFA may contain loops; only a loop on a symbol followed by another transition on the SAME symbol makes it nondeterministic (L3).`, null] },
          { type: `tf`, q: `Testing is not a phase of compilers.`, a: 0, why: `The compiler phases are lexical, syntax and semantic analysis, intermediate code generation, optimization and code generation; testing is a software-engineering activity (L1).`, ow: [null, `Testing is not in the L1 phase list (lexical, syntax, semantic analysis, intermediate code, optimization, code generation).`] },
          { type: `tf`, q: `The expression aε = εa = ε.`, a: 1, why: `aε = εa = a; ε is the neutral element for concatenation (L2).`, ow: [`ε is the identity for concatenation: aε = εa = a, not ε (L2 algebraic properties).`, null] },
          { type: `tf`, q: `A leftmost parsing tree grows from the right hand side.`, a: 0, why: `Matches the professor's revision-sheet key (Q52), which says a leftmost parsing tree grows from the right side. The lectures do not state this rule directly.`, ow: [null, `The revision-sheet key (Q52) used by the professor says a leftmost parsing tree grows from the RIGHT side, so the statement is True.`] },
          { type: `tf`, q: `Interpreters generate intermediate code.`, a: 1, why: `Interpreters generate no intermediate object code (L1).`, ow: [`In the L1 comparison table, compilers generate intermediate object code and interpreters do not.`, null] },
          { type: `tf`, q: `Synthesized attributes are attributes that get values from the attribute values of their child.`, a: 0, why: `Synthesized attributes are computed from the attribute values of the node's children, so values flow up the tree (L7).`, ow: [null, `That is exactly the L7 definition of synthesized attributes; values from the parent/siblings would be inherited.`] },
          { type: `tf`, q: `A compiler indicates the syntax and runtime errors.`, a: 1, why: `A compiler reports syntax errors; runtime errors appear only during execution (revision sheet Q29 key: syntax only).`, ow: [`A compiler reports syntax errors at compile time, but runtime errors only appear while the program executes (sheet Q29 key: syntax only).`, null] },
          { type: `tf`, q: `Compilers take long time to execute source code.`, a: 1, why: `Compilers take long to ANALYZE, but execution is faster (L1; sheet T/F 2 = False).`, ow: [`Compilers take a long time to ANALYZE the source, but the compiled program executes faster than with an interpreter (L1).`, null] },
          { type: `tf`, q: `Order is not important in concatenation operation of two alphabets.`, a: 1, why: `Concatenation is not commutative: L1L2 puts strings of L1 first, so in general L1L2 ≠ L2L1 (e.g. ab ≠ ba) (L2).`, ow: [`Concatenation is not commutative: in general L1L2 ≠ L2L1, e.g. {a}{b} = {ab} but {b}{a} = {ba} (L2).`, null] }
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
          { type: `mcq`, q: `A compiler indicates the ………error.`, o: [`syntax`, `logic`, `runtime`, `all of the mentioned`], a: 0, why: `A compiler detects and reports syntax errors while analyzing the program; logic and runtime errors are not caught at compile time (revision sheet Q29 key: syntax).`, ow: [null, `Logic errors give wrong results from valid code; the compiler cannot know what the programmer meant, so it cannot report them.`, `Runtime errors (e.g. division by zero) appear only while the program executes, after compilation.`, `Only syntax errors are reported by the compiler in the revision-sheet key (Q29); logic and runtime errors are not.`] },
          { type: `mcq`, q: `Parsing is also called………analysis`, o: [`semantic`, `lexical`, `syntax`, `none of the mentioned`], a: 2, why: `Parsing is another name for syntax analysis, phase 2: it checks the token stream against the grammar and builds the parse tree (L4).`, ow: [`Semantic analysis is phase 3: it checks meaning (types, declarations) on the syntax tree after parsing.`, `Lexical analysis is scanning (phase 1), which produces the tokens that the parser then reads.`, null, `Parsing has a name in the list: it is syntax analysis (L4).`] },
          { type: `mcq`, q: `Keywords are recognized in a compiler during…………`, o: [`code generation`, `data flow analysis`, `lexical analysis`, `program parsing`], a: 2, why: `Keywords such as if, while and int are tokens; the lexical analyzer recognizes them while grouping characters into lexemes (L2).`, ow: [`Code generation is the last phase; by then keywords were recognized long ago, as tokens in lexical analysis.`, `Data-flow analysis is part of optimization; it works on intermediate code, not on keywords in the source text.`, null, `The parser receives keywords already recognized as tokens by the scanner; it checks their order against the grammar.`] },
          { type: `mcq`, q: `Symbol table can be used for……………`, o: [`storage allocation`, `code execution`, `context free grammar`, `none`], a: 0, why: `Revision sheet Q10: storage allocation, type checking, suppressing duplicate errors. Only storage allocation appears here.`, ow: [null, `The symbol table is a compile-time structure; executing the code is not one of its uses (sheet Q10: storage allocation, type checking, suppressing duplicate errors).`, `A context-free grammar specifies the syntax (L4); the symbol table stores names and their attributes, not grammar rules.`, `One option is a listed use: storage allocation (revision sheet Q10).`] },
          { type: `mcq`, q: `Grammar of the programming is checked at ………… phase of compiler.`, o: [`syntax analysis`, `semantic analysis`, `code generation`, `code optimization`], a: 0, why: `Syntax analysis checks that the token stream follows the grammar (CFG) of the programming language and builds the parse tree (L4).`, ow: [null, `Semantic analysis checks meaning (types, declarations, scope) after the grammar has already been checked.`, `Code generation produces target code from intermediate code; it does not check the grammar.`, `Code optimization improves the code's speed/size; it assumes the program is already grammatically correct.`] },
          { type: `mcq`, q: `The following is not a phase of a compiler`, o: [`syntax analysis`, `semantic analysis`, `testing`, `optimization`], a: 2, why: `Testing is a software-engineering activity, not a compiler phase; syntax analysis, semantic analysis and optimization are all phases (L1).`, ow: [`Syntax analysis (parsing) is phase 2 of the compiler.`, `Semantic analysis is phase 3 of the compiler, producing the annotated syntax tree.`, null, `Optimization is a phase: the source code optimizer and the target code optimizer (L1).`] },
          { type: `mcq`, q: `Non-leaf nodes of a syntax tree represent…….`, o: [`nonterminal symbols`, `terminal symbols`, `start symbols`, `none`], a: 0, why: `Interior (non-leaf) nodes of a syntax/parse tree are non-terminals, each expanded by a production; leaves are terminals (L4).`, ow: [null, `Terminal symbols are the LEAVES of the tree; they are never expanded.`, `The start symbol is only the root, one non-leaf node; all non-leaf nodes are non-terminals.`, `One option fits: every interior (non-leaf) node is a non-terminal expanded by a production (L4).`] },
          { type: `mcq`, q: `The automaton with ε symbol is said to be……`, o: [`DFA`, `NFA`, `FFA`, `none`], a: 1, why: `An ε-transition lets the automaton move without reading input, which is nondeterministic, so an automaton with ε is an NFA (L3).`, ow: [`A DFA has exactly one move per state and input symbol and no ε-moves (L3).`, null, `"FFA" is not a type of automaton in the course; the two types are DFA and NFA (L3).`, `One option fits: an ε-transition makes the automaton an NFA (L3).`] },
          { type: `mcq`, q: `A compiler needs …….. types of storage`, o: [`two`, `three`, `four`, `five`], a: 1, why: `The compiler uses three types of storage allocation: static (globals, fixed at compile time), stack (activation records) and heap (dynamic data) (L9).`, ow: [`Two misses one of the three: static, stack and heap allocation (L9).`, null, `There are only three: static, stack and heap (L9).`, `There are only three: static, stack and heap (L9).`] },
          { type: `mcq`, q: `The following is not a method of optimization`, o: [`constant folding`, `combine operations`, `a and b`, `annotated syntax tree`], a: 3, why: `Constant folding and combine operations are peephole techniques (L9).`, ow: [`Constant folding (e.g. replacing 2*3 by 6 at compile time) is a peephole optimization technique (L9).`, `Combine operations is one of the three peephole techniques (L9).`, `Both constant folding and combine operations ARE optimization methods, so they are not the answer.`, null] }
        ]},
        { title: `Q1-II · True or False`, marks: `10 marks · 1 each`, items: [
          { type: `tf`, q: `The expression Yε ≠ εY.`, a: 1, why: `ε is the identity element for concatenation, so Yε = εY = Y and the two sides are equal (L2 algebraic properties).`, ow: [`ε is the identity for concatenation: Yε = εY = Y, so the two sides are equal (L2).`, null] },
          { type: `tf`, q: `Leftmost derivation is the inverse of rightmost derivation.`, a: 1, why: `They differ only in which non-terminal is replaced first; neither is the inverse of the other. Bottom-up parsers produce a rightmost derivation IN REVERSE (L4).`, ow: [`Leftmost and rightmost derivations differ only in which non-terminal is replaced first; neither reverses the other (L4).`, null] },
          { type: `tf`, q: `The problem of using a symbol table per scope is memory overhead.`, a: 0, why: `Each hash table has memory overhead, so one table per scope is memory-inefficient (and several tables may need searching); a single table is the fix (L8).`, ow: [null, `L8 names memory overhead (plus several searches) as exactly the problem of one symbol table per scope.`] },
          { type: `tf`, q: `The regular expressions (a)|((b)*(c)) and b*c | a are equivalent.`, a: 0, why: `The parentheses are redundant and | is commutative (L2).`, ow: [null, `The parentheses add nothing and | is commutative, so (a)|((b)*(c)) = a | b*c = b*c | a (L2).`] },
          { type: `tf`, q: `Conversion of NFA into DFA is possible.`, a: 0, why: `Every NFA can be converted into an equivalent DFA by the subset construction, using ε-closures and move sets (L3).`, ow: [null, `L3 converts NFAs to DFAs with the subset construction; every NFA has an equivalent DFA.`] },
          { type: `tf`, q: `Derivation must be started by the start symbol of the context free grammar.`, a: 0, why: `Every derivation begins from the start symbol S; the language of a CFG is the set of terminal strings derivable from S (L4).`, ow: [null, `A derivation of a sentence always starts at the start symbol S; that is how the language of the grammar is defined (L4).`] },
          { type: `tf`, q: `Interpreters generate intermediate code.`, a: 1, why: `In the L1 comparison table, compilers generate intermediate object code while interpreters generate none, so the statement is False (L1).`, ow: [`In the L1 table, interpreters generate no intermediate object code; compilers do.`, null] },
          { type: `tf`, q: `Inherited attributes get their attribute values from parent nodes.`, a: 0, why: `Inherited attributes take their values from the parent and/or sibling nodes (L7; sheet Q42).`, ow: [null, `That is the L7 definition: inherited attributes come from the parent (and/or siblings); values from children would be synthesized.`] },
          { type: `tf`, q: `Epsilon transition causes a change of the regular expression accepted by an automaton.`, a: 1, why: `ε is the empty string; it consumes no input and sε = s, so it does not change the accepted expression. (Our answer; no key.)`, ow: [`ε is the empty string and consumes no input; since sε = s, an ε-move does not change the language accepted.`, null] },
          { type: `tf`, q: `Regular expression a|b denotes the set {a, b}.`, a: 0, why: `The alternation a|b denotes the union of the languages {a} and {b}, i.e. the set {a, b} (L2).`, ow: [null, `a|b means a OR b: the union {a} ∪ {b} = {a, b} (L2).`] }
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
          { type: `mcq`, q: `……… is the input to semantic analysis phase`, o: [`stream of tokens`, `syntax tree`, `annotated syntax tree`, `assembly code`], a: 1, why: `In the L1 phase chain, the parser outputs the syntax tree and semantic analysis takes it as input, producing the annotated syntax tree.`, ow: [`The stream of tokens is the input of syntax analysis, one phase earlier.`, null, `The annotated syntax tree is the OUTPUT of semantic analysis (input of the code optimizer/intermediate code).`, `Assembly code is produced at the very end by the code generator.`] },
          { type: `mcq`, q: `The lexical analyzer takes …… as input and produces a list of …… as output`, o: [`Machine code, tokens`, `Tokens, source code`, `Source code, tokens`, `Both a and b`], a: 2, why: `The lexical analyzer (scanner) reads the source program's characters and groups them into lexemes, producing a stream of tokens for the parser (L2).`, ow: [`Machine code is the final output of the whole compiler, not the input of the lexical analyzer.`, `Reversed: tokens are the scanner's output, and source code is its input.`, null, `(b) is reversed, so "both a and b" cannot be right; only source code → tokens is correct.`] },
          { type: `mcq`, q: `When only one rightmost parsing tree is produced for some sentence, that is ………grammar.`, o: [`ambiguous`, `unambiguous`, `a or b`, `None of the mentioned`], a: 1, why: `A grammar is unambiguous when every sentence has exactly one rightmost (or one leftmost) derivation, i.e. one parse tree (L4).`, ow: [`Ambiguous means some sentence has MORE than one rightmost (or leftmost) derivation/parse tree (L4).`, null, `Ambiguous and unambiguous are opposites; exactly one tree can only mean unambiguous.`, `One option fits: a single rightmost tree per sentence means the grammar is unambiguous.`] },
          { type: `mcq`, q: `Which part of the compiler highly used the grammar concept?`, o: [`Code optimization`, `Code generation`, `Lexical analysis`, `Parser`], a: 3, why: `The parser (syntax analyzer) is built from the context-free grammar: it checks the tokens against the CFG productions and builds the parse tree (L4; sheet Q17).`, ow: [`Code optimization works on intermediate or target code to improve speed/size; it does not use the grammar.`, `Code generation maps intermediate code to target code; grammar rules are not its basis.`, `Lexical analysis uses regular expressions and finite automata (L2), not the context-free grammar.`, null] },
          { type: `mcq`, q: `Interior nodes of a parsing tree indicate ………. of a context free grammar`, o: [`non-terminal symbols`, `terminal symbols`, `start symbol`, `production rules`], a: 0, why: `Interior nodes of a parse tree are non-terminals, each expanded by a production into its children; the leaves are terminals (L4).`, ow: [null, `Terminals are the LEAVES of the parse tree, not the interior nodes.`, `The start symbol is only the root; the other interior nodes are other non-terminals.`, `Productions are not node labels; an interior node with its children shows one production being applied.`] },
          { type: `mcq`, q: `A compiler indicates the ……… error.`, o: [`logic`, `runtime`, `syntax`, `b & c`], a: 2, why: `The compiler detects syntax errors while analyzing the program; logic and runtime errors show up only when the program runs (sheet Q29 key: syntax).`, ow: [`Logic errors give wrong results from valid code; the compiler cannot know the intended meaning, so it does not report them.`, `Runtime errors (e.g. division by zero) appear only during execution, after compilation.`, null, `Runtime errors are not compiler-detected, so "b & c" fails; only syntax errors are (sheet Q29).`] },
          { type: `mcq`, q: `A leftmost parsing tree grows from the ……. side`, o: [`left`, `equal sides`, `right`, `the side cannot be determined`], a: 2, why: `The professor's revision-sheet key (Q52) says a leftmost parsing tree grows from the right side. The lectures do not state this rule directly.`, ow: [`The revision-sheet key (Q52) says right, not left.`, `The revision-sheet key (Q52) names one side, the right.`, null, `The revision-sheet key (Q52) does give a side: the right.`] },
          { type: `mcq`, q: `…… is done based on the structure of the parsing tree such as braces`, o: [`Static binding`, `Dynamic binding`, `All types of binding`, `none of the mentioned`], a: 0, why: `Static binding follows the syntax-tree structure (L8; sheet Q45). The pencil mark on (b) is wrong.`, ow: [null, `Dynamic binding uses the most recently executed declaration at run time, not the structure of the tree (L8).`, `Only static binding follows the tree structure; dynamic binding follows execution order (L8).`, `One option fits: static binding is based on the syntax-tree structure such as braces (L8).`] },
          { type: `mcq`, q: `SDT is an abbreviation of ………`, o: [`Semantic Directed Translation`, `Syntax Directed Translation`, `Syntax Double Translation`, `Semantic Directed Table`], a: 1, why: `SDT stands for Syntax Directed Translation: semantic rules attached to the CFG productions drive the translation (L7).`, ow: [`The first word is Syntax: translation is directed by the grammar's syntax (productions), not by "semantics".`, null, `"Double" is wrong: SDT is Syntax DIRECTED Translation (L7).`, `Both words are wrong: SDT is Syntax Directed Translation, not a table (L7).`] },
          { type: `mcq`, q: `A phase of the compiler that aims at minimizing memory usage and maximizing speed of processing is…`, o: [`code optimization`, `syntax analysis`, `semantic analysis`, `none of the mentioned`], a: 0, why: `Code optimization improves the intermediate/target code so the program runs faster and uses less memory, without changing its output (L1, L9).`, ow: [null, `Syntax analysis checks the grammar and builds the parse tree; it does not improve speed or memory use.`, `Semantic analysis checks meaning (types, declarations); it does not improve speed or memory use.`, `One option fits: code optimization has exactly this goal (L1, L9).`] }
        ]},
        { title: `Q1-II · True or False`, marks: `10 marks`, items: [
          { type: `tf`, q: `Derivation can only be started with the start symbol of the context free grammar.`, a: 0, why: `Every derivation begins from the start symbol S; the language of a CFG is the set of terminal strings derivable from S (L4).`, ow: [null, `A derivation of a sentence always starts at the start symbol S; that is how the language of the grammar is defined (L4).`] },
          { type: `tf`, q: `(X | Y)* is equivalent to X* | Y*.`, a: 1, why: `(X|Y)* contains mixed strings such as XY, while X*|Y* contains only strings of all X's or all Y's, so they differ (L2).`, ow: [`(X|Y)* includes mixed strings such as XY, but X*|Y* contains only all-X or all-Y strings, so they are not equal (L2).`, null] },
          { type: `tf`, q: `Symbol table is a phase of a compiler.`, a: 1, why: `It is a data structure used by the phases (L1).`, ow: [`The symbol table is a data structure shared by all the phases, not a phase of the compiler (L1).`, null] },
          { type: `tf`, q: `A DFA may contain a loop or more.`, a: 0, why: `A DFA may contain loops; e.g. the DFA for 1*01(0|1)* has a 1-loop on q0 and a 0,1-loop on the final state (L2/L3).`, ow: [null, `Loops do not make an automaton nondeterministic; the DFA for 1*01(0|1)* has two loops (L2/L3).`] },
          { type: `tf`, q: `Code optimization is applied on assembly code and source code.`, a: 0, why: `Source code optimizer + target code optimizer (L1).`, ow: [null, `L1 lists both a source code optimizer (on intermediate code) and a target code optimizer (on assembly/target code).`] },
          { type: `tf`, q: `LL(1) can be applied on left recursive context free grammar.`, a: 1, why: `Left recursion causes an infinite loop in top-down parsers; remove it first (L5–6).`, ow: [`A left-recursive production makes a top-down (LL(1)) parser loop forever; left recursion must be removed first (L5–6).`, null] },
          { type: `tf`, q: `Tokens are generated by syntax analysis.`, a: 1, why: `Tokens are produced by lexical analysis (the scanner); syntax analysis consumes them to build the parse tree (L2).`, ow: [`Syntax analysis consumes tokens; they are produced earlier by lexical analysis (the scanner) (L2).`, null] },
          { type: `tf`, q: `Peephole optimization is a type of code optimization performed on a small part of the code called "window".`, a: 0, why: `Peephole optimization works on a small set of instructions called the peephole or window, replacing it with shorter/faster code (L9).`, ow: [null, `That is the L9 definition: optimization on a small part of the code, the peephole or "window".`] },
          { type: `tf`, q: `Semantic analysis produces semantic table.`, a: 1, why: `It produces the annotated syntax tree (L1, L7).`, ow: [`Semantic analysis produces the annotated syntax tree; there is no "semantic table" output (L1, L7).`, null] },
          { type: `tf`, q: `Attributes that get their values from parent nodes are called synthesized attributes.`, a: 1, why: `Those are inherited; synthesized come from the children (L7).`, ow: [`Values from parent nodes define INHERITED attributes; synthesized attributes get their values from the children (L7).`, null] }
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
          { type: `mcq`, q: `Code optimization is done twice on …… code and ……. code within the phases of a compiler.`, o: [`source, machine`, `source, assembly`, `assembly, machine`, `source, binary`], a: 1, why: `Source code optimizer and target code optimizer; the lecture's target code is assembly (MOV, MUL…) (L1).`, ow: [`The second optimization is done on the target code, which in the lecture is assembly (MOV, MUL …), not raw machine code.`, null, `The first optimization is on the source side (intermediate code from the source optimizer), not on assembly; the second is on assembly.`, `The second optimization is on the target (assembly) code; binary/machine code is not where the lecture's target optimizer works.`] },
          { type: `mcq`, q: `The following is not a part of a context free grammar:`, o: [`start symbol`, `non-terminal symbols`, `end symbol`, `terminal symbols`], a: 2, why: `A CFG is the 4-tuple (V, Σ, P, S): non-terminals, terminals, productions and a start symbol. There is no "end symbol" (L4).`, ow: [`The start symbol S is one of the four parts of a CFG (V, Σ, P, S).`, `The non-terminals V are one of the four parts of a CFG (V, Σ, P, S).`, null, `The terminals Σ are one of the four parts of a CFG (V, Σ, P, S).`] },
          { type: `mcq`, q: `Keywords are recognized in a compiler during……….`, o: [`code generation`, `lexical analysis`, `semantic analysis`, `derivation`], a: 1, why: `Keywords such as if, while and int are tokens; the lexical analyzer recognizes them while grouping characters into lexemes (L2).`, ow: [`Code generation is the last phase; keywords were recognized long before, as tokens in lexical analysis.`, null, `Semantic analysis checks meaning (types, declarations) on the syntax tree; keywords already arrived as tokens.`, `Derivation is a grammar notion (rewriting with productions, L4), not the step that recognizes keywords.`] },
          { type: `mcq`, q: `The following is not one of the phases of the compiler:`, o: [`Syntax analysis`, `Semantic analysis`, `Symbol Table`, `Lexical analysis`], a: 2, why: `The symbol table is a data structure shared by all the phases, not a phase itself; lexical, syntax and semantic analysis are phases (L1).`, ow: [`Syntax analysis (parsing) is phase 2 of the compiler.`, `Semantic analysis is phase 3 of the compiler.`, null, `Lexical analysis (scanning) is phase 1 of the compiler.`] },
          { type: `mcq`, q: `Leaf nodes of a parsing tree indicate………. of a context free grammar`, o: [`non-terminal symbols`, `terminal symbols`, `start symbol`, `production rules`], a: 1, why: `The leaves of a parse tree are terminals; reading them left to right gives the derived sentence. Interior nodes are non-terminals (L4).`, ow: [`Non-terminals are the INTERIOR nodes, each expanded by a production; they are never leaves of a complete tree.`, null, `The start symbol labels the root of the parse tree, not the leaves.`, `Productions are not node labels; an interior node with its children shows one production being applied.`] },
          { type: `mcq`, q: `A compiler does not indicate the ………error.`, o: [`syntax`, `logic`, `runtime`, `b & c`], a: 3, why: `A compiler indicates syntax errors only; logic and runtime errors show up at execution.`, ow: [`Syntax errors ARE indicated by the compiler (sheet Q29), so they are not the answer.`, `Logic errors are indeed not indicated, but runtime errors are not either, so the full answer is "b & c".`, `Runtime errors are indeed not indicated, but logic errors are not either, so the full answer is "b & c".`, null] },
          { type: `mcq`, q: `When only one leftmost parsing tree is produced for some sentence, that is ………grammar.`, o: [`ambiguous`, `unambiguous`, `a or b`, `None of the mentioned`], a: 1, why: `A grammar is unambiguous when every sentence has exactly one leftmost (or one rightmost) derivation, i.e. one parse tree (L4).`, ow: [`Ambiguous means some sentence has MORE than one leftmost (or rightmost) derivation/parse tree (L4).`, null, `Ambiguous and unambiguous are opposites; exactly one tree can only mean unambiguous.`, `One option fits: a single leftmost tree per sentence means the grammar is unambiguous.`] },
          { type: `mcq`, q: `Semantic analysis uses …….. grammar in order to transform …….. tree into ……… tree`, o: [`context free, syntax, annotated syntax`, `attribute, semantic, syntax`, `attribute, syntax, annotated syntax`, `context free, syntax, semantic`], a: 2, why: `Semantic analysis uses an attribute grammar (CFG + attributes + semantic rules) to turn the syntax tree into the annotated syntax tree (L7).`, ow: [`A plain CFG has no attributes or semantic rules, so it cannot annotate the tree; semantic analysis needs an attribute grammar.`, `The order is wrong: the input is the syntax tree and the output is the annotated syntax tree, not a "semantic" tree.`, null, `A plain CFG cannot annotate, and the output is called the annotated syntax tree, not a "semantic tree" (L7).`] },
          { type: `mcq`, q: `……………. is the input to syntax analysis phase`, o: [`stream of tokens`, `syntax tree`, `annotated syntax tree`, `assembly code`], a: 0, why: `The parser's input is the stream of tokens produced by the scanner; its output is the syntax tree (L1 phase chain).`, ow: [null, `The syntax tree is the OUTPUT of syntax analysis and the input of semantic analysis.`, `The annotated syntax tree is the output of semantic analysis, two steps later.`, `Assembly code is produced at the end by the code generator (target code).`] },
          { type: `mcq`, q: `A compiler uses stack memory allocation for the following:`, o: [`static allocation of objects`, `procedures & functions calling`, `allocation of the code itself`, `a & b`], a: 1, why: `Stack allocation holds activation records (locals, parameters, return addresses) created on procedure/function calls and freed on return (L9).`, ow: [`Objects with a fixed size and lifetime use STATIC allocation, decided at compile time, not the stack.`, null, `The code itself is placed in the static (text) area, not on the stack.`, `(a) is static allocation, not stack, so "a & b" fails; only procedure/function calls use the stack.`] }
        ]},
        { title: `Q1-II · True or False`, marks: `10 marks`, items: [
          { type: `tf`, q: `Static object binding is done based on the structure of the parsing tree such as braces.`, a: 0, why: `Static binding resolves names using the structure of the syntax tree (braces/blocks), from the program text alone, at compile time (L8).`, ow: [null, `That is the L8 definition of static binding: scoping follows the tree structure such as braces.`] },
          { type: `tf`, q: `Any NFA must contain a loop.`, a: 1, why: `An NFA need not contain a loop: an ε-transition alone (or two moves on the same symbol) already makes it nondeterministic (L3).`, ow: [`An NFA need not have a loop; an ε-transition or two moves on the same symbol is enough to make it nondeterministic (L3).`, null] },
          { type: `tf`, q: `Union operation is one of the operations done on alphabets where order of the produced elements is important.`, a: 1, why: `Union is commutative: L1 ∪ L2 = L2 ∪ L1 (L2).`, ow: [`Union is commutative: L1 ∪ L2 = L2 ∪ L1, so order does not matter (concatenation is the order-sensitive operation) (L2).`, null] },
          { type: `tf`, q: `Any automaton must have only one accept state.`, a: 1, why: `An automaton may have several accept states; e.g. the DFAs built from NFAs in L3 often have more than one final state.`, ow: [`Several accept states are allowed; the DFA from the L3 NFA conversion has 3 final states out of 4.`, null] },
          { type: `tf`, q: `Code optimization is applied immediately after semantic analysis.`, a: 0, why: `"The earliest point of most optimization steps is just after semantic analysis" (L1).`, ow: [null, `L1 says the earliest point of most optimization steps is just after semantic analysis, on the annotated tree/intermediate code.`] },
          { type: `tf`, q: `A rightmost parsing tree grows from the left side.`, a: 0, why: `This is the mirror of the revision-sheet key "a leftmost parsing tree grows from the right side". Not stated directly in the lectures.`, ow: [null, `The course follows the revision-sheet convention (Q52: leftmost grows from the right), so a rightmost tree grows from the left: True.`] },
          { type: `tf`, q: `Constant folding is the only technique of code optimization.`, a: 1, why: `Also redundant load/store elimination, combine operations and loop optimization (L9).`, ow: [`L9 lists more techniques: redundant load/store elimination and combine operations (plus loop optimization), so constant folding is not the only one.`, null] },
          { type: `tf`, q: `Compiler uses fixed size and dynamic size storages as a part of its runtime environment.`, a: 0, why: `Static (fixed) plus stack and heap (grow and shrink) (L9).`, ow: [null, `The runtime environment does use both: static storage (fixed size) plus stack and heap, which grow and shrink at run time (L9).`] },
          { type: `tf`, q: `SDT is an abbreviation of Semantic Directed Translation.`, a: 1, why: `SDT stands for Syntax Directed Translation, not Semantic Directed Translation: semantic rules attached to CFG productions drive it (L7).`, ow: [`SDT stands for Syntax Directed Translation: rules attached to the grammar's productions drive it (L7).`, null] },
          { type: `tf`, q: `Attributes that get their values from child nodes are called synthesized attributes.`, a: 0, why: `Synthesized attributes are computed from the attribute values of the node's children, so values flow up the tree (L7).`, ow: [null, `That is exactly the L7 definition of synthesized attributes; values from the parent/siblings would be inherited.`] }
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

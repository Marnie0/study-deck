window.PAPERS = window.PAPERS || {};
PAPERS.compiler = {
  exams: [
    {
      title: `Final Exam 2021/2022`,
      meta: `CS309 Compiler Theory · 1st term 2021-2022 · 2 hours · 50 marks · 2 questions, 2 pages · Dr. Lamia Hassaan, Dr. Ahmed Ibrahim`,
      note: `No official answer key was published. The answers are worked out from the lectures and the doctor's final revision sheet. The scan (2 phone photos) is fully readable; shadows cover parts of both pages but no text is lost. Two things on the paper itself: MCQ 10's options do not match its question (a printing error, so the answer is "none of the mentioned"), and in Q2-c the self-loop on state 3 is clearly labelled <b>0</b> on this paper (the revision sheet and the 2024/25 paper draw the same NFA with the loop on <b>1</b>). Both versions are solved below.`,
      sections: [
        { title: `Q1-I · Choose the correct answer`, marks: `10 marks`, items: [
          { type: `mcq`, q: `The syntax analyzer takes ……. as input and produces ……. as output`, o: [`machine code, tokens`, `tokens, parsing tree`, `source code, tokens`, `Both a and b`], a: 1, why: `The parser receives the scanner's stream of tokens and builds a parse/syntax tree (L1 phase chain, L4). "Source code, tokens" describes the LEXICAL analyzer.`, ow: [`Machine code is produced at the very end by the code generator, and tokens are the parser's INPUT, not its output (L1 phase chain).`, null, `Source code in, tokens out describes the LEXICAL analyzer (scanner), the phase before the parser (L1, L2).`, `Neither a nor b is right: a mixes the code generator's output with tokens, and b describes the scanner, not the parser (L1).`] },
          { type: `mcq`, q: `One of the modeling criteria of lexical analysis phase is…..`, o: [`context free grammar`, `symbol table`, `finite automata`, `attribute grammar`], a: 2, why: `Tokens are specified by regular expressions and recognized by finite automata (L2). CFG models syntax analysis, attribute grammar models semantic analysis, and the symbol table is a data structure.`, ow: [`Context free grammar models SYNTAX analysis (the parser), not lexical analysis (L4).`, `The symbol table is a data structure shared by all phases, not a modeling criterion of the scanner (L1).`, null, `Attribute grammar models SEMANTIC analysis, which annotates the syntax tree (L7).`] },
          { type: `mcq`, q: `The following is a method of peephole optimization`, o: [`token optimization`, `constant folding`, `annotated tree optimization`, `NFA optimization`], a: 1, why: `L9 peephole techniques: redundant load/store elimination, constant folding, combine operations. The other options are made up.`, ow: [`There is no 'token optimization'; tokens belong to lexical analysis. L9 peephole techniques are redundant load/store elimination, constant folding, combine operations.`, null, `The annotated syntax tree is the semantic analyzer's output (L1), not a peephole technique. L9 lists redundant load/store elimination, constant folding, combine operations.`, `NFA-to-DFA conversion belongs to lexical analysis (L3), not peephole optimization, which works on a small window of generated code (L9).`] },
          { type: `mcq`, q: `When the variable is known with certainty to be assigned it is called`, o: [`definitely assigned`, `definitely known`, `indefinitely assigned`, `none of the mentioned`], a: 0, why: `L7 definite-assignment states: definitely assigned, definitely unassigned, unknown (revision sheet Q41).`, ow: [null, `'Definitely known' is not one of the definite-assignment states; the states are definitely assigned, definitely unassigned and unknown (revision sheet Q41-43).`, `'Indefinitely assigned' is not a state; a variable that may or may not be assigned is called 'unknown' (revision sheet Q43).`, `One option is correct: a variable known with certainty to be assigned is 'definitely assigned' (revision sheet Q41).`] },
          { type: `mcq`, q: `Leaf nodes in a parse tree indicate`, o: [`terminals`, `sub-terminals`, `half-terminals`, `non-terminals`], a: 0, why: `Leaves are terminals; interior nodes are non-terminals (L4).`, ow: [null, `There is no 'sub-terminal' in a CFG; symbols are only terminals (leaves) and non-terminals (interior nodes) (L4).`, `There is no 'half-terminal' in a CFG; leaves of a parse tree are terminals (L4).`, `Non-terminals are the interior nodes of a parse tree (the root is the start symbol); they are expanded into children, so they are not leaves (L4).`] },
          { type: `mcq`, q: `Annotated syntax tree is the output generated from …………phase`, o: [`syntax analysis`, `semantic analysis`, `lexical analysis`, `code optimizer`], a: 1, why: `The semantic analyzer turns the syntax tree into the annotated tree (L1; revision sheet Q36).`, ow: [`Syntax analysis outputs the plain syntax (parse) tree; the semantic analyzer then annotates it (L1 phase chain).`, null, `Lexical analysis outputs the stream of tokens, not a tree (L1, L2).`, `The code optimizer takes the annotated tree/intermediate code as INPUT and outputs optimized intermediate code (L1).`] },
          { type: `mcq`, q: `………. is not a phase of compiler.`, o: [`Syntax analysis`, `Testing`, `Lexical analysis`, `none of the mentioned`], a: 1, why: `Testing is not a compiler phase (L1; revision sheet Q30).`, ow: [`Syntax analysis (parsing) is the second phase of a compiler (L1 phase chain).`, null, `Lexical analysis (scanning) is the first phase of a compiler (L1 phase chain).`, `One option IS not a phase: testing is done on programs, not by the compiler (L1).`] },
          { type: `mcq`, q: `Which symbol is not a part of context-free grammar?`, o: [`End symbol`, `Start symbol`, `Non-terminal symbol`, `Terminal symbol`], a: 0, why: `A CFG is (V, Σ, P, S): non-terminals, terminals, productions, start symbol. There is no "end symbol" (L4; sheet Q23).`, ow: [null, `The start symbol S is one of the four parts of a CFG (V, T, P, S) (L4).`, `Non-terminals (variables, V) are one of the four parts of a CFG (L4).`, `Terminals (T, the tokens) are one of the four parts of a CFG (L4).`] },
          { type: `mcq`, q: `A compiler indicates the ……….error.`, o: [`syntax`, `logic`, `runtime`, `all of the mentioned`], a: 0, why: `Revision sheet Q29 key: syntax. Logic and runtime errors only show up when the program runs.`, ow: [null, `Logic errors (wrong algorithm) compile fine; the compiler cannot detect them. The course key: a compiler indicates syntax errors (revision sheet Q29).`, `Runtime errors appear only when the program executes, after compilation. The course key says the compiler indicates syntax errors (sheet Q29).`, `The compiler does not report all of them: logic and runtime errors escape it. Sheet Q29 key: syntax errors only.`] },
          { type: `mcq`, q: `The attributes that get values from the attribute values of their child nodes are……..`, o: [`Left-most parsing tree`, `Left-most derivation`, `Right-most derivation`, `none of the mentioned`], a: 3, why: `The answer is "synthesized attributes" (L7), which is not among the options. The options were copied from another question (a printing error), so the only correct choice is "none of the mentioned".`, ow: [`A leftmost parsing tree is a parse tree, not a kind of attribute. Attributes taking values from children are synthesized attributes (L7).`, `Leftmost derivation is a way of expanding non-terminals (L4), not an attribute type. The answer is synthesized attributes (L7).`, `Rightmost derivation is a derivation order (L4), not an attribute type. The answer is synthesized attributes (L7).`, null] }
        ]},
        { title: `Q1-II · Choose True or False`, marks: `10 marks`, items: [
          { type: `tf`, q: `Compilers generate intermediate code in order not to create a full interpreter for each machine.`, a: 0, key: `No official key. The statement comes from revision-sheet T/F 8 with "Interpreters" changed to "Compilers".`, why: `Intermediate code exists so that a full new compiler is not needed for every target machine (revision sheet Q51: "eliminate the need of a unique compiler for each machine"), and compilers do generate intermediate code (L1). The intended answer is True. Strictly, the paper should say "full compiler", not "full interpreter".`, ow: [null, `False is wrong: compilers do generate intermediate code (L1) so one front end can be reused and a full new compiler is not needed per machine (sheet Q51).`] },
          { type: `tf`, q: `Peephole optimization is only done on codes with loops.`, a: 1, why: `Peephole optimization works on any small window of code (L9). Loop optimization is a separate technique.`, ow: [`True is wrong: peephole optimization looks at any small window of target code, e.g. removing a redundant load/store (L9). Loops are not required.`, null] },
          { type: `tf`, q: `Symbol table is a basic phase of a compiler.`, a: 1, why: `The symbol table is a data structure used by all phases, not a phase (L1).`, ow: [`True is wrong: the symbol table is a data structure used by all phases (sheet Q24), not one of the phases in the L1 chain.`, null] },
          { type: `tf`, q: `Interpreters take long time to execute source code.`, a: 0, why: `L1 table: interpreters analyze quickly but their overall execution time is slower than compiled code. (Compare revision sheet T/F 2: "Compilers take long time to execute source code" = False.)`, ow: [null, `False is wrong: per L1, interpreters analyze quickly but overall execution is slower than running compiled code.`] },
          { type: `tf`, q: `Order is important in concatenation operation of two alphabets.`, a: 0, why: `L1L2 ≠ L2L1 in general, e.g. {a}{b} = {ab} but {b}{a} = {ba} (L2; sheet T/F 11).`, ow: [null, `False is wrong: concatenation is not commutative; {a}{b} = {ab} but {b}{a} = {ba}, so order matters (L2; sheet T/F 11).`] },
          { type: `tf`, q: `There is only one approach to implement symbol tables.`, a: 1, why: `Two approaches: one table per scope or one table for all scopes; several implementations (lists, BST, hash table) (L8; sheet T/F 6).`, ow: [`True is wrong: L8 gives two approaches (one table per scope, or one table for all scopes) and several structures such as lists, BST and hash table.`, null] },
          { type: `tf`, q: `SDT is the abbreviation of Semantic Directed Translation.`, a: 1, why: `SDT means Syntax Directed Translation: semantic actions/rules are attached to the grammar's productions (syntax), so 'Semantic Directed' is wrong (L7).`, ow: [`True is wrong: SDT stands for Syntax Directed Translation, i.e. semantic rules attached to grammar productions (L7).`, null] },
          { type: `tf`, q: `Code optimization is applied to remove code redundancy to save time and storage.`, a: 0, why: `Optimization aims to minimize memory use and maximize speed, e.g. by removing redundant loads/stores and dead code (L1, L9).`, ow: [null, `False is wrong: the optimizer aims to minimize memory and maximize speed, e.g. eliminating redundant load/store and dead code (L1, L9).`] },
          { type: `tf`, q: `The ε transition can exist in DFA.`, a: 1, why: `L3: an ε (empty-string) transition is one of the marks of an NFA; the DFA column of the table says a DFA cannot use empty-string transitions.`, ow: [`True is wrong: L3's table says a DFA is not capable of an empty-string (ε) transition; only an NFA can use one.`, null] },
          { type: `tf`, q: `Derivation can be done by starting with any nonterminal symbol of the context free grammar.`, a: 1, why: `A derivation starts from the start symbol S (L4).`, ow: [`True is wrong: every derivation begins at the grammar's start symbol S and replaces non-terminals until only terminals remain (L4).`, null] }
        ]},
        { title: `Q2 · Written`, marks: `30 marks · 6 each`, items: [
          { type: `written`, q: `a- Compare between compilers and interpreters.`, ans: `<table><tr><th>Interpreter</th><th>Compiler</th></tr><tr><td>Translates the program one statement at a time</td><td>Scans the entire program and translates it as a whole into machine code</td></tr><tr><td>Less time to analyze the source code, but slower overall execution</td><td>More time to analyze the source code, but faster overall execution</td></tr><tr><td>No intermediate object code is generated, so it is memory efficient</td><td>Generates intermediate object code that needs linking, so it needs more memory</td></tr><tr><td>JavaScript, Python, Ruby</td><td>C, C++, Java</td></tr></table>`, why: `L1 table; revision sheet essay Q10.` },
          { type: `written`, q: `b- Consider the following CFG, use leftmost derivations and parsing trees on the string 001101 to prove the ambiguity of this grammar.<br>S → 0A | 1B<br>A → 0AA | 1S | 1<br>B → 1BB | 0S | 0`, ans: `<pre>LMD 1: S ⇒ 0A ⇒ 00AA ⇒ 001SA
     ⇒ 0011BA ⇒ 00110A ⇒ 001101
LMD 2: S ⇒ 0A ⇒ 00AA ⇒ 001A
     ⇒ 0011S ⇒ 00110A ⇒ 001101

Tree 1:
    S
   / \\
  0   A
    / | \\
   0  A  A
     / \\  \\
    1   S  1
       / \\
      1   B
          |
          0

Tree 2:
    S
   / \\
  0   A
    / |  \\
   0  A   A
      |  / \\
      1 1   S
           / \\
          0   A
              |
              1</pre>Two different leftmost derivations (two different parse trees) for the same string 001101, so the grammar is ambiguous.`, why: `In tree 1 the first A of 0AA uses A → 1S (and S → 1B → 10) and the second A uses A → 1. In tree 2 the first A uses A → 1 and the second uses A → 1S (S → 0A → 01). Both yield 0·0·1·1·0·1. Same as revision sheet essay Q2 and the 2023/24 (50) paper.` },
          { type: `written`, q: `c- Consider the following NFA: State the reason(s) of being non-deterministic, then convert it into its equivalent DFA.<br>NFA as printed: start 1, final (double circle) 3; 1 –0→ 3; 3 –0→ 1; 3 –0→ 3 (self-loop); 3 –1→ 2; 2 –0→ 3.`, ans: `<b>Reason</b>: state 3 has a loop on 0 and another transition on the same symbol 0 (to 1), so δ(3, 0) = {1, 3} has two possible next states.<br>Transition table (with ε):<table><tr><th>State</th><th>0</th><th>1</th><th>ε</th></tr><tr><td>1</td><td>3</td><td>-</td><td>1</td></tr><tr><td>2</td><td>3</td><td>-</td><td>2</td></tr><tr><td>3</td><td>1,3</td><td>2</td><td>3</td></tr></table>DFA:<table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>∅ (dead)</td></tr><tr><td>* {3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>{2}</td><td>{3}</td><td>∅ (dead)</td></tr></table>Start = {1}. Final states = sets containing 3: {3} and {1,3}.<br><br><b>If the loop is read as 1</b> (the revision-sheet / 2024/25 version: 3 –1→ 3): reason = state 3 has a loop on 1 and another transition on 1 (to 2). DFA: {1} –0→ {3}; {3} –0→ {1}, –1→ {2,3}; {2,3} –0→ {1,3}, –1→ {2,3}; {1,3} –0→ {1,3}, –1→ {2,3}; finals {3}, {2,3}, {1,3}.`, why: `Subset construction from {1}: {1} on 0 → {3}. {3} on 0 → {1,3} (edge to 1 plus the loop); on 1 → {2}. {1,3} on 0 → {3} ∪ {1,3} = {1,3}; on 1 → {2}. {2} on 0 → {3}; on 1 nothing. No new sets appear, so the DFA has 4 states plus a dead state. The scan's loop label is the same glyph as the other 0 labels, clearly different from the "1" on the 3 → 2 edge.` },
          { type: `written`, q: `d- Consider the following C++ code segment: (i) Show the printed output in cases of static and dynamic binding environments, then (ii) draw a symbol table with a linked list for all scopes.<pre>void main( ) {
   int i =10 , w = 20 ;
   {
      int i = 3;
      w += i;
      cout&lt;&lt;w;
   }
   w += i;
   cout&lt;&lt; w;
}</pre>`, ans: `(i)<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Inner block: w = 20 + 3</td><td>23</td><td>23</td></tr><tr><td>After block: w += i</td><td>23 + 10 = <b>33</b> (outer i)</td><td>23 + 3 = <b>26</b> (most recent i)</td></tr><tr><td>Output</td><td>23 33</td><td>23 26</td></tr></table>(ii) Single hash table, each identifier → linked list of its declarations, newest in front (fields: scope | initialized? | next):<pre>i  ->  [ 1 | YES | next ] -> [ 0 | YES | NULL ]
w  ->  [ 0 | YES | NULL ]</pre>`, why: `Static: after the closing brace the inner i is out of scope, so the outer i = 10 is used. Dynamic (course convention, L8 and revision sheet Q9): the most recently executed declaration (i = 3) is still used. Symbol table: same layout as revision sheet Q9 (x → [1|YES|next] → [0|YES|NULL], y → [0|YES|NULL]); the inner i of scope 1 sits in front of the outer i of scope 0.` },
          { type: `written`, q: `e- Consider the following C++ code, state the output of when parameters are passed by result and value-result.<pre>int a[ ]={2,4,6};
int i=1;
void method(int y, int x)
{  y:=y+2;
   x:=x+8;
   a[2]:=0;
   cout&lt;&lt;y;  cout&lt;&lt;x;  cout&lt;&lt;a[0];  cout&lt;&lt;a[1];  cout&lt;&lt;a[2];
}
void main()
{
   cout&lt;&lt; i;  cout&lt;&lt;a[0];  cout&lt;&lt;a[1];  cout&lt;&lt;a[2];
   method (i, a[i]);
   cout&lt;&lt; i;  cout&lt;&lt;a[0];  cout&lt;&lt;a[1];  cout&lt;&lt;a[2];
}</pre>`, ans: `The call is method(i, a[1]) because i = 1: y ↔ i, x ↔ a[1].<table><tr><th></th><th>By result</th><th>By value-result</th></tr><tr><td>Before call</td><td>1 2 4 6</td><td>1 2 4 6</td></tr><tr><td>Copy in</td><td>nothing: y = 0, x = 0</td><td>y = 1, x = 4</td></tr><tr><td>Inside</td><td>y = 2, x = 8, a = {2,4,0}<br><b>2 8 2 4 0</b></td><td>y = 3, x = 12, a = {2,4,0}<br><b>3 12 2 4 0</b></td></tr><tr><td>Copy back</td><td>i ← 2, a[1] ← 8</td><td>i ← 3, a[1] ← 12</td></tr><tr><td>After call</td><td><b>2 2 8 0</b></td><td><b>3 2 12 0</b></td></tr></table>`, why: `Course convention (L9 concentrate example, revision sheet Q12): by result passes nothing in, so the formals start at 0; at return the formals are copied back to the actuals' addresses fixed at call time (a[1], not a[new i]). a[2] := 0 changes the global array directly and is not overwritten because x is bound to a[1]. Checked twice: result 2+0=2, 0+8=8; value-result 1+2=3, 4+8=12.` }
        ]}
      ]
    },
    {
      title: `Final Exam 2023/2024 Summer`,
      meta: `CS321 Compiler Design and Theory · Summer term 2023-2024 · 2 hours · 60 marks · 2 questions, 2 pages · Dr. Lamia Hassaan, Dr. Ahmed Ibrahim`,
      note: `No official answer key was published. The answers are worked out from the lectures and the doctor's final revision sheet. The scan is clean and fully readable. Q1-I-3 (leftmost parsing tree grows from the right) follows the revision-sheet key, not the lectures, which do not state it.`,
      sections: [
        { title: `Q1-I · Choose the correct answer`, marks: `10 marks · 1 mark for each`, items: [
          { type: `mcq`, q: `Lexical analysis is about breaking a sequence of characters into`, o: [`Tokens`, `Lines`, `Groups`, `Packets`], a: 0, why: `The scanner collects sequences of characters into meaningful units called tokens, e.g. identifiers and brackets in a[index]=4+2 (L1, L2; revision sheet Q2).`, ow: [null, `Lines are not the unit of scanning; the scanner groups characters into meaningful units called tokens (L1, L2).`, `'Groups' is too vague; the meaningful units the scanner produces are called tokens (L1, L2).`, `Packets are a networking term; lexical analysis outputs tokens (L1, L2).`] },
          { type: `mcq`, q: `The phase Semantic Analysis is modeled on the basis of`, o: [`High level language`, `Low level language`, `Context free grammar`, `Attribute grammar`], a: 3, why: `Semantic analysis uses an attribute grammar to turn the syntax tree into the annotated syntax tree (L7). Context free grammar models SYNTAX analysis (sheet Q3).`, ow: [`A high-level language is the compiler's source language, not a model for semantic analysis, which uses attribute grammar (L7).`, `Low-level language is the target of code generation, not the model of semantic analysis (attribute grammar, L7).`, `Context free grammar models SYNTAX analysis (L4; sheet Q3); semantic analysis extends it with attributes (attribute grammar, L7).`, null] },
          { type: `mcq`, q: `A leftmost parsing tree grows from the ……. side`, o: [`left`, `right`, `equally from left and right`, `center`], a: 1, key: `Revision sheet Q52 key: right. The lectures do not state this rule.`, why: `Follow the doctor's revision-sheet key (right); the same question is in the 2023/24 (60) paper.`, ow: [`The course key (revision sheet Q52) says a leftmost parsing tree grows from the RIGHT side (and a rightmost one from the left), so 'left' is marked wrong.`, null, `The tree does not grow equally from both sides; the course key (sheet Q52) says a leftmost parsing tree grows from the right.`, `'Center' is not a growth side; the course key (sheet Q52) says a leftmost parsing tree grows from the right.`] },
          { type: `mcq`, q: `The process of searching for matched tokens is typically described using …….`, o: [`Finite Automata`, `Regular Expressions`, `Context Free Grammar`, `a and b`], a: 3, why: `Regular expressions specify tokens; finite automata recognize them (L2; sheet Q6).`, ow: [`Finite automata alone is incomplete: they RECOGNIZE tokens while regular expressions SPECIFY them, so both are used (L2; sheet Q6).`, `Regular expressions alone is incomplete: they specify token patterns and finite automata recognize them, so both are used (L2).`, `Context free grammar describes syntax for the parser (L4), not the matching of tokens in the scanner.`, null] },
          { type: `mcq`, q: `The following is not a phase of a compiler`, o: [`syntax analysis`, `semantic analysis`, `testing`, `optimization`], a: 2, why: `The L1 phase chain is scanner, parser, semantic analyzer, optimizer, code generator, target optimizer. Testing is not a phase (revision sheet Q30).`, ow: [`Syntax analysis (parser) is the second phase of the compiler (L1 phase chain).`, `Semantic analysis is a compiler phase: it turns the syntax tree into the annotated tree (L1).`, null, `Optimization is a compiler phase: the source code optimizer and target code optimizer appear in the L1 chain.`] },
          { type: `mcq`, q: `Which phase of the compiler checks the grammar of the programming?`, o: [`Code Optimization`, `Semantic Analysis`, `Code Generation`, `Syntax Analysis`], a: 3, why: `The parser checks the program against the CFG (L4; sheet Q18).`, ow: [`Code optimization improves already-checked intermediate/target code for speed and memory (L1, L9); it does not check the grammar.`, `Semantic analysis checks meaning (types, declarations) on the syntax tree (L7), after the grammar has been checked.`, `Code generation produces target code from intermediate code (L1, L9); grammar checking happened earlier in the parser.`, null] },
          { type: `mcq`, q: `Leaf nodes of a syntax tree represent…….`, o: [`nonterminal symbols`, `terminal symbols`, `start symbols`, `None`], a: 1, why: `In a parse/syntax tree the leaves are terminal symbols (tokens) and the interior nodes, including the root start symbol, are non-terminals (L4).`, ow: [`Non-terminals are the interior nodes of the tree because they get expanded into children (L4).`, null, `The start symbol is the ROOT of the tree, not a leaf (L4).`, `One option is correct: leaves are terminal symbols (L4).`] },
          { type: `mcq`, q: `Symbol table is a data structure which is used:`, o: [`as a phase of the compiler`, `to create an automaton`, `by all phases of a compiler`, `None`], a: 2, why: `The symbol table interacts with almost every phase and is not itself a phase (L1; sheet Q24).`, ow: [`The symbol table is a data structure, not a phase; it is not in the L1 phase chain (sheet Q24).`, `Automata are built from regular expressions in lexical analysis (L2, L3); the symbol table stores identifier information.`, null, `One option is correct: the symbol table is used by (interacts with) all phases of the compiler (L1; sheet Q24).`] },
          { type: `mcq`, q: `The following type of storage used by a compiler is dynamically allocated`, o: [`heap`, `queue`, `array`, `text`], a: 0, why: `Stack and heap are dynamic; text/static are fixed. Queue and array are not storage types of the runtime layout (L9).`, ow: [null, `A queue is not one of the storage types; L9 lists static, stack and heap.`, `An array is a data structure, not a runtime storage type; L9 lists static, stack and heap, with heap allocated dynamically.`, `Text (code) is the fixed part of memory known at compile time, not dynamically allocated (L9).`] },
          { type: `mcq`, q: `The following is a method of optimization`, o: [`constant folding`, `combine operations`, `a and b`, `annotated syntax tree`], a: 2, why: `Both are peephole techniques (L9; sheet Q50). The annotated syntax tree is the semantic analyzer's output.`, ow: [`Constant folding alone is incomplete: combine operations is also an L9 peephole technique, so 'a and b' is the full answer.`, `Combine operations alone is incomplete: constant folding is also an L9 peephole technique, so 'a and b' is the full answer.`, null, `The annotated syntax tree is the semantic analyzer's output (L1), not an optimization method.`] }
        ]},
        { title: `Q1-II · True or False (bubble sheet)`, marks: `10 marks · 1 mark for each`, items: [
          { type: `tf`, q: `Compilers generate intermediate code.`, a: 0, why: `Compilers generate intermediate object code; interpreters do not (L1).`, ow: [null, `False is wrong: the L1 phase chain shows the compiler producing intermediate code (e.g. three-address code, p-code) before code generation.`] },
          { type: `tf`, q: `Inherited attributes are attributes that get values from the attribute values of their child.`, a: 1, why: `Those are synthesized attributes; inherited ones come from the parent and/or siblings (L7; sheet T/F 14).`, ow: [`True is wrong: taking values from children defines SYNTHESIZED attributes; inherited attributes come from the parent and/or siblings (L7).`, null] },
          { type: `tf`, q: `The problem of using a single hash table as a symbol table is memory overhead.`, a: 1, why: `Memory overhead is the problem of one table PER SCOPE; a single table is the solution (L8).`, ow: [`True is wrong: memory overhead is the problem of one hash table PER SCOPE; L8 offers a single table as the fix with less overhead.`, null] },
          { type: `tf`, q: `Interpreters take long time to execute source code.`, a: 0, why: `Interpreters analyze quickly but their overall execution is slower than compiled code (L1).`, ow: [null, `False is wrong: per L1, interpreters analyze quickly but overall execution is slower than running compiled code.`] },
          { type: `tf`, q: `In concatenation operation of two alphabets, the order of concatenation is significant.`, a: 0, why: `Concatenation is not commutative: L1L2 is generally not L2L1, e.g. {a}{b} = {ab} while {b}{a} = {ba}, so the order is significant (L2).`, ow: [null, `False is wrong: concatenation is not commutative; {a}{b} = {ab} but {b}{a} = {ba} (L2).`] },
          { type: `tf`, q: `Derivation can be started any nonterminal symbol of the context free grammar.`, a: 1, why: `A derivation always begins at the grammar's start symbol S and repeatedly replaces non-terminals until only terminals remain (L4).`, ow: [`True is wrong: derivations start only from the start symbol S, not from any non-terminal (L4).`, null] },
          { type: `tf`, q: `The expression Yε = εY = Y`, a: 0, why: `ε is the empty string and the identity of concatenation: putting it before or after any string Y leaves Y unchanged, so Yε = εY = Y (L2).`, ow: [null, `False is wrong: ε has length zero, so concatenating it on either side of Y changes nothing; Yε = εY = Y (L2).`] },
          { type: `tf`, q: `Storage used by a compiler can be classified into static, queue & heap.`, a: 1, why: `L9 classifies runtime storage as static, stack and heap (sheet Q49). A queue is not a storage type, so the statement is false.`, ow: [`True is wrong: the three types are static, STACK and heap (L9); stack storage manages procedure calls and activations, not a queue.`, null] },
          { type: `tf`, q: `Any loop causes the automaton to be nondeterministic.`, a: 1, why: `DFAs may have loops. Only a loop plus another transition on the SAME symbol (or an ε move) causes non-determinism (L3).`, ow: [`True is wrong: DFAs can have loops. L3: non-determinism comes from ε moves, or a loop on a symbol followed by a transition on the SAME symbol.`, null] },
          { type: `tf`, q: `Peephole optimization is a type of code optimization performed on a small part of the code.`, a: 0, why: `L9: peephole optimization works on a small part (a 'peephole' window) of the code, using redundant load/store elimination, constant folding and combine operations (sheet T/F 15).`, ow: [null, `False is wrong: L9 defines peephole optimization as code optimization performed on a small part of the code.`] }
        ]},
        { title: `Q2 · Written`, marks: `40 marks · 8 marks for each`, items: [
          { type: `written`, q: `a- Consider the following C++ code, state the output in both static and dynamic binding, also, propose –with reasons- optimizations to the given code.<pre>void main() {
double d; string s[10];
   int result;
   int x = 1;    int y = 2;
  {
     int x = 3*2;
     result = (2+3) * sqrt(2*8);
     y += x;
     cout&lt;&lt;"x= "&lt;&lt;x&lt;&lt;"y= "&lt;&lt;y;
  }
   y += x;
   cout&lt;&lt;"x= "&lt;&lt;x&lt;&lt;"y= "&lt;&lt;y;
}</pre>`, ans: `<table><tr><th></th><th>Static</th><th>Dynamic</th></tr><tr><td>Inner block (x = 6, y = 2 + 6)</td><td>x= 6 y= 8</td><td>x= 6 y= 8</td></tr><tr><td>After block (y += x)</td><td>x= 1 y= 9</td><td>x= 6 y= 14</td></tr></table><b>Optimizations</b>:<br>1) <b>Constant folding</b>: <code>int x = 3*2</code> → <code>int x = 6</code>; <code>result = (2+3)*sqrt(2*8)</code> → <code>result = 5*sqrt(16)</code> → <code>result = 20</code>. Computed once at compile time instead of at run time.<br>2) <b>Combine operations</b>: the whole expression becomes one constant assignment.<br>3) <b>Dead code elimination</b>: d and s[10] are never used (and result is assigned but never used), so they can be removed to save memory.`, why: `Same code as the 2023/24 (50) paper. Static: after the block the outer x = 1 is visible again, so y = 8 + 1 = 9. Dynamic (course convention): the most recent declaration x = 6 is still used, so y = 8 + 6 = 14 and x prints as 6.` },
          { type: `written`, q: `b- Describe syntax directed translation.`, ans: `SDT adds augmented (translation) rules to the grammar to facilitate semantic analysis. It passes information bottom-up and/or top-down the parse tree as <b>attributes</b> attached to the nodes. The general approach is to construct a parse tree or syntax tree and compute the values of the attributes at its nodes by visiting them in some order, producing the <b>annotated syntax tree</b>. In general, SDT augments a CFG by associating (1) a set of attributes with every grammar symbol/node and (2) a set of translation (semantic) rules with every production, using attributes, constants and lexical values. Example: E → E1 + T { E.val = E1.val + T.val } gives E.val = 14 for 2+3*4.`, why: `L7; revision sheet essay Q13.` },
          { type: `written`, q: `c- Consider the grammar:<br>E → E op E | (E) | +E | num<br>op → + | - | * | / | ε<br>Prove the ambiguity of the given grammar using leftmost derivation(s) and parsing tree(s) on the string <i>(num / num) + num</i>.`, ans: `The + can be generated either as a binary operator (op → +) or as a unary plus (E → +E) after an empty operator (op → ε).<pre>LMD 1:
E ⇒ E op E
  ⇒ (E) op E
  ⇒ (E op E) op E
  ⇒ (num op E) op E
  ⇒ (num / E) op E
  ⇒ (num / num) op E
  ⇒ (num / num) + E
  ⇒ (num / num) + num

LMD 2:
E ⇒ E op E
  ⇒ (E) op E
  ⇒ (E op E) op E
  ⇒ (num op E) op E
  ⇒ (num / E) op E
  ⇒ (num / num) op E
  ⇒ (num / num) E     [op → ε]
  ⇒ (num / num) + E   [E → +E]
  ⇒ (num / num) + num

Tree 1:
         E
      /  |  \\
     E   op   E
   / | \\  |    |
  (  E  ) +   num
   / | \\
  E  op  E
  |  |   |
 num /  num

Tree 2:
         E
      /  |  \\
     E   op   E
   / | \\  |   / \\
  (  E  ) ε  +   E
   / | \\         |
  E  op  E      num
  |  |   |
 num /  num</pre>The same string has two different leftmost derivations and two different parse trees, so the grammar is ambiguous.`, why: `Inside the parentheses there is only one way to get num / num (the / can only come from op). The ambiguity is in the +: tree 1 uses op → +, tree 2 uses op → ε and E → +E. Both derivations are leftmost (the leftmost non-terminal is replaced at every step).` },
          { type: `written`, q: `d- Consider the following Finite Automaton; convert it into the equivalent deterministic finite automaton.<br>FA: start 0, final (double circle) 2; 0 –b→ 1; 0 –a→ 2; 1 –a→ 1 (self-loop); 1 –a→ 2; 2 –a→ 1.`, ans: `It is an NFA because state 1 has a loop on a and another transition on a (to 2).<br>NFA table:<table><tr><th>State</th><th>a</th><th>b</th></tr><tr><td>0</td><td>2</td><td>1</td></tr><tr><td>1</td><td>1,2</td><td>-</td></tr><tr><td>2</td><td>1</td><td>-</td></tr></table>DFA:<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→ {0}</td><td>{2}</td><td>{1}</td></tr><tr><td>* {2}</td><td>{1}</td><td>∅ (dead)</td></tr><tr><td>{1}</td><td>{1,2}</td><td>∅ (dead)</td></tr><tr><td>* {1,2}</td><td>{1,2}</td><td>∅ (dead)</td></tr></table>Start = {0}. Final states = sets containing 2: {2} and {1,2}. All b-moves except from {0} go to a dead state (or are left out).`, why: `{0} on a → {2}, on b → {1}. {2} on a → {1}. {1} on a → {1,2} (loop + edge to 2). {1,2} on a → {1,2} ∪ {1} = {1,2}. No state has a b-move except 0. Checked twice.` },
          { type: `written`, q: `e- Consider the following CFG, use LL(1) parsing to prove the correctness of the string <i>abbcde</i>.<br>S → aABe<br>A → Abc | b<br>B → d`, ans: `Remove left recursion: S → aABe, A → bA', A' → bcA' | ε, B → d.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{a}</td><td>{$}</td></tr><tr><td>A</td><td>{b}</td><td>{d}</td></tr><tr><td>A'</td><td>{b, ε}</td><td>{d}</td></tr><tr><td>B</td><td>{d}</td><td>{e}</td></tr></table>Table: M[S,a] = S→aABe; M[A,b] = A→bA'; M[A',b] = A'→bcA'; M[A',d] = A'→ε; M[B,d] = B→d.<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>abbcde$</td><td>S→aABe</td></tr><tr><td>aABe$</td><td>abbcde$</td><td>match a</td></tr><tr><td>ABe$</td><td>bbcde$</td><td>A→bA'</td></tr><tr><td>bA'Be$</td><td>bbcde$</td><td>match b</td></tr><tr><td>A'Be$</td><td>bcde$</td><td>A'→bcA'</td></tr><tr><td>bcA'Be$</td><td>bcde$</td><td>match b</td></tr><tr><td>cA'Be$</td><td>cde$</td><td>match c</td></tr><tr><td>A'Be$</td><td>de$</td><td>A'→ε</td></tr><tr><td>Be$</td><td>de$</td><td>B→d</td></tr><tr><td>de$</td><td>de$</td><td>match d</td></tr><tr><td>e$</td><td>e$</td><td>match e</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>The input is accepted, so abbcde is a correct sentence of the grammar.`, why: `Same grammar and string as the 2023/24 (50) paper. A → Abc | b is left-recursive, so it is rewritten first. FOLLOW(A) = FIRST(B) = {d}; FOLLOW(A') = FOLLOW(A) = {d}; FOLLOW(B) = {e}. No table cell has two entries, so the grammar is LL(1).` }
        ]}
      ]
    },
    {
      title: `Professor's final revision sheet (solved)`,
      meta: `"Compilers Theory · Final Revision Sheet with Answers 2024" · 15 pages · 53 MCQ, 15 True/False, 17 essay/problems · solved copy from Sheets/Enhanced Sheets (footer: "Edited By: Ehab Alaa")`,
      note: `This is the official solved sheet; the sheet's own answers are kept as the answer for every item. Where an official answer is doubtful or has a typo, the <b>key</b> line says so. Main flags: MCQ 28 wording ("one or more" should be "more than one"), MCQ 52 (not stated in the lectures), essay Q14 (the "e" label means ε), and essay Q17 (typos in the parsing table/trace: "A→ε" should be "A'→ε", the trace should start with stack S$). Essays 1 and 10 have no written solution text in the sheet beyond a figure/table, which is reproduced here.`,
      sections: [
        { title: `Multiple-choice questions with answers`, marks: `53 questions`, items: [
          { type: `mcq`, q: `1- The lexical analyzer takes ____ as input and produces a list of ___ as output`, o: [`Machine code, tokens`, `Tokens, source code`, `Source code, tokens`, `Both a and b`], a: 2, why: `The lexical analyzer (scanner) reads the source program's characters and groups them into tokens, which it passes to the parser (L1, L2).`, ow: [`Machine code is the final output of the code generator, not the scanner's input; the scanner reads source code and outputs tokens (L1, L2).`, `This is reversed: tokens are the OUTPUT of lexical analysis and the source code is its input (L2).`, null, `Since (a) and (b) are both wrong, 'both' cannot be right; the scanner takes source code and produces tokens (L2).`] },
          { type: `mcq`, q: `2- Lexical analysis is about breaking a sequence of characters into`, o: [`Tokens`, `Lines`, `Groups`, `Packets`], a: 0, why: `Lexical analysis scans the character stream left to right and groups characters into meaningful units called tokens (keywords, identifiers, operators...) (L2).`, ow: [null, `Lines are just the physical layout of the source; the scanner's units are tokens, not lines (L2).`, `'Groups' is not the technical term; the character groups the scanner forms are called tokens (lexemes matched to token types) (L2).`, `Packets belong to networking, not compilers; lexical analysis breaks characters into tokens (L2).`] },
          { type: `mcq`, q: `3- The phase Syntax Analysis is modeled on the basis of`, o: [`High level language`, `Low level language`, `Context free grammar`, `Regular grammar`], a: 2, why: `Syntax analysis is modeled on a context-free grammar: the parser checks whether the token stream can be derived from the CFG and builds the parse tree (L4).`, ow: [`A high-level language is what is being analyzed, not the formal model; the parser is based on a context-free grammar (L4).`, `Low-level language is the target of translation, not a model for parsing; syntax analysis uses a CFG (L4).`, null, `Regular grammars/expressions model the LEXICAL phase (tokens); they cannot express nesting, so syntax analysis uses a CFG (L2, L4).`] },
          { type: `mcq`, q: `4- Compiler is a program that`, o: [`Accepts a program written in a high-level language and produces an object program`, `Appears to execute a source program as if it were machine language`, `Automates the translation of assembly language into machine language`, `Places programs into memory and prepares them for execution`], a: 0, why: `L1 definition. (b) describes an interpreter, (c) an assembler, (d) a loader.`, ow: [null, `Appearing to execute the source program directly describes an interpreter, not a compiler; a compiler produces an object program (L1).`, `Translating assembly language into machine language is the job of an assembler; a compiler translates a high-level language (L1).`, `Placing programs into memory and preparing them for execution is the loader's job, not the compiler's (L1).`] },
          { type: `mcq`, q: `5- What is the name of the process that determines whether of tokens can be generated by grammar?`, o: [`Analyzing`, `Parsing`, `Translating`, `Recognizing`], a: 1, why: `Parsing decides whether a string of tokens can be generated by the grammar (L4).`, ow: [`'Analyzing' is a vague general word; the specific term for checking that tokens can be generated by the grammar is parsing (L4).`, null, `Translating is the overall compiler job (source to target), not the grammar-membership check, which is parsing (L1, L4).`, `'Recognizing' is not the name the lecture uses; deciding whether the grammar generates the token string is parsing (L4).`] },
          { type: `mcq`, q: `6- The process of searching for matched tokens is typically described using ___`, o: [`Finite Automata`, `Regular Expressions`, `Context Free Grammar`, `a and b`], a: 3, why: `Token patterns are written as regular expressions and recognized by finite automata (NFA/DFA built from them), so both (a) and (b) describe token matching (L2, L3).`, ow: [`Finite automata alone is only half the answer; regular expressions also describe the token patterns, so the answer is a and b (L2, L3).`, `Regular expressions alone is only half the answer; finite automata recognize them, so the answer is a and b (L2, L3).`, `Context-free grammars describe the syntax for the PARSER, not token matching in the scanner (L4).`, null] },
          { type: `mcq`, q: `7- Which of the following is used for grouping of characters into tokens?`, o: [`Scanner`, `Code Generator`, `Code Optimizer`, `Parser`], a: 0, why: `The scanner (lexical analyzer) collects characters into tokens (L1).`, ow: [null, `The code generator turns intermediate code into target machine code; it does not group characters into tokens (L1).`, `The code optimizer improves intermediate/target code; grouping characters into tokens is the scanner's job (L1).`, `The parser RECEIVES tokens and builds the syntax tree; the scanner is what forms the tokens (L1, L4).`] },
          { type: `mcq`, q: `8- Type checking is normally done during`, o: [`Code optimization`, `Syntax directed translation`, `Lexical analysis`, `Syntax analysis`], a: 1, why: `Type checking is static semantics, done with SDT/attribute rules during semantic analysis (L1, L7).`, ow: [`Code optimization works after semantic checks are done; type checking happens earlier, through SDT rules in semantic analysis (L1, L7).`, null, `Lexical analysis only forms tokens and knows nothing about types; type checking is done with SDT during semantic analysis (L2, L7).`, `Syntax analysis only checks the grammar structure; type compatibility is a semantic check done by SDT (L4, L7).`] },
          { type: `mcq`, q: `9- …… or scanning is the process, where the stream of characters making up the source program is read from left to right and grouped into tokens.`, o: [`Modeling`, `Diversion`, `Lexical analysis`, `All of the mentioned`], a: 2, why: `Lexical analysis (scanning) reads the source characters left to right and groups them into tokens; it is the first phase of the compiler (L1, L2).`, ow: [`'Modeling' is not a compiler phase; reading characters and grouping them into tokens is lexical analysis (L1, L2).`, `'Diversion' is not a compiler term at all; the process described is lexical analysis (scanning) (L2).`, null, `Only lexical analysis fits; modeling and diversion are not compiler phases, so 'all of the mentioned' is wrong (L1).`] },
          { type: `mcq`, q: `10- Symbol table can be used for`, o: [`Storage allocation`, `Checking compatibility type`, `Suppressing duplication of error messages`, `All of the mentioned`], a: 3, why: `L8/L9: the symbol table supports type checking, scope resolution and storage allocation.`, ow: [`Storage allocation is one use, but the symbol table also supports type checking and error handling, so 'all' is the answer (L8, L9).`, `Type compatibility checking is one use, but not the only one; storage allocation and error handling also use it (L8).`, `Avoiding duplicate error messages is one use, but storage allocation and type checking use it too, so pick 'all' (L8).`, null] },
          { type: `mcq`, q: `11- Which of the following is/are the phases of compiler?`, o: [`Code generation`, `Syntax analyzer`, `Lexical analyzer`, `All of the mentioned`], a: 3, why: `Code generation, the syntax analyzer and the lexical analyzer are all phases in the L1 phase chain, so the answer is all of the mentioned.`, ow: [`Code generation is a phase, but so are syntax and lexical analysis, so 'all of the mentioned' is the answer (L1).`, `The syntax analyzer is a phase, but so are the other two options, so the answer is 'all of the mentioned' (L1).`, `The lexical analyzer is a phase, but so are code generation and syntax analysis, so 'all of the mentioned' is correct (L1).`, null] },
          { type: `mcq`, q: `12- Compiler translates the source code to`, o: [`Machine code`, `Executable code`, `Binary code`, `Both A and C`], a: 3, why: `A compiler translates the source program into target machine code, which is binary code, so the official key picks both A and C (L1).`, ow: [`Machine code is right but only half of the key; machine code is binary code, so the key picks 'Both A and C' (L1).`, `The key does not pick 'executable code': the compiler outputs object (machine) code that still needs linking to become executable (L1).`, `Binary code is right but only half of the key; it is the same as machine code, so the answer is 'Both A and C' (L1).`, null] },
          { type: `mcq`, q: `13- Grammar of the programming is checked at ………… phase of compiler.`, o: [`Syntax analysis`, `Semantic analysis`, `Code generation`, `Code optimization`], a: 0, why: `Syntax analysis (parsing) checks that the token stream follows the grammar of the language, using the CFG, and reports syntax errors (L1, L4).`, ow: [null, `Semantic analysis checks meaning (types, declarations, scope), not grammar; grammar is checked in syntax analysis (L1, L7).`, `Code generation produces target code after all checks; grammar is checked earlier, in syntax analysis (L1, L4).`, `Code optimization improves already-checked code; grammar checking is done by syntax analysis (L1, L4).`] },
          { type: `mcq`, q: `14- ……… is a process of finding a parse tree for a string of tokens.`, o: [`Analyzing`, `Recognizing`, `Parsing`, `Tokenizing`], a: 2, why: `Parsing is the process of finding a parse tree for a string of tokens, i.e. showing how the grammar derives it (L4).`, ow: [`'Analyzing' is too general; the process that finds a parse tree for a token string is called parsing (L4).`, `'Recognizing' is not the lecture term; finding a parse tree for the tokens is parsing (L4).`, null, `Tokenizing (lexical analysis) produces the tokens; finding a parse tree for them is parsing (L2, L4).`] },
          { type: `mcq`, q: `15- A top-down parser generates`, o: [`Left-most derivation in reverse`, `Left-most derivation`, `Right-most derivation in reverse`, `Right–most derivation`], a: 1, why: `Top-down (LL) parsers produce a leftmost derivation; bottom-up parsers produce a rightmost derivation in reverse (L4, L6).`, ow: [`Leftmost derivation in reverse is not what any lecture parser builds; top-down gives a leftmost derivation (L4, L6).`, null, `Rightmost derivation in reverse is what a BOTTOM-UP parser produces, not a top-down one (L4).`, `Top-down parsers expand the leftmost non-terminal first, giving a leftmost (not rightmost) derivation (L4, L6).`] },
          { type: `mcq`, q: `16- In which parsing, the parser constructs the parse tree from the start symbol and transforms it into the input symbol.`, o: [`Bottom-up parsing`, `Top-down parsing`, `None of the mentioned`, `Both a and b`], a: 1, why: `Top-down parsing starts at the root (start symbol) and expands toward the input (L4, L6).`, ow: [`Bottom-up parsing starts from the input symbols and reduces them up to the start symbol, the opposite direction (L4).`, null, `Top-down parsing exactly matches the description, so 'none of the mentioned' is wrong (L4, L6).`, `Only top-down starts at the start symbol; bottom-up goes from the input to the start symbol, so not both (L4).`] },
          { type: `mcq`, q: `17- Which part of the compiler highly used the grammar concept?`, o: [`Code optimization`, `Code generation`, `Parser`, `Lexical Analysis`], a: 2, why: `The parser is driven by the context-free grammar: it checks whether the tokens can be derived from the grammar and builds the parse tree (L4).`, ow: [`Code optimization improves intermediate code; it does not rely on the grammar the way the parser does (L4, L9).`, `Code generation maps intermediate code to target code; the grammar concept is used mainly by the parser (L4).`, null, `Lexical analysis uses regular expressions and finite automata, not the CFG; the parser is the grammar-based phase (L2, L4).`] },
          { type: `mcq`, q: `18- Which phase of the compiler checks the grammar of the programming?`, o: [`Code Optimization`, `Semantic Analysis`, `Code Generation`, `Syntax Analysis`], a: 3, why: `Syntax analysis checks the grammar of the program: the parser verifies the token stream against the CFG and reports syntax errors (L1, L4).`, ow: [`Code optimization works on code that already passed all checks; grammar checking is syntax analysis (L1, L4).`, `Semantic analysis checks meaning (types, declarations), not the grammar; that is syntax analysis (L1, L7).`, `Code generation is the final phase producing target code; it does not check the grammar (L1).`, null] },
          { type: `mcq`, q: `19- Keywords are recognized in a compiler during`, o: [`code generation`, `data flow analysis`, `lexical analysis`, `program parsing`], a: 2, why: `Keywords (if, while, int...) are token types, so they are recognized by the scanner during lexical analysis when it groups characters into tokens (L2).`, ow: [`Code generation is the last phase and works on intermediate code; keywords were recognized long before, in lexical analysis (L1, L2).`, `Data flow analysis is an optimization technique; keywords are recognized as tokens in lexical analysis (L2).`, null, `Parsing receives keywords already recognized as tokens; recognizing them is the scanner's job (L2, L4).`] },
          { type: `mcq`, q: `20- Which of the following is not a characteristic of the compiler?`, o: [`More execution time`, `Debugging process is slow`, `The execution takes place after the removal of all syntax errors`, `it scans the entire program then transforms it into machine code`], a: 0, why: `'More execution time' is NOT a compiler characteristic: compiled programs execute faster; it is interpreters that have slower execution (L1 table).`, ow: [null, `This IS a compiler trait: errors are reported only after analyzing the whole program, so debugging is slower than with an interpreter (L1).`, `This IS a compiler trait: the program can run only after all syntax errors are removed and it compiles (L1).`, `This IS a compiler trait: it scans the entire program and translates it as a whole, unlike an interpreter's statement-by-statement (L1).`] },
          { type: `mcq`, q: `21- Which phenomenon happens when a grammar has any non-terminal 'A' whose derivation contains 'A' itself as the left-most symbol.`, o: [`Left-most derivation`, `Left recursion`, `Left factoring`, `Left parsing`], a: 1, why: `Left recursion is when a non-terminal A derives a string starting with A itself (A → Aα); it must be removed for top-down parsing (L4-5).`, ow: [`Leftmost derivation means replacing the leftmost non-terminal at each step; it is not about A deriving itself (L4).`, null, `Left factoring removes common prefixes from alternatives (A → αβ1 | αβ2); it is not A deriving A first (L4-5).`, `'Left parsing' is not the term; a non-terminal deriving itself as the leftmost symbol is left recursion (L4-5).`] },
          { type: `mcq`, q: `22- In which derivation is the leftmost non-terminal symbol replaced at each step?`, o: [`Left recursion`, `Left non-terminal`, `Left pushdown`, `Leftmost`], a: 3, why: `In a leftmost derivation, the leftmost non-terminal of the sentential form is replaced at every step (L4).`, ow: [`Left recursion is a grammar property (A → Aα), not a derivation order; replacing the leftmost non-terminal is a leftmost derivation (L4).`, `'Left non-terminal' is not a derivation type; the correct name is leftmost derivation (L4).`, `'Left pushdown' is not a derivation; pushdown automata are a different topic. The answer is leftmost derivation (L4).`, null] },
          { type: `mcq`, q: `23- Which symbol is not related to context-free grammar?`, o: [`End symbol`, `Start symbol`, `Non-terminal symbol`, `Terminal symbol`], a: 0, why: `A CFG is defined by terminals, non-terminals, productions and a start symbol; there is no 'end symbol' in its definition (L4).`, ow: [null, `The start symbol is one of the four parts of a CFG, so it IS related to it (L4).`, `Non-terminals are one of the four parts of a CFG, so they ARE related (L4).`, `Terminals (tokens) are one of the four parts of a CFG, so they ARE related (L4).`] },
          { type: `mcq`, q: `24- Which of the following is used in various stages or phases of the compiler?`, o: [`Records`, `Program`, `Symbol Table`, `Table`], a: 2, why: `L1: the symbol table interacts with almost every phase.`, ow: [`'Records' are entries inside the symbol table, not the structure itself used across the phases (L1, L8).`, `The program is what is being compiled, not a structure shared by the phases; that is the symbol table (L1).`, null, `'Table' is too vague; the specific structure that all phases use is the symbol table (L1).`] },
          { type: `mcq`, q: `25- .....................is a process of finding a parse tree for a string of tokens.`, o: [`Analyzing`, `Recognizing`, `Tokenizing`, `Parsing`], a: 3, why: `Parsing is the process of finding a parse tree for a string of tokens (L4); this is the same as Q14 with the options reordered.`, ow: [`'Analyzing' is too general; finding a parse tree for a token string is parsing (L4).`, `'Recognizing' is not the lecture term; the answer is parsing (L4).`, `Tokenizing produces the tokens; building the parse tree for them is parsing (L2, L4).`, null] },
          { type: `mcq`, q: `26- A parse tree showing the value of attributes at each node`, o: [`Annotated Parse Tree`, `Syntax Tree`, `Semantic Tree`, `None of the mentioned`], a: 0, why: `An annotated parse tree shows the values of the attributes at each node, computed by the semantic rules of the attribute grammar (L7).`, ow: [null, `A syntax tree shows only the structure, with no attribute values; adding them gives the annotated parse tree (L7).`, `'Semantic tree' is not a lecture term; a tree with attribute values is an annotated parse tree (L7).`, `The annotated parse tree is exactly this, so 'none of the mentioned' is wrong (L7).`] },
          { type: `mcq`, q: `27- What does a syntactic analyzer do?`, o: [`maintain symbol table`, `collect data types`, `create paring tree`, `None of the mentioned`], a: 2, why: `The syntactic analyzer (parser) takes tokens and creates the parse tree ("paring" is a typo for parsing) (L4).`, ow: [`Maintaining the symbol table is shared across phases; the parser's own job is to create the parse tree (L1, L4).`, `Collecting data types is part of semantic analysis (type checking), not syntax analysis (L7).`, null, `The parser does create the parse tree, so 'none of the mentioned' is wrong (L4).`] },
          { type: `mcq`, q: `28- One or more parse tree for some sentence, that is ………grammar.`, o: [`unambiguous`, `ambiguous`, `a or b`, `None of the mentioned`], a: 1, key: `Official key: (b) ambiguous. Wording issue: a grammar is ambiguous when a sentence has MORE THAN ONE parse tree; "one or more" literally includes the unambiguous case.`, why: `Read it as "more than one parse tree", which is the definition of ambiguity (L4). Answer ambiguous in the exam, as the 2024/25 (50) paper repeats this exact question.`, ow: [`An unambiguous grammar gives exactly ONE parse tree for every sentence; more than one means ambiguous (L4).`, null, `Only one fits: a grammar with more than one parse tree for a sentence is ambiguous, not unambiguous (L4).`, `'Ambiguous' fits the definition, so 'none' is wrong (L4).`] },
          { type: `mcq`, q: `29- A compiler indicates the ………error.`, o: [`syntax`, `logic`, `runtime`, `All of the mentioned`], a: 0, why: `Compile-time errors are syntax errors; logic and runtime errors appear during execution.`, ow: [null, `Logic errors produce wrong results at run time; the compiler cannot detect them, it reports syntax errors (L1).`, `Runtime errors happen during execution, after compilation; the compiler reports syntax errors (L1).`, `Logic and runtime errors are not reported by the compiler, so not 'all'; only syntax errors (L1).`] },
          { type: `mcq`, q: `30- ………. is not a phase of compiler.`, o: [`Syntax analysis`, `Testing`, `Lexical analysis`, `None of the mentioned`], a: 1, why: `Testing is done by programmers on the finished program; it is not one of the compiler phases (scanner, parser, semantic analysis, optimization, code generation) (L1).`, ow: [`Syntax analysis IS a compiler phase (the parser) (L1).`, null, `Lexical analysis IS a compiler phase (the scanner), the first one (L1).`, `Testing is not a phase, so one option does fit and 'none' is wrong (L1).`] },
          { type: `mcq`, q: `31- Parsing is also called………analysis`, o: [`semantic`, `lexical`, `syntax`, `None of the mentioned`], a: 2, why: `Parsing is also called syntax analysis: the parser checks the token stream against the grammar and builds the parse tree (L4).`, ow: [`Semantic analysis checks meaning and types after parsing; it is not another name for parsing (L7).`, `Lexical analysis is scanning (forming tokens), the phase BEFORE parsing (L2).`, null, `Syntax analysis is the right name, so 'none' is wrong (L4).`] },
          { type: `mcq`, q: `32- Type checking is done during………`, o: [`syntax directed translation`, `lexical analysis`, `code optimization`, `syntax analysis`], a: 0, why: `Type checking is a semantic check carried out by syntax directed translation (SDT) rules attached to the grammar (L7); same as Q8.`, ow: [null, `Lexical analysis only builds tokens and knows nothing of types; type checking is done by SDT (L2, L7).`, `Code optimization comes after semantic checks; type checking is done by SDT (L7).`, `Syntax analysis checks grammar structure only; type checking is a semantic check done by SDT (L4, L7).`] },
          { type: `mcq`, q: `33- The data structure responsible for the management of information about variables and their attributes is`, o: [`semantic stack`, `symbol table`, `parser table`, `abstract syntax tree`], a: 1, why: `The symbol table stores each identifier with information about it, such as its type, scope level and sometimes location (L1, L8).`, ow: [`A semantic stack holds values during translation; it does not manage identifiers and their attributes (L8).`, null, `A parser table (e.g. the LL(1) table) drives parsing decisions; it stores no variable information (L6).`, `An abstract syntax tree represents program structure, not a table of variables and their attributes (L1, L8).`] },
          { type: `mcq`, q: `34- Languages that need heap allocation in runtime environment are`, o: [`those that use global variables`, `those that use dynamic scoping`, `those that support recursion`, `those that allow dynamic data structures`], a: 3, why: `L9. Recursion needs the STACK; globals need static storage.`, ow: [`Global variables get fixed addresses in static storage, so they do not need the heap (L9).`, `Dynamic scoping is about which declaration a name refers to (L8); the heap is needed for data created at run time (L9).`, `Recursion needs the STACK (activation records for each call), not the heap (L9).`, null] },
          { type: `mcq`, q: `35- Intermediate code generation phase gets input from`, o: [`Lexical analysis`, `Syntax Analysis`, `Semantic Analysis`, `Error handling`], a: 2, why: `The annotated tree from the semantic analyzer goes to the phase that produces intermediate code (the source code optimizer in the L1 figure).`, ow: [`Lexical analysis feeds tokens to the parser, not to intermediate code generation (L1).`, `Syntax analysis outputs the syntax tree, which goes to semantic analysis first (L1).`, null, `Error handling is not a phase in the chain that feeds intermediate code; it works alongside all phases (L1).`] },
          { type: `mcq`, q: `36- Annotated syntax tree is the output generated from …………phase`, o: [`syntax analysis`, `semantic analysis`, `lexical analysis`, `code optimizer`], a: 1, why: `Semantic analysis takes the syntax tree, adds types and attribute values, and outputs the annotated syntax tree (L1).`, ow: [`Syntax analysis outputs the plain syntax tree; annotation is added by semantic analysis (L1).`, null, `Lexical analysis outputs tokens, not a tree (L1, L2).`, `The code optimizer TAKES the annotated tree as input; it does not produce it (L1).`] },
          { type: `mcq`, q: `37- Annotated syntax tree is the input to…………phase`, o: [`syntax analysis`, `semantic analysis`, `lexical analysis`, `code optimizer`], a: 3, why: `L1: the source code optimizer takes the annotated tree.`, ow: [`Syntax analysis takes tokens as input, not the annotated tree (L1).`, `Semantic analysis PRODUCES the annotated tree; its input is the syntax tree (L1).`, `Lexical analysis takes the source code as input (L1, L2).`, null] },
          { type: `mcq`, q: `38- ………… is not a phase of a compiler`, o: [`Scanner`, `Symbol table`, `Parser`, `Code optimizer`], a: 1, why: `The symbol table is a data structure that all phases use, not a phase itself; scanner, parser and code optimizer are phases (L1).`, ow: [`The scanner (lexical analysis) IS a phase, the very first one, producing tokens (L1).`, null, `The parser (syntax analysis) IS a phase; it builds the syntax tree from tokens (L1, L4).`, `The code optimizer IS a phase of the compiler (L1).`] },
          { type: `mcq`, q: `39- SDT is an abbreviation of:`, o: [`Syntax Directed Translation`, `Semantic Directed Translation`, `Syntax Derivation Translation`, `Syntax Derivation Transition`], a: 0, why: `SDT stands for Syntax Directed Translation: semantic rules attached to grammar productions drive the translation (L7).`, ow: [null, `It is SYNTAX directed, not semantic directed: the rules are attached to the grammar's productions (L7).`, `The D is 'Directed', not 'Derivation': Syntax Directed Translation (L7).`, `Both 'Derivation' and 'Transition' are wrong; SDT = Syntax Directed Translation (L7).`] },
          { type: `mcq`, q: `40- The attributes that get values from the attribute values of their child nodes`, o: [`Inherited attributes`, `Child attributes`, `Synthesized attributes`, `None of the mentioned`], a: 2, why: `Synthesized attributes get their values from the attribute values of their child nodes (e.g. S → ABC, S takes values from A, B, C) (L7).`, ow: [`Inherited attributes get values from parent and/or sibling nodes, not from children (L7).`, `'Child attributes' is not a lecture term; attributes computed from children are synthesized (L7).`, null, `Synthesized attributes fit exactly, so 'none' is wrong (L7).`] },
          { type: `mcq`, q: `41- When the variable is known with certainty to be assigned it is called`, o: [`definitely assigned`, `definitely known`, `indefinitely assigned`, `None of the mentioned`], a: 0, why: `Per the revision-sheet key, a variable known with certainty to have been assigned (on every path) is 'definitely assigned'.`, ow: [null, `'Definitely known' is not the term; the key's name for a variable surely assigned is 'definitely assigned'.`, `'Indefinitely assigned' means the opposite (not sure it was assigned); the key's answer is 'definitely assigned'.`, `'Definitely assigned' fits, so 'none of the mentioned' is wrong.`] },
          { type: `mcq`, q: `42- Inherited attributes get their attribute values from`, o: [`child nodes`, `leaves nodes`, `parent nodes`, `semantic nodes`], a: 2, why: `Inherited attributes take their values from the parent and/or sibling nodes, unlike synthesized attributes which come from children (L7).`, ow: [`Getting values from child nodes describes SYNTHESIZED attributes, not inherited ones (L7).`, `Leaf nodes are not the source; inherited attributes come from parent and/or siblings (L7).`, null, `'Semantic nodes' is not a lecture term; inherited attributes come from the parent (and siblings) (L7).`] },
          { type: `mcq`, q: `43- When a variable may or may not be assigned, it is called`, o: [`definitely unassigned`, `unknown`, `definitely assigned`, `None of the mentioned`], a: 1, why: `Per the revision-sheet key, a variable that may or may not have been assigned (assigned on some paths only) is in the 'unknown' state.`, ow: [`'Definitely unassigned' means surely NOT assigned; a variable that may or may not be assigned is 'unknown'.`, null, `'Definitely assigned' means surely assigned; the uncertain case is 'unknown'.`, `'Unknown' fits the description, so 'none of the mentioned' is wrong.`] },
          { type: `mcq`, q: `44- The main disadvantage of creating a symbol table for every scope is`, o: [`memory overhead`, `large processing time`, `redundant code`, `none of the mentioned`], a: 0, why: `Each per-scope hash table carries its own memory overhead, so one table per scope is memory inefficient; L8 fixes it with a single table for all scopes.`, ow: [null, `L8 names memory overhead as THE problem (multiple searches is a secondary speed issue), so 'large processing time' is not the key answer.`, `Redundant code is removed by the optimizer; it is unrelated to symbol table organization (L8, L9).`, `Memory overhead is the stated disadvantage, so 'none' is wrong (L8).`] },
          { type: `mcq`, q: `45- Static object binding is done based on`, o: [`the structure of the syntax tree, i.e., braces`, `the structure of the code optimizer`, `data types`, `none of the mentioned`], a: 0, why: `Static binding (static scope) is based on the structure of the syntax tree, i.e. the program text and its braces, not on runtime behavior (L8).`, ow: [null, `The code optimizer has nothing to do with scoping; static binding follows the syntax tree structure (braces) (L8).`, `Data types do not decide which declaration a name binds to; the block structure of the syntax tree does (L8).`, `The syntax-tree structure fits, so 'none' is wrong (L8).`] },
          { type: `mcq`, q: `46- A context free grammar is said to be ambiguous when`, o: [`it has a leftmost and a rightmost derivation for the same string`, `it can't accept a specific string`, `it achieves the same string following more than one path using either leftmost or rightmost derivation`, `None`], a: 2, why: `Two different leftmost (or two different rightmost) derivations = ambiguity. One LMD plus one RMD is normal for every string (L4).`, ow: [`Every string has both a leftmost and a rightmost derivation even in unambiguous grammars; that alone is not ambiguity (L4).`, `A grammar that cannot derive a string simply does not generate it; ambiguity means more than one parse tree (L4).`, null, `Option (c) states ambiguity correctly, so 'none' is wrong (L4).`] },
          { type: `mcq`, q: `47- Context free grammars are used in ………. phase`, o: [`lexical analysis`, `syntax analysis`, `semantic analysis`, `None`], a: 1, why: `Context-free grammars describe the syntax of the language and are used by the parser in the syntax analysis phase (L4).`, ow: [`Lexical analysis uses regular expressions and finite automata, not CFGs (L2).`, null, `Semantic analysis uses attribute grammars/SDT built on the CFG, but the CFG phase itself is syntax analysis (L4, L7).`, `Syntax analysis is correct, so 'none' is wrong (L4).`] },
          { type: `mcq`, q: `48- A compiler needs ……... types of storage`, o: [`two`, `three`, `four`, `five`], a: 1, why: `A compiler needs three types of storage: static (fixed globals/code), stack (procedure activations) and heap (dynamic data) (L9).`, ow: [`Two is too few; L9 lists three: static, stack and heap.`, null, `Four is too many; L9 lists exactly three: static, stack and heap.`, `Five is too many; L9 lists exactly three: static, stack and heap.`] },
          { type: `mcq`, q: `49- Storage used by a compiler can be classified into the following`, o: [`static, stack and heap`, `dynamic, stack and heap`, `static, queue and heap`, `None`], a: 0, why: `L9 classifies storage allocation into static, stack and heap: static for fixed data, stack for procedure calls, heap for dynamic data.`, ow: [null, `'Dynamic' is not a separate type; the first type is STATIC (stack and heap are the dynamic ones) (L9).`, `There is no queue storage; procedure calls use the STACK (L9).`, `Static, stack and heap is correct, so 'none' is wrong (L9).`] },
          { type: `mcq`, q: `50- ……. and ……. are considered as mechanisms of code optimization`, o: [`constant folding, variable folding`, `constant folding, definite assignment`, `constant folding, combine operations`, `a and b`], a: 2, why: `Constant folding and combine operations are both peephole optimization techniques in L9 (with redundant load/store elimination).`, ow: [`'Variable folding' is not a technique; L9's peephole techniques are redundant load/store elimination, constant folding and combine operations.`, `Definite assignment is a semantic analysis concept, not an optimization; pair constant folding with combine operations (L9).`, null, `(a) and (b) both contain a non-optimization term, so 'a and b' is wrong (L9).`] },
          { type: `mcq`, q: `51- The purpose of intermediate code generation is to eliminate the need of`, o: [`parsing trees`, `a unique compiler for each machine`, `context free grammar`, `NFA`], a: 1, why: `With intermediate code only the back end changes per target machine, so a full native compiler per machine is not needed.`, ow: [`Parse trees are still needed by the front end; intermediate code removes the need for a full compiler per machine (L1).`, null, `The CFG is still needed to parse the source; intermediate code does not replace it (L4).`, `NFAs are used in building the scanner; intermediate code has nothing to do with eliminating them (L3).`] },
          { type: `mcq`, q: `52- A leftmost parsing tree grows from the ……. side`, o: [`left`, `equal sides`, `right`, `the side can not be determined`], a: 2, key: `Official key: (c) right. Not stated anywhere in the lectures; keep the doctor's answer for the exam.`, why: `This exact question is reused in 2023/24 (60) and 2023/24 Summer, and the T/F version in 2024/25. Use "right".`, ow: [`The revision-sheet key (repeated in later exams) says a leftmost parsing tree grows from the RIGHT side, not the left.`, `The key gives a definite side (right), so 'equal sides' is wrong.`, null, `The key says the side CAN be determined: it is the right side.`] },
          { type: `mcq`, q: `53- Attribute grammar is generated by`, o: [`attaching attributes to each nonterminal of the CFG`, `removing extra code by the CFG`, `attaching attributes to the stack storage`, `none of the mentioned`], a: 0, why: `An attribute grammar is a CFG with attributes attached to its non-terminals and semantic rules to compute them (L7).`, ow: [null, `Removing extra code is optimization, not how an attribute grammar is built (L7, L9).`, `Attributes are attached to the grammar's symbols (non-terminals), not to stack storage (L7).`, `Option (a) is the correct definition, so 'none' is wrong (L7).`] }
        ]},
        { title: `True & False questions with answers`, marks: `15 questions`, items: [
          { type: `tf`, q: `1- Loop optimization is necessary to improve cache performance and reduce overheads`, a: 0, why: `L9: loop optimization plays an important role in improving cache performance and reducing the overheads of executing loops.`, ow: [null, `L9 states exactly this: loop optimization improves cache performance and reduces loop execution overheads, so the statement is True.`] },
          { type: `tf`, q: `2- Compilers take long time to execute source code`, a: 1, why: `Compilers take long to ANALYZE; execution is faster (L1).`, ow: [`Compilers take long to ANALYZE, but the compiled program executes faster than interpreted code (L1 table).`, null] },
          { type: `tf`, q: `3- Interpreters do not generate intermediate object code`, a: 0, why: `In the L1 comparison table, interpreters generate no intermediate object code (so they are memory efficient), while compilers do.`, ow: [null, `The L1 table says interpreters do NOT generate intermediate object code; only compilers do, so the statement is True.`] },
          { type: `tf`, q: `4- Lexical analysis receives source code as an input and generates tokens as an output`, a: 0, why: `Lexical analysis reads the source code as a stream of characters and outputs tokens to the parser (L1, L2).`, ow: [null, `That is exactly the scanner's input and output: source code in, tokens out (L2), so the statement is True.`] },
          { type: `tf`, q: `5- Synthesized attributes are attributes that get values from the attribute values of their child nodes`, a: 0, why: `L7 defines synthesized attributes as those that get values from the attribute values of their child nodes (e.g. E → E + T).`, ow: [null, `This is the L7 definition word for word: synthesized attributes come from child nodes, never from parent or siblings.`] },
          { type: `tf`, q: `6- There is only one approach to implement symbol tables`, a: 1, why: `L8: per-scope tables or one table for all scopes.`, ow: [`L8 gives more than one approach: a table per scope, or a single table for all scopes (with two solutions for that).`, null] },
          { type: `tf`, q: `7- The structure of a symbol table is time consuming when an identifier returns a linked list of usages of itself`, a: 1, why: `L8 solution 2: the front item is always the right one, so it is not time consuming.`, ow: [`In L8 solution 2 the front item of the identifier's linked list is always the right one for the current scope, so lookup is not time consuming.`, null] },
          { type: `tf`, q: `8- Interpreters generate intermediate code in order not to create a full interpreter for each machine`, a: 1, why: `Interpreters generate no intermediate code (L1).`, ow: [`Interpreters generate no intermediate object code (L1); avoiding a full compiler per machine is a reason COMPILERS use intermediate code.`, null] },
          { type: `tf`, q: `9- Annotated syntax tree is the output of syntax analysis phase`, a: 1, why: `Syntax analysis outputs the syntax tree; the annotated tree comes from semantic analysis (L1).`, ow: [`Syntax analysis outputs the plain syntax tree; the annotated syntax tree is the output of semantic analysis (L1).`, null] },
          { type: `tf`, q: `10- Tokens are generated by lexical analysis`, a: 0, why: `Tokens are the output of lexical analysis: the scanner groups the source characters into tokens and passes them to the parser (L2).`, ow: [null, `Generating tokens is exactly what lexical analysis does (L2), so the statement is True.`] },
          { type: `tf`, q: `11- Order is not important in concatenation operation`, a: 1, why: `Concatenation is not commutative: joining L1 then L2 gives different strings than L2 then L1, e.g. {ab, c}{d} ≠ {d}{ab, c} (L2).`, ow: [`Order matters: L1L2 puts L1's strings first, so in general L1L2 ≠ L2L1 (L2).`, null] },
          { type: `tf`, q: `12- When we derive a string from a context free grammar, once using leftmost approach and once using rightmost approach, then the grammar must be ambiguous`, a: 1, why: `Every string has a leftmost and a rightmost derivation; ambiguity needs two different leftmost (or two rightmost) derivations, i.e. two parse trees (L4).`, ow: [`Every string has a leftmost and a rightmost derivation; ambiguity needs more than one parse tree, i.e. two different LMDs or RMDs (L4).`, null] },
          { type: `tf`, q: `13- Attribute grammar is used on the syntax tree to generate the annotated syntax tree`, a: 0, why: `Applying the attribute grammar's semantic rules to the syntax tree computes the attribute values, producing the annotated syntax tree (L7).`, ow: [null, `That is how the annotated tree is made: attribute grammar rules evaluated on the syntax tree (L7), so the statement is True.`] },
          { type: `tf`, q: `14- Inherited attributes get values from the attribute values of their child nodes`, a: 1, why: `That is synthesized; inherited come from parent/siblings (L7).`, ow: [`Getting values from child nodes is the definition of SYNTHESIZED attributes; inherited ones come from parent and/or siblings (L7).`, null] },
          { type: `tf`, q: `15- Peephole optimization is a type of code optimization performed on a small part of the code`, a: 0, why: `L9 defines peephole optimization as optimization performed on a small part of the code, called the peephole or window.`, ow: [null, `This is the L9 definition: peephole optimization works on a small part of the code (the window), so the statement is True.`] }
        ]},
        { title: `Essay and problems questions with answers`, marks: `17 questions`, items: [
          { type: `written`, q: `1- What are the phases of the compiler?`, ans: `<pre>Source code
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
Target code</pre>`, why: `The sheet answers with the L1 figure only.` },
          { type: `written`, q: `2- Consider the grammar S → 0A | 1B, A → 0AA | 1S | 1, B → 1BB | 0S | 0. Derive the string 001101 stating if the grammar is ambiguous or not.`, ans: `<pre>LMD 1: S ⇒ 0A ⇒ 00AA ⇒ 001SA ⇒ 0011BA ⇒ 00110A ⇒ 001101
        (A→0AA, A→1S, S→1B, B→0, A→1)
LMD 2: S ⇒ 0A ⇒ 00AA ⇒ 001A ⇒ 0011S ⇒ 00110A ⇒ 001101
        (A→0AA, A→1, A→1S, S→0A, A→1)</pre>Since there is more than one leftmost derivation for the same string, the grammar is ambiguous.`, why: `Official answer; checked step by step. The parse trees are drawn in the 2021/22 Q2-b answer.` },
          { type: `written`, q: `3- Show by figure the memory layout allocated by a compiler.`, ans: `<pre>┌──────────────────────┐  ┐
│  Text memory         │  │ fixed
├──────────────────────┤  │
│  Static data         │  ┘
├──────────────────────┤  ┐
│  Stack memory   ↓    │  │
│                      │  │ dynamic
│  Heap memory    ↑    │  │
└──────────────────────┘  ┘</pre><b>Static allocation</b>: data is bound to a fixed location that does not change during execution; storage locations are known in advance, so no runtime support package is needed.<br><b>Stack allocation</b>: procedure calls and their activations are managed with a stack (LIFO); very useful for recursive calls.<br><b>Heap allocation</b>: memory is allocated and de-allocated only at run time and claimed back when no longer needed. Stack and heap grow and shrink dynamically, so they cannot be given a fixed amount of memory.`, why: `Official answer (L9).` },
          { type: `written`, q: `4- Propose an optimized version of the following loop with explanation:<pre>for (i=0; i &lt; a→length-1 ; i++)
   swap_elements(a[i],a[ i+1]);</pre>`, ans: `<pre>int x = a→length-1;
for (i=0; i &lt; x ; i++)
   swap_elements(a[i],a[ i+1]);</pre>Instead of computing length-1 as many times as the length of the array, store it once in an integer x and make x the terminating condition. length-1 is evaluated only once, which saves processing and time.`, key: `The official explanation also says it "saves memory"; it actually adds one variable. The real gain is processing time.`, why: `Loop optimization / code hoisting (L9 arr.length example).` },
          { type: `written`, q: `5- Given the ambiguous CFG S → Ab | aaB, A → a | Aa, B → b. Show that the string aab has two leftmost derivations.`, ans: `<pre>LMD 1: S ⇒ aaB ⇒ aab
LMD 2: S ⇒ Ab ⇒ Aab ⇒ aab</pre>`, why: `Official answer. In LMD 2, A → Aa then A → a.` },
          { type: `written`, q: `6- Given the ambiguous CFG S → AB | C, A → aAb | ab, B → cBd | cd, C → aCd | aDd, D → bDc | bc. Show that the string aabbccdd has two leftmost derivations AND draw the two leftmost parsing trees.`, ans: `<pre>LMD 1: S ⇒ AB ⇒ aAbB ⇒ aabbB
     ⇒ aabbcBd ⇒ aabbccdd
LMD 2: S ⇒ C ⇒ aCd ⇒ aaDdd
     ⇒ aabDcdd ⇒ aabbccdd

Tree 1:
        S
     /     \\
    A       B
  / | \\   / | \\
 a  A  b c  B  d
   / \\     / \\
  a   b   c   d

Tree 2:
    S
    |
    C
  / | \\
 a  C  d
  / | \\
 a  D  d
  / | \\
 b  D  c
   / \\
  b   c</pre>`, why: `Official answer. Tree 1 splits the string as (aabb)(ccdd); tree 2 nests from the outside (a…d, a…d, b…c, b…c).` },
          { type: `written`, q: `7- Draw a finite automaton for each of the following regular expressions: b*a+(c|d) and (a|b)*(c+|d+).`, ans: `<b>b*a+(c|d)</b>: →0 (loop b) –a→ 1 (loop a); 1 –c→ 2; 1 –d→ 2; 2 final.<br><b>(a|b)*(c+|d+)</b>: →0 (loop a,b); 0 –c→ 2 (final, loop c); 0 –d→ 3 (final, loop d).`, why: `Official figures. In the second, c's and d's need separate final states so they cannot mix.` },
          { type: `written`, q: `8- Differentiate between synthesized attributes and inherited attributes.`, ans: `Synthesized attributes are passed upwards in the syntax tree, from the leaves up to the root (a node's value is computed from its children). Inherited attributes are passed downwards (from the parent and/or siblings). Information synthesized in one subtree may be inherited by another subtree or, in a later pass, by the same subtree. Example: a symbol table is synthesized by a declaration and inherited by the scope of the declaration.`, why: `Official answer (L7).` },
          { type: `written`, q: `9- Consider the C++ code:<pre>void main() {
int x = 1;
int y = 2;
   {
     int x = 3;
     y += x;
     cout&lt;&lt;y;
   }
   y += x;
   cout&lt;&lt; y;
}</pre>Show the printed output in cases of static and dynamic binding environments. Draw a symbol table with a linked list for all scopes of the above code.`, ans: `Static: inner y = 2 + 3 = 5 → prints <b>5</b>; after the block y = 5 + 1 = 6 → prints <b>6</b>.<br>Dynamic: inner prints <b>5</b>; after the block the most recent x = 3 is used: y = 5 + 3 = 8 → prints <b>8</b>.<pre>x  ->  [ 1 | YES | next ] -> [ 0 | YES | NULL ]
y  ->  [ 0 | YES | NULL ]</pre>`, why: `Official answer; it defines the course's dynamic-binding convention (L8).` },
          { type: `written`, q: `10- Differentiate between compilers and interpreters?`, ans: `<table><tr><th>Interpreter</th><th>Compiler</th></tr><tr><td>Translates the program one statement at a time</td><td>Scans the entire program and translates it as a whole into machine code</td></tr><tr><td>Less time to analyze the source code; overall execution slower</td><td>More time to analyze the source code; overall execution faster</td></tr><tr><td>No intermediate object code, so memory efficient</td><td>Generates intermediate object code that needs linking, so more memory</td></tr><tr><td>JavaScript, Python, Ruby</td><td>C, C++, Java</td></tr></table>`, why: `Official table (L1).` },
          { type: `written`, q: `11- Consider the NFA (start 1, final 3; 1 –0→ 3; 3 –0→ 1; 3 –1→ 3 loop; 3 –1→ 2; 2 –0→ 3): (a) State the reason(s) of being non-deterministic. (b) Convert into DFA.`, ans: `(a) State 3 has a loop on 1 and another transition on the same symbol 1 (to 2).<br>(b) <table><tr><th>DFA state</th><th>0</th><th>1</th></tr><tr><td>→ {1}</td><td>{3}</td><td>-</td></tr><tr><td>* {3}</td><td>{1}</td><td>{2,3}</td></tr><tr><td>* {2,3}</td><td>{1,3}</td><td>{2,3}</td></tr><tr><td>* {1,3}</td><td>{1,3}</td><td>{2,3}</td></tr></table>Final states: every set containing 3.`, key: `The sheet gives only the tables and DFA figure for (b); part (a) is not written out. The answer to (a) here is ours.`, why: `Checked: {2,3} on 0 = {3} ∪ {1} = {1,3}; {1,3} on 0 = {3} ∪ {1} = {1,3}; on 1 both give {2,3}.` },
          { type: `written`, q: `12- Consider the C++ code:<pre>int a[ ]={10,20,30};
int i=2;
void my_function(int j, int x)
{  int i=0;
   j:=j+1;
   x:=x+3;
   a[2]:=0;
   cout&lt;&lt;j; cout&lt;&lt;x; cout&lt;&lt;a[0]; cout&lt;&lt;a[1]; cout&lt;&lt;a[2];
}
void main()
{  cout&lt;&lt; i; cout&lt;&lt;a[0]; cout&lt;&lt;a[1]; cout&lt;&lt;a[2];
   my_function (i, a[i]);
   cout&lt;&lt; i; cout&lt;&lt;a[0]; cout&lt;&lt;a[1]; cout&lt;&lt;a[2];
}</pre>a- State the output when parameters are passed by value, result, and value-result. b- Draw a single symbol table with a linked list for all the scopes.`, ans: `<table><tr><th></th><th>By value</th><th>By result</th><th>By value-result</th></tr><tr><td>Before</td><td>2 10 20 30</td><td>2 10 20 30</td><td>2 10 20 30</td></tr><tr><td>Inside</td><td>j=3, x=33: 3 33 10 20 0</td><td>j=0→1, x=0→3: 1 3 10 20 0</td><td>j=3, x=33: 3 33 10 20 0</td></tr><tr><td>After</td><td>2 10 20 0</td><td>1 10 20 3</td><td>3 10 20 33</td></tr></table>b-<pre>i     ->  [ 1 | YES | next ] -> [ 0 | YES | NULL ]
a[3]  ->  [ 0 | YES | NULL ]</pre>`, why: `Official answer. The call is my_function(i, a[2]). By result/value-result copy j back to i and x back to a[2] (address fixed at the call), overwriting the a[2] := 0. The local int i = 0 does not affect anything printed. In the symbol table, the local i (scope 1) is in front of the global i (scope 0).` },
          { type: `written`, q: `13- Explain the purpose of SDT?`, ans: `SDT is augmented rules to the grammar that facilitate semantic analysis. It passes information bottom-up and/or top-down the parse tree in the form of attributes attached to the nodes. The general approach is to construct a parse tree or syntax tree and compute the attribute values at its nodes by visiting them in some order. Generalizing, SDT associates (1) a set of attributes with every node of the grammar and (2) a set of translation rules with every production, using attributes, constants and lexical values.`, why: `Official answer (L7).` },
          { type: `written`, q: `14- Construct the regular expression of the following FA: start 1, final 5; 1 –e→ 2; 2 –a→ 2 (loop); 2 –a→ 3; 3 –b→ 5; 1 –a→ 4; 4 –b→ 4 (loop); 4 –b→ 5.`, ans: `Official solution: <b>e a+b | ab+</b>, i.e. <b>a+b | ab+</b> when e is ε.`, key: `The edge 1 → 2 is labelled "e", which here means ε (the empty string), so "e a+b" = a+b. If e were a real input symbol, the answer would be ea+b | ab+.`, why: `Upper path: ε, then a* (loop at 2), then a, then b → a*ab = a+b. Lower path: a, then b* (loop at 4), then b → ab*b = ab+. The two paths are joined with |.` },
          { type: `written`, q: `15- Consider the grammar E → E + E | E-E | id. Prove that the grammar is ambiguous using leftmost derivations and parsing trees on the string id-id+id.`, ans: `<pre>LMD 1: E ⇒ E+E ⇒ E-E+E
     ⇒ id-E+E ⇒ id-id+E
     ⇒ id-id+id
LMD 2: E ⇒ E-E ⇒ id-E
     ⇒ id-E+E ⇒ id-id+E
     ⇒ id-id+id

Tree 1:
        E
      / | \\
     E  +  E
   / | \\   |
  E  -  E  id
  |     |
  id    id

Tree 2:
     E
   / | \\
  E  -  E
  |   / | \\
  id E  +  E
     |     |
     id    id</pre>Two leftmost derivations / parse trees for the same string, so the grammar is ambiguous.`, why: `Official answer. Tree 1 = (id-id)+id, tree 2 = id-(id+id).` },
          { type: `written`, q: `16- Convert the following NFA into DFA: start 1 (also final); 1 –b→ 2; 1 –ε→ 3; 2 –a→ 2 (loop); 2 –a,b→ 3; 3 –a→ 1.`, ans: `ε-closures: E(1) = {1,3}, E(2) = {2}, E(3) = {3}.<table><tr><th>DFA state</th><th>a</th><th>b</th></tr><tr><td>→* {1,3}</td><td>{1,3}</td><td>{2}</td></tr><tr><td>{2}</td><td>{2,3}</td><td>{3}</td></tr><tr><td>{2,3}</td><td>{1,2,3}</td><td>{3}</td></tr><tr><td>{3}</td><td>{1,3}</td><td>-</td></tr><tr><td>* {1,2,3}</td><td>{1,2,3}</td><td>{2,3}</td></tr></table>Final states: {1,3} and {1,2,3} (they contain 1).`, why: `Official answer, identical to the 2024/25 (60) Q1-b. Checked: {2,3} on a = {2,3} ∪ E(1) = {1,2,3}; {1,2,3} on b = {2} ∪ {3} = {2,3}.` },
          { type: `written`, q: `17- Consider the grammar S → A, A → aB | Ad, B → b, C → g. Create LL(1) parser for the string abd.`, ans: `a- Remove left recursion: S → A, A → aBA', A' → dA' | ε, B → b, C → g.<table><tr><th>NT</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>S</td><td>{a}</td><td>{$}</td></tr><tr><td>A</td><td>{a}</td><td>{$}</td></tr><tr><td>A'</td><td>{d, ε}</td><td>{$}</td></tr><tr><td>B</td><td>{b}</td><td>{d, $}</td></tr><tr><td>C</td><td>{g}</td><td>{ } (C is unreachable)</td></tr></table>Table: M[S,a] = S→A; M[A,a] = A→aBA'; M[A',d] = A'→dA'; M[A',$] = A'→ε; M[B,b] = B→b; M[C,g] = C→g.<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>S$</td><td>abd$</td><td>S→A</td></tr><tr><td>A$</td><td>abd$</td><td>A→aBA'</td></tr><tr><td>aBA'$</td><td>abd$</td><td>match a</td></tr><tr><td>BA'$</td><td>bd$</td><td>B→b</td></tr><tr><td>bA'$</td><td>bd$</td><td>match b</td></tr><tr><td>A'$</td><td>d$</td><td>A'→dA'</td></tr><tr><td>dA'$</td><td>d$</td><td>match d</td></tr><tr><td>A'$</td><td>$</td><td>A'→ε</td></tr><tr><td>$</td><td>$</td><td>accept</td></tr></table>`, key: `Typos in the official solution: the table entry M[A', $] and the trace step are printed as "A→ε" (should be A'→ε), and the trace's first stack is printed as "$" (should be S$). The FIRST/FOLLOW sets and the moves are otherwise correct.`, why: `FOLLOW(B) = FIRST(A') − ε ∪ FOLLOW(A) = {d, $}. C never appears on a right-hand side, so it has an empty FOLLOW set (the sheet writes {-}).` }
        ]}
      ]
    }
  ],
  quiz: {
    1: [
      { q: `Annotated syntax tree is the output generated from ……… phase.`, o: [
        [`syntax analysis`, `Syntax analysis outputs the (plain) syntax tree.`],
        [`semantic analysis`, `Correct. The semantic analyzer adds attributes (types etc.) to the syntax tree.`],
        [`lexical analysis`, `Lexical analysis outputs tokens; the annotated tree comes two phases later, from the semantic analyzer.`],
        [`code optimizer`, `The code optimizer TAKES the annotated tree as input and outputs intermediate code.`]
      ], a: 1, src: `Exam 2021/22 · Professor's revision sheet` },
      { q: `Compiler is a program that:`, o: [
        [`Accepts a program written in a high-level language and produces an object program`, `Correct. A compiler translates the whole high-level program into a lower-level (object/machine) program.`],
        [`Appears to execute a source program as if it were machine language`, `Appearing to execute the source program directly describes an interpreter, which runs it statement by statement.`],
        [`Automates the translation of assembly language into machine language`, `Translating assembly language into machine language is the job of an assembler, not a compiler.`],
        [`Places programs into memory and prepares them for execution`, `Placing programs into memory and preparing them to run is the job of a loader, not a compiler.`]
      ], a: 0, src: `Professor's revision sheet` },
      { q: `Which of the following is/are the phases of a compiler?`, o: [
        [`Code generation`, `Code generation is phase 5, but the scanner and parser are phases too, so "all of the mentioned" is the full answer.`],
        [`Syntax analyzer`, `The syntax analyzer (parser) is phase 2, but the other two options are phases as well, so pick "all of the mentioned".`],
        [`Lexical analyzer`, `The lexical analyzer (scanner) is phase 1, but the other two options are phases as well, so pick "all of the mentioned".`],
        [`All of the mentioned`, `Correct. The lexical analyzer (phase 1), syntax analyzer (phase 2) and code generator (phase 5) are all in the lecture's phase figure (L1, Phases of a compiler).`]
      ], a: 3, src: `Professor's revision sheet` },
      { q: `Which of the following is used in various stages or phases of the compiler?`, o: [
        [`Records`, `"Records" is too vague; the lecture's structure shared by the phases is the symbol table.`],
        [`Program`, `The program is what the compiler translates, not a data structure shared between its phases.`],
        [`Symbol Table`, `Correct. The symbol table interacts with almost every phase.`],
        [`Table`, `Too vague; the specific answer is the symbol table.`]
      ], a: 2, src: `Professor's revision sheet` },
      { q: `Symbol table is a data structure which is used:`, o: [
        [`as a phase of the compiler`, `The symbol table is a data structure beside the phases in the figure, not a phase itself (a common exam trap).`],
        [`to create an automaton`, `Automata are built for the lexical analyzer, not by the symbol table.`],
        [`by all phases of a compiler`, `Correct. The symbol table keeps information about identifiers and interacts with almost every phase of the compiler (L1, Principal data structures).`],
        [`None`, `The lecture says the symbol table is used by (interacts with) almost every phase, so option c is correct.`]
      ], a: 2, src: `Exam 2023/24 Summer` },
      { q: `Intermediate code generation phase gets its input from:`, o: [
        [`Lexical analysis`, `Lexical analysis outputs tokens, which go to the parser, not to intermediate code generation.`],
        [`Syntax Analysis`, `Syntax analysis outputs the syntax tree, which goes to the semantic analyzer before any intermediate code is made.`],
        [`Semantic Analysis`, `Correct (official key). The annotated tree from the semantic analyzer is turned into intermediate code.`],
        [`Error handling`, `The error handler is a helper, not a phase in the chain.`]
      ], a: 2, src: `Professor's revision sheet` },
      { q: `The purpose of intermediate code generation is to eliminate the need of:`, o: [
        [`parsing trees`, `Parse trees are still built before intermediate code.`],
        [`a unique compiler for each machine`, `Correct. Only the back end changes per target machine, so a full native compiler per machine is not needed.`],
        [`context free grammar`, `The context-free grammar is still needed by the parser; intermediate code does not replace it.`],
        [`NFA`, `NFAs belong to lexical analysis and are unrelated.`]
      ], a: 1, src: `Professor's revision sheet` },
      { q: `"Compilers generate intermediate code in order not to create a full interpreter for each machine."`, o: [
        [`True`, `Correct (intended answer). Compilers generate intermediate code so a full new compiler is not needed for each machine. Strictly, "interpreter" should read "compiler".`],
        [`False`, `Compilers do generate intermediate code, and its purpose is exactly to avoid a full translator per machine.`]
      ], a: 0, src: `Exam 2021/22` },
      { q: `"Interpreters generate intermediate code in order not to create a full interpreter for each machine."`, o: [
        [`True`, `Interpreters generate NO intermediate object code.`],
        [`False`, `Correct. Only compilers generate intermediate code.`]
      ], a: 1, src: `Professor's revision sheet` },
      { q: `"Compilers generate intermediate code."`, o: [
        [`True`, `Correct. Compilers generate intermediate object code that then needs linking.`],
        [`False`, `False would describe an interpreter: the lecture table says interpreters generate no intermediate object code, but compilers do.`]
      ], a: 0, src: `Exam 2023/24 Summer` },
      { q: `"Interpreters do not generate intermediate object code."`, o: [
        [`True`, `Correct. This is why interpreters are memory efficient.`],
        [`False`, `Generating intermediate object code is a COMPILER trait.`]
      ], a: 0, src: `Professor's revision sheet` },
      { q: `"Symbol table is a basic phase of a compiler."`, o: [
        [`True`, `The symbol table is a data structure shared by the phases.`],
        [`False`, `Correct. The six phases are scanner, parser, semantic analyzer, source optimizer, code generator, target optimizer.`]
      ], a: 1, src: `Exam 2021/22` },
      { q: `"Interpreters take long time to execute source code."`, o: [
        [`True`, `Correct. Interpreters analyze quickly, but their overall execution is slower than compiled code.`],
        [`False`, `Slow overall execution is exactly the interpreter's drawback.`]
      ], a: 0, src: `Exam 2021/22 · Exam 2023/24 Summer` },
      { q: `"Compilers take long time to execute source code."`, o: [
        [`True`, `Compilers take long to ANALYZE (translate), but the result executes faster.`],
        [`False`, `Correct. Compiled programs execute faster than interpreted ones.`]
      ], a: 1, src: `Professor's revision sheet` },
      { q: `"Annotated syntax tree is the output of syntax analysis phase."`, o: [
        [`True`, `Syntax analysis outputs the plain syntax tree.`],
        [`False`, `Correct. The annotated tree is the output of semantic analysis.`]
      ], a: 1, src: `Professor's revision sheet` }
    ],
    2: [
      { q: `One of the modeling criteria of lexical analysis phase is:`, o: [
        [`context free grammar`, `Context-free grammars model syntax analysis (the parser), not lexical analysis.`],
        [`symbol table`, `The symbol table is a data structure shared by the phases, not a formalism for modeling tokens.`],
        [`finite automata`, `Correct. Tokens are described by regular expressions and recognized by finite automata.`],
        [`attribute grammar`, `Attribute grammars model semantic analysis (attributes attached to CFG nonterminals).`]
      ], a: 2, src: `Exam 2021/22` },
      { q: `Which of the following is used for grouping of characters into tokens?`, o: [
        [`Scanner`, `Correct. The scanner (lexical analyzer) groups characters into tokens.`],
        [`Code Generator`, `The code generator turns intermediate code into target machine code; it never sees raw characters.`],
        [`Code Optimizer`, `The code optimizer improves already-generated code (e.g. constant folding); it does not form tokens.`],
        [`Parser`, `The parser consumes tokens; it does not create them.`]
      ], a: 0, src: `Professor's revision sheet` },
      { q: `…… or scanning is the process where the stream of characters making up the source program is read from left to right and grouped into tokens.`, o: [
        [`Modeling`, `Modeling is not a compiler phase; the left-to-right grouping into tokens is lexical analysis.`],
        [`Diversion`, `"Diversion" is not a compiler term; reading characters left to right into tokens is lexical analysis.`],
        [`Lexical analysis`, `Correct. Lexical analysis, also called scanning, reads the source characters left to right and groups them into tokens (L2, What is lexical analysis).`],
        [`All of the mentioned`, `Modeling and diversion are not compiler phases, so only lexical analysis fits, not all of them.`]
      ], a: 2, src: `Professor's revision sheet` },
      { q: `"Tokens are generated by lexical analysis."`, o: [
        [`True`, `Correct. Lexical analysis (the scanner) reads the source characters and produces the sequence of tokens used by the parser (L2, What is lexical analysis).`],
        [`False`, `Syntax analysis consumes tokens; lexical analysis produces them.`]
      ], a: 0, src: `Professor's revision sheet` },
      { q: `FA: start 1, final 5; 1 –ε→ 2; 2 –a→ 2 (loop); 2 –a→ 3; 3 –b→ 5; 1 –a→ 4; 4 –b→ 4 (loop); 4 –b→ 5. Its regular expression is:`, o: [
        [`a*b | ab*`, `Each path needs at least one a (upper) and at least one b (lower): a*ab = a+b and ab*b = ab+.`],
        [`a+b | ab+`, `Correct. Upper path ε·a*·a·b = a+b; lower path a·b*·b = ab+.`],
        [`(a|b)*ab`, `Accepts strings like bab, which the FA rejects.`],
        [`a+b+`, `a+b+ accepts aabb, but the upper path a+b allows only one b and the lower path ab+ only one a.`]
      ], a: 1, src: `Professor's revision sheet` }
    ],
    3: [
      { q: `"The ε transition can exist in DFA."`, o: [
        [`True`, `An ε move lets the machine change state without input, which is non-deterministic.`],
        [`False`, `Correct. Any ε transition makes the automaton an NFA.`]
      ], a: 1, src: `Exam 2021/22` },
      { q: `"Any loop causes the automaton to be nondeterministic."`, o: [
        [`True`, `DFAs can have loops (e.g. the DFA for 1*01(0|1)*).`],
        [`False`, `Correct. Only a loop together with another transition on the SAME symbol (or an ε move) causes non-determinism.`]
      ], a: 1, src: `Exam 2023/24 Summer` },
      { q: `NFA (2021/22 paper): start 1, final 3; 1 –0→ 3; 3 –0→ 1; 3 –0→ 3 (loop); 3 –1→ 2; 2 –0→ 3. Why is it non-deterministic, and what is the DFA move from {3} on 0?`, o: [
        [`It has a loop; {3} –0→ {3}`, `A loop alone is fine. And 3 on 0 also reaches 1.`],
        [`State 3 has two moves on 0; {3} –0→ {1,3}`, `Correct. δ(3,0) = {1,3} (edge to 1 plus the loop), so the DFA state is {1,3}.`],
        [`State 3 has two moves on 1; {3} –0→ {1}`, `On this paper the loop is on 0, and 3 has only one move on 1 (to 2).`],
        [`It has an ε transition; {3} –0→ {1,2,3}`, `There is no ε move, and 2 is reached only on 1.`]
      ], a: 1, src: `Exam 2021/22` },
      { q: `FA: start 0, final 2; 0 –b→ 1; 0 –a→ 2; 1 –a→ 1 (loop); 1 –a→ 2; 2 –a→ 1. In the equivalent DFA, the move from {1} on a is:`, o: [
        [`{1}`, `This keeps only the self-loop 1 –a→ 1 and misses the edge 1 –a→ 2, which also leaves state 1 on a.`],
        [`{2}`, `This keeps only 1 –a→ 2 and forgets that state 1 also loops back to itself on a.`],
        [`{1,2}`, `Correct. 1 on a goes to 1 (loop) and 2, giving the final DFA state {1,2}.`],
        [`∅`, `∅ would mean state 1 has no a-moves, but it has two: the loop to 1 and the edge to 2.`]
      ], a: 2, src: `Exam 2023/24 Summer` }
    ],
    4: [
      { q: `The syntax analyzer takes ……. as input and produces ……. as output.`, o: [
        [`machine code, tokens`, `Nonsense order; machine code is the final output of the compiler.`],
        [`tokens, parsing tree`, `Correct. The parser reads the token stream and builds the parse/syntax tree.`],
        [`source code, tokens`, `Source code in, tokens out is the lexical analyzer (scanner), the first phase; the parser starts from the tokens.`],
        [`Both a and b`, `Option (a) is wrong (machine code is the compiler's final output, not the parser's input), so "both" cannot be right.`]
      ], a: 1, src: `Exam 2021/22` },
      { q: `Which phase of the compiler checks the grammar of the programming?`, o: [
        [`Code Optimization`, `Code optimization improves intermediate or target code that has already passed syntax and semantic checks.`],
        [`Semantic Analysis`, `Checks meaning (types, declarations), not grammar.`],
        [`Code Generation`, `Code generation produces target code at the end of the compiler; checking the grammar happens much earlier, in the parser.`],
        [`Syntax Analysis`, `Correct. The parser checks the token stream against the CFG.`]
      ], a: 3, src: `Exam 2023/24 Summer · Professor's revision sheet` },
      { q: `What is the name of the process that determines whether a string of tokens can be generated by a grammar?`, o: [
        [`Analyzing`, `"Analyzing" is too general; deciding whether the grammar generates the token string is specifically parsing.`],
        [`Parsing`, `Correct. Parsing decides whether (and how) the grammar derives the token string.`],
        [`Translating`, `Translating is what the whole compiler does (source to target program), not this one grammar check.`],
        [`Recognizing`, `The professor's key and the lecture call this parsing; a pure recognizer is not the term the course uses for it.`]
      ], a: 1, src: `Professor's revision sheet` },
      { q: `Which part of the compiler highly uses the grammar concept?`, o: [
        [`Code optimization`, `Code optimization works on intermediate or target code and does not use the grammar.`],
        [`Code generation`, `Driven by the target machine, not the grammar.`],
        [`Parser`, `Correct. The parser (syntax analysis) checks the token stream against the production rules of the context-free grammar and builds the parse tree from them (L4, Syntax Analysis).`],
        [`Lexical Analysis`, `Lexical analysis uses regular expressions and pattern rules; the lecture says it cannot check syntax, which is why the parser uses a CFG.`]
      ], a: 2, src: `Professor's revision sheet` },
      { q: `Which phenomenon happens when a grammar has a non-terminal A whose derivation contains A itself as the left-most symbol?`, o: [
        [`Left-most derivation`, `Leftmost derivation is an order of replacing non-terminals, not a grammar property; the property described is left recursion.`],
        [`Left recursion`, `Correct. A ⇒+ Aα is left recursion; it makes top-down parsers loop forever.`],
        [`Left factoring`, `Removes common prefixes; a different transformation.`],
        [`Left parsing`, `"Left parsing" is not a term from the lecture; a non-terminal deriving itself as the left-most symbol is left recursion.`]
      ], a: 1, src: `Professor's revision sheet` },
      { q: `In which derivation is the leftmost non-terminal symbol replaced at each step?`, o: [
        [`Left recursion`, `Left recursion is a grammar property (A ⇒ Aα), not an order of applying productions in a derivation.`],
        [`Left non-terminal`, `"Left non-terminal" is not a type of derivation; the lecture's two types are leftmost and rightmost.`],
        [`Left pushdown`, `"Left pushdown" is not a derivation type; the lecture defines only leftmost and rightmost derivations.`],
        [`Leftmost`, `Correct. In a leftmost derivation the sentential form is scanned left to right and the leftmost non-terminal is replaced at each step (L4, Derivation).`]
      ], a: 3, src: `Professor's revision sheet` },
      { q: `What does a syntactic analyzer do?`, o: [
        [`maintain symbol table`, `All phases use the symbol table; that is not the parser's job.`],
        [`collect data types`, `Collecting and checking data types is semantic analysis (type checking), which runs after the parser.`],
        [`create parsing tree`, `Correct. The parser builds the parse/syntax tree.`],
        [`None of the mentioned`, `Option (c) is right: the lecture says the output of the syntax analyzer is a parse tree.`]
      ], a: 2, src: `Professor's revision sheet` },
      { q: `One or more parse tree for some sentence, that is ……… grammar.`, o: [
        [`unambiguous`, `Unambiguous means exactly one parse tree for every sentence; more than one tree means ambiguous.`],
        [`ambiguous`, `Correct (official key). Read "one or more" as "more than one": that is ambiguity.`],
        [`a or b`, `It cannot be both: the official key picks ambiguous, reading "one or more" as more than one parse tree for a sentence.`],
        [`None of the mentioned`, `The official key picks ambiguous: more than one parse tree for some sentence is the lecture's definition of ambiguity.`]
      ], a: 1, src: `Professor's revision sheet` },
      { q: `Parsing is also called ……… analysis.`, o: [
        [`semantic`, `Semantic analysis checks meaning (types, declarations) after parsing; parsing itself is the syntax phase.`],
        [`lexical`, `Lexical analysis (scanning) is the first phase and produces tokens; it is not parsing.`],
        [`syntax`, `Correct. The lecture opens with "Syntax analysis or parsing is the second phase of a compiler", so parsing is syntax analysis (L4, Syntax Analysis).`],
        [`None of the mentioned`, `Option (c) is right: the lecture uses "syntax analysis" and "parsing" as the same phase.`]
      ], a: 2, src: `Professor's revision sheet` },
      { q: `Context free grammars are used in ………. phase.`, o: [
        [`lexical analysis`, `Lexical analysis uses regular expressions and pattern rules, which cannot check balancing tokens.`],
        [`syntax analysis`, `Correct. Regular expressions cannot check balanced structures such as parentheses, so the syntax analysis phase uses a context-free grammar (L4, Syntax Analysis).`],
        [`semantic analysis`, `Semantic analysis uses attribute grammars (semantic rules attached to productions); the plain CFG is the parser's model.`],
        [`None`, `Option (b) is right: context-free grammars are the model of the syntax analysis phase.`]
      ], a: 1, src: `Professor's revision sheet` },
      { q: `"Derivation can be done by starting with any nonterminal symbol of the context free grammar."`, o: [
        [`True`, `Derivations of sentences always begin from the start symbol.`],
        [`False`, `Correct. Derivation starts with the start symbol S.`]
      ], a: 1, src: `Exam 2021/22 · Exam 2023/24 Summer` },
      { q: `"When we derive a string once using the leftmost approach and once using the rightmost approach, the grammar must be ambiguous."`, o: [
        [`True`, `Every string has both a leftmost and a rightmost derivation, even in an unambiguous grammar.`],
        [`False`, `Correct. Ambiguity needs two different LEFTMOST (or two different rightmost) derivations, i.e. two parse trees.`]
      ], a: 1, src: `Professor's revision sheet` },
      { q: `E → E op E | (E) | +E | num, op → + | - | * | / | ε. Why does (num / num) + num have two parse trees?`, o: [
        [`The / can come from two different productions`, `/ has only one source, op → /, so it is not where the two trees differ; they differ in how the + is produced.`],
        [`The + can be a binary op, or op → ε followed by the unary E → +E`, `Correct. Tree 1: E op E with op = +. Tree 2: E op E with op = ε and the right E = +E.`],
        [`The parentheses can be dropped`, `Parentheses are terminals and must appear exactly as written.`],
        [`num can be derived from op`, `op only derives + - * / or ε, never num; num comes only from E → num.`]
      ], a: 1, src: `Exam 2023/24 Summer` }
    ],
    6: [
      { q: `In which parsing does the parser construct the parse tree from the start symbol and transform it into the input symbols?`, o: [
        [`Bottom-up parsing`, `Bottom-up starts from the input and reduces to the start symbol.`],
        [`Top-down parsing`, `Correct. Top-down (e.g. LL(1)) starts at the root S and expands toward the input.`],
        [`None of the mentioned`, `Not true: top-down parsing (option b) is exactly the method that builds the tree from the start symbol down to the input symbols.`],
        [`Both a and b`, `Bottom-up parsing goes the other way, from the input symbols up to the start symbol, so only top-down fits, not both.`]
      ], a: 1, src: `Professor's revision sheet` },
      { q: `For S → A, A → aBA', A' → dA' | ε, B → b, the LL(1) table entry M[A', $] is:`, o: [
        [`A' → dA'`, `A' → dA' goes in M[A', d] because FIRST(dA') = {d}. Under $ the parser must let A' vanish.`],
        [`A' → ε`, `Correct. FOLLOW(A') = {$}, so the ε-production goes under $. (The sheet misprints it as "A→ε".)`],
        [`A → aBA'`, `A → aBA' is a production of A and goes in M[A, a]. Row A' only holds A' productions.`],
        [`empty (error)`, `The cell is not empty: A' is nullable and $ ∈ FOLLOW(A') = {$}, so table rule 2 puts A' → ε in M[A', $].`]
      ], a: 1, src: `Professor's revision sheet` }
    ],
    7: [
      { q: `When the variable is known with certainty to be assigned it is called:`, o: [
        [`definitely assigned`, `Correct. One of the three definite-assignment states.`],
        [`definitely known`, `"Definitely known" is not a state. The three states are definitely assigned, definitely unassigned and unknown.`],
        [`indefinitely assigned`, `Not one of the states; the uncertain state is "unknown".`],
        [`none of the mentioned`, `Not true: option (a), "definitely assigned", is the state for a variable known with certainty to be assigned.`]
      ], a: 0, src: `Exam 2021/22 · Professor's revision sheet` },
      { q: `The attributes that get values from the attribute values of their child nodes are……… (options as printed)`, o: [
        [`Left-most parsing tree`, `A left-most parse tree is not an attribute type; attributes taking values from children are synthesized attributes, which is not offered.`],
        [`Left-most derivation`, `A left-most derivation is a way of deriving a string, not an attribute type. The answer, synthesized attributes, is missing.`],
        [`Right-most derivation`, `A right-most derivation is a derivation order, not an attribute type. The answer, synthesized attributes, is missing.`],
        [`none of the mentioned`, `Correct. The answer is "synthesized attributes", which is not offered (the options were misprinted).`]
      ], a: 3, src: `Exam 2021/22` },
      { q: `The phase Semantic Analysis is modeled on the basis of:`, o: [
        [`High level language`, `That is the compiler's input language, not a model.`],
        [`Low level language`, `Low-level (target) code is what the compiler produces at the end; it is not the model on which semantic analysis is based.`],
        [`Context free grammar`, `A plain CFG models syntax analysis (the parser). Semantic analysis is based on the attribute grammar, a CFG with attributes added.`],
        [`Attribute grammar`, `Correct. Semantic analysis uses an attribute grammar to produce the annotated tree.`]
      ], a: 3, src: `Exam 2023/24 Summer` },
      { q: `"Inherited attributes are attributes that get values from the attribute values of their child nodes."`, o: [
        [`True`, `The statement is false: getting values from child nodes describes synthesized attributes. Inherited ones come from the parent and/or siblings.`],
        [`False`, `Correct. Inherited attributes come from the parent and/or siblings.`]
      ], a: 1, src: `Exam 2023/24 Summer · Professor's revision sheet` },
      { q: `"Attribute grammar is used on the syntax tree to generate the annotated syntax tree."`, o: [
        [`True`, `Correct. Evaluating the attribute rules on the syntax tree gives the annotated tree.`],
        [`False`, `The statement is true: semantic analysis uses the attribute grammar on the syntax tree to produce the annotated syntax tree.`]
      ], a: 0, src: `Professor's revision sheet` }
    ],
    8: [
      { q: `Symbol table can be used for:`, o: [
        [`Storage allocation`, `Storage allocation is one use (the table records where names live), but type checking and avoiding repeated error messages are uses too, so pick "All".`],
        [`Checking compatibility type`, `Type checking is a listed purpose (L9: verifying assignments and expressions), but the other two options are uses too, so "All" is the answer.`],
        [`Suppressing duplication of error messages`, `Recording a reported undeclared name stops the same error repeating, but storage allocation and type checking are also uses, so "All".`],
        [`All of the mentioned`, `Correct (official key). The symbol table supports all three.`]
      ], a: 3, src: `Professor's revision sheet` },
      { q: `{ int i=10, w=20; { int i=3; w+=i; cout&lt;&lt;w; } w+=i; cout&lt;&lt;w; } prints, for static and dynamic binding:`, o: [
        [`Static 23 33, dynamic 23 26`, `Correct. Inner: 20+3 = 23. After: static uses outer i = 10 (33); dynamic (course convention) still uses i = 3 (26).`],
        [`Static 23 26, dynamic 23 33`, `Swapped: static is the one that returns to the outer i.`],
        [`Static 30 40, dynamic 23 26`, `30 and 40 come from adding the outer i = 10 inside the block too. The inner int i = 3 hides it there, so both bindings print 23 first.`],
        [`Static 23 33, dynamic 23 33`, `Under the course's dynamic convention the most recent i = 3 is still used.`]
      ], a: 0, src: `Exam 2021/22` },
      { q: `Same code. In a single symbol table with linked lists (newest first), the list for i is:`, o: [
        [`[0 | YES | next] → [1 | YES | NULL]`, `Newest declaration goes in FRONT, so scope 1 comes first.`],
        [`[1 | YES | next] → [0 | YES | NULL]`, `Correct. Inner i (scope 1) in front of outer i (scope 0).`],
        [`[1 | YES | NULL]`, `The outer i is still in an open scope and stays in the list.`],
        [`[0 | YES | NULL]`, `This lists only the outer i (scope 0) and leaves out the inner declaration of scope 1, which must be inserted at the front.`]
      ], a: 1, src: `Exam 2021/22` },
      { q: `int x=1, y=2; { int x=3*2; y+=x; print x,y } y+=x; print x,y. What does the LAST print show with dynamic binding (course convention)?`, o: [
        [`x= 1 y= 9`, `x = 1, y = 9 is the static result: after the block the outer x = 1 is restored, so y = 8 + 1. The course's dynamic convention keeps x = 6.`],
        [`x= 6 y= 14`, `Correct. The most recent x = 6 is still used: y = 8 + 6 = 14.`],
        [`x= 6 y= 8`, `That is the inner print; y changes again after the block.`],
        [`x= 1 y= 3`, `y = 3 is 2 + 1, which ignores the inner block's y += x (y became 8). The inner x = 6 then is still used: y = 14.`]
      ], a: 1, src: `Exam 2023/24 Summer` }
    ],
    9: [
      { q: `The following is a method of peephole optimization:`, o: [
        [`token optimization`, `"Token optimization" is not one of the course's techniques; the peephole techniques are load/store elimination, constant folding and combine operations.`],
        [`constant folding`, `Correct. Peephole techniques: redundant load/store elimination, constant folding, combine operations.`],
        [`annotated tree optimization`, `Not a technique; the annotated tree is a semantic-analysis product.`],
        [`NFA optimization`, `NFAs belong to lexical analysis (L3); turning them into DFAs is not a peephole optimization technique.`]
      ], a: 1, src: `Exam 2021/22` },
      { q: `The following is a method of optimization:`, o: [
        [`constant folding`, `Constant folding is an optimization method, but combine operations is too, so the full answer is "a and b".`],
        [`combine operations`, `Combine operations is an optimization method, but constant folding is too, so the full answer is "a and b".`],
        [`a and b`, `Correct. Both are peephole optimization techniques.`],
        [`annotated syntax tree`, `This is the semantic analyzer's output, not an optimization.`]
      ], a: 2, src: `Exam 2023/24 Summer` },
      { q: `"Peephole optimization is only done on codes with loops."`, o: [
        [`True`, `Peephole optimization works on any small window of instructions.`],
        [`False`, `Correct. Loops are the target of LOOP optimization, a separate technique.`]
      ], a: 1, src: `Exam 2021/22` },
      { q: `"Code optimization is applied to remove code redundancy to save time and storage."`, o: [
        [`True`, `Correct. Optimization minimizes memory use and maximizes speed, e.g. redundant load/store elimination.`],
        [`False`, `Removing redundancy to save time and space is the definition of optimization.`]
      ], a: 0, src: `Exam 2021/22` },
      { q: `int a[]={2,4,6}; int i=1; method(int y, int x){ y:=y+2; x:=x+8; a[2]:=0; … } called as method(i, a[i]). By RESULT, what does main print after the call (i, a[0], a[1], a[2])?`, o: [
        [`1 2 4 0`, `That is pass by value: nothing is copied back.`],
        [`2 2 8 0`, `Correct. Formals start at 0: y = 2, x = 8; copied back to i and a[1] (the address fixed at the call).`],
        [`3 2 12 0`, `That is value-result (initial values copied in).`],
        [`2 2 4 8`, `x is bound to a[1] (i was 1 at the call), not a[2].`]
      ], a: 1, src: `Exam 2021/22` },
      { q: `Same code with pass by VALUE-RESULT. What does main print after the call?`, o: [
        [`3 2 12 0`, `Correct. y = 1+2 = 3, x = 4+8 = 12, copied back to i and a[1]; a[2] = 0 stays.`],
        [`2 2 8 0`, `2 2 8 0 is pass by result: formals start at 0, so y = 2 and x = 8. Value-result copies in i = 1 and a[1] = 4 first.`],
        [`3 2 4 12`, `x goes back to a[1], the address fixed at the call, not a[2] or a[new i].`],
        [`1 2 4 0`, `1 2 4 0 is pass by value: only a[2] := 0 changes the global array; nothing is copied back to i or a[1].`]
      ], a: 0, src: `Exam 2021/22` }
    ]
  }
};

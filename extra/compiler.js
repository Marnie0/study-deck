// Practice questions written for Study Deck (not the professor's), per lecture.
window.EXTRA = window.EXTRA || {};
EXTRA.compiler = {
 "1": [
  {
   "q": "The scanner reads <code>a[index]=4+2</code>. How many tokens does it produce?",
   "o": [
    [
     "5",
     "This counts only the identifiers and numbers plus one operator. The brackets, = and + are tokens too."
    ],
    [
     "8",
     "Correct. a, [, index, ], =, 4, +, 2: identifier, left bracket, identifier, right bracket, assignment, number, plus sign, number."
    ],
    [
     "6",
     "This misses the two brackets, which the lecture lists as separate tokens."
    ],
    [
     "11",
     "This counts characters of \"index\" separately. The scanner groups i-n-d-e-x into ONE identifier token."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the lecture's generated code, <code>MOV R0, index</code> is followed by <code>MUL R0, 2</code>. Why multiply by 2?",
   "o": [
    [
     "Because 4+2 was folded into 6, which is 2 × 3",
     "Constant folding happened earlier and has nothing to do with the index scaling."
    ],
    [
     "Because the array has 2 elements",
     "The array size is not used here. The 2 is the size of one element."
    ],
    [
     "Because an integer is 2 bytes in the hypothetical machine, so the index becomes a byte offset",
     "Correct. The code generator uses the target machine's data representation: a[index] lives at &a + index × 2."
    ],
    [
     "Because the target code optimizer always doubles registers",
     "The target code optimizer later REPLACES MUL by 2 with SHL; it does not create it."
    ]
   ],
   "a": 2
  },
  {
   "q": "Apply the source code optimizer's constant folding to the three-address code <code>t = 4 + 2; a[index] = t</code>. What is the final result shown on the slide?",
   "o": [
    [
     "<code>t = 4 + 2; a[index] = 6</code>",
     "Half-done: the addition must be folded first, then the temporary can disappear."
    ],
    [
     "<code>a[index] = 4 + 2</code>",
     "This removes the temporary but never folds the constant."
    ],
    [
     "<code>t = 6</code>",
     "The assignment to a[index] is the whole point of the statement and cannot be dropped."
    ],
    [
     "<code>a[index] = 6</code>",
     "Correct. t = 4+2 becomes t = 6, then t is substituted, giving a[index] = 6."
    ]
   ],
   "a": 3
  },
  {
   "q": "For which phase are the <b>properties of the target machine</b> (its instructions and data representation) the major factor?",
   "o": [
    [
     "Code generator",
     "Correct. It turns intermediate code into code for the target machine, so the machine's instructions and data sizes drive it."
    ],
    [
     "Semantic analyzer",
     "It computes attributes such as types; it does not depend on the target machine's instructions."
    ],
    [
     "Scanner",
     "The scanner only groups characters into tokens."
    ],
    [
     "Source code optimizer",
     "The lecture says this improvement depends only on the source code."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the following is NOT one of the target code optimizer's tasks listed in the lecture?",
   "o": [
    [
     "Choosing address modes",
     "Listed: e.g. MOV &a[R1],6 on the slide (‡ &a[R0] is meant) uses an indexed address mode."
    ],
    [
     "Type checking the expressions",
     "Correct. Type checking belongs to the semantic analyzer (static semantics), not the target code optimizer."
    ],
    [
     "Replacing instructions with cheaper ones",
     "Listed: instruction replacing is a task, e.g. MUL R0, 2 becomes the cheaper SHL R0."
    ],
    [
     "Eliminating redundant instructions",
     "Listed: MOV R1, &a and ADD R1, R0 disappear in the optimized code."
    ]
   ],
   "a": 1
  },
  {
   "q": "What does the <b>literal table</b> store, and why?",
   "o": [
    [
     "Identifiers with their types, for constant-time lookup",
     "Identifiers with their types and constant-time (hash table) access describe the symbol table, not the literal table."
    ],
    [
     "Tokens as values of an enumerated type",
     "Tokens stored as values of an enumerated type is how the scanner represents tokens, not the literal table."
    ],
    [
     "Constants and strings, to reduce program size",
     "Correct. The literal table stores constants and strings, which reduces the size of the program; quick insertion and lookup are essential (L1, Principal data structures)."
    ],
    [
     "Intermediate products of the phases, to allow back-patching",
     "Holding the products of intermediate steps and allowing back-patching describes temporary files."
    ]
   ],
   "a": 2
  },
  {
   "q": "According to the lecture, why might a compiler use <b>temporary files</b>?",
   "o": [
    [
     "To store the symbol table in a hash table",
     "The symbol table is kept in hash tables in memory; temporary files are not mentioned for it."
    ],
    [
     "To hold the literal table's strings",
     "The literal table is its own data structure for constants and strings; the slide does not say it is kept in temporary files."
    ],
    [
     "To speed up the scanner",
     "The slide never links temporary files to the scanner's speed; it gives memory limits and back-patching as the reasons."
    ],
    [
     "To hold products of intermediate steps, solving memory constraints and allowing back-patching of addresses during code generation",
     "Correct. Temporary files hold the product of intermediate steps, solving memory constraints and allowing back-patching of addresses during code generation (L1, Principal data structures)."
    ]
   ],
   "a": 3
  },
  {
   "q": "How does the scanner usually represent a token it has collected?",
   "o": [
    [
     "As a value of an enumerated data type, possibly with the string or other derived information",
     "Correct. E.g. the identifier name or the number's value may be kept too, in a global variable or an array of tokens."
    ],
    [
     "As a pointer-based tree node",
     "A pointer-based tree node is how the parser builds the syntax tree, not how the scanner stores a token."
    ],
    [
     "As a line of three-address code",
     "That is intermediate code, produced much later."
    ],
    [
     "As an entry in the literal table only",
     "Only constants and strings go to the literal table, and tokens are not represented that way."
    ]
   ],
   "a": 0
  },
  {
   "q": "\"An interpreter usually takes less time to analyze the source code than a compiler, but its overall execution is slower.\"",
   "o": [
    [
     "True",
     "Correct. This is exactly the lecture's comparison table: interpreters analyze less but run slower; compilers analyze more but run faster."
    ],
    [
     "False",
     "The statement matches the table. The trap is confusing analysis time with execution time."
    ]
   ],
   "a": 0
  },
  {
   "q": "\"In the annotated syntax tree of <code>a[index]=4+2</code>, the semantic analyzer annotates <code>a</code> as integer.\"",
   "o": [
    [
     "True",
     "a is the array itself; only the subscript-expression a[index] is integer."
    ],
    [
     "False",
     "Correct. a is annotated as <b>array of integer</b>; index, 4, 2, the subscript-expression and the additive-expression are integer."
    ]
   ],
   "a": 1
  }
 ],
 "2": [
  {
   "q": "The scanner converts <code>if distance &gt;= rate * (time1 – time0) then distance := maxdist;</code> into a token stream. How many <b>id</b> tokens does it contain?",
   "o": [
    [
     "4",
     "This misses some identifiers, e.g. maxdist or one of the time variables."
    ],
    [
     "5",
     "5 is the number of DIFFERENT lexemes. distance appears twice and each occurrence is its own id token."
    ],
    [
     "6",
     "Correct. if id relop id * ( id – id ) then id := id ; gives distance, rate, time1, time0, distance, maxdist."
    ],
    [
     "7",
     "\"if\" and \"then\" are keyword tokens, not ids; counting one of them gives 7 instead of the 6 real identifiers."
    ]
   ],
   "a": 2
  },
  {
   "q": "Using the lecture's precedence rules, the regular expression <code>a|ab*</code> means:",
   "o": [
    [
     "a|(a(b*))",
     "Correct. * binds tightest, then concatenation, then |."
    ],
    [
     "(a|a)b*",
     "This gives | higher precedence than concatenation, which is backwards."
    ],
    [
     "a|(ab)*",
     "* applies only to the symbol right before it (b), so ab* is a(b*), not (ab)*."
    ],
    [
     "(a|ab)*",
     "There is no star around the whole expression."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which string belongs to the language of <code>0|0*1</code>?",
   "o": [
    [
     "00",
     "0*1 must end with 1, and the left alternative is a single 0."
    ],
    [
     "10",
     "Every string from 0*1 ends in 1, and the only other string is 0."
    ],
    [
     "010",
     "010 is not the single string 0, and it ends in 0, so it cannot come from 0*1."
    ],
    [
     "001",
     "Correct. 0*1 with two 0's. The language is {0, 1, 01, 001, …}."
    ]
   ],
   "a": 3
  },
  {
   "q": "The FA for <code>1*01(0|1)*</code> is q0 (loop 1) –0→ q1 –1→ (q2) (loop 0,1). Which input is accepted?",
   "o": [
    [
     "1100",
     "After 1,1,0 we are in q1, and q1 has no transition on 0, so it is rejected."
    ],
    [
     "11010",
     "Correct. 1,1 loop on q0; 0 → q1; 1 → q2 (final); 0 loops on q2. It ends in the final state."
    ],
    [
     "1110",
     "It ends in q1, which is not final. 01 must appear."
    ],
    [
     "0",
     "Reading 0 moves q0 → q1, and the input ends there; q1 is not final, so \"0\" is rejected (01 must appear)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which element is in {a}* but NOT in {a}+?",
   "o": [
    [
     "a",
     "a is one concatenation, so it is in {a}* (zero or more) and in {a}+ (one or more)."
    ],
    [
     "aa",
     "aa is two concatenations, so it is in both {a}* and {a}+."
    ],
    [
     "ε",
     "Correct. Kleene closure is zero or more concatenations, so it includes the empty string; positive closure is one or more."
    ],
    [
     "Φ (the empty set)",
     "Φ is a set, not a string. Neither closure contains it as an element."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which of these is NOT a correct algebraic property of regular expressions?",
   "o": [
    [
     "s|t = t|s",
     "This law is true: | is commutative, so s|t and t|s denote the same language."
    ],
    [
     "(s*)* = s*",
     "This law is true: * is idempotent, starring a starred expression adds nothing new."
    ],
    [
     "ss* = s+",
     "This law is true by definition: ss* = s+ = s*s (one or more copies of s)."
    ],
    [
     "r(s|t) = rs|t",
     "Correct choice: this is wrong. Concatenation distributes over |, so r(s|t) = rs|rt."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which of the following is NOT a job of the lexical analysis phase according to the lecture?",
   "o": [
    [
     "Building the parse tree",
     "Correct. That is the parser's job (syntax analysis)."
    ],
    [
     "Removing comments and white space",
     "Listed on the slide: the scanner removes comments and white space (blank, tab and newline)."
    ],
    [
     "Correlating error messages with the source program",
     "Listed on the slide: the scanner correlates the compiler's error messages with the source program, e.g. by line numbers."
    ],
    [
     "Recognizing keywords",
     "Listed: keywords are recognized during scanning."
    ]
   ],
   "a": 0
  },
  {
   "q": "Compute {abc, ab, ba} ∪ {ba, bb}.",
   "o": [
    [
     "{abc, ab, ba, ba, bb}",
     "A set has no duplicates, so ba, which is in both languages, appears only once in the union."
    ],
    [
     "{abc, ab, ba, bb}",
     "Correct. Every string from either set, with ba counted once."
    ],
    [
     "{ba}",
     "{ba} is the intersection (strings in BOTH sets); the union keeps every string from either set."
    ],
    [
     "{abcba, abcbb, abba, abbb, baba, babb}",
     "That is the concatenation of the two languages."
    ]
   ],
   "a": 1
  },
  {
   "q": "\"ε (the empty string) is the same thing as the empty set Φ.\"",
   "o": [
    [
     "True",
     "ε is a string of length 0. {ε} is a set with one element, while Φ has none."
    ],
    [
     "False",
     "Correct. ‡ ε is a string of length 0, so {ε} is a set of one element (the empty string), while the empty set Φ has no elements. Careful: slide 6 words it as \"a notation of an empty string, such as Φ\"; if the doctor asks this, she may expect her own wording."
    ]
   ],
   "a": 1
  },
  {
   "q": "\"According to the lecture's comparison table, a DFA needs more time than an NFA to run an input string.\"",
   "o": [
    [
     "True",
     "Reversed. The table says the DFA takes less time and the NFA more."
    ],
    [
     "False",
     "Correct. A DFA has exactly one next state per input, so it runs any input string in less time."
    ]
   ],
   "a": 1
  }
 ],
 "3": [
  {
   "q": "Exam NFA: start 1, final 3; 1 –0→ 3; 3 –0→ 1; 3 –1→ 3; 3 –1→ 2; 2 –0→ 3. In the DFA, what is the transition from {1,3} on input 1?",
   "o": [
    [
     "{1,3}",
     "{1,3} is where {1,3} goes on input 0 (1 –0→ 3, 3 –0→ 1), not on input 1."
    ],
    [
     "{3}",
     "This takes only the loop 3 –1→ 3 and forgets the edge 3 –1→ 2."
    ],
    [
     "∅",
     "State 1 has no move on 1, but state 3 in the same set does (to 3 and to 2), so the cell is not empty."
    ],
    [
     "{2,3}",
     "Correct. 1 contributes nothing on 1; 3 goes to both 3 and 2."
    ]
   ],
   "a": 3
  },
  {
   "q": "Same NFA. After the subset construction, how many DFA states are there (not counting the dead state), and how many are final?",
   "o": [
    [
     "4 states, 3 final",
     "Correct. {1}, {3}, {2,3}, {1,3}; every set except {1} contains the final state 3."
    ],
    [
     "4 states, 1 final",
     "Every set that contains an original final state is final, not only {3}."
    ],
    [
     "3 states, 3 final",
     "This forgets the start row {1}. It is a DFA state even though it is not final, because it does not contain state 3."
    ],
    [
     "5 states, 2 final",
     "{2} alone never appears: 3 on 1 always brings 2 together with 3."
    ]
   ],
   "a": 0
  },
  {
   "q": "ε-NFA (start and final 1): 1 –b→ 2; 1 –ε→ 3; 2 –a→ 2; 2 –a,b→ 3; 3 –a→ 1. DFA transition from {3} on a?",
   "o": [
    [
     "{1}",
     "You must take the ε-closure of 1, which also contains 3."
    ],
    [
     "{1,3}",
     "Correct. 3 –a→ 1, and the cell takes the ε-closure of the result: E(1) = {1,3} because 1 –ε→ 3 (L3, worked ε-NFA)."
    ],
    [
     "{3}",
     "State 3 has no a-loop; on a it moves to 1, and the ε-closure of 1 is {1,3}, not {3}."
    ],
    [
     "{1,2,3}",
     "That is the result from {2,3} on a, which also includes 2's moves."
    ]
   ],
   "a": 1
  },
  {
   "q": "Slide transition table: S –a→ P, S –b→ Q; P –b→ R; Q –a→ {Q,T}; R –b→ F; T –a→ F, T –b→ T. Which entry makes this automaton non-deterministic?",
   "o": [
    [
     "(S, a) = P",
     "(S, a) = P has exactly one next state, which is deterministic behaviour."
    ],
    [
     "(T, b) = T",
     "A self-loop alone does not cause non-determinism."
    ],
    [
     "(Q, a) = {Q, T}",
     "Correct. On a, Q can stay in Q or move to T: two next states."
    ],
    [
     "The \"-\" entries",
     "A missing transition (no next state) is not the lecture's sign of non-determinism."
    ]
   ],
   "a": 2
  },
  {
   "q": "NFA: start 0, final 3; 0 –a→ 1; 0 –b→ 2; 2 –a→ 2; 2 –a→ 3; 1 –b→ 3. Which input string is accepted?",
   "o": [
    [
     "aba",
     "0 –a→ 1 –b→ 3, then 3 has no move on a: rejected."
    ],
    [
     "bab",
     "0 –b→ 2 –a→ {2,3}, then neither has a b-move: rejected."
    ],
    [
     "aab",
     "After a we are in 1, which has no a-move: rejected."
    ],
    [
     "baaa",
     "Correct. 0 –b→ 2, then each a gives {2,3}, which contains the final state 3. The language is ab | ba+."
    ]
   ],
   "a": 3
  },
  {
   "q": "The slide NFA A (loop 0,1) –0→ (B) becomes the DFA A: 0→{A,B}, 1→A; {A,B}: 0→{A,B}, 1→A. Which string does it accept?",
   "o": [
    [
     "0110",
     "Correct. It ends in 0, so the DFA ends in {A,B}, which is final."
    ],
    [
     "0101",
     "The last 1 sends {A,B} back to A, which is not final."
    ],
    [
     "1",
     "\"1\" keeps the DFA in A (A on 1 → A), and A is not final because it does not contain B."
    ],
    [
     "01",
     "0 moves to {A,B}, but the final 1 sends {A,B} back to A, which is not final, so 01 is rejected."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the lecture's 3-step method, when is a new row added to the second (ε-free) table?",
   "o": [
    [
     "For every original NFA state, in order",
     "Rows come from the sets that are actually reached, not from the original states."
    ],
    [
     "Whenever a new SET of states appears in a cell",
     "Correct. Start from the (ε-closure of the) start state and repeat until no new sets appear."
    ],
    [
     "Only for sets that contain a final state",
     "Non-final sets also need rows (e.g. {2} and {3} in the ε-NFA example)."
    ],
    [
     "Only for the ε column",
     "The second table is built without ε: ε only appears in the first table and is absorbed into the ε-closures."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the lecture's NFA → DFA method, what does an empty cell (-) in the DFA table mean?",
   "o": [
    [
     "The DFA accepts at that point",
     "Acceptance depends on containing an original final state, not on empty cells."
    ],
    [
     "An ε transition",
     "The DFA table has no ε column at all; ε exists only in the first NFA table."
    ],
    [
     "A dead state, or simply no transition",
     "Correct. Step 3 of the lecture method: when a cell is empty (-), the DFA goes to a dead state, or we simply draw no transition (L3, NFA → DFA method)."
    ],
    [
     "The conversion failed",
     "An empty cell is a normal result; the conversion always succeeds, and \"-\" just means that set has no move on that symbol."
    ]
   ],
   "a": 2
  },
  {
   "q": "\"In the conversion of the exam NFA (start 1, final 3), the DFA start state {1} is a final state.\"",
   "o": [
    [
     "True",
     "{1} does not contain the original final state 3."
    ],
    [
     "False",
     "Correct. Only sets containing 3 are final: {3}, {2,3} and {1,3}."
    ]
   ],
   "a": 1
  },
  {
   "q": "\"In the ε-NFA example (start and final state 1, 1 –ε→ 3), the DFA start state {1,3} is also a final state.\"",
   "o": [
    [
     "True",
     "Correct. {1,3} contains the original final state 1, so it is both start and final (marked →*)."
    ],
    [
     "False",
     "Any DFA set containing an original final state is final, and {1,3} contains 1."
    ]
   ],
   "a": 0
  }
 ],
 "4": [
  {
   "q": "Why can't the lexical analyzer check the syntax of a sentence, so that a CFG is needed?",
   "o": [
    [
     "Regular expressions are too slow for long programs",
     "The lecture says the lexer cannot check syntax because of what regular expressions can express, not because they are slow."
    ],
    [
     "Regular expressions cannot check balancing tokens such as parentheses",
     "Correct. A CFG can describe nested, balanced structures."
    ],
    [
     "The lexer does not see keywords",
     "The lexer does recognize keywords as tokens; its limit is that regular expressions cannot match nested, balanced structures."
    ],
    [
     "The lexer removes the parentheses as white space",
     "Parentheses are tokens passed to the parser, not white space. The problem is that regular expressions cannot check that they balance."
    ]
   ],
   "a": 1
  },
  {
   "q": "Grammar E → TX, X → +E | ε, T → int Y | (E), Y → *T | ε. In the <b>rightmost</b> derivation of <code>int*int</code>, what is the sentential form after the second step?",
   "o": [
    [
     "int Y X",
     "That is the second form of the LEFTMOST derivation (T replaced first)."
    ],
    [
     "TX",
     "TX is the form after the FIRST step (E ⇒ TX); in the second step the rightmost non-terminal X is replaced by ε."
    ],
    [
     "int Y",
     "int Y is after the third step (T → int Y), once X has already been removed in step 2."
    ],
    [
     "T",
     "Correct. E ⇒ TX, then the rightmost non-terminal X is replaced by ε, giving T."
    ]
   ],
   "a": 3
  },
  {
   "q": "Same grammar. In the <b>leftmost</b> derivation of <code>int*int</code>, what is the sentential form after the third step?",
   "o": [
    [
     "int * T X",
     "Correct. E ⇒ TX ⇒ int Y X ⇒ int * T X (Y → *T)."
    ],
    [
     "int Y X",
     "int Y X is after the second step (T → int Y); the third step replaces Y by *T."
    ],
    [
     "int * int Y X",
     "int * int Y X is after the fourth step, where the T in int * T X has been replaced by int Y."
    ],
    [
     "int * T",
     "That is from the rightmost derivation, where X was removed early."
    ]
   ],
   "a": 0
  },
  {
   "q": "Remove left recursion from <code>A → ABα | Aa | a</code>.",
   "o": [
    [
     "A → aA', A' → BαA' | ε",
     "This handles only the α = Bα option and loses the second recursive option Aa, so A' must also have aA'."
    ],
    [
     "A → BαA' | aA', A' → aA' | ε",
     "Bα and a are the α parts; they belong in A', and β = a goes in A."
    ],
    [
     "A → aA', A' → BαA' | aA' | ε",
     "Correct. β = a; the α's are Bα and a, each followed by A', plus ε."
    ],
    [
     "A → a | aBα | aa",
     "This only covers strings with one repetition."
    ]
   ],
   "a": 2
  },
  {
   "q": "Remove left recursion from <code>E → E+T | T</code>.",
   "o": [
    [
     "E → +TE', E' → TE' | ε",
     "α and β are swapped: the non-recursive β = T must start E, and α = +T goes in E' (E → TE', E' → +TE' | ε)."
    ],
    [
     "E → TE', E' → +TE' | ε",
     "Correct. A → Aα | β becomes A → βA', A' → αA' | ε with α = +T, β = T."
    ],
    [
     "E → T+E",
     "With no other alternative, E can never stop deriving, and this is not the lecture's A → βA', A' → αA' | ε pattern."
    ],
    [
     "E → TE', E' → +TE'",
     "Without E' → ε the derivation can never stop."
    ]
   ],
   "a": 1
  },
  {
   "q": "S → Aα | β, and A ⇒ Sd. What kind of left recursion is this?",
   "o": [
    [
     "Immediate left recursion",
     "Immediate is A → Aα, where the non-terminal is directly the first symbol of its own production."
    ],
    [
     "Right recursion",
     "Right recursion would put the non-terminal at the right end; here S comes back at the LEFT, through A (S ⇒ Aα ⇒ Sdα)."
    ],
    [
     "No left recursion",
     "S ⇒ Aα ⇒ Sdα, so S has a derivation with itself as the left-most symbol."
    ],
    [
     "Indirect left recursion",
     "Correct. The left recursion goes through another non-terminal (A)."
    ]
   ],
   "a": 3
  },
  {
   "q": "Grammar S → ABC, A → a | Aa, B → b | Bb, C → c. Which string can be derived?",
   "o": [
    [
     "aabbbc",
     "Correct. A gives aa, B gives bbb, C gives c. The language is one or more a's, one or more b's, then one c."
    ],
    [
     "abcc",
     "abcc is impossible because C → c is the only rule for C and it gives exactly one c."
    ],
    [
     "bbc",
     "bbc has no a, but A → a | Aa always produces at least one a before the b's."
    ],
    [
     "abca",
     "abca puts an a after the c, but S → ABC ends with C → c, so nothing follows the single c."
    ]
   ],
   "a": 0
  },
  {
   "q": "For E → E+E | E–E | id and the string <code>id–id+id</code>, consider the parse tree whose root operator is <b>–</b>. Which operation does it evaluate first, i.e. what grouping does it show?",
   "o": [
    [
     "–, i.e. (id–id)+id",
     "(id–id)+id is the grouping of the other tree, where + is the root and the – sub-tree is deeper, so – is done first."
    ],
    [
     "Both at the same time",
     "A parse tree always shows an order: the deepest sub-tree first."
    ],
    [
     "+, i.e. id–(id+id)",
     "Correct. The + sub-tree is the deepest, so it is evaluated first; the – at the root comes last."
    ],
    [
     "It cannot be determined from a parse tree",
     "The lecture says parse trees show precedence and associativity."
    ]
   ],
   "a": 2
  },
  {
   "q": "\"An in-order traversal of a parse tree gives the original input string.\"",
   "o": [
    [
     "True",
     "Correct. This is one of the lecture's parse-tree properties, together with: root = start symbol, leaves = terminals, interior nodes = non-terminals."
    ],
    [
     "False",
     "The lecture lists this as a parse-tree property."
    ]
   ],
   "a": 0
  },
  {
   "q": "\"The grammar E → E+T | T, T → T*F | F, F → (E) | id is ambiguous, because id+id*id has two leftmost derivations.\"",
   "o": [
    [
     "True",
     "The lecture uses this grammar as the UNAMBIGUOUS check: id+id*id has only one leftmost derivation."
    ],
    [
     "False",
     "Correct. The only LMD is E ⇒ E+T ⇒ T+T ⇒ F+T ⇒ id+T ⇒ id+T*F ⇒ id+F*F ⇒ id+id*F ⇒ id+id*id."
    ]
   ],
   "a": 1
  }
 ],
 "6": [
  {
   "q": "Expression grammar E → TE', E' → +TE' | ε, T → FT', T' → *FT' | ε, F → (E) | id. What is FOLLOW(F)?",
   "o": [
    [
     "{(, id}",
     "{(, id} is FIRST(F), the terminals F begins with. FOLLOW(F) is what can come after F: {+, *, ), $}."
    ],
    [
     "{+, ), $}",
     "That is FOLLOW(T) and FOLLOW(T'). It misses the * from FIRST(T')."
    ],
    [
     "{*, ε}",
     "{*, ε} is FIRST(T'). FOLLOW sets never contain ε; because T' can vanish, FOLLOW(T') = {+, ), $} is added instead."
    ],
    [
     "{+, *, ), $}",
     "Correct. T' → *FT' gives * (FIRST(T') − ε); T' is nullable, so FOLLOW(T') = {+, ), $} is added."
    ]
   ],
   "a": 3
  },
  {
   "q": "Same grammar. Which table cell is EMPTY (an error entry)?",
   "o": [
    [
     "M[T', +]",
     "Not empty: T' is nullable and + ∈ FOLLOW(T') = {+, ), $}, so M[T', +] = T' → ε."
    ],
    [
     "M[E, *]",
     "Correct. FIRST(TE') = {(, id}, and E has no ε-production, so E has entries only under ( and id."
    ],
    [
     "M[E', $]",
     "Not empty: E' is nullable and $ ∈ FOLLOW(E') = {), $}, so M[E', $] = E' → ε."
    ],
    [
     "M[F, id]",
     "Not empty: FIRST(id) = {id}, so table rule 1 puts F → id in M[F, id]."
    ]
   ],
   "a": 1
  },
  {
   "q": "Parsing the input <code>id</code> with the expression grammar (stack E$, input id$). What are the first three actions?",
   "o": [
    [
     "E → TE', T → FT', F → id",
     "Correct. M[E,id], M[T,id] and M[F,id]; then match id, T' → ε, E' → ε, accept."
    ],
    [
     "F → id, T → FT', E → TE'",
     "That is a bottom-up order. LL(1) expands from the start symbol (leftmost derivation)."
    ],
    [
     "E → TE', match id, T' → ε",
     "id cannot be matched while a non-terminal (T) is on top of the stack."
    ],
    [
     "E → TE', E' → ε, T → FT'",
     "The top of the stack after E → TE' is T, not E'."
    ]
   ],
   "a": 0
  },
  {
   "q": "Exam grammar S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε. What is FIRST(VW)?",
   "o": [
    [
     "{a, ε}",
     "V is nullable, so FIRST(W) must be added too."
    ],
    [
     "{a, c}",
     "V and W are both nullable, so ε belongs in FIRST(VW)."
    ],
    [
     "{a, c, ε}",
     "Correct. FIRST(V) − ε = {a}; V is nullable so add FIRST(W) − ε = {c}; both nullable so ε is added."
    ],
    [
     "{c, $, ), b}",
     "{c, $, ), b} is FOLLOW(V), the terminals that come after V. FIRST(VW) asks what VW can begin with: {a, c, ε}."
    ]
   ],
   "a": 2
  },
  {
   "q": "Same grammar. What is FOLLOW(W)?",
   "o": [
    [
     "{c, ε}",
     "{c, ε} is FIRST(W), from W → cW | ε. FOLLOW sets never contain ε, and W is last in S → UVW, so FOLLOW(W) = FOLLOW(S)."
    ],
    [
     "{c, $, ), b}",
     "That is FOLLOW(V). Nothing follows W inside S → UVW, so no c is added."
    ],
    [
     "{a, c, $, ), b}",
     "{a, c, $, ), b} is FOLLOW(U): a and c come from VW, which follows U. Nothing follows W in S → UVW, so FOLLOW(W) = {$, ), b}."
    ],
    [
     "{$, ), b}",
     "Correct. W is the last symbol of S → UVW, so FOLLOW(W) = FOLLOW(S)."
    ]
   ],
   "a": 3
  },
  {
   "q": "Example 1 after left-recursion removal: S → A, A → aBA', A' → dA' | ε, B → b. The parser is at stack <code>A$</code>, input <code>abd$</code> and applies A → aBA'. What is the stack now (top on the left)?",
   "o": [
    [
     "A'Ba$",
     "The right side is pushed so that its FIRST symbol is on top, not reversed."
    ],
    [
     "aBA'$",
     "Correct. The right side aBA' replaces A and is pushed so its first symbol is on top, giving aBA'$; the next action is match a (L6, Example 1: parsing abd)."
    ],
    [
     "BA'$",
     "BA'$ is the stack one step later, after a is matched and popped. Expanding A pushes all of aBA' first."
    ],
    [
     "aB$",
     "Expanding A pushes the whole right side aBA'. Dropping A' leaves no way to match the final d (A' → dA')."
    ]
   ],
   "a": 1
  },
  {
   "q": "S → aABe, A → Abc | b, B → d becomes A → bA', A' → bcA' | ε. While parsing abbcde, the top of the stack is A' and the current input is d. What does the parser do?",
   "o": [
    [
     "A' → bcA'",
     "A' → bcA' goes only in M[A', b], because FIRST(bcA') = {b}. On input d the parser must let A' vanish so B can match d."
    ],
    [
     "B → d",
     "B is not on top of the stack yet; A' must be removed first."
    ],
    [
     "A' → ε",
     "Correct. d ∈ FOLLOW(A') = FOLLOW(A) = FIRST(B) = {d}, so M[A', d] = A' → ε."
    ],
    [
     "Report an error",
     "M[A', d] is not empty because A' is nullable and d is in FOLLOW(A')."
    ]
   ],
   "a": 2
  },
  {
   "q": "Why is the grammar A → aB | aC, B → b, C → c NOT LL(1)?",
   "o": [
    [
     "It is left-recursive",
     "A grammar is left-recursive when A derives a string starting with A. Here both options start with the terminal a, not with A."
    ],
    [
     "Both alternatives derive ε",
     "aB derives only ab and aC derives only ac, so neither alternative derives ε. The conflict is that both start with a."
    ],
    [
     "FOLLOW(A) contains ε",
     "FOLLOW sets never contain ε (only terminals and $). The problem is that FIRST(aB) and FIRST(aC) both contain a."
    ],
    [
     "Both alternatives derive strings beginning with a, so M[A, a] gets two entries",
     "Correct. This breaks the first LL(1) condition: α and β must not both begin with the same terminal."
    ]
   ],
   "a": 3
  },
  {
   "q": "\"FOLLOW(A) may contain ε when A has an ε-production.\"",
   "o": [
    [
     "True",
     "ε can be in FIRST(A), but FOLLOW only collects terminals (and $)."
    ],
    [
     "False",
     "Correct. FOLLOW never contains ε. When A is nullable, ε goes into FIRST(A), and table entries go under FOLLOW(A)."
    ]
   ],
   "a": 1
  },
  {
   "q": "\"The grammar S → UVW, U → (S) | aSb | d, V → aV | ε, W → cW | ε is LL(1), because no cell of its parsing table holds two entries.\"",
   "o": [
    [
     "True",
     "Correct. Every cell in the S, U, V and W rows has at most one production."
    ],
    [
     "False",
     "The table built in the lecture has no conflicts, so the grammar is LL(1)."
    ]
   ],
   "a": 0
  }
 ],
 "7": [
  {
   "q": "Using the lecture's SDT rules (E → E+T, E → T, T → T*F, T → F, F → INT), what is E.val at the root for <code>3*2+4</code>?",
   "o": [
    [
     "18",
     "That is 3*(2+4). The grammar puts * deeper in the tree, so it is evaluated first."
    ],
    [
     "10",
     "Correct. T.val = 3*2 = 6, then E.val = 6 + 4 = 10."
    ],
    [
     "9",
     "9 is 3+2+4, which treats the * as a +. PR#3 first computes T.val = 3 * 2 = 6, then E adds 4."
    ],
    [
     "24",
     "24 is 3*2*4, which treats the + as a *. Only 3*2 is multiplied; then E.val = 6 + 4."
    ]
   ],
   "a": 1
  },
  {
   "q": "Same SDT rules. What is E.val at the root for <code>5+2*3+1</code>?",
   "o": [
    [
     "22",
     "That is ((5+2)*3)+1, a plain left-to-right evaluation that ignores precedence."
    ],
    [
     "28",
     "28 is (5+2)*(3+1) = 7 * 4, grouping both additions first. The grammar puts * deeper in the tree, so 2*3 is done first."
    ],
    [
     "11",
     "That is the E.val of the inner E (5+2*3) before the final +1."
    ],
    [
     "12",
     "Correct. T for 2*3 = 6; inner E = 5 + 6 = 11; root E = 11 + 1 = 12."
    ]
   ],
   "a": 3
  },
  {
   "q": "A semantic analyzer meets <code>{ int a; int a; }</code>. Which semantic error from the lecture's list is this?",
   "o": [
    [
     "Multiple declaration of a variable in one scope",
     "Correct. a is declared twice in the same block."
    ],
    [
     "Undeclared variable",
     "An undeclared variable is used without any declaration. Here a is declared, but twice in the same block."
    ],
    [
     "Type mismatch",
     "Both declarations have the same type and no value is assigned."
    ],
    [
     "Accessing an out-of-scope variable",
     "Out-of-scope access is using a variable outside the block where it is declared. Both declarations of a are in the same block."
    ]
   ],
   "a": 0
  },
  {
   "q": "A function is defined as <code>f(int p, int q)</code> but called as <code>f(5)</code>. Which semantic error from the lecture's list is this?",
   "o": [
    [
     "Reserved identifier misuse",
     "Reserved identifier misuse means using a keyword (like int or if) as a name. f, p and q are ordinary identifiers."
    ],
    [
     "Multiple declaration",
     "Multiple declaration means declaring the same name twice in one scope. Here f, p and q are each declared once."
    ],
    [
     "Actual and formal parameter mismatch",
     "Correct. One actual parameter for two formal parameters."
    ],
    [
     "Undeclared variable",
     "An undeclared variable is used with no declaration. f is defined; the problem is one argument passed for two parameters."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which of the following is NOT among the semantic errors the lecture says the semantic analyzer should recognize?",
   "o": [
    [
     "Type mismatch",
     "Type mismatch is on the lecture's list of semantic errors, so it is something the semantic analyzer should recognize."
    ],
    [
     "A missing closing parenthesis",
     "Correct. Unbalanced parentheses are a SYNTAX error, caught by the parser using the CFG."
    ],
    [
     "Undeclared variable",
     "Undeclared variable is on the lecture's list of six semantic errors, so it is something the semantic analyzer should recognize."
    ],
    [
     "Accessing an out-of-scope variable",
     "Accessing an out-of-scope variable is on the lecture's list of semantic errors, so the semantic analyzer should recognize it."
    ]
   ],
   "a": 1
  },
  {
   "q": "For the production S → ABC, an inherited attribute of B can take its value from:",
   "o": [
    [
     "only its own children",
     "Taking values only from its own children describes a synthesized attribute. An inherited attribute of B uses its parent and siblings."
    ],
    [
     "only A",
     "Inherited attributes are not limited to the left sibling: the lecture says B can take values from S, A and C."
    ],
    [
     "the lexical values only",
     "Lexical values sit at the leaves; inherited attributes come from the parent and siblings."
    ],
    [
     "S, A and C",
     "Correct. Inherited attributes come from the parent (S) and/or siblings (A, C)."
    ]
   ],
   "a": 3
  },
  {
   "q": "According to the lecture, a symbol table is:",
   "o": [
    [
     "synthesized by a declaration and inherited by the scope of that declaration",
     "Correct. This is the lecture's example of the two attribute kinds working together."
    ],
    [
     "inherited by a declaration and synthesized by its scope",
     "This reverses the lecture: the symbol table is synthesized by a declaration and then inherited by the scope of that declaration."
    ],
    [
     "only a synthesized attribute",
     "It is also inherited by the declaration's scope."
    ],
    [
     "a lexical value",
     "Lexical values are token values such as 2, 3, 4."
    ]
   ],
   "a": 0
  },
  {
   "q": "The type information gathered by the semantic analyzer is later used by the compiler during:",
   "o": [
    [
     "lexical analysis",
     "That phase came earlier and has no type information."
    ],
    [
     "parsing",
     "Parsing comes before semantic analysis and only builds the syntax tree, so it cannot use type information that is gathered later."
    ],
    [
     "intermediate-code generation",
     "Correct. The lecture says the type information is stored in the syntax tree or symbol table for this."
    ],
    [
     "removal of comments",
     "Comments are removed by the scanner at the start, long before any type information exists. Types are used in intermediate-code generation."
    ]
   ],
   "a": 2
  },
  {
   "q": "\"In an attribute grammar, attributes are appended only to the terminals of the CFG.\"",
   "o": [
    [
     "True",
     "Attributes are attached to NON-terminals (e.g. E.value). Terminals supply lexical values."
    ],
    [
     "False",
     "Correct. An attribute grammar appends attributes to one or more of the CFG's non-terminals."
    ]
   ],
   "a": 1
  },
  {
   "q": "\"In the 2+3*4 SDT example, the attributes can be evaluated with one depth-first traversal in which all children are computed before their parent.\"",
   "o": [
    [
     "True",
     "Correct. The values are synthesized, so information flows bottom-up: F, T, E for 2; then 3 and 4; T = 12; E = 14."
    ],
    [
     "False",
     "The lecture states one depth-first, bottom-up traversal is enough here."
    ]
   ],
   "a": 0
  }
 ],
 "8": [
  {
   "q": "<code>{ int p = 4; int q = 1; { int p = 5; q *= p; } q += p; }</code><br>What is the final q with STATIC binding and with DYNAMIC binding (course convention), respectively?",
   "o": [
    [
     "10 and 9",
     "Swapped. Static uses the outer p after the block; dynamic uses the most recent p."
    ],
    [
     "9 and 9",
     "Dynamic binding keeps using the most recently executed declaration p = 5."
    ],
    [
     "9 and 10",
     "Correct. Inner block: q = 1×5 = 5. Static: q = 5 + 4 = 9 (outer p). Dynamic: q = 5 + 5 = 10."
    ],
    [
     "5 and 10",
     "5 is q before the last statement; static binding still adds the outer p = 4."
    ]
   ],
   "a": 2
  },
  {
   "q": "Slide walkthrough (one table per scope): in Block 2, <code>c = a + 1</code> is processed. Where is <code>a</code> found?",
   "o": [
    [
     "In ST2, as a new local a",
     "Block 2 declares only c and d, so a is not in ST2; the lookup goes on to the parent table ST1."
    ],
    [
     "In ST1 (the parent), where it is already initiated",
     "Correct. a is not in ST2, so the parent table ST1 is searched."
    ],
    [
     "In ST3",
     "Block 3 has not been entered yet and is not a parent of Block 2."
    ],
    [
     "Nowhere, so it is an undeclared-variable error",
     "The search continues to the enclosing scope's table and finds it."
    ]
   ],
   "a": 1
  },
  {
   "q": "Same program: Block 3 is <code>{ string a; int c; print c; }</code>. Which declaration does <code>print c</code> use?",
   "o": [
    [
     "Block 1's int c",
     "Block 1's c is hidden: Block 3 declares its own int c, and the current table ST3 is searched first."
    ],
    [
     "Block 2's int c",
     "Block 2 is closed and it is not an enclosing scope of Block 3."
    ],
    [
     "None, it is out of scope",
     "c is declared in Block 3 itself (string a; int c;), so it is in scope and found in ST3."
    ],
    [
     "Block 3's own int c, found in ST3",
     "Correct. The current (local) table is searched first."
    ]
   ],
   "a": 3
  },
  {
   "q": "Same program: the last statement <code>print d</code> is in Block 1, after Block 2 has closed. What happens?",
   "o": [
    [
     "It is an access to an out-of-scope variable: d was declared only in Block 2",
     "Correct. After Block 2's closing brace, d is no longer visible."
    ],
    [
     "It prints the d from Block 2",
     "With static scoping, d's scope ends with Block 2."
    ],
    [
     "It uses Block 3's d",
     "Block 3 declares only a and c (and it is closed too), so it has no d to use."
    ],
    [
     "It is a multiple-declaration error",
     "d is declared once, in Block 2. The problem is using it outside that block, an out-of-scope access."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which low-level symbol table operation finds the current x by applying the scoping rules?",
   "o": [
    [
     "local_lookup(x)",
     "That only checks whether x is in the LOCAL (current) scope."
    ],
    [
     "insert_symbol(x)",
     "That adds x to the table (processing a declaration)."
    ],
    [
     "look_up(x)",
     "Correct. look_up(x) finds the current x via the scoping rules, searching outward from the current scope (L8, Symbol tables: low-level operations)."
    ],
    [
     "enter_scope()",
     "enter_scope() starts a new nested scope; it does not search for any identifier. look_up(x) does."
    ]
   ],
   "a": 2
  },
  {
   "q": "Solution 2 (linked list per identifier) for <code>int x=1; int y=2; { int x=3; … }</code>. While inside the inner block, x's list is [scope 1] → [scope 0]. What is at the front of x's list after the inner block exits?",
   "o": [
    [
     "The scope 1 record",
     "Scope 1's identifiers are deleted on scope exit, using the separate structure that tracks the current scope's names."
    ],
    [
     "NULL (x disappears)",
     "Only the inner declaration is removed; the outer x still exists."
    ],
    [
     "Both records, merged",
     "Records are never merged: on scope exit the scope-1 record is removed, leaving the scope-0 record at the front."
    ],
    [
     "The scope 0 record",
     "Correct. The front item is always the right one for the current scope."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which language uses dynamic binding according to the lecture?",
   "o": [
    [
     "Lisp",
     "Correct. The lecture lists Lisp, SNOBOL and Perl (through keywords)."
    ],
    [
     "C",
     "C is statically scoped: the slides name Java and C as examples of static scope, which most languages use."
    ],
    [
     "Java",
     "Java is statically scoped: the slides name it with C as a static-scope language. Lisp, SNOBOL and Perl are the dynamic examples."
    ],
    [
     "Both C and Java",
     "Most languages, including these two, use static binding."
    ]
   ],
   "a": 0
  },
  {
   "q": "What information does a symbol table associate with each identifier, per the lecture?",
   "o": [
    [
     "Only its name",
     "The name alone is just the key. The table also stores information about the declaration: its type, scope level and sometimes location."
    ],
    [
     "Its type, scope level and sometimes its location",
     "Correct. The slide definition: each identifier is associated with information about its declaration, such as its type, scope level and sometimes its location (L8, Symbol tables)."
    ],
    [
     "The machine code that uses it",
     "Code is the code generator's output, not symbol table content."
    ],
    [
     "Its parse tree",
     "Parse trees are built by the parser and are separate."
    ]
   ],
   "a": 1
  },
  {
   "q": "\"Dynamic binding can be resolved at compile time.\"",
   "o": [
    [
     "True",
     "Static binding is the one resolved at compile time, because it depends only on the program text."
    ],
    [
     "False",
     "Correct. Dynamic binding depends on execution; the system walks up the symbol-table stack at run time."
    ]
   ],
   "a": 1
  },
  {
   "q": "\"In the single-table Solution 1 (key = \"identifier,scope_id\"), a lookup may still need multiple searches.\"",
   "o": [
    [
     "True",
     "Correct. If x is not under the current scope_id, the lookup must be retried with the enclosing scopes' ids."
    ],
    [
     "False",
     "The lecture says Solution 1 may still need multiple searches, which Solution 2's linked lists avoid."
    ]
   ],
   "a": 0
  }
 ],
 "9": [
  {
   "q": "Lecture example (a = (1,2,3), i = 2, concentrate(i, a[i]) with j := j+1; x := x+3; a[2] := 0). With pass-by-VALUE, what does the procedure print (j, x, a)?",
   "o": [
    [
     "1 3 1 0 3",
     "That is pass by result, where the formals start at 0."
    ],
    [
     "3 0 1 0 3",
     "That is pass by reference, where x is an alias of a[2]."
    ],
    [
     "3 5 1 2 3",
     "a[2] := 0 changes the global array a even with pass by value."
    ],
    [
     "3 5 1 0 3",
     "Correct. j = 2+1 = 3, x = 2+3 = 5 (copies), and the global a becomes (1,0,3)."
    ]
   ],
   "a": 3
  },
  {
   "q": "Same example with pass-by-REFERENCE. What does the procedure print (j, x, a)?",
   "o": [
    [
     "3 0 1 0 3",
     "Correct. x IS a[2]: x := x+3 makes a[2] = 5, then a[2] := 0 also makes x = 0. j aliases i = 3."
    ],
    [
     "3 5 1 0 3",
     "That is pass by value; it ignores that x and a[2] are the same location."
    ],
    [
     "3 5 1 5 3",
     "a[2] := 0 runs after x := x+3, so the final value is 0."
    ],
    [
     "1 3 1 0 3",
     "1 3 1 0 3 is the pass-by-result output (formals start at 0). By reference j and x alias i and a[2], so j = 3 and x = 0."
    ]
   ],
   "a": 0
  },
  {
   "q": "Same procedure body, new data: a = (5,6,7), i = 3, call <code>concentrate(i, a[i])</code> with pass-by-VALUE-RESULT. What does the main program print for i and a after the call?",
   "o": [
    [
     "3 5 0 7",
     "That is pass by value: nothing is copied back."
    ],
    [
     "4 5 0 7",
     "This copies j back to i but forgets to copy x back to a[3]."
    ],
    [
     "4 5 0 10",
     "Correct. j = 3→4, x = 7→10, a[2] := 0. At return, i ← 4 and a[3] (address fixed at call) ← 10."
    ],
    [
     "1 5 0 3",
     "That is pass by result: formals start at 0, so j = 1 and x = 3 are copied back."
    ]
   ],
   "a": 2
  },
  {
   "q": "In <code>fun_one() { int v = 10; call fun_two(v); }</code> and <code>fun_two(int w) { print w; }</code>, which is the FORMAL parameter?",
   "o": [
    [
     "v, because it holds the value 10",
     "v appears in the call, so it is the actual parameter."
    ],
    [
     "w, because it is declared in the definition of the called function",
     "Correct. Formal parameters receive the information passed by the caller."
    ],
    [
     "Both v and w",
     "They are different roles: v is actual, w is formal."
    ],
    [
     "Neither; 10 is the formal parameter",
     "10 is the value being passed, not a parameter. w, declared in fun_two's definition, is the formal parameter."
    ]
   ],
   "a": 1
  },
  {
   "q": "Why does <b>static allocation</b> need no runtime support package for allocation and de-allocation?",
   "o": [
    [
     "Because it is used only for recursive procedures",
     "Recursive procedures need stack allocation, since each call creates a new activation at runtime."
    ],
    [
     "Because the heap reclaims the memory automatically",
     "Heap allocation is a separate, dynamic kind of storage."
    ],
    [
     "Because static data is never used at runtime",
     "Static data is used at runtime; it just stays at the same fixed location for the whole execution."
    ],
    [
     "Because data sizes and locations are known in advance and do not change during execution",
     "Correct. Data is bound to a fixed location that does not change during execution; since memory needs and locations are known in advance, no runtime support package is needed (L9, Static allocation)."
    ]
   ],
   "a": 3
  },
  {
   "q": "In the lecture-notes C memory layout, where does a global variable declared without an initial value (e.g. <code>int count;</code>) go?",
   "o": [
    [
     "The uninitialized data segment (BSS)",
     "Correct. Globals and statics without a value go to BSS; those with a value go to the initialized data segment."
    ],
    [
     "The heap",
     "The heap holds memory from malloc/realloc, freed with free."
    ],
    [
     "The stack",
     "The stack holds automatic (local) variables and stack frames."
    ],
    [
     "The text segment",
     "The text segment holds the program's code, not variables. Globals without a value go to the uninitialized data segment (BSS)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Apply the peephole techniques (constant folding / combine operations) to <code>X = (2*3)+5; y = X – Sqrt(3*8);</code>",
   "o": [
    [
     "<code>X = 6+5; y = X – Sqrt(24);</code>",
     "Only partly folded: 6+5 can also be computed, and X can be replaced by its value."
    ],
    [
     "<code>X = 16; y = 16 – Sqrt(24);</code>",
     "2*(3+5) = 16 ignores the parentheses: (2*3)+5 = 11."
    ],
    [
     "<code>X = 11; y = 11 – Sqrt(24);</code>",
     "Correct. (2*3)+5 = 11 and 3*8 = 24 are computed at compile time."
    ],
    [
     "<code>X = 11; y = X – Sqrt(3*8);</code>",
     "3*8 is also a constant expression and can be folded to 24."
    ]
   ],
   "a": 2
  },
  {
   "q": "Apply the lecture's loop optimization to <code>for (k=0; k &lt; n*2; k++) sum += b[k];</code> (n does not change inside the loop).",
   "o": [
    [
     "Remove the loop and write <code>sum += b[n*2];</code>",
     "The loop adds every b[k] for k from 0 to n*2 − 1; replacing it with one element changes the output."
    ],
    [
     "Replace <code>k++</code> with <code>k += 2</code>",
     "Stepping by 2 skips every other element, so the sum changes. Optimization must keep the output the same."
    ],
    [
     "Fold <code>n*2</code> into a constant at compile time",
     "n is a variable, so n*2 cannot be folded at compile time."
    ],
    [
     "<code>int m = n*2; for (k=0; k &lt; m; k++) sum += b[k];</code>",
     "Correct. Like arr.length → size, the bound is computed once instead of on every iteration."
    ]
   ],
   "a": 3
  },
  {
   "q": "\"The compiler can give the stack and the heap a fixed amount of memory, just like the text part.\"",
   "o": [
    [
     "True",
     "Only the text and static data are fixed. Stack and heap grow and shrink."
    ],
    [
     "False",
     "Correct. Stack and heap are at the two extremes of memory and grow and shrink against each other, so they cannot have a fixed size."
    ]
   ],
   "a": 1
  },
  {
   "q": "\"Stack allocation is very useful for recursive procedure calls.\"",
   "o": [
    [
     "True",
     "Correct. Procedure calls and their activations are managed LIFO on the stack, which fits recursion."
    ],
    [
     "False",
     "The lecture explicitly says stack allocation is very useful for recursive calls."
    ]
   ],
   "a": 0
  }
 ]
};

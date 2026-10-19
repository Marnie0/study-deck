// Practice questions written for Study Deck (not the professor's), per lecture.
window.EXTRA = window.EXTRA || {};
EXTRA.qa = {
 "1": [
  {
   "q": "According to Miller, the general aim of testing is to:",
   "o": [
    [
     "Prove that the software contains no bugs at all",
     "Miller's goal is to affirm quality, not to prove the absence of bugs."
    ],
    [
     "Fix every defect as soon as the code is written",
     "Fixing defects is debugging; Miller's aim is about affirming quality through controlled testing."
    ],
    [
     "Affirm the quality of software by systematically exercising it in carefully controlled circumstances",
     "Correct. This is Miller's goal of testing as quoted in the lecture."
    ],
    [
     "Run the software randomly in uncontrolled conditions",
     "Miller stresses <b>systematic</b> exercising in <b>carefully controlled</b> circumstances, the opposite of random use."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which of the following is NOT one of the six objectives of testing listed in the lecture?",
   "o": [
    [
     "Write the functional code of the system",
     "Correct. Writing code is development, not a testing objective."
    ],
    [
     "Identify areas of weakness",
     "Identifying areas of weakness is objective 4 of the six objectives of testing, so it IS on the lecture's list (L1, Objectives of testing)."
    ],
    [
     "Establish the degree of quality",
     "Establishing the degree of quality is objective 5 of the six objectives of testing, so it IS on the list (L1, Objectives of testing)."
    ],
    [
     "Determine user acceptability",
     "Determining user acceptability is objective 6, the last of the six objectives of testing, so it IS on the list (L1, Objectives of testing)."
    ]
   ],
   "a": 0
  },
  {
   "q": "A file manager's specification says files must <b>never</b> be deleted without asking for confirmation. During testing, the app deletes a file immediately with no confirmation. Which bug condition is this?",
   "o": [
    [
     "Condition 3: the software does something the specification does not mention",
     "The spec does mention this behaviour (it forbids it), so it is not unmentioned behaviour."
    ],
    [
     "Condition 5: the software is difficult to understand or slow",
     "Condition 5 is the customer's usability/speed view, not forbidden behaviour."
    ],
    [
     "Condition 4: the software does not do something it should do although the spec does not mention it",
     "Here the spec explicitly covers the behaviour, so condition 4 does not apply."
    ],
    [
     "Condition 2: the software does what the specification says it should not do",
     "Correct. The spec forbids deleting without confirmation and the software does exactly that."
    ]
   ],
   "a": 3
  },
  {
   "q": "A program computes an average by dividing a total by a count, and it crashes when the count is 0. It also shows 0.30000000004 instead of 0.3. Which type of bug are these?",
   "o": [
    [
     "Resource bugs",
     "Resource bugs are buffer overflows, access violations and uninitialized variables."
    ],
    [
     "Math bugs",
     "Correct. Divide-by-zero and rounding errors are the lecture's examples of math bugs."
    ],
    [
     "Co-programming bugs",
     "Co-programming bugs are deadlocks, race conditions and concurrency issues."
    ],
    [
     "Team working bugs",
     "Team working bugs are outdated documentation, mismatched files and incorrect linking."
    ]
   ],
   "a": 1
  },
  {
   "q": "In Gelperin and Hetzel's evolution of testing, which orientation <b>introduced verification and validation</b>?",
   "o": [
    [
     "Destruction-oriented (1979–1982)",
     "Destruction-oriented testing designed tests to find errors (Myers' era)."
    ],
    [
     "Evaluation-oriented (1983–1987)",
     "Correct. The lecture says evaluation-oriented testing introduced verification and validation."
    ],
    [
     "Debugging-oriented (until 1956)",
     "In that period testing simply meant debugging."
    ],
    [
     "Prevention-oriented (1988–2000)",
     "Prevention-oriented testing focused on early test design and planning to prevent defects."
    ]
   ],
   "a": 1
  },
  {
   "q": "Order these stages from the CHEAPEST to the MOST expensive place to find and fix a bug, as given in the lecture.",
   "o": [
    [
     "Coding → Requirement → Testing → Integration → Production",
     "Requirement is the cheapest stage, and integration comes before testing in cost."
    ],
    [
     "Requirement → Integration → Coding → Production → Testing",
     "Coding is moderate (cheaper than integration) and production is the most expensive."
    ],
    [
     "Production → Testing → Integration → Coding → Requirement",
     "This is the reverse order: production is the most expensive, not the cheapest."
    ],
    [
     "Requirement → Coding → Integration → Testing → Production",
     "Correct. Low → moderate → higher → very costly → extremely costly."
    ]
   ],
   "a": 3
  },
  {
   "q": "In the V-model, which test plan is produced during the <b>System design</b> stage on the left side?",
   "o": [
    [
     "Integration test plan",
     "Correct. System design ↔ integration test plan ↔ integration test."
    ],
    [
     "Acceptance test plan",
     "That comes from the requirements specifications stage."
    ],
    [
     "System test plan",
     "That comes from the functional specifications stage."
    ],
    [
     "Unit test cases",
     "Unit test cases come from the unit design stage at the bottom of the left side, not from system design (L1, V-model mapping)."
    ]
   ],
   "a": 0
  },
  {
   "q": "\"In the V-model, development on the left side goes from low level to high level, and testing on the right side goes from high level to low level.\"",
   "o": [
    [
     "True",
     "It is the other way round: development goes high → low level (down the left side) and testing goes low → high level (up the right side)."
    ],
    [
     "False",
     "Correct. Development goes from high level to low level, and testing goes from low level (unit) to high level (acceptance)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In XP's Test-Driven Development, which step comes immediately AFTER \"write/modify the functional code\"?",
   "o": [
    [
     "Create the test code",
     "That is step 1, before the functional code is written."
    ],
    [
     "Refactor the code",
     "Refactoring is step 5, the last step; after writing the functional code you first create additional tests and run them (L1, TDD)."
    ],
    [
     "Create additional tests",
     "Correct. The order is: create test code → write/modify functional code → create additional tests → test the functional code → refactor."
    ],
    [
     "Test the functional code",
     "That is step 4; additional tests are created first (step 3)."
    ]
   ],
   "a": 2
  },
  {
   "q": "\"The Patriot missile failure in the 1991 Gulf War was caused by a timing bug and led to the death of 28 soldiers.\"",
   "o": [
    [
     "True",
     "Correct. The lecture gives this as a real example of the cost of bugs."
    ],
    [
     "False",
     "The lecture states exactly this: a timing bug, 28 soldiers killed."
    ]
   ],
   "a": 0
  }
 ],
 "2": [
  {
   "q": "A password must be <b>6 to 12 characters</b> long. Which set of lengths picks exactly ONE representative from each equivalence class?",
   "o": [
    [
     "6, 12",
     "Both values are in the same valid class; the two invalid classes are not tested."
    ],
    [
     "8, 10, 12",
     "All three are from the valid class, so the invalid classes are missed."
    ],
    [
     "3, 15",
     "These cover only the two invalid classes; the valid class is missing."
    ],
    [
     "3, 8, 15",
     "Correct. 3 is in the invalid \"fewer than 6\" class, 8 in the valid 6–12 class and 15 in the invalid \"more than 12\" class."
    ]
   ],
   "a": 3
  },
  {
   "q": "A \"quantity\" field accepts whole numbers from <b>1 to 99</b>. Using boundary value analysis as in the lecture, which set gives the valid AND invalid boundary tests?",
   "o": [
    [
     "1, 50, 99",
     "50 is a mid value; the invalid boundaries 0 and 100 are missing."
    ],
    [
     "0, 1, 99, 100",
     "Correct. 1 and 99 are the valid edges; 0 and 100 are just outside (like 0 and 256 for the 1–255 text field)."
    ],
    [
     "0, 100",
     "These are only the invalid boundaries; the valid edges 1 and 99 are missing."
    ],
    [
     "2, 98",
     "These are inside the range and are not the edges."
    ]
   ],
   "a": 1
  },
  {
   "q": "A program accepts integers from <b>100 to 999</b>. Following the lecture's 10,000–99,999 example, which value is the <b>invalid left boundary</b> test?",
   "o": [
    [
     "100",
     "100 is the lowest value the program accepts, so it is the VALID left boundary (like 10000 in the lecture); the invalid one is just below it."
    ],
    [
     "1000",
     "1000 is the invalid RIGHT boundary (just above 999)."
    ],
    [
     "99",
     "Correct. It is just below the lowest valid value, like 09999 in the lecture's example."
    ],
    [
     "550",
     "550 is a valid middle value (like 50000 in the lecture's example), not a boundary; the invalid left boundary is 99."
    ]
   ],
   "a": 2
  },
  {
   "q": "When starting dynamic black-box testing, which approach should be applied FIRST?",
   "o": [
    [
     "Test-to-pass",
     "Correct. First confirm it minimally works with normal input, then push it with test-to-fail."
    ],
    [
     "Test-to-fail",
     "Test-to-fail comes after test-to-pass, like crash-testing a car only after driving it normally."
    ],
    [
     "Static black-box testing",
     "Static testing does not run the software, so it is not a dynamic black-box approach."
    ],
    [
     "Debugging",
     "Debugging fixes bugs; it is not a dynamic black-box test approach."
    ]
   ],
   "a": 0
  },
  {
   "q": "\"Trying to save a file to a disk drive with no disk inserted, where the spec says an error message must appear, is purely a test-to-pass case.\"",
   "o": [
    [
     "True",
     "The lecture says it looks like test-to-pass, but you are also forcing an error, so in the end it is probably both."
    ],
    [
     "False",
     "Correct. It checks a specified error message (test-to-pass) but also forces an error (test-to-fail), so it is probably both."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which is NOT one of the lecture's 5 ways to reduce the number of states and transitions to test?",
   "o": [
    [
     "Test every possible sequence of transitions exhaustively",
     "Correct. The point is to REDUCE the number of tests; exhaustive testing is not one of the 5 ways."
    ],
    [
     "Visit each state at least once",
     "Visiting each state at least once is way 1 of the lecture's 5 ways to reduce states and transitions, so it IS on the list."
    ],
    [
     "Test all error states and returning from them",
     "Testing all error states and returning from them is way 4 of the 5 ways, so it IS on the list."
    ],
    [
     "Test the least common paths",
     "Testing the least common paths is way 3 of the 5 ways (after each state once and the most common transitions), so it IS on the list."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of these does a state transition map NOT need to show?",
   "o": [
    [
     "Each unique state the software can be in",
     "Each unique state the software can be in is item 1 of what a state transition map shows, so the map does need it."
    ],
    [
     "The input or condition that moves the software from one state to the next",
     "The input or condition that moves the software from one state to the next is item 2 of the map (the arrows), so the map needs it."
    ],
    [
     "The source code line that implements each transition",
     "Correct. The map is drawn from the user's view; code lines belong to white-box testing."
    ],
    [
     "Conditions set and output produced when a state is entered or exited",
     "The conditions set and output produced when a state is entered or exited is item 3 of the map, so the map needs it."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the lecture's media player, you start in OFF and press: <b>fast forward → play → fast forward → stop</b>. Which state are you in at the end?",
   "o": [
    [
     "OFF",
     "Stop from FAST PLAY goes to PLAY, not OFF (only stop from PLAY or FAST FORWARD goes to OFF)."
    ],
    [
     "PLAY",
     "Correct. OFF → FAST FORWARD → PLAY → FAST PLAY, and stop from FAST PLAY returns to PLAY."
    ],
    [
     "FAST PLAY",
     "You were in FAST PLAY before the last input; stop moves you out of it."
    ],
    [
     "FAST FORWARD",
     "Play from FAST FORWARD moved you to PLAY in the second step and you never returned."
    ]
   ],
   "a": 1
  },
  {
   "q": "Process audits and checklists are examples of which term from the lecture's table?",
   "o": [
    [
     "Quality Control (QC)",
     "QC is product-focused and corrective; its examples are unit and system testing."
    ],
    [
     "Validation",
     "Validation asks \"are we building the right product?\", e.g. user acceptance testing."
    ],
    [
     "Integration testing",
     "Integration testing checks interfaces between modules."
    ],
    [
     "Quality Assurance (QA)",
     "Correct. QA is process-focused and preventive; its examples are process audits and checklists."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which is a DISADVANTAGE of black-box testing according to the lecture?",
   "o": [
    [
     "The tester must understand the source code",
     "The opposite: not needing to understand the code is an advantage."
    ],
    [
     "It cannot test all possible inputs",
     "Correct. This is listed among the black-box disadvantages."
    ],
    [
     "Test cases take a long time to develop",
     "The lecture lists quick test-case development as an advantage."
    ],
    [
     "It cannot be done from the user's perspective",
     "Black-box testing is suitable for user-perspective (GUI) testing."
    ]
   ],
   "a": 1
  }
 ],
 "3": [
  {
   "q": "Which name is NOT another name for white-box testing?",
   "o": [
    [
     "Behavioral testing",
     "Correct. Behavioral testing is another name for BLACK-box testing."
    ],
    [
     "Glass box testing",
     "Listed as another name for white-box testing."
    ],
    [
     "Structural testing",
     "Listed as another name for white-box testing."
    ],
    [
     "Clear box testing",
     "Listed as another name for white-box testing."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which is NOT one of the 4 essential elements of a formal review?",
   "o": [
    [
     "Identify problems in the design and code",
     "Identifying problems in the design and code is element 1 of the 4 essential elements of a formal review, so it IS one of them."
    ],
    [
     "Follow rules, e.g. lines of code reviewed per day",
     "Following rules (e.g. lines of code reviewed per day, time spent) is element 2 of a formal review, so it IS one of them."
    ],
    [
     "Write a report summarizing the results",
     "Writing a report summarizing the results for the development team is element 4 of a formal review, so it IS one of them."
    ],
    [
     "Rewrite the faulty code during the meeting",
     "Correct. The elements are identify problems, follow rules, prepare, and write a report; fixing code is not one of them."
    ]
   ],
   "a": 3
  },
  {
   "q": "A team lead who did NOT write a module presents its code, and the reviewers examine it from the user's and tester's perspective. Which type of formal review is this?",
   "o": [
    [
     "Walkthrough",
     "In a walkthrough the programmer who WROTE the code presents it."
    ],
    [
     "Peer review",
     "A peer review involves a programmer who helped design the code, with other programmers or testers reviewing."
    ],
    [
     "Inspection",
     "Correct. In an inspection the presenter is not the real programmer and reviewers take the user's and tester's view."
    ],
    [
     "Code coverage",
     "Code coverage is dynamic white-box testing, not a review."
    ]
   ],
   "a": 2
  },
  {
   "q": "During a code review you find a variable <code>tempTotal</code> that is declared but never used. Which error class from the checklist is this?",
   "o": [
    [
     "Computation errors",
     "Computation errors are about wrong calculations (mixed types, overflow, zero divisor)."
    ],
    [
     "Comparison errors",
     "Comparison errors are about &lt;, &gt;, =, ≠ and Boolean operands."
    ],
    [
     "Data declaration errors",
     "Correct. \"Declared but never used or used only once\" is a data declaration check."
    ],
    [
     "Input/Output errors",
     "I/O errors concern files, keyboard/mouse input and writing to file or screen."
    ]
   ],
   "a": 2
  },
  {
   "q": "A reviewer notices a <code>while</code> loop whose exit condition can never become true. Which error class is this?",
   "o": [
    [
     "Data reference errors",
     "Those are uninitialized variables, out-of-bounds subscripts and off-by-one errors."
    ],
    [
     "Data declaration errors",
     "Those are about declaring variables and constants with the right type, length and initial value."
    ],
    [
     "Input/Output errors",
     "Those concern reading and writing files and devices."
    ],
    [
     "Control flow errors",
     "Correct. Control flow checks that loops terminate and branching is correct."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which is NOT one of the types of data coverage listed in the lecture?",
   "o": [
    [
     "Statement coverage",
     "Correct. Statement coverage is a type of CODE coverage."
    ],
    [
     "Data flow",
     "Data flow is one of the three types of data coverage (data flow, sub-boundaries, error forcing), so it IS listed (L3)."
    ],
    [
     "Sub-boundaries",
     "Sub-boundaries is one of the three types of data coverage, so it IS listed; statement coverage is code coverage."
    ],
    [
     "Error forcing",
     "Error forcing is one of the three types of data coverage, so it IS listed; statement coverage belongs to code coverage."
    ]
   ],
   "a": 0
  },
  {
   "q": "<pre>1: READ X\n2: IF X &gt; 10 THEN\n3:    PRINT \"Big\"\n4: END IF\n5: PRINT \"Done\"</pre>What is the minimum number of test cases for <b>statement</b> coverage and for <b>path (branch)</b> coverage, respectively?",
   "o": [
    [
     "2 and 2",
     "One test with X &gt; 10 already runs every statement, so statement coverage needs only 1."
    ],
    [
     "1 and 2",
     "Correct. X = 20 runs every line (1); path coverage also needs a false case such as X = 5 (2), like the Christmas example."
    ],
    [
     "1 and 1",
     "One test cannot take both the true and the false branch of the IF."
    ],
    [
     "2 and 4",
     "There is only one simple condition, so path coverage needs 2, not 4."
    ]
   ],
   "a": 1
  },
  {
   "q": "<pre>1: IF Age &gt;= 18 AND Member$ = \"YES\" THEN\n2:    PRINT \"Discount\"\n3: END IF</pre>Following the lecture's condition-coverage example, each sub-condition is made true and false in every combination. How many test cases does that give?",
   "o": [
    [
     "1",
     "One case cannot make each sub-condition both true and false."
    ],
    [
     "2",
     "2 is enough for branch coverage (whole IF true once, false once), not the lecture's condition coverage table."
    ],
    [
     "8",
     "8 = 2×2×2 would need three sub-conditions; this IF has only two (Age and Member$), giving 2×2 = 4 combinations."
    ],
    [
     "4",
     "Correct. Two sub-conditions × (true, false) = 4 combinations, as in the Date$/Time$ table."
    ]
   ],
   "a": 3
  },
  {
   "q": "\"In data coverage, the code is divided into data and states just like in black-box testing, so it is easy to map white-box and black-box test cases.\"",
   "o": [
    [
     "True",
     "Correct. The lecture says exactly this about data coverage."
    ],
    [
     "False",
     "The lecture states this directly in the data coverage section."
    ]
   ],
   "a": 0
  },
  {
   "q": "Code written to standards and guidelines can run on different hardware and different compilers. Which of the 3 reasons for following standards is this?",
   "o": [
    [
     "Reliability",
     "Reliability means the code is more reliable and secure."
    ],
    [
     "Readability / Maintainability",
     "This means the code is easier to understand and maintain."
    ],
    [
     "Portability",
     "Correct. Portability means the code runs on different hardware and compilers."
    ],
    [
     "Usability",
     "Usability is not one of the 3 reasons for standards (reliability, readability/maintainability, portability); running on other hardware is portability."
    ]
   ],
   "a": 2
  }
 ],
 "4": [
  {
   "q": "A control flow graph has <b>8 edges</b>, <b>7 nodes</b> and is one connected component (P = 1). What is its cyclomatic complexity?",
   "o": [
    [
     "1",
     "1 = 8 − 7 forgets the +2P term; V(G) = E − N + 2P = 8 − 7 + 2(1) = 3."
    ],
    [
     "3",
     "Correct. V(G) = E − N + 2P = 8 − 7 + 2(1) = 3, so the graph has 3 independent paths (L4, Cyclomatic complexity)."
    ],
    [
     "5",
     "This uses P = 2 (8 − 7 + 4); the graph is one component."
    ],
    [
     "15",
     "15 = E + N = 8 + 7; the nodes are subtracted, not added: V(G) = 8 − 7 + 2 = 3."
    ]
   ],
   "a": 1
  },
  {
   "q": "<pre>read(x, y, z);\nif (x &gt; 0) { y = y + 1; }\nif (z &gt; 0) { y = y * 2; }\nif (y &gt; 10) { print(\"big\"); }\nprint(y);</pre>Using V(G) = predicate nodes + 1, what is the cyclomatic complexity?",
   "o": [
    [
     "4",
     "Correct. There are 3 simple decisions (predicate nodes), so V(G) = 3 + 1 = 4."
    ],
    [
     "3",
     "3 is the number of predicates; you must add 1."
    ],
    [
     "5",
     "5 would need 4 predicate nodes; the code has only 3 IFs (x&gt;0, z&gt;0, y&gt;10), so V(G) = 3 + 1 = 4."
    ],
    [
     "8",
     "V(G) is not 2^3; it grows by one per decision."
    ]
   ],
   "a": 0
  },
  {
   "q": "For the lecture's <code>foo(a, b, x)</code>, which path is taken with <b>a = 3, b = 0, x = 2</b>?",
   "o": [
    [
     "1, 2, 3, 5, 6",
     "Correct. a&gt;1 && b==0 is true so x = 2/3 ≈ 0.67; then a==2 is false and x&gt;1 is false, so the else (node 5) runs."
    ],
    [
     "1, 2, 3, 4, 6",
     "After node 2, x ≈ 0.67, so x&gt;1 is false, and a is not 2; node 4 is not reached."
    ],
    [
     "1, 3, 5, 6",
     "The first IF is true (3 &gt; 1 and b = 0), so node 2 runs."
    ],
    [
     "1, 3, 4, 6",
     "The first IF is true, so node 2 cannot be skipped."
    ]
   ],
   "a": 0
  },
  {
   "q": "Running the lecture's triangle pseudocode on <b>(2, 2, 4)</b>, what is finally printed?",
   "o": [
    [
     "isosceles",
     "It is set first, but the later IF (4 &gt;= 2+2) overwrites it."
    ],
    [
     "scalene",
     "Two sides are equal, so scalene is overwritten."
    ],
    [
     "bad inputs",
     "All sides are positive, so the last IF is false."
    ],
    [
     "not a triangle",
     "Correct. a==b sets isosceles, but c &gt;= a+b (4 &gt;= 4) then sets \"not a triangle\"; no side is ≤ 0."
    ]
   ],
   "a": 3
  },
  {
   "q": "Using only the four test cases in the slide's table (3,4,5 / 3,5,3 / 0,1,0 / 4,4,4), what is the minimum number of tests for <b>branch</b> coverage of the triangle pseudocode?",
   "o": [
    [
     "2",
     "(4,4,4) and (0,1,0) are both needed (only they reach equilateral, not a triangle and bad inputs), and both make the first IF true; among the table's columns only (3,4,5) makes it false, so 2 is not enough. (‡ With any input, (0,0,0) + (3,4,5) would give 2.)"
    ],
    [
     "4",
     "The slide table has 4 columns, but 3 tests are enough."
    ],
    [
     "3",
     "Correct. (4,4,4) and (0,1,0) plus (3,4,5), which makes the first IF false."
    ],
    [
     "5",
     "One test per subdomain is not required for branch coverage."
    ]
   ],
   "a": 2
  },
  {
   "q": "Under Method-Message (MM) testing, method A calls method B <b>three times</b>. How many times must the A → B call be tested?",
   "o": [
    [
     "Three times",
     "The lecture says each call is tested only once even if it happens several times."
    ],
    [
     "Once",
     "Correct. Each method call is tested at least once; repeated calls are tested only once."
    ],
    [
     "Twice",
     "MM has no two-test rule: each call is tested at least once, and repeated calls of the same method are tested only once."
    ],
    [
     "It does not need testing",
     "MM requires every method call to be tested at least once."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the stack function-pair example, what happens in the pair <b>push (Normal → Full) followed by push</b>?",
   "o": [
    [
     "The stack moves to Normal",
     "A push never moves Full to Normal; pop does that."
    ],
    [
     "The stack stays Full with no error",
     "Push from Full is an error state in the diagram."
    ],
    [
     "Error, because the stack is full",
     "Correct. This is pair 8: push on a full stack gives an error."
    ],
    [
     "The stack moves to Empty",
     "Push never empties a stack; Empty is reached only by pop from Normal. Push on a Full stack is an error (pair 8)."
    ]
   ],
   "a": 2
  },
  {
   "q": "Following the lecture's \"area of a triangle from 3 points\" functional tests, which input should have the expected output <b>\"Not a triangle\"</b>?",
   "o": [
    [
     "(2,2), (4,4), (6,6)",
     "Correct. The three points lie on the same line (y = x), so they are collinear, like (1,1), (1,5), (1,10)."
    ],
    [
     "(0,0), (4,0), (0,6)",
     "(0,0), (4,0), (0,6) are not on one line; they form a right triangle with legs 4 and 6, area ½ × 4 × 6 = 12."
    ],
    [
     "(1,1), (5,1), (1,4)",
     "(1,1), (5,1), (1,4) are not collinear; they form a right triangle with legs 4 and 3, area ½ × 4 × 3 = 6."
    ],
    [
     "(0,0), (3,0), (3,3)",
     "(0,0), (3,0), (3,3) are not collinear; they form a right triangle with legs 3 and 3, area ½ × 3 × 3 = 4.5."
    ]
   ],
   "a": 0
  },
  {
   "q": "\"Statement and branch coverage are fully appropriate for object-oriented software because they test the interactions between methods.\"",
   "o": [
    [
     "True",
     "The lecture says statement and branch coverage do not seem appropriate for OO complexity, because the interactions between methods must be tested."
    ],
    [
     "False",
     "Correct. They can be applied, but they do not test interactions between methods; MM and FP testing are used for that."
    ]
   ],
   "a": 1
  },
  {
   "q": "A planar flow graph divides the plane into <b>3 inner regions</b> plus the outer region. What is V(G)?",
   "o": [
    [
     "3",
     "3 counts only the inner regions; the outer region also counts, so V(G) = 3 + 1 = 4 (foo: 2 inner + 1 outer = 3)."
    ],
    [
     "2",
     "This subtracts instead of adding the outer region."
    ],
    [
     "5",
     "5 adds two outer regions; a planar graph has exactly one outer region, so V(G) = 3 + 1 = 4."
    ],
    [
     "4",
     "Correct. V(G) = number of regions = 3 inner + 1 outer = 4 (foo had 2 + 1 = 3)."
    ]
   ],
   "a": 3
  }
 ],
 "5": [
  {
   "q": "According to the lecture, a web site must have:",
   "o": [
    [
     "A database and a login form",
     "Many sites have these, but the lecture's requirement is a domain name and a web host."
    ],
    [
     "A domain name and a web host",
     "Correct. A web site is pages grouped under the same domain, and it must have a domain name and a web host."
    ],
    [
     "Cookies and rotating advertisements",
     "These are optional elements, not requirements."
    ],
    [
     "At least 13 pages",
     "13 is the number of testing elements, not a page count."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which is NOT one of the uses of links listed in the lecture?",
   "o": [
    [
     "Downloading files",
     "Downloading files IS one of the lecture's uses of links, alongside navigating, redirecting and opening Internet tools."
    ],
    [
     "Encrypting the user's login information",
     "Correct. Encrypting login data is checked under cookies, not a use of links."
    ],
    [
     "Opening the default e-mail client",
     "Listed: links can open other Internet tools such as Outlook."
    ],
    [
     "Directing the user to a different location",
     "Directing the user to a different location IS one of the lecture's listed uses of links."
    ]
   ],
   "a": 1
  },
  {
   "q": "A tester checks that paragraphs flow correctly around a product photo instead of overlapping it. Which of the 13 web-testing elements is this?",
   "o": [
    [
     "Images",
     "The images element is about using pictures to convey a message, not text flowing around them."
    ],
    [
     "Tables",
     "Tables are about positioning so users do not keep scrolling."
    ],
    [
     "Colors/backgrounds",
     "That checks content stays easy to read on the chosen colors."
    ],
    [
     "Wrap-around",
     "Correct. Wrap-around checks that text wraps correctly around images."
    ]
   ],
   "a": 3
  },
  {
   "q": "On a registration page, a tester checks that a \"date of birth\" entry follows the company's defined business rules. Which web-testing element is this?",
   "o": [
    [
     "Data verification",
     "Correct. Data verification checks that input matches the defined business rules."
    ],
    [
     "Cookies",
     "Cookies are about stored data working and login info being encrypted."
    ],
    [
     "Instructions",
     "That checks that all relevant instructions are present."
    ],
    [
     "Site map",
     "That checks the navigational map and its links."
    ]
   ],
   "a": 0
  },
  {
   "q": "When black-box testing an <b>e-mail link</b> on a web page, the lecture says you should:",
   "o": [
    [
     "Check only that the link text is underlined",
     "Being obvious is required for all links, but an e-mail link must also actually work."
    ],
    [
     "Read the server's HTML code",
     "That is white-box or gray-box work, not the black-box check."
    ],
    [
     "Send an e-mail through it and verify that you get a response",
     "Correct. This is the lecture's specific check for e-mail links."
    ],
    [
     "Simulate millions of connections to it",
     "That is server performance and loading testing."
    ]
   ],
   "a": 2
  },
  {
   "q": "\"If a graphic is missing or wrongly named, it will not load and the page shows an error in its place.\"",
   "o": [
    [
     "True",
     "Correct. This is why black-box testing checks that all graphics load and display properly."
    ],
    [
     "False",
     "The lecture states this in the graphics part of black-box web testing."
    ]
   ],
   "a": 0
  },
  {
   "q": "An online shop's catalog and inventory pages are filled from stored product records. Which white-box web element is this?",
   "o": [
    [
     "Dynamic content",
     "Dynamic content varies with conditions such as time of day, weather or stock tickers."
    ],
    [
     "Programmatically created pages",
     "Those are generated by pressing a button in a layout program after entering data and dragging elements."
    ],
    [
     "Security",
     "Security is about attacks such as denial of service and buffer overflow."
    ],
    [
     "Database-driven pages",
     "Correct. The lecture's examples are catalogs and inventories (e-commerce)."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which white-box web element requires simulating millions of connections and downloads?",
   "o": [
    [
     "Dynamic content",
     "Dynamic content is graphics and text that vary with conditions (time, weather, stock tickers); it does not need millions of simulated connections."
    ],
    [
     "Server performance and loading",
     "Correct. Popular sites get millions of hits per day, so the load must be simulated."
    ],
    [
     "Programmatically created pages",
     "That is about how pages are generated, not about load."
    ],
    [
     "Gray-box testing",
     "Gray-box is a mix of black- and white-box aimed at design/implementation defects."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which is NOT in the lecture's compatibility testing list?",
   "o": [
    [
     "Various screen resolutions",
     "Various screen resolutions is item 3 of the compatibility list, so it IS listed."
    ],
    [
     "Various font sizes",
     "Various font sizes is item 1 of the compatibility list, so it IS listed."
    ],
    [
     "Different printer models",
     "Correct. The list is font sizes, browsers with CSS, screen resolutions, memory sizes and network environments."
    ],
    [
     "Different network environments",
     "Different network environments is item 5 of the compatibility list, so it IS listed."
    ]
   ],
   "a": 2
  },
  {
   "q": "A designer types entries into a database, drags and drops elements in a layout program, then presses a button to generate the HTML. These are:",
   "o": [
    [
     "Programmatically created pages",
     "Correct. This is the lecture's description of programmatically created pages."
    ],
    [
     "Database-driven pages",
     "Those display catalogs and inventories from a database."
    ],
    [
     "Dynamic content",
     "Dynamic content changes with conditions like weather or time."
    ],
    [
     "Home page",
     "The home page is the site's default page with a header and source name; generating HTML from a layout program describes programmatically created pages."
    ]
   ],
   "a": 0
  }
 ],
 "6": [
  {
   "q": "The lecture defines quality as:",
   "o": [
    [
     "Conformance to requirements",
     "Correct. It is also described as the set of attributes valued by end-users."
    ],
    [
     "The absence of any testing",
     "Testing is a way to check quality, not its definition."
    ],
    [
     "The number of lines of code",
     "Lines of code is a metric, not the definition of quality."
    ],
    [
     "Fast delivery of the product",
     "Speed of delivery is not the lecture's definition."
    ]
   ],
   "a": 0
  },
  {
   "q": "\"The number of defects is an example of an indirectly measurable quality factor.\"",
   "o": [
    [
     "True",
     "Defects are the lecture's example of a DIRECTLY measurable factor; maintainability and usability are indirect."
    ],
    [
     "False",
     "Correct. Defects are directly measurable; maintainability and usability are the indirect examples."
    ]
   ],
   "a": 1
  },
  {
   "q": "A team measures how much effort it takes to move their program from one system to another. Which quality factor is this?",
   "o": [
    [
     "Flexibility",
     "Flexibility is the effort required to change the program."
    ],
    [
     "Reusability",
     "Reusability is which parts can be used in other applications."
    ],
    [
     "Portability",
     "Correct. Portability = effort required to transfer the program to another system."
    ],
    [
     "Efficiency",
     "Efficiency is the optimal use of computing resources."
    ]
   ],
   "a": 2
  },
  {
   "q": "A hospital system must ensure that only authorized staff can open patient records. Which quality factor is this?",
   "o": [
    [
     "Reliability",
     "Reliability is performing the intended function accurately."
    ],
    [
     "Integrity",
     "Correct. Integrity = control over access and security."
    ],
    [
     "Usability",
     "Usability is the effort required to learn and operate the program."
    ],
    [
     "Maintainability",
     "Maintainability is the effort required to locate and fix errors."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of these is listed as a task of <b>software testing</b> (not of QA)?",
   "o": [
    [
     "Develop standard processes",
     "Developing standard processes is a QA task example, not one of the four tasks of software testing."
    ],
    [
     "Define quality metrics and criteria",
     "Defining quality metrics and criteria is a QA task example; testing tasks are choosing the approach, executing tests, reports and review meetings."
    ],
    [
     "Create guidelines for requirements, design and coding",
     "Creating guidelines for requirements, design and coding is a QA task example, not a task of software testing."
    ],
    [
     "Attend project and design review meetings",
     "Correct. The four testing tasks are choose the test approach, execute tests, prepare V&amp;V reports and attend project and design review meetings, task 4 (L6, Tasks of testing)."
    ]
   ],
   "a": 3
  },
  {
   "q": "In a company, the test lead and the development manager both report to the project manager, who makes the final decision on releases. Which organization structure is this?",
   "o": [
    [
     "Small team",
     "In a small team the testers report to the development manager."
    ],
    [
     "Independent test team",
     "Correct. Testing feedback is considered, but the final decision lies with the project manager."
    ],
    [
     "Test group reporting to executive management",
     "There the QA, development and project managers all report to an executive manager."
    ],
    [
     "IT Service Delivery",
     "That is an ITSM category, not an organization structure."
    ]
   ],
   "a": 1
  },
  {
   "q": "\"Time taken to develop\" and \"the methodology used\" are examples of:",
   "o": [
    [
     "Process metrics",
     "Correct. Process metrics measure the development process."
    ],
    [
     "Product metrics",
     "Product metrics measure the final product, e.g. code size or number of documented pages."
    ],
    [
     "Quality factors",
     "Quality factors are attributes like reliability and usability."
    ],
    [
     "Defect indicators",
     "Defect indicators (removal rate, age profile, density) count or locate defects; development time and methodology are process metrics."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which is NOT one of the 9 common SQA metrics listed in the lecture?",
   "o": [
    [
     "Coupling",
     "Coupling IS one of the 9 common SQA metrics, alongside cohesion, so it is in the list."
    ],
    [
     "Function point analysis",
     "Function point analysis IS one of the 9 common SQA metrics listed in the lecture."
    ],
    [
     "Order of growth",
     "Order of growth IS one of the 9 common SQA metrics, listed just before source lines of code."
    ],
    [
     "Number of team meetings held",
     "Correct. The 9 metrics are code coverage, bugs per line, cyclomatic complexity, function points, classes and interfaces, cohesion, coupling, order of growth and SLOC; meetings held is not one (L6)."
    ]
   ],
   "a": 3
  },
  {
   "q": "A manager wants to know whether developers are following the procedures approved at the start of the project. Which quality indicator measures this?",
   "o": [
    [
     "Progress",
     "Progress measures the work done by the developer in each phase, not whether approved procedures are being followed."
    ],
    [
     "Stability",
     "Stability judges whether a phase's products are stable enough to proceed."
    ],
    [
     "Process compliance",
     "Correct. It measures the developer's obedience to the approved procedures."
    ],
    [
     "Defect density",
     "Defect density identifies defect-prone parts of the system."
    ]
   ],
   "a": 2
  },
  {
   "q": "What is the goal of quality management in IT (ITSM)?",
   "o": [
    [
     "To replace all testers with automated tools",
     "Replacing testers with tools is not in the lecture; ITSM's goal is delivering IT services at an agreed-upon level of quality."
    ],
    [
     "To certify the company at CMM Level 5",
     "CMM levels belong to Lecture 7's maturity model; ITSM's goal is delivering IT services at an agreed-upon level of quality."
    ],
    [
     "To deliver IT services at an agreed-upon level of quality",
     "Correct. This is the lecture's stated ITSM goal."
    ],
    [
     "To write the source code of IT services",
     "ITSM is about managing service quality, not writing code."
    ]
   ],
   "a": 2
  }
 ],
 "7": [
  {
   "q": "A company plans and tracks each project, manages its suppliers and product configurations, and measures projects. However, there is no organization-wide standard process. Which CMM level is it at?",
   "o": [
    [
     "Level 1 – Initial",
     "Level 1 has no required processes; this company already does project management."
    ],
    [
     "Level 3 – Defined",
     "Level 3 requires standardized processes across the organization."
    ],
    [
     "Level 4 – Quantitatively Managed",
     "Level 4 uses statistical and quantitative control of processes."
    ],
    [
     "Level 2 – Repeatable",
     "Correct. These are Level 2 improvements (basic project management); organization-wide standard processes would be Level 3."
    ]
   ],
   "a": 3
  },
  {
   "q": "A company has standard processes across the whole organization that each team tailors, collects process data, and runs organization-wide training, but does not yet control processes statistically. Which CMM level?",
   "o": [
    [
     "Level 3 – Defined",
     "Correct. Standardized, tailored processes and organization-wide training are Level 3."
    ],
    [
     "Level 2 – Repeatable",
     "Level 2 is basic project management without organization-wide standards."
    ],
    [
     "Level 4 – Quantitatively Managed",
     "Statistical control is missing, so it has not reached Level 4."
    ],
    [
     "Level 5 – Optimizing",
     "Level 5 is continuous improvement with change infrastructure."
    ]
   ],
   "a": 0
  },
  {
   "q": "A company already controls its processes quantitatively and now develops a change infrastructure, assesses improvements and removes the causes of defects for continuous improvement. Which CMM level?",
   "o": [
    [
     "Level 4 – Quantitatively Managed",
     "Level 4 is supervising processes quantitatively and creating capability baselines."
    ],
    [
     "Level 5 – Optimizing",
     "Correct. These are the Level 5 (change management) improvements."
    ],
    [
     "Level 3 – Defined",
     "Level 3 is standardizing processes across the organization."
    ],
    [
     "Level 1 – Initial",
     "Level 1 is ad-hoc with no required processes."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the CMM figure, which label is on the arrow from Level 2 to Level 3?",
   "o": [
    [
     "Basic management control",
     "Basic management control is the label on the arrow from Level 1 to Level 2, not from Level 2 to Level 3."
    ],
    [
     "Process measurement",
     "Process measurement labels the arrow from Level 3 to Level 4, one step further up."
    ],
    [
     "Process control",
     "Process control labels the last arrow, from Level 4 to Level 5."
    ],
    [
     "Process definition",
     "Correct. 1→2 basic management control, 2→3 process definition, 3→4 process measurement, 4→5 process control."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which CMM component is the organization's ability to meet quality expectations with its current processes, helping to predict future project outcomes?",
   "o": [
    [
     "Maturity levels",
     "Maturity levels are the 5 stages that define process capability."
    ],
    [
     "Common features",
     "Common features show whether a KPA's implementation is successful and sustainable."
    ],
    [
     "Process capability",
     "Correct. This is the lecture's definition of process capability."
    ],
    [
     "Goals",
     "Goals evaluate essential practices to see if a process area is implemented successfully."
    ]
   ],
   "a": 2
  },
  {
   "q": "\"A software delivery schedule follows a documented procedure\" is the lecture's example of which CMM component?",
   "o": [
    [
     "Key Process Areas",
     "The KPA example is \"software project delivery planning\"."
    ],
    [
     "Key practices",
     "Correct. Key practices are the actions and infrastructure needed to support a KPA."
    ],
    [
     "Maturity levels",
     "Maturity levels are the 5 stages, not an action."
    ],
    [
     "Process capability",
     "Process capability is the ability to meet quality expectations."
    ]
   ],
   "a": 1
  },
  {
   "q": "\"A company at CMM Level 2 can jump directly to Level 4 if it starts using statistical techniques.\"",
   "o": [
    [
     "True",
     "CMM is a five-level incremental approach: organizations progress gradually without skipping levels."
    ],
    [
     "False",
     "Correct. Organizations progress gradually and cannot skip levels."
    ]
   ],
   "a": 1
  },
  {
   "q": "A quality team investigates the root cause of a recurring defect so that it does not happen again. Which ISO 9000 element is this?",
   "o": [
    [
     "Corrective & preventive action",
     "Correct. Element 14, corrective &amp; preventive action, deals with finding root causes of problems so they do not recur (L7, 20 elements of ISO 9000)."
    ],
    [
     "Control of non-conforming product",
     "Control of non-conforming product (element 13) handles rejected items already found, not the root cause that prevents recurrence."
    ],
    [
     "Internal quality audits",
     "Audits check the quality system; root-cause action is element 14."
    ],
    [
     "Statistical techniques",
     "Statistical techniques (element 20) means using tools such as control charts, not acting on a defect's root cause."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which is NOT one of ISO's 8 quality management principles?",
   "o": [
    [
     "Maximizing short-term profit",
     "Correct. ISO's 8 principles are customer focus, leadership, involvement of people, process approach, system approach, continuous improvement, factual decisions and supplier relations; profit is not one (L7)."
    ],
    [
     "Customer focus",
     "Customer focus IS one of ISO's 8 quality management principles (the first in the list)."
    ],
    [
     "Factual decision making",
     "Factual decision making IS one of ISO's 8 quality management principles."
    ],
    [
     "Mutually beneficial supplier relationships",
     "Mutually beneficial supplier relationships IS one of ISO's 8 principles (the last in the list)."
    ]
   ],
   "a": 0
  },
  {
   "q": "SPICE is linked with which standard as a joint ISO and IEC initiative for software process assessment?",
   "o": [
    [
     "ISO 9000",
     "ISO 9000 is the generic quality standard with 20 elements."
    ],
    [
     "The IEEE Software Engineering Standard Collection",
     "That is IEEE's collection (since 1976), not SPICE."
    ],
    [
     "CMM",
     "CMM is from SEI and Carnegie Mellon, not ISO and IEC."
    ],
    [
     "ISO/IEC 15504",
     "Correct. SPICE with ISO/IEC 15504, introduced in 1993."
    ]
   ],
   "a": 3
  }
 ],
 "8": [
  {
   "q": "According to the normal distribution figure, how many parts per million (ppm) fall OUTSIDE the ±2σ limits?",
   "o": [
    [
     "317,300",
     "317,300 ppm fall outside ±1σ (68.27% inside), not ±2σ."
    ],
    [
     "2,700",
     "2,700 ppm fall outside ±3σ (99.73% inside), not ±2σ."
    ],
    [
     "45,500",
     "Correct. ±2σ covers 95.45%, leaving 45,500 ppm outside."
    ],
    [
     "63",
     "63 ppm fall outside ±4σ (99.9937% inside), not ±2σ."
    ]
   ],
   "a": 2
  },
  {
   "q": "A process has a variance of <b>0.25</b>. Using σ = √variance and the case study's \"Six sigma = 6 × standard deviation\", what is its Six Sigma value?",
   "o": [
    [
     "1.5",
     "This multiplies the variance by 6 instead of σ."
    ],
    [
     "3",
     "Correct. σ = √variance = √0.25 = 0.5, and the case study's Six Sigma value is 6 × σ = 6 × 0.5 = 3 (L8, Case study)."
    ],
    [
     "0.5",
     "0.5 = √0.25 is σ itself; the Six Sigma value is 6 × 0.5 = 3."
    ],
    [
     "6.25",
     "6.25 = 6 + 0.25 adds 6 to the variance; take σ = √0.25 = 0.5, then 6 × 0.5 = 3."
    ]
   ],
   "a": 1
  },
  {
   "q": "A Six Sigma team analyzes the chain of failure causes, ranks the causes by their impact and categorizes them. Which DMAIC phase is this?",
   "o": [
    [
     "Define",
     "Define identifies the problem (level, location, financial impact) and forms the team."
    ],
    [
     "Improve",
     "Improve changes processes and tests solutions on a sample."
    ],
    [
     "Analyze",
     "Correct. Analyze finds the root causes, ranks them by impact and categorizes them."
    ],
    [
     "Control",
     "Control keeps monitoring and correcting deviations."
    ]
   ],
   "a": 2
  },
  {
   "q": "After the improvements are made, the team continuously measures performance standards and corrects deviations at the specified time, and never stops monitoring. Which DMAIC phase?",
   "o": [
    [
     "Control",
     "Correct. Control means continuous monitoring and correcting deviations."
    ],
    [
     "Measure",
     "Measure plans and implements performance measurement against customer requirements before improvement."
    ],
    [
     "Analyze",
     "Analyze finds and ranks the root causes of problems before improvement; continuous monitoring after improvement is Control."
    ],
    [
     "Define",
     "Define states the problem and forms the team."
    ]
   ],
   "a": 0
  },
  {
   "q": "A company wants to design a completely NEW product process using Six Sigma. Which approach shown on the slide fits?",
   "o": [
    [
     "DMAIC",
     "DMAIC (Define, Measure, Analyze, Improve, Control) improves EXISTING processes; a new design uses DMADV (‡ not on the slides)."
    ],
    [
     "ISO 9000",
     "ISO 9000 is a quality standard, not a Six Sigma approach."
    ],
    [
     "CMM",
     "CMM is a maturity model, not a Six Sigma approach."
    ],
    [
     "DMADV (Define, Measure, Analyze, Design, Verify)",
     "Correct. DMADV is for designing new processes/products (‡ not on the slides; the slide only shows the DMADV cycle)."
    ]
   ],
   "a": 3
  },
  {
   "q": "When did Six Sigma emerge, according to the lecture?",
   "o": [
    [
     "Early 1950s",
     "Too early; the lecture says late 1970s and early 1980s."
    ],
    [
     "Late 1970s and early 1980s",
     "Correct. The lecture says Six Sigma emerged in the late 1970s and early 1980s and became popular as major global companies adopted it (L8, Introduction)."
    ],
    [
     "1993",
     "1993 is the year SPICE was introduced (L7); Six Sigma emerged in the late 1970s and early 1980s."
    ],
    [
     "After 2010",
     "Too late; it was already popular with major global companies long before."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which belt is applied to <b>middle and senior management</b>?",
   "o": [
    [
     "Yellow Belt",
     "The Yellow Belt is for all employees, not specifically middle and senior management."
    ],
    [
     "Black Belt",
     "Correct. In the belts table the Black Belt is applied to middle and senior management; Master Black Belt is for senior management only (L8, Belts)."
    ],
    [
     "Green Belt",
     "The Green Belt is for executive employees, one level below the Black Belt."
    ],
    [
     "White Belt",
     "The White Belt is step 1, the entry level in the certification figure, not for middle and senior management."
    ]
   ],
   "a": 1
  },
  {
   "q": "What is the FIRST phase of implementing Six Sigma?",
   "o": [
    [
     "Train on measurement, analysis and process redesign",
     "Training on measurement, analysis and process redesign is phase 4, after projects are selected, staff assigned and the problem documented."
    ],
    [
     "Implement and apply practical solutions",
     "Implementing practical solutions is phase 5, near the end, just before submitting solutions (phase 6)."
    ],
    [
     "Prepare a written document of the problem",
     "Preparing a written problem document (reasons, objectives, scope) is phase 3, after selecting projects and assigning employees."
    ],
    [
     "Identify and select important projects",
     "Correct. The implementation phases are<br>(1) identify and select important projects<br>(2) assign experienced employees<br>(3) document the problem<br>(4) train<br>(5) implement<br>(6) submit (L8)."
    ]
   ],
   "a": 3
  },
  {
   "q": "\"In the centred normal distribution figure, only 0.002 ppm fall outside the ±6σ limits.\"",
   "o": [
    [
     "True",
     "Correct. ±6σ covers 99.9999998%, leaving 0.002 ppm outside in the figure."
    ],
    [
     "False",
     "The figure gives 99.9999998% inside ±6σ, which is 0.002 ppm outside."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the preparatory-certificate case study, which DMAIC step \"measures the size of the impact\" of the failure causes?",
   "o": [
    [
     "Measure",
     "Correct. Define the causes → Measure their impact → Analyze sources → Improve → Control."
    ],
    [
     "Define",
     "In the case study, Define identifies the causes of failure; measuring the size of their impact is the next step, Measure."
    ],
    [
     "Improve",
     "Improve derives solutions to the failure causes; it comes after their impact is measured and their sources analyzed."
    ],
    [
     "Control",
     "Control is the last step, continuous monitoring after solutions are applied, not measuring the causes' impact."
    ]
   ],
   "a": 0
  }
 ]
};

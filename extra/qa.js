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
  },
  {
   "q": "Software testing is described in the lecture as a(n) ……… process for detecting defects and verifying that a system meets its specified requirements.",
   "o": [
    [
     "Incremental and iterative",
     "Correct. The lecture defines testing as an incremental and iterative process and an integral part of the SDLC. (L1, What is software testing?)"
    ],
    [
     "One-time and final",
     "Wrong. Testing is not done once at the end; it is incremental and iterative and part of the whole SDLC."
    ],
    [
     "Purely sequential",
     "Wrong. \"Sequential\" describes the Waterfall model, not the definition of testing."
    ],
    [
     "Random and uncontrolled",
     "Wrong. Miller says testing exercises software systematically in carefully controlled circumstances."
    ]
   ],
   "a": 0
  },
  {
   "q": "In Gelperin and Hetzel's classification, the period until 1956, when testing simply meant debugging, is called:",
   "o": [
    [
     "Demonstration-oriented",
     "Wrong. Demonstration-oriented is 1957–1978: ensure the software meets its specifications."
    ],
    [
     "Debugging-oriented",
     "Correct. Until 1956 testing was debugging-oriented. (L1, Evolution of software testing)"
    ],
    [
     "Destruction-oriented",
     "Wrong. Destruction-oriented is 1979–1982, when tests were designed to find errors (Myers)."
    ],
    [
     "Prevention-oriented",
     "Wrong. Prevention-oriented is 1988–2000, preventing defects with early test design and planning."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: Destruction-oriented testing (1979–1982), the era of Myers, designed tests to find errors.",
   "o": [
    [
     "True",
     "Correct. The table gives 1979–1982 as destruction-oriented: tests designed to find errors (Myers' era). (L1, Evolution of software testing)"
    ],
    [
     "False",
     "Wrong. The statement matches the table exactly, so it is true."
    ]
   ],
   "a": 0
  },
  {
   "q": "Who classified software testing based on the goals and phases of testing?",
   "o": [
    [
     "Miller",
     "Wrong. Miller gave the general aim of testing (affirm the quality...), not the historical classification."
    ],
    [
     "Myers",
     "Wrong. Myers is only named as the era of destruction-oriented testing (1979–1982)."
    ],
    [
     "Deve Gelperin and William C. Hetzel",
     "Correct. Gelperin and Hetzel classified testing by its goals and phases. (L1, Evolution of software testing)"
    ],
    [
     "Miller and Myers",
     "Wrong. Neither made the classification; it belongs to Gelperin and Hetzel."
    ]
   ],
   "a": 2
  },
  {
   "q": "A program reads a buffer past its end and uses a variable that was never initialized. Which type of bug is this?",
   "o": [
    [
     "Math bugs",
     "Wrong. Math bugs are divide-by-zero, overflow and rounding errors."
    ],
    [
     "Logical bugs",
     "Wrong. Logical bugs are infinite loops, wrong logic and incorrect conditions."
    ],
    [
     "Team working bugs",
     "Wrong. Team working bugs are outdated documentation, mismatched files and incorrect linking."
    ],
    [
     "Resource bugs",
     "Correct. Buffer overflow, access violations and uninitialized variables are resource bugs. (L1, Types of bugs)"
    ]
   ],
   "a": 3
  },
  {
   "q": "A loop whose exit condition is written wrongly never ends. This is an example of:",
   "o": [
    [
     "Logical bugs",
     "Correct. Infinite loops, wrong logic and incorrect conditions are logical bugs. (L1, Types of bugs)"
    ],
    [
     "Conceptual bugs",
     "Wrong. Conceptual bugs are wrong syntax, misspelled keywords and flawed design logic."
    ],
    [
     "Co-programming bugs",
     "Wrong. Co-programming bugs are deadlocks, race conditions and concurrency issues."
    ],
    [
     "Resource bugs",
     "Wrong. Resource bugs are buffer overflow, access violations and uninitialized variables."
    ]
   ],
   "a": 0
  },
  {
   "q": "A program will not compile because a keyword is misspelled. According to the lecture's table, this bug type is:",
   "o": [
    [
     "Math",
     "Wrong. Math bugs are divide-by-zero, overflow and rounding errors."
    ],
    [
     "Conceptual",
     "Correct. Wrong syntax and misspelled keywords are conceptual bugs. (L1, Types of bugs)"
    ],
    [
     "Team working",
     "Wrong. Team working bugs are outdated documentation, mismatched files and incorrect linking."
    ],
    [
     "Logical",
     "Wrong. Logical bugs are infinite loops and incorrect conditions, not misspelled keywords."
    ]
   ],
   "a": 1
  },
  {
   "q": "Two developers use different versions of the same source file, and the project documentation is out of date. Which bug type is this?",
   "o": [
    [
     "Co-programming",
     "Wrong. Co-programming bugs are deadlocks, race conditions and concurrency issues."
    ],
    [
     "Resource",
     "Wrong. Resource bugs are buffer overflow, access violations and uninitialized variables."
    ],
    [
     "Team working",
     "Correct. Outdated documentation, mismatched files and incorrect linking are team working bugs. (L1, Types of bugs)"
    ],
    [
     "Conceptual",
     "Wrong. Conceptual bugs are wrong syntax, misspelled keywords and flawed design logic."
    ]
   ],
   "a": 2
  },
  {
   "q": "A calculator gives wrong answers when its battery gets weak, although the specification never mentions the battery. Which bug condition is this?",
   "o": [
    [
     "Condition 1: does not do what the spec says",
     "Wrong. Condition 1 is a stated function that fails, like the + key not working."
    ],
    [
     "Condition 2: does what the spec says it should not",
     "Wrong. Condition 2 is forbidden behaviour such as crashing or freezing."
    ],
    [
     "Condition 3: does something the spec does not mention",
     "Wrong. Condition 3 is an extra unmentioned feature, like the \"square\" function."
    ],
    [
     "Condition 4: does not do something it should, although the spec may not mention it",
     "Correct. Working correctly on a weak battery is mandatory even if unmentioned; this is the lecture's example of condition 4. (L1, What is a bug?)"
    ]
   ],
   "a": 3
  },
  {
   "q": "A word processor's specification says the Save button stores the document, but clicking Save does nothing. Which bug condition is this?",
   "o": [
    [
     "Condition 1: the software does not do what the specification says it should",
     "Correct. A function required by the spec does not work, like the calculator's + key. (L1, What is a bug?)"
    ],
    [
     "Condition 3: the software does something the specification does not mention",
     "Wrong. Condition 3 is an extra unmentioned feature, not a missing required one."
    ],
    [
     "Condition 4: the software does not do something it should, although unmentioned",
     "Wrong. Condition 4 is about things not in the spec; here Save is explicitly in the spec."
    ],
    [
     "Condition 5: the software is difficult to understand or slow",
     "Wrong. Condition 5 is about usability and speed from the customer's view."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Bug condition 5 brings in the customer perspective: it occurs whenever the performance of the software is not acceptable to the user.",
   "o": [
    [
     "True",
     "Correct. The lecture says condition 5 is the customer perspective, and the tester's feedback brings out these negatives before the product reaches the customer. (L1, What is a bug?)"
    ],
    [
     "False",
     "Wrong. This is exactly how the lecture describes condition 5."
    ]
   ],
   "a": 0
  },
  {
   "q": "A team is forced to finish a system in half the needed time, so design and testing are compromised. Which reason for bugs is this?",
   "o": [
    [
     "Communication failure",
     "Wrong. Communication failure is miscommunication between teams."
    ],
    [
     "Unrealistic development timeframe",
     "Correct. Tight deadlines cause poor design and testing compromises. (L1, Reasons for bugs)"
    ],
    [
     "Change requests",
     "Wrong. Change requests are last-minute requirement or tool changes."
    ],
    [
     "Human factor",
     "Wrong. Human factor means mistakes in logic or syntax."
    ]
   ],
   "a": 1
  },
  {
   "q": "Inefficient coding methods and faulty tools belong to which reason for bugs?",
   "o": [
    [
     "Poor design logic",
     "Wrong. Poor design logic is inadequate research or misunderstood feasibility."
    ],
    [
     "Lack of skilled testing",
     "Wrong. That reason is about unskilled testers failing to find hidden issues."
    ],
    [
     "Poor coding practices",
     "Correct. Poor coding practices include inefficient methods and faulty tools. (L1, Reasons for bugs)"
    ],
    [
     "Communication failure",
     "Wrong. Communication failure is miscommunication between teams."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: Fixing a bug found during integration is cheaper than fixing the same bug found during coding.",
   "o": [
    [
     "True",
     "Wrong. Coding-stage cost is moderate; integration is higher because it involves the developer and engineers."
    ],
    [
     "False",
     "Correct. The order is Requirement (low), Coding (moderate), Integration (higher), Testing (very costly), Production (extremely costly). (L1, Cost of bugs)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Fixing a bug at this stage is very costly because it involves developers, engineers and managers and delays the project:",
   "o": [
    [
     "Requirement stage",
     "Wrong. The requirement stage is the cheapest: early errors are easy to correct."
    ],
    [
     "Coding stage",
     "Wrong. At coding the cost is moderate; the developer can fix it easily."
    ],
    [
     "Production stage",
     "Wrong. Production is extremely costly because of reputation and financial or legal penalties."
    ],
    [
     "Testing stage",
     "Correct. At testing, fixing is very costly: developers, engineers, managers and delays. (L1, Cost of bugs)"
    ]
   ],
   "a": 3
  },
  {
   "q": "What is the main drawback of the Waterfall model according to the lecture?",
   "o": [
    [
     "Errors made in early phases carry over to later stages and must be fixed at multiple points",
     "Correct. Early errors carry over, causing delays and higher cost. (L1, Waterfall)"
    ],
    [
     "The time taken to complete many iterations",
     "Wrong. That is the main drawback of the Spiral model."
    ],
    [
     "A missing reusable component can make the project fail",
     "Wrong. That is a disadvantage of RAD."
    ],
    [
     "It needs active customer involvement and suffers scope creep",
     "Wrong. These are disadvantages of Agile."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which Waterfall phase covers the feasibility study, goals, and performance and interface requirements?",
   "o": [
    [
     "System Engineering",
     "Wrong. System Engineering defines both software and hardware requirements."
    ],
    [
     "Analysis",
     "Correct. Analysis is the feasibility study, goals, performance and interface requirements. (L1, Waterfall)"
    ],
    [
     "Design",
     "Wrong. Design translates requirements into a software structure such as database design."
    ],
    [
     "Maintenance",
     "Wrong. Maintenance fixes issues and updates the software as new needs arise."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the Spiral model, which phase comes immediately after Planning in each cycle?",
   "o": [
    [
     "Design engineering",
     "Wrong. Design engineering is the third phase, after risk analysis."
    ],
    [
     "Customer evaluation",
     "Wrong. Customer evaluation (testing & evaluation) is the last phase of the cycle."
    ],
    [
     "Risk analysis",
     "Correct. The cycle is Planning → Risk analysis → Design engineering → Customer evaluation. (L1, Spiral model)"
    ],
    [
     "Coding",
     "Wrong. Coding is a Waterfall phase, not one of the four Spiral phases."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: The main drawback of the Spiral model is the amount of time taken to complete its iterations, which can increase costs.",
   "o": [
    [
     "True",
     "Correct. The lecture says the Spiral model can be time-consuming and costly due to multiple iterations and continuous testing. (L1, Spiral model)"
    ],
    [
     "False",
     "Wrong. This is exactly the drawback the lecture gives for Spiral."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the V-model, the test plan created at the Functional specifications stage is the:",
   "o": [
    [
     "Acceptance test plan",
     "Wrong. The acceptance test plan comes from the requirements specifications."
    ],
    [
     "Integration test plan",
     "Wrong. The integration test plan comes from the system design stage."
    ],
    [
     "Unit test cases",
     "Wrong. Test cases for unit testing come from the unit design stage."
    ],
    [
     "System test plan",
     "Correct. Functional specifications pair with the system test plan and the system test. (L1, V-Model mapping)"
    ]
   ],
   "a": 3
  },
  {
   "q": "In the V-model, which test level is performed by the customer to confirm the business requirements?",
   "o": [
    [
     "Acceptance testing",
     "Correct. Acceptance testing is done by the customer to confirm business requirements. (L1, V-Model)"
    ],
    [
     "System testing",
     "Wrong. System testing checks that the whole system meets design and performance."
    ],
    [
     "Integration testing",
     "Wrong. Integration testing checks interactions between modules."
    ],
    [
     "Unit testing",
     "Wrong. Unit testing checks individual modules."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: The V-model is less effective when requirements are incomplete or badly documented.",
   "o": [
    [
     "True",
     "Correct. This is the V-model drawback given in the lecture; it is also not suitable for every project. (L1, V-Model)"
    ],
    [
     "False",
     "Wrong. The lecture lists exactly this as the V-model's drawback."
    ]
   ],
   "a": 0
  },
  {
   "q": "……… is a linear sequential model with an extremely short development cycle that uses reusable components.",
   "o": [
    [
     "Waterfall",
     "Wrong. Waterfall is sequential but has no short cycle or reusable components."
    ],
    [
     "RAD",
     "Correct. RAD is linear sequential with an extremely short cycle and reusable components. (L1, RAD model)"
    ],
    [
     "Spiral",
     "Wrong. Spiral is iterative with risk analysis and 2 or 3 prototypes."
    ],
    [
     "V-model",
     "Wrong. The V-model integrates testing into every stage; it is not described as short-cycle."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which RAD phase uses reusable components to reduce testing time before delivering the final product?",
   "o": [
    [
     "Requirements planning",
     "Wrong. Requirements planning collects requirements and creates an outline."
    ],
    [
     "Design phase",
     "Wrong. The design phase builds a prototype with all requirements and changes."
    ],
    [
     "Testing and handover",
     "Correct. Testing and handover uses reusable components to cut testing time before delivery. (L1, RAD model)"
    ],
    [
     "Construction phase",
     "Wrong. Construction develops and improves prototypes with RAD tools until the customer is satisfied."
    ]
   ],
   "a": 2
  },
  {
   "q": "In Agile, the approach DSDM stands for:",
   "o": [
    [
     "Dynamic Software Design Model",
     "Wrong. This is not the lecture's expansion."
    ],
    [
     "Distributed System Development Method",
     "Wrong. The \"D\" is Dynamic, not Distributed."
    ],
    [
     "Defect Search and Detection Method",
     "Wrong. DSDM is a development method, not a bug-finding method."
    ],
    [
     "Dynamic Systems Development Method",
     "Correct. DSDM = Dynamic Systems Development Method; the others are SCRUM and XP. (L1, Agile model)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: In XP (Extreme Programming), programmers work in pairs: one writes the code while the other reviews and tests it.",
   "o": [
    [
     "True",
     "Correct. The lecture describes XP pair programming this way. (L1, XP and TDD)"
    ],
    [
     "False",
     "Wrong. The lecture says exactly this about XP."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which TDD step removes duplicate or unused code and reduces complexity?",
   "o": [
    [
     "Refactor the code",
     "Correct. Refactoring makes the code easier to maintain, extend and update by removing duplicate or unused code. (L1, XP and TDD)"
    ],
    [
     "Create the test code",
     "Wrong. This first step writes automated tests that define what the software should do."
    ],
    [
     "Create additional tests",
     "Wrong. Here the tester adds more tests with different inputs."
    ],
    [
     "Test the functional code",
     "Wrong. This step reruns the tests until all pass."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: In the lecture's summary, Waterfall is considered the most advanced and efficient software development model.",
   "o": [
    [
     "True",
     "Wrong. Waterfall is described only as sequential; Agile is the most advanced and efficient."
    ],
    [
     "False",
     "Correct. The summary says Agile is the most advanced and efficient; V and Spiral are more efficient than waterfall. (L1, Summary)"
    ]
   ],
   "a": 1
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
  },
  {
   "q": "Code reviews and design checks, which ask \"Are we building the product right?\", are examples of:",
   "o": [
    [
     "Validation",
     "Wrong. Validation asks \"Are we building the right product?\" (user acceptance testing)."
    ],
    [
     "Quality Control (QC)",
     "Wrong. QC is product-focused and corrective, e.g. unit and system testing."
    ],
    [
     "Verification",
     "Correct. Verification: building the product right (code reviews, design checks). (L2, Software testing terms)"
    ],
    [
     "Acceptance Testing",
     "Wrong. Acceptance testing is performed by the user/customer on the product."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: QA is product-focused and corrective, while QC is process-focused and preventive.",
   "o": [
    [
     "True",
     "Wrong. The two are swapped."
    ],
    [
     "False",
     "Correct. QA is process-focused and preventive (audits, checklists); QC is product-focused and corrective (unit and system testing). (L2, Software testing terms)"
    ]
   ],
   "a": 1
  },
  {
   "q": "\"Invalid password → 'Error' message\" lists an input, conditions and an expected output. In the lecture's table this is a:",
   "o": [
    [
     "Test plan",
     "Wrong. A test plan is a document with test objectives and scope."
    ],
    [
     "Test case",
     "Correct. A test case is input, conditions and expected output. (L2, Software testing terms)"
    ],
    [
     "Bug / Defect",
     "Wrong. A bug is a flaw causing unintended results, like a login button not working."
    ],
    [
     "Validation",
     "Wrong. Validation checks we are building the right product for the user."
    ]
   ],
   "a": 1
  },
  {
   "q": "Checking that the payment module connects correctly to the billing module is:",
   "o": [
    [
     "Integration testing",
     "Correct. Integration testing tests the interfaces between modules (payment to billing). (L2, Software testing terms)"
    ],
    [
     "Unit testing",
     "Wrong. Unit testing tests the smallest testable component, a single function or module."
    ],
    [
     "System testing",
     "Wrong. System testing tests the complete system behaviour against the specifications."
    ],
    [
     "Acceptance testing",
     "Wrong. Acceptance testing is performed by the user/customer."
    ]
   ],
   "a": 0
  },
  {
   "q": "Black-box testing is also called:",
   "o": [
    [
     "Structural testing",
     "Wrong. The lecture never calls it structural; it focuses on functionality without the internal logic."
    ],
    [
     "Static testing",
     "Wrong. Static testing is examining something that is not running; black-box can be static or dynamic."
    ],
    [
     "Unit testing",
     "Wrong. Unit testing is a test level for the smallest component."
    ],
    [
     "Behavioral testing",
     "Correct. Black-box (functional) testing is also called behavioral testing. (L2, Black-box testing)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: In the ATM example, the black-box tester checks password masking and menu navigation through the GUI without knowing the internal logic.",
   "o": [
    [
     "True",
     "Correct. The tester acts as a customer and checks functions through the GUI only. (L2, Black-box testing)"
    ],
    [
     "False",
     "Wrong. This is exactly the lecture's ATM example."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Static testing means running and using the software with data.",
   "o": [
    [
     "True",
     "Wrong. Running and using the software is dynamic testing."
    ],
    [
     "False",
     "Correct. Static testing is testing something that is not running (examining and reviewing it). (L2, Black-box testing)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Dynamic black-box testing, done from the customer's view without knowing the code, is also called:",
   "o": [
    [
     "Static testing",
     "Wrong. Static testing does not execute the software."
    ],
    [
     "Exploratory testing",
     "Correct. Dynamic black-box is also called exploratory (behavioral) testing. (L2, Static vs dynamic black-box)"
    ],
    [
     "State testing",
     "Wrong. State testing checks the program's states and transitions; it is one technique, not another name."
    ],
    [
     "Verification",
     "Wrong. Verification asks whether we build the product right, e.g. code reviews."
    ]
   ],
   "a": 1
  },
  {
   "q": "Test-to-pass is described in the lecture as:",
   "o": [
    [
     "Forcing errors with abnormal cases",
     "Wrong. That is test-to-fail."
    ],
    [
     "Reviewing the user manual without running the software",
     "Wrong. That is static black-box testing."
    ],
    [
     "\"Kindness dealing\": assuring the software minimally works with normal cases",
     "Correct. Test-to-pass uses normal cases, boundaries, sub-boundaries and default data. (L2, Test-to-pass vs test-to-fail)"
    ],
    [
     "Visiting every state at least once",
     "Wrong. That is one of the ways to reduce states in state testing."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: Since test-to-pass uses only normal input, it can never reveal bugs.",
   "o": [
    [
     "True",
     "Wrong. The lecture warns not to be surprised to find bugs even in test-to-pass."
    ],
    [
     "False",
     "Correct. \"Use test-to-pass to reveal bugs before you test-to-fail\"; bugs can appear even in test-to-pass. (L2, Test-to-pass vs test-to-fail)"
    ]
   ],
   "a": 1
  },
  {
   "q": "An equivalence class (partition) is:",
   "o": [
    [
     "A set of test cases that tests the same thing or reveals the same bug",
     "Correct. So testing one case from each class is enough. (L2, Equivalence partitioning)"
    ],
    [
     "A situation at the edge of the planned operational limits",
     "Wrong. That is the definition of a boundary condition."
    ],
    [
     "The condition or mode the software is currently in",
     "Wrong. That is a software state."
    ],
    [
     "A document with test objectives and scope",
     "Wrong. That is a test plan."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Equivalence partitioning reduces the number of test cases without lowering test quality.",
   "o": [
    [
     "True",
     "Correct. It methodically reduces the huge set of test cases to a much smaller one while still ensuring good coverage. (L2, Equivalence partitioning)"
    ],
    [
     "False",
     "Wrong. The lecture states exactly this benefit."
    ]
   ],
   "a": 0
  },
  {
   "q": "A program accepts <b>2 to 8</b> inputs. Following the lecture's \"4 to 10 inputs\" example, which numbers of inputs should be tested?",
   "o": [
    [
     "2 and 8 only",
     "Wrong. This tests only the valid edges and misses both invalid classes and a middle value."
    ],
    [
     "0, 2, 8, 10",
     "Wrong. The invalid tests should be just outside the range (1 and 9), and a middle valid value is missing."
    ],
    [
     "1, 5, 9",
     "Wrong. One per class is not what the example does; it also tests the valid boundaries 2 and 8."
    ],
    [
     "1, 2, 5, 8, 9",
     "Correct. Like 3, 4, 7, 10, 11: one below (invalid), the lower edge, a middle value, the upper edge (valid), one above (invalid). (L2, EP program example)"
    ]
   ],
   "a": 3
  },
  {
   "q": "A field accepts a 4-digit integer from <b>1000 to 9999</b>. Following the lecture's 6-test-case method, which set is correct?",
   "o": [
    [
     "1000, 5000, 9999",
     "Wrong. These are only the valid tests; the special value and both invalid boundaries are missing."
    ],
    [
     "0999, 1000, 9999, 10000",
     "Wrong. The special value 0000 and a valid mid value are missing."
    ],
    [
     "0000, 0999, 1000, 5000, 9999, 10000",
     "Correct. Special value, invalid left, valid left, valid mid, valid right, invalid right, as in 00000, 09999, 10000, 50000, 99999, 100000. (L2, EP input values)"
    ],
    [
     "0000, 1001, 5000, 9998, 10000",
     "Wrong. The boundaries are the edge values 1000 and 9999, and the invalid left 0999 is missing."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the lecture's 10,000 to 99,999 example, the test case <b>00000</b> is the:",
   "o": [
    [
     "Invalid left boundary",
     "Wrong. The invalid left boundary is 09999."
    ],
    [
     "Invalid special value",
     "Correct. 00000 is the invalid special value. (L2, EP input values)"
    ],
    [
     "Valid left boundary",
     "Wrong. The valid left boundary is 10000."
    ],
    [
     "Valid mid value",
     "Wrong. The valid mid value is 50000."
    ]
   ],
   "a": 1
  },
  {
   "q": "A print dialog allows 1 up to a maximum of 16 pages per sheet. Following the lecture's boundary example, which values should be tested?",
   "o": [
    [
     "0, 1, 16, 17",
     "Correct. Test 1, the maximum, 0 and max+1. (L2, Boundary examples)"
    ],
    [
     "1 and 16 only",
     "Wrong. This misses the invalid values just outside the limits, 0 and 17."
    ],
    [
     "8 only",
     "Wrong. A middle value alone tests no boundary at all."
    ],
    [
     "−1, 0, 17, 18",
     "Wrong. These are all invalid; the valid edges 1 and 16 are missing."
    ]
   ],
   "a": 0
  },
  {
   "q": "Boundary conditions are:",
   "o": [
    [
     "Test cases that produce similar results",
     "Wrong. That is the objective of equivalence partitioning."
    ],
    [
     "The inputs that move the software from one state to another",
     "Wrong. Those are state transitions."
    ],
    [
     "Documents describing test objectives and scope",
     "Wrong. That is a test plan."
    ],
    [
     "Situations at the edge of the planned operational limits of the software",
     "Correct. Like the edge of a cliff; bugs increase at the boundaries. (L2, Boundary conditions)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Software consists of data and program. Which of the following belongs to the <b>program</b> part?",
   "o": [
    [
     "Keyboard input",
     "Wrong. Keyboard input is listed as data."
    ],
    [
     "Mouse clicks",
     "Wrong. Mouse clicks are listed as data."
    ],
    [
     "Executable flow, transitions, logic and computations",
     "Correct. The program part is the executable flow, transitions, logic and computations. (L2, Data testing)"
    ],
    [
     "Disk files and printouts",
     "Wrong. Disk files and printouts are listed as data."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which is NOT listed in the lecture as a basis for partitioning data to reduce test cases?",
   "o": [
    [
     "Boundary conditions",
     "Wrong. Boundary conditions are listed."
    ],
    [
     "The most common state-to-state transitions",
     "Correct. That is a way to reduce state testing, not a data partition basis (boundary, sub-boundary, nulls, bad data). (L2, Data testing)"
    ],
    [
     "Nulls",
     "Wrong. Nulls are listed."
    ],
    [
     "Bad data",
     "Wrong. Bad data is listed."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: In Paint, the pencil state and the airbrush state are examples of software states.",
   "o": [
    [
     "True",
     "Correct. A software state is the condition or mode the software is in, e.g. Paint's pencil vs airbrush state. (L2, State testing)"
    ],
    [
     "False",
     "Wrong. The lecture uses exactly this example."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the following is NOT part of Paint's startup state in the lecture?",
   "o": [
    [
     "The airbrush tool is selected",
     "Correct. At startup the pencil is selected, not the airbrush. (L2, State variables)"
    ],
    [
     "The drawing area is blank",
     "Wrong. A blank drawing area is part of the startup state."
    ],
    [
     "Colors are black on white",
     "Wrong. Black on white is part of the startup state."
    ],
    [
     "The document is named \"untitled\"",
     "Wrong. The document \"untitled\" is part of the startup state."
    ]
   ],
   "a": 0
  },
  {
   "q": "A state transition map should be drawn from the point of view of:",
   "o": [
    [
     "The programmer who wrote the code",
     "Wrong. The lecture says to create the map from the user's view."
    ],
    [
     "The database designer",
     "Wrong. Database design is not involved in the state map."
    ],
    [
     "The project manager",
     "Wrong. The manager's view is not mentioned."
    ],
    [
     "The user of the software",
     "Correct. \"Create your map from the user's view of the software.\" (L2, State testing)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Media player: you are in <b>FAST PLAY</b> and press <b>stop</b>. Which state do you go to?",
   "o": [
    [
     "OFF",
     "Wrong. stop leads to OFF only from PLAY and FAST FORWARD; from FAST PLAY it leads to PLAY."
    ],
    [
     "PLAY",
     "Correct. The table gives FAST PLAY + stop → PLAY. (L2, Media player)"
    ],
    [
     "FAST FORWARD",
     "Wrong. FAST FORWARD is reached from FAST PLAY by fast forward, not stop."
    ],
    [
     "FAST PLAY",
     "Wrong. There is no stop self-loop on FAST PLAY."
    ]
   ],
   "a": 1
  },
  {
   "q": "Media player: starting in OFF, press <b>fast forward → play → fast forward → fast forward</b>. What is the final state?",
   "o": [
    [
     "PLAY",
     "Wrong. PLAY is reached after the second press; two more presses follow."
    ],
    [
     "FAST PLAY",
     "Wrong. FAST PLAY is reached after the third press; the last fast forward leaves it."
    ],
    [
     "FAST FORWARD",
     "Correct. OFF →ff→ FAST FORWARD →play→ PLAY →ff→ FAST PLAY →ff→ FAST FORWARD. (L2, Media player)"
    ],
    [
     "OFF",
     "Wrong. No stop was pressed, so OFF is never reached after the start."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: In the media player, pressing play while in FAST FORWARD moves the player to FAST PLAY.",
   "o": [
    [
     "True",
     "Wrong. FAST FORWARD + play goes to PLAY; FAST PLAY is reached from PLAY by fast forward."
    ],
    [
     "False",
     "Correct. The table gives FAST FORWARD + play → PLAY. (L2, Media player)"
    ]
   ],
   "a": 1
  },
  {
   "q": "In the media player example, how many test cases does the lecture need to cover all 8 transitions at least once?",
   "o": [
    [
     "1",
     "Wrong. One test case is enough only to visit every state, not every transition."
    ],
    [
     "2",
     "Correct. TC1 and TC2 together cover all 8 transitions. (L2, Media player answers)"
    ],
    [
     "4",
     "Wrong. There are 4 states, but the transitions are covered with 2 test cases."
    ],
    [
     "8",
     "Wrong. 8 is the number of transitions, not the number of test cases needed."
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
  },
  {
   "q": "……… testing is also called glass box, structural, open box or clear box testing, because it examines internal workings.",
   "o": [
    [
     "Black-box",
     "Black-box testing looks only at inputs and outputs, not internal workings."
    ],
    [
     "White-box",
     "Correct. White-box testing has these four other names because it looks inside the code. (L3, What white-box testing does)"
    ],
    [
     "Integration",
     "Integration testing is part of testing the pieces, not another name for white-box testing."
    ],
    [
     "Acceptance",
     "Acceptance testing is the top of the V-model's validation side, not a name for white-box testing."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: White-box testing tests logical correctness by checking both the true and the false conditions.",
   "o": [
    [
     "True",
     "Correct. Testing logical correctness (both true and false conditions) is one of the 4 things white-box testing helps with. (L3, What white-box testing does)"
    ],
    [
     "False",
     "Wrong: the lecture lists logical correctness, both true and false conditions, as a white-box goal."
    ]
   ],
   "a": 0
  },
  {
   "q": "Peer review, walkthrough and inspection are the three types of:",
   "o": [
    [
     "Code review checklist",
     "The code review checklist is a list of error classes (data reference, computation, ...), not review meetings."
    ],
    [
     "Coding standards and guidelines",
     "Standards and guidelines are rules for writing code, not types of review."
    ],
    [
     "Data coverage",
     "Data coverage is dynamic white-box testing (data flow, sub-boundaries, error forcing)."
    ],
    [
     "Formal review",
     "Correct. The figure shows Formal Review splitting into Peer Review, Walkthrough and Inspection. (L3, Formal review)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Which of the following is NOT one of the 3 parts of static white-box testing?",
   "o": [
    [
     "Formal review",
     "Formal review is one of the 3 parts of static white-box testing."
    ],
    [
     "Code coverage",
     "Correct. Code coverage (statement, path, condition) belongs to dynamic white-box testing, not static. (L3, What white-box testing does)"
    ],
    [
     "Coding standards and guidelines",
     "Coding standards and guidelines are one of the 3 static parts."
    ],
    [
     "Code review checklist",
     "The code review checklist is one of the 3 static parts."
    ]
   ],
   "a": 1
  },
  {
   "q": "In a formal review, having a fixed set of rules (e.g. the lines of code reviewed per day and the time spent) is the essential element called:",
   "o": [
    [
     "Follow rules",
     "Correct. \"Follow rules\" means a fixed set of rules such as lines reviewed per day and time spent. (L3, Formal review)"
    ],
    [
     "Prepare",
     "Prepare means every participant prepares and contributes."
    ],
    [
     "Identify problems",
     "Identify problems means finding problems in the design and code."
    ],
    [
     "Write a report",
     "Write a report means summarizing the results for the development team."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: In a formal review, the report summarizing the results is kept by the testers and is not made available to the development team.",
   "o": [
    [
     "True",
     "Wrong: the lecture says the report is made available to the development team."
    ],
    [
     "False",
     "Correct. The fourth element is \"Write a report\" summarizing results, made available to the development team. (L3, Formal review)"
    ]
   ],
   "a": 1
  },
  {
   "q": "In a walkthrough, the programmer who wrote the code presents it to a group of ……… programmers and testers.",
   "o": [
    [
     "2 or 3",
     "Too small: the lecture gives a group of 5 or 6."
    ],
    [
     "3 or 4",
     "Not the lecture's number; the group is 5 or 6."
    ],
    [
     "5 or 6",
     "Correct. The author reads through the code line by line to a group of 5 or 6 programmers and testers. (L3, Formal review)"
    ],
    [
     "10 or 12",
     "Too large: the lecture gives a group of 5 or 6."
    ]
   ],
   "a": 2
  },
  {
   "q": "In an inspection, the inspectors review the code from the ……… perspective.",
   "o": [
    [
     "user's and tester's",
     "Correct. In an inspection the presenter is not the real programmer and inspectors review from the user's and tester's perspective. (L3, Formal review)"
    ],
    [
     "programmer's and designer's",
     "This fits a peer review, where the programmer who helped design the code is involved."
    ],
    [
     "manager's and customer's",
     "The lecture does not mention managers or customers in an inspection."
    ],
    [
     "compiler's and hardware",
     "Compilers and hardware relate to portability, a reason for standards, not to inspection."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: In an inspection, the presenter is the programmer who wrote the code.",
   "o": [
    [
     "True",
     "Wrong: that describes a walkthrough; in an inspection the presenter is not the real programmer."
    ],
    [
     "False",
     "Correct. In an inspection the presenter is not the real programmer. (L3, Formal review)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: Guidelines are rules that must be adhered to, while standards are not really mandatory.",
   "o": [
    [
     "True",
     "Wrong: it is the other way round."
    ],
    [
     "False",
     "Correct. Standards are mandatory rules; guidelines help follow the standards and are not really mandatory. (L3, Coding standards and guidelines)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Code written based on standards and guidelines is easier to understand and maintain. Which of the 3 reasons for following them is this?",
   "o": [
    [
     "Portability",
     "Portability means the code runs on different hardware and compilers."
    ],
    [
     "Reliability",
     "Reliability means the code is more reliable and secure."
    ],
    [
     "Usability",
     "Usability is not one of the 3 reasons in the lecture."
    ],
    [
     "Readability / Maintainability",
     "Correct. Readability/maintainability: such code is easier to understand and maintain. (L3, Coding standards and guidelines)"
    ]
   ],
   "a": 3
  },
  {
   "q": "A reviewer checks whether array subscript values are within the array's bounds. This check belongs to:",
   "o": [
    [
     "Data declaration errors",
     "Data declaration covers length, type, storage class, initialization and similar names."
    ],
    [
     "Data reference errors",
     "Correct. Subscripts within the array bounds and off-by-one indexing are data reference checks. (L3, Generic code review checklist)"
    ],
    [
     "Computation errors",
     "Computation covers mixed types, overflow and division by zero."
    ],
    [
     "Control flow errors",
     "Control flow covers improper behaviour of loops and control structures."
    ]
   ],
   "a": 1
  },
  {
   "q": "A calculation in which the divisor could become zero is listed under:",
   "o": [
    [
     "Comparison errors",
     "Comparison errors are about &lt; vs &lt;= and Boolean operands."
    ],
    [
     "Data reference errors",
     "Data reference is about un-initialized variables and array bounds."
    ],
    [
     "Computation errors",
     "Correct. \"If it is ever possible for a divisor to be zero\" is a computation-error check. (L3, Generic code review checklist)"
    ],
    [
     "Input/output errors",
     "Input/output errors are about files, keyboard/mouse input and the screen."
    ]
   ],
   "a": 2
  },
  {
   "q": "Checking whether an integer variable containing integer values is used in a Boolean calculation is a check for:",
   "o": [
    [
     "Comparison errors",
     "Correct. Wrong operands of a Boolean operator are a comparison-error check. (L3, Generic code review checklist)"
    ],
    [
     "Computation errors",
     "Computation is about arithmetic: mixed types, size, overflow, division by zero."
    ],
    [
     "Data declaration errors",
     "Data declaration is about how variables are declared and initialized."
    ],
    [
     "Control flow errors",
     "Control flow is about loops and control structures behaving improperly."
    ]
   ],
   "a": 0
  },
  {
   "q": "An error when accepting input from the keyboard or writing to the screen belongs to:",
   "o": [
    [
     "Control flow errors",
     "Control flow errors come from loops and control structures."
    ],
    [
     "Data reference errors",
     "Data reference errors come from variables not properly declared or initialized."
    ],
    [
     "Input/output errors",
     "Correct. Reading from a file, keyboard/mouse input and writing to a file or screen are input/output errors. (L3, Generic code review checklist)"
    ],
    [
     "Computation errors",
     "Computation errors come from wrong calculations."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: Referencing an un-initialized variable is a computation error.",
   "o": [
    [
     "True",
     "Wrong: computation errors are about calculations (mixed types, overflow, division by zero)."
    ],
    [
     "False",
     "Correct. Un-initialized variables being referenced is a data reference error. (L3, Generic code review checklist)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: Possible overflow in the middle of a numeric calculation is checked under computation errors.",
   "o": [
    [
     "True",
     "Correct. Overflow in the middle of a calculation is one of the 4 computation checks. (L3, Generic code review checklist)"
    ],
    [
     "False",
     "Wrong: the lecture lists overflow mid-calculation under computation errors."
    ]
   ],
   "a": 0
  },
  {
   "q": "In dynamic white-box testing, \"testing the pieces\" means:",
   "o": [
    [
     "Formal review and inspection",
     "These are static white-box (formal review) activities."
    ],
    [
     "Data coverage and code coverage",
     "These are separate dynamic white-box topics, not \"testing the pieces\"."
    ],
    [
     "Debugging and fixing",
     "Debugging fixes bugs; it is compared with testing, not part of testing the pieces."
    ],
    [
     "Unit and integration testing",
     "Correct. Testing the pieces = unit and integration testing. (L3, Dynamic white-box testing)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Data flow, sub-boundaries and error forcing are types of:",
   "o": [
    [
     "Code coverage",
     "Code coverage types are statement, path and condition coverage."
    ],
    [
     "Data coverage",
     "Correct. The lecture lists data flow, sub-boundaries and error forcing as the types of data coverage. (L3, Data coverage and code coverage)"
    ],
    [
     "Integration testing",
     "Integration strategies are bottom-up, top-down and umbrella."
    ],
    [
     "Formal review",
     "Formal review types are peer review, walkthrough and inspection."
    ]
   ],
   "a": 1
  },
  {
   "q": "Statement coverage, path (branch) coverage and condition coverage are the 3 types of:",
   "o": [
    [
     "Code coverage",
     "Correct. The Code Coverage figure splits into Statement, Path and Condition Coverage. (L3, Data coverage and code coverage)"
    ],
    [
     "Data coverage",
     "Data coverage types are data flow, sub-boundaries and error forcing."
    ],
    [
     "Static white-box testing",
     "Static white-box is formal review, standards and guidelines, and the checklist."
    ],
    [
     "Integration testing",
     "Integration testing strategies are bottom-up, top-down and umbrella."
    ]
   ],
   "a": 0
  },
  {
   "q": "<code>if (X&lt;5) and (Y&gt;2) then B=B*X;</code> The statement-coverage test case is:",
   "o": [
    [
     "X=6, Y=3",
     "X&lt;5 is false, so B=B*X never runs."
    ],
    [
     "X=3, Y=1",
     "Y&gt;2 is false, so the AND is false and B=B*X never runs."
    ],
    [
     "X=3, Y=4",
     "Correct. 3&lt;5 and 4&gt;2 are both true, so B=B*X runs and every statement is covered. (L3, Data coverage and code coverage)"
    ],
    [
     "All answers",
     "Only X=3, Y=4 makes both parts of the AND true."
    ]
   ],
   "a": 2
  },
  {
   "q": "<code>if (A=1) or (B&lt;0) then C=C-1;</code> The statement-coverage test cases are:",
   "o": [
    [
     "A=1, B=5",
     "This works (A=1 is true), but it is not the only one."
    ],
    [
     "A=0, B=-2",
     "This works (B&lt;0 is true), but it is not the only one."
    ],
    [
     "A=1, B=-1",
     "This works (both parts true), but it is not the only one."
    ],
    [
     "All answers",
     "Correct. With OR, one true part is enough, and each option makes at least one part true, so C=C-1 runs for all of them. (L3, Data coverage and code coverage)"
    ]
   ],
   "a": 3
  },
  {
   "q": "<code>if (X&gt;2) and (Y=1) then A=A-X;</code><br><code>if (X=4) or (A&lt;0) then A=A*2;</code><br>The statement-coverage test case (one test that runs both THEN statements) is:",
   "o": [
    [
     "X=3, Y=1, A=10",
     "The first IF runs (A=7), but X=4 is false and A&lt;0 is false, so A=A*2 is skipped."
    ],
    [
     "X=4, Y=1, A=10",
     "Correct. 4&gt;2 and Y=1 → A=10−4=6; then X=4 is true → A=12. Both statements run. (L3, Data coverage and code coverage)"
    ],
    [
     "X=4, Y=0, A=5",
     "Y=1 is false, so A=A-X is skipped; only the second IF runs."
    ],
    [
     "All answers",
     "Only X=4, Y=1, A=10 runs both THEN statements."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the lecture's path-coverage example (<code>IF Date$ = \"25-12-2008\"</code>), which lines run when Date$ = \"01-01-2009\"?",
   "o": [
    [
     "1, 2, 5, 6, 7",
     "Correct. Any date other than 25-12-2008 makes the IF false, so lines 3 and 4 are skipped. (L3, Data coverage and code coverage)"
    ],
    [
     "1, 2, 3, 4, 5, 6, 7",
     "This is the path for Date$ = \"25-12-2008\" only."
    ],
    [
     "1, 3, 5, 7",
     "Line 2 (the IF) always runs, and lines 5 and 6 both run."
    ],
    [
     "1, 2, 3, 7",
     "Line 3 needs the IF to be true, and lines 5 and 6 always run."
    ]
   ],
   "a": 0
  },
  {
   "q": "Following the lecture's full condition coverage method (every combination of the sub-conditions), how many test cases does <code>IF A AND B AND C THEN ...</code> need?",
   "o": [
    [
     "3",
     "That would test each sub-condition once, not every true/false combination."
    ],
    [
     "4",
     "4 is for 2 sub-conditions (2 × 2), like the lecture's Date/Time example."
    ],
    [
     "2",
     "2 is branch coverage (whole IF true once, false once), not full condition coverage."
    ],
    [
     "8",
     "Correct. Each of the 3 sub-conditions is true or false: 2 × 2 × 2 = 8 combinations. (L3, Why condition coverage needs more cases)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: In the condition coverage example, the test case Date$ = \"25-12-2008\", Time$ = \"11:11:11\" runs line 3 (PRINT \"MERRY CHRISTMAS\").",
   "o": [
    [
     "True",
     "Wrong: the Time part is false, so the AND is false and line 3 is skipped."
    ],
    [
     "False",
     "Correct. Only (25-12-2008, 00:00:00) runs line 3; this case runs 1, 2, 5, 6, 7. (L3, Test cases for full condition coverage)"
    ]
   ],
   "a": 1
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
  },
  {
   "q": "In the V-model figure, the dotted arrow from Requirements Specifications to Acceptance Test is labelled:",
   "o": [
    [
     "Acceptance Test Plan",
     "Correct. Requirements Specifications → Acceptance Test is labelled Acceptance Test Plan. (L4, V-model: verification and validation)"
    ],
    [
     "System Test Plan",
     "System Test Plan links Functional Specifications to System Test."
    ],
    [
     "Integration Test Plan",
     "Integration Test Plan links System Design to Integration Test."
    ],
    [
     "Test Cases",
     "\"Test Cases\" sits between Unit Design and Unit Test."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: In the V-model figure, the words \"Test Cases\" sit between Unit Design and Unit Test.",
   "o": [
    [
     "True",
     "Correct. The figure places \"Test Cases\" between Unit Design and Unit Test. (L4, V-model: verification and validation)"
    ],
    [
     "False",
     "Wrong: that is exactly where the figure puts \"Test Cases\"; the other links are test plans."
    ]
   ],
   "a": 0
  },
  {
   "q": "A control flow graph has <b>10 edges</b> and <b>8 nodes</b> and is one connected component (P = 1). What is V(G)?",
   "o": [
    [
     "2",
     "This is E − N without adding 2P."
    ],
    [
     "4",
     "Correct. V(G) = E − N + 2P = 10 − 8 + 2(1) = 4. (L4, Cyclomatic complexity and basis paths)"
    ],
    [
     "6",
     "This uses P = 2 (10 − 8 + 4); the graph is one component, so P = 1 and V(G) = 4."
    ],
    [
     "18",
     "This adds E and N instead of subtracting."
    ]
   ],
   "a": 1
  },
  {
   "q": "A flow graph has <b>9 edges</b>, <b>9 nodes</b> and <b>2 connected components</b> (P = 2). Using V(G) = E − N + 2P, what is V(G)?",
   "o": [
    [
     "2",
     "This uses P = 1 (9 − 9 + 2); here P = 2."
    ],
    [
     "0",
     "This forgets the 2P term (9 − 9)."
    ],
    [
     "4",
     "Correct. V(G) = 9 − 9 + 2(2) = 4. (L4, Cyclomatic complexity and basis paths)"
    ],
    [
     "11",
     "This adds 2 to E alone (9 + 2); N must be subtracted and P = 2."
    ]
   ],
   "a": 2
  },
  {
   "q": "A flow graph has <b>4 predicate (decision) nodes</b>. Using V(G) = predicate nodes + 1, what is V(G)?",
   "o": [
    [
     "3",
     "This subtracts 1 instead of adding it."
    ],
    [
     "4",
     "This forgets the + 1."
    ],
    [
     "8",
     "This doubles the predicates; the formula adds 1."
    ],
    [
     "5",
     "Correct. V(G) = 4 + 1 = 5. (L4, Cyclomatic complexity and basis paths)"
    ]
   ],
   "a": 3
  },
  {
   "q": "The planar control flow graph of the lecture's <code>foo()</code> divides the plane into how many regions (inner + outer)?",
   "o": [
    [
     "3",
     "Correct. 2 inner regions + 1 outer = 3, matching V(G) = 3. (L4, Cyclomatic complexity and basis paths)"
    ],
    [
     "2",
     "2 is only the inner regions; the outer region also counts."
    ],
    [
     "4",
     "foo() has 2 inner regions, not 3."
    ],
    [
     "7",
     "7 is the number of edges, not regions."
    ]
   ],
   "a": 0
  },
  {
   "q": "<pre>public int bar(int a, int b) {\n1.  if (a&gt;0 &amp;&amp; b&gt;0) {\n2.     b = b-a;\n    }\n3.  if (b==0 || a&gt;5) {\n4.     a = a+1;\n    }\n    else\n5.     a = a*2;\n6.  return (a+b);\n}</pre>The control flow graph of <code>bar()</code> is built like <code>foo()</code>. Which path does <b>bar(3, 3)</b> follow?",
   "o": [
    [
     "1, 2, 3, 4, 6",
     "Correct. 3&gt;0 and 3&gt;0 → b = 3−3 = 0 (node 2); b==0 is true → node 4. (L4, Checking the test cases)"
    ],
    [
     "1, 3, 4, 6",
     "The first IF is true (a&gt;0 and b&gt;0), so node 2 is not skipped."
    ],
    [
     "1, 2, 3, 5, 6",
     "After node 2, b = 0, so b==0 is true and the path goes to node 4, not the else."
    ],
    [
     "1, 3, 5, 6",
     "Both IFs are true here, so neither node 2 nor node 4 is skipped."
    ]
   ],
   "a": 0
  },
  {
   "q": "<pre>public int bar(int a, int b) {\n1.  if (a&gt;0 &amp;&amp; b&gt;0) {\n2.     b = b-a;\n    }\n3.  if (b==0 || a&gt;5) {\n4.     a = a+1;\n    }\n    else\n5.     a = a*2;\n6.  return (a+b);\n}</pre>What does <b>bar(2, 5)</b> return?",
   "o": [
    [
     "6",
     "This takes node 4 (a = 3), but b = 3 is not 0 and a = 2 is not &gt; 5, so the else runs."
    ],
    [
     "7",
     "Correct. 2&gt;0 and 5&gt;0 → b = 5−2 = 3; b==0 false and a&gt;5 false → a = 2*2 = 4; return 4 + 3 = 7 (path 1,2,3,5,6). (L4, Checking the test cases)"
    ],
    [
     "9",
     "This skips node 2 (b stays 5): 4 + 5 = 9. But the first IF is true."
    ],
    [
     "3",
     "This returns b alone; the function returns a + b."
    ]
   ],
   "a": 1
  },
  {
   "q": "For the lecture's <code>foo(a, b, x)</code>, which path does <b>a = 4, b = 1, x = 3</b> follow?",
   "o": [
    [
     "1, 2, 3, 4, 6",
     "Node 2 needs b==0; here b = 1, so node 2 is skipped."
    ],
    [
     "1, 3, 5, 6",
     "x = 3 &gt; 1 makes the second IF true, so the path goes to node 4, not the else."
    ],
    [
     "1, 3, 4, 6",
     "Correct. b==0 is false → skip node 2; a==2 is false but x&gt;1 is true → node 4. (L4, Checking the test cases)"
    ],
    [
     "1, 2, 3, 5, 6",
     "Both decisions are wrong here: node 2 is skipped and node 4 is taken."
    ]
   ],
   "a": 2
  },
  {
   "q": "What does the lecture's <code>foo(2, 0, 4)</code> return? (<code>return (a+x)</code>)",
   "o": [
    [
     "7",
     "This skips node 2 (x = 4 + 1 = 5, 2 + 5 = 7), but a&gt;1 &amp;&amp; b==0 is true."
    ],
    [
     "3",
     "3 is the final x, not a + x."
    ],
    [
     "6",
     "This takes the else (x = 2 * 2 = 4, 2 + 4 = 6), but a==2 is true so node 4 runs."
    ],
    [
     "5",
     "Correct. x = 4/2 = 2 (node 2); a==2 → x = 2+1 = 3 (node 4); return 2 + 3 = 5. (L4, Checking the test cases)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: Since V(G) of foo() is 3, foo() needs at least 3 test cases to achieve branch coverage.",
   "o": [
    [
     "True",
     "Wrong: V(G) = 3 is the number of basis-path tests; branch coverage of foo() needs only 2."
    ],
    [
     "False",
     "Correct. a=2, b=0 makes both IFs true and a=0, b=0, x=0 makes both false, so 2 tests give branch coverage. (L4, Checking the test cases)"
    ]
   ],
   "a": 1
  },
  {
   "q": "In the control flow graph of <code>foo()</code>, the predicate (decision) nodes are:",
   "o": [
    [
     "Nodes 1 and 3",
     "Correct. Nodes 1 and 3 are the two IFs, so V(G) = 2 + 1 = 3. (L4, Cyclomatic complexity and basis paths)"
    ],
    [
     "Nodes 2 and 4",
     "Nodes 2 and 4 are assignments (x = x/a and x = x+1)."
    ],
    [
     "Nodes 1 and 6",
     "Node 6 is the return statement, not a decision."
    ],
    [
     "Nodes 3 and 5",
     "Node 5 is the else assignment x = x*a, not a decision."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: In V(G) = E − N + 2P, P is the number of predicate nodes.",
   "o": [
    [
     "True",
     "Wrong: predicate nodes appear in the other formula, V(G) = predicate nodes + 1."
    ],
    [
     "False",
     "Correct. P is the number of connected components, usually 1. (L4, Cyclomatic complexity and basis paths)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Running the lecture's triangle pseudocode on <b>(4, 4, 7)</b>, what is finally printed?",
   "o": [
    [
     "not a triangle",
     "7 ≥ 4+4 = 8 is false, so the \"not a triangle\" IF is not taken."
    ],
    [
     "isosceles",
     "Correct. a==b sets isosceles; not all equal; no side ≥ the sum of the others (7 &lt; 8); all positive. (L4, Triangle problem: functional (black-box) testing)"
    ],
    [
     "equilateral",
     "Equilateral needs a==b and a==c; c = 7 differs."
    ],
    [
     "scalene",
     "Two sides are equal (a==b), so the type changes from scalene to isosceles."
    ]
   ],
   "a": 1
  },
  {
   "q": "For the triangle test case <b>(3, 4, 5)</b>, which nodes of the statement-coverage table are NOT executed?",
   "o": [
    [
     "C, E, G, I",
     "C, E, G, I are the IF tests; every test case executes them."
    ],
    [
     "A, B, K",
     "A (read), B (type = scalene) and K (print) run for every test case."
    ],
    [
     "D, F, H, J",
     "Correct. (3,4,5) makes every IF false, so it skips isosceles (D), equilateral (F), not a triangle (H) and bad inputs (J). (L4, Triangle: statement and branch coverage)"
    ],
    [
     "F only",
     "Only (4,4,4) reaches F, but (3,4,5) also skips D, H and J."
    ]
   ],
   "a": 2
  },
  {
   "q": "If ANY input is allowed (not only the slide table's columns), the minimum number of test cases for <b>statement</b> coverage of the triangle pseudocode is:",
   "o": [
    [
     "3",
     "3 is the branch-coverage minimum using the slide table's tests."
    ],
    [
     "2",
     "2 is the statement-coverage minimum when limited to the slide table's tests."
    ],
    [
     "4",
     "4 is the number of columns in the slide table, not a minimum."
    ],
    [
     "1",
     "Correct. (0,0,0) alone sets isosceles, equilateral, not a triangle (0 ≥ 0+0) and bad inputs (0 ≤ 0), running every line A to K. (L4, Minimal coverage sets)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Following the \"area of a triangle from 3 points\" functional tests, what is the expected area for the points <b>(0,0), (6,0), (0,4)</b>?",
   "o": [
    [
     "24",
     "This is base × height without halving."
    ],
    [
     "12",
     "Correct. Base 6, height 4: area = ½ × 6 × 4 = 12. (L4, Functional tests: area of a triangle from 3 points)"
    ],
    [
     "10",
     "This adds the sides 6 + 4 instead of using the area."
    ],
    [
     "Not a triangle",
     "The points are not collinear (not all on one line), so they form a triangle."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: The slide lists (1,2,4) as a \"bad inputs\" case, but running the pseudocode on it prints \"not a triangle\".",
   "o": [
    [
     "True",
     "Correct. No side is ≤ 0, and 4 ≥ 1+2, so the last IF that is true sets \"not a triangle\". (L4, Note on the bad-inputs row)"
    ],
    [
     "False",
     "Wrong: none of 1, 2, 4 is ≤ 0, so the bad-inputs IF is false; 4 ≥ 3 sets \"not a triangle\"."
    ]
   ],
   "a": 0
  },
  {
   "q": "The two structural testing approaches for object-oriented software covered in the lecture are:",
   "o": [
    [
     "Statement and branch coverage",
     "These are conventional criteria that do not seem appropriate for OO complexity."
    ],
    [
     "Data flow and error forcing",
     "These are data coverage types from dynamic white-box testing."
    ],
    [
     "Method-message testing and function pair testing",
     "Correct. The lecture covers MM testing and function pair testing. (L4, OOP testing)"
    ],
    [
     "Peer review and inspection",
     "These are formal review types (static white-box)."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: Testing object-oriented software presents some new challenges, but many conventional techniques are still appropriate.",
   "o": [
    [
     "True",
     "Correct. The lecture says exactly this. (L4, OOP testing)"
    ],
    [
     "False",
     "Wrong: the lecture says many conventional techniques are still appropriate."
    ]
   ],
   "a": 0
  },
  {
   "q": "Function pair (FP) testing is usually based on a:",
   "o": [
    [
     "Control flow graph",
     "The control flow graph is used for cyclomatic complexity and basis paths."
    ],
    [
     "Requirements document",
     "The requirements document is the basis of functional testing."
    ],
    [
     "V-model",
     "The V-model links development phases to test levels, not method pairs."
    ],
    [
     "State machine diagram",
     "Correct. FP testing covers all sequences of two method executions, usually based on a state machine diagram. (L4, OOP testing)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Which of the following stack function pairs ends in an <b>error</b>?",
   "o": [
    [
     "new-push",
     "new gives Empty, and push from Empty goes to Normal: no error."
    ],
    [
     "push(from empty)-pop",
     "After push from Empty the stack is Normal; pop from Normal is valid."
    ],
    [
     "pop(into empty)-pop",
     "Correct. After popping into Empty, another pop is an error (pair 14). (L4, Stack example: MM and FP)"
    ],
    [
     "pop(normal→normal)-push",
     "After pop the stack is still Normal; push from Normal is valid (still in normal)."
    ]
   ],
   "a": 2
  },
  {
   "q": "How many function pairs does the lecture list for the stack example?",
   "o": [
    [
     "3",
     "3 is the number of stack states (Empty, Normal, Full), or the MM sequence length."
    ],
    [
     "8",
     "The lecture lists more than 8 pairs."
    ],
    [
     "16",
     "The lecture lists 14, not 16."
    ],
    [
     "14",
     "Correct. The lecture lists 14 pairs, from new-pop (error) to pop(into empty)-pop (error). (L4, Stack example: MM and FP)"
    ]
   ],
   "a": 3
  },
  {
   "q": "In the stack state machine, a <b>pop</b> from the <b>Normal</b> state can lead to:",
   "o": [
    [
     "Normal or Empty",
     "Correct. pop: Normal→Normal or Normal→Empty. (L4, Stack example: MM and FP)"
    ],
    [
     "Full only",
     "pop never leads to Full; push from Normal can."
    ],
    [
     "An error",
     "pop gives an error only from Empty."
    ],
    [
     "Normal or Full",
     "Normal or Full is where push from Normal leads."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Statement and branch coverage cannot be applied to object-oriented software at all.",
   "o": [
    [
     "True",
     "Wrong: the lecture says they can be applied to OO software."
    ],
    [
     "False",
     "Correct. They can be applied, but they do not seem appropriate because the interactions between methods must be tested. (L4, OOP testing)"
    ]
   ],
   "a": 1
  },
  {
   "q": "What is the advantage of function pair coverage over MM testing?",
   "o": [
    [
     "It guarantees every statement is executed",
     "Neither criterion is about every statement; MM does not even subsume statement coverage."
    ],
    [
     "It tests sequences of two method executions, catching state-dependent faults like push on Full",
     "Correct. FP tests pairs of method executions, so it catches interaction and state-dependent bugs (push on full, pop on empty) that single-call MM misses. (L4, Lecture questions (answers))"
    ],
    [
     "It needs fewer test cases than MM testing",
     "FP needs more tests (14 pairs for the stack) than the simple MM sequence create, push, pop."
    ],
    [
     "It does not need a state machine diagram",
     "FP is usually based on a state machine diagram."
    ]
   ],
   "a": 1
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
  },
  {
   "q": "A web site is a collection of one or more web pages grouped under the same ………",
   "o": [
    [
     "domain",
     "Correct. The lecture defines a web site as pages grouped under the same domain. (L5, Introduction)"
    ],
    [
     "browser",
     "Wrong. A site must work on every browser; the browser does not define what groups the pages."
    ],
    [
     "site map",
     "Wrong. A site map is one of the 13 testing elements, a navigation aid, not what groups the pages."
    ],
    [
     "cookie",
     "Wrong. Cookies store information such as login data; they do not define a web site."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: A site that works in Internet Explorer will also work in Mozilla, Chrome and on Linux, so cross-browser testing is optional.",
   "o": [
    [
     "True",
     "Wrong. The lecture says a site built for Internet Explorer may fail in Mozilla, Chrome or on Linux."
    ],
    [
     "False",
     "Correct. That is exactly why testing must make sure the site works on every browser and platform. (L5, Introduction)"
    ]
   ],
   "a": 1
  },
  {
   "q": "The default page of a web site, usually with a header at the top showing the source name of the site, is the:",
   "o": [
    [
     "Site map",
     "Wrong. The site map is a map of the site's pages and links, not the default page."
    ],
    [
     "Home page",
     "Correct. The home page is the default page and usually has a header with the source name. (L5, Web page fundamentals)"
    ],
    [
     "Content",
     "Wrong. Content is the most important part (text, graphics, sounds…), not the default page."
    ],
    [
     "Navigation bar",
     "Wrong. A navigation bar should appear on every page; it is not itself the default page."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of the following is NOT one of the forms of web content listed in the lecture?",
   "o": [
    [
     "Rotating advertisements",
     "Wrong. Rotating advertisements are listed as a form of content."
    ],
    [
     "Downloadable movie clips",
     "Wrong. Downloadable movie clips are listed as a form of content."
    ],
    [
     "Dynamically changing text",
     "Wrong. Dynamically changing text is listed as a form of content."
    ],
    [
     "Buffer overflow attacks",
     "Correct. Buffer overflow attacks belong to white-box security testing, not to the forms of content. (L5, Web page fundamentals)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: Links can be used to download files and to open other Internet tools such as the default e-mail client.",
   "o": [
    [
     "True",
     "Correct. The lecture lists downloading files and opening the default e-mail client (e.g. Outlook) as uses of links. (L5, Web page fundamentals)"
    ],
    [
     "False",
     "Wrong. Both uses are in the lecture's list for links."
    ]
   ],
   "a": 0
  },
  {
   "q": "Why does the lecture say a web site should be tested for a site map?",
   "o": [
    [
     "Because search engines need it to index the site",
     "Wrong. The lecture does not mention search engines; its reason is about experienced users."
    ],
    [
     "Because it encrypts the user's login information",
     "Wrong. Encrypting login information is checked under cookies."
    ],
    [
     "Because experienced users know where they want to go and avoid lengthy instructions",
     "Correct. That is the reason the lecture gives for checking the site map. (L5, 13 elements)"
    ],
    [
     "Because it makes the graphics load faster",
     "Wrong. Graphics loading is a black-box graphics check, not the purpose of a site map."
    ]
   ],
   "a": 2
  },
  {
   "q": "Under the <b>Content</b> element, bold text, big fonts and blinking text should be kept minimal because:",
   "o": [
    [
     "They may not appeal to the customer, who might not revisit the site",
     "Correct. The lecture says such text may not appeal to the customer, who might not revisit the web site. (L5, 13 elements)"
    ],
    [
     "They break the database connection",
     "Wrong. The database connection is part of the Functionality element and is unrelated to fonts."
    ],
    [
     "They prevent the submit button from working",
     "Wrong. The submit button is checked under the Forms element."
    ],
    [
     "They count as plagiarism",
     "Wrong. Plagiarism is a separate content check about copied material, not about formatting."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the 13 web-testing elements makes sure the content remains easy to read?",
   "o": [
    [
     "Wrap-around",
     "Wrong. Wrap-around checks that text wraps correctly around images."
    ],
    [
     "Colors/backgrounds",
     "Correct. Colors and backgrounds are checked so the content remains easy to read. (L5, 13 elements)"
    ],
    [
     "Tables",
     "Wrong. Tables are checked so users do not keep scrolling."
    ],
    [
     "Instructions",
     "Wrong. Instructions checks that all relevant instructions are present."
    ]
   ],
   "a": 1
  },
  {
   "q": "A tester checks that a long price list is placed on the page so that users do not have to keep scrolling. Which element is this?",
   "o": [
    [
     "Images",
     "Wrong. Images are about conveying messages (\"a picture is worth a thousand words\")."
    ],
    [
     "User interface",
     "Wrong. User interface checks that the site is simple to use in general."
    ],
    [
     "Tables",
     "Correct. Tables must be positioned so users do not keep scrolling. (L5, 13 elements)"
    ],
    [
     "Data verification",
     "Wrong. Data verification checks input against the business rules."
    ]
   ],
   "a": 2
  },
  {
   "q": "\"A picture is worth a thousand words\" is the lecture's note for which web-testing element?",
   "o": [
    [
     "Content",
     "Wrong. Content is about plagiarism, minimal bold or blinking text, and hyperlinked references."
    ],
    [
     "Graphics loading",
     "Wrong. Graphics loading is a black-box check that images load and display properly."
    ],
    [
     "Wrap-around",
     "Wrong. Wrap-around is about text wrapping around images, not using them to convey messages."
    ],
    [
     "Images",
     "Correct. The Images element says to use pictures to convey messages. (L5, 13 elements)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: In the 13 elements, Functionality covers all the links, the database connection and the forms.",
   "o": [
    [
     "True",
     "Correct. The lecture's Functionality row lists all links, database connection and forms. (L5, 13 elements)"
    ],
    [
     "False",
     "Wrong. Those three are exactly what the Functionality element lists."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the 13 elements checks that the user interface is <b>simple to use</b>?",
   "o": [
    [
     "User interface",
     "Correct. The first element, User interface, checks that the site is simple to use. (L5, 13 elements)"
    ],
    [
     "Site map",
     "Wrong. The site map checks that a map exists, its links work and a navigation bar is on every page."
    ],
    [
     "Cookies",
     "Wrong. Cookies checks that cookies work and login information is encrypted."
    ],
    [
     "Links",
     "Wrong. Links are the vehicle that navigates from page to page."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the following is NOT a black-box check of the <b>text</b> of a web page?",
   "o": [
    [
     "Spelling and punctuation",
     "Wrong. Spelling and punctuation are listed text checks."
    ],
    [
     "Simulating millions of connections",
     "Correct. That is white-box server performance and loading, not a text check. (L5, Black-box testing)"
    ],
    [
     "Correct contact information",
     "Wrong. Correct phones and addresses are listed text checks."
    ],
    [
     "Target audience level",
     "Wrong. Audience level is the first text check listed."
    ]
   ],
   "a": 1
  },
  {
   "q": "According to the lecture, a hyperlink is <b>obvious</b> when:",
   "o": [
    [
     "It opens in a new window",
     "Wrong. Same tab or new window depends on the spec; it is not what makes a link obvious."
    ],
    [
     "It is listed on the site map",
     "Wrong. Site-map links are checked to exist and work, which is a different check."
    ],
    [
     "The text is underlined and the mouse pointer changes",
     "Correct. Those are the lecture's signs of an obvious link. (L5, Black-box testing)"
    ],
    [
     "It is written in bold, big fonts",
     "Wrong. The lecture says bold and big fonts should be kept minimal."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: If there is no specification for whether a hyperlink opens in the same tab or a new window, the tester checks that the link works.",
   "o": [
    [
     "True",
     "Correct. With no spec, the lecture says to check that the link works. (L5, Black-box testing)"
    ],
    [
     "False",
     "Wrong. The lecture explicitly covers the no-spec case: check that it works."
    ]
   ],
   "a": 0
  },
  {
   "q": "……… are text boxes, list boxes and other fields that allow a user to enter or select information on a web page.",
   "o": [
    [
     "Hyperlinks",
     "Wrong. Hyperlinks take the user to a destination; they are not fields for entering data."
    ],
    [
     "Graphics",
     "Wrong. Graphics are images that must load and display properly."
    ],
    [
     "Cookies",
     "Wrong. Cookies store information such as login data; the user does not type into them."
    ],
    [
     "Forms",
     "Correct. This is the lecture's definition of forms. (L5, Black-box testing)"
    ]
   ],
   "a": 3
  },
  {
   "q": "On the Gmail sign-up form (Figure 8.6) the password must be a minimum of 8 characters. A tester types a 5-character password and checks that the form refuses it. Which form check is this?",
   "o": [
    [
     "Do the fields reject bad data?",
     "Correct. A 5-character password breaks the 8-character minimum, so the tester is checking that bad data is rejected. (L5, Black-box testing)"
    ],
    [
     "Are the fields the correct size?",
     "Wrong. Field size is about how big the box is on the page, not the length rule."
    ],
    [
     "Are the form fields positioned properly?",
     "Wrong. Positioning is about where the fields sit on the page."
    ],
    [
     "Do the fields accept correct data?",
     "Wrong. That check would use a valid password of 8 or more characters."
    ]
   ],
   "a": 0
  },
  {
   "q": "The Infosys home page (Figure 8.5) is used in the lecture to show which fundamental elements of a web page?",
   "o": [
    [
     "Dynamic content and database-driven pages",
     "Wrong. Those are white-box elements, not what the Infosys screen illustrates."
    ],
    [
     "Text, graphics and hyperlinks",
     "Correct. Figure 8.5 is titled \"Website with Texts, Hyperlinks, and Graphics\". (L5, Black-box testing)"
    ],
    [
     "CPU types and RAM",
     "Wrong. Those are hardware configuration checks."
    ],
    [
     "Cookies and data verification",
     "Wrong. Those are two of the 13 testing elements, not what the figure shows."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: In white-box testing of a web site, the tester knows the internal design.",
   "o": [
    [
     "True",
     "Correct. The lecture defines white-box web testing as the tester knowing the internal design. (L5, White-box and gray-box)"
    ],
    [
     "False",
     "Wrong. Knowing the internal design is exactly what makes it white-box."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the following is NOT one of the white-box elements of a web site?",
   "o": [
    [
     "Security",
     "Wrong. Security (denial of service, buffer overflow) is white-box element 5."
    ],
    [
     "Dynamic content",
     "Wrong. Dynamic content is white-box element 1."
    ],
    [
     "Wrap-around",
     "Correct. Wrap-around is one of the 13 general testing elements, not a white-box element. (L5, White-box and gray-box)"
    ],
    [
     "Server performance and loading",
     "Wrong. Server performance and loading is white-box element 4."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: Gray-box testing is a mix of black-box and white-box testing.",
   "o": [
    [
     "True",
     "Correct. The lecture defines gray-box testing as a mix of the two. (L5, White-box and gray-box)"
    ],
    [
     "False",
     "Wrong. The lecture says gray-box is exactly that mix."
    ]
   ],
   "a": 0
  },
  {
   "q": "\"Various screen resolutions\" appears in which list of the lecture?",
   "o": [
    [
     "Hardware configurations",
     "Wrong. Hardware lists CPU types, RAM, cards and monitors, not screen resolutions."
    ],
    [
     "White-box elements",
     "Wrong. White-box elements are dynamic content, database-driven and programmatic pages, server load and security."
    ],
    [
     "Black-box elements",
     "Wrong. Black-box elements are text, hyperlinks, graphics and forms."
    ],
    [
     "Compatibility",
     "Correct. Screen resolutions are compatibility item 3. (L5, Configuration and compatibility)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: RAM and video capture cards belong to the compatibility list, not to the hardware configuration list.",
   "o": [
    [
     "True",
     "Wrong. RAM and video capture cards are in the hardware configuration list."
    ],
    [
     "False",
     "Correct. Both are hardware configurations; the compatibility list has memory sizes, not RAM. (L5, Configuration and compatibility)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of the following is NOT listed as something automatic web testing tools check?",
   "o": [
    [
     "Domain name registration",
     "Correct. Registering a domain name is not in the tools list. (L5, Automatic tools)"
    ],
    [
     "Broken hyperlinks",
     "Wrong. Broken hyperlinks are in the tools list."
    ],
    [
     "Load, stress and performance",
     "Wrong. Load, stress and performance are in the tools list."
    ],
    [
     "Browser compatibility",
     "Wrong. Browser compatibility is the first item in the tools list."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Browsers with CSS is one of the items checked in compatibility testing.",
   "o": [
    [
     "True",
     "Correct. Browsers with CSS is compatibility item 2. (L5, Configuration and compatibility)"
    ],
    [
     "False",
     "Wrong. The compatibility list includes browsers with CSS."
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
  },
  {
   "q": "Quality is the set of attributes valued by ………",
   "o": [
    [
     "developers",
     "Wrong. The lecture says the attributes are those valued by end-users, not developers."
    ],
    [
     "testers",
     "Wrong. Testers find and report bugs; the definition is about end-users."
    ],
    [
     "end-users",
     "Correct. Quality is the set of attributes valued by end-users. (L6, What is quality)"
    ],
    [
     "project managers",
     "Wrong. Project managers make release decisions in one structure; they are not in the definition."
    ]
   ],
   "a": 2
  },
  {
   "q": "Maintainability and usability are examples of:",
   "o": [
    [
     "Indirectly measurable factors",
     "Correct. The lecture gives maintainability and usability as indirectly measurable factors. (L6, What is quality)"
    ],
    [
     "Directly measurable factors",
     "Wrong. The directly measurable example is defects."
    ],
    [
     "Software quality indicators",
     "Wrong. Indicators are things like progress, stability and defect density."
    ],
    [
     "Process metrics",
     "Wrong. Process metrics are things like time taken and development methodology."
    ]
   ],
   "a": 0
  },
  {
   "q": "\"Optimal use of computing resources\" defines which quality factor?",
   "o": [
    [
     "Reliability",
     "Wrong. Reliability means performing the intended function accurately."
    ],
    [
     "Efficiency",
     "Correct. Efficiency is the optimal use of computing resources. (L6, Quality factors)"
    ],
    [
     "Reusability",
     "Wrong. Reusability is about which parts can be used in other applications."
    ],
    [
     "Integrity",
     "Wrong. Integrity is control over access and security."
    ]
   ],
   "a": 1
  },
  {
   "q": "A payroll program must always compute the exact salary it is meant to compute. Which quality factor is this?",
   "o": [
    [
     "Efficiency",
     "Wrong. Efficiency is about using computing resources optimally, not accuracy."
    ],
    [
     "Usability",
     "Wrong. Usability is the effort to learn and operate the program."
    ],
    [
     "Flexibility",
     "Wrong. Flexibility is the effort required to change the program."
    ],
    [
     "Reliability",
     "Correct. Reliability means the program performs its intended function accurately. (L6, Quality factors)"
    ]
   ],
   "a": 3
  },
  {
   "q": "\"Effort required to change the program\" defines:",
   "o": [
    [
     "Maintainability",
     "Wrong. Maintainability is the effort to locate and fix errors."
    ],
    [
     "Portability",
     "Wrong. Portability is the effort to transfer the program to another system."
    ],
    [
     "Flexibility",
     "Correct. Flexibility is the effort required to change the program. (L6, Quality factors)"
    ],
    [
     "Usability",
     "Wrong. Usability is the effort to learn and operate the program."
    ]
   ],
   "a": 2
  },
  {
   "q": "New employees need only an hour to learn how to operate a company's system. This describes good:",
   "o": [
    [
     "Usability",
     "Correct. Usability is the effort required to learn and operate the program. (L6, Quality factors)"
    ],
    [
     "Integrity",
     "Wrong. Integrity is control over access and security."
    ],
    [
     "Maintainability",
     "Wrong. Maintainability is about locating and fixing errors."
    ],
    [
     "Efficiency",
     "Wrong. Efficiency is the optimal use of computing resources."
    ]
   ],
   "a": 0
  },
  {
   "q": "A team takes the login module of one project and uses it unchanged in a new application. Which quality factor does this show?",
   "o": [
    [
     "Portability",
     "Wrong. Portability is moving the whole program to another system, not reusing a part in another application."
    ],
    [
     "Reusability",
     "Correct. Reusability is about which parts can be used in other applications. (L6, Quality factors)"
    ],
    [
     "Flexibility",
     "Wrong. Flexibility is the effort to change the program."
    ],
    [
     "Reliability",
     "Wrong. Reliability is performing the intended function accurately."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: SQA is process-focused and proactive, and its main idea is prevention.",
   "o": [
    [
     "True",
     "Correct. The lecture's table gives SQA: prevention, process (proactive). (L6, SQA vs SQC)"
    ],
    [
     "False",
     "Wrong. Prevention and a proactive process focus are exactly how the lecture describes SQA."
    ]
   ],
   "a": 0
  },
  {
   "q": "The goal of <b>SQC</b> is to:",
   "o": [
    [
     "Ensure standards and procedures are applied correctly",
     "Wrong. That is the goal of SQA."
    ],
    [
     "Deliver IT services at an agreed-upon level of quality",
     "Wrong. That is the goal of ITSM."
    ],
    [
     "Develop standard processes and guidelines",
     "Wrong. Those are QA task examples."
    ],
    [
     "Evaluate product quality and screen out non-compliant items",
     "Correct. SQC focuses on the product and screens out non-compliant items. (L6, SQA vs SQC)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: Software testing is part of SQA and is detection-oriented.",
   "o": [
    [
     "True",
     "Correct. The lecture lists testing as part of SQA and detection-oriented. (L6, Testing vs QA)"
    ],
    [
     "False",
     "Wrong. Both points are in the lecture's description of software testing."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which models does QA use, according to the lecture?",
   "o": [
    [
     "ISO / CMM",
     "Correct. The lecture says QA uses ISO / CMM models. (L6, Testing vs QA)"
    ],
    [
     "Selenium / Cypress",
     "Wrong. Selenium and Cypress are tools for testing web applications (L5)."
    ],
    [
     "ITSM support / delivery",
     "Wrong. These are the two ITSM categories, not QA models."
    ],
    [
     "Cohesion / coupling",
     "Wrong. Cohesion and coupling are two of the common metrics."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Software testing is performed only under normal conditions.",
   "o": [
    [
     "True",
     "Wrong. The lecture says testing is performed under specified normal and abnormal conditions."
    ],
    [
     "False",
     "Correct. Testing covers both normal and abnormal conditions. (L6, Testing vs QA)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of the following is part of the <b>role of the tester</b>?",
   "o": [
    [
     "Develop standard processes",
     "Wrong. Developing standard processes is a QA task example."
    ],
    [
     "Track bugs through their life cycle",
     "Correct. The tester tracks bugs through their life cycle and convinces developers to fix them. (L6, Roles and tasks)"
    ],
    [
     "Define quality metrics and criteria",
     "Wrong. Defining quality metrics is a QA task example."
    ],
    [
     "Inspect the development process",
     "Wrong. Inspecting the development process is a QA responsibility."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which statement about QA responsibilities is correct?",
   "o": [
    [
     "QA only executes tests to find bugs",
     "Wrong. Executing tests is a testing task; QA is broader than testing."
    ],
    [
     "QA's scope is smaller than the testing team's",
     "Wrong. The lecture says QA's scope is larger than the testing team."
    ],
    [
     "QA monitors and evaluates processes and testing activities",
     "Correct. That is one of the listed QA responsibilities. (L6, Roles and tasks)"
    ],
    [
     "QA is reactive and focuses on the product",
     "Wrong. That describes SQC; QA is proactive and process-focused."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which of the following is a QA task example (not a testing task)?",
   "o": [
    [
     "Execute tests to find bugs",
     "Wrong. Executing tests is a task of testing."
    ],
    [
     "Prepare verification and validation reports",
     "Wrong. V&amp;V reports are a task of testing."
    ],
    [
     "Choose the test implementation approach",
     "Wrong. Choosing the implementation approach is a task of testing."
    ],
    [
     "Use checklists for each stage",
     "Correct. Checklists for each stage is one of the QA task examples. (L6, Roles and tasks)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: Preparing verification and validation reports is one of the tasks of testing.",
   "o": [
    [
     "True",
     "Correct. It is testing task 3 in the lecture. (L6, Roles and tasks)"
    ],
    [
     "False",
     "Wrong. The lecture lists V&amp;V reports among the tasks of testing."
    ]
   ],
   "a": 0
  },
  {
   "q": "Quality management in IT is often called ………",
   "o": [
    [
     "ITSM (IT Service Management)",
     "Correct. The lecture says quality management in IT is often called ITSM. (L6, Quality management in IT)"
    ],
    [
     "SQC (Software Quality Control)",
     "Wrong. SQC is product-focused detection, not the name of IT quality management."
    ],
    [
     "CMM",
     "Wrong. CMM is a model QA uses, not IT quality management's name."
    ],
    [
     "Function point analysis",
     "Wrong. Function point analysis is one of the common metrics."
    ]
   ],
   "a": 0
  },
  {
   "q": "Processes for the <b>efficient delivery of IT operational services</b> form the ITSM category:",
   "o": [
    [
     "IT Service Delivery",
     "Wrong. Service Delivery covers long-term planning, control and management."
    ],
    [
     "IT Service Support",
     "Correct. IT Service Support is the efficient delivery of IT operational services. (L6, Quality management in IT)"
    ],
    [
     "Software Quality Control",
     "Wrong. SQC is about detecting non-compliant products, not an ITSM category."
    ],
    [
     "Process compliance",
     "Wrong. Process compliance is a quality indicator."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: SQA includes correcting errors during development and preventing their recurrence, not just testing.",
   "o": [
    [
     "True",
     "Correct. The lecture says SQA is not just testing and includes correcting errors while preventing recurrence. (L6, Quality management in IT)"
    ],
    [
     "False",
     "Wrong. The lecture explicitly says SQA is more than testing and includes this."
    ]
   ],
   "a": 0
  },
  {
   "q": "The main advantage of the <b>small team structure</b> is:",
   "o": [
    [
     "Quality reports reach senior management directly",
     "Wrong. That is the advantage of the test group reporting to executive management."
    ],
    [
     "The testing team's feedback is considered in decisions",
     "Wrong. That is the advantage of the independent test team."
    ],
    [
     "Fast communication between developers and testers",
     "Correct. In the small team, testers and programmers sit under one development manager, so communication is fast. (L6, Organization structures)"
    ],
    [
     "The final decision lies with the project manager",
     "Wrong. That is a disadvantage of the independent test team."
    ]
   ],
   "a": 2
  },
  {
   "q": "In which structure is there an independent quality team whose reports reach senior management directly?",
   "o": [
    [
     "Small team structure",
     "Wrong. In the small team, testers report to the development manager."
    ],
    [
     "Independent test team",
     "Wrong. Here the test lead reports to the project manager, who makes the final decision."
    ],
    [
     "ITSM service support",
     "Wrong. That is an ITSM category, not a test organization structure."
    ],
    [
     "Test group reporting to executive management",
     "Correct. The QA/test managers report to the executive manager, so quality reports reach senior management directly. (L6, Organization structures)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: In the independent test team structure, the final decision lies with the test manager.",
   "o": [
    [
     "True",
     "Wrong. The lecture says the final decision lies with the project manager."
    ],
    [
     "False",
     "Correct. The project manager decides, which may hurt quality in critical projects. (L6, Organization structures)"
    ]
   ],
   "a": 1
  },
  {
   "q": "\"Code size\" and \"number of documented pages\" are examples of:",
   "o": [
    [
     "Product metrics",
     "Correct. Product metrics measure the quality of the final product, e.g. code size and documented pages. (L6, Metrics and indicators)"
    ],
    [
     "Process metrics",
     "Wrong. Process metrics are time taken and development methodology."
    ],
    [
     "Quality indicators",
     "Wrong. Indicators reflect process outcomes such as the number of detected bugs."
    ],
    [
     "Indirectly measurable factors",
     "Wrong. The lecture's indirect examples are maintainability and usability."
    ]
   ],
   "a": 0
  },
  {
   "q": "Rules for measuring software attributes such as code size and complexity are called:",
   "o": [
    [
     "Indicators",
     "Wrong. Indicators are variables reflecting process outcomes."
    ],
    [
     "Metrics",
     "Correct. Metrics are rules for measuring software attributes. (L6, Metrics and indicators)"
    ],
    [
     "Guidelines",
     "Wrong. Guidelines are a QA task (for requirements, design, coding)."
    ],
    [
     "Quality factors",
     "Wrong. Quality factors are the 8 attributes like reliability and portability."
    ]
   ],
   "a": 1
  },
  {
   "q": "Over one month a team detects 40 defects and resolves 30 of them. How many defects does the <b>defect age profile</b> count for that month?",
   "o": [
    [
     "30",
     "Wrong. 30 are detected and resolved, which is what the defect removal rate counts."
    ],
    [
     "40",
     "Wrong. 40 is all detected defects, related to defect detection efficiency."
    ],
    [
     "10",
     "Correct. The age profile counts defects NOT resolved: 40 − 30 = 10. (L6, Quality indicators)"
    ],
    [
     "70",
     "Wrong. Adding detected and resolved (40 + 30) has no meaning for any indicator."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which quality indicator identifies the defect-prone parts of the system?",
   "o": [
    [
     "Defect removal rate",
     "Wrong. Removal rate counts defects detected and resolved over a period."
    ],
    [
     "Stability",
     "Wrong. Stability checks whether each phase's products are stable enough to proceed."
    ],
    [
     "Progress",
     "Wrong. Progress measures the work done by the developer in each phase."
    ],
    [
     "Defect density",
     "Correct. Defect density identifies defect-prone parts of the system. (L6, Quality indicators)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Before starting the coding phase, a manager checks whether the design documents are settled enough to build on. Which indicator is this?",
   "o": [
    [
     "Stability",
     "Correct. Stability measures whether each phase's products are stable enough to proceed. (L6, Quality indicators)"
    ],
    [
     "Quality evaluation effort",
     "Wrong. That measures the effort spent on internal quality evaluation."
    ],
    [
     "Complexity",
     "Wrong. Complexity measures how complex the program's code is."
    ],
    [
     "Defect age profile",
     "Wrong. Age profile counts defects not resolved over a period."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: The Progress indicator measures the work done by the developer in each phase.",
   "o": [
    [
     "True",
     "Correct. That is the lecture's meaning for Progress. (L6, Quality indicators)"
    ],
    [
     "False",
     "Wrong. The lecture defines Progress exactly this way."
    ]
   ],
   "a": 0
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
  },
  {
   "q": "……… is a standard framework for assessing and improving the maturity of a software company's development process.",
   "o": [
    [
     "ISO 9000",
     "ISO 9000 is a set of generic quality standards with 20 elements for any organization, not a maturity framework."
    ],
    [
     "SPICE",
     "SPICE (ISO/IEC 15504) is the ISO/IEC software process assessment initiative, not the maturity framework described here."
    ],
    [
     "CMM",
     "Correct. CMM (Capability Maturity Model) is exactly this framework. (L7, CMM)"
    ],
    [
     "DMAIC",
     "DMAIC is the Six Sigma methodology (Define, Measure, Analyze, Improve, Control), from Lecture 8."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the development of CMM, \"SEI\" stands for:",
   "o": [
    [
     "Software Engineering Institute",
     "Correct. CMM was developed by the Software Engineering Institute (SEI) and Carnegie Mellon University. (L7, CMM)"
    ],
    [
     "Software Evaluation Index",
     "No such body is in the lecture; SEI is the Software Engineering Institute."
    ],
    [
     "Standard Engineering Institute",
     "Wrong first word: the S is for Software."
    ],
    [
     "Systems Engineering International",
     "Not the lecture's expansion; SEI is the Software Engineering Institute."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: CMM is designed only for software development organizations and cannot be applied to project management or risk management.",
   "o": [
    [
     "True",
     "It is designed mainly for software development, but not only for it."
    ],
    [
     "False",
     "Correct. It also applies to software/system engineering, project management, IT, risk management and personnel management. (L7, CMM)"
    ]
   ],
   "a": 1
  },
  {
   "q": "In the CMM levels figure, Level 2 (Repeatable) is labelled with which kind of management?",
   "o": [
    [
     "Inconsistent Management",
     "That is the label of Level 1 (Initial)."
    ],
    [
     "Project Management",
     "Correct. The figure reads \"Level 2: Repeatable (Project Management)\". (L7, Five levels of CMM)"
    ],
    [
     "Process Management",
     "That is the label of Level 3 (Defined)."
    ],
    [
     "Change Management",
     "That is the label of Level 5 (Optimizing)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the CMM levels figure, the arrow from Level 3 to Level 4 is labelled:",
   "o": [
    [
     "Basic Management Control",
     "That arrow goes from Level 1 to Level 2."
    ],
    [
     "Process Definition",
     "That arrow goes from Level 2 to Level 3."
    ],
    [
     "Process Control",
     "That arrow goes from Level 4 to Level 5."
    ],
    [
     "Process Measurement",
     "Correct. Level 3 (Defined) moves to Level 4 through \"Process Measurement\". (L7, Five levels of CMM)"
    ]
   ],
   "a": 3
  },
  {
   "q": "According to Table 1, \"create capability baselines\" is an improvement implemented at which CMM level?",
   "o": [
    [
     "Level 2 Repeatable",
     "Level 2 plans and tracks projects, manages suppliers and configurations and measures projects."
    ],
    [
     "Level 3 Defined",
     "Level 3 identifies and organizes processes, collects process data and gives organization-wide training."
    ],
    [
     "Level 4 Quantitatively Managed",
     "Correct. Level 4 supervises processes quantitatively and creates capability baselines. (L7, Table 1)"
    ],
    [
     "Level 5 Optimizing",
     "Level 5 develops change infrastructure, organizes improvements and removes causes of defects."
    ]
   ],
   "a": 2
  },
  {
   "q": "According to Table 1, \"manage with non-software groups\" is implemented at which CMM level?",
   "o": [
    [
     "Level 2 Repeatable",
     "Level 2 is about project-level control: plan and track projects, manage suppliers and configurations."
    ],
    [
     "Level 3 Defined",
     "Correct. Managing with non-software groups is in the Level 3 (Defined) list, with organization-wide training and process data. (L7, Table 1)"
    ],
    [
     "Level 4 Quantitatively Managed",
     "Level 4 only supervises processes quantitatively and creates capability baselines."
    ],
    [
     "Level 1 Initial",
     "Level 1 has no required processes."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: According to Table 1, CMM Level 1 (Initial) has no required processes.",
   "o": [
    [
     "True",
     "Correct. Table 1 lists \"no required processes\" for Level 1. (L7, Table 1)"
    ],
    [
     "False",
     "Level 1 is the ad-hoc level; Table 1 lists nothing required for it."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which CMM component is described as \"groups of related activities that achieve goals when performed together\", for example software project delivery planning?",
   "o": [
    [
     "Key Process Areas (KPA)",
     "Correct. A KPA is a group of related activities that achieve goals together; the example is delivery planning. (L7, CMM structure)"
    ],
    [
     "Key practices",
     "Key practices are the actions and infrastructure that support a KPA (example: a delivery schedule follows a documented procedure)."
    ],
    [
     "Goals",
     "Goals evaluate the essential practices of a process area to see if it was implemented successfully."
    ],
    [
     "Common features",
     "Common features show whether a KPA's implementation is successful and sustainable."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which CMM component consists of characteristics showing whether a KPA's implementation is successful and sustainable?",
   "o": [
    [
     "Goals",
     "Goals evaluate essential practices within a process area and highlight its importance and purpose."
    ],
    [
     "Key practices",
     "Key practices define the actions and infrastructure needed to support a KPA."
    ],
    [
     "Process capability",
     "Process capability is the organization's ability to meet quality expectations with its current processes."
    ],
    [
     "Common features",
     "Correct. Common features are the characteristics that show whether a KPA's implementation is successful and sustainable. (L7, CMM structure)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Which aspect of a Key Process Area covers \"the activities carried out to enable the organization to meet the commitments\"?",
   "o": [
    [
     "Commitment",
     "Commitment is the set of requirements that must be met to achieve the goals."
    ],
    [
     "Ability",
     "Correct. Ability is the activities that enable the organization to meet the commitments. (L7, KPA)"
    ],
    [
     "Measurement",
     "Measurement means the activities performed must be monitored."
    ],
    [
     "Verification",
     "Verification is the methods that define how the work is verified."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: In a KPA, \"Commitment\" means the activities carried out to enable the organization to meet its goals.",
   "o": [
    [
     "True",
     "That description belongs to another aspect."
    ],
    [
     "False",
     "Correct. Commitment is the requirements that must be met to achieve the goals; the enabling activities are \"Ability\". (L7, KPA)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of the following is listed in the lecture as a benefit of CMM?",
   "o": [
    [
     "It reduces defects to 3.4 per million opportunities",
     "That is the Six Sigma target (Lecture 8)."
    ],
    [
     "It consists of 20 key elements that must be documented",
     "That describes ISO 9000."
    ],
    [
     "It helps get project funding, e.g. for a metadata repository",
     "Correct. Helping get funding (enterprise data asset management, metadata repository) is one of the five benefits of CMM. (L7, Benefits of CMM)"
    ],
    [
     "It was introduced in 1993 as ISO/IEC 15504",
     "That describes SPICE."
    ]
   ],
   "a": 2
  },
  {
   "q": "The word \"ISO\" comes from the Greek word \"isos\", which means:",
   "o": [
    [
     "Equal",
     "Correct. isos = \"equal\", reflecting a global standard for quality assurance. (L7, ISO 9000)"
    ],
    [
     "Standard",
     "Standard is the S in the full name, not the meaning of isos."
    ],
    [
     "Quality",
     "Quality is what the standard is about, not the meaning of isos."
    ],
    [
     "International",
     "International is part of the organization's name, not the Greek word's meaning."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: ISO 9000 is highly generic and applies to any organization providing products or services.",
   "o": [
    [
     "True",
     "Correct. The lecture calls ISO 9000 \"highly generic\", for any organization with products or services. (L7, ISO 9000)"
    ],
    [
     "False",
     "It is not limited to software companies."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which ISO 9000 element requires instruments to be calibrated regularly?",
   "o": [
    [
     "Inspection &amp; Testing",
     "Element 10 performs receiving, in-process and final inspections."
    ],
    [
     "Inspection/Measuring Equipment",
     "Correct. Element 11 is about calibrating instruments regularly. (L7, 20 elements of ISO 9000)"
    ],
    [
     "Inspection &amp; Test Status",
     "Element 12 clearly identifies the products that were inspected."
    ],
    [
     "Process Control",
     "Element 9 uses work instructions, quality plans and standards."
    ]
   ],
   "a": 1
  },
  {
   "q": "An auditor asks a company to show records that prove its quality checks for an audit trail. Which ISO 9000 element covers keeping them?",
   "o": [
    [
     "Internal Quality Audits",
     "Element 17 is conducting periodic audits and sharing results, not keeping the records."
    ],
    [
     "Documentation &amp; Data Control",
     "Element 5 is strict control of document creation and modification."
    ],
    [
     "Training",
     "Element 18 keeps training records and qualifications of employees only."
    ],
    [
     "Quality Records",
     "Correct. Element 16 maintains records for audit trails. (L7, 20 elements of ISO 9000)"
    ]
   ],
   "a": 3
  },
  {
   "q": "\"Base decisions on reliable data and analysis\" is which of ISO's 8 principles?",
   "o": [
    [
     "Process Approach",
     "Process approach manages activities as processes for consistent results."
    ],
    [
     "Continuous Improvement",
     "Continuous improvement makes ongoing improvement a permanent objective."
    ],
    [
     "Factual Decision Making",
     "Correct. Factual decision making bases decisions on reliable data and analysis. (L7, ISO 8 principles)"
    ],
    [
     "System Approach to Management",
     "System approach aligns interconnected processes as one system."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: The ISO principle \"System Approach to Management\" means managing each activity as a separate process to get consistent results.",
   "o": [
    [
     "True",
     "That wording mixes up two principles."
    ],
    [
     "False",
     "Correct. Managing activities as processes is the \"Process Approach\"; the system approach aligns interconnected processes as one system. (L7, ISO 8 principles)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Since ……… IEEE has contributed significantly to standardization, leading to the IEEE Software Engineering Standard Collection.",
   "o": [
    [
     "1976",
     "Correct. IEEE has worked on standardization since 1976. (L7, Software engineering standards)"
    ],
    [
     "1993",
     "1993 is the year SPICE was introduced."
    ],
    [
     "1985",
     "This year is not in the lecture; IEEE's year is 1976."
    ],
    [
     "2005",
     "This year is not in the lecture."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Organizations are increasingly shifting from international to local software engineering standards.",
   "o": [
    [
     "True",
     "The direction is reversed."
    ],
    [
     "False",
     "Correct. The shift is from local to international standards. (L7, Software engineering standards)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of the following is one of the three objectives of SPICE?",
   "o": [
    [
     "Reduce process variation to 3.4 defects per million",
     "That is the Six Sigma goal."
    ],
    [
     "Define 20 key elements that must be clearly documented",
     "That is ISO 9000."
    ],
    [
     "Provide five maturity levels that cannot be skipped",
     "That is CMM."
    ],
    [
     "Facilitate global adoption of software process assessment in industry",
     "Correct. This is SPICE objective 3, with a standard assessment framework and organizational assessments for emerging standards. (L7, SPICE)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: SPICE (ISO/IEC 15504) is a joint initiative of ISO and IEEE.",
   "o": [
    [
     "True",
     "IEEE is the body behind the Software Engineering Standard Collection, not SPICE."
    ],
    [
     "False",
     "Correct. SPICE is a joint initiative of ISO and IEC, as the name ISO/IEC 15504 shows. (L7, SPICE)"
    ]
   ],
   "a": 1
  },
  {
   "q": "A company's processes are unstructured and reactive; each project is handled differently and goals are met unreliably. Which CMM level is it at?",
   "o": [
    [
     "Level 1 Initial",
     "Correct. Unstructured, reactive, inconsistent processes and unreliable goals describe Level 1. (L7, Five levels of CMM)"
    ],
    [
     "Level 2 Repeatable",
     "Level 2 already has basic project management giving repeatable success."
    ],
    [
     "Level 3 Defined",
     "Level 3 has standardized processes across the organization."
    ],
    [
     "Level 4 Quantitatively Managed",
     "Level 4 controls processes statistically, the opposite of ad-hoc."
    ]
   ],
   "a": 0
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
  },
  {
   "q": "Six Sigma is one of the most famous management concepts in ………",
   "o": [
    [
     "total quality management",
     "Correct. The lecture opens by placing Six Sigma in total quality management. (L8, Introduction)"
    ],
    [
     "capability maturity",
     "Capability maturity is the CMM idea from Lecture 7."
    ],
    [
     "software process assessment",
     "Software process assessment is what SPICE standardizes."
    ],
    [
     "configuration management",
     "Configuration management is not how the lecture classifies Six Sigma."
    ]
   ],
   "a": 0
  },
  {
   "q": "……… is a statistical management system focusing on customer satisfaction, reducing waste, improving quality, and improving financial and time performance.",
   "o": [
    [
     "CMM",
     "CMM is a five-level maturity framework for software processes."
    ],
    [
     "SPICE",
     "SPICE is a standard software process assessment methodology."
    ],
    [
     "ISO 9000",
     "ISO 9000 is a set of 20-element generic quality standards."
    ],
    [
     "Six Sigma",
     "Correct. The lecture defines Six Sigma as this statistical management system. (L8, Introduction)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: The standard deviation (σ) is the square of the variance.",
   "o": [
    [
     "True",
     "The relation is the other way round."
    ],
    [
     "False",
     "Correct. σ is the square root of the variance (the variance is σ squared). (L8, Introduction)"
    ]
   ],
   "a": 1
  },
  {
   "q": "A process has a variance of 0.81. Using σ = √variance and the case-study rule \"Six sigma = 6 × standard deviation\", its Six Sigma value is:",
   "o": [
    [
     "4.86",
     "This is 6 × 0.81: it multiplies the variance, forgetting to take the square root first."
    ],
    [
     "5.4",
     "Correct. σ = √0.81 = 0.9, then 6 × 0.9 = 5.4. (L8, Case study)"
    ],
    [
     "0.9",
     "This is only σ; it still has to be multiplied by 6."
    ],
    [
     "6.81",
     "This adds 6 to the variance instead of multiplying σ by 6."
    ]
   ],
   "a": 1
  },
  {
   "q": "A new subject X11 is added to the preparatory-certificate table with standard deviation 1.15. Its \"Six sigma\" value is:",
   "o": [
    [
     "5.75",
     "This is 5 × 1.15; the rule multiplies by 6."
    ],
    [
     "7.15",
     "This adds 6 to the standard deviation instead of multiplying."
    ],
    [
     "6.90",
     "Correct. Six sigma = 6 × SD = 6 × 1.15 = 6.90. (L8, Case study)"
    ],
    [
     "1.15",
     "This is only the standard deviation itself."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the preparatory-certificate table, which subject has the largest \"Six sigma\" value?",
   "o": [
    [
     "X1",
     "X1 has SD 1.22, so 6 × 1.22 = 7.32, smaller than X7."
    ],
    [
     "X5",
     "X5 has SD 1.17, so 6 × 1.17 = 7.02, smaller than X7."
    ],
    [
     "X7",
     "Correct. X7 has the largest SD (1.27), so 6 × 1.27 = 7.62 is the largest value. (L8, Case study)"
    ],
    [
     "X9",
     "X9 has the smallest SD (0.91), giving the smallest value 5.46."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the case table, a subject's \"Six sigma\" value is 6.24. What is its standard deviation?",
   "o": [
    [
     "1.04",
     "Correct. SD = 6.24 ÷ 6 = 1.04 (subject X3). (L8, Case study)"
    ],
    [
     "1.24",
     "This subtracts 5 instead of dividing by 6."
    ],
    [
     "0.24",
     "This subtracts 6 instead of dividing by 6."
    ],
    [
     "3.12",
     "This divides by 2 instead of 6."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: In the preparatory-certificate table, the overall indicator has mean 2.99 and standard deviation 1.07, giving a Six Sigma value of 6.42.",
   "o": [
    [
     "True",
     "Correct. Overall row: mean 2.99, SD 1.07, and 6 × 1.07 = 6.42. (L8, Case study)"
    ],
    [
     "False",
     "All three numbers match the bold overall row."
    ]
   ],
   "a": 0
  },
  {
   "q": "According to the normal distribution table, how many ppm fall outside the ±4σ limits?",
   "o": [
    [
     "2,700",
     "2,700 ppm is outside ±3σ."
    ],
    [
     "63",
     "Correct. ±4σ keeps 99.9937% inside and leaves 63 ppm out of spec. (L8, Normal distribution)"
    ],
    [
     "0.57",
     "0.57 ppm is outside ±5σ."
    ],
    [
     "45,500",
     "45,500 ppm is outside ±2σ."
    ]
   ],
   "a": 1
  },
  {
   "q": "A process keeps 99.73% of its values inside the limits. How many parts per million (ppm) are out of spec?",
   "o": [
    [
     "2,700",
     "Correct. (100 − 99.73)% = 0.27%, and 0.27 × 10,000 = 2,700 ppm (the ±3σ row). (L8, Normal distribution)"
    ],
    [
     "270",
     "This multiplies 0.27 by 1,000 instead of 10,000 (1% = 10,000 ppm)."
    ],
    [
     "27,000",
     "This multiplies 0.27 by 100,000; 1% is 10,000 ppm."
    ],
    [
     "317,300",
     "317,300 ppm is outside ±1σ (68.27% inside)."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: The famous 3.4 defects per million comes from letting the process mean drift by 1.5σ in the long term, leaving 4.5σ on one side.",
   "o": [
    [
     "True",
     "Correct. The lecture note explains 3.4 by a 1.5σ long-term drift: 6 − 1.5 = 4.5σ (general background, not on the slide). (L8, 3.4 vs 0.002 ppm)"
    ],
    [
     "False",
     "The centred ±6σ curve gives only 0.002 ppm; the 1.5σ drift is what gives 3.4."
    ]
   ],
   "a": 0
  },
  {
   "q": "Using the background DPMO formula from the notes: 18 defects are found in 300 units, each with 5 defect opportunities. DPMO = ?",
   "o": [
    [
     "60,000",
     "This divides by units only (18 ÷ 300 × 10⁶), ignoring the 5 opportunities per unit."
    ],
    [
     "1,200",
     "This is 18 ÷ 15,000 × 10⁶: the denominator is ten times too big; 300 × 5 = 1,500."
    ],
    [
     "3.4",
     "3.4 is the DPMO at 6σ, not this process."
    ],
    [
     "12,000",
     "Correct. DPMO = 18 ÷ (300 × 5) × 1,000,000 = 18 ÷ 1,500 × 10⁶ = 12,000. (L8, DPMO background formula)"
    ]
   ],
   "a": 3
  },
  {
   "q": "In DMAIC, which phase comes directly after Analyze?",
   "o": [
    [
     "Measure",
     "Measure comes before Analyze (D, M, A, I, C)."
    ],
    [
     "Control",
     "Control is the last phase, after Improve."
    ],
    [
     "Improve",
     "Correct. The order is Define, Measure, Analyze, Improve, Control. (L8, DMAIC)"
    ],
    [
     "Design",
     "Design follows Analyze in DMADV, not in DMAIC."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which DMAIC phase plans and implements performance measurement against customers' requirements and expectations using statistical tools?",
   "o": [
    [
     "Measure",
     "Correct. Measure plans and implements performance measurement against customer requirements with statistical tools (6 σ). (L8, DMAIC)"
    ],
    [
     "Define",
     "Define identifies the problems, states level, location and financial impact, and forms a team."
    ],
    [
     "Analyze",
     "Analyze looks for the root causes in the collected data."
    ],
    [
     "Control",
     "Control keeps monitoring the processes and corrects deviations."
    ]
   ],
   "a": 0
  },
  {
   "q": "In which DMAIC phase do changes in processes occur to eliminate product defects, excessive costs and waste?",
   "o": [
    [
     "Define",
     "Define only identifies the problem and forms the team."
    ],
    [
     "Measure",
     "Measure measures performance; it does not change processes."
    ],
    [
     "Analyze",
     "Analyze finds and ranks root causes; the changes come next."
    ],
    [
     "Improve",
     "Correct. In Improve, processes change to eliminate defects, excessive costs and waste. (L8, DMAIC)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: The Control phase ends the Six Sigma work: once deviations are corrected, monitoring stops.",
   "o": [
    [
     "True",
     "The lecture says the opposite about stopping."
    ],
    [
     "False",
     "Correct. Control monitors the processes and does not stop, because there are always areas in need of improvement. (L8, DMAIC)"
    ]
   ],
   "a": 1
  },
  {
   "q": "What does the \"V\" in DMADV stand for?",
   "o": [
    [
     "Validate",
     "Close, but the slide's word is Verify."
    ],
    [
     "Verify",
     "Correct. DMADV = Define, Measure, Analyze, Design, Verify. (L8, DMADV)"
    ],
    [
     "Value",
     "Value appears in \"value stream mapping\", a tool, not in DMADV."
    ],
    [
     "Variation",
     "Variation is what Six Sigma reduces, not a DMADV phase."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: One of the principles of Six Sigma is effective management based on advance planning.",
   "o": [
    [
     "True",
     "Correct. It is one of the five principles listed. (L8, Principles)"
    ],
    [
     "False",
     "The list includes it, with customer focus, facts and data, internal operations and teamwork."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which is the LAST of the six Six Sigma implementation phases?",
   "o": [
    [
     "Training on requirements related to Six Sigma",
     "Training is phase 4."
    ],
    [
     "Implementing the process and applying practical solutions",
     "Implementing the process is phase 5."
    ],
    [
     "Submission of solutions",
     "Correct. Phase 6, the last, is the submission of solutions. (L8, Implementation phases)"
    ],
    [
     "Preparing a written document for the problem or project",
     "The written document is phase 3."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which Six Sigma belt is applied to all employees?",
   "o": [
    [
     "White Belt",
     "White Belt is step 1 in the certification figure, but the lecture assigns \"all employees\" to Yellow."
    ],
    [
     "Yellow Belt",
     "Correct. Yellow Belt is applied to all employees. (L8, Belts)"
    ],
    [
     "Green Belt",
     "Green Belt is for executive employees."
    ],
    [
     "Master Black Belt",
     "Master Black Belt is for senior management."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: The Master Black Belt is applied to senior management and is the top step (step 5) in the certification figure.",
   "o": [
    [
     "True",
     "Correct. Step 5, next to the target, is the Master Black Belt, applied to senior management. (L8, Belts)"
    ],
    [
     "False",
     "Both parts match the figure and the belts table."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the following is listed as a Six Sigma tool or technique?",
   "o": [
    [
     "Contract review",
     "Contract review is ISO 9000 element 3 (Lecture 7)."
    ],
    [
     "Key Process Areas",
     "Key Process Areas are a CMM component (Lecture 7)."
    ],
    [
     "Capability baselines",
     "Capability baselines are a CMM Level 4 improvement (Lecture 7)."
    ],
    [
     "Kanban",
     "Correct. Kanban is in the list with 5S, Seven Wastes, value stream mapping, visual workspace, VOC, Kaizen and regression analysis. (L8, Tools and techniques)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: Six Sigma quality control programs were designed to focus on correcting design, industrial and commercial defects.",
   "o": [
    [
     "True",
     "Correct. The lecture names these three kinds of defects. (L8, Introduction)"
    ],
    [
     "False",
     "The statement matches the lecture word for word."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: According to the normal distribution table, ±5σ leaves 0.57 ppm outside the limits.",
   "o": [
    [
     "True",
     "Correct. ±5σ keeps 99.999943% inside and leaves 0.57 ppm out of spec. (L8, Normal distribution)"
    ],
    [
     "False",
     "The table row for ±5σ is 99.999943% inside, 0.57 ppm outside."
    ]
   ],
   "a": 0
  }
 ]
};

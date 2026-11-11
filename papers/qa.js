// Software Quality Assurance past papers beyond the course file: questions answered from the lectures, with why every other choice is wrong.
// Arabic in ar/qa.js (same order, pushed at the end).
window.PAPERS = window.PAPERS || {};
PAPERS.qa = {
 "exams": [
  {
   "title": "Midterm 2026/2027",
   "meta": "Software Quality Assurance · Midterm, 1st term 2026/2027 · online quiz · 40 questions (MCQ) · Lectures 1 to 8 · Prof. Dr. Arabi Keshk, Prof. Mahmoud Gadallah",
   "note": "Confirmed by the doctor (November 2026), except one question: \"Which stage of SDLC typically consumes the maximum cost and effort?\" The quiz's key for it is Preventive Maintenance, but the answer here is the standard one, Perfective Maintenance (Lientz and Swanson, quoted in Pressman and Sommerville). The answers are worked out from Lectures 1 to 8; the four maintenance types and Lean Six Sigma are not in the lectures and come from the standard textbooks. The first question is edited: the quiz said \"integer >= 9000\", which leaves no invalid option, so the site uses \"> 9000\". The other questions are kept as they appeared, typos included (\"Test plane\", \"Bing Bang\", the same formula listed twice in the cyclomatic complexity question).",
   "sections": [
    {
     "title": "Choose the correct answer",
     "marks": "40 questions",
     "items": [
      {
       "type": "mcq",
       "q": "The program shall accept an input value of integer > 9000. Determine the invalid test case for this program.",
       "o": [
        "9000",
        "9999",
        "10000",
        "All answers"
       ],
       "a": 0,
       "key": "Edited for the site: the quiz said \"integer >= 9000\", which makes 9000, 9999 and 10000 all valid, so no option was an invalid test case. With \"> 9000\", exactly one option works: 9000.",
       "why": "With \"> 9000\" the valid class starts at 9001, so 9000 is the invalid boundary: the value just outside the range, which must be rejected. Lecture 2's example is the same: for \"≥ 10,000\", 09999 is the invalid left boundary and 10000 the valid left boundary (L2, Equivalence partitioning, Boundary value analysis).",
       "ow": [
        null,
        "9999 is greater than 9000, so it is a valid input from the accepted class (L2).",
        "10000 is greater than 9000, so it is a valid input (L2).",
        "9999 and 10000 are valid, so not every option is an invalid test case."
       ]
      },
      {
       "type": "mcq",
       "q": "Which type of software testing refers to testing the running software",
       "o": [
        "Static testing",
        "Requirement testing",
        "Dynamic testing",
        "Analysis testing"
       ],
       "a": 2,
       "why": "Lecture 2: \"Static testing = testing something that is not running (examining and reviewing it). Dynamic testing = running and using the software.\"",
       "ow": [
        "The opposite: static testing examines and reviews software that is not running (L2).",
        "Not a lecture term; L2 splits testing into static (not running) and dynamic (running).",
        null,
        "Not a lecture term; \"Analysis\" is only a Waterfall/Spiral phase in L1, not a type of testing."
       ]
      },
      {
       "type": "mcq",
       "q": "The reason for adhering to standards and guidelines are",
       "o": [
        "Portability",
        "Reliability",
        "Maintainability",
        "All answers"
       ],
       "a": 3,
       "why": "Lecture 3 gives 3 reasons to follow coding standards and guidelines: (1) reliability, more reliable and secure code; (2) readability/maintainability; (3) portability, running on different hardware and compilers (L3, Coding standards and guidelines).",
       "ow": [
        "A real reason, but only one of the three; reliability and maintainability are also listed (L3).",
        "A real reason, but only one of the three (L3).",
        "A real reason (readability/maintainability), but only one of the three (L3).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "What is the main focus of Preventive Maintenance?",
       "o": [
        "Redesigning the entire user interface.",
        "Fixing immediate runtime errors.",
        "Moving data from legacy databases to cloud storage.",
        "Modifying software to detect and correct latent faults before they become actual errors."
       ],
       "a": 3,
       "key": "Confirmed by the doctor. Not in the lectures: the four maintenance types come from the standard classification (ISO/IEC 14764, Pressman, Sommerville).",
       "why": "Preventive maintenance modifies software to detect and correct latent faults before they become effective faults (ISO/IEC 14764). The lectures only describe Maintenance as the last Waterfall phase, which \"fixes issues and updates the software as new needs arise\" (L1).",
       "ow": [
        "Improving or redesigning working software is perfective maintenance.",
        "Fixing faults that have already happened is corrective maintenance, the opposite of acting before errors appear.",
        "Fitting software or data to a new environment is adaptive maintenance (migration).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "A simple sequence of achieve method-message in Queue testing are",
       "o": [
        "create, insert, and delete",
        "create, insert, and pop",
        "create, push, and pop",
        "create, push, and delete"
       ],
       "a": 0,
       "key": "Confirmed by the doctor. The lecture works the stack (create, push, pop); the queue's methods (new, insert, delete) come from the queue diagram in the 2025/26 final.",
       "why": "Method-message (MM) testing needs every method call tested at least once. For the stack, Lecture 4 says \"a simple sequence of create, push and pop might achieve MM testing.\" The queue's state diagram (Empty, Normal, Full) uses new, insert and delete, so its sequence is create, insert and delete (L4, Stack example: MM and FP).",
       "ow": [
        null,
        "Mixes the two: pop is the stack's removal method; the queue's is delete.",
        "This is the stack's sequence from the slide, word for word; push and pop are not the queue's methods.",
        "Mixes the two: push is the stack's insertion method; the queue's is insert."
       ]
      },
      {
       "type": "mcq",
       "q": "Upgrading a software application to make it compatible with a new version of an operating system is an example of:",
       "o": [
        "Perfective Maintenance",
        "Corrective Maintenance",
        "Preventive Maintenance",
        "Adaptive Maintenance"
       ],
       "a": 3,
       "key": "Confirmed by the doctor. Not in the lectures: the four maintenance types come from the standard classification (ISO/IEC 14764, Pressman, Sommerville).",
       "why": "Adaptive maintenance changes software so it keeps working in a changed environment: a new operating system, hardware, database or regulations. Making an application compatible with a new OS version is the textbook example (ISO/IEC 14764).",
       "ow": [
        "Perfective maintenance adds or improves features or performance; the environment changing is not its reason.",
        "Corrective maintenance fixes faults that have appeared; nothing is broken here.",
        "Preventive maintenance fixes latent faults before they become errors; it is not triggered by a new environment.",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "During which Phase of DMAIC is the solution monitored for long-term stability?",
       "o": [
        "Measure",
        "Control",
        "Improve",
        "Define",
        "Analyze"
       ],
       "a": 1,
       "why": "Lecture 8: \"C – Control: focus on monitoring all of these processes and do not stop\": continuously measure performance and correct any deviations. The summary repeats it: \"finally Control: continuously monitor the improvement processes\" (L8, DMAIC).",
       "ow": [
        "Measure measures performance against customer requirements with statistical tools, before any solution exists (L8).",
        null,
        "Improve finds and tests solutions and puts them in place; Control keeps them there (L8).",
        "Define identifies the problem (level, location, financial impact) and forms the team (L8).",
        "Analyze finds the root causes from the collected data (L8)."
       ]
      },
      {
       "type": "mcq",
       "q": "Code coverage have the next type",
       "o": [
        "All answers",
        "Condition coverage",
        "Line coverage",
        "Branch coverage"
       ],
       "a": 0,
       "why": "Lecture 3: \"Code coverage has 3 types: Statement coverage, Path coverage (branch), Condition coverage.\" Condition coverage is on the slide, branch coverage is the slide's name for path coverage, and line coverage is the usual other name for statement coverage (every line runs at least once) (L3, Data coverage and code coverage).",
       "ow": [
        null,
        "A real type, but only one of the three (L3).",
        "A real type (statement coverage), but only one of the three (L3).",
        "A real type (path coverage), but only one of the three (L3)."
       ]
      },
      {
       "type": "mcq",
       "q": "In which among the following is the Lean Six Sigma process not applicable?",
       "o": [
        "Selecting the best employee of the year",
        "Business administration",
        "Healthcare",
        "Supply Chain"
       ],
       "a": 0,
       "key": "Confirmed by the doctor. Lecture 8 does not mention Lean Six Sigma or these fields; answered from general knowledge.",
       "why": "Lean Six Sigma improves repeatable processes: it cuts waste (Lean) and reduces defects and variation (Six Sigma) with DMAIC. Lecture 8 says Six Sigma targets errors \"in all their activities\". Choosing the employee of the year is a one-off judgement, not a repeatable process with defects to measure, so DMAIC has nothing to work on.",
       "ow": [
        null,
        "Administrative processes (approvals, invoicing, HR workflows) repeat and can be measured, so Lean Six Sigma applies.",
        "Healthcare is one of its biggest users, e.g. reducing waiting times and medication errors.",
        "Supply chain (inventory, logistics, delivery) is a classic Lean use."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following stages do inspections come under?",
       "o": [
        "Code coverage",
        "Data coverage",
        "Formal review",
        "Peer review"
       ],
       "a": 2,
       "why": "Lecture 3: static white-box testing splits into Formal Review, Coding Standards and Guidelines, and Code Review Checklist, and Formal Review branches into Peer Review, Walkthrough and Inspection (L3, Static white-box figure).",
       "ow": [
        "Code coverage (statement, path, condition) is dynamic white-box testing, which runs the code; an inspection is a static review (L3).",
        "Data coverage (data flow, sub-boundaries, error forcing) is dynamic white-box testing (L3).",
        null,
        "Peer review is a sibling of inspection, one of the three formal reviews, not the stage above it (L3)."
       ]
      },
      {
       "type": "mcq",
       "q": "What are instructions to be followed which are not really mandatory.",
       "o": [
        "None of the above",
        "Standards",
        "Standards and Guidelines",
        "Guidelines"
       ],
       "a": 3,
       "why": "Lecture 3: \"Standards are rules that must be adhered to (mandatory). Guidelines are instructions which enable a person to follow a set of standards (not really mandatory).\"",
       "ow": [
        "Guidelines fit the definition exactly (L3).",
        "The opposite: standards are the mandatory rules (L3).",
        "Standards are mandatory, so the pair does not fit \"not really mandatory\" (L3).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "The meeting for inspection of the software's design and code is called",
       "o": [
        "All the above",
        "Code review",
        "Data review",
        "Formal review"
       ],
       "a": 3,
       "why": "Lecture 3 defines formal review as \"formal meetings between programmers and testers to inspect the software's design and code\" (L3, Formal review).",
       "ow": [
        "Only formal review matches the definition (L3).",
        "In L3, \"code review\" is the Code Review Checklist, a list of error types, not the meeting; and the meeting covers the design too.",
        "Not a lecture term; data coverage is dynamic testing, not a meeting.",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "What is the primary purpose of Software Maintenance?",
       "o": [
        "Stopping the software from running on older machines.",
        "Writing the initial application code from scratch.",
        "Modifying software, improve performance, or adapt it to a changed environment.",
        "Designing the system architecture during the requirement gathering phase."
       ],
       "a": 2,
       "key": "Confirmed by the doctor. Lecture 1 only names Maintenance as the last Waterfall phase; the option's wording follows the IEEE definition.",
       "why": "Maintenance is the last Waterfall phase, after delivery: it \"fixes issues and updates the software as new needs arise\" (L1). The IEEE definition (IEEE 1219, ISO/IEC 14764): modification of a software product after delivery to correct faults, to improve performance or other attributes, or to adapt it to a modified environment.",
       "ow": [
        "The opposite: adaptive maintenance keeps software working when the environment changes.",
        "That is the Coding phase, before Testing and Maintenance (L1, Waterfall).",
        null,
        "That is the early Analysis and Design phases, long before maintenance (L1, Waterfall)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which stage of SDLC typically consumes the maximum cost and effort?",
       "o": [
        "Perfective Maintenance",
        "Adaptive Maintenance",
        "Preventive Maintenance",
        "Corrective Maintenance"
       ],
       "a": 0,
       "key": "Not confirmed by the doctor: the quiz's key is Preventive Maintenance. The answer here is the standard one: Lientz and Swanson's survey, quoted in Pressman and Sommerville, puts perfective at about 50-60% of maintenance effort and preventive at about 4%, the smallest. Not in the lectures.",
       "why": "The options are maintenance types, and maintenance is the costliest stage, so the question asks which type takes most of it. Lientz, Swanson and Tompkins (1978): 60.3% perfective, 18.2% adaptive, 17.4% corrective, 4.1% other; the rounded textbook version is 50% perfective, 25% adaptive, 21% corrective, 4% preventive.",
       "ow": [
        null,
        "About 18-25% of maintenance effort, well below perfective (Lientz and Swanson).",
        "The smallest share, about 4% (Lientz and Swanson). This is the quiz's key, which goes against the standard sources.",
        "About 17-21%: most effort goes into changing working software, not fixing faults (Lientz and Swanson)."
       ]
      },
      {
       "type": "mcq",
       "q": "Data coverage have the next type",
       "o": [
        "sub-boundaries",
        "Data flow",
        "Error forcing",
        "All answers"
       ],
       "a": 3,
       "why": "Lecture 3: data coverage types are \"Data flow, Sub-boundaries, Error forcing.\" All three options are on the list (L3, Data coverage and code coverage).",
       "ow": [
        "A real type, but only one of the three (L3).",
        "A real type, but only one of the three (L3).",
        "A real type, but only one of the three (L3).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "if(X=2) or (y>1) then A=A+1; the statement coverage test cases are",
       "o": [
        "X=2, y=0",
        "X=1, y=2",
        "X=2, y=2",
        "All answers"
       ],
       "a": 3,
       "why": "Statement coverage means every statement runs at least once (L3); the only statement is A=A+1, so the OR condition must be true. X=2,y=0 (X=2 true), X=1,y=2 (y>1 true) and X=2,y=2 (both true) each run it. The 2025/26 final had the same question, keyed \"All answers\".",
       "ow": [
        "Works (X=2 makes the OR true), but so do the other two.",
        "Works (y=2 > 1 makes the OR true), but so do the other two.",
        "Works (both parts true), but so do the other two.",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "The process is confirmed that software meets the customer's Requirement",
       "o": [
        "Design",
        "Requirements",
        "Validation",
        "Verification"
       ],
       "a": 2,
       "why": "Lecture 2: validation = \"Are we building the right product?\", checking against what the customer needs (e.g. user acceptance testing); verification = \"Are we building the product right?\", checking against the specification. The 2025/26 final keyed the same question as Validation.",
       "ow": [
        "Design is a development activity that defines the structure; it does not check the product.",
        "Requirements are what the product is checked against, not the checking process.",
        null,
        "Verification checks against the specification; checking against the customer's requirement is validation (L2)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following is true about variation?",
       "o": [
        "It decreases cycle time",
        "It increases the likelihood of failing to meet customer requirements",
        "It is one of the 8 Wastes",
        "It is only part of manufacturing processes"
       ],
       "a": 1,
       "why": "Lecture 8: Six Sigma focuses on customer satisfaction and \"reduces process variation until the result is 3.4 defects per million.\" More variation means more output falls outside the customer's limits, so more defects and more failures to meet requirements; the slide's normal-curve table shows the wider the spread, the more parts per million out of spec (L8).",
       "ow": [
        "Variation causes rework and delays, so it makes cycle time longer, not shorter (general Lean knowledge).",
        null,
        "The usual 8 wastes are transport, inventory, motion, waiting, overproduction, overprocessing, defects and unused skills; variation is not one of them (general knowledge; L8 only names the \"Seven Wastes\" tool).",
        "L8 says Six Sigma targets errors \"in all their activities\": design, industrial and commercial."
       ]
      },
      {
       "type": "mcq",
       "q": "Cyclomatic Complexity equals",
       "o": [
        "no. of Edges - no. of nodes + 3",
        "no. of nodes - no. of Edges + 2",
        "no. of Edges - no. of nodes + 2",
        "no. of Edges - no. of nodes + 3"
       ],
       "a": 2,
       "why": "Lecture 4: V(G) = E − N + 2P, with P = 1 for one program, so V(G) = E − N + 2. For foo(): 7 − 6 + 2 = 3, the same as predicate nodes + 1 = 2 + 1 (L4, Cyclomatic complexity and basis paths).",
       "ow": [
        "Wrong constant: foo() would give 7 − 6 + 3 = 4, not the lecture's 3 (L4).",
        "Reversed: foo() would give 6 − 7 + 2 = 1 (L4).",
        null,
        "Same as the first option (the quiz lists it twice): the constant is wrong (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "The goal of a software tester is to find",
       "o": [
        "None of the above",
        "Bugs",
        "Bugs and make sure they get fixed",
        "Fix Bugs"
       ],
       "a": 2,
       "why": "Lecture 6, role of the tester: take responsibility for the bugs found, track bugs through their life cycle, and convince the development team to fix them. The 2025/26 final keyed the same question this way.",
       "ow": [
        "Option c matches the slide.",
        "Incomplete: testing's main goal is to find and report bugs, but the tester must also track them and get them fixed (L6).",
        null,
        "Developers fix bugs; the tester convinces the team to fix them (L6)."
       ]
      },
      {
       "type": "mcq",
       "q": "The process is confirmed that software meets its specification",
       "o": [
        "Validation",
        "Design",
        "Requirements",
        "Verification"
       ],
       "a": 3,
       "why": "Lecture 2: verification = \"Are we building the product right?\", checking against the specification (code reviews, design checks). In the V-model, the left side going down (requirements spec to code) is verification (L1, L2).",
       "ow": [
        "Validation checks against the customer's requirements; checking against the specification is verification (L2).",
        "Design is a development activity; it does not confirm anything against the spec.",
        "Requirements are what is checked against, not the checking process.",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Perfective maintenance is mainly concerned with:",
       "o": [
        "Fixing hidden software crashes.",
        "Restructuring code to make it easier to read without changing its functionality.",
        "Porting code to a new computer hardware platform.",
        "Enhancing system performance, execution speed, or adding new features."
       ],
       "a": 3,
       "key": "Confirmed by the doctor. Not in the lectures: the four maintenance types come from the standard classification (ISO/IEC 14764, Pressman, Sommerville).",
       "why": "Perfective maintenance improves software that already works: better performance and speed, or new features users ask for. It takes the largest share of maintenance effort (Lientz and Swanson).",
       "ow": [
        "Fixing faults is corrective maintenance; catching latent faults early is preventive.",
        "Refactoring for readability is preventive maintenance in ISO/IEC 14764 (it improves maintainability); older IEEE wording puts maintainability under perfective, but the main concern of perfective is performance and features.",
        "Fitting a new hardware platform is adaptive maintenance.",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "During which Phase of DMAIC is the baseline of the problem determined?",
       "o": [
        "Control",
        "Define",
        "Measure",
        "Improve",
        "Analyze"
       ],
       "a": 2,
       "key": "Confirmed by the doctor. Lecture 8 does not use the word \"baseline\"; in standard Six Sigma the baseline is set in Measure.",
       "why": "Lecture 8: Measure is \"planning and implementing performance measurement against the requirements and expectations of customers,\" measuring defects with statistical tools. Measuring current performance before changing anything is the baseline, which later improvements are compared against (L8, DMAIC).",
       "ow": [
        "Control comes last and monitors the solution so it stays stable (L8).",
        "Define describes the problem (level, location, financial impact) and forms the team; Measure puts numbers on it (L8).",
        null,
        "Improve finds and tests solutions, judged against the baseline from Measure (L8).",
        "Analyze finds root causes using the data Measure collected (L8)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following is a strategy of integration testing?",
       "o": [
        "Bottom-up testing",
        "Black box",
        "Bing Bang testing",
        "Static white box testing"
       ],
       "a": 0,
       "key": "Confirmed by the doctor. \"Bing Bang\" (Big Bang) is also an integration strategy in textbooks, but the slides list only bottom-up, top-down and umbrella.",
       "why": "Lecture 3: \"Integration testing strategies: Bottom-up, Top-down, Umbrella approach.\" In the figure, Integration testing splits into Bottom Up, Top Down and Umbrella Approach Testing (L3, Testing the pieces).",
       "ow": [
        null,
        "Black box is a testing approach (from the spec, without the code; L2), not an integration strategy.",
        "Not in the lecture's list. (Big Bang, putting all modules together at once, is a textbook integration strategy, but not on the slides.)",
        "Static white-box reviews design and code without running it; integration testing runs the combined pieces (L3)."
       ]
      },
      {
       "type": "mcq",
       "q": "Umbrella approach is a type of",
       "o": [
        "Bottom up testing",
        "Static testing",
        "Integration Testing",
        "Top down testing"
       ],
       "a": 2,
       "why": "Lecture 3's figure: Integration testing splits into Bottom Up Testing, Top Down Testing and Umbrella Approach Testing (L3, Testing the pieces).",
       "ow": [
        "A sibling of the umbrella approach, not its parent (L3).",
        "Static testing does not run the code; integration testing runs the combined modules (L2, L3).",
        null,
        "A sibling of the umbrella approach, not its parent (L3)."
       ]
      },
      {
       "type": "mcq",
       "q": "Function pair is used to test",
       "o": [
        "State machine diagram",
        "Data flow Diagram",
        "All answers",
        "The interactions between methods"
       ],
       "a": 3,
       "key": "Confirmed by the doctor. \"State machine diagram\" is close: the slide says function pair testing is based on one, but the diagram is the source of the pairs, not what is tested.",
       "why": "Lecture 4: in OO code \"the interactions between methods must be tested,\" and MM and function pair testing are the two approaches for it. Function pair testing tests \"all possible sequences of method executions of length two,\" usually based on a state machine diagram (L4, OOP testing).",
       "ow": [
        "The slide says FP is based on a state machine diagram: the diagram is where the pairs come from, not what is being tested (L4).",
        "Not connected to function pair testing in the lecture; data flow is a type of data coverage (L3).",
        "Cannot be right, because the data flow diagram is wrong.",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Which type of software maintenance is performed to fix bugs and errors discovered after the product is released?",
       "o": [
        "Corrective Maintenance",
        "Perfective Maintenance",
        "Preventive Maintenance",
        "Adaptive Maintenance"
       ],
       "a": 0,
       "key": "Confirmed by the doctor. Not in the lectures: the four maintenance types come from the standard classification (ISO/IEC 14764, Pressman, Sommerville).",
       "why": "Corrective maintenance fixes faults (bugs and errors) found after the software is delivered, usually reported by users (ISO/IEC 14764).",
       "ow": [
        null,
        "Perfective maintenance improves performance or adds features; nothing is broken.",
        "Preventive maintenance fixes latent faults before they become errors; here the bugs have already appeared.",
        "Adaptive maintenance fits the software to a changed environment (new OS or hardware)."
       ]
      },
      {
       "type": "mcq",
       "q": "The method message testing does not subsume",
       "o": [
        "Data coverage",
        "State coverage",
        "Statement coverage",
        "All answers"
       ],
       "a": 2,
       "why": "Lecture 4: MM testing \"is the most basic criterion and does not subsume statement coverage\": calling every method once does not run every statement inside them (L4, OOP testing).",
       "ow": [
        "L4 does not compare data coverage (an L3 white-box idea) with MM testing.",
        "States belong to function pair testing; the slide does not compare state coverage with MM (L4).",
        null,
        "The slide names only statement coverage (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "Document with test objectives and scope is called",
       "o": [
        "Test plane",
        "Random test",
        "Dynamic test",
        "Test case"
       ],
       "a": 0,
       "why": "Lecture 2's table of testing terms: \"Test Plan: document with test objectives and scope\" (example: describes the login testing scope). \"Test plane\" is the quiz's spelling of test plan.",
       "ow": [
        null,
        "A random test is a way of choosing inputs, not a document.",
        "Dynamic testing is a type of testing (running the software), not a document (L2).",
        "A test case is one test: input, conditions and expected output; the test plan sets the objectives and scope for all of them."
       ]
      },
      {
       "type": "mcq",
       "q": "What is the percentage accuracy in the six sigma process?",
       "o": [
        "99.99966%",
        "99.1%",
        "99.8%",
        "99.05%"
       ],
       "a": 0,
       "why": "Lecture 8: Six Sigma reduces variation until the result is 3.4 defects per million opportunities. 3.4 / 1,000,000 = 0.00034% defective, so 100% − 0.00034% = 99.99966% defect-free. (The slide's ±6σ = 99.9999998% is for a perfectly centred process; 3.4 per million allows a 1.5σ drift.)",
       "ow": [
        null,
        "About 9,000 defects per million, roughly 3.9 sigma.",
        "About 2,000 defects per million, roughly 4.4 sigma.",
        "About 9,500 defects per million, roughly 3.8 sigma."
       ]
      },
      {
       "type": "mcq",
       "q": "Identify the boundary tests in order to test the field Day in DD/MM/YYYY.",
       "o": [
        "30, 31",
        "All answers",
        "28",
        "29"
       ],
       "a": 1,
       "why": "Boundary value analysis tests the edges of each valid range (L2). The last valid day depends on the month and year: 28 (February), 29 (February in a leap year), 30 (April, June, September, November), 31 (the other months). All of them are boundaries to test.",
       "ow": [
        "Boundaries for 30- and 31-day months, but February's 28 and 29 are missing.",
        null,
        "Only February's boundary in a normal year.",
        "Only February's boundary in a leap year."
       ]
      },
      {
       "type": "mcq",
       "q": "The errors that caused due to the variables, constants, and strings are related to",
       "o": [
        "Comparison Errors",
        "Control Flow Errors",
        "Computation Errors",
        "Data Reference Errors"
       ],
       "a": 3,
       "why": "Lecture 3, Code Review Checklist: data reference errors are \"errors caused by the usage of variables, constants, arrays, strings or records which are not properly declared or initialized\" (e.g. uninitialized variables, subscripts out of bounds, off-by-one indexing).",
       "ow": [
        "Comparison errors happen at boundary conditions (&lt; vs &lt;=, wrong Boolean operands) (L3).",
        "Control flow errors are loops and control structures behaving wrongly (L3).",
        "Computation errors are wrong calculations, e.g. mixing data types (L3).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Adding long integers to short integers will cause",
       "o": [
        "Comparison Errors",
        "Computation Errors",
        "Data Reference Errors",
        "Control Flow Errors"
       ],
       "a": 1,
       "why": "Lecture 3, Code Review Checklist, computation errors check (b): calculations using variables of \"the same data type but vary in size (ex: adding long integers to short integers).\"",
       "ow": [
        "Comparison errors are about comparison operators and Boolean operands, not arithmetic (L3).",
        null,
        "Data reference errors are about undeclared or uninitialized variables and out-of-bounds indexes (L3).",
        "Control flow errors are about loops and control structures (L3)."
       ]
      },
      {
       "type": "mcq",
       "q": "if (X>1) and (Y=0) then A=A/X; if(X=2) or (A>1) then A=A+1;the statement coverage test cases are",
       "o": [
        "X=0,Y=0, A=4",
        "X=2,Y=0, A=4",
        "All the above",
        "X=3,Y=0, A=1"
       ],
       "a": 1,
       "why": "Statement coverage needs both A=A/X and A=A+1 to run (L3). X=2,Y=0,A=4: X>1 and Y=0 are true, so A = 4/2 = 2; then X=2 is true, so A = 3. Both statements run. The 2025/26 final keyed the same question this way.",
       "ow": [
        "X=0 makes X>1 false, so A=A/X is skipped.",
        null,
        "The other two each skip a statement.",
        "A = 1/3 ≈ 0.33; then X=2 is false and A>1 is false, so A=A+1 is skipped."
       ]
      },
      {
       "type": "mcq",
       "q": "Which type of software testing that not running, examining and reviewing it",
       "o": [
        "Dynamic testing",
        "Static testing",
        "integration testing",
        "System testing"
       ],
       "a": 1,
       "why": "Lecture 2: \"Static testing = testing something that is not running (examining and reviewing it).\"",
       "ow": [
        "The opposite: dynamic testing runs and uses the software (L2).",
        null,
        "Integration testing runs the combined modules, so it is dynamic (L3).",
        "System testing runs the whole system, so it is dynamic (L1, V-model)."
       ]
      },
      {
       "type": "mcq",
       "q": "The activity to ensure that an organization is providing the best product or services to customer",
       "o": [
        "Code coverage",
        "Quality Control",
        "Quality Assurance",
        "Data coverage"
       ],
       "a": 2,
       "why": "Lecture 6: QA is process-focused and preventive and covers the whole organization: establishing standards and methodologies, monitoring and evaluating the development process, and preventing errors from recurring. QC is product-focused and detection-oriented. The 2025/26 final keyed the same question as Quality Assurance.",
       "ow": [
        "Code coverage is a white-box technique (L3), not an organizational activity.",
        "QC inspects the finished product and screens out defects (reactive); it is not the organization-wide assurance activity (L6).",
        null,
        "Data coverage is a white-box technique (L3), not an organizational activity."
       ]
      },
      {
       "type": "mcq",
       "q": "Formal review, Coding standard and guidelines, and Code review are phases of",
       "o": [
        "Dynamic white box testing",
        "Dynamic Black box testing",
        "Static Black box testing",
        "Static white box testing"
       ],
       "a": 3,
       "why": "Lecture 3: the Static White Box Testing tree splits into Formal Review, Coding Standards and Guidelines, and Code Review Checklist (\"Examining the Design and Code\").",
       "ow": [
        "Dynamic white-box runs the code: testing the pieces, data coverage and code coverage (L3).",
        "Dynamic black-box runs the software without seeing the code, e.g. equivalence partitioning and boundary values (L2).",
        "Static black-box reviews the specification (L2); reviews and standards for the code are static white-box.",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Cyclomatic Complexity is used to determine",
       "o": [
        "number of states",
        "number of lines",
        "number of statements",
        "number of paths"
       ],
       "a": 3,
       "why": "Lecture 4: cyclomatic complexity is \"the number of independent (basis) paths,\" so it gives the number of test cases needed to run every basis path. foo() has V(G) = 3 and 3 basis paths: 1-2-3-4-6, 1-3-4-6, 1-3-5-6.",
       "ow": [
        "States come from a state machine diagram, used for function pair testing (L4).",
        "V(G) counts decisions, not lines: straight-line code has V(G) = 1 however long it is.",
        "Statements do not change V(G) unless they add a decision; statement coverage is a different idea (L3).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "From the following, select the choice which is appropriate to standards and guidelines",
       "o": [
        "Scalability",
        "Reliability",
        "Usability",
        "Compatibility"
       ],
       "a": 1,
       "why": "Lecture 3: the 3 reasons for standards and guidelines are reliability, readability/maintainability and portability. Only reliability is among the options.",
       "ow": [
        "Not one of the three reasons (L3).",
        null,
        "Not one of the three reasons; usability is a user-facing quality (L3).",
        "Sounds like portability, but the slide's word is portability, and compatibility is not listed (L3)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following is not an advantage of using Lean Six Sigma?",
       "o": [
        "Product improvement",
        "A decrease in customer satisfaction",
        "Defect reduction",
        "Process improvement"
       ],
       "a": 1,
       "why": "Lecture 8: Six Sigma is \"a statistical management system focusing on customer satisfaction, reducing waste, improving quality,\" and reduces defects to 3.4 per million. It aims to raise customer satisfaction, so a decrease cannot be an advantage.",
       "ow": [
        "A real advantage: improving quality and offering a zero-defect product (L8).",
        null,
        "A real advantage: the core goal, 3.4 defects per million or fewer (L8).",
        "A real advantage: DMAIC's Improve phase changes processes to remove defects, costs and waste (L8)."
       ]
      }
     ]
    }
   ]
  }
 ],
 "quiz": {
  "1": [
   {
    "q": "What is the main focus of Preventive Maintenance?",
    "o": [
     [
      "Redesigning the entire user interface.",
      "Improving or redesigning working software is perfective maintenance."
     ],
     [
      "Fixing immediate runtime errors.",
      "Fixing faults that have already happened is corrective maintenance, the opposite of acting before errors appear."
     ],
     [
      "Moving data from legacy databases to cloud storage.",
      "Fitting software or data to a new environment is adaptive maintenance (migration)."
     ],
     [
      "Modifying software to detect and correct latent faults before they become actual errors.",
      "Correct. Preventive maintenance modifies software to detect and correct latent faults before they become effective faults (ISO/IEC 14764). The lectures only describe Maintenance as the last Waterfall phase, which \"fixes issues and updates the software as new needs arise\" (L1)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Upgrading a software application to make it compatible with a new version of an operating system is an example of:",
    "o": [
     [
      "Perfective Maintenance",
      "Perfective maintenance adds or improves features or performance; the environment changing is not its reason."
     ],
     [
      "Corrective Maintenance",
      "Corrective maintenance fixes faults that have appeared; nothing is broken here."
     ],
     [
      "Preventive Maintenance",
      "Preventive maintenance fixes latent faults before they become errors; it is not triggered by a new environment."
     ],
     [
      "Adaptive Maintenance",
      "Correct. Adaptive maintenance changes software so it keeps working in a changed environment: a new operating system, hardware, database or regulations. Making an application compatible with a new OS version is the textbook example (ISO/IEC 14764)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "What is the primary purpose of Software Maintenance?",
    "o": [
     [
      "Stopping the software from running on older machines.",
      "The opposite: adaptive maintenance keeps software working when the environment changes."
     ],
     [
      "Writing the initial application code from scratch.",
      "That is the Coding phase, before Testing and Maintenance (L1, Waterfall)."
     ],
     [
      "Modifying software, improve performance, or adapt it to a changed environment.",
      "Correct. Maintenance is the last Waterfall phase, after delivery: it \"fixes issues and updates the software as new needs arise\" (L1). The IEEE definition (IEEE 1219, ISO/IEC 14764): modification of a software product after delivery to correct faults, to improve performance or other attributes, or to adapt it to a modified environment."
     ],
     [
      "Designing the system architecture during the requirement gathering phase.",
      "That is the early Analysis and Design phases, long before maintenance (L1, Waterfall)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which stage of SDLC typically consumes the maximum cost and effort?",
    "o": [
     [
      "Perfective Maintenance",
      "Correct. The options are maintenance types, and maintenance is the costliest stage, so the question asks which type takes most of it. Lientz, Swanson and Tompkins (1978): 60.3% perfective, 18.2% adaptive, 17.4% corrective, 4.1% other; the rounded textbook version is 50% perfective, 25% adaptive, 21% corrective, 4% preventive."
     ],
     [
      "Adaptive Maintenance",
      "About 18-25% of maintenance effort, well below perfective (Lientz and Swanson)."
     ],
     [
      "Preventive Maintenance",
      "The smallest share, about 4% (Lientz and Swanson). This is the quiz's key, which goes against the standard sources."
     ],
     [
      "Corrective Maintenance",
      "About 17-21%: most effort goes into changing working software, not fixing faults (Lientz and Swanson)."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Perfective maintenance is mainly concerned with:",
    "o": [
     [
      "Fixing hidden software crashes.",
      "Fixing faults is corrective maintenance; catching latent faults early is preventive."
     ],
     [
      "Restructuring code to make it easier to read without changing its functionality.",
      "Refactoring for readability is preventive maintenance in ISO/IEC 14764 (it improves maintainability); older IEEE wording puts maintainability under perfective, but the main concern of perfective is performance and features."
     ],
     [
      "Porting code to a new computer hardware platform.",
      "Fitting a new hardware platform is adaptive maintenance."
     ],
     [
      "Enhancing system performance, execution speed, or adding new features.",
      "Correct. Perfective maintenance improves software that already works: better performance and speed, or new features users ask for. It takes the largest share of maintenance effort (Lientz and Swanson)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which type of software maintenance is performed to fix bugs and errors discovered after the product is released?",
    "o": [
     [
      "Corrective Maintenance",
      "Correct. Corrective maintenance fixes faults (bugs and errors) found after the software is delivered, usually reported by users (ISO/IEC 14764)."
     ],
     [
      "Perfective Maintenance",
      "Perfective maintenance improves performance or adds features; nothing is broken."
     ],
     [
      "Preventive Maintenance",
      "Preventive maintenance fixes latent faults before they become errors; here the bugs have already appeared."
     ],
     [
      "Adaptive Maintenance",
      "Adaptive maintenance fits the software to a changed environment (new OS or hardware)."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   }
  ],
  "2": [
   {
    "q": "The program shall accept an input value of integer &gt; 9000. Determine the invalid test case for this program.",
    "o": [
     [
      "9000",
      "Correct. With \"> 9000\" the valid class starts at 9001, so 9000 is the invalid boundary: the value just outside the range, which must be rejected. Lecture 2's example is the same: for \"≥ 10,000\", 09999 is the invalid left boundary and 10000 the valid left boundary (L2, Equivalence partitioning, Boundary value analysis)."
     ],
     [
      "9999",
      "9999 is greater than 9000, so it is a valid input from the accepted class (L2)."
     ],
     [
      "10000",
      "10000 is greater than 9000, so it is a valid input (L2)."
     ],
     [
      "All answers",
      "9999 and 10000 are valid, so not every option is an invalid test case."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which type of software testing refers to testing the running software",
    "o": [
     [
      "Static testing",
      "The opposite: static testing examines and reviews software that is not running (L2)."
     ],
     [
      "Requirement testing",
      "Not a lecture term; L2 splits testing into static (not running) and dynamic (running)."
     ],
     [
      "Dynamic testing",
      "Correct. Lecture 2: \"Static testing = testing something that is not running (examining and reviewing it). Dynamic testing = running and using the software.\""
     ],
     [
      "Analysis testing",
      "Not a lecture term; \"Analysis\" is only a Waterfall/Spiral phase in L1, not a type of testing."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "The process is confirmed that software meets the customer's Requirement",
    "o": [
     [
      "Design",
      "Design is a development activity that defines the structure; it does not check the product."
     ],
     [
      "Requirements",
      "Requirements are what the product is checked against, not the checking process."
     ],
     [
      "Validation",
      "Correct. Lecture 2: validation = \"Are we building the right product?\", checking against what the customer needs (e.g. user acceptance testing); verification = \"Are we building the product right?\", checking against the specification. The 2025/26 final keyed the same question as Validation."
     ],
     [
      "Verification",
      "Verification checks against the specification; checking against the customer's requirement is validation (L2)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "The process is confirmed that software meets its specification",
    "o": [
     [
      "Validation",
      "Validation checks against the customer's requirements; checking against the specification is verification (L2)."
     ],
     [
      "Design",
      "Design is a development activity; it does not confirm anything against the spec."
     ],
     [
      "Requirements",
      "Requirements are what is checked against, not the checking process."
     ],
     [
      "Verification",
      "Correct. Lecture 2: verification = \"Are we building the product right?\", checking against the specification (code reviews, design checks). In the V-model, the left side going down (requirements spec to code) is verification (L1, L2)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Document with test objectives and scope is called",
    "o": [
     [
      "Test plane",
      "Correct. Lecture 2's table of testing terms: \"Test Plan: document with test objectives and scope\" (example: describes the login testing scope). \"Test plane\" is the quiz's spelling of test plan."
     ],
     [
      "Random test",
      "A random test is a way of choosing inputs, not a document."
     ],
     [
      "Dynamic test",
      "Dynamic testing is a type of testing (running the software), not a document (L2)."
     ],
     [
      "Test case",
      "A test case is one test: input, conditions and expected output; the test plan sets the objectives and scope for all of them."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Identify the boundary tests in order to test the field Day in DD/MM/YYYY.",
    "o": [
     [
      "30, 31",
      "Boundaries for 30- and 31-day months, but February's 28 and 29 are missing."
     ],
     [
      "All answers",
      "Correct. Boundary value analysis tests the edges of each valid range (L2). The last valid day depends on the month and year: 28 (February), 29 (February in a leap year), 30 (April, June, September, November), 31 (the other months). All of them are boundaries to test."
     ],
     [
      "28",
      "Only February's boundary in a normal year."
     ],
     [
      "29",
      "Only February's boundary in a leap year."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which type of software testing that not running, examining and reviewing it",
    "o": [
     [
      "Dynamic testing",
      "The opposite: dynamic testing runs and uses the software (L2)."
     ],
     [
      "Static testing",
      "Correct. Lecture 2: \"Static testing = testing something that is not running (examining and reviewing it).\""
     ],
     [
      "integration testing",
      "Integration testing runs the combined modules, so it is dynamic (L3)."
     ],
     [
      "System testing",
      "System testing runs the whole system, so it is dynamic (L1, V-model)."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   }
  ],
  "3": [
   {
    "q": "The reason for adhering to standards and guidelines are",
    "o": [
     [
      "Portability",
      "A real reason, but only one of the three; reliability and maintainability are also listed (L3)."
     ],
     [
      "Reliability",
      "A real reason, but only one of the three (L3)."
     ],
     [
      "Maintainability",
      "A real reason (readability/maintainability), but only one of the three (L3)."
     ],
     [
      "All answers",
      "Correct. Lecture 3 gives 3 reasons to follow coding standards and guidelines: (1) reliability, more reliable and secure code; (2) readability/maintainability; (3) portability, running on different hardware and compilers (L3, Coding standards and guidelines)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Code coverage have the next type",
    "o": [
     [
      "All answers",
      "Correct. Lecture 3: \"Code coverage has 3 types: Statement coverage, Path coverage (branch), Condition coverage.\" Condition coverage is on the slide, branch coverage is the slide's name for path coverage, and line coverage is the usual other name for statement coverage (every line runs at least once) (L3, Data coverage and code coverage)."
     ],
     [
      "Condition coverage",
      "A real type, but only one of the three (L3)."
     ],
     [
      "Line coverage",
      "A real type (statement coverage), but only one of the three (L3)."
     ],
     [
      "Branch coverage",
      "A real type (path coverage), but only one of the three (L3)."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following stages do inspections come under?",
    "o": [
     [
      "Code coverage",
      "Code coverage (statement, path, condition) is dynamic white-box testing, which runs the code; an inspection is a static review (L3)."
     ],
     [
      "Data coverage",
      "Data coverage (data flow, sub-boundaries, error forcing) is dynamic white-box testing (L3)."
     ],
     [
      "Formal review",
      "Correct. Lecture 3: static white-box testing splits into Formal Review, Coding Standards and Guidelines, and Code Review Checklist, and Formal Review branches into Peer Review, Walkthrough and Inspection (L3, Static white-box figure)."
     ],
     [
      "Peer review",
      "Peer review is a sibling of inspection, one of the three formal reviews, not the stage above it (L3)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "What are instructions to be followed which are not really mandatory.",
    "o": [
     [
      "None of the above",
      "Guidelines fit the definition exactly (L3)."
     ],
     [
      "Standards",
      "The opposite: standards are the mandatory rules (L3)."
     ],
     [
      "Standards and Guidelines",
      "Standards are mandatory, so the pair does not fit \"not really mandatory\" (L3)."
     ],
     [
      "Guidelines",
      "Correct. Lecture 3: \"Standards are rules that must be adhered to (mandatory). Guidelines are instructions which enable a person to follow a set of standards (not really mandatory).\""
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "The meeting for inspection of the software's design and code is called",
    "o": [
     [
      "All the above",
      "Only formal review matches the definition (L3)."
     ],
     [
      "Code review",
      "In L3, \"code review\" is the Code Review Checklist, a list of error types, not the meeting; and the meeting covers the design too."
     ],
     [
      "Data review",
      "Not a lecture term; data coverage is dynamic testing, not a meeting."
     ],
     [
      "Formal review",
      "Correct. Lecture 3 defines formal review as \"formal meetings between programmers and testers to inspect the software's design and code\" (L3, Formal review)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Data coverage have the next type",
    "o": [
     [
      "sub-boundaries",
      "A real type, but only one of the three (L3)."
     ],
     [
      "Data flow",
      "A real type, but only one of the three (L3)."
     ],
     [
      "Error forcing",
      "A real type, but only one of the three (L3)."
     ],
     [
      "All answers",
      "Correct. Lecture 3: data coverage types are \"Data flow, Sub-boundaries, Error forcing.\" All three options are on the list (L3, Data coverage and code coverage)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "if(X=2) or (y&gt;1) then A=A+1; the statement coverage test cases are",
    "o": [
     [
      "X=2, y=0",
      "Works (X=2 makes the OR true), but so do the other two."
     ],
     [
      "X=1, y=2",
      "Works (y=2 > 1 makes the OR true), but so do the other two."
     ],
     [
      "X=2, y=2",
      "Works (both parts true), but so do the other two."
     ],
     [
      "All answers",
      "Correct. Statement coverage means every statement runs at least once (L3); the only statement is A=A+1, so the OR condition must be true. X=2,y=0 (X=2 true), X=1,y=2 (y>1 true) and X=2,y=2 (both true) each run it. The 2025/26 final had the same question, keyed \"All answers\"."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following is a strategy of integration testing?",
    "o": [
     [
      "Bottom-up testing",
      "Correct. Lecture 3: \"Integration testing strategies: Bottom-up, Top-down, Umbrella approach.\" In the figure, Integration testing splits into Bottom Up, Top Down and Umbrella Approach Testing (L3, Testing the pieces)."
     ],
     [
      "Black box",
      "Black box is a testing approach (from the spec, without the code; L2), not an integration strategy."
     ],
     [
      "Bing Bang testing",
      "Not in the lecture's list. (Big Bang, putting all modules together at once, is a textbook integration strategy, but not on the slides.)"
     ],
     [
      "Static white box testing",
      "Static white-box reviews design and code without running it; integration testing runs the combined pieces (L3)."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Umbrella approach is a type of",
    "o": [
     [
      "Bottom up testing",
      "A sibling of the umbrella approach, not its parent (L3)."
     ],
     [
      "Static testing",
      "Static testing does not run the code; integration testing runs the combined modules (L2, L3)."
     ],
     [
      "Integration Testing",
      "Correct. Lecture 3's figure: Integration testing splits into Bottom Up Testing, Top Down Testing and Umbrella Approach Testing (L3, Testing the pieces)."
     ],
     [
      "Top down testing",
      "A sibling of the umbrella approach, not its parent (L3)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "The errors that caused due to the variables, constants, and strings are related to",
    "o": [
     [
      "Comparison Errors",
      "Comparison errors happen at boundary conditions (&lt; vs &lt;=, wrong Boolean operands) (L3)."
     ],
     [
      "Control Flow Errors",
      "Control flow errors are loops and control structures behaving wrongly (L3)."
     ],
     [
      "Computation Errors",
      "Computation errors are wrong calculations, e.g. mixing data types (L3)."
     ],
     [
      "Data Reference Errors",
      "Correct. Lecture 3, Code Review Checklist: data reference errors are \"errors caused by the usage of variables, constants, arrays, strings or records which are not properly declared or initialized\" (e.g. uninitialized variables, subscripts out of bounds, off-by-one indexing)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Adding long integers to short integers will cause",
    "o": [
     [
      "Comparison Errors",
      "Comparison errors are about comparison operators and Boolean operands, not arithmetic (L3)."
     ],
     [
      "Computation Errors",
      "Correct. Lecture 3, Code Review Checklist, computation errors check (b): calculations using variables of \"the same data type but vary in size (ex: adding long integers to short integers).\""
     ],
     [
      "Data Reference Errors",
      "Data reference errors are about undeclared or uninitialized variables and out-of-bounds indexes (L3)."
     ],
     [
      "Control Flow Errors",
      "Control flow errors are about loops and control structures (L3)."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "if (X&gt;1) and (Y=0) then A=A/X; if(X=2) or (A&gt;1) then A=A+1;the statement coverage test cases are",
    "o": [
     [
      "X=0,Y=0, A=4",
      "X=0 makes X>1 false, so A=A/X is skipped."
     ],
     [
      "X=2,Y=0, A=4",
      "Correct. Statement coverage needs both A=A/X and A=A+1 to run (L3). X=2,Y=0,A=4: X>1 and Y=0 are true, so A = 4/2 = 2; then X=2 is true, so A = 3. Both statements run. The 2025/26 final keyed the same question this way."
     ],
     [
      "All the above",
      "The other two each skip a statement."
     ],
     [
      "X=3,Y=0, A=1",
      "A = 1/3 ≈ 0.33; then X=2 is false and A>1 is false, so A=A+1 is skipped."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Formal review, Coding standard and guidelines, and Code review are phases of",
    "o": [
     [
      "Dynamic white box testing",
      "Dynamic white-box runs the code: testing the pieces, data coverage and code coverage (L3)."
     ],
     [
      "Dynamic Black box testing",
      "Dynamic black-box runs the software without seeing the code, e.g. equivalence partitioning and boundary values (L2)."
     ],
     [
      "Static Black box testing",
      "Static black-box reviews the specification (L2); reviews and standards for the code are static white-box."
     ],
     [
      "Static white box testing",
      "Correct. Lecture 3: the Static White Box Testing tree splits into Formal Review, Coding Standards and Guidelines, and Code Review Checklist (\"Examining the Design and Code\")."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "From the following, select the choice which is appropriate to standards and guidelines",
    "o": [
     [
      "Scalability",
      "Not one of the three reasons (L3)."
     ],
     [
      "Reliability",
      "Correct. Lecture 3: the 3 reasons for standards and guidelines are reliability, readability/maintainability and portability. Only reliability is among the options."
     ],
     [
      "Usability",
      "Not one of the three reasons; usability is a user-facing quality (L3)."
     ],
     [
      "Compatibility",
      "Sounds like portability, but the slide's word is portability, and compatibility is not listed (L3)."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   }
  ],
  "4": [
   {
    "q": "A simple sequence of achieve method-message in Queue testing are",
    "o": [
     [
      "create, insert, and delete",
      "Correct. Method-message (MM) testing needs every method call tested at least once. For the stack, Lecture 4 says \"a simple sequence of create, push and pop might achieve MM testing.\" The queue's state diagram (Empty, Normal, Full) uses new, insert and delete, so its sequence is create, insert and delete (L4, Stack example: MM and FP)."
     ],
     [
      "create, insert, and pop",
      "Mixes the two: pop is the stack's removal method; the queue's is delete."
     ],
     [
      "create, push, and pop",
      "This is the stack's sequence from the slide, word for word; push and pop are not the queue's methods."
     ],
     [
      "create, push, and delete",
      "Mixes the two: push is the stack's insertion method; the queue's is insert."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Cyclomatic Complexity equals",
    "o": [
     [
      "no. of Edges - no. of nodes + 3",
      "Wrong constant: foo() would give 7 − 6 + 3 = 4, not the lecture's 3 (L4)."
     ],
     [
      "no. of nodes - no. of Edges + 2",
      "Reversed: foo() would give 6 − 7 + 2 = 1 (L4)."
     ],
     [
      "no. of Edges - no. of nodes + 2",
      "Correct. Lecture 4: V(G) = E − N + 2P, with P = 1 for one program, so V(G) = E − N + 2. For foo(): 7 − 6 + 2 = 3, the same as predicate nodes + 1 = 2 + 1 (L4, Cyclomatic complexity and basis paths)."
     ],
     [
      "no. of Edges - no. of nodes + 3",
      "Same as the first option (the quiz lists it twice): the constant is wrong (L4)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Function pair is used to test",
    "o": [
     [
      "State machine diagram",
      "The slide says FP is based on a state machine diagram: the diagram is where the pairs come from, not what is being tested (L4)."
     ],
     [
      "Data flow Diagram",
      "Not connected to function pair testing in the lecture; data flow is a type of data coverage (L3)."
     ],
     [
      "All answers",
      "Cannot be right, because the data flow diagram is wrong."
     ],
     [
      "The interactions between methods",
      "Correct. Lecture 4: in OO code \"the interactions between methods must be tested,\" and MM and function pair testing are the two approaches for it. Function pair testing tests \"all possible sequences of method executions of length two,\" usually based on a state machine diagram (L4, OOP testing)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "The method message testing does not subsume",
    "o": [
     [
      "Data coverage",
      "L4 does not compare data coverage (an L3 white-box idea) with MM testing."
     ],
     [
      "State coverage",
      "States belong to function pair testing; the slide does not compare state coverage with MM (L4)."
     ],
     [
      "Statement coverage",
      "Correct. Lecture 4: MM testing \"is the most basic criterion and does not subsume statement coverage\": calling every method once does not run every statement inside them (L4, OOP testing)."
     ],
     [
      "All answers",
      "The slide names only statement coverage (L4)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Cyclomatic Complexity is used to determine",
    "o": [
     [
      "number of states",
      "States come from a state machine diagram, used for function pair testing (L4)."
     ],
     [
      "number of lines",
      "V(G) counts decisions, not lines: straight-line code has V(G) = 1 however long it is."
     ],
     [
      "number of statements",
      "Statements do not change V(G) unless they add a decision; statement coverage is a different idea (L3)."
     ],
     [
      "number of paths",
      "Correct. Lecture 4: cyclomatic complexity is \"the number of independent (basis) paths,\" so it gives the number of test cases needed to run every basis path. foo() has V(G) = 3 and 3 basis paths: 1-2-3-4-6, 1-3-4-6, 1-3-5-6."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   }
  ],
  "6": [
   {
    "q": "The goal of a software tester is to find",
    "o": [
     [
      "None of the above",
      "Option c matches the slide."
     ],
     [
      "Bugs",
      "Incomplete: testing's main goal is to find and report bugs, but the tester must also track them and get them fixed (L6)."
     ],
     [
      "Bugs and make sure they get fixed",
      "Correct. Lecture 6, role of the tester: take responsibility for the bugs found, track bugs through their life cycle, and convince the development team to fix them. The 2025/26 final keyed the same question this way."
     ],
     [
      "Fix Bugs",
      "Developers fix bugs; the tester convinces the team to fix them (L6)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "The activity to ensure that an organization is providing the best product or services to customer",
    "o": [
     [
      "Code coverage",
      "Code coverage is a white-box technique (L3), not an organizational activity."
     ],
     [
      "Quality Control",
      "QC inspects the finished product and screens out defects (reactive); it is not the organization-wide assurance activity (L6)."
     ],
     [
      "Quality Assurance",
      "Correct. Lecture 6: QA is process-focused and preventive and covers the whole organization: establishing standards and methodologies, monitoring and evaluating the development process, and preventing errors from recurring. QC is product-focused and detection-oriented. The 2025/26 final keyed the same question as Quality Assurance."
     ],
     [
      "Data coverage",
      "Data coverage is a white-box technique (L3), not an organizational activity."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   }
  ],
  "8": [
   {
    "q": "During which Phase of DMAIC is the solution monitored for long-term stability?",
    "o": [
     [
      "Measure",
      "Measure measures performance against customer requirements with statistical tools, before any solution exists (L8)."
     ],
     [
      "Control",
      "Correct. Lecture 8: \"C – Control: focus on monitoring all of these processes and do not stop\": continuously measure performance and correct any deviations. The summary repeats it: \"finally Control: continuously monitor the improvement processes\" (L8, DMAIC)."
     ],
     [
      "Improve",
      "Improve finds and tests solutions and puts them in place; Control keeps them there (L8)."
     ],
     [
      "Define",
      "Define identifies the problem (level, location, financial impact) and forms the team (L8)."
     ],
     [
      "Analyze",
      "Analyze finds the root causes from the collected data (L8)."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "In which among the following is the Lean Six Sigma process not applicable?",
    "o": [
     [
      "Selecting the best employee of the year",
      "Correct. Lean Six Sigma improves repeatable processes: it cuts waste (Lean) and reduces defects and variation (Six Sigma) with DMAIC. Lecture 8 says Six Sigma targets errors \"in all their activities\". Choosing the employee of the year is a one-off judgement, not a repeatable process with defects to measure, so DMAIC has nothing to work on."
     ],
     [
      "Business administration",
      "Administrative processes (approvals, invoicing, HR workflows) repeat and can be measured, so Lean Six Sigma applies."
     ],
     [
      "Healthcare",
      "Healthcare is one of its biggest users, e.g. reducing waiting times and medication errors."
     ],
     [
      "Supply Chain",
      "Supply chain (inventory, logistics, delivery) is a classic Lean use."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following is true about variation?",
    "o": [
     [
      "It decreases cycle time",
      "Variation causes rework and delays, so it makes cycle time longer, not shorter (general Lean knowledge)."
     ],
     [
      "It increases the likelihood of failing to meet customer requirements",
      "Correct. Lecture 8: Six Sigma focuses on customer satisfaction and \"reduces process variation until the result is 3.4 defects per million.\" More variation means more output falls outside the customer's limits, so more defects and more failures to meet requirements; the slide's normal-curve table shows the wider the spread, the more parts per million out of spec (L8)."
     ],
     [
      "It is one of the 8 Wastes",
      "The usual 8 wastes are transport, inventory, motion, waiting, overproduction, overprocessing, defects and unused skills; variation is not one of them (general knowledge; L8 only names the \"Seven Wastes\" tool)."
     ],
     [
      "It is only part of manufacturing processes",
      "L8 says Six Sigma targets errors \"in all their activities\": design, industrial and commercial."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "During which Phase of DMAIC is the baseline of the problem determined?",
    "o": [
     [
      "Control",
      "Control comes last and monitors the solution so it stays stable (L8)."
     ],
     [
      "Define",
      "Define describes the problem (level, location, financial impact) and forms the team; Measure puts numbers on it (L8)."
     ],
     [
      "Measure",
      "Correct. Lecture 8: Measure is \"planning and implementing performance measurement against the requirements and expectations of customers,\" measuring defects with statistical tools. Measuring current performance before changing anything is the baseline, which later improvements are compared against (L8, DMAIC)."
     ],
     [
      "Improve",
      "Improve finds and tests solutions, judged against the baseline from Measure (L8)."
     ],
     [
      "Analyze",
      "Analyze finds root causes using the data Measure collected (L8)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "What is the percentage accuracy in the six sigma process?",
    "o": [
     [
      "99.99966%",
      "Correct. Lecture 8: Six Sigma reduces variation until the result is 3.4 defects per million opportunities. 3.4 / 1,000,000 = 0.00034% defective, so 100% − 0.00034% = 99.99966% defect-free. (The slide's ±6σ = 99.9999998% is for a perfectly centred process; 3.4 per million allows a 1.5σ drift.)"
     ],
     [
      "99.1%",
      "About 9,000 defects per million, roughly 3.9 sigma."
     ],
     [
      "99.8%",
      "About 2,000 defects per million, roughly 4.4 sigma."
     ],
     [
      "99.05%",
      "About 9,500 defects per million, roughly 3.8 sigma."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following is not an advantage of using Lean Six Sigma?",
    "o": [
     [
      "Product improvement",
      "A real advantage: improving quality and offering a zero-defect product (L8)."
     ],
     [
      "A decrease in customer satisfaction",
      "Correct. Lecture 8: Six Sigma is \"a statistical management system focusing on customer satisfaction, reducing waste, improving quality,\" and reduces defects to 3.4 per million. It aims to raise customer satisfaction, so a decrease cannot be an advantage."
     ],
     [
      "Defect reduction",
      "A real advantage: the core goal, 3.4 defects per million or fewer (L8)."
     ],
     [
      "Process improvement",
      "A real advantage: DMAIC's Improve phase changes processes to remove defects, costs and waste (L8)."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   }
  ]
 }
};

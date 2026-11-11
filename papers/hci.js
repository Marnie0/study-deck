// HCI past papers beyond the course file: questions answered from the lectures, with why every other choice is wrong.
// Arabic in ar/hci.js (same order; the lecture-quiz copies are spliced in before the student-summary items).
window.PAPERS = window.PAPERS || {};
PAPERS.hci = {
 "exams": [
  {
   "title": "Midterm 2026/2027",
   "meta": "CS314 Human Computer Interaction · Midterm, 1st term 2026/2027 · online quiz · 30 questions (MCQ) · Lectures 1 to 6 · Dr. Mona Samir Lackousha",
   "note": "Not yet confirmed by the doctor. The answers are worked out from Lectures 1 to 6. Judgement calls: \"Recognizing a familiar face\" is answered as perception, because Lecture 4's own example (memory) is not an option; \"Communication theory belongs to which component?\" follows Lecture 1's pie chart, which puts it under Human, not Interaction; \"the slide's recommendation\" is 7 tabs, although the slide only poses the 7 ± 2 rule as a question. What the Decide stage does and the \"quickly\" in the Design Sprint's goal come from Knapp et al., not the slides.",
   "sections": [
    {
     "title": "Choose the correct answer",
     "marks": "30 questions",
     "items": [
      {
       "type": "mcq",
       "q": "What is the best way to ensure a survey collects accurate user feedback in HCI?",
       "o": [
        "Only ask open-ended questions",
        "Use clear and unbiased wording in questions",
        "Make all questions mandatory",
        "Ask technical questions that users may not understand"
       ],
       "a": 1,
       "why": "Lecture 6 gives six principles for good survey questions: Clear, Concise, Specific, Expressive, Unbiased, Usable. Clear and unbiased wording is two of them: label scales, no overlapping ranges, and no leading questions (L6, Six principles).",
       "ow": [
        "The lecture says to leave potentially open-ended questions open, not to make every question open. It also recommends ranges and levels of agreement (L6, Be Expressive, Be Unbiased).",
        null,
        "Making questions mandatory is not one of the six principles. Forcing answers makes people quit or guess (general survey practice, not in the slides).",
        "This breaks Be Concise: ask questions in plain language. Questions users do not understand give inaccurate answers (L6, Be Concise)."
       ]
      },
      {
       "type": "mcq",
       "q": "What is the main purpose of the Decide stage?",
       "o": [
        "Test the product",
        "Select the best idea",
        "Build the prototype",
        "Understand the market"
       ],
       "a": 1,
       "key": "Lecture 2 lists the five sprint steps but does not describe each one. What Decide does comes from the standard Design Sprint method (Knapp et al.).",
       "why": "Google Design Sprint (Knapp et al., 2016): Unpack → Sketch → Decide → Prototype → Test, then iterate. In Decide the team picks the best of the ideas sketched in the step before, and that is the one it prototypes next (L2, Google Design Sprints).",
       "ow": [
        "Testing is the fifth step, Test (L2).",
        null,
        "Building the prototype is the fourth step, Prototype, which comes after Decide (L2).",
        "Understanding the problem and the users belongs to the first step, Unpack (L2)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following is NOT a key factor in HCI?",
       "o": [
        "Machine learning",
        "User interface (UI)",
        "User experience (UX)",
        "Usability"
       ],
       "a": 0,
       "why": "HCI is built around designing interactive products people can use: usability (L1), the user interface and the user experience (L5, UI vs UX). Machine learning is a separate field of computer science; a product may use it, but it is not a key factor of HCI.",
       "ow": [
        null,
        "UI is a core HCI factor: the look, feel and interactivity of a screen (L5, UI vs UX).",
        "UX is a core HCI factor: the user's overall experience with the product (L5, UI vs UX).",
        "Usability is a core HCI factor: easy to learn, effective to use, and an enjoyable experience (L1)."
       ]
      },
      {
       "type": "mcq",
       "q": "Recognizing a familiar face is an example of:",
       "o": [
        "Planning",
        "Problem-solving",
        "Perception",
        "Decision-making"
       ],
       "a": 2,
       "key": "Lecture 4 uses recognizing someone's face as an example of memory, which is not among the options. Of the four, perception is the process involved.",
       "why": "Perception is how information is acquired from the world and transformed into experiences (L3). Seeing a face and recognizing it as someone you know starts there. L4 also uses this example for memory, but memory is not an option here.",
       "ow": [
        "Planning is reflective cognition: thinking about what to do and the consequences (L4). Recognizing a face is fast and automatic.",
        "Problem-solving is reflective cognition too (L4). There is no problem to solve when you recognize a face.",
        null,
        "Decision-making means choosing between options (L4). Recognizing a face involves no choice."
       ]
      },
      {
       "type": "mcq",
       "q": "Decision-making means:",
       "o": [
        "Memorizing words",
        "Choosing between different options",
        "Forgetting information",
        "Ignoring problems"
       ],
       "a": 1,
       "why": "Decision-making is in the reflective-cognition group with problem-solving, planning and reasoning: thinking about what to do, what the options are, and the consequences, then choosing one (L4, Problem-solving, planning, reasoning, and decision-making).",
       "ow": [
        "Memorizing words is memory and learning, separate cognitive processes (L3, L4).",
        null,
        "Forgetting is a limitation of memory, not a way of deciding (L4).",
        "Ignoring problems is the opposite of problem-solving and decision-making."
       ]
      },
      {
       "type": "mcq",
       "q": "What is the purpose of testing a prototype with real users?",
       "o": [
        "To avoid making improvements",
        "To check whether the design meets users' needs",
        "To increase development costs",
        "To replace all designers"
       ],
       "a": 1,
       "why": "In the interaction design lifecycle, evaluating a prototype with real users shows whether the design meets their needs and where it has to change. The process is iterative: design, prototype, evaluate, redesign. The Design Sprint's Test step does the same (L2).",
       "ow": [
        "Backwards: testing exists to find improvements for the next iteration (L2).",
        null,
        "Backwards: finding problems early on a cheap prototype saves cost later.",
        "Users give feedback; designers still make the design decisions."
       ]
      },
      {
       "type": "mcq",
       "q": "Which skill is mainly related to UX design?",
       "o": [
        "User research",
        "Visual design",
        "Color theory",
        "Layout and composition"
       ],
       "a": 0,
       "why": "Lecture 5's \"What skills do you need?\" table lists UX skills as user research, problem-solving, information architecture, user flows and journey maps, wireframing and usability testing (L5).",
       "ow": [
        null,
        "Visual design is a UI skill in the same table (L5).",
        "Color theory is a UI skill in the same table (L5).",
        "Layout and composition is a UI skill in the same table (L5)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which discipline focuses on human thinking and mental processes?",
       "o": [
        "Informatics",
        "Engineering",
        "Psychology / Cognitive Science",
        "Industrial Design"
       ],
       "a": 2,
       "why": "Lecture 1 lists the academic disciplines that contribute to interaction design. Psychology and cognitive science are the ones that study how people think: attention, perception, memory, learning and decision-making (L1; the processes themselves are L3).",
       "ow": [
        "Informatics is about information and how computing systems process it, not human thinking.",
        "Engineering is about building technical systems.",
        null,
        "Industrial design is a design practice about the form and use of physical products (L1)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following is a cognitive process?",
       "o": [
        "Attention",
        "Respiration",
        "Blood circulation",
        "Digestion"
       ],
       "a": 0,
       "why": "Lecture 3's cognitive processes: attention, perception, memory, learning, reading/speaking/listening, and problem-solving/planning/reasoning/decision-making. Attention is the first (L3, Cognitive processes).",
       "ow": [
        null,
        "Respiration is a body (physiological) process, not a mental one.",
        "Blood circulation is a body process, not a mental one.",
        "Digestion is a body process, not a mental one."
       ]
      },
      {
       "type": "mcq",
       "q": "Which component includes computer graphics?",
       "o": [
        "Interaction",
        "Human",
        "Cognitive psychology",
        "Computer"
       ],
       "a": 3,
       "why": "Lecture 1's pie chart, \"The three parts of HCI\", puts computer graphics, operating system and programming language under Computer (L1, The three parts of HCI).",
       "ow": [
        "Interaction holds only interaction design in the pie chart (L1).",
        "Human holds communication theory, industrial design, social science, cognitive psychology and human factors (L1).",
        "Cognitive psychology is not a component; it is one of the items under Human (L1).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Communication theory belongs to which component?",
       "o": [
        "Computer",
        "Human",
        "Interaction",
        "Programming"
       ],
       "a": 1,
       "key": "Answered from Lecture 1's pie chart, which lists communication theory under Human. Interaction is the tempting choice, but the chart puts only interaction design there.",
       "why": "Lecture 1's pie chart, \"The three parts of HCI\", lists communication theory under Human, with industrial design, social science, cognitive psychology and human factors (L1, The three parts of HCI).",
       "ow": [
        "Computer holds computer graphics, operating system and programming language (L1).",
        null,
        "The tempting choice, but in the pie chart Interaction holds only interaction design (L1).",
        "Programming is not a component; programming language is one of the items under Computer (L1)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following belongs to the Computer component?",
       "o": [
        "Communication theory",
        "Operating system",
        "Human factors",
        "Social science"
       ],
       "a": 1,
       "why": "Lecture 1's pie chart lists operating system under Computer, with computer graphics and programming language (L1, The three parts of HCI).",
       "ow": [
        "Communication theory is under Human in the pie chart (L1).",
        null,
        "Human factors is under Human (L1).",
        "Social science is under Human (L1)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which activity is most useful for discovering users' hidden needs?",
       "o": [
        "Guessing what users want",
        "Choosing colors randomly",
        "Interviewing and observing users",
        "Publishing the final product"
       ],
       "a": 2,
       "why": "Lecture 2 lists interviews and participant observations as primary research, research you conduct yourself with real users. Users rarely know what is possible, so watching them work shows problems they would never mention, and interviews let you ask why (L2, What are the users' needs?, Types by WHO).",
       "ow": [
        "Guessing is what user research replaces: designers' guesses are often wrong (L2).",
        "Choosing colors randomly is unplanned visual design and says nothing about users' needs.",
        null,
        "Too late: needs should be found before design starts, in foundational research (L2)."
       ]
      },
      {
       "type": "mcq",
       "q": "The study of HCI mainly focuses on:",
       "o": [
        "Improving computer hardware performance",
        "How computers interact with each other",
        "The relationship between humans and computers",
        "Writing more complex code"
       ],
       "a": 2,
       "why": "Lecture 1: HCI is the interaction between user and computer, or the relationship between users and computer systems. It studies humans, the technologies that improve their interaction with computers, and the ways, preferences and difficulties of users (L1, What is HCI?).",
       "ow": [
        "That is computer engineering; HCI is about people using systems, not raw speed (L1).",
        "That is networking or distributed systems, with no human involved.",
        null,
        "Not a goal of HCI; if anything, it aims for simpler, easier-to-use systems."
       ]
      },
      {
       "type": "mcq",
       "q": "What is the main purpose of limiting the number of menu options?",
       "o": [
        "To remove all choices",
        "To make navigation easier",
        "To make users confused",
        "To increase screen size"
       ],
       "a": 1,
       "why": "In Lecture 1's Office case, menus and toolbars were so full that people felt less in control; adaptive menus showed a short list of the commands people were likely to use. Fewer options are easier to scan and remember, which also ties to Miller's 7 ± 2 in L4 (L1, L4).",
       "ow": [
        "Limiting means showing fewer options, not none. Adaptive menus kept every command and showed the likely ones first (L1).",
        null,
        "The opposite: crowded menus cause confusion, and limiting them reduces it (L1).",
        "The number of menu items does not change the screen size; the reason is the user's limited memory and attention."
       ]
      },
      {
       "type": "mcq",
       "q": "Human Factors (HF) belongs to which category?",
       "o": [
        "Interdisciplinary Fields",
        "Design Practices",
        "Film Industry",
        "Academic Disciplines"
       ],
       "a": 0,
       "why": "Lecture 1's diagram of the fields around interaction design puts Human Factors (HF) among the Interdisciplinary Fields (two-way arrows with ID), with cognitive engineering, HCI, cognitive ergonomics, CSCW and information systems (L1).",
       "ow": [
        null,
        "Design Practices are graphic design, product design, artist-design, industrial design and film industry (L1).",
        "Film industry is one item under Design Practices, not a category (L1).",
        "The trap: HF draws on ergonomics, psychology and engineering, but the diagram places it with the interdisciplinary fields, not the academic disciplines (L1)."
       ]
      },
      {
       "type": "mcq",
       "q": "What is the main purpose of the Test stage?",
       "o": [
        "Generate ideas",
        "Create a business plan",
        "Select a team",
        "Get feedback from users"
       ],
       "a": 3,
       "why": "In the Google Design Sprint (Unpack → Sketch → Decide → Prototype → Test, then iterate), Test comes right after Prototype: the prototype goes in front of real users to get their feedback for the next round. Google's user-centered process ends the same way: \"Evaluate: test with real users\" (L2).",
       "ow": [
        "Generating ideas is the Sketch step (L2).",
        "A business plan is not a step in any of the lecture's lifecycle models.",
        "Selecting a team happens before the sprint, not in a stage of it.",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "A prototype receives negative feedback from users. What should the design team do?",
       "o": [
        "Stop the project permanently",
        "Release it without changes",
        "Ignore the feedback",
        "Improve the prototype based on feedback"
       ],
       "a": 3,
       "why": "Design is iterative: the Design Sprint goes Unpack → Sketch → Decide → Prototype → Test, then iterate, and Joyner's lifecycle (need finding, design alternatives, prototyping, evaluation) is also a loop. Negative feedback is what the next round uses to fix the design (L2).",
       "ow": [
        "Negative feedback on a prototype is normal; it is input for the next iteration, not a reason to cancel (L2).",
        "That skips the point of testing: you would ship something users already showed does not work for them.",
        "That goes against user-centered design, which takes users' needs into account at every step (L2).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following is an example of user-centered design?",
       "o": [
        "Designing according to users' needs and abilities",
        "Copying another company's product",
        "Designing without testing",
        "Designing according to the developer's personal preferences"
       ],
       "a": 0,
       "why": "Lecture 2 defines user-centered design as design that takes the user's needs into consideration at every step, and says the simple lifecycle model (requirements, alternatives, prototype, evaluate) exemplifies it (L2, User-centered design).",
       "ow": [
        null,
        "This starts from a competitor's product, not from your own users, whose needs may be different.",
        "User-centered design depends on evaluating with users; skipping testing never checks the design against them (L2).",
        "The opposite: it puts the developer, not the user, at the center."
       ]
      },
      {
       "type": "mcq",
       "q": "What is attention?",
       "o": [
        "Making decisions",
        "Storing information",
        "Forgetting information",
        "Focusing on specific information"
       ],
       "a": 3,
       "why": "Lecture 3: attention allows us to focus on information that is relevant to what we are doing (L3, Attention).",
       "ow": [
        "Making decisions is a different process, with problem-solving, planning and reasoning (L3, L4).",
        "Storing information is memory (L4).",
        "Forgetting is a memory failure, not attention (L4).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Choosing the correct answer in an exam involves:",
       "o": [
        "Decision-making",
        "Sleeping",
        "Respiration",
        "Digestion"
       ],
       "a": 0,
       "why": "The sixth cognitive process in Lecture 3 is problem-solving, planning, reasoning and decision-making. Choosing an answer means weighing the options and picking one, which L4 describes as reflective cognition (L3, L4).",
       "ow": [
        null,
        "Sleeping is a body state, not a cognitive process.",
        "Respiration is a body process, not a cognitive one.",
        "Digestion is a body process, not a cognitive one."
       ]
      },
      {
       "type": "mcq",
       "q": "Why should designers investigate a problem before creating a solution?",
       "o": [
        "To reduce the number of users",
        "To finish the project immediately",
        "To ensure they solve the correct problem",
        "To avoid testing"
       ],
       "a": 2,
       "why": "Lecture 2: users rarely know what is possible, so explore the problem space, investigate who the users are, and investigate user activities to see what can be improved. Otherwise you can build a good solution to the wrong problem. The sprint starts with Unpack and Joyner's cycle with need finding for the same reason (L2, What are the users' needs?).",
       "ow": [
        "Research is for understanding users, not cutting them down; many products are for \"everybody\" (L2).",
        "Investigating adds a step at the start; it saves rework later but does not finish anything immediately.",
        null,
        "Research does not replace testing; the cycle still ends with Test/Evaluate and iterates (L2)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following is NOT a cognitive process?",
       "o": [
        "Digestion",
        "Learning",
        "Attention",
        "Memory"
       ],
       "a": 0,
       "why": "Lecture 3's cognitive processes are attention, perception, memory, learning, reading/speaking/listening, and problem-solving/planning/reasoning/decision-making. Digestion is not on the list; it is a body process (L3, Cognitive processes).",
       "ow": [
        null,
        "Learning is a cognitive process, number 4 in the list (L3).",
        "Attention is a cognitive process, number 1 in the list (L3).",
        "Memory is a cognitive process, number 3 in the list (L3)."
       ]
      },
      {
       "type": "mcq",
       "q": "What is the primary goal of HCI?",
       "o": [
        "To make computers more complex",
        "To improve usability and user experience",
        "To make computers faster",
        "To increase software security"
       ],
       "a": 1,
       "why": "Lecture 1: today the success of a system requires user-centric design focused on usability and a pleasant, smooth user experience; HCI aims to develop usable products. Lecture 2 also says to focus on people's goals, usability and user experience goals (L1, UI vs UX vs HCI; L2).",
       "ow": [
        "The opposite: HCI makes systems easier to use; in the Office case, crowded menus made people feel less in control (L1).",
        null,
        "Machine efficiency was the focus of early systems, which ignored usability; HCI is about the user (L1, UI vs UX vs HCI).",
        "Security is a separate field, not HCI's primary goal."
       ]
      },
      {
       "type": "mcq",
       "q": "Reasoning involves:",
       "o": [
        "Running",
        "Sleeping",
        "Hearing",
        "Thinking logically"
       ],
       "a": 3,
       "why": "Reasoning is in the group problem-solving, planning, reasoning and decision-making, which involve reflective cognition: thinking about what to do, what the options are, and the consequences (L3, L4). The notes do not define reasoning on its own; \"thinking logically\" is its standard meaning.",
       "ow": [
        "Running is a physical activity, not a cognitive process.",
        "Sleeping is a body state; you do not reason while asleep.",
        "Hearing is perception through the senses: it takes information in, while reasoning works with it (L3).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following includes higher-level thinking skills?",
       "o": [
        "Running, walking and jumping",
        "Hearing, smelling and tasting",
        "Problem-solving, planning and reasoning",
        "Eating, drinking and sleeping"
       ],
       "a": 2,
       "why": "Lecture 4: problem-solving, planning, reasoning and decision-making all involve reflective cognition, thinking about what to do, what the options are, and the consequences. They are conscious processes, often using discussion and artifacts such as maps, books, pen and paper (L4).",
       "ow": [
        "Physical movement, not thinking.",
        "These are the senses, which belong to perception: taking information in, not higher-level thinking (L3).",
        null,
        "Basic body functions, not cognitive processes."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following follows the slide's recommendation?",
       "o": [
        "7 tabs on a website",
        "15 menu options",
        "20 bullets in a list",
        "12 toolbar icons"
       ],
       "a": 0,
       "key": "The slide is titled \"The problem with the classic 7 ± 2\" and poses the 7-items rule as discussion questions without answering them. The quiz treats 7 as the recommendation, so 7 tabs is the expected answer.",
       "why": "Miller's (1956) 7 ± 2: immediate memory is very limited, and this has been applied in interaction design when deciding how many options to display. The slide asks whether to place only 7 tabs on the top of a website page; only 7 is within 7 ± 2 (L4).",
       "ow": [
        null,
        "15 is far above 9, the top of 7 ± 2 (L4).",
        "The slide asks about no more than 7 bullets; 20 is almost three times that (L4).",
        "The slide asks about only 7 icons on a toolbar; 12 is above even 9 (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "A design team has several ideas but limited time and resources. What should it do?",
       "o": [
        "Ignore user requirements",
        "Select the most suitable ideas based on requirements",
        "Develop every idea",
        "Stop collecting information"
       ],
       "a": 1,
       "why": "Lecture 2, \"How to choose among alternatives\": judge ideas by technical feasibility, evaluation with users or peers (prototypes, not static documentation), and quality thresholds, where usability and user experience goals give the criteria. That is the sprint's Decide step (L2).",
       "ow": [
        "Requirements are the criteria for choosing; ignoring them leaves nothing to choose by (L2).",
        null,
        "Impossible with limited time and resources, and it skips choosing among alternatives (L2).",
        "Choosing well needs more information, such as evaluation with users or peers (L2)."
       ]
      },
      {
       "type": "mcq",
       "q": "What is the main goal of Google Design Sprints?",
       "o": [
        "To increase paperwork",
        "To avoid customer feedback",
        "To eliminate teamwork",
        "To develop and test solutions quickly"
       ],
       "a": 3,
       "key": "Lecture 2 gives the sprint's steps but not its goal. \"Quickly\" comes from Knapp et al.'s book, where a sprint takes five days.",
       "why": "Lecture 2's Google Design Sprint (Knapp et al., 2016) is a loop: Unpack → Sketch → Decide → Prototype → Test, then iterate. It goes from a problem to a tested prototype, and a sprint is short (five days in Knapp et al.) (L2).",
       "ow": [
        "The sprint moves from sketches straight to a prototype; L2 also says to use prototypes, not static documentation.",
        "The last step, Test, exists to get user feedback (L2).",
        "Sketching and deciding are team activities; nothing in the model removes teamwork.",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following represents the three main components of HCI?",
       "o": [
        "Design, Programming, Testing",
        "Hardware, Software, Network",
        "Human, Computer, Interaction",
        "Psychology, Science, Mathematics"
       ],
       "a": 2,
       "why": "Lecture 1's pie chart, \"The three parts of HCI\": Human (communication theory, industrial design, social science, cognitive psychology, human factors), Computer (computer graphics, operating system, programming language) and Interaction (interaction design) (L1).",
       "ow": [
        "Development activities; programming language is only one item under Computer (L1).",
        "Parts of a computer system; they leave out the human and the interaction (L1).",
        null,
        "Academic subjects; cognitive psychology is one item under Human, and mathematics is not in the chart (L1)."
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
    "q": "Which discipline focuses on human thinking and mental processes?",
    "o": [
     [
      "Informatics",
      "Informatics is about information and how computing systems process it, not human thinking."
     ],
     [
      "Engineering",
      "Engineering is about building technical systems."
     ],
     [
      "Psychology / Cognitive Science",
      "Correct. Lecture 1 lists the academic disciplines that contribute to interaction design. Psychology and cognitive science are the ones that study how people think: attention, perception, memory, learning and decision-making (L1; the processes themselves are L3)."
     ],
     [
      "Industrial Design",
      "Industrial design is a design practice about the form and use of physical products (L1)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which component includes computer graphics?",
    "o": [
     [
      "Interaction",
      "Interaction holds only interaction design in the pie chart (L1)."
     ],
     [
      "Human",
      "Human holds communication theory, industrial design, social science, cognitive psychology and human factors (L1)."
     ],
     [
      "Cognitive psychology",
      "Cognitive psychology is not a component; it is one of the items under Human (L1)."
     ],
     [
      "Computer",
      "Correct. Lecture 1's pie chart, \"The three parts of HCI\", puts computer graphics, operating system and programming language under Computer (L1, The three parts of HCI)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Communication theory belongs to which component?",
    "o": [
     [
      "Computer",
      "Computer holds computer graphics, operating system and programming language (L1)."
     ],
     [
      "Human",
      "Correct. Lecture 1's pie chart, \"The three parts of HCI\", lists communication theory under Human, with industrial design, social science, cognitive psychology and human factors (L1, The three parts of HCI)."
     ],
     [
      "Interaction",
      "The tempting choice, but in the pie chart Interaction holds only interaction design (L1)."
     ],
     [
      "Programming",
      "Programming is not a component; programming language is one of the items under Computer (L1)."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following belongs to the Computer component?",
    "o": [
     [
      "Communication theory",
      "Communication theory is under Human in the pie chart (L1)."
     ],
     [
      "Operating system",
      "Correct. Lecture 1's pie chart lists operating system under Computer, with computer graphics and programming language (L1, The three parts of HCI)."
     ],
     [
      "Human factors",
      "Human factors is under Human (L1)."
     ],
     [
      "Social science",
      "Social science is under Human (L1)."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "The study of HCI mainly focuses on:",
    "o": [
     [
      "Improving computer hardware performance",
      "That is computer engineering; HCI is about people using systems, not raw speed (L1)."
     ],
     [
      "How computers interact with each other",
      "That is networking or distributed systems, with no human involved."
     ],
     [
      "The relationship between humans and computers",
      "Correct. Lecture 1: HCI is the interaction between user and computer, or the relationship between users and computer systems. It studies humans, the technologies that improve their interaction with computers, and the ways, preferences and difficulties of users (L1, What is HCI?)."
     ],
     [
      "Writing more complex code",
      "Not a goal of HCI; if anything, it aims for simpler, easier-to-use systems."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "What is the main purpose of limiting the number of menu options?",
    "o": [
     [
      "To remove all choices",
      "Limiting means showing fewer options, not none. Adaptive menus kept every command and showed the likely ones first (L1)."
     ],
     [
      "To make navigation easier",
      "Correct. In Lecture 1's Office case, menus and toolbars were so full that people felt less in control; adaptive menus showed a short list of the commands people were likely to use. Fewer options are easier to scan and remember, which also ties to Miller's 7 ± 2 in L4 (L1, L4)."
     ],
     [
      "To make users confused",
      "The opposite: crowded menus cause confusion, and limiting them reduces it (L1)."
     ],
     [
      "To increase screen size",
      "The number of menu items does not change the screen size; the reason is the user's limited memory and attention."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Human Factors (HF) belongs to which category?",
    "o": [
     [
      "Interdisciplinary Fields",
      "Correct. Lecture 1's diagram of the fields around interaction design puts Human Factors (HF) among the Interdisciplinary Fields (two-way arrows with ID), with cognitive engineering, HCI, cognitive ergonomics, CSCW and information systems (L1)."
     ],
     [
      "Design Practices",
      "Design Practices are graphic design, product design, artist-design, industrial design and film industry (L1)."
     ],
     [
      "Film Industry",
      "Film industry is one item under Design Practices, not a category (L1)."
     ],
     [
      "Academic Disciplines",
      "The trap: HF draws on ergonomics, psychology and engineering, but the diagram places it with the interdisciplinary fields, not the academic disciplines (L1)."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "What is the primary goal of HCI?",
    "o": [
     [
      "To make computers more complex",
      "The opposite: HCI makes systems easier to use; in the Office case, crowded menus made people feel less in control (L1)."
     ],
     [
      "To improve usability and user experience",
      "Correct. Lecture 1: today the success of a system requires user-centric design focused on usability and a pleasant, smooth user experience; HCI aims to develop usable products. Lecture 2 also says to focus on people's goals, usability and user experience goals (L1, UI vs UX vs HCI; L2)."
     ],
     [
      "To make computers faster",
      "Machine efficiency was the focus of early systems, which ignored usability; HCI is about the user (L1, UI vs UX vs HCI)."
     ],
     [
      "To increase software security",
      "Security is a separate field, not HCI's primary goal."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following represents the three main components of HCI?",
    "o": [
     [
      "Design, Programming, Testing",
      "Development activities; programming language is only one item under Computer (L1)."
     ],
     [
      "Hardware, Software, Network",
      "Parts of a computer system; they leave out the human and the interaction (L1)."
     ],
     [
      "Human, Computer, Interaction",
      "Correct. Lecture 1's pie chart, \"The three parts of HCI\": Human (communication theory, industrial design, social science, cognitive psychology, human factors), Computer (computer graphics, operating system, programming language) and Interaction (interaction design) (L1)."
     ],
     [
      "Psychology, Science, Mathematics",
      "Academic subjects; cognitive psychology is one item under Human, and mathematics is not in the chart (L1)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   }
  ],
  "2": [
   {
    "q": "What is the main purpose of the Decide stage?",
    "o": [
     [
      "Test the product",
      "Testing is the fifth step, Test (L2)."
     ],
     [
      "Select the best idea",
      "Correct. Google Design Sprint (Knapp et al., 2016): Unpack → Sketch → Decide → Prototype → Test, then iterate. In Decide the team picks the best of the ideas sketched in the step before, and that is the one it prototypes next (L2, Google Design Sprints)."
     ],
     [
      "Build the prototype",
      "Building the prototype is the fourth step, Prototype, which comes after Decide (L2)."
     ],
     [
      "Understand the market",
      "Understanding the problem and the users belongs to the first step, Unpack (L2)."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "What is the purpose of testing a prototype with real users?",
    "o": [
     [
      "To avoid making improvements",
      "Backwards: testing exists to find improvements for the next iteration (L2)."
     ],
     [
      "To check whether the design meets users' needs",
      "Correct. In the interaction design lifecycle, evaluating a prototype with real users shows whether the design meets their needs and where it has to change. The process is iterative: design, prototype, evaluate, redesign. The Design Sprint's Test step does the same (L2)."
     ],
     [
      "To increase development costs",
      "Backwards: finding problems early on a cheap prototype saves cost later."
     ],
     [
      "To replace all designers",
      "Users give feedback; designers still make the design decisions."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which activity is most useful for discovering users' hidden needs?",
    "o": [
     [
      "Guessing what users want",
      "Guessing is what user research replaces: designers' guesses are often wrong (L2)."
     ],
     [
      "Choosing colors randomly",
      "Choosing colors randomly is unplanned visual design and says nothing about users' needs."
     ],
     [
      "Interviewing and observing users",
      "Correct. Lecture 2 lists interviews and participant observations as primary research, research you conduct yourself with real users. Users rarely know what is possible, so watching them work shows problems they would never mention, and interviews let you ask why (L2, What are the users' needs?, Types by WHO)."
     ],
     [
      "Publishing the final product",
      "Too late: needs should be found before design starts, in foundational research (L2)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "What is the main purpose of the Test stage?",
    "o": [
     [
      "Generate ideas",
      "Generating ideas is the Sketch step (L2)."
     ],
     [
      "Create a business plan",
      "A business plan is not a step in any of the lecture's lifecycle models."
     ],
     [
      "Select a team",
      "Selecting a team happens before the sprint, not in a stage of it."
     ],
     [
      "Get feedback from users",
      "Correct. In the Google Design Sprint (Unpack → Sketch → Decide → Prototype → Test, then iterate), Test comes right after Prototype: the prototype goes in front of real users to get their feedback for the next round. Google's user-centered process ends the same way: \"Evaluate: test with real users\" (L2)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "A prototype receives negative feedback from users. What should the design team do?",
    "o": [
     [
      "Stop the project permanently",
      "Negative feedback on a prototype is normal; it is input for the next iteration, not a reason to cancel (L2)."
     ],
     [
      "Release it without changes",
      "That skips the point of testing: you would ship something users already showed does not work for them."
     ],
     [
      "Ignore the feedback",
      "That goes against user-centered design, which takes users' needs into account at every step (L2)."
     ],
     [
      "Improve the prototype based on feedback",
      "Correct. Design is iterative: the Design Sprint goes Unpack → Sketch → Decide → Prototype → Test, then iterate, and Joyner's lifecycle (need finding, design alternatives, prototyping, evaluation) is also a loop. Negative feedback is what the next round uses to fix the design (L2)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following is an example of user-centered design?",
    "o": [
     [
      "Designing according to users' needs and abilities",
      "Correct. Lecture 2 defines user-centered design as design that takes the user's needs into consideration at every step, and says the simple lifecycle model (requirements, alternatives, prototype, evaluate) exemplifies it (L2, User-centered design)."
     ],
     [
      "Copying another company's product",
      "This starts from a competitor's product, not from your own users, whose needs may be different."
     ],
     [
      "Designing without testing",
      "User-centered design depends on evaluating with users; skipping testing never checks the design against them (L2)."
     ],
     [
      "Designing according to the developer's personal preferences",
      "The opposite: it puts the developer, not the user, at the center."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Why should designers investigate a problem before creating a solution?",
    "o": [
     [
      "To reduce the number of users",
      "Research is for understanding users, not cutting them down; many products are for \"everybody\" (L2)."
     ],
     [
      "To finish the project immediately",
      "Investigating adds a step at the start; it saves rework later but does not finish anything immediately."
     ],
     [
      "To ensure they solve the correct problem",
      "Correct. Lecture 2: users rarely know what is possible, so explore the problem space, investigate who the users are, and investigate user activities to see what can be improved. Otherwise you can build a good solution to the wrong problem. The sprint starts with Unpack and Joyner's cycle with need finding for the same reason (L2, What are the users' needs?)."
     ],
     [
      "To avoid testing",
      "Research does not replace testing; the cycle still ends with Test/Evaluate and iterates (L2)."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "A design team has several ideas but limited time and resources. What should it do?",
    "o": [
     [
      "Ignore user requirements",
      "Requirements are the criteria for choosing; ignoring them leaves nothing to choose by (L2)."
     ],
     [
      "Select the most suitable ideas based on requirements",
      "Correct. Lecture 2, \"How to choose among alternatives\": judge ideas by technical feasibility, evaluation with users or peers (prototypes, not static documentation), and quality thresholds, where usability and user experience goals give the criteria. That is the sprint's Decide step (L2)."
     ],
     [
      "Develop every idea",
      "Impossible with limited time and resources, and it skips choosing among alternatives (L2)."
     ],
     [
      "Stop collecting information",
      "Choosing well needs more information, such as evaluation with users or peers (L2)."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "What is the main goal of Google Design Sprints?",
    "o": [
     [
      "To increase paperwork",
      "The sprint moves from sketches straight to a prototype; L2 also says to use prototypes, not static documentation."
     ],
     [
      "To avoid customer feedback",
      "The last step, Test, exists to get user feedback (L2)."
     ],
     [
      "To eliminate teamwork",
      "Sketching and deciding are team activities; nothing in the model removes teamwork."
     ],
     [
      "To develop and test solutions quickly",
      "Correct. Lecture 2's Google Design Sprint (Knapp et al., 2016) is a loop: Unpack → Sketch → Decide → Prototype → Test, then iterate. It goes from a problem to a tested prototype, and a sprint is short (five days in Knapp et al.) (L2)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   }
  ],
  "3": [
   {
    "q": "Recognizing a familiar face is an example of:",
    "o": [
     [
      "Planning",
      "Planning is reflective cognition: thinking about what to do and the consequences (L4). Recognizing a face is fast and automatic."
     ],
     [
      "Problem-solving",
      "Problem-solving is reflective cognition too (L4). There is no problem to solve when you recognize a face."
     ],
     [
      "Perception",
      "Correct. Perception is how information is acquired from the world and transformed into experiences (L3). Seeing a face and recognizing it as someone you know starts there. L4 also uses this example for memory, but memory is not an option here."
     ],
     [
      "Decision-making",
      "Decision-making means choosing between options (L4). Recognizing a face involves no choice."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following is a cognitive process?",
    "o": [
     [
      "Attention",
      "Correct. Lecture 3's cognitive processes: attention, perception, memory, learning, reading/speaking/listening, and problem-solving/planning/reasoning/decision-making. Attention is the first (L3, Cognitive processes)."
     ],
     [
      "Respiration",
      "Respiration is a body (physiological) process, not a mental one."
     ],
     [
      "Blood circulation",
      "Blood circulation is a body process, not a mental one."
     ],
     [
      "Digestion",
      "Digestion is a body process, not a mental one."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "What is attention?",
    "o": [
     [
      "Making decisions",
      "Making decisions is a different process, with problem-solving, planning and reasoning (L3, L4)."
     ],
     [
      "Storing information",
      "Storing information is memory (L4)."
     ],
     [
      "Forgetting information",
      "Forgetting is a memory failure, not attention (L4)."
     ],
     [
      "Focusing on specific information",
      "Correct. Lecture 3: attention allows us to focus on information that is relevant to what we are doing (L3, Attention)."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Choosing the correct answer in an exam involves:",
    "o": [
     [
      "Decision-making",
      "Correct. The sixth cognitive process in Lecture 3 is problem-solving, planning, reasoning and decision-making. Choosing an answer means weighing the options and picking one, which L4 describes as reflective cognition (L3, L4)."
     ],
     [
      "Sleeping",
      "Sleeping is a body state, not a cognitive process."
     ],
     [
      "Respiration",
      "Respiration is a body process, not a cognitive one."
     ],
     [
      "Digestion",
      "Digestion is a body process, not a cognitive one."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following is NOT a cognitive process?",
    "o": [
     [
      "Digestion",
      "Correct. Lecture 3's cognitive processes are attention, perception, memory, learning, reading/speaking/listening, and problem-solving/planning/reasoning/decision-making. Digestion is not on the list; it is a body process (L3, Cognitive processes)."
     ],
     [
      "Learning",
      "Learning is a cognitive process, number 4 in the list (L3)."
     ],
     [
      "Attention",
      "Attention is a cognitive process, number 1 in the list (L3)."
     ],
     [
      "Memory",
      "Memory is a cognitive process, number 3 in the list (L3)."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   }
  ],
  "4": [
   {
    "q": "Decision-making means:",
    "o": [
     [
      "Memorizing words",
      "Memorizing words is memory and learning, separate cognitive processes (L3, L4)."
     ],
     [
      "Choosing between different options",
      "Correct. Decision-making is in the reflective-cognition group with problem-solving, planning and reasoning: thinking about what to do, what the options are, and the consequences, then choosing one (L4, Problem-solving, planning, reasoning, and decision-making)."
     ],
     [
      "Forgetting information",
      "Forgetting is a limitation of memory, not a way of deciding (L4)."
     ],
     [
      "Ignoring problems",
      "Ignoring problems is the opposite of problem-solving and decision-making."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Reasoning involves:",
    "o": [
     [
      "Running",
      "Running is a physical activity, not a cognitive process."
     ],
     [
      "Sleeping",
      "Sleeping is a body state; you do not reason while asleep."
     ],
     [
      "Hearing",
      "Hearing is perception through the senses: it takes information in, while reasoning works with it (L3)."
     ],
     [
      "Thinking logically",
      "Correct. Reasoning is in the group problem-solving, planning, reasoning and decision-making, which involve reflective cognition: thinking about what to do, what the options are, and the consequences (L3, L4). The notes do not define reasoning on its own; \"thinking logically\" is its standard meaning."
     ]
    ],
    "a": 3,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following includes higher-level thinking skills?",
    "o": [
     [
      "Running, walking and jumping",
      "Physical movement, not thinking."
     ],
     [
      "Hearing, smelling and tasting",
      "These are the senses, which belong to perception: taking information in, not higher-level thinking (L3)."
     ],
     [
      "Problem-solving, planning and reasoning",
      "Correct. Lecture 4: problem-solving, planning, reasoning and decision-making all involve reflective cognition, thinking about what to do, what the options are, and the consequences. They are conscious processes, often using discussion and artifacts such as maps, books, pen and paper (L4)."
     ],
     [
      "Eating, drinking and sleeping",
      "Basic body functions, not cognitive processes."
     ]
    ],
    "a": 2,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which of the following follows the slide's recommendation?",
    "o": [
     [
      "7 tabs on a website",
      "Correct. Miller's (1956) 7 ± 2: immediate memory is very limited, and this has been applied in interaction design when deciding how many options to display. The slide asks whether to place only 7 tabs on the top of a website page; only 7 is within 7 ± 2 (L4)."
     ],
     [
      "15 menu options",
      "15 is far above 9, the top of 7 ± 2 (L4)."
     ],
     [
      "20 bullets in a list",
      "The slide asks about no more than 7 bullets; 20 is almost three times that (L4)."
     ],
     [
      "12 toolbar icons",
      "The slide asks about only 7 icons on a toolbar; 12 is above even 9 (L4)."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   }
  ],
  "5": [
   {
    "q": "Which of the following is NOT a key factor in HCI?",
    "o": [
     [
      "Machine learning",
      "Correct. HCI is built around designing interactive products people can use: usability (L1), the user interface and the user experience (L5, UI vs UX). Machine learning is a separate field of computer science; a product may use it, but it is not a key factor of HCI."
     ],
     [
      "User interface (UI)",
      "UI is a core HCI factor: the look, feel and interactivity of a screen (L5, UI vs UX)."
     ],
     [
      "User experience (UX)",
      "UX is a core HCI factor: the user's overall experience with the product (L5, UI vs UX)."
     ],
     [
      "Usability",
      "Usability is a core HCI factor: easy to learn, effective to use, and an enjoyable experience (L1)."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   },
   {
    "q": "Which skill is mainly related to UX design?",
    "o": [
     [
      "User research",
      "Correct. Lecture 5's \"What skills do you need?\" table lists UX skills as user research, problem-solving, information architecture, user flows and journey maps, wireframing and usability testing (L5)."
     ],
     [
      "Visual design",
      "Visual design is a UI skill in the same table (L5)."
     ],
     [
      "Color theory",
      "Color theory is a UI skill in the same table (L5)."
     ],
     [
      "Layout and composition",
      "Layout and composition is a UI skill in the same table (L5)."
     ]
    ],
    "a": 0,
    "src": "Midterm 2026/27"
   }
  ],
  "6": [
   {
    "q": "What is the best way to ensure a survey collects accurate user feedback in HCI?",
    "o": [
     [
      "Only ask open-ended questions",
      "The lecture says to leave potentially open-ended questions open, not to make every question open. It also recommends ranges and levels of agreement (L6, Be Expressive, Be Unbiased)."
     ],
     [
      "Use clear and unbiased wording in questions",
      "Correct. Lecture 6 gives six principles for good survey questions: Clear, Concise, Specific, Expressive, Unbiased, Usable. Clear and unbiased wording is two of them: label scales, no overlapping ranges, and no leading questions (L6, Six principles)."
     ],
     [
      "Make all questions mandatory",
      "Making questions mandatory is not one of the six principles. Forcing answers makes people quit or guess (general survey practice, not in the slides)."
     ],
     [
      "Ask technical questions that users may not understand",
      "This breaks Be Concise: ask questions in plain language. Questions users do not understand give inaccurate answers (L6, Be Concise)."
     ]
    ],
    "a": 1,
    "src": "Midterm 2026/27"
   }
  ]
 }
};

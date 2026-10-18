// Human Computer Interaction (CS314, Dr. Mona Samir Lackousha).
// Lectures 1–4 follow this term's slides; last year's slides that are not in this term's are kept inside them as sections marked ly (shown as "Last year's slides").
// Lectures 5–10 are last year's lectures 4–9, not yet replaced by this term's.
window.COURSES = window.COURSES || {};
COURSES.hci = {
 "id": "hci",
 "name": "Human Computer Interaction",
 "short": "HCI",
 "code": "CS314",
 "by": "Dr. Mona Samir Lackousha",
 "lectures": [
  {
   "n": 1,
   "title": "Introduction to HCI and Interaction Design",
   "notes": [
    {
     "h": "What you will learn in this course",
     "pts": [
      "What we need to know in order to design computerized systems whose users can get the <b>maximum benefit</b> from the system <b>with ease</b>.",
      "HCI involves the study of <b>humans</b> (needs, abilities, limitations, ...).",
      "It involves the study of <b>computer technologies</b> that can enhance the interaction between users and computers.",
      "It involves the study of the <b>ways, preferences and difficulties faced by users</b> of current or past systems.",
      "You may have a sense of some of the material since you are humans, technology users, and computer students."
     ]
    },
    {
     "h": "What is HCI?",
     "pts": [
      "<b>HCI</b>: the interaction between user and computer, OR the relationship between users and computer systems.",
      "Picture: a user and a computer joined by a two-way arrow labelled \"Interaction\".",
      "<b>Human Computer Interaction (HCI)</b> is a <b>multidisciplinary field of study</b> focusing on the design of computer technology and, in particular, the interaction between humans (the users) and computers.",
      "While initially concerned with computers, HCI has since expanded to cover <b>almost all forms of information technology design</b>."
     ]
    },
    {
     "h": "The three parts of HCI (pie chart)",
     "pts": [
      "Pie chart with three parts: Human, Computer and Interaction.",
      "<b>Human</b>: Communication theory, Industrial design, Social science, Cognitive psychology, Human factors.",
      "<b>Computer</b>: Computer graphic, Operating system, Programming language.",
      "<b>Interaction</b>: Interaction design."
     ],
     "fig": "hci-parts"
    },
    {
     "h": "What is HCI? More from last year's slides",
     "ly": 1,
     "pts": [
      "Terms used interchangeably: <b>HCI</b> (Human Computer Interaction), <b>HMI</b> (Human Machine Interaction), <b>MMI</b> (Man Machine Interaction).",
      "HCI deals with the <b>Design</b>, <b>Implementation</b> and <b>Evaluation</b> of interactive systems.",
      "Three parts meet in HCI: the <b>User</b> (mental and physical capabilities), the <b>Computer / Machine</b> (input/output devices) and the <b>Interaction</b> (interfaces, HCI patterns, design, usability evaluation)."
     ]
    },
    {
     "h": "What is interaction design?",
     "pts": [
      "\"Designing interactive products to support the way people communicate and interact in their everyday and working lives.\" <b>Sharp, Rogers, and Preece (2019)</b>",
      "\"The design of spaces for human communication and interaction.\" <b>Winograd (1997)</b>"
     ]
    },
    {
     "h": "Goals of interaction design",
     "pts": [
      "<b>Develop usable products</b>: usability means <b>easy to learn, effective to use, and provides an enjoyable experience</b>.",
      "<b>Involve users in the design process</b>."
     ]
    },
    {
     "h": "Objectives of HCI",
     "ly": 1,
     "pts": [
      "Design for <b>people</b>, for <b>tasks</b>, and for the <b>environments</b> users live and work in (e.g. an organization).",
      "Make interaction easier: design <b>easy, natural and intuitive</b> systems to <b>save time</b> and <b>reduce costs</b>.",
      "Design GUIs (learning them, using them efficiently, evaluating and comparing them) and web interfaces.",
      "Explore new paradigms/prototypes of interaction and develop models and theories of interaction."
     ]
    },
    {
     "h": "Invisible Interface (Idle Concept)",
     "pts": [
      "We are interested in making the interface <b>as invisible as possible</b> so the users spend little time focusing on the interface and instead focus on the <b>task</b> they are trying to accomplish.",
      "Our goal as designers is to help the humans feel they are <b>interacting directly with the task</b> while our interface vanishes in the middle of that interaction.",
      "The user should <b>think about the task rather than thinking about the tool</b>.",
      "Diagram: USER on the left, TASK (a clipboard with a check mark) on the right, and arrows going both ways between them passing through the INTERFACE (a computer screen) in the middle."
     ],
     "fig": "invisible-interface"
    },
    {
     "h": "Human-Task interaction and the invisible interface",
     "ly": 1,
     "pts": [
      "The user is really trying to achieve a <b>task</b> (buy online, watch a video, translate text). The system is only the means, so in reality the user interacts with the task.",
      "Example: in an online Zoom lecture, the instructor interacts with students, not with the computer.",
      "Like a sports referee, an interface is successful when it goes <b>unnoticed</b>."
     ]
    },
    {
     "h": "Example of bad and good design: elevator controls",
     "pts": [
      "Elevator controls and labels on the <b>bottom row all look the same</b>, so it is easy to push a label by mistake instead of a control button.",
      "Picture (www.baddesigns.com): top row shows floor numbers 1, 2, 3 each next to a button; bottom row shows DOOR OPEN, a button, an X, STOP/RUN, a bell, a button, DOOR CLOSE and a button, where labels and buttons are the same square tiles; a red arrow points at a label on the bottom row.",
      "People do not make the same mistake for the labels and buttons on the <b>top row</b>. Why not? (question for discussion; the slide gives no answer)"
     ],
     "fig": "elevator"
    },
    {
     "h": "Why is this vending machine so bad?",
     "pts": [
      "You <b>need to push a button first to activate the reader</b>.",
      "<b>Normally</b> you insert the bill first before making a selection.",
      "So the machine <b>contravenes a well known convention</b>.",
      "Picture: the machine's labels read \"STEP 1 PUSH ANY BUTTON TO START UNIT\", \"STEP 2 FOLLOW DIRECTIONS ON DISPLAY\" and \"STEP 3 TAKE RECEIPT PLACE ON DASH\"; an arrow points to the bill slot.",
      "Picture: a 'REQUIRED' sign with opening hours (7:00 a.m. - 10:00 p.m.); an arrow points to the bill slot, which is separate from the STEP 1 'PUSH ANY BUTTON TO START UNIT' label."
     ],
     "fig": "vending"
    },
    {
     "h": "Good design: marble answering machine",
     "pts": [
      "<b>Marble answering machine (Bishop, 1995)</b>. Picture: a hand picking up a marble from a tray where marbles roll down a track.",
      "Based on <b>how everyday objects behave</b>.",
      "<b>Easy, intuitive, and a pleasure to use</b>.",
      "Only requires <b>one-step actions</b> to perform core tasks."
     ]
    },
    {
     "h": "Good and bad design: TiVo remote",
     "pts": [
      "Why is the <b>TiVo remote</b> much better designed than standard remote controls?",
      "<b>Peanut shaped</b> to fit in hand.",
      "<b>Logical layout</b> and <b>color-coded, distinctive buttons</b>.",
      "<b>Easy-to-locate buttons</b>."
     ]
    },
    {
     "h": "Dilemma: interacting with a smart TV",
     "pts": [
      "Which is the best way to interact with a smart TV? Why? (question for discussion; the slide gives no answer)",
      "1) <b>Pecking</b> using a grid keyboard via a remote control.",
      "2) <b>Swiping</b> across two alphanumeric rows using a touchpad on a remote control.",
      "3) <b>Voice control</b> using a remote or smart speaker.",
      "Pictures: a TV search screen with a grid keyboard of letters and numbers (with Space, Delete and Clear), and an Apple ID Sign In screen with one row of letters a to z and one row of numbers and symbols (.com, .net, .edu)."
     ]
    },
    {
     "h": "User research is important: Qualcomm device for truckers",
     "pts": [
      "<b>Qualcomm device for truckers</b>.",
      "The early version had <b>small buttons</b>.",
      "User interface discovered surprising findings (slide wording; the slide's heading is 'User Research is important', so this means the user research found): truckers often have <b>big hands</b> and often <b>wear gloves</b>.",
      "Better design: a <b>large touch screen</b> and a <b>stylus pen</b>.",
      "Picture: a trucker using the device mounted beside the steering wheel."
     ],
     "fig": "truckers"
    },
    {
     "h": "UI design process (3 components)",
     "ly": 1,
     "pts": [
      "User research means learning about the <b>users</b> (skills, distractions, special needs like kids, elderly, people with disabilities), the <b>tasks</b> they try to complete, and <b>previous research</b> on human capabilities, limitations and perception.",
      "Software development is research: it is not just creating software but also <b>learning how to create the software best suited for its purpose</b> (one of the 12 characteristics studied in Software Engineering)."
     ]
    },
    {
     "h": "The challenge of full-featured systems (MS Office)",
     "ly": 1,
     "pts": [
      "Full-featured productivity apps include many features to meet all possible needs.",
      "More features lead to: the app feels complicated, things are harder to find or learn, and there is more focus on the tool than the task.",
      "<b>Bloatware</b>: a product with too many features, too many megabytes, too slow, too difficult to use, or simply too much.",
      "Office 97–2003: press called it \"bloated\"; a miles-long list of feature requests; people felt less in control; menus and toolbars were full and not scalable; people did not notice or use new features."
     ]
    },
    {
     "h": "Office 2000 mechanisms (and why they failed)",
     "ly": 1,
     "pts": [
      "<b>Adaptive (personalized) menus</b>: a top-level menu shows a short list of the most likely used commands; a <b>chevron</b> at the end expands the full menu.",
      "<b>Rafted toolbars</b>: two or more toolbars share one line; an algorithm predicts the least-used buttons and moves them to an <b>overflow</b> area.",
      "Why they failed: customization was not easy or accurate. Wrong short menus forced an extra scan of the full menu, so <b>scanning took twice as long</b>. They were later turned off by default.",
      "Rule: <b>\"Auto-customization, unless it does a perfect job, is usually worse than no customization at all.\"</b>"
     ]
    },
    {
     "h": "From guesswork to data",
     "ly": 1,
     "pts": [
      "Before 2003, decisions were mostly <b>guesswork</b>: \"based on feel, estimation, and guess work\".",
      "Office 2003 introduced the <b>CEIP</b> (Customer Experience Improvement Program): a balloon \"Help make Office better\" enrols users and collects <b>anonymous</b> usage and hardware data.",
      "For Office 2007 the team had <b>1.3+ billion sessions</b> of data. They got so much Word and Outlook data that <b>70% was thrown away</b>.",
      "They learned which commands are used often, which are used in sequence, which are used <b>7x more with the keyboard</b> than the mouse, how many documents people open at once, and how big screens are."
     ]
    },
    {
     "h": "Example case: online book library search",
     "pts": [
      "Designing the search feature for an online book library.",
      "First mock-up: [header and menus] on top; a row with [Search box], a [by Title] drop-down and a [Go] button; then four book boxes ([Book 1], [Book 2], [Book 3], [Book 3]).",
      "Second mock-up: the same layout in bright colors (yellow header, blue search box, green drop-down, orange Go button), three books, and a cartoon smiley face with a speech bubble saying \"Reading Rox\".",
      "<b>Bad design</b>: the <b>user research component is almost absent</b>."
     ]
    },
    {
     "h": "Example case: International Children's Digital Library (ICDL)",
     "pts": [
      "<b>HCIL</b> designed the <b>international children digital library</b>.",
      "Home page screenshot (University of Maryland): \"International Children's Digital Library, A Library for the World's Children\"; The Foundation links (Mission, Board of Advisors, Foundation Team, Sponsors, For Researchers & Librarians); a partnership with the University of Maryland's Human-Computer Interaction Lab, supported by UMD's iSchool and Computer Science Department; a READ BOOKS! button; book lists by language, color, shape, format, genre (different kinds), character, and true vs. make believe; Our Mission: the ICDL Foundation promotes tolerance and respect for diverse cultures by providing access to the best of children's literature from around the world.",
      "Simple Search page screenshot: big picture buttons to search by cover color (Rainbow, Red, Orange, Yellow, Green, Blue Covers), by age (Three to Five, Six to Nine, Ten to Thirteen), Make Believe Books, True Books, Short/Medium/Long Books, Recently Added Books, Award Winning Books, Fairy Tales and Folk Tales, Kid Characters, Real Animal Characters, Imaginary Creature Characters, Picture Books, Chapter Books, plus a Keywords search box.",
      "The ICDL search page is a <b>good design</b>: <b>more than 3 million unique visitors</b>, and the <b>visual search</b> was preferred by users (<b>71% of searches</b>).",
      "Other labels on the ICDL home page screenshot: a <b>Book list</b> link and <b>Library News and Notes (June 2, 2021)</b>.",
      "The Simple Search page screenshot also shows <b>Featured Books</b> and <b>From Our Shelves</b> rows, a <b>Show Any Language books</b> filter, <b>More Choices</b>, <b>Search By Collections</b> and <b>Browse Exhibitions</b>."
     ]
    },
    {
     "h": "Case studies",
     "ly": 1,
     "pts": [
      "Lessons: a good designer understands issues from the <b>user's point of view</b> and <b>works with users rather than guessing</b>."
     ]
    },
    {
     "h": "Bad user experience: the doctor's office form",
     "pts": [
      "How can the following bad user experience be avoided through a better design? (question for discussion; the slide gives no answer)",
      "Someone spent <b>at least 30 minutes</b> filling out a <b>doctor's office form</b> which asked for the address, phone number, email address and social security number an <b>average of 3 times</b> for <b>at least 10 different people and organizations</b> (my son, the patient, me, my wife, his doctors, dentists, pharmacies, insurance companies, emergency contact information and responsible parties ...).",
      "After completing and submitting, they received this message: <b>\"Internal server error\"</b> (shown with a sad face)."
     ]
    },
    {
     "h": "Design considerations",
     "pts": [
      "Need to take into account: <b>who the users are</b>, <b>what activities are being carried out</b>, and <b>where interaction is taking place</b>.",
      "Need to <b>optimize the interactions</b> users have with a product, so that they <b>match the users' activities and needs</b>."
     ]
    },
    {
     "h": "Which kind of design?",
     "pts": [
      "A number of other terms are used emphasizing what is being designed, for example: <b>user interface design, software design, user-centered design, product design, web design, experience design (UX)</b>.",
      "<b>Interaction design is the umbrella term</b> covering all of these aspects.",
      "It is <b>fundamental to all disciplines, fields, and approaches</b> concerned with researching and designing computer-based systems for people."
     ]
    },
    {
     "h": "UI vs UX vs HCI",
     "ly": 1,
     "pts": [
      "<b>UI Design</b> (User Interface): the <b>interactivity, look and feel</b> of a product screen or web page. It is about designing things nicely for a screen.",
      "<b>UX Design</b> (User Experience): the user's <b>overall experience</b> with the product or website. UX is about <b>dictating</b> the interactions.",
      "<b>HCI</b> is largely about <b>understanding</b> the interactions between humans and computers.",
      "Early systems ran on expensive machines, so engineers focused on efficient software and ignored usability. Today success requires <b>user-centric</b> design focused on usability and a pleasant, smooth experience."
     ]
    },
    {
     "h": "Interaction design and other fields (diagram)",
     "pts": [
      "Diagram: a circle labelled Interaction Design in the center, with three groups around it.",
      "<b>Academic Disciplines</b> (arrows pointing into ID): Ergonomics, Psychology/Cognitive Science, Informatics, Engineering, Computer Science/Software Engineering, Social Sciences (e.g. Sociology, Anthropology).",
      "<b>Design Practices</b> (arrows pointing into ID): Graphic Design, Product Design, Artist-Design, Industrial Design, Film Industry.",
      "<b>Interdisciplinary Fields</b> (two-way arrows with ID): Human Factors (HF), Cognitive Engineering, Human-Computer Interaction (HCI), Cognitive Ergonomics, Computer-Supported Cooperative Work (CSCW), Information Systems."
     ],
     "fig": "id-umbrella"
    },
    {
     "h": "Relationship between ID, HCI and other fields",
     "table": [
      [
       "Academic disciplines",
       "Design practices"
      ],
      [
       "Psychology",
       "Graphic design"
      ],
      [
       "Social Sciences",
       "Product design"
      ],
      [
       "Computing Sciences",
       "Artist-design"
      ],
      [
       "Engineering",
       "Industrial design"
      ],
      [
       "Ergonomics",
       "Film industry"
      ],
      [
       "Informatics",
       ""
      ]
     ],
     "pts": [
      "<b>Academic disciplines contributing to ID</b>: Psychology, Social Sciences, Computing Sciences, Engineering, Ergonomics, Informatics.",
      "<b>Design practices contributing to ID</b>: Graphic design, Product design, Artist-design, Industrial design, Film industry."
     ]
    },
    {
     "h": "HCI in a broader hierarchy of fields",
     "ly": 1,
     "pts": [
      "<b>Engineering + Psychology → Human Factors Engineering</b>: designing interactions between people and products, systems or devices.",
      "Human Factors Engineering branches into <b>Industrial Design</b>, <b>HCI</b> and <b>Product Design</b>.",
      "HCI then branches into <b>UI Design</b>, <b>UX Design</b> and <b>Interaction</b> design.",
      "Human-limit example: humans can distinguish <b>millions of colors</b> but only about <b>30 shades of gray</b>.",
      "The gap between HCI and human factors engineering is shrinking because more devices are becoming computerized."
     ]
    }
   ],
   "cards": [
    [
     "HCI (definition)",
     "The interaction between user and computer, or the relationship between users and computer systems."
    ],
    [
     "Terms used interchangeably with HCI",
     "HMI (Human Machine Interaction) and MMI (Man Machine Interaction)."
    ],
    [
     "HCI deals with…",
     "Design, implementation and evaluation of interactive systems."
    ],
    [
     "UI Design",
     "Interactivity, look and feel of a product screen or web page."
    ],
    [
     "UX Design",
     "A user's overall experience with the product or website."
    ],
    [
     "Human Factors Engineering",
     "Designing interactions between people and products, systems or devices (Engineering + Psychology)."
    ],
    [
     "Shades of gray humans can distinguish",
     "About 30 (versus millions of colors)."
    ],
    [
     "Invisible interface",
     "An interface that vanishes so users focus on the task, not the tool."
    ],
    [
     "3 components of the UI design process",
     "User research → Design and prototyping → Evaluation (improvement)."
    ],
    [
     "Children's digital library results",
     "3M+ unique visitors; visual search used in 71% of searches."
    ],
    [
     "Qualcomm trucker device: problem and fix",
     "Small buttons, but truckers have big hands and wear gloves. Fix: large touch screen and stylus pen."
    ],
    [
     "Bloatware",
     "A product with too many features, megabytes, too slow, too difficult, or simply too much."
    ],
    [
     "Adaptive (personalized) menus",
     "A short list of likely-used commands; a chevron expands the full menu."
    ],
    [
     "Rafted toolbars",
     "Toolbars share a line; least-used buttons move to an overflow area."
    ],
    [
     "Auto-customization rule",
     "Unless it does a perfect job, it is usually worse than no customization at all."
    ],
    [
     "CEIP",
     "Customer Experience Improvement Program: collects anonymous usage data from Office 2003 users."
    ],
    [
     "Office 2007 data size",
     "More than 1.3 billion sessions; 70% of Word/Outlook data was thrown away."
    ],
    [
     "HCI as a field of study",
     "A multidisciplinary field focusing on the design of computer technology and, in particular, the interaction between humans (the users) and computers. It has expanded from computers to almost all forms of information technology design."
    ],
    [
     "HCI involves the study of ...",
     "Humans (needs, abilities, limitations), computer technologies that can enhance user-computer interaction, and the ways, preferences and difficulties faced by users of current or past systems."
    ],
    [
     "Three parts of the HCI pie chart",
     "Human, Computer and Interaction."
    ],
    [
     "Human part of HCI (pie chart)",
     "Communication theory, Industrial design, Social science, Cognitive psychology, Human factors."
    ],
    [
     "Computer part of HCI (pie chart)",
     "Computer graphic, Operating system, Programming language. (The Interaction part is Interaction design.)"
    ],
    [
     "Interaction design: Sharp, Rogers, and Preece (2019)",
     "\"Designing interactive products to support the way people communicate and interact in their everyday and working lives.\""
    ],
    [
     "Interaction design: Winograd (1997)",
     "\"The design of spaces for human communication and interaction.\""
    ],
    [
     "Goals of interaction design",
     "Develop usable products, and involve users in the design process."
    ],
    [
     "Usability means ...",
     "Easy to learn, effective to use, and provides an enjoyable experience."
    ],
    [
     "Elevator controls (bad design)",
     "The labels and controls on the bottom row all look the same, so it is easy to push a label by mistake instead of a control button."
    ],
    [
     "Why is the vending machine bad?",
     "You must push a button first to activate the reader, while normally you insert the bill before making a selection, so it contravenes a well known convention."
    ],
    [
     "Marble answering machine",
     "Bishop, 1995. Good design: based on how everyday objects behave; easy, intuitive and a pleasure to use; only one-step actions for core tasks."
    ],
    [
     "Why is the TiVo remote well designed?",
     "Peanut shaped to fit in hand; logical layout and color-coded, distinctive buttons; easy-to-locate buttons."
    ],
    [
     "Smart TV dilemma: three ways to interact",
     "Pecking on a grid keyboard via a remote; swiping across two alphanumeric rows on a remote touchpad; voice control using a remote or smart speaker."
    ],
    [
     "Online book library search (example case)",
     "Bad design: the user research component is almost absent."
    ],
    [
     "International Children's Digital Library",
     "Designed by HCIL. Good design: more than 3 million unique visitors; visual search preferred by users (71% of searches)."
    ],
    [
     "Doctor's office form",
     "30+ minutes, address/phone/email/SSN asked an average of 3 times for at least 10 people and organizations, then \"Internal server error\": a bad user experience."
    ],
    [
     "Design considerations",
     "Take into account who the users are, what activities are carried out, and where interaction takes place; optimize interactions to match users' activities and needs."
    ],
    [
     "Umbrella term for UI design, software design, user-centered design, product design, web design and UX",
     "Interaction design."
    ],
    [
     "Academic disciplines contributing to ID",
     "Psychology, Social Sciences, Computing Sciences, Engineering, Ergonomics, Informatics."
    ],
    [
     "Design practices contributing to ID",
     "Graphic design, Product design, Artist-design, Industrial design, Film industry."
    ],
    [
     "Interdisciplinary fields linked to ID (diagram)",
     "Human Factors (HF), Cognitive Engineering, Human-Computer Interaction (HCI), Cognitive Ergonomics, Computer-Supported Cooperative Work (CSCW), Information Systems."
    ]
   ],
   "qa": [
    [
     "What are the objectives of HCI?",
     "Design for people, tasks and environments; make interaction easier with easy, natural and intuitive systems that save time and reduce cost; design, learn, use and evaluate GUIs and web interfaces; explore new interaction paradigms; develop models and theories of interaction."
    ],
    [
     "Differentiate between HCI, UX design and UI design.",
     "HCI is about understanding interactions between humans and computers. UX design is about dictating those interactions (the overall experience). UI design is about designing things nicely for a screen (look, feel, interactivity)."
    ],
    [
     "Is the user interacting with the computer or with the task? Explain.",
     "With the task. The system is a means to achieve a task such as buying online. In a Zoom lecture the instructor interacts with students, not with the laptop. A good interface goes unnoticed, like a good referee."
    ],
    [
     "What should you learn during user research?",
     "The users (skills, distractions, special needs such as kids, elderly, disabilities), the tasks they try to complete, and existing research on human capabilities, limitations and perception."
    ],
    [
     "What lessons were learned from the children's library search design?",
     "A good designer understands issues from the user's point of view and works with users instead of guessing what they like."
    ],
    [
     "Why did the adaptive menus and rafted toolbars fail?",
     "Customization was not easy or accurate. A bad short menu forced users to scan the full menu again (scanning took twice as long), adding complexity and inefficiency. They were later turned off by default."
    ],
    [
     "How did Microsoft base Office 2007 design on data instead of guessing?",
     "Through CEIP, which collected anonymous usage data (1.3B+ sessions): which commands are used, in what sequence, keyboard versus mouse, number of open documents and screen sizes."
    ],
    [
     "What problems come with increasing the number of features?",
     "The app feels complicated, it is harder to find or learn how to do things, and users focus more on the tool than on the task."
    ],
    [
     "Define HCI and state what it involves the study of.",
     "HCI is the interaction between user and computer, or the relationship between users and computer systems. It is a multidisciplinary field of study focusing on the design of computer technology and, in particular, the interaction between humans (the users) and computers; while initially concerned with computers, it has expanded to cover almost all forms of information technology design. It involves the study of: 1) humans (needs, abilities, limitations) 2) computer technologies that can enhance the interaction between users and computers 3) the ways, preferences and difficulties faced by users of current or past systems."
    ],
    [
     "Give two definitions of interaction design and state its goals.",
     "Definitions: 1) \"Designing interactive products to support the way people communicate and interact in their everyday and working lives\" (Sharp, Rogers, and Preece, 2019). 2) \"The design of spaces for human communication and interaction\" (Winograd, 1997). Goals: 1) develop usable products, where usability means easy to learn, effective to use, and provides an enjoyable experience 2) involve users in the design process."
    ],
    [
     "Explain the concept of the invisible interface.",
     "1) We make the interface as invisible as possible so users spend little time focusing on the interface and instead focus on the task they are trying to accomplish. 2) The designer's goal is to help humans feel they are interacting directly with the task while the interface vanishes in the middle of that interaction. 3) The user should think about the task rather than thinking about the tool."
    ],
    [
     "Using the Qualcomm device for truckers, explain why user research is important.",
     "1) The early version of the Qualcomm device for truckers had small buttons. 2) User interface (user research) discovered surprising findings: truckers often have big hands and often wear gloves. 3) The better design used a large touch screen and a stylus pen."
    ],
    [
     "Why is the vending machine on the slides a bad design, and why is the marble answering machine a good design?",
     "Vending machine: 1) you need to push a button first to activate the reader 2) normally you insert the bill first before making a selection 3) so it contravenes a well known convention. Marble answering machine (Bishop, 1995): 1) based on how everyday objects behave 2) easy, intuitive and a pleasure to use 3) only requires one-step actions to perform core tasks."
    ],
    [
     "Compare the online book library search design with the International Children's Digital Library search page.",
     "1) The online book library search was a bad design because the user research component was almost absent. 2) The International Children's Digital Library, designed by HCIL, has a good search page design: more than 3 million unique visitors, and the visual search was preferred by users (71% of searches)."
    ],
    [
     "What design considerations must be taken into account?",
     "1) Who the users are 2) what activities are being carried out 3) where interaction is taking place. Also, we need to optimize the interactions users have with a product so that they match the users' activities and needs."
    ],
    [
     "Interaction design is called an umbrella term. Explain, and list the academic disciplines and design practices contributing to it.",
     "Many terms emphasize what is being designed (user interface design, software design, user-centered design, product design, web design, experience design (UX)); interaction design is the umbrella term covering all of these aspects and is fundamental to all disciplines, fields and approaches concerned with researching and designing computer-based systems for people. Academic disciplines: 1) Psychology 2) Social Sciences 3) Computing Sciences 4) Engineering 5) Ergonomics 6) Informatics. Design practices: 1) Graphic design 2) Product design 3) Artist-design 4) Industrial design 5) Film industry."
    ]
   ],
   "quiz": [
    {
     "q": "HCI terms used interchangeably are:",
     "o": [
      [
       "Human Computer Interaction",
       "Human Computer Interaction is the full name of HCI itself, but the lecture lists HMI and MMI as equally valid terms, so picking only this option misses two of them (L1, What is HCI?)."
      ],
      [
       "Human Machine Interaction",
       "HMI is one interchangeable term, but HCI and MMI are used for the same field too, so \"All the above\" is the complete answer (L1, What is HCI?)."
      ],
      [
       "Man Machine Interaction",
       "MMI is one of the interchangeable terms, but so are HCI and HMI; the question asks for all of them, which is \"All the above\" (L1, What is HCI?)."
      ],
      [
       "All the above",
       "Correct. HCI, HMI and MMI are all used for the same field."
      ]
     ],
     "a": 3,
     "src": "Exam 2024/25"
    },
    {
     "q": "Which one refers to the interactivity, look and feel of a product screen or web page?",
     "o": [
      [
       "UX design",
       "UX covers the user's overall experience, which is broader than the screen's look and feel."
      ],
      [
       "UI design",
       "Correct. UI design is the interactivity, look and feel of a screen or page."
      ],
      [
       "Human factors engineering",
       "That is the parent field about people interacting with products, systems or devices."
      ],
      [
       "Industrial design",
       "A sibling of HCI under human factors engineering; it is not screen design."
      ]
     ],
     "a": 1
    },
    {
     "q": "The idea of an \"invisible interface\" means:",
     "o": [
      [
       "The interface uses no graphics",
       "It is not about removing visuals; it is about attention."
      ],
      [
       "Users focus on the task and forget about the interface",
       "Correct. The interface vanishes and the user thinks about the task, not the tool."
      ],
      [
       "The interface is hidden behind menus",
       "Hiding features in menus does not make the interaction feel direct."
      ],
      [
       "The interface only uses voice",
       "Modality is unrelated; any interface can aim to be invisible."
      ]
     ],
     "a": 1
    },
    {
     "q": "Humans can distinguish millions of colors but only about ___ shades of gray.",
     "o": [
      [
       "3",
       "Far too low: humans can tell apart about 30 shades of gray, ten times this number, which is still tiny next to millions of colors (L1, HCI hierarchy)."
      ],
      [
       "30",
       "Correct. The lecture's human-limitation example is about 30 shades of gray."
      ],
      [
       "300",
       "Too high by a factor of ten. The lecture's human-limit example contrasts millions of colors with only about 30 shades of gray (L1, HCI hierarchy)."
      ],
      [
       "3000",
       "Far too high. The point of the example is how few grays we can distinguish: only about 30, against millions of colors (L1, HCI hierarchy)."
      ]
     ],
     "a": 1
    },
    {
     "q": "What is the FIRST component of the UI design process?",
     "o": [
      [
       "User research",
       "Correct. The order is user research → design and prototyping → evaluation."
      ],
      [
       "Evaluation and improvement",
       "Evaluation (improvement) is the third and last component: you can only evaluate an interface after researching users and designing it (L1, UI design process)."
      ],
      [
       "Design and prototyping",
       "Design and prototyping is the second component; it comes after user research, because you must learn the users and their tasks before designing (L1, UI design process)."
      ],
      [
       "Implementation",
       "Implementation is not one of the three listed components."
      ]
     ],
     "a": 0
    },
    {
     "q": "In the International Children's Digital Library, visual search was used in about what share of searches?",
     "o": [
      [
       "17%",
       "17% reverses the digits of the real figure: visual search was used in 71% of searches, showing users preferred it (L1, Case studies)."
      ],
      [
       "50%",
       "50% would mean no clear preference, but the lecture reports visual search was used in 71% of searches, a clear majority (L1, Case studies)."
      ],
      [
       "71%",
       "Correct. 71% of searches used the visual search."
      ],
      [
       "91%",
       "Too high. The International Children's Digital Library reported visual search in 71% of searches, not 91% (L1, Case studies)."
      ]
     ],
     "a": 2
    },
    {
     "q": "Which statement about early computer systems is true?",
     "o": [
      [
       "They were designed with strong focus on usability",
       "The opposite: early machines were expensive, so engineers optimised the software for the machine and ignored usability (L1, UI vs UX vs HCI)."
      ],
      [
       "They focused on efficient software because machines were expensive",
       "Correct. Engineers optimised the expensive machine, not the user's experience."
      ],
      [
       "They were user-centric",
       "User-centric design describes today's systems, where success depends on usability. Early systems were machine-centric, focused on efficient software (L1, UI vs UX vs HCI)."
      ],
      [
       "They used invisible interfaces",
       "The invisible interface is a modern ideal where users focus on the task. Early systems ignored usability altogether, so they were far from it (L1, Invisible interface)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Human Factors Engineering is formed from which two fields?",
     "o": [
      [
       "Engineering and Psychology",
       "Correct. Both feed into human factors engineering in the hierarchy figure."
      ],
      [
       "HCI and UX",
       "These are below human factors engineering, not above it."
      ],
      [
       "Art and Marketing",
       "Art and Marketing do not appear in the hierarchy figure. Human factors engineering comes from Engineering + Psychology (L1, HCI hierarchy)."
      ],
      [
       "Industrial and Product design",
       "These are branches of human factors engineering, not its sources."
      ]
     ],
     "a": 0
    },
    {
     "q": "\"S/W development is not just a process of creating software, it is also a process of learning how to create the S/W best suited for its purpose.\"",
     "o": [
      [
       "True",
       "Correct. The lecture calls this \"software development is research\"."
      ],
      [
       "False",
       "The statement is taken directly from the lecture, so it is true."
      ]
     ],
     "a": 0,
     "src": "Exam 2024/25"
    },
    {
     "q": "\"UI Design covers a user's overall experience with the product or website.\"",
     "o": [
      [
       "True",
       "The overall experience with a product or website is the definition of UX design. UI design is only the interactivity, look and feel of a screen or page (L1, UI vs UX vs HCI)."
      ],
      [
       "False",
       "Correct. UI is look, feel and interactivity; UX is the overall experience."
      ]
     ],
     "a": 1,
     "src": "Exam 2024/25"
    },
    {
     "q": "What surprising finding did user research discover about truckers?",
     "o": [
      [
       "They preferred small keypads",
       "Small buttons were the problem, not a preference."
      ],
      [
       "They disliked touch screens",
       "The better design actually used a large touch screen."
      ],
      [
       "They often have big hands and wear gloves",
       "Correct. This is why the small buttons failed."
      ],
      [
       "They preferred voice-only systems",
       "Voice systems are not part of the Qualcomm case. Research found truckers have big hands and wear gloves, so the fix was a large touch screen with a stylus (L1, Qualcomm device)."
      ]
     ],
     "a": 2
    },
    {
     "q": "The early version of the Qualcomm device for truckers had:",
     "o": [
      [
       "Voice command input",
       "The trucker case never mentions voice input. The early device's problem was small buttons that big, gloved hands could not press (L1, Qualcomm device)."
      ],
      [
       "Small buttons that were hard to use",
       "Correct. The early Qualcomm device had small buttons, which failed because user research showed truckers often have big hands and wear gloves (L1, Qualcomm device)."
      ],
      [
       "A large touch screen",
       "The large touch screen with a stylus pen was the improved design that came after user research, not the early version (L1, Qualcomm device)."
      ],
      [
       "No display at all",
       "The device did have an interface; its problem was small buttons. The fix kept a screen and made it a large touch screen (L1, Qualcomm device)."
      ]
     ],
     "a": 1
    },
    {
     "q": "In adaptive menus, what expands the menu to show its full contents?",
     "o": [
      [
       "A chevron at the end of the menu",
       "Correct. An adaptive menu first shows a short list of the most likely used commands; clicking the chevron at its end expands the full menu (L1, Office 2000 mechanisms)."
      ],
      [
       "A double right-click",
       "A double right-click is not part of adaptive menus. The lecture says a chevron at the end of the short menu expands it (L1, Office 2000 mechanisms)."
      ],
      [
       "The overflow area",
       "The overflow area belongs to rafted toolbars."
      ],
      [
       "Holding the mouse for 5 seconds",
       "There is no hold-to-expand timer in the lecture. The full adaptive menu is opened by clicking the chevron at its end (L1, Office 2000 mechanisms)."
      ]
     ],
     "a": 0
    },
    {
     "q": "Why did auto-customization in Office 2000 make scanning menus slower?",
     "o": [
      [
       "Menus had no icons",
       "Icons were never the issue. The problem was that a wrong short menu forced users to scan the full menu as well (L1, Office 2000 mechanisms)."
      ],
      [
       "A wrong short menu forced users to scan the full menu again",
       "Correct. When the predicted short menu lacked the command, users scanned it, expanded it and scanned the full menu again, so scanning took about twice as long (L1, Office 2000 mechanisms)."
      ],
      [
       "The CEIP program slowed the computer",
       "CEIP has nothing to do with Office 2000: it was introduced later, in Office 2003, to collect usage data, and it did not slow menu scanning (L1, From guesswork to data)."
      ],
      [
       "Toolbars were removed",
       "Toolbars were not removed: rafted toolbars shared one line and moved predicted least-used buttons to an overflow area (L1, Office 2000 mechanisms)."
      ]
     ],
     "a": 1
    },
    {
     "q": "How much Office 2007 usage data did the design team have?",
     "o": [
      [
       "1.3 million sessions",
       "Too small by a factor of 1000: the team had more than 1.3 billion sessions, not million (L1, From guesswork to data)."
      ],
      [
       "13 million sessions",
       "13 million is far below the real figure. For Office 2007 the team had more than 1.3 billion sessions of usage data (L1, From guesswork to data)."
      ],
      [
       "More than 1.3 billion sessions",
       "Correct. CEIP gave the Office 2007 team more than 1.3 billion sessions; there was so much Word and Outlook data that 70% was thrown away (L1, From guesswork to data)."
      ],
      [
       "Exactly 70 sessions",
       "70 comes from a different fact: 70% of the Word and Outlook data was thrown away. The total was more than 1.3 billion sessions (L1, From guesswork to data)."
      ]
     ],
     "a": 2
    },
    {
     "q": "Before 2003, most Office design decisions were based on:",
     "o": [
      [
       "Usage data",
       "Usage data only became available with the CEIP in Office 2003. Before that, the team had no real data to base decisions on (L1, From guesswork to data)."
      ],
      [
       "Guesswork, feel and estimation",
       "Correct. The Office team admitted decisions before 2003 were \"based on feel, estimation, and guess work\", until CEIP brought real usage data (L1, From guesswork to data)."
      ],
      [
       "Usability labs only",
       "The lecture does not say decisions came from usability labs. It says they were based on feel, estimation and guesswork (L1, From guesswork to data)."
      ],
      [
       "Competitor analysis",
       "Competitor analysis is not mentioned. Pre-2003 decisions were based on feel, estimation and guesswork, which CEIP data later replaced (L1, From guesswork to data)."
      ]
     ],
     "a": 1
    },
    {
     "q": "HCI is best described as:",
     "o": [
      [
       "The study of computer hardware performance only",
       "Wrong. HCI is about the interaction or relationship between users and computers, not hardware performance."
      ],
      [
       "The interaction between user and computer, or the relationship between users and computer systems",
       "Correct. This is the slide's definition of HCI (L1, What is HCI?)."
      ],
      [
       "A programming language for building interfaces",
       "Wrong. A programming language is only one item under the Computer part of the HCI pie chart."
      ],
      [
       "The design of computer graphics only",
       "Wrong. Computer graphic is one item in the Computer part; HCI covers human, computer and interaction."
      ]
     ],
     "a": 1
    },
    {
     "q": "\"While initially concerned with computers, HCI has since expanded to cover almost all forms of information technology design.\"",
     "o": [
      [
       "True",
       "Correct. The slide says HCI is a multidisciplinary field that expanded from computers to almost all forms of IT design (L1, What is HCI?)."
      ],
      [
       "False",
       "Wrong. The slide states exactly this expansion."
      ]
     ],
     "a": 0
    },
    {
     "q": "In the HCI pie chart, which item belongs to the Human part?",
     "o": [
      [
       "Operating system",
       "Wrong. Operating system is in the Computer part."
      ],
      [
       "Interaction design",
       "Wrong. Interaction design is the only item in the Interaction part."
      ],
      [
       "Cognitive psychology",
       "Correct. The Human part lists communication theory, industrial design, social science, cognitive psychology and human factors (L1, The three parts of HCI (pie chart))."
      ],
      [
       "Programming language",
       "Wrong. Programming language is in the Computer part."
      ]
     ],
     "a": 2
    },
    {
     "q": "\"Designing interactive products to support the way people communicate and interact in their everyday and working lives\" is the definition of interaction design by:",
     "o": [
      [
       "Winograd (1997)",
       "Wrong. Winograd (1997) defined it as \"the design of spaces for human communication and interaction\"."
      ],
      [
       "Sharp, Rogers, and Preece (2019)",
       "Correct. The slide credits this quote to Sharp, Rogers, and Preece (2019) (L1, What is interaction design?)."
      ],
      [
       "Bishop (1995)",
       "Wrong. Bishop (1995) is the marble answering machine."
      ],
      [
       "HCIL",
       "Wrong. HCIL designed the International Children's Digital Library."
      ]
     ],
     "a": 1
    },
    {
     "q": "According to the slides, usability means:",
     "o": [
      [
       "Fast processing and low cost",
       "Wrong. The slides define usability as easy to learn, effective to use and enjoyable."
      ],
      [
       "Easy to learn, effective to use, and provides an enjoyable experience",
       "Correct. This is the slide's meaning of usability under the goal \"develop usable products\" (L1, Goals of interaction design)."
      ],
      [
       "Having as many features as possible",
       "Wrong. Features are not part of the slide's definition of usability."
      ],
      [
       "Looking attractive with bright colors",
       "Wrong. Looks and colors are not part of the slide's definition; usability means easy to learn, effective to use, and provides an enjoyable experience."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which is one of the two goals of interaction design on the slides?",
     "o": [
      [
       "Keep users out of the design process",
       "Wrong. The slide says the opposite: involve users in the design process."
      ],
      [
       "Involve users in the design process",
       "Correct. The goals are to develop usable products and involve users in the design process (L1, Goals of interaction design)."
      ],
      [
       "Make the interface as visible as possible",
       "Wrong. The invisible interface idea aims to make the interface as invisible as possible."
      ],
      [
       "Reduce the number of users",
       "Wrong. This is not mentioned on the slides."
      ]
     ],
     "a": 1
    },
    {
     "q": "Why are the elevator controls on the slide a bad design?",
     "o": [
      [
       "The buttons are too small for gloved hands",
       "Wrong. That was the problem with the Qualcomm device for truckers."
      ],
      [
       "The controls and labels on the bottom row all look the same, so it is easy to push a label instead of a button",
       "Correct. This is the slide's explanation (L1, Example of bad and good design: elevator controls)."
      ],
      [
       "You must push a button before inserting a bill",
       "Wrong. That describes the vending machine."
      ],
      [
       "The labels on the top row look the same as the buttons",
       "Wrong. The slide says people do not make the same mistake on the top row."
      ]
     ],
     "a": 1
    },
    {
     "q": "The vending machine on the slides is bad mainly because it:",
     "o": [
      [
       "Has buttons that are not color-coded",
       "Wrong. Color-coded buttons were a strength of the TiVo remote; the slide does not say this about the vending machine."
      ],
      [
       "Asks for the same data three times",
       "Wrong. That was the doctor's office form."
      ],
      [
       "Needs a button pushed first to activate the reader, contravening the well known convention of inserting the bill first",
       "Correct. Normally you insert the bill before making a selection (L1, Why is this vending machine so bad?)."
      ],
      [
       "Shows an internal server error",
       "Wrong. That message ended the doctor's office form example."
      ]
     ],
     "a": 2
    },
    {
     "q": "The marble answering machine (Bishop, 1995) is a good design because it:",
     "o": [
      [
       "Is based on how everyday objects behave and only requires one-step actions for core tasks",
       "Correct. It is also easy, intuitive and a pleasure to use (L1, Good design: marble answering machine)."
      ],
      [
       "Is peanut shaped to fit in the hand",
       "Wrong. That describes the TiVo remote."
      ],
      [
       "Uses a large touch screen and stylus pen",
       "Wrong. That was the better design for the truckers' Qualcomm device."
      ],
      [
       "Offers a visual search",
       "Wrong. Visual search was the ICDL search page."
      ]
     ],
     "a": 0
    },
    {
     "q": "Which is NOT a reason given for the TiVo remote being better designed than standard remotes?",
     "o": [
      [
       "Peanut shaped to fit in hand",
       "Wrong choice. This is on the slide as a reason."
      ],
      [
       "Logical layout and color-coded, distinctive buttons",
       "Wrong choice. This is on the slide as a reason."
      ],
      [
       "Easy-to-locate buttons",
       "Wrong choice. This is on the slide as a reason."
      ],
      [
       "Voice control through a smart speaker",
       "Correct. Voice control appears only as one option in the smart TV dilemma, not as a TiVo reason (L1, Good and bad design: TiVo remote)."
      ]
     ],
     "a": 3
    },
    {
     "q": "In the smart TV dilemma, \"swiping\" means:",
     "o": [
      [
       "Pressing keys on a grid keyboard via a remote control",
       "Wrong. That is pecking."
      ],
      [
       "Swiping across two alphanumeric rows using a touchpad on a remote control",
       "Correct. This is the second option on the slide (L1, Dilemma: interacting with a smart TV)."
      ],
      [
       "Speaking to a smart speaker",
       "Wrong. That is voice control."
      ],
      [
       "Using a stylus pen on a touch screen",
       "Wrong. The stylus pen was the truckers' device."
      ]
     ],
     "a": 1
    },
    {
     "q": "The online book library search design on the slides was a bad design because:",
     "o": [
      [
       "It had too many visitors",
       "Wrong. Visitor numbers (3 million) were given for the good ICDL design."
      ],
      [
       "The user research component was almost absent",
       "Correct. This is the slide's verdict (L1, Example case: online book library search)."
      ],
      [
       "It used a visual search",
       "Wrong. Visual search was the good feature of the ICDL."
      ],
      [
       "It had no search box",
       "Wrong. Both mock-ups include a search box, a by-Title drop-down and a Go button."
      ]
     ],
     "a": 1
    },
    {
     "q": "The International Children's Digital Library search page, designed by HCIL, had:",
     "o": [
      [
       "Fewer than 1 million visitors, with text search preferred",
       "Wrong. It had more than 3 million unique visitors and visual search was preferred."
      ],
      [
       "More than 3 million unique visitors, with visual search preferred by users (71% of searches)",
       "Correct. These are the slide's figures (L1, Example case: International Children's Digital Library (ICDL))."
      ],
      [
       "More than 3 million unique visitors, with visual search used in 17% of searches",
       "Wrong. The slide gives 71%, not 17%."
      ],
      [
       "An internal server error after submitting",
       "Wrong. That happened with the doctor's office form."
      ]
     ],
     "a": 1
    },
    {
     "q": "In the doctor's office form example, the personal data was asked for an average of how many times?",
     "o": [
      [
       "3 times, for at least 10 people and organizations",
       "Correct. It took at least 30 minutes and ended with \"Internal server error\" (L1, Bad user experience: the doctor's office form)."
      ],
      [
       "10 times, for 3 people",
       "Wrong. The numbers are reversed: an average of 3 times for at least 10 people and organizations."
      ],
      [
       "Once, for 30 people",
       "Wrong. 30 is the minutes spent, not people."
      ],
      [
       "71 times",
       "Wrong. 71% is the share of visual searches in the ICDL."
      ]
     ],
     "a": 0
    },
    {
     "q": "Which is NOT one of the things the slides say design must take into account?",
     "o": [
      [
       "Who the users are",
       "Wrong choice. This is listed."
      ],
      [
       "What activities are being carried out",
       "Wrong choice. This is listed."
      ],
      [
       "Where interaction is taking place",
       "Wrong choice. This is listed."
      ],
      [
       "How much the hardware costs",
       "Correct. The listed considerations are who, what activities and where; cost is not one of them (L1, Design considerations)."
      ]
     ],
     "a": 3
    },
    {
     "q": "Which term is the umbrella term covering user interface design, software design, user-centered design, product design, web design and experience design (UX)?",
     "o": [
      [
       "Web design",
       "Wrong. Web design is one of the terms covered by the umbrella."
      ],
      [
       "Interaction design",
       "Correct. The slide calls interaction design the umbrella term covering all of these (L1, Which kind of design?)."
      ],
      [
       "Graphic design",
       "Wrong. Graphic design is a design practice contributing to ID."
      ],
      [
       "Software design",
       "Wrong. Software design is one of the terms covered by the umbrella."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which of the following is a design practice (not an academic discipline) contributing to ID?",
     "o": [
      [
       "Ergonomics",
       "Wrong. Ergonomics is an academic discipline."
      ],
      [
       "Informatics",
       "Wrong. Informatics is an academic discipline."
      ],
      [
       "Film industry",
       "Correct. Design practices are graphic design, product design, artist-design, industrial design and film industry (L1, Relationship between ID, HCI and other fields)."
      ],
      [
       "Psychology",
       "Wrong. Psychology is an academic discipline."
      ]
     ],
     "a": 2
    },
    {
     "q": "In the interaction design diagram, Computer-Supported Cooperative Work (CSCW) appears as:",
     "o": [
      [
       "An academic discipline",
       "Wrong. The academic disciplines are ergonomics, psychology/cognitive science, informatics, engineering, computer science/software engineering and social sciences."
      ],
      [
       "A design practice",
       "Wrong. The design practices are graphic, product, artist-design, industrial design and film industry."
      ],
      [
       "An interdisciplinary field",
       "Correct. CSCW is listed with HF, cognitive engineering, HCI, cognitive ergonomics and information systems (L1, Interaction design and other fields (diagram))."
      ],
      [
       "Part of the Computer slice of the HCI pie chart",
       "Wrong. That slice lists computer graphic, operating system and programming language."
      ]
     ],
     "a": 2
    }
   ]
  },
  {
   "n": 2,
   "title": "The Process of Interaction Design",
   "notes": [
    {
     "h": "What is involved in interaction design?",
     "pts": [
      "Interaction design <b>is a process</b>:",
      "It is focused on <b>discovering requirements</b>, <b>designing</b> to fulfil requirements, <b>producing prototypes</b> and <b>evaluating</b> them.",
      "It is focused on <b>users and their goals</b>.",
      "It involves how to <b>balance conflicting requirements</b>.",
      "<b>Generating alternatives and choosing between them is key.</b>"
     ]
    },
    {
     "h": "Remember: the interaction design process",
     "pts": [
      "The interaction design process involves <b>three components</b>: 1) <b>User research</b>. 2) <b>Design and prototyping</b>. 3) <b>Evaluation (improvement)</b>.",
      "User research means <b>working with users rather than guessing</b> (<b>user-centric design</b>). Ignoring user research is common. Involve users so decisions are based on reality, not guesses.",
      "User research: <b>invisible interfaces</b> (<b>task-oriented design</b>)."
     ]
    },
    {
     "h": "User-centered design",
     "ly": 1,
     "pts": [
      "We used to design systems to meet some <b>functional specification</b>.",
      "<b>User-centered design</b>: design that takes the user's needs into consideration at <b>every step</b>."
     ]
    },
    {
     "h": "The double diamond of design",
     "pts": [
      "The <b>double diamond of design</b> has four phases: <b>Discover</b> (insight into the problem) → <b>Define</b> (the area to focus upon) → <b>Develop</b> (potential solutions) → <b>Deliver</b> (solutions that work).",
      "Diagram: two diamonds side by side. The first diamond starts at a point labelled <b>Problem</b>, widens during Discover and narrows during Define to a point labelled <b>Problem Definition</b> / <b>Design Brief</b>.",
      "The second diamond starts from that point, widens during Develop and narrows during Deliver to a point labelled <b>Solution</b>."
     ]
    },
    {
     "h": "Four basic activities of interaction design",
     "pts": [
      "The four basic activities of interaction design: 1) <b>Discovering requirements</b>. 2) <b>Designing alternatives</b>. 3) <b>Prototyping alternative designs</b>. 4) <b>Evaluating product and its user experience throughout</b>."
     ]
    },
    {
     "h": "A simple interaction design lifecycle model",
     "pts": [
      "This simple lifecycle model <b>exemplifies a user-centered design approach</b>.",
      "Diagram: the process enters at <b>Discovering requirements</b>. Discovering requirements and <b>Designing alternatives</b> have arrows going both ways between them.",
      "Designing alternatives → <b>Prototyping</b>, and Prototyping has an arrow back to Designing alternatives.",
      "Prototyping → <b>Evaluating</b>.",
      "From Evaluating, arrows go back to Discovering requirements and back to Designing alternatives, and one arrow leaves the cycle to the <b>Final product</b>."
     ]
    },
    {
     "h": "Another lifecycle model: Google Design Sprints",
     "pts": [
      "Another lifecycle model: <b>Google Design Sprints</b> (<b>Knapp et al., 2016</b>).",
      "Google Design Sprint has five steps: 1) <b>Unpack</b> → 2) <b>Sketch</b> → 3) <b>Decide</b> → 4) <b>Prototype</b> → 5) <b>Test</b>.",
      "The steps form a cycle labelled <b>Iterate</b>: Unpack → Sketch → Decide → Prototype → Test → back to Unpack.",
      "Source: Google Design Sprints (used courtesy of Agile Marketing)."
     ]
    },
    {
     "h": "Design life cycle (according to Joyner)",
     "pts": [
      "Joyner's design life cycle is an <b>iterative process with four phases</b>: <b>Need finding</b> → <b>Design alternative</b> → <b>Prototyping</b> → <b>Evaluation</b> → back to Need finding."
     ]
    },
    {
     "h": "User-centered design process (Google)",
     "ly": 1,
     "pts": [
      "<b>Understand → Specify → Design → Evaluate</b>, and iteration is key.",
      "<b>Understand</b>: how users experience the product (a lot of research). <b>Specify</b>: the most important user problem to solve. <b>Design</b>: solutions, then start building. <b>Evaluate</b>: test with real users."
     ]
    },
    {
     "h": "Where is \"user research\"?",
     "ly": 1,
     "pts": [
      "Joyner and Google do not give it a separate step because it is <b>integral to every phase</b>, and to avoid seeing it as a one-time step at the beginning.",
      "Joyner: <b>\"you need users early and often\"</b>.",
      "Google: user research is continuous and happens <b>before, during and after</b> the design phase.",
      "Making it an explicit component still helps: it avoids underestimating it, and it is increasingly a role for specialized professionals."
     ]
    },
    {
     "h": "Who does UI/UX design?",
     "ly": 1,
     "pts": [
      "A <b>software engineer</b> designing the whole system, often knowing little about HCI.",
      "A <b>UI/UX designer</b> on the development team, increasingly common in small and medium companies.",
      "<b>Specialists</b> for each role (UX researcher, UX designer, visual designer, UX engineer) in big companies like Google."
     ]
    },
    {
     "h": "Some practical issues",
     "pts": [
      "Some practical issues in interaction design:",
      "Who are the users?",
      "What are the users' needs?",
      "How to generate alternative designs?",
      "How to choose among alternatives?",
      "How to integrate interaction design activities with other lifecycle models?"
     ]
    },
    {
     "h": "Who are the users/stakeholders?",
     "pts": [
      "Who the users are is <b>not obvious</b>:",
      "There are <b>382 distinct types of users for smartphone apps</b> (<b>Sha Zhao et al, 2016</b>).",
      "Many products are intended for use by large sections of the population, so the <b>user is \"everybody\"</b>.",
      "<b>Stakeholders</b> are a group <b>larger than the group of direct users</b>.",
      "<b>Identifying stakeholders</b> helps identify groups to include in interaction design activities."
     ]
    },
    {
     "h": "What are the users' needs?",
     "pts": [
      "<b>Users rarely know what is possible.</b>",
      "Instead: <b>explore the problem space</b>; <b>investigate who are the users</b>; <b>investigate user activities</b> to see what can be improved.",
      "<b>Focus on peoples' goals, usability, and user experience goals.</b>"
     ]
    },
    {
     "h": "Types of user research by WHEN",
     "ly": 1,
     "pts": [
      "<b>1. Foundational (strategic / generative)</b>: happens <b>before anything is designed</b>. The goal is to identify user problems and what to build. It involves talking to users about their pain points and reveals opportunities the team would not think of.",
      "<b>2. Tactical (design)</b>: happens <b>during the design phase</b>. It informs how the product should be built and needs user feedback on prototypes.",
      "<b>3. Post-launch</b>: Did we succeed? Does the system meet user needs?"
     ]
    },
    {
     "h": "Types of user research by WHO",
     "ly": 1,
     "pts": [
      "<b>Primary research</b>: research you conduct yourself. Methods: interviews, focus groups, surveys, usability studies, participant observations.",
      "<b>Secondary research</b>: research done by someone else. Sources: books, journals and similar.",
      "Secondary research is important early to gather statistics, facts and figures. It saves effort and time and backs up primary findings. It is often done by experienced researchers at credible organizations, which is hard to replicate.",
      "Many practitioners do not know how to use it. Courses (psychology, cognition) and HCI/UX communities help."
     ]
    },
    {
     "h": "How to generate alternatives",
     "pts": [
      "<b>Humans tend to stick with something that works.</b>",
      "<b>Considering alternatives helps identify better designs.</b>",
      "Where do alternative designs come from?",
      "<b>'Flair and creativity'</b>: research and synthesis.",
      "<b>Cross-fertilization of ideas</b> from different perspectives.",
      "<b>Users can generate different designs.</b>",
      "<b>Seek inspiration</b>: similar products and domain, or different products and domain."
     ]
    },
    {
     "h": "How to choose among alternatives",
     "pts": [
      "Interaction design focuses on <b>externally-visible and measurable behavior</b>.",
      "<b>Technical feasibility</b>.",
      "<b>Evaluation with users or peers</b>: use <b>prototypes, not static documentation</b>, because <b>behavior is key</b>.",
      "<b>Quality thresholds</b>: <b>different stakeholder groups have different quality thresholds</b>; <b>usability and user experience goals lead to relevant criteria</b>."
     ]
    },
    {
     "h": "Activity: mobile app for football lovers",
     "pts": [
      "You are involved in the design of a <b>mobile application for football lovers</b> to watch matches and know match results and statistics.",
      "Think about a layout of the interface that you may consider usable and easy.",
      "Can you think of a <b>plan of user research</b>? How can you conduct it to understand user needs and preferences better?",
      "Can you think how you can <b>gather usage data</b> similar to the way <b>Microsoft did for the design of Office 2007</b>? What data can be useful, and how can this data help improve the UI?"
     ]
    }
   ],
   "cards": [
    [
     "User-centered design",
     "Design that considers the user's needs at every step."
    ],
    [
     "Joyner's design life cycle",
     "Need finding → Design alternatives → Prototyping → Evaluation (iterative)."
    ],
    [
     "Google UCD process",
     "Understand → Specify → Design → Evaluate (iteration is key)."
    ],
    [
     "Joyner's quote about users",
     "\"You need users early and often.\""
    ],
    [
     "Foundational research",
     "Strategic/generative. Before anything is designed; finds user problems and what to build."
    ],
    [
     "Tactical research",
     "Design research. During the design phase; uses prototype feedback to decide how to build."
    ],
    [
     "Post-launch research",
     "After release: did we succeed and does it meet user needs?"
    ],
    [
     "Primary research",
     "Research you conduct yourself: interviews, focus groups, surveys, usability studies, observations."
    ],
    [
     "Secondary research",
     "Research done by someone else: books, journals and similar."
    ],
    [
     "What is interaction design (as a process) focused on?",
     "Discovering requirements, designing to fulfil requirements, producing prototypes and evaluating them; users and their goals; and how to balance conflicting requirements."
    ],
    [
     "What is key in interaction design?",
     "Generating alternatives and choosing between them."
    ],
    [
     "Three components of the interaction design process",
     "1) User research 2) Design and prototyping 3) Evaluation (improvement)."
    ],
    [
     "User research: two ideas",
     "Working with users rather than guessing (user-centric design); invisible interfaces (task-oriented design)."
    ],
    [
     "Double diamond of design: the four phases",
     "Discover (insight into the problem) → Define (the area to focus upon) → Develop (potential solutions) → Deliver (solutions that work)."
    ],
    [
     "Double diamond: labels at the points",
     "Problem (start) → Problem Definition / Design Brief (middle) → Solution (end)."
    ],
    [
     "Four basic activities of interaction design",
     "1) Discovering requirements 2) Designing alternatives 3) Prototyping alternative designs 4) Evaluating product and its user experience throughout."
    ],
    [
     "The simple interaction design lifecycle model exemplifies…",
     "A user-centered design approach."
    ],
    [
     "Simple lifecycle model: what leads to the final product?",
     "Evaluating (the cycle is Discovering requirements, Designing alternatives, Prototyping, Evaluating, then Final product)."
    ],
    [
     "Google Design Sprints: source and steps",
     "Knapp et al., 2016. 1) Unpack 2) Sketch 3) Decide 4) Prototype 5) Test, then iterate."
    ],
    [
     "Five practical issues",
     "Who are the users? What are the users' needs? How to generate alternative designs? How to choose among alternatives? How to integrate interaction design activities with other lifecycle models?"
    ],
    [
     "Distinct types of users for smartphone apps",
     "382 (Sha Zhao et al, 2016)."
    ],
    [
     "Why is the user often \"everybody\"?",
     "Many products are intended for use by large sections of the population."
    ],
    [
     "Stakeholders",
     "A group larger than the group of direct users; identifying them helps identify groups to include in interaction design activities."
    ],
    [
     "Users rarely know what is possible, so instead…",
     "Explore the problem space, investigate who are the users, and investigate user activities to see what can be improved."
    ],
    [
     "What should you focus on when finding users' needs?",
     "Peoples' goals, usability, and user experience goals."
    ],
    [
     "Why consider alternatives?",
     "Humans tend to stick with something that works; considering alternatives helps identify better designs."
    ],
    [
     "Where do alternative designs come from?",
     "'Flair and creativity' (research and synthesis); cross-fertilization of ideas from different perspectives; users can generate different designs; seek inspiration (similar or different products and domain)."
    ],
    [
     "How to choose among alternatives",
     "Externally-visible and measurable behavior; technical feasibility; evaluation with users or peers; quality thresholds."
    ],
    [
     "Why evaluate with prototypes, not static documentation?",
     "Because behavior is key."
    ],
    [
     "Quality thresholds",
     "Different stakeholder groups have different quality thresholds; usability and user experience goals lead to relevant criteria."
    ]
   ],
   "qa": [
    [
     "What is meant by user research based on \"When\"?",
     "1) Foundational (strategic/generative): before anything is designed, to find user problems and what to build. 2) Tactical (design): during design, using prototype feedback to decide how to build. 3) Post-launch: after launch, to check whether we succeeded and the system meets user needs."
    ],
    [
     "Why don't Joyner and Google show \"user research\" as a separate phase?",
     "They consider it an integral part of every phase and want to avoid the premature view that it is a single step at the beginning. Google says it happens before, during and after design."
    ],
    [
     "Who does UI/UX design in a company?",
     "A software engineer who designs the whole system; a UI/UX designer on the development team (common in small and medium companies); or several specialists (UX researcher, UX designer, visual designer, UX engineer) in big companies."
    ],
    [
     "What is involved in interaction design?",
     "Interaction design is a process: 1) focused on discovering requirements, designing to fulfil requirements, producing prototypes and evaluating them 2) focused on users and their goals 3) involves how to balance conflicting requirements. Generating alternatives and choosing between them is key."
    ],
    [
     "Describe the double diamond of design.",
     "It has four phases: 1) Discover: insight into the problem 2) Define: the area to focus upon 3) Develop: potential solutions 4) Deliver: solutions that work. The first diamond goes from the Problem to the Problem Definition / Design Brief; the second goes from there to the Solution."
    ],
    [
     "List the four basic activities of interaction design and describe the simple lifecycle model built on them.",
     "1) Discovering requirements 2) Designing alternatives 3) Prototyping alternative designs 4) Evaluating product and its user experience throughout. The simple lifecycle model exemplifies a user-centered design approach: it enters at Discovering requirements, which links both ways with Designing alternatives; Designing alternatives leads to Prototyping (and back); Prototyping leads to Evaluating; Evaluating loops back to Discovering requirements and Designing alternatives, or leads out to the Final product."
    ],
    [
     "Compare Google Design Sprints with Joyner's design life cycle.",
     "Google Design Sprints (Knapp et al., 2016): 1) Unpack 2) Sketch 3) Decide 4) Prototype 5) Test, then iterate. Joyner's design life cycle: an iterative process with four phases: 1) Need finding 2) Design alternative 3) Prototyping 4) Evaluation. Both are iterative cycles."
    ],
    [
     "What are the practical issues of interaction design?",
     "1) Who are the users? 2) What are the users' needs? 3) How to generate alternative designs? 4) How to choose among alternatives? 5) How to integrate interaction design activities with other lifecycle models?"
    ],
    [
     "Who are the users/stakeholders, and how do we find the users' needs?",
     "Users are not obvious: there are 382 distinct types of users for smartphone apps (Sha Zhao et al, 2016), and many products are intended for large sections of the population, so the user is \"everybody\". Stakeholders are larger than the group of direct users, and identifying them helps identify groups to include in interaction design activities. Users rarely know what is possible, so instead: 1) explore the problem space 2) investigate who are the users 3) investigate user activities to see what can be improved. Focus on peoples' goals, usability, and user experience goals."
    ],
    [
     "Where do alternative designs come from, and how do we choose among them?",
     "Humans tend to stick with something that works, and considering alternatives helps identify better designs. Sources: 1) 'flair and creativity': research and synthesis 2) cross-fertilization of ideas from different perspectives 3) users can generate different designs 4) seek inspiration: similar products and domain, or different products and domain. Choosing: 1) interaction design focuses on externally-visible and measurable behavior 2) technical feasibility 3) evaluation with users or peers, using prototypes, not static documentation, because behavior is key 4) quality thresholds: different stakeholder groups have different quality thresholds, and usability and user experience goals lead to relevant criteria."
    ]
   ],
   "quiz": [
    {
     "q": "When does foundational (strategic/generative) research take place?",
     "o": [
      [
       "Only during usability testing",
       "Usability tests belong to tactical or post-launch work."
      ],
      [
       "After a product is fully designed",
       "Research after the product is designed and released is post-launch research (did we succeed?). Foundational research happens before anything is designed (L2, Types by WHEN)."
      ],
      [
       "During marketing campaigns",
       "Marketing campaigns are not one of the research timings. The three are foundational (before design), tactical (during design) and post-launch (L2, Types by WHEN)."
      ],
      [
       "Before anything is designed",
       "Correct. It identifies problems and what to build."
      ]
     ],
     "a": 3
    },
    {
     "q": "\"Tactical research takes place after the design phase.\"",
     "o": [
      [
       "True",
       "Tactical (design) research takes place DURING the design phase. After launch is post-launch research."
      ],
      [
       "False",
       "Correct. Tactical research happens during design and uses feedback on prototypes."
      ]
     ],
     "a": 1,
     "src": "Exam 2025/26 (also 2024/25)"
    },
    {
     "q": "Joyner's design life cycle has which four phases?",
     "o": [
      [
       "Understand, Specify, Design, Evaluate",
       "That is Google's user-centered design process."
      ],
      [
       "Need finding, Design alternatives, Prototyping, Evaluation",
       "Correct. Joyner's iterative design life cycle is Need finding → Design alternatives → Prototyping → Evaluation, then back to need finding (L2, Design life cycle)."
      ],
      [
       "Plan, Build, Test, Deploy",
       "Plan, Build, Test, Deploy is a generic software development cycle. Joyner's cycle is Need finding, Design alternatives, Prototyping, Evaluation (L2, Design life cycle)."
      ],
      [
       "Research, Wireframe, Code, Launch",
       "These are not Joyner's phases; Joyner has no coding or launch phase. His cycle is Need finding, Design alternatives, Prototyping, Evaluation (L2, Design life cycle)."
      ]
     ],
     "a": 1
    },
    {
     "q": "\"Primary research is done by someone else.\"",
     "o": [
      [
       "True",
       "Research done by someone else (books, journals) is secondary research. Primary research is research you conduct yourself, such as interviews or surveys (L2, Types by WHO)."
      ],
      [
       "False",
       "Correct. Primary research is research you conduct yourself."
      ]
     ],
     "a": 1,
     "src": "Exam 2024/25"
    },
    {
     "q": "Which is NOT a method of primary research?",
     "o": [
      [
       "Literature reviews",
       "Correct. Reading existing literature is secondary research."
      ],
      [
       "Focus groups",
       "Focus groups are primary research: you run them yourself with users. The lecture lists them with interviews, surveys, usability studies and observations (L2, Types by WHO)."
      ],
      [
       "Interviews",
       "Interviews are a primary method, since you conduct them yourself. Only the literature review relies on research done by someone else (L2, Types by WHO)."
      ],
      [
       "Surveys",
       "Surveys are a primary method: you design and run them yourself. Reading existing literature is the secondary method here (L2, Types by WHO)."
      ]
     ],
     "a": 0
    },
    {
     "q": "\"Focus groups and interviews are examples of primary research methods.\"",
     "o": [
      [
       "True",
       "Correct. Both are listed as common primary methods."
      ],
      [
       "False",
       "They are explicitly listed under primary research."
      ]
     ],
     "a": 0,
     "src": "Exam 2025/26"
    },
    {
     "q": "\"Analyzing academic papers and previous research studies is an example of secondary research.\"",
     "o": [
      [
       "True",
       "Correct. Using research done by someone else is secondary research."
      ],
      [
       "False",
       "Papers written by others are secondary sources."
      ]
     ],
     "a": 0,
     "src": "Exam 2025/26"
    },
    {
     "q": "\"Survey is a common method used in primary research.\"",
     "o": [
      [
       "True",
       "Correct. Surveys are listed among primary methods."
      ],
      [
       "False",
       "Surveys are one of the listed primary methods."
      ]
     ],
     "a": 0,
     "src": "Exam 2025/26"
    },
    {
     "q": "According to Google, user research takes place:",
     "o": [
      [
       "Only before design",
       "Too narrow: \"before design\" is only foundational research. Google says user research is continuous: before, during and after design (L2, Where is user research?)."
      ],
      [
       "Only after launch",
       "Too narrow: after launch is only post-launch research. Google says user research happens before, during and after the design phase (L2, Where is user research?)."
      ],
      [
       "Before, during and after the design phase",
       "Correct. Google calls it a continuous part of the life cycle."
      ],
      [
       "Only when there is budget",
       "The lecture never ties research to budget. Google treats it as a continuous part of the life cycle, before, during and after design (L2, Where is user research?)."
      ]
     ],
     "a": 2
    },
    {
     "q": "In the double diamond of design, which phase gives \"insight into the problem\"?",
     "o": [
      [
       "Discover",
       "Correct. Discover is the first phase and gives insight into the problem (L2, The double diamond of design)."
      ],
      [
       "Define",
       "Define is the phase that sets the area to focus upon, not insight into the problem."
      ],
      [
       "Develop",
       "Develop is the phase for potential solutions."
      ],
      [
       "Deliver",
       "Deliver is the last phase, giving solutions that work."
      ]
     ],
     "a": 0
    },
    {
     "q": "In the double diamond, what is the point between the two diamonds labelled?",
     "o": [
      [
       "Problem",
       "Problem is the label at the start of the first diamond."
      ],
      [
       "Problem Definition / Design Brief",
       "Correct. The middle point between the diamonds is labelled Problem Definition and Design Brief (L2, The double diamond of design)."
      ],
      [
       "Solution",
       "Solution is the label at the end of the second diamond."
      ],
      [
       "Final product",
       "Final product is the exit of the simple lifecycle model, not a label in the double diamond."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which of these is NOT one of the four basic activities of interaction design?",
     "o": [
      [
       "Discovering requirements",
       "This is activity 1 of the four basic activities."
      ],
      [
       "Prototyping alternative designs",
       "This is activity 3 of the four basic activities."
      ],
      [
       "Evaluating product and its user experience throughout",
       "This is activity 4 of the four basic activities."
      ],
      [
       "Writing the final user manual",
       "Correct. The four activities are discovering requirements, designing alternatives, prototyping alternative designs and evaluating; a user manual is not one of them (L2, Four basic activities of interaction design)."
      ]
     ],
     "a": 3
    },
    {
     "q": "The simple interaction design lifecycle model exemplifies which approach?",
     "o": [
      [
       "A user-centered design approach",
       "Correct. The slide states the model exemplifies a user-centered design approach (L2, A simple interaction design lifecycle model)."
      ],
      [
       "A technology-centered approach",
       "The slide says user-centered, not technology-centered."
      ],
      [
       "A one-pass approach with no iteration",
       "The diagram is full of loops back to earlier activities, so it is iterative."
      ],
      [
       "The Google Design Sprint approach",
       "Google Design Sprints is presented as another, separate lifecycle model."
      ]
     ],
     "a": 0
    },
    {
     "q": "In the simple lifecycle model, from which activity does the arrow to the final product leave?",
     "o": [
      [
       "Discovering requirements",
       "Discovering requirements is where the process enters, not where it leaves."
      ],
      [
       "Designing alternatives",
       "Designing alternatives leads to prototyping, not to the final product."
      ],
      [
       "Prototyping",
       "Prototyping leads to evaluating, not directly to the final product."
      ],
      [
       "Evaluating",
       "Correct. The arrow to the final product leaves from Evaluating; other arrows from Evaluating loop back (L2, A simple interaction design lifecycle model)."
      ]
     ],
     "a": 3
    },
    {
     "q": "Google Design Sprints (Knapp et al., 2016) has which five steps, in order?",
     "o": [
      [
       "Discover, Define, Develop, Deliver, Test",
       "Discover, Define, Develop, Deliver are the double diamond phases."
      ],
      [
       "Unpack, Sketch, Decide, Prototype, Test",
       "Correct. The Google Design Sprint steps are 1 Unpack, 2 Sketch, 3 Decide, 4 Prototype, 5 Test, then iterate (L2, Another lifecycle model: Google Design Sprints)."
      ],
      [
       "Need finding, Design alternative, Prototyping, Evaluation, Deliver",
       "The first four are Joyner's phases, not Google Design Sprints."
      ],
      [
       "Sketch, Unpack, Prototype, Decide, Test",
       "These are the right words in the wrong order; Unpack comes first and Decide comes before Prototype."
      ]
     ],
     "a": 1
    },
    {
     "q": "Joyner's design life cycle is an iterative process with how many phases?",
     "o": [
      [
       "Three",
       "Three is the number of components of the interaction design process (user research, design and prototyping, evaluation)."
      ],
      [
       "Four",
       "Correct. Joyner's cycle has four phases: need finding, design alternative, prototyping, evaluation (L2, Design life cycle (according to Joyner))."
      ],
      [
       "Five",
       "Five is the number of steps in Google Design Sprints."
      ],
      [
       "Two",
       "Two is the number of diamonds in the double diamond."
      ]
     ],
     "a": 1
    },
    {
     "q": "According to the lecture, how many distinct types of users are there for smartphone apps (Sha Zhao et al, 2016)?",
     "o": [
      [
       "382",
       "Correct. The slide cites 382 distinct types of users for smartphone apps (L2, Who are the users/stakeholders?)."
      ],
      [
       "38",
       "The figure on the slide is 382, not 38."
      ],
      [
       "2016",
       "2016 is the year of the study, not the number of user types."
      ],
      [
       "3,820",
       "The figure on the slide is 382, not 3,820."
      ]
     ],
     "a": 0
    },
    {
     "q": "\"Stakeholders are a smaller group than the direct users of a product.\"",
     "o": [
      [
       "True",
       "The slide says the opposite: stakeholders are larger than the group of direct users."
      ],
      [
       "False",
       "Correct. Stakeholders are larger than the group of direct users (L2, Who are the users/stakeholders?)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Why is the user of many products described as \"everybody\"?",
     "o": [
      [
       "Because users always know what is possible",
       "The slide says users rarely know what is possible; this is unrelated."
      ],
      [
       "Because many products are intended for use by large sections of the population",
       "Correct. That is the reason the slide gives (L2, Who are the users/stakeholders?)."
      ],
      [
       "Because there are exactly 382 users",
       "382 is the number of distinct user types for smartphone apps, not a reason the user is everybody."
      ],
      [
       "Because stakeholders and users are the same group",
       "Stakeholders are larger than the group of direct users, so they are not the same group."
      ]
     ],
     "a": 1
    },
    {
     "q": "Users rarely know what is possible. What does the lecture say to do instead?",
     "o": [
      [
       "Ask users to list all the features they want and build exactly that",
       "This ignores the slide's point that users rarely know what is possible."
      ],
      [
       "Explore the problem space, investigate who are the users, and investigate user activities to see what can be improved",
       "Correct. These are the three things the slide lists under \"Instead\" (L2, What are the users' needs?)."
      ],
      [
       "Rely on the designer's guesses",
       "The lecture stresses working with users rather than guessing."
      ],
      [
       "Copy a competitor's product exactly",
       "The slide lists seeking inspiration from similar products as a source of alternatives, not copying, and this is not the answer to finding needs."
      ]
     ],
     "a": 1
    },
    {
     "q": "\"Humans tend to stick with something that works, and considering alternatives helps identify better designs.\"",
     "o": [
      [
       "True",
       "Correct. Both points appear on the slide about generating alternatives (L2, How to generate alternatives)."
      ],
      [
       "False",
       "The slide states both points: humans tend to stick with something that works, and considering alternatives helps identify better designs."
      ]
     ],
     "a": 0
    },
    {
     "q": "Which of these is NOT listed as a source of alternative designs?",
     "o": [
      [
       "'Flair and creativity': research and synthesis",
       "This is listed as a source of alternative designs."
      ],
      [
       "Cross-fertilization of ideas from different perspectives",
       "This is listed as a source of alternative designs."
      ],
      [
       "Users can generate different designs",
       "This is listed as a source of alternative designs."
      ],
      [
       "Technical feasibility",
       "Correct. Technical feasibility is a criterion for choosing among alternatives (L2, How to choose among alternatives), not one of the sources listed under 'Where do alternative designs come from?' (L2, How to generate alternatives)."
      ]
     ],
     "a": 3
    },
    {
     "q": "When seeking inspiration for alternative designs, where should you look?",
     "o": [
      [
       "Only at similar products in the same domain",
       "The slide also includes different products and domain."
      ],
      [
       "Similar products and domain, or different products and domain",
       "Correct. The slide says seek inspiration from similar products and domain, or different products and domain (L2, How to generate alternatives)."
      ],
      [
       "Only at static documentation",
       "Static documentation is mentioned when choosing alternatives (prototypes are preferred), not as inspiration."
      ],
      [
       "Nowhere; inspiration should come from the designer alone",
       "The slide lists seeking inspiration from products and domains, and also says users can generate designs."
      ]
     ],
     "a": 1
    },
    {
     "q": "When evaluating alternatives with users or peers, why use prototypes rather than static documentation?",
     "o": [
      [
       "Because prototypes are cheaper to print",
       "Cost is not the reason given on the slide."
      ],
      [
       "Because behavior is key",
       "Correct. The slide says prototypes, not static documentation, because behavior is key (L2, How to choose among alternatives)."
      ],
      [
       "Because users rarely know what is possible",
       "This is the point about finding users' needs, not about evaluating alternatives."
      ],
      [
       "Because static documentation is not technically feasible",
       "Technical feasibility is a separate criterion; the reason given is that behavior is key."
      ]
     ],
     "a": 1
    },
    {
     "q": "What does the lecture say about quality thresholds?",
     "o": [
      [
       "All stakeholder groups share the same quality threshold",
       "The slide says different stakeholder groups have different quality thresholds."
      ],
      [
       "Different stakeholder groups have different quality thresholds, and usability and user experience goals lead to relevant criteria",
       "Correct. Both points are listed under quality thresholds (L2, How to choose among alternatives)."
      ],
      [
       "Quality thresholds are only set by the technical team",
       "The slide links thresholds to stakeholder groups and usability and user experience goals, not only the technical team."
      ],
      [
       "Quality thresholds replace evaluation with users",
       "Quality thresholds are listed alongside evaluation with users or peers, not as a replacement."
      ]
     ],
     "a": 1
    },
    {
     "q": "Interaction design (when choosing among alternatives) focuses on which kind of behavior?",
     "o": [
      [
       "Internal code structure",
       "The slide says externally-visible behavior, not internal structure."
      ],
      [
       "Externally-visible and measurable behavior",
       "Correct. The slide states interaction design focuses on externally-visible and measurable behavior (L2, How to choose among alternatives)."
      ],
      [
       "Hidden, unmeasurable behavior",
       "This is the opposite of what the slide says."
      ],
      [
       "Only the visual colours of the interface",
       "The slide speaks of visible and measurable behavior, not just colours."
      ]
     ],
     "a": 1
    },
    {
     "q": "The interaction design process involves three components. Which list is correct?",
     "o": [
      [
       "User research; design and prototyping; evaluation (improvement)",
       "Correct. These are the three components on the Remember slide (L2, Remember: the interaction design process)."
      ],
      [
       "Discover; define; deliver",
       "These are three of the four double diamond phases."
      ],
      [
       "Unpack; sketch; test",
       "These are three of the five Google Design Sprint steps."
      ],
      [
       "Need finding; coding; deployment",
       "Need finding is a Joyner phase; coding and deployment are not on the slides."
      ]
     ],
     "a": 0
    },
    {
     "q": "According to the lecture, what is key in interaction design?",
     "o": [
      [
       "Generating alternatives and choosing between them",
       "Correct. The slide states that generating alternatives and choosing between them is key (L2, What is involved in interaction design?)."
      ],
      [
       "Building the first idea as quickly as possible",
       "The slide stresses alternatives; humans sticking with one thing that works is presented as a tendency to overcome."
      ],
      [
       "Avoiding conflicting requirements entirely",
       "The slide says interaction design involves how to balance conflicting requirements, not avoid them."
      ],
      [
       "Writing static documentation",
       "Prototypes are preferred over static documentation because behavior is key."
      ]
     ],
     "a": 0
    }
   ]
  },
  {
   "n": 3,
   "title": "Cognition: Attention and Perception",
   "notes": [
    {
     "h": "What is cognition?",
     "pts": [
      "<b>Cognition</b> covers thinking, remembering, learning, daydreaming, decision-making, seeing, reading, talking, writing…",
      "Ways of classifying cognition at a higher level: <b>fast vs slow thinking (Kahneman, 2011)</b>."
     ]
    },
    {
     "h": "Activity: which involves fast vs slow thinking?",
     "pts": [
      "The slide asks which of these involves fast thinking and which involves slow thinking:",
      "2 + 2 =",
      "21 × 29 =",
      "What color eyes do you have?",
      "How many colors are there in the rainbow?",
      "How many months in the year have 31 days?",
      "What is the name of the first school you attended?",
      "The slide gives no answers; this is a question for class discussion."
     ]
    },
    {
     "h": "How can understanding cognition help?",
     "pts": [
      "Provides knowledge about what users can and cannot be expected to do.",
      "Identifies and explains the nature and causes of problems that users encounter.",
      "Provides theories, modeling tools, guidance, and methods that can lead to the design of better interactive products."
     ]
    },
    {
     "h": "Cognitive processes",
     "pts": [
      "1) Attention",
      "2) Perception",
      "3) Memory",
      "4) Learning",
      "5) Reading, speaking and listening",
      "6) Problem-solving, planning, reasoning and decision-making"
     ]
    },
    {
     "h": "Attention",
     "pts": [
      "<b>Attention</b> allows us to focus on information that is relevant to what we are doing.",
      "Involves audio and/or visual senses.",
      "There is <b>focused</b> and <b>divided</b> attention.",
      "Design recommendation: information at the interface should be structured to capture users' attention, for example, use perceptual boundaries (windows) and colors."
     ]
    },
    {
     "h": "Activity: find the hotel price (two screens)",
     "pts": [
      "<b>1st screen</b> (task: find the price for a double room at the Quality Inn in Pennsylvania): a dark screen headed \"Pennsylvania\" with entries written one after another, each as \"City Motel/Hotel: Name\" followed on the next line by the phone number and S (single) and D (double) prices, e.g. \"Bedford Motel/Hotel: Crinaline Courts (814) 623-9511 S: $118 D: $120\".",
      "Entries on the 1st screen: Bedford (Crinaline Courts, Holiday Inn, Midway, Penn Manor, Quality Inn, Terrace), Bradley (De Soto, Holiday House, Holiday Inn), Breezewood (Best Western Plaza, Motel 70). The target line is \"Bedford Motel/Hotel: Quality Inn (814) 623-5189 S: $123 D: $128\".",
      "<b>2nd screen</b> (task: find the price of a double room at the Holiday Inn in Columbia): a dark screen headed \"South Carolina\" laid out in columns: City, Motel/Hotel, Area code, Phone, Rates (Single, Double), with the Charleston rows grouped together and the Columbia rows grouped below them.",
      "Charleston hotels: Best Western, Days Inn, Holiday Inn N, Holiday Inn SW, Howard Johnsons, Ramada Inn, Sheraton Inn. Columbia hotels: Best Western, Carolina Inn, Days Inn, Holiday Inn NW, Howard Johnsons, Quality Inn, Ramada Inn, Vagabond Inn. The target row is \"Columbia, Holiday Inn NW, 803, 794-9440, $132, $139\".",
      "<b>Tullis (1987)</b> found that the two screens produced quite different results: the 1st screen took an average of <b>5.5 seconds</b> to search; the 2nd screen took <b>3.2 seconds</b> to search.",
      "Why, since both displays have the same density of information? <b>Spacing</b>:",
      "In the 1st screen, the information is bunched up together, making it hard to search.",
      "In the 2nd screen, the characters are grouped into vertical categories of information, making it easier."
     ],
     "table": [
      [
       "1st screen",
       "2nd screen"
      ],
      [
       "Information bunched up together",
       "Characters grouped into vertical categories"
      ],
      [
       "Hard to search",
       "Easier to search"
      ],
      [
       "Average 5.5 seconds to search",
       "3.2 seconds to search"
      ]
     ]
    },
    {
     "h": "Multitasking and attention",
     "pts": [
      "Is it possible to perform multiple tasks without one or more of them being detrimentally affected?",
      "<b>Multitasking</b> can cause people to lose their train of thought, make errors, and need to start over.",
      "<b>Ophir et al. (2009)</b> compared heavy vs light multitaskers:",
      "Heavy multitaskers were more prone to being distracted than those who infrequently multitask.",
      "Heavy multitaskers are easily distracted and find it difficult to filter irrelevant information."
     ]
    },
    {
     "h": "Multitasking at work",
     "pts": [
      "It is increasingly common for workers to multitask.",
      "For example, hospital workers have to attend to multiple screens in an operating room that provide new kinds of real-time information.",
      "This requires the clinician's constant attention to check if any data is unusual or anomalous.",
      "There is a need to develop new attention and scanning strategies."
     ]
    },
    {
     "h": "How to generate alternatives",
     "pts": [
      "Humans tend to stick with something that works.",
      "Considering alternatives helps identify better designs.",
      "Where do alternative designs come from?",
      "1) <b>'Flair and creativity'</b>: research and synthesis.",
      "2) <b>Cross-fertilization of ideas</b> from different perspectives.",
      "3) <b>Users can generate different designs</b>.",
      "4) <b>Seek inspiration</b>: similar products and domain, or different products and domain."
     ]
    },
    {
     "h": "Is it OK to use a phone when driving? No!",
     "pts": [
      "The question is shown with a picture of a woman driving a car with one hand on the steering wheel while looking at the phone in her other hand.",
      "The answer is <b>No!</b>",
      "Driving is very demanding.",
      "Drivers are prone to being distracted.",
      "There is a significant chance of causing accidents.",
      "Drivers' reaction times are longer to external events when talking on the phone in a car (<b>Caird et al., 2018</b>).",
      "Drivers using their phones rely more on their expectations about what is likely to happen next, as conducting a conversation takes up their attention.",
      "Response time is slower to unexpected events (<b>Briggs et al., 2018</b>).",
      "Drivers often try to imagine what the other person's face is like (the person to whom they are speaking). Doing so competes with the processing resources needed to enable them to notice and react to what is in front of them."
     ]
    },
    {
     "h": "Are hands-free phones safer to use when driving?",
     "pts": [
      "<b>No</b>, as the same type of cognitive processing is happening when talking.",
      "The same thing happens when talking with a front seat passenger.",
      "But both (driver and passenger) can stop in mid-sentence if a hazard is spotted, allowing the driver to switch immediately to the road.",
      "So, it is less dangerous talking to a front seat passenger than to a remote person.",
      "A remote person on the end of a phone is not privy to what the driver is seeing and will carry on the conversation when there is a hazard.",
      "This makes it difficult for the driver to switch all their attention to the road."
     ]
    },
    {
     "h": "Design implications for attention",
     "pts": [
      "Context: make information <b>salient</b> when it needs to be attended to at a given stage of a task.",
      "Use techniques to achieve this, for example, color, ordering, spacing, underlining, sequencing, and animation.",
      "Avoid cluttering visual interfaces with too much information.",
      "Consider designing different ways to support effective switching and returning to an interface."
     ]
    },
    {
     "h": "Perception",
     "pts": [
      "<b>Perception</b>: how information is acquired from the world and transformed into experiences.",
      "Obvious implication is to design representations that are readily perceivable, for instance:",
      "Text should be legible.",
      "Icons should be easy to distinguish and read."
     ]
    },
    {
     "h": "Activity: color contrast vs borders and white space",
     "pts": [
      "<b>1st screen: \"Is color contrast good? Find Italian\"</b>: a 4 × 4 grid of groups, each group a list of six names (e.g. \"Black Hills Forest, Cheyenne River, Social Science, South San Jose, Badlands Park, Juvenile Justice\"). The groups are separated only by color contrast (alternating light blue and white backgrounds). \"Italian\" is the second item of the group in the third row, first column (Performing Arts, Italian, Coaches, McKees Rocks, Glenwood Springs, Urban Affairs).",
      "<b>2nd screen: \"Are borders and white space better? Find French\"</b>: a 4 × 4 grid of groups of six names (e.g. \"Webmaster, Russian, Athletics, Go Shockers, Degree Options, Newsletter\"), each group enclosed in a border and separated from the others by white space. \"French\" is in the group in the third row, third column (Staff, Aerospace, Choral Dept., Alberg Hall, French, Spanish).",
      "<b>Weller (2004)</b> found people took less time to locate items for information that was grouped using a <b>border</b> (2nd screen) compared with using <b>color contrast</b> (1st screen).",
      "Some argue that too much white space on web pages is detrimental to the search process: it makes it hard to find information.",
      "Do you agree? (question for discussion; the slide gives no answer)"
     ]
    },
    {
     "h": "Activity: which is the easiest to read and why?",
     "pts": [
      "The slide shows the same text, \"What is the time?\", in five boxes:",
      "1) Red text on a dark green textured (marbled) background.",
      "2) Yellow text on an orange background.",
      "3) Red text on an orange background.",
      "4) Black text on a white background.",
      "5) White text on a yellow (mustard) background.",
      "The slide asks which is easiest to read and why, and gives no answer; it is a question for discussion."
     ]
    },
    {
     "h": "Design implications for perception",
     "pts": [
      "Icons should enable users to <b>distinguish</b> their meaning readily.",
      "<b>Bordering and spacing</b> are effective visual ways of grouping information.",
      "Sounds should be audible and distinguishable.",
      "Research proper <b>color contrast</b> techniques when designing an interface:",
      "Yellow on black or blue is fine.",
      "Yellow on green or white is a no-no."
     ]
    }
   ],
   "cards": [
    [
     "What is cognition?",
     "Thinking, remembering, learning, daydreaming, decision-making, seeing, reading, talking, writing…"
    ],
    [
     "A higher-level way of classifying cognition",
     "Fast vs slow thinking (Kahneman, 2011)."
    ],
    [
     "How can understanding cognition help? (3)",
     "1) Knowledge about what users can and cannot be expected to do. 2) Identifies and explains the nature and causes of problems users encounter. 3) Theories, modeling tools, guidance and methods leading to better interactive products."
    ],
    [
     "Cognitive processes (6)",
     "Attention; perception; memory; learning; reading, speaking and listening; problem-solving, planning, reasoning and decision-making."
    ],
    [
     "Attention",
     "Allows us to focus on information relevant to what we are doing. Involves audio and/or visual senses. Focused and divided attention."
    ],
    [
     "Attention design recommendation",
     "Structure information at the interface to capture users' attention, e.g. perceptual boundaries (windows) and colors."
    ],
    [
     "Tullis (1987) results",
     "1st screen (bunched up): average 5.5 seconds to search. 2nd screen (grouped into vertical categories): 3.2 seconds."
    ],
    [
     "Why was Tullis's 2nd screen faster though both had the same density?",
     "Spacing: the 1st screen's information is bunched up; the 2nd groups characters into vertical categories of information."
    ],
    [
     "Ophir et al. (2009)",
     "Compared heavy vs light multitaskers: heavy multitaskers were more prone to distraction and found it difficult to filter irrelevant information."
    ],
    [
     "Effects of multitasking",
     "People lose their train of thought, make errors, and need to start over."
    ],
    [
     "Multitasking at work example",
     "Hospital workers attending to multiple screens of real-time information in an operating room; needs constant attention and new attention and scanning strategies."
    ],
    [
     "Where do alternative designs come from? (4)",
     "1) 'Flair and creativity': research and synthesis. 2) Cross-fertilization of ideas from different perspectives. 3) Users can generate different designs. 4) Seek inspiration: similar or different products and domain."
    ],
    [
     "Caird et al. (2018)",
     "Drivers' reaction times to external events are longer when talking on the phone in a car."
    ],
    [
     "Briggs et al. (2018)",
     "Response time is slower to unexpected events (drivers using phones)."
    ],
    [
     "Are hands-free phones safer when driving?",
     "No, the same type of cognitive processing happens when talking."
    ],
    [
     "Why is a front seat passenger less dangerous than a remote caller?",
     "Both can stop mid-sentence when a hazard is spotted; a remote person is not privy to what the driver sees and carries on talking during a hazard."
    ],
    [
     "Design implications for attention (4)",
     "Make information salient when needed at a stage of a task; use color, ordering, spacing, underlining, sequencing, animation; avoid clutter; support effective switching and returning to an interface."
    ],
    [
     "Perception",
     "How information is acquired from the world and transformed into experiences."
    ],
    [
     "Perception design examples",
     "Text should be legible; icons should be easy to distinguish and read."
    ],
    [
     "Weller (2004)",
     "People took less time to locate items grouped using a border (2nd screen) than using color contrast (1st screen)."
    ],
    [
     "Argument about white space",
     "Some argue too much white space on web pages is detrimental to search: it makes information hard to find."
    ],
    [
     "Color contrast rule",
     "Yellow on black or blue is fine; yellow on green or white is a no-no."
    ],
    [
     "Design implications for perception (4)",
     "Icons distinguishable; bordering and spacing group information; sounds audible and distinguishable; research proper color contrast."
    ]
   ],
   "qa": [
    [
     "What is cognition, and how can understanding cognition help in design?",
     "Cognition is thinking, remembering, learning, daydreaming, decision-making, seeing, reading, talking, writing… It can be classified at a higher level as fast vs slow thinking (Kahneman, 2011). Understanding it helps because it: 1) provides knowledge about what users can and cannot be expected to do; 2) identifies and explains the nature and causes of problems that users encounter; 3) provides theories, modeling tools, guidance, and methods that can lead to the design of better interactive products."
    ],
    [
     "List the cognitive processes.",
     "1) Attention 2) Perception 3) Memory 4) Learning 5) Reading, speaking and listening 6) Problem-solving, planning, reasoning and decision-making."
    ],
    [
     "Describe Tullis's (1987) study and explain its result.",
     "Tullis compared two screens of hotel information with the same density of information. The 1st screen took an average of 5.5 seconds to search and the 2nd took 3.2 seconds. The reason is spacing: in the 1st screen the information is bunched up together, making it hard to search; in the 2nd the characters are grouped into vertical categories of information, making it easier."
    ],
    [
     "Discuss multitasking and attention, including the findings of Ophir et al. (2009).",
     "Multitasking can cause people to lose their train of thought, make errors, and need to start over. Ophir et al. (2009) compared heavy vs light multitaskers: heavy multitaskers were more prone to being distracted than those who infrequently multitask, and are easily distracted and find it difficult to filter irrelevant information. At work, multitasking is increasingly common, e.g. hospital workers attend to multiple screens of real-time information in an operating room, which requires constant attention to check for unusual or anomalous data, so new attention and scanning strategies are needed."
    ],
    [
     "Is it OK to use a phone when driving? Are hands-free phones safer? Explain.",
     "No. 1) Driving is very demanding. 2) Drivers are prone to being distracted. 3) There is a significant chance of causing accidents. 4) Reaction times to external events are longer when talking on the phone (Caird et al., 2018). 5) Drivers on the phone rely more on expectations about what will happen next, as the conversation takes up their attention. 6) Response time is slower to unexpected events (Briggs et al., 2018). 7) Drivers imagine the other person's face, which competes with the processing resources needed to notice and react to what is in front of them. Hands-free phones are not safer, as the same type of cognitive processing happens when talking. Talking to a front seat passenger is less dangerous, because both can stop mid-sentence when a hazard is spotted, while a remote person is not privy to what the driver sees and carries on talking, making it difficult for the driver to switch all their attention to the road."
    ],
    [
     "What are the design implications for attention?",
     "1) Context: make information salient when it needs to be attended to at a given stage of a task. 2) Use techniques such as color, ordering, spacing, underlining, sequencing, and animation. 3) Avoid cluttering visual interfaces with too much information. 4) Consider designing different ways to support effective switching and returning to an interface."
    ],
    [
     "Define perception and give its design implications, including Weller's (2004) finding.",
     "Perception is how information is acquired from the world and transformed into experiences. Representations should be readily perceivable, e.g. text legible and icons easy to distinguish and read. Weller (2004) found people located items faster when information was grouped using a border than using color contrast. Design implications: 1) icons should enable users to distinguish their meaning readily; 2) bordering and spacing are effective visual ways of grouping information; 3) sounds should be audible and distinguishable; 4) research proper color contrast techniques: yellow on black or blue is fine, yellow on green or white is a no-no."
    ],
    [
     "Where do alternative designs come from?",
     "Humans tend to stick with something that works, but considering alternatives helps identify better designs. Alternatives come from: 1) 'Flair and creativity': research and synthesis; 2) Cross-fertilization of ideas from different perspectives; 3) Users can generate different designs; 4) Seek inspiration: similar products and domain, or different products and domain."
    ]
   ],
   "quiz": [
    {
     "q": "Which way of classifying cognition at a higher level is given in the lecture?",
     "o": [
      [
       "Fast vs slow thinking (Kahneman, 2011)",
       "Correct. The slide classifies cognition at a higher level as fast vs slow thinking, citing Kahneman (2011). (L3, What is cognition?)"
      ],
      [
       "Heavy vs light multitasking (Ophir et al., 2009)",
       "Ophir et al. (2009) compared heavy and light multitaskers in the multitasking section; it is not a way of classifying cognition."
      ],
      [
       "Focused vs divided thinking (Tullis, 1987)",
       "Focused and divided are types of attention, and Tullis (1987) is the screen search study, not a classification of cognition."
      ],
      [
       "Border vs color thinking (Weller, 2004)",
       "Weller (2004) compared grouping by border and by color contrast in perception; it is not a classification of cognition."
      ]
     ],
     "a": 0
    },
    {
     "q": "Which of the following is NOT listed as one of the cognitive processes?",
     "o": [
      [
       "Memory",
       "Memory is the third cognitive process listed on the slide."
      ],
      [
       "Prototyping",
       "Correct. The cognitive processes are attention, perception, memory, learning, reading/speaking/listening, and problem-solving/planning/reasoning/decision-making; prototyping is not one of them. (L3, Cognitive processes)"
      ],
      [
       "Perception",
       "Perception is the second cognitive process listed on the slide."
      ],
      [
       "Problem-solving, planning, reasoning and decision-making",
       "This is the sixth cognitive process listed on the slide."
      ]
     ],
     "a": 1
    },
    {
     "q": "\"Understanding cognition identifies and explains the nature and causes of problems that users encounter.\"",
     "o": [
      [
       "True",
       "Correct. This is one of the three ways understanding cognition helps, alongside knowing what users can and cannot do and providing theories, tools and methods. (L3, How can understanding cognition help?)"
      ],
      [
       "False",
       "The slide lists exactly this as one of the ways understanding cognition helps."
      ]
     ],
     "a": 0
    },
    {
     "q": "According to the lecture, attention:",
     "o": [
      [
       "Is how information is acquired from the world and transformed into experiences",
       "That is the definition of perception, not attention."
      ],
      [
       "Involves only the visual senses",
       "The slide says attention involves audio and/or visual senses, not only visual."
      ],
      [
       "Allows us to focus on information that is relevant to what we are doing",
       "Correct. This is the slide's definition of attention, which involves audio and/or visual senses and can be focused or divided. (L3, Attention)"
      ],
      [
       "Is the ability to perform many tasks without any of them being affected",
       "The lecture asks whether this is possible and says multitasking causes errors and lost train of thought; it is not the definition of attention."
      ]
     ],
     "a": 2
    },
    {
     "q": "In Tullis's (1987) study, how long did the 2nd screen take to search?",
     "o": [
      [
       "5.5 seconds",
       "5.5 seconds was the average for the 1st screen, where information was bunched up together."
      ],
      [
       "3.2 seconds",
       "Correct. The 1st screen took an average of 5.5 seconds and the 2nd screen took 3.2 seconds. (L3, Activity: find the hotel price (two screens))"
      ],
      [
       "2.2 seconds",
       "This number does not appear on the slides; the 2nd screen took 3.2 seconds."
      ],
      [
       "8.7 seconds",
       "This number does not appear on the slides; the two times were 5.5 s and 3.2 s."
      ]
     ],
     "a": 1
    },
    {
     "q": "Both of Tullis's screens had the same density of information. Why was the 2nd screen faster to search?",
     "o": [
      [
       "It used brighter colors",
       "The slide does not mention color as the reason; it gives spacing."
      ],
      [
       "It contained fewer hotels",
       "Both displays had the same density of information; the reason given is spacing."
      ],
      [
       "Spacing: characters were grouped into vertical categories of information",
       "Correct. The 1st screen bunches information together, while the 2nd groups characters into vertical categories, making searching easier. (L3, Activity: find the hotel price (two screens))"
      ],
      [
       "It used borders around each group",
       "Borders are the grouping method in Weller's (2004) activity, not Tullis's screens."
      ]
     ],
     "a": 2
    },
    {
     "q": "What did Ophir et al. (2009) find when comparing heavy and light multitaskers?",
     "o": [
      [
       "Heavy multitaskers were better at filtering irrelevant information",
       "The opposite: heavy multitaskers find it difficult to filter irrelevant information."
      ],
      [
       "There was no difference between the two groups",
       "The study found heavy multitaskers were more prone to being distracted."
      ],
      [
       "Light multitaskers were more easily distracted",
       "It was heavy multitaskers, not light ones, who were more prone to distraction."
      ],
      [
       "Heavy multitaskers were more prone to being distracted than those who infrequently multitask",
       "Correct. Heavy multitaskers are easily distracted and find it difficult to filter irrelevant information. (L3, Multitasking and attention)"
      ]
     ],
     "a": 3
    },
    {
     "q": "\"Multitasking can cause people to lose their train of thought, make errors, and need to start over.\"",
     "o": [
      [
       "True",
       "Correct. The slide states these exact effects of multitasking. (L3, Multitasking and attention)"
      ],
      [
       "False",
       "The slide states that multitasking can cause exactly these problems."
      ]
     ],
     "a": 0
    },
    {
     "q": "Which example of multitasking at work is given in the lecture?",
     "o": [
      [
       "Hospital workers attending to multiple screens in an operating room",
       "Correct. They must give constant attention to real-time information to check if any data is unusual or anomalous. (L3, Multitasking at work)"
      ],
      [
       "Truck drivers using navigation apps",
       "This is not the slide's example; the multitasking-at-work example is hospital workers in an operating room."
      ],
      [
       "Pilots monitoring cockpit displays",
       "Pilots are not mentioned in the lecture; the example is hospital workers."
      ],
      [
       "Students using several browser tabs",
       "Students are not the slide's example; the example is hospital workers in an operating room."
      ]
     ],
     "a": 0
    },
    {
     "q": "Which is NOT one of the sources of alternative designs listed in the lecture?",
     "o": [
      [
       "'Flair and creativity': research and synthesis",
       "This is the first source listed on the slide."
      ],
      [
       "Cross-fertilization of ideas from different perspectives",
       "This is the second source listed on the slide."
      ],
      [
       "Sticking with the design that already works",
       "Correct. The slide says humans tend to stick with something that works, but considering alternatives helps identify better designs; it is not listed as a source. Alternative designs come from 'flair and creativity', cross-fertilization of ideas, users generating different designs, and seeking inspiration. (L3, How to generate alternatives)"
      ],
      [
       "Seek inspiration: similar or different products and domain",
       "This is the fourth source listed on the slide."
      ]
     ],
     "a": 2
    },
    {
     "q": "Which study found that drivers' reaction times to external events are longer when talking on the phone in a car?",
     "o": [
      [
       "Tullis (1987)",
       "Tullis (1987) studied search time on two hotel information screens."
      ],
      [
       "Caird et al. (2018)",
       "Correct. The slide cites Caird et al. (2018) for longer reaction times when talking on the phone in a car. (L3, Is it OK to use a phone when driving? No!)"
      ],
      [
       "Weller (2004)",
       "Weller (2004) studied grouping information with borders vs color contrast."
      ],
      [
       "Ophir et al. (2009)",
       "Ophir et al. (2009) compared heavy and light multitaskers."
      ]
     ],
     "a": 1
    },
    {
     "q": "\"Hands-free phones are safe to use when driving because the driver's hands stay on the wheel.\"",
     "o": [
      [
       "True",
       "The slide says no: the same type of cognitive processing is happening when talking, so hands-free does not make it safer."
      ],
      [
       "False",
       "Correct. Hands-free phones are not safer, as the same type of cognitive processing is happening when talking. (L3, Are hands-free phones safer to use when driving?)"
      ]
     ],
     "a": 1
    },
    {
     "q": "Why is talking to a front seat passenger less dangerous than talking to a remote person on the phone?",
     "o": [
      [
       "The passenger talks more quietly",
       "Volume is not mentioned; the reason is that the passenger can see the hazard and stop talking."
      ],
      [
       "Talking to a passenger needs no cognitive processing",
       "The slide says the same thing (same processing) happens when talking with a front seat passenger."
      ],
      [
       "Both can stop mid-sentence when a hazard is spotted, while a remote person is not privy to what the driver sees",
       "Correct. The remote person carries on the conversation during a hazard, making it hard for the driver to switch all attention to the road. (L3, Are hands-free phones safer to use when driving?)"
      ],
      [
       "The passenger can take over the steering wheel",
       "This is not stated; the reason is that the passenger can stop mid-sentence when a hazard is spotted."
      ]
     ],
     "a": 2
    },
    {
     "q": "Which is a design implication for attention?",
     "o": [
      [
       "Fill visual interfaces with as much information as possible",
       "The slide says the opposite: avoid cluttering visual interfaces with too much information."
      ],
      [
       "Make information salient when it needs to be attended to at a given stage of a task",
       "Correct. Use techniques such as color, ordering, spacing, underlining, sequencing, and animation. (L3, Design implications for attention)"
      ],
      [
       "Avoid animation and color in all interfaces",
       "Color and animation are listed as techniques to make information salient."
      ],
      [
       "Prevent users from switching away from an interface",
       "The slide says to support effective switching and returning to an interface."
      ]
     ],
     "a": 1
    },
    {
     "q": "Perception is defined in the lecture as:",
     "o": [
      [
       "How information is acquired from the world and transformed into experiences",
       "Correct. This is the slide's definition; the obvious implication is to design readily perceivable representations. (L3, Perception)"
      ],
      [
       "Focusing on information that is relevant to what we are doing",
       "That is the definition of attention."
      ],
      [
       "Thinking, remembering, learning and daydreaming",
       "These are examples of cognition in general."
      ],
      [
       "Performing multiple tasks at the same time",
       "That is multitasking."
      ]
     ],
     "a": 0
    },
    {
     "q": "What did Weller (2004) find?",
     "o": [
      [
       "People located items faster when grouped by color contrast than by borders",
       "This reverses the finding: borders (2nd screen) were faster than color contrast (1st screen)."
      ],
      [
       "Too much white space always slows search",
       "This is an argument 'some' make, followed by \"Do you agree?\"; it is not Weller's finding."
      ],
      [
       "People took less time to locate items grouped using a border than using color contrast",
       "Correct. Weller (2004) found grouping with a border (2nd screen) beat color contrast (1st screen). (L3, Activity: color contrast vs borders and white space)"
      ],
      [
       "Bunched up information took 5.5 seconds to search",
       "That is Tullis's (1987) finding for the 1st hotel screen."
      ]
     ],
     "a": 2
    },
    {
     "q": "Which color combination does the lecture call \"a no-no\"?",
     "o": [
      [
       "Yellow on black",
       "The slide says yellow on black is fine."
      ],
      [
       "Yellow on blue",
       "The slide says yellow on blue is fine."
      ],
      [
       "Yellow on green",
       "Correct. Yellow on green or white is a no-no, while yellow on black or blue is fine. (L3, Design implications for perception)"
      ],
      [
       "Black on white",
       "The slide does not call black on white a no-no; the no-no combinations are yellow on green or white."
      ]
     ],
     "a": 2
    },
    {
     "q": "\"Bordering and spacing are effective visual ways of grouping information.\"",
     "o": [
      [
       "True",
       "Correct. This is one of the design implications for perception. (L3, Design implications for perception)"
      ],
      [
       "False",
       "The slide lists this statement as a design implication."
      ]
     ],
     "a": 0
    }
   ]
  },
  {
   "n": 4,
   "title": "Cognition (part 2): memory, learning, language and reflective cognition",
   "notes": [
    {
     "h": "Memory",
     "pts": [
      "<b>Memory</b> involves recalling various kinds of knowledge that allow people to act appropriately, for example recognizing someone's face or remembering someone's name.",
      "We first <b>encode</b> and then <b>retrieve</b> knowledge.",
      "We don't remember everything: memory involves <b>filtering</b> and processing what is attended to.",
      "<b>Context</b> is important as to how we remember (that is, where, when, how, and so on).",
      "We <b>recognize</b> things much better than being able to <b>recall</b> things.",
      "We remember less about objects that we have photographed than when we observe them with the naked eye (<b>Henkel, 2014</b>)."
     ]
    },
    {
     "h": "Context is important",
     "pts": [
      "Context affects the extent to which information can be subsequently retrieved.",
      "Sometimes it can be difficult for people to recall information that was encoded in a different context.",
      "Example: \"You are on a train and someone comes up to you and says hello. You don't recognize him for a few moments, but then realize it is one of your neighbors. You are only used to seeing your neighbor in the hallway of your apartment building, and seeing him out of context makes him difficult to recognize initially.\""
     ]
    },
    {
     "h": "Activity: what is easy to remember",
     "pts": [
      "Activity: try to remember the dates of your grandparents' birthday.",
      "Try to remember the cover of the last two books you read.",
      "Which was easiest? Why?",
      "People are very good at remembering <b>visual cues</b> about things, for instance the color of items, the location of objects and marks on an object.",
      "They find it more difficult to learn and remember <b>arbitrary material</b>, for example birthdays and phone numbers."
     ]
    },
    {
     "h": "The problem with the classic '7, + or - 2'",
     "pts": [
      "<b>George Miller's (1956)</b> theory of how much information people can remember.",
      "People's immediate memory capacity is very limited to <b>7, + or - 2</b>.",
      "It has been applied in interaction design when considering how many options to display.",
      "But is it a good use of a theory in HCI? Is it helpful? (questions for discussion; the slide gives no answer)",
      "When creating an interface, should the designer: present only 7 options on a menu; display only 7 icons on a tool bar; have no more than 7 bullets in a list; place only 7 items on a pull down menu; place only 7 tabs on the top of a website page? (question for discussion; the slide gives no answer)",
      "The slide shows a row of 7 smiley faces in different colors (red, purple, blue, yellow, black, white, light blue)."
     ]
    },
    {
     "h": "Design implications for memory",
     "pts": [
      "Reduce <b>cognitive load</b> by avoiding long and complicated procedures for carrying out tasks.",
      "Design interfaces that promote <b>recognition rather than recall</b>.",
      "Provide users with various ways of <b>labelling digital information</b> to help them easily identify it again, for example folders, categories, color, flagging, and time stamping."
     ]
    },
    {
     "h": "Learning",
     "pts": [
      "<b>Learning</b> involves the accumulation of skills and knowledge involving memory.",
      "Two main types: <b>incidental learning</b> (for example, recognizing people's faces, what you did today) and <b>intentional learning</b> (for instance, studying for an exam, learning to cook).",
      "Intentional learning is much harder!",
      "Many technologies have been developed to help (for example, multimedia, animations, VR).",
      "People find it hard to learn by following instructions in a manual.",
      "People prefer to <b>learn by doing</b>."
     ],
     "table": [
      [
       "Incidental learning",
       "Intentional learning"
      ],
      [
       "Recognizing people's faces",
       "Studying for an exam"
      ],
      [
       "What you did today",
       "Learning to cook"
      ]
     ]
    },
    {
     "h": "Design implications for learning",
     "pts": [
      "Design interfaces that <b>encourage exploration</b>.",
      "Design interfaces that <b>constrain and guide</b> learners.",
      "<b>Dynamically linking</b> concepts and representations can facilitate the learning of complex material."
     ]
    },
    {
     "h": "Reading, speaking, and listening",
     "pts": [
      "The ease with which people can read, listen, or speak differs:",
      "Many prefer <b>listening</b> to reading.",
      "<b>Reading</b> can be quicker than speaking or listening.",
      "Listening requires less cognitive effort than reading or speaking."
     ]
    },
    {
     "h": "Applications",
     "pts": [
      "<b>Voice user interfaces</b> allow users to interact with them by asking questions, for example Google Voice, Siri, and Alexa.",
      "<b>Speech-output systems</b> use artificially-generated speech, for instance written text-to-speech systems for the visually impaired.",
      "<b>Natural-language systems</b> enable users to type in questions and give text-based responses, such as chatbots."
     ]
    },
    {
     "h": "Design implications for reading, speaking, and listening",
     "pts": [
      "Speech-based menus and instructions should be <b>short</b>.",
      "<b>Accentuate the intonation</b> of artificially generated speech voices: they are harder to understand than human voices.",
      "Provide opportunities for <b>making text large</b> on a screen."
     ]
    },
    {
     "h": "Problem-solving, planning, reasoning, and decision-making",
     "pts": [
      "All these processes involve <b>reflective cognition</b>, for example thinking about what to do, what the options are, and the consequences.",
      "Often involves conscious processes, discussion with others (or oneself), and the use of <b>artifacts</b>, such as maps, books, pen and paper.",
      "May involve working through different scenarios and deciding which is best option.",
      "Weighing up alternatives."
     ]
    }
   ],
   "cards": [
    [
     "What does memory involve?",
     "Recalling various kinds of knowledge that allow people to act appropriately (e.g. recognizing someone's face or remembering someone's name)."
    ],
    [
     "The two steps of memory",
     "First encode, then retrieve knowledge."
    ],
    [
     "Do we remember everything?",
     "No. Memory involves filtering and processing what is attended to."
    ],
    [
     "Recognition vs recall",
     "We recognize things much better than being able to recall things."
    ],
    [
     "Henkel (2014)",
     "We remember less about objects we have photographed than when we observe them with the naked eye."
    ],
    [
     "What does context affect in memory?",
     "The extent to which information can be subsequently retrieved. (Context = where, when, how, and so on; it can be difficult to recall information encoded in a different context.)"
    ],
    [
     "Context example from the slides",
     "A neighbor you only see in your apartment hallway says hello on a train; out of context he is hard to recognize at first."
    ],
    [
     "What are people very good at remembering?",
     "Visual cues: the color of items, the location of objects and marks on an object."
    ],
    [
     "What is harder to learn and remember?",
     "Arbitrary material, e.g. birthdays and phone numbers."
    ],
    [
     "George Miller (1956)",
     "Theory that people's immediate memory capacity is very limited to 7, + or - 2; applied in interaction design when deciding how many options to display."
    ],
    [
     "Design implications for memory (3)",
     "1) Reduce cognitive load by avoiding long, complicated procedures 2) Promote recognition rather than recall 3) Provide various ways of labelling digital information (folders, categories, color, flagging, time stamping)."
    ],
    [
     "What does learning involve?",
     "The accumulation of skills and knowledge involving memory."
    ],
    [
     "Incidental learning examples",
     "Recognizing people's faces, what you did today."
    ],
    [
     "Intentional learning examples",
     "Studying for an exam, learning to cook. Intentional learning is much harder."
    ],
    [
     "Technologies developed to help learning",
     "Multimedia, animations, VR."
    ],
    [
     "How do people prefer to learn?",
     "By doing. They find it hard to learn by following instructions in a manual."
    ],
    [
     "Design implications for learning (3)",
     "1) Encourage exploration 2) Constrain and guide learners 3) Dynamically link concepts and representations to facilitate learning complex material."
    ],
    [
     "Reading vs listening vs speaking",
     "Many prefer listening to reading; reading can be quicker than speaking or listening; listening requires less cognitive effort than reading or speaking."
    ],
    [
     "Voice user interfaces",
     "Let users interact by asking questions, e.g. Google Voice, Siri, Alexa."
    ],
    [
     "Speech-output systems",
     "Use artificially-generated speech, e.g. written text-to-speech systems for the visually impaired."
    ],
    [
     "Natural-language systems",
     "Let users type in questions and give text-based responses, e.g. chatbots."
    ],
    [
     "Design implications for reading, speaking, listening (3)",
     "1) Short speech-based menus and instructions 2) Accentuate the intonation of artificially generated voices (harder to understand than human voices) 3) Allow making text large on a screen."
    ],
    [
     "What kind of cognition do problem-solving, planning, reasoning and decision-making involve?",
     "Reflective cognition: thinking about what to do, what the options are, and the consequences."
    ],
    [
     "Artifacts used in problem-solving and planning",
     "Maps, books, pen and paper."
    ]
   ],
   "qa": [
    [
     "Explain memory as a cognitive process, according to the lecture.",
     "Memory involves recalling various kinds of knowledge that allow people to act appropriately, for example recognizing someone's face or remembering someone's name. 1) We first encode and then retrieve knowledge. 2) We don't remember everything: it involves filtering and processing what is attended to. 3) Context is important as to how we remember (where, when, how, and so on). 4) We recognize things much better than being able to recall things. 5) We remember less about objects that we have photographed than when we observe them with the naked eye (Henkel, 2014)."
    ],
    [
     "Why is context important for memory? Give the example from the slides.",
     "Context affects the extent to which information can be subsequently retrieved, and it can be difficult to recall information that was encoded in a different context. Example: you are on a train and someone says hello; you don't recognize him for a few moments, then realize he is one of your neighbors. You are only used to seeing him in the hallway of your apartment building, so seeing him out of context makes him difficult to recognize initially."
    ],
    [
     "What is Miller's '7, + or - 2' theory and how has it been applied in interaction design?",
     "George Miller's (1956) theory of how much information people can remember: people's immediate memory capacity is very limited to 7, + or - 2. It has been applied in interaction design when considering how many options to display. The lecture questions this ('The problem with the classic 7, + or - 2'): is it a good use of a theory in HCI, is it helpful? When creating an interface, should the designer present only 7 options on a menu, display only 7 icons on a tool bar, have no more than 7 bullets in a list, place only 7 items on a pull down menu, place only 7 tabs on the top of a website page? (posed as questions; the slides give no answer)"
    ],
    [
     "List the design implications for memory.",
     "1) Reduce cognitive load by avoiding long and complicated procedures for carrying out tasks. 2) Design interfaces that promote recognition rather than recall. 3) Provide users with various ways of labelling digital information to help them easily identify it again, for example folders, categories, color, flagging, and time stamping."
    ],
    [
     "Define learning, describe its two main types, and list its design implications.",
     "Learning involves the accumulation of skills and knowledge involving memory. Two main types: 1) Incidental learning, e.g. recognizing people's faces, what you did today. 2) Intentional learning, e.g. studying for an exam, learning to cook; it is much harder, and many technologies have been developed to help (multimedia, animations, VR). People find it hard to learn by following instructions in a manual and prefer to learn by doing. Design implications: 1) Design interfaces that encourage exploration 2) Design interfaces that constrain and guide learners 3) Dynamically linking concepts and representations can facilitate the learning of complex material."
    ],
    [
     "Compare reading, speaking and listening, give applications, and state the design implications.",
     "The ease with which people can read, listen, or speak differs: many prefer listening to reading; reading can be quicker than speaking or listening; listening requires less cognitive effort than reading or speaking. Applications: 1) Voice user interfaces let users interact by asking questions (Google Voice, Siri, Alexa) 2) Speech-output systems use artificially-generated speech (text-to-speech systems for the visually impaired) 3) Natural-language systems let users type in questions and give text-based responses (chatbots). Design implications: 1) Speech-based menus and instructions should be short 2) Accentuate the intonation of artificially generated speech voices, since they are harder to understand than human voices 3) Provide opportunities for making text large on a screen."
    ],
    [
     "Describe problem-solving, planning, reasoning, and decision-making.",
     "1) All these processes involve reflective cognition, e.g. thinking about what to do, what the options are, and the consequences. 2) They often involve conscious processes, discussion with others (or oneself), and the use of artifacts such as maps, books, pen and paper. 3) They may involve working through different scenarios and deciding which is the best option. 4) Weighing up alternatives."
    ]
   ],
   "quiz": [
    {
     "q": "According to the lecture, memory first involves which step before retrieving knowledge?",
     "o": [
      [
       "Encoding knowledge",
       "Correct. The slide says we first encode and then retrieve knowledge (L4, Memory)."
      ],
      [
       "Weighing up alternatives",
       "Weighing up alternatives belongs to problem-solving, planning, reasoning, and decision-making, not to the steps of memory."
      ],
      [
       "Learning by doing",
       "Learning by doing is how people prefer to learn; it is not the first step of memory."
      ],
      [
       "Accentuating intonation",
       "Accentuating intonation is a design implication for artificially generated speech voices, not a memory step."
      ]
     ],
     "a": 0
    },
    {
     "q": "We remember everything we see, without filtering.",
     "o": [
      [
       "True",
       "The slide says the opposite: we don't remember everything, because memory involves filtering and processing what is attended to."
      ],
      [
       "False",
       "Correct. We don't remember everything; memory involves filtering and processing what is attended to (L4, Memory)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which is easier for people, by the slides?",
     "o": [
      [
       "Recalling things rather than recognizing them",
       "This reverses the slide, which says we recognize things much better than we recall them."
      ],
      [
       "Recognizing things rather than recalling them",
       "Correct. We recognize things much better than being able to recall things (L4, Memory)."
      ],
      [
       "Remembering phone numbers rather than the color of items",
       "Phone numbers are arbitrary material, which people find harder to remember than visual cues such as color."
      ],
      [
       "Learning from a manual rather than by doing",
       "People find it hard to learn by following a manual and prefer to learn by doing."
      ]
     ],
     "a": 1
    },
    {
     "q": "What did Henkel (2014) find?",
     "o": [
      [
       "People's immediate memory capacity is limited to 7, + or - 2",
       "That is George Miller's (1956) theory, not Henkel's finding."
      ],
      [
       "We remember less about objects we photographed than ones we observe with the naked eye",
       "Correct. The slide cites Henkel, 2014 for this (L4, Memory)."
      ],
      [
       "Listening requires less cognitive effort than reading",
       "This is a point about reading, speaking, and listening, not Henkel's finding."
      ],
      [
       "Intentional learning is easier than incidental learning",
       "The slides say intentional learning is much harder, and this is not attributed to Henkel."
      ]
     ],
     "a": 1
    },
    {
     "q": "In the train example, why is the neighbor hard to recognize at first?",
     "o": [
      [
       "He is seen out of the context in which he is usually encountered",
       "Correct. You only see him in the hallway of your apartment building, so out of context he is difficult to recognize initially (L4, Context is important)."
      ],
      [
       "Faces are arbitrary material",
       "The slides give birthdays and phone numbers as arbitrary material; recognizing faces is an example of memory and incidental learning."
      ],
      [
       "Immediate memory is limited to 7, + or - 2",
       "Miller's limit is not the explanation given; the slide explains it by context."
      ],
      [
       "He was photographed rather than observed",
       "Henkel's photograph finding is a separate point; the train example is about context."
      ]
     ],
     "a": 0
    },
    {
     "q": "Which of these do people remember well, according to the activity slide?",
     "o": [
      [
       "Birthdays",
       "Birthdays are given as arbitrary material, which people find more difficult to learn and remember."
      ],
      [
       "Phone numbers",
       "Phone numbers are given as arbitrary material, which is harder to remember."
      ],
      [
       "The location of objects",
       "Correct. People are very good at remembering visual cues such as the color of items, the location of objects and marks on an object (L4, Activity: what is easy to remember)."
      ],
      [
       "Instructions in a manual",
       "The slides say people find it hard to learn by following instructions in a manual."
      ]
     ],
     "a": 2
    },
    {
     "q": "George Miller's (1956) theory says people's immediate memory capacity is limited to:",
     "o": [
      [
       "5, + or - 1",
       "The slide gives 7, + or - 2, not 5."
      ],
      [
       "7, + or - 2",
       "Correct. Miller's theory says immediate memory capacity is very limited to 7, + or - 2 (L4, The problem with the classic '7, + or - 2')."
      ],
      [
       "9, + or - 3",
       "The slide gives 7, + or - 2, not 9."
      ],
      [
       "10, + or - 2",
       "The slide gives 7, + or - 2, not 10."
      ]
     ],
     "a": 1
    },
    {
     "q": "In interaction design, Miller's 7, + or - 2 has been applied when considering:",
     "o": [
      [
       "How many options to display",
       "Correct. The slide says it has been applied in interaction design when considering how many options to display (L4, The problem with the classic '7, + or - 2')."
      ],
      [
       "How to accentuate synthetic speech",
       "Intonation of synthetic voices is a design implication for speech, not an application of Miller's theory."
      ],
      [
       "How to label digital information",
       "Labelling (folders, categories, color, flagging, time stamping) is a memory design implication, not Miller's application."
      ],
      [
       "How to encourage exploration",
       "Encouraging exploration is a design implication for learning."
      ]
     ],
     "a": 0
    },
    {
     "q": "Which is a design implication for memory?",
     "o": [
      [
       "Design interfaces that promote recall rather than recognition",
       "This reverses the slide, which says to promote recognition rather than recall."
      ],
      [
       "Use long, detailed procedures so users remember steps",
       "The slide says to reduce cognitive load by avoiding long and complicated procedures."
      ],
      [
       "Provide various ways of labelling digital information, e.g. folders, color, flagging",
       "Correct. The slide lists folders, categories, color, flagging, and time stamping to help users identify information again (L4, Design implications for memory)."
      ],
      [
       "Make speech-based menus long",
       "Speech-based menus should be short, and this is a speech implication, not a memory one."
      ]
     ],
     "a": 2
    },
    {
     "q": "Recognizing people's faces is an example of which type of learning?",
     "o": [
      [
       "Intentional learning",
       "Intentional learning examples are studying for an exam and learning to cook."
      ],
      [
       "Incidental learning",
       "Correct. The slide gives recognizing people's faces and what you did today as incidental learning (L4, Learning)."
      ],
      [
       "Reflective learning",
       "Reflective is used for the cognition in problem-solving and decision-making, not a type of learning on the slides."
      ],
      [
       "Arbitrary learning",
       "Arbitrary material (birthdays, phone numbers) is about what is hard to remember, not a learning type."
      ]
     ],
     "a": 1
    },
    {
     "q": "Intentional learning is much harder than incidental learning.",
     "o": [
      [
       "True",
       "Correct. The slide says intentional learning is much harder (L4, Learning)."
      ],
      [
       "False",
       "The slide explicitly says intentional learning is much harder."
      ]
     ],
     "a": 0
    },
    {
     "q": "How do people prefer to learn, according to the slides?",
     "o": [
      [
       "By following instructions in a manual",
       "The slides say people find it hard to learn this way."
      ],
      [
       "By doing",
       "Correct. People prefer to learn by doing (L4, Learning)."
      ],
      [
       "By memorizing arbitrary material",
       "Arbitrary material is harder to learn and remember."
      ],
      [
       "By listening to synthetic speech",
       "Synthetic speech voices are harder to understand than human voices; this is not given as the preferred way to learn."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which is NOT one of the design implications for learning?",
     "o": [
      [
       "Design interfaces that encourage exploration",
       "This is one of the three learning design implications."
      ],
      [
       "Design interfaces that constrain and guide learners",
       "This is one of the three learning design implications."
      ],
      [
       "Dynamically link concepts and representations",
       "This is one of the three learning design implications, to facilitate learning complex material."
      ],
      [
       "Provide opportunities for making text large on a screen",
       "Correct. Making text large is a design implication for reading, speaking, and listening, not for learning (L4, Design implications for reading, speaking, and listening)."
      ]
     ],
     "a": 3
    },
    {
     "q": "Which statement about reading, speaking, and listening is on the slides?",
     "o": [
      [
       "Reading requires less cognitive effort than listening",
       "The slide says listening requires less cognitive effort than reading or speaking."
      ],
      [
       "Reading can be quicker than speaking or listening",
       "Correct. The slide states that reading can be quicker than speaking or listening (L4, Reading, speaking, and listening)."
      ],
      [
       "Most people prefer reading to listening",
       "The slide says many prefer listening to reading."
      ],
      [
       "Everyone reads, listens and speaks with equal ease",
       "The slide says the ease with which people can read, listen, or speak differs."
      ]
     ],
     "a": 1
    },
    {
     "q": "Chatbots are given as an example of:",
     "o": [
      [
       "Voice user interfaces",
       "Voice user interface examples are Google Voice, Siri, and Alexa."
      ],
      [
       "Speech-output systems",
       "Speech-output example is written text-to-speech systems for the visually impaired."
      ],
      [
       "Natural-language systems",
       "Correct. Natural-language systems let users type in questions and give text-based responses, such as chatbots (L4, Applications)."
      ],
      [
       "Labelling digital information",
       "Labelling examples are folders, categories, color, flagging, and time stamping."
      ]
     ],
     "a": 2
    },
    {
     "q": "Text-to-speech systems for the visually impaired are an example of:",
     "o": [
      [
       "Speech-output systems",
       "Correct. Speech-output systems use artificially-generated speech, for instance written text-to-speech systems for the visually impaired (L4, Applications)."
      ],
      [
       "Natural-language systems",
       "Natural-language systems take typed questions and give text-based responses, like chatbots."
      ],
      [
       "Voice user interfaces",
       "Voice user interfaces let users ask questions, e.g. Google Voice, Siri, Alexa."
      ],
      [
       "Incidental learning",
       "Incidental learning examples are recognizing faces and what you did today."
      ]
     ],
     "a": 0
    },
    {
     "q": "Why should designers accentuate the intonation of artificially generated speech voices?",
     "o": [
      [
       "They are harder to understand than human voices",
       "Correct. The slide gives this reason (L4, Design implications for reading, speaking, and listening)."
      ],
      [
       "They are quicker than reading",
       "The slide says reading can be quicker than speaking or listening; this is not the reason given."
      ],
      [
       "They reduce the number of options to 7",
       "Miller's 7, + or - 2 is about how many options to display, not speech intonation."
      ],
      [
       "They encourage exploration",
       "Encouraging exploration is a design implication for learning."
      ]
     ],
     "a": 0
    },
    {
     "q": "Problem-solving, planning, reasoning, and decision-making all involve which kind of cognition?",
     "o": [
      [
       "Incidental cognition",
       "Incidental is a type of learning on the slides, not the cognition these processes involve."
      ],
      [
       "Reflective cognition",
       "Correct. All these processes involve reflective cognition, e.g. thinking about what to do, the options and the consequences (L4, Problem-solving, planning, reasoning, and decision-making)."
      ],
      [
       "Arbitrary cognition",
       "Arbitrary refers to material that is hard to remember, like birthdays and phone numbers."
      ],
      [
       "Visual cognition",
       "Visual cues are about what people remember well, not the cognition of these processes."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which are given as artifacts used in problem-solving and planning?",
     "o": [
      [
       "Siri, Alexa and Google Voice",
       "These are examples of voice user interfaces."
      ],
      [
       "Folders, categories and flagging",
       "These are ways of labelling digital information (memory design implication)."
      ],
      [
       "Maps, books, pen and paper",
       "Correct. The slide lists maps, books, pen and paper as artifacts (L4, Problem-solving, planning, reasoning, and decision-making)."
      ],
      [
       "Multimedia, animations and VR",
       "These are technologies developed to help intentional learning."
      ]
     ],
     "a": 2
    }
   ]
  },
  {
   "n": 5,
   "title": "Qualitative vs Quantitative, Privacy and Surveys (last year's slides)",
   "notes": [
    {
     "h": "Secondary research benefits",
     "pts": [
      "Answers questions about <b>human abilities and limitations</b>. Example: designing for color-blind users using color-blindness facts.",
      "Answers questions about <b>user groups with common issues</b>. Example: an app for a poor country where users likely have <b>low-end devices</b>."
     ]
    },
    {
     "h": "Types of user research by WHAT",
     "pts": [
      "<b>Quantitative</b>: data of <b>numeric</b> nature (measures, counts). Easier for engineers and technical people.",
      "<b>Qualitative</b>: observations about <b>why and how</b> things happen, often based on interviews. Harder for technical people, but it is what we need for real understanding."
     ]
    },
    {
     "h": "Primary vs secondary research",
     "table": [
      [
       "",
       "Primary",
       "Secondary"
      ],
      [
       "Data collected by",
       "You (or someone you hire)",
       "Someone else"
      ],
      [
       "Examples",
       "Surveys, focus groups, interviews, observations, experiments",
       "Looking for existing data"
      ],
      [
       "Qualitative or quantitative?",
       "Can be either",
       "Can be either"
      ],
      [
       "Key benefits",
       "Specific to your needs, and you control the quality",
       "Usually cheap and quick"
      ],
      [
       "Key disadvantages",
       "Usually costs more and takes longer",
       "Data can be too old and/or not specific enough"
      ]
     ]
    },
    {
     "h": "General tips for research methods",
     "pts": [
      "User research should be <b>planned ahead</b>. For an interview, write a <b>script</b> of questions beforehand instead of asking random questions.",
      "Planning is not strictness: be flexible during the activity (<b>the script is not a bible</b>).",
      "Methods are not alternatives. Use a <b>combination</b> in a relevant order.",
      "<b>Testing and iteration</b> improve any technique.",
      "<b>Privacy and security</b> of user data are essential."
     ]
    },
    {
     "h": "Privacy and security",
     "pts": [
      "Only collect the data you need. Do not associate collected data with PII or SPII. Do not keep data after you no longer need it.",
      "<b>PII (Personally Identifiable Information)</b>: details that could identify a user: <b>names, home address, email address, phone number</b>.",
      "<b>SPII (Sensitive PII)</b>: data that could cause financial harm, embarrassment or discrimination if lost or stolen: <b>social security number, driver's license, passport numbers, financial account numbers, date of birth</b>."
     ]
    },
    {
     "h": "1) Surveys",
     "pts": [
      "Quick responses from a <b>large number of users</b> in a short time (a broad view). Often online and easy to create. One of the <b>cheapest</b> methods.",
      "Can be an initial step for insights on motivations, preferences, priorities and pain points, to plan later activities such as interviews. Can also follow an interview or usability study.",
      "Tips: <b>keep it as small as possible</b> (too many questions hurt response rate and reliability); ask only what you need and will use; <b>be aware of bias</b>; get feedback from participants about the survey."
     ]
    }
   ],
   "cards": [
    [
     "Quantitative research",
     "Numeric data: measures and counts. Easier for technical people."
    ],
    [
     "Qualitative research",
     "Observations about why and how things happen, often from interviews."
    ],
    [
     "PII examples",
     "Names, home address, email address, phone number."
    ],
    [
     "SPII examples",
     "SSN, driver's license, passport number, financial account numbers, date of birth."
    ],
    [
     "Primary research: benefit / drawback",
     "Specific to your needs and you control quality / costs more and takes longer."
    ],
    [
     "Secondary research: benefit / drawback",
     "Cheap and quick / may be too old or not specific enough."
    ],
    [
     "\"The script is not a bible\"",
     "Plan ahead, but stay flexible during the activity."
    ],
    [
     "Survey strengths",
     "Many users, short time, online, cheap; a broad view."
    ]
   ],
   "qa": [
    [
     "Compare primary research and secondary research.",
     "Primary is collected by you (surveys, focus groups, interviews, observations, experiments); it is specific to your needs and you control quality, but it costs more and takes longer. Secondary is collected by someone else (existing data such as books and journals); it is cheap and quick, but it may be too old or not specific enough. Both can be qualitative or quantitative."
    ],
    [
     "What are the rules for privacy and security of user data?",
     "Collect only what you need, do not associate collected data with PII or SPII, and do not keep data stored after it is no longer needed."
    ],
    [
     "Give general tips for conducting user research.",
     "Plan ahead (e.g. an interview script); be flexible (the script is not a bible); combine methods in a relevant order; improve through testing and iteration; protect privacy and security of user data."
    ],
    [
     "Give tips for a good survey design.",
     "Keep it as small as possible, since too many questions reduce the response rate and reliability. Ask the minimum questions for data you will use. Be aware of bias. Get feedback from participants about the survey."
    ]
   ],
   "quiz": [
    {
     "q": "Sensitive Personally Identifiable Information (SPII) includes:",
     "o": [
      [
       "Names",
       "Names are ordinary PII: they identify a user but are not in the sensitive list. SPII is data whose loss could cause financial harm, embarrassment or discrimination (L5, Privacy and security)."
      ],
      [
       "Home address",
       "Home address is listed as PII, together with names, email and phone. It is not among the SPII examples like SSN or financial account numbers (L5, Privacy and security)."
      ],
      [
       "Email address",
       "Email address is plain PII in the lecture's list. SPII covers SSN, driver's license, passport, financial account numbers and date of birth (L5, Privacy and security)."
      ],
      [
       "Financial account numbers",
       "Correct. Losing these could cause financial harm."
      ]
     ],
     "a": 3,
     "src": "Exam 2024/25"
    },
    {
     "q": "\"PII is specific details that could be used to identify a user such as names, phone number.\"",
     "o": [
      [
       "True",
       "Correct. PII is details that could identify a user, and the lecture's examples are names, home address, email address and phone number (L5, Privacy and security)."
      ],
      [
       "False",
       "The statement is true: it matches the lecture's PII definition, and names and phone number are both in its PII examples (L5, Privacy and security)."
      ]
     ],
     "a": 0,
     "src": "Exam 2024/25"
    },
    {
     "q": "\"Qualitative research involves data of numeric nature.\"",
     "o": [
      [
       "True",
       "Numeric data (measures, counts) defines quantitative research. Qualitative research is observations about why and how things happen (L5, Types by WHAT)."
      ],
      [
       "False",
       "Correct. Qualitative research is about why and how, not numbers."
      ]
     ],
     "a": 1,
     "src": "Exam 2024/25 & 2025/26"
    },
    {
     "q": "Data that includes descriptions from interviewees is:",
     "o": [
      [
       "Quantitative data",
       "Quantitative data is numeric: measures and counts. Interviewees' descriptions explain why and how, which makes them qualitative (L5, Types by WHAT)."
      ],
      [
       "Qualitative data",
       "Correct. Descriptions and explanations are qualitative."
      ],
      [
       "Average data",
       "\"Average data\" is not a type of research data. By WHAT, research is only quantitative (numeric) or qualitative (why and how) (L5, Types by WHAT)."
      ],
      [
       "Gathering data",
       "\"Gathering data\" is not a data type; gathering is just collecting. Descriptions from interviews are qualitative data (L5, Types by WHAT)."
      ]
     ],
     "a": 1,
     "src": "Exam 2024/25"
    },
    {
     "q": "Quantitative research is often easier for:",
     "o": [
      [
       "Designers only",
       "The lecture does not single out designers. It says quantitative (numeric) research is easier for engineers and technical people (L5, Types by WHAT)."
      ],
      [
       "Engineers and technical people",
       "Correct. Quantitative research is numeric (measures, counts), so the lecture says it is easier for engineers and technical people; qualitative is harder for them (L5, Types by WHAT)."
      ],
      [
       "Marketing teams only",
       "Marketing teams are not mentioned. The lecture says quantitative research is easier for engineers and technical people (L5, Types by WHAT)."
      ],
      [
       "Children",
       "Children are not part of this point at all. Quantitative research is said to be easier for engineers and technical people (L5, Types by WHAT)."
      ]
     ],
     "a": 1,
     "src": "Exam 2025/26"
    },
    {
     "q": "Why is privacy and security important in user research?",
     "o": [
      [
       "It ensures compliance and protects user data",
       "Correct. Privacy and security of user data are essential: collect only what you need, avoid linking it to PII/SPII and delete it when no longer needed (L5, General tips)."
      ],
      [
       "It makes research faster",
       "Privacy adds care; it does not speed things up."
      ],
      [
       "It allows sharing all data publicly",
       "The opposite: the privacy guidelines limit what you collect, keep it apart from PII/SPII, and delete it after use, so nothing is shared publicly (L5, Privacy and security)."
      ],
      [
       "It reduces the need for interviews",
       "Privacy does not replace any method; interviews are still used. Privacy matters because it protects user data (L5, Privacy and security)."
      ]
     ],
     "a": 0,
     "src": "Exam 2025/26"
    },
    {
     "q": "Which statement reflects good practice in user research?",
     "o": [
      [
       "Prepare questions ahead but adapt as needed during the session",
       "Correct. Plan ahead, but the script is not a bible."
      ],
      [
       "Never change the script under any circumstance",
       "The lecture says planning is not strictness: \"the script is not a bible\", so you should stay flexible during the session (L5, General tips)."
      ],
      [
       "Use only quantitative methods",
       "Combine methods; qualitative is needed for real understanding."
      ],
      [
       "Focus on convenience over privacy",
       "Privacy and security of user data are listed as essential, so they must never be traded for convenience (L5, General tips)."
      ]
     ],
     "a": 0,
     "src": "Exam 2025/26"
    },
    {
     "q": "Before a user interview, what should researchers do?",
     "o": [
      [
       "Ask random questions without preparation",
       "The lecture says to plan ahead and write a script of questions instead of asking random questions (L5, General tips)."
      ],
      [
       "Write a script of questions to guide the interview",
       "Correct. User research should be planned ahead: for an interview, write a script of questions beforehand, while staying flexible since the script is not a bible (L5, General tips)."
      ],
      [
       "Ignore the interviewee's context",
       "Ignoring context is not a preparation step. The lecture's advice is to plan ahead with a script of questions (L5, General tips)."
      ],
      [
       "Focus only on technical details",
       "User research is about the user's needs and pain points, not only technical details. The preparation step is writing a question script (L5, General tips)."
      ]
     ],
     "a": 1,
     "src": "Exam 2025/26"
    },
    {
     "q": "\"Survey is more expensive than interview.\"",
     "o": [
      [
       "True",
       "Surveys are one of the cheapest methods; interviews are more expensive."
      ],
      [
       "False",
       "Correct. Interviews are synchronous and often need incentives."
      ]
     ],
     "a": 1,
     "src": "Exam 2024/25"
    },
    {
     "q": "\"A well-designed survey should take a long time to complete to ensure detailed responses.\"",
     "o": [
      [
       "True",
       "Long surveys hurt response rate and reliability."
      ],
      [
       "False",
       "Correct. The survey tip is to keep it as small as possible, because too many questions reduce the response rate and the reliability of the data (L5, Surveys)."
      ]
     ],
     "a": 1,
     "src": "Exam 2025/26"
    },
    {
     "q": "Asking too many questions in a survey can:",
     "o": [
      [
       "Make analysis faster",
       "More questions give more data to process, so analysis becomes slower. The real effect is a lower response rate and less reliable data (L5, Surveys)."
      ],
      [
       "Make it more accurate automatically",
       "More questions do not add accuracy: tired respondents answer worse, which lowers reliability. That is why surveys should be as small as possible (L5, Surveys)."
      ],
      [
       "Improve user engagement",
       "Long surveys tire respondents, so fewer people finish them. The lecture says too many questions reduce the response rate (L5, Surveys)."
      ],
      [
       "Reduce the response rate and affect reliability of data",
       "Correct. The lecture warns that too many questions reduce the response rate and affect reliability, so keep the survey as small as possible (L5, Surveys)."
      ]
     ],
     "a": 3
    }
   ]
  },
  {
   "n": 6,
   "title": "How to Ask Good Survey Questions (last year's slides)",
   "notes": [
    {
     "h": "Six principles: Clear · Concise · Specific · Expressive · Unbiased · Usable",
     "pts": [
      "Each principle has \"Don't ask this… / Instead, ask this…\" examples. Examiners often ask you to evaluate a question with them."
     ]
    },
    {
     "h": "Be Clear",
     "pts": [
      "<b>Label numeric scales</b>: not \"1–5\" alone but \"1 = Highly dissatisfied … 5 = Highly satisfied\".",
      "<b>Avoid overlapping ranges</b>: 0-2, 2-5, 5-10 overlap. Use 0-2, 3-5, 6-10, 11-19, 20+.",
      "<b>When in doubt, give extra detail</b>: \"tablet computer (i.e. any computer with a touchscreen and detachable keyboard)\".",
      "<b>Timebox frequency questions</b>: instead of \"Never / Rarely / Often…\", ask \"In the past seven days, how many times have you exercised? 0, 1-2, 3-4, 5-7, 7 or more\"."
     ]
    },
    {
     "h": "Be Concise",
     "pts": [
      "<b>Plain language</b>: \"What was the overall level of cleanliness that you observed within the car?\" becomes \"How clean was the car?\""
     ]
    },
    {
     "h": "Be Specific",
     "pts": [
      "<b>Avoid super-big ideas</b>: \"How satisfied were you with the interface?\" becomes \"…with how quickly the interface responded?\" plus follow-up questions.",
      "<b>Avoid double-barrel questions</b> (two things in one): \"speed and availability of your connection\" should be split into two questions.",
      "<b>Avoid internal conflict</b>: \"How satisfied with your food?\" should be split into temperature, appearance and flavor."
     ]
    },
    {
     "h": "Be Expressive",
     "pts": [
      "<b>Emphasize the user's opinion</b>: \"Is our price too high?\" becomes \"Do you feel our price is too high, too low, or about right?\"",
      "<b>Use ranges instead of yes/no</b>: \"Do you use social media?\" becomes \"In the past seven days, how much time have you spent on social media? 0 / &lt;1 / 1-2 / 3-5 / 6-9 / 10+ hours\".",
      "<b>Give levels of frequency or agreement</b>: a 5-level satisfaction scale instead of Dissatisfied/Satisfied.",
      "<b>Allow multiple selections</b> when possible (checkboxes instead of radio buttons)."
     ]
    },
    {
     "h": "Be Unbiased",
     "pts": [
      "<b>Allow users to add nominal categories</b>: add \"Other: ____\".",
      "<b>Leave open-ended questions open</b>: \"Why did you choose our service?\" should not force fixed options.",
      "<b>Avoid leading questions</b>: \"Did our brand-new AI-based interface generate better recommendations?\" becomes \"How satisfied were you with the recommendations?\"",
      "<b>Avoid loaded questions</b>: \"how much time have you <i>wasted</i> on social media?\" becomes \"…<i>spent</i>…\"."
     ]
    },
    {
     "h": "Be Usable",
     "pts": [
      "Provide a <b>progress bar</b>. Keep <b>page lengths consistent</b>. <b>Order questions logically</b>. <b>Alert users about unanswered questions</b>. <b>Preview the survey yourself</b>."
     ]
    },
    {
     "h": "Exercise: evaluate these survey questions",
     "pts": [
      "\"On a scale of 1 to 4 with 1 meaning 'a lot' and 4 meaning 'not at all', how much do you enjoy exercising?\" is an <b>ambiguous / reversed scale</b>.",
      "\"Why do you like to exercise?\" is a <b>leading question</b> because it assumes you like it.",
      "\"On a scale of 1 to 6 with 1 meaning 'not at all'…\" has a <b>changing number of options</b> (4 vs 6) and a <b>reversed scale</b> compared with the previous question.",
      "\"Have you listened to an audiobook this year?\" is a <b>yes/no question</b>. Use ranges."
     ]
    }
   ],
   "cards": [
    [
     "6 principles of good survey questions",
     "Be Clear, Concise, Specific, Expressive, Unbiased, Usable."
    ],
    [
     "Double-barrel question",
     "Asks about two things at once, e.g. \"speed and availability\". Split it (Be Specific)."
    ],
    [
     "Leading question",
     "Pushes toward an answer (\"our brand-new AI interface…\"). Fix: neutral wording (Be Unbiased)."
    ],
    [
     "Loaded question",
     "Contains a judgment word (\"wasted\"). Fix: neutral word (\"spent\")."
    ],
    [
     "Overlapping ranges fix",
     "0-2, 3-5, 6-10, 11-19, 20+ (Be Clear)."
    ],
    [
     "Instead of yes/no…",
     "Ask ranges (Be Expressive): \"In the past 7 days, how much time…\"."
    ],
    [
     "Nominal categories",
     "Add an \"Other: ___\" option (Be Unbiased)."
    ],
    [
     "Be Usable checklist",
     "Progress bar, consistent page lengths, logical order, alert unanswered, preview yourself."
    ],
    [
     "Timebox frequency",
     "\"In the past seven days, how many times…\" instead of \"Rarely/Often\" (Be Clear)."
    ]
   ],
   "qa": [
    [
     "Mention the points to consider when asking good survey questions, with examples.",
     "Be Clear (label scales, no overlapping ranges, extra detail, timeboxed frequency); Be Concise (plain language: \"How clean was the car?\"); Be Specific (no super-big ideas, no double-barrel, no internal conflict); Be Expressive (emphasize opinions, ranges instead of yes/no, levels of agreement, multiple selections); Be Unbiased (add \"Other\", keep open-ended questions open, avoid leading and loaded words); Be Usable (progress bar, consistent pages, logical order, alert unanswered, preview)."
    ],
    [
     "Evaluate: \"In the past seven days, how much time have you wasted on social media?\"",
     "A loaded question: \"wasted\" judges the respondent. Ask \"…how much time have you spent on social media?\""
    ],
    [
     "Evaluate: \"Do you use social media?\"",
     "A yes/no question that gives little information. Use ranges: \"In the past seven days, how much time have you spent on social media? 0 / <1 / 1-2 / 3-5 / 6-9 / 10+ hours\"."
    ],
    [
     "Evaluate: \"How satisfied are you with the speed and availability of your mobile connection?\"",
     "A double-barrel question: it asks two things. Split it into one question about speed and one about availability."
    ]
   ],
   "quiz": [
    {
     "q": "\"How satisfied are you with the speed and availability of your mobile connection?\" violates which rule?",
     "o": [
      [
       "Avoid overlapping ranges",
       "Overlapping ranges (like 0-2, 2-5) is a Be Clear rule about numeric answer options. This question has no ranges; it combines speed and availability in one question (L6, Be Specific)."
      ],
      [
       "Avoid double-barrel questions",
       "Correct. It asks about two things at once, so split it."
      ],
      [
       "Allow multiple selections",
       "Allowing multiple selections (checkboxes) is a Be Expressive tip about answer controls. The flaw here is asking about two things, speed and availability, at once (L6, Be Specific)."
      ],
      [
       "Provide a progress bar",
       "That is about survey usability, not this question."
      ]
     ],
     "a": 1
    },
    {
     "q": "\"How much time have you WASTED on social media?\" is an example of:",
     "o": [
      [
       "A loaded question",
       "Correct. \"Wasted\" carries a judgment. Use \"spent\"."
      ],
      [
       "A double-barrel question",
       "A double-barrel question asks about two things at once. This asks about one thing, time on social media; the problem is the judgment word \"wasted\" (L6, Be Unbiased)."
      ],
      [
       "An open-ended question",
       "Being open-ended is not the issue; the lecture even says to leave open-ended questions open. The flaw is the loaded word \"wasted\" (L6, Be Unbiased)."
      ],
      [
       "A timeboxed question",
       "Timeboxing is good practice; the issue is the word choice."
      ]
     ],
     "a": 0
    },
    {
     "q": "Which option set avoids overlapping ranges?",
     "o": [
      [
       "0-2, 2-5, 5-10, 10-20, 20+",
       "These ranges share their boundaries: 2, 5, 10 and 20 each fall in two ranges, so a respondent with exactly 5 has two valid answers (L6, Be Clear)."
      ],
      [
       "0-2, 3-5, 6-10, 11-19, 20+",
       "Correct. Every value belongs to exactly one range."
      ],
      [
       "0-5, 5-10, 10+",
       "5 and 10 each appear in two ranges (0-5 and 5-10, 5-10 and 10+), so these ranges overlap, which Be Clear says to avoid (L6, Be Clear)."
      ],
      [
       "Some, Many, A lot",
       "Some / Many / A lot are vague words with no numbers, so they are not ranges at all and different people read them differently (L6, Be Clear)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Adding \"Other: ____\" to a list of social media platforms follows which principle?",
     "o": [
      [
       "Be Concise",
       "It is about fairness to all answers, not brevity."
      ],
      [
       "Be Unbiased",
       "Correct. It allows users to add nominal categories."
      ],
      [
       "Be Usable",
       "Usable covers progress bars, ordering and similar."
      ],
      [
       "Be Clear",
       "Be Clear covers labeling scales, non-overlapping ranges, extra detail and timeboxing. Adding \"Other: ____\" lets users add nominal categories, a Be Unbiased rule (L6, Be Unbiased)."
      ]
     ],
     "a": 1
    },
    {
     "q": "\"Why do you like to exercise?\" is a problem because it is:",
     "o": [
      [
       "A yes/no question",
       "It is not yes/no: \"why\" invites an open answer. The flaw is that it assumes you like exercising, which makes it leading (L6, Exercise)."
      ],
      [
       "A leading question",
       "Correct. It assumes the person likes exercising."
      ],
      [
       "An overlapping range",
       "Overlapping ranges only apply to numeric answer options, and this question has none. Its flaw is assuming the person likes exercise (L6, Exercise)."
      ],
      [
       "Too concise",
       "Being short is good (Be Concise). The problem is that it assumes the respondent likes exercising, so it leads them (L6, Exercise)."
      ]
     ],
     "a": 1,
     "src": "Exam 2024/25 Q2B"
    },
    {
     "q": "Which is part of \"Be Usable\"?",
     "o": [
      [
       "Provide a progress bar",
       "Correct. Also consistent page lengths, logical order, alerts for unanswered questions, and previewing."
      ],
      [
       "Avoid double-barrel questions",
       "Avoiding double-barrel questions belongs to Be Specific (split questions that ask two things), not to Be Usable (L6, Be Specific)."
      ],
      [
       "Use plain language",
       "Plain language is the Be Concise rule (\"How clean was the car?\"). Be Usable is about the survey itself: progress bar, page length, ordering, alerts, preview (L6, Be Concise)."
      ],
      [
       "Avoid loaded questions",
       "Avoiding loaded words like \"wasted\" is a Be Unbiased rule, not a Be Usable one (L6, Be Unbiased)."
      ]
     ],
     "a": 0
    },
    {
     "q": "\"How often do you exercise? Never / Rarely / Occasionally / Frequently / Always\" should be replaced with:",
     "o": [
      [
       "\"Do you exercise? Yes / No\"",
       "A yes/no question gives even less information; Be Expressive says to use ranges instead of yes/no (L6, Be Expressive)."
      ],
      [
       "\"In the past seven days, how many times have you exercised? 0 / 1-2 / 3-4 / 5-7 / 7 or more\"",
       "Correct. Be Clear says to timebox frequency questions: words like Rarely or Often mean different things to different people, while \"in the past seven days\" with counts is exact (L6, Be Clear)."
      ],
      [
       "\"Why do you exercise?\"",
       "This asks something else (reasons, not frequency), and \"Why do you…\" assumes the person exercises, making it leading (L6, Be Unbiased)."
      ],
      [
       "\"Rate exercise 1-5\"",
       "An unlabeled 1-5 scale breaks Be Clear's \"label numeric scales\" rule, and it still does not measure how often someone exercises (L6, Be Clear)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which best summarizes a good survey design principle?",
     "o": [
      [
       "Long surveys with complex questions",
       "The opposite of the tips: surveys should be as small as possible and questions concise and clear, since long surveys hurt response rate and reliability (L5, Surveys; L6)."
      ],
      [
       "Short, clear, unbiased surveys with participant feedback considered",
       "Correct. Keep the survey as small as possible, word questions clearly, avoid bias, and get feedback from participants about the survey (L5, Surveys; L6, six principles)."
      ],
      [
       "Surveys without planning",
       "User research must be planned ahead; a survey without planning breaks the general tips and the six question principles (L5, General tips)."
      ],
      [
       "Focus only on quantitative questions",
       "Methods should be combined, and the lecture says to leave open-ended questions open, so quantitative-only questions are not the principle (L6, Be Unbiased)."
      ]
     ],
     "a": 1,
     "src": "Exam 2025/26"
    },
    {
     "q": "\"Be biased\" is an important point for a good survey.",
     "o": [
      [
       "True",
       "The principle is \"Be UNbiased\". (The 2024/25 answer sheet marks this True, which looks like a typo in the question. Answer from the lecture.)"
      ],
      [
       "False",
       "Correct per the lecture: the principle is Be Unbiased."
      ]
     ],
     "a": 1,
     "src": "Exam 2024/25"
    }
   ]
  },
  {
   "n": 7,
   "title": "Interviews and Starting Design (last year's slides)",
   "notes": [
    {
     "h": "2) Interviews",
     "pts": [
      "The <b>most common</b> research technique.",
      "Deeper, more thorough understanding: more open-ended and \"why\" questions (Joyner: focus on the <b>6 Ws</b>: who, what, where, when, why, how), room for follow-up questions, and reflection on rare events.",
      "Far fewer users can be interviewed than surveyed.",
      "<b>More expensive</b>: <b>synchronous</b> (the interviewer devotes time to each interviewee) and <b>incentives</b> (interviewees often expect compensation).",
      "Interviews and surveys can be done in sequence in either order, using the results of one to plan the other."
     ]
    },
    {
     "h": "Tips for a good interview",
     "pts": [
      "<b>Plan ahead</b> and prepare questions before the interview.",
      "During the interview, two keys: <b>listen well</b> (the user should talk most of the time) and <b>take notes</b> (one person asks and one takes notes; audio recording is not enough; note emotions and reactions).",
      "<b>Leave some time between interviews.</b>"
     ]
    },
    {
     "h": "Interviewing individuals vs groups",
     "table": [
      [
       "Individuals",
       "Groups"
      ],
      [
       "More time/effort spent with each participant",
       "Easier to get more feedback"
      ],
      [
       "Easier to coordinate the logistics",
       "Participants' discussion can highlight assumptions"
      ],
      [
       "More privacy for participants",
       "May need to deal with confounding personalities"
      ],
      [
       "",
       "\"Presentation of self\" issues"
      ]
     ]
    },
    {
     "h": "Challenges of data gathered by asking questions",
     "pts": [
      "Planning takes more time and effort than the team may have.",
      "Analysis of qualitative data is not easy.",
      "<b>Recall bias</b>: inaccurate answers about things in the past.",
      "<b>Reporting bias</b>: people give answers more ideal than reality.",
      "Solution: combine with other techniques such as <b>participant observation, usability studies and secondary research</b>."
     ]
    },
    {
     "h": "Design: can I?",
     "pts": [
      "Scott Klemmer: \"Designing great user interfaces requires enormous creativity and a lot of hard work…\", but pretty good interfaces are easy if you know basic methods, techniques and principles.",
      "Joyner: \"design is very hard\".",
      "Designers say: \"we are not artists; in most cases we are not even talented in drawing.\" Design does not produce wall-hanging artwork.",
      "Talent and creativity are an advantage. Do not turn off creativity; follow tips and avoid the biggest design mistakes."
     ]
    }
   ],
   "cards": [
    [
     "Most common research technique",
     "Interviews."
    ],
    [
     "Joyner's 6 Ws",
     "Who, What, Where, When, Why, How."
    ],
    [
     "Why interviews are expensive",
     "They are synchronous (time per interviewee) and need incentives."
    ],
    [
     "Two keys during an interview",
     "Listen well (the user talks most) and take notes (audio is not enough)."
    ],
    [
     "Recall bias",
     "Inaccurate answers about things that happened in the past."
    ],
    [
     "Reporting bias",
     "People give answers more ideal than reality."
    ],
    [
     "Individual interviews: advantages",
     "More time per person, easier logistics, more privacy."
    ],
    [
     "Group interviews: advantages",
     "More feedback; discussion highlights assumptions."
    ]
   ],
   "qa": [
    [
     "What are the tips for a good interview?",
     "Plan ahead and prepare questions before the interview. During it, listen well so the user talks most of the time, and take notes (one asks, one writes; audio is not enough; note emotions and reactions). Leave some time between interviews."
    ],
    [
     "Compare interviewing individuals versus groups.",
     "Individuals: more time per participant, easier logistics, more privacy. Groups: easier to get more feedback and discussion highlights assumptions, but you may face confounding personalities and \"presentation of self\" issues."
    ],
    [
     "What are the challenges of data gathered by asking questions and how do you solve them?",
     "Planning takes time; qualitative analysis is hard; recall bias; reporting bias (idealised answers). Solve by combining with participant observation, usability studies and secondary research."
    ],
    [
     "Compare interviews and surveys.",
     "Surveys reach many users quickly and cheaply (broad view). Interviews reach fewer users but give deeper understanding (why questions, follow-ups, rare events) and cost more (synchronous, incentives). They can be combined in either order."
    ]
   ],
   "quiz": [
    {
     "q": "\"Interview is the most common research technique.\"",
     "o": [
      [
       "True",
       "Correct. The lecture opens its interviews section by calling the interview the most common research technique, valued for deeper understanding through open \"why\" questions (L7, Interviews)."
      ],
      [
       "False",
       "The lecture calls interviews the most common technique."
      ]
     ],
     "a": 0,
     "src": "Exam 2024/25"
    },
    {
     "q": "Tips for a good interview:",
     "o": [
      [
       "Listen well",
       "Listen well is one of the two keys during an interview, but take notes is the other, so the complete answer is \"a & c\" (L7, Tips for a good interview)."
      ],
      [
       "Don't leave some time between interviews",
       "This reverses the real tip: the lecture says to leave some time between interviews (L7, Tips for a good interview)."
      ],
      [
       "Take notes",
       "Take notes is one of the two keys, but listening well is the other, so choosing it alone is incomplete; the answer is \"a & c\" (L7, Tips for a good interview)."
      ],
      [
       "a & c",
       "Correct. Listen well AND take notes are the two keys."
      ]
     ],
     "a": 3,
     "src": "Exam 2024/25"
    },
    {
     "q": "\"Individual interviews are easier to coordinate than group interviews.\"",
     "o": [
      [
       "True",
       "Correct. Individuals: \"easier to coordinate the logistics\"."
      ],
      [
       "False",
       "The comparison table lists easier logistics for individuals."
      ]
     ],
     "a": 0,
     "src": "Exam 2024/25 & 2025/26"
    },
    {
     "q": "Why are interviews more expensive than surveys?",
     "o": [
      [
       "They need special software",
       "Special software is not mentioned. Interviews cost more because they are synchronous (time per interviewee) and interviewees often expect incentives (L7, Interviews)."
      ],
      [
       "They are synchronous and interviewees often expect incentives",
       "Correct. Interviews are synchronous, so the interviewer devotes time to each person, and interviewees often expect compensation (incentives) (L7, Interviews)."
      ],
      [
       "They must be done online",
       "Interviews do not have to be online, and that is not the cost reason. It is the synchronous time per interviewee plus incentives (L7, Interviews)."
      ],
      [
       "They collect only numbers",
       "Interviews collect mostly qualitative data (open-ended \"why\" answers), not numbers, and that has nothing to do with their cost (L7, Interviews)."
      ]
     ],
     "a": 1
    },
    {
     "q": "People giving answers that are more ideal than reality is called:",
     "o": [
      [
       "Recall bias",
       "Recall bias is inaccurate memory of past events."
      ],
      [
       "Reporting bias",
       "Correct. Reporting bias is when people give answers more ideal than reality; recall bias is inaccurate answers about past events (L7, Challenges of asking questions)."
      ],
      [
       "Selection bias",
       "Selection bias is not one of the lecture's biases. People reporting an idealised version of reality is reporting bias (L7, Challenges of asking questions)."
      ],
      [
       "Confirmation bias",
       "Confirmation bias is not covered here. The lecture names two biases, recall and reporting; answers more ideal than reality are reporting bias (L7, Challenges)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which is an advantage of GROUP interviews?",
     "o": [
      [
       "More privacy for participants",
       "That is an advantage of individual interviews."
      ],
      [
       "Participants' discussion can highlight assumptions",
       "Correct. In group interviews participants' discussion can highlight assumptions, and it is easier to get more feedback (L7, Individuals vs groups)."
      ],
      [
       "Easier logistics",
       "Individual interviews are easier to coordinate."
      ],
      [
       "No confounding personalities",
       "The reverse: with groups you may need to deal with confounding personalities, which is listed as a group drawback (L7, Individuals vs groups)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which type of research gives a deeper understanding of user motivations and behaviors?",
     "o": [
      [
       "Quantitative research",
       "Quantitative research gives numbers (measures, counts) that show what happens, not why. Motivations need qualitative research (L5, Types by WHAT)."
      ],
      [
       "Secondary research only",
       "Secondary research is someone else's data, which may be too old or not specific enough to your users, so it cannot give deep insight on its own (L5, Primary vs secondary)."
      ],
      [
       "Experimental research only",
       "Experiments are just one primary method, not one of the WHAT categories. Understanding why and how users behave is qualitative research (L5, Types by WHAT)."
      ],
      [
       "Qualitative research",
       "Correct. It covers why and how things happen."
      ]
     ],
     "a": 3
    }
   ]
  },
  {
   "n": 8,
   "title": "Design Alternatives and Prototyping (last year's slides)",
   "notes": [
    {
     "h": "Biggest mistakes a designer can make (Joyner)",
     "pts": [
      "<b>Biggest mistake</b>: jumping straight to designing an interface <b>without understanding the users or the task</b>.",
      "<b>Second biggest</b>: settling on a <b>single design idea</b> or a single genre of ideas <b>too early</b>."
     ]
    },
    {
     "h": "Design alternatives",
     "pts": [
      "A separate phase in Joyner's cycle. Explore a wide range of alternatives instead of focusing on one from the start.",
      "The mistake is common when <b>enhancing an existing system</b>, because you are captured by its current interface. Advice: <b>distance yourself from existing solutions</b>, at least during brainstorming.",
      "The final design is often a <b>combination</b> of alternatives explored earlier.",
      "How many alternatives? <b>As many as you can.</b>",
      "Example: the <b>first Microsoft mouse</b> had <b>more than 100 prototypes</b>."
     ]
    },
    {
     "h": "Prototyping",
     "pts": [
      "Most people think a prototype is a quick or small version of the real thing. That is not a useful understanding.",
      "For designers: <b>\"Rapidly creating an approximation of a design so that you can quickly get feedback.\"</b>",
      "Klemmer: <b>\"A prototype is not about the artifact, it's about feedback and iteration.\"</b>",
      "Joyner: design is an iterative process of brainstorming, combining, abandoning, revising and improving ideas, which requires several ideas to start with.",
      "A good prototype enables <b>useful (constructive) feedback</b> and iteration. It does not need to resemble the final product.",
      "Prototypes that give no new knowledge waste the design process. Klemmer: <b>\"prototypes are questions, ask a lot of them.\"</b>"
     ]
    }
   ],
   "cards": [
    [
     "Joyner: biggest design mistake",
     "Jumping straight to designing without understanding the users or the task."
    ],
    [
     "Joyner: second biggest mistake",
     "Settling on a single design idea (or genre) too early."
    ],
    [
     "Advice when enhancing an existing system",
     "Distance yourself from existing solutions during brainstorming."
    ],
    [
     "How many design alternatives?",
     "As many as you can."
    ],
    [
     "First Microsoft mouse",
     "More than 100 prototypes."
    ],
    [
     "Prototype (designer definition)",
     "Rapidly creating an approximation of a design to get feedback quickly."
    ],
    [
     "Klemmer on prototypes",
     "Not about the artifact; about feedback and iteration. \"Prototypes are questions, ask a lot of them.\""
    ]
   ],
   "qa": [
    [
     "What are the biggest mistakes a designer can make?",
     "According to Joyner: (1) jumping straight to designing without understanding the users or the task; (2) settling on a single design idea or genre too early."
    ],
    [
     "What is a prototype and why is it important?",
     "Rapidly creating an approximation of a design to get quick feedback. It matters because of feedback and iteration, not the artifact itself. A good prototype enables useful, constructive feedback."
    ],
    [
     "Why should designers explore many alternatives?",
     "Focusing on one alternative early is a big mistake. Exploring widely leads to better designs, and the final design is often a combination of alternatives. Aim for as many as possible (e.g. 100+ prototypes for the first Microsoft mouse)."
    ]
   ],
   "quiz": [
    {
     "q": "According to Joyner, the biggest mistake a designer can make is:",
     "o": [
      [
       "Not using enough prototypes",
       "Too few prototypes is not one of Joyner's two named mistakes. The biggest is jumping to design without understanding the users or the task (L8, Biggest mistakes)."
      ],
      [
       "Jumping straight to designing an interface without understanding the users",
       "Correct. Joyner's biggest mistake is jumping straight to designing an interface without understanding the users or the task; the second is settling on one idea too early (L8, Biggest mistakes)."
      ],
      [
       "Focusing too much on user feedback",
       "User feedback is encouraged throughout: prototypes exist to get feedback and iterate. Joyner's biggest mistake is designing without understanding the users (L8, Prototyping)."
      ],
      [
       "Settling on a single design idea too late",
       "The second mistake is settling on one idea too EARLY."
      ]
     ],
     "a": 1
    },
    {
     "q": "A common mistake when enhancing an existing system is:",
     "o": [
      [
       "Exploring too many design alternatives",
       "Exploring many alternatives is the advice, not the mistake: aim for as many as you can. The mistake is being captured by the current interface (L8, Design alternatives)."
      ],
      [
       "Being captured by the current interface",
       "Correct. Distance yourself from existing solutions."
      ],
      [
       "Ignoring user feedback",
       "Ignoring feedback is bad, but the mistake tied to enhancing an existing system is being captured by its current interface (L8, Design alternatives)."
      ],
      [
       "Spending too much time on prototypes",
       "Time on prototypes is not the named mistake; prototypes are encouraged. Enhancing a system tempts you to stay captured by its current interface (L8, Design alternatives)."
      ]
     ],
     "a": 1
    },
    {
     "q": "How many prototypes were produced for the first Microsoft mouse?",
     "o": [
      [
       "10",
       "Far too few. The lecture's example of exploring alternatives is the first Microsoft mouse, with more than 100 prototypes (L8, Design alternatives)."
      ],
      [
       "50",
       "Too few: the first Microsoft mouse went through more than 100 prototypes, used to show you should explore as many alternatives as you can (L8, Design alternatives)."
      ],
      [
       "100",
       "Close, but the lecture says more than 100, not exactly 100, so \"More than 100\" is the precise answer (L8, Design alternatives)."
      ],
      [
       "More than 100",
       "Correct. The first Microsoft mouse had more than 100 prototypes, the lecture's example of exploring as many design alternatives as you can (L8, Design alternatives)."
      ]
     ],
     "a": 3
    },
    {
     "q": "According to Klemmer, prototypes should be considered as:",
     "o": [
      [
       "Final products",
       "Prototypes are the opposite of final products: rapidly made approximations of a design for quick feedback (L8, Prototyping)."
      ],
      [
       "Questions that need to be answered",
       "Correct. \"Prototypes are questions, ask a lot of them.\""
      ],
      [
       "Artifacts to showcase",
       "Klemmer says \"a prototype is not about the artifact, it's about feedback and iteration\", so they are not things to show off (L8, Prototyping)."
      ],
      [
       "Simple mock-ups",
       "Seeing a prototype as just a simple mock-up misses its purpose. Klemmer treats prototypes as questions that gather feedback (L8, Prototyping)."
      ]
     ],
     "a": 1
    },
    {
     "q": "\"A prototype is one that enables you to get useful feedback and iterate on your design.\"",
     "o": [
      [
       "True",
       "Correct. The lecture defines a good prototype as one that enables useful (constructive) feedback and lets you iterate on the design (L8, Prototyping)."
      ],
      [
       "False",
       "This is the lecture's definition of a good prototype."
      ]
     ],
     "a": 0,
     "src": "Exam 2024/25"
    },
    {
     "q": "A good prototype is characterized by:",
     "o": [
      [
       "Resembling the final product closely",
       "The lecture says it need not resemble the final product."
      ],
      [
       "Enabling useful feedback and iteration",
       "Correct. A good prototype enables useful, constructive feedback and iteration; it does not need to resemble the final product (L8, Prototyping)."
      ],
      [
       "Being a quick version of the final design",
       "\"A quick or small version of the real thing\" is the common view the lecture calls not useful. A prototype is an approximation made to get feedback (L8, Prototyping)."
      ],
      [
       "Having a polished appearance",
       "Polish is not the goal: a prototype need not resemble the final product, and finished-looking ones get less constructive feedback than sketches (L8; L9, Lo-fi)."
      ]
     ],
     "a": 1
    },
    {
     "q": "How many design alternatives should you aim for early on?",
     "o": [
      [
       "One",
       "Settling on one is the second biggest mistake."
      ],
      [
       "As many as possible",
       "Correct. Explore a wide range rather than one idea from the start: aim for as many alternatives as you can, like the 100+ prototypes of the first Microsoft mouse (L8, Design alternatives)."
      ],
      [
       "Exactly three",
       "The lecture sets no fixed number like three. Its answer is \"as many as you can\" (L8, Design alternatives)."
      ],
      [
       "None",
       "Design alternatives is a whole phase of Joyner's cycle, and skipping it means settling on one idea early, the second biggest mistake (L8, Design alternatives)."
      ]
     ],
     "a": 1
    }
   ]
  },
  {
   "n": 9,
   "title": "Fidelity, Brainstorming, Wireframes and Forms (last year's slides)",
   "notes": [
    {
     "h": "Prototypes and fidelity",
     "pts": [
      "Prototypes communicate with stakeholders. Their four audiences are <b>colleagues, clients, users and yourself</b>.",
      "<b>Fidelity</b>: how closely a design matches the look and feel of the final product. There are <b>low-fidelity (lo-fi)</b> and <b>high-fidelity (hi-fi)</b> prototypes.",
      "Start with lo-fi, and move to hi-fi as the design proceeds."
     ]
    },
    {
     "h": "Power of low-fidelity prototypes",
     "pts": [
      "They are <b>faster, easier and cheaper</b> to make.",
      "Hi-fi is not possible at the beginning because many details have not been decided.",
      "<b>People are much more willing to talk</b> when given a sketch than something that looks finished.",
      "Konstan: a prototype that looks like little effort (e.g. hand-drawn) gets more <b>constructive feedback</b>.",
      "Too many details make people give feedback at a <b>lower level</b> than needed.",
      "Google: present <b>high-level ideas</b> early; focus on details and screens later."
     ]
    },
    {
     "h": "Design activities and brainstorming",
     "pts": [
      "Every design activity either helps the <b>designer think and visualize</b>, or helps <b>team members and stakeholders visualize and communicate</b>, or both.",
      "Brainstorming aims to generate a lot of ideas. Joyner: <b>start with individual brainstorming</b>, because groups coalesce on ideas too early.",
      "Tips: write as many ideas as you can; each idea is a few words or a sentence; <b>aim for 20</b>; <b>do not evaluate or exclude</b> any idea; take breaks or use several sessions; team sessions are for sharing and adding ideas, not narrowing."
     ]
    },
    {
     "h": "Why study design? And the design-development process",
     "pts": [
      "Some students will shine as designers; developers often do design when there are no designers; developers work better with designers when they understand the process.",
      "<b>Handoff process</b>: design finishes, then it is handed over to development (sequential).",
      "<b>Handshake process</b>: design and development run <b>in parallel</b> with frequent sync points."
     ]
    },
    {
     "h": "Wireframes",
     "pts": [
      "A <b>schematic for the basic outline of a screen</b>. It is built from lines and basic shapes (rectangles, circles) with some text, and the lines look like wires.",
      "It intentionally has <b>no colors or font styles</b>, to focus on structure. Wireframe = <b>skeleton with placeholders</b>.",
      "Google calls it a \"key part of the design process\".",
      "Wireframes are not art. They organize and communicate information clearly.",
      "Purposes: (1) decide the basic page structure before colors and images; (2) get the team on the same page early, saving time and resources; (3) direct feedback to the right level (structure and function, not colors and typography); (4) catch forgotten or disorganized elements early.",
      "When: <b>after foundational user research</b>, as soon as there is an initial <b>site map</b> (content hierarchy)."
     ]
    },
    {
     "h": "Wireframing standards and process",
     "pts": [
      "Standards: text as horizontal lines or placeholder text; images as rectangles or circles with an <b>X</b>; calls to action as rectangles or circles; proper <b>annotation</b>.",
      "Process: start with <b>pen and paper</b>. The first goal is <b>reaching</b> a design, not showing one. Sketch <b>at least 5 versions</b> per screen. Iterate with feedback. The second goal is to move an idea from your mind to paper quickly, so ignore straight lines, spacing and alignment at this stage.",
      "Then use tools: <b>Figma, Adobe XD, Sketch, Balsamiq, Pencil</b>.",
      "Example in the lecture: a dog-walking app."
     ]
    },
    {
     "h": "Form design guidelines",
     "pts": [
      "Important commands are <b>buttons, not links</b>, because buttons catch the eye. But do <b>not</b> display all commands as buttons.",
      "<b>Breadcrumbs</b> show <b>where</b> users are, when there are multiple choices. <b>Progress bars</b> show where users are <b>and what is left</b>, for a predefined unique path.",
      "A successful form submission is confirmed with a <b>confirmation page</b>.",
      "<b>Error messages sit next to the field</b> where the error occurred. Changing the field border color (e.g. red) is preferred.",
      "Text boxes provide <b>plenty of space</b> for the answer.",
      "Fields contain <b>hints, examples or required formats</b>.",
      "<b>Remove repetitive actions</b>: remember customers' preferences.",
      "Make a <b>clear distinction between primary and secondary calls-to-action</b> (e.g. \"Go Pro\" stands out over \"Free Trial\")."
     ]
    }
   ],
   "cards": [
    [
     "Four audiences of prototypes",
     "Colleagues, clients, users, yourself."
    ],
    [
     "Fidelity",
     "How closely a design matches the look and feel of the final product."
    ],
    [
     "Why lo-fi first? (key reason)",
     "People are more willing to talk and give constructive feedback on a sketch than on something that looks finished."
    ],
    [
     "Brainstorming: individual or group first?",
     "Individual first; groups coalesce ideas too early."
    ],
    [
     "Brainstorming target",
     "Aim for 20 ideas; do not evaluate any."
    ],
    [
     "Wireframe",
     "Schematic of a screen's basic outline: lines, shapes, some text, no colors or fonts. A skeleton with placeholders."
    ],
    [
     "When to wireframe",
     "After foundational research, once there is an initial site map."
    ],
    [
     "Wireframe image placeholder",
     "A rectangle or circle with an X."
    ],
    [
     "Wireframing tools",
     "Figma, Adobe XD, Sketch, Balsamiq, Pencil."
    ],
    [
     "Handoff vs Handshake",
     "Handoff: design then development (sequential). Handshake: parallel with frequent syncs."
    ],
    [
     "Breadcrumbs vs progress bar",
     "Breadcrumbs: where you are. Progress bar: where you are and what is left (fixed path)."
    ]
   ],
   "qa": [
    [
     "What is the power of low-fidelity prototypes?",
     "They are faster, easier and cheaper. Hi-fi is impossible early because details are undecided. People are more willing to talk about a sketch, and a hand-drawn prototype gets more constructive feedback (Konstan). Too much detail pushes feedback to a lower level than needed. Google: present high-level ideas early and details later."
    ],
    [
     "Define wireframes and give their purposes.",
     "A schematic for the basic outline of a screen, built from lines and basic shapes with some text, intentionally without colors or fonts, to focus on structure (a skeleton with placeholders). Purposes: decide structure before visuals; get the team aligned early and save resources; get feedback at the right level; catch forgotten or disorganized elements early."
    ],
    [
     "What are the types of the design-development process?",
     "Handoff: design is completed and handed to development, one after the other. Handshake: design and development run in parallel with frequent sync points."
    ],
    [
     "Give tips for effective brainstorming.",
     "Start individually. Write as many ideas as you can, each a few words or a sentence. Aim for 20. Do not evaluate or exclude ideas. Take breaks or use several sessions. Team sessions are for sharing and adding ideas, not narrowing choices."
    ],
    [
     "What are the wireframing industry standards?",
     "Text as horizontal lines or placeholder text; images as rectangles or circles with an X; calls to action as rectangles or circles; proper text annotations."
    ]
   ],
   "quiz": [
    {
     "q": "\"High fidelity prototypes are faster, easier and cheaper to generate than low fidelity.\"",
     "o": [
      [
       "True",
       "Reversed: LOW-fidelity prototypes are faster, easier and cheaper."
      ],
      [
       "False",
       "Correct. The statement is reversed: it is low-fidelity prototypes that are faster, easier and cheaper to make, which is why you start lo-fi and move to hi-fi later (L9, Power of lo-fi)."
      ]
     ],
     "a": 1,
     "src": "Exam 2024/25 & 2025/26"
    },
    {
     "q": "A key advantage of low-fidelity prototypes is:",
     "o": [
      [
       "They are expensive and slow, which ensures quality",
       "The opposite: lo-fi prototypes are faster, easier and cheaper to make, and that is their power (L9, Power of lo-fi)."
      ],
      [
       "They provide detailed animations and realistic UI",
       "Detailed, realistic UI is high fidelity, a close match to the final look and feel. Lo-fi prototypes are rough sketches (L9, Prototypes and fidelity)."
      ],
      [
       "They allow quick feedback and rapid iteration",
       "Correct. Lo-fi prototypes are fast and cheap, and people talk more freely about a sketch, giving constructive feedback you can quickly iterate on (L9, Power of lo-fi)."
      ],
      [
       "They eliminate the need for high-fidelity prototypes",
       "Lo-fi does not replace hi-fi: you start with lo-fi and move to hi-fi as the design proceeds (L9, Prototypes and fidelity)."
      ]
     ],
     "a": 2,
     "src": "Exam 2025/26"
    },
    {
     "q": "What is the primary purpose of a wireframe?",
     "o": [
      [
       "To showcase the final design with colors and images",
       "Wireframes intentionally have no colors or font styles. Showing the final visual design is the job of hi-fi prototypes, not wireframes (L9, Wireframes)."
      ],
      [
       "To test backend functionality",
       "Wireframes say nothing about backend code; they are a schematic of a screen's outline, used to decide page structure (L9, Wireframes)."
      ],
      [
       "To outline the structure and layout of a page or app without detailed design",
       "Correct. A wireframe is a schematic for the basic outline of a screen, a skeleton with placeholders, with no colors or fonts so that it focuses on structure (L9, Wireframes)."
      ],
      [
       "To write the code for the user interface",
       "Wireframes are drawn, not coded: pen and paper first, then tools like Figma or Balsamiq. They decide structure before any visual design or code (L9, Wireframes)."
      ]
     ],
     "a": 2,
     "src": "Exam 2025/26"
    },
    {
     "q": "Which tools are commonly used to create wireframes?",
     "o": [
      [
       "Visual Studio and Eclipse",
       "Visual Studio and Eclipse are IDEs for writing code. The lecture's wireframing tools are Figma, Adobe XD, Sketch, Balsamiq and Pencil (L9, Wireframing process)."
      ],
      [
       "Microsoft Word and Excel",
       "Word and Excel are office tools, not in the lecture's list. Wireframing tools are Figma, Adobe XD, Sketch, Balsamiq and Pencil (L9, Wireframing process)."
      ],
      [
       "Balsamiq, Figma and Sketch",
       "Correct. All three are in the lecture's list (with Adobe XD and Pencil)."
      ],
      [
       "Final Cut Pro and Adobe Premiere",
       "Final Cut Pro and Premiere are video editors. The listed wireframing tools are Figma, Adobe XD, Sketch, Balsamiq and Pencil (L9, Wireframing process)."
      ]
     ],
     "a": 2,
     "src": "Exam 2025/26"
    },
    {
     "q": "When should wireframes be created?",
     "o": [
      [
       "Before any user research",
       "Too early: wireframes are made after foundational user research, once you have an initial site map (L9, Wireframes)."
      ],
      [
       "After foundational user research and an initial site map",
       "Correct. Wireframes come after foundational user research, as soon as there is an initial site map (content hierarchy) to lay out (L9, Wireframes)."
      ],
      [
       "Only after hi-fi prototypes",
       "Wireframes are lo-fi skeletons, and the lecture says start lo-fi and move to hi-fi, so they come before hi-fi prototypes (L9, Prototypes and fidelity)."
      ],
      [
       "At the end of the design process",
       "Wireframes come early: their purpose is to fix structure and catch forgotten elements before colors and images, after foundational research (L9, Wireframes)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which is NOT a wireframing industry standard?",
     "o": [
      [
       "Text as horizontal lines or placeholder text",
       "Showing text as horizontal lines or placeholder text is one of the wireframing standards, so it is not the answer (L9, Wireframing standards)."
      ],
      [
       "Images as rectangles or circles with an X",
       "Images drawn as rectangles or circles with an X is a listed wireframing standard, so it is not the answer (L9, Wireframing standards)."
      ],
      [
       "Detailed color schemes and typography",
       "Correct. Wireframes intentionally avoid colors and font styles."
      ],
      [
       "Calls to action as rectangles or circles",
       "Calls to action drawn as rectangles or circles is a listed standard. The odd one out is detailed colors and typography (L9, Wireframing standards)."
      ]
     ],
     "a": 2
    },
    {
     "q": "According to Joyner, brainstorming should start:",
     "o": [
      [
       "As a group, so ideas merge early",
       "Groups coalesce ideas too early, which is the problem."
      ],
      [
       "Individually",
       "Correct. Each member first builds their own set of ideas."
      ],
      [
       "With evaluation of each idea",
       "Brainstorming tips say not to evaluate or exclude any idea; the aim is to generate as many as possible, about 20 (L9, Brainstorming)."
      ],
      [
       "With the final design",
       "Starting with a final design defeats the point of brainstorming, which is to generate many ideas, beginning individually (L9, Brainstorming)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Where should an error message be displayed in a form?",
     "o": [
      [
       "In a popup after submitting",
       "The guideline is to show it next to the field."
      ],
      [
       "Next to the input field where the error occurred",
       "Correct. Error messages sit next to the field where the error occurred, so the user sees exactly what to fix; changing the field border color (e.g. red) is preferred (L9, Form design)."
      ],
      [
       "At the bottom of the page",
       "The bottom of the page is far from the field that caused the error. The guideline puts the message next to that field (L9, Form design)."
      ],
      [
       "In the page title",
       "The page title is not where form errors go; the user would have to find the field. Errors belong next to the faulty input (L9, Form design)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which shows where users are AND what is left to do, on a predefined path?",
     "o": [
      [
       "Breadcrumbs",
       "Breadcrumbs show only where users are, when there are multiple choices."
      ],
      [
       "Progress bar",
       "Correct. A progress bar shows where users are and what is left, on a predefined unique path; breadcrumbs only show where they are (L9, Form design)."
      ],
      [
       "Tabs",
       "Tabs switch between sections but do not show steps left on a fixed path; that is a progress bar's job (L9, Form design)."
      ],
      [
       "Links",
       "Links are for navigating, not for showing position. The guideline also says important commands should be buttons, not links (L9, Form design)."
      ]
     ],
     "a": 1
    },
    {
     "q": "The prototype audience list includes:",
     "o": [
      [
       "Colleagues, clients, users and yourself",
       "Correct. Prototypes communicate with stakeholders, and the lecture names four audiences: colleagues, clients, users and yourself (L9, Prototypes and fidelity)."
      ],
      [
       "Only users",
       "Too narrow: users are one audience, but prototypes also serve colleagues, clients and yourself (L9, Prototypes and fidelity)."
      ],
      [
       "Only managers",
       "Managers are not in the list. The four audiences are colleagues, clients, users and yourself (L9, Prototypes and fidelity)."
      ],
      [
       "Competitors",
       "Competitors are not stakeholders you prototype for. The audiences are colleagues, clients, users and yourself (L9, Prototypes and fidelity)."
      ]
     ],
     "a": 0
    }
   ]
  },
  {
   "n": 10,
   "title": "Forms, Layout and Navigation Guidelines (last year's slides)",
   "notes": [
    {
     "h": "Forms (continued)",
     "pts": [
      "<b>Stick to a simple 3-color palette.</b> More than 3 primary colors is difficult and confuses users.",
      "<b>Alert messages are consistent</b> across the whole site. Do not change color, style or placement.",
      "<b>Close vs Cancel</b>: if there is only one button it should be <b>\"Close\"</b>. With two buttons (an Action button and one to dismiss) use <b>\"Cancel\"</b>, not \"Close\". Cancel is most commonly placed <b>to the right</b> and is <b>not eye-catching</b>.",
      "<b>Error messages</b>: state the problem in the <b>title</b>; describe briefly <b>why it happened</b> under the title; when possible link to <b>complete the task or return</b> to the previous state; give recommendations for the <b>next course of action</b>.",
      "<b>System notice</b>: an \"Action\" button, a \"Remind me later\" button and a \"Don't show again\" box. Notice messages should not be lengthy or generic."
     ]
    },
    {
     "h": "Layout",
     "pts": [
      "The most important information is <b>above the fold</b> (the part visible without scrolling).",
      "<b>Related information is grouped</b> by a <b>frame</b> or a <b>separator</b>.",
      "<b>Color groups and structures items</b> (e.g. HR, Technical and Payroll fields).",
      "<b>Related items are logically ordered</b> (First/Middle/Last name; Start/End date; Origin/Destination).",
      "Your <b>logo is in the same place on every page</b> (no shift).",
      "The <b>background is not complicated</b> and does not distract from content."
     ]
    },
    {
     "h": "Navigation",
     "pts": [
      "There is a <b>clear call-to-action</b> telling users what to do next. A CTA is an eye-catching button for the most common next step.",
      "It is clear <b>where users are</b> on the site, for example with <b>breadcrumbs</b>.",
      "There are clear <b>links to the Home page and categories on every page</b>.",
      "<b>Navigation tabs are at the top</b> of the page.",
      "There is an <b>obvious change on hover</b> over anything clickable.",
      "The <b>company logo links to the homepage</b>.",
      "Map out <b>\"Red Routes\"</b>: the series of pages or actions customers most often use to complete tasks."
     ]
    }
   ],
   "cards": [
    [
     "Color palette rule",
     "Stick to a simple 3-color palette."
    ],
    [
     "One dismiss button: label?",
     "\"Close\"."
    ],
    [
     "Action + dismiss buttons: label?",
     "\"Cancel\" (not \"Close\"): to the right and not eye-catching."
    ],
    [
     "Parts of a good error message",
     "Problem in the title; why it happened; a link to complete or go back; recommendations for next action."
    ],
    [
     "System notice buttons",
     "Action, \"Remind me later\", \"Don't show again\"."
    ],
    [
     "Above the fold",
     "The part of the page visible without scrolling; put the most important info there."
    ],
    [
     "Grouping related info",
     "By frame, separator or color."
    ],
    [
     "Red Routes",
     "The series of pages or actions customers most often use to complete tasks."
    ],
    [
     "Logo rules",
     "Same place on every page, and it links to the homepage."
    ]
   ],
   "qa": [
    [
     "What are the guidelines for writing error messages?",
     "State the problem in the title; describe briefly why it happened; when possible link to complete the task or return to the previous state; give recommendations for the next action."
    ],
    [
     "List the layout guidelines.",
     "Most important info above the fold; group related info (frame or separator); use color to group; order related items logically; keep the logo in the same place on every page; keep the background simple."
    ],
    [
     "List the navigation guidelines.",
     "A clear CTA for what to do next; show where users are (breadcrumbs); links to Home and categories on every page; tabs at the top; obvious hover change on clickables; logo links to the homepage; map out Red Routes."
    ],
    [
     "When do you use \"Close\" versus \"Cancel\"?",
     "One button only: \"Close\". Two buttons (an action plus a dismiss): \"Cancel\", usually on the right and not eye-catching."
    ]
   ],
   "quiz": [
    {
     "q": "If a dialog has only ONE button to dismiss it, the button should say:",
     "o": [
      [
       "Cancel",
       "Cancel is used when there is also an action button."
      ],
      [
       "Close",
       "Correct. When a dialog has only one button, it should say \"Close\". \"Cancel\" is used only when there are two buttons, an action button and one to dismiss (L10, Close vs Cancel)."
      ],
      [
       "Exit",
       "\"Exit\" is not a label in the guideline. The rule is \"Close\" for a single dismiss button and \"Cancel\" next to an action button (L10, Close vs Cancel)."
      ],
      [
       "Abort",
       "\"Abort\" is not a label the guideline uses; it sounds harsh and technical. A lone dismiss button should say \"Close\" (L10, Close vs Cancel)."
      ]
     ],
     "a": 1
    },
    {
     "q": "How many primary colors should a form or page use?",
     "o": [
      [
       "A simple 3-color palette",
       "Correct. The form guideline is to stick to a simple 3-color palette, because more than 3 primary colors is difficult and confuses users (L10, Forms)."
      ],
      [
       "As many as possible",
       "Many colors break the guideline: more than 3 primary colors is difficult and confuses users, so keep a simple 3-color palette (L10, Forms)."
      ],
      [
       "Only 1",
       "One color is not the rule. The guideline is a simple 3-color palette; the limit is not going above 3 (L10, Forms)."
      ],
      [
       "7",
       "7 is more than double the limit. Over 3 primary colors confuses users, so the guideline says a simple 3-color palette (L10, Forms)."
      ]
     ],
     "a": 0
    },
    {
     "q": "\"Above the fold\" means:",
     "o": [
      [
       "The page header only",
       "Too narrow: \"above the fold\" is everything visible without scrolling, not just the header. The most important information goes there (L10, Layout)."
      ],
      [
       "The part of the page visible without scrolling",
       "Correct. Put the most important information there."
      ],
      [
       "The footer area",
       "The opposite: the footer is usually below the fold, out of view until you scroll. Above the fold is the part visible without scrolling (L10, Layout)."
      ],
      [
       "A folded menu",
       "Nothing is folded: \"the fold\" is the bottom edge of the first screen, and above it is what users see without scrolling (L10, Layout)."
      ]
     ],
     "a": 1
    },
    {
     "q": "\"Red Routes\" are:",
     "o": [
      [
       "Error pages",
       "Red Routes have nothing to do with errors. They are the series of pages or actions customers most often use to complete tasks (L10, Navigation)."
      ],
      [
       "The series of pages or actions customers most often use to complete tasks",
       "Correct. Mapping out \"Red Routes\" means identifying the series of pages or actions customers most often use to complete tasks, so navigation supports them (L10, Navigation)."
      ],
      [
       "Links colored red",
       "\"Red\" is not about link color: Red Routes are the most common paths of pages or actions customers use to complete tasks (L10, Navigation)."
      ],
      [
       "Forbidden navigation paths",
       "Red Routes are the paths customers use most, not paths they are blocked from (L10, Navigation)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which is a navigation guideline?",
     "o": [
      [
       "The company logo links to the homepage",
       "Correct. One of the navigation guidelines is that the company logo links to the homepage (and the layout rule keeps it in the same place on every page) (L10, Navigation)."
      ],
      [
       "Tabs are placed at the bottom of the page",
       "Navigation tabs belong at the top of the page, not the bottom (L10, Navigation)."
      ],
      [
       "Clickable items look the same on hover",
       "The guideline is the reverse: there should be an obvious change on hover over anything clickable, so users know it can be clicked (L10, Navigation)."
      ],
      [
       "Home links appear only on the home page",
       "Home and category links belong on every page."
      ]
     ],
     "a": 0
    },
    {
     "q": "A good error message should FIRST:",
     "o": [
      [
       "State the encountered problem in the title",
       "Correct. The first error-message guideline is to state the problem in the title, then briefly say why it happened, link to complete or return, and recommend a next action (L10, Forms)."
      ],
      [
       "Show a long technical stack trace",
       "A long stack trace is not a brief explanation. The guideline says to state the problem in the title, then describe briefly why it happened (L10, Forms)."
      ],
      [
       "Apologize repeatedly",
       "Apologies are not among the error-message guidelines. The first step is stating the problem in the title (L10, Forms)."
      ],
      [
       "Close the application",
       "Closing the app loses the user's work. The guidelines want a link to complete the task or return to the previous state, plus a next action (L10, Forms)."
      ]
     ],
     "a": 0
    },
    {
     "q": "Where is the \"Cancel\" button most commonly placed?",
     "o": [
      [
       "To the left, eye-catching",
       "The guideline says right and not eye-catching."
      ],
      [
       "To the right, not eye-catching",
       "Correct. Cancel is most commonly placed to the right and is not eye-catching, so the action button gets the user's attention (L10, Close vs Cancel)."
      ],
      [
       "At the top of the page",
       "The top of the page is not where dialog buttons go. Cancel is most commonly placed to the right and is not eye-catching (L10, Close vs Cancel)."
      ],
      [
       "Hidden",
       "Cancel must still be visible, just not eye-catching, and is usually on the right; hiding it would leave users unable to dismiss (L10, Close vs Cancel)."
      ]
     ],
     "a": 1
    }
   ]
  }
 ],
 "exams": [
  {
   "title": "Final Exam 2025/2026",
   "meta": "First term · 2 hours · 60 marks · Dr. Mona Lackousha, Prof. Dr. Sherif Mohram",
   "note": "This paper was scanned without an answer key. The answers below are worked out from the lectures.",
   "sections": [
    {
     "title": "Q1-A · True or False",
     "marks": "10 marks · 1 each",
     "items": [
      {
       "type": "tf",
       "q": "Analyzing academic papers and previous research studies is an example of secondary research.",
       "a": 0,
       "why": "Papers and studies were produced by someone else, so this is secondary research (L2).",
       "ow": [
        null,
        "Papers and previous studies were done by someone else, which is exactly the lecture's definition of secondary research (books, journals). Primary is research you conduct yourself (L2)."
       ]
      },
      {
       "type": "tf",
       "q": "Tactical research takes place after the design phase.",
       "a": 1,
       "why": "Tactical (design) research takes place DURING design. The research that follows launch is post-launch research (L2).",
       "ow": [
        "Tactical (design) research happens during the design phase, using feedback on prototypes. Research after launch is post-launch research (L2, Types by WHEN).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "High fidelity prototypes are faster, easier and cheaper to generate than low fidelity.",
       "a": 1,
       "why": "Reversed. Low-fidelity prototypes are the faster, easier and cheaper ones (L9).",
       "ow": [
        "Reversed: low-fidelity prototypes are the faster, easier and cheaper ones, which is why you start lo-fi and move to hi-fi later (L9, Power of lo-fi).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "Individuals interview easier to coordinate than groups' interview.",
       "a": 0,
       "why": "The comparison lists \"easier to coordinate the logistics\" under individuals (L7).",
       "ow": [
        null,
        "The individuals vs groups table lists \"easier to coordinate the logistics\" as an advantage of individual interviews, so the statement is true (L7)."
       ]
      },
      {
       "type": "tf",
       "q": "A well-designed survey should take a long time to complete to ensure detailed responses.",
       "a": 1,
       "why": "Keep surveys as small as possible. Too many questions reduce the response rate and reliability (L5).",
       "ow": [
        "Long surveys hurt: the tip is to keep a survey as small as possible, because too many questions reduce the response rate and reliability (L5, Surveys).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "UX Design refers to interactivity, look and feel of product screen or web page.",
       "a": 1,
       "why": "That is UI design. UX is the overall experience (L1).",
       "ow": [
        "Interactivity, look and feel of a screen or page is UI design. UX design is the user's overall experience with the product or website (L1, UI vs UX vs HCI).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "Survey is common method used in primary research.",
       "a": 0,
       "why": "Surveys are listed among the common primary methods (L2).",
       "ow": [
        null,
        "Surveys are one of the lecture's primary research methods, with interviews, focus groups, usability studies and observations, since you run them yourself (L2)."
       ]
      },
      {
       "type": "tf",
       "q": "User feedback is not necessary when designing a user interface.",
       "a": 1,
       "why": "The whole course is about user-centered design: involve users early and often, and prototypes exist to get feedback (L2, L8).",
       "ow": [
        "User-centered design needs users at every step: \"you need users early and often\", and prototypes exist to get feedback and iterate (L2; L8).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "Focus groups and interviews are examples of primary research methods.",
       "a": 0,
       "why": "Focus groups and interviews are both in the lecture's list of primary methods (with surveys, usability studies and observations), because you conduct them yourself (L2, Types by WHO).",
       "ow": [
        null,
        "Focus groups and interviews are both in the lecture's list of primary methods, because you conduct them yourself (L2, Types by WHO)."
       ]
      },
      {
       "type": "tf",
       "q": "Qualitative research involves data of numeric nature.",
       "a": 1,
       "why": "Numeric data is quantitative. Qualitative is about why and how (L5).",
       "ow": [
        "Numeric data (measures, counts) is quantitative. Qualitative research is observations about why and how things happen, often from interviews (L5, Types by WHAT).",
        null
       ]
      }
     ]
    },
    {
     "title": "Q1-B · Multiple choice",
     "marks": "10 marks · 1 each",
     "items": [
      {
       "type": "mcq",
       "q": "Why is privacy and security important in user research?",
       "o": [
        "It ensures compliance and protects user data",
        "It makes research faster",
        "It allows sharing all data publicly",
        "It reduces the need for interviews"
       ],
       "a": 0,
       "why": "Privacy protects users' PII and SPII. The other options are unrelated or the opposite of privacy.",
       "ow": [
        null,
        "Privacy does not speed research up: the guidelines add care (collect only what you need, avoid linking to PII/SPII, delete after use) (L5).",
        "The opposite of privacy: you should collect only the data you need, keep it apart from PII/SPII and delete it when no longer needed (L5).",
        "Privacy does not replace any research method; interviews are still needed. It matters because it protects user data (L5)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which statement reflects good practice in user research?",
       "o": [
        "Prepare questions ahead but adapt as needed during the session",
        "Never change the script under any circumstance",
        "Use only quantitative methods",
        "Focus on convenience over privacy"
       ],
       "a": 0,
       "why": "Plan ahead, but \"the script is not a bible\". Combine methods and keep privacy essential.",
       "ow": [
        null,
        "The lecture says planning is not strictness: \"the script is not a bible\", so adapt during the session (L5, General tips).",
        "Methods should be combined in a relevant order, and qualitative research is what gives real understanding, so quantitative-only is wrong (L5).",
        "Privacy and security of user data are listed as essential, so they must never be traded for convenience (L5, General tips)."
       ]
      },
      {
       "type": "mcq",
       "q": "Quantitative research is often easier for:",
       "o": [
        "Designers only",
        "Engineers and technical people",
        "Marketing teams only",
        "Children"
       ],
       "a": 1,
       "why": "L5: quantitative (numeric) data is \"easier for engineers and technical people to handle\".",
       "ow": [
        "The lecture does not single out designers; it says quantitative (numeric) research is easier for engineers and technical people (L5).",
        null,
        "Marketing teams are not mentioned. Quantitative research is easier for engineers and technical people (L5, Types by WHAT).",
        "Children have nothing to do with this point. Quantitative research is said to be easier for engineers and technical people (L5)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following best summarizes a good survey design principle?",
       "o": [
        "Long surveys with complex questions",
        "Short, clear, unbiased surveys with participant feedback considered",
        "Surveys without planning",
        "Focus only on quantitative questions"
       ],
       "a": 1,
       "why": "Keep it small, be clear, be aware of bias, and get feedback from participants.",
       "ow": [
        "The opposite of the tips: keep surveys as small as possible and questions concise, since long surveys hurt response rate and reliability (L5; L6).",
        null,
        "Research must be planned ahead; a survey without planning breaks the general research tips (L5, General tips).",
        "The lecture says to leave open-ended questions open and to combine methods, so quantitative-only questions are not the principle (L6, Be Unbiased)."
       ]
      },
      {
       "type": "mcq",
       "q": "Why is privacy and security important in user research? (repeated on page 2)",
       "o": [
        "It ensures compliance and protects user data",
        "It makes research faster",
        "It allows sharing all data publicly",
        "It reduces the need for interviews"
       ],
       "a": 0,
       "why": "Same question as #1, printed twice on the paper.",
       "ow": [
        null,
        "Privacy does not speed research up: the guidelines add care (collect only what you need, avoid linking to PII/SPII, delete after use) (L5).",
        "The opposite of privacy: you should collect only the data you need, keep it apart from PII/SPII and delete it when no longer needed (L5).",
        "Privacy does not replace any research method; interviews are still needed. It matters because it protects user data (L5)."
       ]
      },
      {
       "type": "mcq",
       "q": "What is the primary purpose of a wireframe?",
       "o": [
        "To showcase the final design with colors and images",
        "To test backend functionality",
        "To outline the structure and layout of a webpage or app without detailed design",
        "To write the code for the user interface"
       ],
       "a": 2,
       "why": "A wireframe is a skeleton with placeholders and intentionally has no colors or fonts.",
       "ow": [
        "Wireframes intentionally have no colors or font styles; showing the final visual design is what hi-fi prototypes do (L9, Wireframes).",
        "Wireframes say nothing about the backend; they are a schematic of a screen's basic outline (L9, Wireframes).",
        null,
        "Wireframes are drawn (pen and paper, then Figma, Balsamiq…), not coded, and they come before visual design and code (L9)."
       ]
      },
      {
       "type": "mcq",
       "q": "What kind of tools is commonly used to create wireframes?",
       "o": [
        "Visual Studio and Eclipse",
        "Microsoft Word and Excel",
        "Balsamiq, Figma, and Sketch",
        "Final Cut Pro and Adobe Premiere"
       ],
       "a": 2,
       "why": "The lecture lists Figma, Adobe XD, Sketch, Balsamiq and Pencil.",
       "ow": [
        "Visual Studio and Eclipse are IDEs for code. The lecture's wireframing tools are Figma, Adobe XD, Sketch, Balsamiq and Pencil (L9).",
        "Word and Excel are office tools, not in the list. Wireframing tools are Figma, Adobe XD, Sketch, Balsamiq and Pencil (L9).",
        null,
        "Final Cut Pro and Premiere are video editors. Wireframing tools are Figma, Adobe XD, Sketch, Balsamiq and Pencil (L9)."
       ]
      },
      {
       "type": "mcq",
       "q": "Which of the following is a key advantage of using low-fidelity prototypes?",
       "o": [
        "They are expensive and take time to build, which ensures quality",
        "They provide detailed animations and realistic UI",
        "They allow for quick feedback and rapid iteration",
        "They eliminate the need for high-fidelity prototypes"
       ],
       "a": 2,
       "why": "Lo-fi is fast and cheap and gets more constructive feedback.",
       "ow": [
        "The opposite: lo-fi prototypes are faster, easier and cheaper to make, and that is their power (L9, Power of lo-fi).",
        "Detailed, realistic UI is high fidelity, a close match to the final look and feel; lo-fi prototypes are rough sketches (L9).",
        null,
        "Lo-fi does not replace hi-fi: you start with lo-fi and move to hi-fi as the design proceeds (L9, Prototypes and fidelity)."
       ]
      },
      {
       "type": "mcq",
       "q": "What is an example of a qualitative primary research method in HCI?",
       "o": [
        "Statistical analysis of survey data",
        "Collecting data of numeric nature",
        "Observing users interacting with a prototype",
        "Analyzing existing system logs"
       ],
       "a": 2,
       "why": "Observation is primary (you do it) and qualitative (how and why). Statistics and numbers are quantitative, and existing logs are not newly collected.",
       "ow": [
        "Statistical analysis works on numbers, so it is quantitative, not qualitative, even if the survey was primary (L5, Types by WHAT).",
        "Data of numeric nature is the definition of quantitative research, the opposite of what the question asks (L5, Types by WHAT).",
        null,
        "Existing system logs are data already there, not collected by you through a study, and logs are mostly counts (quantitative), not why/how (L5)."
       ]
      },
      {
       "type": "mcq",
       "q": "Before a user interview, what should researchers do?",
       "o": [
        "Ask random questions without preparation",
        "Write a script of questions to guide the interview",
        "Ignore the interviewee's context",
        "Focus only on technical details"
       ],
       "a": 1,
       "why": "L5: \"effort should be done before the interview to write a script of the questions\".",
       "ow": [
        "The lecture says to plan ahead and write a script of questions instead of asking random questions (L5, General tips).",
        null,
        "Ignoring context is not a preparation step. Researchers should plan ahead with a script of questions (L5, General tips).",
        "User research is about users' needs and pain points, not only technical details. The preparation step is writing a question script (L5)."
       ]
      }
     ]
    },
    {
     "title": "Question 2",
     "marks": "20 marks",
     "items": [
      {
       "type": "written",
       "q": "A. Compare between primary research and secondary research. (5 marks)",
       "ans": "<table><tr><th></th><th>Primary</th><th>Secondary</th></tr><tr><td>Collected by</td><td>You (or someone you hire)</td><td>Someone else</td></tr><tr><td>Examples</td><td>Surveys, focus groups, interviews, observations, experiments</td><td>Looking at existing data: books, journals, reports</td></tr><tr><td>Qual. or quant.?</td><td>Either</td><td>Either</td></tr><tr><td>Benefit</td><td>Specific to your needs; you control the quality</td><td>Usually cheap and quick</td></tr><tr><td>Drawback</td><td>Costs more and takes longer</td><td>Can be too old or not specific enough</td></tr></table>",
       "why": "The table in L5 slide 6 is exactly what's being asked. Draw it."
      },
      {
       "type": "written",
       "q": "B. Mention the points that should be taken into consideration to ask good survey questions and give examples. (5 marks)",
       "ans": "<b>Be Clear</b>: label numeric scales (1 = Highly dissatisfied … 5 = Highly satisfied); avoid overlapping ranges (0-2, 3-5, 6-10); add detail when in doubt; timebox frequency (\"in the past seven days…\").<br><b>Be Concise</b>: plain language (\"How clean was the car?\").<br><b>Be Specific</b>: avoid super-big ideas; avoid double-barrel questions (split \"speed and availability\"); avoid internal conflict (split \"food\" into temperature, appearance, flavor).<br><b>Be Expressive</b>: emphasize opinions (\"too high, too low, or about right?\"); ranges instead of yes/no; levels of agreement; allow multiple selections.<br><b>Be Unbiased</b>: add \"Other: ___\"; leave open-ended questions open; avoid leading questions; avoid loaded words (\"wasted\" becomes \"spent\").<br><b>Be Usable</b>: progress bar, consistent page length, logical order, alert unanswered questions, preview the survey.",
       "why": "Name the 6 principles and give one \"don't / instead\" example for each. That covers the marks."
      },
      {
       "type": "written",
       "q": "C. What is meant by user research based on \"When\"? (5 marks)",
       "ans": "<b>1. Foundational (strategic / generative)</b>: before anything is designed. It identifies user problems and what to build by talking with users about their pain points, and reveals opportunities the team would not think of.<br><b>2. Tactical (design)</b>: during the design phase. It informs how the product should be built, using user feedback on prototypes.<br><b>3. Post-launch</b>: after release. Did we succeed? Does the system meet user needs?",
       "why": "From L2 slides 11–12."
      },
      {
       "type": "written",
       "q": "D. What are the types of design–development process? (5 marks)",
       "ans": "<b>Handoff process</b>: the design phase finishes completely, then the design is handed over to development (sequential, one handover point).<br><b>Handshake process</b>: design and development run <b>in parallel</b> and synchronize at many points during the project, so issues are caught early.",
       "why": "From L9 slide 11 (the timeline figure: one handover point versus many sync points)."
      }
     ]
    },
    {
     "title": "Question 3",
     "marks": "20 marks",
     "items": [
      {
       "type": "written",
       "q": "A. Design a mobile application for booking doctors. Target audience: patients of all ages including adults and elderly users, plus doctors and clinic administrators. Purpose: search doctors, view specialties, check appointments, book or cancel consultations simply. Think about a layout of the interface that you consider usable and easy.",
       "ans": "<b>1. Start from user research.</b> Elderly users need <b>large text and big touch targets</b> (like the truckers case). Keep a small number of steps and plain language.<br><b>2. Home screen (above the fold):</b> logo at the top-left (same place on every screen, links home); a big <b>search bar</b> (\"Search doctor, specialty…\"); specialty icons in a grid (Cardiology, Dentistry…); \"My upcoming appointment\" card; bottom <b>tab bar</b>: Home · Search · Appointments · Profile.<br><b>3. Doctor list:</b> filters (specialty, area, price, rating); each card shows photo, name, specialty, rating, next free slot and a <b>primary CTA \"Book\"</b>.<br><b>4. Booking flow</b> (a fixed path, so use a <b>progress bar</b>: Doctor → Date/Time → Details → Confirm); remember the patient's data (<b>remove repetitive actions</b>); fields with <b>hints and formats</b>; <b>errors next to the field</b> with a red border.<br><b>5. Confirmation page</b> after booking (\"Appointment booked with Dr. X, Sun 10:00\") with \"Add to calendar\".<br><b>6. Cancel appointment:</b> a dialog with an action button \"Cancel appointment\" and a secondary, not eye-catching \"Keep\" button on the right; consistent alert style.<br><b>7. Visual rules:</b> a 3-color palette, simple background, related info grouped by frames, a clear primary vs secondary CTA.<br><b>8. Other roles:</b> doctors and admins get a schedule view (day/week) and a manage-slots screen.<br><b>9. Process:</b> sketch 5+ paper wireframes per screen, test with patients and elderly users, iterate, then build hi-fi in Figma.",
       "why": "Marks come from applying lecture guidelines: user research, wireframes, forms, layout and navigation (L9–L10). Mention the guideline name next to each design decision."
      }
     ]
    }
   ]
  },
  {
   "title": "Final Exam 2024/2025",
   "meta": "First term · 2 hours · 60 marks · Dr. Mona Lackousha, Dr. Mohamed Awad",
   "note": "The official solved paper marks T/F #2 and #7 as True and MCQ #3 as \"Survey\". These conflict with the lectures. Both the key and the lecture-based answer are shown for those questions.",
   "sections": [
    {
     "title": "Q1-A · True or False",
     "marks": "15 marks · 1 each",
     "items": [
      {
       "type": "tf",
       "q": "It is important to understand the tasks that the user requires to do.",
       "a": 0,
       "why": "User research covers the users AND their tasks (L1).",
       "ow": [
        null,
        "User research means learning about the users AND the tasks they try to complete, and the user really interacts with the task, not the system (L1)."
       ]
      },
      {
       "type": "tf",
       "q": "Tactical research takes place after the design phase.",
       "a": 1,
       "key": "Official key: True (√)",
       "why": "L2 says tactical research \"takes place during the design phase\". After the design phase would be post-launch research. The key likely reads \"after\" loosely; answer from the lecture unless your doctor says otherwise.",
       "ow": [
        "Tactical (design) research happens during the design phase, using feedback on prototypes. Research after it is post-launch research (L2, Types by WHEN).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "High fidelity prototypes are faster, easier and cheaper to generate than Low fidelity.",
       "a": 1,
       "why": "Reversed. Low-fidelity prototypes are the faster, easier and cheaper ones; hi-fi is not even possible early because details are undecided (L9, Power of lo-fi).",
       "ow": [
        "Reversed: low-fidelity prototypes are the faster, easier and cheaper ones, which is why you start lo-fi and move to hi-fi later (L9, Power of lo-fi).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "Interview is most common research technique.",
       "a": 0,
       "why": "The lecture describes the interview as the most common research technique, valued for deeper understanding through open \"why\" questions and follow-ups (L7, Interviews).",
       "ow": [
        null,
        "The lecture opens its interviews section by calling the interview the most common research technique, so the statement is true (L7, Interviews)."
       ]
      },
      {
       "type": "tf",
       "q": "Individuals interview easier to coordinate than groups interview.",
       "a": 0,
       "why": "Individuals are easier to coordinate logistically.",
       "ow": [
        null,
        "The individuals vs groups table lists \"easier to coordinate the logistics\" as an advantage of individual interviews, so the statement is true (L7)."
       ]
      },
      {
       "type": "tf",
       "q": "Primary research done by someone else.",
       "a": 1,
       "why": "Research by someone else is secondary. Primary is research you conduct yourself.",
       "ow": [
        "Research done by someone else (books, journals) is secondary research. Primary research is research you conduct yourself, like interviews and surveys (L2).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "\"Be biased\" is important point for a good survey.",
       "a": 1,
       "key": "Official key: True (√)",
       "why": "The principle is \"Be UNbiased\". The key probably treats this as a typo for \"Be unbiased\". As written, the statement is false.",
       "ow": [
        "One of the six principles is \"Be Unbiased\" (avoid leading and loaded questions, allow \"Other\"), so being biased is never good for a survey (L6).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "UX Design refers to interactivity, look and feel of product screen or web page.",
       "a": 1,
       "why": "Interactivity, look and feel of a screen or page is the definition of UI design. UX design is the user's overall experience with the product or website (L1, UI vs UX vs HCI).",
       "ow": [
        "Interactivity, look and feel of a screen or page is UI design. UX design is the user's overall experience with the product or website (L1, UI vs UX vs HCI).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "PII is specific details that could be used to identify a user such as names, phone number.",
       "a": 0,
       "why": "This is the lecture's PII definition: details that could identify a user, with examples names, home address, email address and phone number (L5, Privacy and security).",
       "ow": [
        null,
        "The statement matches the lecture's PII definition: details that could identify a user, such as names, home address, email and phone number (L5)."
       ]
      },
      {
       "type": "tf",
       "q": "Survey is more expensive than interview.",
       "a": 1,
       "why": "Surveys are among the cheapest methods; interviews need time per person and incentives.",
       "ow": [
        "Reversed: surveys are one of the cheapest methods, while interviews cost more because they are synchronous and interviewees expect incentives (L5; L7).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "HCI is interaction between user and computer OR relationship between users and computer systems.",
       "a": 0,
       "why": "This is the L1 definition word for word: HCI is the interaction between user and computer, or the relationship between users and computer systems (L1, What is HCI?).",
       "ow": [
        null,
        "This is word for word the lecture's definition: HCI is the interaction between user and computer, or the relationship between users and computer systems (L1)."
       ]
      },
      {
       "type": "tf",
       "q": "UI Design covers a user's overall experience with the product or website.",
       "a": 1,
       "why": "A user's overall experience with the product or website is UX design. UI design is only the interactivity, look and feel of a screen or page (L1, UI vs UX vs HCI).",
       "ow": [
        "The overall experience with a product or website is UX design. UI design is the interactivity, look and feel of a screen or page (L1, UI vs UX vs HCI).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "S/W development is not just a process of creating software, it is also a process of learning how to create the S/W best suited for its purpose.",
       "a": 0,
       "why": "L1 says \"software development is research\": it is not just creating software but also learning how to create the software best suited for its purpose (L1, UI design process).",
       "ow": [
        null,
        "The statement is taken from the lecture's point that \"software development is research\": learning how to build the software best suited to its purpose (L1)."
       ]
      },
      {
       "type": "tf",
       "q": "Prototype is one that enables you to get useful feedback and iterate on your design.",
       "a": 0,
       "why": "This is the lecture's definition of a good prototype: it enables useful (constructive) feedback and iteration, and need not resemble the final product (L8, Prototyping).",
       "ow": [
        null,
        "This is the lecture's definition of a good prototype: one that enables useful, constructive feedback and iteration on the design (L8, Prototyping)."
       ]
      },
      {
       "type": "tf",
       "q": "Qualitative research involves data of numeric nature.",
       "a": 1,
       "why": "Numeric data (measures, counts) is quantitative research. Qualitative research is observations about why and how things happen, often from interviews (L5, Types by WHAT).",
       "ow": [
        "Numeric data (measures, counts) is quantitative. Qualitative research is observations about why and how things happen (L5, Types by WHAT).",
        null
       ]
      }
     ]
    },
    {
     "title": "Q1-B · Multiple choice",
     "marks": "5 marks · 1 each",
     "items": [
      {
       "type": "mcq",
       "q": "HCI Terms interchangeably used:",
       "o": [
        "Human Computer Interaction",
        "Human Machine Interaction",
        "Man Machine Interaction",
        "All the above"
       ],
       "a": 3,
       "why": "HCI (Human Computer Interaction), HMI (Human Machine Interaction) and MMI (Man Machine Interaction) are used interchangeably for the same field, so all three are correct (L1, What is HCI?).",
       "ow": [
        "Human Computer Interaction is HCI itself, but HMI and MMI are equally valid terms, so choosing only this one is incomplete (L1).",
        "HMI is one interchangeable term, but HCI and MMI are too, so the complete answer is \"All the above\" (L1).",
        "MMI is one interchangeable term, but HCI and HMI are too, so the complete answer is \"All the above\" (L1).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Sensitive Personally Identifiable Information (SPII) such as:",
       "o": [
        "names",
        "home address",
        "email address",
        "Financial account numbers"
       ],
       "a": 3,
       "why": "Names, address and email are regular PII. Financial account numbers are SPII.",
       "ow": [
        "Names are ordinary PII: they identify a user but are not in the sensitive list (SSN, license, passport, financial accounts, date of birth) (L5).",
        "Home address is listed as PII with names, email and phone; it is not one of the SPII examples (L5, Privacy and security).",
        "Email address is plain PII in the lecture's list. SPII is data whose loss could cause financial harm, embarrassment or discrimination (L5).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Plan ahead and prepare your questions before……..",
       "o": [
        "Interview",
        "Survey",
        "Observation",
        "none of the above"
       ],
       "a": 0,
       "key": "Official key: (b) Survey",
       "why": "L7's \"Tips for good interview\" begins \"Plan ahead and prepare your questions before the interview time\", and L5 says to write an interview script. The lecture wording matches \"Interview\". The key marks Survey, so mention the lecture sentence if asked.",
       "ow": [
        null,
        "Surveys must be planned too, but this sentence is the interview tip: \"Plan ahead and prepare your questions before the interview\" (L7). The official key reportedly marks this option.",
        "Observation is not what this sentence is about. The tip quoted is from the interview tips: prepare your questions before the interview (L7).",
        "An answer is in the lecture: the interview tips start with \"Plan ahead and prepare your questions before the interview\" (L7)."
       ]
      },
      {
       "type": "mcq",
       "q": "Tips for good interview:",
       "o": [
        "Listen Well",
        "don't Leave sometime between interviews",
        "Take notes",
        "a & c"
       ],
       "a": 3,
       "why": "Listen well and take notes are the two keys. (b) is the opposite of the real tip.",
       "ow": [
        "Listen well is one of the two keys during an interview, but take notes is the other, so the full answer is \"a & c\" (L7).",
        "This reverses the real tip: the lecture says to leave some time between interviews (L7, Tips for a good interview).",
        "Take notes is one of the two keys, but listening well is the other, so the full answer is \"a & c\" (L7).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Data that includes descriptions from interviewees:",
       "o": [
        "Quantitative data",
        "Qualitative data",
        "average data",
        "gathering data"
       ],
       "a": 1,
       "why": "Interviewees' descriptions explain why and how things happen, which is the lecture's definition of qualitative data; quantitative data is numeric (measures, counts) (L5, Types by WHAT).",
       "ow": [
        "Quantitative data is numeric (measures, counts). Descriptions from interviewees explain why and how, so they are qualitative (L5).",
        null,
        "\"Average data\" is not a research data type. By WHAT, data is only quantitative (numeric) or qualitative (why and how) (L5).",
        "\"Gathering data\" is just collecting data, not a data type. Descriptions from interviews are qualitative data (L5)."
       ]
      }
     ]
    },
    {
     "title": "Question 2",
     "marks": "20 marks",
     "items": [
      {
       "type": "written",
       "q": "A. What is the difference between primary research and secondary research? (5 marks)",
       "ans": "Primary: collected by you (surveys, focus groups, interviews, observations, experiments); specific to your needs and you control the quality; costs more and takes longer.<br>Secondary: collected by someone else (existing data, books, journals); cheap and quick; can be too old or not specific enough.<br>Both can be qualitative or quantitative.",
       "why": "L5 comparison table."
      },
      {
       "type": "written",
       "q": "B. Evaluate the following survey questions: (i) Do you use social media? (ii) Why do you like to exercise? (iii) In the past seven days, how much time have you wasted on social media? (iv) On a scale of 1 to 4 with 1 meaning 'a lot' and 4 meaning 'not at all', how much do you enjoy exercising? (v) On a scale of 1 to 6 with 1 meaning 'not at all' and 6 meaning 'a lot', how much do you like social media? (5 marks)",
       "ans": "<b>(i)</b> A <b>yes/no question</b> (not expressive). Use ranges: \"In the past seven days, how much time have you spent on social media? 0 / &lt;1 / 1-2 / 3-5 / 6-9 / 10+ hours\".<br><b>(ii)</b> A <b>leading question</b>: it assumes the person likes exercising. Ask \"How do you feel about exercising?\" or first ask whether they exercise.<br><b>(iii)</b> A <b>loaded question</b>: \"wasted\" is judgmental. Use \"spent\".<br><b>(iv)</b> An <b>ambiguous / reversed scale</b>: 1 = \"a lot\" runs against the usual low-to-high direction, and a 4-point scale has no neutral middle.<br><b>(v)</b> A <b>changing number of options</b> (6 here versus 4 in iv) and the <b>scale direction is reversed</b> compared with (iv). Keep the same scale length and direction across the survey.",
       "why": "This is the L6 exercise. Its answer labels were: ambiguous scale, changing number of options, reversing scale, leading questions, yes/no questions."
      },
      {
       "type": "written",
       "q": "C. What are the tips for good interview? (5 marks)",
       "ans": "Plan ahead and prepare your questions before the interview.<br>During the interview, two keys for success:<br>• Listen well: the user should be talking most of the time.<br>• Take notes: one asks and the other takes notes (audio recording is not enough); note emotions, reactions and voice.<br>Leave some time between interviews.",
       "why": "L7 slide 4, which is also the official answer."
      },
      {
       "type": "written",
       "q": "D. What is the power of low-fidelity prototype? (5 marks)",
       "ans": "• Lo-fi prototypes are faster, easier and cheaper to generate.<br>• Hi-fi is not feasible at the beginning because decisions about many details have not been made.<br>• People are much more willing to talk when given a sketch than something that looks finished.<br>• Konstan: a prototype that looks like little effort (hand-drawn) elicits more significant constructive feedback.<br>• Many details cause people to give feedback at a lower level than needed.<br>• Google: early, present high-level ideas; later focus on details like app screens.",
       "why": "L9 slides 5–6."
      }
     ]
    },
    {
     "title": "Question 3",
     "marks": "20 marks",
     "items": [
      {
       "type": "written",
       "q": "A. Define Wireframes. (5 marks)",
       "ans": "A schematic for the basic outline of a screen in a system.<br>• Built using lines and basic shapes (rectangles, circles…) with some text; the lines look as if made of wires.<br>• Intentionally has no colors or font styles, to focus on structure.<br>• Wireframe = skeleton with placeholders.",
       "why": "The official answer (L9 slide 13). Adding the 4 purposes earns full marks."
      },
      {
       "type": "written",
       "q": "B. If you are involved in the design of a mobile application for online shopping, think about a layout of the interface that you may consider usable and easy. (15 marks)",
       "ans": "<b>Research first:</b> who shops (ages, devices, low-end phones?) and their top tasks (search, compare, buy, track order), which are the <b>red routes</b>.<br><b>Home (above the fold):</b> logo top-left that links home; search bar; category chips; offers banner; bottom tab bar: Home · Categories · Cart · Orders · Account.<br><b>Product list:</b> grid cards (image, name, price, rating) with filters and sort; breadcrumbs (Home › Men › Shoes) show where the user is.<br><b>Product page:</b> images, price, size/color selectors; a primary CTA \"Add to cart\" stands out and \"Add to wishlist\" is secondary.<br><b>Checkout</b> (a fixed path, so a <b>progress bar</b>: Cart → Shipping → Payment → Confirm): saved address and card (remove repetitive actions), hints/formats in fields, errors next to the field.<br><b>Confirmation page</b> with order number and tracking.<br><b>Visual rules:</b> 3-color palette, simple background, grouping by frames, consistent alerts, obvious hover/press states, Cancel on the right and not eye-catching.<br><b>Process:</b> paper wireframes (5+ versions per screen) → feedback → Figma hi-fi → test with users → iterate.",
       "why": "Examiners reward applying named guidelines from L9–L10. Label each decision with the rule it follows."
      }
     ]
    }
   ]
  }
 ]
};

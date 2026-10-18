window.EXTRA = window.EXTRA || {};
EXTRA.hci = {
  5: [
    { q: `According to the lecture, HCI deals with which three activities for interactive systems?`, o: [
      [`Design, Implementation and Evaluation`, `Correct. The lecture says HCI deals with the Design, Implementation and Evaluation of interactive systems.`],
      [`Manufacturing, Shipping and Repair of hardware`, `HCI studies the interaction between users and computers, not the hardware supply chain.`],
      [`Marketing, Sales and Customer support`, `These are business activities, not the three activities the lecture lists for HCI.`],
      [`Coloring, Typography and Animation only`, `These are visual details; HCI covers the whole design, implementation and evaluation of interactive systems.`]
    ], a: 0 },
    { q: `In the lecture's hierarchy of fields, which of these is <b>NOT</b> a direct branch of Human Factors Engineering?`, o: [
      [`Industrial Design`, `Industrial Design is one of the three branches of Human Factors Engineering.`],
      [`UX Design`, `Correct. UX Design branches from HCI (HCI splits into UI, UX and Interaction design), not directly from Human Factors Engineering.`],
      [`HCI`, `HCI is one of the three branches of Human Factors Engineering.`],
      [`Product Design`, `Product Design is one of the three branches of Human Factors Engineering.`]
    ], a: 1 },
    { q: `"The gap between HCI and human factors engineering is growing, because fewer devices are becoming computerized."`, o: [
      [`True`, `Both halves are reversed: the lecture says the gap is shrinking, because more devices (not fewer) are becoming computerized (L5, HCI hierarchy).`],
      [`False`, `Correct. The gap is <b>shrinking</b>, because more devices are becoming computerized.`]
    ], a: 1 },
    { q: `Which statement matches the lecture's distinction between UX and HCI?`, o: [
      [`HCI dictates the interactions, while UX only studies them`, `It is the other way round: UX dictates, HCI understands.`],
      [`UX and HCI are both only about the look and feel of a screen`, `Look and feel is UI design. UX is the overall experience and HCI is about understanding interactions.`],
      [`UX is about dictating the interactions, while HCI is largely about understanding them`, `Correct. The lecture states UX is about dictating the interactions and HCI is largely about understanding the interactions between humans and computers.`],
      [`HCI only covers the computer's input/output devices`, `Input/output devices are only the "computer" part. HCI also covers the user and the interaction.`]
    ], a: 2 },
    { q: `<b>Scenario:</b> Before drawing any screen, a team finds out that many of their users are elderly and often distracted, and they read earlier studies on human perception. Which component of the UI design process is this?`, o: [
      [`Design and prototyping`, `Nothing is being designed or prototyped yet; the team is learning about users.`],
      [`User interface evaluation`, `Evaluation tests and improves an existing design; here no design exists yet.`],
      [`Implementation`, `Implementation is not one of the three UI design process components, and no code is being written.`],
      [`User research`, `Correct. User research means learning about the users (skills, distractions, special needs like the elderly) and previous research on human capabilities and perception.`]
    ], a: 3 },
    { q: `"One objective of HCI is to design for the environments users live and work in, such as an organization."`, o: [
      [`True`, `Correct. The objectives are to design for people, for tasks, and for the environments users live and work in (e.g. an organization).`],
      [`False`, `Designing for the environment is explicitly one of the listed objectives of HCI.`]
    ], a: 0 },
    { q: `"In an online Zoom lecture, the instructor is really interacting with the students, not with the computer." This example illustrates that:`, o: [
      [`The user really interacts with the task; the system is only the means`, `Correct. This is the human-task interaction idea: the user is trying to achieve a task and the system is just the means.`],
      [`The computer should be the main focus of the user's attention`, `The point is the opposite: the user should think about the task, not the tool.`],
      [`Zoom has a bad user interface`, `The example is not a criticism of Zoom; it shows that users interact with the task.`],
      [`HCI is only about hardware`, `The example is about the task and the people involved, not hardware.`]
    ], a: 0 },
    { q: `HCI has three parts: User, Computer/Machine, and Interaction. Interfaces, HCI patterns, design and usability evaluation belong to which part?`, o: [
      [`User`, `The User part is about mental and physical capabilities.`],
      [`Interaction`, `Correct. The Interaction part covers interfaces, HCI patterns, design and usability evaluation.`],
      [`Computer / Machine`, `The Computer/Machine part is about input/output devices.`],
      [`Human Factors Engineering`, `Human Factors Engineering is the parent field of HCI, not one of its three parts.`]
    ], a: 1 },
    { q: `"Like a sports referee, an interface is successful when users notice it a lot."`, o: [
      [`True`, `The referee comparison means the opposite.`],
      [`False`, `Correct. Like a referee, an interface is successful when it goes <b>unnoticed</b>, so users can focus on the task (the invisible interface).`]
    ], a: 1 },
    { q: `<b>Scenario:</b> A doctor's online form asks for the address, phone, email and SSN about 3 times for each of 10 people. It takes over 30 minutes and then shows "Internal server error". In the lecture, this is an example of:`, o: [
      [`An invisible interface`, `An invisible interface lets users focus on the task. This form forces the user to fight the tool.`],
      [`A good case of user research`, `Asking for the same data repeatedly and then failing shows the users were not understood.`],
      [`A bad user experience (UX)`, `Correct. The lecture gives this form as a bad UX example: repetitive, slow, and it ends with an error.`],
      [`Human factors engineering in industrial design`, `Industrial design is a separate branch; this example is about a poor user experience on a web form.`]
    ], a: 2 }
  ],
  6: [
    { q: `<b>Scenario:</b> User research showed that truckers often have big hands and often wear gloves. What was the better design for the Qualcomm device?`, o: [
      [`Smaller buttons placed closer together`, `Small buttons were the problem in the early version.`],
      [`A voice-only device with no screen`, `The lecture does not mention voice input; the redesign used a screen.`],
      [`A physical keyboard with more keys`, `More keys would mean even smaller targets for gloved hands.`],
      [`A large touch screen and a stylus pen`, `Correct. The better design was a large touch screen with a stylus pen.`]
    ], a: 3 },
    { q: `What is <b>bloatware</b> according to the lecture?`, o: [
      [`A product with too many features, too many megabytes, too slow, too difficult to use, or simply too much`, `Correct. This is the lecture's definition of bloatware.`],
      [`A program that collects anonymous usage data`, `That describes the CEIP, which Microsoft used to replace guesswork with data.`],
      [`A menu that shows only the most likely used commands`, `That is an adaptive (personalized) menu.`],
      [`Two or more toolbars sharing one line`, `Two or more toolbars sharing one line is a rafted toolbar, an Office 2000 mechanism. Bloatware is a product with too many features or simply too much (L6, Full-featured systems).`]
    ], a: 0 },
    { q: `In Office 2000, what were <b>rafted toolbars</b>?`, o: [
      [`Menus that show only a short list of commands with a chevron`, `That is the adaptive (personalized) menu.`],
      [`Two or more toolbars sharing one line, with an algorithm moving the predicted least-used buttons to an overflow area`, `Correct. Rafted toolbars put two or more toolbars on one line, and an algorithm predicted the least-used buttons and moved them to an overflow area (L6, Office 2000 mechanisms).`],
      [`Toolbars that were removed completely from the window`, `The toolbars stayed; they just shared a line and hid some buttons.`],
      [`Toolbars that could only be used from the keyboard`, `Nothing in the lecture says that; keyboard usage was a CEIP finding.`]
    ], a: 1 },
    { q: `"Office 2000's adaptive menus and rafted toolbars were later turned off by default."`, o: [
      [`True`, `Correct. Customization was not easy or accurate, so these mechanisms were later turned off by default.`],
      [`False`, `The lecture says they failed and were turned off by default.`]
    ], a: 0 },
    { q: `Which of these is <b>NOT</b> a consequence of adding more and more features to a full-featured app, according to the lecture?`, o: [
      [`The app feels complicated`, `This is listed as a consequence of more features.`],
      [`Things are harder to find or learn`, `This is listed as a consequence of more features.`],
      [`Users feel more in control`, `Correct. The opposite happened: with Office 97–2003, people felt <b>less</b> in control.`],
      [`There is more focus on the tool than on the task`, `This is listed as a consequence of more features.`]
    ], a: 2 },
    { q: `What did the CEIP (Customer Experience Improvement Program), introduced in Office 2003, collect?`, o: [
      [`Users' names and email addresses so the team could contact them`, `CEIP collected no names or emails: its usage and hardware data was anonymous, gathered from users who joined via the "Help make Office better" balloon (L6, From guesswork to data).`],
      [`Video recordings of users working`, `The lecture does not mention video; CEIP collected usage and hardware data.`],
      [`Only the press reviews calling Office "bloated"`, `Press opinion was part of the problem, not CEIP data.`],
      [`Anonymous usage and hardware data from users who joined through the "Help make Office better" balloon`, `Correct. A balloon enrolled users and the CEIP collected anonymous usage and hardware data.`]
    ], a: 3 },
    { q: `CEIP data showed that some commands are used about how many times more with the keyboard than with the mouse?`, o: [
      [`7 times`, `Correct. The team learned that some commands are used 7x more with the keyboard than the mouse.`],
      [`2 times`, `"Twice" relates to wrong short menus making scanning take twice as long, not keyboard use.`],
      [`70 times`, `70 is the percentage of Word and Outlook data that was thrown away.`],
      [`1.3 times`, `1.3 relates to the 1.3+ billion sessions of data, not keyboard use.`]
    ], a: 0 },
    { q: `"For Office 2007, the team kept every bit of the Word and Outlook usage data they collected."`, o: [
      [`True`, `They did not keep it all: they got so much Word and Outlook data that 70% was thrown away (L6, From guesswork to data).`],
      [`False`, `Correct. They got so much Word and Outlook data that <b>70% was thrown away</b>.`]
    ], a: 1 },
    { q: `<b>Scenario:</b> A music app automatically hides the options it predicts you rarely use. Its guesses are often wrong, so users end up scanning the full list again. Which lesson from the Office 2000 case applies?`, o: [
      [`More features always make an app better`, `The Office case showed that too many features lead to bloatware.`],
      [`"Auto-customization, unless it does a perfect job, is usually worse than no customization at all."`, `Correct. This is the rule drawn from adaptive menus and rafted toolbars, where wrong predictions made scanning take twice as long.`],
      [`Design decisions should be based on feel and estimation`, `The Office team moved away from guesswork to data.`],
      [`Use a large touch screen and stylus`, `That is the Qualcomm truckers solution, not the auto-customization lesson.`]
    ], a: 1 },
    { q: `"In Office 97–2003, menus and toolbars were full and not scalable, and people often did not notice or use new features."`, o: [
      [`True`, `Correct. These are among the problems listed for Office 97–2003.`],
      [`False`, `The lecture lists exactly these problems for Office 97–2003.`]
    ], a: 0 }
  ],
  7: [
    { q: `What is the correct order of Google's user-centered design process?`, o: [
      [`Need finding → Design alternatives → Prototyping → Evaluation`, `That is Joyner's design life cycle, not Google's process.`],
      [`Specify → Understand → Design → Evaluate`, `You must understand users before specifying the problem.`],
      [`Understand → Specify → Design → Evaluate`, `Correct. Google's process is Understand, Specify, Design, Evaluate, and iteration is key.`],
      [`Design → Evaluate → Understand → Specify`, `Designing before understanding users is exactly what user-centered design avoids.`]
    ], a: 2 },
    { q: `In Google's process, what happens in the <b>Specify</b> step?`, o: [
      [`Testing with real users`, `Testing with real users is the Evaluate step, the last of Understand → Specify → Design → Evaluate (L7, Google UCD process).`],
      [`Designing solutions and starting to build`, `Designing solutions and starting to build is the Design step, which comes after Specify has chosen the problem to solve (L7, Google UCD process).`],
      [`Learning how users experience the product`, `Learning how users experience the product is the Understand step, the first step and the one with the most research (L7, Google UCD process).`],
      [`Identifying the most important user problem to solve`, `Correct. Specify means choosing the most important user problem to solve.`]
    ], a: 3 },
    { q: `"User-centered design means designing a system to meet a functional specification."`, o: [
      [`True`, `Designing to a functional specification is how systems <i>used</i> to be designed.`],
      [`False`, `Correct. User-centered design takes the user's needs into consideration at <b>every step</b>.`]
    ], a: 1 },
    { q: `Why do Joyner and Google NOT give "user research" its own separate step?`, o: [
      [`Because it is part of every phase, and they want to avoid it being seen as a one-time step at the beginning`, `Correct. User research is integral to every phase, so it is not a single step.`],
      [`Because user research is not needed in an iterative process`, `Both say users are needed throughout, not that research is unnecessary.`],
      [`Because only the marketing team does user research`, `The lecture says nothing of the kind; research is integral to design.`],
      [`Because secondary research replaces it completely`, `Secondary research supports primary research; it does not replace user research.`]
    ], a: 0 },
    { q: `Complete Joyner's quote: "you need users ___".`, o: [
      [`only at the end`, `Waiting until the end is what Joyner warns against.`],
      [`early and often`, `Correct. Joyner says "you need users early and often".`],
      [`once at the beginning`, `This is the "one-time step" view that the lecture rejects.`],
      [`only when there is budget`, `This is not Joyner's quote; users are needed throughout.`]
    ], a: 1 },
    { q: `<b>Scenario:</b> Before any screen exists, a team talks to delivery drivers about their daily pain points to decide what product to build. Which type of research is this (by WHEN)?`, o: [
      [`Tactical (design) research`, `Tactical research happens during design and needs feedback on prototypes.`],
      [`Post-launch research`, `Post-launch research happens after release to check success.`],
      [`Foundational (strategic / generative) research`, `Correct. It happens before anything is designed, talks to users about pain points, and decides what to build.`],
      [`Secondary research`, `The team is talking to users themselves, so it is primary; "secondary" also classifies by WHO, not WHEN.`]
    ], a: 2 },
    { q: `"Post-launch research asks questions like: Did we succeed? Does the system meet user needs?"`, o: [
      [`True`, `Correct. These are exactly the questions of post-launch research.`],
      [`False`, `The lecture defines post-launch research by these questions.`]
    ], a: 0 },
    { q: `<b>Scenario:</b> Midway through the design phase, a team shows two prototypes of a checkout screen to users to decide how it should be built. Which type of research is this (by WHEN)?`, o: [
      [`Foundational research`, `Foundational research happens before anything is designed.`],
      [`Post-launch research`, `The product has not been launched yet.`],
      [`Secondary research`, `The team collects feedback themselves, and secondary is a WHO category.`],
      [`Tactical (design) research`, `Correct. Tactical research happens during design, informs how the product should be built, and uses feedback on prototypes.`]
    ], a: 3 },
    { q: `Why is secondary research important early in a project?`, o: [
      [`It gathers statistics, facts and figures, saving time and effort and backing up primary findings`, `Correct. The lecture lists these benefits of secondary research early on.`],
      [`It is always more specific to your needs than primary research`, `Primary research is the one specific to your needs.`],
      [`It removes the need to ever talk to users`, `Secondary research backs up primary findings; it does not replace them.`],
      [`Primary research is not allowed early in a project`, `Foundational research is primary research done before anything is designed.`]
    ], a: 0 },
    { q: `"Even though Joyner and Google don't give it a separate step, making user research an explicit component still helps, because it avoids underestimating it."`, o: [
      [`True`, `Correct. The lecture says an explicit component avoids underestimating it, and it is increasingly a role for specialists.`],
      [`False`, `The lecture lists benefits of making user research explicit.`]
    ], a: 0 }
  ],
  8: [
    { q: `Which of these is <b>PII but NOT SPII</b>?`, o: [
      [`Social security number`, `Social security number is Sensitive PII, since losing it could cause financial harm. The PII-only items are names, home address, email and phone (L8, Privacy and security).`],
      [`Email address`, `Correct. Email address is listed under PII (with names, home address, phone number), not under SPII.`],
      [`Passport number`, `Passport numbers are in the SPII list, data whose loss could cause harm or discrimination. Email address is the plain PII choice (L8, Privacy and security).`],
      [`Date of birth`, `Date of birth is listed as Sensitive PII.`]
    ], a: 1 },
    { q: `<b>Scenario:</b> A team designing a charting app reads published facts about color blindness before choosing colors. According to the lecture, this secondary research answers questions about:`, o: [
      [`Whether the product succeeded after launch`, `That is post-launch research, not what color-blindness facts tell you.`],
      [`Numbers from the team's own survey`, `The team's own survey would be primary research.`],
      [`Human abilities and limitations`, `Correct. The lecture gives designing for color-blind users as an example of secondary research on human abilities and limitations.`],
      [`The PII of the team's users`, `Reading published color-blindness facts collects no user data at all.`]
    ], a: 2 },
    { q: `According to the primary vs secondary table, what is a key disadvantage of <b>secondary</b> research?`, o: [
      [`It usually costs more and takes longer`, `That is the disadvantage of primary research; secondary is usually cheap and quick.`],
      [`You control the quality`, `That is a benefit of primary research.`],
      [`It can only be qualitative`, `The table says secondary research can be either qualitative or quantitative.`],
      [`The data can be too old and/or not specific enough`, `Correct. This is the key disadvantage of secondary research in the table.`]
    ], a: 3 },
    { q: `"Primary research can only produce quantitative data."`, o: [
      [`True`, `The primary vs secondary table says both can be qualitative or quantitative. Interviews, for example, are primary and qualitative (L8, Primary vs secondary).`],
      [`False`, `Correct. Both primary and secondary research can be either qualitative or quantitative.`]
    ], a: 1 },
    { q: `<b>Scenario:</b> A team needs quick responses from a large number of users in a short time, with a very small budget. Which method fits best?`, o: [
      [`A survey`, `Correct. Surveys give quick responses from many users in a short time and are one of the cheapest methods.`],
      [`One-on-one interviews with each user`, `Interviews take far more time per user and cost more.`],
      [`Sitting with each user for a full day of observation`, `This is slow and cannot reach a large number of users quickly.`],
      [`Running several group interviews`, `Group interviews still take much more time per participant than a survey.`]
    ], a: 0 },
    { q: `According to the table, what is a key benefit of <b>primary</b> research?`, o: [
      [`It is usually cheap and quick`, `That is the benefit of secondary research.`],
      [`It is specific to your needs, and you control the quality`, `Correct. This is the key benefit of primary research in the table.`],
      [`The data already exists, so nothing has to be collected`, `That describes secondary research (looking for existing data).`],
      [`It never needs planning`, `The lecture says user research should be planned ahead.`]
    ], a: 1 },
    { q: `"Research methods are alternatives: you should pick one method and use it alone."`, o: [
      [`True`, `The lecture says methods are not alternatives.`],
      [`False`, `Correct. Methods are not alternatives; use a <b>combination</b> of them in a relevant order.`]
    ], a: 1 },
    { q: `Which of these is <b>NOT</b> one of the lecture's privacy guidelines for user research?`, o: [
      [`Only collect the data you need`, `"Only collect the data you need" is the first privacy guideline, so it is not the answer (L8, Privacy and security).`],
      [`Do not associate collected data with PII or SPII`, `"Do not associate collected data with PII or SPII" is one of the three privacy guidelines, so it is not the answer (L8, Privacy and security).`],
      [`Keep all collected data permanently in case it is useful later`, `Correct. This breaks the rule "do not keep data after you no longer need it".`],
      [`Do not keep data after you no longer need it`, `"Do not keep data after you no longer need it" is a real guideline. The option that breaks it, keeping data permanently, is the answer (L8, Privacy and security).`]
    ], a: 2 },
    { q: `"A survey can be used after an interview or a usability study, not only as an initial step."`, o: [
      [`True`, `Correct. Surveys can be an initial step to plan interviews, and can also follow an interview or usability study.`],
      [`False`, `The lecture explicitly says a survey can also follow an interview or usability study.`]
    ], a: 0 },
    { q: `<b>Scenario:</b> A short survey about a notes app's search feature also asks for the respondent's full name, home address and phone number, which the team will never use. What does it break?`, o: [
      [`Use a combination of methods`, `The problem is not the choice of methods but the data being collected.`],
      [`Testing and iteration improve any technique`, `That is a general tip, but it is not what this survey breaks.`],
      [`Get feedback from participants about the survey`, `That tip is about improving the survey, not about what data to collect.`],
      [`Ask only what you need, and only collect the data you need (avoid unneeded PII)`, `Correct. The survey asks for PII it will never use, breaking both the survey tip and the privacy rule.`]
    ], a: 3 }
  ],
  9: [
    { q: `<b>Scenario:</b> A survey asks "Rate the app from 1 to 5" with no meaning given for the numbers. Which guideline does it break?`, o: [
      [`Be Clear: label numeric scales`, `Correct. Scales should be labeled, e.g. "1 = Highly dissatisfied … 5 = Highly satisfied".`],
      [`Be Concise: use plain language`, `The question is already short; the issue is the unlabeled scale.`],
      [`Be Unbiased: avoid loaded questions`, `There is no emotionally loaded word in the question.`],
      [`Be Usable: provide a progress bar`, `A progress bar is about the whole survey, not about one unlabeled scale.`]
    ], a: 0 },
    { q: `"What was the overall level of cleanliness that you observed within the car?" should become "How clean was the car?". Which principle is this?`, o: [
      [`Be Specific: avoid double-barrel questions`, `The original asks about only one thing.`],
      [`Be Concise: use plain language`, `Correct. This is the lecture's plain-language example under Be Concise.`],
      [`Be Expressive: allow multiple selections`, `The change is about wording, not the answer format.`],
      [`Be Unbiased: avoid leading questions`, `The original does not push the user toward an answer.`]
    ], a: 1 },
    { q: `"How satisfied are you with your food?" is a problem because:`, o: [
      [`It is a loaded question`, `It uses no emotionally loaded word like "wasted".`],
      [`It has overlapping ranges`, `Overlapping ranges need numeric options like 0-2, 2-5; this question has none. Its flaw is mixing temperature, appearance and flavor (L9, Be Specific).`],
      [`It has internal conflict; split it into temperature, appearance and flavor`, `Correct. This is the "avoid internal conflict" example under Be Specific: one may like the flavor but not the temperature.`],
      [`It is a yes/no question`, `It asks for a level of satisfaction, not yes/no.`]
    ], a: 2 },
    { q: `"Allowing multiple selections when possible means using radio buttons instead of checkboxes."`, o: [
      [`True`, `Radio buttons allow only one selection.`],
      [`False`, `Correct. Allowing multiple selections means using <b>checkboxes instead of radio buttons</b>.`]
    ], a: 1 },
    { q: `<b>Scenario:</b> "Did our brand-new AI-based interface generate better recommendations?" Which problem does this question have?`, o: [
      [`It is a double-barrel question`, `It asks about one thing (the recommendations).`],
      [`It is not timeboxed`, `Timeboxing applies to frequency questions; this is not one.`],
      [`It does not allow nominal categories`, `"Other: ____" is for lists of categories, not this question.`],
      [`It is a leading question; ask "How satisfied were you with the recommendations?"`, `Correct. Praising the "brand-new AI-based" interface and suggesting "better" leads the user. This is the lecture's leading-question example.`]
    ], a: 3 },
    { q: `"Is our price too high?" should become "Do you feel our price is too high, too low, or about right?". Which guideline is this?`, o: [
      [`Be Expressive: emphasize the user's opinion`, `Correct. This is the lecture's example of emphasizing the user's opinion.`],
      [`Be Usable: order questions logically`, `Ordering is about the sequence of questions, not this wording.`],
      [`Be Clear: avoid overlapping ranges`, `Overlapping ranges concern numeric answer options, and this question has none. The rewrite adds "too low / about right" to capture the user's opinion (L9, Be Expressive).`],
      [`Be Concise: use plain language`, `The new version is actually longer; the goal is to capture the user's opinion.`]
    ], a: 0 },
    { q: `What is the problem with "Have you listened to an audiobook this year?"`, o: [
      [`It is a leading question`, `It does not assume an answer or praise anything.`],
      [`It is a yes/no question; use ranges instead`, `Correct. The lecture's exercise flags it as yes/no; ranges (as in "Be Expressive") give richer answers.`],
      [`It is a loaded question`, `A loaded question contains a judgment word like "wasted"; this question is neutral. Its flaw is the yes/no format (L9, Exercise).`],
      [`It has overlapping ranges`, `It has no ranges at all, which is the actual problem.`]
    ], a: 1 },
    { q: `"Why did you choose our service?" should be left as an open-ended question instead of forcing fixed options.`, o: [
      [`True`, `Correct. Under Be Unbiased: leave open-ended questions open.`],
      [`False`, `The lecture says this question should not force fixed options.`]
    ], a: 0 },
    { q: `A survey asks enjoyment "on a scale of 1 to 4, 1 = a lot, 4 = not at all", then the next question uses "1 to 6, 1 = not at all". What is wrong?`, o: [
      [`It is a double-barrel question`, `A double-barrel question asks two things at once, but each of these asks only about enjoyment. The flaw is the inconsistent scales (L9, Exercise).`],
      [`The questions are too concise`, `Being concise is good (Be Concise). The real problem is that the scale changes from 4 to 6 options and its direction is reversed (L9, Exercise).`],
      [`The number of options changes (4 vs 6) and the scale direction is reversed`, `Correct. The lecture's exercise flags the changing number of options and the reversed scale.`],
      [`It is missing an "Other: ____" option`, `"Other" is for lists of categories, not numeric scales.`]
    ], a: 2 },
    { q: `"Writing 'tablet computer (i.e. any computer with a touchscreen and detachable keyboard)' follows the Be Clear tip: when in doubt, give extra detail."`, o: [
      [`True`, `Correct. This is the lecture's example of giving extra detail under Be Clear.`],
      [`False`, `The lecture lists exactly this example under Be Clear.`]
    ], a: 0 }
  ],
  10: [
    { q: `Joyner says interviews should focus on the "6 Ws". Which of these is <b>NOT</b> one of them?`, o: [
      [`Where`, `"Where" is one of Joyner's 6 Ws (who, what, where, when, why, how), so it is not the odd one out (L10, Interviews).`],
      [`How`, `"How" is in the 6 Ws list (who, what, where, when, why, how), even though it does not start with W (L10, Interviews).`],
      [`Why`, `"Why" is one of the 6 Ws, and interviews are valued for exactly these open "why" questions (L10, Interviews).`],
      [`Which`, `Correct. The 6 Ws are who, what, where, when, why and how. "Which" is not one of them.`]
    ], a: 3 },
    { q: `<b>Scenario:</b> In an interview, a user is asked how many times they used the app last March, and gives an inaccurate number because they don't remember well. This is:`, o: [
      [`Recall bias`, `Correct. Recall bias is giving inaccurate answers about things in the past.`],
      [`Reporting bias`, `Reporting bias is giving answers more ideal than reality, not forgetting.`],
      [`A "presentation of self" issue`, `That is a group-interview issue about how people want to appear to others.`],
      [`A confounding personality`, `That is a group-interview issue, not memory error.`]
    ], a: 0 },
    { q: `"Individual interviews give participants more privacy than group interviews."`, o: [
      [`True`, `Correct. "More privacy for participants" is listed as an advantage of interviewing individuals.`],
      [`False`, `The table lists more privacy as an advantage of individual interviews.`]
    ], a: 0 },
    { q: `What is the lecture's solution to the challenges of data gathered by asking questions (recall bias, reporting bias, etc.)?`, o: [
      [`Replace interviews with surveys only`, `Surveys also gather data by asking questions, so they have the same biases.`],
      [`Combine with other techniques such as participant observation, usability studies and secondary research`, `Correct. This is the solution given in the lecture.`],
      [`Ask more leading questions to get clearer answers`, `Leading questions add bias instead of reducing it.`],
      [`Skip the analysis of qualitative data`, `Analysis is hard, but skipping it is not the solution.`]
    ], a: 1 },
    { q: `<b>Scenario:</b> An interviewer works alone, asks all the questions, and relies only on an audio recording. Which interview tip is NOT being followed?`, o: [
      [`Leave some time between interviews`, `Nothing in the scenario is about timing between interviews.`],
      [`Plan ahead and prepare questions`, `Nothing suggests the questions were not prepared.`],
      [`Take notes: one person asks, one takes notes; audio recording is not enough`, `Correct. The lecture says one person should ask while another takes notes (including emotions and reactions), and audio alone is not enough.`],
      [`Interview groups instead of individuals`, `This is not a tip; individual and group interviews each have pros and cons.`]
    ], a: 2 },
    { q: `Which is a <b>disadvantage</b> of group interviews?`, o: [
      [`More privacy for participants`, `That is an advantage of individual interviews.`],
      [`Easier to coordinate the logistics`, `That is an advantage of individual interviews.`],
      [`More time and effort spent with each participant`, `That is a feature of individual interviews.`],
      [`You may need to deal with confounding personalities and "presentation of self" issues`, `Correct. These are the issues listed for group interviews.`]
    ], a: 3 },
    { q: `"Joyner says design is very easy if you follow a few principles."`, o: [
      [`True`, `Joyner says the opposite: "design is very hard". It is Klemmer who adds that pretty good interfaces are easy if you know basic methods and principles (L10, Design: can I?).`],
      [`False`, `Correct. Joyner's quote is "design is very hard". Klemmer adds that great UIs need creativity and hard work, while pretty good ones are easy with basic methods (L10, Design: can I?).`]
    ], a: 1 },
    { q: `During a good interview, who should talk most of the time?`, o: [
      [`The user (interviewee)`, `Correct. "Listen well": the user should talk most of the time.`],
      [`The interviewer`, `The interviewer should listen well, not dominate.`],
      [`The note-taker`, `The note-taker records; they should not lead the talk.`],
      [`Whoever is most senior on the team`, `The lecture says the user should talk most of the time.`]
    ], a: 0 },
    { q: `Scott Klemmer says designing great user interfaces requires enormous creativity and a lot of hard work, but:`, o: [
      [`good interfaces are impossible without artistic drawing talent`, `Designers say "we are not artists"; drawing talent is not required.`],
      [`pretty good interfaces are easy if you know basic methods, techniques and principles`, `Correct. This is the rest of Klemmer's point.`],
      [`only professional artists should design interfaces`, `The lecture says design does not produce wall-hanging artwork.`],
      [`creativity should be turned off to follow the rules`, `The lecture says not to turn off creativity.`]
    ], a: 1 },
    { q: `"Interviews and surveys can be done in sequence in either order, using the results of one to plan the other."`, o: [
      [`True`, `Correct. The lecture says interviews and surveys can be done in sequence in either order, with the results of one used to plan the other (L10, Interviews).`],
      [`False`, `Either order is allowed; each can be used to plan the other.`]
    ], a: 0 }
  ],
  11: [
    { q: `<b>Scenario:</b> After good user research, a team sketches only three small variations of the same hamburger-menu layout on day one and commits to one. Which of Joyner's mistakes is this?`, o: [
      [`Producing too many prototypes`, `Joyner wants as many alternatives as possible; the team made too few.`],
      [`Distancing themselves from existing solutions`, `Distancing yourself is the advice, not the mistake.`],
      [`Settling on a single design idea or a single genre of ideas too early (the second biggest mistake)`, `Correct. Three variations of one layout is one genre of ideas, chosen too early.`],
      [`Jumping to design without understanding the users`, `The scenario says they did user research first; that is the biggest mistake, not this one.`]
    ], a: 2 },
    { q: `<b>Scenario:</b> A team redesigning a university's existing registration portal keeps sketching versions that look almost like the current portal. What does the lecture advise?`, o: [
      [`Copy the current interface, since users already know it`, `Being captured by the current interface is exactly the mistake.`],
      [`Skip the design alternatives phase`, `Design alternatives is a separate phase and should not be skipped.`],
      [`Go straight to a high-fidelity prototype of the current design`, `This locks in the existing design even more.`],
      [`Distance yourself from existing solutions, at least during brainstorming`, `Correct. This is the lecture's advice when enhancing an existing system.`]
    ], a: 3 },
    { q: `"According to Joyner, the biggest mistake a designer can make is settling on a single design idea too early."`, o: [
      [`True`, `Settling on one idea too early is Joyner's second biggest mistake. The biggest is jumping to design without understanding the users or the task (L11, Biggest mistakes).`],
      [`False`, `Correct. The biggest mistake is jumping to design without understanding the users or the task; settling on one idea too early is the <b>second</b> biggest.`]
    ], a: 1 },
    { q: `According to the lecture, the final design is often:`, o: [
      [`A combination of alternatives explored earlier`, `Correct. The final design is often a combination of earlier alternatives.`],
      [`Always the very first idea`, `Settling on the first idea is a mistake.`],
      [`The alternative with the most features`, `The lecture does not choose designs by feature count.`],
      [`Chosen without any feedback`, `Design is iterative and driven by feedback.`]
    ], a: 0 },
    { q: `What is the designer's definition of prototyping given in the lecture?`, o: [
      [`A quick or small version of the real thing`, `The lecture says this common view is not a useful understanding.`],
      [`Rapidly creating an approximation of a design so that you can quickly get feedback`, `Correct. This is the definition for designers.`],
      [`The final polished version handed to developers`, `A prototype is an approximation for feedback, not the final product.`],
      [`A piece of art to impress clients`, `Klemmer says a prototype is not about the artifact.`]
    ], a: 1 },
    { q: `Complete Klemmer's quote: "A prototype is not about the artifact, it's about ___."`, o: [
      [`appearance and polish`, `Polish is about the artifact, which Klemmer says is not the point.`],
      [`the code`, `The quote has nothing to do with code.`],
      [`feedback and iteration`, `Correct. "A prototype is not about the artifact, it's about feedback and iteration."`],
      [`the final product`, `A good prototype does not need to resemble the final product.`]
    ], a: 2 },
    { q: `"Prototypes that give no new knowledge waste the design process."`, o: [
      [`True`, `Correct. The lecture says this, which is why Klemmer says "prototypes are questions, ask a lot of them."`],
      [`False`, `The lecture states that such prototypes waste the design process.`]
    ], a: 0 },
    { q: `<b>Scenario:</b> A team spends weeks building a polished prototype, shows it to users, and learns nothing new. How does the lecture judge this?`, o: [
      [`It is good, because it closely resembles the final product`, `A good prototype does not need to resemble the final product.`],
      [`It is a success, because the artifact looks beautiful`, `A prototype is not about the artifact.`],
      [`It proves that no design alternatives are needed`, `You should explore as many alternatives as you can.`],
      [`It wasted part of the design process; prototypes should be questions that bring feedback`, `Correct. Prototypes that give no new knowledge waste the process; "prototypes are questions, ask a lot of them."`]
    ], a: 3 },
    { q: `Joyner describes design as an iterative process of brainstorming, combining, abandoning, revising and improving ideas. This requires:`, o: [
      [`Several ideas to start with`, `Correct. Joyner says this process requires several ideas to start with.`],
      [`One perfect idea from the beginning`, `Settling on one idea early is a big mistake.`],
      [`Finished code before any feedback`, `Prototypes are meant for quick feedback, not finished code.`],
      [`A high-fidelity prototype first`, `Nothing in this lecture requires hi-fi first; ideas come first.`]
    ], a: 0 },
    { q: `"Design alternatives is a separate phase in Joyner's design life cycle."`, o: [
      [`True`, `Correct. The lecture says design alternatives is a separate phase in Joyner's cycle.`],
      [`False`, `It is its own phase (Need finding → Design alternatives → Prototyping → Evaluation).`]
    ], a: 0 }
  ],
  12: [
    { q: `What does <b>fidelity</b> mean for a prototype?`, o: [
      [`The number of screens in the prototype`, `Fidelity is about look and feel, not screen count.`],
      [`How closely a design matches the look and feel of the final product`, `Correct. This is the lecture's definition of fidelity.`],
      [`How fast the prototype was made`, `Lo-fi is faster, but speed is not the definition.`],
      [`How many users tested the prototype`, `Fidelity has nothing to do with the number of testers.`]
    ], a: 1 },
    { q: `What did Konstan say about prototypes?`, o: [
      [`High-fidelity prototypes always get the most useful feedback`, `Konstan's point favors prototypes that look like little effort.`],
      [`Prototypes should never be shown to users`, `Users are one of the four audiences of prototypes.`],
      [`A prototype that looks like little effort (e.g. hand-drawn) gets more constructive feedback`, `Correct. This is Konstan's point in the lecture.`],
      [`Adding many details makes people give higher-level feedback`, `Too many details make people give feedback at a <b>lower</b> level than needed.`]
    ], a: 2 },
    { q: `"Wireframes intentionally have no colors or font styles."`, o: [
      [`True`, `Correct. They leave out colors and font styles to focus on structure (a skeleton with placeholders).`],
      [`False`, `The lecture says wireframes intentionally have no colors or font styles.`]
    ], a: 0 },
    { q: `<b>Scenario:</b> At a company, designers and developers work in parallel and meet often to sync. Which process is this?`, o: [
      [`Handoff process`, `Handoff is sequential: design finishes, then it goes to development.`],
      [`Brainstorming`, `Brainstorming generates ideas; it is not a design-development process.`],
      [`Wireframing`, `Wireframing is a design activity, not a way of organizing design and development.`],
      [`Handshake process`, `Correct. In the handshake process, design and development run in parallel with frequent sync points.`]
    ], a: 3 },
    { q: `When brainstorming, how many ideas does the lecture tell you to aim for?`, o: [
      [`20`, `Correct. The brainstorming tips say to aim for 20 ideas, each a few words or a sentence, without evaluating or excluding any (L12, Brainstorming).`],
      [`5`, `5 is the minimum number of sketch versions per screen when wireframing.`],
      [`3`, `3 is the number of colors in a simple palette (next lecture), not ideas.`],
      [`More than 100`, `More than 100 is the number of prototypes for the first Microsoft mouse.`]
    ], a: 0 },
    { q: `"Since buttons catch the eye, all commands in a form should be displayed as buttons."`, o: [
      [`True`, `The guideline has a limit: important commands should be buttons, not links, but you should not display all commands as buttons (L12, Form design).`],
      [`False`, `Correct. Important commands should be buttons, not links, but do <b>not</b> display all commands as buttons.`]
    ], a: 1 },
    { q: `When wireframing with pen and paper, how many versions of each screen should you sketch at least?`, o: [
      [`1`, `One version means settling on a single idea.`],
      [`5`, `Correct. The process says to sketch at least 5 versions per screen.`],
      [`20`, `20 is the number of ideas to aim for when brainstorming.`],
      [`3`, `3 is too few: the wireframing process says to sketch at least 5 versions of each screen with pen and paper (L12, Wireframing process).`]
    ], a: 1 },
    { q: `<b>Scenario:</b> A pricing page shows "Go Pro" and "Free Trial" as two identical grey buttons side by side. Which form guideline does it violate?`, o: [
      [`Error messages sit next to the field`, `There is no error here, so the error-message guideline does not apply. The flaw is two calls-to-action looking identical (L12, Form design).`],
      [`Confirm a successful submission with a confirmation page`, `Confirmation pages follow a successful submission, and nothing is submitted here. Identical buttons break the primary vs secondary CTA rule (L12, Form design).`],
      [`Make a clear distinction between primary and secondary calls-to-action`, `Correct. The lecture's example is "Go Pro" standing out over "Free Trial".`],
      [`Remove repetitive actions`, `Removing repetitive actions means remembering preferences, and nothing repeats here. Identical buttons break the primary vs secondary CTA rule (L12, Form design).`]
    ], a: 2 },
    { q: `<b>Scenario:</b> An online store lets users reach a product through many different category choices. Which element should show users where they are?`, o: [
      [`A progress bar`, `Progress bars are for a predefined unique path, showing what is left.`],
      [`A confirmation page`, `A confirmation page confirms a successful form submission.`],
      [`A text box with hints`, `Hints help fill in fields; they don't show location.`],
      [`Breadcrumbs`, `Correct. Breadcrumbs show where users are when there are multiple choices.`]
    ], a: 3 },
    { q: `"At the first pen-and-paper wireframing stage, you should make sure lines are straight and spacing and alignment are correct."`, o: [
      [`True`, `At this stage the goal is to move the idea from your mind to paper quickly, so the lecture says to ignore straight lines, spacing and alignment (L12, Wireframing process).`],
      [`False`, `Correct. The goal is to move the idea from your mind to paper quickly, so ignore straight lines, spacing and alignment.`]
    ], a: 1 }
  ],
  13: [
    { q: `<b>Scenario:</b> A dialog asks "Delete this file?" with a "Delete" button and a second button that dismisses the dialog. What should the second button say?`, o: [
      [`Cancel`, `Correct. With two buttons (an action and one to dismiss), use "Cancel", not "Close".`],
      [`Close`, `"Close" is used only when there is a single button.`],
      [`Exit`, `The lecture's rule is "Cancel" next to an action button.`],
      [`Remind me later`, `That button belongs to a system notice, not a confirmation dialog.`]
    ], a: 0 },
    { q: `Which of these does <b>NOT</b> belong in a well-designed system notice?`, o: [
      [`An "Action" button`, `This is one of the parts of a system notice.`],
      [`A long, generic paragraph of text`, `Correct. Notice messages should not be lengthy or generic.`],
      [`A "Remind me later" button`, `This is one of the parts of a system notice.`],
      [`A "Don't show again" box`, `This is one of the parts of a system notice.`]
    ], a: 1 },
    { q: `"Alert messages may change color, style and placement from page to page to grab attention."`, o: [
      [`True`, `This breaks the consistency guideline.`],
      [`False`, `Correct. Alert messages should be consistent across the whole site; do not change color, style or placement.`]
    ], a: 1 },
    { q: `Which is <b>NOT</b> a guideline for error messages?`, o: [
      [`Describe briefly why it happened, under the title`, `Describing briefly why the error happened, under the title, is the second error-message guideline, so it is not the answer (L13, Forms).`],
      [`When possible, link to complete the task or return to the previous state`, `Linking to complete the task or return to the previous state is a listed guideline, so it is not the answer (L13, Forms).`],
      [`Hide the cause and show only a vague "Something went wrong"`, `Correct. The guidelines say to state the problem in the title and describe why it happened.`],
      [`Recommend the next course of action`, `Recommending the next course of action is the last error-message guideline, so it is not the answer (L13, Forms).`]
    ], a: 2 },
    { q: `<b>Scenario:</b> A form asks for Last name, then Date of birth, then First name, then Middle name. Which layout guideline does it violate?`, o: [
      [`Put the most important information above the fold`, `The problem is the order of the fields, not whether they are visible.`],
      [`Stick to a simple 3-color palette`, `Nothing in the scenario is about colors.`],
      [`Keep the logo in the same place on every page`, `Nothing in the scenario is about the logo.`],
      [`Related items are logically ordered`, `Correct. Names should be ordered First/Middle/Last, not mixed with other fields.`]
    ], a: 3 },
    { q: `<b>Scenario:</b> A site's logo is at the top-left of the home page but moves to the top-right on other pages. Which guideline is broken?`, o: [
      [`Your logo is in the same place on every page`, `Correct. The logo should not shift between pages.`],
      [`The background is not complicated`, `The issue is the logo's position, not the background.`],
      [`Map out Red Routes`, `Red Routes are the paths customers most often use, not logo placement.`],
      [`Cancel is placed to the right`, `That is about dialog buttons, not the logo.`]
    ], a: 0 },
    { q: `"There should be an obvious change on hover over anything clickable."`, o: [
      [`True`, `Correct. This is one of the navigation guidelines.`],
      [`False`, `The lecture lists an obvious hover change as a navigation guideline.`]
    ], a: 0 },
    { q: `According to the layout guidelines, related information is grouped by:`, o: [
      [`Giving each field a different font`, `Fonts are not the grouping method in the lecture.`],
      [`A frame or a separator`, `Correct. Related information is grouped by a frame or a separator.`],
      [`Moving it below the fold`, `The fold is about what is visible without scrolling, not grouping.`],
      [`Making every item a button`, `Not all commands should be buttons, and buttons do not group information.`]
    ], a: 1 },
    { q: `In the navigation guidelines, a call-to-action (CTA) is:`, o: [
      [`A link to the Home page`, `Links to Home and categories on every page are a separate guideline. A CTA is an eye-catching button for the most common next step (L13, Navigation).`],
      [`A breadcrumb trail`, `Breadcrumbs show where users are, not what to do next.`],
      [`An eye-catching button for the most common next step`, `Correct. A clear CTA tells users what to do next.`],
      [`An alert message`, `Alert messages inform users; they are not the CTA.`]
    ], a: 2 },
    { q: `"A rich, detailed background image behind the content is recommended to make the layout more attractive."`, o: [
      [`True`, `This goes against the layout guideline.`],
      [`False`, `Correct. The background should not be complicated and should not distract from the content.`]
    ], a: 1 }
  ]
};

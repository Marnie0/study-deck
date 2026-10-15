window.EXTRA = window.EXTRA || {};
EXTRA.sa = { 1: [
    { q: `A firm's information system uses the inventory record, bills and shipping notes instead of handling the goods themselves. Which idea from the lecture does this illustrate?`, o: [
        [`The IS is a decision support system`, `The example describes any IS, not specifically a DSS.`],
        [`The IS is a model of the physical system that uses symbols in place of the objects`, `Correct. The essential feature of an IS is using records to represent the movement, status or existence of objects.`],
        [`The IS is a closed system`, `An IS is an open system that interacts with its environment.`],
        [`The IS replaces the physical system entirely`, `The IS models and interacts with the physical system; both are subsystems of the organization.`]
      ], a: 1 },
    { q: `A shelf counter reports "12 boxes left" to the inventory system, and the system then prints a reorder note. In lecture terms, the count and the reorder note are respectively:`, o: [
        [`An observation, then an action needed`, `Correct. Inputs from the physical system are observations; outputs to it are actions needed.`],
        [`Two observations`, `The reorder note tells the physical system to do something, so it is an action.`],
        [`A transaction, then a deliverable`, `"Deliverable" is a project-management term for a phase output, and a shelf count is not a keyed-in transaction; IS inputs are observations and outputs are actions needed.`],
        [`An action needed, then an observation`, `The order is reversed: the count flows from the physical system into the IS (observation), and the reorder note flows out to it (action needed).`]
      ], a: 0 },
    { q: `Which pair correctly distinguishes an IS from a CBIS?`, o: [
        [`They have the same components`, `They differ: an IS has three components (people, procedures, data) and a CBIS has five, adding programs and computers.`],
        [`CBIS removes people from the system`, `A CBIS keeps people as a component; it adds programs and computers to the IS components (people, procedures, data).`],
        [`IS = people, procedures, data; CBIS adds programs and computers`, `Correct. IS = people, procedures and data; a CBIS adds programs and computers, giving five components (L1, Components).`],
        [`IS = programs and computers; CBIS = people and procedures`, `It is the other way round: CBIS adds programs and computers.`]
      ], a: 2 },
    { q: `A cinema's system records each seat booking and checks it against the seats still free. What type of IS is this, and what is the "TPS data"?`, o: [
        [`DSS; the knowledge base`, `Routine bookings are day-to-day operations, so this is a TPS, not a DSS.`],
        [`TPS; the location of the available seats`, `Correct. The lecture's ticket reservation example.`],
        [`MIS; report-writing software`, `An MIS turns TPS data into reports for managers using report writers and models; recording each booking is a routine TPS job.`],
        [`OAS; the e-mail server`, `Office automation covers word processing and e-mail; a seat-booking system that processes transactions is the lecture's TPS example.`]
      ], a: 1 },
    { q: `A bank manager needs help deciding whether to open a branch in a new district, using sales data, an expert knowledge base and multidimensional analysis. The best-suited system is:`, o: [
        [`Payroll system`, `A payroll system is a TPS that processes routine pay transactions; it does not help a manager decide a specific problem like a new branch.`],
        [`Office automation system`, `An OAS supports office communication and productivity (word processing, e-mail); it has no knowledge base or multidimensional analysis.`],
        [`TPS`, `A TPS records day-to-day transactions; a one-off decision drawing on a knowledge base and a multidimensional DB is the job of a DSS.`],
        [`DSS`, `Correct. A DSS assists managers in deciding a specific problem, using a relational DB, a knowledge base and a multidimensional DB.`]
      ], a: 3 },
    { q: `Several regional managers must reach one joint budget decision together. Which DSS-related software fits?`, o: [
        [`Report-writing software`, `Report-writing software is an MIS module that produces reports; it does not help a group of managers reach a joint decision.`],
        [`An order entry TPS`, `An order entry system is a TPS that records customer orders; it does not support group decision making.`],
        [`Artificial intelligence`, `AI analyzes a problem on its own, not as a group.`],
        [`Group Decision Support System`, `Correct. A GDSS aids a group of managers in working out decisions.`]
      ], a: 3 },
    { q: `An operational supervisor on a factory floor mainly needs information that is:`, o: [
        [`Environmental and summarized`, `Environmental, summarized information suits the strategic planning level; operational supervisors need internal, detailed data (Fig 1.11).`],
        [`Internal and detailed`, `Correct. Fig 1.11: the operational control level uses mostly internal information in detailed form, the opposite of the strategic level (L1, Managers as users).`],
        [`Environmental and detailed`, `Operational information is detailed, but its source is mostly internal; environmental information is what strategic planners use.`],
        [`Only financial forecasts`, `Financial forecasts are strategic, summarized information; an operational supervisor needs internal, detailed data about daily work.`]
      ], a: 1 },
    { q: `Which management function does a strategic planning manager emphasise the most (Fig 1.13)?`, o: [
        [`Planning`, `Correct. Fig 1.13: strategic managers put most of their effort into planning (and organizing), while operational managers mostly direct and control (L1).`],
        [`Staffing`, `Staffing is a small share of effort at every management level in Fig 1.13; the strategic level is dominated by planning.`],
        [`Controlling`, `Control is only a small share at the strategic level; planning is the largest slice there.`],
        [`Directing`, `Directing is mostly done at the operational level.`]
      ], a: 0 },
    { q: `"Investigating the problem and the requirements rather than a solution" and "a conceptual solution that fulfils the requirements" describe, in order:`, o: [
        [`Implementation, maintenance`, `Implementation installs the system and maintenance keeps it running; neither is investigating requirements or a conceptual solution.`],
        [`Design, analysis`, `Reversed: investigating the problem and requirements is analysis, and the conceptual solution that fulfills them is design (Lab 1).`],
        [`Analysis, design`, `Correct. Lab 1: analysis investigates the problem and requirements rather than a solution; design is a conceptual solution that fulfills the requirements, not yet an implementation.`],
        [`Planning, implementation`, `Neither phrase is about planning or implementation.`]
      ], a: 2 },
    { q: `A use case diagram is classified in the lab as a:`, o: [
        [`Data flow diagram`, `A DFD is a structured-analysis diagram, not one of the UML categories; the lab lists the use case diagram as behavioral.`],
        [`Structural diagram`, `Structural diagrams (e.g. class diagrams) do not change with time.`],
        [`Behavioral diagram`, `Correct. It shows how the system responds to requests.`],
        [`Interaction diagram`, `Interaction diagrams are sequence and collaboration diagrams.`]
      ], a: 2 }
  ], 2: [
    { q: `A company's IT team keeps rewriting project documents while users complain they were only consulted at the start and cannot change requirements. Which methodology's problems does this describe?`, o: [
        [`Traditional waterfall SDLC`, `Correct. Locked-in requirements, limited user involvement and heavy documentation.`],
        [`RAD`, `RAD relies on extensive user involvement through JAD and prototypes, so users are not just consulted once at the start.`],
        [`Prototyping`, `Prototyping works closely with users, revising the working system after each round, so users are not locked out after the start.`],
        [`Agile`, `Agile is adaptive and emphasizes people over roles and process, the opposite of locked-in requirements and heavy documentation.`]
      ], a: 0 },
    { q: `An analyst builds sample screens in a visual tool while the sales representative watches, then changes them after each round of feedback. This is:`, o: [
        [`Code generation`, `Code generation is a CASE function that produces code from designs; repeatedly revising screens with a user watching is prototyping.`],
        [`Waterfall`, `Waterfall has little backtracking and involves users only in the requirements phase, so it does not loop through feedback rounds.`],
        [`JAD`, `JAD is several days of structured group meetings.`],
        [`Prototyping`, `Correct. This is the lecture's Visual Basic example.`]
      ], a: 3 },
    { q: `Choosing the DBMS, the server and the network for an approved design is part of:`, o: [
        [`Logical design`, `Logical design is platform independent; choosing a DBMS, server and network is a technology-specific (physical design) decision.`],
        [`Physical design`, `Correct. It turns logical specs into technology-specific details.`],
        [`Planning`, `Planning identifies and prioritizes IS needs.`],
        [`Analysis`, `Analysis studies and structures requirements and recommends a solution; it does not pick technology for an approved design.`]
      ], a: 1 },
    { q: `Which CASE tool would you use to make sure a DFD has no process with missing inputs before the design review?`, o: [
        [`Analysis tool`, `Correct. It automatically checks for incomplete, inconsistent or incorrect specifications.`],
        [`Code generator`, `A code generator produces program and DB code from designs; it does not check a DFD for missing inputs.`],
        [`Report generator`, `Display and report generators prototype the look and feel of screens and reports; checking DFDs is done by analysis tools.`],
        [`Documentation generator`, `Documentation generators produce technical and user documents; they do not check diagrams for incomplete specifications.`]
      ], a: 0 },
    { q: `During maintenance, which CASE component is emphasised?`, o: [
        [`Report generators`, `Form and report generators support design and implementation prototyping; in maintenance all tools are used with emphasis on the central repository.`],
        [`Diagramming tools only`, `In maintenance all CASE tools are used, but the lecture's table singles out the central repository, not diagramming tools.`],
        [`The central repository`, `Correct. It is the reference for design and code changes.`],
        [`Matrix tools`, `Used in project identification and selection.`]
      ], a: 2 },
    { q: `Which pairing of decade and change is correct?`, o: [
        [`1950s: CASE tools developed`, `The 1950s were about automating processes in machine/assembly language from scratch; CASE tools were developed in the 1980s.`],
        [`1970s: development became more like engineering`, `Correct. The lecture's timeline says that in the 1970s development became more disciplined, more like engineering (L2, How analysis and design changed).`],
        [`1980s: focus on Web development`, `The 1980s brought microcomputers, 4GLs and CASE tools; the Internet and Web focus came in the 1990s.`],
        [`1990s: everything written in assembly language`, `Machine/assembly language for everything was the 1950s; the 1990s focused on integration, visual programming and the Web.`]
      ], a: 1 },
    { q: `A two-person team writes automated tests with the customer and integrates new code within hours of writing it. This describes:`, o: [
        [`JAD`, `JAD is several days of structured requirements meetings, not two-person programming with automated tests.`],
        [`Waterfall`, `Waterfall runs phases in sequence and tests only late, not code integrated within hours of being written.`],
        [`RUP`, `RUP is an OO methodology with four iterative phases; two-person teams and automated tests with customers are XP features.`],
        [`eXtreme Programming`, `Correct. XP uses two-person programming teams, automated tests written by programmers and customers, and integrates code within a few hours of writing it (L2, XP).`]
      ], a: 3 },
    { q: `In RAD (Fig 1-13), which phases are iterated repeatedly?`, o: [
        [`All five SDLC phases`, `Iterating all five phases describes the circular SDLC of Fig 1-3; RAD iterates only user design and construction.`],
        [`Inception and transition`, `Inception and transition are RUP phases; RAD's phases are requirements planning, user design, construction and cutover.`],
        [`Requirements planning and cutover`, `Requirements planning (at the start) and cutover (at the end) each happen once in RAD; only the middle two phases loop.`],
        [`User design and construction`, `Correct. Fig 1-13: after requirements planning, RAD loops between user design and construction until done, then does cutover (L2, RAD).`]
      ], a: 3 },
    { q: `A system request contains five elements. Which one is NOT among them?`, o: [
        [`Special issues`, `Special issues is one of the five system request elements (sponsor, business need, business requirements, business value, special issues).`],
        [`Source code listing`, `Correct. The five are project sponsor, business need, business requirements, business value and special issues.`],
        [`Project sponsor`, `The project sponsor is the first element of a system request, so it is included; source code does not exist yet at planning.`],
        [`Business value`, `Business value (the expected benefit) is one of the five system request elements, so it is included.`]
      ], a: 1 },
    { q: `Using the lab percentages (planning 15%, analysis 20%, design 35%, implementation 30%), the planning phase took 3 weeks. Estimated total project time?`, o: [
        [`20 weeks`, `Correct. Planning is 15% of the whole project, so total = 3 / 0.15 = 20 weeks (Lab 2, SDLC time split).`],
        [`45 weeks`, `45 comes from multiplying 3 × 15; planning is 15% of the total, so you must divide: 3 / 0.15 = 20 weeks.`],
        [`10 weeks`, `10 = 3 / 0.30 uses the implementation share (30%); planning is 15%, so 3 / 0.15 = 20 weeks.`],
        [`15 weeks`, `15 = 3 / 0.20 uses the analysis share (20%); planning is 15%, so 3 / 0.15 = 20 weeks.`]
      ], a: 0 }
  ], 3: [
    { q: `The PVF purchasing manager fills in a form describing the problem and asking IS to build a new system. This document is the:`, o: [
        [`Statement of work`, `The SOW describes deliverables for the customer.`],
        [`Project charter`, `The charter is written after approval to announce the project.`],
        [`System Service Request`, `Correct. A form describing a problem and asking IS to build a system is the System Service Request, the standard form for requesting development work; in PVF Juanita and Chris initiated one (L3).`],
        [`Baseline project plan`, `The BPP is set at the end of planning to guide execution; at the request stage the project has not even been approved.`]
      ], a: 2 },
    { q: `Which document formally announces that the project now exists, for both internal and external stakeholders?`, o: [
        [`SSR`, `The SSR only requests or proposes the work; the formal announcement after approval is the project charter.`],
        [`Status report`, `A status report informs people about progress during execution; it does not announce that the project exists.`],
        [`Project charter`, `Correct. The project charter is a short, high-level document for internal and external stakeholders that formally announces the establishment of the project (L3, slide 25).`],
        [`Project workbook`, `The project workbook is the repository for all project documents and correspondence, not a short announcement for outside stakeholders.`]
      ], a: 2 },
    { q: `"An unforeseen change in personnel due to sickness" is handled in which project phase and activity?`, o: [
        [`Execution: managing changes to the baseline project plan`, `Correct. Managing changes to the BPP (execution activity 3) explicitly includes an unforeseen change in personnel due to sickness, resignation or termination (L3, Execution).`],
        [`Planning: identifying and assessing risk`, `Risk is planned for, but the actual change is managed during execution.`],
        [`Closedown: post-project review`, `Post-project reviews happen at closedown, after the work is finished; a sick team member must be handled while the project runs.`],
        [`Initiation: establishing the initiation team`, `Establishing the initiation team forms the first core team at the start; replacing a sick member mid-project is managing changes during execution.`]
      ], a: 0 },
    { q: `Which communication method has LOW formality and is used to inform and resolve issues?`, o: [
        [`Specification documents`, `Specification documents have high formality and serve to inform and keep a permanent record (Table 3-2).`],
        [`Project workbook`, `The project workbook has high formality and is used to inform and as a permanent record (Table 3-2).`],
        [`Status reports`, `Status reports have high formality and are used to inform, not to resolve issues (Table 3-2).`],
        [`Hallway discussions`, `Correct. Table 3-2 lists hallway discussions with low formality, used to inform and resolve issues (L3, Communication methods).`]
      ], a: 3 },
    { q: `"Can be done by one person, has one identifiable deliverable, known method, clear predecessors and successors, measurable." These are the characteristics of a:`, o: [
        [`Project`, `A project is a planned undertaking of many related activities with a beginning and an end; the listed traits describe one of its tasks.`],
        [`Task`, `Correct. The five characteristics of a task: done by one person or a defined group, one identifiable deliverable, a known method, clear predecessors and successors, measurable (L3, WBS).`],
        [`Milestone`, `A milestone is a point event with no duration (a diamond in MS Project), so it is not done by a person with a method.`],
        [`Deliverable`, `A deliverable is an end product of an SDLC phase; the listed traits (method, predecessors, measurable progress) describe the work unit, a task.`]
      ], a: 1 },
    { q: `Which planning activity answers "who are the stakeholders and what information does each need, how often, in what format"?`, o: [
        [`Developing a communication plan`, `Correct. The communication plan (planning activity 5) asks who the stakeholders are, what information each needs, when and how often, and in what format and medium (L3).`],
        [`Creating a preliminary budget`, `The preliminary budget lists planned expenses and revenues (cost-benefit, NPV, ROI); it does not plan stakeholder information.`],
        [`Identifying and assessing risk`, `Identifying and assessing risk looks at sources of risk and their consequences, not at who needs which information.`],
        [`Setting the BPP`, `The BPP is the estimate of tasks and resources used to guide execution, not a plan of stakeholder communication.`]
      ], a: 0 },
    { q: `Expected times using ET = (o + 4r + p)/6: task X (1, 3, 11) and task Y (2, 4, 12). ET(X) and ET(Y) are:`, o: [
        [`3 and 4`, `3 and 4 are just the realistic values r; PERT weights them with o and p: (1 + 4×3 + 11)/6 = 4 and (2 + 4×4 + 12)/6 = 5.`],
        [`5 and 6 (simple average)`, `The simple average is (1+3+11)/3 = 5, not the PERT formula.`],
        [`4 and 5`, `Correct. (1+12+11)/6 = 24/6 = 4; (2+16+12)/6 = 30/6 = 5.`],
        [`5 and 6`, `5 and 6 are the simple averages (1+3+11)/3 and (2+4+12)/3; the PERT formula gives 24/6 = 4 and 30/6 = 5.`]
      ], a: 2 },
    { q: `Activity 5 in SPTS has TE = 18.5 and TL = 21. What does this mean?`, o: [
        [`It is on the critical path`, `Critical activities have TE = TL (zero slack); here TL − TE = 2.5, so activity 5 is off the critical path.`],
        [`It can be delayed 2.5 weeks without delaying the project`, `Correct. Slack = TL − TE = 21 − 18.5 = 2.5 weeks: activity 5 can slip that much without delaying the 22-week project (L3, SPTS).`],
        [`The project will be 2.5 weeks late`, `Slack is spare time, not lateness; the project still finishes in 22 weeks as long as activity 5 slips no more than 2.5 weeks.`],
        [`It must start at week 21`, `TL = 21 is the latest time activity 5 can be completed (week 21), not its start time; its earliest completion is 18.5.`]
      ], a: 1 },
    { q: `Which is shown by a network diagram but NOT by a Gantt chart (slide 52)?`, o: [
        [`Slack time in duration`, `Slack shown as a duration is how a Gantt chart shows slack; network diagrams show it in boxes (slide 52).`],
        [`Task durations as bar lengths`, `Durations as bar lengths are a Gantt chart feature; a network diagram shows dependencies instead.`],
        [`Time overlap between tasks`, `Time overlap is shown by Gantt charts; slide 52 says network diagrams do not show time overlap but show parallelism.`],
        [`Task dependencies, with slack shown in boxes`, `Correct. Slide 52: network diagrams show task dependencies and slack time in boxes, which Gantt charts do not (L3, Gantt vs network).`]
      ], a: 3 },
    { q: `In MS Project, a diamond on a Gantt chart and a hexagon on a network diagram both represent:`, o: [
        [`A summary activity`, `That is the black line at the top of a Gantt chart.`],
        [`A dummy activity`, `Dummy activities belong to arrow networks, not MS Project.`],
        [`The critical path`, `The critical path is shown in MS Project as red boxes and arrows, not diamonds or hexagons.`],
        [`A milestone`, `Correct. In MS Project a milestone is a diamond on the Gantt chart and a hexagon on the network diagram (L3, Project management software).`]
      ], a: 3 }
  ], 4: [
    { q: `On a Level-0 DFD, process 3.0 "Generate Report" has two input flows and no output. Which rule is broken?`, o: [
        [`Data stores must be noun phrases`, `Naming of data stores is not involved; the process has inputs but no output, so it breaks the process rule.`],
        [`A process must have both inputs and outputs (this is a "black hole")`, `Correct. A process with only inputs is a "black hole"; every process must have both inputs and outputs, so 3.0 needs an output such as the report (L4, Process rule).`],
        [`Forked flows must be the same data`, `A fork is one flow going to several destinations; here there are just two inputs and no output, a black hole.`],
        [`The context must have one process`, `The one-process rule is for the context diagram; this is Level 0, which may have several processes.`]
      ], a: 1 },
    { q: `A flow arrow goes directly from data store D1 "Orders" to data store D2 "Invoices". The correction is to:`, o: [
        [`Route it through a process that reads D1 and updates D2`, `Correct. All flows to or from a data store must move through a process.`],
        [`Rename D2 as an external entity`, `An entity cannot connect directly to a store either.`],
        [`Delete D1`, `Deleting D1 throws away the orders data the system needs; the fix is to move the data through a process that reads D1 and updates D2.`],
        [`Make the arrow double-headed`, `A double-headed arrow is still a direct store-to-store flow; any flow to or from a store must pass through a process.`]
      ], a: 0 },
    { q: `"Customer" sends "Payment" directly to "Bank" with no process in between. In the DFD this flow should:`, o: [
        [`Be shown on Level 2 only`, `No level shows entity-to-entity flows: an interaction with no intervening process is outside the system at every level.`],
        [`Be drawn as it is`, `Data cannot move directly between external entities.`],
        [`Not be shown, because it is outside the system`, `Correct. No data may move directly between external entities; an interaction without an intervening process is outside the system and is not shown (L4, Source/sink rule).`],
        [`Be drawn as a data store`, `A data store is data at rest inside the system; a payment passing between two outside entities is neither at rest nor inside the system.`]
      ], a: 2 },
    { q: `Process 2.0 has 2 inputs and 3 outputs on Level 0. Its Level-1 diagram shows 3 inputs and 3 outputs crossing its boundary, and the extra input is not part of a split composite flow. This is:`, o: [
        [`Data flow splitting`, `Splitting keeps the same data; an unrelated extra input does not.`],
        [`Balanced`, `Balanced requires the child to have the same inputs as the parent; 3 inputs on Level 1 vs 2 on Level 0, with no splitting, breaks this.`],
        [`Unbalanced`, `Correct. Balancing requires the child diagram to conserve the parent's inputs and outputs; an extra unrelated input (3 vs 2) makes it unbalanced, like Fig 7-10 (L4, slide 22).`],
        [`A primitive DFD`, `A primitive DFD is the lowest level of decomposition; the question is about the inputs not matching the parent, which is a balancing error.`]
      ], a: 2 },
    { q: `Level 0 has a flow "Customer Order" into 1.0. On Level 1 it becomes "Order Header" into 1.1 and "Order Lines" into 1.2. This is acceptable because:`, o: [
        [`It is data flow splitting of a composite flow; the same data is involved`, `Correct. Data flow splitting: a composite flow (Customer Order) may be split into parts going to different lower-level processes; it stays balanced because the same data is involved (L4).`],
        [`Order Lines is a data store`, `Order Lines is drawn as a flow into process 1.2, not data at rest; the case is acceptable because it is part of the split composite flow.`],
        [`Level 1 is the context`, `A Level-1 diagram decomposes process 1.0; the context diagram is the top level with only process 0.`],
        [`Child diagrams may ignore parent flows`, `Child diagrams must balance with the parent's flows; this case is fine only because the two flows are parts of the same composite flow.`]
      ], a: 0 },
    { q: `The processes on the child diagram of process 5.2 should be numbered:`, o: [
        [`6.0, 7.0, 8.0`, `6.0, 7.0, 8.0 are Level-0 numbers of separate major processes; children of 5.2 must carry the parent number 5.2.`],
        [`2.1, 2.2, 2.3`, `2.1, 2.2, 2.3 would be children of process 2.0; the parent here is 5.2, so its children are 5.2.1, 5.2.2, 5.2.3.`],
        [`5.1, 5.2, 5.3`, `5.1, 5.2, 5.3 are the Level-1 children of process 5.0 (5.2 is one of them); its own children need one more level: 5.2.1, ...`],
        [`5.2.1, 5.2.2, 5.2.3`, `Correct. Parent number, a period, and a unique child number.`]
      ], a: 3 },
    { q: `Which is NOT a rule for stopping decomposition?`, o: [
        [`The user does not care to see more detail`, `"The system user does not care to see any more detail" is rule 3 for stopping decomposition, so it IS a rule.`],
        [`The diagram fits on one page`, `Correct. Fitting on one page is not among the six stopping rules (single decision/calculation/DB operation, single-entity store, user wants no more detail, ...) (L4, slide 31).`],
        [`There is a separate process for each lowest-level menu choice`, `A separate process for each choice on all lowest-level menu options is rule 6 for stopping decomposition, so it IS a rule.`],
        [`Each data store represents data about a single entity`, `Each data store representing data about a single entity is rule 2 for stopping decomposition, so it IS a rule.`]
      ], a: 1 },
    { q: `A process reads a customer record and updates the same record in the Customer file. How should this be drawn?`, o: [
        [`Two separate arrows (retrieve and update), as the lecture rule says`, `Correct. The lab deck also allows one double-headed arrow when the process reads and updates the same file.`],
        [`An arrow from the file to the customer entity`, `A data store cannot connect directly to an external entity; all flows to or from a store must pass through a process.`],
        [`No arrow: reads are not shown`, `Retrieving data is a real data flow (store to process = retrieve) and must be drawn like the update.`],
        [`One arrow from the process to the file`, `One arrow into the file shows only the update; the read (file to process = retrieve) must be drawn too, as a second arrow.`]
      ], a: 0 },
    { q: `Which belongs on a context diagram?`, o: [
        [`Data store D1 Customer File`, `The context diagram contains no data stores; stores first appear on the Level-0 diagram.`],
        [`Process 1.0 and 2.0`, `Processes 1.0 and 2.0 belong to the Level-0 diagram; the context diagram has only one process, numbered 0.`],
        [`All external entities with the major flows to and from process 0`, `Correct. The context diagram shows the system boundary: one process 0, all external entities, and the major flows between them and the system, with no data stores (L4).`],
        [`Primitive processes`, `Primitive processes are at the lowest level of decomposition, the opposite end from the context diagram.`]
      ], a: 2 },
    { q: `"Draw DFDs as if the system has never started and will never stop" is the guideline called:`, o: [
        [`Consistency`, `Consistency = same information on all levels.`],
        [`Timing`, `Correct. Timing: time is not represented well on DFDs, so draw them as if the system has never started and will never stop (L4, slide 30).`],
        [`Iterative development`, `Iterative development means expecting to redraw a diagram several times before it approximates the system; it says nothing about time.`],
        [`Completeness`, `Completeness = all components included and described.`]
      ], a: 1 }
  ], 5: [
    { q: `Basic COCOMO, organic, 32 KDSI (E = 2.4·KDSI^1.05, TDEV = 2.5·E^0.38). Effort and schedule are about:`, o: [
        [`146 MM and 14 months`, `146 MM and 14 months is the semidetached result (3.0 × 32^1.12); organic uses 2.4 × 32^1.05 ≈ 91 MM.`],
        [`230 MM and 14 months`, `230 MM and 14 months is the embedded result (3.6 × 32^1.20); organic uses 2.4 × 32^1.05 ≈ 91 MM.`],
        [`77 MM and 13 months`, `That uses 2.4 × 32 = 76.8 without the exponent.`],
        [`91 MM and 14 months`, `Correct. 32^1.05 = 38.05; × 2.4 = 91.3. 91^0.38 = 5.55; × 2.5 = 13.9.`]
      ], a: 3 },
    { q: `Basic COCOMO, embedded, 32 KDSI: E = 3.6 × 32^1.20. Since 32^1.20 = 64, E = ?`, o: [
        [`192 MM`, `192 = 3.0 × 64 uses the semidetached constant; Basic embedded uses 3.6, so E = 3.6 × 64 = 230.4 MM.`],
        [`64 MM`, `64 is only KDSI^1.20; Basic COCOMO multiplies it by the mode constant 3.6, giving 230 MM.`],
        [`115 MM`, `115 = 3.6 × 32 drops the exponent; the given 32^1.20 = 64 must be used: 3.6 × 64 = 230 MM.`],
        [`230 MM`, `Correct. E = 3.6 × 32^1.20 = 3.6 × 64 = 230.4 ≈ 230 MM (L5, Basic embedded equation).`]
      ], a: 3 },
    { q: `Semidetached, 50 KDSI. E = 3.0 × 50^1.12 ≈ 240 MM and TDEV = 2.5 × 240^0.35 ≈ 17 months. Average staffing ≈ ?`, o: [
        [`7 FSP`, `7 FSP is about half the correct value; average staffing = E / TDEV = 240 / 17 ≈ 14 FSP.`],
        [`14 FSP`, `Correct. Average staffing = E / TDEV = 240 / 17 = 14.1 ≈ 14 FSP (L5, Derived quantities).`],
        [`208 FSP`, `208 is the productivity (50,000 / 240 DSI/MM).`],
        [`4080 FSP`, `4080 = 240 × 17 multiplies effort by time; average staffing divides: 240 / 17 ≈ 14 FSP.`]
      ], a: 1 },
    { q: `A project has E = 60 MM and TDEV = 10 months (6 FSP). Management wants it finished in 5 months. Using the course method, the staff needed is:`, o: [
        [`12 FSP`, `Correct. Staff needed for a time T is E / T = 60 / 5 = 12 FSP: halving the time doubles the staff (L5, Derived quantities).`],
        [`300 FSP`, `300 = 60 × 5 multiplies effort by time; staff for a target time is E / T = 60 / 5 = 12 FSP.`],
        [`3 FSP`, `3 FSP is half the staff, which would double the time to 20 months; finishing in 5 months needs 60 / 5 = 12 FSP.`],
        [`6 FSP`, `6 FSP is the normal staff for 10 months; finishing in 5 months needs 60 / 5 = 12 FSP.`]
      ], a: 0 },
    { q: `E = 60 MM, normal staff 6 FSP, salary EP 4000/month, TDEV 10 months. Total programmer cost (staff × months × salary)?`, o: [
        [`EP 2,400,000`, `2,400,000 = 60 × 10 × 4000 multiplies the man-months by the months again; cost is 6 FSP × 10 months × 4000 = 240,000.`],
        [`EP 24,000`, `24,000 = 6 × 4000 is the team's pay for a single month; over 10 months it is 6 × 10 × 4000 = EP 240,000.`],
        [`EP 240,000`, `Correct. 6 × 10 × 4000 = 240,000 (= 60 MM × 4000).`],
        [`EP 40,000`, `40,000 = 10 × 4000 pays only one person for 10 months; the team has 6: 6 × 10 × 4000 = EP 240,000.`]
      ], a: 2 },
    { q: `Intermediate COCOMO, organic, 10 KDSI with CPLX = low (0.85) and RELY = high (1.15). The EAF is:`, o: [
        [`0.30`, `0.30 = 1.15 − 0.85 subtracts the multipliers; the EAF is their product: 0.85 × 1.15 = 0.9775.`],
        [`2.00`, `2.00 = 0.85 + 1.15 adds them; the EAF is the product of the effort multipliers: 0.85 × 1.15 = 0.9775.`],
        [`0.9775`, `Correct. The EAF is the product of the cost-driver effort multipliers: 0.85 × 1.15 = 0.9775 (L5, Intermediate COCOMO).`],
        [`1.15`, `1.15 uses RELY alone; every rated driver enters the EAF, so CPLX low (0.85) must be multiplied in: 0.85 × 1.15 = 0.9775.`]
      ], a: 2 },
    { q: `Which cost driver belongs to the Computer attributes?`, o: [
        [`STOR`, `Correct. STOR (main storage constraint) is a Computer attribute, with TIME, VIRT and TURN (L5, Intermediate cost drivers).`],
        [`TOOL`, `TOOL (use of software tools) is a Project attribute, with MODP and SCED.`],
        [`DATA`, `DATA (database size) is a Product attribute, with RELY and CPLX.`],
        [`ACAP`, `ACAP (analyst capability) is a Personnel attribute, with AEXP, PCAP, VEXP and LEXP.`]
      ], a: 0 },
    { q: `A company builds its 5th payroll package with an experienced team in a stable environment. The mode and Basic effort coefficient are:`, o: [
        [`Embedded, 3.6`, `Embedded = tight constraints and great innovation.`],
        [`Semidetached, 3.0`, `Semidetached is between organic and embedded; a 5th similar package built in a stable environment is the organic case.`],
        [`Organic, 3.6`, `The mode is organic, but 3.6 is the Basic embedded coefficient; Basic organic uses E = 2.4 × KDSI^1.05.`],
        [`Organic, 2.4`, `Correct. A familiar, stable project similar to earlier ones is organic, and Basic organic effort is E = 2.4 × KDSI^1.05 (L5, Modes and Basic equations).`]
      ], a: 3 },
    { q: `A manager needs separate staffing and cost figures for each development phase and module. Which COCOMO model should be used?`, o: [
        [`Intermediate`, `Intermediate multipliers are phase-insensitive.`],
        [`Detailed`, `Correct. It estimates each phase, subsystem and module.`],
        [`None of them`, `COCOMO does cover this: the Detailed model estimates staffing, cost and duration for each phase, subsystem and module.`],
        [`Basic`, `Basic gives only one quick rough total from size; it cannot split staffing or cost by phase or module.`]
      ], a: 1 },
    { q: `E = 28 MM, TDEV = 9 months, staff 3 FSP. If the staff drops to ¼ of the estimate, how long will the project take (course rounding)?`, o: [
        [`28 months`, `Correct. ¼ × 3 = 0.75 ≈ 1 FSP; 28 / 1 = 28 months (lecture problem b).`],
        [`36 months`, `That is 4 × 9 months, which ignores the rounding to 1 FSP.`],
        [`9 months`, `9 months is the original schedule with 3 FSP; with ¼ of the staff (≈1 FSP) it takes 28 / 1 = 28 months.`],
        [`2.25 months`, `2.25 = 9 × ¼ shrinks the time instead of the staff; fewer people take longer: ≈1 FSP gives 28 / 1 = 28 months.`]
      ], a: 0 }
  ], 6: [
    { q: `Network: A 3 (-), B 4 (A), C 2 (A), D 5 (B,C), E 1 (D). The project duration and critical path are:`, o: [
        [`10, A-B-D`, `A-B-D is only 3+4+5 = 12 and leaves out the end activity E; the longest full path A-B-D-E is 13.`],
        [`11, A-C-D-E`, `A-C-D-E = 3+2+5+1 = 11 is the shorter path (C = 2 < B = 4); the duration is the longest path, 13.`],
        [`13, A-B-D-E`, `Correct. The longest path is A-B-D-E = 3 + 4 + 5 + 1 = 13; A-C-D-E is only 11, so C has slack and B is critical (L6, Forward pass).`],
        [`15, all activities`, `B and C run in parallel; you cannot add both.`]
      ], a: 2 },
    { q: `In the network A 3, B 4 (A), C 2 (A), D 5 (B,C), E 1 (D), the slack of C is:`, o: [
        [`0`, `Zero slack is for critical activities; C finishes at 5 but D cannot start before B ends at 7, so C has 2 spare units.`],
        [`2`, `Correct. C: ES 3, EF 5; D starts at LS = 7, so LF(C) = 7 and slack = 7 − 5 = 2 (L6, Total slack = LF − EF).`],
        [`4`, `4 is B's duration; C's slack is LF 7 − EF 5 = 2.`],
        [`7`, `7 is C's latest finish LF, not the slack; slack = LF − EF = 7 − 5 = 2.`]
      ], a: 1 },
    { q: `Network: P 4 (-), Q 6 (-), R 3 (P), S 5 (Q,R), T 2 (S). Which activity is NOT critical?`, o: [
        [`S`, `S follows both Q and R and lies on every path, including the longest P-R-S-T = 14, so it is critical.`],
        [`T`, `T is the final activity on every path, including the 14-unit critical path, so it has zero slack.`],
        [`P`, `P is on the longest path P-R-S-T = 4+3+5+2 = 14, so P has zero slack and is critical.`],
        [`Q`, `Correct. Q-S-T = 13, so Q has 1 unit of slack.`]
      ], a: 3 },
    { q: `Network: A 2 (-), B 5 (-), C 4 (A), D 3 (A,B), E 6 (C), F 2 (D,E). B has total slack 4. What is B's free slack?`, o: [
        [`2`, `Free slack = min ES of successors − EF = ES(D) − EF(B); ES(D) = max(2, 5) = 5, so it is 5 − 5 = 0, not 2.`],
        [`5`, `5 is B's duration (and its EF); free slack = ES(D) − EF(B) = 5 − 5 = 0.`],
        [`4`, `4 is B's total slack (delay before the project end slips); free slack only allows delay without moving D's early start: 5 − 5 = 0.`],
        [`0`, `Correct. B finishes at 5 and its successor D can start at 5 at the earliest, so delaying B delays D's early start.`]
      ], a: 3 },
    { q: `Activity C must start after A and B; activity E must start after B only. Joining A and B into one node before both C and E is wrong because:`, o: [
        [`It breaks rule 1`, `Rule 1 (one arc per activity) still holds; the real fault is wrong precedence, since E would have to wait for A.`],
        [`It forces E to wait for A, so a dummy from B's end node to C's start node is needed`, `Correct. One joint node would make E follow A as well as B; B must end at its own node, with a dummy from B's end node to C's start node (L6, rule 3 example).`],
        [`Dummies are never allowed`, `Dummies are allowed: they cost no time or resources, and this exact case is the lecture's example of when a dummy is needed.`],
        [`C would then have no predecessor`, `C would still follow A and B; the problem is that E, which needs only B, would wrongly wait for A too.`]
      ], a: 1 },
    { q: `PERT estimates for a task: o = 2, m = 5, p = 14. The expected time and the (textbook) variance are:`, o: [
        [`6 and 4`, `Correct. (2 + 20 + 14)/6 = 6; ((14-2)/6)² = 2² = 4.`],
        [`7 and 2`, `7 = (2+5+14)/3 is a simple average, not (o + 4m + p)/6 = 6; and 2 = (14−2)/6 is σ, whose square is the variance 4.`],
        [`5 and 12`, `5 is the most likely time m, not the expected time (36/6 = 6); 12 is p − o, which must be divided by 6 and squared: 4.`],
        [`6 and 2`, `2 is the standard deviation; the variance is 4.`]
      ], a: 0 },
    { q: `A project's expected time is 22 weeks and σ = 1.6 weeks (textbook extension). The probability of finishing within 22 weeks is:`, o: [
        [`100%`, `Finishing by the expected time is only a 50% chance; Z = (22 − 22)/1.6 = 0 and Φ(0) = 0.5.`],
        [`0%`, `The expected time is the middle of the distribution.`],
        [`50%`, `Correct. Z = (target − expected)/σ = (22 − 22)/1.6 = 0, and Φ(0) = 0.5: the expected time is the middle of the normal distribution (L6, textbook extension).`],
        [`89%`, `89% is P(T ≤ 24): Z = (24 − 22)/1.6 = 1.25, Φ(1.25) ≈ 0.894; for 22 weeks Z = 0, so 50%.`]
      ], a: 2 },
    { q: `The earliest-start Gantt count row for a project is 1 1 3 3 2 4 4 2 1. By the lecture method, the minimum team (no one does two activities at once) is:`, o: [
        [`1`, `One person cannot cover the periods with 3 or 4 activities.`],
        [`2`, `Two people cannot cover the periods with 3 or 4 activities running at once; the team is the largest count, 4.`],
        [`4`, `Correct. By the lecture method the minimum team is the largest number of bars running at once on the earliest-start Gantt chart: max(1,1,3,3,2,4,4,2,1) = 4 (L6).`],
        [`21`, `21 is the sum of the count row (total person-periods); the team is the largest single count, 4.`]
      ], a: 2 },
    { q: `An activity with 3 weeks of total slack is delayed by 5 weeks. The project end:`, o: [
        [`Is delayed by 2 weeks`, `Correct. 5 - 3 = 2, as in Problem 2 (activity 6: 5-week increase, 4 slack → 1 week delay).`],
        [`Is delayed by 5 weeks`, `The 3 weeks of slack absorb part of the delay, so the end moves by only 5 − 3 = 2 weeks.`],
        [`Is delayed by 8 weeks`, `8 = 5 + 3 adds the slack to the delay; slack absorbs delay, so the end moves by 5 − 3 = 2 weeks.`],
        [`Does not change`, `The 5-week delay is larger than the 3 weeks of slack, so the project end is pushed back by 2 weeks.`]
      ], a: 0 },
    { q: `Which statement about CPM and PERT is correct?`, o: [
        [`Both ignore precedence`, `Both CPM and PERT are built on networks of precedence relationships; neither ignores precedence.`],
        [`The feedback loop goes from the network back to the activity list only`, `The loop goes from the time schedule back to the network.`],
        [`CPM uses three time estimates per activity`, `PERT uses three estimates; CPM uses one deterministic time.`],
        [`PERT assumes probabilistic durations; CPM assumes deterministic durations`, `Correct. The lecture's key difference: PERT assumes probabilistic activity durations (three estimates), CPM assumes deterministic durations (L6, CPM and PERT).`]
      ], a: 3 }
  ] };

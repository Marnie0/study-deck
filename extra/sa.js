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
        [`A transaction, then a deliverable`, `"Deliverable" is a project management term.`],
        [`An action needed, then an observation`, `The order is reversed.`]
      ], a: 0 },
    { q: `Which pair correctly distinguishes an IS from a CBIS?`, o: [
        [`They have the same components`, `CBIS has two extra components.`],
        [`CBIS removes people from the system`, `People remain a CBIS component.`],
        [`IS = people, procedures, data; CBIS adds programs and computers`, `Correct.`],
        [`IS = programs and computers; CBIS = people and procedures`, `It is the other way round: CBIS adds programs and computers.`]
      ], a: 2 },
    { q: `A cinema's system records each seat booking and checks it against the seats still free. What type of IS is this, and what is the "TPS data"?`, o: [
        [`DSS; the knowledge base`, `Routine bookings are day-to-day operations, so this is a TPS, not a DSS.`],
        [`TPS; the location of the available seats`, `Correct. The lecture's ticket reservation example.`],
        [`MIS; report-writing software`, `An MIS summarizes TPS data for managers.`],
        [`OAS; the e-mail server`, `Office automation is not about bookings.`]
      ], a: 1 },
    { q: `A bank manager needs help deciding whether to open a branch in a new district, using sales data, an expert knowledge base and multidimensional analysis. The best-suited system is:`, o: [
        [`Payroll system`, `A payroll system is a TPS.`],
        [`Office automation system`, `OAS supports office communication.`],
        [`TPS`, `TPS handles routine transactions.`],
        [`DSS`, `Correct. A DSS assists managers in deciding a specific problem, using a relational DB, a knowledge base and a multidimensional DB.`]
      ], a: 3 },
    { q: `Several regional managers must reach one joint budget decision together. Which DSS-related software fits?`, o: [
        [`Report-writing software`, `That is an MIS module.`],
        [`An order entry TPS`, `That records orders.`],
        [`Artificial intelligence`, `AI analyzes a problem on its own, not as a group.`],
        [`Group Decision Support System`, `Correct. A GDSS aids a group of managers in working out decisions.`]
      ], a: 3 },
    { q: `An operational supervisor on a factory floor mainly needs information that is:`, o: [
        [`Environmental and summarized`, `That suits the strategic level.`],
        [`Internal and detailed`, `Correct (Fig 1.11).`],
        [`Environmental and detailed`, `Operational information is mostly internal.`],
        [`Only financial forecasts`, `Too narrow and strategic.`]
      ], a: 1 },
    { q: `Which management function does a strategic planning manager emphasise the most (Fig 1.13)?`, o: [
        [`Planning`, `Correct.`],
        [`Staffing`, `Staffing is a small share at every level.`],
        [`Controlling`, `Control is only a small share at the strategic level; planning is the largest slice there.`],
        [`Directing`, `Directing is mostly done at the operational level.`]
      ], a: 0 },
    { q: `"Investigating the problem and the requirements rather than a solution" and "a conceptual solution that fulfils the requirements" describe, in order:`, o: [
        [`Implementation, maintenance`, `Neither phrase fits.`],
        [`Design, analysis`, `The order is reversed.`],
        [`Analysis, design`, `Correct (lab 1).`],
        [`Planning, implementation`, `Neither phrase is about planning or implementation.`]
      ], a: 2 },
    { q: `A use case diagram is classified in the lab as a:`, o: [
        [`Data flow diagram`, `A DFD is not a UML diagram.`],
        [`Structural diagram`, `Structural diagrams (e.g. class diagrams) do not change with time.`],
        [`Behavioral diagram`, `Correct. It shows how the system responds to requests.`],
        [`Interaction diagram`, `Interaction diagrams are sequence and collaboration diagrams.`]
      ], a: 2 }
  ], 2: [
    { q: `A company's IT team keeps rewriting project documents while users complain they were only consulted at the start and cannot change requirements. Which methodology's problems does this describe?`, o: [
        [`Traditional waterfall SDLC`, `Correct. Locked-in requirements, limited user involvement and heavy documentation.`],
        [`RAD`, `RAD has extensive user involvement.`],
        [`Prototyping`, `Prototyping involves users continuously.`],
        [`Agile`, `Agile is adaptive and people-focused.`]
      ], a: 0 },
    { q: `An analyst builds sample screens in a visual tool while the sales representative watches, then changes them after each round of feedback. This is:`, o: [
        [`Code generation`, `A CASE function, not this process.`],
        [`Waterfall`, `Waterfall does not loop with users.`],
        [`JAD`, `JAD is several days of structured group meetings.`],
        [`Prototyping`, `Correct. This is the lecture's Visual Basic example.`]
      ], a: 3 },
    { q: `Choosing the DBMS, the server and the network for an approved design is part of:`, o: [
        [`Logical design`, `Logical design is platform independent.`],
        [`Physical design`, `Correct. It turns logical specs into technology-specific details.`],
        [`Planning`, `Planning identifies and prioritizes IS needs.`],
        [`Analysis`, `Analysis studies requirements.`]
      ], a: 1 },
    { q: `Which CASE tool would you use to make sure a DFD has no process with missing inputs before the design review?`, o: [
        [`Analysis tool`, `Correct. It automatically checks for incomplete, inconsistent or incorrect specifications.`],
        [`Code generator`, `It produces code.`],
        [`Report generator`, `It prototypes look and feel.`],
        [`Documentation generator`, `It produces manuals.`]
      ], a: 0 },
    { q: `During maintenance, which CASE component is emphasised?`, o: [
        [`Report generators`, `Used mainly in design.`],
        [`Diagramming tools only`, `All tools are used, but one is emphasised.`],
        [`The central repository`, `Correct. It is the reference for design and code changes.`],
        [`Matrix tools`, `Used in project identification and selection.`]
      ], a: 2 },
    { q: `Which pairing of decade and change is correct?`, o: [
        [`1950s: CASE tools developed`, `CASE tools came in the 1980s.`],
        [`1970s: development became more like engineering`, `Correct.`],
        [`1980s: focus on Web development`, `Web focus came in the 1990s.`],
        [`1990s: everything written in assembly language`, `That was the 1950s.`]
      ], a: 1 },
    { q: `A two-person team writes automated tests with the customer and integrates new code within hours of writing it. This describes:`, o: [
        [`JAD`, `JAD is a meeting technique.`],
        [`Waterfall`, `Waterfall tests near the end.`],
        [`RUP`, `RUP has four phases with iterations.`],
        [`eXtreme Programming`, `Correct.`]
      ], a: 3 },
    { q: `In RAD (Fig 1-13), which phases are iterated repeatedly?`, o: [
        [`All five SDLC phases`, `That describes Fig 1-3.`],
        [`Inception and transition`, `These are RUP phases.`],
        [`Requirements planning and cutover`, `These happen once.`],
        [`User design and construction`, `Correct.`]
      ], a: 3 },
    { q: `A system request contains five elements. Which one is NOT among them?`, o: [
        [`Special issues`, `Included.`],
        [`Source code listing`, `Correct. The five are project sponsor, business need, business requirements, business value and special issues.`],
        [`Project sponsor`, `Included.`],
        [`Business value`, `Included.`]
      ], a: 1 },
    { q: `Using the lab percentages (planning 15%, analysis 20%, design 35%, implementation 30%), the planning phase took 3 weeks. Estimated total project time?`, o: [
        [`20 weeks`, `Correct. 3 / 0.15 = 20 weeks.`],
        [`45 weeks`, `That multiplies 3 by 15.`],
        [`10 weeks`, `3 / 0.30 = 10 would treat planning as 30%.`],
        [`15 weeks`, `3 / 0.20 = 15 would treat planning as 20%.`]
      ], a: 0 }
  ], 3: [
    { q: `The PVF purchasing manager fills in a form describing the problem and asking IS to build a new system. This document is the:`, o: [
        [`Statement of work`, `The SOW describes deliverables for the customer.`],
        [`Project charter`, `The charter is written after approval to announce the project.`],
        [`System Service Request`, `Correct.`],
        [`Baseline project plan`, `The BPP comes at the end of planning.`]
      ], a: 2 },
    { q: `Which document formally announces that the project now exists, for both internal and external stakeholders?`, o: [
        [`SSR`, `The SSR requests the work.`],
        [`Status report`, `A status report reports progress.`],
        [`Project charter`, `Correct.`],
        [`Project workbook`, `The workbook stores all project documents.`]
      ], a: 2 },
    { q: `"An unforeseen change in personnel due to sickness" is handled in which project phase and activity?`, o: [
        [`Execution: managing changes to the baseline project plan`, `Correct.`],
        [`Planning: identifying and assessing risk`, `Risk is planned for, but the actual change is managed during execution.`],
        [`Closedown: post-project review`, `Too late.`],
        [`Initiation: establishing the initiation team`, `This happens later, during execution.`]
      ], a: 0 },
    { q: `Which communication method has LOW formality and is used to inform and resolve issues?`, o: [
        [`Specification documents`, `These are highly formal.`],
        [`Project workbook`, `This is highly formal.`],
        [`Status reports`, `These are highly formal.`],
        [`Hallway discussions`, `Correct (Table 3-2).`]
      ], a: 3 },
    { q: `"Can be done by one person, has one identifiable deliverable, known method, clear predecessors and successors, measurable." These are the characteristics of a:`, o: [
        [`Project`, `A project has many tasks.`],
        [`Task`, `Correct.`],
        [`Milestone`, `A milestone has no duration.`],
        [`Deliverable`, `A deliverable is a product, not work.`]
      ], a: 1 },
    { q: `Which planning activity answers "who are the stakeholders and what information does each need, how often, in what format"?`, o: [
        [`Developing a communication plan`, `Correct.`],
        [`Creating a preliminary budget`, `The budget covers expenses and revenues.`],
        [`Identifying and assessing risk`, `Risk is about threats and consequences.`],
        [`Setting the BPP`, `The BPP estimates tasks and resources.`]
      ], a: 0 },
    { q: `Expected times using ET = (o + 4r + p)/6: task X (1, 3, 11) and task Y (2, 4, 12). ET(X) and ET(Y) are:`, o: [
        [`3 and 4`, `Those are just the realistic values.`],
        [`5 and 6 (simple average)`, `The simple average is (1+3+11)/3 = 5, not the PERT formula.`],
        [`4 and 5`, `Correct. (1+12+11)/6 = 24/6 = 4; (2+16+12)/6 = 30/6 = 5.`],
        [`5 and 6`, `Recheck the arithmetic: 24/6 = 4.`]
      ], a: 2 },
    { q: `Activity 5 in SPTS has TE = 18.5 and TL = 21. What does this mean?`, o: [
        [`It is on the critical path`, `Critical activities have TE = TL.`],
        [`It can be delayed 2.5 weeks without delaying the project`, `Correct. Slack = TL - TE = 2.5.`],
        [`The project will be 2.5 weeks late`, `Slack is spare time, not delay.`],
        [`It must start at week 21`, `21 is its latest completion time.`]
      ], a: 1 },
    { q: `Which is shown by a network diagram but NOT by a Gantt chart (slide 52)?`, o: [
        [`Slack time in duration`, `That is the Gantt way of showing slack.`],
        [`Task durations as bar lengths`, `That is a Gantt feature.`],
        [`Time overlap between tasks`, `That is a Gantt feature.`],
        [`Task dependencies, with slack shown in boxes`, `Correct.`]
      ], a: 3 },
    { q: `In MS Project, a diamond on a Gantt chart and a hexagon on a network diagram both represent:`, o: [
        [`A summary activity`, `That is the black line at the top of a Gantt chart.`],
        [`A dummy activity`, `Dummy activities belong to arrow networks, not MS Project.`],
        [`The critical path`, `The critical path is red.`],
        [`A milestone`, `Correct.`]
      ], a: 3 }
  ], 4: [
    { q: `On a Level-0 DFD, process 3.0 "Generate Report" has two input flows and no output. Which rule is broken?`, o: [
        [`Data stores must be noun phrases`, `Not related.`],
        [`A process must have both inputs and outputs (this is a "black hole")`, `Correct.`],
        [`Forked flows must be the same data`, `There is no fork here.`],
        [`The context must have one process`, `This is Level 0.`]
      ], a: 1 },
    { q: `A flow arrow goes directly from data store D1 "Orders" to data store D2 "Invoices". The correction is to:`, o: [
        [`Route it through a process that reads D1 and updates D2`, `Correct. All flows to or from a data store must move through a process.`],
        [`Rename D2 as an external entity`, `An entity cannot connect directly to a store either.`],
        [`Delete D1`, `That loses the data.`],
        [`Make the arrow double-headed`, `Still store to store.`]
      ], a: 0 },
    { q: `"Customer" sends "Payment" directly to "Bank" with no process in between. In the DFD this flow should:`, o: [
        [`Be shown on Level 2 only`, `It is outside the system at every level.`],
        [`Be drawn as it is`, `Data cannot move directly between external entities.`],
        [`Not be shown, because it is outside the system`, `Correct.`],
        [`Be drawn as a data store`, `It is not data at rest.`]
      ], a: 2 },
    { q: `Process 2.0 has 2 inputs and 3 outputs on Level 0. Its Level-1 diagram shows 3 inputs and 3 outputs crossing its boundary, and the extra input is not part of a split composite flow. This is:`, o: [
        [`Data flow splitting`, `Splitting keeps the same data; an unrelated extra input does not.`],
        [`Balanced`, `The input count differs.`],
        [`Unbalanced`, `Correct. Inputs and outputs must be conserved when decomposing.`],
        [`A primitive DFD`, `Primitive refers to the lowest level.`]
      ], a: 2 },
    { q: `Level 0 has a flow "Customer Order" into 1.0. On Level 1 it becomes "Order Header" into 1.1 and "Order Lines" into 1.2. This is acceptable because:`, o: [
        [`It is data flow splitting of a composite flow; the same data is involved`, `Correct.`],
        [`Order Lines is a data store`, `It is a flow.`],
        [`Level 1 is the context`, `Level 1 is not the context.`],
        [`Child diagrams may ignore parent flows`, `They must balance with the parent.`]
      ], a: 0 },
    { q: `The processes on the child diagram of process 5.2 should be numbered:`, o: [
        [`6.0, 7.0, 8.0`, `Those are Level-0 numbers.`],
        [`2.1, 2.2, 2.3`, `Those are children of process 2.`],
        [`5.1, 5.2, 5.3`, `Those are children of process 5.`],
        [`5.2.1, 5.2.2, 5.2.3`, `Correct. Parent number, a period, and a unique child number.`]
      ], a: 3 },
    { q: `Which is NOT a rule for stopping decomposition?`, o: [
        [`The user does not care to see more detail`, `This is a rule.`],
        [`The diagram fits on one page`, `Correct. Page size is not a stopping rule.`],
        [`There is a separate process for each lowest-level menu choice`, `This is a rule.`],
        [`Each data store represents data about a single entity`, `This is a rule.`]
      ], a: 1 },
    { q: `A process reads a customer record and updates the same record in the Customer file. How should this be drawn?`, o: [
        [`Two separate arrows (retrieve and update), as the lecture rule says`, `Correct. The lab deck also allows one double-headed arrow when the process reads and updates the same file.`],
        [`An arrow from the file to the customer entity`, `Stores cannot connect to entities.`],
        [`No arrow: reads are not shown`, `Retrieval is a data flow.`],
        [`One arrow from the process to the file`, `That shows only the update.`]
      ], a: 0 },
    { q: `Which belongs on a context diagram?`, o: [
        [`Data store D1 Customer File`, `Context diagrams have no data stores.`],
        [`Process 1.0 and 2.0`, `Only one process, numbered 0.`],
        [`All external entities with the major flows to and from process 0`, `Correct.`],
        [`Primitive processes`, `These are at the lowest level.`]
      ], a: 2 },
    { q: `"Draw DFDs as if the system has never started and will never stop" is the guideline called:`, o: [
        [`Consistency`, `Consistency = same information on all levels.`],
        [`Timing`, `Correct.`],
        [`Iterative development`, `That is about redrawing several times.`],
        [`Completeness`, `Completeness = all components included and described.`]
      ], a: 1 }
  ], 5: [
    { q: `Basic COCOMO, organic, 32 KDSI (E = 2.4·KDSI^1.05, TDEV = 2.5·E^0.38). Effort and schedule are about:`, o: [
        [`146 MM and 14 months`, `That is semidetached.`],
        [`230 MM and 14 months`, `That is embedded.`],
        [`77 MM and 13 months`, `That uses 2.4 × 32 = 76.8 without the exponent.`],
        [`91 MM and 14 months`, `Correct. 32^1.05 = 38.05; × 2.4 = 91.3. 91^0.38 = 5.55; × 2.5 = 13.9.`]
      ], a: 3 },
    { q: `Basic COCOMO, embedded, 32 KDSI: E = 3.6 × 32^1.20. Since 32^1.20 = 64, E = ?`, o: [
        [`192 MM`, `That would use the 3.0 constant.`],
        [`64 MM`, `You forgot the 3.6.`],
        [`115 MM`, `That is 3.6 × 32.`],
        [`230 MM`, `Correct. 3.6 × 64 = 230.4.`]
      ], a: 3 },
    { q: `Semidetached, 50 KDSI. E = 3.0 × 50^1.12 ≈ 240 MM and TDEV = 2.5 × 240^0.35 ≈ 17 months. Average staffing ≈ ?`, o: [
        [`7 FSP`, `Half of the correct value.`],
        [`14 FSP`, `Correct. 240 / 17 = 14.1.`],
        [`208 FSP`, `208 is the productivity (50,000 / 240 DSI/MM).`],
        [`4080 FSP`, `You multiplied 240 by 17.`]
      ], a: 1 },
    { q: `A project has E = 60 MM and TDEV = 10 months (6 FSP). Management wants it finished in 5 months. Using the course method, the staff needed is:`, o: [
        [`12 FSP`, `Correct. 60 / 5 = 12.`],
        [`300 FSP`, `You multiplied.`],
        [`3 FSP`, `Less time needs more people.`],
        [`6 FSP`, `That is for 10 months.`]
      ], a: 0 },
    { q: `E = 60 MM, normal staff 6 FSP, salary EP 4000/month, TDEV 10 months. Total programmer cost (staff × months × salary)?`, o: [
        [`EP 2,400,000`, `Ten times too large.`],
        [`EP 24,000`, `That is one month for 6 people.`],
        [`EP 240,000`, `Correct. 6 × 10 × 4000 = 240,000 (= 60 MM × 4000).`],
        [`EP 40,000`, `That is one person for 10 months.`]
      ], a: 2 },
    { q: `Intermediate COCOMO, organic, 10 KDSI with CPLX = low (0.85) and RELY = high (1.15). The EAF is:`, o: [
        [`0.30`, `That is 1.15 - 0.85.`],
        [`2.00`, `The multipliers are multiplied, not added.`],
        [`0.9775`, `Correct. 0.85 × 1.15 = 0.9775.`],
        [`1.15`, `Ignores CPLX.`]
      ], a: 2 },
    { q: `Which cost driver belongs to the Computer attributes?`, o: [
        [`STOR`, `Correct. Main storage constraint.`],
        [`TOOL`, `Project (use of software tools).`],
        [`DATA`, `Product (database size).`],
        [`ACAP`, `Personnel (analyst capability).`]
      ], a: 0 },
    { q: `A company builds its 5th payroll package with an experienced team in a stable environment. The mode and Basic effort coefficient are:`, o: [
        [`Embedded, 3.6`, `Embedded = tight constraints and great innovation.`],
        [`Semidetached, 3.0`, `This project is clearly familiar and simple.`],
        [`Organic, 3.6`, `3.6 is the embedded coefficient.`],
        [`Organic, 2.4`, `Correct.`]
      ], a: 3 },
    { q: `A manager needs separate staffing and cost figures for each development phase and module. Which COCOMO model should be used?`, o: [
        [`Intermediate`, `Intermediate multipliers are phase-insensitive.`],
        [`Detailed`, `Correct. It estimates each phase, subsystem and module.`],
        [`None of them`, `The Detailed model does this.`],
        [`Basic`, `Basic gives one rough total.`]
      ], a: 1 },
    { q: `E = 28 MM, TDEV = 9 months, staff 3 FSP. If the staff drops to ¼ of the estimate, how long will the project take (course rounding)?`, o: [
        [`28 months`, `Correct. ¼ × 3 = 0.75 ≈ 1 FSP; 28 / 1 = 28 months (lecture problem b).`],
        [`36 months`, `That is 4 × 9 months, which ignores the rounding to 1 FSP.`],
        [`9 months`, `That is the original schedule.`],
        [`2.25 months`, `Fewer staff means more time.`]
      ], a: 0 }
  ], 6: [
    { q: `Network: A 3 (-), B 4 (A), C 2 (A), D 5 (B,C), E 1 (D). The project duration and critical path are:`, o: [
        [`10, A-B-D`, `E is also required.`],
        [`11, A-C-D-E`, `That is the shorter path.`],
        [`13, A-B-D-E`, `Correct. 3+4+5+1 = 13.`],
        [`15, all activities`, `B and C run in parallel; you cannot add both.`]
      ], a: 2 },
    { q: `In the network A 3, B 4 (A), C 2 (A), D 5 (B,C), E 1 (D), the slack of C is:`, o: [
        [`0`, `C is not critical.`],
        [`2`, `Correct. ES 3, EF 5, LF 7 → 2.`],
        [`4`, `4 is B's duration.`],
        [`7`, `7 is C's latest finish.`]
      ], a: 1 },
    { q: `Network: P 4 (-), Q 6 (-), R 3 (P), S 5 (Q,R), T 2 (S). Which activity is NOT critical?`, o: [
        [`S`, `S is on both paths.`],
        [`T`, `T is the final activity.`],
        [`P`, `P-R-S-T = 14 is critical.`],
        [`Q`, `Correct. Q-S-T = 13, so Q has 1 unit of slack.`]
      ], a: 3 },
    { q: `Network: A 2 (-), B 5 (-), C 4 (A), D 3 (A,B), E 6 (C), F 2 (D,E). B has total slack 4. What is B's free slack?`, o: [
        [`2`, `Recheck: free slack = ES(D) - EF(B) = 5 - 5.`],
        [`5`, `5 is B's duration.`],
        [`4`, `That is the total slack.`],
        [`0`, `Correct. B finishes at 5 and its successor D can start at 5 at the earliest, so delaying B delays D's early start.`]
      ], a: 3 },
    { q: `Activity C must start after A and B; activity E must start after B only. Joining A and B into one node before both C and E is wrong because:`, o: [
        [`It breaks rule 1`, `Each activity still has one arc.`],
        [`It forces E to wait for A, so a dummy from B's end node to C's start node is needed`, `Correct.`],
        [`Dummies are never allowed`, `Dummies are allowed and needed here.`],
        [`C would then have no predecessor`, `C would still follow A and B.`]
      ], a: 1 },
    { q: `PERT estimates for a task: o = 2, m = 5, p = 14. The expected time and the (textbook) variance are:`, o: [
        [`6 and 4`, `Correct. (2 + 20 + 14)/6 = 6; ((14-2)/6)² = 2² = 4.`],
        [`7 and 2`, `7 is the simple average; 2 is σ, not σ².`],
        [`5 and 12`, `5 is the most likely time; 12 is p - o.`],
        [`6 and 2`, `2 is the standard deviation; the variance is 4.`]
      ], a: 0 },
    { q: `A project's expected time is 22 weeks and σ = 1.6 weeks (textbook extension). The probability of finishing within 22 weeks is:`, o: [
        [`100%`, `There is always uncertainty.`],
        [`0%`, `The expected time is the middle of the distribution.`],
        [`50%`, `Correct. Z = 0, so Φ(0) = 0.5.`],
        [`89%`, `That is for 24 weeks (Z = 1.25).`]
      ], a: 2 },
    { q: `The earliest-start Gantt count row for a project is 1 1 3 3 2 4 4 2 1. By the lecture method, the minimum team (no one does two activities at once) is:`, o: [
        [`1`, `One person cannot cover the periods with 3 or 4 activities.`],
        [`2`, `Some periods have 4 parallel activities.`],
        [`4`, `Correct. The largest number of parallel activities.`],
        [`21`, `That is the sum of the row.`]
      ], a: 2 },
    { q: `An activity with 3 weeks of total slack is delayed by 5 weeks. The project end:`, o: [
        [`Is delayed by 2 weeks`, `Correct. 5 - 3 = 2, as in Problem 2 (activity 6: 5-week increase, 4 slack → 1 week delay).`],
        [`Is delayed by 5 weeks`, `The slack absorbs 3 weeks.`],
        [`Is delayed by 8 weeks`, `Slack is not added to the delay.`],
        [`Does not change`, `The delay is bigger than the slack.`]
      ], a: 0 },
    { q: `Which statement about CPM and PERT is correct?`, o: [
        [`Both ignore precedence`, `Both are built on precedence networks.`],
        [`The feedback loop goes from the network back to the activity list only`, `The loop goes from the time schedule back to the network.`],
        [`CPM uses three time estimates per activity`, `PERT uses three estimates; CPM uses one deterministic time.`],
        [`PERT assumes probabilistic durations; CPM assumes deterministic durations`, `Correct.`]
      ], a: 3 }
  ] };

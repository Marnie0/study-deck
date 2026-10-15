window.COURSES = window.COURSES || {};
COURSES.or = {
  id: `or`,
  name: `Operations Research`,
  short: `OR`,
  code: `BS205 / CS304`,
  by: `Dr. Marwa Yahya, Dr. Abd El-Raheem`,
  lectures: [
    /* ───────────────────────── LECTURE 1 ───────────────────────── */
    {
      n: 1, title: `Introduction & Formulation of Linear Programming`,
      notes: [
        { h: `What is Operations Research (OR)?`, pts: [
          `OR is concerned with the <b>efficient allocation of scarce resources</b>. It is both an <b>art and a science</b>: the art lies in the ability to depict the concepts <i>efficient</i> and <i>scarce</i> in a well-defined <b>mathematical model</b> of a given situation.`,
          `<b>Origins</b>: formal OR activities began in <b>England during World War II</b>, when a team of British scientists set out to make decisions about the best utilization of war material. After the war, the ideas were adapted to improve efficiency and productivity in the <b>civilian sector</b>. Today OR is a dominant decision-making tool.`,
          `<b>Definition (exam wording)</b>: Operations research is concerned with <b>scientifically deciding how to best design and operate man-machine systems</b>, usually requiring the <b>allocation of scarce resources</b>.`,
          `Watch the traps: exam T/F statements swap this definition onto "linear programming", "formulation problem" or "dynamic programming". Only <b>operations research</b> owns this sentence.`
        ]},
        { h: `Linear programming and optimization problems`, pts: [
          `<b>Linear programming</b>: it is desired to <b>maximize or minimize a function subject to restrictions (constraints)</b>. Example: a manufacturer maximizes profit subject to limits on machinery and labor.`,
          `<b>Optimization problem</b>: we seek to maximize or minimize a specific quantity, called the <b>objective</b>, which depends on a finite number of <b>input (decision) variables</b>. The variables may be independent or related through one or more <b>constraints</b>.`,
          `A <b>mathematical program</b> is an optimization problem in which the objective and constraints are given as mathematical functions and functional relationships.`,
          `<b>Linear programming problem (LPP)</b>: finding the optimal value (max or min) of a <b>linear</b> function (objective function) of several variables, subject to the variables being <b>non-negative</b> and satisfying a set of <b>linear inequalities</b> (linear constraints).`,
          `The term <b>linear</b> means all mathematical relations used in the problem are linear relations. The term <b>programming</b> refers to the method of determining a particular <b>program or plan of action</b>.`
        ]},
        { h: `General form of a mathematical program`, formula: [
          `Optimize (max or min):  Z = f(x1, x2, ..., xn)`,
          `Subject to:  g1(x1, ..., xn)  (≤ or = or ≥)  b1`,
          `             g2(x1, ..., xn)  (≤ or = or ≥)  b2`,
          `             ...`,
          `             gm(x1, ..., xn)  (≤ or = or ≥)  bm`,
          `Non-negativity:  x1, x2, ..., xn ≥ 0`
        ]},
        { h: `Key definitions (Revision 1)`, table: [
          [`Term`, `Definition`],
          [`Formulation of an LPP`, `Translating the real-world problem into the form of mathematical equations which could be solved. It usually requires a thorough understanding of the problem.`],
          [`Objective function`, `Attempts to maximize profits or minimize losses based on a set of constraints and the relationship between one or more decision variables.`],
          [`Constraints`, `The linear inequalities on the variables of the linear programming problem (capacity, availability, resources, technology...).`],
          [`Non-negativity restriction`, `All decision variables must take on values equal to or greater than zero.`],
          [`Decision variables`, `The unknown quantities we decide on (x1, x2, ...), e.g. the number of units of each product.`]
        ]},
        { h: `The 4-step formulation procedure`, pts: [
          `<b>Step I</b>: Introduce the <b>decision variables</b> (x1, x2, ...), stating clearly what each one counts.`,
          `<b>Step II</b>: Summarize the relevant material in <b>table form</b>, relating the columns to the decision variables if possible (resources in rows, availability in the last column, profit/cost in the last row).`,
          `<b>Step III</b>: Determine the <b>objective</b> and write a <b>linear objective function</b> (Max Z or Min Z).`,
          `<b>Step IV</b>: Write the <b>constraints</b> and the <b>non-negativity condition</b>.`,
          `<b>Key words</b> (student summary): <i>profit, sold, sales, revenue</i> → <b>Max</b>; <i>cost</i> → <b>Min</b>; <i>available, has, at most, no more than, can use</i> → <b>≤</b>; <i>at least, contains, minimum needs, must deliver</i> → <b>≥</b>.`,
          `<b>Hidden constraints</b>: e.g. "number of days in a week" gives x ≤ 7, "days in September" gives x ≤ 30, and "paid for the whole day / fraction of a day" means the variables must be <b>integer</b>.`
        ]},
        { h: `Example 1: two machines, revenue (Lecture 1)`, formula: [
          `x1 = units of product A,  x2 = units of product B`,
          `Table:      A    B   | Available`,
          `   M1      10   22   | 2640 min`,
          `   M2      15   18   | 2500 min`,
          `   Price  200  175`,
          `Max Z = 200x1 + 175x2`,
          `S.T.  10x1 + 22x2 ≤ 2640`,
          `      15x1 + 18x2 ≤ 2500`,
          `      x1, x2 ≥ 0`
        ]},
        { h: `Examples 2 to 5 (Lecture 1)`, table: [
          [`Example`, `Variables`, `Model`],
          [`2. Jay's pastry (40 h, 22 g cake mix; cake 2 g, 2 h, $20; cupcake order 1 g, 4 h, $25)`, `x1 = cupcake orders, x2 = personal cakes`, `Max Z = 25x1 + 20x2; x1 + 2x2 ≤ 22 (mix); 4x1 + 2x2 ≤ 40 (hours); x1, x2 ≥ 0`],
          [`3. Paint (P: 2 & 4, R: 3 & 2; stock P 12, R 10; profit $1.0, $1.5)`, `x1 = standard (S-type), x2 = top quality (T-type)`, `Max Z = 1.0x1 + 1.5x2; 2x1 + 4x2 ≤ 12; 3x1 + 2x2 ≤ 10; x1, x2 ≥ 0`],
          [`4. Fertilizer (need ≥10 A, ≥15 B, ≥30 C; Fast Grow $12: 2,1,4; Easy Grow $10: 4,3,5)`, `x1 = bags of Fast Grow, x2 = bags of Easy Grow`, `Min Z = 12x1 + 10x2; 2x1 + 4x2 ≥ 10; x1 + 3x2 ≥ 15; 4x1 + 5x2 ≥ 30; x1, x2 ≥ 0`],
          [`5. Diet (≥16 carbs, ≥20 protein; A: 2 carbs, 4 protein, $1.20; B: 2, 1, $0.80)`, `x1 = units of food A, x2 = units of food B`, `Min Z = 1.20x1 + 0.80x2; 2x1 + 2x2 ≥ 16; 4x1 + x2 ≥ 20; x1, x2 ≥ 0`]
        ]},
        { h: `Lecture exercises Q1 and Q2 (solved)`, formula: [
          `Q1 Furniture: x1 = model I screens, x2 = model II screens`,
          `   Max Z = 120x1 + 80x2;  2x1 + x2 ≤ 6 (wood);  7x1 + 8x2 ≤ 28 (hours);  x1, x2 ≥ 0`,
          `   (graphical optimum: x1 = 20/9 ≈ 2.22, x2 = 14/9 ≈ 1.56, Z ≈ $391.11)`,
          `Q2 Small manufacturer: x1 = units of A, x2 = units of B`,
          `   Max Z = 6x1 + 5x2;  x1 + x2 ≤ 5 (R1);  3x1 + 2x2 ≤ 12 (R2);  x1, x2 ≥ 0`,
          `   (graphical optimum: (2, 3), Z = 27)`
        ]},
        { h: `Exam formulations with special conditions`, table: [
          [`Problem`, `Model`],
          [`Universal Mines (3 mines, deliver 54 t high grade, 65 t low grade per week, full day's pay)`, `Min Z = 20x1 + 22x2 + 18x3 ($1000); 4x1 + 6x2 + x3 ≥ 54; 4x1 + 4x2 + 6x3 ≥ 65; x1, x2, x3 ≤ 7; x ≥ 0 and integer (xi = days mine i operates)`],
          [`Recreational Motors (A: 40 carts + 35 snowmobiles, B: 65 carts, C: 53 snowmobiles; $210000, $190000, $182000/day; 1500 carts, 1100 snowmobiles in September)`, `Min Z = 210000x1 + 190000x2 + 182000x3; 40x1 + 65x2 ≥ 1500; 35x1 + 53x3 ≥ 1100; x1, x2, x3 ≤ 30; x ≥ 0 and integer`],
          [`Recycling centers (Center 1 $40/day: 140 lb glass, 60 lb aluminum; Center 2 $50: 100, 180; need ≥1540 glass, ≥1440 aluminum)`, `Min Z = 40x1 + 50x2; 140x1 + 100x2 ≥ 1540; 60x1 + 180x2 ≥ 1440; x1, x2 ≥ 0`],
          [`Pet store hamster feed (≥70 protein, ≥100 carbs; A 20/50 $2, B 30/30 $3, C 40/20 $5)`, `Min Z = 2x1 + 3x2 + 5x3; 20x1 + 30x2 + 40x3 ≥ 70; 50x1 + 30x2 + 20x3 ≥ 100; x ≥ 0`]
        ]}
      ],
      cards: [
        [`Operations research (definition)`, `Concerned with scientifically deciding how to best design and operate man-machine systems, usually requiring the allocation of scarce resources.`],
        [`Where and when did OR start?`, `England, during World War II (British scientists deciding the best use of war material).`],
        [`Why is OR "an art"?`, `The art lies in depicting "efficient" and "scarce" in a well-defined mathematical model.`],
        [`Formulation of an LPP`, `Translating the real-world problem into mathematical equations which could be solved.`],
        [`Objective function`, `Maximizes profit or minimizes loss/cost, based on constraints and the decision variables.`],
        [`Constraints`, `The linear inequalities on the variables of the LPP.`],
        [`Non-negativity restriction`, `All decision variables must take values ≥ 0.`],
        [`Meaning of "linear"`, `All mathematical relations in the problem are linear.`],
        [`Meaning of "programming"`, `The method of determining a particular program or plan of action.`],
        [`4 formulation steps`, `1) decision variables, 2) summary table, 3) linear objective function, 4) constraints + non-negativity.`],
        [`"At least" becomes`, `≥ constraint.`],
        [`"Available / at most / no more than" becomes`, `≤ constraint.`],
        [`"Profit / sales / revenue" means`, `Maximize.`],
        [`"Cost" means`, `Minimize.`],
        [`Mathematical program`, `An optimization problem whose objective and constraints are mathematical functions.`],
        [`Hidden constraint for "days of a week"`, `xi ≤ 7 (and integer if a full day's pay is guaranteed).`]
      ],
      qa: [
        [`Define operations research and give its origin.`, `Operations research is concerned with scientifically deciding how to best design and operate man-machine systems, usually requiring the allocation of scarce resources. It began in England during World War II when British scientists decided on the best utilization of war material; after the war the ideas were applied to civilian industry.`],
        [`List the steps for transforming a word problem into a mathematical program.`, `Step I: introduce decision variables. Step II: summarize the relevant data in a table relating columns to the decision variables. Step III: determine the objective and write a linear objective function. Step IV: write the constraints and the non-negativity condition.`],
        [`What is meant by the terms "linear" and "programming" in an LPP?`, `"Linear" means all mathematical relations in the problem (objective and constraints) are linear. "Programming" refers to the method of determining a particular program or plan of action.`],
        [`Define objective function, constraints and non-negativity restriction.`, `Objective function: the function to maximize (profit) or minimize (cost/loss) based on constraints and decision variables. Constraints: the linear inequalities on the variables (capacity, availability, resources). Non-negativity: every decision variable must be ≥ 0.`],
        [`Formulate: a company makes A and B on two machines; A takes 10 and 15 min, B 22 and 18 min; machines have 2640 and 2500 min; prices $200 and $175. Maximize revenue.`, `x1 = units of A, x2 = units of B. Max Z = 200x1 + 175x2 subject to 10x1 + 22x2 ≤ 2640, 15x1 + 18x2 ≤ 2500, x1, x2 ≥ 0.`],
        [`Formulate the Universal Mines problem and explain its hidden constraints.`, `xi = days mine i operates. Min Z = 20x1 + 22x2 + 18x3 (in $1000) s.t. 4x1 + 6x2 + x3 ≥ 54 (high grade), 4x1 + 4x2 + 6x3 ≥ 65 (low grade). Hidden: xi ≥ 0, xi ≤ 7 (a week has 7 days), and xi integer because workers are paid for a full day for any fraction of a day.`]
      ],
      quiz: [
        { q: `"............ is concerned with scientifically deciding how to best design and operate man machine systems usually requiring the allocation of scarce resources."`, o: [
          [`Operations research`, `Correct. This is the exact definition of OR in the lecture and Revision 1.`],
          [`Linear programming`, `LP maximizes or minimizes a linear function subject to constraints; it is a tool of OR, not this definition.`],
          [`Formulation problem`, `Formulation is translating a real problem into mathematical equations.`],
          [`Dynamic programming`, `DP deals with optimization of multistage decision problems.`]
        ], a: 0, src: `Revision sheet` },
        { q: `"............ are the linear inequalities on the variables of the linear programming problem."`, o: [
          [`Objective function`, `The objective function is the quantity being maximized or minimized, not the inequalities.`],
          [`Linear programming`, `LP is the whole problem, not the inequalities.`],
          [`Constraints`, `Correct. Constraints are the linear inequalities on the variables.`],
          [`Decision variables`, `Decision variables are the unknowns x1, x2, ..., not the inequalities.`]
        ], a: 2, src: `Revision sheet` },
        { q: `The term ............ in a linear programming problem implies that all the mathematical relations used in the problem are linear relations.`, o: [
          [`programming`, `"Programming" means determining a plan of action.`],
          [`non-negative constraints`, `Non-negative constraints only force every decision variable to be ≥ 0; they say nothing about the relations being linear (L1, Key definitions).`],
          [`linear`, `Correct. "Linear" means all relations are linear.`],
          [`feasible`, `"Feasible" describes points satisfying all constraints.`]
        ], a: 2, src: `Revision sheet` },
        { q: `True or False: "The term Programming in a linear programming problem implies that all the mathematical relations used in the problem are linear relations."`, o: [
          [`True`, `This sentence defines the word "linear", not "programming".`],
          [`False`, `Correct. "Programming" refers to determining a particular program or plan of action; the linear-relations sentence defines "linear".`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `True or False: "Formulation problem is concerned with scientifically deciding how to best design and operate man machine system usually requiring the allocation of scarce resources."`, o: [
          [`True`, `This is the definition of operations research, not formulation.`],
          [`False`, `Correct. Formulation = translating the real-world problem into mathematical equations. The quoted definition belongs to OR.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `True or False: "Constraints are the linear inequalities on the variables of the linear programming problem."`, o: [
          [`True`, `Correct. This is the lecture's definition of constraints.`],
          [`False`, `False would deny the lecture's own definition: constraints are exactly the linear inequalities on the LPP variables (capacity, availability, resources).`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `True or False: "Operations research is concerned with scientifically deciding how to best design and operate man machine system usually requiring the allocation of scarce resources."`, o: [
          [`True`, `Correct. This is word for word the lecture's definition of operations research: scientifically deciding how to best design and operate man-machine systems, usually allocating scarce resources (L1, What is OR).`],
          [`False`, `False would reject the exact OR definition from L1; the traps are when the same sentence is attached to LP, formulation or dynamic programming.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `True or False: "Non negativity condition refers to the method of determining a particular plan or action."`, o: [
          [`True`, `That sentence defines the word "programming".`],
          [`False`, `Correct. Non-negativity means all decision variables must be ≥ 0.`]
        ], a: 1, src: `Exam 2019/20` },
        { q: `True or False: "Operations research is the application of economical methods to arrive at the optimal solutions to the problems."`, o: [
          [`True`, `OR uses scientific (not "economical") methods; the student key marks this False ("not the definition").`],
          [`False`, `Correct. OR applies <b>scientific</b> methods; the lecture definition is "scientifically deciding how to best design and operate man-machine systems".`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `True or False: "Formulation of a linear programming problem refers to translating the real-world problem into the form of mathematical equation which could be solved."`, o: [
          [`True`, `Correct. Definition of formulation (Revision 1).`],
          [`False`, `False would reject the Revision 1 definition: formulation is translating the real-world problem into mathematical equations that can be solved.`]
        ], a: 0, src: `Exam 2022/23 January` },
        { q: `True or False: "Non-negativity restriction indicates that all decision variables must take on values equal to or greater than zero."`, o: [
          [`True`, `Correct. Definition of the non-negativity restriction.`],
          [`False`, `False would reject the lecture's definition: the non-negativity restriction means every decision variable must be ≥ 0.`]
        ], a: 0, src: `Exam 2022/23 January` },
        { q: `True or False: "Constraints are the linear inequalities on the variables of the linear programming problem."`, o: [
          [`True`, `Correct (asked in the August paper as statement 8).`],
          [`False`, `False would deny the lecture's definition: constraints are the linear inequalities on the variables of the LPP.`]
        ], a: 0, src: `Exam 2022/23 August` },
        { q: `Match: "Non-negative constraints" corresponds to which definition?`, o: [
          [`Indicates that all decision variables must take on values equal to or greater than zero`, `Correct. Column B item A in the August 2023/24 matching question.`],
          [`Is the element in the intersection of the pivot column and pivot row`, `The element at the intersection of the pivot column and pivot row is the pivot element of the simplex method (L3), not non-negativity.`],
          [`Is used to find the shortest distance between two nodes with minimal cost`, `Finding the shortest distance between two nodes at minimal cost is the shortest route problem of dynamic programming (L9).`],
          [`Is concerned with scientifically deciding how to best design and operate man machine systems`, `Scientifically deciding how to design and operate man-machine systems is the definition of operations research (L1), not of non-negativity.`]
        ], a: 0, src: `Exam 2023/24 August` },
        { q: `Osgood County runs two recycling centers. Center 1 costs $40/day and collects 140 lb glass and 60 lb aluminum; Center 2 costs $50/day and collects 100 lb glass and 180 lb aluminum. At least 1540 lb glass and 1440 lb aluminum are needed. The formulation is:`, o: [
          [`Min Z = 40x1 + 50x2; 140x1 + 100x2 ≥ 1540; 60x1 + 180x2 ≥ 1440; x1, x2 ≥ 0`, `Correct. Costs are minimized and "at least" gives ≥.`],
          [`Max Z = 40x1 + 50x2; 140x1 + 100x2 ≤ 1540; 60x1 + 180x2 ≤ 1440`, `Costs are minimized, and "at least" requirements are ≥, not ≤.`],
          [`Max Z = 1540x1 + 1440x2; 140x1 + 100x2 ≤ 40; 60x1 + 180x2 ≤ 50`, `This swaps the roles of costs and requirements (it looks like a dual, not the model).`],
          [`None of them`, `Option A is a full correct model: Min cost 40x1 + 50x2 with ≥ for the 'at least' glass and aluminum needs, so 'None' is wrong.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Universal Mines: high grade 4, 6, 1 t/day; low grade 4, 4, 6 t/day; costs 20, 22, 18 ($1000/day); deliver 54 t high and 65 t low by the end of the week; a full day's pay for any fraction of a day. The correct model is:`, o: [
          [`Min 20x1 + 22x2 + 18x3; 4x1 + 6x2 + x3 ≥ 54; 4x1 + 4x2 + 6x3 ≥ 65; x ≥ 0`, `Missing the integer condition and the 7-day limit.`],
          [`Same as A with "all variables integer"`, `Still missing x ≤ 7 (a mine cannot work more than 7 days a week).`],
          [`Min 20x1 + 22x2 + 18x3; 4x1 + 6x2 + x3 ≥ 54; 4x1 + 4x2 + 6x3 ≥ 65; 0 ≤ x1, x2, x3 ≤ 7, all integer`, `Correct. Includes both hidden constraints: at most 7 days and integer days.`],
          [`None of them`, `Option C is the full model given in the revision solution.`]
        ], a: 2, src: `Revision sheet` },
        { q: `A pet store: each hamster needs at least 70 units of protein and 100 units of carbohydrate. Feed A (20 protein, 50 carbs, $2), B (30, 30, $3), C (40, 20, $5). The formulation is:`, o: [
          [`Max Z = 2x1 + 3x2 + 5x3; 20x1 + 30x2 + 40x3 ≤ 70; 50x1 + 30x2 + 30x3 ≤ 100`, `Costs should be minimized and needs are "at least" (≥); also the carbohydrate of C is 20, not 30.`],
          [`Min Z = 2x1 + 3x2 + 5x3; 20x1 + 30x2 + 40x3 ≥ 70; 50x1 + 30x2 + 20x3 ≥ 100; x ≥ 0`, `Correct. Feed cost is minimized and 'at least 70 protein / 100 carbs' gives ≥ constraints: 20x1 + 30x2 + 40x3 ≥ 70 and 50x1 + 30x2 + 20x3 ≥ 100 (L1, Exam formulations).`],
          [`Min Z = 70x1 + 100x2; 20x1 + 50x2 ≥ 2; 30x1 + 30x2 ≥ 3; 40x1 + 20x2 ≥ 5`, `This is the dual-like form (requirements as costs); not the formulation asked.`],
          [`None of the above`, `Option B is the correct model (Min cost, ≥ for the minimum protein and carbohydrate needs), so 'None of the above' is wrong.`]
        ], a: 1, src: `Exam 2022/23 January` }
      ]
    },
    /* ───────────────────────── LECTURE 2 ───────────────────────── */
    {
      n: 2, title: `Linear Programming: Graphical Solution`,
      notes: [
        { h: `Definitions of the graphical method`, table: [
          [`Term`, `Definition`],
          [`Feasible region`, `The common region determined by all the constraints including the non-negative constraints x ≥ 0, y ≥ 0 (the set of points satisfying both the problem constraints and the non-negative constraints).`],
          [`Feasible solution`, `Every point in the feasible region.`],
          [`Optimal solution`, `Any point in the feasible region that gives the optimal value (max or min) of the objective function over the feasible region.`],
          [`Corner point`, `A point in the solution region that is the intersection of two boundary lines.`],
          [`Infeasible solutions`, `Any points outside the feasible region.`],
          [`Infeasible LP`, `An LP whose constraint region (feasible set) is empty: no point satisfies all the constraints. It usually indicates an error in the model.`],
          [`Multiple optimal solutions`, `If two corner points are both optimal, every point on the segment joining them is optimal (the only way an optimum can occur at a non-corner point).`],
          [`Unbounded solution`, `The objective function is infinite (the region is open in the direction of improvement).`]
        ]},
        { h: `Procedure: geometric method for two variables`, pts: [
          `<b>Step 1</b>: Graph the feasible region. Turn each inequality into an equation, find its two intercepts (put x1 = 0, then x2 = 0), draw the line and shade the correct side (≤ toward the origin, ≥ away from it). If an optimal solution exists, find the coordinates of each <b>corner point</b>.`,
          `<b>Step 2</b>: Construct a <b>corner point table</b> listing the value of the objective function at each corner point.`,
          `<b>Step 3</b>: Determine the optimal solution(s) from the table: <b>Max → largest Z</b>, <b>Min → smallest Z</b>.`,
          `<b>Step 4</b>: For an applied problem, <b>interpret</b> the optimal solution in terms of the original problem.`,
          `To find an intersection corner, solve the two line equations simultaneously (multiply one equation so a variable cancels, then add).`,
          `Lines like x2 = 2 are horizontal, x1 = 1 is vertical; x2 ≥ 2 means above the horizontal line, x1 ≤ 1 left of the vertical line.`
        ]},
        { h: `Example 1: Max Z = 200x1 + 175x2 (Lecture 2)`, formula: [
          `10x1 + 22x2 = 2640:  (0, 120) and (264, 0)`,
          `15x1 + 18x2 = 2500:  (0, 138.9) and (166.7, 0)`,
          `Feasible region (both ≤): corners A(0,0), B(166.7,0), C, D(0,120)`,
          `C: 15 × (10x1 + 22x2 = 2640) → 150x1 + 330x2 = 39600`,
          `  −10 × (15x1 + 18x2 = 2500) → −150x1 − 180x2 = −25000`,
          `  add: 150x2 = 14600 → x2 = 97.33, x1 = (2640 − 22 × 97.33)/10 = 49.87`,
          `Corner table:  A(0,0): Z = 0`,
          `               B(166.7, 0): Z = 200 × 166.67 = 33,333 (lecture rounds to $33,340)  ← OPTIMAL`,
          `               C(49.87, 97.33): Z ≈ 27,007 (lecture prints C(49.91, 97.3), $27,015.5)`,
          `               D(0, 120): Z = 175 × 120 = 21,000`,
          `Interpretation: make about 166.7 units of A and 0 units of B.`
        ]},
        { h: `Example 2: Jay's pastry, Max Z = 25x1 + 20x2`, formula: [
          `x1 + 2x2 = 22: (0, 11), (22, 0);   4x1 + 2x2 = 40: (0, 20), (10, 0)`,
          `C: −(x1 + 2x2 = 22) + (4x1 + 2x2 = 40) → 3x1 = 18 → x1 = 6, x2 = 8`,
          `A(0,0): 0    B(10,0): 250    C(6,8): 25(6) + 20(8) = 310 ← OPTIMAL    D(0,11): 220`,
          `Jay should make 6 cupcake orders and 8 personal cakes for $310.`
        ]},
        { h: `Example 5: Diet, Min Z = 1.20x1 + 0.80x2`, formula: [
          `2x1 + 2x2 = 16: (0, 8), (8, 0);   4x1 + x2 = 20: (0, 20), (5, 0)`,
          `Both constraints are ≥, so the feasible region is the unbounded area ABOVE both lines.`,
          `B: (2x1 + 2x2 = 16) − 2 × (4x1 + x2 = 20) → −6x1 = −24 → x1 = 4, x2 = 4`,
          `A(0,20): Z = 16    B(4,4): Z = 4.8 + 3.2 = 8 ← OPTIMAL (minimum)    C(8,0): Z = 9.6`,
          `Minimum cost $8 with 4 units of food A and 4 units of food B.`,
          `(An unbounded region is fine for a MIN problem: the minimum still occurs at a corner.)`
        ]},
        { h: `More solved graphical problems (sections and sheets)`, table: [
          [`Problem`, `Corners → Z`, `Optimum`],
          [`Max Z = 3x1 + x2; 2x1 + x2 ≤ 8; 2x1 + 3x2 ≤ 12 (Lecture 3)`, `(0,0)=0, (4,0)=12, (3,2)=11, (0,4)=4`, `(4,0), Z = 12. The slide prints "(3,2): Z = 3(2)+2 = 8", a typo: the correct value is 3(3)+2 = 11.`],
          [`Min Z = 8x1 + 10x2; 2x1 + x2 ≥ 7; 2x1 + 3x2 ≥ 15; x2 ≥ 2 (section)`, `A(0,7)=70, B(1.5,4)=52, C(4.5,2)=56`, `B(1.5, 4), Z = 52`],
          [`Max Z = 3x1 + 4x2; 2x1 + x2 ≤ 6; 2x1 + 3x2 ≤ 9; x2 ≥ 2; x1 ≤ 1 (Sheet 1, 2022/23)`, `A(0,2)=8, B(1,2)=11, C(1, 7/3)=12.33, D(0,3)=12`, `C(1, 2.33), Z = 12.33 (if x integer: (0,3), Z = 12)`],
          [`Q1 furniture: Max 120x1 + 80x2; 2x1 + x2 ≤ 6; 7x1 + 8x2 ≤ 28`, `(0,0)=0, (3,0)=360, (20/9, 14/9)=391.1, (0,3.5)=280`, `(2.22, 1.56), Z ≈ 391.11`],
          [`Paint: Max x1 + 1.5x2; 2x1 + 4x2 ≤ 12; 3x1 + 2x2 ≤ 10`, `(0,0)=0, (3.33,0)=3.33, (2,2)=5, (0,3)=4.5`, `(2, 2), Z = 5`],
          [`Fertilizer: Min 12x1 + 10x2; 2x1 + 4x2 ≥ 10; x1 + 3x2 ≥ 15; 4x1 + 5x2 ≥ 30`, `(0,6)=60, (15/7, 30/7)=68.57, (15,0)=180`, `(0, 6), Z = 60`]
        ]},
        { h: `Special cases to recognise on a graph`, pts: [
          `<b>Infeasible</b>: the shaded regions do not overlap. Example (revision Q14): Max 200x1 + 300x2 with 2x1 + 3x2 ≥ 1200, x1 + x2 ≤ 400, 2x1 + 1.5x2 ≥ 900. Inside x1 + x2 ≤ 400 the largest value of 2x1 + 1.5x2 is 2(400) = 800 < 900, so no point satisfies all constraints → <b>infeasible solution</b>.`,
          `<b>Unbounded</b>: in a MAX problem the region extends without limit in the direction that increases Z, so Z → ∞.`,
          `<b>Multiple optima</b>: the objective line is parallel to a binding constraint; two adjacent corners give the same best Z.`,
          `<b>Redundant constraint</b>: a constraint that does not touch the feasible region (removing it changes nothing).`
        ]}
      ],
      cards: [
        [`Feasible region`, `Common region determined by all constraints including the non-negative constraints.`],
        [`Feasible solution`, `Any point in the feasible region.`],
        [`Optimal solution`, `A point in the feasible region giving the optimal (max or min) value of the objective.`],
        [`Corner point`, `Intersection of two boundary lines of the solution region.`],
        [`Infeasible solutions`, `Any points outside the feasible region.`],
        [`Infeasible LP`, `An LP whose feasible set is empty.`],
        [`Unbounded solution`, `The objective function is infinite.`],
        [`Multiple optimal solutions`, `Two optimal corners; every point on the segment between them is optimal.`],
        [`Step 1 of geometric method`, `Graph the feasible region and find the corner points.`],
        [`Step 2 of geometric method`, `Build a corner-point table of Z values.`],
        [`Step 3 of geometric method`, `Pick the optimal Z (max or min) from the table.`],
        [`Step 4 of geometric method`, `Interpret the solution for the original problem.`],
        [`Graphical method limitation`, `Only useful for two decision variables and relatively few constraints.`],
        [`Example 2 optimum (Jay)`, `C(6, 8), Z = $310.`],
        [`Diet example optimum`, `B(4, 4), minimum cost Z = $8.`]
      ],
      qa: [
        [`What is the difference between feasible region, feasible solution and optimal solution?`, `Feasible region: the region determined by all the constraints including non-negativity. Feasible solution: any single point in that region. Optimal solution: a feasible point that gives the best (max or min) value of the objective function over the region.`],
        [`State the procedure of the geometric method for solving an LPP with two variables.`, `1) Graph the feasible region and, if an optimum exists, find the coordinates of each corner point. 2) Build a corner point table with Z at each corner. 3) Determine the optimal solution(s) from the table. 4) Interpret the optimal solution in terms of the original problem.`],
        [`Solve graphically: Max Z = 25x1 + 20x2 s.t. x1 + 2x2 ≤ 22, 4x1 + 2x2 ≤ 40, x ≥ 0.`, `Intercepts: (0,11),(22,0) and (0,20),(10,0). Corner C from subtracting the equations: 3x1 = 18, x1 = 6, x2 = 8. Corners: (0,0)=0, (10,0)=250, (6,8)=310, (0,11)=220. Optimum x1 = 6, x2 = 8, Z = 310.`],
        [`Solve graphically: Min Z = 1.2x1 + 0.8x2 s.t. 2x1 + 2x2 ≥ 16, 4x1 + x2 ≥ 20, x ≥ 0.`, `Region above both lines. Corners: A(0,20) Z = 16, B(4,4) Z = 8, C(8,0) Z = 9.6. Minimum Z = 8 at (4,4).`],
        [`Define infeasible LP, unbounded solution and multiple optimal solutions.`, `Infeasible LP: the feasible set is empty, no point satisfies all constraints. Unbounded: the objective can grow without limit (objective function infinite). Multiple optima: two corner points are both optimal, so every point of the segment joining them is also optimal.`]
      ],
      quiz: [
        { q: `"............ is the common region determining by all the constraints including non-negative constraints of a linear programming."`, o: [
          [`Corner point`, `A corner point is a single intersection point of two boundary lines.`],
          [`Optimal solution`, `The optimal solution is a point that gives the best objective value.`],
          [`Feasible region`, `Correct. The feasible region is the common region determined by all the constraints, including the non-negativity constraints; every point in it satisfies them all (L2, Definitions).`],
          [`Infeasible solution`, `Infeasible solutions lie outside the feasible region.`]
        ], a: 2, src: `Revision sheet` },
        { q: `True or False: "Feasible region is the common region determined by all the constraints including non-negativity constraints."`, o: [
          [`True`, `Correct. This is the Revision 1 definition: the feasible region is the common region of all constraints including x ≥ 0 (L2, Definitions).`],
          [`False`, `False would reject the definition word for word; the region that all constraints (and x ≥ 0) share is exactly the feasible region.`]
        ], a: 0, src: `Exam 2019/20` },
        { q: `True or False: "Unbounded solution means that the objective function is infinite."`, o: [
          [`True`, `Correct. Revision 1 defines an unbounded solution as one where the objective function is infinite: in a MAX problem the region extends forever in the improving direction (L2, Special cases).`],
          [`False`, `False would reject Revision 1's definition: an unbounded solution means Z can grow without limit, i.e. the objective is infinite.`]
        ], a: 0, src: `Exam 2019/20` },
        { q: `True or False: "Unbounded solutions are any points outside the feasible region."`, o: [
          [`True`, `Points outside the feasible region are infeasible solutions.`],
          [`False`, `Correct. Points outside the region are <b>infeasible</b> solutions; unbounded means the objective is infinite.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `Match: "Infeasible solutions" ...`, o: [
          [`are any points outside the feasible region`, `Correct. Infeasible solutions are any points outside the feasible region: they violate at least one constraint (L2, Definitions; 2023/24 matching 1 → D).`],
          [`is the linear programming problem by omitting all integer or 0-1 constraints`, `Dropping all integer or 0-1 constraints from an IP gives the LP relaxation (L6, Branch and Bound), not infeasible solutions.`],
          [`must be completed immediately prior to start of another activity`, `An activity that must be completed immediately before another starts is a predecessor activity (L7, CPM network terms).`],
          [`cannot be started until one of other activities is completed`, `An activity that cannot start until another is completed is a successor activity (L7, CPM network terms), not an infeasible point.`]
        ], a: 0, src: `Exam 2023/24 (3rd year)` },
        { q: `Match: "Feasible region" ...`, o: [
          [`the common region determining by all the constraints including non-negative constraints`, `Correct. The feasible region is the common region determined by all the constraints including the non-negative constraints (L2, Definitions; 2023/24 matching 1 → C).`],
          [`an integer programming in which only some of the variables are required to be integers`, `An integer program where only some variables must be integers is a mixed integer program (L6), not the feasible region.`],
          [`the initial allocation is made to the cell with the lowest cost`, `Allocating first to the lowest-cost cell is the least (minimum) cost method of the transportation problem (L4).`],
          [`is the amount of time that the completion time of an activity can be delayed without affecting the project completion`, `The time an activity can be delayed without delaying the project is the total float (L7, CPM), not the feasible region.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `For Max Z = 200x1 + 300x2 subject to 2x1 + 3x2 ≥ 1200, x1 + x2 ≤ 400, 2x1 + 1.5x2 ≥ 900, x1, x2 ≥ 0, the feasible region is:`, o: [
          [`The triangle between the three lines (graph A)`, `No point satisfies all three: with x1 + x2 ≤ 400, 2x1 + 1.5x2 can be at most 800 < 900.`],
          [`The region above 2x1 + 3x2 = 1200 only (graph B)`, `Shading only above 2x1 + 3x2 = 1200 ignores x1 + x2 ≤ 400 and 2x1 + 1.5x2 ≥ 900; the region must satisfy all three, and none does.`],
          [`Infeasible solution`, `Correct. The constraints have no common region, so the LP is infeasible.`],
          [`None of them`, `'None' is wrong because 'Infeasible solution' fits exactly: inside x1 + x2 ≤ 400, 2x1 + 1.5x2 ≤ 800 < 900, so no common region exists.`]
        ], a: 2, src: `Revision sheet` },
        { q: `In Lecture 2 Example 1 (Max Z = 200x1 + 175x2; 10x1 + 22x2 ≤ 2640; 15x1 + 18x2 ≤ 2500), the optimal corner is:`, o: [
          [`A(0, 0)`, `The origin gives Z = 200(0) + 175(0) = 0, the smallest corner value; for a MAX problem we need the largest, which is at B.`],
          [`B(166.7, 0)`, `Correct. Z ≈ 33,333, the largest corner value.`],
          [`C(49.9, 97.3)`, `C(49.87, 97.33) gives Z = 200(49.87) + 175(97.33) ≈ 27,007, less than 33,333 at B, so C is not optimal.`],
          [`D(0, 120)`, `D(0, 120) gives Z = 175 × 120 = 21,000, the lowest non-zero corner; B(166.7, 0) with 33,333 is the maximum.`]
        ], a: 1, src: `Lecture 2 example` },
        { q: `In the diet problem (Min Z = 1.2x1 + 0.8x2; 2x1 + 2x2 ≥ 16; 4x1 + x2 ≥ 20), the minimum cost is:`, o: [
          [`$16 at (0, 20)`, `Z(0, 20) = 0.8 × 20 = $16, the largest corner value; a MIN problem picks the smallest, $8 at (4, 4).`],
          [`$9.6 at (8, 0)`, `Z(8, 0) = 1.2 × 8 = $9.6, a feasible corner but more than $8 at (4, 4), so it is not the minimum.`],
          [`$8 at (4, 4)`, `Correct. Corner B solves 2x1 + 2x2 = 16 and 4x1 + x2 = 20, giving (4, 4); Z = 1.2(4) + 0.8(4) = 8, the smallest of 16, 8, 9.6 (L2, Example 5).`],
          [`$0 at (0, 0)`, `(0, 0) is not feasible: 2(0) + 2(0) = 0 < 16 violates the ≥ constraints, so $0 cannot be achieved.`]
        ], a: 2, src: `Lecture 2 example` },
        { q: `For a MAXIMIZATION problem, after building the corner point table you choose:`, o: [
          [`The corner with the smallest Z`, `The smallest Z is chosen in a MINIMIZATION problem; Step 3 of the graphical method says Max → largest Z (L2).`],
          [`The corner with the largest Z`, `Correct. Step 3 of the graphical method: from the corner point table, Max → the largest Z, Min → the smallest Z (L2, Procedure).`],
          [`The origin always`, `The origin is often a corner but rarely optimal for max.`],
          [`Any point inside the region`, `Interior points are never strictly better than corners: if an optimum exists, it occurs at a corner point, which is why only corners are tabulated.`]
        ], a: 1 },
        { q: `The corner C of x1 + 2x2 = 22 and 4x1 + 2x2 = 40 is:`, o: [
          [`(6, 8)`, `Correct. Subtracting gives 3x1 = 18, so x1 = 6 and x2 = 8.`],
          [`(8, 6)`, `(8, 6) swaps the coordinates: 8 + 2(6) = 20 ≠ 22. Solving gives 3x1 = 18, x1 = 6, x2 = 8.`],
          [`(10, 0)`, `(10, 0) is only the x1-intercept of 4x1 + 2x2 = 40 (corner B); it is not on x1 + 2x2 = 22.`],
          [`(0, 11)`, `(0, 11) is only the x2-intercept of x1 + 2x2 = 22 (corner D); it is not on 4x1 + 2x2 = 40.`]
        ], a: 0, src: `Lecture 2 example` },
        { q: `Lecture 3's graphical slide lists the corner (3, 2) with "Z = 3(2) + 2 = 8" for Z = 3x1 + x2. The correct value at (3, 2) is:`, o: [
          [`8`, `8 is the slide's slip: it substituted x1 = 2 instead of 3, i.e. 3(2) + 2. The correct value is 3(3) + 2 = 11.`],
          [`9`, `9 comes from swapping the coordinates, 3(2) + 3; at (3, 2), Z = 3(3) + 2 = 11.`],
          [`11`, `Correct. 3(3) + 2 = 11, still less than 12 at (4, 0), so the optimum is unchanged.`],
          [`12`, `12 is the value at the other corner (4, 0): 3(4) + 0 = 12. At (3, 2) the value is 11.`]
        ], a: 2, src: `Lecture 3 example` }
      ]
    },
    /* ───────────────────────── LECTURE 3 ───────────────────────── */
    {
      n: 3, title: `Linear Programming: Simplex Method`,
      notes: [
        { h: `Why the simplex method? Key definitions`, table: [
          [`Term`, `Meaning`],
          [`Simplex method`, `A method that proceeds from one basic feasible solution to another in such a way as to continually increase (or decrease) the value of the objective function until optimality is reached. It is most useful with <b>more decision variables and more constraints</b> (the graphical method only handles two variables and few constraints).`],
          [`Slack variable`, `A non-negative variable added to a ≤ constraint to turn it into an equation: 2x1 + x2 ≤ 8 becomes 2x1 + x2 + s1 = 8. It measures unused resource.`],
          [`Basic variables`, `The variables listed in the first column of the tableau (initially the slacks); their values are read from the RHS column.`],
          [`Non-basic variables`, `All other variables, set equal to 0 (initially the decision variables x1, x2).`],
          [`Pivot column`, `The column with the most negative entry in the bottom (Z) row, excluding the RHS. Its variable is the <b>entering</b> variable.`],
          [`Pivot row`, `The row with the smallest positive ratio RHS ÷ (positive entry of the pivot column). Its basic variable is the <b>exiting</b> variable.`],
          [`Pivot (pivot element)`, `The element in the intersection of the pivot column and pivot row. It must be positive (never zero or negative).`]
        ]},
        { h: `Simplex procedure (max problem, all ≤ constraints)`, pts: [
          `<b>Step 1</b>: Convert the inequalities to equations using slack variables, and write the objective as Z − c1x1 − c2x2 − ... = 0.`,
          `<b>Step 2</b>: Create the initial simplex tableau and label the basic variables (the slacks and Z).`,
          `<b>Step 3</b>: Select the <b>pivot column</b>: the most negative number in the bottom row (excluding the last column). Ties: choose either.`,
          `<b>Step 4</b>: Select the <b>pivot row</b>: divide each RHS by the corresponding <b>positive</b> entry in the pivot column; the <b>smallest positive ratio</b> wins. Ties: choose either. If no entry in the pivot column is positive, the program has <b>no (bounded) solution</b>. The Z row never gets a ratio.`,
          `<b>Step 5</b>: The pivot element is at their intersection (must be positive).`,
          `<b>Step 6</b>: Use elementary row operations: divide the pivot row by the pivot so the pivot becomes 1, then make every other entry of the pivot column 0. The entering variable replaces the exiting variable in the basis column.`,
          `<b>Step 7</b>: Repeat until there are <b>no negative numbers in the bottom row</b> (excluding the last column). Then read the solution: basic variables = RHS, non-basic = 0, Z = bottom-right entry.`,
          `Effects of one pivot: the entering non-basic variable becomes basic, the exiting basic variable becomes non-basic, and Z increases (or in some cases stays the same).`
        ]},
        { h: `Row operation formulas (lecture way and section shortcut)`, formula: [
          `New pivot row = old pivot row ÷ pivot element`,
          `New other row = old row − (its entry in the pivot column) × (new pivot row)`,
          `Section shortcut for any element not in the pivot row/column:`,
          `   new element = old element − (corresponding element in pivot row × corresponding element in pivot column) ÷ pivot element`,
          `A column whose entry in the pivot row is 0 is copied unchanged (section tip).`
        ]},
        { h: `Lecture example: Max Z = 3x1 + x2, 2x1 + x2 ≤ 8, 2x1 + 3x2 ≤ 12 (initial tableau)`, table: [
          [`Basic`, `x1`, `x2`, `s1`, `s2`, `b`, `Ratio`],
          [`s1`, `<b>2</b>`, `1`, `1`, `0`, `8`, `8/2 = 4 ← pivot row`],
          [`s2`, `2`, `3`, `0`, `1`, `12`, `12/2 = 6`],
          [`Z`, `−3`, `−1`, `0`, `0`, `0`, `pivot column = x1 (−3)`]
        ]},
        { h: `Lecture example after one pivot (optimal)`, table: [
          [`Basic`, `x1`, `x2`, `s1`, `s2`, `b`],
          [`x1`, `1`, `0.5`, `0.5`, `0`, `4`],
          [`s2`, `0`, `2`, `−1`, `1`, `4`],
          [`Z`, `0`, `0.5`, `1.5`, `0`, `12`]
        ]},
        { h: `Working of the lecture pivot`, formula: [
          `R1 ÷ 2:          (2, 1, 1, 0 | 8) → (1, 1/2, 1/2, 0 | 4)`,
          `R2 − 2·R1(new):  (2, 3, 0, 1 | 12) − (2, 1, 1, 0 | 8) = (0, 2, −1, 1 | 4)`,
          `Z + 3·R1(new):   (−3, −1, 0, 0 | 0) + (3, 3/2, 3/2, 0 | 12) = (0, 1/2, 3/2, 0 | 12)`,
          `No negatives in the Z row → optimal: x1 = 4, x2 = 0, s2 = 4, Z = 12 (same as the graph).`
        ]},
        { h: `Revision example: Max Z = 8x1 + 5x2, x1 + 4x2 ≤ 4, 3x1 + 5x2 ≤ 24`, table: [
          [`Tableau`, `Basic`, `x1`, `x2`, `s1`, `s2`, `b`],
          [`Initial`, `s1`, `<b>1</b>`, `4`, `1`, `0`, `4 (ratio 4)`],
          [`Initial`, `s2`, `3`, `5`, `0`, `1`, `24 (ratio 8)`],
          [`Initial`, `Z`, `−8`, `−5`, `0`, `0`, `0`],
          [`After pivot`, `x1`, `1`, `4`, `1`, `0`, `4`],
          [`After pivot`, `s2`, `0`, `−7`, `−3`, `1`, `12`],
          [`After pivot`, `Z`, `0`, `27`, `8`, `0`, `32`]
        ]},
        { h: `Revision example: answers to the MCQs`, pts: [
          `Pivot column x1 (most negative −8); ratios 4/1 = 4 and 24/3 = 8 → pivot row s1; <b>pivot element = 1</b>; entering x1, exiting s1.`,
          `After one pivot: x1 = 4, s2 = 12, Z = 32. All Z-row entries are ≥ 0, so this is optimal: Z = 32 at x1 = 4, x2 = 0.`,
          `Section shortcut check: x2 in row s2 = 5 − (4 × 3)/1 = −7; RHS of s2 = 24 − (4 × 3)/1 = 12; Z under x2 = −5 − (4 × (−8))/1 = 27.`
        ]},
        { h: `Exam tableau results (verified)`, table: [
          [`Paper`, `Pivot`, `Rows after one pivot`],
          [`2025/26: s1 (5, 2 | 20), s2 (4, 7 | 28), Z (−7, −6 | 0)`, `col x1, ratios 4 and 7, pivot 5`, `x1: 1, 0.4, 0.2, 0 | 4; s2: 0, 5.4, −0.8, 1 | 12; Z: 0, −3.2, 1.4, 0 | 28 (not yet optimal)`],
          [`2024/25: s1 (3, 6 | 12), s2 (2, 9 | 18), Z (−12, −7 | 0)`, `col x1, ratios 4 and 9, pivot 3`, `x1: 1, 2, 1/3, 0 | 4; s2: 0, 5, −2/3, 1 | 10; Z: 0, 17, 4, 0 | 48 (optimal)`],
          [`2023/24 Aug: x1 (1, 1/2, 1/2, 0 | 3), s2 (0, 3/2, −5/2, 1 | 5), Z (0, −20, 60, 0 | 360)`, `col x2, ratios 6 and 3.33, pivot 3/2`, `x1: 1, 0, 1.33, −0.33 | 1.33; x2: 0, 1, −1.67, 0.67 | 3.33; Z: 0, 0, 26.7, 13.3 | 426.7`],
          [`2023/24 (3rd yr): x1 col 4/5, 7/5, 1/5, Z −22/5`, `col x1, ratios 3.75, 2.86, 35, pivot 7/5`, `s1: 0,0,1,−4/7,1/7 | 5/7; x1: 1,0,0,5/7,−3/7 | 20/7; x2: 0,1,0,−1/7,2/7 | 45/7; Z: 0,0,0,22/7,−2/7 | 480/7`],
          [`2023/24 (2nd yr): x2 col 5/2, 1/2, 1, Z −3/2`, `col x2, ratios 20, 60, 160, pivot 5/2`, `x2: 0,1,2/5,−1/3,0 | 20; x1: 1,0,−1/5,1/3,0 | 20; s3: 0,0,−2/5,−1,1 | 140; Z: 0,0,3/5,1/3,0 | 180`],
          [`2022/23 Jan: s1 (1,1|20), s2 (2,1|35), s3 (−3,1|12), Z (−5,−4)`, `col x1, ratios 20, 17.5, (−3 skipped), pivot 2`, `s1: 0, 0.5, 1, −0.5, 0 | 2.5; x1: 1, 0.5, 0, 0.5, 0 | 17.5; s3: 0, 2.5, 0, 1.5, 1 | 64.5; Z: 0, −1.5, 0, 2.5, 0 | 87.5`]
        ]},
        { h: `Duality (asked once, Final 2021/22)`, pts: [
          `Every LP (the <b>primal</b>) has a <b>dual</b>. For a MAX primal in canonical form (all ≤): the dual is a MIN problem; each primal constraint gives one dual variable yi; the RHS values become the dual objective coefficients; the objective coefficients become the dual RHS; the coefficient matrix is transposed; dual constraints are ≥.`,
          `Sign rules (max primal): a ≤ constraint → yi ≥ 0; a ≥ constraint → yi ≤ 0 (or multiply it by −1 first); an = constraint → yi <b>unrestricted</b> in sign. A primal variable xj ≥ 0 → the j-th dual constraint is ≥.`,
          `At the optimum, primal Z = dual W (strong duality). This topic is not in the 2024 slides; it is standard textbook material.`
        ]}
      ],
      cards: [
        [`Simplex method (definition)`, `Proceeds from one basic feasible solution to another, continually increasing (or decreasing) Z until optimality is reached.`],
        [`When is simplex preferred to graphs?`, `With more decision variables and more problem constraints.`],
        [`Slack variable`, `Added to a ≤ constraint to make it an equation; represents unused resource.`],
        [`Pivot column`, `Most negative entry in the bottom (Z) row, excluding the RHS.`],
        [`Pivot row`, `Smallest positive ratio RHS ÷ positive pivot-column entry.`],
        [`Pivot element`, `Intersection of the pivot column and pivot row; must be positive.`],
        [`Entering variable`, `The variable of the pivot column.`],
        [`Exiting variable`, `The basic variable of the pivot row.`],
        [`Stopping rule`, `No negative numbers in the bottom row (excluding the last column).`],
        [`No positive entry in the pivot column`, `The program has no (bounded) solution.`],
        [`Initial basic variables`, `The slack variables (decision variables start non-basic = 0).`],
        [`Effect of a pivot on Z`, `Z increases or, in some cases, remains the same.`],
        [`Section shortcut formula`, `new = old − (pivot-row element × pivot-column element) ÷ pivot.`],
        [`Objective row form`, `Z − 3x1 − x2 = 0 for Max Z = 3x1 + x2 (coefficients become negative).`],
        [`Dual variable of an "=" constraint`, `Unrestricted in sign.`],
        [`Lecture simplex answer (3x1 + x2)`, `Z = 12 at x1 = 4, x2 = 0 after one pivot.`]
      ],
      qa: [
        [`Define the simplex method and state when it is used instead of the graphical method.`, `The simplex method proceeds from one basic feasible solution to another so as to continually increase (or decrease) the objective function until optimality is reached. It is used when there are more decision variables and more constraints; the graphical method works only for two variables and few constraints.`],
        [`Define slack variables, basic and non-basic variables.`, `Slack variable: a non-negative variable added to a ≤ constraint to make it an equation (unused resource). Basic variables: those in the basis column of the tableau, valued by the RHS. Non-basic variables: all the rest, set to zero.`],
        [`Define pivot column, pivot row and pivot element, and how each is chosen.`, `Pivot column: column of the most negative entry in the bottom row (entering variable). Pivot row: row with the smallest positive ratio RHS ÷ positive entry of the pivot column (exiting variable). Pivot element: their intersection; it must be positive and is made 1 by row operations.`],
        [`Summarize the simplex procedure.`, `I) Locate the most negative number in the bottom row (excluding last column): pivot column. II) Form ratios RHS ÷ positive pivot-column entries; the smallest gives the pivot; if none positive, no solution. III) Use row operations to make the pivot 1 and all other pivot-column entries 0. IV) Repeat until no negative numbers remain in the bottom row.`],
        [`Solve by simplex: Max Z = 3x1 + x2, 2x1 + x2 ≤ 8, 2x1 + 3x2 ≤ 12.`, `Equations: 2x1 + x2 + s1 = 8, 2x1 + 3x2 + s2 = 12, Z − 3x1 − x2 = 0. Pivot column x1 (−3); ratios 4 and 6 → pivot 2 in row s1. New x1 row (1, 1/2, 1/2, 0 | 4); s2 row (0, 2, −1, 1 | 4); Z row (0, 1/2, 3/2, 0 | 12). No negatives → optimal Z = 12 at x1 = 4, x2 = 0.`],
        [`What are the effects of performing a pivot operation?`, `The entering non-basic variable becomes basic, the exiting basic variable becomes non-basic, and the value of the objective function increases or, in some cases, remains the same.`],
        [`Find the dual of Max Z = 12x1 + 4x2 s.t. 4x1 + 7x2 ≤ 56, 2x1 + 5x2 ≥ 20, 5x1 + 4x2 = 40, x ≥ 0. (Final 2021/22)`, `Write the ≥ constraint as −2x1 − 5x2 ≤ −20. Dual variables y1 ≥ 0, y2 ≥ 0, y3 unrestricted (equality). Min W = 56y1 − 20y2 + 40y3 s.t. 4y1 − 2y2 + 5y3 ≥ 12, 7y1 − 5y2 + 4y3 ≥ 4. Check: both optima equal 1520/17 ≈ 89.41.`]
      ],
      quiz: [
        { q: `"............ is most useful when used with more decision variables and more problem constraints."`, o: [
          [`Graphical method`, `The graphical method is limited to two variables and few constraints.`],
          [`Simplex method`, `Correct. The simplex method is an algebraic, iterative procedure, so it handles many decision variables and constraints, where the graphical method is limited to two variables (L3, Simplex method).`],
          [`An activity`, `An activity is a project-scheduling term (a task that takes time and resources in a CPM/PERT network, L7), not a solution method.`],
          [`Northwest corner method`, `The northwest corner method only finds a starting allocation for a transportation problem (L4); it is not a general LP method.`]
        ], a: 1, src: `Revision sheet` },
        { q: `"The ............ is at the intersection of the pivot column and pivot row."`, o: [
          [`pivot operation`, `The pivot operation is the row-operation process.`],
          [`pivot element`, `Correct. Definition of the pivot (pivot element).`],
          [`pivot solution`, `'Pivot solution' is not a term in the lecture; the number where the pivot column and pivot row cross is the pivot (pivot element).`],
          [`exiting variable`, `The exiting variable is the basic variable of the pivot row.`]
        ], a: 1, src: `Revision sheet` },
        { q: `True or False: "The pivot operation is at the intersection of the pivot column and pivot row."`, o: [
          [`True`, `It is the pivot <b>element</b>, not the pivot operation.`],
          [`False`, `Correct. The pivot element lies at the intersection; the pivot operation is the row-reduction process.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `True or False: "The exiting variable is at the intersection of the pivot column and pivot row."`, o: [
          [`True`, `The exiting variable is the basic variable of the pivot row.`],
          [`False`, `Correct. The <b>pivot element</b> is at the intersection.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `True or False: "The simplex method is concerned with shipping a commodity between a set of sources and a set of destinations."`, o: [
          [`True`, `Shipping a commodity from sources to destinations is the definition of the transportation problem (L4), not of the simplex method.`],
          [`False`, `Correct. Shipping between sources and destinations defines the transportation problem.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `True or False: "Simplex method is a mathematical technique dealing with the optimization of multistage decision problem."`, o: [
          [`True`, `Optimizing a multistage decision problem is the definition of dynamic programming (L9); simplex moves between basic feasible solutions of an LP.`],
          [`False`, `Correct. Multistage decision optimization = dynamic programming.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Match: "Simplex method" ...`, o: [
          [`is a method that proceeds from one basic feasible solution in such a way as to continually increase (or decrease) the objective function until optimality is reached`, `Correct. Simplex proceeds from one basic feasible solution to another so that Z keeps increasing (or decreasing) until optimality is reached (L3, Definitions; 2023/24 matching 2 → F).`],
          [`the initial allocation is made to the cell in the upper left-hand corner`, `Starting the allocation in the upper left-hand cell is the northwest corner method of the transportation problem (L4).`],
          [`are any points outside the feasible region`, `Points outside the feasible region are infeasible solutions (L2, graphical method), not the simplex method.`],
          [`is the linear programming problem by omitting all integer constraints`, `Omitting all integer constraints from an IP gives the LP relaxation (L6, Branch and Bound), not the simplex method.`]
        ], a: 0, src: `Exam 2023/24 (3rd year)` },
        { q: `Tableau: s1 (1, 4, 1, 0 | 4), s2 (3, 5, 0, 1 | 24), Z (−8, −5, 0, 0 | 0). The pivot element is:`, o: [
          [`1`, `Correct. Pivot column x1 (−8); ratios 4/1 = 4 and 24/3 = 8, so row s1.`],
          [`3`, `3 sits in the pivot column but in row s2, whose ratio 24/3 = 8 is larger than 4/1 = 4; the smallest ratio picks row s1.`],
          [`4`, `4 is in the x2 column, which is not the pivot column.`],
          [`None of them`, `A pivot exists: column x1 (most negative −8), smallest ratio 4/1 in row s1, so the pivot element is 1.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Same tableau (s1: 1, 4, 1, 0 | 4; s2: 3, 5, 0, 1 | 24; Z: −8, −5). The entering variable is:`, o: [
          [`x1`, `Correct. Most negative Z-row entry −8 is under x1.`],
          [`x2`, `x2 has −5 in the Z row, which is less negative than −8; the entering variable takes the MOST negative Z entry, which is x1.`],
          [`s1`, `s1 is currently basic and leaves the basis (smallest ratio 4); the entering variable comes from the Z row, i.e. x1.`],
          [`None of them`, `There is a negative entry (−8 under x1), so the tableau is not optimal and x1 enters; 'None' is wrong.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Same tableau. The exiting variable is:`, o: [
          [`x1`, `x1 is the ENTERING variable (most negative Z entry −8); the exiting variable is the basic variable of the pivot row.`],
          [`x2`, `x2 is non-basic (value 0, not in the basis column), so it cannot leave; only a basic variable can exit.`],
          [`s1`, `Correct. The exiting variable is the basic variable of the pivot row: ratios 4/1 = 4 (s1) and 24/3 = 8 (s2), the smallest is row s1, so s1 leaves (L3, Step II).`],
          [`None of them`, `Row s1 wins the ratio test (4 &lt; 8), so s1 exits; 'None' is wrong.`]
        ], a: 2, src: `Revision sheet` },
        { q: `Same tableau. After one pivot operation, the value of s2 is:`, o: [
          [`4`, `4 is the new value of x1 (row s1 ÷ pivot 1); s2 is updated by s2 − 3 × new x1 row: 24 − 12 = 12.`],
          [`0`, `s2 does not leave the basis (s1 does), so it stays basic with 24 − 3 × 4 = 12, not 0.`],
          [`12`, `Correct. New x1 row = row s1 ÷ 1 = (1, 4, 1, 0 | 4); new s2 = old s2 − 3 × new x1 row, so its RHS is 24 − 3 × 4 = 12 (L3, pivot operation).`],
          [`None of them`, `The row operation gives s2 = 24 − 3 × 4 = 12, which is listed, so 'None' is wrong.`]
        ], a: 2, src: `Revision sheet` },
        { q: `Same tableau. After one pivot operation, the value of Z is:`, o: [
          [`4`, `4 is the new value of x1, not Z; Z is updated by Z + 8 × new x1 row: 0 + 8 × 4 = 32.`],
          [`32`, `Correct. New Z row = old Z + 8 × (1, 4, 1, 0 | 4) = (0, 27, 8, 0 | 32); no negatives remain, so Z = 32 is optimal (L3, pivot operation).`],
          [`12`, `12 is the new value of s2 (24 − 3 × 4); Z's RHS becomes 0 + 8 × 4 = 32.`],
          [`None of them`, `The pivot gives Z = 0 + 8 × 4 = 32, which is option B, so 'None' is wrong.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Tableau: s1 (1, 1, 1, 0, 0 | 20), s2 (2, 1, 0, 1, 0 | 35), s3 (−3, 1, 0, 0, 1 | 12), Z (−5, −4, 0, 0, 0 | 0). The pivot element is:`, o: [
          [`1`, `1 is in row s1, whose ratio 20/1 = 20 is larger than 35/2 = 17.5; the smallest ratio picks row s2 and pivot 2.`],
          [`2`, `Correct. Pivot column x1; ratios 20/1 = 20, 35/2 = 17.5, and −3 is skipped. Smallest is row s2.`],
          [`−3`, `−3 is negative, and the ratio test uses only positive entries of the pivot column, so −3 can never be a pivot.`],
          [`None of the above`, `A valid pivot exists: column x1 (−5), smallest positive ratio 35/2 = 17.5 in row s2, so the pivot is 2.`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `Same tableau (2022/23). After one pivot operation, the fourth (Z) row is:`, o: [
          [`0, −1.5, 0, 2.5, 0 | 87.5`, `Correct. Z + 5 × new row (1, 0.5, 0, 0.5, 0 | 17.5).`],
          [`0, −5.7, 0, 0, −1.6 | −20`, `This is not produced by any valid row operation here.`],
          [`0, 1, 5, 0, 0 | 100`, `(0, 1, 5, 0, 0 | 100) is Z + 5 × (1, 1, 1, 0, 0 | 20), i.e. pivoting on row s1, but s2 has the smaller ratio (17.5 &lt; 20).`],
          [`None of the above`, `Option A, Z + 5 × (1, 0.5, 0, 0.5, 0 | 17.5) = (0, −1.5, 0, 2.5, 0 | 87.5), is the correct row, so 'None' is wrong.`]
        ], a: 0, src: `Exam 2022/23 January` },
        { q: `Same tableau (2022/23). After one pivot operation, the third (s3) row is:`, o: [
          [`−1, 0.33, 0, 0, 0.33 | 4`, `This is row s3 divided by +3. After the pivot, every non-pivot row must have 0 in the pivot column x1; this row still has −1 there.`],
          [`−3, 1, 0, 0, 0 | 0`, `This row keeps −3 under x1, but after pivoting every non-pivot row must have 0 in the pivot column; s3 + 3 × new pivot row gives 0.`],
          [`1, −0.33, 0, 0, −0.33 | −4`, `This is row s3 divided by −3, which is not a pivot step (only the pivot row is divided); it also leaves 1 under x1 instead of 0.`],
          [`None of the above`, `Correct. s3 + 3 × new pivot row = (0, 2.5, 0, 1.5, 1 | 64.5), which is not listed.`]
        ], a: 3, src: `Exam 2022/23 January` },
        { q: `Same tableau (2022/23). After one pivot operation, the second row is:`, o: [
          [`0, 1.7, 0, 1, 0.7 | 43`, `The new pivot row must have 1 under the entering variable x1 (it is row s2 ÷ 2); this row has 0 there, so it is not row 2.`],
          [`2, 1, 0, 1, 0 | 35`, `This is the old row s2 unchanged; the pivot row must be divided by the pivot 2 so that x1 gets coefficient 1.`],
          [`1, 0.5, 0, 0.5, 0 | 17.5`, `Correct. The pivot row is divided by the pivot: (2, 1, 0, 1, 0 | 35) ÷ 2 = (1, 0.5, 0, 0.5, 0 | 17.5), and x1 replaces s2 as the basic variable (L3, Step III).`],
          [`None of the above`, `Option C, row s2 ÷ 2 = (1, 0.5, 0, 0.5, 0 | 17.5), is the correct new row, so 'None' is wrong.`]
        ], a: 2, src: `Exam 2022/23 January` },
        { q: `True or False (2023/24): For the tableau s1 (4/5, 0, 1, 0, −1/5 | 3), s2 (7/5, 0, 0, 1, −3/5 | 4), x2 (1/5, 1, 0, 0, 1/5 | 7), Z (−22/5, 0, 0, 0, 8/5 | 56), "the pivot element is 1/5".`, o: [
          [`True`, `Ratio 7 ÷ (1/5) = 35 is the largest, not the smallest.`],
          [`False`, `Correct. Pivot column x1; ratios 3.75, 2.86, 35 → pivot element 7/5 in row s2.`]
        ], a: 1, src: `Exam 2023/24 (3rd year)` },
        { q: `Same 2023/24 tableau. "After one pivot operation, the second row will be: s2 | 1, 0, 0, 5/7, −3/7 | 20/7".`, o: [
          [`True`, `The numbers are right but the basic variable is wrong.`],
          [`False`, `Correct (as in the student key). The numbers are the new pivot row, but x1 has entered and s2 has left, so the row must be labelled x1, not s2.`]
        ], a: 1, src: `Exam 2023/24 (3rd year)` },
        { q: `Same 2023/24 tableau. "After one pivot operation, the fourth row will be: Z | 0, 22, 0, 0, 7 | 62.16".`, o: [
          [`True`, `Pivot is 7/5 (row s2); new row (1, 0, 0, 5/7, −3/7 | 20/7). Z + (22/5) × that row = (0, 0, 0, 22/7, −2/7 | 480/7 ≈ 68.57), not the stated row.`],
          [`False`, `Correct. The new Z row is (0, 0, 0, 22/7, −2/7 | 480/7 ≈ 68.57).`]
        ], a: 1, src: `Exam 2023/24 (3rd year)` },
        { q: `2023/24 (2nd year) tableau: s1 (0, 5/2, 1, −5/6, 0 | 50), x1 (1, 1/2, 0, 1/6, 0 | 30), s3 (0, 1, 0, −4/3, 1 | 160), Z (0, −3/2, 0, 5/6, 0 | 150). "The pivot element is 1/2."`, o: [
          [`True`, `1/2 is in the pivot column x2, but its row gives 30 ÷ 1/2 = 60, larger than 50 ÷ 5/2 = 20; the pivot is 5/2 in row s1.`],
          [`False`, `Correct. Pivot column x2; ratios 50 ÷ 5/2 = 20, 30 ÷ 1/2 = 60, 160 ÷ 1 = 160 → pivot 5/2 in row s1.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `Same 2023/24 (2nd year) tableau. "After one pivot operation, the third row will be: s3 | 0, 0, −2/5, −1, 1 | 140".`, o: [
          [`True`, `Correct. New x2 row = (0, 1, 2/5, −1/3, 0 | 20); s3 − 1 × that row = (0, 0, −2/5, −1, 1 | 140).`],
          [`False`, `False is wrong: new x2 row = s1 ÷ 5/2 = (0, 1, 2/5, −1/3, 0 | 20), and s3 − 1 × that row is exactly (0, 0, −2/5, −1, 1 | 140).`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `Same 2023/24 (2nd year) tableau. "After one pivot operation, the fourth row will be: Z | 0, 0, 3/5, 1/3, 0 | 180".`, o: [
          [`True`, `Correct. Z + (3/2) × (0, 1, 2/5, −1/3, 0 | 20) = (0, 0, 3/5, 1/3, 0 | 180), which is optimal.`],
          [`False`, `False is wrong: Z + (3/2) × (0, 1, 2/5, −1/3, 0 | 20) gives (0, 0, 3/5, 1/3, 0 | 150 + 30 = 180), exactly the stated row.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `Same 2023/24 (2nd year) tableau. "After one pivot operation, the first row will be: s1 | −5, 0, 1, −5/3, 0 | 25/2".`, o: [
          [`True`, `Row 1 is the pivot row; it becomes x2 (0, 1, 2/5, −1/3, 0 | 20).`],
          [`False`, `Correct. The first row becomes x2 | 0, 1, 2/5, −1/3, 0 | 20.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `August 2023/24 tableau: x1 (1, 1/2, 1/2, 0 | 3), s2 (0, 3/2, −5/2, 1 | 5), Z (0, −20, 60, 0 | 360). "The pivot element is −20."`, o: [
          [`True`, `−20 is in the Z row; a pivot is never in the Z row and never negative.`],
          [`False`, `Correct. Pivot column x2; ratios 3 ÷ 1/2 = 6, 5 ÷ 3/2 = 3.33 → pivot 3/2.`]
        ], a: 1, src: `Exam 2023/24 August` },
        { q: `Same August tableau. "After one pivot, the second row will be: x2 | 0, 1, −1.67, 0.67 | 3.33".`, o: [
          [`True`, `Correct. Row s2 ÷ 3/2 = (0, 1, −5/3, 2/3 | 10/3), labelled x2.`],
          [`False`, `False is wrong: the pivot is 3/2 (ratio 5 ÷ 3/2 = 3.33 &lt; 3 ÷ 1/2 = 6), and s2 ÷ 3/2 = (0, 1, −5/3, 2/3 | 10/3) = (0, 1, −1.67, 0.67 | 3.33).`]
        ], a: 0, src: `Exam 2023/24 August` },
        { q: `Same August tableau. "After one pivot, the Z row will be: Z | 0, 0, 26.7, 13.3 | 426.7".`, o: [
          [`True`, `Correct. Z + 20 × new x2 row = (0, 0, 80/3, 40/3 | 1280/3).`],
          [`False`, `False is wrong: Z + 20 × (0, 1, −5/3, 2/3 | 10/3) = (0, 0, 60 − 33.3, 13.3 | 360 + 66.7) = (0, 0, 26.7, 13.3 | 426.7).`]
        ], a: 0, src: `Exam 2023/24 August` },
        { q: `2025/26 tableau: s1 (5, 2, 1, 0 | 20), s2 (4, 7, 0, 1 | 28), Z (−7, −6, 0, 0 | 0). "The pivot element is −6."`, o: [
          [`True`, `−6 is a Z-row entry; Z-row numbers choose the pivot column but are never pivots. The pivot is 5 (column x1, ratio 20/5 = 4 &lt; 28/4 = 7).`],
          [`False`, `Correct. Pivot column x1 (−7); ratios 20/5 = 4, 28/4 = 7 → pivot 5.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `Same 2025/26 tableau. "After one pivot operation, the third (Z) row will be: Z | 0, −3.2, 1.4, 6 | 20".`, o: [
          [`True`, `The s2 entry and the RHS are wrong: s2 is non-basic in the pivot row (0), so Z + 7 × (1, 0.4, 0.2, 0 | 4) keeps s2 = 0 and gives RHS 28.`],
          [`False`, `Correct. Z + 7 × (1, 0.4, 0.2, 0 | 4) = (0, −3.2, 1.4, 0 | 28).`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `Same 2025/26 tableau. "The value of Z = 28" (after one pivot operation).`, o: [
          [`True`, `Correct. 0 + 7 × 4 = 28. (Z is not yet optimal: −3.2 remains; the final optimum is 316/9 ≈ 35.1.)`],
          [`False`, `False is wrong: pivot 5 gives new x1 row (1, 0.4, 0.2, 0 | 4) and Z's RHS becomes 0 + 7 × 4 = 28 (not yet optimal, but Z = 28).`]
        ], a: 0, src: `Exam 2025/26` }
      ]
    },
    /* ───────────────────────── LECTURE 4 ───────────────────────── */
    {
      n: 4, title: `Transportation Problem: NWC, Least Cost, Vogel & Stepping Stone`,
      notes: [
        { h: `The transportation problem`, pts: [
          `The problem of finding the <b>minimum-cost distribution</b> of a given commodity from a group of <b>supply centers (sources)</b> i = 1, ..., m to a group of <b>receiving centers (destinations)</b> j = 1, ..., n. Revision definition: it is concerned with <b>shipping a commodity between a set of sources and a set of destinations</b>.`,
          `Each source has a supply S<sub>i</sub>; each destination has a demand D<sub>j</sub>; the shipping cost from a source to a destination is <b>directly proportional to the number of units shipped</b> (unit cost c<sub>ij</sub>, amount x<sub>ij</sub>).`,
          `You need: (1) the <b>capacity of each supply point</b> (supply or stock), (2) the <b>amount required at each demand point</b> (demand), (3) the <b>unit cost of transporting</b> from each supply point to each demand point.`,
          `Network view: sources on the left, destinations on the right, an arc (i, j) for every route with cost c<sub>ij</sub> and flow x<sub>ij</sub>.`,
          `<b>Balanced</b> problem: total supply = total demand (all course examples). If not, add a dummy source or destination with zero costs to absorb the difference (textbook rule).`,
          `A basic feasible solution has <b>m + n − 1</b> allocated cells (e.g. 3 sources × 4 destinations → 6 cells). Methods for an initial BFS: <b>Northwest corner rule</b>, <b>Least cost (minimum cost) method</b>, <b>Vogel's approximation method</b>.`
        ]},
        { h: `Lecture data (canned peas, truckloads)`, table: [
          [`Cannery`, `W1`, `W2`, `W3`, `W4`, `Supply`],
          [`C1 (Bellingham)`, `464`, `513`, `654`, `867`, `75`],
          [`C2 (Eugene)`, `352`, `216`, `690`, `791`, `125`],
          [`C3 (Albert Lea)`, `995`, `682`, `388`, `685`, `100`],
          [`Demand`, `80`, `65`, `70`, `85`, `300`]
        ]},
        { h: `Northwest corner rule`, pts: [
          `The initial allocation is made to the cell in the <b>upper left-hand corner</b> of the tableau. Allocate the <b>most possible</b> = min(supply, demand), cross out the satisfied row or column, then move <b>right</b> (if the row still has supply) or <b>down</b> (if the column still has demand). Costs are ignored.`,
          `Lecture: C1W1 = 75 (C1 done) → C2W1 = 5 (W1 done) → C2W2 = 65 → C2W3 = 55 (C2 done) → C3W3 = 15 → C3W4 = 85.`,
          `<b>Z = 464×75 + 352×5 + 216×65 + 690×55 + 388×15 + 685×85 = $152,595</b>`
        ]},
        { h: `Least cost (minimum cost) method`, pts: [
          `The initial allocation is made to the cell with the <b>lowest cost</b> in the whole tableau; allocate min(supply, demand), cross out the satisfied row/column, then repeat with the lowest remaining cost.`,
          `Lecture: 216 (C2W2) = 65 → 352 (C2W1) = 60 (C2 done) → 388 (C3W3) = 70 → 464 (C1W1) = 20 (W1 done) → 685 (C3W4) = 30 (C3 done) → 867 (C1W4) = 55.`,
          `<b>Z = 464×20 + 867×55 + 352×60 + 216×65 + 388×70 + 685×30 = $139,835</b> (cheaper than NWC, and for this data it is already optimal).`
        ]},
        { h: `Vogel's approximation method (VAM)`, pts: [
          `<b>1.</b> Penalty of each row and column = <b>next lowest cost − lowest cost</b> in that row/column (only cells not crossed out).`,
          `<b>2.</b> Select the row or column with the <b>highest penalty</b> (break ties arbitrarily or by the lowest-cost cell).`,
          `<b>3.</b> Allocate as much as possible to the <b>lowest-cost feasible cell</b> in that row or column.`,
          `<b>4.</b> Cross out the satisfied row/column, recompute penalties, and repeat until all rim (supply and demand) requirements are met.`,
          `Student tip: "smallest, largest, smallest": smallest two costs → largest penalty → smallest cost cell. VAM usually gives the best starting solution of the three.`
        ]},
        { h: `VAM lecture example (supplies 200, 350, 150, 90; demands 100, 140, 300, 250)`, table: [
          [`Step`, `Penalties (rows S1..S4 / cols D1..D4)`, `Chosen`, `Allocation`],
          [`1`, `3, 1, 1, 1 / 8, 12, <b>19</b>, 9`, `col D3 → min cost 0 (S4)`, `S4D3 = 90 (S4 done)`],
          [`2`, `3, 1, 1 / <b>5</b>, 0, 3, <b>5</b>`, `tie D1/D4 → lowest cell 9`, `S3D1 = 100 (D1 done)`],
          [`3`, `4, 2, <b>10</b> / 0, 3, 5`, `row S3 → cost 10`, `S3D4 = 50 (S3 done)`],
          [`4`, `4, 2 / 0, 3, 2`, `row S1 → cost 13`, `S1D2 = 140 (D2 done)`],
          [`5`, `5, 4 / 3, 2`, `row S1 → cost 17`, `S1D4 = 60 (S1 done)`],
          [`6`, `S2 only`, `remaining`, `S2D3 = 210, S2D4 = 140`]
        ]},
        { h: `VAM total cost`, formula: [
          `Total cost = 9×100 + 10×50 + 13×140 + 17×60 + 19×210 + 15×140 + 0×90`,
          `           = 900 + 500 + 1820 + 1020 + 3990 + 2100 + 0 = 10,330`,
          `Check: 7 allocations = m + n − 1 = 4 + 4 − 1. (Here VAM is also optimal.)`
        ]},
        { h: `Stepping stone method (improving a BFS, asked in Final 2025/26)`, pts: [
          `For every <b>unoccupied</b> cell, trace a <b>closed path</b> that starts at that cell, moves only horizontally/vertically, and turns only at <b>occupied</b> cells. Mark the corners alternately <b>+, −, +, −</b>, starting with + at the empty cell.`,
          `<b>Improvement index</b> = sum of costs at + cells − sum of costs at − cells. It is the change in total cost per unit moved into the empty cell.`,
          `If every index is ≥ 0, the solution is <b>optimal</b> (minimization). Otherwise choose the <b>most negative</b> index, move θ = the <b>smallest allocation among the − cells</b> around the path (add θ at +, subtract at −). The cell that drops to 0 leaves. Repeat.`,
          `New cost = old cost + (index × θ).`
        ]},
        { h: `Final 2025/26 worked: LCM then stepping stone`, formula: [
          `Costs Q1: 5 6 7 (400) | Q2: 1 8 4 (500) | Q3: 9 3 2 (300) | demand 200 600 400`,
          `LCM: c=1 Q2D1 = 200; c=2 Q3D3 = 300 (Q3 done); c=4 Q2D3 = 100 (D3 done);`,
          `     c=6 Q1D2 = 400 (Q1 done); c=8 Q2D2 = 200.   Z = 200 + 600 + 400 + 2400 + 1600 = $5200`,
          `Indices: Q1D1 = 5 − 6 + 8 − 1 = +6;  Q1D3 = 7 − 6 + 8 − 4 = +5;  Q3D1 = 9 − 2 + 4 − 1 = +10`,
          `         Q3D2: path (Q3,D2)+ → (Q3,D3)− → (Q2,D3)+ → (Q2,D2)−  = 3 − 2 + 4 − 8 = −3  ← improve`,
          `θ = min(Q3D3 = 300, Q2D2 = 200) = 200 → Q3D2 = 200, Q3D3 = 100, Q2D3 = 300, Q2D2 = 0`,
          `New Z = 5200 − 3 × 200 = $4600. New indices: Q1D1 = 3, Q1D3 = 2, Q2D2 = 3, Q3D1 = 10 (all ≥ 0) → optimal.`
        ]},
        { h: `Revision example (S1: 100 140 75 | 300, S2: 90 20 110 | 320, S3: 60 130 220 | 380; demand 250 550 200)`, table: [
          [`Method`, `Allocations`, `Total cost`],
          [`Least cost`, `S2D2 = 320 (20), S3D1 = 250 (60), S1D3 = 200 (75), S3D2 = 130 (130), S1D2 = 100 (140)`, `$67,300`],
          [`Northwest corner`, `S1D1 = 250, S1D2 = 50, S2D2 = 320, S3D2 = 180, S3D3 = 200`, `$105,800`]
        ]}
      ],
      cards: [
        [`Transportation problem`, `Shipping a commodity between a set of sources and a set of destinations at minimum cost.`],
        [`Three data needed`, `Supply of each source, demand of each destination, unit transport cost of each route.`],
        [`Northwest corner method`, `Initial allocation to the upper left-hand corner cell; ignores cost.`],
        [`Least (minimum) cost method`, `Initial allocation to the cell with the lowest cost in the tableau.`],
        [`Vogel penalty`, `Next lowest cost − lowest cost in a row or column.`],
        [`Vogel selection`, `Highest penalty line, then its lowest-cost cell.`],
        [`Number of allocations in a BFS`, `m + n − 1.`],
        [`Balanced problem`, `Total supply = total demand.`],
        [`Lecture NWC cost`, `$152,595.`],
        [`Lecture LCM cost`, `$139,835.`],
        [`Lecture VAM example cost`, `$10,330.`],
        [`Stepping stone improvement index`, `Sum of + cell costs − sum of − cell costs along the closed path.`],
        [`Optimality (stepping stone, min)`, `All improvement indices ≥ 0.`],
        [`θ in stepping stone`, `Smallest allocation among the − cells of the path.`],
        [`Cost of shipping is...`, `Directly proportional to the number of units shipped.`],
        [`Which method is "connected with transportation"?`, `Vogel's approximation (also NWC and LCM).`]
      ],
      qa: [
        [`Define the transportation problem and state what you need to solve it.`, `It is concerned with shipping a commodity between a set of sources and a set of destinations, finding the minimum-cost distribution. You need: the supply (capacity) of each source, the demand of each destination, and the unit transportation cost from each source to each destination.`],
        [`Explain the northwest corner rule and the least cost method.`, `NWC: start at the upper left-hand cell, allocate the maximum possible (min of supply, demand), cross out the satisfied row/column and move right or down until all supply/demand is used; costs are ignored. LCM: always allocate to the cell with the lowest cost in the remaining tableau, as much as possible, cross out and repeat.`],
        [`List the steps of Vogel's approximation method.`, `1) For each row and column compute the penalty = next lowest cost − lowest cost. 2) Select the row/column with the highest penalty (ties arbitrary or by lowest cost cell). 3) Allocate as much as possible to the lowest-cost cell of that line. 4) Cross out the satisfied line, recompute penalties and repeat until all rim requirements are met.`],
        [`Explain the stepping stone method.`, `Starting from an initial BFS with m + n − 1 occupied cells, for every empty cell form a closed path turning only at occupied cells, signs alternating +, −. Improvement index = Σ(+ costs) − Σ(− costs). If all indices ≥ 0 the solution is optimal; otherwise enter the cell with the most negative index, moving θ = smallest − allocation, and repeat.`],
        [`Solve with LCM: S1 (100, 140, 75 | 300), S2 (90, 20, 110 | 320), S3 (60, 130, 220 | 380), demand 250, 550, 200.`, `20: S2D2 = 320 (S2 done). 60: S3D1 = 250 (D1 done). 75: S1D3 = 200 (D3 done). 130: S3D2 = 130 (S3 done). 140: S1D2 = 100. Z = 20×320 + 60×250 + 75×200 + 130×130 + 140×100 = $67,300.`],
        [`Why does the number of allocated cells in a BFS equal m + n − 1?`, `There are m supply and n demand equations, but in a balanced problem one of them is redundant (total supply = total demand), so only m + n − 1 are independent, giving m + n − 1 basic variables. Fewer positive cells means the solution is degenerate.`]
      ],
      quiz: [
        { q: `"In the ............ the initial allocation is made to the cell with the lowest of the transportation problem tableau."`, o: [
          [`least cost method`, `Correct. Also called the minimum cost method.`],
          [`northwest corner`, `The northwest corner method makes its first allocation in the upper left-hand cell and ignores costs entirely (L4, NWC).`],
          [`Vogel's approximation method`, `VAM first computes row/column penalties (difference of the two lowest costs) and allocates in the highest-penalty line, not simply the cheapest cell.`],
          [`Hungarian method`, `The Hungarian method solves the assignment problem (L5) by row/column reduction; it makes no transportation allocations.`]
        ], a: 0, src: `Revision sheet` },
        { q: `"The ............ is concerned with shipping a commodity between a set of sources and a set of destinations."`, o: [
          [`transportation problem`, `Correct. Revision 1 (definition 16): the transportation problem is concerned with shipping a commodity between a set of sources and a set of destinations at minimum cost (L4).`],
          [`assignment problem`, `Assignment assigns resources to an equal number of activities.`],
          [`shortest route problem`, `That finds the shortest distance between two nodes.`],
          [`simplex method`, `The simplex method is a general LP algorithm (L3) that moves between basic feasible solutions; it is not this definition.`]
        ], a: 0, src: `Revision sheet` },
        { q: `True or False: "In the Vogel's approximation method, the initial allocation is made to the cell in the upper left-hand corner of the transportation problem tableau."`, o: [
          [`True`, `Starting in the upper left-hand cell is the northwest corner method; VAM allocates first in the line with the largest penalty.`],
          [`False`, `Correct. VAM allocates using penalties; upper-left is NWC.`]
        ], a: 1, src: `Revision sheet` },
        { q: `True or False: "In the northwest corner method, the initial allocation is made to the cell in the upper left-hand corner of the transportation problem tableau."`, o: [
          [`True`, `Correct. Revision 1 definition 17: in the northwest corner method the initial allocation is made to the upper left-hand cell, then it moves right or down, ignoring costs (L4).`],
          [`False`, `False would reject the Revision 1 definition: NWC always begins with the upper left-hand (northwest) cell of the tableau.`]
        ], a: 0, src: `Exam 2022/23 August` },
        { q: `True or False: "Vogel's approximation method is connected with transportation problem."`, o: [
          [`True`, `Correct. VAM is a method for an initial BFS of the transportation problem.`],
          [`False`, `False is wrong: VAM is one of the three starting methods (NWC, least cost, Vogel) for the transportation problem in L4.`]
        ], a: 0, src: `Exam 2022/23 January` },
        { q: `Transportation data: Q1 (7, 3, 8, 2 | 100), Q2 (5, 6, 11, 12 | 200), Q3 (10, 4, 7, 6 | 300), demand 80, 170, 190, 160. Using NWC, "M12 allocated to (Q1, D2) equals 150."`, o: [
          [`True`, `150 is the NWC value of M22 (Q2D2 = 170 − 20); M12 is only 100 − 80 = 20, what Q1 has left after Q1D1 = 80.`],
          [`False`, `Correct. Q1D1 = 80, then Q1D2 = 100 − 80 = 20.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `Same data (NWC). "M24 allocated to (Q2, D4) equals 50."`, o: [
          [`True`, `Q2 is exhausted at D3 (Q2D2 = 150, Q2D3 = 50).`],
          [`False`, `Correct. M24 = 0; the 50 is in cell (Q2, D3).`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `Same data (NWC). "M33 allocated to (Q3, D3) equals 300."`, o: [
          [`True`, `Q3 has 300, but D3 needs only 190 − 50 = 140 after Q2D3 = 50, so M33 = 140 and the remaining 160 goes to D4.`],
          [`False`, `Correct. NWC: Q1D1 = 80, Q1D2 = 20, Q2D2 = 150, Q2D3 = 50, so D3 needs 190 − 50 = 140 more: M33 = 140, not 300 (L4, NWC).`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `Same data (NWC). "M34 allocated to (Q3, D4) equals 160."`, o: [
          [`True`, `Correct. After Q3D3 = 140, Q3 has 160 left, exactly D4's demand.`],
          [`False`, `False is wrong: after Q3D3 = 140, Q3 has 300 − 140 = 160 left and D4 needs exactly 160, so M34 = 160.`]
        ], a: 0, src: `Exam 2022/23 August` },
        { q: `Same data (NWC). "The total cost equals 4000."`, o: [
          [`True`, `The NWC total is 7×80 + 3×20 + 6×150 + 11×50 + 7×140 + 6×160 = 4010, not 4000.`],
          [`False`, `Correct. 7×80 + 3×20 + 6×150 + 11×50 + 7×140 + 6×160 = 560 + 60 + 900 + 550 + 980 + 960 = 4010.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `Data: Q1 (3, 1, 7, 4 | 250), Q2 (2, 6, 5, 9 | 350), Q3 (8, 3, 3, 2 | 400), demand 200, 300, 350, 150. Using NWC, "M11 equals zero."`, o: [
          [`True`, `NWC always starts by filling the upper-left cell.`],
          [`False`, `Correct. NWC starts at the upper-left cell and allocates the most possible: M11 = min(supply 250, demand 200) = 200, so it is not zero (L4, NWC).`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `Same data (NWC). "M22 allocated to (Q2, D2) equals M33 allocated to (Q3, D3)."`, o: [
          [`True`, `Correct. Q1D1 = 200, Q1D2 = 50, Q2D2 = 250, Q2D3 = 100, Q3D3 = 250, Q3D4 = 150. M22 = M33 = 250.`],
          [`False`, `False is wrong: NWC gives Q2D2 = 300 − 50 = 250 and Q3D3 = 350 − 100 = 250, so M22 and M33 are equal.`]
        ], a: 0, src: `Exam 2022/23 January` },
        { q: `Same data (NWC). "The total cost equals 2400."`, o: [
          [`True`, `The NWC total is 600 + 50 + 1500 + 500 + 750 + 300 = 3700 (least cost would give 2450); neither is 2400.`],
          [`False`, `Correct. 3×200 + 1×50 + 6×250 + 5×100 + 3×250 + 2×150 = 600 + 50 + 1500 + 500 + 750 + 300 = 3700.`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `Revision data (S1: 100, 140, 75 | 300; S2: 90, 20, 110 | 320; S3: 60, 130, 220 | 380; demand 250, 550, 200). By least cost, "M21 allocated to (S2, D1) equals 250."`, o: [
          [`True`, `S2 is used entirely at its cheapest cell (S2, D2).`],
          [`False`, `Correct. LCM puts 320 in S2D2 first; D1's 250 goes to S3 (cost 60). M21 = 0.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Revision data. By least cost, "the total cost equals 67300."`, o: [
          [`True`, `Correct. 20×320 + 60×250 + 75×200 + 130×130 + 140×100 = 67,300.`],
          [`False`, `False is wrong: LCM gives S2D2 = 320, S3D1 = 250, S1D3 = 200, S3D2 = 130, S1D2 = 100, total 6400 + 15000 + 15000 + 16900 + 14000 = 67,300.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Revision data. By NWC, "M22 allocated to (S2, D2) equals 320."`, o: [
          [`True`, `Correct. S1D1 = 250, S1D2 = 50, then S2D2 = 320.`],
          [`False`, `False is wrong: NWC gives S1D1 = 250, S1D2 = 300 − 250 = 50, then S2D2 = min(320, 500) = 320.`]
        ], a: 0, src: `Revision sheet` },
        { q: `Revision data. By NWC, "M33 allocated to (S3, D3) equals 180."`, o: [
          [`True`, `180 is the NWC value of (S3, D2) (550 − 50 − 320); S3's remaining 200 then goes to D3, so M33 = 200.`],
          [`False`, `Correct. NWC: S1D1 = 250, S1D2 = 50, S2D2 = 320, S3D2 = 550 − 370 = 180, then S3D3 = 380 − 180 = 200, so M33 = 200, not 180 (L4, NWC).`]
        ], a: 1, src: `Revision sheet` },
        { q: `Revision data. By NWC, "the total cost equals 105800."`, o: [
          [`True`, `Correct. 100×250 + 140×50 + 20×320 + 130×180 + 220×200 = 105,800.`],
          [`False`, `False is wrong: NWC cost = 100×250 + 140×50 + 20×320 + 130×180 + 220×200 = 25000 + 7000 + 6400 + 23400 + 44000 = 105,800.`]
        ], a: 0, src: `Revision sheet` },
        { q: `2023/24 (3rd yr) VAM data: Q1 (20, 22, 17, 4 | 120), Q2 (24, 37, 9, 7 | 70), Q3 (32, 37, 20, 16 | 50), demand 60, 40, 30, 110. "M14 allocated to (Q1, D4) equals 110."`, o: [
          [`True`, `D4 demands 110, but Q1 has only 120 − 40 = 80 left after Q1D2 = 40, so M14 = 80.`],
          [`False`, `Correct. Step 1 picks D2 (penalty 15): Q1D2 = 40; step 2 picks Q1 (penalty 13): Q1D4 = 80.`]
        ], a: 1, src: `Exam 2023/24 (3rd year)` },
        { q: `Same 2023/24 VAM data. "M23 allocated to (Q2, D3) equals M24 allocated to (Q2, D4)."`, o: [
          [`True`, `Correct. In the VAM solution Q2's 70 units are split as Q2D3 = 30 (all of D3) and the rest to D4 and D1; the key gives Q2D3 = Q2D4 = 30 (L4, Vogel).`],
          [`False`, `False is wrong: the VAM allocations give Q2D3 = 30 and Q2D4 = 30, so the two cells are equal.`]
        ], a: 0, src: `Exam 2023/24 (3rd year)` },
        { q: `Same 2023/24 VAM data. "The total cost equals $3520."`, o: [
          [`True`, `Correct. 22×40 + 4×80 + 9×30 + 7×30 + 32×50 + 24×10 = 880 + 320 + 270 + 210 + 1600 + 240 = 3520.`],
          [`False`, `False is wrong: VAM cost = 22×40 + 4×80 + 9×30 + 7×30 + 32×50 + 24×10 = 880 + 320 + 270 + 210 + 1600 + 240 = 3520.`]
        ], a: 0, src: `Exam 2023/24 (3rd year)` },
        { q: `2023/24 (2nd yr) VAM data: Q1 (19, 30, 50, 10 | 7), Q2 (40, 30, 40, 60 | 9), Q3 (40, 8, 70, 20 | 18), demand 5, 8, 7, 14. "M32 allocated to (Q3, D2) equals 18."`, o: [
          [`True`, `Q3 has 18 units, but D2 demands only 8, so VAM allocates min(18, 8) = 8 to (Q3, D2).`],
          [`False`, `Correct. First penalty choice is D2 (22): Q3D2 = min(18, 8) = 8.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `Same 2023/24 (2nd yr) data. "The total cost equals $797."`, o: [
          [`True`, `$797 swaps two digits: the VAM allocations cost 64 + 95 + 200 + 20 + 120 + 280 = $779.`],
          [`False`, `Correct. Q3D2 = 8, Q1D1 = 5, Q3D4 = 10, Q1D4 = 2, Q2D4 = 2, Q2D3 = 7: 64 + 95 + 200 + 20 + 120 + 280 = 779.`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `Final 2025/26 data: Q1 (5, 6, 7 | 400), Q2 (1, 8, 4 | 500), Q3 (9, 3, 2 | 300), demand 200, 600, 400. Using least cost, "M12 allocated to (Q1, D2) equals 400."`, o: [
          [`True`, `Correct. After cells 1, 2, 4 are filled, Q1's cheapest open cell is D2 (cost 6): 400.`],
          [`False`, `False is wrong: LCM fills Q2D1 = 200 (1), Q3D3 = 300 (2), Q2D3 = 100 (4); then Q1's cheapest open cell is D2 (6), taking all 400.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `Same 2025/26 data (LCM). "M23 allocated to (Q2, D3) equals zero."`, o: [
          [`True`, `Q2D3 has cost 4, the third cheapest; after Q2D1 = 200 and Q3D3 = 300 it receives min(300, 100) = 100, not zero.`],
          [`False`, `Correct. Q2D1 = 200, Q3D3 = 300, then Q2D3 = 100.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `Same 2025/26 data (LCM). "The total cost equals $2500."`, o: [
          [`True`, `$2500 is not the LCM cost: 1×200 + 2×300 + 4×100 + 6×400 + 8×200 = $5200.`],
          [`False`, `Correct. 1×200 + 2×300 + 4×100 + 6×400 + 8×200 = 5200.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `Stepping stone (2025/26). "The closed path for the unoccupied cell (Q3, D2) is (Q3, D2) → (Q3, D3) → (Q2, D3) → (Q2, D2)."`, o: [
          [`True`, `Correct. It turns only at occupied cells: Q3D3, Q2D3, Q2D2. Index = 3 − 2 + 4 − 8 = −3.`],
          [`False`, `False is wrong: from the empty cell Q3D2 the path turns only at occupied cells (Q3D3, Q2D3, Q2D2) and returns, so it is a valid closed path.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `Stepping stone (2025/26). "The minimum total transportation cost is 4100."`, o: [
          [`True`, `4100 is not reached: the only negative index (−3 at Q3D2) with θ = 200 lowers 5200 by 600 to 4600, which is optimal.`],
          [`False`, `Correct. θ = 200 along the −3 path: 5200 − 600 = 4600, and all new indices are ≥ 0.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `Match: "Minimum cost method" ...`, o: [
          [`The initial allocation is made to the cell with the lowest of the transportation problem tableau`, `Correct. The minimum (least) cost method makes the initial allocation to the cell with the lowest cost in the tableau (L4; 2023/24 matching 2 → D).`],
          [`the initial allocation is made to the cell in the upper left-hand corner`, `Starting in the upper left-hand corner is the northwest corner method, which ignores costs (L4).`],
          [`an integer programming in which only some of the variables are integers`, `An integer program in which only some variables are integers is a mixed integer program (L6).`],
          [`defines as combinations of interrelated activities`, `A combination of interrelated activities is the definition of a project (L7, CPM), not a transportation method.`]
        ], a: 0, src: `Exam 2023/24` }
      ]
    },
    /* ───────────────────────── LECTURE 5 ───────────────────────── */
    {
      n: 5, title: `Assignment Problem: Hungarian Method`,
      notes: [
        { h: `The assignment model`, pts: [
          `The assignment model is a <b>special form of a linear programming model</b> similar to the transportation model; the difference is that the <b>supply at each source and the demand at each destination are each limited to one unit</b>.`,
          `<b>Definition (Revision 1)</b>: an assignment problem is a particular case of the transportation problem where the objective is to <b>assign a number of resources to an equal number of activities</b> so as to <b>minimize total cost or maximize total profit</b> of allocation.`,
          `It arises because resources (men, machines...) have varying degrees of efficiency for different activities, so the cost, profit or loss differs.`,
          `Each row (person/job) gets exactly one column (machine/programmer) and each column exactly one row. An n × n problem has n assignments.`,
          `Textbook extensions: a <b>maximization</b> problem is converted by subtracting every entry from the largest entry; an <b>unbalanced</b> matrix gets a dummy row/column of zeros.`
        ]},
        { h: `Hungarian method (lecture steps)`, pts: [
          `<b>Step 1 (row reduction)</b>: subtract the minimum entry of each row from every entry of that row.`,
          `<b>Step 2 (column reduction)</b>: subtract the minimum entry of each column from every entry of that column.`,
          `<b>Step 3</b>: cover all zeros with the <b>minimum number of horizontal/vertical lines</b>. Lecture procedure: <b>row scanning</b>: a row with exactly one unmarked zero → box it (assign) and cross the other zeros in its column; then <b>column scanning</b>: a column with exactly one zero → box it and cross the zeros of its row.`,
          `If the number of boxed assignments (= lines) equals n, the assignment is optimal. Total cost is read from the <b>original</b> matrix.`,
          `<b>Step 4 (marking, if fewer than n)</b>: tick (√) rows without an assignment; tick columns having a zero in a ticked row; tick rows having an assigned zero in a ticked column; repeat. Draw lines through <b>unticked rows</b> and <b>ticked columns</b>.`,
          `<b>Step 5</b>: θ = smallest <b>uncovered</b> element. C − θ for uncovered elements, C unchanged for elements with one line, C + θ for elements at the intersection of two lines. Return to step 3.`,
          `Section shortcut: draw lines through the rows/columns with the most zeros; if lines = number of rows, assign; else modify with θ and redraw.`
        ]},
        { h: `Lecture example (Page 107): D, E, F`, table: [
          [`Stage`, `Row A`, `Row B`, `Row C`],
          [`Original`, `250 400 350`, `400 600 350`, `200 400 250`],
          [`Row reduce (−250, −350, −200)`, `0 150 100`, `50 250 0`, `0 200 50`],
          [`Column reduce (−0, −150, −0)`, `0 0 100`, `50 100 0`, `0 50 50`],
          [`Assignment`, `A → E (400)`, `B → F (350)`, `C → D (200)`]
        ]},
        { h: `Lecture example result`, formula: [
          `3 zeros can be assigned independently (B only zero at F, C only zero at D, then A → E).`,
          `Total cost = 400 + 350 + 200 = $950`
        ]},
        { h: `Lecture example 2: jobs J1..J4 to persons P1..P4`, table: [
          [`Stage`, `J1`, `J2`, `J3`, `J4`],
          [`Original`, `48 48 50 44`, `56 60 60 68`, `96 94 90 85`, `42 44 54 46`],
          [`Row min`, `44`, `56`, `85`, `42`],
          [`After rows`, `4 4 6 0`, `0 4 4 12`, `11 9 5 0`, `0 2 12 4`],
          [`Col min 0, 2, 4, 0 →`, `4 2 2 0`, `0 2 0 12`, `11 7 1 0`, `0 0 8 4`],
          [`θ = 1 (lines: rows J2, J4 and column P4)`, `3 1 1 0`, `0 2 0 13`, `10 6 0 0`, `0 0 8 5`],
          [`Assignment`, `J1 → P4 (44)`, `J2 → P1 (56)`, `J3 → P3 (90)`, `J4 → P2 (44)`]
        ]},
        { h: `Example 2 marking and answer`, formula: [
          `After column reduction only 3 independent zeros (J3 → P4, J4 → P1, J2 → P3), J1 has none.`,
          `Tick J1 (no assignment) → tick column P4 (zero in J1) → tick row J3 (assigned zero in P4).`,
          `Lines through unticked rows J2, J4 and ticked column P4. Smallest uncovered = 1 (J3, P3).`,
          `Subtract 1 from uncovered, add 1 at intersections (J2,P4) and (J4,P4).`,
          `Optimal: J1 → P4, J2 → P1, J3 → P3, J4 → P2.  Total = 44 + 56 + 90 + 44 = $234`
        ]},
        { h: `Sheet 1 / Final Aug 2022/23 Q2 (verified)`, table: [
          [`Stage`, `Row 1`, `Row 2`, `Row 3`, `Row 4`],
          [`Original (A B C D)`, `1 4 6 3`, `9 7 10 9`, `4 5 11 7`, `8 7 8 5`],
          [`Row reduce (1, 7, 4, 5)`, `0 3 5 2`, `2 0 3 2`, `0 1 7 3`, `3 2 3 0`],
          [`Col reduce (0, 0, 3, 0)`, `0 3 2 2`, `2 0 0 2`, `0 1 4 3`, `3 2 0 0`],
          [`3 lines → θ = 1`, `0 2 1 1`, `3 0 0 2`, `0 0 3 2`, `4 2 0 0`],
          [`Assign`, `1 → A (1)`, `2 → C (10)`, `3 → B (5)`, `4 → D (5)`]
        ]},
        { h: `Other solved assignment exams`, table: [
          [`Paper`, `Optimal assignment`, `Min cost`],
          [`2023/24 (3rd yr): J1..J4 × P1..P4`, `J1→P2 (60), J2→P1 (10), J3→P4 (20), J4→P3 (10)`, `100`],
          [`2023/24 (2nd yr)`, `J1→P2 (8), J2→P3 (4), J3→P4 (4), J4→P1 (1)`, `17`],
          [`2023/24 Aug: M1..M5 × A..E`, `M1→D (11), M2→A (43), M3→B (28), M4→C (27), M5→E (25)`, `134`],
          [`2019/20: programmers × jobs`, `Mohamed→J1 (7), Ahmed→J4 (11), Samy→J3 (10), Eslam→J2 (17)`, `45`],
          [`Revision Q3 (5 × 5)`, `J1→P1 (2), J2→P3 (0), J3→P4 (0), J4→P2 (0), J5→P5 (0)`, `2`],
          [`Section ex. (E1..E4 × J1..J4)`, `E1→J2, E2→J1, E3→J3, E4→J4`, `3 + 9 + 7 + 8 = 27`]
        ]}
      ],
      cards: [
        [`Assignment problem`, `A special transportation problem assigning resources to an equal number of activities to minimize cost or maximize profit.`],
        [`Supply/demand in assignment`, `Each limited to one unit.`],
        [`Hungarian step 1`, `Subtract each row's minimum from the row.`],
        [`Hungarian step 2`, `Subtract each column's minimum from the column.`],
        [`Hungarian step 3`, `Cover all zeros with the minimum number of lines.`],
        [`Optimality test`, `Number of lines (independent assignments) = n.`],
        [`θ`, `Smallest uncovered element.`],
        [`Uncovered element update`, `C − θ.`],
        [`Element with one line`, `Unchanged.`],
        [`Element at two lines' intersection`, `C + θ.`],
        [`Marking rule: lines are drawn through`, `Unticked rows and ticked columns.`],
        [`Where is total cost read?`, `From the original cost matrix.`],
        [`Lecture example 2 answer`, `J1→P4, J2→P1, J3→P3, J4→P2: $234.`],
        [`Lecture page-107 answer`, `A→E, B→F, C→D: $950.`],
        [`Maximization assignment`, `Subtract all entries from the largest entry, then minimize.`]
      ],
      qa: [
        [`Define the assignment problem and how it differs from the transportation problem.`, `It is a particular case of the transportation problem whose objective is to assign a number of resources to an equal number of activities to minimize total cost or maximize total profit. Unlike transportation, each source's supply and each destination's demand equals one unit, so every row gets exactly one column.`],
        [`List the steps of the Hungarian method.`, `1) Row reduction. 2) Column reduction. 3) Cover all zeros with the minimum number of lines (row and column scanning). If lines = n, assign and compute the cost from the original matrix. 4) Otherwise tick unassigned rows, their zero columns, and rows with assignments in ticked columns; draw lines through unticked rows and ticked columns. 5) θ = minimum uncovered element; subtract θ from uncovered, add θ at intersections, keep single-line elements; repeat.`],
        [`Solve: rows 1–4, columns A–D: (1, 4, 6, 3), (9, 7, 10, 9), (4, 5, 11, 7), (8, 7, 8, 5).`, `Row mins 1, 7, 4, 5 → (0,3,5,2), (2,0,3,2), (0,1,7,3), (3,2,3,0). Column mins 0,0,3,0 → (0,3,2,2), (2,0,0,2), (0,1,4,3), (3,2,0,0). 3 lines < 4 → θ = 1 → (0,2,1,1), (3,0,0,2), (0,0,3,2), (4,2,0,0). Assign 1→A, 2→C, 3→B, 4→D: 1 + 10 + 5 + 5 = 21.`],
        [`Solve: J1 (40, 60, 60, 70), J2 (10, 60, 70, 30), J3 (20, 50, 40, 20), J4 (30, 20, 10, 40).`, `Row mins 40, 10, 20, 10 → (0,20,20,30), (0,50,60,20), (0,30,20,0), (20,10,0,30). Column mins 0, 10, 0, 0 → (0,10,20,30), (0,40,60,20), (0,20,20,0), (20,0,0,30). 3 lines → θ = 10 → (0,0,10,30), (0,30,50,20), (0,10,10,0), (30,0,0,40). Assign J2→P1, J1→P2, J3→P4, J4→P3: 10 + 60 + 20 + 10 = 100.`],
        [`How is θ used to modify the matrix?`, `θ is the smallest element not covered by any line. Subtract θ from every uncovered element, leave elements covered by one line unchanged, and add θ to elements covered by two lines (intersections). This creates a new zero without destroying the existing assignments.`]
      ],
      quiz: [
        { q: `Match: "Assignment problem" ...`, o: [
          [`is a particular case of the transportation problem where the objective is to assign a number of resources to an equal number of activities so as to minimize total cost or maximize total profit of allocation`, `Correct. The assignment problem is a particular case of the transportation problem: assign n resources to an equal number of activities, one each, to minimize total cost or maximize profit (L5; 2023/24 August matching 3 → B).`],
          [`is used to find the shortest distance between two nodes with minimal cost`, `Finding the shortest distance between two nodes with minimal cost is the shortest route problem, solved by dynamic programming (L9).`],
          [`is concerned with scientifically deciding how to best design and operate man machine systems`, `Scientifically deciding how to design and operate man-machine systems is the definition of operations research (L1).`],
          [`is the element in the intersection of the pivot column and pivot row`, `The element where the pivot column and pivot row cross is the pivot element of the simplex method (L3).`]
        ], a: 0, src: `Exam 2023/24 August` },
        { q: `In the Hungarian method, after the row and column reductions, the assignment is optimal when:`, o: [
          [`The minimum number of lines covering all zeros equals the order n of the matrix`, `Correct. If the minimum number of lines covering all zeros equals n, there are n independent zeros, one per row and column, so an optimal assignment can be made (L5, Step 3).`],
          [`Every row contains at least one zero`, `Row reduction always gives that, but independent zeros may still be fewer than n.`],
          [`θ equals zero`, `θ is the smallest uncovered element and is always positive when used.`],
          [`The number of lines is greater than n`, `The minimum number of covering lines can never exceed n, since n row lines alone cover every zero; the test is lines = n.`]
        ], a: 0, src: `Lecture 5 example` },
        { q: `For the Sheet 1 matrix (1, 4, 6, 3 / 9, 7, 10, 9 / 4, 5, 11, 7 / 8, 7, 8, 5) the minimum total cost is:`, o: [
          [`19`, `19 is below the true minimum: the cheapest one-to-one assignment of this matrix costs 21, so 19 cannot be reached.`],
          [`21`, `Correct. 1→A (1), 2→C (10), 3→B (5), 4→D (5).`],
          [`23`, `23 is a feasible assignment total, but the Hungarian method finds 1→A, 2→C, 3→B, 4→D = 1 + 10 + 5 + 5 = 21, which is lower.`],
          [`25`, `25 is a feasible but costlier assignment; the optimum is 1 + 10 + 5 + 5 = 21 after one θ = 1 step.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `2023/24 (3rd yr): J1 (40, 60, 60, 70), J2 (10, 60, 70, 30), J3 (20, 50, 40, 20), J4 (30, 20, 10, 40). The minimum total cost is:`, o: [
          [`80`, `Impossible: J1's cheapest is 40 and J2's 10 both use P1.`],
          [`90`, `No one-to-one assignment of this matrix totals 90; the minimum possible is 100 (J1→P2, J2→P1, J3→P4, J4→P3).`],
          [`100`, `Correct. J1→P2 (60), J2→P1 (10), J3→P4 (20), J4→P3 (10).`],
          [`110`, `110 is a feasible assignment but not the cheapest; after θ = 10 the Hungarian method gives 60 + 10 + 20 + 10 = 100.`]
        ], a: 2, src: `Exam 2023/24 (3rd year)` },
        { q: `In lecture example 2 (J1..J4, P1..P4), after column reduction θ is:`, o: [
          [`1`, `Correct. The smallest uncovered element is 1 at (J3, P3).`],
          [`2`, `2 appears in J1 but is not the smallest uncovered.`],
          [`4`, `4 is uncovered (at J1, P1) but not the smallest; θ is the SMALLEST uncovered element, which is 1 at (J3, P3).`],
          [`0`, `θ must be the smallest positive uncovered element.`]
        ], a: 0, src: `Lecture 5 example` },
        { q: `After choosing θ, an element covered by two lines becomes:`, o: [
          [`C − θ`, `C − θ is the rule for UNCOVERED elements; an element at the intersection of two lines gets C + θ.`],
          [`C`, `Leaving C unchanged is the rule for elements covered by exactly one line; doubly-covered elements get C + θ.`],
          [`C + θ`, `Correct. Intersection elements increase by θ.`],
          [`0`, `No rule sets elements to 0; θ is subtracted from uncovered ones, and doubly-covered ones become C + θ.`]
        ], a: 2 },
        { q: `The assignment problem differs from the transportation problem because:`, o: [
          [`It always maximizes`, `The assignment problem may minimize cost or maximize profit (a max problem is converted first), so 'always maximizes' is wrong.`],
          [`Supply at each source and demand at each destination are limited to one unit`, `Correct. The assignment problem is a special transportation problem in which every source supplies exactly 1 unit and every destination demands exactly 1 unit (one job per person) (L5).`],
          [`It cannot be written as an LP`, `It can be written as an LP (a 0-1 special case of the transportation LP); the Hungarian method just solves it faster.`],
          [`It needs more rows than columns`, `The Hungarian method needs a SQUARE matrix (rows = columns); an unequal problem is first balanced with a dummy row or column.`]
        ], a: 1 },
        { q: `For the 2019/20 matrix (Mohamed 7, 9, 8, 13; Ahmed 16, 16, 15, 11; Samy 16, 19, 10, 15; Eslam 16, 17, 14, 16), the optimal total is:`, o: [
          [`43`, `43 is below the minimum: no one-to-one assignment of this matrix costs less than 45.`],
          [`45`, `Correct. Mohamed→J1 7, Ahmed→J4 11, Samy→J3 10, Eslam→J2 17.`],
          [`47`, `No one-to-one assignment of this matrix totals 47; the optimum is 7 + 11 + 10 + 17 = 45.`],
          [`49`, `49 is a feasible but costlier assignment; the optimum is Mohamed→J1, Ahmed→J4, Samy→J3, Eslam→J2 = 45.`]
        ], a: 1, src: `Exam 2019/20` },
        { q: `In the lecture's marking procedure, the covering lines are drawn through:`, o: [
          [`Ticked rows and unticked columns`, `This reverses the rule: lines go through UNTICKED rows and TICKED columns, which covers all zeros with the minimum number of lines.`],
          [`Unticked rows and ticked columns`, `Correct. Step 4 marking: tick unassigned rows, then columns with zeros in ticked rows, then rows with assignments in ticked columns; draw lines through unticked rows and ticked columns (L5).`],
          [`All rows with zeros`, `Drawing a line through every row with a zero may use more lines than needed; the marking rule gives the minimum number of lines.`],
          [`Only columns`, `The covering lines use rows as well: unticked rows and ticked columns, so 'only columns' is wrong.`]
        ], a: 1 },
        { q: `In the page-107 example (A: 250, 400, 350; B: 400, 600, 350; C: 200, 400, 250), the total minimum cost is:`, o: [
          [`$850`, `$850 is below the minimum: A and C would both want column D (250 and 200 are not both possible), so no assignment costs less than $950.`],
          [`$950`, `Correct. Row and column reduction leads to A→E (400), B→F (350), C→D (200), one per row and column: 400 + 350 + 200 = $950, read from the original matrix (L5).`],
          [`$1000`, `$1000 is a feasible assignment, but A→E, B→F, C→D costs only $950.`],
          [`$1050`, `$1050 is a feasible but costlier assignment; the minimum is 400 + 350 + 200 = $950.`]
        ], a: 1, src: `Lecture 5 example` },
        { q: `Which first step is common to every Hungarian solution in the course?`, o: [
          [`Subtract the minimum of each row from that row`, `Correct. Row reduction, then column reduction.`],
          [`Allocate to the upper left-hand cell`, `Allocating to the upper left-hand cell is the northwest corner method for the transportation problem (L4).`],
          [`Compute penalties`, `Penalties (difference of the two lowest costs) belong to Vogel's approximation method for transportation (L4).`],
          [`Add slack variables`, `Slack variables are added to ≤ constraints in the simplex method (L3), not in the Hungarian method.`]
        ], a: 0 },
        { q: `How should a MAXIMIZATION assignment (profits) be handled with the Hungarian method?`, o: [
          [`Apply it directly; it maximizes automatically`, `The Hungarian method minimizes; applied directly to profits it would find the LEAST profitable assignment.`],
          [`Subtract every entry from the largest entry, then minimize`, `Correct (textbook conversion; the profit is then read from the original matrix).`],
          [`Multiply the matrix by 2`, `Scaling does not change minimization into maximization.`],
          [`Use the northwest corner rule`, `The northwest corner rule finds a starting transportation solution (L4); it ignores costs and does not solve assignment problems.`]
        ], a: 1 }
      ]
    },
    /* ───────────────────────── LECTURE 6 ───────────────────────── */
    {
      n: 6, title: `Integer Programming: Branch and Bound`,
      notes: [
        { h: `Definitions`, table: [
          [`Term`, `Definition (Revision 1 wording)`],
          [`Integer programming problem`, `An optimization problem with integer decision variables.`],
          [`Linear programming relaxation`, `The LP obtained by omitting all integer or 0-1 constraints on the variables of the integer program.`],
          [`Pure integer programming`, `An integer program in which ALL variables are required to be integers.`],
          [`Mixed integer programming`, `An integer program in which only SOME of the variables are required to be integers.`],
          [`0-1 (binary) integer programming`, `An integer program in which all the variables must equal 0 or 1.`]
        ]},
        { h: `Why not just round the LP answer?`, pts: [
          `Rounding the LP optimum can give an <b>infeasible</b> point or a <b>non-optimal</b> one. Example (Sheet 2): LP optimum (2.75, 1.25); rounding to (3, 1) violates 10x1 + 6x2 ≤ 35 (36 > 35).`,
          `For a MAX problem, the LP relaxation's Z is an <b>upper bound</b> on the best integer Z; every branch can only lower it.`,
          `Integer problems appear whenever units are indivisible: days a plant operates (full-day pay), number of machines, people, trucks.`
        ]},
        { h: `Branch and bound (graphical) procedure`, pts: [
          `<b>1.</b> Solve the LP relaxation graphically (corner point table). If the optimum is integer, stop.`,
          `<b>2.</b> Otherwise <b>branch</b> on a fractional variable (the lecture picks the variable with the <b>largest fractional part</b>): if x1 = 2.75, create two sub-problems by adding <b>x1 ≤ 2</b> and <b>x1 ≥ 3</b>. The strip 2 < x1 < 3 is removed.`,
          `<b>3.</b> Solve each sub-problem graphically (each new constraint is a vertical or horizontal line).`,
          `<b>4.</b> A node is <b>fathomed</b> (stop branching) when: its solution is integer (it becomes the incumbent if better), it is <b>infeasible</b>, or its Z is not better than the best integer Z found so far.`,
          `<b>5.</b> Keep branching on fractional nodes until no live node remains. The best integer solution found is optimal.`,
          `Note "x ≥ y and x ≤ y ⇒ x = y": if a branch adds x1 ≥ 3 on top of x1 ≤ 3, then x1 = 3 is a line.`
        ]},
        { h: `Sheet 2 / Final 2021/22 Q4: Max Z = 40x1 + 30x2; 10x1 + 6x2 ≤ 35; x1 + x2 ≤ 4`, formula: [
          `LP: corners (0,0)=0, (3.5,0)=140, (2.75,1.25)=147.5, (0,4)=120 → node 1: x1 = 2.75, x2 = 1.25, Z = 147.5`,
          `Branch on x1:`,
          `  Node 2 (x1 ≤ 2): corners (2,0)=80, (2,2)=140, (0,4)=120 → x1 = 2, x2 = 2, Z = 140  INTEGER (incumbent)`,
          `  Node 3 (x1 ≥ 3): corners (3,0)=120, (3.5,0)=140, (3, 5/6)=145 → x1 = 3, x2 = 0.83, Z = 145 (> 140, keep branching)`,
          `    Node 4 (x1 ≥ 3, x2 ≥ 1): 10(3) + 6(1) = 36 > 35 → INFEASIBLE`,
          `    Node 5 (x1 ≥ 3, x2 ≤ 0): (3.5, 0), Z = 140 → not better than 140 (further branches give (3,0) = 120, x1 ≥ 4 infeasible)`,
          `Optimal integer solution: x1 = 2, x2 = 2, Z = 140.`
        ]},
        { h: `Sheet 1 / Final Aug 2022/23 Q4: Max Z = 3x1 + 4x2; x1 + 3x2 ≤ 13; 5x1 + 2x2 ≤ 20`, formula: [
          `LP: (0, 4.33)=17.33, (4,0)=12, (2.615, 3.462)=21.69 → node 1 Z = 21.69`,
          `Node 2 (x1 ≥ 3): (3, 2.5), Z = 19.  Node 3 (x1 ≤ 2): (2, 3.667), Z = 20.67`,
          `Node 3 → x2 ≤ 3: (2,3), Z = 18 (integer).  x2 ≥ 4: (1,4), Z = 19 (integer, best so far)`,
          `Node 2 → x2 ≤ 2: (3.2, 2), Z = 17.6 < 19 (prune).  x2 ≥ 3: infeasible`,
          `Optimal: x1 = 1, x2 = 4, Z = 19.`
        ]},
        { h: `More solved branch-and-bound problems`, table: [
          [`Problem`, `LP relaxation`, `Branches`, `Integer optimum`],
          [`Final 2022/23 Jan: Max 80x1 + 45x2; x1 + x2 ≤ 7; 12x1 + 5x2 ≤ 60; x1 ≥ 4; x2 ≤ 2`, `(25/6, 2), Z = 423.33`, `x1 ≤ 4 → (4,2) Z = 410; x1 ≥ 5 → (5,0) Z = 400`, `(4, 2), Z = 410`],
          [`Final 2019/20 & section ex. 2: Max 20x1 + 30x2; 3x1 + 6x2 ≤ 40; 10x1 + 5x2 ≤ 50; x2 ≥ 6; x1 ≤ 1`, `(1, 37/6 = 6.17), Z = 205`, `x2 ≤ 6 → (1,6) Z = 200; x2 ≥ 7 infeasible`, `(1, 6), Z = 200`],
          [`Final 2025/26: Max 100X + 150Y; 8000X + 4000Y ≤ 40000; 15X + 30Y ≤ 200; Y ≥ 6; X ≤ 1`, `(1, 37/6), Z = 1025`, `Y ≤ 6 → (1,6) Z = 1000; Y ≥ 7 infeasible (15X + 210 > 200)`, `X = 1, Y = 6, Z = 1000`],
          [`Final 2024/25: Max 3x1 + 12x2; 2x1 + 4x2 ≤ 7; 5x1 + 3x2 ≤ 15; x2 ≤ 1`, `(1.5, 1), Z = 16.5`, `x1 ≤ 1 → (1,1) Z = 15; x1 ≥ 2 → (2, 0.75) Z = 15 → x2 ≤ 0 → (3,0) Z = 9, x2 ≥ 1 infeasible`, `(1, 1), Z = 15`],
          [`Section ex. 1: Max 8x1 + 5x2; 9x1 + 5x2 ≤ 45; x1 + x2 ≤ 6`, `(3.75, 2.25), Z = 41.25`, `x1 ≤ 3 → (3,3) 39; x1 ≥ 4 → (4, 1.8) 41 → x2 ≤ 1 → (4.44, 1) 40.56 → x1 ≤ 4: (4,1) 37, x1 ≥ 5: (5,0) 40; x2 ≥ 2 infeasible`, `(5, 0), Z = 40`],
          [`Section ex. 3: Max 5x1 + 2x2; 10x1 + 5x2 ≤ 16`, `(1.6, 0), Z = 8`, `x1 ≥ 2 infeasible; x1 ≤ 1 → (1, 1.2) 7.4 → x2 ≤ 1: (1,1) 7; x2 ≥ 2: (0.6, 2) 7 → ... (0,3) 6`, `(1, 1), Z = 7`],
          [`Sheet 1 (2022/23) Q1: Max 3x1 + 4x2; 2x1 + x2 ≤ 6; 2x1 + 3x2 ≤ 9; x2 ≥ 2; x1 ≤ 1; integer`, `(1, 7/3), Z = 12.33`, `x2 ≤ 2 → (1,2) 11; x2 ≥ 3 → (0,3) 12`, `(0, 3), Z = 12`]
        ]}
      ],
      cards: [
        [`Integer programming problem`, `An optimization problem with integer decision variables.`],
        [`LP relaxation`, `The LP obtained by omitting all integer or 0-1 constraints.`],
        [`Pure IP`, `All variables must be integers.`],
        [`Mixed IP`, `Only some variables must be integers.`],
        [`0-1 (binary) IP`, `All variables must equal 0 or 1.`],
        [`Branching on x1 = 2.75`, `Sub-problems with x1 ≤ 2 and x1 ≥ 3.`],
        [`Which variable to branch on (lecture)`, `The one with the largest fractional part.`],
        [`When is a node fathomed?`, `Integer solution, infeasible, or Z not better than the incumbent.`],
        [`Role of the LP relaxation Z in a max problem`, `Upper bound on the integer optimum.`],
        [`Sheet 2 B&B answer`, `x1 = 2, x2 = 2, Z = 140.`],
        [`Sheet 1 B&B answer`, `x1 = 1, x2 = 4, Z = 19.`],
        [`2022/23 Jan B&B answer`, `x1 = 4, x2 = 2, Z = 410.`],
        [`2019/20 B&B answer`, `x1 = 1, x2 = 6, Z = 200.`],
        [`2025/26 B&B answer`, `X = 1, Y = 6, Z = 1000.`],
        [`Why not round the LP solution?`, `It may be infeasible or not optimal.`]
      ],
      qa: [
        [`What is the difference between pure, mixed, and binary integer programming problems? (Final 2019/20)`, `Pure: every decision variable must be an integer. Mixed: only some of the variables are required to be integers, the others may be continuous. Binary (0-1): every variable must equal 0 or 1 (yes/no decisions).`],
        [`Define integer programming and linear programming relaxation.`, `Integer programming is an optimization problem with integer decision variables. The LP relaxation is the linear program obtained by omitting all integer or 0-1 constraints on the variables; its optimum bounds the integer optimum (upper bound for max).`],
        [`Describe the branch and bound method.`, `Solve the LP relaxation. If a variable is fractional (e.g. x1 = 2.75), branch into two sub-problems with x1 ≤ 2 and x1 ≥ 3. Solve each; stop a branch when it is infeasible, gives an integer solution, or its Z cannot beat the best integer solution. Continue until no branch remains; the best integer solution is optimal.`],
        [`Solve by branch and bound: Max Z = 40x1 + 30x2, 10x1 + 6x2 ≤ 35, x1 + x2 ≤ 4, integer.`, `LP: (2.75, 1.25), Z = 147.5. x1 ≤ 2: (2,2), Z = 140 (integer). x1 ≥ 3: (3, 0.83), Z = 145; then x2 ≥ 1 infeasible and x2 ≤ 0 gives (3.5,0), Z = 140 which cannot improve (then (3,0) = 120). Optimum x1 = 2, x2 = 2, Z = 140.`],
        [`Solve by branch and bound: Max Z = 3x1 + 4x2, x1 + 3x2 ≤ 13, 5x1 + 2x2 ≤ 20, integer.`, `LP: (2.615, 3.462), Z = 21.69. x1 ≤ 2: (2, 3.667), Z = 20.67 → x2 ≤ 3: (2,3), Z = 18; x2 ≥ 4: (1,4), Z = 19. x1 ≥ 3: (3, 2.5), Z = 19 → x2 ≤ 2: (3.2, 2), Z = 17.6; x2 ≥ 3 infeasible. Optimum x1 = 1, x2 = 4, Z = 19.`]
      ],
      quiz: [
        { q: `"An integer programming in which only some of the variables are required to be integers is called a ............ integer programming problem."`, o: [
          [`mixed`, `Correct. Revision 1: an integer program in which only some of the variables are required to be integers is a mixed integer programming problem (L6, Types of IP).`],
          [`pure`, `A pure integer program requires ALL decision variables to be integers; 'only some' describes a mixed IP.`],
          [`binary`, `A binary (0-1) program restricts all variables to 0 or 1; it is not the case where only some must be integers.`],
          [`relaxed`, `The relaxation drops the integer constraints altogether.`]
        ], a: 0, src: `Revision sheet` },
        { q: `"............ problem is an optimization problem with integer decision variables."`, o: [
          [`Linear programming`, `In an ordinary LP the decision variables are continuous (any real value ≥ 0); integer variables make it an integer program.`],
          [`Integer programming`, `Correct. Revision 1: an integer programming problem is an optimization problem with integer decision variables (pure, mixed or 0-1) (L6).`],
          [`Linear programming relaxation`, `The relaxation removes the integer requirement.`],
          [`Dynamic programming`, `Dynamic programming optimizes multistage decision problems (L9); it is not defined by integer decision variables.`]
        ], a: 1, src: `Revision sheet` },
        { q: `True or False: "The linear programming problem by omitting all integer or 0-1 constraints on variables is called the linear programming relaxation."`, o: [
          [`True`, `Correct. Definition 22 in Revision 1. (One student's marked paper shows ✗, which is wrong.)`],
          [`False`, `False would reject Revision 1's definition 22: dropping all integer or 0-1 constraints from an IP gives its LP relaxation.`]
        ], a: 0, src: `Exam 2022/23 August` },
        { q: `True or False: "Linear programming relaxation problem is an optimization problem with integer decision variables."`, o: [
          [`True`, `That defines the integer programming problem.`],
          [`False`, `Correct. The relaxation omits the integer constraints.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `True or False: "In a pure integer model, some solution values for decision variables are integer and others can be non-integer."`, o: [
          [`True`, `Some integer and some non-integer values describes a MIXED integer model; in a pure integer model every variable is integer.`],
          [`False`, `Correct. Pure = all variables integer; "some" = mixed.`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `Match: "Linear programming relaxation" ...`, o: [
          [`is the linear programming problem by omitting all integer or 0-1 constraints on variables`, `Correct. The LP relaxation is the IP with all integer or 0-1 constraints omitted; branch and bound solves it first (L6; 2023/24 matching 4 → C).`],
          [`are any points outside the feasible region`, `Points outside the feasible region are infeasible solutions (L2), not the LP relaxation.`],
          [`cannot be started until one of other activities is completed`, `An activity that cannot start until another is completed is a successor activity (L7, CPM).`],
          [`must be completed immediately prior to start of another activity`, `An activity that must be completed immediately before another starts is a predecessor activity (L7, CPM).`]
        ], a: 0, src: `Exam 2023/24 (3rd year)` },
        { q: `Match: "Mixed linear programming" ...`, o: [
          [`an integer programming in which only some of the variables are required to be integers`, `Correct. A mixed integer program is one in which only some of the variables are required to be integers (L6; 2023/24 matching 3 → B).`],
          [`the common region determined by all constraints`, `The common region determined by all constraints is the feasible region of the graphical method (L2).`],
          [`the initial allocation to the lowest-cost cell`, `Allocating first to the lowest-cost cell is the minimum (least) cost method of the transportation problem (L4).`],
          [`combinations of interrelated activities`, `A combination of interrelated activities is the definition of a project (L7), not of mixed IP.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `Max Z = 40x1 + 30x2; 10x1 + 6x2 ≤ 35; x1 + x2 ≤ 4; integer. The optimal integer solution is:`, o: [
          [`x1 = 3, x2 = 0, Z = 120`, `Feasible but (2,2) gives more. (One student key stopped here, wrongly.)`],
          [`x1 = 2, x2 = 2, Z = 140`, `Correct. Node x1 ≤ 2 gives (2,2) = 140, and the other branch cannot exceed 140 with integers.`],
          [`x1 = 2.75, x2 = 1.25, Z = 147.5`, `(2.75, 1.25) with Z = 147.5 is the LP relaxation (the root node); its variables are fractional, so it is not an integer solution.`],
          [`x1 = 3, x2 = 1, Z = 150`, `(3, 1) is the rounded LP point, but 10(3) + 6(1) = 36 > 35, so it is infeasible.`]
        ], a: 1, src: `Exam 2021/22` },
        { q: `Max Z = 80x1 + 45x2; x1 + x2 ≤ 7; 12x1 + 5x2 ≤ 60; x1 ≥ 4; x2 ≤ 2; integer. The optimum is:`, o: [
          [`(25/6, 2), Z = 423.33`, `(25/6, 2) is the LP relaxation (root node); x1 = 4.17 is fractional, so branching on x1 is still needed.`],
          [`(5, 0), Z = 400`, `(5, 0) is feasible (12 × 5 = 60) but Z = 400 is less than 410 at (4, 2).`],
          [`(4, 2), Z = 410`, `Correct. Root LP gives (25/6, 2); branch x1 ≤ 4 gives (4, 2) with 4 + 2 ≤ 7 and 48 + 10 = 58 ≤ 60, Z = 320 + 90 = 410; x1 ≥ 5 gives at most 400 (L6).`],
          [`(4, 0), Z = 320`, `(4, 0) is feasible but Z = 320 is far below 410; x2 can still be raised to 2 at x1 = 4.`]
        ], a: 2, src: `Exam 2022/23 January` },
        { q: `If the LP relaxation gives x1 = 2.75, branching creates the two sub-problems:`, o: [
          [`x1 ≤ 2 and x1 ≥ 3`, `Correct. The fractional strip 2 < x1 < 3 is removed.`],
          [`x1 ≤ 2.75 and x1 ≥ 2.75`, `x1 ≤ 2.75 and x1 ≥ 2.75 both keep the fractional point; branching must cut out the strip 2 &lt; x1 &lt; 3.`],
          [`x1 = 2 and x1 = 3 only`, `Branches are inequalities (x1 ≤ 2 and x1 ≥ 3), so each sub-problem keeps all integer values on its side, not just one.`],
          [`x2 ≤ 2 and x2 ≥ 3`, `Branching is done on the fractional variable, here x1 = 2.75, not on x2.`]
        ], a: 0 },
        { q: `A branch-and-bound node can be fathomed (no further branching) when:`, o: [
          [`Its LP solution is integer, it is infeasible, or its Z is not better than the best integer Z so far`, `Correct. A node is fathomed when its LP solution is all-integer (a candidate), when it is infeasible, or when its Z cannot beat the best integer Z found so far (L6, Branch and bound).`],
          [`Its Z is larger than the incumbent`, `Then it may still contain a better integer point; keep branching.`],
          [`It has a fractional variable`, `A fractional variable is exactly the reason to branch further (split on it), unless the node's Z is already dominated.`],
          [`Only when it is infeasible`, `Integer or dominated nodes are also fathomed.`]
        ], a: 0 },
        { q: `Final 2025/26: Max Z = 100X + 150Y; 8000X + 4000Y ≤ 40000; 15X + 30Y ≤ 200; Y ≥ 6; X ≤ 1. The integer optimum is:`, o: [
          [`X = 1, Y = 6.17, Z = 1025`, `(1, 6.17) with Z = 1025 is the LP relaxation; Y is fractional, so it must be branched into Y ≤ 6 and Y ≥ 7.`],
          [`X = 1, Y = 6, Z = 1000`, `Correct. Branch Y ≤ 6 gives (1,6); Y ≥ 7 is infeasible (15 + 210 > 200).`],
          [`X = 0, Y = 6, Z = 900`, `(0, 6) is feasible but Z = 150 × 6 = 900 is less than 1000 at (1, 6).`],
          [`X = 1, Y = 7, Z = 1150`, `(1, 7) violates 15X + 30Y ≤ 200: 15 + 210 = 225 > 200, so the branch Y ≥ 7 is infeasible.`]
        ], a: 1, src: `Exam 2025/26` }
      ]
    },
    /* ───────────────────────── LECTURE 7 ───────────────────────── */
    {
      n: 7, title: `Project Scheduling: CPM (Critical Path Method)`,
      notes: [
        { h: `Project terms (Revision 1 definitions)`, table: [
          [`Term`, `Definition`],
          [`Project`, `Combinations of interrelated activities which are executed in a certain order before the entire task can be completed.`],
          [`Activity`, `A job in the project, requiring time and resources for its completion.`],
          [`Predecessor activity`, `Must be completed immediately prior to the start of another activity.`],
          [`Successor activity`, `Cannot be started until one of other activities is completed.`],
          [`Start activity`, `Has no predecessor.`],
          [`Dummy activity`, `Does not consume any kind of resources but merely depicts the technological dependence (dashed arrow, duration 0).`],
          [`Path in a network`, `A continuous sequence consisting of nodes and activities alternately, beginning with the start event and stopping at the end event of the network.`],
          [`Critical path method (CPM)`, `Aims at the determination of the time to complete a project and the important activities on which a manager shall focus attention.`],
          [`Critical activity`, `An activity that cannot be delayed (total float = 0).`],
          [`Project completion time`, `The time required to complete all the activities from the start event to the end event of the project in the specified sequence (= length of the critical path).`],
          [`Total float`, `The amount of time the completion time of an activity can be delayed without affecting the project completion.`],
          [`Free float`, `The amount of time the activity completion time can be delayed without affecting the earliest start time of immediate successor activities.`],
          [`CPM vs PERT`, `CPM: one time estimate per activity, no allowance for uncertainty (time is deterministic). PERT: three time estimates (time is probabilistic).`]
        ]},
        { h: `Constructing the CPM network (section rules)`, pts: [
          `Tasks asked: construct the network; determine the critical path and completion time; earliest and latest times; total floats; critical and non-critical activities.`,
          `Activities with no predecessor leave the <b>single start node</b>; activities that are nobody's predecessor enter the <b>single end node</b>.`,
          `Activities that share the same predecessors start from the same node (e.g. D, E, F all after C leave C's end node).`,
          `Two activities may <b>not</b> have the same start node and the same end node: separate them with an extra node and a <b>dummy</b>.`,
          `Use a dummy when an activity depends on only part of a group (e.g. F after C only, but D after A and C): connect with a dashed dummy arrow.`
        ]},
        { h: `Time formulas`, formula: [
          `Forward pass:  ES (start node) = 0;  ES(activity) = max EF of its predecessors;  EF = ES + D`,
          `Backward pass: LF (end node) = project completion time T;  LF(activity) = min LS of its successors;  LS = LF − D`,
          `Total float TF = LS − ES = LF − EF          Free float FF = min ES(successors) − EF`,
          `Critical activity: TF = 0 (ES = LS and EF = LF). Critical path: the longest path, made of critical activities.`,
          `Section node test: an activity is critical when the boxes (ES) and triangles (LF) at both its nodes are equal AND (LF of head − ES of tail) = its duration.`
        ]},
        { h: `Worked example (Final 2019/20, section): A 15; B 17 (A); C 21 (A); D 19 (B); E 22 (B); F 18 (C, D); G 15 (E, F)`, table: [
          [`Activity`, `D`, `ES`, `EF`, `LS`, `LF`, `Total float`],
          [`A`, `15`, `0`, `15`, `0`, `15`, `0`],
          [`B`, `17`, `15`, `32`, `15`, `32`, `0`],
          [`C`, `21`, `15`, `36`, `30`, `51`, `15`],
          [`D`, `19`, `32`, `51`, `32`, `51`, `0`],
          [`E`, `22`, `32`, `54`, `47`, `69`, `15`],
          [`F`, `18`, `51`, `69`, `51`, `69`, `0`],
          [`G`, `15`, `69`, `84`, `69`, `84`, `0`]
        ]},
        { h: `Example result`, formula: [
          `Paths: A-B-E-G = 69;  A-B-D-F-G = 84;  A-C-F-G = 69`,
          `Critical path A-B-D-F-G, project completion time = 84 months`,
          `Critical activities: A, B, D, F, G.  Non-critical: C, E (float 15 each).`,
          `ES of F = max(EF of C = 36, EF of D = 51) = 51 (node with two incoming arrows takes the MAX).`,
          `LF of B = min(LS of D = 32, LS of E = 47) = 32 (node with two outgoing arrows takes the MIN).`
        ]},
        { h: `Section example: A 5; B 7 (A); C 10 (A); D 2 (B); E 8 (C); F 10 (C); G 5 (D, E, F); H 3 (G)`, formula: [
          `Paths: A-B-D-G-H = 22;  A-C-E-G-H = 31;  A-C-F-G-H = 33  → project time 33`,
          `Critical: A, C, F, G, H.  Floats: B = 11, D = 11, E = 2.`
        ]},
        { h: `Final 2024/25 (days): A 6; G 2; J 13; B 4 (A); C 7 (B); D 2 (A); E 4 (D); F 10 (E); H 10 (G); I 6 (J, H); K 9 (A); L 3 (C, K); M 5 (I, L)`, table: [
          [`Act.`, `ES`, `EF`, `LS`, `LF`, `TF`],
          [`A`, `0`, `6`, `0`, `6`, `0`],
          [`G`, `0`, `2`, `2`, `4`, `2`],
          [`J`, `0`, `13`, `1`, `14`, `1`],
          [`B`, `6`, `10`, `6`, `10`, `0`],
          [`C`, `10`, `17`, `10`, `17`, `0`],
          [`D`, `6`, `8`, `9`, `11`, `3`],
          [`E`, `8`, `12`, `11`, `15`, `3`],
          [`F`, `12`, `22`, `15`, `25`, `3`],
          [`H`, `2`, `12`, `4`, `14`, `2`],
          [`I`, `13`, `19`, `14`, `20`, `1`],
          [`K`, `6`, `15`, `8`, `17`, `2`],
          [`L`, `17`, `20`, `17`, `20`, `0`],
          [`M`, `20`, `25`, `20`, `25`, `0`]
        ]},
        { h: `Final 2024/25 result`, formula: [
          `Critical path A-B-C-L-M = 6 + 4 + 7 + 3 + 5 = 25 days (other paths: J-I-M 24, G-H-I-M 23, A-K-L-M 23, A-D-E-F 22)`,
          `Critical: A, B, C, L, M.  Non-critical: G, J, D, E, F, H, I, K.`
        ]},
        { h: `Final 2023/24 (3rd yr): A 3; B 3 (A); C 3 (A); D 5 (C); E 6 (B, C); F 9 (D, E); G 5 (E); H 3 (G); I 5 (G, F); J 6 (I, H); K 4 (J)`, formula: [
          `ES: A 0, B 3, C 3, D 6, E 6, F 12, G 12, H 17, I 21, J 26, K 32 → T = 36`,
          `TF: A 0, B 0, C 0, D 1, E 0, F 0, G 4, H 6, I 0, J 0, K 0`,
          `Critical activities: A, B, C, E, F, I, J, K.  Non-critical: D, G, H.`,
          `Critical paths: A-B-E-F-I-J-K = 36 and A-C-E-F-I-J-K = 36 (two critical paths).`
        ]},
        { h: `Final 2023/24 (2nd yr): A 5; B 5; C 2 (B); D 2 (A, C); E 3 (A, C); F 1 (A, C); G 2 (B); H 7 (B); I 13 (E); J 6 (E, D); K 4 (F, G, H); L 5 (H); M 5 (J, K, L)`, formula: [
          `ES: A 0, B 0, C 5, D 7, E 7, F 7, G 5, H 5, I 10, J 10, K 12, L 12, M 17`,
          `Ends: I finishes at 23, M at 22 → T = 23`,
          `TF: A 2, B 0, C 0, D 3, E 0, F 6, G 7, H 1, I 0, J 2, K 2, L 1, M 1`,
          `Critical path B-C-E-I = 5 + 2 + 3 + 13 = 23. Critical: B, C, E, I.`
        ]}
      ],
      cards: [
        [`Project`, `Combinations of interrelated activities executed in a certain order before the entire task can be completed.`],
        [`Activity`, `A job requiring time and resources for its completion.`],
        [`Predecessor activity`, `Must be completed immediately prior to the start of another activity.`],
        [`Successor activity`, `Cannot be started until one of other activities is completed.`],
        [`Start activity`, `Has no predecessor.`],
        [`Dummy activity`, `Consumes no resources; merely depicts technological dependence.`],
        [`Path in a network`, `Continuous sequence of nodes and activities alternately, from the start event to the end event.`],
        [`CPM aim`, `Determine the time to complete a project and the important activities a manager should focus on.`],
        [`Critical activity`, `Cannot be delayed; total float = 0.`],
        [`Total float`, `Delay of an activity's completion that does not affect project completion (LS − ES).`],
        [`Free float`, `Delay that does not affect the earliest start of immediate successors.`],
        [`Project completion time`, `Time to complete all activities from start to end event = longest path.`],
        [`EF`, `ES + duration.`],
        [`LS`, `LF − duration.`],
        [`ES at a merge node`, `Maximum EF of incoming activities.`],
        [`LF at a burst node`, `Minimum LS of outgoing activities.`],
        [`CPM time estimate`, `One estimate; deterministic.`],
        [`2019/20 CPM answer`, `Critical path A-B-D-F-G, 84 months.`]
      ],
      qa: [
        [`What is meant by a predecessor activity? (Final 2019/20)`, `A predecessor activity must be completed immediately prior to the start of another activity. (Its counterpart, a successor activity, cannot be started until one of other activities is completed.)`],
        [`What is meant by a path in a network? (Final 2023/24)`, `A path in a network is a continuous sequence consisting of nodes and activities alternately, beginning with the start event and stopping at the end event of the network.`],
        [`Define total float and free float and give the formulas.`, `Total float: the time an activity's completion can be delayed without affecting the project completion, TF = LS − ES = LF − EF. Free float: the time an activity's completion can be delayed without affecting the earliest start time of its immediate successors, FF = min ES(successors) − EF.`],
        [`State the rules for drawing a CPM network.`, `One start node (activities without predecessors leave it) and one end node (activities that precede nothing enter it). Each activity is an arrow between two nodes; activities with the same predecessors leave the same node. Two activities cannot share both start and end nodes: insert a node and a dummy. Use dummies (zero duration, no resources) to show dependence on part of a group.`],
        [`For A 15; B 17 (A); C 21 (A); D 19 (B); E 22 (B); F 18 (C, D); G 15 (E, F), find the critical path and the floats.`, `Forward pass: A 0–15, B 15–32, C 15–36, D 32–51, E 32–54, F 51–69, G 69–84. Backward: G 69–84, F 51–69, E 47–69, D 32–51, C 30–51, B 15–32, A 0–15. Floats: C 15, E 15, others 0. Critical path A-B-D-F-G = 84.`],
        [`Distinguish CPM from PERT.`, `CPM uses a single (deterministic) time estimate per activity, with no allowance for uncertainty. PERT uses three estimates (optimistic, most likely, pessimistic) and treats time as probabilistic, allowing the probability of finishing by a date to be computed.`]
      ],
      quiz: [
        { q: `"............ does not consume any kind of resources but merely depicts the technological dependence."`, o: [
          [`Successor activity`, `A successor cannot start until another activity is completed.`],
          [`Dummy activity`, `Correct. A dummy activity (dashed arrow, zero time) consumes no resources and merely depicts a technological dependence between activities (L7, Network terms).`],
          [`Predecessor activity`, `A predecessor must finish immediately before another activity.`],
          [`Critical activity`, `A critical activity lies on the critical path and has zero float; it takes real time and resources, unlike a dummy.`]
        ], a: 1, src: `Revision sheet` },
        { q: `"............ is the amount of time that the completion time of an activity can be delayed without affecting the project completion."`, o: [
          [`Free float`, `Free float protects the earliest start of immediate successors.`],
          [`Project completion time`, `The project completion time is the length of the longest (critical) path, the time to finish all activities, not a delay allowance.`],
          [`Total float`, `Correct. Total float = LS − ES = LF − EF: how long an activity's completion can be delayed without delaying the whole project (L7, Floats).`],
          [`Dummy activity`, `A dummy activity is a zero-time arrow that only shows dependence; it is not an amount of time.`]
        ], a: 2, src: `Revision sheet` },
        { q: `True or False: "Total floats is the amount of time that the completion time of an activity can be delayed without affecting the project completion."`, o: [
          [`True`, `Correct. This is the lecture's definition of total float (TF = LF − EF): the delay an activity can take without delaying project completion (L7, Floats).`],
          [`False`, `False would reject the lecture's definition of total float, which protects the project completion time (free float protects successors' ES).`]
        ], a: 0, src: `Exam 2022/23 August` },
        { q: `True or False: "predecessor activity cannot be started until one of other activities is completed."`, o: [
          [`True`, `'Cannot be started until another activity is completed' defines a SUCCESSOR; a predecessor must be completed immediately before another starts.`],
          [`False`, `Correct. A predecessor must be completed immediately prior to the start of another activity.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `True or False: "Free float is the amount of time that the activity completion time can be delayed without affecting the earliest start time of immediate successor activities in the network."`, o: [
          [`True`, `Correct. Free float = ES of the immediate successors − EF of the activity: the delay allowed without affecting any successor's earliest start (L7, Floats).`],
          [`False`, `False would reject the lecture's definition of free float, which is measured against the earliest start of immediate successors.`]
        ], a: 0, src: `Revision sheet` },
        { q: `True or False: "An operations research defines as combinations of interrelated activities which executed in a certain order before the entire task can be completed."`, o: [
          [`True`, `'Combinations of interrelated activities executed in a certain order' defines a PROJECT; operations research is about scientifically designing and operating man-machine systems.`],
          [`False`, `Correct. That is the definition of a <b>project</b>.`]
        ], a: 1, src: `Revision sheet` },
        { q: `True or False: "Critical path method defines as combinations of interrelated activities which executed in a certain order before the entire task can be completed."`, o: [
          [`True`, `The quoted sentence defines a PROJECT; CPM is the method that finds the project time and the critical activities.`],
          [`False`, `Correct. CPM aims at determining project time and the important activities.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `True or False: "Start activity which does not consume any kind of resources but merely depicts the technological dependence."`, o: [
          [`True`, `Consuming no resources and only showing dependence defines a DUMMY activity; a start activity is one with no predecessor.`],
          [`False`, `Correct. A start activity has no predecessor; the quoted sentence defines a dummy.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `True or False: "Dummy activity must be completed immediately prior to start of another activity."`, o: [
          [`True`, `'Must be completed immediately prior to the start of another' defines a PREDECESSOR; a dummy takes no time and only shows dependence.`],
          [`False`, `Correct. A dummy consumes no resources and only shows dependence.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `True or False: "Successor activity cannot be started until one of other activities is completed."`, o: [
          [`True`, `Correct. A successor activity cannot be started until one or more other activities (its predecessors) are completed (L7, Network terms).`],
          [`False`, `False would reject the lecture's definition: a successor is exactly the activity that waits for others to be completed.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `True or False: "Path in a network is a continuous, consisting of nodes and activities alternatively, beginning with the start event and stopping at the end event of a network."`, o: [
          [`True`, `Correct. A path is a continuous sequence of nodes and activities, alternately, from the start event to the end event of the network (L7, Network terms).`],
          [`False`, `False would reject the lecture's definition of a path: an unbroken chain of nodes and activities from the start event to the end event.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `True or False: "Critical path method aims at the determination of the time to complete a project and the important activities on which a manager shall focus attention."`, o: [
          [`True`, `Correct. Revision 1 definition 31: CPM aims to determine the project completion time and the important (critical) activities the manager should focus on (L7).`],
          [`False`, `False would reject Revision 1's definition: CPM determines the completion time and the critical activities that need attention.`]
        ], a: 0, src: `Revision sheet` },
        { q: `True or False: "The easiest path within a network diagram is called critical path."`, o: [
          [`True`, `The critical path is the LONGEST path through the network; its length fixes the project completion time, so it is not the 'easiest'.`],
          [`False`, `Correct. The critical path is the <b>longest</b> path (it fixes the completion time).`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `True or False: "The time by which the activity completion time can be delayed without affecting the start of succeeding activities is known as total float."`, o: [
          [`True`, `Delay without affecting the start of succeeding activities is FREE float; total float is measured against the project completion time.`],
          [`False`, `Correct. Delay without affecting successors' start = free float; total float protects the project completion.`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `True or False: "CPM is an abbreviation used in project management to represent the critical path method."`, o: [
          [`True`, `Correct. CPM stands for Critical Path Method, the project-scheduling technique that finds the critical path and the project duration (L7).`],
          [`False`, `False is wrong: in project management CPM is exactly the Critical Path Method taught in L7.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `2024/25 project (A 6; G 2; J 13; B 4 (A); C 7 (B); D 2 (A); E 4 (D); F 10 (E); H 10 (G); I 6 (J,H); K 9 (A); L 3 (C,K); M 5 (I,L)). "The critical activities are A, B, C, L and M."`, o: [
          [`True`, `Correct. A-B-C-L-M = 25 is the longest path; all five have zero float.`],
          [`False`, `False is wrong: the forward and backward passes give TF = 0 for A, B, C, L and M, the longest path A-B-C-L-M = 25.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `Same 2024/25 project. "The total project completion time is 25 days."`, o: [
          [`True`, `Correct. The longest path is A-B-C-L-M = 6 + 4 + 7 + 3 + 5 = 25 days, so EF(M) = 25 is the completion time (L7, forward pass).`],
          [`False`, `False is wrong: A-B-C-L-M = 25 is the longest path; other paths such as J-I-M (24) or A-D-E-F (22) are shorter.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `Same 2024/25 project. "Latest finish time for activities A, G and J are equal."`, o: [
          [`True`, `They all START at 0 (ES), but their LFs differ.`],
          [`False`, `Correct. A, G, J all have ES = 0, but the backward pass gives LF(A) = 6, LF(G) = LS(H) = 4, LF(J) = LS(I) = 14, so they differ (L7).`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `Same 2024/25 project. "Earliest start time for activity E is equal to 8."`, o: [
          [`True`, `Correct. E's only predecessor is D: ES(D) = EF(A) = 6, EF(D) = 6 + 2 = 8, so ES(E) = 8 (L7, forward pass).`],
          [`False`, `False is wrong: E follows only D, and EF(D) = ES(D) + 2 = 6 + 2 = 8, so ES(E) = 8.`]
        ], a: 0, src: `Exam 2024/25` },
        { q: `Same 2024/25 project. "Latest finish time for activity K is equal 9."`, o: [
          [`True`, `9 is K's duration; its EF is 6 + 9 = 15 and its LF = LS(L) = 17, so 'LF = 9' is wrong.`],
          [`False`, `Correct. K's only successor is L with LS(L) = 20 − 3 = 17, so LF(K) = 17 (EF(K) = 15, TF = 2) (L7, backward pass).`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `Same 2024/25 project. "Latest finish time for activity M is equal to 20."`, o: [
          [`True`, `20 is M's ES (= LS), since M is critical; its LF equals the project completion time, 25.`],
          [`False`, `Correct. M is the last activity, so the backward pass starts with LF(M) = project time = 25 (ES = LS = 20) (L7).`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `2023/24 (3rd yr) project (A 3; B 3 (A); C 3 (A); D 5 (C); E 6 (B,C); F 9 (D,E); G 5 (E); H 3 (G); I 5 (G,F); J 6 (I,H); K 4 (J)). "The earliest time for activity F is 11."`, o: [
          [`True`, `11 is only EF(D); F also waits for E, which finishes at 12, and ES = the maximum EF of the predecessors.`],
          [`False`, `Correct. ES(F) = max(EF D = 11, EF E = 12) = 12.`]
        ], a: 1, src: `Exam 2023/24 (3rd year)` },
        { q: `Same 2023/24 (3rd yr) project. "The non-critical activities are C, D, G and H."`, o: [
          [`True`, `C is not non-critical: ES(C) = LS(C) = 3 (TF = 0) on A-C-E-F-I-J-K = 36. The non-critical ones are D (TF 1), G (4), H (6).`],
          [`False`, `Correct. C is critical (A-C-E-F-I-J-K = 36); the non-critical are D, G, H.`]
        ], a: 1, src: `Exam 2023/24 (3rd year)` },
        { q: `Same 2023/24 (3rd yr) project. "The project completion time is 36."`, o: [
          [`True`, `Correct. The longest path A-C-E-F-I-J-K = 3 + 3 + 6 + 9 + 5 + 6 + 4 = 36, so the project takes 36 (L7, forward pass).`],
          [`False`, `False is wrong: the forward pass gives EF(K) = 36, the length of the critical path A-C-E-F-I-J-K.`]
        ], a: 0, src: `Exam 2023/24 (3rd year)` },
        { q: `2023/24 (2nd yr) project (A 5; B 5; C 2 (B); D 2 (A,C); E 3 (A,C); F 1 (A,C); G 2 (B); H 7 (B); I 13 (E); J 6 (E,D); K 4 (F,G,H); L 5 (H); M 5 (J,K,L)). "The project completion time is 32."`, o: [
          [`True`, `The forward pass ends at EF(I) = 23; the longest path B-C-E-I = 5 + 2 + 3 + 13 = 23, not 32.`],
          [`False`, `Correct. Forward pass: C ends 7, E ends 10, I ends 10 + 13 = 23, while M ends only at 22, so the completion time is 23 via B-C-E-I (L7).`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `Same 2023/24 (2nd yr) project. "The critical activities are B, C, H, E and I."`, o: [
          [`True`, `H is not critical: ES(H) = 5, LS(H) = 6, so TF = 1 (path B-H-L-M = 22 &lt; 23). Only B, C, E, I have zero float.`],
          [`False`, `Correct. Only B, C, E and I have TF = 0 (path B-C-E-I = 23); H has TF = 1 because B-H-L-M is only 22 (L7).`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `Same 2023/24 (2nd yr) project. "The earliest start times for activities C, D and E are equal."`, o: [
          [`True`, `C follows only B, so ES(C) = 5; D and E wait for both A and C, so ES(D) = ES(E) = EF(C) = 7.`],
          [`False`, `Correct. ES(C) = EF(B) = 5, while D and E need both A (5) and C (7): ES(D) = ES(E) = max(5, 7) = 7, so the three are not equal (L7).`]
        ], a: 1, src: `Exam 2023/24` },
        { q: `Same 2023/24 (2nd yr) project. "The total float for activity B equals zero."`, o: [
          [`True`, `Correct. B starts the critical path B-C-E-I (23): ES(B) = LS(B) = 0, so TF(B) = 0 (L7).`],
          [`False`, `False is wrong: B lies on the critical path B-C-E-I, and every critical activity has zero total float.`]
        ], a: 0, src: `Exam 2023/24` },
        { q: `Match: "Project" ...`, o: [
          [`defines as combinations of interrelated activities which executed in a certain order before the entire task can be completed`, `Correct. A project is a combination of interrelated activities executed in a certain order before the entire task can be completed (L7; 2023/24 matching 4 → E).`],
          [`is the amount of time an activity can be delayed without affecting the project completion`, `The delay allowed without affecting project completion is the total float, not a project.`],
          [`the common region determined by all constraints`, `The common region determined by all constraints is the feasible region of LP (L2).`],
          [`an integer program where only some variables are integers`, `An integer program where only some variables are integers is a mixed IP (L6).`]
        ], a: 0, src: `Exam 2023/24` }
      ]
    },
    /* ───────────────────────── LECTURE 8 ───────────────────────── */
    {
      n: 8, title: `PERT (Project Evaluation and Review Technique)`,
      notes: [
        { h: `PERT idea and the three time estimates`, pts: [
          `<b>CPM</b>: time is <b>deterministic</b>, one time estimate per activity. <b>PERT</b>: time is <b>probabilistic</b>, three time estimates are possible for activities linking up two events.`,
          `<b>Optimistic time (O, t<sub>o</sub>)</b>: estimate under the <b>best</b> conditions (everything goes perfectly).`,
          `<b>Most likely time (M, t<sub>m</sub>)</b>: estimate under <b>normal</b> conditions.`,
          `<b>Pessimistic time (P, t<sub>p</sub>)</b>: estimate under the <b>worst</b> conditions.`,
          `Typical questions: construct the network; expected duration and variance of each activity; critical path and project completion time; probability of completing the project on or before a date.`
        ]},
        { h: `PERT formulas`, formula: [
          `Expected duration:   E(Dij) = te = (to + 4 tm + tp) / 6`,
          `Variance:            σ² = ((tp − to) / 6)²`,
          `Project mean μ = sum of te on the critical path (= project completion time)`,
          `Project variance σ² = sum of the variances of the CRITICAL activities only;  σ = √σ²`,
          `z = (X − μ) / σ,  where X is the target date given in the question`,
          `"in / on / before X" → P(T ≤ X);  "after X" → P(T ≥ X)`,
          `Table gives area from 0 to z:  z > 0 → P(T ≤ X) = 0.5 + area;  z < 0 → P(T ≤ X) = 0.5 − area`
        ]},
        { h: `Lecture example: expected times and variances`, table: [
          [`Act.`, `Pred.`, `O`, `M`, `P`, `te`, `σ²`],
          [`A`, `-`, `5`, `6`, `7`, `6`, `0.11`],
          [`B`, `-`, `1`, `3`, `5`, `3`, `0.44`],
          [`C`, `-`, `1`, `4`, `7`, `4`, `1`],
          [`D`, `A`, `1`, `2`, `3`, `2`, `0.11`],
          [`E`, `B`, `1`, `2`, `9`, `3`, `1.78`],
          [`F`, `C`, `1`, `5`, `9`, `5`, `1.78`],
          [`G`, `C`, `2`, `2`, `8`, `3`, `1`],
          [`H`, `E, F`, `4`, `4`, `10`, `5`, `1`],
          [`I`, `D`, `2`, `5`, `8`, `5`, `1`],
          [`J`, `H, G`, `2`, `2`, `8`, `3`, `1`]
        ]},
        { h: `Lecture example: critical path and probability (on or before 22 weeks)`, formula: [
          `Paths: A-D-I = 13;  B-E-H-J = 14;  C-F-H-J = 4 + 5 + 5 + 3 = 17;  C-G-J = 10`,
          `Critical path C-F-H-J, project completion time μ = 17 weeks`,
          `σ² = 1 + 1.78 + 1 + 1 = 4.78,  σ = √4.78 = 2.19`,
          `P(X ≤ 22) = P(z ≤ (22 − 17)/2.19) = P(z ≤ 2.28) = 0.5 + 0.4887 = 0.9887 (about 98.9%)`
        ]},
        { h: `Final 2021/22 & Revision: construction project, two years (104 weeks)`, table: [
          [`Act.`, `Pred.`, `O`, `M`, `P`, `te`, `σ²`],
          [`A`, `-`, `7`, `16`, `28`, `16.5`, `12.25`],
          [`B`, `A`, `4`, `19`, `25`, `17.5`, `12.25`],
          [`C`, `A`, `10`, `16`, `37`, `18.5`, `20.25`],
          [`D`, `B`, `7`, `13`, `37`, `16`, `25`],
          [`E`, `B, C`, `13`, `19`, `33`, `20.33`, `11.11`],
          [`F`, `B`, `19`, `22`, `33`, `23.33`, `5.44`],
          [`G`, `D, E`, `4`, `7`, `19`, `8.5`, `6.25`],
          [`H`, `F, G`, `13`, `19`, `49`, `23`, `36`],
          [`I`, `B, C`, `13`, `25`, `37`, `25`, `16`],
          [`J`, `H, I`, `7`, `13`, `19`, `13`, `4`]
        ]},
        { h: `104-week answer`, formula: [
          `Paths: A-B-D-G-H-J = 94.5; A-B-E-G-H-J = 98.83; A-B-F-H-J = 93.33; A-B-I-J = 72; A-C-E-G-H-J = 99.83; A-C-I-J = 73`,
          `Critical path A-C-E-G-H-J, μ = 16.5 + 18.5 + 20.33 + 8.5 + 23 + 13 = 99.83 weeks`,
          `σ² = 12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86,  σ = 9.48`,
          `P(X ≤ 104) = P(z ≤ (104 − 99.83)/9.48) = P(z ≤ 0.44) = 0.5 + 0.1700 = 0.67`
        ]},
        { h: `Other PERT exam answers (verified)`, table: [
          [`Paper`, `Critical path, μ`, `σ² (σ)`, `Probability asked`],
          [`Sheet 1 / Aug 2022/23 (A–F)`, `A-C-D-F, 30`, `1 + 16 + 1 + 4 = 22 (σ = 4.69)`, `P(≤ 28): z = −0.43 → 0.5 − 0.1664 = 0.3336; P(≤ 34): z = 0.85 → 0.5 + 0.3023 = 0.8023`],
          [`Jan 2022/23 (bridge, A–E)`, `A-B-D-E, 29`, `1 + 1 + 5.44 + 1.78 = 9.22 (σ = 3.04)`, `P(≤ 36): z = 2.30 → 0.5 + 0.4893 = 0.9893`],
          [`Aug 2023/24 (A–I)`, `A-C-F-H, 33`, `1 + 4 + 1 + 0.44 = 6.44 (σ = 2.54)`, `P(≤ 32): z = −0.39 → 0.5 − 0.1517 = 0.3483; P(≤ 35): z = 0.79 → 0.7852`],
          [`Final 2025/26 (A–J)`, `A-B-D-G-I-J, 20`, `0.44 + 0.44 + 0.44 + 0.11 + 0.11 + 0.11 = 1.67 (σ = 1.29)`, `P(≤ 22): z = 1.55 → 0.5 + 0.4394 = 0.9394`]
        ]}
      ],
      cards: [
        [`PERT stands for`, `Project Evaluation and Review Technique.`],
        [`Optimistic time`, `Estimate under the best conditions.`],
        [`Most likely time`, `Estimate under normal conditions.`],
        [`Pessimistic time`, `Estimate under the worst conditions.`],
        [`Expected time te`, `(to + 4tm + tp) / 6.`],
        [`Activity variance`, `((tp − to) / 6)².`],
        [`Project variance`, `Sum of variances of the critical activities only.`],
        [`Project mean μ`, `Sum of expected times on the critical path.`],
        [`z value`, `(X − μ) / σ.`],
        [`"On or before X weeks"`, `P(T ≤ X).`],
        [`Positive z probability`, `0.5 + table area.`],
        [`Negative z probability`, `0.5 − table area.`],
        [`PERT time nature`, `Probabilistic (three estimates).`],
        [`Lecture PERT answer`, `C-F-H-J, μ = 17, σ = 2.19, P(≤ 22) = 0.9887.`],
        [`104-week answer`, `μ = 99.83, σ = 9.48, z = 0.44, P = 0.67.`]
      ],
      qa: [
        [`Define PERT and its three time estimates. (Final 2021/22, 2 points)`, `PERT (Project Evaluation and Review Technique) uses three time estimates for each activity linking two events, so activity time is probabilistic: optimistic time (best conditions), most likely time (normal conditions), and pessimistic time (worst conditions).`],
        [`Give the PERT formulas for expected time, variance and the probability of completion.`, `te = (to + 4tm + tp)/6; σ² = ((tp − to)/6)². Project μ = Σ te on the critical path; project σ² = Σ variances of critical activities; z = (X − μ)/σ; P(T ≤ X) = 0.5 ± table area (plus for z > 0, minus for z < 0).`],
        [`For the construction project (A–J), find the critical path, completion time and P(finish within 104 weeks).`, `Critical path A-C-E-G-H-J with μ = 99.83 weeks. σ² = 12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86, σ = 9.48. z = (104 − 99.83)/9.48 = 0.44. P = 0.5 + 0.17 = 0.67.`],
        [`Why do we add only the variances of the critical activities?`, `The project duration equals the length of the critical path, so its randomness comes from the activities on that path. Assuming independent activity times, the variance of the sum equals the sum of the critical variances.`],
        [`For A (1,4,7), B (3,6,15), C after A (3,9,27), D after B,C (6,9,12), E after B,C (6,12,30), F after D (2,5,14), find te, σ², critical path and P(≤ 34 weeks).`, `te/σ²: A 4/1, B 7/4, C 11/16, D 9/1, E 14/16, F 6/4. Paths: A-C-D-F = 30, A-C-E = 29, B-D-F = 22, B-E = 21. Critical A-C-D-F, μ = 30, σ² = 22, σ = 4.69. z = 4/4.69 = 0.85, P = 0.5 + 0.3023 = 0.80.`]
      ],
      quiz: [
        { q: `True or False: "Most likely time is the time required to complete an activity if everything goes perfectly."`, o: [
          [`True`, `"Everything goes perfectly" describes the optimistic time.`],
          [`False`, `Correct. Most likely = normal conditions; perfect conditions = optimistic.`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `Sheet 1 project: A (1, 4, 7). "The expected time and variance for activity A respectively are 4, 1."`, o: [
          [`True`, `Correct. (1 + 16 + 7)/6 = 4; ((7 − 1)/6)² = 1.`],
          [`False`, `False is wrong: te = (a + 4m + b)/6 = (1 + 16 + 7)/6 = 4 and σ² = ((b − a)/6)² = (6/6)² = 1, both as stated.`]
        ], a: 0, src: `Exam 2022/23 August` },
        { q: `B (3, 6, 15). "The expected time and variance for activity B respectively are 7, 1."`, o: [
          [`True`, `te = (3 + 24 + 15)/6 = 7 is right, but σ² = ((15 − 3)/6)² = 2² = 4, not 1, so the statement is false.`],
          [`False`, `Correct. te = (3 + 24 + 15)/6 = 7, but σ² = (12/6)² = 4.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `C (3, 9, 27). "The expected time and variance for activity C respectively are 27, 11."`, o: [
          [`True`, `27 is the pessimistic time, not te: te = (3 + 36 + 27)/6 = 11 and σ² = ((27 − 3)/6)² = 16.`],
          [`False`, `Correct. te = (3 + 36 + 27)/6 = 11, σ² = (24/6)² = 16.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `E (6, 12, 30). "The expected time and variance for activity E respectively are 14, 16."`, o: [
          [`True`, `Correct. te = (a + 4m + b)/6 = (6 + 48 + 30)/6 = 14 and σ² = ((b − a)/6)² = (24/6)² = 16 (L8, PERT formulas).`],
          [`False`, `False is wrong: (6 + 4×12 + 30)/6 = 84/6 = 14 and ((30 − 6)/6)² = 4² = 16, exactly the stated values.`]
        ], a: 0, src: `Exam 2022/23 August` },
        { q: `Sheet 1 project (A–F). "The standard deviation of the project is 22."`, o: [
          [`True`, `22 is the VARIANCE. The student key marked True, but that confuses variance with standard deviation.`],
          [`False`, `Correct. Project variance = 1 + 16 + 1 + 4 = 22, so σ = √22 = 4.69.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `Sheet 1 project. "The probability of completing the project in 34 weeks is 0.85."`, o: [
          [`True`, `0.85 is the z value, (34 − 30)/4.69; the probability is 0.5 + table area 0.3023 ≈ 0.80.`],
          [`False`, `Correct. z = (34 − 30)/4.69 = 0.85 → P = 0.5 + 0.3023 = 0.80.`]
        ], a: 1, src: `Exam 2022/23 August` },
        { q: `Bridge project: B (4, 7, 10). "The expected time and variance for activity B respectively are 7.5, 1."`, o: [
          [`True`, `te = (4 + 4×7 + 10)/6 = 42/6 = 7, not 7.5 (the variance (6/6)² = 1 is right).`],
          [`False`, `Correct. te = (4 + 28 + 10)/6 = 7, σ² = (6/6)² = 1.`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `Bridge: D (6, 10, 20). "The expected time and variance for activity D respectively are 11, 5.44."`, o: [
          [`True`, `Correct. (6 + 40 + 20)/6 = 11; (14/6)² = 5.44.`],
          [`False`, `False is wrong: te = (6 + 40 + 20)/6 = 11 and σ² = ((20 − 6)/6)² = (14/6)² = 5.44, both as stated.`]
        ], a: 0, src: `Exam 2022/23 January` },
        { q: `Bridge project (A 2-5-8; B after A 4-7-10; C after A 4-9-14; D after B 6-10-20; E after C, D 4-5-12). "The project completion time is 28."`, o: [
          [`True`, `The critical path A-B-D-E has te = 5 + 7 + 11 + 6 = 29, so the project takes 29 weeks, not 28.`],
          [`False`, `Correct. te: A 5, B 7, C 9, D 11, E 6. Paths A-B-D-E = 29 and A-C-E = 20, so the completion time is 29, not 28 (L8).`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `Bridge project. "The total float for activity C is equal to zero."`, o: [
          [`True`, `C lies only on A-C-E (5 + 9 + 6 = 20), shorter than the critical 29, so TF(C) = 29 − 20 = 9, not zero.`],
          [`False`, `Correct. C is not on the critical path A-B-D-E (29): ES(C) = 5, LS(C) = LS(E) − 9 = 23 − 9 = 14, so TF = 9 (L8).`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `Bridge project. "The probability of completing the project in 36 weeks is 0.4893."`, o: [
          [`True`, `0.4893 is only the table area between 0 and z = 2.30; P(T ≤ 36) = 0.5 + 0.4893 = 0.9893.`],
          [`False`, `Correct. z = (36 − 29)/√9.22 = 2.30 → P = 0.5 + 0.4893 = 0.9893.`]
        ], a: 1, src: `Exam 2022/23 January` },
        { q: `Revision project A (7, 16, 28). "The expected time and variance for activity A respectively are 1.5, 12.25."`, o: [
          [`True`, `te = (7 + 4×16 + 28)/6 = 99/6 = 16.5, not 1.5 (the variance (21/6)² = 12.25 is right).`],
          [`False`, `Correct. (7 + 64 + 28)/6 = 16.5; σ² = (21/6)² = 12.25.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Revision project. "The critical path is A, C, E, H, J."`, o: [
          [`True`, `The path skips G: H depends on G, which follows E, so the critical path is A-C-E-G-H-J (99.83).`],
          [`False`, `Correct. The critical path is A-C-E-G-H-J (99.83).`]
        ], a: 1, src: `Revision sheet` },
        { q: `Revision project. "The variance of the project is 98.9."`, o: [
          [`True`, `Adding the variances of the critical activities gives 12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86, not 98.9.`],
          [`False`, `Correct. 12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86.`]
        ], a: 1, src: `Revision sheet` },
        { q: `Revision project. "The probability of completing the project in 104 weeks is 0.44."`, o: [
          [`True`, `0.44 is the z value, (104 − 99.83)/9.48; the probability is 0.5 + 0.17 = 0.67.`],
          [`False`, `Correct. σ = √89.86 = 9.48, z = (104 − 99.83)/9.48 = 0.44, table area 0.17, so P = 0.5 + 0.17 = 0.67, not 0.44 (L8).`]
        ], a: 1, src: `Revision sheet` },
        { q: `For the 104-week question, one student solution computed z = (99.8 − 104)/9.479 = −0.44 and answered 0.33. The correct probability is:`, o: [
          [`0.33`, `0.33 comes from reversing the z formula: z = (X − μ)/σ = (104 − 99.83)/9.48 = +0.44, giving 0.67, not −0.44.`],
          [`0.17`, `0.17 is only the table area between 0 and z = 0.44; for X > μ add 0.5: P = 0.67.`],
          [`0.67`, `Correct. z = (104 − 99.83)/9.48 = +0.44 → 0.5 + 0.17.`],
          [`0.44`, `0.44 is the z value itself; the probability is 0.5 + table(0.44) = 0.5 + 0.17 = 0.67.`]
        ], a: 2, src: `Exam 2021/22` },
        { q: `2025/26 project: B (2, 4, 6). "The expected time and variance of activity B are 4 and 0.44."`, o: [
          [`True`, `Correct. te = (2 + 4×4 + 6)/6 = 24/6 = 4 and σ² = ((6 − 2)/6)² = (4/6)² = 0.44 (L8, PERT formulas).`],
          [`False`, `False is wrong: (2 + 16 + 6)/6 = 4 and ((6 − 2)/6)² = 0.44, both as stated.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `2025/26: C (1, 2, 3). "The expected time and variance of activity C are 2 and 0.44."`, o: [
          [`True`, `te = (1 + 8 + 3)/6 = 2 is right, but σ² = ((3 − 1)/6)² = (1/3)² = 0.11, not 0.44.`],
          [`False`, `Correct. te = (1 + 4×2 + 3)/6 = 2, but σ² = ((3 − 1)/6)² = 0.11, not 0.44, so the statement is false (L8).`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `2025/26: G (2, 3, 4). "The expected time and variance of activity G are 4 and 0.11."`, o: [
          [`True`, `4 is G's pessimistic time; te = (2 + 4×3 + 4)/6 = 18/6 = 3 (the variance 0.11 is right).`],
          [`False`, `Correct. te = (2 + 12 + 4)/6 = 3, not 4; σ² = ((4 − 2)/6)² = 0.11, so the pair (4, 0.11) is false (L8).`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `2025/26 project (A; B, C after A; D, E after B; F after C; G after D, E; H after F; I after G, H; J after I). "The critical path is A, B, D, G, I and J."`, o: [
          [`True`, `Correct. 3 + 4 + 5 + 3 + 2 + 3 = 20 (A-B-E-G-I-J and A-C-F-H-I-J are 19).`],
          [`False`, `False is wrong: A-B-D-G-I-J = 3 + 4 + 5 + 3 + 2 + 3 = 20 is the longest path; A-B-E-G-I-J and A-C-F-H-I-J are 19.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `2025/26 project. "The project completion time is 22."`, o: [
          [`True`, `22 is the target date in the probability question; the expected completion time is the critical path length, 20.`],
          [`False`, `Correct. The critical path A-B-D-G-I-J has te = 3 + 4 + 5 + 3 + 2 + 3 = 20, so μ = 20 weeks, not 22 (L8).`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `2025/26 project. "The probability of completing the project in 22 weeks equals 9.31."`, o: [
          [`True`, `A probability is always between 0 and 1, so 9.31 is impossible; z = (22 − 20)/1.29 = 1.55 gives P = 0.9394.`],
          [`False`, `Correct. σ² = 1.67, σ = 1.29, z = 2/1.29 = 1.55 → P = 0.5 + 0.4394 = 0.9394.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `Aug 2023/24 project (A 3-6-9; B 2-5-8; C after A 6-12-18; D after A 4-5-6; E after B 3-9-15; F after C 8-11-14; G after C, D 3-7-11; H after F, G 2-4-6; I after E 8-16-18). "The critical activities are A, C, D, F, H."`, o: [
          [`True`, `D is not critical: A-D-G-H = 6 + 5 + 7 + 4 = 22 vs 33, so D has float 11. The critical path is A-C-F-H.`],
          [`False`, `Correct. Critical path A-C-F-H = 6 + 12 + 11 + 4 = 33; D has float 11.`]
        ], a: 1, src: `Exam 2023/24 August` },
        { q: `Same Aug 2023/24 project. "The project completion time is 33."`, o: [
          [`True`, `Correct. A-C-F-H = 33 (B-E-I = 29, A-C-G-H = 29).`],
          [`False`, `False is wrong: A-C-F-H = 6 + 12 + 11 + 4 = 33 is the longest path (B-E-I = 29, A-C-G-H = 29).`]
        ], a: 0, src: `Exam 2023/24 August` },
        { q: `Same Aug 2023/24 project. "The expected time and variance for activity I are 15, 1.78."`, o: [
          [`True`, `te = (8 + 64 + 18)/6 = 15 is right, but σ² = ((18 − 8)/6)² = 2.78; 1.78 = (8/6)² uses m − a instead of b − a.`],
          [`False`, `Correct. te = (8 + 64 + 18)/6 = 15, σ² = (10/6)² = 2.78.`]
        ], a: 1, src: `Exam 2023/24 August` },
        { q: `Same Aug 2023/24 project. "The standard deviation of the project is 2.54."`, o: [
          [`True`, `Correct. σ² = 1 + 4 + 1 + 0.44 = 6.44, σ = 2.54.`],
          [`False`, `False is wrong: the critical variances are A 1, C 4, F 1, H 0.44, so σ² = 6.44 and σ = √6.44 = 2.54.`]
        ], a: 0, src: `Exam 2023/24 August` },
        { q: `Same Aug 2023/24 project. "The probability that the project will be completed in 32 weeks is 0.3937."`, o: [
          [`True`, `For 32 &lt; μ = 33, z = (32 − 33)/2.54 = −0.39 and table area 0.1517, so P = 0.5 − 0.1517 = 0.3483, not 0.3937.`],
          [`False`, `Correct. z = (32 − 33)/2.54 = −0.39 → P = 0.5 − 0.1517 = 0.3483.`]
        ], a: 1, src: `Exam 2023/24 August` },
        { q: `Lecture example: μ = 17, σ = 2.19. P(project completed on or before 22 weeks) is:`, o: [
          [`0.4887`, `0.4887 is only the table area between 0 and z = 2.28; since 22 > μ, P = 0.5 + 0.4887 = 0.9887.`],
          [`0.9887`, `Correct. z = (X − μ)/σ = (22 − 17)/2.19 = 2.28, table area 0.4887, and since X > μ, P(T ≤ 22) = 0.5 + 0.4887 = 0.9887 (L8).`],
          [`0.0113`, `0.0113 = 1 − 0.9887 is the probability of finishing AFTER 22 weeks, not on or before.`],
          [`2.28`, `2.28 is the z value; a probability must be between 0 and 1. P = 0.5 + 0.4887 = 0.9887.`]
        ], a: 1, src: `Lecture 8 example` }
      ]
    },
    /* ───────────────────────── LECTURE 9 ───────────────────────── */
    {
      n: 9, title: `Dynamic Programming: Shortest Route (Backward Approach)`,
      notes: [
        { h: `Definitions`, pts: [
          `<b>Dynamic programming</b> is a mathematical technique dealing with the <b>optimization of multistage decision problems</b>. A big problem is split into <b>stages</b>; each stage is solved using the optimal results of the following stage.`,
          `<b>Shortest route problem</b>: its criterion is to find the <b>shortest distance between two nodes with minimal cost</b>.`,
          `<b>Backward approach</b>: start from the last stage (nodes next to the destination) and move back to the source; at each node keep only the <b>minimum</b> distance to the destination.`,
          `Recursion: d(node, T) = min over arcs (node → next) of [ length(node → next) + d(next, T) ]. Record the next node that achieves the minimum, then read the path forward.`,
          `A tutor's shortcut: list all paths and take the shortest; the exam asks for the stage-by-stage backward work, so show stages.`
        ]},
        { h: `Final 2021/22 & Sheet 2: M1 → M7`, formula: [
          `Arcs: M1→M2 5; M2→M3 7; M2→M4 9; M3→M5 11; M4→M5 6; M4→M6 3; M5→M7 6; M6→M7 8`,
          `Stage 4: d(M5, M7) = 6;  d(M6, M7) = 8`,
          `Stage 3: d(M3, M7) = 11 + 6 = 17`,
          `         d(M4, M7) = min{6 + d(M5), 3 + d(M6)} = min{12, 11} = 11  (via M6)`,
          `Stage 2: d(M2, M7) = min{7 + 17, 9 + 11} = min{24, 20} = 20  (via M4)`,
          `Stage 1: d(M1, M7) = 5 + 20 = 25`,
          `Shortest path: M1 → M2 → M4 → M6 → M7, length 25`
        ]},
        { h: `Final 2019/20: S → T`, formula: [
          `Arcs: S→A 1, S→B 2, S→C 7; A→D 3, A→E 6; B→D 4, B→E 10; C→E 3, C→T 10; D→T 8; E→T 2`,
          `Stage 3: d(D, T) = 8;  d(E, T) = 2`,
          `Stage 2: d(A, T) = min{3 + 8, 6 + 2} = 8 (via E);  d(B, T) = min{4 + 8, 10 + 2} = 12;  d(C, T) = min{10, 3 + 2} = 5 (via E)`,
          `Stage 1: d(S, T) = min{1 + 8, 2 + 12, 7 + 5} = min{9, 14, 12} = 9`,
          `Shortest path: S → A → E → T, length 9`
        ]},
        { h: `Finals 2023/24 (both papers): node 1 → node 10`, formula: [
          `3rd-year arcs: 1→2 4, 1→3 6, 1→4 4; 2→5 3, 2→6 6; 3→6 8, 3→7 7; 4→7 7; 5→8 6; 6→8 5, 6→9 8; 7→9 7; 8→10 2; 9→10 6`,
          `Stage 4: d(8) = 2, d(9) = 6`,
          `Stage 3: d(5) = 6 + 2 = 8;  d(6) = min{5 + 2, 8 + 6} = 7;  d(7) = 7 + 6 = 13`,
          `Stage 2: d(2) = min{3 + 8, 6 + 7} = 11;  d(3) = min{8 + 7, 7 + 13} = 15;  d(4) = 7 + 13 = 20`,
          `Stage 1: d(1) = min{4 + 11, 6 + 15, 4 + 20} = 15 → path 1 → 2 → 5 → 8 → 10 (4 + 3 + 6 + 2 = 15)`,
          `2nd-year arcs differ (2→5 3; 3→5 7, 3→6 8, 3→7 7; 4→7 7; 5→8 6, 5→9 7; 6→9 8; 7→8 9, 7→9 7; 8→10 2; 9→10 6):`,
          `   d(5) = 8, d(6) = 14, d(7) = 11, d(2) = 11, d(3) = 15, d(4) = 18, d(1) = 15 → same path 1-2-5-8-10 = 15`
        ]},
        { h: `Final 2025/26: J1 → J8`, formula: [
          `Arcs: J1→J2 4, J1→J3 9, J1→J4 11; J2→J5 12, J2→J6 8; J3→J6 10; J4→J7 9; J5→J8 13; J6→J8 4; J7→J8 15`,
          `Stage 3: d(J5) = 13, d(J6) = 4, d(J7) = 15`,
          `Stage 2: d(J2) = min{12 + 13, 8 + 4} = 12;  d(J3) = 10 + 4 = 14;  d(J4) = 9 + 15 = 24`,
          `Stage 1: d(J1) = min{4 + 12, 9 + 14, 11 + 24} = 16`,
          `Shortest path: J1 → J2 → J6 → J8, length 16`
        ]},
        { h: `Revision MCQ 21: N1 → N6`, formula: [
          `Arcs: N1→N2 4, N1→N3 2; N2→N4 3, N2→N5 2; N3→N5 3; N4→N6 2; N5→N6 2`,
          `d(N4) = 2, d(N5) = 2;  d(N2) = min{3 + 2, 2 + 2} = 4;  d(N3) = 3 + 2 = 5`,
          `d(N1) = min{4 + 4, 2 + 5} = 7 → N1, N3, N5, N6 (answer D)`
        ]}
      ],
      cards: [
        [`Dynamic programming`, `A mathematical technique for the optimization of multistage decision problems.`],
        [`Shortest route problem`, `Find the shortest distance between two nodes with minimal cost.`],
        [`Backward approach`, `Start at the stage next to the destination and move back to the source.`],
        [`DP recursion`, `d(i) = min over j [ c(i, j) + d(j) ].`],
        [`Stage`, `A group of nodes at the same step of the network.`],
        [`How to read the path`, `Follow the recorded minimizing arcs forward from the source.`],
        [`2021/22 answer`, `M1-M2-M4-M6-M7 = 25.`],
        [`2019/20 answer`, `S-A-E-T = 9.`],
        [`2023/24 answer`, `1-2-5-8-10 = 15.`],
        [`2025/26 answer`, `J1-J2-J6-J8 = 16.`],
        [`Revision Q21 answer`, `N1-N3-N5-N6 = 7.`],
        [`Why DP beats listing all paths`, `It reuses each node's best distance, so work grows with arcs, not with the number of paths.`]
      ],
      qa: [
        [`What is meant by dynamic programming? (Final 2023/24)`, `Dynamic programming is a mathematical technique dealing with the optimization of multistage decision problems: the problem is divided into stages and solved stage by stage, each stage using the optimal results of the next.`],
        [`Explain the backward approach for the shortest route problem.`, `Divide the network into stages. Start with the nodes just before the destination: their distance is the arc length. Move one stage back: for each node, d(node) = min over its arcs of (arc length + d(next node)), and record the arc used. Continue to the source; d(source) is the shortest distance and the recorded arcs give the path.`],
        [`Find the shortest path from M1 to M7 (Final 2021/22).`, `Stage 4: d(M5) = 6, d(M6) = 8. Stage 3: d(M3) = 11 + 6 = 17; d(M4) = min(6 + 6, 3 + 8) = 11. Stage 2: d(M2) = min(7 + 17, 9 + 11) = 20. Stage 1: d(M1) = 5 + 20 = 25. Path M1-M2-M4-M6-M7 = 25.`],
        [`Find the shortest path from S to T (Final 2019/20).`, `Stage 3: d(D) = 8, d(E) = 2. Stage 2: d(A) = min(3 + 8, 6 + 2) = 8; d(B) = min(4 + 8, 10 + 2) = 12; d(C) = min(10, 3 + 2) = 5. Stage 1: d(S) = min(1 + 8, 2 + 12, 7 + 5) = 9. Path S-A-E-T = 9.`],
        [`Define the shortest route problem.`, `The criterion of the shortest route problem is to find the shortest distance between two nodes with minimal cost (e.g. between two cities in a road network).`]
      ],
      quiz: [
        { q: `True or False: "The criterion of the shortest route problem is to find the shortest distance between two nodes with minimal cost."`, o: [
          [`True`, `Correct. Revision 1 definition 20: the shortest route problem is used to find the shortest distance between two nodes with minimal cost (L9).`],
          [`False`, `False would reject Revision 1's definition: the shortest route problem finds the minimal-cost distance between two nodes.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `Match: "Shortest route problem" ...`, o: [
          [`is used to find the shortest distance between two nodes with minimal cost`, `Correct. The shortest route problem is used to find the shortest distance between two nodes with minimal cost (L9; Aug 2023/24 matching 2 → C).`],
          [`is a particular case of the transportation problem`, `A particular case of the transportation problem (n resources to n activities) is the assignment problem (L5).`],
          [`indicates that all decision variables must be ≥ 0`, `All decision variables ≥ 0 is the non-negativity restriction of LP (L1), not the shortest route problem.`],
          [`is the element at the intersection of the pivot column and pivot row`, `The element where the pivot column and pivot row cross is the simplex pivot element (L3).`]
        ], a: 0, src: `Exam 2023/24 August` },
        { q: `"Dynamic programming is a mathematical technique dealing with ............"`, o: [
          [`shipping a commodity between sources and destinations`, `Shipping a commodity between sources and destinations is the transportation problem (L4), not dynamic programming.`],
          [`the optimization of multistage decision problems`, `Correct. Revision 1 definition 38: dynamic programming is a mathematical technique dealing with the optimization of multistage decision problems, solved stage by stage (L9).`],
          [`assigning resources to an equal number of activities`, `Assigning resources to an equal number of activities is the assignment problem (L5), solved by the Hungarian method.`],
          [`three time estimates for activities`, `Three time estimates (optimistic, most likely, pessimistic) per activity belong to PERT (L8).`]
        ], a: 1, src: `Revision sheet` },
        { q: `Revision network (N1→N2 4, N1→N3 2, N2→N4 3, N2→N5 2, N3→N5 3, N4→N6 2, N5→N6 2). The shortest path from N1 to N6 is:`, o: [
          [`N1, N2, N4, N6`, `N1-N2-N4-N6 has length 4 + 3 + 2 = 9, longer than N1-N3-N5-N6 = 7.`],
          [`N1, N2, N5, N6`, `N1-N2-N5-N6 has length 4 + 2 + 2 = 8, still longer than N1-N3-N5-N6 = 7.`],
          [`N1, N3, N5, N6`, `Correct. Backward: d(N4) = d(N5) = 2, d(N2) = min{3 + 2, 2 + 2} = 4, d(N3) = 3 + 2 = 5, d(N1) = min{4 + 4, 2 + 5} = 7 via N3-N5-N6 (L9).`],
          [`None of them`, `The backward recursion gives d(N1) = 7 along N1-N3-N5-N6, which is option C, so 'None' is wrong.`]
        ], a: 2, src: `Revision sheet` },
        { q: `Final 2021/22 network (M1→M2 5; M2→M3 7; M2→M4 9; M3→M5 11; M4→M5 6; M4→M6 3; M5→M7 6; M6→M7 8). The shortest distance from M1 to M7 is:`, o: [
          [`25`, `Correct. Backward: d(M4) = min{6 + 6, 3 + 8} = 11, d(M2) = min{7 + 17, 9 + 11} = 20, d(M1) = 5 + 20 = 25 via M1-M2-M4-M6-M7 (L9).`],
          [`26`, `26 is path M1-M2-M4-M5-M7 = 5 + 9 + 6 + 6; going M4→M6 instead saves 1 (3 + 8 = 11 &lt; 6 + 6 = 12).`],
          [`29`, `29 is path M1-M2-M3-M5-M7 = 5 + 7 + 11 + 6, longer than 25 via M4 and M6.`],
          [`20`, `20 is d(M2, M7), the stage value one step in; adding the first arc M1→M2 = 5 gives 25.`]
        ], a: 0, src: `Exam 2021/22` },
        { q: `Final 2019/20: d(D, T) = 8, d(E, T) = 2, S→A 1, S→B 2, S→C 7, A→D 3, A→E 6, B→D 4, B→E 10, C→E 3, C→T 10. The shortest path S→T is:`, o: [
          [`S-B-D-T (14)`, `S-B-D-T = 2 + 4 + 8 = 14; B's best continuation is d(B) = 12, so S via B costs 14 > 9.`],
          [`S-C-E-T (12)`, `S-C-E-T = 7 + 3 + 2 = 12; the arc S→C = 7 is too long to beat S-A-E-T = 9.`],
          [`S-A-E-T (9)`, `Correct. Backward: d(A) = min{3 + 8, 6 + 2} = 8 (via E), d(B) = 12, d(C) = 5, so d(S) = min{1 + 8, 2 + 12, 7 + 5} = 9 via S-A-E-T (L9).`],
          [`S-A-D-T (12)`, `S-A-D-T = 1 + 3 + 8 = 12; from A, going to E is shorter (6 + 2 = 8 &lt; 3 + 8 = 11).`]
        ], a: 2, src: `Exam 2019/20` },
        { q: `Final 2025/26 (J1→J2 4, J1→J3 9, J1→J4 11; J2→J5 12, J2→J6 8; J3→J6 10; J4→J7 9; J5→J8 13; J6→J8 4; J7→J8 15). The shortest distance J1 → J8 is:`, o: [
          [`16`, `Correct. Backward: d(J6) = 4, d(J5) = 13, d(J7) = 15; d(J2) = min{12 + 13, 8 + 4} = 12; d(J1) = min{4 + 12, 9 + 14, 11 + 24} = 16 via J2-J6-J8 (L9).`],
          [`23`, `23 is J1-J3-J6-J8 = 9 + 10 + 4; reaching J6 through J2 (4 + 8) is shorter than through J3 (9 + 10).`],
          [`29`, `29 is J1-J2-J5-J8 = 4 + 12 + 13; from J2 the route via J6 (8 + 4 = 12) beats J5 (12 + 13 = 25).`],
          [`35`, `35 is J1-J4-J7-J8 = 11 + 9 + 15, the longest of the candidate routes.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `Final 2023/24 network (node 1 to 10). The shortest distance is:`, o: [
          [`13`, `No route from node 1 to node 10 is that short: the backward recursion gives d(1) = 15 as the minimum.`],
          [`15`, `Correct. Backward: d(5) = 8, d(6) = 7, d(7) = 13; d(2) = min{3 + 8, 6 + 7} = 11; d(1) = min{4 + 11, 6 + 15, 4 + 20} = 15 via 1-2-5-8-10 (L9).`],
          [`17`, `17 is route 1-2-6-8-10 = 4 + 6 + 5 + 2; from node 2 going to 5 (3 + 8 = 11) is shorter than to 6 (6 + 7 = 13).`],
          [`21`, `21 is the best route through node 3 (6 + d(3) = 6 + 15); via node 2 it is only 15.`]
        ], a: 1, src: `Exam 2023/24 (3rd year)` },
        { q: `In the backward approach, the first stage you evaluate is:`, o: [
          [`The arcs leaving the source`, `Evaluating the arcs leaving the source first is the forward approach; the backward approach starts at the destination.`],
          [`The nodes directly connected to the destination`, `Correct. Backward starts next to the destination.`],
          [`The longest arc`, `The stage order is fixed by the network's structure (distance in stages from the destination), not by arc length.`],
          [`Any random stage`, `DP stages are solved in strict order, each using the results of the stage after it, so a random order cannot work.`]
        ], a: 1 },
        { q: `At a node with two outgoing arcs (lengths 6 and 3) leading to nodes with d = 6 and d = 8, the node's value is:`, o: [
          [`12`, `12 = 6 + 6 is only the first arc option; the second arc gives 3 + 8 = 11, and the node takes the minimum.`],
          [`11`, `Correct. Node value = min over arcs of (arc length + d of the next node) = min{6 + 6, 3 + 8} = min{12, 11} = 11 (L9, recursion).`],
          [`9`, `Arc lengths alone ignore the remaining distances.`],
          [`14`, `14 = 6 + 8 pairs an arc with the wrong next node; each arc must be added to the d of the node it leads to.`]
        ], a: 1 },
        { q: `Which statement about dynamic programming is FALSE?`, o: [
          [`It decomposes a problem into stages`, `This statement is TRUE: DP divides a problem into stages solved one after another, so it is not the false one.`],
          [`It reuses the optimal value of later stages`, `This statement is TRUE: each stage reuses the optimal values already computed for the later stages (backward recursion).`],
          [`It is the method used to assign jobs to machines`, `Correct choice (false statement): job assignment uses the Hungarian method.`],
          [`It can solve the shortest route problem`, `This statement is TRUE: the shortest route problem is the course's main DP application (L9).`]
        ], a: 2 },
        { q: `True or False: "Simplex method is a mathematical technique dealing with the optimization of multistage decision problem."`, o: [
          [`True`, `Optimizing a multistage decision problem defines DYNAMIC PROGRAMMING; simplex moves between basic feasible solutions of an LP.`],
          [`False`, `Correct. It is the definition of dynamic programming, not simplex.`]
        ], a: 1, src: `Revision sheet` }
      ]
    }
  ],
  exams: [
    /* ───────────── FINAL 2025/2026 ───────────── */
    {
      title: `Final Exam 2025/2026`,
      meta: `January term · 2 hours · 60 marks · 4 questions · Code BS 205 · 2nd CS · Dr. Marwa Yahya, Dr. Abd El-Raheem · calculator allowed`,
      note: `Transcribed from two photographed double pages (clear). No official key; a student pencilled T/F marks next to statements 14–17 (14 F, 15 F, 16 F, 17 T), which agree with the answers here. All numbers were re-computed: LCM cost 5200, stepping stone improvement to 4600 (optimal), simplex pivot 5, PERT completion 20 weeks. Statement 13 shows correct numbers but labels the new row "s1"; since x1 entered and s1 left, it is marked False (same rule the 2023/24 student key applied). Statement 16 is read "after one pivot" (x1 = 4).`,
      sections: [
        { title: `Question 1 · True/False · General concepts (1–3)`, marks: `24 points (1 each)`, items: [
          { type: `tf`, q: `1. Operations research is concerned with scientifically deciding how to best design and operate man machine system usually requiring the allocation of scarce resources.`, a: 0, why: `This is word for word the lecture's definition of operations research: scientifically deciding how to best design and operate man-machine systems, usually allocating scarce resources (L1).`, ow: [null, `False would reject the exact OR definition from L1; the exam traps attach this sentence to LP, formulation or DP, but here it names OR.`] },
          { type: `tf`, q: `2. CPM is an abbreviation used in project management to represent the critical path method.`, a: 0, why: `CPM stands for Critical Path Method, the project-scheduling technique that finds the project completion time and the critical activities (L7).`, ow: [null, `False is wrong: in project management CPM is exactly the Critical Path Method taught in L7.`] },
          { type: `tf`, q: `3. The criterion of the shortest route problem is to find the shortest distance between two nodes with minimal cost.`, a: 0, why: `Revision 1 definition 20: the shortest route problem is used to find the shortest distance between two nodes with minimal cost, solved by DP backward recursion (L9).`, ow: [null, `False would reject Revision 1's definition of the shortest route problem (minimal-cost distance between two nodes).`] }
        ]},
        { title: `Least cost method (4–8): Q1 (5, 6, 7 | 400), Q2 (1, 8, 4 | 500), Q3 (9, 3, 2 | 300); demand 200, 600, 400`, marks: `5 points`, items: [
          { type: `tf`, q: `4. Using least cost method, M12 allocated to the cell (Q1, D2) equals 400.`, a: 0, why: `LCM order: cost 1 → Q2D1 = 200; cost 2 → Q3D3 = 300 (Q3 done); cost 3 crossed; cost 4 → Q2D3 = 100 (D3 done); cost 5 crossed (D1 done); cost 6 → Q1D2 = 400; cost 8 → Q2D2 = 200 (L4).`, ow: [null, `False is wrong: after cells of cost 1, 2 and 4 are filled, Q1's cheapest open cell is D2 (cost 6), and it takes all 400 of Q1's supply.`] },
          { type: `tf`, q: `5. M11 allocated to the cell (Q1, D1) equals 200.`, a: 1, why: `D1's 200 goes to the cheapest cell (Q2, D1) cost 1; M11 = 0.`, ow: [`LCM fills the cheapest cell first: D1's 200 all go to (Q2, D1) at cost 1, so (Q1, D1) stays empty (M11 = 0).`, null] },
          { type: `tf`, q: `6. M23 allocated to the cell (Q2, D3) equals zero.`, a: 1, why: `LCM: Q2D1 = 200 (cost 1), Q3D3 = 300 (cost 2), then cost 4 gives Q2D3 = min(300, 400 − 300) = 100, so M23 = 100, not zero (L4).`, ow: [`Q2D3 has cost 4, the third cheapest cell; after Q3D3 = 300, D3 still needs 100, which Q2 supplies, so M23 = 100.`, null] },
          { type: `tf`, q: `7. M33 allocated to the cell (Q3, D3) equals 300.`, a: 0, why: `Cost 2 is the second cheapest: min(300, 400) = 300.`, ow: [null, `False is wrong: (Q3, D3) has cost 2, the second cheapest, and gets min(supply 300, demand 400) = 300.`] },
          { type: `tf`, q: `8. The total cost equals $2500.`, a: 1, why: `1×200 + 2×300 + 4×100 + 6×400 + 8×200 = 200 + 600 + 400 + 2400 + 1600 = $5200.`, ow: [`$2500 is not the LCM cost: 1×200 + 2×300 + 4×100 + 6×400 + 8×200 = $5200.`, null] }
        ]},
        { title: `Stepping stone method (9–11), starting from the LCM solution`, marks: `3 points`, items: [
          { type: `tf`, q: `9. The closed path for the unoccupied cell (Q3, D2) is (Q3, D2) → (Q3, D3) → (Q2, D3) → (Q2, D2).`, a: 0, why: `It turns only at occupied cells (Q3D3, Q2D3, Q2D2). Index = +3 − 2 + 4 − 8 = −3 (the only negative index: Q1D1 = +6, Q1D3 = +5, Q3D1 = +10) (L4).`, ow: [null, `False is wrong: from the empty cell (Q3, D2) the path turns only at occupied cells Q3D3, Q2D3, Q2D2 and returns, so it is a valid closed path.`] },
          { type: `tf`, q: `10. M22 allocated to the cell (Q2, D2) equals zero.`, a: 0, why: `Improving along the −3 path moves θ = min(300, 200) = 200: Q2D2 drops from 200 to 0 and leaves the basis (Q3D2 = 200, Q3D3 = 100, Q2D3 = 300).`, ow: [null, `False is wrong: θ = smallest − cell on the path = min(Q3D3 300, Q2D2 200) = 200, so Q2D2 drops to 0 and leaves the basis.`] },
          { type: `tf`, q: `11. The minimum total transportation cost is 4100.`, a: 1, why: `New cost = 5200 − 3 × 200 = 4600. Recomputed indices (3, 2, 3, 10) are all ≥ 0, so 4600 is the minimum.`, ow: [`4100 is not reached: the only negative index (−3) with θ = 200 lowers 5200 by 600 to 4600, and all new indices are ≥ 0.`, null] }
        ]},
        { title: `Simplex method (12–17): s1 (5, 2, 1, 0 | 20), s2 (4, 7, 0, 1 | 28), Z (−7, −6, 0, 0 | 0)`, marks: `6 points`, items: [
          { type: `tf`, q: `12. For the following simplex tableau, the pivot element is −6.`, a: 1, why: `Pivot column x1 (−7 most negative); ratios 20/5 = 4, 28/4 = 7 → pivot 5 (L3).`, ow: [`−6 is a Z-row entry; Z-row numbers only choose the pivot column and are never pivots. The pivot is 5 (ratio 20/5 = 4 &lt; 28/4 = 7).`, null] },
          { type: `tf`, q: `13. After one pivot operation, the first row will be: Row 1 | s1 | 1 | 0.4 | 0.2 | 0 | 4.`, a: 1, why: `The numbers equal R1 ÷ 5, but the basic variable of row 1 becomes x1 (x1 enters, s1 leaves), so the row as written is not correct.`, ow: [`The numbers equal R1 ÷ 5, but after the pivot x1 enters and s1 leaves, so the row must be labelled x1, not s1.`, null], key: `Ambiguous: if the examiner ignores the label, the intended answer would be True.` },
          { type: `tf`, q: `14. After one pivot operation, the second row will be: Row 2 | s2 | 0 | 4 | 0.8 | −1 | −12.`, a: 1, why: `R2 − 4·R1(new) = (0, 7 − 1.6, 0 − 0.8, 1 | 28 − 16) = (0, 5.4, −0.8, 1 | 12).`, ow: [`The stated row is wrong: R2 − 4 × new R1 = (0, 7 − 1.6, −0.8, 1 | 28 − 16) = (0, 5.4, −0.8, 1 | 12).`, null] },
          { type: `tf`, q: `15. After one pivot operation, the third row will be: Row 3 | Z | 0 | −3.2 | 1.4 | 6 | 20.`, a: 1, why: `Z + 7·R1(new) = (0, −6 + 2.8, 1.4, 0 | 28) = (0, −3.2, 1.4, 0 | 28).`, ow: [`The s2 entry and RHS are wrong: Z + 7 × (1, 0.4, 0.2, 0 | 4) keeps s2 at 0 and gives RHS 28, not 6 and 20.`, null] },
          { type: `tf`, q: `16. Referring to problem 12, the value of x1 = 0.`, a: 1, why: `After the pivot x1 is basic with value 4 (and at the final optimum x1 = 28/9 ≈ 3.11), never 0.`, ow: [`x1 enters the basis, so after the pivot it takes the RHS of its row, 20/5 = 4, not 0.`, null] },
          { type: `tf`, q: `17. Referring to problem 12, the value of Z = 28.`, a: 0, why: `RHS of the Z row after one pivot = 0 + 7 × 4 = 28 (not yet optimal because −3.2 remains).`, ow: [null, `False is wrong: after one pivot the Z row's RHS is 0 + 7 × 4 = 28 (not yet optimal, but Z = 28).`] }
        ]},
        { title: `PERT (18–24): A (−; 1, 3, 5), B (A; 2, 4, 6), C (A; 1, 2, 3), D (B; 3, 5, 7), E (B; 2, 4, 6), F (C; 3, 5, 7), G (D, E; 2, 3, 4), H (F; 2, 4, 6), I (G, H; 1, 2, 3), J (I; 2, 3, 4)`, marks: `7 points`, items: [
          { type: `tf`, q: `18. The expected time and variance of activity A are 3 and 0.44 respectively.`, a: 0, why: `(1 + 12 + 5)/6 = 3; ((5 − 1)/6)² = 0.44 (L8).`, ow: [null, `False is wrong: te = (1 + 4×3 + 5)/6 = 3 and σ² = ((5 − 1)/6)² = 0.44, both as stated.`] },
          { type: `tf`, q: `19. The expected time and variance of activity B are 4 and 0.44 respectively.`, a: 0, why: `te = (a + 4m + b)/6 = (2 + 16 + 6)/6 = 4 and σ² = ((b − a)/6)² = (4/6)² = 0.44, as stated (L8).`, ow: [null, `False is wrong: (2 + 4×4 + 6)/6 = 4 and ((6 − 2)/6)² = 0.44, both as stated.`] },
          { type: `tf`, q: `20. The expected time and variance of activity C are 2 and 0.44 respectively.`, a: 1, why: `te = (1 + 8 + 3)/6 = 2 but σ² = (2/6)² = 0.11.`, ow: [`te = 2 is right, but σ² = ((3 − 1)/6)² = 0.11, not 0.44, so the pair is false.`, null] },
          { type: `tf`, q: `21. The expected time and variance of activity G are 4 and 0.11 respectively.`, a: 1, why: `te = (2 + 12 + 4)/6 = 3 (variance 0.11 is right).`, ow: [`4 is G's pessimistic time; te = (2 + 4×3 + 4)/6 = 3 (the variance 0.11 is right).`, null] },
          { type: `tf`, q: `22. The critical path is A, B, D, G, I and J.`, a: 0, why: `te: A 3, B 4, C 2, D 5, E 4, F 5, G 3, H 4, I 2, J 3. Paths: A-B-D-G-I-J = 20, A-B-E-G-I-J = 19, A-C-F-H-I-J = 19.`, ow: [null, `False is wrong: A-B-D-G-I-J = 3 + 4 + 5 + 3 + 2 + 3 = 20 is the longest path; the others are 19.`] },
          { type: `tf`, q: `23. The project completion time is 22.`, a: 1, why: `The critical path A-B-D-G-I-J has te = 3 + 4 + 5 + 3 + 2 + 3 = 20, so the expected completion time is 20 weeks, not 22 (L8).`, ow: [`22 is the target date of the next statement; the expected completion time is the critical path length, 20.`, null] },
          { type: `tf`, q: `24. The probability of completing the project in 22 weeks equals 9.31.`, a: 1, why: `σ² = 0.44 + 0.44 + 0.44 + 0.11 + 0.11 + 0.11 = 1.67, σ = 1.29; z = (22 − 20)/1.29 = 1.55 → P = 0.5 + 0.4394 = 0.9394. A probability cannot exceed 1.`, ow: [`A probability lies between 0 and 1, so 9.31 is impossible; z = (22 − 20)/1.29 = 1.55 gives P = 0.9394.`, null] }
        ]},
        { title: `Question 2 · Formulation`, marks: `12 points`, items: [
          { type: `written`, q: `A company produces two products, X and Y, using machine hours and labor hours. At most 300 machine hours and 600 labor hours per week. One unit of X needs 1 machine hour and 4 labor hours; one unit of Y needs 2 machine hours and 5 labor hours. Profit 10 LE for X and 20 LE for Y. Production of X must be at least twice the production of Y, the total weekly production of both products must be at least 30 units, and all variables are non-negative real numbers. Formulate the LPP.`, ans: `<b>Decision variables</b>: x = units of X per week, y = units of Y per week.<br><table><tr><th></th><th>X</th><th>Y</th><th>Available</th></tr><tr><td>Machine h</td><td>1</td><td>2</td><td>≤ 300</td></tr><tr><td>Labor h</td><td>4</td><td>5</td><td>≤ 600</td></tr><tr><td>Profit (LE)</td><td>10</td><td>20</td><td></td></tr></table><b>Max Z = 10x + 20y</b><br>Subject to:<br>x + 2y ≤ 300 (machine hours)<br>4x + 5y ≤ 600 (labor hours)<br>x ≥ 2y, i.e. x − 2y ≥ 0 (X at least twice Y)<br>x + y ≥ 30 (total production)<br>x, y ≥ 0 (real numbers, no integer condition).<br><i>(Not asked: the LP optimum is x = 1200/13 ≈ 92.3, y = 600/13 ≈ 46.2, Z ≈ 1846.)</i>` }
        ]},
        { title: `Question 3 · Branch and bound (graphical)`, marks: `12 points`, items: [
          { type: `written`, q: `Max Z = 100X + 150Y subject to 8000X + 4000Y ≤ 40000, 15X + 30Y ≤ 200, Y ≥ 6, X ≤ 1, X, Y ≥ 0 and integer.`, ans: `<b>LP relaxation</b>: lines 8000X + 4000Y = 40000 (intercepts (0,10), (5,0)); 15X + 30Y = 200 (intercepts (0, 6.67), (13.3, 0)); Y = 6; X = 1. The region is the small area 0 ≤ X ≤ 1 between Y = 6 and 15X + 30Y = 200 (the first constraint is not binding there).<br>Corners: (0, 6) Z = 900; (1, 6) Z = 1000; (1, 37/6 = 6.17) Z = 100 + 925 = 1025; (0, 6.67) Z = 1000.<br><b>Node 1</b>: X = 1, Y = 6.17, Z = 1025 (Y fractional) → branch on Y.<br><b>Node 2 (Y ≤ 6)</b>: with Y ≥ 6 this forces Y = 6; best point (1, 6), Z = 1000 → integer (incumbent).<br><b>Node 3 (Y ≥ 7)</b>: 15X + 210 ≤ 200 is impossible → infeasible.<br><b>Optimal integer solution: X = 1, Y = 6, Z = 1000</b> (L6).` }
        ]},
        { title: `Question 4 · Shortest path (dynamic programming)`, marks: `12 points`, items: [
          { type: `written`, q: `Determine the shortest path from node 1 to node 8. Arcs: J1→J2 4, J1→J3 9, J1→J4 11, J2→J5 12, J2→J6 8, J3→J6 10, J4→J7 9, J5→J8 13, J6→J8 4, J7→J8 15.`, ans: `Backward approach (L9):<br><b>Stage 3</b>: d(J5, J8) = 13; d(J6, J8) = 4; d(J7, J8) = 15.<br><b>Stage 2</b>: d(J2) = min{12 + 13, 8 + 4} = min{25, 12} = 12 (via J6); d(J3) = 10 + 4 = 14; d(J4) = 9 + 15 = 24.<br><b>Stage 1</b>: d(J1) = min{4 + 12, 9 + 14, 11 + 24} = min{16, 23, 35} = 16.<br><b>Shortest path: J1 → J2 → J6 → J8, distance 16.</b>` }
        ]}
      ]
    },
    /* ───────────── FINAL 2024/2025 ───────────── */
    {
      title: `Final Exam 2024/2025`,
      meta: `January term · 2 hours · 60 marks · 3 questions · Code BS 205 · 2nd CS · Dr. Marwa Yahya, Dr. Abd El-Raheem`,
      note: `Transcribed from a low-resolution scan (two double pages); cropped and enlarged to read the numbers. The duration of activity D (select advertising agency) is partly hidden by a smudge; it is read as 2 days (this also matches the classic textbook version of the problem and makes statement 16, ES(E) = 8, consistent). In Q3-B the third constraint is read as x2 ≤ 1; reading it as x1 ≤ 1 gives the same integer optimum (15 at (1, 1)). No answer key was available; everything was solved and checked by computer.`,
      sections: [
        { title: `Question 1 · True or False`, marks: `20 points`, items: [
          { type: `tf`, q: `1. Critical path method defines as combinations of interrelated activities which executed in a certain order before the entire task can be completed.`, a: 1, why: `That is the definition of a project; CPM determines project time and the important activities (L7).`, ow: [`The quoted sentence defines a PROJECT; CPM is the method that finds the project time and the critical activities.`, null] },
          { type: `tf`, q: `2. Start activity which does not consume any kind of resources but merely depicts the technological dependence.`, a: 1, why: `That defines a dummy activity; a start activity has no predecessor.`, ow: [`Consuming no resources and only showing dependence defines a DUMMY activity; a start activity is simply one with no predecessor.`, null] },
          { type: `tf`, q: `3. Dummy activity must be completed immediately prior to start of another activity.`, a: 1, why: `'Must be completed immediately prior to the start of another activity' defines a PREDECESSOR; a dummy takes no time or resources and only shows dependence (L7).`, ow: [`The sentence is the definition of a predecessor activity; a dummy is a zero-time arrow that only depicts dependence.`, null] },
          { type: `tf`, q: `4. Successor activity cannot be started until one of other activities is completed.`, a: 0, why: `This is the lecture's definition: a successor activity cannot be started until one or more other activities (its predecessors) are completed (L7).`, ow: [null, `False would reject the L7 definition: a successor is exactly the activity that waits for others to be completed.`] },
          { type: `tf`, q: `5. Path in a network is a continuous, consisting of nodes and activities alternatively, beginning with the start event and stopping at the end event of a network.`, a: 0, why: `This is the lecture's definition of a path: a continuous chain of nodes and activities, alternately, from the start event to the end event (L7).`, ow: [null, `False would reject the L7 definition of a path in a network.`] },
          { type: `tf`, q: `6. The term Programming in a linear programming problem implies that all the mathematical relations used in the problem are linear relations.`, a: 1, why: `That defines "linear"; "programming" = determining a plan of action (L1).`, ow: [`The linear-relations sentence defines the word 'linear'; 'programming' means determining a particular program or plan of action.`, null] },
          { type: `tf`, q: `7. Linear programming relaxation problem is an optimization problem with integer decision variables.`, a: 1, why: `That defines integer programming; the relaxation omits the integer constraints (L6).`, ow: [`An optimization problem with integer decision variables is an INTEGER program; its LP relaxation drops the integer constraints.`, null] },
          { type: `tf`, q: `8. Formulation problem is concerned with scientifically deciding how to best design and operate man machine system usually requiring the allocation of scarce resources.`, a: 1, why: `The sentence is the definition of operations research (L1); formulation means translating the real-world problem into mathematical equations that can be solved.`, ow: [`This is the OR definition attached to the wrong term; formulation is translating a real problem into solvable equations.`, null] },
          { type: `tf`, q: `9. Constraints are the linear inequalities on the variables of the linear programming problem.`, a: 0, why: `This is the L1 definition: constraints are the linear inequalities on the variables of the LPP (capacity, availability, resources).`, ow: [null, `False would reject the L1 definition of constraints word for word.`] },
          { type: `tf`, q: `10. The exiting variable is at the intersection of the pivot column and pivot row.`, a: 1, why: `The pivot element is at the intersection (L3).`, ow: [`The element at the intersection of the pivot column and pivot row is the PIVOT; the exiting variable is the basic variable of the pivot row.`, null] },
          { type: `tf`, q: `11. Project: A Organize sales office (−, 6), G Design package (−, 2), J Order stock (−, 13), B Hire salesmen (A, 4), C Train salesmen (B, 7), D Select advertising agency (A, 2), E Plan advertising campaign (D, 4), F Conduct campaign (E, 10), H Setup packaging facilities (G, 10), I Package initial stocks (J, H, 6), K Select distributors (A, 9), L Sell to distributors (C, K, 3), M Ship stocks (I, L, 5). Latest finish time for activity A is equal to 6.`, a: 0, why: `A is critical: ES = LS = 0, LF = EF = 6 (L7).`, ow: [null, `False is wrong: A is critical (A-B-C-L-M), so LF(A) = EF(A) = 0 + 6 = 6.`] },
          { type: `tf`, q: `12. The critical activities are A, B, C, L and M.`, a: 0, why: `Longest path A-B-C-L-M = 6 + 4 + 7 + 3 + 5 = 25; all have zero total float.`, ow: [null, `False is wrong: A-B-C-L-M = 25 is the longest path, and all five activities have zero total float.`] },
          { type: `tf`, q: `13. The total project completion time is 25 days.`, a: 0, why: `Other paths: J-I-M 24, G-H-I-M 23, A-K-L-M 23, A-D-E-F 22.`, ow: [null, `False is wrong: the forward pass ends at EF(M) = 25 via A-B-C-L-M; every other path is shorter.`] },
          { type: `tf`, q: `14. Earliest start time for activities A, G and J are equal.`, a: 0, why: `A, G and J have no predecessors, so the forward pass starts all three at ES = 0 (L7).`, ow: [null, `False is wrong: A, G and J all leave the start node with no predecessors, so each has ES = 0.`] },
          { type: `tf`, q: `15. Latest finish time for activities A, G and J are equal.`, a: 1, why: `LF(A) = 6, LF(G) = LS(H) = 4, LF(J) = LS(I) = 14.`, ow: [`They share ES = 0, but the backward pass gives LF(A) = 6, LF(G) = LS(H) = 4, LF(J) = LS(I) = 14.`, null] },
          { type: `tf`, q: `16. Earliest start time for activity E is equal to 8.`, a: 0, why: `E's only predecessor is D: ES(D) = EF(A) = 6 and EF(D) = 6 + 2 = 8, so ES(E) = 8 (L7, forward pass).`, ow: [null, `False is wrong: E follows only D, and EF(D) = 6 + 2 = 8, so ES(E) = 8.`] },
          { type: `tf`, q: `17. The non-critical activities are J, I, G, H, K, D, E, F.`, a: 0, why: `Floats: G 2, J 1, D 3, E 3, F 3, H 2, I 1, K 2; all non-zero, and these are exactly the activities off A-B-C-L-M.`, ow: [null, `False is wrong: every activity off A-B-C-L-M has positive float (J 1, I 1, G 2, H 2, K 2, D 3, E 3, F 3).`] },
          { type: `tf`, q: `18. Latest finish time for activity K is equal 9.`, a: 1, why: `K's only successor is L, with LS(L) = 20 − 3 = 17, so LF(K) = 17; 9 is K's duration (EF(K) = 15) (L7, backward pass).`, ow: [`9 is K's duration; LF(K) = LS(L) = 17 and EF(K) = 6 + 9 = 15.`, null] },
          { type: `tf`, q: `19. Earliest start time for activity G is equal to zero.`, a: 0, why: `G has no predecessor, so it starts at the start node with ES = 0 (L7, forward pass).`, ow: [null, `False is wrong: G has no predecessor, so its earliest start is 0.`] },
          { type: `tf`, q: `20. Latest finish time for activity M is equal to 20.`, a: 1, why: `M is the final activity: LF = 25 (its ES is 20).`, ow: [`20 is M's ES (= LS, since M is critical); as the last activity its LF equals the project time, 25.`, null] }
        ]},
        { title: `Question 2`, marks: `20 points`, items: [
          { type: `written`, q: `A. Solve the transportation problem using the least cost method: Q1 (2, 3, 11, 7 | 6), Q2 (1, 0, 6, 1 | 1), Q3 (5, 8, 15, 9 | 10); demand 7, 5, 3, 2 (total 17). (10 points)`, ans: `Balanced (17 = 17). LCM (L4):<br>1) cost 0: (Q2, D2) = min(1, 5) = 1 → Q2 done, D2 needs 4.<br>2) cost 1 cells are in Q2 (crossed). cost 2: (Q1, D1) = min(6, 7) = 6 → Q1 done, D1 needs 1.<br>3) cost 3 (Q1, D2) crossed. cost 5: (Q3, D1) = 1 → D1 done.<br>4) cost 8: (Q3, D2) = 4 → D2 done. cost 9: (Q3, D4) = 2 → D4 done. cost 15: (Q3, D3) = 3.<br><table><tr><th></th><th>D1</th><th>D2</th><th>D3</th><th>D4</th><th>S</th></tr><tr><td>Q1</td><td>6</td><td>–</td><td>–</td><td>–</td><td>6</td></tr><tr><td>Q2</td><td>–</td><td>1</td><td>–</td><td>–</td><td>1</td></tr><tr><td>Q3</td><td>1</td><td>4</td><td>3</td><td>2</td><td>10</td></tr></table>Allocated cells = 6 = m + n − 1.<br><b>Total cost = 2×6 + 0×1 + 5×1 + 8×4 + 15×3 + 9×2 = 12 + 0 + 5 + 32 + 45 + 18 = 112.</b><br><i>(For reference: VAM gives 102 and the true optimum is 100.)</i>` },
          { type: `written`, q: `B. Perform one pivot operation for the tableau: s1 (3, 6, 1, 0 | 12), s2 (2, 9, 0, 1 | 18), Z (−12, −7, 0, 0 | 0). (10 points)`, ans: `Pivot column x1 (−12 most negative). Ratios: 12/3 = 4, 18/2 = 9 → pivot row s1, <b>pivot element 3</b>; x1 enters, s1 leaves (L3).<br>New x1 row = R1 ÷ 3 = (1, 2, 1/3, 0 | 4).<br>New s2 row = R2 − 2 × new x1 = (2 − 2, 9 − 4, 0 − 2/3, 1 − 0 | 18 − 8) = (0, 5, −2/3, 1 | 10).<br>New Z row = Z + 12 × new x1 = (0, −7 + 24, 0 + 4, 0 | 0 + 48) = (0, 17, 4, 0 | 48).<br><table><tr><th>B.V</th><th>x1</th><th>x2</th><th>s1</th><th>s2</th><th>b</th></tr><tr><td>x1</td><td>1</td><td>2</td><td>1/3</td><td>0</td><td>4</td></tr><tr><td>s2</td><td>0</td><td>5</td><td>−2/3</td><td>1</td><td>10</td></tr><tr><td>Z</td><td>0</td><td>17</td><td>4</td><td>0</td><td>48</td></tr></table>No negative entries remain in the Z row, so this is optimal: <b>x1 = 4, x2 = 0, s2 = 10, Z = 48</b>.` }
        ]},
        { title: `Question 3`, marks: `20 points`, items: [
          { type: `written`, q: `A. A firm makes two products X and Y and has a total production capacity of 9 tonnes per day (X and Y require the same capacity). It has a permanent contract to supply at least 2 tonnes of X and at least 3 tonnes of Y per day. Each tonne of X requires 20 machine hours and each tonne of Y 50 machine hours; the daily maximum is 360 machine hours. All output can be sold; profit is Rs 80 per tonne of X and Rs 120 per tonne of Y. Formulate the LP model. (10 points)`, ans: `<b>Variables</b>: x1 = tonnes of X per day, x2 = tonnes of Y per day.<br><b>Max Z = 80x1 + 120x2</b><br>Subject to:<br>x1 + x2 ≤ 9 (production capacity)<br>x1 ≥ 2 (contract for X)<br>x2 ≥ 3 (contract for Y)<br>20x1 + 50x2 ≤ 360 (machine hours)<br>x1, x2 ≥ 0.<br><i>(Not asked: graphical optimum at the intersection of x1 + x2 = 9 and 20x1 + 50x2 = 360: x1 = 3, x2 = 6, Z = Rs 960.)</i>` },
          { type: `written`, q: `B. Solve by branch and bound: Max Z = 3x1 + 12x2 subject to 2x1 + 4x2 ≤ 7, 5x1 + 3x2 ≤ 15, x2 ≤ 1, x1, x2 ≥ 0 and integer. (10 points)`, ans: `<b>LP relaxation</b>: corners (0,0) 0; (3,0) 9; (2.79, 0.36) ≈ 12.6; (1.5, 1) 16.5; (0,1) 12. → Node 1: x1 = 1.5, x2 = 1, Z = 16.5. Branch on x1.<br><b>Node 2 (x1 ≤ 1)</b>: corners (0,1) 12, (1,1) 15, (1,0) 3 → (1, 1), Z = 15, integer → incumbent.<br><b>Node 3 (x1 ≥ 2)</b>: corners (2, 0.75) 15, (2,0) 6, (3,0) 9, (2.79, 0.36) 12.6 → (2, 0.75), Z = 15, not better than 15 (fathomed). If branched anyway: x2 ≤ 0 → (3,0), Z = 9; x2 ≥ 1 → infeasible.<br><b>Optimal integer solution: x1 = 1, x2 = 1, Z = 15</b> (L6).` }
        ]}
      ]
    },
    /* ───────────── FINAL 2023/2024 AUGUST ───────────── */
    {
      title: `Final Exam 2023/2024 (August)`,
      meta: `August term · 2 hours · 60 marks · 4 questions · Code BS205 · 2nd CS · Dr. Marwa Yahya, Dr. Abd El-Raheem`,
      note: `Transcribed from two low-resolution WhatsApp photos (rotated), enlarged to read. A student pencilled answers: matching 3 → B, 4 → E and T/F marks 1 F, 2 F, 3 T, 4 T, 5 F, 6 T, 7 T, 8 F, 9 F, 10 T, 11 F, 12 T, 13 T, 14 F; all agree with the solutions here. Statement 15 is struck through on the copy (possibly cancelled); it is answered anyway. A pencil sketch for Q4 on the photo uses x1 = small, x2 = large.`,
      sections: [
        { title: `Question 1-A · Match Column A with Column B`, marks: `5 points`, items: [
          { type: `written`, q: `Column A: 1. Operations research, 2. Shortest route problem, 3. Assignment problem, 4. Pivot, 5. Non-negative constraints. Column B: A. indicates that all decision variables must take on values equal to or greater than zero. B. is a particular case of the transportation problem where the objective is to assign a number of resources to an equal number of activities so as to minimize total cost or maximize total profit of allocation. C. is used to find the shortest distance between two nodes with minimal cost. D. is concerned with scientifically deciding how to best design and operate man machine system usually requiring the allocation of scarce resources. E. is the element in the intersection of the pivot column and pivot row.`, ans: `1 → <b>D</b> · 2 → <b>C</b> · 3 → <b>B</b> · 4 → <b>E</b> · 5 → <b>A</b> (Revision 1 definitions).` }
        ]},
        { title: `Question 1-B · True or False (simplex: x1 (1, 1/2, 1/2, 0 | 3), s2 (0, 3/2, −5/2, 1 | 5), Z (0, −20, 60, 0 | 360))`, marks: `15 points`, items: [
          { type: `tf`, q: `1. For the following simplex tableau, the pivot element is −20.`, a: 1, why: `Pivot column x2 (−20); ratios 3 ÷ 1/2 = 6, 5 ÷ 3/2 = 3.33 → pivot 3/2 in row s2 (L3).`, ow: [`−20 is the Z-row entry that selects the pivot column x2; Z-row numbers are never pivots. The pivot is 3/2 (ratio 3.33 &lt; 6).`, null] },
          { type: `tf`, q: `2. After one pivot operation, the first row will be: Row 1 | x1 | 0 | 1 | 1.33 | −0.33 | 1.33.`, a: 1, why: `Correct row is x1 | 1 | 0 | 1.33 | −0.33 | 1.33 (x1 and x2 entries are swapped in the statement).`, ow: [`The x1 and x2 entries are swapped: R1 − 1/2 × new x2 row keeps 1 under x1 and 0 under x2, giving x1 | 1, 0, 1.33, −0.33 | 1.33.`, null] },
          { type: `tf`, q: `3. After one pivot operation, the second row will be: Row 2 | x2 | 0 | 1 | −1.67 | 0.67 | 3.33.`, a: 0, why: `R2 ÷ 1.5 = (0, 1, −5/3, 2/3 | 10/3), labelled x2.`, ow: [null, `False is wrong: the pivot row s2 divided by 3/2 is (0, 1, −5/3, 2/3 | 10/3) = (0, 1, −1.67, 0.67 | 3.33), labelled x2.`] },
          { type: `tf`, q: `4. After one pivot operation, the third row will be: Row 3 | Z | 0 | 0 | 26.7 | 13.3 | 426.7.`, a: 0, why: `Z + 20 × new x2 row = (0, 0, 60 − 33.3, 13.3 | 360 + 66.7).`, ow: [null, `False is wrong: Z + 20 × (0, 1, −5/3, 2/3 | 10/3) = (0, 0, 26.7, 13.3 | 426.7), exactly as stated.`] },
          { type: `tf`, q: `5. Project: A (−; 3, 6, 9), B (−; 2, 5, 8), C (A; 6, 12, 18), D (A; 4, 5, 6), E (B; 3, 9, 15), F (C; 8, 11, 14), G (C, D; 3, 7, 11), H (F, G; 2, 4, 6), I (E; 8, 16, 18). The critical activities are A, C, D, F, H.`, a: 1, why: `te: A 6, B 5, C 12, D 5, E 9, F 11, G 7, H 4, I 15. Critical path A-C-F-H = 33; D has float 11 (L8).`, ow: [`D is not critical: A-D-G-H = 6 + 5 + 7 + 4 = 22 against 33, so D has float 11. The critical path is A-C-F-H.`, null] },
          { type: `tf`, q: `6. The project completion time is 33.`, a: 0, why: `A-C-F-H = 6 + 12 + 11 + 4 = 33 (B-E-I = 29, A-C-G-H = 29).`, ow: [null, `False is wrong: A-C-F-H = 6 + 12 + 11 + 4 = 33 is the longest path (B-E-I and A-C-G-H are 29).`] },
          { type: `tf`, q: `7. The expected time and variance for activity D are equal to 5, 0.11 respectively.`, a: 0, why: `te = (a + 4m + b)/6 = (4 + 20 + 6)/6 = 5 and σ² = ((b − a)/6)² = (2/6)² = 0.11, as stated (L8).`, ow: [null, `False is wrong: (4 + 4×5 + 6)/6 = 5 and ((6 − 4)/6)² = 0.11, both as stated.`] },
          { type: `tf`, q: `8. The expected time for activity C is equal to the expected time for activity H.`, a: 1, why: `te(C) = (6 + 48 + 18)/6 = 12 but te(H) = (2 + 16 + 6)/6 = 4, so they are not equal (L8).`, ow: [`te(C) = (6 + 4×12 + 18)/6 = 12 and te(H) = (2 + 4×4 + 6)/6 = 4, so they differ.`, null] },
          { type: `tf`, q: `9. The variance for activity G is equal to the variance for activity I.`, a: 1, why: `σ²(G) = ((11 − 3)/6)² = 1.78 but σ²(I) = ((18 − 8)/6)² = 2.78, so the variances differ (L8).`, ow: [`σ²(G) = (8/6)² = 1.78 and σ²(I) = (10/6)² = 2.78; the spreads b − a (8 and 10) differ.`, null] },
          { type: `tf`, q: `10. The expected time and variance for activity B are equal to 5, 1 respectively.`, a: 0, why: `te = (2 + 4×5 + 8)/6 = 30/6 = 5 and σ² = ((8 − 2)/6)² = 1, as stated (L8).`, ow: [null, `False is wrong: (2 + 20 + 8)/6 = 5 and ((8 − 2)/6)² = 1, both as stated.`] },
          { type: `tf`, q: `11. The expected time and variance for activity I are equal to 15, 1.78 respectively.`, a: 1, why: `te = (8 + 64 + 18)/6 = 15 but σ² = (10/6)² = 2.78.`, ow: [`te = 15 is right, but σ² = ((18 − 8)/6)² = 2.78; 1.78 = (8/6)² uses m − a instead of b − a.`, null] },
          { type: `tf`, q: `12. The expected time and variance for activity F are equal to 11, 1 respectively.`, a: 0, why: `te = (8 + 4×11 + 14)/6 = 66/6 = 11 and σ² = ((14 − 8)/6)² = 1, as stated (L8).`, ow: [null, `False is wrong: (8 + 44 + 14)/6 = 11 and ((14 − 8)/6)² = 1, both as stated.`] },
          { type: `tf`, q: `13. The standard deviation of the project is 2.54.`, a: 0, why: `σ² = 1 + 4 + 1 + 0.44 = 6.44 (critical A, C, F, H) → σ = 2.54.`, ow: [null, `False is wrong: the critical variances A 1 + C 4 + F 1 + H 0.44 = 6.44, and σ = √6.44 = 2.54.`] },
          { type: `tf`, q: `14. The probability that the project will be completed in 32 weeks is 0.3937.`, a: 1, why: `z = (32 − 33)/2.54 = −0.39 → P = 0.5 − 0.1517 = 0.3483.`, ow: [`For 32 &lt; μ = 33, z = −0.39 and table area 0.1517, so P = 0.5 − 0.1517 = 0.3483, not 0.3937.`, null] },
          { type: `tf`, q: `15. The probability that the project will be completed in 35 weeks is 0.7874. (struck through on the copy)`, a: 1, why: `z = (35 − 33)/2.54 = 0.79 → P = 0.5 + 0.2852 = 0.7852, not 0.7874.`, ow: [`z = (35 − 33)/2.54 = 0.79, table area 0.2852, so P = 0.5 + 0.2852 = 0.7852; the stated 0.7874 does not match the table.`, null], key: `The statement is crossed out on the photographed paper; it may have been cancelled.` }
        ]},
        { title: `Question 2 · Vogel's approximation method`, marks: `10 points`, items: [
          { type: `written`, q: `Find the solution using Vogel's method: Q1 (470, 512, 360, 300 | 20), Q2 (315, 450, 441, 704 | 50), Q3 (333, 435, 290, 200 | 40), Q4 (387, 198, 540, 314 | 30); demand 35, 45, 40, 20 (total 140).`, ans: `Penalty = next lowest − lowest (L4).<br><b>Step 1</b>: rows 60, 126, 90, 116; cols 18, 237, 70, 100 → D2 (237) → cheapest 198: <b>Q4D2 = 30</b> (Q4 done; D2 needs 15).<br><b>Step 2</b>: rows 60, 126, 90; cols 18, 15, 70, 100 → Q2 (126) → cheapest 315: <b>Q2D1 = 35</b> (D1 done; Q2 has 15).<br><b>Step 3</b>: rows 60, 9, 90; cols D2 15, D3 70, D4 100 → D4 (100) → cheapest 200: <b>Q3D4 = 20</b> (D4 done; Q3 has 20).<br><b>Step 4</b>: rows Q1 152, Q2 9, Q3 145; cols 15, 70 → Q1 (152) → cheapest 360: <b>Q1D3 = 20</b> (Q1 done; D3 needs 20).<br><b>Step 5</b>: rows Q2 9, Q3 145; cols D2 15, D3 151 → D3 → cheapest 290: <b>Q3D3 = 20</b>.<br><b>Step 6</b>: remaining <b>Q2D2 = 15</b>.<br><table><tr><th></th><th>D1</th><th>D2</th><th>D3</th><th>D4</th></tr><tr><td>Q1</td><td></td><td></td><td>20</td><td></td></tr><tr><td>Q2</td><td>35</td><td>15</td><td></td><td></td></tr><tr><td>Q3</td><td></td><td></td><td>20</td><td>20</td></tr><tr><td>Q4</td><td></td><td>30</td><td></td><td></td></tr></table><b>Total = 360×20 + 315×35 + 450×15 + 290×20 + 200×20 + 198×30 = 7200 + 11025 + 6750 + 5800 + 4000 + 5940 = 40,715</b> (6 cells; m + n − 1 = 7, so the solution is degenerate). This is also the optimal cost.` }
        ]},
        { title: `Question 3 · Hungarian method`, marks: `15 points`, items: [
          { type: `written`, q: `Solve the assignment problem: M1 (9, 22, 58, 11, 19), M2 (43, 78, 72, 50, 63), M3 (41, 28, 91, 37, 45), M4 (74, 42, 27, 49, 39), M5 (36, 11, 57, 22, 25) for jobs A–E.`, ans: `<b>Row reduction</b> (mins 9, 43, 28, 27, 11): M1 (0,13,49,2,10), M2 (0,35,29,7,20), M3 (13,0,63,9,17), M4 (47,15,0,22,12), M5 (25,0,46,11,14).<br><b>Column reduction</b> (mins 0, 0, 0, 2, 10): M1 (0,13,49,0,0), M2 (0,35,29,5,10), M3 (13,0,63,7,7), M4 (47,15,0,20,2), M5 (25,0,46,9,4).<br>Minimum lines = 4 (row M1, columns A, B, C) &lt; 5 → θ = 2 (M4, E): M1 (2,15,51,0,0), M2 (0,35,29,3,8), M3 (13,0,63,5,5), M4 (47,15,0,18,0), M5 (25,0,46,7,2).<br>Lines = 4 (rows M1, M4; columns A, B) → θ = 2 (M5, E): M1 (4,17,51,0,0), M2 (0,35,27,1,6), M3 (13,0,61,3,3), M4 (49,17,0,18,0), M5 (25,0,44,5,0).<br>Now 5 lines → assign: M2 → A, M3 → B, M4 → C, M1 → D, M5 → E.<br><b>Total cost = 43 + 28 + 27 + 11 + 25 = 134</b> (L5).` }
        ]},
        { title: `Question 4 · Formulate and solve`, marks: `15 points`, items: [
          { type: `written`, q: `A carpenter makes bookcases in two sizes. A large one takes 6 hours and a small one 2 hours. Profit $50 (large) and $20 (small). He can spend only 24 hours a week and must make at least 2 large and 3 small each week. Find his maximum profit per week.`, ans: `x1 = large bookcases, x2 = small bookcases.<br><b>Max Z = 50x1 + 20x2</b> s.t. 6x1 + 2x2 ≤ 24, x1 ≥ 2, x2 ≥ 3, x1, x2 ≥ 0.<br>Graph: 6x1 + 2x2 = 24 through (4, 0) and (0, 12); vertical x1 = 2; horizontal x2 = 3. Feasible triangle corners:<br>(2, 3): Z = 100 + 60 = 160<br>(2, 6): 12 + 12 = 24 → Z = 100 + 120 = <b>220</b><br>(3, 3): on the line, 6x1 + 2(3) = 24 → x1 = 3: Z = 150 + 60 = 210<br><b>Maximum profit $220 per week: 2 large and 6 small bookcases</b> (L2).` }
        ]}
      ]
    },
    /* ───────────── FINAL 2023/2024 JANUARY (2nd year) ───────────── */
    {
      title: `Final Exam 2023/2024 (January, 2nd year)`,
      meta: `January term · 2 hours · 60 marks · 4 questions · Code BS 205 · 2nd CS · Dr. Marwa Yahya, Dr. Abd El-Raheem`,
      note: `Transcribed from two high-resolution phone photos (rotated). No answer key. Note statement 15: every activity it lists really is non-critical, so it is answered True, but H (float 1) is also non-critical and is missing from the list; statement 14 wrongly puts H among the critical activities. If the examiner believed H was critical, 14 would be their "True" and 15 consistent; by computation, critical activities are B, C, E, I only (B-H-L-M = 22 < 23).`,
      sections: [
        { title: `Question 1-A · Match Column A with Column B`, marks: `6 points`, items: [
          { type: `written`, q: `Column A: 1. Feasible region, 2. Minimum cost method, 3. Mixed linear programming, 4. Project, 5. Total floats, 6. Free floats. Column B: A. is the amount of time that the activity completion time can be delayed without affecting the earliest start time of immediate successor activities in the network. B. an integer programming in which only some of the variables are required to be integers. C. the common region determining by all the constraints including non-negative constraints. D. the initial allocation is made to the cell with the lowest of the transportation problem tableau. E. defines as combinations of interrelated activities which executed in a certain order before the entire task can be completed. F. is the amount of time that the completion time of an activity can be delayed without affecting the project completion.`, ans: `1 → <b>C</b> · 2 → <b>D</b> · 3 → <b>B</b> · 4 → <b>E</b> · 5 → <b>F</b> · 6 → <b>A</b>.` }
        ]},
        { title: `Question 1-B · True/False · Vogel (Q1 19, 30, 50, 10 | 7; Q2 40, 30, 40, 60 | 9; Q3 40, 8, 70, 20 | 18; demand 5, 8, 7, 14)`, marks: `6 points`, items: [
          { type: `tf`, q: `1. M32 allocated to the cell (Q3, D2) equals 18.`, a: 1, why: `Step 1 penalties: rows 9, 10, 12; columns 21, 22, 10, 10 → D2 (22) → cheapest 8 at Q3: allocate min(18, 8) = 8 (L4).`, ow: [`Q3 has 18 units, but D2 demands only 8, so VAM allocates min(18, 8) = 8 to (Q3, D2).`, null] },
          { type: `tf`, q: `2. M11 allocated to the cell (Q1, D1) equals 5.`, a: 0, why: `Step 2: rows 9, 0, 20; columns D1 21, D3 10, D4 10 → D1 (21) → cheapest 19 at Q1: 5.`, ow: [null, `False is wrong: after D2 is filled, D1 has the highest penalty (21) and its cheapest cell is Q1 (19), which takes all 5.`] },
          { type: `tf`, q: `3. M14 allocated to the cell (Q1, D4) equals M24 allocated the cell (Q2, D4).`, a: 0, why: `Step 3: Q3 penalty 50 → Q3D4 = 10 (Q3 done). Step 4: D4 penalty 50 → Q1D4 = 2 (Q1 done). Step 5: Q2D4 = 2, then Q2D3 = 7. So M14 = M24 = 2.`, ow: [null, `False is wrong: VAM gives Q1D4 = 2 (Q1's last 2 units) and Q2D4 = 2 (D4's last 2 units), so they are equal.`] },
          { type: `tf`, q: `4. M34 allocated to the cell (Q3, D4) equals 10.`, a: 0, why: `Q3 has 18 − 8 = 10 left, all sent to D4 (cost 20).`, ow: [null, `False is wrong: after Q3D2 = 8, Q3 has 18 − 8 = 10 left, and VAM sends all 10 to D4 (cost 20).`] },
          { type: `tf`, q: `5. M22 allocated to the cell (Q2, D2) equals 7.`, a: 1, why: `D2 is fully supplied by Q3; M22 = 0. Q2's 9 go to D3 (7) and D4 (2).`, ow: [`D2's 8 units all come from Q3 (cost 8), so M22 = 0; Q2's 9 units go to D3 (7) and D4 (2).`, null] },
          { type: `tf`, q: `6. The total cost equals $797.`, a: 1, why: `8×8 + 19×5 + 20×10 + 10×2 + 60×2 + 40×7 = 64 + 95 + 200 + 20 + 120 + 280 = $779 (the true optimum is 721).`, ow: [`$797 swaps two digits: 64 + 95 + 200 + 20 + 120 + 280 = $779 for the VAM solution.`, null] }
        ]},
        { title: `True/False · Simplex: s1 (0, 5/2, 1, −5/6, 0 | 50), x1 (1, 1/2, 0, 1/6, 0 | 30), s3 (0, 1, 0, −4/3, 1 | 160), Z (0, −3/2, 0, 5/6, 0 | 150)`, marks: `5 points`, items: [
          { type: `tf`, q: `7. The pivot element is 1/2.`, a: 1, why: `Pivot column x2 (−3/2). Ratios: 50 ÷ 5/2 = 20, 30 ÷ 1/2 = 60, 160 ÷ 1 = 160 → pivot 5/2 (row 1) (L3).`, ow: [`1/2 is in the pivot column x2, but its ratio 30 ÷ 1/2 = 60 is larger than 50 ÷ 5/2 = 20, so the pivot is 5/2.`, null] },
          { type: `tf`, q: `8. After one pivot, the first row will be: Row 1 | s1 | −5 | 0 | 1 | −5/3 | 0 | 25/2.`, a: 1, why: `Row 1 is the pivot row: R1 ÷ 5/2 = x2 | 0, 1, 2/5, −1/3, 0 | 20.`, ow: [`Row 1 is the pivot row, so it is divided by 5/2 and relabelled x2: (0, 1, 2/5, −1/3, 0 | 20).`, null] },
          { type: `tf`, q: `9. After one pivot, the second row will be: Row 2 | x1 | 2 | 1 | 0 | 1/3 | 0 | 15.`, a: 1, why: `R2 − 1/2 × new x2 row = x1 | 1, 0, −1/5, 1/3, 0 | 20.`, ow: [`R2 − 1/2 × new x2 row gives x1 | 1, 0, −1/5, 1/3, 0 | 20; the stated row has the wrong x1, x2 entries and RHS.`, null] },
          { type: `tf`, q: `10. After one pivot, the third row will be: Row 3 | s3 | 0 | 0 | −2/5 | −1 | 1 | 140.`, a: 0, why: `R3 − 1 × new x2 row = (0, 0, −2/5, −4/3 + 1/3, 1 | 160 − 20) = (0, 0, −2/5, −1, 1 | 140).`, ow: [null, `False is wrong: R3 − 1 × (0, 1, 2/5, −1/3, 0 | 20) = (0, 0, −2/5, −1, 1 | 140), exactly as stated.`] },
          { type: `tf`, q: `11. After one pivot, the fourth row will be: Row 4 | Z | 0 | 0 | 3/5 | 1/3 | 0 | 180.`, a: 0, why: `Z + 3/2 × new x2 row = (0, 0, 3/5, 5/6 − 1/2, 0 | 150 + 30) = (0, 0, 3/5, 1/3, 0 | 180). Optimal: x1 = 20, x2 = 20, Z = 180.`, ow: [null, `False is wrong: Z + 3/2 × (0, 1, 2/5, −1/3, 0 | 20) = (0, 0, 3/5, 1/3, 0 | 180), the optimal row.`] }
        ]},
        { title: `True/False · CPM: A 5; B 5; C 2 (B); D 2 (A, C); E 3 (A, C); F 1 (A, C); G 2 (B); H 7 (B); I 13 (E); J 6 (E, D); K 4 (F, G, H); L 5 (H); M 5 (J, K, L)`, marks: `7 points`, items: [
          { type: `tf`, q: `12. The earliest start time for activity A is zero.`, a: 0, why: `A has no predecessor, so it starts at the start node and the forward pass gives ES(A) = 0 (L7).`, ow: [null, `False is wrong: A has no predecessor, so its earliest start is 0.`] },
          { type: `tf`, q: `13. The project completion time is 32.`, a: 1, why: `ES: C 5, D/E/F 7, G/H 5, I 10, J 10, K 12, L 12, M 17. I ends at 23, M at 22 → T = 23 (critical path B-C-E-I).`, ow: [`The forward pass ends at EF(I) = 23 via B-C-E-I (5 + 2 + 3 + 13); no path reaches 32.`, null] },
          { type: `tf`, q: `14. The critical activities are B, C, H, E and I.`, a: 1, why: `H has total float 1 (LS 6, ES 5). Critical: B, C, E, I.`, ow: [`H is not critical: ES(H) = 5 but LS(H) = 6 (B-H-L-M = 22 &lt; 23), so TF = 1. Only B, C, E, I are critical.`, null] },
          { type: `tf`, q: `15. The activities A, D, F, G, J, K, L and M are non-critical activities.`, a: 0, why: `Floats: A 2, D 3, F 6, G 7, J 2, K 2, L 1, M 1, all positive, so each listed activity is non-critical (H, float 1, is also non-critical but not listed).`, ow: [null, `False is wrong: A 2, D 3, F 6, G 7, J 2, K 2, L 1, M 1 all have positive float, so all are non-critical.`], key: `Possible intended answer differs if the examiner treated H as critical; see the note.` },
          { type: `tf`, q: `16. The earliest start times for activities C, D and E are equal.`, a: 1, why: `ES(C) = 5; ES(D) = ES(E) = max(EF A 5, EF C 7) = 7.`, ow: [`ES(C) = EF(B) = 5, but D and E wait for both A and C: ES = max(5, 7) = 7, so the three are not equal.`, null] },
          { type: `tf`, q: `17. The earliest start time for activity I is 10.`, a: 0, why: `I's only predecessor is E: ES(E) = max(EF A 5, EF C 7) = 7, EF(E) = 7 + 3 = 10, so ES(I) = 10 (L7).`, ow: [null, `False is wrong: I follows only E, and EF(E) = 7 + 3 = 10, so ES(I) = 10.`] },
          { type: `tf`, q: `18. The total float for activity B equals zero.`, a: 0, why: `B starts the critical path B-C-E-I (23): ES(B) = LS(B) = 0, so its total float is zero (L7).`, ow: [null, `False is wrong: B is on the critical path B-C-E-I, and critical activities have zero total float.`] }
        ]},
        { title: `Question 2 · Assignment`, marks: `12 points`, items: [
          { type: `written`, q: `Solve the assignment problem: J1 (12, 8, 7, 8), J2 (6, 6, 4, 8), J3 (3, 5, 7, 4), J4 (1, 3, 5, 4) for P1–P4.`, ans: `<b>Row reduction</b> (7, 4, 3, 1): J1 (5,1,0,1), J2 (2,2,0,4), J3 (0,2,4,1), J4 (0,2,4,3).<br><b>Column reduction</b> (0, 1, 0, 1): J1 (5,0,0,0), J2 (2,1,0,3), J3 (0,1,4,0), J4 (0,1,4,2).<br>Row scanning: J2 has one zero → J2 → P3 (cross J1's P3 zero); J4 has one zero → J4 → P1 (cross J3's P1 zero); J3 → P4; J1 → P2. Four assignments = 4 → optimal, no θ step needed.<br><b>J1 → P2 (8), J2 → P3 (4), J3 → P4 (4), J4 → P1 (1); total = 17</b> (L5).` }
        ]},
        { title: `Question 3`, marks: `12 points`, items: [
          { type: `written`, q: `A. What is meant by dynamic programming? (2 points)`, ans: `Dynamic programming is a mathematical technique dealing with the optimization of multistage decision problems (the problem is solved stage by stage, each stage using the optimal results of the next stage) (L9).` },
          { type: `written`, q: `B. Find the shortest path (node 1 to node 10) using the backward approach. Arcs: 1→2 4, 1→3 6, 1→4 4; 2→5 3; 3→5 7, 3→6 8, 3→7 7; 4→7 7; 5→8 6, 5→9 7; 6→9 8; 7→8 9, 7→9 7; 8→10 2; 9→10 6. (10 points)`, ans: `<b>Stage 4</b>: d(8) = 2; d(9) = 6.<br><b>Stage 3</b>: d(5) = min{6 + 2, 7 + 6} = 8 (via 8); d(6) = 8 + 6 = 14; d(7) = min{9 + 2, 7 + 6} = 11 (via 8).<br><b>Stage 2</b>: d(2) = 3 + 8 = 11; d(3) = min{7 + 8, 8 + 14, 7 + 11} = 15 (via 5); d(4) = 7 + 11 = 18.<br><b>Stage 1</b>: d(1) = min{4 + 11, 6 + 15, 4 + 18} = 15.<br><b>Shortest path 1 → 2 → 5 → 8 → 10, length 15</b> (L9). (Arc labels read from the photo; the 3rd-year version of this network gives the same answer.)` }
        ]},
        { title: `Question 4 · Formulation`, marks: `12 points`, items: [
          { type: `written`, q: `You want to decide between alternate ways of spending an eight-hour day. You find it five times more fun to play ping-pong in the lounge than to work, but you feel you should work at least three times as many hours as you play ping-pong. Formulate the LP to maximize your objective "fun".`, ans: `x1 = hours of work, x2 = hours of ping-pong.<br><b>Max Z (fun) = x1 + 5x2</b><br>Subject to: x1 + x2 ≤ 8 (eight-hour day)<br>x1 ≥ 3x2, i.e. x1 − 3x2 ≥ 0 (work at least three times as many hours)<br>x1, x2 ≥ 0.<br><i>(Not asked: optimum x1 = 6, x2 = 2, fun = 16.)</i>` }
        ]}
      ]
    },
    /* ───────────── FINAL 2023/2024 JANUARY (3rd year) ───────────── */
    {
      title: `Final Exam 2023/2024 (January, 3rd year)`,
      meta: `January term · 2 hours · 60 marks · 4 questions · Code CS 304 · 3rd CS · Dr. Marwa Yahya, Dr. Abd El-Raheem`,
      note: `Questions transcribed from two photos; a student's handwritten solution (Google Doc / PDF "answers") exists and was compared statement by statement. All of the student's answers were confirmed (Q1-B: 1 F, 2 F, 3 T, 4 F, 5 T, 6 T, 7 F, 8 F, 9 F, 10 F, 11 T, 12 T, 13 F, 14 F, 15 F, 16 T, 17 T, 18 T; assignment 100; shortest path 15). The student key marks statement 9 False because the row is labelled s2 instead of x1, even though its numbers are right.`,
      sections: [
        { title: `Question 1-A · Match`, marks: `6 points`, items: [
          { type: `written`, q: `Column A: 1. Infeasible solutions, 2. Simplex method, 3. Northwest corner method, 4. Linear programming relaxation, 5. Predecessor activity, 6. Successor activity. Column B: A. the initial allocation is made to the cell in the upper left-hand corner of the transportation problem tableau. B. cannot be started until one of other activities is completed. C. is the linear programming problem by omitting all integer or 0-1 constraints on variables. D. are any points outside the feasible region. E. must be completed immediately prior to start of another activity. F. is a method that proceeds from one basic feasible solution in such a way as to continually increase (or decrease) the value of the objective function until optimality is reached.`, ans: `1 → <b>D</b> · 2 → <b>F</b> · 3 → <b>A</b> · 4 → <b>C</b> · 5 → <b>E</b> · 6 → <b>B</b> (matches the student key).` }
        ]},
        { title: `Question 1-B · Vogel (Q1 20, 22, 17, 4 | 120; Q2 24, 37, 9, 7 | 70; Q3 32, 37, 20, 16 | 50; demand 60, 40, 30, 110)`, marks: `6 points`, items: [
          { type: `tf`, q: `1. M12 allocated to the cell (Q1, D2) equals 10.`, a: 1, why: `Step 1 penalties: rows 13, 2, 4; columns 4, 15, 8, 3 → D2 (15) → cheapest 22 at Q1: M12 = 40 (L4).`, ow: [`The first VAM step picks column D2 (penalty 15) and its cheapest cell Q1 (22), allocating all of D2's demand: M12 = 40, not 10.`, null] },
          { type: `tf`, q: `2. M14 allocated to the cell (Q1, D4) equals 110.`, a: 1, why: `Step 2: Q1 penalty 13 → cost 4: min(80 left, 110) = 80.`, ow: [`D4 demands 110, but Q1 has only 120 − 40 = 80 left after Q1D2, so M14 = 80.`, null] },
          { type: `tf`, q: `3. M23 allocated to the cell (Q2, D3) equals M24 allocated the cell (Q2, D4).`, a: 0, why: `Step 3: column D3 penalty 11 → Q2D3 = 30. Step 4: Q2 penalty 17 → Q2D4 = 30. Both 30.`, ow: [null, `False is wrong: VAM gives Q2D3 = 30 (all of D3) and then Q2D4 = 30 (D4's remaining 110 − 80), so they are equal.`] },
          { type: `tf`, q: `4. M31 allocated to the cell (Q3, D1) equals 40.`, a: 1, why: `Step 5: Q3 penalty 32 → Q3D1 = 50; then Q2D1 = 10.`, ow: [`Q3's whole supply is 50, and with D1 the only open column for Q3, VAM gives Q3D1 = 50, not 40.`, null] },
          { type: `tf`, q: `5. M21 allocated to the cell (Q2, D1) equals 10.`, a: 0, why: `VAM gives Q2D3 = 30 and Q2D4 = 30, so Q2 has 70 − 30 − 30 = 10 left, and D1 still needs 60 − 50 = 10 after Q3D1 = 50: M21 = 10 (L4).`, ow: [null, `False is wrong: Q2 has 70 − 30 − 30 = 10 left, and D1 still needs 60 − 50 = 10, so M21 = 10.`] },
          { type: `tf`, q: `6. The total cost equals $3520.`, a: 0, why: `22×40 + 4×80 + 9×30 + 7×30 + 32×50 + 24×10 = 880 + 320 + 270 + 210 + 1600 + 240 = 3520.`, ow: [null, `False is wrong: 22×40 + 4×80 + 9×30 + 7×30 + 32×50 + 24×10 = 880 + 320 + 270 + 210 + 1600 + 240 = 3520.`] }
        ]},
        { title: `Simplex: s1 (4/5, 0, 1, 0, −1/5 | 3), s2 (7/5, 0, 0, 1, −3/5 | 4), x2 (1/5, 1, 0, 0, 1/5 | 7), Z (−22/5, 0, 0, 0, 8/5 | 56)`, marks: `4 points`, items: [
          { type: `tf`, q: `7. The pivot element is 1/5.`, a: 1, why: `Pivot column x1. Ratios 3 ÷ 4/5 = 3.75, 4 ÷ 7/5 = 2.86, 7 ÷ 1/5 = 35 → pivot 7/5 (L3).`, ow: [`1/5 is in the pivot column, but its ratio 7 ÷ 1/5 = 35 is the largest; the smallest is 4 ÷ 7/5 = 2.86, so the pivot is 7/5.`, null] },
          { type: `tf`, q: `8. After one pivot, the first row will be: Row 1 | s1 | 0 | −4 | 1 | 0 | −1 | 47/25.`, a: 1, why: `R1 − 4/5 × new x1 row = s1 | 0, 0, 1, −4/7, 1/7 | 5/7.`, ow: [`R1 − 4/5 × new x1 row = s1 | 0, 0, 1, −4/7, 1/7 | 5/7; the stated row has −4 under x2 and a wrong RHS.`, null] },
          { type: `tf`, q: `9. After one pivot, the second row will be: Row 2 | s2 | 1 | 0 | 0 | 5/7 | −3/7 | 20/7.`, a: 1, why: `The numbers are R2 ÷ 7/5, but x1 replaces s2 as the basic variable, so the row must be labelled x1.`, ow: [`The numbers are R2 ÷ 7/5, but after the pivot x1 replaces s2 in the basis, so the row must be labelled x1.`, null], key: `Student key: False ("same row, but it should be x1 not s2").` },
          { type: `tf`, q: `10. After one pivot, the fourth row will be: Row 4 | Z | 0 | 22 | 0 | 0 | 7 | 62.16.`, a: 1, why: `Z + 22/5 × new x1 row = (0, 0, 0, 22/7, −2/7 | 480/7 ≈ 68.57).`, ow: [`Z + 22/5 × (1, 0, 0, 5/7, −3/7 | 20/7) = (0, 0, 0, 22/7, −2/7 | 480/7 ≈ 68.57), not the stated row.`, null] }
        ]},
        { title: `CPM: A 3; B 3 (A); C 3 (A); D 5 (C); E 6 (B, C); F 9 (D, E); G 5 (E); H 3 (G); I 5 (G, F); J 6 (I, H); K 4 (J)`, marks: `8 points`, items: [
          { type: `tf`, q: `11. The earliest start time for activity B is equal to the earliest start time for activity C.`, a: 0, why: `B and C both have only A as predecessor, so ES(B) = ES(C) = EF(A) = 0 + 3 = 3 (L7, forward pass).`, ow: [null, `False is wrong: both B and C follow only A, so both start at EF(A) = 3.`] },
          { type: `tf`, q: `12. The earliest start time for activity D is 6.`, a: 0, why: `D's only predecessor is C: ES(C) = 3, EF(C) = 3 + 3 = 6, so ES(D) = 6 (L7, forward pass).`, ow: [null, `False is wrong: D follows only C, and EF(C) = 3 + 3 = 6, so ES(D) = 6.`] },
          { type: `tf`, q: `13. The earliest time for activity F is 11.`, a: 1, why: `F waits for both D and E: EF(D) = 6 + 5 = 11 and EF(E) = 6 + 6 = 12, so ES(F) = max(11, 12) = 12, not 11 (L7, forward pass).`, ow: [`11 is only EF(D); F also waits for E, which finishes at 12, so ES(F) = max(11, 12) = 12.`, null] },
          { type: `tf`, q: `14. The earliest start time for activity H equals the earliest start time for activity I.`, a: 1, why: `H follows only G, so ES(H) = EF(G) = 17; I waits for G (17) and F (21), so ES(I) = max(17, 21) = 21. They differ (L7).`, ow: [`ES(H) = EF(G) = 17, but I waits for both G (17) and F (21), so ES(I) = 21.`, null] },
          { type: `tf`, q: `15. The non-critical activities are C, D, G and H.`, a: 1, why: `C is critical (A-C-E-F-I-J-K = 36); non-critical are D (float 1), G (4), H (6).`, ow: [`C is critical (ES = LS = 3) on A-C-E-F-I-J-K = 36; the non-critical activities are only D (TF 1), G (4), H (6).`, null] },
          { type: `tf`, q: `16. The critical activities are A, B, C, E, F, I, J and K.`, a: 0, why: `All have zero float; there are two critical paths through B and C.`, ow: [null, `False is wrong: A, B, C, E, F, I, J, K all have ES = LS (zero float); the two critical paths differ only in B or C.`] },
          { type: `tf`, q: `17. The path A, B, E, F, I, J, K is a critical path.`, a: 0, why: `A-B-E-F-I-J-K = 3 + 3 + 6 + 9 + 5 + 6 + 4 = 36 = project time, and every activity on it has zero float, so it is a critical path (L7).`, ow: [null, `False is wrong: the path's length 3 + 3 + 6 + 9 + 5 + 6 + 4 = 36 equals the project time, so it is critical.`] },
          { type: `tf`, q: `18. The project completion time is 36.`, a: 0, why: `The longest paths A-B-E-F-I-J-K and A-C-E-F-I-J-K both total 36, so the forward pass ends at EF(K) = 36 (L7).`, ow: [null, `False is wrong: the forward pass gives EF(K) = 36, the length of both critical paths.`] }
        ]},
        { title: `Question 2 · Assignment`, marks: `12 points`, items: [
          { type: `written`, q: `Solve: J1 (40, 60, 60, 70), J2 (10, 60, 70, 30), J3 (20, 50, 40, 20), J4 (30, 20, 10, 40) for P1–P4.`, ans: `<b>Row reduction</b> (40, 10, 20, 10): J1 (0,20,20,30), J2 (0,50,60,20), J3 (0,30,20,0), J4 (20,10,0,30).<br><b>Column reduction</b> (0, 10, 0, 0): J1 (0,10,20,30), J2 (0,40,60,20), J3 (0,20,20,0), J4 (20,0,0,30).<br>Minimum lines = 3 (column P1, column P4, row J4) &lt; 4 → θ = 10 (smallest uncovered, J1-P2): J1 (0,0,10,30), J2 (0,30,50,20), J3 (0,10,10,0), J4 (30,0,0,40).<br>4 lines → assign: J2 → P1 (only zero), J1 → P2, J3 → P4, J4 → P3.<br><b>Total = 60 + 10 + 20 + 10 = $100</b> (matches the student key) (L5).` }
        ]},
        { title: `Question 3`, marks: `12 points`, items: [
          { type: `written`, q: `A. What is meant by a path in a network? (2 points)`, ans: `A path in a network is a continuous sequence consisting of nodes and activities alternately, beginning with the start event and stopping at the end event of the network (L7).` },
          { type: `written`, q: `B. Find the shortest path using the backward approach. Arcs: 1→2 4, 1→3 6, 1→4 4; 2→5 3, 2→6 6; 3→6 8, 3→7 7; 4→7 7; 5→8 6; 6→8 5, 6→9 8; 7→9 7; 8→10 2; 9→10 6. (10 points)`, ans: `<b>Stage 4</b>: d(8, 10) = 2; d(9, 10) = 6.<br><b>Stage 3</b>: d(5) = 6 + 2 = 8; d(6) = min{5 + 2, 8 + 6} = 7 (via 8); d(7) = 7 + 6 = 13.<br><b>Stage 2</b>: d(2) = min{3 + 8, 6 + 7} = 11 (via 5); d(3) = min{8 + 7, 7 + 13} = 15 (via 6); d(4) = 7 + 13 = 20.<br><b>Stage 1</b>: d(1) = min{4 + 11, 6 + 15, 4 + 20} = 15.<br><b>Shortest path 1 → 2 → 5 → 8 → 10 = 4 + 3 + 6 + 2 = 15</b> (L9).` }
        ]},
        { title: `Question 4 · Formulation`, marks: `12 points`, items: [
          { type: `written`, q: `A man sells hotdogs and sodas from a pushcart that can support 210 pounds. A hotdog weighs 1/8 pound and a soda 1/2 pound. He must have at least 60 sodas and at least 80 hotdogs, and for every two hotdogs he needs at least one soda. Profit $0.08 per hotdog and $0.04 per soda. Formulate the LP to maximize profit.`, ans: `x1 = number of hotdogs, x2 = number of sodas.<br><b>Max Z = 0.08x1 + 0.04x2</b><br>Subject to:<br>(1/8)x1 + (1/2)x2 ≤ 210 (cart weight)<br>x2 ≥ 60 (sodas)<br>x1 ≥ 80 (hotdogs)<br>x2 ≥ (1/2)x1, i.e. x1 − 2x2 ≤ 0 (one soda per two hotdogs)<br>x1, x2 ≥ 0.<br><i>(Not asked: optimum x1 = 560, x2 = 280, Z = $56.)</i>` }
        ]}
      ]
    },
    /* ───────────── FINAL 2022/2023 AUGUST ───────────── */
    {
      title: `Final Exam 2022/2023 (August)`,
      meta: `August term · 2 hours · 60 marks · 4 questions · Code BS205 · 2nd CS · Dr. Marwa Yahya, Dr. Abd El-Raheem`,
      note: `Transcribed from three clear scans; the same paper is distributed as "Sheet 1" with a solved version (OR_Sheet_1_Solved). Conflicts: (1) the solved sheet marks 23 "The standard deviation of the project is 22" as True, but 22 is the project VARIANCE (σ = √22 = 4.69), so the correct answer is False; (2) the marks pencilled on the exam photo put ✗ on statement 3 (LP relaxation), which is the exact Revision 1 definition and is True (the solved sheet also says True). The Q3 key adds x ≤ 30 (days in September), which is correct.`,
      sections: [
        { title: `Question 1 · True or False · Definitions (1–8)`, marks: `8 points`, items: [
          { type: `tf`, q: `1. Total floats is the amount of time that the completion time of an activity can be delayed without affecting the project completion.`, a: 0, why: `This is the lecture's definition of total float (TF = LF − EF): how long an activity's completion can be delayed without delaying the project (L7).`, ow: [null, `False would reject the L7 definition of total float, which is measured against project completion.`] },
          { type: `tf`, q: `2. predecessor activity cannot be started until one of other activities is completed.`, a: 1, why: `That defines a successor; a predecessor must be completed immediately prior to another activity.`, ow: [`'Cannot start until another is completed' defines a SUCCESSOR; a predecessor must be completed immediately before another starts.`, null] },
          { type: `tf`, q: `3. The linear programming problem by omitting all integer or 0-1 constraints on variables is called the linear programming relaxation.`, a: 0, why: `Revision 1 definition 22: omitting all integer or 0-1 constraints from an IP gives the linear programming relaxation (L6).`, ow: [null, `False would reject the L6 definition of the LP relaxation word for word.`], key: `Pencil mark on the photographed paper: ✗ (wrong).` },
          { type: `tf`, q: `4. The simplex method is concerned with shipping a commodity between a set of sources and a set of destinations.`, a: 1, why: `Shipping a commodity between sources and destinations is the definition of the transportation problem (L4); simplex moves between basic feasible solutions of an LP (L3).`, ow: [`The sentence defines the transportation problem (L4); the simplex method is a general LP algorithm.`, null] },
          { type: `tf`, q: `5. Unbounded solutions are any points outside the feasible region.`, a: 1, why: `Those are infeasible solutions; unbounded = objective infinite (L2).`, ow: [`Points outside the feasible region are INFEASIBLE solutions; an unbounded solution means the objective is infinite.`, null] },
          { type: `tf`, q: `6. In the northwest corner method, the initial allocation is made to the cell in the upper left-hand corner of the transportation problem tableau.`, a: 0, why: `Revision 1 definition 17: NWC makes its initial allocation to the upper left-hand cell of the tableau, ignoring costs (L4).`, ow: [null, `False would reject the L4 definition: NWC always starts in the upper left-hand (northwest) cell.`] },
          { type: `tf`, q: `7. The pivot operation is at the intersection of the pivot column and pivot row.`, a: 1, why: `The element at the intersection of the pivot column and pivot row is the pivot ELEMENT; the pivot operation is the row-operation process around it (L3).`, ow: [`The intersection holds the pivot element; the pivot operation is the set of row operations that use it.`, null] },
          { type: `tf`, q: `8. Constraints are the linear inequalities on the variables of the linear programming problem.`, a: 0, why: `This is the L1 definition: constraints are the linear inequalities on the variables of the LPP.`, ow: [null, `False would reject the L1 definition of constraints word for word.`] }
        ]},
        { title: `NWC (9–14): Q1 (7, 3, 8, 2 | 100), Q2 (5, 6, 11, 12 | 200), Q3 (10, 4, 7, 6 | 300); demand 80, 170, 190, 160`, marks: `6 points`, items: [
          { type: `tf`, q: `9. M11 allocated to the cell (Q1, D1) equals 80.`, a: 0, why: `min(100, 80) = 80. NWC: Q1D1 80, Q1D2 20, Q2D2 150, Q2D3 50, Q3D3 140, Q3D4 160.`, ow: [null, `False is wrong: NWC starts at (Q1, D1) and allocates min(supply 100, demand 80) = 80.`] },
          { type: `tf`, q: `10. M12 allocated to the cell (Q1, D2) equals 150.`, a: 1, why: `After Q1D1 = 80, Q1 has only 100 − 80 = 20 left, so NWC gives M12 = 20; 150 is M22 (L4).`, ow: [`150 is the NWC value of M22; Q1 has only 100 − 80 = 20 left for D2.`, null] },
          { type: `tf`, q: `11. M24 allocated to the cell (Q2, D4) equals 50.`, a: 1, why: `NWC moves Q2's 200 into D2 (150) and D3 (50); Q2 is exhausted before D4, so M24 = 0 (L4).`, ow: [`50 goes to (Q2, D3); Q2's 200 are used up by D2 (150) and D3 (50), so M24 = 0.`, null] },
          { type: `tf`, q: `12. M33 allocated to the cell (Q3, D3) equals 300.`, a: 1, why: `D3 needs 190 − 50 = 140 more after Q2D3 = 50, so NWC gives M33 = 140, and Q3's other 160 go to D4 (L4).`, ow: [`Q3 has 300, but D3 needs only 190 − 50 = 140, so M33 = 140.`, null] },
          { type: `tf`, q: `13. M34 allocated to the cell (Q3, D4) equals 160.`, a: 0, why: `After Q3D3 = 140, Q3 has 300 − 140 = 160 left, exactly D4's demand, so M34 = 160 (L4, NWC).`, ow: [null, `False is wrong: Q3's remaining 160 exactly meets D4's demand of 160.`] },
          { type: `tf`, q: `14. The total cost equals 4000.`, a: 1, why: `NWC cost = 7×80 + 3×20 + 6×150 + 11×50 + 7×140 + 6×160 = 560 + 60 + 900 + 550 + 980 + 960 = 4010, not 4000 (L4).`, ow: [`The NWC total is 560 + 60 + 900 + 550 + 980 + 960 = 4010, not 4000.`, null] }
        ]},
        { title: `PERT (15–25): A (−; 1, 4, 7), B (−; 3, 6, 15), C (A; 3, 9, 27), D (B, C; 6, 9, 12), E (B, C; 6, 12, 30), F (D; 2, 5, 14)`, marks: `11 points`, items: [
          { type: `tf`, q: `15. The expected time and variance for activity A respectively are 4, 1.`, a: 0, why: `te = (a + 4m + b)/6 = (1 + 16 + 7)/6 = 4 and σ² = ((b − a)/6)² = (6/6)² = 1, as stated (L8).`, ow: [null, `False is wrong: (1 + 4×4 + 7)/6 = 4 and ((7 − 1)/6)² = 1, both as stated.`] },
          { type: `tf`, q: `16. The expected time and variance for activity B respectively are 7, 1.`, a: 1, why: `te = (3 + 4×6 + 15)/6 = 7 is right, but σ² = ((15 − 3)/6)² = 4, not 1, so the pair is false (L8).`, ow: [`te = 7 is right, but σ² = ((15 − 3)/6)² = 2² = 4, not 1.`, null] },
          { type: `tf`, q: `17. The expected time and variance for activity C respectively are 27, 11.`, a: 1, why: `27 is C's pessimistic time: te = (3 + 4×9 + 27)/6 = 11 and σ² = ((27 − 3)/6)² = 16 (L8).`, ow: [`27 is the pessimistic estimate; te = 11 and σ² = (24/6)² = 16.`, null] },
          { type: `tf`, q: `18. The expected time and variance for activity D respectively are 9, 9.`, a: 1, why: `te(D) = 9 is right, but the variance is ((b − a)/6)² = (6/6)² = 1, not 9 (L8).`, ow: [`te = 9 is right, but σ² = ((b − a)/6)² = 1; 9 repeats the expected time.`, null] },
          { type: `tf`, q: `19. The expected time and variance for activity E respectively are 14, 16.`, a: 0, why: `te = (6 + 4×12 + 30)/6 = 14 and σ² = ((30 − 6)/6)² = 16, as stated (L8).`, ow: [null, `False is wrong: (6 + 48 + 30)/6 = 14 and (24/6)² = 16, both as stated.`] },
          { type: `tf`, q: `20. The expected time and variance for activity F respectively are 6, 4.`, a: 0, why: `te = (2 + 4×5 + 14)/6 = 6 and σ² = ((14 − 2)/6)² = 4, as stated (L8).`, ow: [null, `False is wrong: (2 + 20 + 14)/6 = 6 and (12/6)² = 4, both as stated.`] },
          { type: `tf`, q: `21. The critical path is A, C, D, F.`, a: 0, why: `A-C-D-F = 4 + 11 + 9 + 6 = 30; A-C-E = 29; B-D-F = 22; B-E = 21.`, ow: [null, `False is wrong: A-C-D-F = 4 + 11 + 9 + 6 = 30 is the longest path (A-C-E = 29, B-D-F = 22).`] },
          { type: `tf`, q: `22. The project completion time is 30.`, a: 0, why: `The critical path A-C-D-F has te = 4 + 11 + 9 + 6 = 30, so the expected completion time is 30 weeks (L8).`, ow: [null, `False is wrong: the longest path A-C-D-F totals 30.`] },
          { type: `tf`, q: `23. The standard deviation of the project is 22.`, a: 1, why: `22 is the project VARIANCE (1 + 16 + 1 + 4 along A-C-D-F); the standard deviation is √22 = 4.69 (L8).`, ow: [`22 is the variance; the standard deviation is its square root, √22 = 4.69.`, null], key: `Solved sheet says True (confuses variance with standard deviation).` },
          { type: `tf`, q: `24. The probability of completing the project in 28 weeks is −0.43.`, a: 1, why: `−0.43 is the z value (28 − 30)/4.69; the probability is 0.5 − 0.1664 = 0.3336 (a probability is never negative) (L8).`, ow: [`−0.43 is z; a probability can never be negative. P = 0.5 − 0.1664 = 0.3336.`, null] },
          { type: `tf`, q: `25. The probability of completing the project in 34 weeks is 0.85.`, a: 1, why: `z = 4/4.69 = 0.85 → P = 0.5 + 0.3023 = 0.8023.`, ow: [`0.85 is the z value, 4/4.69; P = 0.5 + 0.3023 = 0.8023.`, null] }
        ]},
        { title: `Question 2 · Assignment`, marks: `10 points`, items: [
          { type: `written`, q: `Solve the assignment problem: 1 (1, 4, 6, 3), 2 (9, 7, 10, 9), 3 (4, 5, 11, 7), 4 (8, 7, 8, 5) for A–D.`, ans: `Row mins 1, 7, 4, 5 → (0,3,5,2), (2,0,3,2), (0,1,7,3), (3,2,3,0).<br>Column mins 0, 0, 3, 0 → (0,3,2,2), (2,0,0,2), (0,1,4,3), (3,2,0,0).<br>3 lines (rows 2 and 4, column A) &lt; 4 → θ = 1 → (0,2,1,1), (3,0,0,2), (0,0,3,2), (4,2,0,0).<br>Assign 1 → A, 3 → B, 2 → C, 4 → D.<br><b>Total = 1 + 5 + 10 + 5 = 21</b> (same as the solved sheet) (L5).` }
        ]},
        { title: `Question 3 · Formulation`, marks: `10 points`, items: [
          { type: `written`, q: `Recreational Motors: plant A produces 40 golf carts and 35 snowmobiles daily; plant B 65 golf carts and no snowmobiles; plant C 53 snowmobiles and no golf carts. Daily costs $210000, $190000, $182000. Find the number of days (including Sundays and holidays) each plant should operate during September to produce 1,500 golf carts and 1,100 snowmobiles at minimal cost; workers are paid for the whole day once a plant opens.`, ans: `x1, x2, x3 = days plants A, B, C operate in September.<br><b>Min Z = 210000x1 + 190000x2 + 182000x3</b><br>Subject to:<br>40x1 + 65x2 ≥ 1500 (golf carts)<br>35x1 + 53x3 ≥ 1100 (snowmobiles)<br>x1, x2, x3 ≤ 30 (September has 30 days)<br>x1, x2, x3 ≥ 0 and integer (whole-day pay) (L1).` }
        ]},
        { title: `Question 4 · Integer LP (branch and bound)`, marks: `15 points`, items: [
          { type: `written`, q: `Max Z = 3x1 + 4x2 subject to x1 + 3x2 ≤ 13, 5x1 + 2x2 ≤ 20, x1, x2 ≥ 0 and integer.`, ans: `Lines: x1 + 3x2 = 13 → (0, 4.33), (13, 0); 5x1 + 2x2 = 20 → (0, 10), (4, 0).<br><b>Node 1 (LP)</b>: corners (0, 4.33) 17.33; (4, 0) 12; (2.615, 3.462) 21.69 → branch on x1 = 2.615.<br><b>Node 2 (x1 ≥ 3)</b>: corners (3, 2.5) 19; (4, 0) 12; (3, 0) 9 → (3, 2.5), Z = 19.<br><b>Node 3 (x1 ≤ 2)</b>: (2, 3.667) 20.67; (0, 4.33) 17.33; (2, 0) 6 → branch on x2.<br><b>Node 4 (x1 ≤ 2, x2 ≤ 3)</b>: (2, 3) Z = 18 integer.<br><b>Node 5 (x1 ≤ 2, x2 ≥ 4)</b>: (1, 4) Z = 19 integer (best).<br>Node 2's bound 19 cannot beat 19 (its branches give (3.2, 2) 17.6 and an infeasible node).<br><b>Optimal: x1 = 1, x2 = 4, Z = 19</b> (same as the solved sheet) (L6).` }
        ]}
      ]
    },
    /* ───────────── FINAL 2022/2023 JANUARY ───────────── */
    {
      title: `Final Exam 2022/2023 (January)`,
      meta: `January term · 2 hours · 60 marks · 3 questions · Code CS 304 · 3rd CS · Dr. Marwa Yahya, Dr. Abd El-Raheem`,
      note: `Transcribed from the scanned exam + handwritten solution PDF (also distributed as "Sheet 2, 2022/2023 Summer"). The handwritten key agrees with every answer here: T/F 1 F, 2 T, 3 F, 4 F, 5 T, 6 F, 7 F, 8 T, 9 T, 10 T, 11 F, 12 F, 13 F, 14 F, 15 F, 16 T, 17 T, 18 F, 19 F, 20 F, 21 T, 22 F, 23 T, 24 T; MCQ 1 B (2), 2 A (x1), 3 B (s2), 4 A, 5 D, 6 C, 7 B; Q2 Z = 410. Small slip in the key: it writes C's expected time as 9 on the network but statement 7 is still correctly False.`,
      sections: [
        { title: `Question 1-A · True/False · NWC (Q1 3, 1, 7, 4 | 250; Q2 2, 6, 5, 9 | 350; Q3 8, 3, 3, 2 | 400; demand 200, 300, 350, 150)`, marks: `4 points`, items: [
          { type: `tf`, q: `1. M11 allocated to the cell (Q1, D1) equals zero.`, a: 1, why: `NWC: Q1D1 = 200, Q1D2 = 50, Q2D2 = 250, Q2D3 = 100, Q3D3 = 250, Q3D4 = 150 (L4).`, ow: [`NWC always fills the upper-left cell first with min(250, 200) = 200, so M11 = 200, not zero.`, null] },
          { type: `tf`, q: `2. M22 allocated to the cell (Q2, D2) equals M33 allocated the cell (Q3, D3).`, a: 0, why: `NWC: Q1D1 = 200, Q1D2 = 50, Q2D2 = 300 − 50 = 250, Q2D3 = 100, Q3D3 = 350 − 100 = 250, Q3D4 = 150, so M22 = M33 = 250 (L4).`, ow: [null, `False is wrong: NWC gives Q2D2 = 300 − 50 = 250 and Q3D3 = 350 − 100 = 250, so they are equal.`] },
          { type: `tf`, q: `3. M34 allocated to the cell (Q3, D4) equals 250.`, a: 1, why: `After Q3D3 = 250, Q3 has 400 − 250 = 150 left, which exactly meets D4's demand, so NWC gives M34 = 150 (L4).`, ow: [`250 is M33; Q3's remaining 400 − 250 = 150 goes to D4, so M34 = 150.`, null] },
          { type: `tf`, q: `4. The total cost equals 2400.`, a: 1, why: `NWC cost = 3×200 + 1×50 + 6×250 + 5×100 + 3×250 + 2×150 = 600 + 50 + 1500 + 500 + 750 + 300 = 3700, not 2400 (L4).`, ow: [`The NWC total is 600 + 50 + 1500 + 500 + 750 + 300 = 3700, so a total of 2400 is wrong.`, null] }
        ]},
        { title: `PERT (5–14): A (−; 2, 5, 8), B (A; 4, 7, 10), C (A; 4, 9, 14), D (B; 6, 10, 20), E (C, D; 4, 5, 12)`, marks: `10 points`, items: [
          { type: `tf`, q: `5. The expected time and variance for activity A respectively are 5, 1.`, a: 0, why: `te = (a + 4m + b)/6 = (2 + 20 + 8)/6 = 5 and σ² = ((b − a)/6)² = (6/6)² = 1, as stated (L8).`, ow: [null, `False is wrong: (2 + 4×5 + 8)/6 = 5 and ((8 − 2)/6)² = 1, both as stated.`] },
          { type: `tf`, q: `6. The expected time and variance for activity B respectively are 7.5, 1.`, a: 1, why: `te = (4 + 4×7 + 10)/6 = 42/6 = 7, not 7.5 (σ² = (6/6)² = 1 is right), so the pair is false (L8).`, ow: [`te = (4 + 28 + 10)/6 = 7, not 7.5; only the variance 1 is right.`, null] },
          { type: `tf`, q: `7. The expected time and variance for activity C respectively are 10, 2.9.`, a: 1, why: `te = (4 + 4×9 + 14)/6 = 54/6 = 9 and σ² = ((14 − 4)/6)² = 2.78, so (10, 2.9) is false (L8).`, ow: [`te = (4 + 36 + 14)/6 = 9, not 10, and σ² = (10/6)² = 2.78, not 2.9.`, null] },
          { type: `tf`, q: `8. The expected time and variance for activity D respectively are 11, 5.44.`, a: 0, why: `te = (6 + 4×10 + 20)/6 = 11 and σ² = ((20 − 6)/6)² = 5.44, as stated (L8).`, ow: [null, `False is wrong: (6 + 40 + 20)/6 = 11 and (14/6)² = 5.44, both as stated.`] },
          { type: `tf`, q: `9. The expected time and variance for activity E respectively are 6, 1.78.`, a: 0, why: `te = (4 + 4×5 + 12)/6 = 6 and σ² = ((12 − 4)/6)² = 1.78, as stated (L8).`, ow: [null, `False is wrong: (4 + 20 + 12)/6 = 6 and (8/6)² = 1.78, both as stated.`] },
          { type: `tf`, q: `10. The critical path is A, B, D, E.`, a: 0, why: `A-B-D-E = 5 + 7 + 11 + 6 = 29 is longer than the only other path A-C-E = 5 + 9 + 6 = 20, so it is the critical path (L8).`, ow: [null, `False is wrong: A-B-D-E = 5 + 7 + 11 + 6 = 29 is longer than the only other path A-C-E = 20.`] },
          { type: `tf`, q: `11. The project completion time is 28.`, a: 1, why: `The critical path A-B-D-E has te = 5 + 7 + 11 + 6 = 29, so the completion time is 29, not 28 (L8).`, ow: [`The longest path A-B-D-E is 5 + 7 + 11 + 6 = 29, not 28.`, null] },
          { type: `tf`, q: `12. The total float for activity C is equal to zero.`, a: 1, why: `C lies only on A-C-E = 5 + 9 + 6 = 20, which is 9 shorter than the critical 29, so TF(C) = 9 (L8).`, ow: [`C is not on the critical path A-B-D-E; A-C-E is 20 against 29, so C has float 9.`, null] },
          { type: `tf`, q: `13. The variance of the project is 8.22.`, a: 1, why: `The project variance sums the critical activities' variances: A 1 + B 1 + D 5.44 + E 1.78 = 9.22, not 8.22 (L8).`, ow: [`Adding the critical variances 1 + 1 + 5.44 + 1.78 gives 9.22, not 8.22.`, null] },
          { type: `tf`, q: `14. The probability of completing the project in 36 weeks is 0.4893.`, a: 1, why: `z = 7/3.04 = 2.30 → P = 0.5 + 0.4893 = 0.9893.`, ow: [`0.4893 is only the table area for z = 2.30; for X > μ, P = 0.5 + 0.4893 = 0.9893.`, null] }
        ]},
        { title: `General statements (15–24)`, marks: `10 points`, items: [
          { type: `tf`, q: `15. Operations research is the application of economical methods to arrive at the optimal solutions to the problems.`, a: 1, why: `OR applies scientific methods (L1); key: "not the definition".`, ow: [`OR applies SCIENTIFIC methods: the L1 definition is 'scientifically deciding how to best design and operate man-machine systems'.`, null] },
          { type: `tf`, q: `16. In Northwest corner method the allocations are made starting from the left-hand side top corner.`, a: 0, why: `NWC makes its first allocation in the upper left-hand (top-left) cell of the tableau, then moves right or down (L4).`, ow: [null, `False is wrong: the left-hand top corner is the northwest cell, exactly where NWC starts.`] },
          { type: `tf`, q: `17. Vogel's approximation method is connected with transportation problem.`, a: 0, why: `Vogel's approximation method is one of the three starting methods (with NWC and least cost) for an initial BFS of the transportation problem (L4).`, ow: [null, `False is wrong: VAM is a transportation-problem starting method taught in L4.`] },
          { type: `tf`, q: `18. The easiest path within a network diagram is called critical path.`, a: 1, why: `The critical path is the LONGEST path through the network; its length fixes the project completion time (L7).`, ow: [`The critical path is the longest path, not the 'easiest'; its activities have zero float.`, null] },
          { type: `tf`, q: `19. The time by which the activity completion time can be delayed without affecting the start of succeeding activities is known as total float.`, a: 1, why: `Delay without affecting the start of succeeding activities defines FREE float; total float is measured against project completion (L7).`, ow: [`The sentence defines free float; total float allows delay without affecting the project completion time.`, null] },
          { type: `tf`, q: `20. Most likely time is the time required to complete an activity if everything goes perfectly.`, a: 1, why: `The time needed if everything goes perfectly is the OPTIMISTIC time (a); the most likely time (m) is the most realistic estimate (L8).`, ow: [`'Everything goes perfectly' describes the optimistic time; the most likely time is the most realistic estimate.`, null] },
          { type: `tf`, q: `21. Path in a network is a sequence of activities leading from the starting node to the completion node of a network.`, a: 0, why: `A path is a continuous sequence of activities (and nodes) from the start node to the end node of the network, matching the L7 definition.`, ow: [null, `False is wrong: a sequence of activities from the starting to the completion node is the L7 definition of a path.`] },
          { type: `tf`, q: `22. In a pure integer model, some solution values for decision variables are integer and others can be non-integer.`, a: 1, why: `Some integer and some non-integer variables describes a MIXED integer model; in a pure integer model all variables are integer (L6).`, ow: [`That describes a mixed integer model; a pure integer model requires every variable to be integer.`, null] },
          { type: `tf`, q: `23. Formulation of a linear programming problem refers to translating the real-world problem into the form of mathematical equation which could be solved.`, a: 0, why: `This is the Revision 1 definition: formulation translates the real-world problem into mathematical equations that can be solved (L1).`, ow: [null, `False would reject the L1 definition of formulation word for word.`] },
          { type: `tf`, q: `24. Non-negativity restriction indicates that all decision variables must take on values equal to or greater than zero.`, a: 0, why: `This is the L1 definition: the non-negativity restriction means every decision variable must be ≥ 0.`, ow: [null, `False would reject the L1 definition of the non-negativity restriction.`] }
        ]},
        { title: `Question 1-B · Choose: simplex s1 (1, 1, 1, 0, 0 | 20), s2 (2, 1, 0, 1, 0 | 35), s3 (−3, 1, 0, 0, 1 | 12), Z (−5, −4, 0, 0, 0 | 0)`, marks: `7 points`, items: [
          { type: `mcq`, q: `1. The pivot element is`, o: [`1`, `2`, `−3`, `None of the above`], a: 1, why: `Pivot column x1; ratios 20, 17.5 (−3 skipped) → 2 (L3).`, ow: [`Row s1's ratio 20/1 = 20 is larger than 35/2 = 17.5, so 1 is not the pivot.`, null, `−3 is negative; the ratio test uses only positive entries, so −3 can never be a pivot.`, `A pivot exists: column x1, smallest ratio 17.5 in row s2, pivot 2.`] },
          { type: `mcq`, q: `2. The entering variable is`, o: [`x1`, `x2`, `z`, `None of the above`], a: 0, why: `The entering variable has the most negative Z-row entry: −5 under x1 beats −4 under x2 (L3).`, ow: [null, `x2's −4 is less negative than x1's −5, so x2 does not enter first.`, `Z is the objective row, never an entering variable; entering variables are decision or slack variables.`, `x1 enters (most negative −5), so 'None' is wrong.`] },
          { type: `mcq`, q: `3. The exiting variable is`, o: [`s1`, `s2`, `s3`, `None of the above`], a: 1, why: `The exiting variable is the basic variable of the pivot row: ratios 20/1 = 20 (s1), 35/2 = 17.5 (s2), s3 skipped (−3), so s2 leaves (L3).`, ow: [`s1's ratio 20 is larger than s2's 17.5, so s1 stays basic.`, null, `s3 has −3 in the pivot column, which the ratio test skips, so s3 cannot leave.`, `s2 has the smallest ratio and leaves, so 'None' is wrong.`] },
          { type: `mcq`, q: `4. After one pivot, the fourth row is`, o: [`0, −1.5, 0, 2.5, 0 | 87.5`, `0, −5.7, 0, 0, −1.6 | −20`, `0, 1, 5, 0, 0 | 100`, `None of the above`], a: 0, why: `Z + 5 × new pivot row (1, 0.5, 0, 0.5, 0 | 17.5) = (0, −1.5, 0, 2.5, 0 | 87.5) (L3).`, ow: [null, `This row cannot come from Z + 5 × the new pivot row; that gives (0, −1.5, 0, 2.5, 0 | 87.5).`, `(0, 1, 5, 0, 0 | 100) is Z + 5 × row s1, i.e. pivoting on s1, but s2 has the smaller ratio.`, `Option A is the correct new Z row, so 'None' is wrong.`] },
          { type: `mcq`, q: `5. After one pivot, the third row is`, o: [`−1, 0.33, 0, 0, 0.33 | 4`, `−3, 1, 0, 0, 0 | 0`, `1, −0.33, 0, 0, −0.33 | −4`, `None of the above`], a: 3, why: `s3 + 3 × new row = (0, 2.5, 0, 1.5, 1 | 64.5), not listed.`, ow: [`This is row s3 divided by 3; after the pivot every non-pivot row needs 0 in column x1.`, `This keeps −3 under x1, but s3 + 3 × new pivot row must make that entry 0.`, `This is row s3 divided by −3, not a pivot step, and it leaves 1 under x1 instead of 0.`, null] },
          { type: `mcq`, q: `6. After one pivot, the second row is`, o: [`0, 1.7, 0, 1, 0.7 | 43`, `2, 1, 0, 1, 0 | 35`, `1, 0.5, 0, 0.5, 0 | 17.5`, `None of the above`], a: 2, why: `The pivot row s2 is divided by the pivot 2: (2, 1, 0, 1, 0 | 35) ÷ 2 = (1, 0.5, 0, 0.5, 0 | 17.5), and x1 replaces s2 (L3).`, ow: [`The new pivot row must have 1 under x1 (row s2 ÷ 2); this row has 0 there.`, `This is the old row s2 unchanged; it must be divided by the pivot 2.`, null, `Option C, row s2 ÷ 2, is correct, so 'None' is wrong.`] },
          { type: `mcq`, q: `7. Hamster feed (≥ 70 protein, ≥ 100 carbs; A 20/50 $2, B 30/30 $3, C 40/20 $5). The formulation is`, o: [`Max 2x1 + 3x2 + 5x3 with ≤ constraints`, `Min 2x1 + 3x2 + 5x3; 20x1 + 30x2 + 40x3 ≥ 70; 50x1 + 30x2 + 20x3 ≥ 100`, `Min 70x1 + 100x2 with three ≥ constraints`, `None of the above`], a: 1, why: `Feed cost is minimized and 'at least 70 protein / 100 carbs' gives ≥: 20x1 + 30x2 + 40x3 ≥ 70 and 50x1 + 30x2 + 20x3 ≥ 100 (L1, key words).`, ow: [`Costs are minimized, not maximized, and 'at least' needs ≥, not ≤.`, null, `This puts the requirements in the objective (a dual-like form); the model minimizes the feed costs 2, 3, 5.`, `Option B is the correct formulation, so 'None' is wrong.`] }
        ]},
        { title: `Question 2 · Integer LP`, marks: `15 points (approx.)`, items: [
          { type: `written`, q: `Solve: Max Z = 80x1 + 45x2 subject to x1 + x2 ≤ 7, 12x1 + 5x2 ≤ 60, x1 ≥ 4, x2 ≤ 2, x1, x2 ≥ 0 and integer.`, ans: `Lines: x1 + x2 = 7 → (0,7), (7,0); 12x1 + 5x2 = 60 → (0,12), (5,0); x1 = 4 (vertical); x2 = 2 (horizontal).<br>Feasible region corners: (4, 0) 320; (5, 0) 400; (4, 2) 410; (25/6, 2) = (4.17, 2): 12x1 + 10 = 60 → x1 = 25/6, Z = 333.3 + 90 = 423.33.<br><b>Node 1</b>: x1 = 4.17, x2 = 2, Z = 423.33 → branch on x1.<br><b>Node 2 (x1 ≤ 4)</b>: x1 = 4 → best (4, 2), Z = 410 (integer).<br><b>Node 3 (x1 ≥ 5)</b>: only (5, 0), Z = 400 (integer, worse).<br><b>Optimal: x1 = 4, x2 = 2, Z = 410</b> (matches the key) (L6).` }
        ]},
        { title: `Question 3 · CPM network`, marks: `(approx. 10 points)`, items: [
          { type: `written`, q: `Construct the CPM network: A (−), B (−), C (B), D (A, C), E (D), F (C), G (F), H (F), I (B), J (H, E, G).`, ans: `Start activities A, B; end activities I, J.<br>Node 1 (start) → A → node 2; node 1 → B → node 3.<br>Node 3 → C → node 4; node 3 → I → node 9 (end).<br>Dummy node 4 → node 2 (D needs both A and C, while F needs only C).<br>Node 2 → D → node 5 → E → node 7.<br>Node 4 → F → node 6; node 6 → G → node 7; node 6 → H → node 8, dummy node 8 → node 7 (G and H leave the same node and both precede J, so a dummy prevents two parallel arrows).<br>Node 7 → J → node 9 (end).<br>Single start node, single end node, two dummies (L7).` }
        ]}
      ]
    },
    /* ───────────── FINAL 2021/2022 ───────────── */
    {
      title: `Final Exam 2021/2022`,
      meta: `January term · 2 hours · 60 marks · 4 questions · Code CS304 · 3rd CS · Dr. Marwa Yahya, Dr. Abd El-Raheem`,
      note: `Transcribed from two clear photos; the same paper is distributed as "SHEET 2" with a solved version (OR_Sheet_2_Solved) and a student's handwritten solution. Conflicts: (1) the handwritten solution computes z = (99.8 − 104)/9.479 = −0.44 and answers 0.33; the correct z is +0.44 and P = 0.67 (the solved sheet and the PERT tutorial agree with 0.67); (2) the handwritten branch-and-bound ends with Z = 120 at (3, 0), but node x1 ≤ 2 already gives (2, 2) with Z = 140, which is optimal (the solved sheet gives 140); (3) the handwritten mines model omits x ≤ 7 days (the solved sheet adds "7 ≥ x1 + x2 + x3", which is stricter than the intended xi ≤ 7). "Find the dual" is not covered in the 2024 slides; it is answered with standard textbook rules.`,
      sections: [
        { title: `Question 1`, marks: `17 points`, items: [
          { type: `written`, q: `A. Define: i. Non-negativity constraint (1 point). ii. Infeasible solution (1 point). iii. Project evaluation and review technique (PERT) (2 points).`, ans: `i. <b>Non-negativity restriction</b>: all decision variables must take on values equal to or greater than zero.<br>ii. <b>Infeasible solutions</b>: any points outside the feasible region.<br>iii. <b>PERT</b>: a project-scheduling technique in which three time estimates are possible for activities linking up two events (optimistic, most likely, pessimistic), so the time is probabilistic.` },
          { type: `written`, q: `B. Find the shortest path from M1 to M7 using the backward approach (M1→M2 5; M2→M3 7; M2→M4 9; M3→M5 11; M4→M5 6; M4→M6 3; M5→M7 6; M6→M7 8). (7 points)`, ans: `<b>Stage 4</b>: d(M5, M7) = 6; d(M6, M7) = 8.<br><b>Stage 3</b>: d(M3) = 11 + 6 = 17; d(M4) = min{6 + 6, 3 + 8} = 11 (via M6).<br><b>Stage 2</b>: d(M2) = min{7 + 17, 9 + 11} = 20 (via M4).<br><b>Stage 1</b>: d(M1) = 5 + 20 = 25.<br><b>Shortest path M1 → M2 → M4 → M6 → M7 = 25</b> (L9).` },
          { type: `written`, q: `C. Solve the transportation problem with the least cost method: S1 (100, 140, 75 | 300), S2 (90, 20, 110 | 320), S3 (60, 130, 220 | 380); demand 250, 550, 200. (6 points)`, ans: `Cost 20: S2D2 = 320 (S2 done, D2 needs 230). Cost 60: S3D1 = 250 (D1 done). Cost 75: S1D3 = 200 (D3 done). Cost 130: S3D2 = 130 (S3 done). Cost 140: S1D2 = 100.<br><b>Z = 20×320 + 60×250 + 75×200 + 130×130 + 140×100 = 6400 + 15000 + 15000 + 16900 + 14000 = 67,300</b> (L4).` }
        ]},
        { title: `Question 2`, marks: `15 points`, items: [
          { type: `written`, q: `D. Find the dual of Max Z = 12x1 + 4x2 subject to 4x1 + 7x2 ≤ 56, 2x1 + 5x2 ≥ 20, 5x1 + 4x2 = 40, x1, x2 ≥ 0. (5 points)`, ans: `Put the max problem in ≤ form: the ≥ constraint becomes −2x1 − 5x2 ≤ −20; the equality keeps a free dual variable.<br>Dual variables y1 (≤ constraint, y1 ≥ 0), y2 (from the ≥ constraint, y2 ≥ 0), y3 (equality, unrestricted).<br><b>Min W = 56y1 − 20y2 + 40y3</b><br>subject to 4y1 − 2y2 + 5y3 ≥ 12<br>7y1 − 5y2 + 4y3 ≥ 4<br>y1, y2 ≥ 0, y3 unrestricted in sign.<br>(Equivalent form: Min 56y1 + 20y2 + 40y3 with y2 ≤ 0.) Check: primal and dual optima are both 1520/17 ≈ 89.41 (L3).` },
          { type: `written`, q: `E. Universal Mines: high-grade 4, 6, 1 t/day; low-grade 4, 4, 6 t/day; operating cost 20, 22, 18 ($1000/day). Deliver 54 t high and 65 t low grade by the end of the week; workers get a full day's pay for each day or fraction of a day. Formulate. (10 points)`, ans: `x1, x2, x3 = days mines I, II, III operate this week.<br><b>Min Z = 20x1 + 22x2 + 18x3</b> ($1000)<br>4x1 + 6x2 + x3 ≥ 54 (high grade)<br>4x1 + 4x2 + 6x3 ≥ 65 (low grade)<br>x1 ≤ 7, x2 ≤ 7, x3 ≤ 7 (days in a week)<br>x1, x2, x3 ≥ 0 and integer (full day's pay) (L1).` }
        ]},
        { title: `Question 3 · PERT`, marks: `13 points`, items: [
          { type: `written`, q: `Draw a PERT network for: A (−; 7, 16, 28), B (A; 4, 19, 25), C (A; 10, 16, 37), D (B; 7, 13, 37), E (B, C; 13, 19, 33), F (B; 19, 22, 33), G (D, E; 4, 7, 19), H (F, G; 13, 19, 49), I (B, C; 13, 25, 37), J (H, I; 7, 13, 19). a) Identify the critical path and project completion time (2 points). b) Probability of completing the project in two years (104 weeks) (5 points).`, ans: `<b>Network</b>: 1 →A→ 2; 2 →B→ 3; 2 →C→ 4; dummy 3 → 4 (E and I need B and C); 3 →D→ 5; 4 →E→ 5; 3 →F→ 6; 5 →G→ 6; 6 →H→ 7; 4 →I→ 7; 7 →J→ 8.<br><b>Expected times / variances</b>: A 16.5/12.25, B 17.5/12.25, C 18.5/20.25, D 16/25, E 20.33/11.11, F 23.33/5.44, G 8.5/6.25, H 23/36, I 25/16, J 13/4.<br><b>a)</b> Paths: A-B-D-G-H-J 94.5; A-B-E-G-H-J 98.83; A-B-F-H-J 93.33; A-B-I-J 72; <b>A-C-E-G-H-J 99.83</b>; A-C-I-J 73. Critical path A-C-E-G-H-J, completion time <b>99.83 weeks</b>.<br><b>b)</b> σ² = 12.25 + 20.25 + 11.11 + 6.25 + 36 + 4 = 89.86, σ = 9.48.<br>P(X ≤ 104) = P(z ≤ (104 − 99.83)/9.48) = P(z ≤ 0.44) = 0.5 + 0.1700 = <b>0.67</b> (L8).` }
        ]},
        { title: `Question 4 · Branch and bound`, marks: `15 points`, items: [
          { type: `written`, q: `Max Z = 40x1 + 30x2 subject to 10x1 + 6x2 ≤ 35, x1 + x2 ≤ 4, x1, x2 ≥ 0 and integer.`, ans: `Lines: 10x1 + 6x2 = 35 → (0, 5.83), (3.5, 0); x1 + x2 = 4 → (0, 4), (4, 0).<br><b>Node 1 (LP)</b>: corners (0,0) 0; (3.5, 0) 140; (2.75, 1.25) 147.5; (0, 4) 120 → x1 = 2.75, x2 = 1.25, Z = 147.5.<br><b>Node 2 (x1 ≤ 2)</b>: corners (2, 0) 80; (2, 2) 140; (0, 4) 120 → (2, 2), Z = 140, integer (incumbent).<br><b>Node 3 (x1 ≥ 3)</b>: corners (3, 0) 120; (3.5, 0) 140; (3, 0.83) 145 → (3, 0.83), Z = 145 → branch on x2:<br>&nbsp;&nbsp;Node 4 (x2 ≥ 1): 10(3) + 6 = 36 > 35 → infeasible.<br>&nbsp;&nbsp;Node 5 (x2 ≤ 0): (3.5, 0), Z = 140, not better than 140 (its branches give (3, 0) = 120 and an infeasible x1 ≥ 4).<br><b>Optimal: x1 = 2, x2 = 2, Z = 140</b> (L6).` }
        ]}
      ]
    },
    /* ───────────── FINAL 2019/2020 ───────────── */
    {
      title: `Final Exam 2019/2020`,
      meta: `January term · 2 hours · 65 marks · 5 questions · Code B302 · 3rd CS · Dr. Marwa Yahya, Dr. Abd El-Raheem`,
      note: `Transcribed from two clear photos plus an 8-page handwritten student solution. Conflicts: (1) Q1-B: the student formulation multiplies the stock into the coefficients (65x1 + (130/3)x2 ≤ 130 ...), which is wrong; the correct constraints use the fraction of each pound: 0.5x1 + (1/3)x2 ≤ 130 and 0.5x1 + (2/3)x2 ≤ 170. (2) Q3-E: the student's least-cost allocation is right but the total omits 24 × 100 (writes 42,500); the correct LCM cost is 44,900. Other answers (Q2-D 200, Q3-F 45, Q4 84, Q5 9) agree.`,
      sections: [
        { title: `Question 1`, marks: `10 points`, items: [
          { type: `tf`, q: `I. Non negativity condition refers to the method of determining a particular plan or action.`, a: 1, why: `That defines "programming"; non-negativity = all variables ≥ 0 (L1).`, ow: [`'Determining a particular plan of action' defines the word 'programming'; non-negativity means all variables ≥ 0.`, null] },
          { type: `tf`, q: `II. Feasible region is the common region determined by all the constraints including non-negativity constraints.`, a: 0, why: `This is the Revision 1 definition: the feasible region is the common region determined by all constraints, including the non-negativity constraints (L2).`, ow: [null, `False would reject the L2 definition of the feasible region word for word.`] },
          { type: `tf`, q: `III. Unbounded solution means that the objective function is infinite.`, a: 0, why: `Revision 1 defines an unbounded solution as one where the objective function is infinite: Z can grow without limit over the feasible region (L2).`, ow: [null, `False would reject the L2 definition: an unbounded solution means the objective is infinite.`] },
          { type: `written`, q: `B. A candy manufacturer has 130 lb of chocolate-covered cherries and 170 lb of chocolate-covered mints. Mixture 1 is half cherries and half mints by weight and sells for $2.00/lb; mixture 2 is one-third cherries and two-thirds mints and sells for $1.25/lb. Formulate the LP to maximize sales revenue. (7 points)`, ans: `x1 = pounds of mixture 1, x2 = pounds of mixture 2.<br><table><tr><th></th><th>Mix 1</th><th>Mix 2</th><th>Stock</th></tr><tr><td>Cherries</td><td>1/2</td><td>1/3</td><td>130</td></tr><tr><td>Mints</td><td>1/2</td><td>2/3</td><td>170</td></tr><tr><td>Price</td><td>$2.00</td><td>$1.25</td><td></td></tr></table><b>Max Z = 2x1 + 1.25x2</b><br>(1/2)x1 + (1/3)x2 ≤ 130 (cherries)<br>(1/2)x1 + (2/3)x2 ≤ 170 (mints)<br>x1, x2 ≥ 0.<br><i>(Not asked: optimum x1 = 260, x2 = 0, Z = $520.)</i>` }
        ]},
        { title: `Question 2`, marks: `12 points`, items: [
          { type: `written`, q: `C. What is the difference between pure, mixed, and binary integer programming problems? (3 points)`, ans: `<b>Pure IP</b>: all variables are required to be integers. <b>Mixed IP</b>: only some of the variables are required to be integers. <b>Binary (0-1) IP</b>: all the variables must equal 0 or 1 (L6).` },
          { type: `written`, q: `D. Solve: Max Z = 20x1 + 30x2 subject to 3x1 + 6x2 ≤ 40, 10x1 + 5x2 ≤ 50, x2 ≥ 6, x1 ≤ 1, x1, x2 ≥ 0 and integer. (9 points)`, ans: `Lines: 3x1 + 6x2 = 40 → (0, 6.67), (13.3, 0); 10x1 + 5x2 = 50 → (0, 10), (5, 0); x2 = 6; x1 = 1.<br>Feasible region corners: (0, 6) 180; (1, 6) 200; (1, 37/6 = 6.17) 205; (0, 6.67) 200.<br><b>Node 1</b>: x1 = 1, x2 = 6.17, Z = 205 → branch on x2.<br><b>x2 ≤ 6</b>: (1, 6), Z = 200 integer. <b>x2 ≥ 7</b>: 3x1 + 42 > 40 → infeasible.<br><b>Optimal: x1 = 1, x2 = 6, Z = 200</b> (L6).` }
        ]},
        { title: `Question 3`, marks: `20 points`, items: [
          { type: `written`, q: `E. Find the initial solution using the minimum cost method and compute the total cost: S1 (31, 25, 42 | 400), S2 (24, 21, 30 | 1000), S3 (23, 20, 15 | 600); demand 300, 900, 800. (10 points)`, ans: `Cost 15: S3D3 = 600 (S3 done; D3 needs 200). Cost 20 (S3D2) crossed. Cost 21: S2D2 = 900 (D2 done; S2 has 100). Cost 23 crossed. Cost 24: S2D1 = 100 (S2 done; D1 needs 200). Cost 25 crossed. Cost 30 crossed. Cost 31: S1D1 = 200. Cost 42: S1D3 = 200.<br><b>Total = 15×600 + 21×900 + 24×100 + 31×200 + 42×200 = 9000 + 18900 + 2400 + 6200 + 8400 = 44,900</b> (L4).<br><i>The student solution writes 42,500 because it leaves out 24 × 100. (VAM would give 42,700, which is optimal.)</i>` },
          { type: `written`, q: `F. Assign four programmers to four jobs at minimum cost: Mohamed (7, 9, 8, 13), Ahmed (16, 16, 15, 11), Samy (16, 19, 10, 15), Eslam (16, 17, 14, 16) for J1–J4. (10 points)`, ans: `Row mins 7, 11, 10, 14 → (0,2,1,6), (5,5,4,0), (6,9,0,5), (2,3,0,2).<br>Column mins 0, 2, 0, 0 → (0,0,1,6), (5,3,4,0), (6,7,0,5), (2,1,0,2).<br>3 lines (row Mohamed, columns J3, J4) → θ = 1 → (0,0,2,7), (4,2,4,0), (5,6,0,5), (1,0,0,2).<br>Assign: Ahmed → J4 (only zero), Samy → J3, Eslam → J2, Mohamed → J1.<br><b>Total = 7 + 11 + 10 + 17 = 45</b> (L5).` }
        ]},
        { title: `Question 4`, marks: `15 points`, items: [
          { type: `written`, q: `G. What is meant by predecessor activity? (2 points)`, ans: `A predecessor activity must be completed immediately prior to the start of another activity (L7).` },
          { type: `written`, q: `H. A 15 (−); B 17 (A); C 21 (A); D 19 (B); E 22 (B); F 18 (C, D); G 15 (E, F), in months. a. Construct the CPM network (8). b. Critical path and completion time (3). c. Critical activities (2).`, ans: `<b>a.</b> 1 →A→ 2; 2 →B→ 3; 2 →C→ 4; 3 →D→ 4; 3 →E→ 5; 4 →F→ 5; 5 →G→ 6.<br><b>b.</b> Paths: A-B-E-G = 69; A-B-D-F-G = 84; A-C-F-G = 69. ES/LF: node 1: 0/0, node 2: 15/15, node 3: 32/32, node 4: 51/51, node 5: 69/69, node 6: 84/84. <b>Critical path A-B-D-F-G, completion time 84 months.</b><br><b>c.</b> Critical activities: <b>A, B, D, F, G</b> (non-critical C and E, total float 15 each) (L7).` }
        ]},
        { title: `Question 5`, marks: `8 points`, items: [
          { type: `written`, q: `Find the shortest path from S to T using the backward approach: S→A 1, S→B 2, S→C 7, A→D 3, A→E 6, B→D 4, B→E 10, C→E 3, C→T 10, D→T 8, E→T 2.`, ans: `<b>Stage 3</b>: d(D, T) = 8; d(E, T) = 2.<br><b>Stage 2</b>: d(A) = min{3 + 8, 6 + 2} = 8 (via E); d(B) = min{4 + 8, 10 + 2} = 12; d(C) = min{10, 3 + 2} = 5 (via E).<br><b>Stage 1</b>: d(S) = min{1 + 8, 2 + 12, 7 + 5} = min{9, 14, 12} = 9.<br><b>Shortest path S → A → E → T, distance 9</b> (L9).` }
        ]}
      ]
    }
  ]
};

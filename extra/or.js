window.EXTRA = window.EXTRA || {};
EXTRA.or = {
  1: [
    { q: `In a word problem, the phrase "must contain at least 20 units of protein" is translated into:`,
      o: [
        [`An objective function`, `It is a requirement on the variables, not the quantity to optimize.`],
        [`A ≤ constraint`, `"At most / available" gives ≤; "at least" gives ≥.`],
        [`A ≥ constraint`, `Correct. "At least" means the left side must be greater than or equal to 20.`],
        [`A non-negativity restriction`, `Non-negativity only says each variable is ≥ 0.`]
      ], a: 2 },
    { q: `Chairs need 3 labor hours and earn $40; tables need 5 hours and earn $70. The correct objective function is:`,
      o: [
        [`Min Z = 40x1 + 70x2`, `Profit is maximized, not minimized.`],
        [`Max Z = 40x1 + 70x2`, `Correct. Profit per unit times the number of units of each product.`],
        [`Max Z = 3x1 + 5x2`, `These are hours (constraint coefficients), not profits.`],
        [`Max Z = 150x1 + 150x2`, `150 would be the labor availability (right-hand side), not a coefficient.`]
      ], a: 1 },
    { q: `"Production of X (x1) must be at least twice the production of Y (x2)" is written as:`,
      o: [
        [`2x1 ≥ x2`, `This says Y is at most twice X, the reverse relation.`],
        [`x1 + x2 ≥ 2`, `This is a total-production constraint, not a ratio.`],
        [`x1 ≤ 2x2`, `The inequality points the wrong way.`],
        [`x1 − 2x2 ≥ 0`, `Correct. x1 ≥ 2x2, moved to one side (Final 2025/26 Q2).`]
      ], a: 3 },
    { q: `Food A has 4 units of protein and food B 1 unit; the diet needs at least 20 units. The protein constraint is:`,
      o: [
        [`4x1 + x2 ≥ 20`, `Correct. Protein from A plus protein from B must reach 20 (Lecture 1, Example 5).`],
        [`4x1 + x2 ≤ 20`, `"At least" requires ≥.`],
        [`x1 + 4x2 ≥ 20`, `The coefficients are attached to the wrong foods.`],
        [`20x1 + 20x2 ≥ 5`, `The requirement belongs on the right-hand side.`]
      ], a: 0 },
    { q: `x = number of days a factory runs in a 31-day month, and workers are paid a full day for any fraction of a day. The hidden constraints are:`,
      o: [
        [`x ≥ 31 only`, `It cannot run more than 31 days, so this is the wrong direction.`],
        [`x ≤ 7 and integer`, `7 is for a week, not a month.`],
        [`0 ≤ x ≤ 31 and x integer`, `Correct. Days are limited by the month, and full-day pay makes fractions pointless.`],
        [`No hidden constraints`, `Both the day limit and integrality are implied.`]
      ], a: 2 },
    { q: `According to the lecture, formal operations research activities began:`,
      o: [
        [`In the USA during the Great Depression`, `The lecture says England, World War II.`],
        [`In England during World War II`, `Correct. British scientists decided on the best utilization of war material.`],
        [`In Egypt in the 1970s`, `Not stated in the lecture.`],
        [`In the civilian sector before any military use`, `Civilian use came after the war.`]
      ], a: 1 },
    { q: `Which of the following is NOT one of the four formulation steps?`,
      o: [
        [`Introduce the decision variables`, `This is Step I.`],
        [`Summarize the data in a table`, `This is Step II.`],
        [`Write the constraints and non-negativity`, `This is Step IV.`],
        [`Select the pivot element`, `Correct. That belongs to the simplex method, not formulation.`]
      ], a: 3 },
    { q: `"The total weekly production of both products must be at least 30 units" becomes:`,
      o: [
        [`x1 + x2 ≥ 30`, `Correct. The sum of both products must reach 30.`],
        [`x1 ≥ 30 and x2 ≥ 30`, `That demands 30 of EACH product (60 in total).`],
        [`x1 + x2 ≤ 30`, `"At least" is ≥.`],
        [`30x1 + 30x2 ≥ 1`, `Coefficients and RHS are mixed up.`]
      ], a: 0 },
    { q: `Furniture model: 2x1 + x2 ≤ 6 (wood), 7x1 + 8x2 ≤ 28 (hours). Which point is feasible?`,
      o: [
        [`(2, 2)`, `Hours: 14 + 16 = 30 > 28, infeasible.`],
        [`(1, 2)`, `Correct. Wood 2 + 2 = 4 ≤ 6 and hours 7 + 16 = 23 ≤ 28.`],
        [`(3, 1)`, `Wood: 6 + 1 = 7 > 6, infeasible.`],
        [`(0, 4)`, `Hours: 32 > 28, infeasible.`]
      ], a: 1 },
    { q: `Mixture 2 is one-third cherries by weight. If x2 = pounds of mixture 2, the cherries it uses are:`,
      o: [
        [`130x2/3`, `130 is the stock available; it belongs on the right-hand side (the error in one student solution).`],
        [`3x2`, `That would be three pounds of cherries per pound of mixture.`],
        [`x2/3`, `Correct. One third of every pound is cherries, so the constraint is (1/2)x1 + (1/3)x2 ≤ 130.`],
        [`2x2/3`, `Two-thirds is the mint share.`]
      ], a: 2 }
  ],
  2: [
    { q: `The corner point where 2x1 + x2 = 8 meets 2x1 + 3x2 = 12 is:`,
      o: [
        [`(3, 2)`, `Correct. Subtracting gives 2x2 = 4, so x2 = 2 and x1 = 3.`],
        [`(2, 3)`, `Check: 2(2) + 3 = 7 ≠ 8.`],
        [`(4, 0)`, `That is the x1-intercept of the first line only.`],
        [`(0, 4)`, `That is the x2-intercept of the second line only.`]
      ], a: 0 },
    { q: `Max Z = 5x1 + 4x2 subject to x1 + x2 ≤ 5, 2x1 + x2 ≤ 8, x ≥ 0. The optimum is:`,
      o: [
        [`(4, 0), Z = 20`, `A corner, but not the best.`],
        [`(0, 5), Z = 20`, `A corner, but not the best.`],
        [`(3, 2), Z = 23`, `Correct. Corners: (0,0) 0, (4,0) 20, (3,2) 23, (0,5) 20.`],
        [`(5, 0), Z = 25`, `Infeasible: 2(5) = 10 > 8.`]
      ], a: 2 },
    { q: `Min Z = 3x1 + 2x2 subject to x1 + x2 ≥ 4, x1 + 3x2 ≥ 6, x ≥ 0. The minimum is:`,
      o: [
        [`11 at (3, 1)`, `A corner but not the smallest value.`],
        [`8 at (0, 4)`, `Correct. Corners (0,4) = 8, (3,1) = 11, (6,0) = 18.`],
        [`0 at (0, 0)`, `(0,0) violates both ≥ constraints.`],
        [`18 at (6, 0)`, `That is the largest corner value.`]
      ], a: 1 },
    { q: `The intercepts of 15x1 + 18x2 = 2500 are:`,
      o: [
        [`(250, 0) and (0, 250)`, `Divide 2500 by each coefficient.`],
        [`(15, 0) and (0, 18)`, `These are the coefficients, not the intercepts.`],
        [`(264, 0) and (0, 120)`, `Those belong to 10x1 + 22x2 = 2640.`],
        [`(166.7, 0) and (0, 138.9)`, `Correct. 2500/15 = 166.7 and 2500/18 = 138.9.`]
      ], a: 3 },
    { q: `If the objective line is parallel to a binding edge of the feasible region, the LP has:`,
      o: [
        [`Multiple optimal solutions`, `Correct. Both end corners and every point between them are optimal.`],
        [`No feasible solution`, `Parallelism does not empty the region.`],
        [`An unbounded solution`, `Unboundedness needs an open region in the improving direction.`],
        [`Exactly one optimal corner`, `Two corners tie.`]
      ], a: 0 },
    { q: `A MAX problem with positive objective coefficients and only ≥ constraints (region open to the upper right) usually has:`,
      o: [
        [`An optimum at the origin`, `The origin is excluded by ≥ constraints with positive RHS.`],
        [`An infeasible region`, `The region exists; it is just open.`],
        [`An unbounded solution`, `Correct. Z can grow without limit, so the objective is infinite.`],
        [`Multiple optima`, `Not implied.`]
      ], a: 2 },
    { q: `To shade 2x1 + 3x2 ≤ 12 you take the side of the line that:`,
      o: [
        [`Is away from the origin`, `That is for ≥ constraints (when the origin fails the test).`],
        [`Contains the origin`, `Correct. 0 ≤ 12 is true, so the origin's side is feasible.`],
        [`Is above the x1-axis only`, `Both sides contain points above the axis.`],
        [`Is chosen arbitrarily`, `Test a point (usually the origin).`]
      ], a: 1 },
    { q: `Max Z = 2x1 + 4x2 subject to x1 + 2x2 ≤ 8, x1 ≤ 6, x ≥ 0. What is true?`,
      o: [
        [`Unique optimum at (6, 0)`, `Z(6,0) = 12, smaller than 16.`],
        [`Unbounded`, `The region is closed (a polygon).`],
        [`Infeasible`, `(0,0) is feasible.`],
        [`Multiple optima: (0, 4) and (6, 1) both give Z = 16`, `Correct. Z = 2(x1 + 2x2) = 16 along the whole edge x1 + 2x2 = 8.`]
      ], a: 3 },
    { q: `For x1 + 2x2 ≤ 22 and 4x1 + 2x2 ≤ 40, which point is infeasible?`,
      o: [
        [`(6, 8)`, `6 + 16 = 22 and 24 + 16 = 40, both satisfied (it is the corner C).`],
        [`(10, 0)`, `10 ≤ 22 and 40 ≤ 40.`],
        [`(8, 8)`, `Correct. 8 + 16 = 24 > 22.`],
        [`(0, 11)`, `22 ≤ 22 and 22 ≤ 40.`]
      ], a: 2 },
    { q: `A MIN problem's corner table shows Z = 70, 52, 56. The optimal value is:`,
      o: [
        [`52`, `Correct. For minimization pick the smallest corner value (B(1.5, 4) in the section example).`],
        [`70`, `That is the largest.`],
        [`56`, `Not the smallest.`],
        [`178 (the sum)`, `Corner values are compared, not added.`]
      ], a: 0 }
  ],
  3: [
    { q: `Max Z = 5x1 + 4x2 with x1 + x2 ≤ 5 and 2x1 + x2 ≤ 8. The initial Z row of the simplex tableau (x1, x2, s1, s2 | b) is:`,
      o: [
        [`(5, 4, 0, 0 | 0)`, `Z − 5x1 − 4x2 = 0 gives negative coefficients.`],
        [`(−5, −4, 0, 0 | 0)`, `Correct. Moving the objective terms to the left makes them negative.`],
        [`(−5, −4, 1, 1 | 0)`, `Slacks have 0 cost in the Z row.`],
        [`(1, 1, 0, 0 | 5)`, `That is the first constraint row.`]
      ], a: 1 },
    { q: `Same problem. The pivot element of the first iteration is:`,
      o: [
        [`1 (row s1)`, `Ratio 5/1 = 5 is larger than 8/2 = 4.`],
        [`−5`, `Z-row entries are never pivots.`],
        [`1 (column x2)`, `x2 is not the pivot column (−4 > −5).`],
        [`2 (row s2, column x1)`, `Correct. Pivot column x1; ratios 5 and 4 → row s2.`]
      ], a: 3 },
    { q: `Same problem. After the first pivot, the value of Z is:`,
      o: [
        [`20`, `Correct. x1 = 4, so Z = 5 × 4 = 20 (Z row becomes 0, −1.5, 0, 2.5 | 20).`],
        [`23`, `23 is the final optimum after a second pivot.`],
        [`8`, `8 is a right-hand side.`],
        [`4`, `4 is the new value of x1.`]
      ], a: 0 },
    { q: `In the ratio test you:`,
      o: [
        [`Divide by every entry of the pivot column, including negatives`, `Negative or zero entries are skipped.`],
        [`Choose the largest ratio`, `The smallest positive ratio is chosen.`],
        [`Use only the positive entries of the pivot column and take the smallest ratio`, `Correct (L3, step II).`],
        [`Include the Z row`, `The Z row never gets a ratio.`]
      ], a: 2 },
    { q: `An LP has three ≤ constraints and two decision variables. How many slack variables are added?`,
      o: [
        [`2`, `Slacks match constraints, not variables.`],
        [`3`, `Correct. One slack per ≤ constraint.`],
        [`5`, `That is the total number of variables after adding slacks.`],
        [`1`, `Each constraint needs its own slack.`]
      ], a: 1 },
    { q: `A tableau whose Z row contains no negative numbers (excluding the RHS) is:`,
      o: [
        [`Optimal`, `Correct. Stopping rule of step IV.`],
        [`Infeasible`, `Feasibility is shown by non-negative RHS values.`],
        [`Unbounded`, `Unboundedness shows up as a pivot column with no positive entry.`],
        [`Degenerate always`, `Degeneracy is a zero basic variable, unrelated.`]
      ], a: 0 },
    { q: `If every entry in the chosen pivot column is zero or negative, then:`,
      o: [
        [`Choose the least negative as pivot`, `A pivot must be positive.`],
        [`The current solution is optimal`, `There is still a negative Z entry.`],
        [`Swap two rows`, `That does not fix anything.`],
        [`The program has no (bounded) solution: it is unbounded`, `Correct (L3: "If no element in the work column is positive, the program has no solution").`]
      ], a: 3 },
    { q: `Section shortcut: old element 5, its pivot-row element 4, its pivot-column element 3, pivot 1. The new element is:`,
      o: [
        [`17`, `The product is subtracted, not added.`],
        [`5`, `Only columns with 0 in the pivot row stay unchanged.`],
        [`−7`, `Correct. 5 − (4 × 3)/1 = −7 (revision example, x2 in row s2).`],
        [`12`, `12 is the product itself.`]
      ], a: 2 },
    { q: `Continuing Max Z = 5x1 + 4x2 (x1 + x2 ≤ 5, 2x1 + x2 ≤ 8) to the end, the optimal solution is:`,
      o: [
        [`x1 = 4, x2 = 0, Z = 20`, `−1.5 remains in the Z row after the first pivot, so it is not optimal.`],
        [`x1 = 3, x2 = 2, Z = 23`, `Correct. Second pivot: column x2, ratios 1/0.5 = 2 and 4/0.5 = 8 → x2 = 2, x1 = 3, Z = 23 (same as the graph).`],
        [`x1 = 0, x2 = 5, Z = 20`, `Not optimal.`],
        [`x1 = 5, x2 = 0, Z = 25`, `Infeasible.`]
      ], a: 1 },
    { q: `The dual of Max Z = 3x1 + 2x2 subject to x1 + x2 ≤ 4, x1 + 3x2 ≤ 6, x ≥ 0 is:`,
      o: [
        [`Min W = 4y1 + 6y2; y1 + y2 ≥ 3; y1 + 3y2 ≥ 2; y ≥ 0`, `Correct. RHS becomes costs, columns become rows, ≤ becomes ≥.`],
        [`Max W = 4y1 + 6y2; y1 + y2 ≤ 3; y1 + 3y2 ≤ 2`, `The dual of a max problem is a min problem with ≥.`],
        [`Min W = 3y1 + 2y2; y1 + y2 ≥ 4; y1 + 3y2 ≥ 6`, `The roles of the objective coefficients and RHS are swapped incorrectly.`],
        [`Min W = 4y1 + 6y2; y1 + 3y2 ≥ 3; y1 + y2 ≥ 2`, `The matrix must be transposed column by column: x1's column (1, 1) gives y1 + y2 ≥ 3.`]
      ], a: 0 }
  ],
  4: [
    { q: `Costs S1 (4, 6, 8 | 20), S2 (5, 3, 7 | 30); demand 10, 25, 15. The northwest corner cost is:`,
      o: [
        [`230`, `That is the least-cost (and VAM) result.`],
        [`250`, `Correct. S1D1 = 10, S1D2 = 10, S2D2 = 15, S2D3 = 15: 40 + 60 + 45 + 105 = 250.`],
        [`270`, `Recheck: 4×10 + 6×10 + 3×15 + 7×15 = 250.`],
        [`200`, `Too low; no feasible plan costs 200.`]
      ], a: 1 },
    { q: `Same data. The least cost method gives:`,
      o: [
        [`250`, `That is NWC.`],
        [`210`, `Below the optimum, impossible.`],
        [`240`, `Recheck the allocations.`],
        [`230`, `Correct. S2D2 = 25 (3), S1D1 = 10 (4), S2D3 = 5 (7), S1D3 = 10 (8): 75 + 40 + 35 + 80 = 230 (also optimal).`]
      ], a: 3 },
    { q: `Same data, Vogel's first step. Penalties: rows S1 = 2, S2 = 2; columns D1 = 1, D2 = 3, D3 = 1. The first allocation is:`,
      o: [
        [`S2D2 = 25 (cost 3)`, `Correct. Highest penalty D2 (3); its cheapest cell is S2 at cost 3; allocate min(30, 25).`],
        [`S1D1 = 10 (cost 4)`, `D1 has penalty 1 only.`],
        [`S1D2 = 20`, `D2's cheapest cell is S2 (3), not S1 (6).`],
        [`S2D3 = 15`, `D3 has penalty 1.`]
      ], a: 0 },
    { q: `A balanced transportation problem with 3 sources and 4 destinations has a basic feasible solution with how many allocated cells?`,
      o: [
        [`12`, `That is the total number of cells.`],
        [`7`, `That is m + n.`],
        [`6`, `Correct. m + n − 1 = 3 + 4 − 1.`],
        [`4`, `Too few.`]
      ], a: 2 },
    { q: `Total supply is 300 and total demand is 250. Before applying NWC/LCM/VAM you should:`,
      o: [
        [`Delete the largest source`, `That loses information.`],
        [`Add a dummy destination with demand 50 and zero costs`, `Correct. This balances the problem (textbook rule).`],
        [`Add a dummy source with supply 50`, `A dummy source is needed when demand exceeds supply.`],
        [`Nothing; the methods work as is`, `They need supply = demand.`]
      ], a: 1 },
    { q: `Stepping stone path for an empty cell: + (cost 5), − (cost 6), + (cost 8), − (cost 1). The improvement index is:`,
      o: [
        [`+6`, `Correct. 5 − 6 + 8 − 1 = 6 ≥ 0, so entering this cell would raise the cost.`],
        [`−6`, `Signs: add the + cells, subtract the − cells.`],
        [`20`, `That adds all four costs.`],
        [`0`, `Compute 5 − 6 + 8 − 1.`]
      ], a: 0 },
    { q: `On an improving path the − cells hold 300 and 200 units. The amount θ shifted is:`,
      o: [
        [`300`, `Would make the 200-cell negative.`],
        [`500`, `Not a valid amount.`],
        [`100`, `No reason for 100.`],
        [`200`, `Correct. θ = the smallest allocation among the − cells.`]
      ], a: 3 },
    { q: `An improvement index is −4 and θ = 50. The total cost changes by:`,
      o: [
        [`+200`, `A negative index lowers the cost.`],
        [`−54`, `Multiply, do not add.`],
        [`−200`, `Correct. Change = index × θ = −4 × 50.`],
        [`−4`, `That is the change per unit.`]
      ], a: 2 },
    { q: `The Vogel penalty of the row with costs 16, 13, 22, 17 is:`,
      o: [
        [`9`, `That is largest − smallest.`],
        [`3`, `Correct. Two lowest are 13 and 16: 16 − 13 = 3.`],
        [`1`, `Not the two lowest.`],
        [`13`, `That is the lowest cost itself.`]
      ], a: 1 },
    { q: `Which starting method completely ignores the transportation costs?`,
      o: [
        [`Northwest corner rule`, `Correct. It always starts at the upper-left cell, so it often gives the highest cost.`],
        [`Least cost method`, `It always looks for the lowest cost.`],
        [`Vogel's approximation`, `Penalties are built from costs.`],
        [`Stepping stone`, `It evaluates costs along closed paths.`]
      ], a: 0 }
  ],
  5: [
    { q: `Solve the assignment (rows 1–3, columns A–C): (9, 2, 7), (6, 4, 3), (5, 8, 1). The minimum total cost is:`,
      o: [
        [`7`, `Not feasible: 2 and 1 come from rows 1 and 3, but row 2's cheapest (3) shares column C with row 3.`],
        [`10`, `Not optimal.`],
        [`9`, `Correct. 1 → B (2), 2 → A (6), 3 → C (1).`],
        [`12`, `Not optimal.`]
      ], a: 2 },
    { q: `Row reduction of the row (48, 48, 50, 44) gives:`,
      o: [
        [`(0, 0, 2, −4)`, `Subtract the row MINIMUM (44), not the first element.`],
        [`(48, 48, 50, 44)`, `No reduction done.`],
        [`(4, 4, 6, 0)`, `Correct. Each entry minus 44.`],
        [`(2, 2, 4, 0)`, `Arithmetic error.`]
      ], a: 2 },
    { q: `θ = 1. An element equal to 12 lies at the intersection of two covering lines. Its new value is:`,
      o: [
        [`11`, `Uncovered elements decrease by θ.`],
        [`13`, `Correct. Intersection elements increase by θ.`],
        [`12`, `Single-line elements stay unchanged.`],
        [`0`, `No rule makes it 0.`]
      ], a: 1 },
    { q: `Profit matrix (rows 1–2, columns A–B): (5, 8), (7, 6). The maximum total profit is:`,
      o: [
        [`11`, `That is 5 + 6 (diagonal), not the best.`],
        [`13`, `Not a valid assignment total.`],
        [`14`, `Not a valid assignment total.`],
        [`15`, `Correct. 1 → B (8), 2 → A (7). Converting: 8 − profit gives (3, 0), (1, 2); minimum regret 0 + 1.`]
      ], a: 3 },
    { q: `After reduction the minimum number of covering lines is 3 for a 4 × 4 matrix. Next you:`,
      o: [
        [`Modify the matrix with θ (smallest uncovered element) and redraw lines`, `Correct. Lines < n means an optimal assignment is not yet possible.`],
        [`Stop and assign`, `Only 3 independent zeros exist.`],
        [`Add a dummy row`, `The matrix is already square.`],
        [`Repeat row reduction`, `Rows already contain zeros; it changes nothing.`]
      ], a: 0 },
    { q: `There are 3 jobs and 4 machines. To use the Hungarian method you:`,
      o: [
        [`Delete one machine at random`, `That may delete the best machine.`],
        [`Assign two jobs to one machine`, `Each machine takes at most one job.`],
        [`Add a dummy job row with zero costs`, `Correct. This makes the matrix square (textbook rule); the machine given the dummy job stays idle.`],
        [`Use the northwest corner rule`, `That is for transportation.`]
      ], a: 2 },
    { q: `Once n independent zeros are found, the total cost is computed from:`,
      o: [
        [`The reduced matrix (all zeros, so 0)`, `The reduced values are opportunity costs.`],
        [`The original cost matrix`, `Correct. Add the original costs of the chosen cells.`],
        [`The row minima only`, `They are only part of the cost.`],
        [`The θ values`, `θ is a modification step.`]
      ], a: 1 },
    { q: `Lecture example 2: J1 → P4 (44), J2 → P1 (56), J3 → P3 (90), J4 → P2 (44). The total is:`,
      o: [
        [`230`, `Arithmetic error.`],
        [`244`, `Arithmetic error.`],
        [`224`, `Arithmetic error.`],
        [`234`, `Correct. 44 + 56 + 90 + 44 = 234.`]
      ], a: 3 },
    { q: `The Hungarian method is designed to solve:`,
      o: [
        [`The transportation problem's initial BFS`, `That uses NWC, LCM or VAM.`],
        [`The shortest route problem`, `That uses dynamic programming.`],
        [`Project scheduling`, `That uses CPM/PERT.`],
        [`The assignment problem`, `Correct.`]
      ], a: 3 },
    { q: `In a 5 × 5 assignment problem, the optimal solution contains how many assignments?`,
      o: [
        [`5`, `Correct. One per row and one per column.`],
        [`9`, `m + n − 1 = 9 is for transportation BFS; assignment needs exactly n.`],
        [`25`, `That is every cell.`],
        [`10`, `Not meaningful.`]
      ], a: 0 }
  ],
  6: [
    { q: `Max Z = 5x1 + 4x2 subject to x1 + x2 ≤ 5, 10x1 + 6x2 ≤ 45, x ≥ 0 and integer. The integer optimum is:`,
      o: [
        [`(3.75, 1.25), Z = 23.75`, `That is the LP relaxation, not integer.`],
        [`(4, 0), Z = 20`, `Feasible but not the best.`],
        [`(3, 2), Z = 23`, `Correct. 10(3) + 6(2) = 42 ≤ 45 and 3 + 2 = 5 ≤ 5.`],
        [`(4, 1), Z = 24`, `Infeasible: 40 + 6 = 46 > 45.`]
      ], a: 2 },
    { q: `The LP relaxation gives x2 = 3.4. Branching on x2 creates:`,
      o: [
        [`x2 ≤ 3.4 and x2 ≥ 3.4`, `The fractional point must be excluded.`],
        [`x2 ≤ 2 and x2 ≥ 5`, `This wrongly cuts off integers 3 and 4.`],
        [`x2 ≤ 3 and x2 ≥ 4`, `Correct.`],
        [`x1 ≤ 3 and x1 ≥ 4`, `Branch on the fractional variable x2.`]
      ], a: 2 },
    { q: `In a MAX branch and bound, the incumbent integer Z is 40. A live node's LP gives Z = 39 (fractional). You should:`,
      o: [
        [`Branch on it`, `Its best possible value 39 cannot beat 40.`],
        [`Fathom (prune) it`, `Correct. Its bound is not better than the incumbent.`],
        [`Make it the new incumbent`, `It is fractional and worse.`],
        [`Restart the method`, `Not needed.`]
      ], a: 1 },
    { q: `A binary (0-1) variable can take the values:`,
      o: [
        [`0 or 1 only`, `Correct.`],
        [`Any integer`, `That is a general integer variable.`],
        [`Any value between 0 and 1`, `That is a continuous bounded variable.`],
        [`Only 1`, `0 is also allowed.`]
      ], a: 0 },
    { q: `Why can't we simply round the LP optimum (2.75, 1.25) of 10x1 + 6x2 ≤ 35, x1 + x2 ≤ 4 to (3, 1)?`,
      o: [
        [`Rounding always gives the optimum`, `Not true in general.`],
        [`(3, 1) has a lower Z than (2, 2)`, `(3,1) would give 150, higher; the issue is feasibility.`],
        [`Integers are not allowed in LP`, `Irrelevant.`],
        [`(3, 1) is infeasible: 10(3) + 6(1) = 36 > 35`, `Correct. Rounding can leave the feasible region; the true optimum is (2, 2), Z = 140.`]
      ], a: 3 },
    { q: `For a maximization problem, the Z value of the LP relaxation is:`,
      o: [
        [`A lower bound on the integer optimum`, `It is an upper bound.`],
        [`An upper bound on the integer optimum`, `Correct. Adding integer restrictions can only keep or reduce Z.`],
        [`Always equal to the integer optimum`, `Only when the LP solution happens to be integer.`],
        [`Unrelated to the integer optimum`, `It bounds it.`]
      ], a: 1 },
    { q: `In the Sheet 2 tree, the node with x1 ≥ 3 and x2 ≥ 1 (constraint 10x1 + 6x2 ≤ 35) is:`,
      o: [
        [`Optimal with Z = 150`, `Its smallest point (3, 1) already violates the constraint.`],
        [`Unbounded`, `The region is bounded.`],
        [`Infeasible`, `Correct. 10(3) + 6(1) = 36 > 35.`],
        [`Integer with Z = 145`, `(3, 0.83) is the parent node, not this one.`]
      ], a: 2 },
    { q: `Max Z = 3x1 + 2x2 subject to 2x1 + 2x2 ≤ 9, 3x1 + x2 ≤ 10, x ≥ 0 and integer. The integer optimum is:`,
      o: [
        [`(3, 1), Z = 11`, `Correct. 6 + 2 = 8 ≤ 9 and 9 + 1 = 10 ≤ 10. (The LP relaxation gives (2.75, 1.75), Z = 11.75.)`],
        [`(2, 2), Z = 10`, `Feasible but worse.`],
        [`(3, 2), Z = 13`, `Infeasible: 6 + 4 = 10 > 9.`],
        [`(2.75, 1.75), Z = 11.75`, `Not integer.`]
      ], a: 0 },
    { q: `Which is an example of a MIXED integer program?`,
      o: [
        [`x1 = number of trucks (integer), x2 = litres of fuel (continuous)`, `Correct. Only some variables must be integers.`],
        [`All variables are numbers of workers`, `That is pure IP.`],
        [`All variables are yes/no decisions`, `That is binary IP.`],
        [`No variable must be integer`, `That is ordinary LP.`]
      ], a: 0 },
    { q: `Sheet 1 tree (Max 3x1 + 4x2; x1 + 3x2 ≤ 13; 5x1 + 2x2 ≤ 20): the node x1 ≤ 2, x2 ≥ 4 gives:`,
      o: [
        [`(2, 4), Z = 22`, `Infeasible: 2 + 12 = 14 > 13.`],
        [`Infeasible`, `(1, 4) satisfies everything.`],
        [`(2, 3.67), Z = 20.67`, `That is the parent node x1 ≤ 2.`],
        [`(1, 4), Z = 19`, `Correct. On x1 + 3x2 = 13 with x2 = 4, x1 = 1; this is the optimum.`]
      ], a: 3 }
  ],
  7: [
    { q: `Project: A 3 (−), B 4 (−), C 2 (A), D 5 (A, B), E 3 (C, D). The project completion time is:`,
      o: [
        [`8`, `That is path A-C-E only.`],
        [`12`, `Correct. Longest path B-D-E = 4 + 5 + 3 = 12.`],
        [`11`, `That is A-D-E.`],
        [`17`, `Sum of all durations, not a path.`]
      ], a: 1 },
    { q: `Same project. The total float of activity A is:`,
      o: [
        [`0`, `A is not on the critical path B-D-E.`],
        [`4`, `That is C's float.`],
        [`1`, `Correct. LF(A) = min(LS C = 7, LS D = 4) = 4; EF(A) = 3; TF = 1.`],
        [`3`, `3 is A's duration.`]
      ], a: 2 },
    { q: `Same project. The total float of activity C is:`,
      o: [
        [`4`, `Correct. ES = 3, EF = 5, LF = LS(E) = 9: TF = 9 − 5 = 4.`],
        [`0`, `C is not critical.`],
        [`2`, `2 is its duration.`],
        [`7`, `7 is LS(C).`]
      ], a: 0 },
    { q: `At a node where activities finishing at times 11 and 12 meet, the earliest start of the following activity is:`,
      o: [
        [`11`, `It must wait for BOTH predecessors.`],
        [`23`, `Times are not added.`],
        [`11.5`, `No averaging.`],
        [`12`, `Correct. ES = maximum EF of predecessors.`]
      ], a: 3 },
    { q: `A dummy activity is required when:`,
      o: [
        [`An activity has a long duration`, `Duration has nothing to do with dummies.`],
        [`Two activities would otherwise have the same start node and the same end node, or to show a partial dependence`, `Correct (section rules).`],
        [`The project has two critical paths`, `Two critical paths need no dummy.`],
        [`An activity has no predecessor`, `That is a start activity.`]
      ], a: 1 },
    { q: `Same project (A 3; B 4; C 2 (A); D 5 (A, B); E 3 (C, D)). The free float of C is:`,
      o: [
        [`0`, `E cannot start before 9 anyway.`],
        [`1`, `That is A's total float.`],
        [`4`, `Correct. FF = ES(E) − EF(C) = 9 − 5 = 4.`],
        [`2`, `2 is C's duration.`]
      ], a: 2 },
    { q: `The latest start time of an activity equals:`,
      o: [
        [`LF − duration`, `Correct.`],
        [`ES + duration`, `That is EF.`],
        [`LF − ES`, `That mixes forward and backward times.`],
        [`EF − LF`, `That is minus the total float.`]
      ], a: 0 },
    { q: `Same project. The critical activities are:`,
      o: [
        [`A, C, E`, `A-C-E = 8 only.`],
        [`A, D, E`, `A has float 1.`],
        [`All activities`, `A and C have positive floats.`],
        [`B, D, E`, `Correct. Zero float on the longest path B-D-E.`]
      ], a: 3 },
    { q: `How many start nodes and end nodes should a correctly drawn CPM network have?`,
      o: [
        [`One start node and one end node`, `Correct (section rule: only one end node).`],
        [`One start node per starting activity`, `All starting activities leave the same node.`],
        [`Any number`, `Single start and end nodes are required.`],
        [`Two of each`, `No.`]
      ], a: 0 },
    { q: `Same project. The length of path A-C-E is:`,
      o: [
        [`12`, `That is the critical path B-D-E.`],
        [`10`, `Arithmetic error.`],
        [`8`, `Correct. 3 + 2 + 3 = 8.`],
        [`5`, `Only A and C.`]
      ], a: 2 }
  ],
  8: [
    { q: `Optimistic 2, most likely 5, pessimistic 14. The expected time is:`,
      o: [
        [`7`, `That is the simple average (2 + 5 + 14)/3.`],
        [`6`, `Correct. (2 + 4×5 + 14)/6 = 36/6 = 6.`],
        [`5`, `That is the most likely value only.`],
        [`8`, `Arithmetic error.`]
      ], a: 1 },
    { q: `Same activity (2, 5, 14). Its variance is:`,
      o: [
        [`2`, `That is the standard deviation (12/6).`],
        [`12`, `That is tp − to.`],
        [`16`, `Arithmetic error.`],
        [`4`, `Correct. ((14 − 2)/6)² = 2² = 4.`]
      ], a: 3 },
    { q: `μ = 20 weeks, σ = 2 weeks, target 23 weeks. The z value is:`,
      o: [
        [`1.5`, `Correct. z = (23 − 20)/2.`],
        [`−1.5`, `Use (X − μ)/σ, not (μ − X)/σ.`],
        [`3`, `Divide by σ.`],
        [`0.75`, `Divide by σ = 2, not by σ² = 4.`]
      ], a: 0 },
    { q: `Using the table value 0.4332 for z = 1.5, P(T ≤ 23) is:`,
      o: [
        [`0.4332`, `That is only the area between 0 and z.`],
        [`0.0668`, `That is P(T > 23).`],
        [`0.9332`, `Correct. 0.5 + 0.4332.`],
        [`1.5`, `That is z.`]
      ], a: 2 },
    { q: `μ = 30, σ = 4. P(project finishes within 26 weeks) is (table area for z = 1.00 is 0.3413):`,
      o: [
        [`0.8413`, `That is for z = +1.`],
        [`0.1587`, `Correct. z = (26 − 30)/4 = −1 → 0.5 − 0.3413.`],
        [`0.3413`, `Only the table area.`],
        [`−1`, `That is z.`]
      ], a: 1 },
    { q: `Critical activities have variances 1, 4 and 0.44. The project standard deviation is:`,
      o: [
        [`2.33`, `Correct. σ² = 5.44, σ = √5.44 = 2.33.`],
        [`5.44`, `That is the variance.`],
        [`3.44`, `Sum of standard deviations is not used.`],
        [`1.81`, `Arithmetic error.`]
      ], a: 0 },
    { q: `"What is the probability of completing the project AFTER 35 weeks?" You compute:`,
      o: [
        [`P(T ≤ 35)`, `That is for "in / on / before".`],
        [`P(T = 35)`, `For a continuous normal variable this is 0.`],
        [`0.5 exactly`, `Only if 35 equals μ.`],
        [`P(T ≥ 35) = 1 − P(T ≤ 35)`, `Correct (student summary rule).`]
      ], a: 3 },
    { q: `Activity (4, 4, 10). Its expected time is:`,
      o: [
        [`6`, `That is the simple average.`],
        [`4`, `Ignores the pessimistic estimate.`],
        [`5`, `Correct. (4 + 16 + 10)/6 = 5.`],
        [`7`, `Arithmetic error.`]
      ], a: 2 },
    { q: `Activity (1, 4, 7). Its variance is:`,
      o: [
        [`1`, `Correct. ((7 − 1)/6)² = 1.`],
        [`6`, `That is tp − to.`],
        [`4`, `That is the expected time.`],
        [`0.5`, `Arithmetic error.`]
      ], a: 0 },
    { q: `The probability of finishing exactly by the expected project time μ (P(T ≤ μ)) is:`,
      o: [
        [`0`, `Not zero; half of the normal curve lies below μ.`],
        [`0.5`, `Correct. z = 0, so P = 0.5.`],
        [`1`, `The project could take longer.`],
        [`0.8413`, `That is for z = 1.`]
      ], a: 1 }
  ],
  9: [
    { q: `Network: S→A 2, S→B 5, A→C 4, A→D 7, B→C 1, B→D 3, C→T 6, D→T 2. The shortest path S → T is:`,
      o: [
        [`S-A-C-T (12)`, `Not minimal.`],
        [`S-A-D-T (11)`, `Not minimal.`],
        [`S-B-D-T (10)`, `Correct. d(C) = 6, d(D) = 2; d(A) = 9, d(B) = min(7, 5) = 5; d(S) = min(2 + 9, 5 + 5) = 10.`],
        [`S-B-C-T (12)`, `Not minimal.`]
      ], a: 2 },
    { q: `Same network. d(A, T) equals:`,
      o: [
        [`9`, `Correct. min{4 + 6, 7 + 2} = 9 (via D).`],
        [`10`, `That is via C.`],
        [`11`, `That is d(S) through A.`],
        [`2`, `That is d(D).`]
      ], a: 0 },
    { q: `In the backward approach for the same network, the first values computed are:`,
      o: [
        [`d(S, A) and d(S, B)`, `That is the forward direction.`],
        [`d(C, T) and d(D, T)`, `Correct. Start with the nodes adjacent to the destination.`],
        [`d(A, T) only`, `A is one stage further back.`],
        [`All path totals`, `DP avoids enumerating all paths.`]
      ], a: 1 },
    { q: `Solving the same shortest route problem forward instead of backward gives:`,
      o: [
        [`A longer path`, `The optimum does not depend on the direction.`],
        [`An infeasible result`, `Both directions are valid.`],
        [`A different but equally short path every time`, `Only if ties exist.`],
        [`The same shortest distance`, `Correct. Both are valid DP schemes; the course asks for the backward one.`]
      ], a: 3 },
    { q: `In the 2021/22 network, d(M4, M7) = min{6 + d(M5), 3 + d(M6)} with d(M5) = 6, d(M6) = 8. Its value and next node are:`,
      o: [
        [`12 via M5`, `12 > 11.`],
        [`11 via M6`, `Correct. min{12, 11} = 11.`],
        [`9 via M6`, `Forgot d(M6).`],
        [`14 via M5`, `Arithmetic error.`]
      ], a: 1 },
    { q: `The idea that "whatever the earlier decisions, the remaining decisions must be optimal from the current node" is called:`,
      o: [
        [`The principle of optimality`, `Correct. It is the basis of dynamic programming recursion.`],
        [`The northwest corner rule`, `Transportation method.`],
        [`Branch and bound`, `Integer programming method.`],
        [`The critical path`, `Project scheduling term.`]
      ], a: 0 },
    { q: `If arc M4→M6 in the 2021/22 network changed from 3 to 5, the shortest M1 → M7 path would be:`,
      o: [
        [`M1-M2-M4-M6-M7 = 27`, `Now 5 + 9 + 5 + 8 = 27, longer.`],
        [`M1-M2-M3-M5-M7 = 29`, `Longer.`],
        [`M1-M2-M4-M5-M7 = 26`, `Correct. d(M4) = min{6 + 6, 5 + 8} = 12, d(M2) = min{24, 21} = 21, d(M1) = 26.`],
        [`Unchanged at 25`, `The old best path got longer.`]
      ], a: 2 },
    { q: `How many different S → T paths exist in the 2019/20 network (S→A, S→B, S→C; A→D, A→E; B→D, B→E; C→E, C→T; D→T; E→T)?`,
      o: [
        [`3`, `Count every route through the stages.`],
        [`4`, `Some routes are missing.`],
        [`5`, `One route is missing.`],
        [`6`, `Correct. S-A-D-T, S-A-E-T, S-B-D-T, S-B-E-T, S-C-E-T, S-C-T.`]
      ], a: 3 },
    { q: `Which step is NOT part of the backward DP solution?`,
      o: [
        [`Dividing the network into stages`, `Required.`],
        [`Listing every complete path before computing`, `Correct choice. DP computes stage values instead of enumerating paths (listing is only a shortcut some tutors mention).`],
        [`Taking the minimum at each node`, `Required.`],
        [`Recording the arc that achieves each minimum`, `Needed to recover the path.`]
      ], a: 1 },
    { q: `The DP recursion for the shortest route is:`,
      o: [
        [`d(i) = min over j of [c(i, j) + d(j)]`, `Correct. Arc length plus the best remaining distance.`],
        [`d(i) = max over j of [c(i, j) + d(j)]`, `Max gives the longest route.`],
        [`d(i) = Σ c(i, j)`, `Summing all arcs is meaningless here.`],
        [`d(i) = min over j of c(i, j)`, `Ignores the distance remaining after node j.`]
      ], a: 0 }
  ]
};

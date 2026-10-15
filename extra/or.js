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
        [`Min Z = 40x1 + 70x2`, `Profit is something we want as large as possible; the key-word rule says profit/sales/revenue → Max, only cost → Min (L1).`],
        [`Max Z = 40x1 + 70x2`, `Correct. Profit per unit times the number of units of each product.`],
        [`Max Z = 3x1 + 5x2`, `These are hours (constraint coefficients), not profits.`],
        [`Max Z = 150x1 + 150x2`, `150 would be the labor availability (right-hand side), not a coefficient.`]
      ], a: 1 },
    { q: `"Production of X (x1) must be at least twice the production of Y (x2)" is written as:`,
      o: [
        [`2x1 ≥ x2`, `This says Y is at most twice X, the reverse relation.`],
        [`x1 + x2 ≥ 2`, `This is a total-production constraint, not a ratio.`],
        [`x1 ≤ 2x2`, `x1 ≤ 2x2 says X is at most twice Y; 'at least twice' needs x1 ≥ 2x2, i.e. x1 − 2x2 ≥ 0.`],
        [`x1 − 2x2 ≥ 0`, `Correct. x1 ≥ 2x2, moved to one side (Final 2025/26 Q2).`]
      ], a: 3 },
    { q: `Food A has 4 units of protein and food B 1 unit; the diet needs at least 20 units. The protein constraint is:`,
      o: [
        [`4x1 + x2 ≥ 20`, `Correct. Protein from A plus protein from B must reach 20 (Lecture 1, Example 5).`],
        [`4x1 + x2 ≤ 20`, `'At least 20 units' is a minimum requirement, so the key-word rule gives ≥; ≤ would cap the protein at 20.`],
        [`x1 + 4x2 ≥ 20`, `The coefficients are attached to the wrong foods.`],
        [`20x1 + 20x2 ≥ 5`, `The requirement belongs on the right-hand side.`]
      ], a: 0 },
    { q: `x = number of days a factory runs in a 31-day month, and workers are paid a full day for any fraction of a day. The hidden constraints are:`,
      o: [
        [`x ≥ 31 only`, `It cannot run more than 31 days, so this is the wrong direction.`],
        [`x ≤ 7 and integer`, `x ≤ 7 is the hidden limit for days in a week (Universal Mines); a 31-day month gives x ≤ 31.`],
        [`0 ≤ x ≤ 31 and x integer`, `Correct. Days are limited by the month, and full-day pay makes fractions pointless.`],
        [`No hidden constraints`, `Both the day limit and integrality are implied.`]
      ], a: 2 },
    { q: `According to the lecture, formal operations research activities began:`,
      o: [
        [`In the USA during the Great Depression`, `The lecture places the start of formal OR in England during World War II, not in the USA during the Depression.`],
        [`In England during World War II`, `Correct. British scientists decided on the best utilization of war material.`],
        [`In Egypt in the 1970s`, `Egypt in the 1970s is not mentioned; the lecture says OR began in England during World War II with British scientists.`],
        [`In the civilian sector before any military use`, `The order is reversed: OR started in military use (WWII war material) and was adapted to the civilian sector after the war.`]
      ], a: 1 },
    { q: `Which of the following is NOT one of the four formulation steps?`,
      o: [
        [`Introduce the decision variables`, `Introducing the decision variables (x1, x2, ...) is Step I of the formulation procedure, so it IS one of the steps.`],
        [`Summarize the data in a table`, `Summarizing the data in a table (resources in rows, availability in the last column) is Step II, so it IS a formulation step.`],
        [`Write the constraints and non-negativity`, `Writing the constraints and the non-negativity condition is Step IV, the last formulation step, so it IS one of them.`],
        [`Select the pivot element`, `Correct. That belongs to the simplex method, not formulation.`]
      ], a: 3 },
    { q: `"The total weekly production of both products must be at least 30 units" becomes:`,
      o: [
        [`x1 + x2 ≥ 30`, `Correct. The sum of both products must reach 30.`],
        [`x1 ≥ 30 and x2 ≥ 30`, `That demands 30 of EACH product (60 in total).`],
        [`x1 + x2 ≤ 30`, `≤ would make 30 a maximum; 'at least 30' is a minimum requirement, so the key-word rule gives x1 + x2 ≥ 30.`],
        [`30x1 + 30x2 ≥ 1`, `The coefficients (1 per unit of each product) and the RHS (30) are swapped; the total is x1 + x2 and must reach 30.`]
      ], a: 0 },
    { q: `Furniture model: 2x1 + x2 ≤ 6 (wood), 7x1 + 8x2 ≤ 28 (hours). Which point is feasible?`,
      o: [
        [`(2, 2)`, `Wood is fine (4 + 2 = 6 ≤ 6) but hours fail: 7(2) + 8(2) = 30 > 28, so (2, 2) is infeasible.`],
        [`(1, 2)`, `Correct. Wood 2 + 2 = 4 ≤ 6 and hours 7 + 16 = 23 ≤ 28.`],
        [`(3, 1)`, `Wood fails: 2(3) + 1 = 7 > 6 (hours 21 + 8 = 29 > 28 also fail), so (3, 1) is infeasible.`],
        [`(0, 4)`, `Wood is fine (0 + 4 = 4 ≤ 6) but hours fail: 8(4) = 32 > 28, so (0, 4) is infeasible.`]
      ], a: 1 },
    { q: `Mixture 2 is one-third cherries by weight. If x2 = pounds of mixture 2, the cherries it uses are:`,
      o: [
        [`130x2/3`, `130 is the stock available; it belongs on the right-hand side (the error in one student solution).`],
        [`3x2`, `That would be three pounds of cherries per pound of mixture.`],
        [`x2/3`, `Correct. One third of every pound is cherries, so the constraint is (1/2)x1 + (1/3)x2 ≤ 130.`],
        [`2x2/3`, `Two-thirds of mixture 2 is the mint share; the cherry share is one third, so cherries used are x2/3.`]
      ], a: 2 }
  ],
  2: [
    { q: `The corner point where 2x1 + x2 = 8 meets 2x1 + 3x2 = 12 is:`,
      o: [
        [`(3, 2)`, `Correct. Subtracting gives 2x2 = 4, so x2 = 2 and x1 = 3.`],
        [`(2, 3)`, `(2, 3) swaps the coordinates: 2(2) + 3 = 7 ≠ 8. Subtracting the equations gives 2x2 = 4, so (3, 2).`],
        [`(4, 0)`, `That is the x1-intercept of the first line only.`],
        [`(0, 4)`, `That is the x2-intercept of the second line only.`]
      ], a: 0 },
    { q: `Max Z = 5x1 + 4x2 subject to x1 + x2 ≤ 5, 2x1 + x2 ≤ 8, x ≥ 0. The optimum is:`,
      o: [
        [`(4, 0), Z = 20`, `(4, 0) is a corner with Z = 5(4) = 20, but the corner (3, 2) gives 23, so for MAX it is not optimal.`],
        [`(0, 5), Z = 20`, `(0, 5) is a corner with Z = 4(5) = 20, but (3, 2) gives 5(3) + 4(2) = 23, which is larger.`],
        [`(3, 2), Z = 23`, `Correct. Corners: (0,0) 0, (4,0) 20, (3,2) 23, (0,5) 20.`],
        [`(5, 0), Z = 25`, `(5, 0) is not feasible: 2(5) + 0 = 10 > 8 breaks the second constraint, so its Z = 25 cannot be reached.`]
      ], a: 2 },
    { q: `Min Z = 3x1 + 2x2 subject to x1 + x2 ≥ 4, x1 + 3x2 ≥ 6, x ≥ 0. The minimum is:`,
      o: [
        [`11 at (3, 1)`, `(3, 1) is a feasible corner, but Z = 3(3) + 2(1) = 11 is more than 8 at (0, 4), so it is not the minimum.`],
        [`8 at (0, 4)`, `Correct. Corners (0,4) = 8, (3,1) = 11, (6,0) = 18.`],
        [`0 at (0, 0)`, `(0, 0) is not feasible: 0 < 4 and 0 < 6 violate both ≥ constraints, so Z = 0 is unattainable.`],
        [`18 at (6, 0)`, `Z(6, 0) = 18 is the LARGEST corner value; a MIN problem picks the smallest, 8 at (0, 4).`]
      ], a: 1 },
    { q: `The intercepts of 15x1 + 18x2 = 2500 are:`,
      o: [
        [`(250, 0) and (0, 250)`, `250 = 2500/10 uses the wrong coefficient; the intercepts are 2500/15 = 166.7 on x1 and 2500/18 = 138.9 on x2.`],
        [`(15, 0) and (0, 18)`, `These are the coefficients, not the intercepts.`],
        [`(264, 0) and (0, 120)`, `(264, 0) and (0, 120) are the intercepts of the other line, 10x1 + 22x2 = 2640, from Example 1.`],
        [`(166.7, 0) and (0, 138.9)`, `Correct. 2500/15 = 166.7 and 2500/18 = 138.9.`]
      ], a: 3 },
    { q: `If the objective line is parallel to a binding edge of the feasible region, the LP has:`,
      o: [
        [`Multiple optimal solutions`, `Correct. Both end corners and every point between them are optimal.`],
        [`No feasible solution`, `Parallelism concerns the objective line, not the constraints; the feasible region still exists, so the LP is not infeasible.`],
        [`An unbounded solution`, `Unboundedness needs an open region in the improving direction.`],
        [`Exactly one optimal corner`, `Two adjacent corners on that edge give the same best Z, and so does every point between them, so the optimum is not unique.`]
      ], a: 0 },
    { q: `A MAX problem with positive objective coefficients and only ≥ constraints (region open to the upper right) usually has:`,
      o: [
        [`An optimum at the origin`, `The origin is excluded by ≥ constraints with positive RHS.`],
        [`An infeasible region`, `The region is not empty, only open to the upper right; infeasible would mean the shaded regions do not overlap at all.`],
        [`An unbounded solution`, `Correct. Z can grow without limit, so the objective is infinite.`],
        [`Multiple optima`, `Multiple optima need the objective line parallel to a binding edge at a finite best value; here Z keeps growing, so no best value exists.`]
      ], a: 2 },
    { q: `To shade 2x1 + 3x2 ≤ 12 you take the side of the line that:`,
      o: [
        [`Is away from the origin`, `That is for ≥ constraints (when the origin fails the test).`],
        [`Contains the origin`, `Correct. 0 ≤ 12 is true, so the origin's side is feasible.`],
        [`Is above the x1-axis only`, `Both sides of the line contain points above the x1-axis; the side is chosen by testing a point such as the origin.`],
        [`Is chosen arbitrarily`, `The side is not arbitrary: test the origin, 2(0) + 3(0) = 0 ≤ 12 is true, so shade the side containing (0, 0).`]
      ], a: 1 },
    { q: `Max Z = 2x1 + 4x2 subject to x1 + 2x2 ≤ 8, x1 ≤ 6, x ≥ 0. What is true?`,
      o: [
        [`Unique optimum at (6, 0)`, `(6, 0) gives Z = 2(6) = 12, less than 16 on the edge x1 + 2x2 = 8, so it is neither unique nor optimal.`],
        [`Unbounded`, `The region is bounded by x1 + 2x2 ≤ 8, x1 ≤ 6 and the axes, a closed polygon, so Z cannot grow forever.`],
        [`Infeasible`, `The origin satisfies 0 ≤ 8 and 0 ≤ 6, so the feasible region is non-empty and the LP is not infeasible.`],
        [`Multiple optima: (0, 4) and (6, 1) both give Z = 16`, `Correct. Z = 2(x1 + 2x2) = 16 along the whole edge x1 + 2x2 = 8.`]
      ], a: 3 },
    { q: `For x1 + 2x2 ≤ 22 and 4x1 + 2x2 ≤ 40, which point is infeasible?`,
      o: [
        [`(6, 8)`, `6 + 16 = 22 and 24 + 16 = 40, both satisfied (it is the corner C).`],
        [`(10, 0)`, `(10, 0) is feasible: 10 ≤ 22 and 4(10) = 40 ≤ 40 (it is corner B on the boundary).`],
        [`(8, 8)`, `Correct. (8, 8) gives x1 + 2x2 = 8 + 16 = 24 > 22 (and 4(8) + 2(8) = 48 > 40), so it violates the constraints and lies outside the feasible region (L2).`],
        [`(0, 11)`, `(0, 11) is feasible: 0 + 22 = 22 ≤ 22 and 0 + 22 = 22 ≤ 40 (it is corner D).`]
      ], a: 2 },
    { q: `A MIN problem's corner table shows Z = 70, 52, 56. The optimal value is:`,
      o: [
        [`52`, `Correct. For minimization pick the smallest corner value (B(1.5, 4) in the section example).`],
        [`70`, `70 is the LARGEST corner value; that would be chosen in a MAX problem, while MIN takes the smallest, 52.`],
        [`56`, `56 is smaller than 70 but larger than 52; a MIN problem takes the smallest corner value, 52.`],
        [`178 (the sum)`, `The corner values are compared, not added; the optimum is the single best corner, here the smallest, 52.`]
      ], a: 0 }
  ],
  3: [
    { q: `Max Z = 5x1 + 4x2 with x1 + x2 ≤ 5 and 2x1 + x2 ≤ 8. The initial Z row of the simplex tableau (x1, x2, s1, s2 | b) is:`,
      o: [
        [`(5, 4, 0, 0 | 0)`, `Z − 5x1 − 4x2 = 0 gives negative coefficients.`],
        [`(−5, −4, 0, 0 | 0)`, `Correct. Moving the objective terms to the left makes them negative.`],
        [`(−5, −4, 1, 1 | 0)`, `Slack variables have zero coefficients in the objective, so their Z-row entries are 0, not 1: Z − 5x1 − 4x2 + 0s1 + 0s2 = 0.`],
        [`(1, 1, 0, 0 | 5)`, `(1, 1, 0, 0 | 5) is (most of) the first constraint row x1 + x2 + s1 = 5, not the objective row.`]
      ], a: 1 },
    { q: `Same problem. The pivot element of the first iteration is:`,
      o: [
        [`1 (row s1)`, `Row s1 is not chosen: its ratio 5/1 = 5 is larger than 8/2 = 4 for row s2, and the smallest ratio wins.`],
        [`−5`, `−5 is a Z-row entry; it selects the pivot column x1 but is never itself the pivot, which must be a positive constraint-row entry.`],
        [`1 (column x2)`, `x2's Z entry −4 is less negative than x1's −5, so x2 is not the pivot column in the first iteration.`],
        [`2 (row s2, column x1)`, `Correct. Pivot column x1; ratios 5 and 4 → row s2.`]
      ], a: 3 },
    { q: `Same problem. After the first pivot, the value of Z is:`,
      o: [
        [`20`, `Correct. x1 = 4, so Z = 5 × 4 = 20 (Z row becomes 0, −1.5, 0, 2.5 | 20).`],
        [`23`, `23 is the final optimum after a second pivot.`],
        [`8`, `8 is the old RHS of the second constraint; after the pivot x1 = 8/2 = 4 and Z = 0 + 5 × 4 = 20.`],
        [`4`, `4 is the new value of x1 (8 ÷ 2), not of Z; Z becomes 5 × 4 = 20.`]
      ], a: 0 },
    { q: `In the ratio test you:`,
      o: [
        [`Divide by every entry of the pivot column, including negatives`, `Zero and negative entries of the pivot column are skipped in the ratio test; dividing by them gives meaningless or negative ratios.`],
        [`Choose the largest ratio`, `The SMALLEST positive ratio is chosen; picking a larger one would push another basic variable negative (infeasible).`],
        [`Use only the positive entries of the pivot column and take the smallest ratio`, `Correct. The ratio test divides each RHS by the positive entries of the pivot column only and picks the smallest ratio; that row is the pivot row (L3, Step II).`],
        [`Include the Z row`, `The Z row only selects the pivot column; it never takes part in the ratio test.`]
      ], a: 2 },
    { q: `An LP has three ≤ constraints and two decision variables. How many slack variables are added?`,
      o: [
        [`2`, `Two is the number of decision variables; slacks are counted by constraints, one per ≤ constraint, so three are needed.`],
        [`3`, `Correct. One slack variable is added to each ≤ constraint to turn it into an equation (the unused resource), so three ≤ constraints need s1, s2, s3 (L3, Step 1).`],
        [`5`, `That is the total number of variables after adding slacks.`],
        [`1`, `One slack cannot turn three inequalities into equations; each ≤ constraint gets its own slack, so three are needed.`]
      ], a: 1 },
    { q: `A tableau whose Z row contains no negative numbers (excluding the RHS) is:`,
      o: [
        [`Optimal`, `Correct. Step IV's stopping rule: when no negative numbers remain in the Z row (excluding the RHS), Z cannot be improved and the tableau is optimal (L3).`],
        [`Infeasible`, `Feasibility is shown by non-negative RHS values.`],
        [`Unbounded`, `Unboundedness shows up as a pivot column with no positive entry.`],
        [`Degenerate always`, `Degeneracy is a zero basic variable, unrelated.`]
      ], a: 0 },
    { q: `If every entry in the chosen pivot column is zero or negative, then:`,
      o: [
        [`Choose the least negative as pivot`, `A pivot must be positive; a negative or zero pivot would make basic variables negative, so the ratio test skips such entries.`],
        [`The current solution is optimal`, `The tableau is not optimal because a negative Z entry (the chosen column) remains; the issue is that no row limits that variable.`],
        [`Swap two rows`, `Swapping rows changes nothing in the pivot column; with no positive entry no ratio exists, which signals an unbounded LP.`],
        [`The program has no (bounded) solution: it is unbounded`, `Correct (L3: "If no element in the work column is positive, the program has no solution").`]
      ], a: 3 },
    { q: `Section shortcut: old element 5, its pivot-row element 4, its pivot-column element 3, pivot 1. The new element is:`,
      o: [
        [`17`, `17 = 5 + 12 adds the product; the shortcut is new = old − (pivot-row element × pivot-column element)/pivot = 5 − 12 = −7.`],
        [`5`, `Only columns with 0 in the pivot row stay unchanged.`],
        [`−7`, `Correct. 5 − (4 × 3)/1 = −7 (revision example, x2 in row s2).`],
        [`12`, `12 is only the product 4 × 3; it must be divided by the pivot and subtracted from the old element: 5 − 12/1 = −7.`]
      ], a: 2 },
    { q: `Continuing Max Z = 5x1 + 4x2 (x1 + x2 ≤ 5, 2x1 + x2 ≤ 8) to the end, the optimal solution is:`,
      o: [
        [`x1 = 4, x2 = 0, Z = 20`, `−1.5 remains in the Z row after the first pivot, so it is not optimal.`],
        [`x1 = 3, x2 = 2, Z = 23`, `Correct. Second pivot: column x2, ratios 1/0.5 = 2 and 4/0.5 = 8 → x2 = 2, x1 = 3, Z = 23 (same as the graph).`],
        [`x1 = 0, x2 = 5, Z = 20`, `(0, 5) is feasible but gives Z = 4 × 5 = 20, less than 23. Simplex never visits it: its path is (0, 0) → (4, 0) → (3, 2), and it stops when no negative entry is left in the Z row.`],
        [`x1 = 5, x2 = 0, Z = 25`, `(5, 0) is infeasible: 2(5) = 10 > 8 breaks the second constraint, so Z = 25 cannot be reached.`]
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
        [`230`, `230 is what the least cost method (and VAM) gives for this data; NWC ignores costs and gives 250.`],
        [`250`, `Correct. S1D1 = 10, S1D2 = 10, S2D2 = 15, S2D3 = 15: 40 + 60 + 45 + 105 = 250.`],
        [`270`, `270 does not come from the NWC plan: 4×10 + 6×10 + 3×15 + 7×15 = 40 + 60 + 45 + 105 = 250.`],
        [`200`, `200 is below the optimal cost of 230 for this data, so no feasible shipping plan can cost 200.`]
      ], a: 1 },
    { q: `Same data. The least cost method gives:`,
      o: [
        [`250`, `250 is the northwest corner cost; LCM starts in the cheapest cell S2D2 (cost 3) and ends at 230.`],
        [`210`, `210 is lower than the optimal cost 230 for this data, so no starting method can produce it.`],
        [`240`, `240 is not the LCM sum: S2D2 = 25, S1D1 = 10, S2D3 = 5, S1D3 = 10 cost 75 + 40 + 35 + 80 = 230.`],
        [`230`, `Correct. S2D2 = 25 (3), S1D1 = 10 (4), S2D3 = 5 (7), S1D3 = 10 (8): 75 + 40 + 35 + 80 = 230 (also optimal).`]
      ], a: 3 },
    { q: `Same data, Vogel's first step. Penalties: rows S1 = 2, S2 = 2; columns D1 = 1, D2 = 3, D3 = 1. The first allocation is:`,
      o: [
        [`S2D2 = 25 (cost 3)`, `Correct. Highest penalty D2 (3); its cheapest cell is S2 at cost 3; allocate min(30, 25).`],
        [`S1D1 = 10 (cost 4)`, `D1's penalty is only 5 − 4 = 1; VAM allocates in the line with the HIGHEST penalty, D2 (6 − 3 = 3).`],
        [`S1D2 = 20`, `D2 is the right column, but VAM puts the allocation in its cheapest cell, S2 (cost 3), not S1 (cost 6).`],
        [`S2D3 = 15`, `D3's penalty is 8 − 7 = 1, not the highest; VAM first allocates in column D2 (penalty 3).`]
      ], a: 0 },
    { q: `A balanced transportation problem with 3 sources and 4 destinations has a basic feasible solution with how many allocated cells?`,
      o: [
        [`12`, `12 = 3 × 4 is the total number of cells; a basic feasible solution uses only m + n − 1 of them.`],
        [`7`, `7 = m + n; one equation is redundant in a balanced problem, so a BFS has m + n − 1 = 6 allocated cells.`],
        [`6`, `Correct. A non-degenerate basic feasible solution of a balanced m × n problem has m + n − 1 allocated cells: 3 + 4 − 1 = 6 (L4, Stepping stone check).`],
        [`4`, `4 is just the number of destinations; with only 4 cells the solution is degenerate, since m + n − 1 = 6 are needed.`]
      ], a: 2 },
    { q: `Total supply is 300 and total demand is 250. Before applying NWC/LCM/VAM you should:`,
      o: [
        [`Delete the largest source`, `Deleting a source throws away real supply and changes the problem; instead a dummy column absorbs the 50 surplus units at zero cost.`],
        [`Add a dummy destination with demand 50 and zero costs`, `Correct. This balances the problem (textbook rule).`],
        [`Add a dummy source with supply 50`, `A dummy source is needed when demand exceeds supply.`],
        [`Nothing; the methods work as is`, `NWC, LCM and VAM all assume total supply = total demand; with 300 ≠ 250 the problem must first be balanced with a dummy.`]
      ], a: 1 },
    { q: `Stepping stone path for an empty cell: + (cost 5), − (cost 6), + (cost 8), − (cost 1). The improvement index is:`,
      o: [
        [`+6`, `Correct. 5 − 6 + 8 − 1 = 6 ≥ 0, so entering this cell would raise the cost.`],
        [`−6`, `Signs: add the + cells, subtract the − cells.`],
        [`20`, `20 = 5 + 6 + 8 + 1 adds all costs; the − cells must be subtracted: 5 − 6 + 8 − 1 = 6.`],
        [`0`, `The signed sum is not zero: 5 − 6 + 8 − 1 = +6, so entering this cell would raise the cost by 6 per unit.`]
      ], a: 0 },
    { q: `On an improving path the − cells hold 300 and 200 units. The amount θ shifted is:`,
      o: [
        [`300`, `Shifting 300 would make the − cell holding 200 negative (200 − 300 = −100); θ must be the smallest − allocation.`],
        [`500`, `500 is the sum of the two − cells; θ is limited by the smallest − allocation, 200, so no cell goes negative.`],
        [`100`, `100 is not tied to any cell; θ equals the smallest allocation on the − cells, 200, which empties that cell.`],
        [`200`, `Correct. θ = the smallest allocation among the − cells.`]
      ], a: 3 },
    { q: `An improvement index is −4 and θ = 50. The total cost changes by:`,
      o: [
        [`+200`, `A negative improvement index means each unit moved LOWERS the cost, so the change is −4 × 50 = −200, not +200.`],
        [`−54`, `−54 adds the index and θ; the change is their product, −4 × 50 = −200.`],
        [`−200`, `Correct. The improvement index is the cost change per unit shifted, so the total change = index × θ = −4 × 50 = −200 (L4, Stepping stone).`],
        [`−4`, `−4 is the change per unit shifted; with θ = 50 units moved the total change is −4 × 50 = −200.`]
      ], a: 2 },
    { q: `The Vogel penalty of the row with costs 16, 13, 22, 17 is:`,
      o: [
        [`9`, `9 = 22 − 13 is largest minus smallest; a Vogel penalty uses the two LOWEST costs, 16 − 13 = 3.`],
        [`3`, `Correct. Two lowest are 13 and 16: 16 − 13 = 3.`],
        [`1`, `1 = 17 − 16 compares the second and third lowest; the penalty is the difference of the two lowest, 16 − 13 = 3.`],
        [`13`, `13 is the lowest cost itself; the penalty is the difference between the two lowest costs, 16 − 13 = 3.`]
      ], a: 1 },
    { q: `Which starting method completely ignores the transportation costs?`,
      o: [
        [`Northwest corner rule`, `Correct. It always starts at the upper-left cell, so it often gives the highest cost.`],
        [`Least cost method`, `The least cost method always allocates to the cheapest remaining cell, so it is driven by costs.`],
        [`Vogel's approximation`, `Vogel's penalties are differences of the two lowest costs in each row/column, so VAM uses costs directly.`],
        [`Stepping stone`, `Stepping stone is not a starting method; it tests an existing solution by summing costs (+/−) along closed paths.`]
      ], a: 0 }
  ],
  5: [
    { q: `Solve the assignment (rows 1–3, columns A–C): (9, 2, 7), (6, 4, 3), (5, 8, 1). The minimum total cost is:`,
      o: [
        [`7`, `Not feasible: 2 and 1 come from rows 1 and 3, but row 2's cheapest (3) shares column C with row 3.`],
        [`10`, `10 is a feasible assignment total, but 1→B (2), 2→A (6), 3→C (1) costs only 9.`],
        [`9`, `Correct. Row reduction gives (7, 0, 5), (3, 1, 0), (4, 7, 0); column reduction leads to the assignment 1→B (2), 2→A (6), 3→C (1), total 2 + 6 + 1 = 9 (L5).`],
        [`12`, `No one-to-one assignment of this matrix totals 12; the possible totals include 9, 10, 14, and the minimum is 9.`]
      ], a: 2 },
    { q: `Row reduction of the row (48, 48, 50, 44) gives:`,
      o: [
        [`(0, 0, 2, −4)`, `Subtract the row MINIMUM (44), not the first element.`],
        [`(48, 48, 50, 44)`, `This is the row unchanged; row reduction subtracts the row minimum (44) from every entry.`],
        [`(4, 4, 6, 0)`, `Correct. Row reduction subtracts the row minimum 44 from each entry: 48 − 44, 48 − 44, 50 − 44, 44 − 44 = (4, 4, 6, 0) (L5, lecture example 2).`],
        [`(2, 2, 4, 0)`, `(2, 2, 4, 0) is what subtracting 46 would give for the first three entries; the minimum is 44, so 48 − 44 = 4.`]
      ], a: 2 },
    { q: `θ = 1. An element equal to 12 lies at the intersection of two covering lines. Its new value is:`,
      o: [
        [`11`, `11 = 12 − θ is the rule for UNCOVERED elements; an element at the intersection of two lines becomes 12 + 1 = 13.`],
        [`13`, `Correct. Intersection elements increase by θ.`],
        [`12`, `Unchanged is the rule for elements on exactly ONE line; at an intersection of two lines it becomes 12 + 1 = 13.`],
        [`0`, `No step sets an element to 0 directly; zeros appear only when θ is subtracted from an uncovered element equal to θ.`]
      ], a: 1 },
    { q: `Profit matrix (rows 1–2, columns A–B): (5, 8), (7, 6). The maximum total profit is:`,
      o: [
        [`11`, `11 = 5 + 6 is the diagonal assignment (1→A, 2→B), the smaller of the two possible totals.`],
        [`13`, `13 is not a possible total: a 2 × 2 matrix allows only 5 + 6 = 11 or 8 + 7 = 15.`],
        [`14`, `14 is not a possible total: a 2 × 2 matrix allows only 5 + 6 = 11 or 8 + 7 = 15.`],
        [`15`, `Correct. 1 → B (8), 2 → A (7). Converting: 8 − profit gives (3, 0), (1, 2); minimum regret 0 + 1.`]
      ], a: 3 },
    { q: `After reduction the minimum number of covering lines is 3 for a 4 × 4 matrix. Next you:`,
      o: [
        [`Modify the matrix with θ (smallest uncovered element) and redraw lines`, `Correct. Lines < n means an optimal assignment is not yet possible.`],
        [`Stop and assign`, `With 3 lines only 3 independent zeros exist, so one job would be left unassigned; you can stop only when lines = n = 4.`],
        [`Add a dummy row`, `A dummy row is used only when the matrix is not square; this one is already 4 × 4.`],
        [`Repeat row reduction`, `Rows already contain zeros; it changes nothing.`]
      ], a: 0 },
    { q: `There are 3 jobs and 4 machines. To use the Hungarian method you:`,
      o: [
        [`Delete one machine at random`, `Deleting a machine at random may throw away the best machine; adding a zero-cost dummy job keeps every machine available.`],
        [`Assign two jobs to one machine`, `Each machine takes exactly one job in an assignment problem; balancing is done with a dummy job, not double assignments.`],
        [`Add a dummy job row with zero costs`, `Correct. This makes the matrix square (textbook rule); the machine given the dummy job stays idle.`],
        [`Use the northwest corner rule`, `The northwest corner rule is a transportation starting method (L4); an unbalanced assignment needs a dummy row to become square.`]
      ], a: 2 },
    { q: `Once n independent zeros are found, the total cost is computed from:`,
      o: [
        [`The reduced matrix (all zeros, so 0)`, `The reduced matrix holds opportunity costs (all chosen cells are 0); the actual cost must be read from the original matrix.`],
        [`The original cost matrix`, `Correct. Add the original costs of the chosen cells.`],
        [`The row minima only`, `The row minima are only part of what was subtracted (column minima and θ steps also change it); use the original costs.`],
        [`The θ values`, `θ only modifies the matrix to create new zeros; the total is the sum of the ORIGINAL costs of the assigned cells.`]
      ], a: 1 },
    { q: `Lecture example 2: J1 → P4 (44), J2 → P1 (56), J3 → P3 (90), J4 → P2 (44). The total is:`,
      o: [
        [`230`, `230 is an addition slip: 44 + 56 = 100, 100 + 90 = 190, 190 + 44 = 234.`],
        [`244`, `244 overshoots by 10: 44 + 56 + 90 + 44 = 234.`],
        [`224`, `224 is 10 short of the real sum: 44 + 56 = 100, + 90 = 190, + 44 = 234.`],
        [`234`, `Correct. The total is read from the original matrix: J1→P4 44 + J2→P1 56 + J3→P3 90 + J4→P2 44 = $234 (L5, lecture example 2).`]
      ], a: 3 },
    { q: `The Hungarian method is designed to solve:`,
      o: [
        [`The transportation problem's initial BFS`, `A transportation problem's initial BFS is found with NWC, least cost or Vogel (L4), not the Hungarian method.`],
        [`The shortest route problem`, `The shortest route problem is solved with dynamic programming, backward approach (L9).`],
        [`Project scheduling`, `Project scheduling uses CPM (L7) and PERT (L8) networks, not the Hungarian method.`],
        [`The assignment problem`, `Correct. The Hungarian method (row reduction, column reduction, covering lines, θ steps) is the lecture's method for the assignment problem (L5).`]
      ], a: 3 },
    { q: `In a 5 × 5 assignment problem, the optimal solution contains how many assignments?`,
      o: [
        [`5`, `Correct. In an n × n assignment each row gets exactly one column and each column one row, so there are exactly n = 5 assignments (L5).`],
        [`9`, `m + n − 1 = 9 is for transportation BFS; assignment needs exactly n.`],
        [`25`, `25 is every cell of the 5 × 5 matrix; an assignment uses exactly one cell per row and column, i.e. 5.`],
        [`10`, `10 = rows + columns; an assignment needs one cell per row (and per column), so exactly 5.`]
      ], a: 0 }
  ],
  6: [
    { q: `Max Z = 5x1 + 4x2 subject to x1 + x2 ≤ 5, 10x1 + 6x2 ≤ 45, x ≥ 0 and integer. The integer optimum is:`,
      o: [
        [`(3.75, 1.25), Z = 23.75`, `(3.75, 1.25) is the LP relaxation (root node); both values are fractional, so it is not an integer solution.`],
        [`(4, 0), Z = 20`, `(4, 0) is feasible (40 ≤ 45) but Z = 20 is less than 23 at (3, 2).`],
        [`(3, 2), Z = 23`, `Correct. 10(3) + 6(2) = 42 ≤ 45 and 3 + 2 = 5 ≤ 5.`],
        [`(4, 1), Z = 24`, `(4, 1) breaks 10x1 + 6x2 ≤ 45: 40 + 6 = 46 > 45, so it is infeasible.`]
      ], a: 2 },
    { q: `The LP relaxation gives x2 = 3.4. Branching on x2 creates:`,
      o: [
        [`x2 ≤ 3.4 and x2 ≥ 3.4`, `x2 ≤ 3.4 and x2 ≥ 3.4 both keep the fractional point; branching on 3.4 uses the nearest integers, x2 ≤ 3 and x2 ≥ 4.`],
        [`x2 ≤ 2 and x2 ≥ 5`, `x2 ≤ 2 and x2 ≥ 5 also remove the integers 3 and 4, which could contain the optimum; only 3 &lt; x2 &lt; 4 may be cut.`],
        [`x2 ≤ 3 and x2 ≥ 4`, `Correct. Branching on x2 = 3.4 uses the integers on either side, x2 ≤ 3 and x2 ≥ 4, removing only the fractional strip 3 &lt; x2 &lt; 4 (L6).`],
        [`x1 ≤ 3 and x1 ≥ 4`, `The fractional variable is x2 = 3.4, so the branches must be on x2, not x1.`]
      ], a: 2 },
    { q: `In a MAX branch and bound, the incumbent integer Z is 40. A live node's LP gives Z = 39 (fractional). You should:`,
      o: [
        [`Branch on it`, `Branching cannot help: in a MAX problem every sub-node has Z ≤ 39, which cannot beat the incumbent 40.`],
        [`Fathom (prune) it`, `Correct. Its bound is not better than the incumbent.`],
        [`Make it the new incumbent`, `Only an all-integer solution can become the incumbent, and 39 is worse than 40 anyway.`],
        [`Restart the method`, `Nothing is wrong with the tree; the node is simply pruned and the method continues with other live nodes.`]
      ], a: 1 },
    { q: `A binary (0-1) variable can take the values:`,
      o: [
        [`0 or 1 only`, `Correct. A binary (0-1) variable is an integer variable restricted to exactly 0 or 1, typically a yes/no decision (L6).`],
        [`Any integer`, `Any integer value describes a general integer variable; a binary variable is limited to 0 or 1.`],
        [`Any value between 0 and 1`, `Values between 0 and 1 (like 0.5) describe a continuous variable bounded by 1; binary allows only 0 or 1.`],
        [`Only 1`, `A binary variable can be 0 (no) as well as 1 (yes).`]
      ], a: 0 },
    { q: `Why can't we simply round the LP optimum (2.75, 1.25) of 10x1 + 6x2 ≤ 35, x1 + x2 ≤ 4 to (3, 1)?`,
      o: [
        [`Rounding always gives the optimum`, `Rounding can leave the feasible region or miss the optimum; here (3, 1) breaks 10x1 + 6x2 ≤ 35.`],
        [`(3, 1) has a lower Z than (2, 2)`, `(3,1) would give 150, higher; the issue is feasibility.`],
        [`Integers are not allowed in LP`, `Integer values are perfectly allowed in an LP; the problem is that the rounded point violates a constraint.`],
        [`(3, 1) is infeasible: 10(3) + 6(1) = 36 > 35`, `Correct. Rounding can leave the feasible region; the true optimum is (2, 2), Z = 140.`]
      ], a: 3 },
    { q: `For a maximization problem, the Z value of the LP relaxation is:`,
      o: [
        [`A lower bound on the integer optimum`, `For MAX, adding integer restrictions can only keep or lower Z, so the LP relaxation's Z is an UPPER bound, not a lower one.`],
        [`An upper bound on the integer optimum`, `Correct. Adding integer restrictions can only keep or reduce Z.`],
        [`Always equal to the integer optimum`, `Only when the LP solution happens to be integer.`],
        [`Unrelated to the integer optimum`, `The relaxation's Z bounds the integer optimum from above (MAX), which is exactly how branch and bound prunes nodes.`]
      ], a: 1 },
    { q: `In the Sheet 2 tree, the node with x1 ≥ 3 and x2 ≥ 1 (constraint 10x1 + 6x2 ≤ 35) is:`,
      o: [
        [`Optimal with Z = 150`, `Its smallest point (3, 1) already violates the constraint.`],
        [`Unbounded`, `The node is bounded by 10x1 + 6x2 ≤ 35 and x1 + x2 ≤ 4; it is not unbounded but empty.`],
        [`Infeasible`, `Correct. Its smallest point (3, 1) already gives 10(3) + 6(1) = 36 > 35, so no point satisfies x1 ≥ 3, x2 ≥ 1 and the constraint: the node is infeasible (L6, Sheet 2).`],
        [`Integer with Z = 145`, `Z = 145 at (3, 0.83) is the parent node x1 ≥ 3, which is fractional; this child node has no feasible point.`]
      ], a: 2 },
    { q: `Max Z = 3x1 + 2x2 subject to 2x1 + 2x2 ≤ 9, 3x1 + x2 ≤ 10, x ≥ 0 and integer. The integer optimum is:`,
      o: [
        [`(3, 1), Z = 11`, `Correct. 6 + 2 = 8 ≤ 9 and 9 + 1 = 10 ≤ 10. (The LP relaxation gives (2.75, 1.75), Z = 11.75.)`],
        [`(2, 2), Z = 10`, `(2, 2) is feasible (8 ≤ 9, 8 ≤ 10) but Z = 10 is less than 11 at (3, 1).`],
        [`(3, 2), Z = 13`, `(3, 2) breaks 2x1 + 2x2 ≤ 9: 6 + 4 = 10 > 9 (and 9 + 2 = 11 > 10), so it is infeasible.`],
        [`(2.75, 1.75), Z = 11.75`, `(2.75, 1.75) is the LP relaxation; its fractional values are not allowed, so it is only an upper bound.`]
      ], a: 0 },
    { q: `Which is an example of a MIXED integer program?`,
      o: [
        [`x1 = number of trucks (integer), x2 = litres of fuel (continuous)`, `Correct. Only some variables must be integers.`],
        [`All variables are numbers of workers`, `Numbers of workers are all integers, so every variable is integer: a pure integer program.`],
        [`All variables are yes/no decisions`, `Yes/no decisions for every variable give a binary (0-1) integer program, not a mixed one.`],
        [`No variable must be integer`, `With no integer variables it is an ordinary LP; a mixed IP needs some (not all) variables integer.`]
      ], a: 0 },
    { q: `Sheet 1 tree (Max 3x1 + 4x2; x1 + 3x2 ≤ 13; 5x1 + 2x2 ≤ 20): the node x1 ≤ 2, x2 ≥ 4 gives:`,
      o: [
        [`(2, 4), Z = 22`, `(2, 4) violates x1 + 3x2 ≤ 13: 2 + 12 = 14 > 13, so x1 must drop to 1.`],
        [`Infeasible`, `The node is feasible: (1, 4) gives 1 + 12 = 13 ≤ 13 and 5 + 8 = 13 ≤ 20.`],
        [`(2, 3.67), Z = 20.67`, `(2, 3.67), Z = 20.67 is the parent node x1 ≤ 2; adding x2 ≥ 4 moves the solution to (1, 4).`],
        [`(1, 4), Z = 19`, `Correct. On x1 + 3x2 = 13 with x2 = 4, x1 = 1; this is the optimum.`]
      ], a: 3 }
  ],
  7: [
    { q: `Project: A 3 (−), B 4 (−), C 2 (A), D 5 (A, B), E 3 (C, D). The project completion time is:`,
      o: [
        [`8`, `8 is only path A-C-E (3 + 2 + 3); the project lasts as long as the LONGEST path, B-D-E = 12.`],
        [`12`, `Correct. Longest path B-D-E = 4 + 5 + 3 = 12.`],
        [`11`, `11 is path A-D-E (3 + 5 + 3); B-D-E = 4 + 5 + 3 = 12 is longer, so it sets the project time.`],
        [`17`, `17 adds every duration; activities on different paths run in parallel, so the time is the longest path, 12.`]
      ], a: 1 },
    { q: `Same project. The total float of activity A is:`,
      o: [
        [`0`, `A is not critical: EF(A) = 3 but LF(A) = LS(D) = 4, so it has 1 unit of float (B-D-E is the critical path).`],
        [`4`, `4 is C's total float (9 − 5); A is limited by D: LF(A) = LS(D) = 4, EF(A) = 3, so TF(A) = 1.`],
        [`1`, `Correct. LF(A) = min(LS C = 7, LS D = 4) = 4; EF(A) = 3; TF = 1.`],
        [`3`, `3 is A's duration; total float is LF − EF = 4 − 3 = 1.`]
      ], a: 2 },
    { q: `Same project. The total float of activity C is:`,
      o: [
        [`4`, `Correct. ES = 3, EF = 5, LF = LS(E) = 9: TF = 9 − 5 = 4.`],
        [`0`, `C is not critical: it can finish as late as LS(E) = 9 but finishes early at 5, giving TF = 4.`],
        [`2`, `2 is C's duration, not its float; TF = LF − EF = 9 − 5 = 4.`],
        [`7`, `7 is LS(C) = LF − duration = 9 − 2; total float is LS − ES = 7 − 3 = 4.`]
      ], a: 0 },
    { q: `At a node where activities finishing at times 11 and 12 meet, the earliest start of the following activity is:`,
      o: [
        [`11`, `Starting at 11 would begin before the second predecessor finishes at 12; ES is the MAXIMUM EF of all predecessors.`],
        [`23`, `23 = 11 + 12 adds the two times; the predecessors run in parallel, so ES = max(11, 12) = 12.`],
        [`11.5`, `Averaging has no meaning here: the activity must wait for the later predecessor, so ES = max(11, 12) = 12.`],
        [`12`, `Correct. Forward pass rule: an activity can start only when ALL its predecessors finish, so ES = max(EF) = max(11, 12) = 12 (L7).`]
      ], a: 3 },
    { q: `A dummy activity is required when:`,
      o: [
        [`An activity has a long duration`, `A long duration is shown simply by the number on the arrow; dummies are about dependence, not duration.`],
        [`Two activities would otherwise have the same start node and the same end node, or to show a partial dependence`, `Correct. A dummy is needed so that two activities do not share the same start and end nodes, or to show that an activity depends on only part of another group (L7, network rules).`],
        [`The project has two critical paths`, `Two critical paths are just two zero-float paths of equal length; drawing them needs no dummy arrow.`],
        [`An activity has no predecessor`, `An activity without a predecessor is a start activity and simply leaves the start node; no dummy is needed.`]
      ], a: 1 },
    { q: `Same project (A 3; B 4; C 2 (A); D 5 (A, B); E 3 (C, D)). The free float of C is:`,
      o: [
        [`0`, `C does have free time: E cannot start before 9 (it waits for D), while C ends at 5, so FF = 9 − 5 = 4.`],
        [`1`, `1 is A's total float; C's free float is ES(E) − EF(C) = 9 − 5 = 4.`],
        [`4`, `Correct. Free float = ES of the successor − EF of the activity: ES(E) = max(5, 9) = 9 and EF(C) = 3 + 2 = 5, so FF = 4 (L7, Floats).`],
        [`2`, `2 is C's duration, not its float; FF = ES(E) − EF(C) = 9 − 5 = 4.`]
      ], a: 2 },
    { q: `The latest start time of an activity equals:`,
      o: [
        [`LF − duration`, `Correct. In the backward pass the latest start is the latest finish minus the duration, LS = LF − t (L7).`],
        [`ES + duration`, `ES + duration is the EARLIEST FINISH (EF) from the forward pass, not the latest start.`],
        [`LF − ES`, `LF − ES mixes a backward and a forward time and has no meaning; LS = LF − duration.`],
        [`EF − LF`, `EF − LF is minus the total float (TF = LF − EF), not a start time; LS = LF − duration.`]
      ], a: 0 },
    { q: `Same project. The critical activities are:`,
      o: [
        [`A, C, E`, `A-C-E is only 8 long; the critical path is the longest, B-D-E = 12, and A and C have floats 1 and 4.`],
        [`A, D, E`, `A-D-E = 11 is shorter than B-D-E = 12, so A has float 1 and is not critical.`],
        [`All activities`, `A (TF 1) and C (TF 4) have positive float, so only B, D, E on the longest path are critical.`],
        [`B, D, E`, `Correct. Zero float on the longest path B-D-E.`]
      ], a: 3 },
    { q: `How many start nodes and end nodes should a correctly drawn CPM network have?`,
      o: [
        [`One start node and one end node`, `Correct. Network rule: all starting activities leave a single start node and all final activities end in a single end node (L7, section rules).`],
        [`One start node per starting activity`, `All activities without predecessors leave the SAME start node; separate start nodes would break the single-start rule.`],
        [`Any number`, `The network must have exactly one start node and one end node, so 'any number' is wrong.`],
        [`Two of each`, `Two start or end nodes break the rule of a single start event and a single end event.`]
      ], a: 0 },
    { q: `Same project. The length of path A-C-E is:`,
      o: [
        [`12`, `12 is the length of the critical path B-D-E; A-C-E = 3 + 2 + 3 = 8.`],
        [`10`, `10 is an addition slip: A-C-E = 3 + 2 + 3 = 8.`],
        [`8`, `Correct. A path's length is the sum of its activity durations: A (3) + C (2) + E (3) = 8 (L7).`],
        [`5`, `5 counts only A and C (3 + 2); the path continues to the end event through E, so 3 + 2 + 3 = 8.`]
      ], a: 2 }
  ],
  8: [
    { q: `Optimistic 2, most likely 5, pessimistic 14. The expected time is:`,
      o: [
        [`7`, `7 is the simple average (2 + 5 + 14)/3; PERT weights the most likely time by 4: (2 + 20 + 14)/6 = 6.`],
        [`6`, `Correct. PERT expected time te = (a + 4m + b)/6 = (2 + 4×5 + 14)/6 = 36/6 = 6 (L8).`],
        [`5`, `5 is only the most likely time m; te also uses the optimistic and pessimistic estimates: (2 + 20 + 14)/6 = 6.`],
        [`8`, `8 is the midpoint (2 + 14)/2 of the extremes; te = (2 + 4×5 + 14)/6 = 6.`]
      ], a: 1 },
    { q: `Same activity (2, 5, 14). Its variance is:`,
      o: [
        [`2`, `2 = (14 − 2)/6 is the standard deviation; the variance is its square, 2² = 4.`],
        [`12`, `12 = b − a is only the spread; σ² = ((b − a)/6)² = (12/6)² = 4.`],
        [`16`, `16 = 4² squares the variance a second time; σ² = ((14 − 2)/6)² = 2² = 4.`],
        [`4`, `Correct. PERT variance σ² = ((b − a)/6)² = ((14 − 2)/6)² = 2² = 4 (L8).`]
      ], a: 3 },
    { q: `μ = 20 weeks, σ = 2 weeks, target 23 weeks. The z value is:`,
      o: [
        [`1.5`, `Correct. z = (X − μ)/σ = (23 − 20)/2 = 1.5; it is positive because the target is later than the expected time (L8).`],
        [`−1.5`, `−1.5 reverses the formula: z = (X − μ)/σ = (23 − 20)/2 = +1.5.`],
        [`3`, `3 = 23 − 20 is only the difference; it must be divided by σ = 2: z = 1.5.`],
        [`0.75`, `0.75 = 3/4 divides by the variance σ² = 4; z divides by the standard deviation σ = 2: z = 1.5.`]
      ], a: 0 },
    { q: `Using the table value 0.4332 for z = 1.5, P(T ≤ 23) is:`,
      o: [
        [`0.4332`, `0.4332 is only the table area between 0 and z = 1.5; for X > μ add the left half: 0.5 + 0.4332 = 0.9332.`],
        [`0.0668`, `0.0668 = 0.5 − 0.4332 is P(T > 23), finishing later than 23 weeks.`],
        [`0.9332`, `Correct. Since 23 > μ (z = +1.5), P(T ≤ 23) = 0.5 (left half of the curve) + 0.4332 (table area 0 to z) = 0.9332 (L8).`],
        [`1.5`, `1.5 is the z value; a probability must be between 0 and 1. P = 0.5 + 0.4332 = 0.9332.`]
      ], a: 2 },
    { q: `μ = 30, σ = 4. P(project finishes within 26 weeks) is (table area for z = 1.00 is 0.3413):`,
      o: [
        [`0.8413`, `0.8413 = 0.5 + 0.3413 is for z = +1 (a target after μ); here 26 &lt; 30 gives z = −1, so P = 0.5 − 0.3413.`],
        [`0.1587`, `Correct. z = (26 − 30)/4 = −1 → 0.5 − 0.3413.`],
        [`0.3413`, `0.3413 is only the table area between 0 and |z| = 1; for z = −1, P = 0.5 − 0.3413 = 0.1587.`],
        [`−1`, `−1 is the z value (26 − 30)/4; a probability cannot be negative. P = 0.5 − 0.3413 = 0.1587.`]
      ], a: 1 },
    { q: `Critical activities have variances 1, 4 and 0.44. The project standard deviation is:`,
      o: [
        [`2.33`, `Correct. Variances of the critical activities add: σ² = 1 + 4 + 0.44 = 5.44, and σ = √5.44 = 2.33 (L8).`],
        [`5.44`, `5.44 is the project VARIANCE; the standard deviation is its square root, √5.44 = 2.33.`],
        [`3.44`, `3.44 = 1 + 2 + 0.44 mixes standard deviations with a variance; add the variances (5.44) and take the root: 2.33.`],
        [`1.81`, `1.81 is not √5.44; the variances sum to 5.44, whose square root is 2.33.`]
      ], a: 0 },
    { q: `"What is the probability of completing the project AFTER 35 weeks?" You compute:`,
      o: [
        [`P(T ≤ 35)`, `P(T ≤ 35) is for 'in / on / before 35 weeks'; 'after' is the complement, 1 − P(T ≤ 35).`],
        [`P(T = 35)`, `T is a continuous normal variable, so P(T = 35) is 0; 'after 35 weeks' means P(T ≥ 35).`],
        [`0.5 exactly`, `0.5 holds only if 35 equals μ (z = 0); in general compute z and take 1 − P(T ≤ 35).`],
        [`P(T ≥ 35) = 1 − P(T ≤ 35)`, `Correct. 'After X' is the right-hand tail of the normal curve: P(T ≥ X) = 1 − P(T ≤ X), with P(T ≤ X) found from z = (X − μ)/σ (L8, probability rules).`]
      ], a: 3 },
    { q: `Activity (4, 4, 10). Its expected time is:`,
      o: [
        [`6`, `6 is the simple average (4 + 4 + 10)/3; PERT weights m by 4: (4 + 16 + 10)/6 = 5.`],
        [`4`, `4 is the optimistic and most likely value; te must include the pessimistic 10: (4 + 16 + 10)/6 = 5.`],
        [`5`, `Correct. te = (a + 4m + b)/6 = (4 + 4×4 + 10)/6 = 30/6 = 5 (L8).`],
        [`7`, `7 is the midpoint (4 + 10)/2 of the extremes; te = (4 + 16 + 10)/6 = 5.`]
      ], a: 2 },
    { q: `Activity (1, 4, 7). Its variance is:`,
      o: [
        [`1`, `Correct. σ² = ((b − a)/6)² = ((7 − 1)/6)² = 1² = 1 (L8, PERT formulas).`],
        [`6`, `6 = b − a is only the spread; σ² = ((7 − 1)/6)² = 1.`],
        [`4`, `4 is the expected time (1 + 16 + 7)/6; the variance is ((7 − 1)/6)² = 1.`],
        [`0.5`, `0.5 does not come from the formula; σ² = ((7 − 1)/6)² = 1² = 1.`]
      ], a: 0 },
    { q: `The probability of finishing exactly by the expected project time μ (P(T ≤ μ)) is:`,
      o: [
        [`0`, `Not zero; half of the normal curve lies below μ.`],
        [`0.5`, `Correct. At X = μ, z = (μ − μ)/σ = 0 and the table area is 0, so P = 0.5: the normal curve is symmetric about μ (L8).`],
        [`1`, `P = 1 would mean the project can never run late, but half of the normal curve lies above μ.`],
        [`0.8413`, `0.8413 = 0.5 + 0.3413 is P(T ≤ μ + σ), for z = 1; at μ itself z = 0 and P = 0.5.`]
      ], a: 1 }
  ],
  9: [
    { q: `Network: S→A 2, S→B 5, A→C 4, A→D 7, B→C 1, B→D 3, C→T 6, D→T 2. The shortest path S → T is:`,
      o: [
        [`S-A-C-T (12)`, `S-A-C-T = 2 + 4 + 6 = 12; from A the route via D (7 + 2 = 9) beats C (4 + 6 = 10), and S via B is shorter still.`],
        [`S-A-D-T (11)`, `S-A-D-T = 2 + 7 + 2 = 11, which is d(S) through A; going through B gives 5 + 5 = 10.`],
        [`S-B-D-T (10)`, `Correct. d(C) = 6, d(D) = 2; d(A) = 9, d(B) = min(7, 5) = 5; d(S) = min(2 + 9, 5 + 5) = 10.`],
        [`S-B-C-T (12)`, `S-B-C-T = 5 + 1 + 6 = 12; from B the route via D (3 + 2 = 5) beats C (1 + 6 = 7).`]
      ], a: 2 },
    { q: `Same network. d(A, T) equals:`,
      o: [
        [`9`, `Correct. d(A) = min{c(A,C) + d(C), c(A,D) + d(D)} = min{4 + 6, 7 + 2} = 9, reached via D (L9, recursion).`],
        [`10`, `10 = 4 + 6 is the route via C; via D it is 7 + 2 = 9, and the node takes the minimum.`],
        [`11`, `11 = 2 + 9 is the distance from S through A, one stage further back, not d(A).`],
        [`2`, `2 is d(D, T); A must first travel the arc A→D = 7, so d(A) = 9.`]
      ], a: 0 },
    { q: `In the backward approach for the same network, the first values computed are:`,
      o: [
        [`d(S, A) and d(S, B)`, `d(S, A) and d(S, B) start from the source, which is the forward direction; backward starts next to T.`],
        [`d(C, T) and d(D, T)`, `Correct. Start with the nodes adjacent to the destination.`],
        [`d(A, T) only`, `A is one stage further from T; its value needs d(C) and d(D) first.`],
        [`All path totals`, `Enumerating every complete path is exactly what DP avoids; it computes one stage of node values at a time.`]
      ], a: 1 },
    { q: `Solving the same shortest route problem forward instead of backward gives:`,
      o: [
        [`A longer path`, `The optimum does not depend on the direction.`],
        [`An infeasible result`, `Both forward and backward recursions are valid DP schemes on the same network, so neither gives an infeasible result.`],
        [`A different but equally short path every time`, `The optimal distance is the same either way; a different path appears only when two paths tie for the minimum.`],
        [`The same shortest distance`, `Correct. Both are valid DP schemes; the course asks for the backward one.`]
      ], a: 3 },
    { q: `In the 2021/22 network, d(M4, M7) = min{6 + d(M5), 3 + d(M6)} with d(M5) = 6, d(M6) = 8. Its value and next node are:`,
      o: [
        [`12 via M5`, `12 = 6 + 6 via M5 is larger than 3 + 8 = 11 via M6, and the node takes the minimum.`],
        [`11 via M6`, `Correct. d(M4) = min{6 + d(M5), 3 + d(M6)} = min{6 + 6, 3 + 8} = min{12, 11} = 11, so the best next node is M6 (L9).`],
        [`9 via M6`, `9 = 3 + 6 pairs the arc to M6 with d(M5); via M6 it is 3 + d(M6) = 3 + 8 = 11.`],
        [`14 via M5`, `14 = 6 + 8 pairs the arc to M5 with d(M6); via M5 it is 6 + 6 = 12, and the minimum is 11 via M6.`]
      ], a: 1 },
    { q: `The idea that "whatever the earlier decisions, the remaining decisions must be optimal from the current node" is called:`,
      o: [
        [`The principle of optimality`, `Correct. It is the basis of dynamic programming recursion.`],
        [`The northwest corner rule`, `The northwest corner rule is a transportation starting method (L4), not a DP principle.`],
        [`Branch and bound`, `Branch and bound is the integer programming method (L6) that splits the LP relaxation on fractional variables.`],
        [`The critical path`, `The critical path is the longest path in a CPM project network (L7), not a DP principle.`]
      ], a: 0 },
    { q: `If arc M4→M6 in the 2021/22 network changed from 3 to 5, the shortest M1 → M7 path would be:`,
      o: [
        [`M1-M2-M4-M6-M7 = 27`, `With M4→M6 = 5 this route becomes 5 + 9 + 5 + 8 = 27, longer than the M5 route (26).`],
        [`M1-M2-M3-M5-M7 = 29`, `M1-M2-M3-M5-M7 = 5 + 7 + 11 + 6 = 29 is still longer than 26 via M4 and M5.`],
        [`M1-M2-M4-M5-M7 = 26`, `Correct. d(M4) = min{6 + 6, 5 + 8} = 12, d(M2) = min{24, 21} = 21, d(M1) = 26.`],
        [`Unchanged at 25`, `The old best path used M4→M6; at 5 it costs 27, so the optimum moves to M4→M5 and becomes 26.`]
      ], a: 2 },
    { q: `How many different S → T paths exist in the 2019/20 network (S→A, S→B, S→C; A→D, A→E; B→D, B→E; C→E, C→T; D→T; E→T)?`,
      o: [
        [`3`, `Only 3 counts one route per first arc (S→A, S→B, S→C); A and B each branch twice and C twice, giving 6.`],
        [`4`, `4 misses routes: S→A and S→B each have 2 continuations (D or E) and S→C has 2 (E or T): 2 + 2 + 2 = 6.`],
        [`5`, `5 misses one route; S→A, S→B and S→C each lead to 2 continuations: 2 + 2 + 2 = 6.`],
        [`6`, `Correct. S-A-D-T, S-A-E-T, S-B-D-T, S-B-E-T, S-C-E-T, S-C-T.`]
      ], a: 3 },
    { q: `Which step is NOT part of the backward DP solution?`,
      o: [
        [`Dividing the network into stages`, `Dividing the network into stages IS a step of DP: it fixes the order in which node values are computed.`],
        [`Listing every complete path before computing`, `Correct choice. DP computes stage values instead of enumerating paths (listing is only a shortcut some tutors mention).`],
        [`Taking the minimum at each node`, `Taking the minimum of (arc + next d) at each node IS the DP recursion, so it is part of the method.`],
        [`Recording the arc that achieves each minimum`, `Recording which arc gave each minimum IS needed: it lets you trace the optimal path forward after the recursion.`]
      ], a: 1 },
    { q: `The DP recursion for the shortest route is:`,
      o: [
        [`d(i) = min over j of [c(i, j) + d(j)]`, `Correct. Arc length plus the best remaining distance.`],
        [`d(i) = max over j of [c(i, j) + d(j)]`, `Taking the maximum would give the LONGEST route; the shortest route needs the minimum at every node.`],
        [`d(i) = Σ c(i, j)`, `Summing all outgoing arcs mixes alternative routes together; each node should choose ONE best arc plus d(j).`],
        [`d(i) = min over j of c(i, j)`, `Taking only the shortest arc ignores the distance still to go after node j; the recursion adds d(j).`]
      ], a: 0 }
  ]
};

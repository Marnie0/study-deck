window.COURSES = window.COURSES || {};
COURSES.dm = {
  id: `dm`,
  name: `Discrete Mathematics`,
  short: `Discrete`,
  code: `BS 113 / BS 204`,
  by: `Prof. Shereen Magdy`,
  lectures: [
    /* ───────────────────────── LECTURE 1 ───────────────────────── */
    {
      n: 1, title: `Sets: Theory and Types of Sets`,
      notes: [
        { h: `What is a set?`, pts: [
          `A <b>set</b> is a <b>well defined collection of objects</b>, called the "<b>elements</b>" or "<b>members</b>" of the set.`,
          `A set can be defined in <b>two ways</b>: (1) <b>listing</b> (roster) the elements between curly braces <code>{ }</code> separated by commas, e.g. {1, 2, 3, 4, 5}; (2) using a <b>property</b> that defines the elements (set-builder), e.g. {x | x is odd and 0 &lt; x &lt; 100}.`,
          `If x is an element of A we write <b>x ∈ A</b>; if x is not an element of A we write <b>x ∉ A</b>.`,
          `<b>Well defined</b> means it is always clear whether an object belongs or not. "The set of all even numbers less than 10" is well defined; "tall students", "good teachers", "beautiful cities" are <b>not</b> (Midterm 2025/26 Q7).`
        ]},
        { h: `Symbols and special sets`, table: [
          [`Symbol`, `Meaning`],
          [`∈`, `"is an element of" / "belongs to"`],
          [`∉`, `"is not an element of" / "doesn't belong to"`],
          [`n(A) or |A|`, `the number of elements in set A (cardinality)`],
          [`{ } or ∅`, `the empty (null, void) set`],
          [`=`, `equality: both sets have the same elements`],
          [`N`, `set of all natural numbers`],
          [`Z`, `set of all integers`],
          [`Q`, `set of all rational numbers`],
          [`R`, `set of all real numbers`],
          [`C`, `set of all complex numbers`]
        ]},
        { h: `Example 1.1 (elements)`, formula: [
          `A = {0,1,2,3,4,5,6,7,8,9}, B = {1,2,4,8,16}, C = {2⁰,2¹,2²,2³,2⁴} = {1,2,4,8,16}, D = {prime numbers between 7 and 11}`,
          `5 ∈ A (5 is listed in A)`,
          `5 ∉ B (B has only powers of 2)`,
          `8 ∈ C (8 = 2³)`,
          `9 ∉ C (9 is not a power of 2)`,
          `Note: B = C (same elements). D: the numbers strictly between 7 and 11 are 8, 9, 10, all composite, so D = ∅ (if "between" includes the ends, D = {7, 11}).`
        ]},
        { h: `Types of sets`, pts: [
          `<b>Subset</b>: if every element of A is also an element of B, then A is a subset of B, written <b>A ⊆ B</b>. Example: A = {1,2,3,4,5,6}, B = {1,2,3,4} → B ⊆ A.`,
          `<b>Equal sets</b>: A and B are equal if they have the same elements, i.e. <b>A ⊆ B and B ⊆ A</b>, which implies A = B. Order and repetition do not matter: {1,3,4,5,6} = {4,1,5,6,3}.`,
          `<b>Empty set</b> (null / void set), denoted ∅ or { }: contains no elements. Examples: whole numbers less than 0; {x : x ∈ N, 3 &lt; x &lt; 4}; {x : 2 &lt; x &lt; 3, x natural}; {x : x is a composite number less than 4}.`,
          `<b>Finite set</b>: contains a definite number of elements. The empty set is also finite. Examples: colours of the rainbow, {x : x ∈ N, x &lt; 7}, primes up to 97.`,
          `<b>Infinite set</b>: elements cannot all be listed (never-ending). Examples: points in a plane, {x : x ∈ N, x &gt; 1}, all prime numbers.`,
          `<b>Universal set</b> U (or ξ): a set that contains all elements of the other given sets. If A = {1,2,3}, B = {2,3,4}, C = {3,5,7} then U = {1,2,3,4,5,7}. If P = whole numbers and Q = negative numbers, U = all integers.`
        ]},
        { h: `Power set`, pts: [
          `The <b>power set</b> of S, written <b>P(S)</b>, is the set of <b>all subsets</b> of S. Every element of P(S) is itself a set.`,
          `P(∅) = {∅}, so |P(∅)| = 1 (it is <b>not</b> empty: it contains the empty set).`,
          `P({1}) = {∅, {1}} → 2 elements. P({p, q}) = {∅, {p}, {q}, {p, q}} → 4 elements.`,
          `P({1,2,3}) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}} → 8 elements.`,
          `<b>Rule: if |S| = n then |P(S)| = 2ⁿ</b> (each element is either in or out of a subset). The slide writes "n[P(A)] = 4 = 2²".`,
          `∅ and S itself are always members of P(S).`
        ]},
        { h: `∈ versus ⊆ (common exam trap)`, pts: [
          `∈ relates an <b>element</b> to a set; ⊆ relates a <b>set</b> to a set.`,
          `3 ∈ {1,2,3} is true. {3} ∈ {1,2,3} is false ({3} is a set, not one of the listed elements). {3} ⊆ {1,2,3} is true.`,
          `{2} is a subset of {1,2,3}; the number 2 is an element, not a subset.`,
          `A ⊆ A is always true (every set is a subset of itself). A ∈ A is false for ordinary sets.`,
          `Example (Exam 2021/22): A = {0, {0}}, B = {0}. B ∈ A is true ({0} is listed). B ⊆ A is true (0 ∈ A). P(B) = {∅, {0}} ⊆ A is <b>false</b> because ∅ is not an element of A.`
        ]},
        { h: `Lecture 1 operations preview`, pts: [
          `The four basic operations: (1) <b>union</b>, (2) <b>intersection</b>, (3) <b>complement</b>, (4) <b>Cartesian product</b>. They are developed in Lecture 2.`,
          `Union A ∪ B = {x | x ∈ A or x ∈ B}: the smallest set containing all elements of both sets.`,
          `Intersection A ∩ B = {x | x ∈ A and x ∈ B}. If A ∩ B = ∅ the sets are <b>disjoint</b>.`,
          `Complement: if U is the universal set containing A, then U − A is the complement of A.`,
          `Difference A \\ B = {x | x ∈ A, x ∉ B}, read "A minus B" (also written A − B or A ~ B).`,
          `Example: U = students, M = male, F = female: U is the <b>disjoint union</b> of M and F, U = M ∪ F and M ∩ F = ∅.`
        ]},
        { h: `Worked example from the lecture`, formula: [
          `A = {1,2,3,4}, B = {3,4,5,6,7}, C = {2,3,8,9}, E = {2,4,6,...}, U = N`,
          `A ∪ B = {1,2,3,4,5,6,7}   A ∪ C = {1,2,3,4,8,9}   B ∪ C = {2,3,4,5,6,7,8,9}`,
          `A ∩ B = {3,4}   A ∩ C = {2,3}   B ∩ C = {3}`,
          `A \\ B = {1,2}   A \\ C = {1,4}   B \\ C = {4,5,6,7}`,
          `A \\ E = {1,3} (remove the even numbers 2 and 4)`
        ]}
      ],
      cards: [
        [`Set`, `A well defined collection of objects called elements or members.`],
        [`Two ways to define a set`, `Listing the elements in { } separated by commas, or a property (set-builder) such as {x | x is odd and 0 &lt; x &lt; 100}.`],
        [`x ∈ A / x ∉ A`, `x is an element of A / x is not an element of A.`],
        [`n(A)`, `Number of elements of A (cardinality, also |A|).`],
        [`N, Z, Q, R, C`, `Natural numbers, integers, rationals, reals, complex numbers.`],
        [`Subset A ⊆ B`, `Every element of A is also an element of B.`],
        [`Equal sets`, `A ⊆ B and B ⊆ A (same elements; order and repetition do not matter).`],
        [`Empty set`, `Set with no elements, ∅ or { } (null / void set). Example: {x ∈ N : 3 &lt; x &lt; 4}.`],
        [`Finite set`, `Has a definite number of elements. ∅ is finite.`],
        [`Infinite set`, `Elements cannot be listed; never-ending (e.g. all primes, {x ∈ N : x &gt; 1}).`],
        [`Universal set`, `U or ξ: contains all elements of the other given sets.`],
        [`Power set P(S)`, `The set of all subsets of S; each element is a set.`],
        [`|P(S)| when |S| = n`, `2ⁿ`],
        [`P(∅)`, `{∅}, which has 1 element.`],
        [`P({a, b})`, `{∅, {a}, {b}, {a, b}}`],
        [`Disjoint sets`, `A ∩ B = ∅`],
        [`Is {3} ∈ {1,2,3}?`, `No. {3} ⊆ {1,2,3} is true, but {3} is not one of the elements.`]
      ],
      qa: [
        [`Define a set and state the two ways of describing a set, with an example of each.`, `A set is a well defined collection of objects called elements (members). (1) Listing: write the elements between curly braces separated by commas, e.g. {1, 2, 3, 4, 5}. (2) Property / set-builder: state a property satisfied exactly by the elements, e.g. {x | x is odd and 0 &lt; x &lt; 100}.`],
        [`Explain, with examples, the empty, finite, infinite and universal sets.`, `<b>Empty</b>: no elements, ∅ or { }, e.g. {x : x is a natural number, 2 &lt; x &lt; 3}. <b>Finite</b>: definite number of elements, e.g. colours of the rainbow, {x ∈ N : x &lt; 7}; ∅ is finite. <b>Infinite</b>: never-ending elements, e.g. {x ∈ N : x &gt; 1}, set of primes. <b>Universal</b>: contains all elements of the sets under discussion, e.g. A = {1,2,3}, B = {2,3,4}, C = {3,5,7} → U = {1,2,3,4,5,7}.`],
        [`What is the power set? Write P({1,2,3}) and state the size rule.`, `P(S) is the set of all subsets of S. P({1,2,3}) = {∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}. If |S| = n then |P(S)| = 2ⁿ, here 2³ = 8.`],
        [`When are two sets equal? Is {1,3,4,5,6} = {4,1,5,6,3}?`, `A = B when A ⊆ B and B ⊆ A, i.e. they contain exactly the same elements. Yes, the two sets are equal: order does not matter.`],
        [`Distinguish between ∈ and ⊆ using A = {0, {0}}.`, `∈ says an object is one of the listed elements; ⊆ says every element of one set is in another. 0 ∈ A and {0} ∈ A (both are listed). {0} ⊆ A also holds since 0 ∈ A. {{0}} ⊆ A holds. But ∅ ∈ A is false, so P({0}) = {∅, {0}} is not a subset of A.`]
      ],
      quiz: [
        { q: `The number of subsets of {1, 2, 3} is:`, o: [[`3`, `3 is n, the number of elements of {1, 2, 3}. The question asks for subsets, and their count is 2ⁿ = 2³ = 8.`], [`4`, `4 = 2² is the number of subsets of a 2-element set such as {a, b}. With 3 elements the count is 2³ = 8.`], [`6`, `Not a power of 2; the count of subsets is always 2ⁿ.`], [`8`, `Correct. If |S| = n then |P(S)| = 2ⁿ, since each element is either in or out of a subset: 2³ = 8 (∅, three singletons, three pairs, and {1, 2, 3}) (L1, Power set).`]], a: 3, src: `Midterm 2025/26` },
        { q: `Which of the following sets are equal?`, o: [[`{1, 2, 3} and {3, 2, 1}`, `Correct. Sets are equal when they have the same elements (A ⊆ B and B ⊆ A); order does not matter, so {1, 2, 3} = {3, 2, 1} (L1, Types of sets).`], [`{1, 2, 3} and {1, 2, 4}`, `The sets differ: 3 is in the first but not the second, and 4 is in the second but not the first. Equal sets must have exactly the same elements.`], [`{1, 2, 3} and {3, 4, 5}`, `They share only the element 3; 1 and 2 are missing from the second set and 4, 5 from the first, so neither is a subset of the other.`], [`{2, 3} and {3, 4}`, `2 is in the first set but not the second (and 4 the other way round), so {2, 3} ⊄ {3, 4}. Equality needs A ⊆ B and B ⊆ A.`]], a: 0, src: `Midterm 2025/26` },
        { q: `The power set of {a, b} is:`, o: [[`{∅, {a}, {b}, {a, b}}`, `Correct. All 2² = 4 subsets including ∅ and the set itself.`], [`{{a, b}}`, `{{a, b}} has only one subset, the set itself. A power set holds all 2² = 4 subsets, so ∅, {a} and {b} are missing.`], [`{{a}, {b}}`, `Only the two one-element subsets are listed. ∅ and the set {a, b} itself are always members of P(S), so two subsets are missing.`], [`{a, b}`, `This is the set itself, not the set of its subsets.`]], a: 0, src: `Midterm 2025/26` },
        { q: `If A ⊆ B, then:`, o: [[`Every element of B is in A`, `"Every element of B is in A" is the definition of B ⊆ A, the reverse inclusion. A ⊆ B says nothing about B's other elements.`], [`Every element of A is in B`, `Correct. By definition, A ⊆ B means every element of A is also an element of B; B may contain extra elements (L1, Types of sets: Subset).`], [`A and B have no common elements`, `Having no common elements means A ∩ B = ∅, the definition of disjoint sets. A subset shares all its elements with B.`], [`A = ∅`, `∅ ⊆ B is true for every B, but it is only one case. For example {1} ⊆ {1, 2} with A non-empty, so A ⊆ B does not force A = ∅.`]], a: 1, src: `Midterm 2025/26` },
        { q: `Which of the following is a well-defined set?`, o: [[`The set of tall students in a class`, `"Tall" has no fixed cutoff, so it is not always clear whether a student belongs. The lecture lists "tall students" as not well defined.`], [`The set of all even numbers less than 10`, `Correct. A set must be well defined: it is always clear whether an object belongs. "Even numbers less than 10" gives exactly {2, 4, 6, 8} (L1, What is a set?).`], [`The set of good teachers`, `"Good" is a matter of opinion, so membership is not clear. The lecture gives "good teachers" as an example of a collection that is not well defined.`], [`The set of beautiful cities`, `"Beautiful" is subjective, so people would disagree on membership. The lecture uses "beautiful cities" as a collection that is not well defined.`]], a: 1, src: `Midterm 2025/26` },
        { q: `If A = {x | x is an even number less than 10}, then A =`, o: [[`{2, 4, 6, 8}`, `Correct. Positive even numbers below 10 (lecture convention).`], [`{1, 3, 5, 7, 9}`, `{1, 3, 5, 7, 9} are the odd numbers below 10. The property asks for even numbers, which gives {2, 4, 6, 8}.`], [`{0, 2, 4, 6, 8, 10}`, `10 is not less than 10, so it cannot be included (and, by the lecture's convention, the key also leaves out 0). A = {2, 4, 6, 8}.`], [`{2, 4, 6}`, `This stops at 6, but 8 is even and less than 10, so it belongs too. A = {2, 4, 6, 8}.`]], a: 0, src: `Midterm 2025/26` },
        { q: `The Power Set of a set S, denoted P(S), if S = {1, 3} is:`, o: [[`P(S) = {3, 1}`, `{3, 1} = {1, 3} is S itself (order does not matter). P(S) must contain the subsets of S as elements: ∅, {1}, {3}, {1, 3}.`], [`P(S) = {0, Φ}`, `0 is a number, not a subset of {1, 3}, and only ∅ is listed among the real subsets. P(S) = {∅, {1}, {3}, {1, 3}}.`], [`P(S) = {Φ, {1}, {3}, {1, 3}}`, `Correct. P(S) is the set of all subsets of S. With |S| = 2 there are 2² = 4: ∅, {1}, {3} and {1, 3} (L1, Power set).`], [`P(S) = ∅`, `A power set is never empty: ∅ and S itself are always members of P(S). Here P(S) has 2² = 4 elements.`]], a: 2, src: `Exam 2025/26` },
        { q: `The Power Set of S = {1, 4} is:`, o: [[`{2, 1}`, `{2, 1} is not built from S at all: 2 is not in S, and its elements are numbers, not subsets. P(S) = {∅, {1}, {4}, {1, 4}}.`], [`{0, Φ}`, `0 is not a subset of {1, 4}, and {1}, {4}, {1, 4} are missing. Every element of P(S) is itself a set.`], [`{Φ, {1}, {4}, {1, 4}}`, `Correct. The power set lists all 2² = 4 subsets of {1, 4}: ∅, the singletons {1} and {4}, and {1, 4} itself (L1, Power set).`], [`∅`, `A power set is never empty: ∅ and S itself are always members of P(S). Here P(S) has 2² = 4 elements.`]], a: 2, src: `Exam 2024/25` },
        { q: `The Power Set of S = {1, 2} is:`, o: [[`{0, 1}`, `{0, 1} contains numbers, not subsets, and 0 is not even in S. The elements of P(S) must be sets: ∅, {1}, {2}, {1, 2}.`], [`{0, Φ}`, `0 is not a subset of {1, 2}; besides ∅, the subsets {1}, {2} and {1, 2} are missing. |P(S)| must be 2² = 4.`], [`{Φ, {1}, {2}, {1, 2}}`, `Correct. P(S) is the set of all subsets of S; for S = {1, 2} these are ∅, {1}, {2} and {1, 2}, 2² = 4 in total (L1, Power set).`], [`{0}`, `{0} has one element, a number that is not a subset of S. P(S) must have 2² = 4 sets as elements, including ∅ and S.`]], a: 2, src: `Exam 2023/24` },
        { q: `The number of elements of the power set of S = {1, 2}, n(P(S)), is:`, o: [[`{{1}, {2}, {1, 2}, ∅}`, `This is the power set itself, not its number of elements.`], [`{{1}}`, `n(P(S)) asks for a number (the cardinality), and {{1}} is a set. Also it lists only one subset; P(S) has 2² = 4.`], [`4`, `Correct. If |S| = n then n(P(S)) = 2ⁿ. Here n = 2, so 2² = 4: ∅, {1}, {2}, {1, 2} (L1, Power set).`], [`6`, `6 is not a power of 2, and a power set always has 2ⁿ elements. For n = 2 that is 2² = 4 (6 would be a guess like 2 × 3).`]], a: 2, src: `Exam 2023/24` },
        { q: `The Power Set of S = {0, 1} is:`, o: [[`{0, 1}`, `{0, 1} is S itself, a set of numbers. P(S) contains the subsets of S as elements: ∅, {0}, {1}, {0, 1}.`], [`{0, Φ}`, `Here 0 is just the element 0, not a subset, and {0}, {1}, {0, 1} are missing. P(S) must have 2² = 4 subsets.`], [`{Φ, {0}, {1}, {0, 1}}`, `Correct. The power set of {0, 1} lists all 2² = 4 subsets: ∅, {0}, {1} and {0, 1}. Note {0} (a set) differs from 0 (an element) (L1, Power set).`]], a: 2, src: `Exam 2020/21` },
        { q: `The Power Set of S = {2, 4} is:`, o: [[`{2, 1}`, `{2, 1} contains numbers, and 1 is not in S. P(S) must contain the subsets of {2, 4}: ∅, {2}, {4}, {2, 4}.`], [`{0, Φ}`, `0 is not a subset of {2, 4}, and {2}, {4}, {2, 4} are missing. A power set of a 2-element set has 2² = 4 elements.`], [`{Φ, {2}, {4}, {2, 4}}`, `Correct. P(S) is the set of all subsets of S = {2, 4}: ∅, {2}, {4} and {2, 4}, giving 2² = 4 elements (L1, Power set).`]], a: 2, src: `Exam 2021/22` },
        { q: `Which of the following is True?`, o: [[`4 ⊂ {1, 2, 3}`, `4 is a number (not a set) and is not even in the set.`], [`3 ∈ {1, 2, 3}`, `Correct. ∈ relates an element to a set, and 3 is one of the listed elements of {1, 2, 3}, so 3 ∈ {1, 2, 3} (L1, ∈ versus ⊆).`], [`{3} ∈ {1, 2, 3}`, `{3} is a set; the elements are the numbers 1, 2, 3. ({3} ⊆ {1,2,3} would be true.)`], [`{1, 2, 3} ∈ 3`, `This reverses the roles: 3 is a number, not a set, so nothing can be an element of it. The true statement is 3 ∈ {1, 2, 3}.`]], a: 1, src: `Exam 2025/26` },
        { q: `Which of the following is a subset of {1, 2, 3}?`, o: [[`2`, `2 is an element of {1, 2, 3}, so 2 ∈ {1, 2, 3}; but ⊆ relates a set to a set, and the number 2 is not a set. The subset is {2}.`], [`{2}`, `Correct. Every element of {2} is in {1, 2, 3}.`], [`4`, `4 is a number, not a set, so it cannot be a subset; and 4 is not even an element of {1, 2, 3}.`], [`{4}`, `{4} is a set, but its element 4 is not in {1, 2, 3}, so {4} ⊄ {1, 2, 3}. A subset needs every element inside the bigger set.`]], a: 1, src: `Exam 2025/26` },
        { q: `Which of the following is always true?`, o: [[`A ∈ A`, `A ∈ A would mean A is one of its own elements, which is false for ordinary sets. The always-true fact is A ⊆ A.`], [`A ⊂ A`, `Correct (⊂ used as "subset of"): every set is a subset of itself.`], [`A ⊄ A`, `This denies A ⊆ A, but every element of A is in A, so A is always a subset of itself. A ⊄ A is never true.`], [`A ⊂ ∅`, `A ⊆ ∅ holds only when A has no elements, i.e. A = ∅. Any non-empty A has an element that is not in ∅.`]], a: 1, src: `Exam 2025/26` },
        { q: `Suppose A = {0, {0}} and B = {0}. Which statement is FALSE?`, o: [[`B ∈ A`, `This statement is true, so it is not the answer: A = {0, {0}} lists {0} as an element, and {0} = B, so B ∈ A.`], [`B ⊆ A`, `This statement is true, so it is not the answer: B = {0} has the single element 0, and 0 ∈ A, so B ⊆ A.`], [`P(B) ⊂ A`, `Correct (it is false). P(B) = {∅, {0}} and ∅ is not an element of A.`]], a: 2, src: `Exam 2021/22` },
        { q: `Lecture example 1.1: B = {1, 2, 4, 8, 16} and C = {2⁰, 2¹, 2², 2³, 2⁴}. Which is correct?`, o: [[`B = C`, `Correct. Evaluate C: 2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16, so C = {1, 2, 4, 8, 16}. Same elements as B, so B = C (L1, Example 1.1).`], [`5 ∈ B`, `B = {1, 2, 4, 8, 16} contains only powers of 2, and 5 is not one. The lecture writes 5 ∉ B.`], [`B ≠ C`, `Evaluating C gives 2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16, exactly B's elements, so B = C, not B ≠ C.`], [`9 ∈ C`, `C = {1, 2, 4, 8, 16} and 9 is not a power of 2, so 9 ∉ C. The lecture's example is 8 ∈ C (8 = 2³).`]], a: 0, src: `Lecture 1 example` },
        { q: `|P(∅)| equals:`, o: [[`2`, `2 = 2¹ is the size of P({1}) = {∅, {1}}. ∅ has 0 elements, so |P(∅)| = 2⁰ = 1.`], [`1`, `Correct. ∅ has n = 0 elements, so |P(∅)| = 2⁰ = 1. Its single element is ∅ itself: P(∅) = {∅} (L1, Power set).`], [`0`, `P(∅) = {∅} is not empty: it contains the empty set as an element, because ∅ ⊆ ∅. So |P(∅)| = 2⁰ = 1.`], [`Undefined`, `The rule |P(S)| = 2ⁿ works for n = 0 too: 2⁰ = 1, since ∅ has exactly one subset, ∅ itself.`]], a: 1, src: `Lecture 1 example` }
      ]
    },

    /* ───────────────────────── LECTURE 2 ───────────────────────── */
    {
      n: 2, title: `Operations on Sets and Set Identities`,
      notes: [
        { h: `The four basic operations`, pts: [
          `<b>1. Union</b> A ∪ B = {x | x ∈ A <b>or</b> x ∈ B}: the set of all elements in either set ("or" includes "both"). Venn: all of A and all of B shaded. Example: {4, 5} ∪ {5, 6, 7} = {4, 5, 6, 7} (do not write 5 twice).`,
          `<b>2. Intersection</b> A ∩ B = {x | x ∈ A <b>and</b> x ∈ B}: only the elements in common, the overlapped part. Example: {4, 5} ∩ {5, 6, 7} = {5}. If A ∩ B = ∅ the sets are <b>disjoint</b>.`,
          `<b>3. Complement</b> A′ (also Aᶜ or Ā) = {x : x ∈ U but x ∉ A} = U − A. Think "not A". Venn: everything inside the rectangle U but outside the circle A.`,
          `<b>4. Cartesian product</b> A × B = {(a, b) | a ∈ A, b ∈ B}: all ordered pairs; |A × B| = |A|·|B| (e.g. |A| = 4, |B| = 3 → |A × B| = 12).`,
          `<b>Difference</b> B − A = {x | x ∈ B and x ∉ A}: elements in B but not in A (shade the part of B outside A).`
        ]},
        { h: `Ex 1 from the lecture (corrected)`, formula: [
          `U = {1,2,3,4,5,6,7,8,9,10}, A = {1,2,3}, B = {3,4,6}, C = {1,4,7}`,
          `a) A ∩ B = {3}`,
          `b) A ∪ B = {1,2,3,4,6}`,
          `c) A − B = {1,2}`,
          `d) A − C = {2,3}`,
          `f) (A ∩ B)ᶜ = U − {3} = {1,2,4,5,6,7,8,9,10}`,
          `u) (A ∪ B)ᶜ = U − {1,2,3,4,6} = {5,7,8,9,10}`,
          `n) Aᶜ ∩ Bᶜ = {4,5,6,7,8,9,10} ∩ {1,2,5,7,8,9,10} = {5,7,8,9,10} (= (A ∪ B)ᶜ, De Morgan)`,
          `s) Aᶜ ∪ Bᶜ = {1,2,4,5,6,7,8,9,10} (= (A ∩ B)ᶜ, De Morgan)`,
          `Slide error: the slide writes "A ∩ B = {1,2,3,4,6}" and "(A ∩ B)ᶜ = {5,7,8,9,10}"; those are the union and its complement. The correct (A ∩ B)ᶜ is shown above.`
        ]},
        { h: `More examples`, pts: [
          `S = {1, 0}, T = {0, 1, 2}: S ⊂ T, S ∩ T = S, S ∪ T = T, T − S = {2}.`,
          `Rule: if A ⊆ B then A ∩ B = A and A ∪ B = B.`,
          `U = {1,2,3,4,5}, A = {1,2} → A′ = {3,4,5}. U = {1,…,6}, A = {2,4,6} → A′ = {1,3,5}.`,
          `{2,4,6,8} ∩ {4,8,10,12} = {4,8}.`
        ]},
        { h: `Set identities (laws)`, table: [
          [`Identity`, `Law`],
          [`A ∪ ∅ = A,  A ∩ U = A`, `Identity`],
          [`A ∪ U = U,  A ∩ ∅ = ∅`, `Domination`],
          [`A ∪ A = A,  A ∩ A = A`, `Idempotent`],
          [`(Aᶜ)ᶜ = A`, `Complementation`],
          [`A ∪ B = B ∪ A,  A ∩ B = B ∩ A`, `Commutative`],
          [`A ∪ (B ∪ C) = (A ∪ B) ∪ C,  A ∩ (B ∩ C) = (A ∩ B) ∩ C`, `Associative`],
          [`A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C),  A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)`, `Distributive`],
          [`(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ,  (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ`, `De Morgan`],
          [`A ∪ (A ∩ B) = A,  A ∩ (A ∪ B) = A`, `Absorption`],
          [`A ∪ Aᶜ = U,  A ∩ Aᶜ = ∅`, `Complement`]
        ]},
        { h: `Set operations mirror logic`, table: [
          [`Sets`, `Logic (L3–L5)`],
          [`∪ (union)`, `∨ (or)`],
          [`∩ (intersection)`, `∧ (and)`],
          [`Aᶜ (complement)`, `¬p (not)`],
          [`U`, `T (tautology)`],
          [`∅`, `F (contradiction)`],
          [`(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ`, `¬(p ∧ q) ≡ ¬p ∨ ¬q`]
        ]},
        { h: `Exam-style method: computing Aᶜ ∩ B etc.`, formula: [
          `Step 1: write Aᶜ = U − A (and Bᶜ = U − B) explicitly.`,
          `Step 2: intersect / unite element by element.`,
          `Shortcut: Aᶜ ∩ B = B − A;  Aᶜ ∩ Bᶜ = (A ∪ B)ᶜ;  Aᶜ ∪ Bᶜ = (A ∩ B)ᶜ.`,
          `Example (Exam 2023/24): U = {1..10}, A = {1,2,4,5}, B = {1,3,7,8,9}`,
          `Aᶜ = {3,6,7,8,9,10} → Aᶜ ∩ B = {3,7,8,9}`,
          `A ∪ B = {1,2,3,4,5,7,8,9} → Aᶜ ∩ Bᶜ = {6,10}`,
          `Bᶜ = {2,4,5,6,10} → A ∪ Bᶜ = {1,2,4,5,6,10}`
        ]}
      ],
      cards: [
        [`A ∪ B`, `{x | x ∈ A or x ∈ B}: elements in A, in B, or in both.`],
        [`A ∩ B`, `{x | x ∈ A and x ∈ B}: only the common elements.`],
        [`A′ (Aᶜ)`, `{x : x ∈ U but x ∉ A} = U − A.`],
        [`B − A`, `Elements in B but not in A.`],
        [`A × B`, `All ordered pairs (a, b) with a ∈ A, b ∈ B; |A × B| = |A|·|B|.`],
        [`Mathematical meaning of "OR"`, `All elements in A or in B or in both.`],
        [`Mathematical meaning of "AND"`, `Elements in both A and B at the same time.`],
        [`Identity laws (sets)`, `A ∪ ∅ = A, A ∩ U = A`],
        [`Domination laws (sets)`, `A ∪ U = U, A ∩ ∅ = ∅`],
        [`Idempotent laws (sets)`, `A ∪ A = A, A ∩ A = A`],
        [`De Morgan (sets)`, `(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ, (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ`],
        [`Absorption (sets)`, `A ∪ (A ∩ B) = A, A ∩ (A ∪ B) = A`],
        [`Complement laws`, `A ∪ Aᶜ = U, A ∩ Aᶜ = ∅`],
        [`Distributive (sets)`, `A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C); A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)`],
        [`If A ⊆ B then A ∩ B = ? and A ∪ B = ?`, `A ∩ B = A and A ∪ B = B.`]
      ],
      qa: [
        [`Define union, intersection, complement and difference of sets, giving set-builder notation for each.`, `A ∪ B = {x | x ∈ A or x ∈ B}; A ∩ B = {x | x ∈ A and x ∈ B}; A′ = {x : x ∈ U but x ∉ A}; B − A = {x | x ∈ B and x ∉ A}. Venn diagrams: union shades both circles, intersection shades the overlap, complement shades U outside A, B − A shades the part of B outside A.`],
        [`Let U = {1,…,10}, A = {1,2,3}, B = {3,4,6}, C = {1,4,7}. Find A ∩ B, A ∪ B, A − B, A − C, (A ∩ B)ᶜ, (A ∪ B)ᶜ, Aᶜ ∩ Bᶜ, Aᶜ ∪ Bᶜ.`, `A ∩ B = {3}; A ∪ B = {1,2,3,4,6}; A − B = {1,2}; A − C = {2,3}; (A ∩ B)ᶜ = {1,2,4,5,6,7,8,9,10}; (A ∪ B)ᶜ = {5,7,8,9,10}; Aᶜ ∩ Bᶜ = {5,7,8,9,10}; Aᶜ ∪ Bᶜ = {1,2,4,5,6,7,8,9,10}. The last two confirm De Morgan's laws.`],
        [`List the set identities with their names.`, `Identity: A ∪ ∅ = A, A ∩ U = A. Domination: A ∪ U = U, A ∩ ∅ = ∅. Idempotent: A ∪ A = A, A ∩ A = A. Complementation: (Aᶜ)ᶜ = A. Commutative: A ∪ B = B ∪ A, A ∩ B = B ∩ A. Associative: A ∪ (B ∪ C) = (A ∪ B) ∪ C and similarly for ∩. Distributive: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C), A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C). De Morgan: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ, (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ. Absorption: A ∪ (A ∩ B) = A, A ∩ (A ∪ B) = A. Complement: A ∪ Aᶜ = U, A ∩ Aᶜ = ∅.`],
        [`Let S = {1, 0} and T = {0, 1, 2}. Find the relation between S and T and compute S ∩ T, S ∪ T, T − S.`, `Every element of S is in T, so S ⊂ T. Hence S ∩ T = S = {0, 1}, S ∪ T = T = {0, 1, 2}, T − S = {2}.`],
        [`Write B − A in set-builder notation and describe its Venn diagram.`, `B − A = {x | x ∈ B and x ∉ A}. In the Venn diagram, shade the part of circle B that does not overlap circle A.`]
      ],
      quiz: [
        { q: `The universal set U = {1,2,3,4,5}, A = {1,2}. A′ =`, o: [[`{3, 4, 5}`, `Correct. A′ = {x : x ∈ U but x ∉ A} = U − A. Removing 1 and 2 from {1, 2, 3, 4, 5} leaves {3, 4, 5} (L2, Complement).`], [`{3, 5}`, `4 is also in U and not in A, so it belongs to A′ too. Dropping it gives {3, 5}; the full complement is U − A = {3, 4, 5}.`], [`{1, 3}`, `1 ∈ A, so it cannot be in A′ (the complement holds only elements outside A); 4 is also missing. A′ = {3, 4, 5}.`], [`{1, 2}`, `{1, 2} is A itself. The complement is everything in U that is not in A: U − A = {3, 4, 5}.`]], a: 0, src: `Midterm 2025/26` },
        { q: `Which law states that (A ∪ B)′ = A′ ∩ B′?`, o: [[`Commutative Law`, `The commutative law only swaps the order: A ∪ B = B ∪ A and A ∩ B = B ∩ A. It has no complements in it.`], [`Associative Law`, `The associative law only regroups brackets of one operation: A ∪ (B ∪ C) = (A ∪ B) ∪ C. No complements are involved.`], [`De Morgan's Law`, `Correct. The complement of a union is the intersection of the complements.`], [`Distributive Law`, `The distributive law spreads one operation over the other: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C). It does not complement anything.`]], a: 2, src: `Midterm 2025/26` },
        { q: `If A = {2, 4, 6, 8} and B = {4, 8, 10, 12}, then A ∩ B =`, o: [[`{2, 6}`, `{2, 6} are the elements of A that are not in B, i.e. A − B. The intersection keeps the common elements, {4, 8}.`], [`{4, 8}`, `Correct. A ∩ B = {x | x ∈ A and x ∈ B}: the only elements in both sets are 4 and 8, so A ∩ B = {4, 8} (L2, Intersection).`], [`{2, 4, 6, 8, 10, 12}`, `{2, 4, 6, 8, 10, 12} contains everything in either set, which is A ∪ B. The intersection keeps only the common elements {4, 8}.`], [`∅`, `∅ would mean the sets are disjoint, but 4 and 8 are in both. So A ∩ B = {4, 8}.`]], a: 1, src: `Midterm 2025/26` },
        { q: `If U = {1, 2, 3, 4, 5, 6} and A = {2, 4, 6}, then A′ =`, o: [[`{1, 2, 3}`, `2 is in A, so it cannot be in A′, and 5 (outside A) is missing. A′ = U − A = {1, 3, 5}.`], [`{1, 3, 5}`, `Correct. A′ = U − A: remove 2, 4, 6 from {1, …, 6} to get {1, 3, 5} (L2, Complement).`], [`{1, 2, 3, 4, 5, 6}`, `{1, …, 6} is U itself. The complement must exclude the elements of A (2, 4, 6), leaving {1, 3, 5}.`], [`∅`, `A′ is empty only when A = U. Here 1, 3 and 5 are in U but not in A, so A′ = {1, 3, 5}.`]], a: 1, src: `Midterm 2025/26` },
        { q: `Here we use the (De Morgan's) law (A ∧ B)ᶜ is (∧ written for ∩):`, o: [[`Aᶜ ∧ Bᶜ`, `Aᶜ ∩ Bᶜ is the complement of a union, (A ∪ B)ᶜ, the other De Morgan law. Complementing an intersection flips ∩ to ∪.`], [`A ∨ B`, `A ∨ B (A ∪ B) has no complements at all. De Morgan complements each set and flips the operation: Aᶜ ∪ Bᶜ.`], [`Aᶜ ∨ Bᶜ`, `Correct. De Morgan: the complement of an intersection is the union of the complements, (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ, written here as Aᶜ ∨ Bᶜ (L2, Set identities).`], [`A ∩ B`, `A ∩ B is the original set before complementing; its complement is a different set, Aᶜ ∪ Bᶜ by De Morgan.`]], a: 2, src: `Exam 2023/24` },
        { q: `Let A and B be sets such that |A| = 4 and |B| = 3. Which of the following is always true?`, o: [[`|A ∩ B| = 0`, `|A ∩ B| = 0 holds only if A and B are disjoint. They may share up to 3 elements, so this is not always true.`], [`|A × B| = 12`, `Correct. A × B is all ordered pairs (a, b), and each of the 4 choices of a pairs with each of 3 choices of b: |A × B| = |A|·|B| = 4 × 3 = 12 (L2, Cartesian product).`], [`|A − B| = 1`, `|A − B| depends on how much A and B overlap: it is 4 if they are disjoint and 1 if all of B lies in A. So it is not always 1.`]], a: 1, src: `Exam 2020/21, 2021/22` },
        { q: `Lecture Ex 1: U = {1,…,10}, A = {1,2,3}, B = {3,4,6}. (A ∪ B)ᶜ =`, o: [[`{1, 2, 4, 5, 6, 7, 8, 9, 10}`, `{1, 2, 4, 5, 6, 7, 8, 9, 10} = U − {3} is (A ∩ B)ᶜ. The union A ∪ B = {1, 2, 3, 4, 6} must be removed, not just 3.`], [`{1, 2}`, `{1, 2} is A − B (elements of A not in B). (A ∪ B)ᶜ is everything in U outside both A and B.`], [`{5, 7, 8, 9, 10}`, `Correct. A ∪ B = {1, 2, 3, 4, 6}, so (A ∪ B)ᶜ = U − {1, 2, 3, 4, 6} = {5, 7, 8, 9, 10} (L2, Ex 1 part u).`], [`{3}`, `{3} is A ∩ B, the common element, not a complement. (A ∪ B)ᶜ = U − {1, 2, 3, 4, 6} = {5, 7, 8, 9, 10}.`]], a: 2, src: `Lecture 2 example` },
        { q: `Lecture Ex 1: with A = {1,2,3}, C = {1,4,7}, A − C =`, o: [[`{1}`, `{1} is A ∩ C, the element A and C share. A − C removes exactly that element, so 1 is the one thing not in A − C.`], [`{4, 7}`, `{4, 7} are the elements of C not in A, which is C − A. Difference is not symmetric: A − C keeps elements of A.`], [`{1, 2, 3, 4, 7}`, `{1, 2, 3, 4, 7} is A ∪ C, all elements of either set. A − C keeps only elements of A that are not in C.`], [`{2, 3}`, `Correct. A − C = {x | x ∈ A and x ∉ C}: from {1, 2, 3} remove 1 (which is in C), leaving {2, 3} (L2, Ex 1 part d).`]], a: 3, src: `Lecture 2 example` },
        { q: `S = {1, 0}, T = {0, 1, 2}. T − S =`, o: [[`{2}`, `Correct. T − S keeps the elements of T that are not in S: 0 and 1 are in S, so only 2 remains, T − S = {2} (L2, More examples).`], [`{0, 1, 2}`, `{0, 1, 2} is S ∪ T, which equals T because S ⊂ T. T − S must remove the elements of S, leaving {2}.`], [`∅`, `∅ is S − T: every element of S is also in T. The question asks the other way, T − S = {2}.`], [`{0, 1}`, `{0, 1} is S ∩ T (= S, since S ⊂ T). These are exactly the elements removed in T − S, which leaves {2}.`]], a: 0, src: `Lecture 2 example` },
        { q: `A ∪ (A ∩ B) = A is the:`, o: [[`Domination law`, `Domination says A ∪ U = U and A ∩ ∅ = ∅: combining with U or ∅ swallows the result. A ∪ (A ∩ B) = A is absorption.`], [`Absorption law`, `Correct. Absorption: A ∪ (A ∩ B) = A and A ∩ (A ∪ B) = A. A ∩ B already lies inside A, so uniting it with A adds nothing (L2, Set identities).`], [`Idempotent law`, `Idempotent says A ∪ A = A and A ∩ A = A, with only one set. Here a second set B appears, so it is absorption.`], [`Distributive law`, `The distributive law spreads an operation over brackets, A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C), and needs three sets. Here A just absorbs A ∩ B.`]], a: 1, src: `Lecture 2 example` },
        { q: `A ∩ ∅ = ∅ is the:`, o: [[`Complement law`, `The complement law is A ∩ Aᶜ = ∅ and A ∪ Aᶜ = U; it involves Aᶜ. A ∩ ∅ = ∅ uses the empty set, so it is domination.`], [`Identity law`, `The identity law is A ∩ U = A (and A ∪ ∅ = A): the result is A unchanged. Here the result is ∅, which is domination.`], [`Domination law`, `Correct. Domination laws: A ∪ U = U and A ∩ ∅ = ∅. Nothing is in ∅, so nothing can be in both A and ∅ (L2, Set identities).`], [`Idempotent law`, `Idempotent is A ∩ A = A (a set with itself). A ∩ ∅ = ∅ intersects with the empty set, which is domination.`]], a: 2, src: `Lecture 2 example` },
        { q: `The mathematical meaning of "OR" in A ∪ B is:`, o: [[`Elements in A or B but not both`, `That is the symmetric difference (exclusive or).`], [`Elements in both only`, `Elements in both sets is A ∩ B, the meaning of "AND". Union's "OR" also includes elements in only one set.`], [`Elements in neither`, `Elements in neither set form (A ∪ B)ᶜ, the region outside both circles. The union is the shaded inside of both circles.`], [`All elements in A or in B or in both`, `Correct. A ∪ B = {x | x ∈ A or x ∈ B}, and the lecture's "or" is inclusive: in A, in B, or in both (L2, Union).`]], a: 3, src: `Lecture 2 example` }
      ]
    },

    /* ───────────────────────── LECTURE 3 ───────────────────────── */
    {
      n: 3, title: `Propositions and Truth Tables`,
      notes: [
        { h: `Basic values and items of logic`, pts: [
          `<b>Basic values</b>: T or F, true or false. In a computer T and F may be represented by <b>1 or 0 bits</b>.`,
          `<b>Basic items</b>: propositions (logic and equivalences), truth tables, predicates, quantifiers, rules of inference, proofs.`
        ]},
        { h: `Propositions and negation`, pts: [
          `<b>Proposition</b>: a statement of a true or false fact (<b>but not both</b>).`,
          `"2 + 2 = 4" is a proposition (it is a fact). "x + 1 = 2" is <b>not</b> a proposition unless a specific value of x is stated.`,
          `<b>Negation</b> of p, written <b>¬p</b> (or ~p), pronounced "not p": "it is not the case that p". Its truth value is the <b>opposite</b> of p.`,
          `Examples: p: Today is Thursday → ¬p: Today is not Thursday. p: At least a foot of snow falls in Boulder on Fridays → ¬p: <b>Less than a foot</b> of snow falls in Boulder on Fridays.`,
          `Negating "at least a foot" gives "less than a foot", not "no snow", and the day stays Fridays.`
        ]},
        { h: `Connectives`, table: [
          [`Name`, `Symbol`, `True when`],
          [`Negation`, `¬p, ~p`, `p is false ("opposite truth values")`],
          [`Conjunction`, `p ∧ q (also p · q)`, `both p and q are true; otherwise false ("both are true")`],
          [`Disjunction`, `p ∨ q`, `either p or q (or both) is true; false only if both are false (inclusive or)`],
          [`Exclusive or`, `p ⊕ q`, `only one of p and q is true`],
          [`Implication (material implication)`, `p → q (also p ⊃ q)`, `in all cases except when the antecedent is true and the consequent is false`],
          [`Biconditional (material equivalence)`, `p ↔ q (also p ≡ q)`, `p and q have equal ("equivalent") truth values: both true or both false`]
        ]},
        { h: `Truth tables of the connectives`, table: [
          [`p`, `q`, `¬p`, `p ∧ q`, `p ∨ q`, `p ⊕ q`, `p → q`, `p ↔ q`],
          [`T`, `T`, `F`, `T`, `T`, `F`, `T`, `T`],
          [`T`, `F`, `F`, `F`, `T`, `T`, `F`, `F`],
          [`F`, `T`, `T`, `F`, `T`, `T`, `T`, `F`],
          [`F`, `F`, `T`, `F`, `F`, `F`, `T`, `T`]
        ]},
        { h: `Vocabulary`, pts: [
          `<b>Truth function</b>: the truth value of any compound proposition is determined solely by the truth values of its components.`,
          `<b>Statement variable</b>: a variable that represents a proposition; by convention lower-case letters p, q, r, s.`,
          `<b>Truth table</b>: a calculation matrix used to demonstrate all logically possible truth values of a given proposition.`,
          `A truth table with n variables has <b>2ⁿ rows</b>: 1 variable → 2 rows, 2 → 4, 3 → 8 (Midterm 2025/26 Q21).`,
          `In p → q, p is the <b>hypothesis / antecedent</b> and q the <b>conclusion / consequent</b>.`,
          `<b>Tautology</b> (logically true): every case is true, e.g. p ∨ ¬p.`
        ]},
        { h: `Example: truth table of ¬P ∧ (P → Q)`, table: [
          [`P`, `Q`, `¬P`, `P → Q`, `¬P ∧ (P → Q)`],
          [`T`, `T`, `F`, `T`, `F`],
          [`T`, `F`, `F`, `F`, `F`],
          [`F`, `T`, `T`, `T`, `T`],
          [`F`, `F`, `T`, `T`, `T`]
        ]},
        { h: `Example: (P → Q) ∨ (Q → P) is a tautology`, table: [
          [`P`, `Q`, `P → Q`, `Q → P`, `(P → Q) ∨ (Q → P)`],
          [`T`, `T`, `T`, `T`, `T`],
          [`T`, `F`, `F`, `T`, `T`],
          [`F`, `T`, `T`, `F`, `T`],
          [`F`, `F`, `T`, `T`, `T`]
        ]},
        { h: `Example: truth table for (P → Q) ∧ (Q → R)`, table: [
          [`P`, `Q`, `R`, `P → Q`, `Q → R`, `(P → Q) ∧ (Q → R)`],
          [`T`, `T`, `T`, `T`, `T`, `T`],
          [`T`, `T`, `F`, `T`, `F`, `F`],
          [`T`, `F`, `T`, `F`, `T`, `F`],
          [`T`, `F`, `F`, `F`, `T`, `F`],
          [`F`, `T`, `T`, `T`, `T`, `T`],
          [`F`, `T`, `F`, `T`, `F`, `F`],
          [`F`, `F`, `T`, `T`, `T`, `T`],
          [`F`, `F`, `F`, `T`, `T`, `T`]
        ]},
        { h: `Negating "all" statements (quantifiers)`, pts: [
          `The negation of "All animals can fly" is "<b>Some animals cannot fly</b>" (there exists at least one that cannot). It is not "All animals cannot fly".`,
          `In general ¬(∀x P(x)) ≡ ∃x ¬P(x) and ¬(∃x P(x)) ≡ ∀x ¬P(x).`
        ]}
      ],
      cards: [
        [`Proposition`, `A statement of a true or false fact (but not both).`],
        [`Is "x + 1 = 2" a proposition?`, `No, not unless a specific value of x is stated.`],
        [`Negation ¬p`, `"It is not the case that p"; opposite truth value.`],
        [`Conjunction p ∧ q`, `True only if both p and q are true.`],
        [`Disjunction p ∨ q`, `True if either p or q (or both) is true; false only when both are false.`],
        [`Exclusive or p ⊕ q`, `True if only one of p, q is true.`],
        [`p → q is false when…`, `p (antecedent) is true and q (consequent) is false. True in all other cases.`],
        [`p ↔ q`, `True when p and q have the same truth value (both T or both F).`],
        [`Truth function`, `Truth value of a compound proposition determined solely by the truth values of its components.`],
        [`Statement variable`, `A variable (p, q, r, s) representing a proposition.`],
        [`Truth table`, `A calculation matrix showing all logically possible truth values of a proposition.`],
        [`Rows in a truth table with n variables`, `2ⁿ (3 variables → 8 rows).`],
        [`Negation of "At least a foot of snow falls in Boulder on Fridays"`, `"Less than a foot of snow falls in Boulder on Fridays."`],
        [`Negation of "All animals can fly"`, `"Some animals cannot fly."`],
        [`Bits for T and F`, `1 and 0.`],
        [`Other symbols for → and ↔ in the slides`, `⊃ (material implication) and ≡ (material equivalence).`]
      ],
      qa: [
        [`Define a proposition. Which of the following are propositions: "2 + 2 = 4", "x + 1 = 2"?`, `A proposition is a statement of a true or false fact, but not both. "2 + 2 = 4" is a proposition (a fact, true). "x + 1 = 2" is not a proposition unless a specific value of x is given, because its truth depends on x.`],
        [`Define conjunction, disjunction and exclusive or, and give their truth tables.`, `p ∧ q is true if both p and q are true, otherwise false. p ∨ q is true if either p or q is true (inclusive), otherwise false. p ⊕ q is true if only one of p and q is true. Table (p, q → ∧, ∨, ⊕): TT → T, T, F; TF → F, T, T; FT → F, T, T; FF → F, F, F.`],
        [`Explain material implication and material equivalence with truth tables.`, `p → q is true in all cases except when the antecedent p is true and the consequent q is false: TT T, TF F, FT T, FF T. p ↔ q means p and q are equivalent: true if both are true or both are false: TT T, TF F, FT F, FF T.`],
        [`Construct a truth table for (P → Q) ∧ (Q → R).`, `Rows (P Q R : P→Q, Q→R, result): TTT: T T T; TTF: T F F; TFT: F T F; TFF: F T F; FTT: T T T; FTF: T F F; FFT: T T T; FFF: T T T. The result is true in rows 1, 5, 7, 8.`],
        [`Show by a truth table that (P → Q) ∨ (Q → P) is a tautology.`, `P Q : P→Q, Q→P, OR. TT: T, T, T. TF: F, T, T. FT: T, F, T. FF: T, T, T. The last column is all T, so the formula is a tautology. (Whenever one implication is false, the other is true.)`],
        [`Define truth function, statement variable and truth table.`, `Truth function: the truth value of a compound proposition is determined solely by the truth values of its components. Statement variable: a variable representing a proposition (p, q, r, s). Truth table: a calculation matrix showing all logically possible truth values of a proposition.`]
      ],
      quiz: [
        { q: `The conjunction of propositions p and q is denoted by:`, o: [[`p ∧ q`, `Correct. Conjunction means "and", written p ∧ q (also p · q): it is true only when both p and q are true (L3, Connectives).`], [`p ∨ q`, `p ∨ q is the disjunction ("or"), true when at least one part is true. Conjunction ("and") is p ∧ q.`], [`p − q`, `"−" is set difference or subtraction, not one of the lecture's logical connectives (¬, ∧, ∨, ⊕, →, ↔). Conjunction is p ∧ q.`], [`p | q`, `The bar | (in other texts the NAND or Sheffer stroke) is not one of the lecture's connectives. Conjunction is written p ∧ q.`]], a: 0, src: `Exam 2023/24, 2020/21, 2021/22` },
        { q: `The disjunction of propositions p and q is denoted by:`, o: [[`p ∨ q`, `Correct. Disjunction is the inclusive "or", written p ∨ q: true when p or q (or both) is true, false only when both are false (L3, Connectives).`], [`p ∧ q`, `p ∧ q is the conjunction ("and"), true only when both are true. Disjunction ("or") is p ∨ q.`], [`p − q`, `"−" is not a logical connective in the lecture (it is set difference). The disjunction of p and q is p ∨ q.`], [`p / q`, `"/" is division, not a logical connective. The lecture writes disjunction (inclusive or) as p ∨ q.`]], a: 0, src: `Exam 2025/26, 2024/25, 2020/21, 2021/22` },
        { q: `The exclusive or of propositions p and q is denoted by:`, o: [[`p ∨ q`, `p ∨ q is the inclusive or, which is also true when both are true. Exclusive or has its own symbol, p ⊕ q.`], [`p ∧ q`, `p ∧ q is conjunction ("and"), true only when both are true; in that row p ⊕ q is false, so they are different connectives. Exclusive or has its own symbol, p ⊕ q.`], [`p ⊕ q`, `Correct. Exclusive or is written p ⊕ q and is true when only one of p and q is true (false when both are T or both are F) (L3, Connectives).`], [`p → q`, `p → q is the implication (conditional), false only for T → F. Exclusive or is written p ⊕ q.`]], a: 2, src: `Exam 2024/25, 2023/24, 2020/21, 2021/22` },
        { q: `If P = True, Q = False, then P ∧ Q =`, o: [[`True`, `Conjunction is true only when both parts are true. Q is false, so P ∧ Q = T ∧ F = F.`], [`False`, `Correct. P ∧ Q is true only when both are true; with Q false, T ∧ F = F (L3, Truth tables of the connectives).`], [`Undefined`, `Every combination of truth values gives a defined result in the truth table. The row P = T, Q = F gives P ∧ Q = F.`], [`Both`, `A proposition is true or false but not both, and so is every compound of propositions. Here T ∧ F = F.`]], a: 1, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `If P = True, Q = False, then P ∨ Q =`, o: [[`True`, `Correct. Disjunction is false only when both parts are false; here P is true, so T ∨ F = T (L3, Truth tables of the connectives).`], [`False`, `P ∨ Q is false only when both P and Q are false. P is true here, so T ∨ F = T.`], [`Both`, `A proposition is true or false but not both. The truth table row T, F gives P ∨ Q = T.`], [`None`, `Every row of a truth table has a value; the row P = T, Q = F gives P ∨ Q = T.`]], a: 0, src: `Midterm 2025/26` },
        { q: `If P = True, Q = False, then P → Q =`, o: [[`True`, `An implication is true in all cases except a true antecedent with a false consequent, and T → F is exactly that case. So P → Q = F.`], [`False`, `Correct. P → Q is false only when the antecedent is true and the consequent is false, which is this row: T → F = F (L3, Connectives).`], [`Both`, `A compound proposition is true or false, never both. Here T → F gives exactly one value, F.`], [`Undefined`, `The implication has a value in every row of its truth table. For P = T, Q = F it is F.`]], a: 1, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `If P = False, Q = True, then P → Q =`, o: [[`True`, `Correct. A false antecedent makes the implication true.`], [`False`, `Implication is false only for T → F. Here the antecedent P is false, so F → T = T.`], [`Both`, `A proposition is true or false, never both. The row P = F, Q = T gives P → Q = T.`], [`None`, `Every row of the truth table has a value. With a false antecedent, P → Q = T.`]], a: 0, src: `Midterm 2025/26` },
        { q: `How many rows are there in the truth table for 3 propositions (P, Q, R)?`, o: [[`4`, `4 = 2² is the row count for 2 variables. With 3 variables there are 2³ = 8 rows.`], [`6`, `6 = 2 × 3 multiplies instead of using a power. Each variable doubles the rows: 2³ = 8.`], [`8`, `Correct. A truth table with n variables has 2ⁿ rows, since each variable is T or F: 2³ = 8 rows (L3, Vocabulary).`], [`12`, `12 is not a power of 2, so it cannot be a truth-table row count. For 3 variables it is 2³ = 8.`]], a: 2, src: `Midterm 2025/26` },
        { q: `The negation of the statement "At least a foot of snow falls in Boulder on Fridays" is:`, o: [[`Less than a foot of snow falls in Boulder on Fridays`, `Correct. The lecture's example: "at least" becomes "less than", Fridays stays.`], [`A foot of snow falls in Boulder in the morning`, `This changes "on Fridays" to "in the morning" and keeps "a foot of snow"; it is a different statement, not "it is not the case that p".`], [`A foot of snow falls in Boulder on Sunday`, `This only moves the day to Sunday; both statements could be true at once, so it is not a negation. Negate the amount: "less than a foot".`], [`Less than a foot of snow falls in Boulder in the morning`, `It negates the amount correctly but replaces "on Fridays" with "in the morning". The negation keeps the day: less than a foot on Fridays.`]], a: 0, src: `Exam 2023/24`, },
        { q: `The statement (p → q) ∨ (q → p) is a:`, o: [[`tautology`, `Correct. P → Q and Q → P are never both false (the only F row of each is different), so the disjunction is T in all four rows: a tautology (L3, Example).`], [`contradiction`, `A contradiction is false in every row, but this formula is true in every row: when P → Q is F (row T, F), Q → P is T.`], [`both`, `A tautology is true in every row and a contradiction is false in every row; no formula can be both. This one is all T.`], [`equivalent`, `"Equivalent" describes a relation between two statements with equal truth tables, not a type of single statement.`]], a: 0, src: `Exam 2023/24` },
        { q: `The negation of the statement "All animals can fly" is:`, o: [[`All animals cannot fly`, `Too strong; the negation only needs one counter-example.`], [`Some animals can fly`, `"Some animals can fly" is implied by the original (if all can fly, some can), so it does not deny it. Negate ∀ with ∃ and negate the predicate.`], [`Some animals cannot fly`, `Correct. ¬(∀x P(x)) ≡ ∃x ¬P(x): to deny that all animals fly you need just one that cannot, so "Some animals cannot fly" (L3, Negating "all" statements).`], [`There exists an animal that can fly`, `Consistent with the original, so not its negation.`]], a: 2, src: `Exam 2020/21` },
        { q: `Which of the following is a proposition?`, o: [[`2 + 2 = 4`, `Correct. A proposition is a statement of a true or false fact, but not both; "2 + 2 = 4" is a fact with value T (L3, Propositions).`], [`Read the book.`, `"Read the book." is a command; it cannot be true or false, so it is not a proposition.`], [`Is today Thursday?`, `A question asks rather than states, so it has no truth value and is not a proposition.`], [`x + 1 = 2`, `"x + 1 = 2" is true for x = 1 and false otherwise; the lecture says it is not a proposition unless a value of x is stated.`]], a: 0, src: `Lecture 3 example` },
        { q: `p ⊕ q is true when:`, o: [[`Both p and q are true`, `When both are true, p ⊕ q is F (row TT). Exclusive or rules out "both"; that is what separates it from ∨.`], [`Only one of p and q is true`, `Correct. Exclusive or is true when only one of p and q is true (rows TF and FT) and false when they have the same value (L3, Connectives).`], [`Always`, `p ⊕ q is false in two rows, TT and FF, so it is not a tautology.`], [`Both are false`, `With both false, no part is true, so p ⊕ q = F (row FF). It needs exactly one part true.`]], a: 1, src: `Lecture 3 example` },
        { q: `In the truth table of ¬P ∧ (P → Q), the expression is true exactly when:`, o: [[`P is true`, `When P is true, ¬P is false, and a conjunction with a false part is false (rows TT and TF both give F).`], [`Q is true`, `Q being true is not enough: in row P = T, Q = T, ¬P = F so the whole expression is F. Only the value of P matters.`], [`P is false`, `Correct. If P = F then ¬P = T and P → Q = T (false antecedent), so the conjunction is T; if P = T then ¬P = F (L3, Example ¬P ∧ (P → Q)).`], [`P and Q are both true`, `In row TT, ¬P = F, so ¬P ∧ (P → Q) = F even though P → Q = T.`]], a: 2, src: `Lecture 3 example` },
        { q: `Material implication p ⊃ q is false:`, o: [[`Never`, `Material implication is false in one row: true antecedent, false consequent (T ⊃ F = F). So it is not always true.`], [`When the antecedent is false`, `A false antecedent makes the implication true whatever the consequent is (rows FT and FF are both T).`], [`When both are false`, `With both false the antecedent is false, so F ⊃ F = T. The only false row is T ⊃ F.`], [`Only when the antecedent is true and the consequent is false`, `Correct. p ⊃ q (p → q) is true in all cases except when the antecedent p is true and the consequent q is false (L3, Connectives).`]], a: 3, src: `Lecture 3 example` },
        { q: `For (P → Q) ∧ (Q → R), which row (P, Q, R) is TRUE?`, o: [[`F, F, T`, `Correct. Both implications have a false antecedent or true consequent.`], [`T, T, F`, `With Q = T and R = F, Q → R = T → F = F, so the conjunction is F even though P → Q = T.`], [`F, T, F`, `Q = T and R = F make Q → R = F, so (P → Q) ∧ (Q → R) is F.`], [`T, F, T`, `P = T and Q = F make P → Q = T → F = F, so the conjunction is F even though Q → R = T.`]], a: 0, src: `Lecture 3 example` }
      ]
    },

    /* ───────────────────────── LECTURE 4 ───────────────────────── */
    {
      n: 4, title: `Tautologies, Contradictions and Logical Equivalences`,
      notes: [
        { h: `Definitions`, pts: [
          `A <b>tautology</b> is a statement form that is <b>always true</b> regardless of the truth values of the individual statements substituted for its statement variables. A statement whose form is a tautology is a <b>tautological statement</b>.`,
          `A <b>contradiction</b> is a statement form that is <b>always false</b> regardless of the truth values of the individual statements substituted for its statement variables. A statement whose form is a contradiction is a <b>contradictory statement</b>.`,
          `Example 1.1.13: p ∨ ~p is a tautology (all T's); p ∧ ~p is a contradiction (all F's).`,
          `Compound propositions with the same truth values in all possible cases are <b>logically equivalent</b>: p ≡ q means p ↔ q is a tautology.`,
          `<b>Remark</b>: ≡ is not a logical connective and p ≡ q is not a compound proposition; it is the statement that p ↔ q is a tautology. The symbol ⇔ is sometimes used instead of ≡.`,
          `Two statements are equivalent <b>if and only if</b> the columns of their truth tables agree.`
        ]},
        { h: `Example 1.1.13 and 1.1.14 (t = tautology, c = contradiction)`, table: [
          [`p`, `~p`, `p ∨ ~p`, `p ∧ ~p`, `t`, `p ∧ t`, `c`, `p ∧ c`],
          [`T`, `F`, `T`, `F`, `T`, `T`, `F`, `F`],
          [`F`, `T`, `T`, `F`, `T`, `F`, `F`, `F`],
          [`Result`, ``, `all T: tautology`, `all F: contradiction`, ``, `same as p: p ∧ t ≡ p`, ``, `same as c: p ∧ c ≡ c`]
        ]},
        { h: `Theorem 1.1.1 Logical Equivalences (t = tautology, c = contradiction)`, table: [
          [`#`, `Law`, `Form 1`, `Form 2`],
          [`1`, `Commutative`, `p ∧ q ≡ q ∧ p`, `p ∨ q ≡ q ∨ p`],
          [`2`, `Associative`, `(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)`, `(p ∨ q) ∨ r ≡ p ∨ (q ∨ r)`],
          [`3`, `Distributive`, `p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)`, `p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)`],
          [`4`, `Identity`, `p ∧ t ≡ p`, `p ∨ c ≡ p`],
          [`5`, `Negation`, `p ∨ ~p ≡ t`, `p ∧ ~p ≡ c`],
          [`6`, `Double negative`, `~(~p) ≡ p`, ``],
          [`7`, `Idempotent`, `p ∧ p ≡ p`, `p ∨ p ≡ p`],
          [`8`, `Universal bound (Domination)`, `p ∨ t ≡ t`, `p ∧ c ≡ c`],
          [`9`, `De Morgan's`, `~(p ∧ q) ≡ ~p ∨ ~q`, `~(p ∨ q) ≡ ~p ∧ ~q`],
          [`10`, `Absorption`, `p ∨ (p ∧ q) ≡ p`, `p ∧ (p ∨ q) ≡ p`],
          [`11`, `Negations of t and c`, `~t ≡ c`, `~c ≡ t`]
        ]},
        { h: `De Morgan's law by truth table (Table 3)`, table: [
          [`p`, `q`, `p ∨ q`, `¬(p ∨ q)`, `¬p`, `¬q`, `¬p ∧ ¬q`],
          [`T`, `T`, `T`, `F`, `F`, `F`, `F`],
          [`T`, `F`, `T`, `F`, `F`, `T`, `F`],
          [`F`, `T`, `T`, `F`, `T`, `F`, `F`],
          [`F`, `F`, `F`, `T`, `T`, `T`, `T`]
        ]},
        { h: `p → q ≡ ¬p ∨ q (Table 4)`, table: [
          [`p`, `q`, `¬p`, `¬p ∨ q`, `p → q`],
          [`T`, `T`, `F`, `T`, `T`],
          [`T`, `F`, `F`, `F`, `F`],
          [`F`, `T`, `T`, `T`, `T`],
          [`F`, `F`, `T`, `T`, `T`]
        ]},
        { h: `Verify ~(~p ∧ q) ∧ (p ∨ q) ≡ p using the laws`, formula: [
          `~(~p ∧ q) ∧ (p ∨ q) ≡ (~(~p) ∨ ~q) ∧ (p ∨ q)      by De Morgan's laws`,
          `≡ (p ∨ ~q) ∧ (p ∨ q)                              by the double negative law`,
          `≡ p ∨ (~q ∧ q)                                    by the distributive law`,
          `≡ p ∨ (q ∧ ~q)                                    by the commutative law for ∧`,
          `≡ p ∨ c                                           by the negation law`,
          `≡ p                                               by the identity law  ■`,
          `(Asked in Exam 2025/26 Q3b and Exam 2024/25 Q4b.)`
        ]},
        { h: `Using truth tables vs laws`, pts: [
          `The laws of Theorem 1.1.1 can <b>prove</b> that two statement forms are equivalent, by replacing parts with equivalent expressions until the right side is reached.`,
          `They <b>cannot</b> be used to prove that two forms are <b>not</b> equivalent; for that you exhibit a row of the truth table where they differ.`,
          `Skill in simplifying statement forms is useful in constructing <b>logically efficient computer programs</b> and in <b>designing digital logic circuits</b>.`,
          `A table example: p ∨ ~q → ~p. Hypothesis p ∨ ~q, conclusion ~p. Rows TT: T → F = F; TF: T → F = F; FT: F → T = T; FF: T → T = T.`
        ]},
        { h: `Division into cases: p ∨ q → r ≡ (p → r) ∧ (q → r) (Example 1.2.2)`, table: [
          [`p`, `q`, `r`, `p ∨ q`, `p → r`, `q → r`, `p ∨ q → r`, `(p → r) ∧ (q → r)`],
          [`T`, `T`, `T`, `T`, `T`, `T`, `T`, `T`],
          [`T`, `T`, `F`, `T`, `F`, `F`, `F`, `F`],
          [`T`, `F`, `T`, `T`, `T`, `T`, `T`, `T`],
          [`T`, `F`, `F`, `T`, `F`, `T`, `F`, `F`],
          [`F`, `T`, `T`, `T`, `T`, `T`, `T`, `T`],
          [`F`, `T`, `F`, `T`, `T`, `F`, `F`, `F`],
          [`F`, `F`, `T`, `F`, `T`, `T`, `T`, `T`],
          [`F`, `F`, `F`, `F`, `T`, `T`, `T`, `T`]
        ]}
      ],
      cards: [
        [`Tautology`, `Statement form always true regardless of the truth values substituted for its variables.`],
        [`Contradiction`, `Statement form always false regardless of the truth values substituted for its variables.`],
        [`Logically equivalent`, `Same truth values in all possible cases; p ≡ q means p ↔ q is a tautology.`],
        [`Is ≡ a connective?`, `No. p ≡ q is not a compound proposition; it states that p ↔ q is a tautology (⇔ is sometimes used).`],
        [`Identity laws`, `p ∧ t ≡ p, p ∨ c ≡ p (p ∧ T ≡ p, p ∨ F ≡ p)`],
        [`Negation laws`, `p ∨ ~p ≡ t, p ∧ ~p ≡ c`],
        [`Double negative law`, `~(~p) ≡ p`],
        [`Idempotent laws`, `p ∧ p ≡ p, p ∨ p ≡ p`],
        [`Universal bound (domination) laws`, `p ∨ t ≡ t, p ∧ c ≡ c`],
        [`De Morgan's laws`, `~(p ∧ q) ≡ ~p ∨ ~q; ~(p ∨ q) ≡ ~p ∧ ~q`],
        [`Absorption laws`, `p ∨ (p ∧ q) ≡ p; p ∧ (p ∨ q) ≡ p`],
        [`Distributive laws`, `p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r); p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)`],
        [`Negations of t and c`, `~t ≡ c, ~c ≡ t`],
        [`Can the laws prove two forms are NOT equivalent?`, `No; show a truth-table row where they differ.`],
        [`Uses of simplifying statement forms`, `Logically efficient computer programs and digital logic circuit design.`],
        [`Generalised De Morgan`, `¬(p₁ ∨ … ∨ pₙ) ≡ ¬p₁ ∧ … ∧ ¬pₙ; ¬(p₁ ∧ … ∧ pₙ) ≡ ¬p₁ ∨ … ∨ ¬pₙ`]
      ],
      qa: [
        [`Define tautology and contradiction. Show that p ∨ ~p is a tautology and p ∧ ~p is a contradiction.`, `A tautology is a statement form that is always true regardless of the truth values of the statements substituted for its variables; a contradiction is always false. Table: p = T: ~p = F, p ∨ ~p = T, p ∧ ~p = F. p = F: ~p = T, p ∨ ~p = T, p ∧ ~p = F. The p ∨ ~p column is all T (tautology); the p ∧ ~p column is all F (contradiction).`],
        [`If t is a tautology and c a contradiction, show that p ∧ t ≡ p and p ∧ c ≡ c.`, `Rows: p = T, t = T: p ∧ t = T, c = F: p ∧ c = F. p = F, t = T: p ∧ t = F; p ∧ c = F. The p ∧ t column (T, F) equals the p column, so p ∧ t ≡ p. The p ∧ c column (F, F) equals c, so p ∧ c ≡ c.`],
        [`State Theorem 1.1.1 (eleven logical equivalences).`, `1 Commutative: p ∧ q ≡ q ∧ p, p ∨ q ≡ q ∨ p. 2 Associative: (p ∧ q) ∧ r ≡ p ∧ (q ∧ r), (p ∨ q) ∨ r ≡ p ∨ (q ∨ r). 3 Distributive: p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r), p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r). 4 Identity: p ∧ t ≡ p, p ∨ c ≡ p. 5 Negation: p ∨ ~p ≡ t, p ∧ ~p ≡ c. 6 Double negative: ~(~p) ≡ p. 7 Idempotent: p ∧ p ≡ p, p ∨ p ≡ p. 8 Universal bound: p ∨ t ≡ t, p ∧ c ≡ c. 9 De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q, ~(p ∨ q) ≡ ~p ∧ ~q. 10 Absorption: p ∨ (p ∧ q) ≡ p, p ∧ (p ∨ q) ≡ p. 11 Negations of t and c: ~t ≡ c, ~c ≡ t.`],
        [`Verify ~(~p ∧ q) ∧ (p ∨ q) ≡ p using the laws.`, `~(~p ∧ q) ∧ (p ∨ q) ≡ (~(~p) ∨ ~q) ∧ (p ∨ q) [De Morgan] ≡ (p ∨ ~q) ∧ (p ∨ q) [double negative] ≡ p ∨ (~q ∧ q) [distributive] ≡ p ∨ (q ∧ ~q) [commutative] ≡ p ∨ c [negation] ≡ p [identity].`],
        [`Show by a truth table that ¬(p ∨ q) ≡ ¬p ∧ ¬q.`, `p q | p ∨ q | ¬(p ∨ q) | ¬p | ¬q | ¬p ∧ ¬q: TT: T F F F F; TF: T F F T F; FT: T F T F F; FF: F T T T T. The ¬(p ∨ q) and ¬p ∧ ¬q columns agree (F, F, F, T), so they are logically equivalent (De Morgan's law).`],
        [`Show by truth table that p ∨ q → r ≡ (p → r) ∧ (q → r).`, `See the 8-row table in the notes: p ∨ q → r is F exactly in rows TTF, TFF, FTF (hypothesis true, r false), and (p → r) ∧ (q → r) is F in exactly the same rows. All other rows are T in both, so the forms are logically equivalent ("division into cases").`]
      ],
      quiz: [
        { q: `A compound proposition that is always false is a:`, o: [[`tautology`, `A tautology is the opposite: always true whatever values its variables take (e.g. p ∨ ¬p). Always false is a contradiction.`], [`contradiction`, `Correct. A contradiction is a statement form that is always false regardless of the truth values substituted, e.g. p ∧ ¬p (L4, Definitions).`], [`both`, `A tautology is all T and a contradiction is all F; one truth table column cannot be both. Always false means contradiction only.`], [`True`, `"True" is a truth value, not a type of compound proposition, and the question describes always false. That is a contradiction.`]], a: 1, src: `Exam 2025/26, 2024/25, 2023/24, 2020/21, 2021/22` },
        { q: `A compound proposition that is always true is a:`, o: [[`tautology`, `Correct. A tautology is a statement form that is always true regardless of the truth values substituted for its variables, e.g. p ∨ ¬p (L4, Definitions).`], [`contradiction`, `A contradiction is always false (e.g. p ∧ ¬p), the opposite of what is asked. Always true is a tautology.`], [`both`, `A column cannot be all T and all F at once, so a proposition cannot be both. Always true means tautology.`], [`Identity`, `"Identity" names a law (p ∧ t ≡ p), not a kind of compound proposition. Always true is a tautology.`]], a: 0, src: `Exam 2025/26, 2024/25, 2020/21, 2021/22` },
        { q: `Which of the following is a tautology?`, o: [[`p ∧ ¬p`, `p ∧ ¬p needs p and ¬p both true, which never happens, so it is always false: a contradiction (Theorem 1.1.1, negation law).`], [`p ∨ ¬p`, `Correct. Either p or ¬p is always true, so p ∨ ¬p is T in both rows; the negation law gives p ∨ ¬p ≡ t (L4, Example 1.1.13).`], [`¬p ∧ ¬Q`, `¬p ∧ ¬Q is true only when both p and Q are false; any true variable makes it F, so it is not always true.`], [`¬(p ∧ Q)`, `¬(p ∧ Q) is F in the row p = T, Q = T, so it is not a tautology. It equals ¬p ∨ ¬Q by De Morgan.`]], a: 1, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `Which of the following is a contradiction?`, o: [[`P ∨ Q`, `P ∨ Q is true in 3 of 4 rows (false only for F, F). A contradiction must be false in every row.`], [`P ∧ ¬P`, `Correct. P and ¬P always have opposite values, so they are never both true and P ∧ ¬P is F in every row; negation law P ∧ ¬P ≡ c (L4, Example 1.1.13).`], [`P → Q`, `P → Q is true in 3 of 4 rows (false only for T → F), so it is not always false.`], [`P ↔ Q`, `P ↔ Q is true in rows TT and FF (equal values), so it is not a contradiction.`]], a: 1, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `The statements P ∧ Q and Q ∧ P are:`, o: [[`Not equivalent`, `Their truth table columns agree in every row (both T only for TT), and agreeing columns means logically equivalent.`], [`Equivalent`, `Correct. The commutative law p ∧ q ≡ q ∧ p (Theorem 1.1.1, law 1): order does not change "and", so the columns agree in every row (L4).`], [`Sometimes equivalent`, `Equivalence means the columns agree in all rows; there is no "sometimes". Here they agree everywhere, so they are equivalent.`], [`Contradictory`, `Contradictory would mean opposite values, but P ∧ Q and Q ∧ P have the same value in every row.`]], a: 1, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `The expression ¬(P ∧ Q) is equivalent to:`, o: [[`¬P ∨ ¬Q`, `Correct. De Morgan's law: ¬(p ∧ q) ≡ ¬p ∨ ¬q. Negate each part and change ∧ to ∨ (Theorem 1.1.1, law 9) (L4).`], [`¬P ∧ ¬Q`, `¬P ∧ ¬Q is the other De Morgan law, ¬(P ∨ Q). For ¬(P ∧ Q) the ∧ must also flip to ∨.`], [`P ∧ Q`, `P ∧ Q is the original without the negation; it has the opposite value of ¬(P ∧ Q) in every row.`], [`P ∨ Q`, `P ∨ Q negates nothing. In row T, T it is T while ¬(P ∧ Q) is F, so they differ.`]], a: 0, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `The law ¬(P ∧ Q) = ¬P ∨ ¬Q is called:`, o: [[`Commutative Law`, `The commutative law only swaps order, p ∧ q ≡ q ∧ p, with no negation. Pushing ¬ into a bracket is De Morgan.`], [`De Morgan's Law`, `Correct. De Morgan's laws, ~(p ∧ q) ≡ ~p ∨ ~q and ~(p ∨ q) ≡ ~p ∧ ~q, move a negation inside and flip the connective (Theorem 1.1.1, law 9) (L4).`], [`Associative Law`, `The associative law regroups brackets of one connective, (p ∧ q) ∧ r ≡ p ∧ (q ∧ r). It never adds or moves a negation.`], [`Distributive Law`, `The distributive law spreads one connective over another, p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r). It does not move a negation.`]], a: 1, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `P ∨ (P ∧ Q) is equivalent to:`, o: [[`Q`, `Q ignores P: at P = T, Q = F the expression P ∨ (P ∧ Q) is T (because P is T) while Q is F.`], [`P`, `Correct. Absorption: p ∨ (p ∧ q) ≡ p (Theorem 1.1.1, law 10). If P is T the whole thing is T; if P is F then P ∧ Q is F too (L4).`], [`¬P`, `¬P has the opposite value of the expression in every row: when P = T the expression is T but ¬P is F.`], [`P ∧ Q`, `False when P = T, Q = F, but the expression is T there.`]], a: 1, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `If p and q are propositions, then p ∨ (p ∧ q) ≡`, o: [[`p`, `Correct. Absorption law p ∨ (p ∧ q) ≡ p (Theorem 1.1.1, law 10): p ∧ q can only be true when p already is, so it adds nothing (L4).`], [`q`, `q ignores p: with p = T and q = F the expression p ∨ (p ∧ q) is T but q is F.`], [`p ∨ q`, `In row p = F, q = T, p ∨ q is T but p ∨ (p ∧ q) = F ∨ F = F, so they are not equivalent.`]], a: 0, src: `Exam 2021/22` },
        { q: `The statement p ∧ F is always:`, o: [[`True`, `A conjunction with a false part is false, so p ∧ F can never be true. Universal bound law: p ∧ c ≡ c.`], [`False`, `Correct. The universal bound (domination) law p ∧ c ≡ c: a conjunction needs both parts true, and F never is (Theorem 1.1.1, law 8) (L4).`], [`Undefined`, `p ∧ F has a value in both rows of its truth table: F in each. Nothing is undefined.`], [`Both`, `A statement form is true or false in each row, never both; p ∧ F is F in every row.`]], a: 1, src: `Exam 2025/26` },
        { q: `The double negative law ¬(¬p) is equivalent to:`, o: [[`¬p`, `¬p is a single negation. Two negations cancel each other, so ¬(¬p) gives back p.`], [`p`, `Correct. Double negative law ~(~p) ≡ p (Theorem 1.1.1, law 6): negating twice flips the value twice, back to p's value (L4).`], [`p ∨ q`, `q does not appear in ¬(¬p), so it cannot be in the result. Double negation gives p.`], [`¬(¬p)`, `That is the expression itself, not its simplification.`]], a: 1, src: `Exam 2025/26` },
        { q: `P ∧ (Q ∨ R) is equivalent to:`, o: [[`(P ∧ Q) ∨ (P ∧ R)`, `Correct. Distributive law p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r): ∧ spreads over ∨ like multiplying out brackets (Theorem 1.1.1, law 3) (L4).`], [`(P ∨ Q) ∧ (P ∨ R)`, `(P ∨ Q) ∧ (P ∨ R) is the other distributive form, equal to P ∨ (Q ∧ R). Here ∧ is outside, so it must be distributed.`], [`(P ∧ Q) ∧ (P ∧ R)`, `(P ∧ Q) ∧ (P ∧ R) ≡ P ∧ Q ∧ R needs both Q and R true. P ∧ (Q ∨ R) needs only one, e.g. row T, T, F differs.`], [`(P ∨ Q) ∨ (P ∨ R)`, `(P ∨ Q) ∨ (P ∨ R) ≡ P ∨ Q ∨ R is true when P alone is false and Q true, but then P ∧ (Q ∨ R) is F.`]], a: 0, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `If p is a proposition, then p ∨ ¬p ≡`, o: [[`T`, `Correct. Negation law p ∨ ~p ≡ t: one of p, ¬p is always true, so the disjunction is a tautology (Theorem 1.1.1, law 5) (L4).`], [`F`, `F (contradiction) is the result of the other negation law, p ∧ ¬p ≡ c. With ∨ the result is T.`], [`(p ∨ ¬q)`, `q does not appear in p ∨ ¬p, and p ∨ ¬q is false when p = F, q = T, so it is not equivalent. The law gives T.`], [`q`, `q is not in the expression; p ∨ ¬p is always true while q can be false. The negation law gives T.`]], a: 0, src: `Exam 2024/25` },
        { q: `Here we use the equivalent (De Morgan's) logical law ¬(p ∨ q) is:`, o: [[`¬p ∧ ¬q`, `Correct. De Morgan: ~(p ∨ q) ≡ ~p ∧ ~q. "Not (p or q)" means neither is true (Theorem 1.1.1, law 9; Table 3) (L4).`], [`¬p ∨ ¬q`, `¬p ∨ ¬q is the other De Morgan law, ¬(p ∧ q). Negating an ∨ must turn it into ∧.`], [`p ∧ ¬q`, `p ∧ ¬q is the negation of p → q (L5). De Morgan on ¬(p ∨ q) negates both parts: ¬p ∧ ¬q.`], [`p → q`, `p → q ≡ ¬p ∨ q is true in 3 rows, while ¬(p ∨ q) is true only in row F, F. They are not equivalent.`]], a: 0, src: `Exam 2024/25, 2020/21, 2021/22` },
        { q: `Here we use the equivalent (De Morgan's) logical law ¬(p ∧ q) is:`, o: [[`¬p ∧ ¬q`, `¬p ∧ ¬q is De Morgan's result for ¬(p ∨ q). Negating an ∧ turns it into ∨: ¬p ∨ ¬q.`], [`¬p ∨ ¬q`, `Correct. De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q. "Not both" means at least one is false (Theorem 1.1.1, law 9) (L4).`], [`p ∧ ¬q`, `p ∧ ¬q is the negation of p → q (L5). De Morgan negates both parts and flips ∧ to ∨: ¬p ∨ ¬q.`], [`p → q`, `p → q is F only in row T, F, but ¬(p ∧ q) is F only in row T, T. They differ, so this is not De Morgan.`]], a: 1, src: `Exam 2023/24` },
        { q: `The Identity law p ∧ T ≡`, o: [[`p`, `Correct. Identity law p ∧ t ≡ p: "and true" leaves p's value unchanged, so the column equals p (Theorem 1.1.1, law 4; Example 1.1.14) (L4).`], [`q`, `q does not appear in p ∧ T, so it cannot be the result. The identity law gives p.`], [`p ∨ q`, `p ∨ q is true when p = F, q = T, but p ∧ T = F there. The identity law gives p.`], [`T`, `T would be the universal bound result for p ∨ T ≡ t. With ∧, the T part changes nothing, giving p.`]], a: 0, src: `Exam 2024/25, 2021/22` },
        { q: `The commutative law p ∧ q ≡`, o: [[`q ∧ p`, `Correct. Commutative law p ∧ q ≡ q ∧ p: swapping the order of an "and" does not change its value (Theorem 1.1.1, law 1) (L4).`], [`¬p ∨ q`, `¬p ∨ q is equivalent to p → q (L4, Table 4), not to p ∧ q; e.g. at p = F it is T while p ∧ q is F.`], [`p ∧ ¬q`, `p ∧ ¬q is the negation of p → q; it is T at p = T, q = F, where p ∧ q is F.`], [`p ∨ ¬q`, `p ∨ ¬q is T at p = F, q = F, where p ∧ q is F, so it is not equivalent. Commutative just swaps: q ∧ p.`]], a: 0, src: `Exam 2023/24` },
        { q: `The Negation laws p ∧ ¬p ≡`, o: [[`T`, `T is the result of the other negation law, p ∨ ¬p ≡ t. With ∧, p and ¬p can never both be true.`], [`c (F)`, `Correct. Negation law p ∧ ~p ≡ c: p and ¬p always have opposite values, so their conjunction is always false (Theorem 1.1.1, law 5) (L4).`], [`p`, `p is T in one row, but p ∧ ¬p is F in every row. The negation law gives c (contradiction).`], [`¬p`, `¬p is T when p = F, but then p ∧ ¬p = F ∧ T = F. The result is always F, c.`]], a: 1, src: `Exam 2023/24` },
        { q: `p ∧ (p ∨ q) ≡`, o: [[`p`, `Correct. Absorption p ∧ (p ∨ q) ≡ p: if p is T then p ∨ q is T too; if p is F the conjunction is F (Theorem 1.1.1, law 10) (L4).`], [`q`, `At p = F, q = T the expression is F ∧ T = F but q is T, so it is not q. Absorption leaves p.`], [`¬p`, `¬p is the opposite of p, and the expression equals p, so the two disagree in every row.`], [`¬q`, `At p = T, q = T the expression is T but ¬q is F. Absorption gives p.`]], a: 0, src: `Exam 2023/24` },
        { q: `The statement (p ∧ q) → (p ∨ q) is:`, o: [[`tautology`, `Correct. (p ∧ q) → (p ∨ q) ≡ ¬(p ∧ q) ∨ (p ∨ q) ≡ (¬p ∨ p) ∨ (¬q ∨ q) ≡ T: whenever p ∧ q is true, p ∨ q is true (L5, Proof).`], [`contradiction`, `A contradiction is false in every row, but this implication is never false: whenever p ∧ q is T, p ∨ q is T too.`], [`both`, `A form cannot be all T and all F at once. Every row here is T, so it is a tautology only.`]], a: 0, src: `Exam 2020/21, 2021/22` },
        { q: `The statement (p ∧ q) → (p → q) is:`, o: [[`tautology`, `Correct. When p ∧ q is true, q is true so p → q is true.`], [`contradiction`, `It is never false: an implication is F only for T → F, and when p ∧ q is T, q is T, so p → q is T.`], [`both`, `A statement form cannot be always true and always false at once. All rows here are T: a tautology.`]], a: 0, src: `Exam 2021/22` },
        { q: `The statement P ∨ ¬P is always:`, o: [[`True`, `Correct. P ∨ ¬P is T in both rows because one of P, ¬P is always true: a tautology, negation law p ∨ ~p ≡ t (L4, Example 1.1.13).`], [`False`, `Always false is P ∧ ¬P (the contradiction). With ∨ one part is always true, so it is always T.`], [`Sometimes True`, `It is true in every row, not just some: when P = T, P is true; when P = F, ¬P is true.`], [`Undefined`, `Both rows of the truth table have a value, T. Nothing is undefined.`]], a: 0, src: `Midterm 2025/26` },
        { q: `The statement P ∧ ¬P is always:`, o: [[`True`, `It is never true: P and ¬P always have opposite values, so they are never both T.`], [`False`, `Correct. P ∧ ¬P is F in both rows since P and ¬P cannot both be true: a contradiction, negation law p ∧ ~p ≡ c (L4, Example 1.1.13).`], [`Sometimes True`, `It is false in every row, not sometimes true. A conjunction of a statement and its negation is a contradiction.`], [`Undefined`, `Both rows have a value, F. A contradiction is a perfectly defined statement form.`]], a: 1, src: `Midterm 2025/26` }
      ]
    },

    /* ───────────────────────── LECTURE 5 ───────────────────────── */
    {
      n: 5, title: `Conditional Statements, Negations and Equivalence Proofs`,
      notes: [
        { h: `The negation of a conditional statement`, pts: [
          `By definition p → q is false if, and only if, its hypothesis p is true and its conclusion q is false. It follows that: <b>the negation of "if p then q" is logically equivalent to "p and not q"</b>.`,
          `Symbolically: <b>~(p → q) ≡ p ∧ ~q</b>.`,
          `Derivation from p → q ≡ ~p ∨ q: ~(p → q) ≡ ~(~p ∨ q) ≡ ~(~p) ∧ (~q) [De Morgan] ≡ p ∧ ~q [double negative].`,
          `Example 1.2.4: (a) "If my car is in the repair shop, then I cannot get to class." Negation: "My car is in the repair shop <b>and</b> I can get to class." (b) "If Sara lives in Athens, then she lives in Greece." Negation: "Sara lives in Athens and she does not live in Greece." (She might live in Athens, Georgia; Athens, Ohio; or Athens, Wisconsin.)`,
          `Common mistake: the negation of an if-then is <b>not</b> another if-then; it is an "and" statement.`
        ]},
        { h: `Order of operations for logical operators`, table: [
          [`Priority`, `Operators`, `Rule`],
          [`1`, `~`, `Evaluate negations first.`],
          [`2`, `∧, ∨`, `Evaluate ∧ and ∨ second. When both are present, parentheses may be needed.`],
          [`3`, `→, ↔`, `Evaluate → and ↔ third. When both are present, parentheses may be needed.`]
        ]},
        { h: `Biconditional: p ↔ q ≡ (p → q) ∧ (q → p)`, table: [
          [`p`, `q`, `p → q`, `q → p`, `p ↔ q`, `(p → q) ∧ (q → p)`],
          [`T`, `T`, `T`, `T`, `T`, `T`],
          [`T`, `F`, `F`, `T`, `F`, `F`],
          [`F`, `T`, `T`, `F`, `F`, `F`],
          [`F`, `F`, `T`, `T`, `T`, `T`]
        ]},
        { h: `Table 7: equivalences involving conditional statements`, table: [
          [`Equivalence`, `Comment`],
          [`p → q ≡ ¬p ∨ q`, `the key rewrite`],
          [`p → q ≡ ¬q → ¬p`, `contrapositive`],
          [`p ∨ q ≡ ¬p → q`, ``],
          [`p ∧ q ≡ ¬(p → ¬q)`, ``],
          [`¬(p → q) ≡ p ∧ ¬q`, `negation of a conditional`],
          [`(p → q) ∧ (p → r) ≡ p → (q ∧ r)`, `asked in Exam 2025/26 Q2b`],
          [`(p → r) ∧ (q → r) ≡ (p ∨ q) → r`, `division into cases`],
          [`(p → q) ∨ (p → r) ≡ p → (q ∨ r)`, ``],
          [`(p → r) ∨ (q → r) ≡ (p ∧ q) → r`, ``]
        ]},
        { h: `Table 8: equivalences involving biconditionals`, table: [
          [`Equivalence`],
          [`p ↔ q ≡ (p → q) ∧ (q → p)`],
          [`p ↔ q ≡ ¬p ↔ ¬q`],
          [`p ↔ q ≡ (p ∧ q) ∨ (¬p ∧ ¬q)`],
          [`¬(p ↔ q) ≡ p ↔ ¬q`]
        ]},
        { h: `Converse, contrapositive, inverse and "if and only if"`, pts: [
          `For p → q: <b>converse</b> q → p; <b>contrapositive</b> ¬q → ¬p (equivalent to p → q); <b>inverse</b> ¬p → ¬q (equivalent to the converse).`,
          `The converse of ¬p → q is <b>q → ¬p</b> (swap hypothesis and conclusion; Exam 2020/21 Q8).`,
          `By the separate definitions of <i>if</i> and <i>only if</i>, "p if, and only if, q" means both "p if q" (q → p) and "p only if q" (p → q).`,
          `The table above shows p ↔ q and (p → q) ∧ (q → p) always have the same truth values, so they are logically equivalent (Exam 2024/25 Q2b, Exam 2023/24 Q3b).`
        ]},
        { h: `Proof by a series of equivalences: ¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬q`, formula: [
          `¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬(¬p ∧ q)      by the second De Morgan law`,
          `≡ ¬p ∧ [¬(¬p) ∨ ¬q]                    by the first De Morgan law`,
          `≡ ¬p ∧ (p ∨ ¬q)                        by the double negation law`,
          `≡ (¬p ∧ p) ∨ (¬p ∧ ¬q)                 by the second distributive law`,
          `≡ F ∨ (¬p ∧ ¬q)                        because ¬p ∧ p ≡ F`,
          `≡ (¬p ∧ ¬q) ∨ F                        by the commutative law for disjunction`,
          `≡ ¬p ∧ ¬q                              by the identity law for F  ■`,
          `(Asked in Midterm 2021/22, Exam 2020/21 Q3a, 2021/22 Q4b, Summer 2023/24 Q3.)`
        ]},
        { h: `Proof: (p ∧ q) → (p ∨ q) is a tautology`, formula: [
          `(p ∧ q) → (p ∨ q) ≡ ¬(p ∧ q) ∨ (p ∨ q)     by p → q ≡ ¬p ∨ q`,
          `≡ (¬p ∨ ¬q) ∨ (p ∨ q)                       by the first De Morgan law`,
          `≡ (¬p ∨ p) ∨ (¬q ∨ q)                       by the associative and commutative laws for disjunction`,
          `≡ T ∨ T                                     by the negation law and commutative law`,
          `≡ T                                         by the domination law  ■`
        ]},
        { h: `Proof: [¬p ∧ (p ∨ q)] → q is a tautology (by laws)`, formula: [
          `[¬p ∧ (p ∨ q)] → q ≡ ¬[¬p ∧ (p ∨ q)] ∨ q          p → q ≡ ¬p ∨ q`,
          `≡ [¬(¬p) ∨ ¬(p ∨ q)] ∨ q                          De Morgan`,
          `≡ [p ∨ (¬p ∧ ¬q)] ∨ q                             double negation, De Morgan`,
          `≡ [(p ∨ ¬p) ∧ (p ∨ ¬q)] ∨ q                       distributive`,
          `≡ [T ∧ (p ∨ ¬q)] ∨ q ≡ (p ∨ ¬q) ∨ q               negation, identity`,
          `≡ p ∨ (¬q ∨ q) ≡ p ∨ T ≡ T                        associative, negation, domination  ■`,
          `(Asked in Exam 2021/22 Q3b and the Aug 2024 paper Q2b.)`
        ]},
        { h: `Exercises from the slides (all are tautologies)`, table: [
          [`Statement`, `Why it is always true`],
          [`(p ∧ q) → p`, `if p ∧ q is true, p is true`],
          [`p → (p ∨ q)`, `if p is true, p ∨ q is true`],
          [`¬p → (p → q)`, `if ¬p is true, p is false so p → q is true`],
          [`(p ∧ q) → (p → q)`, `if p ∧ q is true, q is true so p → q is true`],
          [`¬(p → q) → p`, `¬(p → q) ≡ p ∧ ¬q, which forces p true`],
          [`¬(p → q) → ¬q`, `p ∧ ¬q forces ¬q true`],
          [`[¬p ∧ (p ∨ q)] → q`, `disjunctive syllogism`],
          [`[(p → q) ∧ (q → r)] → (p → r)`, `hypothetical syllogism`],
          [`[p ∧ (p → q)] → q`, `modus ponens`],
          [`[(p ∨ q) ∧ (p → r) ∧ (q → r)] → r`, `proof by cases`]
        ]}
      ],
      cards: [
        [`~(p → q) ≡ ?`, `p ∧ ~q ("p and not q").`],
        [`Negation of "If my car is in the repair shop, then I cannot get to class"`, `"My car is in the repair shop and I can get to class."`],
        [`Order of operations`, `1. ~ ; 2. ∧, ∨ ; 3. →, ↔ (parentheses may be needed when two of the same level appear).`],
        [`p ↔ q ≡ ?`, `(p → q) ∧ (q → p), also (p ∧ q) ∨ (¬p ∧ ¬q) and ¬p ↔ ¬q.`],
        [`¬(p ↔ q) ≡ ?`, `p ↔ ¬q`],
        [`p → q ≡ ? (two forms)`, `¬p ∨ q and ¬q → ¬p (contrapositive).`],
        [`p ∨ q ≡ ?`, `¬p → q`],
        [`p ∧ q ≡ ?`, `¬(p → ¬q)`],
        [`(p → q) ∧ (p → r) ≡ ?`, `p → (q ∧ r)`],
        [`(p → r) ∧ (q → r) ≡ ?`, `(p ∨ q) → r`],
        [`(p → q) ∨ (p → r) ≡ ?`, `p → (q ∨ r)`],
        [`(p → r) ∨ (q → r) ≡ ?`, `(p ∧ q) → r`],
        [`Converse of p → q`, `q → p`],
        [`Contrapositive of p → q`, `¬q → ¬p (equivalent to p → q).`],
        [`"p if, and only if, q" means`, `"p if q" (q → p) and "p only if q" (p → q).`],
        [`Negation of "John is rich and he is not famous"`, `"John is not rich or he is famous", i.e. "If John is rich, then he is famous".`]
      ],
      qa: [
        [`Derive the negation of a conditional statement and apply it to "If Sara lives in Athens, then she lives in Greece".`, `p → q is false only when p is true and q is false, so ~(p → q) ≡ p ∧ ~q. Algebraically: ~(p → q) ≡ ~(~p ∨ q) ≡ ~(~p) ∧ ~q (De Morgan) ≡ p ∧ ~q (double negative). Negation: "Sara lives in Athens and she does not live in Greece."`],
        [`Use a truth table to show that p ↔ q ≡ (p → q) ∧ (q → p).`, `p q | p→q | q→p | p↔q | (p→q)∧(q→p): TT: T T T T; TF: F T F F; FT: T F F F; FF: T T T T. The p ↔ q and (p → q) ∧ (q → p) columns are identical, so they are logically equivalent.`],
        [`Show that ¬(p ∨ (¬p ∧ q)) and ¬p ∧ ¬q are logically equivalent by developing a series of equivalences.`, `¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬(¬p ∧ q) [2nd De Morgan] ≡ ¬p ∧ [¬(¬p) ∨ ¬q] [1st De Morgan] ≡ ¬p ∧ (p ∨ ¬q) [double negation] ≡ (¬p ∧ p) ∨ (¬p ∧ ¬q) [2nd distributive] ≡ F ∨ (¬p ∧ ¬q) [¬p ∧ p ≡ F] ≡ (¬p ∧ ¬q) ∨ F [commutative] ≡ ¬p ∧ ¬q [identity].`],
        [`Show that (p ∧ q) → (p ∨ q) is a tautology using logical equivalences.`, `(p ∧ q) → (p ∨ q) ≡ ¬(p ∧ q) ∨ (p ∨ q) ≡ (¬p ∨ ¬q) ∨ (p ∨ q) [De Morgan] ≡ (¬p ∨ p) ∨ (¬q ∨ q) [associative, commutative] ≡ T ∨ T ≡ T [domination].`],
        [`Show by truth table that (p → q) ∧ (p → r) ≡ p → (q ∧ r).`, `Rows p q r | p→q | p→r | (p→q)∧(p→r) | q∧r | p→(q∧r): TTT: T T T T T; TTF: T F F F F; TFT: F T F F F; TFF: F F F F F; FTT: T T T T T; FTF: T T T F T; FFT: T T T F T; FFF: T T T F T. The two result columns agree in all 8 rows, so the forms are equivalent.`],
        [`State the order of operations for logical operators.`, `1. Negation ~ first. 2. ∧ and ∨ second (use parentheses when both appear). 3. → and ↔ third (use parentheses when both appear). E.g. p ∨ q → r means (p ∨ q) → r, and r ∨ p ∧ q needs brackets to be unambiguous.`]
      ],
      quiz: [
        { q: `The negation of a conditional statement ¬(p → q) is equivalent to:`, o: [[`p ∧ ¬q`, `Correct. p → q is false only when p is true and q false, so ~(p → q) ≡ p ∧ ~q. By laws: ~(~p ∨ q) ≡ p ∧ ~q (De Morgan, double negative) (L5, Negation of a conditional).`], [`p`, `p alone is T in row p = T, q = T, where p → q is T and its negation F. The negation also needs ¬q: p ∧ ¬q.`], [`q`, `q is T in row T, T, but there p → q is true, so its negation is F. The negation is p ∧ ¬q (q must be false).`], [`p ∨ q`, `p ∨ q is T in row T, T, where ¬(p → q) is F. The negation of an if-then is an "and": p ∧ ¬q.`]], a: 0, src: `Exam 2025/26` },
        { q: `Logical equivalences involving conditional statements: ¬(p → q) ≡`, o: [[`p ∨ q`, `p ∨ q is true in three rows, but ¬(p → q) is true only in row p = T, q = F. The correct form is p ∧ ¬q.`], [`p ∧ ¬q`, `Correct. p → q is false only for a true hypothesis and false conclusion, so ¬(p → q) ≡ p ∧ ¬q (Table 7; derived from ¬(¬p ∨ q) by De Morgan) (L5).`], [`p ∨ ¬q`, `p ∨ ¬q ≡ q → p (the converse), which is true in three rows. The negation of p → q is true in only one: p ∧ ¬q.`], [`p → q`, `p → q is the original statement, the opposite of its negation in every row. ¬(p → q) ≡ p ∧ ¬q.`]], a: 1, src: `Exam 2024/25, 2020/21` },
        { q: `The logical equivalences involving conditional statements ¬(p → q) ≡`, o: [[`p ∧ ¬q`, `Correct. The only row where p → q is false is p = T, q = F, so its negation is "p and not q": ¬(p → q) ≡ p ∧ ¬q (L5, Table 7).`], [`q → p`, `q → p is the converse of p → q, another if-then. The negation of an if-then is an "and" statement: p ∧ ¬q.`], [`¬p ∧ q`, `¬p ∧ q is true only at p = F, q = T, which is ¬(q → p), the negation of the converse. ¬(p → q) ≡ p ∧ ¬q.`], [`q ∧ ¬p`, `q ∧ ¬p is ¬p ∧ q (commutative), the negation of q → p. Negating p → q needs p true and q false: p ∧ ¬q.`]], a: 0, src: `Exam 2023/24` },
        { q: `P → Q is equivalent to:`, o: [[`¬P ∨ Q`, `Correct. P → Q ≡ ¬P ∨ Q (Table 4/Table 7): both are false only when P = T and Q = F, and true in the other three rows (L5).`], [`P ∨ Q`, `In row P = T, Q = F, P ∨ Q is T but P → Q is F; and in row F, F, P ∨ Q is F but P → Q is T.`], [`Q → P`, `Q → P is the converse; it differs in rows TF and FT (e.g. P = F, Q = T: P → Q = T but Q → P = F).`], [`¬P ∧ Q`, `¬P ∧ Q is T only in row F, T; in row T, T it is F while P → Q is T.`]], a: 0, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `Logical equivalences involving conditional statements: p → q ≡`, o: [[`p ∨ q`, `p ∨ q differs from p → q in rows T, F (T vs F) and F, F (F vs T). The rewrite negates p: ¬p ∨ q.`], [`¬p ∨ q`, `Correct. p → q ≡ ¬p ∨ q, the key rewrite of Table 7: both are false only when p = T and q = F (L5).`], [`p ∧ q`, `p ∧ q is F in row F, F, where p → q is T (false hypothesis). It matches only rows TT and TF.`], [`p + q`, `"+" is arithmetic (or OR in circuit notation) and is not one of the lecture's connectives. p → q ≡ ¬p ∨ q.`]], a: 1, src: `Exam 2023/24, 2020/21` },
        { q: `Logical equivalences involving biconditional statements: p ↔ q ≡`, o: [[`(p → q) ∧ (q → p)`, `Correct. p ↔ q means "p only if q" (p → q) and "p if q" (q → p); the truth table shows both columns agree (L5, Biconditional; Table 8).`], [`p → q`, `p → q is only one direction ("only if"); in row F, T it is T while p ↔ q is F. The biconditional needs q → p too.`], [`¬p`, `¬p ignores q: in row T, T it is F while p ↔ q is T.`], [`p ∨ q`, `p ∨ q is F in row F, F, but p ↔ q is T there (equal values), and p ∨ q is T in rows TF, FT where ↔ is F.`]], a: 0, src: `Exam 2025/26, 2024/25, 2023/24, 2020/21, 2021/22` },
        { q: `P ↔ Q is equivalent to:`, o: [[`(P ∧ Q) ∨ (¬P ∧ ¬Q)`, `Correct. P ↔ Q is true when both are true (P ∧ Q) or both false (¬P ∧ ¬Q): p ↔ q ≡ (p ∧ q) ∨ (¬p ∧ ¬q) (L5, Table 8).`], [`(P ∨ Q) ∧ (¬P ∨ ¬Q)`, `(P ∨ Q) ∧ (¬P ∨ ¬Q) means at least one true and not both, i.e. exactly one true: that is P ⊕ Q, the negation of P ↔ Q.`], [`P ∨ ¬Q`, `P ∨ ¬Q ≡ Q → P is only one direction; in row T, F it is T while P ↔ Q is F.`], [`P ∧ ¬Q`, `P ∧ ¬Q ≡ ¬(P → Q) is true only in row T, F, where P ↔ Q is F, so it is not equivalent.`]], a: 0, src: `Midterm 2025/26` },
        { q: `If p, q and r are propositions, then p ∨ q → r is logically equivalent to:`, o: [[`(p → r) ∧ (q → r)`, `Correct. Division into cases (Table 7): if either p or q leads to r, both p → r and q → r must hold, so (p ∨ q) → r ≡ (p → r) ∧ (q → r) (L5).`], [`p → q`, `p → q drops r entirely. With p = q = T and r = F, p ∨ q → r is F but p → q is T.`], [`q → p`, `q → p has no r. With p = q = T and r = F the original is F but q → p is T.`], [`q → r`, `q → r ignores p. With p = T, q = F, r = F the original p ∨ q → r is F but q → r is T.`]], a: 0, src: `Exam 2024/25` },
        { q: `The following is logically equivalent to (p ∧ q) → r:`, o: [[`p ∧ q`, `p ∧ q drops r and is not even an implication: with p = q = F it is F while (p ∧ q) → r is T.`], [`r → (p ∧ q)`, `r → (p ∧ q) is the converse: with r = T and p = F it is F, while (p ∧ q) → r is T.`], [`¬(p ∧ q) ∨ r`, `Correct. Apply a → b ≡ ¬a ∨ b with a = p ∧ q and b = r: (p ∧ q) → r ≡ ¬(p ∧ q) ∨ r (L5, Table 7).`], [`r → (p ∨ q)`, `r → (p ∨ q) is a different implication: with p = q = T and r = F it is T but (p ∧ q) → r is F.`]], a: 2, src: `Exam 2025/26` },
        { q: `The converse of ¬p → q is:`, o: [[`p → q`, `p → q changes the hypothesis ¬p to p without swapping anything, so it is not the converse of ¬p → q.`], [`¬p → ¬q`, `¬p → ¬q negates both sides of p → q without swapping, which is the inverse of p → q. The converse of ¬p → q just swaps the sides: q → ¬p.`], [`q → ¬p`, `Correct. The converse of a → b is b → a: swap hypothesis and conclusion. With a = ¬p and b = q this is q → ¬p (L5, Converse, contrapositive, inverse).`]], a: 2, src: `Exam 2020/21` },
        { q: `If p and q are propositions, then ¬p → q is logically equivalent to:`, o: [[`q → ¬p`, `q → ¬p is the converse of ¬p → q, not equivalent: at p = T, q = T the original is T but q → ¬p is F.`], [`p → ¬q`, `p → ¬q ≡ ¬p ∨ ¬q is F at p = q = T, where ¬p → q (F → T) is T, so they are not equivalent.`], [`p ∨ q`, `Correct. a → b ≡ ¬a ∨ b gives ¬p → q ≡ ¬(¬p) ∨ q ≡ p ∨ q by double negation (L5, Table 7: p ∨ q ≡ ¬p → q).`]], a: 2, src: `Exam 2021/22` },
        { q: `The negation of the proposition r ∨ p ∧ q (read r ∨ (p ∧ q)) is:`, o: [[`¬r ∧ ¬p ∧ ¬q`, `¬r ∧ ¬p ∧ ¬q negates r ∨ p ∨ q. Here p ∧ q is grouped, so De Morgan on it gives ¬p ∨ ¬q, not ¬p ∧ ¬q.`], [`¬r ∨ ¬p ∨ ¬q`, `¬r ∨ ¬p ∨ ¬q negates r ∧ p ∧ q. The outer connective is ∨, so the negation must start ¬r ∧ ….`], [`¬r ∧ (¬p ∨ ¬q)`, `Correct. De Morgan twice: ¬r ∧ ¬(p ∧ q). The paper prints it as ¬r ∧ ¬p ∨ ¬q.`]], a: 2, src: `Exam 2020/21, 2021/22` },
        { q: `The negation of the statement "John is rich and he is not famous" is:`, o: [[`John is neither rich nor famous`, `"Neither rich nor famous" is ¬R ∧ ¬F; it is false when John is rich and famous, yet then the original (R ∧ ¬F) is false too.`], [`John is either rich or famous`, `"Rich or famous" (R ∨ F) is true when John is rich and not famous, the very case where the original is true.`], [`If John is famous, then he is rich`, `F → R ≡ ¬F ∨ R is true when John is rich and not famous, where the original is also true, so it is not the negation.`], [`If John is rich, then he is famous`, `Correct. ¬(R ∧ ¬F) ≡ ¬R ∨ F by De Morgan and double negation, and ¬R ∨ F ≡ R → F: "If John is rich, then he is famous" (L5, Table 7).`]], a: 3, src: `Exam 2020/21, 2021/22` },
        { q: `Logical equivalences involving biconditionals: ¬(p ↔ q) ≡`, o: [[`p ∧ q`, `p ∧ q is T in row T, T, where p ↔ q is T and its negation F. ¬(p ↔ q) ≡ p ↔ ¬q.`], [`p ↔ ¬q`, `Correct. ¬(p ↔ q) is true when p and q differ, which is exactly when p and ¬q are equal: ¬(p ↔ q) ≡ p ↔ ¬q (L5, Table 8).`], [`¬p ↔ ¬q`, `Negating both sides keeps the values equal or different as before, so ¬p ↔ ¬q ≡ p ↔ q (Table 8), not its negation.`], [`p → q`, `p → q is T in row F, F, but there p ↔ q is T so its negation is F.`]], a: 1, src: `Lecture 5 example` },
        { q: `The negation of "If my car is in the repair shop, then I cannot get to class" is:`, o: [[`I can get to class`, `This is only ¬q. The negation p ∧ ¬q also needs the hypothesis: my car is in the repair shop and I can get to class.`], [`My car is not in the repair shop or I cannot get to class`, `"Not p or q" is ¬p ∨ q ≡ p → q, the original statement itself, not its negation.`], [`My car is in the repair shop and I can get to class`, `Correct. ¬(p → q) ≡ p ∧ ¬q: keep p (car in the shop) and negate q ("cannot get to class" becomes "can"). This is Example 1.2.4(a) (L5).`], [`If my car is not in the repair shop, then I can get to class`, `Negating both parts gives the inverse ¬p → ¬q. The negation of an if-then is not another if-then; it is p ∧ ¬q.`]], a: 2, src: `Lecture 5 example` },
        { q: `According to the order of operations, which is evaluated first?`, o: [[`↔`, `↔ is in the last group (priority 3, with →), evaluated after ~ and after ∧, ∨.`], [`→`, `→ has priority 3 (with ↔), so it is evaluated last, after ~ and ∧, ∨.`], [`∧`, `∧ (with ∨) has priority 2: it comes after negation. ~ is evaluated first.`], [`~`, `Correct. The order of operations is: ~ first, then ∧ and ∨, then → and ↔ (L5, Order of operations).`]], a: 3, src: `Lecture 5 example` },
        { q: `(p → r) ∨ (q → r) is equivalent to:`, o: [[`(p ∧ q) → r`, `Correct. Table 7 lists (p → r) ∨ (q → r) ≡ (p ∧ q) → r: both are false only when p and q are true and r is false (L5).`], [`p → (q ∨ r)`, `p → (q ∨ r) ≡ (p → q) ∨ (p → r), a different line of Table 7 with p as the shared hypothesis, not r as the shared conclusion.`], [`r → (p ∧ q)`, `r → (p ∧ q) is false at r = T, p = F, where (p → r) ∨ (q → r) is T.`], [`(p ∨ q) → r`, `(p ∨ q) → r ≡ (p → r) ∧ (q → r), with ∧ between the implications (division into cases). With ∨ the hypothesis becomes p ∧ q.`]], a: 0, src: `Lecture 5 example` },
        { q: `p ∧ q is equivalent to:`, o: [[`¬p → q`, `¬p → q ≡ p ∨ q (Table 7), which is T at p = T, q = F where p ∧ q is F.`], [`¬(p → ¬q)`, `Correct. ¬(p → ¬q) ≡ p ∧ ¬(¬q) ≡ p ∧ q, using ¬(a → b) ≡ a ∧ ¬b and double negation (L5, Table 7).`], [`p → q`, `p → q is T when p = F, but p ∧ q is F there, so they are not equivalent.`], [`¬(p → q)`, `¬(p → q) ≡ p ∧ ¬q, true at p = T, q = F, where p ∧ q is F. The negated implication must have ¬q inside.`]], a: 1, src: `Lecture 5 example` }
      ]
    },

    /* ───────────────────────── LECTURE 6 ───────────────────────── */
    {
      n: 6, title: `Discrete Random Variables and Probability Distributions`,
      notes: [
        { h: `Random variable`, pts: [
          `Tossing a coin three consecutive times gives a sample space S of 8 outcomes (hhh, hhT, … , ttt). Asking for "the number of images" (heads) relates S (<b>independent variable</b>) to a real number R (<b>dependent variable</b>).`,
          `This relation is a function written <b>X : S → R</b>, where X is the <b>random variable</b>.`,
          `<b>Definition</b>: the random variable is a <b>function whose domain is the set of elements of the sample space S and whose co-domain is the set of real numbers R</b>.`,
          `For the number of heads in 3 tosses, the range of X is {0, 1, 2, 3}.`,
          `<b>Discrete sample space</b>: contains a finite number of possibilities, or an unending sequence with as many elements as there are whole numbers.`,
          `<b>Continuous sample space</b>: contains an infinite number of possibilities equal to the number of points on a line segment.`
        ]},
        { h: `Example 1: X = number of heads − number of tails (3 tosses)`, table: [
          [`Outcome`, `heads − tails`, `X`],
          [`HHH`, `3 − 0`, `3`],
          [`HHT, HTH, THH`, `2 − 1`, `1`],
          [`HTT, THT, TTH`, `1 − 2`, `−1`],
          [`TTT`, `0 − 3`, `−3`],
          [`Range`, ``, `{−3, −1, 1, 3}`]
        ]},
        { h: `Example 2: sum of two dice`, pts: [
          `A regular die is tossed two times; X = sum of the two numbers. n(S) = 36.`,
          `Sum 2: (1,1). 3: (1,2),(2,1). 4: (3,1),(2,2),(1,3). 5: 4 pairs. 6: 5 pairs. 7: (4,3),(3,4),(2,5),(1,6),(6,1),(5,2), 6 pairs. 8: 5 pairs. 9: 4 pairs. 10: 3 pairs. 11: 2 pairs. 12: (6,6).`,
          `Range X = {2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}. The diagonal lines of the grid ("lateral shape") give the same result.`,
          `So P(X = 7) = 6/36 = 1/6 and P(X = 2) = 1/36.`
        ]},
        { h: `Probability distribution function`, pts: [
          `If X is a discrete random variable whose range is {x₁, x₂, …, xᵣ}, then the function f defined by <b>f(xᵣ) = P(X = xᵣ)</b> for each r = 1, 2, 3, … is the <b>probability distribution function</b> of X.`,
          `It is expressed as a set of ordered pairs X = {(x₁, f(x₁)), (x₂, f(x₂)), …, (xₙ, f(xₙ))}, or as a table with rows xᵣ and f(xᵣ).`,
          `The set of ordered pairs (x, f(x)) is a <b>probability function, probability mass function, or probability distribution</b> of X if for each possible outcome x: <b>1.</b> f(x) ≥ 0; <b>2.</b> Σ f(x) = 1; <b>3.</b> P(X = x) = f(x).`
        ]},
        { h: `Example 3: number of heads (coin tossed twice)`, formula: [
          `S = {(H,H), (H,T), (T,H), (T,T)}, n(S) = 4, range of X = {0, 1, 2}`,
          `f(0) = P(X = 0) = n(TT)/n(S) = 1/4`,
          `f(1) = P(X = 1) = n({HT, TH})/n(S) = 2/4`,
          `f(2) = P(X = 2) = n(HH)/n(S) = 1/4`,
          `Check: 1/4 + 2/4 + 1/4 = 1 ✓`,
          `Note: the slide says "three consecutive times" but its sample space and answer are for two tosses.`
        ]},
        { h: `Try to solve: heads − tails for two tosses`, formula: [
          `HH → 2 − 0 = 2;  HT, TH → 1 − 1 = 0;  TT → 0 − 2 = −2`,
          `x:     −2    0     2`,
          `f(x):  1/4   2/4   1/4`
        ]},
        { h: `Example: least number on two cards drawn without replacement`, formula: [
          `A box has 5 cards numbered 1 to 5; two cards are drawn one after the other without replacement. X = the smaller number.`,
          `Pairs (1,1), (2,2), (3,3), (4,4), (5,5) are impossible, so n(S) = 5 × 4 = 20.`,
          `X = 1: pairs containing 1 → 4 + 4 = 8 → f(1) = 8/20`,
          `X = 2: pairs from {2,…,5} containing 2 → 3 + 3 = 6 → f(2) = 6/20`,
          `X = 3: pairs from {3,4,5} containing 3 → 2 + 2 = 4 → f(3) = 4/20`,
          `X = 4: (4,5), (5,4) → f(4) = 2/20`,
          `Check: (8 + 6 + 4 + 2)/20 = 1 ✓`
        ]},
        { h: `Try to solve: greatest number on two dice`, formula: [
          `X = max of two dice; n(S) = 36. P(X = k) = (number of pairs with max k) = k² − (k − 1)² = 2k − 1`,
          `x:     1     2     3     4     5     6`,
          `f(x):  1/36  3/36  5/36  7/36  9/36  11/36`,
          `Check: 1 + 3 + 5 + 7 + 9 + 11 = 36 ✓`
        ]}
      ],
      cards: [
        [`Random variable (definition)`, `A function whose domain is the sample space S and whose co-domain is the set of real numbers R; X : S → R.`],
        [`Discrete sample space`, `Finite number of possibilities, or an unending sequence with as many elements as the whole numbers.`],
        [`Continuous sample space`, `Infinite number of possibilities equal to the number of points on a line segment.`],
        [`Probability distribution function`, `f(xᵣ) = P(X = xᵣ) for each value xᵣ in the range of X.`],
        [`Three conditions of a probability mass function`, `f(x) ≥ 0; Σ f(x) = 1; P(X = x) = f(x).`],
        [`Range of heads − tails, 3 coin tosses`, `{−3, −1, 1, 3}`],
        [`Range of the sum of two dice`, `{2, 3, …, 12}`],
        [`n(S) for two dice`, `36`],
        [`Distribution of heads in two tosses`, `f(0) = 1/4, f(1) = 2/4, f(2) = 1/4`],
        [`Two cards from 1..5 without replacement: n(S)?`, `20 (5 × 4; doubles excluded).`],
        [`Least of two cards from 1..5: f(1), f(2), f(3), f(4)`, `8/20, 6/20, 4/20, 2/20`],
        [`Number of ways to get sum 7 with two dice`, `6 (1+6, 2+5, 3+4 and reverses).`],
        [`Independent / dependent variable in X : S → R`, `S is independent; the real number R is dependent.`]
      ],
      qa: [
        [`Define the random variable and the probability distribution function of a discrete random variable.`, `A random variable is a function whose domain is the set of elements of the sample space S and whose co-domain is the set of real numbers: X : S → R. If X is discrete with range {x₁, …, xᵣ}, the function f(xᵣ) = P(X = xᵣ) is its probability distribution function, written as ordered pairs {(xᵣ, f(xᵣ))} or a table. It must satisfy f(x) ≥ 0, Σ f(x) = 1, P(X = x) = f(x).`],
        [`A coin is tossed three times. X = number of heads − number of tails. Write the range of X.`, `S = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}. X: HHH = 3; HHT, HTH, THH = 1; HTT, THT, TTH = −1; TTT = −3. Range = {−3, −1, 1, 3}.`],
        [`A die is tossed twice. Find the range of X = sum of the two numbers and P(X = 7).`, `Range {2, 3, …, 12}. Sum 7 occurs for (1,6),(2,5),(3,4),(4,3),(5,2),(6,1): 6 of 36 outcomes, so P(X = 7) = 6/36 = 1/6.`],
        [`Two cards are drawn without replacement from a box of cards numbered 1 to 5. Find the distribution of X = the least number.`, `n(S) = 20. X = 1 in 8 outcomes, 2 in 6, 3 in 4, 4 in 2. f(1) = 8/20, f(2) = 6/20, f(3) = 4/20, f(4) = 2/20; the sum is 1.`],
        [`Distinguish discrete from continuous sample spaces.`, `Discrete: finite possibilities, or an unending sequence with as many elements as there are whole numbers (countable). Continuous: an infinite number of possibilities equal to the number of points on a line segment (e.g. a measured time or volume).`]
      ],
      quiz: [
        { q: `In tossing a coin three times, X = number of heads − number of tails. The range of X is:`, o: [[`{−3, −2, −1, 0, 1, 2, 3}`, `Heads + tails = 3, so the difference is always odd.`], [`{1, 3}`, `{1, 3} keeps only the outcomes with more heads. TTT gives 0 − 3 = −3 and HTT gives 1 − 2 = −1, so negative values occur too.`], [`{−3, −1, 1, 3}`, `Correct. HHH → 3, two heads → 2 − 1 = 1, one head → 1 − 2 = −1, TTT → −3, so the range is {−3, −1, 1, 3} (L6, Example 1).`], [`{0, 1, 2, 3}`, `{0, 1, 2, 3} is the range of the number of heads alone. Subtracting the tails gives h − (3 − h) = 2h − 3: {−3, −1, 1, 3}.`]], a: 2, src: `Lecture 6 example` },
        { q: `A die is tossed twice and X = sum of the numbers. The range of X is:`, o: [[`{1, …, 6}`, `{1, …, 6} are the faces of one die. X adds two dice, so the smallest sum is 1 + 1 = 2 and the largest 6 + 6 = 12.`], [`{2, …, 36}`, `36 = 6 × 6 is n(S), the number of outcomes, not a possible sum. The largest sum is 6 + 6 = 12.`], [`{1, …, 12}`, `A sum of 1 is impossible since each die shows at least 1; the minimum is 1 + 1 = 2.`], [`{2, …, 12}`, `Correct. The sums run from (1,1) = 2 up to (6,6) = 12, and every value in between occurs: {2, 3, …, 12} (L6, Example 2).`]], a: 3, src: `Lecture 6 example` },
        { q: `The random variable is a function whose domain is:`, o: [[`The sample space S`, `Correct. The lecture defines a random variable as a function X : S → R whose domain is the sample space S and whose co-domain is the real numbers R (L6, Random variable).`], [`The natural numbers`, `The natural numbers are not the domain; X takes outcomes such as HHT as inputs. Its domain is the sample space S.`], [`The set of real numbers`, `The real numbers R are the co-domain, the values X produces (the dependent variable). The domain is S.`], [`The probabilities`, `Probabilities are given by the distribution f(x) = P(X = x), a separate function. The domain of X is S.`]], a: 0, src: `Lecture 6 example` },
        { q: `Which is NOT a condition for f(x) to be a probability distribution?`, o: [[`Σ f(x) = 1`, `Σ f(x) = 1 is condition 2 of a probability distribution, so it is a condition; the question asks for what is not.`], [`f(x) &gt; 1 for some x`, `Correct (it is not a condition). Probabilities never exceed 1.`], [`P(X = x) = f(x)`, `P(X = x) = f(x) is condition 3 of a probability distribution, so it is a condition and not the answer.`], [`f(x) ≥ 0`, `f(x) ≥ 0 is condition 1 (no negative probabilities), so it is a condition and not the answer.`]], a: 1, src: `Lecture 6 example` },
        { q: `Coin tossed twice; X = number of heads. f(1) =`, o: [[`1`, `f(1) = 1 would mean one head every time, but HH and TT give 2 and 0 heads. Only 2 of 4 outcomes give one head.`], [`1/4`, `1/4 is f(0) (only TT) or f(2) (only HH). One head occurs in two outcomes, HT and TH.`], [`2/4`, `Correct. S = {HH, HT, TH, TT}, n(S) = 4, and exactly one head occurs in HT and TH: f(1) = 2/4 (L6, Example 3).`], [`3/4`, `3/4 counts every outcome with at least one head (HH too). Exactly one head is only HT and TH: 2/4.`]], a: 2, src: `Lecture 6 example` },
        { q: `Two cards drawn without replacement from 1..5; X = least number. f(1) =`, o: [[`6/20`, `6/20 is f(2): pairs from {2, …, 5} containing 2, 3 + 3 = 6. Pairs containing 1 number 4 + 4 = 8.`], [`2/20`, `2/20 is f(4), only (4, 5) and (5, 4). The least number is 1 whenever 1 is drawn: 8 ordered pairs.`], [`4/20`, `4/20 counts 1 with 2, 3, 4, 5 in one order only (it also equals f(3)). The draws are ordered, so (1, k) and (k, 1) both count: 8/20.`], [`8/20`, `Correct. 1 paired with 2, 3, 4, 5 in either order.`]], a: 3, src: `Lecture 6 example` },
        { q: `A sample space with infinitely many possibilities equal to the number of points on a line segment is called:`, o: [[`Continuous`, `Correct. A continuous sample space contains infinitely many possibilities, as many as the points on a line segment (L6, Random variable).`], [`Empty`, `An empty sample space has no possibilities at all, but this one has infinitely many.`], [`Discrete`, `A discrete space is finite or countable like the whole numbers. As many as points on a segment is continuous.`], [`Finite`, `A finite space has a definite number of outcomes; this one has infinitely many (points on a line segment).`]], a: 0, src: `Lecture 6 example` }
      ]
    },

    /* ───────────────────────── LECTURE 7 ───────────────────────── */
    {
      n: 7, title: `Expectation (Mean) and Variance of a Random Variable`,
      notes: [
        { h: `Expectation (mean)`, pts: [
          `<b>Expectation</b> is the value at which most values of the discrete random variable are centralized; it is sometimes called the "<b>mean</b>" and is denoted by <b>μ</b> (read "Mu").`,
          `If X is discrete with distribution f and range {x₁, …, xₙ} with probabilities f(x₁), …, f(xₙ): <b>μ = E(X) = Σ xᵣ · f(xᵣ)</b> = x₁·f(x₁) + x₂·f(x₂) + … + xₙ·f(xₙ).`,
          `If X is continuous: <b>μ = E(X) = ∫ x f(x) dx</b> over (−∞, ∞).`,
          `<b>Theorem</b>: the expected value of g(X) is E[g(X)] = Σ g(x) f(x) (discrete) or ∫ g(x) f(x) dx (continuous). With g(x) = x² this gives E(X²).`
        ]},
        { h: `Variance and standard deviation`, pts: [
          `<b>Variance</b>: σ² = E[(X − μ)²] = Σ (x − μ)² f(x) (discrete) or ∫ (x − μ)² f(x) dx (continuous).`,
          `<b>Shortcut</b>: <b>σ² = E(X²) − μ²</b>.`,
          `The positive square root of the variance, <b>σ</b>, is the <b>standard deviation</b> of X.`
        ]},
        { h: `Example 1: fair coin tossed twice (number of heads)`, formula: [
          `S = {HH, HT, TH, TT}; P(X = 0) = 1/4, P(X = 1) = 1/2, P(X = 2) = 1/4`,
          `μ = E(X) = (0)(1/4) + (1)(1/2) + (2)(1/4) = 0 + 0.5 + 0.5 = 1`,
          `Meaning: a person who tosses 2 coins over and over will, on average, get 1 head per toss.`,
          `(Extra) E(X²) = 0 + 1/2 + 4/4 = 3/2 → σ² = 3/2 − 1 = 1/2`
        ]},
        { h: `Example 2: find a, then the expectation`, formula: [
          `x:     −1    0     1     2    3`,
          `f(x):  0.3   0.1   0.1   a    0.2`,
          `First: Σ f = 1 → 0.3 + 0.1 + 0.1 + a + 0.2 = 1 → a = 0.3`,
          `Second: μ = (−1)(0.3) + (0)(0.1) + (1)(0.1) + (2)(0.3) + (3)(0.2) = −0.3 + 0 + 0.1 + 0.6 + 0.6 = 1`,
          `(Extra) E(X²) = 0.3 + 0 + 0.1 + 1.2 + 1.8 = 3.4 → σ² = 3.4 − 1² = 2.4`,
          `(The table was blank on the slide; the values are read from the solution.)`
        ]},
        { h: `Try to solve (also Exam 2023/24 Q2b)`, formula: [
          `x:     0     2     3    4`,
          `f(x):  0.1   0.1   a    0.2`,
          `a = 1 − (0.1 + 0.1 + 0.2) = 0.6`,
          `μ = 0(0.1) + 2(0.1) + 3(0.6) + 4(0.2) = 0 + 0.2 + 1.8 + 0.8 = 2.8`,
          `E(X²) = 0 + 4(0.1) + 9(0.6) + 16(0.2) = 0.4 + 5.4 + 3.2 = 9.0`,
          `σ² = 9.0 − 2.8² = 9.0 − 7.84 = 1.16`
        ]},
        { h: `Example 3: continuous expectation (device life)`, formula: [
          `f(x) = 20000 / x³ for x ≥ 100, 0 otherwise`,
          `μ = ∫₁₀₀^∞ x · 20000/x³ dx = ∫₁₀₀^∞ 20000/x² dx = [−20000/x]₁₀₀^∞ = 0 − (−200) = 200`,
          `We expect this type of device to last, on average, 200 hours.`
        ]},
        { h: `Example 4: variance of defective parts`, formula: [
          `x:     0      1      2      3`,
          `f(x):  0.51   0.38   0.10   0.01`,
          `μ = 0(0.51) + 1(0.38) + 2(0.10) + 3(0.01) = 0.38 + 0.20 + 0.03 = 0.61`,
          `E(X²) = 0(0.51) + 1(0.38) + 4(0.10) + 9(0.01) = 0.38 + 0.40 + 0.09 = 0.87`,
          `σ² = E(X²) − μ² = 0.87 − 0.61² = 0.87 − 0.3721 = 0.4979`
        ]},
        { h: `Example 5: continuous mean and variance (water demand)`, formula: [
          `f(x) = 2(x − 1) for 1 < x < 2, 0 otherwise`,
          `μ = ∫₁² x · 2(x − 1) dx = 2[x³/3 − x²/2]₁² = 2[(8/3 − 2) − (1/3 − 1/2)] = 2[2/3 + 1/6] = 2 · 5/6 = 5/3`,
          `E(X²) = ∫₁² x² · 2(x − 1) dx = 2[x⁴/4 − x³/3]₁² = 2[(4 − 8/3) − (1/4 − 1/3)] = 2[4/3 + 1/12] = 2 · 17/12 = 17/6`,
          `σ² = 17/6 − (5/3)² = 51/18 − 50/18 = 1/18`,
          `(Asked in Exam 2023/24 Q3a.)`
        ]}
      ],
      cards: [
        [`Expectation (mean)`, `The value at which most values of the random variable are centralized; μ = E(X).`],
        [`E(X) for a discrete X`, `Σ xᵣ · f(xᵣ)`],
        [`E(X) for a continuous X`, `∫ x f(x) dx over the real line.`],
        [`E[g(X)]`, `Σ g(x) f(x) (discrete) or ∫ g(x) f(x) dx (continuous).`],
        [`Variance definition`, `σ² = E[(X − μ)²]`],
        [`Variance shortcut`, `σ² = E(X²) − μ²`],
        [`Standard deviation`, `σ = positive square root of the variance.`],
        [`μ for heads in two fair coin tosses`, `1 (on average 1 head per toss of 2 coins).`],
        [`How to find an unknown probability a`, `Use Σ f(x) = 1.`],
        [`Example 4 answer (0.51, 0.38, 0.10, 0.01)`, `μ = 0.61, E(X²) = 0.87, σ² = 0.4979.`],
        [`Device life f(x) = 20000/x³, x ≥ 100: E(X)?`, `200 hours.`],
        [`f(x) = 2(x − 1) on (1, 2): mean and variance`, `μ = 5/3, σ² = 1/18.`],
        [`Symbol μ is read`, `"Mu"`]
      ],
      qa: [
        [`Define the expectation of a discrete random variable and compute it for the number of heads in two tosses of a fair coin.`, `E(X) = μ = Σ xᵣ f(xᵣ), the value at which most values are centralized. Two tosses: f(0) = 1/4, f(1) = 1/2, f(2) = 1/4, so μ = 0(1/4) + 1(1/2) + 2(1/4) = 1.`],
        [`X takes values 1, 2, 3, 4 with probabilities 0.2, 0.1, a, 0.3. Find a, E(X) and V(X).`, `a = 1 − 0.6 = 0.4. E(X) = 0.2 + 0.2 + 1.2 + 1.2 = 2.8. E(X²) = 1(0.2) + 4(0.1) + 9(0.4) + 16(0.3) = 0.2 + 0.4 + 3.6 + 4.8 = 9.0. V(X) = 9.0 − 2.8² = 9.0 − 7.84 = 1.16.`],
        [`Define the variance and standard deviation, and give the shortcut formula.`, `σ² = E[(X − μ)²] = Σ (x − μ)² f(x) (discrete) or ∫ (x − μ)² f(x) dx (continuous). Shortcut σ² = E(X²) − μ². The standard deviation σ is the positive square root of σ².`],
        [`The weekly demand X has density f(x) = 2(x − 1) for 1 &lt; x &lt; 2. Find the mean and variance.`, `μ = 2∫₁² (x² − x) dx = 2[x³/3 − x²/2]₁² = 5/3. E(X²) = 2∫₁² (x³ − x²) dx = 2[x⁴/4 − x³/3]₁² = 17/6. σ² = 17/6 − 25/9 = 1/18.`],
        [`The number of defective parts X has f(0) = 0.51, f(1) = 0.38, f(2) = 0.10, f(3) = 0.01. Calculate σ².`, `μ = 0.38 + 0.20 + 0.03 = 0.61. E(X²) = 0.38 + 0.40 + 0.09 = 0.87. σ² = 0.87 − 0.3721 = 0.4979.`]
      ],
      quiz: [
        { q: `The Expectation in the Discrete Random Variable is:`, o: [[`Σ x · f(x)`, `Correct. For a discrete random variable μ = E(X) = Σ xᵣ · f(xᵣ) = x₁f(x₁) + … + xₙf(xₙ): each value weighted by its probability (L7, Expectation).`], [`Σ x`, `Σ x just adds the values and ignores how likely each one is. The expectation weights each value: Σ x · f(x).`], [`Σ s(x)`, `s(x) is not defined anywhere in the lecture. The expectation is Σ x · f(x), using the distribution f.`], [`Σ f(x)`, `Σ f(x) is always 1 for any distribution (condition 2 of L6), so it cannot be the mean. E(X) = Σ x · f(x).`]], a: 0, src: `Exam 2025/26, 2024/25` },
        { q: `For X with f(−1) = 0.3, f(0) = 0.1, f(1) = 0.1, f(2) = a, f(3) = 0.2, the value of a is:`, o: [[`0.2`, `With a = 0.2 the probabilities sum to 0.3 + 0.1 + 0.1 + 0.2 + 0.2 = 0.9, not 1. Σ f = 1 needs a = 0.3.`], [`0.3`, `Correct. A distribution must sum to 1: 0.3 + 0.1 + 0.1 + a + 0.2 = 1, so a = 1 − 0.7 = 0.3 (L7, Example 2).`], [`0.4`, `With a = 0.4 the total is 0.7 + 0.4 = 1.1 &gt; 1, which is not allowed. a = 1 − 0.7 = 0.3.`], [`0.1`, `With a = 0.1 the total is 0.7 + 0.1 = 0.8 &lt; 1. The probabilities must sum to 1, so a = 0.3.`]], a: 1, src: `Lecture 7 example` },
        { q: `For the same X (a = 0.3), E(X) =`, o: [[`1.6`, `1.6 comes from using +1 instead of −1: 0.3 + 0 + 0.1 + 0.6 + 0.6. The first term is (−1)(0.3) = −0.3, giving μ = 1.`], [`0.6`, `0.6 is just one term (2 × 0.3 or 3 × 0.2), not the full sum. Adding all five: −0.3 + 0 + 0.1 + 0.6 + 0.6 = 1.`], [`1`, `Correct. μ = Σ x f(x) = (−1)(0.3) + (0)(0.1) + (1)(0.1) + (2)(0.3) + (3)(0.2) = −0.3 + 0 + 0.1 + 0.6 + 0.6 = 1 (L7, Example 2).`], [`2.4`, `2.4 is the variance: E(X²) = 3.4 and σ² = 3.4 − 1² = 2.4. The expectation itself is μ = 1.`]], a: 2, src: `Lecture 7 example` },
        { q: `The variance of X is given by:`, o: [[`Σ f(x)`, `Σ f(x) = 1 for every distribution; it says nothing about spread. The variance is σ² = E(X²) − μ².`], [`E(X)²`, `E(X)² = μ² is only the term subtracted in the shortcut. The variance is E(X²) − μ², the mean of the squares minus the square of the mean.`], [`E(X) − μ`, `E(X) − μ = μ − μ = 0 for every X. The variance averages the squared deviations: E[(X − μ)²] = E(X²) − μ².`], [`E(X²) − μ²`, `Correct. σ² = E[(X − μ)²], and the lecture's shortcut is σ² = E(X²) − μ² (L7, Variance and standard deviation).`]], a: 3, src: `Lecture 7 example` },
        { q: `In Example 4 (0.51, 0.38, 0.10, 0.01 for x = 0..3), σ² =`, o: [[`0.4979`, `Correct. μ = 0.38 + 0.20 + 0.03 = 0.61, E(X²) = 0.38 + 0.40 + 0.09 = 0.87, so σ² = 0.87 − 0.61² = 0.87 − 0.3721 = 0.4979 (L7, Example 4).`], [`0.87`, `0.87 is E(X²) = 0(0.51) + 1(0.38) + 4(0.10) + 9(0.01). The variance subtracts μ² = 0.3721: 0.4979.`], [`0.3721`, `0.3721 is μ² = 0.61². The variance is E(X²) − μ² = 0.87 − 0.3721 = 0.4979.`], [`0.61`, `0.61 is the mean μ = 0.38 + 0.20 + 0.03. The variance is 0.87 − 0.61² = 0.4979.`]], a: 0, src: `Lecture 7 example` },
        { q: `A device has life density f(x) = 20000/x³ for x ≥ 100. Its expected life is:`, o: [[`20000 hours`, `20000 is just the constant in f(x). The mean is ∫₁₀₀^∞ x · 20000/x³ dx = [−20000/x]₁₀₀^∞ = 200.`], [`200 hours`, `Correct. μ = ∫₁₀₀^∞ x · 20000/x³ dx = ∫₁₀₀^∞ 20000/x² dx = [−20000/x]₁₀₀^∞ = 0 + 200 = 200 hours (L7, Example 3).`], [`Infinite`, `x · f(x) = 20000/x², whose integral from 100 to ∞ converges: [−20000/x]₁₀₀^∞ = 200. The mean is finite.`], [`100 hours`, `100 hours is the lower limit (the minimum life, where f starts). The average is ∫ x f(x) dx = 200 hours.`]], a: 1, src: `Lecture 7 example` },
        { q: `With f(x) = 2(x − 1) on 1 &lt; x &lt; 2, the variance is:`, o: [[`1/6`, `1/6 is a fraction slip. With E(X²) = 17/6 and μ = 5/3: σ² = 17/6 − 25/9 = 51/18 − 50/18 = 1/18.`], [`5/3`, `5/3 is the mean μ = ∫₁² x · 2(x − 1) dx. The variance is E(X²) − μ² = 17/6 − 25/9 = 1/18.`], [`1/18`, `Correct. μ = 5/3 and E(X²) = ∫₁² x² · 2(x − 1) dx = 17/6, so σ² = 17/6 − (5/3)² = 51/18 − 50/18 = 1/18 (L7, Example 5).`], [`17/6`, `17/6 is E(X²). The variance still needs μ² subtracted: 17/6 − (5/3)² = 1/18.`]], a: 2, src: `Lecture 7 example` },
        { q: `The standard deviation σ is:`, o: [[`The mean squared`, `The mean squared is μ², a term in the variance formula. σ is the positive square root of the variance.`], [`The square of the variance`, `Squaring the variance goes the wrong way; σ² is the variance, so σ = √(σ²), the positive square root.`], [`E(X²)`, `E(X²) is the mean of the squares, used to compute σ² = E(X²) − μ². σ is the square root of that variance.`], [`The positive square root of the variance`, `Correct. The lecture defines the standard deviation σ as the positive square root of the variance σ² (L7, Variance and standard deviation).`]], a: 3, src: `Lecture 7 example` }
      ]
    },

    /* ───────────────────────── LECTURE 8 ───────────────────────── */
    {
      n: 8, title: `Integer Arithmetic and Modular Arithmetic`,
      notes: [
        { h: `Integers, binary operations, division`, pts: [
          `The set of integers <b>Z</b> contains all integral numbers (no fraction) from negative infinity to positive infinity: {…, −2, −1, 0, 1, 2, …}.`,
          `A <b>binary operation</b> takes two inputs and creates one output. In cryptography we are interested in three: <b>addition, subtraction, multiplication</b>.`,
          `Example 2.1: 5 + 9 = 14, (−5) + 9 = 4, 5 + (−9) = −4, (−5) + (−9) = −14; 5 − 9 = −4, (−5) − 9 = −14, 5 − (−9) = 14, (−5) − (−9) = 4; 5 × 9 = 45, (−5) × 9 = −45, 5 × (−9) = −45, (−5) × (−9) = 45.`,
          `<b>Division relation</b>: <b>a = q × n + r</b>, where n is positive and r is non-negative (0 ≤ r &lt; n). a = dividend, n = divisor, q = quotient, r = remainder.`,
          `Example 2.2: a = 255, n = 11 → q = 23, r = 2 (255 = 23 × 11 + 2).`,
          `Example 2.3: a computer gives a negative r when a is negative. To make r positive: <b>decrement q by 1 and add n to r</b>. E.g. −255 ÷ 11: q = −23, r = −2 → q = −24, r = 9.`
        ]},
        { h: `Divisibility`, pts: [
          `If a ≠ 0 and r = 0 in the division relation, a = q × n. If the remainder is zero we write <b>n | a</b> (n divides a); if not zero, n ∤ a. (The slide writes a | n meaning "the divisor divides".)`,
          `Example 2.4: 4 | 32 because 32 = 8 × 4; 8 ∤ 42 because 42 = 5 × 8 + 2.`,
          `Example 2.5: 13 | 78, 7 | 98, −6 | 24, 4 | 44, 11 | (−33); 13 ∤ 27, 7 ∤ 50, −6 ∤ 23, 4 ∤ 41, 11 ∤ (−32).`,
          `<b>Property 1</b>: if a | 1, then a = ±1. <b>Property 2</b>: if a | b and b | a, then a = ±b. <b>Property 3</b>: if a | b and b | c, then a | c. <b>Property 4</b>: if a | b and a | c, then a | (m × b + n × c) for arbitrary integers m, n.`,
          `<b>Fact 1</b>: the integer 1 has only one divisor, itself. <b>Fact 2</b>: any positive integer has at least two divisors, 1 and itself (but it can have more).`
        ]},
        { h: `GCD and the Euclidean algorithm`, pts: [
          `The <b>greatest common divisor</b> of two positive integers is the largest integer that can divide both integers.`,
          `<b>Euclidean algorithm</b>: Fact 1: gcd(a, 0) = a. Fact 2: gcd(a, b) = gcd(b, r), where r is the remainder of dividing a by b.`,
          `When gcd(a, b) = 1, a and b are <b>relatively prime</b>.`,
          `Algorithm: r₁ ← a, r₂ ← b; while r₂ &gt; 0: q ← r₁ / r₂; r ← r₁ − q × r₂; r₁ ← r₂; r₂ ← r. Then gcd(a, b) = r₁.`,
          `Example 2.8: gcd(25, 60): 60 = 2 × 25 + 10; 25 = 2 × 10 + 5; 10 = 2 × 5 + 0 → gcd = 5 (the slide prints "gcd(25, 65) = 5", a typo; both equal 5).`,
          `Exam: gcd(63, 110): 110 = 1 × 63 + 47; 63 = 1 × 47 + 16; 47 = 2 × 16 + 15; 16 = 1 × 15 + 1; 15 = 15 × 1 + 0 → gcd = 1 (relatively prime).`
        ]},
        { h: `Example 2.7: gcd(2740, 1760)`, table: [
          [`q`, `r₁`, `r₂`, `r`],
          [`1`, `2740`, `1760`, `980`],
          [`1`, `1760`, `980`, `780`],
          [`1`, `980`, `780`, `200`],
          [`3`, `780`, `200`, `180`],
          [`1`, `200`, `180`, `20`],
          [`9`, `180`, `20`, `0`],
          [``, `20`, `0`, `gcd = 20`]
        ]},
        { h: `Extended Euclidean algorithm`, pts: [
          `Given a and b, find s and t such that <b>s × a + t × b = gcd(a, b)</b>. The extended algorithm computes gcd(a, b) and s, t at the same time.`,
          `Initialization: r₁ ← a, r₂ ← b; s₁ ← 1, s₂ ← 0; t₁ ← 0, t₂ ← 1.`,
          `Loop while r₂ &gt; 0: q ← r₁ / r₂; r ← r₁ − q × r₂, r₁ ← r₂, r₂ ← r; s ← s₁ − q × s₂, s₁ ← s₂, s₂ ← s; t ← t₁ − q × t₂, t₁ ← t₂, t₂ ← t.`,
          `Result: gcd(a, b) ← r₁; s ← s₁; t ← t₁.`,
          `Example 2.10: a = 17, b = 0 → gcd = 17, s = 1, t = 0. Example 2.11: a = 0, b = 45 → gcd = 45, s = 0, t = 1.`
        ]},
        { h: `Example 2.9: a = 161, b = 28`, table: [
          [`q`, `r₁`, `r₂`, `r`, `s₁`, `s₂`, `s`, `t₁`, `t₂`, `t`],
          [`5`, `161`, `28`, `21`, `1`, `0`, `1`, `0`, `1`, `−5`],
          [`1`, `28`, `21`, `7`, `0`, `1`, `−1`, `1`, `−5`, `6`],
          [`3`, `21`, `7`, `0`, `1`, `−1`, `4`, `−5`, `6`, `−23`],
          [``, `7`, `0`, ``, `−1`, `4`, ``, `6`, `−23`, ``],
          [`Result`, `gcd = 7`, ``, ``, `s = −1`, ``, ``, `t = 6`, ``, `check: (−1)(161) + 6(28) = 7`]
        ]},
        { h: `Modular arithmetic`, pts: [
          `In modular arithmetic we keep only the remainder r of a = q × n + r. The operator is <b>mod</b>; the second input n is the <b>modulus</b>; the output r is the <b>residue</b>. a mod n = r with 0 ≤ r ≤ n − 1.`,
          `Example 2.14: 27 mod 5 = 2; 36 mod 12 = 0; −18 mod 14: r = −4, add the modulus → 10; −7 mod 10: r = −7 → 3.`,
          `<b>Set of residues Zn</b> = {0, 1, 2, …, n − 1}: the set of least residues modulo n (e.g. Z₂ = {0,1}, Z₆ = {0,…,5}, Z₁₁ = {0,…,10}).`,
          `<b>Congruence</b>: in cryptography we use ≡ instead of equality, adding (mod n): 2 ≡ 12 (mod 10), 13 ≡ 23 (mod 10), 3 ≡ 8 (mod 5), 8 ≡ 13 (mod 5). a ≡ b (mod n) means a mod n = b mod n.`,
          `Example 2.15: a clock uses modulo 12 arithmetic, but writes 12 instead of 0.`
        ]},
        { h: `Operations in Zn and properties`, pts: [
          `Addition, subtraction and multiplication are defined in Zn: (a + b) mod n, (a − b) mod n, (a × b) mod n; the result is mapped to Zn with mod.`,
          `<b>First property</b>: (a + b) mod n = [(a mod n) + (b mod n)] mod n. <b>Second</b>: (a − b) mod n = [(a mod n) − (b mod n)] mod n. <b>Third</b>: (a × b) mod n = [(a mod n) × (b mod n)] mod n.`,
          `Example 2.18: 1,723,345 mod 11 = 8 and 2,124,945 mod 11 = 9, so (sum) mod 11 = (8 + 9) mod 11 = 6; (difference) mod 11 = (8 − 9) mod 11 = 10; (product) mod 11 = (8 × 9) mod 11 = 72 mod 11 = 6. (The slide prints "mod 16" on the left of lines 2 and 3; it should be mod 11.)`,
          `Example 2.19: 10ⁿ mod x = (10 mod x)ⁿ (third property n times): 10ⁿ mod 3 = 1, 10ⁿ mod 9 = 1, 10ⁿ mod 7 = 3ⁿ mod 7.`,
          `Example 2.20: an integer and the sum of its decimal digits have the same remainder mod 3 (since 10ⁿ mod 3 = 1).`,
          `Example 2.16: (14 + 7) mod 15 = 6; (7 − 11) mod 13 = −4 mod 13 = 9; (7 × 11) mod 20 = 77 mod 20 = 17.`,
          `Example 2.17: (17 + 27) mod 14 = 44 mod 14 = 2; (12 − 43) mod 13 = −31 mod 13 = −31 + 39 = 8; (123 × (−10)) mod 19 = −1230 mod 19 = −1230 + 1235 = 5. (The slide repeats the 2.16 solutions under 2.17; the correct 2.17 answers are 2, 8, 5.)`
        ]},
        { h: `Inverses`, pts: [
          `<b>Additive inverse</b>: a and b are additive inverses in Zn if a + b ≡ 0 (mod n). Every integer has one; the inverse of a is n − a. Z₁₀ pairs: (0,0), (1,9), (2,8), (3,7), (4,6), (5,5).`,
          `<b>Multiplicative inverse</b>: a and b are multiplicative inverses in Zn if a × b ≡ 1 (mod n). An integer may or may not have one; <b>b has an inverse in Zn iff gcd(n, b) = 1</b>.`,
          `Example 2.22: 8 has no inverse in Z₁₀ because gcd(10, 8) = 2 ≠ 1. Example 2.23: Z₁₀ pairs: (1,1), (3,7), (9,9); 0, 2, 4, 5, 6, 8 have no inverse.`,
          `Example 2.24, Z₁₁: (1,1), (2,6), (3,4), (5,9), (7,8), (10,10). The slide says "seven pairs" and lists (9,9), but 9 × 9 = 81 ≡ 4 (mod 11), so (9,9) is wrong: there are <b>six</b> pairs (every non-zero element appears once).`,
          `The <b>extended Euclidean algorithm</b> finds the multiplicative inverse of b in Zn when gcd(n, b) = 1: run it on (n, b); the inverse is the value of <b>t mapped to Zn</b>.`,
          `Example 2.25: inverse of 11 in Z₂₆ is <b>19</b> (11 × 19 = 209 = 8 × 26 + 1). The slide's "7 or 19" should read "−7 or 19" (−7 ≡ 19).`,
          `Example 2.26: inverse of 23 in Z₁₀₀ is <b>87</b> (23 × 87 = 2001). The slide's "13 or 87" should read "−13 or 87". Example 2.27: 12 has no inverse in Z₂₆ (gcd = 2).`
        ]},
        { h: `Example 2.25 with the extended Euclidean algorithm (n = 26, b = 11)`, table: [
          [`q`, `r₁`, `r₂`, `r`, `t₁`, `t₂`, `t`],
          [`2`, `26`, `11`, `4`, `0`, `1`, `−2`],
          [`2`, `11`, `4`, `3`, `1`, `−2`, `5`],
          [`1`, `4`, `3`, `1`, `−2`, `5`, `−7`],
          [`3`, `3`, `1`, `0`, `5`, `−7`, `26`],
          [``, `1`, `0`, ``, `−7`, `26`, ``],
          [`Result`, `gcd = 1`, ``, ``, `t = −7 → −7 mod 26 = 19`, ``, ``]
        ]}
      ],
      cards: [
        [`Division relation`, `a = q × n + r, n positive, 0 ≤ r &lt; n.`],
        [`Fixing a negative remainder`, `Decrement q by 1 and add n to r.`],
        [`255 ÷ 11`, `q = 23, r = 2`],
        [`Property 3 of divisibility`, `If a | b and b | c, then a | c.`],
        [`Property 4 of divisibility`, `If a | b and a | c, then a | (m × b + n × c).`],
        [`Fact about the integer 1`, `It has only one divisor, itself.`],
        [`GCD`, `The largest integer that divides both positive integers.`],
        [`Euclidean algorithm facts`, `gcd(a, 0) = a; gcd(a, b) = gcd(b, r), r = a mod b.`],
        [`Relatively prime`, `gcd(a, b) = 1`],
        [`Extended Euclidean algorithm finds`, `gcd(a, b) and s, t with s × a + t × b = gcd(a, b).`],
        [`mod vocabulary`, `n = modulus, output r = residue.`],
        [`Zn`, `Set of least residues modulo n: {0, 1, …, n − 1}.`],
        [`−18 mod 14`, `10`],
        [`−7 mod 10`, `3`],
        [`Additive inverse condition`, `a + b ≡ 0 (mod n)`],
        [`Multiplicative inverse exists iff`, `gcd(n, b) = 1`],
        [`Multiplicative inverse pairs in Z₁₀`, `(1,1), (3,7), (9,9)`],
        [`Inverse of 11 in Z₂₆`, `19 (t = −7 mapped to Z₂₆).`],
        [`gcd(2740, 1760)`, `20`],
        [`gcd(161, 28), s, t`, `7, s = −1, t = 6`]
      ],
      qa: [
        [`State the division relation and find q and r when 101 is divided by 11, and when −18 is divided by 14.`, `a = q × n + r with n &gt; 0 and 0 ≤ r &lt; n. 101 = 9 × 11 + 2 → q = 9, r = 2. −18: the computer gives q = −1, r = −4; decrement q and add n: q = −2, r = 10 (−18 = −2 × 14 + 10).`],
        [`State the four properties of divisibility.`, `1. If a | 1 then a = ±1. 2. If a | b and b | a then a = ±b. 3. If a | b and b | c then a | c. 4. If a | b and a | c then a | (m × b + n × c) for arbitrary integers m and n.`],
        [`Use the Euclidean algorithm to find gcd(2740, 1760).`, `2740 = 1 × 1760 + 980; 1760 = 1 × 980 + 780; 980 = 1 × 780 + 200; 780 = 3 × 200 + 180; 200 = 1 × 180 + 20; 180 = 9 × 20 + 0. gcd = 20.`],
        [`Use the extended Euclidean algorithm with a = 161, b = 28.`, `q = 5: r = 21, s = 1, t = −5. q = 1: r = 7, s = −1, t = 6. q = 3: r = 0, s = 4, t = −23. Stop: gcd = 7, s = −1, t = 6. Check: (−1)(161) + 6(28) = −161 + 168 = 7.`],
        [`Find 27 mod 5, 36 mod 12, −18 mod 14 and −7 mod 10.`, `27 = 5 × 5 + 2 → 2. 36 = 3 × 12 + 0 → 0. −18 → r = −4, add 14 → 10. −7 → r = −7, add 10 → 3.`],
        [`Define additive and multiplicative inverses in Zn. Find the multiplicative inverse of 11 in Z₂₆.`, `a, b are additive inverses if a + b ≡ 0 (mod n) (always exists: n − a). They are multiplicative inverses if a × b ≡ 1 (mod n), which exists only when gcd(n, b) = 1. For 11 in Z₂₆: gcd = 1; extended Euclid gives t = −7, mapped to Z₂₆ = 19. Check 11 × 19 = 209 = 8 × 26 + 1.`],
        [`Perform: add 17 to 27 in Z₁₄; subtract 43 from 12 in Z₁₃; multiply 123 by −10 in Z₁₉.`, `(17 + 27) mod 14 = 44 mod 14 = 2. (12 − 43) mod 13 = −31 mod 13 = 8. (123 × −10) mod 19 = −1230 mod 19 = 5 (since 19 × 65 = 1235).`]
      ],
      quiz: [
        { q: `The result of the following operation 27 mod 5 is:`, o: [[`r = 2`, `Correct. a mod n keeps the remainder of a = q × n + r: 27 = 5 × 5 + 2, so 27 mod 5 = 2 (L8, Example 2.14).`], [`r = 3`, `r = 3 would need 27 − 3 = 24 to be a multiple of 5, which it is not. 27 = 5 × 5 + 2, so r = 2.`], [`r = 1`, `r = 1 would need 26 to be a multiple of 5. The largest multiple of 5 not above 27 is 25, leaving 2.`], [`r = 4`, `r = 4 would need 23 to be a multiple of 5. 27 − 25 = 2, so the residue is 2.`]], a: 0, src: `Exam 2025/26, 2024/25, 2023/24` },
        { q: `The result of the operation 36 mod 12 is:`, o: [[`r = 0`, `Correct. 36 = 3 × 12 + 0, so 12 divides 36 exactly and 36 mod 12 = 0 (L8, Example 2.14).`], [`r = 10`, `r = 10 would need 36 − 10 = 26 to be a multiple of 12. 36 = 3 × 12 exactly, so the remainder is 0.`], [`r = 4`, `r = 4 would need 32 to be a multiple of 12. Since 36 = 3 × 12, the residue is 0.`], [`r = 6`, `r = 6 would need 30 to be a multiple of 12. 36 is itself a multiple (3 × 12), so 36 mod 12 = 0.`]], a: 0, src: `Exam 2023/24` },
        { q: `If a is not zero and we let r = 0 in the division relation, we get:`, o: [[`a = q × n`, `Correct. In the division relation a = q × n + r, setting r = 0 leaves a = q × n, i.e. n divides a (n | a) (L8, Divisibility).`], [`a = q`, `Dropping r from a = q × n + r leaves a = q × n; the factor n does not disappear. a = q only when n = 1.`], [`a = 0`, `The question says a is not zero; r = 0 means a is an exact multiple of n, a = q × n.`], [`a = n`, `a = n happens only in the special case q = 1. In general r = 0 gives a = q × n.`]], a: 0, src: `Exam 2024/25` },
        { q: `The integer 1 has only one divisor:`, o: [[`1`, `True numerically, but the lecture's wording is "itself" (Fact 1). In 2024/25 option a reads 2.`], [`its self`, `Correct. Fact 1: the integer 1 has only one divisor, itself.`], [`4`, `4 does not divide 1 (1 = 0 × 4 + 1). Fact 1 says the integer 1 has only one divisor, itself.`], [`5`, `5 does not divide 1 (remainder 1). By Fact 1 the only divisor of 1 is itself.`]], a: 1, src: `Exam 2025/26, 2024/25` },
        { q: `If a | b and b | c, then:`, o: [[`c | a`, `c | a reverses the direction: from 2 | 4 and 4 | 8 we get 2 | 8, not 8 | 2. Property 3 gives a | c.`], [`a | c`, `Correct. Property 3: if a | b and b | c, then a | c. If b = ka and c = mb, then c = (mk)a (L8, Divisibility).`], [`a = 1, b = 1`, `Nothing forces a = b = 1: for example 2 | 4 and 4 | 8 with a = 2, b = 4. The conclusion is a | c.`], [`a · b = 0`, `Divisibility does not make a product zero: with 2 | 4 and 4 | 8, a · b = 8. Property 3 gives a | c.`]], a: 1, src: `Exam 2023/24` },
        { q: `The greatest common divisor of 63 and 110 is:`, o: [[`9`, `9 divides 63 (63 = 7 × 9) but not 110 (110 = 12 × 9 + 2), so it is not a common divisor.`], [`6`, `6 does not divide 63 (63 is odd) and does not divide 110 either (110 = 18 × 6 + 2).`], [`1`, `Correct. Euclid: 110 = 1·63 + 47; 63 = 1·47 + 16; 47 = 2·16 + 15; 16 = 1·15 + 1; 15 = 15·1 + 0, so gcd = 1 (relatively prime) (L8, GCD).`], [`2`, `2 divides 110 but not 63 (63 is odd), so it is not a common divisor.`]], a: 2, src: `Exam 2020/21, 2021/22` },
        { q: `The quotient q and remainder r when 165 is divided by 18 are:`, o: [[`q = 9, r = 4`, `9 × 18 + 4 = 166, not 165. The quotient 9 is right but the remainder is 165 − 162 = 3.`], [`q = 4, r = 9`, `4 × 18 + 9 = 81, not 165; the numbers are not a valid division. 165 = 9 × 18 + 3.`], [`q = 8, r = 4`, `8 × 18 + 4 = 148, not 165. With q = 8 the remainder would be 21 ≥ 18, so q must be 9, r = 3.`], [`q = 9, r = 3`, `Correct. In a = q × n + r with 0 ≤ r &lt; n: 9 × 18 = 162 and 165 − 162 = 3, so q = 9, r = 3 (L8, Division relation).`]], a: 3, src: `Exam 2020/21, 2021/22` },
        { q: `The quotient and remainder when −32 is divided by 6 are:`, o: [[`q = −6, r = 4 (printed blurred, looks like −5)`, `Correct. −32 = (−6)(6) + 4, remainder must be non-negative.`], [`q = 6, r = 3`, `6 × 6 + 3 = 39, not −32; the sign of a is ignored. −32 = (−6)(6) + 4 with 0 ≤ r &lt; 6.`], [`q = 4, r = 5`, `4 × 6 + 5 = 29, not −32. For a negative dividend the quotient is negative: −32 = (−6)(6) + 4.`]], a: 0, src: `Exam 2021/22` },
        { q: `−18 mod 14 =`, o: [[`−4`, `−4 is the computer's negative remainder. The residue must be in Z₁₄ = {0, …, 13}, so add the modulus: −4 + 14 = 10.`], [`4`, `4 is 18 mod 14, which drops the minus sign. For −18 the raw remainder is −4, and −4 + 14 = 10.`], [`10`, `Correct. −18 = (−1)(14) − 4 gives r = −4; adding the modulus makes it non-negative: −4 + 14 = 10 (L8, Example 2.14).`], [`14`, `14 is the modulus itself, outside Z₁₄ = {0, …, 13} (14 mod 14 = 0). The residue is −4 + 14 = 10.`]], a: 2, src: `Exam 2020/21` },
        { q: `−7 mod 10 =`, o: [[`3`, `Correct. −7 gives a negative remainder r = −7, so add the modulus: −7 + 10 = 3, and −7 = (−1)(10) + 3 (L8, Example 2.14).`], [`7`, `7 is 7 mod 10, which ignores the minus sign. For −7 the residue is −7 + 10 = 3.`], [`−7`, `A residue must be in Z₁₀ = {0, …, 9}; −7 is negative, so add the modulus to get 3.`], [`0`, `0 would mean 10 divides −7, which it does not. −7 + 10 = 3.`]], a: 0, src: `Exam 2020/21` },
        { q: `gcd(2740, 1760) =`, o: [[`20`, `Correct. Euclid: remainders 980, 780, 200, 180, 20, 0; the last non-zero remainder is 20, so gcd(2740, 1760) = 20 (L8, Example 2.7).`], [`10`, `10 divides both 2740 and 1760, but 20 also divides both, so 10 is a common divisor, not the greatest.`], [`980`, `980 is only the first remainder (2740 − 1760). Euclid continues until the remainder is 0; the last non-zero one is 20.`], [`40`, `40 divides 1760 (= 44 × 40) but not 2740 (2740/40 = 68.5), so it is not a common divisor.`]], a: 0, src: `Lecture 8 example` },
        { q: `Which number has NO multiplicative inverse in Z₁₀?`, o: [[`1`, `1 is its own inverse: 1 × 1 = 1 ≡ 1 (mod 10), and gcd(10, 1) = 1.`], [`8`, `Correct. b has a multiplicative inverse in Zn only if gcd(n, b) = 1; gcd(10, 8) = 2 ≠ 1, so 8 has none (L8, Example 2.22).`], [`3`, `3 has inverse 7: 3 × 7 = 21 ≡ 1 (mod 10), since gcd(10, 3) = 1. The pair (3, 7) is in Example 2.23.`], [`9`, `9 is its own inverse: 9 × 9 = 81 ≡ 1 (mod 10). (9, 9) is one of the Z₁₀ pairs.`]], a: 1, src: `Lecture 8 example` },
        { q: `The multiplicative inverse of 11 in Z₂₆ is:`, o: [[`None`, `gcd(26, 11) = 1, so an inverse exists; the extended Euclidean algorithm finds t = −7 ≡ 19.`], [`15`, `11 × 15 = 165 = 6 × 26 + 9 ≡ 9, not 1 (mod 26). 15 is the inverse of 7 in Z₂₆, not of 11.`], [`19`, `Correct. Extended Euclid on (26, 11) gives t = −7, and −7 mod 26 = 19; check 11 × 19 = 209 = 8 × 26 + 1 ≡ 1 (L8, Example 2.25).`], [`7`, `11 × 7 = 77 ≡ 25. The slide's "7" lost its minus sign.`]], a: 2, src: `Lecture 8 example` },
        { q: `(7 − 11) mod 13 =`, o: [[`11`, `11 is just the second operand; no step gives it. (7 − 11) = −4, and −4 + 13 = 9.`], [`4`, `4 drops the minus sign of 7 − 11 = −4. Mapping −4 into Z₁₃ adds the modulus: 9.`], [`−4`, `−4 is not in Z₁₃ = {0, …, 12}; the result must be mapped with mod: −4 + 13 = 9.`], [`9`, `Correct. 7 − 11 = −4 and −4 mod 13 = −4 + 13 = 9, so (7 − 11) mod 13 = 9 (L8, Example 2.16).`]], a: 3, src: `Lecture 8 example` },
        { q: `In a mod n = r, n is called the:`, o: [[`Modulus`, `Correct. In a mod n = r the second input n is called the modulus and the output r the residue (L8, Modular arithmetic).`], [`Dividend`, `The dividend is a, the number being divided. n is the modulus (the divisor in a = q × n + r).`], [`Quotient`, `The quotient q is discarded in modular arithmetic; only r is kept. n is the modulus.`], [`Residue`, `The residue is the output r. The second input n is the modulus.`]], a: 0, src: `Lecture 8 example` },
        { q: `Additive inverse of 4 in Z₁₀:`, o: [[`−4`, `−4 is the inverse in ordinary integers but is not in Z₁₀ = {0, …, 9}; mapped into Z₁₀ it becomes 10 − 4 = 6.`], [`6`, `Correct. Additive inverses satisfy a + b ≡ 0 (mod n), so b = n − a = 10 − 4 = 6, and 4 + 6 = 10 ≡ 0 (L8, Inverses).`], [`None`, `Every element of Zn has an additive inverse, n − a. For 4 in Z₁₀ it is 6.`], [`4`, `4 + 4 = 8 ≢ 0 (mod 10). Only 0 and 5 are their own additive inverses in Z₁₀; for 4 it is 6.`]], a: 1, src: `Lecture 8 example` }
      ]
    },

    /* ───────────────────────── LECTURE 9 ───────────────────────── */
    {
      n: 9, title: `Graph Theory and Applications (Part 1)`,
      notes: [
        { h: `Graphs, edges and degree`, pts: [
          `A <b>graph</b> G = (V, E) is a pair of <b>vertices</b> (nodes) V and a set of <b>edges</b> E, assumed finite: |V| = n and |E| = m.`,
          `An edge e_k = (v_i, v_j) is <b>incident</b> with the vertices v_i and v_j.`,
          `A <b>simple</b> graph has <b>no self-loops or multiple edges</b>. A <b>multigraph</b> has multiple edges between the same pair of vertices.`,
          `The <b>degree</b> d(v) of a vertex is its number of incident edges. A <b>self-loop counts for 2</b>. An <b>isolated</b> vertex has degree 0.`,
          `<b>Proposition</b> (handshake): the sum of the degrees of G equals <b>2|E| = 2m</b>. <b>Corollary</b>: the number of vertices of odd degree is even.`,
          `A <b>null graph</b> N_n has n vertices and <b>no edges</b> (all vertices isolated).`,
          `The Königsberg bridges figure (A, B, C, D with 7 bridges) motivates degrees.`
        ]},
        { h: `Special graphs`, pts: [
          `A <b>complete graph</b> K_n is a simple graph with all B(n, 2) = n(n − 1)/2 possible edges (K₂, K₃, K₄, K₅ pictured). K_n has n(n − 1)/2 edges: K₄ = 6, K₅ = 10.`,
          `A <b>k-regular</b> graph is a simple graph whose vertices all have equal degree k (e.g. the Petersen graph is 3-regular). <b>Corollary</b>: K_n is (n − 1)-regular.`,
          `A <b>bipartite</b> graph: V = V₁ ∪ V₂ with no edges inside V₁ or inside V₂ (every edge joins V₁ to V₂). Test: find <b>2 colours that separate the edges</b> (each edge joins two different colours).`,
          `A graph containing a <b>triangle</b> (odd cycle) is <b>not bipartite</b>.`,
          `A <b>complete bipartite</b> graph K_{n₁,n₂} has all edges between V₁ and V₂: |E| = |V₁|·|V₂|. It is regular exactly when n₁ = n₂.`
        ]},
        { h: `Walks, trails, paths, cycles`, pts: [
          `A <b>walk of length k</b> from v₀ to v_k: V = {v₀, …, v_k}, E = {(v₀, v₁), …, (v_{k−1}, v_k)}, where edge j connects nodes j − 1 and j (|V| = |E| + 1).`,
          `A <b>trail</b> is a walk with all different <b>edges</b>. A <b>path</b> is a walk with all different <b>nodes</b> (hence edges).`,
          `A walk or trail is <b>closed</b> when v₀ = v_k. A <b>cycle</b> is a walk with different nodes except v₀ = v_k.`,
          `Lemmas: a walk from u to v ≠ u contains a path from u to v (eliminate subcycles); a closed walk of odd length contains a cycle of odd length.`
        ]},
        { h: `Directed graphs`, pts: [
          `In a <b>directed graph</b> (digraph) each edge has a direction. For e = (v_s, v_t), v_s is the <b>source</b> node and v_t the <b>terminal</b> node.`,
          `Each node has an <b>in-degree</b> d_in(v) and an <b>out-degree</b> d_out(v). A graph is <b>balanced</b> if d_in(v) = d_out(v) for all nodes.`,
          `A graph whose edge set is made of <b>ordered</b> pairs of vertices is a directed graph (Exam 2023/24 Q9).`
        ]},
        { h: `Topological order and acyclic graphs`, pts: [
          `A bijection f_ord : V → {1, …, n} is a <b>topological order</b> iff f_ord(i) &lt; f_ord(j) for every edge (i, j) ∈ E. Such a graph must have <b>no cycles</b>.`,
          `An <b>acyclic</b> graph is a graph without cycles. <b>Proposition</b>: every acyclic graph contains at least one node with zero in-degree. <b>Proof by contradiction</b>: if every node had a predecessor p(i), following predecessors from v₀ must eventually revisit a node (|V| is bounded), giving a cycle.`,
          `<b>Algorithm FindTopOrd(G)</b>: t := 0; G⁰ := G; while ∃ v ∈ Gᵗ with d_in(v) = 0: Gᵗ⁺¹ := Gᵗ \\ {v}; order(v) := t + 1; t := t + 1. If t = n, G is acyclic; if t &lt; n, G has a cycle.`,
          `Example: only v₄ has in-degree 0 → remove it; then v₁ and v₃ have in-degree 0; pick v₃, and so on. Final order {v₄, v₃, v₁, v₂, v₅, v₆}. Complexity: linear in the size of the graph, O(n + m), with an in-degree counter and a queue.`
        ]},
        { h: `Isomorphism`, pts: [
          `G₁ and G₂ are <b>isomorphic</b> iff there is a bijection between their nodes that makes each edge of G₁ correspond to exactly one edge of G₂, and vice versa.`,
          `One must find a label numbering that makes the graphs identical; the slide notes the general problem is believed to be hard ("NP hard").`
        ]},
        { h: `Representations: adjacency matrix, incidence matrix, edge list`, pts: [
          `<b>Adjacency matrix</b>: n × n matrix A with A(i, j) = 1 iff (i, j) ∈ E. Symmetric for undirected graphs.`,
          `<b>Incidence matrix</b> T (n × m): undirected: T(i, k) = T(j, k) = 1 iff e_k = (v_i, v_j). Directed: T(i, k) = −1 and T(j, k) = 1 iff e_k = (v_i, v_j) (−1 at the source, +1 at the terminal).`,
          `<b>Sparse representation / list of edges</b> organised by nodes, e.g. V(1) = {2, 3}, V(2) = {3}, V(3) = {4}, V(4) = ∅, V(5) = {1, 3, 4}.`,
          `The size of this representation is <b>linear</b> in m = |E|; counting bits: <b>L = (n + m) log n</b>, since log n bits represent a vertex pointer.`
        ]},
        { h: `Lecture example: undirected graph (vertices 1..5, edges a..f)`, formula: [
          `Edges: a = (1,4), b = (2,5), c = (2,3), d = (3,5), e = (3,4), f = (4,5)`,
          `Adjacency A₁ (rows/cols 1..5):`,
          `1: 0 0 0 1 0`,
          `2: 0 0 1 0 1`,
          `3: 0 1 0 1 1`,
          `4: 1 0 1 0 1`,
          `5: 0 1 1 1 0`,
          `Incidence T₁ (columns a b c d e f): 1: 1 0 0 0 0 0 | 2: 0 1 1 0 0 0 | 3: 0 0 1 1 1 0 | 4: 1 0 0 0 1 1 | 5: 0 1 0 1 0 1`,
          `Degrees: d(1) = 1, d(2) = 2, d(3) = 3, d(4) = 3, d(5) = 3 → sum 12 = 2 × 6 edges ✓`
        ]},
        { h: `Lecture example: digraph (vertices 1..4, edges e1..e5)`, formula: [
          `Edges: e1 = (1→3), e2 = (4→2), e3 = (4→3), e4 = (3→2), e5 = (2→1)`,
          `Adjacency A₂: 1: 0 0 1 0 | 2: 1 0 0 0 | 3: 0 1 0 0 | 4: 0 1 1 0`,
          `Incidence T₂ (columns e1..e5): 1: −1 0 0 0 1 | 2: 0 1 0 1 −1 | 3: 1 0 1 −1 0 | 4: 0 −1 −1 0 0`,
          `List of edges: V(1) = {3}, V(2) = {1}, V(3) = {2}, V(4) = {2, 3}`
        ]}
      ],
      cards: [
        [`Graph G = (V, E)`, `A pair: a finite set of vertices V (|V| = n) and a set of edges E (|E| = m).`],
        [`Incident`, `Edge e_k = (v_i, v_j) is incident with v_i and v_j.`],
        [`Simple graph`, `No self-loops and no multiple edges.`],
        [`Multigraph`, `Multiple edges between the same pair of vertices.`],
        [`Null graph N_n`, `n vertices and no edges.`],
        [`Degree d(v)`, `Number of incident edges; a self-loop counts 2.`],
        [`Isolated vertex`, `Degree 0.`],
        [`Handshake proposition`, `Σ d(v) = 2|E| = 2m; the number of odd-degree vertices is even.`],
        [`Complete graph K_n`, `Simple graph with all n(n − 1)/2 edges; it is (n − 1)-regular.`],
        [`k-regular graph`, `Simple graph with all vertices of degree k.`],
        [`Bipartite graph`, `V = V₁ ∪ V₂ with edges only between V₁ and V₂; 2 colours separate the edges. A triangle makes it non-bipartite.`],
        [`Complete bipartite K_{n₁,n₂}`, `All edges between V₁ and V₂; |E| = n₁·n₂; regular iff n₁ = n₂.`],
        [`Walk / trail / path / cycle`, `Walk: sequence of edges; trail: distinct edges; path: distinct nodes; cycle: distinct nodes except v₀ = v_k.`],
        [`Digraph source / terminal`, `For e = (v_s, v_t): v_s source, v_t terminal.`],
        [`Balanced digraph`, `d_in(v) = d_out(v) for every node.`],
        [`Topological order`, `Bijection f_ord with f_ord(i) &lt; f_ord(j) for every edge (i, j); exists only if the graph is acyclic.`],
        [`Every acyclic graph has…`, `At least one node with zero in-degree.`],
        [`Isomorphic graphs`, `A bijection of nodes mapping each edge of G₁ to exactly one edge of G₂ and vice versa.`],
        [`Adjacency matrix`, `n × n, A(i, j) = 1 iff (i, j) ∈ E.`],
        [`Directed incidence matrix`, `T(i, k) = −1 at the source, T(j, k) = 1 at the terminal of e_k.`]
      ],
      qa: [
        [`Define: graph, incident, simple graph, degree, isolated vertex. State the handshake proposition and its corollary.`, `G = (V, E): a finite set of vertices and a set of edges, |V| = n, |E| = m. Edge (v_i, v_j) is incident with v_i and v_j. A simple graph has no self-loops or multiple edges. The degree d(v) is the number of incident edges (a self-loop counts 2); an isolated vertex has degree 0. Σ d(v) = 2|E| = 2m; corollary: the number of vertices of odd degree is even.`],
        [`Define complete, k-regular, bipartite and complete bipartite graphs. When is a complete bipartite graph regular?`, `K_n: simple graph with all n(n − 1)/2 edges (it is (n − 1)-regular). k-regular: simple graph with every vertex of degree k. Bipartite: V = V₁ ∪ V₂ with no edges inside V₁ or V₂. Complete bipartite K_{n₁,n₂}: all edges between V₁ and V₂, |E| = |V₁|·|V₂|. Vertices in V₁ have degree n₂ and in V₂ degree n₁, so it is regular iff n₁ = n₂.`],
        [`Define walk, trail, path, closed walk and cycle.`, `A walk of length k from v₀ to v_k is a sequence of nodes v₀, …, v_k with edges (v_{j−1}, v_j). A trail is a walk with all different edges. A path is a walk with all different nodes. A walk/trail is closed if v₀ = v_k. A cycle is a walk with different nodes except v₀ = v_k.`],
        [`Prove that every acyclic digraph has a node with zero in-degree, and describe FindTopOrd.`, `By contradiction: if d_in(v) &gt; 0 for all v, each node i has a predecessor p(i). Starting from v₀ form v₁ = p(v₀), v₂ = p(v₁), …; since |V| is finite a node must repeat, which gives a cycle, contradicting acyclicity. FindTopOrd repeatedly removes a node of in-degree 0 and gives it the next order number t + 1; if all n nodes are removed (t = n) G is acyclic and the removal order is a topological order; if it stops with t &lt; n, G has a cycle.`],
        [`Consider the digraph with edges 5→1, 1→2, 2→3, 1→3, 5→3, 5→4, 3→4. Find the adjacency matrix and the list of edges.`, `Adjacency (rows 1..5): 1: 0 1 1 0 0; 2: 0 0 1 0 0; 3: 0 0 0 1 0; 4: 0 0 0 0 0; 5: 1 0 1 1 0. List: V(1) = {2, 3}, V(2) = {3}, V(3) = {4}, V(4) = ∅, V(5) = {1, 3, 4}.`],
        [`Explain the adjacency matrix, incidence matrix and sparse (list) representation of a graph.`, `Adjacency: n × n, A(i, j) = 1 iff (i, j) ∈ E. Incidence: n × m; undirected T(i, k) = T(j, k) = 1 iff e_k = (v_i, v_j); directed T(i, k) = −1 and T(j, k) = 1. Sparse: for each node, the list of its out-neighbours; its size is linear in m, about L = (n + m) log n bits.`]
      ],
      quiz: [
        { q: `The null graph of n vertices is denoted by N_n has:`, o: [[`no edges`, `Correct. A null graph N_n has n vertices and no edges at all, so every vertex is isolated with degree 0 (L9, Graphs, edges and degree).`], [`one edge`, `A null graph has no edges at all; with even one edge two vertices would have degree 1 and not be isolated.`], [`2 edges`, `The defining property of N_n is that the edge set is empty, so it has 0 edges, not 2.`], [`3 edges`, `N_n has 0 edges whatever n is. A graph with 3 edges (e.g. a triangle) is not null.`]], a: 0, src: `Exam 2025/26, 2024/25` },
        { q: `The graph has no edges, and the n vertices is denoted by N_n is:`, o: [[`null graph`, `Correct. The lecture defines the null graph N_n as a graph on n vertices with no edges (all vertices isolated) (L9, Graphs, edges and degree).`], [`simple graph`, `A simple graph only forbids self-loops and multiple edges; it may have many edges (K_n is simple). No edges is a null graph.`], [`multi-graph`, `A multigraph has multiple edges between the same pair of vertices, the opposite of having no edges.`], [`cycle graph`, `A cycle graph on n vertices has n edges forming a closed loop. A graph with no edges is the null graph.`]], a: 0, src: `Exam 2023/24` },
        { q: `The Multi Graph is a graph having multiple edges between the same set of vertices; the graph having:`, o: [[`multiple edges`, `Correct. A multigraph allows multiple edges between the same pair of vertices; a simple graph forbids them (L9, Graphs, edges and degree).`], [`no edge`, `A graph with no edges is the null graph N_n. A multigraph is defined by having multiple (parallel) edges.`], [`no loop`, `"No loop" is part of the definition of a simple graph. A multigraph is defined by repeated edges between the same vertices.`], [`no vertices`, `A graph with no vertices cannot have any edges at all, let alone multiple ones. A multigraph has multiple edges.`]], a: 0, src: `Exam 2025/26, 2024/25` },
        { q: `In the graph G(V, E), when the edge set is made of ordered vertex pairs, it is called:`, o: [[`directed graph`, `Correct. When edges are ordered pairs (v_s, v_t), each edge has a direction from source to terminal: a directed graph (L9, Directed graphs).`], [`undirected graph`, `In an undirected graph the edges are unordered pairs: (u, v) and (v, u) are the same edge. Ordered pairs give a digraph.`], [`null graph`, `A null graph has an empty edge set, so its edges are neither ordered nor unordered pairs.`], [`multi graph`, `A multigraph is about repeated edges between the same vertices, not about the order of the pair.`]], a: 0, src: `Exam 2023/24` },
        { q: `In a graph, a self-loop contributes how much to the degree of its vertex?`, o: [[`0`, `A self-loop is incident with its vertex at both ends, so it is counted twice, not ignored. The lecture says it counts for 2.`], [`Depends on the graph`, `The rule does not depend on the graph: a self-loop always counts for 2, keeping Σ d(v) = 2|E| true.`], [`2`, `Correct. Both ends of a self-loop are at the same vertex, so the lecture counts it as 2 in d(v); this keeps Σ d(v) = 2|E| (L9, Graphs, edges and degree).`], [`1`, `Counting a loop once would break the handshake rule Σ d(v) = 2|E|, since each edge must add 2. A loop counts for 2.`]], a: 2, src: `Lecture 9 example` },
        { q: `The sum of the degrees of all vertices of G equals:`, o: [[`|V| + |E|`, `|V| + |E| mixes vertices into the sum, but vertices add nothing on their own (an isolated vertex has degree 0). Σ d(v) = 2|E|.`], [`|V|`, `|V| counts vertices; a null graph has |V| = n but degree sum 0. The sum depends only on the edges: 2|E|.`], [`|E|`, `Each edge has two ends and adds 1 to the degree of each, so it is counted twice: Σ d(v) = 2|E|, not |E|.`], [`2|E|`, `Correct. Handshake proposition: each edge adds 1 to the degree of both endpoints, so Σ d(v) = 2|E| = 2m (L9, Graphs, edges and degree).`]], a: 3, src: `Lecture 9 example` },
        { q: `The complete graph K₅ has how many edges?`, o: [[`10`, `Correct. K_n has an edge between every pair: B(n, 2) = n(n − 1)/2, so K₅ has 5 × 4 / 2 = 10 edges (L9, Special graphs).`], [`5`, `5 edges is a cycle C₅ (each vertex degree 2). In K₅ each vertex has degree 4: 5 × 4 / 2 = 10.`], [`20`, `20 = 5 × 4 counts each edge twice, once from each end. Dividing by 2 gives 10.`], [`25`, `25 = 5² counts all ordered pairs including a vertex with itself. Unordered distinct pairs: 5 × 4 / 2 = 10.`]], a: 0, src: `Lecture 9 example` },
        { q: `The complete graph K_n is:`, o: [[`2-regular`, `Only K₃ (the triangle) is 2-regular. In K_n each vertex joins the other n − 1, so it is (n − 1)-regular.`], [`(n − 1)-regular`, `Correct. In K_n each vertex is joined to every other vertex, n − 1 of them, so all degrees equal n − 1 (L9, corollary in Special graphs).`], [`n-regular`, `K_n is simple, so a vertex has no loop to itself; it is adjacent only to the other n − 1 vertices.`], [`not regular`, `Every vertex of K_n has the same degree n − 1, so it is regular by definition.`]], a: 1, src: `Lecture 9 example` },
        { q: `A graph that contains a triangle is:`, o: [[`a tree`, `A tree has no cycles, and a triangle is a cycle of length 3, so a graph containing one cannot be a tree.`], [`always bipartite`, `With 2 colours, two corners of a triangle must share a colour, and they are joined by an edge. So it is never bipartite.`], [`not bipartite`, `Correct. A triangle is an odd cycle: 2 colours cannot separate all three of its edges, so the lecture says such a graph is not bipartite (L9, Special graphs).`], [`complete`, `A triangle can sit inside a larger graph with missing edges (e.g. a triangle plus an isolated vertex), so the graph need not be complete.`]], a: 2, src: `Lecture 9 example` },
        { q: `A path is a walk with:`, o: [[`all different edges only`, `A walk with all different edges is a trail; vertices may still repeat. A path needs all different nodes.`], [`v₀ = v_k`, `v₀ = v_k makes the walk closed (a cycle if the other nodes differ). A path has all nodes different, so its ends differ.`], [`repeated nodes`, `Repeated nodes are exactly what a path forbids; a walk with repeated nodes may be a trail or a closed walk.`], [`all different nodes`, `Correct. The lecture defines a path as a walk whose nodes are all different (and hence its edges too) (L9, Walks, trails, paths, cycles).`]], a: 3, src: `Lecture 9 example` },
        { q: `A digraph is balanced if:`, o: [[`d_in(v) = d_out(v) for all nodes`, `Correct. A digraph is balanced when every node has as many edges coming in as going out: d_in(v) = d_out(v) for all v (L9, Directed graphs).`], [`all degrees are equal`, `All degrees equal is the definition of a k-regular graph. Balanced compares the in-degree and out-degree of each node.`], [`it has no cycles`, `No cycles means acyclic. A balanced digraph actually has cycles whenever it has edges, since every node can be left after entering.`], [`it has a topological order`, `A topological order exists exactly when the graph is acyclic. Balanced is about d_in(v) = d_out(v).`]], a: 0, src: `Lecture 9 example` },
        { q: `In FindTopOrd, if the loop ends with t &lt; n then:`, o: [[`G is acyclic`, `G is acyclic when the loop removes all n nodes, t = n. Stopping early (t &lt; n) means no remaining node has in-degree 0.`], [`G has a cycle`, `Correct. Every acyclic graph has a node of in-degree 0; if the algorithm stops with t &lt; n nodes removed, the remaining graph has none, so it contains a cycle (L9, FindTopOrd).`], [`G is complete`, `FindTopOrd only tests for cycles via in-degree 0 nodes; it says nothing about every pair being joined (complete).`], [`G is bipartite`, `Bipartiteness is tested with 2 colours. FindTopOrd stopping with t &lt; n tells you the graph has a cycle.`]], a: 1, src: `Lecture 9 example` },
        { q: `The bit size of the sparse (edge-list) representation is:`, o: [[`n²`, `n² is the size of the adjacency matrix (n × n entries). The edge-list size is linear in m: (n + m) log n bits.`], [`m log m`, `Each stored item is a vertex pointer of log n bits (not log m), and the n node headers must also be counted: (n + m) log n.`], [`(n + m) log n`, `Correct. The edge list stores n node entries and m edges, each a vertex pointer of log n bits: L = (n + m) log n (L9, Representations).`], [`n × m`, `n × m is the size of the incidence matrix (one row per vertex, one column per edge). The edge list uses (n + m) log n bits.`]], a: 2, src: `Lecture 9 example` },
        { q: `In a directed incidence matrix, the source vertex of e_k gets:`, o: [[`0`, `0 means the vertex is not incident with e_k. The source is incident, so it gets a non-zero entry, −1.`], [`1`, `+1 marks the terminal vertex v_t. The lecture's convention gives the source −1.`], [`2`, `2 is never used in the directed incidence matrix (only −1, 0, 1). The source gets −1.`], [`−1`, `Correct. Directed incidence matrix: T(i, k) = −1 and T(j, k) = 1 when e_k = (v_i, v_j), so −1 at the source and +1 at the terminal (L9, Representations).`]], a: 3, src: `Lecture 9 example` }
      ]
    },

    /* ───────────────────────── LECTURE 10 ───────────────────────── */
    {
      n: 10, title: `Graph Matrices`,
      notes: [
        { h: `Why matrices?`, pts: [
          `A graph is completely determined by its <b>adjacency</b> structure or its <b>incidence</b> structure. These specifications are far more efficient than a picture for large graphs, and computers handle numbers better than pictures, so graphs are given to a computer in <b>matrix form</b>.`,
          `Matrices covered: incidence matrix A(G), modified (oriented) incidence matrix F, cycle matrix B(G), cut-set matrix C(G), fundamental cut-set matrix C_f, path matrix P(u, v), adjacency matrix X, degree matrix H.`
        ]},
        { h: `10.1 Incidence matrix A(G)`, pts: [
          `G with n vertices, m edges and <b>no self-loops</b>: A = [a_ij] is <b>n × m</b>; rows = vertices, columns = edges; a_ij = 1 if the jth edge is incident on the ith vertex, 0 otherwise. Also called the <b>vertex-edge incidence matrix</b>. It is a binary (0, 1)-matrix.`,
          `<b>Observations</b>: (1) every edge is incident on exactly two vertices, so <b>each column has exactly two ones</b>; (2) the number of ones in a row = the <b>degree</b> of that vertex; (3) a row of all zeros = an <b>isolated vertex</b>; (4) <b>parallel edges</b> give identical columns; (5) a disconnected graph with components G₁, G₂ has a <b>block diagonal</b> form [A(G₁) 0; 0 A(G₂)]; (6) permuting rows or columns = relabelling vertices and edges.`,
          `A is defined over <b>GF(2)</b>: {0, 1} with addition mod 2 (1 + 1 = 0) and multiplication mod 2.`,
          `<b>Theorem 10.1</b>: G₁ and G₂ are isomorphic iff A(G₁) and A(G₂) differ only by permutations of rows and columns.`
        ]},
        { h: `Rank results for A(G)`, pts: [
          `The modulo-2 sum of all rows is 0 (two ones per column), so the rows are dependent and rank A ≤ n − 1.`,
          `<b>Theorem 10.2</b>: if G is connected with n vertices, <b>rank A(G) = n − 1</b>. <b>Remark</b>: with k components, rank A(G) = n − k.`,
          `Deleting any one row gives the <b>reduced incidence matrix A_f</b> ((n − 1) × m); the deleted vertex is the <b>reference vertex</b>. n − 1 rows specify the graph completely because the missing row can be rebuilt (each column has two ones).`,
          `<b>Theorem 10.3</b>: the reduced incidence matrix of a <b>tree</b> is non-singular (square of order n − 1 with rank n − 1). An (n − 1) × (n − 1) reduced incidence matrix is non-singular iff the graph is a tree.`,
          `<b>Theorem 10.4</b>: an (n − 1) × (n − 1) submatrix of A(G) (G connected) is non-singular iff its n − 1 edges form a <b>spanning tree</b>.`
        ]},
        { h: `Modified incidence matrix F (oriented edges)`, pts: [
          `Orient each edge e_j = (v_i, v_k) arbitrarily: f_ij = 1 if v_i is the positive end, −1 if the negative end, 0 if not incident. F is obtained from A by changing one of the two 1s in every column to −1.`,
          `<b>Theorem 10.5</b>: G connected → rank F = n − 1. <b>Theorem 10.6</b>: k components → rank F = n − k.`,
          `<b>Theorem 10.7</b>: the determinant of any square submatrix of F is 1, −1 or 0.`,
          `Example (Fig. 10.2): A rows v1: 1 0 0 1 0, v2: 1 1 0 0 1, v3: 0 1 1 0 0, v4: 0 0 1 1 1 → F rows v1: 1 0 0 1 0, v2: −1 1 0 0 1, v3: 0 −1 1 0 0, v4: 0 0 −1 −1 −1.`
        ]},
        { h: `10.3 Cycle matrix B(G)`, pts: [
          `G with m edges and q different cycles: B = [b_ij] is <b>q × m</b>, b_ij = 1 if the ith cycle includes the jth edge, else 0.`,
          `Example G₁: cycles Z1 = {e1, e2}, Z2 = {e3, e5, e7}, Z3 = {e4, e6, e7}, Z4 = {e3, e4, e6, e5}.`,
          `<b>Observations</b>: (1) a column of all zeros = an edge in no cycle (non-cycle edge); (2) each row is a cycle vector; (3) a self-loop gives a row with a single one; (4) ones in a row = edges in that cycle; (5) separable/disconnected graph → block diagonal form; (6) permuting rows/columns relabels cycles/edges; (7) two graphs have the same cycle matrix iff they are <b>2-isomorphic</b>, so B does not specify a graph completely.`,
          `<b>Theorem 10.9</b>: with no self-loops and the same edge order, every row of B is orthogonal to every row of A: <b>A Bᵀ = B Aᵀ ≡ 0 (mod 2)</b>.`,
          `<b>Theorem 10.10</b>: connected G → <b>rank B = m − n + 1</b>. <b>Theorem 10.11</b>: k components → rank B = m − n + k.`
        ]},
        { h: `10.4 – 10.6 Cut-set matrices`, pts: [
          `G with m edges and q cut-sets: C = [c_ij] is q × m, c_ij = 1 if the ith cut-set contains the jth edge.`,
          `For a non-separable graph, C(G) contains A(G) as rows, so rank C ≥ n − 1.`,
          `A cut-set and a cycle always share an even number of edges, so <b>B Cᵀ = C Bᵀ ≡ 0 (mod 2)</b>.`,
          `<b>Theorem 10.14</b>: for connected G, rank C(G) = rank A(G) = n − 1 (the rank of the graph).`,
          `<b>Fundamental cut-set matrix</b> C_f: (n − 1) × m, rows = fundamental cut-sets w.r.t. a spanning tree; C_f = [C_c : I_{n−1}] (identity on the n − 1 branches, C_c on the m − n + 1 chords).`
        ]},
        { h: `10.7 Path matrix P(u, v)`, pts: [
          `For vertices u, v with q different paths: P(u, v) = [p_ij] is q × m, p_ij = 1 if the jth edge lies in the ith path.`,
          `Example: paths between v3 and v4: p1 = {e8, e5}, p2 = {e8, e7, e3}, p3 = {e8, e6, e4, e3}.`,
          `<b>Observations</b>: (1) a column of all zeros = an edge in no u–v path; (2) a column of all ones = an edge in every u–v path; (3) no row is all zeros; (4) the ring sum of two rows is a cycle or an edge-disjoint union of cycles.`,
          `<b>Theorem 10.15</b>: A Pᵀ(u, v) = M (mod 2), where M has ones only in rows u and v.`
        ]},
        { h: `10.8 Adjacency matrix X`, pts: [
          `G with no parallel edges: X = [x_ij] is <b>n × n symmetric binary</b>, x_ij = 1 if v_i v_j ∈ E, else 0.`,
          `An <b>edge sequence</b>: each edge (except first and last) shares one vertex with the edge before and one with the edge after; edges may repeat. Walks and paths are edge sequences.`,
          `<b>Theorem 10.16</b>: [Xᵏ]_ij = number of different edge sequences of length k between v_i and v_j.`,
          `<b>Theorem 10.17</b>: G is connected iff Y = X + X² + … + Xⁿ⁻¹ has no zero entries off the main diagonal.`,
          `<b>Theorem 10.18</b>: in a connected graph, d(v_i, v_j) = k iff k is the smallest integer with [Xᵏ]_ij ≠ 0.`,
          `<b>Degree matrix</b> H: diagonal with h_ii = d_i. <b>Theorem 10.19</b>: <b>F Fᵀ = H − X</b> (independent of orientation).`,
          `<b>Matrix-tree theorem (10.21)</b>: with Q = F Fᵀ = H − X, every cofactor of Q equals τ(G), the number of spanning trees (complexity). <b>Corollary</b>: τ(K_n) = nⁿ⁻² (e.g. K₄ has 16 spanning trees).`
        ]},
        { h: `Worked example: incidence and adjacency of a small graph`, formula: [
          `Triangle v1 v2 v3 with edges e1 = v1v2, e2 = v2v3, e3 = v1v3`,
          `A (incidence):  v1: 1 0 1 | v2: 1 1 0 | v3: 0 1 1   (each column has two 1s; row sums = degrees 2, 2, 2)`,
          `X (adjacency):  v1: 0 1 1 | v2: 1 0 1 | v3: 1 1 0`,
          `H − X = [2 −1 −1; −1 2 −1; −1 −1 2]; a cofactor, e.g. det[2 −1; −1 2] = 4 − 1 = 3 = τ(K₃) = 3³⁻² ✓`,
          `rank A = n − 1 = 2 (connected); rank B = m − n + 1 = 3 − 3 + 1 = 1 (one cycle)`
        ]}
      ],
      cards: [
        [`Incidence matrix A(G)`, `n × m (0,1)-matrix; a_ij = 1 if edge j is incident on vertex i.`],
        [`Ones in each column of A(G)`, `Exactly two.`],
        [`Ones in a row of A(G)`, `The degree of that vertex.`],
        [`Row of zeros in A(G)`, `Isolated vertex.`],
        [`Identical columns in A(G)`, `Parallel edges.`],
        [`rank A(G), G connected`, `n − 1 (n − k with k components).`],
        [`Reduced incidence matrix`, `A with one row (the reference vertex) deleted: (n − 1) × m.`],
        [`Reduced incidence matrix of a tree`, `Non-singular.`],
        [`(n−1)×(n−1) submatrix of A non-singular iff`, `Its edges form a spanning tree.`],
        [`Cycle matrix B(G)`, `q × m; b_ij = 1 if cycle i contains edge j.`],
        [`rank B, G connected`, `m − n + 1 (m − n + k with k components).`],
        [`A Bᵀ =`, `0 (mod 2)`],
        [`Same cycle matrix means`, `The graphs are 2-isomorphic.`],
        [`rank C(G), G connected`, `n − 1 (same as rank A).`],
        [`Path matrix P(u, v)`, `q × m; p_ij = 1 if edge j lies in the ith u–v path.`],
        [`[Xᵏ]_ij`, `Number of edge sequences of length k between v_i and v_j.`],
        [`Connectivity test with X`, `Y = X + … + Xⁿ⁻¹ has no zero off-diagonal entries.`],
        [`F Fᵀ =`, `H − X (degree minus adjacency).`],
        [`Matrix-tree theorem`, `Every cofactor of Q = H − X equals τ(G), the number of spanning trees.`],
        [`τ(K_n)`, `nⁿ⁻²`]
      ],
      qa: [
        [`Define the incidence matrix of a graph and list its observations.`, `For G with n vertices, m edges and no self-loops, A = [a_ij] is n × m with a_ij = 1 if edge j is incident on vertex i, else 0. (1) Each column has exactly two ones. (2) Row sums are degrees. (3) A zero row is an isolated vertex. (4) Parallel edges give identical columns. (5) A disconnected graph gives a block-diagonal matrix. (6) Permuting rows/columns relabels vertices/edges.`],
        [`State and explain the rank of the incidence matrix of a connected graph.`, `rank A(G) = n − 1. Over GF(2) the sum of all rows is zero (each column has two ones), so rank ≤ n − 1. Since G is connected, no proper subset of rows sums to zero (A cannot be split into blocks), so any n − 1 rows are independent: rank = n − 1. With k components the rank is n − k.`],
        [`Define the cycle matrix and give its rank and its relation with the incidence matrix.`, `B = [b_ij] is q × m, b_ij = 1 if the ith cycle contains edge j. For a graph without self-loops with the same edge order, A Bᵀ ≡ 0 (mod 2). For connected G, rank B = m − n + 1 (m − n + k for k components). Graphs with the same cycle matrix are 2-isomorphic.`],
        [`What does [Xᵏ]_ij represent? How do you test connectivity and distance using X?`, `[Xᵏ]_ij counts edge sequences of length k from v_i to v_j. G is connected iff Y = X + X² + … + Xⁿ⁻¹ has no zero off-diagonal entries. The distance d(v_i, v_j) is the smallest k with [Xᵏ]_ij ≠ 0.`],
        [`State the matrix-tree theorem and use it for K_n.`, `If X, F, H are the adjacency, modified incidence and degree matrices of connected G and Q = F Fᵀ = H − X, then adj Q = τ(G)·J, i.e. every cofactor of Q equals the number of spanning trees τ(G). For K_n, Q = nI − J and τ(K_n) = nⁿ⁻².`]
      ],
      quiz: [
        { q: `In the incidence matrix of a graph without self-loops, each column contains:`, o: [[`exactly two 1s`, `Correct. Each column is an edge, and without self-loops every edge is incident on exactly two vertices, so each column has exactly two 1s (L10, 10.1 Observation 1).`], [`exactly one 1`, `An edge has two end vertices, so its column has two 1s; one 1 would need an edge with a single end.`], [`a number of 1s equal to the degree`, `The number of 1s equal to the degree describes a row (a vertex), not a column. Each column has exactly two 1s.`], [`all zeros`, `Every column is a real edge with two endpoints, so it always has two 1s. All-zero rows (not columns) mean isolated vertices.`]], a: 0, src: `Lecture 10 example` },
        { q: `The rank of the incidence matrix of a connected graph with n vertices is:`, o: [[`m − n + 1`, `m − n + 1 is the rank of the cycle matrix B(G) (Theorem 10.10), not of the incidence matrix.`], [`n − 1`, `Correct. Theorem 10.2: for connected G with n vertices, rank A(G) = n − 1; the mod-2 sum of all rows is 0, so they cannot all be independent (L10).`], [`n`, `Each column has two 1s, so the mod-2 sum of all n rows is 0 and the rows are dependent: rank ≤ n − 1. It equals n − 1 when connected.`], [`m`, `m is the number of columns (edges), but the rank cannot exceed the number of independent rows, n − 1 for a connected graph.`]], a: 1, src: `Lecture 10 example` },
        { q: `For a connected graph with n vertices and m edges, the rank of the cycle matrix is:`, o: [[`m`, `m is the number of edges (columns of B). Only m − n + 1 cycles are independent (the chords of a spanning tree).`], [`n − 1`, `n − 1 is rank A(G), the incidence matrix (Theorem 10.2). The cycle matrix has rank m − n + 1.`], [`m − n + 1`, `Correct. Theorem 10.10: for a connected graph, rank B(G) = m − n + 1, the number of chords of a spanning tree (L10, 10.3 Cycle matrix).`], [`m − n + k`, `m − n + k is Theorem 10.11 for a graph with k components. Connected means k = 1, giving m − n + 1.`]], a: 2, src: `Lecture 10 example` },
        { q: `Parallel edges in a graph produce in its incidence matrix:`, o: [[`a zero row`, `A zero row means a vertex with no incident edges, an isolated vertex (Observation 3), not parallel edges.`], [`identical rows`, `Rows are vertices; parallel edges join the same two vertices, so their two columns are equal, not rows.`], [`a −1 entry`, `A is a binary 0/1 matrix; −1 appears only in the modified (oriented) incidence matrix F.`], [`identical columns`, `Correct. Parallel edges have the same two end vertices, so their columns have 1s in the same rows: identical columns (L10, 10.1 Observation 4).`]], a: 3, src: `Lecture 10 example` },
        { q: `A row of all zeros in the incidence matrix represents:`, o: [[`an isolated vertex`, `Correct. A row lists the edges incident on a vertex; all zeros means no edges touch it, an isolated vertex (L10, 10.1 Observation 3).`], [`a self-loop`, `A(G) is defined for graphs with no self-loops, so a loop cannot appear. A zero row means an isolated vertex.`], [`a cycle`, `Cycles are described by the cycle matrix B(G). A zero row of A means a vertex with degree 0.`], [`a bridge`, `A bridge is an edge, so it would be a column with two 1s. A zero row means an isolated vertex.`]], a: 0, src: `Lecture 10 example` },
        { q: `The number of spanning trees of K₄ is:`, o: [[`64`, `64 = 4³ uses exponent n − 1. The corollary of the matrix-tree theorem is τ(K_n) = nⁿ⁻² = 4² = 16.`], [`16`, `Correct. By the matrix-tree theorem corollary τ(K_n) = nⁿ⁻², so τ(K₄) = 4⁴⁻² = 4² = 16 (L10, 10.8).`], [`4`, `4 is the number of vertices (or 4¹). The formula is nⁿ⁻² = 4² = 16.`], [`8`, `8 = 2³ does not come from nⁿ⁻². K₄ has 4⁴⁻² = 16 spanning trees.`]], a: 1, src: `Lecture 10 example` },
        { q: `[X³]_ij (X = adjacency matrix) equals:`, o: [[`the distance between v_i and v_j`, `Distance is the smallest k with a non-zero entry.`], [`the degree of v_i`, `The degree of v_i is the diagonal entry [X²]_ii (sequences of length 2 out and back). [X³]_ij counts length-3 sequences.`], [`the number of edge sequences of length 3 from v_i to v_j`, `Correct. Theorem 10.16: [Xᵏ]_ij is the number of different edge sequences of length k between v_i and v_j, so k = 3 counts length-3 sequences (L10, 10.8).`], [`always 0 or 1`, `[X³]_ij counts edge sequences, which can be any non-negative integer (in K₄, [X³]_12 = 7), not just 0 or 1.`]], a: 2, src: `Lecture 10 example` },
        { q: `F Fᵀ, where F is the modified incidence matrix, equals:`, o: [[`A Bᵀ`, `A Bᵀ is the product of incidence and cycle matrices, which is 0 (mod 2) by Theorem 10.9. F Fᵀ is H − X.`], [`X²`, `X² has non-negative entries counting length-2 sequences; F Fᵀ has −1 for adjacent vertices and degrees on the diagonal: H − X.`], [`H + X`, `In F Fᵀ two adjacent vertices are the +1 and −1 ends of an edge, so off-diagonal entries are −1: H − X, not H + X.`], [`H − X`, `Correct. Theorem 10.19: F Fᵀ = H − X, degrees on the diagonal and −1 for each adjacent pair, whatever the orientation (L10, 10.8).`]], a: 3, src: `Lecture 10 example` },
        { q: `The reduced incidence matrix of a graph with n vertices and n − 1 edges is non-singular iff the graph is:`, o: [[`a tree`, `Correct. Theorem 10.3: an (n − 1) × (n − 1) reduced incidence matrix is non-singular iff the graph is a tree (n − 1 edges, connected) (L10).`], [`complete`, `A complete graph K_n has n(n − 1)/2 edges, more than n − 1 for n ≥ 4, so its matrix is not this square shape. Non-singular needs a tree.`], [`disconnected`, `With k ≥ 2 components the rank is n − k &lt; n − 1, so the matrix is singular. Non-singular needs a tree.`], [`bipartite`, `Bipartiteness is not the criterion: a bipartite graph with n − 1 edges and a cycle is disconnected and singular. Theorem 10.3 requires a tree.`]], a: 0, src: `Lecture 10 example` },
        { q: `Two graphs have the same cycle matrix iff they are:`, o: [[`regular`, `Regularity (equal degrees) has nothing to do with the cycle matrix. Same cycle matrix iff 2-isomorphic (Observation 7).`], [`2-isomorphic`, `Correct. Observation 7: two graphs have the same cycle matrix iff they are 2-isomorphic, so B(G) does not specify a graph completely (L10, 10.3).`], [`complete`, `Completeness is unrelated. The lecture says the same cycle matrix holds exactly for 2-isomorphic graphs.`], [`isomorphic`, `Isomorphic graphs do share a cycle matrix, but so do 2-isomorphic graphs that are not isomorphic, so the "iff" condition is 2-isomorphism.`]], a: 1, src: `Lecture 10 example` }
      ]
    },

    /* ───────────────────────── LECTURE 11 (exam extras) ───────────────────────── */
    {
      n: 11, title: `Exam Extras: Mathematical Induction and Relations`,
      notes: [
        { h: `Why this lecture?`, pts: [
          `Mathematical induction (proving sum formulas) and binary relations appear in the 2024/25 and 2025/26 finals and the 2025/26 midterm, but no lecture file covering them was in the course folder. These notes use standard textbook definitions (Rosen) in the professor's exam wording.`
        ]},
        { h: `Principle of mathematical induction`, pts: [
          `To prove P(n) is true for all n ≥ n₀:`,
          `<b>1. Basis step</b>: show P(n₀) is true (usually <b>n = 1</b>; the exams' answer for both "1 + 2 + … + n" and "2ⁿ &gt; n for n ≥ 1" is n = 1).`,
          `<b>2. Inductive hypothesis</b>: <b>assume P(k) is true</b> for an arbitrary k ≥ n₀ (assume true for n = k).`,
          `<b>3. Inductive step</b>: using the hypothesis, <b>prove P(k + 1)</b> (prove it for n = k + 1).`,
          `Conclusion: P(n) is true for all n ≥ n₀ (like falling dominoes).`
        ]},
        { h: `Proof: 1 + 2 + 3 + … + n = n(n + 1)/2`, formula: [
          `Basis (n = 1): LHS = 1, RHS = 1(2)/2 = 1 ✓`,
          `Hypothesis: assume 1 + 2 + … + k = k(k + 1)/2`,
          `Step (n = k + 1): 1 + 2 + … + k + (k + 1) = k(k + 1)/2 + (k + 1)`,
          `= [k(k + 1) + 2(k + 1)]/2 = (k + 1)(k + 2)/2 = (k + 1)((k + 1) + 1)/2 ✓`,
          `Hence true for all n ≥ 1.  ■  (Exam 2024/25 Q3a)`
        ]},
        { h: `Proof: 2 + 4 + … + 2n = n(n + 1)`, formula: [
          `Basis (n = 1): LHS = 2, RHS = 1 × 2 = 2 ✓`,
          `Hypothesis: 2 + 4 + … + 2k = k(k + 1)`,
          `Step: 2 + 4 + … + 2k + 2(k + 1) = k(k + 1) + 2(k + 1) = (k + 1)(k + 2) ✓`,
          `■  (Exam 2025/26 Q3a-i)`
        ]},
        { h: `Proof: 1 + 4 + 7 + … + (3n − 2) = n(3n − 1)/2`, formula: [
          `Basis (n = 1): LHS = 1, RHS = 1(3 − 1)/2 = 1 ✓`,
          `Hypothesis: 1 + 4 + … + (3k − 2) = k(3k − 1)/2`,
          `Step: next term is 3(k + 1) − 2 = 3k + 1`,
          `k(3k − 1)/2 + (3k + 1) = (3k² − k + 6k + 2)/2 = (3k² + 5k + 2)/2 = (k + 1)(3k + 2)/2`,
          `and (k + 1)(3(k + 1) − 1)/2 = (k + 1)(3k + 2)/2 ✓`,
          `■  (Exam 2025/26 Q3a-ii)`
        ]},
        { h: `Proof: 2ⁿ &gt; n for all n ≥ 1`, formula: [
          `Basis (n = 1): 2¹ = 2 > 1 ✓`,
          `Hypothesis: 2ᵏ > k`,
          `Step: 2ᵏ⁺¹ = 2 · 2ᵏ > 2k = k + k ≥ k + 1 (since k ≥ 1) ✓  ■`
        ]},
        { h: `Binary relations`, pts: [
          `The <b>Cartesian product</b> A × B = {(a, b) | a ∈ A, b ∈ B}; |A × B| = |A|·|B|.`,
          `A <b>binary relation R from A to B</b> is a subset of A × B (written R: A → B in the 2024/25 paper).`,
          `<b>aRb</b> means <b>(a, b) ∈ R</b>; a R̸ b means (a, b) ∉ R.`,
          `A relation <b>on a set A</b> is a relation from A to A (a subset of A × A).`,
          `The <b>identity relation</b> I_A on A is the set <b>{(a, a) | a ∈ A}</b>.`,
          `Example: A = {1, 2}, B = {x, y}: A × B = {(1,x), (1,y), (2,x), (2,y)}; R = {(1,x), (2,y)} is a relation from A to B; I_A = {(1,1), (2,2)}.`
        ]},
        { h: `Properties of relations on A (standard)`, table: [
          [`Property`, `Definition`],
          [`Reflexive`, `(a, a) ∈ R for every a ∈ A (I_A ⊆ R)`],
          [`Symmetric`, `(a, b) ∈ R → (b, a) ∈ R`],
          [`Antisymmetric`, `(a, b) ∈ R and (b, a) ∈ R → a = b`],
          [`Transitive`, `(a, b) ∈ R and (b, c) ∈ R → (a, c) ∈ R`],
          [`Equivalence relation`, `reflexive + symmetric + transitive (e.g. congruence mod n, L8)`]
        ]}
      ],
      cards: [
        [`Three steps of induction`, `Basis step (prove P(1)); inductive hypothesis (assume P(k)); inductive step (prove P(k + 1)).`],
        [`In induction we assume the statement for n = k to prove it for`, `n = k + 1`],
        [`Base case for 1 + 2 + … + n = n(n + 1)/2`, `n = 1`],
        [`Base case for 2ⁿ &gt; n, n ≥ 1`, `n = 1`],
        [`Inductive step of 1 + … + n`, `k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2`],
        [`Cartesian product A × B`, `{(a, b) | a ∈ A, b ∈ B}; size |A|·|B|.`],
        [`Binary relation from A to B`, `A subset of A × B.`],
        [`aRb means`, `(a, b) ∈ R`],
        [`Identity relation I_A`, `{(a, a) | a ∈ A}`],
        [`Relation on A`, `A subset of A × A.`],
        [`Reflexive relation`, `(a, a) ∈ R for all a ∈ A.`],
        [`Equivalence relation`, `Reflexive, symmetric and transitive.`]
      ],
      qa: [
        [`State the principle of mathematical induction.`, `To prove P(n) for all n ≥ n₀: (1) Basis step: verify P(n₀) (usually n = 1). (2) Inductive hypothesis: assume P(k) is true for an arbitrary k ≥ n₀. (3) Inductive step: show P(k) → P(k + 1). Then P(n) holds for all n ≥ n₀.`],
        [`Prove by induction 1 + 2 + 3 + … + n = n(n + 1)/2.`, `Basis n = 1: 1 = 1·2/2. Assume 1 + … + k = k(k + 1)/2. Then 1 + … + k + (k + 1) = k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2, which is the formula for n = k + 1. Hence true for all n ≥ 1.`],
        [`Prove by induction 2 + 4 + … + 2n = n(n + 1).`, `Basis n = 1: 2 = 1·2. Assume 2 + … + 2k = k(k + 1). Then adding 2(k + 1): k(k + 1) + 2(k + 1) = (k + 1)(k + 2) = (k + 1)((k + 1) + 1). True for all n ≥ 1.`],
        [`Prove by induction 1 + 4 + 7 + … + (3n − 2) = n(3n − 1)/2.`, `Basis n = 1: 1 = 1·2/2. Assume true for k. Add 3(k + 1) − 2 = 3k + 1: k(3k − 1)/2 + 3k + 1 = (3k² + 5k + 2)/2 = (k + 1)(3k + 2)/2 = (k + 1)(3(k + 1) − 1)/2. True for all n ≥ 1.`],
        [`Define a binary relation, the notation aRb and the identity relation.`, `A binary relation R from A to B is a subset of A × B. aRb means (a, b) ∈ R. A relation on A is a subset of A × A. The identity relation on A is I_A = {(a, a) | a ∈ A}.`]
      ],
      quiz: [
        { q: `In mathematical induction, we assume the statement is true for n = k to prove it for:`, o: [[`n = k`, `n = k is the inductive hypothesis itself, which is assumed, not proved. The step must reach the next case, n = k + 1.`], [`n = k + 1`, `Correct. Induction assumes P(k) (the hypothesis) and uses it to prove P(k + 1); with the basis, the cases fall like dominoes (L11, Principle of induction).`], [`n = k − 1`, `Proving n = k − 1 from n = k goes backwards and never reaches larger n. The step proves n = k + 1.`], [`n = k + 2`, `Jumping to k + 2 would skip every other value (only odd or only even n covered). The step is to k + 1.`]], a: 1, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `To prove 2ⁿ &gt; n for all n ≥ 1, the base case should start with:`, o: [[`n = 0`, `The claim is for n ≥ 1, so n = 0 is not part of it. The basis is the first value in the claim, n = 1 (2¹ = 2 &gt; 1).`], [`n = 1`, `Correct. The basis checks the first value in the claim, here n = 1: 2¹ = 2 &gt; 1; the inductive step then covers every later n (L11, Principle of induction).`], [`n = 2`, `Starting at n = 2 would never prove n = 1, which the claim includes. The basis must be n = 1.`], [`n = 3`, `Starting at n = 3 leaves n = 1 and n = 2 unproved. The basis is the first value, n = 1.`]], a: 1, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `Which of the following is a correct base case for proving 1 + 2 + 3 + … + n = n(n + 1)/2?`, o: [[`n = 0`, `The sum 1 + 2 + … + n starts with the term 1, so the first case is n = 1 (LHS = 1, RHS = 1·2/2 = 1).`], [`n = 1`, `Correct. The sum starts with the term 1, so the basis checks n = 1: LHS = 1 and RHS = 1(1 + 1)/2 = 1 (L11, Proof of 1 + 2 + … + n).`], [`n = 2`, `Starting at n = 2 leaves n = 1 unproved, so the dominoes never start at the first case. The basis is n = 1.`], [`n = 3`, `Starting at n = 3 leaves n = 1 and 2 unproved. Check the first case, n = 1: 1 = 1(2)/2.`]], a: 1, src: `Exam 2025/26, Midterm 2025/26` },
        { q: `A binary relation R from A to B is written:`, o: [[`B → A`, `B → A is a relation from B to A, a subset of B × A. A relation from A to B is written A → B.`], [`A → B`, `Correct. A binary relation from A to B is a subset of A × B, written R: A → B in the 2024/25 paper (L11, Binary relations).`], [`A − B`, `A − B is set difference (L2), a set of elements, not of ordered pairs. A relation from A to B is R: A → B.`], [`A / B`, `A / B is not a notation used for relations. A relation from A to B is written A → B, with R ⊆ A × B.`]], a: 1, src: `Exam 2024/25` },
        { q: `The notation aRb means:`, o: [[`(a, b) ∈ R`, `Correct. aRb is shorthand for (a, b) ∈ R: the ordered pair is one of the elements of the relation (L11, Binary relations).`], [`(a, b) → R`, `→ names the direction of a relation (A → B), not membership of a pair. aRb means (a, b) ∈ R.`], [`(a, b) ⊂ R`, `A pair (a, b) is an element of R, so ∈ is used, not ⊂ (see L1, ∈ versus ⊆). aRb means (a, b) ∈ R.`], [`(a, b) = R`, `R is a set of pairs, so one pair cannot equal it (unless R had a single element written as a set). aRb means (a, b) ∈ R.`]], a: 0, src: `Exam 2024/25` },
        { q: `The Identity relation I_A on a set A is the set:`, o: [[`{(a, a)}`, `{(a, a)} is a single pair with no condition saying a ranges over A. I_A needs all pairs: {(a, a) | a ∈ A}.`], [`{(a, a) | a ∈ A}`, `Correct. The identity relation I_A pairs every element of A with itself: {(a, a) | a ∈ A}; e.g. I_{1,2} = {(1,1), (2,2)} (L11, Binary relations).`], [`{(a, a) | a &lt; A}`, `"a &lt; A" compares an element with a set, which has no meaning. The condition must be a ∈ A.`], [`{(a, a) ≥ A}`, `"(a, a) ≥ A" compares a pair with a set, which is not defined, and has no set-builder condition. I_A = {(a, a) | a ∈ A}.`]], a: 1, src: `Exam 2024/25` },
        { q: `If |A| = 4 and |B| = 3, the number of elements of A × B is:`, o: [[`7`, `7 = 4 + 3 adds the sizes. Each of the 4 elements of A pairs with each of the 3 of B: 4 × 3 = 12.`], [`12`, `Correct. A × B = {(a, b) | a ∈ A, b ∈ B}, and |A × B| = |A|·|B| = 4 × 3 = 12 (L11, Binary relations; L2).`], [`64`, `64 = 4³ is a power (the number of functions from B to A). The Cartesian product multiplies: 4 × 3 = 12.`], [`81`, `81 = 3⁴ is the number of functions from A to B, not of pairs. |A × B| = 4 × 3 = 12.`]], a: 1, src: `Exam 2020/21, 2021/22` }
      ]
    }
  ],

  exams: [
    /* ───────── FINAL 2025/2026 ───────── */
    {
      title: `Final Exam 2025/2026`,
      meta: `First term · 2 hours · 60 marks · 3 questions · Code BS 204 · Computer Science 1st year · Dr. Shereen Magdy, Dr. Marwa Yahya`,
      note: `Transcribed from a 4-page scan (two photographed sheets). Underlines on the paper are a student's marks, not an official key. They agree with the lectures except Q25, where the student marked (c) {3} ∈ {1,2,3}; the correct answer is (b) 3 ∈ {1,2,3}. Q11, Q13 and Q29 (induction) are not in any lecture file; see Lecture 11.`,
      sections: [
        { title: `Question 1 · Part 1: Multiple choice questions`, marks: `30 marks`, items: [
          { type: `mcq`, q: `1- The expression ¬(P ∧ Q) is equivalent to`, o: [`¬P ∨ ¬Q`, `¬P ∧ ¬Q`, `P ∧ Q`, `P ∨ Q`], a: 0, why: `De Morgan's law: ¬(p ∧ q) ≡ ¬p ∨ ¬q. Negate each part and change ∧ to ∨ (Theorem 1.1.1, law 9) (L4).`, ow: [null, `¬P ∧ ¬Q is the other De Morgan law, ¬(P ∨ Q). For ¬(P ∧ Q) the ∧ must also flip to ∨.`, `P ∧ Q is the original without the negation; it has the opposite value of ¬(P ∧ Q) in every row.`, `P ∨ Q negates nothing. In row T, T it is T while ¬(P ∧ Q) is F, so they differ.`] },
          { type: `mcq`, q: `2- A compound proposition that is always false is a`, o: [`tautology`, `contradiction`, `both`, `True`], a: 1, why: `A contradiction is a statement form that is always false regardless of the truth values substituted, e.g. p ∧ ¬p (L4, Definitions).`, ow: [`A tautology is the opposite: always true whatever values its variables take (e.g. p ∨ ¬p). Always false is a contradiction.`, null, `A tautology is all T and a contradiction is all F; one truth table column cannot be both. Always false means contradiction only.`, `"True" is a truth value, not a type of compound proposition, and the question describes always false. That is a contradiction.`] },
          { type: `mcq`, q: `3- Which of the following is a tautology?`, o: [`p ∧ ¬p`, `p ∨ ¬p`, `¬p ∧ ¬Q`, `¬(p ∧ Q)`], a: 1, why: `Either p or ¬p is always true, so p ∨ ¬p is T in both rows; the negation law gives p ∨ ¬p ≡ t (L4, Example 1.1.13).`, ow: [`p ∧ ¬p needs p and ¬p both true, which never happens, so it is always false: a contradiction (Theorem 1.1.1, negation law).`, null, `¬p ∧ ¬Q is true only when both p and Q are false; any true variable makes it F, so it is not always true.`, `¬(p ∧ Q) is F in the row p = T, Q = T, so it is not a tautology. It equals ¬p ∨ ¬Q by De Morgan.`] },
          { type: `mcq`, q: `4- The statements P ∧ Q and Q ∧ P`, o: [`Not equivalent`, `Equivalent`, `sometimes equivalent`, `contradictor`], a: 1, why: `The commutative law p ∧ q ≡ q ∧ p (Theorem 1.1.1, law 1): order does not change "and", so the columns agree in every row (L4).`, ow: [`Their truth table columns agree in every row (both T only for TT), and agreeing columns means logically equivalent.`, null, `Equivalence means the columns agree in all rows; there is no "sometimes". Here they agree everywhere, so they are equivalent.`, `Contradictory would mean opposite values, but P ∧ Q and Q ∧ P have the same value in every row.`] },
          { type: `mcq`, q: `5- Logical equivalences involving biconditional statements: p ↔ q ≡`, o: [`(p → q) ∧ (q → p)`, `p → q`, `¬p`, `p ∨ q`], a: 0, why: `p ↔ q means "p only if q" (p → q) and "p if q" (q → p); the truth table shows both columns agree (L5, Biconditional; Table 8).`, ow: [null, `p → q is only one direction ("only if"); in row F, T it is T while p ↔ q is F. The biconditional needs q → p too.`, `¬p ignores q: in row T, T it is F while p ↔ q is T.`, `p ∨ q is F in row F, F, but p ↔ q is T there (equal values), and p ∨ q is T in rows TF, FT where ↔ is F.`] },
          { type: `mcq`, q: `6- P → Q is equivalent to`, o: [`¬P ∨ Q`, `P ∨ Q`, `Q → P`, `¬P ∧ Q`], a: 0, why: `P → Q ≡ ¬P ∨ Q (Table 4/Table 7): both are false only when P = T and Q = F, and true in the other three rows (L5).`, ow: [null, `In row P = T, Q = F, P ∨ Q is T but P → Q is F; and in row F, F, P ∨ Q is F but P → Q is T.`, `Q → P is the converse; it differs in rows TF and FT (e.g. P = F, Q = T: P → Q = T but Q → P = F).`, `¬P ∧ Q is T only in row F, T; in row T, T it is F while P → Q is T.`] },
          { type: `mcq`, q: `7- The Expectation in the Discrete Random Variable is`, o: [`Σ x · f(x)`, `Σ x`, `Σ s(x)`, `Σ f(x)`], a: 0, why: `For a discrete random variable μ = E(X) = Σ xᵣ · f(xᵣ) = x₁f(x₁) + … + xₙf(xₙ): each value weighted by its probability (L7, Expectation).`, ow: [null, `Σ x just adds the values and ignores how likely each one is. The expectation weights each value: Σ x · f(x).`, `s(x) is not defined anywhere in the lecture. The expectation is Σ x · f(x), using the distribution f.`, `Σ f(x) is always 1 for any distribution (condition 2 of L6), so it cannot be the mean. E(X) = Σ x · f(x).`] },
          { type: `mcq`, q: `8- P ∨ (P ∧ Q) is equivalent to`, o: [`Q`, `P`, `¬P`, `P ∧ Q`], a: 1, why: `Absorption: p ∨ (p ∧ q) ≡ p (Theorem 1.1.1, law 10). If P is T the whole thing is T; if P is F then P ∧ Q is F too (L4).`, ow: [`Q ignores P: at P = T, Q = F the expression P ∨ (P ∧ Q) is T (because P is T) while Q is F.`, null, `¬P has the opposite value of the expression in every row: when P = T the expression is T but ¬P is F.`, `False when P = T, Q = F, but the expression is T there.`] },
          { type: `mcq`, q: `9- The null graph of n vertices is denoted by N_N has`, o: [`no edges`, `one edge`, `2 edge`, `3 edge`], a: 0, why: `A null graph N_n has n vertices and no edges at all, so every vertex is isolated with degree 0 (L9, Graphs, edges and degree).`, ow: [null, `A null graph has no edges at all; with even one edge two vertices would have degree 1 and not be isolated.`, `The defining property of N_n is that the edge set is empty, so it has 0 edges, not 2.`, `N_n has 0 edges whatever n is. A graph with 3 edges (e.g. a triangle) is not null.`] },
          { type: `mcq`, q: `10- The integer 1 has only one divisor`, o: [`1`, `its self`, `4`, `5`], a: 1, why: `Fact 1 (L8): "the integer 1 has only one divisor, itself". (Option a, 1, is numerically the same thing, but the lecture wording is "itself".)`, ow: [`True numerically, but the lecture's wording is "itself" (Fact 1). In 2024/25 option a reads 2.`, null, `4 does not divide 1 (1 = 0 × 4 + 1). Fact 1 says the integer 1 has only one divisor, itself.`, `5 does not divide 1 (remainder 1). By Fact 1 the only divisor of 1 is itself.`] },
          { type: `mcq`, q: `11- In mathematical induction, we assume the statement is true for n = k to prove it for`, o: [`n = k`, `n = k + 1`, `n = k − 1`, `n = k + 2`], a: 1, why: `Induction assumes P(k) (the hypothesis) and uses it to prove P(k + 1); with the basis, the cases fall like dominoes (L11, Principle of induction).`, ow: [`n = k is the inductive hypothesis itself, which is assumed, not proved. The step must reach the next case, n = k + 1.`, null, `Proving n = k − 1 from n = k goes backwards and never reaches larger n. The step proves n = k + 1.`, `Jumping to k + 2 would skip every other value (only odd or only even n covered). The step is to k + 1.`] },
          { type: `mcq`, q: `12- Which of the following is a contradiction?`, o: [`P ∨ Q`, `P ∧ ¬P`, `P → Q`, `P ↔ Q`], a: 1, why: `P and ¬P always have opposite values, so they are never both true and P ∧ ¬P is F in every row; negation law P ∧ ¬P ≡ c (L4, Example 1.1.13).`, ow: [`P ∨ Q is true in 3 of 4 rows (false only for F, F). A contradiction must be false in every row.`, null, `P → Q is true in 3 of 4 rows (false only for T → F), so it is not always false.`, `P ↔ Q is true in rows TT and FF (equal values), so it is not a contradiction.`] },
          { type: `mcq`, q: `13- To prove 2ⁿ > n for all n ≥ 1, the base case should start with`, o: [`n = 0`, `n = 1`, `n = 2`, `n = 3`], a: 1, why: `Start at the first value of the claim, n = 1 (L11).`, ow: [`The claim is for n ≥ 1, so n = 0 is not part of it. The basis is the first value in the claim, n = 1 (2¹ = 2 &gt; 1).`, null, `Starting at n = 2 would never prove n = 1, which the claim includes. The basis must be n = 1.`, `Starting at n = 3 leaves n = 1 and n = 2 unproved. The basis is the first value, n = 1.`] },
          { type: `mcq`, q: `14- The disjunction of propositions p and q, denoted by`, o: [`p ∨ q`, `p ∧ q`, `p − q`, `p / q`], a: 0, why: `Disjunction is the inclusive "or", written p ∨ q: true when p or q (or both) is true, false only when both are false (L3, Connectives).`, ow: [null, `p ∧ q is the conjunction ("and"), true only when both are true. Disjunction ("or") is p ∨ q.`, `"−" is not a logical connective in the lecture (it is set difference). The disjunction of p and q is p ∨ q.`, `"/" is division, not a logical connective. The lecture writes disjunction (inclusive or) as p ∨ q.`] },
          { type: `mcq`, q: `15- The law ¬(P ∧ Q) = ¬P ∨ ¬Q is called`, o: [`commutative Law`, `De Morgan's Law`, `Associative Law`, `Distributive Law`], a: 1, why: `De Morgan's laws, ~(p ∧ q) ≡ ~p ∨ ~q and ~(p ∨ q) ≡ ~p ∧ ~q, move a negation inside and flip the connective (Theorem 1.1.1, law 9) (L4).`, ow: [`The commutative law only swaps order, p ∧ q ≡ q ∧ p, with no negation. Pushing ¬ into a bracket is De Morgan.`, null, `The associative law regroups brackets of one connective, (p ∧ q) ∧ r ≡ p ∧ (q ∧ r). It never adds or moves a negation.`, `The distributive law spreads one connective over another, p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r). It does not move a negation.`] },
          { type: `mcq`, q: `16- If P = True, Q = False, then P ∧ Q =`, o: [`True`, `False`, `Both`, `undefined`], a: 1, why: `P ∧ Q is true only when both are true; with Q false, T ∧ F = F (L3, Truth tables of the connectives).`, ow: [`Conjunction is true only when both parts are true. Q is false, so P ∧ Q = T ∧ F = F.`, null, `A proposition is true or false but not both, and so is every compound of propositions. Here T ∧ F = F.`, `Every combination of truth values gives a defined result in the truth table. The row P = T, Q = F gives P ∧ Q = F.`] },
          { type: `mcq`, q: `17- If P = True, Q = False, then P → Q is`, o: [`True`, `False`, `undefined`, `Both`], a: 1, why: `P → Q is false only when the antecedent is true and the consequent is false, which is this row: T → F = F (L3, Connectives).`, ow: [`An implication is true in all cases except a true antecedent with a false consequent, and T → F is exactly that case. So P → Q = F.`, null, `The implication has a value in every row of its truth table. For P = T, Q = F it is F.`, `A compound proposition is true or false, never both. Here T → F gives exactly one value, F.`] },
          { type: `mcq`, q: `18- A compound proposition that is always true is a`, o: [`tautology`, `contradiction`, `both`, `Identity`], a: 0, why: `A tautology is a statement form that is always true regardless of the truth values substituted for its variables, e.g. p ∨ ¬p (L4, Definitions).`, ow: [null, `A contradiction is always false (e.g. p ∧ ¬p), the opposite of what is asked. Always true is a tautology.`, `A column cannot be all T and all F at once, so a proposition cannot be both. Always true means tautology.`, `"Identity" names a law (p ∧ t ≡ p), not a kind of compound proposition. Always true is a tautology.`] },
          { type: `mcq`, q: `19- The Power Set of a set S, denoted P(S), if S = {1, 3} is`, o: [`P(S) = {3, 1}`, `P(S) = {0, Φ}`, `P(S) = {Φ, {1}, {3}, {1, 3}}`, `P(S) = ∅`], a: 2, why: `P(S) is the set of all subsets of S. With |S| = 2 there are 2² = 4: ∅, {1}, {3} and {1, 3} (L1, Power set).`, ow: [`{3, 1} = {1, 3} is S itself (order does not matter). P(S) must contain the subsets of S as elements: ∅, {1}, {3}, {1, 3}.`, `0 is a number, not a subset of {1, 3}, and only ∅ is listed among the real subsets. P(S) = {∅, {1}, {3}, {1, 3}}.`, null, `A power set is never empty: ∅ and S itself are always members of P(S). Here P(S) has 2² = 4 elements.`] },
          { type: `mcq`, q: `20- The Multi Graph: if in a graph multiple edges between the same set of vertices, the graph having`, o: [`multiple edges`, `no edge`, `no loop`, `no vertices`], a: 0, why: `A multigraph allows multiple edges between the same pair of vertices; a simple graph forbids them (L9, Graphs, edges and degree).`, ow: [null, `A graph with no edges is the null graph N_n. A multigraph is defined by having multiple (parallel) edges.`, `"No loop" is part of the definition of a simple graph. A multigraph is defined by repeated edges between the same vertices.`, `A graph with no vertices cannot have any edges at all, let alone multiple ones. A multigraph has multiple edges.`] },
          { type: `mcq`, q: `21- The statement p ∧ F is always`, o: [`True`, `False`, `undefined`, `Both`], a: 1, why: `Domination / universal bound law p ∧ c ≡ c (L4).`, ow: [`A conjunction with a false part is false, so p ∧ F can never be true. Universal bound law: p ∧ c ≡ c.`, null, `p ∧ F has a value in both rows of its truth table: F in each. Nothing is undefined.`, `A statement form is true or false in each row, never both; p ∧ F is F in every row.`] },
          { type: `mcq`, q: `22- The result of the following operation 27 mod 5 is`, o: [`r = 2`, `r = 3`, `r = 1`, `r = 4`], a: 0, why: `a mod n keeps the remainder of a = q × n + r: 27 = 5 × 5 + 2, so 27 mod 5 = 2 (L8, Example 2.14).`, ow: [null, `r = 3 would need 27 − 3 = 24 to be a multiple of 5, which it is not. 27 = 5 × 5 + 2, so r = 2.`, `r = 1 would need 26 to be a multiple of 5. The largest multiple of 5 not above 27 is 25, leaving 2.`, `r = 4 would need 23 to be a multiple of 5. 27 − 25 = 2, so the residue is 2.`] },
          { type: `mcq`, q: `23- The Double negative law ¬(¬p) is equivalent to`, o: [`¬p`, `p`, `p ∨ q`, `¬(¬p)`], a: 1, why: `Double negative law ~(~p) ≡ p (Theorem 1.1.1, law 6): negating twice flips the value twice, back to p's value (L4).`, ow: [`¬p is a single negation. Two negations cancel each other, so ¬(¬p) gives back p.`, null, `q does not appear in ¬(¬p), so it cannot be in the result. Double negation gives p.`, `That is the expression itself, not its simplification.`] },
          { type: `mcq`, q: `24- P ∧ (Q ∨ R) is equivalent to`, o: [`(P ∧ Q) ∨ (P ∧ R)`, `(P ∨ Q) ∧ (P ∨ R)`, `(P ∧ Q) ∧ (P ∧ R)`, `(P ∨ Q) ∨ (P ∨ R)`], a: 0, why: `Distributive law p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r): ∧ spreads over ∨ like multiplying out brackets (Theorem 1.1.1, law 3) (L4).`, ow: [null, `(P ∨ Q) ∧ (P ∨ R) is the other distributive form, equal to P ∨ (Q ∧ R). Here ∧ is outside, so it must be distributed.`, `(P ∧ Q) ∧ (P ∧ R) ≡ P ∧ Q ∧ R needs both Q and R true. P ∧ (Q ∨ R) needs only one, e.g. row T, T, F differs.`, `(P ∨ Q) ∨ (P ∨ R) ≡ P ∨ Q ∨ R is true when P alone is false and Q true, but then P ∧ (Q ∨ R) is F.`] },
          { type: `mcq`, q: `25- Which of the following is True?`, o: [`4 ⊂ {1, 2, 3}`, `3 ∈ {1, 2, 3}`, `{3} ∈ {1, 2, 3}`, `{1, 2, 3} ∈ 3`], a: 1, why: `3 is listed as an element. {3} is a subset, not an element (L1).`, ow: [`4 is a number (not a set) and is not even in the set.`, null, `{3} is a set; the elements are the numbers 1, 2, 3. ({3} ⊆ {1,2,3} would be true.)`, `This reverses the roles: 3 is a number, not a set, so nothing can be an element of it. The true statement is 3 ∈ {1, 2, 3}.`], key: `The student marking on the paper chose (c) {3} ∈ {1,2,3}, which is false.` },
          { type: `mcq`, q: `26- The negation of a conditional statement ¬(p → q) is equivalent to`, o: [`p ∧ ¬q`, `p`, `q`, `p ∨ q`], a: 0, why: `p → q is false only when p is true and q false, so ~(p → q) ≡ p ∧ ~q. By laws: ~(~p ∨ q) ≡ p ∧ ~q (De Morgan, double negative) (L5, Negation of a conditional).`, ow: [null, `p alone is T in row p = T, q = T, where p → q is T and its negation F. The negation also needs ¬q: p ∧ ¬q.`, `q is T in row T, T, but there p → q is true, so its negation is F. The negation is p ∧ ¬q (q must be false).`, `p ∨ q is T in row T, T, where ¬(p → q) is F. The negation of an if-then is an "and": p ∧ ¬q.`] },
          { type: `mcq`, q: `27- Which of the following is a subset of {1, 2, 3}?`, o: [`2`, `{2}`, `4`, `{4}`], a: 1, why: `A subset must be a set whose elements are in {1,2,3} (L1).`, ow: [`2 is an element of {1, 2, 3}, so 2 ∈ {1, 2, 3}; but ⊆ relates a set to a set, and the number 2 is not a set. The subset is {2}.`, null, `4 is a number, not a set, so it cannot be a subset; and 4 is not even an element of {1, 2, 3}.`, `{4} is a set, but its element 4 is not in {1, 2, 3}, so {4} ⊄ {1, 2, 3}. A subset needs every element inside the bigger set.`] },
          { type: `mcq`, q: `28- Which of the following is always true?`, o: [`A ∈ A`, `A ⊂ A`, `A ⊄ A`, `A ⊂ ∅`], a: 1, why: `Every set is a subset of itself (⊂ used as ⊆) (L1).`, ow: [`A ∈ A would mean A is one of its own elements, which is false for ordinary sets. The always-true fact is A ⊆ A.`, null, `This denies A ⊆ A, but every element of A is in A, so A is always a subset of itself. A ⊄ A is never true.`, `A ⊆ ∅ holds only when A has no elements, i.e. A = ∅. Any non-empty A has an element that is not in ∅.`] },
          { type: `mcq`, q: `29- Which of the following is a correct base case for proving 1 + 2 + 3 + … + n = n(n + 1)/2?`, o: [`n = 0`, `n = 1`, `n = 2`, `n = 3`], a: 1, why: `The sum starts with the term 1, so the basis checks n = 1: LHS = 1 and RHS = 1(1 + 1)/2 = 1 (L11, Proof of 1 + 2 + … + n).`, ow: [`The sum 1 + 2 + … + n starts with the term 1, so the first case is n = 1 (LHS = 1, RHS = 1·2/2 = 1).`, null, `Starting at n = 2 leaves n = 1 unproved, so the dominoes never start at the first case. The basis is n = 1.`, `Starting at n = 3 leaves n = 1 and 2 unproved. Check the first case, n = 1: 1 = 1(2)/2.`] },
          { type: `mcq`, q: `30- The following is logically equivalent to (p ∧ q) → r`, o: [`p ∧ q`, `r → (p ∧ q)`, `¬(p ∧ q) ∨ r`, `r → (p ∨ q)`], a: 2, why: `Apply a → b ≡ ¬a ∨ b with a = p ∧ q and b = r: (p ∧ q) → r ≡ ¬(p ∧ q) ∨ r (L5, Table 7).`, ow: [`p ∧ q drops r and is not even an implication: with p = q = F it is F while (p ∧ q) → r is T.`, `r → (p ∧ q) is the converse: with r = T and p = F it is F, while (p ∧ q) → r is T.`, null, `r → (p ∨ q) is a different implication: with p = q = T and r = F it is T but (p ∧ q) → r is F.`] }
        ]},
        { title: `Question 2 · Part 2: Essay`, marks: `15 marks`, items: [
          { type: `written`, q: `(a) Consider the graph G: directed edges e5: 5→1, e1: 1→2, e2: 2→3, e6: 1→3, e7: 5→3, e4: 5→4, e3: 3→4. (i) Find the adjacency matrix of G. (ii) Find the list of edges.`, ans: `<b>(i)</b> A(i, j) = 1 iff there is an edge i → j (rows/columns 1..5):<br><table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><th>1</th><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td></tr><tr><th>2</th><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><th>3</th><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td></tr><tr><th>4</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><th>5</th><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td></tr></table><b>(ii)</b> List of edges organised by nodes: V(1) = {2, 3}, V(2) = {3}, V(3) = {4}, V(4) = ∅, V(5) = {1, 3, 4}.<br>(Equivalently E = {(5,1), (1,2), (2,3), (1,3), (5,3), (5,4), (3,4)}.) This is the lecture's sparse-representation example (L9).` },
          { type: `written`, q: `(b) Show that (p → q) ∧ (p → r) ≡ p → (q ∧ r) by using a truth table.`, ans: `<table><tr><th>p</th><th>q</th><th>r</th><th>p→q</th><th>p→r</th><th>(p→q)∧(p→r)</th><th>q∧r</th><th>p→(q∧r)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>T</td><td>F</td><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td></tr><tr><td>T</td><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td><td>F</td><td>F</td></tr><tr><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td><td>F</td><td>T</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td><td>F</td><td>T</td></tr><tr><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>F</td><td>T</td></tr></table>The columns (p→q)∧(p→r) and p→(q∧r) are identical in all 8 rows, so the statements are logically equivalent (Table 7, L5).` }
        ]},
        { title: `Question 3 · Part 2: Essay`, marks: `15 marks`, items: [
          { type: `written`, q: `(a) Prove the following formulas by induction: (i) 2 + 4 + … + 2n = n(n + 1); (ii) 1 + 4 + 7 + … + (3n − 2) = n(3n − 1)/2.`, ans: `<b>(i)</b> Basis n = 1: LHS = 2, RHS = 1·2 = 2 ✓.<br>Hypothesis: 2 + 4 + … + 2k = k(k + 1).<br>Step: 2 + … + 2k + 2(k + 1) = k(k + 1) + 2(k + 1) = (k + 1)(k + 2) = (k + 1)((k + 1) + 1) ✓. So it holds for all n ≥ 1.<br><br><b>(ii)</b> Basis n = 1: LHS = 1, RHS = 1(3 − 1)/2 = 1 ✓.<br>Hypothesis: 1 + 4 + … + (3k − 2) = k(3k − 1)/2.<br>Step: the (k + 1)th term is 3(k + 1) − 2 = 3k + 1. Sum = k(3k − 1)/2 + (3k + 1) = (3k² − k + 6k + 2)/2 = (3k² + 5k + 2)/2 = (k + 1)(3k + 2)/2 = (k + 1)(3(k + 1) − 1)/2 ✓. So it holds for all n ≥ 1. (L11)` },
          { type: `written`, q: `(b) Verify the logical equivalence ¬(¬p ∧ q) ∧ (p ∨ q) ≡ p by using laws.`, ans: `¬(¬p ∧ q) ∧ (p ∨ q)<br>≡ (¬(¬p) ∨ ¬q) ∧ (p ∨ q) &nbsp; by De Morgan's laws<br>≡ (p ∨ ¬q) ∧ (p ∨ q) &nbsp; by the double negative law<br>≡ p ∨ (¬q ∧ q) &nbsp; by the distributive law<br>≡ p ∨ (q ∧ ¬q) &nbsp; by the commutative law for ∧<br>≡ p ∨ c &nbsp; by the negation law<br>≡ p &nbsp; by the identity law ■ (L4)` }
        ]}
      ]
    },

    /* ───────── MIDTERM 2025/2026 ───────── */
    {
      title: `Midterm Exam 2025/2026 (model answer)`,
      meta: `First term · 30 multiple-choice questions · official model answer`,
      note: `Typed PDF titled "Model answer mid term exam discrete math first term (2025_2026)". The official answers are given for every question and all of them agree with the lectures. Q28–Q30 (induction) are covered in Lecture 11.`,
      sections: [
        { title: `Multiple choice`, marks: `30 questions`, items: [
          { type: `mcq`, q: `1. The number of subsets of {1, 2, 3} is:`, o: [`3`, `4`, `6`, `8`], a: 3, why: `If |S| = n then |P(S)| = 2ⁿ, since each element is either in or out of a subset: 2³ = 8 (∅, three singletons, three pairs, and {1, 2, 3}) (L1, Power set).`, ow: [`3 is n, the number of elements of {1, 2, 3}. The question asks for subsets, and their count is 2ⁿ = 2³ = 8.`, `4 = 2² is the number of subsets of a 2-element set such as {a, b}. With 3 elements the count is 2³ = 8.`, `Not a power of 2; the count of subsets is always 2ⁿ.`, null] },
          { type: `mcq`, q: `2. The universal set U = {1,2,3,4,5}, A = {1,2}, A′ =`, o: [`{3,4,5}`, `{3,5}`, `{1,3}`, `{1,2}`], a: 0, why: `A′ = {x : x ∈ U but x ∉ A} = U − A. Removing 1 and 2 from {1, 2, 3, 4, 5} leaves {3, 4, 5} (L2, Complement).`, ow: [null, `4 is also in U and not in A, so it belongs to A′ too. Dropping it gives {3, 5}; the full complement is U − A = {3, 4, 5}.`, `1 ∈ A, so it cannot be in A′ (the complement holds only elements outside A); 4 is also missing. A′ = {3, 4, 5}.`, `{1, 2} is A itself. The complement is everything in U that is not in A: U − A = {3, 4, 5}.`] },
          { type: `mcq`, q: `3. Which of the following sets are equal?`, o: [`{1, 2, 3} and {3, 2, 1}`, `{1, 2, 3} and {1, 2, 4}`, `{1, 2, 3} and {3, 4, 5}`, `{2, 3} and {3, 4}`], a: 0, why: `Sets are equal when they have the same elements (A ⊆ B and B ⊆ A); order does not matter, so {1, 2, 3} = {3, 2, 1} (L1, Types of sets).`, ow: [null, `The sets differ: 3 is in the first but not the second, and 4 is in the second but not the first. Equal sets must have exactly the same elements.`, `They share only the element 3; 1 and 2 are missing from the second set and 4, 5 from the first, so neither is a subset of the other.`, `2 is in the first set but not the second (and 4 the other way round), so {2, 3} ⊄ {3, 4}. Equality needs A ⊆ B and B ⊆ A.`] },
          { type: `mcq`, q: `4. The power set of {a, b} is:`, o: [`{Ø, {a}, {b}, {a, b}}`, `{{a, b}}`, `{{a}, {b}}`, `{a, b}`], a: 0, why: `All 2² = 4 subsets including ∅ and the set itself.`, ow: [null, `{{a, b}} has only one subset, the set itself. A power set holds all 2² = 4 subsets, so ∅, {a} and {b} are missing.`, `Only the two one-element subsets are listed. ∅ and the set {a, b} itself are always members of P(S), so two subsets are missing.`, `This is the set itself, not the set of its subsets.`] },
          { type: `mcq`, q: `5. If A ⊆ B, then:`, o: [`Every element of B is in A`, `Every element of A is in B`, `A and B have no common elements`, `A = Ø`], a: 1, why: `By definition, A ⊆ B means every element of A is also an element of B; B may contain extra elements (L1, Types of sets: Subset).`, ow: [`"Every element of B is in A" is the definition of B ⊆ A, the reverse inclusion. A ⊆ B says nothing about B's other elements.`, null, `Having no common elements means A ∩ B = ∅, the definition of disjoint sets. A subset shares all its elements with B.`, `∅ ⊆ B is true for every B, but it is only one case. For example {1} ⊆ {1, 2} with A non-empty, so A ⊆ B does not force A = ∅.`] },
          { type: `mcq`, q: `6. Which law states that (A ∪ B)′ = A′ ∩ B′?`, o: [`Commutative Law`, `Associative Law`, `De Morgan's Law`, `Distributive Law`], a: 2, why: `The complement of a union is the intersection of the complements.`, ow: [`The commutative law only swaps the order: A ∪ B = B ∪ A and A ∩ B = B ∩ A. It has no complements in it.`, `The associative law only regroups brackets of one operation: A ∪ (B ∪ C) = (A ∪ B) ∪ C. No complements are involved.`, null, `The distributive law spreads one operation over the other: A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C). It does not complement anything.`] },
          { type: `mcq`, q: `7. Which of the following is a well-defined set?`, o: [`The set of tall students in a class`, `The set of all even numbers less than 10`, `The set of good teachers`, `The set of beautiful cities`], a: 1, why: `A set must be well defined: it is always clear whether an object belongs. "Even numbers less than 10" gives exactly {2, 4, 6, 8} (L1, What is a set?).`, ow: [`"Tall" has no fixed cutoff, so it is not always clear whether a student belongs. The lecture lists "tall students" as not well defined.`, null, `"Good" is a matter of opinion, so membership is not clear. The lecture gives "good teachers" as an example of a collection that is not well defined.`, `"Beautiful" is subjective, so people would disagree on membership. The lecture uses "beautiful cities" as a collection that is not well defined.`] },
          { type: `mcq`, q: `8. If A = {2, 4, 6, 8} and B = {4, 8, 10, 12}, then A ∩ B =`, o: [`{2, 6}`, `{4, 8}`, `{2, 4, 6, 8, 10, 12}`, `Ø`], a: 1, why: `A ∩ B = {x | x ∈ A and x ∈ B}: the only elements in both sets are 4 and 8, so A ∩ B = {4, 8} (L2, Intersection).`, ow: [`{2, 6} are the elements of A that are not in B, i.e. A − B. The intersection keeps the common elements, {4, 8}.`, null, `{2, 4, 6, 8, 10, 12} contains everything in either set, which is A ∪ B. The intersection keeps only the common elements {4, 8}.`, `∅ would mean the sets are disjoint, but 4 and 8 are in both. So A ∩ B = {4, 8}.`] },
          { type: `mcq`, q: `9. If U = {1, 2, 3, 4, 5, 6} and A = {2, 4, 6}, then A′ =`, o: [`{1, 2, 3}`, `{1, 3, 5}`, `{1, 2, 3, 4, 5, 6}`, `Ø`], a: 1, why: `A′ = U − A: remove 2, 4, 6 from {1, …, 6} to get {1, 3, 5} (L2, Complement).`, ow: [`2 is in A, so it cannot be in A′, and 5 (outside A) is missing. A′ = U − A = {1, 3, 5}.`, null, `{1, …, 6} is U itself. The complement must exclude the elements of A (2, 4, 6), leaving {1, 3, 5}.`, `A′ is empty only when A = U. Here 1, 3 and 5 are in U but not in A, so A′ = {1, 3, 5}.`] },
          { type: `mcq`, q: `10. If A = {x | x is an even number less than 10}, then A =`, o: [`{2, 4, 6, 8}`, `{1, 3, 5, 7, 9}`, `{0, 2, 4, 6, 8, 10}`, `{2, 4, 6}`], a: 0, why: `L1 (the key treats the even numbers as positive).`, ow: [null, `{1, 3, 5, 7, 9} are the odd numbers below 10. The property asks for even numbers, which gives {2, 4, 6, 8}.`, `10 is not less than 10, so it cannot be included (and, by the lecture's convention, the key also leaves out 0). A = {2, 4, 6, 8}.`, `This stops at 6, but 8 is even and less than 10, so it belongs too. A = {2, 4, 6, 8}.`] },
          { type: `mcq`, q: `11. The expression ¬(P ∧ Q) is equivalent to:`, o: [`¬P ∨ ¬Q`, `¬P ∧ ¬Q`, `P ∧ Q`, `P ∨ Q`], a: 0, why: `De Morgan's law: ¬(p ∧ q) ≡ ¬p ∨ ¬q. Negate each part and change ∧ to ∨ (Theorem 1.1.1, law 9) (L4).`, ow: [null, `¬P ∧ ¬Q is the other De Morgan law, ¬(P ∨ Q). For ¬(P ∧ Q) the ∧ must also flip to ∨.`, `P ∧ Q is the original without the negation; it has the opposite value of ¬(P ∧ Q) in every row.`, `P ∨ Q negates nothing. In row T, T it is T while ¬(P ∧ Q) is F, so they differ.`] },
          { type: `mcq`, q: `12. The law ¬(P ∧ Q) = ¬P ∨ ¬Q is called:`, o: [`Commutative Law`, `Distributive Law`, `De Morgan's Law`, `Associative Law`], a: 2, why: `De Morgan's laws, ~(p ∧ q) ≡ ~p ∨ ~q and ~(p ∨ q) ≡ ~p ∧ ~q, move a negation inside and flip the connective (Theorem 1.1.1, law 9) (L4).`, ow: [`The commutative law only swaps order, p ∧ q ≡ q ∧ p, with no negation. Pushing ¬ into a bracket is De Morgan.`, `The distributive law spreads one connective over another, p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r). It does not move a negation.`, null, `The associative law regroups brackets of one connective, (p ∧ q) ∧ r ≡ p ∧ (q ∧ r). It never adds or moves a negation.`] },
          { type: `mcq`, q: `13. If P = True, Q = False, then P ∧ Q =`, o: [`True`, `False`, `Undefined`, `Both`], a: 1, why: `P ∧ Q is true only when both are true; with Q false, T ∧ F = F (L3, Truth tables of the connectives).`, ow: [`Conjunction is true only when both parts are true. Q is false, so P ∧ Q = T ∧ F = F.`, null, `Every combination of truth values gives a defined result in the truth table. The row P = T, Q = F gives P ∧ Q = F.`, `A proposition is true or false but not both, and so is every compound of propositions. Here T ∧ F = F.`] },
          { type: `mcq`, q: `14. If P = True, Q = False, then P ∨ Q =`, o: [`True`, `False`, `Both`, `None`], a: 0, why: `Disjunction is false only when both parts are false; here P is true, so T ∨ F = T (L3, Truth tables of the connectives).`, ow: [null, `P ∨ Q is false only when both P and Q are false. P is true here, so T ∨ F = T.`, `A proposition is true or false but not both. The truth table row T, F gives P ∨ Q = T.`, `Every row of a truth table has a value; the row P = T, Q = F gives P ∨ Q = T.`] },
          { type: `mcq`, q: `15. If P = True, Q = False, then P → Q =`, o: [`True`, `False`, `Both`, `Undefined`], a: 1, why: `P → Q is false only when the antecedent is true and the consequent is false, which is this row: T → F = F (L3, Connectives).`, ow: [`An implication is true in all cases except a true antecedent with a false consequent, and T → F is exactly that case. So P → Q = F.`, null, `A compound proposition is true or false, never both. Here T → F gives exactly one value, F.`, `The implication has a value in every row of its truth table. For P = T, Q = F it is F.`] },
          { type: `mcq`, q: `16. If P = False, Q = True, then P → Q =`, o: [`True`, `False`, `Both`, `None`], a: 0, why: `A false antecedent makes the implication true.`, ow: [null, `Implication is false only for T → F. Here the antecedent P is false, so F → T = T.`, `A proposition is true or false, never both. The row P = F, Q = T gives P → Q = T.`, `Every row of the truth table has a value. With a false antecedent, P → Q = T.`] },
          { type: `mcq`, q: `17. The statement P ∧ ¬P is always:`, o: [`True`, `False`, `Sometimes True`, `Undefined`], a: 1, why: `P ∧ ¬P is F in both rows since P and ¬P cannot both be true: a contradiction, negation law p ∧ ~p ≡ c (L4, Example 1.1.13).`, ow: [`It is never true: P and ¬P always have opposite values, so they are never both T.`, null, `It is false in every row, not sometimes true. A conjunction of a statement and its negation is a contradiction.`, `Both rows have a value, F. A contradiction is a perfectly defined statement form.`] },
          { type: `mcq`, q: `18. The statement P ∨ ¬P is always:`, o: [`True`, `False`, `Sometimes True`, `Undefined`], a: 0, why: `P ∨ ¬P is T in both rows because one of P, ¬P is always true: a tautology, negation law p ∨ ~p ≡ t (L4, Example 1.1.13).`, ow: [null, `Always false is P ∧ ¬P (the contradiction). With ∨ one part is always true, so it is always T.`, `It is true in every row, not just some: when P = T, P is true; when P = F, ¬P is true.`, `Both rows of the truth table have a value, T. Nothing is undefined.`] },
          { type: `mcq`, q: `19. Which of the following is a tautology?`, o: [`P ∧ ¬P`, `P ∨ ¬P`, `¬P ∧ ¬Q`, `¬(P ∧ Q)`], a: 1, why: `Either p or ¬p is always true, so p ∨ ¬p is T in both rows; the negation law gives p ∨ ¬p ≡ t (L4, Example 1.1.13).`, ow: [`p ∧ ¬p needs p and ¬p both true, which never happens, so it is always false: a contradiction (Theorem 1.1.1, negation law).`, null, `¬p ∧ ¬Q is true only when both p and Q are false; any true variable makes it F, so it is not always true.`, `¬(p ∧ Q) is F in the row p = T, Q = T, so it is not a tautology. It equals ¬p ∨ ¬Q by De Morgan.`] },
          { type: `mcq`, q: `20. Which of the following is a contradiction?`, o: [`P ∨ Q`, `P ∧ ¬P`, `P → Q`, `P ↔ Q`], a: 1, why: `P and ¬P always have opposite values, so they are never both true and P ∧ ¬P is F in every row; negation law P ∧ ¬P ≡ c (L4, Example 1.1.13).`, ow: [`P ∨ Q is true in 3 of 4 rows (false only for F, F). A contradiction must be false in every row.`, null, `P → Q is true in 3 of 4 rows (false only for T → F), so it is not always false.`, `P ↔ Q is true in rows TT and FF (equal values), so it is not a contradiction.`] },
          { type: `mcq`, q: `21. How many rows are there in the truth table for 3 propositions (P, Q, R)?`, o: [`4`, `6`, `8`, `12`], a: 2, why: `A truth table with n variables has 2ⁿ rows, since each variable is T or F: 2³ = 8 rows (L3, Vocabulary).`, ow: [`4 = 2² is the row count for 2 variables. With 3 variables there are 2³ = 8 rows.`, `6 = 2 × 3 multiplies instead of using a power. Each variable doubles the rows: 2³ = 8.`, null, `12 is not a power of 2, so it cannot be a truth-table row count. For 3 variables it is 2³ = 8.`] },
          { type: `mcq`, q: `22. The statements P ∧ Q and Q ∧ P are:`, o: [`Not equivalent`, `Equivalent`, `Sometimes equivalent`, `Contradictory`], a: 1, why: `The commutative law p ∧ q ≡ q ∧ p (Theorem 1.1.1, law 1): order does not change "and", so the columns agree in every row (L4).`, ow: [`Their truth table columns agree in every row (both T only for TT), and agreeing columns means logically equivalent.`, null, `Equivalence means the columns agree in all rows; there is no "sometimes". Here they agree everywhere, so they are equivalent.`, `Contradictory would mean opposite values, but P ∧ Q and Q ∧ P have the same value in every row.`] },
          { type: `mcq`, q: `23. ¬(P ∧ Q) is equivalent to:`, o: [`¬P ∨ ¬Q`, `¬P ∧ ¬Q`, `P ∨ Q`, `P ∧ Q`], a: 0, why: `De Morgan's law: ¬(p ∧ q) ≡ ¬p ∨ ¬q. Negate each part and change ∧ to ∨ (Theorem 1.1.1, law 9) (L4).`, ow: [null, `¬P ∧ ¬Q is the other De Morgan law, ¬(P ∨ Q). For ¬(P ∧ Q) the ∧ must also flip to ∨.`, `P ∨ Q negates nothing. In row T, T it is T while ¬(P ∧ Q) is F, so they differ.`, `P ∧ Q is the original without the negation; it has the opposite value of ¬(P ∧ Q) in every row.`] },
          { type: `mcq`, q: `24. P → Q is equivalent to:`, o: [`¬P ∨ Q`, `P ∨ Q`, `Q → P`, `¬P ∧ Q`], a: 0, why: `P → Q ≡ ¬P ∨ Q (Table 4/Table 7): both are false only when P = T and Q = F, and true in the other three rows (L5).`, ow: [null, `In row P = T, Q = F, P ∨ Q is T but P → Q is F; and in row F, F, P ∨ Q is F but P → Q is T.`, `Q → P is the converse; it differs in rows TF and FT (e.g. P = F, Q = T: P → Q = T but Q → P = F).`, `¬P ∧ Q is T only in row F, T; in row T, T it is F while P → Q is T.`] },
          { type: `mcq`, q: `25. P ↔ Q is equivalent to:`, o: [`(P ∧ Q) ∨ (¬P ∧ ¬Q)`, `(P ∨ Q) ∧ (¬P ∨ ¬Q)`, `P ∨ ¬Q`, `P ∧ ¬Q`], a: 0, why: `P ↔ Q is true when both are true (P ∧ Q) or both false (¬P ∧ ¬Q): p ↔ q ≡ (p ∧ q) ∨ (¬p ∧ ¬q) (L5, Table 8).`, ow: [null, `(P ∨ Q) ∧ (¬P ∨ ¬Q) means at least one true and not both, i.e. exactly one true: that is P ⊕ Q, the negation of P ↔ Q.`, `P ∨ ¬Q ≡ Q → P is only one direction; in row T, F it is T while P ↔ Q is F.`, `P ∧ ¬Q ≡ ¬(P → Q) is true only in row T, F, where P ↔ Q is F, so it is not equivalent.`] },
          { type: `mcq`, q: `26. P ∨ (P ∧ Q) is equivalent to:`, o: [`Q`, `P`, `¬P`, `P ∧ Q`], a: 1, why: `Absorption: p ∨ (p ∧ q) ≡ p (Theorem 1.1.1, law 10). If P is T the whole thing is T; if P is F then P ∧ Q is F too (L4).`, ow: [`Q ignores P: at P = T, Q = F the expression P ∨ (P ∧ Q) is T (because P is T) while Q is F.`, null, `¬P has the opposite value of the expression in every row: when P = T the expression is T but ¬P is F.`, `False when P = T, Q = F, but the expression is T there.`] },
          { type: `mcq`, q: `27. P ∧ (Q ∨ R) is equivalent to:`, o: [`(P ∧ Q) ∨ (P ∧ R)`, `(P ∨ Q) ∧ (P ∨ R)`, `(P ∧ Q) ∧ (P ∧ R)`, `(P ∨ Q) ∨ (P ∨ R)`], a: 0, why: `Distributive law p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r): ∧ spreads over ∨ like multiplying out brackets (Theorem 1.1.1, law 3) (L4).`, ow: [null, `(P ∨ Q) ∧ (P ∨ R) is the other distributive form, equal to P ∨ (Q ∧ R). Here ∧ is outside, so it must be distributed.`, `(P ∧ Q) ∧ (P ∧ R) ≡ P ∧ Q ∧ R needs both Q and R true. P ∧ (Q ∨ R) needs only one, e.g. row T, T, F differs.`, `(P ∨ Q) ∨ (P ∨ R) ≡ P ∨ Q ∨ R is true when P alone is false and Q true, but then P ∧ (Q ∨ R) is F.`] },
          { type: `mcq`, q: `28. Which of the following is a correct base case for proving 1 + 2 + 3 + ⋯ + n = n(n+1)/2?`, o: [`n = 2`, `n = 0`, `n = 1`, `n = 3`], a: 2, why: `The sum starts with the term 1, so the basis checks n = 1: LHS = 1 and RHS = 1(1 + 1)/2 = 1 (L11, Proof of 1 + 2 + … + n).`, ow: [`Starting at n = 2 leaves n = 1 unproved, so the dominoes never start at the first case. The basis is n = 1.`, `The sum 1 + 2 + … + n starts with the term 1, so the first case is n = 1 (LHS = 1, RHS = 1·2/2 = 1).`, null, `Starting at n = 3 leaves n = 1 and 2 unproved. Check the first case, n = 1: 1 = 1(2)/2.`] },
          { type: `mcq`, q: `29. In mathematical induction, we assume the statement is true for n = k to prove it for:`, o: [`n = k`, `n = k + 1`, `n = k − 1`, `n = k + 2`], a: 1, why: `Induction assumes P(k) (the hypothesis) and uses it to prove P(k + 1); with the basis, the cases fall like dominoes (L11, Principle of induction).`, ow: [`n = k is the inductive hypothesis itself, which is assumed, not proved. The step must reach the next case, n = k + 1.`, null, `Proving n = k − 1 from n = k goes backwards and never reaches larger n. The step proves n = k + 1.`, `Jumping to k + 2 would skip every other value (only odd or only even n covered). The step is to k + 1.`] },
          { type: `mcq`, q: `30. To prove 2ⁿ > n for all n ≥ 1, the base case should start with:`, o: [`n = 0`, `n = 1`, `n = 2`, `n = 3`], a: 1, why: `The basis checks the first value in the claim, here n = 1: 2¹ = 2 &gt; 1; the inductive step then covers every later n (L11, Principle of induction).`, ow: [`The claim is for n ≥ 1, so n = 0 is not part of it. The basis is the first value in the claim, n = 1 (2¹ = 2 &gt; 1).`, null, `Starting at n = 2 would never prove n = 1, which the claim includes. The basis must be n = 1.`, `Starting at n = 3 leaves n = 1 and n = 2 unproved. The basis is the first value, n = 1.`] }
        ]}
      ]
    },

    /* ───────── FINAL 2024/2025 ───────── */
    {
      title: `Final Exam 2024/2025`,
      meta: `First term · 2 hours · 60 marks · 4 questions · Code BS 113 · Computer Science · Dr. Shereen Magdy, Dr. Marwa Yahya`,
      note: `Transcribed from two phone photos (the second one sideways). Circles and pencil notes on the paper are a student's (e.g. "E(x) = μ = 2.8", "q = 9, r = 2"); they agree with the worked answers. Q17–Q19 (relations) are not in any lecture file; see Lecture 11. Q7 is printed "p ∨ q → r".`,
      sections: [
        { title: `Question 1 · Part 1: Multiple choice questions`, marks: `20 marks`, items: [
          { type: `mcq`, q: `1) If p is a proposition, then p ∨ ¬p ≡`, o: [`T`, `F`, `(p ∨ ¬q)`, `q`], a: 0, why: `Negation law p ∨ ~p ≡ t: one of p, ¬p is always true, so the disjunction is a tautology (Theorem 1.1.1, law 5) (L4).`, ow: [null, `F (contradiction) is the result of the other negation law, p ∧ ¬p ≡ c. With ∨ the result is T.`, `q does not appear in p ∨ ¬p, and p ∨ ¬q is false when p = F, q = T, so it is not equivalent. The law gives T.`, `q is not in the expression; p ∨ ¬p is always true while q can be false. The negation law gives T.`] },
          { type: `mcq`, q: `2) The disjunction of propositions p and q, denoted by`, o: [`p ∨ q`, `p ∧ q`, `p − q`, `p / q`], a: 0, why: `Disjunction is the inclusive "or", written p ∨ q: true when p or q (or both) is true, false only when both are false (L3, Connectives).`, ow: [null, `p ∧ q is the conjunction ("and"), true only when both are true. Disjunction ("or") is p ∨ q.`, `"−" is not a logical connective in the lecture (it is set difference). The disjunction of p and q is p ∨ q.`, `"/" is division, not a logical connective. The lecture writes disjunction (inclusive or) as p ∨ q.`] },
          { type: `mcq`, q: `3) Here we use the equivalent (De Morgan's) logical law ¬(p ∨ q) is`, o: [`¬p ∧ ¬q`, `¬p ∨ ¬q`, `p ∧ ¬q`, `p → q`], a: 0, why: `De Morgan: ~(p ∨ q) ≡ ~p ∧ ~q. "Not (p or q)" means neither is true (Theorem 1.1.1, law 9; Table 3) (L4).`, ow: [null, `¬p ∨ ¬q is the other De Morgan law, ¬(p ∧ q). Negating an ∨ must turn it into ∧.`, `p ∧ ¬q is the negation of p → q (L5). De Morgan on ¬(p ∨ q) negates both parts: ¬p ∧ ¬q.`, `p → q ≡ ¬p ∨ q is true in 3 rows, while ¬(p ∨ q) is true only in row F, F. They are not equivalent.`] },
          { type: `mcq`, q: `4) A compound proposition that is always true is a`, o: [`tautology`, `contradiction`, `both`, `Identity`], a: 0, why: `A tautology is a statement form that is always true regardless of the truth values substituted for its variables, e.g. p ∨ ¬p (L4, Definitions).`, ow: [null, `A contradiction is always false (e.g. p ∧ ¬p), the opposite of what is asked. Always true is a tautology.`, `A column cannot be all T and all F at once, so a proposition cannot be both. Always true means tautology.`, `"Identity" names a law (p ∧ t ≡ p), not a kind of compound proposition. Always true is a tautology.`] },
          { type: `mcq`, q: `5) The Identity law p ∧ T ≡`, o: [`p`, `q`, `p ∨ q`, `T`], a: 0, why: `Identity law p ∧ t ≡ p: "and true" leaves p's value unchanged, so the column equals p (Theorem 1.1.1, law 4; Example 1.1.14) (L4).`, ow: [null, `q does not appear in p ∧ T, so it cannot be the result. The identity law gives p.`, `p ∨ q is true when p = F, q = T, but p ∧ T = F there. The identity law gives p.`, `T would be the universal bound result for p ∨ T ≡ t. With ∧, the T part changes nothing, giving p.`] },
          { type: `mcq`, q: `6) The Power Set of a set S, denoted P(S), if S = {1, 4} is`, o: [`p(s) = {2, 1}`, `p(s) = {0, Φ}`, `p(s) = {Φ, {1}, {4}, {1, 4}}`, `p(s) = ∅`], a: 2, why: `The power set lists all 2² = 4 subsets of {1, 4}: ∅, the singletons {1} and {4}, and {1, 4} itself (L1, Power set).`, ow: [`{2, 1} is not built from S at all: 2 is not in S, and its elements are numbers, not subsets. P(S) = {∅, {1}, {4}, {1, 4}}.`, `0 is not a subset of {1, 4}, and {1}, {4}, {1, 4} are missing. Every element of P(S) is itself a set.`, null, `A power set is never empty: ∅ and S itself are always members of P(S). Here P(S) has 2² = 4 elements.`] },
          { type: `mcq`, q: `7) If p, q and r are propositions, then p ∨ q → r is logically equivalent to`, o: [`(p → r) ∧ (q → r)`, `p → q`, `q → p`, `q → r`], a: 0, why: `Division into cases (Table 7): if either p or q leads to r, both p → r and q → r must hold, so (p ∨ q) → r ≡ (p → r) ∧ (q → r) (L5).`, ow: [null, `p → q drops r entirely. With p = q = T and r = F, p ∨ q → r is F but p → q is T.`, `q → p has no r. With p = q = T and r = F the original is F but q → p is T.`, `q → r ignores p. With p = T, q = F, r = F the original p ∨ q → r is F but q → r is T.`] },
          { type: `mcq`, q: `8) If a is not zero and we let r = 0 in the division relation, we get`, o: [`a = q × n`, `a = q`, `a = 0`, `a = n`], a: 0, why: `In the division relation a = q × n + r, setting r = 0 leaves a = q × n, i.e. n divides a (n | a) (L8, Divisibility).`, ow: [null, `Dropping r from a = q × n + r leaves a = q × n; the factor n does not disappear. a = q only when n = 1.`, `The question says a is not zero; r = 0 means a is an exact multiple of n, a = q × n.`, `a = n happens only in the special case q = 1. In general r = 0 gives a = q × n.`] },
          { type: `mcq`, q: `9) The result of the following operation 27 mod 5 is`, o: [`r = 2`, `r = 3`, `r = 1`, `r = 4`], a: 0, why: `a mod n keeps the remainder of a = q × n + r: 27 = 5 × 5 + 2, so 27 mod 5 = 2 (L8, Example 2.14).`, ow: [null, `r = 3 would need 27 − 3 = 24 to be a multiple of 5, which it is not. 27 = 5 × 5 + 2, so r = 2.`, `r = 1 would need 26 to be a multiple of 5. The largest multiple of 5 not above 27 is 25, leaving 2.`, `r = 4 would need 23 to be a multiple of 5. 27 − 25 = 2, so the residue is 2.`] },
          { type: `mcq`, q: `10) The integer 1 has only one divisor`, o: [`2`, `its self`, `4`, `5`], a: 1, why: `Fact 1: the integer 1 has only one divisor, itself.`, ow: [`2 does not divide 1 (1 = 0 × 2 + 1). Fact 1 says the integer 1 has only one divisor, itself.`, null, `4 does not divide 1 (1 = 0 × 4 + 1). Fact 1 says the integer 1 has only one divisor, itself.`, `5 does not divide 1 (remainder 1). By Fact 1 the only divisor of 1 is itself.`] },
          { type: `mcq`, q: `11) The null graph of n vertices is denoted by N_N has`, o: [`no edges`, `one edge`, `2 edge`, `3 edge`], a: 0, why: `A null graph N_n has n vertices and no edges at all, so every vertex is isolated with degree 0 (L9, Graphs, edges and degree).`, ow: [null, `A null graph has no edges at all; with even one edge two vertices would have degree 1 and not be isolated.`, `The defining property of N_n is that the edge set is empty, so it has 0 edges, not 2.`, `N_n has 0 edges whatever n is. A graph with 3 edges (e.g. a triangle) is not null.`] },
          { type: `mcq`, q: `12) The Multi Graph: if in a graph multiple edges between the same set of vertices, the graph having`, o: [`multiple edges`, `no edge`, `no loop`, `no vertices`], a: 0, why: `A multigraph allows multiple edges between the same pair of vertices; a simple graph forbids them (L9, Graphs, edges and degree).`, ow: [null, `A graph with no edges is the null graph N_n. A multigraph is defined by having multiple (parallel) edges.`, `"No loop" is part of the definition of a simple graph. A multigraph is defined by repeated edges between the same vertices.`, `A graph with no vertices cannot have any edges at all, let alone multiple ones. A multigraph has multiple edges.`] },
          { type: `mcq`, q: `13) The Expectation in the Discrete Random Variable is`, o: [`Σ x · f(x)`, `Σ x`, `Σ s(x)`, `Σ f(x)`], a: 0, why: `For a discrete random variable μ = E(X) = Σ xᵣ · f(xᵣ) = x₁f(x₁) + … + xₙf(xₙ): each value weighted by its probability (L7, Expectation).`, ow: [null, `Σ x just adds the values and ignores how likely each one is. The expectation weights each value: Σ x · f(x).`, `s(x) is not defined anywhere in the lecture. The expectation is Σ x · f(x), using the distribution f.`, `Σ f(x) is always 1 for any distribution (condition 2 of L6), so it cannot be the mean. E(X) = Σ x · f(x).`] },
          { type: `mcq`, q: `14) The exclusive or of propositions p and q, denoted by`, o: [`p ∨ q`, `p ∧ q`, `p ⊕ q`, `p − q`], a: 2, why: `Exclusive or is written p ⊕ q and is true when only one of p and q is true (false when both are T or both are F) (L3, Connectives).`, ow: [`p ∨ q is the inclusive or, which is also true when both are true. Exclusive or has its own symbol, p ⊕ q.`, `p ∧ q is conjunction ("and"), true only when both are true, which is exactly when ⊕ is false.`, null, `"−" is not one of the lecture's logical connectives (it is set difference or subtraction). Exclusive or is written p ⊕ q.`] },
          { type: `mcq`, q: `15) Logical equivalences involving biconditional statements: p ↔ q ≡`, o: [`(p → q) ∧ (q → p)`, `p → q`, `¬p`, `p ∨ q`], a: 0, why: `p ↔ q means "p only if q" (p → q) and "p if q" (q → p); the truth table shows both columns agree (L5, Biconditional; Table 8).`, ow: [null, `p → q is only one direction ("only if"); in row F, T it is T while p ↔ q is F. The biconditional needs q → p too.`, `¬p ignores q: in row T, T it is F while p ↔ q is T.`, `p ∨ q is F in row F, F, but p ↔ q is T there (equal values), and p ∨ q is T in rows TF, FT where ↔ is F.`] },
          { type: `mcq`, q: `16) Logical equivalences involving conditional statements: ¬(p → q) ≡`, o: [`p ∨ q`, `p ∧ ¬q`, `p ∨ ¬q`, `p → q`], a: 1, why: `p → q is false only for a true hypothesis and false conclusion, so ¬(p → q) ≡ p ∧ ¬q (Table 7; derived from ¬(¬p ∨ q) by De Morgan) (L5).`, ow: [`p ∨ q is true in three rows, but ¬(p → q) is true only in row p = T, q = F. The correct form is p ∧ ¬q.`, null, `p ∨ ¬q ≡ q → p (the converse), which is true in three rows. The negation of p → q is true in only one: p ∧ ¬q.`, `p → q is the original statement, the opposite of its negation in every row. ¬(p → q) ≡ p ∧ ¬q.`] },
          { type: `mcq`, q: `17) A binary relation R from A to B, written`, o: [`B → A`, `A → B`, `A − B`, `A / B`], a: 1, why: `A binary relation from A to B is a subset of A × B, written R: A → B in the 2024/25 paper (L11, Binary relations).`, ow: [`B → A is a relation from B to A, a subset of B × A. A relation from A to B is written A → B.`, null, `A − B is set difference (L2), a set of elements, not of ordered pairs. A relation from A to B is R: A → B.`, `A / B is not a notation used for relations. A relation from A to B is written A → B, with R ⊆ A × B.`] },
          { type: `mcq`, q: `18) The notation aRb means`, o: [`(a, b) ∈ R`, `(a, b) → R`, `(a, b) ⊂ R`, `(a, b) = R`], a: 0, why: `aRb is shorthand for (a, b) ∈ R: the ordered pair is one of the elements of the relation (L11, Binary relations).`, ow: [null, `→ names the direction of a relation (A → B), not membership of a pair. aRb means (a, b) ∈ R.`, `A pair (a, b) is an element of R, so ∈ is used, not ⊂ (see L1, ∈ versus ⊆). aRb means (a, b) ∈ R.`, `R is a set of pairs, so one pair cannot equal it (unless R had a single element written as a set). aRb means (a, b) ∈ R.`] },
          { type: `mcq`, q: `19) The Identity relation I_A on a set A is the set`, o: [`{(a, a)}`, `{(a, a) | a ∈ A}`, `{(a, a) / a &lt; A}`, `{(a, a) ≥ A}`], a: 1, why: `The identity relation I_A pairs every element of A with itself: {(a, a) | a ∈ A}; e.g. I_{1,2} = {(1,1), (2,2)} (L11, Binary relations).`, ow: [`{(a, a)} is a single pair with no condition saying a ranges over A. I_A needs all pairs: {(a, a) | a ∈ A}.`, null, `"a &lt; A" compares an element with a set, which has no meaning. The condition must be a ∈ A.`, `"(a, a) ≥ A" compares a pair with a set, which is not defined, and has no set-builder condition. I_A = {(a, a) | a ∈ A}.`] },
          { type: `mcq`, q: `20) A compound proposition that is always false is a`, o: [`tautology`, `contradiction`, `both`, `True`], a: 1, why: `A contradiction is a statement form that is always false regardless of the truth values substituted, e.g. p ∧ ¬p (L4, Definitions).`, ow: [`A tautology is the opposite: always true whatever values its variables take (e.g. p ∨ ¬p). Always false is a contradiction.`, null, `A tautology is all T and a contradiction is all F; one truth table column cannot be both. Always false means contradiction only.`, `"True" is a truth value, not a type of compound proposition, and the question describes always false. That is a contradiction.`] }
        ]},
        { title: `Question 2 · Part 2: Essay`, marks: `15 marks`, items: [
          { type: `written`, q: `(a) X is a discrete random variable with distribution x: 1, 2, 3, 4; f(x): 0.2, 0.1, a, 0.3. (i) Find the value of a. (ii) Find E(x) and V(x).`, ans: `<b>(i)</b> Σ f(x) = 1 → 0.2 + 0.1 + a + 0.3 = 1 → <b>a = 0.4</b>.<br><b>(ii)</b> E(X) = 1(0.2) + 2(0.1) + 3(0.4) + 4(0.3) = 0.2 + 0.2 + 1.2 + 1.2 = <b>2.8</b>.<br>E(X²) = 1(0.2) + 4(0.1) + 9(0.4) + 16(0.3) = 0.2 + 0.4 + 3.6 + 4.8 = 9.0.<br>V(X) = E(X²) − μ² = 9.0 − 2.8² = 9.0 − 7.84 = <b>1.16</b> (σ ≈ 1.077). (L6, L7)` },
          { type: `written`, q: `(b) Use a truth table to show that p ↔ q ≡ (p → q) ∧ (q → p).`, ans: `<table><tr><th>p</th><th>q</th><th>p→q</th><th>q→p</th><th>p↔q</th><th>(p→q)∧(q→p)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td></tr></table>The p ↔ q and (p → q) ∧ (q → p) columns always have the same truth values, so they are logically equivalent (L5).` }
        ]},
        { title: `Question 3 · Part 2: Essay`, marks: `15 marks`, items: [
          { type: `written`, q: `(a) Prove the following formula by induction: 1 + 2 + 3 + … + n = n(n + 1)/2.`, ans: `Basis n = 1: LHS = 1, RHS = 1·2/2 = 1 ✓.<br>Hypothesis: assume 1 + 2 + … + k = k(k + 1)/2.<br>Step: 1 + 2 + … + k + (k + 1) = k(k + 1)/2 + (k + 1) = [k(k + 1) + 2(k + 1)]/2 = (k + 1)(k + 2)/2, which is the formula with n = k + 1 ✓.<br>Therefore the formula holds for all n ≥ 1 (L11).` },
          { type: `written`, q: `(b) Consider the digraph G with edges e5: 2→1, e1: 1→3, e2: 4→2, e3: 4→3, e4: 3→2. (i) Find the adjacency matrix of G. (ii) Find the list of edges.`, ans: `<b>(i)</b><table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th></tr><tr><th>1</th><td>0</td><td>0</td><td>1</td><td>0</td></tr><tr><th>2</th><td>1</td><td>0</td><td>0</td><td>0</td></tr><tr><th>3</th><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><th>4</th><td>0</td><td>1</td><td>1</td><td>0</td></tr></table>(This is matrix A₂ of the lecture.)<br><b>(ii)</b> V(1) = {3}, V(2) = {1}, V(3) = {2}, V(4) = {2, 3}; i.e. E = {e1 = (1,3), e2 = (4,2), e3 = (4,3), e4 = (3,2), e5 = (2,1)}. (L9)` }
        ]},
        { title: `Question 4`, marks: `10 marks`, items: [
          { type: `written`, q: `(a) What are the quotient and remainder when 101 is divided by 11?`, ans: `101 = 9 × 11 + 2 (9 × 11 = 99, 101 − 99 = 2), so <b>q = 9, r = 2</b> (a = q × n + r with 0 ≤ r &lt; 11). (L8)` },
          { type: `written`, q: `(b) Verify the logical equivalence ¬(¬p ∧ q) ∧ (p ∨ q) ≡ p by using laws.`, ans: `¬(¬p ∧ q) ∧ (p ∨ q) ≡ (¬(¬p) ∨ ¬q) ∧ (p ∨ q) [De Morgan] ≡ (p ∨ ¬q) ∧ (p ∨ q) [double negative] ≡ p ∨ (¬q ∧ q) [distributive] ≡ p ∨ (q ∧ ¬q) [commutative] ≡ p ∨ c [negation] ≡ p [identity] ■ (L4)` }
        ]}
      ]
    },

    /* ───────── FINAL 2023/2024 ───────── */
    {
      title: `Final Exam 2023/2024`,
      meta: `First term · 2 hours · 60 marks · 4 questions · Code BS 204 · Computer Science 2nd year · Dr. Shereen Magdy, Dr. Marwa Yahya`,
      note: `Transcribed from a 2-page scan (four exam pages). A shadow covers part of pages 3–4 but all text is readable. In Q4 the arrow heads are hard to see; the graph has the same shape and labels as the lecture's 5-vertex sparse-representation example, so the lecture directions are used (5→1, 1→2, 2→3, 1→3, 5→3, 5→4, 3→4). Q11 writes "a/b" for "a divides b".`,
      sections: [
        { title: `Question 1 · Part 1: Multiple choice questions`, marks: `20 marks`, items: [
          { type: `mcq`, q: `1- A compound proposition that is always false is a`, o: [`tautology`, `contradiction`, `both`, `true`], a: 1, why: `A contradiction is a statement form that is always false regardless of the truth values substituted, e.g. p ∧ ¬p (L4, Definitions).`, ow: [`A tautology is the opposite: always true whatever values its variables take (e.g. p ∨ ¬p). Always false is a contradiction.`, null, `A tautology is all T and a contradiction is all F; one truth table column cannot be both. Always false means contradiction only.`, `"True" is a truth value, not a type of compound proposition, and the question describes always false. That is a contradiction.`] },
          { type: `mcq`, q: `2- The Power Set of a set S, denoted P(S), if S = {1, 2} is`, o: [`p(s) = {0, 1}`, `p(s) = {0, Φ}`, `p(s) = {Φ, {1}, {2}, {1, 2}}`, `{0}`], a: 2, why: `P(S) is the set of all subsets of S; for S = {1, 2} these are ∅, {1}, {2} and {1, 2}, 2² = 4 in total (L1, Power set).`, ow: [`{0, 1} contains numbers, not subsets, and 0 is not even in S. The elements of P(S) must be sets: ∅, {1}, {2}, {1, 2}.`, `0 is not a subset of {1, 2}; besides ∅, the subsets {1}, {2} and {1, 2} are missing. |P(S)| must be 2² = 4.`, null, `{0} has one element, a number that is not a subset of S. P(S) must have 2² = 4 sets as elements, including ∅ and S.`] },
          { type: `mcq`, q: `3- The logical equivalences involving conditional statements p → q ≡`, o: [`p ∨ q`, `¬p ∨ q`, `p ∧ q`, `p + q`], a: 1, why: `p → q ≡ ¬p ∨ q, the key rewrite of Table 7: both are false only when p = T and q = F (L5).`, ow: [`p ∨ q differs from p → q in rows T, F (T vs F) and F, F (F vs T). The rewrite negates p: ¬p ∨ q.`, null, `p ∧ q is F in row F, F, where p → q is T (false hypothesis). It matches only rows TT and TF.`, `"+" is arithmetic (or OR in circuit notation) and is not one of the lecture's connectives. p → q ≡ ¬p ∨ q.`] },
          { type: `mcq`, q: `4- Here we use the equivalent (De Morgan's) logical law ¬(p ∧ q) is`, o: [`¬p ∧ ¬q`, `¬p ∨ ¬q`, `p ∧ ¬q`, `p → q`], a: 1, why: `De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q. "Not both" means at least one is false (Theorem 1.1.1, law 9) (L4).`, ow: [`¬p ∧ ¬q is De Morgan's result for ¬(p ∨ q). Negating an ∧ turns it into ∨: ¬p ∨ ¬q.`, null, `p ∧ ¬q is the negation of p → q (L5). De Morgan negates both parts and flips ∧ to ∨: ¬p ∨ ¬q.`, `p → q is F only in row T, F, but ¬(p ∧ q) is F only in row T, T. They differ, so this is not De Morgan.`] },
          { type: `mcq`, q: `5- Logical equivalences involving biconditional statements: p ↔ q ≡`, o: [`(p → q) ∧ (q → p)`, `p → q`, `¬p`, `¬p ∧ q`], a: 0, why: `p ↔ q means "p only if q" (p → q) and "p if q" (q → p); the truth table shows both columns agree (L5, Biconditional; Table 8).`, ow: [null, `p → q is only one direction ("only if"); in row F, T it is T while p ↔ q is F. The biconditional needs q → p too.`, `¬p ignores q: in row T, T it is F while p ↔ q is T.`, `¬p ∧ q is true only at p = F, q = T, where p ↔ q is F, and it is F at p = q = T, where p ↔ q is T.`] },
          { type: `mcq`, q: `6- The commutative laws p ∧ q ≡`, o: [`q ∧ p`, `¬p ∨ q`, `p ∧ ¬q`, `p ∨ ¬q`], a: 0, why: `Commutative law p ∧ q ≡ q ∧ p: swapping the order of an "and" does not change its value (Theorem 1.1.1, law 1) (L4).`, ow: [null, `¬p ∨ q is equivalent to p → q (L4, Table 4), not to p ∧ q; e.g. at p = F it is T while p ∧ q is F.`, `p ∧ ¬q is the negation of p → q; it is T at p = T, q = F, where p ∧ q is F.`, `p ∨ ¬q is T at p = F, q = F, where p ∧ q is F, so it is not equivalent. Commutative just swaps: q ∧ p.`] },
          { type: `mcq`, q: `7- The logical equivalences involving conditional statements ¬(p → q) ≡`, o: [`p ∧ ¬q`, `q → p`, `¬p ∧ q`, `q ∧ ¬p`], a: 0, why: `The only row where p → q is false is p = T, q = F, so its negation is "p and not q": ¬(p → q) ≡ p ∧ ¬q (L5, Table 7).`, ow: [null, `q → p is the converse of p → q, another if-then. The negation of an if-then is an "and" statement: p ∧ ¬q.`, `¬p ∧ q is true only at p = F, q = T, which is ¬(q → p), the negation of the converse. ¬(p → q) ≡ p ∧ ¬q.`, `q ∧ ¬p is ¬p ∧ q (commutative), the negation of q → p. Negating p → q needs p true and q false: p ∧ ¬q.`] },
          { type: `mcq`, q: `8- The graph has no edges, and the n vertices is denoted by N_n is`, o: [`null Graph`, `simple Graph`, `Multi-Graph`, `cycle Graph`], a: 0, why: `The lecture defines the null graph N_n as a graph on n vertices with no edges (all vertices isolated) (L9, Graphs, edges and degree).`, ow: [null, `A simple graph only forbids self-loops and multiple edges; it may have many edges (K_n is simple). No edges is a null graph.`, `A multigraph has multiple edges between the same pair of vertices, the opposite of having no edges.`, `A cycle graph on n vertices has n edges forming a closed loop. A graph with no edges is the null graph.`] },
          { type: `mcq`, q: `9- In the graph G(V, E) the edge set is made of ordered vertex pairs, it is called`, o: [`directed graph`, `undirected graph`, `null graph`, `multi graph`], a: 0, why: `When edges are ordered pairs (v_s, v_t), each edge has a direction from source to terminal: a directed graph (L9, Directed graphs).`, ow: [null, `In an undirected graph the edges are unordered pairs: (u, v) and (v, u) are the same edge. Ordered pairs give a digraph.`, `A null graph has an empty edge set, so its edges are neither ordered nor unordered pairs.`, `A multigraph is about repeated edges between the same vertices, not about the order of the pair.`] },
          { type: `mcq`, q: `10- The (p → q) ∨ (q → p) is a`, o: [`tautology`, `contradiction`, `both`, `equivalent`], a: 0, why: `P → Q and Q → P are never both false (the only F row of each is different), so the disjunction is T in all four rows: a tautology (L3, Example).`, ow: [null, `A contradiction is false in every row, but this formula is true in every row: when P → Q is F (row T, F), Q → P is T.`, `A tautology is true in every row and a contradiction is false in every row; no formula can be both. This one is all T.`, `"Equivalent" describes a relation between two statements with equal truth tables, not a type of single statement.`] },
          { type: `mcq`, q: `11- If a | b and b | c, then`, o: [`c | a`, `a | c`, `a = 1, b = 1`, `a · b = 0`], a: 1, why: `Property 3: if a | b and b | c, then a | c. If b = ka and c = mb, then c = (mk)a (L8, Divisibility).`, ow: [`c | a reverses the direction: from 2 | 4 and 4 | 8 we get 2 | 8, not 8 | 2. Property 3 gives a | c.`, null, `Nothing forces a = b = 1: for example 2 | 4 and 4 | 8 with a = 2, b = 4. The conclusion is a | c.`, `Divisibility does not make a product zero: with 2 | 4 and 4 | 8, a · b = 8. Property 3 gives a | c.`] },
          { type: `mcq`, q: `12- The result of the operation 27 mod 5 is`, o: [`r = 2`, `r = 3`, `r = 0`, `r = 1`], a: 0, why: `a mod n keeps the remainder of a = q × n + r: 27 = 5 × 5 + 2, so 27 mod 5 = 2 (L8, Example 2.14).`, ow: [null, `r = 3 would need 27 − 3 = 24 to be a multiple of 5, which it is not. 27 = 5 × 5 + 2, so r = 2.`, `r = 0 would mean 5 divides 27 exactly, but 27 = 5 × 5 + 2, so the remainder is 2.`, `r = 1 would need 26 to be a multiple of 5. The largest multiple of 5 not above 27 is 25, leaving 2.`] },
          { type: `mcq`, q: `13- The exclusive or of propositions p and q, denoted by`, o: [`p ∨ q`, `p ∧ q`, `p ⊕ q`, `p → q`], a: 2, why: `Exclusive or is written p ⊕ q and is true when only one of p and q is true (false when both are T or both are F) (L3, Connectives).`, ow: [`p ∨ q is the inclusive or, which is also true when both are true. Exclusive or has its own symbol, p ⊕ q.`, `p ∧ q is conjunction ("and"), true only when both are true, which is exactly when ⊕ is false.`, null, `p → q is the implication (conditional), false only for T → F. Exclusive or is written p ⊕ q.`] },
          { type: `mcq`, q: `14- The negation of the statement (At least a foot of snow falls in Boulder on Fridays) is`, o: [`Less than a foot of snow falls in Boulder on Fridays`, `A foot of snow falls in Boulder in the morning`, `A foot of snow falls in Boulder on Sunday`, `Less than a foot of snow falls in Boulder in the morning`], a: 0, why: `The lecture's example: "at least" becomes "less than", Fridays stays.`, ow: [null, `This changes "on Fridays" to "in the morning" and keeps "a foot of snow"; it is a different statement, not "it is not the case that p".`, `This only moves the day to Sunday; both statements could be true at once, so it is not a negation. Negate the amount: "less than a foot".`, `It negates the amount correctly but replaces "on Fridays" with "in the morning". The negation keeps the day: less than a foot on Fridays.`], key: `A pen mark sits next to option (b) on the scan; it may be a student's choice, but (a) is the lecture's answer.` },
          { type: `mcq`, q: `15- The result of the operation 36 mod 12 is`, o: [`r = 0`, `r = 10`, `r = 4`, `r = 6`], a: 0, why: `36 = 3 × 12 + 0, so 12 divides 36 exactly and 36 mod 12 = 0 (L8, Example 2.14).`, ow: [null, `r = 10 would need 36 − 10 = 26 to be a multiple of 12. 36 = 3 × 12 exactly, so the remainder is 0.`, `r = 4 would need 32 to be a multiple of 12. Since 36 = 3 × 12, the residue is 0.`, `r = 6 would need 30 to be a multiple of 12. 36 is itself a multiple (3 × 12), so 36 mod 12 = 0.`] },
          { type: `mcq`, q: `16- Here we use the (De Morgan's) logical law (A ∧ B)ᶜ is`, o: [`Aᶜ ∧ Bᶜ`, `A ∨ B`, `Aᶜ ∨ Bᶜ`, `A ∩ B`], a: 2, why: `De Morgan: the complement of an intersection is the union of the complements, (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ, written here as Aᶜ ∨ Bᶜ (L2, Set identities).`, ow: [`Aᶜ ∩ Bᶜ is the complement of a union, (A ∪ B)ᶜ, the other De Morgan law. Complementing an intersection flips ∩ to ∪.`, `A ∨ B (A ∪ B) has no complements at all. De Morgan complements each set and flips the operation: Aᶜ ∪ Bᶜ.`, null, `A ∩ B is the original set before complementing; its complement is a different set, Aᶜ ∪ Bᶜ by De Morgan.`] },
          { type: `mcq`, q: `17- The conjunction of propositions p and q, denoted by`, o: [`p ∧ q`, `p ∨ q`, `p − q`, `p | q`], a: 0, why: `Conjunction means "and", written p ∧ q (also p · q): it is true only when both p and q are true (L3, Connectives).`, ow: [null, `p ∨ q is the disjunction ("or"), true when at least one part is true. Conjunction ("and") is p ∧ q.`, `"−" is set difference or subtraction, not one of the lecture's logical connectives (¬, ∧, ∨, ⊕, →, ↔). Conjunction is p ∧ q.`, `The bar | (in other texts the NAND or Sheffer stroke) is not one of the lecture's connectives. Conjunction is written p ∧ q.`] },
          { type: `mcq`, q: `18- The Negation laws p ∧ ¬p ≡`, o: [`T`, `c (F)`, `p`, `¬p`], a: 1, why: `Negation law p ∧ ~p ≡ c: p and ¬p always have opposite values, so their conjunction is always false (Theorem 1.1.1, law 5) (L4).`, ow: [`T is the result of the other negation law, p ∨ ¬p ≡ t. With ∧, p and ¬p can never both be true.`, null, `p is T in one row, but p ∧ ¬p is F in every row. The negation law gives c (contradiction).`, `¬p is T when p = F, but then p ∧ ¬p = F ∧ T = F. The result is always F, c.`] },
          { type: `mcq`, q: `19- The number of Power Set of a set S, denoted n(P(S)), if S = {1, 2} is`, o: [`{{1}, {2}, {1, 2}, ∅}`, `{{1}}`, `4`, `6`], a: 2, why: `If |S| = n then n(P(S)) = 2ⁿ. Here n = 2, so 2² = 4: ∅, {1}, {2}, {1, 2} (L1, Power set).`, ow: [`This is the power set itself, not its number of elements.`, `n(P(S)) asks for a number (the cardinality), and {{1}} is a set. Also it lists only one subset; P(S) has 2² = 4.`, null, `6 is not a power of 2, and a power set always has 2ⁿ elements. For n = 2 that is 2² = 4 (6 would be a guess like 2 × 3).`] },
          { type: `mcq`, q: `20- The p ∧ (p ∨ q) ≡`, o: [`p`, `q`, `¬p`, `¬q`], a: 0, why: `Absorption p ∧ (p ∨ q) ≡ p: if p is T then p ∨ q is T too; if p is F the conjunction is F (Theorem 1.1.1, law 10) (L4).`, ow: [null, `At p = F, q = T the expression is F ∧ T = F but q is T, so it is not q. Absorption leaves p.`, `¬p is the opposite of p, and the expression equals p, so the two disagree in every row.`, `At p = T, q = T the expression is T but ¬q is F. Absorption gives p.`] }
        ]},
        { title: `Question 2 · Part 2: Essay`, marks: `20 marks`, items: [
          { type: `written`, q: `(a) Let U = {1,2,3,4,5,6,7,8,9,10}, A = {1,2,4,5}, B = {1,3,7,8,9}, C = {1,3,7,9}. Find (i) Aᶜ ∩ B (ii) Aᶜ ∩ Bᶜ (iii) A ∪ Bᶜ (iv) P(A). (12 marks)`, ans: `Aᶜ = U − A = {3,6,7,8,9,10}; Bᶜ = {2,4,5,6,10}.<br><b>(i)</b> Aᶜ ∩ B = {3,7,8,9} (= B − A).<br><b>(ii)</b> Aᶜ ∩ Bᶜ = {6,10} (= (A ∪ B)ᶜ, since A ∪ B = {1,2,3,4,5,7,8,9}).<br><b>(iii)</b> A ∪ Bᶜ = {1,2,4,5} ∪ {2,4,5,6,10} = {1,2,4,5,6,10}.<br><b>(iv)</b> |A| = 4 → 2⁴ = 16 subsets: P(A) = {∅, {1}, {2}, {4}, {5}, {1,2}, {1,4}, {1,5}, {2,4}, {2,5}, {4,5}, {1,2,4}, {1,2,5}, {1,4,5}, {2,4,5}, {1,2,4,5}}. (C is not used.) (L1, L2)` },
          { type: `written`, q: `(b) X is a discrete random variable: x: 0, 2, 3, 4; f(x): 0.1, 0.1, a, 0.2. Find the value of a and E(x). (8 marks)`, ans: `Σ f(x) = 1 → 0.1 + 0.1 + a + 0.2 = 1 → <b>a = 0.6</b>.<br>E(X) = 0(0.1) + 2(0.1) + 3(0.6) + 4(0.2) = 0 + 0.2 + 1.8 + 0.8 = <b>2.8</b>. (This is the "try to solve" exercise of L7.)` }
        ]},
        { title: `Question 3`, marks: `10 marks`, items: [
          { type: `written`, q: `(a) The weekly demand for a drinking-water product, in thousands of liters, is a continuous random variable X with f(x) = 2(x − 1) for 1 < x < 2, 0 otherwise. Find the mean and variance of X. (5 marks)`, ans: `μ = ∫₁² x·2(x − 1) dx = 2[x³/3 − x²/2]₁² = 2[(8/3 − 2) − (1/3 − 1/2)] = 2(2/3 + 1/6) = <b>5/3</b>.<br>E(X²) = ∫₁² x²·2(x − 1) dx = 2[x⁴/4 − x³/3]₁² = 2[(4 − 8/3) − (1/4 − 1/3)] = 2(4/3 + 1/12) = 17/6.<br>σ² = E(X²) − μ² = 17/6 − 25/9 = 51/18 − 50/18 = <b>1/18</b>. (Lecture 7, Example 5)` },
          { type: `written`, q: `(b) Show that p ↔ q ≡ (p → q) ∧ (q → p) by using a truth table. (5 marks)`, ans: `<table><tr><th>p</th><th>q</th><th>p→q</th><th>q→p</th><th>p↔q</th><th>(p→q)∧(q→p)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td></tr></table>The two result columns are identical, so the statements are equivalent (L5).` }
        ]},
        { title: `Question 4`, marks: `10 marks (5 + 5)`, items: [
          { type: `written`, q: `Consider the graph G (vertices 1–5; edges e1: 5–1, e2: 1–2, e3: 2–3, e7: 1–3, e6: 5–3, e5: 5–4, e4: 4–3). (i) Find the adjacency matrix of G. (ii) Find the list of edges.`, ans: `Using the lecture directions 5→1, 1→2, 2→3, 1→3, 5→3, 5→4, 3→4:<br><b>(i)</b><table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><th>1</th><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td></tr><tr><th>2</th><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td></tr><tr><th>3</th><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td></tr><tr><th>4</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><th>5</th><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td></tr></table><b>(ii)</b> V(1) = {2, 3}, V(2) = {3}, V(3) = {4}, V(4) = ∅, V(5) = {1, 3, 4}.<br>If the graph is read as <b>undirected</b>, the adjacency matrix is symmetric: 1: 0 1 1 0 1; 2: 1 0 1 0 0; 3: 1 1 0 1 1; 4: 0 0 1 0 1; 5: 1 0 1 1 0, and the edge list is {5,1}, {1,2}, {2,3}, {1,3}, {5,3}, {5,4}, {4,3}. (L9)` }
        ]}
      ]
    },

    /* ───────── SUMMER 2023/2024 ───────── */
    {
      title: `Summer Exam 2023/2024`,
      meta: `Summer term · 2 hours · 60 marks · 3 questions · Code BS 113 · Computer Science 1st year · Dr. Shereen Magdy, Dr. Marwa Yahya`,
      note: `One-page scan, fully readable. In Q2 vertex a carries a loop (drawn as a large circle around a). The answer uses the Rosen convention of writing 1 on the diagonal for a loop; some books write 2.`,
      sections: [
        { title: `Question 1`, marks: `20 marks`, items: [
          { type: `written`, q: `(a) Let U = {1, 2, 3, 4, 5, 6, 7, 8, …}, A = {1,2,3,4}, B = {3,4,5,6,7}, C = {2,3,8,9}. Find (i) Aᶜ ∩ B (ii) Aᶜ ∩ Bᶜ (iii) A ∪ B (iv) P(A).`, ans: `U = N, so Aᶜ = {5, 6, 7, 8, …}.<br><b>(i)</b> Aᶜ ∩ B = {5, 6, 7} (= B − A).<br><b>(ii)</b> A ∪ B = {1,…,7}, so Aᶜ ∩ Bᶜ = (A ∪ B)ᶜ = {8, 9, 10, …}.<br><b>(iii)</b> A ∪ B = {1, 2, 3, 4, 5, 6, 7}.<br><b>(iv)</b> 2⁴ = 16 subsets: {∅, {1}, {2}, {3}, {4}, {1,2}, {1,3}, {1,4}, {2,3}, {2,4}, {3,4}, {1,2,3}, {1,2,4}, {1,3,4}, {2,3,4}, {1,2,3,4}}. (L1, L2; same sets as the lecture example)` },
          { type: `written`, q: `(b) Show that (p → q) ∨ (q → p) is a tautology.`, ans: `<table><tr><th>p</th><th>q</th><th>p→q</th><th>q→p</th><th>(p→q)∨(q→p)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>T</td><td>T</td></tr><tr><td>F</td><td>T</td><td>T</td><td>F</td><td>T</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td></tr></table>The last column is all T, so it is a tautology. By laws: (¬p ∨ q) ∨ (¬q ∨ p) ≡ (¬p ∨ p) ∨ (q ∨ ¬q) ≡ T ∨ T ≡ T. (L3)` }
        ]},
        { title: `Question 2`, marks: `20 marks`, items: [
          { type: `written`, q: `Consider the graph G with vertices a, b, c, d: a loop at a, and edges a–b, a–c, b–d, c–d. (i) Find deg(a). (ii) Find the adjacency matrix of G.`, ans: `<b>(i)</b> deg(a) = 2 (the loop counts twice) + 1 (a–b) + 1 (a–c) = <b>4</b>.<br><b>(ii)</b> Order a, b, c, d:<table><tr><th></th><th>a</th><th>b</th><th>c</th><th>d</th></tr><tr><th>a</th><td>1</td><td>1</td><td>1</td><td>0</td></tr><tr><th>b</th><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><th>c</th><td>1</td><td>0</td><td>0</td><td>1</td></tr><tr><th>d</th><td>0</td><td>1</td><td>1</td><td>0</td></tr></table>The matrix is symmetric (undirected). Check: degrees a = 4, b = 2, c = 2, d = 2, sum 10 = 2 × 5 edges (handshake). (L9)` }
        ]},
        { title: `Question 3`, marks: `20 marks`, items: [
          { type: `written`, q: `Show that ¬(p ∨ (¬p ∧ q)) and (¬p ∧ ¬q) are logically equivalent by using laws.`, ans: `¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬(¬p ∧ q) [second De Morgan]<br>≡ ¬p ∧ [¬(¬p) ∨ ¬q] [first De Morgan]<br>≡ ¬p ∧ (p ∨ ¬q) [double negation]<br>≡ (¬p ∧ p) ∨ (¬p ∧ ¬q) [second distributive]<br>≡ F ∨ (¬p ∧ ¬q) [¬p ∧ p ≡ F]<br>≡ (¬p ∧ ¬q) ∨ F [commutative]<br>≡ ¬p ∧ ¬q [identity law for F] ■ (L5)` }
        ]}
      ]
    },

    /* ───────── PHOTO DATED AUG 2024 (partial) ───────── */
    {
      title: `Final Exam (photo dated Aug 2024, partial)`,
      meta: `60 marks · 3 questions · 1 page · Dr. Shereen Magdy, Dr. Abdelrehem Ahmed`,
      note: `Only the top of the paper is in the photo: the academic year/term header is cut off, and the photo ends at the "Q3 [20 marks]" heading, so Question 3 is missing. The year is unknown (the image was sent in August 2024).`,
      sections: [
        { title: `Question 1`, marks: `20 marks`, items: [
          { type: `written`, q: `(a) Use a truth table to verify p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r).`, ans: `<table><tr><th>p</th><th>q</th><th>r</th><th>q∨r</th><th>p∧(q∨r)</th><th>p∧q</th><th>p∧r</th><th>(p∧q)∨(p∧r)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td><td>F</td><td>T</td></tr><tr><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td><td>F</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td></tr></table>Columns 5 and 8 are identical, so the distributive law holds. (L4)` },
          { type: `written`, q: `(b) Find the result of: (i) 27 mod 5 (ii) 36 mod 12.`, ans: `(i) 27 = 5 × 5 + 2 → <b>2</b>. (ii) 36 = 3 × 12 + 0 → <b>0</b>. (L8)` }
        ]},
        { title: `Question 2`, marks: `20 marks`, items: [
          { type: `written`, q: `(a) Let U = {1,…,9}, A = {1,2,3,4}, B = {3,4,5,6,8}, C = {1,3,4,9}. Find (i) Aᶜ ∩ B (ii) Aᶜ ∩ Bᶜ (iii) A ∪ B (iv) P(A).`, ans: `Aᶜ = {5,6,7,8,9}.<br><b>(i)</b> Aᶜ ∩ B = {5, 6, 8}.<br><b>(ii)</b> A ∪ B = {1,2,3,4,5,6,8} → Aᶜ ∩ Bᶜ = (A ∪ B)ᶜ = {7, 9}.<br><b>(iii)</b> A ∪ B = {1, 2, 3, 4, 5, 6, 8}.<br><b>(iv)</b> 16 subsets: {∅, {1}, {2}, {3}, {4}, {1,2}, {1,3}, {1,4}, {2,3}, {2,4}, {3,4}, {1,2,3}, {1,2,4}, {1,3,4}, {2,3,4}, {1,2,3,4}}. (L1, L2)` },
          { type: `written`, q: `(b) Show that [¬p ∧ (p ∨ q)] → q is a tautology by using laws.`, ans: `[¬p ∧ (p ∨ q)] → q<br>≡ ¬[¬p ∧ (p ∨ q)] ∨ q [p → q ≡ ¬p ∨ q]<br>≡ [p ∨ ¬(p ∨ q)] ∨ q [De Morgan, double negation]<br>≡ [p ∨ (¬p ∧ ¬q)] ∨ q [De Morgan]<br>≡ [(p ∨ ¬p) ∧ (p ∨ ¬q)] ∨ q [distributive]<br>≡ [T ∧ (p ∨ ¬q)] ∨ q ≡ (p ∨ ¬q) ∨ q [negation, identity]<br>≡ p ∨ (¬q ∨ q) ≡ p ∨ T ≡ T [associative, negation, domination] ■<br>(Shorter: ¬p ∧ (p ∨ q) ≡ (¬p ∧ p) ∨ (¬p ∧ q) ≡ ¬p ∧ q, and (¬p ∧ q) → q ≡ p ∨ ¬q ∨ q ≡ T.) (L5)` }
        ]}
      ]
    },

    /* ───────── FINAL 2021/2022 ───────── */
    {
      title: `Final Exam 2021/2022`,
      meta: `First term · 2 hours · 60 marks · 4 questions · Code BS 113 · Computer Science 1st year · Dr. Shereen Magdy, Dr. Dena Mohamed`,
      note: `Transcribed from two phone photos; the right edge of page 1 is cut, but the third options can still be read. Pen ticks are a student's: they agree with the lectures except Q10 (student ticked p ∨ q for the conjunction; correct is p ∧ q). Q17: the dividend is printed −32 (a student wrote −34 above it) and option (a) is blurred ("q = −5" or "q = −6", r = 4); the correct division is −32 = (−6)(6) + 4, so (a) with r = 4 is the intended answer. Q3 is printed as "r ∨ p ∧ q" without brackets.`,
      sections: [
        { title: `Question 1 · Part 1: Multiple choice questions`, marks: `20 marks`, items: [
          { type: `mcq`, q: `1) The Power Set of a set S, denoted P(S), if S = {2, 4} is`, o: [`p(s) = {2, 1}`, `p(s) = {0, Φ}`, `p(s) = {Φ, {2}, {4}, {2, 4}}`], a: 2, why: `P(S) is the set of all subsets of S = {2, 4}: ∅, {2}, {4} and {2, 4}, giving 2² = 4 elements (L1, Power set).`, ow: [`{2, 1} contains numbers, and 1 is not in S. P(S) must contain the subsets of {2, 4}: ∅, {2}, {4}, {2, 4}.`, `0 is not a subset of {2, 4}, and {2}, {4}, {2, 4} are missing. A power set of a 2-element set has 2² = 4 elements.`, null] },
          { type: `mcq`, q: `2) If p and q are propositions, then p ∨ (p ∧ q) ≡`, o: [`p`, `q`, `p ∨ q`], a: 0, why: `Absorption law p ∨ (p ∧ q) ≡ p (Theorem 1.1.1, law 10): p ∧ q can only be true when p already is, so it adds nothing (L4).`, ow: [null, `q ignores p: with p = T and q = F the expression p ∨ (p ∧ q) is T but q is F.`, `In row p = F, q = T, p ∨ q is T but p ∨ (p ∧ q) = F ∨ F = F, so they are not equivalent.`] },
          { type: `mcq`, q: `3) The negation of the proposition r ∨ p ∧ q is`, o: [`¬r ∧ ¬p ∧ ¬q`, `¬r ∨ ¬p ∨ ¬q`, `¬r ∧ ¬p ∨ ¬q`], a: 2, why: `r ∨ (p ∧ q) negates to ¬r ∧ ¬(p ∧ q) = ¬r ∧ (¬p ∨ ¬q), printed as option c (L4, L5).`, ow: [`¬r ∧ ¬p ∧ ¬q negates r ∨ p ∨ q. Here p ∧ q is grouped, so De Morgan on it gives ¬p ∨ ¬q, not ¬p ∧ ¬q.`, `¬r ∨ ¬p ∨ ¬q negates r ∧ p ∧ q. The outer connective is ∨, so the negation must start ¬r ∧ ….`, null] },
          { type: `mcq`, q: `4) If p and q are propositions, then p ∧ T ≡`, o: [`p`, `q`, `(p ∨ ¬q)`], a: 0, why: `Identity law p ∧ t ≡ p: "and true" leaves p's value unchanged, so the column equals p (Theorem 1.1.1, law 4; Example 1.1.14) (L4).`, ow: [null, `q does not appear in p ∧ T, so it cannot be the result. The identity law gives p.`, `p ∨ ¬q is T at p = F, q = F, where p ∧ T = F. The identity law p ∧ t ≡ p gives p.`] },
          { type: `mcq`, q: `5) Let A and B be sets such that |A| = 4 and |B| = 3. Which of the following is always true?`, o: [`|A ∩ B| = 0`, `|A × B| = 12`, `|A − B| = 1`], a: 1, why: `A × B is all ordered pairs (a, b), and each of the 4 choices of a pairs with each of 3 choices of b: |A × B| = |A|·|B| = 4 × 3 = 12 (L2, Cartesian product).`, ow: [`|A ∩ B| = 0 holds only if A and B are disjoint. They may share up to 3 elements, so this is not always true.`, null, `|A − B| depends on how much A and B overlap: it is 4 if they are disjoint and 1 if all of B lies in A. So it is not always 1.`] },
          { type: `mcq`, q: `6) The negation of the statement "John is rich and he is not famous" is`, o: [`John is neither rich nor famous`, `John is either rich or famous`, `If John is famous, then he is rich`, `If John is rich, then he is famous`], a: 3, why: `¬(R ∧ ¬F) ≡ ¬R ∨ F by De Morgan and double negation, and ¬R ∨ F ≡ R → F: "If John is rich, then he is famous" (L5, Table 7).`, ow: [`"Neither rich nor famous" is ¬R ∧ ¬F; it is false when John is rich and famous, yet then the original (R ∧ ¬F) is false too.`, `"Rich or famous" (R ∨ F) is true when John is rich and not famous, the very case where the original is true.`, `F → R ≡ ¬F ∨ R is true when John is rich and not famous, where the original is also true, so it is not the negation.`, null] },
          { type: `mcq`, q: `7) Logical equivalences involving biconditional statements: p ↔ q ≡`, o: [`(p → q) ∧ (q → p)`, `p → q`, `¬p`], a: 0, why: `p ↔ q means "p only if q" (p → q) and "p if q" (q → p); the truth table shows both columns agree (L5, Biconditional; Table 8).`, ow: [null, `p → q is only one direction ("only if"); in row F, T it is T while p ↔ q is F. The biconditional needs q → p too.`, `¬p ignores q: in row T, T it is F while p ↔ q is T.`] },
          { type: `mcq`, q: `8) The disjunction of propositions p and q, denoted by`, o: [`p ∨ q`, `p ∧ q`, `p − q`], a: 0, why: `Disjunction is the inclusive "or", written p ∨ q: true when p or q (or both) is true, false only when both are false (L3, Connectives).`, ow: [null, `p ∧ q is the conjunction ("and"), true only when both are true. Disjunction ("or") is p ∨ q.`, `"−" is not a logical connective in the lecture (it is set difference). The disjunction of p and q is p ∨ q.`] },
          { type: `mcq`, q: `9) The statement (p ∧ q) → (p ∨ q) is`, o: [`tautology`, `contradiction`, `both`], a: 0, why: `(p ∧ q) → (p ∨ q) ≡ ¬(p ∧ q) ∨ (p ∨ q) ≡ (¬p ∨ p) ∨ (¬q ∨ q) ≡ T: whenever p ∧ q is true, p ∨ q is true (L5, Proof).`, ow: [null, `A contradiction is false in every row, but this implication is never false: whenever p ∧ q is T, p ∨ q is T too.`, `A form cannot be all T and all F at once. Every row here is T, so it is a tautology only.`] },
          { type: `mcq`, q: `10) The conjunction of propositions p and q, denoted by`, o: [`p ∧ q`, `p ∨ q`, `p − q`], a: 0, why: `Conjunction means "and", written p ∧ q (also p · q): it is true only when both p and q are true (L3, Connectives).`, ow: [null, `p ∨ q is the disjunction ("or"), true when at least one part is true. Conjunction ("and") is p ∧ q.`, `"−" is set difference or subtraction, not one of the lecture's logical connectives (¬, ∧, ∨, ⊕, →, ↔). Conjunction is p ∧ q.`], key: `The student tick on this paper is on (b) p ∨ q, which is the disjunction.` },
          { type: `mcq`, q: `11) The exclusive or of propositions p and q, denoted by`, o: [`p ∨ q`, `p ∧ q`, `p ⊕ q`], a: 2, why: `Exclusive or is written p ⊕ q and is true when only one of p and q is true (false when both are T or both are F) (L3, Connectives).`, ow: [`p ∨ q is the inclusive or, which is also true when both are true. Exclusive or has its own symbol, p ⊕ q.`, `p ∧ q is conjunction ("and"), true only when both are true, which is exactly when ⊕ is false.`, null] },
          { type: `mcq`, q: `12) Here we use the equivalent (De Morgan's) logical law ¬(p ∨ q) is`, o: [`¬p ∧ ¬q`, `¬p ∨ ¬q`, `p ∧ ¬q`], a: 0, why: `De Morgan: ~(p ∨ q) ≡ ~p ∧ ~q. "Not (p or q)" means neither is true (Theorem 1.1.1, law 9; Table 3) (L4).`, ow: [null, `¬p ∨ ¬q is the other De Morgan law, ¬(p ∧ q). Negating an ∨ must turn it into ∧.`, `p ∧ ¬q is the negation of p → q (L5). De Morgan on ¬(p ∨ q) negates both parts: ¬p ∧ ¬q.`] },
          { type: `mcq`, q: `13) The statement (p ∧ q) → (p → q) is`, o: [`tautology`, `contradiction`, `both`], a: 0, why: `When p ∧ q is true, q is true so p → q is true.`, ow: [null, `It is never false: an implication is F only for T → F, and when p ∧ q is T, q is T, so p → q is T.`, `A statement form cannot be always true and always false at once. All rows here are T: a tautology.`] },
          { type: `mcq`, q: `14) If p and q are propositions, then ¬p → q is logically equivalent to`, o: [`q → ¬p`, `p → ¬q`, `p ∨ q`], a: 2, why: `a → b ≡ ¬a ∨ b gives ¬p → q ≡ ¬(¬p) ∨ q ≡ p ∨ q by double negation (L5, Table 7: p ∨ q ≡ ¬p → q).`, ow: [`q → ¬p is the converse of ¬p → q, not equivalent: at p = T, q = T the original is T but q → ¬p is F.`, `p → ¬q ≡ ¬p ∨ ¬q is F at p = q = T, where ¬p → q (F → T) is T, so they are not equivalent.`, null] },
          { type: `mcq`, q: `15) Suppose A = {0, {0}} and B = {0}. Which one of the following statements is FALSE?`, o: [`B ∈ A`, `B ⊆ A`, `P(B) ⊂ A`], a: 2, why: `P(B) ⊂ A is the FALSE statement: P(B) = {∅, {0}}, and ∅ is not an element of A = {0, {0}}. B ∈ A and B ⊆ A are both true (L1, ∈ versus ⊆).`, ow: [`This statement is true, so it is not the answer: A = {0, {0}} lists {0} as an element, and {0} = B, so B ∈ A.`, `This statement is true, so it is not the answer: B = {0} has the single element 0, and 0 ∈ A, so B ⊆ A.`, null] },
          { type: `mcq`, q: `16) A compound proposition that is always true is a`, o: [`tautology`, `contradiction`, `both`], a: 0, why: `A tautology is a statement form that is always true regardless of the truth values substituted for its variables, e.g. p ∨ ¬p (L4, Definitions).`, ow: [null, `A contradiction is always false (e.g. p ∧ ¬p), the opposite of what is asked. Always true is a tautology.`, `A column cannot be all T and all F at once, so a proposition cannot be both. Always true means tautology.`] },
          { type: `mcq`, q: `17) The quotient and remainder when −32 is divided by 6 is`, o: [`q = −6 (blurred), r = 4`, `q = 6, r = 3`, `q = 4, r = 5`], a: 0, why: `−32 = (−6)(6) + 4, remainder must be non-negative.`, ow: [null, `6 × 6 + 3 = 39, not −32; the sign of a is ignored. −32 = (−6)(6) + 4 with 0 ≤ r &lt; 6.`, `4 × 6 + 5 = 29, not −32. For a negative dividend the quotient is negative: −32 = (−6)(6) + 4.`] },
          { type: `mcq`, q: `18) A compound proposition that is always false is a`, o: [`tautology`, `contradiction`, `both`], a: 1, why: `A contradiction is a statement form that is always false regardless of the truth values substituted, e.g. p ∧ ¬p (L4, Definitions).`, ow: [`A tautology is the opposite: always true whatever values its variables take (e.g. p ∨ ¬p). Always false is a contradiction.`, null, `A tautology is all T and a contradiction is all F; one truth table column cannot be both. Always false means contradiction only.`] },
          { type: `mcq`, q: `19) The greatest common divisor of 63 and 110 is`, o: [`9`, `6`, `1`], a: 2, why: `Euclid: 110 = 63 + 47, 63 = 47 + 16, 47 = 2·16 + 15, 16 = 15 + 1, 15 = 15·1 + 0 (L8).`, ow: [`9 divides 63 (63 = 7 × 9) but not 110 (110 = 12 × 9 + 2), so it is not a common divisor.`, `6 does not divide 63 (63 is odd) and does not divide 110 either (110 = 18 × 6 + 2).`, null] },
          { type: `mcq`, q: `20) The quotient q and remainder r when 165 is divided by 18 are`, o: [`q = 9, r = 4`, `q = 8, r = 4`, `q = 9, r = 3`], a: 2, why: `In a = q × n + r with 0 ≤ r &lt; n: 9 × 18 = 162 and 165 − 162 = 3, so q = 9, r = 3 (L8, Division relation).`, ow: [`9 × 18 + 4 = 166, not 165. The quotient 9 is right but the remainder is 165 − 162 = 3.`, `8 × 18 + 4 = 148, not 165. With q = 8 the remainder would be 21 ≥ 18, so q must be 9, r = 3.`, null] }
        ]},
        { title: `Question 2 · Part 2: Essay`, marks: `15 marks`, items: [
          { type: `written`, q: `(a) Use a truth table to verify p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r). (3 marks)`, ans: `Rows (p q r → p∧(q∨r) | (p∧q)∨(p∧r)): TTT T|T; TTF T|T; TFT T|T; TFF F|F; FTT F|F; FTF F|F; FFT F|F; FFF F|F. The two columns agree in all eight rows, so the distributive law holds. (Full table in the Aug 2024 paper, Q1a.) (L4)` },
          { type: `written`, q: `(b) Find the result of: (i) 27 mod 5 (ii) 36 mod 12 (iii) −18 mod 14 (iv) −7 mod 10. (12 marks)`, ans: `(i) 27 = 5·5 + 2 → <b>2</b>.<br>(ii) 36 = 3·12 + 0 → <b>0</b>.<br>(iii) −18 ÷ 14 gives r = −4; add the modulus: −4 + 14 = <b>10</b> (−18 = (−2)(14) + 10).<br>(iv) −7 ÷ 10 gives r = −7; add the modulus: <b>3</b> (−7 = (−1)(10) + 3). (Lecture 8, Example 2.14)` }
        ]},
        { title: `Question 3`, marks: `15 marks`, items: [
          { type: `written`, q: `(a) Let U = {1,…,9}, A = {1,2,3,8}, B = {3,4,5,6,9}, C = {2,3,4,9}. Find (i) Aᶜ ∩ B (ii) Aᶜ ∩ Bᶜ (iii) A ∪ B (iv) P(A). (12 marks)`, ans: `Aᶜ = {4,5,6,7,9}.<br><b>(i)</b> Aᶜ ∩ B = {4, 5, 6, 9}.<br><b>(ii)</b> A ∪ B = {1,2,3,4,5,6,8,9} → Aᶜ ∩ Bᶜ = {7}.<br><b>(iii)</b> A ∪ B = {1, 2, 3, 4, 5, 6, 8, 9}.<br><b>(iv)</b> 16 subsets: {∅, {1}, {2}, {3}, {8}, {1,2}, {1,3}, {1,8}, {2,3}, {2,8}, {3,8}, {1,2,3}, {1,2,8}, {1,3,8}, {2,3,8}, {1,2,3,8}}. (L1, L2)` },
          { type: `written`, q: `(b) Show that [¬p ∧ (p ∨ q)] → q is a tautology by using laws. (3 marks)`, ans: `¬p ∧ (p ∨ q) ≡ (¬p ∧ p) ∨ (¬p ∧ q) [distributive] ≡ F ∨ (¬p ∧ q) ≡ ¬p ∧ q [negation, identity].<br>Then (¬p ∧ q) → q ≡ ¬(¬p ∧ q) ∨ q [p → q ≡ ¬p ∨ q] ≡ (p ∨ ¬q) ∨ q [De Morgan, double negation] ≡ p ∨ (¬q ∨ q) [associative] ≡ p ∨ T ≡ T [negation, domination] ■ (L5)` }
        ]},
        { title: `Question 4`, marks: `10 marks`, items: [
          { type: `written`, q: `(a) Consider the undirected graph G with vertices 1–5 and edges a = 1–4, b = 2–5, c = 2–3, d = 3–5, e = 3–4, f = 4–5. (I) Find the adjacency matrix of G. (II) Find the list of edges. (5 marks)`, ans: `<b>(I)</b><table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><th>1</th><td>0</td><td>0</td><td>0</td><td>1</td><td>0</td></tr><tr><th>2</th><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td></tr><tr><th>3</th><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td></tr><tr><th>4</th><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr><tr><th>5</th><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr></table>(Matrix A₁ of the lecture; symmetric.)<br><b>(II)</b> V(1) = {4}, V(2) = {3, 5}, V(3) = {2, 4, 5}, V(4) = {1, 3, 5}, V(5) = {2, 3, 4}; or E = {a(1,4), b(2,5), c(2,3), d(3,5), e(3,4), f(4,5)}. (L9)` },
          { type: `written`, q: `(b) Show that ¬(p ∨ (¬p ∧ q)) and (¬p ∧ ¬q) are logically equivalent. (5 marks)`, ans: `¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬(¬p ∧ q) ≡ ¬p ∧ (p ∨ ¬q) ≡ (¬p ∧ p) ∨ (¬p ∧ ¬q) ≡ F ∨ (¬p ∧ ¬q) ≡ ¬p ∧ ¬q (De Morgan, De Morgan + double negation, distributive, negation, identity). A truth table also works: both columns are F, F, F, T for pq = TT, TF, FT, FF. (L5)` }
        ]}
      ]
    },

    /* ───────── MIDTERM 2021/2022 ───────── */
    {
      title: `Midterm Exam 2021/2022 (Model A)`,
      meta: `Mid term · 1 hour · 20 marks · 2 questions · Code B s113 · Computer Science 1st year · Dr. Shereen Magdy`,
      note: `One phone photo, fully readable. (The file is stored in the 2025/2026 midterm folder, but the paper header says 2021/2022, Model A.)`,
      sections: [
        { title: `Question 1`, marks: `10 marks`, items: [
          { type: `written`, q: `Show that (p → Q) ∨ (Q → P) is a tautology.`, ans: `<table><tr><th>P</th><th>Q</th><th>P→Q</th><th>Q→P</th><th>(P→Q)∨(Q→P)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>T</td><td>T</td></tr><tr><td>F</td><td>T</td><td>T</td><td>F</td><td>T</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td></tr></table>Every row of the last column is T, so the statement is a tautology. (L3)` }
        ]},
        { title: `Question 2`, marks: `10 marks`, items: [
          { type: `written`, q: `Show that ¬(p ∨ (¬p ∧ q)) and (¬p ∧ ¬q) are logically equivalent by using laws.`, ans: `¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬(¬p ∧ q) [2nd De Morgan] ≡ ¬p ∧ [¬(¬p) ∨ ¬q] [1st De Morgan] ≡ ¬p ∧ (p ∨ ¬q) [double negation] ≡ (¬p ∧ p) ∨ (¬p ∧ ¬q) [2nd distributive] ≡ F ∨ (¬p ∧ ¬q) [¬p ∧ p ≡ F] ≡ (¬p ∧ ¬q) ∨ F [commutative] ≡ ¬p ∧ ¬q [identity] ■ (L5)` }
        ]}
      ]
    },

    /* ───────── FINAL 2020/2021 ───────── */
    {
      title: `Final Exam 2020/2021`,
      meta: `First term · 2 hours · 60 marks · 4 questions · Code BS 113 · Computer Science 1st year · Dr. Shereen Magdy, Dr. Dena Mohamed`,
      note: `Transcribed from two phone photos (four pages). Pen marks are a student's: they agree with the lectures (the student first ticked then crossed out b in Q18 and circled a, which is correct). Q4b is printed "p ∨ q ≡ (p → r) ∧ (q → r)"; the r is missing on the left, the intended statement is p ∨ q → r ≡ (p → r) ∧ (q → r) (Lecture 4, Example 1.2.2). Q13 is printed "r ∨ p ∧ q" without brackets.`,
      sections: [
        { title: `Question 1 · Part 1: Multiple choice questions`, marks: `20 marks`, items: [
          { type: `mcq`, q: `1) The conjunction of propositions p and q, denoted by`, o: [`p ∧ q`, `p ∨ q`, `p − q`], a: 0, why: `Conjunction means "and", written p ∧ q (also p · q): it is true only when both p and q are true (L3, Connectives).`, ow: [null, `p ∨ q is the disjunction ("or"), true when at least one part is true. Conjunction ("and") is p ∧ q.`, `"−" is set difference or subtraction, not one of the lecture's logical connectives (¬, ∧, ∨, ⊕, →, ↔). Conjunction is p ∧ q.`] },
          { type: `mcq`, q: `2) The disjunction of propositions p and q, denoted by`, o: [`p ∨ q`, `p ∧ q`, `p − q`], a: 0, why: `Disjunction is the inclusive "or", written p ∨ q: true when p or q (or both) is true, false only when both are false (L3, Connectives).`, ow: [null, `p ∧ q is the conjunction ("and"), true only when both are true. Disjunction ("or") is p ∨ q.`, `"−" is not a logical connective in the lecture (it is set difference). The disjunction of p and q is p ∨ q.`] },
          { type: `mcq`, q: `3) The exclusive or of propositions p and q, denoted by`, o: [`p ∨ q`, `p ∧ q`, `p ⊕ q`], a: 2, why: `Exclusive or is written p ⊕ q and is true when only one of p and q is true (false when both are T or both are F) (L3, Connectives).`, ow: [`p ∨ q is the inclusive or, which is also true when both are true. Exclusive or has its own symbol, p ⊕ q.`, `p ∧ q is conjunction ("and"), true only when both are true, which is exactly when ⊕ is false.`, null] },
          { type: `mcq`, q: `4) A compound proposition that is always true is a`, o: [`tautology`, `contradiction`, `both`], a: 0, why: `A tautology is a statement form that is always true regardless of the truth values substituted for its variables, e.g. p ∨ ¬p (L4, Definitions).`, ow: [null, `A contradiction is always false (e.g. p ∧ ¬p), the opposite of what is asked. Always true is a tautology.`, `A column cannot be all T and all F at once, so a proposition cannot be both. Always true means tautology.`] },
          { type: `mcq`, q: `5) Logical equivalences involving conditional statements p → q ≡`, o: [`p ∨ q`, `¬p ∨ q`, `p ∧ q`], a: 1, why: `p → q ≡ ¬p ∨ q, the key rewrite of Table 7: both are false only when p = T and q = F (L5).`, ow: [`p ∨ q differs from p → q in rows T, F (T vs F) and F, F (F vs T). The rewrite negates p: ¬p ∨ q.`, null, `p ∧ q is F in row F, F, where p → q is T (false hypothesis). It matches only rows TT and TF.`] },
          { type: `mcq`, q: `6) Logical equivalences involving conditional statements ¬(p → q) ≡`, o: [`p ∨ q`, `p ∧ ¬q`, `p ∧ q`], a: 1, why: `p → q is false only for a true hypothesis and false conclusion, so ¬(p → q) ≡ p ∧ ¬q (Table 7; derived from ¬(¬p ∨ q) by De Morgan) (L5).`, ow: [`p ∨ q is true in three rows, but ¬(p → q) is true only in row p = T, q = F. The correct form is p ∧ ¬q.`, null, `p ∧ q is T at p = q = T, where p → q is T and so its negation is F. The negation needs ¬q: p ∧ ¬q.`] },
          { type: `mcq`, q: `7) A compound proposition that is always false is a`, o: [`tautology`, `contradiction`, `both`], a: 1, why: `A contradiction is a statement form that is always false regardless of the truth values substituted, e.g. p ∧ ¬p (L4, Definitions).`, ow: [`A tautology is the opposite: always true whatever values its variables take (e.g. p ∨ ¬p). Always false is a contradiction.`, null, `A tautology is all T and a contradiction is all F; one truth table column cannot be both. Always false means contradiction only.`] },
          { type: `mcq`, q: `8) The converse of ¬p → q is`, o: [`p → q`, `¬p → ¬q`, `q → ¬p`], a: 2, why: `The converse of a → b is b → a: swap hypothesis and conclusion. With a = ¬p and b = q this is q → ¬p (L5, Converse, contrapositive, inverse).`, ow: [`p → q changes the hypothesis ¬p to p without swapping anything, so it is not the converse of ¬p → q.`, `¬p → ¬q negates both sides of p → q without swapping, which is the inverse of p → q. The converse of ¬p → q just swaps the sides: q → ¬p.`, null] },
          { type: `mcq`, q: `9) Let A and B be sets such that |A| = 4 and |B| = 3. Which of the following is always true?`, o: [`|A ∩ B| = 0`, `|A × B| = 12`, `|A − B| = 1`], a: 1, why: `A × B is all ordered pairs (a, b), and each of the 4 choices of a pairs with each of 3 choices of b: |A × B| = |A|·|B| = 4 × 3 = 12 (L2, Cartesian product).`, ow: [`|A ∩ B| = 0 holds only if A and B are disjoint. They may share up to 3 elements, so this is not always true.`, null, `|A − B| depends on how much A and B overlap: it is 4 if they are disjoint and 1 if all of B lies in A. So it is not always 1.`] },
          { type: `mcq`, q: `10) The Power Set of a set S, denoted P(S), if S = {0, 1} is`, o: [`p(s) = {0, 1}`, `p(s) = {0, Φ}`, `p(s) = {Φ, {0}, {1}, {0, 1}}`], a: 2, why: `The power set of {0, 1} lists all 2² = 4 subsets: ∅, {0}, {1} and {0, 1}. Note {0} (a set) differs from 0 (an element) (L1, Power set).`, ow: [`{0, 1} is S itself, a set of numbers. P(S) contains the subsets of S as elements: ∅, {0}, {1}, {0, 1}.`, `Here 0 is just the element 0, not a subset, and {0}, {1}, {0, 1} are missing. P(S) must have 2² = 4 subsets.`, null] },
          { type: `mcq`, q: `11) Logical equivalences involving conditional statements ¬(p → q) ≡`, o: [`p ∧ ¬q`, `p ∨ ¬q`, `p → q`], a: 0, why: `p → q is false only for a true hypothesis and false conclusion, so ¬(p → q) ≡ p ∧ ¬q (Table 7; derived from ¬(¬p ∨ q) by De Morgan) (L5).`, ow: [null, `p ∨ ¬q ≡ q → p (the converse), which is true in three rows. The negation of p → q is true in only one: p ∧ ¬q.`, `p → q is the original statement, the opposite of its negation in every row. ¬(p → q) ≡ p ∧ ¬q.`] },
          { type: `mcq`, q: `12) The statement (p ∧ q) → (p ∨ q) is`, o: [`tautology`, `contradiction`, `both`], a: 0, why: `(p ∧ q) → (p ∨ q) ≡ ¬(p ∧ q) ∨ (p ∨ q) ≡ (¬p ∨ p) ∨ (¬q ∨ q) ≡ T: whenever p ∧ q is true, p ∨ q is true (L5, Proof).`, ow: [null, `A contradiction is false in every row, but this implication is never false: whenever p ∧ q is T, p ∨ q is T too.`, `A form cannot be all T and all F at once. Every row here is T, so it is a tautology only.`] },
          { type: `mcq`, q: `13) The negation of the proposition r ∨ p ∧ q is`, o: [`¬r ∧ ¬p ∧ ¬q`, `¬r ∨ ¬p ∨ ¬q`, `¬r ∧ ¬p ∨ ¬q`], a: 2, why: `De Morgan twice: ¬r ∧ ¬(p ∧ q). The paper prints it as ¬r ∧ ¬p ∨ ¬q.`, ow: [`¬r ∧ ¬p ∧ ¬q negates r ∨ p ∨ q. Here p ∧ q is grouped, so De Morgan on it gives ¬p ∨ ¬q, not ¬p ∧ ¬q.`, `¬r ∨ ¬p ∨ ¬q negates r ∧ p ∧ q. The outer connective is ∨, so the negation must start ¬r ∧ ….`, null] },
          { type: `mcq`, q: `14) The greatest common divisor of 63 and 110 is`, o: [`9`, `6`, `1`, `2`], a: 2, why: `Euclid: 110 = 1·63 + 47; 63 = 1·47 + 16; 47 = 2·16 + 15; 16 = 1·15 + 1; 15 = 15·1 + 0, so gcd = 1 (relatively prime) (L8, GCD).`, ow: [`9 divides 63 (63 = 7 × 9) but not 110 (110 = 12 × 9 + 2), so it is not a common divisor.`, `6 does not divide 63 (63 is odd) and does not divide 110 either (110 = 18 × 6 + 2).`, null, `2 divides 110 but not 63 (63 is odd), so it is not a common divisor.`] },
          { type: `mcq`, q: `15) The negation of the statement "John is rich and he is not famous" is`, o: [`John is neither rich nor famous`, `John is either rich or famous`, `If John is famous, then he is rich`, `If John is rich, then he is famous`], a: 3, why: `¬(R ∧ ¬F) ≡ ¬R ∨ F by De Morgan and double negation, and ¬R ∨ F ≡ R → F: "If John is rich, then he is famous" (L5, Table 7).`, ow: [`"Neither rich nor famous" is ¬R ∧ ¬F; it is false when John is rich and famous, yet then the original (R ∧ ¬F) is false too.`, `"Rich or famous" (R ∨ F) is true when John is rich and not famous, the very case where the original is true.`, `F → R ≡ ¬F ∨ R is true when John is rich and not famous, where the original is also true, so it is not the negation.`, null] },
          { type: `mcq`, q: `16) The quotient q and remainder r when 165 is divided by 18 are`, o: [`q = 9, r = 4`, `q = 4, r = 9`, `q = 8, r = 4`, `q = 9, r = 3`], a: 3, why: `In a = q × n + r with 0 ≤ r &lt; n: 9 × 18 = 162 and 165 − 162 = 3, so q = 9, r = 3 (L8, Division relation).`, ow: [`9 × 18 + 4 = 166, not 165. The quotient 9 is right but the remainder is 165 − 162 = 3.`, `4 × 18 + 9 = 81, not 165; the numbers are not a valid division. 165 = 9 × 18 + 3.`, `8 × 18 + 4 = 148, not 165. With q = 8 the remainder would be 21 ≥ 18, so q must be 9, r = 3.`, null] },
          { type: `mcq`, q: `17) The negation of the statement "All animals can fly" is`, o: [`All animals cannot fly`, `Some animals can fly`, `Some animals cannot fly`, `There exists an animal that can fly`], a: 2, why: `¬(∀x P(x)) ≡ ∃x ¬P(x): to deny that all animals fly you need just one that cannot, so "Some animals cannot fly" (L3, Negating "all" statements).`, ow: [`Too strong; the negation only needs one counter-example.`, `"Some animals can fly" is implied by the original (if all can fly, some can), so it does not deny it. Negate ∀ with ∃ and negate the predicate.`, null, `Consistent with the original, so not its negation.`] },
          { type: `mcq`, q: `18) Here we use the equivalent (De Morgan's) logical law ¬(p ∨ q) is`, o: [`¬p ∧ ¬q`, `¬p ∨ ¬q`, `p ∧ ¬q`], a: 0, why: `De Morgan: ~(p ∨ q) ≡ ~p ∧ ~q. "Not (p or q)" means neither is true (Theorem 1.1.1, law 9; Table 3) (L4).`, ow: [null, `¬p ∨ ¬q is the other De Morgan law, ¬(p ∧ q). Negating an ∨ must turn it into ∧.`, `p ∧ ¬q is the negation of p → q (L5). De Morgan on ¬(p ∨ q) negates both parts: ¬p ∧ ¬q.`] },
          { type: `mcq`, q: `19) Logical equivalences involving biconditional statements: p ↔ q ≡`, o: [`(p → q) ∧ (q → p)`, `p → q`, `¬p`], a: 0, why: `p ↔ q means "p only if q" (p → q) and "p if q" (q → p); the truth table shows both columns agree (L5, Biconditional; Table 8).`, ow: [null, `p → q is only one direction ("only if"); in row F, T it is T while p ↔ q is F. The biconditional needs q → p too.`, `¬p ignores q: in row T, T it is F while p ↔ q is T.`] },
          { type: `mcq`, q: `20) Logical equivalences involving conditional statements p → q ≡`, o: [`p ∨ q`, `¬p ∨ q`, `p ∧ q`], a: 1, why: `p → q ≡ ¬p ∨ q, the key rewrite of Table 7: both are false only when p = T and q = F (L5).`, ow: [`p ∨ q differs from p → q in rows T, F (T vs F) and F, F (F vs T). The rewrite negates p: ¬p ∨ q.`, null, `p ∧ q is F in row F, F, where p → q is T (false hypothesis). It matches only rows TT and TF.`] }
        ]},
        { title: `Question 2 · Part 2: Essay`, marks: `10 marks`, items: [
          { type: `written`, q: `(a) Let U = {1, 2, 3, 4, 5, 6, 7, 8, …}, A = {1,2,3,4}, B = {3,4,5,6,7}, C = {2,3,8,9}. Find (i) Aᶜ ∩ B (ii) Aᶜ ∩ Bᶜ (iii) A ∪ B (iv) P(A). (8 marks)`, ans: `(i) Aᶜ ∩ B = {5, 6, 7}. (ii) Aᶜ ∩ Bᶜ = (A ∪ B)ᶜ = {8, 9, 10, …}. (iii) A ∪ B = {1, 2, 3, 4, 5, 6, 7}. (iv) P(A) has 2⁴ = 16 subsets: ∅, {1}, {2}, {3}, {4}, {1,2}, {1,3}, {1,4}, {2,3}, {2,4}, {3,4}, {1,2,3}, {1,2,4}, {1,3,4}, {2,3,4}, {1,2,3,4}. (Same as Summer 2023/24 Q1a.)` },
          { type: `written`, q: `(b) Show that (p → Q) ∨ (Q → P) is a tautology. (2 marks)`, ans: `Truth table: P→Q = T, F, T, T and Q→P = T, T, F, T for PQ = TT, TF, FT, FF; their disjunction is T in every row, so it is a tautology. (L3)` }
        ]},
        { title: `Question 3`, marks: `20 marks`, items: [
          { type: `written`, q: `(a) Show that ¬(p ∨ (¬p ∧ q)) and (¬p ∧ ¬q) are logically equivalent by using laws. (8 marks)`, ans: `¬(p ∨ (¬p ∧ q)) ≡ ¬p ∧ ¬(¬p ∧ q) [De Morgan] ≡ ¬p ∧ (p ∨ ¬q) [De Morgan, double negation] ≡ (¬p ∧ p) ∨ (¬p ∧ ¬q) [distributive] ≡ F ∨ (¬p ∧ ¬q) [negation] ≡ ¬p ∧ ¬q [identity] ■ (L5)` },
          { type: `written`, q: `(b) Find the result of: (i) 27 mod 5 (ii) 36 mod 12 (iii) −18 mod 14 (iv) −7 mod 10. (12 marks)`, ans: `(i) 2 (ii) 0 (iii) −18 = (−2)(14) + 10 → 10 (iv) −7 = (−1)(10) + 3 → 3. For negative a: the calculator remainder is negative, so add the modulus (decrement q by 1). (L8)` }
        ]},
        { title: `Question 4`, marks: `10 marks`, items: [
          { type: `written`, q: `(a) Consider the digraph G with edges e5: 2→1, e1: 1→3, e2: 4→2, e3: 4→3, e4: 3→2. (i) Find the adjacency matrix of G. (3 marks) (ii) Find the list of edges. (3 marks)`, ans: `(i) Rows 1..4: 1: 0 0 1 0; 2: 1 0 0 0; 3: 0 1 0 0; 4: 0 1 1 0.<br>(ii) V(1) = {3}, V(2) = {1}, V(3) = {2}, V(4) = {2, 3}. (Lecture 9 matrix A₂; same graph as 2024/25 Q3b.)` },
          { type: `written`, q: `(b) Show the logical equivalence p ∨ q → r ≡ (p → r) ∧ (q → r) by truth tables. (4 marks)`, ans: `<table><tr><th>p</th><th>q</th><th>r</th><th>p∨q</th><th>p→r</th><th>q→r</th><th>p∨q→r</th><th>(p→r)∧(q→r)</th></tr><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>T</td><td>F</td><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td></tr><tr><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>F</td><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td></tr></table>The last two columns are identical, so the forms are equivalent. (The paper misprints the left side as "p ∨ q"; p ∨ q alone is NOT equivalent, e.g. row p = q = r = F gives F vs T.) (L4, Example 1.2.2)` }
        ]}
      ]
    }
  ]
};

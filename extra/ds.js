window.EXTRA = window.EXTRA || {};
EXTRA.ds = {
  1: [
    { q: `A data type is defined in the lecture as:`,
      o: [
        [`A group of elements of the same type stored together`, `A group of same-type elements stored together under one name is an array, which is a data structure, not a data type.`],
        [`A domain of allowed values and a set of operations on these values`, `Correct. This is the lecture's two-part definition.`],
        [`The logical model of a particular organization of data`, `The logical or mathematical model of a particular organization of data is the lecture's definition of a data structure.`],
        [`An interface without implementation details`, `Providing only an interface, with no implementation details, is the definition of an abstract data type (ADT).`]
      ], a: 1 },
    { q: `Why does <code>char x, y, z; z = x * y;</code> produce a compiler error in the lecture's example?`,
      o: [
        [`Because x and y are not initialized`, `Uninitialized values give a warning at most, not the point of the example.`],
        [`Because char variables cannot be declared together`, `Declaring several variables on one line is legal.`],
        [`Because multiplication is not in the set of operations allowed for the char type`, `Correct. A data type includes its allowed operations; the compiler signals an error for a wrong operation.`],
        [`Because z must be declared as int`, `The lecture's point is the operation, not the result type.`]
      ], a: 2 },
    { q: `What does the lecture's sort code print for <code>billy[5] = {16, 2, 77, 40, 12}</code> (it swaps when <code>billy[n] &lt; billy[m]</code>)?`,
      o: [
        [`2 12 16 40 77`, `That is ascending order; the condition &lt; swaps the larger value to the front.`],
        [`16 2 77 40 12`, `That is the original array. The nested loops swap billy[n] and billy[m] whenever billy[n] is smaller, so the array ends up sorted in descending order.`],
        [`77 16 40 12 2`, `Not fully sorted; the nested loops finish the sort.`],
        [`77 40 16 12 2`, `Correct. Swapping whenever billy[n] &lt; billy[m] produces descending order.`]
      ], a: 3 },
    { q: `Array element = {5, 2, 4, 8, 1}, length = 5. After the lecture's Insert with k = 2 and x = 9, the array is:`,
      o: [
        [`5 2 9 4 8 1`, `Correct. Elements from index 2 shift right and 9 is placed at element[2] (after the 2nd element). Checked with g++.`],
        [`5 9 2 4 8 1`, `5 9 2 4 8 1 is inserting after the 1st element (k = 1). With k = 2, elements from index 2 shift right and 9 goes into element[2].`],
        [`9 5 2 4 8 1`, `9 at the front is insertion with k = 0. With k = 2 the loop shifts only element[2..4] right and sets element[2] = 9.`],
        [`5 2 4 9 8 1`, `That puts 9 after the 3rd element (k = 3). With k = 2, the code writes element[2] = 9, so 9 follows the 2 and comes before the 4.`]
      ], a: 0 },
    { q: `Array {5, 2, 4, 8, 1}. The lecture's Delete with k = 2 (delete the 2nd element) gives:`,
      o: [
        [`5 2 8 1`, `Removing the 4 is deleting the 3rd element (k = 3). With k = 2 the loop copies element[2] into element[1], overwriting the 2.`],
        [`5 4 8 1`, `Correct. element[i-1] = element[i] for i = 2..4 shifts 4, 8, 1 left over the 2; length becomes 4.`],
        [`2 4 8 1`, `Removing the 5 is deleting the 1st element (k = 1). With k = 2 the loop starts at i = 2 and overwrites element[1], the 2.`],
        [`5 2 4 8`, `Removing the 1 is deleting the last element (k = 5), which only decrements length. k = 2 removes the 2 by shifting 4, 8, 1 left.`]
      ], a: 1 },
    { q: `Array x has 4 rows and 5 columns, stored row by row. x[3][2] maps to which position of the 1D array?`,
      o: [
        [`14`, `14 = 3·4 + 2 multiplies by the number of rows (4). Each row holds c = 5 elements, so the formula is i·c + j.`],
        [`11`, `11 = 3 + 2·4 swaps the roles of i and j and uses the rows. Row-major position is i·c + j = 3·5 + 2 = 17.`],
        [`17`, `Correct. In row-major order there are i·c elements before row i, so x[i][j] is at i·c + j = 3·5 + 2 = 17 (L1, Locating element x[i][j]).`],
        [`20`, `20 = 4 × 5 is the total number of elements; positions only run from 0 to 19, so 20 is not a valid position.`]
      ], a: 2 },
    { q: `Which pair correctly matches an ADT with one of its implementations?`,
      o: [
        [`Map → Hash table`, `Correct. The lecture lists tree map and hash map / hash table as Map implementations.`],
        [`Queue → Binary search tree`, `Queues are implemented with arrays or linked lists.`],
        [`List → Hash table`, `Lists are implemented as dynamic arrays or linked lists.`],
        [`Vehicle → Queue`, `In the analogy, vehicle implementations are golf car, bicycle, smart car.`]
      ], a: 0 },
    { q: `Which statement about passing arrays to functions in C++ is correct?`,
      o: [
        [`Whole arrays and individual elements are both passed by value`, `Only individual elements are passed by value. A whole array is passed by reference, so a function can change the caller's array.`],
        [`Whole arrays are passed by reference, individual elements by value`, `Correct. C++ passes a whole array by reference (the function works on the caller's array), while a single element like a[2] is passed by value like a simple variable (L1 notes; Lab 1).`],
        [`Whole arrays are passed by value, individual elements by reference`, `This is the reverse. Whole arrays are passed by reference and individual elements by value.`],
        [`Arrays cannot be passed to functions`, `Arrays can be passed to functions: Lab 2 passes an array to LinearSearch, and the matrix Sum function takes int a[][cols].`]
      ], a: 1 },
    { q: `Combining data elements from two or more data structures into one is called:`,
      o: [
        [`Sorting`, `Sorting arranges the elements of one structure in a logical order (ascending or descending); it does not combine structures.`],
        [`Navigating`, `Navigating means accessing each element of a structure exactly once so it can be processed, not combining structures.`],
        [`Insertion`, `Insertion adds one new data element to a structure; combining whole structures into one is merging.`],
        [`Merging`, `Correct. The lecture defines merging as combining data elements from two or more data structures into one (L1, Data structure operations).`]
      ], a: 3 },
    { q: `Which declaration creates three objects of a struct in one statement, the "first way" from the lecture?`,
      o: [
        [`struct product { int weight; float price; } apple, banana, melon;`, `Correct. The object names follow the closing brace.`],
        [`product { int weight; float price; } apple;`, `The struct keyword is missing: a definition must start with struct, e.g. struct product { … } apple;.`],
        [`struct product apple, banana, melon { int weight; };`, `The member list in braces must come right after the struct name, and the object names come after the closing brace: struct product { … } apple, banana, melon;.`],
        [`product[3] = {apple, banana, melon};`, `This is array initializer syntax with no type or members, so it defines no struct. Objects are declared after the closing brace or as product apple;.`]
      ], a: 0 }
  ],
  2: [
    { q: `MAXSIZE = 4, top = -1. Operations: push(10), push(20), push(30), pop(), push(40), push(50), push(60). What happens?`,
      o: [
        [`All pushes succeed and top = 5`, `The stack holds at most MAXSIZE = 4 elements, so top cannot exceed 3; push(60) finds the stack full and prints stack overflow.`],
        [`push(50) causes overflow`, `After the pop there are 3 elements (10, 20, 40), so 50 fits as the 4th.`],
        [`push(60) causes stack overflow; the stack holds 10 20 40 50`, `Correct. After 50 the stack is full (top = 3), so 60 overflows.`],
        [`pop() causes underflow`, `Underflow happens only when popping an empty stack. When pop() runs, the stack holds 10, 20, 30, so it removes 30 normally.`]
      ], a: 2 },
    { q: `For the stack 10, 20, 40, 50 (50 on top), display() prints:`,
      o: [
        [`10 20 40 50`, `display loops from top down to 0, which is reverse order.`],
        [`50 40 20 10`, `Correct. for (j = top; j &gt;= 0; j--) prints in LIFO order.`],
        [`50 10 20 40`, `display() prints indices top, top−1, …, 0 in a straight loop, so the order can only be 50 40 20 10; it never jumps from 50 to the bottom.`],
        [`Only 50`, `Printing only the top element is what get() does. display() loops j = top down to 0 and prints every item.`]
      ], a: 1 },
    { q: `Pushing the characters of "DATA" one by one and then popping them all gives:`,
      o: [
        [`DATA`, `Getting DATA back unchanged would require FIFO order (a queue). A stack pops the last pushed character first, so it reverses the string.`],
        [`ATAD`, `Correct. LIFO reverses the string (checked with g++).`],
        [`ADAT`, `ADAT is not the reverse of DATA. Pops come in exact reverse push order: A, T, A, D.`],
        [`TADA`, `TADA is not the reverse of DATA. The last pushed character (A) pops first, giving A, T, A, D.`]
      ], a: 1 },
    { q: `In the array stack, what does count() return when top = 6?`,
      o: [
        [`6`, `6 is the index of the top element. Indices 0 to 6 hold 7 items, so count() returns top + 1 = 7.`],
        [`5`, `5 undercounts by two. With top = 6, items sit at indices 0..6, which is 7 items.`],
        [`-1`, `count() returns 0 (not −1) for an empty stack, and the stack is not empty here: top = 6 means 7 items.`],
        [`7`, `Correct. count() starts at index = top and counts down to 0, so it returns top + 1 = 6 + 1 = 7 items (L2, count function).`]
      ], a: 3 },
    { q: `Why is TOP initialized to -1?`,
      o: [
        [`So that on push top is first incremented to 0 and the item is stored at index 0`, `Correct. The lecture says TOP starts at −1 so that on every push TOP is first incremented and the item is stored at that location; the first item lands at index 0 (L2, Stack terminologies).`],
        [`Because C++ arrays start at -1`, `C++ arrays start at index 0, not −1. −1 is just the "empty" value of TOP, so the first push moves it to 0.`],
        [`To mark the stack as full`, `−1 marks an empty stack (isEmpty: top == −1). The stack is full when top == MAXSIZE − 1.`],
        [`So that pop returns -1 the first time`, `pop returns -1 on underflow, but that is not why top starts at -1.`]
      ], a: 0 },
    { q: `Which real-life example from the lecture is NOT a stack?`,
      o: [
        [`Undo/redo in a text editor`, `Undo/redo in text editors is one of the lecture's stack examples: the last action done is the first undone.`],
        [`Browser back button history`, `Browser back history is one of the lecture's stack examples: back opens the most recently visited site first.`],
        [`A line of people waiting to buy tickets`, `Correct. In a ticket line the first person to arrive is served first, which is FIFO, a queue. The lecture's stack examples are piles of books, call logs, browser history and undo/redo (L2, What is a stack?).`],
        [`A pile of books`, `A pile of books (or clothes) is the lecture's first stack example: you can only add or take the top one.`]
      ], a: 2 },
    { q: `Which statement describes the static (array) implementation of a stack?`,
      o: [
        [`Very simple, but the size is fixed at design time and memory use is not efficient`, `Correct. The static implementation uses an array: very simple, but not flexible, because the size is declared at program design and cannot change, and memory use is not efficient (L2, Stack implementation).`],
        [`Uses pointers and can grow without limit`, `Using pointers is the dynamic (linked list) implementation. The static version is an array with a fixed MAXSIZE.`],
        [`Allows insertion at both ends`, `A stack inserts and deletes at only one end, the top. Insertion at both ends is not a stack property.`],
        [`Never overflows`, `An array stack overflows when top == MAXSIZE-1.`]
      ], a: 0 },
    { q: `The stack holds 4, 9, 2 (2 on top). After pop(), pop(), push(6), what does get() display?`,
      o: [
        [`2`, `2 was on top, so the first pop() removed it; it is no longer in the stack.`],
        [`9`, `9 was removed by the second pop(), leaving only 4 before 6 was pushed.`],
        [`4`, `4 is still in the stack, but at the bottom: push(6) placed 6 above it, and get() shows the top.`],
        [`6`, `Correct. After two pops only 4 remains; pushing 6 makes it the top.`]
      ], a: 3 },
    { q: `In the lecture's search(), the slide writes <code>temp = temp--;</code>. What should it be?`,
      o: [
        [`temp++;`, `The search moves from top down to 0, so temp must decrease.`],
        [`temp--; (or temp = temp - 1;)`, `Correct. temp = temp--; does not reliably decrease temp, so it can loop forever.`],
        [`top--;`, `top-- would move the top of the stack and in effect lose items. search() must only move its own copy, temp, down to 0.`],
        [`temp = top;`, `temp = top resets the index to the top on every pass, so the loop would check the same element forever. It needs temp--.`]
      ], a: 1 },
    { q: `Which lab application uses a stack to keep information about active functions?`,
      o: [
        [`Backtracking`, `Backtracking uses a stack to return along a maze path.`],
        [`String reversal`, `In string reversal the stack reverses a string by pushing its characters and popping them; it does not track active functions.`],
        [`Function call`, `Correct. Lab 3 lists the function call as a stack application: the stack keeps information about the active functions, the last called returning first (Lab 3, Stack applications).`],
        [`Hashing`, `Hashing (L10) maps keys to table slots with a hash function; it is not one of the lab's stack applications.`]
      ], a: 2 }
  ],
  3: [
    { q: `A linear queue of size 5: enqueue 1, 2, 3, 4, 5; dequeue twice; then enqueue(6). What happens?`,
      o: [
        [`6 is stored at index 0`, `Storing 6 at index 0 is what a circular queue does. A linear queue's tail only increases, so it cannot go back to index 0.`],
        [`6 is stored at index 5`, `Index 5 does not exist in a queue of size 5 (indices 0..4); isFull stops the insert because tail == maxsize − 1.`],
        [`"Queue is full", because tail == maxsize-1 even though indices 0 and 1 are free`, `Correct. This is exactly the problem of the linear queue.`],
        [`"Queue Underflow"`, `Queue Underflow is printed by dequeue on an empty queue. This is an enqueue, and isFull blocks it.`]
      ], a: 2 },
    { q: `Same operations on a CIRCULAR queue of size 5 (enqueue 1..5, dequeue twice, enqueue 6). Where is 6 stored?`,
      o: [
        [`Index 0`, `Correct. rear = (4 + 1) % 5 = 0, a cell freed by dequeue.`],
        [`Index 5`, `Index 5 does not exist (indices 0..4). The circular queue computes rear = (4 + 1) % 5 = 0 instead of 5.`],
        [`It is rejected as full`, `Two cells were freed, so the circular queue is not full.`],
        [`Index 2`, `Index 2 is where front is now (the element 3). The new rear is the next cell after 4, wrapping around to (4 + 1) % 5 = 0.`]
      ], a: 0 },
    { q: `In the linear queue, which condition means the queue is empty?`,
      o: [
        [`head == tail`, `head == tail means head and tail are on the same cell, which holds exactly one element.`],
        [`head == -1 || head &gt; tail`, `Correct. The lecture's isEmpty returns true when head == −1 (nothing was ever inserted) or head &gt; tail (every inserted element has been dequeued) (L3, C++ dequeue function).`],
        [`tail == maxsize - 1`, `tail == maxsize − 1 is the linear queue's full test (isFull), not the empty test.`],
        [`tail == -1 || tail &gt; head`, `This swaps head and tail. Emptiness depends on head: head == −1 or head having passed tail (head &gt; tail).`]
      ], a: 1 },
    { q: `In the circular queue deQueue, what happens when front == rear before removal?`,
      o: [
        [`front = (front + 1) % MAX_SIZE`, `Advancing front by (front + 1) % MAX_SIZE is the else branch, used when more than one element remains.`],
        [`Nothing; the element is not removed`, `The element is removed and returned. Because it was the only one (front == rear), the queue becomes empty.`],
        [`rear = front - 1`, `The lecture never sets rear = front − 1. When the last element is removed, both front and rear are reset to −1.`],
        [`front and rear are both reset to -1`, `Correct. The last element was removed, so the queue becomes empty.`]
      ], a: 3 },
    { q: `Circular queue with MAX_SIZE = 4: front = 2, rear = 3. After enQueue(x), rear is:`,
      o: [
        [`4`, `Index 4 is out of range for MAX_SIZE = 4 (indices 0..3). The modulo wraps it: (3 + 1) % 4 = 0.`],
        [`0`, `Correct. enQueue moves rear circularly: rear = (rear + 1) % MAX_SIZE = (3 + 1) % 4 = 0, reusing the cell at the start (L3, Circular queue enQueue).`],
        [`3`, `rear must move to a new cell before storing x, or x would overwrite the element at index 3.`],
        [`1`, `1 would be two steps from 3 (3 → 0 → 1). enQueue advances rear by exactly one: (3 + 1) % 4 = 0.`]
      ], a: 1 },
    { q: `In the slide's linear queue trace, the rear is at the last index but there is space at the front. This is called:`,
      o: [
        [`Stack overflow`, `It is a queue, and the queue is not really full.`],
        [`Underflow`, `Underflow means removing from an empty queue. Here the queue still has elements; the free cells are just unreachable.`],
        [`Non-usable empty space (memory wastage) of the linear queue`, `Correct. After dequeues the front moves forward, but the linear queue's tail is still at the end, so the freed cells at the front are non-usable empty space; the circular queue solves this (L3, Problem of linear queue).`],
        [`Collision`, `Collision is a hashing term (two keys hashing to the same slot, L10); it has nothing to do with queues.`]
      ], a: 2 },
    { q: `Linear queue (maxsize 8): enqueue 4, 7, 9; dequeue; enqueue 3. What are head and tail?`,
      o: [
        [`head = 1, tail = 3`, `Correct. head moved from 0 to 1 after one dequeue; tail went 0, 1, 2, 3.`],
        [`head = 0, tail = 3`, `head = 0 ignores the dequeue. dequeue reads queue[head] and does head++, so head becomes 1.`],
        [`head = 1, tail = 2`, `tail = 2 is the state before enqueue(3). That enqueue does tail = tail + 1, so tail becomes 3.`],
        [`head = 0, tail = 4`, `There were only 4 enqueues, so tail went 0, 1, 2, 3; and the dequeue moved head to 1, not 0.`]
      ], a: 0 },
    { q: `Which is the standard single condition for a FULL circular queue?`,
      o: [
        [`rear == MAX_SIZE - 1`, `rear == MAX_SIZE − 1 alone is the linear queue's full test. In a circular queue rear can be at the end while cells at the front are free.`],
        [`front == -1`, `front == −1 is the circular queue's empty test (isEmpty), the opposite of full.`],
        [`front == rear`, `front == rear means a single element is stored, not a full queue.`],
        [`(rear + 1) % MAX_SIZE == front`, `Correct. It covers both lecture cases (front 0 / rear MAX-1, and rear just behind front).`]
      ], a: 3 },
    { q: `In the slide example, after two dequeues front is at 72 and rear at 24 (rear at the last cell). Inserting 100 is:`,
      o: [
        [`Possible in both queues`, `It is not possible in the linear queue: its rear is at the last cell, so isFull is true even though the front cells are free.`],
        [`Not possible in the linear queue but possible in the circular queue`, `Correct. The linear queue's rear is at the last cell, so isFull blocks 100; the circular queue wraps rear to index 0, one of the cells freed by the dequeues (L3, Operations of circular queue).`],
        [`Possible in the linear queue only`, `This is the reverse. The linear queue cannot reuse the freed front cells; only the circular queue can.`],
        [`Impossible in both queues`, `The circular queue can insert 100: rear wraps to index 0, a cell freed by the two dequeues.`]
      ], a: 1 },
    { q: `Queue holds (front) 8, 3, 5 (rear). What does the sequence dequeue(), enqueue(8), dequeue() return the second time?`,
      o: [
        [`8`, `8 was removed by the first dequeue; the re-inserted 8 is at the rear.`],
        [`5`, `5 is still behind 3 in the queue, so it cannot leave before 3.`],
        [`3`, `Correct. FIFO: first 8 leaves, then 3 is at the front.`],
        [`Nothing, the queue is empty`, `After the first dequeue, 3 and 5 remain and 8 is added at the rear, so the second dequeue has elements to remove.`]
      ], a: 2 }
  ],
  4: [
    { q: `<code>int a = 3, b = 7; int *p = &a, *q = &b; *p = *q + 1; q = p; *q = 2 * (*q);</code> What are a and b?`,
      o: [
        [`a = 8, b = 14`, `b = 14 assumes q still points to b (2 · 7). But q = p makes q point to a, so the doubling changes a: 2 · 8 = 16.`],
        [`a = 16, b = 7`, `Correct. *p = 7 + 1 sets a = 8; q now points to a; *q = 2 · 8 = 16. b is unchanged (checked with g++).`],
        [`a = 3, b = 16`, `a cannot stay 3: *p = *q + 1 writes 7 + 1 = 8 into a through p. And b is never written, so it stays 7.`],
        [`a = 8, b = 7`, `a = 8 is the value after the first assignment only. After q = p, *q = 2 · (*q) doubles a to 16.`]
      ], a: 1 },
    { q: `Which expression gives the address of variable x?`,
      o: [
        [`*x`, `*x dereferences a pointer (reads the value it points to); it does not give the address of x.`],
        [`x*`, `x* is not a valid expression. The * goes in a declaration before the name (int *p) or before a pointer to dereference.`],
        [`&x`, `Correct. The address-of operator & gives a variable's memory address, e.g. ptr = &x stores x's address in ptr (L4, Pointer operations).`],
        [`x->`, `-> accesses a struct member through a pointer (aPtr->member); it does not give an address.`]
      ], a: 2 },
    { q: `In fakeSwap(int a, int b), why are x and y unchanged in main?`,
      o: [
        [`Because a and b are copies stored at different addresses`, `Correct. Pass by value gives the function its own variables.`],
        [`Because tmp is not initialized`, `tmp is assigned (tmp = a) before it is used, so it is not uninitialized. The swap does happen, but only on the copies a and b.`],
        [`Because the function has no return statement`, `A return statement would not help: a void function returning nothing changes nothing, and a and b are separate copies of x and y.`],
        [`Because x and y are constants`, `x and y are ordinary int variables (int x = 1, y = 2), not constants. They are unchanged because only copies were passed.`]
      ], a: 0 },
    { q: `Which call correctly uses trueSwap(int* a, int* b)?`,
      o: [
        [`trueSwap(x, y);`, `trueSwap takes int* parameters, so it needs the addresses &x and &y; passing x and y passes their values.`],
        [`trueSwap(*x, *y);`, `x and y are ints, not pointers, so *x and *y cannot be dereferenced. The function needs &x and &y.`],
        [`trueSwap(&x, y);`, `Both parameters are int*, so both arguments must be addresses; y is passed by value here.`],
        [`trueSwap(&x, &y);`, `Correct. trueSwap(int* a, int* b) takes addresses, so it is called with &x and &y; then *a and *b reach x and y themselves and the swap is real (L4, Solution 2).`]
      ], a: 3 },
    { q: `In the lab program, <code>cout &lt;&lt; ptr;</code> prints:`,
      o: [
        [`The value of x (5)`, `The value 5 is printed by cout &lt;&lt; *ptr (the value pointed to) or cout &lt;&lt; x. ptr itself holds an address.`],
        [`The address of x`, `Correct. ptr = &x stores the address of x in ptr, so printing ptr shows that address (001DFAD8 in the lab), not the value (Lab 3, Program #1).`],
        [`The address of ptr`, `The address of ptr itself is printed by cout &lt;&lt; &ptr (001DFACC in the lab); ptr holds the address of x.`],
        [`24`, `24 is assigned later through *ptr = 24, and it is a value of x, not what ptr holds.`]
      ], a: 1 },
    { q: `What is the main difference between <code>int arr[10];</code> and <code>arr = new int[size];</code>?`,
      o: [
        [`The first is faster to index`, `Both are indexed the same way, arr[i]; the lab's difference is when the size is decided, not indexing speed.`],
        [`Only the second can store ints`, `Both declarations store ints. The difference is that new allows a size chosen at run time.`],
        [`The first's size must be a constant at design time; the second's size can be any value at run time`, `Correct. A regular array's size must be a constant expression fixed when the program is designed, while new assigns memory at run time using any variable value as the size (Lab 3, Dynamic array).`],
        [`The second cannot be freed`, `Memory from new[] can and should be freed, with delete[] arr; as the lab program does.`]
      ], a: 2 },
    { q: `Which memory segment holds local/temporary variables?`,
      o: [
        [`Stack segment`, `Correct. The lab names three segments: code (machine code), stack (local/temporary variables) and heap (dynamic allocation) (Lab 3, Dynamic array).`],
        [`Heap segment`, `The heap segment is used for dynamic memory allocation with new, not for local variables.`],
        [`Code segment`, `The code segment holds the compiled object/machine code, not variables.`],
        [`Register segment`, `There is no register segment; the lab's three segments are code, stack and heap, and locals go on the stack.`]
      ], a: 0 },
    { q: `<code>struct P { int w; }; P item; P *ptr = &item;</code> Which statement sets w to 5 through ptr?`,
      o: [
        [`ptr.w = 5;`, `ptr is a pointer, not an object, so ptr.w is invalid. You must dereference: ptr->w or (*ptr).w.`],
        [`*ptr.w = 5;`, `The dot binds tighter than *, so this parses as *(ptr.w), which is invalid. Brackets are needed: (*ptr).w = 5.`],
        [`&ptr->w = 5;`, `&ptr->w is the address of w, and an address cannot be assigned to. Setting the member is ptr->w = 5.`],
        [`ptr->w = 5;`, `Correct. If ptr points to a structure, ptr->w is equivalent to (*ptr).w, so ptr->w = 5 sets item.w to 5 (L4, Pointer operations).`]
      ], a: 3 },
    { q: `A pointer variable is:`,
      o: [
        [`A variable whose content is a memory address`, `Correct. The lab defines a pointer variable as a variable whose content is an address (a memory address); it points to a specific data type (Lab 3, Pointers; L4).`],
        [`A variable that always holds an int value`, `A pointer holds a memory address, not an int value; int *p only says it points to an int.`],
        [`A function that returns an address`, `A pointer is a variable (of a pointer data type), not a function. Its content is an address.`],
        [`An array of addresses`, `One pointer holds one address. An array of addresses would be an array of pointers.`]
      ], a: 0 },
    { q: `In the swap slides, x is at 0x2000 and y at 0x2010. Inside trueSwap(&x, &y), what does parameter a hold?`,
      o: [
        [`1`, `1 is the value of x, which trueSwap reaches as *a. The parameter a itself holds x's address.`],
        [`0x2038`, `0x2038 is where the variable a itself is stored, not its content. a holds the address of x.`],
        [`0x2000, the address of x`, `Correct. The call trueSwap(&x, &y) copies the address of x into a, so a holds 0x2000 ("addr of x" on the slide) and *a is x itself (L4, Solution 2).`],
        [`0x2010`, `0x2010 is the address of y, which is passed as the second argument and held by b.`]
      ], a: 2 }
  ],
  5: [
    { q: `Starting from an empty list: insertatbeginning(3); insertatbeginning(7); insertatend(9); deletefrombeginning(). The list is:`,
      o: [
        [`7 3`, `9 was added at the end and 7 was deleted from the beginning.`],
        [`3 9`, `Correct. 3 → insertatbeginning(7) gives 7, 3 → insertatend(9) gives 7, 3, 9 → deletefrombeginning removes the head (7), leaving 3, 9 (L5, Insertion and deletion).`],
        [`7 3 9`, `7 3 9 is the list before the last call. deletefrombeginning moves head to the second node and deletes 7.`],
        [`3 7 9`, `insertatbeginning(7) puts 7 before 3 (newnode->next = head), so 7 was the first node, and it is the one deleted.`]
      ], a: 1 },
    { q: `What happens if the lecture's insertatend is called on an EMPTY list?`,
      o: [
        [`It inserts the first node normally`, `temp1 = head is NULL, so temp1->next crashes.`],
        [`It returns false`, `insertatend is a void function; it returns nothing. On an empty list it dereferences a NULL head and crashes.`],
        [`It crashes because temp1 is NULL when temp1->next is read`, `Correct. Add an isEmpty() check that sets head = newnode.`],
        [`It inserts at the beginning`, `insertatend has no isEmpty branch (unlike insertatbeginning), so it never falls back to inserting at the beginning; it reads NULL->next.`]
      ], a: 2 },
    { q: `To insert newnode after node current, which order is correct?`,
      o: [
        [`current->next = newnode; newnode->next = current->next;`, `newnode->next would point to itself and the rest of the list is lost.`],
        [`newnode->next = current; current->next = newnode;`, `newnode->next = current makes the new node point back to current, creating a loop, and the nodes after current are lost.`],
        [`newnode->next = current->next; current->next = newnode;`, `Correct. Link the new node to the following node first.`],
        [`head = newnode; newnode->next = current;`, `This moves head to the new node, making it the first node; it does not insert after current, and the nodes before current are lost.`]
      ], a: 2 },
    { q: `Why does isFull() of a linked list create a new node?`,
      o: [
        [`To test whether memory can still be allocated; the list is full only if new returns NULL`, `Correct. A linked list has no fixed size, so isFull() tries new Node(); if new returns NULL there is no memory left and the list is "full" (L5, The linked-list class).`],
        [`To count the nodes`, `Counting nodes is done by count(), which walks the list; isFull() only tries to allocate memory.`],
        [`To insert a dummy node`, `The test node is never linked into the list; isFull() only checks whether new returned NULL.`],
        [`Because the list has a fixed size`, `A linked list has no fixed size; it grows while memory is available. That is why isFull() tests whether new can still allocate.`]
      ], a: 0 },
    { q: `In deleteitem, temp2 and temp1 are used as:`,
      o: [
        [`head and tail`, `They are not head and tail: both start at the front and move along the list while searching for the value.`],
        [`previous node and current node`, `Correct. temp2 trails one node behind temp1 so it can be relinked.`],
        [`old and new values`, `deleteitem moves pointers to nodes, not values. Replacing an old value with a new one is update(old_item, new_item).`],
        [`two different lists`, `Both pointers walk the same list; temp2 just trails one node behind temp1 so temp2->next can skip the deleted node.`]
      ], a: 1 },
    { q: `update(4, 10) on the list 2 → 4 → 6 → 4 changes the list to:`,
      o: [
        [`2 → 10 → 6 → 10`, `update returns true right after changing the first match, so the second 4 is never reached.`],
        [`2 → 4 → 6 → 10`, `update scans from head and stops at the first match, so the first 4 (second node) changes, not the last one.`],
        [`10 → 4 → 6 → 4`, `The first node holds 2, which is not old_item (4), so it is skipped; the first 4 is the second node.`],
        [`2 → 10 → 6 → 4`, `Correct. Only the first node with 4 is updated.`]
      ], a: 3 },
    { q: `Which is NOT an advantage of linked lists?`,
      o: [
        [`Dynamic size`, `Dynamic size is the lecture's first advantage: a linked list grows or shrinks at run time.`],
        [`Direct access to any element by index`, `Correct. Linked lists have linear access; this is an array advantage.`],
        [`Efficient insertion and deletion`, `Efficient insertion and deletion is a listed advantage: only pointers change, nothing is shifted.`],
        [`No need for a contiguous block of memory`, `Not needing a contiguous block of memory is the flexibility advantage: nodes can be scattered in memory.`]
      ], a: 1 },
    { q: `In deletefromend, which node does temp2 point to when the loop ends?`,
      o: [
        [`The head`, `temp2 ends at the node before the last. That is the head only when the list has exactly two nodes.`],
        [`The last node`, `temp1 is the one that stops at the last node (temp1->next == NULL); temp2 trails one node behind it.`],
        [`NULL always`, `temp2 stays NULL only for a one-node list (and then temp2->next = NULL would crash). Otherwise it is the second-to-last node.`],
        [`The node before the last node`, `Correct. Then temp2->next = NULL makes it the new last node.`]
      ], a: 3 },
    { q: `Lab 5 InsertAt(item, pos) with list 5 → 10 → 30 and InsertAt(20, 3) gives:`,
      o: [
        [`5 → 10 → 20 → 30`, `Correct. p moves to position 2 (node 10), then 20 is linked after it.`],
        [`5 → 20 → 10 → 30`, `5 → 20 → 10 → 30 is the result of InsertAt(20, 2). With pos = 3, p moves to node 2 (10) and 20 goes after it.`],
        [`20 → 5 → 10 → 30`, `20 at the front is the pos == 1 case (temp->next = head; head = temp). Here pos = 3.`],
        [`5 → 10 → 30 → 20`, `Putting 20 after 30 is position 4. With pos = 3 the loop stops at the 2nd node (10) and 20 is linked after it.`]
      ], a: 0 },
    { q: `How does search(item) end when the item is not in the list?`,
      o: [
        [`It crashes at the last node`, `It does not crash: the loop condition is while (temp != NULL), so it stops safely after the last node.`],
        [`It returns true`, `search returns true only when temp->data == item. If no node matches, the loop ends and it returns false.`],
        [`It returns false after temp becomes NULL`, `Correct. search walks temp = temp->next from head; if no node's data equals item, temp becomes NULL, the while loop stops and the function returns false (L5, search).`],
        [`It returns the last node`, `search returns a bool (true/false), not a node pointer; when the item is missing it returns false.`]
      ], a: 2 }
  ],
  6: [
    { q: `Linked stack: push(1), push(2), push(3), pop(), push(4). display() prints:`,
      o: [
        [`1 2 4`, `1 2 4 is bottom-to-top order. display() starts at top (the last pushed node, 4) and follows next down to 1.`],
        [`4 2 1`, `Correct. Stack after the pushes: 3 2 1 (top first). pop() removes 3, push(4) makes 4 the top, and display() prints from top: 4 2 1 (L6, Display).`],
        [`4 3 2 1`, `3 was removed by pop() (top = top->next; delete temp), so it is not printed.`],
        [`3 2 1 4`, `4 was pushed last, so it is the top and is printed first; and 3 was already popped.`]
      ], a: 1 },
    { q: `What does the lecture's pop() return when the linked stack is empty?`,
      o: [
        [`-1`, `The array stack returns -1; the linked stack returns 0.`],
        [`NULL`, `pop() returns an int value, not a pointer; on an empty stack the lecture code prints "Empty" and returns 0.`],
        [`0 after printing "Empty"`, `Correct. If isEmpty() is true, the lecture's pop() prints "Empty", keeps top = NULL and returns 0 (the array stack returned −1) (L6, Pop from linked stack).`],
        [`The last popped value`, `The linked stack keeps no record of earlier pops; on an empty stack pop() just prints "Empty" and returns 0.`]
      ], a: 2 },
    { q: `In the push steps, what is set when the stack is empty (step 3)?`,
      o: [
        [`newNode->next = NULL`, `Correct. Step 3: if the stack is empty (top == NULL), set newNode->next = NULL, since the new node will be the only one; step 5 then sets top = newNode (L6, Push).`],
        [`newNode->next = top->next`, `When the stack is empty top is NULL, so reading top->next would crash. The empty case sets newNode->next = NULL.`],
        [`top->next = newNode`, `top is NULL when the stack is empty, so top->next cannot be assigned; besides, push never links top to the new node this way.`],
        [`top = NULL`, `top is already NULL when empty; step 5 sets top = newNode, not NULL. Step 3 sets newNode->next = NULL.`]
      ], a: 0 },
    { q: `Linked stack: push(10), push(20), push(30). What does count() return after pop()?`,
      o: [
        [`3`, `3 is the count before pop(). pop() removes the top node (30), so count() then walks two nodes.`],
        [`1`, `Only one pop() was done, removing 30; nodes 20 and 10 remain, so count() returns 2.`],
        [`0`, `0 would mean an empty stack (top == NULL). After one pop, 20 and 10 are still linked.`],
        [`2`, `Correct. Three pushes give 30 → 20 → 10; pop() removes 30, and count() does c++ for each remaining node until NULL: 2 (L6, Counting elements).`]
      ], a: 3 },
    { q: `search(25) on the linked stack 99 → 50 → 32 → 25 → NULL visits how many nodes?`,
      o: [
        [`1`, `1 visit would find only the top, 99. search starts at top, and 25 is the bottom node, the 4th.`],
        [`4`, `Correct. It starts at top (99) and finds 25 at the 4th node.`],
        [`3`, `3 visits reach 99, 50, 32 only. 25 is the 4th node, so it is found on the 4th visit.`],
        [`5`, `There are only four nodes; the search returns true at the 4th (25) and never moves on to NULL.`]
      ], a: 1 },
    { q: `Which statement about the linked stack in the lecture is true?`,
      o: [
        [`It needs MAXSIZE to be declared first`, `MAXSIZE belongs to the array stack. The linked stack works for an unlimited number of values, with no fixed size.`],
        [`New nodes are added at the end of the list`, `New nodes are inserted as the top, at the beginning of the list (newnode->next = top), not at the end.`],
        [`Every newly inserted element is pointed to by top`, `Correct. The lecture says every new element is inserted as the top element, so every newly inserted element is pointed to by top; pop removes the node top points to (L6, Linked stack).`],
        [`It uses front and rear pointers`, `front and rear are a queue's pointers. The linked stack uses a single pointer, top.`]
      ], a: 2 },
    { q: `Which code removes all the items of a linked stack?`,
      o: [
        [`top = NULL;`, `This loses the nodes without freeing them (memory leak).`],
        [`while (top != NULL) { Node *t = top; top = top->next; delete t; }`, `Correct. Each pass saves the top node in t, moves top to the next node and frees t with delete, until top is NULL; every node is released and the stack ends empty (same pattern as pop, L6).`],
        [`delete top;`, `delete top frees only the top node and leaves top pointing at freed memory; the nodes below are never freed.`],
        [`while (top != NULL) top = top->next;`, `This walks top down to NULL without delete, so the stack looks empty but every node stays allocated (memory leak).`]
      ], a: 1 },
    { q: `What does get() do in a linked stack?`,
      o: [
        [`Removes and returns the top`, `Removing and returning the top is pop(). get() only reads top->data and leaves the stack unchanged.`],
        [`Returns the bottom element`, `get() reads top->data, the last pushed element, not the bottom one.`],
        [`Returns the number of nodes`, `Counting the nodes is count(). get() returns the data of the top node.`],
        [`Returns the top element without removing it`, `Correct. get() returns top->data if top != NULL (otherwise prints "Empty" and returns 0); it does not move top or delete anything (L6, Get the first node).`]
      ], a: 3 },
    { q: `In Lab 7, push(item) is described as:`,
      o: [
        [`Insert to beginning`, `Correct. The new node becomes the first node (top).`],
        [`Insert to end`, `Inserting at the end is how a linked queue's enqueue works (at rear). A stack adds at the top, the beginning of the list.`],
        [`Insert in order`, `A stack never orders its elements; push always puts the new node first, whatever its value.`],
        [`Insert at position 2`, `push always inserts at the top (first position), never at a fixed position like 2.`]
      ], a: 0 },
    { q: `Elements are pushed in the order 25, 32, 50, 99. Which node's next is NULL?`,
      o: [
        [`99`, `99 was pushed last, so it is the top; its next points to 50, the node below it.`],
        [`50`, `50 is in the middle; its next points to 32, the node pushed before it.`],
        [`25`, `Correct. The first pushed node is at the bottom and points to NULL.`],
        [`32`, `32's next points to 25, the first pushed node, which is the bottom and the one with next = NULL.`]
      ], a: 2 }
  ],
  7: [
    { q: `Linked queue: enqueue 5, 6, 7; dequeue; enqueue 8. What do count() and get() return?`,
      o: [
        [`3 and 6`, `Correct. After the enqueues: 5, 6, 7; dequeue removes the front (5); enqueue(8) adds at rear → 6, 7, 8. count() = 3 and get() returns front->data = 6 (L7).`],
        [`4 and 5`, `5 was removed by the dequeue, so it cannot be returned by get(), and only 3 nodes remain (6, 7, 8).`],
        [`3 and 8`, `The count is right but get() returns front->data (6), not the rear value 8.`],
        [`2 and 7`, `Three nodes remain (6, 7, 8): one dequeue after three enqueues and then one more enqueue. And get() returns 6, the front.`]
      ], a: 0 },
    { q: `In enqueue, why is newnode->next set to NULL?`,
      o: [
        [`Because it becomes the first node`, `The new node joins at the rear, so it is the last node, not the first. Its next must be NULL to end the list.`],
        [`Because the new node becomes the last node of the list`, `Correct. Step 1 of enqueue sets newNode->next = NULL because the new node is linked after rear and becomes the last node, whose next must be NULL (L7, Enqueue).`],
        [`To delete the old rear`, `Setting newnode->next = NULL deletes nothing; enqueue never deletes. It only marks the new node as the end of the list.`],
        [`It is optional`, `It is required: display, count and search stop at NULL, so the last node's next must be NULL (the Node constructor also sets it).`]
      ], a: 1 },
    { q: `When the queue is empty, enqueue sets:`,
      o: [
        [`rear->next = newnode`, `When the queue is empty rear is NULL, so rear->next cannot be used. Step 3 sets front = newNode and rear = newNode.`],
        [`front = NULL and rear = newnode`, `With front left NULL, dequeue and display would see no node. A single node is both first and last, so front = rear = newNode.`],
        [`front = newnode and rear = newnode`, `Correct. Step 3: if the queue is empty, the new node is both the first and the last node, so front = newNode and rear = newNode (L7, Enqueue).`],
        [`top = newnode`, `top is a stack pointer; a linked queue has front and rear only.`]
      ], a: 2 },
    { q: `Which display order is produced by a linked queue holding 10, 15, 22, 50 (inserted in that order)?`,
      o: [
        [`50 22 15 10`, `50 22 15 10 is reverse insertion order, which is what a linked stack displays. A queue displays front to rear.`],
        [`10 50 15 22`, `display() follows next from front without skipping, so the order must be the insertion order 10 15 22 50.`],
        [`22 50 10 15`, `Starting at 22 would skip the front. display() starts at front (10) and follows next to rear.`],
        [`10 15 22 50`, `Correct. display() starts at temp = front (the first inserted, 10) and follows next until NULL, so it prints in FIFO insertion order (L7, Display).`]
      ], a: 3 },
    { q: `Which step list describes dequeue correctly?`,
      o: [
        [`Check empty; temp = rear; rear = rear->next; delete temp`, `Deletion in a queue is at the front. Also rear->next is NULL, so rear = rear->next would just lose the queue's end.`],
        [`Check empty; temp = front; front = front->next; delete temp`, `Correct. The lecture's dequeue: check empty (front == NULL); set temp = front; move front = front->next; then delete temp (L7, Dequeue).`],
        [`Check full; temp = front; delete front`, `Dequeue checks empty, and front must move first.`],
        [`temp = front; delete temp; front = front->next`, `Deleting temp first frees the front node, and front->next is then read from freed memory. front must move before delete.`]
      ], a: 1 },
    { q: `What is the main advantage of the linked queue over the array queue?`,
      o: [
        [`It works for an unlimited (variable) number of values`, `Correct. The array queue works only for a fixed number of values set at the start; the linked queue works for an unlimited (variable) number with no size fixed (L7, Linked queue).`],
        [`It is LIFO`, `Both queue implementations are FIFO. LIFO is the stack rule.`],
        [`It needs no pointers`, `The linked queue does need pointers: every node has next, and the queue keeps front and rear.`],
        [`It allows direct index access`, `Direct index access is an array property. Linked structures need traversal (linear access).`]
      ], a: 0 },
    { q: `Lab 7's dequeue handles a queue with only one item by:`,
      o: [
        [`Deleting rear only`, `Deleting only rear leaves front pointing at freed memory. With one item, both pointers must be reset to NULL.`],
        [`Moving rear back one node`, `A singly linked node has no prev pointer, so rear cannot move back; with one item the queue simply becomes empty (front = rear = NULL).`],
        [`Printing the item and setting front = rear = NULL`, `Correct. When front->next == NULL (only one item), Lab 7's dequeue prints it and sets front = rear = NULL, so the queue is properly empty and isEmpty() works again (Lab 7, Linked queue).`],
        [`Calling enqueue`, `Dequeue never calls enqueue. For one item, Lab 7 prints it and sets front = rear = NULL.`]
      ], a: 2 },
    { q: `Linked queue: enqueue 1, 2; dequeue; dequeue; enqueue 3 (using the safe dequeue that resets rear). The queue is:`,
      o: [
        [`1 2 3`, `Both dequeues removed nodes from the front: first 1, then 2. Only 3 is left.`],
        [`2 3`, `The second dequeue removed 2 as well, emptying the queue before 3 was added.`],
        [`Empty`, `The queue was empty after two dequeues, but enqueue(3) then made 3 the only node (front = rear = newnode).`],
        [`3`, `Correct. After two dequeues the queue is empty (front = rear = NULL); 3 becomes the only node.`]
      ], a: 3 },
    { q: `Where does a linked queue insert and where does it delete, in list terms?`,
      o: [
        [`Insert at the end, delete from the beginning`, `Correct. enqueue links the new node after rear (end of the list) and dequeue removes the node at front (beginning), so the first in is the first out (L7, Linked queue).`],
        [`Insert at the beginning, delete from the beginning`, `Inserting and deleting at the beginning is a linked stack (LIFO), not a queue.`],
        [`Insert at the beginning, delete from the end`, `That would still be FIFO but is not the lecture's design (deleting the end needs a traversal).`],
        [`Insert in order, delete anywhere`, `A queue never orders by value or deletes from the middle; it inserts at rear and deletes at front.`]
      ], a: 0 },
    { q: `How many nodes does search(22) visit in the queue 10 → 15 → 22 → 50?`,
      o: [
        [`1`, `One visit checks only the front (10). 22 is the third node from front.`],
        [`4`, `search returns true as soon as temp->data == 22, so it never visits 50.`],
        [`3`, `Correct. search starts at front and checks 10, 15, then 22, where temp->data == item and it returns true: 3 nodes visited (L7, Searching).`],
        [`2`, `Two visits check only 10 and 15; 22 is the third node.`]
      ], a: 2 }
  ],
  8: [
    { q: `Lab 8 main: insertFirst(10), insertLast(20), insertLast(30), insertFirst(100), insertFirst(200), removeFirst(), removeLast(). The list is:`,
      o: [
        [`200 100 10 20`, `removeFirst() deleted the head (200), so 200 is gone; and removeLast() deleted 30.`],
        [`100 10 20`, `Correct. 200 100 10 20 30 → remove first → 100 10 20 30 → remove last → 100 10 20.`],
        [`100 10 20 30`, `removeLast() deletes the tail node (30): tail->prev->next = NULL; tail = tail->prev.`],
        [`10 20 30`, `100 was inserted at the front after 10 and is not removed: removeFirst() removed 200 only.`]
      ], a: 1 },
    { q: `Continuing Lab 8: insertAtPosition(1000, 2), insertAtPosition(2000, 4), insertAtPosition(5, 1). displayBackward prints:`,
      o: [
        [`5 100 1000 10 2000 20`, `That is the forward order (displayForward). displayBackward starts from tail and follows prev, so it prints the reverse.`],
        [`20 10 2000 1000 100 5`, `2000 was inserted at position 4, after 10, so backward it comes right after 20 and before 10.`],
        [`20 2000 10 1000 100 5`, `Correct. Forward is 5 100 1000 10 2000 20 (run with g++, current initialized to 1).`],
        [`20 2000 1000 10 100 5`, `1000 was inserted at position 2, right after 100, so backward it is just before 100: … 10 1000 100 5.`]
      ], a: 2 },
    { q: `Which statement must be added when deleting the first node of a doubly linked list (with more than one node)?`,
      o: [
        [`head->next = NULL;`, `head->next = NULL would cut the new first node off from the rest of the list.`],
        [`tail = head;`, `Deleting the first node does not move the tail (with more than one node); only head and the new head's prev change.`],
        [`head->prev = head;`, `A first node's prev must be NULL, not point to itself; head->prev = head would create a self-loop when traveling backward.`],
        [`head->prev = NULL; after head = head->next;`, `Correct. The new first node must not point back to the deleted node.`]
      ], a: 3 },
    { q: `What goes wrong in the lecture's deletefrombeginning if the list has only one node?`,
      o: [
        [`head becomes NULL and head->prev = NULL crashes`, `Correct. Check head != NULL before setting prev.`],
        [`Nothing`, `With one node, head = head->next makes head NULL, and head->prev = NULL then dereferences NULL and crashes.`],
        [`It deletes two nodes`, `Only one node exists and only temp is deleted; the problem is the head->prev access on a NULL head.`],
        [`It returns the wrong value`, `value = head->data is read correctly before head moves; the failure is the crash at head->prev = NULL.`]
      ], a: 0 },
    { q: `A doubly linked list node uses more memory than a singly linked node because:`,
      o: [
        [`It stores the data twice`, `Each node stores its data once, like a singly linked node. The extra memory is the backward reference.`],
        [`It has an extra prev pointer`, `Correct. Besides data and next, each doubly linked node has a prev pointer; the lecture notes this allows backward travel but requires additional memory (L5/L8, Doubly linked list).`],
        [`It is always allocated as an array`, `Nodes are created one at a time with new Node(), not as an array; the extra memory per node is the prev pointer.`],
        [`It stores the head inside each node`, `Nodes do not store head; head is a single pointer in the list class. Each node only has data, next and prev.`]
      ], a: 1 },
    { q: `Insert 15 between nodes 10 (temp) and 20 in a doubly list. Which statement is part of the correct linking?`,
      o: [
        [`newnode->prev = temp->next;`, `temp->next is 20; 15's prev must point to the node before it, temp (10).`],
        [`temp->prev = newnode;`, `10's prev points to the node before 10 and does not change; 20's prev is the one that must become 15.`],
        [`temp->next->prev = newnode;`, `Correct. temp->next is 20, and 20 must point back to the new node, so its prev becomes 15; the lecture writes it as newnode->next->prev = newnode, with newnode->prev = temp and newnode->next = 20 (L8, insertsorted).`],
        [`newnode->next = temp;`, `newnode->next = temp would point 15 back to 10. Its next must be the following node, 20.`]
      ], a: 2 },
    { q: `What does insertatend set as the new node's prev?`,
      o: [
        [`NULL`, `prev = NULL is only for the first node. A node added at the end has a node before it, the old last node.`],
        [`head`, `prev is head only if the list had one node. In general it is temp1, the old last node found by the loop.`],
        [`newnode itself`, `A node never points back to itself; newnode->prev must be the node before it, temp1.`],
        [`The old last node (temp1)`, `Correct. insertatend walks temp1 to the last node, links temp1->next = newnode, then sets newnode->prev = temp1 so the new last node points back to the old one (L8, Inserting at the end).`]
      ], a: 3 },
    { q: `Lab 8 removeLast() uses which statements?`,
      o: [
        [`delnode = tail; tail->prev->next = NULL; tail = tail->prev; delete delnode;`, `Correct. Lab 8 keeps a tail pointer: save delnode = tail, cut the link from the previous node (tail->prev->next = NULL), move tail back to it, and delete delnode (Lab 8, removeLast).`],
        [`tail = NULL; delete tail;`, `tail = NULL throws away the only pointer to the last node, and delete tail then deletes NULL; the node before still points to it.`],
        [`head = head->next; delete head;`, `This moves head forward, so it works on the first node, and it then deletes the new head instead of the old one.`],
        [`tail->next = NULL; delete tail;`, `tail->next is already NULL; the previous node must be updated.`]
      ], a: 0 },
    { q: `Forward display of a doubly list gives 3 6 9. What is head->next->prev->data?`,
      o: [
        [`6`, `head->next is 6, but the question then goes back one step with prev, which returns to 3.`],
        [`3`, `Correct. Going forward then back returns to the head (3).`],
        [`9`, `9 is the last node, reached by head->next->next. Going forward one and back one stays at the head.`],
        [`NULL`, `Only the first node's prev is NULL. 6 has a previous node, 3.`]
      ], a: 1 },
    { q: `How many pointer fields change when inserting a node in the middle of a doubly linked list (counting the new node's two fields)?`,
      o: [
        [`1`, `Changing one pointer would leave the new node unlinked on one side. Both neighbors and both new fields change.`],
        [`2`, `2 changes (newnode->next and previous->next) is the singly-linked case. A doubly list must also set two prev pointers.`],
        [`4`, `Correct. newnode->next, newnode->prev, previous->next and following->prev.`],
        [`6`, `Only four links change: the new node's next and prev, the previous node's next and the following node's prev.`]
      ], a: 2 }
  ],
  9: [
    { q: `Insert 30, 20, 40, 10, 25, 35, 50 into an empty BST. The preorder traversal is:`,
      o: [
        [`10 20 25 30 35 40 50`, `That is the inorder output, which is sorted for a BST. Preorder prints the root 30 first.`],
        [`30 20 10 25 40 35 50`, `Correct. Root, left subtree (20, 10, 25), right subtree (40, 35, 50).`],
        [`10 25 20 35 50 40 30`, `That is the postorder output (left, right, parent), ending with the root 30. Preorder starts with 30.`],
        [`30 20 40 10 25 35 50`, `That lists the tree level by level, which happens to equal the insertion order. Preorder finishes the whole left subtree (20, 10, 25) before 40.`]
      ], a: 1 },
    { q: `For the same BST (30, 20, 40, 10, 25, 35, 50), the postorder traversal is:`,
      o: [
        [`10 25 20 35 50 40 30`, `Correct. The tree is 30 with children 20 (10, 25) and 40 (35, 50). Postorder: left subtree 10 25 20, right subtree 35 50 40, then the root 30 (L9, Postorder).`],
        [`30 40 50 35 20 25 10`, `This starts with the root 30, but postorder prints the root last. It is preorder with right visited before left.`],
        [`10 20 25 30 35 40 50`, `That is the inorder output (sorted keys). Postorder prints each parent after its children, so 30 comes last.`],
        [`25 10 20 50 35 40 30`, `Within a subtree the left child is listed before the right.`]
      ], a: 0 },
    { q: `Inserting 1, 2, 3, 4, 5 in this order into an empty BST gives:`,
      o: [
        [`A balanced tree with root 3`, `The first inserted key, 1, becomes the root, and each later key is larger, so the tree is not balanced.`],
        [`A tree where every node has two children`, `Each key is larger than all before it, so every node gets only a right child; no node has two children.`],
        [`An error, because keys must be inserted unsorted`, `insert() accepts keys in any order; sorted input just produces a tall, unbalanced tree.`],
        [`A degenerate tree where each node has only a right child (like a linked list)`, `Correct. 1 is the root; 2 &gt; 1 goes right; 3 goes right of 2, and so on. Every node has only a right child, so the BST degenerates into a chain like a linked list (L9, Insertion).`]
      ], a: 3 },
    { q: `In the lecture tree 43; 31(20, 40); 64(56, 89) with leaves 28, 33, 47, 59, what does maximum(root) return?`,
      o: [
        [`64`, `64 is not the maximum: it has a right child 89, and maximum() keeps moving right until right is NULL.`],
        [`59`, `59 is in 64's left subtree (child of 56), so it is smaller than 64; maximum() only follows right links.`],
        [`89`, `Correct. maximum() calls itself on temp->right until right is NULL: 43 → 64 → 89, and 89 has no right child, so it is the largest key (L9, Get maximum & minimum).`],
        [`43`, `43 is the root; it has a right child 64, so it is not the maximum.`]
      ], a: 2 },
    { q: `Search for 0.5 in the tree with root 1.0 (left 0.6, whose left is 0.3 with right child 0.4). The search:`,
      o: [
        [`Finds 0.5 at the root`, `The root holds 1.0, not 0.5. Since 0.5 is less than 1.0, the search moves to the left subtree.`],
        [`Goes 1.0 → 0.6 → 0.3 → 0.4 → NULL and returns false`, `Correct. 0.5 &lt; 1.0 → left to 0.6; 0.5 &lt; 0.6 → left to 0.3; 0.5 &gt; 0.3 → right to 0.4; 0.5 &gt; 0.4 → right child is NULL, so search returns false (L9, Searching example).`],
        [`Goes 1.0 → 1.9 and stops`, `1.9 is the right child, taken only for keys greater than 1.0. 0.5 is smaller, so the search goes left.`],
        [`Goes 1.0 → 0.6 → 0.8 and returns false`, `At 0.6 the key 0.5 is smaller, so the search goes left to 0.3, not right to 0.8.`]
      ], a: 1 },
    { q: `In the recursive insert, what happens when temp is NULL?`,
      o: [
        [`A new node is created with the item and returned`, `Correct. The caller links it as a left or right child.`],
        [`The function returns false`, `insert returns a Node* (the subtree root), not a bool; at NULL it returns the newly created node.`],
        [`The item is ignored`, `NULL is exactly where the new item belongs: a node is created there and returned to be linked as a leaf.`],
        [`The root is deleted`, `insert never deletes. Reaching NULL means the right place was found, and the new node is created there.`]
      ], a: 0 },
    { q: `Why does the slide's search need <code>return</code> before the recursive calls?`,
      o: [
        [`To make it faster`, `Speed is not the issue: without return the recursive call still runs, but its true/false result is thrown away.`],
        [`Because recursion is not allowed without it`, `The recursion is allowed and still runs without return; the problem is that its result is discarded.`],
        [`Without it the result of the recursive call is discarded and the function may return garbage`, `Correct. On the slide, search(temp->left, item) is called but its result is not returned, so the outer call falls off the end of a bool function and returns an undefined value; writing return search(…) passes the answer up (L9, Searching).`],
        [`To print the result`, `return passes the value back to the caller; it does not print anything. Printing is done by main with cout.`]
      ], a: 2 },
    { q: `Which traversal visits the root first?`,
      o: [
        [`Inorder`, `Inorder traverses the left subtree first, visiting the parent in the middle.`],
        [`Postorder`, `Postorder visits the parent last, after both subtrees.`],
        [`Reverse inorder`, `Reverse inorder (right, root, left) traverses the right subtree before the root.`],
        [`Preorder`, `Correct. The traversals are named by when the parent is visited; preorder visits the parent first, then the left subtree, then the right (L9, Preorder traversal).`]
      ], a: 3 },
    { q: `Deleting a node with TWO children in a BST is usually done by:`,
      o: [
        [`Deleting the whole subtree`, `Deleting the whole subtree would also remove every key below the node, not just the one requested.`],
        [`Replacing its key with the inorder successor (minimum of the right subtree) and deleting that node`, `Correct. The standard method copies the inorder successor (the minimum of the right subtree) into the node and deletes that successor, which has at most one child. Note: the lecture's deleteitem code handles only the leaf and one-child cases.`],
        [`Setting the parent's link to NULL`, `Setting the parent's link to NULL only works for a leaf; here it would drop both subtrees of the node.`],
        [`Swapping it with the root`, `Swapping with the root puts keys on the wrong side and breaks the BST rule (left smaller, right larger).`]
      ], a: 1 },
    { q: `How many leaves does the BST built from 50, 25, 65, 12, 33, 70, 55, 60, 53 have?`,
      o: [
        [`3`, `3 misses some leaves. The tree is 50; 25(12, 33); 65(55(53, 60), 70): nodes with no children are 12, 33, 53, 60, 70.`],
        [`4`, `4 misses 70: it is 65's right child and has no children, so it is also a leaf (with 12, 33, 53, 60).`],
        [`5`, `Correct. 12, 33, 53, 60 and 70 have no children.`],
        [`9`, `9 is the total number of nodes. Leaves are only the nodes with no children: 12, 33, 53, 60, 70.`]
      ], a: 2 }
  ],
  10: [
    { q: `Using the truncation method with a table of size 100 (rightmost digits), key 123456 maps to:`,
      o: [
        [`12`, `12 takes the leftmost two digits. With the rightmost-digits rule, size 100 uses the last two digits: 56.`],
        [`56`, `Correct. Size 100 needs 2 digits: the last two are 56.`],
        [`456`, `456 is three digits, which is what a table of size 1000 uses (indices 0..999). Size 100 needs only 2 digits.`],
        [`34`, `34 are the middle digits of 123456; truncation keeps the rightmost digits (56), not the middle.`]
      ], a: 1 },
    { q: `Folding key 123456789 into groups of 3 digits gives:`,
      o: [
        [`1368`, `Correct. Folding splits the key into groups of 3 digits and adds them: 123 + 456 + 789 = 1368 (L10, Folding method).`],
        [`1888`, `1888 is the lecture's folding result for a different key, 143765980 (143 + 765 + 980). Here: 123 + 456 + 789.`],
        [`579`, `579 = 123 + 456 adds only the first two groups; the third group 789 must be added too: 1368.`],
        [`369`, `369 is the last digit of each group (3, 6, 9). Folding adds the whole groups: 123 + 456 + 789 = 1368.`]
      ], a: 0 },
    { q: `Mid square for key 345 (345² = 119025), taking the middle 2 digits:`,
      o: [
        [`11`, `11 are the first two digits of 119025; mid square takes the middle digits.`],
        [`25`, `25 are the last two digits (that would be truncation). Mid square takes the middle two: 90.`],
        [`19`, `19 is shifted one digit left of center. 119025 has six digits, so the middle two are the 3rd and 4th: 9 and 0.`],
        [`90`, `Correct. 11|90|25: the middle two digits are 90.`]
      ], a: 3 },
    { q: `Keys 10, 17, 24 into a table of size 7 using the lecture's quadratic probing h(k,i) = (k mod 7 + i + i²) mod 7. Where does 24 go?`,
      o: [
        [`3`, `Slot 3 is 24's home address (24 mod 7 = 3), but 10 already occupies it (10 mod 7 = 3).`],
        [`5`, `Slot 5 is the i = 1 try (3 + 1 + 1), but 17 was placed there after colliding at 3. So 24 goes on to i = 2.`],
        [`2`, `Correct. i=0 → 3 taken, i=1 → 5 taken, i=2 → (3 + 2 + 4) mod 7 = 2.`],
        [`4`, `4 is h + 1, the linear probing step. The lecture's quadratic formula adds i + i², so the tries are 3, 5, then 2.`]
      ], a: 2 },
    { q: `Double hashing with h1 = k mod 13 and h2 = 1 + (k mod 11): slot 1 is occupied by 27. Where does 40 go?`,
      o: [
        [`1`, `Slot 1 is 40's primary address (40 mod 13 = 1), but 27 is there (27 mod 13 = 1), so double hashing must step.`],
        [`2`, `Slot 2 = 1 + 1 is the linear probing step. Double hashing steps by h2 = 1 + (40 mod 11) = 8.`],
        [`8`, `8 is the step size h2(40) = 1 + 7. The slot is (h1 + 1 · h2) mod 13 = (1 + 8) mod 13 = 9.`],
        [`9`, `Correct. h2 = 1 + 40 mod 11 = 8; (1 + 1·8) mod 13 = 9.`]
      ], a: 3 },
    { q: `Which collision method needs no prior knowledge of how many elements will be stored?`,
      o: [
        [`Separate chaining`, `Correct. The lecture says separate chaining handles an unlimited number of collisions at one address and needs no prior knowledge of how many elements will be stored, because chains are linked lists that grow (L10, Separate chaining).`],
        [`Linear probing`, `Linear probing stores every key in the fixed-size array itself, so the table size limits how many keys fit.`],
        [`Quadratic probing`, `Quadratic probing also stores keys in the array itself, so it is limited by the table size.`],
        [`Double hashing`, `Double hashing is open addressing too: keys go in the array cells, so the number of keys is limited by the table size.`]
      ], a: 0 },
    { q: `Why does the truncation method cause more collisions?`,
      o: [
        [`Because it squares the key`, `Squaring the key is the mid square method; truncation just cuts off digits.`],
        [`Because it uses only part of the key, so keys sharing those digits collide`, `Correct. Truncation keeps only some digits (e.g. the last 3 for size 1000), so all keys that share those digits get the same address; the lecture says the chances of collision are more in this method (L10, Truncation method).`],
        [`Because it uses a prime number`, `Truncation does not use a prime; the prime modulus belongs to the division examples, and it spreads keys better.`],
        [`Because it adds digit groups`, `Adding groups of digits is the folding method, not truncation.`]
      ], a: 1 },
    { q: `Keys 7, 14, 21 in a table of size 7 with linear probing. Final positions?`,
      o: [
        [`0, 1, 2`, `Correct. All hash to 0; 14 moves to 1, 21 moves to 2.`],
        [`0, 0, 0`, `Open addressing stores one key per cell; colliding keys move to the next empty cell (1, then 2), they do not share 0.`],
        [`7, 14, 21`, `7, 14 and 21 are the keys, not addresses; the table has indices 0..6, and all three keys hash to 0.`],
        [`0, 2, 4`, `0, 2, 4 steps by 2. Linear probing steps by 1: (0 + 1) mod 7 = 1 for 14, then 2 for 21.`]
      ], a: 0 },
    { q: `To search for a key with linear probing, you:`,
      o: [
        [`Check only the hash address`, `Checking only the hash address misses keys that collided and were placed further on. The search continues linearly.`],
        [`Search the whole table from index 0`, `The search does not start at index 0; it starts at the key's hash address and moves forward from there.`],
        [`Start at the hash address and continue linearly until found or an empty cell`, `Correct. The lecture checks the hash address of the key first; if the key is not there, it searches linearly in the following positions (stopping at the key or an empty cell) (L10, Linear probing).`],
        [`Use a second hash function`, `A second hash function is used by double hashing; linear probing just steps one cell at a time.`]
      ], a: 2 },
    { q: `Which is NOT one of the five collision resolution techniques listed in the lecture?`,
      o: [
        [`Rehashing`, `Rehashing is listed: the five techniques are linear probing, quadratic probing, double hashing, rehashing and extendible hashing.`],
        [`Extendible hashing`, `Extendible hashing is the fifth technique in the lecture's list of collision resolution techniques.`],
        [`Double hashing`, `Double hashing is the third technique in the list, and one of the three the lecture covers in detail.`],
        [`Mid square`, `Correct. Mid square is a hash function, not a collision resolution technique.`]
      ], a: 3 }
  ]
};

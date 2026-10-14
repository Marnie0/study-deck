window.EXTRA = window.EXTRA || {};
EXTRA.ds = {
  1: [
    { q: `A data type is defined in the lecture as:`,
      o: [
        [`A group of elements of the same type stored together`, `That describes an array, a data structure.`],
        [`A domain of allowed values and a set of operations on these values`, `Correct. This is the lecture's two-part definition.`],
        [`The logical model of a particular organization of data`, `That is the definition of a data structure.`],
        [`An interface without implementation details`, `That is an ADT.`]
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
        [`16 2 77 40 12`, `The array is sorted, not printed unchanged.`],
        [`77 16 40 12 2`, `Not fully sorted; the nested loops finish the sort.`],
        [`77 40 16 12 2`, `Correct. Swapping whenever billy[n] &lt; billy[m] produces descending order.`]
      ], a: 3 },
    { q: `Array element = {5, 2, 4, 8, 1}, length = 5. After the lecture's Insert with k = 2 and x = 9, the array is:`,
      o: [
        [`5 2 9 4 8 1`, `Correct. Elements from index 2 shift right and 9 is placed at element[2] (after the 2nd element). Checked with g++.`],
        [`5 9 2 4 8 1`, `That inserts after the 1st element.`],
        [`9 5 2 4 8 1`, `That inserts at the beginning.`],
        [`5 2 4 9 8 1`, `That inserts after the 3rd element.`]
      ], a: 0 },
    { q: `Array {5, 2, 4, 8, 1}. The lecture's Delete with k = 2 (delete the 2nd element) gives:`,
      o: [
        [`5 2 8 1`, `That deletes the 3rd element.`],
        [`5 4 8 1`, `Correct. element[i-1] = element[i] for i = 2..4 shifts 4, 8, 1 left over the 2; length becomes 4.`],
        [`2 4 8 1`, `That deletes the 1st element.`],
        [`5 2 4 8`, `That deletes the last element.`]
      ], a: 1 },
    { q: `Array x has 4 rows and 5 columns, stored row by row. x[3][2] maps to which position of the 1D array?`,
      o: [
        [`14`, `This uses 3·4 + 2 (rows instead of columns).`],
        [`11`, `This uses 3 + 2·4.`],
        [`17`, `Correct. i·c + j = 3·5 + 2 = 17.`],
        [`20`, `20 is the total number of elements.`]
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
        [`Whole arrays and individual elements are both passed by value`, `Whole arrays are passed by reference.`],
        [`Whole arrays are passed by reference, individual elements by value`, `Correct (Lab 1).`],
        [`Whole arrays are passed by value, individual elements by reference`, `The reverse is true.`],
        [`Arrays cannot be passed to functions`, `Lab 2 passes an array to LinearSearch.`]
      ], a: 1 },
    { q: `Combining data elements from two or more data structures into one is called:`,
      o: [
        [`Sorting`, `Sorting arranges elements in order.`],
        [`Navigating`, `Navigating visits each element once.`],
        [`Insertion`, `Insertion adds one new element.`],
        [`Merging`, `Correct.`]
      ], a: 3 },
    { q: `Which declaration creates three objects of a struct in one statement, the "first way" from the lecture?`,
      o: [
        [`struct product { int weight; float price; } apple, banana, melon;`, `Correct. The object names follow the closing brace.`],
        [`product { int weight; float price; } apple;`, `The struct keyword is missing.`],
        [`struct product apple, banana, melon { int weight; };`, `Members must come before the object names.`],
        [`product[3] = {apple, banana, melon};`, `This is not valid struct syntax.`]
      ], a: 0 }
  ],
  2: [
    { q: `MAXSIZE = 4, top = -1. Operations: push(10), push(20), push(30), pop(), push(40), push(50), push(60). What happens?`,
      o: [
        [`All pushes succeed and top = 5`, `top can never exceed MAXSIZE-1 = 3.`],
        [`push(50) causes overflow`, `After the pop there are 3 elements (10, 20, 40), so 50 fits as the 4th.`],
        [`push(60) causes stack overflow; the stack holds 10 20 40 50`, `Correct. After 50 the stack is full (top = 3), so 60 overflows.`],
        [`pop() causes underflow`, `The stack has 3 elements when pop is called.`]
      ], a: 2 },
    { q: `For the stack 10, 20, 40, 50 (50 on top), display() prints:`,
      o: [
        [`10 20 40 50`, `display loops from top down to 0, which is reverse order.`],
        [`50 40 20 10`, `Correct. for (j = top; j &gt;= 0; j--) prints in LIFO order.`],
        [`50 10 20 40`, `Not a possible order.`],
        [`Only 50`, `That is get(), which shows just the top.`]
      ], a: 1 },
    { q: `Pushing the characters of "DATA" one by one and then popping them all gives:`,
      o: [
        [`DATA`, `That would be FIFO.`],
        [`ATAD`, `Correct. LIFO reverses the string (checked with g++).`],
        [`ADAT`, `Pop order is the reverse of push order.`],
        [`TADA`, `Pop order is the reverse of push order.`]
      ], a: 1 },
    { q: `In the array stack, what does count() return when top = 6?`,
      o: [
        [`6`, `Indices 0..6 are 7 elements.`],
        [`5`, `Indices 0..6 are 7 elements.`],
        [`-1`, `-1 means the stack is empty.`],
        [`7`, `Correct. count() = top + 1.`]
      ], a: 3 },
    { q: `Why is TOP initialized to -1?`,
      o: [
        [`So that on push top is first incremented to 0 and the item is stored at index 0`, `Correct. This is the lecture's reason.`],
        [`Because C++ arrays start at -1`, `Arrays start at index 0.`],
        [`To mark the stack as full`, `Full is top == MAXSIZE-1.`],
        [`So that pop returns -1 the first time`, `pop returns -1 on underflow, but that is not why top starts at -1.`]
      ], a: 0 },
    { q: `Which real-life example from the lecture is NOT a stack?`,
      o: [
        [`Undo/redo in a text editor`, `This is a stack example.`],
        [`Browser back button history`, `This is a stack example.`],
        [`A line of people waiting to buy tickets`, `Correct. A ticket line is FIFO, a queue.`],
        [`A pile of books`, `This is a stack example.`]
      ], a: 2 },
    { q: `Which statement describes the static (array) implementation of a stack?`,
      o: [
        [`Very simple, but the size is fixed at design time and memory use is not efficient`, `Correct.`],
        [`Uses pointers and can grow without limit`, `That is the dynamic (linked) implementation.`],
        [`Allows insertion at both ends`, `A stack uses only the top.`],
        [`Never overflows`, `An array stack overflows when top == MAXSIZE-1.`]
      ], a: 0 },
    { q: `The stack holds 4, 9, 2 (2 on top). After pop(), pop(), push(6), what does get() display?`,
      o: [
        [`2`, `2 was popped first.`],
        [`9`, `9 was popped second.`],
        [`4`, `4 is now below 6.`],
        [`6`, `Correct. After two pops only 4 remains; pushing 6 makes it the top.`]
      ], a: 3 },
    { q: `In the lecture's search(), the slide writes <code>temp = temp--;</code>. What should it be?`,
      o: [
        [`temp++;`, `The search moves from top down to 0, so temp must decrease.`],
        [`temp--; (or temp = temp - 1;)`, `Correct. temp = temp--; does not reliably decrease temp, so it can loop forever.`],
        [`top--;`, `Searching must not change top.`],
        [`temp = top;`, `That restarts the search every time.`]
      ], a: 1 },
    { q: `Which lab application uses a stack to keep information about active functions?`,
      o: [
        [`Backtracking`, `Backtracking uses a stack to return along a maze path.`],
        [`String reversal`, `String reversal pushes and pops characters.`],
        [`Function call`, `Correct.`],
        [`Hashing`, `Hashing is not a stack application.`]
      ], a: 2 }
  ],
  3: [
    { q: `A linear queue of size 5: enqueue 1, 2, 3, 4, 5; dequeue twice; then enqueue(6). What happens?`,
      o: [
        [`6 is stored at index 0`, `A linear queue never wraps around.`],
        [`6 is stored at index 5`, `Index 5 is out of range for size 5.`],
        [`"Queue is full", because tail == maxsize-1 even though indices 0 and 1 are free`, `Correct. This is exactly the problem of the linear queue.`],
        [`"Queue Underflow"`, `Underflow is for dequeue on an empty queue.`]
      ], a: 2 },
    { q: `Same operations on a CIRCULAR queue of size 5 (enqueue 1..5, dequeue twice, enqueue 6). Where is 6 stored?`,
      o: [
        [`Index 0`, `Correct. rear = (4 + 1) % 5 = 0, a cell freed by dequeue.`],
        [`Index 5`, `Indices are 0..4.`],
        [`It is rejected as full`, `Two cells were freed, so the circular queue is not full.`],
        [`Index 2`, `front is at 2; rear wraps to 0.`]
      ], a: 0 },
    { q: `In the linear queue, which condition means the queue is empty?`,
      o: [
        [`head == tail`, `head == tail means exactly one element.`],
        [`head == -1 || head &gt; tail`, `Correct (lecture's isEmpty).`],
        [`tail == maxsize - 1`, `That is full.`],
        [`tail == -1 || tail &gt; head`, `Wrong variables.`]
      ], a: 1 },
    { q: `In the circular queue deQueue, what happens when front == rear before removal?`,
      o: [
        [`front = (front + 1) % MAX_SIZE`, `That is for the other elements.`],
        [`Nothing; the element is not removed`, `The element is removed.`],
        [`rear = front - 1`, `Not the lecture's rule.`],
        [`front and rear are both reset to -1`, `Correct. The last element was removed, so the queue becomes empty.`]
      ], a: 3 },
    { q: `Circular queue with MAX_SIZE = 4: front = 2, rear = 3. After enQueue(x), rear is:`,
      o: [
        [`4`, `Index 4 does not exist; it wraps.`],
        [`0`, `Correct. (3 + 1) % 4 = 0.`],
        [`3`, `rear must advance.`],
        [`1`, `Only one step is taken.`]
      ], a: 1 },
    { q: `In the slide's linear queue trace, the rear is at the last index but there is space at the front. This is called:`,
      o: [
        [`Stack overflow`, `It is a queue, and the queue is not really full.`],
        [`Underflow`, `There are elements in the queue.`],
        [`Non-usable empty space (memory wastage) of the linear queue`, `Correct. The circular queue solves it.`],
        [`Collision`, `Collision is a hashing term.`]
      ], a: 2 },
    { q: `Linear queue (maxsize 8): enqueue 4, 7, 9; dequeue; enqueue 3. What are head and tail?`,
      o: [
        [`head = 1, tail = 3`, `Correct. head moved from 0 to 1 after one dequeue; tail went 0, 1, 2, 3.`],
        [`head = 0, tail = 3`, `The dequeue moved head to 1.`],
        [`head = 1, tail = 2`, `The last enqueue moved tail to 3.`],
        [`head = 0, tail = 4`, `Only 4 enqueues happened (tail 0..3).`]
      ], a: 0 },
    { q: `Which is the standard single condition for a FULL circular queue?`,
      o: [
        [`rear == MAX_SIZE - 1`, `That alone is the linear queue condition.`],
        [`front == -1`, `That means empty.`],
        [`front == rear`, `That means one element.`],
        [`(rear + 1) % MAX_SIZE == front`, `Correct. It covers both lecture cases (front 0 / rear MAX-1, and rear just behind front).`]
      ], a: 3 },
    { q: `In the slide example, after two dequeues front is at 72 and rear at 24 (rear at the last cell). Inserting 100 is:`,
      o: [
        [`Possible in both queues`, `The linear queue's rear is at the end.`],
        [`Not possible in the linear queue but possible in the circular queue`, `Correct.`],
        [`Possible in the linear queue only`, `The reverse is true.`],
        [`Impossible in both queues`, `The circular queue wraps around.`]
      ], a: 1 },
    { q: `Queue holds (front) 8, 3, 5 (rear). What does the sequence dequeue(), enqueue(8), dequeue() return the second time?`,
      o: [
        [`8`, `8 was removed by the first dequeue; the re-inserted 8 is at the rear.`],
        [`5`, `5 is still behind 3.`],
        [`3`, `Correct. FIFO: first 8 leaves, then 3 is at the front.`],
        [`Nothing, the queue is empty`, `Elements remain.`]
      ], a: 2 }
  ],
  4: [
    { q: `<code>int a = 3, b = 7; int *p = &a, *q = &b; *p = *q + 1; q = p; *q = 2 * (*q);</code> What are a and b?`,
      o: [
        [`a = 8, b = 14`, `After q = p, q points to a, not b.`],
        [`a = 16, b = 7`, `Correct. *p = 7 + 1 sets a = 8; q now points to a; *q = 2 · 8 = 16. b is unchanged (checked with g++).`],
        [`a = 3, b = 16`, `a is changed through p.`],
        [`a = 8, b = 7`, `The last statement doubles a.`]
      ], a: 1 },
    { q: `Which expression gives the address of variable x?`,
      o: [
        [`*x`, `* dereferences a pointer.`],
        [`x*`, `Not a valid expression.`],
        [`&x`, `Correct.`],
        [`x->`, `-> accesses a member through a pointer.`]
      ], a: 2 },
    { q: `In fakeSwap(int a, int b), why are x and y unchanged in main?`,
      o: [
        [`Because a and b are copies stored at different addresses`, `Correct. Pass by value gives the function its own variables.`],
        [`Because tmp is not initialized`, `tmp is assigned before use.`],
        [`Because the function has no return statement`, `Returning would not change x and y either.`],
        [`Because x and y are constants`, `They are ordinary ints.`]
      ], a: 0 },
    { q: `Which call correctly uses trueSwap(int* a, int* b)?`,
      o: [
        [`trueSwap(x, y);`, `It needs addresses, not values.`],
        [`trueSwap(*x, *y);`, `x and y are not pointers.`],
        [`trueSwap(&x, y);`, `Both arguments must be addresses.`],
        [`trueSwap(&x, &y);`, `Correct.`]
      ], a: 3 },
    { q: `In the lab program, <code>cout &lt;&lt; ptr;</code> prints:`,
      o: [
        [`The value of x (5)`, `That is *ptr.`],
        [`The address of x`, `Correct. ptr holds &x.`],
        [`The address of ptr`, `That is &ptr.`],
        [`24`, `24 is assigned later through *ptr.`]
      ], a: 1 },
    { q: `What is the main difference between <code>int arr[10];</code> and <code>arr = new int[size];</code>?`,
      o: [
        [`The first is faster to index`, `Both are indexed the same way.`],
        [`Only the second can store ints`, `Both store ints.`],
        [`The first's size must be a constant at design time; the second's size can be any value at run time`, `Correct (Lab 3).`],
        [`The second cannot be freed`, `It is freed with delete[].`]
      ], a: 2 },
    { q: `Which memory segment holds local/temporary variables?`,
      o: [
        [`Stack segment`, `Correct.`],
        [`Heap segment`, `The heap holds dynamic allocations.`],
        [`Code segment`, `The code segment holds machine code.`],
        [`Register segment`, `Not one of the three segments.`]
      ], a: 0 },
    { q: `<code>struct P { int w; }; P item; P *ptr = &item;</code> Which statement sets w to 5 through ptr?`,
      o: [
        [`ptr.w = 5;`, `ptr is a pointer; the dot needs an object.`],
        [`*ptr.w = 5;`, `This parses as *(ptr.w).`],
        [`&ptr->w = 5;`, `& takes an address; not assignable.`],
        [`ptr->w = 5;`, `Correct. Equivalent to (*ptr).w = 5.`]
      ], a: 3 },
    { q: `A pointer variable is:`,
      o: [
        [`A variable whose content is a memory address`, `Correct (lab definition).`],
        [`A variable that always holds an int value`, `It holds an address of some type.`],
        [`A function that returns an address`, `It is a variable, not a function.`],
        [`An array of addresses`, `A single pointer holds one address.`]
      ], a: 0 },
    { q: `In the swap slides, x is at 0x2000 and y at 0x2010. Inside trueSwap(&x, &y), what does parameter a hold?`,
      o: [
        [`1`, `1 is the value of x, which is *a.`],
        [`0x2038`, `0x2038 is where a itself is stored.`],
        [`0x2000, the address of x`, `Correct.`],
        [`0x2010`, `That is the address of y, held by b.`]
      ], a: 2 }
  ],
  5: [
    { q: `Starting from an empty list: insertatbeginning(3); insertatbeginning(7); insertatend(9); deletefrombeginning(). The list is:`,
      o: [
        [`7 3`, `9 was added at the end and 7 was deleted from the beginning.`],
        [`3 9`, `Correct. 3 → 7,3 → 7,3,9 → delete 7 → 3,9.`],
        [`7 3 9`, `deletefrombeginning removes 7.`],
        [`3 7 9`, `insertatbeginning(7) puts 7 before 3.`]
      ], a: 1 },
    { q: `What happens if the lecture's insertatend is called on an EMPTY list?`,
      o: [
        [`It inserts the first node normally`, `temp1 = head is NULL, so temp1->next crashes.`],
        [`It returns false`, `It is a void function.`],
        [`It crashes because temp1 is NULL when temp1->next is read`, `Correct. Add an isEmpty() check that sets head = newnode.`],
        [`It inserts at the beginning`, `There is no such branch.`]
      ], a: 2 },
    { q: `To insert newnode after node current, which order is correct?`,
      o: [
        [`current->next = newnode; newnode->next = current->next;`, `newnode->next would point to itself and the rest of the list is lost.`],
        [`newnode->next = current; current->next = newnode;`, `This makes a loop between the two nodes.`],
        [`newnode->next = current->next; current->next = newnode;`, `Correct. Link the new node to the following node first.`],
        [`head = newnode; newnode->next = current;`, `That is not an insertion after current.`]
      ], a: 2 },
    { q: `Why does isFull() of a linked list create a new node?`,
      o: [
        [`To test whether memory can still be allocated; the list is full only if new returns NULL`, `Correct.`],
        [`To count the nodes`, `count() does that.`],
        [`To insert a dummy node`, `It is not inserted.`],
        [`Because the list has a fixed size`, `Linked lists have no fixed size.`]
      ], a: 0 },
    { q: `In deleteitem, temp2 and temp1 are used as:`,
      o: [
        [`head and tail`, `They are moving pointers.`],
        [`previous node and current node`, `Correct. temp2 trails one node behind temp1 so it can be relinked.`],
        [`old and new values`, `That is update().`],
        [`two different lists`, `There is one list.`]
      ], a: 1 },
    { q: `update(4, 10) on the list 2 → 4 → 6 → 4 changes the list to:`,
      o: [
        [`2 → 10 → 6 → 10`, `update returns true after the first match.`],
        [`2 → 4 → 6 → 10`, `It changes the first match, not the last.`],
        [`10 → 4 → 6 → 4`, `2 is not equal to 4.`],
        [`2 → 10 → 6 → 4`, `Correct. Only the first node with 4 is updated.`]
      ], a: 3 },
    { q: `Which is NOT an advantage of linked lists?`,
      o: [
        [`Dynamic size`, `This is an advantage.`],
        [`Direct access to any element by index`, `Correct. Linked lists have linear access; this is an array advantage.`],
        [`Efficient insertion and deletion`, `This is an advantage.`],
        [`No need for a contiguous block of memory`, `This is the flexibility advantage.`]
      ], a: 1 },
    { q: `In deletefromend, which node does temp2 point to when the loop ends?`,
      o: [
        [`The head`, `Only if the list has two nodes.`],
        [`The last node`, `temp1 points to the last node.`],
        [`NULL always`, `It is NULL only for a one-node list.`],
        [`The node before the last node`, `Correct. Then temp2->next = NULL makes it the new last node.`]
      ], a: 3 },
    { q: `Lab 5 InsertAt(item, pos) with list 5 → 10 → 30 and InsertAt(20, 3) gives:`,
      o: [
        [`5 → 10 → 20 → 30`, `Correct. p moves to position 2 (node 10), then 20 is linked after it.`],
        [`5 → 20 → 10 → 30`, `That is InsertAt(20, 2).`],
        [`20 → 5 → 10 → 30`, `That is position 1.`],
        [`5 → 10 → 30 → 20`, `That is position 4.`]
      ], a: 0 },
    { q: `How does search(item) end when the item is not in the list?`,
      o: [
        [`It crashes at the last node`, `The loop checks temp != NULL.`],
        [`It returns true`, `It returns false.`],
        [`It returns false after temp becomes NULL`, `Correct.`],
        [`It returns the last node`, `It returns a bool.`]
      ], a: 2 }
  ],
  6: [
    { q: `Linked stack: push(1), push(2), push(3), pop(), push(4). display() prints:`,
      o: [
        [`1 2 4`, `display starts at top.`],
        [`4 2 1`, `Correct. 3 was popped; 4 is the new top.`],
        [`4 3 2 1`, `3 was removed.`],
        [`3 2 1 4`, `4 was pushed last, so it is on top.`]
      ], a: 1 },
    { q: `What does the lecture's pop() return when the linked stack is empty?`,
      o: [
        [`-1`, `The array stack returns -1; the linked stack returns 0.`],
        [`NULL`, `It returns an int.`],
        [`0 after printing "Empty"`, `Correct.`],
        [`The last popped value`, `No value is kept.`]
      ], a: 2 },
    { q: `In the push steps, what is set when the stack is empty (step 3)?`,
      o: [
        [`newNode->next = NULL`, `Correct. Then top = newNode.`],
        [`newNode->next = top->next`, `top is NULL; this would crash.`],
        [`top->next = newNode`, `top is NULL.`],
        [`top = NULL`, `top becomes newNode.`]
      ], a: 0 },
    { q: `Linked stack: push(10), push(20), push(30). What does count() return after pop()?`,
      o: [
        [`3`, `One node was removed.`],
        [`1`, `Two nodes remain.`],
        [`0`, `Two nodes remain.`],
        [`2`, `Correct.`]
      ], a: 3 },
    { q: `search(25) on the linked stack 99 → 50 → 32 → 25 → NULL visits how many nodes?`,
      o: [
        [`1`, `25 is the bottom node.`],
        [`4`, `Correct. It starts at top (99) and finds 25 at the 4th node.`],
        [`3`, `25 is the 4th node.`],
        [`5`, `There are only four nodes.`]
      ], a: 1 },
    { q: `Which statement about the linked stack in the lecture is true?`,
      o: [
        [`It needs MAXSIZE to be declared first`, `It has no fixed size.`],
        [`New nodes are added at the end of the list`, `They are added at the top (beginning).`],
        [`Every newly inserted element is pointed to by top`, `Correct.`],
        [`It uses front and rear pointers`, `Those belong to a queue.`]
      ], a: 2 },
    { q: `Which code removes all the items of a linked stack?`,
      o: [
        [`top = NULL;`, `This loses the nodes without freeing them (memory leak).`],
        [`while (top != NULL) { Node *t = top; top = top->next; delete t; }`, `Correct.`],
        [`delete top;`, `Only one node is freed and top dangles.`],
        [`while (top != NULL) top = top->next;`, `Nodes are skipped but never freed.`]
      ], a: 1 },
    { q: `What does get() do in a linked stack?`,
      o: [
        [`Removes and returns the top`, `That is pop().`],
        [`Returns the bottom element`, `It returns the top.`],
        [`Returns the number of nodes`, `That is count().`],
        [`Returns the top element without removing it`, `Correct.`]
      ], a: 3 },
    { q: `In Lab 7, push(item) is described as:`,
      o: [
        [`Insert to beginning`, `Correct. The new node becomes the first node (top).`],
        [`Insert to end`, `That is a queue enqueue.`],
        [`Insert in order`, `A stack does not sort.`],
        [`Insert at position 2`, `Push always inserts at the top.`]
      ], a: 0 },
    { q: `Elements are pushed in the order 25, 32, 50, 99. Which node's next is NULL?`,
      o: [
        [`99`, `99 is the top; it points to 50.`],
        [`50`, `50 points to 32.`],
        [`25`, `Correct. The first pushed node is at the bottom and points to NULL.`],
        [`32`, `32 points to 25.`]
      ], a: 2 }
  ],
  7: [
    { q: `Linked queue: enqueue 5, 6, 7; dequeue; enqueue 8. What do count() and get() return?`,
      o: [
        [`3 and 6`, `Correct. Queue is 6, 7, 8; front is 6.`],
        [`4 and 5`, `5 was dequeued.`],
        [`3 and 8`, `get() returns the front, not the rear.`],
        [`2 and 7`, `Three nodes remain.`]
      ], a: 0 },
    { q: `In enqueue, why is newnode->next set to NULL?`,
      o: [
        [`Because it becomes the first node`, `It becomes the last node.`],
        [`Because the new node becomes the last node of the list`, `Correct.`],
        [`To delete the old rear`, `Nothing is deleted.`],
        [`It is optional`, `Without it the list may have a garbage link.`]
      ], a: 1 },
    { q: `When the queue is empty, enqueue sets:`,
      o: [
        [`rear->next = newnode`, `rear is NULL.`],
        [`front = NULL and rear = newnode`, `front must also point to the new node.`],
        [`front = newnode and rear = newnode`, `Correct.`],
        [`top = newnode`, `There is no top in a queue.`]
      ], a: 2 },
    { q: `Which display order is produced by a linked queue holding 10, 15, 22, 50 (inserted in that order)?`,
      o: [
        [`50 22 15 10`, `That is the stack order.`],
        [`10 50 15 22`, `Not a possible order.`],
        [`22 50 10 15`, `Not a possible order.`],
        [`10 15 22 50`, `Correct. Display goes from front to rear.`]
      ], a: 3 },
    { q: `Which step list describes dequeue correctly?`,
      o: [
        [`Check empty; temp = rear; rear = rear->next; delete temp`, `Deletion is from the front.`],
        [`Check empty; temp = front; front = front->next; delete temp`, `Correct (lecture steps).`],
        [`Check full; temp = front; delete front`, `Dequeue checks empty, and front must move first.`],
        [`temp = front; delete temp; front = front->next`, `front->next would be read from freed memory.`]
      ], a: 1 },
    { q: `What is the main advantage of the linked queue over the array queue?`,
      o: [
        [`It works for an unlimited (variable) number of values`, `Correct.`],
        [`It is LIFO`, `Both are FIFO.`],
        [`It needs no pointers`, `It needs front and rear.`],
        [`It allows direct index access`, `Linked structures have linear access.`]
      ], a: 0 },
    { q: `Lab 7's dequeue handles a queue with only one item by:`,
      o: [
        [`Deleting rear only`, `Both pointers must be reset.`],
        [`Moving rear back one node`, `A singly linked list cannot move backward.`],
        [`Printing the item and setting front = rear = NULL`, `Correct.`],
        [`Calling enqueue`, `Not related.`]
      ], a: 2 },
    { q: `Linked queue: enqueue 1, 2; dequeue; dequeue; enqueue 3 (using the safe dequeue that resets rear). The queue is:`,
      o: [
        [`1 2 3`, `1 and 2 were dequeued.`],
        [`2 3`, `2 was also dequeued.`],
        [`Empty`, `3 was enqueued after.`],
        [`3`, `Correct. After two dequeues the queue is empty (front = rear = NULL); 3 becomes the only node.`]
      ], a: 3 },
    { q: `Where does a linked queue insert and where does it delete, in list terms?`,
      o: [
        [`Insert at the end, delete from the beginning`, `Correct.`],
        [`Insert at the beginning, delete from the beginning`, `That is a linked stack.`],
        [`Insert at the beginning, delete from the end`, `That would still be FIFO but is not the lecture's design (deleting the end needs a traversal).`],
        [`Insert in order, delete anywhere`, `That is a sorted list.`]
      ], a: 0 },
    { q: `How many nodes does search(22) visit in the queue 10 → 15 → 22 → 50?`,
      o: [
        [`1`, `22 is not the front.`],
        [`4`, `It stops when 22 is found.`],
        [`3`, `Correct. 10, 15, then 22.`],
        [`2`, `22 is the third node.`]
      ], a: 2 }
  ],
  8: [
    { q: `Lab 8 main: insertFirst(10), insertLast(20), insertLast(30), insertFirst(100), insertFirst(200), removeFirst(), removeLast(). The list is:`,
      o: [
        [`200 100 10 20`, `removeFirst removed 200.`],
        [`100 10 20`, `Correct. 200 100 10 20 30 → remove first → 100 10 20 30 → remove last → 100 10 20.`],
        [`100 10 20 30`, `removeLast removed 30.`],
        [`10 20 30`, `100 is still in the list.`]
      ], a: 1 },
    { q: `Continuing Lab 8: insertAtPosition(1000, 2), insertAtPosition(2000, 4), insertAtPosition(5, 1). displayBackward prints:`,
      o: [
        [`5 100 1000 10 2000 20`, `That is displayForward.`],
        [`20 10 2000 1000 100 5`, `2000 is after 10 in the forward list.`],
        [`20 2000 10 1000 100 5`, `Correct. Forward is 5 100 1000 10 2000 20 (run with g++, current initialized to 1).`],
        [`20 2000 1000 10 100 5`, `1000 comes right after 100.`]
      ], a: 2 },
    { q: `Which statement must be added when deleting the first node of a doubly linked list (with more than one node)?`,
      o: [
        [`head->next = NULL;`, `This would cut the list.`],
        [`tail = head;`, `tail does not change.`],
        [`head->prev = head;`, `prev of the first node must be NULL.`],
        [`head->prev = NULL; after head = head->next;`, `Correct. The new first node must not point back to the deleted node.`]
      ], a: 3 },
    { q: `What goes wrong in the lecture's deletefrombeginning if the list has only one node?`,
      o: [
        [`head becomes NULL and head->prev = NULL crashes`, `Correct. Check head != NULL before setting prev.`],
        [`Nothing`, `head->prev is read through a NULL pointer.`],
        [`It deletes two nodes`, `Only one node exists.`],
        [`It returns the wrong value`, `The value is read before the crash.`]
      ], a: 0 },
    { q: `A doubly linked list node uses more memory than a singly linked node because:`,
      o: [
        [`It stores the data twice`, `Data is stored once.`],
        [`It has an extra prev pointer`, `Correct.`],
        [`It is always allocated as an array`, `Nodes are allocated one at a time.`],
        [`It stores the head inside each node`, `Only next and prev are stored.`]
      ], a: 1 },
    { q: `Insert 15 between nodes 10 (temp) and 20 in a doubly list. Which statement is part of the correct linking?`,
      o: [
        [`newnode->prev = temp->next;`, `prev must be temp (10).`],
        [`temp->prev = newnode;`, `10's prev does not change.`],
        [`temp->next->prev = newnode;`, `Correct. 20 must point back to 15.`],
        [`newnode->next = temp;`, `next must be 20.`]
      ], a: 2 },
    { q: `What does insertatend set as the new node's prev?`,
      o: [
        [`NULL`, `Only the first node has prev NULL.`],
        [`head`, `Only if the list had one node.`],
        [`newnode itself`, `A node does not point to itself.`],
        [`The old last node (temp1)`, `Correct. newnode->prev = temp1.`]
      ], a: 3 },
    { q: `Lab 8 removeLast() uses which statements?`,
      o: [
        [`delnode = tail; tail->prev->next = NULL; tail = tail->prev; delete delnode;`, `Correct.`],
        [`tail = NULL; delete tail;`, `This loses the list end.`],
        [`head = head->next; delete head;`, `That is about the first node.`],
        [`tail->next = NULL; delete tail;`, `tail->next is already NULL; the previous node must be updated.`]
      ], a: 0 },
    { q: `Forward display of a doubly list gives 3 6 9. What is head->next->prev->data?`,
      o: [
        [`6`, `head->next is 6, and its prev is 3.`],
        [`3`, `Correct. Going forward then back returns to the head (3).`],
        [`9`, `9 is the last node.`],
        [`NULL`, `6 has a prev node.`]
      ], a: 1 },
    { q: `How many pointer fields change when inserting a node in the middle of a doubly linked list (counting the new node's two fields)?`,
      o: [
        [`1`, `More links are involved.`],
        [`2`, `That is the singly-list case.`],
        [`4`, `Correct. newnode->next, newnode->prev, previous->next and following->prev.`],
        [`6`, `Only four links change.`]
      ], a: 2 }
  ],
  9: [
    { q: `Insert 30, 20, 40, 10, 25, 35, 50 into an empty BST. The preorder traversal is:`,
      o: [
        [`10 20 25 30 35 40 50`, `That is inorder.`],
        [`30 20 10 25 40 35 50`, `Correct. Root, left subtree (20, 10, 25), right subtree (40, 35, 50).`],
        [`10 25 20 35 50 40 30`, `That is postorder.`],
        [`30 20 40 10 25 35 50`, `That is level order.`]
      ], a: 1 },
    { q: `For the same BST (30, 20, 40, 10, 25, 35, 50), the postorder traversal is:`,
      o: [
        [`10 25 20 35 50 40 30`, `Correct. Left, right, then root; 30 is last.`],
        [`30 40 50 35 20 25 10`, `That is a reversed preorder variant.`],
        [`10 20 25 30 35 40 50`, `That is inorder.`],
        [`25 10 20 50 35 40 30`, `Within a subtree the left child is listed before the right.`]
      ], a: 0 },
    { q: `Inserting 1, 2, 3, 4, 5 in this order into an empty BST gives:`,
      o: [
        [`A balanced tree with root 3`, `The root is the first inserted key, 1.`],
        [`A tree where every node has two children`, `Each node only gets a right child.`],
        [`An error, because keys must be inserted unsorted`, `Sorted insertion is allowed.`],
        [`A degenerate tree where each node has only a right child (like a linked list)`, `Correct.`]
      ], a: 3 },
    { q: `In the lecture tree 43; 31(20, 40); 64(56, 89) with leaves 28, 33, 47, 59, what does maximum(root) return?`,
      o: [
        [`64`, `64 has a right child, 89.`],
        [`59`, `59 is in the left subtree of 64.`],
        [`89`, `Correct. The rightmost node.`],
        [`43`, `43 is the root.`]
      ], a: 2 },
    { q: `Search for 0.5 in the tree with root 1.0 (left 0.6, whose left is 0.3 with right child 0.4). The search:`,
      o: [
        [`Finds 0.5 at the root`, `The root is 1.0.`],
        [`Goes 1.0 → 0.6 → 0.3 → 0.4 → NULL and returns false`, `Correct (lecture example).`],
        [`Goes 1.0 → 1.9 and stops`, `0.5 &lt; 1.0, so it goes left.`],
        [`Goes 1.0 → 0.6 → 0.8 and returns false`, `0.5 &lt; 0.6, so it goes left to 0.3.`]
      ], a: 1 },
    { q: `In the recursive insert, what happens when temp is NULL?`,
      o: [
        [`A new node is created with the item and returned`, `Correct. The caller links it as a left or right child.`],
        [`The function returns false`, `insert returns a Node pointer.`],
        [`The item is ignored`, `NULL is where the new leaf belongs.`],
        [`The root is deleted`, `Nothing is deleted.`]
      ], a: 0 },
    { q: `Why does the slide's search need <code>return</code> before the recursive calls?`,
      o: [
        [`To make it faster`, `It is about correctness.`],
        [`Because recursion is not allowed without it`, `Recursion works, but the result is lost.`],
        [`Without it the result of the recursive call is discarded and the function may return garbage`, `Correct.`],
        [`To print the result`, `return does not print.`]
      ], a: 2 },
    { q: `Which traversal visits the root first?`,
      o: [
        [`Inorder`, `Inorder visits the left subtree first.`],
        [`Postorder`, `Postorder visits the root last.`],
        [`Reverse inorder`, `It visits the right subtree first.`],
        [`Preorder`, `Correct. Parent, left, right.`]
      ], a: 3 },
    { q: `Deleting a node with TWO children in a BST is usually done by:`,
      o: [
        [`Deleting the whole subtree`, `That would lose other keys.`],
        [`Replacing its key with the inorder successor (minimum of the right subtree) and deleting that node`, `Correct.`],
        [`Setting the parent's link to NULL`, `That only works for a leaf.`],
        [`Swapping it with the root`, `That breaks the BST property.`]
      ], a: 1 },
    { q: `How many leaves does the BST built from 50, 25, 65, 12, 33, 70, 55, 60, 53 have?`,
      o: [
        [`3`, `Count again: 12, 33, 53, 60, 70.`],
        [`4`, `70 is also a leaf.`],
        [`5`, `Correct. 12, 33, 53, 60 and 70 have no children.`],
        [`9`, `9 is the total number of nodes.`]
      ], a: 2 }
  ],
  10: [
    { q: `Using the truncation method with a table of size 100 (rightmost digits), key 123456 maps to:`,
      o: [
        [`12`, `That uses the leftmost digits.`],
        [`56`, `Correct. Size 100 needs 2 digits: the last two are 56.`],
        [`456`, `Three digits are for a table of size 1000.`],
        [`34`, `Those are middle digits.`]
      ], a: 1 },
    { q: `Folding key 123456789 into groups of 3 digits gives:`,
      o: [
        [`1368`, `Correct. 123 + 456 + 789 = 1368.`],
        [`1888`, `That is the lecture's result for 143765980.`],
        [`579`, `That adds only two groups.`],
        [`369`, `That adds the last digits only.`]
      ], a: 0 },
    { q: `Mid square for key 345 (345² = 119025), taking the middle 2 digits:`,
      o: [
        [`11`, `Those are the first two digits.`],
        [`25`, `Those are the last two digits.`],
        [`19`, `Not the middle of 119025.`],
        [`90`, `Correct. 11|90|25: the middle two digits are 90.`]
      ], a: 3 },
    { q: `Keys 10, 17, 24 into a table of size 7 using the lecture's quadratic probing h(k,i) = (k mod 7 + i + i²) mod 7. Where does 24 go?`,
      o: [
        [`3`, `3 holds 10.`],
        [`5`, `5 holds 17 (3 + 1 + 1).`],
        [`2`, `Correct. i=0 → 3 taken, i=1 → 5 taken, i=2 → (3 + 2 + 4) mod 7 = 2.`],
        [`4`, `That is linear probing's second try for 17.`]
      ], a: 2 },
    { q: `Double hashing with h1 = k mod 13 and h2 = 1 + (k mod 11): slot 1 is occupied by 27. Where does 40 go?`,
      o: [
        [`1`, `40 mod 13 = 1 is taken.`],
        [`2`, `That is linear probing.`],
        [`8`, `8 is the step size h2, not the slot.`],
        [`9`, `Correct. h2 = 1 + 40 mod 11 = 8; (1 + 1·8) mod 13 = 9.`]
      ], a: 3 },
    { q: `Which collision method needs no prior knowledge of how many elements will be stored?`,
      o: [
        [`Separate chaining`, `Correct. Chains grow without limit.`],
        [`Linear probing`, `The table can fill up.`],
        [`Quadratic probing`, `The table can fill up.`],
        [`Double hashing`, `The table can fill up.`]
      ], a: 0 },
    { q: `Why does the truncation method cause more collisions?`,
      o: [
        [`Because it squares the key`, `That is mid square.`],
        [`Because it uses only part of the key, so keys sharing those digits collide`, `Correct (lecture).`],
        [`Because it uses a prime number`, `Primes reduce collisions.`],
        [`Because it adds digit groups`, `That is folding.`]
      ], a: 1 },
    { q: `Keys 7, 14, 21 in a table of size 7 with linear probing. Final positions?`,
      o: [
        [`0, 1, 2`, `Correct. All hash to 0; 14 moves to 1, 21 moves to 2.`],
        [`0, 0, 0`, `Open addressing stores one key per cell.`],
        [`7, 14, 21`, `Indices only go to 6.`],
        [`0, 2, 4`, `Linear probing steps by 1.`]
      ], a: 0 },
    { q: `To search for a key with linear probing, you:`,
      o: [
        [`Check only the hash address`, `The key may have been moved by a collision.`],
        [`Search the whole table from index 0`, `You start at the hash address.`],
        [`Start at the hash address and continue linearly until found or an empty cell`, `Correct.`],
        [`Use a second hash function`, `That is double hashing.`]
      ], a: 2 },
    { q: `Which is NOT one of the five collision resolution techniques listed in the lecture?`,
      o: [
        [`Rehashing`, `It is listed.`],
        [`Extendible hashing`, `It is listed.`],
        [`Double hashing`, `It is listed.`],
        [`Mid square`, `Correct. Mid square is a hash function, not a collision resolution technique.`]
      ], a: 3 }
  ]
};

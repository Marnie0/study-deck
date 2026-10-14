window.COURSES = window.COURSES || {};
COURSES.ds = {
  id: `ds`,
  name: `Data Structures`,
  short: `DS`,
  code: `CS201`,
  by: `Prof. Lamiaa Hassaan, Dr. Ahmed Ibrahim`,
  lectures: [
    /* ───────────────────────── LECTURE 1 ───────────────────────── */
    {
      n: 1, title: `Introduction, Arrays and Structs`,
      notes: [
        { h: `Data, data types and data structures`, pts: [
          `<b>Data</b>: a collection of facts from which a conclusion may be drawn. <i>Data: temperature 35°C; conclusion: it is hot.</i> Types of data: <b>textual</b> (your name), <b>numeric</b> (your ID), <b>audio</b> (your voice), <b>video</b> (your voice and picture).`,
          `Programs <b>read</b> data, <b>store</b> it temporarily, <b>process</b> it and finally <b>output</b> results.`,
          `<b>Data types</b> (also called <b>atomic</b> data types) have <b>no component parts</b>, e.g. <code>int</code>, <code>char</code>, <code>float</code>. A data type is <b>(i) a domain of allowed values</b> and <b>(ii) a set of operations</b> on these values. The compiler signals an error if a wrong operation is performed, e.g. <code>char x,y,z; z=x*y;</code> is not allowed.`,
          `Examples: <b>boolean</b>: domain 0,1, operations and, or, =. <b>char</b>: domain ASCII, operations =, &lt;&gt;, &lt;. <b>integer</b>: domain -maxint to +maxint, operations +, -, =, ==, &lt;&gt;, &lt;.`,
          `<b>Data structure</b>: a particular way of <b>storing and organizing data</b> in a computer so that it can be used <b>efficiently and effectively</b>. It is the <b>logical or mathematical model</b> of a particular organization of data, a group of data elements grouped together under one name (e.g. an array). Data structures make code cleaner and easier to understand.`,
          `<b>The need for data structures</b>: Goal: to organize data. Criteria: to facilitate efficient <b>storage</b>, <b>retrieval</b> and <b>manipulation</b> of data. Design issue: select and design appropriate data types (the main motivation to learn data structures).`
        ]},
        { h: `Classification of data structures (lecture + Lab 1)`, table: [
          [`Class`, `Meaning`, `Examples`],
          [`Primitive`, `Basic built-in types`, `int, float, char (and pointers)`],
          [`Non-primitive, linear, static`, `Elements in a sequence, size fixed at design time`, `Arrays`],
          [`Non-primitive, linear, dynamic`, `Elements in a sequence, size can change`, `Stack, Queue, Linked list`],
          [`Non-primitive, non-linear`, `Elements are not in a single sequence (hierarchy / network)`, `Trees, Graphs`]
        ]},
        { h: `Operations and Abstract Data Types (ADT)`, pts: [
          `<b>Navigating</b> (traversing): accessing each data element <b>exactly once</b> so that certain items may be processed.`,
          `<b>Searching</b>: finding the location of the data element (<b>key</b>) in the structure. <b>Insertion</b>: adding a new element. <b>Deletion</b>: removing an element.`,
          `<b>Sorting</b>: arranging elements in a logical order (ascending/descending). <b>Merging</b>: combining elements from two or more data structures into one.`,
          `<b>ADT</b>: an <b>abstraction of a data structure</b> which provides <b>only the interface</b> to which a data structure must adhere. The interface gives no details about how it is implemented or in which programming language (it lets us think abstractly about the data).`,
          `ADTs are <b>purely theoretical entities</b>: used to simplify the description of abstract algorithms and to classify and evaluate data structures. An ADT is a collection of data and a set of operations on this data.`,
          `ADT → implementation examples: <b>List</b> → dynamic array, linked list. <b>Queue</b> → linked-list based queue, array based queue. <b>Map</b> → tree map, hash map / hash table. Analogy: <b>Vehicle</b> (ADT) → golf car, bicycle, smart car (implementations).`
        ]},
        { h: `Arrays (lecture + Lab 1)`, pts: [
          `An <b>array</b> is a data structure used to process multiple elements with the <b>same data type</b> when the number of elements is known; a group of elements of the same type stored in <b>consecutive memory locations</b>.`,
          `An element is located with a mathematical formula: <b>location(i) = i - 1</b>, i.e. the i-th element of the list is in position i-1 of the array (index is <b>zero-based</b>: 0 to size-1).`,
          `Syntax: <code>dataType arrayName[arraySize];</code> The size must be an <b>integer constant greater than zero</b> and must be pre-specified. The subscript (index) must be an integer.`,
          `Ways to put data in: <code>int arr[5]={10,20,30,40,50};</code> (all), <code>char arr[5]={'a','b','c'};</code> (first 3 only), <code>arr[0]=10;</code> (specific index), <code>cin&gt;&gt;arr[2];</code> (at run time).`,
          `C++ passes <b>whole arrays by reference</b> to functions, but <b>individual elements are passed by value</b> like simple variables.`,
          `Size in memory = number of elements × size of type, e.g. <code>int arr[15]</code> with 4-byte int = <b>60 bytes</b>.`,
          `Advantage: easy to store elements of the same type, direct access by index. <b>Disadvantage: fixed size</b> (declared at design time, cannot grow).`
        ]},
        { h: `Array insert and delete (professor's code)`, code: `// Delete the k'th element if it exists.
{
   if (Find(k, x)) {
      for (int i = k; i < length; i++)
         element[i-1] = element[i];   // shift left
      length--;
   }
}

// Insert x after the k'th element.
{
   if (k < 0 || k > length) throw OutOfBounds();
   if (length == MaxSize) throw NoMem();
   for (int i = length-1; i >= k; i--)
      element[i+1] = element[i];      // shift right
   element[k] = x;
   length++;
}` },
        { h: `Array operations: sum, average, sort`, code: `// Sum  (output is 12206)
int billy[] = {16, 2, 77, 40, 12071};
int n, result = 0;
int main() {
   for (n = 0; n < 5; n++) result += billy[n];
   cout << result;
   return 0;
}

// Average (prints average = 10)
const int size = 3;
int nums[size] = {5, 10, 15};
double average = 0;
for (int i = 0; i < size; ++i) average += nums[i];
cout << "average = " << average / size;

// Sort (descending, because of billy[n] < billy[m])
int billy[5] = {16, 2, 77, 40, 12};
for (n = 0; n < 4; n++)
   for (m = n+1; m < 5; m++)
      if (billy[n] < billy[m])
      { temp = billy[n]; billy[n] = billy[m]; billy[m] = temp; }
for (m = 0; m < 5; m++) cout << billy[m] << "\\n";   // 77 40 16 12 2` },
        { h: `2D arrays and matrices`, pts: [
          `Tabular data (e.g. a <b>matrix</b>) is represented as a 2-dimensional array: <code>int a[3][4];</code> has 3 rows (0..2) and 4 columns (0..3), elements a[0][0] .. a[2][3].`,
          `Matrices are normally indexed from <b>1</b>, and support add, multiply and transpose, which are <b>not</b> supported directly by C++'s 2D array.`,
          `<b>Locating x[i][j]</b> (row-major): if x has r rows and c columns, each row has c elements, there are i rows before row i, so <b>i·c</b> elements before x[i][0]; x[i][j] maps to position <b>i·c + j</b> of the 1D array.`,
          `<b>Transpose</b>: an m×n matrix becomes n×m with M<sup>T</sup>(j,i) = M(i,j).`,
          `<b>Addition</b>: only for matrices of the <b>same dimensions</b>: C(i,j) = A(i,j) + B(i,j).`,
          `<b>Multiplication</b>: only defined when <b>columns of A = rows of B</b>. A (m×n) × B (n×q) = C (m×q) with C(i,j) = Σ<sub>k=1..n</sub> A(i,k)·B(k,j).`
        ]},
        { h: `Matrix multiplication (professor's code, core)`, code: `int a[10][10], b[10][10], mult[10][10], r1, c1, r2, c2, i, j, k;
do {
   cout << "column of first matrix must equal rows of second.";
   cin >> r1 >> c1;          // rows, columns of first
   cin >> r2 >> c2;          // rows, columns of second
} while (c1 != r2);
// ... read a and b ...
for (i = 0; i < r1; ++i)
   for (j = 0; j < c2; ++j) {
      mult[i][j] = 0;
      for (k = 0; k < c1; ++k)
         mult[i][j] += a[i][k] * b[k][j];
   }

// Matrix summation (global result c)
void Sum(int a[][cols], int b[][cols])
{ for (int i = 0; i < rows; i++)
     for (int j = 0; j < cols; j++)
        c[i][j] = a[i][j] + b[i][j]; }` },
        { h: `Structs`, pts: [
          `A <b>struct</b> is a data structure containing a group of data elements grouped together under one name. These elements, called <b>members</b>, can have <b>different types and different lengths</b>. Structs are also known as <b>records</b> and members as <b>fields</b>.`,
          `Unlike arrays (same type), structs are <b>user-defined</b> types that store items of <b>non-similar</b> data types.`,
          `Two ways to create objects: (1) after the closing brace: <code>struct product { int weight; float price; } apple, banana, melon;</code> (2) separately: <code>product apple; product banana, melon;</code>. Members are accessed with the dot: <code>apple.weight</code>, <code>apple.price</code>.`,
          `<b>Array of structs</b>: <code>struct StudentRec { string name; int mark; } Student[2];</code> then <code>Student[i].name</code>, <code>Student[i].mark</code>.`,
          `<b>Passing a struct to a function</b>: <code>void printInfo(Employee emp) { cout&lt;&lt;emp.id; cout&lt;&lt;emp.salary; }</code> called as <code>Employee e1 = {1, 1000}; printInfo(e1);</code> (passed by value, a copy).`,
          `This is a favourite final-exam question: "Using an <b>array of struct</b> write a program to take a table from the user and calculate totals/averages" (see the past papers).`
        ]},
        { h: `Array of struct example (exam pattern)`, code: `#include <iostream>
#include <string>
using namespace std;
struct Employee {
    string name;
    float salary, bonus, deduction, total;
};
int main()
{
    const int N = 4;
    Employee e[N];
    for (int i = 0; i < N; i++)
    {
        cout << "Enter name, salary, bonus, deduction: ";
        cin >> e[i].name >> e[i].salary >> e[i].bonus >> e[i].deduction;
        e[i].total = e[i].salary + e[i].bonus - e[i].deduction;
    }
    for (int i = 0; i < N; i++)
        cout << e[i].name << " total salary = " << e[i].total << endl;
    return 0;
}
// Note: the lectures use Visual Studio style (#include "stdafx.h", void main()).
// With g++ use int main() and drop stdafx.h.` }
      ],
      cards: [
        [`Data (definition)`, `A collection of facts from which a conclusion may be drawn.`],
        [`Data type = ?`, `(i) a domain of allowed values and (ii) a set of operations on these values.`],
        [`Atomic data types`, `Data types with no component parts, e.g. int, char, float.`],
        [`Data structure (definition)`, `A particular way of storing and organizing data in a computer so that it can be used efficiently and effectively.`],
        [`Criteria of data structures`, `Facilitate efficient storage, retrieval and manipulation of data.`],
        [`Linear data structures`, `Array (static); stack, queue, linked list (dynamic).`],
        [`Non-linear data structures`, `Trees and graphs.`],
        [`Navigating (traversing)`, `Accessing each data element exactly once so certain items may be processed.`],
        [`Merging`, `Combining data elements from two or more data structures into one.`],
        [`ADT`, `An abstraction of a data structure that provides only the interface, with no implementation details or language.`],
        [`location(i) in an array`, `i - 1: the i-th element is at index i-1 (zero-based).`],
        [`Position of x[i][j] in 1D (c columns)`, `i·c + j (row-major).`],
        [`Condition to multiply A×B`, `Number of columns of A = number of rows of B; m×n times n×q gives m×q.`],
        [`Condition to add A+B`, `Same dimensions.`],
        [`Size of int arr[15] (4-byte int)`, `60 bytes.`],
        [`Struct`, `A group of data elements (members) of possibly different types grouped under one name. Also called a record; members are fields.`],
        [`How are arrays passed to functions?`, `Whole arrays by reference; individual elements by value.`],
        [`Main disadvantage of arrays`, `Fixed size.`]
      ],
      qa: [
        [`Define data structure and explain why we need data structures.`, `A data structure is a particular way of storing and organizing data in a computer so that it can be used efficiently and effectively; the logical or mathematical model of a particular organization of data. The goal is to organize data. The criteria are to facilitate efficient storage, retrieval and manipulation of data. The design issue is to select and design appropriate data types.`],
        [`List and explain the data structure operations.`, `Navigating: access each element exactly once. Searching: find the location of a key. Insertion: add a new element. Deletion: remove an element. Sorting: arrange elements in ascending/descending order. Merging: combine elements of two or more structures into one.`],
        [`What is an ADT? Give examples of ADTs and their implementations.`, `An abstract data type is an abstraction of a data structure that provides only the interface the structure must adhere to, without saying how or in which language it is implemented. It is a collection of data plus a set of operations. Examples: List → dynamic array or linked list; Queue → array-based or linked-list-based queue; Map → tree map or hash map.`],
        [`Classify data structures with examples.`, `Primitive: int, float, char (and pointers). Non-primitive: linear (static: arrays; dynamic: stack, queue, linked list) and non-linear (trees, graphs).`],
        [`Explain how element x[i][j] of a 2D array with r rows and c columns is located in memory.`, `Row-major order: each row holds c elements and there are i complete rows before row i, so i·c elements come before x[i][0]. Hence x[i][j] is at position i·c + j of the equivalent 1D array. Example: int a[3][4], a[2][1] → 2·4+1 = 9.`],
        [`Compare arrays and structs.`, `An array groups elements of the same data type accessed by an integer index; a struct groups members of different types and lengths accessed by name with the dot operator. Both group data under one name; an array of structs combines them (e.g. an array of employee records).`]
      ],
      quiz: [
        { q: `Assuming int is 4 bytes, what is the size of <code>int arr[15];</code>?`, o: [
          [`15`, `15 is the number of elements, not the number of bytes.`],
          [`19`, `This adds 15 + 4 instead of multiplying.`],
          [`11`, `This subtracts 4 from 15, which has no meaning.`],
          [`60`, `Correct. 15 elements × 4 bytes = 60 bytes.`]
        ], a: 3, src: `Exam 2025/26` },
        { q: `In general, the index of the first element in an array is:`, o: [
          [`1`, `Matrices are indexed from 1 in math, but C++ arrays are zero-based.`],
          [`0`, `Correct. C++ arrays are zero-based: indices run from 0 to size-1.`],
          [`2`, `No array starts at index 2.`],
          [`-1`, `-1 is used as the empty value of TOP/front, not an array index.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `Which of the following data structures is a linear type?`, o: [
          [`Graph`, `Graphs are non-linear.`],
          [`Binary tree`, `Trees are non-linear (hierarchical).`],
          [`Tree`, `Trees are non-linear.`],
          [`Linked list`, `Correct. A linked list stores elements in a sequence, so it is linear.`]
        ], a: 3, src: `Exam 2025/26` },
        { q: `Which of the following data structures is a non-linear type?`, o: [
          [`Array`, `Arrays are linear.`],
          [`Stack`, `A stack is linear.`],
          [`Tree`, `Correct. Trees (and graphs) are non-linear.`],
          [`Queue`, `A queue is linear.`]
        ], a: 2, src: `Exam 2025/26` },
        { q: `Which of the following data structures is a non-linear type?`, o: [
          [`Linked list`, `A linked list is linear.`],
          [`Stack`, `A stack is linear.`],
          [`Tree`, `Correct. A tree is hierarchical, so it is non-linear.`],
          [`Circular queue`, `A circular queue is still a linear structure (only the indexing wraps around).`]
        ], a: 2, src: `Exam 2022/23` },
        { q: `What are the advantages of arrays?`, o: [
          [`Easier to store elements of the same data type`, `Correct. Arrays hold many elements of one type under one name with index access.`],
          [`Elements in an array cannot be sorted`, `False: arrays can be sorted (the lecture has a sort example), and this would not be an advantage anyway.`],
          [`Index of first element of an array is 1`, `False: C++ arrays start at index 0.`],
          [`Objects of mixed data types can be stored`, `False: that describes a struct, not an array.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `When a search starts at the beginning of a list and checks every element in that list, it is:`, o: [
          [`Linear search`, `Correct. Linear search checks the elements one by one from the start (Lab 1/Lab 2).`],
          [`Binary search`, `Binary search repeatedly halves a sorted list; it does not check every element.`],
          [`Hash search`, `Hash search computes the position directly with a hash function.`],
          [`Binary tree search`, `BST search moves left or right from the root, not through every element.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `True or False: "The array is a group of data elements grouped together under one name with different types."`, o: [
          [`True`, `Wrong. Elements of an array all have the same type; different types describes a struct.`],
          [`False`, `Correct. That is the definition of a struct. An array holds elements of the same data type.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `The disadvantage of an array is ______.`, o: [
          [`Fixed size`, `Correct (official model answer). The size must be declared at design time and cannot change.`],
          [`Slow access by index`, `Index access in an array is direct and fast.`],
          [`It needs extra memory for pointers`, `That is a disadvantage of linked lists.`],
          [`It can only hold characters`, `Arrays can hold any one data type.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `Which operation means "accessing each data element exactly once so that certain items may be processed"?`, o: [
          [`Searching`, `Searching finds the location of a key.`],
          [`Navigating (traversing)`, `Correct. This is the lecture's definition of navigating.`],
          [`Merging`, `Merging combines elements from two or more structures.`],
          [`Sorting`, `Sorting arranges elements in order.`]
        ], a: 1 },
        { q: `For <code>int a[3][4]</code> stored row by row, element a[2][1] is at which position of the equivalent 1D array?`, o: [
          [`7`, `This uses i·r + j = 2·3 + 1; the formula uses the number of columns c.`],
          [`9`, `Correct. i·c + j = 2·4 + 1 = 9.`],
          [`6`, `This forgets to add j.`],
          [`11`, `This is the last element a[2][3].`]
        ], a: 1 },
        { q: `Matrix A is 2×3 and B is 3×4. What is A×B?`, o: [
          [`Not defined`, `It is defined: columns of A (3) equal rows of B (3).`],
          [`3×3`, `The result takes rows of A and columns of B.`],
          [`2×4`, `Correct. m×n times n×q gives m×q = 2×4.`],
          [`4×2`, `That is the size of (A×B) transposed.`]
        ], a: 2 }
      ]
    },

    /* ───────────────────────── LECTURE 2 ───────────────────────── */
    {
      n: 2, title: `Stack using Arrays`,
      notes: [
        { h: `What is a stack?`, pts: [
          `A stack is a <b>non-primitive linear</b> data structure: an <b>ordered list</b> in which insertion of new items and deletion of existing items are done from <b>only one end</b>, called the <b>top</b> (TOP).`,
          `Because all insertions and deletions happen at the top, the <b>last added element is the first removed</b>: <b>LIFO</b> (Last-In-First-Out), also written <b>FILO</b> (First-In-Last-Out).`,
          `Technique: the stack <b>base remains fixed</b>; adding an element <b>increments</b> top, removing the top element <b>decrements</b> top.`,
          `Real-life examples: <b>books and clothes</b> piled on each other; <b>mobile call logs</b>; <b>browsers</b> (back button returns to the previous site); <b>text editors</b> (undo/redo).`,
          `Applications (Lab 3): <b>backtracking</b> (maze path), <b>function calls</b> (keeping information about active functions), <b>string reversal</b> (push each character, then pop).`
        ]},
        { h: `Operations and terminology`, pts: [
          `<b>PUSH</b>: adding a new element at the top. After every push top is <b>incremented by one</b>. If the array is full it is the <b>STACK-FULL</b> condition, and pushing then gives <b>STACK OVERFLOW</b>.`,
          `<b>POP</b>: deleting the element at the top. After every pop top is <b>decremented by one</b>. Popping when there is no element gives <b>STACK UNDERFLOW</b>.`,
          `<b>MAXSIZE</b>: not a standard term; the maximum size of the stack.`,
          `<b>TOP</b>: refers to the top of the stack; used to check overflow/underflow. <b>Initially TOP = -1</b>, so on push top is <b>first incremented</b> and then the item is stored at <code>stack[top]</code>.`,
          `<b>Underflow</b>: stack contains no element (top at the bottom, top == -1). <b>Overflow</b>: stack is full (top == MAXSIZE-1, top at the highest location).`
        ]},
        { h: `Static vs dynamic implementation`, table: [
          [`Static (array)`, `Dynamic (linked list)`],
          [`Uses an array to create the stack`, `Uses pointers (linked list representation)`],
          [`Very simple technique`, `More code but flexible`],
          [`Size declared at design time and cannot be varied`, `Grows and shrinks at run time, no fixed size`],
          [`Not efficient in memory utilization`, `Uses only the memory it needs (plus a pointer per node)`]
        ]},
        { h: `isEmpty, isFull, push, pop (professor's code)`, code: `int MAXSIZE = 4;
int stack_arr[4];
int top = -1;

bool isEmpty(int top)
{
   if (top == -1) return true;
   else return false;
}
bool isFull(int top)
{
   if (top == MAXSIZE - 1) return true;
   else return false;
}
void push(int item)
{
   if (isFull(top))
      cout << "Stack overflow";
   else
   { top = top + 1; stack_arr[top] = item; }
}
int pop()
{
   if (isEmpty(top)) { cout << "Stack underflow"; return -1; }
   else
   { int item = stack_arr[top]; top = top - 1; return item; }
}` },
        { h: `display, count, search, get (professor's code)`, code: `void display()      // items in LIFO order
{
   if (isEmpty(top)) cout << "Nothing to display, stack is empty\\n";
   else
      for (int j = top; j >= 0; j--)
         cout << "Item number " << j << " is " << Stack[j] << "\\n";
}
int count()         // from top to bottom
{
   int c = 0, index = top;
   while (index >= 0) { c++; index--; }
   return c;        // (simply top + 1)
}
void search(int item)   // from top to bottom
{
   int temp = top, flag = 0;
   while (temp >= 0)
   {
      if (Stack[temp] == item)
      { flag = 1; cout << "Item found at location" << temp << "\\n"; break; }
      else temp--;       // slide writes temp=temp--; which is undefined/buggy, use temp--
   }
   if (flag == 0) cout << "Not Found\\n";
}
void get()          // show top element without popping (peek)
{
   if (top != -1) cout << Stack[top] << " is the element at the top of the stack";
   else cout << "Stack is Empty";
}` },
        { h: `Lab 3: stack using a dynamic array`, pts: [
          `In the lab the size is read at run time: <code>cin&gt;&gt;size; stack_arr = new int[size];</code> and <code>isFull()</code> checks <code>top == size-1</code>.`,
          `The menu uses (i) push, (o) pop, (t) traverse (display from top down to index 0), (e) exit.`,
          `Assignments: reverse a string using a stack; sum and average of a full stack; bonus <code>Stack_Copy()</code> from s1 to empty s2 (pop into a temp stack, then pop from temp into s2 to keep the order).`,
          `Exam pattern for the statements of push: <code>top++; stack[top] = item;</code> (increment first, then store) because top starts at -1.`
        ]}
      ],
      cards: [
        [`Stack`, `A non-primitive linear structure where insertion and deletion happen at one end (top). LIFO.`],
        [`LIFO`, `Last-In-First-Out (same as FILO): the last element pushed is the first popped.`],
        [`PUSH`, `Add an element at the top; top is incremented by one.`],
        [`POP`, `Delete the element at the top; top is decremented by one.`],
        [`Initial value of TOP`, `-1`],
        [`Stack empty condition (array)`, `top == -1`],
        [`Stack full condition (array)`, `top == MAXSIZE - 1`],
        [`Stack overflow`, `Pushing when the stack is full.`],
        [`Stack underflow`, `Popping when the stack is empty.`],
        [`Correct push statements`, `top++; stack[top] = item;`],
        [`Correct pop statements`, `item = stack[top]; top--;`],
        [`Static implementation`, `Uses an array; size fixed at design time; not memory efficient.`],
        [`Dynamic implementation`, `Linked list representation using pointers.`],
        [`Real-life stack examples`, `Piled books/clothes, call logs, browser back, undo/redo.`],
        [`Stack applications (lab)`, `Backtracking, function calls, string reversal.`],
        [`count() of an array stack`, `top + 1 (counting from top down to 0).`]
      ],
      qa: [
        [`Define a stack and explain why it is called LIFO.`, `A stack is a non-primitive linear data structure, an ordered list in which addition and deletion are done from only one end called the top. Since all insertions and deletions happen at the top, the last added element is the first to be removed, so it is a Last-In-First-Out list.`],
        [`Explain stack overflow and stack underflow.`, `Overflow happens when the stack is full (top == MAXSIZE-1) and a push is attempted: no new element can be accommodated. Underflow happens when the stack has no element (top == -1) and a pop is attempted.`],
        [`Write C++ POP and isEmpty functions for an array stack.`, `bool isEmpty(int top){ if (top == -1) return true; else return false; }<br>int pop(){ if (isEmpty(top)) { cout&lt;&lt;"Stack underflow"; return -1; } else { int item = stack_arr[top]; top = top-1; return item; } }`],
        [`Write C++ PUSH and isFull functions for an array stack.`, `bool isFull(int top){ if (top == MAXSIZE-1) return true; else return false; }<br>void push(int item){ if (isFull(top)) cout&lt;&lt;"Stack overflow"; else { top = top+1; stack_arr[top] = item; } }`],
        [`Compare static and dynamic implementation of a stack.`, `Static uses an array: very simple but not flexible because its size is declared during program design and cannot vary, and it is not efficient in memory utilization. Dynamic uses a linked list with pointers: it works for an unlimited (variable) number of values and needs no fixed size.`],
        [`Give real-life examples and applications of stacks.`, `Examples: books/clothes piled on each other, mobile call logs, browser history (back button), undo/redo in text editors. Applications: backtracking (maze), function calls, string reversal.`]
      ],
      quiz: [
        { q: `Pushing an element into a stack already having five elements when the stack size is 5 is called:`, o: [
          [`Crash`, `Not a stack term.`],
          [`Overflow`, `Correct. Pushing onto a full stack (top == MAXSIZE-1) is stack overflow.`],
          [`Underflow`, `Underflow is popping from an empty stack.`],
          [`User flow`, `Not a stack term.`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `Which of the following is NOT a correct statement for a stack data structure?`, o: [
          [`Stack follows FIFO`, `Correct (this is the wrong statement). A stack follows LIFO; FIFO is a queue.`],
          [`Arrays can be used to implement the stack`, `True: static implementation uses an array.`],
          [`Elements are stored in a sequential manner`, `True: a stack is a linear ordered list.`],
          [`Top of the stack has the last inserted element`, `True: that is what LIFO means.`]
        ], a: 0, src: `Exam 2022/23` },
        { q: `To insert an item into a stack, identify the correct set of statements:`, o: [
          [`top++; stack[top] = item;`, `Correct. Top starts at -1, so it is incremented first, then the item is stored there.`],
          [`item = stack[top]; top--;`, `That is pop, not push.`],
          [`stack[item] = top; item++;`, `This uses the item as an index; meaningless.`],
          [`stack[top] = item; top++;`, `With top starting at -1 this writes to stack[-1] first.`]
        ], a: 0, src: `Exam 2022/23` },
        { q: `The process of removing an element from a stack is called:`, o: [
          [`Create`, `Create builds the stack.`],
          [`Push`, `Push inserts.`],
          [`Evaluation`, `Not a stack operation name.`],
          [`Pop`, `Correct. Pop deletes the top element.`]
        ], a: 3, src: `Exam 2025/26` },
        { q: `The process of inserting an element in a stack is called:`, o: [
          [`Create`, `Create builds the stack.`],
          [`Push`, `Correct. Push adds a new element at the top.`],
          [`Evaluation`, `Not a stack operation name.`],
          [`Pop`, `Pop removes.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `True or False: "Insertions and deletions in the stack follow FIFO."`, o: [
          [`True`, `Wrong. FIFO is the queue rule.`],
          [`False`, `Correct. A stack follows LIFO (FILO).`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `True or False: "Function push() in a stack is used to delete an item."`, o: [
          [`True`, `Wrong. push inserts.`],
          [`False`, `Correct. push() inserts; pop() deletes.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `True or False: "Insertions and deletions in a stack follow FILO."`, o: [
          [`True`, `Correct. First-In-Last-Out is the same rule as LIFO.`],
          [`False`, `Wrong. FILO and LIFO describe the same order.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `Function ______ in a stack is used to insert an item.`, o: [
          [`pop()`, `pop removes an item.`],
          [`push()`, `Correct (official model answer).`],
          [`get()`, `get shows the top without changing the stack.`],
          [`count()`, `count returns the number of items.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `Function ______ in a stack is used to delete an item.`, o: [
          [`push()`, `push inserts.`],
          [`search()`, `search only looks for an item.`],
          [`pop()`, `Correct (official model answer B).`],
          [`display()`, `display only prints.`]
        ], a: 2, src: `Midterm 2023/24` },
        { q: `True or False: "A stack, in other words, is called a LIFO list."`, o: [
          [`True`, `Correct (model answer A): last in, first out.`],
          [`False`, `Wrong. LIFO is exactly the stack rule.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `True or False: "A stack is called a FIFO list."`, o: [
          [`True`, `Wrong. FIFO is a queue.`],
          [`False`, `Correct. The model answer corrects it to FILO (= LIFO).`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `True or False: "A stack is a data structure in which insertions and deletions are restricted to one end."`, o: [
          [`True`, `Correct (model answer B). Both happen at the top.`],
          [`False`, `Wrong. Both operations happen at the same end, the top.`]
        ], a: 0, src: `Midterm 2023/24` },
        { q: `With MAXSIZE = 4 and top initially -1, after push(1), push(2), pop(), push(3), push(4), push(5) what is top?`, o: [
          [`2`, `Count again: after these operations four elements are stored.`],
          [`3`, `Correct. Elements 1,3,4,5 occupy indices 0..3, so top = 3 (the stack is now full).`],
          [`4`, `top can never exceed MAXSIZE-1 = 3.`],
          [`-1`, `The stack is not empty.`]
        ], a: 1 }
      ]
    },

    /* ───────────────────────── LECTURE 3 ───────────────────────── */
    {
      n: 3, title: `Linear and Circular Queues using Arrays`,
      notes: [
        { h: `What is a queue?`, pts: [
          `A queue is a <b>non-primitive linear</b> data structure, <b>open at both ends</b>, whose operations are performed in <b>FIFO</b> (First In First Out) order.`,
          `All <b>insertions</b> are made at one end, the <b>tail or rear</b>, and all <b>deletions</b> are made at the other end, the <b>head or front</b>.`,
          `Like a line waiting to buy tickets: the first person in line is served first.`,
          `<b>Front (head)</b>: position of the entry ready to be served (the first to be removed). <b>Rear (tail)</b>: position of the last entry, the one most recently added.`,
          `<b>enqueue()</b> inserts at the rear; <b>dequeue()</b> removes from the front. Initially head = tail = -1.`
        ]},
        { h: `Linear queue: enqueue and dequeue (professor's code)`, code: `bool isFull(int tail)
{
   if (tail == maxsize - 1) return true;
   else return false;
}
void enqueue(int item)
{
   if (isFull(tail))
   { cout << "\\nQueue is full"; return; }
   else
   {
      if (head == -1) head = 0;   // first element
      tail = tail + 1;
      queue[tail] = item;
   }
}
bool isEmpty(int head)
{
   if (head == -1 || head > tail) return true;
   else return false;
}
int dequeue()
{
   int element;
   if (isEmpty(head))
   { cout << "Queue Underflow "; return -1; }
   else
   {
      element = queue[head];
      head++;
   }
   return element;
}` },
        { h: `Problem of the linear queue`, pts: [
          `In the slide trace (array 0..7) the rear moves right on every insert and the front moves right on every delete.`,
          `When the rear reaches the last index (<b>rear == MAX-1</b>) the queue reports full, <b>even if elements were dequeued</b> and the cells at the start are empty ("NO SPACE HERE" at the end while there is "SPACE HERE" at the front).`,
          `So after some insertions and deletions there is <b>non-usable empty space</b>; dequeuing moves the front forward and reduces the usable size of the queue. This memory wastage is the <b>need for the circular queue</b>.`
        ]},
        { h: `Circular queue`, pts: [
          `A circular queue is the extended version of a regular queue where the <b>last element is connected to the first element</b>, forming a circle-like structure. It solves the major limitation of the linear queue (unusable empty space).`,
          `Two pointers: <b>head</b> tracks the first element, <b>tail</b> tracks the last. Initially both are <b>-1</b> (queue empty).`,
          `<b>Enqueue</b>: check full with two cases: (1) <b>head == 0 &amp;&amp; tail == SIZE-1</b>; (2) <b>tail is just one less than head</b> (the slide writes <code>tail == (head-1) % (MAXSIZE-1)</code>; the standard single test is <code>(tail+1) % SIZE == head</code>). For the first element set head = 0. Circularly increase tail: <code>tail = (tail+1) % SIZE</code>. Store the element at tail.`,
          `<b>Dequeue</b>: check empty (head == -1). Return the value at head. Circularly increase head: <code>head = (head+1) % SIZE</code>. For the <b>last element</b> (head == tail) reset head and tail to -1.`,
          `Slide example: after 2 dequeues both queues have front at 72 and rear at 24; inserting 100 is <b>not possible in the linear queue</b> (rear at the end) but <b>possible in the circular queue</b> (rear wraps to index 0).`
        ]},
        { h: `Linear vs circular queue`, table: [
          [`Linear queue`, `Circular queue`],
          [`Elements arranged in a straight line`, `Last position is connected back to the first`],
          [`Full when rear == MAX-1`, `Full when (front == 0 && rear == MAX-1) or rear is one behind front`],
          [`Empty cells before front cannot be reused (memory wastage)`, `Freed cells are reused (rear wraps around)`],
          [`rear = rear + 1`, `rear = (rear + 1) % MAX`],
          [`Empty when front == -1 or front > rear`, `Empty when front == -1 (reset to -1 after removing the last element)`]
        ]},
        { h: `Circular queue enQueue / deQueue (professor's code)`, code: `bool isFull()
{
   if ((front == 0 && rear == MAX_SIZE - 1) || (rear == (front - 1) % (MAX_SIZE - 1)))
      return true;
   return false;
}
void enQueue(int value)
{
   if (isFull()) { cout << "Queue is full." << endl; }
   else
   {
      if (front == -1) { front = 0; }
      rear = (rear + 1) % MAX_SIZE;
      arr[rear] = value;
      cout << "Enqueued element: " << value << endl;
   }
}
bool isEmpty()
{
   if (front == -1) return true;
   return false;
}
int deQueue()
{
   int element;
   if (isEmpty()) { cout << "Queue is empty." << endl; return -1; }
   else
   {
      element = arr[front];
      if (front == rear) { front = -1; rear = -1; }   // last element removed
      else { front = (front + 1) % MAX_SIZE; }
      cout << "Dequeued element: " << element << endl;
      return element;
   }
}` },
        { h: `Worked trace (Exam 2022/23, size 5)`, formula: [
          `enqueue(10): front = 0, rear = 0, arr[0] = 10`,
          `enqueue(20): rear = 1 → print "Head = 0 Tail = 1"`,
          `enqueue(30): rear = 2`,
          `cout << dequeue(): returns 10, front = 1 → prints 10`,
          `x = dequeue(): x = 20, front = 2`,
          `print "Head = 2 Tail = 2" (one element, 30, is left)`,
          `(If the slide's deQueue/enQueue with their own cout messages are used, "Enqueued element: …" and "Dequeued element: …" lines also appear; checked with g++.)`
        ]}
      ],
      cards: [
        [`Queue`, `Non-primitive linear structure open at both ends; FIFO.`],
        [`FIFO`, `First In First Out: the first element inserted is the first removed.`],
        [`Where does enqueue insert?`, `At the rear (tail).`],
        [`Where does dequeue remove?`, `From the front (head).`],
        [`Linear queue full condition`, `rear == MAX - 1`],
        [`Linear queue empty condition`, `head == -1 || head > tail`],
        [`Initial head and tail`, `-1 and -1`],
        [`Problem of the linear queue`, `Cells freed by dequeue cannot be reused; rear stays at the end so the queue looks full (memory wastage).`],
        [`Circular queue`, `Queue whose last position connects to the first, reusing freed cells.`],
        [`Circular queue: advance rear`, `rear = (rear + 1) % MAX_SIZE`],
        [`Circular queue empty`, `front == rear == -1`],
        [`Circular queue full (two cases)`, `front == 0 && rear == MAX-1, or rear is one less than front.`],
        [`Circular dequeue of the last element`, `Reset front and rear to -1.`],
        [`Need for the circular queue`, `To avoid memory wastage.`]
      ],
      qa: [
        [`Define a queue and its front and rear.`, `A queue is a non-primitive linear data structure open at both ends, operating in FIFO order. All insertions are made at one end (tail/rear) and all deletions at the other (head/front). The front is the position of the entry ready to be served; the rear is the position of the most recently added entry.`],
        [`What is the problem of the linear queue and how does the circular queue solve it?`, `In a linear queue, dequeuing moves the front forward, and when the rear reaches MAX-1 no element can be enqueued even if cells at the beginning are empty, so space is wasted. A circular queue connects the last position to the first: rear = (rear+1) % MAX wraps to index 0 and reuses the freed cells.`],
        [`Write C++ enqueue and isFull functions for a linear queue.`, `bool isFull(int tail){ if (tail == maxsize-1) return true; else return false; }<br>void enqueue(int item){ if (isFull(tail)) { cout&lt;&lt;"Queue is full"; return; } else { if (head == -1) head = 0; tail = tail+1; queue[tail] = item; } }`],
        [`Write C++ dequeue and isEmpty functions for a linear queue.`, `bool isEmpty(int head){ if (head == -1 || head &gt; tail) return true; else return false; }<br>int dequeue(){ int element; if (isEmpty(head)) { cout&lt;&lt;"Queue Underflow"; return -1; } else { element = queue[head]; head++; } return element; }`],
        [`Explain the enqueue and dequeue steps of a circular queue.`, `Enqueue: check full (head == 0 and tail == SIZE-1, or tail just one less than head); for the first element set head = 0; circularly increase tail by 1 (if it reaches the end set it to 0); store the element at tail. Dequeue: check empty (head == -1); take the value at head; if it was the last element (head == tail) reset head and tail to -1, else circularly increase head by 1.`],
        [`Compare linear and circular queues.`, `Linear: straight line, full when rear == MAX-1, freed cells are wasted, rear = rear+1. Circular: last cell connected to first, full when front == 0 and rear == MAX-1 or rear one behind front, freed cells reused, rear = (rear+1) % MAX, reset to -1 when the last element is removed.`]
      ],
      quiz: [
        { q: `In a linear queue implemented using an array of size MAX, the queue gets full when:`, o: [
          [`Front = (rear + 1) mod MAX`, `That is a circular queue full test.`],
          [`Front = rear + 1`, `In the lecture code front > rear means empty, not full.`],
          [`Rear = MAX - 1`, `Correct. isFull checks tail == maxsize-1.`],
          [`Rear = front`, `That means exactly one element.`]
        ], a: 2, src: `Exam 2022/23` },
        { q: `Which of the following determines the need for the circular queue?`, o: [
          [`Avoid memory wastage`, `Correct. The linear queue cannot reuse cells freed by dequeue.`],
          [`Access the queue using priority`, `That is a priority queue.`],
          [`Follows the FIFO principle`, `Both linear and circular queues follow FIFO, so this is not the reason.`],
          [`None`, `Option a is the reason.`]
        ], a: 0, src: `Exam 2022/23` },
        { q: `If a circular queue is implemented using an array of size MAX_SIZE, which condition specifies that the circular queue is empty?`, o: [
          [`front = rear = 0`, `front = rear = 0 means one element at index 0.`],
          [`front = rear + 1`, `This is not the lecture's test.`],
          [`front = rear = -1`, `Correct. The lecture initializes and resets both to -1; isEmpty checks front == -1.`],
          [`None`, `Option c is correct.`]
        ], a: 2, src: `Exam 2022/23` },
        { q: `True or False: "The condition if (front == 0 && rear == MAX_SIZE - 1) is enough to check the fullness of a circular queue."`, o: [
          [`True`, `Wrong. It misses the wrapped case.`],
          [`False`, `Correct. The queue is also full when rear is just one less than front (rear wrapped around).`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `True or False: "The value of REAR is increased by 1 when an element is inserted in the queue."`, o: [
          [`True`, `Correct. enqueue does tail = tail + 1 (circularly in a circular queue).`],
          [`False`, `Wrong. Insertion advances the rear.`]
        ], a: 0, src: `Exam 2022/23` },
        { q: `Which of the following data structures allows insertion and deletion from both ends?`, o: [
          [`Stack`, `A stack inserts and deletes at one end only.`],
          [`Queue`, `Correct (expected answer). The lecture says a queue is "open at both ends": insert at the rear, delete at the front. Strictly, insertion AND deletion at both ends is a deque, which is not offered.`],
          [`Linked list`, `A linked list can insert/delete anywhere, but the question targets the queue's "both ends" definition.`],
          [`Array`, `An array has no insert/delete ends.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `True or False: "The circular queue is the same as the regular queue."`, o: [
          [`True`, `Wrong. They differ in how indices advance and reuse space.`],
          [`False`, `Correct. A circular queue connects the last position to the first and reuses freed cells.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `True or False: "Enqueue() inserts an element at the rear of the queue."`, o: [
          [`True`, `Correct.`],
          [`False`, `Wrong. Insertion is always at the rear.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `True or False: "Dequeue(): removes the element at the front of the queue."`, o: [
          [`True`, `Correct.`],
          [`False`, `Wrong. Deletion is always from the front.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `Removing an element occurs at the ______ of the queue.`, o: [
          [`Rear`, `Insertion happens at the rear.`],
          [`Front`, `Correct (official model answer).`],
          [`Middle`, `Queues do not delete from the middle.`],
          [`Top`, `Top belongs to stacks.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `enqueue() inserts an element at the ______ of the queue.`, o: [
          [`Front`, `Front is where elements leave.`],
          [`Top`, `Top is a stack term.`],
          [`Rear`, `Correct (official model answer B).`],
          [`Head`, `Head = front.`]
        ], a: 2, src: `Midterm 2023/24` },
        { q: `True or False: "A queue is a data structure in which insertions and deletions are restricted to one end."`, o: [
          [`True`, `Wrong. That describes a stack.`],
          [`False`, `Correct. Model answer: insertions at the rear and deletions at the front.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `A circular queue of size 5: enqueue 10, 20, 30, then dequeue twice. What are head and tail?`, o: [
          [`head = 0, tail = 2`, `Two dequeues move head forward twice.`],
          [`head = 2, tail = 2`, `Correct. Only 30 remains at index 2.`],
          [`head = -1, tail = -1`, `The queue is not empty yet.`],
          [`head = 1, tail = 2`, `That is after only one dequeue.`]
        ], a: 1, src: `Exam 2022/23` }
      ]
    },

    /* ───────────────────────── LECTURE 4 ───────────────────────── */
    {
      n: 4, title: `Pointers and Dynamic Allocation`,
      notes: [
        { h: `What is a pointer?`, pts: [
          `A <b>pointer is a data type</b>; you can create variables of this type like any other type. A pointer variable <b>contains a memory address</b> and <b>points to a specific data type</b>.`,
          `Lab definition: a <b>pointer variable</b> is a variable whose content is an <b>address</b> (a memory address).`,
          `Example: <code>int x; int *pointer1 = &amp;x;</code> pointer1 holds the address of x (e.g. 0x2000), not its value.`
        ]},
        { h: `Pointer operations`, table: [
          [`Expression`, `Meaning`],
          [`Type* aPtr;`, `Declares a pointer to Type`],
          [`aPtr = &object;`, `Assigns the address of object to aPtr (& = address-of)`],
          [`*aPtr`, `Accesses the object through the pointer (dereference)`],
          [`(*aPtr).member`, `Member of the structure aPtr points to`],
          [`aPtr->member`, `Same as (*aPtr).member (arrow operator)`],
          [`new Type / new Type[n]`, `Allocates memory on the heap at run time and returns its address`],
          [`delete p / delete[] p`, `Frees memory allocated with new / new[]`]
        ]},
        { h: `Pointers and function arguments: fakeSwap vs trueSwap`, code: `// Solution 1: pass by value (does NOT swap)
void fakeSwap(int a, int b)
{
   int tmp;
   tmp = a;
   a = b;
   b = tmp;        // only the copies a and b are swapped
}
// Solution 2: pass addresses (swaps)
void trueSwap(int* a, int* b)
{
   int tmp;
   tmp = *a;       // tmp = 1
   *a = *b;        // x = 2
   *b = tmp;       // y = 1
}
int main()
{
   int x = 1, y = 2;
   fakeSwap(x, y);
   cout << "x= " << x << " y= " << y << endl;   // x= 1 y= 2
   trueSwap(&x, &y);
   cout << "x= " << x << " y= " << y << endl;   // x= 2 y= 1
}` },
        { h: `Why fakeSwap fails (memory trace from the slides)`, formula: [
          `main: x = 1 at 0x2000, y = 2 at 0x2010`,
          `fakeSwap(x, y) creates NEW variables a = 1 (0x2038), b = 2 (0x2040), tmp (0x2060)`,
          `tmp = a → 1; a = b → a = 2; b = tmp → b = 1`,
          `function returns, a and b disappear; x and y are unchanged: x = 1, y = 2`,
          `trueSwap(&x, &y): a = address of x, b = address of y`,
          `tmp = *a → 1; *a = *b → x = 2; *b = tmp → y = 1  ⇒ x = 2, y = 1`
        ]},
        { h: `Lab: pointer program`, code: `#include <iostream>
using namespace std;
int main()
{
   int x = 5, *ptr;
   ptr = &x;              // stores the address of x in ptr
   cout << "The Value of X =" << x << endl;                 // 5
   cout << "The Address of X =" << &x << endl;              // e.g. 001DFAD8
   cout << "The Value of ptr =" << ptr << endl;             // same address as &x
   cout << "The Value pointed by pointer ptr " << *ptr << endl;  // 5
   cout << "The Address of ptr =" << &ptr << endl;          // e.g. 001DFACC
   *ptr = 24;
   cout << "The Value of X after changes =" << x << endl;   // 24
}` },
        { h: `Dynamic arrays and memory segments (Lab)`, pts: [
          `A normal array's size must be a <b>constant expression</b> fixed at design time. <code>new</code> allocates memory <b>at run time</b> using any variable value as the size: <code>int *arr; cin&gt;&gt;size; arr = new int[size]; ... delete[] arr;</code>`,
          `<code>new</code> allocates the memory needed for the object/array and the pointer stores the address of this block.`,
          `Every program has three memory segments: <b>code segment</b> (compiled machine code), <b>stack segment</b> (local/temporary variables) and <b>heap segment</b> (dynamic memory allocation with new).`,
          `Linked lists, linked stacks and linked queues use <b>dynamic</b> memory allocation: each node is created with <code>new</code> at run time.`
        ]}
      ],
      cards: [
        [`Pointer`, `A data type whose variables contain a memory address and point to a specific data type.`],
        [`&x`, `The address of x.`],
        [`*p`, `The value stored at the address held in p (dereference).`],
        [`p->member`, `Equivalent to (*p).member.`],
        [`fakeSwap(x, y) result`, `x and y unchanged (pass by value swaps only the copies).`],
        [`trueSwap(&x, &y) result`, `x and y swapped (pointers let the function change the originals).`],
        [`new`, `Allocates memory at run time (heap) and returns its address.`],
        [`delete[] arr`, `Frees a dynamic array allocated with new[].`],
        [`Three memory segments`, `Code segment, stack segment (local variables), heap segment (dynamic allocation).`],
        [`Dynamic vs normal array size`, `Normal: constant at design time. Dynamic: any value at run time.`],
        [`int x=5,*ptr; ptr=&x; *ptr=24; x = ?`, `24`],
        [`Where are local variables stored?`, `In the stack segment.`]
      ],
      qa: [
        [`What is a pointer? Explain & and * with an example.`, `A pointer is a data type whose variables contain a memory address of a variable of a specific type. &amp;x gives the address of x; *p accesses the value at the address in p. Example: int x = 5, *ptr; ptr = &amp;x; *ptr = 24; now x is 24 because ptr points to x.`],
        [`Explain why fakeSwap does not swap x and y while trueSwap does.`, `fakeSwap(int a, int b) receives copies of x and y in new memory locations; swapping a and b does not touch x and y. trueSwap(int* a, int* b) receives the addresses of x and y, so *a and *b refer to x and y themselves; tmp = *a; *a = *b; *b = tmp; swaps the originals (x = 2, y = 1).`],
        [`Compare a normal array and a dynamic array.`, `A normal array's size must be a constant expression decided at design time, and it lives in the stack segment (if local). A dynamic array is allocated with new at run time using any variable size (heap segment), accessed through a pointer, and must be freed with delete[].`],
        [`Name the three memory segments of a program.`, `Code segment: compiled machine code. Stack segment: local/temporary variables. Heap segment: dynamically allocated memory (new/delete).`]
      ],
      quiz: [
        { q: `Linked list is considered as an example of ______ type of memory allocation.`, o: [
          [`Static`, `Static allocation fixes the size at compile time (arrays).`],
          [`Dynamic`, `Correct. Each node is created with new at run time.`],
          [`Compile time`, `Compile-time allocation is static.`],
          [`Heap`, `Nodes do live on the heap, but the allocation type asked for is dynamic.`]
        ], a: 1, src: `Exam 2025/26` },
        { q: `After <code>int x = 5, *ptr; ptr = &x; *ptr = 24;</code> what is x?`, o: [
          [`5`, `*ptr = 24 writes through the pointer into x.`],
          [`24`, `Correct. ptr points to x, so *ptr = 24 changes x.`],
          [`The address of x`, `ptr holds the address; x holds a value.`],
          [`29`, `Nothing is added.`]
        ], a: 1, src: `Lecture 4 example` },
        { q: `With <code>int x = 1, y = 2; fakeSwap(x, y);</code> the program prints:`, o: [
          [`x= 2 y= 1`, `That is the result of trueSwap(&x, &y).`],
          [`x= 1 y= 2`, `Correct. Pass by value swaps only the copies a and b.`],
          [`x= 1 y= 1`, `No assignment to x or y happens.`],
          [`Compile error`, `The code is valid.`]
        ], a: 1, src: `Lecture 4 example` },
        { q: `If p points to a struct, <code>p->price</code> is equivalent to:`, o: [
          [`*p.price`, `Without brackets . binds first: *(p.price), which is wrong.`],
          [`(*p).price`, `Correct. The arrow operator dereferences then selects the member.`],
          [`&p.price`, `& takes an address.`],
          [`p.price`, `p is a pointer; the dot needs an object.`]
        ], a: 1 },
        { q: `Which memory segment is used by new?`, o: [
          [`Code segment`, `Holds machine code.`],
          [`Stack segment`, `Holds local/temporary variables.`],
          [`Heap segment`, `Correct. Dynamic memory comes from the heap.`],
          [`Data register`, `Not one of the segments in the lab.`]
        ], a: 2 },
        { q: `Which statement correctly frees <code>arr = new int[size];</code>?`, o: [
          [`delete arr;`, `For arrays allocated with new[] use delete[].`],
          [`free arr;`, `Not valid C++ syntax.`],
          [`delete[] arr;`, `Correct (as in Lab 3).`],
          [`arr = NULL;`, `This loses the address without freeing (memory leak).`]
        ], a: 2 }
      ]
    },

    /* ───────────────────────── LECTURE 5 ───────────────────────── */
    {
      n: 5, title: `Linked Lists`,
      notes: [
        { h: `What is a linked list?`, pts: [
          `A <b>linear</b> data structure that stores a collection of elements <b>dynamically</b>. It is a series of connected <b>nodes</b>; each node stores the <b>data</b> and the <b>address of the next node</b>.`,
          `Each node has two fields: <b>data</b> and a <b>pointer (next)</b> to the next node. The <b>last node contains NULL</b> in its second field because it points to no node.`,
          `The list is accessed through the <b>head</b>, which points to the first node; the last node (pointing to NULL) is the <b>tail</b>. A linked list can <b>grow and shrink</b> as required.`,
          `Elements are <b>scattered randomly through memory</b> (not contiguous). It is easy to add or delete an element: just change the links.`
        ]},
        { h: `Types of linked lists`, table: [
          [`Type`, `Description`],
          [`Singly linked list`, `Each node references the next node; traversal only in the forward direction`],
          [`Doubly linked list`, `Each node references both next and previous nodes; traversal forward and backward, but needs extra memory for the backward reference`],
          [`Circular linked list`, `The last node points back to the head node; can be singly or doubly linked`]
        ]},
        { h: `Advantages and disadvantages`, pts: [
          `<b>Advantages</b>: (1) <b>Dynamic size</b>: grows/shrinks since memory is allocated at run time. (2) <b>Insertion and deletion</b> are efficient, especially for large lists. (3) <b>Flexibility</b>: easily reorganized without needing a contiguous block of memory.`,
          `<b>Disadvantages</b>: (1) <b>Linear access</b>: no direct access by index; traversal is required to reach a node. (2) <b>Extra memory</b> for storing the pointers.`,
          `Operations: <b>insertion</b> (beginning, end, any position), <b>deletion</b> (beginning, end, any position), <b>searching</b> (traverse from head until found or end).`
        ]},
        { h: `Node and Linkedlist classes, isEmpty, isFull`, code: `class Node
{
public:
   int data;
   Node *next;
   Node() { data = 0; next = NULL; }
};

class Linkedlist
{
public:
   Node *head;
   Linkedlist() { head = NULL; }

   bool isEmpty()
   {
      if (head == NULL) return true;
      else return false;
   }
   bool isFull()          // full only if new cannot allocate memory
   {
      Node *newnode = new Node();
      if (newnode == NULL) return true;
      else return false;
   }
};` },
        { h: `Insert at beginning and at end (professor's code)`, code: `void insertatbeginning(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   if (isEmpty())
   { newnode->next = NULL; head = newnode; }
   else
   { newnode->next = head;      // 1. new node points at the old first node
     head = newnode; }           // 2. head points at the new node
}

void insertatend(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   newnode->next = NULL;            // new last node
   Node *temp1 = head;
   while (temp1->next != NULL) temp1 = temp1->next;   // go to last node
   temp1->next = newnode;           // last node now points to new node
}
// Note: as written, insertatend crashes on an EMPTY list (temp1 is NULL).
// Safe version: if (isEmpty()) { head = newnode; return; } before the loop.` },
        { h: `Insert in order (sorted list)`, pts: [
          `Steps: (1) locate the node <b>preceding</b> the insertion point (current points to it); (2) make the new node point to the node after the insertion point (<code>newnode-&gt;next = current-&gt;next</code>); (3) make current point to the new node (<code>current-&gt;next = newnode</code>). The order of steps 2 and 3 matters: doing step 3 first loses the rest of the list.`,
          `The slide's <code>insertsorted</code> loop is <code>while ((temp1-&gt;data &gt; item &amp;&amp; temp1-&gt;next-&gt;data &gt; item) || (temp1-&gt;data &lt; item &amp;&amp; temp1-&gt;next-&gt;data &lt; item) &amp;&amp; temp1!=NULL)</code>. Tested with g++: it works for a value <b>between</b> two nodes (10,20,30 + 25 → 10 20 25 30) but <b>crashes</b> for a value smaller than the head or larger than the last node (temp1-&gt;next becomes NULL).`,
          `In an exam, write the safe version below: it handles the empty list, a new smallest value and a new largest value.`
        ]},
        { h: `Safe insertsorted (tested with g++)`, code: `void insertsorted(int item)            // ascending order
{
   Node *newnode = new Node();
   newnode->data = item;
   if (isEmpty() || item < head->data)   // empty list or new smallest
   {
      newnode->next = head;
      head = newnode;
   }
   else
   {
      Node *temp = head;
      while (temp->next != NULL && temp->next->data < item)
         temp = temp->next;                // temp = node before insertion point
      newnode->next = temp->next;          // step 2
      temp->next = newnode;                // step 3
   }
}
// list 10 -> 20 -> 30, insertsorted(25), (5), (40)  =>  5 10 20 25 30 40` },
        { h: `Delete first, last and a given item (professor's code)`, code: `int deletefrombeginning()
{
   int value;
   Node *temp = head;
   if (isEmpty()) { cout << "Empty" << endl; return 0; }
   else
   { value = head->data;
     head = head->next;      // head points to the second node
     delete(temp);
     return (value); }
}

int deletefromend()
{
   if (isEmpty()) { cout << "Empty" << endl; return 0; }
   else
   { int value;
     Node *temp1 = head, *temp2 = NULL;
     while (temp1->next != NULL) { temp2 = temp1; temp1 = temp1->next; }
     value = temp1->data;
     delete temp1;
     temp2->next = NULL;     // (if there was only one node, set head = NULL instead)
     return (value); }
}

void deleteitem(int value)
{
   if (isEmpty()) cout << "empty";
   else if (search(value))
   {
      Node *temp1 = head, *temp2 = NULL;
      if (head->data == value) { head = head->next; delete temp1; }
      else
      {
         while ((temp1->data != value) && (temp1 != NULL))
         { temp2 = temp1; temp1 = temp1->next; }   // temp2 = previous, temp1 = current
         temp2->next = temp1->next;                 // bypass the node
         delete(temp1);
      }
   }
   else cout << "not found";
}` },
        { h: `search, count, get, update (professor's code)`, code: `bool search(int item)
{
   Node *temp = head;
   while (temp != NULL)
   {
      if (temp->data == item) return (true);
      else temp = temp->next;
   }
   return (false);
}
int count()                // size of the list
{
   int c = 0;
   Node *temp = head;
   while (temp != NULL) { c++; temp = temp->next; }
   return (c);
}
int get()                  // first element
{
   if (head != NULL) return head->data;
   else { cout << "Empty"; return 0; }
}
bool update(int old_item, int new_item)
{
   Node *temp = head;
   while (temp != NULL)
   {
      if (temp->data == old_item) { temp->data = new_item; return true; }
      else temp = temp->next;
   }
   return false;
}` },
        { h: `Lab 5: struct-based list and insert at position`, code: `struct node { int data; node *next; };
node *head = NULL;

void InsertB(int item)          // insert at beginning
{
   node *temp = new node;       // (1) create new node
   temp->data = item;           // (2) fill the data
   temp->next = head;           // (3) link to old list
   head = temp;                 // (4) move start pointer to new node
}
void InsertAt(int item, int pos)  // positions start at 1
{
   int curr = 1;
   node *temp = new node;
   temp->data = item; temp->next = NULL;
   if (head == NULL) head = temp;
   else if (pos == 1) { temp->next = head; head = temp; }
   else
   {
      node *p = head;
      while (curr < pos-1) { curr++; p = p->next; }   // p = node at pos-1
      temp->next = p->next;
      p->next = temp;
   }
}
// main: InsertB(10); InsertE(30); InsertB(5); InsertAt(20,2);  =>  5 20 10 30` }
      ],
      cards: [
        [`Linked list`, `A linear structure of nodes stored dynamically; each node holds data and the address of the next node.`],
        [`Node fields`, `data and next (pointer to the next node).`],
        [`Last node's next`, `NULL, because it points to no node.`],
        [`head`, `Pointer to the first node of the list.`],
        [`Singly linked list traversal`, `Forward direction only.`],
        [`Doubly linked list`, `Nodes have next and prev; traverse both ways; extra memory for prev.`],
        [`Circular linked list`, `The last node points back to the head node.`],
        [`Advantages of linked lists`, `Dynamic size, efficient insertion/deletion, flexibility (no contiguous memory).`],
        [`Disadvantages of linked lists`, `Linear access (no index) and extra memory for pointers.`],
        [`Insert at beginning (2 steps)`, `newnode->next = head; head = newnode;`],
        [`Insert at end`, `Go to the last node; last->next = newnode; newnode->next = NULL.`],
        [`Delete first node`, `temp = head; head = head->next; delete temp;`],
        [`Delete interior node`, `previous->next = current->next; delete current;`],
        [`isFull of a linked list`, `True only if new fails to allocate (returns NULL).`],
        [`count()`, `Traverse from head to NULL incrementing a counter.`],
        [`Order of the two link steps when inserting after current`, `First newnode->next = current->next, then current->next = newnode.`]
      ],
      qa: [
        [`Define a linked list and describe its node structure.`, `A linked list is a linear data structure that stores a collection of data elements dynamically as a series of connected nodes. Each node has a data field (the value) and a next pointer that stores the address of the next node. The head points to the first node; the last node (tail) has NULL in its next field. It can grow and shrink as required.`],
        [`List the types of linked lists.`, `Singly linked list: each node points to the next; forward traversal only. Doubly linked list: each node points to next and previous; traversal both ways but extra memory. Circular linked list: the last node points back to the head; can be singly or doubly linked.`],
        [`State the advantages and disadvantages of linked lists.`, `Advantages: dynamic size (allocation at run time), efficient insertion and deletion, flexibility without needing contiguous memory. Disadvantages: linear access (must traverse, no index) and extra memory for pointers.`],
        [`Explain the steps of inserting a node in its order in a linked list.`, `1) Locate the node preceding the insertion point (current). 2) Make the new node point to the node after the insertion point: newnode->next = current->next. 3) Make current point to the new node: current->next = newnode. Special cases: empty list or a value smaller than the head, where the new node becomes the head.`],
        [`Explain how to delete an interior node.`, `Traverse so that current points to the node to delete and previous to the node before it; get the node following current (current->next); make previous point to it (previous->next = current->next); then delete current.`],
        [`Write node class, linked list class and insert-at-end, then build the list head → 7 → 5 → NULL (Midterm 2023/24).`, `class Node{ public: int data; Node *next; Node(){ data=0; next=NULL; } };<br>class Linkedlist{ public: Node *head; Linkedlist(){ head=NULL; } bool isEmpty(){ return head==NULL; }<br>void insertatend(int item){ Node *newnode=new Node(); newnode->data=item; newnode->next=NULL; if(isEmpty()){ head=newnode; return; } Node *temp1=head; while(temp1->next!=NULL) temp1=temp1->next; temp1->next=newnode; } };<br>main: Linkedlist list; list.insertatend(7); list.insertatend(5);`]
      ],
      quiz: [
        { q: `True or False: "The last node in a linked list contains null in its second field because it will point to no node."`, o: [
          [`True`, `Correct. This is the lecture's sentence.`],
          [`False`, `Wrong. The last node's next is NULL.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `True or False: "Traversing a singly linked list is done in a forward direction only."`, o: [
          [`True`, `Correct. Each node only knows the next node.`],
          [`False`, `Wrong. Backward traversal needs prev pointers (doubly linked list).`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `True or False: "In a circular linked list, the last node points back to the head node."`, o: [
          [`True`, `Correct.`],
          [`False`, `Wrong. That is the definition of a circular linked list.`]
        ], a: 0, src: `Exam 2025/26` },
        { q: `True or False: "The following is a valid code of class Node of a singly linked list: class Node {int data, Node next;}"`, o: [
          [`True`, `Wrong. See the reasons in False.`],
          [`False`, `Correct. next must be a pointer (Node *next;), the members must be separated by ; and the class needs a closing ; (and public: to be used outside).`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `The disadvantage of a linked list is ______.`, o: [
          [`Fixed size`, `That is the array's disadvantage.`],
          [`Linear access and extra memory`, `Correct (official model answer B).`],
          [`Slow insertion at the beginning`, `Insertion at the beginning is fast.`],
          [`It cannot grow`, `Linked lists grow dynamically.`]
        ], a: 1, src: `Midterm 2023/24` },
        { q: `Which statement pair inserts newnode at the beginning of a non-empty list?`, o: [
          [`head = newnode; newnode->next = head;`, `Wrong order: newnode->next would point to itself and the list is lost.`],
          [`newnode->next = head; head = newnode;`, `Correct. Link to the old first node, then move head.`],
          [`newnode->next = NULL; head = newnode;`, `This discards the old list.`],
          [`head->next = newnode;`, `This puts the new node second and loses the old second node.`]
        ], a: 1 },
        { q: `After Lab 5's main: InsertB(10); InsertE(30); InsertB(5); InsertAt(20,2); the list is:`, o: [
          [`5 20 10 30`, `Correct. 10 → 10,30 → 5,10,30 → insert 20 at position 2 → 5,20,10,30.`],
          [`5 10 20 30`, `InsertAt does not sort; it inserts at position 2.`],
          [`10 20 30 5`, `InsertB(5) puts 5 at the beginning.`],
          [`20 5 10 30`, `Position 2 is after the first node.`]
        ], a: 0, src: `Lecture 5 example` },
        { q: `What does count() return for the list head → 4 → 9 → 2 → NULL?`, o: [
          [`2`, `That is the last value, not the count.`],
          [`3`, `Correct. Three nodes before NULL.`],
          [`4`, `NULL is not a node.`],
          [`15`, `That is the sum.`]
        ], a: 1 },
        { q: `Which operation is NOT efficient in a singly linked list compared with an array?`, o: [
          [`Inserting at the beginning`, `Constant time in a linked list.`],
          [`Accessing the 500th element directly`, `Correct. Linked lists have linear access; they must traverse.`],
          [`Deleting the first node`, `Constant time in a linked list.`],
          [`Growing beyond the initial size`, `Linked lists grow easily.`]
        ], a: 1 }
      ]
    },

    /* ───────────────────────── LECTURE 6 ───────────────────────── */
    {
      n: 6, title: `Linked Stacks`,
      notes: [
        { h: `Stack revised and the linked stack`, pts: [
          `A stack is a linear data structure that follows <b>Last In First Out</b> at one point (<b>top</b>). Two implementations: <b>static</b> (array) and <b>dynamic</b> (linked list).`,
          `Major problem of the array stack: it works only for a <b>fixed number</b> of values, which must be specified at the beginning.`,
          `The linked stack works for an <b>unlimited number</b> of values (variable size); no need to fix the size at the beginning.`,
          `Every new element is inserted as the <b>top</b> element (pointed to by top). To remove, delete the node pointed to by top and <b>move top to its next node</b>.`,
          `Figure: elements inserted in order 25, 32, 50, 99 → top → 99 → 50 → 32 → 25 → NULL. Last inserted = 99, first inserted = 25.`,
          `Only <b>one pointer (top)</b> and one list are needed; push = insert at beginning, pop = delete from beginning.`
        ]},
        { h: `Creation, push and pop steps`, pts: [
          `<b>Creation</b>: Step 1: define a Node class with members data and next. Step 2: define a Node pointer <b>top = NULL</b>. Step 3: main displays a menu and calls the functions.`,
          `<b>Push</b>: (1) create newNode with the value; (2) check whether the stack is empty (top == NULL); (3) if empty, newNode→next = NULL; (4) if not empty, newNode→next = top; (5) finally top = newNode.`,
          `<b>Pop</b>: (1) check whether empty (top == NULL); (2) if empty, terminate; (3) if not, define Node pointer temp = top; (4) top = top→next; (5) delete temp.`,
          `<b>Display</b>: if empty print "Stack is Empty"; else temp = top, print temp→data and move to next until the first-inserted node; finally print "--->NULL".`
        ]},
        { h: `Linked stack class (professor's code)`, code: `class Node
{
public:
   int data;
   Node *next;
   Node() { data = 0; next = NULL; }
};
class Stack
{
   Node *top;
public:
   Stack() { top = NULL; }

   bool isEmpty() { if (top == NULL) return true; else return false; }
   bool isFull()
   { Node *newnode = new Node();
     if (newnode == NULL) return true; else return false; }

   void push(int item)
   {
      Node *newnode = new Node();
      newnode->data = item;
      if (isEmpty()) { newnode->next = NULL; top = newnode; }
      else           { newnode->next = top;  top = newnode; }
   }
   int pop()
   {
      int value;
      Node *temp = top;
      if (isEmpty()) { cout << "Empty" << endl; return 0; }
      else
      { value = top->data;
        top = top->next;
        delete(temp);
        return (value); }
   }
};` },
        { h: `display, get, count, search (professor's code)`, code: `void display()
{
   if (isEmpty()) cout << "Empty Stack";
   else
   { Node *temp = top;
     while (temp != NULL) { cout << temp->data << " "; temp = temp->next; }
     cout << endl << "END" << endl; }
}
int get()            // top element without removing it
{
   if (top != NULL) return top->data;
   else { cout << "Empty"; return 0; }
}
int count()
{
   int c = 0; Node *temp = top;
   while (temp != NULL) { c++; temp = temp->next; }
   return (c);
}
bool search(int item)
{
   Node *temp = top;
   while (temp != NULL)
   { if (temp->data == item) return (true); else temp = temp->next; }
   return (false);
}` },
        { h: `Exam pattern: push 50 and 70, pop one, remove all (tested)`, code: `void removeAll()          // pop until empty
{
   while (!isEmpty())
      cout << "popped " << pop() << endl;
}
int main()
{
   Stack s;
   if (s.isEmpty()) cout << "Stack is empty" << endl;
   s.push(50);
   s.push(70);                          // top -> 70 -> 50 -> NULL
   cout << "Removed " << s.pop() << endl;   // Removed 70
   s.removeAll();                       // popped 50
   return 0;
}` },
        { h: `Lab 7: struct-based linked stack`, code: `struct node { int data; node *next; };
node *top = NULL;
void push(int item)          // insert at beginning
{
   node *newnode = new node;
   newnode->data = item;
   newnode->next = top;
   top = newnode;
}
void pop()                   // delete from beginning
{
   node *delnode = top;
   if (top == NULL) cout << "Stack Underflow\\n";
   else
   { cout << "The popped element is " << top->data << endl;
     top = top->next;
     delete delnode; }
}` }
      ],
      cards: [
        [`Linked stack`, `A stack implemented with a linked list; every new node becomes the top.`],
        [`Problem solved by the linked stack`, `The array stack works only for a fixed number of values.`],
        [`Initial top of a linked stack`, `top = NULL`],
        [`Linked stack empty condition`, `top == NULL`],
        [`Push (linked)`, `newnode->next = top; top = newnode;`],
        [`Pop (linked)`, `temp = top; top = top->next; delete temp;`],
        [`Push = which list operation?`, `Insert at the beginning.`],
        [`Pop = which list operation?`, `Delete from the beginning.`],
        [`Pointers needed by a linked stack`, `One: top.`],
        [`Inserted 25, 32, 50, 99: display order?`, `99 50 32 25`],
        [`Can a linked stack overflow?`, `Only if new fails to allocate memory (isFull).`],
        [`Steps of linked stack creation`, `Define Node (data, next); define top = NULL; main menu calls functions.`]
      ],
      qa: [
        [`Why is a linked stack better than an array stack?`, `The array stack works only for a fixed number of values that must be specified at the start. A linked stack works for an unlimited, variable number of values, so there is no need to fix the size; memory is allocated per node at run time.`],
        [`List the steps of push in a linked stack.`, `1) Create newNode with the given value. 2) Check whether the stack is empty (top == NULL). 3) If empty, set newNode->next = NULL. 4) If not empty, set newNode->next = top. 5) Set top = newNode.`],
        [`List the steps of pop in a linked stack.`, `1) Check whether the stack is empty (top == NULL). 2) If empty, terminate the function. 3) If not, define Node pointer temp and set it to top. 4) Set top = top->next. 5) Delete temp.`],
        [`Write a node class and a linked stack class with a function to delete an item from the stack, and main to call it (Exam 2025/26).`, `class Node{ public: int data; Node *next; Node(){ data=0; next=NULL; } };<br>class Stack{ Node *top; public: Stack(){ top=NULL; } bool isEmpty(){ return top==NULL; } void push(int item){ Node *n=new Node(); n->data=item; n->next=top; top=n; } int pop(){ if(isEmpty()){ cout&lt;&lt;"Empty"; return 0; } Node *temp=top; int value=top->data; top=top->next; delete temp; return value; } };<br>int main(){ Stack s; s.push(10); s.push(20); cout&lt;&lt;s.pop(); }  // prints 20`],
        [`Write a function to remove all the items from a linked stack.`, `void removeAll(){ while(top != NULL){ Node *temp = top; top = top->next; delete temp; } }  (or: while(!isEmpty()) pop();)`]
      ],
      quiz: [
        { q: `True or False: "Two linked lists are needed in order to implement a linked stack."`, o: [
          [`True`, `Wrong. One list with one pointer (top) is enough.`],
          [`False`, `Correct. A linked stack is one singly linked list where push/pop happen at the top (the beginning).`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `In a linked stack, which pointer is changed by push?`, o: [
          [`front`, `front belongs to a queue.`],
          [`rear`, `rear belongs to a queue.`],
          [`top`, `Correct. top = newnode after linking newnode->next = top.`],
          [`head->prev`, `Stacks in the lecture are singly linked.`]
        ], a: 2 },
        { q: `Elements 25, 32, 50, 99 are pushed into a linked stack in this order. display() prints:`, o: [
          [`25 32 50 99`, `That is insertion order (a queue would print this).`],
          [`99 50 32 25`, `Correct. Display starts at top, the last pushed node.`],
          [`99 25 32 50`, `Mixed order is not possible.`],
          [`25 99 50 32`, `Mixed order is not possible.`]
        ], a: 1, src: `Lecture 6 example` },
        { q: `What is the linked stack empty condition?`, o: [
          [`top == -1`, `That is for the array stack.`],
          [`top == NULL`, `Correct.`],
          [`top->next == NULL`, `That means one element.`],
          [`front == rear`, `That is a queue condition.`]
        ], a: 1 },
        { q: `The major problem of the stack implemented using an array is:`, o: [
          [`It cannot be traversed`, `Array stacks can be displayed.`],
          [`It works only for a fixed number of data values`, `Correct (lecture 6).`],
          [`It follows FIFO`, `Stacks follow LIFO in both implementations.`],
          [`It needs two pointers`, `It needs only top.`]
        ], a: 1 },
        { q: `In the linked stack pop, what is the correct order of statements after temp = top?`, o: [
          [`delete temp; top = top->next;`, `top would read deleted memory.`],
          [`top = top->next; delete temp;`, `Correct. Move top first, then free the old top through temp.`],
          [`top = NULL; delete temp;`, `This loses the rest of the stack.`],
          [`temp = temp->next; delete top;`, `top would point to freed memory.`]
        ], a: 1 }
      ]
    },

    /* ───────────────────────── LECTURE 7 ───────────────────────── */
    {
      n: 7, title: `Linked Queues`,
      notes: [
        { h: `Queue revised and the linked queue`, pts: [
          `A queue follows <b>First In First Out</b> at <b>two points</b>: <b>tail (rear) for insert</b>, <b>head (front) for retrieve</b>. Two implementations: static (array) and dynamic (linked list).`,
          `The array queue works only for a <b>fixed number</b> of values. The linked queue works for an <b>unlimited (variable)</b> number; no fixed size.`,
          `The <b>last inserted node is always pointed to by rear</b> and the <b>first node by front</b>.`,
          `Figure: inserted 10, 15, 22, 50 → front → 10 → 15 → 22 → 50 ← rear, 50 → NULL.`,
          `<b>Creation</b>: (1) define Node class with data and next; (2) define two Node pointers <b>front and rear, both NULL</b>; (3) main shows a menu and calls the functions.`
        ]},
        { h: `Enqueue, dequeue and display steps`, pts: [
          `<b>Enqueue</b>: (1) create newNode with the value and set newNode→next = NULL; (2) check whether the queue is empty (rear == NULL); (3) if empty, set <b>front = newNode and rear = newNode</b>; (4) if not, set <b>rear→next = newNode and rear = newNode</b>.`,
          `<b>Dequeue</b>: (1) check empty (front == NULL); (2) if empty display "Queue is Empty!!! Deletion is not possible" and terminate; (3) else temp = front; (4) front = front→next and delete temp.`,
          `<b>Display</b>: if empty display "Queue is Empty"; else temp = front; display temp→data and move to the next node until temp reaches rear; finally display "temp→data ---&gt; NULL".`,
          `Insertion is at the <b>rear (end)</b> of the list; deletion is from the <b>front (beginning)</b>.`
        ]},
        { h: `Linked queue class (professor's code)`, code: `class Node
{
public:
   int data;
   Node *next;
   Node() { data = 0; next = NULL; }
};
class Queue
{
   Node *front;
   Node *rear;
public:
   Queue() { front = NULL; rear = NULL; }

   bool isEmpty()
   { if (front == NULL && rear == NULL) return true; else return false; }

   void enqueue(int item)
   {
      Node *newnode = new Node();
      newnode->data = item;
      newnode->next = NULL;
      if (isEmpty()) { front = newnode; rear = newnode; }
      else           { rear->next = newnode; rear = newnode; }
   }
   int dequeue()
   {
      int value;
      Node *temp = front;
      if (isEmpty()) { cout << "Empty" << endl; return 0; }
      else
      { value = front->data;
        front = front->next;
        delete(temp);
        return (value); }
   }
};
// Careful: after removing the LAST node front becomes NULL but rear still
// points to the deleted node, so isEmpty() (front==NULL && rear==NULL) is false.
// Add: if (front == NULL) rear = NULL;   (Lab 7 does front = rear = NULL.)` },
        { h: `display, get, count, search (professor's code)`, code: `void display()
{
   Node *temp = front;
   while (temp != NULL) { cout << temp->data << " "; temp = temp->next; }
   cout << endl << "END" << endl;
}
int get()             // first node (head)
{
   if (front != NULL) return front->data;
   else { cout << "Empty"; return 0; }
}
int count()
{
   int c = 0; Node *temp = front;
   while (temp != NULL) { c++; temp = temp->next; }
   return (c);
}
bool search(int item)
{
   Node *temp = front;
   while (temp != NULL)
   { if (temp->data == item) return (true); else temp = temp->next; }
   return (false);
}` },
        { h: `Exam pattern: insert 30 and 50, remove all items (tested)`, code: `// safe dequeue + removeAll inside class Queue
int dequeue()
{
   if (isEmpty()) { cout << "Queue is empty" << endl; return 0; }
   Node *temp = front;
   int value = front->data;
   front = front->next;
   if (front == NULL) rear = NULL;   // queue became empty
   delete temp;
   return value;
}
void removeAll()
{
   while (!isEmpty())
      cout << "dequeued " << dequeue() << endl;
}
int main()
{
   Queue q;
   if (q.isEmpty()) cout << "Queue is empty" << endl;
   q.enqueue(30);
   q.enqueue(50);        // front -> 30 -> 50 <- rear
   q.removeAll();        // dequeued 30, dequeued 50
   return 0;
}` },
        { h: `Lab 7: struct-based linked queue dequeue`, code: `node *front = NULL;
node *rear = NULL;
void dequeue()                          // remove from beginning
{
   if (front == NULL && rear == NULL) cout << "Queue Underflow\\n";
   else
   {
      node *temp;
      if (front->next != NULL)          // more than 1 item
      { temp = front; front = front->next;
        cout << "The deleted element is " << temp->data << endl;
        delete (temp); }
      else                              // only one item
      { cout << "The deleted element is " << front->data << endl;
        front = rear = NULL; }
   }
}` }
      ],
      cards: [
        [`Linked queue`, `A queue implemented with a linked list; insert at rear, delete at front.`],
        [`Pointers of a linked queue`, `front (head) and rear (tail), both NULL initially.`],
        [`Enqueue (non-empty)`, `rear->next = newnode; rear = newnode;`],
        [`Enqueue (empty)`, `front = newnode; rear = newnode;`],
        [`Dequeue`, `temp = front; front = front->next; delete temp;`],
        [`Linked queue empty condition`, `front == NULL (lecture: front == NULL && rear == NULL)`],
        [`Inserted 10, 15, 22, 50: which node is front?`, `10 (rear points to 50).`],
        [`Where is insertion done in a linked queue?`, `At the rear (end of the list).`],
        [`What must happen when the last node is dequeued?`, `Set rear = NULL too (front = rear = NULL).`],
        [`Advantage over the array queue`, `No fixed size; works for an unlimited number of values.`],
        [`Display order of a linked queue`, `From front to rear (insertion order).`],
        [`newnode->next in enqueue`, `NULL, since the new node becomes the last node.`]
      ],
      qa: [
        [`Explain the enqueue steps in a linked queue.`, `1) Create newNode with the value and set newNode->next = NULL. 2) Check whether the queue is empty (rear == NULL). 3) If empty, set front = newNode and rear = newNode. 4) If not empty, set rear->next = newNode and rear = newNode.`],
        [`Explain the dequeue steps in a linked queue.`, `1) Check whether the queue is empty (front == NULL). 2) If empty, display "Queue is Empty!!! Deletion is not possible" and terminate. 3) If not, define temp = front. 4) Set front = front->next and delete temp (and if front became NULL, set rear = NULL).`],
        [`Write a node class, a linked queue class and a function to insert 25 and 20, with main (Exam 2025/26).`, `class Node{ public: int data; Node *next; Node(){ data=0; next=NULL; } };<br>class Queue{ Node *front, *rear; public: Queue(){ front=rear=NULL; } bool isEmpty(){ return front==NULL; } void enqueue(int item){ Node *n=new Node(); n->data=item; n->next=NULL; if(isEmpty()){ front=rear=n; } else { rear->next=n; rear=n; } } };<br>int main(){ Queue q; q.enqueue(25); q.enqueue(20); }  // front -> 25 -> 20 &lt;- rear`],
        [`Compare a linked stack and a linked queue.`, `Linked stack: one pointer (top); push and pop both at the beginning; LIFO. Linked queue: two pointers (front and rear); enqueue at the rear (end), dequeue at the front (beginning); FIFO. Both have no fixed size.`]
      ],
      quiz: [
        { q: `True or False: "Insertion is done at the front of a linked queue."`, o: [
          [`True`, `Wrong. Insertion is at the rear.`],
          [`False`, `Correct. Enqueue inserts at the rear; deletion is at the front.`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `In a linked queue the last inserted node is always pointed to by:`, o: [
          [`front`, `front points to the first inserted node.`],
          [`top`, `top belongs to a stack.`],
          [`rear`, `Correct.`],
          [`head`, `head = front.`]
        ], a: 2 },
        { q: `Which statements enqueue newnode into a NON-empty linked queue?`, o: [
          [`newnode->next = front; front = newnode;`, `That inserts at the front (stack push).`],
          [`rear->next = newnode; rear = newnode;`, `Correct.`],
          [`rear = newnode; rear->next = newnode;`, `Wrong order: the old last node is never linked and newnode points to itself.`],
          [`front->next = newnode;`, `This puts it second and loses nodes.`]
        ], a: 1 },
        { q: `Enqueue 10, 15, 22, 50; dequeue twice; enqueue 7. Display prints:`, o: [
          [`22 50 7`, `Correct. 10 and 15 leave first (FIFO), 7 joins at the rear.`],
          [`7 22 50`, `7 is added at the rear, not the front.`],
          [`10 15 7`, `Dequeue removes from the front, i.e. 10 and 15.`],
          [`50 22 7`, `A queue keeps insertion order.`]
        ], a: 0 },
        { q: `How many pointers does a linked queue keep?`, o: [
          [`One (top)`, `That is a linked stack.`],
          [`Two (front and rear)`, `Correct.`],
          [`Three (front, rear, top)`, `There is no top.`],
          [`None`, `It needs pointers to reach the nodes.`]
        ], a: 1 },
        { q: `In the lecture's dequeue, after the only node is deleted, what goes wrong with isEmpty() (front==NULL && rear==NULL)?`, o: [
          [`Nothing, it returns true`, `rear was not changed, so it still points to the deleted node.`],
          [`It returns false because rear still points to the deleted node`, `Correct. Set rear = NULL when front becomes NULL (Lab 7 does front = rear = NULL).`],
          [`It crashes immediately`, `isEmpty only compares pointers.`],
          [`front is not NULL`, `front = front->next makes it NULL.`]
        ], a: 1 }
      ]
    },

    /* ───────────────────────── LECTURE 8 ───────────────────────── */
    {
      n: 8, title: `Doubly Linked Lists`,
      notes: [
        { h: `Singly vs doubly linked list`, pts: [
          `A linked list consists of connected nodes. In a <b>singly</b> linked list each node has data and a pointer to the next node only, so we travel in <b>one direction</b> (forward).`,
          `A <b>doubly linked list</b> node has <b>data</b>, a pointer to the <b>next</b> node and a pointer to the <b>previous</b> node, so we can travel in <b>both directions</b>, forward and backward.`,
          `Node fields: <b>Data</b> (value), <b>prev</b> (pointer to the previous node), <b>next</b> (pointer to the next node). The first node's prev and the last node's next are NULL.`,
          `Cost: extra memory for the prev pointer, and every insert/delete must update <b>both</b> next and prev links.`
        ]},
        { h: `Node and list classes (professor's code)`, code: `class Node
{
public:
   int data;
   Node *next;
   Node *prev;
   Node() { data = 0; next = NULL; prev = NULL; }
};
class Linkedlist
{
public:
   Node *head;
   Linkedlist() { head = NULL; }
   bool isEmpty() { if (head == NULL) return true; else return false; }
   bool isFull()
   { Node *newnode = new Node();
     if (newnode == NULL) return true; else return false; }
};` },
        { h: `Insertion: beginning and end (professor's code)`, code: `void insertatbeginning(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   if (isEmpty())
   { newnode->next = NULL; newnode->prev = NULL; head = newnode; }
   else
   { newnode->next = head;
     newnode->prev = NULL;
     head->prev = newnode;      // old first node points back to new node
     head = newnode; }
}
void insertatend(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   newnode->next = NULL;
   Node *temp1 = head;
   while (temp1->next != NULL) temp1 = temp1->next;   // last node
   temp1->next = newnode;
   newnode->prev = temp1;
}` },
        { h: `Insert in order (safe version, tested with g++)`, code: `// The slide's insertsorted uses the same loop as the singly list and then:
//   newnode->next = temp1->next; temp1->next = newnode;
//   newnode->prev = temp1;       newnode->next->prev = newnode;
// It fails when the new value is smaller than the head or larger than the last node.
void insertsorted(int item)
{
   Node *newnode = new Node();
   newnode->data = item;
   if (isEmpty())
      head = newnode;
   else if (item < head->data)          // new first node
   {
      newnode->next = head;
      head->prev = newnode;
      head = newnode;
   }
   else
   {
      Node *temp = head;
      while (temp->next != NULL && temp->next->data < item)
         temp = temp->next;
      newnode->next = temp->next;
      newnode->prev = temp;
      if (temp->next != NULL) temp->next->prev = newnode;
      temp->next = newnode;
   }
}
// insert 30,10,20,5,40,25  => forward 5 10 20 25 30 40, backward 40 30 25 20 10 5` },
        { h: `Deletion (professor's code)`, code: `int deletefrombeginning()
{
   int value;
   Node *temp = head;
   if (isEmpty()) { cout << "Empty" << endl; return 0; }
   else
   { value = head->data;
     head = head->next;
     head->prev = NULL;      // (crashes if it was the only node: check head != NULL)
     delete(temp);
     return (value); }
}
// deletefromend is the same as in the singly list (temp2->next = NULL)

void deleteitem(int value)
{
   if (isEmpty()) cout << "empty";
   else if (search(value))
   {
      Node *temp1 = head, *temp2 = NULL;
      if (head->data == value)
      {
         if (head->next == NULL) { head = NULL; delete (temp1); }
         else { head = head->next; head->prev = NULL; delete temp1; }
      }
      else
      {
         while ((temp1->data != value) && (temp1 != NULL))
         { temp2 = temp1; temp1 = temp1->next; }
         if (temp1->next == NULL)              // deleting the last node
         { temp2->next = NULL; delete temp1; }
         else                                  // interior node
         { temp2->next = temp1->next;
           temp1->next->prev = temp1->prev;
           delete(temp1); }
      }
   }
   else cout << "not found";
}` },
        { h: `Remove all items (exam pattern, tested)`, code: `void removeAll()
{
   if (isEmpty()) { cout << "List is empty" << endl; return; }
   while (head != NULL)
   {
      Node *temp = head;
      head = head->next;
      if (head != NULL) head->prev = NULL;
      delete temp;
   }
}` },
        { h: `Lab 8: list with head and tail`, pts: [
          `The lab keeps <b>two pointers, head and tail</b>, so <code>insertLast</code> does not need a loop: <code>newnode-&gt;prev = tail; tail-&gt;next = newnode; tail = newnode;</code>`,
          `<code>removeLast</code>: <code>delnode = tail; tail-&gt;prev-&gt;next = NULL; tail = tail-&gt;prev; delete delnode;</code>`,
          `<code>displayBackward</code> starts at tail and follows prev; only possible because of the prev pointers.`,
          `Lab main: insertFirst(10), insertLast(20), insertLast(30), insertFirst(100), insertFirst(200) → 200 100 10 20 30; removeFirst → 100 10 20 30; removeLast → 100 10 20; insertAtPosition(1000,2) → 100 1000 10 20; insertAtPosition(2000,4) → 100 1000 10 2000 20; insertAtPosition(5,1) → 5 100 1000 10 2000 20 (assuming <code>current</code> starts at 1; the lab code forgets to initialize it).`
        ]}
      ],
      cards: [
        [`Doubly linked list node fields`, `data, prev, next.`],
        [`Advantage of a doubly linked list`, `Traversal in both directions (forward and backward).`],
        [`Disadvantage of a doubly linked list`, `Extra memory for the prev pointer; more links to update.`],
        [`Insert at beginning (non-empty)`, `newnode->next = head; newnode->prev = NULL; head->prev = newnode; head = newnode;`],
        [`Insert at end`, `last->next = newnode; newnode->prev = last; newnode->next = NULL;`],
        [`Insert after temp (interior)`, `newnode->next = temp->next; newnode->prev = temp; temp->next->prev = newnode; temp->next = newnode;`],
        [`Delete first node`, `head = head->next; head->prev = NULL; delete old head.`],
        [`Delete interior node temp1 (previous = temp2)`, `temp2->next = temp1->next; temp1->next->prev = temp1->prev; delete temp1;`],
        [`First node's prev`, `NULL`],
        [`Three insertion places`, `Beginning, end, a position within the list.`],
        [`Three deletion places`, `Beginning, end, a specific node.`],
        [`Why does Lab 8 keep tail?`, `To insert/remove at the end and display backward without traversing.`]
      ],
      qa: [
        [`Define a doubly linked list and compare it with a singly linked list.`, `A doubly linked list is made of nodes holding data, a pointer to the next node and a pointer to the previous node, so it can be traversed forward and backward. A singly linked list node has only data and next, so it is traversed forward only. The doubly list uses extra memory for prev and needs more pointer updates on insert/delete.`],
        [`Write the function to insert a node at the beginning of a doubly linked list.`, `void insertatbeginning(int item){ Node *newnode=new Node(); newnode->data=item; if(isEmpty()){ newnode->next=NULL; newnode->prev=NULL; head=newnode; } else { newnode->next=head; newnode->prev=NULL; head->prev=newnode; head=newnode; } }`],
        [`Write a function to insert a new node in its order in a doubly linked list.`, `if empty: head = newnode. else if item &lt; head->data: newnode->next = head; head->prev = newnode; head = newnode. else: temp = head; while(temp->next != NULL &amp;&amp; temp->next->data &lt; item) temp = temp->next; newnode->next = temp->next; newnode->prev = temp; if(temp->next != NULL) temp->next->prev = newnode; temp->next = newnode;`],
        [`Explain the deletion of an interior node in a doubly linked list.`, `Traverse until temp1 is the node to delete and temp2 the node before it. Link around it in both directions: temp2->next = temp1->next and temp1->next->prev = temp1->prev (= temp2). Then delete temp1. If temp1 is the last node, only temp2->next = NULL is needed.`],
        [`Write a program to remove all the items from a doubly linked list, checking if it is empty (Exam 2024/25).`, `void removeAll(){ if(isEmpty()){ cout&lt;&lt;"List is empty"; return; } while(head != NULL){ Node *temp = head; head = head->next; if(head != NULL) head->prev = NULL; delete temp; } }`]
      ],
      quiz: [
        { q: `True or False: "On inserting a new node N in a doubly linked list, N->next = NULL is a must."`, o: [
          [`True`, `Wrong. Only when N becomes the last node.`],
          [`False`, `Correct. When inserting at the beginning or in the middle, N->next points to the following node; it is NULL only when inserting at the end (or into an empty list).`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `A doubly linked list node contains:`, o: [
          [`data and next`, `That is a singly linked node.`],
          [`data, next and prev`, `Correct.`],
          [`data and prev only`, `It also needs next.`],
          [`next and prev only`, `It must hold data.`]
        ], a: 1 },
        { q: `Which statement is missing when inserting at the beginning of a non-empty doubly list? <code>newnode->next = head; newnode->prev = NULL; ____; head = newnode;</code>`, o: [
          [`head->next = newnode;`, `That would make the old head point forward to the new node.`],
          [`head->prev = newnode;`, `Correct. The old first node must point back to the new node.`],
          [`newnode->next->next = NULL;`, `This would cut the list.`],
          [`head = NULL;`, `This loses the list.`]
        ], a: 1 },
        { q: `Which traversal is possible in a doubly linked list but not in a singly linked list?`, o: [
          [`Forward from head`, `Both support forward traversal.`],
          [`Backward from the last node`, `Correct. The prev pointers allow it.`],
          [`Counting nodes`, `Both can count.`],
          [`Searching for a value`, `Both can search.`]
        ], a: 1 },
        { q: `In deleteitem for an interior node temp1 (temp2 is before it), which pair of statements relinks the list?`, o: [
          [`temp2->next = temp1->next; temp1->next->prev = temp1->prev;`, `Correct (professor's code).`],
          [`temp2->prev = temp1; temp1->prev = temp2;`, `This does not bypass temp1.`],
          [`temp1->next = temp2; temp2->next = NULL;`, `This cuts the list.`],
          [`head = temp1->next;`, `Only for deleting the first node.`]
        ], a: 0 }
      ]
    },

    /* ───────────────────────── LECTURE 9 ───────────────────────── */
    {
      n: 9, title: `Trees and Binary Search Trees`,
      notes: [
        { h: `Parts of a tree`, pts: [
          `A tree is a <b>non-linear (hierarchical)</b> data structure of <b>nodes</b>.`,
          `<b>Root node</b>: the top node with no parent. <b>Parent</b> node and its <b>child</b> nodes. <b>Leaf (terminal) nodes</b>: nodes with no children. <b>Internal node</b>: a node with at least one child. <b>Sub-tree</b>: a node together with all its descendants.`,
          `<b>Binary tree</b>: each node has <b>at most 2 children</b> (left and right).`,
          `<b>Binary Search Tree (BST)</b>: a binary tree such that (1) every node has a <b>unique key</b>; (2) all keys in the <b>left subtree</b> of a node are <b>less</b> than the node's key; (3) all keys in the <b>right subtree</b> are <b>greater</b>.`
        ]},
        { h: `Traversals`, table: [
          [`Traversal`, `Order`, `Memory aid`],
          [`Inorder`, `Left subtree → parent → right subtree`, `L P R; on a BST gives the keys in ascending (sorted) order`],
          [`Preorder`, `Parent → left subtree → right subtree`, `P L R; root printed first`],
          [`Postorder`, `Left subtree → right subtree → parent`, `L R P; root printed last`],
          [`(Reverse inorder)`, `Right → parent → left`, `On a BST gives descending order`]
        ]},
        { h: `Lecture example trees (checked with g++)`, formula: [
          `Tree 1: 43; 31(20(-,28), 40(33,-)); 64(56(47,59), 89)`,
          `Inorder:   20 28 31 33 40 43 47 56 59 64 89`,
          `Preorder:  43 31 20 28 40 33 64 56 47 59 89`,
          `Postorder: 28 20 33 40 31 47 59 56 89 64 43`,
          `Tree 2 (insert 50,25,65,12,33,70,55,60,53): 50; 25(12,33); 65(55(53,60),70)`,
          `Preorder:  50 25 12 33 65 55 53 60 70`,
          `Inorder:   12 25 33 50 53 55 60 65 70`,
          `Postorder: 12 33 25 53 60 55 70 65 50`
        ]},
        { h: `Node, Tree and traversal code (professor's code)`, code: `class Node
{
public:
   int data;
   Node *left;
   Node *right;
   Node() { data = 0; left = right = NULL; }
};
class Tree
{
public:
   Node *root;
   Tree() { root = NULL; }
};
void inorder(Node *temp)      // sorted order for a BST
{
   if (temp == NULL) { return; }
   inorder(temp->left);
   cout << temp->data << "\\t";
   inorder(temp->right);
}
void preorder(Node *temp)
{
   if (temp == NULL) { return; }
   cout << temp->data << "\\t";
   preorder(temp->left);
   preorder(temp->right);
}
void postorder(Node *temp)
{
   if (temp == NULL) { return; }
   postorder(temp->left);
   postorder(temp->right);
   cout << temp->data << "\\t";
}` },
        { h: `Insertion`, pts: [
          `Steps: create a new node for the item; find the appropriate parent node; attach the new node as a <b>leaf</b> (left or right according to its key).`,
          `Recursive version: parameters are a pointer to the current node (initially the root) and the item. If the current node is NULL, create a new node and return it. Else if the item is less (greater) than the current key, recurse on the left (right) child and set the parent's left (right) link to the result.`,
          `Example: inserting 57 into tree 1: 57 &gt; 43 → right; 57 &lt; 64 → left; 57 &gt; 56 → right; 57 &lt; 59 → becomes the <b>left child of 59</b>.`,
          `Example: inserting 0.9 into the tree with root 1.0: 0.9 &lt; 1.0 → left (0.6); 0.9 &gt; 0.6 → right (0.8); 0.9 &gt; 0.8 → right child of 0.8.`,
          `The <b>shape</b> depends on the insertion order; inserting already sorted keys gives a degenerate (linked-list-like) tree.`
        ]},
        { h: `insert, search, minimum, maximum (professor's code)`, code: `Node* insert(Node *temp, int item)
{
   if (temp == NULL)
   {
      Node *newnode = new Node();
      newnode->data = item;
      temp = newnode;
   }
   else if (item < temp->data) temp->left = insert(temp->left, item);
   else temp->right = insert(temp->right, item);
   return temp;
}
// call: list.root = list.insert(list.root, a[i]);

bool search(Node *temp, int item)
{
   if (temp == NULL) return false;
   else if (item == temp->data) return true;
   else if (item < temp->data) return search(temp->left, item);
   else return search(temp->right, item);
}   // (the slide omits "return" before the recursive calls; it is needed)

Node* minimum(Node *temp)       // leftmost node
{
   if (temp == NULL) return NULL;
   else if (temp->left == NULL) return temp;
   else return minimum(temp->left);
}
Node* maximum(Node *temp)       // rightmost node
{
   if (temp == NULL) return NULL;
   else if (temp->right == NULL) return temp;
   else return maximum(temp->right);
}` },
        { h: `Searching and deletion`, pts: [
          `<b>Search</b>: if the target key is less than the current key, search the left subtree; if greater, search the right subtree; if equal, found (return the node / true); if NULL is reached, not found.`,
          `Find 0.7 in the 1.0 tree: 1.0 → 0.6 → 0.8 → 0.7 found. Find 0.5: 1.0 → 0.6 → 0.3 → 0.4 → NULL, not found.`,
          `<b>Delete</b> cases: (1) leaf: just remove it; (2) one child: replace the node by its child; (3) two children: replace the key by its inorder successor (minimum of the right subtree) or predecessor (maximum of the left subtree), then delete that node.`,
          `The slide's <code>deleteitem</code> handles a leaf and a node with one child by copying the child's data and deleting the child (correct only if that child is a leaf); it does not handle two children. In an exam, describe the three standard cases.`
        ]}
      ],
      cards: [
        [`Root`, `The top node of a tree, with no parent.`],
        [`Leaf`, `A node with no children (terminal node).`],
        [`Binary tree`, `Each node has at most 2 children.`],
        [`BST rule`, `Left subtree keys &lt; node key &lt; right subtree keys; keys unique.`],
        [`Inorder`, `Left, parent, right.`],
        [`Preorder`, `Parent, left, right.`],
        [`Postorder`, `Left, right, parent.`],
        [`Inorder of a BST gives`, `Keys in ascending (sorted) order.`],
        [`Right, root, left on a BST gives`, `Descending order.`],
        [`Pre-order = post-order output when`, `The tree has only one node.`],
        [`Where is a new key inserted in a BST?`, `As a leaf, found by moving left (smaller) or right (larger) from the root.`],
        [`Minimum of a BST`, `The leftmost node.`],
        [`Maximum of a BST`, `The rightmost node.`],
        [`Tree node fields`, `data, left, right.`],
        [`Search 0.5 in the 1.0 tree path`, `1.0 → 0.6 → 0.3 → 0.4 → NULL (not found).`],
        [`Delete a node with two children`, `Replace with inorder successor (min of right subtree) or predecessor, then delete that node.`]
      ],
      qa: [
        [`Define a binary search tree.`, `A binary tree (each node at most two children) in which every node has a unique key, all keys in the left subtree of a node are less than the node's key, and all keys in the right subtree are greater.`],
        [`Explain the three traversal methods and give the result for the tree 50(25(12,33), 65(55(53,60),70)).`, `Inorder: left, parent, right → 12 25 33 50 53 55 60 65 70. Preorder: parent, left, right → 50 25 12 33 65 55 53 60 70. Postorder: left, right, parent → 12 33 25 53 60 55 70 65 50. The name depends on when the parent is visited.`],
        [`Explain insertion in a BST.`, `Create a new node for the item, find the appropriate parent by comparing with keys from the root (go left if smaller, right if larger), and attach the new node as a leaf. Recursively: if current is NULL create and return a new node; else set current->left = insert(current->left, item) or current->right = insert(current->right, item) and return current.`],
        [`Write C++ functions for preorder, inorder and postorder traversal.`, `void preorder(Node *t){ if(t==NULL) return; cout&lt;&lt;t->data; preorder(t->left); preorder(t->right); }<br>void inorder(Node *t){ if(t==NULL) return; inorder(t->left); cout&lt;&lt;t->data; inorder(t->right); }<br>void postorder(Node *t){ if(t==NULL) return; postorder(t->left); postorder(t->right); cout&lt;&lt;t->data; }`],
        [`Explain how to search for a key in a BST and how to find the minimum and maximum.`, `Compare the key with the current node: equal → found; smaller → search the left subtree; larger → search the right subtree; NULL → not found. Minimum: keep going left until left is NULL. Maximum: keep going right until right is NULL.`],
        [`Explain the cases of deleting a node from a BST.`, `Leaf: remove it and set the parent's link to NULL. One child: link the parent directly to that child. Two children: copy the inorder successor (smallest key in the right subtree) into the node and delete the successor (which has at most one child).`]
      ],
      quiz: [
        { q: `If a Binary Search Tree is traversed in the order right, root, left recursively, the output sequence will be in:`, o: [
          [`Ascending order`, `Ascending is left, root, right (inorder).`],
          [`Descending order`, `Correct. Larger keys are on the right, so visiting right first gives descending order.`],
          [`No specific order`, `The BST property guarantees an order.`],
          [`Right, root, left cannot be done`, `It can be done; it is reverse inorder.`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `When the pre-order and post-order traversals of a binary tree generate the same output, the tree has:`, o: [
          [`Two nodes`, `With two nodes the root is first in preorder and last in postorder, so they differ.`],
          [`Only one node`, `Correct. Only a single node is both first and last.`],
          [`Three nodes`, `The root position differs.`],
          [`Any number of nodes`, `Only true for one node (or an empty tree).`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `What are the numbers of nodes in the left and right subtrees of the BST if the data is inserted in the order: 45, 15, 8, 56, 5, 65, 47, 12, 18, 10, 73, 50, 16, 61?`, o: [
          [`8 left and 5 right`, `Count keys less than 45: there are 7.`],
          [`6 left and 7 right`, `Reversed counts.`],
          [`7 left and 6 right`, `Correct. Less than 45: 15, 8, 5, 12, 18, 10, 16 (7). Greater: 56, 65, 47, 73, 50, 61 (6). Verified with g++.`],
          [`5 left and 8 right`, `Count again: 7 and 6.`]
        ], a: 2, src: `Exam 2022/23` },
        { q: `True or False: "To print the keys of a binary search tree in ascending order, you may apply inorder or postorder traversals."`, o: [
          [`True`, `Wrong. Postorder does not give sorted output.`],
          [`False`, `Correct. Only inorder gives ascending order.`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `True or False: "Left-Right-Parent represents the postorder traversal of a binary tree."`, o: [
          [`True`, `Correct. Postorder visits the parent last.`],
          [`False`, `Wrong. L R P is exactly postorder.`]
        ], a: 0, src: `Exam 2022/23` },
        { q: `For the tree 43; 31(20(-,28), 40(33,-)); 64(56(47,59), 89), the preorder traversal is:`, o: [
          [`43 31 20 28 40 33 64 56 47 59 89`, `Correct (lecture example).`],
          [`20 28 31 33 40 43 47 56 59 64 89`, `That is inorder.`],
          [`28 20 33 40 31 47 59 56 89 64 43`, `That is postorder.`],
          [`43 31 64 20 40 56 89 28 33 47 59`, `That is level order, not taught as preorder.`]
        ], a: 0, src: `Exam 2023/24 Summer` },
        { q: `For the tree 50; 25(12,33); 65(55(53,60),70), the postorder traversal is:`, o: [
          [`12 25 33 50 53 55 60 65 70`, `That is inorder.`],
          [`50 25 12 33 65 55 53 60 70`, `That is preorder.`],
          [`12 33 25 53 60 55 70 65 50`, `Correct. Left, right, then parent; the root 50 is last.`],
          [`12 33 25 50 53 60 55 70 65`, `The root must come last in postorder.`]
        ], a: 2, src: `Exam 2023/24 Summer` },
        { q: `For the tree F; B(A, D(C, E)); G(-, I(H, -)), the postorder traversal is:`, o: [
          [`A B C D E F G H I`, `That is inorder.`],
          [`F B A D C E G I H`, `That is preorder.`],
          [`A C E D B H I G F`, `Correct. Checked with g++.`],
          [`A C D E B H I G F`, `D must come after both its children C and E.`]
        ], a: 2, src: `Exam 2025/26` },
        { q: `Inserting 57 into the BST 43; 31(…); 64(56(47,59), 89) makes 57:`, o: [
          [`The right child of 56`, `56 already has a right child (59), so we continue down to 59.`],
          [`The left child of 59`, `Correct. 57 &gt; 43 → 64; 57 &lt; 64 → 56; 57 &gt; 56 → 59; 57 &lt; 59 → left of 59.`],
          [`The left child of 89`, `57 &lt; 64, so it never reaches 89.`],
          [`The new root`, `New keys are always attached as leaves.`]
        ], a: 1, src: `Lecture 9 example` },
        { q: `Which node holds the minimum key of a BST?`, o: [
          [`The root`, `The root is only the minimum if it has no left child.`],
          [`The leftmost node`, `Correct. minimum() keeps moving left until left is NULL.`],
          [`The rightmost node`, `That is the maximum.`],
          [`Any leaf`, `Not every leaf is the minimum.`]
        ], a: 1 },
        { q: `In a binary tree, each node has:`, o: [
          [`Exactly 2 children`, `Leaves have none; some nodes have one.`],
          [`At most 2 children`, `Correct.`],
          [`At least 2 children`, `Leaves have no children.`],
          [`Any number of children`, `That is a general tree.`]
        ], a: 1 }
      ]
    },

    /* ───────────────────────── LECTURE 10 ───────────────────────── */
    {
      n: 10, title: `Hashing`,
      notes: [
        { h: `What is hashing?`, pts: [
          `A <b>hash table</b> is a data structure that can be considered as an <b>array of fixed size</b>; each element is identified by an index from 0 to (table size - 1). It is sometimes called a <b>scatter table</b>, because data is scattered throughout the table.`,
          `Each key is mapped into a hash number in the range 0 to (table size - 1) and placed in that cell. This mapping is the <b>hash function H</b>; it should give different keys different cells and <b>distribute elements evenly</b>.`,
          `A hash function H takes a <b>key as input</b> and transforms it into a hash table <b>index</b>. The same hash value is used for both <b>storing and retrieving</b>.`,
          `<b>Collision</b>: when the hash function maps two different keys k and j to the <b>same cell</b>.`,
          `Hash tables do <b>not</b> keep keys in sorted order: positions depend on the hash function (Lecture 10 is titled "Searching Techniques: Hashing").`
        ]},
        { h: `Types of hash function`, table: [
          [`Method`, `How`, `Example`],
          [`Truncation`, `Take only part of the key (e.g. rightmost or leftmost 3 digits for a table of size 1000). Simplest, but more collisions`, `987456, 125978, 963294 → 456, 978, 294`],
          [`Folding`, `Break the key into groups of digits (say 3) and add them; truncate if the table is small (digits may also be multiplied)`, `143765980 → 143 + 765 + 980 = 1888`],
          [`Mid square`, `Square the key and take the middle 2 or 3 digits`, `456² = 207936 → 79; 978² = 956484 → 64`],
          [`Division`, `Key mod table size (remainder) is the address; one of the best methods`, `5, 17, 37, 20, 42, 3 mod 9 → 5, 8, 1, 2, 6, 3`]
        ]},
        { h: `Collision resolution techniques`, pts: [
          `Five techniques: <b>linear probing</b>, <b>quadratic probing</b>, <b>double hashing</b>, <b>rehashing</b>, <b>extendible hashing</b> (the first three are studied), plus <b>separate chaining</b>.`,
          `<b>Linear probing</b>: place the colliding record in the <b>next available empty position</b>, searching sequentially: <b>h(k, i) = (h1(k) + i) mod m</b>, i = 0, 1, 2, … where m = table size and h1 = primary hash function. To search, start at the hash address and continue linearly.`,
          `<b>Quadratic probing</b>: on the 1st collision look h+1 ahead, 2nd h+4, 3rd h+9 … (h + i²). The lecture's formula and worked example use <b>h(k, i) = (h1(k) + i + i²) mod m</b> (i = 1 → +2, i = 2 → +6). Use the lecture's formula in the exam and state it.`,
          `<b>Double hashing</b>: two hash functions; when the first collides the second resolves it: <b>h(k, i) = (h1(k) + i·h2(k)) mod m</b>. Lecture example: h1 = k mod 13, h2 = 1 + (k mod 11).`,
          `<b>Separate chaining</b>: an <b>array of pointers</b>; each points to a <b>linked list</b> of the keys with the same hash address. On a collision a new link is added to the chain. Handles an <b>unlimited number of collisions</b> and needs <b>no prior knowledge</b> of how many elements will be stored.`
        ]},
        { h: `Linear probing example (keys 18, 72, 65, 34, 13; size 7)`, formula: [
          `h1(k) = k mod 7`,
          `18: h(18,0) = 4 → slot 4`,
          `72: h(72,0) = 2 → slot 2`,
          `65: h(65,0) = 2 collision; h(65,1) = (2+1) mod 7 = 3 → slot 3`,
          `34: h(34,0) = 6 → slot 6`,
          `13: h(13,0) = 6 collision; h(13,1) = (6+1) mod 7 = 0 → slot 0`,
          `Table: [0]=13, [1]=–, [2]=72, [3]=65, [4]=18, [5]=–, [6]=34`
        ]},
        { h: `Quadratic probing example (same keys, lecture formula h1 + i + i²)`, formula: [
          `18 → 4; 72 → 2`,
          `65: i=0 → 2 collision; i=1 → (2+1+1) mod 7 = 4 collision; i=2 → (2+2+4) mod 7 = 1 → slot 1`,
          `34 → 6`,
          `13: i=0 → 6 collision; i=1 → (6+2) mod 7 = 1 collision; i=2 → (6+6) mod 7 = 5 → slot 5`,
          `Table: [0]=–, [1]=65, [2]=72, [3]=–, [4]=18, [5]=13, [6]=34`
        ]},
        { h: `Double hashing example (69, 79, 72, 98, 14; size 13)`, formula: [
          `h(k,i) = (k mod 13 + i·(1 + k mod 11)) mod 13`,
          `69 → 69 mod 13 = 4; 79 → 1; 72 → 7`,
          `98: i=0 → 7 collision; h2 = 1 + 98 mod 11 = 11; i=1 → (7+11) mod 13 = 5 → slot 5`,
          `14: i=0 → 1 collision; h2 = 1 + 14 mod 11 = 4; i=1 → 5 collision; i=2 → (1+8) mod 13 = 9 → slot 9`,
          `Table: [1]=79, [4]=69, [5]=98, [7]=72, [9]=14`
        ]},
        { h: `Separate chaining example (18, 72, 65, 34, 13; size 7)`, formula: [
          `h(k) = k mod n: addresses 4, 2, 2, 6, 6`,
          `[0] → NULL`,
          `[1] → NULL`,
          `[2] → 72 → 65 → NULL`,
          `[3] → NULL`,
          `[4] → 18 → NULL`,
          `[5] → NULL`,
          `[6] → 34 → 13 → NULL`
        ]}
      ],
      cards: [
        [`Hash table`, `A fixed-size array where each key is stored at the index computed by a hash function (also called a scatter table).`],
        [`Hash function`, `A function H that transforms a key into a table index in 0..size-1.`],
        [`Collision`, `When the hash function maps two different keys to the same cell.`],
        [`Four types of hash function`, `Truncation, folding, mid square, division.`],
        [`Truncation`, `Use only part of the key (e.g. last 3 digits). More collisions.`],
        [`Folding`, `Split the key into digit groups and add them: 143765980 → 1888.`],
        [`Mid square`, `Square the key and take the middle digits: 456 → 207936 → 79.`],
        [`Division method`, `Address = key mod table size; one of the best methods.`],
        [`Linear probing formula`, `h(k,i) = (h1(k) + i) mod m`],
        [`Quadratic probing (lecture formula)`, `h(k,i) = (h1(k) + i + i²) mod m`],
        [`Double hashing formula`, `h(k,i) = (h1(k) + i·h2(k)) mod m`],
        [`Five collision resolution techniques`, `Linear probing, quadratic probing, double hashing, rehashing, extendible hashing.`],
        [`Separate chaining`, `Array of pointers to linked lists; keys with the same address are chained.`],
        [`Advantage of separate chaining`, `Unlimited collisions per address; no prior knowledge of the number of elements needed.`],
        [`Why use a prime table size (7, 11, 13)?`, `Spreads keys more evenly with the mod function.`],
        [`Do hash tables store keys in order?`, `No; positions depend on the hash function.`]
      ],
      qa: [
        [`Define hashing, hash function and collision.`, `Hashing stores elements in a fixed-size array (hash table, scatter table) at an index computed from the key. The hash function H takes a key and transforms it into an index from 0 to table size - 1, ideally distributing keys evenly; the same function is used to store and retrieve. A collision occurs when the hash function maps two different keys to the same cell.`],
        [`Explain the four types of hash functions with examples.`, `Truncation: take part of the key (987456 → 456 for size 1000), simple but many collisions. Folding: split into groups and add (143765980 → 143+765+980 = 1888). Mid square: square and take the middle digits (456² = 207936 → 79). Division: key mod table size (17 mod 9 = 8), one of the best methods.`],
        [`List the collision resolution techniques and explain linear probing.`, `Linear probing, quadratic probing, double hashing, rehashing, extendible hashing (and separate chaining). Linear probing places a colliding key in the next available empty cell searching sequentially: h(k,i) = (h1(k)+i) mod m, i = 0,1,2,…; searching also starts at the hash address and continues linearly.`],
        [`Compare linear probing, quadratic probing and double hashing.`, `All are open addressing. Linear probing steps 1, 2, 3 … cells ahead ((h1+i) mod m), which causes clustering. Quadratic probing jumps further each time (lecture: (h1+i+i²) mod m), reducing clustering. Double hashing uses a second hash function for the step size ((h1 + i·h2) mod m), so different keys get different probe sequences.`],
        [`Explain separate chaining and its advantages.`, `The table is an array of pointers, each pointing to a linked list holding all keys with that hash address. On a collision the key is added to that chain. It handles an unlimited number of collisions at the same address and needs no prior knowledge of how many elements will be stored.`],
        [`Store 5, 17, 37, 20, 42, 3 in an array of size 9 using the division method, then insert 11.`, `5 mod 9 = 5, 17 mod 9 = 8, 37 mod 9 = 1, 20 mod 9 = 2, 42 mod 9 = 6, 3 mod 9 = 3. Table: [1]=37, [2]=20, [3]=3, [5]=5, [6]=42, [8]=17. 11 mod 9 = 2 is occupied by 20: a collision, which must be resolved (e.g. linear probing puts 11 in slot 4; chaining links it after 20).`]
      ],
      quiz: [
        { q: `True or False: "Hash tables store keys in ordered locations."`, o: [
          [`True`, `Wrong. Hashing scatters keys.`],
          [`False`, `Correct. Keys are scattered according to the hash function, not sorted (hence "scatter table").`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `True or False: "When a hash function computes the same location for two or more keys, this is a collision situation."`, o: [
          [`True`, `Correct. This is the definition of collision.`],
          [`False`, `Wrong. Same location for different keys is a collision.`]
        ], a: 0, src: `Exam 2022/23` },
        { q: `Using the division method with table size 11, key 25 hashes to:`, o: [
          [`2`, `25 mod 11 = 3, not 2.`],
          [`3`, `Correct. 25 = 2·11 + 3.`],
          [`11`, `Indices only go up to 10.`],
          [`25`, `That is the key itself.`]
        ], a: 1, src: `Exam 2022/23` },
        { q: `Keys 14, 17, 25, 37, 34, 16 are stored in a table of size 11 with division and linear probing. Where is 16 stored?`, o: [
          [`5`, `16 mod 11 = 5, but slot 5 already holds 37.`],
          [`6`, `Slot 6 holds 17.`],
          [`7`, `Correct. 5 (37) and 6 (17) are taken, so i = 2 gives slot 7.`],
          [`9`, `That would be standard quadratic probing (5 + 4).`]
        ], a: 2, src: `Exam 2023/24 Summer` },
        { q: `Keys 12, 15, 21, 31, 90, table size 9, division + linear probing. Where does 31 go?`, o: [
          [`4`, `31 mod 9 = 4, but 21 already took slot 4.`],
          [`5`, `Correct. 12→3, 15→6, 21→3 collides → 4, 31→4 collides → 5.`],
          [`3`, `Slot 3 holds 12.`],
          [`0`, `Slot 0 is taken by 90 (90 mod 9 = 0).`]
        ], a: 1, src: `Exam 2023/24 Summer` },
        { q: `Keys 25, 42, 96, 101, 102, 162, 197 hashed by division with size 5 and separate chaining. How long is the chain at index 2?`, o: [
          [`1`, `Several keys end in 2 or 7.`],
          [`2`, `Count: 42, 102, 162, 197.`],
          [`4`, `Correct. 42, 102, 162 and 197 all give remainder 2.`],
          [`3`, `197 mod 5 = 2 as well.`]
        ], a: 2, src: `Exam 2025/26` },
        { q: `Keys 18, 72, 65, 34, 13 in a table of size 7 with linear probing. Where is 13 stored?`, o: [
          [`6`, `6 holds 34.`],
          [`0`, `Correct. 13 mod 7 = 6 collides, (6+1) mod 7 = 0.`],
          [`5`, `That is the quadratic probing result.`],
          [`1`, `Linear probing tries 0 before 1.`]
        ], a: 1, src: `Exam 2024/25` },
        { q: `Which hash function squares the key and takes the middle digits?`, o: [
          [`Truncation`, `Truncation takes part of the key directly.`],
          [`Folding`, `Folding adds groups of digits.`],
          [`Mid square`, `Correct. 456² = 207936 → 79.`],
          [`Division`, `Division uses key mod size.`]
        ], a: 2 },
        { q: `Which collision technique uses an array of pointers to linked lists?`, o: [
          [`Linear probing`, `Linear probing stores keys in the array itself.`],
          [`Separate chaining`, `Correct.`],
          [`Double hashing`, `Double hashing uses a second hash function in the same array.`],
          [`Truncation`, `Truncation is a hash function, not a collision technique.`]
        ], a: 1 }
      ]
    }
  ],

  exams: [
    /* ───────────── FINAL 2025/2026 ───────────── */
    { title: `Final Exam 2025/2026`,
      meta: `First term · 2 hours · 60 marks · CS201 · Dr. Ahmed Ibrahim, Dr. Lamiaa Hassaan · 2 questions`,
      note: `Transcribed from two copies of the same paper (two phone photos and the "2026 final exam" PDF scan). One copy has a student's traversal answers and grader marks (-1 on Q1 parts 1 to 3 and -2 on the tree), which we ignored. All answers below are ours; code was compiled and run with g++ (the lectures use Visual Studio style <code>void main()</code> and <code>stdafx.h</code>, which g++ does not accept). MCQ 1 is ambiguous: the expected answer is Queue (the lecture says a queue is "open at both ends"), but strictly "insertion and deletion at both ends" is a deque.`,
      sections: [
        { title: `Question 1 · Answer five only of the following questions`, marks: `30 marks (6 each)`, items: [
          { type: `written`, q: `Using array of struct write a program to calculate the total salary of each employee after adding the bonus and subtracting the deduction. Table: Dina 1000 / 100 / 50; Mohamed 2000 / 0 / 0; Hoda 3000 / 0 / 200 (Salary / Bonus / Deduction).`,
            ans: `<pre>#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;
struct Employee {
    string name;
    float salary, bonus, deduction, total;
};
int main()
{
    const int N = 3;
    Employee e[N];
    for (int i = 0; i &lt; N; i++)
    {
        cout &lt;&lt; "Enter name, salary, bonus, deduction: ";
        cin &gt;&gt; e[i].name &gt;&gt; e[i].salary &gt;&gt; e[i].bonus &gt;&gt; e[i].deduction;
        e[i].total = e[i].salary + e[i].bonus - e[i].deduction;
    }
    for (int i = 0; i &lt; N; i++)
        cout &lt;&lt; e[i].name &lt;&lt; " total salary = " &lt;&lt; e[i].total &lt;&lt; endl;
    return 0;
}</pre>Output: Dina 1050, Mohamed 2000, Hoda 2800 (1000+100-50 = 1050; 2000+0-0 = 2000; 3000+0-200 = 2800). You may also initialize the array directly: <code>Employee e[3] = {{"Dina",1000,100,50},{"Mohamed",2000,0,0},{"Hoda",3000,0,200}};</code> (L1).` },
          { type: `written`, q: `You have a Linked-Queue, write a program that contains: node class, linked queue class, a function to insert values 25 and 20, and main() to call the above function.`,
            ans: `<pre>#include &lt;iostream&gt;
using namespace std;
class Node
{
public:
    int data;
    Node *next;
    Node() { data = 0; next = NULL; }
};
class Queue
{
    Node *front, *rear;
public:
    Queue() { front = NULL; rear = NULL; }
    bool isEmpty() { return (front == NULL &amp;&amp; rear == NULL); }
    void enqueue(int item)
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        newnode-&gt;next = NULL;
        if (isEmpty()) { front = newnode; rear = newnode; }
        else { rear-&gt;next = newnode; rear = newnode; }
    }
    void display()
    {
        for (Node *t = front; t != NULL; t = t-&gt;next) cout &lt;&lt; t-&gt;data &lt;&lt; " ";
        cout &lt;&lt; endl;
    }
};
int main()
{
    Queue q;
    q.enqueue(25);
    q.enqueue(20);
    q.display();      // 25 20   (front -&gt; 25 -&gt; 20 &lt;- rear)
    return 0;
}</pre>(L7)` },
          { type: `written`, q: `You have a Linked-Stack, write a program which contains: node class and linked stack class, a function to delete an item from the stack, and main() to call the above function.`,
            ans: `<pre>#include &lt;iostream&gt;
using namespace std;
class Node
{
public:
    int data;
    Node *next;
    Node() { data = 0; next = NULL; }
};
class Stack
{
    Node *top;
public:
    Stack() { top = NULL; }
    bool isEmpty() { return top == NULL; }
    void push(int item)
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        newnode-&gt;next = top;
        top = newnode;
    }
    int pop()                       // delete an item
    {
        if (isEmpty()) { cout &lt;&lt; "Stack is empty" &lt;&lt; endl; return 0; }
        Node *temp = top;
        int value = top-&gt;data;
        top = top-&gt;next;
        delete temp;
        return value;
    }
};
int main()
{
    Stack s;
    s.push(10);
    s.push(20);
    cout &lt;&lt; "Deleted " &lt;&lt; s.pop() &lt;&lt; endl;   // Deleted 20
    return 0;
}</pre>(L6) Pop removes the top node (the last pushed): LIFO.` },
          { type: `written`, q: `You have a Double Linked-List, write a program that contains: node class and D-linked list class, a function to insert a value in its order, and main() to call the above functions.`,
            ans: `<pre>#include &lt;iostream&gt;
using namespace std;
class Node
{
public:
    int data;
    Node *next, *prev;
    Node() { data = 0; next = NULL; prev = NULL; }
};
class DList
{
public:
    Node *head;
    DList() { head = NULL; }
    bool isEmpty() { return head == NULL; }
    void insertsorted(int item)
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        if (isEmpty())
            head = newnode;
        else if (item &lt; head-&gt;data)           // new first node
        {
            newnode-&gt;next = head;
            head-&gt;prev = newnode;
            head = newnode;
        }
        else
        {
            Node *temp = head;
            while (temp-&gt;next != NULL &amp;&amp; temp-&gt;next-&gt;data &lt; item)
                temp = temp-&gt;next;
            newnode-&gt;next = temp-&gt;next;
            newnode-&gt;prev = temp;
            if (temp-&gt;next != NULL) temp-&gt;next-&gt;prev = newnode;
            temp-&gt;next = newnode;
        }
    }
    void display()
    {
        for (Node *t = head; t != NULL; t = t-&gt;next) cout &lt;&lt; t-&gt;data &lt;&lt; " ";
        cout &lt;&lt; endl;
    }
};
int main()
{
    DList d;
    d.insertsorted(30); d.insertsorted(10); d.insertsorted(20);
    d.insertsorted(5);  d.insertsorted(40);
    d.display();          // 5 10 20 30 40
    return 0;
}</pre>(L8) Tested with g++; it handles empty list, new smallest, middle and new largest values.` },
          { type: `written`, q: `Traverse this tree using Inorder, Preorder and Postorder. Tree: F is the root; B is the left child of F with children A (left) and D (right); D has children C (left) and E (right); G is the right child of F; G has a right child I; I has a left child H.`,
            ans: `<b>Inorder</b> (left, root, right): A B C D E F G H I<br><b>Preorder</b> (root, left, right): F B A D C E G I H<br><b>Postorder</b> (left, right, root): A C E D B H I G F<br>(L9; verified with g++. Tip: in postorder the root F is last, in preorder it is first.)` },
          { type: `written`, q: `Store the values 25, 42, 96, 101, 102, 162, 197 using division method of hashing. Apply chaining in collision situations. Array size = 5.`,
            ans: `h(k) = k mod 5: 25→0, 42→2, 96→1, 101→1, 102→2, 162→2, 197→2.<br><table><tr><th>Index</th><th>Chain</th></tr><tr><td>0</td><td>25 → NULL</td></tr><tr><td>1</td><td>96 → 101 → NULL</td></tr><tr><td>2</td><td>42 → 102 → 162 → 197 → NULL</td></tr><tr><td>3</td><td>NULL</td></tr><tr><td>4</td><td>NULL</td></tr></table>Collisions: 101 (with 96), 102, 162, 197 (with 42). Each is appended to the linked list of its slot (L10).` }
        ]},
        { title: `Question 2 · Choose the correct answer`, marks: `15 marks (1.5 each)`, items: [
          { type: `mcq`, q: `Which of the following data structures allows insertion and deletion from both ends?`, o: [`Stack`, `Queue`, `Linked list`, `Array`], a: 1, why: `Expected answer: Queue, which the lecture describes as "open at both ends" (insert at the rear, delete at the front) (L3). Strictly, insertion and deletion at both ends is a deque, which is not among the options.` },
          { type: `mcq`, q: `Assuming int is of 4 bytes, what is the size of int arr[15];?`, o: [`15`, `19`, `11`, `60`], a: 3, why: `15 × 4 = 60 bytes (L1).` },
          { type: `mcq`, q: `In general, the index of the first element in an array is ____`, o: [`1`, `0`, `2`, `-1`], a: 1, why: `C++ arrays are zero-based (L1).` },
          { type: `mcq`, q: `Which of the following data structures is a linear type?`, o: [`Graph`, `Binary Tree`, `Tree`, `Linked list`], a: 3, why: `Graphs and trees are non-linear; a linked list is linear (L1).` },
          { type: `mcq`, q: `Process of removing an element from stack is called ____`, o: [`Create`, `Push`, `Evaluation`, `Pop`], a: 3, why: `Pop deletes the top element (L2).` },
          { type: `mcq`, q: `Which of the following data structures is a non-linear type?`, o: [`Array`, `Stack`, `Tree`, `Queue`], a: 2, why: `Trees are hierarchical, non-linear (L1, L9).` },
          { type: `mcq`, q: `What are the advantages of arrays?`, o: [`Easier to store elements of same data type`, `Elements in an array cannot be sorted`, `Index of first element of an array is 1`, `Objects of mixed data types can be stored`], a: 0, why: `B is false (arrays can be sorted), C is false (index starts at 0), D describes structs (L1).` },
          { type: `mcq`, q: `Process of inserting an element in stack is called ____`, o: [`Create`, `Push`, `Evaluation`, `Pop`], a: 1, why: `Push adds an element at the top (L2).` },
          { type: `mcq`, q: `When search starts at the beginning of a list to check every element in that list, it is ……`, o: [`linear search`, `binary search`, `hash search`, `binary tree search`], a: 0, why: `Linear (sequential) search checks elements one by one from the start (Lab 1, Lab 2).` },
          { type: `mcq`, q: `Linked list is considered as an example of ____ type of memory allocation.`, o: [`Static`, `Dynamic`, `Compile time`, `Heap`], a: 1, why: `Nodes are created with new at run time: dynamic allocation (L4, L5).` }
        ]},
        { title: `Question 2 · Choose true or false`, marks: `15 marks (1.5 each)`, items: [
          { type: `tf`, q: `Insertions and deletions in the Stack follow FIFO.`, a: 1, why: `A stack follows LIFO; FIFO is a queue (L2).` },
          { type: `tf`, q: `The circular queue is the same as the regular queue.`, a: 1, why: `A circular queue connects the last position to the first and reuses freed cells (L3).` },
          { type: `tf`, q: `Enqueue() inserts an element at the rear of the Queue.`, a: 0, why: `Insertion is at the rear (L3).` },
          { type: `tf`, q: `The array is a group of data elements grouped together under one name with different types.`, a: 1, why: `That defines a struct; array elements have the same type (L1).` },
          { type: `tf`, q: `Dequeue(): removes the element at the front of the Queue.`, a: 0, why: `Deletion is from the front (L3).` },
          { type: `tf`, q: `The last node in linked-list contains null in its second field because it will point to no node.`, a: 0, why: `Lecture 5's exact sentence.` },
          { type: `tf`, q: `Function push() in Stack used to delete item.`, a: 1, why: `push inserts; pop deletes (L2).` },
          { type: `tf`, q: `Traversing a singly linked list is done in a forward direction only.`, a: 0, why: `Each node only has a next pointer (L5).` },
          { type: `tf`, q: `In a circular linked list, the last node points back to the head node.`, a: 0, why: `Definition of a circular linked list (L5).` },
          { type: `tf`, q: `Insertions and deletions in Stack follow FILO.`, a: 0, why: `First-In-Last-Out is the same as LIFO (L2).` }
        ]}
      ]
    },

    /* ───────────── FINAL 2024/2025 ───────────── */
    { title: `Final Exam 2024/2025`,
      meta: `First term · 2 hours · 60 marks · CS201 · Dr. Ahmed Ibrahim, Dr. Lamiaa Hassaan · answer 5 of 6 (12 marks each)`,
      note: `Transcribed from a phone photo. A student wrote traversals for Q5 on the paper (pre A-B-D-G-H-E-I-C-F, in G-D-H-B-E-I-A-C-F, post G-H-D-I-E-B-F-C-A); they agree with our answer, which was also checked with g++. The tree structure was read from the drawing: I is the right child of E and F is the right child of C (consistent with the student's inorder).`,
      sections: [
        { title: `Answer five only of the following questions`, marks: `60 marks (12 each)`, items: [
          { type: `written`, q: `Using array of struct write a program to take the values of this table from the user and calculate the total salary of each employee after adding the bonus and subtracting the deduction. Dina 1000/50/30; Mohamed 2000/70/0; Abas 2000/40/20; Hoda 3000/0/300 (Salary/Bonus/Deduction).`,
            ans: `<pre>#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;
struct Employee {
    string name;
    float salary, bonus, deduction, total;
};
int main()
{
    const int N = 4;
    Employee e[N];
    for (int i = 0; i &lt; N; i++)
    {
        cout &lt;&lt; "Enter name, salary, bonus, deduction: ";
        cin &gt;&gt; e[i].name &gt;&gt; e[i].salary &gt;&gt; e[i].bonus &gt;&gt; e[i].deduction;
        e[i].total = e[i].salary + e[i].bonus - e[i].deduction;
    }
    for (int i = 0; i &lt; N; i++)
        cout &lt;&lt; e[i].name &lt;&lt; " total salary = " &lt;&lt; e[i].total &lt;&lt; endl;
    return 0;
}</pre>With the table values: Dina 1000+50-30 = <b>1020</b>, Mohamed 2000+70-0 = <b>2070</b>, Abas 2000+40-20 = <b>2020</b>, Hoda 3000+0-300 = <b>2700</b> (run with g++) (L1).` },
          { type: `written`, q: `Write a program to remove all the items from a Double Linked-List, check if it is empty.`,
            ans: `<pre>#include &lt;iostream&gt;
using namespace std;
class Node
{
public:
    int data;
    Node *next, *prev;
    Node() { data = 0; next = NULL; prev = NULL; }
};
class DList
{
public:
    Node *head;
    DList() { head = NULL; }
    bool isEmpty() { return head == NULL; }
    void insertatbeginning(int item)
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        newnode-&gt;next = head;
        newnode-&gt;prev = NULL;
        if (!isEmpty()) head-&gt;prev = newnode;
        head = newnode;
    }
    void removeAll()
    {
        if (isEmpty()) { cout &lt;&lt; "List is empty" &lt;&lt; endl; return; }
        while (head != NULL)
        {
            Node *temp = head;
            head = head-&gt;next;
            if (head != NULL) head-&gt;prev = NULL;
            cout &lt;&lt; "Deleted " &lt;&lt; temp-&gt;data &lt;&lt; endl;
            delete temp;
        }
    }
};
int main()
{
    DList d;
    d.insertatbeginning(10); d.insertatbeginning(20); d.insertatbeginning(30);
    d.removeAll();      // Deleted 30, Deleted 20, Deleted 10
    d.removeAll();      // List is empty
    return 0;
}</pre>(L8)` },
          { type: `written`, q: `You have a Linked-Stack; check if it is empty, write a program to: insert two new nodes with values = 50 and 70; remove a node from the stack.`,
            ans: `<pre>#include &lt;iostream&gt;
using namespace std;
class Node
{
public:
    int data;
    Node *next;
    Node() { data = 0; next = NULL; }
};
class Stack
{
    Node *top;
public:
    Stack() { top = NULL; }
    bool isEmpty() { return top == NULL; }
    void push(int item)
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        if (isEmpty()) newnode-&gt;next = NULL;
        else newnode-&gt;next = top;
        top = newnode;
    }
    int pop()
    {
        if (isEmpty()) { cout &lt;&lt; "Stack is empty" &lt;&lt; endl; return 0; }
        Node *temp = top;
        int value = top-&gt;data;
        top = top-&gt;next;
        delete temp;
        return value;
    }
};
int main()
{
    Stack s;
    if (s.isEmpty()) cout &lt;&lt; "Stack is empty" &lt;&lt; endl;
    s.push(50);
    s.push(70);                                // top -&gt; 70 -&gt; 50 -&gt; NULL
    cout &lt;&lt; "Removed " &lt;&lt; s.pop() &lt;&lt; endl;    // Removed 70
    return 0;
}</pre>(L6)` },
          { type: `written`, q: `You have a Linked-Queue; check if it is empty, write a program to: insert two new nodes with values = 30 and 50; remove all the items of the queue.`,
            ans: `<pre>#include &lt;iostream&gt;
using namespace std;
class Node
{
public:
    int data;
    Node *next;
    Node() { data = 0; next = NULL; }
};
class Queue
{
    Node *front, *rear;
public:
    Queue() { front = rear = NULL; }
    bool isEmpty() { return front == NULL; }
    void enqueue(int item)
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        newnode-&gt;next = NULL;
        if (isEmpty()) { front = newnode; rear = newnode; }
        else { rear-&gt;next = newnode; rear = newnode; }
    }
    int dequeue()
    {
        if (isEmpty()) { cout &lt;&lt; "Queue is empty" &lt;&lt; endl; return 0; }
        Node *temp = front;
        int value = front-&gt;data;
        front = front-&gt;next;
        if (front == NULL) rear = NULL;      // queue became empty
        delete temp;
        return value;
    }
    void removeAll()
    {
        while (!isEmpty())
            cout &lt;&lt; "Dequeued " &lt;&lt; dequeue() &lt;&lt; endl;
    }
};
int main()
{
    Queue q;
    if (q.isEmpty()) cout &lt;&lt; "Queue is empty" &lt;&lt; endl;
    q.enqueue(30);
    q.enqueue(50);
    q.removeAll();       // Dequeued 30, Dequeued 50 (FIFO)
    return 0;
}</pre>(L7)` },
          { type: `written`, q: `Traverse this tree using Inorder, Preorder and Postorder. Tree: A root; B left child of A, C right child of A; D left and E right children of B; F right child of C; G left and H right children of D; I right child of E.`,
            ans: `<b>Inorder</b> (L, root, R): G D H B E I A C F<br><b>Preorder</b> (root, L, R): A B D G H E I C F<br><b>Postorder</b> (L, R, root): G H D I E B F C A<br>(L9; verified with g++.)` },
          { type: `written`, q: `Store the values 18, 72, 65, 34 and 13 using division method. Apply using linear probe and separate chaining in collision situations, where array size = 7.`,
            ans: `Division: h1(k) = k mod 7 → 18→4, 72→2, 65→2, 34→6, 13→6.<br><b>Linear probing</b> h(k,i) = (h1(k)+i) mod 7:<br>18: i=0 → 4. 72: i=0 → 2. 65: i=0 → 2 collision, i=1 → 3. 34: i=0 → 6. 13: i=0 → 6 collision, i=1 → (6+1) mod 7 = 0.<br><table><tr><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>13</td><td>–</td><td>72</td><td>65</td><td>18</td><td>–</td><td>34</td></tr></table><b>Separate chaining</b>: [0] NULL, [1] NULL, [2] 72 → 65, [3] NULL, [4] 18, [5] NULL, [6] 34 → 13. (This is exactly the lecture example, L10.)` }
        ]}
      ]
    },

    /* ───────────── SUMMER 2023/2024 (60 marks) ───────────── */
    { title: `Summer Exam 2023/2024 (60 marks)`,
      meta: `Summer term · 2 hours · 60 marks · CS201 · Dr. Ahmed Ibrahim, Dr. Lamiaa Hassaan · answer 5 of 6 (12 marks each)`,
      note: `Transcribed from a phone photo. A student wrote traversals and the start of a linear probing answer on the paper; the left child of 50 is hidden under the handwriting, but it is 25 (the student's inorder 12, 25, 33, 50 … and the lecture's example tree 50, 25, 65, 12, 33, 70, 55, 60, 53 confirm it). The student wrote h(12,0) = ((12 % 9)+1) % 9, which is wrong for i = 0 (it should be + 0); the final slots they wrote (3, 6, 4, 5, 0) are correct.`,
      sections: [
        { title: `Answer five only of the following questions`, marks: `60 marks (12 each)`, items: [
          { type: `written`, q: `Using array of struct write a program to take the values of this table from the user and calculate the average value of the subject degrees (sub1, sub2). Ahmed 60/70; Mohamed 80/60; Abas 50/40.5; Hoda 70.5/75.`,
            ans: `<pre>#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;
struct Student {
    string name;
    float sub1, sub2;
};
int main()
{
    const int N = 4;
    Student s[N];
    float sum1 = 0, sum2 = 0;
    for (int i = 0; i &lt; N; i++)
    {
        cout &lt;&lt; "Enter name, sub1, sub2: ";
        cin &gt;&gt; s[i].name &gt;&gt; s[i].sub1 &gt;&gt; s[i].sub2;
        sum1 += s[i].sub1;
        sum2 += s[i].sub2;
        cout &lt;&lt; s[i].name &lt;&lt; " average = " &lt;&lt; (s[i].sub1 + s[i].sub2) / 2 &lt;&lt; endl;
    }
    cout &lt;&lt; "Average of sub1 = " &lt;&lt; sum1 / N &lt;&lt; endl;
    cout &lt;&lt; "Average of sub2 = " &lt;&lt; sum2 / N &lt;&lt; endl;
    return 0;
}</pre>Subject averages: sub1 = (60+80+50+70.5)/4 = 260.5/4 = <b>65.125</b>; sub2 = (70+60+40.5+75)/4 = 245.5/4 = <b>61.375</b>. Since the question can be read as the average of each student too, the program also prints Ahmed 65, Mohamed 70, Abas 45.25, Hoda 72.75 (L1).` },
          { type: `written`, q: `Write the functions to remove all the items from a Linked-List.`,
            ans: `<pre>// inside class Linkedlist (Node has data and next)
int deletefrombeginning()
{
    if (isEmpty()) { cout &lt;&lt; "Empty" &lt;&lt; endl; return 0; }
    Node *temp = head;
    int value = head-&gt;data;
    head = head-&gt;next;
    delete temp;
    return value;
}
void removeAll()
{
    if (isEmpty()) { cout &lt;&lt; "List is empty" &lt;&lt; endl; return; }
    while (!isEmpty())
        cout &lt;&lt; "Deleted " &lt;&lt; deletefrombeginning() &lt;&lt; endl;
}</pre>Each step moves head to the next node and frees the old first node, until head is NULL (L5).` },
          { type: `written`, q: `You have a Linked-Stack; write a program to remove all the items of the stack.`,
            ans: `<pre>#include &lt;iostream&gt;
using namespace std;
class Node
{
public:
    int data;
    Node *next;
    Node() { data = 0; next = NULL; }
};
class Stack
{
    Node *top;
public:
    Stack() { top = NULL; }
    bool isEmpty() { return top == NULL; }
    void push(int item)
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        newnode-&gt;next = top;
        top = newnode;
    }
    int pop()
    {
        if (isEmpty()) { cout &lt;&lt; "Empty" &lt;&lt; endl; return 0; }
        Node *temp = top;
        int value = top-&gt;data;
        top = top-&gt;next;
        delete temp;
        return value;
    }
    void removeAll()
    {
        while (!isEmpty())
            cout &lt;&lt; "Popped " &lt;&lt; pop() &lt;&lt; endl;
    }
};
int main()
{
    Stack s;
    s.push(1); s.push(2); s.push(3);
    s.removeAll();      // Popped 3, Popped 2, Popped 1
    return 0;
}</pre>(L6)` },
          { type: `written`, q: `You have a Linked-Queue, write a program to: insert two new nodes with values = 50 and 70; remove a node from the queue.`,
            ans: `<pre>// Node class as in L7 (data, next)
class Queue
{
    Node *front, *rear;
public:
    Queue() { front = rear = NULL; }
    bool isEmpty() { return front == NULL; }
    void enqueue(int item)
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        newnode-&gt;next = NULL;
        if (isEmpty()) { front = newnode; rear = newnode; }
        else { rear-&gt;next = newnode; rear = newnode; }
    }
    int dequeue()
    {
        if (isEmpty()) { cout &lt;&lt; "Empty" &lt;&lt; endl; return 0; }
        Node *temp = front;
        int value = front-&gt;data;
        front = front-&gt;next;
        if (front == NULL) rear = NULL;
        delete temp;
        return value;
    }
};
int main()
{
    Queue q;
    q.enqueue(50);
    q.enqueue(70);
    cout &lt;&lt; "Removed " &lt;&lt; q.dequeue() &lt;&lt; endl;   // Removed 50 (FIFO)
    return 0;
}</pre>(L7)` },
          { type: `written`, q: `Traverse this tree using Inorder, Preorder and Postorder. Tree: 50 root; 25 (children 12, 33); 65 (children 55, 70); 55 (children 53, 60).`,
            ans: `<b>Inorder</b>: 12, 25, 33, 50, 53, 55, 60, 65, 70<br><b>Preorder</b>: 50, 25, 12, 33, 65, 55, 53, 60, 70<br><b>Postorder</b>: 12, 33, 25, 53, 60, 55, 70, 65, 50<br>(Lecture 9 example; verified with g++.)` },
          { type: `written`, q: `Store the values 12, 15, 21, 31, 90 using division method. Apply linear probe in collision situations, where array size = 9.`,
            ans: `h(k,i) = ((k mod 9) + i) mod 9<br>12: i=0 → 3.<br>15: i=0 → 6.<br>21: i=0 → 3 collision (12); i=1 → 4.<br>31: i=0 → 4 collision (21); i=1 → 5.<br>90: i=0 → 0.<br><table><tr><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr><tr><td>90</td><td>–</td><td>–</td><td>12</td><td>21</td><td>31</td><td>15</td><td>–</td><td>–</td></tr></table>(L10; computed with a script.)` }
        ]}
      ]
    },

    /* ───────────── SUMMER 2023/2024 (50 marks) ───────────── */
    { title: `Summer Exam 2023/2024 (50 marks)`,
      meta: `Summer term · 2 hours · 50 marks · CS201 · Dr. Ahmed Ibrahim, Dr. Lamiaa Hassaan · answer 5 of 6 (10 marks each)`,
      note: `Transcribed from the scanned PDF "2023 2024". The header says Summer Term 2023-2024 with 50 marks; it is a different form from the 60-mark summer paper above. Q6 is cut at the right edge ("Apply linear prob…"); it clearly asks for linear probing.`,
      sections: [
        { title: `Answer five only of the following questions`, marks: `50 marks (10 each)`, items: [
          { type: `written`, q: `Using array of struct write a program to take the values of this table from the user and calculate the total salary of each employee after adding the bonus and subtracting the deduction. Dina 1000/100/50; Mohamed 2000/0/0; Abas 2000/100/0; Hoda 3000/0/200.`,
            ans: `Same program as in Final 2024/25 Q1 (struct Employee {name, salary, bonus, deduction, total}; loop reading N = 4 records; total = salary + bonus - deduction; print).<br>Results: Dina 1000+100-50 = <b>1050</b>; Mohamed <b>2000</b>; Abas 2000+100-0 = <b>2100</b>; Hoda 3000-200 = <b>2800</b> (run with g++) (L1).` },
          { type: `written`, q: `Write a function to insert a new node in its order of a Linked-List.`,
            ans: `<pre>void insertsorted(int item)             // ascending order
{
    Node *newnode = new Node();
    newnode-&gt;data = item;
    if (isEmpty() || item &lt; head-&gt;data)   // empty list or new smallest
    {
        newnode-&gt;next = head;
        head = newnode;
    }
    else
    {
        Node *temp = head;                  // find node before insertion point
        while (temp-&gt;next != NULL &amp;&amp; temp-&gt;next-&gt;data &lt; item)
            temp = temp-&gt;next;
        newnode-&gt;next = temp-&gt;next;         // new node points to the following node
        temp-&gt;next = newnode;               // previous node points to new node
    }
}</pre>Steps (L5): locate the node preceding the insertion point, make the new node point to the node after it, then make the preceding node point to the new node. The slide's loop version crashes when the value is smaller than the head or larger than the last node, so this safe version is preferred (tested with g++: 10, 20, 30 + 25, 5, 40 → 5 10 20 25 30 40).` },
          { type: `written`, q: `You have a Linked-Stack, write a program to: insert two new nodes with values = 50 and 70; remove a node from the linked-stack.`,
            ans: `Use the linked stack class of L6 (push: newnode->next = top; top = newnode; pop: temp = top; top = top->next; delete temp).<pre>int main()
{
    Stack s;
    s.push(50);
    s.push(70);                               // top -&gt; 70 -&gt; 50
    cout &lt;&lt; "Removed " &lt;&lt; s.pop() &lt;&lt; endl;   // Removed 70
    return 0;
}</pre>See Final 2024/25 Q3 for the full class.` },
          { type: `written`, q: `You have a Linked-Queue, write a program to remove all the items of the queue.`,
            ans: `<pre>void removeAll()            // inside class Queue (front, rear)
{
    if (front == NULL) { cout &lt;&lt; "Queue is empty" &lt;&lt; endl; return; }
    while (front != NULL)
    {
        Node *temp = front;
        cout &lt;&lt; "Deleted " &lt;&lt; temp-&gt;data &lt;&lt; endl;
        front = front-&gt;next;
        delete temp;
    }
    rear = NULL;            // queue is now empty
}</pre>Items are removed from the front in FIFO order (L7). Full class: see Final 2024/25 Q4.` },
          { type: `written`, q: `Traverse this tree using Inorder, Preorder and Postorder. Tree: 43; 31 (20 with right child 28, 40 with left child 33); 64 (56 with children 47, 59; 89).`,
            ans: `<b>Inorder</b>: 20 28 31 33 40 43 47 56 59 64 89<br><b>Preorder</b>: 43 31 20 28 40 33 64 56 47 59 89<br><b>Postorder</b>: 28 20 33 40 31 47 59 56 89 64 43<br>(Lecture 9 example; verified with g++.)` },
          { type: `written`, q: `Store the values 14, 17, 25, 37, 34, 16 using division method. Apply linear probe in collision situations, where array size = 11.`,
            ans: `h(k,i) = ((k mod 11) + i) mod 11<br>14 → 3. 17 → 6. 25 → 3 collision; i=1 → 4. 37 → 4 collision; i=1 → 5. 34 → 1. 16 → 5 collision; i=1 → 6 collision; i=2 → 7.<br><table><tr><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr><tr><td>–</td><td>34</td><td>–</td><td>14</td><td>25</td><td>37</td><td>17</td><td>16</td><td>–</td><td>–</td><td>–</td></tr></table>(L10)` }
        ]}
      ]
    },

    /* ───────────── MIDTERM 2023/2024 ───────────── */
    { title: `Midterm 2023/2024 (Models A and B)`,
      meta: `First term midterm · 1 hour · 20 marks · CS201 · Dr. Ahmed Ibrahim, Dr. Lamia Hassaan · official model answers`,
      note: `Transcribed from the official model answer PDF (text). Fill-in-the-blank items are shown as MCQs with the model answer as the correct option. Problems we found in the official key: (1) Model A Q2c defines insertatend but main calls list.insertatbeginning(7) and (5), which would not compile, and calling insertatbeginning(7) then (5) would give 5 → 7, not the required 7 → 5. Also insertatend as written crashes on an empty list. Our answer uses insertatend with an empty-list check. (2) Model B Q2c makes Node::data a float but insertatbeginning(int item) truncates 8.5 and 5.3 to 8 and 5, and main calls insertatend, which is not defined; inserting at the front 8.5 then 5.3 gives head → 5.3 → 8.5 as required. (3) Model B writes "FILO" for the stack; FILO and LIFO mean the same.`,
      sections: [
        { title: `Model A · First Question`, marks: `5 marks`, items: [
          { type: `mcq`, q: `Removing an element occurs at the ______ of the Queue.`, o: [`front`, `rear`, `top`, `middle`], a: 0, why: `Dequeue removes from the front (head) (L3).` },
          { type: `mcq`, q: `The disadvantage of array is ______.`, o: [`fixed size`, `linear access`, `extra memory for pointers`, `slow index access`], a: 0, why: `Model answer: fixed size. Linear access and extra memory are linked list disadvantages (L1, L5).` },
          { type: `mcq`, q: `Function ______ in Stack is used to insert item.`, o: [`pop()`, `push()`, `get()`, `count()`], a: 1, why: `push() inserts at the top (L2).` },
          { type: `tf`, q: `Queue is a data structure in which insertions and deletions are restricted to one end.`, a: 1, why: `Model answer: False; insertions at the rear and deletions at the front (L3).` },
          { type: `tf`, q: `A Stack, in other words, is called a LIFO list.`, a: 0, why: `Last-In-First-Out (L2).` }
        ]},
        { title: `Model A · Second Question`, marks: `15 marks (5 each)`, items: [
          { type: `written`, q: `Write C++ code for POP and IsEmpty Stack functions.`,
            ans: `<pre>bool isEmpty(int top)
{
    if (top == -1) return true;
    else return false;
}
int pop()
{
    if (isEmpty(top)) { cout &lt;&lt; "Stack underflow"; return -1; }
    else
    { int item = stack_arr[top]; top = top - 1; return item; }
}</pre>(Official model answer, L2.)` },
          { type: `written`, q: `Write C++ code for Enqueue and IsFull Queue functions.`,
            ans: `<pre>bool isFull(int tail)
{
    if (tail == maxsize - 1) return true;
    else return false;
}
void enqueue(int item)
{
    if (isFull(tail)) { cout &lt;&lt; "\\nQueue is full"; return; }
    else
    {
        if (head == -1) head = 0;
        tail = tail + 1;
        queue[tail] = item;
    }
}</pre>(Official model answer, L3.)` },
          { type: `written`, q: `Write node class, linked list class, insertion at the end function then use them to create the linked list: head → 7 → 5 → NULL (insert value 7 then value 5).`,
            ans: `<pre>#include &lt;iostream&gt;
using namespace std;
class Node
{
public:
    int data;
    Node *next;
    Node() { data = 0; next = NULL; }
};
class Linkedlist
{
public:
    Node *head;
    Linkedlist() { head = NULL; }
    bool isEmpty() { return head == NULL; }
    void insertatend(int item)
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        newnode-&gt;next = NULL;
        if (isEmpty()) { head = newnode; return; }   // first node
        Node *temp1 = head;
        while (temp1-&gt;next != NULL) temp1 = temp1-&gt;next;
        temp1-&gt;next = newnode;
    }
};
int main()
{
    Linkedlist list;
    list.insertatend(7);
    list.insertatend(5);       // head -&gt; 7 -&gt; 5 -&gt; NULL
    return 0;
}</pre>Note: the official key calls insertatbeginning in main (a mismatch) and has no empty-list check in insertatend (L5).` }
        ]},
        { title: `Model B · First Question`, marks: `5 marks`, items: [
          { type: `mcq`, q: `enqueue(): inserts an element at the ______ of the Queue.`, o: [`front`, `rear`, `top`, `head`], a: 1, why: `Insertion is at the rear (tail) (L3).` },
          { type: `mcq`, q: `The disadvantage of Linked List is ______.`, o: [`fixed size`, `linear access and extra memory`, `cannot grow`, `cannot delete`], a: 1, why: `Model answer: linear access and extra memory (L5).` },
          { type: `mcq`, q: `Function ______ in Stack is used to delete item.`, o: [`push()`, `pop()`, `enqueue()`, `search()`], a: 1, why: `pop() removes the top element (L2).` },
          { type: `tf`, q: `Stack is a data structure in which insertions and deletions are restricted to one end.`, a: 0, why: `Both happen at the top (L2).` },
          { type: `tf`, q: `A Stack is called a FIFO list.`, a: 1, why: `A stack is LIFO (the key writes FILO, which means the same); FIFO is a queue (L2).` }
        ]},
        { title: `Model B · Second Question`, marks: `15 marks (5 each)`, items: [
          { type: `written`, q: `Write C++ code for Push and IsFull Stack functions.`,
            ans: `<pre>bool isFull(int top)
{
    if (top == MAXSIZE - 1) return true;
    else return false;
}
void push(int item)
{
    if (isFull(top)) cout &lt;&lt; "Stack overflow";
    else { top = top + 1; stack_arr[top] = item; }
}</pre>(Official model answer, L2.)` },
          { type: `written`, q: `Write C++ code for Dequeue and IsEmpty Queue functions.`,
            ans: `<pre>bool isEmpty(int head)
{
    if (head == -1 || head &gt; tail) return true;
    else return false;
}
int dequeue()
{
    int element;
    if (isEmpty(head)) { cout &lt;&lt; "Queue Underflow "; return -1; }
    else { element = queue[head]; head++; }
    return element;
}</pre>(Official model answer, L3.)` },
          { type: `written`, q: `Write node class, linked list class, insertion at the front function then use them to create the linked list: head → 5.3 → 8.5 → NULL (insert value 8.5 then value 5.3).`,
            ans: `<pre>class Node
{
public:
    float data;
    Node *next;
    Node() { data = 0; next = NULL; }
};
class Linkedlist
{
public:
    Node *head;
    Linkedlist() { head = NULL; }
    bool isEmpty() { return head == NULL; }
    void insertatbeginning(float item)      // float, not int
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        if (isEmpty()) { newnode-&gt;next = NULL; head = newnode; }
        else { newnode-&gt;next = head; head = newnode; }
    }
};
int main()
{
    Linkedlist list;
    list.insertatbeginning(8.5);
    list.insertatbeginning(5.3);   // head -&gt; 5.3 -&gt; 8.5 -&gt; NULL
    return 0;
}</pre>The official key uses <code>insertatbeginning(int item)</code> (which would store 8 and 5) and calls insertatend in main; both are fixed here (L5).` }
        ]}
      ]
    },

    /* ───────────── SUMMER 2022/2023 ───────────── */
    { title: `Summer Exam 2022/2023`,
      meta: `Summer final term · 1 hour · 60 marks · CS201 · Dr. Ahmed Ibrahim, Dr. Lamiaa Hassaan · 4 questions (15 marks each)`,
      note: `Transcribed from the first page of "2022-2023 data structure exam" (phone photo, readable). Pages 2 to 5 of that file are a student's typed solutions (with Arabic comments); our answers are independent and were compiled with g++. In the table, Dina's Subject 2 is printed as "-80"; we read it as 80 (a printing mark).`,
      sections: [
        { title: `Questions`, marks: `60 marks (15 each)`, items: [
          { type: `written`, q: `First Question: You have the matrix which represents the degrees of 6 students in 4 subjects (Ahmed 70, 97, 50, 75; Mohamed 60, 90, 80, 79; Halaa 50, 45.5, 60, 81; Dina 80, 80, 70, 60; Abas 40, 70, 75, 55; Hoda 75, 60.5, 85, 50). Using array of struct write a program to: calculate the average value of each subject; calculate the total degree of each student.`,
            ans: `<pre>#include &lt;iostream&gt;
#include &lt;string&gt;
using namespace std;
struct Student {
    string name;
    float degree[4];
    float total;
};
int main()
{
    Student s[6];
    float avg[4] = {0, 0, 0, 0};
    for (int i = 0; i &lt; 6; i++)
    {
        cout &lt;&lt; "Enter name and 4 degrees of student " &lt;&lt; i + 1 &lt;&lt; ": ";
        cin &gt;&gt; s[i].name;
        s[i].total = 0;
        for (int j = 0; j &lt; 4; j++)
        {
            cin &gt;&gt; s[i].degree[j];
            s[i].total += s[i].degree[j];   // total of each student
            avg[j] += s[i].degree[j];       // sum of each subject
        }
    }
    for (int j = 0; j &lt; 4; j++)
        cout &lt;&lt; "Average of subject " &lt;&lt; j + 1 &lt;&lt; " = " &lt;&lt; avg[j] / 6 &lt;&lt; endl;
    for (int i = 0; i &lt; 6; i++)
        cout &lt;&lt; "Total of " &lt;&lt; s[i].name &lt;&lt; " = " &lt;&lt; s[i].total &lt;&lt; endl;
    return 0;
}</pre>Output with the table (run with g++): subject averages 62.5, 73.8333, 70, 66.6667; totals Ahmed 292, Mohamed 309, Halaa 236.5, Dina 290, Abas 240, Hoda 270.5 (L1).` },
          { type: `written`, q: `Second Question: You have the Linked-Queue, write a program to: remove an item from the queue; insert a new item whose value = 50.`,
            ans: `Use the Node and Queue classes of L7:<pre>void enqueue(int item)
{
    Node *newnode = new Node();
    newnode-&gt;data = item;
    newnode-&gt;next = NULL;
    if (front == NULL) { front = newnode; rear = newnode; }
    else { rear-&gt;next = newnode; rear = newnode; }
}
int dequeue()
{
    if (front == NULL) { cout &lt;&lt; "Queue is empty" &lt;&lt; endl; return 0; }
    Node *temp = front;
    int value = front-&gt;data;
    front = front-&gt;next;
    if (front == NULL) rear = NULL;
    delete temp;
    return value;
}
int main()
{
    Queue q;
    q.enqueue(10); q.enqueue(20);                // some existing items
    cout &lt;&lt; "Removed " &lt;&lt; q.dequeue() &lt;&lt; endl;  // removes 10 (front)
    q.enqueue(50);                               // 50 joins at the rear: 20 50
    return 0;
}</pre>` },
          { type: `written`, q: `Third Question: You have the Linked-Stack, write a program to: insert two new nodes with values = 50 and 70; remove a node from the stack.`,
            ans: `Linked stack class of L6; main: <code>s.push(50); s.push(70); cout &lt;&lt; s.pop();</code> prints 70 because the last pushed node is on top (top → 70 → 50 → NULL, after pop top → 50). Full code: see Final 2024/25 Q3.` },
          { type: `written`, q: `Fourth Question: Write a program to insert a new node in its order of this linked list: head → 10 → 20 → 30 → NULL.`,
            ans: `<pre>#include &lt;iostream&gt;
using namespace std;
class Node
{
public:
    int data;
    Node *next;
    Node() { data = 0; next = NULL; }
};
class Linkedlist
{
public:
    Node *head;
    Linkedlist() { head = NULL; }
    bool isEmpty() { return head == NULL; }
    void insertsorted(int item)
    {
        Node *newnode = new Node();
        newnode-&gt;data = item;
        if (isEmpty() || item &lt; head-&gt;data)
        { newnode-&gt;next = head; head = newnode; }
        else
        {
            Node *temp = head;
            while (temp-&gt;next != NULL &amp;&amp; temp-&gt;next-&gt;data &lt; item)
                temp = temp-&gt;next;
            newnode-&gt;next = temp-&gt;next;
            temp-&gt;next = newnode;
        }
    }
    void display()
    {
        for (Node *t = head; t != NULL; t = t-&gt;next) cout &lt;&lt; t-&gt;data &lt;&lt; " ";
        cout &lt;&lt; endl;
    }
};
int main()
{
    Linkedlist list;
    list.insertsorted(10); list.insertsorted(20); list.insertsorted(30);
    list.insertsorted(25);
    list.display();          // 10 20 25 30
    return 0;
}</pre>(L5; tested with g++.)` }
        ]}
      ]
    },

    /* ───────────── FINAL 2022/2023 ───────────── */
    { title: `Final Exam 2022/2023`,
      meta: `First term · 2 hours · 60 marks · CS201 (Credit 2022) · Dr. Ahmed Ibrahim, Dr. Lamia Hassaan · 2 questions`,
      note: `Transcribed from a two-page scan (clear). No answer key. Tree in Q2b read from the drawing: H is the right child of D, L is the left child of K, P is the left child of R, Z is the right child of X. For Q2a the lecture's quadratic formula h(k,i) = (h1(k) + i + i²) mod m is used; the textbook form (h1 + i²) is also shown. All traces were checked with g++/node.`,
      sections: [
        { title: `Question One · I. Choose the correct answer`, marks: `10 marks (1 each)`, items: [
          { type: `mcq`, q: `Pushing an element into stack already having five elements and stack size is 5, this condition is called ……`, o: [`Crash`, `Overflow`, `Underflow`, `User flow`], a: 1, why: `Pushing onto a full stack is stack overflow (L2).` },
          { type: `mcq`, q: `In a linear queue, if implemented using an array of size MAX, gets full when?`, o: [`Front = (rear + 1) mod MAX`, `Front = rear + 1`, `Rear = MAX - 1`, `Rear = front`], a: 2, why: `isFull checks tail == maxsize - 1 (L3).` },
          { type: `mcq`, q: `Which of the following is not a correct statement for a stack data structure?`, o: [`Stack follows FIFO`, `Arrays can be used to implement the stack`, `Elements are stored in a sequential manner`, `Top of the stack has the last inserted element`], a: 0, why: `A stack follows LIFO (L2).` },
          { type: `mcq`, q: `Which of the following data structure is non-linear type?`, o: [`Linked List`, `Stack`, `Tree`, `Circular queue`], a: 2, why: `Trees are non-linear (L1, L9).` },
          { type: `mcq`, q: `Which of the following determines the need for the circular queue?`, o: [`Avoid memory wastage`, `Access queue using priority`, `Follows the FIFO principle`, `None`], a: 0, why: `The linear queue cannot reuse cells freed by dequeue (L3).` },
          { type: `mcq`, q: `If a Binary Search Tree is traversed in the order right, root, left recursively, the output sequence will be in:`, o: [`ascending order`, `descending order`, `no specific order`, `right, root, left cannot be done`], a: 1, why: `Reverse inorder visits larger keys first (L9).` },
          { type: `mcq`, q: `If circular queue is implemented using array having size MAX_SIZE, which of the following conditions used to specify that the circular queue is empty?`, o: [`front = rear = 0`, `front = rear + 1`, `front = rear = -1`, `none`], a: 2, why: `The lecture initializes and resets front and rear to -1 (L3).` },
          { type: `mcq`, q: `When the pre-order and post-order traversal of a Binary Tree generates the same output, then the tree has:`, o: [`two nodes`, `only one node`, `three nodes`, `any number of nodes`], a: 1, why: `The root is first in preorder and last in postorder; they coincide only with one node (L9).` },
          { type: `mcq`, q: `To insert an item into a stack, identify the correct set of statements:`, o: [`top++; stack[top]=item;`, `item = stack[top]; top--;`, `stack[item] = top; item++;`, `stack[top] = item; top++;`], a: 0, why: `Top starts at -1, so increment then store (L2).` },
          { type: `mcq`, q: `What are the number of nodes of left and right subtree of the binary tree if the data is inserted in the following order: 45, 15, 8, 56, 5, 65, 47, 12, 18, 10, 73, 50, 16, 61`, o: [`8 nodes to the left and 5 nodes to the right`, `6 nodes to the left and 7 nodes to the right`, `7 nodes to the left and 6 nodes to the right`, `5 nodes to the left and 8 nodes to the right`], a: 2, why: `Keys &lt; 45: 15, 8, 5, 12, 18, 10, 16 (7). Keys &gt; 45: 56, 65, 47, 73, 50, 61 (6). Verified with g++ (L9).` }
        ]},
        { title: `Question One · II. Select True or False`, marks: `10 marks (1 each)`, items: [
          { type: `tf`, q: `The condition if (front == 0 && rear == MAX_SIZE - 1) is enough to check the fullness of a circular queue.`, a: 1, why: `It is also full when rear is just one behind front (wrapped case) (L3).` },
          { type: `tf`, q: `Hash tables store keys in ordered locations.`, a: 1, why: `Keys are scattered by the hash function (scatter table) (L10).` },
          { type: `tf`, q: `The value of REAR is increased by 1 when an element is inserted in the queue.`, a: 0, why: `enqueue advances the rear (L3).` },
          { type: `tf`, q: `The following is a valid code of class Node of a singly linked list: class Node {int data, Node next;}`, a: 1, why: `next must be a pointer (Node *next;), members need ; separators, and the class needs a closing ; (and public:) (L5).` },
          { type: `tf`, q: `When a hash function computes the same location for two or more keys, this is a collision situation.`, a: 0, why: `Definition of collision (L10).` },
          { type: `tf`, q: `To print the keys of a binary search tree in an ascending order, you may apply inorder or postorder traversals.`, a: 1, why: `Only inorder gives ascending order (L9).` },
          { type: `tf`, q: `Two linked lists are needed in order to implement a linked stack.`, a: 1, why: `One list with a top pointer is enough (L6).` },
          { type: `tf`, q: `On inserting a new node N in a doubly linked list, N->next = Null is a must.`, a: 1, why: `Only when N becomes the last node (L8).` },
          { type: `tf`, q: `Left-Right-Parent represents the Postorder Traversal of a Binary Tree.`, a: 0, why: `Postorder = left, right, parent (L9).` },
          { type: `tf`, q: `Insertion is done at the front of a linked queue.`, a: 1, why: `Insertion is at the rear; deletion at the front (L7).` }
        ]},
        { title: `Question Two · Answer ONLY FIVE of the following`, marks: `40 marks (8 each)`, items: [
          { type: `written`, q: `a- Store the values 14, 17, 25, 37, 34, 16 using division method. Apply linear probe and quadratic probe in collision situations. Array size = 11.`,
            ans: `Home addresses k mod 11: 14→3, 17→6, 25→3, 37→4, 34→1, 16→5.<br><b>Linear probing</b> (h1 + i) mod 11: 14→3; 17→6; 25: 3 taken → 4; 37: 4 taken → 5; 34→1; 16: 5 taken, 6 taken → 7.<br><table><tr><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr><tr><td>–</td><td>34</td><td>–</td><td>14</td><td>25</td><td>37</td><td>17</td><td>16</td><td>–</td><td>–</td><td>–</td></tr></table><b>Quadratic probing</b> (lecture formula (h1 + i + i²) mod 11): 14→3; 17→6; 25: i=0 → 3 taken, i=1 → 3+1+1 = 5; 37: i=0 → 4 (free); 34→1; 16: i=0 → 5 taken (25), i=1 → 5+2 = 7.<br><table><tr><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr><tr><td>–</td><td>34</td><td>–</td><td>14</td><td>37</td><td>25</td><td>17</td><td>16</td><td>–</td><td>–</td><td>–</td></tr></table>If the textbook form (h1 + i²) is used instead: 25 → 4, 37 → 4 taken → 5, 16 → 5 taken, 6 taken, 5+4 = 9 → slot 9 (table: 1:34, 3:14, 4:25, 5:37, 6:17, 9:16). State the formula you use (L10).` },
          { type: `written`, q: `b- Consider the tree: A root; B (left of A) with children D and K; D has right child H; K has left child L; M (right of A) with children R and X; R has left child P; X has right child Z. (i) Write the output of inorder and postorder traversals. (ii) Write C++ function of preorder traverse.`,
            ans: `(i) <b>Inorder</b>: D H B L K A P R M X Z<br><b>Postorder</b>: H D L K B P R Z X M A<br>(Preorder for reference: A B D H K L M R P X Z; verified with g++.)<br>(ii)<pre>void preorder(Node *temp)
{
    if (temp == NULL) { return; }
    cout &lt;&lt; temp-&gt;data &lt;&lt; "\\t";   // visit parent
    preorder(temp-&gt;left);           // then left subtree
    preorder(temp-&gt;right);          // then right subtree
}</pre>(L9)` },
          { type: `written`, q: `c- Consider a circular queue of size = 5, show the output of: enqueue(10); enqueue(20); cout&lt;&lt;"Head = "&lt;&lt;head&lt;&lt;"Tail = "&lt;&lt;tail&lt;&lt;"\\n"; enqueue(30); cout&lt;&lt;dequeue()&lt;&lt;"\\n"; int x = dequeue(); cout&lt;&lt;"Head = "&lt;&lt;head&lt;&lt;"Tail = "&lt;&lt;tail&lt;&lt;"\\n";`,
            ans: `Trace: enqueue(10) → head = 0, tail = 0. enqueue(20) → tail = 1. Print <b>Head = 0Tail = 1</b>. enqueue(30) → tail = 2. dequeue() returns 10, head = 1 → prints <b>10</b>. x = dequeue() = 20, head = 2. Print <b>Head = 2Tail = 2</b>.<br>Output:<pre>Head = 0Tail = 1
10
Head = 2Tail = 2</pre>If the lecture's enQueue/deQueue (which print their own messages) are used, the full output is (run with g++):<pre>Enqueued element: 10
Enqueued element: 20
Head = 0Tail = 1
Enqueued element: 30
Dequeued element: 10
10
Dequeued element: 20
Head = 2Tail = 2</pre>(L3)` },
          { type: `written`, q: `d- You have a Linked Queue, write C++ functions to: remove an item from the queue; insert a new item which value = 50.`,
            ans: `<pre>void enqueue(int item)              // call enqueue(50)
{
    Node *newnode = new Node();
    newnode-&gt;data = item;
    newnode-&gt;next = NULL;
    if (front == NULL &amp;&amp; rear == NULL) { front = newnode; rear = newnode; }
    else { rear-&gt;next = newnode; rear = newnode; }
}
int dequeue()
{
    if (front == NULL) { cout &lt;&lt; "Queue is empty" &lt;&lt; endl; return 0; }
    Node *temp = front;
    int value = front-&gt;data;
    front = front-&gt;next;
    if (front == NULL) rear = NULL;
    delete temp;
    return value;
}</pre>(L7)` },
          { type: `written`, q: `e- You have a Doubly Linked List, write C++ function to insert a new node in its order.`,
            ans: `<pre>void insertsorted(int item)
{
    Node *newnode = new Node();     // Node has data, next, prev
    newnode-&gt;data = item;
    if (head == NULL)
        head = newnode;
    else if (item &lt; head-&gt;data)
    {
        newnode-&gt;next = head;
        head-&gt;prev = newnode;
        head = newnode;
    }
    else
    {
        Node *temp = head;
        while (temp-&gt;next != NULL &amp;&amp; temp-&gt;next-&gt;data &lt; item)
            temp = temp-&gt;next;
        newnode-&gt;next = temp-&gt;next;
        newnode-&gt;prev = temp;
        if (temp-&gt;next != NULL) temp-&gt;next-&gt;prev = newnode;
        temp-&gt;next = newnode;
    }
}</pre>(L8; tested with g++.)` },
          { type: `written`, q: `f- You have a Linked Stack, write C++ program to remove all the items from the stack.`,
            ans: `<pre>void removeAll()            // inside class Stack
{
    if (top == NULL) { cout &lt;&lt; "Stack is empty" &lt;&lt; endl; return; }
    while (top != NULL)
    {
        Node *temp = top;
        cout &lt;&lt; "Popped " &lt;&lt; temp-&gt;data &lt;&lt; endl;
        top = top-&gt;next;
        delete temp;
    }
}</pre>Full class with push and main: see Summer 2023/24 (60 marks) Q3 (L6).` }
        ]}
      ]
    }
  ]
};

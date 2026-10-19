// File Processing (Dr. M. AbdelFattah).
window.COURSES = window.COURSES || {};
COURSES.fp = {
 "id": "fp",
 "name": "File Processing",
 "short": "File Processing",
 "code": "CS308",
 "by": "Dr. M. AbdelFattah",
 "lectures": [
  {
   "n": 1,
   "title": "Intro to File Organization and File I/O in C/C++",
   "notes": [
    {
     "h": "Data structure vs file structure",
     "pts": [
      "Both involve <b>representation of data</b> + <b>operations for accessing data</b>.",
      "Difference: data structures deal with data in <b>main memory</b>; file structures deal with data in <b>secondary storage</b> (files).",
      "Main reference: <i>File Structures: An Object-Oriented Approach with C++</i> by Folk, Zoellick and Riccardi.",
      "Course references (slide 3): <i>File Structures: An Object-Oriented Approach with C++</i> (Folk, Zoellick, Riccardi); <i>File Organization and Processing</i> (Alan L. Tharp); <i>Database Management Systems</i> (Ramakrishnan, Gehrke); <i>Operating System Concepts</i> (Silberschatz, Galvin, Gagne); and lecture notes by Prof Lucia Moura.",
      "The lecture has two parts (slides 5, 6, 18):<br>• <b>Part (1)</b> Introduction to file management and organization: (1) data processing, (2) file and computer storage, (3) file structures, (4) file organization, (5) file management, (6) file managers.<br>• <b>Part (2)</b> Basic file processing operations, handling files in C/C++: physical vs logical file, opening and closing files, reading and writing, a sample program, full methods and a quiz."
     ]
    },
    {
     "h": "(1) Data processing and (2) files",
     "pts": [
      "<b>Data processing</b> (slide 7):<br>• <b>Storage of data</b>: data is saved within files, and the files are saved in storage devices.<br>• <b>Organization of data</b>: how we organize files on primary and secondary storage.<br>• <b>Access of data</b>: sequential or direct access.<br>• <b>Processing of data</b>: the processing of data after storage, organization and access.",
      "Data is saved in files, and files are saved on primary (RAM) or secondary (hard disk) storage. Organization is either <b>sequential</b> or <b>direct</b> access.",
      "<b>File</b> = a collection of data placed on <b>secondary, non-volatile</b> storage (hard disk, magnetic tape, optical media).",
      "Computer storage can be secondary storage or main memory.",
      "File storage is slow because it has <b>many moving parts</b>.",
      "Figure (slide 9, Computer Storage):<br>• <b>Main memory (RAM)</b>: data is manipulated here; fast, small, expensive, volatile.<br>• <b>Secondary storage</b> (disk holding files such as A.mp3, first.java, mo.flv): data is stored here; slow, large, cheap, stable. Examples: disk, tape, CD-ROM.<br>• Data is transferred between the two. Callouts: \"Files will store here\" (secondary storage); \"Why is file storage so slow?\"; \"File storage systems have many moving parts\".",
      "Why files? They are the only suitable way to store large amounts of information (pictures, music, video); operating systems are too large to fit fully in memory; databases are everywhere; backup and archiving."
     ]
    },
    {
     "h": "(3) File structures, (4) organization, (5) management, (6) managers",
     "pts": [
      "<b>Logical structure</b>: how programmers see the file (text, image, data file…). <b>Physical structure</b>: how it is stored on secondary storage.",
      "Figure (slide 12, File Organization): a messy pile of books labelled <b>Unorganized</b> next to books neatly arranged on shelves labelled <b>Organized</b>.",
      "<b>Logical organization methods</b>: heap, indexing, hashing. <b>Physical organization methods</b>: organizing tracks by <b>sectors</b> or by <b>blocks</b>.",
      "File organization methods must provide <b>fast access time</b> and <b>good space utilization</b>.",
      "<b>File management</b> covers: preparing/formatting storage media; allocating storage space and addressing; managing free space.",
      "<b>File managers</b> (system software): the <b>OS</b> and the <b>DBMS</b>.",
      "Course objectives: get information with <b>as few disk accesses as possible</b>, and group related information so a request needs <b>only one trip to the disk</b>."
     ]
    },
    {
     "h": "Physical file vs logical file",
     "table": [
      [
       "Physical file",
       "Logical file"
      ],
      [
       "A collection of bytes stored on a disk",
       "A channel connecting the program to the physical file"
      ],
      [
       "Has a physical name, e.g. A.txt",
       "Has a logical name: a variable in the program, e.g. infile, fp"
      ],
      [
       "Used once, when opening the file",
       "Used as many times as needed: open, read, write, append, close"
      ]
     ],
     "pts": [
      "Figure (slide 20, Physical File vs. Logical File): a hard disk with 6 physical files (A.txt, b.txt, aa.txt, aa.mp3, a.doc, z.mp3). One C/C++ program deals with the physical file b.txt through the logical name <b>infile</b>; another program deals with aa.txt through its own logical name <b>infile</b>.",
      "Declaring the logical name (slide 22): in C, <code>FILE * outfile;</code>. In C++ the logical name is an object of the class <code>fstream</code>: <code>fstream outfile;</code>. In both languages the logical name outfile is associated with the physical file myfile.txt at the time of <b>opening</b> the file."
     ]
    },
    {
     "h": "Opening files",
     "pts": [
      "Opening makes a file ready for use: either open an existing file or create a new one. After opening you are positioned at the <b>beginning</b> of the file.",
      "Figure (slide 23, Opening Files in C): <code>FILE *outFile; outFile = fopen(\"A.txt\", \"w\");</code> with labels: <b>outFile</b> = logical name, <b>fopen</b> = method to open file, \"A.txt\" = physical file, \"w\" = the mode. A bubble lists the modes: r (reading), w (writing), a (append), r+ w+ a+, rb wb ab, rb+ wb+ ab+.",
      "C++: <code>fstream outfile; outfile.open(\"myfile.txt\", ios::out);</code>. The second argument is an <b>integer</b> indicating the mode; its value is set as a bitwise OR (operator <code>|</code>) of constants defined in the class <code>ios</code>.",
      "C modes: <b>\"r\"</b> open existing for reading; <b>\"w\"</b> create new or truncate existing for output; <b>\"a\"</b> create new or append for output; <b>\"r+\"</b> existing for input and output; <b>\"w+\"</b> create/truncate for input and output; <b>\"a+\"</b> create/append for input and output; adding <b>b</b> (rb, wb, ab, r+b…) means <b>binary mode</b>.",
      "C++ flags: <code>ios::in</code> input, <code>ios::out</code> output, <code>ios::app</code> seek to end before each write, <code>ios::ate</code> start positioned at end, <code>ios::trunc</code> always create new (truncate), <code>ios::binary</code> binary mode."
     ]
    },
    {
     "h": "C mode ↔ C++ flags",
     "table": [
      [
       "C",
       "C++"
      ],
      [
       "r",
       "in"
      ],
      [
       "w",
       "out | trunc  (or out)"
      ],
      [
       "a",
       "out | app"
      ],
      [
       "r+",
       "out | in"
      ],
      [
       "w+",
       "out | in | trunc"
      ],
      [
       "a+",
       "out | in | app"
      ],
      [
       "…b",
       "… | binary"
      ]
     ]
    },
    {
     "h": "Closing files",
     "pts": [
      "Closing frees the logical name for another physical file, \"like hanging up the telephone after a call\".",
      "Bytes are not sent one by one. They are collected in a <b>buffer</b> and sent as a <b>block</b>.",
      "If you do not close, the OS closes the file at the end of the program. If the program <b>terminates abnormally, data may be lost</b>.",
      "Closing in code (slide 28): in C, <code>fclose(outfile);</code>; in C++, <code>outfile.close();</code>."
     ]
    },
    {
     "h": "Reading and writing",
     "pts": [
      "Generic operations (slides 29, 33):<br>• <code>Read(Source_file, Destination_addr, Size)</code>: Source_file = the logical file name the program reads from; Destination_addr = the first address of the memory block where we want to read the data; Size = how much information is brought in from the file (byte count).<br>• <code>Write(Destination_file, Source_addr, Size)</code>: Destination_file = the logical file name where the data will be written; Source_addr = the first address of the memory block where the data to be written is stored; Size = the number of bytes to be written.",
      "<code>fgetc(fp)</code> reads one character. <code>fgets(str, n, fp)</code> reads a string (‡ at most n-1 characters). <code>fscanf(fp, \"fmt\", vars)</code> reads formatted text. <code>fread(&amp;blk, size, count, fp)</code> reads a record/block.",
      "fread/fwrite arguments: 1) address of the variable, 2) element size in bytes, 3) number of elements, 4) logical file name.",
      "Reading in C (slide 31, \"or in C++ using C streams\"): <code>char c; char a[100]; FILE * infile; infile = fopen(\"myfile.txt\",\"r\"); fread(&amp;c,1,1,infile); /* reads one character */ fread(a,1,10,infile); /* reads 10 characters */</code>. The slide comments c as \"a character\" and a as \"an array with 100 characters\". A <b>char</b> occupies 1 byte, so the element size is 1.",
      "Writing in C (slide 34): <code>char c; char a[100]; FILE * outfile; outfile = fopen(\"mynew.txt\",\"w\"); /* omitted initialization of c and a */ fwrite(&amp;c,1,1,outfile); fwrite(a,1,10,outfile);</code>. The slide lists the same four arguments as fread, calling the 1st one \"destination address (address of variable c)\". ‡ For fwrite the 1st argument is really the <b>source</b> address: the memory the data is written from.",
      "Reading in C++ (slide 32): <code>char c; char a[100]; fstream infile; infile.open(\"myfile.txt\",ios::in); infile &gt;&gt; c;</code> (reads one character), <code>infile.read(&amp;c,1);</code> (alternative way of reading one character), <code>infile.read(a,10);</code> (reads 10 bytes).<br>Writing in C++ (slide 35): <code>char c; char a[100]; fstream outfile; outfile.open(\"mynew.txt\",ios::out); /* omitted initialization of c and a */ outfile &lt;&lt; c; outfile.write(&amp;c,1); outfile.write(a,10);</code>.",
      "In C++ (slides 32, 35) the operator <code>&gt;&gt;</code> communicates the same information at a higher level: since c is a char variable, it is implicit that only 1 byte is transferred. C++ fstream also provides the <b>read</b> method, corresponding to fread in C (and <b>write</b>, corresponding to fwrite). Opening for writing: <code>outfile.open(\"mynew.txt\",ios::out);</code>.",
      "Detecting end of file (slide 36):<br>• In C, check whether <code>fread</code> returned <b>0</b>: <code>int i; i = fread(&amp;c,1,1,infile);</code> (attempted to read), then <code>if (i==0)</code> (true if file has ended) …<br>• In C++, check whether <code>infile.fail()</code> returns true: <code>infile &gt;&gt; c;</code> (attempted to read), then <code>if (infile.fail())</code> (true if file has ended) …<br>• Alternatively, check whether <code>infile.eof()</code> returns true."
     ]
    },
    {
     "h": "Methods used to read from files (C)",
     "pts": [
      "Slide 30 gives four methods to read from files, each with its shortcut name, usage, syntax and an example (table above)."
     ],
     "table": [
      [
       "Method",
       "Shortcut",
       "Usage",
       "Syntax",
       "Example"
      ],
      [
       "fgetc",
       "File Get Character",
       "Read one character from file",
       "<code>fgetc(file_pointer);</code>",
       "<code>ch = fgetc(fp);</code>"
      ],
      [
       "fgets",
       "File Get String",
       "Read string from file",
       "<code>fgets(string_var, No_Of_Character, file_pointer);</code>",
       "<code>fgets(string, 80, fp);</code>"
      ],
      [
       "fscanf",
       "File Scan Format",
       "Read formatted text from file",
       "<code>fscanf(file_pointer, \"conversion specifiers\", var(s)_name);</code>",
       "<code>result = fscanf(my_file, \"%c %d %x\", ch, num, hex);</code>"
      ],
      [
       "fread",
       "File Read",
       "Read record from file",
       "<code>fread(&amp;block_var, block_size, No_of_block, file_pointer);</code>",
       "<code>fread(&amp;emp, sizeof(emp), 1, my_file);</code>"
      ]
     ]
    },
    {
     "h": "Standard I/O logical names",
     "table": [
      [
       "Purpose",
       "Default meaning",
       "C",
       "C++"
      ],
      [
       "Standard output",
       "Console/Screen",
       "stdout",
       "cout"
      ],
      [
       "Standard input",
       "Keyboard",
       "stdin",
       "cin"
      ],
      [
       "Standard error",
       "Console/Screen",
       "stderr",
       "cerr"
      ]
     ],
     "pts": [
      "These streams do not need to be opened or closed in the program (slide 37)."
     ]
    },
    {
     "h": "Sample: read employee records (C)",
     "code": "struct employee { char name[20]; int sal; };\nFILE *my_file; struct employee emp;\nmy_file = fopen(\"c:\\\\emp.txt\", \"rb+\");\nif (my_file == NULL) { printf(\"Error in opening file\"); exit(1); }\nwhile (!feof(my_file)) {\n    fread(&emp, sizeof(emp), 1, my_file);\n    printf(\"The Emp Name: %s \\t\", emp.name);\n    printf(\"The Emp Sal : %d\\n\", emp.sal);\n}\nfclose(my_file);",
     "pts": [
      "Task (slide 38): write a C program that displays the contents of a file on the screen. Algorithm: open the file for input → while there are characters/records, read one and write it to the screen → close the file.",
      "Slide callouts (slides 39-40):<br>• <code>struct employee</code>: create employee struct.<br>• <code>fopen(...)</code>: open the emp.txt file.<br>• <code>if(my_file == NULL)</code>: test if the file opened or not.<br>• <code>while(!feof(my_file))</code>: use a while loop to read from the file until the end of file.<br>• Loop body: read from the file using fread, print the output to the screen using printf, end the while loop with }.<br>• <code>fclose(my_file);</code>: close the logical file.",
      "‡ Tip: <code>while(!feof())</code> only becomes true <i>after</i> a read fails, so the last record may print twice. Checking <code>fread(...) == 1</code> is safer. The slide's code (slides 39-40) also prints <code>%f</code> for the int salary (use <code>%d</code>, as in the code above), has a stray <code>\"</code> after emp.sal, writes <code>==</code> as <code>= =</code>, uses <code>void main()</code> and ends with <code>getch();</code>."
     ]
    },
    {
     "h": "Full methods (slides 41-54)",
     "pts": [
      "<b>Method (1) writeC()</b> (slides 41-42): ask the user to enter one character from the keyboard, then write it to the physical file alphabet.txt (<code>getche()</code>, then <code>fputc(ch,fp)</code>).",
      "<b>Method (2) readC()</b> (slides 43-44): read one character from alphabet.txt and print it to the screen (<code>ch = fgetc(fp); putchar(ch);</code>).",
      "<b>Method (3) writeS()</b> (slides 45-46): ask the user to enter strings from the keyboard until Enter is pressed on an empty line, writing each string to std.txt (<code>gets(string)</code>, stop when <code>strlen(string)==0</code>, else <code>fputs(string,my_file)</code>).",
      "<b>Method (4) readS()</b> (slides 47-48, named <code>read()</code> on the slide): read strings from std.txt and print them (<code>fgets(string,80,my_file)</code>, stop when <code>feof</code> is non-zero, else <code>puts(string)</code>).",
      "<b>Method (5) writeASCII()</b> (slides 49-50): write part of the ASCII table (characters 32 to 127) to ascii.txt using <code>fprintf</code>: a header line \"Letter Decimal Hexadecimal\", then each character as %c, %d and %x.",
      "<b>Method (6) readASCII()</b> (slides 51-53, named <code>read()</code> on the slide): read ascii.txt back: the header with <code>fgets</code> and <code>puts</code>, then each line with <code>fscanf(my_file,\"%c %d %x\",...)</code> until it returns <code>EOF</code>, printing each with printf.",
      "<b>Activity (1) / Quiz (1)</b> (slide 54): re-implement all the previous C program samples, from slide 38 to slide 53, as C++ programs."
     ]
    }
   ],
   "cards": [
    [
     "File (definition)",
     "A collection of data placed on secondary (non-volatile) storage."
    ],
    [
     "Data structure vs file structure",
     "DS: data in main memory. FS: data in secondary storage."
    ],
    [
     "Logical vs physical structure",
     "Logical: how programmers see the file. Physical: how it is stored on disk."
    ],
    [
     "Logical organization methods",
     "Heap, indexing, hashing."
    ],
    [
     "Physical organization methods",
     "Organizing tracks by sectors or by blocks."
    ],
    [
     "File organization must provide…",
     "Fast access time and good space utilization."
    ],
    [
     "File managers",
     "OS and DBMS."
    ],
    [
     "Physical file",
     "Bytes on disk with a physical name (A.txt); used once, at open."
    ],
    [
     "Logical file",
     "A program variable (fp, infile) channel to the physical file; used many times."
    ],
    [
     "\"w+\" mode",
     "Create a new file or truncate an existing one, for input and output."
    ],
    [
     "\"a\" mode",
     "Create a new file or append to an existing one, for output."
    ],
    [
     "ios::app vs ios::ate",
     "app: seek to the end before EACH write. ate: initially positioned at the end."
    ],
    [
     "EOF detection in C / C++",
     "C: fread returns 0. C++: infile.fail() or infile.eof() returns true."
    ],
    [
     "Why close files?",
     "Frees the logical name, flushes the buffer; abnormal termination may lose data."
    ]
   ],
   "qa": [
    [
     "Mention the main differences between a physical file and a logical file.",
     "Physical file: a collection of bytes on disk with a physical name (A.txt), used once when opening. Logical file: a channel connecting the program to the physical file, with a logical name that is a program variable (infile, fp), used many times for open, read, write, append and close."
    ],
    [
     "Why do we need files?",
     "They are the only suitable way to store large amounts of information such as pictures, music and video; operating systems are too large to load fully into memory; databases are everywhere; and for backup and archiving."
    ],
    [
     "What does file management involve?",
     "Preparing/formatting storage media, allocating storage space and addressing, and managing free space."
    ],
    [
     "What happens if you do not close a file?",
     "The OS closes it at the end of execution, but if the program terminates abnormally, data in the buffer may be lost."
    ],
    [
     "Write a method writeC() that asks the user to enter one character from the keyboard, then writes it to the physical file alphabet.txt. (slides 41-42)",
     "void writeC(){ FILE *fp; fp = fopen(\"c:\\\\alphabet.txt\",\"w\"); if(fp==NULL){ printf(\"Error in opening file\"); exit(1); } char ch; ch = getche(); fputc(ch,fp); fclose(fp); } ‡ The slide writes Printf and Exit with capitals; C is case-sensitive, so they must be printf and exit."
    ],
    [
     "Write a method readS() which reads strings from the physical file std.txt and prints them to the screen. (slides 47-48)",
     "void read(){ FILE *my_file; int result; my_file=fopen(\"c:\\\\std.txt\",\"r\"); if(my_file==NULL){ printf(\"Error in opening file\"); exit(1); } char string[80]; while(1){ fgets(string,80,my_file); result = feof(my_file); if(result !=0) break; puts(string); } fclose(my_file); } (The slide names the method read() rather than readS().)"
    ],
    [
     "Write a method readC() which reads one character from the physical file alphabet.txt and prints it to the screen. (slides 43-44)",
     "void readC(){ FILE *fp; fp = fopen(\"c:\\\\alphabet.txt\",\"r\"); if(fp==NULL){ printf(\"Error in opening file\"); exit(1); } char ch; ch = fgetc(fp); putchar(ch); fclose(fp); }"
    ],
    [
     "Write a method writeS() that asks the user to enter strings from the keyboard until Enter is pressed (on an empty line), then writes them to the physical file std.txt. (slides 45-46)",
     "void writeS(){ FILE *my_file; my_file=fopen(\"c:\\\\std.txt\",\"w\"); if(my_file==NULL){ printf(\"Error in opening file\"); exit(1); } char string[80]; while(1){ gets(string); if(strlen(string)==0) break; fputs(string,my_file); } fclose(my_file); } ‡ gets() was removed from C11 because it cannot limit the input length; fgets(string,80,stdin) is the safe choice."
    ],
    [
     "Write a method writeASCII() which writes part of the ASCII table to the physical file ascii.txt using fprintf. (slides 49-50)",
     "void writeASCII(){ FILE *my_file; char ch; my_file=fopen(\"ascii.txt\",\"w\"); if(my_file==NULL){ printf(\"Error in opening file\"); exit(1); } fprintf(my_file,\"Letter\\t Decimal \\t Hexadecimal \\n\"); for(ch = 32; ch&lt;=127; ch++) fprintf(my_file, \"%c \\t%d \\t %x \\n\", ch, ch, ch); fclose(my_file); } ‡ The slide is missing the opening \" of the second format string. Also, if char is signed, ch&lt;=127 is always true and the loop never ends; use an int counter."
    ],
    [
     "Write a method readASCII() which reads the data from the physical file ascii.txt and prints it to the screen. (slides 51-53)",
     "void readASCII(){ FILE *my_file; char string[80]; int ch, num, hex; int result; my_file=fopen(\"ascii.txt\",\"r\"); if(my_file==NULL){ printf(\"Error in opening file\"); exit(1); } fgets(string,80,my_file); puts(string); while(1){ result = fscanf(my_file,\"%c %d %x\",ch,num,hex); if(result==EOF) break; printf(\"%c \\t%d \\t %x \\n\", ch, num, hex); } fclose(my_file); } ‡ The slide names it read() and passes ch, num, hex to fscanf; fscanf needs their addresses (&amp;ch, &amp;num, &amp;hex), and %c needs a char variable."
    ]
   ],
   "quiz": [
    {
     "q": "Files are managed by system software:",
     "o": [
      [
       "OS",
       "Only half the answer: the OS is one file manager, but the DBMS also manages files, so the full answer is \"Both a and b\" (L1, File managers)."
      ],
      [
       "DBMS",
       "Only half the answer: the DBMS is one file manager, but the OS also manages files, so the full answer is \"Both a and b\" (L1, File managers)."
      ],
      [
       "MIS",
       "MIS is an information system, not a file manager."
      ],
      [
       "Both a and b",
       "Correct. Files are managed by the OS and the DBMS."
      ]
     ],
     "a": 3,
     "src": "Midterm Model C"
    },
    {
     "q": "File organization methods must provide:",
     "o": [
      [
       "Fast access time and good space utilization",
       "Correct. The lecture states that file organization methods must provide fast access time and good space utilization, i.e. few disk accesses and little wasted space (L1, File organization)."
      ],
      [
       "Preparing/formatting storage media",
       "Preparing/formatting storage media is listed under file MANAGEMENT, not under what an organization method must provide (fast access, good space use) (L1, File management)."
      ],
      [
       "Allocating storage space and addressing",
       "Allocating storage space and addressing is a file MANAGEMENT task; organization methods must provide fast access time and good space utilization (L1)."
      ],
      [
       "Managing free spaces",
       "Managing free space is the third file MANAGEMENT task; organization methods are judged by fast access time and good space utilization (L1)."
      ]
     ],
     "a": 0,
     "src": "Midterm Model B"
    },
    {
     "q": "A logical file is:",
     "o": [
      [
       "A collection of bytes stored on a disk",
       "A collection of bytes stored on a disk is the definition of the PHYSICAL file; the logical file is the program's channel to it (L1, Physical vs logical file)."
      ],
      [
       "A channel connecting the program to the physical file",
       "Correct. It is named by a program variable such as fp or infile."
      ],
      [
       "The file's name on disk, e.g. A.txt",
       "A name on disk like A.txt is the physical name of the physical file; the logical name is a program variable such as fp or infile (L1)."
      ],
      [
       "A backup of the physical file",
       "The course never defines a logical file as a backup; it is the channel (a program variable) that connects the program to the physical file (L1)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which is the correct syntax for opening a file in C?",
     "o": [
      [
       "FILE *fopen(const char *filename, const char *mode)",
       "Correct. fopen takes the file name and the mode and returns FILE*."
      ],
      [
       "FILE *fopen(const char *filename)",
       "fopen needs two arguments: the file name AND the mode string (\"r\", \"w\", \"a\"…); without the mode the file cannot be opened (L1, Opening files)."
      ],
      [
       "FILE *open(const char *filename, const char *mode)",
       "The C library function is fopen, not open; the course writes outFile = fopen(\"A.txt\", \"w\"), which returns a FILE* (L1, Opening files)."
      ],
      [
       "FILE open(const char *filename)",
       "Wrong on every part: the function is fopen, it returns a pointer FILE*, and it takes both a file name and a mode (L1, Opening files)."
      ]
     ],
     "a": 0,
     "src": "Summary MCQ"
    },
    {
     "q": "What does the mode \"w+\" do?",
     "o": [
      [
       "Creates a text file for writing, discards previous contents if any",
       "That is mode \"w\": create/truncate for OUTPUT only. The + adds input, so \"w+\" allows both reading and writing (L1, C modes)."
      ],
      [
       "Creates a text file for update (read and write), discards previous contents if any",
       "Correct. w+ = create or truncate, for input and output."
      ],
      [
       "Creates a text file for writing, keeps previous contents",
       "Keeping previous contents while writing is \"a\" (append). \"w+\" truncates an existing file, discarding its contents (L1, C modes)."
      ],
      [
       "Creates a text file for update, keeps previous contents",
       "Update while keeping contents is \"a+\" (create/append for input and output). \"w+\" truncates, so old contents are lost (L1, C modes)."
      ]
     ],
     "a": 1,
     "src": "Summary MCQ"
    },
    {
     "q": "If a mode includes \"b\" after the initial letter (e.g. \"rb\"), it indicates:",
     "o": [
      [
       "Text file",
       "Text mode is the default when there is NO b; adding b (rb, wb, ab, r+b) switches to binary mode (L1, C modes)."
      ],
      [
       "Big text file",
       "There is no \"big text\" mode; the only meaning of the letter b in a mode string is binary (L1, C modes)."
      ],
      [
       "Binary file",
       "Correct. Adding b after the mode letter (rb, wb, ab, r+b…) opens the file in binary mode; the C++ equivalent is | ios::binary (L1, C modes)."
      ],
      [
       "Blueprint text",
       "\"Blueprint\" is not a file mode; b in a mode string such as \"rb\" means binary mode (L1, C modes)."
      ]
     ],
     "a": 2,
     "src": "Summary MCQ"
    },
    {
     "q": "Which C++ class creates a stream for BOTH input and output?",
     "o": [
      [
       "ofstream",
       "ofstream is an OUTPUT-only file stream (default ios::out), so it cannot be used for both input and output (L1, C++ file streams)."
      ],
      [
       "ifstream",
       "ifstream is an INPUT-only file stream (default ios::in), so it cannot write; fstream handles both (L1, C++ file streams)."
      ],
      [
       "iostream",
       "iostream is the header/class for console I/O (cin, cout); file streams for both input and output come from fstream (L1, C++ file streams)."
      ],
      [
       "fstream",
       "Correct. fstream can be opened for both input and output, e.g. open(\"f.txt\", ios::in | ios::out); ifstream is input only and ofstream output only (L1, Opening files)."
      ]
     ],
     "a": 3,
     "src": "Summary MCQ"
    },
    {
     "q": "The default opening mode of an ifstream is:",
     "o": [
      [
       "ios::in",
       "Correct. ifstream is the input file stream, so when no mode is given it opens with ios::in (read) (L1, C++ file streams)."
      ],
      [
       "ios::out",
       "ios::out is the default of ofstream (output stream); an ifstream is for input, so its default is ios::in (L1)."
      ],
      [
       "ios::app",
       "ios::app (seek to end before each write) is an output flag you must request explicitly; it is no stream's default, and ifstream defaults to ios::in (L1)."
      ],
      [
       "ios::trunc",
       "ios::trunc (always create a new, empty file) is an output flag; it makes no sense for reading, and ifstream's default is ios::in (L1)."
      ]
     ],
     "a": 0,
     "src": "Summary MCQ"
    },
    {
     "q": "Which is NOT used to seek the file pointer?",
     "o": [
      [
       "ios::set",
       "Correct. The origins are ios::beg, ios::cur and ios::end. ios::set does not exist."
      ],
      [
       "ios::end",
       "ios::end is a valid seek origin: the offset is counted from the end of the file. The non-existent one is ios::set (L1, Summary MCQ)."
      ],
      [
       "ios::cur",
       "ios::cur is a valid seek origin: the offset is counted from the current position. The invalid one is ios::set (L1, Summary MCQ)."
      ],
      [
       "ios::beg",
       "ios::beg is a valid seek origin: the offset is counted from the start of the file. ios::set does not exist (L1, Summary MCQ)."
      ]
     ],
     "a": 0,
     "src": "Summary MCQ"
    },
    {
     "q": "How do you detect end of file in C++ after an attempted read?",
     "o": [
      [
       "fread returns 0",
       "fread returning 0 is how end of file is detected in C, not C++; in C++ infile.fail() or infile.eof() returns true (L1, Reading and writing)."
      ],
      [
       "infile.fail() returns true (or infile.eof())",
       "Correct. The lecture says that in C++ end of file is detected when infile.fail() returns true, or infile.eof() returns true; in C, fread returns 0 (L1, Reading and writing)."
      ],
      [
       "infile.close() returns false",
       "close() just releases the logical name and flushes the buffer; it does not report end of file. Use infile.fail() or infile.eof() (L1)."
      ],
      [
       "cout prints EOF",
       "cout only writes to the screen; it does not detect anything. EOF in C++ is detected with infile.fail() or infile.eof() (L1)."
      ]
     ],
     "a": 1
    },
    {
     "q": "The ___ function reads at most one less than the number of characters specified by size.",
     "o": [
      [
       "fget()",
       "fget() is not a C library function; the string-reading function is fgets(str, n, fp), and fgetc reads one character (L1, Reading)."
      ],
      [
       "fgets()",
       "Correct. fgets(str, n, fp) reads up to n-1 characters and adds '\\0'."
      ],
      [
       "fput()",
       "fput() is not a standard function, and anything named put writes rather than reads; the reader is fgets() (L1)."
      ],
      [
       "fputs()",
       "fputs() WRITES a string to a file; the question asks about reading at most n−1 characters, which is fgets() (L1)."
      ]
     ],
     "a": 1,
     "src": "Summary MCQ"
    },
    {
     "q": "In C, the logical name for the standard error device is:",
     "o": [
      [
       "stdout",
       "stdout is the C logical name for standard output (the screen), not standard error (L1, Standard I/O names)."
      ],
      [
       "stdin",
       "stdin is the C logical name for standard input (the keyboard), not standard error (L1, Standard I/O names)."
      ],
      [
       "stderr",
       "Correct. In the standard I/O table, standard error (console/screen) is stderr in C and cerr in C++ (L1, Standard I/O names)."
      ],
      [
       "cerr",
       "cerr is standard error, but it is the C++ logical name; the question asks for C, which is stderr (L1, Standard I/O names)."
      ]
     ],
     "a": 2
    }
   ]
  },
  {
   "n": 2,
   "title": "Physical File Organization: the Hard Disk",
   "notes": [
    {
     "h": "Secondary storage devices",
     "pts": [
      "Secondary storage is different from main memory, so we have to understand <b>how it works in order to do good file design</b>. Two major types of secondary storage:<br>(1) Direct Access Storage Devices (<b>DASD</b>)<br>(2) Serial Access Storage Devices (<b>SASD</b>)",
      "<b>DASD</b> (Direct Access Storage Devices):<br>• <b>Magnetic disks</b>: hard disk, floppy disk.<br>• <b>Optical disks</b>: CD-ROM (Compact Disk – Read Only Memory), CD-R (Compact Disk – Recordable), CD-RW (Compact Disk – ReWritable), DVD (Digital Video Disk).",
      "<b>SASD</b> (Serial Access Storage Devices): <b>magnetic tape</b>."
     ]
    },
    {
     "h": "Disk components",
     "pts": [
      "We can use <b>disks</b> or <b>HDD</b> to refer to hard disks. The important components in disks are:<br>(1) Platters<br>(2) Read/write heads<br>(3) Arm assembly<br>(4) Spindle<br>(5) Arms",
      "Figure (slide 5, inside and outside a hard disk): a drive with its cover off, with labels for the base casting, spindle, slider (and head), actuator arm, actuator axis, actuator, platters, cover mounting holes (cover not shown), case mounting holes, ribbon cable (attaches heads to logic board), SCSI interface connector, jumper pins, jumper, power connector and tape seal.",
      "Figure (slides 6, 16 and 19, an opened drive): arrows point to the <b>platters</b>, <b>spindle</b>, <b>read/write heads</b>, <b>arm</b> and <b>arm assembly</b>.",
      "<b>1. Platter</b>: the <b>circular disk</b> on which magnetic data is stored in a hard disk drive. It can store information on <b>both sides (surfaces)</b> of one or more platters; all surfaces have the <b>same components at the same position</b>, and the platters are structured to facilitate <b>storage and retrieval</b> of data.<br>• Each platter is divided into concentric rings called <b>tracks</b>: there are thousands of tracks on each platter, they look like rings, and the information is stored in successive tracks on the surface of the disk.<br>• Each track is divided into a number of <b>sectors</b>.",
      "Figure (slides 8, 15 and 18, disk drive with 4 platters and 8 surfaces): a side view of the platters on the <b>spindle</b>; there is a <b>read/write head</b> on each of the 8 surfaces, and all heads are held by the <b>boom</b>, which moves in and out (two arrows). On slide 8 a top view is added: a ring labelled <b>Track</b>, with <b>Track 0</b> and <b>Track 1</b>.",
      "Figure (slide 9): stacked platters; one ring on the top platter is marked <b>Track</b>, and a small piece of that ring is marked <b>Sector</b>.",
      "Example (slide 10): a platter has 1000 tracks, each containing 33 sectors. Track capacity = number of sectors per track × bytes per sector = 33 × 512 = <b>16,896 bytes</b>.",
      "A <b>sector</b> is the <b>smallest addressable portion</b> of a disk, usually <b>512 bytes</b>.",
      "Another view of sector organization is the one maintained by the <b>OS file manager</b>: it views the file as a series of <b>clusters</b> of sectors. A <b>cluster</b> is a fixed number of <b>contiguous sectors</b>.",
      "Example (slide 11): sector size = 512 bytes and cluster size = 3 sectors, so the cluster size = 3 × 512 = <b>1536 bytes</b>. The slide has two figures:<br>• a disk whose top surface has one small dark piece of a ring labelled \"Sector\" and a longer dark run labelled \"Cluster of 3 Sectors\";<br>• a stack of 4 platters with a small yellow piece on the top platter labelled \"Cluster\".",
      "Figure (slide 12): a disk surface with concentric tracks. <b>A</b> = track (one ring); <b>B</b> = geometrical sector (a pie-shaped wedge across all tracks); <b>C</b> = track sector (the part of the wedge on one track); <b>D</b> = cluster (a run of neighbouring sectors along one track).",
      "A <b>cylinder</b> is the set of tracks directly above/below each other. All data on one cylinder can be read <b>without moving the arm</b>. Number of cylinders = number of tracks per surface.",
      "Figure (slide 13, cylinder): a stack of 4 platters with the same yellow ring highlighted on every platter, labelled <b>Cylinder</b>.",
      "So a platter has four components: <b>sector</b>, <b>cluster</b>, <b>track</b>, <b>cylinder</b> (figure, slide 14: four stacks of platters, each highlighting one of them).",
      "<b>2. Read/write heads</b>: the small part of the disk that moves above the disk platter. Heads only fly above the platter surface with clearance of as little as <b>3 nanometers</b>. A read/write head <b>moves to the track that contains the data</b> to be transferred. Each surface has its own read/write head.",
      "<b>3. Arm assembly</b>: an internal set of hard disk components containing the arms, which contain the read/write heads. Its role is to <b>read and write information</b> from a set of platters coated with a thin magnetic material. When the arm assembly stops working, the drive fails. On a read of a particular byte, the OS finds the correct platter, track and sector, reads the <b>entire sector into a buffer</b> (a special area in memory), then finds the requested byte within that buffer.",
      "<b>4. Spindle</b> holds the platters in a <b>fixed position</b>, with <b>enough space for the read/write arms</b> to get the data on the disks, and <b>rotates</b> them, bringing the sector under the head.",
      "<b>5. Arms</b> carry, guide and move the heads. Moving the arm is called <b>seeking</b>, and it is usually the <b>slowest</b> part.",
      "Figure (slide 20): three <b>platters</b> on one <b>spindle</b>, with a <b>rotation</b> arrow. Each platter has a ring of small segments: the ring on the top platter is labelled <b>track t</b> and one segment of the ring (middle platter) is labelled <b>sector s</b>; the same track on all platters, joined by dashed lines, is <b>cylinder c</b>. Each platter has a <b>read-write head</b> (a dark square) at the end of an <b>arm</b>, and all arms are fixed to the <b>arm assembly</b>."
     ]
    },
    {
     "h": "Capacity formulas",
     "formula": [
      "Sector capacity = bytes per sector (512 B)",
      "Cluster capacity = sectors per cluster × bytes per sector",
      "Track capacity = sectors per track × bytes per sector",
      "Cylinder capacity = tracks per cylinder × track capacity",
      "Drive capacity = number of cylinders × cylinder capacity",
      "Platters = cylinder height / 2   (surfaces = cylinder height)",
      "Number of cylinders = tracks per surface"
     ]
    },
    {
     "h": "Worked problem (slides 22–26)",
     "pts": [
      "Given: 90,000 fixed-length records of 256 B; 512 B/sector; 60 sectors/track; cylinder height 14 tracks; 5000 tracks/surface; 4 sectors/cluster.",
      "Platters = 14/2 = <b>7</b>; sides = <b>14</b>; track size = 60×512 = <b>30,720 B</b>; cylinders = <b>5000</b>.",
      "Cylinder size = 14 × 30,720 = <b>430,080 B</b>; sectors per cylinder = 430,080/512 = <b>840</b>.",
      "File size = 90,000 × 256 = <b>23,040,000 B</b>. Records/sector = 512/256 = <b>2</b>; records/track = 30,720/256 = <b>120</b>; records/cylinder = 430,080/256 = <b>1680</b>.",
      "Sectors for file = 23,040,000/512 = <b>45,000</b>; tracks = 23,040,000/30,720 = <b>750</b>; cylinders = 23,040,000/430,080 = <b>53.57</b> (‡ 54 whole cylinders).",
      "Drive capacity = 5000 × 430,080 = <b>2,150,400,000 B</b>."
     ]
    },
    {
     "h": "Organizing tracks by sectors vs by blocks",
     "pts": [
      "<b>By sectors</b>: used by the <b>OS</b>. <b>Slow access</b> or <b>fragmentation</b> when handling a file of records. Fragmentation is loss of space within a sector, due to records not fitting exactly in a sector (e.g. sector size is 512 B and record size is 300 B). Some OSs allow the <b>system administrator to use clusters</b>.",
      "<b>By blocks</b>: used by the <b>DBMS</b>. Disk tracks may be divided into <b>user-defined blocks (pages)</b> rather than sectors. A block is usually organized to contain an <b>integral number of logical records</b>.",
      "<b>Blocking factor</b> = number of records stored in each block. No internal fragmentation and no record spans two blocks.",
      "In the block-addressing scheme each block of data is accompanied by one or more <b>sub-blocks</b> containing extra information about the block. A block typically contains:<br>• <b>Count sub-block</b>: the number of bytes in the block.<br>• <b>Key sub-block</b> (optional): the key of the last record in the data sub-block, so the disk controller can search for a key without loading the block into main memory.<br>• <b>Data sub-block</b>: the data records.",
      "Figure (slide 29, sub-blocks): one block drawn as an arc of a track, made of a <b>key sub-block</b>, a <b>count sub-block</b> and the <b>data sub-block</b>, followed by a <b>gap</b> before the next block.",
      "Figure (slide 30, pages and blocks): a disk surface whose concentric tracks are cut into sectors, with gaps between them. Below it, one track is drawn as a row: sector 1, gap, sector 2, gap, sector 3, gap, sector 4, gap, …, and a brace shows <b>1 page/block = 4 sectors</b>."
     ]
    },
    {
     "h": "Non-data overhead",
     "pts": [
      "Space used for things other than data.",
      "Sector-organized: sector address, track address, condition (defective?) at the start of each sector, plus gaps between sectors.",
      "Block-organized: sub-blocks and inter-block gaps, so there is <b>more</b> non-data overhead than with sector addressing.",
      "<b>Exercise</b> (slides 32–34): a <b>block-addressable</b> disk with track size = 20,000 B, non-data overhead per block = 300 B, record size = 100 B. How many records can be stored per track if the blocking factor is (a) 10, (b) 60?<br>BF = 10: data sub-block = 1000; block = 1000+300 = 1300; ⌊20,000/1300⌋ = ⌊15.38⌋ = 15 blocks, so <b>150 records/track</b>.<br>BF = 60: data sub-block = 6000; block = 6000+300 = 6300; ⌊20,000/6300⌋ = ⌊3.17⌋ = 3 blocks, so <b>180 records/track</b>."
     ]
    },
    {
     "h": "The cost of a disk access",
     "formula": [
      "Average total time = Seek time + Rotational delay + Transfer time",
      "Revolution time (ms) = 60 × 1000 / RPM",
      "Average latency = ½ × revolution time   (min = 0, max = 1 revolution)",
      "Transfer time = (bytes transferred / bytes per track) × revolution time",
      "              = revolution time / sectors per track   (for one sector)"
     ],
     "pts": [
      "The time to access a sector in a track on a surface is divided into <b>3 components</b>: <b>seek time</b>, <b>rotational delay</b> and <b>transfer time</b>.",
      "Figure (slide 35): a disk with the arm reaching over it. Labels show the <b>seek time</b> (the arm moving to the track), the <b>rotational latency</b> (the disk turning the sector to the head) and the <b>transmission time</b> (the sector passing under the head).",
      "<b>Seek time</b>: time required to move the arm to the correct cylinder. The <b>largest</b> in cost. Typically:<br>• 5 ms to move from one track to the next (track-to-track).<br>• 50 ms maximum (from the inside track to the outside track).<br>• 30 ms average (from one random track to another random track).",
      "<b>Rotational delay (latency)</b>: time needed for the disk to rotate so the sector we want is under the read/write head. Hard disks usually rotate at about 5000 rpm, which is one revolution per 12 ms. Min latency = 0; max latency = time for one disk revolution; <b>average latency (r)</b> = (min + max)/2 = max/2 = time for ½ disk revolution = ½ × (60 × 1000)/RPM ms. Typically 6–8 ms average.",
      "<b>Transfer time</b>: the time for the read/write head to pass over a <b>block</b>. Transfer time = (number of bytes transferred / number of bytes on a track) × rotation time, or revolution time / number of sectors per track. E.g. with 63 sectors per track, the time to transfer one sector is 1/63 of a revolution."
     ],
     "table": [
      [
       "Time component",
       "Action"
      ],
      [
       "Seek time",
       "Time to move the read/write arm to the correct cylinder"
      ],
      [
       "Rotational delay (or latency)",
       "Time it takes for the disk to rotate so that the desired sector is under the read/write head"
      ],
      [
       "Transfer time",
       "Once the read/write head is positioned over the data, this is the time it takes for transferring data"
      ]
     ]
    },
    {
     "h": "Examples 1 and 2",
     "pts": [
      "<b>Ex 1</b>: average seek 8 ms, average rotational delay 3 ms, maximum rotational delay 6 ms, spindle speed 10,000 rpm, 170 sectors/track, sector size 512 B. Average time to read one sector? Transfer = revolution time / sectors per track = (1/10,000 min)/170 = (60/10,000 s)/170 = 6/170,000 s = 6/170 ms ≈ <b>0.035 ms</b>. Total = 8 + 3 + 0.035 = <b>11.035 ms</b>.",
      "<b>Ex 2</b> (a current disk, Seagate ST3200822A): capacity 200 GB; transfer rate: maximum internal 683 Mbits/sec, maximum external 100 Mbytes/sec; discs/heads 2/4; 512 bytes per sector; spindle speed 7200 rpm; average seek 8.5 ms; average latency 4.16 ms; 170 sectors per track. Average time to read one sector? Transfer = (1/7200 min)/170 = (60/7200 s)/170 = 6/(720 × 170) = 6/122,400 ≈ <b>0.05 ms</b>. Total = 8.5 + 4.16 + 0.05 = <b>12.71 ms</b>."
     ]
    },
    {
     "h": "Disk as a bottleneck",
     "pts": [
      "Processes are often <b>disk-bound</b>: the network and CPU wait a long time for the disk. Techniques:",
      "<b>1. Multiprocessing</b>: the CPU works on other jobs while waiting for the disk.",
      "<b>2. Disk striping</b>: put different blocks of the file on different drives, so independent processes do not interfere (parallelism).",
      "<b>3. RAID</b>: Redundant Array of Independent Disks.",
      "<b>4. RAM disk</b> (memory disk): part of main memory simulates a disk (speed vs volatility).",
      "<b>5. Disk cache</b>: a large block of memory holds pages from the disk. The cache is checked first, and on a miss the disk is accessed."
     ]
    },
    {
     "h": "Quiz (2), solved",
     "pts": [
      "Given: 20 surfaces, 800 tracks/surface, 25 sectors/track, 512 B/sector, 3600 rpm, seek 7 ms track-to-track, 28 ms average, 50 ms max.",
      "‡ (a) Revolution = 60,000/3600 = 16.67 ms, so <b>average latency = 8.33 ms</b>.",
      "‡ (b) <b>Disk capacity</b> = 20 × 800 × 25 × 512 = <b>204,800,000 B ≈ 195.3 MB</b>.",
      "‡ (c) <b>Read the whole disk, one cylinder at a time</b> (800 cylinders × 20 tracks). Assume each track costs average latency + one full revolution = 8.33 + 16.67 = 25 ms, so one cylinder = 20 × 25 = 500 ms. Moves: one average seek (28 ms) to reach the first cylinder, then 799 track-to-track seeks (7 ms).<br>Total ≈ 28 + 799×7 + 800×500 = 28 + 5,593 + 400,000 = <b>405,621 ms ≈ 405.6 s</b>. The slide gives no answer, so state your assumptions in the exam."
     ]
    }
   ],
   "cards": [
    [
     "DASD examples",
     "Magnetic disks (hard, floppy) and optical disks (CD-ROM, CD-R, CD-RW, DVD)."
    ],
    [
     "SASD example",
     "Magnetic tape."
    ],
    [
     "Sector",
     "The smallest addressable portion of a disk, usually 512 bytes."
    ],
    [
     "Cluster",
     "A fixed number of contiguous sectors (the OS file manager's view)."
    ],
    [
     "Cylinder",
     "Tracks directly above/below each other; readable without moving the arm."
    ],
    [
     "Number of cylinders =",
     "Number of tracks per surface."
    ],
    [
     "Seeking",
     "Moving the arm; usually the slowest part of a disk access."
    ],
    [
     "What carries, guides and moves the R/W heads?",
     "The arms."
    ],
    [
     "Spindle",
     "Holds the platters in a fixed position and rotates them."
    ],
    [
     "Blocking factor",
     "Number of records stored in each block."
    ],
    [
     "Sub-blocks",
     "Count (bytes in block), Key (optional, last record's key), Data."
    ],
    [
     "Fragmentation",
     "Loss of space within a sector because records do not fit exactly."
    ],
    [
     "Average latency formula",
     "½ × (60 × 1000 / RPM) ms."
    ],
    [
     "Transfer time (one sector)",
     "Revolution time / sectors per track."
    ],
    [
     "Access time",
     "Seek + rotational delay + transfer."
    ],
    [
     "5 fixes for the disk bottleneck",
     "Multiprocessing, disk striping, RAID, RAM disk, disk cache."
    ]
   ],
   "qa": [
    [
     "Mention the differences between seek time, rotational delay and transfer time.",
     "Seek time: time to move the read/write arm to the correct cylinder (the largest cost). Rotational delay (latency): time for the disk to rotate so the desired sector is under the head (average = half a revolution). Transfer time: once the head is over the data, the time to transfer it (revolution time / sectors per track per sector)."
    ],
    [
     "\"Network and CPU have to wait a long time for the disk.\" Give four techniques to solve this.",
     "Multiprocessing (CPU does other jobs while waiting); disk striping (blocks on different drives in parallel); RAID; RAM disk (memory simulates a disk); disk cache (memory holds disk pages, and a miss goes to disk)."
    ],
    [
     "Compare organizing tracks by sectors and by blocks.",
     "Sectors: used by the OS; fixed 512 B units; causes fragmentation and slow access for record files. Blocks: used by the DBMS; user-defined size holding an integral number of records (blocking factor); no internal fragmentation, no record spans two blocks; sub-blocks add more non-data overhead."
    ],
    [
     "A disk rotates at 6000 rpm. Find the average latency.",
     "Revolution = 60,000/6000 = 10 ms, so average latency = 5 ms."
    ],
    [
     "Sector = 512 B, cluster = 3 sectors. Cluster size?",
     "3 × 512 = 1536 bytes."
    ],
    [
     "A platter has 1000 tracks with 33 sectors each. Track capacity?",
     "33 × 512 = 16,896 bytes (the number of tracks does not matter for track capacity)."
    ],
    [
     "Consider a block-addressable disk: size of track = 20,000 bytes, non-data overhead per block = 300 bytes, record size = 100 bytes. How many records can be stored per track if the blocking factor is (a) 10, (b) 60?",
     "(a) Size of data sub-block = 10 × 100 = 1000 B, so block = 1000 + 300 = 1300 B; blocks per track = ⌊20,000/1300⌋ = ⌊15.38⌋ = 15, so records per track = 15 × 10 = <b>150</b>.<br>(b) Data sub-block = 6000 B, block = 6300 B; blocks per track = ⌊20,000/6300⌋ = ⌊3.17⌋ = 3, so records per track = 3 × 60 = <b>180</b>."
    ],
    [
     "Quiz (2): a disk has 20 surfaces, 800 tracks/surface, 25 sectors/track, 512 bytes/sector, 3600 rpm, 7 ms track-to-track seek, 28 ms average seek and 50 ms maximum seek. Find (a) the average latency and (b) the disk capacity.",
     "‡ (a) Revolution = 60 × 1000 / 3600 = 16.67 ms, so average latency = ½ × 16.67 = <b>8.33 ms</b>.<br>(b) Capacity = surfaces × tracks/surface × sectors/track × bytes/sector = 20 × 800 × 25 × 512 = <b>204,800,000 bytes</b> (≈ 195.3 MB)."
    ]
   ],
   "quiz": [
    {
     "q": "___ are used to carry, guide and move the read/write head.",
     "o": [
      [
       "Arms",
       "Correct. The arms carry, guide and move the read/write heads; moving them is called seeking, usually the slowest part of an access (L2, Disk components)."
      ],
      [
       "Arm assembly",
       "The arm assembly is the whole internal set that contains the arms."
      ],
      [
       "Platters",
       "Platters are the circular disks that STORE the magnetic data on both surfaces; they do not move the heads (L2, Disk components)."
      ],
      [
       "Spindle",
       "The spindle holds the platters in place and ROTATES them to bring a sector under the head; the arms move the heads (L2, Disk components)."
      ]
     ],
     "a": 0,
     "src": "Midterm Model A"
    },
    {
     "q": "___ is the time needed to move the read/write arm to the correct sector (cylinder).",
     "o": [
      [
       "Transfer time",
       "Transfer time is the time for the head to pass over the data once it is positioned, not the time to move the arm (L2, Cost of a disk access)."
      ],
      [
       "Latency",
       "Latency (rotational delay) is the wait for the disk to rotate the sector under the head, after the arm is already in place (L2)."
      ],
      [
       "Rotational time",
       "Rotation is done by the spindle and gives rotational delay; moving the arm to the right cylinder is seek time (L2)."
      ],
      [
       "Seek time",
       "Correct. Seek time is the time to move the read/write arm to the correct cylinder; it is the largest part of the access cost (typical average 30 ms) (L2, Cost of a disk access)."
      ]
     ],
     "a": 3,
     "src": "Midterm Model A"
    },
    {
     "q": "All the information on a single cylinder can be accessed without:",
     "o": [
      [
       "Moving the spindle",
       "The spindle never needs to \"move\": it only rotates the platters all the time. What stays still on one cylinder is the arm assembly (L2, Cylinder)."
      ],
      [
       "Moving the arm assembly",
       "Correct. A cylinder is all tracks under the heads at one arm position."
      ],
      [
       "Rotation",
       "Rotation is still needed to bring sectors under the head."
      ],
      [
       "Seeking",
       "Seeking means moving the arm, which is the same idea, but the model answer is (b)."
      ]
     ],
     "a": 1,
     "src": "Midterm Model B"
    },
    {
     "q": "Sector size = 512 B, 4 sectors per cluster, 64 sectors per track. Cluster size =",
     "o": [
      [
       "32,768 bytes",
       "32,768 = 64 × 512 is the TRACK capacity (sectors per track × bytes per sector); a cluster is only 4 sectors (L2, Capacity formulas)."
      ],
      [
       "2048 bytes",
       "Correct. 4 × 512 = 2048. Sectors per track is a distractor."
      ],
      [
       "128 bytes",
       "128 = 512 / 4 comes from dividing instead of multiplying; cluster capacity = sectors per cluster × bytes per sector (L2)."
      ],
      [
       "8 bytes",
       "8 bytes matches no formula (it is not 4 × 512 or 64 × 512); a cluster of 4 sectors holds 4 × 512 = 2048 B (L2)."
      ]
     ],
     "a": 1,
     "src": "Midterm Model A"
    },
    {
     "q": "Average latency for a disk spinning at 5000 rpm is:",
     "o": [
      [
       "12 ms",
       "12 ms = 60,000 / 5000 is one FULL revolution; average latency is half a revolution, 6 ms (L2, Cost of a disk access)."
      ],
      [
       "6 ms",
       "Correct. Revolution = 60 × 1000 / 5000 = 12 ms, and average latency = ½ × 12 = 6 ms (L2, Cost of a disk access)."
      ],
      [
       "3 ms",
       "3 ms is a quarter revolution (12 / 4); the average wait is half a revolution, ½ × 12 = 6 ms (L2)."
      ],
      [
       "0.012 ms",
       "0.012 is one revolution in SECONDS (60 / 5000), wrongly labelled ms and not halved; the answer is ½ × 12 ms = 6 ms (L2)."
      ]
     ],
     "a": 1,
     "src": "Midterm Model A"
    },
    {
     "q": "Track = 20,000 B, overhead = 300 B/block, record = 100 B, blocking factor = 60. Records per track?",
     "o": [
      [
       "200",
       "200 = 20,000 / 100 ignores the 300 B overhead per block and the rule that only whole blocks fit; the right count is 3 blocks × 60 = 180 (L2, Non-data overhead)."
      ],
      [
       "180",
       "Correct. Block = 6300 B, ⌊20,000/6300⌋ = 3 blocks × 60 = 180."
      ],
      [
       "190",
       "190 ≈ 3.17 blocks × 60 counts a partial block; only ⌊20,000 / 6300⌋ = 3 whole blocks fit, giving 180 (L2)."
      ],
      [
       "150",
       "150 is the slide answer for blocking factor 10 (block 1300 B, 15 blocks × 10); with BF = 60 it is 180 (L2, Non-data overhead)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which unit is the smallest addressable portion of a disk?",
     "o": [
      [
       "Track",
       "A track is a whole ring on the surface, divided into many sectors, so it is not the smallest addressable unit (L2, Disk components)."
      ],
      [
       "Cluster",
       "A cluster is a fixed number of contiguous sectors (the OS view), so it is bigger than a sector (L2, Disk components)."
      ],
      [
       "Sector",
       "Correct. A sector is the smallest addressable portion of a disk, usually 512 bytes; tracks, clusters and cylinders are all made of sectors (L2, Disk components)."
      ],
      [
       "Cylinder",
       "A cylinder is the set of tracks above/below each other on all surfaces, the largest of these units (L2, Disk components)."
      ]
     ],
     "a": 2
    },
    {
     "q": "Which is a Serial Access Storage Device?",
     "o": [
      [
       "Hard disk",
       "A hard disk is a magnetic disk, which the lecture lists under DASD (direct access), not serial access (L2, Secondary storage devices)."
      ],
      [
       "CD-ROM",
       "A CD-ROM is an optical disk, listed under DASD (direct access); the only SASD example is magnetic tape (L2)."
      ],
      [
       "Magnetic tape",
       "Correct. The lecture lists magnetic tape as the Serial Access Storage Device (SASD); magnetic and optical disks are DASD (L2, Secondary storage devices)."
      ],
      [
       "DVD",
       "A DVD is an optical disk and therefore a DASD (direct access); the SASD example is magnetic tape (L2)."
      ]
     ],
     "a": 2
    },
    {
     "q": "The key sub-block contains:",
     "o": [
      [
       "The number of bytes in the block",
       "The number of bytes in the block is held in the COUNT sub-block; the key sub-block holds the key of the last record (L2, Sub-blocks)."
      ],
      [
       "The key of the last record in the data sub-block",
       "Correct. It lets the controller search without loading the block into memory."
      ],
      [
       "All the records",
       "The records themselves are in the DATA sub-block; the key sub-block holds only the last record's key (L2, Sub-blocks)."
      ],
      [
       "The sector address",
       "The sector address is non-data overhead of sector-organized tracks; it is not one of the block's sub-blocks (L2, Non-data overhead)."
      ]
     ],
     "a": 1
    },
    {
     "q": "A disk has cylinder height 14. How many platters does it have?",
     "o": [
      [
       "14",
       "Cylinder height 14 means 14 tracks per cylinder, i.e. 14 surfaces (sides). Each platter has 2 surfaces, so there are 7 platters (L2)."
      ],
      [
       "7",
       "Correct. Cylinder height = number of surfaces = 14, and each platter has two surfaces, so platters = 14 / 2 = 7 (L2, Worked problem)."
      ],
      [
       "28",
       "28 = 14 × 2 multiplies instead of dividing; platters = cylinder height / 2 = 7 (L2, Capacity formulas)."
      ],
      [
       "5000",
       "That is the number of cylinders in the slide example."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which technique puts different blocks of a file on different drives?",
     "o": [
      [
       "RAM disk",
       "A RAM disk is part of main memory simulating a disk; it does not spread a file's blocks over several drives (L2, Disk bottleneck)."
      ],
      [
       "Disk cache",
       "A disk cache is a large block of memory holding pages from the disk, checked before the disk; it uses one drive (L2, Disk bottleneck)."
      ],
      [
       "Disk striping",
       "Correct. Disk striping puts different blocks of a file on different drives, so independent processes can work in parallel without interfering (L2, Disk bottleneck)."
      ],
      [
       "Multiprocessing",
       "Multiprocessing lets the CPU work on other jobs while waiting for the disk; it does not place blocks on drives (L2, Disk bottleneck)."
      ]
     ],
     "a": 2
    },
    {
     "q": "7200 rpm, 170 sectors/track. Transfer time for one sector ≈",
     "o": [
      [
       "8.33 ms",
       "8.33 ms = 60,000 / 7200 is one full revolution, i.e. the time to transfer a whole track, not one sector (L2, Example 2)."
      ],
      [
       "4.16 ms",
       "4.16 ms is half a revolution, the average latency in Example 2, not the transfer time (L2)."
      ],
      [
       "0.05 ms",
       "Correct. Revolution = 60,000 / 7200 = 8.33 ms; one sector = 8.33 / 170 ≈ 0.049 ≈ 0.05 ms (L2, Example 2)."
      ],
      [
       "170 ms",
       "170 is the number of sectors per track, not a time; transfer for one sector = revolution / 170 ≈ 0.05 ms (L2)."
      ]
     ],
     "a": 2
    }
   ]
  },
  {
   "n": 3,
   "title": "Logical File Organization: Fields and Records",
   "notes": [
    {
     "h": "File input and output",
     "pts": [
      "<b>Text file</b>: a sequence of characters (e.g. C source code), viewable in a text editor.",
      "<b>Binary file</b>: a sequence of bytes (e.g. movie, music), which needs a specialized program.",
      "Files can be <b>input</b> files (the program reads) or <b>output</b> files (the program writes)."
     ]
    },
    {
     "h": "File of records",
     "pts": [
      "The logical view: data is a collection of <b>records</b>.",
      "<b>Record</b>: a group of fields forming a logical unit.",
      "<b>Field</b>: a data value, the smallest unit of data with logical meaning. Fields have names, types, lengths and values.",
      "Three file structures: <b>stream</b>, <b>field</b> and <b>record</b> structures."
     ]
    },
    {
     "h": "1. Stream files",
     "pts": [
      "Information is written as a stream of bytes containing <b>no added information</b>.",
      "Example: <code>AmesMary123 MapleStillwaterOK74075MasonAlan90 EastgateAdaOK74820</code>.",
      "Problem: there is <b>no way to get the information back</b> in the organized record format."
     ]
    },
    {
     "h": "2. Field structures (4 ways)",
     "pts": [
      "<b>Fixed length</b>: e.g. lengths 5, 7, 25 → <code>87358CARROLLALICE IN WONDERLAND</code>, <code>03818FOLK&nbsp;&nbsp;&nbsp;FILE STRUCTURES</code>.",
      "<b>Length indicator</b> at the start of each field → <code>058735907CARROLL19ALICE IN WONDERLAND</code>.",
      "<b>keyword = value</b> → <code>ISBN=87359 AU=CARROLL TI=ALICE IN WONDERLAND</code>.",
      "<b>Delimiter</b> at the end of each field → <code>87359|CARROLL|ALICE IN WONDERLAND|</code>."
     ]
    },
    {
     "h": "Field structures: advantages and disadvantages",
     "table": [
      [
       "Type",
       "Advantage",
       "Disadvantage"
      ],
      [
       "Fixed",
       "Easy to read/store",
       "Wastes space with padding"
      ],
      [
       "Length indicator",
       "Easy to jump ahead to the end of the field",
       "Long fields need more than 1 byte to store the length (max size > 256)"
      ],
      [
       "Delimited",
       "May waste less space than length-based",
       "Must check every byte of the field against the delimiter"
      ],
      [
       "Keyword",
       "Fields are self-describing; allows missing fields",
       "Wastes space with keywords"
      ]
     ]
    },
    {
     "h": "3. Record structures",
     "pts": [
      "A record is a set of fields that belong together at a higher level of organization. It is a conceptual tool and an important logical notion in the file's structure.",
      "Methods: (1) <b>fixed-length records with fixed-length fields</b>; (2) <b>fixed-length records with variable-length fields</b> (delimited fields or fields with length indicators, padded to a fixed record size); (3) <b>each record begins with a length indicator</b> (byte count), e.g. <code>3387359|CARROLL|ALICE IN WONDERLAND</code>."
     ]
    },
    {
     "h": "Record structures: advantages and disadvantages",
     "table": [
      [
       "Type",
       "Advantage",
       "Disadvantage"
      ],
      [
       "Fixed-length record",
       "Easy to jump to the i-th record",
       "Wastes space with padding"
      ],
      [
       "Variable-length record",
       "Saves space when record sizes are diverse",
       "Cannot jump to the i-th record unless through an index file"
      ]
     ]
    },
    {
     "h": "Managing files of records",
     "pts": [
      "<b>Primary key</b>: uniquely identifies a record and does not change. <b>Secondary key</b>: used for searching but does not typically identify a record uniquely.",
      "<b>Sequential search</b>: read records in order until a match. <b>O(n)</b>. Appropriate for pattern matching or files with few records.",
      "<b>Direct access</b>: seek directly to the start of the record. <b>O(1)</b>. Possible when we know the <b>RRN</b> (Relative Record Number: the first record has RRN 0, the next RRN 1…)."
     ]
    },
    {
     "h": "Seeking",
     "pts": [
      "Generic: <code>Seek(Source_File, Offset)</code>; e.g. <code>Seek(infile, 3030)</code> moves to byte 3030.",
      "C: <code>int fseek(FILE *stream, long offset, int origin)</code>, where origin <b>0</b> = beginning, <b>1</b> = current, <b>2</b> = end.<br><code>fseek(infile,0L,0)</code> → start; <code>fseek(infile,0L,2)</code> → end; <code>fseek(infile,-10L,1)</code> → back 10 bytes.",
      "C++: an fstream has two pointers. <code>seekg</code> moves the <b>get</b> (read) pointer and <code>seekp</code> moves the <b>put</b> (write) pointer. Origins: <code>ios::beg</code>, <code>ios::cur</code>, <code>ios::end</code>.<br><code>infile.seekg(0, ios::beg); infile.seekg(0, ios::end); infile.seekg(-10, ios::cur);</code>"
     ]
    },
    {
     "h": "Quiz (3) Q1: copy a file with no loops",
     "code": "#include <fstream>\nusing namespace std;\nint main() {\n    ifstream infile(\"d:\\\\IFile.txt\", ios::binary);\n    ofstream outfile(\"d:\\\\OFile.txt\", ios::binary);\n    infile.seekg(0, infile.end);      // jump to end\n    long size = infile.tellg();       // position = file size\n    infile.seekg(0);                  // back to start\n    char* buffer = new char[size];\n    infile.read(buffer, size);        // read everything at once\n    outfile.write(buffer, size);      // write everything at once\n    delete[] buffer;\n    outfile.close(); infile.close();\n    return 0;\n}",
     "pts": [
      "The trick: <code>seekg</code> to the end and <code>tellg</code> gives the size, then one <code>read</code> and one <code>write</code> of that size."
     ]
    },
    {
     "h": "Quiz (3) Q2: update a record by RRN",
     "code": "struct Item { char desc[31]; int qty; float price; };\n\nvoid UpdateRecord(fstream &file, Item &newItem, int RRN) {\n    file.seekp(RRN * sizeof(newItem), ios::beg); // byte offset = RRN × record size\n    file.write((char*)&newItem, sizeof(newItem)); // overwrite the old record\n}",
     "pts": [
      "Fixed-length fields and records mean every record has the same size, so the byte offset is exactly <b>RRN × record size</b>."
     ]
    }
   ],
   "cards": [
    [
     "Text vs binary file",
     "Text: sequence of characters (editable). Binary: sequence of bytes (needs a special program)."
    ],
    [
     "Field",
     "The smallest unit of data with logical meaning."
    ],
    [
     "Record",
     "A group of fields forming a logical unit."
    ],
    [
     "Stream file problem",
     "No added info, so records can't be recovered in organized form."
    ],
    [
     "4 field structures",
     "Fixed length, length indicator, keyword=value, delimiter."
    ],
    [
     "Fixed field: +/−",
     "+ easy to read/store; − wastes space with padding."
    ],
    [
     "Delimited field: +/−",
     "+ may waste less space; − must check every byte against the delimiter."
    ],
    [
     "Keyword field: +/−",
     "+ self-describing, allows missing fields; − wastes space with keywords."
    ],
    [
     "Length-indicator field: +/−",
     "+ easy to jump to field end; − long fields need >1 byte for the length."
    ],
    [
     "Fixed vs variable-length record",
     "Fixed: easy to jump to the i-th record but wastes padding. Variable: saves space but needs an index to jump."
    ],
    [
     "RRN",
     "Relative Record Number; the first record = 0. Offset = RRN × record size."
    ],
    [
     "fseek origins",
     "0 = beginning, 1 = current, 2 = end."
    ],
    [
     "seekg vs seekp",
     "seekg moves the get (read) pointer; seekp moves the put (write) pointer."
    ],
    [
     "Sequential vs direct access",
     "Sequential O(n); direct O(1)."
    ]
   ],
   "qa": [
    [
     "\"There are many ways of adding structure to files to maintain the identity of fields.\" Mention them with advantages and disadvantages.",
     "Fixed length (+ easy to read/store, − padding waste); length indicator (+ easy to jump to the end of the field, − long fields need more than 1 byte for the length); delimited (+ may waste less space, − must check every byte for the delimiter); keyword=value (+ self-describing and allows missing fields, − keywords waste space)."
    ],
    [
     "Consider a fixed-length field, fixed-length record file. Write UpdateRecord given the RRN.",
     "void UpdateRecord(fstream &file, Item &newItem, int RRN){ file.seekp(RRN*sizeof(newItem), ios::beg); file.write((char*)&newItem, sizeof(newItem)); }"
    ],
    [
     "When is sequential search useful?",
     "For pattern matching or files with few records. Otherwise it is O(n), so direct access (O(1) with the RRN) is preferred."
    ],
    [
     "Differentiate between primary and secondary keys.",
     "A primary key uniquely identifies a record and does not change. A secondary key is used to search but does not typically identify a record uniquely."
    ]
   ],
   "quiz": [
    {
     "q": "In a stream file structure, information is written as a stream of bytes containing:",
     "o": [
      [
       "No added information",
       "Correct. That is why records can't be recovered."
      ],
      [
       "No space",
       "Spaces may exist inside data; that is not the definition."
      ],
      [
       "Added information",
       "Added information (delimiters, lengths) is what field structures add."
      ],
      [
       "Space",
       "\"Space\" is not part of the definition; a stream file is a stream of bytes with NO added information, which is why records cannot be recovered (L3, Stream files)."
      ]
     ],
     "a": 0,
     "src": "Midterm Model C"
    },
    {
     "q": "Which field structure is \"self-describing and allows missing fields\"?",
     "o": [
      [
       "Fixed length",
       "Position defines the field; missing fields leave padding."
      ],
      [
       "Length indicator",
       "A length indicator only says how many bytes the field has; it does not name the field, so it is not self-describing (L3, Field structures)."
      ],
      [
       "Delimited",
       "Delimited fields are separated by a symbol such as |, but nothing names each field and a missing field still needs its delimiter (L3, Field structures)."
      ],
      [
       "Keyword = value",
       "Correct. Each field names itself (ISBN=…, AU=…)."
      ]
     ],
     "a": 3
    },
    {
     "q": "The main disadvantage of delimited fields is:",
     "o": [
      [
       "Waste space with padding",
       "Wasting space with padding is the disadvantage of FIXED-length fields; delimiters cost a byte-by-byte check instead (L3, Field structures table)."
      ],
      [
       "Have to check every byte of the field against the delimiter",
       "Correct. With a delimiter at the end of each field, the program must compare every byte of the field with the delimiter to find where it ends (L3, Field structures table)."
      ],
      [
       "Waste space with keywords",
       "Wasting space with keywords is the disadvantage of KEYWORD = VALUE fields, whose advantage is being self-describing (L3, Field structures table)."
      ],
      [
       "Long fields need more than 1 byte for length",
       "Needing more than one byte for long lengths is the disadvantage of LENGTH-INDICATOR fields (max size > 256), not delimited ones (L3)."
      ]
     ],
     "a": 1
    },
    {
     "q": "A disadvantage of variable-length records is:",
     "o": [
      [
       "Wasted space with padding",
       "Wasted padding is the disadvantage of FIXED-length records; variable-length records actually save space when sizes are diverse (L3, Record structures table)."
      ],
      [
       "You cannot jump to the i-th record unless through an index file",
       "Correct. Because records have different sizes, you cannot compute where record i starts, so you cannot jump to it without an index file (L3, Record structures table)."
      ],
      [
       "They cannot store text",
       "Variable-length records can hold any data including text (e.g. 87359|CARROLL|ALICE…); their weakness is no direct jump to record i (L3)."
      ],
      [
       "They require fixed-length fields",
       "Variable-length records usually use variable fields (delimiters or length indicators); fixed fields are not a requirement (L3, Record structures)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Direct access has the complexity:",
     "o": [
      [
       "O(n)",
       "O(n) is SEQUENTIAL search, reading records in order until a match; direct access seeks straight to the record (L3, Managing files of records)."
      ],
      [
       "O(1)",
       "Correct. Direct access seeks straight to the start of the record (offset known from its RRN), so the cost does not depend on n: O(1) (L3, Managing files of records)."
      ],
      [
       "Log(n)",
       "log n is the cost of BINARY search on a sorted file; direct access needs one seek, O(1) (L3–L4)."
      ],
      [
       "All answers correct",
       "The three costs belong to different methods: O(n) sequential, log n binary search, O(1) direct access, so they cannot all be right (L3)."
      ]
     ],
     "a": 1,
     "src": "Midterm Model B"
    },
    {
     "q": "Sequential access has the complexity:",
     "o": [
      [
       "O(n)",
       "Correct. Sequential search reads records in order until it finds a match, so in the worst case it reads all n records: O(n) (L3, Managing files of records)."
      ],
      [
       "O(1)",
       "O(1) is DIRECT access by RRN (one seek); sequential access may have to read every record (L3)."
      ],
      [
       "Log(n)",
       "log n is BINARY search on a file sorted by key; sequential search is O(n) (L3–L4)."
      ],
      [
       "All answers correct",
       "Only O(n) describes sequential access; O(1) is direct access and log n is binary search (L3)."
      ]
     ],
     "a": 0,
     "src": "Midterm Model A"
    },
    {
     "q": "A binary search has the complexity:",
     "o": [
      [
       "O(n)",
       "O(n) is linear (sequential) search, which reads records one by one; binary search halves the range each step (L4, Ordered files)."
      ],
      [
       "O(1)",
       "O(1) is direct access by RRN with a single seek; binary search needs about log₂ n probes (L3)."
      ],
      [
       "O(log₂ n)",
       "Correct. Binary search compares the key with the middle record and discards half the remaining range each step, so it needs about log₂ n accesses (L4, Ordered files)."
      ],
      [
       "O(n²)",
       "O(n²) would be slower than even sequential search; binary search on a sorted file is O(log₂ n) (L4)."
      ]
     ],
     "a": 2,
     "src": "Midterm Model C"
    },
    {
     "q": "fseek(infile, -10L, 1) does what?",
     "o": [
      [
       "Moves to byte 10 from the beginning",
       "Origin 1 is CURRENT, and the offset is negative."
      ],
      [
       "Moves back 10 bytes from the current position",
       "Correct. In fseek(stream, offset, origin), origin 1 = current position, and offset −10L moves 10 bytes backwards from there (L3, Seeking)."
      ],
      [
       "Moves 10 bytes before the end",
       "10 bytes before the end would be fseek(infile, -10L, 2); origin 2 is the end, but this call uses origin 1 (current) (L3, Seeking)."
      ],
      [
       "Closes the file",
       "fseek only moves the file pointer; closing the file is done with fclose (L3, Seeking)."
      ]
     ],
     "a": 1
    },
    {
     "q": "In C++, which function moves the PUT (write) pointer?",
     "o": [
      [
       "seekg",
       "seekg moves the GET (read) pointer; the put (write) pointer is moved with seekp (L3, Seeking)."
      ],
      [
       "seekp",
       "Correct. An fstream has two pointers: seekg moves the get (read) pointer and seekp moves the put (write) pointer (L3, Seeking)."
      ],
      [
       "tellg",
       "tellg only REPORTS the current get (read) position, e.g. to find the file size; it moves nothing (L3, Quiz 3)."
      ],
      [
       "fseek",
       "fseek is the C function for moving the file pointer; the question asks for the C++ put-pointer function, seekp (L3)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Fixed-length records of 40 bytes. Byte offset of the record with RRN 5?",
     "o": [
      [
       "5",
       "5 is the RRN itself; the byte offset is RRN × record size = 5 × 40 = 200 (L3, Direct access)."
      ],
      [
       "200",
       "Correct. RRNs start at 0, so byte offset = RRN × record size = 5 × 40 = 200 (L3, Direct access)."
      ],
      [
       "240",
       "240 = 6 × 40 treats RRN as 1-based; the first record has RRN 0, so the offset is 5 × 40 = 200 (L3)."
      ],
      [
       "45",
       "45 = 5 + 40 adds instead of multiplying; offset = RRN × record size = 200 (L3)."
      ]
     ],
     "a": 1
    }
   ]
  },
  {
   "n": 4,
   "title": "Ordered and Unordered (Heap / Sequential) Files",
   "notes": [
    {
     "h": "Basic file organizations",
     "pts": [
      "A file organization method defines the <b>record placement strategy</b> and the relationship between a record's <b>key value</b> and its <b>relative address</b>.",
      "Goal: efficient <b>retrieve</b> (logical neighbour, records matching a condition, a random record) and <b>update</b> (insert, delete, modify).",
      "Efficiency is measured by the <b>number of disk accesses</b>: fewer is better.",
      "Access strategies: <b>sequential search</b> is slow and O(n); <b>direct access</b> gets the record in one read, O(1).",
      "Methods: <b>unordered (heap) file</b>, <b>ordered (sequential) file</b>, <b>indexing</b>, <b>hashing</b>."
     ]
    },
    {
     "h": "Unordered file / heap file",
     "pts": [
      "An <b>unordered</b> set of records stored in <b>order of entry</b>, regardless of key. Also called an unordered sequential file or <b>pile</b> file.",
      "Supports create/destroy, open/close, insert/delete. Records are identified by a <b>record id (rid)</b>.",
      "<b>Retrieve</b>: only <b>linear search</b>.",
      "<b>Insert at the end</b>: simple and efficient, with one access to read the last page and one to write it back. Serious disadvantage: it <b>allows duplicate records</b> (e.g. inserting 4, Ali, CS at offset 80).",
      "<b>Delete</b>: find the record, delete it <b>physically or logically</b>, and write it back."
     ]
    },
    {
     "h": "Example heap file (20-byte records)",
     "table": [
      [
       "Offset",
       "St-no",
       "St-name",
       "St-Dept"
      ],
      [
       "0",
       "5",
       "Ahmed",
       "CS"
      ],
      [
       "20",
       "2",
       "Adam",
       "ITB"
      ],
      [
       "40",
       "1",
       "Mona",
       "ITD"
      ],
      [
       "60",
       "3",
       "Ali",
       "NW"
      ],
      [
       "80",
       "4",
       "Ali",
       "CS  ← appended"
      ]
     ]
    },
    {
     "h": "The cost model",
     "pts": [
      "<b>B</b> = number of data pages (page = block), <b>R</b> = records per page, <b>D</b> = average time to read/write a disk page, <b>C</b> = average time to process a record.",
      "Operations: <b>Scan</b> (fetch all records), <b>equality search</b> (\"sid = 23\"), <b>range search</b> (\"name after Smith\"), <b>Insert</b>, <b>Delete</b> (by rid)."
     ]
    },
    {
     "h": "Heap file costs",
     "pts": [
      "<b>Scan</b>: B(D + RC). Read B pages, and process R records on each.",
      "<b>Equality search</b>: 0.5B(D + RC). On average half the file is scanned. If nothing matches, the entire file is scanned.",
      "<b>Range search</b>: B(D + RC). Matches may be anywhere, so scan the whole file.",
      "<b>Insert</b>: <b>2D + C</b>. Fetch the last page, add the record, write it back.",
      "<b>Delete</b>: search cost + C + D."
     ]
    },
    {
     "h": "Ordered file / sequential file",
     "pts": [
      "An <b>ordered</b> set of records stored in order of the <b>key value</b>. Records are accessed sequentially from beginning to end.",
      "Insert: the new record goes into an exactly determined position, so <b>all records with a greater key move one location towards the end</b>. Delete and update need the opposite procedure.",
      "Example: inserting (4, Ali, CS) into 1, 2, 3, 5 places it at offset 60 and shifts Ahmed (5) to 80."
     ]
    },
    {
     "h": "Sorted file costs",
     "pts": [
      "<b>Scan</b>: B(D + RC).",
      "<b>Equality search</b>: <b>D·log₂B + C·log₂R</b>. Binary search over the pages, then binary search inside the page.",
      "<b>Range search</b>: search cost + cost of retrieving the matching records.",
      "<b>Insert</b>: search cost + 2 × (0.5B(D + RC)) = search + B(D + RC). Read and rewrite half the file on average.",
      "<b>Delete</b>: same as insert: search + B(D + RC)."
     ]
    },
    {
     "h": "Cost comparison table",
     "table": [
      [
       "Operation",
       "Heap file",
       "Sorted file",
       "Hashed file"
      ],
      [
       "Scan",
       "B(D+RC)",
       "B(D+RC)",
       "1.25B(D+RC)"
      ],
      [
       "Equality search",
       "0.5B(D+RC)",
       "D·log₂B + C·log₂R",
       "H + D + 0.5RC"
      ],
      [
       "Range search",
       "B(D+RC)",
       "search + retrieve matches",
       "1.25B(D+RC)"
      ],
      [
       "Insert",
       "2D + C",
       "search + 2·(0.5B(D+RC))",
       "search + C + D"
      ],
      [
       "Delete",
       "search + C + D",
       "search + 2·(0.5B(D+RC))",
       "search + C + D"
      ]
     ]
    },
    {
     "h": "Reading the exam choices",
     "pts": [
      "Exams expand \"search +\" into formulas. Sorted-file delete = <b>Dlog₂B + Clog₂R + B(D+RC)</b>. Hashed-file delete = <b>1.25B(D+RC) + C + D</b> in the model answer (it uses the hashed scan cost as its \"search\" term).",
      "Hashed scan is <b>1.25B(D+RC)</b> because hash buckets are typically kept about 80% full, so there are 1.25× as many pages."
     ]
    }
   ],
   "cards": [
    [
     "File organization method defines…",
     "Record placement strategy + relationship between key value and relative address."
    ],
    [
     "Efficiency is measured by…",
     "The number of disk accesses (fewer is better)."
    ],
    [
     "Heap file",
     "Unordered records in order of entry; aka pile file."
    ],
    [
     "Heap: search method",
     "Linear search only."
    ],
    [
     "Heap: main disadvantage",
     "Allows duplicate records."
    ],
    [
     "B, R, D, C",
     "Pages, records/page, time per page R/W, time per record processing."
    ],
    [
     "Heap scan",
     "B(D + RC)"
    ],
    [
     "Heap equality search",
     "0.5B(D + RC)"
    ],
    [
     "Heap insert",
     "2D + C"
    ],
    [
     "Sorted equality search",
     "D·log₂B + C·log₂R"
    ],
    [
     "Sorted insert/delete",
     "search + 2·(0.5B(D + RC)) = search + B(D + RC)"
    ],
    [
     "Hashed scan",
     "1.25B(D + RC)"
    ],
    [
     "Hashed equality search",
     "H + D + 0.5RC"
    ],
    [
     "Sorted file insert problem",
     "All records with a greater key must shift one place toward the end."
    ]
   ],
   "qa": [
    [
     "Why is inserting into a heap file cheap and what is the drawback?",
     "The record is appended to the last page: read the last page (D), add the record (C) and write it back (D), so 2D + C. The drawback is that it allows duplicate records."
    ],
    [
     "Why is the sorted-file insert cost search + B(D+RC)?",
     "After finding the position, all later records shift by one. On average half the file (0.5B pages) must be read and written back, so 2 × 0.5B(D+RC)."
    ],
    [
     "Explain the heap equality-search cost 0.5B(D+RC).",
     "On average the record is found after scanning half the pages. Each page costs D to read plus RC to check its R records. If no record matches, the whole file B(D+RC) is scanned."
    ],
    [
     "B = 100 pages, R = 50, D = 15 ms, C = 0.1 ms. Heap scan cost?",
     "B(D+RC) = 100 × (15 + 50×0.1) = 100 × 20 = 2000 ms."
    ]
   ],
   "quiz": [
    {
     "q": "The average cost for the INSERT process of the heap file is:",
     "o": [
      [
       "Dlog₂B + Clog₂R + B(D + RC)",
       "That is the SORTED-file insert/delete: binary search (Dlog₂B + Clog₂R) plus rewriting half the file twice, B(D + RC). A heap insert just appends (L4, Cost table)."
      ],
      [
       "Dlog₂B + Clog₂R + 2D + C",
       "This glues the sorted-file search cost onto the heap insert 2D + C; no operation in the cost table has this formula. A heap insert needs no search (L4)."
      ],
      [
       "1.25B(D + RC)",
       "1.25B(D + RC) is the HASHED-file scan (buckets ~80% full); a heap insert only touches the last page: 2D + C (L4, Cost table)."
      ],
      [
       "2D + C",
       "Correct. Read the last page, add the record, write it back."
      ]
     ],
     "a": 3,
     "src": "Midterm Model A"
    },
    {
     "q": "The average cost for the SCAN process of the hashed file is:",
     "o": [
      [
       "Dlog₂B + Clog₂R + B(D + RC)",
       "That is the SORTED-file insert/delete cost (binary search + shifting half the file); a hashed scan reads all bucket pages (L4, Cost table)."
      ],
      [
       "Dlog₂B + Clog₂R + 2D + C",
       "This mixes the sorted search with the heap insert 2D + C; it is not in the cost table, where the hashed scan is 1.25B(D + RC) (L4)."
      ],
      [
       "1.25B(D + RC)",
       "Correct. Buckets are ~80% full, so 1.25× the pages."
      ],
      [
       "B(D + RC)",
       "B(D + RC) is the scan cost of the HEAP and SORTED files; hashed pages are only ~80% full, so the hashed scan is 1.25 × that (L4, Cost table)."
      ]
     ],
     "a": 2,
     "src": "Midterm Models A & B"
    },
    {
     "q": "The average cost for the DELETE process of the sorted file is:",
     "o": [
      [
       "2D + C",
       "2D + C is the HEAP-file insert (read last page, add, write back); a sorted delete must search and shift records (L4, Cost table)."
      ],
      [
       "B(D + RC)",
       "The scan cost only; the search part is missing."
      ],
      [
       "1.25B(D + RC)",
       "1.25B(D + RC) is the HASHED-file scan; the sorted delete is binary search + B(D + RC) (L4, Cost table)."
      ],
      [
       "Dlog₂B + Clog₂R + B(D + RC)",
       "Correct. Search (binary) + shift half the file (read and write)."
      ]
     ],
     "a": 3,
     "src": "Midterm Model B"
    },
    {
     "q": "The average cost for EQUALITY SEARCH in the heap file is:",
     "o": [
      [
       "2D + C",
       "2D + C is the heap INSERT cost; an equality search must scan pages until the match is found (L4, Heap file costs)."
      ],
      [
       "0.5B(D + RC)",
       "Correct. A heap file has no order, so it is scanned linearly; on average the match is found after half the file: 0.5B(D + RC) (L4, Heap file costs)."
      ],
      [
       "1.25B(D + RC) + C + D",
       "1.25B(D + RC) + C + D is the HASHED-file delete in the model answer, not a heap search (L4, Reading the exam choices)."
      ],
      [
       "Dlog₂B + Clog₂R",
       "Dlog₂B + Clog₂R is binary search, the SORTED-file equality search; a heap file has no order, so it cannot use it (L4, Cost table)."
      ]
     ],
     "a": 1,
     "src": "Midterm Model C"
    },
    {
     "q": "The average cost for the SCAN process of the sorted file is:",
     "o": [
      [
       "Dlog₂B + Clog₂R",
       "Dlog₂B + Clog₂R is the sorted-file EQUALITY search; a scan must fetch every record, which reads all B pages (L4, Sorted file costs)."
      ],
      [
       "B(D + RC)",
       "Correct. A scan fetches every record, so all B pages are read (D each) and R records processed on each (RC): B(D + RC), the same as the heap scan (L4, Sorted file costs)."
      ],
      [
       "1.25B(D + RC)",
       "1.25B(D + RC) is the HASHED-file scan (pages ~80% full); a sorted file has B full pages, so B(D + RC) (L4)."
      ],
      [
       "0.5B(D + RC)",
       "0.5B(D + RC) is the HEAP-file equality search (half the file on average); a scan reads the whole file (L4)."
      ]
     ],
     "a": 1,
     "src": "Midterm Model C"
    },
    {
     "q": "The average cost for the DELETE process of the hash file is (model answer):",
     "o": [
      [
       "Dlog₂B + Clog₂R",
       "Dlog₂B + Clog₂R is the SORTED-file equality search, not a hashed delete (L4, Cost table)."
      ],
      [
       "B(D + RC)",
       "B(D + RC) is the heap/sorted SCAN cost; the hashed delete in the model answer is 1.25B(D + RC) + C + D (L4, Reading the exam choices)."
      ],
      [
       "1.25B(D + RC) + C + D",
       "Correct per the model answer: search + C + D."
      ],
      [
       "0.5B(D + RC)",
       "0.5B(D + RC) is the HEAP-file equality search; the hashed delete is search + C + D, written 1.25B(D + RC) + C + D in the model answer (L4)."
      ]
     ],
     "a": 2,
     "src": "Midterm Model C"
    },
    {
     "q": "In a heap file, searching can be done using:",
     "o": [
      [
       "Binary search",
       "Binary search needs records sorted by key, but a heap file stores them in order of entry, so it cannot be used (L4, Heap file)."
      ],
      [
       "Linear search only",
       "Correct. Records are stored in order of entry regardless of key, so the lecture says retrieval in a heap file is by linear search only (L4, Heap file)."
      ],
      [
       "Hashing",
       "Hashing needs a hashed file whose addresses are computed from the key; a heap file just stores records in entry order (L4)."
      ],
      [
       "B-tree index",
       "A B-tree index is a separate indexing structure; a plain heap file has none, so only linear search is possible (L4)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Main disadvantage of inserting at the end of a heap file:",
     "o": [
      [
       "It is slow",
       "Appending is fast: one read of the last page and one write back, 2D + C. Its serious disadvantage is allowing duplicates (L4, Heap file)."
      ],
      [
       "It allows duplicate records",
       "Correct. Appending never checks existing keys, so the same key can be inserted twice (e.g. a second record 4, Ali, CS at offset 80) (L4, Heap file)."
      ],
      [
       "It requires shifting records",
       "Shifting records with greater keys towards the end is needed in the SORTED (sequential) file, not the heap file (L4, Ordered file)."
      ],
      [
       "It needs a hash function",
       "A hash function belongs to hashed files; a heap file simply appends at the end without computing any address (L4)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Inserting into a sequential (sorted) file requires:",
     "o": [
      [
       "Appending at the end",
       "Appending at the end is the heap-file insert; in a sorted file it would break key order, so records must be shifted (L4, Ordered file)."
      ],
      [
       "Moving all records with a greater key one location towards the end",
       "Correct. The new record goes to its exact key position, so all records with a greater key move one location towards the end (e.g. 4 goes to offset 60 and 5 shifts to 80) (L4, Ordered file)."
      ],
      [
       "Rebuilding the hash table",
       "A hash table belongs to hashed files; a sequential file keeps records in key order and shifts them on insert (L4)."
      ],
      [
       "Nothing special",
       "Key order must be kept, so the record goes into an exact position and all greater keys shift towards the end (L4, Ordered file)."
      ]
     ],
     "a": 1
    },
    {
     "q": "B = 200 pages, R = 10, D = 10 ms, C = 1 ms. Heap equality search cost?",
     "o": [
      [
       "4000 ms",
       "4000 ms = 200 × (10 + 10) is the full SCAN B(D + RC); equality search scans half the file on average (L4, Heap file costs)."
      ],
      [
       "2000 ms",
       "Correct. Equality search = 0.5B(D + RC) = 0.5 × 200 × (10 + 10 × 1) = 100 × 20 = 2000 ms (L4, Heap file costs)."
      ],
      [
       "21 ms",
       "21 ms = 2 × 10 + 1 is the heap INSERT cost 2D + C, not the equality search (L4)."
      ],
      [
       "1000 ms",
       "1000 ms = 0.5 × 200 × 10 drops the RC term (10 records × 1 ms per page); the right value is 0.5 × 200 × 20 = 2000 ms (L4)."
      ]
     ],
     "a": 1
    }
   ]
  },
  {
   "n": 5,
   "title": "Hashing (from summary and exams)",
   "notes": [
    {
     "h": "Why hashing?",
     "pts": [
      "Hashing is a useful searching technique for implementing indexes. Its main motivation is to <b>improve search time</b>.",
      "Search time: simple indexes with binary search <b>O(log N)</b>; B-trees <b>O(log<sub>k</sub> N)</b>; hashing <b>O(1)</b>."
     ]
    },
    {
     "h": "What is hashing?",
     "pts": [
      "Discover the location of a key by simply examining the key. For that we design a <b>hash function</b>.",
      "A hash function <b>h(k)</b> transforms a <b>key</b> into an <b>address</b>. The address space is chosen beforehand, e.g. 1000 available addresses, so h maps all possible keys U to {0, 1, …, 999}.",
      "With hashing there is <b>no obvious connection between the key and the location</b>.",
      "The address of each record is determined by a mathematical algorithm. This is <b>hashed</b> file organization.",
      "A <b>bucket</b> is a unit of storage that can hold one or more records in a hash file."
     ]
    },
    {
     "h": "Collisions",
     "pts": [
      "Two different keys may be transformed into the <b>same address</b>. That is a <b>collision</b>.",
      "Keys that collide are called <b>synonyms</b>."
     ]
    },
    {
     "h": "A simple hash function (Midterm Model A)",
     "code": "int Hash(char key[12], int maxAddress) {\n    int sum = 0;\n    for (int j = 0; j < 12; j = j + 2)\n        sum = sum + key[j] * key[j + 1];  // fold pairs of characters\n    sum = sum % 19937;                   // keep the sum bounded (prime)\n    return sum % maxAddress;             // map into 0 .. maxAddress-1\n}",
     "pts": [
      "Step 1: represent the key numerically, combining pairs of characters (ASCII codes).",
      "Step 2: fold and add, dividing by a prime (19937) to prevent overflow.",
      "Step 3: divide by the address-space size and use the remainder as the home address."
     ]
    },
    {
     "h": "Hashed file costs",
     "table": [
      [
       "Operation",
       "Hashed file cost"
      ],
      [
       "Scan",
       "1.25B(D + RC)"
      ],
      [
       "Equality search",
       "H + D + 0.5RC  (H = time to compute the hash)"
      ],
      [
       "Range search",
       "1.25B(D + RC)  (hashing does not keep order, so scan everything)"
      ],
      [
       "Insert",
       "search + C + D"
      ],
      [
       "Delete",
       "search + C + D"
      ]
     ]
    }
   ],
   "cards": [
    [
     "Hash function h(k)",
     "Transforms a key into an address."
    ],
    [
     "Collision",
     "Two different keys hash to the same address."
    ],
    [
     "Synonyms",
     "Keys that collide (same address)."
    ],
    [
     "Bucket",
     "A storage unit holding one or more records in a hash file."
    ],
    [
     "Search time: index / B-tree / hashing",
     "O(log N) / O(log_k N) / O(1)."
    ],
    [
     "Hashed equality search cost",
     "H + D + 0.5RC"
    ],
    [
     "Why hashed range search is slow",
     "Hashing destroys key order, so the whole file (1.25B pages) is scanned."
    ],
    [
     "Hashed organization",
     "The address of each record is determined by a mathematical algorithm."
    ]
   ],
   "qa": [
    [
     "Write a C++ function to implement a simple hashing algorithm.",
     "int Hash(char key[12], int maxAddress){ int sum=0; for(int j=0;j<12;j+=2) sum += key[j]*key[j+1]; sum %= 19937; return sum % maxAddress; }"
    ],
    [
     "Define collision and synonyms.",
     "A collision happens when two different keys produce the same address. The keys involved are called synonyms."
    ],
    [
     "Why is hashing faster than indexing?",
     "A hash function computes the address directly from the key, so O(1). A simple index needs binary search O(log N) and a B-tree needs O(log_k N)."
    ]
   ],
   "quiz": [
    {
     "q": "The address of each record of a file is determined by a mathematical algorithm known as:",
     "o": [
      [
       "Sequential",
       "A sequential (ordered) file places records in order of key value; no algorithm computes each record's address (L4, Ordered file)."
      ],
      [
       "Indexed",
       "An indexed file finds records through a separate index (lookup) structure, not by computing the address with a formula (L5, Why hashing?)."
      ],
      [
       "Hashed",
       "Correct. In hashed file organization a hash function h(k), a mathematical algorithm, computes each record's address from its key (L5, What is hashing?)."
      ],
      [
       "None",
       "\"None\" is wrong because the lecture names this exact organization: hashed, where h(k) computes the address (L5)."
      ]
     ],
     "a": 2,
     "src": "Midterm Model B"
    },
    {
     "q": "A unit of storage that can store one or more records in a hash file organization is:",
     "o": [
      [
       "Buckets",
       "Correct. The lecture defines a bucket as a unit of storage that can hold one or more records in a hash file (L5, What is hashing?)."
      ],
      [
       "Disk pages",
       "A general storage term, not the hashing term."
      ],
      [
       "Blocks",
       "Blocks are how the DBMS physically organizes tracks (L2); in a hash file the storage unit is called a bucket (L5)."
      ],
      [
       "Nodes",
       "Nodes belong to trees and linked lists (e.g. B-trees); the hash-file storage unit is the bucket (L5)."
      ]
     ],
     "a": 0,
     "src": "Midterm Model C"
    },
    {
     "q": "When two different keys produce the same address, this is called:",
     "o": [
      [
       "Overflow",
       "Related, but the event itself is a collision."
      ],
      [
       "A collision",
       "Correct. When two different keys are transformed by h(k) into the same address, that event is a collision; the keys themselves are called synonyms (L5, Collisions)."
      ],
      [
       "A synonym",
       "Synonyms are the KEYS that collide (hash to the same address); the event itself is called a collision (L5, Collisions)."
      ],
      [
       "Fragmentation",
       "Fragmentation is wasted space inside a sector when records do not fit exactly (L2); it is unrelated to two keys sharing an address (L5)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Search time with hashing is typically:",
     "o": [
      [
       "O(n)",
       "O(n) is sequential search, reading records one by one; hashing computes the address directly (L3, L5)."
      ],
      [
       "O(log N)",
       "O(log N) is a simple index searched with binary search; hashing is faster at O(1) (L5, Why hashing?)."
      ],
      [
       "O(log_k N)",
       "O(log_k N) is the search time of B-trees; hashing goes straight to the address, O(1) (L5, Why hashing?)."
      ],
      [
       "O(1)",
       "Correct. h(k) computes the record's address directly from the key, so search time does not grow with N: O(1), versus O(log N) for an index and O(log_k N) for a B-tree (L5, Why hashing?)."
      ]
     ],
     "a": 3
    },
    {
     "q": "In the model hash function, why is sum % 19937 applied before % maxAddress?",
     "o": [
      [
       "To sort the keys",
       "Hashing does not sort anything; in fact it destroys key order (that is why hashed range search scans the whole file) (L5)."
      ],
      [
       "To keep the sum bounded (a prime divisor) and avoid overflow",
       "Correct. Dividing by the prime 19937 keeps the folded sum bounded so it does not overflow; the final % maxAddress then maps it to the home address (L5, Simple hash function)."
      ],
      [
       "To find synonyms",
       "The function only computes an address; synonyms are just keys that happen to get the same address, and % 19937 does not find them (L5)."
      ],
      [
       "To encrypt the key",
       "Hashing here is for addressing, not security."
      ]
     ],
     "a": 1
    },
    {
     "q": "Hashed file equality-search cost is:",
     "o": [
      [
       "H + D + 0.5RC",
       "Correct. Compute the hash (H), read one page (D), scan half the page on average."
      ],
      [
       "0.5B(D + RC)",
       "0.5B(D + RC) is the HEAP-file equality search (scan half the file); hashing reads only one page (L4, Cost table)."
      ],
      [
       "D·log₂B + C·log₂R",
       "D·log₂B + C·log₂R is binary search, the SORTED-file equality search; hashing computes the page directly (L4, Cost table)."
      ],
      [
       "2D + C",
       "2D + C is the HEAP-file insert (read last page, write it back), not a search (L4, Cost table)."
      ]
     ],
     "a": 0
    }
   ]
  }
 ],
 "exams": [
  {
   "title": "Midterm 2022/23 · Model A",
   "meta": "CS308 File Organization · 1 hour · 20 marks · Dr. M. AbdelFattah",
   "sections": [
    {
     "title": "Q1-a · Choose the correct answer",
     "marks": "7 marks",
     "items": [
      {
       "type": "mcq",
       "q": "……… are used to carry, guide and move the read/write head.",
       "o": [
        "Arms",
        "Arm Assembly",
        "Platters",
        "Spindle"
       ],
       "a": 0,
       "why": "Arms carry, guide and move the heads (moving them = seeking). The arm assembly is the whole set; platters store data; the spindle rotates.",
       "ow": [
        null,
        "The arm assembly is the whole internal set that holds the arms and heads; the part that carries and moves the heads is the arms (L2, Disk components).",
        "Platters are the circular disks that store data on both surfaces; they do not carry the heads (L2).",
        "The spindle holds the platters and rotates them under the heads; it does not move the heads (L2)."
       ]
      },
      {
       "type": "mcq",
       "q": "……… is the time needed to move the read/write arm to the correct sector.",
       "o": [
        "Transfer time",
        "Latency",
        "Rotational time",
        "Seek time"
       ],
       "a": 3,
       "why": "Seek = arm movement. Latency/rotation = waiting for the platter to spin. Transfer = reading the bytes.",
       "ow": [
        "Transfer time is the time for the head to pass over the data once positioned, not the arm movement (L2, Cost of a disk access).",
        "Latency (rotational delay) is the wait for the sector to rotate under the head, after the arm is already in place (L2).",
        "Rotation is done by the spindle and causes rotational delay; moving the arm is seeking (L2).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "Sequential access has the complexity ………",
       "o": [
        "O(n)",
        "O(1)",
        "Log(n)",
        "All answer correct"
       ],
       "a": 0,
       "why": "Sequential search reads records in order until it finds a match, so in the worst case it reads all n records: O(n) (L3, Managing files of records).",
       "ow": [
        null,
        "O(1) is direct access by RRN (one seek), not sequential access (L3).",
        "log n is binary search on a file sorted by key, not sequential access (L3–L4).",
        "The three belong to different methods (sequential O(n), binary log n, direct O(1)), so not all are correct (L3)."
       ]
      },
      {
       "type": "mcq",
       "q": "If sector size = 512 B, sectors per cluster = 4 and sectors per track = 64, the cluster size = ………",
       "o": [
        "32768 byte",
        "2048 byte",
        "128 byte",
        "8 byte"
       ],
       "a": 1,
       "why": "Cluster = 4 × 512 = 2048 B. 32768 = 64 × 512 is the track size (a distractor).",
       "ow": [
        "32768 = 64 × 512 is the TRACK capacity; a cluster is only 4 sectors: 4 × 512 (L2, Capacity formulas).",
        null,
        "128 = 512 / 4 divides instead of multiplying; cluster = sectors per cluster × bytes per sector (L2).",
        "8 bytes fits no formula; a 4-sector cluster holds 4 × 512 = 2048 B (L2)."
       ]
      },
      {
       "type": "mcq",
       "q": "The average cost for the insert process of the heap file is ………",
       "o": [
        "Dlog2B + Clog2R + B(D + RC)",
        "Dlog2B + Clog2R + 2D + C",
        "1.25B(D + RC)",
        "2D + C"
       ],
       "a": 3,
       "why": "Read the last page (D), add the record (C), write it back (D).",
       "ow": [
        "That is the sorted-file insert/delete: binary search plus shifting half the file, B(D + RC) (L4, Cost table).",
        "Sorted search added to 2D + C matches no entry in the cost table; a heap insert needs no search (L4).",
        "1.25B(D + RC) is the hashed-file scan (pages ~80% full), not a heap insert (L4).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "The average cost for the scan process of the hashed file is ………",
       "o": [
        "Dlog2B + Clog2R + B(D + RC)",
        "Dlog2B + Clog2R + 2D + C",
        "1.25B(D + RC)",
        "B(D+RC)"
       ],
       "a": 2,
       "why": "Hashed pages are ~80% full, so 1.25B pages to scan.",
       "ow": [
        "That is the sorted-file insert/delete cost (binary search + shifting half the file), not a scan (L4).",
        "Sorted search plus the heap insert 2D + C is not a table formula; the hashed scan is 1.25B(D + RC) (L4).",
        null,
        "B(D + RC) is the heap/sorted scan; hashed pages are ~80% full, so 1.25 times as many pages are read (L4)."
       ]
      }
     ]
    },
    {
     "title": "Q1-b",
     "marks": "2 marks",
     "items": [
      {
       "type": "written",
       "q": "Write a C++ function to implement a simple hashing algorithm.",
       "ans": "<pre>int Hash(char key[12], int maxAddress)\n{\n    int sum = 0;\n    for (int j = 0; j &lt; 12; j = j + 2)\n        sum = sum + key[j] * key[j+1];\n    sum = sum % 19937;\n    return sum % maxAddress;\n}</pre>",
       "why": "Fold pairs of characters, bound the sum with a prime modulus, then take mod of the address-space size to get the home address."
      }
     ]
    },
    {
     "title": "Q2",
     "marks": "11 marks",
     "items": [
      {
       "type": "written",
       "q": "a) \"There are many ways of adding structure to files to maintain the identity of fields.\" Mention these ways and show the advantages and disadvantages for each way. [2 marks]",
       "ans": "<table><tr><th>Type</th><th>Advantage</th><th>Disadvantage</th></tr><tr><td>Fixed</td><td>Easy to read/store</td><td>Wastes space with padding</td></tr><tr><td>With length indicator</td><td>Easy to jump ahead to the end of the field</td><td>Long fields need more than 1 byte to store the length (max size &gt; 256)</td></tr><tr><td>Delimited fields</td><td>May waste less space than length-based</td><td>Must check every byte of the field against the delimiter</td></tr><tr><td>Keyword</td><td>Fields are self-describing; allows missing fields</td><td>Wastes space with keywords</td></tr></table>",
       "why": "Lecture 3 table."
      },
      {
       "type": "written",
       "q": "b) Fixed-length records; 10,000 records; record = 128 B. Disk: 512 B/sector; 20 sectors/track; cylinder height = 12 tracks; 500 tracks/surface; non-data overhead = 500 B/block; spindle = 5000 rpm; average seek = 7 ms.<br>(i) Average latency.",
       "ans": "Average latency = time for ½ revolution = (0.5 × 1000 × 60) / 5000 = <b>6 ms</b>.",
       "why": "One revolution = 60,000/5000 = 12 ms, and half of that is 6 ms."
      },
      {
       "type": "written",
       "q": "(ii) Number of records/track if blocking factor is 20.",
       "ans": "Track capacity = 20 × 512 = 10,240 B<br>Block size = 128 × 20 + 500 = 3060 B<br>Blocks/track = ⌊10,240 / 3060⌋ = ⌊3.35⌋ = 3 blocks<br>Records/track = 3 × 20 = <b>60 records</b>",
       "why": "Always add the overhead to each block and take the floor, because a block cannot be split across tracks."
      },
      {
       "type": "written",
       "q": "(iii) Disk capacity.",
       "ans": "Disk capacity = track capacity × cylinder height × tracks/surface = 10,240 × 12 × 500 = <b>61,440,000 B ≈ 58.6 MB</b>.",
       "why": "Cylinder = 12 tracks and number of cylinders = 500. 61,440,000 / 1,048,576 ≈ 58.6 MB."
      },
      {
       "type": "written",
       "q": "(iv) Average access time to read three sectors.",
       "ans": "Revolution = 60,000/5000 = 12 ms<br>Transfer (3 sectors) = 3 × 12 / 20 = <b>1.8 ms</b><br>Average total = seek 7 + latency 6 + transfer 1.8 = <b>14.8 ms</b>",
       "why": "Each sector takes 1/20 of a revolution. The model answer writes this as [(3×60)/5000]/20, which is the same thing."
      }
     ]
    }
   ]
  },
  {
   "title": "Midterm 2022/23 · Model B",
   "meta": "CS308 File Organization · 1 hour · 20 marks · Dr. M. AbdelFattah",
   "sections": [
    {
     "title": "Q1-a · Choose the correct answer",
     "marks": "6 marks",
     "items": [
      {
       "type": "mcq",
       "q": "All the information on a single cylinder can be accessed without …………",
       "o": [
        "moving the Spindle",
        "moving the arm assembly",
        "Rotation",
        "Seeking"
       ],
       "a": 1,
       "why": "A cylinder is all tracks under the heads at one arm position, so no arm movement is needed. Rotation is still required.",
       "ow": [
        "The spindle never stops rotating the platters; what stays still while reading one cylinder is the arm assembly (L2).",
        null,
        "Rotation is still needed to bring each sector under the head; only arm movement is avoided (L2).",
        "Seeking (moving the arm) is the same idea, but the model answer is (b), the arm assembly, matching the slide wording \"without moving the arm\" (L2)."
       ]
      },
      {
       "type": "mcq",
       "q": "Direct access has the complexity ………",
       "o": [
        "O(n)",
        "O(1)",
        "Log(n)",
        "All answer correct"
       ],
       "a": 1,
       "why": "Direct access seeks straight to the record's byte offset (RRN × record size) in one access, so the cost does not depend on n: O(1) (L3, Managing files of records).",
       "ow": [
        "O(n) is sequential search, which reads records in order until a match (L3).",
        null,
        "log n is binary search on a sorted file; direct access needs a single seek (L3–L4).",
        "Only O(1) describes direct access; O(n) is sequential and log n is binary search (L3)."
       ]
      },
      {
       "type": "mcq",
       "q": "File Organization methods must provide ………",
       "o": [
        "Fast Access Time and good space Utilization",
        "Preparing/formatting storage media to store data",
        "Allocating storage space and addressing",
        "Managing free spaces"
       ],
       "a": 0,
       "why": "The other three are File MANAGEMENT techniques.",
       "ow": [
        null,
        "Preparing/formatting storage media is a file MANAGEMENT task, not what organization methods must provide (L1).",
        "Allocating storage space and addressing is a file MANAGEMENT task (L1).",
        "Managing free space is a file MANAGEMENT task; organization must give fast access and good space use (L1)."
       ]
      },
      {
       "type": "mcq",
       "q": "The address of each record of a file is determined by a mathematical algorithm known as ………",
       "o": [
        "Sequential",
        "Indexed",
        "Hashed",
        "None"
       ],
       "a": 2,
       "why": "In hashed file organization a hash function h(k), a mathematical algorithm, transforms each record's key into its address (L5, What is hashing?).",
       "ow": [
        "A sequential file stores records in key order; no algorithm computes each address (L4).",
        "An indexed file locates records through a separate index structure, not a formula (L5).",
        null,
        "Wrong because the lecture names this organization: hashed, where h(k) computes the address (L5)."
       ]
      },
      {
       "type": "mcq",
       "q": "The average cost for the delete process of the sorted file is ………",
       "o": [
        "2D + C",
        "B(D + RC)",
        "1.25B(D + RC)",
        "Dlog2B + Clog2R + B(D + RC)"
       ],
       "a": 3,
       "why": "Binary search to find it (Dlog₂B + Clog₂R), then shift half the file: 2 × 0.5B(D+RC) = B(D+RC).",
       "ow": [
        "2D + C is the heap-file insert (read last page, add, write back), not a sorted delete (L4).",
        "B(D + RC) is only the shifting part (or a scan); the search term Dlog₂B + Clog₂R is missing (L4).",
        "1.25B(D + RC) is the hashed-file scan, not a sorted delete (L4).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "The average cost for the scan process of the hashed file is ………",
       "o": [
        "Dlog2B + Clog2R + D + C",
        "B(D + RC)",
        "1.25B(D + RC)",
        "1.25B(D+RC) + D + C"
       ],
       "a": 2,
       "why": "A hashed scan reads every bucket page; buckets are kept about 80% full, so the data occupies 1/0.8 = 1.25 times as many pages: 1.25B(D + RC) (L4, Cost table).",
       "ow": [
        "This is a binary-search term plus D + C, matching no scan formula; a scan must read all pages (L4).",
        "B(D + RC) is the heap/sorted scan; hashed pages are only ~80% full, so it is 1.25 times larger (L4).",
        null,
        "1.25B(D + RC) + D + C is the hashed DELETE in the model answer (search + C + D), not the scan (L4)."
       ]
      }
     ]
    },
    {
     "title": "Q1-b",
     "marks": "3 marks",
     "items": [
      {
       "type": "written",
       "q": "Write a C++ program, with no loops, to copy the contents of d:\\src.txt to d:\\dest.txt (destination is empty).",
       "ans": "<pre>#include &lt;iostream&gt;\n#include &lt;fstream&gt;\nusing namespace std;\nint main() {\n    ifstream infile(\"d:\\\\src.txt\", ios::binary);\n    ofstream outfile(\"d:\\\\dest.txt\", ios::binary);\n    infile.seekg(0, infile.end);\n    long size = infile.tellg();\n    infile.seekg(0);\n    char* buffer = new char[size];\n    infile.read(buffer, size);\n    outfile.write(buffer, size);\n    delete[] buffer;\n    outfile.close(); infile.close();\n    return 0;\n}</pre>",
       "why": "seekg to the end, tellg gives the size, then one read and one write replace the loop."
      }
     ]
    },
    {
     "title": "Q2",
     "marks": "11 marks",
     "items": [
      {
       "type": "written",
       "q": "a) \"Network and CPU have to wait a long time for the disk to transmit data.\" Give four techniques to solve this problem. [2 marks]",
       "ans": "1. <b>Multiprocessing</b>: the CPU works on other jobs while waiting for the disk.<br>2. <b>Disk striping</b>: different blocks of the file on different drives, so independent processes don't interfere (parallelism).<br>3. <b>RAID</b>: Redundant Array of Independent Disks.<br>4. <b>RAM disk</b>: part of main memory simulates a disk (speed vs volatility).<br>5. <b>Disk cache</b>: memory holds disk pages; check the cache first and go to disk on a miss.",
       "why": "Lecture 2, \"Disk as a bottleneck\". Any four earn the marks."
      },
      {
       "type": "written",
       "q": "b) Fixed-length records; 10,000 records; record = 128 B. Disk: 512 B/sector; 30 sectors/track; cylinder height = 10; 1000 tracks/surface; 4 sectors/cluster; 1000 rpm; average seek = 10 ms; average rotational delay = 5 ms.<br>(i) Cylinder size.",
       "ans": "Cylinder size = 30 × 512 × 10 = <b>153,600 B = 150 KB</b><br>Records per cylinder = 153,600 / 128 = 1200 records",
       "why": "Track = 15,360 B, and ×10 tracks per cylinder."
      },
      {
       "type": "written",
       "q": "(ii) Number of tracks to save the file.",
       "ans": "File = 10,000 × 128 = 1,280,000 B = 1250 KB<br>Track = 30 × 512 = 15,360 B = 15 KB<br>Tracks = 1250 / 15 = 83.3, so <b>84 tracks</b>",
       "why": "Round UP: a partial track still has to be allocated."
      },
      {
       "type": "written",
       "q": "(iii) Total disk size.",
       "ans": "Cylinder size × tracks/surface = 150 KB × 1000 = 150,000 KB ≈ <b>146.5 MB</b>",
       "why": "Number of cylinders = tracks per surface = 1000."
      },
      {
       "type": "written",
       "q": "(iv) Average time to read two sectors.",
       "ans": "Revolution = 60,000/1000 = 60 ms<br>Transfer (2 sectors) = 2 × 60 / 30 = <b>4 ms</b><br>Total = seek 10 + rotational delay 5 + transfer 4 = <b>19 ms</b>",
       "why": "The model answer computes \"(2/1000)×60 = 120 ms\" and divides by 30. That gives the same 4 ms, but the clearer way is one revolution (60 ms) × 2/30. The average rotational delay (5 ms) is given, so don't recompute it from the rpm."
      }
     ]
    }
   ]
  },
  {
   "title": "Midterm 2022/23 · Model C",
   "meta": "CS308 File Organization · 1 hour · 20 marks · Dr. M. AbdelFattah",
   "sections": [
    {
     "title": "Q1-a · Choose the correct answer",
     "marks": "7 marks",
     "items": [
      {
       "type": "mcq",
       "q": "In stream file structure the information is written as a stream of bytes containing …………",
       "o": [
        "no added information",
        "no space",
        "added information",
        "space"
       ],
       "a": 0,
       "why": "That is why records can't be recovered from a stream file.",
       "ow": [
        null,
        "\"No space\" is not the definition; the point is that no added information (delimiters, lengths) is written (L3, Stream files).",
        "Added information (delimiters, length indicators, keywords) is what field structures add; a stream has none (L3).",
        "\"Space\" is not the definition; a stream file contains no added information (L3)."
       ]
      },
      {
       "type": "mcq",
       "q": "A binary search has the complexity ………",
       "o": [
        "O(n)",
        "O(1)",
        "O(log₂ n)",
        "O(n²)"
       ],
       "a": 2,
       "why": "Binary search on a sorted file compares the key with the middle record and discards half of the remaining range each step, so it needs about log₂ n accesses (L4, Sorted file).",
       "ow": [
        "O(n) is linear (sequential) search, which reads records one by one (L3).",
        "O(1) is direct access by RRN with one seek (L3).",
        null,
        "O(n²) would be slower than even sequential search; binary search is O(log₂ n) (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "Files are managed by system software: ………",
       "o": [
        "OS",
        "DBMS",
        "MIS",
        "Both a and b"
       ],
       "a": 3,
       "why": "The lecture names two file managers (system software): the operating system and the DBMS, so both a and b are correct (L1, File managers).",
       "ow": [
        "The OS is a file manager, but so is the DBMS, so this is only half the answer (L1).",
        "The DBMS is a file manager, but so is the OS, so this is only half the answer (L1).",
        "MIS is a management information system, not one of the file managers (OS, DBMS) named in the lecture (L1).",
        null
       ]
      },
      {
       "type": "mcq",
       "q": "A unit of storage that can store one or more records in a hash file organization is ………",
       "o": [
        "Buckets",
        "Disk pages",
        "Blocks",
        "Nodes"
       ],
       "a": 0,
       "why": "The lecture defines a bucket as the unit of storage that can hold one or more records in a hash file organization (L5, What is hashing?).",
       "ow": [
        null,
        "Disk page is a general storage term (page = block in the cost model); the hashing term is bucket (L5).",
        "Blocks are how the DBMS physically organizes tracks (L2); in hashing the unit is the bucket (L5).",
        "Nodes belong to trees and linked lists, not to hash file organization (L5)."
       ]
      },
      {
       "type": "mcq",
       "q": "The average cost for the search with equality selection of the heap file is ………",
       "o": [
        "2D + C",
        "0.5B(D + RC)",
        "1.25B(D + RC) + C + D",
        "Dlog2B + Clog2R"
       ],
       "a": 1,
       "why": "A heap file is unordered, so equality search is linear; on average the match is found after scanning half the file: 0.5B(D + RC) (L4, Heap file costs).",
       "ow": [
        "2D + C is the heap INSERT cost (read last page, write it back), not a search (L4).",
        null,
        "1.25B(D + RC) + C + D is the hashed-file delete in the model answer (L4).",
        "Dlog₂B + Clog₂R is binary search, the SORTED-file equality search; a heap file is unordered (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "The average cost for the delete process of the hash file is ………",
       "o": [
        "Dlog2B + Clog2R",
        "B(D + RC)",
        "1.25B(D + RC) + C + D",
        "0.5B(D + RC)"
       ],
       "a": 2,
       "why": "Model answer: search + C + D, with 1.25B(D+RC) used as the search term.",
       "ow": [
        "Dlog₂B + Clog₂R is the sorted-file equality search, not a hashed delete (L4).",
        "B(D + RC) is the heap/sorted scan cost (L4).",
        null,
        "0.5B(D + RC) is the heap-file equality search (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "The average cost for the scan process of the sorted file is ………",
       "o": [
        "Dlog2B + Clog2R",
        "B(D + RC)",
        "1.25B(D + RC)",
        "0.5B(D + RC)"
       ],
       "a": 1,
       "why": "A scan fetches every record, so all B pages are read (D each) and the R records on each processed (RC): B(D + RC), the same as the heap scan (L4, Sorted file costs).",
       "ow": [
        "Dlog₂B + Clog₂R is the sorted-file equality search (binary search), not a full scan (L4).",
        null,
        "1.25B(D + RC) is the hashed-file scan, where pages are only ~80% full (L4).",
        "0.5B(D + RC) is the heap-file equality search (half the file on average) (L4)."
       ]
      }
     ]
    },
    {
     "title": "Q1-b",
     "marks": "3 marks",
     "items": [
      {
       "type": "written",
       "q": "Consider a (fixed-length field, fixed-length record) file. Write the full body of UpdateRecord given the Relative Record Number (RRN).",
       "ans": "<pre>struct Item {\n    char desc[31];\n    int qty;\n    float price;\n};\n\nvoid UpdateRecord(fstream &amp;file, Item &amp;newItem, int RRN)\n{\n    // newItem contains the new record to overwrite the old one\n    file.seekp(RRN * sizeof(newItem), ios::beg);\n    file.write((char *) &amp;newItem, sizeof(newItem));\n}</pre>",
       "why": "Fixed sizes mean offset = RRN × record size. seekp positions the put pointer, and write overwrites the record."
      }
     ]
    },
    {
     "title": "Q2",
     "marks": "10 marks",
     "items": [
      {
       "type": "written",
       "q": "a) Mention the main differences between: (i) Physical file and logical file; (ii) Seek time, rotational delay and transfer time. [4 marks]",
       "ans": "<b>(i)</b> Physical file: a collection of bytes on disk; has a physical name (A.txt); used once when opening. Logical file: a channel connecting the program to the physical file; its logical name is a program variable (infile, fp); used as many times as needed (open, read, write, append, close).<br><b>(ii)</b> Seek time: time to move the read/write arm to the correct cylinder. Rotational delay (latency): time for the disk to rotate the desired sector under the head. Transfer time: once positioned over the data, the time to transfer it.",
       "why": "Lecture 1 and Lecture 2 tables."
      },
      {
       "type": "written",
       "q": "b) Same disk as Model B (512 B/sector, 30 sectors/track, cylinder height 10, 1000 tracks/surface, 1000 rpm, seek 10 ms, rotational delay 5 ms; 10,000 records × 128 B).<br>(i) Number of records per cylinder.",
       "ans": "Cylinder size = 30 × 512 × 10 = 153,600 B<br>Records/cylinder = 153,600 / 128 = <b>1200 records</b>",
       "why": "The model answer shows only the cylinder size. Finish with the division by record size."
      },
      {
       "type": "written",
       "q": "(ii) Number of sectors to save the file.",
       "ans": "File = 10,000 × 128 = 1,280,000 B<br>Sectors = 1,280,000 / 512 = <b>2500 sectors</b>",
       "why": "The model answer mislabels this line as \"tracks\", but the value is sectors."
      },
      {
       "type": "written",
       "q": "(iii) Total disk size.",
       "ans": "150 KB × 1000 = 150,000 KB ≈ <b>146.5 MB</b>",
       "why": "Cylinder size × number of cylinders."
      },
      {
       "type": "written",
       "q": "(iv) Average time to read four sectors.",
       "ans": "Revolution = 60 ms<br>Transfer = 4 × 60 / 30 = <b>8 ms</b><br>Total = 10 + 5 + 8 = <b>23 ms</b>",
       "why": "Seek + given rotational delay + transfer."
      }
     ]
    }
   ]
  }
 ]
};

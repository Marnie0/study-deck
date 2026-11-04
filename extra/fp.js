// Practice questions written for Study Deck (not the professor's), per lecture.
window.EXTRA = window.EXTRA || {};
EXTRA.fp = {
 "1": [
  {
   "q": "<code>log.txt</code> already exists and holds 500 bytes. A program runs <code>fp = fopen(\"log.txt\", \"a\");</code> and writes 20 bytes. What does the file contain afterwards?",
   "o": [
    [
     "The original 500 bytes followed by the new 20 bytes (520 bytes)",
     "Correct. \"a\" opens an existing file (or creates a new one) for output and appends at the end."
    ],
    [
     "Only the new 20 bytes",
     "That is what \"w\" does: it truncates the existing file before writing."
    ],
    [
     "The first 20 bytes are overwritten; the file stays 500 bytes",
     "That would be \"r+\" with writing at the start. \"a\" never overwrites existing data."
    ],
    [
     "Nothing changes, because \"a\" opens the file for reading only",
     "\"a\" is an output mode (create or append), so the 20 bytes are written at the end. Read-only access is mode \"r\" (L1, C modes)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which C++ flag combination is equivalent to the C mode <code>\"r+\"</code>?",
   "o": [
    [
     "ios::in",
     "ios::in alone is input only, the equivalent of \"r\". \"r+\" needs both input and output: ios::out | ios::in (L1, C mode ↔ C++ flags)."
    ],
    [
     "ios::out | ios::in",
     "Correct. \"r+\" opens an existing file for input and output."
    ],
    [
     "ios::out | ios::in | ios::trunc",
     "Adding trunc gives \"w+\", which destroys the existing contents."
    ],
    [
     "ios::out | ios::app",
     "ios::out | ios::app is the C++ form of \"a\" (output only, appending), with no input; \"r+\" is ios::out | ios::in (L1, C mode ↔ C++ flags)."
    ]
   ],
   "a": 1
  },
  {
   "q": "You must open an EXISTING binary file of employee records so you can both read records and overwrite some of them, without destroying the current contents. Which <code>fopen</code> mode fits?",
   "o": [
    [
     "\"wb+\"",
     "w+ creates or truncates the file, so all existing records would be lost."
    ],
    [
     "\"ab\"",
     "\"a\" is output only, and every write goes to the end, so you cannot read or overwrite records."
    ],
    [
     "\"rb+\"",
     "Correct. r+ opens an existing file for input and output, and b makes it binary. The slide sample uses this mode."
    ],
    [
     "\"rb\"",
     "\"r\" is input only, so you could not overwrite records."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the call <code>fread(&amp;blk, sizeof(blk), 5, fp);</code> what does the argument <code>5</code> mean?",
   "o": [
    [
     "The size of each element in bytes",
     "The element size is the 2nd argument, sizeof(blk)."
    ],
    [
     "The byte offset to start reading from",
     "fread has no offset argument. Positioning is done with fseek."
    ],
    [
     "The logical file name",
     "The logical file name is the 4th argument, fp."
    ],
    [
     "The number of elements to read",
     "Correct. The arguments are: address of the variable, element size, number of elements, logical file name."
    ]
   ],
   "a": 3
  },
  {
   "q": "In C++, the flag <code>ios::ate</code> moves the file pointer to the end of the file before EACH write operation.",
   "o": [
    [
     "True",
     "That describes ios::app. ios::ate only positions you at the end once, when the file is opened."
    ],
    [
     "False",
     "Correct. ios::ate = initially positioned at the end; ios::app = seek to the end before each write."
    ]
   ],
   "a": 1
  },
  {
   "q": "Given <code>fstream outfile; outfile.open(\"myfile.txt\", ios::out);</code>, which statement is correct?",
   "o": [
    [
     "<code>outfile</code> is the logical name and <code>\"myfile.txt\"</code> is the physical name",
     "Correct. The logical file is the program variable (the channel); the physical file is the name on disk."
    ],
    [
     "<code>\"myfile.txt\"</code> is the logical name and <code>outfile</code> is the physical name",
     "Reversed. The physical name is the name stored on disk."
    ],
    [
     "Both names are physical names",
     "outfile is a program variable, so it is a logical name."
    ],
    [
     "<code>ios::out</code> is the logical name",
     "ios::out is the opening mode (output), not a name; the logical name is outfile and the physical name is \"myfile.txt\" (L1, Opening files)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the following is a PHYSICAL file organization method?",
   "o": [
    [
     "Heap",
     "Heap is a LOGICAL organization method (with indexing and hashing); physical methods organize tracks by sectors or by blocks (L1)."
    ],
    [
     "Organizing tracks by sectors",
     "Correct. Physical methods organize tracks by sectors or by blocks."
    ],
    [
     "Indexing",
     "Indexing is a LOGICAL organization method; physical organization is about tracks organized by sectors or blocks (L1)."
    ],
    [
     "Hashing",
     "Hashing is a LOGICAL organization method (with heap and indexing); physical methods organize tracks by sectors or blocks (L1)."
    ]
   ],
   "a": 1
  },
  {
   "q": "A file holds exactly 3 employee records. This loop runs over it:<pre>while (!feof(fp)) {\n    fread(&amp;emp, sizeof(emp), 1, fp);\n    printf(\"%s %d\\n\", emp.name, emp.sal);\n}</pre>What problem can happen?",
   "o": [
    [
     "The first record is skipped",
     "The first fread reads record 1 normally; nothing is skipped."
    ],
    [
     "The loop never ends",
     "feof does become true once a read hits the end, so the loop ends."
    ],
    [
     "The last record may be printed twice",
     "Correct. feof only becomes true AFTER a read fails, so one extra iteration prints the old contents of emp again. Checking fread(...) == 1 is safer."
    ],
    [
     "fread returns 1 at end of file",
     "At end of file fread returns 0 (the number of elements read), not 1. That 0 is the reliable EOF check in C (L1, Reading and writing)."
    ]
   ],
   "a": 2
  },
  {
   "q": "When a program writes to a file, each byte is sent to the disk individually at the moment it is written.",
   "o": [
    [
     "True",
     "The slides say bytes are not sent one by one."
    ],
    [
     "False",
     "Correct. Bytes are collected in a buffer and sent as a block, which is why an abnormal termination before closing may lose data."
    ]
   ],
   "a": 1
  },
  {
   "q": "In C++, which logical name is connected by default to the keyboard?",
   "o": [
    [
     "cout",
     "cout is C++ standard output, connected to the console/screen, not the keyboard (L1, Standard I/O names)."
    ],
    [
     "cerr",
     "cerr is C++ standard error, also connected to the console/screen; the keyboard is standard input, cin (L1, Standard I/O names)."
    ],
    [
     "stdin",
     "stdin is the C name for standard input, not the C++ one."
    ],
    [
     "cin",
     "Correct. Standard input (keyboard) is stdin in C and cin in C++."
    ]
   ],
   "a": 3
  },
  {
   "q": "……… deal with data stored in secondary storage (files).",
   "o": [
    [
     "Data structures",
     "Data structures deal with data in main memory, not in secondary storage (L1, Data structure vs file structure)."
    ],
    [
     "File managers",
     "File managers (the OS and the DBMS) are system software that manage files; the structures for data in secondary storage are file structures (L1)."
    ],
    [
     "File structures",
     "Correct. File structures deal with data in secondary storage, data structures with data in main memory (L1, Data structure vs file structure)."
    ],
    [
     "Main memory",
     "Main memory is where data structures keep their data; it is a storage level, not a kind of structure (L1)."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: Data structures and file structures both involve a representation of data and operations for accessing data.",
   "o": [
    [
     "True",
     "Correct. Both have these two parts; they differ only in where the data lives: main memory vs secondary storage (L1, Data structure vs file structure)."
    ],
    [
     "False",
     "They share both parts; the only difference is main memory (data structures) vs secondary storage (file structures) (L1)."
    ]
   ],
   "a": 0
  },
  {
   "q": "A file is a collection of data placed on ………",
   "o": [
    [
     "Main memory (RAM)",
     "RAM is volatile and is where data is manipulated; a file is kept on secondary, non-volatile storage (L1, Files and computer storage)."
    ],
    [
     "Secondary, non-volatile storage",
     "Correct. A file is a collection of data placed on secondary, non-volatile storage such as a hard disk, tape or optical media (L1, Files and computer storage)."
    ],
    [
     "A buffer",
     "A buffer is a memory area where bytes are collected before being sent as a block; it is not where a file is kept (L1, Closing files)."
    ],
    [
     "A logical file",
     "A logical file is a channel from the program to the physical file, not the storage that holds the data (L1)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the lecture's Computer Storage figure, secondary storage is described as ………",
   "o": [
    [
     "Fast, small, expensive, volatile",
     "These are the properties of main memory (RAM), where data is manipulated (L1, Files and computer storage)."
    ],
    [
     "Fast, large, cheap, volatile",
     "Secondary storage is slow and stable, not fast and volatile (L1)."
    ],
    [
     "Slow, small, expensive, stable",
     "Secondary storage is large and cheap; small and expensive describe main memory (L1)."
    ],
    [
     "Slow, large, cheap, stable",
     "Correct. Data is stored on secondary storage, which is slow, large, cheap and stable (L1, Files and computer storage)."
    ]
   ],
   "a": 3
  },
  {
   "q": "……… is how programmers see the file (text, image, data file…).",
   "o": [
    [
     "Physical structure",
     "The physical structure is how the file is actually stored on secondary storage (L1, File structures)."
    ],
    [
     "Logical structure",
     "Correct. The logical structure is the programmer's view of the file; the physical structure is how it is stored (L1, File structures)."
    ],
    [
     "File organization",
     "File organization is about the methods (heap, indexing, hashing, sectors, blocks) used to arrange files (L1)."
    ],
    [
     "File management",
     "File management is formatting media, allocating space and managing free space (L1)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Hashing is an example of a ……… method.",
   "o": [
    [
     "Logical organization",
     "Correct. The logical organization methods are heap, indexing and hashing (L1, File organization)."
    ],
    [
     "Physical organization",
     "Physical organization methods organize tracks by sectors or by blocks (L1)."
    ],
    [
     "File management",
     "File management covers formatting media, allocating space and addressing, and managing free space (L1)."
    ],
    [
     "Data access",
     "Data access in the lecture is either sequential or direct; hashing is listed as an organization method (L1)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the following is NOT one of the file management tasks?",
   "o": [
    [
     "Preparing/formatting storage media",
     "This is a file management task (L1, File management)."
    ],
    [
     "Allocating storage space and addressing",
     "This is a file management task (L1, File management)."
    ],
    [
     "Managing free space",
     "This is a file management task (L1, File management)."
    ],
    [
     "Providing fast access time and good space utilization",
     "Correct. This is what file ORGANIZATION methods must provide, not a file management task (L1, File organization)."
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: The physical name of a file (e.g. A.txt) is used every time the program reads from or writes to the file.",
   "o": [
    [
     "True",
     "The physical name is used only once, when opening the file; reads and writes use the logical name (L1, Physical file vs logical file)."
    ],
    [
     "False",
     "Correct. The physical name is used once, at opening; after that the program uses the logical name as many times as needed (L1, Physical file vs logical file)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In both C and C++, the logical name is associated with the physical file at the time of ………",
   "o": [
    [
     "Reading the file",
     "Reading uses a logical name that is already linked to the physical file (L1)."
    ],
    [
     "Opening the file",
     "Correct. The logical name (e.g. outfile) is associated with the physical file (myfile.txt) when the file is opened (L1, Physical file vs logical file)."
    ],
    [
     "Closing the file",
     "Closing does the opposite: it frees the logical name for another physical file (L1, Closing files)."
    ],
    [
     "Declaring the variable",
     "Declaring (FILE *outfile; or fstream outfile;) only creates the logical name; it is not linked to any file yet (L1)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In C++, the logical name of a file is an object of the class ………",
   "o": [
    [
     "FILE",
     "FILE is the C type used for the logical name (FILE * outfile;), not the C++ class (L1)."
    ],
    [
     "ios",
     "ios is the class whose constants (ios::in, ios::out…) make up the open mode (L1)."
    ],
    [
     "fstream",
     "Correct. In C++ the logical name is an object of the class fstream: fstream outfile; (L1, Physical file vs logical file)."
    ],
    [
     "stdout",
     "stdout is the C logical name of standard output, not a class (L1, Standard I/O)."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the statement <code>fp = fopen(\"data.txt\", \"a\");</code> the argument <code>\"a\"</code> is the ………",
   "o": [
    [
     "Logical name",
     "The logical name is fp, the variable that receives the result of fopen (L1, Opening files)."
    ],
    [
     "Physical file",
     "The physical file is \"data.txt\" (L1, Opening files)."
    ],
    [
     "Method to open the file",
     "The method is fopen (L1, Opening files)."
    ],
    [
     "Mode",
     "Correct. The second argument is the mode; \"a\" creates a new file or appends to an existing one, for output (L1, Opening files)."
    ]
   ],
   "a": 3
  },
  {
   "q": "<code>report.txt</code> already holds 300 bytes. A program runs <code>fp = fopen(\"report.txt\", \"w\");</code>, writes 50 bytes and closes the file. How many bytes does the file hold now?",
   "o": [
    [
     "350",
     "350 = 300 + 50 would happen with mode \"a\" (append); \"w\" truncates the old contents (L1, Opening files)."
    ],
    [
     "50",
     "Correct. \"w\" truncates the existing file, so only the 50 new bytes remain (L1, Opening files)."
    ],
    [
     "300",
     "300 would mean the old size is kept and the first 50 bytes overwritten, as with \"r+\"; \"w\" truncates (L1)."
    ],
    [
     "0",
     "The file is truncated first, but the 50 bytes written afterwards stay in it (L1)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which C++ flag combination is equivalent to the C mode <code>\"a+\"</code>?",
   "o": [
    [
     "ios::out | ios::app",
     "out | app is the C mode \"a\" (append, output only) (L1, C mode ↔ C++ flags)."
    ],
    [
     "ios::out | ios::in | ios::trunc",
     "out | in | trunc is the C mode \"w+\" (L1)."
    ],
    [
     "ios::out | ios::in | ios::app",
     "Correct. \"a+\" = out | in | app: create/append, for input and output (L1, C mode ↔ C++ flags)."
    ],
    [
     "ios::in",
     "ios::in alone is the C mode \"r\" (L1)."
    ]
   ],
   "a": 2
  },
  {
   "q": "The C mode <code>\"wb\"</code> corresponds in C++ to ………",
   "o": [
    [
     "ios::out | ios::trunc | ios::binary",
     "Correct. \"w\" = out | trunc, and adding b adds | binary (L1, C mode ↔ C++ flags)."
    ],
    [
     "ios::in | ios::binary",
     "in | binary is \"rb\" (L1)."
    ],
    [
     "ios::out | ios::app | ios::binary",
     "out | app | binary is \"ab\" (L1)."
    ],
    [
     "ios::out | ios::in | ios::binary",
     "out | in | binary is \"r+b\" (L1)."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: In C++, the second argument of <code>open()</code> is a string such as <code>\"w\"</code>.",
   "o": [
    [
     "True",
     "The second argument in C++ is an integer built with bitwise OR of ios constants; strings like \"w\" are C's fopen modes (L1, Opening files)."
    ],
    [
     "False",
     "Correct. It is an integer whose value is set as a bitwise OR (|) of constants defined in the class ios, e.g. ios::out (L1, Opening files)."
    ]
   ],
   "a": 1
  },
  {
   "q": "What does closing a file do to its logical name?",
   "o": [
    [
     "Frees it so it can be used for another physical file",
     "Correct. Closing frees the logical name for another physical file, like hanging up the telephone after a call (L1, Closing files)."
    ],
    [
     "Deletes the physical file it was linked to",
     "Closing does not delete anything; the physical file stays on disk (L1)."
    ],
    [
     "Truncates the physical file",
     "Truncation is done by the \"w\" mode or ios::trunc when opening, not by closing (L1)."
    ],
    [
     "Links it permanently to the physical file",
     "The link is made at opening; closing removes it (L1)."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: If a program does not close its file, the OS closes it at the end of the program, but if the program terminates abnormally, data may be lost.",
   "o": [
    [
     "True",
     "Correct. The bytes wait in a buffer and are sent as a block, so an abnormal termination can lose the buffered data (L1, Closing files)."
    ],
    [
     "False",
     "The lecture says exactly this: the OS closes it at the end, but abnormal termination may lose data (L1)."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the generic operation <code>Read(Source_file, Destination_addr, Size)</code>, <code>Destination_addr</code> is ………",
   "o": [
    [
     "The logical file name the program reads from",
     "That is Source_file (L1, Reading and writing)."
    ],
    [
     "The number of bytes brought in from the file",
     "That is Size (L1, Reading and writing)."
    ],
    [
     "The first address of the memory block where the data will be read into",
     "Correct. Destination_addr is the first address of the memory block where we want to read the data (L1, Reading and writing)."
    ],
    [
     "The physical name of the file on disk",
     "Read works with the logical name, and Destination_addr is a memory address, not a file name (L1)."
    ]
   ],
   "a": 2
  },
  {
   "q": "In <code>fread(a, 1, 10, infile);</code> where <code>a</code> is a char array, the argument <code>1</code> is ………",
   "o": [
    [
     "The address of the variable",
     "The address is the first argument, a (L1, Reading and writing)."
    ],
    [
     "The number of elements",
     "The number of elements is the third argument, 10 (L1)."
    ],
    [
     "The logical file name",
     "The logical file name is the fourth argument, infile (L1)."
    ],
    [
     "The element size in bytes",
     "Correct. The second argument is the element size; a char occupies 1 byte, so it is 1 (L1, Reading and writing)."
    ]
   ],
   "a": 3
  },
  {
   "q": "In the slide-30 table, which C function is used to read a record from a file?",
   "o": [
    [
     "fread",
     "Correct. fread (File Read) reads a record: fread(&amp;emp, sizeof(emp), 1, my_file); (L1, Methods used to read from files)."
    ],
    [
     "fgetc",
     "fgetc (File Get Character) reads one character (L1)."
    ],
    [
     "fgets",
     "fgets (File Get String) reads a string (L1)."
    ],
    [
     "fscanf",
     "fscanf (File Scan Format) reads formatted text (L1)."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the slide-30 table, the shortcut name of <code>fscanf</code> is ………",
   "o": [
    [
     "File Get String",
     "File Get String is fgets (L1, Methods used to read from files)."
    ],
    [
     "File Get Character",
     "File Get Character is fgetc (L1)."
    ],
    [
     "File Scan Format",
     "Correct. fscanf = File Scan Format: it reads formatted text from a file (L1, Methods used to read from files)."
    ],
    [
     "File Read",
     "File Read is fread (L1)."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: In C, you detect the end of file by checking whether <code>fread</code> returned 0.",
   "o": [
    [
     "True",
     "Correct. int i = fread(&amp;c,1,1,infile); if (i==0) is true when the file has ended (L1, Detecting end of file)."
    ],
    [
     "False",
     "This is the C method on slide 36; the C++ method is infile.fail() or infile.eof() (L1)."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: In C++, with <code>infile &gt;&gt; c;</code> where <code>c</code> is a char, you must state how many bytes to transfer.",
   "o": [
    [
     "True",
     "The &gt;&gt; operator works at a higher level: since c is a char, it is implicit that only 1 byte is transferred (L1, Reading and writing)."
    ],
    [
     "False",
     "Correct. Because c is a char variable, &gt;&gt; implicitly transfers 1 byte; the byte count is given only with read/fread (L1, Reading and writing)."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: The standard logical names such as <code>stdout</code> and <code>cin</code> must be opened before the program uses them.",
   "o": [
    [
     "True",
     "Standard input, output and error do not need to be opened or closed in the program (L1, Standard I/O logical names)."
    ],
    [
     "False",
     "Correct. These streams (stdout/cout, stdin/cin, stderr/cerr) do not need to be opened or closed (L1, Standard I/O logical names)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the sample program that displays <code>emp.txt</code>, what is the purpose of <code>if (my_file == NULL)</code>?",
   "o": [
    [
     "To test whether the file opened",
     "Correct. fopen returns NULL when the file cannot be opened, so the program prints an error and exits (L1, Sample: read employee records)."
    ],
    [
     "To test whether the end of file was reached",
     "End of file is tested by while(!feof(my_file)) (L1)."
    ],
    [
     "To check whether fread read a whole record",
     "That is the safer check fread(...) == 1 from the tip, not the NULL test (L1)."
    ],
    [
     "To free the logical name",
     "Freeing the logical name is done by fclose(my_file); (L1)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which function does Method (1) <code>writeC()</code> use to write the character to <code>alphabet.txt</code>?",
   "o": [
    [
     "putchar",
     "putchar prints the character to the screen; it is used in readC() (L1, Full methods)."
    ],
    [
     "fputc",
     "Correct. writeC reads the character with getche() and writes it with fputc(ch, fp) (L1, Full methods)."
    ],
    [
     "fputs",
     "fputs writes strings; it is used in writeS() (L1)."
    ],
    [
     "fprintf",
     "fprintf writes formatted text; it is used in writeASCII() (L1)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Method (6) <code>readASCII()</code> keeps reading lines with <code>fscanf</code> until <code>fscanf</code> returns ………",
   "o": [
    [
     "0",
     "Returning 0 is how fread signals the end of file in C, not fscanf in this method (L1, Detecting end of file)."
    ],
    [
     "NULL",
     "NULL is what fopen returns when the file cannot be opened (L1)."
    ],
    [
     "1",
     "1 is a normal successful read count; the loop stops on EOF (L1)."
    ],
    [
     "EOF",
     "Correct. The loop does result = fscanf(...); if (result == EOF) break; (L1, Full methods)."
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: Two different programs can each use the logical name <code>infile</code>, each connected to a different physical file.",
   "o": [
    [
     "True",
     "Correct. In the slide-20 figure one program reaches b.txt and another reaches aa.txt, both through a logical name called infile (L1, Physical file vs logical file)."
    ],
    [
     "False",
     "The slide-20 figure shows exactly this: two programs, each with its own logical name infile, for b.txt and aa.txt (L1)."
    ]
   ],
   "a": 0
  }
 ],
 "2": [
  {
   "q": "A disk has 512 B/sector, 40 sectors/track, cylinder height 8 and 2000 tracks per surface. What is the drive capacity?",
   "o": [
    [
     "40,960,000 B",
     "That is 2000 × 40 × 512, the capacity of ONE surface. You forgot to multiply by the 8 tracks per cylinder."
    ],
    [
     "327,680,000 B",
     "Correct. Track = 40 × 512 = 20,480 B; cylinder = 8 × 20,480 = 163,840 B; 2000 cylinders × 163,840 = 327,680,000 B."
    ],
    [
     "163,840,000 B",
     "This used 4 (the number of platters) instead of 8 surfaces. Cylinder height counts surfaces."
    ],
    [
     "163,840 B",
     "That is the size of one cylinder, not the whole drive."
    ]
   ],
   "a": 1
  },
  {
   "q": "A disk spins at 4000 rpm, has 50 sectors per track and an average seek time of 9 ms. What is the average time to read 5 consecutive sectors?",
   "o": [
    [
     "25.5 ms",
     "This used a full revolution (15 ms) as the latency instead of half a revolution."
    ],
    [
     "16.8 ms",
     "This transferred only one sector (0.3 ms) instead of five."
    ],
    [
     "18 ms",
     "Correct. Revolution = 60,000/4000 = 15 ms; latency = 7.5 ms; transfer = 5 × 15/50 = 1.5 ms; total = 9 + 7.5 + 1.5 = 18 ms."
    ],
    [
     "10.5 ms",
     "This left out the rotational delay (seek + transfer only)."
    ]
   ],
   "a": 2
  },
  {
   "q": "A track has 24 sectors of 512 B. Records are 150 B, the blocking factor is 16 and the non-data overhead is 400 B per block. How many records fit on one track?",
   "o": [
    [
     "81",
     "That is 12,288/150, which ignores blocks and overhead."
    ],
    [
     "80",
     "This ignored the 400 B overhead (block = 2400 B gives 5 blocks)."
    ],
    [
     "70",
     "This used 4.39 blocks. A partial block cannot be stored, so take the floor first."
    ],
    [
     "64",
     "Correct. Track = 24 × 512 = 12,288 B; block = 16 × 150 + 400 = 2800 B; ⌊12,288/2800⌋ = 4 blocks; 4 × 16 = 64 records."
    ]
   ],
   "a": 3
  },
  {
   "q": "A file has 30,000 fixed-length records of 128 B. The disk has 512 B/sector, 40 sectors/track and cylinder height 8. How many tracks are needed to store the file?",
   "o": [
    [
     "188",
     "Correct. File = 30,000 × 128 = 3,840,000 B; track = 40 × 512 = 20,480 B; 3,840,000/20,480 = 187.5, rounded UP to 188."
    ],
    [
     "187",
     "Rounded down. A partial track must still be allocated, so round up."
    ],
    [
     "7500",
     "That is the number of SECTORS (3,840,000/512)."
    ],
    [
     "24",
     "That is the number of CYLINDERS (3,840,000/163,840 = 23.4, rounded up)."
    ]
   ],
   "a": 0
  },
  {
   "q": "When the OS reads a single byte from a disk, what does it actually read into the buffer?",
   "o": [
    [
     "Only that byte",
     "The sector is the smallest addressable unit, so a single byte cannot be read alone."
    ],
    [
     "The entire sector that contains the byte",
     "Correct. The OS finds the platter, track and sector, reads the entire sector into a buffer, then finds the byte."
    ],
    [
     "The entire track",
     "A track is larger than the smallest addressable unit; the slides say a sector is read."
    ],
    [
     "The entire cylinder",
     "A cylinder is a group of tracks; it is not the read unit."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which technique for the disk bottleneck uses part of main memory to simulate a disk, trading volatility for speed?",
   "o": [
    [
     "Disk striping",
     "Striping puts blocks of a file on different drives."
    ],
    [
     "Disk cache",
     "A disk cache holds pages copied from the disk; it does not act as a disk itself."
    ],
    [
     "RAM disk",
     "Correct. A RAM disk (memory disk) simulates a disk in main memory: fast, but volatile."
    ],
    [
     "Multiprocessing",
     "Multiprocessing lets the CPU do other jobs while waiting for the disk."
    ]
   ],
   "a": 2
  },
  {
   "q": "Organizing tracks by blocks has LESS non-data overhead than organizing them by sectors.",
   "o": [
    [
     "True",
     "Blocks add sub-blocks (count, key) and inter-block gaps, which increases overhead."
    ],
    [
     "False",
     "Correct. The slides say block organization has MORE non-data overhead than sector addressing."
    ]
   ],
   "a": 1
  },
  {
   "q": "Tracks are organized by 512-byte sectors, and each 300-byte record is stored in its own sector. The unused 212 bytes in each sector are an example of:",
   "o": [
    [
     "Seeking",
     "Seeking is moving the arm to the correct cylinder; it has nothing to do with unused space inside a sector (L2)."
    ],
    [
     "Blocking factor",
     "The blocking factor is the number of records per block, used in block organization."
    ],
    [
     "Disk striping",
     "Disk striping spreads a file's blocks over several drives for parallelism; it does not describe wasted bytes in a sector (L2)."
    ],
    [
     "Fragmentation",
     "Correct. Fragmentation is the loss of space within a sector when records do not fit exactly."
    ]
   ],
   "a": 3
  },
  {
   "q": "The number of cylinders on a disk equals the number of tracks per surface.",
   "o": [
    [
     "True",
     "Correct. Each cylinder is the set of tracks at one arm position, one per surface, so there is one cylinder per track position."
    ],
    [
     "False",
     "The slides state this rule directly: number of cylinders = tracks per surface."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which part of a disk access is usually the slowest (largest cost)?",
   "o": [
    [
     "Seek time",
     "Correct. Moving the arm to the right cylinder is usually the slowest part."
    ],
    [
     "Transfer time",
     "Transfer of one sector is a tiny fraction of a revolution (e.g. 0.05 ms)."
    ],
    [
     "Rotational delay",
     "Latency is typically 6–8 ms, which is less than a typical 30 ms average seek."
    ],
    [
     "Reading the sector into the buffer",
     "This is part of the transfer, not the largest cost."
    ]
   ],
   "a": 0
  },
  {
   "q": "……… is the circular disk on which magnetic data is stored in a hard disk drive.",
   "o": [
    [
     "Spindle",
     "The spindle holds the platters and rotates them; it does not store data (L2, Disk components)."
    ],
    [
     "Track",
     "A track is one concentric ring on a platter, not the whole disk (L2)."
    ],
    [
     "Platter",
     "Correct. The platter is the circular disk that stores magnetic data, on both of its surfaces (L2, Disk components)."
    ],
    [
     "Cylinder",
     "A cylinder is the set of tracks above/below each other across platters (L2)."
    ]
   ],
   "a": 2
  },
  {
   "q": "……… holds the platters in a fixed position and rotates them, bringing the sector under the head.",
   "o": [
    [
     "Arms",
     "Arms carry, guide and move the heads (L2, Disk components)."
    ],
    [
     "Arm assembly",
     "The arm assembly is the internal set that contains the arms and heads (L2)."
    ],
    [
     "Read/write head",
     "The head reads and writes data as it passes over the track; it does not rotate the platters (L2)."
    ],
    [
     "Spindle",
     "Correct. The spindle holds the platters in a fixed position with space for the arms, and rotates them (L2, Disk components)."
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: A CD-RW is a Serial Access Storage Device (SASD).",
   "o": [
    [
     "True",
     "A CD-RW is an optical disk, which is a DASD; the lecture's SASD example is magnetic tape (L2, Secondary storage devices)."
    ],
    [
     "False",
     "Correct. CD-RW (Compact Disk ReWritable) is an optical disk, a Direct Access Storage Device; SASD is magnetic tape (L2, Secondary storage devices)."
    ]
   ],
   "a": 1
  },
  {
   "q": "A ……… is a fixed number of contiguous sectors; it is how the OS file manager views a file.",
   "o": [
    [
     "Track",
     "A track is a whole ring divided into sectors (L2)."
    ],
    [
     "Block",
     "A block (page) is user-defined and used by the DBMS, holding an integral number of records (L2, Sectors vs blocks)."
    ],
    [
     "Cylinder",
     "A cylinder is the set of tracks above/below each other (L2)."
    ],
    [
     "Cluster",
     "Correct. The OS file manager sees the file as a series of clusters, each a fixed number of contiguous sectors (L2, Platter layout)."
    ]
   ],
   "a": 3
  },
  {
   "q": "In the slide-12 figure, the pie-shaped wedge that crosses all the tracks (letter B) is the ………",
   "o": [
    [
     "Track sector",
     "The track sector (C) is only the part of the wedge on one track (L2, Platter layout)."
    ],
    [
     "Geometrical sector",
     "Correct. B is the geometrical sector, a wedge across all tracks; A is a track, C a track sector, D a cluster (L2, Platter layout)."
    ],
    [
     "Cluster",
     "The cluster (D) is a run of neighbouring sectors along one track (L2)."
    ],
    [
     "Track",
     "The track (A) is one ring (L2)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Organizing disk tracks by user-defined blocks (pages) is used by the ………",
   "o": [
    [
     "OS",
     "The OS organizes tracks by sectors (L2, Sectors vs blocks)."
    ],
    [
     "DBMS",
     "Correct. Organizing by blocks is used by the DBMS; organizing by sectors is used by the OS (L2, Sectors vs blocks)."
    ],
    [
     "Spindle",
     "The spindle is hardware that rotates the platters; it does not organize tracks (L2)."
    ],
    [
     "Disk cache",
     "The disk cache is a memory area holding disk pages, a bottleneck technique (L2)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which sub-block holds the number of bytes in the block?",
   "o": [
    [
     "Count sub-block",
     "Correct. The count sub-block contains the number of bytes in the block (L2, Sectors vs blocks)."
    ],
    [
     "Key sub-block",
     "The key sub-block (optional) holds the key of the last record in the data sub-block (L2)."
    ],
    [
     "Data sub-block",
     "The data sub-block holds the data records themselves (L2)."
    ],
    [
     "Inter-block gap",
     "A gap is empty space between blocks, part of the non-data overhead (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: When tracks are organized by blocks that hold an integral number of records, a record may span two blocks.",
   "o": [
    [
     "True",
     "A block holds a whole number of records, so no record spans two blocks and there is no internal fragmentation (L2, Sectors vs blocks)."
    ],
    [
     "False",
     "Correct. With a blocking factor, each block holds an integral number of records: no record spans two blocks (L2, Sectors vs blocks)."
    ]
   ],
   "a": 1
  },
  {
   "q": "……… is the time for the disk to rotate so that the desired sector is under the read/write head.",
   "o": [
    [
     "Seek time",
     "Seek time is moving the arm to the correct cylinder (L2, Cost of a disk access)."
    ],
    [
     "Transfer time",
     "Transfer time is the time for the head to pass over the data once positioned (L2)."
    ],
    [
     "Rotational delay",
     "Correct. Rotational delay (latency) is the wait for the platter to bring the sector under the head (L2, Cost of a disk access)."
    ],
    [
     "Access time",
     "Access time is the total: seek + rotational delay + transfer (L2)."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: The minimum rotational latency is 0 and the maximum is the time of one full revolution.",
   "o": [
    [
     "True",
     "Correct. So the average latency = (min + max)/2 = half a revolution (L2, Cost of a disk access)."
    ],
    [
     "False",
     "These are the lecture's values: min = 0, max = one revolution, average = ½ revolution (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the disk cache technique, what happens on a cache miss?",
   "o": [
    [
     "Part of main memory simulates the whole disk",
     "That is a RAM disk, a different technique (L2, Disk as a bottleneck)."
    ],
    [
     "The disk is accessed",
     "Correct. The cache is checked first; on a miss the disk is accessed (L2, Disk as a bottleneck)."
    ],
    [
     "The CPU switches to other jobs",
     "That is multiprocessing (L2)."
    ],
    [
     "The block is read from several drives in parallel",
     "Putting blocks on different drives is disk striping (L2)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Typically, a seek from the inside track to the outside track (the maximum seek) takes about ………",
   "o": [
    [
     "5 ms",
     "5 ms is the typical track-to-track seek (L2, Cost of a disk access)."
    ],
    [
     "30 ms",
     "30 ms is the typical average seek, random track to random track (L2)."
    ],
    [
     "50 ms",
     "Correct. 50 ms is the typical maximum seek, inside track to outside track (L2, Cost of a disk access)."
    ],
    [
     "12 ms",
     "12 ms is one revolution at 5000 rpm, a rotation time, not a seek (L2)."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: Each surface of a platter has its own read/write head.",
   "o": [
    [
     "True",
     "Correct. On the 4-platter, 8-surface drive there is a read/write head on each of the 8 surfaces (L2, Read/write heads)."
    ],
    [
     "False",
     "The lecture says each surface has its own head (8 heads for 8 surfaces) (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: RAID, one of the techniques for the disk bottleneck, stands for Redundant Array of Independent Disks.",
   "o": [
    [
     "True",
     "Correct. RAID = Redundant Array of Independent Disks (L2, Disk as a bottleneck)."
    ],
    [
     "False",
     "This is the lecture's expansion of RAID (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "A disk has 48 sectors per track and 512 bytes per sector. Track capacity = ………",
   "o": [
    [
     "24,576 B",
     "Correct. Track capacity = sectors per track × bytes per sector = 48 × 512 = 24,576 B (L2, Capacity formulas)."
    ],
    [
     "49,152 B",
     "49,152 = 96 × 512 doubles the sectors; a track has 48 sectors (L2)."
    ],
    [
     "12,288 B",
     "12,288 = 24 × 512 uses only half the sectors (L2)."
    ],
    [
     "560 B",
     "560 = 48 + 512 adds instead of multiplying (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: A disk with 64 sectors per track and 512 bytes per sector has a track capacity of 32,768 B.",
   "o": [
    [
     "True",
     "Correct. 64 × 512 = 32,768 B (L2, Capacity formulas)."
    ],
    [
     "False",
     "Track capacity = sectors per track × bytes per sector = 64 × 512 = 32,768 B, so the statement is true (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Sector size = 512 B, 8 sectors per cluster and 80 sectors per track. Cluster size = ………",
   "o": [
    [
     "40,960 B",
     "40,960 = 80 × 512 is the TRACK capacity; a cluster is only 8 sectors (L2, Capacity formulas)."
    ],
    [
     "64 B",
     "64 = 512 / 8 divides instead of multiplying (L2)."
    ],
    [
     "640 B",
     "640 = 8 × 80 multiplies the two sector counts and ignores the 512 B (L2)."
    ],
    [
     "4096 B",
     "Correct. Cluster = sectors per cluster × bytes per sector = 8 × 512 = 4096 B (L2, Capacity formulas)."
    ]
   ],
   "a": 3
  },
  {
   "q": "Average latency for a disk spinning at 7500 rpm is ………",
   "o": [
    [
     "8 ms",
     "8 ms = 60,000/7500 is one full revolution, the MAXIMUM latency (L2, Cost of a disk access)."
    ],
    [
     "2 ms",
     "2 ms is a quarter revolution; the average is half (L2)."
    ],
    [
     "4 ms",
     "Correct. Revolution = 60 × 1000 / 7500 = 8 ms; average latency = ½ × 8 = 4 ms (L2, Cost of a disk access)."
    ],
    [
     "0.008 ms",
     "60/7500 = 0.008 is one revolution in SECONDS, not ms (L2)."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: A disk spinning at 4000 rpm has an average latency of 15 ms.",
   "o": [
    [
     "True",
     "15 ms = 60,000/4000 is one full revolution (the maximum); the average latency is half: 7.5 ms (L2, Cost of a disk access)."
    ],
    [
     "False",
     "Correct. Revolution = 60,000/4000 = 15 ms, so the average latency = ½ × 15 = 7.5 ms (L2, Cost of a disk access)."
    ]
   ],
   "a": 1
  },
  {
   "q": "A drive has 6 platters, and data is stored on both surfaces of every platter. What is its cylinder height?",
   "o": [
    [
     "12",
     "Correct. Cylinder height = number of surfaces = 2 × platters = 2 × 6 = 12 (L2, Capacity formulas)."
    ],
    [
     "6",
     "6 is the number of platters; each platter has two surfaces, each with its own track in the cylinder (L2)."
    ],
    [
     "3",
     "3 = 6/2 divides instead of multiplying (L2)."
    ],
    [
     "24",
     "24 counts four tracks per platter; there are only two surfaces per platter (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "A disk has 10 surfaces and 3000 tracks per surface. How many cylinders does it have?",
   "o": [
    [
     "3000",
     "Correct. Number of cylinders = number of tracks per surface = 3000 (L2, Capacity formulas)."
    ],
    [
     "30,000",
     "30,000 = 10 × 3000 is the total number of tracks on the disk (L2)."
    ],
    [
     "300",
     "300 = 3000/10; the surfaces give the tracks per cylinder, not fewer cylinders (L2)."
    ],
    [
     "10",
     "10 is the cylinder height (tracks per cylinder), not the number of cylinders (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "A disk has 512 B/sector, 50 sectors/track, cylinder height 12 and 4000 tracks/surface. Cylinder capacity = ………",
   "o": [
    [
     "25,600 B",
     "25,600 = 50 × 512 is one TRACK; a cylinder has 12 tracks (L2, Capacity formulas)."
    ],
    [
     "307,200 B",
     "Correct. Track = 50 × 512 = 25,600 B; cylinder = 12 × 25,600 = 307,200 B (L2, Capacity formulas)."
    ],
    [
     "153,600 B",
     "153,600 = 6 × 25,600 uses the number of platters (6); the cylinder height counts surfaces (12) (L2)."
    ],
    [
     "600 B",
     "600 = 50 × 12 is the number of SECTORS per cylinder, not bytes (L2)."
    ]
   ],
   "a": 1
  },
  {
   "q": "A disk has 512 B/sector, 50 sectors/track, cylinder height 12 and 4000 tracks/surface. Drive capacity = ………",
   "o": [
    [
     "102,400,000 B",
     "102,400,000 = 4000 × 25,600 forgets the cylinder height of 12 (L2, Capacity formulas)."
    ],
    [
     "614,400,000 B",
     "614,400,000 uses 6 platters instead of 12 surfaces per cylinder (L2)."
    ],
    [
     "14,745,600,000 B",
     "This multiplies by the cylinder height twice (L2)."
    ],
    [
     "1,228,800,000 B",
     "Correct. Cylinder = 12 × 50 × 512 = 307,200 B; drive = 4000 cylinders × 307,200 = 1,228,800,000 B (L2, Capacity formulas)."
    ]
   ],
   "a": 3
  },
  {
   "q": "A disk has 512 B/sector, 50 sectors/track, cylinder height 12 and 4000 tracks/surface. Records are 128 B. How many records fit in one cylinder?",
   "o": [
    [
     "200",
     "200 = 25,600/128 is the records per TRACK (L2, Worked problem)."
    ],
    [
     "4",
     "4 = 512/128 is the records per SECTOR (L2)."
    ],
    [
     "2400",
     "Correct. Cylinder = 307,200 B; records per cylinder = 307,200/128 = 2400 (L2, Worked problem)."
    ],
    [
     "1200",
     "1200 = 307,200/256 would be for 256 B records (L2)."
    ]
   ],
   "a": 2
  },
  {
   "q": "A file has 40,000 fixed-length records of 128 B, stored on a disk with 512 B sectors. How many sectors does the file need?",
   "o": [
    [
     "10,000",
     "Correct. File = 40,000 × 128 = 5,120,000 B; sectors = 5,120,000/512 = 10,000 (4 records per sector) (L2, Worked problem)."
    ],
    [
     "40,000",
     "40,000 gives each record a whole sector, but 4 records of 128 B fit in a 512 B sector (L2)."
    ],
    [
     "160,000",
     "160,000 = 40,000 × 4 multiplies by the records per sector instead of dividing (L2)."
    ],
    [
     "5,120,000",
     "5,120,000 is the file size in bytes, not sectors (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "A file has 20,000 fixed-length records of 256 B. The disk has 512 B/sector and 36 sectors/track. How many tracks are needed to store the file?",
   "o": [
    [
     "277",
     "5,120,000/18,432 = 277.78; rounding down leaves part of the file without a track (L2, Worked problem)."
    ],
    [
     "278",
     "Correct. File = 20,000 × 256 = 5,120,000 B; track = 36 × 512 = 18,432 B; 5,120,000/18,432 = 277.78, rounded up to 278 (L2, Worked problem)."
    ],
    [
     "556",
     "556 = 20,000/36 puts one record per sector, but 2 records of 256 B fit in a 512 B sector (L2)."
    ],
    [
     "10,000",
     "10,000 = 5,120,000/512 is the number of SECTORS (L2)."
    ]
   ],
   "a": 1
  },
  {
   "q": "A 5,120,000 B file is stored on a disk with 18,432 B per track and cylinder height 8. How many whole cylinders are needed?",
   "o": [
    [
     "34",
     "5,120,000/147,456 = 34.72; 34 cylinders would not hold the whole file, so round up (L2, Worked problem)."
    ],
    [
     "278",
     "278 is the number of TRACKS (5,120,000/18,432 rounded up) (L2)."
    ],
    [
     "70",
     "70 uses 4 tracks per cylinder (the platters); a cylinder has 8 tracks (L2)."
    ],
    [
     "35",
     "Correct. Cylinder = 8 × 18,432 = 147,456 B; 5,120,000/147,456 = 34.72, so 35 whole cylinders (L2, Worked problem)."
    ]
   ],
   "a": 3
  },
  {
   "q": "A block-addressable disk has track size = 15,000 B, non-data overhead = 200 B per block and record size = 50 B. How many records can be stored per track if the blocking factor is 20?",
   "o": [
    [
     "300",
     "300 = 15,000/50 ignores the 200 B overhead per block (L2, Non-data overhead)."
    ],
    [
     "250",
     "250 = 12.5 × 20 uses a fractional block; blocks per track must be floored to 12 (L2)."
    ],
    [
     "240",
     "Correct. Data sub-block = 20 × 50 = 1000 B; block = 1000 + 200 = 1200 B; ⌊15,000/1200⌋ = ⌊12.5⌋ = 12 blocks; 12 × 20 = 240 records (L2, Non-data overhead)."
    ],
    [
     "12",
     "12 is the number of BLOCKS per track, not records (L2)."
    ]
   ],
   "a": 2
  },
  {
   "q": "A block-addressable disk has track size = 15,000 B, non-data overhead = 200 B per block and record size = 50 B. How many records can be stored per track if the blocking factor is 50?",
   "o": [
    [
     "250",
     "Correct. Block = 50 × 50 + 200 = 2700 B; ⌊15,000/2700⌋ = ⌊5.56⌋ = 5 blocks; 5 × 50 = 250 records (L2, Non-data overhead)."
    ],
    [
     "278",
     "278 ≈ 5.56 × 50 keeps the fractional block; a block cannot be split, so take the floor (L2)."
    ],
    [
     "300",
     "300 = 15,000/50 ignores the overhead (L2)."
    ],
    [
     "5",
     "5 is the number of blocks per track (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "A disk spins at 6000 rpm and has 100 sectors per track. The transfer time for one sector is ………",
   "o": [
    [
     "10 ms",
     "10 ms = 60,000/6000 is one full revolution (L2, Cost of a disk access)."
    ],
    [
     "5 ms",
     "5 ms is the average latency (half a revolution), not the transfer time (L2)."
    ],
    [
     "0.05 ms",
     "0.05 ms halves the transfer time; the ½ belongs only to the average latency (L2)."
    ],
    [
     "0.1 ms",
     "Correct. Revolution = 60,000/6000 = 10 ms; transfer = revolution / sectors per track = 10/100 = 0.1 ms (L2, Cost of a disk access)."
    ]
   ],
   "a": 3
  },
  {
   "q": "Average seek = 10 ms, spindle speed = 6000 rpm, 100 sectors per track. Average time to read one sector = ………",
   "o": [
    [
     "20.1 ms",
     "20.1 uses a full revolution (10 ms) as the latency; the average latency is half: 5 ms (L2, Cost of a disk access)."
    ],
    [
     "15.1 ms",
     "Correct. Latency = ½ × 10 = 5 ms; transfer = 10/100 = 0.1 ms; total = 10 + 5 + 0.1 = 15.1 ms (L2, Cost of a disk access)."
    ],
    [
     "10.1 ms",
     "10.1 leaves out the rotational delay (L2)."
    ],
    [
     "15 ms",
     "15 leaves out the transfer time of 0.1 ms (L2)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Average seek = 12 ms, average rotational delay = 4 ms, spindle speed = 7500 rpm, 32 sectors per track. Average time to read 2 sectors = ………",
   "o": [
    [
     "16.25 ms",
     "16.25 transfers only one sector (0.25 ms); two sectors take 0.5 ms (L2, Cost of a disk access)."
    ],
    [
     "20.5 ms",
     "20.5 uses a full revolution (8 ms) as the delay; the average rotational delay is given as 4 ms (L2)."
    ],
    [
     "16.5 ms",
     "Correct. Revolution = 60,000/7500 = 8 ms; transfer = 2 × 8/32 = 0.5 ms; total = 12 + 4 + 0.5 = 16.5 ms (L2, Cost of a disk access)."
    ],
    [
     "12.5 ms",
     "12.5 leaves out the rotational delay (L2)."
    ]
   ],
   "a": 2
  },
  {
   "q": "A track holds 24,000 bytes and the disk spins at 3000 rpm. The transfer time for 6000 bytes is ………",
   "o": [
    [
     "20 ms",
     "20 ms = 60,000/3000 is one full revolution, the time to transfer the whole track (L2, Cost of a disk access)."
    ],
    [
     "10 ms",
     "10 ms is the average latency (half a revolution) (L2)."
    ],
    [
     "0.25 ms",
     "0.25 is the fraction of the track (6000/24,000), not a time; multiply it by the revolution time (L2)."
    ],
    [
     "5 ms",
     "Correct. Revolution = 60,000/3000 = 20 ms; transfer = (6000/24,000) × 20 = 5 ms (L2, Cost of a disk access)."
    ]
   ],
   "a": 3
  },
  {
   "q": "A disk has 12 surfaces, 2000 tracks per surface, 30 sectors per track and 512 bytes per sector. Disk capacity = ………",
   "o": [
    [
     "368,640,000 B",
     "Correct. Capacity = surfaces × tracks/surface × sectors/track × bytes/sector = 12 × 2000 × 30 × 512 = 368,640,000 B (L2, Quiz 2)."
    ],
    [
     "30,720,000 B",
     "30,720,000 = 2000 × 30 × 512 is only one surface (L2)."
    ],
    [
     "184,320,000 B",
     "184,320,000 uses 6 (platters) instead of 12 surfaces (L2)."
    ],
    [
     "737,280,000 B",
     "737,280,000 counts 24 surfaces, doubling the 12 given surfaces (L2)."
    ]
   ],
   "a": 0
  },
  {
   "q": "A disk has an average latency of 5 ms. What is its spindle speed?",
   "o": [
    [
     "12,000 rpm",
     "12,000 = 60,000/5 treats 5 ms as a full revolution; it is only half (L2, Cost of a disk access)."
    ],
    [
     "6000 rpm",
     "Correct. Average latency = ½ revolution, so revolution = 10 ms and RPM = 60,000/10 = 6000 (L2, Cost of a disk access)."
    ],
    [
     "3000 rpm",
     "3000 rpm gives a 20 ms revolution and a 10 ms average latency (L2)."
    ],
    [
     "5000 rpm",
     "5000 rpm gives a 12 ms revolution and a 6 ms average latency (L2)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Tracks are organized by 512 B sectors and records of 200 B cannot be split between sectors. How many bytes are lost to fragmentation in each full sector?",
   "o": [
    [
     "312 B",
     "312 = 512 − 200 assumes only one record per sector, but two 200 B records fit (L2, Sectors vs blocks)."
    ],
    [
     "0 B",
     "512 is not a multiple of 200, so some space is lost: that is fragmentation (L2)."
    ],
    [
     "112 B",
     "Correct. ⌊512/200⌋ = 2 records = 400 B, so 512 − 400 = 112 B are lost in each sector (L2, Sectors vs blocks)."
    ],
    [
     "212 B",
     "212 B is the waste for 300 B records (512 − 300), the lecture's example, not for 200 B records (L2)."
    ]
   ],
   "a": 2
  }
 ],
 "3": [
  {
   "q": "A book record has ISBN = <code>52814</code>, author = <code>KNUTH</code>, title = <code>SORTING</code>. Which is the correct encoding using a 2-digit <b>length indicator</b> at the start of each field?",
   "o": [
    [
     "<code>52814|KNUTH|SORTING|</code>",
     "That is the delimiter method, not length indicators."
    ],
    [
     "<code>ISBN=52814 AU=KNUTH TI=SORTING</code>",
     "ISBN=… AU=… TI=… is the keyword = value method; length indicators put the field length before each field (05 52814…) (L3)."
    ],
    [
     "<code>055281405KNUTH07SORTING</code>",
     "Correct. Each field is preceded by its length: 05 + 52814, 05 + KNUTH, 07 + SORTING."
    ],
    [
     "<code>055281405KNUTH06SORTING</code>",
     "SORTING has 7 characters, not 6. The length was miscounted."
    ]
   ],
   "a": 2
  },
  {
   "q": "Records use delimited fields and each record begins with a length indicator (byte count), as in the slide example <code>3387359|CARROLL|ALICE IN WONDERLAND</code>. What is the length indicator for the record <code>52814|KNUTH|SORTING</code>?",
   "o": [
    [
     "17",
     "This counted only the data characters and left out the two | delimiters."
    ],
    [
     "20",
     "This added a trailing delimiter that the record does not have."
    ],
    [
     "3",
     "That is the number of fields, not the byte count."
    ],
    [
     "19",
     "Correct. 5 + 1 + 5 + 1 + 7 = 19 bytes, just as the slide counts 5 + 1 + 7 + 1 + 19 = 33."
    ]
   ],
   "a": 3
  },
  {
   "q": "Fixed-length records are written from <code>struct Student { char name[24]; int id; float gpa; };</code> (assume int and float are 4 bytes each, no padding). What is the byte offset of the record with RRN 12?",
   "o": [
    [
     "384",
     "Correct. Record size = 24 + 4 + 4 = 32 B; offset = RRN × record size = 12 × 32 = 384."
    ],
    [
     "416",
     "That is 13 × 32, which treats RRNs as starting at 1. The first record has RRN 0."
    ],
    [
     "352",
     "That is 11 × 32, an off-by-one in the other direction."
    ],
    [
     "12",
     "12 is the RRN, not the byte offset; the offset is RRN × record size = 12 × 32 = 384 (L3, Direct access)."
    ]
   ],
   "a": 0
  },
  {
   "q": "An <code>fstream file</code> holds fixed-length 50-byte records. Which call positions the file so that the next <code>write</code> overwrites the record with RRN 7?",
   "o": [
    [
     "<code>file.seekg(350, ios::beg);</code>",
     "seekg moves the GET (read) pointer. Writing uses the put pointer."
    ],
    [
     "<code>file.seekp(350, ios::beg);</code>",
     "Correct. seekp moves the put (write) pointer, and 7 × 50 = 350 bytes from the beginning."
    ],
    [
     "<code>file.seekp(400, ios::beg);</code>",
     "400 = 8 × 50, which treats RRN as 1-based and lands on the next record."
    ],
    [
     "<code>file.seekp(350, ios::end);</code>",
     "The offset must be measured from the beginning (ios::beg), not from the end."
    ]
   ],
   "a": 1
  },
  {
   "q": "A file holds fixed-length 20-byte records. After <code>fseek(fp, -60L, 2);</code> the program reads one 20-byte record. Which record is read?",
   "o": [
    [
     "The record with RRN 3",
     "Origin 2 means the END of the file, not the beginning."
    ],
    [
     "The last record",
     "The last record starts 20 bytes before the end, not 60."
    ],
    [
     "The third record from the end",
     "Correct. Origin 2 = end; moving back 60 bytes = 3 records of 20 bytes, so the read starts at the third-last record."
    ],
    [
     "The second record from the end",
     "The second record from the end starts 2 × 20 = 40 bytes before the end, i.e. fseek(fp, -40L, 2); −60L reaches the third-last (L3)."
    ]
   ],
   "a": 2
  },
  {
   "q": "A secondary key uniquely identifies a record and does not change.",
   "o": [
    [
     "True",
     "That is the definition of a PRIMARY key; a secondary key is used for searching and does not typically identify a record uniquely (L3)."
    ],
    [
     "False",
     "Correct. A secondary key is used for searching but does not typically identify a record uniquely."
    ]
   ],
   "a": 1
  },
  {
   "q": "What is the main ADVANTAGE of fixed-length records?",
   "o": [
    [
     "They save space when record sizes are diverse",
     "That is the advantage of variable-length records."
    ],
    [
     "Fields are self-describing",
     "That is the advantage of keyword = value fields."
    ],
    [
     "They never need padding",
     "Fixed-length records waste space with padding; that is their disadvantage."
    ],
    [
     "It is easy to jump to the i-th record",
     "Correct. Every record has the same size, so the offset is RRN × record size."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which field structure makes it easy to jump ahead to the end of a field?",
   "o": [
    [
     "Length indicator",
     "Correct. The length stored at the start tells you exactly how many bytes to skip."
    ],
    [
     "Delimited",
     "With delimiters you must check every byte until you hit the delimiter."
    ],
    [
     "Keyword = value",
     "Its advantage is being self-describing and allowing missing fields."
    ],
    [
     "Stream",
     "A stream file adds no information at all, so there are no field boundaries to jump to; the length indicator gives that (L3, Stream files)."
    ]
   ],
   "a": 0
  },
  {
   "q": "A music file is best described as:",
   "o": [
    [
     "A text file, because it is a sequence of characters",
     "Text files (like C source code) can be viewed in a text editor; music cannot."
    ],
    [
     "A binary file, a sequence of bytes that needs a specialized program",
     "Correct. The slides give movies and music as binary file examples."
    ],
    [
     "A stream file of records",
     "\"Stream\" is a logical file structure, not the text/binary classification."
    ],
    [
     "An input file only",
     "Whether a file is input or output depends on how the program uses it."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the \"copy a file with no loops\" program, after <code>infile.seekg(0, infile.end);</code> the call <code>infile.tellg()</code> gives the size of the file in bytes.",
   "o": [
    [
     "True",
     "Correct. The get pointer is at the end, so its position equals the number of bytes; one read and one write of that size then copy the file."
    ],
    [
     "False",
     "tellg reports the current get position, and at the end of the file that position is the file size."
    ]
   ],
   "a": 0
  },
  {
   "q": "……… is the smallest unit of data with logical meaning.",
   "o": [
    [
     "Field",
     "Correct. A field is a data value, the smallest unit of data with logical meaning (L3, File of records)"
    ],
    [
     "Record",
     "A record is a group of fields forming a logical unit, so it is bigger than a field."
    ],
    [
     "Stream",
     "A stream is a sequence of bytes with no added information, not a logical unit."
    ],
    [
     "Primary key",
     "A primary key is a field used to identify a record uniquely, not the definition of the smallest unit."
    ]
   ],
   "a": 0
  },
  {
   "q": "A ……… is a group of fields forming a logical unit.",
   "o": [
    [
     "Stream file",
     "A stream file has no added information, so it does not keep fields grouped."
    ],
    [
     "Record",
     "Correct. A record is a group of fields forming a logical unit (L3, File of records)"
    ],
    [
     "Binary file",
     "A binary file is a sequence of bytes such as a movie or music."
    ],
    [
     "Delimiter",
     "A delimiter is a mark at the end of each field, not a group of fields."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: A text file is a sequence of bytes, such as a movie, that needs a specialized program.",
   "o": [
    [
     "True",
     "That is the definition of a binary file, not a text file."
    ],
    [
     "False",
     "Correct. A text file is a sequence of characters (e.g. C source code) viewable in a text editor; the bytes-plus-special-program description is a binary file (L3, File input and output)"
    ]
   ],
   "a": 1
  },
  {
   "q": "The three file structures discussed in the lecture are:",
   "o": [
    [
     "Text, binary and stream",
     "Text and binary are kinds of files, not the three file structures."
    ],
    [
     "Fixed, delimited and keyword",
     "These are field structures (ways to keep fields apart), not the three file structures."
    ],
    [
     "Stream, field and record",
     "Correct. The lecture lists stream, field and record structures (L3, File of records)"
    ],
    [
     "Input, output and index",
     "Input and output describe how a program uses a file, and an index file is used for variable-length records."
    ]
   ],
   "a": 2
  },
  {
   "q": "The main problem of a stream file such as <code>AmesMary123 MapleStillwaterOK74075...</code> is:",
   "o": [
    [
     "It wastes space with keywords",
     "That is the disadvantage of keyword = value fields; a stream file adds nothing."
    ],
    [
     "It wastes space with padding",
     "Padding waste belongs to fixed-length fields and records."
    ],
    [
     "It must check every byte against the delimiter",
     "That is the disadvantage of delimited fields; a stream file has no delimiters."
    ],
    [
     "There is no way to get the information back in the organized record format",
     "Correct. The bytes carry no added information, so the fields and records cannot be recovered (L3, Stream files)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: In a stream file it is easy to recover each record in its organized form, because each field is followed by a separator.",
   "o": [
    [
     "True",
     "A stream file adds no separators or any other information between fields."
    ],
    [
     "False",
     "Correct. A stream file contains no added information, so there is no way to get the records back in organized form (L3, Stream files)"
    ]
   ],
   "a": 1
  },
  {
   "q": "The field encoding <code>ISBN=40211 AU=KNUTH TI=SORTING</code> uses which field structure?",
   "o": [
    [
     "Keyword = value",
     "Correct. Every field is written as keyword=value, so it is self-describing (L3, Field structures)"
    ],
    [
     "Length indicator",
     "A length indicator would put the field length (e.g. <code>05</code>) before each value."
    ],
    [
     "Delimiter",
     "A delimited encoding ends each field with a mark such as <code>|</code>, with no keywords."
    ],
    [
     "Fixed length",
     "Fixed-length fields would be padded to set lengths with no keywords."
    ]
   ],
   "a": 0
  },
  {
   "q": "The record <code>054021105KNUTH07SORTING</code> stores its fields using:",
   "o": [
    [
     "Fixed-length fields",
     "Fixed-length fields have no counts in front; they are padded to set lengths."
    ],
    [
     "Delimiters at the end of each field",
     "There is no delimiter such as <code>|</code> between the fields."
    ],
    [
     "A length indicator at the start of each field",
     "Correct. <code>05</code>, <code>05</code> and <code>07</code> give the length of the field that follows (L3, Field structures)"
    ],
    [
     "Keyword = value",
     "There are no keywords such as <code>ISBN=</code> in the record."
    ]
   ],
   "a": 2
  },
  {
   "q": "The main ADVANTAGE of fixed-length fields is:",
   "o": [
    [
     "Fields are self-describing",
     "Self-describing fields are the advantage of keyword = value."
    ],
    [
     "They may waste less space than length-based fields",
     "That is the advantage of delimited fields."
    ],
    [
     "It is easy to jump ahead to the end of the field",
     "That is the advantage of the length indicator."
    ],
    [
     "They are easy to read and store",
     "Correct. Fixed-length fields are easy to read/store, but waste space with padding (L3, Field structures: advantages and disadvantages)"
    ]
   ],
   "a": 3
  },
  {
   "q": "\"Wastes space with keywords\" is the disadvantage of:",
   "o": [
    [
     "Delimited fields",
     "Delimited fields must check every byte against the delimiter; they carry no keywords."
    ],
    [
     "Keyword = value fields",
     "Correct. Writing a keyword with every field wastes space (L3, Field structures: advantages and disadvantages)"
    ],
    [
     "Fixed-length fields",
     "Fixed-length fields waste space with padding, not keywords."
    ],
    [
     "Length-indicator fields",
     "Their disadvantage is that long fields need more than 1 byte to store the length."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: With length-indicator fields, a field whose size can exceed 256 needs more than 1 byte to store its length.",
   "o": [
    [
     "True",
     "Correct. This is the stated disadvantage of the length indicator: long fields need more than 1 byte for the length (L3, Field structures: advantages and disadvantages)"
    ],
    [
     "False",
     "It is true: one byte is not enough for the length of such long fields."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Delimited fields may waste less space than length-based fields.",
   "o": [
    [
     "True",
     "Correct. That is the advantage of delimited fields; the cost is checking every byte against the delimiter (L3, Field structures: advantages and disadvantages)"
    ],
    [
     "False",
     "It is true; the lecture lists this as the advantage of delimited fields."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the slide's fixed-length field example, the field lengths are 5, 7 and 25. How many bytes does each record take?",
   "o": [
    [
     "35",
     "35 drops 2 bytes; the sum 5 + 7 + 25 is 37."
    ],
    [
     "25",
     "25 is only the title field length."
    ],
    [
     "37",
     "Correct. 5 + 7 + 25 = 37 bytes per record, whatever the real data length (L3, Field structures)"
    ],
    [
     "3",
     "3 is the number of fields, not the number of bytes."
    ]
   ],
   "a": 2
  },
  {
   "q": "With fixed field lengths 5, 7 and 25, the author <code>FOLK</code> is stored in its 7-byte field followed by how many padding spaces?",
   "o": [
    [
     "4",
     "4 is the length of FOLK itself, not the padding."
    ],
    [
     "7",
     "7 is the whole field size."
    ],
    [
     "0",
     "FOLK is shorter than 7 bytes, so it must be padded."
    ],
    [
     "3",
     "Correct. 7 − 4 = 3 spaces, as in <code>03818FOLK&nbsp;&nbsp;&nbsp;FILE STRUCTURES</code> (L3, Field structures)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Using a 2-digit length indicator at the start of each field, the title <code>FILE STRUCTURES</code> is stored as:",
   "o": [
    [
     "<code>15FILE STRUCTURES</code>",
     "Correct. FILE (4) + space (1) + STRUCTURES (10) = 15 characters (L3, Field structures)"
    ],
    [
     "<code>14FILE STRUCTURES</code>",
     "14 forgets to count the space, which is part of the field."
    ],
    [
     "<code>FILE STRUCTURES|</code>",
     "That is a delimited field, not a length indicator."
    ],
    [
     "<code>TI=FILE STRUCTURES</code>",
     "That is keyword = value, not a length indicator."
    ]
   ],
   "a": 0
  },
  {
   "q": "Each record begins with a length indicator (byte count) and its fields are delimited, as in <code>3387359|CARROLL|ALICE IN WONDERLAND</code>. What is the length indicator for <code>03818|FOLK|FILE STRUCTURES</code>?",
   "o": [
    [
     "24",
     "24 leaves out the two delimiters <code>|</code>."
    ],
    [
     "26",
     "Correct. 5 + 1 + 4 + 1 + 15 = 26 bytes, counted like the slide's 33 (L3, Record structures)"
    ],
    [
     "37",
     "37 is the fixed-length record size, not this variable-length record."
    ],
    [
     "33",
     "33 is the length of the slide's CARROLL record, not this one."
    ]
   ],
   "a": 1
  },
  {
   "q": "Records are given a fixed size, but the fields inside are delimited and the rest of the record is padded. This record structure is:",
   "o": [
    [
     "Fixed-length records with fixed-length fields",
     "Here the fields are delimited, so they are variable-length."
    ],
    [
     "Each record begins with a length indicator",
     "In that method the record size varies and is given by a byte count at its start."
    ],
    [
     "Fixed-length records with variable-length fields",
     "Correct. Delimited or length-indicator fields are padded up to the fixed record size (L3, Record structures)"
    ],
    [
     "Stream file",
     "A stream file adds no delimiters and no padding."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the record <code>3387359|CARROLL|ALICE IN WONDERLAND</code>, the leading <code>33</code> is:",
   "o": [
    [
     "The ISBN of the book",
     "The ISBN is <code>87359</code>, which follows the 33."
    ],
    [
     "The RRN of the record",
     "The RRN is the record's position number, not stored at its start."
    ],
    [
     "The number of fields",
     "The record has only 3 fields."
    ],
    [
     "The record length (byte count)",
     "Correct. Each record begins with a length indicator giving its byte count (L3, Record structures)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: Variable-length records save space when record sizes are diverse.",
   "o": [
    [
     "True",
     "Correct. That is the advantage of variable-length records; the drawback is needing an index file to jump to the i-th record (L3, Record structures: advantages and disadvantages)"
    ],
    [
     "False",
     "It is true; it is the advantage the lecture gives for variable-length records."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: With fixed-length records you cannot jump to the i-th record unless you use an index file.",
   "o": [
    [
     "True",
     "That is the disadvantage of variable-length records, not fixed-length ones."
    ],
    [
     "False",
     "Correct. Fixed-length records make it easy to jump to the i-th record (offset = RRN × record size); the index file is needed for variable-length records (L3, Record structures: advantages and disadvantages)"
    ]
   ],
   "a": 1
  },
  {
   "q": "A key that uniquely identifies a record and does not change is the:",
   "o": [
    [
     "Secondary key",
     "A secondary key is used for searching but does not typically identify a record uniquely."
    ],
    [
     "Primary key",
     "Correct. A primary key uniquely identifies a record and does not change (L3, Managing files of records)"
    ],
    [
     "RRN",
     "The RRN is the record's position (0, 1, 2...), not a key field."
    ],
    [
     "Length indicator",
     "A length indicator stores a field or record size."
    ]
   ],
   "a": 1
  },
  {
   "q": "Sequential search is appropriate for:",
   "o": [
    [
     "Pattern matching or files with few records",
     "Correct. Sequential search is O(n), so it suits pattern matching or small files (L3, Managing files of records)"
    ],
    [
     "Very large files where we know the RRN",
     "When the RRN is known, direct access (O(1)) is used instead."
    ],
    [
     "Jumping to the i-th fixed-length record",
     "Jumping to a record is done by direct access with offset = RRN × record size."
    ],
    [
     "Variable-length records that have an index file",
     "With an index file we can jump directly, without reading every record."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Direct access is possible when we know the RRN of the record.",
   "o": [
    [
     "True",
     "Correct. Direct access seeks straight to the start of the record, O(1), when the RRN is known (L3, Managing files of records)"
    ],
    [
     "False",
     "It is true; knowing the RRN is exactly what makes direct access possible."
    ]
   ],
   "a": 0
  },
  {
   "q": "The RRN of the <b>first</b> record in a file is:",
   "o": [
    [
     "1",
     "Counting starts at 0, so RRN 1 is the second record."
    ],
    [
     "The record size",
     "The record size is used to compute the offset, not the RRN."
    ],
    [
     "0",
     "Correct. The first record has RRN 0, the next RRN 1, and so on (L3, Managing files of records)"
    ],
    [
     "The primary key value",
     "The primary key identifies the record's content; the RRN is its position, starting at 0."
    ]
   ],
   "a": 2
  },
  {
   "q": "Using the Quiz (3) record <code>struct Item { char desc[31]; int qty; float price; };</code> (assume int and float are 4 bytes each, no padding), what is the byte offset of the record with RRN 4?",
   "o": [
    [
     "124",
     "124 is 31 × 4, the desc array only, not the whole 39-byte record."
    ],
    [
     "195",
     "195 is 39 × 5, the offset of RRN 5 (it treats RRN 4 as the fifth step)."
    ],
    [
     "39",
     "39 is the size of one record (the offset of RRN 1)."
    ],
    [
     "156",
     "Correct. Record size = 31 + 4 + 4 = 39, offset = 4 × 39 = 156 (L3, Quiz (3) Q2)"
    ]
   ],
   "a": 3
  },
  {
   "q": "A file holds fixed-length 60-byte records. A record starts at byte offset 1200. What is its RRN?",
   "o": [
    [
     "20",
     "Correct. RRN = offset / record size = 1200 / 60 = 20 (L3, Quiz (3) Q2)"
    ],
    [
     "21",
     "21 counts records starting from 1; it is the 21st record but its RRN is 20."
    ],
    [
     "1140",
     "1140 is the offset of the previous record (RRN 19)."
    ],
    [
     "72000",
     "72000 multiplies instead of dividing."
    ]
   ],
   "a": 0
  },
  {
   "q": "In C, the origin value in <code>fseek(infile, offset, origin)</code> that means the <b>end</b> of the file is:",
   "o": [
    [
     "0",
     "0 means the beginning of the file."
    ],
    [
     "1",
     "1 means the current position."
    ],
    [
     "2",
     "Correct. Origin 0 = beginning, 1 = current, 2 = end (L3, Seeking)"
    ],
    [
     "3",
     "There is no origin 3; the only origins are 0, 1 and 2."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which call moves to the <b>start</b> of the file?",
   "o": [
    [
     "<code>fseek(infile,0L,2)</code>",
     "Origin 2 is the end, so this moves to the end."
    ],
    [
     "<code>fseek(infile,0L,0)</code>",
     "Correct. Offset 0 from origin 0 (beginning) is the start of the file (L3, Seeking)"
    ],
    [
     "<code>fseek(infile,0L,1)</code>",
     "Origin 1 is the current position, so this does not move."
    ],
    [
     "<code>fseek(infile,-10L,1)</code>",
     "This moves back 10 bytes from the current position."
    ]
   ],
   "a": 1
  },
  {
   "q": "The C++ equivalent of <code>fseek(infile, -10L, 1)</code> is:",
   "o": [
    [
     "<code>infile.seekg(-10, ios::beg);</code>",
     "ios::beg corresponds to origin 0, the beginning."
    ],
    [
     "<code>infile.seekg(-10, ios::end);</code>",
     "ios::end corresponds to origin 2, the end."
    ],
    [
     "<code>infile.seekp(10, ios::cur);</code>",
     "This moves the put pointer forward 10 bytes, not back."
    ],
    [
     "<code>infile.seekg(-10, ios::cur);</code>",
     "Correct. Origin 1 (current) is ios::cur, and −10 moves back 10 bytes (L3, Seeking)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: In C++, <code>seekg</code> moves the put (write) pointer of an fstream.",
   "o": [
    [
     "True",
     "seekg moves the get pointer; the put pointer is moved by seekp."
    ],
    [
     "False",
     "Correct. seekg moves the get (read) pointer and seekp moves the put (write) pointer (L3, Seeking)"
    ]
   ],
   "a": 1
  },
  {
   "q": "A file holds fixed-length 25-byte records. After <code>infile.seekg(0, ios::end);</code> the call <code>infile.tellg()</code> returns 500. How many records are in the file?",
   "o": [
    [
     "25",
     "25 is the record size, not the number of records."
    ],
    [
     "19",
     "19 would be the last RRN; the count is 20."
    ],
    [
     "20",
     "Correct. tellg at the end gives the file size: 500 / 25 = 20 records (L3, Quiz (3) Q1)"
    ],
    [
     "12500",
     "12500 multiplies instead of dividing."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: In the \"copy a file with no loops\" program, <code>infile.seekg(0)</code> is called after <code>tellg</code> so that the single <code>read</code> starts from the beginning of the file.",
   "o": [
    [
     "True",
     "Correct. After jumping to the end to get the size, the get pointer is moved back to the start, then one read and one write of that size (L3, Quiz (3) Q1)"
    ],
    [
     "False",
     "It is true; without returning to the start, the read would begin at the end of the file."
    ]
   ],
   "a": 0
  },
  {
   "q": "In <code>UpdateRecord</code>, which call writes the new record over the old one?",
   "o": [
    [
     "<code>file.seekg(RRN * sizeof(newItem), ios::beg);</code>",
     "seekg moves the get (read) pointer, and it only positions, it does not write."
    ],
    [
     "<code>file.write((char*)&amp;newItem, sizeof(newItem));</code>",
     "Correct. After seekp positions the put pointer at RRN × record size, write overwrites the old record (L3, Quiz (3) Q2)"
    ],
    [
     "<code>file.seekp(RRN * sizeof(newItem), ios::beg);</code>",
     "seekp only moves the put pointer to the record; it writes nothing."
    ],
    [
     "<code>file.tellg();</code>",
     "tellg only reports the current get position."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: A file that a program writes its results into is called an input file.",
   "o": [
    [
     "True",
     "A file the program writes into is an output file."
    ],
    [
     "False",
     "Correct. Input files are read by the program; output files are written by it (L3, File input and output)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: <code>Seek(infile, 3030)</code> moves to byte 3030 of the file.",
   "o": [
    [
     "True",
     "Correct. The generic Seek(Source_File, Offset) moves to the given byte offset (L3, Seeking)"
    ],
    [
     "False",
     "It is true; it is the lecture's own generic example."
    ]
   ],
   "a": 0
  }
 ],
 "4": [
  {
   "q": "A heap file has B = 400 pages, R = 20 records/page, D = 12 ms, C = 0.5 ms. What is the cost of inserting one record?",
   "o": [
    [
     "8800 ms",
     "8800 ms = 400 × (12 + 20 × 0.5) is the SCAN cost B(D + RC); an insert only reads and rewrites the last page (L4)."
    ],
    [
     "4400 ms",
     "That is the equality-search cost 0.5B(D + RC)."
    ],
    [
     "12.5 ms",
     "This counted only one D. The last page must be read AND written back."
    ],
    [
     "24.5 ms",
     "Correct. Insert = 2D + C = 2 × 12 + 0.5 = 24.5 ms."
    ]
   ],
   "a": 3
  },
  {
   "q": "A sorted file has B = 256 pages, R = 16 records/page, D = 10 ms, C = 1 ms. What is the equality-search cost?",
   "o": [
    [
     "84 ms",
     "Correct. D·log₂B + C·log₂R = 10 × 8 + 1 × 4 = 84 ms."
    ],
    [
     "48 ms",
     "The logs were swapped: D·log₂R + C·log₂B = 40 + 8."
    ],
    [
     "88 ms",
     "This used log₂B for both terms (80 + 8). The record term uses log₂R."
    ],
    [
     "3328 ms",
     "That is the HEAP equality search 0.5B(D + RC)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Same sorted file (B = 256, R = 16, D = 10 ms, C = 1 ms). What is the cost of inserting one record?",
   "o": [
    [
     "6656 ms",
     "That is only B(D + RC). You forgot to add the search cost."
    ],
    [
     "6740 ms",
     "Correct. Search + 2 × 0.5B(D + RC) = 84 + 256 × (10 + 16) = 84 + 6656 = 6740 ms."
    ],
    [
     "3412 ms",
     "This shifted only half the file once (84 + 3328). Half the file must be both read AND written: 2 × 0.5B(D + RC)."
    ],
    [
     "84 ms",
     "That is only the search cost; it ignores shifting the later records."
    ]
   ],
   "a": 1
  },
  {
   "q": "A heap file has B = 256, R = 16, D = 10 ms, C = 1 ms. What is the average cost of deleting a record (search + C + D)?",
   "o": [
    [
     "3328 ms",
     "This is only the search cost. You forgot + C + D."
    ],
    [
     "6667 ms",
     "This used the full scan (6656) as the search. On average only half the file is scanned."
    ],
    [
     "3339 ms",
     "Correct. Search = 0.5 × 256 × (10 + 16) = 3328; delete = 3328 + 1 + 10 = 3339 ms."
    ],
    [
     "21 ms",
     "21 ms = 2 × 10 + 1 is the heap INSERT cost 2D + C; a delete must first search half the file, then add C + D (L4)."
    ]
   ],
   "a": 2
  },
  {
   "q": "A sorted file holds keys 1, 2, 4, 6, 7 in 20-byte records starting at offset 0. A record with key 3 is inserted. How many existing records must be moved?",
   "o": [
    [
     "0",
     "That is a heap file, where the record is appended at the end and order is ignored."
    ],
    [
     "2",
     "Records 4, 6 AND 7 all have greater keys, so all three move."
    ],
    [
     "5",
     "Records 1 and 2 have smaller keys, so they stay in place."
    ],
    [
     "3",
     "Correct. All records with a greater key (4, 6, 7) move one location toward the end, and key 3 goes in at offset 40."
    ]
   ],
   "a": 3
  },
  {
   "q": "A file organization method defines:",
   "o": [
    [
     "The record placement strategy and the relationship between a record's key value and its relative address",
     "Correct. This is the definition from the slides."
    ],
    [
     "How to prepare and format the storage media",
     "Preparing and formatting the storage media is a file MANAGEMENT task (L1); an organization method defines record placement and key-to-address relation (L4)."
    ],
    [
     "The number of sectors per cluster",
     "Sectors per cluster is a physical disk setting from L2; a file organization method defines record placement and the key–address relationship (L4)."
    ],
    [
     "Which system software (OS or DBMS) manages the file",
     "That is about file managers, not organization methods."
    ]
   ],
   "a": 0
  },
  {
   "q": "The efficiency of a file organization is measured by:",
   "o": [
    [
     "The size of the records",
     "Record size affects space, but the slides measure efficiency differently."
    ],
    [
     "The number of disk accesses",
     "Correct. Fewer disk accesses means a more efficient organization."
    ],
    [
     "The number of fields per record",
     "This is a logical design detail, not the efficiency measure."
    ],
    [
     "The CPU speed",
     "CPU time is small compared with disk access; the slides count disk accesses."
    ]
   ],
   "a": 1
  },
  {
   "q": "In a heap file, a range search costs the same as a full scan, B(D + RC).",
   "o": [
    [
     "True",
     "Correct. Matching records may be anywhere in an unordered file, so every page must be read."
    ],
    [
     "False",
     "The heap file has no order to exploit, so range search = B(D + RC), the same as the scan."
    ]
   ],
   "a": 0
  },
  {
   "q": "Another name for an unordered (heap) file is:",
   "o": [
    [
     "Indexed file",
     "Indexing is a separate organization method (with heap, sequential and hashing); the heap file's other name is pile file (L4)."
    ],
    [
     "Sorted file",
     "A sorted file is the ORDERED (sequential) file."
    ],
    [
     "Pile file",
     "Correct. The heap file is also called an unordered sequential file or pile file."
    ],
    [
     "Hashed file",
     "A hashed file computes each record's address with a hash function."
    ]
   ],
   "a": 2
  },
  {
   "q": "In a heap file equality search, if no record matches the condition, only half the file is scanned.",
   "o": [
    [
     "True",
     "Half the file is the AVERAGE when the record exists. With no match you cannot stop early."
    ],
    [
     "False",
     "Correct. If no record matches, the entire file must be scanned, B(D + RC)."
    ]
   ],
   "a": 1
  }
 ],
 "5": [
  {
   "q": "A short version of the course hash for 4-character keys is:<pre>sum = key[0]*key[1] + key[2]*key[3];\nsum = sum % 19937;\nreturn sum % maxAddress;</pre>With ASCII A = 65, B = 66, C = 67, D = 68, what is the home address of key <code>\"ABCD\"</code> when maxAddress = 100?",
   "o": [
    [
     "46",
     "Correct. 65 × 66 = 4290; 67 × 68 = 4556; sum = 8846; 8846 % 19937 = 8846; 8846 % 100 = 46."
    ],
    [
     "8846",
     "This skipped the final % maxAddress. The address must be in 0..99."
    ],
    [
     "66",
     "This added the four codes (266) instead of multiplying pairs."
    ],
    [
     "90",
     "90 = 4290 % 100 uses only the first pair (65 × 66); the second pair 67 × 68 = 4556 must be added: 8846 % 100 = 46 (L5)."
    ]
   ],
   "a": 0
  },
  {
   "q": "With h(k) = k mod 13, which pair of keys are synonyms?",
   "o": [
    [
     "30 and 44",
     "30 mod 13 = 4 and 44 mod 13 = 5: different addresses."
    ],
    [
     "27 and 53",
     "Correct. 27 mod 13 = 1 and 53 mod 13 = 1. Both keys hash to the same address, so they collide and are synonyms."
    ],
    [
     "19 and 33",
     "19 mod 13 = 6 and 33 mod 13 = 7: different addresses."
    ],
    [
     "40 and 64",
     "40 mod 13 = 1 and 64 mod 13 = 12: different addresses."
    ]
   ],
   "a": 1
  },
  {
   "q": "Using the course's last step (divide by the address-space size and keep the remainder), what is the home address of the numeric key 1234 in an address space of 101 addresses?",
   "o": [
    [
     "12",
     "That is the quotient (1234 / 101 ≈ 12), not the remainder."
    ],
    [
     "34",
     "This used the last two digits, not the remainder of division by 101."
    ],
    [
     "22",
     "Correct. 101 × 12 = 1212, and 1234 - 1212 = 22."
    ],
    [
     "101",
     "The addresses run from 0 to 100, so 101 is outside the address space."
    ]
   ],
   "a": 2
  },
  {
   "q": "A hashed file has H = 1 ms, D = 10 ms, R = 20 records/page, C = 0.5 ms. What is the equality-search cost H + D + 0.5RC?",
   "o": [
    [
     "21 ms",
     "This scanned the whole page (RC = 10) instead of half of it on average."
    ],
    [
     "15 ms",
     "This left out H, the time to compute the hash."
    ],
    [
     "11 ms",
     "This left out the 0.5RC term for checking records in the page."
    ],
    [
     "16 ms",
     "Correct. 1 + 10 + 0.5 × 20 × 0.5 = 1 + 10 + 5 = 16 ms."
    ]
   ],
   "a": 3
  },
  {
   "q": "With hashing, there is an obvious connection between a record's key and its location in the file.",
   "o": [
    [
     "True",
     "The lecture says the opposite: with hashing there is NO obvious connection between the key and the location; h(k) computes it (L5, What is hashing?)."
    ],
    [
     "False",
     "Correct. The hash function computes the address, and there is no obvious connection between the key and the location."
    ]
   ],
   "a": 1
  },
  {
   "q": "Why does a range search on a hashed file cost 1.25B(D + RC)?",
   "o": [
    [
     "Hashing does not keep the records in key order, so the whole file must be scanned",
     "Correct. Records in a range can be in any bucket, so every page is read."
    ],
    [
     "Only a quarter of the buckets need to be read",
     "No pages can be skipped; all 1.25B pages are read."
    ],
    [
     "The hash function must be computed 1.25 times per record",
     "The 1.25 factor is about pages, not hash computations."
    ],
    [
     "Records are found by binary search over the buckets",
     "Binary search needs sorted records, which a hashed file does not have."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the hashed-file equality-search cost H + D + 0.5RC, what does H represent?",
   "o": [
    [
     "The number of buckets",
     "The number of data pages is B in the cost model; H is the time to compute the hash function (L4–L5, Cost model)."
    ],
    [
     "The time to compute the hash function",
     "Correct. Compute h(k) (H), read the one page (D), and check half its records on average (0.5RC)."
    ],
    [
     "The height of the cylinder",
     "Cylinder height is a disk-geometry term from Lecture 2."
    ],
    [
     "The number of collisions",
     "Collisions do not appear in the formula; H is the time to compute h(k), D reads one page and 0.5RC checks half its records (L5)."
    ]
   ],
   "a": 1
  },
  {
   "q": "In the course hash function, what is the purpose of the final line <code>return sum % maxAddress;</code>?",
   "o": [
    [
     "To prevent integer overflow while folding",
     "That is the job of sum % 19937 (the prime divisor)."
    ],
    [
     "To combine pairs of characters into a number",
     "Combining pairs of characters is the folding line sum += key[j] * key[j+1]; the final line maps the sum into the address space (L5)."
    ],
    [
     "To map the sum into the address space 0..maxAddress-1, giving the home address",
     "Correct. The remainder of dividing by the address-space size is the home address."
    ],
    [
     "To detect synonyms",
     "The function only computes an address; it does not detect collisions."
    ]
   ],
   "a": 2
  },
  {
   "q": "If the address space has 1000 available addresses, the hash function maps every possible key to an address in {0, 1, …, 999}.",
   "o": [
    [
     "True",
     "Correct. The address space is chosen beforehand, and h maps all possible keys into it."
    ],
    [
     "False",
     "The slides use this exact example: 1000 addresses, so h maps keys to 0..999."
    ]
   ],
   "a": 0
  },
  {
   "q": "Why does scanning a hashed file cost 1.25B(D + RC) instead of B(D + RC)?",
   "o": [
    [
     "Each record is read 1.25 times because of collisions",
     "Each page is read once; the extra cost comes from having more pages."
    ],
    [
     "The hash must be computed for every page",
     "A scan reads every page in turn and never computes h(k); the extra 0.25 comes from pages being only ~80% full (L5)."
    ],
    [
     "The file is sorted after hashing",
     "Hashing does not sort the file; it scatters records by h(k). The 1.25 factor comes from buckets being ~80% full (L5)."
    ],
    [
     "Buckets are kept about 80% full, so the same data occupies 1.25 times as many pages",
     "Correct. 1 / 0.8 = 1.25, so there are 1.25B pages to read."
    ]
   ],
   "a": 3
  }
 ]
};

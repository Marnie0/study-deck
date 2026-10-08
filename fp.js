window.COURSES = window.COURSES || {};
COURSES.fp = {
  id: `fp`,
  name: `File Processing`,
  short: `File Processing`,
  code: `CS308`,
  by: `Dr. M. AbdelFattah`,
  lectures: [
    /* ───────────────────────── LECTURE 1 ───────────────────────── */
    {
      n: 1, title: `Intro to File Organization and File I/O in C/C++`,
      notes: [
        { h: `Data structure vs file structure`, pts: [
          `Both involve <b>representation of data</b> + <b>operations for accessing data</b>.`,
          `Difference: data structures deal with data in <b>main memory</b>; file structures deal with data in <b>secondary storage</b> (files).`,
          `Main reference: <i>File Structures: An Object-Oriented Approach with C++</i> by Folk, Zoellick and Riccardi.`
        ]},
        { h: `(1) Data processing and (2) files`, pts: [
          `Data processing = <b>storage</b>, <b>organization</b>, <b>access</b> and <b>processing</b> of data.`,
          `Data is saved in files, and files are saved on primary (RAM) or secondary (hard disk) storage. Organization is either <b>sequential</b> or <b>direct</b> access.`,
          `<b>File</b> = a collection of data placed on <b>secondary, non-volatile</b> storage (hard disk, magnetic tape, optical media).`,
          `File storage is slow because it has <b>many moving parts</b>.`,
          `Why files? They are the only suitable way to store large amounts of information (pictures, music, video); operating systems are too large to fit fully in memory; databases are everywhere; backup and archiving.`
        ]},
        { h: `(3) File structures, (4) organization, (5) management, (6) managers`, pts: [
          `<b>Logical structure</b>: how programmers see the file (text, image, data file…). <b>Physical structure</b>: how it is stored on secondary storage.`,
          `<b>Logical organization methods</b>: heap, indexing, hashing. <b>Physical organization methods</b>: organizing tracks by <b>sectors</b> or by <b>blocks</b>.`,
          `File organization methods must provide <b>fast access time</b> and <b>good space utilization</b>.`,
          `<b>File management</b> covers: preparing/formatting storage media; allocating storage space and addressing; managing free space.`,
          `<b>File managers</b> (system software): the <b>OS</b> and the <b>DBMS</b>.`,
          `Course objectives: get information with <b>as few disk accesses as possible</b>, and group related information so a request needs <b>only one trip to the disk</b>.`
        ]},
        { h: `Physical file vs logical file`, table: [
          [`Physical file`, `Logical file`],
          [`A collection of bytes stored on a disk`, `A channel connecting the program to the physical file`],
          [`Has a physical name, e.g. A.txt`, `Has a logical name: a variable in the program, e.g. infile, fp`],
          [`Used once, when opening the file`, `Used as many times as needed: open, read, write, append, close`]
        ]},
        { h: `Opening files`, pts: [
          `Opening makes a file ready for use: either open an existing file or create a new one. After opening you are positioned at the <b>beginning</b> of the file.`,
          `C: <code>FILE *outFile; outFile = fopen("A.txt", "w");</code> (logical name = outFile, physical file = "A.txt", mode = "w").`,
          `C++: <code>fstream outfile; outfile.open("myfile.txt", ios::out);</code>. Mode flags are combined with bitwise OR <code>|</code>.`,
          `C modes: <b>"r"</b> open existing for reading; <b>"w"</b> create new or truncate existing for output; <b>"a"</b> create new or append for output; <b>"r+"</b> existing for input and output; <b>"w+"</b> create/truncate for input and output; <b>"a+"</b> create/append for input and output; adding <b>b</b> (rb, wb, ab, r+b…) means <b>binary mode</b>.`,
          `C++ flags: <code>ios::in</code> input, <code>ios::out</code> output, <code>ios::app</code> seek to end before each write, <code>ios::ate</code> start positioned at end, <code>ios::trunc</code> always create new (truncate), <code>ios::binary</code> binary mode.`
        ]},
        { h: `C mode ↔ C++ flags`, table: [
          [`C`, `C++`],
          [`r`, `in`],
          [`w`, `out | trunc  (or out)`],
          [`a`, `out | app`],
          [`r+`, `out | in`],
          [`w+`, `out | in | trunc`],
          [`a+`, `out | in | app`],
          [`…b`, `… | binary`]
        ]},
        { h: `Closing files`, pts: [
          `Closing frees the logical name for another physical file, "like hanging up the telephone after a call".`,
          `Bytes are not sent one by one. They are collected in a <b>buffer</b> and sent as a <b>block</b>.`,
          `If you do not close, the OS closes the file at the end of the program. If the program <b>terminates abnormally, data may be lost</b>.`
        ]},
        { h: `Reading and writing`, pts: [
          `Generic: <code>Read(Source_file, Destination_addr, Size)</code> and <code>Write(Destination_file, Source_addr, Size)</code>.`,
          `<code>fgetc(fp)</code> reads one character. <code>fgets(str, n, fp)</code> reads a string (at most n-1 characters). <code>fscanf(fp, "fmt", vars)</code> reads formatted text. <code>fread(&amp;blk, size, count, fp)</code> reads a record/block.`,
          `fread/fwrite arguments: 1) address of the variable, 2) element size in bytes, 3) number of elements, 4) logical file name.`,
          `C++: <code>infile &gt;&gt; c;</code> or <code>infile.read(&amp;c,1);</code> / <code>infile.read(a,10);</code>. Writing: <code>outfile &lt;&lt; c;</code>, <code>outfile.write(&amp;c,1);</code>, <code>outfile.write(a,10);</code>.`,
          `End of file: in C, <code>fread</code> returns <b>0</b>; in C++, <code>infile.fail()</code> returns true, or <code>infile.eof()</code> returns true.`
        ]},
        { h: `Standard I/O logical names`, table: [
          [`Purpose`, `Default meaning`, `C`, `C++`],
          [`Standard output`, `Console/Screen`, `stdout`, `cout`],
          [`Standard input`, `Keyboard`, `stdin`, `cin`],
          [`Standard error`, `Console/Screen`, `stderr`, `cerr`]
        ]},
        { h: `Sample: read employee records (C)`, code: `struct employee { char name[20]; int sal; };
FILE *my_file; struct employee emp;
my_file = fopen("c:\\\\emp.txt", "rb+");
if (my_file == NULL) { printf("Error in opening file"); exit(1); }
while (!feof(my_file)) {
    fread(&emp, sizeof(emp), 1, my_file);
    printf("The Emp Name: %s \\t", emp.name);
    printf("The Emp Sal : %d\\n", emp.sal);
}
fclose(my_file);`, pts: [
          `Algorithm: open the file for input → while there are characters/records, read one and write it to the screen → close the file.`,
          `Tip: <code>while(!feof())</code> only becomes true <i>after</i> a read fails, so the last record may print twice. Checking <code>fread(...) == 1</code> is safer. The slides also print <code>%f</code> for an int; use <code>%d</code>.`
        ]}
      ],
      cards: [
        [`File (definition)`, `A collection of data placed on secondary (non-volatile) storage.`],
        [`Data structure vs file structure`, `DS: data in main memory. FS: data in secondary storage.`],
        [`Logical vs physical structure`, `Logical: how programmers see the file. Physical: how it is stored on disk.`],
        [`Logical organization methods`, `Heap, indexing, hashing.`],
        [`Physical organization methods`, `Organizing tracks by sectors or by blocks.`],
        [`File organization must provide…`, `Fast access time and good space utilization.`],
        [`File managers`, `OS and DBMS.`],
        [`Physical file`, `Bytes on disk with a physical name (A.txt); used once, at open.`],
        [`Logical file`, `A program variable (fp, infile) channel to the physical file; used many times.`],
        [`"w+" mode`, `Create a new file or truncate an existing one, for input and output.`],
        [`"a" mode`, `Create a new file or append to an existing one, for output.`],
        [`ios::app vs ios::ate`, `app: seek to the end before EACH write. ate: initially positioned at the end.`],
        [`EOF detection in C / C++`, `C: fread returns 0. C++: infile.fail() or infile.eof() returns true.`],
        [`Why close files?`, `Frees the logical name, flushes the buffer; abnormal termination may lose data.`]
      ],
      qa: [
        [`Mention the main differences between a physical file and a logical file.`, `Physical file: a collection of bytes on disk with a physical name (A.txt), used once when opening. Logical file: a channel connecting the program to the physical file, with a logical name that is a program variable (infile, fp), used many times for open, read, write, append and close.`],
        [`Why do we need files?`, `They are the only suitable way to store large amounts of information such as pictures, music and video; operating systems are too large to load fully into memory; databases are everywhere; and for backup and archiving.`],
        [`What does file management involve?`, `Preparing/formatting storage media, allocating storage space and addressing, and managing free space.`],
        [`What happens if you do not close a file?`, `The OS closes it at the end of execution, but if the program terminates abnormally, data in the buffer may be lost.`],
        [`Write a method writeC() that reads one character from the keyboard and writes it to alphabet.txt.`, `void writeC(){ FILE *fp = fopen("c:\\\\alphabet.txt","w"); if(fp==NULL){ printf("Error in opening file"); exit(1);} char ch = getche(); fputc(ch, fp); fclose(fp); }`],
        [`Write readS() to read strings from std.txt and print them.`, `FILE *f = fopen("c:\\\\std.txt","r"); if(f==NULL){...} char s[80]; while(1){ fgets(s,80,f); if(feof(f)) break; puts(s);} fclose(f);`]
      ],
      quiz: [
        { q: `Files are managed by system software:`, o: [
          [`OS`, `Correct, but only half the answer.`],
          [`DBMS`, `Correct, but only half the answer.`],
          [`MIS`, `MIS is an information system, not a file manager.`],
          [`Both a and b`, `Correct. Files are managed by the OS and the DBMS.`]
        ], a: 3, src: `Midterm Model C` },
        { q: `File organization methods must provide:`, o: [
          [`Fast access time and good space utilization`, `Correct.`],
          [`Preparing/formatting storage media`, `This is a file MANAGEMENT technique.`],
          [`Allocating storage space and addressing`, `File management, not organization.`],
          [`Managing free spaces`, `File management, not organization.`]
        ], a: 0, src: `Midterm Model B` },
        { q: `A logical file is:`, o: [
          [`A collection of bytes stored on a disk`, `That is the physical file.`],
          [`A channel connecting the program to the physical file`, `Correct. It is named by a program variable such as fp or infile.`],
          [`The file's name on disk, e.g. A.txt`, `That is the physical name.`],
          [`A backup of the physical file`, `Not a definition from the course.`]
        ], a: 1 },
        { q: `Which is the correct syntax for opening a file in C?`, o: [
          [`FILE *fopen(const char *filename, const char *mode)`, `Correct. fopen takes the file name and the mode and returns FILE*.`],
          [`FILE *fopen(const char *filename)`, `The mode argument is missing.`],
          [`FILE *open(const char *filename, const char *mode)`, `The function is fopen, not open.`],
          [`FILE open(const char *filename)`, `Wrong name, return type and arguments.`]
        ], a: 0, src: `Summary MCQ` },
        { q: `What does the mode "w+" do?`, o: [
          [`Creates a text file for writing, discards previous contents if any`, `That is "w" (output only).`],
          [`Creates a text file for update (read and write), discards previous contents if any`, `Correct. w+ = create or truncate, for input and output.`],
          [`Creates a text file for writing, keeps previous contents`, `Keeping contents describes "a".`],
          [`Creates a text file for update, keeps previous contents`, `That is "a+".`]
        ], a: 1, src: `Summary MCQ` },
        { q: `If a mode includes "b" after the initial letter (e.g. "rb"), it indicates:`, o: [
          [`Text file`, `Without b the file is in text mode.`],
          [`Big text file`, `No such mode.`],
          [`Binary file`, `Correct.`],
          [`Blueprint text`, `No such mode.`]
        ], a: 2, src: `Summary MCQ` },
        { q: `Which C++ class creates a stream for BOTH input and output?`, o: [
          [`ofstream`, `Output only.`],
          [`ifstream`, `Input only.`],
          [`iostream`, `Console I/O, not a file stream class.`],
          [`fstream`, `Correct.`]
        ], a: 3, src: `Summary MCQ` },
        { q: `The default opening mode of an ifstream is:`, o: [
          [`ios::in`, `Correct. ifstream is for input.`],
          [`ios::out`, `That is ofstream's default.`],
          [`ios::app`, `Not a default.`],
          [`ios::trunc`, `Not a default for input.`]
        ], a: 0, src: `Summary MCQ` },
        { q: `Which is NOT used to seek the file pointer?`, o: [
          [`ios::set`, `Correct. The origins are ios::beg, ios::cur and ios::end. ios::set does not exist.`],
          [`ios::end`, `A valid origin.`],
          [`ios::cur`, `A valid origin.`],
          [`ios::beg`, `A valid origin.`]
        ], a: 0, src: `Summary MCQ` },
        { q: `How do you detect end of file in C++ after an attempted read?`, o: [
          [`fread returns 0`, `That is the C way.`],
          [`infile.fail() returns true (or infile.eof())`, `Correct.`],
          [`infile.close() returns false`, `close does not signal EOF.`],
          [`cout prints EOF`, `Not how EOF is detected.`]
        ], a: 1 },
        { q: `The ___ function reads at most one less than the number of characters specified by size.`, o: [
          [`fget()`, `Not a standard function.`],
          [`fgets()`, `Correct. fgets(str, n, fp) reads up to n-1 characters and adds '\\0'.`],
          [`fput()`, `Not a read function.`],
          [`fputs()`, `Writes a string.`]
        ], a: 1, src: `Summary MCQ` },
        { q: `In C, the logical name for the standard error device is:`, o: [
          [`stdout`, `Standard output.`],
          [`stdin`, `Standard input.`],
          [`stderr`, `Correct. (cerr in C++)`],
          [`cerr`, `That is the C++ name.`]
        ], a: 2 }
      ]
    },
    /* ───────────────────────── LECTURE 2 ───────────────────────── */
    {
      n: 2, title: `Physical File Organization: the Hard Disk`,
      notes: [
        { h: `Secondary storage devices`, pts: [
          `<b>DASD</b> (Direct Access Storage Devices): <b>magnetic disks</b> (hard disk, floppy) and <b>optical disks</b> (CD-ROM, CD-R, CD-RW, DVD).`,
          `<b>SASD</b> (Serial Access Storage Devices): <b>magnetic tape</b>.`
        ]},
        { h: `Disk components`, pts: [
          `<b>1. Platter</b>: a circular disk storing magnetic data on <b>both surfaces</b>. Each is divided into concentric <b>tracks</b> (thousands per platter), and each track into <b>sectors</b>.`,
          `A <b>sector</b> is the <b>smallest addressable portion</b> of a disk, usually <b>512 bytes</b>.`,
          `A <b>cluster</b> is a fixed number of <b>contiguous sectors</b>. It is the OS file manager's view of the file.`,
          `A <b>cylinder</b> is the set of tracks directly above/below each other. All data on one cylinder can be read <b>without moving the arm</b>. Number of cylinders = number of tracks per surface.`,
          `So a platter has four components: sector, cluster, track, cylinder.`,
          `<b>2. Read/write heads</b> fly above the surface with clearance as little as <b>3 nanometers</b>. Each surface has its own head.`,
          `<b>3. Arm assembly</b> holds the arms and heads. If it stops working, the drive fails. On a read, the OS finds the platter, track and sector, reads the <b>entire sector into a buffer</b>, then finds the byte.`,
          `<b>4. Spindle</b> holds platters in a fixed position and <b>rotates</b> them, bringing the sector under the head.`,
          `<b>5. Arms</b> carry, guide and move the heads. Moving the arm is called <b>seeking</b>, and it is usually the <b>slowest</b> part.`
        ]},
        { h: `Capacity formulas`, formula: [
          `Sector capacity = bytes per sector (512 B)`,
          `Cluster capacity = sectors per cluster × bytes per sector`,
          `Track capacity = sectors per track × bytes per sector`,
          `Cylinder capacity = tracks per cylinder × track capacity`,
          `Drive capacity = number of cylinders × cylinder capacity`,
          `Platters = cylinder height / 2   (surfaces = cylinder height)`,
          `Number of cylinders = tracks per surface`
        ]},
        { h: `Worked problem (slides 22–26)`, pts: [
          `Given: 90,000 fixed-length records of 256 B; 512 B/sector; 60 sectors/track; cylinder height 14 tracks; 5000 tracks/surface; 4 sectors/cluster.`,
          `Platters = 14/2 = <b>7</b>; sides = <b>14</b>; track size = 60×512 = <b>30,720 B</b>; cylinders = <b>5000</b>.`,
          `Cylinder size = 14 × 30,720 = <b>430,080 B</b>; sectors per cylinder = 430,080/512 = <b>840</b>.`,
          `File size = 90,000 × 256 = <b>23,040,000 B</b>. Records/sector = 512/256 = <b>2</b>; records/track = 30,720/256 = <b>120</b>; records/cylinder = 430,080/256 = <b>1680</b>.`,
          `Sectors for file = 23,040,000/512 = <b>45,000</b>; tracks = 23,040,000/30,720 = <b>750</b>; cylinders = 23,040,000/430,080 = <b>53.57</b> (54 whole cylinders).`,
          `Drive capacity = 5000 × 430,080 = <b>2,150,400,000 B</b>.`
        ]},
        { h: `Organizing tracks by sectors vs by blocks`, pts: [
          `<b>By sectors</b>: used by the <b>OS</b>. Slow access and <b>fragmentation</b>, i.e. loss of space within a sector when records do not fit exactly (e.g. a 300 B record in a 512 B sector). Some OSs allow clusters.`,
          `<b>By blocks</b>: used by the <b>DBMS</b>. Tracks are divided into user-defined blocks (pages) holding an integral number of records.`,
          `<b>Blocking factor</b> = number of records stored in each block. No internal fragmentation and no record spans two blocks.`,
          `Each block has <b>sub-blocks</b>: <b>count</b> sub-block (number of bytes in the block), <b>key</b> sub-block (optional; key of the last record, so the controller can search without loading the block) and <b>data</b> sub-block (the records).`
        ]},
        { h: `Non-data overhead`, pts: [
          `Space used for things other than data.`,
          `Sector-organized: sector address, track address, condition (defective?) at the start of each sector, plus gaps between sectors.`,
          `Block-organized: sub-blocks and inter-block gaps, so there is <b>more</b> non-data overhead than with sector addressing.`,
          `<b>Exercise</b>: track = 20,000 B, overhead = 300 B/block, record = 100 B.<br>BF = 10: block = 1000+300 = 1300; ⌊20,000/1300⌋ = ⌊15.38⌋ = 15 blocks, so <b>150 records/track</b>.<br>BF = 60: block = 6000+300 = 6300; ⌊20,000/6300⌋ = ⌊3.17⌋ = 3 blocks, so <b>180 records/track</b>.`
        ]},
        { h: `The cost of a disk access`, formula: [
          `Average total time = Seek time + Rotational delay + Transfer time`,
          `Revolution time (ms) = 60 × 1000 / RPM`,
          `Average latency = ½ × revolution time   (min = 0, max = 1 revolution)`,
          `Transfer time = (bytes transferred / bytes per track) × revolution time`,
          `              = revolution time / sectors per track   (for one sector)`
        ], pts: [
          `<b>Seek time</b>: time to move the arm to the correct cylinder. The <b>largest</b> cost. Typical: 5 ms track-to-track, 50 ms max, 30 ms average.`,
          `<b>Rotational delay (latency)</b>: time for the disk to rotate the sector under the head. At 5000 rpm one revolution is 12 ms. Typically 6–8 ms average.`,
          `<b>Transfer time</b>: time for the head to pass over the data. With 63 sectors per track, one sector takes 1/63 of a revolution.`
        ]},
        { h: `Examples 1 and 2`, pts: [
          `<b>Ex 1</b>: seek 8 ms, avg latency 3 ms, 10,000 rpm, 170 sectors/track. Transfer = (60,000/10,000)/170 = 6/170 ≈ <b>0.035 ms</b>. Total = 8 + 3 + 0.035 = <b>11.035 ms</b>.`,
          `<b>Ex 2</b> (Seagate ST3200822A: 200 GB, 7200 rpm, avg seek 8.5 ms, avg latency 4.16 ms, 170 sectors/track). Transfer = (60,000/7200)/170 = 8.33/170 ≈ <b>0.05 ms</b>. Total = 8.5 + 4.16 + 0.05 = <b>12.71 ms</b>.`
        ]},
        { h: `Disk as a bottleneck`, pts: [
          `Processes are often <b>disk-bound</b>: the network and CPU wait a long time for the disk. Techniques:`,
          `<b>1. Multiprocessing</b>: the CPU works on other jobs while waiting for the disk.`,
          `<b>2. Disk striping</b>: put different blocks of the file on different drives, so independent processes do not interfere (parallelism).`,
          `<b>3. RAID</b>: Redundant Array of Independent Disks.`,
          `<b>4. RAM disk</b> (memory disk): part of main memory simulates a disk (speed vs volatility).`,
          `<b>5. Disk cache</b>: a large block of memory holds pages from the disk. The cache is checked first, and on a miss the disk is accessed.`
        ]},
        { h: `Quiz (2), solved`, pts: [
          `Given: 20 surfaces, 800 tracks/surface, 25 sectors/track, 512 B/sector, 3600 rpm, seek 7 ms track-to-track, 28 ms average, 50 ms max.`,
          `Revolution = 60,000/3600 = 16.67 ms, so <b>average latency = 8.33 ms</b>.`,
          `<b>Disk capacity</b> = 20 × 800 × 25 × 512 = <b>204,800,000 B ≈ 195.3 MB</b>.`,
          `<b>Read the whole disk, one cylinder at a time</b> (800 cylinders × 20 tracks). Assume each track costs average latency + one full revolution = 8.33 + 16.67 = 25 ms, so one cylinder = 20 × 25 = 500 ms. Moves: one average seek (28 ms) to reach the first cylinder, then 799 track-to-track seeks (7 ms).<br>Total ≈ 28 + 799×7 + 800×500 = 28 + 5,593 + 400,000 = <b>405,621 ms ≈ 405.6 s</b>. State your assumptions in the exam.`
        ]}
      ],
      cards: [
        [`DASD examples`, `Magnetic disks (hard, floppy) and optical disks (CD-ROM, CD-R, CD-RW, DVD).`],
        [`SASD example`, `Magnetic tape.`],
        [`Sector`, `The smallest addressable portion of a disk, usually 512 bytes.`],
        [`Cluster`, `A fixed number of contiguous sectors (the OS file manager's view).`],
        [`Cylinder`, `Tracks directly above/below each other; readable without moving the arm.`],
        [`Number of cylinders =`, `Number of tracks per surface.`],
        [`Seeking`, `Moving the arm; usually the slowest part of a disk access.`],
        [`What carries, guides and moves the R/W heads?`, `The arms.`],
        [`Spindle`, `Holds the platters in a fixed position and rotates them.`],
        [`Blocking factor`, `Number of records stored in each block.`],
        [`Sub-blocks`, `Count (bytes in block), Key (optional, last record's key), Data.`],
        [`Fragmentation`, `Loss of space within a sector because records do not fit exactly.`],
        [`Average latency formula`, `½ × (60 × 1000 / RPM) ms.`],
        [`Transfer time (one sector)`, `Revolution time / sectors per track.`],
        [`Access time`, `Seek + rotational delay + transfer.`],
        [`5 fixes for the disk bottleneck`, `Multiprocessing, disk striping, RAID, RAM disk, disk cache.`]
      ],
      qa: [
        [`Mention the differences between seek time, rotational delay and transfer time.`, `Seek time: time to move the read/write arm to the correct cylinder (the largest cost). Rotational delay (latency): time for the disk to rotate so the desired sector is under the head (average = half a revolution). Transfer time: once the head is over the data, the time to transfer it (revolution time / sectors per track per sector).`],
        [`"Network and CPU have to wait a long time for the disk." Give four techniques to solve this.`, `Multiprocessing (CPU does other jobs while waiting); disk striping (blocks on different drives in parallel); RAID; RAM disk (memory simulates a disk); disk cache (memory holds disk pages, and a miss goes to disk).`],
        [`Compare organizing tracks by sectors and by blocks.`, `Sectors: used by the OS; fixed 512 B units; causes fragmentation and slow access for record files. Blocks: used by the DBMS; user-defined size holding an integral number of records (blocking factor); no internal fragmentation, no record spans two blocks; sub-blocks add more non-data overhead.`],
        [`A disk rotates at 6000 rpm. Find the average latency.`, `Revolution = 60,000/6000 = 10 ms, so average latency = 5 ms.`],
        [`Sector = 512 B, cluster = 3 sectors. Cluster size?`, `3 × 512 = 1536 bytes.`],
        [`A platter has 1000 tracks with 33 sectors each. Track capacity?`, `33 × 512 = 16,896 bytes (the number of tracks does not matter for track capacity).`]
      ],
      quiz: [
        { q: `___ are used to carry, guide and move the read/write head.`, o: [
          [`Arms`, `Correct. Moving the arms is called seeking.`],
          [`Arm assembly`, `The arm assembly is the whole internal set that contains the arms.`],
          [`Platters`, `Platters store the data.`],
          [`Spindle`, `The spindle rotates the platters.`]
        ], a: 0, src: `Midterm Model A` },
        { q: `___ is the time needed to move the read/write arm to the correct sector (cylinder).`, o: [
          [`Transfer time`, `Transfer happens after positioning.`],
          [`Latency`, `Latency is waiting for rotation.`],
          [`Rotational time`, `Rotation is not arm movement.`],
          [`Seek time`, `Correct.`]
        ], a: 3, src: `Midterm Model A` },
        { q: `All the information on a single cylinder can be accessed without:`, o: [
          [`Moving the spindle`, `The spindle keeps rotating in any case.`],
          [`Moving the arm assembly`, `Correct. A cylinder is all tracks under the heads at one arm position.`],
          [`Rotation`, `Rotation is still needed to bring sectors under the head.`],
          [`Seeking`, `Seeking means moving the arm, which is the same idea, but the model answer is (b).`]
        ], a: 1, src: `Midterm Model B` },
        { q: `Sector size = 512 B, 4 sectors per cluster, 64 sectors per track. Cluster size =`, o: [
          [`32,768 bytes`, `That is 64 × 512, the TRACK size.`],
          [`2048 bytes`, `Correct. 4 × 512 = 2048. Sectors per track is a distractor.`],
          [`128 bytes`, `512/4 is the wrong operation.`],
          [`8 bytes`, `Meaningless.`]
        ], a: 1, src: `Midterm Model A` },
        { q: `Average latency for a disk spinning at 5000 rpm is:`, o: [
          [`12 ms`, `That is one FULL revolution.`],
          [`6 ms`, `Correct. ½ × 60,000/5000 = 6 ms.`],
          [`3 ms`, `A quarter revolution.`],
          [`0.012 ms`, `A unit error.`]
        ], a: 1, src: `Midterm Model A` },
        { q: `Track = 20,000 B, overhead = 300 B/block, record = 100 B, blocking factor = 60. Records per track?`, o: [
          [`200`, `Ignores the overhead: 20,000/100.`],
          [`180`, `Correct. Block = 6300 B, ⌊20,000/6300⌋ = 3 blocks × 60 = 180.`],
          [`190`, `Partial blocks are not allowed.`],
          [`150`, `That is the answer for blocking factor 10.`]
        ], a: 1 },
        { q: `Which unit is the smallest addressable portion of a disk?`, o: [
          [`Track`, `Tracks are made of sectors.`],
          [`Cluster`, `A cluster groups several sectors.`],
          [`Sector`, `Correct.`],
          [`Cylinder`, `A cylinder groups tracks.`]
        ], a: 2 },
        { q: `Which is a Serial Access Storage Device?`, o: [
          [`Hard disk`, `DASD.`], [`CD-ROM`, `DASD (optical).`], [`Magnetic tape`, `Correct.`], [`DVD`, `DASD (optical).`]
        ], a: 2 },
        { q: `The key sub-block contains:`, o: [
          [`The number of bytes in the block`, `That is the count sub-block.`],
          [`The key of the last record in the data sub-block`, `Correct. It lets the controller search without loading the block into memory.`],
          [`All the records`, `That is the data sub-block.`],
          [`The sector address`, `That is sector overhead.`]
        ], a: 1 },
        { q: `A disk has cylinder height 14. How many platters does it have?`, o: [
          [`14`, `14 is the number of surfaces (sides).`], [`7`, `Correct. 14 / 2.`], [`28`, `Double counting.`], [`5000`, `That is the number of cylinders in the slide example.`]
        ], a: 1 },
        { q: `Which technique puts different blocks of a file on different drives?`, o: [
          [`RAM disk`, `Memory simulating a disk.`], [`Disk cache`, `Memory holding disk pages.`], [`Disk striping`, `Correct.`], [`Multiprocessing`, `CPU works on other jobs.`]
        ], a: 2 },
        { q: `7200 rpm, 170 sectors/track. Transfer time for one sector ≈`, o: [
          [`8.33 ms`, `That is one revolution.`], [`4.16 ms`, `That is the average latency.`], [`0.05 ms`, `Correct. 8.33 / 170 ≈ 0.049 ms.`], [`170 ms`, `Nonsense.`]
        ], a: 2 }
      ]
    },
    /* ───────────────────────── LECTURE 3 ───────────────────────── */
    {
      n: 3, title: `Logical File Organization: Fields and Records`,
      notes: [
        { h: `File input and output`, pts: [
          `<b>Text file</b>: a sequence of characters (e.g. C source code), viewable in a text editor.`,
          `<b>Binary file</b>: a sequence of bytes (e.g. movie, music), which needs a specialized program.`,
          `Files can be <b>input</b> files (the program reads) or <b>output</b> files (the program writes).`
        ]},
        { h: `File of records`, pts: [
          `The logical view: data is a collection of <b>records</b>.`,
          `<b>Record</b>: a group of fields forming a logical unit.`,
          `<b>Field</b>: a data value, the smallest unit of data with logical meaning. Fields have names, types, lengths and values.`,
          `Three file structures: <b>stream</b>, <b>field</b> and <b>record</b> structures.`
        ]},
        { h: `1. Stream files`, pts: [
          `Information is written as a stream of bytes containing <b>no added information</b>.`,
          `Example: <code>AmesMary123 MapleStillwaterOK74075MasonAlan90 EastgateAdaOK74820</code>.`,
          `Problem: there is <b>no way to get the information back</b> in the organized record format.`
        ]},
        { h: `2. Field structures (4 ways)`, pts: [
          `<b>Fixed length</b>: e.g. lengths 5, 7, 25 → <code>87358CARROLLALICE IN WONDERLAND</code>, <code>03818FOLK&nbsp;&nbsp;&nbsp;FILE STRUCTURES</code>.`,
          `<b>Length indicator</b> at the start of each field → <code>058735907CARROLL19ALICE IN WONDERLAND</code>.`,
          `<b>keyword = value</b> → <code>ISBN=87359 AU=CARROLL TI=ALICE IN WONDERLAND</code>.`,
          `<b>Delimiter</b> at the end of each field → <code>87359|CARROLL|ALICE IN WONDERLAND|</code>.`
        ]},
        { h: `Field structures: advantages and disadvantages`, table: [
          [`Type`, `Advantage`, `Disadvantage`],
          [`Fixed`, `Easy to read/store`, `Wastes space with padding`],
          [`Length indicator`, `Easy to jump ahead to the end of the field`, `Long fields need more than 1 byte to store the length (max size > 256)`],
          [`Delimited`, `May waste less space than length-based`, `Must check every byte of the field against the delimiter`],
          [`Keyword`, `Fields are self-describing; allows missing fields`, `Wastes space with keywords`]
        ]},
        { h: `3. Record structures`, pts: [
          `A record is a set of fields that belong together at a higher level of organization. It is a conceptual tool and an important logical notion in the file's structure.`,
          `Methods: (1) <b>fixed-length records with fixed-length fields</b>; (2) <b>fixed-length records with variable-length fields</b> (delimited fields or fields with length indicators, padded to a fixed record size); (3) <b>each record begins with a length indicator</b> (byte count), e.g. <code>3387359|CARROLL|ALICE IN WONDERLAND</code>.`
        ]},
        { h: `Record structures: advantages and disadvantages`, table: [
          [`Type`, `Advantage`, `Disadvantage`],
          [`Fixed-length record`, `Easy to jump to the i-th record`, `Wastes space with padding`],
          [`Variable-length record`, `Saves space when record sizes are diverse`, `Cannot jump to the i-th record unless through an index file`]
        ]},
        { h: `Managing files of records`, pts: [
          `<b>Primary key</b>: uniquely identifies a record and does not change. <b>Secondary key</b>: used for searching but does not typically identify a record uniquely.`,
          `<b>Sequential search</b>: read records in order until a match. <b>O(n)</b>. Appropriate for pattern matching or files with few records.`,
          `<b>Direct access</b>: seek directly to the start of the record. <b>O(1)</b>. Possible when we know the <b>RRN</b> (Relative Record Number: the first record has RRN 0, the next RRN 1…).`
        ]},
        { h: `Seeking`, pts: [
          `Generic: <code>Seek(Source_File, Offset)</code>; e.g. <code>Seek(infile, 3030)</code> moves to byte 3030.`,
          `C: <code>int fseek(FILE *stream, long offset, int origin)</code>, where origin <b>0</b> = beginning, <b>1</b> = current, <b>2</b> = end.<br><code>fseek(infile,0L,0)</code> → start; <code>fseek(infile,0L,2)</code> → end; <code>fseek(infile,-10L,1)</code> → back 10 bytes.`,
          `C++: an fstream has two pointers. <code>seekg</code> moves the <b>get</b> (read) pointer and <code>seekp</code> moves the <b>put</b> (write) pointer. Origins: <code>ios::beg</code>, <code>ios::cur</code>, <code>ios::end</code>.<br><code>infile.seekg(0, ios::beg); infile.seekg(0, ios::end); infile.seekg(-10, ios::cur);</code>`
        ]},
        { h: `Quiz (3) Q1: copy a file with no loops`, code: `#include <fstream>
using namespace std;
int main() {
    ifstream infile("d:\\\\IFile.txt", ios::binary);
    ofstream outfile("d:\\\\OFile.txt", ios::binary);
    infile.seekg(0, infile.end);      // jump to end
    long size = infile.tellg();       // position = file size
    infile.seekg(0);                  // back to start
    char* buffer = new char[size];
    infile.read(buffer, size);        // read everything at once
    outfile.write(buffer, size);      // write everything at once
    delete[] buffer;
    outfile.close(); infile.close();
    return 0;
}`, pts: [`The trick: <code>seekg</code> to the end and <code>tellg</code> gives the size, then one <code>read</code> and one <code>write</code> of that size.`]},
        { h: `Quiz (3) Q2: update a record by RRN`, code: `struct Item { char desc[31]; int qty; float price; };

void UpdateRecord(fstream &file, Item &newItem, int RRN) {
    file.seekp(RRN * sizeof(newItem), ios::beg); // byte offset = RRN × record size
    file.write((char*)&newItem, sizeof(newItem)); // overwrite the old record
}`, pts: [`Fixed-length fields and records mean every record has the same size, so the byte offset is exactly <b>RRN × record size</b>.`]}
      ],
      cards: [
        [`Text vs binary file`, `Text: sequence of characters (editable). Binary: sequence of bytes (needs a special program).`],
        [`Field`, `The smallest unit of data with logical meaning.`],
        [`Record`, `A group of fields forming a logical unit.`],
        [`Stream file problem`, `No added info, so records can't be recovered in organized form.`],
        [`4 field structures`, `Fixed length, length indicator, keyword=value, delimiter.`],
        [`Fixed field: +/−`, `+ easy to read/store; − wastes space with padding.`],
        [`Delimited field: +/−`, `+ may waste less space; − must check every byte against the delimiter.`],
        [`Keyword field: +/−`, `+ self-describing, allows missing fields; − wastes space with keywords.`],
        [`Length-indicator field: +/−`, `+ easy to jump to field end; − long fields need >1 byte for the length.`],
        [`Fixed vs variable-length record`, `Fixed: easy to jump to the i-th record but wastes padding. Variable: saves space but needs an index to jump.`],
        [`RRN`, `Relative Record Number; the first record = 0. Offset = RRN × record size.`],
        [`fseek origins`, `0 = beginning, 1 = current, 2 = end.`],
        [`seekg vs seekp`, `seekg moves the get (read) pointer; seekp moves the put (write) pointer.`],
        [`Sequential vs direct access`, `Sequential O(n); direct O(1).`]
      ],
      qa: [
        [`"There are many ways of adding structure to files to maintain the identity of fields." Mention them with advantages and disadvantages.`, `Fixed length (+ easy to read/store, − padding waste); length indicator (+ easy to jump to the end of the field, − long fields need more than 1 byte for the length); delimited (+ may waste less space, − must check every byte for the delimiter); keyword=value (+ self-describing and allows missing fields, − keywords waste space).`],
        [`Consider a fixed-length field, fixed-length record file. Write UpdateRecord given the RRN.`, `void UpdateRecord(fstream &file, Item &newItem, int RRN){ file.seekp(RRN*sizeof(newItem), ios::beg); file.write((char*)&newItem, sizeof(newItem)); }`],
        [`When is sequential search useful?`, `For pattern matching or files with few records. Otherwise it is O(n), so direct access (O(1) with the RRN) is preferred.`],
        [`Differentiate between primary and secondary keys.`, `A primary key uniquely identifies a record and does not change. A secondary key is used to search but does not typically identify a record uniquely.`]
      ],
      quiz: [
        { q: `In a stream file structure, information is written as a stream of bytes containing:`, o: [
          [`No added information`, `Correct. That is why records can't be recovered.`],
          [`No space`, `Spaces may exist inside data; that is not the definition.`],
          [`Added information`, `Added information (delimiters, lengths) is what field structures add.`],
          [`Space`, `Not the definition.`]
        ], a: 0, src: `Midterm Model C` },
        { q: `Which field structure is "self-describing and allows missing fields"?`, o: [
          [`Fixed length`, `Position defines the field; missing fields leave padding.`],
          [`Length indicator`, `Not self-describing.`],
          [`Delimited`, `Not self-describing.`],
          [`Keyword = value`, `Correct. Each field names itself (ISBN=…, AU=…).`]
        ], a: 3 },
        { q: `The main disadvantage of delimited fields is:`, o: [
          [`Waste space with padding`, `That is fixed-length fields.`],
          [`Have to check every byte of the field against the delimiter`, `Correct.`],
          [`Waste space with keywords`, `That is keyword fields.`],
          [`Long fields need more than 1 byte for length`, `That is length-indicator fields.`]
        ], a: 1 },
        { q: `A disadvantage of variable-length records is:`, o: [
          [`Wasted space with padding`, `That is fixed-length records.`],
          [`You cannot jump to the i-th record unless through an index file`, `Correct.`],
          [`They cannot store text`, `False.`],
          [`They require fixed-length fields`, `False.`]
        ], a: 1 },
        { q: `Direct access has the complexity:`, o: [
          [`O(n)`, `That is sequential access.`], [`O(1)`, `Correct.`], [`Log(n)`, `That is binary search.`], [`All answers correct`, `Only O(1) is right.`]
        ], a: 1, src: `Midterm Model B` },
        { q: `Sequential access has the complexity:`, o: [
          [`O(n)`, `Correct. You may read n records to find one.`], [`O(1)`, `That is direct access.`], [`Log(n)`, `That is binary search on a sorted file.`], [`All answers correct`, `Only O(n).`]
        ], a: 0, src: `Midterm Model A` },
        { q: `A binary search has the complexity:`, o: [
          [`O(n)`, `Linear search.`], [`O(1)`, `Direct access.`], [`O(log₂ n)`, `Correct. It halves the range every step.`], [`O(n²)`, `Too slow.`]
        ], a: 2, src: `Midterm Model C` },
        { q: `fseek(infile, -10L, 1) does what?`, o: [
          [`Moves to byte 10 from the beginning`, `Origin 1 is CURRENT, and the offset is negative.`],
          [`Moves back 10 bytes from the current position`, `Correct.`],
          [`Moves 10 bytes before the end`, `That would be origin 2.`],
          [`Closes the file`, `No.`]
        ], a: 1 },
        { q: `In C++, which function moves the PUT (write) pointer?`, o: [
          [`seekg`, `seekg moves the get (read) pointer.`], [`seekp`, `Correct.`], [`tellg`, `tellg reports the get position.`], [`fseek`, `The C function.`]
        ], a: 1 },
        { q: `Fixed-length records of 40 bytes. Byte offset of the record with RRN 5?`, o: [
          [`5`, `That is the RRN, not the offset.`], [`200`, `Correct. 5 × 40 (RRNs start at 0).`], [`240`, `That treats RRN as 1-based.`], [`45`, `Adds instead of multiplying.`]
        ], a: 1 }
      ]
    },
    /* ───────────────────────── LECTURE 4 ───────────────────────── */
    {
      n: 4, title: `Ordered and Unordered (Heap / Sequential) Files`,
      notes: [
        { h: `Basic file organizations`, pts: [
          `A file organization method defines the <b>record placement strategy</b> and the relationship between a record's <b>key value</b> and its <b>relative address</b>.`,
          `Goal: efficient <b>retrieve</b> (logical neighbour, records matching a condition, a random record) and <b>update</b> (insert, delete, modify).`,
          `Efficiency is measured by the <b>number of disk accesses</b>: fewer is better.`,
          `Access strategies: <b>sequential search</b> is slow and O(n); <b>direct access</b> gets the record in one read, O(1).`,
          `Methods: <b>unordered (heap) file</b>, <b>ordered (sequential) file</b>, <b>indexing</b>, <b>hashing</b>.`
        ]},
        { h: `Unordered file / heap file`, pts: [
          `An <b>unordered</b> set of records stored in <b>order of entry</b>, regardless of key. Also called an unordered sequential file or <b>pile</b> file.`,
          `Supports create/destroy, open/close, insert/delete. Records are identified by a <b>record id (rid)</b>.`,
          `<b>Retrieve</b>: only <b>linear search</b>.`,
          `<b>Insert at the end</b>: simple and efficient, with one access to read the last page and one to write it back. Serious disadvantage: it <b>allows duplicate records</b> (e.g. inserting 4, Ali, CS at offset 80).`,
          `<b>Delete</b>: find the record, delete it <b>physically or logically</b>, and write it back.`
        ]},
        { h: `Example heap file (20-byte records)`, table: [
          [`Offset`, `St-no`, `St-name`, `St-Dept`],
          [`0`, `5`, `Ahmed`, `CS`],
          [`20`, `2`, `Adam`, `ITB`],
          [`40`, `1`, `Mona`, `ITD`],
          [`60`, `3`, `Ali`, `NW`],
          [`80`, `4`, `Ali`, `CS  ← appended`]
        ]},
        { h: `The cost model`, pts: [
          `<b>B</b> = number of data pages (page = block), <b>R</b> = records per page, <b>D</b> = average time to read/write a disk page, <b>C</b> = average time to process a record.`,
          `Operations: <b>Scan</b> (fetch all records), <b>equality search</b> ("sid = 23"), <b>range search</b> ("name after Smith"), <b>Insert</b>, <b>Delete</b> (by rid).`
        ]},
        { h: `Heap file costs`, pts: [
          `<b>Scan</b>: B(D + RC). Read B pages, and process R records on each.`,
          `<b>Equality search</b>: 0.5B(D + RC). On average half the file is scanned. If nothing matches, the entire file is scanned.`,
          `<b>Range search</b>: B(D + RC). Matches may be anywhere, so scan the whole file.`,
          `<b>Insert</b>: <b>2D + C</b>. Fetch the last page, add the record, write it back.`,
          `<b>Delete</b>: search cost + C + D.`
        ]},
        { h: `Ordered file / sequential file`, pts: [
          `An <b>ordered</b> set of records stored in order of the <b>key value</b>. Records are accessed sequentially from beginning to end.`,
          `Insert: the new record goes into an exactly determined position, so <b>all records with a greater key move one location towards the end</b>. Delete and update need the opposite procedure.`,
          `Example: inserting (4, Ali, CS) into 1, 2, 3, 5 places it at offset 60 and shifts Ahmed (5) to 80.`
        ]},
        { h: `Sorted file costs`, pts: [
          `<b>Scan</b>: B(D + RC).`,
          `<b>Equality search</b>: <b>D·log₂B + C·log₂R</b>. Binary search over the pages, then binary search inside the page.`,
          `<b>Range search</b>: search cost + cost of retrieving the matching records.`,
          `<b>Insert</b>: search cost + 2 × (0.5B(D + RC)) = search + B(D + RC). Read and rewrite half the file on average.`,
          `<b>Delete</b>: same as insert: search + B(D + RC).`
        ]},
        { h: `Cost comparison table`, table: [
          [`Operation`, `Heap file`, `Sorted file`, `Hashed file`],
          [`Scan`, `B(D+RC)`, `B(D+RC)`, `1.25B(D+RC)`],
          [`Equality search`, `0.5B(D+RC)`, `D·log₂B + C·log₂R`, `H + D + 0.5RC`],
          [`Range search`, `B(D+RC)`, `search + retrieve matches`, `1.25B(D+RC)`],
          [`Insert`, `2D + C`, `search + 2·(0.5B(D+RC))`, `search + C + D`],
          [`Delete`, `search + C + D`, `search + 2·(0.5B(D+RC))`, `search + C + D`]
        ]},
        { h: `Reading the exam choices`, pts: [
          `Exams expand "search +" into formulas. Sorted-file delete = <b>Dlog₂B + Clog₂R + B(D+RC)</b>. Hashed-file delete = <b>1.25B(D+RC) + C + D</b> in the model answer (it uses the hashed scan cost as its "search" term).`,
          `Hashed scan is <b>1.25B(D+RC)</b> because hash buckets are typically kept about 80% full, so there are 1.25× as many pages.`
        ]}
      ],
      cards: [
        [`File organization method defines…`, `Record placement strategy + relationship between key value and relative address.`],
        [`Efficiency is measured by…`, `The number of disk accesses (fewer is better).`],
        [`Heap file`, `Unordered records in order of entry; aka pile file.`],
        [`Heap: search method`, `Linear search only.`],
        [`Heap: main disadvantage`, `Allows duplicate records.`],
        [`B, R, D, C`, `Pages, records/page, time per page R/W, time per record processing.`],
        [`Heap scan`, `B(D + RC)`],
        [`Heap equality search`, `0.5B(D + RC)`],
        [`Heap insert`, `2D + C`],
        [`Sorted equality search`, `D·log₂B + C·log₂R`],
        [`Sorted insert/delete`, `search + 2·(0.5B(D + RC)) = search + B(D + RC)`],
        [`Hashed scan`, `1.25B(D + RC)`],
        [`Hashed equality search`, `H + D + 0.5RC`],
        [`Sorted file insert problem`, `All records with a greater key must shift one place toward the end.`]
      ],
      qa: [
        [`Why is inserting into a heap file cheap and what is the drawback?`, `The record is appended to the last page: read the last page (D), add the record (C) and write it back (D), so 2D + C. The drawback is that it allows duplicate records.`],
        [`Why is the sorted-file insert cost search + B(D+RC)?`, `After finding the position, all later records shift by one. On average half the file (0.5B pages) must be read and written back, so 2 × 0.5B(D+RC).`],
        [`Explain the heap equality-search cost 0.5B(D+RC).`, `On average the record is found after scanning half the pages. Each page costs D to read plus RC to check its R records. If no record matches, the whole file B(D+RC) is scanned.`],
        [`B = 100 pages, R = 50, D = 15 ms, C = 0.1 ms. Heap scan cost?`, `B(D+RC) = 100 × (15 + 50×0.1) = 100 × 20 = 2000 ms.`]
      ],
      quiz: [
        { q: `The average cost for the INSERT process of the heap file is:`, o: [
          [`Dlog₂B + Clog₂R + B(D + RC)`, `That is the sorted-file insert/delete.`],
          [`Dlog₂B + Clog₂R + 2D + C`, `A mix; not a formula from the table.`],
          [`1.25B(D + RC)`, `That is the hashed scan.`],
          [`2D + C`, `Correct. Read the last page, add the record, write it back.`]
        ], a: 3, src: `Midterm Model A` },
        { q: `The average cost for the SCAN process of the hashed file is:`, o: [
          [`Dlog₂B + Clog₂R + B(D + RC)`, `Sorted insert/delete.`],
          [`Dlog₂B + Clog₂R + 2D + C`, `Not a table formula.`],
          [`1.25B(D + RC)`, `Correct. Buckets are ~80% full, so 1.25× the pages.`],
          [`B(D + RC)`, `That is the heap/sorted scan.`]
        ], a: 2, src: `Midterm Models A & B` },
        { q: `The average cost for the DELETE process of the sorted file is:`, o: [
          [`2D + C`, `Heap insert.`],
          [`B(D + RC)`, `The scan cost only; the search part is missing.`],
          [`1.25B(D + RC)`, `Hashed scan.`],
          [`Dlog₂B + Clog₂R + B(D + RC)`, `Correct. Search (binary) + shift half the file (read and write).`]
        ], a: 3, src: `Midterm Model B` },
        { q: `The average cost for EQUALITY SEARCH in the heap file is:`, o: [
          [`2D + C`, `Heap insert.`],
          [`0.5B(D + RC)`, `Correct. Half the file on average.`],
          [`1.25B(D + RC) + C + D`, `Hashed delete in the model answer.`],
          [`Dlog₂B + Clog₂R`, `Sorted-file equality search.`]
        ], a: 1, src: `Midterm Model C` },
        { q: `The average cost for the SCAN process of the sorted file is:`, o: [
          [`Dlog₂B + Clog₂R`, `Sorted equality search.`],
          [`B(D + RC)`, `Correct. All B pages must be read.`],
          [`1.25B(D + RC)`, `Hashed scan.`],
          [`0.5B(D + RC)`, `Heap equality search.`]
        ], a: 1, src: `Midterm Model C` },
        { q: `The average cost for the DELETE process of the hash file is (model answer):`, o: [
          [`Dlog₂B + Clog₂R`, `Sorted search.`],
          [`B(D + RC)`, `Scan.`],
          [`1.25B(D + RC) + C + D`, `Correct per the model answer: search + C + D.`],
          [`0.5B(D + RC)`, `Heap equality search.`]
        ], a: 2, src: `Midterm Model C` },
        { q: `In a heap file, searching can be done using:`, o: [
          [`Binary search`, `Needs sorted records.`], [`Linear search only`, `Correct.`], [`Hashing`, `Needs a hashed file.`], [`B-tree index`, `Needs an index.`]
        ], a: 1 },
        { q: `Main disadvantage of inserting at the end of a heap file:`, o: [
          [`It is slow`, `It is actually 2D + C, which is fast.`],
          [`It allows duplicate records`, `Correct.`],
          [`It requires shifting records`, `That is the sorted file.`],
          [`It needs a hash function`, `No.`]
        ], a: 1 },
        { q: `Inserting into a sequential (sorted) file requires:`, o: [
          [`Appending at the end`, `That breaks the order.`],
          [`Moving all records with a greater key one location towards the end`, `Correct.`],
          [`Rebuilding the hash table`, `Not a hashed file.`],
          [`Nothing special`, `Order must be maintained.`]
        ], a: 1 },
        { q: `B = 200 pages, R = 10, D = 10 ms, C = 1 ms. Heap equality search cost?`, o: [
          [`4000 ms`, `That is the full scan B(D+RC).`],
          [`2000 ms`, `Correct. 0.5 × 200 × (10 + 10×1) = 2000 ms.`],
          [`21 ms`, `That is 2D + C.`],
          [`1000 ms`, `Arithmetic slip.`]
        ], a: 1 }
      ]
    },
    /* ───────────────────────── LECTURE 5 (summary) ───────────────────────── */
    {
      n: 5, title: `Hashing (from summary and exams)`,
      notes: [
        { h: `Why hashing?`, pts: [
          `Hashing is a useful searching technique for implementing indexes. Its main motivation is to <b>improve search time</b>.`,
          `Search time: simple indexes with binary search <b>O(log N)</b>; B-trees <b>O(log<sub>k</sub> N)</b>; hashing <b>O(1)</b>.`
        ]},
        { h: `What is hashing?`, pts: [
          `Discover the location of a key by simply examining the key. For that we design a <b>hash function</b>.`,
          `A hash function <b>h(k)</b> transforms a <b>key</b> into an <b>address</b>. The address space is chosen beforehand, e.g. 1000 available addresses, so h maps all possible keys U to {0, 1, …, 999}.`,
          `With hashing there is <b>no obvious connection between the key and the location</b>.`,
          `The address of each record is determined by a mathematical algorithm. This is <b>hashed</b> file organization.`,
          `A <b>bucket</b> is a unit of storage that can hold one or more records in a hash file.`
        ]},
        { h: `Collisions`, pts: [
          `Two different keys may be transformed into the <b>same address</b>. That is a <b>collision</b>.`,
          `Keys that collide are called <b>synonyms</b>.`
        ]},
        { h: `A simple hash function (Midterm Model A)`, code: `int Hash(char key[12], int maxAddress) {
    int sum = 0;
    for (int j = 0; j < 12; j = j + 2)
        sum = sum + key[j] * key[j + 1];  // fold pairs of characters
    sum = sum % 19937;                   // keep the sum bounded (prime)
    return sum % maxAddress;             // map into 0 .. maxAddress-1
}`, pts: [
          `Step 1: represent the key numerically, combining pairs of characters (ASCII codes).`,
          `Step 2: fold and add, dividing by a prime (19937) to prevent overflow.`,
          `Step 3: divide by the address-space size and use the remainder as the home address.`
        ]},
        { h: `Hashed file costs`, table: [
          [`Operation`, `Hashed file cost`],
          [`Scan`, `1.25B(D + RC)`],
          [`Equality search`, `H + D + 0.5RC  (H = time to compute the hash)`],
          [`Range search`, `1.25B(D + RC)  (hashing does not keep order, so scan everything)`],
          [`Insert`, `search + C + D`],
          [`Delete`, `search + C + D`]
        ]}
      ],
      cards: [
        [`Hash function h(k)`, `Transforms a key into an address.`],
        [`Collision`, `Two different keys hash to the same address.`],
        [`Synonyms`, `Keys that collide (same address).`],
        [`Bucket`, `A storage unit holding one or more records in a hash file.`],
        [`Search time: index / B-tree / hashing`, `O(log N) / O(log_k N) / O(1).`],
        [`Hashed equality search cost`, `H + D + 0.5RC`],
        [`Why hashed range search is slow`, `Hashing destroys key order, so the whole file (1.25B pages) is scanned.`],
        [`Hashed organization`, `The address of each record is determined by a mathematical algorithm.`]
      ],
      qa: [
        [`Write a C++ function to implement a simple hashing algorithm.`, `int Hash(char key[12], int maxAddress){ int sum=0; for(int j=0;j<12;j+=2) sum += key[j]*key[j+1]; sum %= 19937; return sum % maxAddress; }`],
        [`Define collision and synonyms.`, `A collision happens when two different keys produce the same address. The keys involved are called synonyms.`],
        [`Why is hashing faster than indexing?`, `A hash function computes the address directly from the key, so O(1). A simple index needs binary search O(log N) and a B-tree needs O(log_k N).`]
      ],
      quiz: [
        { q: `The address of each record of a file is determined by a mathematical algorithm known as:`, o: [
          [`Sequential`, `Sequential files place records by key order.`],
          [`Indexed`, `Indexes use a lookup structure.`],
          [`Hashed`, `Correct.`],
          [`None`, `Hashed is the answer.`]
        ], a: 2, src: `Midterm Model B` },
        { q: `A unit of storage that can store one or more records in a hash file organization is:`, o: [
          [`Buckets`, `Correct.`],
          [`Disk pages`, `A general storage term, not the hashing term.`],
          [`Blocks`, `A physical organization term.`],
          [`Nodes`, `Tree/list term.`]
        ], a: 0, src: `Midterm Model C` },
        { q: `When two different keys produce the same address, this is called:`, o: [
          [`Overflow`, `Related, but the event itself is a collision.`], [`A collision`, `Correct.`], [`A synonym`, `Synonyms are the KEYS involved.`], [`Fragmentation`, `A disk-space term.`]
        ], a: 1 },
        { q: `Search time with hashing is typically:`, o: [
          [`O(n)`, `Sequential search.`], [`O(log N)`, `A simple index with binary search.`], [`O(log_k N)`, `B-trees.`], [`O(1)`, `Correct.`]
        ], a: 3 },
        { q: `In the model hash function, why is sum % 19937 applied before % maxAddress?`, o: [
          [`To sort the keys`, `Hashing does not sort.`],
          [`To keep the sum bounded (a prime divisor) and avoid overflow`, `Correct.`],
          [`To find synonyms`, `Not its purpose.`],
          [`To encrypt the key`, `Hashing here is for addressing, not security.`]
        ], a: 1 },
        { q: `Hashed file equality-search cost is:`, o: [
          [`H + D + 0.5RC`, `Correct. Compute the hash (H), read one page (D), scan half the page on average.`],
          [`0.5B(D + RC)`, `Heap equality search.`],
          [`D·log₂B + C·log₂R`, `Sorted file.`],
          [`2D + C`, `Heap insert.`]
        ], a: 0 }
      ]
    }
  ],

  /* ══════════════════════════ EXAMS ══════════════════════════ */
  exams: [
    {
      title: `Midterm 2022/23 · Model A`,
      meta: `CS308 File Organization · 1 hour · 20 marks · Dr. M. AbdelFattah`,
      sections: [
        { title: `Q1-a · Choose the correct answer`, marks: `7 marks`, items: [
          { type: `mcq`, q: `……… are used to carry, guide and move the read/write head.`, o: [`Arms`, `Arm Assembly`, `Platters`, `Spindle`], a: 0, why: `Arms carry, guide and move the heads (moving them = seeking). The arm assembly is the whole set; platters store data; the spindle rotates.` },
          { type: `mcq`, q: `……… is the time needed to move the read/write arm to the correct sector.`, o: [`Transfer time`, `Latency`, `Rotational time`, `Seek time`], a: 3, why: `Seek = arm movement. Latency/rotation = waiting for the platter to spin. Transfer = reading the bytes.` },
          { type: `mcq`, q: `Sequential access has the complexity ………`, o: [`O(n)`, `O(1)`, `Log(n)`, `All answer correct`], a: 0, why: `You may read up to n records.` },
          { type: `mcq`, q: `If sector size = 512 B, sectors per cluster = 4 and sectors per track = 64, the cluster size = ………`, o: [`32768 byte`, `2048 byte`, `128 byte`, `8 byte`], a: 1, why: `Cluster = 4 × 512 = 2048 B. 32768 = 64 × 512 is the track size (a distractor).` },
          { type: `mcq`, q: `The average cost for the insert process of the heap file is ………`, o: [`Dlog2B + Clog2R + B(D + RC)`, `Dlog2B + Clog2R + 2D + C`, `1.25B(D + RC)`, `2D + C`], a: 3, why: `Read the last page (D), add the record (C), write it back (D).` },
          { type: `mcq`, q: `The average cost for the scan process of the hashed file is ………`, o: [`Dlog2B + Clog2R + B(D + RC)`, `Dlog2B + Clog2R + 2D + C`, `1.25B(D + RC)`, `B(D+RC)`], a: 2, why: `Hashed pages are ~80% full, so 1.25B pages to scan.` }
        ]},
        { title: `Q1-b`, marks: `2 marks`, items: [
          { type: `written`, q: `Write a C++ function to implement a simple hashing algorithm.`, ans: `<pre>int Hash(char key[12], int maxAddress)
{
    int sum = 0;
    for (int j = 0; j &lt; 12; j = j + 2)
        sum = sum + key[j] * key[j+1];
    sum = sum % 19937;
    return sum % maxAddress;
}</pre>`, why: `Fold pairs of characters, bound the sum with a prime modulus, then take mod of the address-space size to get the home address.` }
        ]},
        { title: `Q2`, marks: `11 marks`, items: [
          { type: `written`, q: `a) "There are many ways of adding structure to files to maintain the identity of fields." Mention these ways and show the advantages and disadvantages for each way. [2 marks]`, ans: `<table><tr><th>Type</th><th>Advantage</th><th>Disadvantage</th></tr><tr><td>Fixed</td><td>Easy to read/store</td><td>Wastes space with padding</td></tr><tr><td>With length indicator</td><td>Easy to jump ahead to the end of the field</td><td>Long fields need more than 1 byte to store the length (max size &gt; 256)</td></tr><tr><td>Delimited fields</td><td>May waste less space than length-based</td><td>Must check every byte of the field against the delimiter</td></tr><tr><td>Keyword</td><td>Fields are self-describing; allows missing fields</td><td>Wastes space with keywords</td></tr></table>`, why: `Lecture 3 table.` },
          { type: `written`, q: `b) Fixed-length records; 10,000 records; record = 128 B. Disk: 512 B/sector; 20 sectors/track; cylinder height = 12 tracks; 500 tracks/surface; non-data overhead = 500 B/block; spindle = 5000 rpm; average seek = 7 ms.<br>(i) Average latency.`, ans: `Average latency = time for ½ revolution = (0.5 × 1000 × 60) / 5000 = <b>6 ms</b>.`, why: `One revolution = 60,000/5000 = 12 ms, and half of that is 6 ms.` },
          { type: `written`, q: `(ii) Number of records/track if blocking factor is 20.`, ans: `Track capacity = 20 × 512 = 10,240 B<br>Block size = 128 × 20 + 500 = 3060 B<br>Blocks/track = ⌊10,240 / 3060⌋ = ⌊3.35⌋ = 3 blocks<br>Records/track = 3 × 20 = <b>60 records</b>`, why: `Always add the overhead to each block and take the floor, because a block cannot be split across tracks.` },
          { type: `written`, q: `(iii) Disk capacity.`, ans: `Disk capacity = track capacity × cylinder height × tracks/surface = 10,240 × 12 × 500 = <b>61,440,000 B ≈ 58.6 MB</b>.`, why: `Cylinder = 12 tracks and number of cylinders = 500. 61,440,000 / 1,048,576 ≈ 58.6 MB.` },
          { type: `written`, q: `(iv) Average access time to read three sectors.`, ans: `Revolution = 60,000/5000 = 12 ms<br>Transfer (3 sectors) = 3 × 12 / 20 = <b>1.8 ms</b><br>Average total = seek 7 + latency 6 + transfer 1.8 = <b>14.8 ms</b>`, why: `Each sector takes 1/20 of a revolution. The model answer writes this as [(3×60)/5000]/20, which is the same thing.` }
        ]}
      ]
    },
    {
      title: `Midterm 2022/23 · Model B`,
      meta: `CS308 File Organization · 1 hour · 20 marks · Dr. M. AbdelFattah`,
      sections: [
        { title: `Q1-a · Choose the correct answer`, marks: `6 marks`, items: [
          { type: `mcq`, q: `All the information on a single cylinder can be accessed without …………`, o: [`moving the Spindle`, `moving the arm assembly`, `Rotation`, `Seeking`], a: 1, why: `A cylinder is all tracks under the heads at one arm position, so no arm movement is needed. Rotation is still required.` },
          { type: `mcq`, q: `Direct access has the complexity ………`, o: [`O(n)`, `O(1)`, `Log(n)`, `All answer correct`], a: 1, why: `One seek to RRN × record size.` },
          { type: `mcq`, q: `File Organization methods must provide ………`, o: [`Fast Access Time and good space Utilization`, `Preparing/formatting storage media to store data`, `Allocating storage space and addressing`, `Managing free spaces`], a: 0, why: `The other three are File MANAGEMENT techniques.` },
          { type: `mcq`, q: `The address of each record of a file is determined by a mathematical algorithm known as ………`, o: [`Sequential`, `Indexed`, `Hashed`, `None`], a: 2, why: `h(k) computes the address.` },
          { type: `mcq`, q: `The average cost for the delete process of the sorted file is ………`, o: [`2D + C`, `B(D + RC)`, `1.25B(D + RC)`, `Dlog2B + Clog2R + B(D + RC)`], a: 3, why: `Binary search to find it (Dlog₂B + Clog₂R), then shift half the file: 2 × 0.5B(D+RC) = B(D+RC).` },
          { type: `mcq`, q: `The average cost for the scan process of the hashed file is ………`, o: [`Dlog2B + Clog2R + D + C`, `B(D + RC)`, `1.25B(D + RC)`, `1.25B(D+RC) + D + C`], a: 2, why: `1.25B(D+RC).` }
        ]},
        { title: `Q1-b`, marks: `3 marks`, items: [
          { type: `written`, q: `Write a C++ program, with no loops, to copy the contents of d:\\src.txt to d:\\dest.txt (destination is empty).`, ans: `<pre>#include &lt;iostream&gt;
#include &lt;fstream&gt;
using namespace std;
int main() {
    ifstream infile("d:\\\\src.txt", ios::binary);
    ofstream outfile("d:\\\\dest.txt", ios::binary);
    infile.seekg(0, infile.end);
    long size = infile.tellg();
    infile.seekg(0);
    char* buffer = new char[size];
    infile.read(buffer, size);
    outfile.write(buffer, size);
    delete[] buffer;
    outfile.close(); infile.close();
    return 0;
}</pre>`, why: `seekg to the end, tellg gives the size, then one read and one write replace the loop.` }
        ]},
        { title: `Q2`, marks: `11 marks`, items: [
          { type: `written`, q: `a) "Network and CPU have to wait a long time for the disk to transmit data." Give four techniques to solve this problem. [2 marks]`, ans: `1. <b>Multiprocessing</b>: the CPU works on other jobs while waiting for the disk.<br>2. <b>Disk striping</b>: different blocks of the file on different drives, so independent processes don't interfere (parallelism).<br>3. <b>RAID</b>: Redundant Array of Independent Disks.<br>4. <b>RAM disk</b>: part of main memory simulates a disk (speed vs volatility).<br>5. <b>Disk cache</b>: memory holds disk pages; check the cache first and go to disk on a miss.`, why: `Lecture 2, "Disk as a bottleneck". Any four earn the marks.` },
          { type: `written`, q: `b) Fixed-length records; 10,000 records; record = 128 B. Disk: 512 B/sector; 30 sectors/track; cylinder height = 10; 1000 tracks/surface; 4 sectors/cluster; 1000 rpm; average seek = 10 ms; average rotational delay = 5 ms.<br>(i) Cylinder size.`, ans: `Cylinder size = 30 × 512 × 10 = <b>153,600 B = 150 KB</b><br>Records per cylinder = 153,600 / 128 = 1200 records`, why: `Track = 15,360 B, and ×10 tracks per cylinder.` },
          { type: `written`, q: `(ii) Number of tracks to save the file.`, ans: `File = 10,000 × 128 = 1,280,000 B = 1250 KB<br>Track = 30 × 512 = 15,360 B = 15 KB<br>Tracks = 1250 / 15 = 83.3, so <b>84 tracks</b>`, why: `Round UP: a partial track still has to be allocated.` },
          { type: `written`, q: `(iii) Total disk size.`, ans: `Cylinder size × tracks/surface = 150 KB × 1000 = 150,000 KB ≈ <b>146.5 MB</b>`, why: `Number of cylinders = tracks per surface = 1000.` },
          { type: `written`, q: `(iv) Average time to read two sectors.`, ans: `Revolution = 60,000/1000 = 60 ms<br>Transfer (2 sectors) = 2 × 60 / 30 = <b>4 ms</b><br>Total = seek 10 + rotational delay 5 + transfer 4 = <b>19 ms</b>`, why: `The model answer computes "(2/1000)×60 = 120 ms" and divides by 30. That gives the same 4 ms, but the clearer way is one revolution (60 ms) × 2/30. The average rotational delay (5 ms) is given, so don't recompute it from the rpm.` }
        ]}
      ]
    },
    {
      title: `Midterm 2022/23 · Model C`,
      meta: `CS308 File Organization · 1 hour · 20 marks · Dr. M. AbdelFattah`,
      sections: [
        { title: `Q1-a · Choose the correct answer`, marks: `7 marks`, items: [
          { type: `mcq`, q: `In stream file structure the information is written as a stream of bytes containing …………`, o: [`no added information`, `no space`, `added information`, `space`], a: 0, why: `That is why records can't be recovered from a stream file.` },
          { type: `mcq`, q: `A binary search has the complexity ………`, o: [`O(n)`, `O(1)`, `O(log₂ n)`, `O(n²)`], a: 2, why: `It halves the search range each step.` },
          { type: `mcq`, q: `Files are managed by system software: ………`, o: [`OS`, `DBMS`, `MIS`, `Both a and b`], a: 3, why: `File managers are the OS and DBMS.` },
          { type: `mcq`, q: `A unit of storage that can store one or more records in a hash file organization is ………`, o: [`Buckets`, `Disk pages`, `Blocks`, `Nodes`], a: 0, why: `Hash files store records in buckets.` },
          { type: `mcq`, q: `The average cost for the search with equality selection of the heap file is ………`, o: [`2D + C`, `0.5B(D + RC)`, `1.25B(D + RC) + C + D`, `Dlog2B + Clog2R`], a: 1, why: `Half the file is scanned on average.` },
          { type: `mcq`, q: `The average cost for the delete process of the hash file is ………`, o: [`Dlog2B + Clog2R`, `B(D + RC)`, `1.25B(D + RC) + C + D`, `0.5B(D + RC)`], a: 2, why: `Model answer: search + C + D, with 1.25B(D+RC) used as the search term.` },
          { type: `mcq`, q: `The average cost for the scan process of the sorted file is ………`, o: [`Dlog2B + Clog2R`, `B(D + RC)`, `1.25B(D + RC)`, `0.5B(D + RC)`], a: 1, why: `All B pages must be read.` }
        ]},
        { title: `Q1-b`, marks: `3 marks`, items: [
          { type: `written`, q: `Consider a (fixed-length field, fixed-length record) file. Write the full body of UpdateRecord given the Relative Record Number (RRN).`, ans: `<pre>struct Item {
    char desc[31];
    int qty;
    float price;
};

void UpdateRecord(fstream &amp;file, Item &amp;newItem, int RRN)
{
    // newItem contains the new record to overwrite the old one
    file.seekp(RRN * sizeof(newItem), ios::beg);
    file.write((char *) &amp;newItem, sizeof(newItem));
}</pre>`, why: `Fixed sizes mean offset = RRN × record size. seekp positions the put pointer, and write overwrites the record.` }
        ]},
        { title: `Q2`, marks: `10 marks`, items: [
          { type: `written`, q: `a) Mention the main differences between: (i) Physical file and logical file; (ii) Seek time, rotational delay and transfer time. [4 marks]`, ans: `<b>(i)</b> Physical file: a collection of bytes on disk; has a physical name (A.txt); used once when opening. Logical file: a channel connecting the program to the physical file; its logical name is a program variable (infile, fp); used as many times as needed (open, read, write, append, close).<br><b>(ii)</b> Seek time: time to move the read/write arm to the correct cylinder. Rotational delay (latency): time for the disk to rotate the desired sector under the head. Transfer time: once positioned over the data, the time to transfer it.`, why: `Lecture 1 and Lecture 2 tables.` },
          { type: `written`, q: `b) Same disk as Model B (512 B/sector, 30 sectors/track, cylinder height 10, 1000 tracks/surface, 1000 rpm, seek 10 ms, rotational delay 5 ms; 10,000 records × 128 B).<br>(i) Number of records per cylinder.`, ans: `Cylinder size = 30 × 512 × 10 = 153,600 B<br>Records/cylinder = 153,600 / 128 = <b>1200 records</b>`, why: `The model answer shows only the cylinder size. Finish with the division by record size.` },
          { type: `written`, q: `(ii) Number of sectors to save the file.`, ans: `File = 10,000 × 128 = 1,280,000 B<br>Sectors = 1,280,000 / 512 = <b>2500 sectors</b>`, why: `The model answer mislabels this line as "tracks", but the value is sectors.` },
          { type: `written`, q: `(iii) Total disk size.`, ans: `150 KB × 1000 = 150,000 KB ≈ <b>146.5 MB</b>`, why: `Cylinder size × number of cylinders.` },
          { type: `written`, q: `(iv) Average time to read four sectors.`, ans: `Revolution = 60 ms<br>Transfer = 4 × 60 / 30 = <b>8 ms</b><br>Total = 10 + 5 + 8 = <b>23 ms</b>`, why: `Seek + given rotational delay + transfer.` }
        ]}
      ]
    }
  ]
};

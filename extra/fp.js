window.EXTRA = window.EXTRA || {};
EXTRA.fp = {
  /* ───────── Lecture 1: Intro to File Organization and File I/O ───────── */
  1: [
    { q: `<code>log.txt</code> already exists and holds 500 bytes. A program runs <code>fp = fopen("log.txt", "a");</code> and writes 20 bytes. What does the file contain afterwards?`, o: [
      [`The original 500 bytes followed by the new 20 bytes (520 bytes)`, `Correct. "a" opens an existing file (or creates a new one) for output and appends at the end.`],
      [`Only the new 20 bytes`, `That is what "w" does: it truncates the existing file before writing.`],
      [`The first 20 bytes are overwritten; the file stays 500 bytes`, `That would be "r+" with writing at the start. "a" never overwrites existing data.`],
      [`Nothing changes, because "a" opens the file for reading only`, `Reading only is "r". "a" is an output mode.`]
    ], a: 0 },
    { q: `Which C++ flag combination is equivalent to the C mode <code>"r+"</code>?`, o: [
      [`ios::in`, `That is plain "r" (input only).`],
      [`ios::out | ios::in`, `Correct. "r+" opens an existing file for input and output.`],
      [`ios::out | ios::in | ios::trunc`, `Adding trunc gives "w+", which destroys the existing contents.`],
      [`ios::out | ios::app`, `That is "a" (output only, appending).`]
    ], a: 1 },
    { q: `You must open an EXISTING binary file of employee records so you can both read records and overwrite some of them, without destroying the current contents. Which <code>fopen</code> mode fits?`, o: [
      [`"wb+"`, `w+ creates or truncates the file, so all existing records would be lost.`],
      [`"ab"`, `"a" is output only, and every write goes to the end, so you cannot read or overwrite records.`],
      [`"rb+"`, `Correct. r+ opens an existing file for input and output, and b makes it binary. The slide sample uses this mode.`],
      [`"rb"`, `"r" is input only, so you could not overwrite records.`]
    ], a: 2 },
    { q: `In the call <code>fread(&amp;blk, sizeof(blk), 5, fp);</code> what does the argument <code>5</code> mean?`, o: [
      [`The size of each element in bytes`, `The element size is the 2nd argument, sizeof(blk).`],
      [`The byte offset to start reading from`, `fread has no offset argument. Positioning is done with fseek.`],
      [`The logical file name`, `The logical file name is the 4th argument, fp.`],
      [`The number of elements to read`, `Correct. The arguments are: address of the variable, element size, number of elements, logical file name.`]
    ], a: 3 },
    { q: `In C++, the flag <code>ios::ate</code> moves the file pointer to the end of the file before EACH write operation.`, o: [
      [`True`, `That describes ios::app. ios::ate only positions you at the end once, when the file is opened.`],
      [`False`, `Correct. ios::ate = initially positioned at the end; ios::app = seek to the end before each write.`]
    ], a: 1 },
    { q: `Given <code>fstream outfile; outfile.open("myfile.txt", ios::out);</code>, which statement is correct?`, o: [
      [`<code>outfile</code> is the logical name and <code>"myfile.txt"</code> is the physical name`, `Correct. The logical file is the program variable (the channel); the physical file is the name on disk.`],
      [`<code>"myfile.txt"</code> is the logical name and <code>outfile</code> is the physical name`, `Reversed. The physical name is the name stored on disk.`],
      [`Both names are physical names`, `outfile is a program variable, so it is a logical name.`],
      [`<code>ios::out</code> is the logical name`, `ios::out is the opening mode, not a name.`]
    ], a: 0 },
    { q: `Which of the following is a PHYSICAL file organization method?`, o: [
      [`Heap`, `Heap is a logical organization method.`],
      [`Organizing tracks by sectors`, `Correct. Physical methods organize tracks by sectors or by blocks.`],
      [`Indexing`, `Indexing is a logical organization method.`],
      [`Hashing`, `Hashing is a logical organization method.`]
    ], a: 1 },
    { q: `A file holds exactly 3 employee records. This loop runs over it:<pre>while (!feof(fp)) {
    fread(&amp;emp, sizeof(emp), 1, fp);
    printf("%s %d\\n", emp.name, emp.sal);
}</pre>What problem can happen?`, o: [
      [`The first record is skipped`, `The first fread reads record 1 normally; nothing is skipped.`],
      [`The loop never ends`, `feof does become true once a read hits the end, so the loop ends.`],
      [`The last record may be printed twice`, `Correct. feof only becomes true AFTER a read fails, so one extra iteration prints the old contents of emp again. Checking fread(...) == 1 is safer.`],
      [`fread returns 1 at end of file`, `At end of file fread returns 0, not 1.`]
    ], a: 2 },
    { q: `When a program writes to a file, each byte is sent to the disk individually at the moment it is written.`, o: [
      [`True`, `The slides say bytes are not sent one by one.`],
      [`False`, `Correct. Bytes are collected in a buffer and sent as a block, which is why an abnormal termination before closing may lose data.`]
    ], a: 1 },
    { q: `In C++, which logical name is connected by default to the keyboard?`, o: [
      [`cout`, `cout is standard output (the screen).`],
      [`cerr`, `cerr is standard error (the screen).`],
      [`stdin`, `stdin is the C name for standard input, not the C++ one.`],
      [`cin`, `Correct. Standard input (keyboard) is stdin in C and cin in C++.`]
    ], a: 3 }
  ],

  /* ───────── Lecture 2: The Hard Disk ───────── */
  2: [
    { q: `A disk has 512 B/sector, 40 sectors/track, cylinder height 8 and 2000 tracks per surface. What is the drive capacity?`, o: [
      [`40,960,000 B`, `That is 2000 × 40 × 512, the capacity of ONE surface. You forgot to multiply by the 8 tracks per cylinder.`],
      [`327,680,000 B`, `Correct. Track = 40 × 512 = 20,480 B; cylinder = 8 × 20,480 = 163,840 B; 2000 cylinders × 163,840 = 327,680,000 B.`],
      [`163,840,000 B`, `This used 4 (the number of platters) instead of 8 surfaces. Cylinder height counts surfaces.`],
      [`163,840 B`, `That is the size of one cylinder, not the whole drive.`]
    ], a: 1 },
    { q: `A disk spins at 4000 rpm, has 50 sectors per track and an average seek time of 9 ms. What is the average time to read 5 consecutive sectors?`, o: [
      [`25.5 ms`, `This used a full revolution (15 ms) as the latency instead of half a revolution.`],
      [`16.8 ms`, `This transferred only one sector (0.3 ms) instead of five.`],
      [`18 ms`, `Correct. Revolution = 60,000/4000 = 15 ms; latency = 7.5 ms; transfer = 5 × 15/50 = 1.5 ms; total = 9 + 7.5 + 1.5 = 18 ms.`],
      [`10.5 ms`, `This left out the rotational delay (seek + transfer only).`]
    ], a: 2 },
    { q: `A track has 24 sectors of 512 B. Records are 150 B, the blocking factor is 16 and the non-data overhead is 400 B per block. How many records fit on one track?`, o: [
      [`81`, `That is 12,288/150, which ignores blocks and overhead.`],
      [`80`, `This ignored the 400 B overhead (block = 2400 B gives 5 blocks).`],
      [`70`, `This used 4.39 blocks. A partial block cannot be stored, so take the floor first.`],
      [`64`, `Correct. Track = 24 × 512 = 12,288 B; block = 16 × 150 + 400 = 2800 B; ⌊12,288/2800⌋ = 4 blocks; 4 × 16 = 64 records.`]
    ], a: 3 },
    { q: `A file has 30,000 fixed-length records of 128 B. The disk has 512 B/sector, 40 sectors/track and cylinder height 8. How many tracks are needed to store the file?`, o: [
      [`188`, `Correct. File = 30,000 × 128 = 3,840,000 B; track = 40 × 512 = 20,480 B; 3,840,000/20,480 = 187.5, rounded UP to 188.`],
      [`187`, `Rounded down. A partial track must still be allocated, so round up.`],
      [`7500`, `That is the number of SECTORS (3,840,000/512).`],
      [`24`, `That is the number of CYLINDERS (3,840,000/163,840 = 23.4, rounded up).`]
    ], a: 0 },
    { q: `When the OS reads a single byte from a disk, what does it actually read into the buffer?`, o: [
      [`Only that byte`, `The sector is the smallest addressable unit, so a single byte cannot be read alone.`],
      [`The entire sector that contains the byte`, `Correct. The OS finds the platter, track and sector, reads the entire sector into a buffer, then finds the byte.`],
      [`The entire track`, `A track is larger than the smallest addressable unit; the slides say a sector is read.`],
      [`The entire cylinder`, `A cylinder is a group of tracks; it is not the read unit.`]
    ], a: 1 },
    { q: `Which technique for the disk bottleneck uses part of main memory to simulate a disk, trading volatility for speed?`, o: [
      [`Disk striping`, `Striping puts blocks of a file on different drives.`],
      [`Disk cache`, `A disk cache holds pages copied from the disk; it does not act as a disk itself.`],
      [`RAM disk`, `Correct. A RAM disk (memory disk) simulates a disk in main memory: fast, but volatile.`],
      [`Multiprocessing`, `Multiprocessing lets the CPU do other jobs while waiting for the disk.`]
    ], a: 2 },
    { q: `Organizing tracks by blocks has LESS non-data overhead than organizing them by sectors.`, o: [
      [`True`, `Blocks add sub-blocks (count, key) and inter-block gaps, which increases overhead.`],
      [`False`, `Correct. The slides say block organization has MORE non-data overhead than sector addressing.`]
    ], a: 1 },
    { q: `Tracks are organized by 512-byte sectors, and each 300-byte record is stored in its own sector. The unused 212 bytes in each sector are an example of:`, o: [
      [`Seeking`, `Seeking is moving the arm.`],
      [`Blocking factor`, `The blocking factor is the number of records per block, used in block organization.`],
      [`Disk striping`, `Striping spreads a file over several drives.`],
      [`Fragmentation`, `Correct. Fragmentation is the loss of space within a sector when records do not fit exactly.`]
    ], a: 3 },
    { q: `The number of cylinders on a disk equals the number of tracks per surface.`, o: [
      [`True`, `Correct. Each cylinder is the set of tracks at one arm position, one per surface, so there is one cylinder per track position.`],
      [`False`, `The slides state this rule directly: number of cylinders = tracks per surface.`]
    ], a: 0 },
    { q: `Which part of a disk access is usually the slowest (largest cost)?`, o: [
      [`Seek time`, `Correct. Moving the arm to the right cylinder is usually the slowest part.`],
      [`Transfer time`, `Transfer of one sector is a tiny fraction of a revolution (e.g. 0.05 ms).`],
      [`Rotational delay`, `Latency is typically 6–8 ms, which is less than a typical 30 ms average seek.`],
      [`Reading the sector into the buffer`, `This is part of the transfer, not the largest cost.`]
    ], a: 0 }
  ],

  /* ───────── Lecture 3: Fields and Records ───────── */
  3: [
    { q: `A book record has ISBN = <code>52814</code>, author = <code>KNUTH</code>, title = <code>SORTING</code>. Which is the correct encoding using a 2-digit <b>length indicator</b> at the start of each field?`, o: [
      [`<code>52814|KNUTH|SORTING|</code>`, `That is the delimiter method, not length indicators.`],
      [`<code>ISBN=52814 AU=KNUTH TI=SORTING</code>`, `That is the keyword = value method.`],
      [`<code>055281405KNUTH07SORTING</code>`, `Correct. Each field is preceded by its length: 05 + 52814, 05 + KNUTH, 07 + SORTING.`],
      [`<code>055281405KNUTH06SORTING</code>`, `SORTING has 7 characters, not 6. The length was miscounted.`]
    ], a: 2 },
    { q: `Records use delimited fields and each record begins with a length indicator (byte count), as in the slide example <code>3387359|CARROLL|ALICE IN WONDERLAND</code>. What is the length indicator for the record <code>52814|KNUTH|SORTING</code>?`, o: [
      [`17`, `This counted only the data characters and left out the two | delimiters.`],
      [`20`, `This added a trailing delimiter that the record does not have.`],
      [`3`, `That is the number of fields, not the byte count.`],
      [`19`, `Correct. 5 + 1 + 5 + 1 + 7 = 19 bytes, just as the slide counts 5 + 1 + 7 + 1 + 19 = 33.`]
    ], a: 3 },
    { q: `Fixed-length records are written from <code>struct Student { char name[24]; int id; float gpa; };</code> (assume int and float are 4 bytes each, no padding). What is the byte offset of the record with RRN 12?`, o: [
      [`384`, `Correct. Record size = 24 + 4 + 4 = 32 B; offset = RRN × record size = 12 × 32 = 384.`],
      [`416`, `That is 13 × 32, which treats RRNs as starting at 1. The first record has RRN 0.`],
      [`352`, `That is 11 × 32, an off-by-one in the other direction.`],
      [`12`, `That is the RRN itself, not the byte offset.`]
    ], a: 0 },
    { q: `An <code>fstream file</code> holds fixed-length 50-byte records. Which call positions the file so that the next <code>write</code> overwrites the record with RRN 7?`, o: [
      [`<code>file.seekg(350, ios::beg);</code>`, `seekg moves the GET (read) pointer. Writing uses the put pointer.`],
      [`<code>file.seekp(350, ios::beg);</code>`, `Correct. seekp moves the put (write) pointer, and 7 × 50 = 350 bytes from the beginning.`],
      [`<code>file.seekp(400, ios::beg);</code>`, `400 = 8 × 50, which treats RRN as 1-based and lands on the next record.`],
      [`<code>file.seekp(350, ios::end);</code>`, `The offset must be measured from the beginning (ios::beg), not from the end.`]
    ], a: 1 },
    { q: `A file holds fixed-length 20-byte records. After <code>fseek(fp, -60L, 2);</code> the program reads one 20-byte record. Which record is read?`, o: [
      [`The record with RRN 3`, `Origin 2 means the END of the file, not the beginning.`],
      [`The last record`, `The last record starts 20 bytes before the end, not 60.`],
      [`The third record from the end`, `Correct. Origin 2 = end; moving back 60 bytes = 3 records of 20 bytes, so the read starts at the third-last record.`],
      [`The second record from the end`, `That would need an offset of -40L.`]
    ], a: 2 },
    { q: `A secondary key uniquely identifies a record and does not change.`, o: [
      [`True`, `This describes a PRIMARY key.`],
      [`False`, `Correct. A secondary key is used for searching but does not typically identify a record uniquely.`]
    ], a: 1 },
    { q: `What is the main ADVANTAGE of fixed-length records?`, o: [
      [`They save space when record sizes are diverse`, `That is the advantage of variable-length records.`],
      [`Fields are self-describing`, `That is the advantage of keyword = value fields.`],
      [`They never need padding`, `Fixed-length records waste space with padding; that is their disadvantage.`],
      [`It is easy to jump to the i-th record`, `Correct. Every record has the same size, so the offset is RRN × record size.`]
    ], a: 3 },
    { q: `Which field structure makes it easy to jump ahead to the end of a field?`, o: [
      [`Length indicator`, `Correct. The length stored at the start tells you exactly how many bytes to skip.`],
      [`Delimited`, `With delimiters you must check every byte until you hit the delimiter.`],
      [`Keyword = value`, `Its advantage is being self-describing and allowing missing fields.`],
      [`Stream`, `A stream file has no field structure at all.`]
    ], a: 0 },
    { q: `A music file is best described as:`, o: [
      [`A text file, because it is a sequence of characters`, `Text files (like C source code) can be viewed in a text editor; music cannot.`],
      [`A binary file, a sequence of bytes that needs a specialized program`, `Correct. The slides give movies and music as binary file examples.`],
      [`A stream file of records`, `"Stream" is a logical file structure, not the text/binary classification.`],
      [`An input file only`, `Whether a file is input or output depends on how the program uses it.`]
    ], a: 1 },
    { q: `In the "copy a file with no loops" program, after <code>infile.seekg(0, infile.end);</code> the call <code>infile.tellg()</code> gives the size of the file in bytes.`, o: [
      [`True`, `Correct. The get pointer is at the end, so its position equals the number of bytes; one read and one write of that size then copy the file.`],
      [`False`, `tellg reports the current get position, and at the end of the file that position is the file size.`]
    ], a: 0 }
  ],

  /* ───────── Lecture 4: Heap and Sorted Files ───────── */
  4: [
    { q: `A heap file has B = 400 pages, R = 20 records/page, D = 12 ms, C = 0.5 ms. What is the cost of inserting one record?`, o: [
      [`8800 ms`, `That is the scan cost B(D + RC).`],
      [`4400 ms`, `That is the equality-search cost 0.5B(D + RC).`],
      [`12.5 ms`, `This counted only one D. The last page must be read AND written back.`],
      [`24.5 ms`, `Correct. Insert = 2D + C = 2 × 12 + 0.5 = 24.5 ms.`]
    ], a: 3 },
    { q: `A sorted file has B = 256 pages, R = 16 records/page, D = 10 ms, C = 1 ms. What is the equality-search cost?`, o: [
      [`84 ms`, `Correct. D·log₂B + C·log₂R = 10 × 8 + 1 × 4 = 84 ms.`],
      [`48 ms`, `The logs were swapped: D·log₂R + C·log₂B = 40 + 8.`],
      [`88 ms`, `This used log₂B for both terms (80 + 8). The record term uses log₂R.`],
      [`3328 ms`, `That is the HEAP equality search 0.5B(D + RC).`]
    ], a: 0 },
    { q: `Same sorted file (B = 256, R = 16, D = 10 ms, C = 1 ms). What is the cost of inserting one record?`, o: [
      [`6656 ms`, `That is only B(D + RC). You forgot to add the search cost.`],
      [`6740 ms`, `Correct. Search + 2 × 0.5B(D + RC) = 84 + 256 × (10 + 16) = 84 + 6656 = 6740 ms.`],
      [`3412 ms`, `This shifted only half the file once (84 + 3328). Half the file must be both read AND written: 2 × 0.5B(D + RC).`],
      [`84 ms`, `That is only the search cost; it ignores shifting the later records.`]
    ], a: 1 },
    { q: `A heap file has B = 256, R = 16, D = 10 ms, C = 1 ms. What is the average cost of deleting a record (search + C + D)?`, o: [
      [`3328 ms`, `This is only the search cost. You forgot + C + D.`],
      [`6667 ms`, `This used the full scan (6656) as the search. On average only half the file is scanned.`],
      [`3339 ms`, `Correct. Search = 0.5 × 256 × (10 + 16) = 3328; delete = 3328 + 1 + 10 = 3339 ms.`],
      [`21 ms`, `That is 2D + C, the insert cost.`]
    ], a: 2 },
    { q: `A sorted file holds keys 1, 2, 4, 6, 7 in 20-byte records starting at offset 0. A record with key 3 is inserted. How many existing records must be moved?`, o: [
      [`0`, `That is a heap file, where the record is appended at the end and order is ignored.`],
      [`2`, `Records 4, 6 AND 7 all have greater keys, so all three move.`],
      [`5`, `Records 1 and 2 have smaller keys, so they stay in place.`],
      [`3`, `Correct. All records with a greater key (4, 6, 7) move one location toward the end, and key 3 goes in at offset 40.`]
    ], a: 3 },
    { q: `A file organization method defines:`, o: [
      [`The record placement strategy and the relationship between a record's key value and its relative address`, `Correct. This is the definition from the slides.`],
      [`How to prepare and format the storage media`, `That is file management, not organization.`],
      [`The number of sectors per cluster`, `That is a physical disk setting.`],
      [`Which system software (OS or DBMS) manages the file`, `That is about file managers, not organization methods.`]
    ], a: 0 },
    { q: `The efficiency of a file organization is measured by:`, o: [
      [`The size of the records`, `Record size affects space, but the slides measure efficiency differently.`],
      [`The number of disk accesses`, `Correct. Fewer disk accesses means a more efficient organization.`],
      [`The number of fields per record`, `This is a logical design detail, not the efficiency measure.`],
      [`The CPU speed`, `CPU time is small compared with disk access; the slides count disk accesses.`]
    ], a: 1 },
    { q: `In a heap file, a range search costs the same as a full scan, B(D + RC).`, o: [
      [`True`, `Correct. Matching records may be anywhere in an unordered file, so every page must be read.`],
      [`False`, `The heap file has no order to exploit, so range search = B(D + RC), the same as the scan.`]
    ], a: 0 },
    { q: `Another name for an unordered (heap) file is:`, o: [
      [`Indexed file`, `Indexing is a separate organization method.`],
      [`Sorted file`, `A sorted file is the ORDERED (sequential) file.`],
      [`Pile file`, `Correct. The heap file is also called an unordered sequential file or pile file.`],
      [`Hashed file`, `A hashed file computes each record's address with a hash function.`]
    ], a: 2 },
    { q: `In a heap file equality search, if no record matches the condition, only half the file is scanned.`, o: [
      [`True`, `Half the file is the AVERAGE when the record exists. With no match you cannot stop early.`],
      [`False`, `Correct. If no record matches, the entire file must be scanned, B(D + RC).`]
    ], a: 1 }
  ],

  /* ───────── Lecture 5: Hashing ───────── */
  5: [
    { q: `A short version of the course hash for 4-character keys is:<pre>sum = key[0]*key[1] + key[2]*key[3];
sum = sum % 19937;
return sum % maxAddress;</pre>With ASCII A = 65, B = 66, C = 67, D = 68, what is the home address of key <code>"ABCD"</code> when maxAddress = 100?`, o: [
      [`46`, `Correct. 65 × 66 = 4290; 67 × 68 = 4556; sum = 8846; 8846 % 19937 = 8846; 8846 % 100 = 46.`],
      [`8846`, `This skipped the final % maxAddress. The address must be in 0..99.`],
      [`66`, `This added the four codes (266) instead of multiplying pairs.`],
      [`90`, `This used only the first pair (4290 % 100).`]
    ], a: 0 },
    { q: `With h(k) = k mod 13, which pair of keys are synonyms?`, o: [
      [`30 and 44`, `30 mod 13 = 4 and 44 mod 13 = 5: different addresses.`],
      [`27 and 53`, `Correct. 27 mod 13 = 1 and 53 mod 13 = 1. Both keys hash to the same address, so they collide and are synonyms.`],
      [`19 and 33`, `19 mod 13 = 6 and 33 mod 13 = 7: different addresses.`],
      [`40 and 64`, `40 mod 13 = 1 and 64 mod 13 = 12: different addresses.`]
    ], a: 1 },
    { q: `Using the course's last step (divide by the address-space size and keep the remainder), what is the home address of the numeric key 1234 in an address space of 101 addresses?`, o: [
      [`12`, `That is the quotient (1234 / 101 ≈ 12), not the remainder.`],
      [`34`, `This used the last two digits, not the remainder of division by 101.`],
      [`22`, `Correct. 101 × 12 = 1212, and 1234 - 1212 = 22.`],
      [`101`, `The addresses run from 0 to 100, so 101 is outside the address space.`]
    ], a: 2 },
    { q: `A hashed file has H = 1 ms, D = 10 ms, R = 20 records/page, C = 0.5 ms. What is the equality-search cost H + D + 0.5RC?`, o: [
      [`21 ms`, `This scanned the whole page (RC = 10) instead of half of it on average.`],
      [`15 ms`, `This left out H, the time to compute the hash.`],
      [`11 ms`, `This left out the 0.5RC term for checking records in the page.`],
      [`16 ms`, `Correct. 1 + 10 + 0.5 × 20 × 0.5 = 1 + 10 + 5 = 16 ms.`]
    ], a: 3 },
    { q: `With hashing, there is an obvious connection between a record's key and its location in the file.`, o: [
      [`True`, `The slides say the opposite.`],
      [`False`, `Correct. The hash function computes the address, and there is no obvious connection between the key and the location.`]
    ], a: 1 },
    { q: `Why does a range search on a hashed file cost 1.25B(D + RC)?`, o: [
      [`Hashing does not keep the records in key order, so the whole file must be scanned`, `Correct. Records in a range can be in any bucket, so every page is read.`],
      [`Only a quarter of the buckets need to be read`, `No pages can be skipped; all 1.25B pages are read.`],
      [`The hash function must be computed 1.25 times per record`, `The 1.25 factor is about pages, not hash computations.`],
      [`Records are found by binary search over the buckets`, `Binary search needs sorted records, which a hashed file does not have.`]
    ], a: 0 },
    { q: `In the hashed-file equality-search cost H + D + 0.5RC, what does H represent?`, o: [
      [`The number of buckets`, `The number of pages is B, not H.`],
      [`The time to compute the hash function`, `Correct. Compute h(k) (H), read the one page (D), and check half its records on average (0.5RC).`],
      [`The height of the cylinder`, `Cylinder height is a disk-geometry term from Lecture 2.`],
      [`The number of collisions`, `Collisions are not a term in this formula.`]
    ], a: 1 },
    { q: `In the course hash function, what is the purpose of the final line <code>return sum % maxAddress;</code>?`, o: [
      [`To prevent integer overflow while folding`, `That is the job of sum % 19937 (the prime divisor).`],
      [`To combine pairs of characters into a number`, `That is the folding step key[j] * key[j+1].`],
      [`To map the sum into the address space 0..maxAddress-1, giving the home address`, `Correct. The remainder of dividing by the address-space size is the home address.`],
      [`To detect synonyms`, `The function only computes an address; it does not detect collisions.`]
    ], a: 2 },
    { q: `If the address space has 1000 available addresses, the hash function maps every possible key to an address in {0, 1, …, 999}.`, o: [
      [`True`, `Correct. The address space is chosen beforehand, and h maps all possible keys into it.`],
      [`False`, `The slides use this exact example: 1000 addresses, so h maps keys to 0..999.`]
    ], a: 0 },
    { q: `Why does scanning a hashed file cost 1.25B(D + RC) instead of B(D + RC)?`, o: [
      [`Each record is read 1.25 times because of collisions`, `Each page is read once; the extra cost comes from having more pages.`],
      [`The hash must be computed for every page`, `A scan does not compute any hash.`],
      [`The file is sorted after hashing`, `Hashing does not sort the file.`],
      [`Buckets are kept about 80% full, so the same data occupies 1.25 times as many pages`, `Correct. 1 / 0.8 = 1.25, so there are 1.25B pages to read.`]
    ], a: 3 }
  ]
};

// Midterm scope and exam-focused summary for fp: English and Egyptian Arabic per point. Merged by build.mjs.
window.MIDTERM = window.MIDTERM || {};
MIDTERM.fp = {
 "lecs": [
  1,
  2,
  3,
  4
 ],
 "scope": "Up to heap and sorted files (L1–L4)",
 "scope_ar": "لحد الـ heap والـ sorted files، من المحاضرة 1 لـ 4",
 "sections": [
  {
   "lec": 1,
   "h": "Files, storage and organization",
   "ar_h": "الـ files والتخزين والتنظيم",
   "pts": [
    [
     "<b>Data structures</b> deal with data in <b>main memory</b>; <b>file structures</b> deal with data in <b>secondary storage</b> (files). Both = representation of data + operations for accessing it.",
     "الـ <b>data structures</b> بتتعامل مع الداتا اللي في الـ <b>main memory</b>، والـ <b>file structures</b> بتتعامل مع الداتا اللي على الـ <b>secondary storage</b> (الـ files). والاتنين فيهم طريقة تمثيل للداتا وعمليات للوصول ليها."
    ],
    [
     "<b>File</b> = a collection of data placed on <b>secondary, non-volatile</b> storage. Main memory (RAM): fast, small, expensive, volatile. Secondary storage: slow, large, cheap, stable. File storage is slow because it has <b>many moving parts</b>.",
     "الـ <b>File</b> هو مجموعة داتا متحطة على <b>secondary storage</b> من النوع الـ <b>non-volatile</b>. الـ main memory (RAM) سريعة وصغيرة وغالية و volatile، والـ secondary storage بطيء وكبير ورخيص و stable. وتخزين الـ files بطيء عشان فيه <b>أجزاء كتير بتتحرك</b>."
    ],
    [
     "Data processing = storage, organization, access (<b>sequential</b> or <b>direct</b>) and processing of data. <b>Logical structure</b>: how programmers see the file; <b>physical structure</b>: how it is stored on secondary storage.",
     "الـ data processing فيها الـ storage والـ organization والـ access (يا <b>sequential</b> يا <b>direct</b>) والـ processing. والـ <b>logical structure</b> هو الـ file شكله إيه عند الـ programmer، والـ <b>physical structure</b> هو متخزن إزاي على الـ secondary storage."
    ],
    [
     "<b>Logical organization methods</b>: heap, indexing, hashing. <b>Physical organization methods</b>: organizing tracks by <b>sectors</b> or by <b>blocks</b>. File organization must provide <b>fast access time and good space utilization</b>.",
     "طرق الـ <b>logical organization</b> هي الـ heap والـ indexing والـ hashing. وطرق الـ <b>physical organization</b> إننا ننظم الـ tracks بالـ <b>sectors</b> أو بالـ <b>blocks</b>. والـ file organization لازم تدي <b>fast access time و good space utilization</b>."
    ],
    [
     "<b>File management</b>: preparing/formatting storage media, allocating storage space and addressing, managing free space. <b>File managers</b> (system software): the <b>OS</b> and the <b>DBMS</b>. Trap: \"fast access and good space utilization\" is what <i>organization</i> must provide, not a management task.",
     "الـ <b>File management</b> فيها تجهيز الـ storage media وعمل format ليها، وحجز المساحة والـ addressing، وإدارة الـ free space. والـ <b>file managers</b> (system software) هما الـ <b>OS</b> والـ <b>DBMS</b>. وخلي بالك إن الـ fast access والـ good space utilization ده المطلوب من الـ <i>organization</i>، مش مهمة من مهام الـ management."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "File I/O in C/C++",
   "ar_h": "الـ <bdi dir=\"ltr\">File I/O</bdi> في C و <bdi dir=\"ltr\">C++</bdi>",
   "pts": [
    [
     "<b>Physical file</b>: bytes on disk with a physical name (A.txt), used <b>once</b>, when opening. <b>Logical file</b>: a channel from the program to the physical file; its logical name is a program variable (infile, fp), used <b>many times</b>. They are linked at the time of <b>opening</b>.",
     "الـ <b>Physical file</b> هو bytes على الـ disk ليها physical name زي A.txt، وبيتستخدم <b>مرة واحدة</b> وقت الفتح. والـ <b>Logical file</b> هو قناة بين البرنامج والـ physical file، والـ logical name بتاعه variable في البرنامج (infile أو fp) وبيتستخدم <b>مرات كتير</b>. والاتنين بيترتبطوا وقت <b>الفتح</b>."
    ],
    [
     "Declaring and opening: C <code>FILE *fp; fp = fopen(\"A.txt\", \"w\");</code> (fp = logical name, fopen = method, \"A.txt\" = physical file, \"w\" = mode). C++: <code>fstream f; f.open(\"A.txt\", ios::out);</code>, the 2nd argument is an <b>integer</b> built with bitwise OR <code>|</code> of <code>ios</code> constants.",
     "الفتح في C بيبقى كده:<pre>FILE *fp;\nfp = fopen(\"A.txt\", \"w\");</pre>والـ fp هو الـ logical name، والـ fopen هي الـ method، و<bdi dir=\"ltr\">\"A.txt\"</bdi> هو الـ physical file، و<bdi dir=\"ltr\">\"w\"</bdi> هو الـ mode. وفي <bdi dir=\"ltr\">C++</bdi> بنكتب:<pre>fstream f;\nf.open(\"A.txt\", ios::out);</pre>والـ argument التاني <b>integer</b> معمول بـ bitwise OR (الـ <bdi dir=\"ltr\">|</bdi>) بين constants من الـ class اللي اسمها <code>ios</code>."
    ],
    [
     "C modes: <b>r</b> existing, read; <b>w</b> create or <b>truncate</b>, output; <b>a</b> create or <b>append</b>, output; <b>r+ w+ a+</b> the same for input and output; adding <b>b</b> = binary. C++ flags: in, out, <b>app</b> (seek to end before <i>each</i> write), <b>ate</b> (start at the end), trunc, binary.",
     "الـ modes في C هي:<br>الـ <b>r</b> لـ file موجود للقراية، والـ <b>w</b> يعمل file جديد أو يعمل <b>truncate</b> للـ output، والـ <b>a</b> يعمل file جديد أو يعمل <b>append</b> للـ output.<br>والـ <b>r+ و w+ و a+</b> نفس الكلام بس للـ input والـ output، ولو زودت <b>b</b> يبقى binary.<br>والـ flags في <bdi dir=\"ltr\">C++</bdi> هي in و out و <b>app</b> (يروح للآخر قبل <i>كل</i> write) و <b>ate</b> (يبدأ من الآخر) و trunc و binary."
    ],
    [
     "C mode ↔ C++ flags: r = in; w = out | trunc; a = out | app; r+ = out | in; w+ = out | in | trunc; a+ = out | in | app; …b = … | binary.",
     "الربط بين الـ modes والـ flags:<span class=\"ltr\">r = in, w = out | trunc, a = out | app, r+ = out | in, w+ = out | in | trunc, a+ = out | in | app, …b = … | binary</span>"
    ],
    [
     "<b>Closing</b> frees the logical name for another physical file (\"like hanging up the telephone\"): C <code>fclose(fp);</code>, C++ <code>f.close();</code>. Bytes go to a <b>buffer</b> and are sent as a <b>block</b>; if the program terminates abnormally without closing, <b>data may be lost</b>.",
     "الـ <b>Closing</b> بيفضّي الـ logical name عشان يتستخدم مع physical file تاني (زي ما تقفل التليفون بعد المكالمة). في C بنكتب <code>fclose(fp);</code> وفي <bdi dir=\"ltr\">C++</bdi> بنكتب <code>f.close();</code> والـ bytes بتتجمع في <b>buffer</b> وتتبعت <b>block</b>، ولو البرنامج وقع من غير ما يقفل الـ file ممكن <b>الداتا تضيع</b>."
    ],
    [
     "Generic <code>Read(Source_file, Destination_addr, Size)</code> and <code>Write(Destination_file, Source_addr, Size)</code>. <code>fread/fwrite</code> arguments: (1) address of the variable, (2) element size in bytes, (3) number of elements, (4) logical file name. E.g. <code>fread(a,1,10,infile)</code> reads 10 characters (a char is 1 byte).",
     "الـ Read والـ Write العامين شكلهم:<span class=\"ltr\">Read(Source_file, Destination_addr, Size)</span><span class=\"ltr\">Write(Destination_file, Source_addr, Size)</span>والـ arguments بتوع fread و fwrite بالترتيب: أولًا عنوان الـ variable، وتانيًا حجم العنصر بالـ bytes، وتالتًا عدد العناصر، ورابعًا الـ logical file name. مثلًا:<span class=\"ltr\">fread(a,1,10,infile)</span>دي بتقرا 10 characters (الـ char بياخد 1 byte)."
    ],
    [
     "Read functions (slide 30): <b>fgetc</b> File Get Character, <b>fgets</b> File Get String (at most n-1 chars), <b>fscanf</b> File Scan Format, <b>fread</b> File Read (a record). End of file: C, <code>fread</code> returns <b>0</b>; C++, <code>infile.fail()</code> or <code>infile.eof()</code> is true. Standard names need no open/close: stdout/cout, stdin/cin, stderr/cerr.",
     "دوال القراية (slide 30): الـ <b>fgetc</b> يعني File Get Character، والـ <b>fgets</b> يعني File Get String (أقصاها <bdi dir=\"ltr\">n-1</bdi> characters)، والـ <b>fscanf</b> يعني File Scan Format، والـ <b>fread</b> يعني File Read (بتقرا record). ونهاية الـ file في C لما الـ fread ترجّع <b>0</b>، وفي <bdi dir=\"ltr\">C++</bdi> لما <code>infile.fail()</code> أو <code>infile.eof()</code> ترجع true. والـ standard names مش محتاجة open ولا close، وهي:<span class=\"ltr\">stdout/cout, stdin/cin, stderr/cerr</span>"
    ],
    [
     "Full methods: writeC uses <code>fputc</code>, readC <code>fgetc</code> + <code>putchar</code>, writeS <code>fputs</code> (stops on an empty line), readS <code>fgets</code> + <code>puts</code>, writeASCII <code>fprintf</code> (chars 32 to 127), readASCII <code>fscanf</code> until it returns <code>EOF</code>. The sample tests <code>if (my_file == NULL)</code> to see whether the file opened.",
     "الـ full methods:<br>الـ writeC بتستخدم <code>fputc</code>، والـ readC بتستخدم <code>fgetc</code> وبعدها <code>putchar</code>.<br>والـ writeS بتستخدم <code>fputs</code> وبتقف عند سطر فاضي، والـ readS بتستخدم <code>fgets</code> وبعدها <code>puts</code>.<br>والـ writeASCII بتستخدم <code>fprintf</code> للـ characters من 32 لـ 127، والـ readASCII بتستخدم <code>fscanf</code> لحد ما ترجّع <code>EOF</code>.<br>والبرنامج المثال بيختبر <bdi dir=\"ltr\">my_file&nbsp;==&nbsp;NULL</bdi> عشان يعرف الـ file اتفتح ولا لأ."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "What the doctor asks (Lecture 1)",
   "ar_h": "الدكتور بيسأل في إيه (Lecture 1)",
   "pts": [
    [
     "MCQ: \"Files are managed by system software: ………\" → <b>Both OS and DBMS</b> (MIS is the distractor).",
     "سؤال اختيار: الـ files بيديرها system software مين؟ الإجابة <b>الاتنين، الـ OS والـ DBMS</b>، والـ MIS هو الاختيار الغلط."
    ],
    [
     "MCQ: \"File organization methods must provide ………\" → <b>fast access time and good space utilization</b>; the distractors are the three file <i>management</i> tasks.",
     "سؤال اختيار: الـ file organization methods لازم تدي إيه؟ الإجابة <b>fast access time و good space utilization</b>، والاختيارات الغلط هي مهام الـ file <i>management</i> التلاتة."
    ],
    [
     "Written: \"Mention the main differences between physical file and logical file\" (bytes on disk with a physical name, used once vs channel with a logical name, used many times).",
     "سؤال مقالي: اذكر الفروق بين الـ physical file والـ logical file. الأول bytes على الـ disk ليها physical name وبيتستخدم مرة، والتاني قناة ليها logical name وبيتستخدم مرات كتير."
    ],
    [
     "Code: write C/C++ file code with open, read, write and close (e.g. Model B: copy <code>src.txt</code> to <code>dest.txt</code> with one <code>read</code> and one <code>write</code>, no loops).",
     "سؤال كود: تكتب كود file في C أو <bdi dir=\"ltr\">C++</bdi> فيه open و read و write و close (زي Model B اللي بينسخ <code>src.txt</code> لـ <code>dest.txt</code> بـ read واحدة و write واحدة من غير loops)."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Storage devices and the disk",
   "ar_h": "الـ storage devices والـ disk",
   "pts": [
    [
     "<b>DASD</b> (direct access): magnetic disks (hard, floppy) and optical disks (CD-ROM, CD-R, CD-RW, DVD). <b>SASD</b> (serial access): <b>magnetic tape</b>.",
     "الـ <b>DASD</b> (direct access) زي الـ magnetic disks (الـ hard والـ floppy) والـ optical disks:<span class=\"ltr\">CD-ROM, CD-R, CD-RW, DVD</span>والـ <b>SASD</b> (serial access) زي الـ <b>magnetic tape</b>."
    ],
    [
     "Five disk components: <b>platters</b> (circular disks, data on both surfaces), <b>read/write heads</b> (one per surface, fly as close as 3 nm), <b>arm assembly</b> (holds the arms; if it fails the drive fails), <b>spindle</b> (holds the platters fixed and <b>rotates</b> them), <b>arms</b> (carry, guide and move the heads; moving them = <b>seeking</b>, the slowest part).",
     "الـ disk ليه 5 components:<br>الـ <b>platters</b> (disks دايرية والداتا على الوشين)، والـ <b><bdi dir=\"ltr\">read/write heads</bdi></b> (واحد لكل surface وبيطير على بعد لحد 3 nm).<br>والـ <b>arm assembly</b> (شايل الـ arms ولو باظ الـ drive يبوظ)، والـ <b>spindle</b> (بيثبّت الـ platters و<b>بيلفّها</b>).<br>والـ <b>arms</b> بتشيل الـ heads وتوجهها وتحركها، وتحريكها اسمه <b>seeking</b> وده أبطأ جزء."
    ],
    [
     "Platter parts: <b>track</b> (a ring), <b>sector</b> (smallest addressable portion, usually <b>512 B</b>), <b>cluster</b> (fixed number of contiguous sectors, the OS file manager's view), <b>cylinder</b> (tracks above/below each other, read <b>without moving the arm</b>). Number of cylinders = tracks per surface; cylinder height = surfaces = 2 × platters.",
     "أجزاء الـ platter:<br>الـ <b>track</b> حلقة، والـ <b>sector</b> أصغر جزء ليه address وغالبًا <b>512 B</b>.<br>والـ <b>cluster</b> عدد ثابت من الـ sectors ورا بعض (ده view الـ OS file manager)، والـ <b>cylinder</b> هو الـ tracks اللي فوق وتحت بعض وبيتقري <b>من غير ما الـ arm يتحرك</b>.<br>وعدد الـ cylinders بيساوي الـ tracks في الـ surface، والـ cylinder height بيساوي عدد الـ surfaces:<span class=\"ltr\">cylinder height = surfaces = 2 × platters</span>"
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Capacity and blocking calculations",
   "ar_h": "حسابات الـ capacity والـ blocking",
   "pts": [
    [
     "Formulas: cluster = sectors/cluster × bytes/sector; track = sectors/track × bytes/sector; cylinder = cylinder height × track; drive = cylinders × cylinder. Example: 60 sectors/track, 512 B, height 14, 5000 tracks/surface → track 30,720 B, cylinder 430,080 B, drive 2,150,400,000 B, platters 7.",
     "الـ formulas:<span class=\"ltr\">cluster = sectors/cluster × bytes/sector</span><span class=\"ltr\">track = sectors/track × bytes/sector</span><span class=\"ltr\">cylinder = cylinder height × track</span><span class=\"ltr\">drive = cylinders × cylinder</span>مثال من المحاضرة:<span class=\"ltr\">track = 60 × 512 = 30,720 B, cylinder = 14 × 30,720 = 430,080 B</span><span class=\"ltr\">drive = 5000 × 430,080 = 2,150,400,000 B, platters = 14/2 = 7</span>"
    ],
    [
     "File storage: file size = records × record size; then divide by sector, track or cylinder size. Records per track = track / record. A part-used track or cylinder still counts, so <b>round up</b> (90,000 × 256 B = 23,040,000 B → 750 tracks, 53.57 → 54 cylinders).",
     "تخزين الـ file: حجم الـ file بيساوي عدد الـ records في حجم الـ record، وبعدين نقسم على حجم الـ sector أو الـ track أو الـ cylinder. والـ track اللي اتملى جزء منه بيتحسب، فلازم <b>نقرّب لفوق</b>:<span class=\"ltr\">90,000 × 256 = 23,040,000 B → 750 tracks, 53.57 → 54 cylinders</span>"
    ],
    [
     "<b>By sectors</b> (OS): slow access or <b>fragmentation</b> (space lost inside a sector, e.g. 300 B records in 512 B sectors). <b>By blocks</b> (DBMS): user-defined blocks (pages) holding an integral number of records; <b>blocking factor</b> = records per block; no record spans two blocks. Sub-blocks: <b>count</b> (bytes in block), <b>key</b> (optional, last record's key), <b>data</b>. Blocks have <b>more</b> non-data overhead (sub-blocks + inter-block gaps).",
     "الـ <b>sectors</b> بيستخدمها الـ OS، وفيها access بطيء أو <b>fragmentation</b> (مساحة بتضيع جوه الـ sector، زي records حجمها 300 B في sectors حجمها 512 B).<br>والـ <b>blocks</b> بيستخدمها الـ DBMS، وهي blocks (pages) الـ user بيحددها وفيها عدد صحيح من الـ records، والـ <b>blocking factor</b> هو عدد الـ records في الـ block، ومفيش record بيتقسم على 2 blocks.<br>والـ sub-blocks هي الـ <b>count</b> (عدد الـ bytes)، والـ <b>key</b> (اختياري، key آخر record)، والـ <b>data</b>. والـ blocks فيها non-data overhead <b>أكتر</b> (الـ sub-blocks والـ gaps)."
    ],
    [
     "Records per track with blocks: block = BF × record + overhead; blocks/track = <b>⌊track / block⌋</b> (floor: a block cannot be split); records/track = blocks × BF. Track 20,000 B, overhead 300 B, record 100 B: BF 10 → ⌊20,000/1300⌋ = 15 → <b>150</b>; BF 60 → ⌊20,000/6300⌋ = 3 → <b>180</b>.",
     "عدد الـ records في الـ track مع الـ blocks:<span class=\"ltr\">block = BF × record + overhead</span><span class=\"ltr\">blocks/track = ⌊track / block⌋, records/track = blocks × BF</span>والـ floor هنا عشان الـ block مينفعش يتقسم. مثال المحاضرة:<span class=\"ltr\">BF 10 → ⌊20,000/1300⌋ = 15 → 150 records</span><span class=\"ltr\">BF 60 → ⌊20,000/6300⌋ = 3 → 180 records</span>"
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Access time and the disk bottleneck",
   "ar_h": "الـ access time والـ disk bottleneck",
   "pts": [
    [
     "Access time = <b>seek time</b> (move the arm to the correct cylinder, the <b>largest</b> cost: 5 ms track-to-track, 30 ms average, 50 ms max) + <b>rotational delay</b> (sector rotates under the head) + <b>transfer time</b> (head passes over the data).",
     "الـ access time بيساوي:<span class=\"ltr\">seek time + rotational delay + transfer time</span>الـ <b>seek time</b> هو تحريك الـ arm للـ cylinder الصح وده <b>أكبر</b> تكلفة (5 ms من track للي جنبه، و 30 ms في المتوسط، و 50 ms أقصى حاجة). والـ <b>rotational delay</b> هو لف الـ sector لحد ما ييجي تحت الـ head، والـ <b>transfer time</b> هو وقت مرور الـ head على الداتا."
    ],
    [
     "Revolution = 60 × 1000 / RPM ms; latency min 0, max 1 revolution, <b>average = ½ revolution</b> (5000 rpm → 12 ms → 6 ms). Transfer = (bytes / bytes per track) × revolution = n sectors × revolution / sectors per track. If the average rotational delay is <b>given</b>, use it.",
     "الـ formulas:<span class=\"ltr\">revolution = 60 × 1000 / RPM ms</span><span class=\"ltr\">average latency = ½ revolution (min 0, max 1 revolution)</span><span class=\"ltr\">5000 rpm → 12 ms → 6 ms</span><span class=\"ltr\">transfer = n sectors × revolution / sectors per track</span>ولو الـ average rotational delay <b>مدّيه</b> في السؤال، استخدمه على طول."
    ],
    [
     "Worked: 10,000 rpm, 170 sectors/track, seek 8 ms, latency 3 ms → transfer = 6/170 ≈ 0.035 ms, total = <b>11.035 ms</b>. Model A: 5000 rpm, 20 sectors/track, seek 7 ms, 3 sectors → 7 + 6 + 3 × 12/20 = <b>14.8 ms</b>.",
     "أمثلة محلولة:<span class=\"ltr\">10,000 rpm, 170 sectors: transfer = 6/170 ≈ 0.035 ms, total = 8 + 3 + 0.035 = 11.035 ms</span><span class=\"ltr\">Model A: 7 + 6 + 3 × 12/20 = 7 + 6 + 1.8 = 14.8 ms</span>"
    ],
    [
     "Disk bottleneck (processes are <b>disk-bound</b>: network and CPU wait for the disk): <b>multiprocessing</b>, <b>disk striping</b> (blocks on different drives, parallelism), <b>RAID</b> (Redundant Array of Independent Disks), <b>RAM disk</b> (memory simulates a disk, speed vs volatility), <b>disk cache</b> (check the cache first, a miss goes to the disk).",
     "الـ disk bottleneck (الـ processes بتبقى <b>disk-bound</b>، يعني الـ network والـ CPU مستنيين الـ disk)، وحلوله:<br>الـ <b>multiprocessing</b>، والـ <b>disk striping</b> (blocks على drives مختلفة بالتوازي)، والـ <b>RAID</b> (Redundant Array of Independent Disks).<br>والـ <b>RAM disk</b> (memory بتعمل نفسها disk، سرعة مقابل volatility)، والـ <b>disk cache</b> (نشيك على الـ cache الأول، ولو miss نروح للـ disk)."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "What the doctor asks (Lecture 2)",
   "ar_h": "الدكتور بيسأل في إيه (Lecture 2)",
   "pts": [
    [
     "Fill the blank: \"……… are used to carry, guide and move the read/write head\" → <b>Arms</b>; \"……… is the time to move the arm to the correct sector\" → <b>Seek time</b>; \"a cylinder can be accessed without ………\" → <b>moving the arm assembly</b>.",
     "أكمل: اللي بيشيل الـ head ويوجهه ويحركه هو الـ <b>Arms</b>، والوقت اللي الـ arm بياخده عشان يروح للـ sector الصح هو الـ <b>Seek time</b>، والـ cylinder بيتقري من غير <b>تحريك الـ arm assembly</b>."
    ],
    [
     "Short calculations as MCQs: cluster size (4 × 512 = 2048 B, the track size 64 × 512 is a distractor) and average latency (5000 rpm → 6 ms).",
     "حسابات صغيرة في الاختيار:<span class=\"ltr\">cluster = 4 × 512 = 2048 B (track = 64 × 512 is a trap)</span><span class=\"ltr\">5000 rpm → average latency = 6 ms</span>"
    ],
    [
     "Q2 disk problem (every model): given records, sector, track, cylinder height, tracks/surface, overhead, rpm and seek, find average latency, cylinder size, records per cylinder, sectors or tracks to save the file (round up), records/track for a blocking factor, total disk size, and the average time to read 2, 3 or 4 sectors.",
     "سؤال الـ disk في Q2 (في كل model): بيديك الـ records والـ sector والـ track والـ cylinder height والـ tracks في الـ surface والـ overhead والـ rpm والـ seek، ويطلب الـ average latency، وحجم الـ cylinder، والـ records في الـ cylinder، والـ sectors أو الـ tracks اللي الـ file محتاجها (قرّب لفوق)، والـ records في الـ track لـ blocking factor معين، وحجم الـ disk كله، ومتوسط وقت قراية 2 أو 3 أو 4 sectors."
    ],
    [
     "Written: differences between seek time, rotational delay and transfer time; four techniques for \"network and CPU wait a long time for the disk\".",
     "أسئلة مقالي: الفرق بين الـ seek time والـ rotational delay والـ transfer time، واذكر 4 حلول لمشكلة إن الـ network والـ CPU بيستنوا الـ disk كتير."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Files, records and stream files",
   "ar_h": "الـ files والـ records والـ stream files",
   "pts": [
    [
     "<b>Text file</b>: a sequence of characters (e.g. C source code), viewable in a text editor. <b>Binary file</b>: a sequence of bytes (e.g. movie, music), needs a specialized program.",
     "الـ <b>Text file</b> سلسلة من الـ characters (زي الـ source code بتاع C) وتقدر تشوفه في أي text editor. أما الـ <b>Binary file</b> فهو سلسلة من الـ bytes (زي فيلم أو مزيكا) ومحتاج برنامج مخصوص."
    ],
    [
     "<b>Input</b> files: the program reads from them. <b>Output</b> files: the program writes to them.",
     "الـ <b>input</b> files البرنامج بيقرا منها، والـ <b>output</b> files البرنامج بيكتب فيها."
    ],
    [
     "<b>Field</b>: a data value, the <b>smallest unit of data with logical meaning</b> (has a name, type, length and value). <b>Record</b>: a <b>group of fields forming a logical unit</b>. Logical view: a file is a collection of records.",
     "الـ <b>Field</b> قيمة داتا، وهو <b>أصغر وحدة داتا ليها معنى logical</b> (ليه اسم و type وطول وقيمة). والـ <b>Record</b> هو <b>مجموعة fields بتكوّن وحدة logical واحدة</b>. والـ logical view بيقول إن الـ file مجموعة records."
    ],
    [
     "Three file structures: <b>stream</b>, <b>field</b> and <b>record</b> structures.",
     "فيه 3 file structures وهم الـ <b>stream</b> والـ <b>field</b> والـ <b>record</b> structures."
    ],
    [
     "<b>Stream file</b>: a stream of bytes with <b>no added information</b>, e.g. <code>AmesMary123 Maple...</code>. Problem: <b>no way to get the information back</b> in the organized record format.",
     "الـ <b>Stream file</b> عبارة عن stream من الـ bytes <b>من غير أي معلومات زيادة</b>، زي <bdi dir=\"ltr\">AmesMary123&nbsp;Maple...</bdi>. والمشكلة إن <b>مفيش طريقة نرجّع بيها المعلومات</b> بشكل الـ record المنظم."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Field and record structures (advantages and disadvantages)",
   "ar_h": "الـ field والـ record structures (المميزات والعيوب)",
   "pts": [
    [
     "<b>Fixed length</b> (lengths 5, 7, 25 → <code>03818FOLK&nbsp;&nbsp;&nbsp;FILE STRUCTURES</code>): + easy to read/store; − wastes space with padding.",
     "الـ <b>Fixed length</b> (الأطوال 5 و 7 و 25، والـ FOLK بيتعمله padding لحد 7). الميزة إنه سهل في القراية والتخزين، والعيب إنه بيضيّع مساحة في الـ padding."
    ],
    [
     "<b>Length indicator</b> at the start of each field (<code>0587359</code>...): + easy to jump ahead to the end of the field; − long fields (max size &gt; 256) need more than 1 byte for the length.",
     "الـ <b>Length indicator</b> في أول كل field. الميزة إنه سهل تنط لآخر الـ field، والعيب إن الـ fields الطويلة (لو الحجم أكبر من <bdi dir=\"ltr\">256</bdi>) محتاجة أكتر من byte واحد عشان نخزن الطول."
    ],
    [
     "<b>Delimiter</b> at the end of each field (<code>87359|CARROLL|</code>): + may waste less space than length-based; − must check every byte of the field against the delimiter.",
     "الـ <b>Delimiter</b> في آخر كل field. الميزة إنه ممكن يضيّع مساحة أقل من الطرق اللي بالطول، والعيب إننا لازم نقارن كل byte في الـ field بالـ delimiter."
    ],
    [
     "<b>Keyword = value</b> (<code>ISBN=87359 AU=CARROLL</code>): + fields are self-describing, allows missing fields; − wastes space with keywords.",
     "الـ <b><bdi dir=\"ltr\">keyword&nbsp;=&nbsp;value</bdi></b> الميزة إن الـ fields بتوصف نفسها وبتسمح إن فيه fields تبقى ناقصة، والعيب إن الـ keywords بتضيّع مساحة."
    ],
    [
     "Record methods: (1) <b>fixed-length records with fixed-length fields</b>; (2) <b>fixed-length records with variable-length fields</b> (delimited or length-indicator fields, padded to the fixed record size); (3) <b>each record begins with a length indicator</b> (byte count): <code>3387359|CARROLL|ALICE IN WONDERLAND</code> → 5+1+7+1+19 = 33.",
     "طرق الـ records هي (1) الـ <b>fixed-length records بـ fixed-length fields</b>، و(2) الـ <b>fixed-length records بـ variable-length fields</b> (بـ delimiters أو length indicators ونعمل padding للحجم الثابت)، و(3) <b>كل record بيبدأ بـ length indicator</b> (عدد الـ bytes). مثال الـ slide طوله:<span class=\"ltr\">5 + 1 + 7 + 1 + 19 = 33</span>"
    ],
    [
     "<b>Fixed-length record</b>: + easy to jump to the i-th record; − wastes space with padding. <b>Variable-length record</b>: + saves space when record sizes are diverse; − cannot jump to the i-th record unless through an <b>index file</b>.",
     "الـ <b>Fixed-length record</b> ميزته إنه سهل تنط للـ record رقم i، وعيبه الـ padding. والـ <b>Variable-length record</b> بيوفر مساحة لما أحجام الـ records تبقى مختلفة، بس مش هتقدر تنط للـ record رقم i إلا عن طريق <b>index file</b>."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Keys, access and seeking",
   "ar_h": "الـ keys والـ access والـ seeking",
   "pts": [
    [
     "<b>Primary key</b>: uniquely identifies a record and does not change. <b>Secondary key</b>: used for searching, does not typically identify a record uniquely.",
     "الـ <b>Primary key</b> بيميّز الـ record بشكل unique ومش بيتغير. والـ <b>Secondary key</b> بنستخدمه في البحث بس عادةً مش unique."
    ],
    [
     "<b>Sequential search</b>: read in order until a match, <b>O(n)</b>; good for pattern matching or files with few records. <b>Direct access</b>: seek straight to the record, <b>O(1)</b>, possible when we know the <b>RRN</b> (first record = RRN 0).",
     "الـ <b>Sequential search</b> بنقرا بالترتيب لحد ما نلاقي، وده <bdi dir=\"ltr\">O(n)</bdi> ومناسب للـ pattern matching أو الـ files الصغيرة. والـ <b>Direct access</b> بنعمل seek على طول للـ record، وده <bdi dir=\"ltr\">O(1)</bdi> وينفع لما نعرف الـ <b>RRN</b> (أول record رقمه 0)."
    ],
    [
     "Fixed-length records: <b>byte offset = RRN × record size</b>. E.g. 40-byte records, RRN 5 → 200.",
     "في الـ fixed-length records الـ <b>byte offset</b> بيتحسب كده، ومثلًا records حجمها 40 والـ RRN بتاعه 5:<span class=\"ltr\">offset = RRN × record size = 5 × 40 = 200</span>"
    ],
    [
     "C: <code>fseek(FILE *stream, long offset, int origin)</code>, origin <b>0 = beginning, 1 = current, 2 = end</b>. <code>fseek(infile,0L,0)</code> start, <code>fseek(infile,0L,2)</code> end, <code>fseek(infile,-10L,1)</code> back 10 bytes. Generic: <code>Seek(infile, 3030)</code> moves to byte 3030.",
     "في C بنستخدم <code>fseek</code> والـ origin قيمته 0 للبداية و 1 للمكان الحالي و 2 للنهاية. أمثلة:<pre>fseek(infile,0L,0);   // start\nfseek(infile,0L,2);   // end\nfseek(infile,-10L,1); // back 10</pre>وبشكل عام <bdi dir=\"ltr\">Seek(infile,&nbsp;3030)</bdi> بتنقلك للـ byte رقم 3030."
    ],
    [
     "C++: an fstream has two pointers: <code>seekg</code> moves the <b>get</b> (read) pointer, <code>seekp</code> the <b>put</b> (write) pointer; origins <code>ios::beg</code>, <code>ios::cur</code>, <code>ios::end</code>. <code>tellg</code> after <code>seekg(0, ios::end)</code> = file size (copy with no loops: one read + one write). Update by RRN: <code>file.seekp(RRN*sizeof(newItem), ios::beg)</code> then <code>write</code>.",
     "في <bdi dir=\"ltr\">C++</bdi> الـ fstream ليه pointer-ين، الـ <code>seekg</code> بيحرك الـ <b>get</b> pointer (القراية) والـ <code>seekp</code> بيحرك الـ <b>put</b> pointer (الكتابة)، والـ origins هي <code>ios::beg</code> و <code>ios::cur</code> و <code>ios::end</code>. ولو عملت <code>seekg</code> للآخر فالـ <code>tellg</code> بتديك حجم الـ file (فكرة النسخ من غير loops). وتعديل record بالـ RRN بيبقى:<pre>file.seekp(RRN*sizeof(newItem),\n           ios::beg);\nfile.write((char*)&amp;newItem,\n           sizeof(newItem));</pre>"
    ]
   ]
  },
  {
   "lec": 3,
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل في إيه",
   "pts": [
    [
     "Fill the blank: in a stream file structure, information is written as a stream of bytes containing ……… → <b>No added information</b> (Midterm Model C).",
     "أكمل: في الـ stream file الـ bytes بتتكتب ومعاها ……… والإجابة <b>No added information</b> <bdi dir=\"ltr\">(Midterm Model C)</bdi>"
    ],
    [
     "Complexities: direct access → <b>O(1)</b> (Model B); sequential access → <b>O(n)</b> (Model A); binary search → <b>O(log₂ n)</b> (Model C).",
     "أسئلة الـ complexity: الـ direct access بيبقى <bdi dir=\"ltr\">O(1)</bdi> والـ sequential access بيبقى <bdi dir=\"ltr\">O(n)</bdi> والـ binary search بيبقى <bdi dir=\"ltr\">O(log₂&nbsp;n)</bdi>."
    ],
    [
     "Essay: \"many ways of adding structure to files to maintain the identity of fields\": list the 4 field structures with advantages and disadvantages.",
     "سؤال مقالي: اذكر الطرق اللي بنضيف بيها structure للـ files عشان نحافظ على هوية الـ fields، يعني الـ 4 field structures بمميزاتهم وعيوبهم."
    ],
    [
     "Code (Quiz 3): copy a file with no loops (<code>seekg</code> end + <code>tellg</code>), and <code>UpdateRecord</code> by RRN in a fixed-length field, fixed-length record file.",
     "كود (Quiz 3): انسخ file من غير loops باستخدام <code>seekg</code> و <code>tellg</code>، واكتب <code>UpdateRecord</code> بالـ RRN في file كله fixed-length."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Heap and sorted files",
   "ar_h": "الـ heap والـ sorted files",
   "pts": [
    [
     "A file organization defines the <b>record placement strategy</b> and how a record's <b>key value</b> relates to its <b>relative address</b>. Efficiency is measured by the <b>number of disk accesses</b>. <b>Sequential search</b> is O(n); <b>direct access</b> is O(1).",
     "الـ file organization بتحدد <b>record placement strategy</b> والعلاقة بين الـ <b>key value</b> والـ <b>relative address</b>. والكفاءة بتتقاس بـ <b>عدد الـ disk accesses</b>. الـ <b>sequential search</b> بيبقى <bdi dir=\"ltr\">O(n)</bdi> والـ <b>direct access</b> بيبقى <bdi dir=\"ltr\">O(1)</bdi>."
    ],
    [
     "<b>Unordered (heap, pile) file</b>: records in <b>order of entry</b>, regardless of key. Retrieve only by <b>linear search</b>. Insert <b>at the end</b> (one access to read the last page, one to write it back). Serious disadvantage: it <b>allows duplicates</b>. Delete: find the record, delete it <b>physically or logically</b>, write it back.",
     "الـ <b>unordered (heap, pile) file</b>: الـ records بـ <b>ترتيب الإدخال</b> بغض النظر عن الـ key. القراية بـ <b>linear search</b> بس. الـ insert <b>في الآخر</b> (access نقرا آخر page وaccess نكتبها). العيب الكبير إنه <b>بيسمح بالتكرار</b>. الـ delete: نلاقي الـ record ونمسحه <b>physically أو logically</b> ونكتبه تاني."
    ],
    [
     "<b>Ordered (sequential) file</b>: records in order of the <b>key value</b>. Insert goes into an exact position, so <b>all records with a greater key move one location towards the end</b>; delete and update need the opposite. Example: inserting (4, Ali, CS) into 1, 2, 3, 5 puts it at offset 60 and shifts Ahmed (5) to 80.",
     "الـ <b>ordered (sequential) file</b>: الـ records بترتيب الـ <b>key value</b>. الـ insert بيروح في مكان محدد، فـ <b>كل الـ records اللي الـ key بتاعها أكبر بتتزق مكان ناحية الآخر</b>؛ والـ delete والـ update العكس. مثال: إدخال <bdi dir=\"ltr\">(4, Ali, CS)</bdi> في 1، 2، 3، 5 بيحطه عند offset 60 ويزق Ahmed (5) لـ 80."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "The cost table (memorize it)",
   "ar_h": "جدول التكلفة (احفظه)",
   "pts": [
    [
     "Symbols: <b>B</b> = data pages, <b>R</b> = records per page, <b>D</b> = time to read/write a page, <b>C</b> = time to process a record.",
     "الرموز: <b>B</b> عدد الـ data pages، و<b>R</b> عدد الـ records في الـ page، و<b>D</b> وقت قراية أو كتابة page، و<b>C</b> وقت معالجة record."
    ],
    [
     "<b>Heap file</b><br>• Scan: <b>B(D + RC)</b><br>• Equality search: <b>0.5B(D + RC)</b><br>• Range search: <b>B(D + RC)</b><br>• Insert: <b>2D + C</b><br>• Delete: <b>search + C + D</b>",
     "<b>Heap file</b><br>• Scan: <bdi dir=\"ltr\"><b>B(D + RC)</b></bdi><br>• Equality search: <bdi dir=\"ltr\"><b>0.5B(D + RC)</b></bdi><br>• Range search: <bdi dir=\"ltr\"><b>B(D + RC)</b></bdi><br>• Insert: <bdi dir=\"ltr\"><b>2D + C</b></bdi><br>• Delete: <bdi dir=\"ltr\"><b>search + C + D</b></bdi>"
    ],
    [
     "<b>Sorted file</b><br>• Scan: <b>B(D + RC)</b><br>• Equality search: <b>D·log₂B + C·log₂R</b><br>• Range search: <b>search + retrieve matches</b><br>• Insert: <b>search + 2 × (0.5B(D + RC))</b><br>• Delete: <b>search + 2 × (0.5B(D + RC))</b>",
     "<b>Sorted file</b><br>• Scan: <bdi dir=\"ltr\"><b>B(D + RC)</b></bdi><br>• Equality search: <bdi dir=\"ltr\"><b>D·log₂B + C·log₂R</b></bdi><br>• Range search: <bdi dir=\"ltr\"><b>search + retrieve matches</b></bdi><br>• Insert: <bdi dir=\"ltr\"><b>search + 2 × (0.5B(D + RC))</b></bdi><br>• Delete: <bdi dir=\"ltr\"><b>search + 2 × (0.5B(D + RC))</b></bdi>"
    ],
    [
     "<b>Hashed file</b> (from the same table)<br>• Scan: <b>1.25B(D + RC)</b>, because buckets are kept about 80% full<br>• Equality search: <b>H + D + 0.5RC</b><br>• Range search: <b>1.25B(D + RC)</b><br>• Insert and delete: <b>search + C + D</b>",
     "<b>Hashed file</b> (من نفس الجدول)<br>• Scan: <bdi dir=\"ltr\"><b>1.25B(D + RC)</b></bdi>، لأن الـ buckets بتبقى مليانة حوالي 80%<br>• Equality search: <bdi dir=\"ltr\"><b>H + D + 0.5RC</b></bdi><br>• Range search: <bdi dir=\"ltr\"><b>1.25B(D + RC)</b></bdi><br>• Insert وDelete: <bdi dir=\"ltr\"><b>search + C + D</b></bdi>"
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Why each cost looks that way",
   "ar_h": "ليه كل تكلفة شكلها كده",
   "pts": [
    [
     "<b>Heap equality search</b>: no order, so pages are read one by one; on average the record is halfway, so <b>0.5B</b> pages. If nothing matches, the whole file is scanned.",
     "الـ <b>heap equality search</b>: مفيش ترتيب، فبنقرا الـ pages واحدة واحدة؛ وفي المتوسط الـ record في النص، يعني <bdi dir=\"ltr\"><b>0.5B</b></bdi> pages. ولو مفيش تطابق بنعدّي على الملف كله."
    ],
    [
     "<b>Heap insert 2D + C</b>: D to read the last page, C to add the record, D to write it back. No search.",
     "الـ <b>heap insert</b> <bdi dir=\"ltr\"><b>2D + C</b></bdi>: D نقرا آخر page، وC نضيف الـ record، وD نكتبها تاني. من غير search."
    ],
    [
     "<b>Sorted equality search</b>: binary search over the pages (D·log₂B), then binary search inside the page (C·log₂R).",
     "الـ <b>sorted equality search</b>: binary search على الـ pages <bdi dir=\"ltr\">(D·log₂B)</bdi>، وبعدين binary search جوّا الـ page <bdi dir=\"ltr\">(C·log₂R)</bdi>."
    ],
    [
     "<b>Sorted insert/delete</b>: after the search, later records shift, so half the file (<b>0.5B</b> pages) is read <b>and</b> written back, hence × 2. Exams expand it: <b>Dlog₂B + Clog₂R + B(D + RC)</b>.",
     "الـ <b>sorted insert/delete</b>: بعد الـ search الـ records اللي بعده بتتزق، فبنقرا نص الملف <bdi dir=\"ltr\">(<b>0.5B</b> pages)</bdi> <b>ونكتبه</b> تاني، وعشان كده × 2. والامتحانات بتكتبها: <bdi dir=\"ltr\"><b>Dlog₂B + Clog₂R + B(D + RC)</b></bdi>."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل في إيه",
   "pts": [
    [
     "The 2026/27 midterm asked this table directly: heap scan, equality search and insert; sorted scan, equality search, insert and delete; and \"files of unordered records are called\" → <b>heap files</b>.",
     "ميدترم 2026/27 سأل من الجدول ده مباشرة: الـ heap (scan وequality search وinsert) والـ sorted (scan وequality search وinsert وdelete)، و«files of unordered records are called» إجابتها <b>heap files</b>."
    ],
    [
     "The wrong choices are other rows of the table: <b>2D + C</b> is the heap insert, <b>1.25B(D + RC)</b> is the hashed scan, and <b>Dlog₂B + Clog₂R + 2D + C</b> matches no operation at all.",
     "الاختيارات الغلط صفوف تانية من الجدول: <bdi dir=\"ltr\"><b>2D + C</b></bdi> دي الـ heap insert، و<bdi dir=\"ltr\"><b>1.25B(D + RC)</b></bdi> دي الـ hashed scan، و<bdi dir=\"ltr\"><b>Dlog₂B + Clog₂R + 2D + C</b></bdi> مش بتطابق أي operation."
    ]
   ]
  }
 ]
};

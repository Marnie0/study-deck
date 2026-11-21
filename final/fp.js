// Final-exam revision for fp: every lecture, exam-focused summary in English and Egyptian Arabic per point. Merged by build.mjs.
window.FINAL = window.FINAL || {};
FINAL.fp = {
 "lecs": [
  1,
  2,
  3,
  4,
  5
 ],
 "scope": "All 5 lectures",
 "scope_ar": "كل الـ 5 محاضرات",
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
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "MCQ (Midterm 2022/23 Model C): \"Files are managed by system software: ………\" → <b>Both OS and DBMS</b> (MIS is the distractor).",
     "سؤال اختيار <bdi dir=\"ltr\">(Midterm 2022/23 Model C)</bdi>: الـ files بيديرها system software مين؟ الإجابة <b>الاتنين، الـ OS والـ DBMS</b>، والـ MIS هو الاختيار الغلط."
    ],
    [
     "MCQ (Midterm 2022/23 Model B): \"File organization methods must provide ………\" → <b>fast access time and good space utilization</b>; the distractors are the three file <i>management</i> tasks.",
     "سؤال اختيار <bdi dir=\"ltr\">(Midterm 2022/23 Model B)</bdi>: الـ file organization methods لازم تدي إيه؟ الإجابة <b>fast access time و good space utilization</b>، والاختيارات الغلط هي مهام الـ file <i>management</i> التلاتة."
    ],
    [
     "Written (Midterm 2022/23 Model C): \"Mention the main differences between physical file and logical file\" (bytes on disk with a physical name, used once vs channel with a logical name, used many times).",
     "سؤال مقالي <bdi dir=\"ltr\">(Midterm 2022/23 Model C)</bdi>: اذكر الفروق بين الـ physical file والـ logical file. الأول bytes على الـ disk ليها physical name وبيتستخدم مرة، والتاني قناة ليها logical name وبيتستخدم مرات كتير."
    ],
    [
     "Code (Midterm 2022/23 Model B): write C/C++ file code with open, read, write and close, e.g. copy <code>src.txt</code> to <code>dest.txt</code> with one <code>read</code> and one <code>write</code>, no loops.",
     "سؤال كود <bdi dir=\"ltr\">(Midterm 2022/23 Model B)</bdi>: تكتب كود file في C أو <bdi dir=\"ltr\">C++</bdi> فيه open و read و write و close، زي إنك تنسخ <code>src.txt</code> لـ <code>dest.txt</code> بـ read واحدة و write واحدة من غير loops."
    ],
    [
     "Midterm 2026/27 MCQs: \"The structures of file are\" → <b>Both</b> (physical and logical; stream is an L3 distractor); <code>fputs()</code> → <b>write a line to a file</b> (fgetc reads a char, fgets reads a line, fputc writes a char); \"reposition the file pointer\" → <b>seekg()</b> (changep, moveg, go_p do not exist).",
     "أسئلة اختيار في <bdi dir=\"ltr\">Midterm 2026/27</bdi>: الـ structures بتاعة الـ file هي <b>الاتنين</b> (الـ physical والـ logical، والـ stream ده distractor من L3). والـ <code>fputs()</code> بتعمل <b>write لـ line في الـ file</b> (الـ fgetc بتقرا character، والـ fgets بتقرا line، والـ fputc بتكتب character). واللي بيحرك الـ file pointer هو <b>seekg()</b>، والـ changep والـ moveg والـ go_p مش موجودين أصلًا."
    ],
    [
     "Midterm 2026/27 MCQs: correct opening syntax → <b>FILE *fopen(filename, mode)</b> (no mode, the name <code>open</code>, or returning FILE by value are wrong); \"not used as a file opening mode\" → <b>ios::trunc</b> (the confirmed key, although all four flags are in the L1 list).",
     "أسئلة اختيار في <bdi dir=\"ltr\">Midterm 2026/27</bdi>: الـ syntax الصح لفتح file هو <bdi dir=\"ltr\"><b>FILE *fopen(filename, mode)</b></bdi>، واللي من غير mode أو باسم <code>open</code> أو بيرجع FILE من غير pointer غلط. وسؤال «not used as a file opening mode» إجابته <b>ios::trunc</b>، ودي الإجابة المؤكدة رغم إن الـ 4 flags موجودين في list المحاضرة."
    ],
    [
     "Midterm 2026/27: \"EOF is an integer defined in stdio.h with the value ……\" → <b>−1</b>. Traps: <b>NULL</b> is what <code>fopen</code> returns on failure, and <b>0</b> is what <code>fread</code> returns at end of file. The notes use EOF in the readASCII loop but do not print its value; −1 is the C standard value ‡.",
     "في <bdi dir=\"ltr\">Midterm 2026/27</bdi>: قيمة الـ EOF اللي متعرفة في stdio.h هي <bdi dir=\"ltr\"><b>−1</b></bdi>. خلي بالك إن الـ <b>NULL</b> هو اللي الـ <code>fopen</code> بترجعه لو الفتح فشل، والـ <bdi dir=\"ltr\"><b>0</b></bdi> هو اللي الـ <code>fread</code> بترجعه في آخر الـ file. الـ notes بتستخدم الـ EOF في loop الـ readASCII بس مش بتكتب قيمته، والـ <bdi dir=\"ltr\">−1</bdi> دي قيمة الـ C standard ‡."
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
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Fill the blank (Midterm 2022/23 Models A and B): \"……… are used to carry, guide and move the read/write head\" → <b>Arms</b>; \"……… is the time to move the arm to the correct sector\" → <b>Seek time</b>; \"a cylinder can be accessed without ………\" → <b>moving the arm assembly</b>. Midterm 2026/27 asked the Arms and cylinder questions again.",
     "أكمل <bdi dir=\"ltr\">(Midterm 2022/23 Models A, B)</bdi>: اللي بيشيل الـ head ويوجهه ويحركه هو الـ <b>Arms</b>، والوقت اللي الـ arm بياخده عشان يروح للـ sector الصح هو الـ <b>Seek time</b>، والـ cylinder بيتقري من غير <b>تحريك الـ arm assembly</b>. والـ <bdi dir=\"ltr\">Midterm 2026/27</bdi> رجع سأل سؤال الـ Arms وسؤال الـ cylinder تاني."
    ],
    [
     "Short calculations as MCQs (Midterm 2022/23 Model A): cluster size (4 × 512 = 2048 B, the track size 64 × 512 is a distractor) and average latency (5000 rpm → 6 ms).",
     "حسابات صغيرة في الاختيار <bdi dir=\"ltr\">(Midterm 2022/23 Model A)</bdi>:<span class=\"ltr\">cluster = 4 × 512 = 2048 B (track = 64 × 512 is a trap)</span><span class=\"ltr\">5000 rpm → average latency = 6 ms</span>"
    ],
    [
     "Q2 disk problem (Midterm 2022/23, every model): given records, sector, track, cylinder height, tracks/surface, overhead, rpm and seek, find average latency, cylinder size, records per cylinder, sectors or tracks to save the file (round up), records/track for a blocking factor, total disk size, and the average time to read 2, 3 or 4 sectors.",
     "سؤال الـ disk في Q2 <bdi dir=\"ltr\">(Midterm 2022/23)</bdi> في كل model: بيديك الـ records والـ sector والـ track والـ cylinder height والـ tracks في الـ surface والـ overhead والـ rpm والـ seek، ويطلب الـ average latency، وحجم الـ cylinder، والـ records في الـ cylinder، والـ sectors أو الـ tracks اللي الـ file محتاجها (قرّب لفوق)، والـ records في الـ track لـ blocking factor معين، وحجم الـ disk كله، ومتوسط وقت قراية 2 أو 3 أو 4 sectors."
    ],
    [
     "Written: differences between seek time, rotational delay and transfer time (Midterm 2022/23 Model C); four techniques for \"network and CPU wait a long time for the disk\" (Model B).",
     "أسئلة مقالي: الفرق بين الـ seek time والـ rotational delay والـ transfer time <bdi dir=\"ltr\">(Midterm 2022/23 Model C)</bdi>، واذكر 4 حلول لمشكلة إن الـ network والـ CPU بيستنوا الـ disk كتير <bdi dir=\"ltr\">(Model B)</bdi>."
    ],
    [
     "Midterm 2026/27, the five components by definition: \"small part that moves above the platter\" → <b>R/W head</b>; \"circular disk on which magnetic data is stored\" → <b>Platter</b>; \"internal set of components containing the arms\" → <b>Arm assembly</b>; the spindle (holds and rotates the platters) is the usual distractor.",
     "في <bdi dir=\"ltr\">Midterm 2026/27</bdi> سأل عن الـ 5 components بالتعريف: الجزء الصغير اللي بيتحرك فوق الـ platter هو الـ <b>R/W head</b>، والـ disk الدايري اللي الداتا الـ magnetic متخزنة عليه هو الـ <b>Platter</b>، والمجموعة الداخلية اللي فيها الـ arms هي الـ <b>Arm assembly</b>. والـ spindle (اللي شايل الـ platters وبيلفّها) هو الـ distractor المعتاد."
    ],
    [
     "Midterm 2026/27, access time: it is divided into <b>three components</b>; \"time for the disk to rotate the sector under the head\" → <b>Rotational delay</b>; \"time for the head to pass over a block\" → <b>Transfer time</b>; \"time to move the arm to the correct cylinder\" → <b>Seek time</b>. Revolution time (a full turn) is the distractor.",
     "في <bdi dir=\"ltr\">Midterm 2026/27</bdi> عن الـ access time: بيتقسم لـ <b>3 components</b>. الوقت اللي الـ disk بيلف فيه لحد ما الـ sector ييجي تحت الـ head هو الـ <b>Rotational delay</b>، والوقت اللي الـ head بيعدّي فيه على الـ block هو الـ <b>Transfer time</b>، والوقت اللي الـ arm بيتحرك فيه للـ cylinder الصح هو الـ <b>Seek time</b>. والـ Revolution time (لفة كاملة) هو الـ distractor."
    ],
    [
     "Midterm 2026/27: \"The DBMS views the file as a series of\" → <b>Blocks</b> (clusters are the OS view); \"a disk with 20 surfaces has ___ heads\" → <b>20</b> (one head per surface; 10 is the platters); disk bottleneck techniques → <b>Both A and B</b> (striping and distributed processing, plus RAID; disk cache is also on the slide).",
     "في <bdi dir=\"ltr\">Midterm 2026/27</bdi>: الـ DBMS بيشوف الـ file كـ series من الـ <b>Blocks</b> (الـ clusters دي نظرة الـ OS). والـ disk اللي فيه <bdi dir=\"ltr\">20</bdi> surface فيه <bdi dir=\"ltr\"><b>20</b></bdi> head، لأن كل surface ليه head (والـ <bdi dir=\"ltr\">10</bdi> دي عدد الـ platters). وسؤال حلول الـ disk bottleneck إجابته <b>Both A and B</b>، يعني الـ striping والـ distributed processing ومعاهم الـ RAID، مع إن الـ disk cache كمان موجود على الـ slide."
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
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Fill the blank (Midterm 2022/23 Model C): in a stream file structure, information is written as a stream of bytes containing ……… → <b>No added information</b>.",
     "أكمل <bdi dir=\"ltr\">(Midterm 2022/23 Model C)</bdi>: في الـ stream file الـ bytes بتتكتب ومعاها ……… والإجابة <b>No added information</b>."
    ],
    [
     "Complexities (Midterm 2022/23): direct access → <b>O(1)</b> (Model B); sequential access → <b>O(n)</b> (Model A); binary search → <b>O(log₂ n)</b> (Model C).",
     "أسئلة الـ complexity <bdi dir=\"ltr\">(Midterm 2022/23)</bdi>: الـ direct access بيبقى <bdi dir=\"ltr\">O(1)</bdi> في Model B، والـ sequential access بيبقى <bdi dir=\"ltr\">O(n)</bdi> في Model A، والـ binary search بيبقى <bdi dir=\"ltr\">O(log₂&nbsp;n)</bdi> في Model C."
    ],
    [
     "Essay (Midterm 2022/23 Model A): \"many ways of adding structure to files to maintain the identity of fields\": list the 4 field structures with advantages and disadvantages.",
     "سؤال مقالي <bdi dir=\"ltr\">(Midterm 2022/23 Model A)</bdi>: اذكر الطرق اللي بنضيف بيها structure للـ files عشان نحافظ على هوية الـ fields، يعني الـ 4 field structures بمميزاتهم وعيوبهم."
    ],
    [
     "Code (Midterm 2022/23 Model B, Model C, and Quiz 3): copy a file with no loops (<code>seekg</code> end + <code>tellg</code>), and <code>UpdateRecord</code> by RRN in a fixed-length field, fixed-length record file (Model C).",
     "كود <bdi dir=\"ltr\">(Midterm 2022/23 Models B, C, Quiz 3)</bdi>: انسخ file من غير loops باستخدام <code>seekg</code> و <code>tellg</code>، واكتب <code>UpdateRecord</code> بالـ RRN في file كله fixed-length (ده سؤال Model C)."
    ],
    [
     "Midterm 2026/27 turned the field-structure table into four MCQs: \"easy to jump ahead to the end of the field\" → <b>Length indicator</b>; \"wastes space with padding\" → <b>Fixed</b>; \"self-describing, allows missing fields\" → <b>Keyword</b>; \"have to check every byte of the field\" → <b>Delimiter</b>. Learn each advantage and disadvantage with its structure.",
     "الـ <bdi dir=\"ltr\">Midterm 2026/27</bdi> حوّل جدول الـ field structures لـ 4 أسئلة اختيار: «سهل تنط لآخر الـ field» ده الـ <b>Length indicator</b>، و«بيضيّع مساحة في الـ padding» ده الـ <b>Fixed</b>، و«الـ fields بتوصف نفسها وتسمح بـ fields ناقصة» ده الـ <b>Keyword</b>، و«لازم تشيك على كل byte» ده الـ <b>Delimiter</b>. احفظ كل ميزة وكل عيب مع الـ structure بتاعه."
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
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Midterm 2022/23 MCQs on the cost table: heap insert → <b>2D + C</b> (Model A); hashed scan → <b>1.25B(D + RC)</b> (Models A and B); sorted delete → <b>Dlog₂B + Clog₂R + B(D + RC)</b> (Model B); heap equality search → <b>0.5B(D + RC)</b>, sorted scan → <b>B(D + RC)</b> and hash delete → <b>1.25B(D + RC) + C + D</b> (Model C).",
     "أسئلة اختيار على جدول التكلفة في <bdi dir=\"ltr\">Midterm 2022/23</bdi>: الـ heap insert هو <bdi dir=\"ltr\"><b>2D + C</b></bdi> في Model A، والـ hashed scan هو <bdi dir=\"ltr\"><b>1.25B(D + RC)</b></bdi> في Models A و B، والـ sorted delete هو <bdi dir=\"ltr\"><b>Dlog₂B + Clog₂R + B(D + RC)</b></bdi> في Model B. وفي Model C: الـ heap equality search هو <bdi dir=\"ltr\"><b>0.5B(D + RC)</b></bdi>، والـ sorted scan هو <bdi dir=\"ltr\"><b>B(D + RC)</b></bdi>، والـ hash delete هو <bdi dir=\"ltr\"><b>1.25B(D + RC) + C + D</b></bdi>."
    ],
    [
     "Midterm 2026/27 asked this table directly: heap scan, equality search and insert; sorted scan, equality search, insert and delete; and \"files of unordered records are called\" → <b>heap files</b>. It writes the sorted insert/delete as <b>Dlog2B + Clog2R + 2*(0.5B(D + RC))</b>.",
     "الـ <bdi dir=\"ltr\">Midterm 2026/27</bdi> سأل من الجدول ده مباشرة: الـ heap (scan وequality search وinsert) والـ sorted (scan وequality search وinsert وdelete)، و«files of unordered records are called» إجابتها <b>heap files</b>. وكتب الـ sorted insert والـ delete بالشكل ده:<span class=\"ltr\">Dlog2B + Clog2R + 2*(0.5B(D + RC))</span>"
    ],
    [
     "The wrong choices are other rows of the table: <b>2D + C</b> is the heap insert, <b>1.25B(D + RC)</b> is the hashed scan, <b>B(D + RC) + C + D</b> is a heap delete with a full scan, and <b>Dlog₂B + Clog₂R + 2D + C</b> matches no operation at all.",
     "الاختيارات الغلط صفوف تانية من الجدول: <bdi dir=\"ltr\"><b>2D + C</b></bdi> دي الـ heap insert، و<bdi dir=\"ltr\"><b>1.25B(D + RC)</b></bdi> دي الـ hashed scan، و<bdi dir=\"ltr\"><b>B(D + RC) + C + D</b></bdi> دي heap delete بـ scan كامل، و<bdi dir=\"ltr\"><b>Dlog₂B + Clog₂R + 2D + C</b></bdi> مش بتطابق أي operation."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Why hashing, and what it is",
   "ar_h": "ليه الـ hashing، وهو إيه",
   "pts": [
    [
     "<b>Hashing</b> is a searching technique for implementing <b>indexes</b>; its main motivation is to <b>improve search time</b>.",
     "الـ <b>Hashing</b> تكنيك search بنستخدمه في تنفيذ الـ <b>indexes</b>، والهدف الأساسي منه إنه <b>يحسّن الـ search time</b>."
    ],
    [
     "Search time: simple index with binary search <b>O(log N)</b>; B-tree <b>O(log<sub>k</sub> N)</b>; hashing <b>O(1)</b>. E.g. 1,000,000 keys: log₂ ≈ 20 steps, a B-tree with k = 100 → 3 levels, hashing → 1 address computation.",
     "الـ search time: الـ simple index بالـ binary search بيبقى <bdi dir=\"ltr\">O(log N)</bdi>، والـ B-tree <bdi dir=\"ltr\">O(log<sub>k</sub> N)</bdi>، والـ hashing <bdi dir=\"ltr\">O(1)</bdi>. مثلًا مع مليون key:<span class=\"ltr\">log₂ 1,000,000 ≈ 20 ; log₁₀₀ 1,000,000 = 3 ; hashing = 1</span>"
    ],
    [
     "Idea: discover the location of a key by <b>simply examining the key</b>, using a <b>hash function h(k)</b> that transforms a <b>key</b> into an <b>address</b>.",
     "الفكرة إنك تعرف مكان الـ key <b>بمجرد ما تبص على الـ key نفسه</b>، وده عن طريق <b>hash function</b> اسمها <bdi dir=\"ltr\">h(k)</bdi> بتحوّل الـ <b>key</b> لـ <b>address</b>."
    ],
    [
     "The <b>address space</b> is chosen beforehand: with 1000 available addresses, h maps all possible keys U to <b>{0, 1, …, 999}</b> (the largest address is 999, not 1000).",
     "الـ <b>address space</b> بيتحدد من الأول: لو عندنا <bdi dir=\"ltr\">1000</bdi> address، الـ h بتحوّل كل الـ keys الممكنة U لـ <bdi dir=\"ltr\"><b>{0, 1, …, 999}</b></bdi>، يعني أكبر address هو <bdi dir=\"ltr\">999</bdi> مش <bdi dir=\"ltr\">1000</bdi>."
    ],
    [
     "With hashing there is <b>no obvious connection between the key and the location</b>. When the address of each record is determined by a <b>mathematical algorithm</b>, this is <b>hashed</b> file organization (not sequential, not indexed).",
     "في الـ hashing <b>مفيش علاقة واضحة بين الـ key والـ location</b>. ولما الـ address بتاع كل record يتحسب بـ <b>mathematical algorithm</b> يبقى ده الـ <b>hashed</b> file organization، مش الـ sequential ولا الـ indexed."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Buckets, collisions and synonyms",
   "ar_h": "الـ buckets والـ collisions والـ synonyms",
   "pts": [
    [
     "<b>Bucket</b>: a unit of storage that can hold <b>one or more</b> records in a hash file (not a block, a disk page or a node).",
     "الـ <b>Bucket</b> هو unit of storage في الـ hash file بتشيل record <b>واحد أو أكتر</b>، ومش هو الـ block ولا الـ disk page ولا الـ node."
    ],
    [
     "<b>Collision</b>: two <b>different</b> keys are transformed into the <b>same address</b>. <b>Synonyms</b>: the keys that collide. Trap: collision is the <i>event</i>, synonyms are the <i>keys</i>.",
     "الـ <b>Collision</b> إن two keys <b>مختلفين</b> يتحولوا لـ <b>نفس الـ address</b>. والـ <b>Synonyms</b> هم الـ keys اللي عملوا collision. خلي بالك: الـ collision هو <i>الحدث</i>، والـ synonyms هم <i>الـ keys</i>."
    ],
    [
     "Worked check with the last step (remainder of the address-space size), h(k) = k mod 10: 25 → 5 and 45 → 5, so 25 and 45 are synonyms; 26 → 6 does not collide with them.",
     "مثال بآخر خطوة (باقي القسمة على حجم الـ address space)، والـ <bdi dir=\"ltr\">h(k) = k mod 10</bdi>:<span class=\"ltr\">25 mod 10 = 5 ; 45 mod 10 = 5 ; 26 mod 10 = 6</span>يعني الـ 25 والـ 45 synonyms، والـ 26 مش بيعمل معاهم collision."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "The simple hash function (method and code)",
   "ar_h": "الـ simple hash function (الطريقة والكود)",
   "pts": [
    [
     "<b>Step 1</b>: represent the key numerically, combining <b>pairs of characters</b> (ASCII codes). <b>Step 2</b>: <b>fold and add</b>, dividing by the prime <b>19937</b> to <b>prevent overflow</b>. <b>Step 3</b>: divide by the <b>address-space size</b> and use the <b>remainder</b> as the <b>home address</b>.",
     "<b>Step 1</b>: نمثّل الـ key كرقم بإننا ندمج كل <b>2 characters</b> مع بعض (الـ ASCII codes). <b>Step 2</b>: نعمل <b>fold and add</b> ونقسم على الـ prime <bdi dir=\"ltr\"><b>19937</b></bdi> عشان <b>نمنع الـ overflow</b>. <b>Step 3</b>: نقسم على <b>حجم الـ address space</b> وناخد <b>الباقي</b> كـ <b>home address</b>."
    ],
    [
     "Model answer for \"Write a C++ function to implement a simple hashing algorithm\" (12-character key, pairs multiplied as on the site): <code>int Hash(char key[12], int maxAddress){ int sum = 0; for (int j = 0; j &lt; 12; j += 2) sum += key[j] * key[j+1]; sum %= 19937; return sum % maxAddress; }</code>. The loop runs 6 times (j = 0, 2, …, 10).",
     "الـ model answer لسؤال «اكتب C++ function لـ simple hashing algorithm» (key طوله 12 character، وكل pair بيتضربوا زي الموقع):<pre>int Hash(char key[12],\n         int maxAddress){\n  int sum = 0;\n  for(int j=0; j&lt;12; j+=2)\n    sum += key[j] * key[j+1];\n  sum %= 19937;\n  return sum % maxAddress;\n}</pre>والـ loop بتلف <bdi dir=\"ltr\">6</bdi> مرات (<bdi dir=\"ltr\">j = 0, 2, …, 10</bdi>)."
    ],
    [
     "Worked example, 6-character key <code>ZZZZZZ</code> (Z = 90), maxAddress = 1000: pairs 90 × 90 = 8100, three times → sum = 24,300; 24,300 % 19937 = <b>4363</b> (the prime step matters here); 4363 % 1000 = home address <b>363</b>.",
     "مثال محلول، key من 6 characters هو <code>ZZZZZZ</code> (الـ Z قيمتها 90) والـ maxAddress بـ 1000:<span class=\"ltr\">90 × 90 = 8100 ; 3 × 8100 = 24300</span><span class=\"ltr\">24300 % 19937 = 4363</span><span class=\"ltr\">4363 % 1000 = 363 (home address)</span>هنا خطوة الـ prime فرقت فعلًا لأن الـ sum عدّى 19937."
    ],
    [
     "Traps: skipping <code>% 19937</code> gives 24,300 % 1000 = 300 (wrong); skipping <code>% maxAddress</code> gives 4363, outside 0..999; hashing does <b>not sort</b> or encrypt the keys.",
     "أخطاء مشهورة: لو نطيت <code>% 19937</code> هتطلع <bdi dir=\"ltr\">24300 % 1000 = 300</bdi> وده غلط، ولو نطيت <code>% maxAddress</code> هتطلع <bdi dir=\"ltr\">4363</bdi> وده برا <bdi dir=\"ltr\">0..999</bdi>. والـ hashing <b>مش بيرتب</b> الـ keys ومش بيعملهم encryption."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Hashed file costs",
   "ar_h": "تكلفة الـ hashed file",
   "pts": [
    [
     "<b>Hashed file</b> costs (B pages, R records/page, D per page, C per record, <b>H</b> = time to compute the hash)<br>• Scan: <b>1.25B(D + RC)</b><br>• Equality search: <b>H + D + 0.5RC</b><br>• Range search: <b>1.25B(D + RC)</b><br>• Insert: <b>search + C + D</b><br>• Delete: <b>search + C + D</b>",
     "تكلفة الـ <b>hashed file</b> (الـ B عدد الـ pages، والـ R الـ records في الـ page، والـ D لكل page، والـ C لكل record، والـ <b>H</b> وقت حساب الـ hash)<br>• Scan: <bdi dir=\"ltr\"><b>1.25B(D + RC)</b></bdi><br>• Equality search: <bdi dir=\"ltr\"><b>H + D + 0.5RC</b></bdi><br>• Range search: <bdi dir=\"ltr\"><b>1.25B(D + RC)</b></bdi><br>• Insert: <bdi dir=\"ltr\"><b>search + C + D</b></bdi><br>• Delete: <bdi dir=\"ltr\"><b>search + C + D</b></bdi>"
    ],
    [
     "Why: buckets are kept about <b>80% full</b>, so the data takes 1 / 0.8 = <b>1.25×</b> the pages (400 full pages → 500). Equality search computes h(k) (H), reads <b>one page</b> (D) and checks half its records (0.5RC). Hashing <b>destroys key order</b>, so a range search scans the whole file.",
     "ليه كده: الـ buckets بتبقى مليانة حوالي <b>80%</b>، فالداتا بتاخد <bdi dir=\"ltr\">1 / 0.8 = 1.25</bdi> ضعف الـ pages (يعني <bdi dir=\"ltr\">400</bdi> page مليانة تبقى <bdi dir=\"ltr\">500</bdi>). والـ equality search بيحسب <bdi dir=\"ltr\">h(k)</bdi> (الـ H) ويقرا <b>page واحدة</b> (الـ D) ويشيك على نص الـ records اللي فيها (الـ 0.5RC). والـ hashing <b>بيبوّظ ترتيب الـ keys</b>، فالـ range search لازم يعدّي على الملف كله."
    ],
    [
     "Worked: B = 100, R = 10, D = 20 ms, C = 1 ms, H = 2 ms. Scan = 1.25 × 100 × (20 + 10) = <b>3750 ms</b> (heap 3000). Equality = 2 + 20 + 5 = <b>27 ms</b> (heap 0.5 × 100 × 30 = 1500). Insert = 27 + 1 + 20 = <b>48 ms</b>.",
     "مثال محلول بالأرقام دي:<span class=\"ltr\">B = 100, R = 10, D = 20 ms, C = 1 ms, H = 2 ms</span><span class=\"ltr\">scan = 1.25 × 100 × (20 + 10) = 3750 ms (heap 3000)</span><span class=\"ltr\">equality = 2 + 20 + 5 = 27 ms (heap 1500)</span><span class=\"ltr\">insert = 27 + 1 + 20 = 48 ms</span>"
    ],
    [
     "Exam trap: the Model C answer writes the hashed delete as <b>1.25B(D + RC) + C + D</b>, using the hashed scan cost as its \"search\" term. Choose that form in the MCQ; the table's own search term is H + D + 0.5RC.",
     "فخ في الامتحان: الـ model answer بتاع Model C كاتب الـ hashed delete كده:<span class=\"ltr\">1.25B(D + RC) + C + D</span>يعني استخدم تكلفة الـ hashed scan مكان الـ search. اختار الشكل ده في الـ MCQ، مع إن الـ search في الجدول نفسه هو <bdi dir=\"ltr\">H + D + 0.5RC</bdi>."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "MCQ (Midterm 2022/23 Model B): \"The address of each record of a file is determined by a mathematical algorithm known as ………\" → <b>Hashed</b> (not Sequential, Indexed or None).",
     "سؤال اختيار <bdi dir=\"ltr\">(Midterm 2022/23 Model B)</bdi>: الـ address بتاع كل record بيتحدد بـ mathematical algorithm اسمه إيه؟ الإجابة <b>Hashed</b>، مش الـ Sequential ولا الـ Indexed ولا None."
    ],
    [
     "MCQ (Midterm 2022/23 Model C): \"A unit of storage that can store one or more records in a hash file organization is ………\" → <b>Buckets</b> (not disk pages, blocks or nodes).",
     "سؤال اختيار <bdi dir=\"ltr\">(Midterm 2022/23 Model C)</bdi>: الـ unit of storage اللي بتشيل record واحد أو أكتر في الـ hash file هي إيه؟ الإجابة <b>Buckets</b>، مش الـ disk pages ولا الـ blocks ولا الـ nodes."
    ],
    [
     "Written, 2 marks (Midterm 2022/23 Model A Q1-b): \"Write a C++ function to implement a simple hashing algorithm\": write the three steps as code (pairs, % 19937, % maxAddress).",
     "سؤال كود بدرجتين <bdi dir=\"ltr\">(Midterm 2022/23 Model A Q1-b)</bdi>: اكتب C++ function لـ simple hashing algorithm، يعني تكتب الـ 3 خطوات ككود: الـ pairs، وبعدين <bdi dir=\"ltr\">% 19937</bdi>، وبعدين <bdi dir=\"ltr\">% maxAddress</bdi>."
    ],
    [
     "The hashed-file costs were asked as MCQs among the Lecture 4 cost-table questions: scan <b>1.25B(D + RC)</b> (Models A and B) and delete <b>1.25B(D + RC) + C + D</b> (Model C); in Midterm 2026/27 \"Hash files\" was a distractor for \"files of unordered records\". That midterm covered Lectures 1 to 4 only, and this course has no past finals on the site.",
     "تكلفة الـ hashed file اتسألت كـ MCQ وسط أسئلة جدول التكلفة بتاع Lecture 4: الـ scan <bdi dir=\"ltr\"><b>1.25B(D + RC)</b></bdi> في Models A و B، والـ delete <bdi dir=\"ltr\"><b>1.25B(D + RC) + C + D</b></bdi> في Model C. وفي <bdi dir=\"ltr\">Midterm 2026/27</bdi> الـ «Hash files» كان distractor لسؤال الـ unordered records. الميدترم ده كان على المحاضرات من 1 لـ 4 بس، ومفيش امتحانات final قديمة للمادة دي على الموقع."
    ]
   ]
  }
 ]
};

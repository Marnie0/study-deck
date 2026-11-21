// Final-exam revision for os: every lecture, exam-focused summary in English and Egyptian Arabic per point. Merged by build.mjs.
window.FINAL = window.FINAL || {};
FINAL.os = {
 "lecs": [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
 ],
 "scope": "All 8 lectures",
 "scope_ar": "كل الـ 8 محاضرات",
 "sections": [
  {
   "lec": 1,
   "h": "OS basics: definition, goals, components and startup",
   "ar_h": "أساسيات الـ OS: التعريف والأهداف والمكونات والتشغيل",
   "pts": [
    [
     "<b>OS</b> = a program that acts as an <b>intermediary between the user and the computer hardware</b>. Two views: a <b>resource allocator</b> (manages all resources, decides between conflicting requests for efficient and fair use) and a <b>control program</b> (controls execution of programs to prevent errors and improper use). No universally accepted definition.",
     "الـ <b>OS</b> هو برنامج بيقف <b>وسيط بين الـ user والـ hardware</b>. وليه نظرتين: <b>resource allocator</b> (بيدير كل الـ resources ويحكم بين الطلبات المتعارضة عشان الاستخدام يبقى efficient وعادل)، و<b>control program</b> (بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط). ومفيش تعريف واحد متفق عليه."
    ],
    [
     "<b>3 goals</b>: (1) execute user programs and make solving user problems easier; (2) make the system <b>convenient</b> to use; (3) use the hardware in an <b>efficient</b> manner.",
     "<b>الأهداف التلاتة</b>: (1) يشغّل برامج الـ user ويسهّل حل مشاكله، (2) يخلّي السيستم <b>convenient</b> في الاستخدام، (3) يستخدم الـ hardware بطريقة <b>efficient</b>."
    ],
    [
     "<b>4 components</b>: <b>hardware</b> (basic computing resources: CPU, memory, I/O devices), <b>operating system</b> (controls and coordinates hardware use among applications and users), <b>application programs</b> (word processors, compilers, web browsers, database systems, video games), <b>users</b> (people, machines, other computers).",
     "<b>المكونات الأربعة</b>: الـ <b>hardware</b> (الـ resources الأساسية زي الـ CPU والـ memory والـ <bdi dir=\"ltr\">I/O&nbsp;devices</bdi>)، والـ <b>operating system</b> (بيتحكم وينسّق استخدام الـ hardware بين الـ applications والـ users)، والـ <b>application programs</b> (زي الـ word processors والـ compilers والـ web browsers والـ database systems والـ video games)، والـ <b>users</b> (ناس أو أجهزة أو كمبيوترات تانية)."
    ],
    [
     "<b>Kernel</b> = the one program running at all times; everything else is a <b>system program</b> or an <b>application program</b> (trap: the kernel is <i>not</i> all the programs). <b>Bootstrap program</b>: loaded at power-up or reboot, stored in <b>ROM or EPROM (firmware)</b>, not RAM; initializes the system, <b>loads the kernel and starts it</b>.",
     "الـ <b>Kernel</b> هو البرنامج الوحيد اللي شغال طول الوقت، وأي حاجة تانية يا <b>system program</b> يا <b>application program</b> (خد بالك: الـ kernel <i>مش</i> هو كل البرامج). والـ <b>Bootstrap program</b> بيتحمّل لما الجهاز يشتغل أو يعمل reboot، ومتخزن في <b>ROM أو EPROM (الـ firmware)</b> مش في الـ RAM؛ بيعمل initialize للسيستم و<b>يحمّل الـ kernel ويشغّله</b>."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Interrupts, I/O, storage and DMA",
   "ar_h": "الـ Interrupts والـ storage والـ DMA",
   "pts": [
    [
     "A device controller (with its <b>local buffer</b>) signals it has finished with an <b>interrupt</b>; control goes to the <b>interrupt service routine</b> through the <b>interrupt vector</b> (addresses of all service routines), saving the address of the interrupted instruction. The type is found by <b>polling</b> or a <b>vectored interrupt system</b>.",
     "الـ device controller (وعنده <b>local buffer</b>) بيبلّغ إنه خلّص بـ <b>interrupt</b>؛ والتحكم بيروح للـ <b>interrupt service routine</b> عن طريق الـ <b>interrupt vector</b> (فيه عناوين كل الـ service routines)، وعنوان الـ instruction اللي اتقاطعت بيتحفظ. ونوع الـ interrupt بيتعرف بالـ <b>polling</b> أو بالـ <b>vectored interrupt system</b>."
    ],
    [
     "<b>Trap (exception)</b> = a <b>software-generated</b> interrupt caused by an <b>error</b> (division by zero) or a <b>user request</b> (system call); synchronous. A normal <b>interrupt</b> usually comes from hardware and is asynchronous. So interrupts can be triggered by hardware <i>or</i> software; the OS is <b>interrupt driven</b>.",
     "الـ <b>Trap (exception)</b> هو interrupt <b>جاي من الـ software</b>، سببه <b>error</b> (زي القسمة على صفر) أو <b>طلب من الـ user</b> (system call)، وهو synchronous. أما الـ <b>interrupt</b> العادي فغالبًا من الـ hardware وهو asynchronous. يعني الـ interrupts ممكن تيجي من الـ hardware <i>أو</i> الـ software، والـ OS هو <b>interrupt driven</b>."
    ],
    [
     "<b>Synchronous I/O</b>: control returns to the user program only upon I/O completion (at most one request outstanding). <b>Asynchronous I/O</b>: control returns without waiting; the OS uses the <b>device-status table</b> (type, address and state of each device).",
     "في الـ <b><bdi dir=\"ltr\">Synchronous&nbsp;I/O</bdi></b> التحكم بيرجع لبرنامج الـ user بس لما الـ <bdi dir=\"ltr\">I/O</bdi> يخلص (request واحد بالكتير مستني). وفي الـ <b><bdi dir=\"ltr\">Asynchronous&nbsp;I/O</bdi></b> التحكم بيرجع من غير ما يستنى، والـ OS بيستخدم الـ <b>device-status table</b> (فيها نوع وعنوان وحالة كل جهاز)."
    ],
    [
     "Units: <b>bit</b> (0 or 1); <b>byte</b> = 8 bits (smallest convenient chunk); <b>word</b> = the architecture's native unit (64-bit registers → 64-bit, 8-byte words). KB = 1,024 B, MB = 1,024² B, GB = 1,024³ B, TB = 1,024⁴ B, PB = 1,024⁵ B. Example: 2 KB = 2 × 1,024 = 2,048 B. Networking is measured in <b>bits</b>.",
     "الوحدات: الـ <b>bit</b> (صفر أو واحد)، والـ <b>byte</b> فيه 8 bits (أصغر حتة مريحة)، والـ <b>word</b> هي الوحدة الأساسية للـ architecture (لو الـ registers <bdi dir=\"ltr\">64-bit</bdi> يبقى الـ word فيها 8 bytes). والقيم:<span class=\"ltr\">KB = 1,024 B, MB = 1,024² B, GB = 1,024³ B, TB = 1,024⁴ B, PB = 1,024⁵ B</span>مثال:<span class=\"ltr\">2 KB = 2 × 1,024 = 2,048 B</span>وقياسات الـ networking بالـ <b>bits</b> مش الـ bytes."
    ],
    [
     "<b>Main memory</b>: the only large storage the CPU accesses directly; random access; typically <b>volatile</b>. <b>Secondary storage</b>: large and <b>nonvolatile</b>. Hard disk: platters, tracks, sectors. <b>Solid-state disks</b>: faster than hard disks, nonvolatile.",
     "الـ <b>Main memory</b> هي الـ storage الكبير الوحيد اللي الـ CPU يوصله مباشرة، وهي random access وغالبًا <b>volatile</b>. والـ <b>Secondary storage</b> كبير و<b>nonvolatile</b>. والـ hard disk فيه platters متقسمة لـ tracks وكل track لـ sectors. والـ <b>Solid-state disks</b> أسرع من الـ hard disks وكمان nonvolatile."
    ],
    [
     "<b>Storage hierarchy</b> (fast, small, expensive → slow, large, cheap): registers → cache → main memory → solid-state disk → hard disk → optical disk → magnetic tapes; organized by <b>speed, cost, volatility</b>. Performance table: registers managed by the <b>compiler</b>, cache by <b>hardware</b>, main memory and disks by the <b>OS</b>. <b>Caching</b>: copy data in use to faster storage, check the cache first; cache size and replacement policy matter; multiprocessors need <b>cache coherency</b>.",
     "الـ <b>Storage hierarchy</b> من السريع الصغير الغالي للبطيء الكبير الرخيص:<span class=\"ltr\">registers → cache → main memory → solid-state disk → hard disk → optical disk → magnetic tapes</span>ومترتبة حسب <b>السرعة والتكلفة والـ volatility</b>. وفي جدول الـ performance الـ registers بيديرها الـ <b>compiler</b>، والـ cache بيديرها الـ <b>hardware</b>، والـ main memory والـ disks بيديرهم الـ <b>OS</b>. والـ <b>Caching</b> إنك تنسخ الداتا اللي بتستخدمها لـ storage أسرع وتدوّر في الـ cache الأول، وحجم الـ cache والـ replacement policy مهمين، والـ multiprocessors محتاجة <b>cache coherency</b>."
    ],
    [
     "<b>DMA</b>: for high-speed I/O devices; the controller moves <b>blocks</b> from its buffer directly to main memory <b>without CPU intervention</b>; <b>one interrupt per block</b>, not per byte. Example: 16 KB in 1 KB blocks → 16 interrupts instead of 16,384.",
     "الـ <b>DMA</b> للأجهزة السريعة: الـ controller بينقل <b>blocks</b> من الـ buffer للـ main memory مباشرة <b>من غير تدخل الـ CPU</b>، و<b>interrupt واحد لكل block</b> مش لكل byte. مثال:<span class=\"ltr\">16 KB / 1 KB = 16 interrupts (instead of 16 × 1,024 = 16,384)</span>"
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Architecture, dual mode and OS management",
   "ar_h": "الـ Architecture والـ dual mode وإدارة الـ OS",
   "pts": [
    [
     "<b>Multiprocessors</b> (parallel or tightly-coupled systems): increased throughput, economy of scale, increased reliability. <b>Asymmetric</b>: each processor is assigned a specific task; <b>symmetric (SMP)</b>: each processor performs all tasks. <b>Multiprogramming</b> (batch) keeps several jobs in memory (<b>job scheduling</b>) and switches when one waits; <b>timesharing</b> switches so often users interact (response &lt; 1 second) using <b>CPU scheduling</b>, <b>swapping</b> and <b>virtual memory</b>.",
     "الـ <b>Multiprocessors</b> (اسمها parallel أو tightly-coupled systems) مميزاتها الـ increased throughput والـ economy of scale والـ increased reliability. في الـ <b>Asymmetric</b> كل processor ليه task معينة، وفي الـ <b>symmetric (SMP)</b> كل processor بيعمل كل الـ tasks. والـ <b>Multiprogramming</b> (batch) بيحط كذا job في الـ memory ويختار بالـ <b>job scheduling</b> ويبدّل لما job تستنى، أما الـ <b>timesharing</b> فبيبدّل بسرعة لدرجة إن الـ users يتفاعلوا (الـ response أقل من ثانية) وبيستخدم الـ <b>CPU scheduling</b> والـ <b>swapping</b> والـ <b>virtual memory</b>."
    ],
    [
     "<b>Dual mode</b>: a hardware <b>mode bit</b>, kernel = 0, user = 1; <b>privileged</b> instructions run only in kernel mode; a system call traps (bit 0) and the return resets it (bit 1). <b>Timer</b>: set by a privileged instruction, a counter decremented by the clock, interrupt at zero; prevents infinite loops and processes hogging resources.",
     "الـ <b>Dual mode</b>: فيه <b>mode bit</b> من الـ hardware، قيمته <bdi dir=\"ltr\">0</bdi> في الـ kernel و<bdi dir=\"ltr\">1</bdi> في الـ user. والـ <b>privileged</b> instructions بتتنفذ في الـ kernel mode بس، والـ system call بيعمل trap (الـ bit يبقى <bdi dir=\"ltr\">0</bdi>) والرجوع بيرجّعه <bdi dir=\"ltr\">1</bdi>. والـ <b>Timer</b> بيتظبط بـ privileged instruction، وهو عداد بيقل مع الـ clock ويعمل interrupt لما يوصل صفر، عشان يمنع الـ infinite loops وإن process تحتكر الـ resources."
    ],
    [
     "Management activities: <b>process</b> (create and delete, suspend and resume, synchronization, communication, deadlock handling); <b>memory</b> (track which parts are used and by whom, move processes in and out, <b>allocate and deallocate</b> space); <b>file system</b> (create and delete files and directories, map onto secondary storage, backup); <b>mass storage</b> (free-space management, storage allocation, disk scheduling). I/O subsystem: <b>buffering</b> (temporary storage during transfer), <b>caching</b>, <b>spooling</b> (overlap output of one job with input of others).",
     "أنشطة الإدارة: الـ <b>process management</b> (إنشاء ومسح، وإيقاف واستكمال، والـ synchronization والـ communication والـ deadlock handling)، والـ <b>memory management</b> (يتابع أنهي أجزاء مستخدمة ومين بيستخدمها، ويدخّل ويطلّع الـ processes، و<b>يعمل allocate وdeallocate</b> للمساحة)، والـ <b>file-system management</b> (إنشاء ومسح الـ files والـ directories، والـ mapping على الـ secondary storage، والـ backup)، والـ <b>mass-storage management</b> (الـ free-space management والـ storage allocation والـ disk scheduling). والـ <bdi dir=\"ltr\">I/O</bdi> subsystem فيه الـ <b>buffering</b> (تخزين مؤقت أثناء النقل) والـ <b>caching</b> والـ <b>spooling</b> (تداخل الـ output بتاع job مع الـ input بتاع jobs تانية)."
    ],
    [
     "<b>Protection</b> = controlling access of processes or users to resources defined by the OS. <b>Security</b> = defense against internal and external attacks (denial-of-service, viruses, identity theft, theft of service). <b>User ID</b>, <b>group ID</b>, and <b>privilege escalation</b> (change to an effective ID with more rights).",
     "الـ <b>Protection</b> هي التحكم في وصول الـ processes أو الـ users للـ resources اللي الـ OS بيعرّفها. والـ <b>Security</b> هي الدفاع ضد الهجمات الداخلية والخارجية (زي الـ denial-of-service والـ viruses والـ identity theft والـ theft of service). وفيه الـ <b>user ID</b> والـ <b>group ID</b> والـ <b>privilege escalation</b> (إن الـ user يتحوّل لـ effective ID بصلاحيات أكتر)."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Memory MCQs (Final 2025/26, both repeated in Midterm 2026/27): the memory with more access speed that is also volatile → <b>SRAM</b>; the most common secondary storage device → <b>magnetic disk</b>. T/F (Final 2025/26): flash memory is slower than DRAM but needs no power to retain its contents → <b>True</b>; solid-state disks are generally faster than magnetic disks → <b>True</b>. T/F (Midterm 2026/27): solid-state disks are volatile storage → <b>False</b> (they are nonvolatile).",
     "أسئلة الـ memory الاختيارية (Final <bdi dir=\"ltr\">2025/26</bdi>، واتكرروا الاتنين في Midterm <bdi dir=\"ltr\">2026/27</bdi>): الـ memory الأسرع في الوصول للداتا واللي volatile هي الـ <b>SRAM</b>، وأشهر secondary storage هو الـ <b>magnetic disk</b>. وفي الصح والغلط (Final <bdi dir=\"ltr\">2025/26</bdi>): الـ flash memory أبطأ من الـ DRAM بس مش محتاجة كهربا عشان تحتفظ بالداتا، والإجابة <b>True</b>؛ والـ solid-state disks أسرع من الـ magnetic disks، والإجابة <b>True</b>. وفي Midterm <bdi dir=\"ltr\">2026/27</bdi>: الـ solid-state disks تعتبر volatile storage، والإجابة <b>False</b> (هي nonvolatile)."
    ],
    [
     "Definition traps (T/F, Final 2025/26): interrupts may be triggered by hardware or software → <b>True</b>; the kernel consists of all system and application programs → <b>False</b> (asked again in Midterm 2026/27); the bootstrap program is in RAM → <b>False</b> (ROM or EPROM).",
     "فخاخ التعريفات (صح وغلط، Final <bdi dir=\"ltr\">2025/26</bdi>): الـ interrupts ممكن تيجي من الـ hardware أو الـ software، والإجابة <b>True</b>؛ والـ kernel هو كل الـ system والـ application programs، والإجابة <b>False</b> (واتسأل تاني في Midterm <bdi dir=\"ltr\">2026/27</bdi>)؛ والـ bootstrap program موجود في الـ RAM، والإجابة <b>False</b> (هو في الـ ROM أو الـ EPROM)."
    ],
    [
     "OS activities (T/F, Final 2025/26): \"allocating and deallocating memory space as needed is <i>not</i> an OS activity\" → <b>False</b>: it is a memory-management activity.",
     "أنشطة الـ OS (صح وغلط، Final <bdi dir=\"ltr\">2025/26</bdi>): جملة \"الـ allocate والـ deallocate للـ memory <i>مش</i> من أنشطة الـ OS\"، والإجابة <b>False</b>، لأنها من أنشطة الـ memory management."
    ],
    [
     "Midterm 2026/27 MCQs answered from the notes: the one program running at all times → <b>kernel</b>; the two separate modes → <b>user mode and kernel mode</b>; \"What is an operating system?\" (interface between hardware and programs, service provider, collection of programs managing the hardware) → <b>all of the mentioned</b>; the unit of work in a system → <b>process</b>; OSs designed mainly to maximize resource utilization → <b>mainframe</b>; the objective of multiprogramming → <b>to increase CPU utilization</b>; T/F \"there is no universally accepted definition of an OS\" → <b>True</b>.",
     "أسئلة MCQ في Midterm <bdi dir=\"ltr\">2026/27</bdi> إجابتها من الـ notes: البرنامج الوحيد اللي شغال طول الوقت هو الـ <b>kernel</b>؛ والـ modes الاتنين هما الـ <b>user mode والـ kernel mode</b>؛ وسؤال \"يعني إيه operating system؟\" (interface بين الـ hardware والبرامج، وبيقدّم services، ومجموعة برامج بتدير الـ hardware) إجابته <b>all of the mentioned</b>؛ ووحدة الشغل في السيستم هي الـ <b>process</b>؛ والـ OS اللي معمول أساسًا عشان يعظّم استخدام الـ resources هو بتاع الـ <b>mainframe</b>؛ وهدف الـ multiprogramming هو <b>زيادة الـ CPU utilization</b>؛ وفي الصح والغلط \"مفيش تعريف واحد متفق عليه للـ OS\" والإجابة <b>True</b>."
    ],
    [
     "Midterm 2026/27 questions whose answers come from the textbook, not the notes: other names for kernel mode → privileged, supervisor and system mode (<b>all of the mentioned</b>); a boot block typically <b>only knows the location and length of the rest of the bootstrap program</b>; <b>system calls</b> provide the interface to OS services, and programmers typically use an <b>API</b> rather than calling them directly (<b>True</b>); a real-time system processes data <b>without delay</b> and each task <b>must be serviced by its deadline</b>; embedded computers typically run a <b>real-time</b> OS; <b>Windows</b> is not open source; <b>ROM</b> is the most basic non-volatile memory. ‡",
     "أسئلة في Midterm <bdi dir=\"ltr\">2026/27</bdi> إجابتها من الكتاب مش من الـ notes: أسامي تانية للـ kernel mode هي الـ privileged والـ supervisor والـ system mode، يعني <b>all of the mentioned</b>؛ والـ boot block غالبًا <b>بيعرف بس مكان وطول باقي الـ bootstrap program</b>؛ والـ <b>system calls</b> هي الـ interface لخدمات الـ OS، والمبرمجين غالبًا بيستخدموا <b>API</b> بدل ما ينادوها على طول (<b>True</b>)؛ والـ real-time system بيعالج الداتا <b>من غير تأخير</b> وكل task <b>لازم تتخدم قبل الـ deadline</b> بتاعها؛ والـ embedded computers غالبًا بتشغّل OS من نوع <b>real-time</b>؛ والـ <b>Windows</b> مش open source؛ والـ <b>ROM</b> هي أبسط non-volatile memory. ‡"
    ],
    [
     "Written questions in past papers: the <b>OS definition</b> (Final 2025/26 Q4-b, Final 2022/23, Midterm 2021/22: intermediary, resource allocator, control program, kernel); the <b>OS goals</b> (Final 2023/24); <b>trap vs interrupt</b> (Final 2021/22); <b>three services that enforce protection</b> between processes (Final 2021/22: dual mode with privileged instructions, memory protection with base and limit registers, the timer); <b>protection vs security</b>, the <b>four components</b> and <b>kernel vs user mode</b> (Midterm 2021/22). The DMA advantages question (Finals 2024/25, 2021/22) is in Lecture 8.",
     "الأسئلة المقالي في الامتحانات اللي فاتت: <b>تعريف الـ OS</b> (Final <bdi dir=\"ltr\">2025/26</bdi> <bdi dir=\"ltr\">Q4-b</bdi>، وFinal <bdi dir=\"ltr\">2022/23</bdi>، وMidterm <bdi dir=\"ltr\">2021/22</bdi>: وسيط، و resource allocator، و control program، والـ kernel)؛ و<b>أهداف الـ OS</b> (Final <bdi dir=\"ltr\">2023/24</bdi>)؛ والفرق بين الـ <b>trap والـ interrupt</b> (Final <bdi dir=\"ltr\">2021/22</bdi>)؛ و<b>تلات services بيحموا الـ processes من بعض</b> (Final <bdi dir=\"ltr\">2021/22</bdi>: الـ dual mode مع الـ privileged instructions، والـ memory protection بالـ base والـ limit registers، والـ timer)؛ والفرق بين الـ <b>protection والـ security</b>، و<b>المكونات الأربعة</b>، والفرق بين الـ <b>kernel والـ user mode</b> (Midterm <bdi dir=\"ltr\">2021/22</bdi>). وسؤال مميزات الـ DMA (Finals <bdi dir=\"ltr\">2024/25</bdi> و <bdi dir=\"ltr\">2021/22</bdi>) موجود في المحاضرة 8."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Process, its memory, states and PCB",
   "ar_h": "الـ Process وذاكرتها وحالاتها والـ PCB",
   "pts": [
    [
     "<b>Process</b> = a program in execution (progresses sequentially), an <b>active</b> entity. <b>Program</b> = a <b>passive</b> executable file on disk; it becomes a process when loaded into memory. One program can be several processes.",
     "الـ <b>Process</b> هي برنامج بيتنفذ (بالترتيب)، وهي entity <b>active</b>. والـ <b>Program</b> هو executable file <b>passive</b> على الـ disk، وبيبقى process لما يتحمّل في الـ memory. وبرنامج واحد ممكن يبقى كذا process."
    ],
    [
     "Process in memory (max → 0): <b>stack</b> (function parameters, return addresses, local variables; grows down), <b>heap</b> (dynamic: new, malloc; grows up), <b>data</b> (global and static variables), <b>text</b> (program code). Plus the <b>program counter</b> (next instruction) and registers.",
     "الـ process في الـ memory (من الـ max لصفر): الـ <b>stack</b> (الـ function parameters والـ return addresses والـ local variables، وبيكبر لتحت)، والـ <b>heap</b> (الـ memory الديناميكية زي <code>new</code> و<code>malloc</code>، وبيكبر لفوق)، والـ <b>data</b> (الـ global والـ static variables)، والـ <b>text</b> (الكود). ومعاهم الـ <b>program counter</b> (عنوان الـ instruction الجاية) والـ registers."
    ],
    [
     "<b>5 states</b>: new, <b>ready</b> (waiting to be assigned a processor), running, <b>waiting</b> (for I/O or an event), terminated. new →<i>admitted</i>→ ready →<i>scheduler dispatch</i>→ running; running →<i>interrupt</i>→ ready; running →<i>I/O or event wait</i>→ waiting →<i>completion</i>→ ready; running →<i>exit</i>→ terminated. On one CPU only <b>one process is running</b> at a time.",
     "الـ <b>5 states</b>: الـ new، والـ <b>ready</b> (مستنية processor)، والـ running، والـ <b>waiting</b> (مستنية <bdi dir=\"ltr\">I/O</bdi> أو event)، والـ terminated. والانتقالات:<span class=\"ltr\">new →admitted→ ready →scheduler dispatch→ running</span><span class=\"ltr\">running →interrupt→ ready</span><span class=\"ltr\">running →I/O or event wait→ waiting →completion→ ready</span><span class=\"ltr\">running →exit→ terminated</span>وعلى CPU واحد <b>process واحدة بس تبقى running</b> في أي لحظة."
    ],
    [
     "<b>PCB</b> (task control block): process state, process number, <b>program counter</b>, CPU registers, CPU-scheduling info (priorities, queue pointers), memory-management info, accounting info (CPU used, time elapsed, time limits), I/O status info (allocated devices, open files).",
     "الـ <b>PCB</b> (أو task control block) فيه الـ process state، والـ process number، والـ <b>program counter</b>، والـ CPU registers، والـ CPU-scheduling info (الـ priorities والـ queue pointers)، والـ memory-management info، والـ accounting info (الـ CPU المستخدم والوقت والـ time limits)، والـ <bdi dir=\"ltr\">I/O</bdi> status info (الأجهزة والـ open files)."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Scheduling and context switch",
   "ar_h": "الـ Scheduling والـ context switch",
   "pts": [
    [
     "Queues: <b>job queue</b> (all processes in the system), <b>ready queue</b> (in main memory, ready and waiting), <b>device queues</b> (waiting for an I/O device). <b>I/O-bound</b>: many short CPU bursts; <b>CPU-bound</b>: few very long CPU bursts.",
     "الـ queues: الـ <b>job queue</b> (كل الـ processes في السيستم)، والـ <b>ready queue</b> (اللي في الـ main memory وجاهزة ومستنية)، والـ <b>device queues</b> (مستنية جهاز <bdi dir=\"ltr\">I/O</bdi>). والـ <b><bdi dir=\"ltr\">I/O-bound</bdi></b> فيها CPU bursts كتير قصيرة، والـ <b>CPU-bound</b> فيها CPU bursts قليلة وطويلة جدًا."
    ],
    [
     "<b>Short-term</b> (CPU scheduler): picks the next ready process; very frequent (ms), must be fast. <b>Long-term</b> (job scheduler): picks processes for the <b>ready queue</b>; infrequent; controls the <b>degree of multiprogramming</b>; should pick a good mix of I/O-bound and CPU-bound. <b>Medium-term</b>: <b>swapping</b> out to disk and back in, to decrease the degree of multiprogramming.",
     "الـ <b>Short-term</b> (الـ CPU scheduler) بيختار الـ process الجاهزة الجاية، وبيشتغل كل milliseconds فلازم يبقى سريع. والـ <b>Long-term</b> (الـ job scheduler) بيختار مين يدخل الـ <b>ready queue</b>، ونادر، وبيتحكم في الـ <b>degree of multiprogramming</b>، ولازم يختار خليط كويس من الـ <bdi dir=\"ltr\">I/O-bound</bdi> والـ CPU-bound. والـ <b>Medium-term</b> بيعمل <b>swapping</b> للـ disk ويرجّعها، عشان يقلل الـ degree of multiprogramming."
    ],
    [
     "<b>Context switch</b>: save the state of the old process into its PCB and load the saved state of the new one. Kernel steps: save PC, registers, state → move it to the proper queue → select the next process → restore its context → switch to user mode and jump to its saved PC. Pure <b>overhead</b>; faster with <b>multiple register sets per CPU</b>.",
     "الـ <b>Context switch</b>: بنحفظ حالة الـ process القديمة في الـ PCB بتاعها ونحمّل الحالة المحفوظة للجديدة. خطوات الـ kernel: يحفظ الـ PC والـ registers والـ state، وبعدين يحطها في الـ queue المناسبة، ويختار الـ process الجاية، ويرجّع الـ context بتاعها، ويحوّل للـ user mode وينط للـ PC المحفوظ. وده <b>overhead</b> خالص، وبيبقى أسرع لو فيه <b>multiple register sets per CPU</b>."
    ],
    [
     "Mobile: early iOS ran one <b>foreground</b> process (on the display, controlled by the UI) and limited <b>background</b> processes; Android has fewer limits and background work uses a <b>service</b> (keeps running if its process is suspended, no UI).",
     "في الموبايل: الـ iOS القديم كان بيشغّل process واحدة <b>foreground</b> (اللي على الشاشة وبتتحكم فيها من الـ UI) وprocesses <b>background</b> بحدود، والـ Android حدوده أقل والشغل في الـ background بيستخدم <b>service</b> (بتفضل شغالة لو الـ process اتعمل لها suspend، ومن غير UI)."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Creation, termination and IPC",
   "ar_h": "الإنشاء والإنهاء والـ IPC",
   "pts": [
    [
     "Parents create children → a <b>tree of processes</b>, each with a <b>PID</b>. Sharing: all, a subset, or none; execution: concurrently, or the parent waits; address space: duplicate of the parent, or a new program loaded. <code>fork()</code> returns 0 in the child, the child's PID in the parent, &lt; 0 on error; <code>exec()</code> replaces the memory with a new program; <code>wait()</code> makes the parent wait.",
     "الـ parent بيعمل children فيتكوّن <b>tree of processes</b>، وكل process ليها <b>PID</b>. الـ resources ممكن تتشارك كلها أو جزء منها أو ولا حاجة، والتنفيذ يا مع بعض يا الـ parent يستنى، والـ address space يا نسخة من الـ parent يا برنامج جديد بيتحمّل. والـ <code>fork()</code> بترجّع صفر في الـ child، والـ PID بتاع الـ child في الـ parent، ورقم سالب لو فيه error؛ والـ <code>exec()</code> بتبدّل الـ memory ببرنامج جديد؛ والـ <code>wait()</code> بتخلي الـ parent يستنى."
    ],
    [
     "Termination: <code>exit()</code> asks the OS to delete the process, status goes to the parent via <code>wait()</code>; the parent can <code>abort()</code> a child (exceeded resources, task no longer required, parent exiting). <b>Cascading termination</b>: all children, grandchildren, etc. terminated, <b>initiated by the OS</b>. <b>Zombie</b>: terminated, parent has not called wait(). <b>Orphan</b>: parent terminated without wait().",
     "الإنهاء: الـ <code>exit()</code> بتطلب من الـ OS يمسح الـ process، والـ status بيوصل للـ parent عن طريق الـ <code>wait()</code>؛ والـ parent ممكن يعمل <code>abort()</code> للـ child (لو عدّى الـ resources، أو الـ task مبقتش مطلوبة، أو الـ parent خارج). والـ <b>Cascading termination</b> إن كل الـ children والـ grandchildren يتقفلوا، و<b>الـ OS هو اللي بيبدأها</b>. والـ <b>Zombie</b> خلصت بس الـ parent لسه ما عملش <code>wait()</code>، والـ <b>Orphan</b> الـ parent بتاعها خلص من غير <code>wait()</code>."
    ],
    [
     "Chrome: <b>browser</b> process (UI, disk and network I/O), <b>renderer</b> processes (one per website, sandboxed), <b>plug-in</b> processes. <b>Cooperating</b> processes (reasons: information sharing, computation speedup, modularity, convenience) need <b>IPC</b>: <b>shared memory</b> (controlled by the user processes, not the OS; must synchronize) or <b>message passing</b> (send/receive, no shared variables).",
     "الـ Chrome فيه <b>browser</b> process (الـ UI والـ disk والـ network)، و<b>renderer</b> processes (واحدة لكل website وجوه sandbox)، و<b>plug-in</b> processes. والـ processes الـ <b>cooperating</b> (عشان الـ information sharing والـ computation speedup والـ modularity والـ convenience) محتاجة <b>IPC</b>: يا <b>shared memory</b> (بيتحكم فيها الـ user processes مش الـ OS، ولازم synchronization)، يا <b>message passing</b> (بالـ send والـ receive ومن غير shared variables)."
    ],
    [
     "Bounded buffer: producer waits while <code>(in+1) % BUFFER_SIZE == out</code> (full); consumer waits while <code>in == out</code> (empty); after each step <code>in</code> or <code>out</code> = (value + 1) % BUFFER_SIZE. It holds only <b>BUFFER_SIZE − 1</b> items (10 → 9).",
     "الـ Bounded buffer: الـ producer بيستنى طول ما الـ buffer مليان:<span class=\"ltr\">(in + 1) % BUFFER_SIZE == out</span>والـ consumer بيستنى طول ما الـ buffer فاضي:<span class=\"ltr\">in == out</span>وبعد كل خطوة:<span class=\"ltr\">in = (in + 1) % BUFFER_SIZE, out = (out + 1) % BUFFER_SIZE</span>وبيشيل <b>بس <bdi dir=\"ltr\">BUFFER_SIZE − 1</bdi></b> عنصر (لو 10 يبقى 9)."
    ],
    [
     "<b>Direct</b>: send(P, msg), receive(Q, msg); automatic links, exactly one link per pair. <b>Indirect</b>: mailboxes (ports); a link may connect many processes, a pair may share several links. <b>Blocking = synchronous</b>, <b>non-blocking = asynchronous</b> (receive gets a message or null); both blocking = <b>rendezvous</b>. Buffering: zero capacity (sender waits for receiver), bounded (waits if full), unbounded (never waits).",
     "الـ <b>Direct</b> بالشكل ده:<span class=\"ltr\">send(P, msg), receive(Q, msg)</span>والـ links بتتعمل automatic، و link واحد بالظبط لكل اتنين. والـ <b>Indirect</b> عن طريق الـ mailboxes (ports)، والـ link ممكن يوصّل processes كتير، والاتنين ممكن يشتركوا في كذا link. والـ <b>Blocking</b> يعني synchronous، والـ <b>non-blocking</b> يعني asynchronous (الـ receive بيرجّع message أو null)، ولو الاتنين blocking يبقى <b>rendezvous</b>. والـ buffering يا zero capacity (الـ sender يستنى الـ receiver)، يا bounded (يستنى لو مليان)، يا unbounded (عمره ما يستنى)."
    ],
    [
     "<b>Socket</b> = IP address + port, e.g. 161.25.19.8:1625 is port 1625 on host 161.25.19.8; communication is between a pair of sockets; ports below 1024 are well known; <b>127.0.0.1</b> = loopback.",
     "الـ <b>Socket</b> هو IP address مع port، مثلًا <bdi dir=\"ltr\">161.25.19.8:1625</bdi> يعني الـ port رقم <bdi dir=\"ltr\">1625</bdi> على الـ host <bdi dir=\"ltr\">161.25.19.8</bdi>. والتواصل بيبقى بين socketين، والـ ports اللي أقل من <bdi dir=\"ltr\">1024</bdi> معروفة (well known)، و<bdi dir=\"ltr\">127.0.0.1</bdi> هو الـ loopback."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Fill the blank (Final 2025/26): a process whose parent is terminated → <b>orphan</b>; terminated but the parent has not called wait() → <b>zombie</b>; saves the running process's state and restores the next → <b>context switch</b> (asked again in Midterm 2026/27).",
     "املا الفراغ (Final <bdi dir=\"ltr\">2025/26</bdi>): الـ process اللي الـ parent بتاعها خلص اسمها <b>orphan</b>، واللي خلصت والـ parent لسه ما عملش <code>wait()</code> اسمها <b>zombie</b>، واللي بيحفظ حالة الـ process الشغالة ويرجّع حالة الجاية اسمه <b>context switch</b> (واتسأل تاني في Midterm <bdi dir=\"ltr\">2026/27</bdi>)."
    ],
    [
     "Fill the blank (Final 2025/26): the address of the next instruction is held in the <b>program counter</b> (asked again in Midterm 2026/27 as \"the value of the current address of the process\"); the scheduler that selects processes brought into the ready queue is the <b>long-term</b> scheduler; the application on the mobile display is the <b>foreground</b> application.",
     "املا الفراغ (Final <bdi dir=\"ltr\">2025/26</bdi>): عنوان الـ instruction الجاية في الـ <b>program counter</b> (واتسأل تاني في Midterm <bdi dir=\"ltr\">2026/27</bdi> بصيغة \"قيمة العنوان الحالي للـ process\")، والـ scheduler اللي بيختار مين يدخل الـ ready queue هو الـ <b>long-term</b>، والـ application اللي على شاشة الموبايل هي الـ <b>foreground</b>."
    ],
    [
     "T/F (Final 2025/26): \"the process is a passive entity\" → <b>False</b>; \"the parent process terminates first\" → <b>False</b>; \"a single-processor system never has more than one process in the Running state\" → <b>True</b>.",
     "صح وغلط (Final <bdi dir=\"ltr\">2025/26</bdi>): \"الـ process هي passive entity\" والإجابة <b>False</b>؛ و\"الـ parent دايمًا بيخلص الأول\" والإجابة <b>False</b>؛ و\"في سيستم بـ processor واحد عمر ما يبقى فيه أكتر من process واحدة running\" والإجابة <b>True</b>."
    ],
    [
     "Midterm 2026/27: the UNIX equivalent of Windows CreateProcess() → <b>fork()</b>; T/F \"exec() creates a new process\" → <b>False</b> (it replaces the memory with a new program); the number of processes in memory → <b>degree of multiprogramming</b>; a PCB <b>includes information on the process's state</b>; the medium-term scheduler <b>removes a process from memory by swapping</b>; the list of processes waiting for an I/O device → <b>waiting queue</b> (the notes call it a device queue).",
     "في Midterm <bdi dir=\"ltr\">2026/27</bdi>: الـ system call في UNIX اللي بتقابل <code>CreateProcess()</code> في Windows هي <b><code>fork()</code></b>؛ وصح وغلط \"الـ <code>exec()</code> بتعمل process جديدة\" والإجابة <b>False</b> (هي بتبدّل الـ memory ببرنامج جديد)؛ وعدد الـ processes اللي في الـ memory اسمه <b>degree of multiprogramming</b>؛ والـ PCB <b>فيه معلومات عن حالة الـ process</b>؛ والـ medium-term scheduler <b>بيشيل process من الـ memory بالـ swapping</b>؛ وقايمة الـ processes المستنية <bdi dir=\"ltr\">I/O&nbsp;device</bdi> اسمها <b>waiting queue</b> (الـ notes بتسميها device queue)."
    ],
    [
     "Written questions in past finals: <b>program vs process</b> (Final 2024/25); <b>draw and describe the process states</b> (Finals 2024/25, 2021/22); <b>short-term vs long-term scheduling</b> (Final 2025/26 Q1-b, Midterm 2021/22); <b>short-, medium- and long-term</b> (Finals 2023/24, 2022/23); <b>shared memory vs message passing</b> (Final 2021/22); <b>I/O-bound vs CPU-bound</b> (Midterm 2021/22).",
     "الأسئلة المقالي في الامتحانات اللي فاتت: الفرق بين الـ <b>program والـ process</b> (Final <bdi dir=\"ltr\">2024/25</bdi>)؛ و<b>ارسم واشرح الـ process states</b> (Finals <bdi dir=\"ltr\">2024/25</bdi> و <bdi dir=\"ltr\">2021/22</bdi>)؛ والفرق بين الـ <b>short-term والـ long-term scheduling</b> (Final <bdi dir=\"ltr\">2025/26</bdi> <bdi dir=\"ltr\">Q1-b</bdi>، وMidterm <bdi dir=\"ltr\">2021/22</bdi>)؛ والفرق بين الـ <b>short والـ medium والـ long-term</b> (Finals <bdi dir=\"ltr\">2023/24</bdi> و <bdi dir=\"ltr\">2022/23</bdi>)؛ والـ <b>shared memory مقابل الـ message passing</b> (Final <bdi dir=\"ltr\">2021/22</bdi>)؛ والفرق بين الـ <b><bdi dir=\"ltr\">I/O-bound</bdi> والـ CPU-bound</b> (Midterm <bdi dir=\"ltr\">2021/22</bdi>)."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Basic concepts: scheduler, preemption, dispatcher",
   "ar_h": "الأساسيات: الـ scheduler والـ preemption والـ dispatcher",
   "pts": [
    [
     "<b>CPU–I/O burst cycle</b>: process execution alternates a CPU burst and an I/O burst (in the figure, <i>wait for I/O</i> is the I/O burst). Maximum CPU utilization comes from <b>multiprogramming</b>.",
     "الـ <b><bdi dir=\"ltr\">CPU–I/O&nbsp;burst&nbsp;cycle</bdi></b> معناها إن تنفيذ الـ process بيتبادل بين CPU burst و<bdi dir=\"ltr\">I/O&nbsp;burst</bdi> (في الشكل، الـ <i><bdi dir=\"ltr\">wait for I/O</bdi></i> هي الـ <bdi dir=\"ltr\">I/O&nbsp;burst</bdi>). وأعلى CPU utilization بتيجي من الـ <b>multiprogramming</b>."
    ],
    [
     "The <b>CPU scheduler</b> selects a process from the <b>ready queue</b> and gives it a CPU core. Decisions happen when a process: <b>(1)</b> running → waiting, <b>(2)</b> running → ready, <b>(3)</b> waiting → ready, <b>(4)</b> terminates.",
     "الـ <b>CPU scheduler</b> بيختار process من الـ <b>ready queue</b> ويدّيها CPU core. والقرار بيحصل لما الـ process:<span class=\"ltr\">(1) running → waiting, (2) running → ready, (3) waiting → ready, (4) terminates</span>"
    ],
    [
     "Cases <b>1 and 4</b>: <b>no choice</b>, a new process must be selected. Cases 2 and 3: there is a choice. Scheduling only in 1 and 4 = <b>non-preemptive</b> (FCFS, non-preemptive SJF/priority); otherwise <b>preemptive</b> (RR, SRTF, preemptive priority; Windows, macOS, Linux, UNIX). <b>Preemption can cause race conditions</b> on shared data.",
     "في الحالتين <b>1 و 4</b> <b>مفيش اختيار</b>، لازم process جديدة تتختار. وفي 2 و 3 فيه اختيار. لو الـ scheduling بيحصل في 1 و 4 بس يبقى <b>non-preemptive</b> (زي الـ FCFS والـ SJF والـ priority النسخة الـ non-preemptive)، غير كده يبقى <b>preemptive</b> (زي الـ RR والـ SRTF والـ preemptive priority، وده اللي في Windows و macOS و Linux و UNIX). والـ <b>preemption ممكن تعمل race conditions</b> على الـ shared data."
    ],
    [
     "<b>Dispatcher</b> = gives the CPU to the process the scheduler chose: <b>switching context</b>, <b>switching to user mode</b>, <b>jumping to the proper location</b> in the user program. It does NOT choose the process. <b>Dispatch latency</b> = time to stop one process and start another (save state into PCB0, restore state from PCB1).",
     "الـ <b>Dispatcher</b> هو اللي بيدّي الـ CPU للـ process اللي الـ scheduler اختارها: <b>switching context</b>، وبعدين <b>switching to user mode</b>، وبعدين <b>jumping to the proper location</b> في الـ user program. هو مش اللي بيختار الـ process. والـ <b>Dispatch latency</b> هي الوقت اللي بياخده عشان يوقف process ويشغّل التانية (يعمل save state في PCB0 ويعمل restore state من PCB1)."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Scheduling criteria and the calculation method",
   "ar_h": "الـ scheduling criteria وطريقة الحساب",
   "pts": [
    [
     "<b>Maximize</b>: <b>CPU utilization</b> (keep the CPU busy) and <b>throughput</b> (processes completed per time unit). <b>Minimize</b>: <b>turnaround time</b> (submission to completion), <b>waiting time</b> (time <b>in the ready queue</b>), <b>response time</b> (submission to the <b>first response</b>).",
     "اللي بنعمله <b>maximize</b> هما الـ <b>CPU utilization</b> (نخلي الـ CPU مشغول) والـ <b>throughput</b> (عدد الـ processes اللي بتخلص في وحدة الزمن). واللي بنعمله <b>minimize</b> هما الـ <b>turnaround time</b> (من الـ submission للـ completion)، والـ <b>waiting time</b> (الوقت <b>في الـ ready queue</b>)، والـ <b>response time</b> (من الـ submission لحد <b>أول response</b>)."
    ],
    [
     "Formulas: <code>TAT = CT − AT</code>, <code>WT = TAT − BT</code>, average WT = sum / n, response time = first time on CPU − arrival.",
     "القوانين:<span class=\"ltr\">TAT = CT − AT ,  WT = TAT − BT ,  Avg WT = (WT1 + … + WTn) / n ,  Response = first time on CPU − AT</span>"
    ],
    [
     "Method: draw the <b>Gantt chart</b>, read each completion time, compute TAT and WT per process, then average. If all arrive at 0, the WT of a non-preemptive schedule is just its <b>start time</b> (e.g. FCFS 24, 3, 3: WT 0, 24, 27 → <b>17</b>).",
     "الطريقة: ارسم الـ <b>Gantt chart</b>، واقرا الـ completion time لكل process، واحسب الـ TAT والـ WT لكل واحدة، وبعدين خد المتوسط. لو الكل واصل عند 0، الـ WT في الـ non-preemptive بيبقى هو <b>وقت البداية</b> بتاع الـ process. مثال الـ FCFS بـ 24 و 3 و 3:<span class=\"ltr\">WT = 0, 24, 27 → (0 + 24 + 27)/3 = 17</span>"
    ]
   ]
  },
  {
   "lec": 3,
   "h": "The algorithms: FCFS, SJF/SRTF, RR, priority, multilevel queues",
   "ar_h": "الـ algorithms: الـ FCFS والـ SJF والـ SRTF والـ RR والـ priority والـ multilevel queues",
   "pts": [
    [
     "<b>FCFS</b>: non-preemptive, arrival order. Order P2, P3, P1 (3, 3, 24) gives average WT <b>3</b> instead of 17. <b>Convoy effect</b>: short processes stuck behind a long one.",
     "الـ <b>FCFS</b> هو non-preemptive وبيشغّل بترتيب الوصول. لو الترتيب بقى P2 ثم P3 ثم P1 (يعني 3 و 3 و 24) متوسط الـ WT بيبقى <b>3</b> بدل 17. والـ <b>Convoy effect</b> معناه إن processes قصيرة بتتزنق ورا process طويلة."
    ],
    [
     "<b>SJF</b>: run the shortest <b>next CPU burst</b> first (ties → FCFS). <b>Optimal</b>: minimum average waiting time; difficulty: knowing the next burst length. Example 6, 8, 7, 3 → P4 0–3 | P1 3–9 | P3 9–16 | P2 16–24 → <b>7</b>.",
     "الـ <b>SJF</b> بيشغّل صاحبة أقصر <b>CPU burst جاي</b> الأول (ولو فيه تعادل يبقى FCFS). وهو <b>optimal</b> يعني بيدّي أقل متوسط waiting time، والصعوبة إنك تعرف طول الـ burst الجاي. مثال بـ 6 و 8 و 7 و 3:<span class=\"ltr\">P4 0–3 | P1 3–9 | P3 9–16 | P2 16–24 → (3 + 16 + 9 + 0)/4 = 7</span>"
    ],
    [
     "<b>SRTF</b> = preemptive SJF: a new arrival with a burst shorter than the running process's <b>remaining</b> time preempts it. Example P1 0/8, P2 1/4, P3 2/9, P4 3/5 → P1 0–1 | P2 1–5 | P4 5–10 | P1 10–17 | P3 17–26 → <b>26/4 = 6.5</b>.",
     "الـ <b>SRTF</b> هو الـ preemptive SJF: لو process جديدة وصلت والـ burst بتاعها أقل من <b>الباقي</b> من اللي شغالة، بتعمل لها preempt. مثال:<span class=\"ltr\">P1 0/8, P2 1/4, P3 2/9, P4 3/5 → P1 0–1 | P2 1–5 | P4 5–10 | P1 10–17 | P3 17–26 → 26/4 = 6.5</span>"
    ],
    [
     "<b>RR</b>: each process gets a <b>time quantum q</b> (10–100 ms), then is preempted to the <b>end of the ready queue</b>. No process waits more than <b>(n − 1)q</b>. q large → <b>FCFS</b>; q small → too many context switches (switch &lt; 10 µs). Higher average turnaround than SJF but <b>better response</b>. Convention: a process arriving at the instant a quantum expires is queued <b>before</b> the preempted one. Example 24, 3, 3, q = 4 → <b>17/3 = 5.67</b>.",
     "الـ <b>RR</b>: كل process بتاخد <b>time quantum q</b> (من <bdi dir=\"ltr\">10–100&nbsp;ms</bdi>) وبعدين بتتعملها preempt وتروح <b>آخر الـ ready queue</b>. ومفيش process تستنى أكتر من <b><bdi dir=\"ltr\">(n&nbsp;−&nbsp;1)q</bdi></b>. لو الـ q كبير يبقى <b>FCFS</b>، ولو صغير يبقى فيه context switches كتير (الـ switch أقل من <bdi dir=\"ltr\">10&nbsp;µs</bdi>). متوسط الـ turnaround أعلى من الـ SJF بس الـ <b>response أحسن</b>. والاصطلاح: الـ process اللي توصل في نفس لحظة انتهاء الـ quantum بتدخل الـ queue <b>قبل</b> اللي اتعملها preempt. مثال بـ 24 و 3 و 3 و q بيساوي 4:<span class=\"ltr\">[(30 − 24) + (7 − 3) + (10 − 3)]/3 = 17/3 = 5.67</span>"
    ],
    [
     "<b>Priority</b>: <b>smallest integer = highest priority</b>; preemptive or non-preemptive. SJF is a priority algorithm (priority = inverse of predicted next burst). Problem: <b>starvation</b>; solution: <b>aging</b>. <b>Priority + RR</b>: highest priority first, equal priorities share round-robin (slide 25 example → <b>13.8</b>).",
     "الـ <b>Priority</b>: <b>أصغر integer هو أعلى priority</b>، وممكن يبقى preemptive أو non-preemptive. والـ SJF نفسه priority algorithm (الـ priority عكس طول الـ burst الجاي المتوقع). المشكلة هي الـ <b>starvation</b> والحل هو الـ <b>aging</b>. والـ <b>Priority مع RR</b>: الأعلى priority الأول، واللي ليهم نفس الـ priority بيتقسموا round-robin (مثال سلايد 25 بيدّي <b>13.8</b>)."
    ],
    [
     "<b>Multilevel queue</b>: a separate queue per priority (real-time → system → interactive → batch). <b>Multilevel feedback queue</b>: a process <b>can move</b> between queues (upgrade/demote); can implement <b>aging</b>. Example: Q0 RR q = 8 ms, Q1 RR q = 16 ms, Q2 FCFS.",
     "الـ <b>Multilevel queue</b> فيها queue منفصلة لكل priority (من الأعلى للأقل: الـ real-time ثم الـ system ثم الـ interactive ثم الـ batch). وفي الـ <b>Multilevel feedback queue</b> الـ process <b>تقدر تتنقل</b> بين الـ queues (upgrade أو demote)، وينفع نعمل بيها <b>aging</b>. مثال:<span class=\"ltr\">Q0 = RR (q = 8 ms), Q1 = RR (q = 16 ms), Q2 = FCFS</span>"
    ]
   ]
  },
  {
   "lec": 3,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "MCQ (Final 2025/26): \"Which algorithm gives minimum average waiting time?\" → <b>SJF</b>. Fill the blank (Final 2025/26, Midterm 2026/27): \"A solution to indefinite blockage of low-priority processes is ……\" → <b>Aging</b>; and \"What is aging?\" → <b>increasing the priority of jobs to ensure termination in a finite time</b> (Midterm 2026/27).",
     "سؤال MCQ (Final <bdi dir=\"ltr\">2025/26</bdi>): أنهي algorithm بيدّي أقل متوسط waiting time؟ الإجابة <b>SJF</b>. وأكمل (Final <bdi dir=\"ltr\">2025/26</bdi> وMidterm <bdi dir=\"ltr\">2026/27</bdi>): الحل لمشكلة الـ indefinite blockage للـ low-priority processes هو؟ الإجابة <b>Aging</b>؛ وسؤال \"يعني إيه aging؟\" إجابته <b>إننا نزوّد الـ priority بتاع الـ jobs عشان تخلص في وقت محدود</b> (Midterm <bdi dir=\"ltr\">2026/27</bdi>)."
    ],
    [
     "True or False (Final 2025/26): \"Busy waiting is good as it never allows the CPU to be idle.\" → <b>False</b>.",
     "سؤال صح أو غلط (Final <bdi dir=\"ltr\">2025/26</bdi>): الـ busy waiting كويس لأنه عمره ما بيخلي الـ CPU فاضي؟ الإجابة <b>False</b>."
    ],
    [
     "Midterm 2026/27 definitions: the amount of time to execute a particular process → <b>turnaround time</b>; time spent waiting in the ready queue is the <b>waiting time</b> (True); the algorithm that minimizes process flow time → <b>SJF</b>; CPU scheduling is the basis of <b>multiprogramming</b> OSs; FIFO executes <b>the job that came first</b>; RR is <b>preemptive</b>; suspending logically runnable processes → <b>preemptive scheduling</b>; RR with very large time slices → <b>FCFS</b>; FCFS is troublesome for <b>time-sharing</b> systems; preemptive, priority-based scheduling guarantees only <b>soft real-time</b> functionality (textbook, not in the notes) ‡",
     "تعريفات في Midterm <bdi dir=\"ltr\">2026/27</bdi>: الوقت اللي بياخده تنفيذ process معينة هو الـ <b>turnaround time</b>؛ والوقت اللي الـ process قعدته مستنية في الـ ready queue هو الـ <b>waiting time</b> (True)؛ والـ algorithm اللي بيقلل الـ flow time هو الـ <b>SJF</b>؛ والـ CPU scheduling هو أساس الـ OS اللي فيها <b>multiprogramming</b>؛ والـ FIFO بينفّذ <b>الـ job اللي جه الأول</b>؛ والـ RR هو <b>preemptive</b>؛ وإيقاف processes تقدر تشتغل مؤقتًا اسمه <b>preemptive scheduling</b>؛ والـ RR بـ time slices كبيرة جدًا بيبقى <b>FCFS</b>؛ والـ FCFS مشكلة في الـ <b>time-sharing</b> systems؛ والـ preemptive priority-based scheduling بيضمن بس <b>soft real-time</b> (من الكتاب، مش في الـ notes) ‡"
    ],
    [
     "<b>The big problem, in every final</b>: Gantt charts + each WT + the average, then \"which is minimal?\" Final 2025/26 Q4-a: bursts 3, 3, 2, 1 (corrected by hand; printed 6, 3, 5, 4) all at 0 → FCFS <b>4.25</b>, RR q = 3 <b>4.25</b>, SJF <b>2.5</b> (printed: 7.25, 9.5, 5.5). Final 2024/25 Q2-1: the lecture's SRTF data (arrivals 0-3, bursts 8, 4, 9, 5, priorities 1, 5, 2, 3) → SRTF <b>6.5</b>, FCFS <b>8.75</b>, priority <b>10.25</b>, RR q = 4 <b>11.75</b>.",
     "<b>المسألة الكبيرة، في كل Final</b>: الـ Gantt charts والـ WT لكل process والمتوسط، وبعدين \"أنهي الأقل؟\". في Final <bdi dir=\"ltr\">2025/26</bdi> <bdi dir=\"ltr\">Q4-a</bdi>: الـ bursts هي <bdi dir=\"ltr\">3, 3, 2, 1</bdi> (متصلحة بخط اليد، والمطبوع <bdi dir=\"ltr\">6, 3, 5, 4</bdi>) وكلهم عند 0:<span class=\"ltr\">FCFS 4.25, RR (q = 3) 4.25, SJF 2.5</span>والمطبوع بيدّي:<span class=\"ltr\">7.25, 9.5, 5.5</span>وفي Final <bdi dir=\"ltr\">2024/25</bdi> <bdi dir=\"ltr\">Q2-1</bdi>: داتا الـ SRTF بتاعة المحاضرة (وصول من 0 لـ 3، والـ bursts <bdi dir=\"ltr\">8, 4, 9, 5</bdi>، والـ priorities <bdi dir=\"ltr\">1, 5, 2, 3</bdi>):<span class=\"ltr\">SRTF 6.5, FCFS 8.75, Priority 10.25, RR (q = 4) 11.75</span>"
    ],
    [
     "Final 2023/24 Q1-a: 8, 3, 2, 1, 4 (priorities 3, 1, 2, 4, 5) → SJF <b>4</b>, RR q = 1 <b>7.4</b>, priority <b>7</b>. Final 2022/23 Q1-a: 10, 7, 3, 6, 5 (priorities 5, 1, 3, 4, 2) → FCFS <b>14.6</b>, SJF <b>9.2</b>, priority <b>11</b>, RR q = 2 <b>19</b>. Final 2021/22 Q2-1: 10, 1, 2, 1, 5 (priorities 3, 1, 3, 4, 2) → FCFS <b>9.6</b>, SJF <b>3.2</b>, priority <b>8.2</b>, RR q = 1 <b>5.4</b>. The minimum is always <b>SJF</b> (SRTF when there are arrival times).",
     "في Final <bdi dir=\"ltr\">2023/24</bdi> <bdi dir=\"ltr\">Q1-a</bdi>: الـ bursts <bdi dir=\"ltr\">8, 3, 2, 1, 4</bdi> والـ priorities <bdi dir=\"ltr\">3, 1, 2, 4, 5</bdi>:<span class=\"ltr\">SJF 4, RR (q = 1) 7.4, Priority 7</span>وفي Final <bdi dir=\"ltr\">2022/23</bdi> <bdi dir=\"ltr\">Q1-a</bdi>: الـ bursts <bdi dir=\"ltr\">10, 7, 3, 6, 5</bdi> والـ priorities <bdi dir=\"ltr\">5, 1, 3, 4, 2</bdi>:<span class=\"ltr\">FCFS 14.6, SJF 9.2, Priority 11, RR (q = 2) 19</span>وفي Final <bdi dir=\"ltr\">2021/22</bdi> <bdi dir=\"ltr\">Q2-1</bdi>: الـ bursts <bdi dir=\"ltr\">10, 1, 2, 1, 5</bdi> والـ priorities <bdi dir=\"ltr\">3, 1, 3, 4, 2</bdi>:<span class=\"ltr\">FCFS 9.6, SJF 3.2, Priority 8.2, RR (q = 1) 5.4</span>والأقل دايمًا هو الـ <b>SJF</b> (أو الـ SRTF لو فيه arrival times)."
    ],
    [
     "Midterm 2021/22 (Topic 3 Q4): P1 10/3, P2 3/1, P3 2/2, P4 1/4 at time 0 → average WT for <b>FCFS 9.5</b>, <b>SJF 2.5</b>, <b>RR q = 1 → 5</b>, <b>priority 5.75</b>; minimum = <b>SJF</b>.",
     "في Midterm <bdi dir=\"ltr\">2021/22</bdi> (Topic 3 Q4): الـ processes دي كلها عند 0:<span class=\"ltr\">P1 10/3, P2 3/1, P3 2/2, P4 1/4</span>ومتوسط الـ WT:<span class=\"ltr\">FCFS 9.5, SJF 2.5, RR (q = 1) 5, Priority 5.75</span>والأقل هو <b>SJF</b>."
    ],
    [
     "Essay questions: <b>preemptive vs non-preemptive</b> (Final 2022/23, Midterm 2021/22); the <b>scheduling criteria</b> (Midterm 2021/22); also be ready to describe the 4 scheduling decisions, which algorithms starve (<b>SJF and priority</b>, solution aging), and why the RR quantum matters.",
     "أسئلة مقالي: الفرق بين الـ <b>preemptive والـ non-preemptive</b> (Final <bdi dir=\"ltr\">2022/23</bdi>، وMidterm <bdi dir=\"ltr\">2021/22</bdi>)؛ والـ <b>scheduling criteria</b> (Midterm <bdi dir=\"ltr\">2021/22</bdi>)؛ وكمان خليك جاهز تشرح قرارات الـ scheduling (الحالات الأربعة)، وأنهي algorithms بتعمل starvation (الـ <b>SJF والـ priority</b>، والحل aging)، وليه الـ quantum بتاع الـ RR مهم."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Background, base/limit, binding and the MMU",
   "ar_h": "الأساسيات والـ base والـ limit والـ binding والـ MMU",
   "pts": [
    [
     "Only <b>main memory and registers</b> are directly accessible by the CPU. Register access = one CPU clock (or less); main memory = many cycles; <b>cache</b> sits between them. <b>Protection of memory</b> is required for correct operation.",
     "الـ CPU يقدر يوصل مباشرةً لـ <b>الـ main memory والـ registers</b> بس. الـ register بياخد CPU clock واحدة (أو أقل)، والـ main memory cycles كتير، والـ <b>cache</b> قاعد بينهم. والـ <b>protection</b> بتاع الـ memory لازم عشان الشغل يبقى صح."
    ],
    [
     "<b>Base and limit registers</b> define the logical address space. The CPU checks every user-mode access: legal only if <b>base ≤ address &lt; base + limit</b>, otherwise a <b>trap</b> (addressing error). Slide 3: base 300040, limit 120900, so legal 300040 … 420939.",
     "الـ <b>base والـ limit registers</b> بيحددوا الـ logical address space. الـ CPU بيتشيك على كل access في الـ user mode، ويبقى legal بس لو:<span class=\"ltr\"><b>base ≤ address &lt; base + limit</b></span>وغير كده بيحصل <b>trap</b> (addressing error). مثال سلايد 3:<span class=\"ltr\">base 300040, limit 120900 → 300040 … 420939</span>"
    ],
    [
     "<b>Binding at 3 stages</b>: <b>compile time</b> (location known a priori, absolute code, recompile if the start changes), <b>load time</b> (relocatable code if the location is not known at compile time), <b>execution time</b> (the process can move during execution; needs hardware support, e.g. base and limit registers).",
     "الـ <b>binding بيحصل في 3 مراحل</b>: الـ <b>compile time</b> (المكان معروف من الأول، بيطلع absolute code، ولازم recompile لو البداية اتغيرت)، والـ <b>load time</b> (بيطلع relocatable code لو المكان مش معروف وقت الـ compile)، والـ <b>execution time</b> (الـ process ممكن تتنقل وهي شغالة، ومحتاج دعم hardware زي الـ base والـ limit registers)."
    ],
    [
     "Addresses: source code <b>symbolic</b> (variables); compiled code <b>relocatable</b> (\"14 bytes from beginning of this module\"); the linker or loader binds them to <b>absolute</b> addresses (74014). Each binding maps one address space to another.",
     "الـ addresses: في الـ source code بتبقى <b>symbolic</b> (زي الـ variables)، وبعد الـ compile بتبقى <b>relocatable</b> زي:<span class=\"ltr\">\"14 bytes from beginning of this module\"</span>والـ linker أو الـ loader بيعملها bind لـ <b>absolute</b> addresses زي <bdi dir=\"ltr\">74014</bdi>. وكل binding بيعمل mapping من address space لـ address space تانية."
    ],
    [
     "<b>Logical (virtual) address</b>: generated by the CPU. <b>Physical address</b>: seen by the memory unit. <b>Same</b> in compile-time and load-time binding, <b>differ in execution-time</b> binding.",
     "الـ <b>Logical (virtual) address</b>: الـ CPU هو اللي بيطلّعه. والـ <b>Physical address</b>: اللي الـ memory unit بتشوفه. هما <b>نفس الحاجة</b> في الـ compile-time والـ load-time binding، و<b>بيختلفوا في الـ execution-time</b> binding."
    ],
    [
     "<b>MMU</b>: hardware that maps virtual to physical addresses at run time. The relocation register (the base register's new name) is added to every address sent to memory: 14000 + 346 = <b>14346</b>. The user program never sees the real physical addresses.",
     "الـ <b>MMU</b> ده hardware بيعمل mapping من virtual لـ physical وقت التشغيل. الـ relocation register (الاسم الجديد للـ base register) بيتجمع على كل address بيتبعت للـ memory:<span class=\"ltr\">14000 + 346 = <b>14346</b></span>وبرنامج الـ user عمره ما بيشوف الـ physical addresses الحقيقية."
    ],
    [
     "<b>Dynamic loading</b>: a routine is not loaded until it is called; an unused routine is never loaded; routines are kept on disk in relocatable load format; no special OS support is required (program design; the OS can provide libraries).",
     "الـ <b>Dynamic loading</b>: الـ routine مابتتحمّلش غير لما تتنادى، واللي مش مستخدمة عمرها ما بتتحمّل، وكل الـ routines على الـ disk بـ relocatable load format، ومش محتاج دعم خاص من الـ OS (تصميم البرنامج، والـ OS ممكن يوفر libraries)."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Swapping and contiguous allocation",
   "ar_h": "الـ Swapping والـ contiguous allocation",
   "pts": [
    [
     "<b>Swapping</b>: a process moves temporarily to a <b>backing store</b> (a fast disk with direct access to all memory images) and back. <b>Roll out, roll in</b>: swap out the lower-priority process so a higher-priority one runs.",
     "الـ <b>Swapping</b>: الـ process بتتنقل مؤقتًا لـ <b>backing store</b> (disk سريع فيه direct access لكل الـ memory images) وبترجع تاني. والـ <b><bdi dir=\"ltr\">roll out, roll in</bdi></b>: بنعمل swap out للـ process الأقل أولوية عشان اللي أعلى تشتغل."
    ],
    [
     "Most of swap time is <b>transfer time</b>, directly proportional to the memory swapped. Slide 13: 100 MB at 50 MB/sec = 2000 ms out + 2000 ms in = <b>4000 ms (4 s)</b>.",
     "أغلب وقت الـ swap هو <b>transfer time</b>، وبيتناسب طرديًا مع الـ memory اللي بتتنقل. مثال سلايد 13:<span class=\"ltr\">100 MB ÷ 50 MB/sec = 2000 ms</span><span class=\"ltr\">2000 ms out + 2000 ms in = <b>4000 ms = 4 s</b></span>"
    ],
    [
     "<b>Contiguous allocation</b>: two partitions, the resident OS in low memory (with the interrupt vector) and user processes in high memory; each process in a single contiguous section. <b>Base</b> = smallest physical address; <b>limit</b> = range of logical addresses. Hardware: if logical &lt; limit then physical = logical + relocation, else trap.",
     "الـ <b>Contiguous allocation</b>: فيه two partitions، الـ resident OS في الـ low memory ومعاه الـ interrupt vector، والـ user processes في الـ high memory، وكل process في section واحدة contiguous. الـ <b>base</b> هو أصغر physical address، والـ <b>limit</b> هو الـ range بتاع الـ logical addresses. والـ hardware:<span class=\"ltr\">logical &lt; limit ? physical = logical + relocation : trap</span>"
    ],
    [
     "<b>Multiple-partition allocation</b>: <b>hole</b> = block of available memory. A new process gets a hole large enough; an exiting process frees its partition and <b>adjacent free partitions are combined</b>. The OS tracks allocated partitions and free partitions (holes).",
     "الـ <b>Multiple-partition allocation</b>: الـ <b>hole</b> هو block من الـ memory المتاحة. الـ process الجديدة بتاخد hole كبير كفاية، واللي بتخرج بتفضّي الـ partition بتاعها و<b>الـ free partitions اللي جنب بعض بتتجمع</b>. والـ OS بيتابع الـ allocated partitions والـ holes."
    ],
    [
     "<b>First-fit</b>: first hole big enough. <b>Best-fit</b>: smallest hole big enough (searches the entire list unless ordered by size; smallest leftover). <b>Worst-fit</b>: largest hole (searches the entire list; largest leftover). First-fit and best-fit are better than worst-fit in speed and storage utilization.",
     "الـ <b>First-fit</b>: أول hole كبير كفاية. والـ <b>Best-fit</b>: أصغر hole كبير كفاية (بيدوّر في اللستة كلها إلا لو مترتبة بالحجم، وبيطلّع أصغر leftover). والـ <b>Worst-fit</b>: أكبر hole (بيدوّر في اللستة كلها، وبيطلّع أكبر leftover). والـ First-fit والـ best-fit أحسن من الـ worst-fit في السرعة واستخدام الـ storage."
    ],
    [
     "<b>Slide example</b>, partitions 100, 500, 200, 300, 600 KB, processes 212, 417, 112, 426 KB. <b>First-fit</b>: 212→500, 417→600, 112→288, 426 waits. <b>Best-fit</b>: 212→300, 417→500, 112→200, 426→600. <b>Worst-fit</b>: 212→600, 417→500, 112→388, 426 waits. <b>Best-fit is the best</b> here: it is the only one that places all four.",
     "<b>مثال السلايد</b>، الـ partitions:<span class=\"ltr\">100, 500, 200, 300, 600 KB</span>والـ processes:<span class=\"ltr\">212, 417, 112, 426 KB</span>الـ <b>First-fit</b>:<span class=\"ltr\">212→500, 417→600, 112→288, 426 waits</span>الـ <b>Best-fit</b>:<span class=\"ltr\">212→300, 417→500, 112→200, 426→600</span>الـ <b>Worst-fit</b>:<span class=\"ltr\">212→600, 417→500, 112→388, 426 waits</span>و<b>الـ Best-fit هو الأحسن</b> هنا، لأنه الوحيد اللي حط الأربعة."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Fragmentation, segmentation and paging",
   "ar_h": "الـ Fragmentation والـ segmentation والـ paging",
   "pts": [
    [
     "<b>External</b>: total memory space exists to satisfy a request, but it is <b>not contiguous</b>. <b>Internal</b>: allocated memory is slightly larger than requested; the difference is inside a partition and <b>not used</b>.",
     "الـ <b>External</b>: إجمالي المساحة موجود ويكفي الطلب بس <b>مش contiguous</b>. والـ <b>Internal</b>: الـ memory المخصصة أكبر شوية من المطلوب، والفرق جوة الـ partition و<b>مش مستخدم</b>."
    ],
    [
     "<b>Compaction</b> reduces external fragmentation by placing all free memory in one large block. Possible <b>only if relocation is dynamic</b>, done at execution time. I/O problem: latch the job in memory or do I/O only into OS buffers.",
     "الـ <b>Compaction</b> بيقلل الـ external fragmentation بإنه يجمع كل الـ free memory في block واحد كبير. ينفع <b>بس لو الـ relocation dynamic</b>، وبيتعمل وقت الـ execution. ومشكلة الـ <bdi dir=\"ltr\">I/O</bdi>: نثبّت الـ job في الـ memory، أو نعمل <bdi dir=\"ltr\">I/O</bdi> في الـ OS buffers بس."
    ],
    [
     "<b>Segmentation</b> supports the user view: a program is a collection of segments (main program, procedure, function, stack, symbol table, arrays…). Logical address = <b>&lt;segment-number, offset&gt;</b>. Each table entry has <b>base</b> (starting physical address) and <b>limit</b> (length).",
     "الـ <b>Segmentation</b> بيدعم نظرة الـ user: البرنامج مجموعة segments (زي الـ main program والـ procedure والـ function والـ stack والـ symbol table والـ arrays). والـ logical address هو:<span class=\"ltr\"><b>&lt;segment-number, offset&gt;</b></span>وكل entry في الـ table فيها <b>base</b> (أول physical address) و<b>limit</b> (الطول)."
    ],
    [
     "<b>STBR</b> points to the segment table; <b>STLR</b> = number of segments, s legal if <b>s &lt; STLR</b>. Hardware: if <b>d &lt; limit</b>, physical = <b>base + d</b>; else <b>trap: addressing error</b>. Each entry also has a validation bit (0 = illegal segment) and read/write/execute privileges; code sharing occurs at segment level; segment lengths vary, so allocation is a dynamic storage-allocation problem.",
     "الـ <b>STBR</b> بيشاور على الـ segment table، والـ <b>STLR</b> فيه عدد الـ segments، والـ s يبقى legal لو <bdi dir=\"ltr\"><b>s &lt; STLR</b></bdi>. والـ hardware:<span class=\"ltr\">d &lt; limit ? physical = base + d : trap</span>وكل entry فيها validation bit (لو <bdi dir=\"ltr\">0</bdi> يبقى الـ segment illegal) وصلاحيات <bdi dir=\"ltr\">read/write/execute</bdi>. ومشاركة الكود على مستوى الـ segment، وبما إن الأطوال مختلفة فالـ allocation بيبقى dynamic storage-allocation problem."
    ],
    [
     "<b>Slide 28 example</b> (limit, base): seg 0 (1000, 1400), seg 1 (400, 6300), seg 2 (400, 4300), seg 3 (1100, 3200), seg 4 (1000, 4700). Byte 53 of seg 2 → <b>4353</b>; byte 852 of seg 3 → <b>4052</b>; byte 1222 of seg 0 → <b>trap</b> (only 1,000 bytes long).",
     "<b>مثال سلايد 28</b> <bdi dir=\"ltr\">(limit, base)</bdi>:<span class=\"ltr\">seg 0 (1000, 1400), seg 1 (400, 6300)</span><span class=\"ltr\">seg 2 (400, 4300), seg 3 (1100, 3200)</span><span class=\"ltr\">seg 4 (1000, 4700)</span><span class=\"ltr\">(2, 53) → <b>4353</b></span><span class=\"ltr\">(3, 852) → <b>4052</b></span><span class=\"ltr\">(0, 1222) → <b>trap</b></span>لأن الـ segment رقم 0 طوله <bdi dir=\"ltr\">1000 bytes</bdi> بس."
    ],
    [
     "<b>Paging</b>: noncontiguous physical space; avoids external fragmentation and varying-sized chunks; <b>frames</b> (fixed, a power of 2, 512 bytes to 16 Mbytes) and same-size <b>pages</b>; N pages need N free frames; a <b>page table</b> translates addresses; <b>still has internal fragmentation</b>.",
     "الـ <b>Paging</b>: الـ physical space ممكن تبقى noncontiguous، وبيتجنب الـ external fragmentation ومشكلة الأحجام المختلفة. الـ <b>frames</b> ثابتة الحجم (power of 2 من <bdi dir=\"ltr\">512 bytes</bdi> لـ <bdi dir=\"ltr\">16 Mbytes</bdi>)، والـ <b>pages</b> بنفس الحجم. والـ N pages محتاجين N free frames، والـ <b>page table</b> هي اللي بتترجم، و<b>لسه فيه internal fragmentation</b>."
    ],
    [
     "Logical address = <b>p</b> (index into the page table, m − n bits) + <b>d</b> (offset, n bits), for logical space 2<sup>m</sup> and page size 2<sup>n</sup>. p gives frame f; the physical address is (f, d).",
     "الـ logical address هو <b>p</b> (الـ index في الـ page table) و<b>d</b> (الـ offset):<span class=\"ltr\">p = high m − n bits, d = low n bits</span>للـ logical space 2<sup>m</sup> والـ page size 2<sup>n</sup>. والـ p بيجيب الـ frame f، والـ physical address هو <bdi dir=\"ltr\">(f, d)</bdi>."
    ],
    [
     "<b>Slide 33 calculation</b>: 2,048-byte pages, 72,766-byte process = 35 pages + 1,086 bytes → internal fragmentation = 2,048 − 1,086 = <b>962 bytes</b>. Worst case = 1 frame − 1 byte; on average = ½ frame. Small frames are desirable, but each page table entry takes memory; page sizes grow over time (Solaris: 8 KB and 4 MB).",
     "<b>حساب سلايد 33</b>:<span class=\"ltr\">72,766 = 35 × 2,048 + 1,086</span><span class=\"ltr\">2,048 − 1,086 = <b>962 bytes</b></span>أسوأ حالة:<span class=\"ltr\">1 frame − 1 byte</span>وفي المتوسط نص frame. الـ frames الصغيرة أحسن للـ fragmentation، بس كل page table entry بياخد memory، وأحجام الـ pages بتكبر مع الوقت (Solaris بيدعم <bdi dir=\"ltr\">8 KB</bdi> و <bdi dir=\"ltr\">4 MB</bdi>)."
    ],
    [
     "<b>Paging vs segmentation</b>: paging uses fixed-size pages and (p, d), avoids external fragmentation, still has internal. Segmentation uses variable-length logical segments and (s, d) with base + limit, matches the user view, and allocation is a dynamic storage-allocation problem.",
     "الـ <b>Paging مقابل الـ segmentation</b>: الـ paging بيستخدم pages ثابتة الحجم و <bdi dir=\"ltr\">(p, d)</bdi>، وبيتجنب الـ external fragmentation بس لسه فيه internal. والـ segmentation بيستخدم segments منطقية أطوالها متغيرة و <bdi dir=\"ltr\">(s, d)</bdi> مع base وlimit، وبيطابق نظرة الـ user، والـ allocation فيه dynamic storage-allocation problem."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "<b>The big problem</b> (Finals 2025/26 Q2-a and 2023/24 Q1-b use the slide numbers exactly; 2022/23 uses 150, 500, 300, 600 KB with 230, 420, 130, 450 KB, and 2021/22 uses 150, 500, 250, 300, 600 KB with the slide's processes): first-fit, best-fit, worst-fit on partitions, then \"which is most efficient?\" Update the hole sizes after each placement. Best-fit won every time, placing all four.",
     "<b>المسألة الكبيرة</b>، بتيجي بأرقام السلايد بالظبط في Final <bdi dir=\"ltr\">2025/26</bdi> (<bdi dir=\"ltr\">Q2-a</bdi>) و <bdi dir=\"ltr\">2023/24</bdi> (<bdi dir=\"ltr\">Q1-b</bdi>)، وفي <bdi dir=\"ltr\">2022/23</bdi> بالـ partitions دي:<span class=\"ltr\">150, 500, 300, 600 KB</span>والـ processes:<span class=\"ltr\">230, 420, 130, 450 KB</span>وفي <bdi dir=\"ltr\">2021/22</bdi> بالـ partitions دي مع processes السلايد:<span class=\"ltr\">150, 500, 250, 300, 600 KB</span>المطلوب الـ first-fit والـ best-fit والـ worst-fit على الـ partitions، وبعدين \"أنهي الأكفأ؟\". حدّث حجم الـ holes بعد كل placement. والـ Best-fit كسب في كل مرة وحط الأربعة."
    ],
    [
     "Watch the changed numbers: in 2022/23 and 2021/22, first-fit puts the small process (130 KB, 112 KB) into the <b>150 KB partition</b>, because it is the first hole in order that fits, not into the leftover of the 500 KB partition.",
     "خد بالك من الأرقام المتغيرة: في <bdi dir=\"ltr\">2022/23</bdi> و <bdi dir=\"ltr\">2021/22</bdi> الـ first-fit بيحط الـ process الصغيرة (<bdi dir=\"ltr\">130 KB</bdi> أو <bdi dir=\"ltr\">112 KB</bdi>) في الـ <b>partition اللي <bdi dir=\"ltr\">150 KB</bdi></b>، لأنها أول hole بالترتيب تكفي، مش في الباقي من الـ partition اللي <bdi dir=\"ltr\">500 KB</bdi>."
    ],
    [
     "Final 2025/26 (Q2-a) as MCQs: first-fit, 112 KB goes to <b>the 288 KB hole left in the 500 KB partition</b>; the most efficient for that example is <b>best-fit</b>.",
     "الـ Final <bdi dir=\"ltr\">2025/26</bdi> (<bdi dir=\"ltr\">Q2-a</bdi>) في صورة MCQ: في الـ first-fit، الـ <bdi dir=\"ltr\">112 KB</bdi> بتروح لـ <b>الـ hole اللي <bdi dir=\"ltr\">288 KB</bdi> الفاضل في الـ partition اللي <bdi dir=\"ltr\">500 KB</bdi></b>. والأكفأ في المثال ده هو الـ <b>best-fit</b>."
    ],
    [
     "Essay questions in past finals: <b>external vs internal fragmentation</b> (2024/25; a numeric example earns full marks, e.g. 962 bytes) and <b>paging vs segmentation</b> (2022/23, 2021/22). Base and limit registers also count as one of the \"three protection services\" (Final 2021/22).",
     "أسئلة مقالي في الـ Finals: الفرق بين الـ <b>external والـ internal fragmentation</b> (<bdi dir=\"ltr\">2024/25</bdi>، والمثال بالأرقام بياخد الدرجة كاملة، زي الـ <bdi dir=\"ltr\">962 bytes</bdi>)، والفرق بين الـ <b>paging والـ segmentation</b> (<bdi dir=\"ltr\">2022/23</bdi> و <bdi dir=\"ltr\">2021/22</bdi>). وكمان الـ base والـ limit registers بيتحسبوا واحدة من \"التلات protection services\" (Final <bdi dir=\"ltr\">2021/22</bdi>)."
    ],
    [
     "Review questions on the slides (Q1-Q8): explain base and limit registers, logical vs physical address, the usage of the MMU, the first/best/worst example, external vs internal fragmentation, the concept of paging, paging vs segmentation.",
     "أسئلة المراجعة في آخر السلايدات <bdi dir=\"ltr\">(Q1-Q8)</bdi>: اشرح الـ base والـ limit registers، والفرق بين الـ logical والـ physical address، واستخدام الـ MMU، ومثال الـ first والـ best والـ worst، والفرق بين الـ external والـ internal fragmentation، ومفهوم الـ paging، والفرق بين الـ paging والـ segmentation."
    ],
    [
     "Review Q6, segment table (base, length) 0: 219, 600; 1: 2300, 14; 2: 90, 100; 3: 1327, 580; 4: 1952, 96. Answers: (0,430) → <b>649</b>; (1,10) → <b>2310</b>; (2,500) → <b>trap</b>; (3,400) → <b>1727</b>; (4,112) → <b>trap</b>.",
     "السؤال 6، الـ segment table <bdi dir=\"ltr\">(base, length)</bdi>:<span class=\"ltr\">0: 219, 600 | 1: 2300, 14</span><span class=\"ltr\">2: 90, 100 | 3: 1327, 580</span><span class=\"ltr\">4: 1952, 96</span>والإجابات:<span class=\"ltr\">(0,430) → <b>649</b></span><span class=\"ltr\">(1,10) → <b>2310</b></span><span class=\"ltr\">(2,500) → <b>trap</b></span><span class=\"ltr\">(3,400) → <b>1727</b></span><span class=\"ltr\">(4,112) → <b>trap</b></span>"
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Virtual memory and demand paging",
   "ar_h": "الـ Virtual memory والـ demand paging",
   "pts": [
    [
     "Why: the whole program is rarely used (error code, unusual routines, large data structures). Running a <b>partially loaded</b> program means it is <b>no longer constrained by physical memory</b>, each program uses less memory so <b>more programs run at the same time</b> (↑ CPU utilization and throughput, no increase in response or turnaround time), and <b>less I/O</b> is needed to load or swap.",
     "ليه: البرنامج كله نادرًا ما بيتستخدم (كود الـ errors، والـ routines النادرة، والـ data structures الكبيرة). تشغيل برنامج <b>متحمّل جزء منه بس</b> معناه إنه <b>مابقاش محدود بالـ physical memory</b>، وكل برنامج بياخد memory أقل فـ <b>برامج أكتر تشتغل في نفس الوقت</b> (الـ CPU utilization والـ throughput بيزيدوا من غير ما الـ response أو الـ turnaround يزيدوا)، و<b><bdi dir=\"ltr\">I/O</bdi> أقل</b> للتحميل أو الـ swap."
    ],
    [
     "<b>Virtual memory</b> = separation of user logical memory from physical memory: only part of the program is in memory, the logical address space can be <b>much larger than the physical address space</b>, address spaces can be shared, and process creation is more efficient. Implemented via <b>demand paging</b> or <b>demand segmentation</b>.",
     "الـ <b>Virtual memory</b> معناها فصل الـ logical memory بتاعة الـ user عن الـ physical memory: جزء بس من البرنامج في الـ memory، والـ logical address space ممكن يبقى <b>أكبر بكتير من الـ physical address space</b>، والـ address spaces ممكن تتشارك، وإنشاء الـ process بيبقى أكفأ. وبتتنفذ بالـ <b>demand paging</b> أو بالـ <b>demand segmentation</b>."
    ],
    [
     "<b>Demand paging</b>: bring a page into memory <b>only when it is needed</b> (less I/O, less memory, faster response, more users). Invalid reference → <b>abort</b>; not in memory → <b>bring it in</b>. <b>Lazy swapper</b>: never swaps a page in unless it will be needed; a swapper that deals with pages is a <b>pager</b>.",
     "الـ <b>Demand paging</b>: هات الـ page للـ memory <b>بس لما تتحتاج</b> (<bdi dir=\"ltr\">I/O</bdi> أقل، و memory أقل، و response أسرع، و users أكتر). لو الـ reference مش valid يبقى <b>abort</b>، ولو الـ page مش في الـ memory <b>نجيبها</b>. والـ <b>Lazy swapper</b> عمره ما بيدخّل page إلا لو هتتحتاج، والـ swapper اللي بيتعامل مع pages اسمه <b>pager</b>."
    ],
    [
     "<b>Valid–invalid bit</b> in each page-table entry: <b>v</b> = in memory, <b>i</b> = not in memory; <b>initially all entries are i</b>. If the MMU finds <b>i</b> during address translation → <b>page fault</b>.",
     "الـ <b>Valid–invalid bit</b> في كل page-table entry: الـ <b>v</b> معناها في الـ memory، والـ <b>i</b> معناها مش في الـ memory، و<b>في الأول كل الـ entries بتبقى i</b>. لو الـ MMU لقى <b>i</b> وهو بيترجم العنوان يبقى فيه <b>page fault</b>."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Page faults: handling and the 11 stages",
   "ar_h": "الـ Page fault: التعامل معاه والـ 11 مرحلة",
   "pts": [
    [
     "First reference to a non-resident page → <b>trap to the OS (page fault)</b>. Handling: (1) check another table: invalid → abort, just not in memory → continue; (2) find a <b>free frame</b>; (3) swap the page in by a scheduled disk operation; (4) reset the tables, <b>validation bit = v</b>; (5) <b>restart the instruction</b> that caused the fault.",
     "أول reference لـ page مش في الـ memory بيعمل <b>trap للـ OS (page fault)</b>. والتعامل معاه: (1) يبص في table تانية، لو الـ reference مش valid يعمل abort، ولو الـ page بس مش في الـ memory يكمّل؛ (2) يدوّر على <b>free frame</b>؛ (3) يجيب الـ page في الـ frame بعملية disk متجدولة؛ (4) يحدّث الجداول ويخلّي <b>الـ validation bit بـ v</b>؛ (5) يعمل <b>restart للـ instruction</b> اللي عملت الـ fault."
    ],
    [
     "<b>Worst-case stages (11)</b>: trap → save user registers and state → decide it was a page fault → check the reference is legal and locate the page on disk → issue a disk read to a free frame (queue, seek/latency, transfer) → <b>meanwhile give the CPU to another user</b> → disk I/O-complete interrupt → save the other user's registers and state → correct the page table → wait for the CPU again → restore registers, state and new page table, resume the instruction.",
     "الـ <b>مراحل في أسوأ حالة (11)</b>: الـ trap، وبعدين حفظ الـ user registers والـ state، وبعدين نعرف إنه page fault، وبعدين نتأكد إن الـ reference سليم ونلاقي مكان الـ page على الـ disk، وبعدين نطلب قراية من الـ disk لـ free frame (طابور، و seek أو latency، وبعدين transfer)، و<b>في الوقت ده الـ CPU بيروح لـ user تاني</b>، وبعدين interrupt من الـ disk إن الـ <bdi dir=\"ltr\">I/O</bdi> خلص، وبعدين نحفظ registers وحالة الـ user التاني، ونصلّح الـ page table، ونستنى الـ CPU يرجع، ونرجّع الـ registers والـ state والـ page table الجديدة ونكمّل الـ instruction."
    ],
    [
     "Trap: the faulting process does <b>not</b> busy-wait for the disk; the CPU is allocated to some other user while the page is read (stage 6).",
     "خد بالك: الـ process اللي عملت الـ fault <b>مش</b> بتعمل busy-wait للـ disk؛ الـ CPU بيتدّى لـ user تاني على ما الـ page تتقري (المرحلة 6)."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Page replacement: FIFO, Optimal, LRU and Belady",
   "ar_h": "الـ Page replacement: الـ FIFO والـ Optimal والـ LRU والـ Belady",
   "pts": [
    [
     "<b>No free frame</b> → page replacement: (1) locate the desired page on disk; (2) take a free frame, or pick a <b>victim frame</b> with the algorithm and <b>write it to disk only if dirty</b>; (3) read the page into the freed frame, update the page and frame tables; (4) restart the instruction. So up to <b>2 page transfers</b> per fault (out + in).",
     "<b>مفيش free frame</b> يبقى نعمل page replacement بالخطوات دي: (1) لاقي الـ page المطلوبة على الـ disk؛ (2) خد free frame، أو اختار <b>victim frame</b> بالـ algorithm و<b>اكتبه على الـ disk بس لو dirty</b>؛ (3) اقرا الـ page في الـ frame اللي فضي وحدّث الـ page والـ frame tables؛ (4) اعمل restart للـ instruction. يعني ممكن <b>2 page transfers</b> لكل fault (واحد out وواحد in)."
    ],
    [
     "The <b>frame-allocation</b> algorithm decides how many frames each process gets; the <b>page-replacement</b> algorithm chooses the victim and aims for the <b>lowest page-fault rate</b>.",
     "الـ <b>frame-allocation</b> algorithm بيقرر كل process تاخد كام frame، والـ <b>page-replacement</b> algorithm بيختار الـ victim وهدفه <b>أقل page-fault rate</b>."
    ],
    [
     "<b>FIFO</b>: replace the page in memory <b>longest</b> (oldest load). <b>Optimal (OPT)</b>: replace the page <b>not used for the longest time in the future</b>; lowest possible faults, but needs the future, so it is a <b>benchmark</b>. <b>LRU</b>: replace the page <b>not used for the longest time in the past</b>; between FIFO and OPT, generally good and frequently used.",
     "الـ <b>FIFO</b>: اطرد الـ page اللي قعدت في الـ memory <b>أطول وقت</b> (أقدم تحميل). والـ <b>Optimal (OPT)</b>: اطرد الـ page اللي <b>مش هتتستخدم لأطول فترة في المستقبل</b>؛ بيدّي أقل faults ممكنة بس محتاج يعرف المستقبل، فبيتستخدم <b>مقياس</b> للباقيين. والـ <b>LRU</b>: اطرد الـ page اللي <b>ماتستخدمتش من أطول فترة في الماضي</b>؛ بين الـ FIFO والـ OPT، وكويس ومستخدم كتير."
    ],
    [
     "Lecture string <code>7,0,1,2,0,3,0,4,2,3,0,3,0,3,2,1,2,0,1,7,0,1</code>, 3 frames: <b>FIFO 15</b>, <b>OPT 9</b>, <b>LRU 12</b>.",
     "الـ string بتاع المحاضرة:<span class=\"ltr\">7,0,1,2,0,3,0,4,2,3,0,3,0,3,2,1,2,0,1,7,0,1</span>بـ 3 frames بيدّي:<span class=\"ltr\">FIFO 15, OPT 9, LRU 12</span>"
    ],
    [
     "<b>Belady's anomaly</b> (FIFO only): <code>1,2,3,4,1,2,5,1,2,3,4,5</code> gives <b>9 faults with 3 frames but 10 with 4</b>: more frames can mean more faults. LRU and OPT are <b>stack algorithms</b> and never suffer from it.",
     "الـ <b>Belady's anomaly</b> (في الـ FIFO بس): الـ string ده:<span class=\"ltr\">1,2,3,4,1,2,5,1,2,3,4,5</span>بيدّي <b>9 faults بـ 3 frames بس 10 بـ 4</b>، يعني frames أكتر ممكن تعمل faults أكتر. والـ LRU والـ OPT من الـ <b>stack algorithms</b> ومش بيحصلهم كده."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "The method: counting page faults",
   "ar_h": "الطريقة: إزاي تعد الـ page faults",
   "pts": [
    [
     "Draw one column per reference and one row per frame, then a Fault row. <b>Filling an empty frame counts as a fault</b>; a reference to a page already in a frame is a <b>hit</b> (not a fault). Count the F marks.",
     "ارسم عمود لكل reference وصف لكل frame، وتحتهم صف للـ Fault. <b>ملو frame فاضي بيتحسب fault</b>، والـ reference لـ page موجودة في frame يبقى <b>hit</b> (مش fault). وفي الآخر عد علامات الـ F."
    ],
    [
     "Choosing the victim: <b>FIFO</b> → the page loaded earliest (a re-loaded page counts from its new load time); <b>OPT</b> → look ahead and evict the page whose next use is farthest (never used again = farthest); <b>LRU</b> → look back and evict the page whose last use is oldest.",
     "اختيار الـ victim: في الـ <b>FIFO</b> اطرد الـ page اللي اتحمّلت الأول (والـ page اللي اتحمّلت تاني بتتحسب من وقت تحميلها الجديد)؛ وفي الـ <b>OPT</b> بص لقدّام واطرد الـ page اللي استخدامها الجاي أبعد حاجة (ولو مش هتتستخدم تاني تبقى هي الأبعد)؛ وفي الـ <b>LRU</b> بص لورا واطرد الـ page اللي آخر استخدام ليها أقدم حاجة."
    ],
    [
     "Worked (lecture string, 3 frames): OPT at the 4th reference (2) evicts <b>7</b> (never used again), at 3 evicts <b>1</b>, at 4 evicts <b>0</b>. LRU at the 8th reference (4): frames 2, 0, 3 last used at positions 4, 7, 6, so it evicts <b>2</b>.",
     "مثال محلول (string المحاضرة، 3 frames): الـ OPT عند الـ reference الرابع (2) بيطرد <b>7</b> (مش هتتستخدم تاني)، وعند 3 بيطرد <b>1</b>، وعند 4 بيطرد <b>0</b>. والـ LRU عند الـ reference التامن (4): الـ frames فيها <bdi dir=\"ltr\">2, 0, 3</bdi> وآخر استخدام ليهم في الـ positions <bdi dir=\"ltr\">4, 7, 6</bdi>، فبيطرد <b>2</b>."
    ],
    [
     "Traps: the answer depends on the <b>number of frames</b> and on the exact string; a shorter or renamed exam string has its own counts, so never copy 15/9/12 without tracing.",
     "فخاخ: الإجابة بتعتمد على <b>عدد الـ frames</b> وعلى الـ string بالظبط؛ ولو الـ string في الامتحان أقصر أو أساميه متغيرة يبقى ليه أرقامه، فماتنقلش <bdi dir=\"ltr\">15/9/12</bdi> من غير ما تعمل الـ trace."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Implementing LRU and its approximations",
   "ar_h": "تنفيذ الـ LRU والـ approximations بتاعته",
   "pts": [
    [
     "<b>Counter</b>: copy the clock into the page's counter on every reference; replace the <b>smallest counter</b> (needs a search). <b>Stack</b>: doubly-linked stack of page numbers, move a referenced page to the top (<b>6 pointer changes</b>); more expensive per reference, but <b>no search</b> (the LRU page is at the bottom).",
     "الـ <b>Counter</b>: مع كل reference انسخ الـ clock في الـ counter بتاع الـ page، واطرد صاحب <b>أصغر counter</b> (محتاج search). والـ <b>Stack</b> معناه stack doubly-linked فيه أرقام الـ pages، والـ page اللي اتعملها reference تطلع فوق (<b>تغيير 6 pointers</b>)؛ كل reference أغلى، بس <b>مفيش search</b> (الـ LRU page تحت خالص)."
    ],
    [
     "<b>Reference bit</b>: 0 initially, set to 1 when referenced; replace a page with bit 0, but the <b>order is unknown</b>. <b>Second chance (clock)</b>: FIFO + reference bit: bit 0 → replace; bit 1 → <b>clear it to 0</b>, keep the page and check the next one by the same rules.",
     "الـ <b>Reference bit</b>: بيبدأ 0 ويبقى 1 لما الـ page تتعملها reference؛ اطرد page الـ bit بتاعها 0، بس <b>مانعرفش الترتيب</b>. والـ <b>Second chance (clock)</b> هو FIFO مع الـ reference bit: لو الـ bit بـ 0 اطردها، ولو بـ 1 <b>خليه 0</b> وسيب الـ page وشوف اللي بعدها بنفس القواعد."
    ],
    [
     "<b>Counting algorithms</b>: <b>LFU</b> replaces the <b>smallest</b> reference count; <b>MFU</b> replaces the <b>largest</b>, arguing the page with the smallest count was probably just brought in and has yet to be used.",
     "الـ <b>Counting algorithms</b>: الـ <b>LFU</b> بيطرد صاحب <b>أصغر</b> عدد references، والـ <b>MFU</b> بيطرد صاحب <b>أكبر</b> عدد، وحجته إن الـ page اللي عددها صغير غالبًا لسه داخلة ولسه هتتستخدم."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "<b>The big problem, in every final</b>: \"How many page faults with FIFO, Optimal and LRU?\" Trace each one in a table. Final 2025/26 Q3-a: <code>7,0,1,2,0,3,0,4,2,3,0,3,2,1</code>, 3 frames → <b>FIFO 11, OPT 8, LRU 10</b> (its FIFO count is also a quiz item). Final 2021/22 Q2-3: the first 16 lecture references, 3 frames → the same <b>11 / 8 / 10</b>.",
     "<b>المسألة الكبيرة، في كل Final</b>: \"كام page fault بالـ FIFO والـ Optimal والـ LRU؟\" اعمل trace لكل واحد في جدول. في Final <bdi dir=\"ltr\">2025/26</bdi> <bdi dir=\"ltr\">Q3-a</bdi>: الـ string ده بـ 3 frames:<span class=\"ltr\">7,0,1,2,0,3,0,4,2,3,0,3,2,1</span>والنتيجة:<span class=\"ltr\">FIFO 11, OPT 8, LRU 10</span>(ورقم الـ FIFO بتاعه موجود كمان كسؤال في الـ quiz). وفي Final <bdi dir=\"ltr\">2021/22</bdi> <bdi dir=\"ltr\">Q2-3</bdi>: أول 16 reference من string المحاضرة بـ 3 frames، ونفس النتيجة <bdi dir=\"ltr\">11 / 8 / 10</bdi>."
    ],
    [
     "Final 2024/25 Q2-2: <code>5,7,6,9,7,3,7,4,9,3,7,3,9,6,9,7,6,5,7,9,6</code>, <b>4 frames</b> → <b>FIFO 10, OPT 8, LRU 8</b>. Final 2023/24 Q1-c: the same string without the second-to-last 9 (a hit), 4 frames → the same <b>10 / 8 / 8</b>.",
     "في Final <bdi dir=\"ltr\">2024/25</bdi> <bdi dir=\"ltr\">Q2-2</bdi>: الـ string ده بـ <b>4 frames</b>:<span class=\"ltr\">5,7,6,9,7,3,7,4,9,3,7,3,9,6,9,7,6,5,7,9,6</span>والنتيجة:<span class=\"ltr\">FIFO 10, OPT 8, LRU 8</span>وفي Final <bdi dir=\"ltr\">2023/24</bdi> <bdi dir=\"ltr\">Q1-c</bdi>: نفس الـ string من غير الـ 9 اللي قبل الأخيرة (كانت hit)، بـ 4 frames، ونفس النتيجة <bdi dir=\"ltr\">10 / 8 / 8</bdi>."
    ],
    [
     "Final 2022/23 Q1-c: <code>5,8,6,2,8,3,8,4,2,3,8,3,8,3,2,6,2,8,6,5,8,6</code>, 3 frames: the lecture string renamed (7→5, 0→8, 1→6) → <b>FIFO 15, OPT 9, LRU 12</b>.",
     "في Final <bdi dir=\"ltr\">2022/23</bdi> <bdi dir=\"ltr\">Q1-c</bdi>: الـ string ده بـ 3 frames:<span class=\"ltr\">5,8,6,2,8,3,8,4,2,3,8,3,8,3,2,6,2,8,6,5,8,6</span>وده string المحاضرة بأسامي تانية <bdi dir=\"ltr\">(7→5, 0→8, 1→6)</bdi>، والنتيجة:<span class=\"ltr\">FIFO 15, OPT 9, LRU 12</span>"
    ],
    [
     "To score: show the frame table for each algorithm with the fault row, say which page is evicted at each fault, and give the three totals. LRU can never beat OPT (the minimum), and in every past paper FIFO had the most faults.",
     "عشان تاخد الدرجة: اعرض جدول الـ frames لكل algorithm مع صف الـ faults، وقول أنهي page اتطردت عند كل fault، واكتب الـ 3 أرقام في الآخر. والـ LRU عمره ما يبقى أحسن من الـ OPT (اللي هو أقل حاجة)، وفي كل الامتحانات اللي فاتت الـ FIFO كان عنده أكتر faults."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "System model and the four necessary conditions",
   "ar_h": "الـ System model والـ 4 necessary conditions",
   "pts": [
    [
     "Resource types R1…Rm (CPU cycles, memory space, I/O devices), each with <b>Wi instances</b>; a process uses a resource as <b>request → use → release</b>.",
     "فيه resource types من R1 لـ Rm (زي الـ CPU cycles والـ memory space والـ <bdi dir=\"ltr\">I/O&nbsp;devices</bdi>)، وكل نوع ليه <b>Wi instances</b>؛ والـ process بتستخدم الـ resource بالترتيب ده:<span class=\"ltr\">request → use → release</span>"
    ],
    [
     "Deadlock can arise only if <b>all four hold simultaneously</b>: (1) <b>mutual exclusion</b>: one process at a time uses a resource; (2) <b>hold and wait</b>: holding at least one resource while waiting for others held by other processes; (3) <b>no preemption</b>: a resource is released only voluntarily after the task completes; (4) <b>circular wait</b>: P0 waits for P1, P1 for P2, …, Pn for P0.",
     "الـ Deadlock ممكن يحصل بس لو <b>الـ 4 شروط اتحققوا مع بعض</b>: (1) الـ <b>mutual exclusion</b> يعني process واحدة بس في المرة تستخدم الـ resource؛ (2) الـ <b>hold and wait</b>: ماسكة resource على الأقل ومستنية resources تانية مع processes تانية؛ (3) الـ <b>no preemption</b>: الـ resource مابيتسابش غير بمزاج الـ process بعد ما تخلص؛ (4) الـ <b>circular wait</b>: الـ P0 مستنية P1، والـ P1 مستنية P2، لحد Pn اللي مستنية P0."
    ],
    [
     "Trap: \"preemption\" is <b>not</b> a condition; the condition is <b>no</b> preemption.",
     "خد بالك: الـ \"preemption\" <b>مش</b> من الشروط؛ الشرط هو <b>no</b> preemption."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Resource-allocation graph",
   "ar_h": "الـ Resource-allocation graph",
   "pts": [
    [
     "Processes are circles, resource types are boxes with one dot per instance. <b>Request edge</b> Pi → Rj; <b>assignment edge</b> Rj → Pi (from an instance dot).",
     "الـ processes دواير، والـ resource types مربعات فيها نقطة لكل instance. الـ <b>Request edge</b> بيبقى <bdi dir=\"ltr\">Pi → Rj</bdi>، والـ <b>assignment edge</b> بيبقى <bdi dir=\"ltr\">Rj → Pi</bdi> (من نقطة الـ instance)."
    ],
    [
     "<b>No cycle → no deadlock.</b> Cycle + <b>one instance per type → deadlock</b>. Cycle + several instances → only a <b>possibility</b> of deadlock.",
     "<b>مفيش cycle يبقى مفيش deadlock.</b> وفيه cycle مع <b>instance واحد لكل نوع يبقى deadlock</b>. وفيه cycle مع كذا instance يبقى فيه <b>احتمال</b> deadlock بس."
    ],
    [
     "Slide graphs: adding P3 → R2 makes two cycles and P1, P2, P3 are all deadlocked. The cycle P1 → R1 → P3 → R2 → P1 is <b>not</b> a deadlock because the other instances of R1 and R2 are held by P2 and P4, which can release them.",
     "رسومات السلايد: لما نزوّد <bdi dir=\"ltr\">P3 → R2</bdi> بيبقى فيه 2 cycles والـ P1 والـ P2 والـ P3 كلهم في deadlock. أما الـ cycle ده:<span class=\"ltr\">P1 → R1 → P3 → R2 → P1</span>فـ <b>مش</b> deadlock، لأن الـ instances التانية من R1 و R2 مع P2 و P4، ودول يقدروا يسيبوها."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Handling deadlocks and prevention",
   "ar_h": "التعامل مع الـ deadlocks والـ prevention",
   "pts": [
    [
     "Three ways: never enter deadlock (<b>prevention</b> or <b>avoidance</b>); allow it, then <b>detect and recover</b>; or <b>ignore</b> the problem (most OSs, including UNIX).",
     "فيه 3 طرق: نضمن إننا عمرنا ما ندخل deadlock (<b>prevention</b> أو <b>avoidance</b>)، أو نسيبه يحصل وبعدين <b>نكتشفه ونعمل recover</b>، أو <b>نتجاهل</b> المشكلة (أغلب الـ OSs ومنهم UNIX)."
    ],
    [
     "<b>Prevention</b> = make sure one condition can never hold. Mutual exclusion: not needed for sharable resources (read-only files) but must hold for non-sharable ones, so it generally cannot be denied. Hold and wait: request <b>all</b> resources before execution, or only when holding none (<b>low utilization, starvation</b>).",
     "الـ <b>Prevention</b> معناه نضمن إن شرط واحد على الأقل عمره ما يتحقق. الـ Mutual exclusion: مش محتاجينه للـ sharable resources (زي الـ read-only files) بس لازم للـ non-sharable، فغالبًا مانقدرش نلغيه. والـ Hold and wait: اطلب <b>كل</b> الـ resources قبل التنفيذ، أو اطلب بس وانت مش ماسك حاجة (<b>utilization قليل، و starvation ممكن</b>)."
    ],
    [
     "No preemption: a process that cannot get a requested resource <b>releases everything it holds</b> and restarts when it can get old + new (for resources whose state is easily saved: CPU registers, memory). Circular wait: <b>total ordering</b> of resource types, request in <b>increasing order</b> (tape 1, disk 5, printer 12: tape before printer).",
     "الـ No preemption: الـ process اللي ماتقدرش تاخد resource طلبته <b>بتسيب كل اللي ماسكاه</b>، وتبدأ تاني لما تقدر تاخد القديم والجديد (للـ resources اللي حالتها سهل تتحفظ زي الـ CPU registers والـ memory). والـ Circular wait: <b>ترتيب كامل</b> للـ resource types، والطلب يبقى <b>بترتيب تصاعدي</b>:<span class=\"ltr\">tape 1, disk 5, printer 12</span>يعني الـ tape قبل الـ printer."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Avoidance: safe state and the banker's algorithm",
   "ar_h": "الـ Avoidance: الـ safe state والـ banker's algorithm",
   "pts": [
    [
     "Avoidance needs <b>a priori</b> information: each process declares its <b>maximum</b> need; on each request the system grants only if the state stays <b>safe</b>.",
     "الـ Avoidance محتاج معلومات <b>مسبقة</b>: كل process بتعلن <b>أقصى</b> احتياجها، ومع كل request السيستم بيوافق بس لو الحالة هتفضل <b>safe</b>."
    ],
    [
     "<b>Safe state</b>: a sequence of <b>all</b> processes exists where each one's remaining needs can be met by Available + what all earlier ones release. <b>Safe → no deadlock; unsafe → possibility of deadlock.</b> Single instance per type → RAG with claim edges; multiple instances → <b>banker's algorithm</b>.",
     "الـ <b>Safe state</b>: فيه sequence فيها <b>كل</b> الـ processes، وكل واحدة احتياجها الباقي يتلبّى من الـ Available زائد اللي بيسيبوه اللي قبلها. <b>الـ safe معناه مفيش deadlock، والـ unsafe معناه فيه احتمال deadlock.</b> ولو instance واحد لكل نوع نستخدم RAG بالـ claim edges، ولو كذا instance نستخدم الـ <b>banker's algorithm</b>."
    ],
    [
     "Data: Available[m], Max[n×m], Allocation[n×m], Need[n×m] with <b>Need = Max − Allocation</b>. Check: <b>Available = totals − column sums of Allocation</b>.",
     "الداتا: الـ Available والـ Max والـ Allocation والـ Need، وفيه:<span class=\"ltr\">Need = Max − Allocation</span>وللتأكد:<span class=\"ltr\">Available = Total − Σ Allocation (per column)</span>"
    ],
    [
     "<b>Safety</b>: Work = Available; repeatedly find an unfinished Pi with <b>Need_i ≤ Work</b>, then Work += Allocation_i; safe if all finish. <b>Resource request</b>: Request ≤ Need (else <b>error</b>), Request ≤ Available (else <b>wait</b>), pretend to allocate (Available −, Allocation +, Need −), run safety: safe → grant, unsafe → wait and restore.",
     "الـ <b>Safety</b>: ابدأ بـ <bdi dir=\"ltr\">Work = Available</bdi>، ودوّر كل مرة على Pi لسه ماخلصتش و <bdi dir=\"ltr\">Need_i ≤ Work</bdi>، وبعدين زوّد الـ Allocation بتاعها على الـ Work؛ ولو كلهم خلصوا يبقى safe. والـ <b>Resource request</b>: لازم <bdi dir=\"ltr\">Request ≤ Need</bdi> (غير كده <b>error</b>)، و <bdi dir=\"ltr\">Request ≤ Available</bdi> (غير كده <b>wait</b>)، وبعدين نعمل allocate على سبيل التجربة (الـ Available يقل، والـ Allocation يزيد، والـ Need يقل) ونشغّل الـ safety: لو safe نوافق، ولو unsafe تستنى ونرجّع الحالة القديمة."
    ],
    [
     "Worked (lecture): A = 10, B = 5, C = 7, Available (3,3,2); Need P0 743, P1 122, P2 600, P3 011, P4 431. Work 332 → P1 → 532 → P3 → 743 → P4 → 745 → P0 → 755 → P2 → 10 5 7 (= totals) → <b>safe, &lt;P1, P3, P4, P0, P2&gt;</b>. P1 requesting (1,0,2) is <b>granted</b> (the new state is still safe).",
     "مثال المحاضرة: الـ totals <bdi dir=\"ltr\">A = 10, B = 5, C = 7</bdi> والـ Available <bdi dir=\"ltr\">(3,3,2)</bdi>، والـ Need:<span class=\"ltr\">P0 743, P1 122, P2 600, P3 011, P4 431</span>والـ Work ماشي كده:<span class=\"ltr\">332 → P1 → 532 → P3 → 743 → P4 → 745 → P0 → 755 → P2 → 10 5 7</span>وده بيساوي الـ totals، يعني <b>safe</b> بالـ sequence دي:<span class=\"ltr\">&lt;P1, P3, P4, P0, P2&gt;</span>ولو P1 طلبت <bdi dir=\"ltr\">(1,0,2)</bdi> الطلب <b>بيتقبل</b> (الحالة الجديدة لسه safe)."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Detection and recovery",
   "ar_h": "الـ Detection والـ recovery",
   "pts": [
    [
     "<b>Single instance per type</b>: a <b>wait-for graph</b> (processes only; Pi → Pj if Pi waits for Pj; made by collapsing the RAG's resource nodes). A cycle means deadlock; the search costs <b>O(n²)</b>.",
     "لو <b>instance واحد لكل نوع</b>: نستخدم <b>wait-for graph</b> (فيه processes بس، وفيه سهم <bdi dir=\"ltr\">Pi → Pj</bdi> لو Pi مستنية Pj، وبنعمله من الـ RAG بإننا نشيل الـ resource nodes). ولو فيه cycle يبقى فيه deadlock، والبحث بياخد <b><bdi dir=\"ltr\">O(n²)</bdi></b>."
    ],
    [
     "<b>Several instances</b>: like the safety algorithm, but it uses <b>Request_i ≤ Work</b> instead of Need, and <b>Finish[i] starts true if Allocation_i = 0</b>. Any Pi left with Finish = false is <b>deadlocked</b>.",
     "لو <b>كذا instance</b>: زي الـ safety algorithm، بس بيستخدم <bdi dir=\"ltr\">Request_i ≤ Work</bdi> بدل الـ Need، والـ <b><bdi dir=\"ltr\">Finish[i]</bdi> بتبدأ true لو <bdi dir=\"ltr\">Allocation_i = 0</bdi></b>. وأي Pi تفضل الـ Finish بتاعها false تبقى <b>في deadlock</b>."
    ],
    [
     "Worked (lecture): A = 7, B = 2, C = 6, Available (0,0,0) → &lt;P0, P2, P3, P1, P4&gt;, no deadlock. If P2 requests one more C, only P0 can finish: <b>P1, P2, P3 and P4 are deadlocked</b>.",
     "مثال المحاضرة: الـ totals <bdi dir=\"ltr\">A = 7, B = 2, C = 6</bdi> والـ Available <bdi dir=\"ltr\">(0,0,0)</bdi>، والنتيجة sequence كده ومفيش deadlock:<span class=\"ltr\">&lt;P0, P2, P3, P1, P4&gt;</span>ولو P2 طلبت C واحدة زيادة، P0 بس اللي تقدر تخلص، و<b>الـ P1 والـ P2 والـ P3 والـ P4 في deadlock</b>."
    ],
    [
     "<b>Recovery</b>: process termination (abort <b>all</b> deadlocked, or <b>one at a time</b> until the cycle is gone; choose by priority, time computed and left, resources used and needed, how many to terminate, interactive or batch). Resource preemption: <b>select a victim</b> (minimum cost), <b>rollback</b> to a safe state, avoid <b>starvation</b> by counting rollbacks in the cost.",
     "الـ <b>Recovery</b>: إما process termination (نعمل abort لـ <b>كل</b> اللي في الـ deadlock، أو <b>واحدة واحدة</b> لحد ما الـ cycle تتشال، ونختار حسب الـ priority، واشتغلت قد إيه وفاضلها قد إيه، والـ resources اللي استخدمتها واللي محتاجاها، وكام process هنقفل، و interactive ولا batch). أو resource preemption: <b>نختار victim</b> بأقل تكلفة، ونعمل <b>rollback</b> لـ safe state، ونمنع الـ <b>starvation</b> بإننا نحسب عدد الـ rollbacks في التكلفة."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "<b>The big problem, in every final</b>: \"What is the content of Need? Is the system safe?\" Write the Need table, then the Work vector after each process. Finals 2024/25 Q2-3 and 2021/22 Q2-4: A = 3, B = 14, C = 12, D = 12, Available (1,5,2,0) → Need P0 0000, P1 0750, P2 1002, P3 0020, P4 0642 → <b>safe, &lt;P0, P2, P3, P4, P1&gt;</b>, final Work (3,14,12,12) = totals.",
     "<b>المسألة الكبيرة، في كل Final</b>: \"إيه محتوى الـ Need؟ والسيستم safe ولا لأ؟\" اكتب جدول الـ Need، وبعدين الـ Work بعد كل process. في Finals <bdi dir=\"ltr\">2024/25</bdi> <bdi dir=\"ltr\">Q2-3</bdi> و <bdi dir=\"ltr\">2021/22</bdi> <bdi dir=\"ltr\">Q2-4</bdi>: الـ totals <bdi dir=\"ltr\">A = 3, B = 14, C = 12, D = 12</bdi> والـ Available <bdi dir=\"ltr\">(1,5,2,0)</bdi>، والـ Need:<span class=\"ltr\">P0 0000, P1 0750, P2 1002, P3 0020, P4 0642</span>والنتيجة <b>safe</b> بالـ sequence دي، والـ Work في الآخر <bdi dir=\"ltr\">(3,14,12,12)</bdi> بيساوي الـ totals:<span class=\"ltr\">&lt;P0, P2, P3, P4, P1&gt;</span>"
    ],
    [
     "Final 2022/23 Q1-d: the same snapshot with three resources (A = 3, B = 14, C = 12, Available (1,5,2)) → Need P0 000, P1 075, P2 100, P3 002, P4 064 → <b>safe, &lt;P0, P2, P3, P4, P1&gt;</b>.",
     "في Final <bdi dir=\"ltr\">2022/23</bdi> <bdi dir=\"ltr\">Q1-d</bdi>: نفس الـ snapshot بـ 3 resources (<bdi dir=\"ltr\">A = 3, B = 14, C = 12</bdi> والـ Available <bdi dir=\"ltr\">(1,5,2)</bdi>)، والـ Need:<span class=\"ltr\">P0 000, P1 075, P2 100, P3 002, P4 064</span>والنتيجة <b>safe</b> بنفس الـ sequence:<span class=\"ltr\">&lt;P0, P2, P3, P4, P1&gt;</span>"
    ],
    [
     "Final 2023/24 Q1-d: A = 7, B = 2, C = 6, Available (0,0,0), Max P2 = 3 0 3 → Need P2 = 000 → <b>safe, &lt;P0, P2, P3, P4, P1&gt;</b>. Final 2025/26 Q1-a: the same table but Max P2 = 3 0 4 → Need P2 = 001; after P0, Work = (0,1,0) and nobody else fits → <b>unsafe</b> (this is the lecture's detection example with P2's extra C).",
     "في Final <bdi dir=\"ltr\">2023/24</bdi> <bdi dir=\"ltr\">Q1-d</bdi>: الـ totals <bdi dir=\"ltr\">A = 7, B = 2, C = 6</bdi> والـ Available <bdi dir=\"ltr\">(0,0,0)</bdi> والـ Max بتاع P2 هو <bdi dir=\"ltr\">3 0 3</bdi>، يعني Need P2 بـ <bdi dir=\"ltr\">000</bdi>، والنتيجة <b>safe</b>:<span class=\"ltr\">&lt;P0, P2, P3, P4, P1&gt;</span>وفي Final <bdi dir=\"ltr\">2025/26</bdi> <bdi dir=\"ltr\">Q1-a</bdi>: نفس الجدول بس الـ Max بتاع P2 هو <bdi dir=\"ltr\">3 0 4</bdi>، يعني Need P2 بـ <bdi dir=\"ltr\">001</bdi>؛ بعد P0 الـ Work بيبقى <bdi dir=\"ltr\">(0,1,0)</bdi> ومفيش حد تاني ينفع، فالسيستم <b>unsafe</b> (وده مثال الـ detection بتاع المحاضرة لما P2 تطلب C زيادة)."
    ],
    [
     "Theory: the <b>four necessary conditions</b> (Finals 2024/25, 2021/22) and the conditions <b>plus how to prevent each</b> (Final 2022/23). An Available of all zeros does not mean unsafe: processes with Need 0 finish first and release their resources.",
     "النظري: <b>الـ 4 necessary conditions</b> (Finals <bdi dir=\"ltr\">2024/25</bdi> و <bdi dir=\"ltr\">2021/22</bdi>)، والشروط <b>وإزاي نمنع كل واحد</b> (Final <bdi dir=\"ltr\">2022/23</bdi>). وخد بالك: الـ Available لو كله أصفار مش معناه unsafe؛ الـ processes اللي الـ Need بتاعها صفر بتخلص الأول وتسيب الـ resources بتاعتها."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Files: concept, attributes, operations and open files",
   "ar_h": "الـ Files: المفهوم والـ attributes والـ operations والـ open files",
   "pts": [
    [
     "A file is a <b>contiguous logical address space</b>; types: data (numeric, character, binary) and program. Information about files is kept in the <b>directory structure</b> on the disk.",
     "الـ file هو <b>contiguous logical address space</b>، وأنواعه data (numeric أو character أو binary) و program. والمعلومات عن الـ files متخزنة في الـ <b>directory structure</b> على الـ disk."
    ],
    [
     "<b>7 attributes</b>: <b>name</b> (the only human-readable one), <b>identifier</b> (unique tag within the file system), <b>type</b>, <b>location</b> (pointer to the file on the device), <b>size</b>, <b>protection</b> (who can read, write, execute), <b>time, date and user identification</b> (protection, security, usage monitoring). Extended attributes include a file checksum.",
     "<b>الـ 7 attributes</b>: الـ <b>name</b> (الوحيد اللي مقروء للإنسان)، والـ <b>identifier</b> (رقم مميز جوه الـ file system)، والـ <b>type</b>، والـ <b>location</b> (pointer لمكان الـ file على الجهاز)، والـ <b>size</b>، والـ <b>protection</b> (مين يقرا ويكتب وينفّذ)، والـ <b>time والـ date والـ user identification</b> (للـ protection والـ security ومتابعة الاستخدام). والـ extended attributes فيها زي الـ file checksum."
    ],
    [
     "<b>Operations</b>: create, write (write pointer), read (read pointer), reposition (<b>seek</b>), delete, truncate; <b>open(Fi)</b> searches the directory on disk and moves the entry to memory; <b>close(Fi)</b> moves it back to the directory on disk.",
     "الـ <b>Operations</b>: الـ create، والـ write (عند الـ write pointer)، والـ read (عند الـ read pointer)، والـ reposition (<b>seek</b>)، والـ delete، والـ truncate؛ والـ <b><code>open(Fi)</code></b> بيدوّر في الـ directory على الـ disk وينقل الـ entry للـ memory، والـ <b><code>close(Fi)</code></b> بيرجّعها للـ directory على الـ disk."
    ],
    [
     "<b>Open files</b> need: the <b>open-file table</b>, a <b>file pointer</b> (last read/write location, per process), the <b>file-open count</b> (remove the entry when the last process closes) and <b>access rights</b> (per-process mode).",
     "الـ <b>Open files</b> محتاجة: الـ <b>open-file table</b>، والـ <b>file pointer</b> (آخر مكان قرينا أو كتبنا فيه، لكل process)، والـ <b>file-open count</b> (عشان نشيل الـ entry لما آخر process تقفل)، والـ <b>access rights</b> (الـ mode لكل process)."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "File types, structure and access methods",
   "ar_h": "أنواع الـ files والـ structure والـ access methods",
   "pts": [
    [
     "Types by extension: executable (exe, com, bin), object (obj, o), source (c, java, asm), batch (bat, sh), text (txt, doc), library (lib, a, so, dll), print/view (ps, pdf, jpg), archive (zip, tar), multimedia (mp3, mp4, avi). <b>Structure</b>: none (words or bytes), simple records (lines, fixed or variable length), complex (formatted document, relocatable load file); decided by the <b>OS</b> or the <b>program</b>.",
     "الأنواع بالـ extension: الـ executable <bdi dir=\"ltr\">(exe, com, bin)</bdi>، والـ object <bdi dir=\"ltr\">(obj, o)</bdi>، والـ source <bdi dir=\"ltr\">(c, java, asm)</bdi>، والـ batch <bdi dir=\"ltr\">(bat, sh)</bdi>، والـ text <bdi dir=\"ltr\">(txt, doc)</bdi>، والـ library <bdi dir=\"ltr\">(lib, a, so, dll)</bdi>، والـ print/view <bdi dir=\"ltr\">(ps, pdf, jpg)</bdi>، والـ archive <bdi dir=\"ltr\">(zip, tar)</bdi>، والـ multimedia <bdi dir=\"ltr\">(mp3, mp4, avi)</bdi>. والـ <b>Structure</b>: يا none (words أو bytes)، يا simple records (lines أو fixed أو variable length)، يا complex (formatted document أو relocatable load file)؛ واللي بيحددها الـ <b>OS</b> أو الـ <b>program</b>."
    ],
    [
     "<b>Sequential</b> (tape model): read next, write next, reset, no read after last write. <b>Direct</b>: fixed-length logical records, read n / write n / position to n, where <b>n = relative block number</b> (lets the OS decide where the file is placed).",
     "الـ <b>Sequential</b> (موديل الـ tape): الـ read next، والـ write next، والـ reset، ومفيش read بعد آخر write. والـ <b>Direct</b> فيه logical records ثابتة الطول، و read n و write n و position to n، والـ <b>n هو الـ relative block number</b> (وده بيخلّي الـ OS يقرر يحط الـ file فين)."
    ],
    [
     "Sequential on direct with <b>cp</b>: reset → cp = 0; read next → read cp, cp = cp + 1; write next → write cp, cp = cp + 1. Example: cp = 4, read next → block 4 is read, cp = 5.",
     "الـ Sequential على direct بالـ <b>cp</b>:<span class=\"ltr\">reset → cp = 0</span><span class=\"ltr\">read next → read cp; cp = cp + 1</span><span class=\"ltr\">write next → write cp; cp = cp + 1</span>مثال: لو <bdi dir=\"ltr\">cp = 4</bdi> وعملنا read next، بنقرا block 4 والـ cp يبقى 5."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Directories, sharing and protection",
   "ar_h": "الـ Directories والـ sharing والـ protection",
   "pts": [
    [
     "Directory = collection of nodes with information about all files; <b>both the directory and the files reside on disk</b>. Operations: search, create, delete, list, rename, traverse. Goals: <b>efficiency</b> (find fast), <b>naming</b> (same name for different users, several names for one file), <b>grouping</b> (e.g. all Java programs).",
     "الـ Directory هو مجموعة nodes فيها معلومات عن كل الـ files، و<b>الـ directory والـ files الاتنين على الـ disk</b>. والـ operations هي الـ search والـ create والـ delete والـ list والـ rename والـ traverse. والأهداف: الـ <b>efficiency</b> (نلاقي بسرعة)، والـ <b>naming</b> (نفس الاسم لـ users مختلفين، وكذا اسم لنفس الـ file)، والـ <b>grouping</b> (زي كل برامج الـ Java)."
    ],
    [
     "<b>Single-level</b>: one directory for all users → <b>naming problem</b> (unique names) and <b>no grouping</b>. <b>Two-level</b>: a UFD per user → same names allowed (path name), efficient search, still <b>no grouping</b>. <b>Tree</b>: efficient search, grouping, a current directory, absolute or relative paths; new files go in the current directory; deleting a directory deletes its whole subtree.",
     "الـ <b>Single-level</b> فيه directory واحد لكل الـ users، وفيه <b>naming problem</b> (لازم أسامي مختلفة) و<b>مفيش grouping</b>. والـ <b>Two-level</b> فيه UFD لكل user، فالأسامي ممكن تتكرر (بالـ path name)، والـ search كفء، بس لسه <b>مفيش grouping</b>. والـ <b>Tree</b> فيه search كفء، و grouping، و current directory، و paths يا absolute يا relative؛ والـ files الجديدة بتتعمل في الـ current directory، ومسح directory بيمسح الـ subtree كله."
    ],
    [
     "Sharing uses a protection scheme; <b>NFS</b> shares files across a network. Each file has an <b>owner</b> and a <b>group</b> (user IDs, group IDs). Access types: <b>read, write, execute, append, delete, list</b>.",
     "الـ Sharing بيتعمل بـ protection scheme، والـ <b>NFS</b> بيشارك الـ files على الـ network. وكل file ليه <b>owner</b> و <b>group</b> (بالـ user IDs والـ group IDs). وأنواع الـ access: الـ <b>read</b> والـ <b>write</b> والـ <b>execute</b> والـ <b>append</b> والـ <b>delete</b> والـ <b>list</b>."
    ],
    [
     "UNIX: read, write, execute for <b>owner, group, public</b>, one octal digit each (R = 4, W = 2, X = 1). <code>chmod 761 game</code> → owner RWX (7 = 111), group RW- (6 = 110), public --X (1 = 001). Windows uses access-control lists.",
     "في UNIX: الـ read والـ write والـ execute لـ <b>الـ owner والـ group والـ public</b>، ورقم octal لكل واحد <bdi dir=\"ltr\">(R = 4, W = 2, X = 1)</bdi>. مثال:<span class=\"ltr\">chmod 761 game</span>يعني الـ owner ليه RWX <bdi dir=\"ltr\">(7 = 111)</bdi>، والـ group ليه <bdi dir=\"ltr\">RW-</bdi> <bdi dir=\"ltr\">(6 = 110)</bdi>، والـ public ليه <bdi dir=\"ltr\">--X</bdi> <bdi dir=\"ltr\">(1 = 001)</bdi>. والـ Windows بيستخدم access-control lists."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "File-system implementation and allocation methods",
   "ar_h": "تنفيذ الـ file system والـ allocation methods",
   "pts": [
    [
     "Disk I/O is in <b>blocks of sectors</b> (usually 512 bytes). The <b>FCB</b> (file control block) holds information about a file. Directory as a <b>linear list</b>: simple but slow (linear search; can be kept sorted with a linked list or B+ tree). <b>Hash table</b>: faster search, but <b>collisions</b>; good only with fixed-size entries or chained overflow.",
     "الـ disk بيعمل <bdi dir=\"ltr\">I/O</bdi> بـ <b>blocks of sectors</b> (غالبًا <bdi dir=\"ltr\">512 bytes</bdi>). والـ <b>FCB</b> (file control block) فيه معلومات الـ file. والـ directory كـ <b>linear list</b>: سهل بس بطيء (linear search، وممكن يتظبط مترتب بـ linked list أو B+ tree). والـ <b>Hash table</b>: البحث أسرع بس فيه <b>collisions</b>، وكويس بس لو الـ entries ثابتة الحجم أو بالـ chained overflow."
    ],
    [
     "<b>Contiguous</b>: contiguous blocks, directory keeps <b>start + length</b> (tr: 14, 3 → blocks 14, 15, 16); best performance and simple. Problems: finding space, <b>knowing the size in advance</b>, <b>external fragmentation</b>, compaction.",
     "الـ <b>Contiguous</b> معناه blocks ورا بعض، والـ directory بيحفظ <b>الـ start والـ length</b> (مثلًا tr بـ <bdi dir=\"ltr\">14, 3</bdi> يعني الـ blocks <bdi dir=\"ltr\">14, 15, 16</bdi>)؛ أحسن أداء وبسيط. ومشاكله: نلاقي مكان، و<b>لازم نعرف الحجم من الأول</b>، و<b>external fragmentation</b>، و compaction."
    ],
    [
     "<b>Linked</b>: scattered blocks, each points to the next, null at the end; directory keeps start and end (jeep: 9 → 16 → 1 → 10 → 25). + no external fragmentation, no compaction, no size needed. − reliability (lost pointer), slow direct access (many I/Os and seeks), pointer space. <b>FAT</b>: links kept in a table at the start of the volume (test: 217 → 618 → 339, FAT[339] = −1 = end).",
     "الـ <b>Linked</b> معناه blocks متفرقة، كل واحد بيشاور على اللي بعده، و null في الآخر، والـ directory بيحفظ الأول والآخر (في مثال jeep السلسلة هي <bdi dir=\"ltr\">9 → 16 → 1 → 10 → 25</bdi>). مميزاته: مفيش external fragmentation، ولا compaction، ولا لازم نعرف الحجم. وعيوبه: الـ reliability (لو pointer ضاع)، والـ direct access بطيء (<bdi dir=\"ltr\">I/Os</bdi> و seeks كتير)، ومساحة للـ pointers. والـ <b>FAT</b>: الـ links محطوطة في table في أول الـ volume (في مثال test السلسلة هي <bdi dir=\"ltr\">217 → 618 → 339</bdi>، و <bdi dir=\"ltr\">FAT[339] = −1</bdi> يعني آخر الـ file)."
    ],
    [
     "<b>Indexed</b>: each file has an <b>index block</b> of pointers (jeep's index block 19 lists 9, 16, 1, 10, 25). + <b>random access</b>, no external fragmentation. − index-block overhead. A 256 KB file with 512-byte blocks = 512 blocks → <b>1 index block</b>; unbounded files use a <b>linked scheme</b> of index blocks.",
     "الـ <b>Indexed</b>: كل file ليه <b>index block</b> فيه pointers (الـ index block رقم 19 بتاع jeep فيه <bdi dir=\"ltr\">9, 16, 1, 10, 25</bdi>). مميزاته: <b>random access</b> ومفيش external fragmentation. وعيبه: الـ overhead بتاع الـ index block. والـ file اللي <bdi dir=\"ltr\">256 KB</bdi> بـ blocks <bdi dir=\"ltr\">512 bytes</bdi> يبقى <bdi dir=\"ltr\">512 blocks</bdi>، يعني <b>index block واحد</b>؛ والـ files اللي ملهاش حد بتستخدم <b>linked scheme</b> من الـ index blocks."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "<b>Allocation methods are asked in every final</b>: \"Differentiate between linked and indexed allocation\" (Final 2025/26 Q2-b); \"Describe linked and indexed\" (Final 2024/25); \"State the types and describe indexed allocation in detail\" (Final 2023/24); \"Describe the file allocation methods\" (Final 2022/23); \"What are the file allocation methods?\" (Final 2021/22).",
     "<b>الـ allocation methods بتيجي في كل Final</b>: \"فرّق بين الـ linked والـ indexed allocation\" (Final <bdi dir=\"ltr\">2025/26</bdi> <bdi dir=\"ltr\">Q2-b</bdi>)؛ و\"اشرح الـ linked والـ indexed\" (Final <bdi dir=\"ltr\">2024/25</bdi>)؛ و\"اذكر الأنواع واشرح الـ indexed بالتفصيل\" (Final <bdi dir=\"ltr\">2023/24</bdi>)؛ و\"اشرح الـ file allocation methods\" (Final <bdi dir=\"ltr\">2022/23</bdi>)؛ و\"إيه هي الـ file allocation methods؟\" (Final <bdi dir=\"ltr\">2021/22</bdi>)."
    ],
    [
     "To score: for each method give the idea, what the directory keeps, direct access, external fragmentation, whether the size must be known, and the overhead; add the lecture examples (jeep chain, FAT 217 → 618 → 339, index block 19, 256 KB → 1 index block, the linked scheme).",
     "عشان تاخد الدرجة: لكل method قول الفكرة، والـ directory بيحفظ إيه، والـ direct access، والـ external fragmentation، ولازم نعرف الحجم ولا لأ، والـ overhead؛ وزوّد أمثلة المحاضرة (سلسلة jeep، والـ FAT <bdi dir=\"ltr\">217 → 618 → 339</bdi>، والـ index block رقم 19، و <bdi dir=\"ltr\">256 KB</bdi> محتاج index block واحد، والـ linked scheme)."
    ],
    [
     "Past papers have nothing else from this lecture. Other questions it supports: the file attributes and operations, single-level vs two-level directories, contiguous allocation, chmod values.",
     "الامتحانات اللي فاتت مفيهاش حاجة تانية من المحاضرة دي. وأسئلة تانية ممكن تيجي منها: الـ file attributes والـ operations، والفرق بين الـ single-level والـ two-level directories، والـ contiguous allocation، وقيم الـ chmod."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "I/O hardware: ports, buses, controllers and registers",
   "ar_h": "الـ I/O hardware: الـ ports والـ buses والـ controllers والـ registers",
   "pts": [
    [
     "I/O management is a <b>major component</b> of OS design: devices vary greatly and new types appear often. <b>Device drivers</b> hide device details and give the I/O subsystem a uniform interface. Device categories: <b>storage, transmission, human-interface</b>.",
     "الـ <bdi dir=\"ltr\">I/O</bdi> management <b>جزء أساسي</b> في تصميم الـ OS: الأجهزة مختلفة جدًا وأنواع جديدة بتظهر كتير. والـ <b>Device drivers</b> بتخبّي تفاصيل الجهاز وبتدّي الـ <bdi dir=\"ltr\">I/O</bdi> subsystem واجهة موحّدة. وأنواع الأجهزة: <b>storage</b> و <b>transmission</b> و <b>human-interface</b>."
    ],
    [
     "<b>Port</b> = connection point. <b>Bus</b> = shared direct access (<b>PCI</b>, PCIe; the <b>expansion bus</b> for slow devices: keyboard, serial and parallel ports). <b>Controller (host adapter)</b> = electronics operating a port, bus or device; may have a processor, microcode, private memory and a bus controller.",
     "الـ <b>Port</b> هو نقطة التوصيل. والـ <b>Bus</b> هو access مباشر متشارك (الـ <b>PCI</b> والـ PCIe، والـ <b>expansion bus</b> للأجهزة البطيئة زي الـ keyboard والـ serial والـ parallel ports). والـ <b>Controller (host adapter)</b> هو الإلكترونيات اللي بتشغّل الـ port أو الـ bus أو الجهاز، وممكن يبقى فيه processor و microcode و private memory و bus controller."
    ],
    [
     "Device registers: <b>data-in, data-out, status, control</b> (1-4 bytes or a FIFO buffer). Addressing by <b>direct I/O instructions</b> or <b>memory-mapped I/O</b> (registers mapped into the processor's address space, e.g. graphics). PC ports: 000-00F DMA controller, 020-021 interrupt controller, 040-043 timer, 320-32F hard disk, 378-37F parallel, 3D0-3DF graphics, 3F8-3FF serial (primary).",
     "الـ Device registers هي:<span class=\"ltr\">data-in, data-out, status, control</span>(من 1 لـ 4 bytes أو FIFO buffer). والعناوين يا بالـ <b>direct <bdi dir=\"ltr\">I/O</bdi> instructions</b> يا بالـ <b>memory-mapped <bdi dir=\"ltr\">I/O</bdi></b> (الـ registers متحطوطة في الـ address space بتاع الـ processor، زي الـ graphics). وبورتات الـ PC:<span class=\"ltr\">000-00F DMA, 020-021 interrupt controller, 040-043 timer</span><span class=\"ltr\">320-32F hard disk, 378-37F parallel, 3D0-3DF graphics, 3F8-3FF serial (primary)</span>"
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Polling and interrupts",
   "ar_h": "الـ Polling والـ interrupts",
   "pts": [
    [
     "<b>Polling handshake</b> per byte: (1) host reads the <b>busy bit</b> until 0; (2) host sets read or write, and for a write copies the byte into <b>data-out</b>; (3) host sets <b>command-ready</b>; (4) controller sets busy and executes; (5) controller clears busy, error and command-ready. Step 1 is a <b>busy-wait</b>: fine for a fast device, wasteful for a slow one.",
     "الـ <b>Polling handshake</b> لكل byte بيمشي كده: (1) الـ host بيقرا الـ <b>busy bit</b> لحد ما يبقى 0؛ (2) الـ host بيحدد read أو write، ولو write بينسخ الـ byte في الـ <b>data-out</b>؛ (3) الـ host بيعمل set للـ <b>command-ready</b>؛ (4) الـ controller بيعمل set للـ busy وينفّذ؛ (5) الـ controller بيمسح الـ busy والـ error والـ command-ready. والخطوة 1 دي <b>busy-wait</b>: ماشية لو الجهاز سريع، وتضييع لو بطيء."
    ],
    [
     "<b>Interrupts</b>: the controller notifies the CPU. The CPU senses the <b>Interrupt Request Line</b> after <b>every instruction</b>; on a signal it does a <b>state save</b> and jumps to the handler at a fixed address; the handler finds the cause, processes, does a <b>state restore</b> and returns from interrupt.",
     "الـ <b>Interrupts</b>: الـ controller بيبلّغ الـ CPU. والـ CPU بيحس الـ <b>Interrupt Request Line</b> بعد <b>كل instruction</b>؛ ولو فيه signal بيعمل <b>state save</b> ويروح للـ handler في عنوان ثابت؛ والـ handler بيعرف السبب ويعالج ويعمل <b>state restore</b> ويرجع من الـ interrupt."
    ],
    [
     "<b>Interrupt-driven I/O cycle</b>: driver initiates I/O → controller initiates I/O → input ready / output complete / error: controller interrupts → CPU, checking between instructions, transfers control to the handler → handler processes data, returns → CPU resumes the interrupted task.",
     "الـ <b>Interrupt-driven <bdi dir=\"ltr\">I/O</bdi> cycle</b>: الـ driver بيبدأ الـ <bdi dir=\"ltr\">I/O</bdi>، والـ controller بيبدأ العملية، ولما الـ input يجهز أو الـ output يخلص أو يحصل error الـ controller بيعمل interrupt، والـ CPU وهو بيشيّك بين الـ instructions بيودّي التحكم للـ handler، والـ handler بيعالج الداتا ويرجع، والـ CPU يكمّل الشغل اللي اتقطع."
    ],
    [
     "<b>Pentium event-vector table</b>: 0 divide error, 6 invalid opcode, 8 double fault, 13 general protection, <b>14 page fault</b>, 16 floating-point error, 19-31 reserved, <b>32-255 maskable interrupts</b>.",
     "الـ <b>Pentium event-vector table</b>:<span class=\"ltr\">0 divide error, 6 invalid opcode, 8 double fault</span><span class=\"ltr\">13 general protection, 14 page fault, 16 floating-point error</span><span class=\"ltr\">19-31 reserved, 32-255 maskable interrupts</span>"
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Direct Memory Access (DMA)",
   "ar_h": "الـ Direct Memory Access (DMA)",
   "pts": [
    [
     "DMA avoids <b>programmed I/O</b> (one byte at a time) for large transfers: a <b>DMA controller</b> moves data directly between device and memory, <b>bypassing the CPU</b>.",
     "الـ DMA بيمنع الـ <b>programmed <bdi dir=\"ltr\">I/O</bdi></b> (byte واحد في المرة) في النقل الكبير: الـ <b>DMA controller</b> بينقل الداتا على طول بين الجهاز والـ memory، و<b>من غير الـ CPU</b>."
    ],
    [
     "<b>DMA command block</b> written by the OS: source and destination addresses, read or write mode, count of bytes; the OS writes the block's location to the DMA controller; <b>bus mastering</b>: the controller grabs the bus (<b>cycle stealing</b>, still much more efficient); it <b>interrupts</b> when done.",
     "الـ <b>DMA command block</b> اللي الـ OS بيكتبه فيه: عناوين الـ source والـ destination، و mode الـ read أو الـ write، وعدد الـ bytes؛ والـ OS بيكتب مكان الـ block ده للـ DMA controller؛ وبعدين الـ <b>bus mastering</b>: الـ controller بياخد الـ bus (<b>cycle stealing</b>، وبرضه أكفأ بكتير)، وبيعمل <b>interrupt</b> لما يخلص."
    ],
    [
     "<b>Six steps</b>: (1) driver is told to transfer disk data to buffer X; (2) driver tells the disk controller to transfer C bytes to X; (3) disk controller initiates DMA; (4) disk controller sends each byte to the DMA controller; (5) DMA controller writes to X, <b>address +1, C −1</b> until C = 0; (6) at <b>C = 0</b>, DMA interrupts the CPU. E.g. C = 2,048: after 500 bytes, C = 1,548 and the next address is X + 500.",
     "<b>الـ 6 خطوات</b>: (1) الـ driver بيتطلب منه ينقل داتا من الـ disk لـ buffer عند X؛ (2) الـ driver بيقول للـ disk controller ينقل C bytes لـ X؛ (3) الـ disk controller بيبدأ الـ DMA؛ (4) الـ disk controller بيبعت كل byte للـ DMA controller؛ (5) الـ DMA controller بيكتب في X، و<b>العنوان يزيد 1 والـ C يقل 1</b> لحد ما <bdi dir=\"ltr\">C = 0</bdi>؛ (6) لما <b><bdi dir=\"ltr\">C = 0</bdi></b> الـ DMA بيعمل interrupt للـ CPU. مثال: لو <bdi dir=\"ltr\">C = 2,048</bdi>، بعد <bdi dir=\"ltr\">500 bytes</bdi> الـ C بيبقى <bdi dir=\"ltr\">1,548</bdi> والعنوان الجاي <bdi dir=\"ltr\">X + 500</bdi>."
    ],
    [
     "<b>Advantages</b>: the CPU is free for other work; <b>one interrupt per block</b> instead of per byte; high-speed devices transfer at close to memory speed; fewer interrupts and context switches.",
     "الـ <b>مميزات</b>: الـ CPU بيبقى فاضي لشغل تاني؛ و<b>interrupt واحد لكل block</b> بدل واحد لكل byte؛ والأجهزة السريعة بتنقل بسرعة قريبة من سرعة الـ memory؛ و interrupts و context switches أقل."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Application I/O interface and performance",
   "ar_h": "الـ Application I/O interface والـ performance",
   "pts": [
    [
     "The <b>device-driver layer hides differences among I/O controllers from the kernel</b>; a new device using an implemented protocol needs no extra work. Devices vary: character-stream or block, sequential or random-access, synchronous or asynchronous, sharable or dedicated, speed, read-write / read-only / write-only.",
     "الـ <b>device-driver layer بيخبّي الفروق بين الـ <bdi dir=\"ltr\">I/O</bdi> controllers عن الـ kernel</b>، والجهاز الجديد اللي بيستخدم protocol متنفذ مش محتاج شغل زيادة. والأجهزة بتختلف في: character-stream ولا block، و sequential ولا random-access، و synchronous ولا asynchronous، و sharable ولا dedicated، والسرعة، و read-write ولا read-only ولا write-only."
    ],
    [
     "<b>Block devices</b> (disk drives): read, write, seek; raw I/O, direct I/O or file-system access; memory-mapped file access (clusters brought in by demand paging); DMA. <b>Character devices</b> (keyboard, mouse, serial ports): <code>get()</code>, <code>put()</code>, with libraries for line editing.",
     "الـ <b>Block devices</b> (زي الـ disk drives): الأوامر read و write و seek، و raw <bdi dir=\"ltr\">I/O</bdi> أو direct <bdi dir=\"ltr\">I/O</bdi> أو file-system access، و memory-mapped file access (الـ clusters بتيجي بالـ demand paging)، و DMA. والـ <b>Character devices</b> (زي الـ keyboard والـ mouse والـ serial ports): الأوامر <code>get()</code> و <code>put()</code>، ومعاها libraries للـ line editing."
    ],
    [
     "I/O costs performance: the CPU runs driver code, <b>context switches due to interrupts</b>, and <b>data copying</b>. <b>Interrupt servicing overhead</b>: the running process's state is <b>saved in its PCB</b>, the ISR runs, then the state is <b>restored</b>.",
     "الـ <bdi dir=\"ltr\">I/O</bdi> بيأثر على الأداء: الـ CPU بينفّذ كود الـ driver، و <b>context switches بسبب الـ interrupts</b>، و <b>data copying</b>. والـ <b>overhead بتاع خدمة الـ interrupt</b>: حالة الـ process الشغالة <b>بتتحفظ في الـ PCB</b>، والـ ISR يشتغل، وبعدين الحالة <b>ترجع</b>."
    ],
    [
     "<b>Improve performance</b>: reduce context switches; reduce data copying; reduce interrupts (large transfers, smart controllers, polling); use DMA; smarter devices; balance CPU, memory, bus and I/O.",
     "<b>عشان نحسّن الأداء</b>: نقلل الـ context switches، ونقلل الـ data copying، ونقلل الـ interrupts (transfers كبيرة، و smart controllers، و polling)، ونستخدم DMA، وأجهزة أذكى، ونوازن بين الـ CPU والـ memory والـ bus والـ <bdi dir=\"ltr\">I/O</bdi>."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "<b>State the six-step process to perform a DMA transfer</b> (Finals 2025/26 Q3-b, 2023/24 Q2-d): learn the six steps in order, with C counting down to 0 and the final interrupt.",
     "<b>اذكر الـ 6 خطوات بتوع الـ DMA transfer</b> (Finals <bdi dir=\"ltr\">2025/26</bdi> <bdi dir=\"ltr\">Q3-b</bdi> و <bdi dir=\"ltr\">2023/24</bdi> <bdi dir=\"ltr\">Q2-d</bdi>): احفظ الـ 6 خطوات بالترتيب، والـ C وهو بيقل لحد 0، والـ interrupt في الآخر."
    ],
    [
     "<b>State the advantages of DMA</b> (Finals 2024/25, 2021/22): block transfer without the CPU, one interrupt per block, CPU free for other work, near-memory speed for fast devices, fewer interrupts and context switches despite cycle stealing.",
     "<b>اذكر مميزات الـ DMA</b> (Finals <bdi dir=\"ltr\">2024/25</bdi> و <bdi dir=\"ltr\">2021/22</bdi>): نقل blocks من غير الـ CPU، و interrupt واحد لكل block، والـ CPU فاضي لشغل تاني، وسرعة قريبة من الـ memory للأجهزة السريعة، و interrupts و context switches أقل رغم الـ cycle stealing."
    ],
    [
     "<b>What are the performance overheads of servicing an interrupt?</b> (Final 2022/23): saving the process state in its PCB, running the ISR, restoring the state (the context switches), plus data copying.",
     "<b>إيه الـ performance overheads بتوع خدمة الـ interrupt؟</b> (Final <bdi dir=\"ltr\">2022/23</bdi>): حفظ حالة الـ process في الـ PCB، وتشغيل الـ ISR، ورجوع الحالة (الـ context switches)، وكمان الـ data copying."
    ]
   ]
  }
 ]
};

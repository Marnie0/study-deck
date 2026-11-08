// Midterm scope and exam-focused summary for os: English and Egyptian Arabic per point. Merged by build.mjs.
window.MIDTERM = window.MIDTERM || {};
MIDTERM.os = {
 "lecs": [
  1,
  2,
  3,
  4
 ],
 "scope": "Lectures 1 to 4",
 "scope_ar": "من المحاضرة 1 لـ 4",
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
   "h": "What the doctor asks (Exam 2026)",
   "ar_h": "الدكتور بيسأل في إيه (امتحان 2026)",
   "pts": [
    [
     "Memory MCQs: the memory with more access speed that is also volatile → <b>SRAM</b>; the most common secondary storage device → <b>magnetic disk</b>. T/F: flash memory is slower than DRAM but needs no power to retain its contents → <b>True</b>; solid-state disks are generally faster than magnetic disks → <b>True</b>.",
     "أسئلة الـ memory الاختيارية: الـ memory الأسرع في الوصول للداتا واللي volatile هي الـ <b>SRAM</b>، وأشهر secondary storage هو الـ <b>magnetic disk</b>. وفي الصح والغلط: الـ flash memory أبطأ من الـ DRAM بس مش محتاجة كهربا عشان تحتفظ بالداتا، والإجابة <b>True</b>؛ والـ solid-state disks أسرع من الـ magnetic disks، والإجابة <b>True</b>."
    ],
    [
     "Definition traps (T/F): interrupts may be triggered by hardware or software → <b>True</b>; the kernel consists of all system and application programs → <b>False</b>; the bootstrap program is in RAM → <b>False</b> (ROM or EPROM).",
     "فخاخ التعريفات (صح وغلط): الـ interrupts ممكن تيجي من الـ hardware أو الـ software، والإجابة <b>True</b>؛ والـ kernel هو كل الـ system والـ application programs، والإجابة <b>False</b>؛ والـ bootstrap program موجود في الـ RAM، والإجابة <b>False</b> (هو في الـ ROM أو الـ EPROM)."
    ],
    [
     "OS activities (T/F): \"allocating and deallocating memory space as needed is <i>not</i> an OS activity\" → <b>False</b>: it is a memory-management activity.",
     "أنشطة الـ OS (صح وغلط): جملة \"الـ allocate والـ deallocate للـ memory <i>مش</i> من أنشطة الـ OS\"، والإجابة <b>False</b>، لأنها من أنشطة الـ memory management."
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
   "h": "What the doctor asks (Exam 2026)",
   "ar_h": "الدكتور بيسأل في إيه (امتحان 2026)",
   "pts": [
    [
     "Fill the blank: a process whose parent is terminated → <b>orphan</b>; terminated but the parent has not called wait() → <b>zombie</b>; saves the running process's state and restores the next → <b>context switch</b>.",
     "املا الفراغ: الـ process اللي الـ parent بتاعها خلص اسمها <b>orphan</b>، واللي خلصت والـ parent لسه ما عملش <code>wait()</code> اسمها <b>zombie</b>، واللي بيحفظ حالة الـ process الشغالة ويرجّع حالة الجاية اسمه <b>context switch</b>."
    ],
    [
     "Fill the blank: the address of the next instruction is held in the <b>program counter</b>; the scheduler that selects processes brought into the ready queue is the <b>long-term</b> scheduler; the application on the mobile display is the <b>foreground</b> application.",
     "املا الفراغ: عنوان الـ instruction الجاية في الـ <b>program counter</b>، والـ scheduler اللي بيختار مين يدخل الـ ready queue هو الـ <b>long-term</b>، والـ application اللي على شاشة الموبايل هي الـ <b>foreground</b>."
    ],
    [
     "T/F: \"the process is a passive entity\" → <b>False</b>; \"the parent process terminates first\" → <b>False</b>; \"a single-processor system never has more than one process in the Running state\" → <b>True</b>.",
     "صح وغلط: \"الـ process هي passive entity\" والإجابة <b>False</b>؛ و\"الـ parent دايمًا بيخلص الأول\" والإجابة <b>False</b>؛ و\"في سيستم بـ processor واحد عمر ما يبقى فيه أكتر من process واحدة running\" والإجابة <b>True</b>."
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
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل في إيه",
   "pts": [
    [
     "MCQ: \"Which algorithm gives minimum average waiting time?\" → <b>SJF</b>. Fill the blank: \"A solution to indefinite blockage of low-priority processes is ……\" → <b>Aging</b>.",
     "سؤال MCQ: أنهي algorithm بيدّي أقل متوسط waiting time؟ الإجابة <b>SJF</b>. وأكمل: الحل لمشكلة الـ indefinite blockage للـ low-priority processes هو؟ الإجابة <b>Aging</b>."
    ],
    [
     "True or False: \"Busy waiting is good as it never allows the CPU to be idle.\" → <b>False</b>.",
     "سؤال صح أو غلط: الـ busy waiting كويس لأنه عمره ما بيخلي الـ CPU فاضي؟ الإجابة <b>False</b>."
    ],
    [
     "The big problem (Topic 3 Q4, Midterm 2021/22): P1 10/3, P2 3/1, P3 2/2, P4 1/4 at time 0 → Gantt charts and average WT for <b>FCFS 9.5</b>, <b>SJF 2.5</b>, <b>RR q = 1 → 5</b>, <b>priority 5.75</b>; minimum = <b>SJF</b>.",
     "المسألة الكبيرة (Topic 3 Q4، والـ Midterm <bdi dir=\"ltr\">2021/22</bdi>): الـ processes دي كلها عند 0:<span class=\"ltr\">P1 10/3, P2 3/1, P3 2/2, P4 1/4</span>والمطلوب الـ Gantt charts ومتوسط الـ WT:<span class=\"ltr\">FCFS 9.5, SJF 2.5, RR (q = 1) 5, Priority 5.75</span>والأقل هو <b>SJF</b>."
    ],
    [
     "Essay questions: describe the scheduling decisions (4 cases), preemptive vs non-preemptive, the scheduling criteria, which algorithms starve (<b>SJF and priority</b>, solution aging), why the RR quantum matters.",
     "أسئلة مقالي: اشرح قرارات الـ scheduling (الحالات الأربعة)، والفرق بين الـ preemptive والـ non-preemptive، والـ scheduling criteria، وأنهي algorithms بتعمل starvation (الـ <b>SJF والـ priority</b>، والحل aging)، وليه الـ quantum بتاع الـ RR مهم."
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
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل في إيه",
   "pts": [
    [
     "<b>The big problem</b> (Finals 2025/26 Q2-a and 2023/24 Q1-b use the slide numbers exactly; 2022/23 and 2021/22 use other numbers): first-fit, best-fit, worst-fit on partitions, then \"which is most efficient?\" Update the hole sizes after each placement. Best-fit won every time, placing all four.",
     "<b>المسألة الكبيرة</b>، بتيجي بأرقام السلايد بالظبط في Final <bdi dir=\"ltr\">2025/26</bdi> (<bdi dir=\"ltr\">Q2-a</bdi>) و <bdi dir=\"ltr\">2023/24</bdi> (<bdi dir=\"ltr\">Q1-b</bdi>)، وبأرقام تانية في <bdi dir=\"ltr\">2022/23</bdi> و <bdi dir=\"ltr\">2021/22</bdi>: الـ first-fit والـ best-fit والـ worst-fit على partitions، وبعدين \"أنهي الأكفأ؟\". حدّث حجم الـ holes بعد كل placement. والـ Best-fit كسب في كل مرة وحط الأربعة."
    ],
    [
     "Exam 2026 MCQ: first-fit, 112 KB goes to <b>the 288 KB hole left in the 500 KB partition</b>; the most efficient for that example is <b>best-fit</b>.",
     "سؤال MCQ في Exam 2026: في الـ first-fit، الـ <bdi dir=\"ltr\">112 KB</bdi> بتروح لـ <b>الـ hole اللي <bdi dir=\"ltr\">288 KB</bdi> الفاضل في الـ partition اللي <bdi dir=\"ltr\">500 KB</bdi></b>. والأكفأ في المثال ده هو الـ <b>best-fit</b>."
    ],
    [
     "Essay questions in past finals: <b>external vs internal fragmentation</b> (2024/25; a numeric example earns full marks, e.g. 962 bytes) and <b>paging vs segmentation</b> (2022/23, 2021/22).",
     "أسئلة مقالي في الـ Finals: الفرق بين الـ <b>external والـ internal fragmentation</b> (<bdi dir=\"ltr\">2024/25</bdi>، والمثال بالأرقام بياخد الدرجة كاملة، زي الـ <bdi dir=\"ltr\">962 bytes</bdi>)، والفرق بين الـ <b>paging والـ segmentation</b> (<bdi dir=\"ltr\">2022/23</bdi> و <bdi dir=\"ltr\">2021/22</bdi>)."
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
  }
 ]
};

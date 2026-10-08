window.AR = window.AR || {};
AR.os = { lectures: {}, exams: [] };

AR.os.lectures["1"] = {
  notes: [
    { h: `يعني إيه operating system؟ أهدافه والـ 4 components`, pts: [
      `الـ <b>OS</b> = برنامج بيقف <b>وسيط بين الـ user</b> بتاع الكمبيوتر <b>وبين الـ hardware</b>.`,
      `<b>أهداف الـ OS (3)</b>: (1) إنه <b>يشغّل برامج الـ user</b> ويسهّل حل مشاكل الـ user؛ (2) يخلّي الـ computer system <b>مريح (convenient)</b> في الاستخدام؛ (3) يستخدم الـ hardware بطريقة <b>efficient</b>.`,
      `الرسمة المتقسمة طبقات "Four Components of a Computer System": الـ users من 1 لـ n فوق، وبعدهم الـ system والـ application programs (compiler, assembler, text editor, database system)، وبعدهم الـ operating system، وتحت خالص الـ computer hardware.`
    ] },
    { h: `الـ OS بيعمل إيه، تعريفه، وإزاي الكمبيوتر بيبدأ (startup)`, pts: [
      `ده <b>بيعتمد على وجهة النظر</b>: الـ users عايزين راحة و<b>سهولة استخدام</b> و<b>performance كويس</b> ومش فارق معاهم الـ resource utilization؛ الكمبيوتر المشترك (<b>mainframe</b>، <b>minicomputer</b>) لازم يرضّي كل الـ users؛ الـ <b>workstations</b> ليها resources خاصة بيها بس غالبًا بتستخدم resources مشتركة من الـ <b>servers</b>؛ الأجهزة الـ <b>handheld</b> فقيرة في الـ resources ومتظبطة للـ usability وعمر البطارية؛ وفيه كمبيوترات (الـ <b>embedded</b> computers اللي في الأجهزة والعربيات) ملهاش user interface تقريبًا أو خالص.`,
      `<b>الـ OS هو resource allocator</b>: بيدير كل الـ resources وبيحكم بين الطلبات اللي بتتعارض عشان الاستخدام يبقى efficient وعادل.`,
      `<b>الـ OS هو control program</b>: بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط للكمبيوتر.`,
      `مفيش تعريف واحد متفق عليه. "كل حاجة الـ vendor بيبعتهالك لما تطلب OS" تقريب كويس (بس بيختلف جدًا).`,
      `الـ <b>Kernel</b> = "البرنامج الوحيد اللي شغال طول الوقت على الكمبيوتر". أي حاجة تانية يا إما <b>system program</b> (جاي مع الـ OS) يا إما <b>application program</b>.`,
      `الـ <b>Bootstrap program</b>: بيتحمّل أول ما الجهاز يشتغل أو يعمل reboot؛ غالبًا متخزن في <b>ROM أو EPROM</b> (اسمها <b>firmware</b>)؛ بيعمل initialize لكل حاجة في السيستم؛ و<b>بيحمّل الـ OS kernel ويبدأ تشغيله</b>.`
    ] },
    { h: `تنظيم الـ computer system والـ interrupts`, pts: [
      `CPU أو أكتر والـ device controllers متوصلين ببعض عن طريق <b>common bus</b> بيدّيهم access لـ <b>shared memory</b>؛ الـ CPUs والأجهزة بيشتغلوا في نفس الوقت وبيتنافسوا على الـ memory cycles. (الرسمة: CPU، disk controller، USB controller [mouse, keyboard, printer]، graphics adapter [monitor]، كلهم على bus واصل للـ memory.)`,
      `الـ I/O devices والـ CPU بيشتغلوا <b>concurrently</b>. كل <b>device controller</b> مسؤول عن نوع معين من الأجهزة وعنده <b>local buffer</b>. الـ CPU بينقل الداتا بين الـ main memory والـ local buffers؛ والـ I/O بيبقى من الجهاز للـ local buffer بتاع الـ controller.`,
      `الـ device controller بيبلّغ الـ CPU إنه خلّص شغله عن طريق إنه يعمل <b>interrupt</b>.`,
      `الـ interrupt بينقل التحكم للـ <b>interrupt service routine</b>، غالبًا عن طريق الـ <b>interrupt vector</b> (فيه عناوين كل الـ service routines). والـ interrupt architecture لازم <b>تحفظ عنوان الـ instruction اللي اتقاطعت</b>.`,
      `الـ <b>trap</b> (أو <b>exception</b>) هو <b>interrupt جاي من الـ software</b> سببه يا إما <b>error</b> يا إما <b>طلب من الـ user</b>. الـ OS هو <b>interrupt driven</b>.`,
      `<b>التعامل مع الـ interrupt</b>: الـ OS بيحفظ حالة الـ CPU بإنه يخزن الـ registers والـ program counter؛ بيعرف نوع الـ interrupt اللي حصل عن طريق الـ <b>polling</b> أو الـ <b>vectored interrupt system</b>؛ وفيه أجزاء code منفصلة بتقرر هيتعمل إيه لكل نوع interrupt.`
    ] },
    { h: `الـ I/O structure، الـ storage، والـ DMA`, pts: [
      `<b>Synchronous I/O</b>: بعد ما الـ I/O يبدأ، التحكم بيرجع لبرنامج الـ user <b>بس لما الـ I/O يخلص</b> (wait instruction بتخلي الـ CPU idle لحد الـ interrupt الجاي، أو wait loop)؛ بالكتير I/O request واحد مستني، مفيش I/O في نفس الوقت.`,
      `<b>Asynchronous I/O</b>: التحكم بيرجع <b>من غير ما يستنى</b> الـ I/O يخلص. فيه <b>system call</b> بتخلي الـ user يستنى لحد ما يخلص؛ الـ <b>device-status table</b> فيها entry لكل device (النوع، العنوان، الحالة)؛ والـ OS بيدوّر فيها عشان يعرف حالة الجهاز ويعدّل الـ entry.`,
      `<b>الوحدات</b>: bit (0/1)؛ byte = 8 bits (أصغر حتة مريحة)؛ word = الوحدة الأساسية للـ architecture (registers 64-bit ← words 8 bytes). KB = 1,024 B؛ MB = 1,024² B؛ GB = 1,024³؛ TB = 1,024⁴؛ PB = 1,024⁵. المصنّعين بيقرّبوا (1 MB ≈ مليون B)؛ والـ networking بيتقاس بالـ bits.`,
      `الـ <b>Main memory</b>: الـ storage الكبير الوحيد اللي الـ CPU يقدر يوصله مباشرة؛ random access؛ وغالبًا <b>volatile</b>. الـ <b>Secondary storage</b>: امتداد للـ main memory بمساحة كبيرة و<b>nonvolatile</b>.`,
      `الـ <b>Hard disks</b>: أطباق (platters) معدن/زجاج جامدة عليها مادة تسجيل مغناطيسي؛ السطح متقسم لـ <b>tracks</b>، وكل track متقسم لـ <b>sectors</b>؛ الـ <b>disk controller</b> بيحدد التعامل المنطقي بين الجهاز والكمبيوتر. الـ <b>Solid-state disks</b>: أسرع من الـ hard disks، nonvolatile، وبقت منتشرة أكتر.`,
      `الـ <b>Storage hierarchy</b> (سريع/صغير/غالي ← بطيء/كبير/رخيص): registers ← cache ← main memory ← solid-state disk ← hard disk ← optical disk ← magnetic tapes. مترتبة حسب <b>السرعة، التكلفة، والـ volatility</b>.`,
      `الـ <b>Caching</b>: نسخ داتا مؤقتًا من storage أبطأ لـ storage أسرع؛ بتشوف الـ cache الأول، لو لقيتها تستخدمها (سريع)، لو ملقيتهاش تنسخها للـ cache وتستخدمها من هناك. الـ cache أصغر من الـ storage اللي بيعمله cache، فحجم الـ cache والـ <b>replacement policy</b> مهمين. والـ main memory نفسها ممكن تعتبرها cache للـ secondary storage.`,
      `<b>Device driver</b> لكل device controller: بيدّي interface موحد بين الـ controller والـ kernel.`,
      `الـ <b>DMA (Direct Memory Access)</b>: بيستخدم مع <b>الـ I/O devices السريعة</b> اللي بتنقل بسرعة قريبة من سرعة الـ memory. الـ device controller بينقل <b>blocks</b> من الداتا من الـ buffer <b>مباشرة للـ main memory من غير تدخل الـ CPU</b>. <b>interrupt واحد بس لكل block</b>، بدل interrupt لكل byte.`
    ] },
    { h: `الـ performance بتاع مستويات الـ storage (slide 33)`, pts: [
      `النقل بين المستويات ممكن يكون explicit أو implicit. الداتا "A" بتنتقل disk ← main memory ← cache ← hardware register.`,
      `في الـ Multitasking: لازم دايمًا تستخدم <b>أحدث قيمة</b> أيًا كان مكانها. في الـ Multiprocessors: الـ hardware لازم يوفر <b>cache coherency</b> عشان كل الـ CPUs تشوف أحدث قيمة. في الـ Distributed systems: ممكن يبقى فيه كذا نسخة من نفس الداتا (أعقد كمان).`
    ] },
    { h: `الـ computer-system architecture وهيكل الـ OS`, pts: [
      `أغلب الأنظمة بتستخدم general-purpose processor واحد (ومعاه special-purpose processors).`,
      `أنظمة الـ <b>Multiprocessor</b> (اسمها كمان <b>parallel</b> أو <b>tightly-coupled</b>). مميزاتها: (1) <b>increased throughput</b>، (2) <b>economy of scale</b>، (3) <b>increased reliability</b>.`,
      `<b>Asymmetric multiprocessing</b>: كل processor متخصصله <b>task معينة</b>. <b>Symmetric multiprocessing (SMP)</b>: كل processor بيعمل <b>كل الـ tasks</b>.`,
      `<b>Dual-core design</b>: multi-chip و<b>multicore</b>؛ كل core ليه الـ registers والـ cache بتوعه، وبيشاركوا الـ memory. وفيه أنظمة عبارة عن chassis جواه كذا system منفصل.`,
      `شكل الـ memory في multiprogrammed system: الـ OS عند address 0، وبعده job 1 … job 4 لحد 512M.`
    ] },
    { h: `عمليات الـ OS: الـ dual mode والـ timer`, pts: [
      `الـ OS <b>interrupt driven</b>: hardware interrupts من الأجهزة؛ و software interrupts (<b>exception أو trap</b>): software error (القسمة على صفر)، أو طلب خدمة من الـ OS؛ ومشاكل تانية زي الـ infinite loops والـ processes اللي بتعدّل في بعض.`,
      `الـ <b>Dual-mode operation</b> بتخلي الـ OS يحمي نفسه وباقي الـ components: <b>user mode</b> و<b>kernel mode</b>، والفرق بينهم بـ <b>mode bit</b> جاي من الـ hardware (<b>kernel = 0، user = 1</b>).`,
      `فيه instructions <b>privileged</b>، ماينفعش تتنفذ غير في الـ kernel mode. الـ <b>system call</b> بتغير الـ mode لـ kernel (trap، mode bit = 0)؛ والرجوع من الـ call بيرجّعه user (mode bit = 1).`,
      `الـ CPUs بقت بتدعم multi-mode operation أكتر، زي mode للـ <b>virtual machine manager (VMM)</b> عشان الـ guest VMs.`,
      `الـ <b>Timer</b> بيمنع الـ infinite loop أو إن process تستحوذ على الـ resources: بيتظبط إنه يعمل interrupt بعد فترة؛ counter بيقل مع الـ physical clock؛ الـ OS هو اللي بيظبطه (<b>privileged instruction</b>)؛ بيعمل interrupt لما يوصل صفر؛ بيتظبط قبل ما الـ process تتعملها schedule عشان الـ OS يرجع ياخد التحكم أو يقفل برنامج عدّى الوقت المسموحله.`
    ] },
    { h: `إدارة الـ process والـ memory والـ storage والـ I/O؛ الـ protection والـ security`, pts: [
      `الـ <b>Process</b> = برنامج شغال (program in execution)، وحدة شغل. <b>الـ program حاجة passive، والـ process حاجة active</b>. محتاجة resources (CPU، memory، I/O، files، initialization data)؛ ولما تخلص لازم الـ resources اللي ينفع تتستخدم تاني ترجع. الـ single-threaded process: <b>program counter واحد</b>؛ الـ multi-threaded: <b>program counter لكل thread</b>. الـ concurrency بتحصل بتقسيم الـ CPUs بين الـ processes/threads.`,
      `<b>أنشطة الـ process management</b>: إنشاء ومسح الـ user والـ system processes؛ عمل suspend وresume للـ processes؛ وتوفير mechanisms للـ <b>synchronization</b> والـ <b>communication</b> والتعامل مع الـ <b>deadlock</b>.`,
      `<b>أنشطة الـ memory management</b>: متابعة أنهي أجزاء من الـ memory مستخدمة ومين بيستخدمها؛ تقرير أنهي processes وداتا تدخل الـ memory أو تخرج منها؛ و<b>allocating وdeallocating لمساحة الـ memory</b> حسب الحاجة.`,
      `الـ <b>Storage management</b>: الـ OS بيدّي view منطقي موحد (الـ <b>file</b>). أنشطة الـ file-system: إنشاء/مسح files وdirectories، primitives للتعامل معاهم، عمل mapping للـ files على الـ secondary storage، وعمل backup على media ثابتة (non-volatile).`,
      `أنشطة الـ <b>Mass-storage management</b>: <b>free-space management، storage allocation، disk scheduling</b>. الـ Tertiary storage (optical، tape) بيختلف ما بين <b>WORM</b> (write-once, read-many) و<b>RW</b>.`,
      `الـ <b>I/O subsystem</b> بيخبي تفاصيل الـ hardware عن الـ user؛ ومسؤول عن memory management بتاع الـ I/O: <b>buffering</b> (تخزين الداتا مؤقتًا وهي بتتنقل)، <b>caching</b> (تخزين أجزاء من الداتا في storage أسرع)، <b>spooling</b> (إن output بتاع job يتداخل مع input بتاع jobs تانية)؛ وinterface عام للـ device drivers؛ وdrivers لأجهزة معينة.`,
      `الـ <b>Protection</b>: أي mechanism بي<b>تحكم في access</b> الـ processes أو الـ users للـ resources اللي الـ OS معرّفها. الـ <b>Security</b>: <b>دفاع</b> السيستم ضد <b>الهجمات</b> الداخلية والخارجية (denial-of-service، viruses، identity theft، theft of service).`,
      `الـ User IDs (واحد لكل user) مربوطة بكل الـ files والـ processes بتاعة الـ user ده؛ الـ <b>group ID</b> بيعرّف مجموعة users؛ والـ <b>privilege escalation</b> بتخلي الـ user يتحول لـ effective ID بصلاحيات أكتر.`
    ] }
  ],
  cards: [
    `برنامج بيقف وسيط بين الـ user بتاع الكمبيوتر والـ hardware.`,
    `يشغّل برامج الـ user ويسهّل حل المشاكل؛ يخلي السيستم مريح في الاستخدام؛ يستخدم الـ hardware بكفاءة (efficiently).`,
    `Hardware، operating system، application programs، users.`,
    `بيدير كل الـ resources؛ وبيحكم بين الطلبات المتعارضة عشان الاستخدام يبقى efficient وعادل.`,
    `بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط للكمبيوتر.`,
    `البرنامج الوحيد اللي شغال طول الوقت على الكمبيوتر.`,
    `بيتحمّل عند تشغيل الجهاز/الـ reboot من الـ ROM أو EPROM (firmware)؛ بيعمل initialize للسيستم، ويحمّل الـ kernel ويشغّله.`,
    `interrupt جاي من الـ software سببه error أو طلب من الـ user.`,
    `table فيها عناوين كل الـ interrupt service routines.`,
    `الـ Polling، أو الـ vectored interrupt system.`,
    `الـ controller بينقل blocks مباشرة بين الـ buffer والـ main memory من غير الـ CPU؛ interrupt واحد لكل block، مش لكل byte.`,
    `Registers، cache، main memory، SSD، hard disk، optical disk، magnetic tape.`,
    `Increased throughput، economy of scale، increased reliability.`,
    `Asymmetric: كل processor ليه task معينة. Symmetric: كل processor بيعمل كل الـ tasks.`,
    `Kernel mode = 0، user mode = 1.`,
    `عشان يمنع الـ infinite loops أو إن process تستحوذ على الـ resources؛ الـ OS بيرجع ياخد التحكم لما الـ counter يوصل صفر.`,
    `الـ Protection بتتحكم في الـ access للـ resources؛ الـ security بتدافع ضد الهجمات الداخلية والخارجية.`,
    `Buffering: تخزين مؤقت أثناء النقل. Caching: نسخة أسرع عشان الـ performance. Spooling: الـ output بتاع job يتداخل مع الـ input بتاع jobs تانية.`
  ],
  qa: [
    `1) يشغّل برامج الـ user ويسهّل حل مشاكل الـ user. 2) يخلي الـ computer system مريح في الاستخدام. 3) يستخدم الـ hardware بطريقة efficient.`,
    `مفيش تعريف واحد متفق عليه. الـ OS برنامج بيقف وسيط بين الـ user والـ hardware. هو resource allocator (بيدير كل الـ resources وبيحكم بين الطلبات المتعارضة عشان الاستخدام يبقى efficient وعادل) وكمان control program (بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط). "كل حاجة الـ vendor بيبعتها" ده تقريب؛ والبرنامج الوحيد اللي شغال طول الوقت هو الـ kernel، وأي حاجة تانية يا system program يا application program.`,
    `الـ interrupt غالبًا بيطلع من الـ hardware (زي device controller خلّص I/O) وبيبقى asynchronous؛ بينقل التحكم للـ interrupt service routine عن طريق الـ interrupt vector. الـ trap (exception) هو interrupt جاي من الـ software سببه يا error (زي القسمة على صفر أو invalid memory access) يا برنامج user بيطلب خدمة من الـ OS (system call).`,
    `عشان الـ I/O devices السريعة اللي بتنقل بسرعة قريبة من سرعة الـ memory. الـ device controller بينقل blocks كاملة من الداتا من الـ buffer بتاعه مباشرة للـ main memory من غير تدخل الـ CPU، وبيعمل interrupt واحد بس لكل block بدل واحد لكل byte، فالـ CPU بيفضى لشغل تاني.`,
    `الـ Multiprogramming (batch) بيحط كذا job في الـ memory عشان الـ CPU دايمًا يلاقي حاجة يشغلها؛ لما job تستنى (زي I/O) الـ OS بيحوّل لـ job تانية. هدفه كفاءة الـ CPU؛ ومفيش تفاعل مع الـ user. الـ Timesharing (multitasking) بيبدّل الـ CPU بين الـ jobs بسرعة جدًا لدرجة إن الـ users يقدروا يتفاعلوا مع كل برنامج شغال؛ الـ response time لازم يبقى أقل من ثانية، ومحتاج CPU scheduling وswapping وvirtual memory.`,
    `فيه hardware mode bit بيفرّق بينهم (kernel 0، user 1). في الـ kernel mode الـ OS يقدر ينفذ privileged instructions ويوصل لكل الـ resources. في الـ user mode البرامج ماتقدرش تنفذ privileged instructions. الـ system call بتعمل trap للـ kernel mode والرجوع بيرجّعه user mode. ده بيحمي الـ OS وباقي الـ components من برامج الـ user.`
  ],
  quiz: [
    [`صح. الـ Static RAM هي أسرع RAM (بتستخدم في الـ caches، "CMOS SRAM" في جدول الـ storage) وهي volatile.`, `Volatile، بس أبطأ من الـ SRAM عشان لازم تتعملها refresh. بتستخدم للـ main memory.`, `ذاكرة read-only و non-volatile (زي المكان اللي الـ bootstrap متخزن فيه).`, `Non-volatile وبطيئة في الكتابة.`],
    [`الـ RAM هي الـ main (primary) memory، مش secondary storage.`, `الـ SSDs أسرع وبقت منتشرة، بس الإجابة الكلاسيك هي الـ magnetic disk.`, `الـ Tapes ده tertiary/backup storage.`, `صح. الـ hard (magnetic) disk هو أشهر secondary storage.`],
    [`صح. الـ access في الـ Flash (SSD) بياخد 25,000–50,000 ns مقابل 80–250 ns للـ main memory، والـ flash بتبقى nonvolatile.`, `هي صح: الـ flash بتبقى nonvolatile وأبطأ من الـ DRAM.`],
    [`صح. الـ hardware interrupts جاية من الأجهزة؛ والـ software interrupts هي traps/exceptions (errors أو system calls).`, `الـ slides بتقول إن الـ OS interrupt driven من الـ hardware والـ software الاتنين.`],
    [`لأ. الـ kernel هو البرنامج الوحيد اللي شغال طول الوقت. الـ system والـ application programs هم كل الباقي.`, `صح. أي حاجة غير الـ kernel يا system program يا application program.`],
    [`الـ RAM بتبقى volatile، فالـ bootstrap كان هيضيع لما الجهاز يطفي.`, `صح. الـ bootstrap متخزن في ROM أو EPROM (firmware).`],
    [`ده مكتوب صريح كـ activity من أنشطة الـ memory management.`, `صح. أنشطة الـ memory management: متابعة الـ memory المستخدمة، تقرير إيه يدخل/يخرج، وallocating/deallocating للمساحة.`],
    [`صح. الـ SSDs أسرع من الـ hard disks وnonvolatile.`, `الـ slide بتقول: "Solid-state disks – faster than hard disks".`],
    [`ده وصف الـ hardware interrupt.`, `صح.`, `ده الـ interrupt vector.`, `مالوش علاقة.`],
    [`الـ main memory بتبقى volatile وفاضية لما الجهاز يشتغل.`, `صح.`, `الـ cache بتبقى volatile.`, `الـ kernel على الـ disk، بس الـ bootstrap اللي بيحمّله موجود في الـ firmware.`],
    [`ده الـ programmed I/O من غير DMA.`, `لأ.`, `صح. الـ controller بينقل الـ block كله، وبعدين يعمل interrupt مرة واحدة.`, `الـ controller لسه بيعمل interrupt مرة عشان يقول إنه خلّص.`],
    [`مذكورة.`, `مذكورة.`, `مذكورة.`, `الاختيار الصح. المميزات التلاتة المذكورة هي الـ throughput والـ economy of scale والـ reliability.`],
    [`صح. Kernel = 0، user = 1 (الـ system call بتخليه 0، والرجوع بيخليه 1).`, `الـ 1 ده الـ user mode.`, `فيه قيمتين بس في الـ dual mode.`, `لأ.`],
    [`ده الـ asymmetric multiprocessing.`, `صح.`, `ده نوع من الـ asymmetric (master/slave) multiprocessing.`, `الـ Multiprocessors بتبقى tightly coupled وبتشارك الـ memory.`]
  ],
  extra: [
    [`بالعكس: في المحاضرة الـ kernel mode = 0 والـ user mode = 1، والبرنامج بيبدأ في الـ user mode.`, `صح. user mode (1)، الـ system call بتعمل trap للـ kernel mode (0)، والرجوع من الـ call بيرجّع الـ bit للـ user mode (1).`, `غلط: الـ system call لازم تحوّل للـ kernel mode، وإلا الـ privileged instructions ماكانتش هتتنفذ عشان الخدمة.`, `غلط: برامج الـ user مابتشتغلش بالـ kernel-mode bit؛ ده كان هيبوّظ فكرة الـ dual-mode protection.`],
    [`غلط: لو كود الـ user يقدر يظبط الـ timer، الـ process كانت هتقدر تمسك الـ CPU للأبد، وده بالظبط اللي الـ timer بيمنعه.`, `صح. الـ OS بيظبط الـ timer قبل ما يعمل schedule للـ process، وتحميله privileged instruction؛ ولما الـ counter يوصل صفر بيحصل interrupt يرجّع التحكم للـ OS.`],
    [`الـ interrupt vector فيه عناوين الـ interrupt service routines، مش حالة كل device.`, `الـ page table بتعمل mapping للـ pages على الـ frames؛ مالهاش علاقة بحالة الأجهزة.`, `صح. فيها entry لكل device (النوع، العنوان، الحالة)، والـ OS بيدوّر فيها عشان يلاقي حالة الجهاز ويعدّلها.`, `الـ local buffer فيه الداتا اللي بتتنقل، مش المعلومات عن حالة كل device.`],
    [`الـ Registers أسرع من الـ cache، والـ solid-state disks فوق (أسرع من) الـ hard disks.`, `الـ Cache لازم ييجي قبل الـ main memory: هو بين الـ registers والـ main memory.`, `الـ Solid-state disks أسرع من الـ hard disks، فالـ SSD ييجي قبل الـ hard disk.`, `صح. ده الـ hierarchy بتاع المحاضرة، مترتب حسب السرعة والتكلفة والـ volatility.`],
    [`صح. ده تعريف الـ spooling في المحاضرة.`, `ده الـ buffering، مهمة تانية من مهام الـ I/O-subsystem.`, `ده الـ caching.`, `ده الـ DMA، مش الـ spooling.`],
    [`غلط: الـ protection هي الـ mechanism اللي بيتحكم في access الـ processes أو الـ users للـ resources اللي الـ OS معرّفها؛ الدفاع ضد الهجمات ده security.`, `صح. الـ Security هي الدفاع ضد الهجمات الداخلية والخارجية (denial-of-service، viruses، identity theft، theft of service)؛ والـ protection هي access control.`],
    [`ده تقريب المصنّعين (1 MB ≈ مليون B)، مش اصطلاح الـ OS اللي هو 1,024² bytes.`, `ده خلط بين الاصطلاحين (1.5 × 1,024 × 1,000)؛ الـ MB هو 1,024 × 1,024 bytes.`, `صح. 1.5 × 1,024 × 1,024 = 1.5 × 1,048,576 = 1,572,864 bytes.`, `ده عدد الـ bits (× 8). السؤال عايز bytes.`],
    [`صح. الـ DMA بيعمل interrupt واحد لكل block (16 block)؛ وinterrupt لكل byte هيبقى 16 × 1,024 = 16,384.`, `الـ DMA بيعمل interrupt مرة لكل block، مش مرة للنقل كله، و"without" معناها لكل byte، مش لكل block.`, `بالعكس: الـ DMA هو اللي بيقلل الـ interrupts لواحد لكل block.`, `الـ DMA لسه بيعمل interrupt للـ CPU مرة بعد كل block.`],
    [`دي الفكرة الأساسية للـ multiprogramming (batch systems)، والـ timesharing بيبني عليها.`, `صح. الـ Timesharing بيبدّل الـ jobs كتير جدًا لدرجة إن الـ users يقدروا يتفاعلوا معاها؛ المحاضرة بتدّي هدف response time &lt; 1 second.`, `ده وصف الـ multiprogramming اللي بيبدّل بس لما الـ job تستنى.`, `ده الـ asymmetric multiprocessing، hardware architecture، مش timesharing.`],
    [`الـ Cache بيديره الـ hardware.`, `الـ main memory بيديرها الـ operating system.`, `الـ Solid-state disks بيديرها الـ operating system.`, `صح. الـ compiler هو اللي بيقرر أنهي قيم تتحط في الـ registers (الحجم &lt; 1 KB، الـ access من 0.25–0.5 ns).`]
  ]
};

AR.os.lectures["2"] = {
  notes: [
    { h: `مفهوم الـ Process`, pts: [
      `الـ OS بيشغّل برامج كتير مختلفة: الـ batch systems بتشغّل <b>jobs</b>؛ والـ time-shared systems بتشغّل <b>user programs أو tasks</b>. الكتاب بيستخدم job وprocess تقريبًا بنفس المعنى.`,
      `الـ <b>Process</b> = برنامج شغال (program in execution)؛ والتنفيذ لازم يمشي بشكل <b>sequential</b>.`,
      `أجزاء الـ process في الـ memory (من الـ max address لحد 0): الـ <b>stack</b> (داتا مؤقتة: function parameters، return addresses، local variables) بيكبر لتحت؛ الـ <b>heap</b> (memory بتتعملها allocation وقت التشغيل: new، delete، malloc، free) بيكبر لفوق؛ الـ <b>data section</b> (الـ global والـ static variables، اللي متعرّفة برة الـ main)؛ الـ <b>text section</b> (كود البرنامج). وكمان النشاط الحالي: الـ <b>program counter</b> والـ processor registers.`,
      `البرنامج الواحد ممكن يبقى كذا process (زي كذا user بيشغّلوا نفس البرنامج).`
    ] },
    { h: `الـ Process states والـ PCB`, pts: [
      `<b>new</b>: بتتعمل. <b>running</b>: الـ instructions بتتنفذ. <b>waiting</b>: مستنية event (إن I/O يخلص، signal). <b>ready</b>: مستنية تاخد processor. <b>terminated</b>: خلصت تنفيذ.`,
      `الانتقالات (state diagram): new →<i>admitted</i>→ ready →<i>scheduler dispatch</i>→ running؛ running →<i>interrupt</i>→ ready؛ running →<i>I/O or event wait</i>→ waiting →<i>I/O or event completion</i>→ ready؛ running →<i>exit</i>→ terminated.`,
      `على processor واحد <b>process واحدة بس تبقى running</b> في أي لحظة؛ وممكن كتير يبقوا ready أو waiting.`,
      `الـ <b>PCB (Process Control Block، أو task control block)</b> فيه: الـ process state؛ رقم الـ process؛ الـ <b>program counter</b>؛ الـ <b>CPU registers</b>؛ معلومات الـ CPU-scheduling (priorities، queue pointers)؛ معلومات الـ memory-management (الـ memory المتخصصة)؛ معلومات الـ accounting (الـ CPU المستخدم، الوقت اللي عدّى، الـ time limits)؛ معلومات الـ I/O status (الأجهزة المتخصصة، لستة الـ open files).`,
      `الـ <b>Threads</b>: الـ process ممكن يبقى ليها كذا program counter، فكذا thread of control يشتغلوا في نفس الوقت؛ وساعتها الـ PCB لازم يخزن تفاصيل كل thread.`
    ] },
    { h: `الـ Process scheduling: الـ queues والـ schedulers`, pts: [
      `الهدف: أقصى استخدام للـ CPU، وتبديل الـ processes على الـ CPU بسرعة عشان الـ time sharing. الـ <b>process scheduler</b> بيختار من الـ processes المتاحة.`,
      `الـ <b>Job queue</b>: كل الـ processes اللي في السيستم. الـ <b>Ready queue</b>: الـ processes اللي في الـ main memory، جاهزة ومستنية تتنفذ. الـ <b>Device queues</b>: الـ processes اللي مستنية I/O device. الـ processes بتتنقل بين الـ queues (الـ queueing diagram: ready queue → CPU → I/O request / time slice expired / fork a child / wait for an interrupt → ترجع للـ ready queue).`,
      `الـ <b>I/O-bound</b> process: بتقضي وقت في الـ I/O أكتر من الحسابات، <b>CPU bursts قصيرة وكتير</b>. الـ <b>CPU-bound</b> process: بتقضي وقت أكتر في الحسابات، <b>CPU bursts قليلة وطويلة جدًا</b>.`,
      `الـ <b>Mobile multitasking</b>: الـ iOS في الأول كان بيسمح بـ foreground process واحدة (بتتحكم فيها من الـ UI) وbackground processes محدودة (task واحدة قصيرة، event notifications، tasks طويلة زي الـ audio). الـ Android بيشغّل foreground وbackground بقيود أقل؛ والـ background process بتستخدم <b>service</b> (من غير UI، memory صغيرة) بتفضل شغالة حتى لو الـ background process اتعملها suspend.`
    ] },
    { h: `الـ Context switch`, pts: [
      `لما الـ CPU يحوّل لـ process تانية، السيستم لازم <b>يحفظ state الـ process القديمة</b> و<b>يحمّل الـ state المحفوظة للـ process الجديدة</b>. ده اسمه <b>context switch</b>.`,
      `الـ context بيتمثل في الـ <b>PCB</b> (الرسمة: P0 شغالة → interrupt/system call → حفظ الـ state في PCB0 → تحميل الـ state من PCB1 → P1 شغالة، وبالعكس).`,
      `وقت الـ context-switch ده <b>overhead</b> صافي: السيستم مابيعملش أي شغل مفيد وهو بيبدّل. كل ما الـ OS والـ PCB يبقوا أعقد، الـ switch ياخد وقت أطول.`,
      `ده بيعتمد على دعم الـ hardware: فيه hardware بيوفر <b>كذا register set لكل CPU</b>، فكذا context يبقوا متحمّلين مرة واحدة.`,
      `اللي الـ kernel بيعمله: يحفظ الـ PC والـ registers والـ state بتاعة الـ process الشغالة في الـ PCB بتاعها؛ يحدّث الـ state بتاعتها (ready/waiting) وينقلها للـ queue المناسبة؛ يختار الـ process الجاية؛ يرجّع الـ PC والـ registers ومعلومات الـ memory بتاعتها من الـ PCB؛ يحوّل لـ user mode وينط على الـ PC المحفوظ بتاعها.`
    ] },
    { h: `العمليات على الـ processes: الإنشاء والإنهاء`, pts: [
      `الـ Parents بيعملوا children، فبيتكوّن <b>tree of processes</b> (Linux: init pid 1 → login، kthreadd، sshd → bash → ps، emacs …). الـ processes بتتعرف بـ <b>process identifier (PID)</b>.`,
      `<b>اختيارات مشاركة الـ resources</b>: الـ parent والـ children بيشاركوا كل الـ resources؛ أو الـ children بيشاركوا جزء منها؛ أو مفيش مشاركة خالص. <b>اختيارات التنفيذ</b>: يشتغلوا concurrently، أو الـ parent يستنى لحد ما الـ children يخلصوا.`,
      `الـ <b>Address space</b>: الـ child نسخة من الـ parent، أو الـ child بيتحمّل فيه برنامج جديد.`,
      `في UNIX: <b>fork()</b> بتعمل process جديدة (بترجع 0 في الـ child، والـ PID بتاع الـ child في الـ parent، و&lt; 0 لو فيه error)؛ <b>exec()</b> بتتستخدم بعد fork() وبتستبدل الـ memory space بتاع الـ process ببرنامج جديد؛ والـ parent بيعمل <b>wait()</b>. في Windows: <b>CreateProcess()</b> (زي إنها تشغّل mspaint.exe) وبعدين WaitForSingleObject().`,
      `الـ <b>Termination</b>: الـ process بتنفذ آخر statement وبتعمل <b>exit()</b>؛ الـ status data بترجع للـ parent عن طريق <b>wait()</b>؛ والـ OS بيعمل deallocate للـ resources.`,
      `الـ Parent ممكن يقفل الـ children بـ <b>abort()</b> لما: الـ child يعدّي الـ resources المتخصصة له؛ الـ task ماتبقاش مطلوبة؛ الـ parent بيخرج والـ OS مابيسمحش بـ orphans.`,
      `الـ <b>Cascading termination</b>: فيه OSs بتقفل كل الـ children والـ grandchildren إلخ لما الـ process تخلص (الـ OS هو اللي بيبدأها).`,
      `<code>pid = wait(&amp;status);</code> بترجع الـ status والـ pid بتاع الـ child اللي خلص. الـ <b>Zombie</b>: خلصت، بس مفيش parent مستنيها (الـ parent لسه ماعملش wait()). الـ <b>Orphan</b>: الـ parent بتاعها خلص من غير ما يعمل wait().`
    ] },
    { h: `الـ Chrome multiprocess architecture وموديلات الـ IPC`, pts: [
      `الـ browsers اللي بـ process واحدة: موقع واحد بايظ ممكن يعلّق أو يوقّع الـ browser كله. الـ <b>Chrome</b> فيه 3 أنواع processes: <b>Browser</b> process (الـ UI، والـ disk والـ network I/O)؛ <b>Renderer</b> processes (بترسم الصفحات، HTML، JavaScript؛ واحدة جديدة لكل website؛ شغالة في <b>sandbox</b> بيقيّد الـ disk والـ network I/O)؛ و<b>Plug-in</b> process لكل نوع plug-in.`,
      `الـ Processes يا إما <b>independent</b> يا إما <b>cooperating</b> (تقدر تأثر أو تتأثر بغيرها، ومنها مشاركة الداتا).`,
      `أسباب الـ cooperating processes: <b>مشاركة المعلومات/الداتا، تسريع الحسابات (computation speedup)، الـ modularity، الراحة (convenience)</b>. ومحتاجين <b>IPC</b>.`,
      `فيه موديلين للـ IPC: <b>shared memory</b> و<b>message passing</b> (الرسمة: (a) message passing عن طريق message queue في الـ kernel؛ (b) shared-memory region بين process A وB).`,
      `الـ <b>Shared memory</b>: منطقة memory متشاركة بين الـ processes اللي بتتواصل؛ التواصل تحت تحكم <b>الـ user processes، مش الـ OS</b>؛ والمشكلة الكبيرة هي <b>الـ synchronization</b> بين أفعالهم.`,
      `الـ <b>Producer–consumer problem</b>: الـ producer بيطلّع معلومات والـ consumer بيستهلكها. الـ <b>Unbounded buffer</b>: مفيش حد عملي؛ الـ <b>bounded buffer</b>: حجمه ثابت.`
    ] },
    { h: `الـ Message passing، الـ synchronization، الـ buffering والـ sockets`, pts: [
      `الـ Message passing: الـ processes بتتواصل وتعمل synchronize <b>من غير shared variables</b>. العمليات: <b>send(message)</b> و<b>receive(message)</b>؛ وحجم الرسالة ثابت أو متغير. الـ P والـ Q لازم يعملوا <b>communication link</b> ويتبادلوا الرسايل.`,
      `مسائل التنفيذ: الـ links بتتعمل إزاي؛ ينفع link يوصل أكتر من اتنين processes؛ كام link لكل pair؛ الـ capacity بتاعة الـ link؛ حجم الرسالة ثابت ولا متغير؛ unidirectional ولا bidirectional.`,
      `تنفيذ الـ Link: <b>Physical</b>: shared memory، hardware bus، network. <b>Logical</b>: direct أو indirect؛ synchronous أو asynchronous؛ automatic أو explicit buffering.`,
      `الـ <b>Direct</b>: كل واحد بيسمّي التاني: send(P, msg)، receive(Q, msg). الـ links بتتعمل أوتوماتيك؛ كل link لـ pair واحد بالظبط؛ كل pair ليه link واحد بالظبط؛ وغالبًا bidirectional.`,
      `الـ <b>Indirect</b>: عن طريق <b>mailboxes (ports)</b> ليها IDs مميزة: send(A, msg)، receive(A, msg). الـ link موجود بس لو بيشاركوا mailbox؛ الـ link ممكن يوصل processes كتير؛ والـ pair ممكن يشاركوا كذا link. العمليات: create mailbox، send/receive، destroy. لو P1 وP2 وP3 بيشاركوا A وP1 بعت، مين يستلم؟ الحلول: link بالكتير بين اتنين processes؛ process واحدة بس في المرة تقدر تعمل receive؛ أو السيستم يختار المستلم عشوائي ويبلّغ الـ sender.`,
      `<b>Blocking = synchronous</b>: blocking send (الـ sender بيتوقف لحد ما الرسالة تتستلم)، blocking receive (الـ receiver بيتوقف لحد ما رسالة تبقى متاحة). <b>Non-blocking = asynchronous</b>: ابعت وكمّل؛ استلم رسالة صالحة أو null. لو الاتنين blocking = <b>rendezvous</b>.`,
      `الـ <b>Buffering</b> (queue متوصلة بالـ link): <b>zero capacity</b> (الـ sender يستنى الـ receiver، rendezvous)؛ <b>bounded capacity</b> (n رسالة؛ الـ sender يستنى لو مليانة)؛ <b>unbounded</b> (الـ sender عمره ما يستنى).`,
      `الـ <b>Socket</b> = نقطة نهاية للتواصل (endpoint) = <b>IP address + port</b>، زي 161.25.19.8:1625 يعني port 1625 على الـ host 161.25.19.8. التواصل بيبقى بين pair of sockets. الـ ports اللي أقل من 1024 well known (خدمات standard). <b>127.0.0.1</b> = loopback (السيستم المحلي نفسه).`
    ] }
  ],
  cards: [
    `برنامج شغال (program in execution)؛ كيان active.`,
    `كيان passive: ملف executable متخزن على الـ disk.`,
    `داتا مؤقتة: function parameters، return addresses، local variables.`,
    `الـ Global والـ static variables.`,
    `Memory بتتعملها allocation وقت التشغيل (new، malloc).`,
    `كود البرنامج.`,
    `New، ready، running، waiting، terminated.`,
    `الـ State، الـ PC، الـ CPU registers، معلومات الـ scheduling، معلومات الـ memory-management، معلومات الـ accounting، معلومات الـ I/O status.`,
    `بيختار الـ processes اللي تدخل الـ ready queue؛ بيتحكم في الـ degree of multiprogramming؛ مش بيشتغل كتير (infrequent).`,
    `بيختار الـ process الجاية اللي تشتغل على الـ CPU؛ بيتنادى كل كام millisecond.`,
    `بيعمل swap للـ processes برة على الـ disk ويرجّعها تاني عشان يقلل الـ degree of multiprogramming.`,
    `I/O-bound: CPU bursts قصيرة وكتير. CPU-bound: CPU bursts قليلة وطويلة جدًا.`,
    `حفظ state الـ process القديمة في الـ PCB بتاعها وتحميل الجديدة؛ overhead صافي.`,
    `الـ fork بتعمل child؛ الـ exec بتستبدل الـ memory بتاعته ببرنامج جديد؛ الـ wait بتخلي الـ parent يستنى child.`,
    `Zombie: خلصت بس الـ parent لسه ماعملش wait(). Orphan: الـ parent بتاعها خلص من غير ما يعمل wait().`,
    `لما الـ parent يخلص، الـ OS بيقفل كل الـ descendants بتوعه.`,
    `مشاركة الداتا، تسريع الحسابات، الـ modularity، الـ convenience.`,
    `Shared memory وmessage passing.`,
    `الـ send والـ receive الاتنين blocking.`,
    `نقطة نهاية للتواصل (endpoint) = IP address + port (زي 161.25.19.8:1625).`
  ],
  qa: [
    `الـ program كيان passive: مجموعة instructions متخزنة على الـ disk كملف executable. الـ process كيان active: برنامج شغال، ليه program counter وregisters وstack وdata section وheap، وليه state. البرنامج بيبقى process لما يتحمّل في الـ memory، والبرنامج الواحد ممكن يبقى كذا process.`,
    `new (بتتعمل) → admitted → ready (مستنية تاخد CPU) → scheduler dispatch → running (الـ instructions بتتنفذ). من الـ running: interrupt → ready؛ I/O or event wait → waiting (مستنية event)؛ exit → terminated (خلصت). من الـ waiting: I/O or event completion → ready.`,
    `الـ Short-term (الـ CPU scheduler) بيختار أنهي ready process تاخد الـ CPU بعد كده. بيشتغل كل كام millisecond، فلازم يبقى سريع. الـ Long-term (الـ job scheduler) بيختار أنهي processes تدخل الـ ready queue. بيشتغل كل كام ثانية أو دقيقة وبيتحكم في الـ degree of multiprogramming. الـ Medium-term بيعمل swap للـ processes من الـ memory للـ disk ويرجّعها بعدين، عشان يقلل الـ degree of multiprogramming.`,
    `لما يحصل interrupt أو system call، الـ kernel بيحفظ الـ context (الـ PC، الـ registers، الـ state، معلومات الـ memory) بتاع الـ process الشغالة في الـ PCB بتاعها وينقلها للـ ready أو الـ waiting queue. بعدين الـ scheduler بيختار الـ process الجاية، والـ kernel بيحمّل الـ context بتاعها من الـ PCB ويكمّلها. الوقت ده overhead، والـ hardware اللي فيه كذا register set ممكن يقلله.`,
    `الـ Shared memory: الـ processes بتعمل منطقة memory مشتركة وبتقرا وتكتب فيها مباشرة. سريع، والـ processes (مش الـ OS) هي اللي بتتحكم فيه، بس لازم يعملوا synchronize، زي الـ bounded-buffer producer-consumer. الـ Message passing: الـ processes بتتبادل رسايل بـ send/receive على communication link، ممكن يبقى direct أو indirect (mailboxes)، blocking أو non-blocking، بـ zero أو bounded أو unbounded buffering. مش محتاج shared variables وأسهل في الـ distributed systems، بس كل رسالة بيدخل فيها الـ kernel.`,
    `نقطة نهاية للتواصل (endpoint)، بتتعرف بـ IP address متوصل بيه port number (زي 161.25.19.8:1625). التواصل بيحصل بين pair of sockets. الـ ports اللي أقل من 1024 well known وبتستخدم للخدمات الـ standard، و127.0.0.1 هو الـ loopback address.`
  ],
  quiz: [
    [`الـ zombie هي اللي خلصت هي نفسها بس الـ parent بتاعها لسه ماعملش wait().`, `صح. لو الـ parent خلص من غير ما يعمل wait()، الـ process بتبقى orphan.`, `ده مش مصطلح process state.`, `ده نوع process في Chrome.`],
    [`مش ده المصطلح المستخدم.`, `مش ده المصطلح المستخدم.`, `صح.`, `الـ context switch بيعمل ده بالظبط.`],
    [`صح. الـ PC فيه مكان الـ instruction الجاية.`, `Memory بتتعملها allocation ديناميك.`, `الـ Global والـ static variables.`, `الـ Parameters والـ return addresses والـ local variables.`],
    [`الـ Short-term بيختار الـ process الجاية للـ CPU.`, `الـ Medium-term بيعمل swap للـ processes برة وجوة.`, `صح. الـ job scheduler بيتحكم في الـ degree of multiprogramming.`, `الـ long-term scheduler هو اللي بيعمل كده.`],
    [`صح.`, `الـ orphan الـ parent بتاعها خلص من غير wait().`, `هي terminated، بس الاسم المحدد للحالة دي zombie.`, `الـ init هي الـ root process (pid 1).`],
    [`لأ.`, `صح. iOS: foreground process واحدة بتتحكم فيها من الـ user interface.`, `الـ Background processes بتبقى في الـ memory بس مش على الشاشة.`, `لأ.`],
    [`الـ program هو الـ passive؛ الـ process هي الـ active.`, `صح. الـ process كيان active (برنامج شغال).`],
    [`مش لازم. الـ parent غالبًا بيستنى الـ child بـ wait()، ولو خرج الأول الـ child هيبقى orphan (أو هيتقفل بالـ cascading termination).`, `صح. اختيارات التنفيذ هي "run concurrently" أو "الـ parent يستنى لحد ما الـ children يخلصوا". مفيش قاعدة إن الـ parent يخلص الأول.`],
    [`صح. CPU واحد بينفذ process واحدة في المرة؛ والباقي ready أو waiting.`, `بـ processor واحد، process واحدة بس تبقى running في أي لحظة.`],
    [`ده الـ CPU-bound.`, `صح. بتقضي وقت في الـ I/O أكتر من الحسابات.`, `كل process محتاجة CPU bursts.`, `لأ.`],
    [`فيه slot واحد دايمًا بيفضل فاضي عشان نفرّق بين "full" و"empty".`, `صح. الحل يقدر يستخدم بس BUFFER_SIZE − 1 عنصر.`, `لأ.`, `ده هيبقى unbounded buffer.`],
    [`صح. التلاتة fields في الـ PCB.`, `الكود في الـ text section في الـ memory، مش في الـ PCB.`, `الـ interrupt vector على مستوى السيستم كله، مش لكل process.`, `دي تبع الـ file system.`],
    [`الـ Non-blocking هو الـ asynchronous.`, `صح.`, `الـ Buffering خاصية منفصلة.`, `الـ Indirect معناها mailboxes.`]
  ],
  extra: [
    [`الـ PID بتاع الـ child هو اللي الـ parent بياخده، مش الـ child.`, `صح. fork() بترجع 0 في الـ child، والـ PID بتاع الـ child في الـ parent، وقيمة &lt; 0 لو فيه error.`, `fork() مابترجّعش الـ PID بتاع الـ parent للـ child.`, `القيمة &lt; 0 معناها إن fork() فشلت ومفيش child اتعمل.`],
    [`ده بيعد أول fork() بس. الـ parent والـ child بتاعه الاتنين بيكملوا وينفذوا تاني fork().`, `ده بيزوّد process واحدة لكل fork() call، وناسي إن أول child كمان بينفذ تاني fork().`, `صح. أول fork() بتدّي 2 processes؛ وكل واحدة فيهم بتنفذ تاني fork()، فيبقوا 2 × 2 = 4.`, `ده محتاج تلات fork() calls (2³).`],
    [`مايقدرش: الشرط ((in + 1) % 8) == out بيبقى (0 == 0)، فالـ buffer بيتعامل على إنه full.`, `الـ producer بيكتب عند index in، عمره ما بيكتب عند out، وكمان هو لازم يستنى هنا.`, `صح. (7 + 1) % 8 = 0 = out، فالـ loop بتاع "full" بيلف. الحل بيستخدم بس BUFFER_SIZE − 1 = 7 slots.`, `الـ Empty ده شرط الـ consumer (in == out)، و7 ≠ 0.`],
    [`صح. بيتضاف لما الـ degree of multiprogramming لازم يقل وبيشتغل بالـ swapping.`, `هو بيختار بس أنهي ready process تاخد الـ CPU بعد كده، كل كام millisecond.`, `هو بيتحكم في الـ degree of multiprogramming باختيار أنهي processes تدخل الـ ready queue؛ مابيعملهاش swap برة.`, `الـ dispatcher بيعمل الـ context switch للـ process اللي الـ CPU scheduler اختارها؛ مابيعملش swap للـ memory images.`],
    [`running → waiting بتحصل في I/O or event wait، مش في interrupt.`, `الـ New بس للـ process اللي لسه بتتعمل.`, `هي ماخلصتش؛ هتشتغل تاني بعدين.`, `صح. في الـ state diagram، running → ready مكتوب عليها "interrupt"؛ الـ process بتستنى تتعملها dispatch تاني.`],
    [`ده الـ direct communication.`, `صح. الـ link موجود بس لو الـ processes بيشاركوا mailbox؛ link واحد ممكن يوصل processes كتير، والـ pair ممكن يشاركوا كذا mailbox.`, `دي خاصية من خصائص الـ direct communication.`, `الـ links الأوتوماتيك خاصية الـ direct communication؛ مع الـ mailboxes الـ processes لازم يشاركوا mailbox.`],
    [`الـ stack فيه الـ function parameters والـ return addresses والـ local variables، وبيكبر لتحت.`, `الـ data section فيه الـ global والـ static variables، ثابتين قبل ما البرنامج يشتغل.`, `الـ text section هو كود البرنامج.`, `صح. الـ heap هو الـ memory اللي بتتعملها allocation ديناميك وقت التشغيل (new، delete، malloc، free) وبيكبر لفوق.`],
    [`صح. 127.0.0.1 هو الـ loopback address (السيستم المحلي) والـ port 80 أقل من 1024، فهو well known.`, `الـ Loopback صح، بس 5050 مش أقل من 1024، فمش well-known port.`, `الـ Port 21 well known، بس 161.25.19.8 ده remote host، مش الـ loopback address.`, `ده الـ remote host اللي في مثال المحاضرة، و1625 مش well-known port.`],
    [`غلط: حفظ وتحميل الـ PCBs ده bookkeeping؛ مفيش user process بتتقدم خلاله.`, `صح. وقت الـ context-switch ده overhead صافي، وبيطول لما الـ OS والـ PCB يبقوا أعقد.`],
    [`غلط: في الـ shared memory، الـ user processes هي اللي بتتحكم في التواصل. والـ synchronization بينهم هي المشكلة الأساسية اللي لازم يحلّوها بنفسهم.`, `صح. التواصل تحت تحكم الـ user processes، مش الـ OS، والـ synchronization بين أفعالهم هي المشكلة الكبيرة.`]
  ]
};

AR.os.lectures["3"] = {
  notes: [
    { h: `مفاهيم أساسية: الـ bursts، الـ scheduler، الـ preemption، الـ dispatcher`, pts: [
      `أعلى CPU utilization بتيجي من الـ multiprogramming. تنفيذ الـ process عبارة عن <b>CPU–I/O burst cycle</b>: CPU burst وبعده I/O burst، وهكذا. والاهتمام الأساسي بتوزيع الـ CPU bursts.`,
      `الـ <b>CPU scheduler</b> بيختار process من الـ <b>ready queue</b> ويدّيها CPU core (الـ queue ممكن تبقى مترتبة بطرق مختلفة).`,
      `قرارات الـ scheduling بتحصل لما الـ process: <b>(1)</b> تتحول من running → waiting؛ <b>(2)</b> running → ready؛ <b>(3)</b> waiting → ready؛ <b>(4)</b> تخلص (terminates).`,
      `في 1 و4 <b>مفيش اختيار</b>: لازم process جديدة تتختار. في 2 و3 فيه اختيار.`,
      `<b>الـ Preemptive scheduling ممكن يعمل race conditions</b> لما تبقى فيه داتا مشتركة: process تتعملها preempt وهي بتحدّث الداتا، والـ process التانية تقرا داتا مش متسقة (inconsistent).`,
      `الـ <b>Dispatcher</b> بيدّي التحكم في الـ CPU للـ process اللي الـ scheduler اختارها: <b>switching context</b>، <b>التحويل لـ user mode</b>، و<b>النط للمكان الصح</b> في برنامج الـ user عشان يكمّله. الـ <b>Dispatch latency</b> = الوقت اللي بياخده عشان يوقف process ويشغّل التانية.`
    ] },
    { h: `معايير الـ scheduling والقوانين`, pts: [
      `الـ <b>CPU utilization</b>: خلّي الـ CPU مشغول على قد ما تقدر → <b>maximize</b>.`,
      `الـ <b>Throughput</b>: عدد الـ processes اللي بتخلص في وحدة الزمن → <b>maximize</b>.`,
      `الـ <b>Turnaround time</b>: الوقت اللي بتاخده process معينة عشان تتنفذ (من التقديم لحد ما تخلص) → <b>minimize</b>.`,
      `الـ <b>Waiting time</b>: الوقت اللي الـ process قعدته مستنية <b>في الـ ready queue</b> → <b>minimize</b>.`,
      `الـ <b>Response time</b>: الوقت من تقديم الـ request لحد ما <b>أول response</b> يطلع → <b>minimize</b>.`,
      `طريقة الامتحان: ارسم الـ Gantt chart، اقرا الـ completion time (CT) لكل process، وبعدين احسب الـ TAT والـ WT لكل process وطلّع المتوسط. لو كل الـ processes وصلت عند 0، الـ WT في الـ non-preemptive schedule هو ببساطة وقت البداية بتاعها.`
    ] },
    { h: `الـ FCFS (First-Come, First-Served)`, pts: [
      `Non-preemptive؛ الـ processes بتشتغل بترتيب الوصول. مثال المحاضرة: P1 = 24، P2 = 3، P3 = 3 (كلهم عند 0). الـ Gantt chart اللي فوق للترتيب P1، P2، P3.`,
      `الترتيب P1، P2، P3: WT P1 = 0، P2 = 24، P3 = 27 → المتوسط <b>(0 + 24 + 27)/3 = 17</b>.`,
      `الترتيب P2، P3، P1: WT P1 = 6، P2 = 0، P3 = 3 → المتوسط <b>(6 + 0 + 3)/3 = 3</b>، أحسن بكتير.`,
      `الـ <b>Convoy effect</b>: الـ processes القصيرة اللي بتتزنق ورا واحدة طويلة بتخلي متوسط الـ waiting time في الـ FCFS كبير.`
    ] },
    { h: `الـ SJF (Shortest-Job-First) والـ SRTF`, pts: [
      `بنربط كل process بطول الـ <b>CPU burst الجاي</b> بتاعها ونشغّل الأقصر الأول (لو فيه تعادل → FCFS).`,
      `<b>الـ SJF هو الـ optimal</b>: بيدّي <b>أقل متوسط waiting time</b> لأي مجموعة processes. الصعوبة إنك تعرف طول الـ burst الجاي (تسأل الـ user أو تقدّر).`,
      `النسخة الـ <b>preemptive</b> اسمها <b>Shortest-Remaining-Time-First (SRTF)</b>: لما process جديدة توصل بـ burst أقصر من اللي فاضل من الشغالة، اعمل preempt.`,
      `مثال الـ SJF في المحاضرة: P1 = 6، P2 = 8، P3 = 7، P4 = 3. الـ Chart: P4 (0–3)، P1 (3–9)، P3 (9–16)، P2 (16–24). متوسط الـ WT = <b>(3 + 16 + 9 + 0)/4 = 7</b>.`,
      `⚠ جدول الـ slide كمان فيه arrival times 0، 2، 4، 5، بس الـ chart بتاعه بيتجاهلها (بيعاملهم كأنهم كلهم وصلوا عند 0). لو احترمنا أوقات الوصول دي، الـ non-preemptive SJF بيدّي P1 0–6، P4 6–9، P3 9–16، P2 16–24 → WT 0، 14، 5، 1 → المتوسط 5. امشي على اللي السؤال بيقوله عن الـ arrival times.`,
      `مثال الـ SRTF في المحاضرة (arrival/burst): P1 0/8، P2 1/4، P3 2/9، P4 3/5. عند t = 1 الـ P2 (4) &lt; اللي فاضل من P1 وهو 7، فـ P1 بتتعملها preempt.`,
      `متوسط الـ WT في الـ SRTF = [(10 − 1) + (1 − 1) + (17 − 2) + (5 − 3)]/4 = <b>26/4 = 6.5</b> (الـ Gantt chart اللي فوق).`
    ] },
    { h: `الـ Round Robin (RR)`, pts: [
      `كل process بتاخد حتة صغيرة من وقت الـ CPU، اسمها <b>time quantum q</b> (غالبًا 10–100 ms). لما تخلص الـ process <b>بتتعملها preempt وتتحط في آخر الـ ready queue</b>. فيه timer بيعمل interrupt كل quantum.`,
      `لو فيه n processes والـ quantum هو q، كل واحدة بتاخد 1/n من الـ CPU في حتت بالكتير q؛ <b>مفيش process تستنى أكتر من (n − 1)q</b> وحدة زمن.`,
      `الـ Performance: <b>q كبير → بيتصرف زي FIFO/FCFS</b>؛ q صغير → context switches كتير أوي، فالـ q لازم يبقى كبير مقارنة بوقت الـ context-switch (الـ context switch &lt; 10 µs).`,
      `عادة <b>متوسط turnaround أعلى من الـ SJF بس response أحسن</b>.`,
      `مثال المحاضرة، q = 4: P1 = 24، P2 = 3، P3 = 3 → P1 0–4، P2 4–7، P3 7–10، P1 10–30. متوسط الـ WT = [(30 − 24) + (7 − 3) + (10 − 3)]/3 = <b>17/3 = 5.67</b>. (الـ WT = completion − burst لما الكل يوصل عند 0.)`,
      `الاصطلاح المستخدم في كل الإجابات المحلولة: لما الـ quantum بتاع process يخلص في نفس اللحظة اللي process جديدة بتوصل فيها، <b>الجديدة بتدخل الـ queue الأول</b> والـ process اللي اتعملها preempt بتقف وراها.`
    ] },
    { h: `الـ Priority scheduling (والـ priority مع RR)`, pts: [
      `كل process ليها priority number (integer)؛ الـ CPU بيروح للـ priority الأعلى، <b>أصغر integer = أعلى priority</b>. ممكن يبقى <b>preemptive أو non-preemptive</b>.`,
      `<b>الـ SJF هو priority algorithm</b> الـ priority فيه عكس طول الـ CPU burst الجاي المتوقع.`,
      `<b>المشكلة: starvation</b>: الـ processes اللي الـ priority بتاعها واطي ممكن عمرها ما تتنفذ. <b>الحل: aging</b>: نزوّد الـ priority بالتدريج للـ processes اللي بتستنى كتير.`,
      `مثال المحاضرة (burst/priority): P1 10/3، P2 1/1، P3 2/4، P4 1/5، P5 5/2. الـ Chart: P2 0–1، P5 1–6، P1 6–16، P3 16–18، P4 18–19. متوسط الـ WT = (6 + 0 + 16 + 18 + 1)/5 = <b>41/5 = 8.2</b>.`,
      `<b>الـ Priority مع Round-Robin</b>: شغّل الأعلى priority؛ والـ processes اللي <b>ليها نفس الـ priority بتشتغل RR</b>. مثال q = 2: P1 4/3، P2 5/2، P3 8/2، P4 7/1، P5 3/3 → P4 0–7، وبعدين P2 وP3 بيتبادلوا (7–9، 9–11، 11–13، 13–15، P2 15–16، P3 16–20)، وبعدين P1 وP5 بيتبادلوا (20–22، 22–24، P1 24–26، P5 26–27). الـ WT: P1 22، P2 11، P3 12، P4 0، P5 24 → <b>69/5 = 13.8</b>.`
    ] },
    { h: `الـ Multilevel queue والـ multilevel feedback queue`, pts: [
      `الـ <b>Multilevel queue</b>: مع الـ priority scheduling، بنعمل queue منفصلة لكل priority ونعمل schedule من الـ queue اللي ليها أعلى priority. الترتيب ممكن يبقى حسب نوع الـ process: <b>real-time</b> (الأعلى) → <b>system</b> → <b>interactive</b> → <b>batch</b> (الأوطى).`,
      `الـ <b>Multilevel feedback queue</b>: الـ process <b>تقدر تتنقل بين الـ queues</b>. بيتعرف بـ: عدد الـ queues؛ الـ scheduling algorithm لكل queue؛ طريقة <b>ترقية (upgrade)</b> الـ process؛ طريقة <b>تنزيل (demote)</b> الـ process؛ وطريقة تحديد الـ process تدخل أنهي queue لما تحتاج خدمة.`,
      `<b>الـ Aging ممكن يتعمل</b> باستخدام multilevel feedback queue.`,
      `مثال: Q0 = RR بـ q = 8 ms، Q1 = RR بـ q = 16 ms، Q2 = FCFS. الـ process الجديدة بتدخل Q0 وتاخد 8 ms؛ لو ماخلصتش بتنزل Q1 وتاخد 16 ms كمان؛ لو لسه ماخلصتش بتتعملها preempt وتنزل Q2.`
    ] },
    { h: `مسألة مراجعة محلولة (Topic 3 Q4، وكمان Midterm 2021/22)`, pts: [
      `P1 = 10 (priority 3)، P2 = 3 (1)، P3 = 2 (2)، P4 = 1 (4)، كلهم عند time 0 بالترتيب P1…P4. (الجدول اللي فوق بيفصّل حالة RR q = 1.)`,
      `<b>FCFS</b>: P1 0–10، P2 10–13، P3 13–15، P4 15–16 → WT 0، 10، 13، 15 → المتوسط <b>9.5</b>.`,
      `<b>SJF</b>: P4 0–1، P3 1–3، P2 3–6، P1 6–16 → WT P1 6، P2 3، P3 1، P4 0 → المتوسط <b>2.5</b>.`,
      `<b>RR q = 1</b>: P1 P2 P3 P4 P1 P2 P3 P1 P2 وبعدين P1 9–16 → WT P1 6، P2 6، P3 5، P4 3 → المتوسط <b>5</b>.`,
      `<b>Priority</b>: P2 0–3، P3 3–5، P1 5–15، P4 15–16 → WT 5، 0، 3، 15 → المتوسط <b>5.75</b>.`,
      `أقل متوسط waiting time: <b>SJF (2.5)</b>، لأن الـ SJF مثبت إنه optimal.`,
      `مراجعة Q5 (الـ starvation): <b>الـ SJF والـ priority</b> ممكن يعملوا starvation (الـ jobs الطويلة أو اللي الـ priority بتاعها واطي ممكن تستنى للأبد)؛ والحل هو <b>aging</b>. الـ FCFS والـ RR مافيهمش starvation. الـ slides وورقة المراجعة بيركزوا على الـ priority.`
    ] }
  ],
  cards: [
    `تنفيذ الـ process بيتبادل بين CPU bursts وI/O bursts.`,
    `Running→waiting، running→ready، waiting→ready، terminates.`,
    `الـ scheduling بيحصل بس لما الـ process تخلص أو تروح waiting (الحالات 1 و4).`,
    `Switch context، التحويل لـ user mode، النط للمكان الصح في برنامج الـ user.`,
    `الوقت اللي الـ dispatcher بياخده عشان يوقف process ويشغّل التانية.`,
    `عدد الـ processes اللي بتخلص في وحدة الزمن (maximize).`,
    `Completion − arrival (minimize).`,
    `الوقت اللي في الـ ready queue = turnaround − burst (minimize).`,
    `الوقت من تقديم الـ request لحد أول response (minimize).`,
    `الـ SJF (هو الـ optimal).`,
    `Shortest-Remaining-Time-First (SRTF).`,
    `FCFS (FIFO).`,
    `مفيش process تستنى أكتر من (n − 1)q.`,
    `الـ processes اللي الـ priority بتاعها واطي ممكن عمرها ما تشتغل؛ الحل aging (زوّد الـ priority مع الوقت).`,
    `أصغر integer = أعلى priority.`,
    `الـ processes بتتنقل بين الـ queues (upgrade/demote)؛ وممكن يتعمل بيه aging.`,
    `الأعلى priority الأول؛ والـ priorities المتساوية بيتقاسموا الـ CPU بالـ round robin.`
  ],
  qa: [
    `الـ CPU scheduler بيختار process من الـ ready queue كل ما process (1) تتحول من running لـ waiting، (2) تتحول من running لـ ready، (3) تتحول من waiting لـ ready، أو (4) تخلص. في الحالات 1 و4 مفيش اختيار: لازم process جديدة تتختار. في الحالات 2 و3 فيه اختيار. لو الـ scheduling بيحصل في 1 و4 بس يبقى non-preemptive؛ غير كده يبقى preemptive. بعدين الـ dispatcher بيعمل switch context، ويحوّل لـ user mode، وينط للمكان الصح.`,
    `الـ Non-preemptive: أول ما الـ process تاخد الـ CPU بتفضل ماسكاه لحد ما تخلص أو تروح waiting (القرارات بس في الحالات 1 و4)، زي الـ FCFS والـ SJF أو الـ priority الـ non-preemptive. الـ Preemptive: الـ CPU ممكن يتاخد من process شغالة لما تروح ready أو process تانية تبقى ready (الحالات 2 و3 كمان)، زي الـ RR والـ SRTF والـ preemptive priority. الـ preemption بيدّي response أحسن بس ممكن يعمل race conditions على الداتا المشتركة. أغلب الـ OSs الحديثة (Windows، macOS، Linux، UNIX) preemptive.`,
    `الـ CPU utilization: خلّي الـ CPU مشغول (maximize). الـ Throughput: الـ processes اللي بتخلص في وحدة الزمن (maximize). الـ Turnaround time: وقت تنفيذ الـ process، من التقديم للنهاية (minimize). الـ Waiting time: الوقت اللي في الـ ready queue (minimize). الـ Response time: الوقت من الـ request لأول response (minimize).`,
    `الـ Priority scheduling (والـ SJF/SRTF، اللي هو priority حسب طول الـ burst) ممكن يعمل starvation للـ processes اللي الـ priority بتاعها واطي أو الطويلة، اللي ممكن عمرها ما تتنفذ. الحل هو الـ aging: مع مرور الوقت، زوّد الـ priority بتاع الـ processes المستنية. الـ FCFS والـ RR مايقدروش يعملوا starvation لـ process.`,
    `لو الـ q كبير جدًا، الـ RR بيتحول لـ FCFS. لو الـ q صغير أوي، الـ CPU بيقضي أغلب وقته في الـ context switching (overhead). الـ q لازم يبقى كبير مقارنة بوقت الـ context-switch؛ عادة الـ q بيبقى 10–100 ms والـ switch أقل من 10 µs.`
  ],
  quiz: [
    [`الـ FCFS بيعاني من الـ convoy effect.`, `صح. الـ SJF هو الـ optimal في متوسط الـ waiting time.`, `الـ RR بيدّي response أحسن بس غالبًا waiting/turnaround أعلى من الـ SJF.`, `بيبقى optimal بس لو الـ priority تساوي طول الـ burst (يعني يتحول لـ SJF).`],
    [`الـ Starvation هي المشكلة نفسها.`, `مش حل.`, `مش حل.`, `صح. نزوّد الـ priority بالتدريج للـ processes المستنية.`],
    [`الـ Busy waiting بيخلي الـ CPU مشغول بحاجة مش مفيدة.`, `صح. الـ busy-wait loop بيضيّع CPU cycles كانت ممكن process تانية تستخدمها. محاضرة الـ I/O بتقول إنه معقول بس لو الجهاز سريع، وغير كده مش efficient.`],
    [`ده الناتج للترتيب P2، P3، P1.`, `صح. (0 + 24 + 27)/3 = 17.`, `ده الـ RR بـ q = 4.`, `الـ 27 ده الـ waiting time بتاع P3 لوحده.`],
    [`صح. الـ WT = 6 + 4 + 7 = 17، و17/3 = 5.67.`, `ده الـ FCFS.`, `لأ.`, `لأ.`],
    [`ده الـ non-preemptive SJF بأوقات الوصول دي.`, `صح. الـ WT = 9 + 0 + 15 + 2 = 26، و26/4 = 6.5.`, `ده الـ FCFS.`, `لأ.`],
    [`ده تصرف الـ non-preemptive.`, `صح. أقصر remaining time هو اللي بيكسب.`, `CPU واحد.`, `مفيش quantum في الـ SRTF.`],
    [`دول الحالات 2 و3 (preemptive).`, `صح. الحالات 1 و4.`, `لأ.`, `التبديل بالـ timer ده preemptive.`],
    [`لأ.`, `صح. كل process بتخلص الـ burst بتاعها في quantum واحد، بترتيب الوصول.`, `لأ.`, `لأ.`],
    [`دي من وظايف الـ dispatcher.`, `دي من وظايف الـ dispatcher.`, `دي من وظايف الـ dispatcher.`, `الاختيار الصح. الاختيار ده شغل الـ CPU scheduler؛ الـ dispatcher بس بيدّيها الـ CPU.`],
    [`صح. الترتيب P2، P5، P1، P3، P4 بيدّي WT 6 + 0 + 16 + 18 + 1 = 41، و41/5 = 8.2.`, `ده الـ FCFS.`, `ده الـ SJF.`, `ده الـ RR بـ q = 1.`],
    [`ده الـ turnaround time.`, `صح.`, `ده الـ response time.`, `وقت الـ I/O مش waiting time.`]
  ],
  extra: [
    [`ده متوسط الـ waiting time (0 + 4 + 6 + 13)/4. الـ Turnaround بيشمل الـ burst كمان.`, `ده متوسط الـ completion time (5 + 8 + 16 + 18)/4. لازم تطرح الـ arrival time لكل واحدة.`, `صح. الـ Gantt chart: P1 0–5، P2 5–8، P3 8–16، P4 16–18. الـ TAT = CT − AT = 5، 7، 14، 15 → 41/4 = 10.25.`, `ده متوسط الـ turnaround في الـ non-preemptive SJF للـ processes دي، مش FCFS.`],
    [`صح. P1 بس موجودة عند 0، فبتشتغل 0–5؛ وبعدين أقصر job جاهزة: P4 5–7، P2 7–10، P3 10–18. الـ WT = 0، 6، 8، 2 → 16/4 = 4.`, `ده بيعامل كل الـ processes كأنها وصلت عند 0 (P4، P2، P1، P3). لازم تحترم الـ arrival times: P4 مش موجودة عند time 0.`, `ده متوسط الـ waiting time في الـ FCFS لنفس الـ processes.`, `ده متوسط الـ turnaround time، مش الـ waiting time.`],
    [`ده الـ non-preemptive SJF (P1 0–6، P3، P4، P2). الـ SRTF بيعمل preempt لـ P1 لما P2 توصل بـ burst أقصر.`, `ده الـ FCFS للـ processes دي.`, `ده متوسط الـ turnaround time في الـ SRTF (12 + 4 + 1 + 3)/4، مش الـ waiting time.`, `صح. P1 0–1، P2 1–2، P3 2–3، P2 3–5، P4 5–7، P1 7–12. الـ WT = P1 6، P2 1، P3 0، P4 1 → 8/4 = 2.`],
    [`ده الـ FCFS (WT 0، 6، 9). في الـ RR، P1 بتتعملها preempt بعد 2 units.`, `صح. P1 0–2، P2 2–4، P3 4–5، P1 5–7، P2 7–8، P1 8–10. الـ WT = CT − burst = 4، 5، 4 → 13/3 ≈ 4.33.`, `ده متوسط الـ turnaround (10 + 8 + 5)/3. اطرح الـ burst لكل واحدة عشان تجيب الـ waiting time.`, `ده الـ SJF (P3، P2، P1)، والـ RR مابيعملش كده.`],
    [`ده متوسط الـ waiting time (3 + 0 + 13 + 7)/4.`, `ده ترتيب الـ FCFS P1، P2، P3، P4، اللي بيتجاهل الـ priorities.`, `ده بيعامل أكبر رقم على إنه أعلى priority. في المحاضرة أصغر integer هو الأعلى.`, `صح. الترتيب P2 0–3، P1 3–7، P4 7–13، P3 13–15. الـ TAT = CT = 7، 3، 15، 13 → 38/4 = 9.5.`],
    [`ده n × q. الـ process مابتستناش الـ quantum بتاعها هي، فهو (n − 1)q.`, `صح. مفيش process تستنى أكتر من (n − 1)q = 4 × 20 = 80 ms.`, `ده quantum واحد، وده صح بس لو فيه 2 processes.`, `ده q / n. كل process بتاخد 1/n من الـ CPU، بس في حتت حجمها q.`],
    [`صح. بتدخل Q0 وتاخد 8 ms، بتنزل Q1 تاخد 16 ms كمان (24 إجمالي)، وبعدين بتتعملها preempt وتنزل Q2 للـ 6 ms الباقيين.`, `الـ quantum بتاع Q1 هو 16 ms بس، فبعد 24 ms إجمالي الـ process بتنزل لـ Q2.`, `كل process جديدة بتدخل Q0؛ وبتنزل بس بعد ما تخلّص الـ quantum بتاعها.`, `الـ quanta متلخبطة: Q0 ليها q = 8 وQ1 ليها q = 16.`],
    [`الـ Turnaround (من التقديم للنهاية) لازم يبقى minimize.`, `الـ Response time (من التقديم لأول response) لازم يبقى minimize.`, `صح. الـ Throughput، عدد الـ processes اللي بتخلص في وحدة الزمن، بيبقى maximize (زي الـ CPU utilization).`, `الوقت في الـ ready queue لازم يبقى minimize.`],
    [`صح. الـ process ممكن تتعملها preempt وهي بتحدّث داتا مشتركة، والـ process اللي بعدها تقرا داتا مش متسقة.`, `غلط: المحاضرة بتعتبر الـ race conditions على الداتا المشتركة هي تمن الـ preemption. الـ non-preemptive scheduling بيتجنب ده.`],
    [`الـ Real-time processes ليها أعلى priority، مش الـ interactive.`, `ده بالعكس: الـ batch هي الأوطى.`, `الـ Real-time بتيجي الأول، والـ batch في الآخر.`, `صح. ده ترتيب المحاضرة حسب نوع الـ process.`]
  ]
};

AR.os.lectures["4"] = {
  notes: [
    { h: `خلفية، والـ base والـ limit registers`, pts: [
      `البرنامج لازم يتجاب من الـ disk للـ memory ويتحط جوة process عشان يشتغل. <b>الـ main memory والـ registers</b> هما الـ storage الوحيد اللي الـ CPU يقدر يوصله مباشرة.`,
      `الـ memory unit بتشوف بس سلسلة addresses + read requests، أو address + data + write requests. الوصول للـ register بياخد CPU clock واحدة (أو أقل)؛ الـ main memory ممكن تاخد cycles كتير؛ والـ <b>cache</b> قاعد بين الـ main memory والـ CPU registers.`,
      `الـ <b>protection</b> بتاع الـ memory لازم عشان الشغل يبقى صح.`,
      `زوج <b>base وlimit registers</b> بيحدد الـ logical address space بتاع الـ process. الـ CPU بيتشيك على كل memory access في الـ user-mode: يبقى legal لو <b>base ≤ address &lt; base + limit</b>، غير كده <b>trap</b> للـ OS (addressing error). مثال الرسمة: base 300040، limit 120900 → الـ range الـ legal هو 300040 … 420939.`
    ] },
    { h: `الـ Address binding؛ الـ logical مقابل الـ physical addresses؛ الـ MMU`, pts: [
      `البرامج اللي على الـ disk ومستنية تتحمّل بتكوّن الـ <b>input queue</b>. الـ addresses بتبقى <b>symbolic</b> في الـ source code (variables)، و<b>relocatable</b> بعد الـ compiling ("14 bytes من أول الـ module ده")، و<b>absolute</b> بعد ما الـ linker/loader يعملها bind (زي 74014).`,
      `الـ Binding ممكن يحصل في 3 مراحل: <b>Compile time</b>: لو مكان الـ memory معروف من الأول، بيطلع absolute code؛ ولازم تعمل recompile لو مكان البداية اتغير. <b>Load time</b>: بيطلع relocatable code لو المكان مش معروف وقت الـ compile. <b>Execution time</b>: الـ binding بيتأجل لوقت التشغيل لو الـ process ممكن تتنقل وهي شغالة؛ ومحتاج دعم hardware (base وlimit registers).`,
      `الـ Multistep processing: source program → compiler/assembler → object module → linkage editor (+ object modules تانية) → load module → loader (+ system library) → in-memory binary image (+ system library بتتحمّل ديناميك عن طريق الـ dynamic linking).`,
      `الـ <b>Logical (virtual) address</b>: الـ CPU هو اللي بيطلّعه. الـ <b>Physical address</b>: الـ address اللي الـ memory unit بتشوفه. هما <b>نفس الحاجة</b> في الـ compile-time والـ load-time binding و<b>بيختلفوا</b> في الـ execution-time binding.`,
      `الـ <b>Logical address space</b> = مجموعة كل الـ logical addresses اللي البرنامج بيطلّعها؛ الـ <b>physical address space</b> = مجموعة كل الـ physical addresses اللي بتقابلها.`,
      `الـ <b>MMU (Memory-Management Unit)</b>: hardware بيعمل mapping من virtual لـ physical addresses وقت التشغيل. أبسط طريقة: الـ base register بيبقى <b>relocation register</b>، وقيمته بتتجمع على كل address الـ user process بتبعته للـ memory (زي relocation 14000 + logical 346 → physical 14346). برنامج الـ user بيتعامل مع logical addresses بس وعمره ما بيشوف الـ physical addresses الحقيقية.`,
      `الـ <b>Dynamic loading</b> (slide 10): الـ routine مابتتحمّلش غير لما تتنادى؛ استخدام أحسن لمساحة الـ memory (الـ routine اللي مش مستخدمة عمرها ما بتتحمّل)؛ كل الـ routines متخزنة على الـ disk بـ relocatable load format؛ مفيد للكود الكبير اللي نادرًا ما بيستخدم (error handling). مش محتاج دعم خاص من الـ OS: بيتعمل من خلال تصميم البرنامج، وإن كان الـ OS ممكن يوفر libraries.`
    ] },
    { h: `الـ Swapping`, pts: [
      `الـ process ممكن تتعملها <b>swap</b> مؤقتًا برة الـ memory لـ <b>backing store</b> وترجع تاني عشان تكمّل. فمجموع الـ physical memory بتاعة كل الـ processes ممكن يعدّي الـ physical memory الموجودة.`,
      `الـ <b>Backing store</b>: disk سريع وكبير كفاية يشيل نسخ من كل الـ memory images، وفيه direct access ليها.`,
      `الـ <b>Roll out, roll in</b>: نوع من الـ swapping للـ priority-based scheduling؛ الـ process اللي الـ priority بتاعها أوطى بتتعملها swap out عشان اللي أعلى تتحمّل وتشتغل.`,
      `الجزء الأكبر من وقت الـ swap هو الـ <b>transfer time</b>، وبيتناسب طرديًا مع كمية الـ memory اللي بتتعملها swap. السيستم بيحتفظ بـ ready queue للـ processes اللي الـ memory images بتاعتها على الـ disk.`,
      `لو الـ process الجاية مش في الـ memory، الـ context switch لازم يعمل swap out لـ process وswap in للتانية: 100 MB بسرعة 50 MB/s = <b>2000 ms</b> out + 2000 ms in = <b>4 s</b> إجمالي جزء الـ swap.`
    ] },
    { h: `الـ Contiguous allocation ومشكلة الـ dynamic storage-allocation`, pts: [
      `الـ main memory متقسمة لـ two partitions: الـ <b>resident OS</b> (غالبًا في الـ low memory، ومعاه الـ interrupt vector) والـ <b>user processes</b> (الـ high memory). كل process في <b>section واحدة contiguous</b>.`,
      `الـ Relocation registers بتحمي الـ processes من بعض ومن الـ OS: الـ <b>base (relocation) register</b> = أصغر physical address؛ الـ <b>limit register</b> = الـ range بتاع الـ logical addresses (كل logical address لازم يبقى &lt; limit). الـ MMU بيعمل mapping ديناميك: لو logical &lt; limit يبقى physical = logical + relocation، غير كده trap.`,
      `الـ <b>Multiple-partition allocation</b>: الـ degree of multiprogramming محدود بعدد الـ partitions؛ partitions بأحجام متغيرة عشان الكفاءة. الـ <b>hole</b> = block من الـ memory المتاحة. الـ process الجديدة بتاخد hole كبير كفاية؛ والـ process اللي بتخرج بتفضّي الـ partition بتاعها والـ free partitions اللي جنب بعض بتتجمع. الـ OS بيتابع الـ allocated partitions والـ free partitions (الـ holes).`,
      `الـ <b>First-fit</b>: ادّي <b>أول</b> hole كبير كفاية. الـ <b>Best-fit</b>: <b>أصغر</b> hole كبير كفاية (لازم تدوّر في اللستة كلها إلا لو مترتبة بالحجم)، وده بيطلّع أصغر hole متبقي. الـ <b>Worst-fit</b>: <b>أكبر</b> hole (برضه بيدوّر في اللستة كلها)، وده بيطلّع أكبر hole متبقي.`,
      `الـ First-fit والـ best-fit أحسن من الـ worst-fit في السرعة واستخدام الـ storage.`,
      `الطريقة: امشي على الـ processes <b>بالترتيب</b>. بعد كل placement الـ hole بيصغر (زي 500 − 212 = 288 K) والباقي ده ممكن ياخد processes بعدين.`
    ] },
    { h: `الـ Fragmentation`, pts: [
      `الـ <b>External fragmentation</b>: إجمالي مساحة الـ memory موجود ويكفي الطلب، بس <b>مش contiguous</b> (بيحصل مع الـ variable partitions / segmentation).`,
      `الـ <b>Internal fragmentation</b>: الـ memory المتخصصة ممكن تبقى أكبر شوية من المطلوب؛ الفرق ده memory <b>جوة الـ partition بس مش مستخدمة</b> (بيحصل مع الـ fixed blocks / paging).`,
      `بنقلل الـ external fragmentation بالـ <b>compaction</b>: نحرّك محتويات الـ memory عشان نجمّع كل الـ free memory في block واحد كبير. ممكن <b>بس لو الـ relocation dynamic</b> وبيحصل وقت الـ execution.`,
      `مشكلة الـ I/O وقت الـ compaction: نثبّت (latch) الـ job في الـ memory وهي بتعمل I/O، أو نعمل I/O بس في buffers الـ OS. والـ backing store عنده نفس مشاكل الـ fragmentation.`
    ] },
    { h: `الـ Segmentation`, pts: [
      `memory-management scheme بيدعم <b>نظرة الـ user للـ memory</b>: البرنامج عبارة عن مجموعة <b>segments</b>، كل واحد وحدة منطقية زي main program، procedure، function، method، object، local/global variables، common block، stack، symbol table، arrays.`,
      `الـ Logical address = <b>&lt;segment-number, offset&gt;</b>.`,
      `الـ <b>Segment table</b>: كل entry فيها <b>base</b> (أول physical address للـ segment) و<b>limit</b> (طول الـ segment).`,
      `الـ <b>STBR</b> (segment-table base register) بيشاور على الـ segment table في الـ memory؛ الـ <b>STLR</b> (segment-table length register) = عدد الـ segments؛ رقم الـ segment s يبقى legal لو <b>s &lt; STLR</b>.`,
      `الـ Hardware: لو <b>offset d &lt; limit</b>، يبقى physical = base + d؛ غير كده <b>trap: addressing error</b>.`,
      `الـ Protection: كل entry فيها validation bit (0 = segment مش legal) وصلاحيات read/write/execute؛ ومشاركة الكود بتحصل على مستوى الـ segment. وبما إن الـ segments أطوالها مختلفة، الـ allocation بيبقى dynamic storage-allocation problem (external fragmentation).`,
      `مثال الـ slide (limit, base): seg0 (1000, 1400)، seg1 (400, 6300)، seg2 (400, 4300)، seg3 (1100, 3200)، seg4 (1000, 4700). الـ byte 53 من seg 2 → 4300 + 53 = <b>4353</b>؛ الـ byte 852 من seg 3 → 3200 + 852 = <b>4052</b>؛ الـ byte 1222 من seg 0 → 1222 ≥ 1000 → <b>trap</b>.`
    ] },
    { h: `الـ Paging والـ address translation`, pts: [
      `الـ physical address space بتاع الـ process ممكن يبقى <b>noncontiguous</b>. الـ Paging <b>بيتجنب الـ external fragmentation</b> ومشكلة الحتت اللي أحجامها مختلفة، بس <b>لسه فيه internal fragmentation</b>.`,
      `الـ physical memory بتتقسم لـ blocks ثابتة الحجم اسمها <b>frames</b> (الحجم power of 2، ما بين 512 bytes و16 MB)؛ والـ logical memory لـ blocks بنفس الحجم اسمها <b>pages</b>. والـ backing store كمان بيتقسم لـ pages.`,
      `بنتابع كل الـ free frames؛ عشان نشغّل برنامج فيه N pages، بنلاقي N free frames ونحمّله؛ ونعمل <b>page table</b> تترجم من logical لـ physical addresses.`,
      `الـ Logical address = <b>page number p</b> (index في الـ page table، اللي فيها الـ base address/frame لكل page) + <b>page offset d</b> (بيتجمع مع الـ frame base عشان يطلع الـ physical address). لو الـ logical address space هو 2<sup>m</sup> والـ page size هو 2<sup>n</sup>: <b>p = الـ m − n bits العالية، d = الـ n bits الواطية</b>.`,
      `رسمة الـ Paging model: page table 0→1، 1→4، 2→3، 3→7 (page 0 في frame 1، page 1 في frame 4، page 2 في frame 3، page 3 في frame 7).`,
      `<b>مثال internal fragmentation</b>: page = 2,048 B، process = 72,766 B → 35 pages + 1,086 B → 36 frames، الـ internal fragmentation = 2,048 − 1,086 = <b>962 B</b>. أسوأ حالة = 1 frame − 1 byte؛ وفي المتوسط ½ frame. الـ pages الصغيرة معناها fragmentation أقل بس page-table entries أكتر؛ وأحجام الـ pages بتكبر مع الوقت (Solaris بيدعم 8 KB و4 MB).`,
      `نظرة الـ process والـ physical memory بقوا مختلفين جدًا، والـ process تقدر توصل بس للـ memory بتاعتها.`
    ] },
    { h: `الـ Paging مقابل الـ segmentation` }
  ],
  cards: [
    `الـ Main memory والـ registers.`,
    `بيحددوا الـ logical address space بتاع الـ process؛ كل access لازم يحقق base ≤ address &lt; base + limit.`,
    `Compile time، load time، execution time.`,
    `Logical: الـ CPU بيطلّعه (virtual). Physical: اللي الـ memory unit بتشوفه.`,
    `في الـ execution-time binding.`,
    `Hardware بيعمل mapping من virtual لـ physical addresses وقت التشغيل (زي إنه يجمع الـ relocation register).`,
    `الـ routine مابتتحمّلش غير لما تتنادى؛ مش محتاج دعم خاص من الـ OS.`,
    `نقل الـ process مؤقتًا للـ backing store وترجيعها عشان تكمّل التنفيذ.`,
    `اعمل swap out لـ process الـ priority بتاعها أوطى عشان تشغّل واحدة أعلى.`,
    `أول hole كبير كفاية / أصغر hole كبير كفاية / أكبر hole.`,
    `إجمالي الـ free memory كفاية، بس مش contiguous.`,
    `الـ block المتخصص أكبر شوية من المطلوب؛ الجزء اللي مش مستخدم جوة الـ partition.`,
    `بتحرّك محتويات الـ memory عشان الـ free memory تبقى block واحد كبير؛ محتاجة dynamic relocation.`,
    `Base (عنوان البداية) وlimit (الطول).`,
    `Segment-table base register (مكان الـ table) / length register (عدد الـ segments؛ s &lt; STLR).`,
    `Frame: block ثابت من الـ physical memory. Page: block بنفس الحجم من الـ logical memory.`,
    `مفيش external fragmentation، بس فيه internal fragmentation في آخر page.`,
    `Page number p (الـ m − n bits العالية) + offset d (الـ n bits الواطية).`
  ],
  qa: [
    `زوج registers بيحدد الـ logical address space بتاع الـ process. الـ base فيه أصغر physical address legal، والـ limit فيه حجم الـ range. الـ CPU hardware بيتشيك على كل memory access في الـ user-mode: لو base ≤ address &lt; base + limit بيكمّل؛ غير كده بيعمل trap للـ OS بـ addressing error. الـ OS بس هو اللي يقدر يحمّلهم، باستخدام privileged instructions.`,
    `الـ logical (virtual) address الـ CPU بيطلّعه وقت تنفيذ البرنامج. الـ physical address هو اللي الـ memory unit بتشوفه فعلًا. هما نفس الحاجة مع الـ compile-time والـ load-time binding بس بيختلفوا مع الـ execution-time binding، لما الـ MMU بيعمل mapping من logical لـ physical وقت التشغيل (زي إنه يجمع الـ relocation register). البرنامج عمره ما بيشوف غير logical addresses.`,
    `الـ First-fit: 212→500 (فاضل 288)، 417→600، 112→288، 426 لازم يستنى. الـ Best-fit: 212→300، 417→500، 112→200، 426→600. الـ Worst-fit: 212→600 (فاضل 388)، 417→500، 112→388، 426 لازم يستنى. الـ Best-fit هو اللي بيستخدم الـ memory بأكفأ طريقة هنا لأنه الوحيد اللي حط الأربعة.`,
    `الـ External: فيه free memory إجمالي كفاية للطلب، بس مش contiguous. بيحصل مع الـ variable partitions والـ segmentation، والـ compaction بيحله. الـ Internal: الـ process بتاخد block أكبر شوية من اللي طلبته، والمساحة اللي مش مستخدمة جوة الـ partition بتضيع. بيحصل مع الـ fixed-size blocks زي الـ paging، زي 962 bytes في آخر page حجمها 2 KB.`,
    `الـ physical memory بتتقسم لـ frames ثابتة الحجم والـ logical memory لـ pages بنفس الحجم. الـ process اللي فيها N pages بتتحمّل في أي N free frames، ومش لازم يبقوا contiguous. الـ page table بتعمل mapping لكل page number على الـ frame بتاعه. الـ address بتاع الـ CPU بيتقسم لـ page number p (الـ index في الـ page table) وoffset d، والـ physical = frame × page size + d. الـ Paging بيتجنب الـ external fragmentation بس لسه فيه internal fragmentation.`,
    `الـ Paging بيستخدم pages ثابتة الحجم مش باينة للـ user. الـ address بتاعه (p, d) مع page table فيها frames، وفيه internal fragmentation بس مفيش external. الـ Segmentation بيستخدم segments منطقية أحجامها متغيرة بتطابق نظرة الـ user (main، stack، functions…). الـ address بتاعه (s, d) مع segment table فيها base وlimit، وفيه external fragmentation بس مفيش internal. الـ Segments بتتعملها allocation بـ first/best/worst fit، والـ protection والمشاركة بييجوا طبيعي لكل segment.`
  ],
  quiz: [
    [`صغير أوي.`, `صح. بعد ما الـ 212 يروح الـ 500، أول hole ≥ 112 هو الـ 288 K المتبقي.`, `ده اختيار الـ best-fit.`, `ده اختيار الـ worst-fit.`],
    [`الـ 426 KB لازم يستنى.`, `صح. هو الوحيد اللي بيحط الأربع processes.`, `الـ 426 KB لازم يستنى.`, `لأ.`],
    [`الـ Internal هو مساحة ضايعة جوة block متخصص.`, `صح.`, `مش في المحاضرة دي.`, `لأ.`],
    [`ده المستخدم من آخر page.`, `صح. 72,766 = 35 × 2,048 + 1,086، فآخر frame بيضيّع 2,048 − 1,086 = 962 B.`, `دي أسوأ حالة، مش الحالة دي.`, `لأ.`],
    [`لازم تتشيك على الـ limit الأول: 500 ≥ 100.`, `لأ.`, `صح. الـ offset أكبر من طول الـ segment.`, `لأ.`],
    [`صح. 400 &lt; 580، فـ 1327 + 400 = 1727.`, `ده بيجمع الطول.`, `الـ 400 جوة الـ limit.`, `لأ.`],
    [`نفس الـ addresses.`, `نفس الـ addresses.`, `صح. الـ MMU بيعملهم mapping وقت التشغيل.`, `مش واحدة من التلات schemes.`],
    [`الـ DMA بينقل داتا الـ I/O.`, `صح.`, `الـ dispatcher بيدّي الـ CPU لـ process.`, `لأ.`],
    [`بالعكس.`, `صح.`, `لأ.`, `لأ.`],
    [`ده الـ swap-out بس.`, `صح. 2000 ms out + 2000 ms in = 4000 ms.`, `لأ.`, `لأ.`],
    [`دول الـ offset.`, `صح.`, `لأ.`, `سالب. لأ.`],
    [`لأ.`, `الـ Best-fit بيطلّع أصغر hole متبقي.`, `صح.`, `مش متغطي.`]
  ],
  extra: [
    [`Legal: الشرط base ≤ address، و2000 = base.`, `Legal: 2000 ≤ 2250 &lt; 2500.`, `Legal: ده آخر address قبل base + limit = 2500.`, `صح. الـ addresses الـ legal بتحقق base ≤ address &lt; base + limit = 2500، فـ 2500 برة الـ range وبيعمل trap.`],
    [`الـ logical address بتاع الـ user عمره ما بيتبعت للـ memory زي ما هو؛ قيمة الـ relocation بتتجمع عليه.`, `صح. 250 &lt; 300 (الـ limit)، فـ physical = 250 + 5000 = 5250.`, `الـ limit بيتقارن بالـ logical address (250 &lt; 300)، مش بالـ physical address.`, `ده بيجمع الـ limit، مش الـ offset: physical = logical + relocation.`],
    [`صح. p = 1100 DIV 512 = 2، d = 1100 MOD 512 = 76؛ frame(2) = 7 → 7 × 512 + 76 = 3660.`, `ده أول frame 7. لسه لازم تجمع الـ offset 76.`, `ده بيستخدم frame 5 (الـ frame بتاع page 0). رقم الـ page هو 2، مش 0.`, `مع الـ paging الـ logical address بيتترجم؛ بيساوي الـ physical address بس لو page 2 كانت في frame 2.`],
    [`بالعكس: الـ offset محتاج n = 9 bits عشان يوصل لـ 512 = 2⁹ bytes جوة الـ page.`, `صح. m = 13، n = 9: الـ page number هو الـ m − n = 4 bits العالية (16 page) والـ offset هو الـ 9 bits الواطية.`, `الـ fields الاتنين مع بعض لازم يساووا الـ address اللي 13-bit، فالـ page number بس 13 − 9 bits.`, `الـ offset بيغطي page واحدة بس (2⁹ bytes)، مش الـ address space كله.`],
    [`4 frames بيشيلوا 4,096 bytes بس؛ الـ 904 bytes الباقيين محتاجين frame خامس. وكمان 904 ده الجزء المستخدم من آخر page، مش الضايع.`, `الـ 5 frames صح، بس 904 bytes ده المستخدم من آخر frame. الضايع هو 1,024 − 904.`, `صح. 5,000 = 4 × 1,024 + 904، فـ 5 frames؛ الـ internal fragmentation = 1,024 − 904 = 120 bytes.`, `الـ Paging مافيهوش external fragmentation، بس آخر page غالبًا فيها internal fragmentation.`],
    [`الـ First-fit بيحط 350 → 400، 200 → 250، 300 → 600: الكل اتحط.`, `الـ Best-fit بيحط 350 → 400، 200 → 250، 300 → 600: الكل اتحط.`, `الـ Worst-fit مش بيلاقي hole كبير كفاية للـ process اللي 300 KB.`, `صح. 350 → 600 (فاضل 250)، 200 → 400 (فاضل 200)؛ الـ holes بقت 150، 200، 250، 250، فالـ 300 KB لازم تستنى.`],
    [`رقم الـ segment 4 مش legal: الـ s لازم يبقى &lt; STLR = 4، فده بيعمل trap حتى لو الـ offset صغير.`, `صح. s = 3 &lt; 4 وd = 150 &lt; 200، فـ physical = 900 + 150 = 1050.`, `الـ offset لازم يبقى أقل من الـ limit بالظبط؛ 200 مش &lt; 200، فبيعمل trap.`, `250 ≥ الـ limit 200، فده addressing error.`],
    [`صح. لو مكان الـ memory معروف من الأول، الـ compiler بيطلّع absolute code؛ وتغيير مكان البداية معناه recompile.`, `الـ Load-time binding بيطلّع relocatable code، لأن المكان مش معروف وقت الـ compile.`, `الـ Execution-time binding بيأجل الـ binding لوقت التشغيل، فالـ process ممكن كمان تتنقل وهي شغالة.`, `الـ Dynamic loading معناه تحميل الـ routine بس لما تتنادى؛ مش مرحلة binding بتطلّع absolute code.`],
    [`صح. الـ Compaction بيحرّك الـ processes في الـ memory، وده ممكن بس لما الـ addresses بتاعتها تتعمل bind وقت الـ execution.`, `غلط: مع الـ compile-time أو الـ load-time binding الـ process ماينفعش تتحرك، فالـ compaction مش ممكن.`],
    [`غلط: المحاضرة بتقول إن الـ dynamic loading مش محتاج دعم خاص من الـ OS؛ الـ OS ممكن بس يساعد بإنه يوفر libraries.`, `صح. بيتعمل من خلال تصميم البرنامج: الـ routine بتتحمّل بس لما تتنادى. والـ OS ممكن يساعد بإنه يوفر libraries.`]
  ]
};

AR.os.lectures["5"] = {
  notes: [
    { h: `خلفية: ليه الـ virtual memory`, pts: [
      `الكود لازم يبقى في الـ memory عشان يتنفذ، بس نادرًا ما البرنامج كله بيستخدم (كود الـ errors، routines مش بتتستخدم كتير، data structures كبيرة) ومش كله محتاجينه في نفس الوقت.`,
      `تنفيذ برنامج متحمّل جزء منه بس معناه: البرنامج <b>مابقاش محدود بالـ physical memory</b>؛ كل برنامج بيستخدم memory أقل، فـ <b>برامج أكتر تشتغل في نفس الوقت</b> (↑ الـ CPU utilization والـ throughput من غير ما الـ response أو الـ turnaround time يزيدوا)؛ و<b>I/O أقل</b> للتحميل أو الـ swap، فكل برنامج بيشتغل أسرع.`,
      `الـ <b>Virtual memory</b> = فصل الـ logical memory بتاعة الـ user عن الـ physical memory. جزء بس من البرنامج محتاج يبقى في الـ memory؛ الـ logical address space ممكن يبقى <b>أكبر بكتير من الـ physical address space</b>؛ الـ address spaces ممكن تتشارك بين كذا process؛ إنشاء الـ process بيبقى أكفأ؛ برامج أكتر تشتغل concurrently؛ وI/O أقل للتحميل أو الـ swap.`,
      `الـ <b>Virtual address space</b>: النظرة المنطقية لإزاي الـ process متخزنة، غالبًا بتبدأ من 0 وcontiguous؛ والـ physical memory متنظمة في page frames والـ MMU بيعمل mapping من logical لـ physical.`,
      `بيتعمل عن طريق <b>demand paging</b> أو <b>demand segmentation</b>.`
    ] },
    { h: `الـ Demand paging والـ valid–invalid bit`, pts: [
      `هات الـ page للـ memory <b>بس لما تحتاجها</b>: I/O أقل (مفيش I/O ملوش لازمة)، memory أقل، response أسرع، users أكتر. شبه paging system مع swapping.`,
      `الـ page مطلوبة → اعملها reference: لو <b>reference مش valid → abort</b>؛ لو <b>مش في الـ memory → هاتها للـ memory</b>.`,
      `الـ <b>Lazy swapper</b>: عمره ما بيعمل swap لـ page للـ memory إلا لو هتتحتاج. والـ swapper اللي بيتعامل مع pages اسمه <b>pager</b>.`,
      `لو الـ pages المطلوبة موجودة أصلًا في الـ memory، مفيش فرق عن الـ paging العادي؛ غير كده لازم الـ page تتكشف وتتحمّل من غير ما سلوك البرنامج يتغير أو نحتاج نغير الكود. وده محتاج وظايف جديدة في الـ MMU.`,
      `الـ <b>Valid–invalid bit</b> لكل page-table entry: <b>v</b> = في الـ memory (memory resident)، <b>i</b> = مش في الـ memory. في الأول كل الـ entries بتبقى <b>i</b>. لو الـ MMU لقى <b>i</b> وقت الترجمة، بيحصل <b>page fault</b>.`
    ] },
    { h: `التعامل مع الـ Page fault`, pts: [
      `أول reference لـ page مش موجودة في الـ memory <b>بيعمل trap للـ OS: page fault</b>.`,
      `1) الـ OS بيبص في table تانية عشان يقرر: reference مش valid → abort؛ مجرد مش في الـ memory → كمّل.`,
      `2) دوّر على <b>free frame</b>.`,
      `3) اعمل swap للـ page جوة الـ frame عن طريق disk operation متعملها schedule.`,
      `4) عدّل الـ tables عشان توضح إن الـ page بقت في الـ memory: <b>خلّي الـ validation bit = v</b>.`,
      `5) <b>اعمل restart للـ instruction</b> اللي عملت الـ page fault.`
    ] },
    { h: `مراحل الـ demand paging (أسوأ حالة)`, pts: [
      `1. Trap للـ operating system.`,
      `2. احفظ الـ user registers والـ process state.`,
      `3. حدد إن الـ interrupt كان page fault.`,
      `4. اتأكد إن الـ page reference كان legal وحدد مكان الـ page على الـ disk.`,
      `5. اطلب read من الـ disk لـ free frame: استنى في الـ device queue لحد ما يتخدم؛ استنى الـ seek و/أو الـ latency time بتاع الجهاز؛ ابدأ نقل الـ page للـ free frame.`,
      `6. وإنت مستني، ادّي الـ CPU لـ user تاني.`,
      `7. استلم interrupt من الـ disk I/O subsystem (الـ I/O خلص).`,
      `8. احفظ الـ registers والـ process state بتوع الـ user التاني.`,
      `9. صحّح الـ page table (والـ tables التانية) عشان توضح إن الـ page بقت في الـ memory.`,
      `10. استنى لحد ما الـ CPU يتدّي للـ process دي تاني.`,
      `11. رجّع الـ user registers والـ process state والـ page table الجديدة، وبعدين كمّل الـ instruction اللي اتقاطعت.`
    ] },
    { h: `الـ Page replacement`, pts: [
      `<b>مفيش free frame؟</b> الـ Page replacement: دوّر على page في الـ memory مش مستخدمة فعلًا وطلّعها (page out). عايزين algorithm يدّي <b>أقل عدد page faults</b>. ونفس الـ page ممكن تدخل كذا مرة.`,
      `الـ page replacement الأساسي: (1) لاقي مكان الـ page المطلوبة على الـ disk؛ (2) لاقي free frame: لو فيه واحد استخدمه، غير كده استخدم page-replacement algorithm يختار <b>victim frame</b> و<b>اكتبه على الـ disk لو dirty</b>؛ (3) هات الـ page المطلوبة في الـ frame اللي فضي وحدّث الـ page والـ frame tables؛ (4) اعمل restart للـ instruction اللي عملت الـ trap.`,
      `لاحظ إن دلوقتي ممكن يبقى فيه <b>2 page transfers</b> لكل page fault (out + in).`,
      `الـ <b>Frame-allocation</b> algorithm بيقرر كل process تاخد كام frame وأنهي frames تتبدل؛ والـ <b>page-replacement</b> algorithm عايز أقل page-fault rate في أول access وفي الـ re-access.`,
      `بنقيّم بإننا نشغّل الـ algorithm على <b>reference string</b> (أرقام pages بس) ونعد الـ faults. <b>الـ access المتكرر لـ page موجودة أصلًا في الـ memory مش fault.</b> النتايج بتعتمد على عدد الـ frames. وكل مرة بنملا frame فاضي في الأول بتتحسب fault برضه.`
    ] },
    { h: `الـ FIFO والـ Optimal والـ LRU على string المحاضرة (3 frames)`, pts: [
      `الـ Reference string: <code>7,0,1,2,0,3,0,4,2,3,0,3,0,3,2,1,2,0,1,7,0,1</code>. الجدول بيوضح الـ <b>FIFO</b> (الـ bold = page لسه متحمّلة؛ F = fault).`,
      `الـ <b>FIFO</b>: استبدل الـ page اللي قعدت في الـ memory <b>أطول وقت</b> (بتتابعها بـ FIFO queue) → <b>15 faults</b>.`,
      `الـ <b>Optimal (OPT)</b>: استبدل الـ page اللي <b>مش هتتستخدم لأطول فترة جاية</b> → <b>9 faults</b> (أقل حاجة ممكنة). ماتقدرش تعرف المستقبل، فالـ OPT بيستخدم عشان <b>نقيس</b> الـ algorithms التانية كويسة قد إيه.`,
      `الـ <b>LRU (Least Recently Used)</b>: استخدم الماضي: استبدل الـ page اللي <b>ماتستخدمتش من أطول وقت</b> → <b>12 faults</b>: أحسن من الـ FIFO، وأوحش من الـ OPT؛ algorithm كويس عمومًا وبيستخدم كتير.`,
      `الـ <b>Belady's anomaly</b> (FIFO): مع <code>1,2,3,4,1,2,5,1,2,3,4,5</code>، 3 frames بيدّوا 9 faults بس 4 frames بيدّوا 10. <b>زيادة الـ frames ممكن تعمل page faults أكتر.</b> الـ LRU والـ OPT دول <b>stack algorithms</b> وعمرهم ما بيعانوا منها.`
    ] },
    { h: `جدول الـ Optimal (string المحاضرة، 3 frames)`, pts: [
      `الـ <b>Optimal</b>: 9 faults. عند ref 2 (الـ reference الرابع)، الـ page 7 عمرها ما هتتستخدم تاني، فاستبدل 7. عند ref 3، من بين 2، 0، 1 الـ page اللي هتتستخدم أبعد حاجة في المستقبل هي 1، فاستبدل 1. عند ref 4، من بين 2، 0، 3 الأبعد هي 0، فاستبدل 0.`
    ] },
    { h: `جدول الـ LRU (string المحاضرة، 3 frames)`, pts: [
      `الـ <b>LRU</b>: 12 faults. عند ref 4 (الـ reference التامن)، الـ pages اللي في الـ memory هي 2، 0، 3 وآخر استخدام ليهم: 2 في position 4، 0 في 7، 3 في 6، فاستبدل 2 (الـ least recently used).`
    ] },
    { h: `تنفيذ الـ LRU والـ LRU approximations`, pts: [
      `الـ <b>Counter implementation</b>: كل page entry ليها counter؛ كل ما الـ page تتعملها reference، انسخ الـ clock في الـ counter. عشان تستبدل، دوّر على <b>أصغر قيمة counter</b> (محتاج search في الـ table).`,
      `الـ <b>Stack implementation</b>: احتفظ بـ stack فيه أرقام الـ pages على شكل doubly-linked؛ لما page تتعملها reference، انقلها لفوق (محتاج تغيير 6 pointers). كل update أغلى، بس <b>مفيش search عشان الـ replacement</b> (الـ LRU page في الآخر تحت).`,
      `الـ <b>Reference bit</b>: كل page ليها bit، في الأول 0، بيبقى 1 لما تتعملها reference؛ استبدل أي page الـ bit بتاعها 0 (لو موجودة)، بس مانعرفش الترتيب.`,
      `الـ <b>Second-chance (clock) algorithm</b>: FIFO مع الـ hardware reference bit. لو الـ page اللي هتتبدل الـ bit بتاعها 0، استبدلها؛ لو 1، خليه 0، سيب الـ page في الـ memory وشوف الـ page اللي بعدها بنفس القواعد.`,
      `الـ <b>Counting algorithms</b> بتعد الـ references: الـ <b>LFU</b> (Least Frequently Used) بيستبدل الـ page اللي ليها <b>أصغر count</b>؛ الـ <b>MFU</b> (Most Frequently Used) بيستبدل الـ page اللي ليها أكبر count، على أساس إن الـ page اللي ليها أصغر count غالبًا لسه داخلة ولسه ماتستخدمتش.`
    ] }
  ],
  cards: [
    `فصل الـ logical memory بتاعة الـ user عن الـ physical memory؛ جزء بس من البرنامج محتاج يبقى في الـ memory.`,
    `الـ Demand paging والـ demand segmentation.`,
    `هات الـ page للـ memory بس لما تحتاجها.`,
    `عمره ما بيعمل swap in لـ page إلا لو هتتحتاج؛ والـ swapper اللي بيتعامل مع pages اسمه pager.`,
    `v = الـ page في الـ memory؛ i = مش في الـ memory (في الأول كله i)؛ i وقت الترجمة → page fault.`,
    `Trap للـ OS لما page متعملها reference ماتبقاش في الـ memory.`,
    `اتشيك على الـ reference (abort لو مش valid)، لاقي free frame، اقرا الـ page جوه، خلّي الـ bit = v، اعمل restart للـ instruction.`,
    `الـ frame اللي الـ page replacement اختاره؛ بيتكتب على الـ disk الأول لو dirty.`,
    `استبدل أقدم page في الـ memory.`,
    `استبدل الـ page اللي مش هتتستخدم لأطول وقت في المستقبل؛ أقل faults؛ بيستخدم كـ benchmark.`,
    `استبدل الـ page اللي ماتستخدمتش لأطول وقت في الماضي.`,
    `مع الـ FIFO، frames أكتر ممكن تعمل page faults أكتر (1,2,3,4,1,2,5,1,2,3,4,5: 9 faults بـ 3 frames، و10 بـ 4).`,
    `FIFO 15، OPT 9، LRU 12.`,
    `FIFO + reference bit: الـ bit اللي بـ 1 بيتمسح وبنعدّي عليه؛ اللي بـ 0 بيتبدل.`,
    `الـ LFU بيستبدل أصغر reference count؛ الـ MFU بيستبدل الأكبر.`,
    `Stack doubly-linked؛ انقل الـ page اللي اتعملها reference لفوق (6 pointer changes)؛ مفيش search عن الـ victim.`
  ],
  qa: [
    `البرامج مابقتش محدودة بحجم الـ physical memory، لأن الـ logical address space ممكن يبقى أكبر بكتير. كل برنامج بيستخدم memory أقل، فبرامج أكتر بتشتغل concurrently، وده بيدّي CPU utilization وthroughput أعلى. محتاجين I/O أقل لتحميل أو swap البرامج، فبتشتغل أسرع. الـ address spaces ممكن تتشارك بين الـ processes، وإنشاء الـ process بيبقى أكفأ.`,
    `1 Trap للـ OS. 2 احفظ الـ user registers والـ process state. 3 حدد إن الـ interrupt كان page fault. 4 اتأكد إن الـ reference كان legal ولاقي الـ page على الـ disk. 5 اطلب disk read لـ free frame (استنى في الـ queue، استنى الـ seek/latency، transfer). 6 وإنت مستني، ادّي الـ CPU لـ user تاني. 7 استلم الـ interrupt بتاع إن الـ disk I/O خلص. 8 احفظ الـ registers والـ state بتوع الـ user التاني. 9 صحّح الـ page table عشان توضح إن الـ page في الـ memory. 10 استنى لحد ما الـ CPU يتدّي للـ process دي تاني. 11 رجّع الـ registers والـ state والـ page table الجديدة، وكمّل الـ instruction اللي اتقاطعت.`,
    `الـ FIFO: 15 page faults. الـ Optimal: 9 page faults. الـ LRU: 12 page faults. الـ OPT هو أقل حاجة ممكنة؛ والـ LRU في النص بين الـ FIFO والـ OPT.`,
    `الـ Page replacement: الـ OS بيلاقي الـ page المطلوبة على الـ disk، وبعدين بيستخدم replacement algorithm (FIFO، OPT، LRU…) عشان يختار victim frame. لو الـ victim كان dirty بيتكتب على الـ disk، وبعدين الـ page الجديدة بتتقري جوة الـ frame، والـ page والـ frame tables بيتحدّثوا، والـ instruction اللي عملت الـ fault بتتعملها restart. ممكن يبقى فيه two page transfers لكل fault.`,
    `مع الـ FIFO page replacement، زيادة عدد الـ frames ممكن تزوّد عدد الـ page faults. مع 1,2,3,4,1,2,5,1,2,3,4,5، الـ FIFO بيدّي 9 faults بـ 3 frames و10 بـ 4 frames. الـ stack algorithms زي الـ LRU والـ OPT مابيعانوش منها.`
  ],
  quiz: [
    [`صح.`, `ده الـ LRU.`, `ده الـ Optimal.`, `ده لو كل reference عمل fault.`],
    [`صح. دي أقل حاجة ممكنة.`, `الـ LRU.`, `الـ FIFO.`, `لأ.`],
    [`الـ FIFO.`, `صح.`, `لأ.`, `الـ OPT.`],
    [`صح. شوف حل امتحان 2026 للجدول كامل.`, `ده الـ string الأطول بتاع المحاضرة اللي فيه 22 reference.`, `ده الـ Optimal للـ string ده.`, `ده الـ LRU للـ string ده.`],
    [`الـ FIFO بيستبدل أقدم page.`, `الـ LRU بيبص على الماضي، مش المستقبل.`, `صح.`, `الـ LFU بيستخدم الـ reference counts.`],
    [`لأ.`, `صح.`, `صح، بس دي مش الـ Belady's anomaly.`, `لأ.`],
    [`صح.`, `الـ OS الأول بيتشيك هل الـ reference مش valid ولا مجرد مش في الـ memory.`, `مش متغطي، ومش ده معنى الـ i.`, `لأ.`],
    [`بالعكس.`, `صح. الـ swapper اللي بيتعامل مع pages اسمه pager.`, `لأ.`, `لأ.`],
    [`لأ.`, `صح.`, `لأ.`, `لأ.`],
    [`بس الـ pages اللي الـ bit بتاعها 0 هي اللي بتتبدل.`, `صح.`, `لأ.`, `لأ.`],
    [`صح.`, `بيقلل الـ I/O بس مابيلغيهوش.`, `الـ MMU لازم عشان الـ mapping من logical لـ physical.`, `الـ Demand paging أصلًا معتمد على الـ page faults.`],
    [`صح.`, `ده الـ stack implementation.`, `ده الـ OPT.`, `محتاج clock/counter لكل entry.`]
  ],
  extra: [
    [`ده عدد الـ Optimal للـ string ده.`, `ده عدد الـ LRU. الـ FIFO بيطرد حسب وقت التحميل وبيرمي الـ page 3 قبل ما تتحتاج تاني على طول.`, `ده بيعد كل reference. تاني reference لـ 3 (position 4) ده hit.`, `صح. faults على 1، 3، 0، (3 hit)، 5 (يطرد 1)، 6 (يطرد 3)، 3 (يطرد 0)، 1 (يطرد 5)، 0 (يطرد 6)، 2 (يطرد 3) = 9.`],
    [`صح. 1، 3، 0 faults؛ 3 hit؛ 5 يطرد 1؛ 6 يطرد 0؛ 3 hit؛ 1 يطرد 5؛ 0 يطرد 6؛ 2 يطرد 3 → 8 faults.`, `ده الـ FIFO. الـ LRU بيحتفظ بـ page 3 لأنها اتستخدمت قريب، فالـ reference السابع hit.`, `ده الـ Optimal، اللي بيبص على المستقبل؛ الـ LRU بيستخدم الماضي بس.`, `ده ساب الـ 3 faults بتوع ملو الـ frames الفاضية في الأول. دول بيتحسبوا faults.`],
    [`ده الـ LRU. لما 5 توصل، الـ Optimal بيطرد 0 (اللي هتتستخدم أبعد حاجة في المستقبل)، مش 1.`, `ده الـ FIFO.`, `صح. 1، 3، 0 faults؛ 3 hit؛ 5 يطرد 0 (هتتستخدم في الآخر)؛ 6 يطرد 5 (مش هتتستخدم تاني)؛ 3 و1 hit؛ 0 و2 fault → 7.`, `ده ناسي الملو الأولاني: أول 3 references على frames فاضية faults برضه.`],
    [`الـ bit بتاع A بـ 1، فبتاخد second chance: الـ bit بتاعها بيتمسح وبتفضل.`, `الـ algorithm بيبدأ من أقدم page، وكمان الـ bit بتاع D بـ 1.`, `صح. A وB الـ bit بتاعهم 1، فكل واحد بيتحط 0 ونعدّي عليه؛ C الـ bit بتاعها 0، فبتتبدل.`, `الـ bit بتاع B كمان 1، فهي كمان بتاخد second chance.`],
    [`بالعكس: الـ LFU بيشيل أصغر count والـ MFU الأكبر.`, `صح. الـ MFU بيشيل أكبر count (R = 9)؛ الـ LFU بيشيل أصغر count (Q = 2).`, `الـ LFU بس هو اللي بيختار أصغر count. الـ MFU بيقول إن الـ page اللي ليها أصغر count غالبًا لسه داخلة.`, `الـ MFU بس هو اللي بيختار أكبر count.`],
    [`الترتيب غلط: الـ tables لازم توضح إن الـ page في الـ memory قبل ما الـ instruction تتعملها restart، وإلا هتعمل fault تاني.`, `الـ Abort بيحصل بس لو الـ reference مش valid، وده بيتعرف في step 1.`, `الـ i معناها "مش في الـ memory". بعد التحميل، الـ bit لازم يبقى v.`, `صح. دول steps 4 و5 من التعامل مع الـ page fault في المحاضرة.`],
    [`غلط: المحاضرة بتقول إن الـ LRU والـ OPT دول stack algorithms وعمرهم ما بيعانوا من الـ Belady's anomaly.`, `صح. الـ Belady's anomaly (frames أكتر → faults أكتر) بتأثر على الـ FIFO. الـ LRU والـ OPT stack algorithms ومحصّنين منها.`],
    [`غلط: كل ملو لـ frame فاضي في الأول بيبقى page fault برضه، لأن الـ page ماكانتش في الـ memory.`, `صح. المحاضرة بتعد كل ملو أولاني كـ fault؛ بس الـ access المتكرر لـ page موجودة أصلًا في الـ memory هو اللي مش fault.`],
    [`صح. الـ page اللي اتعملها reference بتتنقل لفوق الـ doubly-linked stack، والـ LRU page دايمًا تحت.`, `ده الـ counter implementation.`, `stack مترتب حسب الاستخدام الأخير ده LRU، مش FIFO؛ الـ FIFO بيرتب حسب وقت التحميل.`, `ده عيب الـ reference bit الواحد.`],
    [`تضييع: stage 6 في المحاضرة بيدّي الـ CPU لـ user تاني وقت الانتظار.`, `صح. Stage 6: وإنت مستني، ادّي الـ CPU لـ user تاني؛ والـ disk interrupt (stage 7) بيقول إنه خلص بعدين.`, `الـ instruction ماينفعش تتعملها restart غير بعد ما الـ page تبقى في الـ memory والـ tables تتصحح.`, `الـ page fault الـ legal حدث عادي؛ الـ process بتكمّل، مش بتتقفل.`]
  ]
};

AR.os.lectures["6"] = {
  notes: [
    { h: `الـ System model والـ 4 necessary conditions`, pts: [
      `السيستم بيتكون من resource types R1، R2، …، Rm (CPU cycles، memory space، I/O devices)؛ كل نوع Ri ليه <b>Wi instances</b>. كل process بتستخدم الـ resource كده: <b>request → use → release</b>.`,
      `الـ Deadlock ممكن يحصل لو <b>الـ 4 شروط اتحققوا مع بعض في نفس الوقت</b>:`,
      `<b>1. Mutual exclusion</b>: process واحدة بس في المرة تقدر تستخدم الـ resource.`,
      `<b>2. Hold and wait</b>: process ماسكة resource واحد على الأقل ومستنية تاخد resources زيادة ماسكاها processes تانية.`,
      `<b>3. No preemption</b>: الـ resource مايتسابش غير بمزاج الـ process اللي ماسكاه، بعد ما تخلّص الـ task بتاعتها.`,
      `<b>4. Circular wait</b>: فيه مجموعة {P0، P1، …، Pn} من الـ processes المستنية بحيث P0 مستنية resource ماسكاه P1، وP1 مستنية P2، …، وPn−1 مستنية Pn، وPn مستنية P0.`
    ] },
    { h: `الـ Resource-allocation graph (RAG)`, pts: [
      `الـ Vertices V متقسمة لـ <b>P</b> = {P1…Pn} (processes، بتترسم دواير) و<b>R</b> = {R1…Rm} (resource types، بتترسم مربعات فيها نقطة لكل instance).`,
      `الـ <b>Request edge</b>: Pi → Rj. الـ <b>Assignment edge</b>: Rj → Pi (من نقطة الـ instance للـ process).`,
      `مثال الـ slide (مفيش deadlock): R1 → P2، R2 → P1 وP2، R3 → P3 (assignments)؛ P1 → R1، P2 → R3 (requests). P3 تقدر تخلص، وبعدين P2، وبعدين P1.`,
      `Graph فيه deadlock: نفس اللي فات، وزيادة P3 → R2. فيه two cycles: P1 → R1 → P2 → R3 → P3 → R2 → P1 وP2 → R3 → P3 → R2 → P2، والـ P1 وP2 وP3 كلهم في deadlock.`,
      `Graph فيه cycle بس <b>مفيش deadlock</b>: P1 → R1 → P3 → R2 → P1، بس الـ instance التاني من R1 ماسكاه P2 والتاني من R2 ماسكاه P4. P2 وP4 يقدروا يسيبوا، فالـ cycle بتتكسر.`,
      `<b>حقائق أساسية</b>: مفيش cycle → <b>مفيش deadlock</b>. فيه cycle و<b>instance واحد بس لكل resource type → deadlock</b>. فيه cycle وكذا instance لكل نوع → <b>احتمال</b> deadlock.`
    ] },
    { h: `طرق التعامل مع الـ deadlocks والـ deadlock prevention`, pts: [
      `نضمن إن السيستم <b>عمره ما</b> يدخل deadlock state: <b>deadlock prevention</b> أو <b>deadlock avoidance</b>.`,
      `نسيب السيستم يدخل deadlock state وبعدين <b>نعمل recover</b> (detection + recovery).`,
      `<b>نتجاهل المشكلة</b> ونعمل نفسنا إن الـ deadlocks عمرها ما بتحصل: ده اللي أغلب الـ operating systems بتعمله، ومنهم UNIX.`,
      `الـ <b>Prevention</b> بيقيّد طرق عمل الـ requests، عشان شرط واحد على الأقل من الأربعة مايتحققش.`
    ] },
    { h: `الـ Deadlock avoidance والـ safe state`, pts: [
      `الـ Avoidance محتاج <b>معلومات مسبقة (a priori)</b>: أبسط موديل، كل process بتعلن <b>أقصى عدد</b> resources من كل نوع ممكن تحتاجه. الـ algorithm بيفحص الـ resource-allocation state ديناميك (available، allocated، maximum demands) عشان عمره ما يبقى فيه circular wait.`,
      `مع كل request، السيستم بيقرر هل الـ allocation الفوري هيسيب السيستم في <b>safe state</b>.`,
      `الـ <b>Safe state</b>: فيه sequence &lt;P1، P2، …، Pn&gt; فيها <b>كل</b> الـ processes بحيث الطلبات الباقية لكل Pi ممكن تتلبى من الـ resources المتاحة دلوقتي + الـ resources اللي ماسكاها كل Pj اللي j &lt; i. لو احتياجات Pi مش متاحة دلوقتي، بتستنى لحد ما كل الـ Pj يخلصوا، وبعدين تاخد الـ resources بتاعتها، تتنفذ، ترجّعها وتخلص، وبعدين Pi+1 تقدر تكمّل.`,
      `<b>Safe → مفيش deadlocks. Unsafe → احتمال deadlock.</b> الـ Avoidance = نضمن إن السيستم عمره ما يدخل unsafe state. (الـ deadlock states جزء من الـ unsafe states.)`,
      `instance واحد لكل resource type → استخدم <b>resource-allocation graph</b> (بـ claim edges). كذا instance → استخدم الـ <b>banker's algorithm</b>.`,
      `الـ <b>Banker's algorithm</b>: كذا instance؛ كل process لازم تعلن من الأول أقصى استخدام ليها؛ الـ process اللي بتطلب ممكن تضطر تستنى؛ والـ process اللي بتاخد كل الـ resources بتاعتها لازم ترجّعها في وقت محدود.`
    ] },
    { h: `الـ data structures والـ algorithms بتوع الـ Banker's`, pts: [
      `n = عدد الـ processes، m = عدد الـ resource types.`,
      `الـ <b>Available</b> [m]: available[j] = k معناها إن فيه k instances من Rj متاحين. الـ <b>Max</b> [n×m]: Pi ممكن تطلب بالكتير k من Rj. الـ <b>Allocation</b> [n×m]: Pi ماسكة دلوقتي k من Rj. الـ <b>Need</b> [n×m]: Pi ممكن تحتاج k زيادة من Rj. <b>Need = Max − Allocation.</b>`,
      `تشيك: Available = إجمالي الـ instances − مجموع كل column في الـ Allocation. استخدمه عشان تتأكد من أي snapshot.`
    ] },
    { h: `مثال Banker's محلول (المحاضرة، وكمان review Q3)`, pts: [
      `5 processes من P0–P4؛ A = 10، B = 5، C = 7 instances. الـ Available = (3, 3, 2).`,
      `لف على P0…P4 أكتر من مرة، واختار أول process الـ Need بتاعها ≤ Work:`,
      `Work (3,3,2): P0 (7,4,3)؟ لأ. <b>P1</b> (1,2,2) ≤ (3,3,2) ✓ → Work = (3,3,2) + (2,0,0) = (5,3,2).`,
      `P2 (6,0,0)؟ لأ (6 &gt; 5). <b>P3</b> (0,1,1) ✓ → (5,3,2) + (2,1,1) = (7,4,3).`,
      `<b>P4</b> (4,3,1) ✓ → (7,4,3) + (0,0,2) = (7,4,5).`,
      `اللفة التانية: <b>P0</b> (7,4,3) ✓ → (7,4,5) + (0,1,0) = (7,5,5). <b>P2</b> (6,0,0) ✓ → (7,5,5) + (3,0,2) = (10,5,7) = الإجماليات ✓.`,
      `كل الـ Finish = true → <b>SAFE</b>، والـ sequence هي <b>&lt;P1, P3, P4, P0, P2&gt;</b> (فيه ترتيبات safe تانية، زي &lt;P1, P3, P0, P2, P4&gt;).`,
      `تمرين زيادة (الكتاب): لو P1 طلبت دلوقتي (1,0,2): الـ Request ≤ Need (1,2,2) ✓ و≤ Available (3,3,2) ✓. نفترض: Available = (2,3,0)، Alloc P1 = (3,0,2)، Need P1 = (0,2,0). الـ Safety لسه بتلاقي &lt;P1, P3, P4, P0, P2&gt;، فالـ request <b>بيتقبل (granted)</b>.`
    ] },
    { h: `الـ Deadlock detection`, pts: [
      `نسيب السيستم يدخل deadlock state، وبعدين نشغّل <b>detection algorithm</b> و<b>recovery scheme</b>.`,
      `<b>instance واحد لكل resource type</b>: احتفظ بـ <b>wait-for graph</b> (الـ nodes هي الـ processes؛ Pi → Pj لو Pi مستنية Pj؛ بنجيبه من الـ RAG بإننا نشيل الـ resource nodes). دوّر على cycle كل فترة: <b>وجود cycle معناه إن فيه deadlock</b>. اكتشاف الـ cycle بياخد <b>O(n²)</b> operations لـ n vertices.`,
      `<b>كذا instance</b>: استخدم Available [m]، Allocation [n×m] و<b>Request</b> [n×m] (الطلبات الحالية). زي الـ safety algorithm بالظبط بفرقين: Finish[i] بتبدأ true لو Allocation_i = 0، وبيستخدم <b>Request_i ≤ Work</b> بدل الـ Need.`,
      `في الآخر، لو Finish[i] == false لأي i، السيستم في <b>deadlock</b>، وكل Pi الـ Finish[i] بتاعها == false في deadlock.`,
      `مثال: A = 7، B = 2، C = 6؛ Available (0,0,0)؛ Allocation P0 010، P1 200، P2 303، P3 211، P4 002؛ Request P0 000، P1 202، P2 000، P3 100، P4 002. الـ Work: P0 → (0,1,0)، P2 → (3,1,3)، P3 → (5,2,4)، P1 → (7,2,4)، P4 → (7,2,6) → الـ sequence <b>&lt;P0, P2, P3, P1, P4&gt;</b>، مفيش deadlock.`,
      `لو P2 طلبت دلوقتي C كمان واحد (Request P2 = 001): P0 تقدر تخلص (Work = 0,1,0)، بس مفيش أي request تاني ينفع يتلبى. <b>فيه deadlock، فيه P1 وP2 وP3 وP4.</b>`,
      `إمتى ونشغّل الـ detection كل قد إيه بيعتمد على الـ deadlock بيحصل قد إيه، وكام process لازم تتعملها roll back (واحدة لكل disjoint cycle). لو شغّلناه بشكل عشوائي ممكن يلاقي cycles كتير ومايقولش أنهي process هي اللي "سببت" الـ deadlock.`
    ] },
    { h: `الـ Recovery من الـ deadlock`, pts: [
      `الـ <b>Process termination</b>: اعمل abort لـ <b>كل</b> الـ processes اللي في deadlock، أو abort لـ <b>process واحدة في المرة</b> لحد ما الـ cycle تتشال.`,
      `ترتيب الـ abort بيراعي: (1) الـ priority بتاع الـ process؛ (2) حسبت قد إيه وفاضلها قد إيه عشان تخلص؛ (3) الـ resources اللي استخدمتها؛ (4) الـ resources اللي محتاجاها عشان تخلص؛ (5) كام process هنحتاج نقفلها؛ (6) هل هي interactive ولا batch.`,
      `الـ <b>Resource preemption</b>: <b>اختيار الـ victim</b> (أقل تكلفة)؛ الـ <b>rollback</b> (نرجع لـ safe state ونعيد تشغيل الـ process من هناك)؛ الـ <b>starvation</b> (نفس الـ process ممكن تتختار victim على طول، فنحط عدد الـ rollbacks في الـ cost factor).`
    ] }
  ],
  cards: [
    `Mutual exclusion، hold and wait، no preemption، circular wait (كلهم مع بعض في نفس الوقت).`,
    `Request، use، release.`,
    `Request: Pi → Rj. Assignment: Rj → Pi.`,
    `مفيش deadlock.`,
    `Deadlock.`,
    `احتمال deadlock.`,
    `Prevent/avoid؛ detect and recover؛ ignore (أغلب الـ OSs ومنهم UNIX).`,
    `ترتيب كامل (total ordering) للـ resource types؛ والطلب يبقى بترتيب تصاعدي.`,
    `Resource utilization واطي؛ والـ starvation ممكنة.`,
    `فيه sequence لكل الـ processes كل واحدة فيها احتياجاتها ممكن تتلبى من الـ available + الـ resources اللي سابتها اللي قبلها.`,
    `Safe → مفيش deadlock. Unsafe → احتمال deadlock.`,
    `Need = Max − Allocation.`,
    `الـ Avoidance مع كذا instance لكل resource type.`,
    `الـ Nodes = processes؛ Pi → Pj لو Pi مستنية Pj؛ وجود cycle معناه deadlock (single instances).`,
    `بيستخدم الـ Request بدل الـ Need؛ وFinish[i] بتبدأ true لو Allocation_i = 0.`,
    `اختيار الـ victim، الـ rollback، الـ starvation.`,
    `&lt;P1, P3, P4, P0, P2&gt;.`
  ],
  qa: [
    `الـ Mutual exclusion: process واحدة بس في المرة تقدر تستخدم الـ resource. الـ Hold and wait: process ماسكة resource واحد على الأقل ومستنية أكتر ماسكاها processes تانية. الـ No preemption: الـ resources مابتتسابش غير بمزاج الـ process بعد ما الـ task تخلص. الـ Circular wait: مجموعة {P0…Pn} كل واحدة مستنية resource ماسكاه اللي بعدها وPn مستنية P0. الأربعة لازم يتحققوا مع بعض في نفس الوقت.`,
    `نضمن إن شرط من الأربعة عمره ما يتحقق. الـ Mutual exclusion: استخدم resources ينفع تتشارك على قد ما تقدر (read-only files)، مع إنه لازم يتحقق للـ resources اللي ماينفعش تتشارك. الـ Hold and wait: اطلب كل الـ resources قبل ما تبدأ، أو اطلب بس وإنت مش ماسك حاجة (utilization واطي، starvation). الـ No preemption: الـ process اللي مش قادرة تاخد resource جديد بتسيب كل الـ resources اللي ماسكاها. الـ Circular wait: اعمل ترتيب كامل للـ resource types واطلب بترتيب تصاعدي (زي tape = 1، disk = 5، printer = 12).`,
    `Need = Max − Allocation: P0 7 4 3، P1 1 2 2، P2 6 0 0، P3 0 1 1، P4 4 3 1. Work 332 → P1 (532) → P3 (743) → P4 (745) → P0 (755) → P2 (10 5 7). الكل خلص، فالسيستم safe والـ sequence هي &lt;P1, P3, P4, P0, P2&gt;.`,
    `الـ Prevention بيقيّد طريقة عمل الـ requests عشان شرط من الأربعة عمره ما يتحقق؛ وهو static وممكن يضيّع resources. الـ Avoidance بيستخدم الـ maximum claims اللي متعلنة من الأول وبيوافق على الـ request بس لو الـ state اللي هتنتج safe (banker's algorithm أو RAG بـ claim edges). الـ Detection بيسيب الـ deadlocks تحصل، ويشغّل wait-for graph أو detection algorithm كل فترة، وبعدين يعمل recover بالـ termination أو الـ resource preemption.`,
    `الـ Process termination: اعمل abort لكل الـ processes اللي في deadlock، أو واحدة واحدة لحد ما الـ cycle تتكسر، وبنختار حسب الـ priority، الوقت اللي حسبته والباقي، الـ resources المستخدمة والمطلوبة، عدد الـ processes، وinteractive ولا batch. الـ Resource preemption: اختار victim بأقل تكلفة، اعمله roll back لـ safe state وشغّله من الأول، وامنع الـ starvation بإنك تحسب الـ rollbacks في الـ cost.`
  ],
  quiz: [
    [`ده شرط.`, `ده شرط.`, `الاختيار الصح. الشرط هو NO preemption.`, `ده شرط.`],
    [`لأ.`, `صح.`, `دي الحالة لما يبقى فيه كذا instance.`, `لأ.`],
    [`لأ.`, `صح.`, `لأ.`, `سالب. لأ.`],
    [`7 &gt; 3.`, `صح. (1,2,2) ≤ (3,3,2).`, `6 &gt; 3.`, `4 &gt; 3.`],
    [`الـ Unsafe معناها إن الـ deadlock ممكن، مش أكيد.`, `صح.`, `ده وصف الـ safe state.`, `لأ.`],
    [`لأ.`, `لأ.`, `لأ.`, `صح.`],
    [`لأ.`, `غالي أوي على الـ OSs العامة.`, `صح. بيعملوا نفسهم إن الـ deadlocks عمرها ما بتحصل.`, `لأ.`],
    [`ده للـ avoidance مع كذا instance.`, `صح. الـ cycle معناها deadlock؛ والـ detection بياخد O(n²).`, `لأ.`, `لأ.`],
    [`صح.`, `لأ.`, `لأ.`, `فيه عيوب.`],
    [`لأ، بيعتمد على الـ allocation.`, `صح. الـ process اللي مش ماسكة حاجة ماينفعش تبقى جزء من deadlock.`, `ده بيتشيك عليه جوة الـ loop.`, `لأ.`],
    [`دي مشكلة.`, `دي مشكلة.`, `دي مشكلة.`, `الاختيار الصح. الـ Compaction مفهوم من الـ memory management.`]
  ],
  extra: [
    [`ده بيجمع الـ Allocation على الـ Max. الـ Need = Max − Allocation.`, `صح. (4, 1, 3) − (0, 1, 1) = (4, 0, 2).`, `ده الـ Max بتاع P2. هي ماسكة أصلًا (0, 1, 1)، ولازم يتطرح.`, `الطرح معكوس (Allocation − Max).`],
    [`ده مجموع columns الـ Allocation. الـ Available = Total − المجموع ده.`, `دي الإجماليات؛ فيه instances متخصصة أصلًا.`, `صح. (6, 4, 5) − (4, 3, 2) = (2, 1, 3).`, `ده الـ Need بتاع P0، مش الـ Available vector.`],
    [`P0 ماينفعش تبدأ: محتاجة 2 من B والمتاح 1 بس.`, `P2 ماينفعش تبدأ: محتاجة 4 من A والمتاح 2 بس.`, `P3 ماينفعش تبدأ: محتاجة 2 من B والمتاح 1 بس.`, `صح. P1 → Work (4, 2, 3)؛ P2 → (4, 3, 4)؛ P3 → (5, 4, 4)؛ P0 → (6, 4, 5). الكل خلص، فالـ state safe.`],
    [`الشروط دي بتعدّي، بس الـ state المفترضة لازم تبقى safe كمان، وهي مش safe.`, `الـ Request (1, 1, 0) ≤ Need (2, 2, 1)، فمش بيعدّي الـ claim.`, `صح. نفترض: Available (1, 0, 3)، Need P0 (1, 1, 1). مع B = 0، مفيش process (P0 وP1 وP3 كلهم محتاجين B؛ P2 محتاجة 4 A) تقدر تخلص، فالـ state القديمة بترجع وP0 بتستنى.`, `الـ Safety لازم تتشيك على الـ state الجديدة بعد الـ allocation المفترض، مش القديمة.`],
    [`صح. P2 مش طالبة حاجة → Work (1, 1)؛ P0 (0, 1) ✓ → (2, 1)؛ P1 (1, 0) ✓ → (3, 2). كل الـ Finish = true.`, `كانوا هيتزنقوا بس لو P2 عمرها ما سابت الـ resources بتاعتها؛ الـ request بتاع P2 هو (0, 0)، فهي بتخلص الأول.`, `الـ Available = 0 مش معناه deadlock: الـ process اللي Request ≤ Work بتاعها (P2) لسه تقدر تخلص وتسيب.`, `P2 مش محتاجة حاجة زيادة، فهي أول واحدة تخلص.`],
    [`غلط: ده بس لو فيه instance واحد لكل resource type. مع كذا instance الـ cycle معناها احتمال بس (مثال P2/P4 في المحاضرة).`, `صح. الـ cycle مع كذا instance لكل نوع معناها إن الـ deadlock ممكن بس؛ زي إن P2 وP4 يقدروا يسيبوا ويكسروا الـ cycle.`],
    [`F(tape) = 1 &lt; 5. الطلبات لازم تبقى بترتيب تصاعدي، فماينفعش تطلب الـ tape وهي ماسكة الـ disk.`, `جزء الـ tape لسه بيكسر الترتيب التصاعدي.`, `كده الـ circular wait مش هيتمنع. الطلبات لازم تمشي على الـ total ordering.`, `صح. F(printer) = 12 &gt; F(disk) = 5، فالطلب بترتيب الـ enumeration التصاعدي.`],
    [`صح. المحاضرة بتحصر الطريقة دي في الـ resources دي.`, `إنك تاخد printer في نص الـ job ماينفعش يترجع بشكل نضيف؛ الـ state بتاعته مش سهل تتحفظ.`, `الـ Read-only files ينفع تتشارك، وده تبع الـ mutual exclusion، مش الـ preemption.`, `المحاضرة بتحصرها في الـ resources اللي الـ state بتاعتها ينفع تتحفظ وترجع.`],
    [`صح. المحاضرة بتدّي O(n²) لاكتشاف الـ cycle في الـ wait-for graph (instance واحد لكل resource type).`, `غلط: المحاضرة بتقول إن اكتشاف الـ cycle محتاج O(n²) operations لـ n vertices.`],
    [`ده الـ recovery بالـ process termination، مش حل لـ starvation الـ victim.`, `الـ Rollback مسألة منفصلة؛ مابيمنعش إن نفس الـ victim يتختار تاني.`, `صح. حساب عدد الـ rollbacks في الـ cost بيمنع نفس الـ process من الـ starvation.`, `الـ Aging هو حل الـ starvation في الـ CPU scheduling (Lecture 3)، مش الحل اللي اتقال لاختيار الـ victim.`]
  ]
};

AR.os.lectures["7"] = {
  notes: [
    { h: `مفهوم الـ File، الـ attributes والـ operations`, pts: [
      `الـ file هو <b>contiguous logical address space</b>. أنواعه: <b>data</b> (numeric، character، binary) و<b>program</b>. المحتوى بيحدده اللي عمل الـ file (text file، source file، executable file…).`,
      `الـ <b>Attributes</b>: الـ <b>Name</b> (المعلومة الوحيدة اللي بتتحفظ بشكل البني آدم يقدر يقراه)؛ الـ <b>Identifier</b> (tag/رقم مميز جوة الـ file system)؛ الـ <b>Type</b>؛ الـ <b>Location</b> (pointer لمكان الـ file على الجهاز)؛ الـ <b>Size</b>؛ الـ <b>Protection</b> (مين يقدر يقرا، يكتب، ينفذ)؛ الـ <b>Time، date وuser identification</b> (للـ protection والـ security ومتابعة الاستخدام). والـ extended attributes فيها حاجات زي الـ file checksum.`,
      `المعلومات عن الـ files بتتحفظ في الـ <b>directory structure</b>، اللي متخزن على الـ disk.`,
      `الـ <b>Operations</b>: create؛ write (عند الـ write pointer)؛ read (عند الـ read pointer)؛ reposition جوة الـ file (<b>seek</b>)؛ delete؛ truncate؛ <b>open(Fi)</b>: دوّر في الـ directory على الـ disk على الـ entry Fi وانقل محتواه للـ memory؛ <b>close(Fi)</b>: انقل محتوى الـ entry Fi اللي في الـ memory ورجّعه للـ directory على الـ disk.`
    ] },
    { h: `الـ Open files، أنواع الـ files وهيكل الـ file`, pts: [
      `الداتا المطلوبة عشان ندير الـ open files: الـ <b>open-file table</b> (بتتابع الـ files المفتوحة)؛ الـ <b>file pointer</b> (آخر مكان read/write، لكل process)؛ الـ <b>file-open count</b> (عدد مرات فتح الـ file، عشان الـ entry بتاعه يتشال لما آخر process تقفله)؛ الـ <b>access rights</b> (معلومات الـ access-mode لكل process).`,
      `أنواع الـ files حسب الـ extension: executable (exe، com، bin)؛ object (obj، o)؛ source code (c، cc، java، asm…)؛ batch (bat، sh)؛ text (txt، doc)؛ word processor (wp، tex، rtf، doc)؛ library (lib، a، so، dll)؛ print or view (ps، pdf، jpg)؛ archive (arc، zip، tar)؛ multimedia (mpeg، mov، mp3، mp4، avi).`,
      `الـ <b>File structure</b>: none (سلسلة words أو bytes)؛ simple record structure (lines، fixed length، variable length)؛ complex structures (formatted document، relocatable load file). اللي بيحدده يا الـ <b>operating system</b> يا الـ <b>program</b>.`
    ] },
    { h: `الـ Access methods`, pts: [
      `الـ <b>Sequential access</b> (موديل الـ tape: البداية، المكان الحالي، النهاية): read next، write next، reset، مفيش read بعد آخر write (rewrite).`,
      `الـ <b>Direct access</b>: الـ file عبارة عن logical records ثابتة الطول: read n، write n، position to n، read next، write next، rewrite n، حيث <b>n = relative block number</b>. الـ relative block numbers بتخلي الـ OS يقرر الـ file يتحط فين.`,
      `محاكاة الـ sequential access على direct-access file بـ current position <b>cp</b>: reset → cp = 0؛ read next → read cp؛ cp = cp + 1؛ write next → write cp؛ cp = cp + 1.`
    ] },
    { h: `الـ Directory structure`, pts: [
      `الـ directory مجموعة nodes فيها معلومات عن كل الـ files. <b>الـ directory structure والـ files الاتنين موجودين على الـ disk.</b>`,
      `الـ Operations: search عن file، create file، delete file، list directory، rename file، traverse الـ file system.`,
      `أهداف التنظيم: الـ <b>Efficiency</b> (تلاقي الـ file بسرعة)؛ الـ <b>Naming</b> (مريح للـ users: اتنين users ممكن يستخدموا نفس الاسم لـ files مختلفة، والـ file الواحد ممكن يبقى ليه كذا اسم)؛ الـ <b>Grouping</b> (تجميع منطقي حسب الخصائص، زي كل برامج الـ Java، كل الـ games).`,
      `الـ <b>Tree-structured</b>: search efficient، إمكانية grouping، current (working) directory (زي <code>cd /spell/mail/prog</code>)؛ path names يا absolute يا relative؛ الـ files والـ subdirectories الجديدة بتتعمل في الـ current directory (<code>rm &lt;file-name&gt;</code>، <code>mkdir &lt;dir-name&gt;</code>؛ زي في /mail: <code>mkdir count</code>). مسح "mail" بيمسح الـ subtree كله اللي جذره mail.`
    ] },
    { h: `الـ File sharing والـ protection`, pts: [
      `المشاركة في الـ multi-user systems حاجة مرغوبة وممكن تتعمل عن طريق <b>protection scheme</b>. في الـ distributed systems الـ files بتتشارك على network؛ والـ <b>NFS (Network File System)</b> طريقة مشهورة للـ distributed file-sharing.`,
      `الـ <b>User IDs</b> بتعرّف الـ users، فينفع نحط permissions لكل user؛ الـ <b>group IDs</b> بتحط الـ users في groups ليها group access rights. كل file أو directory ليه <b>owner</b> و<b>group</b>.`,
      `الـ owner/creator بيتحكم في <b>إيه اللي يتعمل ومين يعمله</b>. أنواع الـ access: <b>read، write، execute، append، delete، list</b>.`,
      `في UNIX/Linux: الـ modes هي read، write، execute لـ 3 classes: <b>owner</b>، <b>group</b>، <b>public</b>. مثال: owner 7 = RWX 111، group 6 = RW- 110، public 1 = --X 001 → <code>chmod 761 game</code>. اطلب من الـ manager يعمل group (زي G)، يضيف الـ users، وبعدين ظبط الـ access بتاع الـ file. الـ Windows بيستخدم access-control lists (full control، modify، read &amp; execute، read، write).`
    ] },
    { h: `تنفيذ الـ File-system: الهيكل وتنفيذ الـ directory`, pts: [
      `الـ <b>file</b> وحدة تخزين منطقية، مجموعة معلومات مرتبطة ببعض. الـ file system موجود على الـ secondary storage (disks)؛ بيوفر الـ user interface للـ storage (mapping من logical لـ physical) وaccess efficient ومريح (store، locate، retrieve).`,
      `الـ Disks بتوفر in-place rewrite وrandom access؛ والـ I/O بيتعمل في <b>blocks of sectors</b> (غالبًا 512 bytes).`,
      `الـ <b>File control block (FCB)</b>: storage structure فيه معلومات عن الـ file. الـ <b>device driver</b> بيتحكم في الجهاز الـ physical.`,
      `الـ <b>Linear list</b> فيها أسامي الـ files مع pointers للـ data blocks: سهلة في البرمجة بس بتاخد وقت (linear search)؛ ممكن نخليها sorted بـ linked list أو B+ tree.`,
      `الـ <b>Hash table</b>: linear list + hash structure → بتقلل وقت الـ search في الـ directory؛ فيه <b>collisions</b> (اسمين بيروحوا لنفس المكان بعد الـ hash)؛ كويسة بس لو الـ entries ثابتة الحجم، أو استخدم الـ chained-overflow method.`
    ] },
    { h: `الـ Allocation methods: contiguous، linked، FAT، indexed`, pts: [
      `الـ allocation method هي إزاي الـ disk blocks بتتخصص للـ files: <b>contiguous، linked، indexed</b>.`,
      `الـ <b>Contiguous</b>: كل file بياخد مجموعة blocks ورا بعض. أحسن performance في أغلب الحالات؛ بسيط، لأننا محتاجين بس <b>الـ starting block والـ length</b> (مثال directory: count 0/2، tr 14/3، mail 19/6، list 28/4، f 6/2). المشاكل: إيجاد مساحة، معرفة حجم الـ file مقدمًا، <b>external fragmentation</b>، والحاجة لـ compaction (off-line أو on-line).`,
      `الـ <b>Linked</b>: كل file عبارة عن linked list من blocks متفرقة في أي حتة على الـ disk؛ كل block فيه pointer للي بعده؛ الـ file بيخلص عند null pointer؛ والـ directory فيه البداية والنهاية (زي jeep: start 9، end 25، chain 9 → 16 → 1 → 10 → 25). <b>المميزات</b>: مفيش external fragmentation، مفيش compaction، مش محتاج تعلن الحجم وقت الإنشاء. <b>العيوب</b>: الـ reliability (pointers تضيع أو تبوظ)؛ الوصول لـ block ممكن ياخد I/Os وseeks كتير (مفيش direct access efficient)؛ ومحتاجين مساحة للـ pointers.`,
      `الـ <b>FAT (File-Allocation Table)</b>: نوع من الـ linked allocation بيحط الـ links في table في أول الـ volume. الـ directory entry "test" فيه start block 217؛ FAT[217] = 618، FAT[618] = 339، FAT[339] = −1 (نهاية الـ file).`,
      `الـ <b>Indexed</b>: كل file ليه <b>index block(s)</b> خاص بيه فيه pointers للـ data blocks بتاعته (زي الـ index block 19 بتاع jeep فيه 9، 16، 1، 10، 25، −1…). بيدعم <b>random (direct) access</b> وdynamic access <b>من غير external fragmentation</b>، بس فيه <b>overhead الـ index block</b>. file أقصاه 256 KB بـ blocks حجمها 512-byte → 512 block → محتاجين <b>index block واحد</b> بس. لو طول الـ file مش محدود استخدم <b>linked scheme</b> (اربط blocks الـ index table ببعض، من غير حد للحجم).`
    ] }
  ],
  cards: [
    `Contiguous logical address space؛ مجموعة معلومات مرتبطة ليها اسم على الـ secondary storage.`,
    `Name، identifier، type، location، size، protection، time/date/user identification.`,
    `الـ Name.`,
    `Open: دوّر في الـ directory وانقل الـ entry Fi للـ memory. Close: رجّعه للـ directory على الـ disk.`,
    `Open-file table، file pointer، file-open count، access rights.`,
    `Sequential: read/write next، reset. Direct: read n / write n بالـ relative block number.`,
    `Efficiency، naming، grouping.`,
    `مشكلة الـ naming (أسامي unique) ومشكلة الـ grouping.`,
    `directory منفصل لكل user؛ نفس الأسامي مسموحة؛ search efficient؛ مفيش grouping.`,
    `Owner RWX (7)، group RW (6)، public X (1).`,
    `Read، write، execute، append، delete، list.`,
    `Storage structure فيه معلومات عن الـ file.`,
    `الـ Collisions؛ محتاج entries ثابتة الحجم أو chained overflow.`,
    `Contiguous، linked، indexed.`,
    `External fragmentation؛ لازم تعرف حجم الـ file؛ إيجاد مساحة.`,
    `+ مفيش external fragmentation، مش محتاج الحجم. − الـ reliability، access بطيء، مساحة للـ pointers.`,
    `Linked allocation والـ links بتاعة الـ block اللي بعده محفوظة في table (−1 = نهاية الـ file).`,
    `كل file ليه index block فيه pointers؛ random access، مفيش external fragmentation، overhead للـ index.`
  ],
  qa: [
    `الـ Name (المعلومة الوحيدة اللي البني آدم يقدر يقراها)، الـ identifier (رقم مميز جوة الـ file system)، الـ type، الـ location (pointer لمكان الجهاز)، الـ size، الـ protection (مين يقدر يقرا أو يكتب أو ينفذ)، والـ time والـ date والـ user identification (للـ protection والـ security ومتابعة الاستخدام). وبيتحفظوا في الـ directory structure على الـ disk.`,
    `Create، write (عند الـ write pointer)، read (عند الـ read pointer)، reposition جوة الـ file (seek)، delete، truncate، open(Fi) (دوّر في الـ directory على الـ disk وانقل الـ entry للـ memory) وclose(Fi) (رجّع الـ entry للـ directory على الـ disk).`,
    `الـ Single-level: directory واحد لكل الـ users. بسيط، بس فيه مشكلة naming (كل أسامي الـ files لازم تبقى unique) ومشكلة grouping. الـ Two-level: directory منفصل لكل user. الـ users المختلفين يقدروا يستخدموا نفس اسم الـ file (الـ path name هو اللي بيحدد الـ file) والـ search efficient، بس لسه مفيش إمكانية grouping.`,
    `الـ Linked: كل file عبارة عن linked list من disk blocks ممكن تبقى متفرقة في أي حتة. كل block بيشاور على اللي بعده، والـ directory فيه أول (وآخر) block، والـ file بيخلص عند null pointer. مافيهوش external fragmentation، ومش محتاج compaction ولا حجم معلن، بس مش reliable لو pointer ضاع، والـ direct access بطيء (I/Os وseeks كتير)، والـ pointers بتاخد مساحة. الـ FAT نوع منه والـ links محفوظة في table. الـ Indexed: كل file ليه index block خاص بيه فيه pointers لكل الـ data blocks بتاعته، والـ directory بيشاور على الـ index block. بيدعم random access من غير external fragmentation، بس كل file عليه overhead الـ index block. الـ files الكبيرة بتستخدم linked scheme من الـ index blocks.`,
    `كل file بياخد مجموعة disk blocks ورا بعض، والـ directory بيخزن بس الـ starting block والـ length. بسيط وبيدّي أحسن performance (sequential وdirect access سريعين). مشاكله: إيجاد مساحة لـ file جديد، معرفة حجم الـ file مقدمًا، والـ external fragmentation، اللي محتاجة compaction يا off-line يا on-line.`
  ],
  quiz: [
    [`رقم، مش البني آدم يقدر يقراه.`, `صح.`, `pointer.`, `معلومات access-control.`],
    [`صح. الـ files محتاجة blocks ورا بعض.`, `لأ. أي free block ينفع يتستخدم.`, `لأ.`, `الـ FAT ده linked allocation.`],
    [`الـ Linked مافيهوش لا ده ولا ده.`, `صح.`, `الـ Linked مش محتاجه.`, `ده الـ indexed allocation.`],
    [`الـ free blocks بتتعلّم بـ 0.`, `صح. الـ −1 بتعلّم نهاية الـ file.`, `لأ.`, `البداية في الـ directory entry (217 في المثال).`],
    [`ده الـ owner (7).`, `صح. 6 = 110 = RW-.`, `ده الـ public (1).`, `لأ.`],
    [`صح.`, `مش دي المشاكل المذكورة.`, `دي مشكلة allocation.`, `مفيش paths أصلًا.`],
    [`بالعكس.`, `صح.`, `لأ.`, `لأ.`],
    [`الـ Sequential بيستخدم read next / write next.`, `صح.`, `مش في المحاضرة دي.`, `الـ Linked ده allocation method.`],
    [`صح.`, `ده memory management.`, `لأ.`, `لأ.`],
    [`صح. 256 KB / 512 B = 512 data block، والـ pointers بتاعتهم بتكفي في index block واحد.`, `لأ.`, `ده عدد الـ data blocks.`, `لأ.`]
  ],
  extra: [
    [`ده 7 = 111، صلاحيات الـ owner.`, `ده 4 = 100، صلاحيات الـ public.`, `صح. الـ Group = 5 = 101 = R-X.`, `ده كان هيبقى 6 = 110، بس رقم الـ group هنا 5.`],
    [`صح. الـ Owner RW- = 110 = 6، الـ group R-- = 100 = 4، الـ public --- = 000 = 0.`, `الـ 2 = 010 يعني write بس، مش read بس، للـ group.`, `الأرقام بترتيب owner، group، public؛ هنا الـ owner والـ group متبدلين.`, `الـ 7 بيدّي الـ owner execute كمان، والـ 5 بيدّي الـ group execute.`],
    [`غلط بواحد: الـ blocks هي 20، 21، 22، 23، 24، فـ 24 هو الـ block الخامس (الأخير).`, `ده مكان الـ block جوة الـ file. لازم يتجمع على الـ start block.`, `الـ 25 بعد نهاية الـ file (start + length).`, `صح. الـ file واخد 20–24؛ الـ block الرابع هو start + 3 = 23. والـ direct access السهل ده هو سبب إن الـ contiguous allocation الـ performance بتاعه كويس.`],
    [`الـ chain مابتقفش عند 12: الـ FAT[12] بيشاور على block 3.`, `صح. امشي ورا الـ links من الـ start block؛ الـ −1 بيعلّم نهاية الـ file عند block 3.`, `الـ −1 علامة نهاية الـ file، مش block.`, `الـ FAT نوع من الـ linked allocation؛ الـ blocks ممكن تبقى متفرقة في أي حتة.`],
    [`بيقرا عند المكان الحالي قبل ما يزوّد الـ cp.`, `الـ read next كمان بيعمل cp = cp + 1.`, `الـ cp = 0 ده شغل الـ reset، مش الـ read next.`, `صح. read next → read cp؛ cp = cp + 1.`],
    [`صح. ده تعريف المحاضرة؛ والـ close(F<sub>i</sub>) بترجّع الـ entry اللي في الـ memory للـ directory على الـ disk.`, `الـ open بتجيب الـ directory entry، مش كل داتا الـ file.`, `ده الـ close(F<sub>i</sub>).`, `ده الـ create operation.`],
    [`ده الـ file pointer.`, `دي معلومات الـ access-rights.`, `صح. لما العدد يوصل صفر، الـ entry ممكن يتشال من الـ open-file table.`, `دي معلومات حجم/مكان الـ file، مش داتا الـ open-file.`],
    [`العكس: الـ naming اتحل والـ grouping لأ.`, `صح. الـ files بتتعنون كـ user/file، فالأسامي لازم تبقى unique لكل user بس؛ والـ grouping محتاج tree structure.`, `الـ user لسه مايقدرش يعمل grouping للـ files بتاعته؛ ده محتاج tree-structured directory.`, `الـ search بيبقى efficient، ومشكلة الـ naming بين الـ users بتتحل.`],
    [`صح. المحاضرة بتقول إن مسح "mail" بيمسح الـ subtree كله اللي جذره mail.`, `غلط: في مثال الـ tree في المحاضرة، مسح الـ directory بيشيل كل اللي تحته.`],
    [`غلط: معرفة الحجم مقدمًا دي مشكلة الـ contiguous allocation. الـ Linked files بتكبر block block.`, `صح. الـ Linked allocation مافيهوش external fragmentation، ومش محتاج compaction ومش محتاج الحجم وقت الإنشاء.`]
  ]
};

AR.os.lectures["8"] = {
  notes: [
    { h: `نظرة عامة والـ I/O hardware`, pts: [
      `إدارة الـ I/O <b>جزء أساسي</b> من تصميم وتشغيل الـ OS: الـ I/O devices مختلفة جدًا عن بعض، فيه طرق كتير للتحكم فيها، الـ performance لازم يتدار، وأنواع أجهزة جديدة بتظهر كتير.`,
      `الـ Ports والـ buses والـ device controllers هي اللي بتوصّل الأجهزة. الـ <b>Device drivers</b> بتخبي تفاصيل الجهاز وبتدّي interface موحد للـ I/O subsystem عشان يوصل للأجهزة.`,
      `أنواع الأجهزة: <b>storage، transmission، human-interface</b>.`,
      `الـ <b>Port</b>: نقطة توصيل للجهاز. الـ <b>Bus</b>: shared direct access (<b>PCI</b>، منتشر في الـ PCs والـ servers؛ PCI Express، PCIe؛ والـ <b>expansion bus</b> بيوصّل أجهزة بطيئة نسبيًا زي الـ keyboard والـ serial/parallel ports). الـ <b>Controller (host adapter)</b>: إلكترونيات بتشغّل الـ port أو الـ bus أو الجهاز؛ ساعات بيبقى integrated، وساعات circuit board منفصلة؛ وفيه processor، microcode، private memory، bus controller، إلخ.`,
      `رسمة الـ PC bus النموذجية: processor + cache → bridge/memory controller → memory؛ الـ PCI bus بيوصّل الـ graphics controller (monitor)، الـ SCSI controller (disks)، الـ IDE disk controller (disks) والـ expansion bus interface (keyboard، parallel وserial ports).`
    ] },
    { h: `الـ Device registers، الـ addressing والـ polling`, pts: [
      `الـ I/O instructions بتتحكم في الأجهزة. الأجهزة ليها registers الـ driver بيحط فيها commands وaddresses وdata: registers الـ <b>data-in، data-out، status، control</b> (غالبًا 1–4 bytes، أو FIFO buffer).`,
      `الأجهزة ليها addresses، بتستخدمها <b>direct I/O instructions</b> أو <b>memory-mapped I/O</b> (الـ data والـ command registers بتاعة الجهاز بتتعمل mapping في الـ address space بتاع الـ processor، خصوصًا للـ address spaces الكبيرة زي الـ graphics).`,
      `الـ PC I/O port ranges (جزء منها): 000–00F DMA controller؛ 020–021 interrupt controller؛ 040–043 timer؛ 200–20F game controller؛ 2F8–2FF serial port (secondary)؛ 320–32F hard-disk controller؛ 378–37F parallel port؛ 3D0–3DF graphics controller؛ 3F0–3F7 diskette-drive controller؛ 3F8–3FF serial port (primary).`,
      `<b>الـ Polling (handshaking) لكل byte</b>: (1) الـ host بيقرا الـ <b>busy bit</b> من الـ status register لحد ما يبقى 0؛ (2) الـ host بيظبط الـ read أو الـ write bit، ولو write بينسخ الداتا في الـ data-out؛ (3) الـ host بيظبط <b>command-ready</b>؛ (4) الـ controller بيظبط الـ busy وينفذ النقل؛ (5) الـ controller بيمسح الـ busy والـ error والـ command-ready لما النقل يخلص.`,
      `الخطوة 1 دي <b>busy-wait cycle</b>: معقولة لو الجهاز سريع، بس <b>مش efficient لو الجهاز بطيء</b> (الـ CPU كان ممكن يحوّل لـ tasks تانية).`
    ] },
    { h: `الـ Interrupts`, pts: [
      `ساعات بيبقى أكفأ إن الـ controller <b>يبلّغ الـ CPU</b> لما الجهاز يبقى جاهز. الـ Interrupts بتخلي الجهاز يبلّغ الـ CPU بأي event.`,
      `الـ CPU فيه سلك، اسمه <b>Interrupt Request Line (IRL)</b>، بيحس بيه <b>بعد تنفيذ كل instruction</b>. لما controller يبعت signal عليه، الـ CPU بيعمل <b>state save</b> وينط للـ <b>interrupt-handler routine</b> عند address ثابت.`,
      `الـ interrupt handler بيحدد السبب، يعمل الـ processing المطلوب، يعمل <b>state restore</b>، وينفذ return-from-interrupt instruction عشان يرجّع الـ CPU لحالته اللي كان فيها.`,
      `الـ <b>Interrupt-driven I/O cycle</b>: 1 الـ device driver بيبدأ الـ I/O → 2 الـ I/O controller بيبدأ الـ I/O → 3 الـ input جاهز، الـ output خلص أو حصل error: الـ controller بيطلّع interrupt signal → 4 الـ CPU، وهو بيتشيك بين الـ instructions، بيستلم الـ interrupt وينقل التحكم للـ handler → 5 الـ handler بيعالج الداتا ويرجع من الـ interrupt → 6 الـ CPU بيكمّل الـ task اللي اتقاطعت → 7 (بيلف تاني والـ CPU شغال).`,
      `<b>الـ Intel Pentium event-vector table</b>: 0 divide error، 1 debug exception، 2 null interrupt، 3 breakpoint، 4 INTO-detected overflow، 5 bound range exception، 6 invalid opcode، 7 device not available، 8 double fault، 9 coprocessor segment overrun، 10 invalid task state segment، 11 segment not present، 12 stack fault، 13 general protection، 14 <b>page fault</b>، 15 reserved، 16 floating-point error، 17 alignment check، 18 machine check، 19–31 reserved، <b>32–255 maskable interrupts</b>.`
    ] },
    { h: `الـ Direct Memory Access (DMA)`, pts: [
      `الـ DMA بيتجنب الـ <b>programmed I/O</b> (byte واحد في المرة) في نقل الداتا الكبيرة. محتاج <b>DMA controller</b> و<b>بيعدّي على الـ CPU (bypass)</b> عشان ينقل الداتا مباشرة بين الـ I/O device والـ memory.`,
      `الـ OS بيكتب <b>DMA command block</b> في الـ memory: (1) الـ source والـ destination addresses؛ (2) الـ read أو write mode؛ (3) عدد الـ bytes؛ (4) بيكتب مكان الـ command block للـ DMA controller؛ (5) الـ <b>bus mastering</b>: الـ DMA controller بياخد الـ bus من الـ CPU (<b>cycle stealing</b>، بس برضه أكفأ بكتير)؛ (6) لما يخلص، بيعمل <b>interrupt</b> عشان يقول إنه خلص.`,
      `<b>مميزات الـ DMA</b>: الـ CPU بيفضى من النقل byte byte ويقدر يعمل شغل تاني؛ <b>interrupt واحد بس لكل block</b> بدل لكل byte؛ الأجهزة السريعة بتنقل بسرعة قريبة من سرعة الـ memory؛ و interrupts وcontext switches أقل بتحسّن الـ performance عمومًا.`
    ] },
    { h: `الـ Application I/O interface؛ الـ block والـ character devices`, pts: [
      `الـ I/O system calls بتجمّع تصرفات الأجهزة في classes عامة. <b>الـ device-driver layer بيخبي الفروق بين الـ I/O controllers عن الـ kernel</b>؛ والأجهزة الجديدة اللي بتستخدم protocols متنفذة أصلًا مش محتاجة شغل زيادة. وكل OS ليه الـ I/O subsystem structures والـ driver frameworks بتوعه.`,
      `هيكل الـ Kernel I/O: kernel → kernel I/O subsystem → device drivers (SCSI، keyboard، mouse، PCI bus، floppy، ATAPI) → device controllers → devices.`,
      `الأجهزة بتختلف في أبعاد كتير: <b>character-stream أو block</b>؛ <b>sequential أو random-access</b>؛ <b>synchronous أو asynchronous</b>؛ <b>sharable أو dedicated</b>؛ <b>سرعة التشغيل</b>؛ <b>read-write، read-only أو write-only</b>.`,
      `الـ <b>Block devices</b> زي الـ disk drives: الـ commands هي read، write، seek؛ raw I/O، direct I/O أو file-system access؛ والـ memory-mapped file access ممكن (الـ file بيتعمله mapping على الـ virtual memory والـ clusters بتيجي عن طريق الـ demand paging)؛ DMA.`,
      `الـ <b>Character devices</b> زي الـ keyboards والـ mice والـ serial ports: الـ commands هي <code>get()</code>، <code>put()</code>؛ وفيه libraries فوقيهم بتسمح بالـ line editing.`
    ] },
    { h: `الـ Performance`, pts: [
      `الـ I/O عامل كبير في performance السيستم: بيطلب من الـ CPU ينفذ كود الـ device-driver، وبيعمل <b>context switches بسبب الـ interrupts</b>، وبيعمل <b>نسخ للداتا (data copying)</b>.`,
      `<b>الـ overheads بتاعة خدمة الـ interrupt</b>: لما interrupt يحصل، الـ process الشغالة بتتقاطع و<b>الـ state بتاعتها بتتحفظ في الـ PCB بتاعها</b>؛ وبعدين الـ interrupt service routine بتشتغل عشان تتعامل مع الـ interrupt؛ ولما تخلص، <b>الـ state بتاعة الـ process بترجع</b> وبتكمّل. فالـ overheads فيها تكلفة <b>حفظ واسترجاع الـ process state</b> (وكمان تنفيذ الـ ISR والـ context switches اللي فيها).`,
      `<b>إزاي نحسّن الـ performance</b>: قلل عدد الـ context switches؛ قلل نسخ الداتا؛ قلل الـ interrupts باستخدام transfers كبيرة وsmart controllers وpolling؛ استخدم DMA؛ استخدم hardware devices أذكى؛ ووازن بين performance الـ CPU والـ memory والـ bus والـ I/O عشان أعلى throughput.`
    ] }
  ],
  cards: [
    `Port: نقطة توصيل. Bus: shared direct access (PCI، PCIe، expansion bus). Controller: إلكترونيات بتشغّل port أو bus أو جهاز.`,
    `Data-in، data-out، status، control.`,
    `الـ Device registers متعملها mapping في الـ address space بتاع الـ processor.`,
    `الـ host بيفضل يقرا الـ busy bit لحد ما يبقى 0؛ كويس للأجهزة السريعة، وتضييع للبطيئة.`,
    `سلك في الـ CPU بيتحس بعد كل instruction؛ الـ controller بيبعت عليه signal عشان يطلب خدمة.`,
    `بيلاقي السبب، يعالجه، يرجّع الـ state، ويرجع من الـ interrupt.`,
    `Page fault.`,
    `32–255.`,
    `الـ Controller بينقل الداتا مباشرة بين الجهاز والـ memory، من غير الـ CPU.`,
    `الـ DMA controller بياخد الـ memory bus من الـ CPU وقت النقل.`,
    `الـ Source/destination addresses، الـ read/write mode، عدد الـ bytes.`,
    `Block: disks (read، write، seek). Character: keyboards، mice (get، put).`,
    `حفظ واسترجاع الـ process state، وكمان تشغيل الـ ISR.`,
    `Context switches أقل، نسخ داتا أقل، interrupts أقل، DMA، أجهزة أذكى، components متوازنة.`
  ],
  qa: [
    `الـ DMA بينقل blocks كبيرة مباشرة بين الجهاز والـ memory من غير الـ CPU، فبيتجنب الـ programmed I/O اللي بيبقى byte واحد في المرة. الـ CPU بيبقى فاضي يعمل شغل تاني وقت النقل. بيطلع interrupt واحد بس لكل block بدل لكل byte، وده بيقلل overhead الـ interrupts والـ context switches. الأجهزة السريعة تقدر تنقل بسرعة قريبة من سرعة الـ memory. ومع إنه بيسرق bus cycles، برضه أكفأ بكتير.`,
    `1) الـ device driver بيتقاله ينقل داتا الـ disk لـ buffer عند address X. 2) الـ driver بيقول للـ disk controller ينقل C bytes من الـ disk للـ buffer عند X. 3) الـ disk controller بيبدأ الـ DMA transfer. 4) الـ disk controller بيبعت كل byte للـ DMA controller. 5) الـ DMA controller بينقل الـ bytes للـ buffer X، وبيزوّد الـ memory address ويقلل C لحد ما C = 0. 6) لما C = 0، الـ DMA بيعمل interrupt للـ CPU عشان يقول إنه خلص.`,
    `لما interrupt يحصل، الـ process الشغالة بتتقاطع والـ state بتاعتها بتتحفظ في الـ PCB بتاعها. وبعدين الـ interrupt service routine بتشتغل عشان تتعامل مع الـ interrupt. لما التعامل يخلص، الـ process state بترجع والـ process بتكمّل. فالـ overheads هي حفظ واسترجاع الـ process state (context switches)، وتنفيذ الـ handler، وأي نسخ داتا مرتبط بيه.`,
    `قلل عدد الـ context switches؛ قلل نسخ الداتا؛ قلل الـ interrupts باستخدام transfers كبيرة وsmart controllers وpolling؛ استخدم DMA؛ استخدم hardware devices أذكى؛ ووازن بين performance الـ CPU والـ memory والـ bus والـ I/O عشان أعلى throughput.`,
    `الـ CPU (الـ device driver) بيبدأ الـ I/O. الـ I/O controller بيبدأ العملية. لما الـ input يبقى جاهز، أو الـ output يخلص أو يحصل error، الـ controller بيطلّع interrupt signal. الـ CPU بيتشيك على الـ interrupts بين الـ instructions، بيستلمه وينقل التحكم للـ interrupt handler. الـ handler بيعالج الداتا ويرجع من الـ interrupt. والـ CPU بيكمّل الـ task اللي اتقاطعت.`
  ],
  quiz: [
    [`ده الـ programmed I/O، اللي الـ DMA بيتجنبه.`, `صح.`, `ده الـ MMU.`, `لأ.`],
    [`دي step 3.`, `صح (step 6).`, `Step 1.`, `لأ.`],
    [`لأ.`, `صح.`, `لأ.`, `لأ.`],
    [`العكس: بيضيّع وقت الـ CPU مع الأجهزة البطيئة.`, `صح.`, `لأ.`, `لأ.`],
    [`Block device.`, `صح. الـ commands هي get() وput().`, `Block device.`, `لأ.`],
    [`لأ.`, `صح.`, `لأ.`, `لأ.`],
    [`مذكورة.`, `مذكورة.`, `مذكورة.`, `الاختيار الصح. إحنا عايزين interrupts أقل.`],
    [`ده 0.`, `صح.`, `ده 13.`, `دول 32–255.`],
    [`صح.`, `لأ.`, `لأ.`, `لأ.`],
    [`دي بتستخدم I/O instructions خاصة وport addresses.`, `صح.`, `لأ.`, `لأ.`]
  ],
  extra: [
    [`الـ DMA controller بيحدّث القيمتين بعد كل byte بينقله.`, `القيم متبدلة: 500 byte خلصوا، يبقى فاضل 1,548 والـ address اتقدم 500.`, `صح. الـ DMA controller بيزوّد الـ memory address ويقلل C مع كل byte، لحد ما C = 0.`, `الـ memory address بيزيد، مش بيقل.`],
    [`ده جزء من الـ command block.`, `صح. الـ command block فيه الـ source والـ destination addresses، والـ read/write mode وعدد الـ bytes؛ الـ PCB مش فيه.`, `ده جزء من الـ command block.`, `ده جزء من الـ command block.`],
    [`ده بيستخدم 3F0–3F7، اللي بيخلص قبل 3FA على طول.`, `الـ secondary serial port هو 2F8–2FF.`, `الـ graphics controller هو 3D0–3DF.`, `صح. الـ primary serial port بيستخدم 3F8–3FF، و3FA جوة الـ range ده.`],
    [`صح. من 0–31 events معينة (divide error، page fault…) أو reserved؛ ومن 32–255 maskable interrupts.`, `الـ page fault هو vector واحد بس رقم 14.`, `الـ 15 و19–31 reserved؛ ومن 32–255 مستخدمين.`, `الـ Divide error هو vector 0.`],
    [`دي step 1، بتحصل قبل ما الـ host يظبط الـ command-ready.`, `الـ Polling مابيستخدمش interrupts؛ الـ host بيفضل يتشيك على الـ status register.`, `صح. Step 4: الـ controller بيشوف الـ command-ready، يظبط الـ busy ويعمل النقل؛ وفي step 5 بيمسح الـ busy والـ error والـ command-ready.`, `في الـ write ده بيتعمل في step 2، قبل ما الـ command-ready يتظبط.`],
    [`الـ Data-in فيه الداتا اللي الـ host بيقراها من الجهاز.`, `الـ Data-out فيه الداتا اللي الـ host بيكتبها للجهاز.`, `الـ control register للـ commands اللي جاية من الـ host؛ والـ busy bit اللي الـ host بيعمله polling بيتبلّغ في مكان تاني.`, `صح. الـ busy (والـ error) bits موجودين في الـ status register.`],
    [`صح. الـ Block devices كمان بتسمح بالـ raw I/O والـ memory-mapped file access والـ DMA؛ والـ character devices ممكن يتحط فوقيها line editing.`, `بالعكس: الـ seek ليها معنى بس مع الـ random-access block devices زي الـ disks.`, `الـ Disk drives بتستخدم read وwrite وseek.`, `بالعكس: الـ keyboards والـ mice والـ serial ports هي character devices؛ والـ disk drives هي block devices.`],
    [`الـ PCI بيوصّل الـ graphics والـ SCSI والـ IDE controllers؛ والأجهزة البطيئة متعلقة على الـ expansion bus اللي وراه.`, `ده بيربط الـ processor بالـ memory، مش الـ keyboard أو الـ ports.`, `صح. الـ expansion bus interface اللي على الـ PCI bus بيوصّل الـ keyboard والـ parallel والـ serial ports.`, `الـ SCSI controller بيوصّل الـ disks.`],
    [`صح. الـ handler بيحدد السبب، يعمل الـ processing المطلوب، يرجّع الـ state ويرجع من الـ interrupt.`, `غلط: ده بالظبط اللي المحاضرة بتقوله عن إزاي الـ interrupt handler بيخلص.`],
    [`غلط: الـ busy-waiting بيضيّع الـ CPU مع الأجهزة البطيئة. وعشان كده إن الـ controller يبلّغ الـ CPU (interrupt) ساعات بيبقى أكفأ.`, `صح. الـ Polling معقول للأجهزة السريعة بس مش efficient للبطيئة؛ والـ interrupts بتخلي الجهاز هو اللي يبلّغ الـ CPU بدل كده.`]
  ]
};

AR.os.exams = [
  { sections: [
    { items: [
      { why: `الـ Need عليها 2 marks: احسبها لكل row. وبعدين وضّح الـ Work vector في كل خطوة، لأن الإثبات هو اللي عليه الدرجات. ده بالظبط مثال الـ deadlock-detection في المحاضرة (P2 بتطلب C كمان واحد). لو النسخة بتاعتك فيها Max P2 = 3 0 3 (زي 2023/24)، يبقى Need P2 = 0 0 0 والسيستم safe: P0 → (0,1,0)، P2 → (3,1,3)، P3 → (5,2,4)، P4 → (5,2,6)، P1 → (7,2,6) بيدّي &lt;P0, P2, P3, P4, P1&gt;.`, ans: `<b>Need = Max − Allocation</b><table><tr><th>Process</th><th>A</th><th>B</th><th>C</th></tr><tr><td>P0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>P1</td><td>2</td><td>0</td><td>2</td></tr><tr><td>P2</td><td>0</td><td>0</td><td>1</td></tr><tr><td>P3</td><td>1</td><td>0</td><td>0</td></tr><tr><td>P4</td><td>0</td><td>0</td><td>2</td></tr></table>تشيك: مجموع columns الـ Allocation = (7, 2, 6) = الـ capacity، فالـ Available = (0, 0, 0) ✓.<br><br><b>الـ Safety algorithm</b>، Work = (0,0,0):<br>• P0: Need (0,0,0) ≤ (0,0,0) ✓ → Work = (0,0,0) + (0,1,0) = <b>(0,1,0)</b>, Finish[P0] = true<br>• P1: (2,0,2) ≤ (0,1,0)? ✗ (A وC)<br>• P2: (0,0,1) ≤ (0,1,0)? ✗ (C)<br>• P3: (1,0,0) ≤ (0,1,0)? ✗ (A)<br>• P4: (0,0,2) ≤ (0,1,0)? ✗ (C)<br>مفيش أي process تانية تقدر تكمّل، فـ Finish[P1…P4] بتفضل false.<br><br><b>السيستم مش في safe state (unsafe).</b> P0 بس هي اللي تقدر تخلص. وP1 وP2 وP3 وP4 ممكن يدخلوا في deadlock.` },
      { why: `Topic 2، "Schedulers". أهم الفروق: كل واحد بيختار إيه، بيشتغل كل قد إيه، والـ degree of multiprogramming.`, ans: `<table><tr><th></th><th>Short-term (CPU scheduler)</th><th>Long-term (job scheduler)</th></tr><tr><td>الشغلانة</td><td>بيختار أنهي process في الـ ready queue تتنفذ بعد كده ويدّيها الـ CPU</td><td>بيختار أنهي processes تدخل الـ ready queue (الـ memory)</td></tr><tr><td>بيشتغل كل قد إيه</td><td>بيتنادى كتير جدًا (milliseconds)، فلازم يبقى سريع</td><td>بيتنادى قليل (ثواني، دقايق)، فممكن يبقى بطيء</td></tr><tr><td>بيتحكم في</td><td>أنهي process تشتغل</td><td>الـ degree of multiprogramming</td></tr><tr><td>ملحوظة</td><td>ساعات بيبقى الـ scheduler الوحيد في السيستم</td><td>لازم يختار خلطة كويسة من الـ I/O-bound والـ CPU-bound processes</td></tr></table>` },
    ] },
    { items: [
      { why: `ده مثال المحاضرة بالظبط (Topic 4، slides 18–20). دايمًا حدّث أحجام الـ holes بعد كل placement.`, ans: `<b>First-fit</b> (أول hole كبير كفاية):<br>212K → الـ partition اللي 500K (فاضل 288K)<br>417K → الـ partition اللي 600K (فاضل 183K)<br>112K → الـ hole اللي 288K (الباقي من الـ 500K) (فاضل 176K)<br>426K → <b>لازم يستنى</b> (الـ holes: 100، 176، 200، 300، 183)<br><br><b>Best-fit</b> (أصغر hole كبير كفاية):<br>212K → 300K (فاضل 88)<br>417K → 500K (فاضل 83)<br>112K → 200K (فاضل 88)<br>426K → 600K (فاضل 174)<br><br><b>Worst-fit</b> (أكبر hole):<br>212K → 600K (فاضل 388)<br>417K → 500K (فاضل 83)<br>112K → الـ hole اللي 388K (فاضل 276)<br>426K → <b>لازم يستنى</b> (أكبر hole هو 300K)<br><br>الـ <b>Best-fit</b> هو اللي بيستخدم الـ memory بأكفأ طريقة في المثال ده: هو الوحيد اللي بيحط الأربع processes.` },
      { why: `Topic 7، الـ allocation methods. اكتب الفكرة والمميزات والعيوب لكل واحدة.`, ans: `<table><tr><th></th><th>Linked allocation</th><th>Indexed allocation</th></tr><tr><td>الفكرة</td><td>كل file عبارة عن linked list من disk blocks؛ كل block فيه pointer للي بعده؛ والـ file بيخلص عند null pointer</td><td>كل file ليه index block خاص بيه فيه pointers لكل الـ data blocks بتاعته</td></tr><tr><td>الـ Directory فيه</td><td>الـ start (والـ end) block</td><td>عنوان الـ index block</td></tr><tr><td>الـ Access</td><td>Sequential بس؛ الوصول لـ block محتاج I/Os وseeks كتير</td><td>Random (direct) access عن طريق الـ index</td></tr><tr><td>الـ Fragmentation</td><td>مفيش external fragmentation، مفيش compaction</td><td>مفيش external fragmentation</td></tr><tr><td>الحجم وقت الإنشاء</td><td>مش مطلوب</td><td>مش مطلوب</td></tr><tr><td>الـ Overhead / المشاكل</td><td>مساحة للـ pointers في كل block؛ الـ reliability (pointer يضيع أو يبوظ)</td><td>الـ overhead بتاع الـ index block؛ الـ files الكبيرة محتاجة linked index blocks</td></tr><tr><td>Variant</td><td>الـ FAT بيحط الـ links في table</td><td>Linked scheme من الـ index blocks للحجم اللي مش محدود</td></tr></table>` },
    ] },
    { items: [
      { why: `الـ string ده فيه 14 reference. أقصر من string المحاضرة اللي فيه 22 reference (15/9/12)، فماتنقلش إجابة المحاضرة. الـ FIFO بيستبدل أقدم page. الـ OPT بيستبدل الـ page اللي هتتستخدم أبعد حاجة في المستقبل: عند "2" الـ page 7 مش هتتستخدم تاني، عند "3" الـ page 1 هي الأبعد، عند "4" الـ page 0، وعند "0" الـ page 4 مش هتتستخدم تاني. الـ LRU بيستبدل الـ least recently used page. أول تلات references faults في كل الـ algorithms.`, ans: `<b>1) FIFO = 11 page faults</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td>0</td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td>1</td><td><b>0</b></td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td>F</td></tr></table><br><b>2) Optimal = 8 page faults</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td>0</td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td>F</td></tr></table><br><b>3) LRU = 10 page faults</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td><b>1</b></td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td>F</td></tr></table><br>(الـ Bold = page لسه متحمّلة؛ F = page fault؛ فاضي = hit.)` },
      { why: `Topic 8، رسمة slide 12. احفظ الست خطوات بالترتيب.`, ans: `1. الـ Device driver بيتقاله ينقل داتا الـ disk لـ buffer عند address X.<br>2. الـ Device driver بيقول للـ disk controller ينقل C bytes من الـ disk للـ buffer عند address X.<br>3. الـ Disk controller بيبدأ الـ DMA transfer.<br>4. الـ Disk controller بيبعت كل byte للـ DMA controller.<br>5. الـ DMA controller بينقل الـ bytes للـ buffer X، وبيزوّد الـ memory address ويقلل C لحد ما C = 0.<br>6. لما C = 0، الـ DMA بيعمل interrupt للـ CPU عشان يقول إن النقل خلص.` },
    ] },
    { items: [
      { why: `كله بيوصل عند 0، فالـ WT = وقت البداية في الـ non-preemptive algorithms، والـ WT = completion − burst بشكل عام. "(quantum = 3)" ده للـ RR بس. ارسم كل chart بالأوقات بتاعته، واكتب الـ WT لكل process، وبعدين المتوسط.`, ans: `<b>باستخدام الـ bursts المتصححة P1 = 3، P2 = 3، P3 = 2، P4 = 1</b><br><b>FCFS</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–3</td><td>3–6</td><td>6–8</td><td>8–9</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>3</td><td>3</td><td>3</td><td><b>0</b></td></tr><tr><td>P2</td><td>3</td><td>6</td><td>6</td><td><b>3</b></td></tr><tr><td>P3</td><td>2</td><td>8</td><td>8</td><td><b>6</b></td></tr><tr><td>P4</td><td>1</td><td>9</td><td>9</td><td><b>8</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>26/4 = 6.5</td><td><b>17/4 = 4.25</b></td></tr></table><b>RR (q = 3)</b>: كل burst ≤ 3، فكل process بتخلص في أول quantum ليها والـ chart هو نفس الـ FCFS بالظبط.<table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–3</td><td>3–6</td><td>6–8</td><td>8–9</td></tr></table> متوسط الـ WT = <b>4.25</b><br><br><b>SJF</b> (التعادل بين P1/P2 = 3 بيتحل بترتيب الوصول)<table><tr><th>P4</th><th>P3</th><th>P1</th><th>P2</th></tr><tr><td>0–1</td><td>1–3</td><td>3–6</td><td>6–9</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>3</td><td>6</td><td>6</td><td><b>3</b></td></tr><tr><td>P2</td><td>3</td><td>9</td><td>9</td><td><b>6</b></td></tr><tr><td>P3</td><td>2</td><td>3</td><td>3</td><td><b>1</b></td></tr><tr><td>P4</td><td>1</td><td>1</td><td>1</td><td><b>0</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>19/4 = 4.75</td><td><b>10/4 = 2.5</b></td></tr></table><br><b>باستخدام الـ bursts المطبوعة P1 = 6، P2 = 3، P3 = 5، P4 = 4</b><br><b>FCFS</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–6</td><td>6–9</td><td>9–14</td><td>14–18</td></tr></table> الـ WT: P1 0، P2 6، P3 9، P4 14 → المتوسط <b>29/4 = 7.25</b><br><b>RR (q = 3)</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P1</th><th>P3</th><th>P4</th></tr><tr><td>0–3</td><td>3–6</td><td>6–9</td><td>9–12</td><td>12–15</td><td>15–17</td><td>17–18</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>6</td><td>15</td><td>15</td><td><b>9</b></td></tr><tr><td>P2</td><td>3</td><td>6</td><td>6</td><td><b>3</b></td></tr><tr><td>P3</td><td>5</td><td>17</td><td>17</td><td><b>12</b></td></tr><tr><td>P4</td><td>4</td><td>18</td><td>18</td><td><b>14</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>56/4 = 14</td><td><b>38/4 = 9.5</b></td></tr></table><b>SJF</b><table><tr><th>P2</th><th>P4</th><th>P3</th><th>P1</th></tr><tr><td>0–3</td><td>3–7</td><td>7–12</td><td>12–18</td></tr></table> الـ WT: P2 0، P4 3، P3 7، P1 12 → المتوسط <b>22/4 = 5.5</b><br><br>في النسختين <b>الـ SJF بيدّي أقل متوسط waiting time</b>.` },
      { why: `Topic 1، slides 3 و7 و8. اذكر "resource allocator" و"control program" الاتنين، والـ kernel كمان.`, ans: `الـ operating system هو برنامج بيقف <b>وسيط بين الـ user بتاع الكمبيوتر والـ hardware</b>. مفيش تعريف واحد متفق عليه، بس:<br>• <b>الـ OS هو resource allocator</b>: بيدير كل الـ resources وبيحكم بين الطلبات المتعارضة عشان الاستخدام يبقى efficient وعادل.<br>• <b>الـ OS هو control program</b>: بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط للكمبيوتر.<br>• "كل حاجة الـ vendor بيبعتهالك لما تطلب operating system" تقريب كويس (بس بيختلف جدًا).<br>• "البرنامج الوحيد اللي شغال طول الوقت على الكمبيوتر" هو الـ <b>kernel</b>. وأي حاجة تانية يا system program (جاي مع الـ OS) يا application program.` },
    ] },
    { items: [
      { why: `الـ SRAM (تكنولوجيا الـ cache) هي الأسرع وvolatile. الـ DRAM volatile بس أبطأ. الـ EPROM والـ EEPROM non-volatile.` },
      { why: `لو الـ parent خلص من غير ما يعمل wait()، الـ process بتبقى orphan (Topic 2).` },
      { why: `تعريف الـ context switch.` },
      { why: `الـ Starvation هي المشكلة؛ والـ aging (زيادة الـ priority مع الوقت) هو الحل.` },
      { why: `الـ program counter فيه عنوان الـ instruction الجاية اللي هتتنفذ.` },
      { why: `الـ SJF هو الـ optimal في متوسط الـ waiting time.` },
      { why: `الـ long-term (job) scheduler.` },
      { why: `الـ Hard (magnetic) disks هي أشهر secondary storage. الـ RAM ده primary storage والـ tape ده tertiary.` },
      { why: `الـ process اللي خلصت والـ parent بتاعها لسه ماعملش wait() اسمها zombie.` },
      { why: `الـ foreground process بيتحكم فيها من الـ user interface؛ والـ background processes مش على الشاشة.` },
    ] },
    { items: [
      { why: `الـ Flash (SSD) بتبقى nonvolatile، والـ access time بتاعها حوالي 25,000–50,000 ns مقابل 80–250 ns للـ main memory.` },
      { why: `الـ program هو الـ passive؛ والـ process هي الـ active.` },
      { why: `الـ Hardware interrupts جاية من الأجهزة؛ والـ software interrupts هي traps/exceptions.` },
      { why: `الـ kernel هو البرنامج الوحيد اللي شغال طول الوقت. وأي حاجة تانية system أو application program.` },
      { why: `الـ bootstrap متخزن في ROM أو EPROM (firmware).` },
      { why: `ده صريح من أنشطة الـ memory-management.` },
      { why: `الـ SSDs أسرع من الـ hard disks.` },
      { why: `الـ parent يا بيشتغل concurrently يا بيستنى لحد ما الـ children يخلصوا (wait()). ولو خلص الأول فعلًا، الـ child بيبقى orphan أو بيتقفل بالـ cascading termination، فـ"الـ parent بيخلص الأول" مش قاعدة.` },
      { why: `CPU واحد بيشغّل process واحدة في المرة؛ والباقي ready أو waiting.` },
      { why: `الـ Busy waiting بيضيّع CPU cycles في loop مش بيعمل أي شغل مفيد. معقول بس للأجهزة السريعة جدًا.` },
    ] },
  ] },
  { sections: [
    { items: [
      { why: `Topic 2، slides 3–4.`, ans: `<table><tr><th>Program</th><th>Process</th></tr><tr><td>كيان passive</td><td>كيان active: برنامج شغال (program in execution)</td></tr><tr><td>متخزن على الـ disk كملف executable</td><td>بتتعمل لما الـ executable يتحمّل في الـ memory</td></tr><tr><td>كود بس (instructions)</td><td>الكود (text) + الـ program counter والـ registers + الـ stack + الـ data section + الـ heap + الـ state (PCB)</td></tr><tr><td>البرنامج الواحد…</td><td>…ممكن يبقى كذا process (زي كذا user بيشغّلوا نفس البرنامج)</td></tr></table>` },
      { why: `ارسم الـ diagram وكل transition مكتوب عليها اسمها، وبعدين عرّف الـ 5 states.`, ans: `<pre>        admitted            interrupt            exit
  new ─────────► ready ◄──────────── running ─────────► terminated
                   ▲   ───────────────►  │
                   │   scheduler dispatch│
   I/O or event    │                     │ I/O or event wait
   completion      └────── waiting ◄─────┘</pre><b>new</b>: الـ process بتتعمل. <b>ready</b>: مستنية تاخد processor. <b>running</b>: الـ instructions بتتنفذ. <b>waiting</b>: مستنية event (إن I/O يخلص، signal). <b>terminated</b>: خلصت تنفيذ.` },
      { why: `Topic 4، slide 21. مثال بالأرقام بياخد الدرجة كاملة.`, ans: `<b>External fragmentation</b>: إجمالي مساحة الـ memory موجود ويكفي الطلب، بس <b>مش contiguous</b> (holes متفرقة بين الـ partitions المتخصصة). بيحصل مع الـ variable partitions والـ segmentation. بيقل بالـ <b>compaction</b> (ممكن بس مع الـ dynamic relocation وقت الـ execution).<br><b>Internal fragmentation</b>: الـ memory المتخصصة ممكن تبقى <b>أكبر شوية من المطلوب</b>؛ والفرق جوة الـ partition بس مش مستخدم. بيحصل مع الـ fixed-size blocks والـ paging، زي page 2,048 B وprocess 72,766 B → آخر page بتستخدم 1,086 B → 962 B ضايعين.` },
      { why: `Topic 6، slide 3.`, ans: `الـ Deadlock ممكن يحصل لو الـ 4 شروط اتحققوا <b>مع بعض في نفس الوقت</b>:<br>1. <b>Mutual exclusion</b>: process واحدة بس في المرة تقدر تستخدم الـ resource.<br>2. <b>Hold and wait</b>: process ماسكة resource واحد على الأقل ومستنية تاخد resources زيادة ماسكاها processes تانية.<br>3. <b>No preemption</b>: الـ resource مايتسابش غير بمزاج الـ process اللي ماسكاه، بعد ما تخلّص الـ task بتاعتها.<br>4. <b>Circular wait</b>: فيه مجموعة {P0، …، Pn} من الـ processes المستنية فيها P0 مستنية P1، وP1 مستنية P2، …، وPn−1 مستنية Pn وPn مستنية P0.` },
      { why: `Topic 7، slides 28–33.`, ans: `<b>Linked allocation</b>: كل file عبارة عن linked list من disk blocks ممكن تبقى متفرقة في أي حتة. كل block فيه pointer للي بعده والـ file بيخلص عند null pointer؛ والـ directory فيه الـ start (والـ end) block. + مفيش external fragmentation، مفيش compaction، مش محتاج تعلن الحجم. − الـ reliability (pointers تضيع أو تبوظ)، الوصول لـ block بياخد I/Os وseeks كتير، مساحة للـ pointers. (نوع الـ FAT: الـ links محفوظة في table.)<br><b>Indexed allocation</b>: كل file ليه <b>index block</b> خاص بيه فيه pointers للـ data blocks بتاعته؛ والـ directory بيشاور على الـ index block. + Random access، وdynamic access من غير external fragmentation. − الـ overhead بتاع الـ index block. file حجمه 256 KB بـ blocks حجمها 512-byte محتاج index block واحد بس؛ والأحجام اللي مش محدودة بتستخدم linked scheme من الـ index blocks.` },
      { why: `Topic 1 slide 20 وTopic 8 slide 11.`, ans: `• بيستخدم مع الـ I/O devices السريعة اللي بتنقل بسرعة قريبة من سرعة الـ memory.<br>• بيتجنب الـ programmed I/O (byte واحد في المرة) في نقل الداتا الكبيرة: الـ controller بينقل <b>blocks</b> مباشرة بين الجهاز والـ main memory <b>من غير تدخل الـ CPU</b> (bypasses the CPU).<br>• <b>interrupt واحد بس لكل block</b> بدل واحد لكل byte، فـ interrupts وcontext switches أقل.<br>• الـ CPU بيبقى فاضي يعمل شغل تاني وقت النقل. الـ cycle stealing ليه تمن بسيط، بس برضه أكفأ بكتير.` },
    ] },
    { items: [
      { why: `لما يبقى فيه arrival times استخدم دايمًا WT = Completion − Arrival − Burst. الـ SRTF chart هو مثال المحاضرة بالظبط (26/4 = 6.5). في الـ RR، الـ processes اللي وصلت أثناء أول quantum لـ P1 (عند 1، 2، 3) بتدخل الـ queue قبل ما P1 ترجع عند t = 4.`, ans: `<b>Preemptive SJF (SRTF)</b>: عند t = 1 الـ P2 (4) &lt; اللي فاضل من P1 وهو 7، فـ P1 بتتعملها preempt؛ عند t = 5 الـ P4 (5) &lt; P1 (7) &lt; P3 (9).<table><tr><th>P1</th><th>P2</th><th>P4</th><th>P1</th><th>P3</th></tr><tr><td>0–1</td><td>1–5</td><td>5–10</td><td>10–17</td><td>17–26</td></tr></table><table><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>0</td><td>8</td><td>17</td><td>17</td><td><b>9</b></td></tr><tr><td>P2</td><td>1</td><td>4</td><td>5</td><td>4</td><td><b>0</b></td></tr><tr><td>P3</td><td>2</td><td>9</td><td>26</td><td>24</td><td><b>15</b></td></tr><tr><td>P4</td><td>3</td><td>5</td><td>10</td><td>7</td><td><b>2</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td></td><td>52/4 = 13</td><td><b>26/4 = 6.5</b></td></tr></table><b>FCFS</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–8</td><td>8–12</td><td>12–21</td><td>21–26</td></tr></table><table><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>0</td><td>8</td><td>8</td><td>8</td><td><b>0</b></td></tr><tr><td>P2</td><td>1</td><td>4</td><td>12</td><td>11</td><td><b>7</b></td></tr><tr><td>P3</td><td>2</td><td>9</td><td>21</td><td>19</td><td><b>10</b></td></tr><tr><td>P4</td><td>3</td><td>5</td><td>26</td><td>23</td><td><b>18</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td></td><td>61/4 = 15.25</td><td><b>35/4 = 8.75</b></td></tr></table><b>Priority</b> (1 = الأعلى): P1 بتشتغل الأول؛ عند t = 8 الـ processes الجاهزة هي P3 (2)، P4 (3)، P2 (5).<table><tr><th>P1</th><th>P3</th><th>P4</th><th>P2</th></tr><tr><td>0–8</td><td>8–17</td><td>17–22</td><td>22–26</td></tr></table><table><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>0</td><td>8</td><td>8</td><td>8</td><td><b>0</b></td></tr><tr><td>P2</td><td>1</td><td>4</td><td>26</td><td>25</td><td><b>21</b></td></tr><tr><td>P3</td><td>2</td><td>9</td><td>17</td><td>15</td><td><b>6</b></td></tr><tr><td>P4</td><td>3</td><td>5</td><td>22</td><td>19</td><td><b>14</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td></td><td>67/4 = 16.75</td><td><b>41/4 = 10.25</b></td></tr></table><b>RR (q = 4)</b>: الـ queue بعد أول quantum لـ P1 = P2، P3، P4، P1.<table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P1</th><th>P3</th><th>P4</th><th>P3</th></tr><tr><td>0–4</td><td>4–8</td><td>8–12</td><td>12–16</td><td>16–20</td><td>20–24</td><td>24–25</td><td>25–26</td></tr></table><table><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>0</td><td>8</td><td>20</td><td>20</td><td><b>12</b></td></tr><tr><td>P2</td><td>1</td><td>4</td><td>8</td><td>7</td><td><b>3</b></td></tr><tr><td>P3</td><td>2</td><td>9</td><td>26</td><td>24</td><td><b>15</b></td></tr><tr><td>P4</td><td>3</td><td>5</td><td>25</td><td>22</td><td><b>17</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td></td><td>73/4 = 18.25</td><td><b>47/4 = 11.75</b></td></tr></table><b>c.</b> أقل متوسط waiting time: <b>preemptive SJF (SRTF) = 6.5 ms</b> (FCFS 8.75، priority 10.25، RR 11.75).` },
      { why: `أول 4 pages مختلفة بيملوا الـ 4 frames (4 faults). بعد كده الـ FIFO بيطرد بترتيب التحميل (5، 7، 6، 9، 3…). الـ OPT: عند "3" اطرد 5 (هتتستخدم أبعد حاجة)؛ عند "4" اطرد 6؛ عند "6" اطرد 4 أو 3 (مش هيتستخدموا تاني)؛ عند "5" اطرد واحدة مش هتتستخدم تاني. الـ LRU: عند "3" اطرد 5؛ عند "4" اطرد 6؛ عند "6" اطرد 4؛ عند "5" اطرد 3.`, ans: `<b>FIFO = 10 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>9</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td>F</td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td></td></tr></table><br><b>Optimal = 8 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>9</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td></tr></table><br><b>LRU = 8 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>9</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td></tr></table><br>(الـ Bold = page لسه متحمّلة؛ F = fault.)` },
      { why: `اتشيك الأول: مجموع columns الـ Allocation (2, 9, 10, 12) + الـ Available (1, 5, 2, 0) = (3, 14, 12, 12) = الإجماليات ✓. الـ Work في الآخر لازم يساوي الإجماليات، ودي طريقة كويسة تتأكد بيها من نفسك. فيه ترتيبات safe تانية صح (زي P0، P3، P2، P4، P1). أي sequence صح ومعاها الـ Work trace بتاخد الدرجات.`, ans: `<b>a. Need = Max − Allocation</b><table><tr><th>Process</th><th>A B C D</th></tr><tr><td>P0</td><td>0 0 0 0</td></tr><tr><td>P1</td><td>0 7 5 0</td></tr><tr><td>P2</td><td>1 0 0 2</td></tr><tr><td>P3</td><td>0 0 2 0</td></tr><tr><td>P4</td><td>0 6 4 2</td></tr></table><b>b. الـ Safety algorithm</b>، Work = Available = (1,5,2,0):<br>• P0: (0,0,0,0) ≤ Work ✓ → Work = (1,5,2,0) + (0,0,1,2) = <b>(1,5,3,2)</b><br>• P1: (0,7,5,0) ≤ (1,5,3,2)? ✗ (B: 7 &gt; 5)<br>• P2: (1,0,0,2) ≤ (1,5,3,2) ✓ → Work = (1,5,3,2) + (1,3,5,4) = <b>(2,8,8,6)</b><br>• P3: (0,0,2,0) ✓ → Work = (2,8,8,6) + (0,6,3,2) = <b>(2,14,11,8)</b><br>• P4: (0,6,4,2) ✓ → Work = (2,14,11,8) + (0,0,1,4) = <b>(2,14,12,12)</b><br>• P1: (0,7,5,0) ✓ → Work = (2,14,12,12) + (1,0,0,0) = <b>(3,14,12,12)</b> = إجمالي الـ instances ✓<br>كل الـ Finish = true → السيستم <b>في safe state</b>، والـ safe sequence هي <b>&lt;P0, P2, P3, P4, P1&gt;</b>.` },
    ] },
  ] },
  { sections: [
    { items: [
      { why: `كله بيوصل عند 0، فالـ WT = completion − burst. في الـ RR q = 1، اكتب اللفة كاملة ووضّح كل process خلصت إمتى. الـ completion times بتاعتها: P4 4، P3 8، P2 11، P5 14، P1 18.`, ans: `<b>SJF</b><table><tr><th>P4</th><th>P3</th><th>P2</th><th>P5</th><th>P1</th></tr><tr><td>0–1</td><td>1–3</td><td>3–6</td><td>6–10</td><td>10–18</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>8</td><td>18</td><td>18</td><td><b>10</b></td></tr><tr><td>P2</td><td>3</td><td>6</td><td>6</td><td><b>3</b></td></tr><tr><td>P3</td><td>2</td><td>3</td><td>3</td><td><b>1</b></td></tr><tr><td>P4</td><td>1</td><td>1</td><td>1</td><td><b>0</b></td></tr><tr><td>P5</td><td>4</td><td>10</td><td>10</td><td><b>6</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>38/5 = 7.6</td><td><b>20/5 = 4</b></td></tr></table><b>RR (q = 1)</b>: لف على P1 P2 P3 P4 P5؛ P4 بتخلص عند 4، وP3 عند 8، وP2 عند 11، وP5 عند 14، وبعدين P1 بتشتغل لوحدها لحد 18.<table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P5</th><th>P1</th><th>P2</th><th>P3</th><th>P5</th><th>P1</th><th>P2</th><th>P5</th><th>P1</th><th>P5</th><th>P1</th></tr><tr><td>0–1</td><td>1–2</td><td>2–3</td><td>3–4</td><td>4–5</td><td>5–6</td><td>6–7</td><td>7–8</td><td>8–9</td><td>9–10</td><td>10–11</td><td>11–12</td><td>12–13</td><td>13–14</td><td>14–18</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>8</td><td>18</td><td>18</td><td><b>10</b></td></tr><tr><td>P2</td><td>3</td><td>11</td><td>11</td><td><b>8</b></td></tr><tr><td>P3</td><td>2</td><td>8</td><td>8</td><td><b>6</b></td></tr><tr><td>P4</td><td>1</td><td>4</td><td>4</td><td><b>3</b></td></tr><tr><td>P5</td><td>4</td><td>14</td><td>14</td><td><b>10</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>55/5 = 11</td><td><b>37/5 = 7.4</b></td></tr></table><b>Priority</b><table><tr><th>P2</th><th>P3</th><th>P1</th><th>P4</th><th>P5</th></tr><tr><td>0–3</td><td>3–5</td><td>5–13</td><td>13–14</td><td>14–18</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>8</td><td>13</td><td>13</td><td><b>5</b></td></tr><tr><td>P2</td><td>3</td><td>3</td><td>3</td><td><b>0</b></td></tr><tr><td>P3</td><td>2</td><td>5</td><td>5</td><td><b>3</b></td></tr><tr><td>P4</td><td>1</td><td>14</td><td>14</td><td><b>13</b></td></tr><tr><td>P5</td><td>4</td><td>18</td><td>18</td><td><b>14</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>53/5 = 10.6</td><td><b>35/5 = 7</b></td></tr></table><b>3)</b> أقل متوسط waiting time: <b>SJF = 4 ms</b> (priority 7، RR 7.4؛ والـ FCFS كان هيبقى 9.2).` },
      { why: `مثال المحاضرة بالظبط.`, ans: `<table><tr><th>Process</th><th>First-fit</th><th>Best-fit</th><th>Worst-fit</th></tr><tr><td>212K</td><td>500K (فاضل 288)</td><td>300K (فاضل 88)</td><td>600K (فاضل 388)</td></tr><tr><td>417K</td><td>600K (فاضل 183)</td><td>500K (فاضل 83)</td><td>500K (فاضل 83)</td></tr><tr><td>112K</td><td>الـ hole اللي 288K في الـ 500K</td><td>200K (فاضل 88)</td><td>الـ hole اللي 388K في الـ 600K</td></tr><tr><td>426K</td><td><b>لازم يستنى</b></td><td>600K (فاضل 174)</td><td><b>لازم يستنى</b></td></tr></table>الـ <b>Best-fit</b> هو الأكفأ هنا: هو الـ algorithm الوحيد اللي بيدّي مكان للأربع processes.` },
      { why: `نفس string الـ 2024/25 من غير الـ "9" اللي قبل الأخير (اللي كان hit هناك)، فالأعداد زي ما هي (10 / 8 / 8). وهنا الـ LRU صادف إنه يساوي الـ Optimal.`, ans: `<b>FIFO = 10 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td>F</td><td>F</td><td></td><td></td><td>F</td><td></td><td></td></tr></table><br><b>Optimal = 8 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td><td>F</td><td></td><td></td></tr></table><br><b>LRU = 8 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td><td>F</td><td></td><td></td></tr></table>` },
      { why: `حتى لو الـ Available = 0 السيستم ممكن يبقى safe، لأن P0 وP2 مش محتاجين حاجة زيادة وبيسيبوا الـ resources بتاعتهم. قارن بورقة 2025/26، اللي فيها Max P2 = 3 0 4 بيخليه unsafe.`, ans: `<b>1) Need = Max − Allocation</b>: P0 (0,0,0)، P1 (2,0,2)، P2 (0,0,0)، P3 (1,0,0)، P4 (0,0,2).<br><b>2)</b> Work = (0,0,0):<br>• P0 (0,0,0) ✓ → Work = (0,1,0)<br>• P1 (2,0,2)؟ ✗<br>• P2 (0,0,0) ✓ → Work = (0,1,0) + (3,0,3) = (3,1,3)<br>• P3 (1,0,0) ✓ → (3,1,3) + (2,1,1) = (5,2,4)<br>• P4 (0,0,2) ✓ → (5,2,4) + (0,0,2) = (5,2,6)<br>• P1 (2,0,2) ✓ → (5,2,6) + (2,0,0) = (7,2,6) = الإجماليات ✓<br><b>Safe</b>، والـ sequence هي <b>&lt;P0, P2, P3, P4, P1&gt;</b>.` },
    ] },
    { items: [
      { why: `Topic 1، slide 3.`, ans: `1. <b>تشغيل برامج الـ user</b> وتسهيل حل مشاكل الـ user.<br>2. إن الـ computer system يبقى <b>مريح (convenient)</b> في الاستخدام.<br>3. استخدام الـ hardware بطريقة <b>efficient</b>.` },
      { why: `Topic 2، slides 12–13.`, ans: `<table><tr><th></th><th>Short-term (CPU scheduler)</th><th>Medium-term</th><th>Long-term (job scheduler)</th></tr><tr><td>الوظيفة</td><td>بيختار أنهي ready process تتنفذ بعد كده ويدّيها الـ CPU</td><td>بيشيل processes من الـ memory للـ disk ويرجّعها بعدين عشان تكمّل (swapping)</td><td>بيختار أنهي processes تدخل الـ ready queue</td></tr><tr><td>بيشتغل كل قد إيه</td><td>كتير جدًا (ms)، فلازم يبقى سريع</td><td>من وقت للتاني</td><td>قليل (ثواني، دقايق)، فممكن يبقى بطيء</td></tr><tr><td>التأثير</td><td>بيقرر الـ CPU allocation</td><td>بيقلل الـ degree of multiprogramming</td><td>بيتحكم في الـ degree of multiprogramming</td></tr></table>` },
      { why: `Topic 7، slides 26 و31–33.`, ans: `الأنواع: <b>contiguous</b>، <b>linked</b>، <b>indexed</b> allocation.<br><br><b>Indexed allocation</b>: كل file ليه <b>index block(s)</b> خاص بيه، array من الـ pointers للـ data blocks بتاعته (الـ logical view: index table بتشاور على blocks متفرقة). الـ directory entry فيه رقم الـ index block، زي jeep → index block 19 فيه 9، 16، 1، 10، 25، −1، … . الـ entry رقم i بيشاور على الـ block رقم i في الـ file.<br>• محتاج index table.<br>• بيدعم <b>random (direct) access</b>.<br>• Dynamic access <b>من غير external fragmentation</b>، بس فيه <b>overhead الـ index block</b>.<br>• مثال: file أقصاه 256 KB بـ blocks حجمها 512-byte → 512 block → محتاجين <b>index block واحد</b> بس.<br>• الـ files اللي طولها مش محدود: <b>linked scheme</b>، الـ index blocks بتتربط ببعض (من غير حد للحجم).` },
      { why: `Topic 8، slide 12.`, ans: `1. الـ Device driver بيتقاله ينقل داتا الـ disk لـ buffer عند address X.<br>2. الـ Device driver بيقول للـ disk controller ينقل C bytes من الـ disk للـ buffer عند address X.<br>3. الـ Disk controller بيبدأ الـ DMA transfer.<br>4. الـ Disk controller بيبعت كل byte للـ DMA controller.<br>5. الـ DMA controller بينقل الـ bytes للـ buffer X، وبيزوّد الـ memory address ويقلل C لحد ما C = 0.<br>6. لما C = 0، الـ DMA بيعمل interrupt للـ CPU عشان يقول إن النقل خلص.` },
    ] },
  ] },
  { sections: [
    { items: [
      { why: `تتبع الـ RR: اللفة الأولى P0 P1 P2 P3 P4 (0–10)؛ اللفة التانية P0 P1، وبعدين P2 بتخلص عند 15، وP3، وP4 (لحد 19)؛ اللفة التالتة P0، P1، وبعدين P3 بتخلص عند 25، وP4 عند 26؛ وبعدين P0 26–28، وP1 بتخلص عند 29، وP0 بتخلص عند 31.`, ans: `<b>FCFS</b><table><tr><th>P0</th><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–10</td><td>10–17</td><td>17–20</td><td>20–26</td><td>26–31</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P0</td><td>10</td><td>10</td><td>10</td><td><b>0</b></td></tr><tr><td>P1</td><td>7</td><td>17</td><td>17</td><td><b>10</b></td></tr><tr><td>P2</td><td>3</td><td>20</td><td>20</td><td><b>17</b></td></tr><tr><td>P3</td><td>6</td><td>26</td><td>26</td><td><b>20</b></td></tr><tr><td>P4</td><td>5</td><td>31</td><td>31</td><td><b>26</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>104/5 = 20.8</td><td><b>73/5 = 14.6</b></td></tr></table><b>SJF</b><table><tr><th>P2</th><th>P4</th><th>P3</th><th>P1</th><th>P0</th></tr><tr><td>0–3</td><td>3–8</td><td>8–14</td><td>14–21</td><td>21–31</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P0</td><td>10</td><td>31</td><td>31</td><td><b>21</b></td></tr><tr><td>P1</td><td>7</td><td>21</td><td>21</td><td><b>14</b></td></tr><tr><td>P2</td><td>3</td><td>3</td><td>3</td><td><b>0</b></td></tr><tr><td>P3</td><td>6</td><td>14</td><td>14</td><td><b>8</b></td></tr><tr><td>P4</td><td>5</td><td>8</td><td>8</td><td><b>3</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>77/5 = 15.4</td><td><b>46/5 = 9.2</b></td></tr></table><b>Priority</b><table><tr><th>P1</th><th>P4</th><th>P2</th><th>P3</th><th>P0</th></tr><tr><td>0–7</td><td>7–12</td><td>12–15</td><td>15–21</td><td>21–31</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P0</td><td>10</td><td>31</td><td>31</td><td><b>21</b></td></tr><tr><td>P1</td><td>7</td><td>7</td><td>7</td><td><b>0</b></td></tr><tr><td>P2</td><td>3</td><td>15</td><td>15</td><td><b>12</b></td></tr><tr><td>P3</td><td>6</td><td>21</td><td>21</td><td><b>15</b></td></tr><tr><td>P4</td><td>5</td><td>12</td><td>12</td><td><b>7</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>86/5 = 17.2</td><td><b>55/5 = 11</b></td></tr></table><b>RR (q = 2)</b><table><tr><th>P0</th><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P0</th><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P0</th><th>P1</th><th>P3</th><th>P4</th><th>P0</th><th>P1</th><th>P0</th></tr><tr><td>0–2</td><td>2–4</td><td>4–6</td><td>6–8</td><td>8–10</td><td>10–12</td><td>12–14</td><td>14–15</td><td>15–17</td><td>17–19</td><td>19–21</td><td>21–23</td><td>23–25</td><td>25–26</td><td>26–28</td><td>28–29</td><td>29–31</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P0</td><td>10</td><td>31</td><td>31</td><td><b>21</b></td></tr><tr><td>P1</td><td>7</td><td>29</td><td>29</td><td><b>22</b></td></tr><tr><td>P2</td><td>3</td><td>15</td><td>15</td><td><b>12</b></td></tr><tr><td>P3</td><td>6</td><td>25</td><td>25</td><td><b>19</b></td></tr><tr><td>P4</td><td>5</td><td>26</td><td>26</td><td><b>21</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>126/5 = 25.2</td><td><b>95/5 = 19</b></td></tr></table><b>3.</b> أقل متوسط waiting time: <b>SJF = 9.2 ms</b> (FCFS 14.6، priority 11، RR 19).` },
      { why: `في الـ first-fit، الـ 130K بيروح الـ partition اللي 150K لأنه أول hole بالترتيب كبير كفاية، حتى لو الـ 270K المتبقي كمان ينفع.`, ans: `<table><tr><th>Process</th><th>First-fit</th><th>Best-fit</th><th>Worst-fit</th></tr><tr><td>230K</td><td>500K (فاضل 270)</td><td>300K (فاضل 70)</td><td>600K (فاضل 370)</td></tr><tr><td>420K</td><td>600K (فاضل 180)</td><td>500K (فاضل 80)</td><td>500K (فاضل 80)</td></tr><tr><td>130K</td><td>150K (فاضل 20)</td><td>150K (فاضل 20)</td><td>الـ hole اللي 370K في الـ 600K (فاضل 240)</td></tr><tr><td>450K</td><td><b>لازم يستنى</b> (الـ holes 20، 270، 300، 180)</td><td>600K (فاضل 150)</td><td><b>لازم يستنى</b> (أكبر hole هو 300)</td></tr></table>الـ <b>Best-fit</b> هو اللي بيستخدم الـ memory بأكفأ طريقة: الأربع processes اتحطوا.` },
      { why: `ده string المحاضرة بس الـ pages متغيرة أساميها (7→5، 0→8، 1→6)، فالإجابات هي إجابات المحاضرة 15 / 9 / 12.`, ans: `<b>FIFO = 15</b><table><tr><th>Ref</th><th>5</th><th>8</th><th>6</th><th>2</th><th>8</th><th>3</th><th>8</th><th>4</th><th>2</th><th>3</th><th>8</th><th>3</th><th>8</th><th>3</th><th>2</th><th>6</th><th>2</th><th>8</th><th>6</th><th>5</th><th>8</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>F2</td><td></td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>8</b></td><td>8</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td><b>8</b></td><td>8</td><td>8</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>6</b></td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td></td><td></td><td>F</td><td>F</td><td></td><td></td><td>F</td><td>F</td><td>F</td></tr></table><br><b>Optimal = 9</b><table><tr><th>Ref</th><th>5</th><th>8</th><th>6</th><th>2</th><th>8</th><th>3</th><th>8</th><th>4</th><th>2</th><th>3</th><th>8</th><th>3</th><th>8</th><th>3</th><th>2</th><th>6</th><th>2</th><th>8</th><th>6</th><th>5</th><th>8</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>F2</td><td></td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td><b>4</b></td><td>4</td><td>4</td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td><td>F</td><td></td><td></td></tr></table><br><b>LRU = 12</b><table><tr><th>Ref</th><th>5</th><th>8</th><th>6</th><th>2</th><th>8</th><th>3</th><th>8</th><th>4</th><th>2</th><th>3</th><th>8</th><th>3</th><th>8</th><th>3</th><th>2</th><th>6</th><th>2</th><th>8</th><th>6</th><th>5</th><th>8</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>F2</td><td></td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td></td><td></td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td></tr></table>` },
      { why: `تشيك الإجماليات: مجموع الـ Allocation (2, 9, 10) + الـ Available (1, 5, 2) = (3, 14, 12) ✓.`, ans: `<b>1. Need</b>: P0 (0,0,0)، P1 (0,7,5)، P2 (1,0,0)، P3 (0,0,2)، P4 (0,6,4).<br><b>2.</b> Work = (1,5,2):<br>• P0 ✓ → (1,5,3)<br>• P1 (0,7,5)؟ ✗ (B)<br>• P2 (1,0,0) ✓ → (1,5,3) + (1,3,5) = (2,8,8)<br>• P3 (0,0,2) ✓ → (2,8,8) + (0,6,3) = (2,14,11)<br>• P4 (0,6,4) ✓ → (2,14,11) + (0,0,1) = (2,14,12)<br>• P1 (0,7,5) ✓ → (2,14,12) + (1,0,0) = (3,14,12) = الإجماليات ✓<br><b>Safe</b>، والـ sequence هي <b>&lt;P0, P2, P3, P4, P1&gt;</b>.` },
    ] },
    { items: [
      { why: `Topic 1.`, ans: `برنامج بيقف وسيط بين الـ user والـ hardware. الـ OS هو <b>resource allocator</b> (بيدير كل الـ resources؛ وبيحكم بين الطلبات المتعارضة عشان الاستخدام يبقى efficient وعادل) و<b>control program</b> (بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط). البرنامج الوحيد اللي شغال طول الوقت هو الـ <b>kernel</b>؛ وأي حاجة تانية system program أو application program.` },
      { why: `Topic 2.`, ans: `الـ Short-term (CPU scheduler): بيختار الـ ready process الجاية للـ CPU؛ بيشتغل كل كام ms، فلازم يبقى سريع.<br>الـ Medium-term: بيعمل swap للـ processes من الـ memory للـ disk ويرجّعها تاني، عشان يقلل الـ degree of multiprogramming.<br>الـ Long-term (job scheduler): بيختار أنهي processes تدخل الـ ready queue؛ بيشتغل قليل (ثواني، دقايق)؛ وبيتحكم في الـ degree of multiprogramming.` },
      { why: `Topic 3، slides 3–5.`, ans: `<b>Non-preemptive</b>: الـ scheduling بيحصل بس لما الـ process تتحول من running لـ waiting أو تخلص (الحالات 1 و4). أول ما الـ process تاخد الـ CPU بتفضل ماسكاه لحد ما تسيبه. أمثلة: FCFS، SJF، non-preemptive priority.<br><b>Preemptive</b>: الـ scheduling بيحصل كمان لما الـ process تروح من running → ready أو waiting → ready (الحالات 2 و3)، فالـ CPU ممكن يتاخد منها. أمثلة: RR، SRTF، preemptive priority. ممكن يعمل race conditions على الداتا المشتركة. بيستخدمه Windows وmacOS وLinux وUNIX.` },
      { why: `Topic 4.`, ans: `<table><tr><th>Paging</th><th>Segmentation</th></tr><tr><td>pages/frames ثابتة الحجم</td><td>segments منطقية أحجامها متغيرة</td></tr><tr><td>مش باين للـ user</td><td>بيطابق نظرة الـ user (main، stack، functions…)</td></tr><tr><td>الـ Address (page p، offset d)؛ الـ page table بتعمل mapping من p → frame</td><td>الـ Address (segment s، offset d)؛ الـ segment table فيها base + limit</td></tr><tr><td>مفيش external fragmentation؛ فيه internal fragmentation</td><td>مفيش internal؛ فيه external fragmentation</td></tr></table>` },
      { why: `Topic 6.`, ans: `<b>الشروط</b>: mutual exclusion، hold and wait، no preemption، circular wait (الأربعة مع بعض في نفس الوقت).<br><b>الـ Prevention</b> (امنع شرط واحد):<br>• الـ Mutual exclusion: مش مطلوب للـ resources اللي ينفع تتشارك (read-only files)، بس لازم يتحقق للـ resources اللي ماينفعش تتشارك.<br>• الـ Hold and wait: اطلب كل الـ resources قبل التنفيذ، أو اطلب بس وإنت مش ماسك حاجة (utilization واطي، starvation).<br>• الـ No preemption: الـ process اللي مش قادرة تاخد resource طلبته بتسيب كل الـ resources اللي ماسكاها.<br>• الـ Circular wait: ترتيب كامل (total ordering) للـ resource types؛ والطلب بترتيب تصاعدي.` },
      { why: `Topic 7.`, ans: `<b>Contiguous</b>: الـ file بياخد blocks ورا بعض؛ الـ directory بيحتفظ بالـ start + length؛ أحسن performance؛ المشاكل: external fragmentation، لازم تعرف الحجم، compaction.<br><b>Linked</b>: linked list من blocks متفرقة، كل واحد فيه pointer للي بعده؛ مفيش external fragmentation، مش محتاج الحجم؛ reliability ضعيفة، access بطيء، مساحة للـ pointers (ومنه نوع الـ FAT).<br><b>Indexed</b>: index block لكل file فيه pointers للـ blocks بتاعته؛ random access من غير external fragmentation؛ overhead الـ index-block.` },
      { why: `Topic 8، slide 16.`, ans: `لما interrupt يحصل، الـ process الشغالة بتتقاطع و<b>الـ state بتاعتها بتتحفظ في الـ PCB بتاعها</b>. وبعدين الـ <b>interrupt service routine</b> بتشتغل عشان تتعامل مع الـ interrupt. لما تخلص، <b>الـ state بتاعة الـ process بترجع</b> والـ process بتكمّل. فالـ overheads هي تكلفة <b>حفظ واسترجاع الـ process state</b> (context switches) وكمان تنفيذ الـ handler (ونسخ الداتا).` },
    ] },
  ] },
  { sections: [
    { items: [
      { why: `Topic 1، slides 12 و25.`, ans: `الـ <b>Interrupt</b>: غالبًا بيطلع من الـ <b>hardware</b> (زي device controller خلّص I/O)؛ asynchronous؛ بينقل التحكم للـ interrupt service routine عن طريق الـ interrupt vector.<br>الـ <b>Trap (exception)</b>: <b>interrupt جاي من الـ software</b> سببه يا <b>error</b> (القسمة على صفر، invalid memory access) يا <b>طلب من الـ user</b> لخدمة من الـ OS (system call)؛ synchronous مع البرنامج اللي شغال.` },
      { why: `ده بيجمع Topic 1 (الـ dual mode، الـ timer)، وTopic 4 (base/limit) والـ protection. أي تلات mechanisms متشرحين كويس بياخدوا الدرجات.`, ans: `1. <b>الـ Dual-mode operation / الـ privileged instructions</b>: الـ user processes بتشتغل في الـ user mode ومش بتقدر تنفذ privileged instructions (I/O، timer، memory-management registers)؛ الـ kernel بس هو اللي يقدر.<br>2. <b>الـ Memory protection</b>: الـ base والـ limit (relocation) registers أو الـ page/segment tables، عشان الـ process توصل بس للـ address space بتاعها؛ وأي access تاني بيعمل trap.<br>3. <b>حماية الـ CPU بالـ timer</b>: الـ timer بيعمل interrupt للـ process اللي بتشتغل وقت طويل أو بتلف للأبد، فالـ OS بيرجع ياخد التحكم ومفيش process تقدر تحتكر الـ CPU.<br>(وكمان: الـ I/O بس عن طريق system calls؛ والتحكم في الوصول للـ files بالـ user/group IDs.)` },
      { why: `Topic 2، slide 5.`, ans: `<pre>new --admitted--> ready --scheduler dispatch--> running --exit--> terminated
ready <--interrupt-- running
running --I/O or event wait--> waiting --I/O or event completion--> ready</pre>new: بتتعمل؛ ready: مستنية تاخد processor؛ running: الـ instructions بتتنفذ؛ waiting: مستنية event؛ terminated: خلصت.` },
      { why: `Topic 2، slides الـ IPC.`, ans: `<b>Shared memory</b>: منطقة memory متشاركة بين الـ processes اللي عايزة تتواصل. التواصل تحت تحكم الـ user processes، مش الـ OS. المشكلة الكبيرة هي الـ synchronization بين أفعالهم (زي الـ bounded-buffer producer–consumer بالـ in/out indices، اللي يقدر يستخدم بس BUFFER_SIZE − 1 slots). وهو سريع.<br><b>Message passing</b>: الـ processes بتتواصل وتعمل synchronize من غير shared variables، باستخدام send(message) وreceive(message) على communication link. الـ link يا physical (shared memory، bus، network) يا logical: direct (send(P, msg)) أو indirect عن طريق mailboxes (send(A, msg))؛ blocking (synchronous) أو non-blocking (asynchronous)؛ وbuffering يا zero يا bounded يا unbounded.` },
      { why: `Topic 4.`, ans: `الـ Paging: pages ثابتة الحجم، مش باينة للـ user، address (p, d)، page table، internal fragmentation بس.<br>الـ Segmentation: segments منطقية أحجامها متغيرة (نظرة الـ user)، address (s, d)، segment table فيها base وlimit، external fragmentation بس؛ والـ protection والمشاركة بييجوا طبيعي لكل segment.` },
      { why: `Topic 6، slide 3.`, ans: `Mutual exclusion؛ hold and wait؛ no preemption؛ circular wait. الأربعة لازم يتحققوا مع بعض في نفس الوقت (شوف تعريفات Topic 6).` },
      { why: `Topic 7.`, ans: `Contiguous (start + length؛ سريع؛ external fragmentation)، linked (list من blocks متفرقة بـ pointers؛ مفيش external fragmentation؛ direct access بطيء، reliability)، indexed (index block فيه pointers؛ random access؛ overhead للـ index).` },
      { why: `Topic 8.`, ans: `بينقل blocks مباشرة بين الجهاز والـ memory من غير تدخل الـ CPU؛ interrupt واحد لكل block بدل لكل byte؛ بيفضّي الـ CPU لشغل تاني؛ مناسب للأجهزة السريعة اللي بتنقل بسرعة قريبة من سرعة الـ memory؛ أكفأ من الـ programmed I/O رغم الـ cycle stealing.` },
    ] },
    { items: [
      { why: `ده الـ data set بتاع الكتاب (Silberschatz 5.x). مثال الـ priority في المحاضرة بيستخدم نفس الـ bursts بس P3 = 4 وP4 = 5، وده بيدّي نفس الـ chart بتاع 8.2.`, ans: `<b>FCFS</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P5</th></tr><tr><td>0–10</td><td>10–11</td><td>11–13</td><td>13–14</td><td>14–19</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>10</td><td>10</td><td><b>0</b></td></tr><tr><td>P2</td><td>1</td><td>11</td><td>11</td><td><b>10</b></td></tr><tr><td>P3</td><td>2</td><td>13</td><td>13</td><td><b>11</b></td></tr><tr><td>P4</td><td>1</td><td>14</td><td>14</td><td><b>13</b></td></tr><tr><td>P5</td><td>5</td><td>19</td><td>19</td><td><b>14</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>67/5 = 13.4</td><td><b>48/5 = 9.6</b></td></tr></table><b>SJF</b> (تعادل P2/P4 = 1 → P2 الأول)<table><tr><th>P2</th><th>P4</th><th>P3</th><th>P5</th><th>P1</th></tr><tr><td>0–1</td><td>1–2</td><td>2–4</td><td>4–9</td><td>9–19</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>19</td><td>19</td><td><b>9</b></td></tr><tr><td>P2</td><td>1</td><td>1</td><td>1</td><td><b>0</b></td></tr><tr><td>P3</td><td>2</td><td>4</td><td>4</td><td><b>2</b></td></tr><tr><td>P4</td><td>1</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>P5</td><td>5</td><td>9</td><td>9</td><td><b>4</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>35/5 = 7</td><td><b>16/5 = 3.2</b></td></tr></table><b>Non-preemptive priority</b> (P1 وP3 الاتنين priority 3 → بترتيب الـ FCFS: P1 قبل P3)<table><tr><th>P2</th><th>P5</th><th>P1</th><th>P3</th><th>P4</th></tr><tr><td>0–1</td><td>1–6</td><td>6–16</td><td>16–18</td><td>18–19</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>16</td><td>16</td><td><b>6</b></td></tr><tr><td>P2</td><td>1</td><td>1</td><td>1</td><td><b>0</b></td></tr><tr><td>P3</td><td>2</td><td>18</td><td>18</td><td><b>16</b></td></tr><tr><td>P4</td><td>1</td><td>19</td><td>19</td><td><b>18</b></td></tr><tr><td>P5</td><td>5</td><td>6</td><td>6</td><td><b>1</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>60/5 = 12</td><td><b>41/5 = 8.2</b></td></tr></table><b>RR (q = 1)</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P5</th><th>P1</th><th>P3</th><th>P5</th><th>P1</th><th>P5</th><th>P1</th><th>P5</th><th>P1</th><th>P5</th><th>P1</th></tr><tr><td>0–1</td><td>1–2</td><td>2–3</td><td>3–4</td><td>4–5</td><td>5–6</td><td>6–7</td><td>7–8</td><td>8–9</td><td>9–10</td><td>10–11</td><td>11–12</td><td>12–13</td><td>13–14</td><td>14–19</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>19</td><td>19</td><td><b>9</b></td></tr><tr><td>P2</td><td>1</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>P3</td><td>2</td><td>7</td><td>7</td><td><b>5</b></td></tr><tr><td>P4</td><td>1</td><td>4</td><td>4</td><td><b>3</b></td></tr><tr><td>P5</td><td>5</td><td>14</td><td>14</td><td><b>9</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>46/5 = 9.2</td><td><b>27/5 = 5.4</b></td></tr></table>أقل متوسط waiting time: <b>SJF (3.2 ms)</b>.` },
      { why: `خلي بالك الـ partitions مختلفة عن المحاضرة (150 و250 بدل 100 و200). مع الـ first-fit، الـ 112K دلوقتي بيروح الـ partition اللي 150K (أول واحد ينفع)، مش الـ 288K المتبقي.`, ans: `<table><tr><th>Process</th><th>First-fit</th><th>Best-fit</th><th>Worst-fit</th></tr><tr><td>212K</td><td>500K (فاضل 288)</td><td>250K (فاضل 38)</td><td>600K (فاضل 388)</td></tr><tr><td>417K</td><td>600K (فاضل 183)</td><td>500K (فاضل 83)</td><td>500K (فاضل 83)</td></tr><tr><td>112K</td><td>150K (فاضل 38)</td><td>150K (فاضل 38)</td><td>الـ hole اللي 388K في الـ 600K (فاضل 276)</td></tr><tr><td>426K</td><td><b>لازم يستنى</b> (الـ holes 38، 288، 250، 300، 183)</td><td>600K (فاضل 174)</td><td><b>لازم يستنى</b> (أكبر hole هو 300)</td></tr></table>الـ <b>Best-fit</b> هو الأكفأ: هو الوحيد اللي بيحط الأربعة.` },
      { why: `دول أول 16 reference من string المحاضرة. الـ "0,3" الزيادة مقارنة بـ string الـ 2026 الاتنين hits، فالأعداد بتساوي إجابات 2026 (11 / 8 / 10).`, ans: `<b>FIFO = 11</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td>1</td><td><b>0</b></td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td></td><td></td><td>F</td></tr></table><br><b>Optimal = 8</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td></td><td></td><td>F</td></tr></table><br><b>LRU = 10</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>1</b></td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td></td><td></td><td>F</td></tr></table>` },
      { why: `نفس الـ snapshot ده موجود في final 2024/25. شوف الورقة دي عشان الـ Work vectors خطوة بخطوة.`, ans: `<b>a. Need</b>: P0 0000، P1 0750، P2 1002، P3 0020، P4 0642.<br><b>b.</b> Work 1520 → P0 → 1532 → P2 (1002 ≤ 1532) → 2886 → P3 (0020) → 2 14 11 8 → P4 (0642) → 2 14 12 12 → P1 (0750) → 3 14 12 12.<br><b>Safe</b>: &lt;P0, P2, P3, P4, P1&gt;.` },
    ] },
  ] },
  { sections: [
    { items: [
      { why: `Topic 1.`, ans: `وسيط بين الـ user والـ hardware؛ resource allocator (بيدير الـ resources، ويحل الطلبات المتعارضة بكفاءة وعدل) وcontrol program (بيتحكم في التنفيذ عشان يمنع الأخطاء والاستخدام الغلط). الـ kernel هو البرنامج الوحيد اللي شغال طول الوقت؛ وأي حاجة تانية system program أو application program.` },
      { why: `Topic 1، slide 36.`, ans: `<b>Protection</b>: أي mechanism بيتحكم في access الـ processes أو الـ users للـ resources اللي الـ OS معرّفها (زي الـ user IDs، الـ group IDs، الـ file permissions، الـ memory protection).<br><b>Security</b>: دفاع السيستم ضد الهجمات الداخلية والخارجية زي الـ denial-of-service، الـ viruses، الـ identity theft والـ theft of service.` },
      { why: `Topic 2، slide 12.`, ans: `<b>I/O-bound</b>: بيقضي وقت في الـ I/O أكتر من الحسابات؛ CPU bursts قصيرة وكتير.<br><b>CPU-bound</b>: بيقضي وقت أكتر في الحسابات؛ CPU bursts قليلة وطويلة جدًا.<br>الـ long-term scheduler لازم يختار خلطة كويسة من الاتنين.` },
      { why: `Topic 3، slides 7–8.`, ans: `الـ CPU utilization (max)، الـ throughput (max: الـ processes اللي بتخلص في وحدة الزمن)، الـ turnaround time (min: وقت تنفيذ الـ process)، الـ waiting time (min: الوقت في الـ ready queue)، الـ response time (min: الوقت من الـ request لأول response).` },
    ] },
    { items: [
      { why: `كله بيوصل عند 0، فالـ WT = وقت البداية.`, ans: `<b>FCFS</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–10</td><td>10–13</td><td>13–15</td><td>15–16</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>10</td><td>10</td><td><b>0</b></td></tr><tr><td>P2</td><td>3</td><td>13</td><td>13</td><td><b>10</b></td></tr><tr><td>P3</td><td>2</td><td>15</td><td>15</td><td><b>13</b></td></tr><tr><td>P4</td><td>1</td><td>16</td><td>16</td><td><b>15</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>54/4 = 13.5</td><td><b>38/4 = 9.5</b></td></tr></table><b>Priority</b><table><tr><th>P2</th><th>P3</th><th>P1</th><th>P4</th></tr><tr><td>0–3</td><td>3–5</td><td>5–15</td><td>15–16</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>15</td><td>15</td><td><b>5</b></td></tr><tr><td>P2</td><td>3</td><td>3</td><td>3</td><td><b>0</b></td></tr><tr><td>P3</td><td>2</td><td>5</td><td>5</td><td><b>3</b></td></tr><tr><td>P4</td><td>1</td><td>16</td><td>16</td><td><b>15</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>39/4 = 9.75</td><td><b>23/4 = 5.75</b></td></tr></table>` },
    ] },
    { items: [
      { why: `Topic 1، slide 4.`, ans: `الـ <b>Hardware</b> (الـ resources الأساسية للحسابات: CPU، memory، I/O devices)؛ الـ <b>operating system</b> (بيتحكم وينسّق استخدام الـ hardware بين الـ applications والـ users)؛ الـ <b>application programs</b> (بتحدد إزاي الـ resources تتستخدم عشان تحل مشاكل الـ users: word processors، compilers، browsers، databases، games)؛ الـ <b>users</b> (ناس، أجهزة، كمبيوترات تانية).` },
      { why: `Topic 1، slides 26–27.`, ans: `الـ Dual-mode operation بتخلي الـ OS يحمي نفسه. فيه hardware <b>mode bit</b> بيفرّق بين الـ <b>kernel mode (0)</b> والـ <b>user mode (1)</b>. الـ Privileged instructions تتنفذ بس في الـ kernel mode. الـ system call بتحوّل لـ kernel mode، والرجوع بيرجّعه user mode. برامج الـ user بتشتغل في الـ user mode بـ access محدود؛ والـ OS بيشتغل في الـ kernel mode بـ access كامل.` },
      { why: `Topic 2.`, ans: `الـ Short-term: بيختار الـ ready process الجاية للـ CPU؛ كتير جدًا (ms)؛ لازم يبقى سريع. الـ Long-term: بيختار أنهي processes تدخل الـ ready queue؛ قليل (ثواني، دقايق)؛ بيتحكم في الـ degree of multiprogramming.` },
      { why: `Topic 3.`, ans: `الـ Non-preemptive: الـ CPU بيتساب بس لما الـ process تخلص أو تستنى (الحالات 1 و4). الـ Preemptive: الـ CPU ممكن كمان يتاخد لما الـ process تروح ready (الحالات 2 و3)، زي الـ timer أو priority أعلى؛ وممكن يعمل race conditions.` },
    ] },
    { items: [
      { why: `في الـ RR q = 1: P4 بتخلص عند 4، وP3 عند 7، وP2 عند 9، وP1 بتشتغل لوحدها من 9 لـ 16. الـ SJF (2.5) أحسن من الـ RR (5).`, ans: `<b>SJF</b><table><tr><th>P4</th><th>P3</th><th>P2</th><th>P1</th></tr><tr><td>0–1</td><td>1–3</td><td>3–6</td><td>6–16</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>16</td><td>16</td><td><b>6</b></td></tr><tr><td>P2</td><td>3</td><td>6</td><td>6</td><td><b>3</b></td></tr><tr><td>P3</td><td>2</td><td>3</td><td>3</td><td><b>1</b></td></tr><tr><td>P4</td><td>1</td><td>1</td><td>1</td><td><b>0</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>26/4 = 6.5</td><td><b>10/4 = 2.5</b></td></tr></table><b>RR (q = 1)</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P1</th><th>P2</th><th>P3</th><th>P1</th><th>P2</th><th>P1</th></tr><tr><td>0–1</td><td>1–2</td><td>2–3</td><td>3–4</td><td>4–5</td><td>5–6</td><td>6–7</td><td>7–8</td><td>8–9</td><td>9–16</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>16</td><td>16</td><td><b>6</b></td></tr><tr><td>P2</td><td>3</td><td>9</td><td>9</td><td><b>6</b></td></tr><tr><td>P3</td><td>2</td><td>7</td><td>7</td><td><b>5</b></td></tr><tr><td>P4</td><td>1</td><td>4</td><td>4</td><td><b>3</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>36/4 = 9</td><td><b>20/4 = 5</b></td></tr></table>` },
    ] },
  ] },
];

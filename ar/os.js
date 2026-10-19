// Egyptian Arabic for Operating Systems, aligned item by item with os.js and extra/os.js.
window.AR = window.AR || {};
AR.os = {
 "lectures": {
  "1": {
   "notes": [
    {
     "h": "يعني إيه operating system؟ أهدافه والـ 4 components",
     "pts": [
      "الـ <b>OS</b> = برنامج بيقف <b>وسيط بين الـ user</b> بتاع الكمبيوتر <b>وبين الـ hardware</b>.",
      "<b>أهداف الـ OS (3)</b>: (1) إنه <b>يشغّل برامج الـ user</b> ويسهّل حل مشاكل الـ user؛ (2) يخلّي الـ computer system <b>مريح (convenient)</b> في الاستخدام؛ (3) يستخدم الـ hardware بطريقة <b>efficient</b>.",
      "الرسمة المتقسمة طبقات \"Four Components of a Computer System\": الـ users من 1 لـ n فوق، وبعدهم الـ system والـ application programs (زي الـ compiler والـ assembler والـ text editor والـ database system)، وبعدهم الـ operating system، وتحت خالص الـ computer hardware."
     ],
     "figH": {
      "os-four-components": "الـ 4 components بتوع الـ computer system، طبقة ورا طبقة"
     }
    },
    {
     "h": "الـ OS بيعمل إيه، تعريفه، وإزاي الكمبيوتر بيبدأ (startup)",
     "pts": [
      "ده <b>بيعتمد على وجهة النظر</b>: الـ users عايزين راحة و<b>سهولة استخدام</b> و<b>performance كويس</b> ومش فارق معاهم الـ resource utilization؛ الكمبيوتر المشترك (زي الـ <b>mainframe</b> والـ <b>minicomputer</b>) لازم يرضّي كل الـ users؛ الـ <b>workstations</b> ليها resources خاصة بيها بس غالبًا بتستخدم resources مشتركة من الـ <b>servers</b>؛ الأجهزة الـ <b>handheld</b> فقيرة في الـ resources ومتظبطة للـ usability وعمر البطارية؛ وفيه كمبيوترات (الـ <b>embedded</b> computers اللي في الأجهزة والعربيات) ملهاش user interface تقريبًا أو خالص.",
      "<b>الـ OS هو resource allocator</b>: بيدير كل الـ resources وبيحكم بين الطلبات اللي بتتعارض عشان الاستخدام يبقى efficient وعادل.",
      "<b>الـ OS هو control program</b>: بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط للكمبيوتر.",
      "مفيش تعريف واحد متفق عليه. \"كل حاجة الـ vendor بيبعتهالك لما تطلب OS\" تقريب كويس (بس بيختلف جدًا).",
      "الـ <b>Kernel</b> = \"البرنامج الوحيد اللي شغال طول الوقت على الكمبيوتر\". أي حاجة تانية يا إما <b>system program</b> (جاي مع الـ OS) يا إما <b>application program</b>.",
      "الـ <b>Bootstrap program</b>: بيتحمّل أول ما الجهاز يشتغل أو يعمل reboot؛ غالبًا متخزن في <b>ROM أو EPROM</b> (اسمها <b>firmware</b>)؛ بيعمل initialize لكل حاجة في السيستم؛ و<b>بيحمّل الـ OS kernel ويبدأ تشغيله</b>."
     ],
     "figH": {
      "os-startup": "تشغيل الكمبيوتر: من لحظة الـ power-up لحد ما الـ OS يشتغل"
     }
    },
    {
     "h": "تنظيم الـ computer system والـ interrupts",
     "pts": [
      "CPU أو أكتر والـ device controllers متوصلين ببعض عن طريق <b>common bus</b> بيدّيهم access لـ <b>shared memory</b>؛ الـ CPUs والأجهزة بيشتغلوا في نفس الوقت وبيتنافسوا على الـ memory cycles. والرسمة (slide 10، اسمها Computer-system operation) فيها الـ CPU، والـ disk controller ومعاه الـ disks، والـ USB controller ومعاه الـ mouse والـ keyboard والـ printer، والـ graphics adapter ومعاه الـ monitor، وكلهم على common bus واصل للـ memory.",
      "الـ I/O devices والـ CPU بيشتغلوا <b>concurrently</b>. كل <b>device controller</b> مسؤول عن نوع معين من الأجهزة وعنده <b>local buffer</b>. الـ CPU بينقل الداتا بين الـ main memory والـ local buffers؛ والـ I/O بيبقى من الجهاز للـ local buffer بتاع الـ controller.",
      "الـ device controller بيبلّغ الـ CPU إنه خلّص شغله عن طريق إنه يعمل <b>interrupt</b>.",
      "الـ interrupt بينقل التحكم للـ <b>interrupt service routine</b>، غالبًا عن طريق الـ <b>interrupt vector</b> (فيه عناوين كل الـ service routines). والـ interrupt architecture لازم <b>تحفظ عنوان الـ instruction اللي اتقاطعت</b>.",
      "الـ <b>trap</b> (أو <b>exception</b>) هو <b>interrupt جاي من الـ software</b> سببه يا إما <b>error</b> يا إما <b>طلب من الـ user</b>. الـ OS هو <b>interrupt driven</b>.",
      "<b>التعامل مع الـ interrupt</b>: الـ OS بيحفظ حالة الـ CPU بإنه يخزن الـ registers والـ program counter؛ بيعرف نوع الـ interrupt اللي حصل عن طريق الـ <b>polling</b> أو الـ <b>vectored interrupt system</b>؛ وفيه أجزاء code منفصلة بتقرر هيتعمل إيه لكل نوع interrupt."
     ],
     "figH": {
      "os-sys-org": "تنظيم الـ computer system: الـ CPUs والـ device controllers على bus واحد",
      "os-interrupts": "الـ interrupt بيوصل للـ CPU إزاي وبيتعامل معاه إزاي"
     }
    },
    {
     "h": "الـ I/O structure، الـ storage، والـ DMA",
     "pts": [
      "<b>Synchronous I/O</b>: بعد ما الـ I/O يبدأ، التحكم بيرجع لبرنامج الـ user <b>بس لما الـ I/O يخلص</b> (wait instruction بتخلي الـ CPU idle لحد الـ interrupt الجاي، أو <b>wait loop</b> (تنافس على الوصول للـ memory))؛ بالكتير I/O request واحد مستني، مفيش I/O في نفس الوقت.",
      "<b>Asynchronous I/O</b>: بعد ما الـ I/O يبدأ، التحكم بيرجع لبرنامج الـ user <b>من غير ما يستنى</b> الـ I/O يخلص. الـ <b>System call</b>: طلب للـ OS إنه يسمح للـ user يستنى لحد ما الـ I/O يخلص. الـ <b>device-status table</b> فيها entry لكل I/O device بتوضح نوعه وعنوانه وحالته. والـ OS بيدوّر في الـ I/O device table عشان يعرف حالة الجهاز ويعدّل الـ entry <b>عشان يضيف فيها الـ interrupt</b>.",
      "تعريفات الـ storage: الوحدة الأساسية للـ storage في الكمبيوتر هي الـ <b>bit</b>، وممكن يشيل قيمة من اتنين، 0 أو 1. أي storage تاني في الكمبيوتر مبني على <b>مجموعات من الـ bits</b>؛ ولو عندك bits كفاية، الكمبيوتر يقدر يمثّل أرقام وحروف وصور وأفلام وأصوات وdocuments وبرامج، وغيرهم. الـ <b>byte</b> = 8 bits، وفي أغلب الكمبيوترات هو أصغر حتة storage مريحة: مثلًا أغلب الكمبيوترات مفيهاش instruction تنقل bit بس فيها instruction تنقل byte. الـ <b>word</b> (مصطلح أقل استخدامًا) هي الوحدة الأساسية للداتا في الـ architecture بتاع الكمبيوتر، ومتكونة من byte أو أكتر: كمبيوتر عنده registers 64-bit و memory addressing 64-bit غالبًا الـ words بتاعته 64-bit (8 bytes). والكمبيوتر بينفذ عمليات كتير بحجم الـ word بتاعه مش byte byte.",
      "الـ storage في الكمبيوتر، ومعاه أغلب الـ throughput، بيتقاس ويتعامل معاه بالـ <b>bytes</b> ومجموعات الـ bytes:<span class=\"ltr\">KB (kilobyte) = 1,024 B<br>MB (megabyte) = 1,024² B<br>GB (gigabyte) = 1,024³ B<br>TB (terabyte) = 1,024⁴ B<br>PB (petabyte) = 1,024⁵ B</span>والمصنّعين غالبًا بيقرّبوا الأرقام دي ويقولوا إن الـ megabyte مليون byte والـ gigabyte مليار byte. قياسات الـ networking استثناء من القاعدة دي: بتتقاس بالـ <b>bits</b>، عشان الـ networks بتنقل الداتا bit bit.",
      "الـ <b>Main memory</b>: الـ storage الكبير الوحيد اللي الـ CPU يقدر يوصله مباشرة؛ random access؛ وغالبًا <b>volatile</b>. الـ <b>Secondary storage</b>: امتداد للـ main memory بمساحة كبيرة و<b>nonvolatile</b>.",
      "الـ <b>Hard disks</b>: أطباق (platters) معدن أو زجاج جامدة عليها مادة تسجيل مغناطيسي؛ سطح الديسك متقسم منطقيًا لـ <b>tracks</b>، وكل track متقسم لـ <b>sectors</b>؛ الـ <b>disk controller</b> بيحدد التعامل المنطقي بين الجهاز والكمبيوتر. الـ <b>Solid-state disks</b>: أسرع من الـ hard disks، وهي nonvolatile؛ فيها <b>technologies مختلفة</b>؛ وبقت منتشرة أكتر.",
      "الـ <b>Storage hierarchy</b> (من السريع الصغير الغالي للبطيء الكبير الرخيص):<span class=\"ltr\">registers → cache → main memory → solid-state disk → hard disk → optical disk → magnetic tapes</span>ومترتبة حسب <b>السرعة، التكلفة، والـ volatility</b>.",
      "الرسمة (slide 18، اسمها Storage-Device Hierarchy): هرم من 7 مستويات فوق بعض، الأضيق فوق والأعرض تحت:<span class=\"ltr\">registers, cache, main memory, solid-state disk, hard disk, optical disk, magnetic tapes</span>وبين كل مستويين جنب بعض فيه سهمين، واحد طالع لفوق وواحد نازل لتحت.",
      "الـ <b>Caching</b> <b>مبدأ مهم، بيتعمل على مستويات كتير</b> في الكمبيوتر (في الـ hardware، والـ operating system، والـ software): الداتا اللي بتستخدم بتتنسخ مؤقتًا من storage أبطأ لـ storage أسرع. الـ storage الأسرع (الـ cache) بيتشاف الأول عشان نعرف الداتا موجودة فيه ولا لأ: لو موجودة بتستخدمها من الـ cache على طول (سريع)؛ لو مش موجودة بتنسخها للـ cache وتستخدمها من هناك. الـ cache أصغر من الـ storage اللي بيعمله cache، فـ <b>الـ cache management مشكلة design مهمة</b>: حجم الـ cache والـ <b>replacement policy</b>. والـ main memory نفسها ممكن تعتبرها cache للـ secondary storage.",
      "<b>Device driver</b> لكل device controller <b>عشان يدير الـ I/O</b>: بيدّي interface موحد بين الـ controller والـ kernel.",
      "الـ <b>DMA (Direct Memory Access)</b>: بيستخدم مع <b>الـ I/O devices السريعة</b> اللي بتنقل بسرعة قريبة من سرعة الـ memory. الـ device controller بينقل <b>blocks</b> من الداتا من الـ buffer <b>مباشرة للـ main memory من غير تدخل الـ CPU</b>. <b>interrupt واحد بس لكل block</b>، بدل interrupt لكل byte.",
      "الرسمة (slide 20، اسمها Direct Memory Access Structure): الـ CPU (*N) جواه thread of execution و cache. بين الـ cache والـ memory (اللي فيها instructions و data) فيه سهمين في الاتجاهين: <b>instruction execution cycle</b> و<b>data movement</b>. وبين الـ CPU والـ device (*M) فيه 3 أسهم: <b>I/O request</b> (من الـ CPU للـ device)، <b>data</b> (في الاتجاهين)، و<b>interrupt</b> (من الـ device للـ CPU). وفيه سهم <b>DMA</b> في الاتجاهين بيوصّل الـ device بالـ memory مباشرة من غير ما يعدّي على الـ CPU."
     ],
     "figH": {
      "os-io-structure": "الـ I/O الـ synchronous والـ asynchronous: الـ control بيرجع للبرنامج إمتى",
      "os-units": "وحدات الـ storage: من الـ bit للـ bytes وأكبر",
      "os-storage-hierarchy": "ترتيب أجهزة الـ storage: السرعة والحجم والتكلفة",
      "os-caching": "الـ caching: بننسخ الـ data في storage أسرع",
      "os-dma": "تركيبة الـ direct memory access (DMA)",
      "os-dma-irq": "من غير DMA ومعاه: interrupt لكل byte قصاد interrupt واحد لكل block"
     }
    },
    {
     "h": "الـ performance بتاع مستويات الـ storage (slide 33)",
     "pts": [
      "النقل بين المستويات ممكن يكون explicit أو implicit. الداتا \"A\" بتنتقل كده:<span class=\"ltr\">disk → main memory → cache → hardware register</span>",
      "في الـ Multitasking: لازم دايمًا تستخدم <b>أحدث قيمة</b> أيًا كان مكانها. في الـ Multiprocessors: الـ hardware لازم يوفر <b>cache coherency</b> عشان كل الـ CPUs تشوف أحدث قيمة. في الـ Distributed systems: ممكن يبقى فيه كذا نسخة من نفس الداتا (أعقد كمان)."
     ],
     "figH": {
      "os-storage-levels": "مقارنة أداء مستويات الـ storage",
      "os-migrate": "الـ data \"A\" وهي طالعة من الـ disk لحد الـ register"
     }
    },
    {
     "h": "الـ computer-system architecture وهيكل الـ OS",
     "pts": [
      "أغلب الأنظمة بتستخدم general-purpose processor واحد (ومعاه special-purpose processors).",
      "أنظمة الـ <b>Multiprocessors</b> استخدامها وأهميتها بيزيدوا؛ واسمها كمان <b>parallel systems</b> أو <b>tightly-coupled systems</b>. مميزاتها:<br>(1) <b>increased throughput</b><br>(2) <b>economy of scale</b><br>(3) <b>increased reliability</b>.",
      "• في الـ <b>asymmetric multiprocessing</b> كل processor متخصصله <b>task معينة</b>.<br>• وفي الـ <b>symmetric multiprocessing (SMP)</b> كل processor بيعمل <b>كل الـ tasks</b>.",
      "الـ <b>Dual-core design</b> فيه multi-chip و<b>multicore</b>؛ كل core ليه الـ registers والـ cache بتوعه، وبيشاركوا الـ memory. وفيه أنظمة فيها كل الـ chips، يعني <b>chassis جواه كذا system منفصل</b>.",
      "شكل (slide 22، اسمها A Dual-Core Design): chip واحدة جواها مربعين، <b>CPU core0</b> و<b>CPU core1</b>؛ كل core ليه <b>registers</b> فوق الـ <b>cache</b> بتاعه. الخطوط اللي طالعة من الـ caches الاتنين بتتجمع وتنزل لـ <b>memory</b> واحدة برا الـ chip.",
      "شكل الـ memory في multiprogrammed system: الـ OS عند address 0، وبعده job 1 … job 4 لحد 512M."
     ],
     "figH": {
      "os-dualcore": "تصميم الـ dual-core: اتنين cores بيشاركوا memory واحدة",
      "os-multiprog": "الـ multiprogramming: الـ CPU يفضل شغال وهي الـ jobs مستنية الـ I/O"
     }
    },
    {
     "h": "عمليات الـ OS: الـ dual mode والـ timer",
     "pts": [
      "الـ OS <b>interrupt driven</b>، يعني فيه hardware interrupts من الأجهزة؛ و software interrupts (<b>exception أو trap</b>): software error (القسمة على صفر)، أو طلب خدمة من الـ OS؛ ومشاكل تانية زي الـ infinite loops والـ processes اللي بتعدّل في بعض.",
      "الـ <b>Dual-mode operation</b> بتخلي الـ OS يحمي نفسه وباقي الـ system components، وفيها وضعين: <b>user mode</b> و<b>kernel mode</b>. الـ <b>mode bit</b> جاي من الـ hardware، وبيدّي القدرة إننا نفرّق امتى السيستم بيشغّل user code وامتى بيشغّل kernel code (الـ <b>kernel بـ 0 والـ user بـ 1</b>).",
      "فيه instructions <b>privileged</b>، ماينفعش تتنفذ غير في الـ kernel mode. الـ <b>system call</b> بتغير الـ mode لـ kernel (بـ trap، والـ mode bit بيبقى 0)؛ والرجوع من الـ call بيرجّعه user (والـ mode bit بيبقى 1).",
      "الرسمة (slide 27، اسمها Transition from User to Kernel Mode): شريطين بينهم خط. الشريط اللي فوق هو الـ <b>user process</b> (user mode، والـ mode bit بيبقى 1): \"user process executing\" ← \"calls system call\". سهم مكتوب عليه <b><bdi>trap, mode bit = 0</bdi></b> بينزل للشريط اللي تحت، الـ <b>kernel</b> (kernel mode، والـ mode bit بيبقى 0)، لـ \"execute system call\". وبعدين سهم مكتوب عليه <b><bdi>return, mode bit = 1</bdi></b> بيطلع تاني لـ \"return from system call\" في شريط الـ user.",
      "الـ CPUs بقت بتدعم multi-mode operation أكتر، زي mode للـ <b>virtual machine manager (VMM)</b> عشان الـ guest VMs.",
      "الـ <b>Timer</b> بيمنع الـ infinite loop أو إن process تستحوذ على الـ resources: بيتظبط إنه يعمل interrupt بعد فترة؛ counter بيقل مع الـ physical clock؛ الـ OS هو اللي بيظبطه (<b>privileged instruction</b>)؛ بيعمل interrupt لما يوصل صفر؛ بيتظبط قبل ما الـ process تتعملها schedule عشان الـ OS يرجع ياخد التحكم أو يقفل برنامج عدّى الوقت المسموحله."
     ],
     "figH": {
      "os-intr-kinds": "interrupt من الـ hardware ولا من الـ software؟ صنّف الأحداث",
      "os-modes": "الـ dual mode: التحويل من الـ user mode للـ kernel mode والرجوع",
      "os-timer": "الـ timer: بيمنع أي process إنها تستولى على الـ CPU"
     }
    },
    {
     "h": "إدارة الـ process والـ memory والـ storage والـ I/O؛ الـ protection والـ security",
     "pts": [
      "الـ <b>Process</b> = برنامج شغال (program in execution)، وحدة شغل جوه السيستم. <b>الـ program حاجة passive، والـ process حاجة active</b>. الـ process محتاجة resources عشان تخلّص شغلها (زي الـ CPU والـ memory والـ I/O والـ files، وكمان initialization data)؛ ولما تخلص لازم الـ resources اللي ينفع تتستخدم تاني ترجع تتستخدم. الـ <b>single-threaded</b> process ليها <b>program counter واحد</b> بيحدد مكان الـ instruction الجاية اللي هتتنفذ؛ والـ process بتنفذ الـ instructions ورا بعض، واحدة واحدة، لحد ما تخلص. الـ <b>multi-threaded</b> process ليها <b>program counter لكل thread</b>. وغالبًا السيستم بيبقى فيه processes كتير، شوية user وشوية operating system، شغالين concurrently على CPU واحد أو أكتر: الـ concurrency بتحصل بتقسيم الـ CPUs بين الـ processes/threads.",
      "<b>أنشطة الـ process management</b>: إنشاء ومسح الـ user والـ system processes؛ عمل suspend وresume للـ processes؛ وتوفير mechanisms للـ <b>synchronization</b> والـ <b>communication</b> والتعامل مع الـ <b>deadlock</b>.",
      "عشان تشغّل برنامج، لازم كل (أو جزء من) الـ instructions تبقى في الـ memory، وكل (أو جزء من) الداتا اللي البرنامج محتاجها تبقى في الـ memory. الـ <b>Memory management</b> بيحدد إيه اللي يبقى في الـ memory وامتى، عشان يحسّن الـ CPU utilization وسرعة استجابة الكمبيوتر للـ users.",
      "<b>أنشطة الـ memory management</b>: متابعة أنهي أجزاء من الـ memory مستخدمة ومين بيستخدمها؛ تقرير أنهي processes وداتا تدخل الـ memory أو تخرج منها؛ و<b>allocating وdeallocating لمساحة الـ memory</b> حسب الحاجة.",
      "الـ <b>Storage management</b>: الـ OS بيدّي view موحد ومنطقي للـ data storage: بيحوّل الخصائص الفيزيائية لوحدة storage منطقية اسمها الـ <b>file</b>. كل medium بيتحكم فيه device (زي الـ disk drive والـ tape drive)؛ وخصائصه بتختلف في الـ access speed، والـ capacity، والـ data-transfer rate، والـ access method (sequential أو random). الـ <b>File-system management</b>: الـ files غالبًا بتتنظم في directories؛ وفي أغلب الأنظمة فيه access control بيحدد مين يقدر يوصل لإيه. أنشطة الـ OS: إنشاء ومسح الـ files والـ directories، والـ primitives للتعامل معاهم، وعمل mapping للـ files على الـ secondary storage، وعمل backup للـ files على storage media ثابتة (non-volatile).",
      "الـ <b>Mass-storage management</b>: غالبًا الـ disks بتستخدم عشان نخزن داتا مش هتكفي في الـ main memory أو داتا لازم تتحفظ فترة \"طويلة\". الإدارة الصح ليها <b>أهمية أساسية</b>: سرعة الكمبيوتر كلها متوقفة على الـ disk subsystem والـ algorithms بتاعته. أنشطة الـ OS: <b>الـ free-space management والـ storage allocation والـ disk scheduling</b>. فيه storage مش لازم يبقى سريع (‡ غالبًا اسمه tertiary storage): زي الـ optical storage والـ magnetic tape، وبرضه لازم يتدار (من الـ OS أو الـ applications)، وبيختلف ما بين <b>WORM</b> (اختصار لـ <bdi>write-once, read-many-times</bdi>) و<b>RW</b> (اختصار لـ read-write).",
      "من أغراض الـ OS إنه <b>يخبي تفاصيل الـ hardware devices</b> عن الـ user. والـ <b>I/O subsystem</b> مسؤول عن: memory management بتاع الـ I/O ومنها <b>buffering</b> (تخزين الداتا مؤقتًا وهي بتتنقل)، <b>caching</b> (تخزين أجزاء من الداتا في storage أسرع عشان الـ performance)، <b>spooling</b> (إن output بتاع job يتداخل مع input بتاع jobs تانية)؛ وinterface عام للـ device drivers؛ وdrivers لـ hardware devices معينة.",
      "الـ <b>Protection</b>: أي mechanism بي<b>تحكم في access</b> الـ processes أو الـ users للـ resources اللي الـ OS معرّفها. الـ <b>Security</b>: <b>دفاع</b> السيستم ضد <b>الهجمات</b> الداخلية والخارجية (زي الـ denial-of-service والـ viruses والـ identity theft والـ theft of service).",
      "الأنظمة غالبًا بتفرّق بين الـ users الأول، عشان تحدد مين يقدر يعمل إيه. هويات الـ users (<b>user IDs</b> أو security IDs) فيها اسم ورقم مربوط بيه، واحد لكل user؛ وبعدين الـ user ID بيتربط بكل الـ files والـ processes بتاعة الـ user ده عشان يتحدد الـ access control. الـ group identifier (<b>group ID</b>) بيسمح إننا نعرّف مجموعة users وندير الـ controls بتاعتهم، وبعدين بيتربط هو كمان بكل process وfile. والـ <b>privilege escalation</b> بتخلي الـ user يتحول لـ effective ID بصلاحيات أكتر."
     ]
    }
   ],
   "cards": [
    "برنامج بيقف وسيط بين الـ user بتاع الكمبيوتر والـ hardware.",
    "يشغّل برامج الـ user ويسهّل حل المشاكل؛ يخلي السيستم مريح في الاستخدام؛ يستخدم الـ hardware بكفاءة (efficiently).",
    "الـ hardware والـ operating system والـ application programs والـ users.",
    "بيدير كل الـ resources؛ وبيحكم بين الطلبات المتعارضة عشان الاستخدام يبقى efficient وعادل.",
    "بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط للكمبيوتر.",
    "البرنامج الوحيد اللي شغال طول الوقت على الكمبيوتر.",
    "بيتحمّل عند تشغيل الجهاز/الـ reboot من الـ ROM أو EPROM (firmware)؛ بيعمل initialize للسيستم، ويحمّل الـ kernel ويشغّله.",
    "interrupt جاي من الـ software سببه error أو طلب من الـ user.",
    "table فيها عناوين كل الـ interrupt service routines.",
    "الـ Polling، أو الـ vectored interrupt system.",
    "الـ controller بينقل blocks مباشرة بين الـ buffer والـ main memory من غير الـ CPU؛ interrupt واحد لكل block، مش لكل byte.",
    "الـ registers والـ cache والـ main memory والـ SSD والـ hard disk والـ optical disk والـ magnetic tape.",
    "الـ increased throughput والـ economy of scale والـ increased reliability.",
    "في الـ asymmetric كل processor ليه task معينة.<br>وفي الـ symmetric كل processor بيعمل كل الـ tasks.",
    "الـ kernel mode بـ 0، والـ user mode بـ 1.",
    "عشان يمنع الـ infinite loops أو إن process تستحوذ على الـ resources؛ الـ OS بيرجع ياخد التحكم لما الـ counter يوصل صفر.",
    "الـ Protection بتتحكم في الـ access للـ resources؛ الـ security بتدافع ضد الهجمات الداخلية والخارجية.",
    "الـ buffering: تخزين مؤقت أثناء النقل.<br>الـ caching: نسخة أسرع عشان الـ performance.<br>الـ spooling: الـ output بتاع job يتداخل مع الـ input بتاع jobs تانية."
   ],
   "qa": [
    "(1) يشغّل برامج الـ user ويسهّل حل مشاكل الـ user.<br>(2) يخلي الـ computer system مريح في الاستخدام.<br>(3) يستخدم الـ hardware بطريقة efficient.",
    "مفيش تعريف واحد متفق عليه. الـ OS برنامج بيقف وسيط بين الـ user والـ hardware. هو resource allocator (بيدير كل الـ resources وبيحكم بين الطلبات المتعارضة عشان الاستخدام يبقى efficient وعادل) وكمان control program (بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط). \"كل حاجة الـ vendor بيبعتها\" ده تقريب؛ والبرنامج الوحيد اللي شغال طول الوقت هو الـ kernel، وأي حاجة تانية يا system program يا application program.",
    "الـ interrupt غالبًا بيطلع من الـ hardware (زي device controller خلّص I/O) وبيبقى asynchronous؛ بينقل التحكم للـ interrupt service routine عن طريق الـ interrupt vector. الـ trap (exception) هو interrupt جاي من الـ software سببه يا error (زي القسمة على صفر أو invalid memory access) يا برنامج user بيطلب خدمة من الـ OS (system call).",
    "عشان الـ I/O devices السريعة اللي بتنقل بسرعة قريبة من سرعة الـ memory. الـ device controller بينقل blocks كاملة من الداتا من الـ buffer بتاعه مباشرة للـ main memory من غير تدخل الـ CPU، وبيعمل interrupt واحد بس لكل block بدل واحد لكل byte، فالـ CPU بيفضى لشغل تاني.",
    "الـ Multiprogramming (batch) بيحط كذا job في الـ memory عشان الـ CPU دايمًا يلاقي حاجة يشغلها؛ لما job تستنى (زي I/O) الـ OS بيحوّل لـ job تانية. هدفه كفاءة الـ CPU؛ ومفيش تفاعل مع الـ user. الـ Timesharing (multitasking) بيبدّل الـ CPU بين الـ jobs بسرعة جدًا لدرجة إن الـ users يقدروا يتفاعلوا مع كل برنامج شغال؛ الـ response time لازم يبقى أقل من ثانية، ومحتاج CPU scheduling وswapping وvirtual memory.",
    "فيه hardware mode bit بيفرّق بينهم (الـ kernel بـ 0 والـ user بـ 1). في الـ kernel mode الـ OS يقدر ينفذ privileged instructions ويوصل لكل الـ resources. في الـ user mode البرامج ماتقدرش تنفذ privileged instructions. الـ system call بتعمل trap للـ kernel mode والرجوع بيرجّعه user mode. ده بيحمي الـ OS وباقي الـ components من برامج الـ user.",
    "(1) الـ Hardware: بيوفر الـ computing resources الأساسية (الـ CPU والـ memory والـ I/O devices).<br>(2) الـ Operating system: بيتحكم وينسّق استخدام الـ hardware بين الـ applications والـ users المختلفين.<br>(3) الـ Application programs: بتحدد الطرق اللي بتستخدم بيها resources السيستم عشان تحل مشاكل الـ users الحسابية (زي الـ word processors والـ compilers والـ web browsers والـ database systems والـ video games).<br>(4) الـ Users: ناس، أجهزة، كمبيوترات تانية.",
    "الـ bootstrap program بيتحمّل أول ما الجهاز يشتغل أو يعمل reboot. غالبًا متخزن في ROM أو EPROM (اسمها firmware). بيعمل initialize لكل حاجة في السيستم، وبيحمّل الـ operating system kernel ويبدأ تشغيله.",
    "أنظمة الـ multiprocessor استخدامها وأهميتها بيزيدوا؛ واسمها كمان parallel systems أو tightly-coupled systems. مميزاتها: 1) increased throughput، 2) economy of scale، 3) increased reliability. ليها نوعين: الـ asymmetric multiprocessing، وفيه كل processor متخصصله task معينة؛ والـ symmetric multiprocessing (SMP)، وفيه كل processor بيعمل كل الـ tasks.",
    "الـ Protection هي أي mechanism بيتحكم في access الـ processes أو الـ users للـ resources اللي الـ OS معرّفها. الـ Security هي دفاع السيستم ضد الهجمات الداخلية والخارجية، زي الـ denial-of-service والـ viruses والـ identity theft والـ theft of service."
   ],
   "quiz": [
    [
     "صح. الـ Static RAM هي أسرع RAM (بتستخدم في الـ caches، \"CMOS SRAM\" في جدول الـ storage) وهي volatile.",
     "Volatile، بس أبطأ من الـ SRAM عشان لازم تتعملها refresh. وفي الواقع هي اللي بتستخدم للـ main memory. خلي بالك إن جدول الـ storage في الـ slide (slide 33) كاتب \"CMOS SRAM\" كـ technology للـ main memory؛ ‡ بس الـ main memory الحقيقية DRAM.",
     "ذاكرة read-only و non-volatile (زي المكان اللي الـ bootstrap متخزن فيه).",
     "الـ EEPROM دي non-volatile (بتحتفظ بالداتا من غير كهربا) وكمان بطيئة في الكتابة، فهي غلط من الناحيتين: لا هي الأسرع ولا هي volatile."
    ],
    [
     "الـ RAM هي الـ main (primary) memory، مش secondary storage.",
     "الـ SSDs أسرع وبقت منتشرة، بس الإجابة الكلاسيك هي الـ magnetic disk.",
     "الـ magnetic tape بطيء وsequential-access، وبيستخدموه للـ backup والأرشيف (ده اللي الـ slide بتقول عليه \"some storage need not be fast\"، Topic 1، جزء Mass-Storage Management؛ ‡ غالبًا اسمه tertiary storage)، مش هو الـ secondary storage المنتشر.",
     "صح. الـ hard (magnetic) disk هو أشهر secondary storage."
    ],
    [
     "صح. الـ access في الـ Flash (SSD) بياخد 25,000–50,000 ns مقابل 80–250 ns للـ main memory، والـ flash بتبقى nonvolatile.",
     "هي صح: الـ flash بتبقى nonvolatile وأبطأ من الـ DRAM."
    ],
    [
     "صح. الـ hardware interrupts جاية من الأجهزة؛ والـ software interrupts هي traps/exceptions (errors أو system calls).",
     "الـ slides بتقول إن الـ OS interrupt driven من الـ hardware والـ software الاتنين."
    ],
    [
     "الـ kernel هو البرنامج الوحيد اللي شغال طول الوقت. الـ system والـ application programs هم كل الباقي.",
     "صح. أي حاجة غير الـ kernel يا system program يا application program."
    ],
    [
     "الـ RAM بتبقى volatile، فالـ bootstrap كان هيضيع لما الجهاز يطفي.",
     "صح. الـ bootstrap متخزن في ROM أو EPROM (firmware)."
    ],
    [
     "ده مكتوب صريح كـ activity من أنشطة الـ memory management.",
     "صح. أنشطة الـ memory management: متابعة الـ memory المستخدمة، تقرير إيه يدخل/يخرج، وallocating/deallocating للمساحة."
    ],
    [
     "صح. الـ SSDs أسرع من الـ hard disks وnonvolatile.",
     "الـ slide بتقول: \"Solid-state disks – faster than hard disks\"."
    ],
    [
     "الإشارة اللي بيبعتها الـ device controller لما يخلّص عملية دي اسمها hardware interrupt. الـ trap بيطلع من الـ software، مش من device (Topic 1).",
     "صح. المحاضرة بتعرّف الـ trap أو الـ exception إنه software-generated interrupt سببه يا إما error (زي القسمة على صفر) يا إما طلب من الـ user لخدمة من الـ OS (Topic 1، جزء Common Functions of Interrupts).",
     "الجدول اللي فيه عناوين كل الـ interrupt service routines ده اسمه الـ interrupt vector، والـ CPU بيستخدمه عشان يلاقي الـ handler الصح؛ ده مش trap.",
     "ضبط الـ timer ده privileged instruction الـ OS بينفذها في الـ kernel mode عشان يرجع ياخد الكنترول بعدين. الـ trap ده interrupt event، مش instruction للـ timer."
    ],
    [
     "الـ main memory بتبقى volatile وفاضية لما الجهاز يشتغل.",
     "صح. الـ bootstrap program بيشتغل أول ما الجهاز يفتح أو يعمل reboot، فلازم يكون محطوط في ROM أو EPROM اللي هي non-volatile (firmware)؛ هو اللي بيعمل initialize للسيستم ويحمّل الـ kernel (Topic 1، جزء Computer Startup).",
     "الـ cache ذاكرة صغيرة وسريعة بس volatile، فبتبقى فاضية أول ما الجهاز يفتح ومينفعش تشيل البرنامج اللي بيشغّل الكمبيوتر؛ الـ bootstrap موجود في الـ ROM/EPROM.",
     "الـ kernel على الـ disk، بس الـ bootstrap اللي بيحمّله موجود في الـ firmware."
    ],
    [
     "interrupt لكل byte ده اللي بيحصل من غير DMA، لما الـ CPU ينقل كل byte بنفسه. الـ DMA معمول أصلًا عشان نتجنب ده مع الـ high-speed devices.",
     "interrupt لكل word برضه نقل الـ CPU هو اللي ماسكه بوحدات صغيرة. مع الـ DMA الـ controller بينقل الـ block كله ويعمل interrupt مرة واحدة بس لكل block.",
     "صح. الـ controller بينقل الـ block كله، وبعدين يعمل interrupt مرة واحدة.",
     "الـ controller لسه بيعمل interrupt مرة عشان يقول إنه خلّص."
    ],
    [
     "الـ increased throughput ده الميزة رقم 1 في ليستة المحاضرة: processors أكتر يعني شغل أكتر في وقت أقل، فهو مش الإجابة.",
     "الـ economy of scale ده الميزة رقم 2 في المحاضرة: الـ processors بيتشاركوا الـ peripherals والـ storage والكهربا، فالـ multiprocessor بيتكلف أقل من كذا system منفصلين.",
     "الـ increased reliability ده الميزة رقم 3 في المحاضرة: لو processor وقع الباقيين بيكمّلوا شغل (graceful degradation)، فهو موجود في الليستة.",
     "الاختيار الصح. المميزات التلاتة المذكورة هي الـ throughput والـ economy of scale والـ reliability."
    ],
    [
     "صح. الـ kernel بـ 0 والـ user بـ 1 (الـ system call بتخليه 0، والرجوع بيخليه 1).",
     "الـ 1 ده الـ mode bit بتاع الـ user mode. الـ system call بتقلبه 0 (kernel)، ولما الـ call ترجع بيرجع 1 تاني (Topic 1، جزء dual-mode operation).",
     "الـ dual mode فيه modeين بس، user وkernel، فالـ bit يا 0 يا 1. الـ modes الزيادة زي VMM mode بتيجي من الـ multi-mode CPUs، مش من الـ dual-mode bit.",
     "الـ mode bit الـ hardware هو اللي بيظبطه حسب الكود user ولا kernel؛ مالوش أي علاقة بالـ process priority، اللي دي تبع الـ CPU scheduling."
    ],
    [
     "إن كل processor ياخد task معينة ده تعريف المحاضرة للـ asymmetric multiprocessing، يعني عكس الـ SMP.",
     "صح. المحاضرة بتعرّف الـ symmetric multiprocessing إن كل processor بيعمل كل الـ tasks، أما في الـ asymmetric multiprocessing كل processor بياخد task معينة (Topic 1، جزء Multiprocessors).",
     "ده نوع من الـ asymmetric (master/slave) multiprocessing.",
     "الـ Multiprocessors بتبقى tightly coupled وبتشارك الـ memory."
    ]
   ],
   "extra": [
    [
     "بالعكس: في المحاضرة الـ kernel mode = 0 والـ user mode = 1، والبرنامج بيبدأ في الـ user mode.",
     "صح. الـ user mode قيمته 1، والـ system call بتعمل trap للـ kernel mode (0)، والرجوع من الـ call بيرجّع الـ bit للـ user mode (1).",
     "الـ system call لازم تحوّل للـ kernel mode، وإلا الـ privileged instructions ماكانتش هتتنفذ عشان الخدمة.",
     "برامج الـ user مابتشتغلش بالـ kernel-mode bit؛ ده كان هيبوّظ فكرة الـ dual-mode protection."
    ],
    [
     "لو كود الـ user يقدر يظبط الـ timer، الـ process كانت هتقدر تمسك الـ CPU للأبد، وده بالظبط اللي الـ timer بيمنعه.",
     "صح. الـ OS بيظبط الـ timer قبل ما يعمل schedule للـ process، وتحميله privileged instruction؛ ولما الـ counter يوصل صفر بيحصل interrupt يرجّع التحكم للـ OS."
    ],
    [
     "الـ interrupt vector فيه عناوين الـ interrupt service routines، مش حالة كل device.",
     "الـ page table بتعمل mapping للـ pages على الـ frames؛ مالهاش علاقة بحالة الأجهزة.",
     "صح. فيها entry لكل device (النوع، العنوان، الحالة)، والـ OS بيدوّر فيها عشان يلاقي حالة الجهاز ويعدّلها.",
     "الـ local buffer فيه الداتا اللي بتتنقل، مش المعلومات عن حالة كل device."
    ],
    [
     "الـ Registers أسرع من الـ cache، والـ solid-state disks فوق (أسرع من) الـ hard disks.",
     "الـ Cache لازم ييجي قبل الـ main memory: هو بين الـ registers والـ main memory.",
     "الـ Solid-state disks أسرع من الـ hard disks، فالـ SSD ييجي قبل الـ hard disk.",
     "صح. ده الـ hierarchy بتاع المحاضرة، مترتب حسب السرعة والتكلفة والـ volatility."
    ],
    [
     "صح. ده تعريف الـ spooling في المحاضرة.",
     "ده الـ buffering، مهمة تانية من مهام الـ I/O-subsystem.",
     "تخزين أجزاء من الداتا في storage أسرع عشان الـ performance ده تعريف المحاضرة للـ caching، وده دور تاني من أدوار الـ I/O subsystem غير الـ spooling.",
     "نقل block كامل من الـ buffer بتاع الـ controller للـ main memory من غير الـ CPU ده الـ DMA (Direct Memory Access)، مش spooling."
    ],
    [
     "الـ protection هي الـ mechanism اللي بيتحكم في access الـ processes أو الـ users للـ resources اللي الـ OS معرّفها؛ الدفاع ضد الهجمات ده security.",
     "صح. الـ Security هي الدفاع ضد الهجمات الداخلية والخارجية (زي الـ denial-of-service والـ viruses والـ identity theft والـ theft of service)؛ والـ protection هي access control."
    ],
    [
     "ده تقريب المصنّعين (1 MB ≈ مليون B)، مش اصطلاح الـ OS اللي هو 1,024² bytes.",
     "ده خلط بين الاصطلاحين (1.5 × 1,024 × 1,000)؛ الـ MB هو 1,024 × 1,024 bytes.",
     "صح. الحساب:<span class=\"ltr\">1.5 × 1,024 × 1,024 = 1.5 × 1,048,576 = 1,572,864 bytes</span>",
     "ده عدد الـ bits (× 8). السؤال عايز bytes."
    ],
    [
     "صح. الـ DMA بيعمل interrupt واحد لكل block (16 block)؛ وinterrupt لكل byte هيبقى 16 × 1,024 = 16,384.",
     "الـ DMA بيعمل interrupt مرة لكل block، مش مرة للنقل كله، و\"without\" معناها لكل byte، مش لكل block.",
     "بالعكس: الـ DMA هو اللي بيقلل الـ interrupts لواحد لكل block.",
     "الـ DMA لسه بيعمل interrupt للـ CPU مرة بعد كل block."
    ],
    [
     "دي الفكرة الأساسية للـ multiprogramming (batch systems)، والـ timesharing بيبني عليها.",
     "صح. الـ Timesharing بيبدّل الـ jobs كتير جدًا لدرجة إن الـ users يقدروا يتفاعلوا معاها؛ المحاضرة بتدّي هدف response time &lt; 1 second.",
     "ده وصف الـ multiprogramming اللي بيبدّل بس لما الـ job تستنى.",
     "ده الـ asymmetric multiprocessing، وده hardware architecture، مش timesharing."
    ],
    [
     "في جدول الـ storage levels، الـ cache بيديره الـ hardware، مش الـ compiler. الـ compiler بيدير الـ registers بس.",
     "الـ main memory بيديرها الـ operating system.",
     "الـ Solid-state disks بيديرها الـ operating system.",
     "صح. الـ compiler هو اللي بيقرر أنهي قيم تتحط في الـ registers (الحجم &lt; 1 KB، الـ access من 0.25–0.5 ns)."
    ]
   ]
  },
  "2": {
   "notes": [
    {
     "h": "مفهوم الـ Process",
     "pts": [
      "الـ OS بيشغّل برامج كتير مختلفة: الـ batch systems بتشغّل <b>jobs</b>؛ والـ time-shared systems بتشغّل <b>user programs أو tasks</b>. الكتاب بيستخدم job وprocess تقريبًا بنفس المعنى.",
      "الـ <b>Process</b> = برنامج شغال (program in execution)؛ والتنفيذ لازم يمشي بشكل <b>sequential</b>.",
      "أجزاء الـ process في الـ memory (من الـ max address لحد 0): الـ <b>stack</b> (داتا مؤقتة زي الـ function parameters والـ return addresses والـ local variables) بيكبر لتحت؛ الـ <b>heap</b> (memory بتتعملها allocation وقت التشغيل، زي <code>new</code> و<code>delete</code> و<code>malloc</code> و<code>free</code>) بيكبر لفوق؛ الـ <b>data section</b> (الـ global والـ static variables: متعرّفة برة الـ main function و<b>أي function تقدر توصلها</b>)؛ الـ <b>text section</b> (كود البرنامج). وكمان النشاط الحالي: الـ <b>program counter</b> والـ processor registers.",
      "الـ program حاجة <b>passive</b> متخزنة على الـ disk (executable file)؛ والـ process حاجة <b>active</b>. الـ program بيبقى process لما الـ executable file بتاعه يتحمّل في الـ memory. <b>تشغيل البرنامج بيبدأ بـ GUI mouse clicks، أو إنك تكتب اسمه في الـ command line، إلخ.</b>",
      "البرنامج الواحد ممكن يبقى كذا process (زي كذا user بيشغّلوا نفس البرنامج)."
     ],
     "figH": {
      "os-proc-memory": "الـ process جوه الـ memory: الـ stack والـ heap والـ data والـ text"
     }
    },
    {
     "h": "الـ Process states والـ PCB",
     "pts": [
      "والـ process وهي بتتنفذ، الـ <b>state</b> بتاعتها بتتغير:",
      "• الـ <b>new</b>: بتتعمل.<br>• الـ <b>running</b>: الـ instructions بتتنفذ.<br>• الـ <b>waiting</b>: مستنية event (إن I/O يخلص، أو signal).<br>• الـ <b>ready</b>: مستنية تاخد processor.<br>• الـ <b>terminated</b>: خلصت تنفيذ.",
      "الانتقالات (state diagram):<span class=\"ltr\">new →<i>admitted</i>→ ready →<i>scheduler dispatch</i>→ running<br>running →<i>interrupt</i>→ ready<br>running →<i>I/O or event wait</i>→ waiting →<i>I/O or event completion</i>→ ready<br>running →<i>exit</i>→ terminated</span>",
      "على processor واحد <b>process واحدة بس تبقى running</b> في أي لحظة؛ وممكن كتير يبقوا ready أو waiting.",
      "الـ <b>PCB (Process Control Block، أو task control block)</b> فيه: الـ <b>process state</b> (زي running أو waiting وغيرهم)؛ رقم الـ process؛ الـ <b>program counter</b> (مكان الـ instruction اللي عليها الدور)؛ الـ <b>CPU registers</b> (محتوى كل الـ registers الخاصة بالـ process)؛ معلومات الـ CPU-scheduling (الـ priorities والـ scheduling queue pointers)؛ معلومات الـ memory-management (الـ memory المتخصصة للـ process)؛ معلومات الـ accounting (الـ CPU المستخدم، الوقت اللي عدّى من البداية، الـ time limits)؛ معلومات الـ I/O status (أجهزة الـ I/O المتخصصة للـ process، لستة الـ open files).",
      "رسمة (slide 6، اسمها Process Control Block): عمود فيه fields من فوق لتحت: <b>process state</b>؛ <b>process number</b>؛ <b>program counter</b>؛ <b>registers</b>؛ <b>memory limits</b>؛ <b>list of open files</b>؛ • • • (fields تانية).",
      "الـ <b>Threads</b>: الـ process ممكن يبقى ليها كذا program counter، فكذا thread of control يشتغلوا في نفس الوقت؛ وساعتها الـ PCB لازم يخزن تفاصيل كل thread."
     ],
     "figH": {
      "os-state-diagram": "الـ state diagram بتاع الـ process: كل state وكل انتقال",
      "os-pcb": "الـ process control block (PCB)، field ورا field"
     }
    },
    {
     "h": "الـ Process scheduling: الـ queues والـ schedulers",
     "pts": [
      "الهدف: أقصى استخدام للـ CPU، وتبديل الـ processes على الـ CPU بسرعة عشان الـ time sharing. الـ <b>process scheduler</b> بيختار من الـ processes المتاحة مين يتنفذ بعد كده على الـ CPU.",
      "الـ scheduler بيحتفظ بـ scheduling queues للـ processes. الـ <b>Job queue</b>: كل الـ processes اللي في السيستم. الـ <b>Ready queue</b>: كل الـ processes اللي موجودة في الـ main memory، جاهزة ومستنية تتنفذ. الـ <b>Device queues</b>: الـ processes اللي مستنية I/O device. الـ processes بتتنقل بين الـ queues المختلفة.",
      "رسمة (slide 9، اسمها Ready queue والـ I/O device queues المختلفة): كل queue ليها <b>queue header</b> فيه pointer <b>head</b> وpointer <b>tail</b>.<br>• الـ <b>Ready queue</b> فيها:<span class=\"ltr\">head → PCB7 → PCB2 → null, tail → PCB2</span>وكل PCB فيه الـ registers وغيرها.<br>• الـ <b>Mag tape unit 0</b> والـ <b>mag tape unit 1</b>: الـ head والـ tail الاتنين null (فاضيين).<br>• الـ <b>Disk unit 0</b> فيها:<span class=\"ltr\">head → PCB3 → PCB14 → PCB6 → null, tail → PCB6</span>• الـ <b>Terminal unit 0</b>: الـ head والـ tail الاتنين بيشاوروا على PCB5، وبعده null.<br>وفيه device queues تانية (• • •).",
      "رسمة (slide 10، اسمها Representation of process scheduling): الـ <b>queueing diagram</b> بيمثل الـ queues والـ resources والـ flows. الـ processes الجديدة بتدخل الـ <b>ready queue</b> وبعدين الـ <b>CPU</b> وبعدين تخرج (الـ process تخلص)، أو من الـ CPU تروح لطريق من أربعة، وكل واحد بيرجع للـ ready queue:<span class=\"ltr\"><b>I/O request</b> → <b>I/O queue</b> → <b>I/O</b><br><b>time slice expired</b><br><b>fork a child</b> → <b>child executes</b><br><b>wait for an interrupt</b> → <b>interrupt occurs</b></span>",
      "الـ <b>I/O-bound</b> process: بتقضي وقت في الـ I/O أكتر من الحسابات، <b>CPU bursts قصيرة وكتير</b>. الـ <b>CPU-bound</b> process: بتقضي وقت أكتر في الحسابات، <b>CPU bursts قليلة وطويلة جدًا</b>.",
      "الـ <b>Mobile multitasking</b>: فيه mobile systems (زي النسخ الأولى من iOS) بتسمح لـ <b>process واحدة بس تشتغل، والباقي suspended</b>. وبسبب مساحة الشاشة وقيود الـ user interface، الـ iOS بيوفر <b>foreground</b> process واحدة (بتتحكم فيها من الـ user interface) وكذا <b>background</b> process (في الـ memory وشغالة، بس مش ظاهرة على الشاشة، وعليها قيود). القيود منها: task واحدة قصيرة، واستقبال notifications للـ events، وtasks معينة طويلة زي الـ audio playback. الـ Android بيشغّل foreground وbackground بقيود أقل؛ والـ background process بتستخدم <b>service</b> عشان تعمل الـ tasks؛ والـ service تقدر تفضل شغالة حتى لو الـ background process اتعملها suspend، ومالهاش user interface وبتستخدم memory صغيرة.",
      "رسمة (slide 12، اسمها Addition of medium-term scheduling): الـ <b>medium-term scheduler</b> ممكن يتضاف لو الـ degree of multiprogramming محتاجة تقل: يشيل الـ process من الـ memory، يخزنها على الـ disk، ويرجّعها من الـ disk تاني عشان تكمّل تنفيذ (<b>swapping</b>). والرسمة فيها 3 طرق:<span class=\"ltr\"><b>ready queue</b> → <b>CPU</b> → <b>end</b><br>CPU → <b>I/O waiting queues</b> → <b>I/O</b> → ready queue<br>CPU → <b>swap out</b> → <b>partially executed swapped-out processes</b> → <b>swap in</b> → ready queue</span>"
     ],
     "figH": {
      "os-device-queues": "الـ ready queue والـ queues بتاعة أجهزة الـ I/O",
      "os-queueing": "الـ queueing diagram: الـ process بتتنقل بين الـ queues إزاي",
      "os-medium-term": "الـ medium-term scheduling: الـ swap out والـ swap in للـ processes"
     }
    },
    {
     "h": "الـ Context switch",
     "pts": [
      "لما الـ CPU يحوّل لـ process تانية، السيستم لازم <b>يحفظ state الـ process القديمة</b> و<b>يحمّل الـ state المحفوظة للـ process الجديدة</b>. ده اسمه <b>context switch</b>.",
      "الـ context بتاع الـ process بيتمثل في الـ <b>PCB</b>. رسمة (slide 7، اسمها CPU switch from process to process) فيها 3 أعمدة: process P0 والـ operating system و process P1:<span class=\"ltr\">P0 <b>executing</b> → <b>interrupt or system call</b> → OS: <b>save state into PCB0</b> … <b>reload state from PCB1</b> → P1 <b>executing</b><br>→ interrupt or system call → OS: <b>save state into PCB1</b> … <b>reload state from PCB0</b> → P0 executing</span>والـ P0 بتبقى <b>idle</b> من وقت الحفظ لحد ما ترجع تشتغل، والـ P1 كانت idle لحد الـ reload؛ وفي الآخر P0 بتشتغل تاني وP1 بتبقى <b>idle</b>.",
      "وقت الـ context-switch ده <b>overhead</b> صافي: السيستم مابيعملش أي شغل مفيد وهو بيبدّل. كل ما الـ OS والـ PCB يبقوا أعقد، الـ switch ياخد وقت أطول.",
      "ده بيعتمد على دعم الـ hardware: فيه hardware بيوفر <b>كذا register set لكل CPU</b>، فكذا context يبقوا متحمّلين مرة واحدة.",
      "اللي الـ kernel بيعمله: يحفظ الـ PC والـ registers والـ state بتاعة الـ process الشغالة في الـ PCB بتاعها؛ يحدّث الـ state بتاعتها (ready/waiting) وينقلها للـ queue المناسبة؛ يختار الـ process الجاية؛ يرجّع الـ PC والـ registers ومعلومات الـ memory بتاعتها من الـ PCB؛ يحوّل لـ user mode وينط على الـ PC المحفوظ بتاعها."
     ],
     "figH": {
      "os-cpu-switch": "الـ CPU وهي بتنقل من الـ process P0 لـ P1 وترجع"
     }
    },
    {
     "h": "العمليات على الـ processes: الإنشاء والإنهاء",
     "pts": [
      "العمليات على الـ processes: السيستم لازم يوفر mechanisms لـ <b>process creation</b> و<b>process termination</b>.",
      "الـ Parents بيعملوا children، فبيتكوّن <b>tree of processes</b> (في Linux، الـ init (pid 1) ولاده login وkthreadd وsshd؛ والـ login ولاده bash، والـ bash ولاده ps وemacs). الـ processes بتتعرف بـ <b>process identifier (PID)</b>.",
      "<b>اختيارات مشاركة الـ resources</b>: الـ parent والـ children بيشاركوا كل الـ resources؛ أو الـ children بيشاركوا جزء منها؛ أو مفيش مشاركة خالص. <b>اختيارات التنفيذ</b>: يشتغلوا concurrently، أو الـ parent يستنى لحد ما الـ children يخلصوا.",
      "الـ <b>Address space (code block) ليها نوعين</b>: الـ child نسخة من الـ parent، أو الـ child بيتحمّل فيه برنامج.",
      "في UNIX، الـ <b>fork()</b> بتعمل process جديدة (بترجع 0 في الـ child، والـ PID بتاع الـ child في الـ parent، و&lt; 0 لو فيه error)؛ <b>exec()</b> بتتستخدم بعد fork() وبتستبدل الـ memory space بتاع الـ process ببرنامج جديد؛ والـ parent بيعمل <b>wait()</b>. في Windows، الـ <b>CreateProcess()</b> (زي إنها تشغّل mspaint.exe) وبعدين WaitForSingleObject().",
      "الـ <b>Termination</b>: الـ process بتنفذ آخر statement وبعدين <b>بتطلب من الـ OS إنه يمسحها</b> باستخدام الـ system call <b>exit()</b>؛ الـ status data بترجع من الـ child للـ parent (عن طريق <b>wait()</b>)؛ والـ OS بيعمل deallocate للـ resources بتاعة الـ process.",
      "الـ Parent ممكن يوقف تنفيذ الـ children بالـ system call <b>abort()</b>. من الأسباب: الـ child عدّى الـ resources المتخصصة له؛ الـ task اللي اتدّت للـ child ماتبقاش مطلوبة؛ الـ parent بيخرج والـ OS مابيسمحش للـ child يكمّل لو الـ parent بتاعه خلص.",
      "فيه operating systems مابتسمحش إن child يفضل موجود لو الـ parent بتاعه خلص: <b>لو process خلصت، كل الـ children بتوعها لازم يخلصوا هما كمان</b>. الـ <b>Cascading termination</b>: كل الـ children والـ grandchildren إلخ بيتقفلوا؛ والـ OS هو اللي بيبدأ الـ termination.",
      "<code>pid = wait(&amp;status);</code> بترجع الـ status والـ pid بتاع الـ child اللي خلص. الـ <b>Zombie</b>: خلصت، بس مفيش parent مستنيها (الـ parent لسه ماعملش wait()). الـ <b>Orphan</b>: الـ parent بتاعها خلص من غير ما يعمل wait()."
     ],
     "figH": {
      "os-fork-life": "إنشاء الـ process وإنهاؤها: <bdi dir=\"ltr\">fork(), exec(), wait(), exit()</bdi>"
     }
    },
    {
     "h": "الـ Chrome multiprocess architecture وموديلات الـ IPC",
     "pts": [
      "browsers كتير كانت شغالة بـ process واحدة <b>(وفيه لسه كده)</b>: لو موقع واحد عمل مشكلة، الـ browser كله ممكن يعلّق أو يوقع. الـ <b>Chrome</b> فيه 3 أنواع processes، أولها الـ <b>Browser</b> process (الـ UI، والـ disk والـ network I/O)؛ <b>Renderer</b> processes (بترسم الصفحات وبتتعامل مع الـ HTML والـ JavaScript؛ واحدة جديدة لكل website؛ شغالة في <b>sandbox</b> بيقيّد الـ disk والـ network I/O، <b>فبيقلل تأثير الـ security exploits</b>)؛ و<b>Plug-in</b> process لكل نوع plug-in. رسمة (في slide 19 فيه screenshot لـ Chrome بأربع tabs): <b>كل tab بتمثل process لوحدها</b>.",
      "الـ Processes يا إما <b>independent</b> يا إما <b>cooperating</b> (تقدر تأثر أو تتأثر بغيرها، ومنها مشاركة الداتا).",
      "أسباب الـ cooperating processes: <b>مشاركة المعلومات/الداتا، تسريع الحسابات (computation speedup)، الـ modularity، الراحة (convenience)</b>. ومحتاجين <b>IPC</b>.",
      "فيه موديلين للـ IPC، هما <b>shared memory</b> و<b>message passing</b> (الرسمة: (a) message passing عن طريق message queue في الـ kernel؛ (b) shared-memory region بين process A وB).",
      "الـ <b>Shared memory</b>: منطقة memory متشاركة بين الـ processes اللي بتتواصل؛ التواصل تحت تحكم <b>الـ user processes، مش الـ OS</b>؛ والمشكلة الكبيرة هي <b>الـ synchronization</b> بين أفعالهم.",
      "الـ <b>Producer–consumer problem</b>: الـ producer بيطلّع معلومات والـ consumer بيستهلكها. الـ <b>Unbounded buffer</b>: مفيش حد عملي؛ الـ <b>bounded buffer</b>: حجمه ثابت."
     ],
     "figH": {
      "os-chrome": "تصميم Chrome الـ multiprocess قصاد browser بـ process واحدة"
     }
    },
    {
     "h": "الـ Message passing، الـ synchronization، الـ buffering والـ sockets",
     "pts": [
      "الـ Message passing: الـ processes بتتواصل وتعمل synchronize <b>من غير shared variables</b>. العمليات: <b>send(message)</b> و<b>receive(message)</b>؛ وحجم الرسالة ثابت أو متغير. الـ P والـ Q لازم يعملوا <b>communication link</b> ويتبادلوا الرسايل.",
      "مسائل التنفيذ: الـ links بتتعمل إزاي؛ ينفع link يوصل أكتر من اتنين processes؛ كام link لكل pair؛ الـ capacity بتاعة الـ link؛ حجم الرسالة ثابت ولا متغير؛ unidirectional ولا bidirectional.",
      "تنفيذ الـ link:<br>• الـ <b>physical</b>، زي الـ shared memory والـ hardware bus والـ network.<br>• الـ <b>logical</b>، يعني direct أو indirect؛ synchronous أو asynchronous؛ automatic أو explicit buffering.",
      "الـ <b>Direct</b>: كل واحد بيسمّي التاني: <code>send(P, msg)</code> و<code>receive(Q, msg)</code>. الـ links بتتعمل أوتوماتيك؛ كل link لـ pair واحد بالظبط؛ كل pair ليه link واحد بالظبط؛ وغالبًا bidirectional.",
      "الـ <b>Indirect</b>: عن طريق <b>mailboxes (ports)</b> ليها IDs مميزة: <code>send(A, msg)</code> و<code>receive(A, msg)</code>. الـ link موجود بس لو بيشاركوا mailbox؛ الـ link ممكن يوصل processes كتير؛ والـ pair ممكن يشاركوا كذا link. العمليات هي الـ create mailbox والـ send/receive والـ destroy. لو P1 وP2 وP3 بيشاركوا A وP1 بعت، مين يستلم؟ الحلول: link بالكتير بين اتنين processes؛ process واحدة بس في المرة تقدر تعمل receive؛ أو السيستم يختار المستلم عشوائي ويبلّغ الـ sender.",
      "• الـ <b>blocking</b> يعني <b>synchronous</b>: الـ blocking send (الـ sender بيتوقف لحد ما الرسالة تتستلم)، والـ blocking receive (الـ receiver بيتوقف لحد ما رسالة تبقى متاحة).<br>• الـ <b>non-blocking</b> يعني <b>asynchronous</b>: ابعت وكمّل؛ واستلم رسالة صالحة أو null.<br>• ولو الاتنين blocking يبقى اسمها <b>rendezvous</b>.",
      "الـ <b>Buffering</b> (queue متوصلة بالـ link): <b>zero capacity</b> (الـ sender يستنى الـ receiver، يعني rendezvous)؛ <b>bounded capacity</b> (n رسالة؛ الـ sender يستنى لو مليانة)؛ <b>unbounded</b> (الـ sender عمره ما يستنى).",
      "الـ <b>Socket</b> = نقطة نهاية للتواصل (endpoint) = <b>IP address + port</b>، زي 161.25.19.8:1625 يعني port 1625 على الـ host 161.25.19.8. التواصل بيبقى بين pair of sockets. الـ ports اللي أقل من 1024 well known (خدمات standard). والـ <b>127.0.0.1</b> هو الـ loopback (السيستم المحلي نفسه)."
     ]
    }
   ],
   "cards": [
    "برنامج شغال (program in execution)؛ كيان active.",
    "كيان passive: ملف executable متخزن على الـ disk.",
    "داتا مؤقتة زي الـ function parameters والـ return addresses والـ local variables.",
    "الـ Global والـ static variables.",
    "الـ memory اللي بتتعملها allocation وقت التشغيل (زي <code>new</code> و<code>malloc</code>).",
    "كود البرنامج.",
    "الـ new والـ ready والـ running والـ waiting والـ terminated.",
    "الـ State، الـ PC، الـ CPU registers، معلومات الـ scheduling، معلومات الـ memory-management، معلومات الـ accounting، معلومات الـ I/O status.",
    "بيختار الـ processes اللي تدخل الـ ready queue؛ بيتحكم في الـ degree of multiprogramming؛ مش بيشتغل كتير (infrequent).",
    "بيختار الـ process الجاية اللي تشتغل على الـ CPU؛ بيتنادى كل كام millisecond.",
    "بيعمل swap للـ processes برة على الـ disk ويرجّعها تاني عشان يقلل الـ degree of multiprogramming.",
    "• الـ I/O-bound فيه CPU bursts قصيرة وكتير.<br>• الـ CPU-bound فيه CPU bursts قليلة وطويلة جدًا.",
    "حفظ state الـ process القديمة في الـ PCB بتاعها وتحميل الجديدة؛ overhead صافي.",
    "الـ fork بتعمل child؛ الـ exec بتستبدل الـ memory بتاعته ببرنامج جديد؛ الـ wait بتخلي الـ parent يستنى child.",
    "Zombie: خلصت بس الـ parent لسه ماعملش wait(). Orphan: الـ parent بتاعها خلص من غير ما يعمل wait().",
    "في بعض الـ operating systems، لما process تخلص، كل الـ children والـ grandchildren إلخ بتوعها بيتقفلوا كمان؛ والـ OS هو اللي بيبدأ الـ termination.",
    "مشاركة الداتا، تسريع الحسابات، الـ modularity، الـ convenience.",
    "Shared memory وmessage passing.",
    "الـ send والـ receive الاتنين blocking.",
    "نقطة نهاية للتواصل (endpoint) = IP address + port (زي 161.25.19.8:1625)."
   ],
   "qa": [
    "الـ program كيان passive: مجموعة instructions متخزنة على الـ disk كملف executable. الـ process كيان active: برنامج شغال، ليه program counter وregisters وstack وdata section وheap، وليه state. البرنامج بيبقى process لما يتحمّل في الـ memory، والبرنامج الواحد ممكن يبقى كذا process.",
    "الـ process بتمشي كده:<span class=\"ltr\">new → admitted → ready → scheduler dispatch → running</span>• الـ new يعني بتتعمل، والـ ready يعني مستنية تاخد CPU، والـ running يعني الـ instructions بتتنفذ.<br>• من الـ running:<span class=\"ltr\">interrupt → ready<br>I/O or event wait → waiting<br>exit → terminated</span>والـ waiting يعني مستنية event، والـ terminated يعني خلصت.<br>• من الـ waiting:<span class=\"ltr\">I/O or event completion → ready</span>",
    "الـ Short-term (الـ CPU scheduler) بيختار أنهي ready process تاخد الـ CPU بعد كده. بيشتغل كل كام millisecond، فلازم يبقى سريع. الـ Long-term (الـ job scheduler) بيختار أنهي processes تدخل الـ ready queue. بيشتغل كل كام ثانية أو دقيقة وبيتحكم في الـ degree of multiprogramming. الـ Medium-term بيعمل swap للـ processes من الـ memory للـ disk ويرجّعها بعدين، عشان يقلل الـ degree of multiprogramming.",
    "لما يحصل interrupt أو system call، الـ kernel بيحفظ الـ context (الـ PC، الـ registers، الـ state، معلومات الـ memory) بتاع الـ process الشغالة في الـ PCB بتاعها وينقلها للـ ready أو الـ waiting queue. بعدين الـ scheduler بيختار الـ process الجاية، والـ kernel بيحمّل الـ context بتاعها من الـ PCB ويكمّلها. الوقت ده overhead، والـ hardware اللي فيه كذا register set ممكن يقلله.",
    "الـ Shared memory: الـ processes بتعمل منطقة memory مشتركة وبتقرا وتكتب فيها مباشرة. سريع، والـ processes (مش الـ OS) هي اللي بتتحكم فيه، بس لازم يعملوا synchronize، زي الـ bounded-buffer producer-consumer. الـ Message passing: الـ processes بتتبادل رسايل بـ send/receive على communication link، ممكن يبقى direct أو indirect (mailboxes)، blocking أو non-blocking، بـ zero أو bounded أو unbounded buffering. مش محتاج shared variables وأسهل في الـ distributed systems، بس كل رسالة بيدخل فيها الـ kernel.",
    "نقطة نهاية للتواصل (endpoint)، بتتعرف بـ IP address متوصل بيه port number (زي 161.25.19.8:1625). التواصل بيحصل بين pair of sockets. الـ ports اللي أقل من 1024 well known وبتستخدم للخدمات الـ standard، و127.0.0.1 هو الـ loopback address.",
    "الـ DMA بيتستخدم مع الـ high-speed I/O devices اللي بتقدر تنقل داتا بسرعة قريبة من سرعة الـ memory. الـ device controller بينقل blocks من الداتا من الـ buffer storage على الـ main memory على طول من غير تدخل الـ CPU، وبيطلع <b>interrupt واحد لكل block</b> بدل interrupt لكل byte (Topic 1، جزء Direct Memory Access Structure).",
    "الـ <b>I/O-bound process</b> بتقضي وقت في الـ I/O أكتر من الحسابات: <b>CPU bursts قصيرة وكتير</b>. الـ <b>CPU-bound process</b> بتقضي وقت أكتر في الحسابات: <b>CPU bursts قليلة وطويلة جدًا</b>.",
    "الـ parent process بتعمل children processes، واللي بدورها بتعمل processes تانية، فبيتكوّن <b>tree of processes</b>؛ وكل process بتتعرف وتتدار بـ <b>process identifier (PID)</b>. اختيارات مشاركة الـ resources: الـ parent والـ children بيشاركوا كل الـ resources؛ أو الـ children بيشاركوا جزء من resources الـ parent؛ أو الـ parent والـ child مابيشاركوش أي resources. اختيارات التنفيذ: الـ parent والـ children يشتغلوا concurrently، أو الـ parent يستنى لحد ما الـ children يخلصوا. الـ Address space (code block) ليها نوعين: الـ child نسخة من الـ parent، أو الـ child بيتحمّل فيه برنامج. أمثلة UNIX: الـ system call <b>fork()</b> بتعمل process جديدة؛ والـ system call <b>exec()</b> بتتستخدم بعد fork() عشان تستبدل الـ memory space بتاع الـ process ببرنامج جديد.",
    "الـ process بتنفذ آخر statement وبعدين بتطلب من الـ OS إنه يمسحها باستخدام الـ system call <b>exit()</b>: الـ status data بترجع من الـ child للـ parent (عن طريق wait())، والـ OS بيعمل deallocate للـ resources بتاعتها. الـ parent ممكن يقفل الـ children بالـ system call <b>abort()</b> لما الـ child يعدّي الـ resources المتخصصة له، أو الـ task اللي اتدّت له ماتبقاش مطلوبة، أو الـ parent بيخرج والـ OS مابيسمحش للـ child يكمّل لو الـ parent خلص. فيه operating systems مابتسمحش إن child يفضل موجود لو الـ parent بتاعه خلص (<b>cascading termination</b>: كل الـ children والـ grandchildren إلخ بيتقفلوا، والـ OS هو اللي بيبدأها). الـ parent ممكن يستنى child بـ <code>pid = wait(&amp;status)</code>، اللي بترجع الـ status information والـ pid بتاع الـ process اللي خلصت. لو مفيش parent مستني (معملش wait())، الـ process بتبقى <b>zombie</b>؛ ولو الـ parent خلص من غير ما يعمل wait()، الـ process بتبقى <b>orphan</b>."
   ],
   "quiz": [
    [
     "الـ zombie هي اللي خلصت هي نفسها بس الـ parent بتاعها لسه ماعملش wait().",
     "صح. لو الـ parent خلص من غير ما يعمل wait()، الـ process بتبقى orphan.",
     "\"Main\" مش نوع process في المحاضرة؛ بيفكّرك بالـ main() function أو الـ main thread. الـ process اللي الـ parent بتاعها اتقفلت اسمها orphan.",
     "الـ renderer واحد من التلات أنواع process بتوع Chrome (بيعمل render لصفحات الويب، واحد لكل site). مالوش علاقة بإن الـ parent اتقفل."
    ],
    [
     "\"Save-and-restore\" بيوصف اللي بيحصل بس مش المصطلح بتاع المحاضرة. العملية اللي بتحفظ الـ state القديمة وتحمّل الجديدة اسمها context switch.",
     "\"State switch\" مش مصطلح في المحاضرة؛ لما الـ process تغيّر الـ state بتاعتها (زي من running لـ ready) ده state transition، أما حفظ وتحميل الـ contexts فده context switch.",
     "صح. لما الـ CPU يقلب على process تانية، السيستم بيحفظ الـ state بتاعة الـ process القديمة ويحمّل الـ state المحفوظة بتاعة الجديدة عن طريق الـ context switch؛ والـ context ده متخزن في الـ PCB (Topic 2، جزء Context Switch).",
     "غلط لأن في اختيار بيسمّيها: الـ context switch هو اللي بيحفظ الـ state بتاعة الـ process القديمة ويرجّع بتاعة اللي بعدها، زي ما هي متخزنة في الـ PCB."
    ],
    [
     "صح. الـ PC فيه مكان الـ instruction الجاية.",
     "الـ heap فيه الـ memory اللي بتتحجز dynamically وقت الـ run time (زي <code>malloc</code> و<code>new</code>). ده بيخزن data، مش عنوان الـ instruction الجاية.",
     "الـ data section فيها الـ global والـ static variables. عنوان الـ instruction الجاية موجود في الـ program counter.",
     "الـ Parameters والـ return addresses والـ local variables."
    ],
    [
     "الـ Short-term بيختار الـ process الجاية للـ CPU.",
     "الـ medium-term scheduler بيقلل الـ degree of multiprogramming إنه يعمل swap للـ processes على الـ disk ويرجّعها؛ مش هو اللي بيدخّل processes جديدة للـ ready queue.",
     "صح. الـ job scheduler بيتحكم في الـ degree of multiprogramming.",
     "غلط لأن الـ long-term (job) scheduler موجود في الاختيارات: هو اللي بيختار أنهي processes تدخل الـ ready queue."
    ],
    [
     "صح. المحاضرة بتقول لو مفيش parent مستني (معملش wait())، الـ process اللي خلصت بتبقى zombie (Topic 2، جزء Process Termination). ‡ وبتفضل في الـ process table لحد ما الـ parent ياخد الـ status بتاعها.",
     "الـ orphan الـ parent بتاعها خلص من غير wait().",
     "هي terminated، بس الاسم المحدد للحالة دي zombie.",
     "الـ init (pid 1، وهو systemd في الـ Linux الأحدث) ده الـ root بتاع الـ process tree اللي بيتبنّى الـ orphans؛ مش ده اسم الـ process اللي خلصت ومحدش عملها wait."
    ],
    [
     "\"Main\" مش مصطلح في الـ mobile multitasking. المحاضرة بتقسم الـ apps لـ foreground process واحدة وbackground processes.",
     "صح. الـ iOS بيوفر foreground process واحدة بتتحكم فيها من الـ user interface.",
     "الـ Background processes بتبقى في الـ memory بس مش على الشاشة.",
     "\"Display\" مش نوع process في المحاضرة. الـ app اللي ظاهرة على الشاشة وبتتحكم فيها من الـ user interface اسمها foreground process."
    ],
    [
     "الـ program هو الـ passive؛ الـ process هي الـ active.",
     "صح. الـ process كيان active (برنامج شغال)."
    ],
    [
     "مش لازم. الـ parent غالبًا بيستنى الـ child بـ wait()، ولو خرج الأول الـ child هيبقى orphan (أو هيتقفل بالـ cascading termination).",
     "صح. اختيارات التنفيذ هي \"run concurrently\" أو \"الـ parent يستنى لحد ما الـ children يخلصوا\". مفيش قاعدة إن الـ parent يخلص الأول."
    ],
    [
     "صح. الـ CPU الواحد بينفذ process واحدة في المرة؛ والباقي ready أو waiting.",
     "بـ processor واحد، process واحدة بس تبقى running في أي لحظة."
    ],
    [
     "كام CPU burst طويلين جدًا ده وصف الـ CPU-bound process، اللي بتقضي وقت في الحسابات أكتر من الـ I/O (Topic 2، جزء schedulers).",
     "صح. بتقضي وقت في الـ I/O أكتر من الحسابات.",
     "كل process محتاجة الـ CPU عشان تنفذ الـ instructions بتاعتها. الـ I/O-bound process برضه ليها CPU bursts؛ بس كتير وقصيرين.",
     "CPU burst واحد بس معناه إنها تحسب مرة وماترجعش من الـ I/O تاني. الـ I/O-bound processes بتبدّل بين CPU bursts كتير قصيرين والـ I/O."
    ],
    [
     "فيه slot واحد دايمًا بيفضل فاضي عشان نفرّق بين \"full\" و\"empty\".",
     "صح. الحل يقدر يستخدم بس BUFFER_SIZE − 1 عنصر.",
     "الـ 11 أكبر من حجم الـ array: الـ buffer[BUFFER_SIZE] فيه 10 slots بس، والحل بيستخدم بالكتير BUFFER_SIZE − 1 = 9 منهم.",
     "الـ buffer اللي مالوش حد ده حالة الـ unbounded buffer. هنا ده bounded buffer حجمه ثابت 10، منهم 9 slots بس اللي ينفع تتستخدم."
    ],
    [
     "صح. الـ PCB فيه الـ program counter والـ CPU registers والـ I/O status information، واللي منها ليستة الـ open files (Topic 2، جزء Process Control Block).",
     "الكود في الـ text section في الـ memory، مش في الـ PCB.",
     "الـ interrupt vector على مستوى السيستم كله، مش لكل process.",
     "الـ file allocation table دي structure تبع الـ file system على الـ disk ومشتركة بين كل الفايلات. الـ PCB بيلستّ الـ open files بتاعة الـ process نفسها بس."
    ],
    [
     "الـ asynchronous communication معناها send/receive من النوع non-blocking. إن الطرفين يبقوا blocking ده synchronous واسمه rendezvous.",
     "صح. المحاضرة بتقول لما الـ send والـ receive الاتنين يبقوا blocking يبقى عندنا rendezvous: الـ sender والـ receiver بيستنوا بعض (Topic 2، جزء message passing).",
     "الـ unbounded buffering ده نوع من سعة الـ queue الـ sender فيه عمره ما بيستنى؛ ده بيتكلم عن الـ buffering، مش عن إن الـ calls الاتنين blocking.",
     "الـ indirect communication معناها إن الـ messages بتعدّي على mailboxes (ports). ده بيقول الـ messages رايحة فين، مش الـ send والـ receive بيعملوا block ولا لأ."
    ]
   ],
   "extra": [
    [
     "الـ PID بتاع الـ child هو اللي الـ parent بياخده، مش الـ child.",
     "صح. الـ <code>fork()</code> بترجع 0 في الـ child، والـ PID بتاع الـ child في الـ parent، وقيمة &lt; 0 لو فيه error.",
     "fork() مابترجّعش الـ PID بتاع الـ parent للـ child.",
     "القيمة &lt; 0 معناها إن fork() فشلت ومفيش child اتعمل."
    ],
    [
     "ده بيعد أول fork() بس. الـ parent والـ child بتاعه الاتنين بيكملوا وينفذوا تاني fork().",
     "ده بيزوّد process واحدة لكل fork() call، وناسي إن أول child كمان بينفذ تاني fork().",
     "صح. أول fork() بتدّي 2 processes؛ وكل واحدة فيهم بتنفذ تاني fork()، فيبقوا 2 × 2 = 4.",
     "الـ 8 = 2³ محتاجة تلات fork() calls. مع اتنين بس العدد بيتضاعف مرتين: 2 × 2 = 4."
    ],
    [
     "مايقدرش: الشرط ((in + 1) % 8) == out بيبقى (0 == 0)، فالـ buffer بيتعامل على إنه full.",
     "الـ producer بيكتب عند index in، عمره ما بيكتب عند out، وكمان هو لازم يستنى هنا.",
     "صح. الحساب:<span class=\"ltr\">(7 + 1) % 8 = 0 = out</span>فالـ loop بتاع \"full\" بيلف. الحل بيستخدم بس BUFFER_SIZE − 1 = 7 slots.",
     "الـ Empty ده شرط الـ consumer (in == out)، و7 ≠ 0."
    ],
    [
     "صح. بيتضاف لما الـ degree of multiprogramming لازم يقل وبيشتغل بالـ swapping.",
     "هو بيختار بس أنهي ready process تاخد الـ CPU بعد كده، كل كام millisecond.",
     "هو بيتحكم في الـ degree of multiprogramming باختيار أنهي processes تدخل الـ ready queue؛ مابيعملهاش swap برة.",
     "الـ dispatcher بيعمل الـ context switch للـ process اللي الـ CPU scheduler اختارها؛ مابيعملش swap للـ memory images."
    ],
    [
     "الانتقال من الـ running للـ waiting بيحصل مع الـ I/O or event wait، مش مع الـ interrupt.",
     "الـ New دي state الـ process وهي بتتعمل. الـ running process اللي جالها interrupt بترجع ready، عمرها ما بترجع new.",
     "هي ماخلصتش؛ هتشتغل تاني بعدين.",
     "صح. في الـ state diagram، السهم من الـ running للـ ready مكتوب عليه \"interrupt\"؛ الـ process بتستنى تتعملها dispatch تاني."
    ],
    [
     "إنك تسمّي الـ process التانية صريح، زي <code>send(P, msg)</code> و<code>receive(Q, msg)</code>، ده الـ direct communication. الـ indirect بتسمّي mailbox بدل كده.",
     "صح. الـ link موجود بس لو الـ processes بيشاركوا mailbox؛ link واحد ممكن يوصل processes كتير، والـ pair ممكن يشاركوا كذا mailbox.",
     "إن يكون في link واحد بالظبط بين كل اتنين processes دي خاصية الـ direct communication. مع الـ mailboxes ممكن الاتنين يشتركوا في كذا link.",
     "الـ links الأوتوماتيك خاصية الـ direct communication؛ مع الـ mailboxes الـ processes لازم يشاركوا mailbox."
    ],
    [
     "الـ stack فيه الـ function parameters والـ return addresses والـ local variables، وبيكبر لتحت.",
     "الـ data section فيه الـ global والـ static variables، ثابتين قبل ما البرنامج يشتغل.",
     "الـ text section فيها كود البرنامج، وبيتحدد أول ما البرنامج يتحمّل. الـ memory اللي بتيجي من malloc() وقت الـ run time بتتاخد من الـ heap.",
     "صح. الـ heap هو الـ memory اللي بتتعملها allocation ديناميك وقت التشغيل (زي <code>new</code> و<code>delete</code> و<code>malloc</code> و<code>free</code>) وبيكبر لفوق."
    ],
    [
     "صح. الـ 127.0.0.1 هو الـ loopback address (السيستم المحلي) والـ port 80 أقل من 1024، فهو well known.",
     "الـ Loopback صح، بس 5050 مش أقل من 1024، فمش well-known port.",
     "الـ Port 21 well known، بس 161.25.19.8 ده remote host، مش الـ loopback address.",
     "ده الـ remote host اللي في مثال المحاضرة، و1625 مش well-known port."
    ],
    [
     "حفظ وتحميل الـ PCBs ده bookkeeping؛ مفيش user process بتتقدم خلاله.",
     "صح. وقت الـ context-switch ده overhead صافي، وبيطول لما الـ OS والـ PCB يبقوا أعقد."
    ],
    [
     "في الـ shared memory، الـ user processes هي اللي بتتحكم في التواصل. والـ synchronization بينهم هي المشكلة الأساسية اللي لازم يحلّوها بنفسهم.",
     "صح. التواصل تحت تحكم الـ user processes، مش الـ OS، والـ synchronization بين أفعالهم هي المشكلة الكبيرة."
    ]
   ]
  },
  "3": {
   "notes": [
    {
     "h": "مفاهيم أساسية: الـ bursts، الـ scheduler، الـ preemption، الـ dispatcher",
     "pts": [
      "أعلى CPU utilization بتيجي من الـ multiprogramming. تنفيذ الـ process عبارة عن <b>CPU–I/O burst cycle</b>، يعني CPU burst وبعده I/O burst، وهكذا. والاهتمام الأساسي بتوزيع الـ CPU bursts.",
      "شكل (سلايد 2، الـ CPU–I/O burst cycle): عمود فيه blocks بتتبادل، وفوقه وتحته نقط معناها إن الـ cycle مكملة:<span class=\"ltr\"><b>load store, add store, read from file</b> → <b>CPU burst</b></span><span class=\"ltr\"><b>wait for I/O</b> → <b>I/O burst</b></span><span class=\"ltr\"><b>store increment, index, write to file</b> → <b>CPU burst</b></span><span class=\"ltr\"><b>wait for I/O</b> → <b>I/O burst</b></span><span class=\"ltr\"><b>load store, add store, read from file</b> → <b>CPU burst</b></span><span class=\"ltr\"><b>wait for I/O</b> → <b>I/O burst</b></span>وهكذا.",
      "الـ <b>CPU scheduler</b> بيختار process من الـ <b>ready queue</b> ويدّيها CPU core (الـ queue ممكن تبقى مترتبة بطرق مختلفة).",
      "قرارات الـ scheduling بتحصل في 4 حالات، لما الـ process:<br><b>(1)</b> تتحول من running لـ waiting<br><b>(2)</b> تتحول من running لـ ready<br><b>(3)</b> تتحول من waiting لـ ready<br><b>(4)</b> تخلص (terminates).",
      "شكل (سلايد 3، الـ process states): خمس states هما <b>new</b> و<b>ready</b> و<b>running</b> و<b>waiting</b> و<b>terminated</b>. والأسهم:<span class=\"ltr\">new → ready (<b>admitted</b>)</span><span class=\"ltr\">ready → running (<b>scheduler dispatch</b>)</span><span class=\"ltr\">running → ready (<b>interrupt</b>)</span><span class=\"ltr\">running → waiting (<b>I/O or event wait</b>)</span><span class=\"ltr\">waiting → ready (<b>I/O or event completion</b>)</span><span class=\"ltr\">running → terminated (<b>exit</b>)</span>",
      "في الحالات 1 و4 <b>مفيش اختيار</b> من ناحية الـ scheduling: لازم process جديدة (<b>لو فيه واحدة موجودة في الـ ready queue</b>) تتختار عشان تتنفذ. أما في الحالات 2 و3 فيه اختيار.",
      "<b>الـ Preemptive scheduling ممكن يعمل race conditions</b> لما تبقى فيه داتا مشتركة: process تتعملها preempt وهي بتحدّث الداتا، والـ process التانية تقرا داتا مش متسقة (inconsistent).",
      "الـ <b>Dispatcher</b> بيدّي التحكم في الـ CPU للـ process اللي الـ scheduler اختارها: <b>switching context</b>، <b>التحويل لـ user mode</b>، و<b>النط للمكان الصح</b> في برنامج الـ user عشان يكمّله. الـ <b>Dispatch latency</b> = الوقت اللي بياخده عشان يوقف process ويشغّل التانية.",
      "شكل (سلايد 6، الـ dispatch latency): فيه boxes متوصلة بأسهم لتحت:<span class=\"ltr\"><b>P0 executing</b> → <b>save state into PCB0</b> → <b>restore state from PCB1</b> → <b>P1 executing</b></span>وجنب الخطوتين اللي في النص (من آخر P0 executing لحد أول P1 executing) فيه قوس مكتوب عليه <b>dispatch latency</b>."
     ],
     "figH": {
      "os-burst-cycle": "دورة الـ CPU burst والـ I/O burst",
      "os-sched-states": "قرارات الـ scheduling بتحصل إمتى: الـ 4 حالات",
      "os-dispatch": "الـ dispatcher والـ dispatch latency"
     }
    },
    {
     "h": "معايير الـ scheduling والقوانين",
     "pts": [
      "الـ <b>CPU utilization</b>: خلّي الـ CPU مشغول على قد ما تقدر، والهدف <b>maximize</b>.",
      "الـ <b>Throughput</b>: عدد الـ processes اللي بتخلص في وحدة الزمن، والهدف <b>maximize</b>.",
      "الـ <b>Turnaround time</b>: الوقت اللي بتاخده process معينة عشان تتنفذ (من التقديم لحد ما تخلص)، والهدف <b>minimize</b>.",
      "الـ <b>Waiting time</b>: الوقت اللي الـ process قعدته مستنية <b>في الـ ready queue</b>، والهدف <b>minimize</b>.",
      "الـ <b>Response time</b>: الوقت من تقديم الـ request لحد ما <b>أول response</b> يطلع، والهدف <b>minimize</b>.",
      "طريقة الامتحان: ارسم الـ Gantt chart، اقرا الـ completion time (CT) لكل process، وبعدين احسب الـ TAT والـ WT لكل process وطلّع المتوسط. لو كل الـ processes وصلت عند 0، الـ WT في الـ non-preemptive schedule هو ببساطة وقت البداية بتاعها."
     ]
    },
    {
     "h": "الـ FCFS (<bdi>First-Come, First-Served</bdi>)",
     "pts": [
      "الـ FCFS هو non-preemptive، والـ processes بتشتغل بترتيب الوصول. مثال المحاضرة فيه 3 processes كلهم واصلين عند 0:<span class=\"ltr\">P1 = 24, P2 = 3, P3 = 3</span>والـ Gantt chart اللي فوق للترتيب ده (P1 ثم P2 ثم P3).",
      "لو الترتيب P1 ثم P2 ثم P3، الـ waiting time هو:<span class=\"ltr\">WT: P1 = 0, P2 = 24, P3 = 27</span>والمتوسط:<span class=\"ltr\"><b>(0 + 24 + 27)/3 = 17</b></span>",
      "لو الترتيب P2 ثم P3 ثم P1، الـ Gantt chart بيبقى:<span class=\"ltr\"><b>P2 0–3 | P3 3–6 | P1 6–30</b></span>والـ waiting time:<span class=\"ltr\">WT: P1 = 6, P2 = 0, P3 = 3</span>والمتوسط:<span class=\"ltr\"><b>(6 + 0 + 3)/3 = 3</b></span>وده أحسن بكتير من الحالة اللي قبلها.",
      "الـ <b>Convoy effect</b>: الـ processes القصيرة اللي بتتزنق ورا واحدة طويلة بتخلي متوسط الـ waiting time في الـ FCFS كبير."
     ],
     "figH": {
      "os-fcfs-sim": "محاكي الـ FCFS: الـ Gantt chart وأوقات الانتظار"
     }
    },
    {
     "h": "الـ SJF (Shortest-Job-First) والـ SRTF",
     "pts": [
      "بنربط كل process بطول الـ <b>CPU burst الجاي</b> بتاعها ونشغّل الأقصر الأول (لو فيه تعادل → FCFS).",
      "<b>الـ SJF هو الـ optimal</b>: بيدّي <b>أقل متوسط waiting time</b> لأي مجموعة processes. الصعوبة إنك تعرف طول الـ burst الجاي (تسأل الـ user أو تقدّر).",
      "النسخة الـ <b>preemptive</b> اسمها <b>Shortest-Remaining-Time-First (SRTF)</b>: لما process جديدة توصل بـ burst أقصر من اللي فاضل من الشغالة، اعمل preempt.",
      "مثال الـ SJF في المحاضرة:<span class=\"ltr\">P1 = 6, P2 = 8, P3 = 7, P4 = 3</span>والـ chart:<span class=\"ltr\">P4 (0–3), P1 (3–9), P3 (9–16), P2 (16–24)</span>ومتوسط الـ WT:<span class=\"ltr\"><b>(3 + 16 + 9 + 0)/4 = 7</b></span>",
      "‡ جدول الـ SJF في الـ slide (سلايد 15–16) فيه بس <b>Process</b> و<b>Burst Time</b> (يعني P1 = 6 و P2 = 8 و P3 = 7 و P4 = 3)، فالـ chart بتاعه بيعامل كل الـ processes كأنها موجودة عند time 0. لو سؤال إدّاك كمان arrival times هي 0 و 2 و 4 و 5، الـ non-preemptive SJF بيدّي:<span class=\"ltr\">P1 0–6 | P4 6–9 | P3 9–16 | P2 16–24 → WT 0, 14, 5, 1 → 20/4 = 5</span>امشي على اللي السؤال بيقوله عن الـ arrival times.",
      "مثال على الـ Shortest-remaining-time-first (سلايد 17): دلوقتي بنضيف لتحليلنا فكرة <b>إن أوقات الوصول مختلفة وفيه preemption</b>.",
      "مثال الـ SRTF في المحاضرة (arrival/burst):<span class=\"ltr\">P1 0/8, P2 1/4, P3 2/9, P4 3/5</span>عند t = 1 الـ P2 (4) &lt; اللي فاضل من P1 وهو 7، فـ P1 بتتعملها preempt.",
      "الـ Gantt chart بتاع الـ SRTF (الـ preemptive SJF):<span class=\"ltr\"><b>P1 0–1 | P2 1–5 | P4 5–10 | P1 10–17 | P3 17–26</b></span>ومتوسط الـ WT:<span class=\"ltr\">[(10 − 1) + (1 − 1) + (17 − 2) + (5 − 3)]/4 = <b>26/4 = 6.5</b></span>"
     ],
     "figH": {
      "os-sjf-sim": "محاكي الـ SJF: أقصر job الأول",
      "os-srtf-sim": "محاكي الـ SRTF: أقل وقت متبقي الأول، مع الـ preemption"
     }
    },
    {
     "h": "مثال على الـ SJF (سلايد 15–16)",
     "pts": [
      "الـ SJF scheduling chart:<span class=\"ltr\"><b>P4 0–3 | P1 3–9 | P3 9–16 | P2 16–24</b></span>ومتوسط الـ waiting time:<span class=\"ltr\"><b>(3 + 16 + 9 + 0)/4 = 7</b></span>"
     ]
    },
    {
     "h": "الـ Round Robin (RR)",
     "pts": [
      "كل process بتاخد حتة صغيرة من وقت الـ CPU، اسمها <b>time quantum q</b> (غالبًا 10–100 ms). لما تخلص الـ process <b>بتتعملها preempt وتتحط في آخر الـ ready queue</b>. فيه timer بيعمل interrupt كل quantum.",
      "لو فيه n processes والـ quantum هو q، كل واحدة بتاخد 1/n من الـ CPU في حتت بالكتير q؛ <b>مفيش process تستنى أكتر من (n − 1)q</b> وحدة زمن.",
      "من ناحية الـ performance:<br>• لو الـ q كبير، الـ RR <b>بيتصرف زي FIFO/FCFS</b>.<br>• لو الـ q صغير، بيحصل context switches كتير أوي، فالـ q لازم يبقى كبير مقارنة بوقت الـ context-switch (الـ context switch &lt; 10 µs).",
      "عادة <b>متوسط turnaround أعلى من الـ SJF بس response أحسن</b>.",
      "مثال على الـ RR بـ time quantum = 4 (سلايد 20–21)، فيه:<span class=\"ltr\">P1 = 24, P2 = 3, P3 = 3</span>والـ Gantt chart:<span class=\"ltr\"><b>P1 0–4 | P2 4–7 | P3 7–10 | P1 10–14 | P1 14–18 | P1 18–22 | P1 22–26 | P1 26–30</b></span>وبعد P3، الـ P1 بتبقى لوحدها وبتشتغل quantum ورا quantum. ومتوسط الـ WT:<span class=\"ltr\">[(30 − 24) + (7 − 3) + (10 − 3)]/3 = <b>17/3 = 5.67</b></span>والـ WT هنا بيساوي الـ completion ناقص الـ burst، لأن الكل واصل عند 0.",
      "الاصطلاح المستخدم في كل الإجابات المحلولة: لما الـ quantum بتاع process يخلص في نفس اللحظة اللي process جديدة بتوصل فيها، <b>الجديدة بتدخل الـ queue الأول</b> والـ process اللي اتعملها preempt بتقف وراها."
     ],
     "figH": {
      "os-rr-sim": "محاكي الـ Round Robin: جرّب قيم مختلفة للـ time quantum"
     }
    },
    {
     "h": "الـ Priority scheduling (والـ priority مع RR)",
     "pts": [
      "كل process ليها priority number (integer)؛ الـ CPU بيروح للـ priority الأعلى، <b>أصغر integer = أعلى priority</b>. ممكن يبقى <b>preemptive أو non-preemptive</b>.",
      "<b>الـ SJF هو priority algorithm</b> الـ priority فيه عكس طول الـ CPU burst الجاي المتوقع.",
      "<b>المشكلة: starvation</b>: الـ processes اللي الـ priority بتاعها واطي ممكن عمرها ما تتنفذ. <b>الحل: aging</b>: نزوّد الـ priority بالتدريج للـ processes اللي بتستنى كتير.",
      "مثال المحاضرة (burst/priority):<span class=\"ltr\">P1 10/3, P2 1/1, P3 2/4, P4 1/5, P5 5/2</span>والـ chart:<span class=\"ltr\">P2 0–1 | P5 1–6 | P1 6–16 | P3 16–18 | P4 18–19</span>ومتوسط الـ WT:<span class=\"ltr\">(6 + 0 + 16 + 18 + 1)/5 = <b>41/5 = 8.2</b></span>",
      "<b>الـ Priority مع Round-Robin</b> (سلايد 25): شغّل الـ process اللي ليها أعلى priority؛ والـ processes اللي <b>ليها نفس الـ priority بتشتغل round-robin</b>. مثال (burst/priority):<span class=\"ltr\">P1 4/3, P2 5/2, P3 8/2, P4 7/1, P5 3/3</span>والـ Gantt chart بـ time quantum = 2:<span class=\"ltr\"><b>P4 0–7 | P2 7–9 | P3 9–11 | P2 11–13 | P3 13–15 | P2 15–16 | P3 16–20 | P1 20–22 | P5 22–24 | P1 24–26 | P5 26–27</b></span>ومتوسط الـ WT:<span class=\"ltr\">[(22) + (11) + (12) + (0) + (24)]/5 = <b>69/5 = 13.8</b></span>"
     ],
     "figH": {
      "os-prio-sim": "محاكي الـ priority scheduling",
      "os-prio-rr-sim": "محاكي الـ priority مع الـ Round Robin"
     }
    },
    {
     "h": "الـ Priority Scheduling مع Round-Robin (سلايد 25)",
     "pts": [
      "الـ P4 (priority 1) بتشتغل لوحدها 0–7؛ الـ P2 والـ P3 (priority 2) بيتبادلوا بـ quanta قد 2 لحد ما P2 تخلص عند 16، وبعدين P3 تشتغل 16–20؛ الـ P1 والـ P5 (priority 3) بيتبادلوا 20–27. وكل waiting time بيساوي الـ completion ناقص الـ burst:<span class=\"ltr\">P1 26 − 4 = 22, P2 16 − 5 = 11, P3 20 − 8 = 12, P4 7 − 7 = 0, P5 27 − 3 = 24 → 69/5 = 13.8</span>"
     ]
    },
    {
     "h": "الـ Multilevel queue والـ multilevel feedback queue",
     "pts": [
      "الـ <b>Multilevel queue</b>: مع الـ priority scheduling، بنعمل queue منفصلة لكل priority ونعمل schedule من الـ queue اللي ليها أعلى priority. الترتيب ممكن يبقى حسب نوع الـ process، من الأعلى للأوطى:<span class=\"ltr\"><b>real-time</b> → <b>system</b> → <b>interactive</b> → <b>batch</b></span>",
      "شكل (سلايد 26، الـ multilevel queue): فيه queue لكل مستوى priority:<span class=\"ltr\"><b>priority = 0</b>: T0 T1 T2 T3 T4</span><span class=\"ltr\"><b>priority = 1</b>: T5 T6 T7</span><span class=\"ltr\"><b>priority = 2</b>: T8 T9 T10 T11</span>وبعدين نقط (مستويات تانية)، وفي الآخر:<span class=\"ltr\"><b>priority = n</b>: Tx Ty Tz</span>اعمل schedule للـ process اللي في الـ queue اللي ليها أعلى priority.",
      "شكل (سلايد 27، الترتيب حسب نوع الـ process): أربع queues أفقية، كل واحدة فيها سهم داخل من الشمال وسهم خارج من اليمين؛ من فوق (<b>highest priority</b>) لتحت (<b>lowest priority</b>): <b>real-time processes</b> و <b>system processes</b> و <b>interactive processes</b> و <b>batch processes</b>.",
      "الـ <b>Multilevel feedback queue</b>: الـ process <b>تقدر تتنقل بين الـ queues</b>. بيتعرف بـ: عدد الـ queues؛ الـ scheduling algorithm لكل queue؛ طريقة <b>ترقية (upgrade)</b> الـ process؛ طريقة <b>تنزيل (demote)</b> الـ process؛ وطريقة تحديد الـ process تدخل أنهي queue لما تحتاج خدمة.",
      "<b>الـ Aging ممكن يتعمل</b> باستخدام multilevel feedback queue.",
      "مثال:<br>• الـ Q0 شغالة RR بـ q = 8 ms.<br>• الـ Q1 شغالة RR بـ q = 16 ms.<br>• الـ Q2 شغالة FCFS.<br>والـ process الجديدة بتدخل Q0 وتاخد 8 ms؛ لو ماخلصتش بتنزل Q1 وتاخد 16 ms كمان؛ لو لسه ماخلصتش بتتعملها preempt وتنزل Q2.",
      "شكل (سلايد 29، الـ multilevel feedback queue): سهم داخل على الـ queue اللي <b>quantum = 8</b>؛ كل queue ليها سهم خارج على اليمين (الـ process بتخلص هناك)؛ وفيه خط من آخر الـ queue اللي quantum = 8 نازل يدخل الـ queue اللي <b>quantum = 16</b>، وخط من آخر الـ queue دي نازل يدخل الـ queue اللي <b>FCFS</b>."
     ],
     "figH": {
      "os-mlq": "الـ multilevel queue، يعني queue لكل priority",
      "os-mlq-types": "الـ multilevel queue على حسب نوع الـ process",
      "os-mlfq": "الـ multilevel feedback queue: الـ processes بتتنقل بين الـ queues"
     }
    },
    {
     "h": "مسألة مراجعة محلولة (Topic 3 Q4، وكمان Midterm 2021/22)",
     "pts": [
      "عندنا 4 processes كلهم واصلين عند time 0 بالترتيب P1…P4 (الـ burst والـ priority):<span class=\"ltr\">P1 = 10 (priority 3), P2 = 3 (1), P3 = 2 (2), P4 = 1 (4)</span>والجدول اللي فوق بيفصّل حالة الـ RR بـ q = 1.",
      "بالـ <b>FCFS</b>:<span class=\"ltr\">P1 0–10 | P2 10–13 | P3 13–15 | P4 15–16 → WT 0, 10, 13, 15</span>والمتوسط <b>9.5</b>.",
      "بالـ <b>SJF</b>:<span class=\"ltr\">P4 0–1 | P3 1–3 | P2 3–6 | P1 6–16 → WT P1 6, P2 3, P3 1, P4 0</span>والمتوسط <b>2.5</b>.",
      "بالـ <b>RR q = 1</b>:<span class=\"ltr\">P1 0–1 | P2 1–2 | P3 2–3 | P4 3–4 | P1 4–5 | P2 5–6 | P3 6–7 | P1 7–8 | P2 8–9 | P1 9–16 → WT P1 6, P2 6, P3 5, P4 3</span>والمتوسط <b>5</b>.",
      "بالـ <b>Priority</b>:<span class=\"ltr\">P2 0–3 | P3 3–5 | P1 5–15 | P4 15–16 → WT 5, 0, 3, 15</span>والمتوسط <b>5.75</b>.",
      "أقل متوسط waiting time بيبقى مع الـ <b>SJF (2.5)</b>، لأن الـ SJF مثبت إنه optimal.",
      "مراجعة Q5 (الـ starvation): <b>الـ SJF والـ priority</b> ممكن يعملوا starvation (الـ jobs الطويلة أو اللي الـ priority بتاعها واطي ممكن تستنى للأبد)؛ والحل هو <b>aging</b>. الـ FCFS والـ RR مافيهمش starvation. الـ slides وورقة المراجعة بيركزوا على الـ priority."
     ],
     "figH": {
      "os-review-sim": "مسألة المراجعة: كل الـ algorithms على نفس الـ processes"
     }
    }
   ],
   "cards": [
    "تنفيذ الـ process بيتبادل بين CPU bursts وI/O bursts.",
    "لما الـ process تتحول من running لـ waiting، أو من running لـ ready، أو من waiting لـ ready، أو تخلص (terminates).",
    "الـ scheduling بيحصل بس لما الـ process تخلص أو تروح waiting (الحالات 1 و4).",
    "الـ switch context، والتحويل لـ user mode، والنط للمكان الصح في برنامج الـ user.",
    "الوقت اللي الـ dispatcher بياخده عشان يوقف process ويشغّل التانية.",
    "عدد الـ processes اللي بتخلص في وحدة الزمن (maximize).",
    "الـ completion ناقص الـ arrival (minimize).",
    "الوقت اللي في الـ ready queue، وبيساوي الـ turnaround ناقص الـ burst (minimize).",
    "الوقت من تقديم الـ request لحد أول response (minimize).",
    "الـ SJF (هو الـ optimal).",
    "الـ Shortest-Remaining-Time-First (SRTF).",
    "الـ FCFS (FIFO).",
    "مفيش process تستنى أكتر من (n − 1)q.",
    "الـ processes اللي الـ priority بتاعها واطي ممكن عمرها ما تشتغل؛ الحل aging (زوّد الـ priority مع الوقت).",
    "أصغر integer = أعلى priority.",
    "الـ processes بتتنقل بين الـ queues (upgrade/demote)؛ وممكن يتعمل بيه aging.",
    "الأعلى priority الأول؛ والـ priorities المتساوية بيتقاسموا الـ CPU بالـ round robin."
   ],
   "qa": [
    "الـ CPU scheduler بيختار process من الـ ready queue كل ما الـ process:<br>(1) تتحول من running لـ waiting<br>(2) أو تتحول من running لـ ready<br>(3) أو تتحول من waiting لـ ready<br>(4) أو تخلص.<br>في الحالات 1 و4 مفيش اختيار: لازم process جديدة تتختار. في الحالات 2 و3 فيه اختيار. لو الـ scheduling بيحصل في 1 و4 بس يبقى non-preemptive؛ غير كده يبقى preemptive. بعدين الـ dispatcher بيعمل switch context، ويحوّل لـ user mode، وينط للمكان الصح.",
    "الـ Non-preemptive: أول ما الـ process تاخد الـ CPU بتفضل ماسكاه لحد ما تخلص أو تروح waiting (القرارات بس في الحالات 1 و4)، زي الـ FCFS والـ SJF أو الـ priority الـ non-preemptive. الـ Preemptive: الـ CPU ممكن يتاخد من process شغالة لما تروح ready أو process تانية تبقى ready (الحالات 2 و3 كمان)، زي الـ RR والـ SRTF والـ preemptive priority. الـ preemption بيدّي response أحسن بس ممكن يعمل race conditions على الداتا المشتركة. أغلب الـ OSs الحديثة (زي Windows و macOS و Linux و UNIX) preemptive.",
    "الـ CPU utilization: خلّي الـ CPU مشغول (maximize). الـ Throughput: الـ processes اللي بتخلص في وحدة الزمن (maximize). الـ Turnaround time: وقت تنفيذ الـ process، من التقديم للنهاية (minimize). الـ Waiting time: الوقت اللي في الـ ready queue (minimize). الـ Response time: الوقت من الـ request لأول response (minimize).",
    "الـ Priority scheduling (والـ SJF/SRTF، اللي هو priority حسب طول الـ burst) ممكن يعمل starvation للـ processes اللي الـ priority بتاعها واطي أو الطويلة، اللي ممكن عمرها ما تتنفذ. الحل هو الـ aging: مع مرور الوقت، زوّد الـ priority بتاع الـ processes المستنية. الـ FCFS والـ RR مايقدروش يعملوا starvation لـ process.",
    "لو الـ q كبير جدًا، الـ RR بيتحول لـ FCFS. لو الـ q صغير أوي، الـ CPU بيقضي أغلب وقته في الـ context switching (overhead). الـ q لازم يبقى كبير مقارنة بوقت الـ context-switch؛ عادة الـ q بيبقى 10–100 ms والـ switch أقل من 10 µs.",
    "في (a) و (b):<br>• بالـ <b>FCFS</b>:<span class=\"ltr\">P1 0–10 | P2 10–13 | P3 13–15 | P4 15–16 → WT P1 0, P2 10, P3 13, P4 15 → 38/4 = 9.5</span>• بالـ <b>SJF</b>:<span class=\"ltr\">P4 0–1 | P3 1–3 | P2 3–6 | P1 6–16 → WT P1 6, P2 3, P3 1, P4 0 → 10/4 = 2.5</span>• بالـ <b>RR (q = 1)</b>:<span class=\"ltr\">P1 0–1 | P2 1–2 | P3 2–3 | P4 3–4 | P1 4–5 | P2 5–6 | P3 6–7 | P1 7–8 | P2 8–9 | P1 9–16 → WT P1 6, P2 6, P3 5, P4 3 → 20/4 = 5</span>• بالـ <b>Priority</b>:<span class=\"ltr\">P2 0–3 | P3 3–5 | P1 5–15 | P4 15–16 → WT P1 5, P2 0, P3 3, P4 15 → 23/4 = 5.75</span>وفي (c)، الـ <b>SJF</b> هو اللي بيدّي أقل متوسط waiting time (2.5)."
   ],
   "quiz": [
    [
     "الـ FCFS مش optimal: لو process طويلة في الأول بتخلّي القصيرين يستنوا (convoy effect). مثال المحاضرة بيدي 17 مع FCFS مقابل 3 لو رتبنا أحسن.",
     "صح. الـ SJF هو الـ optimal في متوسط الـ waiting time.",
     "الـ RR بيدّي response أحسن بس غالبًا waiting/turnaround أعلى من الـ SJF.",
     "بيبقى optimal بس لو الـ priority تساوي طول الـ burst (يعني يتحول لـ SJF)."
    ],
    [
     "الـ starvation هي المشكلة نفسها: الـ low-priority processes ممكن عمرها ما تتنفذ. السؤال بيسأل عن الحل، واللي هو الـ aging.",
     "الـ ready queue ده المكان اللي الـ processes بتستنى فيه الـ CPU. ده جزء من الـ scheduling، مش حل لإن الـ low-priority processes تفضل blocked على طول.",
     "الـ wait queue فيها الـ processes اللي مستنية event أو I/O. مبتعملش أي حاجة عشان ترفع الـ priority بتاعة الـ processes اللي عندها starvation.",
     "صح. نزوّد الـ priority بالتدريج للـ processes المستنية."
    ],
    [
     "الـ Busy waiting بيخلي الـ CPU مشغول بحاجة مش مفيدة.",
     "صح. الـ busy-wait loop بيضيّع CPU cycles كانت ممكن process تانية تستخدمها. محاضرة الـ I/O بتقول إنه معقول بس لو الجهاز سريع، وغير كده مش efficient."
    ],
    [
     "الـ 3 دي متوسط الـ FCFS لو الترتيب كان P2 ثم P3 ثم P1:<span class=\"ltr\">(6 + 0 + 3)/3 = 3</span>لكن هنا P1 جاية الأول، فالـ jobs القصيرة بتستنى وراها.",
     "صح. الـ Gantt chart:<span class=\"ltr\">P1 0–24 | P2 24–27 | P3 27–30</span>والـ WT:<span class=\"ltr\">0 + 24 + 27 = 51, 51/3 = 17</span>(الـ FCFS في Topic 3).",
     "الـ 5.67 دي نتيجة الـ Round Robin بـ q = 4 لنفس الـ processes (WT 6 + 4 + 7 = 17، 17/3). الـ FCFS بيدي 17.",
     "الـ 27 دي الـ waiting time بتاع P3 لوحدها. المتوسط لازم يدخّل P1 (0) وP2 (24): (0 + 24 + 27)/3 = 17."
    ],
    [
     "صح. الـ WT = 6 + 4 + 7 = 17، و17/3 = 5.67.",
     "الـ 17 دي متوسط الـ FCFS للترتيب ده. الـ RR بـ q = 4 بيخلّي P2 وP3 يشتغلوا بدري، فالمتوسط بينزل لـ 5.67.",
     "الـ 4 دي الـ waiting time بتاع P2 بس (بتبدأ عند 4). المتوسط (6 + 4 + 7)/3 = 5.67.",
     "الـ 7 دي الـ waiting time بتاع P3 بس (بتبدأ عند 7). المتوسط (6 + 4 + 7)/3 = 5.67."
    ],
    [
     "ده الـ non-preemptive SJF بأوقات الوصول دي.",
     "صح. الـ WT = 9 + 0 + 15 + 2 = 26، و26/4 = 6.5.",
     "الـ 8.75 دي نتيجة الـ FCFS:<span class=\"ltr\">P1 0–8 | P2 8–12 | P3 12–21 | P4 21–26 → WT 0 + 7 + 10 + 18 = 35, 35/4 = 8.75</span>أما الـ SRTF فبيدي 6.5.",
     "مفيش schedule صح بيدي 5. الـ SRTF في السلايد:<span class=\"ltr\">P1 0–1 | P2 1–5 | P4 5–10 | P1 10–17 | P3 17–26 → WT 9 + 0 + 15 + 2 = 26, 26/4 = 6.5</span>"
    ],
    [
     "إن P1 تكمّل عشان بدأت الأول ده سلوك non-preemptive. الـ SRTF ده preemptive: أي process جديدة أقصر بتاخد الـ CPU.",
     "صح. الـ SRTF هو الـ SJF الـ preemptive: لما process توصل بـ burst (4) أقصر من الـ remaining time بتاع اللي شغالة (7)، بتعملها preempt. في السلايد P2 بتشتغل من 1 لـ 5 (الـ SRTF في Topic 3).",
     "المثال فيه CPU واحد، فـ process واحدة بس اللي بتشتغل في المرة؛ الـ scheduler لازم يختار، والـ SRTF بيختار اللي الـ remaining time بتاعها أقصر.",
     "الـ SRTF مفيهوش time quantum؛ الـ quanta دي تبع الـ Round Robin. الـ SRTF بيعمل reschedule كل ما process جديدة توصل."
    ],
    [
     "الانتقال من running لـ ready ومن waiting لـ ready دول الحالة 2 و3، اللي فيهم في اختيار؛ لو عملنا scheduling فيهم يبقى الـ scheme ده preemptive.",
     "صح. المحاضرة بتقول لو الـ scheduling بيحصل في الحالة 1 (من running لـ waiting) والحالة 4 (terminates) بس، يبقى الـ scheme ده nonpreemptive: الـ process بتفضل ماسكة الـ CPU لحد ما تسيبه بنفسها (Topic 3).",
     "إنشاء الـ process مش واحدة من الأربع حالات. الـ process الجديدة بتدخل الـ ready queue؛ والـ non-preemptive scheduler مش هياخد الـ CPU من اللي شغالة عشانها.",
     "الـ timer interrupt بينقل الـ process من running لـ ready (الحالة 2)، وده preemptive. الـ non-preemptive scheduling مبيستخدموش."
    ],
    [
     "الـ RR بـ quantum كبير مبيرتّبش حسب طول الـ burst. الـ SJF كان هيختار أقصر job الأول، لكن الـ RR بيفضل على ترتيب الوصول.",
     "صح. كل process بتخلص الـ burst بتاعها في quantum واحد، بترتيب الوصول.",
     "الـ RR مبيبصّش على الـ priorities. مع quantum ضخم هو ببساطة بيشغّل كل process لحد ما تخلص بترتيب الوصول، وده FCFS.",
     "الـ SRTF بيعمل preempt عشان الـ remaining time الأقصر. الـ quantum الكبير جدًا معناه مفيش preemption خالص، فالـ RR بيبقى FCFS (\"q large → FIFO\")."
    ],
    [
     "الـ switching context ده أول بند في ليستة المحاضرة للي الـ dispatcher بيعمله، فهو مش الإجابة.",
     "الـ switching to user mode ده تاني وظيفة للـ dispatcher في المحاضرة، وبيحصل قبل ما الـ process المختارة تشتغل.",
     "الـ jump للمكان الصح في الـ user program عشان يكمّل تشغيله ده تالت وظيفة للـ dispatcher في ليستة المحاضرة.",
     "الاختيار الصح. الاختيار ده شغل الـ CPU scheduler؛ الـ dispatcher بس بيدّيها الـ CPU."
    ],
    [
     "صح. الترتيب:<span class=\"ltr\">P2, P5, P1, P3, P4 → WT 6 + 0 + 16 + 18 + 1 = 41, 41/5 = 8.2</span>",
     "الـ 9.6 دي FCFS بالترتيب P1–P5: الـ WT = 0 + 10 + 11 + 13 + 14 = 48، و48/5 = 9.6. الـ priority بيشغّل P2 الأول وبيدي 8.2.",
     "الـ 3.2 دي نتيجة الـ SJF حسب الـ burst:<span class=\"ltr\">P2, P4, P3, P5, P1 → WT 0 + 1 + 2 + 4 + 9 = 16, 16/5 = 3.2</span>والـ priority مبيبصّش على طول الـ burst.",
     "الـ 5.4 دي Round Robin بـ q = 1: الـ WT = 9 + 1 + 5 + 3 + 9 = 27، و27/5 = 5.4. الـ priority scheduling بيدي 41/5 = 8.2."
    ],
    [
     "الوقت من الـ submission لحد الـ completion ده الـ turnaround time. الـ waiting time بيحسب الوقت اللي في الـ ready queue بس.",
     "صح. المحاضرة بتعرّف الـ waiting time إنه مجموع الوقت اللي الـ process قعدته مستنية في الـ ready queue؛ والمفروض نقلله (الـ Scheduling Criteria في Topic 3).",
     "الوقت من تقديم الـ request لحد ما أول response يطلع ده الـ response time، وده criterion تاني منفصل.",
     "وقت الـ I/O بيتقضي في الـ waiting state، مش في الـ ready queue. الـ waiting time بيحسب بس الوقت اللي الـ process فيه ready ومش شغالة."
    ]
   ],
   "extra": [
    [
     "ده متوسط الـ waiting time (0 + 4 + 6 + 13)/4. الـ Turnaround بيشمل الـ burst كمان.",
     "ده متوسط الـ completion time (5 + 8 + 16 + 18)/4 = 47/4 = 11.75. لازم تطرح الـ arrival time لكل واحدة.",
     "صح. الـ Gantt chart:<span class=\"ltr\">P1 0–5 | P2 5–8 | P3 8–16 | P4 16–18</span>والـ TAT بيساوي الـ CT ناقص الـ AT:<span class=\"ltr\">5, 7, 14, 15 → 41/4 = 10.25</span>",
     "ده متوسط الـ turnaround في الـ non-preemptive SJF للـ processes دي، مش FCFS."
    ],
    [
     "صح. الـ P1 بس اللي موجودة عند 0، فبتشتغل 0–5؛ وبعدين أقصر job جاهزة:<span class=\"ltr\">P4 5–7 | P2 7–10 | P3 10–18 → WT 0, 6, 8, 2 → 16/4 = 4</span>",
     "ده بيعامل كل الـ processes كأنها وصلت عند 0 (بالترتيب P4 ثم P2 ثم P1 ثم P3). لازم تحترم الـ arrival times، لأن P4 مش موجودة عند time 0.",
     "ده متوسط الـ waiting time في الـ FCFS لنفس الـ processes.",
     "ده متوسط الـ turnaround time، مش الـ waiting time."
    ],
    [
     "ده الـ non-preemptive SJF (الـ P1 من 0 لـ 6، وبعدين P3 ثم P4 ثم P2). الـ SRTF بيعمل preempt لـ P1 لما P2 توصل بـ burst أقصر.",
     "الـ 4.5 دي نتيجة الـ FCFS:<span class=\"ltr\">P1 0–6 | P2 6–9 | P3 9–10 | P4 10–12 → WT 0 + 5 + 7 + 6 = 18, 18/4 = 4.5</span>أما الـ SRTF فبيعمل preempt وبيدي 2.",
     "ده متوسط الـ turnaround time في الـ SRTF (12 + 4 + 1 + 3)/4، مش الـ waiting time.",
     "صح. الترتيب:<span class=\"ltr\">P1 0–1 | P2 1–2 | P3 2–3 | P2 3–5 | P4 5–7 | P1 7–12 → WT P1 6, P2 1, P3 0, P4 1 → 8/4 = 2</span>"
    ],
    [
     "ده الـ FCFS (الـ WT فيه 0 و 6 و 9). أما في الـ RR، فـ P1 بتتعملها preempt بعد 2 units.",
     "صح. الترتيب:<span class=\"ltr\">P1 0–2 | P2 2–4 | P3 4–5 | P1 5–7 | P2 7–8 | P1 8–10</span>والـ WT بيساوي الـ CT ناقص الـ burst:<span class=\"ltr\">4, 5, 4 → 13/3 ≈ 4.33</span>",
     "ده متوسط الـ turnaround (10 + 8 + 5)/3. اطرح الـ burst لكل واحدة عشان تجيب الـ waiting time.",
     "ده الـ SJF (الترتيب P3 ثم P2 ثم P1)، والـ RR مابيعملش كده."
    ],
    [
     "ده متوسط الـ waiting time (3 + 0 + 13 + 7)/4.",
     "ده ترتيب الـ FCFS (P1 ثم P2 ثم P3 ثم P4)، اللي بيتجاهل الـ priorities.",
     "ده بيعامل أكبر رقم على إنه أعلى priority. في المحاضرة أصغر integer هو الأعلى.",
     "صح. الترتيب:<span class=\"ltr\">P2 0–3 | P1 3–7 | P4 7–13 | P3 13–15</span>والـ TAT بيساوي الـ CT:<span class=\"ltr\">7, 3, 15, 13 → 38/4 = 9.5</span>"
    ],
    [
     "ده n × q. الـ process مابتستناش الـ quantum بتاعها هي، فهو (n − 1)q.",
     "صح. مفيش process تستنى أكتر من (n − 1)q = 4 × 20 = 80 ms.",
     "ده quantum واحد، وده صح بس لو فيه 2 processes.",
     "ده q / n. كل process بتاخد 1/n من الـ CPU، بس في حتت حجمها q."
    ],
    [
     "صح. بتدخل Q0 وتاخد 8 ms، بتنزل Q1 تاخد 16 ms كمان (24 إجمالي)، وبعدين بتتعملها preempt وتنزل Q2 للـ 6 ms الباقيين.",
     "الـ quantum بتاع Q1 هو 16 ms بس، فبعد 24 ms إجمالي الـ process بتنزل لـ Q2.",
     "كل process جديدة بتدخل Q0؛ وبتنزل بس بعد ما تخلّص الـ quantum بتاعها.",
     "الـ quanta متلخبطة: Q0 ليها q = 8 وQ1 ليها q = 16."
    ],
    [
     "الـ Turnaround (من التقديم للنهاية) لازم يبقى minimize.",
     "الـ Response time (من التقديم لأول response) لازم يبقى minimize.",
     "صح. الـ Throughput، عدد الـ processes اللي بتخلص في وحدة الزمن، بيبقى maximize (زي الـ CPU utilization).",
     "الـ waiting time، اللي هو الوقت في الـ ready queue، المفروض نقلله. الـ throughput والـ CPU utilization بس اللي بنزوّدهم."
    ],
    [
     "صح. الـ process ممكن تتعملها preempt وهي بتحدّث داتا مشتركة، والـ process اللي بعدها تقرا داتا مش متسقة.",
     "المحاضرة بتعتبر الـ race conditions على الداتا المشتركة هي تمن الـ preemption. الـ non-preemptive scheduling بيتجنب ده."
    ],
    [
     "الـ Real-time processes ليها أعلى priority، مش الـ interactive.",
     "ده الترتيب بالمقلوب: الـ batch processes ليها أقل priority والـ real-time ليها الأعلى.",
     "الـ real-time، مش الـ system، هي اللي في الأول، والـ batch، مش الـ interactive، هي الأخيرة. والترتيب الصح:<span class=\"ltr\">real-time → system → interactive → batch</span>",
     "صح. ده ترتيب المحاضرة حسب نوع الـ process."
    ]
   ]
  },
  "4": {
   "notes": [
    {
     "h": "خلفية، والـ base والـ limit registers",
     "pts": [
      "البرنامج لازم يتجاب من الـ disk للـ memory ويتحط جوة process عشان يشتغل. <b>الـ main memory والـ registers</b> هما الـ storage الوحيد اللي الـ CPU يقدر يوصله مباشرة.",
      "الـ memory unit بتشوف بس سلسلة addresses + read requests، أو address + data + write requests. الوصول للـ register بياخد CPU clock واحدة (أو أقل)؛ الـ main memory ممكن تاخد cycles كتير؛ والـ <b>cache</b> قاعد بين الـ main memory والـ CPU registers.",
      "الـ <b>protection</b> بتاع الـ memory لازم عشان الشغل يبقى صح.",
      "زوج <b>base وlimit registers</b> بيحدد الـ logical address space بتاع الـ process. الـ CPU بيتشيك على كل memory access في الـ user-mode: الـ access يبقى legal لو <bdi dir=\"ltr\"><b>base ≤ address &lt; base + limit</b></bdi>، وغير كده بيحصل <b>trap</b> للـ OS (addressing error).<br>مثال الرسمة: الـ base هو 300040 والـ limit هو 120900، يعني الـ range الـ legal هو <bdi dir=\"ltr\">300040 … 420939</bdi>."
     ],
     "figH": {
      "os-base-limit": "الـ base والـ limit registers: بيتشيكوا على كل address"
     }
    },
    {
     "h": "الـ Address binding؛ الـ logical مقابل الـ physical addresses؛ الـ MMU",
     "pts": [
      "البرامج اللي على الـ disk ومستنية تتحمّل بتكوّن الـ <b>input queue</b>. الـ addresses بتبقى <b>symbolic</b> في الـ source code (variables)، و<b>relocatable</b> بعد الـ compiling (\"14 bytes من أول الـ module ده\")، و<b>absolute</b> بعد ما الـ linker/loader يعملها bind (زي 74014).",
      "الـ Binding ممكن يحصل في 3 مراحل: <br>• في الـ <b>compile time</b>: لو مكان الـ memory معروف من الأول، بيطلع absolute code؛ ولازم تعمل recompile لو مكان البداية اتغير.<br>• في الـ <b>load time</b>: بيطلع relocatable code لو المكان مش معروف وقت الـ compile.<br>• في الـ <b>execution time</b>: الـ binding بيتأجل لوقت التشغيل لو الـ process ممكن تتنقل وهي شغالة؛ ومحتاج دعم hardware (base وlimit registers).",
      "الـ multistep processing بيمشي كده:<span class=\"ltr\">source program → compiler/assembler → object module → linkage editor → load module → loader → in-memory binary image</span>الـ linkage editor بياخد كمان object modules تانية، والـ loader بياخد الـ system library، وفيه system library بتتحمّل ديناميك وقت التشغيل عن طريق الـ dynamic linking.",
      "الـ <b>Logical (virtual) address</b>: الـ CPU هو اللي بيطلّعه. الـ <b>Physical address</b>: الـ address اللي الـ memory unit بتشوفه. هما <b>نفس الحاجة</b> في الـ compile-time والـ load-time binding و<b>بيختلفوا</b> في الـ execution-time binding.",
      "الـ <b>Logical address space</b> = مجموعة كل الـ logical addresses اللي البرنامج بيطلّعها؛ الـ <b>physical address space</b> = مجموعة كل الـ physical addresses اللي بتقابلها.",
      "الـ <b>MMU (Memory-Management Unit)</b>: hardware بيعمل mapping من virtual لـ physical addresses وقت التشغيل. أبسط طريقة: الـ base register بيبقى <b>relocation register</b>، وقيمته بتتجمع على كل address الـ user process بتبعته للـ memory (مثلًا <bdi dir=\"ltr\">relocation 14000 + logical 346 = physical 14346</bdi>). برنامج الـ user بيتعامل مع logical addresses بس وعمره ما بيشوف الـ physical addresses الحقيقية.",
      "الـ <b>Dynamic loading</b> (slide 10): الـ routine مابتتحمّلش غير لما تتنادى؛ استخدام أحسن لمساحة الـ memory (الـ routine اللي مش مستخدمة عمرها ما بتتحمّل)؛ كل الـ routines متخزنة على الـ disk بـ relocatable load format؛ مفيد للكود الكبير اللي نادرًا ما بيستخدم (error handling). مش محتاج دعم خاص من الـ OS: بيتعمل من خلال تصميم البرنامج، وإن كان الـ OS ممكن يوفر libraries."
     ],
     "figH": {
      "os-binding-steps": "من الـ source program للـ memory image، والـ 3 أوقات بتاعة الـ binding",
      "os-mmu-reloc": "الـ MMU بيجمع الـ relocation register على كل logical address"
     }
    },
    {
     "h": "الـ Swapping",
     "pts": [
      "الـ process ممكن تتعملها <b>swap</b> مؤقتًا برة الـ memory لـ <b>backing store</b> وترجع تاني عشان تكمّل. فمجموع الـ physical memory بتاعة كل الـ processes ممكن يعدّي الـ physical memory الموجودة.",
      "الـ <b>backing store</b> هو disk سريع وكبير كفاية يشيل نسخ من كل الـ memory images، وفيه direct access ليها.",
      "الـ <bdi dir=\"ltr\"><b>roll out, roll in</b></bdi> هو نوع من الـ swapping للـ priority-based scheduling؛ الـ process اللي الـ priority بتاعها أوطى بتتعملها swap out عشان اللي أعلى تتحمّل وتشتغل.",
      "الجزء الأكبر من وقت الـ swap هو الـ <b>transfer time</b>، وبيتناسب طرديًا مع كمية الـ memory اللي بتتعملها swap. السيستم بيحتفظ بـ ready queue للـ processes اللي الـ memory images بتاعتها على الـ disk.",
      "لو الـ process الجاية مش في الـ memory، الـ context switch لازم يعمل swap out لـ process وswap in للتانية: 100 MB بسرعة 50 MB/s = <b>2000 ms</b> out + 2000 ms in = <b>4 s</b> إجمالي جزء الـ swap."
     ],
     "figH": {
      "os-swapping": "الـ Swapping: الـ roll out والـ roll in، ووقت الـ swap"
     }
    },
    {
     "h": "الـ Contiguous allocation ومشكلة الـ dynamic storage-allocation",
     "pts": [
      "الـ main memory متقسمة لـ two partitions: الـ <b>resident OS</b> (غالبًا في الـ low memory، ومعاه الـ interrupt vector) والـ <b>user processes</b> (الـ high memory). كل process في <b>section واحدة contiguous</b>.",
      "الـ Relocation registers بتحمي الـ processes من بعض ومن الـ OS: <br>• الـ <b>base (relocation) register</b> فيه أصغر physical address.<br>• الـ <b>limit register</b> فيه الـ range بتاع الـ logical addresses، يعني كل logical address لازم يبقى أصغر من الـ limit.<br>والـ MMU بيعمل mapping ديناميك: لو <bdi dir=\"ltr\">logical &lt; limit</bdi> يبقى <bdi dir=\"ltr\">physical = logical + relocation</bdi>، وغير كده بيحصل trap.",
      "الـ <b>Multiple-partition allocation</b>: الـ degree of multiprogramming محدود بعدد الـ partitions؛ partitions بأحجام متغيرة عشان الكفاءة. الـ <b>hole</b> هو block من الـ memory المتاحة. الـ process الجديدة بتاخد hole كبير كفاية؛ والـ process اللي بتخرج بتفضّي الـ partition بتاعها والـ free partitions اللي جنب بعض بتتجمع. الـ OS بيتابع الـ allocated partitions والـ free partitions (الـ holes).",
      "الـ <b>First-fit</b>: ادّي <b>أول</b> hole كبير كفاية. الـ <b>Best-fit</b>: <b>أصغر</b> hole كبير كفاية (لازم تدوّر في اللستة كلها إلا لو مترتبة بالحجم)، وده بيطلّع أصغر hole متبقي. الـ <b>Worst-fit</b>: <b>أكبر</b> hole (برضه بيدوّر في اللستة كلها)، وده بيطلّع أكبر hole متبقي.",
      "الـ First-fit والـ best-fit أحسن من الـ worst-fit في السرعة واستخدام الـ storage.",
      "الطريقة: امشي على الـ processes <b>بالترتيب</b>. بعد كل placement الـ hole بيصغر (زي 500 − 212 = 288 K) والباقي ده ممكن ياخد processes بعدين."
     ],
     "figH": {
      "os-fit-sim": "الـ First-fit والـ best-fit والـ worst-fit على partitions المثال"
     }
    },
    {
     "h": "الـ Fragmentation",
     "pts": [
      "الـ <b>External fragmentation</b>: إجمالي مساحة الـ memory موجود ويكفي الطلب، بس <b>مش contiguous</b> (بيحصل مع الـ variable partitions / segmentation).",
      "الـ <b>Internal fragmentation</b>: الـ memory المتخصصة ممكن تبقى أكبر شوية من المطلوب؛ الفرق ده memory <b>جوة الـ partition بس مش مستخدمة</b> (بيحصل مع الـ fixed blocks / paging).",
      "بنقلل الـ external fragmentation بالـ <b>compaction</b>: نحرّك محتويات الـ memory عشان نجمّع كل الـ free memory في block واحد كبير. ممكن <b>بس لو الـ relocation dynamic</b> وبيحصل وقت الـ execution.",
      "مشكلة الـ I/O وقت الـ compaction: نثبّت (latch) الـ job في الـ memory وهي بتعمل I/O، أو نعمل I/O بس في buffers الـ OS. والـ backing store عنده نفس مشاكل الـ fragmentation."
     ],
     "figH": {
      "os-ext-frag": "الـ External fragmentation والـ compaction"
     }
    },
    {
     "h": "الـ Segmentation",
     "pts": [
      "memory-management scheme بيدعم <b>نظرة الـ user للـ memory</b>: البرنامج عبارة عن مجموعة <b>segments</b>، كل واحد وحدة منطقية زي:<span class=\"ltr\">main program, procedure, function, method, object, local/global variables, common block, stack, symbol table, arrays</span>",
      "الـ logical address بيتكون من <bdi dir=\"ltr\"><b>&lt;segment-number, offset&gt;</b></bdi>.",
      "الـ <b>Segment table</b>: كل entry فيها <b>base</b> (أول physical address للـ segment) و<b>limit</b> (طول الـ segment).",
      "الـ <b>STBR</b> (segment-table base register) بيشاور على الـ segment table في الـ memory؛ الـ <b>STLR</b> (segment-table length register) فيه عدد الـ segments؛ رقم الـ segment s يبقى legal لو <bdi dir=\"ltr\"><b>s &lt; STLR</b></bdi>.",
      "الـ hardware بيعمل كده: لو <bdi dir=\"ltr\"><b>offset d &lt; limit</b></bdi> يبقى <bdi dir=\"ltr\">physical = base + d</bdi>، وغير كده بيحصل <b>trap</b> (addressing error).",
      "الـ Protection: كل entry فيها validation bit (لو قيمته 0 يبقى الـ segment مش legal) وصلاحيات read/write/execute؛ ومشاركة الكود بتحصل على مستوى الـ segment. وبما إن الـ segments أطوالها مختلفة، الـ allocation بيبقى dynamic storage-allocation problem (external fragmentation).",
      "مثال الـ slide، وكل segment مكتوب <bdi dir=\"ltr\">(limit, base)</bdi>:<span class=\"ltr\">seg0 (1000, 1400), seg1 (400, 6300), seg2 (400, 4300), seg3 (1100, 3200), seg4 (1000, 4700)</span>• الـ byte 53 من seg 2:<span class=\"ltr\">4300 + 53 = <b>4353</b></span>• الـ byte 852 من seg 3:<span class=\"ltr\">3200 + 852 = <b>4052</b></span>• الـ byte 1222 من seg 0:<span class=\"ltr\">1222 ≥ 1000 → <b>trap</b></span>"
     ],
     "figH": {
      "os-segment-xlate": "الـ Segmentation: الترجمة من <bdi dir=\"ltr\">(segment, offset)</bdi> لـ physical address"
     }
    },
    {
     "h": "الـ Paging والـ address translation",
     "pts": [
      "الـ physical address space بتاع الـ process ممكن يبقى <b>noncontiguous</b>. الـ Paging <b>بيتجنب الـ external fragmentation</b> ومشكلة الحتت اللي أحجامها مختلفة، بس <b>لسه فيه internal fragmentation</b>.",
      "الـ physical memory بتتقسم لـ blocks ثابتة الحجم اسمها <b>frames</b> (الحجم power of 2، ما بين 512 bytes و16 MB)؛ والـ logical memory لـ blocks بنفس الحجم اسمها <b>pages</b>. والـ backing store كمان بيتقسم لـ pages.",
      "بنتابع كل الـ free frames؛ عشان نشغّل برنامج فيه N pages، بنلاقي N free frames ونحمّله؛ ونعمل <b>page table</b> تترجم من logical لـ physical addresses.",
      "الـ logical address بيتكون من <b>page number p</b> (index في الـ page table، اللي فيها الـ base address/frame لكل page) + <b>page offset d</b> (بيتجمع مع الـ frame base عشان يطلع الـ physical address). لو الـ logical address space هو 2<sup>m</sup> والـ page size هو 2<sup>n</sup>: <b>الـ p هو الـ m − n bits العالية، والـ d هو الـ n bits الواطية</b>.",
      "رسمة الـ paging model، والـ page table فيها:<span class=\"ltr\">0→1, 1→4, 2→3, 3→7</span>يعني الـ page 0 في الـ frame 1، والـ page 1 في الـ frame 4، والـ page 2 في الـ frame 3، والـ page 3 في الـ frame 7.",
      "<b>مثال internal fragmentation</b>: الـ page حجمها 2,048 B والـ process حجمها 72,766 B:<span class=\"ltr\">72,766 B = 35 pages + 1,086 B → 36 frames</span><span class=\"ltr\">internal fragmentation = 2,048 − 1,086 = <b>962 B</b></span>أسوأ حالة هي <bdi dir=\"ltr\">1 frame − 1 byte</bdi>، وفي المتوسط ½ frame. الـ pages الصغيرة معناها fragmentation أقل بس page-table entries أكتر؛ وأحجام الـ pages بتكبر مع الوقت (Solaris بيدعم 8 KB و4 MB).",
      "نظرة الـ process والـ physical memory بقوا مختلفين جدًا، والـ process تقدر توصل بس للـ memory بتاعتها."
     ],
     "figH": {
      "os-paging-model": "الـ Paging model: الـ pages والـ page table والـ frames",
      "os-page-frag": "الـ Internal fragmentation في الـ paging: آخر frame"
     }
    },
    {
     "h": "الـ Paging مقابل الـ segmentation"
    }
   ],
   "cards": [
    "الـ Main memory والـ registers.",
    "بيحددوا الـ logical address space بتاع الـ process؛ وكل access لازم يحقق <bdi dir=\"ltr\">base ≤ address &lt; base + limit</bdi>.",
    "الـ compile time والـ load time والـ execution time.",
    "Logical: الـ CPU بيطلّعه (virtual). Physical: اللي الـ memory unit بتشوفه.",
    "في الـ execution-time binding.",
    "Hardware بيعمل mapping من virtual لـ physical addresses وقت التشغيل (زي إنه يجمع الـ relocation register).",
    "الـ routine مابتتحمّلش غير لما تتنادى؛ مش محتاج دعم خاص من الـ OS.",
    "نقل الـ process مؤقتًا للـ backing store وترجيعها عشان تكمّل التنفيذ.",
    "اعمل swap out لـ process الـ priority بتاعها أوطى عشان تشغّل واحدة أعلى.",
    "أول hole كبير كفاية / أصغر hole كبير كفاية / أكبر hole.",
    "إجمالي الـ free memory كفاية، بس مش contiguous.",
    "الـ block المتخصص أكبر شوية من المطلوب؛ الجزء اللي مش مستخدم جوة الـ partition.",
    "بتحرّك محتويات الـ memory عشان الـ free memory تبقى block واحد كبير؛ محتاجة dynamic relocation.",
    "Base (عنوان البداية) وlimit (الطول).",
    "Segment-table base register (مكان الـ table) / length register (عدد الـ segments، والـ s لازم يبقى <bdi dir=\"ltr\">s &lt; STLR</bdi>).",
    "الـ frame هو block ثابت من الـ physical memory، والـ page هي block بنفس الحجم من الـ logical memory.",
    "مفيش external fragmentation، بس فيه internal fragmentation في آخر page.",
    "Page number p (الـ m − n bits العالية) + offset d (الـ n bits الواطية)."
   ],
   "qa": [
    "زوج registers بيحدد الـ logical address space بتاع الـ process. الـ base فيه أصغر physical address legal، والـ limit فيه حجم الـ range. الـ CPU hardware بيتشيك على كل memory access في الـ user-mode: لو <bdi dir=\"ltr\">base ≤ address &lt; base + limit</bdi> بيكمّل؛ غير كده بيعمل trap للـ OS بـ addressing error. الـ OS بس هو اللي يقدر يحمّلهم، باستخدام privileged instructions.",
    "الـ logical (virtual) address الـ CPU بيطلّعه وقت تنفيذ البرنامج. الـ physical address هو اللي الـ memory unit بتشوفه فعلًا. هما نفس الحاجة مع الـ compile-time والـ load-time binding بس بيختلفوا مع الـ execution-time binding، لما الـ MMU بيعمل mapping من logical لـ physical وقت التشغيل (زي إنه يجمع الـ relocation register). البرنامج عمره ما بيشوف غير logical addresses.",
    "الـ First-fit: 212→500 (فاضل 288)، 417→600، 112→288، 426 لازم يستنى. الـ Best-fit: 212→300، 417→500، 112→200، 426→600. الـ Worst-fit: 212→600 (فاضل 388)، 417→500، 112→388، 426 لازم يستنى. الـ Best-fit هو اللي بيستخدم الـ memory بأكفأ طريقة هنا لأنه الوحيد اللي حط الأربعة.",
    "الـ External: فيه free memory إجمالي كفاية للطلب، بس مش contiguous. بيحصل مع الـ variable partitions والـ segmentation، والـ compaction بيحله. الـ Internal: الـ process بتاخد block أكبر شوية من اللي طلبته، والمساحة اللي مش مستخدمة جوة الـ partition بتضيع. بيحصل مع الـ fixed-size blocks زي الـ paging، زي 962 bytes في آخر page حجمها 2 KB.",
    "الـ physical memory بتتقسم لـ frames ثابتة الحجم والـ logical memory لـ pages بنفس الحجم. الـ process اللي فيها N pages بتتحمّل في أي N free frames، ومش لازم يبقوا contiguous. الـ page table بتعمل mapping لكل page number على الـ frame بتاعه. الـ address بتاع الـ CPU بيتقسم لـ page number p (الـ index في الـ page table) وoffset d، والـ physical address بيساوي <bdi dir=\"ltr\">frame × page size + d</bdi>. الـ Paging بيتجنب الـ external fragmentation بس لسه فيه internal fragmentation.",
    "الـ Paging بيستخدم pages ثابتة الحجم مش باينة للـ user. الـ address بتاعه <bdi dir=\"ltr\">(p, d)</bdi> مع page table فيها frames، وفيه internal fragmentation بس مفيش external. الـ Segmentation بيستخدم segments منطقية أحجامها متغيرة بتطابق نظرة الـ user (زي الـ main والـ stack والـ functions…). الـ address بتاعه <bdi dir=\"ltr\">(s, d)</bdi> مع segment table فيها base وlimit، وفيه external fragmentation بس مفيش internal. الـ Segments بتتعملها allocation بـ first/best/worst fit، والـ protection والمشاركة بييجوا طبيعي لكل segment."
   ],
   "quiz": [
    [
     "الـ partition اللي 100 KB أصغر من 112 KB، فالـ first-fit بيعدّيها وياخد أول hole بعدها يكفي: الـ 288 KB اللي فاضلين في الـ partition اللي 500 KB <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "صح. بعد ما الـ 212 يروح الـ 500، أول hole ≥ 112 هو الـ 288 K المتبقي.",
     "الـ partition اللي 200 KB دي اختيار الـ best-fit (أصغر hole ≥ 112 KB)؛ الـ first-fit بيقف قبلها، عند الـ hole اللي 288 KB الفاضل في الـ 500 KB <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "الـ hole اللي 388 KB (600 − 212) ده اختيار الـ worst-fit، عشان الـ worst-fit حط الـ 212 KB في الـ 600 KB؛ الـ first-fit حط 212 في الـ 500 و417 في الـ 600 <bdi dir=\"ltr\">(Topic 4)</bdi>."
    ],
    [
     "الـ first-fit بيحط 212→500، 417→600، 112→288، وبعدين مفيش hole ≥ 426 KB، فالـ 426 KB لازم تستنى (Topic 4، مثال الـ Dynamic Storage-Allocation).",
     "صح. هو الوحيد اللي بيحط الأربع processes.",
     "الـ worst-fit بيحط 212→600، 417→500، 112→388، وبعدين مفيش hole ≥ 426 KB، فالـ 426 KB لازم تستنى <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "مش متساويين: الـ first-fit والـ worst-fit الاتنين بيسيبوا الـ process اللي 426 KB مستنية، أما الـ best-fit بيحط الأربعة، فالسلايد بيقول إن الـ best-fit هو الأحسن هنا <bdi dir=\"ltr\">(Topic 4)</bdi>."
    ],
    [
     "الـ Internal هو مساحة ضايعة جوة block متخصص.",
     "صح. المحاضرة بتعرّف الـ external fragmentation: مجموع الـ memory الفاضية يكفي الـ request، بس مش contiguous. والـ compaction ممكن يقللها <bdi dir=\"ltr\">(Topic 4, Fragmentation)</bdi>.",
     "الـ thrashing مشكلة تبع الـ virtual memory (process مشغولة إنها تعمل swap للـ pages رايح جاي، Topic 5)، مش memory فاضية متقسمة holes مش contiguous.",
     "الـ page fault ده reference لـ page مش موجودة في الـ memory <bdi dir=\"ltr\">(Topic 5)</bdi>؛ مالوش علاقة بإن المساحة الفاضية متفرقة في holes مش contiguous."
    ],
    [
     "الـ 1,086 B دي المستخدم فعلًا من آخر page (72,766 − 35 × 2,048)؛ الجزء الضايع هو 2,048 − 1,086 = 962 B <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "صح، لأن <bdi dir=\"ltr\">72,766 = 35 × 2,048 + 1,086</bdi>، فآخر frame بيضيّع <bdi dir=\"ltr\">2,048 − 1,086 = 962 B</bdi>.",
     "الـ 2,047 B (frame واحد − 1 byte) دي أسوأ internal fragmentation، وبتحصل بس لما آخر page يبقى فيها 1 byte؛ هنا فيها 1,086 B <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "الـ 0 B محتاجة حجم الـ process يبقى مضاعف مظبوط لـ 2,048؛ الـ 72,766 بيفضل منها باقي 1,086 B، فـ 962 B من آخر frame بيضيعوا <bdi dir=\"ltr\">(Topic 4)</bdi>."
    ],
    [
     "الـ 590 <bdi dir=\"ltr\">(= 90 + 500)</bdi> بتجمع الـ offset من غير ما تتشيك على الـ limit الأول؛ وبما إن 500 ≥ الـ length 100، الـ hardware بيعمل trap بدل ما يطلّع address <bdi dir=\"ltr\">(Topic 4, Segmentation)</bdi>.",
     "الـ 500 دي الـ offset نفسه من غير ما نضيف الـ base؛ وفي كل الأحوال الـ offset 500 أكبر من الـ segment length 100، فالـ access بيعمل trap <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "صح. الـ offset أكبر من طول الـ segment.",
     "الـ 190 <bdi dir=\"ltr\">(= base 90 + length 100)</bdi> يعني آخر الـ segment، مش ترجمة الـ offset 500؛ وبما إن 500 ≥ 100 الـ access بيعمل trap <bdi dir=\"ltr\">(Topic 4)</bdi>."
    ],
    [
     "صح. الأول نتشيك الـ offset على الـ limit: 400 &lt; 580، يبقى legal؛ والـ physical address هو <bdi dir=\"ltr\">base + offset = 1327 + 400 = 1727</bdi> <bdi dir=\"ltr\">(Topic 4, Segmentation Example)</bdi>.",
     "الـ 1907 = 1327 + 580 بتجمع الـ segment length (آخر الـ segment) بدل الـ offset 400؛ الصح 1327 + 400 = 1727 <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "مفيش trap لأن الـ offset 400 أقل من الـ length 580؛ الـ trap بيحصل بس لما offset ≥ limit <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "الـ 980 = 580 + 400 بتجمع الـ offset على الـ length بدل الـ base؛ الـ physical address هو base + offset = 1327 + 400 = 1727 <bdi dir=\"ltr\">(Topic 4)</bdi>."
    ],
    [
     "مع الـ compile-time binding بيتعمل absolute code، فالـ logical والـ physical addresses بيبقوا زي بعض <bdi dir=\"ltr\">(Topic 4, Address Binding)</bdi>.",
     "مع الـ load-time binding الـ relocatable code بيتثبت وقت الـ load، فالـ logical والـ physical برضه بيبقوا زي بعض؛ بيختلفوا بس في الـ execution-time binding <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "صح. الـ logical والـ physical addresses بيبقوا زي بعض في الـ compile-time والـ load-time binding، بس بيختلفوا في الـ execution-time binding، اللي فيه الـ MMU بيعمل الـ mapping وقت الـ run time <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "الـ link time مش واحدة من التلات مراحل binding في المحاضرة (الـ compile والـ load والـ execution)؛ الـ addresses بتختلف بس مع الـ execution-time binding <bdi dir=\"ltr\">(Topic 4)</bdi>."
    ],
    [
     "الـ DMA controller بينقل blocks من الـ I/O data على طول بين الـ device والـ memory <bdi dir=\"ltr\">(Topic 1, Topic 8)</bdi>؛ مبيترجمش addresses.",
     "صح. الـ Memory-Management Unit ده الـ hardware اللي بيعمل map للـ logical (virtual) addresses لـ physical وقت الـ run time، مثلًا بإنه يضيف الـ relocation register <bdi dir=\"ltr\">(Topic 4, MMU)</bdi>.",
     "الـ dispatcher ده الـ module اللي بيدي كنترول الـ CPU للـ process اللي اختارها الـ short-term scheduler <bdi dir=\"ltr\">(Topic 3)</bdi>؛ مبيعملش map للـ addresses.",
     "الـ interrupt vector ده جدول عناوين الـ interrupt service routines <bdi dir=\"ltr\">(Topic 1)</bdi>؛ مبيترجمش الـ virtual addresses لـ physical."
    ],
    [
     "ده بالمقلوب: الـ frames الثابتة الحجم معناها إن أي free frame بتنفع، فالـ paging بيتجنب الـ external fragmentation، بس آخر page ممكن تبقى فاضية جزئيًا (internal) <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "صح. الـ pages بتاعة الـ process ممكن تتحط في أي free frames، فالـ paging بيتجنب الـ external fragmentation، بس آخر frame نادرًا ما بيتملي، فلسه في internal fragmentation <bdi dir=\"ltr\">(Topic 4, Paging)</bdi>.",
     "الـ page faults تبع الـ demand paging <bdi dir=\"ltr\">(Topic 5)</bdi>، والـ paging مبيتجنبهاش؛ نقطة المحاضرة إنه بيتجنب الـ external، مش الـ internal fragmentation.",
     "الـ paging مبيتجنبش الـ swapping (الـ pages لسه ممكن تتعمل swap)؛ والـ compaction ده علاج الـ external fragmentation، اللي الـ paging بيلغي الحاجة ليه أصلًا <bdi dir=\"ltr\">(Topic 4)</bdi>."
    ],
    [
     "الـ 2 s دي الـ swap-out بس (100 MB ÷ 50 MB/s = 2000 ms)؛ السؤال بيحسب كمان الـ swap-in لـ process بنفس الحجم <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "صح. الـ swap out بياخد <bdi dir=\"ltr\">100 MB ÷ 50 MB/s = 2000 ms</bdi>، وزائد swap in بنفس الحجم بياخد 2000 ms، يبقى المجموع <bdi dir=\"ltr\">4000 ms = 4 s</bdi> <bdi dir=\"ltr\">(Topic 4, Context Switch Time including Swapping)</bdi>.",
     "الـ 0.5 s جاية من القسمة بالمقلوب (50 ÷ 100)؛ الوقت = size ÷ rate = 100 ÷ 50 = 2 s لكل اتجاه، يعني 4 s في المجموع <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "الـ 50 s مش طالعة من أي خطوة: كل transfer بياخد 100 MB ÷ 50 MB/s = 2 s، فالـ out + in = 4 s <bdi dir=\"ltr\">(Topic 4)</bdi>."
    ],
    [
     "الـ low n bits دول الـ page offset d، اللي بيحدد الـ byte جوه الـ page اللي حجمها 2<sup>n</sup> <bdi dir=\"ltr\">(Topic 4, Address Translation Scheme)</bdi>.",
     "صح. مع address space حجمه 2<sup>m</sup> وpages حجمها 2<sup>n</sup> byte، الـ low n bits هم الـ offset d والـ high m − n bits هم الـ page number p <bdi dir=\"ltr\">(Topic 4, Address Translation Scheme)</bdi>.",
     "الـ m bits كلهم دول الـ logical address كله؛ وبيتقسم لـ page number (الـ high m − n bits) وoffset (الـ low n bits) <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "الـ n − m بالسالب لأن الـ page أصغر من الـ address space <bdi dir=\"ltr\">(n &lt; m)</bdi>؛ الـ page number بياخد الـ high m − n bits <bdi dir=\"ltr\">(Topic 4)</bdi>."
    ],
    [
     "الـ first-fit بياخد أول hole يكفي أيًا كان حجمه، فاللي بيفضل منه مش الأكبر؛ الـ worst-fit هو اللي بيختار أكبر hole عن قصد <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "الـ best-fit بياخد أصغر hole يكفي، فبيطلّع أصغر leftover hole، عكس المطلوب <bdi dir=\"ltr\">(Topic 4)</bdi>.",
     "صح. الـ worst-fit بيحجز أكبر hole (بيدوّر في الليستة كلها)، وده بيطلّع أكبر leftover hole <bdi dir=\"ltr\">(Topic 4, Dynamic Storage-Allocation)</bdi>.",
     "الـ next-fit (first-fit بيبدأ من المكان اللي آخر search وقف عنده) مش في المحاضرة؛ ومن التلات strategies اللي اتشرحوا، الـ worst-fit هو اللي بيسيب أكبر hole <bdi dir=\"ltr\">(Topic 4)</bdi>."
    ]
   ],
   "extra": [
    [
     "ده legal: الشرط هو <bdi dir=\"ltr\">base ≤ address</bdi>، والـ 2000 هي الـ base نفسها.",
     "ده legal: <bdi dir=\"ltr\">2000 ≤ 2250 &lt; 2000 + 500 = 2500</bdi>، فبيعدّي من الـ check بتاع الـ base والـ limit الاتنين ومبيعملش trap <bdi dir=\"ltr\">(Topic 4, base and limit registers)</bdi>.",
     "Legal: ده آخر address قبل base + limit = 2500.",
     "صح. الـ addresses الـ legal بتحقق <bdi dir=\"ltr\">base ≤ address &lt; base + limit = 2500</bdi>، فـ 2500 برة الـ range وبيعمل trap."
    ],
    [
     "الـ logical address بتاع الـ user عمره ما بيتبعت للـ memory زي ما هو؛ قيمة الـ relocation بتتجمع عليه.",
     "صح، لأن <bdi dir=\"ltr\">250 &lt; 300</bdi> (الـ limit)، فالـ physical address هو <bdi dir=\"ltr\">250 + 5000 = 5250</bdi>.",
     "الـ limit بيتقارن بالـ logical address (250 &lt; 300)، مش بالـ physical address.",
     "ده بيجمع الـ limit، مش الـ offset؛ والصح <bdi dir=\"ltr\">physical = logical + relocation</bdi>."
    ],
    [
     "صح:<span class=\"ltr\">p = 1100 DIV 512 = 2, d = 1100 MOD 512 = 76</span><span class=\"ltr\">frame(2) = 7 → 7 × 512 + 76 = 3660</span>",
     "ده أول frame 7. لسه لازم تجمع الـ offset 76.",
     "ده بيستخدم frame 5 (الـ frame بتاع page 0). رقم الـ page هو 2، مش 0.",
     "مع الـ paging الـ logical address بيتترجم؛ بيساوي الـ physical address بس لو page 2 كانت في frame 2."
    ],
    [
     "بالعكس: الـ offset محتاج n = 9 bits عشان يوصل لـ 512 = 2⁹ bytes جوة الـ page.",
     "صح. لما <bdi dir=\"ltr\">m = 13, n = 9</bdi>، الـ page number هو الـ m − n = 4 bits العالية (16 page) والـ offset هو الـ 9 bits الواطية.",
     "الـ fields الاتنين مع بعض لازم يساووا الـ address اللي 13-bit، فالـ page number بس 13 − 9 bits.",
     "الـ offset بيغطي page واحدة بس (2⁹ bytes)، مش الـ address space كله."
    ],
    [
     "4 frames بيشيلوا 4,096 bytes بس؛ الـ 904 bytes الباقيين محتاجين frame خامس. وكمان 904 ده الجزء المستخدم من آخر page، مش الضايع.",
     "الـ 5 frames صح، بس 904 bytes ده المستخدم من آخر frame. الضايع هو 1,024 − 904.",
     "صح، لأن <bdi dir=\"ltr\">5,000 = 4 × 1,024 + 904</bdi>، فمحتاجين 5 frames؛ والـ internal fragmentation هي <bdi dir=\"ltr\">1,024 − 904 = 120 bytes</bdi>.",
     "الـ Paging مافيهوش external fragmentation، بس آخر page غالبًا فيها internal fragmentation."
    ],
    [
     "الـ First-fit بيحط 350 → 400، 200 → 250، 300 → 600: الكل اتحط.",
     "الـ Best-fit بيحط 350 → 400، 200 → 250، 300 → 600: الكل اتحط.",
     "الـ Worst-fit مش بيلاقي hole كبير كفاية للـ process اللي 300 KB.",
     "صح. الـ 350 بتروح للـ 600 (فاضل 250)، والـ 200 بتروح للـ 400 (فاضل 200)؛ فالـ holes بقت <bdi dir=\"ltr\">150, 200, 250, 250</bdi>، والـ 300 KB لازم تستنى."
    ],
    [
     "رقم الـ segment 4 مش legal: الـ s لازم يبقى <bdi dir=\"ltr\">&lt; STLR = 4</bdi>، فده بيعمل trap حتى لو الـ offset صغير.",
     "صح، لأن <bdi dir=\"ltr\">s = 3 &lt; 4</bdi> و<bdi dir=\"ltr\">d = 150 &lt; 200</bdi>، فالـ physical address هو <bdi dir=\"ltr\">900 + 150 = 1050</bdi>.",
     "الـ offset لازم يبقى أقل من الـ limit بالظبط؛ 200 مش &lt; 200، فبيعمل trap.",
     "250 ≥ الـ limit 200، فده addressing error."
    ],
    [
     "صح. لو مكان الـ memory معروف من الأول، الـ compiler بيطلّع absolute code؛ وتغيير مكان البداية معناه recompile.",
     "الـ Load-time binding بيطلّع relocatable code، لأن المكان مش معروف وقت الـ compile.",
     "الـ Execution-time binding بيأجل الـ binding لوقت التشغيل، فالـ process ممكن كمان تتنقل وهي شغالة.",
     "الـ Dynamic loading معناه تحميل الـ routine بس لما تتنادى؛ مش مرحلة binding بتطلّع absolute code."
    ],
    [
     "صح. الـ Compaction بيحرّك الـ processes في الـ memory، وده ممكن بس لما الـ addresses بتاعتها تتعمل bind وقت الـ execution.",
     "مع الـ compile-time أو الـ load-time binding الـ process ماينفعش تتحرك، فالـ compaction مش ممكن."
    ],
    [
     "المحاضرة بتقول إن الـ dynamic loading مش محتاج دعم خاص من الـ OS؛ الـ OS ممكن بس يساعد بإنه يوفر libraries.",
     "صح. بيتعمل من خلال تصميم البرنامج: الـ routine بتتحمّل بس لما تتنادى. والـ OS ممكن يساعد بإنه يوفر libraries."
    ]
   ]
  },
  "5": {
   "notes": [
    {
     "h": "خلفية: ليه الـ virtual memory",
     "pts": [
      "الكود لازم يبقى في الـ memory عشان يتنفذ، بس نادرًا ما البرنامج كله بيستخدم (زي كود الـ errors، والـ routines اللي مش بتتستخدم كتير، والـ data structures الكبيرة) ومش كله محتاجينه في نفس الوقت.",
      "تنفيذ برنامج متحمّل جزء منه بس معناه: البرنامج <b>مابقاش محدود بالـ physical memory</b>؛ كل برنامج بيستخدم memory أقل، فـ <b>برامج أكتر تشتغل في نفس الوقت</b> (↑ الـ CPU utilization والـ throughput من غير ما الـ response أو الـ turnaround time يزيدوا)؛ و<b>I/O أقل</b> للتحميل أو الـ swap، فكل برنامج بيشتغل أسرع.",
      "الـ <b>Virtual memory</b> = فصل الـ logical memory بتاعة الـ user عن الـ physical memory. جزء بس من البرنامج محتاج يبقى في الـ memory؛ الـ logical address space ممكن يبقى <b>أكبر بكتير من الـ physical address space</b>؛ الـ address spaces ممكن تتشارك بين كذا process؛ إنشاء الـ process بيبقى أكفأ؛ برامج أكتر تشتغل concurrently؛ وI/O أقل للتحميل أو الـ swap.",
      "الـ <b>Virtual address space</b>: النظرة المنطقية لإزاي الـ process متخزنة، غالبًا بتبدأ من 0 وcontiguous؛ والـ physical memory متنظمة في page frames والـ MMU بيعمل mapping من logical لـ physical.",
      "بيتعمل عن طريق <b>demand paging</b> أو <b>demand segmentation</b>."
     ],
     "figH": {
      "os-vm-space": "الـ virtual memory: الجزء المحتاجينه بس من البرنامج هو اللي في الـ memory"
     }
    },
    {
     "h": "الـ Demand paging والـ valid–invalid bit",
     "pts": [
      "هات الـ page للـ memory <b>بس لما تحتاجها</b>: I/O أقل (مفيش I/O ملوش لازمة)، memory أقل، response أسرع، users أكتر. شبه paging system مع swapping.",
      "لما الـ page تبقى مطلوبة بنعملها reference:<br>• لو <b>الـ reference مش valid</b> بنعمل abort.<br>• لو <b>الـ page مش في الـ memory</b> بنجيبها للـ memory.",
      "الـ <b>Lazy swapper</b>: عمره ما بيعمل swap لـ page للـ memory إلا لو هتتحتاج. والـ swapper اللي بيتعامل مع pages اسمه <b>pager</b>.",
      "لو الـ pages المطلوبة موجودة أصلًا في الـ memory، مفيش فرق عن الـ paging العادي؛ غير كده لازم الـ page تتكشف وتتحمّل من غير ما سلوك البرنامج يتغير أو نحتاج نغير الكود. وده محتاج وظايف جديدة في الـ MMU.",
      "الـ <b>Valid–invalid bit</b> لكل page-table entry:<br>• الـ <b>v</b> معناها إن الـ page في الـ memory (memory resident).<br>• الـ <b>i</b> معناها إنها مش في الـ memory.<br> في الأول كل الـ entries بتبقى <b>i</b>. لو الـ MMU لقى <b>i</b> وقت الترجمة، بيحصل <b>page fault</b>."
     ],
     "figH": {
      "os-demand-paging": "جرّب الـ demand paging: اعمل reference للـ pages وشوف الـ valid–invalid bits"
     }
    },
    {
     "h": "التعامل مع الـ Page fault",
     "pts": [
      "أول reference لـ page مش موجودة في الـ memory <b>بيعمل trap للـ OS، وده اسمه page fault</b>.",
      "1) الـ OS بيبص في table تانية عشان يقرر: لو الـ reference مش valid يعمل abort، ولو الـ page مجرد مش في الـ memory يكمّل.",
      "2) دوّر على <b>free frame</b>.",
      "3) اعمل swap للـ page جوة الـ frame عن طريق disk operation متعملها schedule.",
      "4) عدّل الـ tables عشان توضح إن الـ page بقت في الـ memory: <b>خلّي قيمة الـ validation bit هي v</b>.",
      "5) <b>اعمل restart للـ instruction</b> اللي عملت الـ page fault."
     ],
     "figH": {
      "os-page-fault": "التعامل مع الـ page fault خطوة بخطوة"
     }
    },
    {
     "h": "مراحل الـ demand paging (أسوأ حالة)",
     "pts": [
      "(1) اعمل trap للـ operating system.",
      "(2) احفظ الـ user registers والـ process state.",
      "(3) حدد إن الـ interrupt كان page fault.",
      "(4) اتأكد إن الـ page reference كان legal وحدد مكان الـ page على الـ disk.",
      "(5) اطلب read من الـ disk لـ free frame: استنى في الـ device queue لحد ما يتخدم؛ استنى الـ seek و/أو الـ latency time بتاع الجهاز؛ ابدأ نقل الـ page للـ free frame.",
      "(6) وإنت مستني، ادّي الـ CPU لـ user تاني.",
      "(7) استلم interrupt من الـ disk I/O subsystem (الـ I/O خلص).",
      "(8) احفظ الـ registers والـ process state بتوع الـ user التاني.",
      "(9) صحّح الـ page table (والـ tables التانية) عشان توضح إن الـ page بقت في الـ memory.",
      "(10) استنى لحد ما الـ CPU يتدّي للـ process دي تاني.",
      "(11) رجّع الـ user registers والـ process state والـ page table الجديدة، وبعدين كمّل الـ instruction اللي اتقاطعت."
     ],
     "figH": {
      "os-fault-stages": "الـ 11 مرحلة بتوع الـ page fault، ومين ماسك الـ CPU"
     }
    },
    {
     "h": "الـ Page replacement",
     "pts": [
      "<b>مفيش free frame؟</b> الـ Page replacement: دوّر على page في الـ memory مش مستخدمة فعلًا وطلّعها (page out). عايزين algorithm يدّي <b>أقل عدد page faults</b>. ونفس الـ page ممكن تدخل كذا مرة.",
      "الـ page replacement الأساسي: (1) لاقي مكان الـ page المطلوبة على الـ disk؛ (2) لاقي free frame: لو فيه واحد استخدمه، غير كده استخدم page-replacement algorithm يختار <b>victim frame</b> و<b>اكتبه على الـ disk لو dirty</b>؛ (3) هات الـ page المطلوبة في الـ frame اللي فضي وحدّث الـ page والـ frame tables؛ (4) اعمل restart للـ instruction اللي عملت الـ trap.",
      "لاحظ إن دلوقتي ممكن يبقى فيه <b>2 page transfers</b> لكل page fault (out + in).",
      "الـ <b>Frame-allocation</b> algorithm بيقرر كل process تاخد كام frame وأنهي frames تتبدل؛ والـ <b>page-replacement</b> algorithm عايز أقل page-fault rate في أول access وفي الـ re-access.",
      "بنقيّم بإننا نشغّل الـ algorithm على <b>reference string</b> (أرقام pages بس) ونعد الـ faults. <b>الـ access المتكرر لـ page موجودة أصلًا في الـ memory مش fault.</b> النتايج بتعتمد على عدد الـ frames. وكل مرة بنملا frame فاضي في الأول بتتحسب fault برضه."
     ],
     "figH": {
      "os-replace-basic": "الـ page replacement الأساسي: page transfer واحد أو اتنين لكل fault"
     }
    },
    {
     "h": "الـ FIFO والـ Optimal والـ LRU على string المحاضرة (3 frames)",
     "pts": [
      "الـ Reference string: <code>7,0,1,2,0,3,0,4,2,3,0,3,0,3,2,1,2,0,1,7,0,1</code>. الجدول بيوضح الـ <b>FIFO</b>؛ الـ bold معناه page لسه متحمّلة، وحرف F معناه fault.",
      "الـ <b>FIFO</b>: استبدل الـ page اللي قعدت في الـ memory <b>أطول وقت</b> (بتتابعها بـ FIFO queue)، والنتيجة <b>15 faults</b>.",
      "الـ <b>Optimal (OPT)</b>: استبدل الـ page اللي <b>مش هتتستخدم لأطول فترة جاية</b> → <b>9 faults</b> (أقل حاجة ممكنة). ماتقدرش تعرف المستقبل، فالـ OPT بيستخدم عشان <b>نقيس</b> الـ algorithms التانية كويسة قد إيه.",
      "الـ <b>LRU (Least Recently Used)</b>: استخدم الماضي: استبدل الـ page اللي <b>ماتستخدمتش من أطول وقت</b> → <b>12 faults</b>: أحسن من الـ FIFO، وأوحش من الـ OPT؛ algorithm كويس عمومًا وبيستخدم كتير.",
      "الـ <b>Belady's anomaly</b> (FIFO): مع <code>1,2,3,4,1,2,5,1,2,3,4,5</code>، 3 frames بيدّوا 9 faults بس 4 frames بيدّوا 10. <b>زيادة الـ frames ممكن تعمل page faults أكتر.</b> الـ LRU والـ OPT دول <b>stack algorithms</b> وعمرهم ما بيعانوا منها."
     ],
     "figH": {
      "os-replace-sim": "محاكي الـ page replacement: الـ FIFO والـ Optimal والـ LRU",
      "os-belady": "الـ Belady's anomaly: لما الـ frames تزيد الـ faults بتزيد (في الـ FIFO بس)"
     }
    },
    {
     "h": "جدول الـ Optimal (string المحاضرة، 3 frames)",
     "pts": [
      "الـ <b>Optimal</b>: 9 faults. عند ref 2 (الـ reference الرابع)، الـ page 7 عمرها ما هتتستخدم تاني، فاستبدل 7. عند ref 3، من بين 2، 0، 1 الـ page اللي هتتستخدم أبعد حاجة في المستقبل هي 1، فاستبدل 1. عند ref 4، من بين 2، 0، 3 الأبعد هي 0، فاستبدل 0."
     ],
     "figH": {
      "os-opt-why": "الـ Optimal بيختار كل victim ليه: إمتى كل page هتتستخدم تاني"
     }
    },
    {
     "h": "جدول الـ LRU (string المحاضرة، 3 frames)",
     "pts": [
      "الـ <b>LRU</b>: 12 faults. عند ref 4 (الـ reference التامن)، الـ pages اللي في الـ memory هي 2، 0، 3 وآخر استخدام ليهم: 2 في position 4، 0 في 7، 3 في 6، فاستبدل 2 (الـ least recently used)."
     ],
     "figH": {
      "os-lru-why": "الـ LRU بيختار كل victim ليه: آخر مرة كل page اتستخدمت"
     }
    },
    {
     "h": "تنفيذ الـ LRU والـ LRU approximations",
     "pts": [
      "الـ <b>Counter implementation</b>: كل page entry ليها counter؛ كل ما الـ page تتعملها reference، انسخ الـ clock في الـ counter. عشان تستبدل، دوّر على <b>أصغر قيمة counter</b> (محتاج search في الـ table).",
      "الـ <b>Stack implementation</b>: احتفظ بـ stack فيه أرقام الـ pages على شكل doubly-linked؛ لما page تتعملها reference، انقلها لفوق (محتاج تغيير 6 pointers). كل update أغلى، بس <b>مفيش search عشان الـ replacement</b> (الـ LRU page في الآخر تحت).",
      "الـ <b>Reference bit</b>: كل page ليها bit، في الأول 0، بيبقى 1 لما تتعملها reference؛ استبدل أي page الـ bit بتاعها 0 (لو موجودة)، بس مانعرفش الترتيب.",
      "الـ <b>Second-chance (clock) algorithm</b> هو FIFO مع الـ hardware reference bit. لو الـ page اللي هتتبدل الـ bit بتاعها 0، استبدلها؛ لو 1، خليه 0، سيب الـ page في الـ memory وشوف الـ page اللي بعدها بنفس القواعد.",
      "الـ <b>Counting algorithms</b> بتعد الـ references: الـ <b>LFU</b> (Least Frequently Used) بيستبدل الـ page اللي ليها <b>أصغر count</b>؛ الـ <b>MFU</b> (Most Frequently Used) بيستبدل الـ page اللي ليها أكبر count، على أساس إن الـ page اللي ليها أصغر count غالبًا لسه داخلة ولسه ماتستخدمتش."
     ],
     "figH": {
      "os-lru-impl": "الـ LRU بطريقتين: بالـ counters وبالـ stack",
      "os-second-chance": "الـ reference bit والـ second-chance (clock) algorithm",
      "os-lfu-mfu": "الـ counting algorithms: الـ LFU والـ MFU"
     }
    }
   ],
   "cards": [
    "فصل الـ logical memory بتاعة الـ user عن الـ physical memory؛ جزء بس من البرنامج محتاج يبقى في الـ memory.",
    "الـ Demand paging والـ demand segmentation.",
    "هات الـ page للـ memory بس لما تحتاجها.",
    "عمره ما بيعمل swap in لـ page إلا لو هتتحتاج؛ والـ swapper اللي بيتعامل مع pages اسمه pager.",
    "v = الـ page في الـ memory؛ i = مش في الـ memory (في الأول كله i)؛ i وقت الترجمة → page fault.",
    "Trap للـ OS لما page متعملها reference ماتبقاش في الـ memory.",
    "اتشيك على الـ reference (abort لو مش valid)، لاقي free frame، اقرا الـ page جوه، خلّي الـ bit بـ v، اعمل restart للـ instruction.",
    "الـ frame اللي الـ page replacement اختاره؛ بيتكتب على الـ disk الأول لو dirty.",
    "استبدل أقدم page في الـ memory.",
    "استبدل الـ page اللي مش هتتستخدم لأطول وقت في المستقبل؛ أقل faults؛ بيستخدم كـ benchmark.",
    "استبدل الـ page اللي ماتستخدمتش لأطول وقت في الماضي.",
    "مع الـ FIFO، زيادة الـ frames ممكن تعمل page faults أكتر. على الـ string:<span class=\"ltr\">1,2,3,4,1,2,5,1,2,3,4,5</span>بيطلع 9 faults بـ 3 frames، و10 بـ 4.",
    "الـ FIFO بيدي 15، والـ OPT بيدي 9، والـ LRU بيدي 12.",
    "FIFO + reference bit: الـ bit اللي بـ 1 بيتمسح وبنعدّي عليه؛ اللي بـ 0 بيتبدل.",
    "الـ LFU بيستبدل أصغر reference count؛ الـ MFU بيستبدل الأكبر.",
    "Stack doubly-linked؛ انقل الـ page اللي اتعملها reference لفوق (6 pointer changes)؛ مفيش search عن الـ victim."
   ],
   "qa": [
    "البرامج مابقتش محدودة بحجم الـ physical memory، لأن الـ logical address space ممكن يبقى أكبر بكتير. كل برنامج بيستخدم memory أقل، فبرامج أكتر بتشتغل concurrently، وده بيدّي CPU utilization وthroughput أعلى. محتاجين I/O أقل لتحميل أو swap البرامج، فبتشتغل أسرع. الـ address spaces ممكن تتشارك بين الـ processes، وإنشاء الـ process بيبقى أكفأ.",
    "(1) اعمل trap للـ OS.<br>(2) احفظ الـ user registers والـ process state.<br>(3) حدد إن الـ interrupt كان page fault.<br>(4) اتأكد إن الـ reference كان legal ولاقي الـ page على الـ disk.<br>(5) اطلب disk read لـ free frame: استنى في الـ queue، واستنى الـ seek والـ latency، وبعدين الـ transfer.<br>(6) وإنت مستني، ادّي الـ CPU لـ user تاني.<br>(7) استلم الـ interrupt بتاع إن الـ disk I/O خلص.<br>(8) احفظ الـ registers والـ state بتوع الـ user التاني.<br>(9) صحّح الـ page table عشان توضح إن الـ page في الـ memory.<br>(10) استنى لحد ما الـ CPU يتدّي للـ process دي تاني.<br>(11) رجّع الـ registers والـ state والـ page table الجديدة، وكمّل الـ instruction اللي اتقاطعت.",
    "الـ FIFO: 15 page faults. الـ Optimal: 9 page faults. الـ LRU: 12 page faults. الـ OPT هو أقل حاجة ممكنة؛ والـ LRU في النص بين الـ FIFO والـ OPT.",
    "الـ Page replacement: الـ OS بيلاقي الـ page المطلوبة على الـ disk، وبعدين بيستخدم replacement algorithm (زي الـ FIFO والـ OPT والـ LRU…) عشان يختار victim frame. لو الـ victim كان dirty بيتكتب على الـ disk، وبعدين الـ page الجديدة بتتقري جوة الـ frame، والـ page والـ frame tables بيتحدّثوا، والـ instruction اللي عملت الـ fault بتتعملها restart. ممكن يبقى فيه two page transfers لكل fault.",
    "مع الـ FIFO page replacement، زيادة عدد الـ frames ممكن تزوّد عدد الـ page faults. مع 1,2,3,4,1,2,5,1,2,3,4,5، الـ FIFO بيدّي 9 faults بـ 3 frames و10 بـ 4 frames. الـ stack algorithms زي الـ LRU والـ OPT مابيعانوش منها."
   ],
   "quiz": [
    [
     "صح. الـ FIFO دايمًا بيطرد الـ page اللي اتحملت الأول؛ ولو تتبعت الـ 22 reference على 3 frames هيطلعلك 15 fault، وده نفس نتيجة الـ FIFO في المحاضرة <bdi dir=\"ltr\">(Topic 5, FIFO Algorithm)</bdi>.",
     "الـ 12 fault دي نتيجة الـ LRU على الـ string ده (أحسن من الـ FIFO وأوحش من الـ OPT)؛ إنما الـ FIFO اللي بيطرد حسب وقت التحميل بيدي 15 <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "الـ 9 faults دي نتيجة الـ Optimal، وهي أقل حاجة ممكنة للـ string ده؛ الـ FIFO بيعمل أوحش لأنه مش بيبص على الاستخدام في المستقبل، فبيدي 15 <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "الـ 22 معناها إن كل reference عمل fault، بس الـ references اللي بتتكرر لـ pages موجودة أصلًا في frame بتبقى hits؛ الـ FIFO بيدي 15 <bdi dir=\"ltr\">(Topic 5)</bdi>."
    ],
    [
     "صح. الـ OPT بيستبدل الـ page اللي مش هتتستخدم لأطول وقت في المستقبل؛ وعلى الـ string ده بـ 3 frames بيدي 9 faults، واللي الـ slide بتسميه optimal <bdi dir=\"ltr\">(Topic 5, Optimal Algorithm)</bdi>.",
     "الـ 12 fault دي الـ LRU، اللي بيبص على الماضي مش المستقبل؛ إنما الـ OPT عشان عارف الـ references الجاية بيوصل لـ 9 <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "الـ 15 fault دي الـ FIFO، اللي بيطرد أقدم page اتحملت؛ الـ OPT بيجيب أقل رقم ممكن، 9 <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "الـ 8 أقل من الـ minimum الحقيقي: مفيش algorithm يقدر يغلب الـ OPT، والـ OPT هنا بيدي 9 (خلي بالك: الـ 8 دي نتيجة الـ OPT للـ exam string الأقصر اللي فيه 14 reference) <bdi dir=\"ltr\">(Topic 5)</bdi>."
    ],
    [
     "الـ 15 دي عدد الـ FIFO للـ string ده؛ الـ LRU بيحتفظ بالـ pages اللي اتستخدمت قريب فبيجيب 12 <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "صح. الـ LRU بيستبدل الـ page اللي ماتستخدمتش لأطول وقت في الماضي؛ وعلى الـ string ده بـ 3 frames بيدي 12 fault، يعني «أحسن من الـ FIFO بس أوحش من الـ OPT» <bdi dir=\"ltr\">(Topic 5, LRU)</bdi>.",
     "الـ 10 دي عدد الـ LRU للـ exam string الأقصر اللي فيه 14 reference، مش للـ string ده اللي فيه 22، واللي الـ LRU بيدي فيه 12 <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "الـ 9 دي الـ OPT، أقل رقم ممكن؛ الـ LRU مايقدرش يشوف المستقبل، فبيجيب 12 <bdi dir=\"ltr\">(Topic 5)</bdi>."
    ],
    [
     "صح. شوف حل امتحان 2026 للجدول كامل.",
     "ده الـ string الأطول بتاع المحاضرة اللي فيه 22 reference.",
     "الـ 8 دي عدد الـ Optimal للـ string ده اللي فيه 14 reference؛ الـ FIFO بيطرد حسب وقت التحميل فبيعمل 11 fault <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "الـ 10 دي عدد الـ LRU للـ string ده اللي فيه 14 reference؛ الـ FIFO بيعمل واحدة زيادة، يعني 11 <bdi dir=\"ltr\">(Topic 5)</bdi>."
    ],
    [
     "الـ FIFO بيستبدل أقدم page (اللي اتحملت الأول)، بغض النظر هتتستخدم في المستقبل ولا لأ <bdi dir=\"ltr\">(Topic 5, FIFO)</bdi>.",
     "الـ LRU بيستبدل الـ page اللي ماتستخدمتش لأطول وقت في الماضي؛ يعني بيستخدم معلومات الماضي عشان يقرّب من الـ OPT <bdi dir=\"ltr\">(Topic 5, LRU)</bdi>.",
     "صح. الـ Optimal (OPT) algorithm بيستبدل الـ page اللي مش هتتستخدم لأطول فترة؛ وعشان محتاج يعرف المستقبل، بيتستخدم كـ benchmark <bdi dir=\"ltr\">(Topic 5, Optimal Algorithm)</bdi>.",
     "الـ LFU بيستبدل الـ page اللي عندها أصغر reference count، يعني معتمد على الـ counts اللي فاتت، مش على الاستخدام في المستقبل <bdi dir=\"ltr\">(Topic 5, Counting Algorithms)</bdi>."
    ],
    [
     "الـ Belady's anomaly مش مقارنة بين algorithms؛ هي إن الـ FIFO بيجيب faults أكتر لما تديله frames أكتر. والـ LRU ده stack algorithm وعمره ما بيحصل فيه كده <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "صح. الـ Belady's anomaly معناها إن مع الـ FIFO، زيادة الـ frames ممكن تعمل page faults أكتر. والـ stack algorithms زي الـ LRU والـ OPT مابيحصلش فيها كده <bdi dir=\"ltr\">(Topic 5, FIFO)</bdi>.",
     "صحيح إن الـ OPT مايتنفذش (عشان محتاج يعرف المستقبل)، بس دي معلومة تانية خالص؛ الـ Belady's anomaly هي إن الـ FIFO بيعمل faults أكتر مع frames أكتر <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "الـ faults مش متوقع إنها تقل بشكل linear مع الـ frames، والـ anomaly أصلًا هي المفاجأة العكسية: مع الـ FIFO، زيادة الـ frames ممكن تعني faults أكتر <bdi dir=\"ltr\">(Topic 5)</bdi>."
    ],
    [
     "صح. وقت الـ translation في الـ MMU، لو الـ page-table entry الـ valid–invalid bit بتاعها = i، بيحصل page fault: يعني trap للـ OS، وهو بقى بيتشيك على الـ reference ويحمّل الـ page <bdi dir=\"ltr\">(Topic 5, Valid-Invalid Bit)</bdi>.",
     "الـ process مابتتقفلش على طول: الـ OS الأول بيبص في table تانية؛ لو الـ reference مش valid بس هو اللي بيعمل abort، أما لو الـ page مجرد مش موجودة في الـ memory فبيجيبها <bdi dir=\"ltr\">(Topic 5, Page Fault)</bdi>.",
     "الـ TLB hit معناها إن الـ translation اتلاقت في الـ TLB، ودي مش موضوع المحاضرة دي؛ الـ bit لما يبقى i معناه إن الـ page مش valid في الـ memory، فبيحصل page fault <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "لأ، فيه حاجة بتحصل فعلًا: الـ bit لما يبقى i معناه إن الـ page يا invalid يا مش في الـ memory، فالـ MMU بيعمل trap للـ OS بـ page fault <bdi dir=\"ltr\">(Topic 5)</bdi>."
    ],
    [
     "إنك تجيب الـ process كلها وقت الـ load ده عكس الـ lazy swapping بالظبط؛ الـ demand paging بيجيب الـ page بس لما تبقى مطلوبة <bdi dir=\"ltr\">(Topic 5, Demand Paging)</bdi>.",
     "صح. الـ swapper اللي بيتعامل مع pages اسمه pager.",
     "الـ pages الـ «dirty» (اللي اتعدلت) بتفرق وقت طرد الـ victim، لأنها لازم تتكتب تاني على الـ disk؛ إنما الـ lazy swapper فكرته إنه يحمّل الـ pages بس عند الطلب <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "الـ lazy swapper مش random: عمره ما بيدخّل page للـ memory إلا لو هتبقى مطلوبة <bdi dir=\"ltr\">(Topic 5, Demand Paging)</bdi>."
    ],
    [
     "الـ pages مابتتقريش مرتين عشان الأمان؛ الـ transfers الاتنين هما إنك تكتب الـ victim الـ dirty على الـ disk، وبعدين تقرا الـ page المطلوبة <bdi dir=\"ltr\">(Topic 5, Page Replacement)</bdi>.",
     "صح. لو مفيش frame فاضي بيتختار victim؛ ولو الـ victim ده dirty (اتعدل) لازم يتكتب على الـ disk الأول، وبعدين الـ page المطلوبة تتقري: يعني ممكن 2 page transfers <bdi dir=\"ltr\">(Topic 5, Page Replacement)</bdi>.",
     "الـ page table بيتعملها update في الـ memory بس، مش بتتنسخ على الـ disk؛ الـ transfers الاتنين هما الـ victim الـ dirty طالع والـ page الجديدة داخلة <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "الـ process والـ OS مش كل واحد بياخد نسخة؛ الـ transfers الاتنين هما كتابة الـ victim الـ dirty برا وقراية الـ page الجديدة جوا <bdi dir=\"ltr\">(Topic 5)</bdi>."
    ],
    [
     "بس الـ page اللي الـ reference bit بتاعها = 0 هي اللي بتتبدل؛ أما الـ page اللي الـ bit بتاعها = 1 فالـ bit بيتصفّر وهي بتفضل في الـ memory <bdi dir=\"ltr\">(Topic 5, Second-chance algorithm)</bdi>.",
     "صح. الـ Second-chance هو <bdi dir=\"ltr\">FIFO + reference bit</bdi>: لو الـ bit بـ 1، بيتخلي 0 والـ page بتفضل في الـ memory، والـ search بيكمّل على الـ page اللي بعدها <bdi dir=\"ltr\">(Topic 5, Second-chance)</bdi>.",
     "الكتابة على الـ disk بتحصل بس للـ victim الـ dirty اللي بيتبدل؛ إنما الـ page اللي الـ bit بتاعها = 1 مابتتبدلش، بس الـ bit بتاعها بيتصفّر <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "مفيش حاجة اسمها MFU list في الـ second-chance؛ الـ MFU ده counting algorithm تاني خالص. الـ page اللي الـ bit بتاعها 1 بيتعمله 0 وبتفضل <bdi dir=\"ltr\">(Topic 5)</bdi>."
    ],
    [
     "صح. الـ virtual memory بتفصل الـ logical memory عن الـ physical، فمحتاج جزء بس من البرنامج يبقى في الـ memory، والـ logical address space ممكن يبقى أكبر من الـ physical memory <bdi dir=\"ltr\">(Topic 5, Background)</bdi>.",
     "الـ virtual memory معناها I/O أقل (بيتحمّل بس الـ pages المطلوبة)، بس الـ pages لسه بتيجي من الـ disk عند الـ page faults، فالـ I/O مابيتلغيش <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "الـ MMU لازم عشان الـ mapping من logical لـ physical.",
     "الـ demand paging أصلًا معتمد على الـ page faults: أول reference لـ page مش في الـ memory بيعمل trap للـ OS. فالـ virtual memory ماتقدرش تضمن إن مفيش faults <bdi dir=\"ltr\">(Topic 5)</bdi>."
    ],
    [
     "صح. في الـ counter implementation، كل reference بينسخ الـ clock في الـ counter بتاع الـ entry؛ ووقت الـ replacement الـ OS لازم يدوّر في الـ table على أصغر counter (الأقدم) <bdi dir=\"ltr\">(Topic 5, LRU)</bdi>.",
     "نقل الـ page اللي اتعملها reference لفوق الـ stack (doubly-linked) ده الـ stack implementation، واللي بيوفّر الـ search وقت الـ replacement <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "إنك محتاج تعرف الـ references الجاية ده شرط الـ OPT؛ الـ LRU بيستخدم معلومات الماضي بس، واللي متسجلة في الـ counters <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "طريقة الـ counter محتاجة hardware support، يعني clock بيتنسخ في counter جوه كل page-table entry مع كل reference <bdi dir=\"ltr\">(Topic 5, LRU)</bdi>."
    ]
   ],
   "extra": [
    [
     "الـ 7 دي عدد الـ Optimal للـ string ده، اللي بيطرد الـ page اللي هتتستخدم في أبعد وقت في المستقبل؛ الـ FIFO بيطرد حسب وقت التحميل فبيعمل 9 faults <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "ده عدد الـ LRU. الـ FIFO بيطرد حسب وقت التحميل وبيرمي الـ page 3 قبل ما تتحتاج تاني على طول.",
     "ده بيعد كل reference. تاني reference لـ 3 (position 4) ده hit.",
     "صح. الـ faults بتحصل كده:<span class=\"ltr\">1, 3, 0, (3 hit), 5 (out 1), 6 (out 3), 3 (out 0), 1 (out 5), 0 (out 6), 2 (out 3) = 9</span>والـ out معناها الـ page اللي اتطردت."
    ],
    [
     "صح. الـ 1 و3 و0 بيعملوا faults، والـ 3 hit، والـ 5 بيطرد 1، والـ 6 بيطرد 0، والـ 3 hit، والـ 1 بيطرد 5، والـ 0 بيطرد 6، والـ 2 بيطرد 3، يعني <b>8 faults</b>.",
     "ده الـ FIFO. الـ LRU بيحتفظ بـ page 3 لأنها اتستخدمت قريب، فالـ reference السابع hit.",
     "ده الـ Optimal، اللي بيبص على المستقبل؛ الـ LRU بيستخدم الماضي بس.",
     "ده ساب الـ 3 faults بتوع ملو الـ frames الفاضية في الأول. دول بيتحسبوا faults."
    ],
    [
     "ده الـ LRU. لما 5 توصل، الـ Optimal بيطرد 0 (اللي هتتستخدم أبعد حاجة في المستقبل)، مش 1.",
     "الـ 9 دي عدد الـ FIFO للـ string ده: بيطرد حسب وقت التحميل (مثلًا بيرمي الـ 3 قبل ما تتطلب على طول)؛ الـ Optimal بيدي 7 <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "صح. الـ 1 و3 و0 بيعملوا faults، والـ 3 hit، والـ 5 بيطرد 0 (هتتستخدم في الآخر)، والـ 6 بيطرد 5 (مش هتتستخدم تاني)، والـ 3 و1 hit، والـ 0 و2 faults، يعني <b>7</b>.",
     "ده ناسي الملو الأولاني: أول 3 references على frames فاضية faults برضه."
    ],
    [
     "الـ bit بتاع A بـ 1، فبتاخد second chance: الـ bit بتاعها بيتمسح وبتفضل.",
     "الـ algorithm بيبدأ من أقدم page، وكمان الـ bit بتاع D بـ 1.",
     "صح. الـ page A والـ page B الـ bit بتاعهم 1، فكل واحد بيتحط 0 ونعدّي عليه؛ أما الـ page C فالـ bit بتاعها 0، فبتتبدل.",
     "الـ bit بتاع B كمان 1، فهي كمان بتاخد second chance."
    ],
    [
     "بالعكس: الـ LFU بيشيل أصغر count والـ MFU الأكبر.",
     "صح. الـ MFU بيشيل أكبر count (R = 9)؛ الـ LFU بيشيل أصغر count (Q = 2).",
     "الـ LFU بس هو اللي بيختار أصغر count. الـ MFU بيقول إن الـ page اللي ليها أصغر count غالبًا لسه داخلة.",
     "الـ MFU بس هو اللي بيختار أكبر count (R = 9)؛ الـ LFU بيستبدل الـ page اللي عندها أصغر count، يعني Q = 2 <bdi dir=\"ltr\">(Topic 5, Counting Algorithms)</bdi>."
    ],
    [
     "الترتيب غلط: الـ tables لازم توضح إن الـ page في الـ memory قبل ما الـ instruction تتعملها restart، وإلا هتعمل fault تاني.",
     "الـ Abort بيحصل بس لو الـ reference مش valid، وده بيتعرف في step 1.",
     "الـ i معناها \"مش في الـ memory\". بعد التحميل، الـ bit لازم يبقى v.",
     "صح. دول steps 4 و5 من التعامل مع الـ page fault في المحاضرة."
    ],
    [
     "المحاضرة بتقول إن الـ LRU والـ OPT دول stack algorithms وعمرهم ما بيعانوا من الـ Belady's anomaly.",
     "صح. الـ Belady's anomaly (frames أكتر → faults أكتر) بتأثر على الـ FIFO. الـ LRU والـ OPT stack algorithms ومحصّنين منها."
    ],
    [
     "كل ملو لـ frame فاضي في الأول بيبقى page fault برضه، لأن الـ page ماكانتش في الـ memory.",
     "صح. المحاضرة بتعد كل ملو أولاني كـ fault؛ بس الـ access المتكرر لـ page موجودة أصلًا في الـ memory هو اللي مش fault."
    ],
    [
     "صح. الـ page اللي اتعملها reference بتتنقل لفوق الـ doubly-linked stack، والـ LRU page دايمًا تحت.",
     "نسخ الـ clock مع كل reference والـ search على أصغر counter وقت الـ replacement ده الـ counter implementation، واللي الـ trade-off بتاعه عكس الـ stack بالظبط <bdi dir=\"ltr\">(Topic 5)</bdi>.",
     "stack مترتب حسب الاستخدام الأخير ده LRU، مش FIFO؛ الـ FIFO بيرتب حسب وقت التحميل.",
     "ده عيب الـ reference bit الواحد."
    ],
    [
     "تضييع: stage 6 في المحاضرة بيدّي الـ CPU لـ user تاني وقت الانتظار.",
     "صح. في الـ stage رقم 6، وإنت مستني، ادّي الـ CPU لـ user تاني؛ والـ disk interrupt (stage 7) بيقول إنه خلص بعدين.",
     "الـ instruction ماينفعش تتعملها restart غير بعد ما الـ page تبقى في الـ memory والـ tables تتصحح.",
     "الـ page fault الـ legal حدث عادي؛ الـ process بتكمّل، مش بتتقفل."
    ]
   ]
  },
  "6": {
   "notes": [
    {
     "h": "الـ System model والـ 4 necessary conditions",
     "pts": [
      "السيستم بيتكون من resource types هي R1 و R2 لحد Rm (زي الـ CPU cycles والـ memory space والـ I/O devices)؛ وكل نوع Ri ليه <b>Wi instances</b>. وكل process بتستخدم الـ resource بالترتيب ده:<span class=\"ltr\"><b>request → use → release</b></span>",
      "الـ Deadlock ممكن يحصل لو <b>الـ 4 شروط اتحققوا مع بعض في نفس الوقت</b>:",
      "<b>(1) Mutual exclusion</b>: يعني process واحدة بس في المرة تقدر تستخدم الـ resource.",
      "<b>(2) Hold and wait</b>: يعني process ماسكة resource واحد على الأقل ومستنية تاخد resources زيادة ماسكاها processes تانية.",
      "<b>(3) No preemption</b>: الـ resource مايتسابش غير بمزاج الـ process اللي ماسكاه، بعد ما تخلّص الـ task بتاعتها.",
      "<b>(4) Circular wait</b>: فيه مجموعة من الـ processes المستنية <bdi>{P0, P1, …, Pn}</bdi> بحيث P0 مستنية resource ماسكاه P1، وP1 مستنية P2، وهكذا لحد Pn−1 اللي مستنية Pn، وPn مستنية P0."
     ],
     "figH": {
      "os-dl-conditions": "الـ 4 necessary conditions واحدة واحدة، على 3 processes"
     }
    },
    {
     "h": "الـ Resource-allocation graph (RAG)",
     "pts": [
      "الـ Vertices V متقسمة لـ <b>P</b> = {P1…Pn} (processes، بتترسم دواير) و<b>R</b> = {R1…Rm} (resource types، بتترسم مربعات فيها نقطة لكل instance).",
      "الـ <b>Request edge</b> بيروح من الـ process للـ resource:<span class=\"ltr\">Pi → Rj</span>والـ <b>Assignment edge</b> بيروح من الـ resource للـ process (من نقطة الـ instance للـ process):<span class=\"ltr\">Rj → Pi</span>",
      "مثال الـ slide (مفيش deadlock):<br>• الـ assignments:<span class=\"ltr\">R1 → P2, R2 → P1, R2 → P2, R3 → P3</span>• الـ requests:<span class=\"ltr\">P1 → R1, P2 → R3</span>يعني P3 تقدر تخلص، وبعدين P2، وبعدين P1.",
      "الـ graph اللي فيه deadlock: نفس اللي فات، وزيادة عليه<span class=\"ltr\">P3 → R2</span>وكده فيه two cycles:<span class=\"ltr\">P1 → R1 → P2 → R3 → P3 → R2 → P1</span><span class=\"ltr\">P2 → R3 → P3 → R2 → P2</span>والـ P1 وP2 وP3 كلهم في deadlock.",
      "الـ graph اللي فيه cycle بس <b>مفيش deadlock</b>:<span class=\"ltr\">P1 → R1 → P3 → R2 → P1</span>بس الـ instance التاني من R1 ماسكاه P2، والتاني من R2 ماسكاه P4. والـ P2 والـ P4 يقدروا يسيبوا، فالـ cycle بتتكسر.",
      "<b>حقائق أساسية</b>:<br>• لو مفيش cycle يبقى <b>مفيش deadlock</b>.<br>• لو فيه cycle و<b>instance واحد بس لكل resource type</b> يبقى <b>فيه deadlock</b>.<br>• لو فيه cycle وكذا instance لكل نوع يبقى فيه <b>احتمال</b> deadlock."
     ],
     "figH": {
      "os-dl-rag": "الـ 3 resource-allocation graphs اللي في الـ notes: من غير deadlock، وفيه deadlock، وفيه cycle من غير deadlock"
     }
    },
    {
     "h": "طرق التعامل مع الـ deadlocks والـ deadlock prevention",
     "pts": [
      "نضمن إن السيستم <b>عمره ما</b> يدخل deadlock state، وده بالـ <b>deadlock prevention</b> أو بالـ <b>deadlock avoidance</b>.",
      "نسيب السيستم يدخل deadlock state وبعدين <b>نعمل recover</b> (detection + recovery).",
      "<b>نتجاهل المشكلة</b> ونعمل نفسنا إن الـ deadlocks عمرها ما بتحصل: ده اللي أغلب الـ operating systems بتعمله، ومنهم UNIX.",
      "الـ <b>Prevention</b> بيقيّد طرق عمل الـ requests، عشان شرط واحد على الأقل من الأربعة مايتحققش."
     ],
     "figH": {
      "os-dl-ordering": "منع الـ circular wait: اطلب الـ resources بترتيب تصاعدي"
     }
    },
    {
     "h": "الـ Deadlock avoidance والـ safe state",
     "pts": [
      "الـ Avoidance محتاج <b>معلومات مسبقة (a priori)</b>: أبسط موديل، كل process بتعلن <b>أقصى عدد</b> resources من كل نوع ممكن تحتاجه. الـ algorithm بيفحص الـ resource-allocation state ديناميك (الـ available والـ allocated والـ maximum demands) عشان عمره ما يبقى فيه circular wait.",
      "مع كل request، السيستم بيقرر هل الـ allocation الفوري هيسيب السيستم في <b>safe state</b>.",
      "الـ <b>Safe state</b> يعني فيه sequence فيها <b>كل</b> الـ processes:<span class=\"ltr\">&lt;P1, P2, …, Pn&gt;</span>بحيث الطلبات الباقية لكل Pi ممكن تتلبى من الـ resources المتاحة دلوقتي، زائد الـ resources اللي ماسكاها كل Pj اللي قبلها (يعني <bdi>j &lt; i</bdi>). ولو احتياجات Pi مش متاحة دلوقتي، بتستنى لحد ما كل الـ Pj يخلصوا، وبعدين تاخد الـ resources بتاعتها، تتنفذ، ترجّعها وتخلص، وبعدين Pi+1 تقدر تكمّل.",
      "<b>Safe → مفيش deadlocks. Unsafe → احتمال deadlock.</b> الـ Avoidance = نضمن إن السيستم عمره ما يدخل unsafe state. (الـ deadlock states جزء من الـ unsafe states.)",
      "instance واحد لكل resource type → استخدم <b>resource-allocation graph</b> (بـ claim edges). كذا instance → استخدم الـ <b>banker's algorithm</b>.",
      "الـ <b>Banker's algorithm</b>: كذا instance؛ كل process لازم تعلن من الأول أقصى استخدام ليها؛ الـ process اللي بتطلب ممكن تضطر تستنى؛ والـ process اللي بتاخد كل الـ resources بتاعتها لازم ترجّعها في وقت محدود."
     ],
     "figH": {
      "os-dl-safe": "الـ safe والـ unsafe والـ deadlock states"
     }
    },
    {
     "h": "الـ data structures والـ algorithms بتوع الـ Banker's",
     "pts": [
      "الـ n هو عدد الـ processes، والـ m هو عدد الـ resource types.",
      "• الـ <b>Available</b> [m]: لو <bdi>available[j] = k</bdi> يبقى فيه k instances من Rj متاحين.<br>• الـ <b>Max</b> [n×m]: الـ Pi ممكن تطلب بالكتير k من Rj.<br>• الـ <b>Allocation</b> [n×m]: الـ Pi ماسكة دلوقتي k من Rj.<br>• الـ <b>Need</b> [n×m]: الـ Pi ممكن تحتاج k زيادة من Rj.<span class=\"ltr\"><b>Need = Max − Allocation</b></span>",
      "تشيك: Available = إجمالي الـ instances − مجموع كل column في الـ Allocation. استخدمه عشان تتأكد من أي snapshot."
     ]
    },
    {
     "h": "مثال Banker's محلول (المحاضرة، وكمان review Q3)",
     "pts": [
      "فيه 5 processes من P0 لـ P4، والـ instances هي <bdi>A = 10, B = 5, C = 7</bdi>. والـ Available بيساوي (3, 3, 2).",
      "لف على P0…P4 أكتر من مرة، واختار أول process الـ Need بتاعها ≤ Work:",
      "الـ Work بيبدأ (3,3,2): الـ P0 محتاجة (7,4,3)؟ لأ. والـ <b>P1</b> محتاجة (1,2,2)، وده ≤ (3,3,2) ✓، فـ:<span class=\"ltr\">Work = (3,3,2) + (2,0,0) = (5,3,2)</span>",
      "P2 (6,0,0)؟ لأ (6 &gt; 5). <b>P3</b> (0,1,1) ✓ → (5,3,2) + (2,1,1) = (7,4,3).",
      "<b>P4</b> (4,3,1) ✓ → (7,4,3) + (0,0,2) = (7,4,5).",
      "اللفة التانية:<span class=\"ltr\"><b>P0</b> (7,4,3) ✓ → (7,4,5) + (0,1,0) = (7,5,5)</span><span class=\"ltr\"><b>P2</b> (6,0,0) ✓ → (7,5,5) + (3,0,2) = (10,5,7)</span>والـ (10,5,7) هي الإجماليات ✓.",
      "كل الـ Finish بقت true، يبقى السيستم <b>SAFE</b>، والـ sequence هي:<span class=\"ltr\"><b>&lt;P1, P3, P4, P0, P2&gt;</b></span>وفيه ترتيبات safe تانية، زي:<span class=\"ltr\">&lt;P1, P3, P0, P2, P4&gt;</span>",
      "تمرين زيادة (الكتاب): لو P1 طلبت دلوقتي (1,0,2):<br>• الـ Request ≤ Need (1,2,2) ✓ و≤ Available (3,3,2) ✓.<br>• نفترض إننا اديناها، فيبقى:<span class=\"ltr\">Available = (2,3,0), Alloc P1 = (3,0,2), Need P1 = (0,2,0)</span>والـ Safety لسه بتلاقي:<span class=\"ltr\">&lt;P1, P3, P4, P0, P2&gt;</span>فالـ request <b>بيتقبل (granted)</b>."
     ],
     "figH": {
      "os-dl-bankers": "الـ safety algorithm بتاع الـ Banker's على الـ snapshot بتاع المحاضرة، خطوة خطوة",
      "os-dl-request": "جرّب الـ resource-request algorithm: اختار process و request"
     }
    },
    {
     "h": "الـ Deadlock detection",
     "pts": [
      "نسيب السيستم يدخل deadlock state، وبعدين نشغّل <b>detection algorithm</b> و<b>recovery scheme</b>.",
      "لو فيه <b>instance واحد لكل resource type</b>: احتفظ بـ <b>wait-for graph</b>، والـ nodes فيه هي الـ processes، وفيه سهم<span class=\"ltr\">Pi → Pj</span>لو Pi مستنية Pj، وبنجيبه من الـ RAG بإننا نشيل الـ resource nodes. دوّر على cycle كل فترة: <b>وجود cycle معناه إن فيه deadlock</b>. واكتشاف الـ cycle بياخد <b>O(n²)</b> operations لـ n vertices.",
      "<b>كذا instance</b>: استخدم Available [m]، Allocation [n×m] و<b>Request</b> [n×m] (الطلبات الحالية). زي الـ safety algorithm بالظبط بفرقين: Finish[i] بتبدأ true لو Allocation_i = 0، وبيستخدم <b>Request_i ≤ Work</b> بدل الـ Need.",
      "في الآخر، لو Finish[i] == false لأي i، السيستم في <b>deadlock</b>، وكل Pi الـ Finish[i] بتاعها == false في deadlock.",
      "مثال:<span class=\"ltr\">A = 7, B = 2, C = 6; Available (0,0,0)</span>• الـ Allocation:<span class=\"ltr\">P0 010, P1 200, P2 303, P3 211, P4 002</span>• الـ Request:<span class=\"ltr\">P0 000, P1 202, P2 000, P3 100, P4 002</span>• الـ Work:<span class=\"ltr\">P0 → (0,1,0), P2 → (3,1,3), P3 → (5,2,4), P1 → (7,2,4), P4 → (7,2,6)</span>يعني الـ sequence هي:<span class=\"ltr\"><b>&lt;P0, P2, P3, P1, P4&gt;</b></span>ومفيش deadlock.",
      "لو P2 طلبت دلوقتي C كمان واحد (Request P2 = 001): P0 تقدر تخلص (Work = 0,1,0)، بس مفيش أي request تاني ينفع يتلبى. <b>فيه deadlock، فيه P1 وP2 وP3 وP4.</b>",
      "إمتى ونشغّل الـ detection كل قد إيه بيعتمد على الـ deadlock بيحصل قد إيه، وكام process لازم تتعملها roll back (واحدة لكل disjoint cycle). لو شغّلناه بشكل عشوائي ممكن يلاقي cycles كتير ومايقولش أنهي process هي اللي \"سببت\" الـ deadlock."
     ],
     "figH": {
      "os-dl-detect": "الـ detection algorithm على مثال الـ notes، قبل وبعد ما الـ P2 تطلب C زيادة"
     }
    },
    {
     "h": "الـ Recovery من الـ deadlock",
     "pts": [
      "الـ <b>Process termination</b>: اعمل abort لـ <b>كل</b> الـ processes اللي في deadlock، أو abort لـ <b>process واحدة في المرة</b> لحد ما الـ cycle تتشال.",
      "ترتيب الـ abort بيراعي: (1) الـ priority بتاع الـ process؛ (2) حسبت قد إيه وفاضلها قد إيه عشان تخلص؛ (3) الـ resources اللي استخدمتها؛ (4) الـ resources اللي محتاجاها عشان تخلص؛ (5) كام process هنحتاج نقفلها؛ (6) هل هي interactive ولا batch.",
      "الـ <b>Resource preemption</b>: <b>اختيار الـ victim</b> (أقل تكلفة)؛ الـ <b>rollback</b> (نرجع لـ safe state ونعيد تشغيل الـ process من هناك)؛ الـ <b>starvation</b> (نفس الـ process ممكن تتختار victim على طول، فنحط عدد الـ rollbacks في الـ cost factor)."
     ]
    }
   ],
   "cards": [
    "الـ mutual exclusion والـ hold and wait والـ no preemption والـ circular wait (كلهم مع بعض في نفس الوقت).",
    "الـ request، وبعدين الـ use، وبعدين الـ release.",
    "Request: Pi → Rj. Assignment: Rj → Pi.",
    "مفيش deadlock.",
    "Deadlock.",
    "احتمال deadlock.",
    "Prevent/avoid؛ detect and recover؛ ignore (أغلب الـ OSs ومنهم UNIX).",
    "ترتيب كامل (total ordering) للـ resource types؛ والطلب يبقى بترتيب تصاعدي.",
    "Resource utilization واطي؛ والـ starvation ممكنة.",
    "فيه sequence لكل الـ processes كل واحدة فيها احتياجاتها ممكن تتلبى من الـ available + الـ resources اللي سابتها اللي قبلها.",
    "Safe → مفيش deadlock. Unsafe → احتمال deadlock.",
    "Need = Max − Allocation.",
    "الـ Avoidance مع كذا instance لكل resource type.",
    "الـ nodes هي الـ processes، وفيه سهم<span class=\"ltr\">Pi → Pj</span>لو Pi مستنية Pj؛ ووجود cycle معناه deadlock (في حالة الـ single instances).",
    "بيستخدم الـ Request بدل الـ Need؛ وFinish[i] بتبدأ true لو Allocation_i = 0.",
    "اختيار الـ victim، الـ rollback، الـ starvation.",
    "&lt;P1, P3, P4, P0, P2&gt;."
   ],
   "qa": [
    "• الـ <b>Mutual exclusion</b>: يعني process واحدة بس في المرة تقدر تستخدم الـ resource.<br>• الـ <b>Hold and wait</b>: يعني process ماسكة resource واحد على الأقل ومستنية أكتر ماسكاها processes تانية.<br>• الـ <b>No preemption</b>: الـ resources مابتتسابش غير بمزاج الـ process بعد ما الـ task تخلص.<br>• الـ <b>Circular wait</b>: مجموعة <bdi>{P0…Pn}</bdi> كل واحدة مستنية resource ماسكاه اللي بعدها، وPn مستنية P0.<br>والأربعة لازم يتحققوا مع بعض في نفس الوقت.",
    "نضمن إن شرط من الأربعة عمره ما يتحقق:<br>• الـ Mutual exclusion: استخدم resources ينفع تتشارك على قد ما تقدر (read-only files)، مع إنه لازم يتحقق للـ resources اللي ماينفعش تتشارك.<br>• الـ Hold and wait: اطلب كل الـ resources قبل ما تبدأ، أو اطلب بس وإنت مش ماسك حاجة (utilization واطي، starvation).<br>• الـ No preemption: الـ process اللي مش قادرة تاخد resource جديد بتسيب كل الـ resources اللي ماسكاها.<br>• الـ Circular wait: اعمل ترتيب كامل للـ resource types واطلب بترتيب تصاعدي، زي:<span class=\"ltr\">tape = 1, disk = 5, printer = 12</span>",
    "الـ Need بيساوي Max − Allocation:<span class=\"ltr\">P0 7 4 3, P1 1 2 2, P2 6 0 0, P3 0 1 1, P4 4 3 1</span>والـ Work بيمشي كده:<span class=\"ltr\">332 → P1 (532) → P3 (743) → P4 (745) → P0 (755) → P2 (10 5 7)</span>الكل خلص، فالسيستم safe والـ sequence هي:<span class=\"ltr\">&lt;P1, P3, P4, P0, P2&gt;</span>",
    "الـ Prevention بيقيّد طريقة عمل الـ requests عشان شرط من الأربعة عمره ما يتحقق؛ وهو static وممكن يضيّع resources. الـ Avoidance بيستخدم الـ maximum claims اللي متعلنة من الأول وبيوافق على الـ request بس لو الـ state اللي هتنتج safe (banker's algorithm أو RAG بـ claim edges). الـ Detection بيسيب الـ deadlocks تحصل، ويشغّل wait-for graph أو detection algorithm كل فترة، وبعدين يعمل recover بالـ termination أو الـ resource preemption.",
    "الـ Process termination: اعمل abort لكل الـ processes اللي في deadlock، أو واحدة واحدة لحد ما الـ cycle تتكسر، وبنختار حسب الـ priority، الوقت اللي حسبته والباقي، الـ resources المستخدمة والمطلوبة، عدد الـ processes، وinteractive ولا batch. الـ Resource preemption: اختار victim بأقل تكلفة، اعمله roll back لـ safe state وشغّله من الأول، وامنع الـ starvation بإنك تحسب الـ rollbacks في الـ cost."
   ],
   "quiz": [
    [
     "الـ Mutual exclusion واحد من الـ 4 شروط: process واحدة بس في المرة اللي تقدر تستخدم الـ resource <bdi>(Topic 6, Deadlock Characterization)</bdi>.",
     "الـ Hold and wait واحد من الـ 4 شروط: process ماسكة resource واحد على الأقل وبتستنى resources ماسكاها processes تانية <bdi>(Topic 6)</bdi>.",
     "الاختيار الصح. الشرط هو NO preemption.",
     "الـ Circular wait واحد من الـ 4 شروط: P0 مستنية P1، وP1 مستنية P2، …، وPn مستنية P0 <bdi>(Topic 6)</bdi>."
    ],
    [
     "لأ، لو فيه cycle وكل resource type ليه instance واحد بس، يبقى كل process في الـ cycle مستنية resource ماسكاه اللي بعدها، فيبقى فيه deadlock <bdi>(Topic 6, Basic Facts)</bdi>.",
     "صح. قاعدة المحاضرة: لو الـ graph فيه cycle وفيه instance واحد بس لكل resource type، يبقى فيه deadlock <bdi>(Topic 6, Resource-Allocation Graph)</bdi>.",
     "«مجرد احتمال» دي بتنطبق لما الـ resource types يبقى ليها كذا instance؛ إنما مع instance واحد لكل type، الـ cycle معناه deadlock أكيد <bdi>(Topic 6)</bdi>.",
     "الـ safe state بتضمن إن مفيش deadlock، بس الـ cycle مع resources ليها instance واحد ده deadlock حقيقي فعلًا <bdi>(Topic 6)</bdi>."
    ],
    [
     "إنك تجمع الـ Allocation على الـ Max ده بيعدّ زيادة؛ الـ Need هو اللي الـ process لسه ممكن تطلبه، فالـ Allocation بيتطرح، يعني <bdi>Need = Max − Allocation</bdi> <bdi>(Topic 6, Banker's Algorithm)</bdi>.",
     "صح. الـ <bdi>Need[i,j]</bdi> هو عدد الـ instances الزيادة من Rj اللي الـ process Pi ممكن تطلبها: أقصى طلب ليها ناقص اللي ماسكاه فعلًا، يعني <bdi>Max[i,j]</bdi> − <bdi>Allocation[i,j]</bdi> <bdi>(Topic 6, Banker's Algorithm)</bdi>.",
     "الـ Available ده الـ pool الفاضي بتاع السيستم كله؛ بيتقارن بالـ Need، مش بيتستخدم في تعريفه، والقاعدة هي <bdi>Need = Max − Allocation</bdi> <bdi>(Topic 6)</bdi>.",
     "ده الطرح بالمقلوب؛ وبما إن Allocation ≤ Max فهيطلع صفر أو قيم سالبة، والصح هو <bdi>Need = Max − Allocation</bdi> <bdi>(Topic 6)</bdi>."
    ],
    [
     "الـ P0 محتاجة 7 من A وموجود 3 بس (7 &gt; 3)، فماتقدرش تشتغل الأول؛ هي بتخلص قرب آخر الـ safe sequence <bdi>&lt;P1, P3, P4, P0, P2&gt;</bdi> <bdi>(Topic 6)</bdi>.",
     "صح. الـ safety check محتاج Need ≤ Work: و(1, 2, 2) ≤ (3, 3, 2) في كل resource، فالـ P1 بتشتغل الأول، زي الـ safe sequence <bdi>&lt;P1, P3, P4, P0, P2&gt;</bdi> <bdi>(Topic 6, Banker's example)</bdi>.",
     "الـ P2 محتاجة 6 من A وموجود 3 بس (6 &gt; 3)، فلازم تستنى؛ دي آخر process في الـ safe sequence <bdi>(Topic 6)</bdi>.",
     "الـ P4 محتاجة 4 من A وموجود 3 بس (4 &gt; 3)؛ ماتقدرش تشتغل غير بعد ما P1 وP3 يرجّعوا الـ resources بتاعتهم <bdi>(Topic 6)</bdi>."
    ],
    [
     "الـ Unsafe معناها إن الـ deadlock ممكن، مش أكيد.",
     "صح. المحاضرة بتقول: لو السيستم في safe state يبقى مفيش deadlocks؛ ولو في unsafe state يبقى فيه احتمال deadlock <bdi>(Topic 6, Safe State)</bdi>.",
     "«الـ deadlock مستحيل» ده وصف الـ safe state؛ الـ unsafe state هي اللي الـ deadlock بيبقى فيها ممكن <bdi>(Topic 6)</bdi>.",
     "مش لازم أي process تتعملها abort: الـ unsafe معناها بس إن الـ deadlock ممكن يحصل؛ والـ avoidance ببساطة بيخلي الـ processes تستنى عشان السيستم يفضل safe <bdi>(Topic 6)</bdi>."
    ],
    [
     "الـ Mutual exclusion مابيتشالش بالترتيب؛ بيتشال بس للـ resources الـ sharable زي الـ read-only files <bdi>(Topic 6, Deadlock Prevention)</bdi>.",
     "الـ Hold and wait بيتمنع إن الـ process تطلب كل الـ resources قبل ما تبدأ، أو تطلب بس وهي مش ماسكة حاجة، مش بترتيب الـ resource types <bdi>(Topic 6)</bdi>.",
     "الـ No preemption بيتمنع إن الـ process ترجّع كل الـ resources اللي ماسكاها لما طلبها مايتلبّاش، مش بترتيب الـ resources <bdi>(Topic 6)</bdi>.",
     "صح. لما تفرض total ordering على الـ resource types وكل process تطلبهم بترتيب تصاعدي، بيبقى مستحيل يتكوّن cycle من الانتظار، فالـ circular wait بيتمنع <bdi>(Topic 6, Deadlock Prevention)</bdi>."
    ],
    [
     "الـ Prevention بيقيّد طريقة الطلب وبيقلل الـ resource utilization؛ والمحاضرة بتقول إن أغلب الأنظمة، ومنها UNIX، ببساطة بتتجاهل الـ deadlocks <bdi>(Topic 6)</bdi>.",
     "الـ Avoidance محتاج أقصى طلب لكل process من الأول، وsafety check مع كل request، وده مكلّف أوي على الـ OSs العامة؛ الـ UNIX بيتجاهل المشكلة <bdi>(Topic 6)</bdi>.",
     "صح. المحاضرة بتذكر «ignore the problem and pretend that deadlocks never occur in the system» على إنه اللي بتستخدمه أغلب الـ operating systems، ومنها UNIX <bdi>(Topic 6, Methods for Handling Deadlocks)</bdi>.",
     "إنك تشغّل الـ detection كل millisecond هيضيّع CPU time رهيب؛ الـ detection بيتشغّل كل فين وفين، وأغلب الـ OSs (UNIX) بتتجاهل الـ deadlocks أصلًا <bdi>(Topic 6)</bdi>."
    ],
    [
     "ده للـ avoidance مع كذا instance.",
     "صح. الـ cycle معناها deadlock؛ والـ detection بياخد O(n²).",
     "الـ page table بتربط الـ pages بالـ frames في الـ memory management (Topic 4)؛ ملهاش أي علاقة بمين مستني مين <bdi>(Topic 6)</bdi>.",
     "الـ Need matrix تبع الـ banker's algorithm للـ multiple instances؛ مع الـ single instances الـ detection بيستخدم wait-for graph <bdi>(Topic 6)</bdi>."
    ],
    [
     "صح. الـ slide بتذكر عيوب الطريقة دي لمنع الـ hold-and-wait، وهما الـ low resource utilization (الـ resources بتتمسك بدري أوي قبل ما تتستخدم) والـ possible starvation <bdi>(Topic 6, Deadlock Prevention)</bdi>.",
     "الـ Circular wait ده شرط deadlock تاني منفصل، والـ race conditions بتيجي من shared data مش متزامنة؛ العيوب المذكورة هي low utilization والـ starvation <bdi>(Topic 6)</bdi>.",
     "الـ External fragmentation دي مشكلة في الـ memory allocation (Topic 4)، مش تمن إنك تطلب كل الـ resources في الأول <bdi>(Topic 6)</bdi>.",
     "لأ، فيه عيوب: المحاضرة بتذكر low resource utilization وpossible starvation <bdi>(Topic 6)</bdi>."
    ],
    [
     "اختبار الـ initialization على الـ Allocation مش الـ Request، يعني <bdi>Finish[i] = true</bdi> لو <bdi>Allocation_i = 0</bdi>؛ أما <bdi>Request_i ≤ Work</bdi> فده بيتشيك عليه بعدين جوه الـ loop <bdi>(Topic 6, Detection Algorithm)</bdi>.",
     "صح. الـ process اللي مش ماسكة حاجة ماينفعش تبقى جزء من deadlock.",
     "الـ Need ≤ Available ده اختبار الـ safety بتاع الـ banker's؛ الـ detection algorithm بيقارن Request_i ≤ Work جوه الـ loop، مش وقت الـ initialization <bdi>(Topic 6)</bdi>.",
     "الـ Finish[i] ماينفعش تبدأ true على طول، وإلا عمرك ما هتلاقي حد في deadlock؛ هي بتبدأ false لكل process عندها Allocation_i ≠ 0 <bdi>(Topic 6)</bdi>."
    ],
    [
     "اختيار الـ victim بأقل تكلفة ده واحد من الـ 3 issues اللي المحاضرة بتذكرها للـ recovery بالـ resource preemption <bdi>(Topic 6)</bdi>.",
     "الـ Rollback، يعني ترجّع الـ process لـ safe state معينة وتعيد تشغيلها، ده واحد من الـ preemption issues المذكورة <bdi>(Topic 6)</bdi>.",
     "الـ Starvation issue مذكورة: ممكن نفس الـ process تتختار victim كل مرة، فعدد الـ rollbacks بيدخل في حساب الـ cost <bdi>(Topic 6)</bdi>.",
     "الاختيار الصح. الـ Compaction مفهوم من الـ memory management."
    ]
   ],
   "extra": [
    [
     "ده بيجمع الـ Allocation على الـ Max، والصح هو <bdi>Need = Max − Allocation</bdi>.",
     "صح. الـ Need بيساوي Max − Allocation، فللـ P2:<span class=\"ltr\">(4, 1, 3) − (0, 1, 1) = (4, 0, 2)</span> <bdi>(Topic 6, Banker's Algorithm)</bdi>.",
     "ده الـ Max بتاع P2. هي ماسكة أصلًا (0, 1, 1)، ولازم يتطرح.",
     "الطرح معكوس (Allocation − Max)."
    ],
    [
     "ده مجموع columns الـ Allocation. والـ Available بيساوي الـ Total ناقص المجموع ده.",
     "دي الإجماليات؛ فيه instances متخصصة أصلًا.",
     "صح. مجموع أعمدة الـ Allocation هو:<span class=\"ltr\">(1+2+0+1, 0+1+1+1, 1+0+1+0) = (4, 3, 2)</span>فالـ Available بيساوي:<span class=\"ltr\">(6, 4, 5) − (4, 3, 2) = (2, 1, 3)</span> <bdi>(Topic 6)</bdi>.",
     "الـ (2, 2, 1) دي الـ Need بتاع P0، يعني (3, 2, 2) − (1, 0, 1)؛ الـ Available هو الـ Total ناقص كل الـ allocations:<span class=\"ltr\">(6, 4, 5) − (4, 3, 2) = (2, 1, 3)</span> <bdi>(Topic 6)</bdi>."
    ],
    [
     "P0 ماينفعش تبدأ: محتاجة 2 من B والمتاح 1 بس.",
     "P2 ماينفعش تبدأ: محتاجة 4 من A والمتاح 2 بس.",
     "P3 ماينفعش تبدأ: محتاجة 2 من B والمتاح 1 بس.",
     "صح. الـ Work بيمشي كده:<span class=\"ltr\">P1 → (4, 2, 3), P2 → (4, 3, 4), P3 → (5, 4, 4), P0 → (6, 4, 5)</span>الكل خلص، فالـ state safe."
    ],
    [
     "الشروط دي بتعدّي، بس الـ state المفترضة لازم تبقى safe كمان، وهي مش safe.",
     "الـ Request (1, 1, 0) ≤ Need (2, 2, 1)، فمش بيعدّي الـ claim.",
     "صح. نفترض: Available (1, 0, 3)، Need P0 (1, 1, 1). مع B = 0، مفيش process (P0 وP1 وP3 كلهم محتاجين B؛ P2 محتاجة 4 A) تقدر تخلص، فالـ state القديمة بترجع وP0 بتستنى.",
     "الـ Safety لازم تتشيك على الـ state الجديدة بعد الـ allocation المفترض، مش القديمة."
    ],
    [
     "صح. الـ P2 مش طالبة حاجة، فالـ Work يبقى (1, 1). وبعدين:<span class=\"ltr\">P0 (0, 1) ✓ → (2, 1); P1 (1, 0) ✓ → (3, 2)</span>وكل الـ Finish بقت true.",
     "كانوا هيتزنقوا بس لو P2 عمرها ما سابت الـ resources بتاعتها؛ الـ request بتاع P2 هو (0, 0)، فهي بتخلص الأول.",
     "الـ Available = 0 مش معناه deadlock: الـ process اللي Request ≤ Work بتاعها (P2) لسه تقدر تخلص وتسيب.",
     "P2 مش محتاجة حاجة زيادة، فهي أول واحدة تخلص."
    ],
    [
     "ده بس لو فيه instance واحد لكل resource type. مع كذا instance الـ cycle معناها احتمال بس (مثال P2/P4 في المحاضرة).",
     "صح. الـ cycle مع كذا instance لكل نوع معناها إن الـ deadlock ممكن بس؛ زي إن P2 وP4 يقدروا يسيبوا ويكسروا الـ cycle."
    ],
    [
     "F(tape) = 1 &lt; 5. الطلبات لازم تبقى بترتيب تصاعدي، فماينفعش تطلب الـ tape وهي ماسكة الـ disk.",
     "جزء الـ tape لسه بيكسر الترتيب التصاعدي.",
     "كده الـ circular wait مش هيتمنع. الطلبات لازم تمشي على الـ total ordering.",
     "صح. الـ <bdi>F(printer) = 12</bdi> أكبر من <bdi>F(disk) = 5</bdi>، فالطلب بترتيب الـ enumeration التصاعدي."
    ],
    [
     "صح. المحاضرة بتحصر الطريقة دي في الـ resources دي.",
     "إنك تاخد printer في نص الـ job ماينفعش يترجع بشكل نضيف؛ الـ state بتاعته مش سهل تتحفظ.",
     "الـ Read-only files ينفع تتشارك، وده تبع الـ mutual exclusion، مش الـ preemption.",
     "المحاضرة بتحصرها في الـ resources اللي الـ state بتاعتها ينفع تتحفظ وترجع."
    ],
    [
     "صح. المحاضرة بتدّي O(n²) لاكتشاف الـ cycle في الـ wait-for graph (instance واحد لكل resource type).",
     "المحاضرة بتقول إن اكتشاف الـ cycle محتاج O(n²) operations لـ n vertices."
    ],
    [
     "ده الـ recovery بالـ process termination، مش حل لـ starvation الـ victim.",
     "الـ Rollback مسألة منفصلة؛ مابيمنعش إن نفس الـ victim يتختار تاني.",
     "صح. حساب عدد الـ rollbacks في الـ cost بيمنع نفس الـ process من الـ starvation.",
     "الـ Aging هو حل الـ starvation في الـ CPU scheduling (Lecture 3)، مش الحل اللي اتقال لاختيار الـ victim."
    ]
   ]
  },
  "7": {
   "notes": [
    {
     "h": "مفهوم الـ File، الـ attributes والـ operations",
     "pts": [
      "الـ file هو <b>contiguous logical address space</b>.<br>• أنواعه: <b>data</b> (numeric و character و binary) و<b>program</b>.<br>• المحتوى بيحدده اللي عمل الـ file، زي الـ text file والـ source file والـ executable file وغيرهم.",
      "الـ <b>Attributes</b>:<br>• الـ <b>Name</b>: المعلومة الوحيدة اللي بتتحفظ بشكل البني آدم يقدر يقراه.<br>• الـ <b>Identifier</b>: هو tag أو رقم مميز جوة الـ file system.<br>• الـ <b>Type</b>.<br>• الـ <b>Location</b>: هو pointer لمكان الـ file على الجهاز.<br>• الـ <b>Size</b>.<br>• الـ <b>Protection</b>: مين يقدر يقرا ويكتب وينفذ.<br>• الـ <b>Time والـ date والـ user identification</b>: للـ protection والـ security ومتابعة الاستخدام.<br>والـ extended attributes فيها حاجات زي الـ file checksum.",
      "المعلومات عن الـ files بتتحفظ في الـ <b>directory structure</b>، اللي متخزن على الـ disk.",
      "الـ <b>Operations</b>:<br>• الـ create.<br>• الـ write عند الـ write pointer.<br>• الـ read عند الـ read pointer.<br>• الـ reposition جوة الـ file (<b>seek</b>).<br>• الـ delete والـ truncate.<br>• الـ <b>open(Fi)</b>: دوّر في الـ directory على الـ disk على الـ entry Fi وانقل محتواه للـ memory.<br>• الـ <b>close(Fi)</b>: انقل محتوى الـ entry Fi اللي في الـ memory ورجّعه للـ directory على الـ disk."
     ],
     "figH": {
      "os-file-open": "الـ file operations: الـ open والـ close بينقلوا الـ directory entry بين الـ disk والـ memory إزاي"
     }
    },
    {
     "h": "الـ Open files، أنواع الـ files وهيكل الـ file",
     "pts": [
      "الداتا المطلوبة عشان ندير الـ open files: الـ <b>open-file table</b> (بتتابع الـ files المفتوحة)؛ الـ <b>file pointer</b> (آخر مكان read/write، لكل process)؛ الـ <b>file-open count</b> (عدد مرات فتح الـ file، عشان الـ entry بتاعه يتشال لما آخر process تقفله)؛ الـ <b>access rights</b> (معلومات الـ access-mode لكل process).",
      "أنواع الـ files حسب الـ extension:<br>• الـ executable زي exe و com و bin.<br>• الـ object زي obj و o.<br>• الـ source code زي c و cc و java و asm وغيرهم.<br>• الـ batch زي bat و sh.<br>• الـ text زي txt و doc.<br>• الـ word processor زي wp و tex و rtf و doc.<br>• الـ library زي lib و a و so و dll.<br>• الـ print or view زي ps و pdf و jpg.<br>• الـ archive زي arc و zip و tar.<br>• الـ multimedia زي mpeg و mov و mp3 و mp4 و avi.",
      "الـ <b>File structure</b>:<br>• مفيش structure (none)، يعني سلسلة words أو bytes.<br>• الـ simple record structure، زي الـ lines أو الـ fixed length أو الـ variable length.<br>• الـ complex structures، زي الـ formatted document أو الـ relocatable load file.<br>واللي بيحدده يا الـ <b>operating system</b> يا الـ <b>program</b>."
     ],
     "figH": {
      "os-open-count": "الـ open files: الـ open-file table والـ file-open count والـ file pointer بتاع كل process"
     }
    },
    {
     "h": "الـ Access methods",
     "pts": [
      "الـ <b>Sequential access</b> ماشي على موديل الـ tape (البداية، والمكان الحالي، والنهاية).<br>• الـ operations هي read next و write next و reset.<br>• مفيش read بعد آخر write (rewrite).",
      "الـ <b>Direct access</b>: الـ file عبارة عن logical records ثابتة الطول.<br>• الـ operations هي read n و write n و position to n و read next و write next و rewrite n.<br>• الـ <b>n</b> هنا هو الـ <b>relative block number</b>.<br>• الـ relative block numbers بتخلي الـ OS يقرر الـ file يتحط فين.",
      "محاكاة الـ sequential access على direct-access file بـ current position <b>cp</b>:<span class=\"ltr\">reset → cp = 0</span><span class=\"ltr\">read next → read cp; cp = cp + 1</span><span class=\"ltr\">write next → write cp; cp = cp + 1</span>"
     ],
     "figH": {
      "os-access-methods": "الـ access methods: الـ sequential والـ direct، والـ sequential متعمل على direct access"
     }
    },
    {
     "h": "الـ Directory structure",
     "pts": [
      "الـ directory مجموعة nodes فيها معلومات عن كل الـ files. <b>الـ directory structure والـ files الاتنين موجودين على الـ disk.</b>",
      "الـ operations هي الـ search عن file، والـ create file، والـ delete file، والـ list directory، والـ rename file، والـ traverse للـ file system.",
      "أهداف التنظيم: الـ <b>Efficiency</b> (تلاقي الـ file بسرعة)؛ الـ <b>Naming</b> (مريح للـ users: اتنين users ممكن يستخدموا نفس الاسم لـ files مختلفة، والـ file الواحد ممكن يبقى ليه كذا اسم)؛ الـ <b>Grouping</b> (تجميع منطقي حسب الخصائص، زي كل برامج الـ Java، كل الـ games).",
      "الـ <b>Tree-structured</b>:<br>• الـ search efficient، وفيه إمكانية grouping.<br>• فيه current (working) directory، زي <code>cd /spell/mail/prog</code>.<br>• الـ path names يا absolute يا relative.<br>• الـ files والـ subdirectories الجديدة بتتعمل في الـ current directory بـ <code>rm &lt;file-name&gt;</code> و <code>mkdir &lt;dir-name&gt;</code>، زي لما تكون في /mail وتعمل <code>mkdir count</code>.<br>• مسح \"mail\" بيمسح الـ subtree كله اللي جذره mail."
     ],
     "figH": {
      "os-dir-structures": "أنواع الـ directory structure: الـ single-level والـ two-level والـ tree"
     }
    },
    {
     "h": "الـ File sharing والـ protection",
     "pts": [
      "المشاركة في الـ multi-user systems حاجة مرغوبة وممكن تتعمل عن طريق <b>protection scheme</b>. في الـ distributed systems الـ files بتتشارك على network؛ والـ <b>NFS (Network File System)</b> طريقة مشهورة للـ distributed file-sharing.",
      "الـ <b>User IDs</b> بتعرّف الـ users، فينفع نحط permissions لكل user؛ الـ <b>group IDs</b> بتحط الـ users في groups ليها group access rights. كل file أو directory ليه <b>owner</b> و<b>group</b>.",
      "الـ owner/creator بيتحكم في <b>إيه اللي يتعمل ومين يعمله</b>. وأنواع الـ access هي <b>read و write و execute و append و delete و list</b>.",
      "في UNIX/Linux، الـ modes هي read و write و execute لـ 3 classes هما <b>owner</b> و<b>group</b> و<b>public</b>.<br>مثال:<span class=\"ltr\">owner 7 = RWX 111, group 6 = RW- 110, public 1 = --X 001 → <code>chmod 761 game</code></span>اطلب من الـ manager يعمل group (زي G) ويضيف الـ users، وبعدين ظبط الـ access بتاع الـ file.<br>والـ Windows بيستخدم access-control lists، زي الـ full control والـ modify والـ read &amp; execute والـ read والـ write."
     ],
     "figH": {
      "os-chmod": "الـ protection في الـ UNIX/Linux: الـ read والـ write والـ execute للـ owner والـ group والـ public"
     }
    },
    {
     "h": "تنفيذ الـ File-system: الهيكل وتنفيذ الـ directory",
     "pts": [
      "الـ <b>file</b> وحدة تخزين منطقية، مجموعة معلومات مرتبطة ببعض.<br>• الـ file system موجود على الـ secondary storage (disks).<br>• بيوفر الـ user interface للـ storage، يعني mapping من الـ logical للـ physical.<br>• وبيوفر access efficient ومريح، يعني store و locate و retrieve.",
      "الـ Disks بتوفر in-place rewrite وrandom access؛ والـ I/O بيتعمل في <b>blocks of sectors</b> (غالبًا 512 bytes).",
      "الـ <b>File control block (FCB)</b>: storage structure فيه معلومات عن الـ file. الـ <b>device driver</b> بيتحكم في الجهاز الـ physical.",
      "الـ <b>Linear list</b> فيها أسامي الـ files مع pointers للـ data blocks: سهلة في البرمجة بس بتاخد وقت (linear search)؛ ممكن نخليها sorted بـ linked list أو B+ tree.",
      "الـ <b>Hash table</b> هي linear list ومعاها hash structure، وده بيقلل وقت الـ search في الـ directory.<br>• فيه <b>collisions</b>، يعني اسمين بيروحوا لنفس المكان بعد الـ hash.<br>• كويسة بس لو الـ entries ثابتة الحجم، أو استخدم الـ chained-overflow method."
     ],
     "figH": {
      "os-dir-impl": "تنفيذ الـ directory: الـ search في linear list مقارنةً بالـ hash table"
     }
    },
    {
     "h": "الـ Allocation methods: الـ contiguous والـ linked والـ FAT والـ indexed",
     "pts": [
      "الـ allocation method هي إزاي الـ disk blocks بتتخصص للـ files، وأنواعها <b>contiguous و linked و indexed</b>.",
      "الـ <b>Contiguous</b>: كل file بياخد مجموعة blocks ورا بعض.<br>• أحسن performance في أغلب الحالات.<br>• بسيط، لأننا محتاجين بس <b>الـ starting block والـ length</b>.<br>• مثال directory (الـ start/الـ length):<span class=\"ltr\">count 0/2, tr 14/3, mail 19/6, list 28/4, f 6/2</span>• المشاكل: إيجاد مساحة، ومعرفة حجم الـ file مقدمًا، والـ <b>external fragmentation</b>، والحاجة لـ compaction سواء off-line أو on-line.",
      "الـ <b>Linked</b>: كل file عبارة عن linked list من blocks متفرقة في أي حتة على الـ disk.<br>• كل block فيه pointer للي بعده، والـ file بيخلص عند null pointer.<br>• الـ directory فيه البداية والنهاية، زي jeep اللي بيبدأ (start) عند 9 وبيخلص (end) عند 25، والـ chain بتاعته:<span class=\"ltr\">9 → 16 → 1 → 10 → 25</span><b>المميزات</b>: مفيش external fragmentation، ومفيش compaction، ومش محتاج تعلن الحجم وقت الإنشاء.<br><b>العيوب</b>: الـ reliability (الـ pointers ممكن تضيع أو تبوظ)؛ والوصول لـ block ممكن ياخد I/Os و seeks كتير (مفيش direct access efficient)؛ ومحتاجين مساحة للـ pointers.",
      "الـ <b>FAT (File-Allocation Table)</b>: نوع من الـ linked allocation بيحط الـ links في table في أول الـ volume.<br>الـ directory entry \"test\" فيه start block 217، والسلسلة:<span class=\"ltr\">FAT[217] = 618, FAT[618] = 339, FAT[339] = −1</span>والـ −1 معناها نهاية الـ file.",
      "الـ <b>Indexed</b>: كل file ليه <b>index block(s)</b> خاص بيه فيه pointers للـ data blocks بتاعته، زي الـ index block 19 بتاع jeep اللي فيه:<span class=\"ltr\">9, 16, 1, 10, 25, −1, …</span>• بيدعم <b>random (direct) access</b> و dynamic access <b>من غير external fragmentation</b>، بس فيه <b>overhead الـ index block</b>.<br>• لو الـ file أقصاه 256 KB والـ blocks حجمها 512 byte، يبقى عندنا 512 block، ومحتاجين <b>index block واحد</b> بس.<br>• لو طول الـ file مش محدود استخدم <b>linked scheme</b>: اربط blocks الـ index table ببعض، من غير حد للحجم."
     ],
     "figH": {
      "os-fat": "الـ FAT: بنمشي ورا الـ file اللي اسمه test في الـ File-Allocation Table",
      "os-alloc-methods": "الـ allocation methods: الـ contiguous والـ linked والـ indexed على نفس الـ disk"
     }
    }
   ],
   "cards": [
    "Contiguous logical address space؛ مجموعة معلومات مرتبطة ليها اسم على الـ secondary storage.",
    "الـ name والـ identifier والـ type والـ location والـ size والـ protection والـ time/date/user identification.",
    "الـ Name.",
    "Open: دوّر في الـ directory وانقل الـ entry Fi للـ memory. Close: رجّعه للـ directory على الـ disk.",
    "الـ open-file table والـ file pointer والـ file-open count والـ access rights.",
    "الـ sequential فيه read/write next و reset.<br>الـ direct فيه read n و write n بالـ relative block number.",
    "الـ efficiency والـ naming والـ grouping.",
    "مشكلة الـ naming (أسامي unique) ومشكلة الـ grouping.",
    "directory منفصل لكل user؛ نفس الأسامي مسموحة؛ search efficient؛ مفيش grouping.",
    "Owner RWX (7)، group RW (6)، public X (1).",
    "الـ read والـ write والـ execute والـ append والـ delete والـ list.",
    "Storage structure فيه معلومات عن الـ file.",
    "الـ Collisions؛ محتاج entries ثابتة الحجم أو chained overflow.",
    "الـ contiguous والـ linked والـ indexed.",
    "External fragmentation؛ لازم تعرف حجم الـ file؛ إيجاد مساحة.",
    "المميزات: مفيش external fragmentation، ومش محتاج تعرف الحجم.<br>العيوب: الـ reliability، والـ access بطيء، ومحتاج مساحة للـ pointers.",
    "Linked allocation والـ links بتاعة الـ block اللي بعده محفوظة في table (−1 = نهاية الـ file).",
    "كل file ليه index block فيه pointers، وبيدّي random access، ومفيش external fragmentation، بس فيه overhead للـ index."
   ],
   "qa": [
    "الـ Name (المعلومة الوحيدة اللي البني آدم يقدر يقراها)، الـ identifier (رقم مميز جوة الـ file system)، الـ type، الـ location (pointer لمكان الجهاز)، الـ size، الـ protection (مين يقدر يقرا أو يكتب أو ينفذ)، والـ time والـ date والـ user identification (للـ protection والـ security ومتابعة الاستخدام). وبيتحفظوا في الـ directory structure على الـ disk.",
    "الـ operations:<br>• الـ create.<br>• الـ write عند الـ write pointer.<br>• الـ read عند الـ read pointer.<br>• الـ reposition جوة الـ file (seek).<br>• الـ delete والـ truncate.<br>• الـ open(Fi): دوّر في الـ directory على الـ disk وانقل الـ entry للـ memory.<br>• الـ close(Fi): رجّع الـ entry للـ directory على الـ disk.",
    "الـ single-level فيه directory واحد لكل الـ users. بسيط، بس فيه مشكلة naming (كل أسامي الـ files لازم تبقى unique) ومشكلة grouping.<br>الـ two-level فيه directory منفصل لكل user. الـ users المختلفين يقدروا يستخدموا نفس اسم الـ file (الـ path name هو اللي بيحدد الـ file) والـ search efficient، بس لسه مفيش إمكانية grouping.",
    "الـ Linked: كل file عبارة عن linked list من disk blocks ممكن تبقى متفرقة في أي حتة. كل block بيشاور على اللي بعده، والـ directory فيه أول (وآخر) block، والـ file بيخلص عند null pointer. مافيهوش external fragmentation، ومش محتاج compaction ولا حجم معلن، بس مش reliable لو pointer ضاع، والـ direct access بطيء (I/Os وseeks كتير)، والـ pointers بتاخد مساحة. الـ FAT نوع منه والـ links محفوظة في table. الـ Indexed: كل file ليه index block خاص بيه فيه pointers لكل الـ data blocks بتاعته، والـ directory بيشاور على الـ index block. بيدعم random access من غير external fragmentation، بس كل file عليه overhead الـ index block. الـ files الكبيرة بتستخدم linked scheme من الـ index blocks.",
    "كل file بياخد مجموعة disk blocks ورا بعض، والـ directory بيخزن بس الـ starting block والـ length. بسيط وبيدّي أحسن performance (sequential وdirect access سريعين). مشاكله: إيجاد مساحة لـ file جديد، معرفة حجم الـ file مقدمًا، والـ external fragmentation، اللي محتاجة compaction يا off-line يا on-line."
   ],
   "quiz": [
    [
     "الـ identifier ده tag فريد (رقم) بيعرّف الـ file جوه الـ file system، فهو مش في صورة يقدر البني آدم يقراها <bdi>(Topic 7, File Attributes)</bdi>.",
     "صح. في لستة الـ file attributes في المحاضرة، الـ name هو المعلومة الوحيدة اللي متخزنة في صورة human-readable؛ أما الـ identifier والـ location وغيرهم فدول للـ system <bdi>(Topic 7, File Attributes)</bdi>.",
     "الـ location ده pointer لمكان الـ file على الـ device، معمول للـ system، مش اسم البني آدم يقراه <bdi>(Topic 7)</bdi>.",
     "الـ protection دي معلومات access-control (مين يقدر يعمل read وwrite وexecute)، مش الـ attribute اللي بيتقري؛ ده الـ name <bdi>(Topic 7)</bdi>."
    ],
    [
     "صح. الـ files محتاجة blocks ورا بعض.",
     "الـ Linked allocation مافيهوش external fragmentation: كل block بيشاور على اللي بعده، فأي free block في أي حتة على الـ disk ينفع يتستخدم <bdi>(Topic 7, Linked Allocation)</bdi>.",
     "الـ Indexed allocation بيدّي dynamic access من غير external fragmentation؛ التمن بتاعه هو الـ overhead بتاع الـ index block <bdi>(Topic 7, Indexed Allocation)</bdi>.",
     "الـ FAT ده نوع من الـ linked allocation (الـ links للـ block اللي بعده متخزنة في table)، فالـ blocks ممكن تبقى متفرقة ومفيش external fragmentation <bdi>(Topic 7)</bdi>."
    ],
    [
     "دي مشاكل الـ contiguous allocation؛ المحاضرة بتعدّ «no external fragmentation, no compaction» كـ advantages للـ linked allocation <bdi>(Topic 7)</bdi>.",
     "صح. الـ slide بتعدّ عيوب الـ linked allocation: الـ pointers ممكن تضيع أو تبوظ، والوصول لـ block ممكن ياخد I/Os وseeks كتير، ومحتاجين مساحة للـ pointers <bdi>(Topic 7, Linked Allocation)</bdi>.",
     "إنك تحدد الحجم من الأول دي مشكلة الـ contiguous allocation؛ الـ linked allocation بيعدّ «no need to declare file size at creation» كـ advantage <bdi>(Topic 7)</bdi>.",
     "الـ overhead بتاع الـ index block ده تمن الـ indexed allocation؛ الـ linked allocation بدل كده بيحط pointer جوه كل data block <bdi>(Topic 7)</bdi>."
    ],
    [
     "الـ free block بيتعلّم بـ 0 في الـ FAT؛ أما الـ −1 فهو علامة نهاية الـ file، يعني block 339 هو آخر block في الـ file <bdi>(Topic 7, File-Allocation Table)</bdi>.",
     "صح. كل entry في الـ FAT فيها رقم الـ block اللي بعده في الـ file؛ والسلسلة اللي بتبدأ من الـ start block (217 في المثال) بتخلص عند entry قيمتها −1، يعني block 339 هو آخر block <bdi>(Topic 7, File-Allocation Table)</bdi>.",
     "الـ −1 مش بيعلّم bad block؛ في مثال الـ FAT بتاع المحاضرة هو علامة نهاية الـ file في آخر السلسلة <bdi>(Topic 7)</bdi>.",
     "البداية في الـ directory entry (217 في المثال)."
    ],
    [
     "الـ read والـ write والـ execute معناها 7 = 111، وده رقم الـ owner في 761؛ رقم الـ group هو 6 <bdi>(Topic 7, Access Lists and Groups)</bdi>.",
     "صح. الأرقام بالترتيب هي الـ owner والـ group والـ public؛ ورقم الـ group هو 6، يعني 110 بالـ binary، يعني RW-، يعني الـ group يقدر يعمل read وwrite بس مش execute <bdi>(Topic 7, Access Lists and Groups)</bdi>.",
     "الـ execute بس معناها 1 = 001، وده رقم الـ public (others) في 761؛ ورقم الـ group هو 6، يعني RW- <bdi>(Topic 7)</bdi>.",
     "لو مفيش access خالص يبقى 0 = 000، ومفيش ولا رقم في 761 بـ 0؛ والـ group واخد 6 = 110، يعني read و write <bdi>(Topic 7)</bdi>."
    ],
    [
     "صح. لما يبقى فيه directory واحد لكل الـ users، كل الـ files لازم يبقى ليها أسماء unique (مشكلة الـ naming) ومفيش تجميع منطقي للـ files (مشكلة الـ grouping) <bdi>(Topic 7, Single-Level Directory)</bdi>.",
     "المشكلتين اللي في الـ slide هما الـ naming (كل الأسماء unique) والـ grouping (مفيش logical groups)؛ سرعة الـ search مش واحدة منهم <bdi>(Topic 7)</bdi>.",
     "الـ External fragmentation دي مشكلة في الـ disk allocation (الـ contiguous allocation)، مش مشكلة في الـ directory structure <bdi>(Topic 7)</bdi>.",
     "الـ single-level directory مفيهوش path names أصلًا؛ الـ path names بتيجي مع الـ two-level والـ tree-structured directories <bdi>(Topic 7)</bdi>."
    ],
    [
     "بالعكس: لما تعمل hash لاسم الـ file بتوصل للـ entry على طول، وده بيقلّل الـ directory search time مقارنة بالـ linear list <bdi>(Topic 7, Directory Implementation)</bdi>.",
     "صح. الـ hash table اللي فوق الـ linear list بتقلّل الـ directory search time، بس لازم تتعامل مع الـ collisions، لما اسمين files يطلعوا على نفس الـ location <bdi>(Topic 7, Directory Implementation)</bdi>.",
     "الـ hash table بتتحسب من أسماء الـ files، فالأسماء لسه مطلوبة؛ هي بس بتسرّع الوصول ليها <bdi>(Topic 7)</bdi>.",
     "الـ directory implementation ملهوش علاقة بطريقة allocation الـ data blocks؛ الـ entries بس بتشاور على الـ data blocks <bdi>(Topic 7)</bdi>."
    ],
    [
     "الـ Sequential access بيستخدم read next / write next / reset، وبيمشي في الـ file بالترتيب، مش برقم block n <bdi>(Topic 7, Access Methods)</bdi>.",
     "صح. الـ Direct access بيتعامل مع الـ file كـ fixed-length logical records بـ operations زي read n وwrite n وposition to n، والـ n هنا relative block number <bdi>(Topic 7, Access Methods)</bdi>.",
     "الـ Indexed-sequential access مش في المحاضرة دي، اللي بتغطي الـ sequential والـ direct access بس؛ والـ read n / write n ده الـ direct access <bdi>(Topic 7)</bdi>.",
     "الـ Linked ده disk allocation method (كل block بيشاور على اللي بعده)، مش file access method <bdi>(Topic 7)</bdi>."
    ],
    [
     "صح. المحاضرة بتعدّ البيانات اللازمة لإدارة الـ open files: الـ open-file table، والـ file pointer لكل process، والـ file-open count، والـ access rights لكل process <bdi>(Topic 7, Open Files)</bdi>.",
     "الـ page table والـ TLB بيترجموا الـ memory addresses (جزء الـ memory management في Topics 4–5)؛ مش بيتستخدموا لمتابعة الـ open files <bdi>(Topic 7)</bdi>.",
     "الـ segment table بتعمل map للـ segments في الـ memory في الـ segmentation <bdi>(Topic 4)</bdi>؛ أما الـ open files فبتتتابع في الـ open-file table <bdi>(Topic 7)</bdi>.",
     "الـ interrupt vector فيه عناوين الـ interrupt service routines <bdi>(Topic 1)</bdi>؛ ملهوش أي علاقة بالـ open files <bdi>(Topic 7)</bdi>."
    ],
    [
     "صح. لأن 256 KB / 512 B = 512 data block، والـ pointers بتاعتهم بتكفي في index block واحد.",
     "كنا هنحتاج 2 index blocks لو الـ 512 pointer مكانوش هيكفّوا في block واحد؛ بس المحاضرة بتقول إن 1 index block بس كفاية لـ 256 KB بـ blocks حجمها 512 <bdi>(Topic 7)</bdi>.",
     "الـ 512 ده عدد الـ data blocks (256 KB ÷ 512 B)؛ والـ 512 pointer بتوعهم كلهم بيدخلوا في index block واحد <bdi>(Topic 7)</bdi>.",
     "الـ 256 ده حجم الـ file بالـ KB، مش عدد blocks؛ الـ file فيه 512 data block، وكلهم متعملّهم index بـ index block واحد <bdi>(Topic 7)</bdi>."
    ]
   ],
   "extra": [
    [
     "الـ Read وwrite وexecute يعني 7 = 111، وده رقم الـ owner في 754؛ رقم الـ group هو 5 = 101 <bdi>(Topic 7)</bdi>.",
     "الـ read بس معناها 4 = 100، وده رقم الـ public في 754؛ ورقم الـ group هو 5، يعني 101، يعني R-X <bdi>(Topic 7)</bdi>.",
     "صح. في 754 الأرقام بالترتيب هي الـ owner والـ group والـ public؛ والـ group قيمته 5، يعني 101 بالـ binary، يعني R-X، يعني الـ group يقدر يعمل read وexecute بس مش write <bdi>(Topic 7, Access Lists and Groups)</bdi>.",
     "ده كان هيبقى 6 = 110، بس رقم الـ group هنا 5."
    ],
    [
     "صح. الـ Owner RW- = 110 = 6، الـ group R-- = 100 = 4، الـ public --- = 000 = 0.",
     "الـ 2 = 010 يعني write بس، مش read بس، للـ group.",
     "الأرقام بترتيب الـ owner والـ group والـ public؛ هنا الـ owner والـ group متبدلين.",
     "الـ 7 بيدّي الـ owner execute كمان، والـ 5 بيدّي الـ group execute."
    ],
    [
     "غلط بواحد: الـ blocks هي 20، 21، 22، 23، 24، فـ 24 هو الـ block الخامس (الأخير).",
     "ده مكان الـ block جوة الـ file. لازم يتجمع على الـ start block.",
     "الـ 25 بعد نهاية الـ file (start + length).",
     "صح. الـ file واخد 20–24؛ الـ block الرابع هو start + 3 = 23. والـ direct access السهل ده هو سبب إن الـ contiguous allocation الـ performance بتاعه كويس."
    ],
    [
     "الـ chain مابتقفش عند 12: الـ FAT[12] بيشاور على block 3.",
     "صح. امشي ورا الـ links من الـ start block؛ الـ −1 بيعلّم نهاية الـ file عند block 3.",
     "الـ −1 ده علامة نهاية الـ file في الـ FAT، مش رقم block، فالـ file فيه 3 blocks بس: 5 → 12 → 3 <bdi>(Topic 7)</bdi>.",
     "الـ FAT نوع من الـ linked allocation؛ الـ blocks ممكن تبقى متفرقة في أي حتة."
    ],
    [
     "بيقرا عند المكان الحالي قبل ما يزوّد الـ cp.",
     "الـ read next كمان بيحرّك الـ position: بيعمل:<span class=\"ltr\">read cp; cp = cp + 1</span>فالـ cp بيبقى 5 <bdi>(Topic 7, Simulation of Sequential Access)</bdi>.",
     "الـ cp = 0 ده شغل الـ reset، مش الـ read next.",
     "صح. في محاكاة الـ sequential access، الـ read next معناها:<span class=\"ltr\">read block cp; cp = cp + 1</span>فبيتقري block 4 والـ cp بيبقى 5 <bdi>(Topic 7, Simulation of Sequential Access on Direct-access File)</bdi>."
    ],
    [
     "صح. ده تعريف المحاضرة؛ والـ close(F<sub>i</sub>) بترجّع الـ entry اللي في الـ memory للـ directory على الـ disk.",
     "الـ open بتجيب الـ directory entry، مش كل داتا الـ file.",
     "إنك ترجّع الـ entry اللي في الـ memory للـ directory structure على الـ disk ده شغل الـ close(F<sub>i</sub>)، عكس الـ open <bdi>(Topic 7, File Operations)</bdi>.",
     "إنك تعمل file جديد فاضي ده الـ create operation؛ الـ open(F<sub>i</sub>) بيدوّر على entry موجودة ويجيبها في الـ memory <bdi>(Topic 7)</bdi>."
    ],
    [
     "تسجيل آخر read/write location لكل process ده شغل الـ file pointer، مش الـ open count <bdi>(Topic 7, Open Files)</bdi>.",
     "الـ access mode لكل process بيتخزن كمعلومات الـ access-rights، مش في الـ file-open count <bdi>(Topic 7, Open Files)</bdi>.",
     "صح. لما العدد يوصل صفر، الـ entry ممكن يتشال من الـ open-file table.",
     "دي معلومات حجم/مكان الـ file، مش داتا الـ open-file."
    ],
    [
     "العكس: الـ naming اتحل والـ grouping لأ.",
     "صح. الـ files بتتعنون كـ user/file، فالأسامي لازم تبقى unique لكل user بس؛ والـ grouping محتاج tree structure.",
     "الـ user لسه مايقدرش يعمل grouping للـ files بتاعته؛ ده محتاج tree-structured directory.",
     "الـ search بيبقى efficient، ومشكلة الـ naming بين الـ users بتتحل."
    ],
    [
     "صح. المحاضرة بتقول إن مسح \"mail\" بيمسح الـ subtree كله اللي جذره mail.",
     "في مثال الـ tree في المحاضرة، مسح الـ directory بيشيل كل اللي تحته."
    ],
    [
     "معرفة الحجم مقدمًا دي مشكلة الـ contiguous allocation. الـ Linked files بتكبر block block.",
     "صح. الـ Linked allocation مافيهوش external fragmentation، ومش محتاج compaction ومش محتاج الحجم وقت الإنشاء."
    ]
   ]
  },
  "8": {
   "notes": [
    {
     "h": "نظرة عامة والـ I/O hardware",
     "pts": [
      "إدارة الـ I/O <b>جزء أساسي</b> من تصميم وتشغيل الـ OS: الـ I/O devices مختلفة جدًا عن بعض، فيه طرق كتير للتحكم فيها، الـ performance لازم يتدار، وأنواع أجهزة جديدة بتظهر كتير.",
      "الـ Ports والـ buses والـ device controllers هي اللي بتوصّل الأجهزة. الـ <b>Device drivers</b> بتخبي تفاصيل الجهاز وبتدّي interface موحد للـ I/O subsystem عشان يوصل للأجهزة.",
      "أنواع الأجهزة: الـ <b>storage</b> والـ <b>transmission</b> والـ <b>human-interface</b>.",
      "• الـ <b>Port</b> هو نقطة توصيل للجهاز.<br>• الـ <b>Bus</b> هو shared direct access، زي الـ <b>PCI</b> المنتشر في الـ PCs والـ servers، والـ PCI Express (PCIe)، والـ <b>expansion bus</b> اللي بيوصّل أجهزة بطيئة نسبيًا زي الـ keyboard والـ serial/parallel ports.<br>• الـ <b>Controller (host adapter)</b> هو إلكترونيات بتشغّل الـ port أو الـ bus أو الجهاز؛ ساعات بيبقى integrated، وساعات circuit board منفصلة؛ وفيه processor و microcode و private memory و bus controller وغيرهم.",
      "رسمة الـ PC bus النموذجية:<span class=\"ltr\">processor + cache → bridge/memory controller → memory</span>والـ PCI bus بيوصّل الـ graphics controller (للـ monitor)، والـ SCSI controller (للـ disks)، والـ IDE disk controller (للـ disks)، والـ expansion bus interface (للـ keyboard والـ parallel والـ serial ports)."
     ],
     "figH": {
      "os-io-pc-bus": "شكل الـ bus في الـ PC: الـ ports والـ buses والـ controllers بيوصّلوا الـ devices إزاي"
     }
    },
    {
     "h": "الـ Device registers، الـ addressing والـ polling",
     "pts": [
      "الـ I/O instructions بتتحكم في الأجهزة. الأجهزة ليها registers الـ driver بيحط فيها commands وaddresses وdata، وهي الـ registers دي: الـ <b>data-in</b> والـ <b>data-out</b> والـ <b>status</b> والـ <b>control</b> (غالبًا 1–4 bytes، أو FIFO buffer).",
      "الأجهزة ليها addresses، بتستخدمها <b>direct I/O instructions</b> أو <b>memory-mapped I/O</b> (الـ data والـ command registers بتاعة الجهاز بتتعمل mapping في الـ address space بتاع الـ processor، خصوصًا للـ address spaces الكبيرة زي الـ graphics).",
      "الـ PC I/O port ranges (جزء منها): 000–00F DMA controller؛ 020–021 interrupt controller؛ 040–043 timer؛ 200–20F game controller؛ 2F8–2FF serial port (secondary)؛ 320–32F hard-disk controller؛ 378–37F parallel port؛ 3D0–3DF graphics controller؛ 3F0–3F7 diskette-drive controller؛ 3F8–3FF serial port (primary).",
      "<b>الـ Polling (handshaking) لكل byte</b> بيمشي كده:<br>(1) الـ host بيقرا الـ <b>busy bit</b> من الـ status register لحد ما يبقى 0.<br>(2) الـ host بيظبط الـ read أو الـ write bit، ولو write بينسخ الداتا في الـ data-out.<br>(3) الـ host بيظبط <b>command-ready</b>.<br>(4) الـ controller بيظبط الـ busy وينفذ النقل.<br>(5) الـ controller بيمسح الـ busy والـ error والـ command-ready لما النقل يخلص.",
      "الخطوة 1 دي <b>busy-wait cycle</b>: معقولة لو الجهاز سريع، بس <b>مش efficient لو الجهاز بطيء</b> (الـ CPU كان ممكن يحوّل لـ tasks تانية)."
     ],
     "figH": {
      "os-io-port-map": "الـ addresses بتاعة الـ PC I/O ports: اعرف الـ address ده تبع أنهي device",
      "os-io-polling": "الـ polling لـ byte واحد: الـ 5 خطوات بتوع الـ handshaking مع device سريع و device بطيء"
     }
    },
    {
     "h": "الـ Interrupts",
     "pts": [
      "ساعات بيبقى أكفأ إن الـ controller <b>يبلّغ الـ CPU</b> لما الجهاز يبقى جاهز. الـ Interrupts بتخلي الجهاز يبلّغ الـ CPU بأي event.",
      "الـ CPU فيه سلك، اسمه <b>Interrupt Request Line (IRL)</b>، بيحس بيه <b>بعد تنفيذ كل instruction</b>. لما controller يبعت signal عليه، الـ CPU بيعمل <b>state save</b> وينط للـ <b>interrupt-handler routine</b> عند address ثابت.",
      "الـ interrupt handler بيحدد السبب، يعمل الـ processing المطلوب، يعمل <b>state restore</b>، وينفذ return-from-interrupt instruction عشان يرجّع الـ CPU لحالته اللي كان فيها.",
      "الـ <b>Interrupt-driven I/O cycle</b>: 1 الـ device driver بيبدأ الـ I/O → 2 الـ I/O controller بيبدأ الـ I/O → 3 الـ input جاهز، الـ output خلص أو حصل error: الـ controller بيطلّع interrupt signal → 4 الـ CPU، وهو بيتشيك بين الـ instructions، بيستلم الـ interrupt وينقل التحكم للـ handler → 5 الـ handler بيعالج الداتا ويرجع من الـ interrupt → 6 الـ CPU بيكمّل الـ task اللي اتقاطعت → 7 (بيلف تاني والـ CPU شغال).",
      "<b>الـ Intel Pentium event-vector table</b>: 0 divide error، 1 debug exception، 2 null interrupt، 3 breakpoint، 4 INTO-detected overflow، 5 bound range exception، 6 invalid opcode، 7 device not available، 8 double fault، 9 coprocessor segment overrun، 10 invalid task state segment، 11 segment not present، 12 stack fault، 13 general protection، 14 <b>page fault</b>، 15 reserved، 16 floating-point error، 17 alignment check، 18 machine check، 19–31 reserved، <b>32–255 maskable interrupts</b>."
     ],
     "figH": {
      "os-io-irq-cycle": "الـ interrupt-driven I/O cycle خطوة بخطوة",
      "os-io-vectors": "الـ Intel Pentium event-vector table: دوّر على رقم vector"
     }
    },
    {
     "h": "الـ Direct Memory Access (DMA)",
     "pts": [
      "الـ DMA بيتجنب الـ <b>programmed I/O</b> (byte واحد في المرة) في نقل الداتا الكبيرة. محتاج <b>DMA controller</b> و<b>بيعدّي على الـ CPU (bypass)</b> عشان ينقل الداتا مباشرة بين الـ I/O device والـ memory.",
      "الـ OS بيكتب <b>DMA command block</b> في الـ memory:<br>(1) الـ source والـ destination addresses.<br>(2) الـ read أو write mode.<br>(3) عدد الـ bytes.<br>(4) بيكتب مكان الـ command block للـ DMA controller.<br>(5) الـ <b>bus mastering</b>: الـ DMA controller بياخد الـ bus من الـ CPU (<b>cycle stealing</b>، بس برضه أكفأ بكتير).<br>(6) لما يخلص، بيعمل <b>interrupt</b> عشان يقول إنه خلص.",
      "<b>مميزات الـ DMA</b>: الـ CPU بيفضى من النقل byte byte ويقدر يعمل شغل تاني؛ <b>interrupt واحد بس لكل block</b> بدل لكل byte؛ الأجهزة السريعة بتنقل بسرعة قريبة من سرعة الـ memory؛ و interrupts وcontext switches أقل بتحسّن الـ performance عمومًا."
     ],
     "figH": {
      "os-io-dma-six": "الـ DMA transfer في 6 خطوات: الـ C بتقل لحد 0، وبعدين interrupt واحد"
     }
    },
    {
     "h": "الـ Application I/O interface؛ الـ block والـ character devices",
     "pts": [
      "الـ I/O system calls بتجمّع تصرفات الأجهزة في classes عامة. <b>الـ device-driver layer بيخبي الفروق بين الـ I/O controllers عن الـ kernel</b>؛ والأجهزة الجديدة اللي بتستخدم protocols متنفذة أصلًا مش محتاجة شغل زيادة. وكل OS ليه الـ I/O subsystem structures والـ driver frameworks بتوعه.",
      "هيكل الـ kernel I/O بيمشي من فوق لتحت:<span class=\"ltr\">kernel → kernel I/O subsystem → device drivers → device controllers → devices</span>والـ device drivers فيها drivers للـ SCSI والـ keyboard والـ mouse والـ PCI bus والـ floppy والـ ATAPI.",
      "الأجهزة بتختلف في أبعاد كتير: <b>character-stream أو block</b>؛ <b>sequential أو random-access</b>؛ <b>synchronous أو asynchronous</b>؛ <b>sharable أو dedicated</b>؛ <b>سرعة التشغيل</b>؛ <b>الـ read-write أو الـ read-only أو الـ write-only</b>.",
      "الـ <b>Block devices</b> زي الـ disk drives: الـ commands هي read و write و seek؛ والوصول بيبقى raw I/O أو direct I/O أو file-system access؛ والـ memory-mapped file access ممكن (الـ file بيتعمله mapping على الـ virtual memory والـ clusters بتيجي عن طريق الـ demand paging)؛ DMA.",
      "الـ <b>Character devices</b> زي الـ keyboards والـ mice والـ serial ports: الـ commands هي <code>get()</code>، <code>put()</code>؛ وفيه libraries فوقيهم بتسمح بالـ line editing."
     ],
     "figH": {
      "os-io-kernel": "الـ Kernel I/O structure: من الـ kernel لحد الـ device",
      "os-io-block-char": "الـ block devices والـ character devices: اختار device وشوف نوعه والـ commands بتاعته"
     }
    },
    {
     "h": "الـ Performance",
     "pts": [
      "الـ I/O عامل كبير في performance السيستم: بيطلب من الـ CPU ينفذ كود الـ device-driver، وبيعمل <b>context switches بسبب الـ interrupts</b>، وبيعمل <b>نسخ للداتا (data copying)</b>.",
      "<b>الـ overheads بتاعة خدمة الـ interrupt</b>: لما interrupt يحصل، الـ process الشغالة بتتقاطع و<b>الـ state بتاعتها بتتحفظ في الـ PCB بتاعها</b>؛ وبعدين الـ interrupt service routine بتشتغل عشان تتعامل مع الـ interrupt؛ ولما تخلص، <b>الـ state بتاعة الـ process بترجع</b> وبتكمّل. فالـ overheads فيها تكلفة <b>حفظ واسترجاع الـ process state</b> (وكمان تنفيذ الـ ISR والـ context switches اللي فيها).",
      "<b>إزاي نحسّن الـ performance</b>: قلل عدد الـ context switches؛ قلل نسخ الداتا؛ قلل الـ interrupts باستخدام transfers كبيرة وsmart controllers وpolling؛ استخدم DMA؛ استخدم hardware devices أذكى؛ ووازن بين performance الـ CPU والـ memory والـ bus والـ I/O عشان أعلى throughput."
     ],
     "figH": {
      "os-io-isr-cost": "الـ overheads بتاعة خدمة الـ interrupt، وليه الـ interrupts الأقل أحسن"
     }
    }
   ],
   "cards": [
    "الـ port هو نقطة توصيل، والـ bus هو shared direct access (زي الـ PCI والـ PCIe والـ expansion bus)، والـ controller هو إلكترونيات بتشغّل port أو bus أو جهاز.",
    "الـ data-in والـ data-out والـ status والـ control.",
    "الـ Device registers متعملها mapping في الـ address space بتاع الـ processor.",
    "الـ host بيفضل يقرا الـ busy bit لحد ما يبقى 0؛ كويس للأجهزة السريعة، وتضييع للبطيئة.",
    "سلك في الـ CPU بيتحس بعد كل instruction؛ الـ controller بيبعت عليه signal عشان يطلب خدمة.",
    "بيلاقي السبب، يعالجه، يرجّع الـ state، ويرجع من الـ interrupt.",
    "Page fault.",
    "32–255.",
    "الـ Controller بينقل الداتا مباشرة بين الجهاز والـ memory، من غير الـ CPU.",
    "الـ DMA controller بياخد الـ memory bus من الـ CPU وقت النقل.",
    "الـ Source/destination addresses، الـ read/write mode، عدد الـ bytes.",
    "الـ block devices زي الـ disks (بـ read و write و seek)، والـ character devices زي الـ keyboards والـ mice (بـ get و put).",
    "حفظ واسترجاع الـ process state، وكمان تشغيل الـ ISR.",
    "Context switches أقل، نسخ داتا أقل، interrupts أقل، DMA، أجهزة أذكى، components متوازنة."
   ],
   "qa": [
    "الـ DMA بينقل blocks كبيرة مباشرة بين الجهاز والـ memory من غير الـ CPU، فبيتجنب الـ programmed I/O اللي بيبقى byte واحد في المرة. الـ CPU بيبقى فاضي يعمل شغل تاني وقت النقل. بيطلع interrupt واحد بس لكل block بدل لكل byte، وده بيقلل overhead الـ interrupts والـ context switches. الأجهزة السريعة تقدر تنقل بسرعة قريبة من سرعة الـ memory. ومع إنه بيسرق bus cycles، برضه أكفأ بكتير.",
    "1) الـ device driver بيتقاله ينقل داتا الـ disk لـ buffer عند address X. 2) الـ driver بيقول للـ disk controller ينقل C bytes من الـ disk للـ buffer عند X. 3) الـ disk controller بيبدأ الـ DMA transfer. 4) الـ disk controller بيبعت كل byte للـ DMA controller. 5) الـ DMA controller بينقل الـ bytes للـ buffer X، وبيزوّد الـ memory address ويقلل C لحد ما C = 0. 6) لما C = 0، الـ DMA بيعمل interrupt للـ CPU عشان يقول إنه خلص.",
    "لما interrupt يحصل، الـ process الشغالة بتتقاطع والـ state بتاعتها بتتحفظ في الـ PCB بتاعها. وبعدين الـ interrupt service routine بتشتغل عشان تتعامل مع الـ interrupt. لما التعامل يخلص، الـ process state بترجع والـ process بتكمّل. فالـ overheads هي حفظ واسترجاع الـ process state (context switches)، وتنفيذ الـ handler، وأي نسخ داتا مرتبط بيه.",
    "قلل عدد الـ context switches؛ قلل نسخ الداتا؛ قلل الـ interrupts باستخدام transfers كبيرة وsmart controllers وpolling؛ استخدم DMA؛ استخدم hardware devices أذكى؛ ووازن بين performance الـ CPU والـ memory والـ bus والـ I/O عشان أعلى throughput.",
    "الـ CPU (الـ device driver) بيبدأ الـ I/O. الـ I/O controller بيبدأ العملية. لما الـ input يبقى جاهز، أو الـ output يخلص أو يحصل error، الـ controller بيطلّع interrupt signal. الـ CPU بيتشيك على الـ interrupts بين الـ instructions، بيستلمه وينقل التحكم للـ interrupt handler. الـ handler بيعالج الداتا ويرجع من الـ interrupt. والـ CPU بيكمّل الـ task اللي اتقاطعت."
   ],
   "quiz": [
    [
     "نقل الـ data byte بـ byte عن طريق الـ CPU ده الـ programmed I/O؛ والمحاضرة بتقول إن الـ DMA بيتستخدم بالظبط عشان نتجنبه في نقل الـ data الكبيرة <bdi dir=\"ltr\">(Topic 8, Direct Memory Access)</bdi>.",
     "صح. الـ DMA بيتستخدم عشان نتجنب الـ programmed I/O في نقل الـ data الكبيرة: الـ DMA controller بيعدّي الـ CPU وينقل الـ data مباشرة بين الـ I/O device والـ memory <bdi dir=\"ltr\">(Topic 8, Direct Memory Access)</bdi>.",
     "ترجمة الـ logical لـ physical addresses ده شغل الـ MMU <bdi dir=\"ltr\">(Topic 4)</bdi>؛ الـ DMA بينقل blocks من الـ I/O data بين الـ device والـ memory.",
     "اختيار أنهي process يشتغل ده شغل الـ CPU scheduler <bdi dir=\"ltr\">(Topic 3)</bdi>؛ الـ DMA ده hardware لنقل الـ I/O data من غير الـ CPU <bdi dir=\"ltr\">(Topic 8)</bdi>."
    ],
    [
     "إن الـ disk controller يبدأ الـ DMA transfer دي step 3، قرب البداية؛ الـ C = 0 بنوصله في الآخر بس، في step 6 <bdi dir=\"ltr\">(Topic 8, Six Steps Process)</bdi>.",
     "صح. في step 5 الـ DMA controller بينقل الـ bytes لـ buffer X، وبيزوّد الـ address ويقلّل الـ C؛ ولما C = 0 (step 6) بيعمل interrupt للـ CPU عشان يقوله إنه خلص <bdi dir=\"ltr\">(Topic 8, Six Steps Process)</bdi>.",
     "إن الـ device driver يتقاله ينقل الـ disk data لـ buffer X دي step 1، بداية العملية، مش اللي بيحصل عند C = 0 <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "الـ bus مش بيتسلّم للـ disk؛ الـ DMA controller هو اللي بياخد الـ bus (bus mastering) أثناء الـ transfer، وعند C = 0 بيعمل interrupt للـ CPU <bdi dir=\"ltr\">(Topic 8)</bdi>."
    ],
    [
     "مرة كل ثانية كانت هتخلّي الاستجابة للـ interrupts بطيئة جدًا؛ الـ CPU بيشيّك على الـ Interrupt Request Line بعد تنفيذ كل instruction <bdi dir=\"ltr\">(Topic 8, Interrupts)</bdi>.",
     "صح. الـ CPU hardware فيه سلك اسمه الـ Interrupt Request Line، بيشيّك عليه بعد تنفيذ كل instruction؛ لو فيه controller عمله assert، الـ CPU بيحفظ الـ state ويروح للـ handler <bdi dir=\"ltr\">(Topic 8, Interrupts)</bdi>.",
     "لو بيشيّك بس وهو idle، الـ CPU وهو مشغول كان هيتجاهل الـ devices؛ الـ line بيتشيّك عليها بعد كل instruction، مشغول أو لأ <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "الـ IRL بيتشيّك عليها بعد كل instruction، عشان الـ interrupts اللي جاية من أي controller؛ الـ DMA بيستخدم interrupt بس عشان يعلن إنه خلص <bdi dir=\"ltr\">(Topic 8)</bdi>."
    ],
    [
     "العكس: بيضيّع وقت الـ CPU مع الأجهزة البطيئة.",
     "صح. الـ host بيقرا الـ busy bit تاني وتالت لحد ما يبقى 0؛ والمحاضرة بتقول إن الـ busy-wait cycle ده معقول لو الـ device سريع، بس inefficient لو الـ device بطيء <bdi dir=\"ltr\">(Topic 8, I/O Hardware)</bdi>.",
     "في الـ busy waiting الـ CPU نفسه بيعمل polling على الـ status register؛ الـ DMA فكرته العكس، بينقل الـ data من غير الـ CPU ويعمل interrupt مرة واحدة في الآخر <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "الـ Busy waiting (الـ polling على الـ busy bit) ده handshake بين الـ host والـ controller لأي device، مش مقصور على الـ block devices <bdi dir=\"ltr\">(Topic 8)</bdi>."
    ],
    [
     "الـ Disk drives هي مثال المحاضرة على الـ block devices، والـ commands بتاعتها read وwrite وseek <bdi dir=\"ltr\">(Topic 8, Block and Character Devices)</bdi>.",
     "صح. المحاضرة بتعدّ الـ keyboards والـ mice والـ serial ports كـ character devices؛ الـ commands بتاعتهم get() وput()، وفوقيهم libraries للـ line editing <bdi dir=\"ltr\">(Topic 8, Block and Character Devices)</bdi>.",
     "الـ SSD ده storage drive بيتقري بالـ blocks، زي الـ disk drive، فهو block device (read وwrite وseek)، مش character device <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "الـ Seek ده command بتاع الـ block devices (read وwrite وseek)؛ الـ character devices زي الـ keyboards بتستخدم get() وput() بس <bdi dir=\"ltr\">(Topic 8)</bdi>."
    ],
    [
     "الـ Polling هو إن الـ CPU يقرا الـ busy bit بتاع الـ device تاني وتالت (busy-wait)؛ مش إن الـ DMA controller ياخد الـ bus <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "صح. في خطوات الـ DMA، الـ bus mastering بيخلّي الـ DMA controller ياخد الـ memory bus من الـ CPU؛ وده الـ cycle stealing، ومع ذلك لسه أكفأ بكتير من الـ programmed I/O <bdi dir=\"ltr\">(Topic 8, DMA)</bdi>.",
     "الـ Spooling بيعمل overlap بين الـ output بتاع job والـ input بتاع jobs تانية <bdi dir=\"ltr\">(Topic 1, I/O subsystem)</bdi>؛ ملهوش علاقة بأخد الـ bus.",
     "الـ context switch بيحفظ الـ state بتاع process ويحمّل state process تاني <bdi dir=\"ltr\">(Topic 2)</bdi>؛ أما إن الـ DMA controller ياخد الـ bus فده الـ cycle stealing <bdi dir=\"ltr\">(Topic 8)</bdi>."
    ],
    [
     "«Reduce number of context switches» دي أول نقطة في لستة المحاضرة لتحسين الـ I/O performance <bdi dir=\"ltr\">(Topic 8, Performance)</bdi>.",
     "«Reduce data copying» موجودة في لستة تحسين الـ performance؛ الـ copying واحد من تكاليف الـ I/O المذكورة <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "«Use DMA» موجودة في اللستة: بيريّح الـ CPU من نقل الـ data byte بـ byte <bdi dir=\"ltr\">(Topic 8, How to Improve the Performance)</bdi>.",
     "الاختيار الصح. كل interrupt ليه تمن: save وrestore للـ state، فالمحاضرة بتقول قلّل الـ interrupts (بالـ large transfers والـ smart controllers والـ polling)، مش زوّدها <bdi dir=\"ltr\">(Topic 8, Performance)</bdi>."
    ],
    [
     "الـ Divide error هو vector 0، أول entry في الـ Pentium event-vector table؛ أما vector 14 فهو الـ page fault <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "صح. في الـ Intel Pentium event-vector table، الـ entries من 0–31 دي events محددة؛ و vector 14 هو الـ page fault <bdi dir=\"ltr\">(Topic 8, Intel Pentium Processor Event-Vector Table)</bdi>.",
     "الـ General protection هو vector 13، الـ entry اللي قبل الـ page fault (14) على طول <bdi dir=\"ltr\">(Topic 8, Event-Vector Table)</bdi>.",
     "الـ Maskable interrupts بتستخدم الرينج 32–255، مش vector واحد؛ و vector 14 هو الـ page fault <bdi dir=\"ltr\">(Topic 8)</bdi>."
    ],
    [
     "صح. لما يحصل interrupt، الـ state بتاع الـ process اللي شغال بيتحفظ في الـ PCB بتاعه، والـ service routine تشتغل، وبعدين الـ state يرجع؛ فالـ overhead هو تكلفة الـ saving والـ restoring للـ process state <bdi dir=\"ltr\">(Topic 8, Performance)</bdi>.",
     "خدمة الـ interrupt مش بتعمل page table؛ الـ page tables بتتعمل للـ processes في الـ memory management <bdi dir=\"ltr\">(Topic 4)</bdi>. التكلفة هي saving/restoring للـ state.",
     "عمل format للـ disk مش جزء من خدمة الـ interrupt؛ الـ overhead في المحاضرة هو saving وrestoring للـ state بتاع الـ process اللي اتقاطع <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "الـ Compaction هو تحريك محتوى الـ memory عشان نحل الـ external fragmentation <bdi dir=\"ltr\">(Topic 4)</bdi>، مش جزء من الـ interrupt handling <bdi dir=\"ltr\">(Topic 8)</bdi>."
    ],
    [
     "دي بتستخدم I/O instructions خاصة وport addresses.",
     "صح. في الـ memory-mapped I/O، الـ data والـ command registers بتوع الـ device بيتعملّهم map في الـ address space بتاع الـ processor، خصوصًا للـ address spaces الكبيرة زي الـ graphics <bdi dir=\"ltr\">(Topic 8, I/O Hardware)</bdi>.",
     "الـ Virtual memory بتعمل map للـ logical pages بتاعة الـ process على frames <bdi dir=\"ltr\">(Topic 5)</bdi>؛ أما map الـ device registers في الـ address space فده الـ memory-mapped I/O <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "الـ DMA بينقل data بين الـ device والـ memory من غير الـ CPU؛ مش بيعمل map للـ device registers في الـ address space <bdi dir=\"ltr\">(Topic 8)</bdi>."
    ]
   ],
   "extra": [
    [
     "الـ DMA controller بيحدّث القيمتين بعد كل byte بينقله.",
     "القيم متبدلة: 500 byte خلصوا، يبقى فاضل 1,548 والـ address اتقدم 500.",
     "صح. الـ DMA controller بيزوّد الـ memory address ويقلل C مع كل byte، لحد ما C = 0.",
     "الـ DMA controller بيزوّد الـ memory address وهو بيقلّل الـ C، فبعد 500 byte الـ address اللي بعده هو X + 500، مش X − 500 <bdi dir=\"ltr\">(Topic 8, Six Steps)</bdi>."
    ],
    [
     "الـ Source والـ destination addresses هما item 1 في الـ DMA command block اللي الـ OS بيكتبه في الـ memory <bdi dir=\"ltr\">(Topic 8, Direct Memory Access)</bdi>.",
     "صح. الـ command block فيه الـ source والـ destination addresses، والـ read/write mode وعدد الـ bytes؛ الـ PCB مش فيه.",
     "الـ Read or write mode ده item 2 في الـ DMA command block <bdi dir=\"ltr\">(Topic 8, Direct Memory Access)</bdi>.",
     "الـ count of bytes ده item 3 في الـ DMA command block؛ والـ controller بيقلّله وهو بينقل <bdi dir=\"ltr\">(Topic 8)</bdi>."
    ],
    [
     "الـ diskette-drive controller بيستخدم الـ ports 3F0–3F7، اللي بتخلص قبل 3FA على طول؛ الـ 3FA جوه رينج الـ primary serial port 3F8–3FF <bdi dir=\"ltr\">(Topic 8, I/O Port Locations)</bdi>.",
     "الـ secondary serial port بيستخدم 2F8–2FF؛ الـ 3FA جوه 3F8–3FF، يعني الـ primary serial port <bdi dir=\"ltr\">(Topic 8, I/O Port Locations)</bdi>.",
     "الـ graphics controller بيستخدم 3D0–3DF، تحت 3FA؛ الـ 3FA واقعة في 3F8–3FF، يعني الـ primary serial port <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "صح. الـ primary serial port بيستخدم 3F8–3FF، و3FA جوة الـ range ده."
    ],
    [
     "صح. الـ vectors من 0 لـ 31 events معينة (زي الـ divide error والـ page fault…) أو reserved؛ ومن 32–255 maskable interrupts.",
     "الـ page fault هو vector واحد بس رقم 14 من الـ specific events 0–31، مش الرينج 32–255 <bdi dir=\"ltr\">(Topic 8, Event-Vector Table)</bdi>.",
     "الـ reserved entries هي 15 و19–31، جوه الـ 0–31؛ أما الـ vectors من 32–255 فبتتستخدم للـ maskable interrupts <bdi dir=\"ltr\">(Topic 8)</bdi>.",
     "الـ Divide error هو vector واحد رقم 0؛ والـ vectors من 32–255 فيها الـ maskable interrupts <bdi dir=\"ltr\">(Topic 8, Event-Vector Table)</bdi>."
    ],
    [
     "دي step 1، بتحصل قبل ما الـ host يظبط الـ command-ready.",
     "الـ Polling مابيستخدمش interrupts؛ الـ host بيفضل يتشيك على الـ status register.",
     "صح. في الـ step رقم 4 الـ controller بيشوف الـ command-ready، يظبط الـ busy ويعمل النقل؛ وفي step 5 بيمسح الـ busy والـ error والـ command-ready.",
     "في الـ write ده بيتعمل في step 2، قبل ما الـ command-ready يتظبط."
    ],
    [
     "الـ Data-in فيه الداتا اللي الـ host بيقراها من الجهاز.",
     "الـ Data-out فيه الداتا اللي الـ host بيكتبها للجهاز.",
     "الـ control register للـ commands اللي جاية من الـ host؛ والـ busy bit اللي الـ host بيعمله polling بيتبلّغ في مكان تاني.",
     "صح. الـ busy (والـ error) bits موجودين في الـ status register."
    ],
    [
     "صح. الـ Block devices كمان بتسمح بالـ raw I/O والـ memory-mapped file access والـ DMA؛ والـ character devices ممكن يتحط فوقيها line editing.",
     "بالعكس: الـ seek ليها معنى بس مع الـ random-access block devices زي الـ disks.",
     "الـ character devices بس هي اللي بتستخدم get() وput()؛ الـ disk drives دي block devices والـ commands بتاعتها read وwrite وseek <bdi dir=\"ltr\">(Topic 8, Block and Character Devices)</bdi>.",
     "بالعكس: الـ keyboards والـ mice والـ serial ports هي character devices؛ والـ disk drives هي block devices."
    ],
    [
     "الـ PCI بيوصّل الـ graphics والـ SCSI والـ IDE controllers؛ والأجهزة البطيئة متعلقة على الـ expansion bus اللي وراه.",
     "ده بيربط الـ processor بالـ memory، مش الـ keyboard أو الـ ports.",
     "صح. الـ expansion bus interface اللي على الـ PCI bus بيوصّل الـ keyboard والـ parallel والـ serial ports.",
     "الـ SCSI bus بيوصّل الـ SCSI controller بالـ disks؛ الـ devices البطيئة زي الـ keyboard والـ serial والـ parallel ports قاعدة على الـ expansion bus <bdi dir=\"ltr\">(Topic 8, Typical PC Bus Structure)</bdi>."
    ],
    [
     "صح. الـ handler بيحدد السبب، يعمل الـ processing المطلوب، يرجّع الـ state ويرجع من الـ interrupt.",
     "ده بالظبط اللي المحاضرة بتقوله عن إزاي الـ interrupt handler بيخلص."
    ],
    [
     "الـ busy-waiting بيضيّع الـ CPU مع الأجهزة البطيئة. وعشان كده إن الـ controller يبلّغ الـ CPU (interrupt) ساعات بيبقى أكفأ.",
     "صح. الـ Polling معقول للأجهزة السريعة بس مش efficient للبطيئة؛ والـ interrupts بتخلي الجهاز هو اللي يبلّغ الـ CPU بدل كده."
    ]
   ]
  }
 },
 "exams": [
  {
   "sections": [
    {
     "items": [
      {
       "why": "الـ Need عليها 2 marks: احسبها لكل row. وبعدين وضّح الـ Work vector في كل خطوة، لأن الإثبات هو اللي عليه الدرجات. ده بالظبط مثال الـ deadlock-detection في المحاضرة (P2 بتطلب C كمان واحد). لو النسخة بتاعتك فيها Max P2 بيساوي 3 0 3 (زي 2023/24)، يبقى Need P2 بيساوي 0 0 0 والسيستم safe، والـ Work بيمشي كده:<span class=\"ltr\">P0 → (0,1,0), P2 → (3,1,3), P3 → (5,2,4), P4 → (5,2,6), P1 → (7,2,6)</span>وده بيدّي الـ sequence <bdi dir=\"ltr\">&lt;P0, P2, P3, P4, P1&gt;</bdi>.",
       "ans": "<span class=\"ltr\"><b>Need = Max − Allocation</b></span><table><tr><th>Process</th><th>A</th><th>B</th><th>C</th></tr><tr><td>P0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>P1</td><td>2</td><td>0</td><td>2</td></tr><tr><td>P2</td><td>0</td><td>0</td><td>1</td></tr><tr><td>P3</td><td>1</td><td>0</td><td>0</td></tr><tr><td>P4</td><td>0</td><td>0</td><td>2</td></tr></table>تشيك: مجموع columns الـ Allocation بيساوي (7, 2, 6)، وده الـ capacity، فالـ Available بيساوي (0, 0, 0) ✓.<br><br><b>الـ Safety algorithm</b>، والـ Work بيبدأ (0,0,0):<span class=\"ltr\">P0: Need (0,0,0) ≤ (0,0,0) ✓ → Work = (0,0,0) + (0,1,0) = <b>(0,1,0)</b>, Finish[P0] = true</span><span class=\"ltr\">P1: (2,0,2) ≤ (0,1,0)? ✗ (A, C)</span><span class=\"ltr\">P2: (0,0,1) ≤ (0,1,0)? ✗ (C)</span><span class=\"ltr\">P3: (1,0,0) ≤ (0,1,0)? ✗ (A)</span><span class=\"ltr\">P4: (0,0,2) ≤ (0,1,0)? ✗ (C)</span>مفيش أي process تانية تقدر تكمّل، فـ Finish[P1…P4] بتفضل false.<br><br><b>السيستم مش في safe state (unsafe).</b> الـ P0 بس هي اللي تقدر تخلص، والـ P1 والـ P2 والـ P3 والـ P4 ممكن يدخلوا في deadlock."
      },
      {
       "why": "Topic 2، \"Schedulers\". أهم الفروق: كل واحد بيختار إيه، بيشتغل كل قد إيه، والـ degree of multiprogramming.",
       "ans": "<table><tr><th></th><th>Short-term (CPU scheduler)</th><th>Long-term (job scheduler)</th></tr><tr><td>الشغلانة</td><td>بيختار أنهي process في الـ ready queue تتنفذ بعد كده ويدّيها الـ CPU</td><td>بيختار أنهي processes تدخل الـ ready queue (الـ memory)</td></tr><tr><td>بيشتغل كل قد إيه</td><td>بيتنادى كتير جدًا (milliseconds)، فلازم يبقى سريع</td><td>بيتنادى قليل (ثواني، دقايق)، فممكن يبقى بطيء</td></tr><tr><td>بيتحكم في</td><td>أنهي process تشتغل</td><td>الـ degree of multiprogramming</td></tr><tr><td>ملحوظة</td><td>ساعات بيبقى الـ scheduler الوحيد في السيستم</td><td>لازم يختار خلطة كويسة من الـ I/O-bound والـ CPU-bound processes</td></tr></table>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "ده مثال المحاضرة بالظبط (Topic 4، slides 18–20). دايمًا حدّث أحجام الـ holes بعد كل placement.",
       "ans": "<b>First-fit</b> (أول hole كبير كفاية):<br>الـ 212K بيروح للـ partition اللي 500K (فاضل 288K)<br>الـ 417K بيروح للـ partition اللي 600K (فاضل 183K)<br>الـ 112K بيروح للـ hole اللي 288K (الباقي من الـ 500K) (فاضل 176K)<br>الـ 426K <b>لازم يستنى</b> (الـ holes هي 100، 176، 200، 300، 183)<br><br><b>Best-fit</b> (أصغر hole كبير كفاية):<br>الـ 212K بيروح للـ 300K (فاضل 88)<br>الـ 417K بيروح للـ 500K (فاضل 83)<br>الـ 112K بيروح للـ 200K (فاضل 88)<br>الـ 426K بيروح للـ 600K (فاضل 174)<br><br><b>Worst-fit</b> (أكبر hole):<br>الـ 212K بيروح للـ 600K (فاضل 388)<br>الـ 417K بيروح للـ 500K (فاضل 83)<br>الـ 112K بيروح للـ hole اللي 388K (فاضل 276)<br>الـ 426K <b>لازم يستنى</b> (أكبر hole هو 300K)<br><br>الـ <b>Best-fit</b> هو اللي بيستخدم الـ memory بأكفأ طريقة في المثال ده: هو الوحيد اللي بيحط الأربع processes."
      },
      {
       "why": "Topic 7، الـ allocation methods. اكتب الفكرة والمميزات والعيوب لكل واحدة.",
       "ans": "<table><tr><th></th><th>Linked allocation</th><th>Indexed allocation</th></tr><tr><td>الفكرة</td><td>كل file عبارة عن linked list من disk blocks؛ كل block فيه pointer للي بعده؛ والـ file بيخلص عند null pointer</td><td>كل file ليه index block خاص بيه فيه pointers لكل الـ data blocks بتاعته</td></tr><tr><td>الـ Directory فيه</td><td>الـ start (والـ end) block</td><td>عنوان الـ index block</td></tr><tr><td>الـ Access</td><td>Sequential بس؛ الوصول لـ block محتاج I/Os وseeks كتير</td><td>Random (direct) access عن طريق الـ index</td></tr><tr><td>الـ Fragmentation</td><td>مفيش external fragmentation، مفيش compaction</td><td>مفيش external fragmentation</td></tr><tr><td>الحجم وقت الإنشاء</td><td>مش مطلوب</td><td>مش مطلوب</td></tr><tr><td>الـ Overhead / المشاكل</td><td>مساحة للـ pointers في كل block؛ الـ reliability (pointer يضيع أو يبوظ)</td><td>الـ overhead بتاع الـ index block؛ الـ files الكبيرة محتاجة linked index blocks</td></tr><tr><td>Variant</td><td>الـ FAT بيحط الـ links في table</td><td>Linked scheme من الـ index blocks للحجم اللي مش محدود</td></tr></table>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ string ده فيه 14 reference. أقصر من string المحاضرة اللي فيه 22 reference (15/9/12)، فماتنقلش إجابة المحاضرة. الـ FIFO بيستبدل أقدم page. الـ OPT بيستبدل الـ page اللي هتتستخدم أبعد حاجة في المستقبل: عند \"2\" الـ page 7 مش هتتستخدم تاني، عند \"3\" الـ page 1 هي الأبعد، عند \"4\" الـ page 0، وعند \"0\" الـ page 4 مش هتتستخدم تاني. الـ LRU بيستبدل الـ least recently used page. أول تلات references faults في كل الـ algorithms.",
       "ans": "<b>1) FIFO = 11 page faults</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td>0</td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td>1</td><td><b>0</b></td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td>F</td></tr></table><br><b>2) Optimal = 8 page faults</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td>0</td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td>F</td></tr></table><br><b>3) LRU = 10 page faults</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td><b>1</b></td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td>F</td></tr></table><br>(الرقم الـ bold معناه page لسه متحمّلة؛ والـ F معناها page fault؛ والخانة الفاضية معناها hit.)"
      },
      {
       "why": "Topic 8، رسمة slide 12. احفظ الست خطوات بالترتيب.",
       "ans": "(1) الـ Device driver بيتقاله ينقل داتا الـ disk لـ buffer عند address X.<br>(2) الـ Device driver بيقول للـ disk controller ينقل C bytes من الـ disk للـ buffer عند address X.<br>(3) الـ Disk controller بيبدأ الـ DMA transfer.<br>(4) الـ Disk controller بيبعت كل byte للـ DMA controller.<br>(5) الـ DMA controller بينقل الـ bytes للـ buffer X، وبيزوّد الـ memory address ويقلل C لحد ما C = 0.<br>(6) لما C = 0، الـ DMA بيعمل interrupt للـ CPU عشان يقول إن النقل خلص."
      }
     ]
    },
    {
     "items": [
      {
       "why": "كله بيوصل عند 0، فالـ WT = وقت البداية في الـ non-preemptive algorithms، والـ WT بيساوي completion − burst بشكل عام. \"(quantum = 3)\" ده للـ RR بس. ارسم كل chart بالأوقات بتاعته، واكتب الـ WT لكل process، وبعدين المتوسط.",
       "ans": "<b>باستخدام الـ bursts المتصححة:</b><span class=\"ltr\"><b>P1 = 3, P2 = 3, P3 = 2, P4 = 1</b></span><b>FCFS</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–3</td><td>3–6</td><td>6–8</td><td>8–9</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>3</td><td>3</td><td>3</td><td><b>0</b></td></tr><tr><td>P2</td><td>3</td><td>6</td><td>6</td><td><b>3</b></td></tr><tr><td>P3</td><td>2</td><td>8</td><td>8</td><td><b>6</b></td></tr><tr><td>P4</td><td>1</td><td>9</td><td>9</td><td><b>8</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>26/4 = 6.5</td><td><b>17/4 = 4.25</b></td></tr></table><b>RR (q = 3)</b>: كل burst ≤ 3، فكل process بتخلص في أول quantum ليها والـ chart هو نفس الـ FCFS بالظبط.<table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–3</td><td>3–6</td><td>6–8</td><td>8–9</td></tr></table> متوسط الـ WT = <b>4.25</b><br><br><b>SJF</b> (التعادل بين P1/P2 = 3 بيتحل بترتيب الوصول)<table><tr><th>P4</th><th>P3</th><th>P1</th><th>P2</th></tr><tr><td>0–1</td><td>1–3</td><td>3–6</td><td>6–9</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>3</td><td>6</td><td>6</td><td><b>3</b></td></tr><tr><td>P2</td><td>3</td><td>9</td><td>9</td><td><b>6</b></td></tr><tr><td>P3</td><td>2</td><td>3</td><td>3</td><td><b>1</b></td></tr><tr><td>P4</td><td>1</td><td>1</td><td>1</td><td><b>0</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>19/4 = 4.75</td><td><b>10/4 = 2.5</b></td></tr></table><br><b>باستخدام الـ bursts المطبوعة:</b><span class=\"ltr\"><b>P1 = 6, P2 = 3, P3 = 5, P4 = 4</b></span><b>FCFS</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–6</td><td>6–9</td><td>9–14</td><td>14–18</td></tr></table>الـ WT بتاعة كل process:<span class=\"ltr\">P1 0, P2 6, P3 9, P4 14</span>والمتوسط <b>29/4 = 7.25</b><br><b>RR (q = 3)</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P1</th><th>P3</th><th>P4</th></tr><tr><td>0–3</td><td>3–6</td><td>6–9</td><td>9–12</td><td>12–15</td><td>15–17</td><td>17–18</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>6</td><td>15</td><td>15</td><td><b>9</b></td></tr><tr><td>P2</td><td>3</td><td>6</td><td>6</td><td><b>3</b></td></tr><tr><td>P3</td><td>5</td><td>17</td><td>17</td><td><b>12</b></td></tr><tr><td>P4</td><td>4</td><td>18</td><td>18</td><td><b>14</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>56/4 = 14</td><td><b>38/4 = 9.5</b></td></tr></table><b>SJF</b><table><tr><th>P2</th><th>P4</th><th>P3</th><th>P1</th></tr><tr><td>0–3</td><td>3–7</td><td>7–12</td><td>12–18</td></tr></table>الـ WT بتاعة كل process:<span class=\"ltr\">P2 0, P4 3, P3 7, P1 12</span>والمتوسط <b>22/4 = 5.5</b><br><br>في النسختين <b>الـ SJF بيدّي أقل متوسط waiting time</b>."
      },
      {
       "why": "الـ Topic 1، الـ slides 3 و7 و8. اذكر \"resource allocator\" و\"control program\" الاتنين، والـ kernel كمان.",
       "ans": "الـ operating system هو برنامج بيقف <b>وسيط بين الـ user بتاع الكمبيوتر والـ hardware</b>. مفيش تعريف واحد متفق عليه، بس:<br>• <b>الـ OS هو resource allocator</b>: بيدير كل الـ resources وبيحكم بين الطلبات المتعارضة عشان الاستخدام يبقى efficient وعادل.<br>• <b>الـ OS هو control program</b>: بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط للكمبيوتر.<br>• \"كل حاجة الـ vendor بيبعتهالك لما تطلب operating system\" تقريب كويس (بس بيختلف جدًا).<br>• \"البرنامج الوحيد اللي شغال طول الوقت على الكمبيوتر\" هو الـ <b>kernel</b>. وأي حاجة تانية يا system program (جاي مع الـ OS) يا application program."
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ SRAM (تكنولوجيا الـ cache) هي الأسرع وvolatile. الـ DRAM volatile بس أبطأ. الـ EPROM والـ EEPROM non-volatile.",
       "ow": [
        null,
        "الـ DRAM دي volatile بس أبطأ من الـ SRAM، لأن الـ cells بتاعتها محتاجة refresh؛ بتستخدم للـ main memory، أما الـ SRAM فللـ caches (Topic 1).",
        "الـ EPROM دي read-only memory من النوع non-volatile (فيها الـ bootstrap firmware)، وأبطأ بكتير من الـ SRAM (Topic 1).",
        "الـ EEPROM دي non-volatile (بتحتفظ بالداتا من غير كهربا) وبطيئة في الكتابة، فغلط في الجزئين: لا هي الأسرع ولا هي volatile (Topic 1)."
       ]
      },
      {
       "why": "لو الـ parent خلص من غير ما يعمل wait()، الـ process بتبقى orphan (Topic 2).",
       "ow": [
        "الـ zombie ده العكس: الـ child هو اللي خلص والـ parent لسه عايش ومعملش wait() لسه (Topic 2).",
        null,
        "\"Main\" مش process state في المحاضرة؛ الـ child اللي الـ parent بتاعه خلص من غير ما يعمل wait() اسمه orphan (Topic 2).",
        "الـ renderer نوع من أنواع الـ processes في Chrome (بيعمل render لصفحات الويب، واحد لكل site)، مش اسم لـ child الـ parent بتاعه مات (Topic 2)."
       ]
      },
      {
       "why": "لما الـ CPU يقلب على process تانية، السيستم بيحفظ الـ state بتاعة القديمة في الـ PCB بتاعها ويحمّل الـ state المحفوظة بتاعة الجديدة؛ ده الـ context switch، والوقت بتاعه overhead صافي (Topic 2، Context Switch).",
       "ow": [
        "\"Save-and-restore\" بيوصف اللي بيحصل، بس مش المصطلح اللي المحاضرة بتستخدمه؛ العملية اسمها context switch (Topic 2).",
        "\"State switch\" مش مصطلح في المحاضرة؛ الـ process بتغيّر الـ state بتاعتها (زي الـ ready والـ running والـ waiting)، لكن حفظ وتحميل الـ CPU state ده context switch (Topic 2).",
        null,
        "في اختيار صح: المحاضرة بتعرّف بالظبط عملية احفظ القديم/حمّل الجديد دي إنها context switch (Topic 2)."
       ]
      },
      {
       "why": "الـ Starvation هي المشكلة؛ والـ aging (زيادة الـ priority مع الوقت) هو الحل.",
       "ow": [
        "الـ starvation هي المشكلة نفسها (الـ low-priority processes ممكن عمرها ما تتنفذ)، مش الحل بتاعها (Topic 3، Priority Scheduling).",
        "الـ ready queue بس بتشيل الـ processes اللي مستنية الـ CPU؛ إنك تدخلها مش هيمنع إن الـ low-priority process تتعدّى على طول (Topic 2).",
        "الـ wait queue فيها الـ processes اللي مستنية event زي الـ I/O؛ مبتعملش حاجة عشان ترفع الـ priority بتاعة process عندها starvation (Topic 2).",
        null
       ]
      },
      {
       "why": "الـ program counter فيه عنوان الـ instruction الجاية اللي هتتنفذ.",
       "ow": [
        null,
        "الـ heap فيه الـ memory اللي بتتحجز dynamically وقت الـ run time، مش عنوان الـ instruction الجاية (Topic 2، process in memory).",
        "الـ data section فيها الـ global والـ static variables، مش عنوان الـ instruction الحالية (Topic 2).",
        "الـ stack فيه data مؤقتة زي الـ function parameters والـ return addresses والـ local variables، مش قيمة الـ program counter (Topic 2)."
       ]
      },
      {
       "why": "الـ SJF بيشغّل أقصر next CPU burst الأول، والمحاضرة بتقول إنه optimal: بيدي أقل average waiting time لأي مجموعة processes (Topic 3، SJF).",
       "ow": [
        "الـ FCFS بيشغّل الـ jobs بترتيب الوصول، فلو أول job طويلة كل الـ jobs القصيرة وراها بتستنى (الـ convoy effect)؛ والـ average waiting time بتاعه عادة أعلى (Topic 3).",
        null,
        "الـ round robin بيدي كل process time quantum عشان الـ response time يبقى كويس، بس الـ average waiting time بتاعه عادة أعلى من الـ SJF (Topic 3).",
        "الـ priority scheduling العادي بيقلل الـ waiting بس لما الـ priority تبقى عكس طول الـ burst، وده بالظبط الـ SJF؛ غير كده ممكن يطلع أسوأ ويعمل starvation (Topic 3)."
       ]
      },
      {
       "why": "الـ long-term (job) scheduler هو اللي بيختار أنهي processes تدخل الـ ready queue؛ بيشتغل على فترات بعيدة (ثواني، دقايق) وبيتحكم في الـ degree of multiprogramming (Topic 2، Schedulers).",
       "ow": [
        "الـ short-term (CPU) scheduler بيختار أنهي process من اللي في الـ ready queue أصلًا تشتغل بعد كده على الـ CPU؛ وبيتنادى كل كام millisecond (Topic 2).",
        "الـ medium-term scheduler بيعمل swap للـ processes برا الـ memory ويرجّعها عشان يقلل الـ degree of multiprogramming؛ مبيدخّلش jobs جديدة للـ ready queue (Topic 2).",
        null,
        "في اختيار مناسب: المحاضرة بتعرّف الـ long-term (job) scheduler إنه اللي بيدخّل الـ processes للـ ready queue (Topic 2)."
       ]
      },
      {
       "why": "الـ Hard (magnetic) disks هي أشهر secondary storage. الـ RAM ده primary storage والـ tape ده tertiary.",
       "ow": [
        "الـ RAM دي الـ main (primary) memory، وهي volatile والـ CPU بيستخدمها مباشرة، مش secondary storage (Topic 1، Storage Structure).",
        "الـ SSDs أسرع وبتنتشر أكتر، بس المحاضرة بتقول إن الـ hard (magnetic) disk هو أشهر secondary storage (Topic 1).",
        "الـ tape drives بطيئة و sequential، وهي tertiary/backup storage، مش الـ secondary storage المنتشر (Topic 1).",
        null
       ]
      },
      {
       "why": "الـ process اللي خلصت والـ parent بتاعها لسه ماعملش wait() اسمها zombie.",
       "ow": [
        null,
        "الـ orphan ده العكس: الـ parent خلص من غير ما يعمل wait()، أما هنا الـ child هو اللي خلص والـ parent لسه عايش (Topic 2).",
        "\"Terminated\" دي الـ state النهائية العادية؛ الـ process اللي خلصت والـ entry بتاعها لسه موجود عشان الـ parent معملش wait() اسمها بالتحديد zombie (Topic 2).",
        "الـ init هي أول process بتشتغل وقت الـ boot (وفي الـ Unix بتتبنّى الـ orphans بعدين)؛ مش اسم الـ child اللي خلص والـ parent بتاعه معملش wait() (Topic 2)."
       ]
      },
      {
       "why": "الـ foreground process بيتحكم فيها من الـ user interface؛ والـ background processes مش على الشاشة.",
       "ow": [
        "\"Main\" مش category في سلايد الـ mobile multitasking؛ الـ app اللي على الشاشة واللي بتتحكم فيها من الـ user interface هي الـ foreground process (Topic 2).",
        null,
        "الـ background processes موجودة في الـ memory وممكن تشتغل، بس مش ظاهرة على الشاشة (Topic 2، Multitasking in Mobile Systems).",
        "\"Display\" مش process category في المحاضرة؛ المحاضرة بتقسم الـ apps لـ foreground process واحدة وbackground processes (Topic 2)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Flash (SSD) بتبقى nonvolatile، والـ access time بتاعها حوالي 25,000–50,000 ns مقابل 80–250 ns للـ main memory.",
       "ow": [
        null,
        "الجملة صح: الـ flash الـ access بتاعها حوالي 25,000–50,000 ns مقابل 80–250 ns للـ DRAM، والـ flash دي nonvolatile، فبتحتفظ بالداتا من غير كهربا (Topic 1)."
       ]
      },
      {
       "why": "الـ program هو الـ passive entity المتخزن على الـ disk (executable file)؛ أما الـ process فهي active entity، يعني program وهو بيتنفذ وليه program counter وresources (Topic 2، Process Concept).",
       "ow": [
        "ده بيبدّل الاتنين: الـ program اللي على الـ disk هو الـ passive entity، وبيبقى process active لما الـ executable يتحمّل في الـ memory (Topic 2).",
        null
       ]
      },
      {
       "why": "الـ Hardware interrupts جاية من الأجهزة؛ والـ software interrupts هي traps/exceptions.",
       "ow": [
        null,
        "الجملة صح: الـ hardware interrupts جاية من الـ device controllers، والـ software interrupts (traps/exceptions) جاية من errors أو requests من الـ user زي الـ system calls (Topic 1)."
       ]
      },
      {
       "why": "الـ kernel هو البرنامج الوحيد اللي شغال طول الوقت. وأي حاجة تانية system أو application program.",
       "ow": [
        "الـ kernel هو بس \"the one program running at all times\"؛ أي حاجة تانية system program أو application program، مش جزء من الـ kernel (Topic 1).",
        null
       ]
      },
      {
       "why": "الـ bootstrap متخزن في ROM أو EPROM (firmware).",
       "ow": [
        "الـ RAM دي volatile وبتبقى فاضية أول ما الجهاز يفتح، فمينفعش تشيل الـ bootstrap؛ الـ bootstrap متخزن في ROM أو EPROM (firmware) (Topic 1، Computer Startup).",
        null
       ]
      },
      {
       "why": "ده صريح من أنشطة الـ memory-management.",
       "ow": [
        "السلايد بيحط \"allocating and deallocating memory space as needed\" كواحد من أنشطة الـ memory management بتاعة الـ OS، فالجملة غلط (Topic 1).",
        null
       ]
      },
      {
       "why": "المحاضرة بتقولها صريح: \"Solid-state disks – faster than hard disks, nonvolatile\". مفيهاش أجزاء بتتحرك، فمفيش seek ولا rotation delay (Topic 1، Storage Structure).",
       "ow": [
        null,
        "الجملة صح: السلايد بيقول إن الـ solid-state disks أسرع من الـ hard disks (وnonvolatile)؛ ومن غير أجزاء بتتحرك مفيش seek ولا rotational delay (Topic 1)."
       ]
      },
      {
       "why": "الـ parent يا بيشتغل concurrently يا بيستنى لحد ما الـ children يخلصوا (wait()). ولو خلص الأول فعلًا، الـ child بيبقى orphan أو بيتقفل بالـ cascading termination، فـ\"الـ parent بيخلص الأول\" مش قاعدة.",
       "ow": [
        "دي مش قاعدة: الـ parent ممكن يشتغل concurrently مع الـ children أو يعمل wait() لحد ما يخلصوا؛ ولو خلص الأول، الـ child بيبقى orphan أو بيتقفل بالـ cascading termination (Topic 2).",
        null
       ]
      },
      {
       "why": "CPU واحد بيشغّل process واحدة في المرة؛ والباقي ready أو waiting.",
       "ow": [
        null,
        "الجملة صح: الـ CPU core الواحد بينفذ process واحدة بس في المرة، فكل الـ processes التانية بتبقى في الـ ready أو الـ waiting state (Topic 2، Process State)."
       ]
      },
      {
       "why": "الـ Busy waiting بيضيّع CPU cycles في loop مش بيعمل أي شغل مفيد. معقول بس للأجهزة السريعة جدًا.",
       "ow": [
        "الـ busy waiting بيخلّي الـ CPU مشغول في ولا حاجة مفيدة: بيلف في loop يقرا الـ busy bit، وبيضيّع cycles كانت process تانية تقدر تستخدمها (Topic 8، Polling).",
        null
       ]
      }
     ]
    }
   ]
  },
  {
   "sections": [
    {
     "items": [
      {
       "why": "الـ Topic 2، الـ slides 3–4.",
       "ans": "<table><tr><th>Program</th><th>Process</th></tr><tr><td>كيان passive</td><td>كيان active: برنامج شغال (program in execution)</td></tr><tr><td>متخزن على الـ disk كملف executable</td><td>بتتعمل لما الـ executable يتحمّل في الـ memory</td></tr><tr><td>كود بس (instructions)</td><td>الكود (text) + الـ program counter والـ registers + الـ stack + الـ data section + الـ heap + الـ state (PCB)</td></tr><tr><td>البرنامج الواحد…</td><td>…ممكن يبقى كذا process (زي كذا user بيشغّلوا نفس البرنامج)</td></tr></table>"
      },
      {
       "why": "ارسم الـ diagram وكل transition مكتوب عليها اسمها، وبعدين عرّف الـ 5 states.",
       "ans": "<pre>        admitted            interrupt            exit\n  new ─────────► ready ◄──────────── running ─────────► terminated\n                   ▲   ───────────────►  │\n                   │   scheduler dispatch│\n   I/O or event    │                     │ I/O or event wait\n   completion      └────── waiting ◄─────┘</pre>• الـ <b>new</b>: الـ process بتتعمل.<br>• الـ <b>ready</b>: مستنية تاخد processor.<br>• الـ <b>running</b>: الـ instructions بتتنفذ.<br>• الـ <b>waiting</b>: مستنية event (إن الـ I/O يخلص، أو signal).<br>• الـ <b>terminated</b>: خلصت تنفيذ."
      },
      {
       "why": "الـ Topic 4، الـ slide 21. مثال بالأرقام بياخد الدرجة كاملة.",
       "ans": "<b>External fragmentation</b>: إجمالي مساحة الـ memory موجود ويكفي الطلب، بس <b>مش contiguous</b> (holes متفرقة بين الـ partitions المتخصصة). بيحصل مع الـ variable partitions والـ segmentation. بيقل بالـ <b>compaction</b> (ممكن بس مع الـ dynamic relocation وقت الـ execution).<br><b>Internal fragmentation</b>: الـ memory المتخصصة ممكن تبقى <b>أكبر شوية من المطلوب</b>؛ والفرق جوة الـ partition بس مش مستخدم. بيحصل مع الـ fixed-size blocks والـ paging، زي لما الـ page تبقى 2,048 B والـ process تبقى 72,766 B، فآخر page بتستخدم 1,086 B بس، و962 B بيضيعوا."
      },
      {
       "why": "الـ Topic 6، الـ slide 3.",
       "ans": "الـ Deadlock ممكن يحصل لو الـ 4 شروط اتحققوا <b>مع بعض في نفس الوقت</b>:<br>(1) الـ <b>Mutual exclusion</b>، يعني process واحدة بس في المرة تقدر تستخدم الـ resource.<br>(2) الـ <b>Hold and wait</b>، يعني process ماسكة resource واحد على الأقل ومستنية تاخد resources زيادة ماسكاها processes تانية.<br>(3) الـ <b>No preemption</b>: الـ resource مايتسابش غير بمزاج الـ process اللي ماسكاه، بعد ما تخلّص الـ task بتاعتها.<br>(4) الـ <b>Circular wait</b>: فيه مجموعة <bdi dir=\"ltr\">{P0, …, Pn}</bdi> من الـ processes المستنية فيها P0 مستنية P1، وP1 مستنية P2، …، وPn−1 مستنية Pn وPn مستنية P0."
      },
      {
       "why": "الـ Topic 7، الـ slides 28–33.",
       "ans": "<b>Linked allocation</b>: كل file عبارة عن linked list من disk blocks ممكن تبقى متفرقة في أي حتة. كل block فيه pointer للي بعده والـ file بيخلص عند null pointer؛ والـ directory فيه الـ start (والـ end) block. + مفيش external fragmentation، مفيش compaction، مش محتاج تعلن الحجم. − الـ reliability (pointers تضيع أو تبوظ)، الوصول لـ block بياخد I/Os وseeks كتير، مساحة للـ pointers. (نوع الـ FAT: الـ links محفوظة في table.)<br><b>Indexed allocation</b>: كل file ليه <b>index block</b> خاص بيه فيه pointers للـ data blocks بتاعته؛ والـ directory بيشاور على الـ index block. + Random access، وdynamic access من غير external fragmentation. − الـ overhead بتاع الـ index block. file حجمه 256 KB بـ blocks حجمها 512-byte محتاج index block واحد بس؛ والأحجام اللي مش محدودة بتستخدم linked scheme من الـ index blocks."
      },
      {
       "why": "Topic 1 slide 20 وTopic 8 slide 11.",
       "ans": "• بيستخدم مع الـ I/O devices السريعة اللي بتنقل بسرعة قريبة من سرعة الـ memory.<br>• بيتجنب الـ programmed I/O (byte واحد في المرة) في نقل الداتا الكبيرة: الـ controller بينقل <b>blocks</b> مباشرة بين الجهاز والـ main memory <b>من غير تدخل الـ CPU</b> (bypasses the CPU).<br>• <b>interrupt واحد بس لكل block</b> بدل واحد لكل byte، فـ interrupts وcontext switches أقل.<br>• الـ CPU بيبقى فاضي يعمل شغل تاني وقت النقل. الـ cycle stealing ليه تمن بسيط، بس برضه أكفأ بكتير."
      }
     ]
    },
    {
     "items": [
      {
       "why": "لما يبقى فيه arrival times استخدم دايمًا القانون ده:<span class=\"ltr\">WT = Completion − Arrival − Burst</span>الـ SRTF chart هو مثال المحاضرة بالظبط (26/4 = 6.5). في الـ RR، الـ processes اللي وصلت أثناء أول quantum لـ P1 (عند 1، 2، 3) بتدخل الـ queue قبل ما P1 ترجع عند t = 4.",
       "ans": "<b>Preemptive SJF (SRTF)</b>: عند t = 1 الـ P2 (4) &lt; اللي فاضل من P1 وهو 7، فـ P1 بتتعملها preempt؛ عند t = 5 الـ P4 (5) &lt; P1 (7) &lt; P3 (9).<table><tr><th>P1</th><th>P2</th><th>P4</th><th>P1</th><th>P3</th></tr><tr><td>0–1</td><td>1–5</td><td>5–10</td><td>10–17</td><td>17–26</td></tr></table><table><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>0</td><td>8</td><td>17</td><td>17</td><td><b>9</b></td></tr><tr><td>P2</td><td>1</td><td>4</td><td>5</td><td>4</td><td><b>0</b></td></tr><tr><td>P3</td><td>2</td><td>9</td><td>26</td><td>24</td><td><b>15</b></td></tr><tr><td>P4</td><td>3</td><td>5</td><td>10</td><td>7</td><td><b>2</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td></td><td>52/4 = 13</td><td><b>26/4 = 6.5</b></td></tr></table><b>FCFS</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–8</td><td>8–12</td><td>12–21</td><td>21–26</td></tr></table><table><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>0</td><td>8</td><td>8</td><td>8</td><td><b>0</b></td></tr><tr><td>P2</td><td>1</td><td>4</td><td>12</td><td>11</td><td><b>7</b></td></tr><tr><td>P3</td><td>2</td><td>9</td><td>21</td><td>19</td><td><b>10</b></td></tr><tr><td>P4</td><td>3</td><td>5</td><td>26</td><td>23</td><td><b>18</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td></td><td>61/4 = 15.25</td><td><b>35/4 = 8.75</b></td></tr></table><b>Priority</b> (1 = الأعلى): P1 بتشتغل الأول؛ عند t = 8 الـ processes الجاهزة هي P3 (2)، P4 (3)، P2 (5).<table><tr><th>P1</th><th>P3</th><th>P4</th><th>P2</th></tr><tr><td>0–8</td><td>8–17</td><td>17–22</td><td>22–26</td></tr></table><table><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>0</td><td>8</td><td>8</td><td>8</td><td><b>0</b></td></tr><tr><td>P2</td><td>1</td><td>4</td><td>26</td><td>25</td><td><b>21</b></td></tr><tr><td>P3</td><td>2</td><td>9</td><td>17</td><td>15</td><td><b>6</b></td></tr><tr><td>P4</td><td>3</td><td>5</td><td>22</td><td>19</td><td><b>14</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td></td><td>67/4 = 16.75</td><td><b>41/4 = 10.25</b></td></tr></table><b>RR (q = 4)</b>: الـ queue بعد أول quantum لـ P1 بتبقى:<span class=\"ltr\">P2, P3, P4, P1</span><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P1</th><th>P3</th><th>P4</th><th>P3</th></tr><tr><td>0–4</td><td>4–8</td><td>8–12</td><td>12–16</td><td>16–20</td><td>20–24</td><td>24–25</td><td>25–26</td></tr></table><table><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>0</td><td>8</td><td>20</td><td>20</td><td><b>12</b></td></tr><tr><td>P2</td><td>1</td><td>4</td><td>8</td><td>7</td><td><b>3</b></td></tr><tr><td>P3</td><td>2</td><td>9</td><td>26</td><td>24</td><td><b>15</b></td></tr><tr><td>P4</td><td>3</td><td>5</td><td>25</td><td>22</td><td><b>17</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td></td><td>73/4 = 18.25</td><td><b>47/4 = 11.75</b></td></tr></table><b>c.</b> أقل متوسط waiting time هو <b>preemptive SJF (SRTF) = 6.5 ms</b>، والباقيين:<span class=\"ltr\">FCFS 8.75, priority 10.25, RR 11.75</span>"
      },
      {
       "why": "أول 4 pages مختلفة بيملوا الـ 4 frames (4 faults). بعد كده الـ FIFO بيطرد بترتيب التحميل (5، 7، 6، 9، 3…). الـ OPT: عند \"3\" اطرد 5 (هتتستخدم أبعد حاجة)؛ عند \"4\" اطرد 6؛ عند \"6\" اطرد 4 أو 3 (مش هيتستخدموا تاني)؛ عند \"5\" اطرد واحدة مش هتتستخدم تاني. الـ LRU: عند \"3\" اطرد 5؛ عند \"4\" اطرد 6؛ عند \"6\" اطرد 4؛ عند \"5\" اطرد 3.",
       "ans": "<b>FIFO = 10 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>9</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td>F</td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td></td></tr></table><br><b>Optimal = 8 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>9</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td></tr></table><br><b>LRU = 8 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>9</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td></tr></table><br>(الرقم الـ bold معناه page لسه متحمّلة؛ والـ F معناها fault.)"
      },
      {
       "why": "اتشيك الأول: مجموع columns الـ Allocation (2, 9, 10, 12) + الـ Available (1, 5, 2, 0) = (3, 14, 12, 12) = الإجماليات ✓. الـ Work في الآخر لازم يساوي الإجماليات، ودي طريقة كويسة تتأكد بيها من نفسك. فيه ترتيبات safe تانية صح (زي <bdi dir=\"ltr\">P0, P3, P2, P4, P1</bdi>). أي sequence صح ومعاها الـ Work trace بتاخد الدرجات.",
       "ans": "<span class=\"ltr\"><b>a. Need = Max − Allocation</b></span><table><tr><th>Process</th><th>A B C D</th></tr><tr><td>P0</td><td>0 0 0 0</td></tr><tr><td>P1</td><td>0 7 5 0</td></tr><tr><td>P2</td><td>1 0 0 2</td></tr><tr><td>P3</td><td>0 0 2 0</td></tr><tr><td>P4</td><td>0 6 4 2</td></tr></table><b>b. الـ Safety algorithm</b>، والـ Work بيبدأ من الـ Available:<span class=\"ltr\">Work = Available = (1,5,2,0)</span><span class=\"ltr\">P0: (0,0,0,0) ≤ Work ✓ → Work = (1,5,2,0) + (0,0,1,2) = <b>(1,5,3,2)</b></span><span class=\"ltr\">P1: (0,7,5,0) ≤ (1,5,3,2)? ✗ (B: 7 &gt; 5)</span><span class=\"ltr\">P2: (1,0,0,2) ≤ (1,5,3,2) ✓ → Work = (1,5,3,2) + (1,3,5,4) = <b>(2,8,8,6)</b></span><span class=\"ltr\">P3: (0,0,2,0) ✓ → Work = (2,8,8,6) + (0,6,3,2) = <b>(2,14,11,8)</b></span><span class=\"ltr\">P4: (0,6,4,2) ✓ → Work = (2,14,11,8) + (0,0,1,4) = <b>(2,14,12,12)</b></span><span class=\"ltr\">P1: (0,7,5,0) ✓ → Work = (2,14,12,12) + (1,0,0,0) = <b>(3,14,12,12)</b></span>وده بيساوي إجمالي الـ instances ✓<br>كل الـ Finish بقت true، يبقى السيستم <b>في safe state</b>، والـ safe sequence هي <b><bdi dir=\"ltr\">&lt;P0, P2, P3, P4, P1&gt;</bdi></b>."
      }
     ]
    }
   ]
  },
  {
   "sections": [
    {
     "items": [
      {
       "why": "كله بيوصل عند 0، فالـ WT بيساوي completion − burst. في الـ RR q = 1، اكتب اللفة كاملة ووضّح كل process خلصت إمتى. الـ completion times بتاعتها:<span class=\"ltr\">P4 4, P3 8, P2 11, P5 14, P1 18</span>",
       "ans": "<b>SJF</b><table><tr><th>P4</th><th>P3</th><th>P2</th><th>P5</th><th>P1</th></tr><tr><td>0–1</td><td>1–3</td><td>3–6</td><td>6–10</td><td>10–18</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>8</td><td>18</td><td>18</td><td><b>10</b></td></tr><tr><td>P2</td><td>3</td><td>6</td><td>6</td><td><b>3</b></td></tr><tr><td>P3</td><td>2</td><td>3</td><td>3</td><td><b>1</b></td></tr><tr><td>P4</td><td>1</td><td>1</td><td>1</td><td><b>0</b></td></tr><tr><td>P5</td><td>4</td><td>10</td><td>10</td><td><b>6</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>38/5 = 7.6</td><td><b>20/5 = 4</b></td></tr></table><b>RR (q = 1)</b>: لف على P1 P2 P3 P4 P5؛ P4 بتخلص عند 4، وP3 عند 8، وP2 عند 11، وP5 عند 14، وبعدين P1 بتشتغل لوحدها لحد 18.<table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P5</th><th>P1</th><th>P2</th><th>P3</th><th>P5</th><th>P1</th><th>P2</th><th>P5</th><th>P1</th><th>P5</th><th>P1</th></tr><tr><td>0–1</td><td>1–2</td><td>2–3</td><td>3–4</td><td>4–5</td><td>5–6</td><td>6–7</td><td>7–8</td><td>8–9</td><td>9–10</td><td>10–11</td><td>11–12</td><td>12–13</td><td>13–14</td><td>14–18</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>8</td><td>18</td><td>18</td><td><b>10</b></td></tr><tr><td>P2</td><td>3</td><td>11</td><td>11</td><td><b>8</b></td></tr><tr><td>P3</td><td>2</td><td>8</td><td>8</td><td><b>6</b></td></tr><tr><td>P4</td><td>1</td><td>4</td><td>4</td><td><b>3</b></td></tr><tr><td>P5</td><td>4</td><td>14</td><td>14</td><td><b>10</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>55/5 = 11</td><td><b>37/5 = 7.4</b></td></tr></table><b>Priority</b><table><tr><th>P2</th><th>P3</th><th>P1</th><th>P4</th><th>P5</th></tr><tr><td>0–3</td><td>3–5</td><td>5–13</td><td>13–14</td><td>14–18</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>8</td><td>13</td><td>13</td><td><b>5</b></td></tr><tr><td>P2</td><td>3</td><td>3</td><td>3</td><td><b>0</b></td></tr><tr><td>P3</td><td>2</td><td>5</td><td>5</td><td><b>3</b></td></tr><tr><td>P4</td><td>1</td><td>14</td><td>14</td><td><b>13</b></td></tr><tr><td>P5</td><td>4</td><td>18</td><td>18</td><td><b>14</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>53/5 = 10.6</td><td><b>35/5 = 7</b></td></tr></table><b>(3)</b> أقل متوسط waiting time هو <b>SJF = 4 ms</b>، والباقيين:<span class=\"ltr\">priority 7, RR 7.4</span>والـ FCFS كان هيبقى 9.2."
      },
      {
       "why": "مثال المحاضرة بالظبط.",
       "ans": "<table><tr><th>Process</th><th>First-fit</th><th>Best-fit</th><th>Worst-fit</th></tr><tr><td>212K</td><td>500K (فاضل 288)</td><td>300K (فاضل 88)</td><td>600K (فاضل 388)</td></tr><tr><td>417K</td><td>600K (فاضل 183)</td><td>500K (فاضل 83)</td><td>500K (فاضل 83)</td></tr><tr><td>112K</td><td>الـ hole اللي 288K في الـ 500K</td><td>200K (فاضل 88)</td><td>الـ hole اللي 388K في الـ 600K</td></tr><tr><td>426K</td><td><b>لازم يستنى</b></td><td>600K (فاضل 174)</td><td><b>لازم يستنى</b></td></tr></table>الـ <b>Best-fit</b> هو الأكفأ هنا: هو الـ algorithm الوحيد اللي بيدّي مكان للأربع processes."
      },
      {
       "why": "نفس string الـ 2024/25 من غير الـ \"9\" اللي قبل الأخير (اللي كان hit هناك)، فالأعداد زي ما هي (10 / 8 / 8). وهنا الـ LRU صادف إنه يساوي الـ Optimal.",
       "ans": "<b>FIFO = 10 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td>F</td><td>F</td><td></td><td></td><td>F</td><td></td><td></td></tr></table><br><b>Optimal = 8 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td><td>F</td><td></td><td></td></tr></table><br><b>LRU = 8 page faults</b><table><tr><th>Ref</th><th>5</th><th>7</th><th>6</th><th>9</th><th>7</th><th>3</th><th>7</th><th>4</th><th>9</th><th>3</th><th>7</th><th>3</th><th>9</th><th>6</th><th>9</th><th>7</th><th>6</th><th>5</th><th>7</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td>5</td><td>5</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>F2</td><td></td><td><b>7</b></td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td><td>7</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>4</b></td><td>4</td><td>4</td><td>4</td><td>4</td><td>4</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>F4</td><td></td><td></td><td></td><td><b>9</b></td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td><td>9</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td><td>F</td><td></td><td></td></tr></table>"
      },
      {
       "why": "حتى لو الـ Available = 0 السيستم ممكن يبقى safe، لأن P0 وP2 مش محتاجين حاجة زيادة وبيسيبوا الـ resources بتاعتهم. قارن بورقة 2025/26، اللي فيها Max P2 = 3 0 4 بيخليه unsafe.",
       "ans": "<b>(1) الـ Need</b>:<span class=\"ltr\">Need = Max − Allocation</span><span class=\"ltr\">P0 (0,0,0), P1 (2,0,2), P2 (0,0,0), P3 (1,0,0), P4 (0,0,2)</span><b>(2)</b> الـ Work بيبدأ (0,0,0):<span class=\"ltr\">P0 (0,0,0) ✓ → Work = (0,1,0)</span><span class=\"ltr\">P1 (2,0,2)? ✗</span><span class=\"ltr\">P2 (0,0,0) ✓ → Work = (0,1,0) + (3,0,3) = (3,1,3)</span><span class=\"ltr\">P3 (1,0,0) ✓ → (3,1,3) + (2,1,1) = (5,2,4)</span><span class=\"ltr\">P4 (0,0,2) ✓ → (5,2,4) + (0,0,2) = (5,2,6)</span><span class=\"ltr\">P1 (2,0,2) ✓ → (5,2,6) + (2,0,0) = (7,2,6)</span>وده بيساوي الإجماليات ✓<br>السيستم <b>Safe</b>، والـ sequence هي <b><bdi dir=\"ltr\">&lt;P0, P2, P3, P4, P1&gt;</bdi></b>."
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Topic 1، الـ slide 3.",
       "ans": "(1) <b>تشغيل برامج الـ user</b> وتسهيل حل مشاكل الـ user.<br>(2) إن الـ computer system يبقى <b>مريح (convenient)</b> في الاستخدام.<br>(3) استخدام الـ hardware بطريقة <b>efficient</b>."
      },
      {
       "why": "الـ Topic 2، الـ slides 12–13.",
       "ans": "<table><tr><th></th><th>Short-term (CPU scheduler)</th><th>Medium-term</th><th>Long-term (job scheduler)</th></tr><tr><td>الوظيفة</td><td>بيختار أنهي ready process تتنفذ بعد كده ويدّيها الـ CPU</td><td>بيشيل processes من الـ memory للـ disk ويرجّعها بعدين عشان تكمّل (swapping)</td><td>بيختار أنهي processes تدخل الـ ready queue</td></tr><tr><td>بيشتغل كل قد إيه</td><td>كتير جدًا (ms)، فلازم يبقى سريع</td><td>من وقت للتاني</td><td>قليل (ثواني، دقايق)، فممكن يبقى بطيء</td></tr><tr><td>التأثير</td><td>بيقرر الـ CPU allocation</td><td>بيقلل الـ degree of multiprogramming</td><td>بيتحكم في الـ degree of multiprogramming</td></tr></table>"
      },
      {
       "why": "الـ Topic 7، الـ slides 26 و31–33.",
       "ans": "الأنواع هي الـ <b>contiguous</b> والـ <b>linked</b> والـ <b>indexed</b> allocation.<br><br><b>Indexed allocation</b>: كل file ليه <b>index block(s)</b> خاص بيه، array من الـ pointers للـ data blocks بتاعته (الـ logical view هنا هو index table بتشاور على blocks متفرقة). الـ directory entry فيه رقم الـ index block، زي الـ file اللي اسمه jeep، الـ index block بتاعه رقم 19 وفيه:<span class=\"ltr\">9, 16, 1, 10, 25, −1, …</span>والـ entry رقم i بيشاور على الـ block رقم i في الـ file.<br>• محتاج index table.<br>• بيدعم <b>random (direct) access</b>.<br>• الـ dynamic access <b>من غير external fragmentation</b>، بس فيه <b>overhead الـ index block</b>.<br>• مثال: file أقصاه 256 KB بـ blocks حجمها 512-byte، يعني 512 block، فمحتاجين <b>index block واحد</b> بس.<br>• الـ files اللي طولها مش محدود: <b>linked scheme</b>، الـ index blocks بتتربط ببعض (من غير حد للحجم)."
      },
      {
       "why": "الـ Topic 8، الـ slide 12.",
       "ans": "(1) الـ Device driver بيتقاله ينقل داتا الـ disk لـ buffer عند address X.<br>(2) الـ Device driver بيقول للـ disk controller ينقل C bytes من الـ disk للـ buffer عند address X.<br>(3) الـ Disk controller بيبدأ الـ DMA transfer.<br>(4) الـ Disk controller بيبعت كل byte للـ DMA controller.<br>(5) الـ DMA controller بينقل الـ bytes للـ buffer X، وبيزوّد الـ memory address ويقلل C لحد ما C = 0.<br>(6) لما C = 0، الـ DMA بيعمل interrupt للـ CPU عشان يقول إن النقل خلص."
      }
     ]
    }
   ]
  },
  {
   "sections": [
    {
     "items": [
      {
       "why": "تتبع الـ RR: اللفة الأولى P0 P1 P2 P3 P4 (0–10)؛ اللفة التانية P0 P1، وبعدين P2 بتخلص عند 15، وP3، وP4 (لحد 19)؛ اللفة التالتة P0 و P1، وبعدين P3 بتخلص عند 25، وP4 عند 26؛ وبعدين P0 26–28، وP1 بتخلص عند 29، وP0 بتخلص عند 31.",
       "ans": "<b>FCFS</b><table><tr><th>P0</th><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–10</td><td>10–17</td><td>17–20</td><td>20–26</td><td>26–31</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P0</td><td>10</td><td>10</td><td>10</td><td><b>0</b></td></tr><tr><td>P1</td><td>7</td><td>17</td><td>17</td><td><b>10</b></td></tr><tr><td>P2</td><td>3</td><td>20</td><td>20</td><td><b>17</b></td></tr><tr><td>P3</td><td>6</td><td>26</td><td>26</td><td><b>20</b></td></tr><tr><td>P4</td><td>5</td><td>31</td><td>31</td><td><b>26</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>104/5 = 20.8</td><td><b>73/5 = 14.6</b></td></tr></table><b>SJF</b><table><tr><th>P2</th><th>P4</th><th>P3</th><th>P1</th><th>P0</th></tr><tr><td>0–3</td><td>3–8</td><td>8–14</td><td>14–21</td><td>21–31</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P0</td><td>10</td><td>31</td><td>31</td><td><b>21</b></td></tr><tr><td>P1</td><td>7</td><td>21</td><td>21</td><td><b>14</b></td></tr><tr><td>P2</td><td>3</td><td>3</td><td>3</td><td><b>0</b></td></tr><tr><td>P3</td><td>6</td><td>14</td><td>14</td><td><b>8</b></td></tr><tr><td>P4</td><td>5</td><td>8</td><td>8</td><td><b>3</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>77/5 = 15.4</td><td><b>46/5 = 9.2</b></td></tr></table><b>Priority</b><table><tr><th>P1</th><th>P4</th><th>P2</th><th>P3</th><th>P0</th></tr><tr><td>0–7</td><td>7–12</td><td>12–15</td><td>15–21</td><td>21–31</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P0</td><td>10</td><td>31</td><td>31</td><td><b>21</b></td></tr><tr><td>P1</td><td>7</td><td>7</td><td>7</td><td><b>0</b></td></tr><tr><td>P2</td><td>3</td><td>15</td><td>15</td><td><b>12</b></td></tr><tr><td>P3</td><td>6</td><td>21</td><td>21</td><td><b>15</b></td></tr><tr><td>P4</td><td>5</td><td>12</td><td>12</td><td><b>7</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>86/5 = 17.2</td><td><b>55/5 = 11</b></td></tr></table><b>RR (q = 2)</b><table><tr><th>P0</th><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P0</th><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P0</th><th>P1</th><th>P3</th><th>P4</th><th>P0</th><th>P1</th><th>P0</th></tr><tr><td>0–2</td><td>2–4</td><td>4–6</td><td>6–8</td><td>8–10</td><td>10–12</td><td>12–14</td><td>14–15</td><td>15–17</td><td>17–19</td><td>19–21</td><td>21–23</td><td>23–25</td><td>25–26</td><td>26–28</td><td>28–29</td><td>29–31</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P0</td><td>10</td><td>31</td><td>31</td><td><b>21</b></td></tr><tr><td>P1</td><td>7</td><td>29</td><td>29</td><td><b>22</b></td></tr><tr><td>P2</td><td>3</td><td>15</td><td>15</td><td><b>12</b></td></tr><tr><td>P3</td><td>6</td><td>25</td><td>25</td><td><b>19</b></td></tr><tr><td>P4</td><td>5</td><td>26</td><td>26</td><td><b>21</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>126/5 = 25.2</td><td><b>95/5 = 19</b></td></tr></table><b>(3)</b> أقل متوسط waiting time هو <b>SJF = 9.2 ms</b>، والباقيين:<span class=\"ltr\">FCFS 14.6, priority 11, RR 19</span>"
      },
      {
       "why": "في الـ first-fit، الـ 130K بيروح الـ partition اللي 150K لأنه أول hole بالترتيب كبير كفاية، حتى لو الـ 270K المتبقي كمان ينفع.",
       "ans": "<table><tr><th>Process</th><th>First-fit</th><th>Best-fit</th><th>Worst-fit</th></tr><tr><td>230K</td><td>500K (فاضل 270)</td><td>300K (فاضل 70)</td><td>600K (فاضل 370)</td></tr><tr><td>420K</td><td>600K (فاضل 180)</td><td>500K (فاضل 80)</td><td>500K (فاضل 80)</td></tr><tr><td>130K</td><td>150K (فاضل 20)</td><td>150K (فاضل 20)</td><td>الـ hole اللي 370K في الـ 600K (فاضل 240)</td></tr><tr><td>450K</td><td><b>لازم يستنى</b> (الـ holes 20، 270، 300، 180)</td><td>600K (فاضل 150)</td><td><b>لازم يستنى</b> (أكبر hole هو 300)</td></tr></table>الـ <b>Best-fit</b> هو اللي بيستخدم الـ memory بأكفأ طريقة: الأربع processes اتحطوا."
      },
      {
       "why": "ده string المحاضرة بس الـ pages متغيرة أساميها (7→5، 0→8، 1→6)، فالإجابات هي إجابات المحاضرة 15 / 9 / 12.",
       "ans": "<b>FIFO = 15</b><table><tr><th>Ref</th><th>5</th><th>8</th><th>6</th><th>2</th><th>8</th><th>3</th><th>8</th><th>4</th><th>2</th><th>3</th><th>8</th><th>3</th><th>8</th><th>3</th><th>2</th><th>6</th><th>2</th><th>8</th><th>6</th><th>5</th><th>8</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>F2</td><td></td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td><b>8</b></td><td>8</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td><b>8</b></td><td>8</td><td>8</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>6</b></td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td></td><td></td><td>F</td><td>F</td><td></td><td></td><td>F</td><td>F</td><td>F</td></tr></table><br><b>Optimal = 9</b><table><tr><th>Ref</th><th>5</th><th>8</th><th>6</th><th>2</th><th>8</th><th>3</th><th>8</th><th>4</th><th>2</th><th>3</th><th>8</th><th>3</th><th>8</th><th>3</th><th>2</th><th>6</th><th>2</th><th>8</th><th>6</th><th>5</th><th>8</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>F2</td><td></td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td><b>4</b></td><td>4</td><td>4</td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td></td><td></td><td>F</td><td></td><td></td><td></td><td>F</td><td></td><td></td></tr></table><br><b>LRU = 12</b><table><tr><th>Ref</th><th>5</th><th>8</th><th>6</th><th>2</th><th>8</th><th>3</th><th>8</th><th>4</th><th>2</th><th>3</th><th>8</th><th>3</th><th>8</th><th>3</th><th>2</th><th>6</th><th>2</th><th>8</th><th>6</th><th>5</th><th>8</th><th>6</th></tr><tr><td>F1</td><td><b>5</b></td><td>5</td><td>5</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td><td><b>6</b></td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td><td>6</td></tr><tr><td>F2</td><td></td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td>8</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td><b>8</b></td><td>8</td><td>8</td><td>8</td><td>8</td></tr><tr><td>F3</td><td></td><td></td><td><b>6</b></td><td>6</td><td>6</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>5</b></td><td>5</td><td>5</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td></td><td></td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td></tr></table>"
      },
      {
       "why": "تشيك الإجماليات: مجموع الـ Allocation (2, 9, 10) + الـ Available (1, 5, 2) = (3, 14, 12) ✓.",
       "ans": "<b>(1) الـ Need</b>:<span class=\"ltr\">P0 (0,0,0), P1 (0,7,5), P2 (1,0,0), P3 (0,0,2), P4 (0,6,4)</span><b>(2)</b> الـ Work بيبدأ (1,5,2):<span class=\"ltr\">P0 ✓ → (1,5,3)</span><span class=\"ltr\">P1 (0,7,5)? ✗ (B)</span><span class=\"ltr\">P2 (1,0,0) ✓ → (1,5,3) + (1,3,5) = (2,8,8)</span><span class=\"ltr\">P3 (0,0,2) ✓ → (2,8,8) + (0,6,3) = (2,14,11)</span><span class=\"ltr\">P4 (0,6,4) ✓ → (2,14,11) + (0,0,1) = (2,14,12)</span><span class=\"ltr\">P1 (0,7,5) ✓ → (2,14,12) + (1,0,0) = (3,14,12)</span>وده بيساوي الإجماليات ✓<br>السيستم <b>Safe</b>، والـ sequence هي <b><bdi dir=\"ltr\">&lt;P0, P2, P3, P4, P1&gt;</bdi></b>."
      }
     ]
    },
    {
     "items": [
      {
       "why": "Topic 1.",
       "ans": "برنامج بيقف وسيط بين الـ user والـ hardware. الـ OS هو <b>resource allocator</b> (بيدير كل الـ resources؛ وبيحكم بين الطلبات المتعارضة عشان الاستخدام يبقى efficient وعادل) و<b>control program</b> (بيتحكم في تنفيذ البرامج عشان يمنع الأخطاء والاستخدام الغلط). البرنامج الوحيد اللي شغال طول الوقت هو الـ <b>kernel</b>؛ وأي حاجة تانية system program أو application program."
      },
      {
       "why": "Topic 2.",
       "ans": "الـ Short-term (CPU scheduler): بيختار الـ ready process الجاية للـ CPU؛ بيشتغل كل كام ms، فلازم يبقى سريع.<br>الـ Medium-term: بيعمل swap للـ processes من الـ memory للـ disk ويرجّعها تاني، عشان يقلل الـ degree of multiprogramming.<br>الـ Long-term (job scheduler): بيختار أنهي processes تدخل الـ ready queue؛ بيشتغل قليل (ثواني، دقايق)؛ وبيتحكم في الـ degree of multiprogramming."
      },
      {
       "why": "الـ Topic 3، الـ slides 3–5.",
       "ans": "<b>Non-preemptive</b>: الـ scheduling بيحصل بس لما الـ process تتحول من running لـ waiting أو تخلص (الحالات 1 و4). أول ما الـ process تاخد الـ CPU بتفضل ماسكاه لحد ما تسيبه. أمثلة: FCFS و SJF و non-preemptive priority.<br><b>Preemptive</b>: الـ scheduling بيحصل كمان لما الـ process تروح من running لـ ready، أو من waiting لـ ready (الحالات 2 و3)، فالـ CPU ممكن يتاخد منها. أمثلة: RR و SRTF و preemptive priority. ممكن يعمل race conditions على الداتا المشتركة. بيستخدمه Windows وmacOS وLinux وUNIX."
      },
      {
       "why": "Topic 4.",
       "ans": "<table><tr><th>Paging</th><th>Segmentation</th></tr><tr><td>الـ pages/frames ثابتة الحجم</td><td>الـ segments منطقية وأحجامها متغيرة</td></tr><tr><td>مش باين للـ user</td><td>بيطابق نظرة الـ user (زي الـ main والـ stack والـ functions…)</td></tr><tr><td>الـ address فيه page p و offset d، والـ page table بتعمل mapping من الـ p للـ frame</td><td>الـ address فيه segment s و offset d، والـ segment table فيها base و limit</td></tr><tr><td>مفيش external fragmentation؛ فيه internal fragmentation</td><td>مفيش internal؛ فيه external fragmentation</td></tr></table>"
      },
      {
       "why": "Topic 6.",
       "ans": "<b>الشروط</b>: الـ mutual exclusion والـ hold and wait والـ no preemption والـ circular wait (الأربعة مع بعض في نفس الوقت).<br><b>الـ Prevention</b> (امنع شرط واحد):<br>• الـ Mutual exclusion: مش مطلوب للـ resources اللي ينفع تتشارك (read-only files)، بس لازم يتحقق للـ resources اللي ماينفعش تتشارك.<br>• الـ Hold and wait: اطلب كل الـ resources قبل التنفيذ، أو اطلب بس وإنت مش ماسك حاجة (utilization واطي، starvation).<br>• الـ No preemption: الـ process اللي مش قادرة تاخد resource طلبته بتسيب كل الـ resources اللي ماسكاها.<br>• الـ Circular wait: ترتيب كامل (total ordering) للـ resource types؛ والطلب بترتيب تصاعدي."
      },
      {
       "why": "Topic 7.",
       "ans": "<b>Contiguous</b>: الـ file بياخد blocks ورا بعض؛ الـ directory بيحتفظ بالـ start + length؛ أحسن performance؛ المشاكل: external fragmentation، لازم تعرف الحجم، compaction.<br><b>Linked</b>: عبارة عن linked list من blocks متفرقة، كل واحد فيه pointer للي بعده؛ مفيش external fragmentation، مش محتاج الحجم؛ reliability ضعيفة، access بطيء، مساحة للـ pointers (ومنه نوع الـ FAT).<br><b>Indexed</b>: فيه index block لكل file فيه pointers للـ blocks بتاعته؛ random access من غير external fragmentation؛ overhead الـ index-block."
      },
      {
       "why": "الـ Topic 8، الـ slide 16.",
       "ans": "لما interrupt يحصل، الـ process الشغالة بتتقاطع و<b>الـ state بتاعتها بتتحفظ في الـ PCB بتاعها</b>. وبعدين الـ <b>interrupt service routine</b> بتشتغل عشان تتعامل مع الـ interrupt. لما تخلص، <b>الـ state بتاعة الـ process بترجع</b> والـ process بتكمّل. فالـ overheads هي تكلفة <b>حفظ واسترجاع الـ process state</b> (context switches) وكمان تنفيذ الـ handler (ونسخ الداتا)."
      }
     ]
    }
   ]
  },
  {
   "sections": [
    {
     "items": [
      {
       "why": "الـ Topic 1، الـ slides 12 و25.",
       "ans": "الـ <b>Interrupt</b>: غالبًا بيطلع من الـ <b>hardware</b> (زي device controller خلّص I/O)؛ asynchronous؛ بينقل التحكم للـ interrupt service routine عن طريق الـ interrupt vector.<br>الـ <b>Trap (exception)</b>: <b>interrupt جاي من الـ software</b> سببه يا <b>error</b> (القسمة على صفر، invalid memory access) يا <b>طلب من الـ user</b> لخدمة من الـ OS (system call)؛ synchronous مع البرنامج اللي شغال."
      },
      {
       "why": "ده بيجمع Topic 1 (الـ dual mode، الـ timer)، وTopic 4 (base/limit) والـ protection. أي تلات mechanisms متشرحين كويس بياخدوا الدرجات.",
       "ans": "(1) <b>الـ Dual-mode operation / الـ privileged instructions</b>: الـ user processes بتشتغل في الـ user mode ومش بتقدر تنفذ privileged instructions (زي الـ I/O والـ timer والـ memory-management registers)؛ الـ kernel بس هو اللي يقدر.<br>(2) <b>الـ Memory protection</b>: الـ base والـ limit (relocation) registers أو الـ page/segment tables، عشان الـ process توصل بس للـ address space بتاعها؛ وأي access تاني بيعمل trap.<br>(3) <b>حماية الـ CPU بالـ timer</b>: الـ timer بيعمل interrupt للـ process اللي بتشتغل وقت طويل أو بتلف للأبد، فالـ OS بيرجع ياخد التحكم ومفيش process تقدر تحتكر الـ CPU.<br>(وكمان: الـ I/O بس عن طريق system calls؛ والتحكم في الوصول للـ files بالـ user/group IDs.)"
      },
      {
       "why": "الـ Topic 2، الـ slide 5.",
       "ans": "<pre>new --admitted--> ready --scheduler dispatch--> running --exit--> terminated\nready <--interrupt-- running\nrunning --I/O or event wait--> waiting --I/O or event completion--> ready</pre>new: بتتعمل؛ ready: مستنية تاخد processor؛ running: الـ instructions بتتنفذ؛ waiting: مستنية event؛ terminated: خلصت."
      },
      {
       "why": "الـ Topic 2، الـ slides بتاعة الـ IPC.",
       "ans": "<b>Shared memory</b>: منطقة memory متشاركة بين الـ processes اللي عايزة تتواصل. التواصل تحت تحكم الـ user processes، مش الـ OS. المشكلة الكبيرة هي الـ synchronization بين أفعالهم (زي الـ bounded-buffer producer–consumer بالـ in/out indices، اللي يقدر يستخدم بس BUFFER_SIZE − 1 slots). وهو سريع.<br><b>Message passing</b>: الـ processes بتتواصل وتعمل synchronize من غير shared variables، باستخدام <code>send(message)</code> و <code>receive(message)</code> على communication link. الـ link يا physical (زي الـ shared memory والـ bus والـ network) يا logical، والـ logical يا direct بـ <code>send(P, msg)</code> يا indirect عن طريق mailboxes بـ <code>send(A, msg)</code>. والتواصل يا blocking (synchronous) يا non-blocking (asynchronous)، والـ buffering يا zero يا bounded يا unbounded."
      },
      {
       "why": "Topic 4.",
       "ans": "الـ <b>Paging</b>:<br>• الـ pages ثابتة الحجم ومش باينة للـ user.<br>• الـ address هو <bdi dir=\"ltr\">(p, d)</bdi>، وفيه page table.<br>• فيه internal fragmentation بس.<br>الـ <b>Segmentation</b>:<br>• الـ segments منطقية وأحجامها متغيرة (نظرة الـ user).<br>• الـ address هو <bdi dir=\"ltr\">(s, d)</bdi>، والـ segment table فيها base و limit.<br>• فيه external fragmentation بس، والـ protection والمشاركة بييجوا طبيعي لكل segment."
      },
      {
       "why": "الـ Topic 6، الـ slide 3.",
       "ans": "Mutual exclusion؛ hold and wait؛ no preemption؛ circular wait. الأربعة لازم يتحققوا مع بعض في نفس الوقت (شوف تعريفات Topic 6)."
      },
      {
       "why": "Topic 7.",
       "ans": "Contiguous (start + length؛ سريع؛ external fragmentation)، linked (list من blocks متفرقة بـ pointers؛ مفيش external fragmentation؛ direct access بطيء، reliability)، indexed (index block فيه pointers؛ random access؛ overhead للـ index)."
      },
      {
       "why": "Topic 8.",
       "ans": "بينقل blocks مباشرة بين الجهاز والـ memory من غير تدخل الـ CPU؛ interrupt واحد لكل block بدل لكل byte؛ بيفضّي الـ CPU لشغل تاني؛ مناسب للأجهزة السريعة اللي بتنقل بسرعة قريبة من سرعة الـ memory؛ أكفأ من الـ programmed I/O رغم الـ cycle stealing."
      }
     ]
    },
    {
     "items": [
      {
       "why": "ده الـ data set بتاع الكتاب (Silberschatz 5.x). مثال الـ priority في المحاضرة بيستخدم نفس الـ bursts بس P3 = 4 وP4 = 5، وده بيدّي نفس الـ chart بتاع 8.2.",
       "ans": "<b>FCFS</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P5</th></tr><tr><td>0–10</td><td>10–11</td><td>11–13</td><td>13–14</td><td>14–19</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>10</td><td>10</td><td><b>0</b></td></tr><tr><td>P2</td><td>1</td><td>11</td><td>11</td><td><b>10</b></td></tr><tr><td>P3</td><td>2</td><td>13</td><td>13</td><td><b>11</b></td></tr><tr><td>P4</td><td>1</td><td>14</td><td>14</td><td><b>13</b></td></tr><tr><td>P5</td><td>5</td><td>19</td><td>19</td><td><b>14</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>67/5 = 13.4</td><td><b>48/5 = 9.6</b></td></tr></table><b>SJF</b> (فيه تعادل بين P2 و P4 لأن الاتنين 1، فالـ P2 الأول)<table><tr><th>P2</th><th>P4</th><th>P3</th><th>P5</th><th>P1</th></tr><tr><td>0–1</td><td>1–2</td><td>2–4</td><td>4–9</td><td>9–19</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>19</td><td>19</td><td><b>9</b></td></tr><tr><td>P2</td><td>1</td><td>1</td><td>1</td><td><b>0</b></td></tr><tr><td>P3</td><td>2</td><td>4</td><td>4</td><td><b>2</b></td></tr><tr><td>P4</td><td>1</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>P5</td><td>5</td><td>9</td><td>9</td><td><b>4</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>35/5 = 7</td><td><b>16/5 = 3.2</b></td></tr></table><b>Non-preemptive priority</b> (الـ P1 والـ P3 الاتنين priority 3، فبترتيب الـ FCFS الـ P1 قبل الـ P3)<table><tr><th>P2</th><th>P5</th><th>P1</th><th>P3</th><th>P4</th></tr><tr><td>0–1</td><td>1–6</td><td>6–16</td><td>16–18</td><td>18–19</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>16</td><td>16</td><td><b>6</b></td></tr><tr><td>P2</td><td>1</td><td>1</td><td>1</td><td><b>0</b></td></tr><tr><td>P3</td><td>2</td><td>18</td><td>18</td><td><b>16</b></td></tr><tr><td>P4</td><td>1</td><td>19</td><td>19</td><td><b>18</b></td></tr><tr><td>P5</td><td>5</td><td>6</td><td>6</td><td><b>1</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>60/5 = 12</td><td><b>41/5 = 8.2</b></td></tr></table><b>RR (q = 1)</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P5</th><th>P1</th><th>P3</th><th>P5</th><th>P1</th><th>P5</th><th>P1</th><th>P5</th><th>P1</th><th>P5</th><th>P1</th></tr><tr><td>0–1</td><td>1–2</td><td>2–3</td><td>3–4</td><td>4–5</td><td>5–6</td><td>6–7</td><td>7–8</td><td>8–9</td><td>9–10</td><td>10–11</td><td>11–12</td><td>12–13</td><td>13–14</td><td>14–19</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>19</td><td>19</td><td><b>9</b></td></tr><tr><td>P2</td><td>1</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>P3</td><td>2</td><td>7</td><td>7</td><td><b>5</b></td></tr><tr><td>P4</td><td>1</td><td>4</td><td>4</td><td><b>3</b></td></tr><tr><td>P5</td><td>5</td><td>14</td><td>14</td><td><b>9</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>46/5 = 9.2</td><td><b>27/5 = 5.4</b></td></tr></table>أقل متوسط waiting time هو <b>SJF (3.2 ms)</b>."
      },
      {
       "why": "خلي بالك الـ partitions مختلفة عن المحاضرة (150 و250 بدل 100 و200). مع الـ first-fit، الـ 112K دلوقتي بيروح الـ partition اللي 150K (أول واحد ينفع)، مش الـ 288K المتبقي.",
       "ans": "<table><tr><th>Process</th><th>First-fit</th><th>Best-fit</th><th>Worst-fit</th></tr><tr><td>212K</td><td>500K (فاضل 288)</td><td>250K (فاضل 38)</td><td>600K (فاضل 388)</td></tr><tr><td>417K</td><td>600K (فاضل 183)</td><td>500K (فاضل 83)</td><td>500K (فاضل 83)</td></tr><tr><td>112K</td><td>150K (فاضل 38)</td><td>150K (فاضل 38)</td><td>الـ hole اللي 388K في الـ 600K (فاضل 276)</td></tr><tr><td>426K</td><td><b>لازم يستنى</b> (الـ holes 38، 288، 250، 300، 183)</td><td>600K (فاضل 174)</td><td><b>لازم يستنى</b> (أكبر hole هو 300)</td></tr></table>الـ <b>Best-fit</b> هو الأكفأ: هو الوحيد اللي بيحط الأربعة."
      },
      {
       "why": "دول أول 16 reference من string المحاضرة. الـ \"0,3\" الزيادة مقارنة بـ string الـ 2026 الاتنين hits، فالأعداد بتساوي إجابات 2026 (11 / 8 / 10).",
       "ans": "<b>FIFO = 11</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td>1</td><td><b>0</b></td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td></td><td></td><td>F</td></tr></table><br><b>Optimal = 8</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td><b>1</b></td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td></td><td></td><td>F</td><td></td><td></td><td></td><td></td><td>F</td></tr></table><br><b>LRU = 10</b><table><tr><th>Ref</th><th>7</th><th>0</th><th>1</th><th>2</th><th>0</th><th>3</th><th>0</th><th>4</th><th>2</th><th>3</th><th>0</th><th>3</th><th>0</th><th>3</th><th>2</th><th>1</th></tr><tr><td>F1</td><td><b>7</b></td><td>7</td><td>7</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td><b>4</b></td><td>4</td><td>4</td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>1</b></td></tr><tr><td>F2</td><td></td><td><b>0</b></td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td><b>3</b></td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td><td>3</td></tr><tr><td>F3</td><td></td><td></td><td><b>1</b></td><td>1</td><td>1</td><td><b>3</b></td><td>3</td><td>3</td><td><b>2</b></td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td><td>2</td></tr><tr><td>Fault</td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td>F</td><td></td><td>F</td><td>F</td><td>F</td><td>F</td><td></td><td></td><td></td><td></td><td>F</td></tr></table>"
      },
      {
       "why": "نفس الـ snapshot ده موجود في final 2024/25. شوف الورقة دي عشان الـ Work vectors خطوة بخطوة.",
       "ans": "<b>a. الـ Need</b>:<span class=\"ltr\">P0 0000, P1 0750, P2 1002, P3 0020, P4 0642</span><b>b.</b> الـ Work بيمشي كده:<span class=\"ltr\">Work 1520 → P0 → 1532 → P2 (1002 ≤ 1532) → 2886 → P3 (0020) → 2 14 11 8 → P4 (0642) → 2 14 12 12 → P1 (0750) → 3 14 12 12</span>السيستم <b>Safe</b>، والـ sequence هي <bdi dir=\"ltr\">&lt;P0, P2, P3, P4, P1&gt;</bdi>."
      }
     ]
    }
   ]
  },
  {
   "sections": [
    {
     "items": [
      {
       "why": "Topic 1.",
       "ans": "وسيط بين الـ user والـ hardware؛ resource allocator (بيدير الـ resources، ويحل الطلبات المتعارضة بكفاءة وعدل) وcontrol program (بيتحكم في التنفيذ عشان يمنع الأخطاء والاستخدام الغلط). الـ kernel هو البرنامج الوحيد اللي شغال طول الوقت؛ وأي حاجة تانية system program أو application program."
      },
      {
       "why": "الـ Topic 1، الـ slide 36.",
       "ans": "<b>Protection</b>: أي mechanism بيتحكم في access الـ processes أو الـ users للـ resources اللي الـ OS معرّفها (زي الـ user IDs، الـ group IDs، الـ file permissions، الـ memory protection).<br><b>Security</b>: دفاع السيستم ضد الهجمات الداخلية والخارجية زي الـ denial-of-service، الـ viruses، الـ identity theft والـ theft of service."
      },
      {
       "why": "الـ Topic 2، الـ slide 12.",
       "ans": "<b>I/O-bound</b>: بيقضي وقت في الـ I/O أكتر من الحسابات؛ CPU bursts قصيرة وكتير.<br><b>CPU-bound</b>: بيقضي وقت أكتر في الحسابات؛ CPU bursts قليلة وطويلة جدًا.<br>الـ long-term scheduler لازم يختار خلطة كويسة من الاتنين."
      },
      {
       "why": "الـ Topic 3، الـ slides 7–8.",
       "ans": "الـ CPU utilization (max)، الـ throughput (max: الـ processes اللي بتخلص في وحدة الزمن)، الـ turnaround time (min: وقت تنفيذ الـ process)، الـ waiting time (min: الوقت في الـ ready queue)، الـ response time (min: الوقت من الـ request لأول response)."
      }
     ]
    },
    {
     "items": [
      {
       "why": "كله بيوصل عند 0، فالـ WT = وقت البداية.",
       "ans": "<b>FCFS</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th></tr><tr><td>0–10</td><td>10–13</td><td>13–15</td><td>15–16</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>10</td><td>10</td><td><b>0</b></td></tr><tr><td>P2</td><td>3</td><td>13</td><td>13</td><td><b>10</b></td></tr><tr><td>P3</td><td>2</td><td>15</td><td>15</td><td><b>13</b></td></tr><tr><td>P4</td><td>1</td><td>16</td><td>16</td><td><b>15</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>54/4 = 13.5</td><td><b>38/4 = 9.5</b></td></tr></table><b>Priority</b><table><tr><th>P2</th><th>P3</th><th>P1</th><th>P4</th></tr><tr><td>0–3</td><td>3–5</td><td>5–15</td><td>15–16</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>15</td><td>15</td><td><b>5</b></td></tr><tr><td>P2</td><td>3</td><td>3</td><td>3</td><td><b>0</b></td></tr><tr><td>P3</td><td>2</td><td>5</td><td>5</td><td><b>3</b></td></tr><tr><td>P4</td><td>1</td><td>16</td><td>16</td><td><b>15</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>39/4 = 9.75</td><td><b>23/4 = 5.75</b></td></tr></table>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "الـ Topic 1، الـ slide 4.",
       "ans": "• الـ <b>Hardware</b>: الـ resources الأساسية للحسابات، زي الـ CPU والـ memory والـ I/O devices.<br>• الـ <b>operating system</b>: بيتحكم وينسّق استخدام الـ hardware بين الـ applications والـ users.<br>• الـ <b>application programs</b>: بتحدد إزاي الـ resources تتستخدم عشان تحل مشاكل الـ users، زي الـ word processors والـ compilers والـ browsers والـ databases والـ games.<br>• الـ <b>users</b>: ناس أو أجهزة أو كمبيوترات تانية."
      },
      {
       "why": "الـ Topic 1، الـ slides 26–27.",
       "ans": "الـ Dual-mode operation بتخلي الـ OS يحمي نفسه. فيه hardware <b>mode bit</b> بيفرّق بين الـ <b>kernel mode (0)</b> والـ <b>user mode (1)</b>. الـ Privileged instructions تتنفذ بس في الـ kernel mode. الـ system call بتحوّل لـ kernel mode، والرجوع بيرجّعه user mode. برامج الـ user بتشتغل في الـ user mode بـ access محدود؛ والـ OS بيشتغل في الـ kernel mode بـ access كامل."
      },
      {
       "why": "Topic 2.",
       "ans": "الـ Short-term: بيختار الـ ready process الجاية للـ CPU؛ كتير جدًا (ms)؛ لازم يبقى سريع. الـ Long-term: بيختار أنهي processes تدخل الـ ready queue؛ قليل (ثواني، دقايق)؛ بيتحكم في الـ degree of multiprogramming."
      },
      {
       "why": "Topic 3.",
       "ans": "الـ Non-preemptive: الـ CPU بيتساب بس لما الـ process تخلص أو تستنى (الحالات 1 و4). الـ Preemptive: الـ CPU ممكن كمان يتاخد لما الـ process تروح ready (الحالات 2 و3)، زي الـ timer أو priority أعلى؛ وممكن يعمل race conditions."
      }
     ]
    },
    {
     "items": [
      {
       "why": "في الـ RR لما q = 1، الـ P4 بتخلص عند 4، وP3 عند 7، وP2 عند 9، وP1 بتشتغل لوحدها من 9 لـ 16. الـ SJF (2.5) أحسن من الـ RR (5).",
       "ans": "<b>SJF</b><table><tr><th>P4</th><th>P3</th><th>P2</th><th>P1</th></tr><tr><td>0–1</td><td>1–3</td><td>3–6</td><td>6–16</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>16</td><td>16</td><td><b>6</b></td></tr><tr><td>P2</td><td>3</td><td>6</td><td>6</td><td><b>3</b></td></tr><tr><td>P3</td><td>2</td><td>3</td><td>3</td><td><b>1</b></td></tr><tr><td>P4</td><td>1</td><td>1</td><td>1</td><td><b>0</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>26/4 = 6.5</td><td><b>10/4 = 2.5</b></td></tr></table><b>RR (q = 1)</b><table><tr><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P1</th><th>P2</th><th>P3</th><th>P1</th><th>P2</th><th>P1</th></tr><tr><td>0–1</td><td>1–2</td><td>2–3</td><td>3–4</td><td>4–5</td><td>5–6</td><td>6–7</td><td>7–8</td><td>8–9</td><td>9–16</td></tr></table><table><tr><th>Process</th><th>Burst</th><th>Completion</th><th>Turnaround = CT − AT</th><th>Waiting = TAT − BT</th></tr><tr><td>P1</td><td>10</td><td>16</td><td>16</td><td><b>6</b></td></tr><tr><td>P2</td><td>3</td><td>9</td><td>9</td><td><b>6</b></td></tr><tr><td>P3</td><td>2</td><td>7</td><td>7</td><td><b>5</b></td></tr><tr><td>P4</td><td>1</td><td>4</td><td>4</td><td><b>3</b></td></tr><tr><td><b>Average</b></td><td></td><td></td><td>36/4 = 9</td><td><b>20/4 = 5</b></td></tr></table>"
      }
     ]
    }
   ]
  }
 ]
};

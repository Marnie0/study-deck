window.AR = window.AR || {};
AR.fp = { lectures: {}, exams: [] };

/* ===================== Lecture 1 ===================== */
AR.fp.lectures["1"] = {
  notes: [
    { h: `الفرق بين الـ data structure والـ file structure`, pts: [
      `الاتنين فيهم <b>طريقة تمثيل للداتا</b> + <b>عمليات للوصول للداتا</b>.`,
      `الفرق: الـ data structures بتتعامل مع الداتا اللي في الـ <b>main memory</b>، أما الـ file structures فبتتعامل مع الداتا اللي على الـ <b>secondary storage</b> (يعني الـ files).`,
      `المرجع الأساسي: كتاب <i>File Structures: An Object-Oriented Approach with C++</i> بتاع Folk وZoellick وRiccardi.`
    ]},
    { h: `(1) الـ Data processing و(2) الـ files`, pts: [
      `الـ Data processing = <b>تخزين</b> (storage) و<b>تنظيم</b> (organization) و<b>وصول</b> (access) و<b>معالجة</b> (processing) للداتا.`,
      `الداتا بتتحفظ في files، والـ files بتتحفظ على primary storage (الـ RAM) أو secondary storage (الـ hard disk). والتنظيم يا إما <b>sequential</b> access يا إما <b>direct</b> access.`,
      `الـ <b>File</b> = مجموعة داتا متحطوطة على storage <b>secondary و non-volatile</b> (يعني مش بتضيع لما الكهربا تقطع)، زي الـ hard disk والـ magnetic tape والـ optical media.`,
      `تخزين الـ files بطيء عشان فيه <b>أجزاء كتير بتتحرك</b> (moving parts).`,
      `ليه محتاجين files؟ لإنها الطريقة الوحيدة المناسبة لتخزين كمية معلومات كبيرة (صور، مزيكا، فيديو)؛ والـ operating systems أكبر من إنها تدخل كلها في الـ memory؛ والـ databases موجودة في كل حتة؛ وكمان عشان الـ backup والـ archiving.`
    ]},
    { h: `(3) الـ File structures، (4) الـ organization، (5) الـ management، (6) الـ managers`, pts: [
      `الـ <b>Logical structure</b>: الـ programmer شايف الـ file إزاي (text، image، data file…). الـ <b>Physical structure</b>: الـ file متخزن إزاي فعلًا على الـ secondary storage.`,
      `<b>طرق الـ logical organization</b>: الـ heap والـ indexing والـ hashing. <b>طرق الـ physical organization</b>: إننا ننظم الـ tracks بالـ <b>sectors</b> أو بالـ <b>blocks</b>.`,
      `طرق تنظيم الـ file لازم توفر <b>access time سريع</b> و<b>استغلال كويس للمساحة</b> (good space utilization).`,
      `الـ <b>File management</b> بيشمل: تجهيز/عمل format للـ storage media؛ حجز مساحة التخزين والـ addressing؛ وإدارة المساحة الفاضية (free space).`,
      `الـ <b>File managers</b> (دي system software): الـ <b>OS</b> والـ <b>DBMS</b>.`,
      `أهداف المادة: نجيب المعلومة بـ <b>أقل عدد ممكن من الـ disk accesses</b>، ونجمّع المعلومات اللي ليها علاقة ببعض عشان أي طلب يحتاج <b>رحلة واحدة بس للـ disk</b>.`
    ]},
    { h: `الـ Physical file مقابل الـ logical file` },
    { h: `فتح الـ files`, pts: [
      `الـ Opening بيجهز الـ file للاستخدام: يا إما تفتح file موجود يا إما تعمل file جديد. بعد ما تفتح بتكون واقف في <b>أول</b> الـ file.`,
      `في C: <code>FILE *outFile; outFile = fopen("A.txt", "w");</code> (الـ logical name هو outFile، والـ physical file هو "A.txt"، والـ mode هو "w").`,
      `في C++: <code>fstream outfile; outfile.open("myfile.txt", ios::out);</code>. والـ mode flags بتتجمع مع بعض بالـ bitwise OR <code>|</code>.`,
      `الـ modes في C: <b>"r"</b> يفتح file موجود للقراية؛ <b>"w"</b> يعمل file جديد أو يفضّي (truncate) الموجود للـ output؛ <b>"a"</b> يعمل file جديد أو يزوّد (append) على الموجود للـ output؛ <b>"r+"</b> file موجود للـ input والـ output؛ <b>"w+"</b> يعمل/يفضّي للـ input والـ output؛ <b>"a+"</b> يعمل/يعمل append للـ input والـ output؛ ولو زوّدت <b>b</b> (rb، wb، ab، r+b…) يبقى معناها <b>binary mode</b>.`,
      `الـ flags في C++: <code>ios::in</code> للـ input، <code>ios::out</code> للـ output، <code>ios::app</code> يعمل seek للآخر قبل كل write، <code>ios::ate</code> يبدأ وهو واقف في الآخر، <code>ios::trunc</code> دايمًا يعمل file جديد (truncate)، <code>ios::binary</code> للـ binary mode.`
    ]},
    { h: `الـ C mode ↔ الـ C++ flags` },
    { h: `قفل الـ files`, pts: [
      `الـ Closing بيحرر الـ logical name عشان يتربط بـ physical file تاني، "زي ما بتقفل السكة بعد ما تخلص المكالمة".`,
      `الـ bytes مش بتتبعت واحدة واحدة. بتتجمع في <b>buffer</b> وتتبعت مرة واحدة كـ <b>block</b>.`,
      `لو مقفلتش الـ file، الـ OS هيقفله في آخر البرنامج. بس لو البرنامج <b>وقع فجأة (terminated abnormally) ممكن الداتا تضيع</b>.`
    ]},
    { h: `القراية والكتابة`, pts: [
      `بشكل عام: <code>Read(Source_file, Destination_addr, Size)</code> و<code>Write(Destination_file, Source_addr, Size)</code>.`,
      `<code>fgetc(fp)</code> بتقرا character واحد. <code>fgets(str, n, fp)</code> بتقرا string (أقصى حاجة n-1 characters). <code>fscanf(fp, "fmt", vars)</code> بتقرا formatted text. <code>fread(&amp;blk, size, count, fp)</code> بتقرا record/block.`,
      `الـ arguments بتاعة fread/fwrite: 1) عنوان الـ variable، 2) حجم العنصر بالـ bytes، 3) عدد العناصر، 4) الـ logical file name.`,
      `في C++: <code>infile &gt;&gt; c;</code> أو <code>infile.read(&amp;c,1);</code> / <code>infile.read(a,10);</code>. وللكتابة: <code>outfile &lt;&lt; c;</code>، <code>outfile.write(&amp;c,1);</code>، <code>outfile.write(a,10);</code>.`,
      `آخر الـ file (EOF): في C الـ <code>fread</code> بترجع <b>0</b>؛ في C++ الـ <code>infile.fail()</code> بترجع true، أو <code>infile.eof()</code> بترجع true.`
    ]},
    { h: `الـ logical names بتاعة الـ Standard I/O` },
    { h: `مثال: قراية employee records (بـ C)`, pts: [
      `الـ Algorithm: افتح الـ file للـ input ← طول ما فيه characters/records، اقرا واحد واطبعه على الشاشة ← اقفل الـ file.`,
      `نصيحة: <code>while(!feof())</code> مش بتبقى true غير <i>بعد</i> ما قراية تفشل، فممكن آخر record يتطبع مرتين. الأأمن إنك تشيك على <code>fread(...) == 1</code>. وكمان السلايدز بتطبع <code>%f</code> لـ int؛ استخدم <code>%d</code>.`
    ]}
  ],
  cards: [
    `مجموعة داتا متحطوطة على secondary storage (يعني non-volatile).`,
    `الـ DS: داتا في الـ main memory. الـ FS: داتا في الـ secondary storage.`,
    `الـ Logical: الـ programmer شايف الـ file إزاي. الـ Physical: الـ file متخزن إزاي على الـ disk.`,
    `الـ Heap والـ indexing والـ hashing.`,
    `تنظيم الـ tracks بالـ sectors أو بالـ blocks.`,
    `access time سريع واستغلال كويس للمساحة (good space utilization).`,
    `الـ OS والـ DBMS.`,
    `bytes على الـ disk ليها physical name (A.txt)؛ بتستخدم مرة واحدة بس، وقت الـ open.`,
    `variable في البرنامج (fp، infile) بيمثل channel للـ physical file؛ بيستخدم مرات كتير.`,
    `يعمل file جديد أو يفضّي (truncate) الموجود، للـ input والـ output.`,
    `يعمل file جديد أو يعمل append على الموجود، للـ output.`,
    `الـ app: يعمل seek للآخر قبل <b>كل</b> write. الـ ate: بيبدأ وهو واقف في الآخر بس.`,
    `في C: الـ fread بترجع 0. في C++: الـ infile.fail() أو infile.eof() بترجع true.`,
    `بيحرر الـ logical name، وبيعمل flush للـ buffer؛ ولو البرنامج وقع فجأة ممكن الداتا تضيع.`
  ],
  qa: [
    `الـ Physical file: مجموعة bytes على الـ disk ليها physical name (A.txt)، وبتستخدم مرة واحدة وقت الـ opening. الـ Logical file: channel بيوصل البرنامج بالـ physical file، والـ logical name بتاعه variable في البرنامج (infile، fp)، وبيستخدم مرات كتير في الـ open والـ read والـ write والـ append والـ close.`,
    `لإنها الطريقة الوحيدة المناسبة لتخزين كمية معلومات كبيرة زي الصور والمزيكا والفيديو؛ والـ operating systems أكبر من إنها تتحمل كلها في الـ memory؛ والـ databases في كل حتة؛ وكمان عشان الـ backup والـ archiving.`,
    `تجهيز/عمل format للـ storage media، وحجز مساحة التخزين والـ addressing، وإدارة الـ free space.`,
    `الـ OS هيقفله في آخر التنفيذ، بس لو البرنامج وقع فجأة (terminated abnormally) الداتا اللي في الـ buffer ممكن تضيع.`,
    `الحل: <code>void writeC(){ FILE *fp = fopen("c:\\\\alphabet.txt","w"); if(fp==NULL){ printf("Error in opening file"); exit(1);} char ch = getche(); fputc(ch, fp); fclose(fp); }</code>`,
    `الحل: <code>FILE *f = fopen("c:\\\\std.txt","r"); if(f==NULL){...} char s[80]; while(1){ fgets(s,80,f); if(feof(f)) break; puts(s);} fclose(f);</code>`
  ],
  quiz: [
    [`دي نص الإجابة بس: الـ OS فعلاً من اللي بيديروا الـ files، بس الـ DBMS كمان بيدير files، فالإجابة الكاملة "Both a and b" (L1, File managers).`, `دي نص الإجابة بس: الـ DBMS فعلاً بيدير files، بس الـ OS كمان بيديرها، فالإجابة الكاملة "Both a and b" (L1, File managers).`, `الـ MIS ده information system، مش file manager.`, `صح. الـ files بيديرها الـ OS والـ DBMS.`],
    [`صح. المحاضرة بتقول إن الـ file organization methods لازم توفر fast access time و good space utilization، يعني disk accesses قليلة ومساحة مهدرة قليلة (L1, File organization).`, `تجهيز/formatting الـ storage media ده متحط تحت الـ file MANAGEMENT، مش من اللي الـ organization method لازم توفره (fast access و good space use) (L1, File management).`, `الـ allocating للـ storage space والـ addressing دي مهمة من مهام الـ file MANAGEMENT؛ الـ organization methods لازم توفر fast access time و good space utilization (L1).`, `إدارة الـ free space دي تالت مهمة من مهام الـ file MANAGEMENT؛ الـ organization methods بنحكم عليها بالـ fast access time والـ good space utilization (L1).`],
    [`مجموعة bytes متخزنة على disk ده تعريف الـ PHYSICAL file؛ الـ logical file هو القناة اللي البرنامج بيوصل بيها للـ physical file (L1, Physical vs logical file).`, `صح. وبيتسمى بـ variable في البرنامج زي fp أو infile.`, `اسم على الـ disk زي A.txt ده الـ physical name بتاع الـ physical file؛ الـ logical name هو variable في البرنامج زي fp أو infile (L1).`, `المادة عمرها ما عرّفت الـ logical file إنه backup؛ هو القناة (variable في البرنامج) اللي بتربط البرنامج بالـ physical file (L1).`],
    [`صح. الـ fopen بتاخد اسم الـ file والـ mode وبترجع FILE*.`, `الـ fopen محتاجة two arguments: اسم الـ file والـ mode string ("r"، "w"، "a"…)؛ من غير الـ mode الـ file مش هيتفتح (L1, Opening files).`, `الـ function بتاعة مكتبة C اسمها fopen مش open؛ المادة بتكتب outFile = fopen("A.txt", "w")، وبترجع FILE* (L1, Opening files).`, `غلط في كل حتة: الـ function اسمها fopen، وبترجع pointer يعني FILE*، وبتاخد اسم الـ file والـ mode الاتنين (L1, Opening files).`],
    [`ده الـ mode "w": بيعمل create/truncate للـ OUTPUT بس. الـ + بتضيف الـ input، فالـ "w+" بيسمح بالقراية والكتابة مع بعض (L1, C modes).`, `صح. الـ w+ = يعمل file جديد أو يفضّي الموجود، للـ input والـ output.`, `إنك تحتفظ بالمحتوى القديم وانت بتكتب ده "a" (append). الـ "w+" بيعمل truncate للـ file الموجود، فبيمسح محتواه (L1, C modes).`, `الـ update مع الاحتفاظ بالمحتوى ده "a+" (create/append للـ input والـ output). الـ "w+" بيعمل truncate، فالمحتوى القديم بيضيع (L1, C modes).`],
    [`الـ text mode هو الـ default لما مفيش b؛ لما تضيف b (rb، wb، ab، r+b) بتقلب على الـ binary mode (L1, C modes).`, `مفيش حاجة اسمها "big text" mode؛ المعنى الوحيد لحرف b في الـ mode string هو binary (L1, C modes).`, `صح. لما تضيف b بعد حرف الـ mode (rb، wb، ab، r+b…) الـ file بيتفتح binary mode؛ والمقابل في C++ هو | ios::binary (L1, C modes).`, `"Blueprint" مش file mode أصلاً؛ الـ b في mode string زي "rb" معناها binary mode (L1, C modes).`],
    [`الـ ofstream ده file stream للـ OUTPUT بس (الـ default بتاعه ios::out)، فمينفعش يتستخدم للـ input والـ output مع بعض (L1, C++ file streams).`, `الـ ifstream ده file stream للـ INPUT بس (الـ default بتاعه ios::in)، فمبيكتبش؛ اللي بيعمل الاتنين هو fstream (L1, C++ file streams).`, `الـ iostream ده الـ header/class بتاع الـ console I/O (cin، cout)؛ الـ file streams اللي بتعمل input و output جاية من fstream (L1, C++ file streams).`, `صح. الـ fstream ينفع يتفتح للـ input والـ output مع بعض، مثلاً open("f.txt", ios::in | ios::out)؛ الـ ifstream للـ input بس والـ ofstream للـ output بس (L1, Opening files).`],
    [`صح. الـ ifstream هو الـ input file stream، فلما متديهوش mode بيفتح بـ ios::in (قراية) (L1, C++ file streams).`, `الـ ios::out ده الـ default بتاع ofstream (الـ output stream)؛ الـ ifstream معمول للـ input، فالـ default بتاعه ios::in (L1).`, `الـ ios::app (يروح لآخر الـ file قبل كل write) ده output flag لازم تطلبه صراحة؛ مش default لأي stream، والـ ifstream الـ default بتاعه ios::in (L1).`, `الـ ios::trunc (دايماً يعمل file جديد فاضي) ده output flag؛ ملوش معنى في القراية، والـ default بتاع ifstream هو ios::in (L1).`],
    [`صح. الـ origins هي ios::beg وios::cur وios::end. مفيش حاجة اسمها ios::set.`, `الـ ios::end ده seek origin صحيح: الـ offset بيتحسب من آخر الـ file. اللي مش موجود هو ios::set (L1, Summary MCQ).`, `الـ ios::cur ده seek origin صحيح: الـ offset بيتحسب من الـ position الحالي. اللي مش صحيح هو ios::set (L1, Summary MCQ).`, `الـ ios::beg ده seek origin صحيح: الـ offset بيتحسب من أول الـ file. الـ ios::set ده مش موجود أصلاً (L1, Summary MCQ).`],
    [`إن fread ترجع 0 دي طريقة اكتشاف الـ end of file في C مش C++؛ في C++ الـ infile.fail() أو infile.eof() بترجع true (L1, Reading and writing).`, `صح. المحاضرة بتقول إن في C++ الـ end of file بيتعرف لما infile.fail() ترجع true، أو infile.eof() ترجع true؛ وفي C الـ fread بترجع 0 (L1, Reading and writing).`, `الـ close() بتحرر الـ logical name وبتعمل flush للـ buffer بس؛ مبتقولكش إنك وصلت للـ end of file. استخدم infile.fail() أو infile.eof() (L1).`, `الـ cout بيكتب على الشاشة بس؛ مبيكتشفش أي حاجة. الـ EOF في C++ بيتعرف بـ infile.fail() أو infile.eof() (L1).`],
    [`الـ fget() مش function في مكتبة C؛ الـ function اللي بتقرا string هي fgets(str, n, fp)، والـ fgetc بتقرا character واحد (L1, Reading).`, `صح. الـ fgets(str, n, fp) بتقرا لحد n-1 characters وبتحط '\\0' في الآخر.`, `الـ fput() مش standard function، وأي حاجة اسمها put بتكتب مش بتقرا؛ اللي بتقرا هي fgets() (L1).`, `الـ fputs() بتكتب string في الـ file؛ السؤال عن قراية n−1 characters بالكتير، ودي fgets() (L1).`],
    [`الـ stdout ده الـ logical name في C للـ standard output (الشاشة)، مش الـ standard error (L1, Standard I/O names).`, `الـ stdin ده الـ logical name في C للـ standard input (الـ keyboard)، مش الـ standard error (L1, Standard I/O names).`, `صح. في جدول الـ standard I/O، الـ standard error (الـ console/الشاشة) اسمه stderr في C و cerr في C++ (L1, Standard I/O names).`, `الـ cerr فعلاً standard error، بس ده الـ logical name في C++؛ السؤال عن C، واسمه stderr (L1, Standard I/O names).`]
  ],
  extra: [
    [`صح. الـ "a" بيفتح file موجود (أو يعمل واحد جديد) للـ output ويعمل append في الآخر.`, `ده اللي "w" بيعمله: بيفضّي (truncate) الـ file الموجود قبل الكتابة.`, `ده يبقى "r+" مع الكتابة من الأول. الـ "a" عمره ما بيكتب فوق الداتا الموجودة.`, `الـ "a" ده output mode (create أو append)، فالـ 20 bytes هيتكتبوا في آخر الـ file. القراية بس ده الـ mode "r" (L1, C modes).`],
    [`الـ ios::in لوحده input بس، يعني المقابل لـ "r". الـ "r+" محتاج input و output: ios::out | ios::in (L1, C mode ↔ C++ flags).`, `صح. الـ "r+" بيفتح file موجود للـ input والـ output.`, `لو زوّدت trunc يبقى "w+"، وده بيمسح المحتوى الموجود.`, `الـ ios::out | ios::app ده شكل C++ لـ "a" (output بس مع append)، من غير input؛ الـ "r+" هو ios::out | ios::in (L1, C mode ↔ C++ flags).`],
    [`الـ w+ بيعمل file جديد أو يفضّي الموجود، فكل الـ records الموجودة هتضيع.`, `الـ "a" ده output بس، وكل write بتروح للآخر، فمش هتقدر تقرا ولا تكتب فوق records.`, `صح. الـ r+ بيفتح file موجود للـ input والـ output، والـ b بتخليه binary. والمثال اللي في السلايدز بيستخدم الـ mode ده.`, `الـ "r" ده input بس، فمش هتقدر تكتب فوق الـ records.`],
    [`حجم العنصر هو الـ argument التاني، sizeof(blk).`, `الـ fread مفيهاش offset argument. تحديد المكان بيتعمل بالـ fseek.`, `الـ logical file name هو الـ argument الرابع، fp.`, `صح. الـ arguments هي: عنوان الـ variable، حجم العنصر، عدد العناصر، الـ logical file name.`],
    [`ده وصف ios::app. الـ ios::ate بيحطك في الآخر مرة واحدة بس، وقت ما الـ file يتفتح.`, `صح. الـ ios::ate = بيبدأ وهو واقف في الآخر؛ الـ ios::app = يعمل seek للآخر قبل كل write.`],
    [`صح. الـ logical file هو الـ variable اللي في البرنامج (الـ channel)؛ والـ physical file هو الاسم اللي على الـ disk.`, `معكوسة. الـ physical name هو الاسم المتخزن على الـ disk.`, `الـ outfile ده variable في البرنامج، يبقى logical name.`, `الـ ios::out ده الـ opening mode (output)، مش اسم؛ الـ logical name هو outfile والـ physical name هو "myfile.txt" (L1, Opening files).`],
    [`الـ Heap طريقة LOGICAL organization (هي والـ indexing والـ hashing)؛ الطرق الـ physical بتنظم الـ tracks بالـ sectors أو بالـ blocks (L1).`, `صح. الطرق الـ physical بتنظم الـ tracks بالـ sectors أو بالـ blocks.`, `الـ Indexing طريقة LOGICAL organization؛ الـ physical organization بتتكلم عن الـ tracks المتنظمة بالـ sectors أو بالـ blocks (L1).`, `الـ Hashing طريقة LOGICAL organization (هي والـ heap والـ indexing)؛ الطرق الـ physical بتنظم الـ tracks بالـ sectors أو بالـ blocks (L1).`],
    [`أول fread بتقرا record 1 عادي؛ مفيش حاجة بتتنط.`, `الـ feof فعلًا بتبقى true أول ما قراية توصل للآخر، فالـ loop بتخلص.`, `صح. الـ feof مش بتبقى true غير <b>بعد</b> ما قراية تفشل، فبيحصل iteration زيادة بيطبع المحتوى القديم بتاع emp تاني. الأأمن إنك تشيك على fread(...) == 1.`, `في آخر الـ file الـ fread بترجع 0 (عدد الـ elements اللي اتقرت)، مش 1. الـ 0 ده هو الـ EOF check اللي تعتمد عليه في C (L1, Reading and writing).`],
    [`السلايدز بتقول إن الـ bytes مش بتتبعت واحدة واحدة.`, `صح. الـ bytes بتتجمع في buffer وتتبعت كـ block، وعشان كده لو البرنامج وقع فجأة قبل الـ close ممكن الداتا تضيع.`],
    [`الـ cout ده الـ standard output في C++، ومتوصل بالـ console/الشاشة، مش الـ keyboard (L1, Standard I/O names).`, `الـ cerr ده الـ standard error في C++، وبرضه متوصل بالـ console/الشاشة؛ الـ keyboard هو الـ standard input يعني cin (L1, Standard I/O names).`, `الـ stdin ده الاسم بتاع C للـ standard input، مش بتاع C++.`, `صح. الـ standard input (الكيبورد) اسمه stdin في C وcin في C++.`]
  ]
};

/* ===================== Lecture 2 ===================== */
AR.fp.lectures["2"] = {
  notes: [
    { h: `أجهزة الـ Secondary storage`, pts: [
      `الـ <b>DASD</b> (Direct Access Storage Devices): الـ <b>magnetic disks</b> (hard disk، floppy) والـ <b>optical disks</b> (CD-ROM، CD-R، CD-RW، DVD).`,
      `الـ <b>SASD</b> (Serial Access Storage Devices): الـ <b>magnetic tape</b>.`
    ]},
    { h: `مكونات الـ Disk`, pts: [
      `<b>1. الـ Platter</b>: disk دايرية بتخزن داتا magnetic على <b>الوشين</b>. كل وش متقسم لـ <b>tracks</b> دواير جوا بعض (آلاف في كل platter)، وكل track متقسم لـ <b>sectors</b>.`,
      `الـ <b>sector</b> هو <b>أصغر جزء ليه address</b> في الـ disk، وغالبًا حجمه <b>512 bytes</b>.`,
      `الـ <b>cluster</b> هو عدد ثابت من الـ <b>sectors اللي ورا بعض</b> (contiguous). وده الشكل اللي الـ OS file manager شايف بيه الـ file.`,
      `الـ <b>cylinder</b> هو مجموعة الـ tracks اللي فوق/تحت بعض بالظبط. كل الداتا اللي على cylinder واحد تتقري <b>من غير ما الـ arm يتحرك</b>. عدد الـ cylinders = عدد الـ tracks في كل surface.`,
      `يعني الـ platter ليه 4 مكونات: sector، cluster، track، cylinder.`,
      `<b>2. الـ Read/write heads</b> بتطير فوق الـ surface بمسافة ممكن توصل لـ <b>3 nanometers</b> بس. وكل surface ليه الـ head بتاعه.`,
      `<b>3. الـ Arm assembly</b> شايل الـ arms والـ heads. لو وقف عن الشغل، الـ drive كله بيبوظ. وقت القراية، الـ OS بيلاقي الـ platter والـ track والـ sector، ويقرا <b>الـ sector كله في buffer</b>، وبعدين يلاقي الـ byte.`,
      `<b>4. الـ Spindle</b> بيمسك الـ platters في مكان ثابت و<b>يلفّها</b>، فيجيب الـ sector تحت الـ head.`,
      `<b>5. الـ Arms</b> بتشيل الـ heads وتوجهها وتحركها. تحريك الـ arm اسمه <b>seeking</b>، وده غالبًا <b>أبطأ</b> جزء.`
    ]},
    { h: `قوانين الـ Capacity` },
    { h: `مسألة محلولة (سلايدز 22–26)`, pts: [
      `المعطيات: 90,000 record طولهم ثابت 256 B؛ 512 B/sector؛ 60 sectors/track؛ الـ cylinder height = 14 tracks؛ 5000 tracks/surface؛ 4 sectors/cluster.`,
      `الـ Platters = 14/2 = <b>7</b>؛ الـ sides = <b>14</b>؛ حجم الـ track = 60×512 = <b>30,720 B</b>؛ الـ cylinders = <b>5000</b>.`,
      `حجم الـ cylinder = 14 × 30,720 = <b>430,080 B</b>؛ الـ sectors في الـ cylinder = 430,080/512 = <b>840</b>.`,
      `حجم الـ file = 90,000 × 256 = <b>23,040,000 B</b>. الـ records/sector = 512/256 = <b>2</b>؛ الـ records/track = 30,720/256 = <b>120</b>؛ الـ records/cylinder = 430,080/256 = <b>1680</b>.`,
      `الـ sectors اللي الـ file محتاجها = 23,040,000/512 = <b>45,000</b>؛ الـ tracks = 23,040,000/30,720 = <b>750</b>؛ الـ cylinders = 23,040,000/430,080 = <b>53.57</b> (يعني 54 cylinder كاملين).`,
      `الـ capacity بتاعة الـ drive = 5000 × 430,080 = <b>2,150,400,000 B</b>.`
    ]},
    { h: `تنظيم الـ tracks بالـ sectors مقابل بالـ blocks`, pts: [
      `<b>بالـ sectors</b>: بيستخدمها الـ <b>OS</b>. الـ access بطيء وفيه <b>fragmentation</b>، يعني مساحة بتضيع جوا الـ sector لما الـ records متجيش مظبوطة عليه (مثلًا record حجمه 300 B في sector حجمه 512 B). بعض الـ OSs بتسمح بالـ clusters.`,
      `<b>بالـ blocks</b>: بيستخدمها الـ <b>DBMS</b>. الـ tracks بتتقسم لـ blocks (pages) الـ user هو اللي بيحدد حجمها، وكل block فيه عدد صحيح من الـ records.`,
      `الـ <b>Blocking factor</b> = عدد الـ records اللي متخزنة في كل block. مفيش internal fragmentation ومفيش record بيتقسم على 2 blocks.`,
      `كل block فيه <b>sub-blocks</b>: الـ <b>count</b> sub-block (عدد الـ bytes في الـ block)، والـ <b>key</b> sub-block (اختياري؛ فيه الـ key بتاع آخر record، عشان الـ controller يقدر يدوّر من غير ما يحمّل الـ block) والـ <b>data</b> sub-block (فيه الـ records).`
    ]},
    { h: `الـ Non-data overhead`, pts: [
      `مساحة مستخدمة لحاجات غير الداتا.`,
      `في التنظيم بالـ sectors: الـ sector address والـ track address والـ condition (هل هو بايظ؟) في أول كل sector، وكمان الـ gaps اللي بين الـ sectors.`,
      `في التنظيم بالـ blocks: الـ sub-blocks والـ inter-block gaps، فبيبقى فيه non-data overhead <b>أكتر</b> من الـ sector addressing.`,
      `<b>تمرين</b>: الـ track = 20,000 B، الـ overhead = 300 B/block، الـ record = 100 B.<br>لو BF = 10: الـ block = 1000+300 = 1300؛ ⌊20,000/1300⌋ = ⌊15.38⌋ = 15 block، يعني <b>150 records/track</b>.<br>لو BF = 60: الـ block = 6000+300 = 6300؛ ⌊20,000/6300⌋ = ⌊3.17⌋ = 3 blocks، يعني <b>180 records/track</b>.`
    ]},
    { h: `تكلفة الـ disk access`, pts: [
      `الـ <b>Seek time</b>: الوقت اللي الـ arm بياخده عشان يروح للـ cylinder الصح. ده <b>أكبر</b> تكلفة. القيم المعتادة: 5 ms من track للي جنبه، 50 ms أقصى حاجة، 30 ms في المتوسط.`,
      `الـ <b>Rotational delay (latency)</b>: الوقت اللي الـ disk بياخده عشان يلف ويجيب الـ sector تحت الـ head. عند 5000 rpm اللفة الواحدة بـ 12 ms. والمتوسط عادةً 6–8 ms.`,
      `الـ <b>Transfer time</b>: الوقت اللي الـ head بياخده وهو بيعدي على الداتا. لو فيه 63 sector في الـ track، الـ sector الواحد بياخد 1/63 من اللفة.`
    ]},
    { h: `مثال 1 ومثال 2`, pts: [
      `<b>مثال 1</b>: seek 8 ms، avg latency 3 ms، 10,000 rpm، 170 sectors/track. الـ Transfer = (60,000/10,000)/170 = 6/170 ≈ <b>0.035 ms</b>. الـ Total = 8 + 3 + 0.035 = <b>11.035 ms</b>.`,
      `<b>مثال 2</b> (Seagate ST3200822A: 200 GB، 7200 rpm، avg seek 8.5 ms، avg latency 4.16 ms، 170 sectors/track). الـ Transfer = (60,000/7200)/170 = 8.33/170 ≈ <b>0.05 ms</b>. الـ Total = 8.5 + 4.16 + 0.05 = <b>12.71 ms</b>.`
    ]},
    { h: `الـ Disk كـ bottleneck`, pts: [
      `الـ processes كتير بتبقى <b>disk-bound</b>: يعني الـ network والـ CPU بيستنوا الـ disk وقت طويل. الحلول:`,
      `<b>1. الـ Multiprocessing</b>: الـ CPU يشتغل على jobs تانية وهو مستني الـ disk.`,
      `<b>2. الـ Disk striping</b>: نحط blocks مختلفة من الـ file على drives مختلفة، عشان الـ processes المستقلة متعطلش بعض (parallelism).`,
      `<b>3. الـ RAID</b>: Redundant Array of Independent Disks.`,
      `<b>4. الـ RAM disk</b> (memory disk): جزء من الـ main memory بيعمل نفسه disk (سرعة مقابل إن الداتا volatile).`,
      `<b>5. الـ Disk cache</b>: حتة كبيرة من الـ memory شايلة pages من الـ disk. بنشيك على الـ cache الأول، ولو مش موجودة (miss) نروح للـ disk.`
    ]},
    { h: `Quiz (2) محلول`, pts: [
      `المعطيات: 20 surface، 800 tracks/surface، 25 sectors/track، 512 B/sector، 3600 rpm، الـ seek: 7 ms من track للي جنبه، 28 ms في المتوسط، 50 ms أقصى حاجة.`,
      `اللفة = 60,000/3600 = 16.67 ms، يبقى <b>الـ average latency = 8.33 ms</b>.`,
      `<b>الـ Disk capacity</b> = 20 × 800 × 25 × 512 = <b>204,800,000 B ≈ 195.3 MB</b>.`,
      `<b>قراية الـ disk كله، cylinder ورا التاني</b> (800 cylinder × 20 track). نفترض إن كل track بياخد average latency + لفة كاملة = 8.33 + 16.67 = 25 ms، يبقى الـ cylinder الواحد = 20 × 25 = 500 ms. الحركات: average seek واحد (28 ms) عشان نوصل لأول cylinder، وبعدين 799 seek من track للي جنبه (7 ms).<br>الـ Total ≈ 28 + 799×7 + 800×500 = 28 + 5,593 + 400,000 = <b>405,621 ms ≈ 405.6 s</b>. اكتب الافتراضات بتاعتك في الامتحان.`
    ]}
  ],
  cards: [
    `الـ Magnetic disks (hard، floppy) والـ optical disks (CD-ROM، CD-R، CD-RW، DVD).`,
    `الـ Magnetic tape.`,
    `أصغر جزء ليه address في الـ disk، وغالبًا 512 bytes.`,
    `عدد ثابت من الـ sectors اللي ورا بعض (ده اللي الـ OS file manager شايفه).`,
    `الـ tracks اللي فوق/تحت بعض بالظبط؛ تتقري من غير ما الـ arm يتحرك.`,
    `عدد الـ tracks في كل surface.`,
    `تحريك الـ arm؛ وغالبًا ده أبطأ جزء في الـ disk access.`,
    `الـ arms.`,
    `بيمسك الـ platters في مكان ثابت ويلفّها.`,
    `عدد الـ records اللي متخزنة في كل block.`,
    `الـ Count (عدد الـ bytes في الـ block)، والـ Key (اختياري، الـ key بتاع آخر record)، والـ Data.`,
    `مساحة بتضيع جوا الـ sector عشان الـ records مش جاية مظبوطة عليه.`,
    `½ × (60 × 1000 / RPM) ms.`,
    `وقت اللفة / عدد الـ sectors في الـ track.`,
    `Seek + rotational delay + transfer.`,
    `الـ Multiprocessing، والـ disk striping، والـ RAID، والـ RAM disk، والـ disk cache.`
  ],
  qa: [
    `الـ Seek time: الوقت اللي الـ read/write arm بياخده عشان يروح للـ cylinder الصح (وده أكبر تكلفة). الـ Rotational delay (latency): الوقت اللي الـ disk بياخده عشان يلف لحد ما الـ sector المطلوب ييجي تحت الـ head (المتوسط = نص لفة). الـ Transfer time: أول ما الـ head يبقى فوق الداتا، ده الوقت اللي بياخده عشان ينقلها (وقت اللفة / عدد الـ sectors في الـ track، لكل sector).`,
    `الـ Multiprocessing (الـ CPU يعمل jobs تانية وهو مستني)؛ الـ disk striping (blocks على drives مختلفة بالتوازي)؛ الـ RAID؛ الـ RAM disk (الـ memory بتعمل نفسها disk)؛ الـ disk cache (الـ memory شايلة pages من الـ disk، ولو حصل miss نروح للـ disk).`,
    `الـ Sectors: بيستخدمها الـ OS؛ وحدات ثابتة 512 B؛ بتعمل fragmentation وبطء في الـ access لـ files الـ records. الـ Blocks: بيستخدمها الـ DBMS؛ حجمها بيحدده الـ user وفيها عدد صحيح من الـ records (الـ blocking factor)؛ مفيش internal fragmentation، ومفيش record بيتقسم على 2 blocks؛ بس الـ sub-blocks بتزود الـ non-data overhead.`,
    `اللفة = 60,000/6000 = 10 ms، يبقى الـ average latency = 5 ms.`,
    `3 × 512 = 1536 bytes.`,
    `33 × 512 = 16,896 bytes (عدد الـ tracks مالوش دعوة بالـ track capacity).`
  ],
  quiz: [
    [`صح. الـ arms هي اللي بتشيل وتوجه وتحرك الـ read/write heads؛ وتحريكها اسمه seeking، وغالباً ده أبطأ جزء في الـ access (L2, Disk components).`, `الـ arm assembly هو المجموعة الداخلية كلها اللي فيها الـ arms.`, `الـ platters هي الـ disks الدايرية اللي بتخزن الـ magnetic data على الوشين؛ مبتحركش الـ heads (L2, Disk components).`, `الـ spindle بيمسك الـ platters في مكانها وبيلفّها عشان يجيب الـ sector تحت الـ head؛ اللي بيحرك الـ heads هي الـ arms (L2, Disk components).`],
    [`الـ transfer time هو الوقت اللي الـ head بياخده عشان يعدي على الـ data بعد ما يكون اتظبط في مكانه، مش وقت تحريك الـ arm (L2, Cost of a disk access).`, `الـ latency (rotational delay) هو الانتظار لحد ما الـ disk يلف ويجيب الـ sector تحت الـ head، بعد ما الـ arm يكون في مكانه خلاص (L2).`, `اللف بيعمله الـ spindle وبيدينا الـ rotational delay؛ تحريك الـ arm للـ cylinder الصح اسمه seek time (L2).`, `صح. الـ seek time هو وقت تحريك الـ read/write arm للـ cylinder الصح؛ وده أكبر جزء في الـ access cost (الـ average النموذجي 30 ms) (L2, Cost of a disk access).`],
    [`الـ spindle عمره ما بيحتاج "يتحرك": هو بيلف الـ platters طول الوقت. اللي بيفضل ثابت وانت على cylinder واحد هو الـ arm assembly (L2, Cylinder).`, `صح. الـ cylinder هو كل الـ tracks اللي تحت الـ heads عند وضع واحد للـ arm.`, `لسه محتاجين اللف عشان نجيب الـ sectors تحت الـ head.`, `الـ Seeking يعني تحريك الـ arm، وهي نفس الفكرة، بس الإجابة النموذجية هي (b).`],
    [`الـ 32,768 = 64 × 512 دي سعة الـ TRACK (sectors per track × bytes per sector)؛ الـ cluster هو 4 sectors بس (L2, Capacity formulas).`, `صح. 4 × 512 = 2048. وعدد الـ sectors في الـ track ده مجرد تشتيت.`, `الـ 128 = 512 / 4 جاية من إنك قسمت بدل ما تضرب؛ الـ cluster capacity = sectors per cluster × bytes per sector (L2).`, `الـ 8 bytes مش طالعة من أي formula (لا 4 × 512 ولا 64 × 512)؛ الـ cluster اللي فيه 4 sectors بيشيل 4 × 512 = 2048 B (L2).`],
    [`الـ 12 ms = 60,000 / 5000 دي لفة كاملة؛ الـ average latency نص لفة، يعني 6 ms (L2, Cost of a disk access).`, `صح. الـ revolution = 60 × 1000 / 5000 = 12 ms، والـ average latency = ½ × 12 = 6 ms (L2, Cost of a disk access).`, `الـ 3 ms دي ربع لفة (12 / 4)؛ متوسط الانتظار نص لفة، ½ × 12 = 6 ms (L2).`, `الـ 0.012 دي لفة واحدة بالـ SECONDS (60 / 5000)، ومكتوبة ms غلط ومتقسمتش على 2؛ الإجابة ½ × 12 ms = 6 ms (L2).`],
    [`الـ 200 = 20,000 / 100 بتتجاهل الـ 300 B overhead بتاع كل block وقاعدة إن الـ blocks الكاملة بس هي اللي بتدخل؛ العدد الصح 3 blocks × 60 = 180 (L2, Non-data overhead).`, `صح. الـ Block = 6300 B، ⌊20,000/6300⌋ = 3 blocks × 60 = 180.`, `الـ 190 ≈ 3.17 blocks × 60 بتحسب block ناقص؛ اللي بيدخل ⌊20,000 / 6300⌋ = 3 blocks كاملين بس، يعني 180 (L2).`, `الـ 150 دي إجابة السلايد لما الـ blocking factor = 10 (block 1300 B، و 15 blocks × 10)؛ مع BF = 60 الإجابة 180 (L2, Non-data overhead).`],
    [`الـ track ده حلقة كاملة على السطح ومتقسم لـ sectors كتير، فمش أصغر addressable unit (L2, Disk components).`, `الـ cluster ده عدد ثابت من الـ sectors المتجاورة (من وجهة نظر الـ OS)، فهو أكبر من الـ sector (L2, Disk components).`, `صح. الـ sector هو أصغر addressable portion في الـ disk، وغالباً 512 bytes؛ والـ tracks والـ clusters والـ cylinders كلها معمولة من sectors (L2, Disk components).`, `الـ cylinder هو مجموعة الـ tracks اللي فوق/تحت بعض على كل الـ surfaces، وده أكبر وحدة فيهم (L2, Disk components).`],
    [`الـ hard disk ده magnetic disk، والمحاضرة حاطاه تحت الـ DASD (direct access)، مش serial access (L2, Secondary storage devices).`, `الـ CD-ROM ده optical disk، ومتحط تحت الـ DASD (direct access)؛ المثال الوحيد للـ SASD هو الـ magnetic tape (L2).`, `صح. المحاضرة بتحط الـ magnetic tape كـ Serial Access Storage Device (SASD)؛ والـ magnetic والـ optical disks دول DASD (L2, Secondary storage devices).`, `الـ DVD ده optical disk فهو DASD (direct access)؛ مثال الـ SASD هو الـ magnetic tape (L2).`],
    [`عدد الـ bytes اللي في الـ block موجود في الـ COUNT sub-block؛ الـ key sub-block فيه الـ key بتاع آخر record (L2, Sub-blocks).`, `صح. بيخلي الـ controller يدوّر من غير ما يحمّل الـ block في الـ memory.`, `الـ records نفسها موجودة في الـ DATA sub-block؛ الـ key sub-block فيه key آخر record بس (L2, Sub-blocks).`, `الـ sector address ده non-data overhead بتاع الـ tracks المتنظمة بالـ sectors؛ مش واحد من الـ sub-blocks بتاعة الـ block (L2, Non-data overhead).`],
    [`الـ cylinder height = 14 معناه 14 tracks في الـ cylinder، يعني 14 surface (وش). كل platter ليه 2 surfaces، فالـ platters عددها 7 (L2).`, `صح. الـ cylinder height = عدد الـ surfaces = 14، وكل platter ليه وشين، فالـ platters = 14 / 2 = 7 (L2, Worked problem).`, `الـ 28 = 14 × 2 ضربت بدل ما تقسم؛ الـ platters = cylinder height / 2 = 7 (L2, Capacity formulas).`, `ده عدد الـ cylinders في مثال السلايدز.`],
    [`الـ RAM disk ده جزء من الـ main memory بيمثّل إنه disk؛ مبيوزعش الـ blocks بتاعة الـ file على كذا drive (L2, Disk bottleneck).`, `الـ disk cache ده block كبير من الـ memory شايل pages من الـ disk، وبيتشيك عليه قبل الـ disk؛ وبيستخدم drive واحد (L2, Disk bottleneck).`, `صح. الـ disk striping بيحط blocks مختلفة من الـ file على drives مختلفة، فالـ processes المستقلة تقدر تشتغل بالتوازي من غير ما تعطل بعض (L2, Disk bottleneck).`, `الـ multiprocessing بيخلي الـ CPU يشتغل على jobs تانية وهو مستني الـ disk؛ مبيحطش blocks على drives (L2, Disk bottleneck).`],
    [`الـ 8.33 ms = 60,000 / 7200 دي لفة كاملة، يعني وقت transfer لـ track كامل، مش sector واحد (L2, Example 2).`, `الـ 4.16 ms دي نص لفة، يعني الـ average latency في Example 2، مش الـ transfer time (L2).`, `صح. الـ revolution = 60,000 / 7200 = 8.33 ms؛ والـ sector الواحد = 8.33 / 170 ≈ 0.049 ≈ 0.05 ms (L2, Example 2).`, `الـ 170 ده عدد الـ sectors في الـ track، مش وقت؛ الـ transfer لـ sector واحد = revolution / 170 ≈ 0.05 ms (L2).`]
  ],
  extra: [
    [`ده 2000 × 40 × 512، يعني capacity بتاعة surface واحد بس. نسيت تضرب في الـ 8 tracks اللي في الـ cylinder.`, `صح. الـ Track = 40 × 512 = 20,480 B؛ الـ cylinder = 8 × 20,480 = 163,840 B؛ 2000 cylinder × 163,840 = 327,680,000 B.`, `هنا استخدمت 4 (عدد الـ platters) بدل 8 surfaces. الـ cylinder height بيعد الـ surfaces.`, `ده حجم cylinder واحد، مش الـ drive كله.`],
    [`هنا استخدمت لفة كاملة (15 ms) كـ latency بدل نص لفة.`, `هنا نقلت sector واحد بس (0.3 ms) بدل خمسة.`, `صح. اللفة = 60,000/4000 = 15 ms؛ الـ latency = 7.5 ms؛ الـ transfer = 5 × 15/50 = 1.5 ms؛ الـ total = 9 + 7.5 + 1.5 = 18 ms.`, `هنا سبت الـ rotational delay (seek + transfer بس).`],
    [`ده 12,288/150، وده متجاهل الـ blocks والـ overhead.`, `هنا تجاهلت الـ 400 B overhead (block = 2400 B بيدي 5 blocks).`, `هنا استخدمت 4.39 blocks. مينفعش نخزن block ناقص، فخد الـ floor الأول.`, `صح. الـ Track = 24 × 512 = 12,288 B؛ الـ block = 16 × 150 + 400 = 2800 B؛ ⌊12,288/2800⌋ = 4 blocks؛ 4 × 16 = 64 record.`],
    [`صح. الـ File = 30,000 × 128 = 3,840,000 B؛ الـ track = 40 × 512 = 20,480 B؛ 3,840,000/20,480 = 187.5، نقرّبها لفوق لـ 188.`, `قرّبت لتحت. الـ track الناقص لازم يتحجز برضه، فقرّب لفوق.`, `ده عدد الـ SECTORS (3,840,000/512).`, `ده عدد الـ CYLINDERS (3,840,000/163,840 = 23.4، متقربة لفوق).`],
    [`الـ sector هو أصغر وحدة ليها address، فمينفعش تقرا byte لوحده.`, `صح. الـ OS بيلاقي الـ platter والـ track والـ sector، ويقرا الـ sector كله في buffer، وبعدين يلاقي الـ byte.`, `الـ track أكبر من أصغر وحدة ليها address؛ والسلايدز بتقول إن اللي بيتقري هو sector.`, `الـ cylinder مجموعة tracks؛ مش هو وحدة القراية.`],
    [`الـ Striping بيحط blocks الـ file على drives مختلفة.`, `الـ disk cache شايل pages متنسخة من الـ disk؛ مش بيشتغل هو نفسه كـ disk.`, `صح. الـ RAM disk (memory disk) بيعمل disk في الـ main memory: سريع بس volatile.`, `الـ Multiprocessing بيخلي الـ CPU يعمل jobs تانية وهو مستني الـ disk.`],
    [`الـ Blocks بتزود sub-blocks (count، key) و inter-block gaps، وده بيزود الـ overhead.`, `صح. السلايدز بتقول إن التنظيم بالـ blocks فيه non-data overhead <b>أكتر</b> من الـ sector addressing.`],
    [`الـ seeking هو تحريك الـ arm للـ cylinder الصح؛ ملوش علاقة بالمساحة اللي مش مستخدمة جوه الـ sector (L2).`, `الـ blocking factor هو عدد الـ records في كل block، وده في التنظيم بالـ blocks.`, `الـ disk striping بيوزع الـ blocks بتاعة الـ file على كذا drive عشان الـ parallelism؛ مبيوصفش الـ bytes المهدرة في الـ sector (L2).`, `صح. الـ Fragmentation هو ضياع مساحة جوا الـ sector لما الـ records متجيش مظبوطة عليه.`],
    [`صح. كل cylinder هو مجموعة الـ tracks عند وضع واحد للـ arm، track من كل surface، فبيبقى فيه cylinder لكل مكان track.`, `السلايدز قايلة القاعدة دي صريحة: عدد الـ cylinders = عدد الـ tracks في كل surface.`],
    [`صح. تحريك الـ arm للـ cylinder الصح غالبًا هو أبطأ جزء.`, `الـ Transfer بتاع sector واحد جزء صغير جدًا من اللفة (مثلًا 0.05 ms).`, `الـ Latency عادةً 6–8 ms، وده أقل من الـ average seek المعتاد 30 ms.`, `ده جزء من الـ transfer، مش أكبر تكلفة.`]
  ]
};

/* ===================== Lecture 3 ===================== */
AR.fp.lectures["3"] = {
  notes: [
    { h: `الـ File input والـ output`, pts: [
      `الـ <b>Text file</b>: سلسلة من الـ characters (زي الـ source code بتاع C)، وتقدر تشوفه في أي text editor.`,
      `الـ <b>Binary file</b>: سلسلة من الـ bytes (زي فيلم أو مزيكا)، ومحتاج برنامج مخصوص.`,
      `الـ files ممكن تبقى <b>input</b> files (البرنامج بيقرا منها) أو <b>output</b> files (البرنامج بيكتب فيها).`
    ]},
    { h: `الـ File of records`, pts: [
      `الـ logical view: الداتا عبارة عن مجموعة <b>records</b>.`,
      `الـ <b>Record</b>: مجموعة fields بتكوّن وحدة logical واحدة.`,
      `الـ <b>Field</b>: قيمة داتا، وهو أصغر وحدة داتا ليها معنى logical. الـ fields ليها أسماء وأنواع (types) وأطوال وقيم.`,
      `فيه 3 file structures: الـ <b>stream</b> والـ <b>field</b> والـ <b>record</b> structures.`
    ]},
    { h: `1. الـ Stream files`, pts: [
      `المعلومات بتتكتب كـ stream من الـ bytes <b>من غير أي معلومات زيادة</b>.`,
      `مثال: <code>AmesMary123 MapleStillwaterOK74075MasonAlan90 EastgateAdaOK74820</code>.`,
      `المشكلة: <b>مفيش أي طريقة نرجّع بيها المعلومات</b> بشكل الـ record المنظم.`
    ]},
    { h: `2. الـ Field structures (4 طرق)`, pts: [
      `<b>Fixed length</b>: مثلًا الأطوال 5، 7، 25 ← <code>87358CARROLLALICE IN WONDERLAND</code>، <code>03818FOLK&nbsp;&nbsp;&nbsp;FILE STRUCTURES</code>.`,
      `<b>Length indicator</b> في أول كل field ← <code>058735907CARROLL19ALICE IN WONDERLAND</code>.`,
      `<b>keyword = value</b> ← <code>ISBN=87359 AU=CARROLL TI=ALICE IN WONDERLAND</code>.`,
      `<b>Delimiter</b> في آخر كل field ← <code>87359|CARROLL|ALICE IN WONDERLAND|</code>.`
    ]},
    { h: `الـ Field structures: المميزات والعيوب` },
    { h: `3. الـ Record structures`, pts: [
      `الـ record هو مجموعة fields بتنتمي لبعض في مستوى تنظيم أعلى. هو أداة conceptual وفكرة logical مهمة في structure الـ file.`,
      `الطرق: (1) <b>fixed-length records بـ fixed-length fields</b>؛ (2) <b>fixed-length records بـ variable-length fields</b> (fields بـ delimiters أو بـ length indicators، ونعمل padding لحد ما الـ record يوصل للحجم الثابت)؛ (3) <b>كل record بيبدأ بـ length indicator</b> (عدد الـ bytes)، مثلًا <code>3387359|CARROLL|ALICE IN WONDERLAND</code>.`
    ]},
    { h: `الـ Record structures: المميزات والعيوب` },
    { h: `إدارة files الـ records`, pts: [
      `الـ <b>Primary key</b>: بيميّز الـ record بشكل unique ومش بيتغير. الـ <b>Secondary key</b>: بنستخدمه في البحث بس عادةً مش بيميّز الـ record بشكل unique.`,
      `الـ <b>Sequential search</b>: نقرا الـ records بالترتيب لحد ما نلاقي اللي عايزينه. <b>O(n)</b>. مناسب للـ pattern matching أو للـ files اللي فيها records قليلة.`,
      `الـ <b>Direct access</b>: نعمل seek على طول لأول الـ record. <b>O(1)</b>. ينفع لما نكون عارفين الـ <b>RRN</b> (Relative Record Number: أول record الـ RRN بتاعه 0، اللي بعده RRN 1…).`
    ]},
    { h: `الـ Seeking`, pts: [
      `بشكل عام: <code>Seek(Source_File, Offset)</code>؛ مثلًا <code>Seek(infile, 3030)</code> بتنقلك للـ byte رقم 3030.`,
      `في C: <code>int fseek(FILE *stream, long offset, int origin)</code>، والـ origin <b>0</b> = البداية، <b>1</b> = المكان الحالي، <b>2</b> = النهاية.<br><code>fseek(infile,0L,0)</code> ← البداية؛ <code>fseek(infile,0L,2)</code> ← النهاية؛ <code>fseek(infile,-10L,1)</code> ← يرجع 10 bytes لورا.`,
      `في C++: الـ fstream ليه pointer-ين. الـ <code>seekg</code> بيحرك الـ <b>get</b> pointer (القراية) والـ <code>seekp</code> بيحرك الـ <b>put</b> pointer (الكتابة). الـ Origins: <code>ios::beg</code>، <code>ios::cur</code>، <code>ios::end</code>.<br><code>infile.seekg(0, ios::beg); infile.seekg(0, ios::end); infile.seekg(-10, ios::cur);</code>`
    ]},
    { h: `Quiz (3) س1: انسخ file من غير loops`, pts: [
      `الفكرة: تعمل <code>seekg</code> للآخر والـ <code>tellg</code> تديك الحجم، وبعدين <code>read</code> واحدة و<code>write</code> واحدة بالحجم ده.`
    ]},
    { h: `Quiz (3) س2: عدّل record بالـ RRN`, pts: [
      `الـ fields والـ records الـ fixed-length معناها إن كل record ليه نفس الحجم، فالـ byte offset بيبقى بالظبط <b>RRN × record size</b>.`
    ]}
  ],
  cards: [
    `الـ Text: سلسلة characters (تقدر تعدّلها). الـ Binary: سلسلة bytes (محتاج برنامج مخصوص).`,
    `أصغر وحدة داتا ليها معنى logical.`,
    `مجموعة fields بتكوّن وحدة logical واحدة.`,
    `مفيش معلومات زيادة، فمنقدرش نرجّع الـ records بشكل منظم.`,
    `الـ Fixed length، والـ length indicator، والـ keyword=value، والـ delimiter.`,
    `+ سهل في القراية والتخزين؛ − بيضيع مساحة في الـ padding.`,
    `+ ممكن يضيع مساحة أقل؛ − لازم تشيك كل byte وتقارنه بالـ delimiter.`,
    `+ بيوصف نفسه (self-describing)، وبيسمح إن fields تبقى ناقصة؛ − الـ keywords بتضيع مساحة.`,
    `+ سهل تنط لآخر الـ field؛ − الـ fields الطويلة محتاجة أكتر من byte للطول.`,
    `الـ Fixed: سهل تنط للـ record رقم i بس بيضيع مساحة في الـ padding. الـ Variable: بيوفر مساحة بس محتاج index عشان تنط.`,
    `Relative Record Number؛ أول record = 0. الـ Offset = RRN × record size.`,
    `0 = البداية، 1 = المكان الحالي، 2 = النهاية.`,
    `الـ seekg بيحرك الـ get pointer (القراية)؛ الـ seekp بيحرك الـ put pointer (الكتابة).`,
    `الـ Sequential بـ O(n)؛ الـ direct بـ O(1).`
  ],
  qa: [
    `الـ Fixed length (+ سهل في القراية والتخزين، − بيضيع مساحة في الـ padding)؛ الـ length indicator (+ سهل تنط لآخر الـ field، − الـ fields الطويلة محتاجة أكتر من byte واحد للطول)؛ الـ delimited (+ ممكن يضيع مساحة أقل، − لازم تشيك كل byte على الـ delimiter)؛ الـ keyword=value (+ بيوصف نفسه وبيسمح إن fields تبقى ناقصة، − الـ keywords بتضيع مساحة).`,
    `الحل: <code>void UpdateRecord(fstream &amp;file, Item &amp;newItem, int RRN){ file.seekp(RRN*sizeof(newItem), ios::beg); file.write((char*)&amp;newItem, sizeof(newItem)); }</code>`,
    `في الـ pattern matching أو الـ files اللي فيها records قليلة. غير كده هو O(n)، فالـ direct access (O(1) بالـ RRN) أحسن.`,
    `الـ primary key بيميّز الـ record بشكل unique ومش بيتغير. الـ secondary key بنستخدمه في البحث بس عادةً مش بيميّز الـ record بشكل unique.`
  ],
  quiz: [
    [`صح. وعشان كده منقدرش نرجّع الـ records.`, `ممكن يبقى فيه مسافات جوا الداتا؛ بس ده مش التعريف.`, `المعلومات الزيادة (delimiters، lengths) دي اللي الـ field structures بتضيفها.`, `الـ "Space" مش جزء من التعريف؛ الـ stream file هو stream of bytes من غير أي معلومات زيادة، وعشان كده مبنقدرش نرجّع الـ records (L3, Stream files).`],
    [`المكان هو اللي بيحدد الـ field؛ والـ fields الناقصة بتسيب padding.`, `الـ length indicator بيقول الـ field فيه كام byte بس؛ مبيسميش الـ field، فمش self-describing (L3, Field structures).`, `الـ delimited fields بيفصلها رمز زي |، بس مفيش حاجة بتسمي كل field، والـ field الناقص لسه محتاج الـ delimiter بتاعه (L3, Field structures).`, `صح. كل field بيقول اسمه (ISBN=…، AU=…).`],
    [`إهدار المساحة بالـ padding ده عيب الـ FIXED-length fields؛ الـ delimiters عيبها بدل كده إنك بتشيك byte by byte (L3, Field structures table).`, `صح. لما يبقى فيه delimiter في آخر كل field، البرنامج لازم يقارن كل byte في الـ field بالـ delimiter عشان يعرف الـ field بيخلص فين (L3, Field structures table).`, `إهدار المساحة بالـ keywords ده عيب الـ KEYWORD = VALUE fields، اللي ميزتها إنها self-describing (L3, Field structures table).`, `إن الأطوال الكبيرة تحتاج أكتر من byte ده عيب الـ LENGTH-INDICATOR fields (لما الـ max size > 256)، مش الـ delimited (L3).`],
    [`الـ padding المهدر ده عيب الـ FIXED-length records؛ الـ variable-length records بالعكس بتوفر مساحة لما الأحجام تبقى مختلفة (L3, Record structures table).`, `صح. عشان الـ records أحجامها مختلفة، مبتقدرش تحسب record رقم i بيبدأ فين، فمتقدرش تنط له من غير index file (L3, Record structures table).`, `الـ variable-length records تقدر تشيل أي data ومنها text (زي 87359|CARROLL|ALICE…)؛ عيبها إنك متقدرش تنط مباشرة لـ record رقم i (L3).`, `الـ variable-length records عادةً بتستخدم variable fields (delimiters أو length indicators)؛ الـ fixed fields مش شرط (L3, Record structures).`],
    [`الـ O(n) ده الـ SEQUENTIAL search، اللي بيقرا الـ records بالترتيب لحد ما يلاقي match؛ الـ direct access بيعمل seek على الـ record على طول (L3, Managing files of records).`, `صح. الـ direct access بيعمل seek على طول لبداية الـ record (الـ offset معروف من الـ RRN بتاعه)، فالـ cost مش معتمد على n: O(1) (L3, Managing files of records).`, `الـ log n ده cost الـ BINARY search على file متترتب؛ الـ direct access محتاج seek واحد، O(1) (L3–L4).`, `التلات costs دول بتوع methods مختلفة: O(n) للـ sequential، و log n للـ binary search، و O(1) للـ direct access، فمينفعش يبقوا كلهم صح (L3).`],
    [`صح. الـ sequential search بيقرا الـ records بالترتيب لحد ما يلاقي match، فأسوأ حالة بيقرا الـ n records كلهم: O(n) (L3, Managing files of records).`, `الـ O(1) ده الـ DIRECT access بالـ RRN (seek واحد)؛ الـ sequential access ممكن يضطر يقرا كل record (L3).`, `الـ log n ده الـ BINARY search على file متترتب بالـ key؛ الـ sequential search هو O(n) (L3–L4).`, `الـ O(n) بس هو اللي بيوصف الـ sequential access؛ الـ O(1) ده direct access والـ log n ده binary search (L3).`],
    [`الـ O(n) ده الـ linear (sequential) search، اللي بيقرا الـ records واحد واحد؛ الـ binary search بيقسم الـ range نصين كل خطوة (L4, Ordered files).`, `الـ O(1) ده direct access بالـ RRN بـ seek واحد؛ الـ binary search محتاج حوالي log₂ n probes (L3).`, `صح. الـ binary search بيقارن الـ key بالـ record اللي في النص وبيرمي نص الـ range الباقي كل خطوة، فمحتاج حوالي log₂ n accesses (L4, Ordered files).`, `الـ O(n²) ده هيبقى أبطأ حتى من الـ sequential search؛ الـ binary search على file متترتب هو O(log₂ n) (L4).`],
    [`الـ Origin 1 معناه CURRENT (المكان الحالي)، والـ offset سالب.`, `صح. في fseek(stream, offset, origin)، الـ origin 1 = الـ current position، والـ offset −10L بيرجع 10 bytes لورا من هناك (L3, Seeking).`, `10 bytes قبل الآخر ده يبقى fseek(infile, -10L, 2)؛ الـ origin 2 هو الـ end، بس الـ call ده بيستخدم origin 1 (current) (L3, Seeking).`, `الـ fseek بتحرك الـ file pointer بس؛ قفل الـ file بيتعمل بـ fclose (L3, Seeking).`],
    [`الـ seekg بتحرك الـ GET (read) pointer؛ الـ put (write) pointer بيتحرك بـ seekp (L3, Seeking).`, `صح. الـ fstream ليه two pointers: الـ seekg بتحرك الـ get (read) pointer والـ seekp بتحرك الـ put (write) pointer (L3, Seeking).`, `الـ tellg بتقولك الـ get (read) position الحالي بس، مثلاً عشان تعرف حجم الـ file؛ مبتحركش حاجة (L3, Quiz 3).`, `الـ fseek دي function في C لتحريك الـ file pointer؛ السؤال عن function الـ put pointer في C++، يعني seekp (L3).`],
    [`الـ 5 ده الـ RRN نفسه؛ الـ byte offset = RRN × record size = 5 × 40 = 200 (L3, Direct access).`, `صح. الـ RRNs بتبدأ من 0، فالـ byte offset = RRN × record size = 5 × 40 = 200 (L3, Direct access).`, `الـ 240 = 6 × 40 بتعامل الـ RRN كأنه بيبدأ من 1؛ أول record الـ RRN بتاعه 0، فالـ offset = 5 × 40 = 200 (L3).`, `الـ 45 = 5 + 40 جمعت بدل ما تضرب؛ الـ offset = RRN × record size = 200 (L3).`]
  ],
  extra: [
    [`دي طريقة الـ delimiter، مش الـ length indicators.`, `الـ ISBN=… AU=… TI=… دي طريقة الـ keyword = value؛ الـ length indicators بتحط طول الـ field قبل كل field (05 52814…) (L3).`, `صح. كل field قبله طوله: 05 + 52814، 05 + KNUTH، 07 + SORTING.`, `كلمة SORTING فيها 7 characters مش 6. الطول اتعد غلط.`],
    [`هنا عدّيت characters الداتا بس وسبت الـ 2 delimiters (|).`, `هنا زوّدت delimiter في الآخر والـ record مفيهوش.`, `ده عدد الـ fields، مش عدد الـ bytes.`, `صح. 5 + 1 + 5 + 1 + 7 = 19 byte، زي ما السلايد بيعد 5 + 1 + 7 + 1 + 19 = 33.`],
    [`صح. الـ Record size = 24 + 4 + 4 = 32 B؛ الـ offset = RRN × record size = 12 × 32 = 384.`, `ده 13 × 32، وده بيعامل الـ RRNs كأنها بتبدأ من 1. أول record الـ RRN بتاعه 0.`, `ده 11 × 32، غلطة بواحد في الاتجاه التاني.`, `الـ 12 ده الـ RRN، مش الـ byte offset؛ الـ offset = RRN × record size = 12 × 32 = 384 (L3, Direct access).`],
    [`الـ seekg بيحرك الـ GET pointer (القراية). الكتابة بتستخدم الـ put pointer.`, `صح. الـ seekp بيحرك الـ put pointer (الكتابة)، و7 × 50 = 350 byte من البداية.`, `400 = 8 × 50، وده بيعامل الـ RRN كأنه بيبدأ من 1 فبيقع على الـ record اللي بعده.`, `الـ offset لازم يتحسب من البداية (ios::beg)، مش من النهاية.`],
    [`الـ Origin 2 معناه نهاية الـ file، مش البداية.`, `آخر record بيبدأ قبل النهاية بـ 20 byte، مش 60.`, `صح. الـ Origin 2 = النهاية؛ والرجوع 60 byte = 3 records كل واحد 20 byte، فالقراية بتبدأ من تالت record من الآخر.`, `تاني record من الآخر بيبدأ 2 × 20 = 40 byte قبل الآخر، يعني fseek(fp, -40L, 2)؛ الـ −60L بتوصل للتالت من الآخر (L3).`],
    [`ده تعريف الـ PRIMARY key؛ الـ secondary key بيتستخدم في البحث وعادةً مبيميزش الـ record بشكل unique (L3).`, `صح. الـ secondary key بنستخدمه في البحث بس عادةً مش بيميّز الـ record بشكل unique.`],
    [`دي ميزة الـ variable-length records.`, `دي ميزة الـ keyword = value fields.`, `الـ fixed-length records بتضيع مساحة في الـ padding؛ ده عيبها.`, `صح. كل record ليه نفس الحجم، فالـ offset = RRN × record size.`],
    [`صح. الطول المتخزن في الأول بيقولك بالظبط تنط كام byte.`, `مع الـ delimiters لازم تشيك كل byte لحد ما توصل للـ delimiter.`, `ميزته إنه بيوصف نفسه وبيسمح إن fields تبقى ناقصة.`, `الـ stream file مبيضيفش أي معلومات خالص، فمفيش حدود fields تنط لها؛ اللي بيديك كده هو الـ length indicator (L3, Stream files).`],
    [`الـ Text files (زي الـ source code بتاع C) تقدر تشوفها في text editor؛ المزيكا لأ.`, `صح. السلايدز بتدي الأفلام والمزيكا كأمثلة على الـ binary files.`, `الـ "Stream" ده logical file structure، مش تصنيف text/binary.`, `كون الـ file input أو output بيعتمد على البرنامج بيستخدمه إزاي.`],
    [`صح. الـ get pointer واقف في الآخر، فمكانه بيساوي عدد الـ bytes؛ وبعدين read واحدة وwrite واحدة بالحجم ده بينسخوا الـ file.`, `الـ tellg بتقولك مكان الـ get الحالي، وفي آخر الـ file المكان ده هو حجم الـ file.`]
  ]
};

/* ===================== Lecture 4 ===================== */
AR.fp.lectures["4"] = {
  notes: [
    { h: `الـ file organizations الأساسية`, pts: [
      `طريقة الـ file organization بتحدد <b>استراتيجية مكان الـ record</b> (record placement strategy) والعلاقة بين <b>الـ key value</b> بتاع الـ record والـ <b>relative address</b> بتاعه.`,
      `الهدف: <b>retrieve</b> بكفاءة (الجار الـ logical، الـ records اللي بتحقق شرط، record عشوائي) و<b>update</b> بكفاءة (insert، delete، modify).`,
      `الكفاءة بتتقاس بـ <b>عدد الـ disk accesses</b>: كل ما يقل كل ما يبقى أحسن.`,
      `استراتيجيات الـ access: الـ <b>sequential search</b> بطيء وبـ O(n)؛ الـ <b>direct access</b> بيجيب الـ record في read واحدة، O(1).`,
      `الطرق: <b>unordered (heap) file</b>، <b>ordered (sequential) file</b>، <b>indexing</b>، <b>hashing</b>.`
    ]},
    { h: `الـ Unordered file / الـ heap file`, pts: [
      `مجموعة records <b>مش مترتبة</b> متخزنة <b>بترتيب دخولها</b>، بغض النظر عن الـ key. وبيتسمى كمان unordered sequential file أو <b>pile</b> file.`,
      `بيدعم create/destroy، وopen/close، وinsert/delete. والـ records بتتعرف بـ <b>record id (rid)</b>.`,
      `الـ <b>Retrieve</b>: بالـ <b>linear search</b> بس.`,
      `الـ <b>Insert في الآخر</b>: بسيط وكفء، access واحد عشان تقرا آخر page وواحد عشان تكتبها تاني. بس فيه عيب كبير: <b>بيسمح بـ records متكررة (duplicates)</b> (مثلًا لو عملت insert لـ 4، Ali، CS عند offset 80).`,
      `الـ <b>Delete</b>: تلاقي الـ record، تمسحه <b>physically أو logically</b>، وتكتبه تاني.`
    ]},
    { h: `مثال heap file (records حجمها 20 byte)` },
    { h: `الـ cost model`, pts: [
      `الـ <b>B</b> = عدد الـ data pages (الـ page = block)، الـ <b>R</b> = عدد الـ records في كل page، الـ <b>D</b> = متوسط الوقت عشان تقرا/تكتب disk page، الـ <b>C</b> = متوسط الوقت عشان تعالج record.`,
      `العمليات: الـ <b>Scan</b> (تجيب كل الـ records)، الـ <b>equality search</b> ("sid = 23")، الـ <b>range search</b> ("name after Smith")، الـ <b>Insert</b>، الـ <b>Delete</b> (بالـ rid).`
    ]},
    { h: `تكاليف الـ Heap file`, pts: [
      `الـ <b>Scan</b>: B(D + RC). تقرا B pages، وتعالج R records في كل واحدة.`,
      `الـ <b>Equality search</b>: 0.5B(D + RC). في المتوسط بتعمل scan لنص الـ file. ولو مفيش حاجة مطابقة، بتعمل scan للـ file كله.`,
      `الـ <b>Range search</b>: B(D + RC). الـ records المطابقة ممكن تبقى في أي حتة، فلازم تعمل scan للـ file كله.`,
      `الـ <b>Insert</b>: <b>2D + C</b>. تجيب آخر page، تضيف الـ record، وتكتبها تاني.`,
      `الـ <b>Delete</b>: search cost + C + D.`
    ]},
    { h: `الـ Ordered file / الـ sequential file`, pts: [
      `مجموعة records <b>مترتبة</b> متخزنة بترتيب الـ <b>key value</b>. والـ records بيتعملها access بالتسلسل من الأول للآخر.`,
      `الـ Insert: الـ record الجديد بيروح لمكان محدد بالظبط، فـ <b>كل الـ records اللي الـ key بتاعها أكبر بتتحرك مكان واحد ناحية الآخر</b>. والـ delete والـ update محتاجين العكس.`,
      `مثال: لو عملت insert لـ (4، Ali، CS) في 1، 2، 3، 5 هيتحط عند offset 60 وAhmed (5) هيتزق لـ 80.`
    ]},
    { h: `تكاليف الـ Sorted file`, pts: [
      `الـ <b>Scan</b>: B(D + RC).`,
      `الـ <b>Equality search</b>: <b>D·log₂B + C·log₂R</b>. binary search على الـ pages، وبعدين binary search جوا الـ page.`,
      `الـ <b>Range search</b>: search cost + تكلفة إنك تجيب الـ records المطابقة.`,
      `الـ <b>Insert</b>: search cost + 2 × (0.5B(D + RC)) = search + B(D + RC). بتقرا وتكتب تاني نص الـ file في المتوسط.`,
      `الـ <b>Delete</b>: زي الـ insert بالظبط: search + B(D + RC).`
    ]},
    { h: `جدول مقارنة التكاليف` },
    { h: `إزاي تقرا اختيارات الامتحان`, pts: [
      `الامتحانات بتفك كلمة "search +" لـ formulas. الـ delete في الـ sorted file = <b>Dlog₂B + Clog₂R + B(D+RC)</b>. الـ delete في الـ hashed file = <b>1.25B(D+RC) + C + D</b> في الإجابة النموذجية (بتستخدم الـ hashed scan cost كـ "search").`,
      `الـ hashed scan بيبقى <b>1.25B(D+RC)</b> لإن الـ hash buckets عادةً بتتساب مليانة حوالي 80%، فبيبقى فيه pages أكتر بـ 1.25 مرة.`
    ]}
  ],
  cards: [
    `استراتيجية مكان الـ record + العلاقة بين الـ key value والـ relative address.`,
    `عدد الـ disk accesses (كل ما يقل أحسن).`,
    `records مش مترتبة، متخزنة بترتيب دخولها؛ وبيتسمى كمان pile file.`,
    `الـ Linear search بس.`,
    `بيسمح بـ records متكررة (duplicates).`,
    `عدد الـ Pages، الـ records/page، وقت قراية/كتابة الـ page، وقت معالجة الـ record.`,
    `B(D + RC)`,
    `0.5B(D + RC)`,
    `2D + C`,
    `D·log₂B + C·log₂R`,
    `search + 2·(0.5B(D + RC)) = search + B(D + RC)`,
    `1.25B(D + RC)`,
    `H + D + 0.5RC`,
    `كل الـ records اللي الـ key بتاعها أكبر لازم تتزق مكان واحد ناحية الآخر.`
  ],
  qa: [
    `الـ record بيتضاف في آخر page: تقرا آخر page (D)، تضيف الـ record (C) وتكتبها تاني (D)، يبقى 2D + C. والعيب إنه بيسمح بـ records متكررة.`,
    `بعد ما تلاقي المكان، كل الـ records اللي بعده بتتزق خطوة. في المتوسط نص الـ file (0.5B pages) لازم يتقري ويتكتب تاني، يبقى 2 × 0.5B(D+RC).`,
    `في المتوسط الـ record بيتلاقي بعد ما تعمل scan لنص الـ pages. كل page بتكلف D عشان تتقري + RC عشان تشيك على الـ R records بتوعها. ولو مفيش record مطابق، بتعمل scan للـ file كله B(D+RC).`,
    `B(D+RC) = 100 × (15 + 50×0.1) = 100 × 20 = 2000 ms.`
  ],
  quiz: [
    [`ده الـ insert/delete بتاع الـ SORTED file: binary search (Dlog₂B + Clog₂R) وبعدين إعادة كتابة نص الـ file مرتين، B(D + RC). الـ heap insert بيعمل append وخلاص (L4, Cost table).`, `دي لازقة الـ search cost بتاع الـ sorted file في الـ heap insert 2D + C؛ مفيش operation في الـ cost table ليها الـ formula دي. الـ heap insert مش محتاج search (L4).`, `الـ 1.25B(D + RC) ده الـ scan بتاع الـ HASHED file (الـ buckets مليانة ~80%)؛ الـ heap insert بيلمس آخر page بس: 2D + C (L4, Cost table).`, `صح. تقرا آخر page، تضيف الـ record، وتكتبها تاني.`],
    [`ده الـ insert/delete cost بتاع الـ SORTED file (binary search + تزحيق نص الـ file)؛ الـ hashed scan بيقرا كل الـ bucket pages (L4, Cost table).`, `دي خالطة الـ sorted search مع الـ heap insert 2D + C؛ مش موجودة في الـ cost table، والـ hashed scan فيها 1.25B(D + RC) (L4).`, `صح. الـ Buckets مليانة ~80%، فالـ pages بتبقى 1.25×.`, `الـ B(D + RC) ده الـ scan cost بتاع الـ HEAP والـ SORTED files؛ الـ hashed pages مليانة ~80% بس، فالـ hashed scan = 1.25 × ده (L4, Cost table).`],
    [`الـ 2D + C ده الـ insert بتاع الـ HEAP file (تقرا آخر page، تضيف، تكتبها تاني)؛ الـ sorted delete لازم يعمل search ويزحّق records (L4, Cost table).`, `ده الـ scan cost بس؛ جزء الـ search ناقص.`, `الـ 1.25B(D + RC) ده الـ scan بتاع الـ HASHED file؛ الـ sorted delete هو binary search + B(D + RC) (L4, Cost table).`, `صح. Search (binary) + تزق نص الـ file (قراية وكتابة).`],
    [`الـ 2D + C ده الـ INSERT cost بتاع الـ heap؛ الـ equality search لازم يعمل scan على الـ pages لحد ما يلاقي الـ match (L4, Heap file costs).`, `صح. الـ heap file ملوش ترتيب، فبيتعمله scan linear؛ وفي المتوسط الـ match بيتلاقى بعد نص الـ file: 0.5B(D + RC) (L4, Heap file costs).`, `الـ 1.25B(D + RC) + C + D ده الـ delete بتاع الـ HASHED file في الـ model answer، مش heap search (L4, Reading the exam choices).`, `الـ Dlog₂B + Clog₂R ده binary search، يعني الـ equality search بتاع الـ SORTED file؛ الـ heap file ملوش ترتيب فمينفعش يستخدمه (L4, Cost table).`],
    [`الـ Dlog₂B + Clog₂R ده الـ EQUALITY search بتاع الـ sorted file؛ الـ scan لازم يجيب كل record، يعني يقرا الـ B pages كلها (L4, Sorted file costs).`, `صح. الـ scan بيجيب كل record، فبيقرا كل الـ B pages (D لكل واحدة) ويعالج R records في كل page (RC): B(D + RC)، زي الـ heap scan بالظبط (L4, Sorted file costs).`, `الـ 1.25B(D + RC) ده الـ scan بتاع الـ HASHED file (الـ pages مليانة ~80%)؛ الـ sorted file فيه B pages مليانة، فهو B(D + RC) (L4).`, `الـ 0.5B(D + RC) ده الـ equality search بتاع الـ HEAP file (نص الـ file في المتوسط)؛ الـ scan بيقرا الـ file كله (L4).`],
    [`الـ Dlog₂B + Clog₂R ده الـ equality search بتاع الـ SORTED file، مش hashed delete (L4, Cost table).`, `الـ B(D + RC) ده الـ SCAN cost بتاع الـ heap/sorted؛ الـ hashed delete في الـ model answer هو 1.25B(D + RC) + C + D (L4, Reading the exam choices).`, `صح حسب الإجابة النموذجية: search + C + D.`, `الـ 0.5B(D + RC) ده الـ equality search بتاع الـ HEAP file؛ الـ hashed delete هو search + C + D، ومكتوب في الـ model answer 1.25B(D + RC) + C + D (L4).`],
    [`الـ binary search محتاج الـ records تبقى مترتبة بالـ key، بس الـ heap file بيخزنها بترتيب دخولها، فمينفعش (L4, Heap file).`, `صح. الـ records بتتخزن بترتيب دخولها بغض النظر عن الـ key، فالمحاضرة بتقول إن الـ retrieval في الـ heap file بيبقى بالـ linear search بس (L4, Heap file).`, `الـ hashing محتاج hashed file العناوين فيه بتتحسب من الـ key؛ الـ heap file بيخزن الـ records بترتيب الدخول وخلاص (L4).`, `الـ B-tree index ده indexing structure منفصل؛ الـ heap file العادي ملوش index، فالـ linear search بس هو الممكن (L4).`],
    [`الـ append سريع: قراية واحدة لآخر page وكتابة واحدة، 2D + C. العيب الخطير بتاعه إنه بيسمح بالـ duplicates (L4, Heap file).`, `صح. الـ append عمره ما بيشيك على الـ keys الموجودة، فنفس الـ key ممكن يدخل مرتين (زي record تاني 4, Ali, CS عند offset 80) (L4, Heap file).`, `تزحيق الـ records اللي الـ key بتاعها أكبر ناحية الآخر ده بيحصل في الـ SORTED (sequential) file، مش الـ heap file (L4, Ordered file).`, `الـ hash function بتاعة الـ hashed files؛ الـ heap file بيعمل append في الآخر من غير ما يحسب أي address (L4).`],
    [`الـ append في الآخر ده الـ insert بتاع الـ heap file؛ في الـ sorted file هيبوّظ ترتيب الـ keys، فلازم الـ records تتزحّق (L4, Ordered file).`, `صح. الـ record الجديد بيروح لمكانه بالظبط حسب الـ key، فكل الـ records اللي الـ key بتاعها أكبر بتتنقل location واحد ناحية الآخر (زي 4 بيروح offset 60 و 5 بيتزحّق لـ 80) (L4, Ordered file).`, `الـ hash table بتاع الـ hashed files؛ الـ sequential file بيحافظ على ترتيب الـ keys وبيزحّق الـ records في الـ insert (L4).`, `ترتيب الـ keys لازم يتحافظ عليه، فالـ record بيروح لمكان محدد وكل الـ keys الأكبر بتتزحّق ناحية الآخر (L4, Ordered file).`],
    [`الـ 4000 ms = 200 × (10 + 10) ده الـ SCAN الكامل B(D + RC)؛ الـ equality search بيعمل scan على نص الـ file في المتوسط (L4, Heap file costs).`, `صح. الـ equality search = 0.5B(D + RC) = 0.5 × 200 × (10 + 10 × 1) = 100 × 20 = 2000 ms (L4, Heap file costs).`, `الـ 21 ms = 2 × 10 + 1 ده الـ INSERT cost بتاع الـ heap يعني 2D + C، مش الـ equality search (L4).`, `الـ 1000 ms = 0.5 × 200 × 10 شالت الـ RC term (10 records × 1 ms لكل page)؛ القيمة الصح 0.5 × 200 × 20 = 2000 ms (L4).`]
  ],
  extra: [
    [`الـ 8800 ms = 400 × (12 + 20 × 0.5) ده الـ SCAN cost يعني B(D + RC)؛ الـ insert بيقرا آخر page ويكتبها تاني بس (L4).`, `ده الـ equality-search cost، 0.5B(D + RC).`, `هنا عدّيت D واحدة بس. آخر page لازم تتقري <b>وكمان</b> تتكتب تاني.`, `صح. الـ Insert = 2D + C = 2 × 12 + 0.5 = 24.5 ms.`],
    [`صح. D·log₂B + C·log₂R = 10 × 8 + 1 × 4 = 84 ms.`, `بدّلت الـ logs: D·log₂R + C·log₂B = 40 + 8.`, `هنا استخدمت log₂B في الاتنين (80 + 8). الجزء بتاع الـ record بيستخدم log₂R.`, `ده الـ equality search بتاع الـ HEAP، 0.5B(D + RC).`],
    [`ده B(D + RC) بس. نسيت تزود الـ search cost.`, `صح. Search + 2 × 0.5B(D + RC) = 84 + 256 × (10 + 16) = 84 + 6656 = 6740 ms.`, `هنا زقيت نص الـ file مرة واحدة بس (84 + 3328). نص الـ file لازم يتقري <b>ويتكتب</b>: 2 × 0.5B(D + RC).`, `ده الـ search cost بس؛ متجاهل تزقيق الـ records اللي بعده.`],
    [`ده الـ search cost بس. نسيت + C + D.`, `هنا استخدمت الـ full scan (6656) كـ search. في المتوسط بتعمل scan لنص الـ file بس.`, `صح. الـ Search = 0.5 × 256 × (10 + 16) = 3328؛ الـ delete = 3328 + 1 + 10 = 3339 ms.`, `الـ 21 ms = 2 × 10 + 1 ده الـ INSERT cost بتاع الـ heap يعني 2D + C؛ الـ delete لازم الأول يعمل search على نص الـ file، وبعدين يضيف C + D (L4).`],
    [`ده الـ heap file، اللي الـ record بيتضاف فيه في الآخر ومن غير ما نهتم بالترتيب.`, `الـ records 4 و6 <b>و</b>7 كلهم الـ key بتاعهم أكبر، فالتلاتة بيتحركوا.`, `الـ records 1 و2 الـ key بتاعهم أصغر، فبيفضلوا مكانهم.`, `صح. كل الـ records اللي الـ key بتاعها أكبر (4، 6، 7) بتتحرك مكان واحد ناحية الآخر، والـ key 3 بيدخل عند offset 40.`],
    [`صح. ده التعريف اللي في السلايدز.`, `تجهيز وformatting الـ storage media دي مهمة من مهام الـ file MANAGEMENT (L1)؛ الـ organization method بيحدد مكان الـ records والعلاقة بين الـ key والـ address (L4).`, `الـ sectors per cluster ده إعداد physical للـ disk من L2؛ الـ file organization method بيحدد مكان الـ records والعلاقة بين الـ key والـ address (L4).`, `ده عن الـ file managers، مش طرق الـ organization.`],
    [`حجم الـ record بيأثر على المساحة، بس السلايدز بتقيس الكفاءة بطريقة تانية.`, `صح. كل ما الـ disk accesses تقل، كل ما الـ organization يبقى أكفأ.`, `ده تفصيلة في الـ logical design، مش مقياس الكفاءة.`, `وقت الـ CPU صغير جنب الـ disk access؛ السلايدز بتعد الـ disk accesses.`],
    [`صح. الـ records المطابقة ممكن تبقى في أي حتة في file مش مترتب، فلازم كل page تتقري.`, `الـ heap file مفيهوش ترتيب نستفيد منه، فالـ range search = B(D + RC)، زي الـ scan بالظبط.`],
    [`الـ indexing ده organization method منفصل (هو والـ heap والـ sequential والـ hashing)؛ الاسم التاني للـ heap file هو pile file (L4).`, `الـ sorted file هو الـ file المترتب (ORDERED / sequential).`, `صح. الـ heap file بيتسمى كمان unordered sequential file أو pile file.`, `الـ hashed file بيحسب address كل record بـ hash function.`],
    [`نص الـ file ده المتوسط لما الـ record يكون موجود. لو مفيش تطابق مش هتقدر توقف بدري.`, `صح. لو مفيش record مطابق، لازم تعمل scan للـ file كله، B(D + RC).`]
  ]
};

/* ===================== Lecture 5 ===================== */
AR.fp.lectures["5"] = {
  notes: [
    { h: `ليه الـ hashing؟`, pts: [
      `الـ Hashing تقنية بحث مفيدة في عمل الـ indexes. والدافع الأساسي ليها إنها <b>تحسّن وقت البحث</b>.`,
      `وقت البحث: الـ simple indexes مع binary search بـ <b>O(log N)</b>؛ الـ B-trees بـ <b>O(log<sub>k</sub> N)</b>؛ الـ hashing بـ <b>O(1)</b>.`
    ]},
    { h: `يعني إيه hashing؟`, pts: [
      `إنك تعرف مكان الـ key بمجرد ما تبص على الـ key نفسه. وعشان كده بنصمم <b>hash function</b>.`,
      `الـ hash function <b>h(k)</b> بتحوّل الـ <b>key</b> لـ <b>address</b>. والـ address space بيتحدد من الأول، مثلًا 1000 address متاحين، فالـ h بتحوّل كل الـ keys الممكنة U لـ {0، 1، …، 999}.`,
      `في الـ hashing <b>مفيش علاقة واضحة بين الـ key والمكان</b>.`,
      `الـ address بتاع كل record بيتحدد بـ algorithm رياضي. وده اسمه <b>hashed</b> file organization.`,
      `الـ <b>bucket</b> هو وحدة تخزين تقدر تشيل record واحد أو أكتر في الـ hash file.`
    ]},
    { h: `الـ Collisions`, pts: [
      `ممكن 2 keys مختلفين يتحوّلوا لـ <b>نفس الـ address</b>. وده اسمه <b>collision</b>.`,
      `الـ keys اللي بيحصل بينهم collision اسمهم <b>synonyms</b>.`
    ]},
    { h: `hash function بسيطة (Midterm Model A)`, pts: [
      `الخطوة 1: نمثّل الـ key كرقم، بإننا نجمّع كل 2 characters مع بعض (الـ ASCII codes).`,
      `الخطوة 2: نعمل fold ونجمع، ونقسم على عدد prime (19937) عشان نمنع الـ overflow.`,
      `الخطوة 3: نقسم على حجم الـ address space وناخد الباقي (remainder) كـ home address.`
    ]},
    { h: `تكاليف الـ Hashed file` }
  ],
  cards: [
    `بتحوّل الـ key لـ address.`,
    `2 keys مختلفين بيطلعوا نفس الـ address بعد الـ hash.`,
    `الـ keys اللي بيحصل بينهم collision (نفس الـ address).`,
    `وحدة تخزين بتشيل record واحد أو أكتر في الـ hash file.`,
    `O(log N) / O(log_k N) / O(1).`,
    `H + D + 0.5RC`,
    `الـ Hashing بيبوّظ ترتيب الـ keys، فلازم تعمل scan للـ file كله (1.25B pages).`,
    `الـ address بتاع كل record بيتحدد بـ algorithm رياضي.`
  ],
  qa: [
    `الحل: <code>int Hash(char key[12], int maxAddress){ int sum=0; for(int j=0;j&lt;12;j+=2) sum += key[j]*key[j+1]; sum %= 19937; return sum % maxAddress; }</code>`,
    `الـ collision بيحصل لما 2 keys مختلفين يطلعوا نفس الـ address. والـ keys دول اسمهم synonyms.`,
    `الـ hash function بتحسب الـ address على طول من الـ key، فبيبقى O(1). أما الـ simple index فمحتاج binary search بـ O(log N)، والـ B-tree محتاج O(log_k N).`
  ],
  quiz: [
    [`الـ sequential (ordered) file بيحط الـ records بترتيب قيمة الـ key؛ مفيش algorithm بيحسب الـ address بتاع كل record (L4, Ordered file).`, `الـ indexed file بيلاقي الـ records عن طريق index (lookup) structure منفصل، مش بإنه يحسب الـ address بـ formula (L5, Why hashing?).`, `صح. في الـ hashed file organization الـ hash function h(k)، وهي mathematical algorithm، بتحسب الـ address بتاع كل record من الـ key بتاعه (L5, What is hashing?).`, `الـ "None" غلط لأن المحاضرة مسمية الـ organization دي بالظبط: hashed، واللي فيها h(k) بتحسب الـ address (L5).`],
    [`صح. المحاضرة بتعرّف الـ bucket إنه unit of storage تقدر تشيل record واحد أو أكتر في الـ hash file (L5, What is hashing?).`, `مصطلح تخزين عام، مش مصطلح الـ hashing.`, `الـ blocks دي الطريقة اللي الـ DBMS بينظم بيها الـ tracks physically (L2)؛ في الـ hash file وحدة التخزين اسمها bucket (L5).`, `الـ nodes بتاعة الـ trees والـ linked lists (زي الـ B-trees)؛ وحدة التخزين في الـ hash file هي الـ bucket (L5).`],
    [`ليها علاقة، بس الحدث نفسه اسمه collision.`, `صح. لما two keys مختلفين يتحولوا بالـ h(k) لنفس الـ address، الحدث ده اسمه collision؛ والـ keys نفسهم اسمهم synonyms (L5, Collisions).`, `الـ synonyms دي الـ KEYS اللي بتعمل collision (بيطلعوا نفس الـ address)؛ الحدث نفسه اسمه collision (L5, Collisions).`, `الـ fragmentation هي المساحة المهدرة جوه الـ sector لما الـ records متقعدش فيه بالظبط (L2)؛ ملهاش علاقة بإن two keys ياخدوا نفس الـ address (L5).`],
    [`الـ O(n) ده الـ sequential search، اللي بيقرا الـ records واحد واحد؛ الـ hashing بيحسب الـ address على طول (L3, L5).`, `الـ O(log N) ده simple index بندور فيه بالـ binary search؛ الـ hashing أسرع، O(1) (L5, Why hashing?).`, `الـ O(log_k N) ده search time بتاع الـ B-trees؛ الـ hashing بيروح للـ address على طول، O(1) (L5, Why hashing?).`, `صح. الـ h(k) بتحسب address الـ record مباشرة من الـ key، فالـ search time مبيزيدش مع N: O(1)، مقابل O(log N) للـ index و O(log_k N) للـ B-tree (L5, Why hashing?).`],
    [`الـ hashing مبيرتبش حاجة؛ بالعكس هو بيبوّظ ترتيب الـ keys (وعشان كده الـ range search في الـ hashed file بيعمل scan على الـ file كله) (L5).`, `صح. القسمة على الـ prime 19937 بتخلي الـ folded sum محدود فمبيعملش overflow؛ وبعدين الـ % maxAddress في الآخر بتحوله للـ home address (L5, Simple hash function).`, `الـ function بتحسب address بس؛ الـ synonyms مجرد keys صادف إنهم أخدوا نفس الـ address، والـ % 19937 مبتدورش عليهم (L5).`, `الـ hashing هنا للـ addressing، مش للـ security.`],
    [`صح. تحسب الـ hash (H)، تقرا page واحدة (D)، وتعمل scan لنص الـ page في المتوسط.`, `الـ 0.5B(D + RC) ده الـ equality search بتاع الـ HEAP file (scan على نص الـ file)؛ الـ hashing بيقرا page واحدة بس (L4, Cost table).`, `الـ D·log₂B + C·log₂R ده binary search، يعني الـ equality search بتاع الـ SORTED file؛ الـ hashing بيحسب الـ page على طول (L4, Cost table).`, `الـ 2D + C ده الـ insert بتاع الـ HEAP file (تقرا آخر page وتكتبها تاني)، مش search (L4, Cost table).`]
  ],
  extra: [
    [`صح. 65 × 66 = 4290؛ 67 × 68 = 4556؛ الـ sum = 8846؛ 8846 % 19937 = 8846؛ 8846 % 100 = 46.`, `هنا نطيت آخر خطوة % maxAddress. الـ address لازم يبقى في 0..99.`, `هنا جمعت الـ 4 codes (266) بدل ما تضرب كل 2 في بعض.`, `الـ 90 = 4290 % 100 استخدمت أول pair بس (65 × 66)؛ لازم تضيف التاني 67 × 68 = 4556: 8846 % 100 = 46 (L5).`],
    [`30 mod 13 = 4 و44 mod 13 = 5: addresses مختلفة.`, `صح. 27 mod 13 = 1 و53 mod 13 = 1. الاتنين بيطلعوا نفس الـ address، فبيحصل بينهم collision ويبقوا synonyms.`, `19 mod 13 = 6 و33 mod 13 = 7: addresses مختلفة.`, `40 mod 13 = 1 و64 mod 13 = 12: addresses مختلفة.`],
    [`ده خارج القسمة (1234 / 101 ≈ 12)، مش الباقي.`, `هنا استخدمت آخر رقمين، مش باقي القسمة على 101.`, `صح. 101 × 12 = 1212، و1234 - 1212 = 22.`, `الـ addresses من 0 لـ 100، فالـ 101 برا الـ address space.`],
    [`هنا عملت scan للـ page كلها (RC = 10) بدل نصها في المتوسط.`, `هنا سبت H، اللي هو وقت حساب الـ hash.`, `هنا سبت الجزء 0.5RC بتاع إنك تشيك على الـ records اللي في الـ page.`, `صح. 1 + 10 + 0.5 × 20 × 0.5 = 1 + 10 + 5 = 16 ms.`],
    [`المحاضرة بتقول العكس: في الـ hashing مفيش علاقة واضحة بين الـ key والـ location؛ الـ h(k) هي اللي بتحسبه (L5, What is hashing?).`, `صح. الـ hash function هي اللي بتحسب الـ address، ومفيش علاقة واضحة بين الـ key والمكان.`],
    [`صح. الـ records اللي في الـ range ممكن تبقى في أي bucket، فلازم كل page تتقري.`, `مينفعش تنط أي pages؛ كل الـ 1.25B pages بتتقري.`, `الـ 1.25 ده عن عدد الـ pages، مش عدد مرات حساب الـ hash.`, `الـ Binary search محتاج records مترتبة، والـ hashed file مش كده.`],
    [`عدد الـ data pages ده اسمه B في الـ cost model؛ الـ H هو الوقت اللي بياخده حساب الـ hash function (L4–L5, Cost model).`, `صح. تحسب h(k) (الـ H)، تقرا الـ page الواحدة (D)، وتشيك على نص الـ records بتاعتها في المتوسط (0.5RC).`, `الـ Cylinder height ده مصطلح من هندسة الـ disk في Lecture 2.`, `الـ collisions مش موجودة في الـ formula؛ الـ H هو وقت حساب h(k)، والـ D قراية page واحدة، والـ 0.5RC تشييك نص الـ records اللي فيها (L5).`],
    [`ده شغل sum % 19937 (القسمة على الـ prime).`, `دمج الـ characters كـ pairs ده سطر الـ folding sum += key[j] * key[j+1]؛ السطر الأخير بيحوّل الـ sum لجوه الـ address space (L5).`, `صح. باقي القسمة على حجم الـ address space هو الـ home address.`, `الـ function بتحسب address بس؛ مش بتكتشف الـ collisions.`],
    [`صح. الـ address space بيتحدد من الأول، والـ h بتحوّل كل الـ keys الممكنة جواه.`, `السلايدز بتستخدم المثال ده بالظبط: 1000 address، فالـ h بتحوّل الـ keys لـ 0..999.`],
    [`كل page بتتقري مرة واحدة؛ التكلفة الزيادة جاية من إن الـ pages أكتر.`, `الـ scan بيقرا كل page ورا التانية وعمره ما بيحسب h(k)؛ الـ 0.25 الزيادة جاية من إن الـ pages مليانة ~80% بس (L5).`, `الـ hashing مبيرتبش الـ file؛ بيبعتر الـ records حسب h(k). الـ factor 1.25 جاي من إن الـ buckets مليانة ~80% (L5).`, `صح. 1 / 0.8 = 1.25، فبيبقى فيه 1.25B pages لازم تتقري.`]
  ]
};

/* ===================== Exams ===================== */
AR.fp.exams = [
  /* ---------- Model A ---------- */
  { sections: [
    { items: [
      { why: `الـ Arms هي اللي بتشيل الـ heads وتوجهها وتحركها (وتحريكها = seeking). الـ arm assembly هو المجموعة كلها؛ الـ platters بتخزن الداتا؛ والـ spindle بيلف.`, ow: [null, `الـ arm assembly هو المجموعة الداخلية كلها اللي شايلة الـ arms والـ heads؛ الجزء اللي بيشيل الـ heads ويحركها هو الـ arms (L2, Disk components).`, `الـ platters هي الـ disks الدايرية اللي بتخزن الـ data على الوشين؛ مبتشيلش الـ heads (L2).`, `الـ spindle بيمسك الـ platters وبيلفها تحت الـ heads؛ مبيحركش الـ heads (L2).`] },
      { why: `الـ Seek = حركة الـ arm. الـ Latency/rotation = استنى الـ platter يلف. الـ Transfer = قراية الـ bytes.`, ow: [`الـ transfer time هو وقت مرور الـ head على الـ data بعد ما يتظبط في مكانه، مش حركة الـ arm (L2, Cost of a disk access).`, `الـ latency (rotational delay) هو الانتظار لحد ما الـ sector يلف ويجي تحت الـ head، بعد ما الـ arm يكون في مكانه خلاص (L2).`, `اللف بيعمله الـ spindle وبيسبب الـ rotational delay؛ تحريك الـ arm اسمه seeking (L2).`, null] },
      { why: `الـ sequential search بيقرا الـ records بالترتيب لحد ما يلاقي match، فأسوأ حالة بيقرا الـ n records كلهم: O(n) (L3, Managing files of records).`, ow: [null, `الـ O(1) ده direct access بالـ RRN (seek واحد)، مش sequential access (L3).`, `الـ log n ده binary search على file متترتب بالـ key، مش sequential access (L3–L4).`, `التلاتة دول بتوع methods مختلفة (sequential O(n)، binary log n، direct O(1))، فمش كلهم صح (L3).`] },
      { why: `الـ Cluster = 4 × 512 = 2048 B. أما 32768 = 64 × 512 فده حجم الـ track (مجرد تشتيت).`, ow: [`الـ 32768 = 64 × 512 دي سعة الـ TRACK؛ الـ cluster هو 4 sectors بس: 4 × 512 (L2, Capacity formulas).`, null, `الـ 128 = 512 / 4 قسمت بدل ما تضرب؛ الـ cluster = sectors per cluster × bytes per sector (L2).`, `الـ 8 bytes مش طالعة من أي formula؛ الـ cluster اللي فيه 4 sectors بيشيل 4 × 512 = 2048 B (L2).`] },
      { why: `تقرا آخر page (D)، تضيف الـ record (C)، وتكتبها تاني (D).`, ow: [`ده الـ insert/delete بتاع الـ sorted file: binary search وتزحيق نص الـ file، B(D + RC) (L4, Cost table).`, `الـ sorted search مضاف على 2D + C مش مطابق لأي حاجة في الـ cost table؛ الـ heap insert مش محتاج search (L4).`, `الـ 1.25B(D + RC) ده الـ scan بتاع الـ hashed file (الـ pages مليانة ~80%)، مش heap insert (L4).`, null] },
      { why: `الـ Hashed pages مليانة ~80%، فبيبقى فيه 1.25B pages تعملها scan.`, ow: [`ده الـ insert/delete cost بتاع الـ sorted file (binary search + تزحيق نص الـ file)، مش scan (L4).`, `الـ sorted search زائد الـ heap insert 2D + C مش formula من الـ table؛ الـ hashed scan هو 1.25B(D + RC) (L4).`, null, `الـ B(D + RC) ده الـ scan بتاع الـ heap/sorted؛ الـ hashed pages مليانة ~80%، فبتقرا pages أكتر بـ 1.25 مرة (L4).`] }
    ]},
    { items: [
      { why: `بنعمل fold لكل 2 characters، ونحدد الـ sum بـ modulus عدد prime، وبعدين ناخد الـ mod على حجم الـ address space عشان يطلع الـ home address.`,
        ans: `<pre>int Hash(char key[12], int maxAddress)
{
    int sum = 0;
    for (int j = 0; j &lt; 12; j = j + 2)
        sum = sum + key[j] * key[j+1];
    sum = sum % 19937;
    return sum % maxAddress;
}</pre>` }
    ]},
    { items: [
      { why: `الجدول بتاع Lecture 3.`,
        ans: `<table><tr><th>النوع</th><th>الميزة</th><th>العيب</th></tr><tr><td>Fixed</td><td>سهل في القراية والتخزين</td><td>بيضيع مساحة في الـ padding</td></tr><tr><td>With length indicator</td><td>سهل تنط لآخر الـ field</td><td>الـ fields الطويلة محتاجة أكتر من byte واحد عشان تخزن الطول (الـ max size &gt; 256)</td></tr><tr><td>Delimited fields</td><td>ممكن يضيع مساحة أقل من الطريقة اللي بالطول</td><td>لازم تشيك كل byte في الـ field وتقارنه بالـ delimiter</td></tr><tr><td>Keyword</td><td>الـ fields بتوصف نفسها؛ وبيسمح إن fields تبقى ناقصة</td><td>بيضيع مساحة في الـ keywords</td></tr></table>` },
      { why: `اللفة الواحدة = 60,000/5000 = 12 ms، ونصها = 6 ms.`,
        ans: `الـ Average latency = وقت ½ لفة = (0.5 × 1000 × 60) / 5000 = <b>6 ms</b>.` },
      { why: `دايمًا زوّد الـ overhead على كل block وخد الـ floor، عشان الـ block مينفعش يتقسم على tracks.`,
        ans: `الـ Track capacity = 20 × 512 = 10,240 B<br>الـ Block size = 128 × 20 + 500 = 3060 B<br>الـ Blocks/track = ⌊10,240 / 3060⌋ = ⌊3.35⌋ = 3 blocks<br>الـ Records/track = 3 × 20 = <b>60 record</b>` },
      { why: `الـ Cylinder = 12 track وعدد الـ cylinders = 500. و61,440,000 / 1,048,576 ≈ 58.6 MB.`,
        ans: `الـ Disk capacity = track capacity × cylinder height × tracks/surface = 10,240 × 12 × 500 = <b>61,440,000 B ≈ 58.6 MB</b>.` },
      { why: `كل sector بياخد 1/20 من اللفة. والإجابة النموذجية كاتباها [(3×60)/5000]/20، وهي نفس الحاجة.`,
        ans: `اللفة = 60,000/5000 = 12 ms<br>الـ Transfer (3 sectors) = 3 × 12 / 20 = <b>1.8 ms</b><br>الـ Average total = seek 7 + latency 6 + transfer 1.8 = <b>14.8 ms</b>` }
    ]}
  ]},
  /* ---------- Model B ---------- */
  { sections: [
    { items: [
      { why: `الـ cylinder هو كل الـ tracks اللي تحت الـ heads عند وضع واحد للـ arm، فمش محتاج تحرك الـ arm. بس الـ rotation لسه مطلوب.`, ow: [`الـ spindle عمره ما بيبطل يلف الـ platters؛ اللي بيفضل ثابت وانت بتقرا cylinder واحد هو الـ arm assembly (L2).`, null, `الـ rotation لسه مطلوب عشان يجيب كل sector تحت الـ head؛ اللي بنستغنى عنه هو حركة الـ arm بس (L2).`, `الـ seeking (تحريك الـ arm) هو نفس الفكرة، بس الـ model answer هو (b)، الـ arm assembly، عشان يطابق كلام السلايد "without moving the arm" (L2).`] },
      { why: `الـ direct access بيعمل seek على طول للـ byte offset بتاع الـ record (RRN × record size) في access واحد، فالـ cost مش معتمد على n: O(1) (L3, Managing files of records).`, ow: [`الـ O(n) ده الـ sequential search، اللي بيقرا الـ records بالترتيب لحد ما يلاقي match (L3).`, null, `الـ log n ده binary search على file متترتب؛ الـ direct access محتاج seek واحد (L3–L4).`, `الـ O(1) بس هو اللي بيوصف الـ direct access؛ الـ O(n) ده sequential والـ log n ده binary search (L3).`] },
      { why: `التلاتة التانيين دول تقنيات file MANAGEMENT.`, ow: [null, `تجهيز/formatting الـ storage media دي مهمة file MANAGEMENT، مش اللي الـ organization methods لازم توفره (L1).`, `الـ allocating للـ storage space والـ addressing دي مهمة file MANAGEMENT (L1).`, `إدارة الـ free space دي مهمة file MANAGEMENT؛ الـ organization لازم تدي fast access و good space use (L1).`] },
      { why: `في الـ hashed file organization الـ hash function h(k)، وهي mathematical algorithm، بتحول الـ key بتاع كل record للـ address بتاعه (L5, What is hashing?).`, ow: [`الـ sequential file بيخزن الـ records بترتيب الـ key؛ مفيش algorithm بيحسب كل address (L4).`, `الـ indexed file بيلاقي الـ records عن طريق index structure منفصل، مش formula (L5).`, null, `غلط لأن المحاضرة مسمية الـ organization دي: hashed، واللي فيها h(k) بتحسب الـ address (L5).`] },
      { why: `binary search عشان تلاقيه (Dlog₂B + Clog₂R)، وبعدين تزق نص الـ file: 2 × 0.5B(D+RC) = B(D+RC).`, ow: [`الـ 2D + C ده الـ insert بتاع الـ heap file (تقرا آخر page، تضيف، تكتبها تاني)، مش sorted delete (L4).`, `الـ B(D + RC) ده جزء التزحيق بس (أو scan)؛ ناقص الـ search term يعني Dlog₂B + Clog₂R (L4).`, `الـ 1.25B(D + RC) ده الـ scan بتاع الـ hashed file، مش sorted delete (L4).`, null] },
      { why: `الـ hashed scan بيقرا كل bucket page؛ الـ buckets بتتساب مليانة حوالي 80%، فالـ data بتاخد 1/0.8 = 1.25 مرة pages أكتر: 1.25B(D + RC) (L4, Cost table).`, ow: [`ده binary-search term زائد D + C، ومش مطابق لأي scan formula؛ الـ scan لازم يقرا كل الـ pages (L4).`, `الـ B(D + RC) ده الـ scan بتاع الـ heap/sorted؛ الـ hashed pages مليانة ~80% بس، فهو أكبر بـ 1.25 مرة (L4).`, null, `الـ 1.25B(D + RC) + D + C ده الـ hashed DELETE في الـ model answer (search + C + D)، مش الـ scan (L4).`] }
    ]},
    { items: [
      { why: `تعمل seekg للآخر، والـ tellg تديك الحجم، وبعدين read واحدة وwrite واحدة بدل الـ loop.`,
        ans: `<pre>#include &lt;iostream&gt;
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
}</pre>` }
    ]},
    { items: [
      { why: `من Lecture 2، جزء "Disk as a bottleneck". أي أربعة منهم ياخدوا الدرجة.`,
        ans: `1. <b>الـ Multiprocessing</b>: الـ CPU يشتغل على jobs تانية وهو مستني الـ disk.<br>2. <b>الـ Disk striping</b>: blocks مختلفة من الـ file على drives مختلفة، عشان الـ processes المستقلة متعطلش بعض (parallelism).<br>3. <b>الـ RAID</b>: Redundant Array of Independent Disks.<br>4. <b>الـ RAM disk</b>: جزء من الـ main memory بيعمل نفسه disk (سرعة مقابل volatility).<br>5. <b>الـ Disk cache</b>: الـ memory شايلة pages من الـ disk؛ تشيك على الـ cache الأول وتروح للـ disk لو حصل miss.` },
      { why: `الـ Track = 15,360 B، واضربه × 10 tracks في الـ cylinder.`,
        ans: `الـ Cylinder size = 30 × 512 × 10 = <b>153,600 B = 150 KB</b><br>الـ Records في الـ cylinder = 153,600 / 128 = 1200 record` },
      { why: `قرّب لفوق: الـ track الناقص لازم يتحجز برضه.`,
        ans: `الـ File = 10,000 × 128 = 1,280,000 B = 1250 KB<br>الـ Track = 30 × 512 = 15,360 B = 15 KB<br>الـ Tracks = 1250 / 15 = 83.3، يبقى <b>84 track</b>` },
      { why: `عدد الـ cylinders = عدد الـ tracks في كل surface = 1000.`,
        ans: `الـ Cylinder size × tracks/surface = 150 KB × 1000 = 150,000 KB ≈ <b>146.5 MB</b>` },
      { why: `الإجابة النموذجية بتحسب "(2/1000)×60 = 120 ms" وتقسم على 30. ده بيدي نفس الـ 4 ms، بس الطريقة الأوضح إنك تاخد لفة واحدة (60 ms) × 2/30. والـ average rotational delay (5 ms) معطى، فمتحسبوش تاني من الـ rpm.`,
        ans: `اللفة = 60,000/1000 = 60 ms<br>الـ Transfer (2 sectors) = 2 × 60 / 30 = <b>4 ms</b><br>الـ Total = seek 10 + rotational delay 5 + transfer 4 = <b>19 ms</b>` }
    ]}
  ]},
  /* ---------- Model C ---------- */
  { sections: [
    { items: [
      { why: `وعشان كده منقدرش نرجّع الـ records من الـ stream file.`, ow: [null, `الـ "No space" مش هو التعريف؛ الفكرة إن مفيش أي added information (delimiters، lengths) بتتكتب (L3, Stream files).`, `الـ added information (delimiters، length indicators، keywords) دي اللي الـ field structures بتضيفها؛ الـ stream مفيهوش منها حاجة (L3).`, `الـ "Space" مش هو التعريف؛ الـ stream file مفيهوش أي added information (L3).`] },
      { why: `الـ binary search على file متترتب بيقارن الـ key بالـ record اللي في النص وبيرمي نص الـ range الباقي كل خطوة، فمحتاج حوالي log₂ n accesses (L4, Sorted file).`, ow: [`الـ O(n) ده الـ linear (sequential) search، اللي بيقرا الـ records واحد واحد (L3).`, `الـ O(1) ده direct access بالـ RRN بـ seek واحد (L3).`, null, `الـ O(n²) ده هيبقى أبطأ حتى من الـ sequential search؛ الـ binary search هو O(log₂ n) (L4).`] },
      { why: `المحاضرة بتسمي two file managers (system software): الـ operating system والـ DBMS، فـ both a and b صح (L1, File managers).`, ow: [`الـ OS فعلاً file manager، بس الـ DBMS كمان، فدي نص الإجابة بس (L1).`, `الـ DBMS فعلاً file manager، بس الـ OS كمان، فدي نص الإجابة بس (L1).`, `الـ MIS ده management information system، مش واحد من الـ file managers (OS، DBMS) اللي المحاضرة سمّتهم (L1).`, null] },
      { why: `المحاضرة بتعرّف الـ bucket إنه الـ unit of storage اللي تقدر تشيل record واحد أو أكتر في الـ hash file organization (L5, What is hashing?).`, ow: [null, `الـ disk page مصطلح تخزين عام (الـ page = block في الـ cost model)؛ المصطلح بتاع الـ hashing هو bucket (L5).`, `الـ blocks دي الطريقة اللي الـ DBMS بينظم بيها الـ tracks physically (L2)؛ في الـ hashing الوحدة اسمها bucket (L5).`, `الـ nodes بتاعة الـ trees والـ linked lists، مش الـ hash file organization (L5).`] },
      { why: `الـ heap file مش مترتب، فالـ equality search بيبقى linear؛ وفي المتوسط الـ match بيتلاقى بعد scan لنص الـ file: 0.5B(D + RC) (L4, Heap file costs).`, ow: [`الـ 2D + C ده الـ INSERT cost بتاع الـ heap (تقرا آخر page وتكتبها تاني)، مش search (L4).`, null, `الـ 1.25B(D + RC) + C + D ده الـ delete بتاع الـ hashed file في الـ model answer (L4).`, `الـ Dlog₂B + Clog₂R ده binary search، يعني الـ equality search بتاع الـ SORTED file؛ الـ heap file مش مترتب (L4).`] },
      { why: `الإجابة النموذجية: search + C + D، ومستخدمة 1.25B(D+RC) كـ search.`, ow: [`الـ Dlog₂B + Clog₂R ده الـ equality search بتاع الـ sorted file، مش hashed delete (L4).`, `الـ B(D + RC) ده الـ scan cost بتاع الـ heap/sorted (L4).`, null, `الـ 0.5B(D + RC) ده الـ equality search بتاع الـ heap file (L4).`] },
      { why: `الـ scan بيجيب كل record، فكل الـ B pages بتتقري (D لكل واحدة) والـ R records اللي في كل page بتتعالج (RC): B(D + RC)، زي الـ heap scan بالظبط (L4, Sorted file costs).`, ow: [`الـ Dlog₂B + Clog₂R ده الـ equality search بتاع الـ sorted file (binary search)، مش full scan (L4).`, null, `الـ 1.25B(D + RC) ده الـ scan بتاع الـ hashed file، اللي الـ pages فيه مليانة ~80% بس (L4).`, `الـ 0.5B(D + RC) ده الـ equality search بتاع الـ heap file (نص الـ file في المتوسط) (L4).`] }
    ]},
    { items: [
      { why: `الأحجام الثابتة معناها إن الـ offset = RRN × record size. الـ seekp بيحط الـ put pointer في مكانه، والـ write بتكتب فوق الـ record.`,
        ans: `<pre>struct Item {
    char desc[31];
    int qty;
    float price;
};

void UpdateRecord(fstream &amp;file, Item &amp;newItem, int RRN)
{
    // newItem contains the new record to overwrite the old one
    file.seekp(RRN * sizeof(newItem), ios::beg);
    file.write((char *) &amp;newItem, sizeof(newItem));
}</pre>` }
    ]},
    { items: [
      { why: `الجداول بتاعة Lecture 1 وLecture 2.`,
        ans: `<b>(i)</b> الـ Physical file: مجموعة bytes على الـ disk؛ ليه physical name (A.txt)؛ بيستخدم مرة واحدة وقت الـ opening. الـ Logical file: channel بيوصل البرنامج بالـ physical file؛ الـ logical name بتاعه variable في البرنامج (infile، fp)؛ بيستخدم أي عدد مرات محتاجه (open، read، write، append، close).<br><b>(ii)</b> الـ Seek time: الوقت اللي الـ read/write arm بياخده عشان يروح للـ cylinder الصح. الـ Rotational delay (latency): الوقت اللي الـ disk بياخده عشان يلف ويجيب الـ sector المطلوب تحت الـ head. الـ Transfer time: أول ما الـ head يبقى فوق الداتا، ده الوقت اللي بياخده عشان ينقلها.` },
      { why: `الإجابة النموذجية بتوري الـ cylinder size بس. كمّل بالقسمة على حجم الـ record.`,
        ans: `الـ Cylinder size = 30 × 512 × 10 = 153,600 B<br>الـ Records/cylinder = 153,600 / 128 = <b>1200 record</b>` },
      { why: `الإجابة النموذجية كاتبة على السطر ده "tracks" بالغلط، بس القيمة دي sectors.`,
        ans: `الـ File = 10,000 × 128 = 1,280,000 B<br>الـ Sectors = 1,280,000 / 512 = <b>2500 sector</b>` },
      { why: `الـ Cylinder size × عدد الـ cylinders.`,
        ans: `150 KB × 1000 = 150,000 KB ≈ <b>146.5 MB</b>` },
      { why: `Seek + الـ rotational delay المعطى + transfer.`,
        ans: `اللفة = 60 ms<br>الـ Transfer = 4 × 60 / 30 = <b>8 ms</b><br>الـ Total = 10 + 5 + 8 = <b>23 ms</b>` }
    ]}
  ]}
];

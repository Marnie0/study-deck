// Egyptian Arabic for File Processing, aligned item by item with fp.js and extra/fp.js.
window.AR = window.AR || {};
AR.fp = {
 "lectures": {
  "1": {
   "notes": [
    {
     "h": "الفرق بين الـ data structure والـ file structure",
     "pts": [
      "الاتنين فيهم <b>طريقة تمثيل للداتا</b> + <b>عمليات للوصول للداتا</b>.",
      "الفرق: الـ data structures بتتعامل مع الداتا اللي في الـ <b>main memory</b>، أما الـ file structures فبتتعامل مع الداتا اللي على الـ <b>secondary storage</b> (يعني الـ files)."
     ]
    },
    {
     "h": "مراجع المادة وخطة المحاضرة",
     "pts": [
      "مراجع المادة (slide 3):<br>• كتاب <bdi><i>File Structures: An Object-Oriented Approach with C++</i></bdi> بتاع Folk و Zoellick و Riccardi، وده <b>المرجع الأساسي</b>.<br>• كتاب <bdi><i>File Organization and Processing</i></bdi> بتاع Alan L. Tharp.<br>• كتاب <bdi><i>Database Management Systems</i></bdi> بتاع Ramakrishnan و Gehrke.<br>• كتاب <bdi><i>Operating System Concepts</i></bdi> بتاع Silberschatz و Galvin و Gagne.<br>• والـ lecture notes بتاعة Prof Lucia Moura.",
      "المحاضرة جزئين (slides 5 و 6 و 18):<br>• الـ <b>Part (1)</b> مقدمة عن الـ file management والـ organization، وفيه:<br>(1) الـ data processing<br>(2) الـ file والـ computer storage<br>(3) الـ file structures<br>(4) الـ file organization<br>(5) الـ file management<br>(6) الـ file managers<br>• الـ <b>Part (2)</b> العمليات الأساسية على الـ files في C/C++، وفيه: الـ physical file والـ logical file، وفتح وقفل الـ files، والقراية والكتابة، وبرنامج مثال، والـ full methods، وquiz."
     ]
    },
    {
     "h": "(1) الـ Data processing",
     "pts": [
      "الـ <b>Data processing</b> (slide 7):<br>• الـ <b>Storage of data</b>: الداتا بتتحفظ جوه files، والـ files بتتحفظ على storage devices.<br>• الـ <b>Organization of data</b>: إزاي ننظم الـ files على الـ primary storage والـ secondary storage.<br>• الـ <b>Access of data</b>: يا sequential يا direct access.<br>• الـ <b>Processing of data</b>: معالجة الداتا بعد الـ storage والـ organization والـ access.",
      "الداتا بتتحفظ في files، والـ files بتتحفظ على primary storage (الـ RAM) أو secondary storage (الـ hard disk). والتنظيم يا إما <b>sequential</b> access يا إما <b>direct</b> access."
     ]
    },
    {
     "h": "(2) الـ Files والـ computer storage",
     "pts": [
      "الـ <b>File</b> = مجموعة داتا متحطوطة على storage <b>secondary و non-volatile</b> (يعني مش بتضيع لما الكهربا تقطع)، زي الـ hard disk والـ magnetic tape والـ optical media.",
      "الـ computer storage ممكن يبقى secondary storage أو main memory.<br>تخزين الـ files بطيء عشان فيه <b>أجزاء كتير بتتحرك</b> (moving parts).",
      "رسمة (slide 9، اسمها Computer Storage):<br>• الـ <b>Main memory (RAM)</b>: هنا الداتا بتتعالج (manipulated)، وهي سريعة وصغيرة وغالية و volatile.<br>• الـ <b>Secondary storage</b> (disk عليه files زي A.mp3 و first.java و mo.flv): هنا الداتا بتتخزن، وهو بطيء وكبير ورخيص و stable. أمثلة: الـ disk والـ tape والـ CD-ROM.<br>• الداتا بتتنقل بين الاتنين. والتعليقات اللي على الرسمة: «Files will store here» على الـ secondary storage، و«Why is file storage so slow?»، و«File storage systems have many moving parts».",
      "ليه محتاجين files؟<br>• لإنها الطريقة الوحيدة المناسبة لتخزين كمية معلومات كبيرة (صور، مزيكا، فيديو).<br>• والـ operating systems أكبر من إنها تدخل كلها في الـ memory.<br>• والـ databases موجودة في كل حتة.<br>• وكمان عشان الـ backup والـ archiving."
     ],
     "figH": {
      "fp-storage": "الـ computer storage: الـ main memory قصاد الـ secondary storage"
     }
    },
    {
     "h": "(3) الـ File structures",
     "pts": [
      "الـ <b>Logical structure</b>: الـ programmer شايف الـ file إزاي (زي text أو image أو data file…).<br>الـ <b>Physical structure</b>: الـ file متخزن إزاي فعلًا على الـ secondary storage."
     ]
    },
    {
     "h": "(4) الـ File organization",
     "pts": [
      "رسمة (slide 12، اسمها File Organization): كومة كتب مكركبة مكتوب عليها <b>Unorganized</b>، وجنبها كتب مترتبة على الرفوف مكتوب عليها <b>Organized</b>.",
      "• <b>طرق الـ logical organization</b>: الـ heap والـ indexing والـ hashing.<br>• <b>طرق الـ physical organization</b>: إننا ننظم الـ tracks بالـ <b>sectors</b> أو بالـ <b>blocks</b>.",
      "طرق تنظيم الـ file لازم توفر <b>access time سريع</b> و<b>استغلال كويس للمساحة</b> (good space utilization)."
     ],
     "figH": {
      "fp-file-org": "الـ file organization: من كومة مكركبة لرفوف مترتبة"
     }
    },
    {
     "h": "(5) الـ File management و(6) الـ file managers",
     "pts": [
      "الـ <b>File management</b> بيشمل:<br>• تجهيز/عمل format للـ storage media<br>• حجز مساحة التخزين والـ addressing<br>• وإدارة المساحة الفاضية (free space).",
      "الـ <b>File managers</b> (دي system software): الـ <b>OS</b> والـ <b>DBMS</b>.",
      "أهداف المادة:<br>• نجيب المعلومة بـ <b>أقل عدد ممكن من الـ disk accesses</b>.<br>• ونجمّع المعلومات اللي ليها علاقة ببعض عشان أي طلب يحتاج <b>رحلة واحدة بس للـ disk</b>."
     ]
    },
    {
     "h": "الـ Physical file مقابل الـ logical file",
     "pts": [
      "رسمة (slide 20، اسمها Physical File vs. Logical File): فيه hard disk عليه 6 physical files هما A.txt و b.txt و aa.txt و aa.mp3 و a.doc و z.mp3. برنامج C/C++ بيتعامل مع الـ physical file اللي اسمه b.txt عن طريق الـ logical name <b>infile</b>، وبرنامج تاني بيتعامل مع aa.txt عن طريق logical name بتاعه هو كمان اسمه <b>infile</b>.",
      "تعريف الـ logical name (slide 22):<br>• في C بنكتب:<span class=\"ltr\"><code>FILE * outfile;</code></span>• وفي C++ الـ logical name بيبقى object من الـ class اللي اسمها <code>fstream</code>، وبنكتب:<span class=\"ltr\"><code>fstream outfile;</code></span>وفي اللغتين الـ logical name اللي هو outfile بيتربط بالـ physical file اللي هو myfile.txt وقت <b>فتح</b> الـ file."
     ],
     "figH": {
      "fp-log-phys": "الـ physical files اللي على الـ disk والـ logical names اللي البرامج بتستخدمها"
     }
    },
    {
     "h": "فتح الـ files",
     "pts": [
      "الـ Opening بيجهز الـ file للاستخدام: يا إما تفتح file موجود يا إما تعمل file جديد. بعد ما تفتح بتكون واقف في <b>أول</b> الـ file.",
      "رسمة (slide 23، اسمها Opening Files in C):<span class=\"ltr\"><code>FILE *outFile; outFile = fopen(\"A.txt\", \"w\");</code></span>وعليها labels:<br>• الـ <b>outFile</b> هو الـ logical name.<br>• والـ <b>fopen</b> هي الـ method اللي بتفتح الـ file.<br>• و\"A.txt\" هو الـ physical file.<br>• و\"w\" هو الـ mode.<br>وجنبها فقاعة فيها الـ modes:<span class=\"ltr\">r (reading), w (writing), a (append), r+ w+ a+, rb wb ab, rb+ wb+ ab+</span>",
      "في C++ بنكتب:<span class=\"ltr\"><code>fstream outfile; outfile.open(\"myfile.txt\", ios::out);</code></span>والـ argument التاني <b>integer</b> بيحدد الـ mode، وقيمته بتتعمل بـ bitwise OR (الـ operator <code>|</code>) بين constants متعرّفة في الـ class اللي اسمها <code>ios</code>.",
      "الـ modes في C:<br>• الـ <b>\"r\"</b> يفتح file موجود للقراية.<br>• الـ <b>\"w\"</b> يعمل file جديد أو يفضّي (truncate) الموجود للـ output.<br>• الـ <b>\"a\"</b> يعمل file جديد أو يزوّد (append) على الموجود للـ output.<br>• الـ <b>\"r+\"</b> file موجود للـ input والـ output.<br>• الـ <b>\"w+\"</b> يعمل/يفضّي للـ input والـ output.<br>• الـ <b>\"a+\"</b> يعمل/يعمل append للـ input والـ output.<br>• ولو زوّدت <b>b</b> (زي rb و wb و ab و r+b…) يبقى معناها <b>binary mode</b>.",
      "الـ flags في C++:<br>• الـ <code>ios::in</code> للـ input.<br>• الـ <code>ios::out</code> للـ output.<br>• الـ <code>ios::app</code> يعمل seek للآخر قبل كل write.<br>• الـ <code>ios::ate</code> يبدأ وهو واقف في الآخر.<br>• الـ <code>ios::trunc</code> دايمًا يعمل file جديد (truncate).<br>• الـ <code>ios::binary</code> للـ binary mode."
     ],
     "figH": {
      "fp-fopen-parts": "أجزاء الـ fopen call"
     }
    },
    {
     "h": "الـ C mode ↔ الـ C++ flags",
     "figH": {
      "fp-modes": "جرّب كل mode للفتح على file، ومعاه الـ C++ flags بتاعته"
     }
    },
    {
     "h": "قفل الـ files",
     "pts": [
      "الـ Closing بيحرر الـ logical name عشان يتربط بـ physical file تاني، \"زي ما بتقفل السكة بعد ما تخلص المكالمة\".",
      "الـ bytes مش بتتبعت واحدة واحدة. بتتجمع في <b>buffer</b> وتتبعت مرة واحدة كـ <b>block</b>.",
      "لو مقفلتش الـ file، الـ OS هيقفله في آخر البرنامج. بس لو البرنامج <b>وقع فجأة (terminated abnormally) ممكن الداتا تضيع</b>.",
      "قفل الـ file في الكود (slide 28):<br>• في C بنكتب <code>fclose(outfile);</code><br>• وفي C++ بنكتب <code>outfile.close();</code>."
     ],
     "figH": {
      "fp-buffer": "الـ buffer: الـ close بيعمل إيه، والـ crash بيضيّع إيه"
     }
    },
    {
     "h": "القراية والكتابة",
     "pts": [
      "العمليات العامة (slides 29 و 33):<br>• الـ <code>Read(Source_file, Destination_addr, Size)</code>: الـ Source_file هو الـ logical file name اللي البرنامج بيقرا منه، والـ Destination_addr هو أول عنوان في الـ memory block اللي عايزين نقرا الداتا فيه، والـ Size هو كمية المعلومات اللي جاية من الـ file (عدد الـ bytes).<br>• الـ <code>Write(Destination_file, Source_addr, Size)</code>: الـ Destination_file هو الـ logical file name اللي الداتا هتتكتب فيه، والـ Source_addr هو أول عنوان في الـ memory block اللي فيه الداتا اللي هتتكتب، والـ Size هو عدد الـ bytes اللي هتتكتب.",
      "• الـ <code>fgetc(fp)</code> بتقرا character واحد.<br>• والـ <code>fgets(str, n, fp)</code> بتقرا string (‡ أقصى حاجة n-1 characters).<br>• والـ <code>fscanf(fp, \"fmt\", vars)</code> بتقرا formatted text.<br>• والـ <code>fread(&amp;blk, size, count, fp)</code> بتقرا record/block.",
      "الـ arguments بتاعة fread/fwrite:<br>(1) عنوان الـ variable<br>(2) حجم العنصر بالـ bytes<br>(3) عدد العناصر<br>(4) الـ logical file name.",
      "القراية في C (slide 31، «أو في C++ باستخدام الـ C streams»):<span class=\"ltr\"><code>char c; char a[100]; FILE * infile; infile = fopen(\"myfile.txt\",\"r\"); fread(&amp;c,1,1,infile); /* reads one character */ fread(a,1,10,infile); /* reads 10 characters */</code></span>والـ slide كاتبة جنب c إنه «a character» وجنب a إنها «an array with 100 characters». والـ <b>char</b> بياخد 1 byte، عشان كده الـ element size بيساوي 1.",
      "الكتابة في C (slide 34):<span class=\"ltr\"><code>char c; char a[100]; FILE * outfile; outfile = fopen(\"mynew.txt\",\"w\"); /* omitted initialization of c and a */ fwrite(&amp;c,1,1,outfile); fwrite(a,1,10,outfile);</code></span>والـ slide بتكتب نفس الـ 4 arguments بتوع fread، وبتسمي أول واحد «destination address (address of variable c)». ‡ في الحقيقة أول argument في fwrite هو الـ <b>source</b> address، يعني الـ memory اللي الداتا بتتكتب منها.",
      "القراية في C++ (slide 32):<span class=\"ltr\"><code>char c; char a[100]; fstream infile; infile.open(\"myfile.txt\",ios::in); infile &gt;&gt; c; infile.read(&amp;c,1); infile.read(a,10);</code></span>الـ <code>infile &gt;&gt; c;</code> بتقرا character واحد، والـ <code>infile.read(&amp;c,1);</code> طريقة تانية لقراية character واحد، والـ <code>infile.read(a,10);</code> بتقرا 10 bytes.<br>والكتابة في C++ (slide 35):<span class=\"ltr\"><code>char c; char a[100]; fstream outfile; outfile.open(\"mynew.txt\",ios::out); /* omitted initialization of c and a */ outfile &lt;&lt; c; outfile.write(&amp;c,1); outfile.write(a,10);</code></span>",
      "في C++ (slides 32 و 35) الـ operator <code>&gt;&gt;</code> بيوصّل نفس المعلومة بس على مستوى أعلى: بما إن c متغير char، فمفهوم ضمنيًا إن 1 byte بس هيتنقل. والـ fstream في C++ فيها كمان الـ method اللي اسمها <b>read</b>، وهي المقابل لـ fread في C (والـ <b>write</b> المقابل لـ fwrite). والفتح للكتابة بيبقى <code>outfile.open(\"mynew.txt\",ios::out);</code>.",
      "اكتشاف آخر الـ file (EOF) (slide 36):<br>• في C بنشوف الـ <code>fread</code> رجّعت <b>0</b> ولا لأ:<span class=\"ltr\"><code>int i; i = fread(&amp;c,1,1,infile);</code> (attempted to read)<br><code>if (i==0)</code> (true if file has ended) …</span>• في C++ بنشوف الـ <code>infile.fail()</code> بترجع true ولا لأ:<span class=\"ltr\"><code>infile &gt;&gt; c;</code> (attempted to read)<br><code>if (infile.fail())</code> (true if file has ended) …</span>• أو بدل كده بنشوف الـ <code>infile.eof()</code> بترجع true ولا لأ."
     ],
     "figH": {
      "fp-rw-args": "الـ Read والـ Write العامين، والـ arguments بتوع الـ fread والـ fwrite",
      "fp-read-sim": "قراية file في C و C++ لحد ما الـ file يخلص"
     }
    },
    {
     "h": "الـ methods اللي بنقرا بيها من الـ files (في C)",
     "pts": [
      "الـ slide 30 بتدي 4 methods للقراية من الـ files، ولكل واحدة اسمها المختصر والاستخدام والـ syntax ومثال (الجدول اللي فوق)."
     ],
     "figH": {
      "fp-read-methods": "الـ 4 طرق للقراية من file في C"
     }
    },
    {
     "h": "الـ logical names بتاعة الـ Standard I/O",
     "pts": [
      "الـ streams دي مش محتاجة نفتحها ولا نقفلها في البرنامج (slide 37)."
     ]
    },
    {
     "h": "مثال: قراية employee records (بـ C)",
     "pts": [
      "المطلوب (slide 38): برنامج C يعرض محتوى file على الشاشة. والـ algorithm:<span class=\"ltr\">open the file for input → while there are characters/records, read one and write it to the screen → close the file</span>",
      "التعليقات اللي على الكود (slides 39 و 40):<br>• الـ <code>struct employee</code>: بنعمل الـ employee struct.<br>• الـ <code>fopen(...)</code>: بنفتح الـ file اللي اسمه emp.txt.<br>• الـ <code>if(my_file == NULL)</code>: بنختبر الـ file اتفتح ولا لأ.<br>• الـ <code>while(!feof(my_file))</code>: بنستخدم while loop نقرا بيها من الـ file لحد آخره.<br>• جوه الـ loop: بنقرا من الـ file بـ fread، ونطبع على الشاشة بـ printf، ونقفل الـ while loop بـ }.<br>• الـ <code>fclose(my_file);</code>: بنقفل الـ logical file.",
      "‡ نصيحة: الـ <code>while(!feof())</code> مش بتبقى true غير <i>بعد</i> ما قراية تفشل، فممكن آخر record يتطبع مرتين. والأأمن إنك تشيك على <code>fread(...) == 1</code>.<br>وكمان الكود اللي في الـ slides (39 و 40):<br>• بيطبع <code>%f</code> للـ salary وهي int (استخدم <code>%d</code> زي الكود اللي فوق)<br>• وفيه <code>\"</code> زيادة بعد emp.sal<br>• وبيكتب <code>==</code> على شكل <code>= =</code><br>• وبيستخدم <code>void main()</code>، وبيخلص بـ <code>getch();</code>."
     ],
     "figH": {
      "fp-sample-run": "تشغيل البرنامج المثال: ليه الـ while(!feof) بتطبع آخر record مرتين"
     }
    },
    {
     "h": "الـ Full methods (slides 41 لـ 54)",
     "pts": [
      "الـ <b>Method (1) writeC()</b> (slides 41 و 42): بتطلب من الـ user يدخل character واحد من الـ keyboard، وبعدين تكتبه في الـ physical file اللي اسمه alphabet.txt (بـ <code>getche()</code> وبعدين <code>fputc(ch,fp)</code>).",
      "الـ <b>Method (2) readC()</b> (slides 43 و 44): بتقرا character واحد من alphabet.txt وتطبعه على الشاشة (<code>ch = fgetc(fp); putchar(ch);</code>).",
      "الـ <b>Method (3) writeS()</b> (slides 45 و 46): بتطلب من الـ user يدخل strings من الـ keyboard لحد ما يدوس Enter على سطر فاضي، وكل string بتتكتب في std.txt (بـ <code>gets(string)</code>، وبتقف لما <code>strlen(string)==0</code>، وإلا <code>fputs(string,my_file)</code>).",
      "الـ <b>Method (4) readS()</b> (slides 47 و 48، واسمها في الـ slide <code>read()</code>): بتقرا strings من std.txt وتطبعها (بـ <code>fgets(string,80,my_file)</code>، وبتقف لما الـ <code>feof</code> يبقى مش صفر، وإلا <code>puts(string)</code>).",
      "الـ <b>Method (5) writeASCII()</b> (slides 49 و 50): بتكتب جزء من جدول الـ ASCII (من character رقم 32 لحد 127) في ascii.txt باستخدام <code>fprintf</code>: سطر عناوين «Letter Decimal Hexadecimal»، وبعدين كل character بـ %c و %d و %x.",
      "الـ <b>Method (6) readASCII()</b> (slides 51 لـ 53، واسمها في الـ slide <code>read()</code>): بتقرا ascii.txt تاني: سطر العناوين بـ <code>fgets</code> و <code>puts</code>، وبعدين كل سطر بـ <code>fscanf(my_file,\"%c %d %x\",...)</code> لحد ما ترجع <code>EOF</code>، وبتطبع كل سطر بـ printf.",
      "الـ <b>Activity (1) / Quiz (1)</b> (slide 54): أعد كتابة كل أمثلة برامج C اللي فاتت، من slide 38 لحد slide 53، كبرامج C++."
     ],
     "figH": {
      "fp-ascii": "جدول الـ ASCII اللي الـ writeASCII بتكتبه والـ readASCII بتقراه"
     }
    }
   ],
   "cards": [
    "مجموعة داتا متحطوطة على secondary storage (يعني non-volatile).",
    "الـ DS: داتا في الـ main memory. الـ FS: داتا في الـ secondary storage.",
    "الـ Logical: الـ programmer شايف الـ file إزاي. الـ Physical: الـ file متخزن إزاي على الـ disk.",
    "الـ Heap والـ indexing والـ hashing.",
    "تنظيم الـ tracks بالـ sectors أو بالـ blocks.",
    "الـ access time سريع، والـ space utilization كويس، يعني استغلال كويس للمساحة.",
    "الـ OS والـ DBMS.",
    "مجموعة bytes على الـ disk ليها physical name (A.txt)؛ بتستخدم مرة واحدة بس، وقت الـ open.",
    "variable في البرنامج (زي fp أو infile) بيمثل channel للـ physical file؛ بيستخدم مرات كتير.",
    "يعمل file جديد أو يفضّي (truncate) الموجود، للـ input والـ output.",
    "يعمل file جديد أو يعمل append على الموجود، للـ output.",
    "الـ app: يعمل seek للآخر قبل <b>كل</b> write. الـ ate: بيبدأ وهو واقف في الآخر بس.",
    "في C: الـ fread بترجع 0. في C++: الـ infile.fail() أو infile.eof() بترجع true.",
    "بيحرر الـ logical name، وبيعمل flush للـ buffer؛ ولو البرنامج وقع فجأة ممكن الداتا تضيع."
   ],
   "qa": [
    "الـ Physical file هو مجموعة bytes على الـ disk ليها physical name (A.txt)، وبتستخدم مرة واحدة وقت الـ opening.<br>والـ Logical file هو channel بيوصل البرنامج بالـ physical file، والـ logical name بتاعه variable في البرنامج (زي infile أو fp)، وبيستخدم مرات كتير في الـ open والـ read والـ write والـ append والـ close.",
    "لإنها الطريقة الوحيدة المناسبة لتخزين كمية معلومات كبيرة زي الصور والمزيكا والفيديو؛ والـ operating systems أكبر من إنها تتحمل كلها في الـ memory؛ والـ databases في كل حتة؛ وكمان عشان الـ backup والـ archiving.",
    "تجهيز/عمل format للـ storage media، وحجز مساحة التخزين والـ addressing، وإدارة الـ free space.",
    "الـ OS هيقفله في آخر التنفيذ، بس لو البرنامج وقع فجأة (terminated abnormally) الداتا اللي في الـ buffer ممكن تضيع.",
    "الحل: <code>void writeC(){ FILE *fp; fp = fopen(\"c:\\\\alphabet.txt\",\"w\"); if(fp==NULL){ printf(\"Error in opening file\"); exit(1); } char ch; ch = getche(); fputc(ch,fp); fclose(fp); }</code><br>‡ الـ slide كاتبة Printf و Exit بحروف capital، والـ C بتفرق بين الـ capital والـ small، فلازم يبقوا printf و exit.",
    "الحل: <code>void read(){ FILE *my_file; int result; my_file=fopen(\"c:\\\\std.txt\",\"r\"); if(my_file==NULL){ printf(\"Error in opening file\"); exit(1); } char string[80]; while(1){ fgets(string,80,my_file); result = feof(my_file); if(result !=0) break; puts(string); } fclose(my_file); }</code><br>والـ slide بتسمي الـ method <code>read()</code> بدل <code>readS()</code>.",
    "الحل: <code>void readC(){ FILE *fp; fp = fopen(\"c:\\\\alphabet.txt\",\"r\"); if(fp==NULL){ printf(\"Error in opening file\"); exit(1); } char ch; ch = fgetc(fp); putchar(ch); fclose(fp); }</code>",
    "الحل: <code>void writeS(){ FILE *my_file; my_file=fopen(\"c:\\\\std.txt\",\"w\"); if(my_file==NULL){ printf(\"Error in opening file\"); exit(1); } char string[80]; while(1){ gets(string); if(strlen(string)==0) break; fputs(string,my_file); } fclose(my_file); }</code><br>‡ الـ gets() اتشالت من C11 عشان مبتقدرش تحدد طول الـ input، والاختيار الآمن هو <code>fgets(string,80,stdin)</code>.",
    "الحل: <code>void writeASCII(){ FILE *my_file; char ch; my_file=fopen(\"ascii.txt\",\"w\"); if(my_file==NULL){ printf(\"Error in opening file\"); exit(1); } fprintf(my_file,\"Letter\\t Decimal \\t Hexadecimal \\n\"); for(ch = 32; ch&lt;=127; ch++) fprintf(my_file, \"%c \\t%d \\t %x \\n\", ch, ch, ch); fclose(my_file); }</code><br>‡ الـ slide ناقصها علامة \" في أول الـ format string التانية. وكمان لو الـ char كان signed، الشرط <code>ch&lt;=127</code> هيفضل true على طول والـ loop مش هتخلص، فاستخدم counter نوعه int.",
    "الحل: <code>void readASCII(){ FILE *my_file; char string[80]; int ch, num, hex; int result; my_file=fopen(\"ascii.txt\",\"r\"); if(my_file==NULL){ printf(\"Error in opening file\"); exit(1); } fgets(string,80,my_file); puts(string); while(1){ result = fscanf(my_file,\"%c %d %x\",ch,num,hex); if(result==EOF) break; printf(\"%c \\t%d \\t %x \\n\", ch, num, hex); } fclose(my_file); }</code><br>‡ الـ slide بتسميها <code>read()</code> وبتبعت ch و num و hex لـ fscanf، بس الـ fscanf محتاجة العناوين بتاعتهم (<code>&amp;ch, &amp;num, &amp;hex</code>)، والـ %c محتاجة متغير نوعه char."
   ],
   "quiz": [
    [
     "دي نص الإجابة بس: الـ OS فعلاً من اللي بيديروا الـ files، بس الـ DBMS كمان بيدير files، فالإجابة الكاملة \"Both a and b\" (L1, File managers).",
     "دي نص الإجابة بس: الـ DBMS فعلاً بيدير files، بس الـ OS كمان بيديرها، فالإجابة الكاملة \"Both a and b\" (L1, File managers).",
     "الـ MIS ده information system، مش file manager.",
     "صح. الـ files بيديرها الـ OS والـ DBMS."
    ],
    [
     "صح. المحاضرة بتقول إن الـ file organization methods لازم توفر fast access time و good space utilization، يعني disk accesses قليلة ومساحة مهدرة قليلة (L1, File organization).",
     "تجهيز/formatting الـ storage media ده متحط تحت الـ file MANAGEMENT، مش من اللي الـ organization method لازم توفره (fast access و good space use) (L1, File management).",
     "الـ allocating للـ storage space والـ addressing دي مهمة من مهام الـ file MANAGEMENT؛ الـ organization methods لازم توفر fast access time و good space utilization (L1).",
     "إدارة الـ free space دي تالت مهمة من مهام الـ file MANAGEMENT؛ الـ organization methods بنحكم عليها بالـ fast access time والـ good space utilization (L1)."
    ],
    [
     "مجموعة bytes متخزنة على disk ده تعريف الـ PHYSICAL file؛ الـ logical file هو القناة اللي البرنامج بيوصل بيها للـ physical file (L1, Physical vs logical file).",
     "صح. وبيتسمى بـ variable في البرنامج زي fp أو infile.",
     "اسم على الـ disk زي A.txt ده الـ physical name بتاع الـ physical file؛ الـ logical name هو variable في البرنامج زي fp أو infile (L1).",
     "المادة عمرها ما عرّفت الـ logical file إنه backup؛ هو القناة (variable في البرنامج) اللي بتربط البرنامج بالـ physical file (L1)."
    ],
    [
     "صح. الـ fopen بتاخد اسم الـ file والـ mode وبترجع FILE*.",
     "الـ fopen محتاجة two arguments: اسم الـ file والـ mode string (\"r\"، \"w\"، \"a\"…)؛ من غير الـ mode الـ file مش هيتفتح (L1, Opening files).",
     "الـ function بتاعة مكتبة C اسمها fopen مش open؛ والمادة بتكتبها كده:<span class=\"ltr\"><code>outFile = fopen(\"A.txt\", \"w\")</code></span>وبترجع FILE* (L1, Opening files).",
     "غلط في كل حتة: الـ function اسمها fopen، وبترجع pointer يعني FILE*، وبتاخد اسم الـ file والـ mode الاتنين (L1, Opening files)."
    ],
    [
     "ده الـ mode \"w\": بيعمل create/truncate للـ OUTPUT بس. الـ + بتضيف الـ input، فالـ \"w+\" بيسمح بالقراية والكتابة مع بعض (L1, C modes).",
     "صح. الـ w+ = يعمل file جديد أو يفضّي الموجود، للـ input والـ output.",
     "إنك تحتفظ بالمحتوى القديم وانت بتكتب ده \"a\" (append). الـ \"w+\" بيعمل truncate للـ file الموجود، فبيمسح محتواه (L1, C modes).",
     "الـ update مع الاحتفاظ بالمحتوى ده \"a+\" (create/append للـ input والـ output). الـ \"w+\" بيعمل truncate، فالمحتوى القديم بيضيع (L1, C modes)."
    ],
    [
     "الـ text mode هو الـ default لما مفيش b؛ لما تضيف b (زي rb و wb و ab و r+b) بتقلب على الـ binary mode (L1, C modes).",
     "مفيش حاجة اسمها \"big text\" mode؛ المعنى الوحيد لحرف b في الـ mode string هو binary (L1, C modes).",
     "صح. لما تضيف b بعد حرف الـ mode (زي rb و wb و ab و r+b) الـ file بيتفتح binary mode؛ والمقابل في C++ هو | ios::binary (L1, C modes).",
     "\"Blueprint\" مش file mode أصلاً؛ الـ b في mode string زي \"rb\" معناها binary mode (L1, C modes)."
    ],
    [
     "الـ ofstream ده file stream للـ OUTPUT بس (الـ default بتاعه ios::out)، فمينفعش يتستخدم للـ input والـ output مع بعض (L1, C++ file streams).",
     "الـ ifstream ده file stream للـ INPUT بس (الـ default بتاعه ios::in)، فمبيكتبش؛ اللي بيعمل الاتنين هو fstream (L1, C++ file streams).",
     "الـ iostream ده الـ header/class بتاع الـ console I/O (زي cin و cout)؛ الـ file streams اللي بتعمل input و output جاية من fstream (L1, C++ file streams).",
     "صح. الـ fstream ينفع يتفتح للـ input والـ output مع بعض، مثلاً open(\"f.txt\", ios::in | ios::out)؛ الـ ifstream للـ input بس والـ ofstream للـ output بس (L1, Opening files)."
    ],
    [
     "صح. الـ ifstream هو الـ input file stream، فلما متديهوش mode بيفتح بـ ios::in (قراية) (L1, C++ file streams).",
     "الـ ios::out ده الـ default بتاع ofstream (الـ output stream)؛ الـ ifstream معمول للـ input، فالـ default بتاعه ios::in (L1).",
     "الـ ios::app (يروح لآخر الـ file قبل كل write) ده output flag لازم تطلبه صراحة؛ مش default لأي stream، والـ ifstream الـ default بتاعه ios::in (L1).",
     "الـ ios::trunc (دايماً يعمل file جديد فاضي) ده output flag؛ ملوش معنى في القراية، والـ default بتاع ifstream هو ios::in (L1)."
    ],
    [
     "صح. الـ origins هي ios::beg وios::cur وios::end. مفيش حاجة اسمها ios::set.",
     "الـ ios::end ده seek origin صحيح: الـ offset بيتحسب من آخر الـ file. اللي مش موجود هو ios::set (L1, Summary MCQ).",
     "الـ ios::cur ده seek origin صحيح: الـ offset بيتحسب من الـ position الحالي. اللي مش صحيح هو ios::set (L1, Summary MCQ).",
     "الـ ios::beg ده seek origin صحيح: الـ offset بيتحسب من أول الـ file. الـ ios::set ده مش موجود أصلاً (L1, Summary MCQ)."
    ],
    [
     "إن fread ترجع 0 دي طريقة اكتشاف الـ end of file في C مش C++؛ في C++ الـ infile.fail() أو infile.eof() بترجع true (L1, Reading and writing).",
     "صح. المحاضرة بتقول إن في C++ الـ end of file بيتعرف لما infile.fail() ترجع true، أو infile.eof() ترجع true؛ وفي C الـ fread بترجع 0 (L1, Reading and writing).",
     "الـ close() بتحرر الـ logical name وبتعمل flush للـ buffer بس؛ مبتقولكش إنك وصلت للـ end of file. استخدم infile.fail() أو infile.eof() (L1).",
     "الـ cout بيكتب على الشاشة بس؛ مبيكتشفش أي حاجة. الـ EOF في C++ بيتعرف بـ infile.fail() أو infile.eof() (L1)."
    ],
    [
     "الـ fget() مش function في مكتبة C؛ والـ function اللي بتقرا string هي <code>fgets(str, n, fp)</code>، والـ fgetc بتقرا character واحد (L1, Reading).",
     "صح. الـ <code>fgets(str, n, fp)</code> بتقرا لحد n-1 characters وبتحط '\\0' في الآخر.",
     "الـ fput() مش standard function، وأي حاجة اسمها put بتكتب مش بتقرا؛ اللي بتقرا هي fgets() (L1).",
     "الـ fputs() بتكتب string في الـ file؛ السؤال عن قراية n−1 characters بالكتير، ودي fgets() (L1)."
    ],
    [
     "الـ stdout ده الـ logical name في C للـ standard output (الشاشة)، مش الـ standard error (L1, Standard I/O names).",
     "الـ stdin ده الـ logical name في C للـ standard input (الـ keyboard)، مش الـ standard error (L1, Standard I/O names).",
     "صح. في جدول الـ standard I/O، الـ standard error (الـ console/الشاشة) اسمه stderr في C و cerr في C++ (L1, Standard I/O names).",
     "الـ cerr فعلاً standard error، بس ده الـ logical name في C++؛ السؤال عن C، واسمه stderr (L1, Standard I/O names)."
    ]
   ],
   "extra": [
    [
     "صح. الـ \"a\" بيفتح file موجود (أو يعمل واحد جديد) للـ output ويعمل append في الآخر.",
     "ده اللي \"w\" بيعمله: بيفضّي (truncate) الـ file الموجود قبل الكتابة.",
     "ده يبقى \"r+\" مع الكتابة من الأول. الـ \"a\" عمره ما بيكتب فوق الداتا الموجودة.",
     "الـ \"a\" ده output mode (create أو append)، فالـ 20 bytes هيتكتبوا في آخر الـ file. القراية بس ده الـ mode \"r\" (L1, C modes)."
    ],
    [
     "الـ ios::in لوحده input بس، يعني المقابل لـ \"r\". الـ \"r+\" محتاج input و output، يعني:<span class=\"ltr\"><code>ios::out | ios::in</code></span>(L1, C mode ↔ C++ flags).",
     "صح. الـ \"r+\" بيفتح file موجود للـ input والـ output.",
     "لو زوّدت trunc يبقى \"w+\"، وده بيمسح المحتوى الموجود.",
     "الـ ios::out | ios::app ده شكل C++ لـ \"a\" (output بس مع append)، من غير input؛ الـ \"r+\" هو ios::out | ios::in (L1, C mode ↔ C++ flags)."
    ],
    [
     "الـ w+ بيعمل file جديد أو يفضّي الموجود، فكل الـ records الموجودة هتضيع.",
     "الـ \"a\" ده output بس، وكل write بتروح للآخر، فمش هتقدر تقرا ولا تكتب فوق records.",
     "صح. الـ r+ بيفتح file موجود للـ input والـ output، والـ b بتخليه binary. والمثال اللي في السلايدز بيستخدم الـ mode ده.",
     "الـ \"r\" ده input بس، فمش هتقدر تكتب فوق الـ records."
    ],
    [
     "حجم العنصر هو الـ argument التاني، sizeof(blk).",
     "الـ fread مفيهاش offset argument. تحديد المكان بيتعمل بالـ fseek.",
     "الـ logical file name هو الـ argument الرابع، fp.",
     "صح. الـ arguments هي: عنوان الـ variable، حجم العنصر، عدد العناصر، الـ logical file name."
    ],
    [
     "ده وصف ios::app. الـ ios::ate بيحطك في الآخر مرة واحدة بس، وقت ما الـ file يتفتح.",
     "صح. الـ ios::ate = بيبدأ وهو واقف في الآخر؛ الـ ios::app = يعمل seek للآخر قبل كل write."
    ],
    [
     "صح. الـ logical file هو الـ variable اللي في البرنامج (الـ channel)؛ والـ physical file هو الاسم اللي على الـ disk.",
     "معكوسة. الـ physical name هو الاسم المتخزن على الـ disk.",
     "الـ outfile ده variable في البرنامج، يبقى logical name.",
     "الـ ios::out ده الـ opening mode (output)، مش اسم؛ الـ logical name هو outfile والـ physical name هو \"myfile.txt\" (L1, Opening files)."
    ],
    [
     "الـ Heap طريقة LOGICAL organization (هي والـ indexing والـ hashing)؛ الطرق الـ physical بتنظم الـ tracks بالـ sectors أو بالـ blocks (L1).",
     "صح. الطرق الـ physical بتنظم الـ tracks بالـ sectors أو بالـ blocks.",
     "الـ Indexing طريقة LOGICAL organization؛ الـ physical organization بتتكلم عن الـ tracks المتنظمة بالـ sectors أو بالـ blocks (L1).",
     "الـ Hashing طريقة LOGICAL organization (هي والـ heap والـ indexing)؛ الطرق الـ physical بتنظم الـ tracks بالـ sectors أو بالـ blocks (L1)."
    ],
    [
     "أول fread بتقرا record 1 عادي؛ مفيش حاجة بتتنط.",
     "الـ feof فعلًا بتبقى true أول ما قراية توصل للآخر، فالـ loop بتخلص.",
     "صح. الـ feof مش بتبقى true غير <b>بعد</b> ما قراية تفشل، فبيحصل iteration زيادة بيطبع المحتوى القديم بتاع emp تاني. الأأمن إنك تشيك على fread(...) == 1.",
     "في آخر الـ file الـ fread بترجع 0 (عدد الـ elements اللي اتقرت)، مش 1. الـ 0 ده هو الـ EOF check اللي تعتمد عليه في C (L1, Reading and writing)."
    ],
    [
     "السلايدز بتقول إن الـ bytes مش بتتبعت واحدة واحدة.",
     "صح. الـ bytes بتتجمع في buffer وتتبعت كـ block، وعشان كده لو البرنامج وقع فجأة قبل الـ close ممكن الداتا تضيع."
    ],
    [
     "الـ cout ده الـ standard output في C++، ومتوصل بالـ console/الشاشة، مش الـ keyboard (L1, Standard I/O names).",
     "الـ cerr ده الـ standard error في C++، وبرضه متوصل بالـ console/الشاشة؛ الـ keyboard هو الـ standard input يعني cin (L1, Standard I/O names).",
     "الـ stdin ده الاسم بتاع C للـ standard input، مش بتاع C++.",
     "صح. الـ standard input (الكيبورد) اسمه stdin في C وcin في C++."
    ]
   ]
  },
  "2": {
   "notes": [
    {
     "h": "أجهزة الـ Secondary storage",
     "pts": [
      "الـ secondary storage مختلف عن الـ main memory، فلازم نفهم <b>هو بيشتغل إزاي عشان نعمل file design كويس</b>. وفيه نوعين أساسيين من الـ secondary storage:<br>(1) الـ Direct Access Storage Devices (<b>DASD</b>)<br>(2) الـ Serial Access Storage Devices (<b>SASD</b>)",
      "الـ <b>DASD</b> (Direct Access Storage Devices):<br>• الـ <b>magnetic disks</b> زي الـ hard disk والـ floppy disk.<br>• الـ <b>optical disks</b>، وهما:<span class=\"ltr\">CD-ROM (Compact Disk – Read Only Memory), CD-R (Compact Disk – Recordable), CD-RW (Compact Disk – ReWritable), DVD (Digital Video Disk)</span>",
      "الـ <b>SASD</b> (Serial Access Storage Devices): الـ <b>magnetic tape</b>."
     ],
     "figH": {
      "fp-storage-types": "الـ DASD ولا الـ SASD؟ صنّف أجهزة الـ secondary storage"
     }
    },
    {
     "h": "مكونات الـ Disk",
     "pts": [
      "ممكن نقول <b>disks</b> أو <b>HDD</b> ونقصد بيها الـ hard disks. والـ components المهمة في الـ disk هي:<br>(1) الـ platters<br>(2) الـ read/write heads<br>(3) الـ arm assembly<br>(4) الـ spindle<br>(5) الـ arms",
      "رسمة (slide 5، الـ hard disk من جوه ومن بره): drive من غير الغطا، وعليه labels للأجزاء دي:<span class=\"ltr\">base casting, spindle, slider (and head), actuator arm, actuator axis, actuator, platters, cover mounting holes (cover not shown), case mounting holes, ribbon cable (attaches heads to logic board), SCSI interface connector, jumper pins, jumper, power connector, tape seal</span>",
      "رسمة (slides 6 و 16 و 19، وفيها drive مفتوح): فيه أسهم بتشاور على الـ <b>platters</b> والـ <b>spindle</b> والـ <b>read/write heads</b> والـ <b>arm</b> والـ <b>arm assembly</b>.",
      "<b>(1) الـ Platter</b>: هو الـ <b>disk الدايرية</b> اللي الداتا الـ magnetic بتتخزن عليها جوه الـ hard disk drive. وممكن يخزن معلومات على <b>الوشين (surfaces)</b> لـ platter واحد أو أكتر؛ وكل الـ surfaces فيها <b>نفس الـ components في نفس المكان</b>، والـ platters متصممة عشان تسهّل <b>تخزين الداتا واسترجاعها</b>.<br>• كل platter متقسم لدواير جوه بعض اسمها <b>tracks</b>: فيه آلاف الـ tracks في كل platter، وشكلها زي الحلقات، والمعلومات بتتخزن في tracks ورا بعض على سطح الـ disk.<br>• وكل track متقسم لعدد من الـ <b>sectors</b>."
     ]
    },
    {
     "h": "تقسيم الـ platter: الـ tracks والـ sectors والـ clusters والـ cylinders",
     "pts": [
      "رسمة (slides 8 و 15 و 18، وفيها disk drive فيه 4 platters و 8 surfaces): منظر من الجنب للـ platters على الـ <b>spindle</b>؛ وفيه <b>read/write head</b> على كل surface من الـ 8، وكل الـ heads متشالة على الـ <b>boom</b> اللي بيتحرك لجوه ولبره (سهمين). وفي slide 8 بس فيه كمان منظر من فوق: حلقة مكتوب عليها <b>Track</b>، ومعاها <b>Track 0</b> و <b>Track 1</b>.",
      "رسمة (slide 9): platters فوق بعض؛ وعلى الـ platter اللي فوق فيه حلقة مكتوب عليها <b>Track</b>، وحتة صغيرة من الحلقة دي مكتوب عليها <b>Sector</b>.",
      "مثال (slide 10): platter فيه 1000 track، وكل track فيه 33 sector. الـ track capacity بتساوي عدد الـ sectors في الـ track مضروب في الـ bytes في الـ sector:<span class=\"ltr\">33 × 512 = <b>16,896 bytes</b></span>",
      "الـ <b>sector</b> هو <b>أصغر جزء ليه address</b> في الـ disk، وغالبًا حجمه <b>512 bytes</b>.",
      "فيه طريقة تانية نشوف بيها تنظيم الـ sectors، وهي اللي الـ <b>OS file manager</b> ماشي بيها: بيشوف الـ file كأنه سلسلة من <b>clusters</b> من الـ sectors. والـ <b>cluster</b> هو عدد ثابت من الـ <b>sectors اللي ورا بعض</b> (contiguous).",
      "مثال (slide 11): حجم الـ sector بـ 512 bytes والـ cluster فيه 3 sectors، يبقى حجم الـ cluster هو 3 × 512 = <b>1536 bytes</b>. والـ slide فيها رسمتين:<br>• رسمة لـ disk على سطحه اللي فوق حتة غامقة صغيرة من حلقة مكتوب عليها \"Sector\"، وحتة غامقة أطول مكتوب عليها \"Cluster of 3 Sectors\".<br>• ورسمة لـ 4 platters فوق بعض، وعلى الـ platter اللي فوق حتة صفرا صغيرة مكتوب عليها \"Cluster\".",
      "رسمة (slide 12): سطح disk فيه tracks دواير جوه بعض.<br>• حرف <b>A</b> هو الـ track (حلقة واحدة).<br>• حرف <b>B</b> هو الـ geometrical sector (شريحة زي حتة الكيكة معدية على كل الـ tracks).<br>• حرف <b>C</b> هو الـ track sector (جزء الشريحة اللي على track واحد).<br>• حرف <b>D</b> هو الـ cluster (sectors جنب بعض على نفس الـ track).",
      "الـ <b>cylinder</b> هو مجموعة الـ tracks اللي فوق/تحت بعض بالظبط. كل الداتا اللي على cylinder واحد تتقري <b>من غير ما الـ arm يتحرك</b>. عدد الـ cylinders = عدد الـ tracks في كل surface.",
      "رسمة (slide 13، الـ cylinder): 4 platters فوق بعض، ونفس الحلقة الصفرا متعلّمة على كل platter، ومكتوب عليها <b>Cylinder</b>.",
      "يعني الـ platter ليه 4 مكونات: الـ <b>sector</b> والـ <b>cluster</b> والـ <b>track</b> والـ <b>cylinder</b> (رسمة slide 14: 4 مجموعات platters، وكل مجموعة متعلّم فيها واحد منهم)."
     ],
     "figH": {
      "fp-platter-parts": "الـ track والـ geometrical sector والـ track sector والـ cluster والـ cylinder على الـ platter"
     }
    },
    {
     "h": "الـ read/write heads والـ arm assembly والـ spindle والـ arms",
     "pts": [
      "<b>(2) الـ Read/write heads</b>: هي الجزء الصغير في الـ disk اللي بيتحرك فوق الـ platter. الـ heads بتطير فوق سطح الـ platter بمسافة ممكن توصل لـ <b>3 nanometers</b> بس. والـ read/write head <b>بيروح للـ track اللي فيه الداتا</b> اللي هتتنقل. وكل surface ليه الـ read/write head بتاعه.",
      "<b>(3) الـ Arm assembly</b>: مجموعة components جوه الـ hard disk فيها الـ arms، والـ arms دي شايلة الـ read/write heads. ودوره إنه <b>يقرا ويكتب المعلومات</b> من مجموعة platters متغطية بطبقة magnetic رفيعة. ولو الـ arm assembly وقف عن الشغل، الـ drive كله بيبوظ.<br>ولما نقرا byte معين، الـ OS بيلاقي الـ platter والـ track والـ sector الصح، ويقرا <b>الـ sector كله في buffer</b> (مكان مخصوص في الـ memory)، وبعدين يلاقي الـ byte المطلوب جوه الـ buffer ده.",
      "<b>(4) الـ Spindle</b> بيمسك الـ platters في <b>مكان ثابت</b>، ومع <b>مسافة كفاية للـ read/write arms</b> عشان توصل للداتا اللي على الـ disks، و<b>بيلفّها</b>، فيجيب الـ sector تحت الـ head.",
      "<b>(5) الـ Arms</b> بتشيل الـ heads وتوجهها وتحركها. تحريك الـ arm اسمه <b>seeking</b>، وده غالبًا <b>أبطأ</b> جزء.",
      "رسمة (slide 20): 3 <b>platters</b> على <b>spindle</b> واحد، وفيه سهم للـ <b>rotation</b>. وكل platter عليه حلقة متقسمة لحتت صغيرة: الحلقة اللي على الـ platter اللي فوق اسمها <b>track t</b>، وحتة واحدة من الحلقة (على الـ platter اللي في النص) اسمها <b>sector s</b>؛ ونفس الـ track على كل الـ platters، متوصلة بخطوط متقطعة، هي الـ <b>cylinder c</b>. وكل platter عليه <b>read-write head</b> (مربع غامق) في آخر <b>arm</b>، وكل الـ arms متثبتة في الـ <b>arm assembly</b>."
     ],
     "figH": {
      "fp-disk-parts": "مكونات الـ hard disk واحد ورا التاني (slide 20)"
     }
    },
    {
     "h": "قوانين الـ Capacity",
     "figH": {
      "fp-capacity": "حاسبة الـ capacity: الـ sector والـ cluster والـ track والـ cylinder والـ drive"
     }
    },
    {
     "h": "مسألة محلولة (سلايدز 22–26)",
     "pts": [
      "المعطيات:<br>• فيه 90,000 record طولهم ثابت 256 B.<br>• الـ sector فيه 512 B.<br>• الـ track فيه 60 sectors.<br>• الـ cylinder height هو 14 tracks.<br>• كل surface فيه 5000 tracks.<br>• الـ cluster فيه 4 sectors.",
      "• عدد الـ platters هو<span class=\"ltr\">14/2 = <b>7</b></span>• وعدد الـ sides هو <b>14</b>.<br>• وحجم الـ track هو<span class=\"ltr\">60×512 = <b>30,720 B</b></span>• وعدد الـ cylinders هو <b>5000</b>.",
      "• حجم الـ cylinder هو<span class=\"ltr\">14 × 30,720 = <b>430,080 B</b></span>• وعدد الـ sectors في الـ cylinder هو<span class=\"ltr\">430,080/512 = <b>840</b></span>",
      "• حجم الـ file هو<span class=\"ltr\">90,000 × 256 = <b>23,040,000 B</b></span>• وعدد الـ records في الـ sector هو<span class=\"ltr\">512/256 = <b>2</b></span>• وعدد الـ records في الـ track هو<span class=\"ltr\">30,720/256 = <b>120</b></span>• وعدد الـ records في الـ cylinder هو<span class=\"ltr\">430,080/256 = <b>1680</b></span>",
      "• الـ sectors اللي الـ file محتاجها هي<span class=\"ltr\">23,040,000/512 = <b>45,000</b></span>• والـ tracks هي<span class=\"ltr\">23,040,000/30,720 = <b>750</b></span>• والـ cylinders هي<span class=\"ltr\">23,040,000/430,080 = <b>53.57</b></span>وده معناه 54 cylinder كاملين (‡).",
      "الـ capacity بتاعة الـ drive هي<span class=\"ltr\">5000 × 430,080 = <b>2,150,400,000 B</b></span>"
     ],
     "figH": {
      "fp-worked-problem": "المسألة المحلولة خطوة خطوة: الـ file محتاج قد إيه من الـ disk"
     }
    },
    {
     "h": "تنظيم الـ tracks بالـ sectors مقابل بالـ blocks",
     "pts": [
      "<b>بالـ sectors</b>: بيستخدمها الـ <b>OS</b>.<br>وفيها <b>access بطيء</b> أو <b>fragmentation</b> لما نتعامل مع file فيه records.<br>والـ fragmentation هو مساحة بتضيع جوه الـ sector، عشان الـ records مش جاية مظبوطة عليه (مثلًا الـ sector حجمه 512 B والـ record حجمه 300 B).<br>وبعض الـ OSs بتسمح للـ <b>system administrator إنه يستخدم clusters</b>.",
      "<b>بالـ blocks</b>: بيستخدمها الـ <b>DBMS</b>. الـ tracks ممكن تتقسم لـ <b>blocks (pages) الـ user هو اللي بيحددها</b> بدل الـ sectors. والـ block غالبًا بيتنظم بحيث يبقى فيه <b>عدد صحيح من الـ logical records</b>.",
      "الـ <b>Blocking factor</b> = عدد الـ records اللي متخزنة في كل block. مفيش internal fragmentation ومفيش record بيتقسم على 2 blocks.",
      "في الـ block addressing، كل block فيه داتا بيبقى معاه <b>sub-block</b> واحد أو أكتر فيهم معلومات زيادة عن الـ block. والـ block عادةً فيه:<br>• الـ <b>count sub-block</b>: عدد الـ bytes في الـ block.<br>• الـ <b>key sub-block</b> (اختياري): فيه الـ key بتاع آخر record في الـ data sub-block، عشان الـ disk controller يقدر يدوّر على key من غير ما يحمّل الـ block في الـ main memory.<br>• الـ <b>data sub-block</b>: فيه الـ data records.",
      "رسمة (slide 29، الـ sub-blocks): block واحد مترسوم كقوس من track، ومتكون من <b>key sub-block</b> و <b>count sub-block</b> والـ <b>data sub-block</b>، وبعده <b>gap</b> قبل الـ block اللي بعده.",
      "رسمة (slide 30، الـ pages والـ blocks): سطح disk والـ tracks اللي عليه متقطعة لـ sectors وبينها gaps. وتحتها track واحد مترسوم كصف:<span class=\"ltr\">sector 1, gap, sector 2, gap, sector 3, gap, sector 4, gap, …</span>وفيه قوس بيوضح إن <b>الـ page/block الواحد = 4 sectors</b>."
     ],
     "figH": {
      "fp-sectors-blocks": "الـ sectors والـ blocks والـ sub-blocks: الـ track بيتنظم إزاي"
     }
    },
    {
     "h": "الـ Non-data overhead",
     "pts": [
      "مساحة مستخدمة لحاجات غير الداتا.",
      "في التنظيم بالـ sectors: الـ sector address والـ track address والـ condition (هل هو بايظ؟) في أول كل sector، وكمان الـ gaps اللي بين الـ sectors.",
      "في التنظيم بالـ blocks: الـ sub-blocks والـ inter-block gaps، فبيبقى فيه non-data overhead <b>أكتر</b> من الـ sector addressing.",
      "<b>تمرين</b> (slides 32–34): disk بيتعمل له <b>block addressing</b>، حجم الـ track فيه 20,000 B، والـ non-data overhead لكل block بـ 300 B، والـ record حجمه 100 B. كام record ممكن يتخزن في الـ track لو الـ blocking factor بـ (a) 10 أو (b) 60؟<br>لو الـ BF بـ 10:<span class=\"ltr\">data sub-block = 1000; block = 1000 + 300 = 1300; ⌊20,000/1300⌋ = ⌊15.38⌋ = 15 blocks</span>يعني <b>150 records/track</b>.<br>ولو الـ BF بـ 60:<span class=\"ltr\">data sub-block = 6000; block = 6000 + 300 = 6300; ⌊20,000/6300⌋ = ⌊3.17⌋ = 3 blocks</span>يعني <b>180 records/track</b>."
     ],
     "figH": {
      "fp-records-track": "عدد الـ records في الـ track مع الـ blocking factor والـ non-data overhead"
     }
    },
    {
     "h": "تكلفة الـ disk access",
     "pts": [
      "الوقت اللي بناخده عشان نوصل لـ sector في track على surface بيتقسم لـ <b>3 أجزاء</b>: الـ <b>seek time</b> والـ <b>rotational delay</b> والـ <b>transfer time</b>.",
      "رسمة (slide 35): disk والـ arm ماددة فوقه. والـ labels بتوضح الـ <b>seek time</b> (الـ arm وهي رايحة للـ track)، والـ <b>rotational latency</b> (الـ disk وهو بيلف لحد ما الـ sector ييجي عند الـ head)، والـ <b>transmission time</b> (الـ sector وهو بيعدي تحت الـ head).",
      "الـ <b>Seek time</b>: الوقت اللي الـ arm محتاجه عشان يروح للـ cylinder الصح. وده <b>أكبر</b> تكلفة. والقيم المعتادة:<br>• حوالي 5 ms عشان ينقل من track للي جنبه (track-to-track).<br>• وأقصاه 50 ms (من أجوّا track لأبرّا track).<br>• وفي المتوسط 30 ms (من track عشوائي لـ track عشوائي تاني).",
      "الـ <b>Rotational delay (latency)</b>: الوقت اللي الـ disk محتاجه عشان يلف لحد ما الـ sector اللي عايزينه ييجي تحت الـ read/write head.<br>والـ hard disks عادةً بتلف حوالي 5000 rpm، يعني لفة كل 12 ms.<br>• أقل latency بصفر.<br>• وأكبر latency هي وقت لفة كاملة.<br>• والـ <b>average latency (r)</b> هي:<span class=\"ltr\">(min + max)/2 = max/2 = ½ revolution = ½ × (60 × 1000)/RPM ms</span>وفي العادة المتوسط بيبقى 6–8 ms.",
      "الـ <b>Transfer time</b>: الوقت اللي الـ read/write head بياخده وهو بيعدي على <b>block</b>. والـ formula بتاعته:<span class=\"ltr\">Transfer time = (bytes transferred / bytes on a track) × rotation time = revolution time / sectors per track</span>مثلًا لو فيه 63 sector في الـ track، نقل sector واحد بياخد 1/63 من اللفة."
     ],
     "figH": {
      "fp-access-steps": "الـ disk access في 3 خطوات: الـ seek والـ rotational latency والـ transfer (slide 35)"
     }
    },
    {
     "h": "مثال 1 ومثال 2",
     "pts": [
      "<b>مثال 1</b>: الـ average seek بـ 8 ms، والـ average rotational delay بـ 3 ms، والـ maximum rotational delay بـ 6 ms، والـ spindle speed بـ 10,000 rpm، وفيه 170 sector في الـ track، والـ sector بـ 512 B. المطلوب متوسط وقت قراية sector واحد. الـ transfer بيساوي وقت اللفة على عدد الـ sectors:<span class=\"ltr\">(1/10,000 min)/170 = (60/10,000 s)/170 = 6/170,000 s = 6/170 ms ≈ <b>0.035 ms</b></span>والـ total هو:<span class=\"ltr\">8 + 3 + 0.035 = <b>11.035 ms</b></span>",
      "<b>مثال 2</b> (disk حقيقي، Seagate ST3200822A): الـ capacity بـ 200 GB؛ والـ transfer rate أقصاه 683 Mbits/sec جوّه و 100 Mbytes/sec بره؛ وفيه 2 discs و 4 heads؛ والـ sector بـ 512 bytes؛ والـ spindle speed بـ 7200 rpm؛ والـ average seek بـ 8.5 ms؛ والـ average latency بـ 4.16 ms؛ وفيه 170 sector في الـ track. المطلوب متوسط وقت قراية sector واحد:<span class=\"ltr\">Transfer = (1/7200 min)/170 = (60/7200 s)/170 = 6/(720 × 170) = 6/122,400 ≈ <b>0.05 ms</b></span><span class=\"ltr\">Total = 8.5 + 4.16 + 0.05 = <b>12.71 ms</b></span>"
     ],
     "figH": {
      "fp-access-time": "متوسط وقت قراية sector واحد: مثال 1 ومثال 2، وتقدر تغيّر القيم"
     }
    },
    {
     "h": "الـ Disk كـ bottleneck",
     "pts": [
      "الـ processes كتير بتبقى <b>disk-bound</b>: يعني الـ network والـ CPU بيستنوا الـ disk وقت طويل. الحلول:",
      "<b>(1) الـ Multiprocessing</b>: الـ CPU يشتغل على jobs تانية وهو مستني الـ disk.",
      "<b>(2) الـ Disk striping</b>: نحط blocks مختلفة من الـ file على drives مختلفة، عشان الـ processes المستقلة متعطلش بعض (parallelism).",
      "<b>(3) الـ RAID</b>، اختصار لـ Redundant Array of Independent Disks.",
      "<b>(4) الـ RAM disk</b> (memory disk): جزء من الـ main memory بيعمل نفسه disk (سرعة مقابل إن الداتا volatile).",
      "<b>(5) الـ Disk cache</b>: حتة كبيرة من الـ memory شايلة pages من الـ disk. بنشيك على الـ cache الأول، ولو مش موجودة (miss) نروح للـ disk."
     ]
    },
    {
     "h": "حل الـ Quiz (2)",
     "pts": [
      "المعطيات:<br>• فيه 20 surface.<br>• كل surface فيه 800 tracks.<br>• كل track فيه 25 sectors.<br>• الـ sector فيه 512 B.<br>• السرعة 3600 rpm.<br>• الـ seek بياخد 7 ms من track للي جنبه، و 28 ms في المتوسط، و 50 ms أقصى حاجة.",
      "‡ (a) اللفة بتاخد 60,000/3600 = 16.67 ms، يبقى <b>الـ average latency بـ 8.33 ms</b>.",
      "‡ (b) الـ <b>disk capacity</b> بتساوي:<span class=\"ltr\">20 × 800 × 25 × 512 = <b>204,800,000 B ≈ 195.3 MB</b></span>",
      "‡ (c) <b>قراية الـ disk كله، cylinder ورا التاني</b> (800 cylinder × 20 track). نفترض إن كل track بياخد average latency + لفة كاملة، يعني 8.33 + 16.67 = 25 ms، فالـ cylinder الواحد بياخد 20 × 25 = 500 ms. والحركات هي average seek واحد (28 ms) عشان نوصل لأول cylinder، وبعدين 799 seek من track للي جنبه (7 ms).<br>والـ total تقريبًا:<span class=\"ltr\">28 + 799×7 + 800×500 = 28 + 5,593 + 400,000 = <b>405,621 ms ≈ 405.6 s</b></span>والـ slide مفيهاش إجابة، فاكتب الافتراضات بتاعتك في الامتحان."
     ]
    }
   ],
   "cards": [
    "الـ magnetic disks (زي الـ hard والـ floppy) والـ optical disks (زي الـ CD-ROM والـ CD-R والـ CD-RW والـ DVD).",
    "الـ Magnetic tape.",
    "أصغر جزء ليه address في الـ disk، وغالبًا 512 bytes.",
    "عدد ثابت من الـ sectors اللي ورا بعض (ده اللي الـ OS file manager شايفه).",
    "الـ tracks اللي فوق/تحت بعض بالظبط؛ تتقري من غير ما الـ arm يتحرك.",
    "عدد الـ tracks في كل surface.",
    "تحريك الـ arm؛ وغالبًا ده أبطأ جزء في الـ disk access.",
    "الـ arms.",
    "بيمسك الـ platters في مكان ثابت ويلفّها.",
    "عدد الـ records اللي متخزنة في كل block.",
    "الـ Count (عدد الـ bytes في الـ block)، والـ Key (اختياري، الـ key بتاع آخر record)، والـ Data.",
    "مساحة بتضيع جوا الـ sector عشان الـ records مش جاية مظبوطة عليه.",
    "½ × (60 × 1000 / RPM) ms.",
    "وقت اللفة / عدد الـ sectors في الـ track.",
    "مجموع الـ seek والـ rotational delay والـ transfer.",
    "الـ Multiprocessing، والـ disk striping، والـ RAID، والـ RAM disk، والـ disk cache."
   ],
   "qa": [
    "الـ Seek time: الوقت اللي الـ read/write arm بياخده عشان يروح للـ cylinder الصح (وده أكبر تكلفة). الـ Rotational delay (latency): الوقت اللي الـ disk بياخده عشان يلف لحد ما الـ sector المطلوب ييجي تحت الـ head (المتوسط = نص لفة). الـ Transfer time: أول ما الـ head يبقى فوق الداتا، ده الوقت اللي بياخده عشان ينقلها (وقت اللفة / عدد الـ sectors في الـ track، لكل sector).",
    "الـ Multiprocessing (الـ CPU يعمل jobs تانية وهو مستني)؛ الـ disk striping (blocks على drives مختلفة بالتوازي)؛ الـ RAID؛ الـ RAM disk (الـ memory بتعمل نفسها disk)؛ الـ disk cache (الـ memory شايلة pages من الـ disk، ولو حصل miss نروح للـ disk).",
    "الـ Sectors: بيستخدمها الـ OS؛ وحدات ثابتة 512 B؛ بتعمل fragmentation وبطء في الـ access لـ files الـ records. الـ Blocks: بيستخدمها الـ DBMS؛ حجمها بيحدده الـ user وفيها عدد صحيح من الـ records (الـ blocking factor)؛ مفيش internal fragmentation، ومفيش record بيتقسم على 2 blocks؛ بس الـ sub-blocks بتزود الـ non-data overhead.",
    "اللفة = 60,000/6000 = 10 ms، يبقى الـ average latency = 5 ms.",
    "الحساب:<span class=\"ltr\">3 × 512 = 1536 bytes</span>",
    "الحساب:<span class=\"ltr\">33 × 512 = 16,896 bytes</span>وعدد الـ tracks مالوش دعوة بالـ track capacity.",
    "(a) حجم الـ data sub-block بيبقى 10 × 100 = 1000 B، فالـ block بـ 1000 + 300 = 1300 B، وعدد الـ blocks في الـ track:<span class=\"ltr\">⌊20,000/1300⌋ = ⌊15.38⌋ = 15</span>يبقى الـ records في الـ track هي 15 × 10 = <b>150</b>.<br>(b) الـ data sub-block بـ 6000 B والـ block بـ 6300 B، وعدد الـ blocks:<span class=\"ltr\">⌊20,000/6300⌋ = ⌊3.17⌋ = 3</span>يبقى الـ records في الـ track هي 3 × 60 = <b>180</b>.",
    "‡ (a) اللفة بتاخد 60 × 1000 / 3600 = 16.67 ms، يبقى الـ average latency هي ½ × 16.67 = <b>8.33 ms</b>.<br>(b) الـ capacity بتساوي عدد الـ surfaces في الـ tracks في الـ sectors في الـ bytes:<span class=\"ltr\">20 × 800 × 25 × 512 = <b>204,800,000 bytes</b> (≈ 195.3 MB)</span>"
   ],
   "quiz": [
    [
     "صح. الـ arms هي اللي بتشيل وتوجه وتحرك الـ read/write heads؛ وتحريكها اسمه seeking، وغالباً ده أبطأ جزء في الـ access (L2, Disk components).",
     "الـ arm assembly هو المجموعة الداخلية كلها اللي فيها الـ arms.",
     "الـ platters هي الـ disks الدايرية اللي بتخزن الـ magnetic data على الوشين؛ مبتحركش الـ heads (L2, Disk components).",
     "الـ spindle بيمسك الـ platters في مكانها وبيلفّها عشان يجيب الـ sector تحت الـ head؛ اللي بيحرك الـ heads هي الـ arms (L2, Disk components)."
    ],
    [
     "الـ transfer time هو الوقت اللي الـ head بياخده عشان يعدي على الـ data بعد ما يكون اتظبط في مكانه، مش وقت تحريك الـ arm (L2, Cost of a disk access).",
     "الـ latency (rotational delay) هو الانتظار لحد ما الـ disk يلف ويجيب الـ sector تحت الـ head، بعد ما الـ arm يكون في مكانه خلاص (L2).",
     "اللف بيعمله الـ spindle وبيدينا الـ rotational delay؛ تحريك الـ arm للـ cylinder الصح اسمه seek time (L2).",
     "صح. الـ seek time هو وقت تحريك الـ read/write arm للـ cylinder الصح؛ وده أكبر جزء في الـ access cost (الـ average النموذجي 30 ms) (L2, Cost of a disk access)."
    ],
    [
     "الـ spindle عمره ما بيحتاج \"يتحرك\": هو بيلف الـ platters طول الوقت. اللي بيفضل ثابت وانت على cylinder واحد هو الـ arm assembly (L2, Cylinder).",
     "صح. الـ cylinder هو كل الـ tracks اللي تحت الـ heads عند وضع واحد للـ arm.",
     "لسه محتاجين اللف عشان نجيب الـ sectors تحت الـ head.",
     "الـ Seeking يعني تحريك الـ arm، وهي نفس الفكرة، بس الإجابة النموذجية هي (b)."
    ],
    [
     "الـ 32,768 = 64 × 512 دي سعة الـ TRACK (sectors per track × bytes per sector)؛ الـ cluster هو 4 sectors بس (L2, Capacity formulas).",
     "صح. الحساب هو:<span class=\"ltr\">4 × 512 = 2048</span>وعدد الـ sectors في الـ track ده مجرد تشتيت.",
     "الـ 128 = 512 / 4 جاية من إنك قسمت بدل ما تضرب. والصح:<span class=\"ltr\">cluster capacity = sectors per cluster × bytes per sector</span>(L2).",
     "الـ 8 bytes مش طالعة من أي formula (لا 4 × 512 ولا 64 × 512)؛ الـ cluster اللي فيه 4 sectors بيشيل 4 × 512 = 2048 B (L2)."
    ],
    [
     "الـ 12 ms = 60,000 / 5000 دي لفة كاملة؛ الـ average latency نص لفة، يعني 6 ms (L2, Cost of a disk access).",
     "صح. الـ revolution = 60 × 1000 / 5000 = 12 ms، والـ average latency = ½ × 12 = 6 ms (L2, Cost of a disk access).",
     "الـ 3 ms دي ربع لفة (12 / 4)؛ متوسط الانتظار نص لفة، ½ × 12 = 6 ms (L2).",
     "الـ 0.012 دي لفة واحدة بالـ SECONDS (60 / 5000)، ومكتوبة ms غلط ومتقسمتش على 2؛ الإجابة ½ × 12 ms = 6 ms (L2)."
    ],
    [
     "الـ 200 = 20,000 / 100 بتتجاهل الـ 300 B overhead بتاع كل block وقاعدة إن الـ blocks الكاملة بس هي اللي بتدخل؛ العدد الصح 3 blocks × 60 = 180 (L2, Non-data overhead).",
     "صح. الـ Block = 6300 B، ⌊20,000/6300⌋ = 3 blocks × 60 = 180.",
     "الـ 190 ≈ 3.17 blocks × 60 بتحسب block ناقص؛ اللي بيدخل ⌊20,000 / 6300⌋ = 3 blocks كاملين بس، يعني 180 (L2).",
     "الـ 150 دي إجابة السلايد لما الـ blocking factor = 10 (block 1300 B، و 15 blocks × 10)؛ مع BF = 60 الإجابة 180 (L2, Non-data overhead)."
    ],
    [
     "الـ track ده حلقة كاملة على السطح ومتقسم لـ sectors كتير، فمش أصغر addressable unit (L2, Disk components).",
     "الـ cluster ده عدد ثابت من الـ sectors المتجاورة (من وجهة نظر الـ OS)، فهو أكبر من الـ sector (L2, Disk components).",
     "صح. الـ sector هو أصغر addressable portion في الـ disk، وغالباً 512 bytes؛ والـ tracks والـ clusters والـ cylinders كلها معمولة من sectors (L2, Disk components).",
     "الـ cylinder هو مجموعة الـ tracks اللي فوق/تحت بعض على كل الـ surfaces، وده أكبر وحدة فيهم (L2, Disk components)."
    ],
    [
     "الـ hard disk ده magnetic disk، والمحاضرة حاطاه تحت الـ DASD (direct access)، مش serial access (L2, Secondary storage devices).",
     "الـ CD-ROM ده optical disk، ومتحط تحت الـ DASD (direct access)؛ المثال الوحيد للـ SASD هو الـ magnetic tape (L2).",
     "صح. المحاضرة بتحط الـ magnetic tape كـ Serial Access Storage Device (SASD)؛ والـ magnetic والـ optical disks دول DASD (L2, Secondary storage devices).",
     "الـ DVD ده optical disk فهو DASD (direct access)؛ مثال الـ SASD هو الـ magnetic tape (L2)."
    ],
    [
     "عدد الـ bytes اللي في الـ block موجود في الـ COUNT sub-block؛ الـ key sub-block فيه الـ key بتاع آخر record (L2, Sub-blocks).",
     "صح. بيخلي الـ controller يدوّر من غير ما يحمّل الـ block في الـ memory.",
     "الـ records نفسها موجودة في الـ DATA sub-block؛ الـ key sub-block فيه key آخر record بس (L2, Sub-blocks).",
     "الـ sector address ده non-data overhead بتاع الـ tracks المتنظمة بالـ sectors؛ مش واحد من الـ sub-blocks بتاعة الـ block (L2, Non-data overhead)."
    ],
    [
     "الـ cylinder height = 14 معناه 14 tracks في الـ cylinder، يعني 14 surface (وش). كل platter ليه 2 surfaces، فالـ platters عددها 7 (L2).",
     "صح. الـ cylinder height = عدد الـ surfaces = 14، وكل platter ليه وشين، فالـ platters = 14 / 2 = 7 (L2, Worked problem).",
     "الـ 28 = 14 × 2 ضربت بدل ما تقسم. والصح:<span class=\"ltr\">platters = cylinder height / 2 = 7</span>(L2, Capacity formulas).",
     "ده عدد الـ cylinders في مثال السلايدز."
    ],
    [
     "الـ RAM disk ده جزء من الـ main memory بيمثّل إنه disk؛ مبيوزعش الـ blocks بتاعة الـ file على كذا drive (L2, Disk bottleneck).",
     "الـ disk cache ده block كبير من الـ memory شايل pages من الـ disk، وبيتشيك عليه قبل الـ disk؛ وبيستخدم drive واحد (L2, Disk bottleneck).",
     "صح. الـ disk striping بيحط blocks مختلفة من الـ file على drives مختلفة، فالـ processes المستقلة تقدر تشتغل بالتوازي من غير ما تعطل بعض (L2, Disk bottleneck).",
     "الـ multiprocessing بيخلي الـ CPU يشتغل على jobs تانية وهو مستني الـ disk؛ مبيحطش blocks على drives (L2, Disk bottleneck)."
    ],
    [
     "الـ 8.33 ms = 60,000 / 7200 دي لفة كاملة، يعني وقت transfer لـ track كامل، مش sector واحد (L2, Example 2).",
     "الـ 4.16 ms دي نص لفة، يعني الـ average latency في Example 2، مش الـ transfer time (L2).",
     "صح. الـ revolution = 60,000 / 7200 = 8.33 ms؛ والـ sector الواحد = 8.33 / 170 ≈ 0.049 ≈ 0.05 ms (L2, Example 2).",
     "الـ 170 ده عدد الـ sectors في الـ track، مش وقت؛ الـ transfer لـ sector واحد = revolution / 170 ≈ 0.05 ms (L2)."
    ]
   ],
   "extra": [
    [
     "ده 2000 × 40 × 512، يعني capacity بتاعة surface واحد بس. نسيت تضرب في الـ 8 tracks اللي في الـ cylinder.",
     "صح. الـ Track = 40 × 512 = 20,480 B؛ الـ cylinder = 8 × 20,480 = 163,840 B؛ 2000 cylinder × 163,840 = 327,680,000 B.",
     "هنا استخدمت 4 (عدد الـ platters) بدل 8 surfaces. الـ cylinder height بيعد الـ surfaces.",
     "ده حجم cylinder واحد، مش الـ drive كله."
    ],
    [
     "هنا استخدمت لفة كاملة (15 ms) كـ latency بدل نص لفة.",
     "هنا نقلت sector واحد بس (0.3 ms) بدل خمسة.",
     "صح. اللفة = 60,000/4000 = 15 ms؛ الـ latency = 7.5 ms؛ الـ transfer = 5 × 15/50 = 1.5 ms؛ الـ total = 9 + 7.5 + 1.5 = 18 ms.",
     "هنا سبت الـ rotational delay (seek + transfer بس)."
    ],
    [
     "ده 12,288/150، وده متجاهل الـ blocks والـ overhead.",
     "هنا تجاهلت الـ 400 B overhead (block = 2400 B بيدي 5 blocks).",
     "هنا استخدمت 4.39 blocks. مينفعش نخزن block ناقص، فخد الـ floor الأول.",
     "صح. الـ Track = 24 × 512 = 12,288 B؛ الـ block = 16 × 150 + 400 = 2800 B؛ ⌊12,288/2800⌋ = 4 blocks؛ 4 × 16 = 64 record."
    ],
    [
     "صح. الـ File = 30,000 × 128 = 3,840,000 B؛ الـ track = 40 × 512 = 20,480 B؛ 3,840,000/20,480 = 187.5، نقرّبها لفوق لـ 188.",
     "قرّبت لتحت. الـ track الناقص لازم يتحجز برضه، فقرّب لفوق.",
     "ده عدد الـ SECTORS (3,840,000/512).",
     "ده عدد الـ CYLINDERS (3,840,000/163,840 = 23.4، متقربة لفوق)."
    ],
    [
     "الـ sector هو أصغر وحدة ليها address، فمينفعش تقرا byte لوحده.",
     "صح. الـ OS بيلاقي الـ platter والـ track والـ sector، ويقرا الـ sector كله في buffer، وبعدين يلاقي الـ byte.",
     "الـ track أكبر من أصغر وحدة ليها address؛ والسلايدز بتقول إن اللي بيتقري هو sector.",
     "الـ cylinder مجموعة tracks؛ مش هو وحدة القراية."
    ],
    [
     "الـ Striping بيحط blocks الـ file على drives مختلفة.",
     "الـ disk cache شايل pages متنسخة من الـ disk؛ مش بيشتغل هو نفسه كـ disk.",
     "صح. الـ RAM disk (memory disk) بيعمل disk في الـ main memory: سريع بس volatile.",
     "الـ Multiprocessing بيخلي الـ CPU يعمل jobs تانية وهو مستني الـ disk."
    ],
    [
     "الـ blocks بتزود sub-blocks (زي الـ count والـ key) و inter-block gaps، وده بيزود الـ overhead.",
     "صح. السلايدز بتقول إن التنظيم بالـ blocks فيه non-data overhead <b>أكتر</b> من الـ sector addressing."
    ],
    [
     "الـ seeking هو تحريك الـ arm للـ cylinder الصح؛ ملوش علاقة بالمساحة اللي مش مستخدمة جوه الـ sector (L2).",
     "الـ blocking factor هو عدد الـ records في كل block، وده في التنظيم بالـ blocks.",
     "الـ disk striping بيوزع الـ blocks بتاعة الـ file على كذا drive عشان الـ parallelism؛ مبيوصفش الـ bytes المهدرة في الـ sector (L2).",
     "صح. الـ Fragmentation هو ضياع مساحة جوا الـ sector لما الـ records متجيش مظبوطة عليه."
    ],
    [
     "صح. كل cylinder هو مجموعة الـ tracks عند وضع واحد للـ arm، يعني track واحد من كل surface، فبيبقى فيه cylinder لكل مكان track.",
     "السلايدز قايلة القاعدة دي صريحة: عدد الـ cylinders = عدد الـ tracks في كل surface."
    ],
    [
     "صح. تحريك الـ arm للـ cylinder الصح غالبًا هو أبطأ جزء.",
     "الـ Transfer بتاع sector واحد جزء صغير جدًا من اللفة (مثلًا 0.05 ms).",
     "الـ Latency عادةً 6–8 ms، وده أقل من الـ average seek المعتاد 30 ms.",
     "ده جزء من الـ transfer، مش أكبر تكلفة."
    ]
   ]
  },
  "3": {
   "notes": [
    {
     "h": "الـ File input والـ output",
     "pts": [
      "الـ <b>Text file</b>: سلسلة من الـ characters (زي الـ source code بتاع C)، وتقدر تشوفه في أي text editor.",
      "الـ <b>Binary file</b>: سلسلة من الـ bytes (زي فيلم أو مزيكا)، ومحتاج برنامج مخصوص.",
      "الـ files ممكن تبقى <b>input</b> files (البرنامج بيقرا منها) أو <b>output</b> files (البرنامج بيكتب فيها)."
     ]
    },
    {
     "h": "الـ File of records",
     "pts": [
      "الـ logical view: الداتا عبارة عن مجموعة <b>records</b>.",
      "الـ <b>Record</b>: مجموعة fields بتكوّن وحدة logical واحدة.",
      "الـ <b>Field</b>: قيمة داتا، وهو أصغر وحدة داتا ليها معنى logical. الـ fields ليها أسماء وأنواع (types) وأطوال وقيم.",
      "فيه 3 file structures: الـ <b>stream</b> والـ <b>field</b> والـ <b>record</b> structures."
     ],
     "figH": {
      "fp-file-records": "الـ logical view: الـ file عبارة عن records، والـ record عبارة عن fields"
     }
    },
    {
     "h": "(1) الـ Stream files",
     "pts": [
      "المعلومات بتتكتب كـ stream من الـ bytes <b>من غير أي معلومات زيادة</b>.",
      "مثال: <code>AmesMary123 MapleStillwaterOK74075MasonAlan90 EastgateAdaOK74820</code>.",
      "المشكلة: <b>مفيش أي طريقة نرجّع بيها المعلومات</b> بشكل الـ record المنظم."
     ],
     "figH": {
      "fp-stream-file": "الـ stream file: bytes من غير أي معلومات زيادة"
     }
    },
    {
     "h": "(2) الـ Field structures (4 طرق)",
     "pts": [
      "الـ <b>Fixed length</b>: مثلًا الأطوال 5 و 7 و 25:<span class=\"ltr\"><code>87358CARROLLALICE IN WONDERLAND</code>, <code>03818FOLK&nbsp;&nbsp;&nbsp;FILE STRUCTURES</code></span>",
      "الـ <b>Length indicator</b> في أول كل field:<span class=\"ltr\"><code>058735907CARROLL19ALICE IN WONDERLAND</code></span>",
      "كل field بيتكتب على شكل <b><bdi dir=\"ltr\">keyword = value</bdi></b>، زي كده:<span class=\"ltr\"><code>ISBN=87359 AU=CARROLL TI=ALICE IN WONDERLAND</code></span>",
      "الـ <b>Delimiter</b> في آخر كل field:<span class=\"ltr\"><code>87359|CARROLL|ALICE IN WONDERLAND|</code></span>"
     ],
     "figH": {
      "fp-field-structs": "الـ 4 field structures، byte ورا byte: عدّل الـ fields واقراها تاني"
     }
    },
    {
     "h": "الـ Field structures: المميزات والعيوب"
    },
    {
     "h": "(3) الـ Record structures",
     "pts": [
      "الـ record هو مجموعة fields بتنتمي لبعض في مستوى تنظيم أعلى. هو أداة conceptual وفكرة logical مهمة في structure الـ file.",
      "الطرق:<br>(1) <b>fixed-length records بـ fixed-length fields</b><br>(2) <b>fixed-length records بـ variable-length fields</b> (fields بـ delimiters أو بـ length indicators، ونعمل padding لحد ما الـ record يوصل للحجم الثابت)<br>(3) <b>كل record بيبدأ بـ length indicator</b> (عدد الـ bytes)، مثلًا:<span class=\"ltr\"><code>3387359|CARROLL|ALICE IN WONDERLAND</code></span>"
     ],
     "figH": {
      "fp-record-structs": "الـ 3 record structures، وإزاي ننط للـ record رقم i"
     }
    },
    {
     "h": "الـ Record structures: المميزات والعيوب"
    },
    {
     "h": "إدارة files الـ records",
     "pts": [
      "الـ <b>Primary key</b>: بيميّز الـ record بشكل unique ومش بيتغير.<br>الـ <b>Secondary key</b>: بنستخدمه في البحث بس عادةً مش بيميّز الـ record بشكل unique.",
      "الـ <b>Sequential search</b>: نقرا الـ records بالترتيب لحد ما نلاقي اللي عايزينه، والـ cost بتاعه <b>O(n)</b>. وده مناسب للـ pattern matching أو للـ files اللي فيها records قليلة.",
      "الـ <b>Direct access</b>: نعمل seek على طول لأول الـ record. <b>O(1)</b>. ينفع لما نكون عارفين الـ <b>RRN</b> (Relative Record Number: أول record الـ RRN بتاعه 0، اللي بعده RRN 1…)."
     ],
     "figH": {
      "fp-access": "الـ sequential search بـ O(n) قصاد الـ direct access بـ O(1) عن طريق الـ RRN"
     }
    },
    {
     "h": "الـ Seeking",
     "pts": [
      "بشكل عام: <code>Seek(Source_File, Offset)</code>؛ مثلًا <code>Seek(infile, 3030)</code> بتنقلك للـ byte رقم 3030.",
      "في C:<span class=\"ltr\"><code>int fseek(FILE *stream, long offset, int origin)</code></span>والـ origin قيمته:<br>• <b>0</b>: البداية<br>• <b>1</b>: المكان الحالي<br>• <b>2</b>: النهاية<br>• الـ <code>fseek(infile,0L,0)</code> بيروح للبداية<br>• الـ <code>fseek(infile,0L,2)</code> بيروح للنهاية<br>• الـ <code>fseek(infile,-10L,1)</code> بيرجع 10 bytes لورا.",
      "في C++: الـ fstream ليه pointer-ين. الـ <code>seekg</code> بيحرك الـ <b>get</b> pointer (القراية) والـ <code>seekp</code> بيحرك الـ <b>put</b> pointer (الكتابة). والـ origins هي <code>ios::beg</code> و <code>ios::cur</code> و <code>ios::end</code>.<br><code>infile.seekg(0, ios::beg); infile.seekg(0, ios::end); infile.seekg(-10, ios::cur);</code>"
     ],
     "figH": {
      "fp-seek": "الـ seeking: الـ fseek في C، والـ seekg والـ seekp في C++"
     }
    },
    {
     "h": "السؤال الأول في الـ Quiz (3): انسخ file من غير loops",
     "pts": [
      "الفكرة: تعمل <code>seekg</code> للآخر والـ <code>tellg</code> تديك الحجم، وبعدين <code>read</code> واحدة و<code>write</code> واحدة بالحجم ده."
     ],
     "figH": {
      "fp-copy-file": "نسخ file كامل بـ read واحدة و write واحدة"
     }
    },
    {
     "h": "السؤال التاني في الـ Quiz (3): عدّل record بالـ RRN",
     "pts": [
      "الـ fields والـ records الـ fixed-length معناها إن كل record ليه نفس الحجم، فالـ byte offset بيبقى بالظبط <b>RRN × record size</b>."
     ],
     "figH": {
      "fp-update-rrn": "تعديل record مكانه: الـ seekp لحد RRN × record size، وبعدين write"
     }
    }
   ],
   "cards": [
    "الـ Text: سلسلة characters (تقدر تعدّلها). الـ Binary: سلسلة bytes (محتاج برنامج مخصوص).",
    "أصغر وحدة داتا ليها معنى logical.",
    "مجموعة fields بتكوّن وحدة logical واحدة.",
    "مفيش معلومات زيادة، فمنقدرش نرجّع الـ records بشكل منظم.",
    "الـ Fixed length، والـ length indicator، والـ <bdi dir=\"ltr\">keyword = value</bdi>، والـ delimiter.",
    "+ سهل في القراية والتخزين؛ − بيضيع مساحة في الـ padding.",
    "+ ممكن يضيع مساحة أقل؛ − لازم تشيك كل byte وتقارنه بالـ delimiter.",
    "+ بيوصف نفسه (self-describing)، وبيسمح إن fields تبقى ناقصة؛ − الـ keywords بتضيع مساحة.",
    "+ سهل تنط لآخر الـ field؛ − الـ fields الطويلة محتاجة أكتر من byte للطول.",
    "الـ Fixed: سهل تنط للـ record رقم i بس بيضيع مساحة في الـ padding. الـ Variable: بيوفر مساحة بس محتاج index عشان تنط.",
    "اختصار لـ Relative Record Number، وأول record رقمه 0. والـ offset بيتحسب كده:<span class=\"ltr\">offset = RRN × record size</span>",
    "الـ 0 معناها البداية، والـ 1 معناها المكان الحالي، والـ 2 معناها النهاية.",
    "الـ seekg بيحرك الـ get pointer (القراية)؛ الـ seekp بيحرك الـ put pointer (الكتابة).",
    "الـ Sequential بـ O(n)؛ الـ direct بـ O(1)."
   ],
   "qa": [
    "الـ Fixed length (+ سهل في القراية والتخزين، − بيضيع مساحة في الـ padding)؛ الـ length indicator (+ سهل تنط لآخر الـ field، − الـ fields الطويلة محتاجة أكتر من byte واحد للطول)؛ الـ delimited (+ ممكن يضيع مساحة أقل، − لازم تشيك كل byte على الـ delimiter)؛ الـ <bdi dir=\"ltr\">keyword = value</bdi> (+ بيوصف نفسه وبيسمح إن fields تبقى ناقصة، − الـ keywords بتضيع مساحة).",
    "الحل: <code>void UpdateRecord(fstream &amp;file, Item &amp;newItem, int RRN){ file.seekp(RRN*sizeof(newItem), ios::beg); file.write((char*)&amp;newItem, sizeof(newItem)); }</code>",
    "في الـ pattern matching أو الـ files اللي فيها records قليلة. غير كده هو O(n)، فالـ direct access (O(1) بالـ RRN) أحسن.",
    "الـ primary key بيميّز الـ record بشكل unique ومش بيتغير. الـ secondary key بنستخدمه في البحث بس عادةً مش بيميّز الـ record بشكل unique."
   ],
   "quiz": [
    [
     "صح. وعشان كده منقدرش نرجّع الـ records.",
     "ممكن يبقى فيه مسافات جوا الداتا؛ بس ده مش التعريف.",
     "المعلومات الزيادة (زي الـ delimiters والـ lengths) دي اللي الـ field structures بتضيفها.",
     "الـ \"Space\" مش جزء من التعريف؛ الـ stream file هو stream of bytes من غير أي معلومات زيادة، وعشان كده مبنقدرش نرجّع الـ records (L3, Stream files)."
    ],
    [
     "المكان هو اللي بيحدد الـ field؛ والـ fields الناقصة بتسيب padding.",
     "الـ length indicator بيقول الـ field فيه كام byte بس؛ مبيسميش الـ field، فمش self-describing (L3, Field structures).",
     "الـ delimited fields بيفصلها رمز زي |، بس مفيش حاجة بتسمي كل field، والـ field الناقص لسه محتاج الـ delimiter بتاعه (L3, Field structures).",
     "صح. كل field بيقول اسمه (ISBN=…، AU=…)."
    ],
    [
     "إهدار المساحة بالـ padding ده عيب الـ FIXED-length fields؛ الـ delimiters عيبها بدل كده إنك بتشيك byte by byte (L3, Field structures table).",
     "صح. لما يبقى فيه delimiter في آخر كل field، البرنامج لازم يقارن كل byte في الـ field بالـ delimiter عشان يعرف الـ field بيخلص فين (L3, Field structures table).",
     "إهدار المساحة بالـ keywords ده عيب الـ <bdi dir=\"ltr\">KEYWORD = VALUE</bdi> fields، اللي ميزتها إنها self-describing (L3, Field structures table).",
     "إن الأطوال الكبيرة تحتاج أكتر من byte ده عيب الـ LENGTH-INDICATOR fields (لما الـ max size > 256)، مش الـ delimited (L3)."
    ],
    [
     "الـ padding المهدر ده عيب الـ FIXED-length records؛ الـ variable-length records بالعكس بتوفر مساحة لما الأحجام تبقى مختلفة (L3, Record structures table).",
     "صح. عشان الـ records أحجامها مختلفة، مبتقدرش تحسب record رقم i بيبدأ فين، فمتقدرش تنط له من غير index file (L3, Record structures table).",
     "الـ variable-length records تقدر تشيل أي data ومنها text (زي 87359|CARROLL|ALICE…)؛ عيبها إنك متقدرش تنط مباشرة لـ record رقم i (L3).",
     "الـ variable-length records عادةً بتستخدم variable fields (delimiters أو length indicators)؛ الـ fixed fields مش شرط (L3, Record structures)."
    ],
    [
     "الـ O(n) ده الـ SEQUENTIAL search، اللي بيقرا الـ records بالترتيب لحد ما يلاقي match؛ الـ direct access بيعمل seek على الـ record على طول (L3, Managing files of records).",
     "صح. الـ direct access بيعمل seek على طول لبداية الـ record (الـ offset معروف من الـ RRN بتاعه)، فالـ cost مش معتمد على n، وبيبقى O(1) (L3, Managing files of records).",
     "الـ log n ده cost الـ BINARY search على file متترتب؛ الـ direct access محتاج seek واحد، O(1) (L3–L4).",
     "التلات costs دول بتوع methods مختلفة: O(n) للـ sequential، و log n للـ binary search، و O(1) للـ direct access، فمينفعش يبقوا كلهم صح (L3)."
    ],
    [
     "صح. الـ sequential search بيقرا الـ records بالترتيب لحد ما يلاقي match، فأسوأ حالة بيقرا الـ n records كلهم: O(n) (L3, Managing files of records).",
     "الـ O(1) ده الـ DIRECT access بالـ RRN (seek واحد)؛ الـ sequential access ممكن يضطر يقرا كل record (L3).",
     "الـ log n ده الـ BINARY search على file متترتب بالـ key؛ الـ sequential search هو O(n) (L3–L4).",
     "الـ O(n) بس هو اللي بيوصف الـ sequential access؛ الـ O(1) ده direct access والـ log n ده binary search (L3)."
    ],
    [
     "الـ O(n) ده الـ linear (sequential) search، اللي بيقرا الـ records واحد واحد؛ الـ binary search بيقسم الـ range نصين كل خطوة (L4, Ordered files).",
     "الـ O(1) ده direct access بالـ RRN بـ seek واحد؛ الـ binary search محتاج حوالي log₂ n probes (L3).",
     "صح. الـ binary search بيقارن الـ key بالـ record اللي في النص وبيرمي نص الـ range الباقي كل خطوة، فمحتاج حوالي log₂ n accesses (L4, Ordered files).",
     "الـ O(n²) ده هيبقى أبطأ حتى من الـ sequential search؛ الـ binary search على file متترتب هو O(log₂ n) (L4)."
    ],
    [
     "الـ Origin 1 معناه CURRENT (المكان الحالي)، والـ offset سالب.",
     "صح. في <code>fseek(stream, offset, origin)</code>، الـ origin رقم 1 معناه الـ current position، والـ offset −10L بيرجع 10 bytes لورا من هناك (L3, Seeking).",
     "لو عايز 10 bytes قبل الآخر هتكتب <code>fseek(infile, -10L, 2)</code>؛ الـ origin 2 هو الـ end، بس الـ call ده بيستخدم origin 1 (current) (L3, Seeking).",
     "الـ fseek بتحرك الـ file pointer بس؛ قفل الـ file بيتعمل بـ fclose (L3, Seeking)."
    ],
    [
     "الـ seekg بتحرك الـ GET (read) pointer؛ الـ put (write) pointer بيتحرك بـ seekp (L3, Seeking).",
     "صح. الـ fstream ليه two pointers: الـ seekg بتحرك الـ get (read) pointer والـ seekp بتحرك الـ put (write) pointer (L3, Seeking).",
     "الـ tellg بتقولك الـ get (read) position الحالي بس، مثلاً عشان تعرف حجم الـ file؛ مبتحركش حاجة (L3, Quiz 3).",
     "الـ fseek دي function في C لتحريك الـ file pointer؛ السؤال عن function الـ put pointer في C++، يعني seekp (L3)."
    ],
    [
     "الـ 5 ده الـ RRN نفسه. والـ byte offset الصح:<span class=\"ltr\">byte offset = RRN × record size = 5 × 40 = 200</span>(L3, Direct access).",
     "صح. الـ RRNs بتبدأ من 0، فالـ byte offset:<span class=\"ltr\">byte offset = RRN × record size = 5 × 40 = 200</span>(L3, Direct access).",
     "الـ 240 = 6 × 40 بتعامل الـ RRN كأنه بيبدأ من 1؛ أول record الـ RRN بتاعه 0، فالـ offset = 5 × 40 = 200 (L3).",
     "الـ 45 = 5 + 40 جمعت بدل ما تضرب. والصح:<span class=\"ltr\">offset = RRN × record size = 200</span>(L3)."
    ]
   ],
   "extra": [
    [
     "دي طريقة الـ delimiter، مش الـ length indicators.",
     "الطريقة اللي فيها <bdi dir=\"ltr\">ISBN=… AU=… TI=…</bdi> هي الـ <bdi dir=\"ltr\">keyword = value</bdi>؛ الـ length indicators بتحط طول الـ field قبل كل field (05 52814…) (L3).",
     "صح. كل field قبله طوله: 05 + 52814، 05 + KNUTH، 07 + SORTING.",
     "كلمة SORTING فيها 7 characters مش 6. الطول اتعد غلط."
    ],
    [
     "هنا عدّيت characters الداتا بس وسبت الـ 2 delimiters (|).",
     "هنا زوّدت delimiter في الآخر والـ record مفيهوش.",
     "ده عدد الـ fields، مش عدد الـ bytes.",
     "صح. الحساب:<span class=\"ltr\">5 + 1 + 5 + 1 + 7 = 19 byte</span>زي ما السلايد بيعد:<span class=\"ltr\">5 + 1 + 7 + 1 + 19 = 33</span>"
    ],
    [
     "صح. الحساب:<span class=\"ltr\">record size = 24 + 4 + 4 = 32 B</span><span class=\"ltr\">offset = RRN × record size = 12 × 32 = 384</span>",
     "ده 13 × 32، وده بيعامل الـ RRNs كأنها بتبدأ من 1. أول record الـ RRN بتاعه 0.",
     "ده 11 × 32، غلطة بواحد في الاتجاه التاني.",
     "الـ 12 ده الـ RRN، مش الـ byte offset. والصح:<span class=\"ltr\">offset = RRN × record size = 12 × 32 = 384</span>(L3, Direct access)."
    ],
    [
     "الـ seekg بيحرك الـ GET pointer (القراية). الكتابة بتستخدم الـ put pointer.",
     "صح. الـ seekp بيحرك الـ put pointer (الكتابة)، و7 × 50 = 350 byte من البداية.",
     "الـ 400 جاية من <bdi dir=\"ltr\">8 × 50</bdi>، وده بيعامل الـ RRN كأنه بيبدأ من 1 فبيقع على الـ record اللي بعده.",
     "الـ offset لازم يتحسب من البداية (ios::beg)، مش من النهاية."
    ],
    [
     "الـ Origin 2 معناه نهاية الـ file، مش البداية.",
     "آخر record بيبدأ قبل النهاية بـ 20 byte، مش 60.",
     "صح. الـ Origin 2 = النهاية؛ والرجوع 60 byte = 3 records كل واحد 20 byte، فالقراية بتبدأ من تالت record من الآخر.",
     "تاني record من الآخر بيبدأ 2 × 20 = 40 byte قبل الآخر، يعني fseek(fp, -40L, 2)؛ الـ −60L بتوصل للتالت من الآخر (L3)."
    ],
    [
     "ده تعريف الـ PRIMARY key؛ الـ secondary key بيتستخدم في البحث وعادةً مبيميزش الـ record بشكل unique (L3).",
     "صح. الـ secondary key بنستخدمه في البحث بس عادةً مش بيميّز الـ record بشكل unique."
    ],
    [
     "دي ميزة الـ variable-length records.",
     "دي ميزة الـ <bdi dir=\"ltr\">keyword = value</bdi> fields.",
     "الـ fixed-length records بتضيع مساحة في الـ padding؛ ده عيبها.",
     "صح. كل record ليه نفس الحجم، فالـ offset بيتحسب كده:<span class=\"ltr\">offset = RRN × record size</span>"
    ],
    [
     "صح. الطول المتخزن في الأول بيقولك بالظبط تنط كام byte.",
     "مع الـ delimiters لازم تشيك كل byte لحد ما توصل للـ delimiter.",
     "ميزته إنه بيوصف نفسه وبيسمح إن fields تبقى ناقصة.",
     "الـ stream file مبيضيفش أي معلومات خالص، فمفيش حدود fields تنط لها؛ اللي بيديك كده هو الـ length indicator (L3, Stream files)."
    ],
    [
     "الـ Text files (زي الـ source code بتاع C) تقدر تشوفها في text editor؛ المزيكا لأ.",
     "صح. السلايدز بتدي الأفلام والمزيكا كأمثلة على الـ binary files.",
     "الـ \"Stream\" ده logical file structure، مش تصنيف text/binary.",
     "كون الـ file input أو output بيعتمد على البرنامج بيستخدمه إزاي."
    ],
    [
     "صح. الـ get pointer واقف في الآخر، فمكانه بيساوي عدد الـ bytes؛ وبعدين read واحدة وwrite واحدة بالحجم ده بينسخوا الـ file.",
     "الـ tellg بتقولك مكان الـ get الحالي، وفي آخر الـ file المكان ده هو حجم الـ file."
    ]
   ]
  },
  "4": {
   "notes": [
    {
     "h": "الـ file organizations الأساسية",
     "pts": [
      "طريقة الـ file organization بتحدد <b>استراتيجية مكان الـ record</b> (record placement strategy) والعلاقة بين <b>الـ key value</b> بتاع الـ record والـ <b>relative address</b> بتاعه.",
      "الهدف: <b>retrieve</b> بكفاءة (الجار الـ logical، الـ records اللي بتحقق شرط، record عشوائي) و<b>update</b> بكفاءة (الـ insert والـ delete والـ modify).",
      "الكفاءة بتتقاس بـ <b>عدد الـ disk accesses</b>: كل ما يقل كل ما يبقى أحسن.",
      "استراتيجيات الـ access:<br>• الـ <b>sequential search</b> بطيء وبـ O(n)<br>• الـ <b>direct access</b> بيجيب الـ record في read واحدة، O(1).",
      "الطرق هي الـ <b>unordered (heap) file</b> والـ <b>ordered (sequential) file</b> والـ <b>indexing</b> والـ <b>hashing</b>."
     ],
     "figH": {
      "fp-access-strat": "الـ sequential search قصاد الـ direct access: بنعدّ الـ disk accesses"
     }
    },
    {
     "h": "الـ Unordered file / الـ heap file",
     "pts": [
      "مجموعة records <b>مش مترتبة</b> متخزنة <b>بترتيب دخولها</b>، بغض النظر عن الـ key. وبيتسمى كمان unordered sequential file أو <b>pile</b> file.",
      "بيدعم الـ create/destroy والـ open/close والـ insert/delete. والـ records بتتعرف بـ <b>record id (rid)</b>.",
      "الـ <b>Retrieve</b>: بالـ <b>linear search</b> بس.",
      "الـ <b>Insert في الآخر</b>: بسيط وكفء، access واحد عشان تقرا آخر page وواحد عشان تكتبها تاني.<br>بس فيه عيب كبير: <b>بيسمح بـ records متكررة (duplicates)</b> (مثلًا لو عملت insert للـ record <bdi dir=\"ltr\">(4, Ali, CS)</bdi> عند offset 80).",
      "الـ <b>Delete</b>: تلاقي الـ record، تمسحه <b>physically أو logically</b>، وتكتبه تاني."
     ]
    },
    {
     "h": "مثال heap file (records حجمها 20 byte)",
     "figH": {
      "fp-heap-file": "الـ heap file: الـ insert في الآخر والـ duplicates والـ delete"
     }
    },
    {
     "h": "الـ cost model",
     "pts": [
      "• الـ <b>B</b> هو عدد الـ data pages (والـ page هنا هي الـ block)<br>• الـ <b>R</b> هو عدد الـ records في كل page<br>• الـ <b>D</b> هو متوسط الوقت عشان تقرا/تكتب disk page<br>• الـ <b>C</b> هو متوسط الوقت عشان تعالج record.",
      "العمليات:<br>• الـ <b>Scan</b> (تجيب كل الـ records)<br>• الـ <b>equality search</b> (\"sid = 23\")<br>• الـ <b>range search</b> (\"name after Smith\")<br>• الـ <b>Insert</b><br>• الـ <b>Delete</b> (بالـ rid)."
     ]
    },
    {
     "h": "تكاليف الـ Heap file",
     "pts": [
      "الـ <b>Scan</b> تكلفته:<span class=\"ltr\">B(D + RC)</span>لأنك بتقرا B pages، وتعالج R records في كل واحدة.",
      "الـ <b>Equality search</b>: 0.5B(D + RC). في المتوسط بتعمل scan لنص الـ file. ولو مفيش حاجة مطابقة، بتعمل scan للـ file كله.",
      "الـ <b>Range search</b> تكلفته:<span class=\"ltr\">B(D + RC)</span>لأن الـ records المطابقة ممكن تبقى في أي حتة، فلازم تعمل scan للـ file كله.",
      "الـ <b>Insert</b>: <b>2D + C</b>. تجيب آخر page، تضيف الـ record، وتكتبها تاني.",
      "الـ <b>Delete</b> تكلفته:<span class=\"ltr\">search cost + C + D</span>"
     ]
    },
    {
     "h": "الـ Ordered file / الـ sequential file",
     "pts": [
      "مجموعة records <b>مترتبة</b> متخزنة بترتيب الـ <b>key value</b>. والـ records بيتعملها access بالتسلسل من الأول للآخر.",
      "الـ Insert: الـ record الجديد بيروح لمكان محدد بالظبط، فـ <b>كل الـ records اللي الـ key بتاعها أكبر بتتحرك مكان واحد ناحية الآخر</b>. والـ delete والـ update محتاجين العكس.",
      "مثال: لو عملت insert للـ record <bdi dir=\"ltr\">(4, Ali, CS)</bdi> في الـ records <bdi dir=\"ltr\">1, 2, 3, 5</bdi> هيتحط عند offset 60، والـ record بتاع Ahmed (5) هيتزق لـ 80."
     ],
     "figH": {
      "fp-sorted-insert": "الـ insert في الـ ordered file: كل key أكبر بيتزق"
     }
    },
    {
     "h": "تكاليف الـ Sorted file",
     "pts": [
      "الـ <b>Scan</b> تكلفته:<span class=\"ltr\">B(D + RC)</span>",
      "الـ <b>Equality search</b> تكلفته:<span class=\"ltr\"><b>D·log₂B + C·log₂R</b></span>يعني binary search على الـ pages، وبعدين binary search جوا الـ page.",
      "الـ <b>Range search</b> تكلفته هي الـ search cost + تكلفة إنك تجيب الـ records المطابقة.",
      "الـ <b>Insert</b>:<span class=\"ltr\">search cost + 2 × (0.5B(D + RC)) = search + B(D + RC)</span>بتقرا وتكتب تاني نص الـ file في المتوسط.",
      "الـ <b>Delete</b>: زي الـ insert بالظبط: search + B(D + RC)."
     ],
     "figH": {
      "fp-search-compare": "الـ equality search: خطي في الـ heap file وثنائي (binary) في الـ sorted file"
     }
    },
    {
     "h": "جدول مقارنة التكاليف",
     "figH": {
      "fp-cost-calc": "حاسبة تكلفة الـ heap والـ sorted والـ hashed files"
     }
    },
    {
     "h": "إزاي تقرا اختيارات الامتحان",
     "pts": [
      "الامتحانات بتفك كلمة \"search +\" لـ formulas.<br>• الـ delete في الـ sorted file تكلفته:<span class=\"ltr\"><b>Dlog₂B + Clog₂R + B(D+RC)</b></span><br>• الـ delete في الـ hashed file تكلفته:<span class=\"ltr\"><b>1.25B(D+RC) + C + D</b></span>وده في الإجابة النموذجية (بتستخدم الـ hashed scan cost كـ \"search\").",
      "الـ hashed scan بيبقى <b>1.25B(D+RC)</b> لإن الـ hash buckets عادةً بتتساب مليانة حوالي 80%، فبيبقى فيه pages أكتر بـ 1.25 مرة."
     ]
    }
   ],
   "cards": [
    "استراتيجية مكان الـ record + العلاقة بين الـ key value والـ relative address.",
    "عدد الـ disk accesses (كل ما يقل أحسن).",
    "الـ records مش مترتبة، متخزنة بترتيب دخولها؛ وبيتسمى كمان pile file.",
    "الـ Linear search بس.",
    "بيسمح بـ records متكررة (duplicates).",
    "عدد الـ Pages، الـ records/page، وقت قراية/كتابة الـ page، وقت معالجة الـ record.",
    "<span class=\"ltr\">B(D + RC)</span>",
    "<span class=\"ltr\">0.5B(D + RC)</span>",
    "<span class=\"ltr\">2D + C</span>",
    "<span class=\"ltr\">D·log₂B + C·log₂R</span>",
    "<span class=\"ltr\">search + 2·(0.5B(D + RC)) = search + B(D + RC)</span>",
    "<span class=\"ltr\">1.25B(D + RC)</span>",
    "<span class=\"ltr\">H + D + 0.5RC</span>",
    "كل الـ records اللي الـ key بتاعها أكبر لازم تتزق مكان واحد ناحية الآخر."
   ],
   "qa": [
    "الـ record بيتضاف في آخر page: تقرا آخر page (D)، تضيف الـ record (C) وتكتبها تاني (D)، يبقى 2D + C. والعيب إنه بيسمح بـ records متكررة.",
    "بعد ما تلاقي المكان، كل الـ records اللي بعده بتتزق خطوة. في المتوسط نص الـ file (0.5B pages) لازم يتقري ويتكتب تاني، يبقى 2 × 0.5B(D+RC).",
    "في المتوسط الـ record بيتلاقي بعد ما تعمل scan لنص الـ pages. كل page بتكلف D عشان تتقري + RC عشان تشيك على الـ R records بتوعها. ولو مفيش record مطابق، بتعمل scan للـ file كله B(D+RC).",
    "الحساب:<span class=\"ltr\">B(D+RC) = 100 × (15 + 50×0.1) = 100 × 20 = 2000 ms</span>"
   ],
   "quiz": [
    [
     "ده الـ insert/delete بتاع الـ SORTED file، يعني binary search تكلفته <bdi dir=\"ltr\">Dlog₂B + Clog₂R</bdi>، وبعدين إعادة كتابة نص الـ file مرتين بتكلفة <bdi dir=\"ltr\">B(D + RC)</bdi>. الـ heap insert بيعمل append وخلاص (L4, Cost table).",
     "دي لازقة الـ search cost بتاع الـ sorted file في الـ heap insert 2D + C؛ مفيش operation في الـ cost table ليها الـ formula دي. الـ heap insert مش محتاج search (L4).",
     "الـ 1.25B(D + RC) ده الـ scan بتاع الـ HASHED file (الـ buckets مليانة ~80%)؛ الـ heap insert بيلمس آخر page بس: 2D + C (L4, Cost table).",
     "صح. تقرا آخر page، تضيف الـ record، وتكتبها تاني."
    ],
    [
     "ده الـ insert/delete cost بتاع الـ SORTED file (binary search + تزحيق نص الـ file)؛ الـ hashed scan بيقرا كل الـ bucket pages (L4, Cost table).",
     "دي خالطة الـ sorted search مع الـ heap insert 2D + C؛ مش موجودة في الـ cost table، والـ hashed scan فيها 1.25B(D + RC) (L4).",
     "صح. الـ Buckets مليانة ~80%، فالـ pages بتبقى 1.25×.",
     "الـ B(D + RC) ده الـ scan cost بتاع الـ HEAP والـ SORTED files؛ الـ hashed pages مليانة ~80% بس، فالـ hashed scan = 1.25 × ده (L4, Cost table)."
    ],
    [
     "الـ 2D + C ده الـ insert بتاع الـ HEAP file (تقرا آخر page، تضيف، تكتبها تاني)؛ الـ sorted delete لازم يعمل search ويزحّق records (L4, Cost table).",
     "ده الـ scan cost بس؛ جزء الـ search ناقص.",
     "الـ 1.25B(D + RC) ده الـ scan بتاع الـ HASHED file؛ الـ sorted delete هو binary search + B(D + RC) (L4, Cost table).",
     "صح. الأول search (binary)، وبعدين تزق نص الـ file (قراية وكتابة)."
    ],
    [
     "الـ 2D + C ده الـ INSERT cost بتاع الـ heap؛ الـ equality search لازم يعمل scan على الـ pages لحد ما يلاقي الـ match (L4, Heap file costs).",
     "صح. الـ heap file ملوش ترتيب، فبيتعمله scan linear؛ وفي المتوسط الـ match بيتلاقى بعد نص الـ file: 0.5B(D + RC) (L4, Heap file costs).",
     "الـ 1.25B(D + RC) + C + D ده الـ delete بتاع الـ HASHED file في الـ model answer، مش heap search (L4, Reading the exam choices).",
     "الـ Dlog₂B + Clog₂R ده binary search، يعني الـ equality search بتاع الـ SORTED file؛ الـ heap file ملوش ترتيب فمينفعش يستخدمه (L4, Cost table)."
    ],
    [
     "الـ Dlog₂B + Clog₂R ده الـ EQUALITY search بتاع الـ sorted file؛ الـ scan لازم يجيب كل record، يعني يقرا الـ B pages كلها (L4, Sorted file costs).",
     "صح. الـ scan بيجيب كل record، فبيقرا كل الـ B pages (D لكل واحدة) ويعالج R records في كل page (RC): B(D + RC)، زي الـ heap scan بالظبط (L4, Sorted file costs).",
     "الـ 1.25B(D + RC) ده الـ scan بتاع الـ HASHED file (الـ pages مليانة ~80%)؛ الـ sorted file فيه B pages مليانة، فهو B(D + RC) (L4).",
     "الـ 0.5B(D + RC) ده الـ equality search بتاع الـ HEAP file (نص الـ file في المتوسط)؛ الـ scan بيقرا الـ file كله (L4)."
    ],
    [
     "الـ Dlog₂B + Clog₂R ده الـ equality search بتاع الـ SORTED file، مش hashed delete (L4, Cost table).",
     "الـ B(D + RC) ده الـ SCAN cost بتاع الـ heap/sorted؛ الـ hashed delete في الـ model answer هو 1.25B(D + RC) + C + D (L4, Reading the exam choices).",
     "صح حسب الإجابة النموذجية: search + C + D.",
     "الـ 0.5B(D + RC) ده الـ equality search بتاع الـ HEAP file؛ الـ hashed delete هو search + C + D، ومكتوب في الـ model answer 1.25B(D + RC) + C + D (L4)."
    ],
    [
     "الـ binary search محتاج الـ records تبقى مترتبة بالـ key، بس الـ heap file بيخزنها بترتيب دخولها، فمينفعش (L4, Heap file).",
     "صح. الـ records بتتخزن بترتيب دخولها بغض النظر عن الـ key، فالمحاضرة بتقول إن الـ retrieval في الـ heap file بيبقى بالـ linear search بس (L4, Heap file).",
     "الـ hashing محتاج hashed file العناوين فيه بتتحسب من الـ key؛ الـ heap file بيخزن الـ records بترتيب الدخول وخلاص (L4).",
     "الـ B-tree index ده indexing structure منفصل؛ الـ heap file العادي ملوش index، فالـ linear search بس هو الممكن (L4)."
    ],
    [
     "الـ append سريع: قراية واحدة لآخر page وكتابة واحدة، 2D + C. العيب الخطير بتاعه إنه بيسمح بالـ duplicates (L4, Heap file).",
     "صح. الـ append عمره ما بيشيك على الـ keys الموجودة، فنفس الـ key ممكن يدخل مرتين (زي record تاني <bdi dir=\"ltr\">4, Ali, CS</bdi> عند offset 80) (L4, Heap file).",
     "تزحيق الـ records اللي الـ key بتاعها أكبر ناحية الآخر ده بيحصل في الـ SORTED (sequential) file، مش الـ heap file (L4, Ordered file).",
     "الـ hash function بتاعة الـ hashed files؛ الـ heap file بيعمل append في الآخر من غير ما يحسب أي address (L4)."
    ],
    [
     "الـ append في الآخر ده الـ insert بتاع الـ heap file؛ في الـ sorted file هيبوّظ ترتيب الـ keys، فلازم الـ records تتزحّق (L4, Ordered file).",
     "صح. الـ record الجديد بيروح لمكانه بالظبط حسب الـ key، فكل الـ records اللي الـ key بتاعها أكبر بتتنقل location واحد ناحية الآخر (زي 4 بيروح offset 60 و 5 بيتزحّق لـ 80) (L4, Ordered file).",
     "الـ hash table بتاع الـ hashed files؛ الـ sequential file بيحافظ على ترتيب الـ keys وبيزحّق الـ records في الـ insert (L4).",
     "ترتيب الـ keys لازم يتحافظ عليه، فالـ record بيروح لمكان محدد وكل الـ keys الأكبر بتتزحّق ناحية الآخر (L4, Ordered file)."
    ],
    [
     "الـ 4000 ms = 200 × (10 + 10) ده الـ SCAN الكامل B(D + RC)؛ الـ equality search بيعمل scan على نص الـ file في المتوسط (L4, Heap file costs).",
     "صح. الـ equality search = 0.5B(D + RC) = 0.5 × 200 × (10 + 10 × 1) = 100 × 20 = 2000 ms (L4, Heap file costs).",
     "الـ 21 ms = 2 × 10 + 1 ده الـ INSERT cost بتاع الـ heap يعني 2D + C، مش الـ equality search (L4).",
     "الـ 1000 ms = 0.5 × 200 × 10 شالت الـ RC term (10 records × 1 ms لكل page)؛ القيمة الصح 0.5 × 200 × 20 = 2000 ms (L4)."
    ]
   ],
   "extra": [
    [
     "الـ 8800 ms = 400 × (12 + 20 × 0.5) ده الـ SCAN cost يعني B(D + RC)؛ الـ insert بيقرا آخر page ويكتبها تاني بس (L4).",
     "ده الـ equality-search cost، 0.5B(D + RC).",
     "هنا عدّيت D واحدة بس. آخر page لازم تتقري <b>وكمان</b> تتكتب تاني.",
     "صح. الـ Insert = 2D + C = 2 × 12 + 0.5 = 24.5 ms."
    ],
    [
     "صح. الحساب:<span class=\"ltr\">D·log₂B + C·log₂R = 10 × 8 + 1 × 4 = 84 ms</span>",
     "بدّلت الـ logs، فحسبت:<span class=\"ltr\">D·log₂R + C·log₂B = 40 + 8</span>",
     "هنا استخدمت log₂B في الاتنين (80 + 8). الجزء بتاع الـ record بيستخدم log₂R.",
     "ده الـ equality search بتاع الـ HEAP، 0.5B(D + RC)."
    ],
    [
     "ده B(D + RC) بس. نسيت تزود الـ search cost.",
     "صح. الحساب:<span class=\"ltr\">Search + 2 × 0.5B(D + RC) = 84 + 256 × (10 + 16) = 84 + 6656 = 6740 ms</span>",
     "هنا زقيت نص الـ file مرة واحدة بس (84 + 3328). نص الـ file لازم يتقري <b>ويتكتب</b>: 2 × 0.5B(D + RC).",
     "ده الـ search cost بس؛ متجاهل تزقيق الـ records اللي بعده."
    ],
    [
     "ده الـ search cost بس. نسيت + C + D.",
     "هنا استخدمت الـ full scan (6656) كـ search. في المتوسط بتعمل scan لنص الـ file بس.",
     "صح. الـ Search = 0.5 × 256 × (10 + 16) = 3328؛ الـ delete = 3328 + 1 + 10 = 3339 ms.",
     "الـ 21 ms = 2 × 10 + 1 ده الـ INSERT cost بتاع الـ heap يعني 2D + C؛ الـ delete لازم الأول يعمل search على نص الـ file، وبعدين يضيف C + D (L4)."
    ],
    [
     "ده الـ heap file، اللي الـ record بيتضاف فيه في الآخر ومن غير ما نهتم بالترتيب.",
     "الـ records 4 و6 <b>و</b>7 كلهم الـ key بتاعهم أكبر، فالتلاتة بيتحركوا.",
     "الـ records 1 و2 الـ key بتاعهم أصغر، فبيفضلوا مكانهم.",
     "صح. كل الـ records اللي الـ key بتاعها أكبر (4، 6، 7) بتتحرك مكان واحد ناحية الآخر، والـ key 3 بيدخل عند offset 40."
    ],
    [
     "صح. ده التعريف اللي في السلايدز.",
     "تجهيز وformatting الـ storage media دي مهمة من مهام الـ file MANAGEMENT (L1)؛ الـ organization method بيحدد مكان الـ records والعلاقة بين الـ key والـ address (L4).",
     "الـ sectors per cluster ده إعداد physical للـ disk من L2؛ الـ file organization method بيحدد مكان الـ records والعلاقة بين الـ key والـ address (L4).",
     "ده عن الـ file managers، مش طرق الـ organization."
    ],
    [
     "حجم الـ record بيأثر على المساحة، بس السلايدز بتقيس الكفاءة بطريقة تانية.",
     "صح. كل ما الـ disk accesses تقل، كل ما الـ organization يبقى أكفأ.",
     "ده تفصيلة في الـ logical design، مش مقياس الكفاءة.",
     "وقت الـ CPU صغير جنب الـ disk access؛ السلايدز بتعد الـ disk accesses."
    ],
    [
     "صح. الـ records المطابقة ممكن تبقى في أي حتة في file مش مترتب، فلازم كل page تتقري.",
     "الـ heap file مفيهوش ترتيب نستفيد منه، فالـ range search تكلفته <bdi dir=\"ltr\">B(D + RC)</bdi>، زي الـ scan بالظبط."
    ],
    [
     "الـ indexing ده organization method منفصل (هو والـ heap والـ sequential والـ hashing)؛ الاسم التاني للـ heap file هو pile file (L4).",
     "الـ sorted file هو الـ file المترتب (ORDERED / sequential).",
     "صح. الـ heap file بيتسمى كمان unordered sequential file أو pile file.",
     "الـ hashed file بيحسب address كل record بـ hash function."
    ],
    [
     "نص الـ file ده المتوسط لما الـ record يكون موجود. لو مفيش تطابق مش هتقدر توقف بدري.",
     "صح. لو مفيش record مطابق، لازم تعمل scan للـ file كله، B(D + RC)."
    ]
   ]
  },
  "5": {
   "notes": [
    {
     "h": "ليه الـ hashing؟",
     "pts": [
      "الـ Hashing تقنية بحث مفيدة في عمل الـ indexes. والدافع الأساسي ليها إنها <b>تحسّن وقت البحث</b>.",
      "وقت البحث:<br>• الـ simple indexes مع binary search بـ <b>O(log N)</b><br>• الـ B-trees بـ <b>O(log<sub>k</sub> N)</b><br>• الـ hashing بـ <b>O(1)</b>."
     ],
     "figH": {
      "fp-search-time": "وقت البحث: الـ binary search قصاد الـ B-tree قصاد الـ hashing"
     }
    },
    {
     "h": "يعني إيه hashing؟",
     "pts": [
      "إنك تعرف مكان الـ key بمجرد ما تبص على الـ key نفسه. وعشان كده بنصمم <b>hash function</b>.",
      "الـ hash function <b>h(k)</b> بتحوّل الـ <b>key</b> لـ <b>address</b>. والـ address space بيتحدد من الأول، مثلًا 1000 address متاحين، فالـ h بتحوّل كل الـ keys الممكنة U لـ <bdi dir=\"ltr\">{0, 1, …, 999}</bdi>.",
      "في الـ hashing <b>مفيش علاقة واضحة بين الـ key والمكان</b>.",
      "الـ address بتاع كل record بيتحدد بـ algorithm رياضي. وده اسمه <b>hashed</b> file organization.",
      "الـ <b>bucket</b> هو وحدة تخزين تقدر تشيل record واحد أو أكتر في الـ hash file."
     ]
    },
    {
     "h": "الـ Collisions",
     "pts": [
      "ممكن 2 keys مختلفين يتحوّلوا لـ <b>نفس الـ address</b>. وده اسمه <b>collision</b>.",
      "الـ keys اللي بيحصل بينهم collision اسمهم <b>synonyms</b>."
     ],
     "figH": {
      "fp-collisions": "الـ collisions والـ synonyms: بنعمل hash للـ keys في 10 addresses"
     }
    },
    {
     "h": "الـ hash function البسيطة (Midterm Model A)",
     "pts": [
      "الخطوة 1: نمثّل الـ key كرقم، بإننا نجمّع كل 2 characters مع بعض (الـ ASCII codes).",
      "الخطوة 2: نعمل fold ونجمع، ونقسم على عدد prime (19937) عشان نمنع الـ overflow.",
      "الخطوة 3: نقسم على حجم الـ address space وناخد الباقي (remainder) كـ home address."
     ],
     "figH": {
      "fp-hash-fn": "الـ hash function خطوة بخطوة: من الـ key لحد الـ home address بتاعه"
     }
    },
    {
     "h": "تكاليف الـ Hashed file",
     "figH": {
      "fp-hash-costs": "تكاليف الـ hashed file: الـ scan والـ buckets مليانة 80%، والـ equality search"
     }
    }
   ],
   "cards": [
    "بتحوّل الـ key لـ address.",
    "لما 2 keys مختلفين بيطلعوا نفس الـ address بعد الـ hash.",
    "الـ keys اللي بيحصل بينهم collision (نفس الـ address).",
    "وحدة تخزين بتشيل record واحد أو أكتر في الـ hash file.",
    "بالترتيب:<span class=\"ltr\">O(log N) / O(log_k N) / O(1)</span>",
    "<span class=\"ltr\">H + D + 0.5RC</span>",
    "الـ Hashing بيبوّظ ترتيب الـ keys، فلازم تعمل scan للـ file كله (1.25B pages).",
    "الـ address بتاع كل record بيتحدد بـ algorithm رياضي."
   ],
   "qa": [
    "الحل: <code>int Hash(char key[12], int maxAddress){ int sum=0; for(int j=0;j&lt;12;j+=2) sum += key[j]*key[j+1]; sum %= 19937; return sum % maxAddress; }</code>",
    "الـ collision بيحصل لما 2 keys مختلفين يطلعوا نفس الـ address. والـ keys دول اسمهم synonyms.",
    "الـ hash function بتحسب الـ address على طول من الـ key، فبيبقى O(1). أما الـ simple index فمحتاج binary search بـ O(log N)، والـ B-tree محتاج O(log_k N)."
   ],
   "quiz": [
    [
     "الـ sequential (ordered) file بيحط الـ records بترتيب قيمة الـ key؛ مفيش algorithm بيحسب الـ address بتاع كل record (L4, Ordered file).",
     "الـ indexed file بيلاقي الـ records عن طريق index (lookup) structure منفصل، مش بإنه يحسب الـ address بـ formula (L5, Why hashing?).",
     "صح. في الـ hashed file organization الـ hash function h(k)، وهي mathematical algorithm، بتحسب الـ address بتاع كل record من الـ key بتاعه (L5, What is hashing?).",
     "الـ \"None\" غلط لأن المحاضرة مسمية الـ organization دي بالظبط: hashed، واللي فيها h(k) بتحسب الـ address (L5)."
    ],
    [
     "صح. المحاضرة بتعرّف الـ bucket إنه unit of storage تقدر تشيل record واحد أو أكتر في الـ hash file (L5, What is hashing?).",
     "مصطلح تخزين عام، مش مصطلح الـ hashing.",
     "الـ blocks دي الطريقة اللي الـ DBMS بينظم بيها الـ tracks physically (L2)؛ في الـ hash file وحدة التخزين اسمها bucket (L5).",
     "الـ nodes بتاعة الـ trees والـ linked lists (زي الـ B-trees)؛ وحدة التخزين في الـ hash file هي الـ bucket (L5)."
    ],
    [
     "ليها علاقة، بس الحدث نفسه اسمه collision.",
     "صح. لما two keys مختلفين يتحولوا بالـ h(k) لنفس الـ address، الحدث ده اسمه collision؛ والـ keys نفسهم اسمهم synonyms (L5, Collisions).",
     "الـ synonyms دي الـ KEYS اللي بتعمل collision (بيطلعوا نفس الـ address)؛ الحدث نفسه اسمه collision (L5, Collisions).",
     "الـ fragmentation هي المساحة المهدرة جوه الـ sector لما الـ records متقعدش فيه بالظبط (L2)؛ ملهاش علاقة بإن two keys ياخدوا نفس الـ address (L5)."
    ],
    [
     "الـ O(n) ده الـ sequential search، اللي بيقرا الـ records واحد واحد؛ الـ hashing بيحسب الـ address على طول (L3, L5).",
     "الـ O(log N) ده simple index بندور فيه بالـ binary search؛ الـ hashing أسرع، O(1) (L5, Why hashing?).",
     "الـ O(log_k N) ده search time بتاع الـ B-trees؛ الـ hashing بيروح للـ address على طول، O(1) (L5, Why hashing?).",
     "صح. الـ h(k) بتحسب address الـ record مباشرة من الـ key، فالـ search time مبيزيدش مع N، وبيبقى O(1)، مقابل O(log N) للـ index و O(log_k N) للـ B-tree (L5, Why hashing?)."
    ],
    [
     "الـ hashing مبيرتبش حاجة؛ بالعكس هو بيبوّظ ترتيب الـ keys (وعشان كده الـ range search في الـ hashed file بيعمل scan على الـ file كله) (L5).",
     "صح. القسمة على الـ prime 19937 بتخلي الـ folded sum محدود فمبيعملش overflow؛ وبعدين الـ % maxAddress في الآخر بتحوله للـ home address (L5, Simple hash function).",
     "الـ function بتحسب address بس؛ الـ synonyms مجرد keys صادف إنهم أخدوا نفس الـ address، والـ % 19937 مبتدورش عليهم (L5).",
     "الـ hashing هنا للـ addressing، مش للـ security."
    ],
    [
     "صح. تحسب الـ hash (H)، تقرا page واحدة (D)، وتعمل scan لنص الـ page في المتوسط.",
     "الـ 0.5B(D + RC) ده الـ equality search بتاع الـ HEAP file (scan على نص الـ file)؛ الـ hashing بيقرا page واحدة بس (L4, Cost table).",
     "الـ D·log₂B + C·log₂R ده binary search، يعني الـ equality search بتاع الـ SORTED file؛ الـ hashing بيحسب الـ page على طول (L4, Cost table).",
     "الـ 2D + C ده الـ insert بتاع الـ HEAP file (تقرا آخر page وتكتبها تاني)، مش search (L4, Cost table)."
    ]
   ],
   "extra": [
    [
     "صح. الحساب:<span class=\"ltr\">65 × 66 = 4290; 67 × 68 = 4556; sum = 8846</span><span class=\"ltr\">8846 % 19937 = 8846; 8846 % 100 = 46</span>",
     "هنا نطيت آخر خطوة % maxAddress. الـ address لازم يبقى في 0..99.",
     "هنا جمعت الـ 4 codes (266) بدل ما تضرب كل 2 في بعض.",
     "الـ 90 = 4290 % 100 استخدمت أول pair بس (65 × 66)؛ لازم تضيف التاني 67 × 68 = 4556: 8846 % 100 = 46 (L5)."
    ],
    [
     "الـ addresses مختلفة:<span class=\"ltr\">30 mod 13 = 4, 44 mod 13 = 5</span>",
     "صح. الحساب:<span class=\"ltr\">27 mod 13 = 1, 53 mod 13 = 1</span>يعني الاتنين بيطلعوا نفس الـ address، فبيحصل بينهم collision ويبقوا synonyms.",
     "الـ addresses مختلفة:<span class=\"ltr\">19 mod 13 = 6, 33 mod 13 = 7</span>",
     "الـ addresses مختلفة:<span class=\"ltr\">40 mod 13 = 1, 64 mod 13 = 12</span>"
    ],
    [
     "ده خارج القسمة (1234 / 101 ≈ 12)، مش الباقي.",
     "هنا استخدمت آخر رقمين، مش باقي القسمة على 101.",
     "صح. الحساب:<span class=\"ltr\">101 × 12 = 1212, 1234 - 1212 = 22</span>",
     "الـ addresses من 0 لـ 100، فالـ 101 برا الـ address space."
    ],
    [
     "هنا عملت scan للـ page كلها (RC = 10) بدل نصها في المتوسط.",
     "هنا سبت H، اللي هو وقت حساب الـ hash.",
     "هنا سبت الجزء 0.5RC بتاع إنك تشيك على الـ records اللي في الـ page.",
     "صح. الحساب:<span class=\"ltr\">1 + 10 + 0.5 × 20 × 0.5 = 1 + 10 + 5 = 16 ms</span>"
    ],
    [
     "المحاضرة بتقول العكس: في الـ hashing مفيش علاقة واضحة بين الـ key والـ location؛ الـ h(k) هي اللي بتحسبه (L5, What is hashing?).",
     "صح. الـ hash function هي اللي بتحسب الـ address، ومفيش علاقة واضحة بين الـ key والمكان."
    ],
    [
     "صح. الـ records اللي في الـ range ممكن تبقى في أي bucket، فلازم كل page تتقري.",
     "مينفعش تنط أي pages؛ كل الـ 1.25B pages بتتقري.",
     "الـ 1.25 ده عن عدد الـ pages، مش عدد مرات حساب الـ hash.",
     "الـ Binary search محتاج records مترتبة، والـ hashed file مش كده."
    ],
    [
     "عدد الـ data pages ده اسمه B في الـ cost model؛ الـ H هو الوقت اللي بياخده حساب الـ hash function (L4–L5, Cost model).",
     "صح. تحسب h(k) (الـ H)، تقرا الـ page الواحدة (D)، وتشيك على نص الـ records بتاعتها في المتوسط (0.5RC).",
     "الـ Cylinder height ده مصطلح من هندسة الـ disk في Lecture 2.",
     "الـ collisions مش موجودة في الـ formula؛ الـ H هو وقت حساب h(k)، والـ D قراية page واحدة، والـ 0.5RC تشييك نص الـ records اللي فيها (L5)."
    ],
    [
     "ده شغل sum % 19937 (القسمة على الـ prime).",
     "دمج الـ characters كـ pairs ده سطر الـ folding sum += key[j] * key[j+1]؛ السطر الأخير بيحوّل الـ sum لجوه الـ address space (L5).",
     "صح. باقي القسمة على حجم الـ address space هو الـ home address.",
     "الـ function بتحسب address بس؛ مش بتكتشف الـ collisions."
    ],
    [
     "صح. الـ address space بيتحدد من الأول، والـ h بتحوّل كل الـ keys الممكنة جواه.",
     "السلايدز بتستخدم المثال ده بالظبط: 1000 address، فالـ h بتحوّل الـ keys لـ 0..999."
    ],
    [
     "كل page بتتقري مرة واحدة؛ التكلفة الزيادة جاية من إن الـ pages أكتر.",
     "الـ scan بيقرا كل page ورا التانية وعمره ما بيحسب h(k)؛ الـ 0.25 الزيادة جاية من إن الـ pages مليانة ~80% بس (L5).",
     "الـ hashing مبيرتبش الـ file؛ بيبعتر الـ records حسب h(k). الـ factor 1.25 جاي من إن الـ buckets مليانة ~80% (L5).",
     "صح. لأن <bdi dir=\"ltr\">1 / 0.8 = 1.25</bdi>، فبيبقى فيه 1.25B pages لازم تتقري."
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
       "why": "الـ Arms هي اللي بتشيل الـ heads وتوجهها وتحركها (وتحريكها = seeking). الـ arm assembly هو المجموعة كلها؛ الـ platters بتخزن الداتا؛ والـ spindle بيلف.",
       "ow": [
        null,
        "الـ arm assembly هو المجموعة الداخلية كلها اللي شايلة الـ arms والـ heads؛ الجزء اللي بيشيل الـ heads ويحركها هو الـ arms (L2, Disk components).",
        "الـ platters هي الـ disks الدايرية اللي بتخزن الـ data على الوشين؛ مبتشيلش الـ heads (L2).",
        "الـ spindle بيمسك الـ platters وبيلفها تحت الـ heads؛ مبيحركش الـ heads (L2)."
       ]
      },
      {
       "why": "الـ Seek = حركة الـ arm. الـ Latency/rotation = استنى الـ platter يلف. الـ Transfer = قراية الـ bytes.",
       "ow": [
        "الـ transfer time هو وقت مرور الـ head على الـ data بعد ما يتظبط في مكانه، مش حركة الـ arm (L2, Cost of a disk access).",
        "الـ latency (rotational delay) هو الانتظار لحد ما الـ sector يلف ويجي تحت الـ head، بعد ما الـ arm يكون في مكانه خلاص (L2).",
        "اللف بيعمله الـ spindle وبيسبب الـ rotational delay؛ تحريك الـ arm اسمه seeking (L2).",
        null
       ]
      },
      {
       "why": "الـ sequential search بيقرا الـ records بالترتيب لحد ما يلاقي match، فأسوأ حالة بيقرا الـ n records كلهم: O(n) (L3, Managing files of records).",
       "ow": [
        null,
        "الـ O(1) ده direct access بالـ RRN (seek واحد)، مش sequential access (L3).",
        "الـ log n ده binary search على file متترتب بالـ key، مش sequential access (L3–L4).",
        "التلاتة دول بتوع methods مختلفة (sequential O(n)، binary log n، direct O(1))، فمش كلهم صح (L3)."
       ]
      },
      {
       "why": "الـ Cluster = 4 × 512 = 2048 B. أما 32768 = 64 × 512 فده حجم الـ track (مجرد تشتيت).",
       "ow": [
        "الـ 32768 = 64 × 512 دي سعة الـ TRACK؛ الـ cluster هو 4 sectors بس: 4 × 512 (L2, Capacity formulas).",
        null,
        "الـ 128 = 512 / 4 قسمت بدل ما تضرب؛ الـ cluster = sectors per cluster × bytes per sector (L2).",
        "الـ 8 bytes مش طالعة من أي formula؛ الـ cluster اللي فيه 4 sectors بيشيل 4 × 512 = 2048 B (L2)."
       ]
      },
      {
       "why": "تقرا آخر page (D)، تضيف الـ record (C)، وتكتبها تاني (D).",
       "ow": [
        "ده الـ insert/delete بتاع الـ sorted file: binary search وتزحيق نص الـ file، B(D + RC) (L4, Cost table).",
        "الـ sorted search مضاف على 2D + C مش مطابق لأي حاجة في الـ cost table؛ الـ heap insert مش محتاج search (L4).",
        "الـ 1.25B(D + RC) ده الـ scan بتاع الـ hashed file (الـ pages مليانة ~80%)، مش heap insert (L4).",
        null
       ]
      },
      {
       "why": "الـ Hashed pages مليانة ~80%، فبيبقى فيه 1.25B pages تعملها scan.",
       "ow": [
        "ده الـ insert/delete cost بتاع الـ sorted file (binary search + تزحيق نص الـ file)، مش scan (L4).",
        "الـ sorted search زائد الـ heap insert 2D + C مش formula من الـ table؛ الـ hashed scan هو 1.25B(D + RC) (L4).",
        null,
        "الـ B(D + RC) ده الـ scan بتاع الـ heap/sorted؛ الـ hashed pages مليانة ~80%، فبتقرا pages أكتر بـ 1.25 مرة (L4)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "بنعمل fold لكل 2 characters، ونحدد الـ sum بـ modulus عدد prime، وبعدين ناخد الـ mod على حجم الـ address space عشان يطلع الـ home address.",
       "ans": "<pre>int Hash(char key[12], int maxAddress)\n{\n    int sum = 0;\n    for (int j = 0; j &lt; 12; j = j + 2)\n        sum = sum + key[j] * key[j+1];\n    sum = sum % 19937;\n    return sum % maxAddress;\n}</pre>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "الجدول بتاع Lecture 3.",
       "ans": "<table><tr><th>النوع</th><th>الميزة</th><th>العيب</th></tr><tr><td>Fixed</td><td>سهل في القراية والتخزين</td><td>بيضيع مساحة في الـ padding</td></tr><tr><td>With length indicator</td><td>سهل تنط لآخر الـ field</td><td>الـ fields الطويلة محتاجة أكتر من byte واحد عشان تخزن الطول (الـ max size &gt; 256)</td></tr><tr><td>Delimited fields</td><td>ممكن يضيع مساحة أقل من الطريقة اللي بالطول</td><td>لازم تشيك كل byte في الـ field وتقارنه بالـ delimiter</td></tr><tr><td>Keyword</td><td>الـ fields بتوصف نفسها؛ وبيسمح إن fields تبقى ناقصة</td><td>بيضيع مساحة في الـ keywords</td></tr></table>"
      },
      {
       "why": "اللفة الواحدة = 60,000/5000 = 12 ms، ونصها = 6 ms.",
       "ans": "الـ Average latency = وقت ½ لفة = (0.5 × 1000 × 60) / 5000 = <b>6 ms</b>."
      },
      {
       "why": "دايمًا زوّد الـ overhead على كل block وخد الـ floor، عشان الـ block مينفعش يتقسم على tracks.",
       "ans": "الـ Track capacity = 20 × 512 = 10,240 B<br>الـ Block size = 128 × 20 + 500 = 3060 B<br>الـ Blocks/track = ⌊10,240 / 3060⌋ = ⌊3.35⌋ = 3 blocks<br>الـ Records/track = 3 × 20 = <b>60 record</b>"
      },
      {
       "why": "الـ Cylinder = 12 track وعدد الـ cylinders = 500. و61,440,000 / 1,048,576 ≈ 58.6 MB.",
       "ans": "الـ Disk capacity = track capacity × cylinder height × tracks/surface = 10,240 × 12 × 500 = <b>61,440,000 B ≈ 58.6 MB</b>."
      },
      {
       "why": "كل sector بياخد 1/20 من اللفة. والإجابة النموذجية كاتباها [(3×60)/5000]/20، وهي نفس الحاجة.",
       "ans": "اللفة = 60,000/5000 = 12 ms<br>الـ Transfer (3 sectors) = 3 × 12 / 20 = <b>1.8 ms</b><br>الـ Average total = seek 7 + latency 6 + transfer 1.8 = <b>14.8 ms</b>"
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
       "why": "الـ cylinder هو كل الـ tracks اللي تحت الـ heads عند وضع واحد للـ arm، فمش محتاج تحرك الـ arm. بس الـ rotation لسه مطلوب.",
       "ow": [
        "الـ spindle عمره ما بيبطل يلف الـ platters؛ اللي بيفضل ثابت وانت بتقرا cylinder واحد هو الـ arm assembly (L2).",
        null,
        "الـ rotation لسه مطلوب عشان يجيب كل sector تحت الـ head؛ اللي بنستغنى عنه هو حركة الـ arm بس (L2).",
        "الـ seeking (تحريك الـ arm) هو نفس الفكرة، بس الـ model answer هو (b)، الـ arm assembly، عشان يطابق كلام السلايد \"without moving the arm\" (L2)."
       ]
      },
      {
       "why": "الـ direct access بيعمل seek على طول للـ byte offset بتاع الـ record (RRN × record size) في access واحد، فالـ cost مش معتمد على n: O(1) (L3, Managing files of records).",
       "ow": [
        "الـ O(n) ده الـ sequential search، اللي بيقرا الـ records بالترتيب لحد ما يلاقي match (L3).",
        null,
        "الـ log n ده binary search على file متترتب؛ الـ direct access محتاج seek واحد (L3–L4).",
        "الـ O(1) بس هو اللي بيوصف الـ direct access؛ الـ O(n) ده sequential والـ log n ده binary search (L3)."
       ]
      },
      {
       "why": "التلاتة التانيين دول تقنيات file MANAGEMENT.",
       "ow": [
        null,
        "تجهيز/formatting الـ storage media دي مهمة file MANAGEMENT، مش اللي الـ organization methods لازم توفره (L1).",
        "الـ allocating للـ storage space والـ addressing دي مهمة file MANAGEMENT (L1).",
        "إدارة الـ free space دي مهمة file MANAGEMENT؛ الـ organization لازم تدي fast access و good space use (L1)."
       ]
      },
      {
       "why": "في الـ hashed file organization الـ hash function h(k)، وهي mathematical algorithm، بتحول الـ key بتاع كل record للـ address بتاعه (L5, What is hashing?).",
       "ow": [
        "الـ sequential file بيخزن الـ records بترتيب الـ key؛ مفيش algorithm بيحسب كل address (L4).",
        "الـ indexed file بيلاقي الـ records عن طريق index structure منفصل، مش formula (L5).",
        null,
        "غلط لأن المحاضرة مسمية الـ organization دي: hashed، واللي فيها h(k) بتحسب الـ address (L5)."
       ]
      },
      {
       "why": "binary search عشان تلاقيه (Dlog₂B + Clog₂R)، وبعدين تزق نص الـ file: 2 × 0.5B(D+RC) = B(D+RC).",
       "ow": [
        "الـ 2D + C ده الـ insert بتاع الـ heap file (تقرا آخر page، تضيف، تكتبها تاني)، مش sorted delete (L4).",
        "الـ B(D + RC) ده جزء التزحيق بس (أو scan)؛ ناقص الـ search term يعني Dlog₂B + Clog₂R (L4).",
        "الـ 1.25B(D + RC) ده الـ scan بتاع الـ hashed file، مش sorted delete (L4).",
        null
       ]
      },
      {
       "why": "الـ hashed scan بيقرا كل bucket page؛ الـ buckets بتتساب مليانة حوالي 80%، فالـ data بتاخد 1/0.8 = 1.25 مرة pages أكتر: 1.25B(D + RC) (L4, Cost table).",
       "ow": [
        "ده binary-search term زائد D + C، ومش مطابق لأي scan formula؛ الـ scan لازم يقرا كل الـ pages (L4).",
        "الـ B(D + RC) ده الـ scan بتاع الـ heap/sorted؛ الـ hashed pages مليانة ~80% بس، فهو أكبر بـ 1.25 مرة (L4).",
        null,
        "الـ 1.25B(D + RC) + D + C ده الـ hashed DELETE في الـ model answer (search + C + D)، مش الـ scan (L4)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "تعمل seekg للآخر، والـ tellg تديك الحجم، وبعدين read واحدة وwrite واحدة بدل الـ loop.",
       "ans": "<pre>#include &lt;iostream&gt;\n#include &lt;fstream&gt;\nusing namespace std;\nint main() {\n    ifstream infile(\"d:\\\\src.txt\", ios::binary);\n    ofstream outfile(\"d:\\\\dest.txt\", ios::binary);\n    infile.seekg(0, infile.end);\n    long size = infile.tellg();\n    infile.seekg(0);\n    char* buffer = new char[size];\n    infile.read(buffer, size);\n    outfile.write(buffer, size);\n    delete[] buffer;\n    outfile.close(); infile.close();\n    return 0;\n}</pre>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "من Lecture 2، جزء \"Disk as a bottleneck\". أي أربعة منهم ياخدوا الدرجة.",
       "ans": "1. <b>الـ Multiprocessing</b>: الـ CPU يشتغل على jobs تانية وهو مستني الـ disk.<br>2. <b>الـ Disk striping</b>: blocks مختلفة من الـ file على drives مختلفة، عشان الـ processes المستقلة متعطلش بعض (parallelism).<br>3. <b>الـ RAID</b>: Redundant Array of Independent Disks.<br>4. <b>الـ RAM disk</b>: جزء من الـ main memory بيعمل نفسه disk (سرعة مقابل volatility).<br>5. <b>الـ Disk cache</b>: الـ memory شايلة pages من الـ disk؛ تشيك على الـ cache الأول وتروح للـ disk لو حصل miss."
      },
      {
       "why": "الـ Track = 15,360 B، واضربه × 10 tracks في الـ cylinder.",
       "ans": "الـ Cylinder size = 30 × 512 × 10 = <b>153,600 B = 150 KB</b><br>الـ Records في الـ cylinder = 153,600 / 128 = 1200 record"
      },
      {
       "why": "قرّب لفوق: الـ track الناقص لازم يتحجز برضه.",
       "ans": "الـ File = 10,000 × 128 = 1,280,000 B = 1250 KB<br>الـ Track = 30 × 512 = 15,360 B = 15 KB<br>الـ Tracks = 1250 / 15 = 83.3، يبقى <b>84 track</b>"
      },
      {
       "why": "عدد الـ cylinders = عدد الـ tracks في كل surface = 1000.",
       "ans": "الـ Cylinder size × tracks/surface = 150 KB × 1000 = 150,000 KB ≈ <b>146.5 MB</b>"
      },
      {
       "why": "الإجابة النموذجية بتحسب \"(2/1000)×60 = 120 ms\" وتقسم على 30. ده بيدي نفس الـ 4 ms، بس الطريقة الأوضح إنك تاخد لفة واحدة (60 ms) × 2/30. والـ average rotational delay (5 ms) معطى، فمتحسبوش تاني من الـ rpm.",
       "ans": "اللفة = 60,000/1000 = 60 ms<br>الـ Transfer (2 sectors) = 2 × 60 / 30 = <b>4 ms</b><br>الـ Total = seek 10 + rotational delay 5 + transfer 4 = <b>19 ms</b>"
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
       "why": "وعشان كده منقدرش نرجّع الـ records من الـ stream file.",
       "ow": [
        null,
        "الـ \"No space\" مش هو التعريف؛ الفكرة إن مفيش أي added information (delimiters، lengths) بتتكتب (L3, Stream files).",
        "الـ added information (delimiters، length indicators، keywords) دي اللي الـ field structures بتضيفها؛ الـ stream مفيهوش منها حاجة (L3).",
        "الـ \"Space\" مش هو التعريف؛ الـ stream file مفيهوش أي added information (L3)."
       ]
      },
      {
       "why": "الـ binary search على file متترتب بيقارن الـ key بالـ record اللي في النص وبيرمي نص الـ range الباقي كل خطوة، فمحتاج حوالي log₂ n accesses (L4, Sorted file).",
       "ow": [
        "الـ O(n) ده الـ linear (sequential) search، اللي بيقرا الـ records واحد واحد (L3).",
        "الـ O(1) ده direct access بالـ RRN بـ seek واحد (L3).",
        null,
        "الـ O(n²) ده هيبقى أبطأ حتى من الـ sequential search؛ الـ binary search هو O(log₂ n) (L4)."
       ]
      },
      {
       "why": "المحاضرة بتسمي two file managers (system software): الـ operating system والـ DBMS، فـ both a and b صح (L1, File managers).",
       "ow": [
        "الـ OS فعلاً file manager، بس الـ DBMS كمان، فدي نص الإجابة بس (L1).",
        "الـ DBMS فعلاً file manager، بس الـ OS كمان، فدي نص الإجابة بس (L1).",
        "الـ MIS ده management information system، مش واحد من الـ file managers (OS، DBMS) اللي المحاضرة سمّتهم (L1).",
        null
       ]
      },
      {
       "why": "المحاضرة بتعرّف الـ bucket إنه الـ unit of storage اللي تقدر تشيل record واحد أو أكتر في الـ hash file organization (L5, What is hashing?).",
       "ow": [
        null,
        "الـ disk page مصطلح تخزين عام (الـ page = block في الـ cost model)؛ المصطلح بتاع الـ hashing هو bucket (L5).",
        "الـ blocks دي الطريقة اللي الـ DBMS بينظم بيها الـ tracks physically (L2)؛ في الـ hashing الوحدة اسمها bucket (L5).",
        "الـ nodes بتاعة الـ trees والـ linked lists، مش الـ hash file organization (L5)."
       ]
      },
      {
       "why": "الـ heap file مش مترتب، فالـ equality search بيبقى linear؛ وفي المتوسط الـ match بيتلاقى بعد scan لنص الـ file: 0.5B(D + RC) (L4, Heap file costs).",
       "ow": [
        "الـ 2D + C ده الـ INSERT cost بتاع الـ heap (تقرا آخر page وتكتبها تاني)، مش search (L4).",
        null,
        "الـ 1.25B(D + RC) + C + D ده الـ delete بتاع الـ hashed file في الـ model answer (L4).",
        "الـ Dlog₂B + Clog₂R ده binary search، يعني الـ equality search بتاع الـ SORTED file؛ الـ heap file مش مترتب (L4)."
       ]
      },
      {
       "why": "الإجابة النموذجية: search + C + D، ومستخدمة 1.25B(D+RC) كـ search.",
       "ow": [
        "الـ Dlog₂B + Clog₂R ده الـ equality search بتاع الـ sorted file، مش hashed delete (L4).",
        "الـ B(D + RC) ده الـ scan cost بتاع الـ heap/sorted (L4).",
        null,
        "الـ 0.5B(D + RC) ده الـ equality search بتاع الـ heap file (L4)."
       ]
      },
      {
       "why": "الـ scan بيجيب كل record، فكل الـ B pages بتتقري (D لكل واحدة) والـ R records اللي في كل page بتتعالج (RC): B(D + RC)، زي الـ heap scan بالظبط (L4, Sorted file costs).",
       "ow": [
        "الـ Dlog₂B + Clog₂R ده الـ equality search بتاع الـ sorted file (binary search)، مش full scan (L4).",
        null,
        "الـ 1.25B(D + RC) ده الـ scan بتاع الـ hashed file، اللي الـ pages فيه مليانة ~80% بس (L4).",
        "الـ 0.5B(D + RC) ده الـ equality search بتاع الـ heap file (نص الـ file في المتوسط) (L4)."
       ]
      }
     ]
    },
    {
     "items": [
      {
       "why": "الأحجام الثابتة معناها إن الـ offset = RRN × record size. الـ seekp بيحط الـ put pointer في مكانه، والـ write بتكتب فوق الـ record.",
       "ans": "<pre>struct Item {\n    char desc[31];\n    int qty;\n    float price;\n};\n\nvoid UpdateRecord(fstream &amp;file, Item &amp;newItem, int RRN)\n{\n    // newItem contains the new record to overwrite the old one\n    file.seekp(RRN * sizeof(newItem), ios::beg);\n    file.write((char *) &amp;newItem, sizeof(newItem));\n}</pre>"
      }
     ]
    },
    {
     "items": [
      {
       "why": "الجداول بتاعة Lecture 1 وLecture 2.",
       "ans": "<b>(i)</b> الـ Physical file: مجموعة bytes على الـ disk؛ ليه physical name (A.txt)؛ بيستخدم مرة واحدة وقت الـ opening. الـ Logical file: channel بيوصل البرنامج بالـ physical file؛ الـ logical name بتاعه variable في البرنامج (infile، fp)؛ بيستخدم أي عدد مرات محتاجه (open، read، write، append، close).<br><b>(ii)</b> الـ Seek time: الوقت اللي الـ read/write arm بياخده عشان يروح للـ cylinder الصح. الـ Rotational delay (latency): الوقت اللي الـ disk بياخده عشان يلف ويجيب الـ sector المطلوب تحت الـ head. الـ Transfer time: أول ما الـ head يبقى فوق الداتا، ده الوقت اللي بياخده عشان ينقلها."
      },
      {
       "why": "الإجابة النموذجية بتوري الـ cylinder size بس. كمّل بالقسمة على حجم الـ record.",
       "ans": "الـ Cylinder size = 30 × 512 × 10 = 153,600 B<br>الـ Records/cylinder = 153,600 / 128 = <b>1200 record</b>"
      },
      {
       "why": "الإجابة النموذجية كاتبة على السطر ده \"tracks\" بالغلط، بس القيمة دي sectors.",
       "ans": "الـ File = 10,000 × 128 = 1,280,000 B<br>الـ Sectors = 1,280,000 / 512 = <b>2500 sector</b>"
      },
      {
       "why": "الـ Cylinder size × عدد الـ cylinders.",
       "ans": "150 KB × 1000 = 150,000 KB ≈ <b>146.5 MB</b>"
      },
      {
       "why": "Seek + الـ rotational delay المعطى + transfer.",
       "ans": "اللفة = 60 ms<br>الـ Transfer = 4 × 60 / 30 = <b>8 ms</b><br>الـ Total = 10 + 5 + 8 = <b>23 ms</b>"
      }
     ]
    }
   ]
  }
 ]
};

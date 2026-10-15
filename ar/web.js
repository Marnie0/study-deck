window.AR = window.AR || {};
AR.web = { lectures: {}, exams: [] };

AR.web.lectures["1"] = {
  notes: [
    { h: `الـ Internet والـ Web والـ web pages والـ web sites`, pts: [
      `الـ <b>Internet</b> = مجموعة كمبيوترات في العالم كله متوصلة ببعض عن طريق سلسلة networks سريعة جدًا. يعني هو <b>النظام العالمي للـ computer networks المتوصلة ببعض</b>، وهو الوسيلة الأساسية لتبادل الثقافات ونقل المعرفة.`,
      `الـ Internet بيشيل كمية مالهاش آخر من مصادر المعلومات والخدمات: الـ hypertext documents والـ applications بتاعة الـ Web اللي مربوطة ببعض، و<b>الـ electronic mail والـ telephony والـ file sharing</b>.`,
      `خلي بالك: <b>الـ Internet مش هو الـ World Wide Web</b> (WWW أو W3). الـ Web ده مجرد <b>خدمة واحدة من الخدمات</b> اللي الـ Internet بيقدمها، حتى لو هي الأكتر استخدامًا.`,
      `<b>مميزات الـ Internet</b> (الرسمة): Social networking، Education and technology، Entertainment، Online services.`,
      `<b>عيوب الـ Internet</b> (الرسمة): تهديد للمعلومات الشخصية، الـ Spamming، الـ Cyber crime، الـ Virus attacks.`,
      `الـ Web اتعمل عشان يبقى <b>مخزن للمعرفة والثقافة الإنسانية</b>، بحيث الناس اللي شغالين مع بعض من أماكن بعيدة يقدروا يشاركوا الأفكار وكل تفاصيل مشروع مشترك.`,
      `الـ Web عبارة عن كمية ضخمة من الـ files مكتوبة بشكل من أشكال الـ <b>HTML</b>، واللي بيقول للـ browsers تعرض المعلومات إزاي. الكمبيوترات اللي شايلة الـ files دي اسمها <b>servers</b> لأنها بتخدم (serve) طلبات users كتير في نفس الوقت. والـ users بيوصلوا للـ files عن طريق برامج اسمها <b>browsers</b>.`,
      `الـ <b>Web page</b>: مساحة معلومات على الـ Internet بتعرض معلومات عن شخص أو business أو organization أو قضية معينة. الـ Web متكون من files اسمها web pages (documents) فيها <b>links</b> لـ resources (text، images، audio، video، داتا تانية).`,
      `الـ <b>Web site</b>: مجموعة web pages متجمعة مع بعض وغالبًا متوصلة ببعض بطرق مختلفة.`,
      `الـ <b>Static website</b>: الـ web pages متخزنة على الـ server <b>بنفس الشكل</b> اللي الـ user هيشوفها بيه.`,
      `الـ <b>Dynamic website</b>: الصفحات <b>مش</b> متخزنة بالشكل اللي الـ user بيشوفه؛ المحتوى بيتغير أوتوماتيك و/أو كتير حسب criteria معينة. ليها معنيين: (1) الـ code بتاع الصفحة <b>بيتبني dynamically حتة حتة</b>؛ (2) <b>المحتوى اللي بيظهر بيختلف</b> حسب criteria (قواعد متحددة قبل كده أو input متغير من الـ user).`
    ] },
    { h: `الـ URL (Uniform Resource Locator)`, pts: [
      `الـ URL هو <b>العنوان الكامل</b> للـ web page. ليه <b>3 components</b>: الـ <b>protocol</b>، و<b>اسم الـ site (domain/host)</b>، والـ <b>absolute path</b> للـ document.`,
      `الـ <b>Protocol</b> (<code>http://</code>): بيقول للـ server يستخدم الـ Hypertext Transfer Protocol (يعني "web mode").`,
      `الـ <b>Domain name / host name</b>: عنوان الـ server، زي <code>www.example.com</code>؛ الـ <code>example.com</code> هو الـ domain والـ <code>www.</code> هو host معين جوه الـ domain ده (ممكن كمان يبقى فيه <code>development.example.com</code>، <code>clients.example.com</code>).`,
      `الـ <b>File name / path</b> (اختياري): زي <code>/2012/samples/first.html</code>، directories بينها slashes بتبدأ من الـ root directory بتاع الـ host.`,
      `مثال <code>http://www.icci.org/studies/ips.html</code>: الـ protocol = http؛ اسم الـ host computer = www؛ الـ second-level domain = icci؛ الـ top-level domain = org؛ الـ directory = studies؛ اسم الـ file = ips.html.`
    ] },
    { h: `الـ Top-level domains` },
    { h: `الـ Web hosting والـ search engines والـ protocols والـ ISP`, pts: [
      `الـ <b>Web hosting</b>: بعد ما تعمل الـ site لازم يتخزن في مكان متاح طول الوقت؛ وشركات الـ hosting عندها web servers تقدر تخزن المحتوى ده.`,
      `الـ <b>Search engine</b>: بيجمع معلومات من الـ websites، يحللها ويخزنها في <b>database متنظمة بـ index</b>؛ والـ query بتاعتك بتتقارن بالـ database دي. يعني إنت بتدوّر في <b>الـ database بتاعة الـ search engine، مش في الـ Internet كله</b>، وعشان كده كل engine بيطلعلك نتايج مختلفة.`,
      `الـ <b>TCP/IP</b>: الـ protocol الأساسي للتواصل على الـ Internet؛ بيحدد القواعد اللي الكمبيوترات بتمشي عليها عشان تتواصل على network.`,
      `الـ <b>HTTP</b> (Hypertext Transfer Protocol): بيضمن تبادل كل أنواع الـ resources تقريبًا على الـ web (files، pages، images، نتايج البحث)؛ وهو اللغة اللي الـ browser بيبعت بيها الـ requests للـ server. والـ <b>HTTPS</b> هو النسخة الـ secure المتشفرة (encrypted).`,
      `الـ <b>FTP</b> (File Transfer Protocol): بيعمل upload أو download للـ files بين الـ client والـ server أو بين كمبيوترين؛ مسؤول عن نقل الـ files.`,
      `الـ <b>ISP</b> (Internet Service Provider): organization بتدّي الأفراد والشركات access للـ Internet وخدمات مرتبطة بيه زي الـ e-mail.`
    ] },
    { h: `الـ Client-server architecture`, pts: [
      `الكمبيوترات على الـ Internet بتستخدم <b>client/server architecture</b>: الـ server البعيد بيقدّم files وخدمات للـ client المحلي اللي عند الـ user.`,
      `الـ <b>Web server</b>: كمبيوتر شغال عليه software مخصوص بي"serve" صفحات الـ HTML والـ files المرتبطة بيها لما الـ client (غالبًا browser) يطلبها. وبيبقى secured عشان الناس المسموح لهم بس هما اللي يقدروا يغيروا الداتا.`,
      `الـ <b>Server-side technologies</b>: الـ JSP (Java Server Pages)، الـ ASP (Active Server Pages)، الـ ASP.NET، الـ PHP، الـ Python.`,
      `الـ <b>Client</b> (الـ front end): ناحية الـ user، وغالبًا هو الـ web browser؛ وممكن كمان يقصد بيه plug-ins/helper apps أو جهاز handheld.`,
      `الـ <b>Client-side technologies</b>: الـ HTML / XHTML، الـ CSS (Cascading Style Sheets)، الـ JavaScript / VBScript.`,
      `الـ <b>Web browser</b>: software بيجيب ويعرض ويتنقل بين مصادر المعلومات على الـ WWW. والـ resource بيتعرف بـ <b>URI</b> (Uniform Resource Identifier).`
    ] },
    { h: `الـ Web بيشتغل إزاي (5 خطوات)`, pts: [
      `<b>1.</b> الـ user بيكتب الـ URL (زي <code>http://www.tutorialspoint.com</code>) في الـ address bar بتاع الـ browser.`,
      `<b>2.</b> الـ browser بيسأل الـ <b>Domain Name Server (DNS)</b> عن الـ IP address بتاع الـ domain.`,
      `<b>3.</b> بعد ما ياخد الـ IP address، الـ browser بيبعت request للصفحة للـ web server باستخدام الـ <b>HTTP</b>، اللي بيحدد الـ browser والـ server بيتكلموا مع بعض إزاي. (الـ IP address ده رقم تعريفي مربوط بكمبيوتر أو network معينة.)`,
      `<b>4.</b> الـ web server بيستقبل الـ request ويدوّر على الصفحة. لو لقاها بيرجعها للـ browser و<b>يقفل الـ HTTP connection</b>.`,
      `<b>5.</b> الـ browser بيستقبل الصفحة، <b>يعملها interpret</b> ويعرض محتواها في الـ window.`
    ] },
    { h: `هيكل الـ site والـ hyperlinks والـ browsers بتعرض الصفحات إزاي`, pts: [
      `الهيكل المقترح للـ site: (1) <b>root folder</b> فيه الـ site كله؛ (2) صفحة اسمها <b>index.htm / index.html</b> في الـ root تبقى الـ homepage الـ default؛ (3) ممكن folder اسمه <b>images</b>؛ (4) folders زيادة عشان تنظم المحتوى.`,
      `الـ <b>Hyperlinks</b> هي الطريقة الأساسية للتنقل بين الصفحات والـ sites. ليها 4 أنواع: <b>Text</b> hyperlink (كلمة أو جملة)، <b>Image</b> hyperlink، <b>Bookmark</b> hyperlink (لجزء تاني في نفس الصفحة)، <b>E-mail</b> hyperlink (تبعت e-mail للعنوان اللي ظاهر).`,
      `لما صفحة تفتح، الـ browser بيقرا الـ HTML file ويعمله interpret ويظبط شكله. الـ files الخارجية (images، multimedia) بتنزل من الـ server؛ يعني الـ HTML files فيها بس <b>references</b> للـ files الخارجية، مش "embedding" ليها جواها.`
    ] },
    { h: `أنواع الـ web sites` },
    { h: `مشاكل تصميم الـ Website (6 design issues)`, pts: [
      `<b>1. Information availability</b>: كل المعلومات اللي تساعد الزائر ياخد قرار صح؛ والمعيار = توفّر <b>80-90%</b> من اللي الزائر بيدوّر عليه.`,
      `<b>2. Page layout</b>: الناس لازم تلاقي المحتوى المهم بسرعة، وإلا هيزهقوا؛ خلي الصفحات simple.`,
      `<b>3. Colors</b>: استخدم الألوان الـ standard؛ الـ links <b>أزرق (blue)</b>، الـ visited links <b>بنفسجي (violet)</b>، الـ active links <b>أحمر (red)</b>.`,
      `<b>4. Web accessibility</b>: الـ site يبقى متاح للكل، بما فيهم الناس اللي عندهم إعاقات (بصرية، سمعية، جسدية، في الكلام).`,
      `<b>5. User-friendly site</b>: متبني على اللي الجمهور محتاجه (UI/UX).`,
      `<b>6. Download speed</b>: الـ designer مايقدرش يتحكم فيها بالكامل؛ اعمل optimize للـ graphics (الصور ماتزيدش عن <b>10 KB</b>)، اعمل صفحات أصغر، وابعد عن الـ nested tables.`
    ] },
    { h: `أمان الـ Website (Website security)`, pts: [
      `الـ Cyber crime بيعمل hack للـ websites عشان ينزّل malware على أجهزة الزوار، ويسرق داتا العملا (الـ credit cards)، وينشر محتوى غير قانوني.`,
      `<b>Internet security protocols</b>: الـ <b>IPSec</b> (Internet Security Protocol) والـ <b>SSL</b> (Secure Socket Layer).`,
      `<b>التهديدات (Threats)</b>: الـ mobile worms، الـ malware، الـ ransomware على الـ PC والموبايل، هجمات كبيرة زي <b>Stuxnet</b>، الـ hacking as a service، الـ spam، الـ phishing.`,
      `الـ <b>Email phishing</b>: emails بتدّعي إنها من شركة حقيقية عشان تسرق الـ usernames والـ passwords وتفاصيل الـ credit card؛ والـ links بتوديك لـ sites مزيفة شبه الأصلية. علاماتها: <b>أخطاء إملائية وقواعد ركيكة</b>، <b>links مشبوهة</b>، <b>تهديدات</b> ("الـ account بتاعك هيتقفل")، و<b>تقليد (spoofing) websites أو شركات مشهورة</b>.`,
      `<b>اعتبارات الأمان (Security considerations)</b>: (1) <b>Updated software</b>؛ (2) <b>SQL injection</b> (الـ hackers بيدخلوا code ضار جوه الـ query بتاعتك عشان يغيروا tables أو ياخدوا معلومات أو يمسحوا داتا)؛ (3) <b>XSS</b> الـ cross site scripting (المهاجم بيحقن client side script؛ اعمل check أو encode أو شيل الـ HTML من الداتا اللي بتتبعت)؛ (4) <b>Error messages</b> (ماتقولش هل الغلط في الـ username ولا الـ password)؛ (5) <b>Validation of data</b> على الـ server side والـ client side الاتنين؛ (6) <b>Passwords</b> (8 characters على الأقل فيها capital وsmall وspecial characters)؛ (7) <b>Upload files</b> (ممكن يكون جواها script)؛ (8) <b>SSL</b> لما تبعت معلومات شخصية.`
    ] }
  ],
  cards: [
    `الـ Internet هو الـ network العالمية اللي متكونة من networks؛ والـ Web مجرد خدمة واحدة عليه (الأكتر استخدامًا).`,
    `مساحة معلومات على الـ Internet بتعرض معلومات عن شخص أو business أو organization أو قضية.`,
    `مجموعة web pages متجمعة مع بعض وغالبًا متوصلة ببعض بطرق مختلفة.`,
    `صفحات متخزنة على الـ server بنفس الشكل اللي الـ user بيشوفها بيه.`,
    `صفحات مش متخزنة بشكلها النهائي؛ المحتوى بيتبني حتة حتة أو بيختلف حسب criteria أو input من الـ user.`,
    `الـ Protocol، اسم الـ site (الـ domain)، والـ absolute path للـ document.`,
    `ده الـ second-level domain name (الـ org هو الـ top-level domain، والـ www هو اسم الـ host).`,
    `مؤسسة تعليمية / جهة عسكرية / المهنيين (دكاترة، محامين).`,
    `الـ protocol الأساسي للـ Internet: القواعد اللي الكمبيوترات بتمشي عليها عشان تتواصل على network.`,
    `الـ HTTP بيبادل الـ web resources (لغة الـ browser في الـ requests)؛ والـ HTTPS هو النسخة الـ secure المتشفرة.`,
    `File Transfer Protocol: بيعمل upload/download للـ files بين الـ client والـ server.`,
    `Organization بتدّي access للـ Internet وخدمات مرتبطة بيه زي الـ e-mail.`,
    `الـ HTML/XHTML، الـ CSS، الـ JavaScript/VBScript.`,
    `الـ JSP، الـ ASP، الـ ASP.NET، الـ PHP، الـ Python.`,
    `الـ browser بيسأل الـ DNS عن الـ IP address بتاع الـ domain.`,
    `Text، image، bookmark، e-mail.`,
    `أزرق (Blue) = link، بنفسجي (violet) = visited، أحمر (red) = active.`,
    `الـ site الكويس بيوفّر 80-90% من اللي الزائر بيدوّر عليه.`,
    `إدخال code ضار جوه query عشان تتلاعب بالـ database (تغيّر tables، تاخد معلومات، تمسح داتا).`,
    `Cross Site Scripting: المهاجمين بيحقنوا client-side script جوه الصفحات؛ والحل check/encode/strip للـ HTML من داتا الـ form.`
  ],
  qa: [
    `1) الـ user بيكتب الـ URL بتاع الصفحة في الـ address bar بتاع الـ browser. 2) الـ browser بيطلب الـ IP address بتاع الـ domain من الـ Domain Name Server (DNS). 3) بعد ما ياخد الـ IP address، الـ browser بيبعت request للصفحة للـ web server باستخدام الـ HTTP، اللي بيحدد الـ browser والـ server بيتواصلوا إزاي. 4) الـ web server بيستقبل الـ request ويدوّر على الصفحة؛ لو لقاها بيرجعها للـ browser ويقفل الـ HTTP connection. 5) الـ browser بيستقبل الصفحة، يعملها interpret ويعرض محتواها في الـ browser window.`,
    `1) <b>Information availability</b>: وفّر كل المعلومات اللي تساعد الزوار ياخدوا قرار؛ الـ site الكويس بيدّي 80-90% من اللي الزوار بيدوّروا عليه. 2) <b>Page layout</b>: المحتوى يبقى مترتب بحيث المهم يتلاقى بسرعة؛ خليه simple. 3) <b>Colors</b>: استخدم الألوان الـ standard (links أزرق، visited بنفسجي، active أحمر) عشان الزوار مايتلخبطوش. 4) <b>Web accessibility</b>: الكل يقدر يستخدمه بما فيهم اللي عندهم إعاقات بصرية أو سمعية أو جسدية أو في الكلام. 5) <b>User-friendly site</b>: متصمم على أساس اللي الجمهور محتاجه (UI/UX). 6) <b>Download speed</b>: اعمل optimize للـ graphics (الصور ماتزيدش عن 10 KB)، صفحات أصغر، وابعد عن الـ nested tables.`,
    `<b>الأنواع</b>: Blog (يوميات أونلاين، forums)؛ Social networking site (تواصل ومشاركة media)؛ Wiki site (بيتعدل بشكل جماعي، زي Wikipedia)؛ Web portal (بوابة لـ resources تانية)؛ Search engine site (للبحث عن sites تانية، زي Google)؛ Education site (أخبار ومعلومات المدرسة).<br><b>الـ Protocols</b>: الـ TCP/IP (الـ protocol الأساسي، القواعد اللي الكمبيوترات بتتواصل بيها على network)؛ الـ HTTP (تبادل الـ web resources، لغة الـ browser في الـ requests؛ والـ HTTPS هو النسخة المتشفرة)؛ الـ FTP (upload/download للـ files بين الـ client والـ server)؛ والـ ISP هو الـ organization اللي بتدّي access للـ Internet وخدمات زي الـ e-mail.`,
    `الـ Hyperlinks هي الطريقة الأساسية للتنقل بين الصفحات والـ sites. <b>Text hyperlink</b>: كلمة أو جملة بتودّي الزوار لصفحة/file تانية. <b>Image hyperlink</b>: صورة بتعمل نفس الحكاية. <b>Bookmark hyperlink</b>: text أو صورة بتودّي الزوار لجزء تاني في نفس الصفحة. <b>E-mail hyperlink</b>: بيخلي الزوار يبعتوا e-mail للعنوان اللي ظاهر.<br>الـ <b>web page</b> هي document واحد (مساحة معلومات عن شخص أو business أو قضية) فيها links لـ resources؛ أما الـ <b>web site</b> فهو مجموعة web pages مرتبطة ببعض ومتوصلة مع بعض، غالبًا تحت domain واحد وليه home page اسمها index.html.`,
    `<b>SQL injection</b>: محاولة من الـ hackers إنهم يتلاعبوا بالـ database بتاعتك بإنهم يدخلوا code ضار جوه الـ query عشان يغيروا tables أو ياخدوا معلومات أو يمسحوا داتا. <b>Dynamic website</b>: site صفحاته مش متخزنة بالشكل اللي الـ user بيشوفه؛ المحتوى بيتبني حتة حتة أو بيختلف حسب قواعد متحددة أو input من الـ user. <b>URL</b>: العنوان الكامل للـ web page، متكون من protocol وdomain name وabsolute path. <b>HTTP</b>: network protocol بيضمن تبادل كل الـ web resources تقريبًا؛ لغة الـ browser اللي بيبعت بيها requests للـ server (والـ HTTPS هو النسخة الـ secure).`,
    `التهديدات: الـ mobile worms، الـ malware، الـ ransomware على الـ PC والموبايل، هجمات كبيرة زي Stuxnet، الـ hacking as a service، الـ spam والـ phishing. الـ Email phishing بيبعت emails بتدّعي إنها من شركة حقيقية عشان يسرق الـ credentials؛ وعلاماته: أخطاء إملائية/قواعد، links مشبوهة، تهديدات، وgraphics مقلدة لشركات. اعتبارات الأمان: خلي الـ software updated؛ امنع الـ SQL injection؛ امنع الـ XSS بالـ checking/encoding/stripping للـ HTML؛ قلل المعلومات في الـ error messages؛ اعمل validate للداتا على الـ client والـ server الاتنين؛ فرض passwords قوية (8+ chars، capital، small، special)؛ افحص الـ files اللي بتترفع؛ استخدم SSL للمعلومات الشخصية. الـ Protocols: IPSec وSSL.`
  ],
  quiz: [
    [`الـ SQL injection هجوم، مش تحسين في التصميم.`, `ده وصف الـ Cross Site Scripting (XSS)، اللي بيحقن client-side script.`, `صح. الـ hackers بيدخلوا code ضار جوه query عشان يغيروا tables أو ياخدوا معلومات أو يمسحوا داتا (security considerations في L1).`, `الـ SQL injection مالوش أي علاقة بالـ performance؛ ده هجوم بيتحط فيه code خبيث جوه الـ query عشان يغيّر في الـ tables أو يسرق معلومات أو يمسح داتا.`],
    [`الـ Encryption مالوش دعوة بالشكل.`, `الـ Encryption بيزوّد الشغل؛ مابيسرّعش الـ processing.`, `صح. وعشان كده المحاضرة بتنصح بـ SSL/HTTPS لما تبعت معلومات شخصية.`, `الـ Encryption مش باين أصلًا في الـ user interface.`],
    [`الـ URL بيحدد مكان resource (web page أو file) على الـ server، مش مكان شخص؛ هو العنوان الكامل للـ web page (L1, URL).`, `الـ href والـ src هما attributes بيشيلوا URLs، لكن الـ URL نفسه عنوان.`, `الـ URL بيشاور على الـ document؛ هو مش الـ code.`, `صح. الـ URL هو العنوان الكامل للـ web page.`],
    [`الـ server بيخزن الصفحة ويبعتها؛ مابيعملهاش render.`, `"Web network" مش component من اللي في المحاضرة؛ الـ network بس بتوصّل الـ request، واللي بيفسّر الصفحة ويعرضها هو الـ browser.`, `صح. الـ browser بيعمل interpret للـ HTML ويعرضه (الخطوة 5 في الـ web بيشتغل إزاي).`, `"Web matrix" مش component من اللي في المحاضرة؛ قراية الـ HTML وعمل render ليها ده شغل الـ web browser (الخطوة 5 في how the web works).`],
    [`هنا الـ port جه الأول والـ scheme في الآخر. الـ web address بيبدأ بالـ scheme (الـ protocol) وبيخلص بالـ path واسم الـ file.`, `الـ prefix مينفعش ييجي قبل "://"؛ الـ scheme (الـ protocol، زي http) لازم ييجي الأول، وبعده prefix.domain، وبعدين :port.`, `الـ path مكانه بعد الـ domain والـ port، مش في الأول؛ أول الـ URL هو الـ scheme (الـ protocol)، زي http://.`, `صح. الـ protocol الأول، وبعدين الـ host prefix والـ domain، والـ port (اختياري)، وبعدين الـ path واسم الـ file.`],
    [`الـ newline character ده مجرد formatting جوه الـ file؛ الـ 404 بيبعتها الـ server لما الـ resource المطلوب مايكونش موجود.`, `ضيقة أوي: الـ 404 Not Found بترجع مع أي resource مش موجود (صفحة، صورة، stylesheet أو script)، مش الـ JavaScript files بس.`, `صح. الـ 404 Not Found معناها إن الـ server مالقاش الـ resource المطلوب.`, `الصفحة البطيئة بتوصل برضه، أو بيحصل timeout؛ إنما الـ 404 Not Found معناها إن الـ server مالقاش الـ file المطلوب خالص.`],
    [`اسم الـ host computer هو "www"، الجزء اللي قبل الـ domain؛ أما "org" فهو آخر جزء في الـ domain name، يعني الـ top-level domain.`, `الـ second-level domain هو "icci"، اللي على شمال "org" على طول؛ و"org" نفسه هو الـ top-level domain (للـ organizations، وغالبًا nonprofit).`, `صح. الـ "org" (للـ organizations، غالبًا nonprofit) هو الـ top-level domain.`, `الـ directory هو "studies"، الجزء اللي بعد الـ domain وقبل اسم الـ file ips.html؛ و"org" هو الـ top-level domain.`],
    [`المحاضرة بتأكد إنك مش بتدوّر في الـ Internet كله.`, `صح. النتايج جاية من الـ database بتاعة الـ engine المتنظمة بـ index، وعشان كده كل engine بيدّي نتايج مختلفة.`, `الـ Hosting بيخزن الـ sites؛ مش هو اللي الـ search engine بيعمله query.`, `الـ DNS بس بيترجم الـ domain name لـ IP address (الخطوة 2 في how the web works)؛ إنما الـ search queries بتروح للـ indexed database بتاعة الـ engine.`],
    [`الـ HTTP بيبادل web resources زي الصفحات؛ والمحاضرة بتدّي نقل الـ files للـ FTP.`, `صح. الـ File Transfer Protocol بيرفع (upload) أو ينزّل (download) الـ files.`, `الـ TCP/IP هو الـ protocol العام للتواصل على الـ Internet.`, `الـ SSL (Secure Socket Layer) ده Internet security protocol للتواصل المتشفر، مش الـ protocol بتاع رفع وتنزيل الـ files.`],
    [`الـ CSS دي client-side technology (مع الـ HTML/XHTML والـ JavaScript)؛ بتعمل style للصفحات في الـ browser، ومابتشتغلش على الـ server.`, `في الكورس ده الـ JavaScript متصنفة كـ client-side scripting.`, `صح. الـ PHP والـ JSP والـ ASP والـ ASP.NET والـ Python كلهم server-side.`, `الـ XHTML ده client-side markup، متذكور مع الـ HTML والـ CSS والـ JavaScript؛ الـ server-side technologies هي JSP وASP وASP.NET وPHP وPython.`],
    [`الأزرق هو اللون الـ standard للـ links العادية (اللي لسه ماتزارتش)؛ الـ visited links بنفسجي والـ active links أحمر (L1, Colors).`, `صح. أزرق للـ links، بنفسجي للـ visited links، أحمر للـ active links.`, `الأحمر هو اللون الـ standard للـ active links؛ الـ visited links لازم تبقى بنفسجي عشان الزوار مايتلخبطوش (L1, Colors).`, `الأخضر مش من ألوان الـ links الـ standard؛ المحاضرة بتستخدم الأزرق للـ links، والبنفسجي للـ visited، والأحمر للـ active.`],
    [`لو قلت أنهي field غلط، كده بتقول للمهاجم إن الـ username (أو الـ password) صح؛ المحاضرة بتقول ماتكشفش أنهي واحد فيهم اللي فشل.`, `صح. نقطة "Error messages": خلي بالك قد إيه من المعلومات بتدّيها.`, `عرض الـ query اللي فشلت بيدّي المهاجمين شكل الـ database اللي محتاجينه عشان يعملوا SQL injection؛ الـ error messages لازم تكشف أقل حاجة ممكنة.`, `الـ user لسه محتاج يعرف إن الـ login فشل.`],
    [`الصفحات الـ static متخزنة بنفس الشكل اللي الـ user بيشوفه.`, `صح. المحتوى بيختلف حسب قواعد متحددة أو input متغير من الـ user.`, `الـ portal نوع من أنواع الـ sites (بوابة)، مش تصنيف static/dynamic.`, `الـ web host ده شركة أو server بيخزّن الـ sites عشان تبقى متاحة على طول؛ مش نوع من الـ websites اللي محتواها بيتغير.`]
  ],
  extra: [
    [`المحاضرة بتأكد إن الـ Internet مش هو الـ Web.`, `صح. الـ Web خدمة واحدة (الأكتر استخدامًا) على الـ Internet، جنب الـ e-mail والـ telephony والـ file sharing.`, `مقلوبة: الـ Internet هو الـ network، والـ Web شغال عليه.`, `الـ Web مجموعة documents مربوطة ببعض؛ والـ HTTP هو الـ protocol بتاعه.`],
    [`العرض هو آخر خطوة، بعد ما الـ server يرد.`, `الـ server هو اللي بيقفل الـ connection بعد ما يبعت الصفحة.`, `صح. الخطوة 3: بالـ IP address، الـ browser بيطلب الصفحة باستخدام الـ HTTP.`, `الـ ISP بيدّي access بس؛ الـ request بيروح للـ web server.`],
    [`الـ text link بيودّيك لصفحة/file تانية؛ وده بيفضل في نفس الصفحة.`, `الـ image hyperlink بيستخدم صورة كـ link تدوس عليه؛ إنما ده text، والأهم إنه بينقلك جوه نفس الصفحة (bookmark).`, `الـ e-mail hyperlink بيخلي الزائر يبعت e-mail للعنوان اللي ظاهر؛ إنما "Back to top" بينقلك لحتة تانية في نفس الصفحة.`, `صح. الـ Bookmark links بتودّي الزوار لجزء تاني في نفس الصفحة.`],
    [`صح. زي "www" و"development" و"clients" في المحاضرة، الـ "shop" ده host معين جوه الـ domain ده.`, `الـ top-level domain هو "com"، آخر جزء في الـ domain name؛ أما "shop" فهو اسم الـ host اللي قدام example.com.`, `الـ protocol هو "http"، الجزء اللي قبل "://"؛ و"shop" هو الـ host المعيّن جوه الـ domain example.com.`, `الـ directories بتيجي بعد الـ domain: 2024 و items.`],
    [`الصفحات الـ static متخزنة بنفس الشكل اللي كل الـ users بيشوفوه.`, `الـ Hosting بيخزن الـ sites؛ مابيوصفش سلوك الصفحة.`, `صح. المحتوى بيختلف حسب criteria (input/تفضيلات الـ user).`, `الـ wiki ده site الـ users بيعدّلوا محتواه مع بعض (زي Wikipedia وWikiHow)؛ إنما الـ headlines المتفصّلة على مزاج كل user بتخليه dynamic site.`],
    [`الـ Page layout بيخص إن الناس تلاقي المحتوى المهم بسرعة وإن الصفحات تبقى بسيطة، مش حجم الصور أو الـ nested tables.`, `صح. الـ optimize للـ graphics والصفحات الأصغر ومن غير nested tables بيحسّنوا الـ download speed.`, `الـ Colors بتخص استخدام الألوان الـ standard (links زرقا، visited بنفسجي، active أحمر)، مش حجم الصور أو الـ nested tables.`, `الـ Accessibility تخص الـ users اللي عندهم إعاقات.`],
    [`الأخطاء الإملائية والـ grammar الوحش موجودين في الليستة كعلامة من علامات الـ phishing، فمينفعش يكونوا هما اللي NOT listed.`, `التهديدات زي "your account will be closed" موجودة في الليستة كعلامة phishing، وبتتستخدم عشان تزق الضحية يتصرف بسرعة.`, `الـ Spoofing لمواقع أو شركات مشهورة (graphics وlinks مزيفة شبه الأصلية) موجود في الليستة كعلامة phishing.`, `صح. العلامات اللي في الليستة هي الأخطاء الإملائية والـ grammar الوحش، والـ links المشبوهة، والتهديدات، والـ spoofing لمواقع أو شركات مشهورة؛ إنما وقت وصول الـ e-mail مش منهم (L1, Email phishing).`],
    [`الـ checks اللي على الـ client side لوحدها ممكن يتعمل لها bypass لو حد بعت الداتا للـ server على طول؛ المحاضرة طالبة validation على الناحيتين.`, `المحاضرة طالبة validation على الـ server side والـ client side الاتنين، مش على الـ server بس.`, `صح. الـ security considerations بتقول لازم الداتا تتعمل لها validation على الـ server side والـ client side الاتنين؛ الـ client checks بتدّي feedback سريع، والـ server checks مينفعش يتعمل لها bypass (L1, Website security).`, `الـ SSL بيشفّر الـ traffic؛ مابيعملش validate للداتا.`],
    [`صح. النتايج جاية من الـ database اللي كل engine جمعها وعملها index.`, `اختلاف النتايج ده طبيعي، مش error: كل engine بيدوّر في الـ database اللي هو جمعها وعمل لها index، مش في الـ Internet كله.`, `الـ HTTP بس بيشيل الـ request والـ response؛ النتايج بتعتمد على اللي كل engine جمعه وعمل له index في الـ database بتاعته.`, `السبب اللي في المحاضرة مالوش دعوة بالـ ISP: كل engine بيعمل query على الـ indexed database بتاعته، فالنتايج بتختلف.`],
    [`الـ FTP لرفع وتنزيل الـ files؛ النسخة الـ secure المتشفرة من الـ HTTP للـ web pages هي الـ HTTPS.`, `الـ TCP/IP هو الـ protocol العام للتواصل.`, `صح. الـ HTTP بيتبادل بيه الـ web resources وهو اللغة اللي الـ browser بيطلب بيها؛ والـ HTTPS هو النسخة الـ secure المتشفرة منه (L1, Protocols).`, `الـ ISP دي organization؛ والقواعد دي هي الـ TCP/IP.`]
  ]
};


AR.web.lectures["2"] = {
  notes: [
    { h: `يعني إيه HTML؟`, pts: [
      `الـ <b>HTML</b> (Hyper Text Markup Language) هي اللغة اللي بنعمل بيها الـ web pages. بالـ HTML تقدر تعمل صفحة فيها <b>text وgraphics وصوت وvideo</b>. وهي لغة <b>markup</b> (مش programming ولا scripting language)، وبتوصف <b>الـ structure</b> بتاع الصفحة.`,
      `الصفحات بتنتهي بـ <b>.htm</b> أو <b>.html</b>. ممكن تتكتب في HTML editors احترافية، بس للتعلم بينصحوا بـ text editor بسيط زي <b>Notepad</b> (PC) أو <b>TextEdit</b> (Mac). والـ <b>HTML editor</b> ده word processor متخصص بيسهّل كتابة الـ HTML.`,
      `شغلانة الـ <b>web browser</b> (Chrome، Edge، Firefox، Safari) إنه يقرا الـ HTML documents ويعرضها صح. الـ browser <b>مابيعرضش الـ tags</b>؛ بيستخدمها عشان يقرر يعرض الـ document إزاي.`,
      `Lab 1: الـ web developers يا إما <b>front end</b> يا <b>back end</b> يا <b>full stack</b>. أدوات الـ front-end: code editor (VS Code) وbrowser (Chrome).`
    ] },
    { h: `HTML document بسيط` },
    { h: `الـ Elements والـ tags والـ nesting`, pts: [
      `الـ <b>HTML element</b> بيتعرّف بـ start tag، وشوية content، وend tag: <code>&lt;tagname&gt;Content&lt;/tagname&gt;</code>. الـ element هو كل حاجة من الـ start tag لحد الـ end tag.`,
      `الـ <b>Empty elements</b> مالهاش content ومالهاش end tag، زي <code>&lt;br&gt;</code>، <code>&lt;hr&gt;</code>، <code>&lt;img&gt;</code>.`,
      `الـ <b>tag</b> هو keyword محطوط بين angle brackets، زي <code>&lt;I&gt;</code>. tags كتير (مش كلها) بتيجي أزواج؛ والـ closing tag هو نفس الأمر بس بـ forward slash <b>/</b> زيادة. <code>&lt;B&gt;Warning&lt;/B&gt;</code> بتعرض "Warning" بالـ bold.`,
      `الـ <b>Nested tags</b>: لما tags تبقى جوه tags تانية لازم <b>تقفل أقرب tag الأول</b>: <code>&lt;H1&gt;&lt;I&gt;The Nation&lt;/I&gt;&lt;/H1&gt;</code>.`,
      `كل الـ web pages ليها structure مشترك ولازم يبقى فيها الـ pair tags دول: <code>&lt;HTML&gt;</code>، <code>&lt;HEAD&gt;</code>، <code>&lt;TITLE&gt;</code> و<code>&lt;BODY&gt;</code>.`,
      `<b>ماتنساش الـ end tag أبدًا</b>: فيه elements (زي <code>&lt;p&gt;</code>) بتتعرض صح من غيره، بس ماينفعش تعتمد على كده.`,
      `<b>الـ HTML مش case sensitive</b>: <code>&lt;P&gt;</code> زي <code>&lt;p&gt;</code> بالظبط (الـ W3C بينصح بالـ lowercase، والـ XHTML بيفرضه).`
    ] },
    { h: `قواعد الـ document: الـ DOCTYPE والـ html والـ head والـ title والـ body`, pts: [
      `كل HTML documents لازم تبدأ بـ document type declaration <code>&lt;!DOCTYPE html&gt;</code>. ده بيمثل نوع الـ document وبيساعد الـ browsers تعرض الصفحات صح. لازم يظهر <b>مرة واحدة بس، في الأول خالص</b> (قبل أي HTML tags) وهو <b>مش case sensitive</b>. والـ declaration بتاع الـ HTML5 هو <code>&lt;!DOCTYPE html&gt;</code>.`,
      `الـ document بيبدأ بـ <code>&lt;html&gt;</code> وبيخلص بـ <code>&lt;/html&gt;</code> (أول tag بعد الـ DOCTYPE).`,
      `<b>الجزء اللي بيظهر</b> من الـ document هو اللي بين <code>&lt;body&gt;</code> و<code>&lt;/body&gt;</code>. الـ Metadata مكانها في <code>&lt;head&gt;</code> (title، meta، link، style، script)، وعمر ما يبقى فيها محتوى ظاهر زي الـ tables.`,
      `<b>&lt;title&gt;</b>: اختاره بعناية؛ الـ title بيحدد <b>ترتيب الصفحة (ranking) في بعض الـ search engines</b> وبيظهر في الـ Favorites والـ History والـ Bookmark lists.`
    ] },
    { h: `الـ Headings والـ paragraphs والـ links`, pts: [
      `الـ Headings من <code>&lt;h1&gt;</code> لـ <code>&lt;h6&gt;</code>. الـ <code>&lt;h1&gt;</code> هو <b>الأهم (الأكبر)</b>، والـ <code>&lt;h6&gt;</code> الأقل أهمية.`,
      `الـ Paragraphs بتستخدم <code>&lt;p&gt;</code>.`,
      `الـ Links بتستخدم الـ <code>&lt;a&gt;</code> (anchor) tag؛ والـ attribute اللي اسمه <b>href</b> بيحدد الوجهة: <code>&lt;a href="https://www.google.com"&gt;This is a link&lt;/a&gt;</code>.`,
      `الـ <b>target="_blank"</b> بيفتح الـ link في window/tab جديدة (الـ <code>_self</code> = نفس الـ frame، وده الـ default؛ والـ <code>_parent</code> والـ <code>_top</code> قيم تانية). والـ image link بيبقى <code>&lt;a href="url"&gt;&lt;img src="logo.png"&gt;&lt;/a&gt;</code>.`,
      `<b>View source</b>: كليك يمين وبعدين "View Page Source" (Chrome) أو "View Source" (Edge). والـ "Inspect" بيوريك الـ HTML والـ CSS بتوع أي element وبيخليك تعدّلهم على طول.`
    ] },
    { h: `الـ Attributes`, pts: [
      `كل HTML elements ممكن يبقى ليها attributes. بتدّي <b>معلومات زيادة</b>، و<b>دايمًا بتتكتب في الـ start tag</b>، وغالبًا بتيجي على شكل <b>name/value pairs</b> زي <code>name="value"</code>.`,
      `الـ <b>href</b>: الـ URL بتاع الصفحة اللي الـ link هيروحلها (على <code>&lt;a&gt;</code>).`,
      `الـ <b>src</b>: الـ path بتاع الصورة اللي هتتعرض على <code>&lt;img&gt;</code>: <code>&lt;img src="img_girl.jpg" width="500" height="600"&gt;</code>.`,
      `الـ <b>width / height</b>: مقاس الصورة بالـ pixels.`,
      `الـ <b>alt</b>: الـ alternate text <b>المطلوب (required)</b> للصورة لو ماعرفتش تتعرض (connection بطيء أو غلط في الـ src): <code>&lt;img src="img_girl.jpg" alt="Girl with a jacket"&gt;</code>.`,
      `الـ <b>style</b>: بيضيف styles زي اللون والـ font والحجم: <code>&lt;p style="color:red;"&gt;</code>.`,
      `الـ <b>lang</b>: حدد اللغة في <code>&lt;html lang="en"&gt;</code> عشان تساعد الـ search engines والـ browsers. في <code>lang="en-US"</code>: أول حرفين = اللغة، وآخر حرفين = البلد.`,
      `الـ <b>title</b>: معلومات زيادة بتظهر كـ <b>tooltip</b> لما الماوس يقف على الـ element.`
    ] },
    { h: `الـ Absolute مقابل الـ relative URLs (في الـ src / href)` }
  ],
  cards: [
    `اختصار لـ Hyper Text Markup Language.`,
    `لغة markup (markup language).`,
    `الـ Start tag + الـ content + الـ end tag.`,
    `element مالوش content ومالوش end tag، زي &lt;br&gt;.`,
    `الـ forward slash / (زي &lt;/p&gt;).`,
    `اقفل أقرب tag (الجوّاني) الأول.`,
    `&lt;!DOCTYPE html&gt; (مرة واحدة، في الأول، ومش case sensitive).`,
    `&lt;html&gt; (بعد الـ DOCTYPE declaration).`,
    `جوه الـ &lt;body&gt;.`,
    `لأنه بيأثر على ترتيب الصفحة في الـ search engines وبيظهر في الـ favorites والـ history والـ bookmarks.`,
    `&lt;h1&gt; (والـ h6 هو الأصغر).`,
    `الـ href.`,
    `الـ src.`,
    `الـ alt (مطلوب على &lt;img&gt;).`,
    `معلومات زيادة بتظهر كـ tooltip.`,
    `اللغة English، والبلد United States.`,
    `relative بالنسبة للـ domain root.`,
    `الـ target="_blank".`,
    `لأ (بس الـ XHTML بيفرض الـ lowercase).`
  ],
  qa: [
    `الـ <code>&lt;!DOCTYPE html&gt;</code> بيعلن إن ده HTML5 document (مرة واحدة، في الأول). الـ <code>&lt;html&gt;</code> هو الـ root اللي بيلف الـ document كله (وممكن يبقى معاه <code>lang="en"</code>). الـ <code>&lt;head&gt;</code> فيه الـ meta information: الـ <code>&lt;title&gt;</code> (عنوان الـ tab، الـ search ranking، الـ bookmarks)، والـ <code>&lt;meta charset&gt;</code>، والـ links للـ CSS. الـ <code>&lt;body&gt;</code> فيه المحتوى اللي بيظهر زي الـ headings بـ <code>&lt;h1&gt;</code> والـ paragraphs بـ <code>&lt;p&gt;</code>. والـ elements لازم تبقى nested صح (اقفل أقرب tag الأول).`,
    `الـ Attributes بتدّي معلومات زيادة عن الـ elements، ودايمًا بتتكتب في الـ start tag على شكل name="value". الـ <b>href</b>: الـ URL بتاع الـ link، <code>&lt;a href="https://www.google.com"&gt;</code>. الـ <b>src</b>: الـ path بتاع الصورة، <code>&lt;img src="img_girl.jpg"&gt;</code>. الـ <b>alt</b>: الـ alternate text المطلوب لو الصورة ماظهرتش. الـ <b>width/height</b>: مقاس الصورة بالـ pixels. الـ <b>style</b>: inline CSS، <code>style="color:red;"</code>. الـ <b>lang</b>: لغة الصفحة في <code>&lt;html lang="en-US"&gt;</code> (اللغة-البلد). الـ <b>title</b>: نص الـ tooltip لما الماوس يقف عليه.`,
    `الـ <b>absolute URL</b> فيه العنوان الكامل بالـ domain وبيعمل link لـ resource على site تاني (زي <code>https://www.google.com/images/img_girl.jpg</code>؛ وخلي بالك الصور الخارجية ممكن يبقى عليها copyright). الـ <b>relative URL</b> مافيهوش الـ domain وبيعمل link جوه نفس الـ site: من غير slash في الأول بيبقى relative للصفحة الحالية (<code>img_girl.jpg</code>)؛ وبـ slash في الأول بيبقى relative للـ domain root (<code>/images/img_girl.jpg</code>).`,
    `الـ title جوه الـ head، والـ tooltip بالـ title attribute، والصورة بـ src وalt، والـ link بـ target="_blank":<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;&lt;title&gt;My Page&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Welcome&lt;/h1&gt;
  &lt;p title="I'm a tooltip"&gt;Hover over me.&lt;/p&gt;
  &lt;img src="img_girl.jpg" alt="Girl with a jacket" width="500" height="600"&gt;
  &lt;a href="https://www.google.com" target="_blank"&gt;Visit Google&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>`
  ],
  quiz: [
    [`صح. الـ HTML هي الـ markup language اللي بنعمل بيها الـ web pages.`, `«Home Tool Markup Language» ده اسم متألّف؛ الـ HTML معناها Hyper Text Markup Language، وهي اللغة اللي بنعمل بيها الـ web pages.`, `الـ Hyperlinks ميزة في الـ HTML، مش جزء من اسمها.`],
    [`الـ JavaScript والـ PHP هما الـ scripting languages؛ الـ HTML بتعمل markup للـ structure بس.`, `صح. الـ HTML هي Hyper Text <b>Markup</b> Language: بتعمل mark up لـ structure الصفحة بالـ tags، ومش programming ولا scripting language (L2, What is HTML?).`, `الـ HTML مافيهاش variables ولا conditions ولا loops؛ هي بس بتوصف structure الصفحة، فهي markup language مش programming language.`, `الـ network protocol ده مجموعة قواعد للتواصل زي الـ HTTP أو الـ FTP؛ إنما الـ HTML هي الـ markup language بتاعة الصفحات اللي الـ HTTP بيشيلها.`],
    [`الـ &lt;head&gt; ده الجزء اللي فيه الـ meta information (title و meta و link و style)، مش heading؛ أكبر heading هو الـ &lt;h1&gt;.`, `صح. الـ &lt;h1&gt; بيعرّف أهم (أكبر) heading.`, `مفيش element اسمه &lt;heading&gt; في الـ HTML؛ الـ headings من &lt;h1&gt; (الأهم والأكبر) لحد &lt;h6&gt; (الأقل أهمية).`, `الـ &lt;h6&gt; هو أقل (أصغر) heading.`],
    [`مفيش رقم version في الـ doctype بتاع الـ HTML5.`, `صح. الـ document type declaration بتاع الـ HTML5 هو &lt;!DOCTYPE html&gt;، بيتكتب مرة واحدة في أول الصفحة قبل أي HTML tag، ومش case sensitive (L2, Document rules).`, `ناقص: الـ declaration لازم يسمّي نوع الـ document؛ في الـ HTML5 بيبقى &lt;!DOCTYPE html&gt;.`, `فيه اختيار صح فعلًا: &lt;!DOCTYPE html&gt; هو الـ declaration بتاع الـ HTML5، فـ "None" غلط.`],
    [`الـ &lt;img&gt; ده empty element؛ الـ file مكانه في الـ src، مش كـ content.`, `مفيش element اسمه &lt;image&gt; في الـ HTML؛ الـ element بتاع الصورة اسمه &lt;img&gt;، والـ path بيتحط في الـ src والـ alternate text في الـ alt.`, `صح. الـ src بيدّي الـ path والـ alt بيدّي الـ alternate text.`, `الـ href ده attribute الوجهة بتاع الـ link (&lt;a&gt;)؛ الـ path بتاع الصورة بيتحط في الـ src attribute: &lt;img src="image.gif"&gt;.`],
    [`صح. الـ relative URL مافيهوش الـ domain، فبيفضل جوه نفس الـ site.`, `الـ link لـ sites تانية محتاج absolute URL.`, `عشان تعمل link لصفحات في sites تانية محتاج absolute URL فيه الـ domain؛ الـ relative URL مافيهوش domain وبيفضل جوه نفس الـ site.`, `الـ relative URLs بتعمل link عادي، في الـ href والـ src؛ بس هي بتسيب الـ domain، فبتشاور على files جوه نفس الـ site.`],
    [`الـ paragraphs نوع واحد بس من المحتوى اللي بيظهر.`, `صح. الجزء اللي بيظهر بين &lt;body&gt; و&lt;/body&gt;.`, `الـ link (&lt;a&gt;) ده مجرد نوع واحد من المحتوى الظاهر جوه الـ body؛ الجزء الظاهر كله بيبقى بين &lt;body&gt; و &lt;/body&gt;.`, `الصورة (&lt;img&gt;) مجرد نوع واحد من المحتوى الظاهر جوه الـ body؛ الجزء الظاهر كله بيبقى بين &lt;body&gt; و &lt;/body&gt;.`],
    [`الـ HTML مش case sensitive: &lt;P&gt; هي هي &lt;p&gt;. الـ XHTML هو اللي بيطلب إن الـ tags تبقى lowercase.`, `مش لازم uppercase؛ الـ HTML tags ممكن تتكتب capital أو small، والـ W3C أصلًا بينصح بالـ lowercase.`, `صح. الـ &lt;P&gt; والـ &lt;p&gt; نفس المعنى في الـ HTML (L2).`, `الـ lowercase مُستحسن (recommended)، مش إجباري، في الـ HTML.`],
    [`الـ src بيدّي الـ path بتاع ملف الصورة اللي هتتعرض؛ ولو الصورة دي ماتعرضتش، النص اللي بيظهر مكانها جاي من الـ alt.`, `الـ longdesc كان بيشاور على صفحة فيها وصف طويل؛ مش هو الـ alternate text.`, `صح. الـ alt هو الـ attribute المطلوب للـ alternate text.`, `الـ title بيدّي معلومة زيادة بتظهر كـ tooltip لما الـ mouse يقف على الـ element؛ مش هو النص البديل للصورة اللي مش ظاهرة.`],
    [`الـ src للـ resources الـ embedded، مش لوجهة الـ links.`, `الـ alt ده الـ alternate text اللي بيظهر لما الصورة ماتتعرضش؛ المكان اللي الـ link بيفتح فيه بيتحدد بالـ target attribute.`, `الـ target="_self" هو الـ default وبيفتح الـ link في نفس الـ frame/tab؛ عشان window أو tab جديدة محتاج target="_blank".`, `صح. الـ target="_blank" بيفتح window/tab جديدة.`],
    [`من غير href الـ anchor مالوش وجهة، فالنص مش هيبقى link شغال؛ الـ URL لازم يتحط في الـ href.`, `الـ name بيعرّف اسم bookmark، مش وجهة.`, `صح. الـ link بيستخدم الـ &lt;a&gt; (anchor) tag، والـ href فيه الـ URL بتاع الوجهة، والنص اللي بين الـ tags (Google) هو اللي اليوزر بيدوس عليه (L2, Links).`, `مفيش attribute اسمه url على الـ &lt;a&gt;؛ وجهة الـ link بتتحط في الـ href attribute.`],
    [`الصور بتتضاف بالـ empty element &lt;img src="..."&gt;؛ الـ &lt;a&gt; كل اللي يقدر يعمله إنه يلف الصورة عشان يخليها link.`, `محاذاة النص بتتعمل بالـ CSS (text-align)، مش بالـ &lt;a&gt;؛ الـ anchor tag بيعمل hyperlinks.`, `الصوت بيتضاف بالـ &lt;audio&gt; element؛ الـ &lt;a&gt; ده الـ anchor tag بتاع الـ hyperlinks.`, `صح. الـ &lt;a&gt; هو الـ anchor (hyperlink) element.`],
    [`صح. الـ closing tag بيكرر الاسم بـ forward slash: &lt;/p&gt;.`, `الـ asterisk مش جزء من الـ syntax بتاع الـ HTML tags؛ الـ closing tag هو نفس الاسم مع forward slash، زي &lt;/b&gt;.`, `الـ &lt; بيبدأ أي tag، opening أو closing، فمش هو اللي بيميّز الـ end tag؛ الـ slash اللي في &lt;/p&gt; هي اللي بتميّزه.`, `الـ caret مش جزء من الـ syntax بتاع الـ HTML tags؛ الـ closing tag هو نفس الاسم مع forward slash، زي &lt;/p&gt;.`],
    [`"new" مش واحدة من الـ target keywords (_blank و _self و _parent و _top)؛ الـ tab أو الـ window الجديدة بتتفتح بـ target="_blank".`, `مفيش attribute اسمه new؛ المكان اللي الـ link بيفتح فيه بيتحكم فيه الـ target attribute، وقيمته _blank للـ tab الجديدة.`, `صح. الـ target="_blank" بيفتح الـ document المربوط في window أو tab جديدة؛ والـ default _self بيفتحه في نفس الـ frame (L2, Links).`],
    [`الـ &lt;head&gt; جواه الـ title بس هو نفسه مش الـ title.`, `صح. الـ &lt;title&gt;، اللي بيتحط جوه الـ &lt;head&gt;، بيحدد عنوان الـ document اللي بيظهر في الـ browser tab وفي الـ favorites والـ history والـ bookmarks (L2, Document rules).`, `الـ &lt;meta&gt; بيدّي metadata زي الـ character set أو description؛ إنما عنوان الـ document بيحدده الـ &lt;title&gt;.`],
    [`صح. &lt;!-- Write your comments here --&gt; (L2).`, `ده بالظبط الـ syntax بتاع الـ comment في الـ HTML: &lt;!-- Write your comments here --&gt;. والـ browsers مابتعرضش الـ comments.`],
    [`الـ &lt;head&gt; جوه الـ &lt;html&gt;، بعد الـ opening &lt;html&gt; tag؛ الـ document بيبدأ بالـ &lt;html&gt;.`, `صح. الـ document بيبدأ بـ &lt;html&gt; (الـ DOCTYPE ده declaration، مش tag).`, `الـ &lt;title&gt; جوه الـ &lt;head&gt;، واللي هو نفسه جوه الـ &lt;html&gt;، فمينفعش يبقى أول tag.`, `الـ &lt;body&gt; بييجي بعد الـ &lt;head&gt;، جوه الـ &lt;html&gt;؛ أول tag بعد الـ DOCTYPE هو الـ &lt;html&gt;.`],
    [`الـ &lt;picture&gt; ده wrapper للـ responsive sources؛ الـ image tag الأساسي هو img.`, `صح. الـ empty element &lt;img&gt; هو اللي بيعرض الصورة، والـ path بتاع الملف في الـ src والـ alternate text في الـ alt (L2, Attributes).`, `مفيش tag اسمه &lt;image&gt; في الـ HTML؛ الصور بتتعرض بـ &lt;img src="..."&gt;.`, `الـ src ده attribute بتاع الـ &lt;img&gt; وفيه الـ path بتاع الصورة، مش tag؛ الـ tag هو &lt;img&gt;.`],
    [`الـ &lt;meta&gt; tags دي metadata ومكانها في الـ head، يعني موجودة فيه فعلًا؛ والسؤال بيسأل على اللي مش موجود.`, `صح. الـ table محتوى ظاهر ومكانه في الـ body.`, `الـ &lt;title&gt; مكانه في الـ head (بيسمّي الصفحة في الـ browser tab)، فهو موجود هناك.`, `غلط، لأن الـ &lt;table&gt; محتوى ظاهر مكانه في الـ body، يعني فيه اختيار فعلًا مش موجود في الـ head.`],
    [`&lt;/ ... &gt; ده شكل الـ closing tag، مش comment؛ الـ comments بتبدأ بـ &lt;! (وبالكامل &lt;!-- ... --&gt;).`, `صح (ده اختصار Sanfoundry لـ &lt;!-- ... --&gt;).`, `&lt;/ ... /&gt; مش syntax valid لأي حاجة في الـ HTML؛ الـ comments بتبدأ بـ &lt;! (وبالكامل &lt;!-- ... --&gt;).`, `علامة التعجب بتيجي على طول بعد الـ &lt; في الأول، مش قبل الـ &gt; اللي في الآخر؛ الـ comments شكلها &lt;!-- ... --&gt;.`],
    [`البداية محتاجة شَرطتين (two dashes): الـ comment بيبدأ بـ &lt;!-- وبيخلص بـ --&gt;.`, `&lt;! ... !&gt; مش الـ syntax بتاع الـ comment في الـ HTML؛ الـ comment بيتكتب &lt;!-- comment --&gt;.`, `صح. (الاختيار كان مش واضح في الصورة؛ بس ده المقصود.)`, `المسافة بتبوّظ الـ syntax: لازم الـ -- تيجي على طول بعد الـ &lt;!، زي &lt;!-- comment --&gt;.`],
    [`.hl مش extension بتاع HTML؛ صفحات الـ HTML بتتحفظ بـ .htm أو .html.`, `.h ده extension الـ header files بتاعة C/C++؛ صفحات الـ HTML بتتحفظ بـ .htm أو .html.`, `.htl مش extension valid؛ صفحات الـ HTML بتتحفظ بـ .htm أو .html.`, `صح. صفحات الـ HTML بتنتهي بـ .htm أو .html، وممكن تتكتب في text editor بسيط زي Notepad أو TextEdit (L2, What is HTML?).`],
    [`صح. الـ Metadata (title، meta، link، style) مكانها في &lt;head&gt;.`, `الـ title حتة واحدة من الـ metadata جوه الـ head.`, `الـ &lt;html&gt; بيلف الـ document كله، الـ head والـ body؛ الـ metadata مكانها بالتحديد في الـ &lt;head&gt;.`, `الـ body فيه المحتوى الظاهر للصفحة؛ الـ metadata (title و meta و link و style) مكانها في الـ head.`],
    [`Rasmus Lerdorf هو اللي عمل الـ PHP، الـ server-side language بتاعة L10؛ الـ HTML عملها Tim Berners-Lee.`, `صح. Tim Berners-Lee هو اللي اخترع الـ World Wide Web والـ HTML، الـ markup language بتاعته (Sheet 1).`, `Brendan Eich هو اللي عمل الـ JavaScript، الـ client-side scripting language؛ الـ HTML عملها Tim Berners-Lee.`, `Sergey Brin من مؤسسين Google، اللي هو search engine؛ الـ HTML عملها Tim Berners-Lee.`],
    [`الـ SGMT مش لغة حقيقية؛ الـ HTML اتعرّفت كـ application من الـ SGML (Standard Generalized Markup Language).`, `صح. الـ HTML اتعرّفت كـ application من الـ SGML (Standard Generalized Markup Language).`, `الـ SGME مش لغة حقيقية؛ الـ HTML اتعرّفت كـ application من الـ SGML (Standard Generalized Markup Language).`, `الـ XHTML جت بعد الـ HTML، وهي HTML اتكتبت تاني بقواعد الـ XML، فمينفعش الـ HTML تبقى subset منها؛ الـ HTML جاية من الـ SGML.`],
    [`الـ link ده فيه النص "Home Page" بس، فالنص هو اللي بيتداس عليه ومفيش صورة؛ لازم الـ &lt;img&gt; تبقى جوه الـ &lt;a&gt;.`, `الـ &lt;img&gt; ده empty element مالوش end tag، فمينفعش يلف link جواه؛ الـ &lt;a&gt; هو اللي لازم يلف الـ &lt;img&gt;.`, `الصورة متحطوطة بعد الـ closing &lt;/a&gt;، يعني برا الـ link، فالنص بس هو اللي بيتداس عليه.`, `صح. لما تحط الصورة جوه &lt;a&gt; بتعمل image hyperlink.`],
    [`صح. من غير slash في الأول يبقى relative للصفحة الحالية.`, `الـ ../ بتطلع folder لفوق، للـ parent بتاع الـ folder الحالي؛ الملف اللي في نفس الـ folder بيبقى src="pic.jpg" بس.`, `images/pic.jpg بيشاور على subfolder اسمه images جوه الـ folder الحالي، مش الـ folder الحالي نفسه.`, `الـ slash اللي في الأول بتخلي الـ path relative للـ domain root، فده بيحمّل /images/pic.jpg من الـ root، مش من الـ folder الحالي.`],
    [`الأحمر هو اللون الـ standard للـ active link (وهو بيتداس عليه)؛ الـ unvisited links لونها أزرق.`, `صح. الـ links اللي ماتزارتش لونها أزرق (design issue الـ colors في L1).`, `البنفسجي (purple/violet) هو اللون الـ standard للـ visited link؛ الـ unvisited link لونه أزرق.`, `الأخضر مش من ألوان الـ links الـ standard (أزرق، بنفسجي، أحمر)؛ الـ unvisited links لونها أزرق.`],
    [`الـ _blank قيمة valid للـ target: بتفتح الـ link في window أو tab جديدة.`, `الـ _top قيمة valid للـ target: بتفتح الـ link في الـ full body بتاع الـ window، ومكان كل الـ frames.`, `الـ _self قيمة valid للـ target، وهي الـ default: بتفتح الـ link في نفس الـ frame.`, `صح. قيم الـ target اللي في المحاضرة هي _blank و _self و _parent و _top؛ والـ _empty مش منهم (L2, Links).`]
  ],
  extra: [
    [`لازم تقفل أقرب tag (الجوّاني) الأول.`, `صح. في الـ nested tags بتقفل الأقرب الأول: الـ &lt;i&gt; اتفتح آخر واحد، فالـ &lt;/i&gt; ييجي قبل الـ &lt;/b&gt; (L2, Nested tags).`, `الـ tags الاتنين اتفتحوا مرتين ومااتقفلوش أبدًا بـ &lt;/i&gt; و &lt;/b&gt;؛ والمحاضرة بتقول ماتسيبش الـ end tags أبدًا.`, `ده بيبدأ بـ closing tag &lt;/b&gt; قبل ما أي &lt;b&gt; يتفتح؛ الـ tags لازم تتفتح الأول، وبعدين تتقفل من الجوّاني للبرّاني.`],
    [`الـ "ar" ده كود العربي، مش الإنجليزي (en)؛ أول حرفين بيدّوا اللغة وآخر حرفين البلد.`, `صح. أول حرفين = اللغة، وآخر حرفين = البلد.`, `الترتيب لغة وبعدين بلد: "ar" هي اللغة (Arabic) و "EG" هي البلد (Egypt)، مش العكس.`, `الـ lang بيعلن لغة الصفحة عشان يساعد الـ search engines والـ browsers؛ مابيختارش font (ده شغل الـ CSS font-family).`],
    [`ده كان هيحصل لو مفيش slash في الأول.`, `الـ slash اللي في الأول بتحافظ على نفس الـ domain (site.com) وبتبدأ من الـ root بتاعه؛ عمرها ما بتشيل الـ domain من العنوان.`, `صح. الـ slash في الأول بيخلي الـ path relative للـ domain root.`, `/images/a.png مافيهوش domain، فهو relative URL جوه نفس الـ site؛ الصورة الخارجية كانت هتحتاج absolute URL.`],
    [`الـ &lt;p&gt; ليه content وليه end tag &lt;/p&gt;؛ والمحاضرة بتحذّر إنك تسيبه حتى لو الـ browsers بتعدّيها.`, `الـ &lt;title&gt; ليه content (عنوان الصفحة) وليه end tag &lt;/title&gt;، فهو مش empty element.`, `الـ &lt;a&gt; ليه content (النص أو الصورة اللي بتتداس) وليه end tag &lt;/a&gt;، فهو مش empty element.`, `صح. زي &lt;br&gt; و&lt;img&gt;، مالوش content ومالوش end tag.`],
    [`صح. الـ attributes بتدّي معلومات زيادة، وبتيجي على شكل name="value"، ودايمًا بتتكتب في الـ start tag، زي &lt;a href="..."&gt; (L2, Attributes).`, `الـ end tags عمرها ما بتاخد attributes؛ الـ attributes زي href و src دايمًا بتتحط في الـ start tag.`, `اللي بين الـ tags ده الـ content بتاع الـ element؛ الـ attributes بتتكتب name="value" جوه الـ start tag.`, `كل الـ HTML elements ممكن يبقى ليها attributes، ومنها body elements زي &lt;img&gt; و &lt;a&gt;، مش head elements بس.`],
    [`الـ &lt;title&gt; ده metadata ومكانه في الـ head؛ بيظهر في الـ browser tab، مش في الـ body بتاع الصفحة.`, `الـ &lt;meta charset="UTF-8"&gt; ده metadata عن الصفحة ومكانه في الـ head.`, `صح. الـ &lt;h1&gt; ده heading، يعني محتوى ظاهر، فمكانه بين &lt;body&gt; و &lt;/body&gt;؛ والـ head فيه metadata بس (L2, Document rules).`, `الـ &lt;link rel="stylesheet"&gt; بيربط ملف CSS خارجي ومكانه في الـ head.`],
    [`الـ title attribute مابيغيّرش المحتوى بتاع الـ element؛ "Text" بيفضل زي ما هو و "Hi there" بيظهر كـ tooltip.`, `صح. الـ title بيدّي معلومات زيادة بتظهر كـ tooltip.`, `عنوان الـ browser tab جاي من الـ &lt;title&gt; element اللي في الـ head، مش من الـ title attribute بتاع paragraph.`, `الـ title valid على كل الـ elements، ومنها الـ &lt;p&gt;؛ وبيعرض قيمته كـ tooltip لما الـ mouse يقف عليه.`],
    [`دي عبارة صح: الـ DOCTYPE لازم يظهر مرة واحدة بس. والسؤال بيسأل على العبارة الغلط.`, `دي عبارة صح: الـ DOCTYPE بييجي في أول الصفحة خالص، قبل أي HTML tags. والسؤال بيسأل على العبارة الغلط.`, `دي عبارة صح: &lt;!DOCTYPE html&gt; مش case sensitive. والسؤال بيسأل على العبارة الغلط.`, `صح. دي العبارة الغلط: الـ DOCTYPE ده declaration بيساعد الـ browsers تعرض الصفحة؛ مش element ومابيظهرش.`],
    [`صح. المحاضرة بتقول إن الـ title بيحدد ترتيب الصفحة في بعض الـ search engines، وبيظهر في قوايم الـ Favorites والـ History والـ Bookmark (L2, &lt;title&gt;).`, `الـ font بتاع الصفحة بيتظبط بالـ CSS (font-family)، مش بالـ &lt;title&gt; element.`, `الـ title بيظهر في الـ browser tab، مش جوه الصفحة؛ أكبر heading في الصفحة هو الـ &lt;h1&gt;.`, `الصور بتتحمّل من الـ src attribute بتاعها سواء فيه title أو لأ؛ الـ title مهم للـ search ranking والـ bookmarks.`],
    [`الـ browser مابيسيبش المكان فاضي: لما الصورة ماتتعرضش، بيعرض الـ alt text مكانها.`, `صح. ده بالظبط هدف الـ alt attribute المطلوب.`, `الـ tooltip جاي من الـ title attribute؛ إنما الـ alt text بيتعرض مكان الصورة اللي مش ظاهرة.`, `الـ src الغلط بيتعامل معاه الـ browser، وبيعرض الـ alt text "Logo"؛ مفيش server error page بتيجي مكان الصورة.`]
  ]
};


AR.web.lectures["3"] = {
  notes: [
    { h: `الـ quotes، والـ horizontal rules، والـ line breaks`, pts: [
      `الـ double quotes حوالين قيمة الـ attribute هي الأشهر، بس الـ single quotes بتشتغل برضه. لو القيمة نفسها فيها double quotes، استخدم single quotes: <code>&lt;p title='John "ShotGun" Nelson'&gt;</code> (أو العكس: <code>title="John 'ShotGun' Nelson"</code>).`,
      `الـ <code>&lt;hr&gt;</code> بيعرّف <b>thematic break</b>، وغالبًا بيظهر كـ <b>horizontal rule</b> (خط أفقي)، عشان يفصل المحتوى (أو يوضّح إن الموضوع اتغير). وهو empty element.`,
      `الـ <code>&lt;br&gt;</code> بيعمل <b>line break</b> (سطر جديد من غير ما تبدأ paragraph جديدة). ده <b>empty tag</b> ملوش end tag: <code>&lt;p&gt;This is&lt;br&gt;a paragraph&lt;br&gt;with line breaks.&lt;/p&gt;</code>.`
    ] },
    { h: `مشكلة الـ poem والـ &lt;pre&gt;`, pts: [
      `الـ browser بيلمّ المسافات الزيادة والـ line breaks اللي جوه الـ <code>&lt;p&gt;</code>، فلو كتبت قصيدة على كذا سطر هتظهر في سطر واحد (دي "the poem problem").`,
      `<b>الحل</b>: الـ <code>&lt;pre&gt;</code> بيعرّف <b>preformatted text</b>، بيتعرض بـ <b>fixed-width font (غالبًا Courier)</b>، و<b>بيحافظ على المسافات والـ line breaks الاتنين</b> زي ما كتبتهم بالظبط.`
    ] },
    { h: `الـ style attribute وأساسيات الـ CSS properties`, pts: [
      `الـ syntax: <code>&lt;tagname style="property:value;"&gt;</code>. الـ property دي CSS property والـ value دي CSS value.`,
      `<b>background-color</b>: لون خلفية الـ element، مثلًا <code>&lt;body style="background-color:powderblue;"&gt;</code>.`,
      `<b>color</b>: لون الكلام (النص)، مثلًا <code>&lt;h1 style="color:blue;"&gt;</code>.`,
      `<b>font-family</b>: نوع الخط، مثلًا <code>style="font-family:verdana;"</code>، <code>courier</code>.`,
      `<b>font-size</b>: حجم الكلام، مثلًا <code>style="font-size:300%;"</code> أو <code>50px</code>.`,
      `<b>text-align</b>: المحاذاة الأفقية، مثلًا <code>style="text-align:center;"</code>.`,
      `<b>border</b>: مثلًا <code>style="border:2px solid Tomato;"</code> بيحدد عرض الـ border ونوعه ولونه.`
    ] },
    { h: `الـ text formatting elements` },
    { h: `الـ Comments`, pts: [
      `الـ HTML comments مش بتظهر في الصفحة، بس بتوثّق الـ source code: <code>&lt;!-- Write your comments here --&gt;</code>.`,
      `احفظ شكل الـ comment في كل لغة: الـ HTML <code>&lt;!-- --&gt;</code>؛ الـ CSS <code>/* */</code>؛ الـ JavaScript <code>//</code> و<code>/* */</code>؛ الـ PHP <code>#</code>، <code>//</code>، <code>/* */</code>.`
    ] },
    { h: `الـ Colors`, pts: [
      `الألوان بتتحدد بـ <b>أسماء ألوان جاهزة (predefined color names)</b>، أو بقيم <b>RGB, HEX, HSL, RGBA أو HSLA</b>. الـ HTML بيدعم <b>140 اسم لون standard</b> (Tomato, DodgerBlue, MediumSeaGreen, Violet, powderblue...).`,
      `تقدر تطبّق الألوان على الـ <b>background</b> (background-color)، والـ <b>text</b> (color)، والـ <b>borders</b> (border:2px solid Violet).`,
      `لون "Tomato" مكتوب بـ 5 طرق: <code>rgb(255, 99, 71)</code>، <code>#ff6347</code>، <code>hsl(9, 100%, 64%)</code>؛ ولو عايزه شفاف 50%: <code>rgba(255, 99, 71, 0.5)</code>، <code>hsla(9, 100%, 64%, 0.5)</code>. آخر قيمة (الـ alpha) هي الـ opacity من 0 لـ 1.`,
      `الـ <b>Shades of gray</b> (درجات الرمادي) بتستخدم <b>نفس القيمة</b> للتلات parameters بتوع الـ RGB، مثلًا <code>rgb(60,60,60)</code> ... <code>rgb(240,240,240)</code>. يعني "Gray with level 200" = <code>rgb(200, 200, 200)</code>.`
    ] },
    { h: `مثال: الـ inline styles` }
  ],
  cards: [
    `Thematic break، بيظهر كـ horizontal rule (خط أفقي).`,
    `Line break (سطر جديد)؛ empty tag ملوش end tag.`,
    `Preformatted text: خط fixed-width، وبيحافظ على المسافات والـ line breaks.`,
    `الشكل: &lt;tagname style="property:value;"&gt;`,
    `الـ color.`,
    `الـ background-color.`,
    `الـ font-family.`,
    `الـ font-size.`,
    `الـ text-align.`,
    `الـ &lt;strong&gt;.`,
    `الـ &lt;em&gt;.`,
    `الـ &lt;mark&gt;.`,
    `الـ &lt;del&gt; (عليه خط في النص، strike-through) / الـ &lt;ins&gt; (تحته خط، underlined).`,
    `الـ &lt;sup&gt; (superscript، فوق السطر).`,
    `الـ &lt;sub&gt; (subscript، تحت السطر).`,
    `140 اسم لون.`,
    `الأسماء، RGB، HEX، HSL، RGBA، HSLA.`,
    `الـ HEX بتاعه #ff6347 = rgb(255, 99, 71).`,
    `قيم R وG وB متساوية، مثلًا rgb(200,200,200).`
  ],
  qa: [
    `الـ &lt;b&gt; بولد، الـ &lt;strong&gt; كلام مهم (important)، الـ &lt;i&gt; italic، الـ &lt;em&gt; كلام عليه تأكيد (emphasized)، الـ &lt;mark&gt; متعلّم/highlighted، الـ &lt;small&gt; كلام أصغر، الـ &lt;del&gt; كلام اتمسح (عليه خط، strike-through)، الـ &lt;ins&gt; كلام اتضاف (تحته خط)، الـ &lt;sub&gt; subscript (نص حرف تحت السطر، زي H<sub>2</sub>O)، الـ &lt;sup&gt; superscript (نص حرف فوق السطر، زي الأُسس والـ footnotes)، والـ &lt;u&gt; underline.`,
    `جوه الـ &lt;p&gt; الـ browser بيلمّ المسافات الزيادة والـ line breaks، فالقصيدة اللي مكتوبة على أربع سطور بتظهر في سطر واحد. الحل هو الـ &lt;pre&gt; element (preformatted text)، اللي بيستخدم fixed-width font (غالبًا Courier) وبيحافظ على المسافات والـ line breaks الاتنين. أو كحل تاني تستخدم &lt;br&gt; عند كل سطر جديد.`,
    `الـ style attribute بيحدد الـ style بتاع element واحد: <code>&lt;tagname style="property:value;"&gt;</code>، والـ property دي CSS property والـ value دي CSS value. أشهر الـ properties: <b>background-color</b> (<code>&lt;body style="background-color:powderblue;"&gt;</code>)، و<b>color</b> للون الكلام (<code>&lt;h1 style="color:blue;"&gt;</code>)، و<b>font-family</b> (<code>style="font-family:verdana;"</code>)، و<b>font-size</b> (<code>style="font-size:300%;"</code>)، و<b>text-align</b> (<code>style="text-align:center;"</code>)، و<b>border</b> (<code>style="border:2px solid Tomato;"</code>). ولو عندك كذا property بتفصل بينهم بـ semicolons.`,
    `بالـ <b>اسم</b> (140 اسم standard، زي Tomato)؛ <b>RGB</b> rgb(255, 99, 71)؛ <b>HEX</b> #ff6347؛ <b>HSL</b> hsl(9, 100%, 64%)؛ والنسخ الشفافة <b>RGBA</b> rgba(255, 99, 71, 0.5) و<b>HSLA</b> hsla(9, 100%, 64%, 0.5) وآخر قيمة فيهم هي الـ alpha (الـ opacity). درجات الرمادي بتستخدم قيم RGB متساوية، مثلًا rgb(200,200,200). والألوان بتتطبق على الـ background-color، والـ color (النص)، والـ border.`
  ],
  quiz: [
    [`الـ &lt;i&gt; بيعرض الكلام italic وبس، من غير أي معنى زيادة؛ الكلام المهم بيتعرّف بالـ &lt;strong&gt;.`, `صح. في list الـ text formatting، الـ &lt;strong&gt; معناه important text؛ بيظهر bold بس كمان شايل معنى إن الكلام مهم (semantic) (L3, Text formatting).`, `الـ &lt;b&gt; بيخلي الكلام bold للشكل بس، من غير ما يقول إنه مهم؛ الكلام المهم هو الـ &lt;strong&gt;.`, `مفيش element اسمه &lt;important&gt; في الـ HTML أصلًا؛ الكلام المهم بنعلّمه بالـ &lt;strong&gt;.`],
    [`الـ &lt;p&gt; بيعرّف paragraph؛ الأس (power/exponent) بيطلع فوق السطر بالـ &lt;sup&gt;، زي x&lt;sup&gt;2&lt;/sup&gt;.`, `الـ &lt;sub&gt; ده subscript (تحت السطر)، بيستخدم في H<sub>2</sub>O.`, `صح. الـ superscript بيظهر نص حرف فوق السطر، وده شكل الأُس (power).`, `غلط، عشان الـ &lt;sup&gt; (superscript) موجود في الاختيارات وهو بالظبط الـ tag بتاع الأسس زي x<sup>2</sup>.`],
    [`صح. الـ CSS property اللي اسمها background-color بتحدد خلفية الـ element، زي &lt;body style="background-color:powderblue;"&gt; (L3, Style attribute).`, `الـ color property بتغيّر لون الكلام نفسه (الـ foreground)، زي color:blue؛ أما الخلفية فبتاعتها background-color.`, `الـ bgcolor ده HTML attribute قديم (obsolete)، مش CSS property.`, `غلط، عشان background-color موجودة في الاختيارات وهي الـ CSS property اللي بتغيّر لون الخلفية.`],
    [`صح. بيستخدم الـ style attribute مع الـ background-color.`, `مفيش element اسمه &lt;background&gt; في الـ HTML؛ الخلفية بتتظبط بالـ style attribute مع background-color.`, `الـ bg مش HTML attribute؛ الخلفية بتتحط بـ style="background-color:yellow;".`, `غلط، عشان &lt;body style="background-color:yellow;"&gt; موجود في الاختيارات وهو الطريقة الصح.`],
    [`صح. الـ font-family بيختار الخط بتاع الـ element، زي style="font-family:verdana;" أو courier (L3, Style attribute).`, `الـ font-weight بيحدد الكلام تخين قد إيه (normal، bold)؛ مش بيغيّر نوع الخط، ده شغل الـ font-family.`, `الـ font-style بيحدد الكلام normal ولا italic ولا oblique؛ نوع الخط نفسه بيتختار بالـ font-family.`, `الـ font-property مش CSS property أصلًا؛ خط الـ element بيتحدد بالـ font-family.`],
    [`الـ RGB values طريقة صح، بس كمان الـ HEX والـ RGBA (والأسماء والـ HSL والـ HSLA) شغالين، فالإجابة الكاملة "All of the above".`, `الـ HEX values زي #ff6347 طريقة صح، بس الـ RGB والـ RGBA كمان شغالين، فالإجابة الكاملة "All of the above".`, `الـ RGBA values طريقة صح، بس الـ RGB والـ HEX كمان شغالين، فالإجابة الكاملة "All of the above".`, `صح. الأسماء والـ RGB والـ HEX والـ HSL والـ RGBA والـ HSLA كلهم شغالين (L3).`],
    [`مفيش element اسمه &lt;italic&gt;؛ الكلام الـ italic هو &lt;i&gt;، والـ emphasized text هو &lt;em&gt;.`, `الـ &lt;i&gt; بيعرض الكلام italic للشكل بس؛ الـ emphasized text اللي شايل معنى التأكيد (semantic emphasis) هو &lt;em&gt;.`, `صح. الـ &lt;em&gt; بيعرّف emphasized text؛ بيظهر italic وكمان شايل معنى التأكيد، عكس الـ &lt;i&gt; (L3, Text formatting).`],
    [`مفيش element اسمه &lt;break&gt; في الـ HTML؛ الـ line break هو الـ empty element &lt;br&gt;.`, `مفيش element اسمه &lt;lb&gt; في الـ HTML؛ الـ line break هو الـ empty element &lt;br&gt;.`, `صح. الـ &lt;br&gt; بيعمل line break (سطر جديد من غير paragraph جديد)؛ وهو empty tag ملوش end tag (L3, Line breaks).`],
    [`صح. صورة الخلفية بتتحط بالـ CSS property اللي اسمها background-image مع url()، وهنا عن طريق الـ style attribute بتاع الـ body (Lab 4, CSS backgrounds).`, `مفيش element اسمه &lt;background&gt; في الـ HTML؛ صورة الخلفية دي CSS property: background-image:url(...).`, `الـ bg مش attribute valid؛ صورة الخلفية بتتحط بـ style="background-image:url(background.gif)".`],
    [`الصورة مش بتتمط by default؛ لو عايز تمطّها محتاج الـ background-size property.`, `مفيش مكان بيفضل فاضي، عشان by default صورة الخلفية بتتكرر أفقي ورأسي لحد ما تملا الـ element.`, `صح. الـ default إن الصورة بتتكرر لحد ما تغطي الـ element (background-repeat).`, `غلط، عشان "It will be repeated" موجودة في الاختيارات وهي الـ default behavior (background-repeat: repeat).`],
    [`الـ &lt;u&gt; بيحط خط تحت الكلام (underline)، مش highlight؛ الكلام الـ highlighted (marked) هو &lt;mark&gt;.`, `صح. الـ &lt;mark&gt; بيعرّف marked أو highlighted text، زي Do not forget to buy &lt;mark&gt;milk&lt;/mark&gt; (L3, Text formatting).`, `مفيش element اسمه &lt;highlight&gt; في الـ HTML؛ الكلام الـ highlighted بيستخدم &lt;mark&gt;.`, `الـ &lt;b&gt; بيخلي الكلام bold، مش highlighted؛ الـ highlight بيبقى بالـ &lt;mark&gt;.`],
    [`الـ &lt;u&gt; بيحط خط تحت الكلام بدل ما يخليه bold؛ الكلام الـ bold هو &lt;b&gt;.`, `صح. الـ &lt;b&gt; بيعرض المحتوى بتاعه bold للشكل بس (الـ &lt;strong&gt; كمان bold بس معناه إن الكلام مهم) (L3, Text formatting).`, `الـ &lt;br&gt; ده empty element للـ line break ملوش end tag، فمينفعش يلف حوالين محتوى ولا يخليه bold.`, `الـ &lt;i&gt; بيعرض المحتوى italic مش bold؛ الكلام الـ bold هو &lt;b&gt;.`],
    [`صح. الـ &lt;del&gt; بيعرّف deleted text، والـ browsers بتحط خط في نصّه (strike-through)، زي &lt;del&gt;blue&lt;/del&gt; (L3, Text formatting).`, `الـ &lt;em&gt; بيعرّف emphasized text وبيظهر italic؛ الكلام المحذوف هو &lt;del&gt;.`, `الـ &lt;strong&gt; بيعرّف important text وبيظهر bold؛ الكلام المحذوف هو &lt;del&gt;.`, `الـ &lt;ins&gt; بالعكس: ده الكلام اللي اتضاف (inserted)، وغالبًا تحته خط. الكلام المحذوف هو &lt;del&gt;.`],
    [`الكلام الـ italic بيتعمل بالـ &lt;i&gt; أو &lt;em&gt;؛ الـ &lt;hr&gt; بيرسم horizontal rule كـ thematic break.`, `الخط اللي الـ &lt;hr&gt; بيرسمه أفقي (horizontal) مش رأسي؛ وهو thematic break بيفصل بين المحتوى.`, `الـ line break (سطر جديد) هو &lt;br&gt;؛ الـ &lt;hr&gt; بيرسم horizontal rule بين الـ sections.`, `صح. thematic break بيظهر كـ horizontal rule.`],
    [`الـ &lt;ul&gt; بيبدأ unordered list (bullets)؛ الـ 2 في H<sub>2</sub>O محتاجة subscript، يعني &lt;sub&gt;.`, `الـ &lt;br/&gt; بيبدأ سطر جديد وبس؛ الـ 2 في H<sub>2</sub>O لازم تنزل تحت السطر بالـ &lt;sub&gt;.`, `صح. الـ subscript text بيظهر نص حرف تحت السطر، زي H&lt;sub&gt;2&lt;/sub&gt;O عشان تطلع H<sub>2</sub>O (L3, Text formatting).`, `الـ &lt;sup&gt; بيطلّع الكلام فوق السطر، وده للأسس زي x<sup>2</sup>؛ الـ 2 في المية بتنزل تحت، بالـ &lt;sub&gt;.`],
    [`الـ &lt;p&gt; بيعرّف paragraph ومش بيحط أي خط تحت الكلام؛ الـ underline هو &lt;u&gt;.`, `صح. الـ &lt;u&gt; بيحط خط تحت الكلام؛ وهو مذكور مع الـ &lt;b&gt; والـ &lt;i&gt; والـ &lt;p&gt; والـ &lt;br&gt; (L3, Text formatting).`, `الـ &lt;i&gt; بيخلي الكلام italic مش underlined؛ الـ underline هو &lt;u&gt;.`, `الـ &lt;ul&gt; ده unordered list، مش underline (الحروف بس شبه بعض)؛ الـ underline هو &lt;u&gt;.`],
    [`الـ &lt;blockquote&gt; بيعرّف block متقتبس (quotation)، وغالبًا بيبقى indented، مش bold؛ الـ element اللي شكله زي &lt;b&gt; هو &lt;strong&gt;.`, `صح. هو كمان بيظهر بولد (ومعاه معنى الأهمية).`, `الـ &lt;em&gt; بيظهر italic، فهو شغال زي &lt;i&gt; مش زي &lt;b&gt;.`, `الـ &lt;i&gt; بيظهر italic مش bold، فمش شغال زي &lt;b&gt;.`],
    [`الـ &lt;p&gt; بيلمّ المسافات الزيادة والـ line breaks (مشكلة القصيدة، the poem problem)، فمش بيحافظ على الـ preformatted text.`, `صح. fixed-width font وبيحافظ على المسافات والـ line breaks.`, `الـ &lt;hr&gt; بيرسم horizontal rule (thematic break)؛ الـ preformatted text هو &lt;pre&gt;.`, `الـ &lt;ins&gt; بيعلّم الكلام اللي اتضاف (inserted)، وغالبًا تحته خط؛ الـ preformatted text هو &lt;pre&gt;.`],
    [`صح. الـ &lt;hr&gt; بيعرّف thematic break (تغيير في المحتوى)، وغالبًا بيظهر كـ horizontal rule (L3, Horizontal rules).`, `الـ &lt;h1&gt; ده أكبر heading، عنوان للمحتوى مش thematic break؛ اللي بيعمل كده هو &lt;hr&gt;.`, `الـ &lt;head&gt; ده الـ container بتاع الـ metadata ومش بيظهر في الصفحة، فمينفعش يعلّم تغيير في المحتوى.`, `الـ &lt;p&gt; بيعرّف paragraph من المحتوى؛ التغيير في الموضوع بين المحتوى بيتعلّم بالـ &lt;hr&gt;.`],
    [`الـ &lt;b&gt; بيخلي الكلام bold ومش بيبدأ سطر جديد؛ الـ line break هو &lt;br&gt;.`, `صح. الـ &lt;br&gt; هو الـ empty tag بتاع الـ line break: بيبدأ سطر جديد من غير ما يبدأ paragraph جديد (L3, Line breaks).`, `الـ &lt;em&gt; بيعمل emphasis للكلام بالـ italic ومش بيبدأ سطر جديد؛ الـ line break هو &lt;br&gt;.`, `الـ &lt;a&gt; بيعمل hyperlink ومش بيبدأ سطر جديد؛ الـ line break هو &lt;br&gt;.`],
    [`صح. القيمة الرابعة هي الـ alpha (الـ opacity) من 0 لـ 1، و0.5 يعني شفاف 50%.`, `القيمة الرابعة دي الـ alpha (الـ opacity)، فالـ 0.5 بتخلي الـ Tomato شفاف 50%؛ مش بتغمّق اللون.`, `الرمادي محتاج قيم R وG وB متساوية، زي rgb(60,60,60)؛ لكن 255 و99 و71 مش متساويين وبيدّوا Tomato.`, `الـ rgba() ده CSS valid: تلات قيم RGB زائد alpha من 0 لـ 1، زي الـ Tomato اللي شفاف 50% في المحاضرة.`]
  ],
  extra: [
    [`الكلام بـ fixed-width font وبيحافظ على الـ line breaks ده شغل الـ &lt;pre&gt;؛ جوه الـ &lt;p&gt; الـ line breaks بتتلم.`, `صح. الـ browsers بتلمّ المسافات الزيادة والـ line breaks جوه الـ &lt;p&gt;، فالقصيدة بتظهر في سطر واحد: دي "the poem problem"، وحلها الـ &lt;pre&gt; (L3).`, `الكلام بيظهر عادي، بس مش بالشكل اللي اتكتب بيه: الـ browser بيلمّ الـ line breaks في سطر واحد.`, `الـ &lt;p&gt; مش بيحافظ على الـ line breaks ومش بيخلي الكلام bold؛ القصيدة بتظهر في سطر واحد بكلام عادي.`],
    [`صح. الـ del = كلام اتمسح، والـ ins = كلام اتضاف.`, `الـ bold بييجي من &lt;b&gt;/&lt;strong&gt; والـ italic من &lt;i&gt;/&lt;em&gt;؛ أما الـ &lt;del&gt; فبيحط خط في نص الكلام والـ &lt;ins&gt; بيحط خط تحته.`, `الـ highlight ده &lt;mark&gt; والكلام الأصغر ده &lt;small&gt;؛ الـ &lt;del&gt; بيحط خط في نص الكلام والـ &lt;ins&gt; بيحط خط تحته.`, `ولا واحد فيهم بيخفي الكلام: الـ deleted text بيظهر وعليه خط في نصّه، والـ inserted text بيظهر وتحته خط.`],
    [`التلات قيم مش متساويين (الأحمر أعلى)، فده لون غامق مايل للأحمر، مش رمادي.`, `Red 0 وgreen 0 وblue 255 ده أزرق صافي؛ الرمادي محتاج التلات قيم متساويين.`, `الـ rgb(255, 99, 71) ده Tomato من المحاضرة؛ قيمه مش متساوية، فمش رمادي.`, `صح. درجات الرمادي بتستخدم قيم متساوية للتلات RGB parameters، فالـ rgb(120, 120, 120) رمادي متوسط (L3, Colors).`],
    [`الـ Hue هو أول قيمة (9، hue مايل للأحمر على الـ color wheel)؛ الـ 0.2 هي القيمة الرابعة، الـ alpha.`, `الـ Lightness هي التالتة (64%)؛ الـ 0.2 هي القيمة الرابعة، الـ alpha، اللي بتتحكم في الـ opacity.`, `صح. الـ alpha من 0 (شفاف خالص) لـ 1، فـ 0.2 يعني شفاف أغلبه.`, `الـ Font size دي CSS property لوحدها (font-size)، مش جزء من قيمة اللون؛ الـ 0.2 هي الـ alpha channel.`],
    [`الـ CSS جوه الـ style بيتكتب property:value بـ colon، والـ declarations بتتفصل بـ semicolons، مش بـ = وفواصل.`, `صح. أزواج property:value بينهم semicolons.`, `الأقواس المعقوفة (braces) بتاعة الـ style sheets، مش الـ attribute.`, `أسماء الـ properties ناقصة؛ كل declaration لازم تبقى property:value، زي color:red; font-size:20px;.`],
    [`الـ &lt;strong&gt; بيعلّم الكلام المهم بالـ bold، من غير highlight أصفر؛ الـ highlight هو &lt;mark&gt;.`, `الـ &lt;em&gt; بيعلّم الكلام اللي عليه تأكيد بالـ italic، من غير highlight؛ الـ highlight هو &lt;mark&gt;.`, `صح. الـ &lt;mark&gt; بيعرّف marked/highlighted text، وبيظهر بخلفية صفرا by default (L3, Text formatting).`, `الـ &lt;small&gt; بيصغّر الكلام ومش بيعمله highlight؛ الـ highlight هو &lt;mark&gt;.`],
    [`الـ &lt;b&gt; والـ &lt;i&gt; visual بس (bold وitalic)؛ النسخة الـ semantic بتاعتهم هي &lt;strong&gt; و&lt;em&gt;.`, `الـ &lt;u&gt; (underline) والـ &lt;small&gt; (كلام أصغر) بيغيّروا الشكل بس، ومش شايلين أي معنى أهمية أو تأكيد.`, `الـ &lt;sub&gt; والـ &lt;sup&gt; بيحددوا مكان الكلام تحت أو فوق السطر وبس؛ الـ pair الـ semantic هو &lt;strong&gt; و&lt;em&gt;.`, `صح. الـ &lt;strong&gt; معناه كلام مهم والـ &lt;em&gt; معناه كلام عليه تأكيد، فهما شايلين معنى (semantic)، لكن الـ &lt;b&gt; والـ &lt;i&gt; visual بس (L3, Text formatting).`],
    [`صح. الـ &lt;pre&gt; بيعرّف preformatted text، بيظهر بـ fixed-width font (غالبًا Courier)، وبيحافظ على المسافات والـ line breaks الاتنين (L3).`, `الـ &lt;pre&gt; بيعمل عكس إنه يشيل المسافات: بيحافظ على كل مسافة وكل line break، ومش بيخلي الكلام bold.`, `كلام الـ &lt;pre&gt; بيظهر عادي في الصفحة؛ مفيش حاجة فيه بتستخبى لحد الـ hover (الـ tooltip ده بييجي من الـ title attribute).`, `الـ horizontal rule بيترسم بالـ &lt;hr&gt;؛ الـ &lt;pre&gt; بيعرض preformatted text بـ fixed-width font.`],
    [`الـ &lt;small&gt; (كلام أصغر) موجود في list الـ text formatting بتاعة المحاضرة، فمينفعش يكون هو اللي NOT.`, `صح. الـ section ده structural block-level element، مش formatting.`, `الـ &lt;sub&gt; (subscript) موجود في list الـ text formatting بتاعة المحاضرة، فمينفعش يكون هو اللي NOT.`, `الـ &lt;ins&gt; (inserted text) موجود في list الـ text formatting بتاعة المحاضرة، فمينفعش يكون هو اللي NOT.`],
    [`صح. = rgb(255, 99, 71) = hsl(9, 100%, 64%).`, `الـ #6347ff حاطط الـ channels بترتيب غلط (red 63، green 47، blue ff)، فبيطلع بنفسجي مايل للأزرق؛ الـ Tomato هو #ff6347.`, `الـ rgb(99, 255, 71) فيه الأخضر على أعلى قيمة، فده أخضر فاتح؛ الـ Tomato هو rgb(255, 99, 71).`, `الـ Hue 200 ده في نطاق الأزرق؛ الـ Tomato الـ hue بتاعه 9: hsl(9, 100%, 64%).`]
  ]
};


AR.web.lectures["4"] = {
  notes: [
    { h: `يعني إيه CSS؟`, pts: [
      `الـ <b>Cascading Style Sheets (CSS)</b> بيستخدم عشان <b>يظبط الـ layout (شكل وترتيب)</b> صفحة الويب.`,
      `بالـ CSS تقدر تتحكم في اللون، والخط، وحجم الكلام، والمسافات بين الـ elements، وإزاي الـ elements تتحط وتترتب، وصور أو ألوان الخلفية، وشكل العرض المختلف حسب الجهاز وحجم الشاشة، وحاجات تانية كتير.`,
      `Lab 4: الـ CSS بيوصف إزاي الـ HTML elements تتعرض على الشاشة أو الورق أو أي media تانية؛ و<b>بيوفر شغل كتير</b> لأنه يقدر يتحكم في الـ layout بتاع كذا صفحة مرة واحدة. بيحل مشكلتين: الـ <b>presentation</b> (شكل elements معينة) والـ <b>layout</b>.`,
      `الطبقات بتترتب إزاي (L7): الـ HTML = <b>content layer</b> (الهيكل والمعنى)، الـ CSS = <b>presentation layer</b>، الـ JavaScript = <b>behavior layer</b>.`
    ] },
    { h: `تلات طرق تضيف بيها CSS` },
    { h: `أمثلة على الـ internal والـ external` },
    { h: `الـ CSS syntax والـ selectors (Lab 4)`, pts: [
      `الـ rule = <b>selector</b> + <b>declaration block</b> جوه curly braces <code>{ }</code>. كل declaration شكلها <code>property: value;</code> (colon في النص و semicolon في الآخر). الـ syntax الصح: <code>body {color: black;}</code>.`,
      `الـ comments في الـ CSS: <code>/* this is a comment */</code>.`,
      `الـ <b>Element selector</b> <code>p</code>: بيختار كل الـ &lt;p&gt; elements.`,
      `الـ <b>id selector</b> <code>#id1</code>: بيختار الـ element اللي id="id1" (الـ ids لازم تبقى unique، مايتكررش).`,
      `الـ <b>class selector</b> <code>.c1</code>: بيختار كل الـ elements اللي class="c1" (و<code>p.c1</code> = الـ &lt;p&gt; اللي عندها الـ class ده بس).`,
      `الـ <b>Grouping selector</b> <code>p, h1</code>: بيختار كل الـ &lt;p&gt; وكل الـ &lt;h1&gt;.`,
      `الـ <b>Universal selector</b> <code>*</code>: بيختار كل الـ elements.`,
      `بيتستخدم كمان في الـ labs والامتحانات: الـ descendant <code>li a</code>، والـ pseudo-classes <code>a:hover</code>، <code>a:visited</code>، <code>a:active</code>، <code>tr:nth-child(even)</code>.`
    ] },
    { h: `الألوان والخطوط والأحجام`, pts: [
      `الـ <b>color</b>: لون الكلام. الـ <b>font-family</b>: نوع الخط. الـ <b>font-size</b>: حجم الكلام (مثلًا 300%، 16px).`,
      `الـ <b>font-weight: bold</b> بيخلي الكلام بولد؛ الـ <b>font-style: italic</b> بيخليه italic؛ الـ <b>text-decoration</b> بيضيف underline/overline/line-through (والـ none بيشيل الخط اللي تحت الـ links).`,
      `الـ Background properties (Lab 4): <b>background-color</b>، <b>background-image</b> (بتتكرر by default لحد ما تغطي الـ element)، <b>background-repeat</b>، <b>background-attachment</b> (scroll أو fixed)، <b>background-position</b>.`
    ] },
    { h: `الـ CSS box model`, pts: [
      `كل element عبارة عن box (صندوق) مكوّن من (من جوه لبره): الـ <b>content</b>، الـ <b>padding</b>، الـ <b>border</b>، الـ <b>margin</b>.`,
      `الـ <b>border</b>: إطار حوالين الـ element، مثلًا <code>border: 2px solid powderblue;</code> (العرض، النوع، اللون).`,
      `الـ <b>padding</b>: المسافة <b>بين الكلام والـ border</b> (جوه الـ border).`,
      `الـ <b>margin</b>: المسافة <b>بره الـ border</b>.`
    ] },
    { h: `الـ shorthand بتاع الـ margin / padding / border-width (Lab 5)` },
    { h: `الـ Positioning والـ layout (الـ labs وسؤال الـ essay في الامتحان)`, pts: [
      `الـ <b>position</b> بيتحكم إزاي الـ element يتحط: <code>static</code> (الـ default، الـ normal flow)، <code>relative</code> (بيتزق من مكانه الطبيعي بـ top/left)، <code>absolute</code> (نسبةً لأقرب ancestor ليه position)، <code>fixed</code> (نسبةً للـ window)، <code>sticky</code>.`,
      `الـ <b>float</b> (left/right) بيزق الـ element لناحية عشان الكلام يلف حواليه؛ وبيستخدم في عمل horizontal navigation bars (<code>li {float:left;}</code>).`,
      `الـ <b>display</b>: block، inline، none، flex، grid. Lab 6: الـ <b>Grid</b> بيقسم الصفحة لمناطق (<code>grid-template-columns: auto auto;</code>، <code>repeat(3,300px)</code>)، والـ <b>Flexbox</b> بيرص الـ items في row أو column.`,
      `الـ Navigation bar = list من الـ links: <code>ul {list-style-type:none; margin:0; padding:0; overflow:hidden;}</code>، <code>li {float:left;}</code>، <code>li a {display:block; padding:14px 16px; text-decoration:none;}</code>، <code>li a:hover {background-color:#111;}</code>.`
    ] }
  ],
  cards: [
    `اختصار لـ Cascading Style Sheets.`,
    `Inline (الـ style attribute)، internal (الـ &lt;style&gt; في الـ head)، external (&lt;link&gt; لملف .css).`,
    `style خاص بـ element واحد بس.`,
    `صفحة HTML واحدة.`,
    `صفحات كتير؛ الملف امتداده .css ومفيهوش أي HTML.`,
    `&lt;link rel="stylesheet" type="text/css" href="mystyle.css"&gt; جوه الـ head.`,
    `الـ &lt;style&gt;.`,
    `الشكل الصح: body {color: black;}`,
    `بيتكتب كده: /* comment */`,
    `الـ #id بيختار element واحد unique؛ والـ .class بيختار كل الـ elements اللي عندها الـ class ده.`,
    `الـ Content، بعدين الـ padding، بعدين الـ border، بعدين الـ margin.`,
    `المسافة بين الـ content والـ border.`,
    `المسافة بره الـ border.`,
    `فوق/تحت 25px، شمال/يمين 50px.`,
    `فوق، يمين، تحت، شمال (top, right, bottom, left)، زي عقارب الساعة.`,
    `بالـ rule ده: p {font-weight: bold;}`,
    `بتتكرر (repeated) by default.`,
    `الـ position.`
  ],
  qa: [
    `الـ CSS (Cascading Style Sheets) بيستخدم عشان يظبط الـ layout بتاع صفحة الويب: الألوان، الخطوط، حجم الكلام، المسافات، الـ positioning، الخلفيات، وشكل العرض على الأجهزة المختلفة. تقدر تضيفه بـ 3 طرق: <b>Inline</b> باستخدام الـ style attribute جوه الـ element، لـ style خاص بـ element واحد (<code>&lt;h1 style="color:blue;"&gt;</code>)؛ <b>Internal</b> باستخدام &lt;style&gt; element في الـ &lt;head&gt;، لصفحة واحدة (<code>&lt;style&gt; p {color:red;} &lt;/style&gt;</code>)؛ <b>External</b> باستخدام &lt;link rel="stylesheet" href="styles.css"&gt; element في الـ head بتاع كل صفحة، لصفحات كتير؛ وملف الـ .css مفيهوش أي HTML. والـ external files ممكن توصلها بـ full URL أو relative path.`,
    `الـ <b>Element</b> selector (p) بيختار كل الـ elements اللي بالاسم ده؛ الـ <b>id</b> selector (#id1) بيختار الـ element الـ unique اللي ليه الـ id ده؛ الـ <b>class</b> selector (.c1) بيختار كل الـ elements اللي عندها الـ class ده، والـ p.c1 بيحصره في الـ &lt;p&gt; بس؛ الـ <b>grouping</b> selector (p, h1) بيطبّق rule واحد على كذا selector؛ الـ <b>universal</b> selector (*) بيختار كل element. وأشكال تانية مشهورة: الـ descendant (li a)، والـ pseudo-classes (a:hover, a:visited, tr:nth-child(even)).`,
    `كل element عبارة عن box: الـ content، وبعده الـ padding (المسافة بين الـ content والـ border)، وبعده الـ border، وبعده الـ margin (المسافة بره الـ border). مثال: <code>p {border: 2px solid powderblue; padding: 30px; margin: 50px;}</code> بيدّي كل paragraph border تخنه 2px، ومسافة جوه 30px، ومسافة بره 50px. الـ Shorthand: قيمة واحدة = كل الجهات؛ اتنين = فوق/تحت وشمال/يمين؛ تلاتة = فوق، شمال/يمين، تحت؛ أربعة = فوق، يمين، تحت، شمال.`,
    `الـ Inline: الـ style attribute على الـ element نفسه؛ أعلى priority؛ بيأثر على element واحد؛ بيخلط الـ style بالـ content وصعب تعمله maintenance. الـ Embedded (internal): الـ &lt;style&gt; في الـ head؛ بيأثر على صفحة واحدة؛ كويس للـ styles الخاصة بصفحة واحدة. الـ External: ملف .css منفصل متوصل بـ &lt;link&gt;؛ بيأثر على صفحات كتير؛ تعديل واحد بيغيّر شكل الموقع كله، والـ browser بيعمل cache للملف، وبيفصل الـ content عن الـ presentation (ودي ميزة الـ external sheets).`,
    `الكود:<pre>&lt;style&gt;
a:active { background-color: yellow; }
ul { list-style-type: square; }
body { background-image: url("paper.gif"); }
&lt;/style&gt;</pre>`
  ],
  quiz: [
    [`«Computer Style Sheets» ده اختصار متألف؛ الـ CSS معناها Cascading Style Sheets، وهي اللغة اللي بتظبط شكل وترتيب الصفحة.`, `«Creative Style Sheets» ده اختصار متألف؛ الـ CSS معناها Cascading Style Sheets.`, `صح. الـ CSS معناها Cascading Style Sheets، وبنستخدمها نظبط بيها شكل الصفحة: الألوان والـ fonts والمسافات وأماكن العناصر (L4, What is CSS?).`, `«Colorful Style Sheets» ده اختصار متألف؛ الـ CSS معناها Cascading Style Sheets.`],
    [`صح. الـ &lt;link&gt; في الـ head ومعاه rel="stylesheet" و href.`, `مفيش element اسمه &lt;stylesheet&gt; في الـ HTML أصلًا؛ الـ external sheet بيتربط بـ &lt;link rel="stylesheet" href="..."&gt; جوه الـ head.`, `الـ &lt;style&gt; ده بيتكتب جواه internal CSS في الصفحة نفسها، وملوش attribute اسمه src؛ الملف الخارجي بيتربط بالـ &lt;link&gt;.`, `غلط، لأن اختيار الـ &lt;link rel="stylesheet" ... href="mystyle.css"&gt; موجود وهو الطريقة الصح.`],
    [`الـ text-style مش CSS property أصلًا؛ حجم الكلام بيتحدد بالـ font-size، زي font-size:300% أو 16px.`, `الـ text-size مش CSS property، حتى لو الاسم شكله منطقي؛ حجم الكلام بيتحدد بالـ font-size.`, `الـ font-style بيخلي الكلام normal أو italic أو oblique، مش بيغير حجمه؛ الحجم هو الـ font-size.`, `صح. الـ font-size هو اللي بيتحكم في حجم الكلام، زي h1 {font-size: 300%;} أو p {font-size: 16px;} (L4, Colors, fonts and sizes).`],
    [`الـ table هنا element selector بيحدد إنهي عناصر هنعملها style، مش property؛ الـ property اللي بترسم الـ borders هي border.`, `صح. table, th, td {border: 1px solid black;} (L5).`, `الـ table:border ده مش CSS صحيح؛ الـ selector والـ property بيتكتبوا كده: table {border: 1px solid black;}.`, `غلط، لأن الـ border موجودة في الاختيارات وهي الـ property المستخدمة: table, th, td {border: 1px solid black;}.`],
    [`الـ border بيرسم الخط اللي حوالين العنصر نفسه؛ إنما المسافة بين الـ border ده والـ content اسمها padding.`, `الـ margin هي المسافة اللي بره الـ border، بين العنصر واللي جنبه، مش بين الـ border والـ content.`, `صح. الـ padding هو المسافة بين الـ content والـ border.`, `الـ resize بيحدد هل الـ user يقدر يغير حجم العنصر ولا لأ؛ ملوش أي علاقة بالمسافات في الـ box model.`],
    [`الـ h1.all بيختار بس الـ &lt;h1&gt; اللي عندها class="all"، مش كل الـ &lt;h1&gt;؛ اللي بيعمل كده هو الـ element selector العادي h1.`, `الـ all.h1 بيختار elements اسمها &lt;all&gt; وعندها class="h1"، ودي مش موجودة أصلًا؛ كل الـ &lt;h1&gt; بتتختار بـ h1.`, `صح. الـ element selector h1 بيستهدف كل الـ &lt;h1&gt;.`, `غلط، لأن h1 {background-color:#FFFFFF;} موجود في الاختيارات وبيستهدف كل الـ &lt;h1&gt; صح.`],
    [`الـ selector لازم ييجي قبل الـ braces، مش جواها وبعده semicolon؛ الشكل الصح selector {property: value;}.`, `مفيش braces خالص، والـ CSS بيفصل بين الـ property والـ value بـ colon مش =؛ الشكل الصح body {color: black;}.`, `صح. الـ rule عبارة عن selector وبعده declaration block جوه curly braces، وكل declaration بتتكتب property: value; (L4, CSS syntax).`, `الـ selector جوه الـ braces، ومستخدم = بدل الـ colon؛ الشكل الصح body {color: black;}.`],
    [`الـ &lt;script&gt; بيتحط فيه كود JavaScript، مش CSS؛ الـ internal style sheet بيتكتب في &lt;style&gt; element جوه الـ head.`, `الـ &lt;link&gt; بيربط ملف .css خارجي؛ إنما الـ internal (embedded) sheet بيتكتب جوه &lt;style&gt; في الـ head.`, `الـ &lt;class&gt; مش HTML element أصلًا؛ الـ class ده attribute بتستخدمه الـ CSS class selectors. الـ internal CSS بيتحط في &lt;style&gt;.`, `صح. الـ internal (embedded) CSS بيتكتب في &lt;style&gt; element جوه الـ &lt;head&gt;، وبيعمل style لصفحة HTML واحدة بس (L4, Three ways to add CSS).`],
    [`الـ text-decoration بيضيف أو يشيل underline أو overline أو line-through؛ مش بيحدد لون الكلام.`, `الـ pallet مش CSS property؛ لون الكلام بيتحدد بالـ color property.`, `الـ text-style مش CSS property؛ لون الكلام بيتحدد بالـ color property.`, `صح. الـ color property بتحدد لون الكلام، زي h1 {color: blue;}؛ وخلي بالك الـ background-color للخلفية (L4, Colors, fonts and sizes).`],
    [`الـ static ده value من values الـ position، مش property.`, `صح. الـ values: static، relative، absolute، fixed، sticky.`, `الـ fix مش CSS property (الـ fixed دي value من values الـ position)؛ مكان العنصر بيتحدد بالـ position property.`, `الـ set مش CSS property؛ طريقة تحديد مكان العنصر بتتحكم فيها الـ position property.`],
    [`ده الـ single-line syntax بتاع الـ JavaScript؛ مش valid في الـ CSS.`, `الـ apostrophe في الأول ده comment بتاع الـ VBScript، مش CSS؛ الـ comments في الـ CSS بتتكتب /* this is a comment */.`, `الـ // مش علامة comment في الـ CSS لا في الأول ولا في الآخر؛ الـ CSS بيستخدم /* ... */ بس.`, `صح. الـ comments في الـ CSS بتتكتب بين /* و */، وممكن تبقى على كذا سطر (L4, CSS syntax).`],
    [`الـ text-color مش CSS property، حتى لو اسمها شكله صح؛ لون الكلام بيتحدد بالـ color.`, `صح. الـ color property بتحدد لون كلام العنصر، زي p {color: red;} (L4, Colors, fonts and sizes).`, `الـ fgcolor مش CSS property؛ لون الكلام (الـ foreground) بيتحدد بالـ color.`],
    [`الـ text-size مش موجود، وكمان ده بيعمل style لـ p واحدة بس.`, `الـ font-size بياخد حجم زي 16px أو 300%، مش bold، وكمان الـ inline style ده بيأثر على &lt;p&gt; واحدة بس؛ استخدم p {font-weight:bold;}.`, `صح. الـ element selector p بيستهدف كل الـ &lt;p&gt;، والـ font-weight:bold بيخلي كلامهم bold (L4, Colors, fonts and sizes).`, `الـ text-size مش CSS property؛ الـ bold بيتعمل بـ font-weight:bold.`],
    [`الـ style ده HTML attribute مش CSS property، فـ style:bold مش valid؛ الـ bold بيتعمل بـ font-weight:bold.`, `الـ font shorthand محتاج الـ size والـ family كمان.`, `صح. الـ font-weight:bold بيخلي الكلام bold، والـ font-style:italic بيخليه italic (L4, Colors, fonts and sizes).`],
    [`الأربع قيم ترتيبهم top, right, bottom, left؛ هنا الـ right = 20px والـ left = 1px، يعني عكس المطلوب.`, `ده بيتقري top 10, right 5, bottom 20, left 1، لأن الترتيب top, right, bottom, left (مع عقارب الساعة).`, `صح. لما يبقى فيه أربع قيم الترتيب top, right, bottom, left (مع عقارب الساعة): 10px فوق، 1px يمين، 5px تحت، 20px شمال (L4, shorthand table).`, `أول قيمة هي الـ top، فده بيدي top 5px وbottom 10px؛ والترتيب top, right, bottom, left.`],
    [`دي مش property (الـ text-indent هو اللي بيعمل indent لأول سطر).`, `صح. الـ margin-left بيحدد الـ margin من الناحية الشمال بس؛ إنما الـ margin بيحدد كل النواحي مرة واحدة (L4, shorthand table).`, `الـ padding-left دي المسافة اللي جوه الـ border من الشمال؛ الـ left margin اللي بره الـ border هو margin-left.`],
    [`صح. الـ CSS هو الـ presentation layer اللي بيعمل style وlayout للصفحات؛ الـ HTML للـ content والـ JavaScript للـ behavior (L4, What is CSS?).`, `الـ jQuery دي JavaScript library للـ behavior والتعامل مع الـ DOM؛ إنما الـ styling والـ layout بيتعملوا بالـ CSS.`, `الـ JavaScript هو الـ behavior layer اللي بيخلي الصفحة interactive؛ الـ styling والـ layout شغل الـ CSS، الـ presentation layer.`, `الـ PHP دي server-side language بتولّد الصفحات؛ إنما تظبيط شكل الـ layout في الـ browser بيتعمل بالـ CSS.`],
    [`لما يبقى فيه تلات قيم، أول واحدة بتبقى الـ top بس، فالـ 25px ده الـ top margin مش الشمال.`, `صح. التلات قيم معناهم: top، وبعدين right وleft مع بعض، وبعدين bottom: يعني top 25px، الشمال واليمين 50px، وbottom 75px (L4, shorthand table).`, `لما يبقى فيه تلات قيم، آخر واحدة بتبقى الـ bottom بس، فالـ 75px ده الـ bottom margin.`, `الشمال مش بيفضل 0: القيمة اللي في النص من التلاتة بتحدد اليمين والشمال الاتنين، فبيبقى 50px.`],
    [`الـ margin هي المسافة اللي بره الـ border، بتفصل العنصر عن غيره؛ اللي جوه الـ border هو الـ padding.`, `صح. في الـ box model (content, padding, border, margin)، الـ padding هو المسافة بين الكلام والـ border (L4, Box model).`, `الـ outline ده خط بيترسم بره الـ border، ومش من طبقات الـ box model أصلًا؛ المسافة اللي جوه هي الـ padding.`, `الـ content هو الكلام نفسه، أعمق box جوه؛ والمسافة اللي بينه وبين الـ border هي الـ padding.`]
  ],
  extra: [
    [`الـ external rules هنا ليها أقل priority.`, `الـ rule اللي في الـ internal &lt;style&gt; بتكسب على الملف الخارجي، بس الـ inline style اللي على العنصر نفسه بيغلب الاتنين، فالأخضر هو اللي بيكسب.`, `صح. الـ inline styles بتغلب الـ internal والـ external rules في الـ cascade.`, `التعارض بيتحل بالـ cascade، مش بيلغي بعضه.`],
    [`لما يبقى فيه قيمتين، الأولى بتبقى للـ top والـ bottom، فالـ 10px ده padding فوق وتحت مش الشمال.`, `صح. قيمتين: فوق/تحت، وبعدين يمين/شمال.`, `القيمتين مش بيتجمعوا على بعض؛ الـ 10px للـ top/bottom والـ 20px للـ right/left.`, `الشمال مش 0: القيمة التانية من الاتنين بتغطي اليمين والشمال مع بعض، فبيبقى 20px.`],
    [`الـ 100px ده عرض الـ content بس؛ في الـ default box model الـ padding والـ border والـ margin بيتضافوا من الناحيتين.`, `ده content + padding + border، من غير الـ margins.`, `صح. كل طبقة في الـ box بتتحسب من الناحيتين: 100 + 2×10 (padding) + 2×2 (border) + 2×5 (margin) = 134px (L4, Box model).`, `الـ 117 = 100 + 10 + 2 + 5 ده حاسب الـ padding والـ border والـ margin من ناحية واحدة بس؛ وكل واحد فيهم موجود يمين وشمال.`],
    [`النقطة دي الـ class selector، فالـ .main بيعمل style لكل عنصر عنده class="main"، مش العنصر اللي id="main".`, `من غير # أو .، الـ main ده element selector بيستهدف الـ &lt;main&gt; elements، مش id="main".`, `الـ *main ده مش selector صحيح؛ الـ * لوحدها هي الـ universal selector. الـ id selector بيتكتب #main.`, `صح. الـ id selector بيتكتب # وبعدها الـ id، فالـ #main بيعمل style للعنصر اللي id="main" (والـ ids unique) (L4, Selectors).`],
    [`الـ CSS comments /* ... */ مسموحة عادي في ملف .css؛ اللي ممنوع يبقى فيه هو الـ HTML.`, `صح. ملف الـ .css لازم مايبقاش فيه أي HTML code.`, `الـ selectors هي أساس أي CSS rule، فالـ external sheet لازم يبقى فيه selectors؛ اللي ممنوع هو الـ HTML tags.`, `الـ color values زي powderblue أو #ff6347 دي CSS values عادية، فمسموحة في ملف الـ .css.`],
    [`صح. الـ grouping selector بيحط selectors جنب بعض مفصولين بـ commas، فالـ h1, p بيطبق rule واحد على كل الـ &lt;h1&gt; وكل الـ &lt;p&gt; (L4, Selectors).`, `الـ descendant selector بيبقى فيه مسافة من غير comma، زي h1 p (يعني p جوه h1)؛ الـ comma معناها grouping.`, `الـ class selector بيبدأ بنقطة، زي .c1؛ إنما h1, p مفيهاش نقطة، دي بتجمع اتنين element selectors.`, `الـ universal selector هو * وبيختار كل العناصر؛ إنما h1, p بيختار الـ &lt;h1&gt; والـ &lt;p&gt; بس.`],
    [`لو الملف في نفس الفولدر كان هيبقى href="styles.css" من غير slash؛ الـ slash اللي في الأول معناها نبدأ من الـ root بتاع الموقع.`, `صح. الـ slash اللي في الأول = relative للـ root بتاع الموقع.`, `مفيش domain مكتوب، فده relative URL على نفس الموقع؛ لو موقع خارجي كان لازم full URL زي https://...`, `ده valid: المحاضرة نفسها بتستخدم href="/html/styles.css" بالظبط لـ sheet موجود في فولدر الـ html في الموقع الحالي.`],
    [`الـ a:visited بيعمل style للـ links اللي الـ user زارها قبل كده، وطول الوقت، مش بس والماوس فوقها.`, `الـ a:active بيشتغل وإنت بتدوس على الـ link (لحظة الـ click)، مش لما الماوس يبقى واقف فوقه بس.`, `الـ a:link بيعمل style للـ links اللي لسه ماتزارتش في حالتها العادية؛ حالة الماوس فوقها هي a:hover.`, `صح. الـ :hover pseudo-class بيشتغل بس طول ما الماوس فوق العنصر، زي rule الـ nav-bar: li a:hover {background-color:#111;} (L4).`],
    [`صح. الـ margin بيبقى شفاف بره الـ border.`, `الـ margins دي مسافة شفافة بره الـ border، فلون الخلفية عمره ما بيظهر فيها.`, `لون الخلفية بيترسم ورا الـ content والـ padding، فيه جزء من الـ box بيظهر فيه فعلًا.`, `الـ border ليه لونه الخاص اللي بيتحدد في border (زي 2px solid powderblue)؛ الخلفية بتملا الـ content والـ padding.`],
    [`الـ list-style-type: square بيحول الـ bullets لمربعات بدل ما يشيلها؛ اللي بيشيلها هو none.`, `الـ text-decoration: none بيشيل الـ underline من الـ links، مش الـ bullets بتاعة الـ list؛ دي list-style-type: none.`, `صح. rule الـ nav-bar ul {list-style-type:none; margin:0; padding:0;} بيشيل الـ bullets من list الـ links (L4, Navigation bar).`, `الـ display: none بيخفي الـ list كلها بالـ links اللي فيها؛ المطلوب نشيل الـ bullets بس، وده بـ list-style-type: none.`]
  ]
};


AR.web.lectures["5"] = {
  notes: [
    { h: `نظرة عامة على الـ lists`, pts: [
      `الـ HTML lists بتجمّع مجموعة items ليها علاقة ببعض. فيه 3 أنواع: <b>unordered</b> (<code>&lt;ul&gt;</code>، بـ bullets)، و<b>ordered</b> (<code>&lt;ol&gt;</code>، بأرقام)، و الـ <b>description</b> lists (<code>&lt;dl&gt;</code>).`,
      `كل item جوه &lt;ul&gt; أو &lt;ol&gt; بيبدأ بـ <code>&lt;li&gt;</code>. الـ items في الـ unordered بيتعلّم عليها بـ <b>bullets (دواير سودا صغيرة)</b> كـ default؛ وفي الـ ordered بـ <b>أرقام</b>.`,
      `الـ lists ينفع تبقى <b>nested</b> (list جوه &lt;li&gt;).`,
      `الـ <b>navigation bar</b> هو ببساطة list من الـ links: <code>&lt;ul&gt;&lt;li&gt;&lt;a href="#home"&gt;Home&lt;/a&gt;&lt;/li&gt;...&lt;/ul&gt;</code> وبنعمله style بالـ CSS.`
    ] },
    { h: `الـ list-style-type (شكل العلامة في الـ unordered list)` },
    { h: `الـ ordered list: الـ attributes بتوع type و start` },
    { h: `الـ description list` },
    { h: `الـ tables: الـ tags الأساسية`, pts: [
      `الـ tables بتعرض الداتا في rows و columns، وينفع تعمل بيها نص متقسم columns، وcaptions للصور، وsidebars.`,
      `<code>&lt;table&gt;</code> بيعمل الجدول؛ <code>&lt;tr&gt;</code> بيعرّف row؛ <code>&lt;td&gt;</code> بيعرّف data cell؛ <code>&lt;th&gt;</code> بيعرّف <b>header cell</b> (bold و centered كـ default).`,
      `tags تانية للجدول: <code>&lt;caption&gt;</code> (عنوان الجدول)، <code>&lt;thead&gt;</code>، <code>&lt;tbody&gt;</code>، <code>&lt;tfoot&gt;</code>. والمجموعة الصح اللي "كلها table elements" هي &lt;table&gt;&lt;tr&gt;&lt;td&gt;.`,
      `الـ <b>colspan</b> بيخلي الـ cell تمتد على كذا <b>column</b>؛ والـ <b>rowspan</b> بيخليها تمتد على كذا <b>row</b>.`
    ] },
    { h: `الـ borders والمقاسات في الجدول (CSS)`, pts: [
      `الـ Borders: <code>table, th, td { border: 1px solid black; }</code> (بيحط border حوالين الجدول وحوالين كل cell، فيطلعلك borders مزدوجة).`,
      `<b>border-collapse: collapse;</b> بيدمج الـ borders المزدوجة في border واحد.`,
      `شكل الـ border اللي مش باين: borders بيضا مع background color للـ cells (<code>background-color:#96D4D4</code>).`,
      `<b>border-radius: 10px;</b> بيدوّر الأركان؛ ولو شلت <code>table</code> من الـ selector مش هيبقى فيه border خارجي.`,
      `<b>border-style: dotted;</b> (وكمان dashed، solid، double...)، و<b>border-color</b>.`,
      `المقاسات: <code>&lt;table style="width:100%"&gt;</code>؛ عرض column بيتحط على &lt;th&gt;/&lt;td&gt; (<code>style="width:70%"</code>)؛ وارتفاع الـ row بيتحط على &lt;tr&gt; (<code>style="height:200px"</code>).`,
      `الـ Zebra/striped rows: <code>tr:nth-child(even) {background-color: #f2f2f2;}</code>. والـ <b>responsive table</b> بيظهر horizontal scroll bar على الشاشات الصغيرة (حطه جوه div عليه <code>overflow-x:auto</code>).`
    ] },
    { h: `مثال على الـ colspan والـ rowspan` },
    { h: `إزاي تبني جدول مش منتظم (طريقة الامتحان)`, pts: [
      `1) عِدّ <b>إجمالي الـ columns</b> في أعرض row (أصغر عرض وحدة) وعدد الـ rows.`,
      `2) اكتب كل row كـ &lt;tr&gt;؛ ولكل cell بتبدأ في الـ row ده اكتب &lt;td&gt; وفيه colspan = عدد الـ columns اللي بتغطيها، و rowspan = عدد الـ rows اللي بتغطيها.`,
      `3) في الـ rows اللي بعد كده <b>اتخطّى</b> الأماكن اللي متغطية أصلًا بـ cell عليها rowspan من فوق.`,
      `4) اعمل check: في كل row، (مجموع الـ colspans بتوع الـ cells الجديدة) + (الـ columns اللي لسه متغطية بـ rowspans من فوق) = إجمالي الـ columns.`
    ] }
  ],
  cards: [
    `&lt;ul&gt; (بـ bullets).`,
    `&lt;ol&gt; (أرقام).`,
    `&lt;li&gt; (كل item في ul أو ol).`,
    `&lt;dl&gt; الـ list نفسها، &lt;dt&gt; الـ term، &lt;dd&gt; الوصف.`,
    `disc (دايرة سودا صغيرة).`,
    `list-style-type: square; (بتتحط على الـ ul).`,
    `&lt;ol type="I"&gt; (أرقام رومانية كابيتال).`,
    `&lt;ol start="3"&gt; (الـ attribute بتاع start).`,
    `&lt;tr&gt; للـ row / &lt;td&gt; للـ data cell / &lt;th&gt; للـ header cell.`,
    `&lt;caption&gt; (عنوان بيظهر فوق الجدول).`,
    `colspan="2" (الـ cell تمتد على 2 columns).`,
    `rowspan="2" (الـ cell تمتد على 2 rows).`,
    `border-collapse: collapse; (بيدمج الـ borders المزدوجة في واحد).`,
    `border-radius: 10px; (بيدوّر الأركان).`,
    `tr:nth-child(even) {background-color:#f2f2f2;} (كل row زوجي بلون رمادي).`,
    `style="width:70%" على th/td في الـ column ده.`
  ],
  qa: [
    `<b>Unordered list</b>: &lt;ul&gt; وجواها items بـ &lt;li&gt;، وعليها bullets (الـ default هو disc؛ والـ list-style-type ممكن يبقى circle أو square أو none). <b>Ordered list</b>: &lt;ol&gt; وجواها &lt;li&gt;، ومترقمة؛ الـ attribute بتاع type بيختار 1، A، a، I، i، والـ start بيحدد أول رقم (&lt;ol start="50"&gt;). <b>Description list</b>: &lt;dl&gt; وفيها terms بـ &lt;dt&gt; وأوصاف بـ &lt;dd&gt;. والـ lists ينفع تبقى nested، و list من الـ links متظبطة بالـ CSS بتعمل navigation bar.`,
    `الـ table بيعرض الداتا في rows و columns باستخدام &lt;table&gt;، والـ rows بـ &lt;tr&gt;، والـ data cells بـ &lt;td&gt;، والـ header cells بـ &lt;th&gt; (bold و centered)؛ و &lt;caption&gt; بيضيف عنوان. <b>colspan="n"</b> على cell بيخليها تمتد على n columns (مثلًا &lt;th colspan="2"&gt;Name&lt;/th&gt; فوق First و Last name). <b>rowspan="n"</b> بيخليها تمتد على n rows (مثلًا &lt;th rowspan="2"&gt;Phone&lt;/th&gt; لرقمين تليفون)؛ وفي الـ row اللي بعده المكان ده بيتساب. الـ borders بتتضاف بالـ CSS border وبتتدمج بـ border-collapse: collapse.`,
    `حط borders بـ <code>table, th, td { border: 1px solid black; }</code>؛ ده بيطلّع borders مزدوجة (الجدول + كل cell)، فاستخدم <code>border-collapse: collapse;</code> عشان يدمجهم في border واحد. <code>border-radius: 10px</code> بيدوّر الأركان (شيل table من الـ selector عشان مايبقاش فيه border خارجي)؛ <code>border-style: dotted</code> و <code>border-color: #96D4D4</code> بيغيروا شكل الخط؛ وborders بيضا مع background color للـ cells بتدّي شكل border مش باين. المقاسات: <code>&lt;table style="width:100%"&gt;</code> للجدول، <code>style="width:70%"</code> على th/td للـ column، و <code>style="height:200px"</code> على tr للـ row. الـ Striped rows: <code>tr:nth-child(even) {background-color:#f2f2f2;}</code>.`,
    `<pre>&lt;table border="1"&gt;
  &lt;tr&gt; &lt;th colspan="2"&gt;A&lt;/th&gt; &lt;th rowspan="2"&gt;B&lt;/th&gt; &lt;/tr&gt;
  &lt;tr&gt; &lt;th rowspan="2"&gt;C&lt;/th&gt; &lt;th&gt;D&lt;/th&gt; &lt;/tr&gt;
  &lt;tr&gt; &lt;th colspan="2"&gt;E&lt;/th&gt; &lt;/tr&gt;
&lt;/table&gt;</pre>اعمل check بـ 3 columns: الـ row الأول = 2 + 1؛ التاني = C + D + (B جاية من فوق) = 3؛ التالت = (C جاية من فوق) + E(2) = 3.`
  ],
  quiz: [
    [`الـ &lt;head&gt; ده head بتاع الـ document، مش table element.`, `الـ &lt;tt&gt; ده tag قديم (obsolete) للـ teletype text، يعني formatting مش table element؛ مجموعة الجدول الصح هي &lt;table&gt; و&lt;tr&gt; و&lt;td&gt;.`, `صح. الـ &lt;table&gt; بيعمل الجدول، والـ &lt;tr&gt; بيعرّف row، والـ &lt;td&gt; بيعرّف data cell، فالتلاتة table elements (L5, Tables).`, `الـ &lt;body&gt; ده الجزء اللي باين من الـ document، مش table element؛ الـ group بتاع جسم الجدول اسمه &lt;tbody&gt;.`],
    [`مفيش element اسمه &lt;list&gt; في الـ HTML أصلًا؛ الـ bulleted list هي unordered list، يعني &lt;ul&gt;.`, `الـ &lt;ol&gt; دي ordered list والـ items بتاعتها بتترقّم، مش بـ bullets؛ الـ bullets بتيجي من &lt;ul&gt;.`, `صح. الـ &lt;ul&gt; هي الـ unordered list، وكل &lt;li&gt; جواها بيتعلّم بـ bullet (دايرة سودا صغيرة) by default (L5, Lists).`, `الـ &lt;dl&gt; دي description list فيها terms (&lt;dt&gt;) و descriptions (&lt;dd&gt;) من غير bullets؛ الـ bulleted list بتستخدم &lt;ul&gt;.`],
    [`مفيش element اسمه &lt;list&gt; في الـ HTML؛ الـ numbered list هي ordered list، يعني &lt;ol&gt;.`, `صح. الـ &lt;ol&gt; هي الـ ordered list، والـ &lt;li&gt; items بتاعتها بتتعلّم بأرقام by default (type="1") (L5, Lists).`, `الـ &lt;ul&gt; دي unordered list وبتتعلّم بـ bullets مش أرقام؛ الـ numbered list بتستخدم &lt;ol&gt;.`, `الـ &lt;dl&gt; دي description list فيها terms و descriptions، مش مترقّمة؛ الـ numbered list بتستخدم &lt;ol&gt;.`],
    [`الـ list دي مش CSS property أصلًا؛ شكل الـ marker بتاع الـ list items بيتحدد بـ list-style-type.`, `الـ list-type مش CSS property؛ الاسم الكامل list-style-type، زي list-style-type: square;.`, `صح. الـ list-style-type بيحدد الـ marker بتاع كل item، وقيمه disc (الـ default) و circle و square و none (L5, list-style-type).`, `غلط، لأن list-style-type: square; موجودة في الاختيارات وهي الـ declaration الصح.`],
    [`الـ &lt;ol&gt; مالهاش attribute اسمه begin؛ الرقم اللي العد بيبدأ منه بيتحدد بـ start.`, `الـ &lt;ol&gt; مالهاش attribute اسمه list؛ أول رقم بيتحدد بـ start، زي start="3".`, `صح. الـ attribute بتاع start في الـ &lt;ol&gt; بيحدد أول رقم، يعني مثلًا start="50" بيعد من 50 بدل 1 (L5, Ordered list).`, `الـ &lt;ol&gt; مالهاش attribute اسمه num؛ أول رقم بيتحدد بـ start.`],
    [`الـ &lt;ol&gt; بتعمل ordered list (بأرقام)؛ الـ unordered list (بـ bullets) هي &lt;ul&gt;.`, `صح. الـ &lt;ul&gt; بتعمل unordered list والـ &lt;li&gt; items بتاعتها بتتعلّم بـ bullets (L5, Lists).`, `الـ &lt;li&gt; ده item واحد بيتحط جوه &lt;ul&gt; أو &lt;ol&gt;؛ هو مش بيعمل الـ list نفسها.`, `مفيش tag اسمه &lt;ll&gt; في الـ HTML؛ الـ unordered list هي &lt;ul&gt;.`],
    [`الـ &lt;th&gt; ده header cell بيتحط جوه الـ row؛ الـ row نفسه هو &lt;tr&gt;.`, `الـ &lt;td&gt; ده data cell بيتحط جوه الـ row؛ الـ row نفسه هو &lt;tr&gt;.`, `صح. الـ &lt;tr&gt; (table row) بيعرّف row، والـ cells بتاعة &lt;td&gt; أو &lt;th&gt; بتتحط جواه (L5, Tables).`, `الـ &lt;tt&gt; ده tag قديم (obsolete) للـ teletype text، مش table tag خالص؛ الـ rows هي &lt;tr&gt;.`],
    [`الـ &lt;tr&gt; بيعرّف row كامل فيه الـ cells، مش cell واحدة؛ الـ data cell هي &lt;td&gt;.`, `صح. الـ &lt;td&gt; (table data) بيعرّف data cell، وكل cell عادية في الـ row بتبقى &lt;td&gt; (L5, Tables).`, `الـ &lt;th&gt; بيستخدم للـ header cells بس، مش لكل cell؛ الـ data cells العادية هي &lt;td&gt;.`, `الـ &lt;thead&gt; بيجمّع الـ header rows بتاعة الجدول؛ هو مش cell. الـ cells هي &lt;td&gt;.`],
    [`الـ &lt;td&gt; بيعرّف data cell عادية؛ الـ heading cells هي &lt;th&gt;، واللي بتطلع bold و centered by default.`, `الـ &lt;tr&gt; بيعرّف row، مش cell؛ الـ heading cells اللي جوه الـ row هي &lt;th&gt;.`, `الـ &lt;thead&gt; بيجمّع الـ header rows بس هو مش cell؛ الـ heading cells نفسها هي &lt;th&gt;.`, `صح. الـ &lt;th&gt; بيعرّف header cell، وبتتعرض bold و centered by default (L5, Tables).`],
    [`صح. الـ &lt;caption&gt; بيضيف caption (عنوان) للجدول، وبيظهر فوقه by default (L5, Tables).`, `الـ &lt;thead&gt; بيجمّع الـ header rows بتاعة الجدول؛ عنوان الجدول هو &lt;caption&gt;.`, `الـ &lt;th&gt; ده header cell جوه row؛ الـ caption بتاع الجدول كله هو &lt;caption&gt;.`, `الـ &lt;tr&gt; ده table row؛ الـ caption بتاع الجدول كله هو &lt;caption&gt;.`],
    [`صح. الـ &lt;ol&gt; بتعمل ordered list والـ items بتاعتها بتترقّم (1، 2، 3 by default) (L5, Lists).`, `الـ &lt;ul&gt; بتعمل bulleted (unordered) list، مش مترقّمة؛ الـ numbered list بتستخدم &lt;ol&gt;.`, `الـ &lt;li&gt; ده item واحد، مش الـ list؛ الـ numbered list بتتعمل بـ &lt;ol&gt;.`, `مفيش tag اسمه &lt;ll&gt; في الـ HTML؛ الـ numbered list بتستخدم &lt;ol&gt;.`],
    [`صح. غالبًا بالـ px (مثلًا border-spacing: 0).`, `وحدة CSS ممكنة، بس مش الإجابة المتوقعة.`, `وحدة CSS ممكنة، بس مش الإجابة المتوقعة.`, `وحدة CSS ممكنة، بس مش الإجابة المتوقعة.`],
    [`الـ border-radius بيدوّر الأركان وبياخد length زي 10px، مش collapse؛ الـ double borders بتتدمج بـ border-collapse.`, `صح. بيدمج الـ borders في border واحد.`, `الـ single مش قيمة من قيم الـ border-style (القيم dotted و dashed و solid و double...)؛ دمج الـ double borders بيتعمل بـ border-collapse: collapse.`, `الـ border: none بيشيل كل الـ borders خالص، والمطلوب إنك تسيب border واحد بس؛ ده border-collapse: collapse.`],
    [`الـ lowercase letters (a، b، c) بتيجي من type="a"؛ الـ type="i" بيدّي lowercase roman numbers.`, `الـ uppercase roman numbers (I، II، III) بتيجي من type="I"؛ الـ i الصغيرة بتدّي i، ii، iii.`, `صح. الـ type="i" بيرقّم الـ items بـ lowercase roman numbers: i، ii، iii، iv... (L5, Ordered list type).`, `الأرقام العادية دي type="1"، وهو الـ default؛ الـ type="i" بيدّي lowercase roman numbers.`]
  ],
  extra: [
    [`الـ 3 دي عدد الـ cells مش الـ columns: الـ cell اللي عليها colspan="2" واخدة 2 columns، فـ 2 + 1 + 1 = 4.`, `صح. الـ colspan="2" بيخلي A واخدة 2 columns، و B و C كل واحدة column: يعني 2 + 1 + 1 = 4 columns (L5, colspan and rowspan).`, `الـ 2 دي ناسية B و C؛ الـ row بيغطي 2 columns لـ A وواحد لكل من B و C، يعني 4.`, `الـ 5 زيادة column؛ A واخدة 2 و B و C كل واحدة 1، فـ 2 + 1 + 1 = 4.`],
    [`الـ 3 دي متجاهلة الـ rowspan: الـ cell اللي في row 1 نازلة لحد row 2 ومالية column من الـ columns بتاعته أصلًا.`, `الـ rowspan cell واخدة column واحد بس من row 2، فمحتاج 3 − 1 = 2 cells، مش 1.`, `صح. 3 columns ناقص الواحد اللي مغطيه الـ rowspan.`, `جدول فيه 3 columns عمره ما هيحتاج 4 cells في row واحد؛ ومع column متغطي بالـ rowspan، row 2 محتاج 2.`],
    [`الـ 4 دي قيمة الـ start، بس الـ type="I" بيعرضها كـ uppercase roman number، يعني IV، مش كرقم.`, `الـ D (الحرف الرابع) هتيجي من type="A"؛ الـ type="I" بيعرض uppercase roman numbers، فيبقى IV.`, `الـ iv دي lowercase roman، ومحتاجة type="i"؛ الـ type="I" الكابيتال بيدّي IV.`, `صح. ترقيم روماني كابيتال بيبدأ من 4.`],
    [`صح. الـ &lt;dd&gt; فيه الوصف بتاعه، والـ &lt;dl&gt; هو الـ list كلها.`, `الـ &lt;dd&gt; بيشيل وصف الـ term ("- black hot drink")، مش الـ term نفسه، اللي هو &lt;dt&gt;.`, `الـ &lt;dl&gt; ده الـ container بتاع الـ description list كلها؛ كل term جواها بيبقى &lt;dt&gt;.`, `الـ &lt;li&gt; ده الـ item tag بتاع &lt;ul&gt; و&lt;ol&gt;؛ الـ description list بتستخدم &lt;dt&gt; للـ terms و&lt;dd&gt; للـ descriptions.`],
    [`الـ &lt;th&gt; header cells مش italic ولا right-aligned by default؛ هي بتتعرض bold و centered.`, `صح. الـ &lt;th&gt; بيعرّف header cell، والـ browsers بتعرضها bold و centered by default، على عكس الـ &lt;td&gt; cells العادية (L5, Tables).`, `الكلام اللي في &lt;th&gt; مش underlined by default؛ الـ header cells بتتعرض bold و centered.`, `الـ header cells دي content باين، بتتعرض bold و centered؛ مفيش حاجة في &lt;th&gt; بتخفيها.`],
    [`هنا الـ &lt;ul&gt; الداخلية قاعدة على طول جوه الـ &lt;ul&gt; الخارجية بعد الـ item؛ الـ nested list لازم تتحط جوه الـ &lt;li&gt; اللي تبعه.`, `الـ items مالهاش &lt;li&gt; tags؛ كل item في &lt;ul&gt; لازم يبدأ بـ &lt;li&gt;، والـ nesting بيتعمل جوه &lt;li&gt;.`, `صح. الـ &lt;ul&gt; الداخلية متحطوطة جوه الـ list item بتاع "Tea".`, `مفيش &lt;ul&gt; خارجية حوالين الـ &lt;li&gt;، والـ list الداخلية مالهاش &lt;li&gt;؛ الـ list item لازم يبقى تبع list.`],
    [`صح. الـ tr:nth-child(even) بيختار كل تاني row، فتطلع striped (zebra) rows، زي اللي في المحاضرة tr:nth-child(even) {background-color: #f2f2f2;} (L5).`, `الـ :even مش CSS pseudo-class؛ الـ even rows بتتختار بـ :nth-child(even).`, `الـ tr[2] ده attribute selector (rows عليها attribute اسمه 2)، مش رقم row؛ استخدم tr:nth-child(even).`, `الـ td + td بيختار كل cell جاية بعد cell تانية في نفس الـ row، فده بيلوّن columns، مش rows بالتبادل.`],
    [`الـ &lt;th&gt; ده header cell جوه row، مش عنوان فوق الجدول؛ ده &lt;caption&gt;.`, `الـ &lt;title&gt; ده عنوان الصفحة اللي بيظهر في الـ browser tab وبيتحط في الـ head؛ عنوان الجدول هو &lt;caption&gt;.`, `الـ &lt;thead&gt; بيجمّع الـ header rows جوه الجدول؛ العنوان اللي بيظهر فوق الجدول هو &lt;caption&gt;.`, `صح. الـ &lt;caption&gt; بيعرّف table caption، وبيظهر كعنوان فوق الجدول by default (L5, Tables).`],
    [`لو حطيت style="width:70%" على &lt;table&gt; هيخلي الجدول كله 70% من عرض الصفحة، مش column واحد؛ عرض الـ column بيتحدد على &lt;th&gt; أو &lt;td&gt; من الـ cells بتاعته.`, `صح. عرض الـ column بيتحط على cell من الـ column ده، زي &lt;th style="width:70%"&gt;؛ عرض الجدول بيتحط على &lt;table&gt; وارتفاع الـ row على &lt;tr&gt; (L5, Table sizes).`, `الـ style على &lt;tr&gt; بيحدد مقاس الـ row، زي style="height:200px"؛ عرض الـ column بيتحط على &lt;th&gt; أو &lt;td&gt;.`, `الـ &lt;caption&gt; ده عنوان الجدول؛ الـ style بتاعه مابيحددش عرض الـ columns، ده بيتحط على &lt;th&gt; أو &lt;td&gt;.`],
    [`الـ &lt;ul&gt; دي unordered list، فعمرها ما بترقّم الـ items؛ الأرقام بتيجي من &lt;ol&gt;.`, `الـ square bullets بتيجي من list-style-type:square؛ الـ circle بيدّي hollow circle bullets.`, `صح. الـ list-style-type:circle بيعلّم كل item بدايرة فاضية (hollow circle)؛ والـ disc (الـ default) هو bullet مليان (L5, list-style-type).`, `إن مايبقاش فيه markers ده list-style-type:none؛ الـ circle بيدّي hollow circle bullets.`]
  ]
};


AR.web.lectures["6"] = {
  notes: [
    { h: `الـ block-level مقابل الـ inline elements` },
    { h: `الـ &lt;div&gt; والـ &lt;span&gt;`, pts: [
      `<b>&lt;div&gt;</b>: block-level element بيستخدم غالبًا كـ <b>container لـ HTML elements تانية</b>؛ مالوش attributes إجبارية (style و class و id هم الشائعين)؛ ومع الـ CSS بنستخدمه نعمل style لـ <b>blocks من المحتوى</b>.`,
      `<b>&lt;span&gt;</b>: <b>inline container</b> بنعلّم بيه جزء من نص أو document؛ ومع الـ CSS بنعمل style لـ <b>أجزاء من النص</b>: <code>My mother has &lt;span style="color:blue;font-weight:bold"&gt;blue&lt;/span&gt; eyes</code>.`,
      `كل element ليه قيمة <b>display</b> default (block أو inline)، والـ CSS يقدر يغيرها (display: block / inline / flex / grid).`
    ] },
    { h: `الـ Iframes`, pts: [
      `الـ <b>iframe</b> بيعرض web page جوه web page. الـ tag <code>&lt;iframe&gt;</code> بيحدد <b>inline frame</b>، بنستخدمه عشان نحط document تاني جوه الحالي (زي فيديوهات YouTube والخرايط).`,
      `المقاس: <code>height="200" width="300"</code> (بالـ pixels كـ default) أو بالـ CSS <code>style="height:200px;width:300px"</code>. ودايمًا حط <b>title</b> عشان الـ screen readers.`,
      `الـ iframe كـ default عليه border؛ شيله بـ <code>style="border:none;"</code> أو غيّره: <code>style="border:2px solid red;"</code>.`,
      `<b>الـ Iframe كـ target لـ link</b>: الـ attribute بتاع <b>target</b> في الـ link لازم يشاور على الـ attribute بتاع <b>name</b> في الـ iframe.`
    ] },
    { h: `مثال على الـ iframe target` },
    { h: `الـ HTML symbols (الـ entities) والـ emojis`, pts: [
      `الرموز اللي مش على الكيبورد (رياضة، تقنية، عملات) بنكتبها بـ <b>entity name</b> أو <b>entity number</b> (reference بالـ decimal أو الـ hexadecimal).`,
      `علامة الـ Euro بـ 3 طرق: <code>&amp;euro;</code>، <code>&amp;#8364;</code>، <code>&amp;#x20AC;</code>. الـ Copyright: <code>&amp;copy;</code>؛ أصغر من <code>&amp;lt;</code>؛ أكبر من <code>&amp;gt;</code>؛ الـ ampersand <code>&amp;amp;</code>؛ الـ non-breaking space <code>&amp;nbsp;</code>.`,
      `الـ Math entities: &forall; <code>&amp;forall;</code> (8704)، &part; <code>&amp;part;</code> (8706)، &exist; <code>&amp;exist;</code> (8707)، &empty; <code>&amp;empty;</code> (8709)، &nabla; <code>&amp;nabla;</code> (8711)، &isin; <code>&amp;isin;</code> (8712)، &notin; <code>&amp;notin;</code> (8713)، &ni; <code>&amp;ni;</code> (8715)، &prod; <code>&amp;prod;</code> (8719)، &sum; <code>&amp;sum;</code> (8721).`,
      `الـ <b>Emojis</b> شكلها صور، بس هي في الحقيقة <b>characters من الـ UTF-8 (Unicode) character set</b>. استخدم <code>&lt;meta charset="UTF-8"&gt;</code> و decimal reference، مثلًا <code>&amp;#128512;</code> (&#128512;)، 128516 = &#128516;، 128525 = &#128525;، 128151 = &#128151;.`
    ] },
    { h: `الـ XHTML مقابل الـ HTML`, pts: [
      `الـ <b>XHTML</b> = EXtensible HyperText Markup Language: نسخة من الـ HTML <b>أشد (stricter) ومبنية على الـ XML</b>؛ يعني HTML متعرّف كـ <b>XML application</b>؛ وكل الـ browsers الكبيرة بتدعمه.`,
      `<b>ليه XHTML؟</b> عشان الـ HTML يبقى extensible ومرن أكتر ويشتغل مع data formats تانية (XML)، وعشان الـ browsers بتطنّش الأخطاء في الـ HTML، فالـ XHTML جاي بـ <b>error handling أشد بكتير</b>.`,
      `<b>أهم الفروق</b>: (1) الـ &lt;!DOCTYPE&gt; إجباري؛ (2) الـ attribute بتاع <b>xmlns</b> في &lt;html&gt; إجباري؛ (3) &lt;html&gt; و &lt;head&gt; و &lt;title&gt; و &lt;body&gt; إجباريين؛ (4) الـ elements لازم دايمًا تبقى <b>properly nested</b>؛ (5) الـ elements لازم دايمًا تتقفل (<b>closed</b>)؛ (6) الـ elements لازم تبقى <b>lowercase</b>؛ (7) أسماء الـ attributes لازم تبقى <b>lowercase</b>؛ (8) قيم الـ attributes لازم دايمًا تبقى بين <b>quotes</b>.`,
      `حتى الـ empty elements لازم تتقفل: <code>&lt;br /&gt;</code>، <code>&lt;hr /&gt;</code>، <code>&lt;img src="happy.gif" alt="Happy face" /&gt;</code>. ومثال على nesting غلط: <code>&lt;b&gt;&lt;i&gt;Some text&lt;/b&gt;&lt;/i&gt;</code>.`
    ] },
    { h: `الـ Forms وأنواع الـ input`, pts: [
      `الـ <b>form</b> في الـ HTML بيجمع input من الـ user، وغالبًا بيتبعت لـ server عشان يتعالج. الـ <code>&lt;form&gt;</code> هو container للـ input elements: text fields، checkboxes، radio buttons، submit buttons، إلخ.`,
      `الـ <b>&lt;input&gt;</b> هو أكتر form element بيستخدم؛ وشكله بيختلف حسب الـ attribute بتاع <b>type</b>. والـ type الـ default هو <b>text</b>.`,
      `<b>type="text"</b>: text field سطر واحد. <b>type="password"</b>: نص متخبي. <b>type="radio"</b>: تختار <b>واحد بس (ONE)</b> من عدد محدود من الاختيارات (نفس الـ name بيجمعهم في group). <b>type="checkbox"</b>: تختار <b>صفر أو أكتر (ZERO or MORE)</b>. <b>type="submit"</b>: بيبعت داتا الـ form لـ <b>form-handler</b> متحدد في الـ attribute بتاع <b>action</b> في الـ form. وكمان فيه <b>button</b>، <b>reset</b>، <b>number</b>، <b>email</b>، <b>date</b>، <b>month</b> (شهر وسنة)، <b>week</b> (أسبوع وسنة)، <b>color</b> (color picker)، <b>file</b> (file-select field)، <b>image</b> (صورة كـ submit button)، <b>tel</b>، <b>range</b>.`,
      `الـ <b>&lt;label&gt;</b> بيعرّف label؛ لما تدوس على النص بتاعه بيعمل toggle للـ radio/checkbox (بيساعد الناس اللي بيلاقوا صعوبة يدوسوا على المساحات الصغيرة). خلي بالك: الـ <b>for</b> بتاع الـ label لازم يساوي الـ <b>id</b> بتاع الـ input.`,
      `الـ Form attributes: الـ <b>action</b> (الداتا هتتبعت فين، مثلًا /action_page.php)، والـ <b>method</b> (GET أو POST). controls تانية: <code>&lt;textarea&gt;</code> (نص كذا سطر)، <code>&lt;select&gt;</code> مع <code>&lt;option&gt;</code> (drop-down؛ وليه attribute اسمه <b>multiple</b>، والـ option ليها attribute اسمه <b>selected</b>)، <code>&lt;button&gt;</code>، <code>&lt;fieldset&gt;</code>.`
    ] },
    { h: `مثال على form` },
    { h: `الـ Multimedia: الـ video والـ audio`, pts: [
      `الـ Multimedia هي أي حاجة تسمعها أو تشوفها: صور، مزيكا، صوت، فيديوهات، تسجيلات، أفلام، animations. أشهر formats للفيديو: MP4، WebM، Ogg (والـ MP4 هو المُفضّل)؛ وللصوت: MP3، WAV، Ogg.`,
      `<code>&lt;video width="320" height="240" controls&gt;&lt;source src="movie.mp4" type="video/mp4"&gt;&lt;source src="movie.ogg" type="video/ogg"&gt;Your browser does not support the video tag.&lt;/video&gt;</code> (مثال على فيديو بـ 2 sources).`,
      `الـ <b>controls</b> بيضيف play و pause و volume. دايمًا حط <b>width و height</b>، وإلا الصفحة ممكن <b>ترعش (flicker)</b> وهي بتحمّل الفيديو. الـ <b>&lt;source&gt;</b> بيحط ملفات بديلة؛ والـ browser بيستخدم <b>أول format يعرفه</b>. والنص اللي بين الـ tags بيظهر بس في الـ browsers اللي مابتدعمش &lt;video&gt;.`,
      `الـ <b>autoplay</b> بيشغّله لوحده؛ وحط <b>muted</b> بعد الـ autoplay عشان يقدر يشتغل (من غير صوت). الـ <b>&lt;track&gt;</b> بيضيف subtitles (kind="subtitles").`,
      `<code>&lt;audio controls&gt;&lt;source src="horse.ogg" type="audio/ogg"&gt;&lt;source src="horse.mp3" type="audio/mpeg"&gt;...&lt;/audio&gt;</code> بيشغّل صوت.`
    ] }
  ],
  cards: [
    `بيبدأ في سطر جديد وبياخد العرض المتاح كله؛ وليه margin من فوق وتحت.`,
    `مابيبدأش في سطر جديد؛ وبياخد العرض اللي محتاجه بس.`,
    `الـ div = block container للـ elements؛ الـ span = inline container لجزء من نص.`,
    `inline frame بيحط document تاني جوه الصفحة.`,
    `style="border:none;" (بيشيل الـ border الـ default).`,
    `الـ target بتاع الـ link = الـ name بتاع الـ iframe.`,
    `&amp;euro; = &amp;#8364; = &amp;#x20AC; (name، decimal، hex).`,
    `&amp;copy; (بيطلّع علامة الـ copyright).`,
    `characters من الـ UTF-8 (Unicode) set، مش صور.`,
    `EXtensible HyperText Markup Language: نسخة HTML أشد ومبنية على الـ XML.`,
    `الـ xmlns.`,
    `لازم تتقفل: &lt;br /&gt;، &lt;hr /&gt;، &lt;img ... /&gt;.`,
    `الـ Radio: اختيار واحد بالظبط. الـ Checkbox: صفر أو أكتر.`,
    `لازم يساوي الـ id بتاع الـ input.`,
    `للـ form-handler المكتوب في الـ attribute بتاع action.`,
    `الـ text.`,
    `&lt;textarea&gt; (نص كذا سطر).`,
    `&lt;select&gt; ومعاه &lt;option&gt;.`,
    `الـ controls (play، pause، volume).`,
    `عشان من غيرهم الصفحة ممكن تعمل flicker وهي بتحمّل.`
  ],
  qa: [
    `الـ <b>block-level</b> element دايمًا بيبدأ في سطر جديد، وبياخد العرض المتاح كله (100% من الـ parent)، وبيقبل width/height، وليه margins من فوق وتحت؛ مثال: &lt;div&gt; (وكمان &lt;p&gt;، &lt;h1&gt;، &lt;ul&gt;، &lt;table&gt;، &lt;form&gt;). الـ <b>inline</b> element مابيبدأش في سطر جديد، وبياخد العرض اللي محتاجه بس، وبيطنّش الـ width/height، ومالوش margin من فوق وتحت؛ مثال: &lt;span&gt; (وكمان &lt;a&gt;، &lt;b&gt;، &lt;img&gt;، &lt;input&gt;). مثال: <code>&lt;div style="border:1px solid black"&gt;Hello&lt;/div&gt;</code> بيمتد على السطر كله، لكن <code>&lt;span style="border:1px solid black"&gt;Hello&lt;/span&gt;</code> بيلف حوالين الكلمة بس.`,
    `الـ XHTML نسخة أشد من الـ HTML ومبنية على الـ XML (HTML متعرّف كـ XML application) وفيها error handling صارم، لكن الـ browsers بتعدّي أخطاء الـ HTML. في الـ XHTML: الـ &lt;!DOCTYPE&gt; إجباري؛ الـ attribute بتاع xmlns في &lt;html&gt; إجباري؛ &lt;html&gt; و &lt;head&gt; و &lt;title&gt; و &lt;body&gt; إجباريين؛ الـ elements لازم تبقى properly nested؛ الـ elements لازم دايمًا تتقفل (حتى الفاضية: &lt;br /&gt;)؛ أسماء الـ elements لازم lowercase؛ أسماء الـ attributes لازم lowercase؛ وقيم الـ attributes لازم تبقى بين quotes.`,
    `الـ form (&lt;form&gt;) بيجمع input من الـ user، وغالبًا بيتبعت لـ server. الـ Attributes: <b>action</b> (الـ URL بتاع الـ form-handler، مثلًا /action_page.php)، <b>method</b> (الـ GET بيلزق الداتا في الـ URL؛ والـ POST بيبعتها في الـ request body)، name، target. أنواع الـ input: text (سطر واحد)، password، radio (اختيار واحد، بيتجمعوا بالـ name)، checkbox (صفر أو أكتر)، submit (بيبعت الداتا)، reset، button، number، email، date، color، file، image، tel. controls تانية: &lt;label for="id"&gt;، &lt;textarea&gt;، &lt;select&gt;/&lt;option&gt;، &lt;button&gt;.`,
    `استخدم &lt;video width="320" height="240" controls&gt; وجواه &lt;source src="movie.mp4" type="video/mp4"&gt; واحد أو أكتر. الـ controls بيضيف play/pause/volume؛ الـ width والـ height بيمنعوا الـ flicker وقت التحميل؛ الـ browser بيستخدم أول source format يعرفه؛ النص اللي بين الـ tags بيظهر في الـ browsers اللي مابتدعمش الـ video؛ الـ autoplay (مع muted) بيشغّله لوحده؛ و &lt;track&gt; بيضيف subtitles. والصوت بنفس الطريقة بـ &lt;audio controls&gt;.`,
    `الـ characters اللي مش على الكيبورد بتتكتب كـ entities: يا entity name (&amp;euro;، &amp;copy;، &amp;forall;، &amp;sum;) يا entity number بالـ decimal (&amp;#8364;) أو بالـ hexadecimal (&amp;#x20AC;). الـ Emojis هي Unicode (UTF-8) characters مش صور؛ اعمل declare لـ &lt;meta charset="UTF-8"&gt; واكتب الـ decimal reference بتاعها، مثلًا &amp;#128512;.`
  ],
  quiz: [
    [`الـ type="text" (وده الـ default) بيدّيك text field سطر واحد؛ الصندوق اللي اليوزر بيعلّم عليه ده type="checkbox".`, `الـ textarea element لوحده، مش input type.`, `صح. بيخلي الـ user يختار صفر أو أكتر من الاختيارات.`, `الـ type="button" بيدّيك push button بيتداس عليه ومابيعملش حاجة لوحده؛ الصندوق اللي بيتعلّم عليه ده type="checkbox".`],
    [`غلط: الـ block-level elements دايمًا بتبدأ في سطر جديد وبتاخد العرض كله؛ الـ inline elements هي اللي مابتبدأش في سطر جديد.`, `صح. الـ inline elements هي اللي مابتبدأش في سطر جديد.`],
    [`صح (الجملة دي غلط، فهي مش فرق): الـ XHTML بيتبعت كـ application/xhtml+xml.`, `ده فرق حقيقي (الـ XHTML لازم lowercase).`, `ده مذكور كفرق (الـ XML أشد في موضوع الـ escaping).`, `ده فرق حقيقي (الـ HTML بيتبعت كـ text/html والـ XHTML كـ application/xhtml+xml)، فمينفعش يبقى إجابة "NOT a difference".`],
    [`الـ &lt;track&gt; ده HTML5 tag بيضيف subtitles للفيديو (kind="subtitles")، يعني tag حقيقي.`, `الـ &lt;video&gt; ده HTML5 tag لتشغيل ملفات الفيديو بالـ controls، يعني tag حقيقي.`, `صح. مفيش حاجة اسمها &lt;slider&gt; (استخدم input type="range").`, `الـ &lt;source&gt; ده HTML5 tag بيحط ملفات media بديلة جوه الـ &lt;video&gt; أو الـ &lt;audio&gt;، يعني tag حقيقي.`],
    [`صح. الـ &lt;video&gt; بيعمل embed لمحتوى فيديو، زي &lt;video width="320" height="240" controls&gt; وجواه ملفات &lt;source&gt; (L6, Multimedia).`, `مفيش element اسمه &lt;movie&gt; في الـ HTML؛ محتوى الفيديو أو الفيلم بيتحط بالـ &lt;video&gt;.`, `الـ &lt;audio&gt; بيشغّل صوت بس (MP3 وWAV وOgg)؛ الفيديو بيستخدم &lt;video&gt;.`, `مفيش element اسمه &lt;media&gt; في الـ HTML؛ الفيديو بيتحط بالـ &lt;video&gt;.`],
    [`صح. الـ &lt;textarea&gt;&lt;/textarea&gt; ده form element لوحده بيعرّف text input كذا سطر (L6, Forms).`, `مفيش element اسمه &lt;text&gt; في الـ HTML؛ الـ text area كذا سطر هي &lt;textarea&gt;&lt;/textarea&gt;.`, `الـ &lt;input type="text"&gt; بيدّيك text field سطر واحد بس؛ لو عايز كذا سطر محتاج &lt;textarea&gt;.`, `الـ textarea مش قيمة من قيم الـ type attribute بتاع الـ input؛ ده element لوحده: &lt;textarea&gt;&lt;/textarea&gt;.`],
    [`الـ &lt;input&gt; بيعمل fields وboxes وbuttons حسب الـ type بتاعه، لكن مش drop-down list؛ دي الـ &lt;select&gt;.`, `صح. الـ &lt;select&gt; وجواه &lt;option&gt; children بيعرّف drop-down list؛ والـ multiple بيسمح بكذا اختيار (L6, Forms).`, `مفيش element اسمه &lt;text&gt; في الـ HTML؛ الـ drop-down list هي &lt;select&gt; وجواها &lt;option&gt; items.`, `الـ &lt;textarea&gt; ده text input كذا سطر، مش قايمة اختيارات؛ الـ drop-down هي &lt;select&gt;.`],
    [`الـ &lt;samp&gt; بيعلّم على sample output طالع من برنامج؛ عشان تعمل embed لفيديو YouTube بتستخدم &lt;iframe&gt;.`, `الـ &lt;small&gt; بيصغّر النص بس؛ فيديوهات YouTube بتتحط بـ &lt;iframe&gt;.`, `الـ &lt;frame&gt; ده تبع الـ frameset layout القديم (obsolete)؛ الـ embed بتاع YouTube بيستخدم &lt;iframe&gt;.`, `صح. الـ &lt;iframe&gt; (inline frame) بيحط document تاني جوه الصفحة، وبكده بنعمل embed لفيديوهات YouTube والـ maps (L6, Iframes).`],
    [`صح. الـ border اختياري (وكمان obsolete؛ استخدم الـ CSS border).`, `الـ width بيحدد مقاس الـ frame (بالـ pixels by default) وغالبًا بيتكتب، فمش هو اللي مش محتاجينه؛ اللي مش أساسي هو الـ frameborder.`, `الـ height بيحدد مقاس الـ frame (بالـ pixels by default) وغالبًا بيتكتب، فمش هو اللي مش محتاجينه؛ اللي مش أساسي هو الـ frameborder.`, `الـ src أساسي: ده عنوان الـ document اللي الـ iframe بيعرضه؛ من غيره الـ frame بيبقى فاضي.`],
    [`الـ &amp;gt; هو الـ entity بتاع علامة أكبر من &gt;؛ علامة الـ copyright هي &amp;copy;.`, `الـ &amp;amp; هو الـ entity بتاع الـ ampersand &amp;؛ علامة الـ copyright هي &amp;copy;.`, `الـ &amp;lt; هو الـ entity بتاع علامة أصغر من &lt;؛ علامة الـ copyright هي &amp;copy;.`, `صح. الـ entity name &amp;copy; بيعرض علامة الـ copyright &copy;، ودي علامة مش موجودة على الكيبورد (L6, HTML symbols).`],
    [`مفيش element اسمه &lt;css&gt;؛ الـ CSS بيتكتب في &lt;style&gt; أو ملف .css. والرسم بيستخدم &lt;canvas&gt;.`, `مفيش element اسمه &lt;paint&gt; في الـ HTML؛ الـ graphics بتترسم على element &lt;canvas&gt; بالـ JavaScript.`, `صح. الـ &lt;canvas&gt; مساحة رسم للـ graphics (بترسم فيها بالـ JavaScript)؛ والمحاضرة حاطاه ضمن الـ block-level elements (L6).`, `مفيش element اسمه &lt;graphic&gt; في الـ HTML؛ الـ canvas graphics بتستخدم &lt;canvas&gt;.`],
    [`الـ &lt;address&gt; مالوش دعوة بالـ IP addresses بتاعة الـ network؛ ده بيشيل بيانات التواصل مع الـ author أو صاحب المحتوى.`, `ضيقة أوي: الـ &lt;address&gt; بيشيل بيانات التواصل مع الـ author بشكل عام (e-mail أو تليفون أو URL أو عنوان بريدي)، مش عنوان البيت بس.`, `الـ URL لوحده مش هو الغرض منه؛ الـ &lt;address&gt; معمول لبيانات التواصل مع الـ author أو صاحب المحتوى.`, `صح. الـ &lt;address&gt; بيعرّف بيانات التواصل مع الـ author أو صاحب الـ document أو الـ article؛ وهو block-level element (L6, Sheet 1).`],
    [`الـ type بيحدد نوع الـ &lt;input&gt; (text, radio...)؛ مابيميّزش الـ element بشكل unique.`, `الـ &lt;article&gt; ده HTML element (جزء محتوى block-level)، مش attribute.`, `صح. الـ id attribute بيدّي الـ element اسم unique، وبيستخدمه الـ CSS #id selector والـ label for والـ JavaScript getElementById (L4, L6).`, `الـ class ممكن عناصر كتير تشترك فيه (وبتختارهم بـ .c1)، فمش unique identifier؛ الـ id هو اللي unique.`],
    [`صح. لو ماكتبتش type، الـ &lt;input&gt; بيبقى text field سطر واحد، لأن الـ default type هو text (L6, Forms).`, `الـ type="password" (نص مستخبي) لازم تكتبه صريح؛ لو الـ type مش مكتوب الـ input بيبقى text.`, `"Numerals" مش الـ default (فيه type="number" بس لازم تكتبه)؛ الـ default type هو text.`, `"Special Characters" مش input type أصلًا؛ الـ default type بتاع الـ &lt;input&gt; هو text.`],
    [`صح. الـ &lt;input type="file"&gt; بيعرض file-select field فيه زرار Browse، وبيتستخدم في رفع الملفات (L6, Forms).`, `الـ type="checkbox" بيخلي اليوزر يعلّم على صفر أو أكتر من الاختيارات؛ مابيختارش file.`, `الـ type="button" ده button عادي بيتداس عليه؛ الـ file-select field هو type="file".`, `الـ type="text" ده text field سطر واحد؛ الـ file-select field هو type="file".`],
    [`الـ background image بتاعة الصفحة أو أي element بتتحط بالـ CSS property اسمها background-image، مش بـ input.`, `صح. &lt;input type="image" src="..."&gt; بيعمل submit للـ form.`, `عرض صورة في أي حتة في الصفحة ده شغل الـ &lt;img&gt;؛ الـ input type="image" بيشتغل كـ submit button.`, `الـ input type="image" بيعرض الصورة اللي انت حاططها في الـ src، مش صورة default، ولما تدوس عليها بتعمل submit للـ form.`],
    [`الـ type="month" بيخلي اليوزر يختار شهر ومعاه السنة (زي 2025-05)، مش الشهر لوحده.`, `صح. الـ &lt;input type="month"&gt; بيخلي اليوزر يختار شهر وسنة، وبيتبعت بالشكل YYYY-MM (Sheet 1, input types).`, `التاريخ الكامل (يوم وشهر وسنة) ده type="date"؛ الـ type="month" بيختار شهر وسنة بس.`, `التاريخ مع الوقت ده type="datetime-local"؛ الـ type="month" بيختار شهر وسنة بس.`],
    [`الـ input اللي type بتاعه text ده field سطر واحد، فمينفعش ياخد كذا سطر؛ ده شغل الـ &lt;textarea&gt;.`, `صح. الـ &lt;textarea&gt; بيعرّف text input control كذا سطر، عكس الـ &lt;input type="text"&gt; اللي سطر واحد (L6, Forms).`, `الـ type="submit" ده button بيبعت داتا الـ form للـ form-handler؛ مش text input.`, `الـ radio button بيختار واحد من عدد محدود من الاختيارات؛ مابياخدش نص بيتكتب.`],
    [`الـ name بيتستخدم مع الـ radio buttons فعلًا: الـ radios اللي ليها نفس الـ name بتعمل group واحد ومينفعش تختار منه غير واحد.`, `الـ value بيتستخدم مع الـ radio buttons فعلًا: ده الداتا اللي بتتبعت للـ server للاختيار اللي اتعلّم عليه.`, `الـ checked بيتستخدم مع الـ radio buttons فعلًا: بيختار واحد منهم مسبقًا أول ما الصفحة تفتح.`, `صح. الـ selected بتاع الـ &lt;option&gt; جوه &lt;select&gt;.`],
    [`صح. لما تضيف الـ multiple attribute للـ &lt;select&gt; اليوزر يقدر يختار أكتر من option (L6, Forms).`, `الـ selected ده تبع الـ &lt;option&gt; وبيختارها مسبقًا؛ مابيسمحش بكذا اختيار.`, `الـ name بيدّي الـ field الاسم اللي بيتبعت للـ server؛ مابيسمحش بكذا اختيار.`, `الـ value هي الداتا اللي بتتبعت للـ &lt;option&gt;؛ مابتخليش الـ &lt;select&gt; يقبل كذا اختيار.`],
    [`الـ src هو الصفحة اللي الـ iframe بيعرضها في الأول؛ الـ target بتاع الـ link لازم يساوي الـ name بتاع الـ iframe، زي name="iframe_a".`, `القاعدة في المحاضرة إن الـ target بيشاور على الـ name attribute بتاع الـ iframe، مش الـ id: target="iframe_a" مع name="iframe_a".`, `صح. target="iframe_a" مع &lt;iframe name="iframe_a"&gt;.`, `الـ title بيوصف الـ iframe للـ screen readers؛ الـ links بتتوجّه للـ iframe عن طريق الـ name attribute بتاعه.`],
    [`في الـ XHTML كل element لازم يتقفل، حتى الـ empty elements، فلازم تتكتب &lt;br /&gt;.`, `صح. الـ XHTML أشد من الـ HTML: قيم الـ attributes لازم دايمًا تبقى بين quotes، ودي واحدة من الـ 8 فروق الأساسية (مع الأسماء الـ lowercase والـ elements المقفولة والمتداخلة صح) (L6, XHTML).`, `الـ XHTML بيطلب أسماء الـ elements تبقى lowercase، فالـ &lt;BODY&gt; مش مسموح؛ لازم &lt;body&gt;.`, `في الـ XHTML الـ &lt;!DOCTYPE&gt; إجباري، وده أول فرق عن الـ HTML في المحاضرة.`]
  ],
  extra: [
    [`الـ &lt;div&gt; هو الـ block-level container المعتاد: بيبدأ في سطر جديد وبياخد العرض كله.`, `صح. الـ &lt;a&gt; ده inline element: مابيبدأش في سطر جديد وعرضه على قد المحتوى بتاعه بس (L6, Block vs inline table).`, `الـ &lt;table&gt; ده block-level: بيبدأ في سطر جديد وبياخد العرض المتاح.`, `الـ headings &lt;h1&gt;–&lt;h6&gt; كلها block-level: كل واحد بيبدأ في سطر جديد.`],
    [`الـ &lt;span&gt; بيبقى inline by default، والـ inline elements مابتقبلش width ولا height، فمش هيبقى عرضه 300px.`, `إنك تحط width مابيغيرش قيمة الـ display؛ الـ span لسه inline، فبيفضل في نفس السطر.`, `الـ browsers مابتطلّعش errors للـ CSS؛ أي declaration مش بتنطبق، زي width على inline element، بتتجاهل وخلاص.`, `صح (جدول L6: الـ width/height مش مسموحين للـ inline).`],
    [`صح: entity name، و decimal، و hexadecimal.`, `الـ &amp;eur; مش هو الـ entity name (الصح &amp;euro;)، والـ hexadecimal reference محتاج x: &amp;#x20AC;.`, `الـ decimal والـ hex متبدلين: الرقم الـ decimal هو 8364 (&amp;#8364;) والـ hex هو 20AC (&amp;#x20AC;).`, `الـ &amp;EUR; مش اسم valid (أسماء الـ entities case sensitive: &amp;euro;)، والـ &amp;#128512; ده الـ emoji &#128512;، مش علامة اليورو.`],
    [`الـ XHTML بيطلب أسماء الـ elements والـ attributes تبقى lowercase وبيقفل الـ empty elements، فلازم تبقى &lt;img src="a.png" alt="a" /&gt;.`, `القيم لازم بين quotes والـ element لازم يتقفل.`, `صح. lowercase، القيم بين quotes، والـ empty element متقفل.`, `الـ &lt;img&gt; ده empty element بيتقفل بـ /&gt;، والـ end tag الكابيتال &lt;/IMG&gt; بيكسر قاعدة الـ lowercase.`],
    [`الـ ids لازم تبقى unique في الصفحة، فمينفعش 3 inputs يشتركوا في id واحد؛ الـ radios بتتجمّع لما تشترك في نفس الـ name.`, `كل value لازم تختلف عشان تفرّق بين الاختيارات.`, `صح. الـ radios اللي ليها نفس الـ name بتبقى group واحد.`, `كل label بيوصف الاختيار بتاعه (Small وMedium وLarge)، فالنصوص مختلفة؛ التجميع جاي من الـ name المشترك.`],
    [`صح. لما تدوس على الـ label بيعمل toggle/focus للـ input.`, `الـ &lt;label&gt; مالوش name attribute يتربط بيه؛ بيتربط عن طريق الـ for attribute بتاعه اللي بيساوي الـ id بتاع الـ input.`, `ده بالعكس: الـ for attribute بيبقى على الـ label والـ id على الـ input (label for = input id).`, `إنك تحطهم في نفس السطر مابيربطهمش ببعض؛ الربط بيبقى label for = input id.`],
    [`الـ GET بيحط داتا الـ form، والـ password معاها، في الـ URL، فتبقى باينة وبتتخزن في الـ history؛ الـ login لازم يستخدم POST.`, `صح. مع method="post" الداتا بتتبعت في الـ HTTP request body ومش بتظهر في الـ URL، فالـ password مش بيبان (L6, Forms; L10, GET vs POST).`, `الـ GET URL بيشيل الداتا، فالـ bookmark هيخزن الـ password كـ plain text؛ داتا الـ login لازم تتبعت بـ POST.`, `من غير method الـ form برضه بيبعت الداتا، بس بيستخدم GET by default، وده بيحط الـ password في الـ URL.`],
    [`النص ده مش caption؛ الـ captions والـ subtitles بتتضاف بالـ &lt;track&gt;. النص اللي جوه ده fallback message.`, `مفيش حاجة بتظهر لما الفيديو يخلص؛ النص اللي جوه ده fallback بيظهر بس في الـ browsers اللي مابتدعمش &lt;video&gt;.`, `النص ده مش رسالة loading؛ بيظهر بس في الـ browsers اللي مابتدعمش الـ &lt;video&gt; element.`, `صح. النص اللي بين &lt;video&gt; و&lt;/video&gt; بيظهر بس في الـ browsers اللي مابتدعمش الـ video element (L6, Multimedia).`],
    [`الـ controls بيضيف زراير play وpause والـ volume بس؛ اليوزر لسه لازم يدوس play.`, `صح. حط muted بعد autoplay عشان الفيديو يقدر يشتغل لوحده.`, `الـ start="0" مش attribute تبع الـ &lt;video&gt;؛ الفيديو بيشتغل لوحده بالـ autoplay مع الـ muted.`, `الـ loop بيخلي الفيديو يعيد بعد ما يخلص، بس مابيشغّلوش؛ ده محتاج autoplay (مع muted).`],
    [`صح. الـ iframe ليه border by default؛ والمحاضرة بتشيله بالـ CSS style="border:none;" (أو بتغيره، زي 2px solid red) (L6, Iframes).`, `الـ border="hidden" مش الطريقة اللي في المحاضرة؛ الـ border بتاع الـ iframe بيتشال بالـ CSS: style="border:none;".`, `الـ frame="0" مش iframe attribute valid؛ الـ border بيتشال بـ style="border:none;".`, `الـ outline ده خط تاني بيترسم برا الـ border، فلو شلته الـ border هيفضل؛ استخدم style="border:none;".`]
  ]
};


AR.web.lectures["7"] = {
  notes: [
    { h: `الـ HTML والـ CSS والـ JS بيكمّلوا بعض إزاي` },
    { h: `التاريخ`, pts: [
      `الـ JavaScript اتقدمت كجزء من browser الـ <b>Netscape 2.0</b>. ومايكروسوفت طلّعت نسخة خاصة بيها اسمها <b>JScript</b>.`,
      `الـ <b>ECMA</b> عملت لغة standard اسمها <b>ECMAScript</b>؛ والـ <b>ECMAScript Edition 6 (ES6)</b> مدعومة في كل حتة وهي اللي بنسميها عادةً "JavaScript".`,
      `<b>JavaScript = ECMAScript + DOM API</b> (يعني الـ language specification + التواصل مع الـ HTML). الـ Timeline: JavaScript 1.0، ES1، ES2، ES3، AJAX، jQuery، ES5، ES6، ES7.`,
      `الـ JavaScript أشهر programming language في العالم وهي <b>لغة البرمجة بتاعة الـ Web</b>؛ بتستخدم في الألعاب والـ desktop والـ mobile applications. وعادةً بتتصنف إنها لغة <b>object-oriented</b> (prototype-based).`
    ] },
    { h: `مميزات الـ JavaScript`, pts: [
      `<b>تعامل أقل مع الـ server</b>: بتعمل validate للـ input بتاع الـ user قبل ما الصفحة تتبعت للـ server؛ فبتوفر traffic وبتقلل الـ load على الـ server.`,
      `<b>Feedback فوري للزوار</b>: مش لازم يستنوا الصفحة تعمل reload عشان يعرفوا إنهم نسيوا يدخلوا حاجة.`,
      `<b>Interactivity أكتر</b>: interfaces بتتفاعل لما الـ user يعدّي بالـ mouse أو يشغّلها من الـ keyboard.`,
      `<b>Interfaces أغنى</b>: الـ drag-and-drop components والـ sliders بيدّوا interface غني.`
    ] },
    { h: `العيوب والخصائص`, pts: [
      `الـ JavaScript ماينفعش نعتبرها programming language كاملة. ناقصها: (1) الـ client-side JS <b>مش بتسمح بقراية أو كتابة files</b> (ده متعمد عشان الـ security)؛ (2) <b>ماينفعش تستخدمها في networking applications</b> (مفيش دعم ليها)؛ (3) <b>مفيهاش multithreading ولا multiprocessor capabilities</b>.`,
      `هي لغة <b>lightweight و interpreted</b> بتضيف interactivity لصفحات HTML اللي لولاها كانت static.`,
      `الـ JavaScript <b>مش محتاجة compile</b>؛ هي <b>interpreted</b>. الـ JS interpreter ده software شغال جوه الـ browser بيقرا الـ JavaScript وينفذه.`
    ] },
    { h: `إزاي تحط الـ JS جوه الـ HTML`, pts: [
      `استخدم الـ tag <code>&lt;script&gt;</code> في الـ <code>&lt;head&gt;</code> أو الـ <code>&lt;body&gt;</code>.`,
      `<b>الـ functions والـ code اللي ممكن يتنفذ كذا مرة</b> مكانهم الـ <b>&lt;head&gt;</b>؛ وبيتعملهم interpret بس لما الـ function أو الـ event-handler يتنادى.`,
      `<b>الـ code اللي بيتنفذ مرة واحدة بس</b> لما الـ document يتحمّل أول مرة مكانه الـ <b>&lt;body&gt;</b>.`,
      `الـ JS ممكن تبقى في <b>external file (.js)</b> لوحدها، وتضمّنها بالـ attribute <b>src</b>: <code>&lt;script src="file.js"&gt;&lt;/script&gt;</code>.`,
      `Lab 7: تلات أماكن: <b>inline</b> (<code>&lt;button onclick="alert('Hi')"&gt;</code>)، <b>internal</b> (block &lt;script&gt;)، <b>external</b> (ملف .js).`,
      `محتوى الـ <code>&lt;noscript&gt;</code> بيظهر بس في الـ browsers اللي مش بتشغّل JavaScript.`
    ] },
    { h: `الـ Variables`, pts: [
      `الـ Variables هي containers بنخزن فيها قيم الداتا. وهي <b>loosely typed</b>: النوع بيتحدد <b>dynamically</b> من القيمة المتخزنة؛ والـ operator <b>typeof</b> بيقولك النوع.`,
      `بتتعرّف بـ <b>var</b> أو <b>let</b> أو <b>const</b>. الـ <b>var</b> ليها function/global scope؛ الـ <b>let</b> والـ <b>const</b> ليهم <b>block scope</b>؛ والـ <b>const</b> بتعرّف constant ماينفعش تعمله reassign. أي declaration برا أي function بيبقى <b>global</b>؛ وجوه الـ function بيبقى <b>local</b>.`,
      `لو اتعرّف ومتدّلوش قيمة = <b>undefined</b>. (الـ slide بتقول "used and not declared or initialized have value null"؛ بس في الـ JS الحقيقية لو قريت variable مش متعرّف بيطلع <b>ReferenceError</b>.)`,
      `الأسامي بتبدأ بـ <b>حرف أو $ أو _</b>، وبعدها حروف أو $ أو _ أو أرقام؛ وهي <b>case sensitive</b>؛ وماينفعش تبقى reserved word (فـ <code>_myVariable</code> صح، لكن <code>123variable</code> و<code>break</code> غلط).`,
      `الأنواع اللي الـ variable ممكن يشيلها: String، Number، Undefined، Null، Objects (ومنها الـ arrays)، Symbols، Functions (وكمان Boolean وBigInt).`,
      `نتايج الـ <b>typeof</b>: <code>typeof "a"</code> = "string"، <code>typeof 5</code> = "number"، <code>typeof true</code> = "boolean"، <code>typeof undefined</code> = "undefined"، <code>typeof null</code> = "object"، <code>typeof [1,2,3]</code> = "object"، <code>typeof NaN</code> = "number"، <code>typeof function(){}</code> = "function"، <code>typeof typeof 1</code> = "string".`
    ] },
    { h: `الـ Expressions والـ comments`, pts: [
      `لو الـ operator هو <b>+</b> وواحد من الـ operands <b>string</b>، الـ + بتتحول لـ <b>string concatenation</b> والـ operand التاني بيتحول لـ string: <code>5 + "9"</code> = "59".`,
      `الـ Comments: <code>// single-line</code> و<code>/* multi-line */</code> (زي الـ Java بالظبط). افتكر: الـ HTML <code>&lt;!-- --&gt;</code>؛ والـ CSS/JS <code>/* */</code>.`
    ] },
    { h: `أربع طرق للـ output` },
    { h: `مثال: الـ input validation (Example 5)` },
    { h: `الوصول للـ elements (الـ DOM، Lab 8)`, pts: [
      `الـ <b>DOM</b> (Document Object Model) ده standard من الـ W3C؛ الـ HTML DOM بيعرّف الـ HTML elements كـ <b>objects</b>، وليها <b>properties</b>، و<b>methods</b> للوصول ليها، و<b>events</b>. أجزاؤه: Core DOM، XML DOM، HTML DOM.`,
      `طرق الوصول: <code>document.getElementById("id")</code>، <code>document.getElementsByClassName("c")</code>، <code>document.getElementsByTagName("p")</code>، <code>document.querySelector("css")</code>.`,
      `ممكن تربط الـ events بـ <code>element.addEventListener(event, function, useCapture)</code>.`
    ] }
  ],
  cards: [
    `الـ JavaScript (الـ HTML = المحتوى، الـ CSS = الشكل/الـ presentation).`,
    `يعني ECMAScript + DOM API.`,
    `الـ Netscape 2.0 (ونسخة مايكروسوفت اسمها JScript).`,
    `تعامل أقل مع الـ server، feedback فوري، interactivity أكتر، interfaces أغنى.`,
    `مفيش قراية/كتابة files (عشان الـ security)، مفيش networking applications، مفيش multithreading/multiprocessor.`,
    `لأ، هي interpreted، بيشغّلها interpreter جوه الـ browser.`,
    `في الـ &lt;head&gt;.`,
    `في الـ &lt;body&gt;.`,
    `بالـ attribute src: &lt;script src="file.js"&gt;&lt;/script&gt;`,
    `الـ JS بتحدد نوع الـ variable من القيمة اللي متخزنة فيه.`,
    `القيمة بتبقى undefined.`,
    `حرف أو $ أو _.`,
    `الـ keyword هي const.`,
    `بيدّي "object" (غلطة تاريخية في اللغة).`,
    `"59" (لأن فيه string، فالـ + بتعمل string concatenation).`,
    `innerHTML، document.write()، window.alert()، console.log().`,
    `بيمسح كل الـ HTML اللي موجود.`,
    `محتوى بيظهر في الـ browsers اللي مش بتشغّل JavaScript.`
  ],
  qa: [
    `<b>المميزات</b>: (1) تعامل أقل مع الـ server: الـ input بيتعمله validate قبل ما الصفحة تتبعت للـ server، فبنوفر traffic و load على الـ server. (2) Feedback فوري للزوار من غير ما يستنوا reload للصفحة. (3) Interactivity أكتر: الـ interfaces بتتفاعل مع الـ mouse hover أو الـ keyboard. (4) Interfaces أغنى: drag-and-drop components و sliders.<br><b>العيوب</b>: مش لغة كاملة (full-fledged): (1) الـ client-side JS ماتقدرش تقرا أو تكتب files (عشان الـ security)؛ (2) ماينفعش تستخدم في networking applications؛ (3) مفيهاش multithreading ولا multiprocessor capabilities. هي لغة lightweight و interpreted بتضيف interactivity لصفحات HTML الـ static.`,
    `(1) Inline: جوه event attribute، زي &lt;button onclick="alert('Hi')"&gt;. (2) Internal: جوه &lt;script&gt;...&lt;/script&gt; في الـ &lt;head&gt; (الـ functions والـ code اللي ممكن يتنفذ كذا مرة، وبيتعمله interpret لما يتنادى) أو في الـ &lt;body&gt; (code بيتنفذ مرة واحدة لما الـ document يتحمّل). (3) External: ملف .js منفصل بتضمّنه بـ &lt;script src="file.js"&gt;&lt;/script&gt;؛ وده كويس للـ reuse والـ caching.`,
    `الـ innerHTML بيكتب جوه HTML element (document.getElementById("demo").innerHTML = "Hello")؛ الـ document.write() بيكتب في الـ HTML output وهي بتتحمّل (ولو بعد التحميل بيمسح الصفحة)؛ الـ window.alert() بيطلّع alert box؛ والـ console.log() بيكتب في الـ console بتاع الـ browser عشان الـ debugging.`,
    `الـ Variables هي containers للداتا بتتعرّف بـ var (global/function scope)، أو let (block scope)، أو const (block scope وماينفعش تتعملها reassign). الـ JS لغة loosely typed: النوع بيتحدد dynamically من القيمة المتخزنة وتقدر تعرفه بـ typeof. الـ variable اللي اتعرّف ومتدّلوش قيمة بيبقى undefined. الـ declarations برا الـ functions بتبقى global، وجواها local. الأسامي بتبدأ بحرف أو $ أو _، وممكن يبقى فيها أرقام بعد كده، وهي case sensitive وماينفعش تبقى reserved words.`,
    `الـ Client-side scripts (JavaScript، VBScript) بيشغّلها الـ browser على جهاز الـ user بعد ما الصفحة توصل؛ بتتفاعل مع الـ input بتاع الـ user، وردها سريع، والـ user ممكن يعملها block، وماتقدرش توصل للـ database أو الـ file system بتاع الـ server. الـ Server-side scripts (PHP، JSP، ASP، ASP.NET، Ruby، Perl، Python) بيشغّلها الـ web server عشان يبني الصفحة قبل ما يبعتها؛ بتوصل للـ databases وملفات الـ server، والـ user مايقدرش يعملها block أو يشوفها، وردها أبطأ عشان الـ processing بيحصل بعيد (remote).`
  ],
  quiz: [
    [`صح. حسب الـ MCQ sheet بتاعة الدكتور وإجابات الطلبة: الـ JavaScript لغة object-oriented (prototype-based).`, `فيه كتب بتسميها object-based، بس إجابة الـ sheet بتاعة الكورس هي Object-Oriented.`, `الـ JS بتدعم الـ procedural style، بس مش بتتصنف إنها procedural language.`, `غلط، لأن الـ MCQ sheet والـ keys بتاعة الكورس بيدّوا إجابة موجودة في الاختيارات: الـ JavaScript لغة object-oriented (prototype-based).`],
    [`الـ document.write() فعلًا طريقة من طرق الـ output، بس الـ console.log() والـ window.alert() كمان طرق، فالإجابة الكاملة هي "All of the above".`, `الـ console.log() طريقة output (بتكتب في الـ console)، بس الـ document.write() والـ window.alert() كمان طرق، فالإجابة هي "All of the above".`, `الـ window.alert() طريقة output (بتطلّع alert box)، بس الـ document.write() والـ console.log() كمان طرق، فالإجابة هي "All of the above".`, `صح. كلهم output methods في الـ JS (ومعاهم الـ innerHTML).`],
    [`الـ getElementById() فعلًا بيوصل للـ elements، بس الـ getElementsByClassName() كمان بيوصل، فالإجابة الكاملة هي "Both A and B".`, `الـ getElementsByClassName() فعلًا بيوصل للـ elements، بس الـ getElementById() كمان بيوصل، فالإجابة الكاملة هي "Both A and B".`, `صح. الاتنين HTML DOM access methods: الـ getElementById("id") بيرجّع element واحد، والـ getElementsByClassName("c") بيرجّع كل الـ elements اللي واخدة الـ class ده (L7, Accessing elements).`, `غلط، لأن الـ getElementById() والـ getElementsByClassName() الاتنين DOM methods بنوصل بيهم للـ HTML elements.`],
    [`صح. قيمته ماينفعش يتعملها reassign بعد كده.`, `الـ var بيعرّف variable عادي (function أو global scope) وقيمته ممكن تتغير؛ الـ constant محتاج const.`, `بتعرّف variable ليه block scope وقيمته ممكن تتغير.`, `الـ constant مش keyword في الـ JavaScript أصلًا؛ الـ constants بتتعرّف بـ const.`],
    [`ده كمان صح في الـ JS (multi-line)، بس الإجابة المتوقعة في الـ key هي الـ single-line.`, `صح حسب الـ key. الـ // بيبدأ single-line comment في الـ JavaScript زي الـ Java بالظبط، والـ /* */ هو شكل الـ multi-line (L7, Comments).`, `الـ # ده comment marker في الـ PHP (والـ Python)، مش في الـ JavaScript؛ الـ comments فيها // و /* */.`, `علامات الـ $ مش بتعمل comments؛ الـ $ مجرد حرف مسموح بيه في أسماء الـ variables. الـ comments في الـ JS هي // و /* */.`],
    [`الـ var صح، بس الـ let (والـ const) كمان بيعرّفوا variables، فالإجابة الكاملة هي "Both A and B".`, `الـ let صح، بس الـ var كمان بيعرّف variables، فالإجابة الكاملة هي "Both A and B".`, `صح. الـ variables بتتعرّف بـ var (function/global scope) أو let (block scope)؛ والـ const بيعرّف constants (L7, Variables).`, `غلط، لأن الـ var والـ let الاتنين keywords بنعرّف بيهم variables في الـ JavaScript.`],
    [`الـ empty statement (يعني ; لوحدها) ده JavaScript legal عادي، فمفيش error بيطلع؛ الـ interpreter بيعدّيه وخلاص.`, `صح. الـ empty statement، اللي هو semicolon لوحده، مش بيعمل حاجة، فالـ interpreter بيتجاهله ويكمّل (JavaScript MCQ Sheet).`, `مفيش warning بيطلع على semicolon لوحده؛ ده code سليم والـ interpreter بيتجاهله بس.`, `غلط، لأن "Ignores the statements" موجودة في الاختيارات وهي فعلًا اللي الـ interpreter بيعمله.`],
    [`صح. المحتوى اللي جوه الـ &lt;noscript&gt; بيظهر بس في الـ browsers اللي مش بتدعم أو مش بتشغّل JavaScript (L7, Embedding JS).`, `الـ &lt;noscript&gt; مالوش علاقة بالـ cookies ولا الـ cache؛ كل شغله إنه يعرض محتوى لما الـ JavaScript مش شغالة.`, `"Both" غلط لأن B غلط: الـ &lt;noscript&gt; مش بيمسح cookies ولا cache.`, `غلط، لأن A صح: محتوى الـ &lt;noscript&gt; بيظهر في الـ browsers اللي مش بتشغّل JavaScript.`],
    [`الـ typeof بيرجّع "boolean" بس مع true و false؛ أما مع null فبيرجّع "object".`, `الـ typeof undefined بيدّي "undefined"، لكن typeof null مش كده.`, `صح. typeof null === "object" (غلطة تاريخية في اللغة).`, `الـ typeof عمره ما بيرجّع "integer"، لأن الـ JavaScript فيها نوع number واحد بس ("number")؛ والـ typeof null بيدّي "object".`],
    [`الـ debugger مش بيلاقي ولا بيصلّح أخطاء لوحده؛ هو بس بيوقّف التنفيذ عند السطر ده عشان تبص على الحالة.`, `صح. التنفيذ بيقف عنده لما الـ dev tools تبقى مفتوحة.`, `الـ debugger مش بيصلّح الـ statement الحالي؛ هو بس بيوقّف التنفيذ هناك زي الـ breakpoint، لما الـ dev tools تكون مفتوحة.`, `B بس اللي صح: الـ debugger بيشتغل كـ breakpoint ومش بيعمل أي debugging أوتوماتيك، فـ "All of the above" غلط.`],
    [`الـ Node (Node.js) ده JavaScript runtime بنشغّل بيه JS برة الـ browser، يعني هو من عالم الـ JS؛ الـ Cassandra لأ.`, `الـ Vue ده JavaScript framework لبناء الـ user interfaces، فمش هو الإجابة.`, `الـ React ده JavaScript library/framework لبناء الـ user interfaces، فمش هو الإجابة.`, `صح. الـ Apache Cassandra دي NoSQL database، مش JavaScript framework؛ أما الـ Node والـ Vue والـ React فكلهم من الـ JavaScript ecosystem (JavaScript MCQ Sheet).`],
    [`اسم الـ variable ماينفعش يبدأ برقم؛ لازم يبدأ بحرف أو $ أو _.`, `صح. الاسم ممكن يبدأ بحرف أو $ أو _، وبعدها حروف أو أرقام أو $ أو _، وماينفعش يكون reserved word (L7, Variables).`, `الـ var دي reserved word (بنعرّف بيها variables)، فماينفعش نستخدمها اسم لـ variable.`, `الـ break دي reserved word (بتخرّج من الـ loops والـ switch)، فماينفعش نستخدمها اسم لـ variable.`],
    [`صح كإجابة متوقعة: الـ typeof null بيرجّع "object" (والـ spec بتاعة اللغة بتسمي النوع Null).`, `النوع في الـ spec هو Null، بس الـ typeof بيقول "object"، وده اللي السؤال بيختبره.`, `الـ undefined دي قيمة مختلفة: variable اتعرّف بس ماخدش قيمة؛ والـ typeof undefined بيدّي "undefined"، إنما typeof null بيدّي "object".`, `الـ Null نوع بيانات صحيح ممكن الـ variable يشيله (موجود في لستة الأنواع في المحاضرة)؛ والـ typeof null بيرجّع "object".`],
    [`الـ typeof عمره ما بيرجّع "array" (استخدم Array.isArray).`, `صح. الـ Arrays في الـ JavaScript عبارة عن objects، فالـ typeof [1, 2, 3] بيرجّع "object" (L7, typeof results).`, `الـ JavaScript مفيهاش نوع اسمه "list" والـ typeof عمره ما بيرجّعه؛ الـ arrays عبارة عن objects، فالنتيجة "object".`, `الـ "undefined" بتطلع بس للقيم اللي عمرها ما اتحطلها قيمة؛ والـ array literal ده object متعرّف.`],
    [`الـ true دي القيمة نفسها؛ الـ typeof بيرجّع اسم النوع بتاعها، اللي هو "boolean".`, `صح. الـ true والـ false قيم Boolean، فالـ typeof true بيرجّع "boolean" (L7, typeof results).`, `الـ true قيمة Boolean primitive، مش object، فالـ typeof بيدّي "boolean" مش "object".`, `الـ "undefined" للقيم اللي ماخدتش قيمة؛ والـ true قيمة Boolean متعرّفة، فالـ typeof بيدّي "boolean".`],
    [`الـ typeof دايمًا بيرجّع اسم نوع، عمره ما بيرجّع القيمة؛ والـ NaN (Not a Number) نوعه برضه "number".`, `صح. الـ NaN قيمة خاصة من نوع الـ number، فالـ typeof NaN بيرجّع "number" (L7, typeof results).`, `الـ typeof عمره ما بيرجّع "null" (حتى typeof null بيدّي "object")؛ والـ typeof NaN هو "number".`, `الـ "undefined" للقيم اللي ماخدتش قيمة؛ والـ NaN قيمة number متعرّفة، فالـ typeof بيدّي "number".`],
    [`صح. typeof 1 بيدّي "number"، وده string، فـ typeof "number" بيدّي "string".`, `الـ "number" دي نتيجة الـ typeof 1 اللي جوه بس؛ لما تطبّق typeof تاني على الـ string ده بيدّيك "string".`, `الـ typeof عمره ما بيرجّع القيمة نفسها؛ دايمًا بيرجّع اسم نوع، وهنا الاسم ده "string".`, `الـ typeof بيرجّع اسم النوع كـ string، عمره ما بيرجّع true؛ والـ typeof (typeof 1) يعني typeof "number"، اللي هو "string".`],
    [`بعد ما الصفحة تخلص تحميل، الـ document.write() مش بيضيف في الآخر؛ ده بينادي document.open() وبيستبدل الـ document كله.`, `صح. الـ document.open() بيتنادى أوتوماتيك على الـ document اللي اتقفل (Example 4).`, `الكتابة في الـ console دي شغلة الـ console.log()؛ إنما الـ document.write() بيكتب في الـ HTML document نفسه.`, `مفيش error بيطلع؛ الـ browser بيفتح document جديد أوتوماتيك والـ HTML القديم بيتمسح.`],
    [`الـ "Input OK" بتظهر بس للأرقام من 1 لـ 10؛ وهنا 15 &gt; 10 بتخلي الـ if-condition تبقى true، فالـ else مش بيتنفذ.`, `صح. الـ condition اللي هي isNaN(x) || x &lt; 1 || x &gt; 10 بتبقى true لأن 15 &gt; 10، فبيتكتب text = "Input not valid" في الـ #demo (L7, Example 5).`, `الـ code عمره ما بيكتب الـ x نفسه؛ هو بيكتب الـ variable اللي اسمه text، واللي يا "Input OK" يا "Input not valid".`, `الـ branches الاتنين بيحطوا قيمة في الـ text، والـ innerHTML = text بيتنفذ دايمًا، فالـ #demo عمره ما بيفضل فاضي.`]
  ],
  extra: [
    [`الـ var مش block scoped، فالـ declaration اللي جوه هو نفس الـ variable.`, `صح. الـ var بتتجاهل الـ block؛ فـ a بتبقى 2 (متجربة على node).`, `الـ a اتعملها initialize بـ 1 وبعدين اتغيرت لـ 2، فعمرها ما بقت undefined؛ والـ var مش بيعترف بالـ block، فبيطبع 2.`, `إعادة تعريف variable بـ var مسموحة (عكس الـ let)، فمفيش error؛ والـ var a اللي جوه هي نفس الـ variable.`],
    [`الـ typeof عمره ما بيرجّع "null" (حتى typeof null بيدّي "object")؛ والـ variable اللي اتعرّف ومخدش قيمة بيدّي "undefined".`, `الـ "object" ده اللي بيرجّعه typeof null؛ إنما الـ q عمره ما خد قيمة، فقيمته undefined والـ typeof بيدّي "undefined".`, `صح. اتعرّف ومتدّلوش قيمة = undefined.`, `الـ q متعرّف بـ let، فقرايته بعد سطر التعريف legal عادي؛ هو بس شايل undefined.`],
    [`صح. من الشمال لليمين: لو أول حاجة string كله بيتعمله concatenate؛ وفي التاني 3 + 4 = 7 بيتجمعوا قبل ما يقابلوا "5" (متجربة على node).`, `الـ 12 محتاجة جمع أرقام على طول، بس الـ + لما يكون فيه operand string بيعمل concatenation، فالنتايج بتطلع strings.`, `في التاني، 3 + 4 بيتحسبوا كأرقام الأول.`, `في الأول، 4 + 5 مش بيتحسبوا الأول.`],
    [`الـ JavaScript تقدر تغيّر الـ HTML content، مثلًا بالـ innerHTML؛ ودي من أهم استخداماتها، مش limitation.`, `إنها ترد على الـ mouse والـ keyboard دي ميزة المحاضرة ذكراها (increased interactivity)، مش limitation.`, `الـ JavaScript مش محتاجة compile؛ الـ JS interpreter اللي في الـ browser بيعملها interpret.`, `صح. الـ client-side JavaScript مش بتسمح بقراية أو كتابة files، عشان الـ security؛ وكمان مفيهاش دعم للـ networking والـ multithreading (L7, Limitations).`],
    [`صح. بيتعملهم interpret لما الـ function/handler يتنادى.`, `ملف الـ CSS ماينفعش يبقى فيه غير CSS rules، مش JavaScript؛ الـ functions مكانها &lt;script&gt; في الـ head.`, `الـ &lt;title&gt; بيشيل بس عنوان الصفحة كـ plain text؛ الـ scripts مكانها element الـ &lt;script&gt;.`, `الـ &lt;iframe&gt; بيعمل embed لـ document تاني؛ والـ L7 بتقول إن الـ functions اللي بتشتغل كذا مرة مكانها الـ &lt;head&gt;.`],
    [`الـ innerHTML بيكتب جوه HTML element، فالـ output بيبان على الصفحة.`, `الـ document.write() بيكتب في الـ HTML output، فالنتيجة بتظهر على الصفحة.`, `صح. بيظهر في الـ console بتاع الـ browser (Inspect).`, `الـ window.alert() بيطلّع alert box باين لليوزر، فمش مستخبي زي الـ console output.`],
    [`الـ const بيعرّف constant ماينفعش يتعمله reassign، فالـ c عمرها ما هتبقى 2؛ الـ assignment بيعمل throw.`, `الفشل مش silent: الـ assignment لـ const بيعمل throw لـ TypeError لما السطر يتنفذ.`, `الـ code بيتعمله parse عادي، فمفيش SyntaxError وقت التحميل؛ الـ error ده TypeError لما c = 2 يتنفذ.`, `صح. الـ const بيعرّف constant ماينفعش يتعمله reassign، فالـ c = 2 بيعمل throw لـ TypeError: Assignment to constant variable وقت التنفيذ (L7, Variables; checked with node).`],
    [`الـ &lt;script&gt; مالوش attribute اسمه href (الـ href للـ links والـ &lt;link&gt;)؛ ملف الـ .js الخارجي بيتحمّل بالـ src.`, `صح. ملف الـ .js الخارجي بيتضاف بالـ src attribute بتاع الـ &lt;script&gt;: &lt;script src="file.js"&gt;&lt;/script&gt; (L7, Embedding JS).`, `الـ &lt;link rel="stylesheet"&gt; بيربط ملفات CSS؛ إنما ملفات الـ JavaScript بتتحمّل بـ &lt;script src="..."&gt;.`, `مفيش element اسمه &lt;js&gt; في الـ HTML؛ الـ scripts بتتحمّل بـ &lt;script src="..."&gt;.`],
    [`صح. الأسامي ممكن تبدأ بـ $ أو _ أو حرف.`, `اسم الـ variable ماينفعش يبدأ برقم؛ لازم يبدأ بحرف أو $ أو _.`, `الـ - ده operator الطرح، فالـ total-price هيتقري total ناقص price؛ الأسماء فيها بس حروف وأرقام و $ و _.`, `الـ let دي reserved word بنعرّف بيها variables، فماينفعش تبقى اسم لـ variable.`],
    [`الـ CSS هي الـ presentation layer، تكنولوجيا منفصلة؛ والـ JavaScript = ECMAScript + DOM API.`, `الـ PHP لغة server-side منفصلة؛ والـ JavaScript هي ECMAScript زائد الـ DOM API اللي بنتعامل بيه مع الـ HTML.`, `صح. الـ language specification + التواصل مع الـ HTML.`, `الـ HTTP ده الـ protocol اللي بينقل الصفحات؛ إنما الـ JavaScript هي ECMAScript (اللغة) زائد الـ DOM API.`]
  ]
};


AR.web.lectures["8"] = {
  notes: [
    { h: `الـ Arithmetic operators (y = 4)` },
    { h: `الـ Assignment operators (x = 10)` },
    { h: `الـ Comparison والـ logical operators (x = 10، y = 5)` },
    { h: `Trace: مثال L8 رقم (1) (a = 33، b = 10، c = "Test")` },
    { h: `الـ Control structures والـ loops`, pts: [
      `<b>if / else if / else</b>: في Example 4 لما <code>book = "maths"</code> بيطبع <b>Maths Book</b>.`,
      `<b>switch</b>: بيقارن بـ <b>strict equality (===)</b>، يعني القيمة والنوع مع بعض. كل case لازم تخلص بـ <b>break</b>، وإلا التنفيذ بيكمّل في اللي بعدها (fall through)؛ والـ <b>default</b> بيتنفذ لما مفيش حاجة تطابق. Example 5 (grade 'A'): "Entering switch block"، "Good job"، "Exiting switch block".`,
      `<b>while</b> (بيختبر الأول)، <b>do...while</b> (الـ body بيتنفذ مرة على الأقل والاختبار بعدها)، <b>for</b> (init; condition; update)، <b>for...in</b> (بيلف على الـ keys/الـ indexes بتاعة object أو array)، و<b>for...of</b> (بيلف على القيم نفسها).`,
      `Example 6: <code>for (let i = 0; i &lt; cars.length; i++) text += cars[i] + "&lt;br&gt;";</code> بيطبع كل عربية في سطر لوحدها.`
    ] },
    { h: `الـ Arrays`, pts: [
      `الـ arrays في الـ JS نسخة أريح من الـ arrays بتاعة الـ Java: <b>الحجم ممكن يتغير</b> و<b>الداتا ممكن تبقى أنواع مختلطة</b>؛ وبتستخدم indexes بس (مفيش keys على مزاجك زي الـ PHP).`,
      `الإنشاء: <code>new Array(1, 2, 3)</code> (كذا argument = عناصر)؛ <code>new Array(5)</code> (argument رقمي واحد = <b>الحجم</b>)؛ أو literal <code>[1, 2, 3]</code> بالأقواس المربعة.`,
      `الـ <code>length</code> بيدّيك عدد العناصر.`
    ] },
    { h: `الـ Array methods` },
    { h: `Trace: الـ ArrayEx(7) (متجرّب فعلًا بالتشغيل)` },
    { h: `الـ Date object`, pts: [
      `بيتعمل بـ <code>new Date()</code> (التاريخ والوقت دلوقتي)، <code>new Date(milliseconds)</code> (عدد الـ ms من نص الليل يوم 1/1/1970، مثلًا 5000 = خمس ثواني بعد نص الليل يوم 1/1/70، زي اللي بيرجّعه getTime())، <code>new Date(datestring)</code> (بفورمات يقبله الـ Date.parse())، <code>new Date(year, month, date[, hour, minute, second, millisecond])</code>.`,
      `الـ Getters: getFullYear()، getMonth() (من 0 لـ 11)، getDate()، getDay()، getHours()، getMinutes()، getSeconds()، getTime().`
    ] }
  ],
  cards: [
    `"45" (الـ + مع string بتعمل concatenation).`,
    `"Four44" (من الشمال لليمين، كله بقى string).`,
    `x = 4 (وبعدها y = 5)، لأن الـ post-increment بيرجّع القيمة القديمة.`,
    `x = 3 (الـ pre-decrement بيقلل الأول).`,
    `1 (باقي القسمة).`,
    `0 (لأن 10 % 5 = 0).`,
    `الـ == بيقارن القيمة بس؛ الـ === بيقارن القيمة والنوع.`,
    `false (النوع مختلف: number و string).`,
    `Strict (===): القيمة والنوع.`,
    `الـ body بيتنفذ مرة على الأقل؛ والـ condition بيتشيك بعدها.`,
    `بيضيفوا في الآخر / في الأول؛ وبيرجّعوا الـ length الجديد.`,
    `بيشيلوا الأخير / الأول؛ وبيرجّعوا العنصر اللي اتشال.`,
    `[3,4] (الـ end index مش داخل).`,
    `Array فيها العناصر اللي اتشالت (والـ array الأصلية بتتعدّل).`,
    `[2,33,8] (الترتيب الـ default بيبقى كـ strings).`,
    `Array فاضية الـ length بتاعها 5.`,
    `خمس ثواني بعد نص الليل يوم 1/1/1970.`,
    `"43Test" (33 + 10 = 43 الأول، وبعدين concatenation).`
  ],
  qa: [
    `لو nums = [3,5,7,9,11]: الـ <b>push(22,33)</b> بيضيف في الآخر وبيرجّع الـ length الجديد → [3,5,7,9,11,22,33]. الـ <b>unshift(55,66)</b> بيضيف في الأول → [55,66,3,...]. الـ <b>pop()</b> بيشيل آخر عنصر ويرجّعه (33). الـ <b>shift()</b> بيشيل أول عنصر ويرجّعه (55). الـ <b>splice(index, count, e1, ...)</b> بيشيل count عناصر من عند index، ويحط الجديدة مكانها، ويرجّع العناصر اللي اتشالت، مثلًا splice(0,2,111,222). الـ <b>slice(start, end)</b> بيرجّع array جديدة من start لحد end (من غير end) ومش بيغيّر الأصلية، مثلًا [1,2,3,4,5].slice(2,4) = [3,4].`,
    `الـ == بيقارن القيم بعد ما يعمل type conversion (10 == "10" بتطلع true). الـ === بيقارن القيمة والنوع من غير أي conversion (10 === "10" بتطلع false). والـ != والـ !== هما العكس بتاعهم. الـ switch بيقارن الـ expression بكل case بالـ strict equality (===)، فـ case '5' مش هتطابق الرقم 5.`,
    `الفكرة: لكل n من 2 لـ 50 نجرب نقسم على كل d لحد الجذر التربيعي بتاع n؛ لو اتقسم يبقى مش prime:<pre>for (let n = 2; n &lt;= 50; n++) {
  let prime = true;
  for (let d = 2; d * d &lt;= n; d++) {
    if (n % d == 0) { prime = false; break; }
  }
  if (prime) document.write(n + " ");
}
// 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47</pre>`,
    `الفكرة: fib(n) = fib(n - 1) + fib(n - 2) والـ base case لما n أقل من 2:<pre>function fib(n) {
  if (n &lt; 2) return n;          // fib(0)=0, fib(1)=1
  return fib(n - 1) + fib(n - 2);
}
let N = parseInt(prompt("How many terms?"));
let out = [];
for (let i = 0; i &lt; N; i++) out.push(fib(i));
document.write(out.join(", ")); // N=10: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34</pre>`,
    `الـ while (condition) {...} بيختبر قبل كل لفة وممكن مايتنفذش ولا مرة؛ الـ do {...} while (condition); بينفذ الـ body مرة على الأقل وبيختبر بعدها؛ الـ for (init; condition; update) {...} بنستخدمه لما عدد اللفات يبقى معروف؛ الـ for (key in object) {...} بيلف على أسامي الـ properties (أو الـ indexes في الـ array)؛ والـ for (value of iterable) بيلف على القيم. الـ break بيخرج من الـ loop، والـ continue بينط للفة اللي بعدها.`
  ],
  quiz: [
    [`true*3 بتطلع 3، بس الـ true التانيين بيتجمعوا كمان.`, `في الحسابات الـ true بتتحول لـ 1 مش 0، فالمجموع 1 + 1 + 1×3 = 5؛ الـ 0 كان هيطلع لو كل true اتحسبت 0.`, `الـ Booleans بتتحول لأرقام في العمليات الحسابية؛ مفيش error.`, `صح. 1 + 1 + (1*3) = 5 (متجربة على node).`],
    [`صح. الـ indexes 2 و3؛ والـ end index 4 مش داخل.`, `الـ 2, 3 دي القيم اللي عند index 1 و2؛ لكن الـ slice(2, 4) بيبدأ من index 2 (القيمة 3) ويقف قبل index 4.`, `الـ slice مش بيدخّل الـ end index، فالـ index 4 (القيمة 5) مش داخل؛ النتيجة هي index 2 و3 يعني 3, 4.`, `الـ 2, 3, 4 دي بتعامل الـ arguments كأنها أماكن بتبدأ من 1؛ بس الـ indexes بتبدأ من 0، فالـ slice(2, 4) بيدّي index 2 و3 يعني 3, 4.`],
    [`صح. 5 right-rotations لـ 4 عناصر = rotation واحدة. (الاختيارين A وC مطبوعين زي بعض في الورقة؛ وكمان الـ call متعلّق عليه comment، فبالمعنى الحرفي مفيش حاجة هتتطبع.)`, `ده الـ array الأصلي، وده اللي كان هيطلع بعد 0 أو 4 rotations؛ خلي بالك إن 5 rotations على 4 عناصر = rotation واحدة.`, `ده تكرار حرفي لاختيار A في الورقة؛ الـ key بيقول A يعني [111, 44, 1, 22]، فاختار A مش النسخة المكررة.`, `دي left rotation (أول عنصر راح للآخر)؛ لكن الـ loop بيعمل pop لآخر عنصر وunshift له في الأول، يعني بيلف لليمين (right rotation).`],
    [`الـ JavaScript لغة interpreted مش compiled، والـ 5 + "9" كود سليم، فمفيش compilation error.`, `الـ 14 ده لو جمع أرقام، بس لما واحد من طرفين الـ + يبقى string، الـ + بتعمل concatenation: 5 + "9" = "59".`, `جمع number مع string ده legal عادي: الرقم بيتحول لـ string، فمفيش runtime error.`, `صح. الـ 5 بتتحول لـ "5" وبتتلزق في "9".`],
    [`صح. الـ switch بيستخدم === (strict comparison).`, `الـ switch بيقارن القيمة والنوع مع بعض (strict ===)، مش النوع لوحده.`, `المقارنة بالقيمة بس دي تبقى loose equality (==)؛ لكن الـ switch بيستخدم strict equality (===) وبيشيك على النوع كمان.`, `غلط، لأن A موجودة وصح: الـ switch بيقارن النوع والقيمة الاتنين بـ ===.`],
    [`صح. a=2: b=4؛ a=3: b=4+6=10؛ a=4: b=10+8=18 (وبعدها a&lt;=3 بتفشل).`, `الـ 1 2 3 دي مش قيم b (والـ a نفسها بتمشي 2, 3, 4)؛ الـ b بتزيد بـ a × 2 كل لفة: 4, 10, 18.`, `الـ 1 4 7 مش طالعة من الكود: الـ a بتزيد قبل الـ b += a * 2، فالـ b = 2×2 = 4، وبعدين 4 + 6 = 10، وبعدين 10 + 8 = 18.`, `غلط، لأن "4 10 18" موجودة في الاختيارات وهي بالظبط اللي الـ loop بيطبعه.`],
    [`صح. الـ forEach بيجمع 1+2+3 (والـ function بيحصلها hoisting، فهي موجودة قبل ما تتستخدم).`, `الـ 1 ده أول عنصر بس؛ الـ forEach بينادي getSum على كل عنصر، فالـ sum = 1 + 2 + 3 = 6.`, `الـ 2 ده عنصر واحد بس؛ الـ forEach بيعدي على التلات عناصر كلهم، فالـ sum = 1 + 2 + 3 = 6.`, `غلط، لأن الـ 6 موجودة وهي النتيجة: الـ getSum بتضيف 1 و2 و3 على الـ sum.`],
    [`صح. mid=2 (3&lt;5) → left=3؛ mid=4 → a[4]=5 لقيناه.`, `الـ 5 موجودة في الـ array (عند index 4) والـ search بيلاقيها في تاني خطوة، فالـ found بتبقى true وبيطبع YES.`, `الكود JavaScript سليم (الـ ternary operator والـ break الاتنين legal)، فمفيش syntax error.`, `غلط، لأن YES موجودة وهي الـ output: الـ search بيلاقي الـ 5 عند mid = 4.`],
    [`الـ index 8 فيه '1' فعلًا، بس الـ index 7 اللي قبله '1' برضه؛ الـ search بيفضل يتحرك شمال (r = mid − 1) عشان يلاقي أول '1'، وده عند 7.`, `صح. binary search على أول '1' (سبع أصفار عند الـ indexes من 0 لـ 6).`, `الـ index 0 فيه '0' (الـ string بيبدأ بسبع أصفار)، فالـ ans عمرها ما بتتعين بـ 0.`, `الـ index 1 فيه '0'، فمينفعش يبقى الإجابة؛ أول '1' بييجي بعد سبع أصفار، عند index 7.`],
    [`5 × 5 = 25 &gt; 24، فالـ mid = 5 بيفشل في الشرط mid*mid &lt;= n وعمره ما بيتخزن في الـ ans.`, `صح. الـ search بيحتفظ بأكبر mid يحقق mid × mid &lt;= 24: الـ 4 × 4 = 16 &lt;= 24 لكن 5 × 5 = 25 &gt; 24، فالـ ans = 4 (الـ floor بتاع √24).`, `6 × 6 = 36 &gt; 24، فالـ 6 بتفشل في الشرط وعمرها ما بتتخزن في الـ ans.`, `3 × 3 = 9 &lt;= 24 صح، بس 4 × 4 = 16 &lt;= 24 برضه، فالـ search بيكمّل والإجابة هي الأكبر: 4.`],
    [`الـ str1 + str2 شغالة، بس الـ str1.concat(str2) كمان شغالة، فالإجابة الكاملة هي "Both a) and b)".`, `الـ str1.concat(str2) شغالة، بس الـ str1 + str2 كمان شغالة، فالإجابة الكاملة هي "Both a) and b)".`, `صح. الـ strings ممكن تتوصل ببعض بالـ + operator (concatenation, L7) أو بالـ string method concat() (L9)، فالاتنين صح.`, `غلط، لأن الـ + والـ concat() الاتنين بيوصلوا two strings ببعض في الـ JavaScript.`],
    [`صح. 1 + "2" = "12"، وبعدين "12" + "2" = "122".`, `الـ 5 ده لو جمع أرقام، بس أول ما يدخل string الـ + بتعمل concatenation: 1 + "2" = "12"، وبعدين + "2" = "122".`, `الـ NaN بتطلع لما تستخدم قيمة مش رقمية في عملية حسابية زي - أو *؛ لكن الـ + مع الـ strings بتعمل concatenation وخلاص.`, `خلط الأرقام والـ strings بالـ + ده legal؛ الـ JS بتحوّل الرقم لـ string، فمفيش error.`],
    [`صح. الـ sort() بيقارن كـ strings: "2" &lt; "33" &lt; "8"، فالـ array بتبقى [2, 33, 8] (متجربة على node).`, `بعد الـ sort بترتيب الـ strings الـ array بيبقى [2, 33, 8]، فالـ 2 عند index 0 مش index 1.`, `كـ strings الـ "8" بتيجي بعد الـ "33"، فالـ 8 بتبقى الأخيرة (index 2) مش عند index 1.`, `الـ 1 مش موجود في الـ array أصلًا؛ الـ numbers[1] هو العنصر اللي عند index 1، وده 33 بعد الـ sort.`],
    [`ده بس مع الـ - و* و/ (مثلًا "6" - 2 = 4)؛ والإجابة المتوقعة ماشية على حالة الـ +.`, `صح (الإجابة المتوقعة). مع الـ + الرقم بيتحول ويتعمل concatenation، مثلًا 5 + "9" = "59".`, `الـ NaN دي قيمة نوعها number، مش data type في حد ذاتها؛ ومع الـ + الـ number والـ string بيدّوا string.`, `الـ JavaScript مش بتفشل لما تخلط الأنواع؛ بتحوّلها، فمع الـ + النتيجة بتبقى string زي "59".`],
    [`التنفيذ من الشمال لليمين؛ و"Four" + 4 بقت string خلاص.`, `صح. من الشمال لليمين: "Four" + 4 = "Four4" (string)، وبعدين + "4" = "Four44" (L8, Arithmetic operators table).`, `الـ 12 محتاجة جمع أرقام، بس "Four" ده string، فكل + بعده بتعمل concatenation.`, `الـ + مع string بتعمل concatenation مش حساب، فمفيش NaN بتطلع؛ الـ x = "Four44".`],
    [`التنفيذ من الشمال لليمين، والـ a + b الاتنين أرقام، فبيتجمعوا الأول (43) قبل ما نوصل لـ "Test".`, `صح. من الشمال لليمين: 33 + 10 = 43 كأرقام، وبعدين 43 + "Test" بتعمل concatenation فتبقى 43Test (L8, Example 1).`, `الـ + مش بتغيّر ترتيب الـ operands؛ الأرقام جت الأول، فالنتيجة بتبدأ بـ 43: يعني 43Test.`, `الـ + مع string بتعمل concatenation، فمفيش NaN؛ 33 + 10 = 43، وبعدين "43Test".`],
    [`الـ 33 دي قيمة البداية؛ الـ a = ++a زودتها لـ 34، والـ result = ++a زودتها تاني لـ 35.`, `الـ 34 دي القيمة بعد أول statement بس؛ الـ result = ++a بتزود مرة كمان قبل ما تستخدم a، فتطلع 35.`, `صح. الـ a = ++a بتخليها 34، وبعدين ++a بتدّي 35 (متجربة على node).`, `فيه pre-increment اتنين بس (a = ++a وresult = ++a)، فالـ a بتمشي 33 → 34 → 35، مش 36.`],
    [`الـ 2 ده الـ start position argument مش النتيجة؛ الـ indexOf بيرجّع المكان اللي لقى فيه الـ 33، وده index 4.`, `الـ index 3 فيه 77 مش 33؛ لما ندور من index 2، أول 33 عند index 4.`, `صح. الـ indexOf(33, 2) بيدور من index 2: x[2]=11، x[3]=77، x[4]=33، فبيرجّع 4 (L8, Array methods).`, `الـ -1 معناها مش موجود، بس الـ 33 موجودة في الـ array عند index 4، بعد الـ start position 2.`],
    [`الـ [7, 8, 5, 3] ده اللي جوه الـ nums بعد الـ call؛ لكن الـ return value بتاع الـ splice هو array العناصر اللي اتشالت.`, `صح. الـ splice بيرجّع العناصر اللي اتشالت.`, `الـ 2 ده الـ delete count argument؛ الـ splice بيرجّع array فيه العناصر اللي اتشالت، [111, 222].`, `الـ 5 والـ 3 دول العناصر اللي فضلوا في الـ array؛ الـ splice بيرجّع اللي اتشالوا، [111, 222].`]
  ],
  extra: [
    [`الـ operand التاني بيشوف x وهي متزودة مرتين خلاص.`, `صح. الـ x++ بيدّي 5 (وx بتبقى 6)، والـ ++x بيخليها 7: 5 + 7 = 12 (متجربة على node).`, `الـ 10 = 5 + 5 بتتجاهل الزيادتين؛ الـ ++x بتزود قبل الاستخدام، والـ x كانت بقت 6 بعد الـ x++، فبتدّي 7.`, `الـ 13 = 6 + 7 بتستخدم 6 للـ x++ وده غلط؛ الـ post-increment بيرجّع القيمة القديمة 5، فالـ y = 5 + 7 = 12.`],
    [`الـ === strict: بيقارن النوع كمان، والـ string مش number، فالـ "10" === 10 بتطلع false.`, `الـ == بيحوّل الـ string "10" لـ number 10 قبل المقارنة، فالـ "10" == 10 بتطلع true.`, `دي متعكوسة: الـ loose == بتطلع true بعد الـ type conversion، والـ strict === بتطلع false عشان الأنواع مختلفة.`, `صح. الـ == بيحوّل الأنواع قبل المقارنة، فالـ "10" == 10 بتطلع true؛ والـ === محتاج نفس القيمة ونفس النوع، فالـ "10" === 10 بتطلع false (L8, Comparison operators).`],
    [`صح. الـ i بتبدأ من 1 وبتزيد 2 طول ما i &lt;= 5، يعني i = 1، 3، 5 والـ s = 1 + 3 + 5 = 9 (L8, for loop).`, `الـ 15 = 1 + 2 + 3 + 4 + 5 كانت محتاجة i++؛ لكن مع i += 2 بيتجمع 1 و3 و5 بس، فتطلع 9.`, `الـ 6 مش طالعة من الـ loop: هو بيجمع i = 1 و3 و5 (والـ 5 داخلة عشان i &lt;= 5)، فتطلع 9.`, `الـ 4 = 1 + 3 بتقف قبل الـ 5، بس الشرط i &lt;= 5 بيدخّل الـ 5، فالـ s = 9.`],
    [`الـ do...while بينفذ الـ body مرة قبل ما يشيك على الشرط، فالـ i++ بتتنفذ والـ i بتبقى 11 مع إن 10 &lt; 5 قيمتها false.`, `الـ i بتزيد بس من 10، فعمرها ما توصل لـ 5؛ الـ body بيتنفذ مرة (i = 11)، وبعدين 11 &lt; 5 بتنهي الـ loop.`, `صح. الـ body بيتنفذ مرة، وبعدين 11 &lt; 5 بتطلع false.`, `الشرط 11 &lt; 5 قيمته false بعد أول لفة، فالـ loop بيقف على طول؛ مش infinite.`],
    [`الـ [1, 4] ده اللي فاضل في الـ array؛ لكن الـ splice بيرجّع العناصر اللي اتشالت.`, `صح. الـ splice بيرجّع العناصر اللي اتشالت.`, `الـ argument التاني ده count: الـ splice(1, 2) بيشيل عنصرين من index 1 (الـ 2 والـ 3)، مش عنصر واحد.`, `الـ 2 ده الـ delete count argument؛ الـ splice بيرجّع array فيه العناصر اللي اتشالت، [2, 3].`],
    [`دي الـ array الجديدة، بس الـ push بيرجّع الـ length.`, `الـ 6 دي آخر قيمة اتعملها push، بس الـ push بيرجّع الـ length الجديد بتاع الـ array، وده 4.`, `الـ push بيرجّع قيمة فعلًا: الـ length الجديد بتاع الـ array (هنا 4).`, `صح. الـ push بيضيف العناصر في الآخر وبيرجّع الـ length الجديد: [1, 2] بتبقى [1, 2, 5, 6]، فبيرجّع 4 (L8, Array methods).`],
    [`من غير break بعد case 'B'، التنفيذ بيكمّل (fall through) لـ 'C'.`, `الـ break اللي بعد case 'C' بيوقف التنفيذ هناك، فعمرنا ما بنوصل للـ default ومفيش 'd' بتتضاف.`, `صح. الـ g === 'B' بتطابق case 'B' اللي بتضيف 'b'؛ ومفيش break فبيكمّل (fall through) على case 'C' (بتضيف 'c')، وهناك الـ break بيوقفه: "bc" (L8, switch).`, `المطابقة بتبدأ من الـ case اللي بيساوي g ('B')؛ الـ case 'A' مش مطابق فبيتعدّى، ومفيش 'a' بتتضاف.`],
    [`الترتيب الرقمي محتاج compare function، زي sort((a, b) =&gt; a - b)؛ الـ default sort بيقارن كـ strings.`, `صح. الـ sort الـ default بيقارن strings: "1" &lt; "10" &lt; "3".`, `الـ default sort تصاعدي بترتيب الـ strings، مش تنازلي؛ وكـ strings الـ "1" &lt; "10" &lt; "3".`, `لا الترتيب الرقمي ولا ترتيب الـ strings بيدّي [3, 1, 10]؛ ترتيب الـ strings هو "1" &lt; "10" &lt; "3"، يعني [1, 10, 3].`],
    [`صح. الـ indexOf بيرجّع مكان أول match، أو -1 لو القيمة مش في الـ array؛ والـ 9 مش موجودة (L8, Array methods).`, `الـ 0 ده index الـ 5، أول عنصر؛ الـ 9 مش في الـ array خالص، فالـ indexOf بيرجّع -1.`, `الـ indexOf دايمًا بيرجّع number، عمره ما بيرجّع undefined؛ ولو القيمة مش موجودة بيرجّع -1.`, `الـ 3 ده الـ length بتاع الـ array، مش نتيجة بحث؛ القيمة اللي مش موجودة بتدّي -1.`],
    [`الـ numeric argument الواحد بيحدد الحجم، فمفيش عنصر 3 بيتخزن؛ الـ array اللي فيه 3 بيتكتب [3] (أو new Array(1, 3) لو أكتر من عنصر).`, `الـ new Array(3) سليم؛ الـ numeric argument الواحد للـ Array constructor بيتاخد على إنه الحجم.`, `صح (L8: الـ constructor بـ argument رقمي واحد = الحجم).`, `الـ constructor مش بيملا أرقام الـ indexes؛ الـ new Array(3) بيعمل 3 empty slots.`]
  ]
};


AR.web.lectures["9"] = {
  notes: [
    { h: `الـ Strings`, pts: [
      `الـ Strings بتتكتب بين <code>" "</code> أو <code>' '</code>. خلي بالك: الـ <b>length</b> هنا <b>property</b> (مش method زي الـ Java): <code>"Connie Client".length</code> = 13.`,
      `مفيش <b>char type</b> في الـ JS: الـ <b>charAt(i)</b> بترجع String فيه حرف واحد؛ والـ <b>charCodeAt(i)</b> بترجع الـ Unicode (ASCII) code بتاع الحرف.`,
      `الـ Concatenation بالـ +: <code>1 + 1</code> = 2، لكن <code>"1" + 1</code> = "11" (أول ما يبقى فيه string بيلزقهم).`,
      `الـ <b>split(delim)</b> بتكسّر الـ string لـ array (وممكن تستخدم regular expressions)؛ والـ <b>join(delim)</b> بتلم الـ array في string: <code>"the quick brown fox".split(" ")</code> ← reverse ← join("!") = "fox!brown!quick!the".`,
      `methods تانية: indexOf، lastIndexOf، search، replace، substring، substr، toLowerCase، toUpperCase، trim.`
    ] },
    { h: `البحث في الـ string واستخراج أجزاء منه` },
    { h: `تحويل أنواع الداتا (Data type conversions)`, pts: [
      `من String لـ number: (1) الـ unary <b>+</b>: <code>+'27'</code> ← 27؛ (2) <b>Number(x)</b>؛ (3) <b>parseInt(x)</b>: <code>parseInt("123")</code> ← 123، <code>parseInt(7.5)</code> ← 7، <code>parseInt("123Hello")</code> ← 123، <code>parseInt("Hello123")</code> ← NaN؛ (4) <b>parseFloat(x)</b>: <code>parseFloat("12.75")</code> ← 12.75؛ (5) <b>isNaN(x)</b> ← true/false.`,
      `من Number لـ string: <b>String(x)</b> (الـ slide كاتبها "string(x)"، بس الـ JS case sensitive فلازم تبقى String) و<b>x.toString()</b>؛ ولو رقم literal محتاج نقطتين: <code>999..toString()</code>.`,
      `أي type لـ string والعكس: <b>JSON.stringify(x)</b> بترجع string (ده اسمه serialization)؛ و<b>JSON.parse(x)</b> بترجّع الـ type الأصلي.`,
      `output الـ Example 1 في L9: <code>typeof +x</code> ← number؛ <code>Number('23')</code> ← 23 number؛ parseInt(7.5) ← 7؛ parseFloat(7.5) ← 7.5؛ isNaN(289) ← false؛ String(289) ← "289" string؛ num.toString() ← "289" string؛ 999..toString() ← "999" string؛ typeof obj ← object؛ typeof JSON.stringify(obj) ← string؛ typeof JSON.parse(JSON.stringify(obj)) ← object.`
    ] },
    { h: `الـ Objects`, pts: [
      `الـ Object literal: <code>var S1 = { name: "Ali", age: 20, getName: function(){ return this.name; } };</code>. توصل للـ property بـ <code>objectName.property</code> أو <code>objectName["property"]</code>؛ وتنادي الـ method بـ <code>objectName.methodName()</code>.`,
      `الـ <b>this</b> بتشاور على الـ object اللي الـ method اتنادت عليه. والـ <b>delete</b> بتشيل property: <code>delete S1.age</code>.`,
      `الـ <b>Object.create(proto, descriptors)</b> بتعمل object جديد الـ prototype بتاعه هو proto: <code>let S2 = Object.create(S1, {class:{value:1}});</code> (الـ S2 بيورث name وage وgetName؛ والـ property "class" اللي جاية من الـ descriptor بتبقى non-enumerable).`,
      `الـ <b>Object.assign(target, src1, src2...)</b> بتنسخ القيم والـ properties (الـ own والـ enumerable) من الـ sources للـ target وبترجع الـ target؛ بتستخدم عشان تدمج objects: <code>Object.assign(S1, S2, {status:'m'})</code>.`,
      `الـ Objects بتتقارن <b>بالـ reference</b>: اتنين objects نفس المحتوى مش === لبعض. لو فيه key متكرر في الـ literal بيفضل <b>آخر</b> قيمة. والـ keyword <b>in</b> بتشيك الـ property موجودة ولا لأ: <code>"name" in S1</code>.`
    ] },
    { h: `الـ Math object` },
    { h: `الـ Functions`, pts: [
      `الـ function هي block من الـ code بتكتبه مرة وتشغله قد ما تحب؛ الـ functions بت<b>قسّم</b> البرنامج لأجزاء (modularize، divide-and-conquer). والـ variables اللي بتتعرف جواها بتبقى <b>local</b>.`,
      `الـ <b>Built-in functions</b>: <b>escape</b> (بتعمل encode للحروف اللي مش alphanumeric على شكل %xx، والمسافة بتبقى %20)، <b>eval</b> (بتعمل parse وتنفذ الـ string كأنه JS code، وبترجع قيمة آخر statement: <code>eval("x+y")</code> = 20 لو القيم 12 و8)، <b>isFinite</b>، <b>isNaN</b>، <b>Number</b>، <b>parseFloat</b>، <b>parseInt</b>.`,
      `<b>أربع أنواع من الـ user-defined functions</b>: (1) <b>Declaration</b> <code>function calc(x1, x2) { return x1 + x2; }</code>؛ (2) <b>Expression</b> <code>let calc = function(x1, x2) { ... };</code>؛ (3) <b>Self-invoked</b> <code>(function(){ let sum = 7 + 6; console.log('sum=' + sum); })();</code> بتشتغل على طول (بتطبع sum=13)؛ (4) <b>Arrow</b> <code>let calc = (x1, x2) =&gt; x1 + x2;</code>، وبـ argument واحد <code>let addten = x =&gt; x + 10;</code>، ومن غير arguments <code>_ =&gt; {...}</code>.`,
      `الـ <b>Default parameters</b>: <code>function calc(x = 0, y = 0)</code> ← calc() = 0، calc(2, 4) = 6.`,
      `الـ <b>Rest parameter</b> (تبعت أي عدد arguments ويوصلوا كـ array): <code>function calc(...A) { let sum = 0; for (let i = 0; i &lt; A.length; i++) sum += A[i]; return sum; }</code>. خلي بالك: الـ loop اللي في الـ slide كاتب <code>i &lt;= A.length</code>، وده بيجمع A[A.length] = undefined فالنتيجة بتطلع <b>NaN</b>.`,
      `الـ <b>Closures</b>: الـ function اللي جوه بتفضل شايفة الـ variables بتاعة الـ function اللي برّه.`
    ] },
    { h: `الـ Event-driven programming`, pts: [
      `أنواع الـ events: <b>User interface events</b> (onload، onfocus، onblur، onchange)، <b>Mouse events</b> (click، dblclick، mouseenter، mouseleave، mousemove)، <b>Keyboard events</b> (onkeydown، onkeypress، onkeyup).`,
      `الـ <b>onload</b> (غالبًا على الـ &lt;body&gt;) بيستنى لحد ما كل عناصر الصفحة تتحمّل وبعدين يشغّل الـ script. الـ <b>onclick</b> بيشتغل مع الـ click؛ والـ <b>ondblclick</b> مع الـ double-click. الـ <b>onkeyup</b> بيشتغل لما الـ user يسيب الزرار (زي إنك تنسخ اللي بيكتبه في paragraph). والـ <b>onunload</b> لما الـ user يسيب الصفحة.`,
      `events تانية: onabort، onblur (العنصر فقد الـ focus)، onchange (العنصر اتغير)، ondragdrop، onerror، onfocus، onkeydown، onkeypress، onmousedown، onmousemove، onmouseout، onmouseover، onmouseup، onmove، onreset، onresize، onselect، onsubmit.`
    ] },
    { h: `مثال على الـ Events` },
    { h: `الـ localStorage والـ sessionStorage`, pts: [
      `الـ <b>localStorage</b>: بيحفظ key/value pairs في الـ browser <b>من غير expiration date</b> (بتفضل موجودة حتى لو قفلت الـ browser). الـ <b>sessionStorage</b>: key/value pairs لـ <b>session واحدة</b> بس (موجودة طول ما الـ browser/الـ tab مفتوح، حتى مع الـ reload).`,
      `الـ Methods: <b>setItem("name", value)</b>، <b>getItem("name")</b>، <b>removeItem("name")</b>، <b>clear()</b>، <b>key(index)</b>؛ والـ property <b>length</b>. اختصار: <code>localStorage.name = value</code>، <code>value = localStorage.name</code>. القيم بتتخزن كـ <b>strings</b> (لو عايز تخزن objects استخدم JSON.stringify).`,
      `في الـ Chrome الداتا بتتحفظ في ملف SQLite جوه الـ user profile (\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage)؛ وتقدر تشوفها من Inspect &gt; Application &gt; Local Storage.`,
      `الـ Example 3 في L9 (تغيير لون الخلفية) بيحفظ اللون اللي اتداس عليه بـ <code>localStorage.setItem('color', color)</code>. خلي بالك من الـ bug اللي في الـ slide: <code>localStorage.lenght</code> (مكتوبة غلط) قيمتها undefined، فاللون المحفوظ عمره ما بيرجع بعد الـ reload؛ الصح <code>localStorage.length</code>.`
    ] }
  ],
  cards: [
    `property: s.length (مش s.length()).`,
    `الـ charAt بترجع string فيه حرف واحد؛ والـ charCodeAt بترجع الـ Unicode/ASCII code بتاعه.`,
    `"11" (الـ + مع string بيلزق مش بيجمع).`,
    `الـ split: string ← array حسب الـ delimiter؛ الـ join: array ← string بالـ delimiter.`,
    `من الـ start لحد الـ end من غير ما ياخد الـ end نفسه.`,
    `عدد count من الحروف بادئًا من الـ start.`,
    `الأولى 123 / والتانية NaN (عشان بتبدأ بحروف).`,
    `الـ stringify: من Object لـ JSON string (serialization) / الـ parse: من string لـ object.`,
    `object جديد الـ prototype بتاعه هو S1.`,
    `بتنسخ الـ own enumerable properties بتاعة الـ sources في t وبترجع t.`,
    `بتشيل property من الـ object.`,
    `5 / 4 (الـ ceil بتطلع لفوق والـ floor بتنزل لتحت).`,
    `-Infinity (والـ Math.min() = Infinity).`,
    `20 (الـ eval بتنفذ الـ string كـ code).`,
    `Declaration، expression، self-invoked، arrow.`,
    `كده: let addten = x => x + 10;`,
    `User interface، mouse، keyboard.`,
    `بيشتغل لما الـ user يسيب الزرار (release).`,
    `الـ localStorage: مالوش expiry؛ الـ sessionStorage: لـ session واحدة بس.`,
    `setItem، getItem، removeItem، clear، key.`
  ],
  qa: [
    `(1) <b>Declaration</b>: <code>function calc(x1, x2) { let sum = x1 + x2; return sum; }</code>، وبتناديها calc(8, 9). (2) <b>Expression</b>: الـ function بتتخزن في variable، <code>let calc = function(x1, x2) { return x1 + x2; };</code>. (3) <b>Self-invoked</b>: متحاطة بين أقواس وبتتنادى على طول، <code>(function(){ let sum = 7 + 6; console.log('sum=' + sum); })();</code>. (4) <b>Arrow</b>: <code>let calc = (x1, x2) =&gt; x1 + x2;</code>، وبـ argument واحد <code>x =&gt; x + 10</code> ومن غير arguments <code>_ =&gt; 6 + 5</code>. وكمان الـ functions ممكن تستخدم default parameters (x = 0) وrest parameters (...A).`,
    `الـ event هو حاجة بتحصل لـ HTML element (سببها الـ user أو الـ browser) والـ JavaScript تقدر ترد عليها بـ handler. الأنواع: user interface events (onload، onfocus، onblur، onchange)، mouse events (onclick، ondblclick، onmouseover، onmouseout، onmousemove)، وkeyboard events (onkeydown، onkeypress، onkeyup). أمثلة: <code>&lt;body onload="init()"&gt;</code> بيشغّل init بعد ما الصفحة تتحمّل؛ <code>&lt;button onclick="alert('Hi')"&gt;</code>؛ <code>&lt;input onkeyup="show(this.value)"&gt;</code> بينسخ النص وانت بتكتب؛ <code>&lt;h1 onmouseover="this.style.color='red'" onmouseout="this.style.color='black'"&gt;</code>.`,
    `الاتنين بيخزنوا key/value pairs كـ strings في الـ browser. الـ localStorage بيحتفظ بالداتا من غير expiration date، حتى بعد ما تقفل الـ browser؛ أما الـ sessionStorage فبيحتفظ بيها لـ session واحدة بس (طول ما الـ browser/الـ tab مفتوح، حتى مع الـ reload). الـ Methods: setItem(key, value) بتضيف، getItem(key) بتقرا، removeItem(key) بتمسح item واحد، clear() بتمسح كله، key(n) بترجع الـ key رقم n؛ والـ length بيدّي العدد. اختصار: localStorage.name = value.`,
    `من String لـ number: الـ unary + ('27' ← 27)، Number(x)، parseInt(x) (بياخد الجزء الصحيح، وبيقف عند أول حاجة مش رقم، وNaN لو بدأ بحرف)، parseFloat(x)؛ والـ isNaN(x) بتختبر النتيجة. من Number لـ string: String(x) أو x.toString() (999..toString()). أي قيمة لـ JSON string بـ JSON.stringify(x) وترجعها بـ JSON.parse(x). وضمنيًا (implicitly): الـ + مع string بيحوّل التاني لـ string، أما الـ - و* و/ بيحوّلوا الـ strings لأرقام.`,
    `الـ literal بتكتب فيه الـ properties والـ methods: <code>var S1 = {name:"Ali", age:20, getName:function(){return this.name;}};</code> (الـ this بتشاور على الـ object). الـ <code>Object.create(S1, {class:{value:1}})</code> بتعمل object جديد S2 الـ prototype بتاعه S1، فالـ S2 بيورث name وage وgetName وبياخد property خاصة بيه اسمها class؛ ولو عملت S2.name = "Ahmed" بيتعمل own property. الـ <code>Object.assign(S1, S2, {status:'M'})</code> بتنسخ الـ own enumerable properties بتاعة S2 والـ object التالت جوه S1 وبترجع S1 (دمج objects). والـ delete بتشيل property.`
  ],
  quiz: [
    [`الـ a بتتغير لـ 6 بس بعد ما اتطبعت.`, `الـ NaN محتاجة عملية حسابية تفشل، لكن الـ a شايلة الرقم 21 اللي اتبعت للـ function الخارجية وبيتطبع زي ما هو.`, `صح. بسبب الـ closure، الـ function اللي جوه بتقرا الـ a بتاعة اللي برّه = 21 قبل ما تغيرها (اتجربت على node).`, `غلط، لأن 21 موجودة في الاختيارات وهي الـ output: الـ function الداخلية بتطبع الـ a (21) قبل ما تديها 6.`],
    [`صح. الـ JSON.stringify() بتحوّل الـ object لـ JSON string.`, `الـ JSON.parse() بتعمل العكس: بترجّع الـ JSON string للـ object الأصلي؛ أما الـ serialize فهو stringify().`, `الـ convert() مش method في الـ JSON object؛ الـ object بيتعمله serialize بالـ JSON.stringify().`, `غلط، لأن stringify() موجودة في الاختيارات وهي الـ method اللي بتحوّل الـ object لـ JSON string.`],
    [`الـ function بتعمل destructuring لـ parameter واحد بس object؛ والـ 0 مش object فيه a وb وc.`, `الـ a بتتقري من properties الرقم 0، مش من الرقم نفسه.`, `صح. لما تعمل destructuring للرقم 0 مش هتلاقي properties اسمها a وb وc (اتجربت على node). صورة امتحان 2025/26 معلّم فيها A، وده غلط.`, `غلط، لأن "undefined undefined undefined" موجودة في الاختيارات وهي اللي بتطلع فعلًا: الـ destructuring للـ 0 مابيلاقيش properties اسمها a أو b أو c.`],
    [`صح. الحروف اللي عند index 2 و3 (الـ end مش داخل).`, `الـ "ale" كانت هتاخد الـ index 4 كمان؛ لكن substring(2, 4) بتقف قبل الـ end index، فبتاخد الـ indexes 2 و3 بس: "al".`, `الـ "cal" بتبدأ من الـ index 1 (S=0، c=1)؛ لكن substring(2, 4) بتبدأ من الـ index 2، اللي هو الـ 'a'.`, `الـ "caler" ده ناتج substring(1)، من الـ index 1 لآخر الـ string؛ أما substring(2, 4) فبتاخد الـ indexes 2 و3 بس: "al".`],
    [`صح. الـ eval بتعمل parse للـ string "x+y" وتنفذه كأنه JavaScript code، فبترجع 12 + 8 = 20 (L9, Built-in functions).`, `الـ eval بتحسب الـ string مش بتطبعه زي ما هو.`, `الـ "128" كانت هتطلع لو ده string concatenation، لكن الـ x والـ y شايلين الأرقام 12 و8، فالـ + بيجمعهم: 20.`, `غلط، لأن 20 موجودة في الاختيارات وهي القيمة اللي eval("x+y") بترجعها.`],
    [`صح. من غير arguments الـ max() بترجع -Infinity والـ min() بترجع Infinity.`, `ده معكوس: من غير arguments الـ Math.max() بترجع -Infinity والـ Math.min() بترجع Infinity.`, `الـ Math.min() فعلًا Infinity، لكن الـ Math.max() من غير arguments بتبقى -Infinity، مش Infinity.`, `الـ Math.max() فعلًا -Infinity، لكن الـ Math.min() من غير arguments بتبقى Infinity، مش -Infinity.`],
    [`صح. الـ Math.max() قيمتها -Infinity والـ Math.min() قيمتها Infinity، فـ -Infinity &lt; Infinity بتبقى true و-Infinity &gt; Infinity بتبقى false (L9, Math object).`, `ده معكوس: الـ Math.max() (-Infinity) أصغر من الـ Math.min() (Infinity)، فالـ a بتبقى true والـ b بتبقى false.`, `الـ &lt; والـ &gt; بين قيمتين مختلفتين مينفعش الاتنين يبقوا true؛ -Infinity &lt; Infinity بتخلي الـ a تبقى true والـ b تبقى false.`, `القيمتين مختلفين (-Infinity وInfinity)، فلازم مقارنة منهم تبقى true: الـ a = true والـ b = false.`],
    [`الـ NaN عمرها ما بتساوي أي حاجة، حتى نفسها.`, `صح. عشان تختبر NaN استخدم isNaN() أو Number.isNaN().`, `الـ === دايمًا بترجع boolean (true أو false)، عمرها ما بترجع undefined؛ والـ NaN === NaN بتطلع false.`, `مقارنة الـ NaN بالـ NaN code سليم ومابيرميش أي error؛ هي بس بتطلع false.`],
    [`صح. الـ parseInt بتقرا الأرقام اللي في الأول؛ والـ string اللي بيبدأ بحروف بيدّي NaN.`, `الـ parseInt بترجع رقم (أو NaN)، عمرها ما بترجع الـ text الأصلي؛ وهي بتقرا الأرقام اللي في الأول بس: 123، وبعدين NaN.`, `الـ "123Hello" بيبدأ بأرقام، فالـ parseInt بتقرا 123 وتقف عند الحروف؛ التاني بس هو اللي بيدي NaN.`, `الـ "Hello123" بيبدأ بحروف، فالـ parseInt مابتلاقيش رقم في الأول وبترجع NaN، مش 123.`],
    [`الـ - مش بتحوّل الحروف للـ codes بتاعتها.`, `صح. "h" - "a" بتطلع NaN، والـ NaN بتبوّظ الـ sum كله (اتجربت على node).`, `الـ 0 كان محتاج كل a[i] − 'a' تطلع 0، لكن طرح حرفين من بعض بيدي NaN، والـ NaN + أي حاجة بتفضل NaN.`, `غلط، لأن NaN موجودة في الاختيارات وهي الناتج: 'h' − 'a' بتطلع NaN، والـ sum بيفضل NaN.`],
    [`صح. الـ Serialization بتحوّل الـ object لشكل (زي JSON string) ينفع يتخزن أو يتبعت على الـ network، زي JSON.stringify(x) (L9, Data type conversions).`, `الـ Encapsulation معناها إخفاء الـ internal state بتاع الـ object ورا الـ methods بتاعته؛ مالهاش دعوة بتحويل الـ object عشان يتبعت.`, `الـ Inheritance معناها إن object يعيد استخدام الـ members بتاعة الـ parent (زي Object.create)؛ مش بتحوّل الـ data عشان تتبعت.`, `غلط، لأن Object Serialization موجودة في الاختيارات وهي بالظبط العملية دي.`],
    [`الـ timers عمرها ما بتشتغل قبل ما الـ code الحالي يخلص.`, `حتى الـ timer اللي 0 ms بيستنى لحد ما الـ function تخلص.`, `صح. الـ logs الـ synchronous الأول (2، 4)، وبعدين الـ timer اللي 0 ms (3)، وبعد 2 ثانية (1).`, `الـ synchronous code بيشتغل بالترتيب، فالـ 2 بيتطبع قبل الـ 4؛ وبعدين الـ timers بتدي 3، وبعد 2 s بتدي 1: 2 4 3 1.`],
    [`الـ + مع string بيلزق، مش بيدّي NaN.`, `الـ "Hello" + 6 بيتلزقوا ويبقوا "Hello6" مش NaN، والـ object بيبقى "[object Object]6".`, `صح. 5 + 6 = 11؛ و"Hello" + 6 بيتلزقوا ويبقوا "Hello6"؛ والـ object بيتحوّل للـ string "[object Object]" وبعدين يتلزق فيه الـ 6 (JavaScript MCQ Sheet، اتجربت على node).`, `غلط، لأن "11 Hello6 [object Object]6" موجودة في الاختيارات وهي بالظبط اللي الـ loop بيطبعه.`],
    [`الـ === مابتبصش جوه الـ objects؛ اتنين objects مختلفين بنفس المحتوى بالظبط برضه مش equal.`, `صح. اتنين objects مختلفين عمرهم ما يبقوا ===، حتى لو المحتوى واحد.`, `اللي بيتقارن الـ references بس، مش المحتوى، فـ "Both" غلط.`, `غلط، لأن "Their references are compared" موجودة في الاختيارات وهي الإجابة الصح.`],
    [`الـ typeof دايمًا بترجع اسم type، عمرها ما بترجع NaN؛ والـ args هنا array، فبترجع "object".`, `الـ rest parameter ...args بيلم الـ arguments في array [12]، فالـ args مش هي الرقم 12 نفسه.`, `صح. الـ rest parameters بتعمل array، والـ typeof للـ array بيدّي "object".`, `الـ typeof عمرها ما بترجع "array"؛ الـ arrays أصلًا objects، فـ typeof args بتبقى "object".`],
    [`لما الـ key يتكرر في الـ literal آخر قيمة هي اللي بتكسب، فالـ first بتبقى في الآخر 50، مش 20.`, `صح. آخر قيمة للـ key المتكرر هي اللي بتكسب، وبيفضل في مكانه الأولاني.`, `الـ object مينفعش يشيل نفس الـ key مرتين؛ الـ first: 50 التانية بتكتب فوق الأولى.`, `الـ keys المتكررة في الـ object literal مسموحة في JavaScript؛ آخر قيمة بس هي اللي بتكسب.`],
    [`الـ code سليم: الـ functions أصلًا objects، فإضافة property زي dog.sound حاجة عادية.`, `الـ dog اتعرّفت بس وعمرها ما اتنادت (مفيش dog())، فالـ print اللي جواها مابيشتغلش.`, `الـ dog متعرّفة كـ function قبل ما الـ dog.sound تتحط، فمفيش ReferenceError.`, `صح. الـ functions في الـ JS objects، فإضافة property عادي؛ ومفيش حاجة بتتطبع.`],
    [`صح. الـ keyword in بتشوف الـ object فيه property معينة ولا لأ، زي "name" in S1 بترجع true أو false (L9, Objects).`, `الـ "is in" مش keyword في JavaScript؛ الـ property check بيتعمل بـ in لوحدها: "name" in obj.`, `الـ exists مش keyword في JavaScript؛ الـ property check بيتعمل بـ in: "name" in obj.`, `الـ lies مش keyword في JavaScript؛ الـ property check بيتعمل بـ in: "name" in obj.`],
    [`صح. الـ ... (spread) operator بيفرد الـ iterable زي الـ array لـ elements منفصلة؛ ونفس الـ syntax لو في الـ parameter list بيبقى الـ rest parameter (L9, Functions).`, `الـ ... مابيوصفش أي data type؛ هو بيفرد الـ iterable لـ elements (أو بيلم الـ arguments كـ rest parameter).`, `الـ operator ده موجود من ES6: الـ spread (والـ rest، زي function calc(...A) في L9).`, `غلط، لأن A موجودة في الاختيارات وهي الصح: الـ ... بيفرد الـ iterables لـ elements منفصلة.`],
    [`الـ variable مجرد قيمة متخزنة؛ أما الـ closure فهو function فاضل معاها access على الـ variables بتاعة الـ outer scope.`, `صح. كل function في الـ JS بتعمل closure على الـ scope بتاعها.`, `الـ objects العادية مش closures؛ الـ closure هو function ومعاها الـ outer variables اللي لسه تقدر توصلها.`, `الـ functions بس هي اللي بتعمل closures، مش الـ variables ولا الـ objects، فـ "All of the above" غلط.`],
    [`صح. الـ setInterval بترجع id، والـ clearInterval(id) بتوقف الـ timer المتكرر ده (والـ clearTimeout بتوقف الـ setTimeout) (JavaScript MCQ Sheet).`, `الـ clearTimer مش موجودة في JavaScript؛ الـ interval بيتوقف بالـ clearInterval.`, `الـ intervalOver مش موجودة في JavaScript؛ الـ interval بيتوقف بالـ clearInterval.`, `غلط، لأن clearInterval موجودة في الاختيارات وهي الـ function اللي بتوقف الـ interval timer.`],
    [`صح. لما تكتب async قبل function بتعرّف asynchronous function بترجع Promise؛ وبعدها تقدر تستخدم await جواها (JavaScript MCQ Sheet).`, `الـ await بتستخدم جوه الـ async function عشان تستنى Promise؛ هي مش اللي بتعرّف الـ function.`, `الـ setTimeout دي function بتجدول code يشتغل بعد delay، مش keyword لتعريف functions.`, `غلط، لأن async موجودة في الاختيارات وهي الـ keyword اللي بتعرّف asynchronous function.`],
    [`الـ toLocaleString() بترجع string مش object؛ هي بتعمل format للقيمة حسب الـ locale بتاع الـ user.`, `الـ toLocaleString() مابتعملش parse لأي حاجة؛ هي بتعمل format للقيمة (رقم، تاريخ) كـ string حسب الـ locale.`, `صح (الشيت كاتبها غلط "toLocateString").`, `غلط، لأن C موجودة في الاختيارات وهي الصح: بترجع localized string representation.`],
    [`إجابة الشيت: ده اللي Func كانت هتكتبه. بس بالظبط، Func عمرها ما اتنادت، فالـ paragraph بيفضل فاضي.`, `الـ 81 ده الـ argument؛ الـ Math.sqrt(81) بترجع الجذر التربيعي بتاعه، 9، وده اللي الـ Func كانت هتكتبه.`, `تعريف function مش بتتنادى مش error، والـ Math.sqrt(81) سليمة؛ مفيش حاجة بتفشل.`, `الـ 0 مش الجذر التربيعي لـ 81؛ الـ Math.sqrt(81) بتساوي 9، وده اللي الـ Func كانت هتكتبه.`],
    [`الـ parseInt("42") بتشتغل، بس Number("42") وparseFloat("42") كمان بيشتغلوا، فالإجابة "All of them".`, `الـ Number("42") بتشتغل، بس parseInt("42") وparseFloat("42") كمان بيشتغلوا، فالإجابة "All of them".`, `الـ parseFloat("42") بتشتغل، بس parseInt("42") وNumber("42") كمان بيشتغلوا، فالإجابة "All of them".`, `صح. المحاضرة بتذكر الـ unary + وNumber(x) وparseInt(x) وparseFloat(x) كطرق لتحويل string لرقم؛ والتلاتة اللي هنا بيدوا 42 (L9, Data type conversions).`],
    [`الـ slide بتقول Banana، بس الـ index 6 هو المسافة اللي بعد الـ comma.`, `صح. الحروف من 6 لـ 12، وبتبدأ بمسافة (اتجربت على node).`, `الـ "Banana," كانت هتاخد الـ index 13، لكن الـ substring مابتاخدش الـ end index؛ وكمان ناقصها الـ space اللي في الأول عند الـ index 6.`, `الـ " Banana, Kiwi" ده ناتج substring(6)، اللي بتكمل لآخر الـ string؛ أما substring(6, 13) فبتقف قبل الـ index 13.`]
  ],
  extra: [
    [`الـ "a" موجودة عند الـ index 1 والـ index 3؛ ولو عدّينا من 0، الـ index 4 هو "S" (J=0، a=1، v=2، a=3، S=4).`, `صح. الـ indexes بتبدأ من 0: J=0، a=1، v=2، a=3، S=4، فالـ charAt(4) بترجع الـ string اللي فيه حرف واحد "S" (L9, Strings).`, `الـ "c" عند الـ index 5؛ والـ charAt(4) بترجع الحرف اللي قبله على طول، "S".`, `الـ 83 ده الـ character code بتاع "S"، وده اللي charCodeAt(4) كانت هترجعه؛ أما الـ charAt فبترجع الحرف نفسه.`],
    [`الـ 5 بتعد كل الحروف، لكن الـ split بتشيل الـ commas وترجع الأجزاء بس: ["a", "b", "c"].`, `الـ 1 معناها إن مفيش split حصل، لكن الـ string فيه commas، فبيتقسم لتلات أجزاء.`, `الـ 2 بتعد الـ commas؛ والـ separators الاتنين بيقسموا الـ string لتلات أجزاء، فالـ length بتبقى 3.`, `صح. الـ split(",") بتقسم الـ string عند كل comma لـ array ["a", "b", "c"]، والـ length بتاعها 3 (L9, Strings).`],
    [`صح. الـ ceil بتطلع لفوق (ناحية +infinity)، والـ floor بتنزل لتحت (اتجربت على node).`, `ده معكوس: الـ ceil بتقرّب لفوق ناحية +infinity (−2.5 → −2) والـ floor بتقرّب لتحت (−2.5 → −3).`, `الـ ceil(−2.5) فعلًا −2، لكن الـ floor بتنزل لأكبر integer مش أكبر من −2.5، اللي هو −3.`, `الـ ceil والـ floor عمرهم ما بيغيروا الإشارة؛ للـ −2.5 بيدوا −2 و−3.`],
    [`الـ "object" ده typeof الـ {a: 1} الأصلي؛ لكن الـ JSON.stringify بتحوّله لـ string، فالـ typeof بتدي "string".`, `الـ typeof عمرها ما بترجع "json"؛ الـ JSON text ده string عادي، فالناتج "string".`, `صح. والـ JSON.parse بترجّعه object.`, `الـ JSON.stringify بترجع text مش رقم، فالـ typeof بتدي "string".`],
    [`الـ b ليها default value، فمش هتبقى undefined.`, `صح. الـ default parameter b = 2 بيستخدم بس لما الـ b متتبعتش.`, `الـ 3 معناها إن الـ b أخدت 0 كـ default، لكن الـ default هو b = 2، فـ add(3) = 3 + 2 = 5.`, `الـ argument اللي بتبعته بيحل محل الـ default، فـ add(3, 4) بتستخدم b = 4 وبتدي 7، مش 5.`],
    [`الـ self-invoked function غالبًا anonymous ومابتتناداش باسمها؛ هي بتشتغل على طول في المكان اللي اتكتبت فيه.`, `هي مش مربوطة بأي event؛ الـ () اللي في آخرها بتناديها على طول وهو الـ script بيشتغل.`, `هي بتشتغل فعلًا، مرة واحدة بالظبط وعلى طول؛ والـ example بتاع المحاضرة بيطبع sum=13 في ساعتها.`, `صح. الـ self-invoked function بتتحط جوه أقواس وبعدها ()، فبتشتغل على طول في المكان اللي اتعرّفت فيه، زي (function(){ ... })(); اللي بيطبع sum=13 (L9, Functions).`],
    [`صح. الـ localStorage مالوش expiration date.`, `إن الـ data تضيع لما الـ browser يتقفل ده بيوصف الـ sessionStorage؛ أما الـ localStorage فمالهاش expiration date.`, `الـ localStorage بتتخزن في الـ browser على جهاز الـ user نفسه وعمرها ما بتتبعت للـ server؛ الصفحة بترجع تقراها بـ localStorage.getItem().`, `مفيش حاجة بتفشل: الـ data بتاعة الـ localStorage بتفضل موجودة بعد قفل الـ browser، فالـ getItem('color') بترجع اللون المحفوظ عادي.`],
    [`الـ onload بيشتغل مرة واحدة بس، لما الصفحة تخلص تحميل، فمايقدرش يتابع كل key الـ user بيكتبه.`, `صح. بيشتغل كل مرة الـ user يسيب زرار (مثال L9).`, `الـ onresize بيشتغل لما حجم الـ window يتغير، مش لما الـ user يكتب.`, `الـ ondblclick بيشتغل مع الـ double-click بالـ mouse، مش لما الـ user يكتب.`],
    [`الـ delete o.a بتشيل الـ property a فعلًا، ففاضل الـ b بس وعدد الـ keys بيبقى 1.`, `الـ a بس هي اللي اتمسحت؛ الـ b لسه موجودة في الـ object، فـ Object.keys(o) بتبقى ["b"] والـ length بتاعها 1.`, `صح. الـ delete o.a بتشيل الـ property a، ففاضل الـ b بس؛ Object.keys(o) بتبقى ["b"] والـ length بتاعها 1 (L9, Objects).`, `الـ Object.keys بترجع array، والـ length بتاعة أي array دايمًا رقم، هنا 1.`],
    [`الـ escape بتعمل encode للحروف اللي مش alphanumeric على شكل %xx (الـ space بتبقى %20)؛ مابتنفذش code.`, `الـ isFinite بتختبر بس إذا كانت القيمة finite number ولا لأ؛ مابتنفذش code.`, `الـ parseInt بتحوّل الـ string لـ integer؛ مابتنفذش الـ string كأنه code.`, `صح. بترجع قيمة آخر statement، زي eval("2*3") = 6.`]
  ]
};


AR.web.lectures["10"] = {
  notes: [
    { h: `الـ URLs والـ web servers والـ server-side programming`, pts: [
      `لما تكتب <code>http://server/path/file</code>: (1) الكمبيوتر بتاعك بيدوّر على الـ <b>IP address بتاع الـ server عن طريق الـ DNS</b>؛ (2) الـ browser <b>بيتصل بالـ IP ده</b> ويطلب الملف؛ (3) الـ <b>web server software (زي Apache)</b> بيجيب الملف من الـ file system بتاع الـ server؛ (4) الـ server <b>بيبعت محتواه</b> للـ browser.`,
      `فيه URLs بتحدد <b>برامج</b> الـ server لازم يشغّلها ويبعت الـ <b>output</b> بتاعها: <code>http://www.facebook.com/home.php</code> بيقول لـ facebook.com يشغّل home.php ويرجّع الـ output بتاعه.`,
      `الـ Architecture: الـ browser ← Web/Application server (Apache، WebSphere؛ Java Servlets، XML files) ← الـ Database.`,
      `الـ Server-side pages هي برامج مكتوبة بلغات/frameworks للويب: <b>PHP، Java/JSP، Ruby on Rails، ASP.NET، Python، Perl</b>.`,
      `<b>الـ Characteristics</b> بتاعة الـ server-side scripting: (1) <b>تعدّل أو تغير أو تضيف</b> أي محتوى للصفحة بشكل dynamic؛ (2) <b>ترد على استعلامات الـ user</b> أو الداتا اللي جاية من HTML forms؛ (3) <b>توصل لأي داتا أو databases</b> وترجّع النتايج للـ browser؛ (4) <b>تعمل customize</b> للصفحة عشان تبقى مفيدة أكتر لكل user؛ (5) <b>توفر security</b> لأن الـ server code مش ممكن يتشاف من الـ browser.`,
      `الـ <b>web server</b> عليه software بيخليه يشغّل الـ server-side programs ويبعت الـ output بتاعها كـ responses. كل لغة ليها مميزات وعيوب؛ والكورس بيستخدم PHP.`
    ] },
    { h: `يعني إيه PHP؟ وليه PHP؟`, pts: [
      `الـ <b>PHP</b> = "<b>PHP Hypertext Preprocessor</b>" (اختصار recursive، يعني الاسم جواه نفسه): لغة <b>server-side scripting</b> open-source بتستخدم عشان تخلي الصفحات <b>dynamic</b>: تعرض محتوى مختلف حسب الموقف، تتعامل مع services تانية (<b>database، e-mail</b>)، <b>تعمل authenticate للـ users</b>، و<b>تعالج بيانات الـ forms</b>. والـ PHP code ممكن يتحط جوه الـ (X)HTML.`,
      `<b>ليه PHP؟</b> <b>Free و open source</b>؛ <b>Compatible</b> (لحد November 2006 أكتر من <b>19 مليون website</b> كانوا بيستخدموا PHP)؛ <b>Simple</b>.`,
      `دورة حياة الـ PHP request: الـ browser بيطلب Hello.php ← الـ server بيشغّل الـ PHP code ← الـ HTML الناتج بس ("Hello world!") هو اللي بيوصل لكمبيوتر الـ user.`
    ] },
    { h: `الـ Basic syntax والـ output والـ comments`, pts: [
      `الـ code اللي بين <code>&lt;?php</code> و<code>?&gt;</code> بيتنفذ كـ PHP؛ وأي حاجة تانية بتطلع HTML عادي. وتقدر تنقل بين الـ HTML والـ PHP رايح جاي.`,
      `الـ Output: <code>print "text";</code> أو <code>echo "a", "b";</code>. الـ escape characters نفس الـ Java (<code>\\"</code>، <code>\\n</code>). والـ strings ممكن تكمل على أكتر من سطر.`,
      `الـ Comments: <code># single-line</code>، <code>// single-line</code>، <code>/* multi-line */</code> (زي الـ Java، بس الـ # مسموحة كمان).`
    ] },
    { h: `الـ Variables والـ types والـ constants`, pts: [
      `<code>$name = expression;</code>: الأسماء <b>دايمًا بتبدأ بـ $</b> في التعريف وفي الاستخدام، و<b>case sensitive</b>، و<b>بتتعرف ضمنيًا بالـ assignment</b> (مش بتكتب الـ type)؛ الـ PHP لغة <b>loosely typed</b>.`,
      `أسماء صح: <code>$_hello</code>، <code>$hello3</code>. أسماء غلط: <code>$3hello</code> (مينفعش تبدأ برقم)، <code>$this</code> (محجوزة)، <code>$5_Hello</code>.`,
      `الـ Basic types: <b>int، float، boolean، string، array، object، NULL</b>. تختبرها بالـ functions بتاعة <b>is_type</b> (is_string، is_int، is_numeric...)، والـ <b>gettype()</b> بترجع الـ type كـ string، والـ <b>var_dump()</b> بتطبع الـ type والقيمة: <code>var_dump("Harry")</code> ← <code>string(5) "Harry"</code>، <code>var_dump(28)</code> ← <code>int(28)</code>، <code>var_dump(null)</code> ← <code>NULL</code>.`,
      `التحويل الأوتوماتيك: string ← int مع الـ <b>+</b> (<code>5 + "7"</code> = 12)؛ int ← float مع الـ <b>/</b> (<code>7 / 2</code> = 3.5). والـ Type-cast بـ <code>(int)</code>، زي <code>$age = (int) "21";</code>، <code>(int) 3.5</code> = 3، <code>round(3.5)</code> = 4 (float).`,
      `الـ <b>Constants</b>: <code>define("DB_NAME", "mySchool");</code> وبعدين تستخدم <code>DB_NAME</code> <b>من غير $</b>. لو كتبت <code>$DB_NAME</code> كده انت بتشاور على variable (مش متعرّف).`
    ] },
    { h: `الـ Operators والـ strings والـ NULL`, pts: [
      `الـ Arithmetic: <code>+ - * / % . ++ --</code>؛ والـ assignment: <code>= += -= *= /= %= .=</code>.`,
      `الـ operator بتاع لزق الـ strings هو <b>. (النقطة)</b> مش +: <code>5 + "2 turtle doves"</code> ← 7 (مع warning في PHP 8)؛ <code>5 . "2 turtle doves"</code> ← "52 turtle doves".`,
      `الـ indexing بيبدأ من صفر: <code>$favorite_food = "Ethiopian"; print $favorite_food[2];</code> ← <b>h</b>. مفيش char type؛ كل حرف عبارة عن string.`,
      `الـ Functions (واللي يقابلها في الـ Java): <b>strlen</b> (length)، <b>strpos</b> (indexOf)، <b>substr</b> (substring)، <b>strtolower / strtoupper</b>، <b>trim</b>، <b>explode / implode</b> (split / join)، <b>strcmp</b> (compareTo).`,
      `لو <code>$name = "Mohammed AbdelFattah"</code>: الـ strlen = 20؛ strpos($name, "e") = 6؛ substr($name, 9, 5) = "Abdel"؛ strtoupper ← "MOHAMMED ABDELFATTAH". والـ <code>trim("Hello World!", "Hed!")</code> بتشيل الحروف دي من الطرفين ← "llo Worl".`,
      `الـ strings اللي بين <b>double quotes بتتفسّر (interpreted)</b>: الـ variables اللي جواها بتتبدل بقيمها: <code>"You are $age years old.\\n"</code> ← You are 16 years old.`,
      `الـ strings اللي بين <b>single quotes مش بتتفسّر</b>: <code>'You are $age years old.\\n'</code> بتطبع النص زي ما هو بالحرف، حتى الـ \\n.`,
      `استخدم الـ braces عشان تمنع اللبس: <code>"Today is your $ageth birthday"</code> هيدوّر على $ageth (مش موجود)؛ لكن <code>"Today is your {$age}th birthday"</code> هتشتغل.`,
      `الـ variable بيبقى <b>NULL</b> لو ماتحطلوش قيمة (undefined)، أو اتحطله <code>NULL</code>، أو اتمسح بـ <b>unset()</b>. والـ <b>isset()</b> بتختبر إنه مش NULL. والـ NULL بتتطبع كـ string فاضي.`
    ] },
    { h: `الـ Booleans والـ control structures والـ math`, pts: [
      `القيم اللي بتبقى FALSE: <b>0 و0.0</b>، <b>"" و"0"</b>، <b>NULL</b> (ومعاها الـ variables اللي ملهاش قيمة)، <b>الـ arrays اللي فيها 0 عناصر</b>؛ وأي حاجة تانية TRUE (الـ slide بتنبّه إن "0.00"/"0.000" كـ strings بيبقوا TRUE). الـ FALSE بتتطبع string فاضي؛ والـ TRUE بتتطبع <b>1</b>. <code>(bool) 7</code> ← TRUE.`,
      `<code>if (...) {...} elseif (...) {...} else {...}</code> (خلي بالك: <b>elseif</b> كلمة واحدة)؛ والـ <b>for</b> والـ <b>while</b> والـ <b>do...while</b> نفس الـ Java؛ والـ <b>foreach ($arr as $key =&gt; $value)</b> بتلف على الـ arrays.`,
      `الـ Math functions: abs، ceil، cos، floor، log، log10، max، min، pow، rand، round، sin، sqrt، tan؛ والـ constants <b>M_PI، M_E، M_LN2</b>. <code>sqrt(pow(3,2) + pow(4,2))</code> = 5. الـ types int وfloat: قسمة اتنين int ممكن تطلع float.`,
      `الـ Functions: <code>function name($param) { ... return $value; }</code> (بالـ keyword "function"، ومن غير return type).`
    ] },
    { h: `الـ Arrays (الشيت 3 والامتحانات)`, pts: [
      `<code>$XX = array("MM", "BB");</code> أو <code>["MM", "BB"]</code>؛ والـ <code>count($XX)</code> بيدّي الحجم؛ والـ <code>print_r($XX)</code> بتطبع <code>Array ( [0] =&gt; MM [1] =&gt; BB )</code>.`,
      `الـ <b>array_push($a, v)</b> بتضيف في الآخر؛ الـ <b>array_pop($a)</b> بتشيل الأخير وترجّعه؛ الـ <b>array_shift($a)</b> بتشيل الأول وترجّعه (وتعيد ترقيم الـ indexes)؛ الـ <b>array_unshift</b> بتضيف في الأول؛ الـ <b>sort($a)</b> ترتيب تصاعدي (الحروف الـ uppercase بتيجي قبل الـ lowercase)؛ الـ <b>array_slice($a, offset, length)</b> بترجع عدد <b>length</b> عنصر بادئًا من الـ offset (مش end index).`,
      `<b>explode(' ', "10 12 3")</b> ← ["10","12","3"]؛ والـ <b>implode(' ', $arr)</b> بتلم. والـ <b>str_pad($s, n, " ", STR_PAD_LEFT)</b> بتكمّل من الشمال لحد ما العرض يبقى n.`
    ] },
    { h: `الـ Forms مع PHP (مثال الـ login في L10)` },
    { h: `الـ GET مقابل الـ POST` },
    { h: `تمارين PHP (L10، متحلولة في الشيت 3)` }
  ],
  cards: [
    `PHP Hypertext Preprocessor (اختصار recursive).`,
    `على الـ server؛ والـ output بتاعها بس (HTML) هو اللي بيوصل للـ browser.`,
    `Free و open source، compatible (19 مليون موقع سنة 2006)، simple.`,
    `تعدّل المحتوى بشكل dynamic، ترد على داتا الـ forms/الاستعلامات، توصل للـ databases، تعمل customize للصفحات لكل user، security (الـ code مش ظاهر).`,
    `الـ code بيتحط بين &lt;?php ... ?&gt;`,
    `بتبدأ بـ $، case sensitive، وبتتعرف بالـ assignment.`,
    `لأ: بعد الـ $ الاسم لازم يبدأ بحرف أو underscore (الـ $_hello صح).`,
    `. (النقطة).`,
    `12 (الـ string بيتحوّل لرقم مع الـ +).`,
    `"52 turtle doves" (النقطة بتلزق).`,
    `الـ Double quotes بتحط قيم الـ variables جوه النص؛ والـ single quotes بتطبع زي ما هي بالحرف.`,
    `الـ braces بتفصل اسم الـ variable عن الحروف اللي بعده.`,
    `define("NAME", value)؛ وتستخدم NAME من غير $.`,
    `string(5) "Harry" (الـ type والطول والقيمة).`,
    `الـ TRUE بتتطبع 1؛ والـ FALSE بتتطبع string فاضي.`,
    `0، 0.0، ""، "0"، NULL، الـ array الفاضية.`,
    `بترجع true لو الـ $x موجود ومش NULL.`,
    `#، //، /* */.`,
    `6 (الـ (int) بيقطع 6.5).`,
    `عنصرين بادئًا من index 1 (offset، length).`
  ],
  qa: [
    `الـ Server-side scripting تقدر: (1) تعدّل أو تغير أو تضيف أي محتوى للصفحة بشكل dynamic؛ (2) ترد على استعلامات الـ user أو الداتا اللي جاية من HTML forms؛ (3) توصل لأي داتا أو databases وترجّع النتايج للـ browser؛ (4) تعمل customize للصفحة عشان تبقى مفيدة أكتر لكل user؛ (5) توفر security لأن الـ server code مش بيتشاف من الـ browser. وبنستخدم PHP لأنها free و open source، وcompatible (أكتر من 19 مليون website كانوا بيستخدموها لحد November 2006)، وsimple؛ وهي server-side scripting language بتخلي الصفحات dynamic، وبتتعامل مع الـ databases والـ e-mail، وبتعمل authenticate للـ users وبتعالج بيانات الـ forms، وممكن تتحط جوه الـ HTML.`,
    `الكمبيوتر بيدوّر على الـ IP address بتاع الـ server عن طريق الـ DNS؛ الـ browser بيتصل بالـ IP ده ويطلب الملف؛ الـ web server software (زي Apache) بيجيب الملف من الـ file system بتاعه؛ والـ server بيبعت المحتوى. لو الـ URL بيشاور على برنامج (زي home.php)، الـ server بيشغّل البرنامج ويبعت الـ output بتاعه (HTML) بدل الـ source code.`,
    `<b>أوجه الشبه</b>: الاتنين scripting languages بتتعمل لها interpretation، وloosely (dynamically) typed، والـ syntax بتاعهم شبه C/Java (if، for، while، functions)، والاتنين بيتحطوا جوه صفحات HTML وبيتستخدموا لعمل صفحات dynamic، والاتنين بيدعموا arrays وobjects. <b>الفروق</b>: الـ JavaScript بتشتغل على الـ client جوه الـ browser، أما الـ PHP فبتشتغل على الـ server؛ الـ JS code ظاهر للـ users والـ PHP code لأ؛ الـ PHP تقدر توصل للـ databases والـ file system بتاع الـ server، والـ JS اللي على الـ client ماتقدرش تقرا/تكتب files؛ الـ variables في PHP بتبدأ بـ $ واللزق بـ "."، والـ JS بتستخدم var/let/const و"+"؛ الـ JS بترد على الـ events جوه الصفحة من غير reload، والـ PHP بتجهّز الصفحة قبل ما تتبعت.`,
    `الـ Variables بتبدأ بـ $، وcase sensitive، وبتتعرف بالـ assignment؛ والـ PHP لغة loosely typed. الـ Types: int، float، boolean، string، array، object، NULL؛ وتختبرها بـ is_string() وأخواتها، والـ gettype() والـ var_dump(). الـ PHP بتحوّل أوتوماتيك: string ← number مع الـ + (5 + "7" = 12)، وint ← float مع الـ / (7/2 = 3.5). والـ casts الصريحة بـ (int)، (float)، (bool)، (string)، زي (int)"21". والـ Constants بتتعمل بـ define("NAME", value) وبتستخدم من غير $.`,
    `الـ strings اللي بين double quotes بتتفسّر: الـ variables اللي جواها بتتبدل، فلو $age = 16، "You are $age years old." هتطبع You are 16 years old. أما اللي بين single quotes فمش بتتفسّر: 'You are $age years old.\\n' بتطبع النص ده بالظبط. ولو فيه حروف بعد اسم الـ variable على طول، حطه بين braces: "{$age}th birthday" (من غير الـ braces الـ PHP هتدوّر على $ageth).`
  ],
  quiz: [
    [`الجملة دي صح (الـ PHP مجانية و open source)، بس الجملتين التانيين صح برضه، فالإجابة "All of the mentioned".`, `الجملة دي صح (الـ PHP بتخلي الصفحات dynamic)، بس الجملتين التانيين صح برضه، فالإجابة "All of the mentioned".`, `الجملة دي صح (الـ PHP بتشتغل على الـ server)، بس الجملتين التانيين صح برضه، فالإجابة "All of the mentioned".`, `صح. التلات جمل بيوصفوا الـ PHP (L10).`],
    [`صح. الـ code اللي بين &lt;?php و?&gt; بيتنفذ كـ PHP.`, `&lt; php &gt; ده مش delimiter بتاع PHP؛ الـ PHP code بيتكتب بين &lt;?php و ?&gt;.`, `الـ opening tag لازم يتكتب &lt;?php من غير مسافات؛ لو فيه مسافات الـ PHP مش هتتعرف عليه.`, `الـ short tags موجودة بس غالبًا بتبقى disabled؛ والشكل الـ standard هو A.`],
    [`بعد الـ $ الاسم مينفعش يبدأ برقم، فـ $3hello مش valid؛ لازم يبدأ بحرف أو underscore.`, `صح. بيبدأ بـ $ وبعده underscore.`, `الـ $this محجوزة (بتشاور على الـ object الحالي)، فمينفعش تستخدمها كاسم variable عادي.`, `بعد الـ $ الاسم مينفعش يبدأ برقم، فـ $5_Hello مش valid.`],
    [`ناقصة الـ keyword function؛ من غيرها الـ PHP هتقرا ده على إنه call لـ functionName، مش تعريف.`, `ناقص اسم الـ function والـ parameter list؛ الـ function في PHP شكلها function name($param) { ... }.`, `صح. الـ function في PHP بتبدأ بالـ keyword function، وبعدها الاسم والـ parameters، ومن غير return type: function name($param) { ... return $value; } (L10).`, `ده أسلوب C/Java؛ الـ PHP مفيهاش return type في الأول.`],
    [`الـ echo بتطبع قيمة الـ variable، مش اسمه.`, `صح (إجابة الـ key). الـ $GREETING ده variable مش متعرّف (الـ constants بتستخدم من غير $)، فمفيش حاجة بتتطبع؛ وفي PHP 8 كمان بيطلع warning "Undefined variable" لو الـ errors ظاهرة.`, `النص ده بيتطبع بس مع echo GREETING; (الـ constants بتستخدم من غير $)؛ إنما $GREETING ده variable مش متعرّف.`, `الـ echo عمرها ما بتطبع اسم الـ constant؛ و$GREETING ده variable تاني خالص مش متعرّف، فمفيش حاجة بتتطبع.`],
    [`صح. جوه الـ double quotes الـ variables المش متعرّفة $winner و$looser بتتبدل بـ strings فاضية، فـ $a = "" و$b = "/".`, `الـ double quotes بتحط القيمة، مش بتطبع الاسم.`, `الـ double quotes بتعمل interpolation للـ $looser، وهو مش متعرّف فبيبقى empty string، فالـ $b بتبقى "/" بس.`, `عشان الأسامي تتطبع زي ما هي كنا محتاجين single quotes؛ إنما في الـ double quotes الـ variables الاتنين المش متعرّفين بيبقوا فاضيين، ويفضل "/".`],
    [`دول ناتج القسمة الصحيحة، مش القيم اللي بترجع.`, `صح. الـ MXX بتحسب باقي القسمة من غير %: 13 - 2*6 = 1؛ 81 - 3*27 = 0.`, `الـ (int) بيقطع 13 / 2 = 6.5 لـ 6، فالـ function بترجع 13 − 2×6 = 1، رقم صحيح؛ الـ 1.5 مش بتظهر خالص.`, `الترتيب معكوس: MXX(13,2) بتتطبع الأول وبتدّي 1، وبعدها MXX(81,3) بتدّي 0.`],
    [`11 15 6 ده جمع الأزواج (10+1، 12+3، 3+3)، بس الـ loop بتضربهم: $a[$key] * $b[$key].`, `صح. الـ explode بتقسم الـ strings الاتنين لـ arrays، والـ loop بتضرب العناصر اللي قصاد بعض (10×1، 12×3، 3×3)، والـ implode بتلمّهم بمسافات: 10 36 9 (Sheet 3).`, `الـ implode بتلم؛ مش بتضرب كل حاجة في بعض.`, `لزق الـ inputs الاتنين ده يبقى concatenation؛ إنما الـ function بتضرب عنصر في عنصر وبترجع الـ 3 نواتج بس.`],
    [`صح. الـ PHP بتزوّد الـ strings اللي فيها حروف وأرقام زي العدّاد (إجابة الشيت 3).`, `الـ PHP مش بتحوّل 'A00' لرقم؛ الـ ++ على string زي دي بيزوّدها زي العدّاد: A01، A02...`, `الحرف اللي على اليمين خالص هو اللي بيزيد الأول.`, `زيادة الـ alphanumeric string مسموحة في PHP؛ 'A00' بتبقى 'A01' وهكذا، من غير أي error.`],
    [`57 ده يبقى concatenation، واللزق في PHP بالـ period (.) مش بالـ +؛ مع الـ + الـ string بيتحوّل لرقم.`, `صح. الـ string بيتحوّل لرقم مع الـ +.`, `الـ PHP بتحوّل الـ numeric string أوتوماتيك مع الـ +، فمفيش error: 5 + "7" بتساوي 12.`, `"7" ده numeric string، فبيتحوّل لـ 7 ويتجمع، والناتج 12؛ مش بيتجاهل.`],
    [`7 ده ناتج 5 + "2 turtle doves" (جمع أرقام)؛ إنما الـ period operator بيعمل concatenation.`, `صح. الـ period (.) هو الـ string concatenation operator في PHP، فالـ 5 بيتلزق في النص: "52 turtle doves" (L10, Operators).`, `الـ concatenation بيلزق الـ strings زي ما هي بالظبط، فمفيش مسافة بتتحط بين 5 و 2.`, `5 . "2 turtle doves" ده code سليم؛ الرقم 5 بيتحوّل لـ string ويتلزق.`],
    [`الـ t عند index 1؛ الـ strings بتتعد من صفر (E=0، t=1، h=2)، فالـ [2] هو h.`, `صح. الـ string indexing بيبدأ من صفر: E=0، t=1، h=2، فـ $favorite_food[2] هو "h" (L10, Strings).`, `الـ i عند index 3؛ إنما index 2 هو h (E=0، t=1، h=2).`, `الـ [2] اللي بعد الـ variable بيختار حرف واحد بس، مش الـ string كله.`],
    [`تبديل $age بـ 16 بيحصل بس في الـ double-quoted strings؛ الـ single-quoted strings بتتطبع زي ما هي بالحرف.`, `صح. الـ strings اللي بين single quotes مش بتتفسّر.`, `الـ single quotes مش بتدوّر على الـ variable أصلًا، فالـ $age بيتطبع كنص، مش كقيمة فاضية.`, `الـ single-quoted strings دي PHP سليمة؛ هي بس مش بتتفسّر، فالنص بيتطبع زي ما هو مكتوب.`],
    [`الـ string "0" موجود في ليستة الـ FALSE بتاعة المحاضرة (مع "")، فمش TRUE.`, `الـ empty string "" موجود في ليستة الـ FALSE بتاعة المحاضرة، فمش TRUE.`, `الـ array اللي فيها 0 عناصر موجودة في ليستة الـ FALSE بتاعة المحاضرة، فالـ array() مش TRUE.`, `صح. حسب المحاضرة، الـ "0.00" مش في لستة الـ FALSE، فهي TRUE.`],
    [`قسمة two ints في PHP ممكن تطلع float، فـ 7 / 2 بتساوي 3.5 مش 3؛ والـ round(3.5) بتساوي 4.`, `صح. الـ (int) بيقطع؛ والـ round بتدّي 4.0 (float).`, `الـ (int) بيقطع الكسر بدل ما يقرّب، فـ (int) 3.5 بتساوي 3، مش 4.`, `الـ (int) بيحوّل 3.5 للـ integer 3، والـ round(3.5) بتساوي 4، فـ $b = 3.5 و $c = 3 الاتنين غلط.`],
    [`الـ trim بتشيل الحروف اللي في اللستة من الطرفين.`, `صح. بتشيل الـ H والـ e من الأول، والـ ! والـ d من الآخر؛ وبتقف عند الـ l من الناحيتين.`, `الـ d موجود في ليستة الحروف "Hed!"، فبعد ما الـ ! يتشال، الـ d اللي في الآخر بيتشال هو كمان، ويفضل "llo Worl".`, `الـ l مش في الليستة "Hed!"، فالـ trim بيقف عند أول l من كل ناحية: "llo Worl".`]
  ],
  extra: [
    [`صح. الـ string "5" بيتحوّل لرقم مع الـ +.`, `53 ده يبقى concatenation، واللزق في PHP بالـ period (.)؛ مع الـ + الـ string "5" بيتحوّل للرقم 5.`, `مفيش quotes بتتطبع ومفيش لزق: الـ + بيحوّل "5" لرقم ويجمع عليه 3، والناتج 8.`, `الـ PHP بتحوّل الـ numeric string "5" أوتوماتيك مع الـ +، فمفيش error.`],
    [`الـ .= ده الـ concatenation assignment، فبيلزق "10" و "5" بدل ما يجمعهم.`, `صح. الـ .= بتضيف على آخر الـ string: $a = $a . 5، فـ "10" . "5" = "105" (L10, Assignment operators).`, `50 ده يبقى 10 × 5، بس الـ .= بتعمل concatenation، فالناتج "105".`, `الـ .= ده assignment operator سليم في PHP؛ بيحوّل 10 و 5 لـ strings ويلزقهم.`],
    [`الـ double-quoted strings بتبدّل الـ variables بقيمتها، فالـ {$n} بتبقى 5، مش النص $n.`, `الـ 0 اللي بعد الـ closing brace ده نص عادي وبيتطبع هو كمان، فالناتج "Value: 50".`, `صح. الـ braces بتفصل اسم الـ variable عن الـ "0" اللي بعده.`, `الـ braces بس بتحدد اسم الـ variable بيخلص فين؛ مش بتتطبع، فالناتج "Value: 50".`],
    [`الـ \\n بيبقى new line بس في الـ double quotes؛ الـ single-quoted strings مش بتتفسّر.`, `الـ backslash والـ n مش بيتشالوا؛ في الـ single quotes بيتطبعوا زي ما هما كـ \\n.`, `الـ echo بتطبع النص؛ الـ single quotes بس بتمنع التفسير، فـ "Line\\n" بتظهر زي ما هي مكتوبة.`, `صح. الـ strings اللي بين single quotes مش بتتفسّر.`],
    [`صح. الـ variable المش متعرّف بيبقى NULL، فالـ isset بترجع false.`, `الـ isset() بترجع true بس لـ variable متعيّن ومش NULL؛ والـ variable اللي عمره ما اتعيّن قيمته NULL.`, `الـ isset() دايمًا بترجع boolean، عمرها ما بترجع NULL؛ ومع variable مش متعيّن بترجع false.`, `الـ isset() معمولة أصلًا عشان تختبر الـ variables بأمان، فمش بتطلّع error مع variable مش متعرّف؛ بترجع false.`],
    [`الـ PHP مش بتطبع الكلمتين true و false؛ الـ TRUE بتتطبع 1 والـ FALSE بتتطبع empty string.`, `الـ TRUE بتتطبع 1 فعلًا، بس الـ FALSE بتتطبع empty string، مش 0.`, `صح. وقت الـ echo، الـ TRUE بتتحوّل للـ string "1" والـ FALSE لـ empty string، فمفيش حاجة بتظهر مع الـ false (L10, Booleans).`, `الـ echo مش بتطبع أسامي الـ constants؛ الـ TRUE بتتطبع 1 والـ FALSE مش بتطبع حاجة.`],
    [`صح. الـ substr من index 3، 4 حروف = "prog"، وبعدين uppercase.`, `BPRO بتبدأ من index 2؛ الـ indexes هي w=0، e=1، b=2، p=3، فالـ substr من 3 بيدّي "prog".`, `الـ argument التالت ده length قيمته 4 حروف، فبياخد "prog"، مش "pro" بس.`, `WEBP ده يبقى ناتج substr(0, 4)، من الأول؛ إنما الـ call ده بيبدأ من index 3.`],
    [`الـ sort() بترتّب الـ array نفسها (in place)، فالـ $arr بتبقى [1, 2, 3] لحد ما يتعمل لها implode.`, `الـ sort() بترتّب تصاعدي (ascending)؛ التنازلي محتاج rsort().`, `"Array" ده اللي echo $arr كانت هتطبعه؛ إنما الـ implode بتلم العناصر في الـ string "1,2,3".`, `صح. الـ sort() بترتّب الـ array تصاعدي in place، فبتبقى [1, 2, 3]، والـ implode(",", ...) بتلمّها في "1,2,3" (L10, Arrays).`],
    [`الوصول للداتا أو الـ databases ورجوع النتايج للـ browser ده متذكور فعلًا كـ characteristic للـ server-side.`, `الرد على استفسارات الـ user والداتا اللي جاية من الـ HTML forms ده متذكور فعلًا كـ characteristic للـ server-side.`, `صح. تحريك العناصر في الـ browser من غير الـ server ده شغل client-side (JavaScript/CSS)؛ ليستة L10 بتتكلم عن تعديل المحتوى، والرد على الـ forms، والوصول للـ databases، وتخصيص الصفحات، والـ security.`, `توفير الـ security لأن الـ server code مينفعش يتشاف من الـ browser ده متذكور فعلًا كـ characteristic للـ server-side.`],
    [`الـ constants بتستخدم من غير $؛ الـ $RATE ده variable مش متعرّف، فمش بيطبع حاجة.`, `صح. الـ constant اللي معمول بـ define("RATE", 5) بيتستخدم باسمه على طول من غير $، فـ echo RATE; بتطبع 5 (L10, Constants).`, `الـ quotes بتخلي "RATE" string عادي، فالـ echo بتطبع النص RATE، مش قيمة الـ constant.`, `الـ define بتعمل constants؛ مش بتقراها.`]
  ]
};


AR.web.exams[0] = {
 "sections": [
  {
   "items": [
    {
     "why": "كلهم methods للـ output في الـ JS (ومعاهم الـ innerHTML) (L7).", ow: [`الـ document.write() فعلًا method للـ output، بس الـ console.log() والـ window.alert() كمان، فالإجابة الكاملة هي "All of the above".`, `الـ console.log() فعلًا method للـ output (بيكتب في الـ console)، بس الـ document.write() والـ window.alert() كمان، فالإجابة "All of the above".`, `الـ window.alert() فعلًا method للـ output (بيطلع alert box)، بس الـ document.write() والـ console.log() كمان، فالإجابة "All of the above".`, null]
    },
    {
     "why": "التلات جمل صح: الـ PHP مجانية وopen source، وserver-side، وبنستخدمها عشان نخلي الصفحات dynamic (L10).", ow: [`الجملة دي صح (الـ PHP مجانية و open source)، بس الجملتين التانيين صح برضه، فالإجابة "All of the mentioned".`, `الجملة دي صح (الـ PHP بتخلي الصفحات dynamic)، بس الجملتين التانيين صح برضه، فالإجابة "All of the mentioned".`, `الجملة دي صح (الـ PHP بتشتغل على الـ server)، بس الجملتين التانيين صح برضه، فالإجابة "All of the mentioned".`, null]
    },
    {
     "why": "في الحسابات الـ true = 1: يعني 1 + 1 + (1 * 3) = 5، وخلي بالك إن الضرب بيتعمل الأول (L8).", ow: [`الـ true*3 فعلًا بـ 3، بس خلي بالك إن الـ true التانيين بيتجمعوا كمان.`, `في الحسابات الـ true بيتحوّل لـ 1 مش 0، فالمجموع 1 + 1 + 1×3 = 5؛ عشان يطلع 0 لازم كل true يتحسب 0.`, `الـ Booleans بتتحوّل لـ numbers في الحسابات عادي؛ مفيش error.`, null]
    },
    {
     "why": `كود الـ PHP بيتكتب بين الـ opening tag &lt;?php والـ closing tag ?&gt;؛ وأي حاجة برّاهم بتتبعت HTML عادي (L10, Basic syntax).`, ow: [null, `الـ &lt; php &gt; مش delimiter بتاع PHP؛ الكود بيتكتب بين &lt;?php و ?&gt;.`, `الـ opening tag لازم يتكتب &lt;?php من غير مسافات؛ لو فيه مسافات الـ PHP مش هيعرفه.`, `الـ short tags موجودة بس غالبًا بتبقى مقفولة (disabled)؛ الشكل الـ standard هو A.`]
    },
    {
     "why": "الـ slice(2,4) بتنسخ الـ indexes 2 و3 بس (الـ end مش بيدخل) = [3, 4] (L8).", ow: [null, `الـ 2, 3 دول القيم اللي عند الـ indexes 1 و2؛ لكن الـ slice(2, 4) بتبدأ من index 2 (القيمة 3) وبتقف قبل index 4.`, `الـ slice مابتدخلش الـ end index، فالـ index 4 (القيمة 5) مش داخل؛ النتيجة الـ indexes 2 و3: يعني 3, 4.`, `الـ 2, 3, 4 دي كأنك عاملها positions بتبدأ من 1؛ لكن الـ indexes بتبدأ من 0، فالـ slice(2, 4) بتدي الـ indexes 2 و3: يعني 3, 4.`]
    },
    {
     "why": "بعد الـ $ الاسم لازم يبدأ بحرف أو underscore؛ والـ $this كلمة محجوزة (reserved) (L10).", ow: [`بعد الـ $ الاسم مينفعش يبدأ برقم، فالـ $3hello غلط؛ لازم يبدأ بحرف أو underscore.`, null, `الـ $this كلمة محجوزة (reserved) بتشاور على الـ object الحالي، فمينفعش تستخدمها كاسم variable عادي.`, `بعد الـ $ الاسم مينفعش يبدأ برقم، فالـ $5_Hello غلط.`]
    },
    {
     "why": "الـ function بتعمل destructuring لـ argument واحد بس على إنه object؛ والـ 0 مافيهوش properties اسمها a أو b أو c، فالتلاتة بيطلعوا undefined (اتجربت على node) (L9).", ow: [`الـ function بتعمل destructuring لـ parameter واحد بس على إنه object؛ والـ 0 مش object فيه a وb وc.`, `الـ a بيتقري من الـ properties بتاعة الرقم 0، مش من الرقم نفسه.`, null, `غلط، لأن "undefined undefined undefined" موجودة في الاختيارات وهي اللي بتطلع فعلًا: الـ destructuring للـ 0 مابيلاقيش properties اسمها a أو b أو c.`]
    },
    {
     "why": "الـ strings اللي بين double quotes بيحصل فيها interpolation: الـ $winner والـ $looser مش متعرّفين (فاضيين)، فـ $a = \"\" و $b = \"/\"؛ والـ echo بيطبع \"/\" بس (ومعاه warnings \"Undefined variable\" لو الـ errors بتتعرض) (L10).", ow: [null, `الـ double quotes بتعمل interpolation، مش بتطبع اسم الـ variable.`, `الـ double quotes بتعمل interpolation للـ $looser، وهو مش متعرّف فبيبقى empty string، فالـ $b بيبقى "/" بس.`, `عشان الأسامي تتطبع زي ما هي محتاج single quotes؛ لكن جوه الـ double quotes الـ variables الاتنين المش متعرّفين بيبقوا فاضيين، فيفضل "/" بس.`]
    },
    {
     "why": "الـ // بتبدأ comment سطر واحد في الـ JS (والـ /* */ للـ multi-line؛ والنسخة اللي بالـ backslash في A غلط) (L7).", ow: [`الـ \\* ... *\\ مكتوبة بـ backslashes، ودي مش comment في الـ JavaScript؛ الشكل الـ multi-line هو /* ... */ بـ forward slashes.`, null, `الـ # بتبدأ comment في الـ PHP (والـ Python)، مش في الـ JavaScript، اللي الـ comments فيها // و /* */.`, `الـ $ مابتبدأش comment؛ ده مجرد حرف مسموح بيه في أسامي الـ variables. الـ comments في الـ JS هي // و /* */.`]
    },
    {
     "why": "الـ property اسمها border، وبتتكتب كده: table, th, td { border: 1px solid black; } (L5).", ow: [`الـ table ده element selector بيحدد إنهي elements هتتعملها style، مش property؛ الـ property اللي بترسم الـ borders هي border.`, null, `الـ table:border مش CSS صح؛ الـ selector والـ property بيتكتبوا كده: table {border: 1px solid black;}.`, `غلط، لأن border موجودة في الاختيارات وهي الـ property المستخدمة: table, th, td {border: 1px solid black;}.`]
    },
    {
     "why": "الـ Padding هو المسافة بين الـ content والـ border؛ والـ margin بيبقى برّه الـ border (L4).", ow: [`الـ border بيرسم الخط اللي حوالين الـ element نفسه؛ أما المسافة بين الـ border ده والـ content فهي الـ padding.`, `الـ margin هو المسافة اللي برّه الـ border، بين الـ element واللي جنبه، مش بين الـ border والـ content.`, null, `الـ resize بيتحكم في إن الـ user يقدر يغيّر حجم الـ element ولا لأ؛ ملوش علاقة بالمسافات في الـ box model.`]
    },
    {
     "why": "الـ alt هو الـ attribute المطلوب للـ alternate text (L2).", ow: [`الـ src بيدي الـ path بتاع ملف الصورة اللي هتتعرض؛ ولو الصورة معرفتش تتعرض، النص اللي بيظهر مكانها بييجي من الـ alt.`, `الـ longdesc كان بيشاور على صفحة فيها وصف طويل؛ مش هو الـ alternate text.`, null, `الـ title بيدي معلومة زيادة بتظهر كـ tooltip لما الماوس ييجي على الـ element؛ مش هو النص البديل للصورة اللي مظهرتش.`]
    },
    {
     "why": "الـ External CSS بيتربط بـ &lt;link rel=\"stylesheet\" href=\"...\"&gt; جوه الـ head (L4).", ow: [null, `مفيش element اسمه &lt;stylesheet&gt; في الـ HTML؛ الـ external sheet بيتربط بـ &lt;link rel="stylesheet" href="..."&gt; جوه الـ head.`, `الـ &lt;style&gt; بيشيل internal CSS مكتوب جوه الصفحة ومالوش src attribute؛ الملف الخارجي بيتربط بـ &lt;link&gt;.`, `غلط، لأن اختيار الـ &lt;link rel="stylesheet" ... href="mystyle.css"&gt; موجود وهو الطريقة الصح.`]
    },
    {
     "why": `الـ font-size بيحدد حجم النص، زي h1 {font-size: 300%;} أو 16px؛ أما الـ font-style فبيحدد بس italic/normal (L3/L4).`, ow: [`مفيش CSS property اسمها text-style؛ حجم النص بيتحدد بالـ font-size، زي font-size:300% أو 16px.`, `مفيش CSS property اسمها text-size، حتى لو الاسم شكله صح؛ حجم النص بيتحدد بالـ font-size.`, `الـ font-style بيحدد إن النص normal أو italic أو oblique، مش حجمه؛ الحجم هو الـ font-size.`, null]
    },
    {
     "why": "الـ JSON.stringify() بتحوّل الـ object لـ JSON string؛ والـ JSON.parse() بتعمل العكس (L9).", ow: [null, `الـ JSON.parse() بتعمل العكس: بترجّع الـ JSON string للـ object الأصلي؛ أما الـ serialize فهو stringify().`, `الـ convert() مش method في الـ JSON object؛ الـ object بيتعمله serialize بالـ JSON.stringify().`, `غلط، لأن stringify() موجودة في الاختيارات وهي الـ method اللي بتحوّل الـ object لـ JSON string.`]
    },
    {
     "why": "الألوان ممكن تتكتب أسماء، أو RGB، أو HEX، أو HSL، أو RGBA، أو HSLA (L3).", ow: [`الـ RGB values طريقة صح، بس الـ HEX والـ RGBA كمان (ومعاهم الأسامي والـ HSL والـ HSLA)، فالإجابة الكاملة "All of the above".`, `الـ HEX values زي #ff6347 طريقة صح، بس الـ RGB والـ RGBA كمان شغالين، فالإجابة الكاملة "All of the above".`, `الـ RGBA values طريقة صح، بس الـ RGB والـ HEX كمان شغالين، فالإجابة الكاملة "All of the above".`, null]
    },
    {
     "why": "الـ SQL injection بيدخّل code مؤذي جوه الـ queries عشان يغيّر الـ tables أو يجيب معلومات أو يمسح داتا (L1). واختيار B ده وصف الـ XSS.", ow: [`الـ SQL injection ده attack، مش تحسين في الـ design.`, `ده وصف الـ Cross Site Scripting (XSS)، اللي بيحقن client-side script.`, null, `الـ SQL injection مالوش أي علاقة بالـ performance؛ ده attack بيتحط فيه code مؤذي جوه الـ query عشان يغيّر الـ tables أو يسرق معلومات أو يمسح داتا.`]
    },
    {
     "why": "الـ Encryption (SSL/HTTPS) بيحمي الداتا وهي ماشية في الشبكة (L1).", ow: [`الـ Encryption مالوش علاقة بالشكل؛ هو بيلخبط الداتا عشان اللي يعترضها وهي ماشية في الشبكة مايعرفش يقراها.`, `الـ Encryption بيزوّد شغل؛ مش بيسرّع الـ processing.`, null, `الـ Encryption مش باين أصلًا في الـ user interface؛ الهدف منه حماية الداتا من الـ interception وهي ماشية (SSL/HTTPS).`]
    },
    {
     "why": "الـ target=\"_blank\" بيفتح tab جديدة؛ والـ _self نفس الـ tab (L2).", ow: [`الـ src بيدي عنوان resource متضمّن في الصفحة زي صورة؛ أما المكان اللي الـ link بيتفتح فيه فبيتحدد بالـ target، زي target="_blank".`, `الـ alt هو النص البديل اللي بيظهر لما الصورة ماتتعرضش؛ المكان اللي الـ link بيتفتح فيه بيتحدد بالـ target attribute.`, `الـ target="_self" هو الـ default وبيفتح الـ link في نفس الـ frame/tab؛ عشان window أو tab جديدة محتاج target="_blank".`, null]
    },
    {
     "why": "الـ type=\"checkbox\" بيخلي الـ user يختار صفر أو أكتر من الاختيارات (L6).", ow: [`الـ type="text" (الـ default) بيدي text field سطر واحد؛ أما المربع اللي الـ user يعلّم عليه فهو type="checkbox".`, `الـ textarea ده element لوحده، مش input type.`, null, `الـ type="button" بيدي زرار تدوس عليه ومابيعملش حاجة لوحده؛ مربع التعليم هو type="checkbox".`]
    }
   ]
  },
  {
   "items": [
    {
     "ans": "<b>1) الـ Information availability</b>: حط كل المعلومات اللي تساعد الزائر ياخد قراره؛ الموقع الكويس بيوفر 80-90% من اللي الزائر بيدور عليه.<br><b>2) الـ Page layout</b>: الـ content يبقى مترتب بحيث الزائر يلاقي اللي يهمه بسرعة، وإلا هيزهق ويمشي؛ خلي الصفحة simple.<br><b>3) الـ Colors</b>: استخدم الألوان الـ standard (links زرقا، visited links بنفسجي، active links أحمر) عشان ماتلخبطش الزوار.<br><b>4) الـ Web accessibility</b>: الموقع يبقى ينفع يستخدمه ويشارك فيه أي حد، حتى اللي عندهم إعاقة في النظر أو السمع أو الحركة أو الكلام.<br><b>5) الـ User-friendly site</b>: مبني على اللي الـ audience محتاجه (UI/UX).<br><b>6) الـ Download speed</b>: الـ designer مايقدرش يتحكم فيها بالكامل، بس يقدر يعمل optimize للـ graphics (الصور ماتزيدش عن 10 KB)، ويعمل صفحات أصغر، ويبعد عن الـ nested tables. (L1)"
    },
    {
     "ans": "<b>الـ Characteristics</b>: الـ server-side scripting يقدر (1) يعدّل أو يغيّر أو يضيف أي content للصفحة بشكل dynamic؛ (2) يرد على queries الـ user أو الداتا اللي اتبعتت من الـ HTML forms؛ (3) يوصل لأي داتا أو databases ويرجّع النتايج للـ browser؛ (4) يعمل customize للصفحة عشان تبقى مفيدة أكتر لكل user لوحده؛ (5) يوفر security لأن الـ server code مش ممكن يتشاف من الـ browser.<br><b>ليه PHP</b>: مجانية وopen source؛ compatible (أكتر من 19 مليون موقع كانوا بيستخدموا PHP لحد نوفمبر 2006)؛ وبسيطة. بتخلي الصفحات dynamic، وبتتعامل مع الـ databases والـ e-mail، وبتعمل authentication للـ users وprocessing للـ forms، وممكن تتحط جوه الـ HTML. (L10)"
    },
    {
     "ans": "<b>الـ Output:</b> الـ heading \"CSS Animation\"، وتحته مربع أحمر 100x100px جواه سطرين فاضيين وبعدهم الكلام \"HELLO\" / \"LEVEL(2)\" في النص (الكلام بيطلع برّه الـ box اللي 100px لتحت).<br><b>ليه:</b> الـ div عليه <code>position:relative</code> فالـ <code>left/top</code> بيحرّكوه، والـ animation بتاع <code>@keyframes example</code> مدته 20 s وبيتكرر للأبد (<code>infinite</code>):<br>0% أحمر عند (0,0) &rarr; 25% أصفر، اتحرك يمين لحد left=200px، ولف 90deg &rarr; 50% أزرق عند (200px,200px) (نزل لتحت)، ولف -90deg &rarr; 75% أخضر عند (0,200px) (راح شمال)، ولف 360deg &rarr; 100% رجع أحمر عند (0,0)، ولف -360deg.<br>يعني الـ box بيلف مع عقارب الساعة حوالين مربع 200px (يمين، تحت، شمال، فوق)، ولونه بيتغير بنعومة أحمر &rarr; أصفر &rarr; أزرق &rarr; أخضر &rarr; أحمر وهو بيلف، كل ضلع في 5 ثواني، وده بيفضل يتكرر على طول."
    },
    {
     "ans": "بيطبع جدول الضرب 6x6. أول column بيتعمله padding من الشمال لعرض 2، وباقي الـ columns لعرض 4 (<code>str_pad(..., STR_PAD_LEFT)</code>)، وبعد كل row فيه \"\\n\":<pre> 1   2   3   4   5   6\n 2   4   6   8  10  12\n 3   6   9  12  15  18\n 4   8  12  16  20  24\n 5  10  15  20  25  30\n 6  12  18  24  30  36</pre>الشكل ده بيظهر في الـ terminal أو جوه &lt;pre&gt; (أو في \"view source\"). لكن لو اتعرض كـ HTML عادي في الـ browser، المسافات الزيادة والـ \"\\n\" بيتلمّوا، فبيظهر الـ 36 رقم كلهم على سطر واحد بينهم مسافة واحدة: 1 2 3 4 5 6 2 4 6 8 ... 30 36. (نفس Sheet 3 PHP، تمرين 8.)"
    },
    {
     "ans": "<b>الـ Output: -1</b><br>الـ FM بتستخدم rest parameter، فـ X = [5, 10, -1, 8]. الـ L بتبدأ بـ X[0] = 5؛ i=1: هل 10 &lt; 5؟ لأ؛ i=2: -1 &lt; 5 &rarr; L = -1؛ i=3: هل 8 &lt; -1؟ لأ. يعني بترجّع الـ <b>minimum</b>، وهو -1 (اتجربت على node)."
    }
   ]
  },
  {
   "items": [
    {
     "ans": "كل زرار بيضيف الحرف بتاعه للـ display اللي read-only؛ والـ \"=\" بيتأكد إن الـ expression فيه أرقام وoperators بس، وبعدين يحسبه بـ eval() (الـ built-in function من L9)، ويعرض النتيجة ويحفظها بـ localStorage.setItem؛ والـ \"c\" بيمسح.<pre>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n&lt;style&gt;\n  table { background: #333; padding: 8px; }\n  input#disp { width: 220px; height: 30px; font-size: 18px; text-align: right; }\n  button { width: 50px; height: 40px; font-size: 18px; color: white;\n           background: #555; border: 1px solid #222; }\n  button:hover { background: #777; }\n&lt;/style&gt;\n&lt;/head&gt;\n&lt;body&gt;\n&lt;table&gt;\n  &lt;tr&gt;&lt;td colspan=\"3\"&gt;&lt;input id=\"disp\" readonly&gt;&lt;/td&gt;\n      &lt;td&gt;&lt;button onclick=\"clr()\"&gt;c&lt;/button&gt;&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;td&gt;&lt;button onclick=\"press('1')\"&gt;1&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick=\"press('2')\"&gt;2&lt;/button&gt;&lt;/td&gt;\n      &lt;td&gt;&lt;button onclick=\"press('3')\"&gt;3&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick=\"press('/')\"&gt;/&lt;/button&gt;&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;td&gt;&lt;button onclick=\"press('4')\"&gt;4&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick=\"press('5')\"&gt;5&lt;/button&gt;&lt;/td&gt;\n      &lt;td&gt;&lt;button onclick=\"press('6')\"&gt;6&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick=\"press('*')\"&gt;*&lt;/button&gt;&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;td&gt;&lt;button onclick=\"press('7')\"&gt;7&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick=\"press('8')\"&gt;8&lt;/button&gt;&lt;/td&gt;\n      &lt;td&gt;&lt;button onclick=\"press('9')\"&gt;9&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick=\"press('-')\"&gt;-&lt;/button&gt;&lt;/td&gt;&lt;/tr&gt;\n  &lt;tr&gt;&lt;td&gt;&lt;button onclick=\"press('0')\"&gt;0&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;/td&gt;\n      &lt;td&gt;&lt;button onclick=\"equal()\"&gt;=&lt;/button&gt;&lt;/td&gt;&lt;td&gt;&lt;button onclick=\"press('+')\"&gt;+&lt;/button&gt;&lt;/td&gt;&lt;/tr&gt;\n&lt;/table&gt;\n&lt;script&gt;\nlet d = document.getElementById(\"disp\");\nfunction press(k) { d.value += k; }                 // N numbers and operators\nfunction clr() { d.value = \"\"; }                     // 'c' clears\nfunction equal() {\n  if (!/^[0-9+\\-*/.]+$/.test(d.value)) { d.value = \"Error\"; return; }\n  let result = eval(d.value);                        // evaluate the expression\n  d.value = result;\n  localStorage.setItem(\"lastResult\", result);        // JavaScript storage\n}\n&lt;/script&gt;\n&lt;/body&gt;\n&lt;/html&gt;</pre>مثال: لو دوست 1 2 + 3 * 2 = هيظهر 18 (الـ operator precedence العادي: الضرب الأول) وهيتخزن lastResult = 18 في الـ localStorage."
    },
    {
     "ans": "الـ form بيبعت لنفسه (action=\"\") بـ method POST (عشان الـ positions ماتظهرش في الـ URL)؛ والـ PHP بيشيك على $_SERVER[\"REQUEST_METHOD\"]، ويتأكد إن مفيش field فاضي (وإنه رقم)، وبعدين يحسب المسافة بـ sqrt وpow.<pre>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;&lt;title&gt;Distance&lt;/title&gt;&lt;/head&gt;\n&lt;body&gt;\n&lt;form action=\"\" method=\"post\"&gt;\n  &lt;b&gt;Fighter Position:&lt;/b&gt;&lt;br&gt;\n  XF: &lt;input type=\"text\" name=\"xf\"&gt;&lt;br&gt;\n  YF: &lt;input type=\"text\" name=\"yf\"&gt;&lt;br&gt;\n  &lt;b&gt;Bomber Position:&lt;/b&gt;&lt;br&gt;\n  XB: &lt;input type=\"text\" name=\"xb\"&gt;&lt;br&gt;\n  YB: &lt;input type=\"text\" name=\"yb\"&gt;&lt;br&gt;\n  &lt;input type=\"submit\" value=\"Calc Dist.\"&gt;\n&lt;/form&gt;\n&lt;?php\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {\n    $f = [\"xf\", \"yf\", \"xb\", \"yb\"];\n    $ok = true;\n    foreach ($f as $k) {\n        if (trim($_POST[$k]) === \"\" || !is_numeric($_POST[$k])) { $ok = false; }\n    }\n    if (!$ok) {\n        echo \"All positions are required and must be numbers.\";\n    } else {\n        $xf = $_POST[\"xf\"]; $yf = $_POST[\"yf\"];\n        $xb = $_POST[\"xb\"]; $yb = $_POST[\"yb\"];\n        $dist = sqrt(pow($xb - $xf, 2) + pow($yb - $yf, 2));\n        echo \"Distance between the two aircrafts = \" . round($dist, 2);\n    }\n}\n?&gt;\n&lt;/body&gt;\n&lt;/html&gt;</pre>مثال: الـ fighter عند (0, 0) والـ bomber عند (3, 4) &rarr; المسافة = 5."
    }
   ]
  }
 ]
};


AR.web.exams[1] = {
 "sections": [
  {
   "items": [
    {
     "why": "الـ inner function بتطبع الـ a بتاعة الـ outer function (21) عن طريق الـ closure قبل ما تعمل assign لـ 6. اتجربت على node (L9).", ow: [`الـ a بتتعمل 6 بعد ما الـ console.log(a) يكون طبعها خلاص، فالقيمة اللي اتطبعت لسه 21.`, `الـ NaN محتاج عملية حسابية تفشل، لكن الـ a شايلة الرقم 21 اللي اتبعت للـ outer function وبتتطبع زي ما هي.`, null, `غلط، لأن 21 موجودة في الاختيارات وهي الـ output: الـ inner function بتطبع الـ a (21) قبل ما تعمل assign لـ 6.`]
    },
    {
     "why": "الـ JSON.stringify() بتحوّل الـ object لـ JSON string؛ والـ JSON.parse() بتعمل العكس (L9).", ow: [null, `الـ JSON.parse() بتعمل العكس: بترجّع الـ JSON string للـ object الأصلي؛ أما الـ serialize فهو stringify().`, `الـ convert() مش method في الـ JSON object؛ الـ object بيتعمله serialize بالـ JSON.stringify().`, `غلط، لأن stringify() موجودة في الاختيارات وهي الـ method اللي بتحوّل الـ object لـ JSON string.`]
    },
    {
     "why": "الـ const بتعرّف constant مينفعش تعمله reassign (L7).", ow: [null, `الـ var بتعرّف variable عادي (function أو global scope) قيمته تتغيّر؛ الـ constant محتاج const.`, `الـ let بتعرّف variable block-scoped لسه قيمته ممكن تتغيّر بعدين؛ الـ constant محتاج const.`, `الـ constant مش keyword في الـ JavaScript؛ الـ constant بيتعرّف بـ const ومينفعش تعمله reassign.`]
    },
    {
     "why": "كلهم methods للـ output في الـ JS (ومعاهم الـ innerHTML) (L7).", ow: [`الـ document.write() فعلًا method للـ output، بس الـ console.log() والـ window.alert() كمان، فالإجابة الكاملة هي "All of the above".`, `الـ console.log() فعلًا method للـ output (بيكتب في الـ console)، بس الـ document.write() والـ window.alert() كمان، فالإجابة "All of the above".`, `الـ window.alert() فعلًا method للـ output (بيطلع alert box)، بس الـ document.write() والـ console.log() كمان، فالإجابة "All of the above".`, null]
    },
    {
     "why": "الاتنين DOM methods بنوصل بيهم للـ elements (L7).", ow: [`الـ getElementById() فعلًا بتوصل للـ elements، بس الـ getElementsByClassName() كمان، فالإجابة الكاملة "Both A and B".`, `الـ getElementsByClassName() فعلًا بتوصل للـ elements، بس الـ getElementById() كمان، فالإجابة الكاملة "Both A and B".`, null, `غلط، لأن الـ getElementById() والـ getElementsByClassName() الاتنين DOM methods بنوصل بيهم للـ HTML elements.`]
    },
    {
     "why": "الـ &lt;strong&gt; بيعرّف كلام مهم (important)؛ أما الـ &lt;b&gt; فهو bold شكلًا بس (L3).", ow: [`الـ &lt;i&gt; بيعرض الكلام italic بس من غير أي معنى زيادة؛ الكلام المهم بيتعرّف بـ &lt;strong&gt;.`, null, `الـ &lt;b&gt; بيخلي الكلام bold شكلًا بس من غير أهمية زيادة؛ الكلام المهم هو &lt;strong&gt;.`, `مفيش element اسمه &lt;important&gt; في الـ HTML؛ الكلام المهم بيتعلّم بـ &lt;strong&gt;.`]
    },
    {
     "why": "الـ &lt;img&gt; ده empty element وعليه src (المسار) وalt (الـ alternate text) (L2).", ow: [`الـ &lt;img&gt; ده empty element؛ اسم الملف بيتحط في الـ src، مش كـ content.`, `مفيش element اسمه &lt;image&gt; في الـ HTML؛ الـ element بتاع الصور هو &lt;img&gt;، والمسار في الـ src والـ alternate text في الـ alt.`, null, `الـ href ده الـ attribute بتاع وجهة الـ link (&lt;a&gt;)؛ مسار الصورة بيتحط في الـ src: &lt;img src="image.gif"&gt;.`]
    },
    {
     "why": "الـ background-color هي الـ CSS property؛ الـ color ده لون الكلام؛ والـ bgcolor attribute قديم (obsolete) (L3).", ow: [null, `الـ color property بتغيّر لون الكلام (الـ foreground)، زي color:blue؛ الخلفية بتستخدم background-color.`, `الـ bgcolor ده HTML attribute قديم (obsolete)، مش CSS property.`, `غلط، لأن background-color موجودة في الاختيارات وهي الـ CSS property اللي بتغيّر لون الخلفية.`]
    },
    {
     "why": "الـ relative URL مافيهوش domain، فبيشاور على حاجة جوه نفس الموقع (L2).", ow: [null, `عشان تربط بصفحات في مواقع تانية محتاج absolute URL فيه الـ domain؛ الـ relative URL بيفضل جوه نفس الموقع.`, `عشان تربط بصفحات في مواقع تانية محتاج absolute URL فيه الـ domain؛ الـ relative URL مافيهوش domain فبيفضل جوه نفس الموقع.`, `الـ relative URLs بتعمل link عادي، في الـ href والـ src؛ هي بس بتشيل الـ domain، فبتشاور على ملفات جوه نفس الموقع.`]
    },
    {
     "why": "الـ &lt;sup&gt; (superscript) بيرفع الكلام نص حرف لفوق زي الأس؛ والـ &lt;sub&gt; بتاع حاجات زي H2O (L3).", ow: [`الـ &lt;p&gt; بيعرّف paragraph؛ الأس (power) بيترفع فوق السطر بـ &lt;sup&gt;، زي x&lt;sup&gt;2&lt;/sup&gt;.`, `الـ &lt;sub&gt; ده subscript (تحت السطر)، بنستخدمه في H<sub>2</sub>O.`, null, `غلط، لأن الـ &lt;sup&gt; (superscript) موجود في الاختيارات وهو بالظبط الـ tag بتاع الأسس زي x<sup>2</sup>.`]
    },
    {
     "why": "شيت الـ MCQ بتاع الكورس (Sanfoundry) إجابته Object-Oriented: الـ JS لغة object-oriented قايمة على الـ prototypes. فيه كتب بتقول object-based؛ بس جاوب A زي الـ key.", ow: [null, `فيه كتب بتسميها object-based، بس إجابة شيت الكورس هي Object-Oriented.`, `الـ JS بتدعم الأسلوب الـ procedural، بس مش متصنّفة كـ procedural language.`, `غلط، لأن شيت الـ MCQ بتاع الكورس والـ keys بيختاروا إجابة من الموجودين: الـ JavaScript لغة object-oriented (قايمة على الـ prototypes).`]
    },
    {
     "why": "الـ functions في الـ PHP بتبدأ بالـ keyword اللي اسمها function، وبعدها الاسم والـ parameters (L10).", ow: [`الـ keyword اللي اسمها function ناقصة؛ من غيرها الـ PHP هيقرا ده على إنه call للـ functionName، مش تعريف.`, `اسم الـ function والـ parameter list ناقصين؛ الـ function في الـ PHP بتتكتب function name($param) { ... }.`, null, `ده أسلوب الـ C/Java؛ الـ PHP مافيهاش return type في الأول.`]
    },
    {
     "why": "بعد الـ $ الاسم لازم يبدأ بحرف أو underscore؛ والـ $this كلمة محجوزة (reserved) (L10).", ow: [`بعد الـ $ الاسم مينفعش يبدأ برقم، فالـ $3hello غلط؛ لازم يبدأ بحرف أو underscore.`, null, `الـ $this كلمة محجوزة (reserved) بتشاور على الـ object الحالي، فمينفعش تستخدمها كاسم variable عادي.`, `بعد الـ $ الاسم مينفعش يبدأ برقم، فالـ $5_Hello غلط.`]
    },
    {
     "why": "الـ table والـ tr (الـ row) والـ td (الـ cell) كلهم table elements؛ إنما الـ &lt;head&gt; والـ &lt;tt&gt; والـ &lt;body&gt; لأ (L5).", ow: [`الـ &lt;head&gt; ده الـ head بتاع الـ document، مش table element.`, `الـ &lt;tt&gt; ده formatting tag قديم (obsolete) بتاع الـ teletype text، مش table element؛ مجموعة الـ table هي &lt;table&gt; و&lt;tr&gt; و&lt;td&gt;.`, null, `الـ &lt;body&gt; ده الجزء اللي بيظهر من الـ document، مش table element؛ مجموعة الـ body بتاعة الـ table اسمها &lt;tbody&gt;.`]
    },
    {
     "why": "الـ element selector h1 بيمسك كل &lt;h1&gt;؛ أما h1.all فمحتاج class=\"all\" (L4).", ow: [`الـ h1.all بيختار بس الـ &lt;h1&gt; اللي عليها class="all"، مش كل &lt;h1&gt;؛ اللي بيعمل كده هو الـ element selector h1 لوحده.`, `الـ all.h1 بيختار elements اسمها &lt;all&gt; وعليها class="h1"، ودي مش موجودة أصلًا؛ كل الـ &lt;h1&gt; بتتختار بـ h1.`, null, `غلط، لأن h1 {background-color:#FFFFFF;} موجودة في الاختيارات وبتمسك كل &lt;h1&gt; صح.`]
    },
    {
     "why": "الـ font-family بتحدد الخط؛ الـ font-weight = التخانة (boldness)، والـ font-style = الـ italic (L3/L4).", ow: [null, `الـ font-weight بيحدد تخانة الكلام (normal، bold)؛ مش بيغيّر نوع الخط، ده شغل الـ font-family.`, `الـ font-style بيحدد normal أو italic أو oblique؛ الخط نفسه بيتختار بالـ font-family.`, `مفيش CSS property اسمها font-property؛ خط الـ element بيتحدد بالـ font-family.`]
    },
    {
     "why": "الـ &lt;ul&gt; هي الـ unordered (bulleted) list؛ والـ &lt;ol&gt; مترقمة (L5).", ow: [`مفيش element اسمه &lt;list&gt; في الـ HTML؛ الـ bulleted list هي unordered list، يعني &lt;ul&gt;.`, `الـ &lt;ol&gt; دي ordered list عناصرها مترقمة، مش بـ bullets؛ الـ bullets بتيجي من &lt;ul&gt;.`, null, `الـ &lt;dl&gt; دي description list فيها terms (&lt;dt&gt;) وdescriptions (&lt;dd&gt;) من غير bullets؛ الـ bulleted lists بتستخدم &lt;ul&gt;.`]
    },
    {
     "why": "الـ declaration بتاع HTML5 هو &lt;!DOCTYPE html&gt; (L2).", ow: [`الـ declaration بتاع HTML5 مافيهوش رقم version؛ هو ببساطة &lt;!DOCTYPE html&gt;.`, null, `ناقص: الـ declaration لازم يذكر نوع الـ document؛ في HTML5 هو &lt;!DOCTYPE html&gt;.`, `فيه اختيار صح: الـ &lt;!DOCTYPE html&gt; هو الـ declaration بتاع HTML5، فـ "None" غلط.`]
    },
    {
     "why": "الـ constants بتتستخدم من غير $: لو كتبت echo GREETING; هيطبع الكلام. لكن $GREETING ده variable مش متعرّف، فمفيش حاجة بتتطبع (والـ PHP 8 كمان بيطلّع warning \"Undefined variable\" لو الـ errors بتتعرض) (L10).", ow: [`الـ echo بيطبع قيمة الـ variable، مش اسمه.`, null, `الكلام ده بيتطبع بس لو كتبت echo GREETING; (الـ constants بتتستخدم من غير $)؛ لكن الـ $GREETING ده variable مش متعرّف.`, `الـ echo عمره ما بيطبع اسم الـ constant؛ وكمان الـ $GREETING ده variable تاني خالص ومش متعرّف، فمفيش حاجة بتتطبع.`]
    },
    {
     "why": "نفس السؤال اللي فات بس مكتوب على كذا سطر: الـ $GREETING variable مش متعرّف، فمفيش output (L10).", ow: [`الـ echo بيطبع قيمة الـ variable، مش اسمه.`, null, `الكلام ده بيتطبع بس لو كتبت echo GREETING; (الـ constants بتتستخدم من غير $)؛ لكن الـ $GREETING ده variable مش متعرّف.`, `الـ echo عمره ما بيطبع اسم الـ constant؛ وكمان الـ $GREETING ده variable تاني خالص ومش متعرّف، فمفيش حاجة بتتطبع.`]
    }
   ]
  },
  {
   "items": [
    {
     "ans": "الـ CSS (Cascading Style Sheets) بنستخدمه عشان نظبط شكل الصفحة: اللون، الخط، حجم الكلام، المسافات بين الـ elements، الـ positioning، صور/ألوان الخلفية، وعرض مختلف للأجهزة وأحجام الشاشات المختلفة. الـ CSS بيتضاف بـ 3 طرق:<br><b>1) الـ Inline</b>: الـ style attribute جوه الـ element؛ بيدّي style خاص لـ element واحد بس: <code>&lt;h1 style=\"color:blue;\"&gt;A Blue Heading&lt;/h1&gt;</code>.<br><b>2) الـ Internal</b>: element اسمه &lt;style&gt; جوه الـ &lt;head&gt;؛ بيعرّف styles لصفحة واحدة: <code>&lt;style&gt; body {background-color: powderblue;} h1 {color: blue;} &lt;/style&gt;</code>.<br><b>3) الـ External</b>: element اسمه &lt;link&gt; في الـ head بتاع كل صفحة؛ ملف .css واحد (مافيهوش HTML) بيعمل style لصفحات كتير: <code>&lt;link rel=\"stylesheet\" href=\"styles.css\"&gt;</code> (URL كامل، أو /html/styles.css، أو path في نفس الفولدر). (L4)"
    },
    {
     "ans": "1) الـ user بيكتب الـ URL (مثلًا http://www.tutorialspoint.com) في الـ address bar بتاع الـ browser.<br>2) الـ browser بيطلب الـ IP address بتاع الـ domain من الـ Domain Name Server (DNS).<br>3) بعد ما ياخد الـ IP address، الـ browser بيبعت طلب الصفحة للـ web server باستخدام الـ HTTP، اللي بيحدد الـ browser والـ server بيتكلموا مع بعض إزاي.<br>4) الـ web server بيستقبل الطلب ويدوّر على الصفحة؛ لو لقاها بيرجّعها للـ browser ويقفل الـ HTTP connection.<br>5) الـ browser بيستلم الصفحة، يعمللها interpret ويعرض محتواها في شباك الـ browser. (L1)"
    },
    {
     "ans": "الصفحة بتعرض \"Please input a number:\"، وbox للأرقام، وزرار Submit. لما تدوس Submit بينادي <code>GX()</code> (أسماء الـ attributes في الـ HTML مش case-sensitive، فالـ <code>Onclick</code> شغالة؛ والـ <code>type=\"btn\"</code> غلط فبيتحول لـ default button، وطالما مفيش form فهو بس بيشغّل الـ handler).<br>الـ GX بتقرا القيمة: لو مش رقم، أو أقل من 1، أو أكبر من 10 بتكتب <b>Wrong</b>، غير كده بتكتب <b>Good</b> جوه &lt;p id=\"demo\"&gt;. مثلًا 5 &rarr; Good؛ 15 &rarr; Wrong؛ 0 أو فاضي &rarr; Wrong (لأن \"\" &lt; 1 بتطلع true).<br>الـ paragraph بتاع النتيجة عليه style من <code>#demo</code>: <b>أزرق</b>، و<b>font size 200%</b>، وخط <b>فوق وتحت</b> الكلام (overline underline)، ومزقوق يمين بـ 25% من عرضه هو (<code>transform: translate(25%)</code>؛ وأسماء الـ properties مش case-sensitive فـ \"Transform\" برضه شغالة)."
    },
    {
     "ans": "<pre>shift:mm and Pop=aa\n push:AA\nArray\n(\n    [0] =&gt; bb\n    [1] =&gt; kk\n    [2] =&gt; hh\n    [3] =&gt; AA\n)\nSort:\nArray\n(\n    [0] =&gt; AA\n    [1] =&gt; bb\n    [2] =&gt; hh\n    [3] =&gt; kk\n)\nslice:\nArray\n(\n    [0] =&gt; bb\n    [1] =&gt; hh\n)</pre><b>ليه:</b> الـ strtolower بتخليهم [mm, bb, kk, hh, aa]؛ الـ array_shift بتشيل وترجّع \"mm\"؛ الـ array_pop بتشيل وترجّع \"aa\" &rarr; [bb, kk, hh]؛ الـ array_push بتضيف \"AA\" &rarr; [bb, kk, hh, AA]؛ الـ sort بترتب الـ strings بالـ character code، والـ \"A\" الكابيتال (65) بييجي قبل الحروف الـ small، فتبقى [AA, bb, hh, kk]؛ والـ <code>array_slice($XX, 1, 2)</code> بتاخد <b>2 elements بادئين من الـ offset 1</b> &rarr; [bb, hh]. (حل الطالب بيقول إن الـ array_slice بتاخد \"start and end index\"؛ ده غلط، الـ argument التالت هو length، وجت نفس النتيجة هنا بالصدفة بس.)"
    },
    {
     "ans": "<b>الـ Output</b> (تلات سطور):<br>30<br>60<br>8<br><b>ليه:</b> الـ X دي arrow function بـ rest parameter بترجّع الـ <b>maximum</b> من الـ arguments بتاعتها (الـ R بتتغير كل ما تلاقي قيمة أكبر): max(8,7,10,20,30) = 30، max(10,20,60) = 60، max(8,7) = 8؛ وبعد كل واحدة &lt;br/&gt; (اتجربت على node)."
    }
   ]
  },
  {
   "items": [
    {
     "ans": "<pre>&lt;script&gt;\n// grade table: [minimum score, GPA points, letter]\nconst TABLE = [[96,4.0,\"A+\"],[92,3.7,\"A\"],[88,3.4,\"A-\"],[84,3.2,\"B+\"],[80,3.0,\"B\"],\n               [76,2.8,\"B-\"],[72,2.6,\"C+\"],[68,2.4,\"C\"],[64,2.2,\"C-\"],[60,2.0,\"D+\"],\n               [55,1.5,\"D\"],[50,1.0,\"D-\"],[0,0.0,\"F\"]];\nfunction gradeOf(score) {            // returns [G, letter] for one subject\n  for (let r of TABLE) if (score &gt;= r[0]) return [r[1], r[2]];\n  return [0, \"F\"];\n}\nfunction computeGPA() {\n  let N = parseInt(window.prompt(\"Enter the number of students:\"));\n  let all = [];\n  for (let st = 1; st &lt;= N; st++) {\n    let sumGH = 0, TH = 0, report = \"\";\n    for (let i = 0; i &lt; 6; i++) {                       // S(i), i = 0..5\n      let S = parseFloat(window.prompt(\"Student \" + st + \": score of subject \" + (i + 1) + \" (0-100):\"));\n      let H = parseInt(window.prompt(\"Credit hours of subject \" + (i + 1) + \" (3, 2 or 0):\"));\n      let g = gradeOf(S);\n      sumGH += g[0] * H;                                // sum of G(i) * H(i)\n      TH += H;                                          // total registered hours\n      report += \"Subject \" + (i + 1) + \": \" + g[1] + \" (\" + g[0] + \")\\n\";\n    }\n    let gpa = (TH &gt; 0) ? (sumGH / TH) : 0;              // accumulated GPA\n    window.alert(report + \"Accumulated GPA = \" + gpa.toFixed(2));\n    all.push({ student: st, gpa: gpa.toFixed(2) });\n    localStorage.setItem(\"student\" + st, gpa.toFixed(2));\n  }\n  localStorage.setItem(\"allGPA\", JSON.stringify(all));  // all students together\n}\ncomputeGPA();\n&lt;/script&gt;</pre><b>تشيك</b>: الدرجات 95 (3 h)، 85 (3 h)، 70 (2 h)، 50 (2 h)، 99 (3 h)، 40 (0 h) &rarr; G = 3.7، 3.2، 2.4، 1.0، 4.0، 0 &rarr; &Sigma;GH = 11.1 + 9.6 + 4.8 + 2.0 + 12.0 + 0 = 39.5، TH = 13 &rarr; GPA = 3.04. المواد اللي ساعاتها 0 مش بتأثر على الـ GPA."
    },
    {
     "ans": "<pre>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;&lt;title&gt;Children Ideal Weight&lt;/title&gt;&lt;/head&gt;\n&lt;body&gt;\n&lt;form action=\"\" method=\"post\"&gt;\n  &lt;h3&gt;Estimate Children Ideal Weights&lt;/h3&gt;\n  &lt;label for=\"years\"&gt;Years :&lt;/label&gt;\n  &lt;input type=\"number\" id=\"years\" name=\"years\" min=\"0\"&gt;&lt;br&gt;\n  &lt;label for=\"months\"&gt;Months:&lt;/label&gt;\n  &lt;input type=\"number\" id=\"months\" name=\"months\" min=\"0\" max=\"11\"&gt;&lt;br&gt;\n  &lt;input type=\"submit\" value=\"Estimate\"&gt;\n&lt;/form&gt;\n&lt;?php\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {\n    $years  = trim($_POST[\"years\"]);\n    $months = trim($_POST[\"months\"]);\n    if ($years === \"\" || $months === \"\") {               // validation: not blank\n        echo \"Years and Months are required.\";\n    } elseif (!is_numeric($years) || !is_numeric($months)) {\n        echo \"Years and Months must be numbers.\";\n    } else {\n        $ageMonths = $years * 12 + $months;              // total age in months\n        if ($ageMonths &lt; 12) {                           // infants\n            $w = ($ageMonths + 9) / 2;\n        } elseif ($years &gt;= 1 &amp;&amp; $years &lt;= 5) {          // children 1-5 years\n            $w = 2 * ($years + 5);\n        } elseif ($years &gt; 5 &amp;&amp; $years &lt;= 14) {          // children 5-14 years\n            $w = 4 * $years;\n        } else {\n            $w = -1;\n        }\n        if ($w &lt; 0) echo \"Age not supported (0-14 years only).\";\n        else echo \"The ideal weight is $w kg\";\n    }\n}\n?&gt;\n&lt;/body&gt;\n&lt;/html&gt;</pre>الـ POST هو الـ method المناسب (الداتا بتتبعت في الـ request body مش في الـ URL). أمثلة: 0 years و6 months &rarr; (6+9)/2 = 7.5 kg؛ 3 years &rarr; 2 x (3+5) = 16 kg؛ 10 years &rarr; 4 x 10 = 40 kg. (السن 5 بالظبط داخل في معادلة الـ 1-5: 2 x 10 = 20 kg = 4 x 5، يعني المعادلتين بيدّوا نفس النتيجة.)"
    }
   ]
  }
 ]
};


AR.web.exams[2] = {
 "sections": [
  {
   "items": [
    {
     "why": "الـ &lt;strong&gt; بيعرّف كلام مهم (important)؛ أما الـ &lt;b&gt; فهو bold شكلًا بس (L3).", ow: [`الـ &lt;i&gt; بيعرض الكلام italic بس من غير أي معنى زيادة؛ الكلام المهم بيتعرّف بـ &lt;strong&gt;.`, null, `الـ &lt;b&gt; بيخلي الكلام bold شكلًا بس من غير أهمية زيادة؛ الكلام المهم هو &lt;strong&gt;.`, `مفيش element اسمه &lt;important&gt; في الـ HTML؛ الكلام المهم بيتعلّم بـ &lt;strong&gt;.`]
    },
    {
     "why": "الـ &lt;img&gt; ده empty element وعليه src (المسار) وalt (الـ alternate text) (L2).", ow: [`الـ &lt;img&gt; ده empty element؛ اسم الملف بيتحط في الـ src، مش كـ content.`, `مفيش element اسمه &lt;image&gt; في الـ HTML؛ الـ element بتاع الصور هو &lt;img&gt;، والمسار في الـ src والـ alternate text في الـ alt.`, null, `الـ href ده الـ attribute بتاع وجهة الـ link (&lt;a&gt;)؛ مسار الصورة بيتحط في الـ src: &lt;img src="image.gif"&gt;.`]
    },
    {
     "why": "الـ table والـ tr (الـ row) والـ td (الـ cell) كلهم table elements؛ إنما الـ &lt;head&gt; والـ &lt;tt&gt; والـ &lt;body&gt; لأ (L5).", ow: [`الـ &lt;head&gt; ده الـ head بتاع الـ document، مش table element.`, `الـ &lt;tt&gt; ده formatting tag قديم (obsolete) بتاع الـ teletype text، مش table element؛ مجموعة الـ table هي &lt;table&gt; و&lt;tr&gt; و&lt;td&gt;.`, null, `الـ &lt;body&gt; ده الجزء اللي بيظهر من الـ document، مش table element؛ مجموعة الـ body بتاعة الـ table اسمها &lt;tbody&gt;.`]
    },
    {
     "why": "الـ element selector h1 بيمسك كل &lt;h1&gt;؛ أما h1.all فمحتاج class=\"all\" (L4).", ow: [`الـ h1.all بيختار بس الـ &lt;h1&gt; اللي عليها class="all"، مش كل &lt;h1&gt;؛ اللي بيعمل كده هو الـ element selector h1 لوحده.`, `الـ all.h1 بيختار elements اسمها &lt;all&gt; وعليها class="h1"، ودي مش موجودة أصلًا؛ كل الـ &lt;h1&gt; بتتختار بـ h1.`, null, `غلط، لأن h1 {background-color:#FFFFFF;} موجودة في الاختيارات وبتمسك كل &lt;h1&gt; صح.`]
    },
    {
     "why": "الـ font-family بتحدد الخط؛ الـ font-weight = التخانة (boldness)، والـ font-style = الـ italic (L3/L4).", ow: [null, `الـ font-weight بيحدد تخانة الكلام (normal، bold)؛ مش بيغيّر نوع الخط، ده شغل الـ font-family.`, `الـ font-style بيحدد normal أو italic أو oblique؛ الخط نفسه بيتختار بالـ font-family.`, `مفيش CSS property اسمها font-property؛ خط الـ element بيتحدد بالـ font-family.`]
    },
    {
     "why": "الـ &lt;ul&gt; هي الـ unordered (bulleted) list؛ والـ &lt;ol&gt; مترقمة (L5).", ow: [`مفيش element اسمه &lt;list&gt; في الـ HTML؛ الـ bulleted list هي unordered list، يعني &lt;ul&gt;.`, `الـ &lt;ol&gt; دي ordered list عناصرها مترقمة، مش بـ bullets؛ الـ bullets بتيجي من &lt;ul&gt;.`, null, `الـ &lt;dl&gt; دي description list فيها terms (&lt;dt&gt;) وdescriptions (&lt;dd&gt;) من غير bullets؛ الـ bulleted lists بتستخدم &lt;ul&gt;.`]
    },
    {
     "why": "الـ declaration بتاع HTML5 هو &lt;!DOCTYPE html&gt; (L2).", ow: [`الـ declaration بتاع HTML5 مافيهوش رقم version؛ هو ببساطة &lt;!DOCTYPE html&gt;.`, null, `ناقص: الـ declaration لازم يذكر نوع الـ document؛ في HTML5 هو &lt;!DOCTYPE html&gt;.`, `فيه اختيار صح: الـ &lt;!DOCTYPE html&gt; هو الـ declaration بتاع HTML5، فـ "None" غلط.`]
    },
    {
     "why": "الـ background-color هي الـ CSS property؛ الـ color ده لون الكلام؛ والـ bgcolor attribute قديم (obsolete) (L3).", ow: [null, `الـ color property بتغيّر لون الكلام (الـ foreground)، زي color:blue؛ الخلفية بتستخدم background-color.`, `الـ bgcolor ده HTML attribute قديم (obsolete)، مش CSS property.`, `غلط، لأن background-color موجودة في الاختيارات وهي الـ CSS property اللي بتغيّر لون الخلفية.`]
    },
    {
     "why": "الـ relative URL مافيهوش domain، فبيشاور على حاجة جوه نفس الموقع (L2).", ow: [null, `عشان تربط بصفحات في مواقع تانية محتاج absolute URL فيه الـ domain؛ الـ relative URL بيفضل جوه نفس الموقع.`, `عشان تربط بصفحات في مواقع تانية محتاج absolute URL فيه الـ domain؛ الـ relative URL مافيهوش domain فبيفضل جوه نفس الموقع.`, `الـ relative URLs بتعمل link عادي، في الـ href والـ src؛ هي بس بتشيل الـ domain، فبتشاور على ملفات جوه نفس الموقع.`]
    },
    {
     "why": "الـ &lt;sup&gt; (superscript) بيرفع الكلام نص حرف لفوق زي الأس؛ والـ &lt;sub&gt; بتاع حاجات زي H2O (L3).", ow: [`الـ &lt;p&gt; بيعرّف paragraph؛ الأس (power) بيترفع فوق السطر بـ &lt;sup&gt;، زي x&lt;sup&gt;2&lt;/sup&gt;.`, `الـ &lt;sub&gt; ده subscript (تحت السطر)، بنستخدمه في H<sub>2</sub>O.`, null, `غلط، لأن الـ &lt;sup&gt; (superscript) موجود في الاختيارات وهو بالظبط الـ tag بتاع الأسس زي x<sup>2</sup>.`]
    },
    {
     "why": "الـ inner function بتطبع الـ a بتاعة الـ outer function (21) عن طريق الـ closure قبل ما تعمل assign لـ 6. اتجربت على node (L9).", ow: [`الـ a بتتعمل 6 بعد ما الـ console.log(a) يكون طبعها خلاص، فالقيمة اللي اتطبعت لسه 21.`, `الـ NaN محتاج عملية حسابية تفشل، لكن الـ a شايلة الرقم 21 اللي اتبعت للـ outer function وبتتطبع زي ما هي.`, null, `غلط، لأن 21 موجودة في الاختيارات وهي الـ output: الـ inner function بتطبع الـ a (21) قبل ما تعمل assign لـ 6.`]
    },
    {
     "why": "الـ JSON.stringify() بتحوّل الـ object لـ JSON string؛ والـ JSON.parse() بتعمل العكس (L9).", ow: [null, `الـ JSON.parse() بتعمل العكس: بترجّع الـ JSON string للـ object الأصلي؛ أما الـ serialize فهو stringify().`, `الـ convert() مش method في الـ JSON object؛ الـ object بيتعمله serialize بالـ JSON.stringify().`, `غلط، لأن stringify() موجودة في الاختيارات وهي الـ method اللي بتحوّل الـ object لـ JSON string.`]
    },
    {
     "why": "الـ const بتعرّف constant مينفعش تعمله reassign (L7).", ow: [null, `الـ var بتعرّف variable عادي (function أو global scope) قيمته تتغيّر؛ الـ constant محتاج const.`, `الـ let بتعرّف variable block-scoped لسه قيمته ممكن تتغيّر بعدين؛ الـ constant محتاج const.`, `الـ constant مش keyword في الـ JavaScript؛ الـ constant بيتعرّف بـ const ومينفعش تعمله reassign.`]
    },
    {
     "why": "كلهم methods للـ output في الـ JS (ومعاهم الـ innerHTML) (L7).", ow: [`الـ document.write() فعلًا method للـ output، بس الـ console.log() والـ window.alert() كمان، فالإجابة الكاملة هي "All of the above".`, `الـ console.log() فعلًا method للـ output (بيكتب في الـ console)، بس الـ document.write() والـ window.alert() كمان، فالإجابة "All of the above".`, `الـ window.alert() فعلًا method للـ output (بيطلع alert box)، بس الـ document.write() والـ console.log() كمان، فالإجابة "All of the above".`, null]
    },
    {
     "why": "الاتنين DOM methods بنوصل بيهم للـ elements (L7).", ow: [`الـ getElementById() فعلًا بتوصل للـ elements، بس الـ getElementsByClassName() كمان، فالإجابة الكاملة "Both A and B".`, `الـ getElementsByClassName() فعلًا بتوصل للـ elements، بس الـ getElementById() كمان، فالإجابة الكاملة "Both A and B".`, null, `غلط، لأن الـ getElementById() والـ getElementsByClassName() الاتنين DOM methods بنوصل بيهم للـ HTML elements.`]
    },
    {
     "why": "شيت الـ MCQ بتاع الكورس (Sanfoundry) إجابته Object-Oriented: الـ JS لغة object-oriented قايمة على الـ prototypes. فيه كتب بتقول object-based؛ بس جاوب A زي الـ key.", ow: [null, `فيه كتب بتسميها object-based، بس إجابة شيت الكورس هي Object-Oriented.`, `الـ JS بتدعم الأسلوب الـ procedural، بس مش متصنّفة كـ procedural language.`, `غلط، لأن شيت الـ MCQ بتاع الكورس والـ keys بيختاروا إجابة من الموجودين: الـ JavaScript لغة object-oriented (قايمة على الـ prototypes).`]
    },
    {
     "why": "الـ functions في الـ PHP بتبدأ بالـ keyword اللي اسمها function، وبعدها الاسم والـ parameters (L10).", ow: [`الـ keyword اللي اسمها function ناقصة؛ من غيرها الـ PHP هيقرا ده على إنه call للـ functionName، مش تعريف.`, `اسم الـ function والـ parameter list ناقصين؛ الـ function في الـ PHP بتتكتب function name($param) { ... }.`, null, `ده أسلوب الـ C/Java؛ الـ PHP مافيهاش return type في الأول.`]
    },
    {
     "why": "بعد الـ $ الاسم لازم يبدأ بحرف أو underscore؛ والـ $this كلمة محجوزة (reserved) (L10).", ow: [`بعد الـ $ الاسم مينفعش يبدأ برقم، فالـ $3hello غلط؛ لازم يبدأ بحرف أو underscore.`, null, `الـ $this كلمة محجوزة (reserved) بتشاور على الـ object الحالي، فمينفعش تستخدمها كاسم variable عادي.`, `بعد الـ $ الاسم مينفعش يبدأ برقم، فالـ $5_Hello غلط.`]
    },
    {
     "why": "الـ constants بتتستخدم من غير $: لو كتبت echo GREETING; هيطبع الكلام. لكن $GREETING ده variable مش متعرّف، فمفيش حاجة بتتطبع (والـ PHP 8 كمان بيطلّع warning \"Undefined variable\" لو الـ errors بتتعرض) (L10).", ow: [`الـ echo بيطبع قيمة الـ variable، مش اسمه.`, null, `الكلام ده بيتطبع بس لو كتبت echo GREETING; (الـ constants بتتستخدم من غير $)؛ لكن الـ $GREETING ده variable مش متعرّف.`, `الـ echo عمره ما بيطبع اسم الـ constant؛ وكمان الـ $GREETING ده variable تاني خالص ومش متعرّف، فمفيش حاجة بتتطبع.`]
    },
    {
     "why": "نفس السؤال اللي فات بس مكتوب على كذا سطر: الـ $GREETING variable مش متعرّف، فمفيش output (L10).", ow: [`الـ echo بيطبع قيمة الـ variable، مش اسمه.`, null, `الكلام ده بيتطبع بس لو كتبت echo GREETING; (الـ constants بتتستخدم من غير $)؛ لكن الـ $GREETING ده variable مش متعرّف.`, `الـ echo عمره ما بيطبع اسم الـ constant؛ وكمان الـ $GREETING ده variable تاني خالص ومش متعرّف، فمفيش حاجة بتتطبع.`]
    }
   ]
  },
  {
   "items": [
    {
     "ans": "<table><tr><th>Block-level</th><th>Inline</th></tr><tr><td>دايمًا بيبدأ على سطر جديد</td><td>مش بيبدأ على سطر جديد</td></tr><tr><td>بياخد العرض المتاح كله (100% من الـ parent)</td><td>بياخد العرض اللي محتاجه بس</td></tr><tr><td>ينفع تحدد الـ width/height</td><td>مينفعش تحدد الـ width/height</td></tr><tr><td>ليه top وbottom margins</td><td>مالوش top/bottom margin</td></tr><tr><td>مثال: &lt;div&gt; (وكمان p، h1-h6، ul، table، form)</td><td>مثال: &lt;span&gt; (وكمان a، b، img، input)</td></tr></table>مثال: <code>&lt;div style=\"border:1px solid black\"&gt;Hello World&lt;/div&gt;</code> بيرسم box بعرض السطر كله، لكن <code>&lt;p&gt;This is an inline &lt;span style=\"border:1px solid black\"&gt;Hello World&lt;/span&gt; element&lt;/p&gt;</code> بيعمل box حوالين الكلمتين بس. (L6)"
    },
    {
     "ans": "الـ Characteristics: (1) يعدّل أو يغيّر أو يضيف أي content للصفحة بشكل dynamic؛ (2) يرد على queries الـ user أو الداتا اللي اتبعتت من الـ HTML forms؛ (3) يوصل لأي داتا أو databases ويرجّع النتايج للـ browser؛ (4) يعمل customize للصفحة لكل user لوحده؛ (5) يوفر security لأن الـ server code مش ممكن يتشاف من الـ browser.<br>ليه PHP: مجانية وopen source، وcompatible (19 مليون موقع لحد نوفمبر 2006)، وبسيطة؛ بتخلي الصفحات dynamic، وبتشتغل مع الـ databases والـ e-mail، وبتعمل authentication للـ users وبتعالج داتا الـ forms. (L10)"
    },
    {
     "ans": "<b>زي ما هو مطبوع، مفيش حاجة بتتحسب:</b> الـ <code>function LSS{</code> مافيهاش أقواس، وده <b>SyntaxError</b>، فالـ script كله بيترفض والـ LSS عمرها ما بتتعرّف. الصفحة بتعرض بس: \"Par1:\" ومعاها box فاضي (placeholder NNNN)، و\"Par2:\" ومعاها box فاضي (placeholder MMMM)، وزرار مكتوب عليه <b>PR</b>، و\"Result: ---\". والـ style بتاع <code>#l1</code> مش ماسك أي element، فمفيش حاجة بتبقى صفرا.<br><b>الإجابة المقصودة</b> (لو <code>function LSS()</code>): الـ A والـ AA هما الـ strings اللي اتكتبوا، والـ Number() بيحولهم أرقام، والـ label اللي اسمه RR بيعرض مجموعهم كرقم، مثلًا 15 و5 &rarr; Result: <b>20</b> (لو استخدمت \"+\" لوحدها كانت هتلزقهم \"155\"). وخلي بالك إن الـ handler هو <code>onkeydown</code>، فبيشتغل لما تدوس key والزرار PR عليه الـ focus (مثلًا تروحله بالـ Tab وتدوس Enter/Space)، مش بالـ click بالماوس."
    },
    {
     "ans": "<b>الـ Output:</b> <code>10 36 9</code> (وبعده newline).<br><b>ليه:</b> الـ explode بتقسم \"10 12 3\" لـ [10,12,3] و\"1 3 3\" لـ [1,3,3]؛ والـ foreach بيضرب كل element في اللي قصاده: 10*1 = 10، 12*3 = 36، 3*3 = 9؛ والـ implode بتجمعهم بمسافات. (Sheet 3 PHP، تمرين 7.)"
    },
    {
     "ans": "<pre>unshift:55,66,3,5,7,9,11\npop:11\nslice:55,66,3\nsplice: 55\nsplice(0,2,111,222): 66,3\nNaN\nincludes(88, 0): false\nx.join('-'): 22-66-11-77-33-55-44</pre><b>ليه:</b> الـ unshift بتضيف 55,66 في الأول؛ الـ pop بتشيل وترجّع 11 &rarr; [55,66,3,5,7,9]؛ الـ slice(0,3) بتنسخ 55,66,3؛ الـ splice(0,1) بتشيل 55؛ الـ splice(0,2,111,222) بتشيل 66,3 وتحط مكانهم 111,222 &rarr; [111,222,5,7,9]. السطر المطبوع في الورقة فيه <b>سالب</b>: <code>'slice(0,3): ' - nums.slice(0,3)</code> يعني string ناقص array = <b>NaN</b>. لو كانت غلطة مطبعية والمقصود \"+\"، هيطبع <code>slice(0,3): 111,222,5</code> (وده اللي في key الطالب). والـ 88 مش موجودة في x، والـ join('-') بتجمعهم بشَرط (اتجربت على node)."
    }
   ]
  },
  {
   "items": [
    {
     "ans": "<pre>&lt;script&gt;\nfunction taxPercent(income) {                 // flat percent from the table\n  if (income &lt;= 70000)   return 0;\n  if (income &lt;= 200000)  return 20;\n  if (income &lt;= 400000)  return 22.5;\n  if (income &lt;= 1200000) return 25;\n  return 27;                                   // more than 1,200,000 LE\n}\nfunction computeTax() {\n  let N = parseInt(window.prompt(\"Enter the number of employees:\"));\n  let all = [];\n  for (let k = 1; k &lt;= N; k++) {\n    let income = parseFloat(window.prompt(\"Employee \" + k + \": total annual income (LE):\"));\n    let p = taxPercent(income);\n    let amount = income * p / 100;\n    window.alert(\"Employee \" + k + \"\\nTax percent = \" + p + \"%\\nTax amount = \" + amount + \" LE\");\n    all.push({ employee: k, income: income, percent: p, tax: amount });\n    localStorage.setItem(\"employee\" + k, p + \"% : \" + amount);\n  }\n  localStorage.setItem(\"allTaxes\", JSON.stringify(all));\n}\ncomputeTax();\n&lt;/script&gt;</pre>مثال: دخل 300,000 LE &rarr; 22.5% &rarr; الـ tax = 67,500 LE؛ دخل 50,000 &rarr; 0% &rarr; 0 LE."
    },
    {
     "ans": "ده مثال الـ login بتاع L10: بنستخدم POST عشان الـ password مايظهرش في الـ URL.<pre>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;&lt;title&gt;Login&lt;/title&gt;&lt;/head&gt;\n&lt;body&gt;\n&lt;form action=\"\" method=\"post\"&gt;\n  &lt;h3&gt;welcome in myform&lt;/h3&gt;\n  &lt;label for=\"username\"&gt;Username:&lt;/label&gt;\n  &lt;input type=\"text\" id=\"username\" name=\"username\"&gt;&lt;br&gt;\n  &lt;label for=\"password\"&gt;Password:&lt;/label&gt;\n  &lt;input type=\"password\" id=\"password\" name=\"password\"&gt;&lt;br&gt;\n  &lt;input type=\"submit\" value=\"Login\"&gt;\n&lt;/form&gt;\n&lt;?php\nif ($_SERVER[\"REQUEST_METHOD\"] == \"POST\") {\n    if (empty(trim($_POST[\"username\"]))) {\n        echo \"Username is required\";\n    } elseif (empty(trim($_POST[\"password\"]))) {\n        echo \"Password is required\";\n    } else {\n        $username = htmlspecialchars(trim($_POST[\"username\"]));\n        echo \"welcome $username\";\n    }\n}\n?&gt;\n&lt;/body&gt;\n&lt;/html&gt;</pre>"
    }
   ]
  }
 ]
};


AR.web.exams[3] = { sections: [
  { items: [
    { why: `الـ font-family هي اللي بتحدد الـ font؛ أما الـ font-weight فهي التخانة (bold)، والـ font-style هي الـ italic (L3/L4).`, ow: [null, `الـ font-weight بيحدد تخانة الكلام (normal، bold)؛ مش بيغيّر نوع الخط، ده شغل الـ font-family.`, `الـ font-style بيحدد normal أو italic أو oblique؛ الخط نفسه بيتختار بالـ font-family.`, `مفيش CSS property اسمها font-property؛ خط الـ element بيتحدد بالـ font-family.`] },
    { why: `الـ list-style-type هي اللي بتحدد شكل الـ marker بتاع الـ list (disc، circle، square، none) (L5).`, ow: [`مفيش CSS property اسمها list؛ شكل الـ marker بتاع الـ list items بيتحدد بالـ list-style-type.`, `مفيش CSS property اسمها list-type؛ الاسم كامل هو list-style-type، زي list-style-type: square;.`, null, `غلط، لأن list-style-type: square; موجودة في الاختيارات وهي الـ declaration الصح.`] },
    { why: `بعد الـ $ الاسم لازم يبدأ بحرف أو underscore؛ والـ $this كلمة محجوزة (reserved) (L10).`, ow: [`بعد الـ $ الاسم مينفعش يبدأ برقم، فالـ $3hello غلط؛ لازم يبدأ بحرف أو underscore.`, null, `الـ $this كلمة محجوزة (reserved) بتشاور على الـ object الحالي، فمينفعش تستخدمها كاسم variable عادي.`, `بعد الـ $ الاسم مينفعش يبدأ برقم، فالـ $5_Hello غلط.`] },
    { why: `الـ &lt;ul&gt; هي الـ unordered list (اللي بـ bullets)؛ أما الـ &lt;ol&gt; فمترقمة (L5).`, ow: [`مفيش element اسمه &lt;list&gt; في الـ HTML؛ الـ bulleted list هي unordered list، يعني &lt;ul&gt;.`, `الـ &lt;ol&gt; دي ordered list عناصرها مترقمة، مش بـ bullets؛ الـ bullets بتيجي من &lt;ul&gt;.`, null, `الـ &lt;dl&gt; دي description list فيها terms (&lt;dt&gt;) وdescriptions (&lt;dd&gt;) من غير bullets؛ الـ bulleted lists بتستخدم &lt;ul&gt;.`] },
    { why: `الـ &lt;strong&gt; بتعرّف نص مهم (important)؛ أما الـ &lt;b&gt; فهي bold شكلي بس (L3).`, ow: [`الـ &lt;i&gt; بيعرض الكلام italic بس من غير أي معنى زيادة؛ الكلام المهم بيتعرّف بـ &lt;strong&gt;.`, null, `الـ &lt;b&gt; بيخلي الكلام bold شكلًا بس من غير أهمية زيادة؛ الكلام المهم هو &lt;strong&gt;.`, `مفيش element اسمه &lt;important&gt; في الـ HTML؛ الكلام المهم بيتعلّم بـ &lt;strong&gt;.`] },
    { why: `الـ CSS rule عبارة عن selector وبعده declaration block جوه أقواس {}، وكل declaration بيتكتب property: value;، يعني body {color: black;} (L4, CSS syntax).`, ow: [`الـ selector لازم ييجي قبل الأقواس، مش جواها ومعاه semicolon؛ الشكل الصح selector {property: value;}.`, `مفيش أقواس، وكمان الـ CSS بتفصل بين الـ property والـ value بـ colon مش بـ =؛ الشكل الصح body {color: black;}.`, null, `الـ selector جوه الأقواس ومستخدم = بدل الـ colon؛ الشكل الصح body {color: black;}.`] },
    { why: `استخدم الـ style attribute ومعاه الـ background-color (L3).`, ow: [null, `مفيش element اسمه &lt;background&gt; في الـ HTML؛ الخلفية بتتعمل بالـ style attribute ومعاه background-color.`, `الـ bg مش HTML attribute؛ الخلفية بتتحدد بـ style="background-color:yellow;".`, `غلط، لأن &lt;body style="background-color:yellow;"&gt; موجودة في الاختيارات وهي الطريقة الصح.`] },
    { why: `الـ HTML مش case sensitive؛ الـ XHTML بس هي اللي بتشترط lowercase (L2/L6).`, ow: [`الـ HTML مش case sensitive: الـ &lt;P&gt; زي الـ &lt;p&gt; بالظبط. اللي بتشترط lowercase tags هي الـ XHTML.`, `مش لازم uppercase؛ الـ HTML tags تتكتب بأي case، والـ W3C أصلًا بتنصح بالـ lowercase.`, null, `الـ lowercase مجرد recommendation من الـ W3C، مش شرط، لأن الـ HTML مش case sensitive (الـ XHTML هي اللي بتشترطه).`] },
    { why: `الـ constants بتتكتب من غير $: يعني echo GREETING; كانت هتطبع النص. لكن $GREETING ده variable مش متعرّف، فمفيش حاجة بتتطبع (وفي PHP 8 كمان بيطلع warning "Undefined variable" لو الـ errors ظاهرة) (L10).`, ow: [`الـ echo بيطبع قيمة الـ variable، مش اسمه.`, null, `الكلام ده بيتطبع بس لو كتبت echo GREETING; (الـ constants بتتستخدم من غير $)؛ لكن الـ $GREETING ده variable مش متعرّف.`, `الـ echo عمره ما بيطبع اسم الـ constant؛ وكمان الـ $GREETING ده variable تاني خالص ومش متعرّف، فمفيش حاجة بتتطبع.`] },
    { why: `المحتوى اللي بيظهر في الصفحة بيبقى بين &lt;body&gt; و&lt;/body&gt; (L2).`, ow: [`الـ paragraph نوع واحد بس من المحتوى اللي بيظهر؛ الجزء الظاهر كله بيبقى بين &lt;body&gt; و&lt;/body&gt;.`, null, `الـ link (&lt;a&gt;) مجرد نوع واحد من المحتوى الظاهر جوه الـ body؛ الجزء الظاهر كله بين &lt;body&gt; و&lt;/body&gt;.`, `الـ image (&lt;img&gt;) مجرد نوع واحد من المحتوى الظاهر جوه الـ body؛ الجزء الظاهر كله بين &lt;body&gt; و&lt;/body&gt;.`] },
    { why: `الـ relative URL ملوش domain، فهو بيشاور على صفحة جوه نفس الـ site (L2).`, ow: [null, `عشان تربط بصفحات في مواقع تانية محتاج absolute URL فيه الـ domain؛ الـ relative URL بيفضل جوه نفس الموقع.`, `عشان تربط بصفحات في مواقع تانية محتاج absolute URL فيه الـ domain؛ الـ relative URL مافيهوش domain فبيفضل جوه نفس الموقع.`, `الـ relative URLs بتعمل link عادي، في الـ href والـ src؛ هي بس بتشيل الـ domain، فبتشاور على ملفات جوه نفس الموقع.`] },
    { why: `الـ table والـ tr (الـ row) والـ td (الـ cell) كلهم table elements؛ أما &lt;head&gt; و&lt;tt&gt; و&lt;body&gt; فلأ (L5).`, ow: [`الـ &lt;head&gt; ده الـ head بتاع الـ document، مش table element.`, `الـ &lt;tt&gt; ده formatting tag قديم (obsolete) بتاع الـ teletype text، مش table element؛ مجموعة الـ table هي &lt;table&gt; و&lt;tr&gt; و&lt;td&gt;.`, null, `الـ &lt;body&gt; ده الجزء اللي بيظهر من الـ document، مش table element؛ مجموعة الـ body بتاعة الـ table اسمها &lt;tbody&gt;.`] },
    { why: `الـ functions في PHP بتبدأ بالـ keyword اللي اسمها function، وبعدها الاسم والـ parameters (L10).`, ow: [`الـ keyword اللي اسمها function ناقصة؛ من غيرها الـ PHP هيقرا ده على إنه call للـ functionName، مش تعريف.`, `اسم الـ function والـ parameter list ناقصين؛ الـ function في الـ PHP بتتكتب function name($param) { ... }.`, null, `ده أسلوب الـ C/Java؛ الـ PHP مافيهاش return type في الأول.`] },
    { why: `الـ JSON.stringify() بتحوّل الـ object لـ JSON string؛ والـ JSON.parse() بتعمل العكس (L9).`, ow: [null, `الـ JSON.parse() بتعمل العكس: بترجّع الـ JSON string للـ object الأصلي؛ أما الـ serialize فهو stringify().`, `الـ convert() مش method في الـ JSON object؛ الـ object بيتعمله serialize بالـ JSON.stringify().`, `غلط، لأن stringify() موجودة في الاختيارات وهي الـ method اللي بتحوّل الـ object لـ JSON string.`] },
    { why: `الـ slice(2, 4) بترجع الـ indexes 2 و3 = [3, 4] (L8).`, ow: [null, `الـ 2, 3 دول القيم اللي عند الـ indexes 1 و2؛ لكن الـ slice(2, 4) بتبدأ من index 2 (القيمة 3) وبتقف قبل index 4.`, `الـ slice مابتدخلش الـ end index، فالـ index 4 (القيمة 5) مش داخل؛ النتيجة الـ indexes 2 و3: يعني 3, 4.`, `الـ 2, 3, 4 دي كأنك عاملها positions بتبدأ من 1؛ لكن الـ indexes بتبدأ من 0، فالـ slice(2, 4) بتدي الـ indexes 2 و3: يعني 3, 4.`] },
    { why: `الـ // هي إجابة الـ key (single-line comment). خلي بالك إن /* */ كمان comment صح في JS (multi-line)، فـ A مش غلط فعلًا؛ بس اختار B زي الـ key (L7).`, ow: [`الـ /* */ كمان comment صح في الـ JavaScript (الشكل الـ multi-line)، بس الإجابة اللي الـ key مستنيها هي الـ single-line //.`, null, `الـ # بتبدأ comment في الـ PHP (والـ Python)، مش في الـ JavaScript، اللي الـ comments فيها // و /* */.`, `علامات الـ $ مابتعملش comments؛ الـ $ مجرد حرف مسموح بيه في أسامي الـ variables. الـ comments في الـ JS هي // و /* */.`] },
    { why: `5 right-rotations على 4 elements = rotation واحدة بس: بنعمل pop للـ 111 وunshift ليها &rarr; [111, 44, 1, 22] (اتأكدنا بـ node). الاختيارين A وC مطبوعين نفس الشكل بالظبط؛ والـ key بيدّي A. وبالدقة، الـ call نفسها متعلّق عليها comment فمفيش حاجة هتتطبع أصلًا.`, ow: [null, `ده الـ array الأصلي، اللي بيطلع بعد 0 أو 4 rotations؛ و5 rotations على 4 elements = rotation واحدة.`, `مطبوع زي A بالظبط في الورقة؛ الـ key بيعلّم على A، فاختار A مش النسخة المكررة، حتى لو القيمة واحدة.`, `ده left rotation (أول element بيروح للآخر)؛ لكن الـ loop بتعمل pop لآخر element وunshift ليه في الأول، يعني بتلف لليمين (right).`] },
    { why: `الـ const بتعرّف constant ماينفعش تتعملها reassign (L7).`, ow: [null, `الـ var بتعرّف variable عادي (function أو global scope) قيمته تتغيّر؛ الـ constant محتاج const.`, `الـ let بتعرّف variable block-scoped لسه قيمته ممكن تتغيّر بعدين؛ الـ constant محتاج const.`, `الـ constant مش keyword في الـ JavaScript؛ الـ constant بيتعرّف بـ const ومينفعش تعمله reassign.`] },
    { why: `كلهم output methods في JS (ومعاهم الـ innerHTML) (L7).`, ow: [`الـ document.write() فعلًا method للـ output، بس الـ console.log() والـ window.alert() كمان، فالإجابة الكاملة هي "All of the above".`, `الـ console.log() فعلًا method للـ output (بيكتب في الـ console)، بس الـ document.write() والـ window.alert() كمان، فالإجابة "All of the above".`, `الـ window.alert() فعلًا method للـ output (بيطلع alert box)، بس الـ document.write() والـ console.log() كمان، فالإجابة "All of the above".`, null] },
    { why: `الاتنين DOM methods بنوصل بيها للـ elements (L7).`, ow: [`الـ getElementById() فعلًا بتوصل للـ elements، بس الـ getElementsByClassName() كمان، فالإجابة الكاملة "Both A and B".`, `الـ getElementsByClassName() فعلًا بتوصل للـ elements، بس الـ getElementById() كمان، فالإجابة الكاملة "Both A and B".`, null, `غلط، لأن الـ getElementById() والـ getElementsByClassName() الاتنين DOM methods بنوصل بيهم للـ HTML elements.`] },
  ] },
  { items: [
    { ans: `الـ XHTML (EXtensible HyperText Markup Language) هي نسخة أكثر صرامة من الـ HTML ومبنية على XML (يعني HTML متعرّفة كـ XML application)، والـ error handling فيها strict؛ أما الـ browsers فبتعدّي الأخطاء في الـ HTML. أهم الفروق: (1) الـ &lt;!DOCTYPE&gt; إجباري؛ (2) الـ xmlns attribute في الـ &lt;html&gt; إجباري؛ (3) الـ &lt;html&gt; والـ &lt;head&gt; والـ &lt;title&gt; والـ &lt;body&gt; إجباريين؛ (4) الـ elements لازم دايمًا تبقى nested صح (&lt;b&gt;&lt;i&gt;text&lt;/i&gt;&lt;/b&gt;)؛ (5) الـ elements لازم دايمًا تتقفل، حتى الـ empty منها (&lt;br /&gt;، &lt;img ... /&gt;)؛ (6) الـ elements لازم تبقى lowercase؛ (7) أسماء الـ attributes لازم تبقى lowercase؛ (8) قيم الـ attributes لازم دايمًا تبقى بين quotes. (L6)` },
    { ans: `<b>المميزات</b>: تفاعل أقل مع الـ server (بتعمل validate للـ input قبل ما يتبعت، فالحمل على الـ server يقل)؛ feedback فوري للزوار (من غير reload للصفحة)؛ تفاعل أكتر (بتستجيب للـ mouse hover والـ keyboard)؛ interfaces أغنى (drag-and-drop، sliders).<br><b>العيوب (Limitations)</b>: الـ client-side JS ماتقدرش تقرا أو تكتب files (عشان الـ security)؛ ماينفعش تستخدمها في الـ networking applications؛ ومفيهاش multithreading ولا multiprocessor capabilities. هي lightweight interpreted language بتضيف تفاعل للصفحات الـ static. (L7)` },
    { ans: `<b>الـ Output:</b> 1 وبعدها 0 (كل واحد بعده "\\n"؛ وفي الـ browser هيظهروا "1 0").<br><b>ليه:</b> الـ MXX بتحسب باقي القسمة من غير %: MXX(13,2): ds = (int)(6.5) = 6، 13 - 2*6 = <b>1</b>. MXX(81,3): ds = 27، 81 - 3*27 = <b>0</b>. (تمرين 3 في Sheet 3 بتاع PHP؛ ومطابق للـ student key.)` },
    { ans: `<pre>[22, 66, 11, 77, 33, 55, 44]
indexOf(33,2): 4
LastIndexOf(33,-1): 4
includes(33, 2): true
includes(88, 0): false
Uncaught ReferenceError: nums is not defined</pre><b>ليه:</b> الـ 33 موجودة عند index 4 (سواء بدوّرنا من 2، أو بدوّرنا بالعكس من آخر element)؛ والـ includes بتلاقي 33 بس مابتلاقيش 88. في الـ script ده <b>الـ nums عمرها ما اتعرّفت</b>، فـ <code>x.concat(nums,y)</code> بترمي ReferenceError وباقي السطور مابتتنفذش (اتأكدنا بـ node).<br><b>لو الممتحن كان قصده <code>x.concat(y)</code></b> (زي ما الـ student key فاكر)، يبقى الباقي: <code>x.concat(nums,y): 22,66,11,77,33,55,44,99,77,88</code>، <code>x.sort(): 11,22,33,44,55,66,77</code>، <code>x.reverse(): 77,66,55,44,33,22,11</code>، <code>x.join(): 77,66,55,44,33,22,11</code>، <code>x.join('-'): 77-66-55-44-33-22-11</code> (الـ concat مابتغيرش x؛ أما الـ sort والـ reverse فبيغيروها).` },
    { ans: `<b>زي ما هو مكتوب، مفيش output</b>: الـ arrow function اللي اسمها pr اتعرّفت بس، وعمرها ما اتنادت (مفيش <code>pr();</code>).<br>لو اتنادت، هتطبع:<pre>Y
XY
YXY
XYXY
YXYXY</pre><b>ليه:</b> لـ x = 1..5، الـ p بتبقى "X" لما x زوجي و"Y" لما يبقى فردي، و<code>s = p + s</code> بتحط p في <b>أول</b> الـ string: x=1 Y؛ x=2 XY؛ x=3 YXY؛ x=4 XYXY؛ x=5 YXYXY (اتأكدنا بـ node؛ والـ student key بيتتبعها بنفس الطريقة).` },
    { ans: `<pre>omer
18
{ name: 'Ahmed', age: 18, getName: [Function: getName], status: 'M' }</pre><b>ليه:</b> الـ S1.name اتغيرت لـ "omer"، فـ S1.getName() بترجع <b>omer</b>. الـ S2 اتعملت والـ prototype بتاعها هو S1، ومعاها own property اسمها class = 1 بس non-enumerable؛ ولما بنعمل assign لـ S2.name وS2.age بيتعمل own properties، فـ S2.age = <b>18</b>. الـ Object.assign(S1, S2, {status:'M'}) بتنسخ الـ own enumerable properties بتاعة S2 (name وage؛ مش class) ومعاهم status جوه <b>S1</b> وبترجع S1، فـ Sclass هي S1 = {name: "Ahmed", age: 18, getName: f, status: "M"} (اتأكدنا بـ node). (الورقة طابعة <code>console.log(S1.getName(),</code> بـ comma؛ وإحنا بنقراها على إنها قوس قافل.)` },
  ] },
  { items: [
    { ans: `يعني A = 90-100، B = 80-89، C = 70-79، D+ = 60-69، D = 50-59، F = 0-49 (نفس الـ ranges بتاعة Example 1 في L9).<pre>&lt;script&gt;
function calcGrade() {
  let N = parseInt(window.prompt("Enter the number of students:"));
  let all = [];
  for (let st = 1; st &lt;= N; st++) {
    let sum = 0;
    for (let i = 0; i &lt;= 5; i++) {                     // S(i), i = 0..5
      sum += Number(window.prompt("Student " + st + ": subject [" + i + "] mark from 100:"));
    }
    let av = sum / 6;                                   // average
    let gpa = av / 25;                                  // gpa = av / 25
    let grade;
    if (av &gt;= 90)      grade = "A (Ex)";
    else if (av &gt;= 80) grade = "B (VG)";
    else if (av &gt;= 70) grade = "C (G)";
    else if (av &gt;= 60) grade = "D+ (S+)";
    else if (av &gt;= 50) grade = "D (S)";
    else               grade = "F (F)";                 // 0 to 49
    window.alert("Student " + st + ": Grade = " + grade + ", GPA = " + gpa.toFixed(2));
    all.push(gpa.toFixed(2));
    localStorage.setItem("student" + st, gpa.toFixed(2));
  }
  localStorage.setItem("allGPA", JSON.stringify(all));
}
calcGrade();
&lt;/script&gt;</pre>مثال: الدرجات 90، 80، 70، 85، 95، 60 &rarr; av = 480/6 = 80 &rarr; grade B (VG)، وgpa = 80/25 = 3.2.<br>حل الـ student في JS.txt بيجمع الـ strings اللي راجعة من الـ prompt على طول (sum += grades[j])، وده بيعمل concatenation للـ strings؛ لازم الدرجات تتحول الأول بـ Number() أو parseFloat().` },
    { ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;QE Solver&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
&lt;form action="" method="post"&gt;
  &lt;h3&gt;QE Solver&lt;/h3&gt;
  Coefficient(a): &lt;input type="text" name="a"&gt;&lt;br&gt;
  Coefficient(b): &lt;input type="text" name="b"&gt;&lt;br&gt;
  Coefficient(c): &lt;input type="text" name="c"&gt;&lt;br&gt;
  &lt;input type="submit" value="Solve"&gt;
&lt;/form&gt;
&lt;?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $a = trim($_POST["a"]); $b = trim($_POST["b"]); $c = trim($_POST["c"]);
    if ($a === "" || $b === "" || $c === "") {
        echo "All coefficients are required.";
    } elseif (!is_numeric($a) || !is_numeric($b) || !is_numeric($c)) {
        echo "Coefficients must be numbers.";
    } elseif ($a == 0) {
        echo "a must not be 0 (not a quadratic equation).";
    } else {
        $d = $b * $b - 4 * $a * $c;                      // discriminant
        if ($d &lt; 0) {
            echo "No real roots (discriminant &lt; 0).";
        } else {
            $x1 = (-$b + sqrt($d)) / (2 * $a);           // note the brackets
            $x2 = (-$b - sqrt($d)) / (2 * $a);
            echo "X1 = $x1 &lt;br&gt; X2 = $x2";
        }
    }
}
?&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>مثال: a = 1، b = -3، c = 2 &rarr; الـ discriminant = 9 - 8 = 1 &rarr; X1 = (3 + 1)/2 = 2، X2 = (3 - 1)/2 = 1. الأقواس حوالين (2 * $a) ضرورية: لو كتبت /2*$a هتقسم على 2 وبعدين تضرب في a.` },
  ] },
] };


AR.web.exams[4] = { sections: [
  { items: [
    { why: `الـ &lt;strong&gt; بتعرّف نص مهم (important)؛ أما الـ &lt;b&gt; فهي bold شكلي بس (L3).`, ow: [`الـ &lt;i&gt; بتعرض النص italic بس، من غير أي معنى زيادة؛ النص المهم بيتعرّف بالـ &lt;strong&gt;.`, null, `الـ &lt;b&gt; بتخلي النص bold للشكل بس، من غير ما تديله أهمية؛ النص المهم هو الـ &lt;strong&gt;.`, `مفيش element اسمه &lt;important&gt; في الـ HTML؛ النص المهم بيتعلّم بالـ &lt;strong&gt;.`] },
    { why: `الـ table والـ tr (الـ row) والـ td (الـ cell) كلهم table elements؛ أما &lt;head&gt; و&lt;tt&gt; و&lt;body&gt; فلأ (L5).`, ow: [`الـ &lt;head&gt; ده الـ head بتاع الـ document، مش table element.`, `الـ &lt;tt&gt; ده tag قديم (obsolete) للـ teletype text formatting، مش table element؛ الـ table set هو &lt;table&gt; و&lt;tr&gt; و&lt;td&gt;.`, null, `الـ &lt;body&gt; ده الجزء اللي بيظهر من الـ document، مش table element؛ الـ group بتاع جسم الجدول اسمه &lt;tbody&gt;.`] },
    { why: `الـ &lt;ul&gt; هي الـ unordered list (اللي بـ bullets)؛ أما الـ &lt;ol&gt; فمترقمة (L5).`, ow: [`مفيش element اسمه &lt;list&gt; في الـ HTML؛ الـ bulleted list هي unordered list، يعني &lt;ul&gt;.`, `الـ &lt;ol&gt; دي ordered list وعناصرها مترقمة، مش بـ bullets؛ الـ bullets بتيجي من الـ &lt;ul&gt;.`, null, `الـ &lt;dl&gt; دي description list فيها terms (&lt;dt&gt;) وdescriptions (&lt;dd&gt;)، ومن غير bullets؛ الـ bulleted lists بتستخدم &lt;ul&gt;.`] },
    { why: `الـ declaration بتاع HTML5 هو &lt;!DOCTYPE html&gt; (L2).`, ow: [`الـ declaration بتاع HTML5 مفيهوش رقم version؛ هو ببساطة &lt;!DOCTYPE html&gt;.`, null, `ناقص: الـ declaration لازم يسمّي نوع الـ document؛ وفي HTML5 هو &lt;!DOCTYPE html&gt;.`, `فيه اختيار صح: &lt;!DOCTYPE html&gt; هو الـ declaration بتاع HTML5، فـ "None" غلط.`] },
    { why: `الـ background-color هي الـ CSS property؛ والـ color بتاعة لون النص؛ والـ bgcolor ده attribute قديم (obsolete) (L3).`, ow: [null, `الـ color property بتغيّر لون النص (الـ foreground)، زي color:blue؛ أما الخلفية فبالـ background-color.`, `الـ bgcolor ده HTML attribute قديم (obsolete)، مش CSS property.`, `غلط، لأن background-color موجودة في الاختيارات وهي الـ CSS property اللي بتغيّر لون الخلفية.`] },
    { why: `الـ relative URL ملوش domain، فهو بيشاور على صفحة جوه نفس الـ site (L2).`, ow: [null, `اللينك لصفحات على sites تانية محتاج absolute URL فيه الـ domain؛ الـ relative URL بيفضل جوه نفس الـ site.`, `اللينك لصفحات على sites تانية محتاج absolute URL فيه الـ domain؛ الـ relative URL ملوش domain وبيفضل جوه نفس الـ site.`, `الـ relative URLs بتعمل link فعلًا، في الـ href والـ src؛ هي بس بتشيل الـ domain، فبتشاور على ملفات جوه نفس الـ site.`] },
    { why: `الـ &lt;sup&gt; (superscript) بترفع النص نص حرف لفوق (زي الأس)؛ أما الـ &lt;sub&gt; فبتاعة حاجة زي H2O (L3).`, ow: [`الـ &lt;p&gt; بتعرّف paragraph؛ الأس (power/exponent) بيترفع فوق السطر بالـ &lt;sup&gt;، زي x&lt;sup&gt;2&lt;/sup&gt;.`, `الـ &lt;sub&gt; دي subscript (تحت السطر)، بتستخدمها في حاجة زي H<sub>2</sub>O.`, null, `غلط، لأن &lt;sup&gt; (superscript) موجودة في الاختيارات وهي بالظبط الـ tag بتاع الأسس زي x<sup>2</sup>.`] },
  ] },
  { items: [
    { ans: `<b>أنواع الـ web sites</b>: (1) الـ Blog (web log): يوميات أونلاين، وممكن يبقى فيها discussion forums؛ (2) الـ Social networking site: الـ users بيتواصلوا ويشاركوا صور وفيديوهات ومزيكا وblogs؛ وممكن يبقى فيها games وweb apps؛ (3) الـ Wiki site: بيتعدّل بشكل جماعي (Wikipedia، WikiHow)؛ (4) الـ Web portal: نقطة بداية أو gateway لـ resources تانية؛ (5) الـ Search engine site: gateway/أداة بحث عن sites تانية (Google، Yahoo، Bing)؛ (6) الـ Education site: المدرسين أو الطلبة أو الإداريين بينشروا عليه معلومات المدرسة.<br><b>الـ Internet protocols</b>: الـ TCP/IP: الـ protocol الأساسي، وهو القواعد اللي الكمبيوترات بتمشي عليها عشان تتواصل على الـ network؛ الـ HTTP: بيتبادل بيه تقريبًا كل الـ web resources، وهو لغة الـ browser اللي بيبعت بيها الـ requests (والـ HTTPS هو النسخة الآمنة الـ encrypted)؛ الـ FTP: بيعمل upload/download للـ files بين الـ client والـ server؛ (الـ ISP: المؤسسة اللي بتديك access للـ Internet وخدمات زي الـ e-mail). (L1)` },
    { ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;!-- navigation menu style from the external URL --&gt;
&lt;link rel="stylesheet" href="https://www.mmm.com/html/styles.css"&gt;
&lt;style&gt;
  /* heading: 10px red solid border, padding 20px 40px, margin 10px 100px */
  h1 { border: 10px solid red; padding: 20px 40px; margin: 10px 100px; text-align: center; }
  /* table: single 2px blue solid border, padding 2px, margin 10px 90px */
  table { border: 2px solid blue; border-collapse: collapse; margin: 10px 90px; }
  th, td { border: 2px solid blue; padding: 2px; text-align: center; }
  /* heading cells gray with level 200 */
  th { background-color: rgb(200, 200, 200); }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;!-- navigation menu --&gt;
&lt;ul&gt;
  &lt;li&gt;&lt;a href="#home"&gt;Home&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#news"&gt;News&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#about"&gt;About&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;!-- heading --&gt;
&lt;h1&gt;Scheduling Table&lt;/h1&gt;
&lt;!-- table --&gt;
&lt;table&gt;
  &lt;tr&gt;&lt;th colspan="5"&gt;Time Table Method&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;th rowspan="6"&gt;Hours&lt;/th&gt;&lt;th&gt;SAT&lt;/th&gt;&lt;th&gt;MON&lt;/th&gt;&lt;th&gt;WED&lt;/th&gt;&lt;th&gt;THU&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td rowspan="2"&gt;WP&lt;/td&gt;&lt;td&gt;WP&lt;/td&gt;&lt;td rowspan="4"&gt;Office Hrs&lt;/td&gt;&lt;td&gt;Theory&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;AI&lt;/td&gt;&lt;td&gt;Office Hrs&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Break&lt;/td&gt;&lt;td rowspan="2"&gt;Office Hrs&lt;/td&gt;&lt;td&gt;Theory&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;WP&lt;/td&gt;&lt;td&gt;Theory&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td colspan="4"&gt;Lunch&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;!-- description list --&gt;
&lt;dl&gt;
  &lt;dt&gt;WP:&lt;/dt&gt;     &lt;dd&gt;-It's a Web-Programming course.&lt;/dd&gt;
  &lt;dt&gt;Theory:&lt;/dt&gt; &lt;dd&gt;-It's a Theory of Computation course.&lt;/dd&gt;
&lt;/dl&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>تشيك على الـ table (5 columns): كل row مجموعها 5 لما تعدّ الـ cells اللي لسه متغطية بـ rowspan من فوق (الطريقة في L5). الـ "Single border" = border-collapse: collapse؛ والـ "gray with level 200" = rgb(200, 200, 200).` },
  ] },
  { items: [
    { why: `لون الخلفية بيتحط بالـ style attribute ومعاه الـ CSS property اللي اسمها background-color: &lt;body style="background-color:yellow;"&gt; (L3).`, ow: [null, `مفيش element اسمه &lt;background&gt; في الـ HTML؛ الخلفية بتتعمل style بالـ style attribute والـ background-color.`, `الـ bg ده مش HTML attribute؛ الخلفية بتتحط بـ style="background-color:yellow;".`, `غلط، لأن &lt;body style="background-color:yellow;"&gt; موجودة في الاختيارات وهي الطريقة الصح.`] },
    { why: `اللينك هو الـ &lt;a&gt; element والـ destination URL بيتحط في الـ href؛ والنص اللي بين الـ tags هو اللي اليوزر بيدوس عليه (L2).`, ow: [`من غير href attribute الـ anchor ملوش destination، فالنص مش هيبقى link شغال؛ الـ URL لازم يتحط في الـ href.`, `الـ name attribute بيدي اسم للـ anchor (bookmark target) ومبيحددش destination؛ الـ URL لازم يتحط في الـ href.`, null, `مفيش attribute اسمه url على الـ &lt;a&gt;؛ الـ destination بتاع اللينك بيتحط في الـ href attribute.`] },
    { why: `الـ &lt;ol&gt; هي الـ ordered list؛ عناصر الـ &lt;li&gt; بتاعتها بتترقم بشكل default (type="1")، أما الـ &lt;ul&gt; فبتدّي bullets (L5).`, ow: [`مفيش element اسمه &lt;list&gt; في الـ HTML؛ الـ numbered list هي ordered list، يعني &lt;ol&gt;.`, null, `الـ &lt;ul&gt; هي الـ unordered list، وبتتعلّم بـ bullets مش أرقام؛ الـ numbered lists بتستخدم &lt;ol&gt;.`, `الـ &lt;dl&gt; دي description list فيها terms وdescriptions، ومش مترقمة؛ الـ numbered lists بتستخدم &lt;ol&gt;.`] },
    { why: `الـ &lt;img&gt; ده empty element وليه src (الـ path) وalt (النص البديل) (L2).`, ow: [`الـ &lt;img&gt; ده empty element؛ الملف بيتحط في الـ src، مش كـ content جوه الـ tag.`, `مفيش element اسمه &lt;image&gt; في الـ HTML؛ الـ image element هو &lt;img&gt;، والـ path في الـ src والنص البديل في الـ alt.`, null, `الـ href ده الـ destination attribute بتاع اللينك (&lt;a&gt;)؛ الـ path بتاع الصورة بيتحط في الـ src attribute: &lt;img src="image.gif"&gt;.`] },
    { why: `الـ CSS rule عبارة عن selector وبعده declaration block جوه أقواس {}، وكل declaration مكتوبة property: value;، فالشكل body {color: black;} (L4, CSS syntax).`, ow: [`الـ selector لازم ييجي قبل الأقواس، مش جواها ومعاه semicolon؛ الشكل هو selector {property: value;}.`, `مفيش أقواس، والـ CSS بتفصل الـ property عن الـ value بـ colon (:) مش بـ =؛ الشكل هو body {color: black;}.`, null, `الـ selector جوه الأقواس ومستخدم = بدل الـ colon؛ الشكل الصح هو body {color: black;}.`] },
    { why: `الـ element selector اللي هو h1 بيختار كل &lt;h1&gt;؛ أما h1.all فمحتاج class="all" (L4).`, ow: [`الـ h1.all بيختار بس الـ &lt;h1&gt; اللي عليها class="all"، مش كل &lt;h1&gt;؛ الـ element selector العادي h1 هو اللي بيعمل كده.`, `الـ all.h1 بيختار elements اسمها &lt;all&gt; وعليها class="h1"، ودي مش موجودة أصلًا؛ كل الـ &lt;h1&gt; بيتختاروا بـ h1.`, null, `غلط، لأن h1 {background-color:#FFFFFF;} موجودة في الاختيارات وبتستهدف كل &lt;h1&gt; صح.`] },
    { why: `الـ HTML هي HyperText Markup Language: بتعمل markup لـ structure الصفحة بالـ tags ومفيهاش أي programming logic (L2).`, ow: [`الـ JavaScript والـ PHP هما الـ scripting languages؛ الـ HTML بتعمل markup للـ structure بس.`, null, `الـ HTML مفيهاش variables ولا conditions ولا loops؛ هي بس بتوصف الـ structure بتاع الصفحة، فهي markup language مش programming language.`, `الـ network protocol ده مجموعة قواعد للتواصل زي HTTP أو FTP؛ الـ HTML هي الـ markup language بتاعة الصفحات اللي الـ HTTP بينقلها.`] },
  ] },
  { items: [
    { ans: `(1) <b>Information availability</b>: وفّر 80-90% من اللي الزائر بيدوّر عليه. (2) <b>Page layout</b>: المحتوى المهم يتلاقي بسرعة؛ والصفحات تبقى بسيطة. (3) <b>Colors</b>: ألوان standard، الـ links زرقا، الـ visited بنفسجي، والـ active أحمر. (4) <b>Web accessibility</b>: الموقع يبقى قابل للاستخدام من الناس اللي عندهم إعاقات بصرية أو سمعية أو حركية أو في الكلام. (5) <b>User-friendly site</b>: مبني على احتياجات الجمهور (UI/UX). (6) <b>Download speed</b>: اعمل optimize للـ graphics (الصور ماتزيدش عن 10 KB)، صفحات أصغر، وابعد عن الـ nested tables. (L1)` },
    { ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;!-- navigation menu style from the external URL --&gt;
&lt;link rel="stylesheet" href="https://www.mmm.com/html/styles.css"&gt;
&lt;style&gt;
  /* single 2px blue solid border for heading and table */
  h1 { border: 2px solid blue; text-align: center; }
  table, th, td { border: 2px solid blue; border-collapse: collapse; }
  /* heading cells gray with level 200 */
  th { background-color: rgb(200, 200, 200); }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;!-- navigation menu --&gt;
&lt;ul&gt;
  &lt;li&gt;&lt;a href="#home"&gt;Home&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#news"&gt;News&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#about"&gt;About&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;!-- heading --&gt;
&lt;h1&gt;Student Assessment Methods&lt;/h1&gt;
&lt;!-- table --&gt;
&lt;table style="width:100%"&gt;
  &lt;tr&gt;&lt;th colspan="2"&gt;Assessment Method&lt;/th&gt;&lt;th&gt;Marks&lt;/th&gt;&lt;th&gt;Percentage(%)&lt;/th&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td colspan="2"&gt;Mid-Term Exam&lt;/td&gt;&lt;td&gt;20&lt;/td&gt;&lt;td&gt;20%&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td rowspan="4"&gt;Year work&lt;/td&gt;&lt;td&gt;Quiz&lt;/td&gt;&lt;td rowspan="4"&gt;10&lt;/td&gt;&lt;td rowspan="4"&gt;10%&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Researches&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Assignments&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td&gt;Participation&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td colspan="2"&gt;Practical exam and Project&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;10%&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;td colspan="2"&gt;Final Exam&lt;/td&gt;&lt;td&gt;60&lt;/td&gt;&lt;td&gt;60%&lt;/td&gt;&lt;/tr&gt;
  &lt;tr&gt;&lt;th colspan="2"&gt;Total&lt;/th&gt;&lt;th&gt;100&lt;/th&gt;&lt;th&gt;100%&lt;/th&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;!-- equation with subscripts --&gt;
&lt;p&gt;My Equation is: R = X&lt;sub&gt;2&lt;/sub&gt; - Y&lt;sub&gt;2&lt;/sub&gt; + 5&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>تشيك (4 columns): الـ "Year work" واخدة 4 rows في column 1، والـ Quiz/Researches/Assignments/Participation مالية column 2؛ والـ Marks 10 والـ 10% كل واحدة واخدة نفس الـ 4 rows. والـ subscripts معمولة بـ &lt;sub&gt; (L3).` },
  ] },
  { items: [
    { why: `الـ &lt;h1&gt; هو أهم/أكبر heading (L2).`, ow: [`الـ &lt;head&gt; ده الـ section اللي شايل الـ meta information (title، meta، link، style)، مش heading؛ أكبر heading هو &lt;h1&gt;.`, null, `مفيش element اسمه &lt;heading&gt; في الـ HTML؛ الـ headings من &lt;h1&gt; (الأهم والأكبر) لحد &lt;h6&gt; (الأقل أهمية).`, `الـ &lt;h6&gt; ده أقل heading في الأهمية (والأصغر).`] },
    { why: `الـ &lt;a&gt; هو الـ anchor element؛ ولما يبقى معاه href attribute بيعمل hyperlink لصفحة أو resource تاني (L2).`, ow: [`الصور بتتضاف بالـ empty element &lt;img src="..."&gt;؛ الـ &lt;a&gt; ممكن بس يلف حوالين صورة عشان يخليها link.`, `الـ text alignment بيتظبط بالـ CSS (text-align)، مش بالـ &lt;a&gt;؛ الـ anchor tag بيعمل hyperlinks.`, `الصوت بيتضاف بالـ &lt;audio&gt; element؛ الـ &lt;a&gt; ده الـ anchor tag بتاع الـ hyperlinks.`, null] },
    { why: `الـ start attribute بيحدد أول رقم في الـ list (L5).`, ow: [`الـ &lt;ol&gt; ملهاش attribute اسمه begin؛ الرقم اللي العد بيبدأ منه بيتحدد بالـ start.`, `الـ &lt;ol&gt; ملهاش attribute اسمه list؛ أول رقم بيتحدد بالـ start، زي start="3".`, null, `الـ &lt;ol&gt; ملهاش attribute اسمه num؛ أول رقم بيتحدد بالـ start.`] },
    { why: `الجزء اللي بيظهر من الـ document هو كل اللي بين &lt;body&gt; و&lt;/body&gt;؛ أما الـ head فشايل metadata بس (L2).`, ow: [`الـ paragraph نوع واحد بس من المحتوى اللي بيظهر؛ الجزء اللي بيظهر كله موجود بين &lt;body&gt; و&lt;/body&gt;.`, null, `الـ link (&lt;a&gt;) نوع واحد بس من المحتوى اللي بيظهر جوه الـ body؛ الجزء اللي بيظهر كله موجود بين &lt;body&gt; و&lt;/body&gt;.`, `الصورة (&lt;img&gt;) نوع واحد بس من المحتوى اللي بيظهر جوه الـ body؛ الجزء اللي بيظهر كله موجود بين &lt;body&gt; و&lt;/body&gt;.`] },
    { why: `السؤال قصده الـ &lt;head&gt; section (اسم الـ tag ضاع وقت الطباعة). الـ table ده محتوى body؛ أما الـ meta tags والـ title فمكانهم الـ head (L2).`, ow: [`الـ &lt;meta&gt; tags دي metadata ومكانها الـ head، فهي موجودة فيه فعلًا؛ والسؤال بيسأل عن اللي مش موجود.`, null, `الـ &lt;title&gt; مكانه الـ head (بيدي اسم للصفحة في الـ browser tab)، فهو موجود فيه.`, `غلط، لأن الـ &lt;table&gt; محتوى بيظهر ومكانه الـ body، فيه اختيار فعلًا مش موجود في الـ head.`] },
    { why: `الـ list-style-type بتحدد الـ marker بتاع عناصر الـ list؛ وقيمها disc (الـ default)، وcircle، وsquare، وnone (L5).`, ow: [`الـ list مش CSS property؛ الـ marker بتاع عناصر الـ list بيتحدد بالـ list-style-type.`, `الـ list-type مش CSS property؛ الاسم الكامل list-style-type، زي list-style-type: square;.`, null, `غلط، لأن list-style-type: square; موجودة في الاختيارات وهي الـ declaration الصح.`] },
    { why: `الـ font-family هي اللي بتحدد الـ font؛ أما الـ font-weight فهي التخانة (bold)، والـ font-style هي الـ italic (L3/L4).`, ow: [null, `الـ font-weight بتحدد تخانة النص (normal، bold)؛ مبتغيّرش الـ font نفسه، ده شغل الـ font-family.`, `الـ font-style بتحدد النص normal أو italic أو oblique؛ الـ font نفسه بيتختار بالـ font-family.`, `الـ font-property مش CSS property؛ الـ font بتاع الـ element بيتحدد بالـ font-family.`] },
  ] },
  { items: [
    { ans: `<b>أنواع الـ hyperlinks</b>: الـ Text hyperlink (كلمة أو جملة بتودّي الزوار لصفحة أو file أو document تاني)؛ الـ Image hyperlink (صورة بتعمل نفس الحكاية)؛ الـ Bookmark hyperlink (نص أو صورة بتودّي الزوار لجزء تاني في نفس الصفحة)؛ الـ E-mail hyperlink (بيخلي الزوار يبعتوا e-mail للعنوان اللي ظاهر).<br><b>الـ Web page مقابل الـ web site</b>: الـ web page هي document واحد، مساحة معلومات عن شخص أو business أو مؤسسة أو قضية، وفيها links لـ resources؛ أما الـ web site فهو مجموعة web pages متجمعة مع بعض ومتوصلة بطرق مختلفة، وغالبًا في root folder واحد والـ index.html هي الـ home page. (L1)` },
    { ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;!-- Block#1 navigation menu style from the external URL --&gt;
&lt;link rel="stylesheet" href="https://www.mmm.com/html/styles.css"&gt;
&lt;style&gt;
  /* Block#2 frame style */
  iframe { background-color: cyan; display: block; margin: auto;
           border: 2px solid red; height: 300px; width: 80%; }
  /* Block#3 link style */
  .glink { color: blue; font-weight: bold; }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;!-- Block#1: navigation menu --&gt;
&lt;div&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="#home"&gt;Home&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#news"&gt;News&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="#contact"&gt;Contact&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="#about"&gt;About&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;
&lt;!-- Block#2: heading and frame (target of the link in Block#3) --&gt;
&lt;div&gt;
  &lt;h2 style="text-align:center;"&gt;Iframe - Target for a Link&lt;/h2&gt;
  &lt;iframe src="demo_iframe.htm" name="iframe_a" title="Iframe Example"&gt;&lt;/iframe&gt;
&lt;/div&gt;
&lt;!-- Block#3: hyperlink surrounded by the symbol 128512, then a radio form --&gt;
&lt;div&gt;
  &lt;p&gt;&amp;#128512; &lt;a class="glink" href="https://www.google.com" target="iframe_a"&gt;Google.com&lt;/a&gt; &amp;#128512;&lt;/p&gt;
  &lt;form&gt;
    &lt;p&gt;Choose your favorite Web language&lt;/p&gt;
    &lt;input type="radio" id="html" name="fav" value="HTML"&gt;&lt;label for="html"&gt;HTML&lt;/label&gt;&lt;br&gt;
    &lt;input type="radio" id="css" name="fav" value="CSS"&gt;&lt;label for="css"&gt;CSS&lt;/label&gt;&lt;br&gt;
    &lt;input type="radio" id="js" name="fav" value="JavaScript"&gt;&lt;label for="js"&gt;JavaScript&lt;/label&gt;
  &lt;/form&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>أهم النقط: الـ target بتاع اللينك لازم يساوي الـ name بتاع الـ iframe (L6)؛ والـ &amp;#128512; هو رمز الـ emoji بالـ decimal code بتاعه (L6)؛ والـ radios كلهم ليهم نفس الـ name عشان تختار واحد بس.` },
  ] },
] };


AR.web.exams[5] = { sections: [
  { items: [
    { why: `الأسماء بتبدأ بحرف أو $ أو _؛ والـ var والـ break كلمات محجوزة (reserved words) (L7).`, ow: [`اسم الـ variable مينفعش يبدأ برقم؛ لازم يبدأ بحرف أو $ أو _.`, null, `الـ var دي reserved word (بتعرّف بيها variables)، فمينفعش تستخدمها كاسم variable.`, `الـ break دي reserved word (بتخرج بيها من الـ loops والـ switch)، فمينفعش تستخدمها كاسم variable.`] },
    { why: `الـ typeof null بترجع "object" (غلطة تاريخية في اللغة)، وده اللي الـ MCQ ده مستنيه. بالدقة، الـ language spec بتسمي الـ type ده Null، فممكن تجادل إن B صح، بس A هي الإجابة المعتادة في الامتحانات.`, ow: [null, `الـ spec بتسمي الـ type ده Null، بس الـ typeof بترجع "object"، وده اللي الـ MCQ ده بيختبره.`, `الـ undefined دي قيمة تانية: variable اتعمله declare ومتعملوش initialize؛ الـ typeof undefined بتدّي "undefined"، أما الـ typeof null فبتدّي "object".`, `الـ Null نوع data صالح الـ variable ممكن يشيله (وموجود في لستة الـ types في المحاضرة)؛ والـ typeof null بترجع "object".`] },
    { why: `الـ arrays عبارة عن objects: فـ typeof بتدّي "object" (L7).`, ow: [`الـ typeof عمرها ما بترجع "array"؛ الـ arrays عبارة عن objects، فبتدّي "object" (والـ Array.isArray() هي اللي بتختبر لو ده array).`, null, `الـ JavaScript مفيهاش type اسمه "list" والـ typeof عمرها ما بترجعه؛ الـ arrays objects، فالنتيجة "object".`, `الـ "undefined" بتطلع بس للقيم اللي عمرها ما اتعملها assign؛ الـ array literal ده object متعرّف.`] },
    { why: `الـ HTML comments شكلها &lt;!-- ... --&gt; ومن غير مسافة بعد &lt;! (L3).`, ow: [`الفتحة محتاجة شرطتين: الـ comment بيبدأ بـ &lt;!-- وبيخلص بـ --&gt;.`, `الـ &lt;! ... !&gt; مش syntax الـ HTML comment؛ الـ comment بيتكتب &lt;!-- comment --&gt;.`, null, `المسافة بتبوّظ الـ syntax: لازم الـ -- ييجي على طول بعد &lt;!، زي &lt;!-- comment --&gt;.`] },
    { why: `الـ &lt;style&gt; في الـ head = internal CSS؛ والـ &lt;link&gt; = external (L4).`, ow: [`الـ &lt;script&gt; شايل JavaScript code، مش CSS؛ الـ internal style sheet بيتكتب في &lt;style&gt; element جوه الـ head.`, `الـ &lt;link&gt; بيربط ملف .css خارجي (external)؛ الـ internal (embedded) sheet بيتكتب جوه &lt;style&gt; في الـ head.`, `الـ &lt;class&gt; مش HTML element؛ الـ class ده attribute بتستخدمه الـ CSS class selectors. الـ internal CSS مكانه &lt;style&gt;.`, null] },
    { why: `الـ color property هي اللي بتحدد لون النص، زي h1 {color: blue;}؛ أما الـ background-color فبتحدد الخلفية (L4).`, ow: [`الـ text-decoration بتضيف أو تشيل underline أو overline أو line-through؛ مبتحددش لون النص.`, `الـ pallet مش CSS property؛ لون النص بيتحدد بالـ color property.`, `الـ text-style مش CSS property؛ لون النص بيتحدد بالـ color property.`, null] },
    { why: `الـ position (وقيمها static، relative، absolute، fixed، sticky) (L4).`, ow: [`الـ static دي قيمة من قيم الـ position property (الـ default، الـ normal flow)، مش property لوحدها.`, null, `الـ fix مش CSS property (الـ fixed قيمة من قيم الـ position)؛ مكان الـ element بيتحكم فيه الـ position property.`, `الـ set مش CSS property؛ طريقة positioning الـ element بيتحكم فيها الـ position property.`] },
    { why: `الـ strings ممكن تتلزق في بعض بالـ + operator أو بالـ concat() method، فالشكلين صح (L7, L9).`, ow: [`الـ str1 + str2 شغالة، بس الـ str1.concat(str2) كمان شغالة، فالإجابة الكاملة "Both a) and b)".`, `الـ str1.concat(str2) شغالة، بس الـ str1 + str2 كمان شغالة، فالإجابة الكاملة "Both a) and b)".`, null, `غلط، لأن الاتنين، الـ + والـ concat()، بيلزقوا two strings في بعض في الـ JavaScript.`] },
    { why: `الـ true والـ false قيم Boolean، فالـ typeof true بترجع "boolean" (L7, typeof).`, ow: [`الـ true دي القيمة نفسها؛ الـ typeof بترجع اسم الـ type بتاعها، اللي هو "boolean".`, null, `الـ true قيمة Boolean primitive، مش object، فالـ typeof بتدّي "boolean" مش "object".`, `الـ "undefined" للقيم اللي عمرها ما اتعملها assign؛ الـ true قيمة Boolean متعرّفة، فالـ typeof بتدّي "boolean".`] },
    { why: `1 + "2" = "12"، وبعدين "12" + "2" = "122" (اتأكدنا بـ node) (L8).`, ow: [null, `الـ 5 كانت هتطلع لو جمع أرقام، بس أول ما يدخل string الـ + بيعمل concatenation: 1 + "2" = "12"، وبعدين + "2" = "122".`, `الـ NaN بتظهر لما قيمة مش رقمية تدخل في عملية حسابية زي - أو *؛ الـ + مع الـ strings بيلزقهم وخلاص.`, `خلط الأرقام بالـ strings بالـ + مسموح؛ الـ JS بتحوّل الرقم لـ string، فمفيش error.`] },
    { why: `الـ sort() بتقارن كـ strings بشكل default: "2" &lt; "33" &lt; "8"، فالنتيجة [2, 33, 8]؛ يعني numbers[1] = 33 (اتأكدنا بـ node) (L8).`, ow: [null, `بعد الـ sort بترتيب الـ strings الـ array بتبقى [2, 33, 8]، فالـ 2 في index 0، مش index 1.`, `كـ strings، الـ "8" بتيجي بعد "33"، فالـ 8 في الآخر (index 2)، مش في index 1.`, `الـ 1 مش موجود في الـ array أصلًا؛ الـ numbers[1] هو العنصر اللي في index 1، وهو 33 بعد الـ sort.`] },
    { why: `الـ parseInt("42") والـ Number("42") والـ parseFloat("42") التلاتة بيحوّلوا الـ string للرقم 42 (L9, Data type conversions).`, ow: [`الـ parseInt("42") شغالة، بس الـ Number("42") والـ parseFloat("42") كمان شغالين، فالإجابة "All of them".`, `الـ Number("42") شغالة، بس الـ parseInt("42") والـ parseFloat("42") كمان شغالين، فالإجابة "All of them".`, `الـ parseFloat("42") شغالة، بس الـ parseInt("42") والـ Number("42") كمان شغالين، فالإجابة "All of them".`, null] },
    { why: `الـ NaN (Not a Number) قيمة خاصة من الـ number type، فالـ typeof NaN بترجع "number" (L7, typeof).`, ow: [`الـ typeof دايمًا بترجع اسم type، عمرها ما بترجع القيمة نفسها؛ والـ NaN (Not a Number) برضه نوعها "number".`, null, `الـ typeof عمرها ما بترجع "null" (حتى الـ typeof null بتدّي "object")؛ والـ typeof NaN هي "number".`, `الـ "undefined" للقيم اللي عمرها ما اتعملها assign؛ الـ NaN قيمة number متعرّفة، فالـ typeof بتدّي "number".`] },
    { why: `الـ typeof 1 = "number"، ودي string، فـ typeof "number" = "string" (L7).`, ow: [null, `الـ "number" دي نتيجة الـ typeof 1 الداخلية بس؛ ولما تعمل typeof تاني على الـ string دي بتدّي "string".`, `الـ typeof دايمًا بترجع اسم type زي "string"؛ عمرها ما بترجع رمز زي !.`, `الـ typeof بترجع اسم الـ type كـ string، عمرها ما بترجع true؛ الـ typeof (typeof 1) يعني typeof "number"، واللي هي "string".`] },
    { why: `مع الـ + الرقم بيتحوّل لـ string ويتعمل concatenation (5 + "9" = "59")، فالنتيجة String؛ ودي الإجابة المطلوبة. (لكن مع - أو * أو / النتيجة بتبقى number، زي "6" - 2 = 4.)`, ow: [`ده بيحصل بس مع - و* و/ (زي "6" - 2 = 4)؛ الإجابة المطلوبة ماشية على حالة الـ +.`, null, `الـ NaN قيمة من type الـ number، مش data type لوحدها؛ ومع الـ + الرقم والـ string بيدّوا string.`, `الـ JavaScript مبتفشلش لما تخلط types؛ بتحوّلهم، فمع الـ + النتيجة string زي "59".`] },
  ] },
  { items: [
    { ans: `<b>أوجه التشابه</b>: الاتنين interpreted وloosely typed scripting languages والـ syntax بتاعهم شبه C/Java (if/else، for، while، functions، arrays)، والاتنين بيتحطوا جوه الـ HTML وبيتستخدموا عشان نعمل dynamic web pages، والاتنين بيحوّلوا الـ types أوتوماتيك.<br><b>الفروق</b>: الـ JavaScript هي client-side (بتشتغل في الـ browser)، والـ PHP هي server-side (بتشتغل على الـ web server وبتبعت الـ output بتاعها بس)؛ الـ source بتاع JS ظاهر للـ user، أما كود الـ PHP فلأ (security)؛ الـ PHP تقدر توصل للـ databases والـ files اللي على الـ server، والـ client-side JS ماتقدرش تقرا/تكتب files؛ الـ JS بتستجيب للـ events من غير reload للصفحة، والـ PHP بتبني الصفحة مع كل request (الـ forms عن طريق $_GET/$_POST)؛ الـ variables في PHP بتبدأ بـ $ والـ strings بتتلزق بـ "."، أما JS فبتستخدم var/let/const و"+".` },
    { ans: `<b>1) الـ SQL injection</b>: محاولة من الـ hackers إنهم يتلاعبوا بالـ database بتاعتك عن طريق إنهم يدخّلوا كود خبيث جوه الـ query، وده ممكن يغيّر tables أو يجيب معلومات أو يمسح داتا.<br><b>2) الـ Dynamic website</b>: site الصفحات بتاعته مش متخزنة على الـ server بنفس الشكل اللي الـ user بيشوفه؛ المحتوى بيتغير أوتوماتيك/كتير حسب criteria معينة: يا إما كود الصفحة بيتبني dynamically حتة حتة، يا إما المحتوى بيختلف حسب قواعد متحددة مسبقًا أو حسب input الـ user.<br><b>3) الـ URL</b>: العنوان الكامل لـ web page وليه 3 أجزاء: الـ protocol (http)، اسم الـ site/الـ domain (www.example.com)، والـ absolute path للـ document (/2012/samples/first.html).<br><b>4) الـ HTTP</b>: network protocol بيضمن تبادل تقريبًا كل أنواع الـ resources على الـ web (files، صفحات، صور، نتايج بحث)؛ وهو لغة الـ browser اللي بيبعت بيها الـ requests للـ server؛ والـ HTTPS هو النسخة الآمنة الـ encrypted. (L1)` },
    { ans: `1) <b>Inline</b>: الـ style attribute على element واحد، <code>&lt;p style="color:red;"&gt;</code>؛ style خاص بالـ element ده بس. 2) <b>Internal (embedded)</b>: الـ &lt;style&gt; element جوه الـ &lt;head&gt;؛ rules للصفحة دي بس، زي <code>&lt;style&gt; h1 {color: blue;} &lt;/style&gt;</code>. 3) <b>External</b>: &lt;link rel="stylesheet" href="styles.css"&gt; في الـ head بتاع كل صفحة؛ file واحد .css (مفيهوش HTML) بيعمل style لصفحات كتير؛ وممكن يبقى URL كامل أو relative path. (L4)` },
    { ans: `الـ Element (type) selector: <code>p { }</code> بيختار كل الـ &lt;p&gt;. الـ ID selector: <code>#id1 { }</code> بيختار الـ element الوحيد اللي id="id1". الـ Class selector: <code>.c1 { }</code> بيختار كل الـ elements اللي class="c1" (و<code>p.c1</code> بيختار الـ &lt;p&gt; منهم بس). الـ Grouping selector: <code>h1, p { }</code> بيطبّق rule واحدة على كذا selector. الـ Universal selector: <code>* { }</code> بيختار كل الـ elements. وكمان فيه الـ descendant selectors (<code>li a</code>) والـ pseudo-classes (<code>a:hover</code>، <code>a:visited</code>، <code>tr:nth-child(even)</code>). (Lab 4 / L4)` },
    { ans: `الـ core (global) attributes اللي ينفع تتحط على تقريبًا أي element: <b>id</b> (identifier فريد، بيستخدمه الـ CSS في #id والـ getElementById)، <b>class</b> (اسم class أو أكتر بيشترك فيه كذا element، بيستخدمه الـ CSS في .class)، <b>style</b> (inline CSS، زي style="color:red;")، <b>title</b> (معلومة زيادة بتظهر كـ tooltip). وفيه attributes قريبة منهم من L2: <b>lang</b> (لغة المحتوى، زي lang="en-US"، بيساعد الـ search engines والـ browsers) و<b>dir</b> (اتجاه النص). أما الـ attributes الخاصة بـ elements معينة زي href وsrc وalt وwidth وheight فمش core attributes.` },
  ] },
  { items: [
    { ans: `<pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;
&lt;form&gt;
  Number1: &lt;input type="text" id="n1"&gt;&lt;br&gt;
  Number2: &lt;input type="text" id="n2"&gt;&lt;br&gt;
  &lt;input type="button" value="ADD" onclick="calc('+')"&gt;
  &lt;input type="button" value="SUB" onclick="calc('-')"&gt;
  &lt;input type="button" value="MUL" onclick="calc('*')"&gt;
  &lt;input type="button" value="DIV" onclick="calc('/')"&gt;
  &lt;input type="button" value="MOD" onclick="calc('%')"&gt;&lt;br&gt;
  Get Result : &lt;input type="text" id="res" readonly&gt;
&lt;/form&gt;
&lt;script&gt;
function calc(op) {
  let a = parseFloat(document.getElementById("n1").value);
  let b = parseFloat(document.getElementById("n2").value);
  let r;
  if (isNaN(a) || isNaN(b)) { r = "Enter two numbers"; }
  else {
    switch (op) {
      case '+': r = a + b; break;
      case '-': r = a - b; break;
      case '*': r = a * b; break;
      case '/': r = (b == 0) ? "Cannot divide by 0" : a / b; break;
      case '%': r = a % b; break;
    }
  }
  document.getElementById("res").value = r;
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>مثال: 17 و5 &rarr; ADD 22، SUB 12، MUL 85، DIV 3.4، MOD 2.` },
    { ans: `<pre>&lt;script&gt;
function fib(n) {                       // recursive definition
  if (n == 0) return 0;
  if (n == 1) return 1;
  return fib(n - 1) + fib(n - 2);
}
let N = parseInt(prompt("Number of terms:"));
let terms = [];
for (let i = 0; i &lt; N; i++) terms.push(fib(i));
document.write(terms.join(", "));       // N = 9: 0, 1, 1, 2, 3, 5, 8, 13, 21
&lt;/script&gt;</pre>الـ fib(n) = fib(n-1) + fib(n-2)، والـ base cases هي fib(0) = 0 وfib(1) = 1.` },
    { ans: `<pre>&lt;script&gt;
function isPrime(n) {
  if (n &lt; 2) return false;
  for (let d = 2; d * d &lt;= n; d++)
    if (n % d == 0) return false;
  return true;
}
for (let n = 0; n &lt;= 50; n++)
  if (isPrime(n)) document.write(n + " ");
// Output: 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47
&lt;/script&gt;</pre>الرقم يبقى prime لو كان 2 أو أكتر ومالوش أي قاسم من 2 لحد الجذر التربيعي بتاعه.` },
  ] },
] };



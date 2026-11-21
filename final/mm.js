// Final-exam revision for mm: every lecture, exam-focused summary in English and Egyptian Arabic per point. Merged by build.mjs.
window.FINAL = window.FINAL || {};
FINAL.mm = {
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
   "h": "Definitions: multimedia, hypertext, hypermedia, multimedia system",
   "ar_h": "التعريفات: الـ multimedia والـ hypertext والـ hypermedia والـ multimedia system",
   "pts": [
    [
     "<b>Multimedia</b> (computer-system definition): computer information can be represented through <b>audio, video and animation</b> in addition to traditional media (text, graphics/drawings, images).",
     "الـ <b>Multimedia</b> (من ناحية الـ computer system): معلومات الكمبيوتر ممكن تتمثّل بـ <b>audio وvideo وanimation</b> زيادة على الـ media التقليدية (الـ text، والـ <bdi dir=\"ltr\">graphics/drawings</bdi>، والـ images)."
    ],
    [
     "<b>General definition</b>: the field concerned with the <b>computer-controlled integration</b> of text, graphics, drawings, still and moving images, animation, audio and any other media, where every type of information can be <b>represented, stored, transmitted and processed digitally</b>.",
     "التعريف العام: هو المجال اللي بيهتم بـ <b>الـ integration اللي بيتحكم فيه الكمبيوتر</b> بين الـ text والـ graphics والـ drawings والصور الثابتة والمتحركة والـ animation والـ audio وأي media تانية، بحيث كل نوع معلومات <b>يتمثّل ويتخزن ويتبعت ويتعالج digitally</b>."
    ],
    [
     "<b>Multimedia application</b>: an application that uses a collection of multiple media sources (text, graphics, images, sound/audio, animation and/or video). <b>Multimedia system</b>: a system capable of processing multimedia data and applications; characterised by <b>processing, storage, generation, manipulation and rendition</b> of multimedia information.",
     "الـ <b>Multimedia application</b>: أي application بيستخدم مجموعة من مصادر media متعددة (text وgraphics وimages و<bdi dir=\"ltr\">sound/audio</bdi> وanimation و/أو video). والـ <b>Multimedia system</b> هو system يقدر يعالج multimedia data وapplications، وبيتميز بـ <b>الـ processing والـ storage والـ generation والـ manipulation والـ rendition</b> للمعلومات الـ multimedia."
    ],
    [
     "The <b>4 characteristics</b> of a multimedia system: (1) <b>computer controlled</b>; (2) <b>integrated</b>; (3) information represented <b>digitally</b>; (4) interface to the final presentation usually <b>interactive</b>. Trap: \"analog\" is never one of them.",
     "الـ <b>4 خصائص</b> بتوع الـ multimedia system هما: أولًا إنه <b>computer controlled</b>، وتانيًا إنه <b>integrated</b>، وتالتًا إن المعلومات بتتمثّل <b>digitally</b>، ورابعًا إن الـ interface للعرض النهائي غالبًا <b>interactive</b>. خد بالك: كلمة \"analog\" عمرها ما بتبقى منهم."
    ],
    [
     "<b>Hypertext</b>: text which contains <b>links to other texts</b>; term invented by <b>Ted Nelson around 1965</b>. Reading is <b>non-linear</b> (normal text is read linear): the reader clicks <b>hot spots</b> or uses \"overview\" mechanisms.",
     "الـ <b>Hypertext</b> هو text فيه <b>links لنصوص تانية</b>، والمصطلح اخترعه <b>Ted Nelson حوالي سنة 1965</b>. القراية فيه <b>non-linear</b> (الـ normal text بيتقري linear)، والقارئ بيدوس على <b>hot spots</b> أو بيستخدم آليات الـ \"overview\"."
    ],
    [
     "<b>Hypermedia</b>: not constrained to be text-based; includes graphics, images and especially <b>continuous media (sound and video)</b>. Examples: the <b>World Wide Web</b> (the clear example), PowerPoint, Adobe Acrobat, Adobe Flash.",
     "الـ <b>Hypermedia</b>: مش لازم يبقى text بس، وبيحتوي graphics وimages وخصوصًا <b>الـ continuous media (الصوت والـ video)</b>. أمثلة: الـ <b>World Wide Web</b> (المثال الواضح)، والـ PowerPoint، والـ Adobe Acrobat، والـ Adobe Flash."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Challenges, key issues, desirable features, components",
   "ar_h": "الـ Challenges والـ key issues والمميزات المطلوبة والـ components",
   "pts": [
    [
     "<b>Challenges</b>: two top-level ones, <b>distributed networks</b> and <b>temporal relationship between data</b>. Under the temporal relationship: render different data at the same time continuously; <b>sequencing within the media</b> (frames in the correct order/time); <b>synchronisation</b> = inter-media scheduling, e.g. <b>lip synchronisation</b> of video and audio.",
     "الـ <b>Challenges</b>: اتنين أساسيين، الـ <b>distributed networks</b> والـ <b>temporal relationship between data</b>. وتحت الـ temporal relationship: إنك تعرض data مختلفة في نفس الوقت وبشكل continuous؛ الـ <b>sequencing جوه الـ media</b> (الـ frames بالترتيب والتوقيت الصح)؛ والـ <b>synchronisation</b> يعني inter-media scheduling، زي الـ <b>lip synchronisation</b> بين الـ video والـ audio."
    ],
    [
     "<b>Key issues</b>: representing and storing temporal information; strictly maintaining temporal relationships on playback/retrieval; the processes involved; digital representation (<b>analog–digital conversion, sampling</b>); <b>large data requirements</b> (bandwidth, storage), so <b>data compression is usually mandatory</b>.",
     "الـ <b>Key issues</b>: إزاي نمثّل ونخزن المعلومات الزمنية؛ إزاي نحافظ بدقة على العلاقات الزمنية وقت الـ <bdi dir=\"ltr\">playback/retrieval</bdi>؛ الـ processes اللي داخلة؛ التمثيل الـ digital (<b>الـ analog–digital conversion والـ sampling</b>)؛ و<b>الـ data requirements الكبيرة</b> (الـ bandwidth والـ storage)، فـ <b>الـ data compression غالبًا إجباري</b>."
    ],
    [
     "<b>Desirable features</b> (if not a prerequisite): very high processing power; multimedia-capable file system (e.g. <b>RAID</b>); data representations (formats allowing real-time compression/decompression); efficient and high I/O (e.g. <b>direct-to-disk recording</b>); special operating system (real-time scheduling, fast interrupts, I/O streaming); storage and memory (hundreds of Tb, several Gb, large caches, high-speed buses); network support (client-server); software tools.",
     "الـ <b>Desirable features</b> (إن ما كانتش شرط أساسي): الـ processing power العالية جدًا؛ والـ multimedia-capable file system (زي <b>RAID</b>)؛ والـ data representations (formats بتسمح بـ <bdi dir=\"ltr\">compression/decompression</bdi> في real-time)؛ والـ <bdi dir=\"ltr\">I/O</bdi> الكفء والعالي (زي <b>الـ direct-to-disk recording</b>)؛ والـ operating system الخاص (الـ real-time scheduling، والـ fast interrupts، والـ <bdi dir=\"ltr\">I/O&nbsp;streaming</bdi>)؛ والـ storage والـ memory (مئات الـ Tb، وكذا Gb، وcaches كبيرة، وhigh-speed buses)؛ والـ network support (الـ client-server)؛ والـ software tools."
    ],
    [
     "<b>Components</b> (5 groups): <b>capture devices</b> (camera, microphone, graphics tablet, tactile sensors, VR devices, digitising hardware); <b>storage devices</b> (hard disks, CD-ROM, DVD-ROM); <b>communication networks</b> (local, intranets, Internet); <b>computer systems</b> (desktop machines, workstations, MPEG/VIDEO/DSP hardware); <b>display devices</b> (CD-quality speakers, HDTV, SVGA, hi-res monitors, colour printers).",
     "الـ <b>Components</b> (5 مجموعات): الـ <b>capture devices</b> (الكاميرا، والـ microphone، والـ graphics tablet، والـ tactile sensors، والـ VR devices، والـ digitising hardware)؛ والـ <b>storage devices</b> (الـ hard disks، والـ CD-ROM، والـ DVD-ROM)؛ والـ <b>communication networks</b> (الـ local، والـ intranets، والـ Internet)؛ والـ <b>computer systems</b> (الـ desktop machines، والـ workstations، والـ <bdi dir=\"ltr\">MPEG/VIDEO/DSP</bdi> hardware)؛ والـ <b>display devices</b> (الـ CD-quality speakers، والـ HDTV، والـ SVGA، والـ hi-res monitors، والـ colour printers)."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "Multimedia data sizes and compression",
   "ar_h": "أحجام الـ multimedia data والـ compression",
   "pts": [
    [
     "<b>Text</b>: 1 byte per character (more for Unicode); <b>not temporal</b> (but may have an implied sequence); size not significant. <b>Graphics</b>: built from <b>primitives</b> (lines, polygons, circles, curves, arcs), <b>editable</b>, small files; standards OpenGL, PHIGS, GKS. <b>Images</b>: bitmaps at <b>1 bit/pixel</b> (black and white), <b>8 bits/pixel</b> (grey scale, colour map), <b>24 bits/pixel</b> (true colour).",
     "الـ <b>Text</b>: كل حرف بـ <bdi dir=\"ltr\">1&nbsp;byte</bdi> (أكتر في الـ Unicode)، و<b>مش temporal</b> (بس ممكن يكون ليه sequence ضمني)، وحجمه مش مهم. الـ <b>Graphics</b>: متبنية من <b>primitives</b> (الـ lines والـ polygons والـ circles والـ curves والـ arcs)، و<b>ينفع تتعدل</b>، وملفاتها صغيرة، والـ standards هي الـ OpenGL والـ PHIGS والـ GKS. الـ <b>Images</b>: عبارة عن bitmaps بـ <bdi dir=\"ltr\">1&nbsp;bit/pixel</bdi> (أبيض وأسود)، أو <bdi dir=\"ltr\">8&nbsp;bits/pixel</bdi> (الـ grey scale أو الـ colour map)، أو <bdi dir=\"ltr\">24&nbsp;bits/pixel</bdi> (الـ true colour)."
    ],
    [
     "<b>Image size</b> = width × height × bytes per pixel. 512 × 512 grey (1 B/pixel) = 262,144 B = <b>1/4 MB</b>; 512 × 512 24-bit = <b>3/4 MB</b>; a 10+ megapixel camera image ≈ <b>29 MB</b> uncompressed.",
     "حجم الـ <b>Image</b> بيتحسب كده:<span class=\"ltr\">size = width × height × bytes per pixel</span>مثلًا الـ grey مقاس <bdi dir=\"ltr\">512&nbsp;×&nbsp;512</bdi> (<bdi dir=\"ltr\">1&nbsp;B</bdi> لكل pixel):<span class=\"ltr\">512 × 512 × 1 = 262,144 B = 1/4 MB</span>والـ <bdi dir=\"ltr\">24-bit</bdi> بنفس المقاس بتبقى <bdi dir=\"ltr\">3/4&nbsp;MB</bdi>، وصورة كاميرا <bdi dir=\"ltr\">10+&nbsp;megapixel</bdi> حوالي <bdi dir=\"ltr\">29&nbsp;MB</bdi> من غير compression."
    ],
    [
     "<b>Audio</b>: <b>CD quality = 16-bit at 44.1 kHz</b> (audiophile 24-bit, 96 kHz). Size = samples/s × bytes/sample × seconds × channels: 44,100 × 2 × 60 ≈ <b>5 MB</b> per minute mono, ≈ <b>10 MB</b> stereo.",
     "الـ <b>Audio</b>: الـ <b>CD quality</b> معناها <bdi dir=\"ltr\">16-bit</bdi> عند <bdi dir=\"ltr\">44.1&nbsp;kHz</bdi> (والـ audiophile <bdi dir=\"ltr\">24-bit</bdi> و<bdi dir=\"ltr\">96&nbsp;kHz</bdi>). الحجم بيتحسب كده:<span class=\"ltr\">size = samples/s × bytes/sample × seconds × channels</span><span class=\"ltr\">44,100 × 2 × 60 ≈ 5 MB (mono), ≈ 10 MB (stereo)</span>"
    ],
    [
     "<b>Video</b>: a series of images at <b>25, 30 or 50 fps</b>; data rate = frame size × fps. 512 × 512 mono: 25 × 0.25 = <b>6.25 MB/s</b>; PAL 720 × 576 colour ≈ 1.24 × 25 = <b>31 MB/s</b>; HD Blu-ray 1920 × 1080 (≈ 2 megapixels) ≈ 6.2 × 25 = <b>155 MB/s</b>.",
     "الـ <b>Video</b>: سلسلة صور بـ <bdi dir=\"ltr\">25,&nbsp;30&nbsp;or&nbsp;50&nbsp;fps</bdi>، والـ data rate بيتحسب كده:<span class=\"ltr\">rate = frame size × fps</span><span class=\"ltr\">512 × 512 mono: 25 × 0.25 = 6.25 MB/s</span><span class=\"ltr\">PAL 720 × 576 colour: ≈ 1.24 × 25 = 31 MB/s</span><span class=\"ltr\">HD Blu-ray 1920 × 1080 (≈ 2 Mpixel): ≈ 6.2 × 25 = 155 MB/s</span>"
    ],
    [
     "<b>Lossless</b> (zip, unix compress): zero error, high quality, low compression, <b>not good enough for MM data</b>. <b>Lossy</b>: throws away <b>perceptually less relevant</b> data (filtering): some error, lower quality, higher compression; e.g. <b>MP3, JPEG, MPEG</b> (trap: MPEG is lossy, not lossless). <b>Compression via synthesis</b>: encode how to make the data: vector graphics (Flash), MPEG video, MP4 audio, <b>MIDI</b>.",
     "الـ <b>Lossless</b> (زي الـ zip والـ unix compress) فيه zero error، وجودة عالية، وcompression قليل، و<b>مش كفاية للـ MM data</b>. الـ <b>Lossy</b>: بيرمي الـ data <b>الأقل أهمية للإدراك</b> (filtering): فيه شوية error، وجودة أقل، وcompression أعلى؛ زي الـ <b>MP3</b> والـ <b>JPEG</b> والـ <b>MPEG</b> (خد بالك: الـ MPEG ده lossy مش lossless). الـ <b>Compression via synthesis</b>: بنعمل encode لطريقة صناعة الـ data، زي الـ vector graphics (Flash)، والـ MPEG video، والـ MP4 audio، والـ <b>MIDI</b>."
    ]
   ]
  },
  {
   "lec": 1,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "True or False: \"A Multimedia Application is an application which uses a collection of multiple media sources\" → <b>True</b>; \"A Multimedia System is a system capable of processing multimedia data and applications\" → <b>True</b> (Final 2020/21, Final 2021/22 T1).",
     "صح ولا غلط: \"الـ Multimedia Application هو application بيستخدم مجموعة من مصادر media متعددة\" والإجابة <b>True</b>؛ و\"الـ Multimedia System هو system يقدر يعالج multimedia data وapplications\" والإجابة <b>True</b> <bdi dir=\"ltr\">(Final 2020/21, Final 2021/22 T1)</bdi>."
    ],
    [
     "Fill the blank: \"……… means that computer information can be represented through audio, video, and animation in addition to traditional media\" → <b>Multimedia</b> (Final 2021/22 T1).",
     "املا الفراغ: \"……… معناها إن معلومات الكمبيوتر ممكن تتمثّل بـ audio وvideo وanimation زيادة على الـ media التقليدية\"، والإجابة <b>Multimedia</b> <bdi dir=\"ltr\">(Final 2021/22 T1)</bdi>."
    ],
    [
     "Lossy vs lossless: \"MPEG video compression is a lossless compression\" → <b>False</b>; \"MP3 audio compression is a lossy compression\" → <b>True</b>; \"JPEG image compression is a ……… compression\" → <b>lossy</b> (Final 2020/21, Final 2021/22 T1).",
     "الـ lossy والـ lossless: جملة \"الـ MPEG video compression هو lossless\" إجابتها <b>False</b>؛ و\"الـ MP3 audio compression هو lossy\" إجابتها <b>True</b>؛ و\"الـ JPEG image compression هو ……… compression\" إجابتها <b>lossy</b> <bdi dir=\"ltr\">(Final 2020/21, Final 2021/22 T1)</bdi>."
    ],
    [
     "Written: \"What are the characteristics of a multimedia system?\" → the 4: <b>computer controlled, integrated, digital, usually interactive</b> (Final 2022/23 Summer). \"Discuss / what are the main challenges?\" → <b>distributed networks</b> and the <b>temporal relationship</b> (render together continuously, sequencing within the media, synchronisation such as lip sync) (Final 2022/23 Summer, Midterm #1).",
     "سؤال مقالي: \"إيه الـ characteristics بتاعة الـ multimedia system؟\" والإجابة الأربعة: <b>computer controlled وintegrated وdigital وغالبًا interactive</b> <bdi dir=\"ltr\">(Final 2022/23 Summer)</bdi>. و\"اتكلم عن الـ challenges / إيه أهم الـ challenges؟\" والإجابة: <b>الـ distributed networks</b> و<b>الـ temporal relationship</b> (الـ render مع بعض باستمرار، والـ sequencing جوه الـ media، والـ synchronisation زي الـ lip sync) <bdi dir=\"ltr\">(Final 2022/23 Summer, Midterm #1)</bdi>."
    ],
    [
     "Midterm 2026/27 (online MCQ and True/False, answers not yet confirmed by the doctors): \"Multi\" means <b>many</b>; \"multimedia is used only for entertainment\" → <b>False</b>; \"multimedia involves only audio and video\" → <b>False</b> (text, graphics and images too); interactivity means the <b>user has control over the content</b>; \"PowerPoint is multimedia presentation software\" → <b>True</b>.",
     "الـ Midterm بتاع <bdi dir=\"ltr\">2026/27</bdi> (MCQ وصح ولا غلط online، والإجابات لسه الدكاترة ما أكدوهاش): كلمة \"Multi\" معناها <b>many</b>؛ و\"الـ multimedia بتتستخدم للترفيه بس\" إجابتها <b>False</b>؛ و\"الـ multimedia فيها audio وvideo بس\" إجابتها <b>False</b> (فيها كمان الـ text والـ graphics والـ images)؛ والـ interactivity معناها إن <b>الـ user متحكم في الـ content</b>؛ و\"الـ PowerPoint برنامج multimedia presentation\" إجابتها <b>True</b>."
    ],
    [
     "Midterm 2026/27 (answers not yet confirmed by the doctors): an example multimedia application → <b>video conferencing</b>; NOT a multimedia component → <b>spreadsheet</b>; device that captures video → <b>webcam</b> (general knowledge: the notes list the video camera); reducing file size for storage or transmission → <b>compression</b>.",
     "الـ Midterm بتاع <bdi dir=\"ltr\">2026/27</bdi> (الإجابات لسه الدكاترة ما أكدوهاش): مثال multimedia application هو <b>video conferencing</b>؛ وحاجة مش multimedia component هي <b>spreadsheet</b>؛ والجهاز اللي بيلقط video هو <b>webcam</b> (معلومة عامة، والنوتس بتذكر الـ video camera)؛ وتقليل حجم الملف للتخزين أو الإرسال اسمه <b>compression</b>."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Sine waves, decibels and SNR",
   "ar_h": "الـ Sine waves والـ decibels والـ SNR",
   "pts": [
    [
     "<b>Frequency</b> = cycles per second in <b>Hz</b>; <b>period</b> T = 1/f (8 Hz → T = 0.125 s). <b>Wavelength</b> is <b>inversely proportional</b> to frequency.",
     "الـ <b>Frequency</b> هي عدد الـ cycles في الثانية بالـ <b>Hz</b>، والـ <b>period</b> بيتحسب كده:<span class=\"ltr\">T = 1/f, 8 Hz → T = 0.125 s</span>والـ <b>Wavelength</b> <b>بيتناسب عكسيًا</b> مع الـ frequency."
    ],
    [
     "Sampled sine: <b>y = A·sin(2π·n·F<sub>w</sub>/F<sub>s</sub>)</b> (A amplitude, F<sub>w</sub> wave frequency, F<sub>s</sub> sample frequency, n sample index; radians). Example F<sub>w</sub> = 1000, F<sub>s</sub> = 8000 → 8 samples per cycle; n = 1 → 0.7071A, n = 2 → A, n = 4 → 0.",
     "الـ sampled sine بتتكتب كده:<span class=\"ltr\"><b>y = A·sin(2π·n·F<sub>w</sub>/F<sub>s</sub>)</b></span>حيث الـ A هي الـ amplitude، والـ F<sub>w</sub> هي frequency الموجة، والـ F<sub>s</sub> هي الـ sample frequency، والـ n هو الـ sample index (بالـ radians). مثال:<span class=\"ltr\">F<sub>w</sub> = 1000, F<sub>s</sub> = 8000 → 8 samples per cycle</span><span class=\"ltr\">n = 1 → 0.7071A, n = 2 → A, n = 4 → 0</span>"
    ],
    [
     "A sine wave is described by <b>amplitude, frequency and phase</b>: z(t) = a·sin(ωt + φ). Changing the phase shifts the wave in time; a <b>cosine is a sine 90° out of phase</b>.",
     "الـ sine wave بتتوصف بـ <b>الـ amplitude والـ frequency والـ phase</b>:<span class=\"ltr\">z(t) = a·sin(ωt + φ)</span>تغيير الـ phase بيزحلق الموجة في الوقت؛ والـ <b>cosine هو sine متزاحة 90° في الـ phase</b>."
    ],
    [
     "<b>Decibel</b>: X<sub>dB</sub> = 10·log<sub>10</sub>(X/X<sub>0</sub>), same units; the reference is <b>0 dB</b>; X &gt; X<sub>0</sub> → positive, X &lt; X<sub>0</sub> → negative. Use <b>10·log for power, 20·log for amplitude</b>: power ratio 100 → 20 dB, amplitude ratio 100 → 40 dB, power ratio 2 → ≈ 3 dB.",
     "الـ <b>Decibel</b> بيتحسب كده (بنفس الوحدات):<span class=\"ltr\">X<sub>dB</sub> = 10·log<sub>10</sub>(X/X<sub>0</sub>)</span>والـ reference هو <b>0 dB</b>؛ لو الـ X أكبر من الـ X<sub>0</sub> تبقى موجبة، ولو أصغر تبقى سالبة. استخدم <b>الـ <bdi dir=\"ltr\">10·log</bdi> للـ power والـ <bdi dir=\"ltr\">20·log</bdi> للـ amplitude</b>:<span class=\"ltr\">power 100 → 20 dB, amplitude 100 → 40 dB, power 2 → ≈ 3 dB</span>"
    ],
    [
     "Ear: max/min power ratio ≈ 10<sup>12</sup> → <b>120 dB = threshold of pain</b>; 0 dB = threshold of perception; most sensitive at <b>2 to 4 kHz</b> (speech). <b>6 dB per bit</b> (10·log<sub>10</sub>4): 16-bit = 15 × 6 = <b>90 dB</b>, 8-bit = 7 × 6 = <b>42 dB</b>.",
     "الودن: نسبة أعلى لأقل power حوالي 10<sup>12</sup>، فـ <b>الـ <bdi dir=\"ltr\">120&nbsp;dB</bdi> هي الـ threshold of pain</b>، والـ <bdi dir=\"ltr\">0&nbsp;dB</bdi> هي الـ threshold of perception، وأكتر حساسية بين <b>2 و4 kHz</b> (الكلام). والـ <b>Digital noise</b> حوالي <bdi dir=\"ltr\">6&nbsp;dB</bdi> لكل bit:<span class=\"ltr\">16-bit: 15 × 6 = 90 dB, 8-bit: 7 × 6 = 42 dB</span>"
    ],
    [
     "<b>SNR</b> = power ratio between the <b>signal</b> (meaningful information) and background noise: P<sub>s</sub>/P<sub>n</sub> = (A<sub>s</sub>/A<sub>n</sub>)<sup>2</sup>; SNR<sub>dB</sub> = 10·log<sub>10</sub>(P<sub>s</sub>/P<sub>n</sub>) = 20·log<sub>10</sub>(A<sub>s</sub>/A<sub>n</sub>) (A = RMS amplitude).",
     "الـ <b>SNR</b> هي نسبة الـ power بين الـ <b>signal</b> (المعلومة المفيدة) والـ background noise:<span class=\"ltr\">SNR = P<sub>s</sub>/P<sub>n</sub> = (A<sub>s</sub>/A<sub>n</sub>)<sup>2</sup></span><span class=\"ltr\">SNR<sub>dB</sub> = 10·log<sub>10</sub>(P<sub>s</sub>/P<sub>n</sub>) = 20·log<sub>10</sub>(A<sub>s</sub>/A<sub>n</sub>)</span>حيث الـ A هي الـ RMS amplitude."
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Signal flow graphs, IIR and FIR filters",
   "ar_h": "الـ Signal flow graphs وفلاتر الـ IIR والـ FIR",
   "pts": [
    [
     "Three building blocks: <b>Delay</b> (block <b>T</b>: y(n) = x(n − 1); two in series → x(n − 2)), <b>Multiplication</b> (× circle: y(n) = a·x(n)), <b>Summation</b> (+ circle).",
     "فيه تلات building blocks: الـ <b>Delay</b> (block مكتوب عليه <b>T</b>)، والـ <b>Multiplication</b> (دايرة فيها ×)، والـ <b>Summation</b> (دايرة فيها +). المعادلات:<span class=\"ltr\">Delay: y(n) = x(n − 1); two T blocks → x(n − 2)</span><span class=\"ltr\">Multiply: y(n) = a·x(n)</span>"
    ],
    [
     "Trace method for y(n) = ½x(n) + ⅓x(n − 1) + ¼x(n − 2), input 2, 4, 6: y(0) = 1, y(1) = 2 + 0.667 = 2.667, y(2) = 3 + 1.333 + 0.5 = 4.833, y(3) = 2 + 1 = 3, y(4) = 1.5, then 0. Impulse response ½, ⅓, ¼, 0 … (finite).",
     "طريقة الـ trace للـ filter ده مع input <bdi dir=\"ltr\">2,&nbsp;4,&nbsp;6</bdi> بيطلع:<span class=\"ltr\">y(n) = ½x(n) + ⅓x(n − 1) + ¼x(n − 2)</span><span class=\"ltr\">y(0) = 1, y(1) = 2 + 0.667 = 2.667</span><span class=\"ltr\">y(2) = 3 + 1.333 + 0.5 = 4.833</span><span class=\"ltr\">y(3) = 2 + 1 = 3, y(4) = 1.5, then 0</span>والـ impulse response بتاعه <bdi dir=\"ltr\">½,&nbsp;⅓,&nbsp;¼,&nbsp;0&nbsp;…</bdi> (finite)."
    ],
    [
     "<b>Filtering</b> (broad sense) = select data to <b>remove</b> (low-pass, high-pass), <b>attenuate</b> (enhance/diminish: EQ, effects) or process otherwise; done in the <b>temporal domain</b> (impulse responses) or the <b>frequency domain</b>. Removal is essential in lossy formats (JPEG, MPEG).",
     "الـ <b>Filtering</b> (بالمعنى الواسع) إنك تختار data عشان <b>تشيلها</b> (الـ low-pass والـ high-pass)، أو <b>تعملها attenuate</b> (تقوّي أو تضعّف، زي الـ EQ والـ effects)، أو تعالجها بطريقة تانية؛ وبيتعمل في الـ <b>temporal domain</b> (بالـ impulse responses) أو في الـ <b>frequency domain</b>. والشيل أساسي في الـ lossy formats (الـ JPEG والـ MPEG)."
    ],
    [
     "<b>IIR</b>: output <b>fed back</b> through weighted delays → <b>recursive</b>: y(n) = x(n) − Σ a<sub>k</sub>·y(n − k). E.g. y(n) = x(n) + 0.5y(n − 1): impulse → 1, 0.5, 0.25, 0.125 … never exactly 0. <b>FIR</b>: <b>no feedback loop</b>, simpler; a more complete FIR has <b>N − 1 feed-forward delays</b>: y(n) = Σ b<sub>k</sub>·x(n − k).",
     "الـ <b>IIR</b>: الـ output <b>بيرجع (fed back)</b> عن طريق weighted delays، فهو <b>recursive</b>:<span class=\"ltr\">y(n) = x(n) − Σ a<sub>k</sub>·y(n − k)</span>مثلًا الـ impulse في الـ filter ده بيدّي <bdi dir=\"ltr\">1,&nbsp;0.5,&nbsp;0.25&nbsp;…</bdi> وعمره ما بيوصل صفر:<span class=\"ltr\">y(n) = x(n) + 0.5y(n − 1)</span>أما الـ <b>FIR</b> فـ <b>مفيهوش feedback loop</b> وأبسط، والـ FIR الأكمل محتاج <b><bdi dir=\"ltr\">N&nbsp;−&nbsp;1</bdi> feed-forward delays</b>:<span class=\"ltr\">y(n) = Σ b<sub>k</sub>·x(n − k)</span>"
    ],
    [
     "MATLAB <code>filter(B,A,X)</code>: <b>A = feedback</b> coefficients a<sub>k</sub>, <b>B = feed-forward</b> b<sub>k</sub>; if a(1) ≠ 1 coefficients are normalised by a(1); a(1) = 0 gives an error. Design functions: butter, buttord, besself, cheby1, cheby2, ellip.",
     "في MATLAB الـ <code>filter(B,A,X)</code>: الـ <b>A هي الـ feedback</b> coefficients والـ <b>B هي الـ feed-forward</b>؛ لو <bdi dir=\"ltr\">a(1)&nbsp;≠&nbsp;1</bdi> الـ coefficients بتتقسم على <bdi dir=\"ltr\">a(1)</bdi>، ولو <bdi dir=\"ltr\">a(1)&nbsp;=&nbsp;0</bdi> بيطلع error. والـ functions اللي بتصمم filters:<pre>butter, buttord, besself,\ncheby1, cheby2, ellip</pre>"
    ]
   ]
  },
  {
   "lec": 2,
   "h": "Fourier transform, frequency-domain filtering, convolution",
   "ar_h": "الـ Fourier transform والـ filtering في الـ frequency domain والـ convolution",
   "pts": [
    [
     "The <b>FT</b> moves a time/space description to the <b>frequency domain</b> (sinusoids of different frequency, amplitude, phase). An 8 Hz sine → one peak at 8 Hz. In images: large <b>high-frequency</b> components = rapid change over short distances (text, edges, noise); large <b>low-frequency</b> = large-scale features. A 200 Hz square(ish) wave = 200, 600, 1000 Hz … (odd multiples).",
     "الـ <b>FT</b> بيحوّل الوصف الزمني أو المكاني للـ <b>frequency domain</b> (sinusoids بـ frequency وamplitude وphase مختلفين). الـ sine بـ <bdi dir=\"ltr\">8&nbsp;Hz</bdi> بتدّي peak واحدة عند <bdi dir=\"ltr\">8&nbsp;Hz</bdi>. في الصور: الـ <b>high-frequency</b> components الكبيرة معناها تغيّر سريع على مسافات قصيرة (زي الـ text والـ edges والـ noise)؛ والـ <b>low-frequency</b> الكبيرة معناها features كبيرة مسيطرة. والـ square wave بـ <bdi dir=\"ltr\">200&nbsp;Hz</bdi> بتبقى <bdi dir=\"ltr\">200,&nbsp;600,&nbsp;1000&nbsp;Hz&nbsp;…</bdi> (المضاعفات الفردية)."
    ],
    [
     "<b>FT</b>: F(u) = ∫ f(x)e<sup>−2πixu</sup>dx (complex: magnitude and phase); <b>inverse</b> uses <b>+</b>. Top hat → <b>sinc</b> sin(2πu)/(πu), purely real because the top hat is <b>even</b>; peak 2 at u → 0. <b>DFT</b>: F(u) = (1/N) Σ f(x)e<sup>−2πixu/N</sup>; the 1/N in front is on the <b>forward</b> transform only. MATLAB: <code>fft</code> (1D, per column on a matrix), <code>fft2</code> (2D), <code>fftn</code>.",
     "الـ <b>FT</b> (بيطلع complex فيه magnitude وphase) والـ <b>inverse</b> بيستخدم إشارة <b>+</b>:<span class=\"ltr\">F(u) = ∫ f(x)e<sup>−2πixu</sup>dx</span>الـ top hat بيدّي الـ <b>sinc</b> وهي real بالكامل لأن الـ top hat <b>even</b>، وأعلى قيمة 2 عند <bdi dir=\"ltr\">u&nbsp;→&nbsp;0</bdi>، والقانون:<span class=\"ltr\">sin(2πu)/(πu)</span>والـ <b>DFT</b> فيه <bdi dir=\"ltr\">1/N</bdi> قدام الـ <b>forward</b> بس:<span class=\"ltr\">F(u) = (1/N) Σ f(x)e<sup>−2πixu/N</sup></span>وفي MATLAB الـ <code>fft</code> للـ 1D (لكل column في الـ matrix)، والـ <code>fft2</code> للـ 2D، والـ <code>fftn</code> للـ N-D."
    ],
    [
     "<b>Magnitude</b> |F| = √(F<sub>R</sub><sup>2</sup> + F<sub>I</sub><sup>2</sup>), <b>phase</b> φ = arctan(F<sub>I</sub>/F<sub>R</sub>): 3 + 4i → 5, 53.13°. <b>Bin → frequency</b>: f<sub>k</sub> = k·f<sub>s</sub>/N (8000 Hz, N = 256 → step 31.25 Hz, k = 32 → 1000 Hz). <b>Spectrogram</b> = windowed <b>STFT</b> (Blackman, Hamming, Hanning windows reduce leakage).",
     "الـ <b>Magnitude</b> والـ <b>phase</b>:<span class=\"ltr\">|F| = √(F<sub>R</sub><sup>2</sup> + F<sub>I</sub><sup>2</sup>), φ = arctan(F<sub>I</sub>/F<sub>R</sub>)</span><span class=\"ltr\">3 + 4i → |F| = 5, φ ≈ 53.13°</span>ومن الـ bin للـ frequency:<span class=\"ltr\">f<sub>k</sub> = k·f<sub>s</sub>/N; 8000 Hz, N = 256 → 31.25 Hz step, k = 32 → 1000 Hz</span>والـ <b>Spectrogram</b> هو <b>STFT</b> بـ window (الـ Blackman أو الـ Hamming أو الـ Hanning بيقللوا الـ leakage)."
    ],
    [
     "Frequency filtering: <b>G(u,v) = H(u,v)·F(u,v)</b>, then inverse FT. Noise = spurious high frequencies → <b>low-pass</b> reduces it. <b>Ideal low-pass</b>: keep √(u<sup>2</sup> + v<sup>2</sup>) ≤ w<sub>0</sub>; trap: edges are high frequency too, so a low cut-off <b>blurs</b> images and <b>muffles</b> audio. <b>Butterworth</b>: H = 1/(1 + [(u<sup>2</sup>+v<sup>2</sup>)/w<sub>0</sub><sup>2</sup>]<sup>n</sup>), smoothed top hat, less blurring; H = 1/2 at the cut-off. <b>High-pass = 1 − H</b>; band-pass, band-reject, <b>notch</b> (attenuate narrow band), <b>resonator</b> (amplify narrow band).",
     "الـ filtering في الـ frequency domain:<span class=\"ltr\">G(u,v) = H(u,v)·F(u,v) → inverse FT</span>الـ noise عبارة عن high frequencies مش حقيقية، فالـ <b>low-pass</b> بيقلله. الـ <b>Ideal low-pass</b> بيحتفظ بالنقط اللي:<span class=\"ltr\">√(u<sup>2</sup> + v<sup>2</sup>) ≤ w<sub>0</sub></span>وخد بالك إن الـ edges كمان high frequency، فالـ cut-off الواطي بيعمل <b>blur</b> للصور وبيخلي الصوت <b>muffled</b>. والـ <b>Butterworth</b> (top hat ناعم، blur أقل، و<bdi dir=\"ltr\">H&nbsp;=&nbsp;1/2</bdi> عند الـ cut-off):<span class=\"ltr\">H = 1/(1 + [(u<sup>2</sup>+v<sup>2</sup>)/w<sub>0</sub><sup>2</sup>]<sup>n</sup>)</span>والـ <b>High-pass</b> هو <bdi dir=\"ltr\">1&nbsp;−&nbsp;H</bdi>؛ وفيه كمان الـ band-pass، والـ band-reject، والـ <b>notch</b> (بيضعّف band ضيق)، والـ <b>resonator</b> (بيقوّي band ضيق)."
    ],
    [
     "<b>Convolution theorem</b>: FT of f * g = <b>F(u)·G(u)</b>. Apply an effect (reverb) by <b>multiplying</b>; remove it (<b>deconvolution</b>) by <b>dividing</b> (G./H), then inverse FT. In practice H is unknown and noise is amplified, so deconvolution is not that simple. Convolution value = <b>area of overlap</b> (top hat * ½ box: (x + 1)/2 on [−1, 0], ½ on [0, 1], 1 − x/2 on [1, 2]).",
     "الـ <b>Convolution theorem</b>:<span class=\"ltr\">FT(f * g) = F(u)·G(u)</span>عشان تطبق effect (زي الـ reverb) <b>بتضرب</b>، وعشان تشيله (<b>الـ deconvolution</b>) <b>بتقسم</b> وبعدين inverse FT:<span class=\"ltr\">Ghigh = G./H</span>وفي الواقع الـ H مش معروفة والـ noise بيتضخّم، فالـ deconvolution مش بالبساطة دي. وقيمة الـ convolution هي <b>مساحة التداخل</b>، ومثال الـ top hat مع box بـ ½:<span class=\"ltr\">(x + 1)/2 on [−1, 0]; ½ on [0, 1]; 1 − x/2 on [1, 2]</span>"
    ]
   ]
  },
  {
   "lec": 2,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "MCQ: \"The threshold for pain to the human ear is ---- dB\" → <b>120</b> (Final 2020/21, Final 2021/22 T1).",
     "سؤال MCQ: \"الـ threshold of pain للودن البشرية ---- dB\" والإجابة <b>120</b> <bdi dir=\"ltr\">(Final 2020/21, Final 2021/22 T1)</bdi>."
    ],
    [
     "Fill the blank: \"dB is commonly used to quantify sound levels relative to some ……… dB reference\" → <b>0</b>; the True/False version with \"10 dB\" (Final 2020/21) or \"60 dB\" (Final 2021/22 T1) → <b>False</b>.",
     "املا الفراغ: \"الـ dB بيتستخدم لقياس مستوى الصوت بالنسبة لـ reference قيمته ……… dB\"، والإجابة <b>0</b>؛ ونسخة صح ولا غلط بـ <bdi dir=\"ltr\">10 dB</bdi> <bdi dir=\"ltr\">(Final 2020/21)</bdi> أو <bdi dir=\"ltr\">60 dB</bdi> <bdi dir=\"ltr\">(Final 2021/22 T1)</bdi> إجابتها <b>False</b>."
    ],
    [
     "Phase: \"……… is the offset from the origin where waveform intersects the x-axis\" → <b>Phase</b>; the same with the <b>y-axis</b> → <b>None of the above</b>; \"Phase is the initial angle of a sinusoidal function at its origin\" → <b>True</b>, and its negation \"is not\" → <b>False</b> (Final 2020/21, Final 2021/22 T1).",
     "الـ Phase: \"……… هي الـ offset من الـ origin اللي الموجة بتقطع عنده محور x\" والإجابة <b>Phase</b>؛ ونفس الجملة بمحور <b>y</b> إجابتها <b>None of the above</b>؛ و\"الـ Phase هي الزاوية الابتدائية للـ sinusoidal function عند الـ origin\" إجابتها <b>True</b>، ونفيها \"مش هي\" إجابته <b>False</b> <bdi dir=\"ltr\">(Final 2020/21, Final 2021/22 T1)</bdi>."
    ],
    [
     "Computing the phase (Midterm 2021/22): Y(t) = A cos(1500πt + 0.2π) − B sin(2500πt + 0.25π) → read the constant in each bracket: <b>0.2π = 36°</b> and <b>0.25π = 45°</b>. Final 2021/22 T2 has no constants, so each phase is 0 as written (or 90° for a cos and 180° for a minus sign when rewritten as a·sin(ωt + φ), since a cosine is a sine 90° out of phase). Say which form you use.",
     "حساب الـ phase <bdi dir=\"ltr\">(Midterm 2021/22)</bdi>: الإشارة<span class=\"ltr\">Y(t) = A cos(1500πt + 0.2π) − B sin(2500πt + 0.25π)</span>اقرا الثابت اللي جوه كل قوس:<span class=\"ltr\">0.2π = 36° ,  0.25π = 45°</span>وفي <bdi dir=\"ltr\">Final 2021/22 T2</bdi> مفيش ثوابت، فكل phase بـ 0 زي ما هي مكتوبة (أو <bdi dir=\"ltr\">90°</bdi> للـ cos و<bdi dir=\"ltr\">180°</bdi> لعلامة السالب لو كتبتها على شكل <bdi dir=\"ltr\">a·sin(ωt + φ)</bdi>، لإن الـ cosine هو sine متأخر <bdi dir=\"ltr\">90°</bdi>). قول إنت شغال بأنهي شكل."
    ],
    [
     "IIR/FIR True/False: \"In FIR systems there is no feedback loop\" → <b>True</b>; \"In IIR systems there is no feedback loop\" → <b>False</b>; \"To develop a more complete FIR system we need to add N − 1 feed-forward delays\" → <b>True</b> (Final 2020/21).",
     "صح ولا غلط عن الـ IIR والـ FIR: \"الـ FIR مفيهوش feedback loop\" إجابتها <b>True</b>؛ و\"الـ IIR مفيهوش feedback loop\" إجابتها <b>False</b>؛ و\"عشان تعمل FIR أكمل محتاج تضيف <bdi dir=\"ltr\">N − 1</bdi> feed-forward delays\" إجابتها <b>True</b> <bdi dir=\"ltr\">(Final 2020/21)</bdi>."
    ],
    [
     "Fill the blank: \"Signal-to-noise ratio is a term for the power ratio between a ……… (meaningful information) and the background noise\" → <b>Signal</b> (Final 2020/21). The written image problems also ask for an SNR: 10·log<sub>10</sub>(ΣI² / Σ(I − I″)²) = −2.83 dB (Final 2020/21) and 0.29 dB (Final 2021/22 T1); this image form applies the SNR definition and is not on the slides ‡.",
     "املا الفراغ: \"الـ Signal-to-noise ratio هي نسبة الـ power بين ……… (المعلومة المفيدة) والـ background noise\"، والإجابة <b>Signal</b> <bdi dir=\"ltr\">(Final 2020/21)</bdi>. ومسائل الصور المقالية بتطلب SNR كمان:<span class=\"ltr\">SNR = 10·log10( ΣI² / Σ(I − I″)² )</span>وطلعت <bdi dir=\"ltr\">−2.83 dB</bdi> في <bdi dir=\"ltr\">Final 2020/21</bdi> و<bdi dir=\"ltr\">0.29 dB</bdi> في <bdi dir=\"ltr\">Final 2021/22 T1</bdi>؛ والشكل ده للصور تطبيق لتعريف الـ SNR ومش موجود في السلايدز ‡."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Media types, signals and the A-D-A pipeline",
   "ar_h": "أنواع الـ media والـ signals والـ A-D-A pipeline",
   "pts": [
    [
     "Multimedia systems deal with the <b>generation, manipulation, storage, presentation and communication</b> of data. All data must be <b>digital</b>; it is usually <b>large</b> and has <b>temporal relationships</b>, so media may need <b>synchronisation</b>.",
     "الـ multimedia systems بتتعامل مع <b>الـ generation والـ manipulation والـ storage والـ presentation والـ communication</b> للـ data. كل الـ data لازم تبقى <b>digital</b>؛ وغالبًا <b>حجمها كبير</b> وفيها <b>temporal relationships</b>، فالـ media ممكن تحتاج <b>synchronisation</b>."
    ],
    [
     "<b>Static / discrete media</b> = <b>time independent</b> (text, single images, graphics). <b>Continuous media</b> = <b>time dependent</b> (video, animation, audio). Trap: animation is continuous even though it is made of graphics.",
     "الـ <b><bdi dir=\"ltr\">Static / discrete</bdi> media</b> يعني <b>time independent</b> (الـ text، والصورة الواحدة، والـ graphics). والـ <b>Continuous media</b> يعني <b>time dependent</b> (الـ video والـ animation والـ audio). فخ: الـ animation تعتبر continuous مع إنها معمولة من graphics."
    ],
    [
     "<b>Analog</b> = continuous, must be digitised; <b>digital</b> = discrete. <b>Transducers</b> turn what they sense into electrical signals: thermocouple (temperature), microphone (acoustic), camera (light).",
     "الـ <b>Analog</b> يعني continuous ولازم يتعمله digitise؛ والـ <b>digital</b> يعني discrete. الـ <b>Transducers</b> بتحوّل اللي بتحسه لـ electrical signals: الـ thermocouple للحرارة، والـ microphone للصوت، والكاميرا للضوء."
    ],
    [
     "<b>ADC</b> samples an analog sensor signal into digital (e.g. a <b>sound card</b>). <b>DAC</b> is the converse, for <b>playback</b> to a loudspeaker or RGB monitor. <b>Digital = sampling</b> (discrete in time) <b>+ quantisation</b> (discrete values).",
     "الـ <b>ADC</b> بيعمل sampling للـ analog signal ويحولها digital (زي الـ <b>sound card</b>). والـ <b>DAC</b> العكس، للـ <b>playback</b> على loudspeaker أو RGB monitor. والقاعدة:<span class=\"ltr\">Digital = sampling + quantisation</span>يعني الـ sampling بيخليها discrete في الزمن، والـ quantisation بيخلي القيم discrete."
    ],
    [
     "Pipeline: <b>Analog conditioning → ADC → Digital processing → DAC → Analog conditioning</b>. The <b>anti-aliasing filter</b> is at the <b>input</b> (removes frequencies above the sampling limit); a <b>low-pass filter</b> at the output removes the aliases (images).",
     "الـ Pipeline بالترتيب:<span class=\"ltr\">Analog conditioning → ADC → Digital processing → DAC → Analog conditioning</span>الـ <b>anti-aliasing filter</b> عند الـ <b>input</b> (بيشيل الـ frequencies اللي فوق حد الـ sampling)؛ والـ <b>low-pass filter</b> عند الـ output بيشيل الـ aliases (images)."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "Each medium and its size",
   "ar_h": "كل medium وحجمه",
   "pts": [
    [
     "<b>Text</b>: 1 byte per character (ASCII), more for Unicode; not temporal, size not significant. Text, graphics and some images are made directly in binary, so <b>no digitising</b>. Printed text → <b>OCR</b>; printed images → flatbed scan.",
     "الـ <b>Text</b>: <bdi dir=\"ltr\">1&nbsp;byte</bdi> لكل حرف في الـ ASCII، وأكتر في الـ Unicode؛ مش temporal والحجم مش مهم. الـ text والـ graphics وبعض الـ images بتتعمل binary على طول، فـ<b>مش محتاجة digitising</b>. الـ text المطبوع بيتعمله <b>OCR</b>؛ والصور المطبوعة بتتعمل flatbed scan."
    ],
    [
     "<b>Graphics</b>: primitives (lines, polygons, circles, curves, arcs), <b>selectable and editable</b> (unlike images), low storage; standard <b>OpenGL</b>. <b>Animation</b>: 2D Flash uses key-frame interpolation = <b>tweening</b>; 3D Maya; compact, so good for networks.",
     "الـ <b>Graphics</b>: متكونة من primitives (الـ lines والـ polygons والـ circles والـ curves والـ arcs)، و<b>ينفع تتختار وتتعدل</b> عكس الـ images، والـ storage قليل؛ والـ standard هو <b>OpenGL</b>. الـ <b>Animation</b>: في الـ 2D (Flash) بنستخدم key-frame interpolation اسمه <b>tweening</b>؛ وفي الـ 3D فيه Maya؛ وهي compact فمناسبة للـ network."
    ],
    [
     "<b>Images</b>: 1 bit/pixel (B/W), 8 bits (grey, colour map), 24 bits (true colour). Size = width × height × bits / 8: 512×512 grey = 1/4 MB, 24-bit = 3/4 MB; 10 MP photo = 30,000,000 B ≈ 29 MB (1 MB = 1,048,576 B).",
     "الـ <b>Images</b>: <bdi dir=\"ltr\">1&nbsp;bit/pixel</bdi> للـ <bdi dir=\"ltr\">B/W</bdi>، و<bdi dir=\"ltr\">8&nbsp;bits</bdi> للـ grey أو الـ colour map، و<bdi dir=\"ltr\">24&nbsp;bits</bdi> للـ true colour. الحجم:<span class=\"ltr\">size = width × height × bits / 8</span>مثلًا:<span class=\"ltr\">512×512 grey = 1/4 MB, 24-bit = 3/4 MB</span><span class=\"ltr\">10 MP × 3 B = 30,000,000 B ≈ 29 MB</span>وده لو اعتبرنا <bdi dir=\"ltr\">1&nbsp;MB&nbsp;=&nbsp;1,048,576&nbsp;B</bdi>."
    ],
    [
     "<b>Audio</b>: CD = <b>16-bit at 44.1 kHz</b> (audiophile 24-bit, 96 kHz). Size (bits) = rate × bits × channels × s: 1 min mono CD = 44,100 × 16 × 1 × 60 = 42,336,000 bits = 5,292,000 B ≈ 5 MB; stereo ≈ 10 MB.",
     "الـ <b>Audio</b>: الـ CD معناه <b><bdi dir=\"ltr\">16-bit</bdi> عند <bdi dir=\"ltr\">44.1&nbsp;kHz</bdi></b> (والـ audiophile <bdi dir=\"ltr\">24-bit</bdi> و<bdi dir=\"ltr\">96&nbsp;kHz</bdi>). الحجم بالـ bits:<span class=\"ltr\">rate × bits × channels × seconds</span>مثال دقيقة mono CD:<span class=\"ltr\">44,100 × 16 × 1 × 60 = 42,336,000 bits = 5,292,000 B ≈ 5 MB</span>والـ stereo حوالي <bdi dir=\"ltr\">10&nbsp;MB</bdi>."
    ],
    [
     "<b>Video</b> = images at <b>25, 30 or 50 fps</b>; rate = frame size × fps. 512×512 mono: 25 × 0.25 = 6.25 MB/s; PAL 720×576 colour ≈ 1.2 × 25 = 30 MB/s; HD 1920×1080 ≈ 6 × 25 = 150 MB/s ≈ <b>9 GB per minute</b>.",
     "الـ <b>Video</b> عبارة عن صور بـ <b>25 أو 30 أو <bdi dir=\"ltr\">50&nbsp;fps</bdi></b>، والـ rate بيساوي:<span class=\"ltr\">frame size × fps</span>أمثلة في الثانية:<span class=\"ltr\">512×512 mono: 25 × 0.25 = 6.25 MB</span><span class=\"ltr\">PAL 720×576 colour: ≈ 1.2 × 25 = 30 MB</span><span class=\"ltr\">HD 1920×1080: ≈ 6 × 25 = 150 MB</span>يعني حوالي <b><bdi dir=\"ltr\">9&nbsp;GB</bdi> في الدقيقة</b>."
    ]
   ]
  },
  {
   "lec": 3,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "No quiz question on the site is filed under this lecture (Midterm 2026/27 covered Lectures 1 and 4 only). But the finals' <b>video-file</b> problems use this lecture's rule: frame = W × H × bits per pixel (grey <b>8</b>, colour <b>24</b>), video = frame × fps × seconds, and <b>total = video stream + audio stream</b> (audio from Lecture 4).",
     "مفيش سؤال quiz على الموقع متسجل للمحاضرة دي (الـ Midterm بتاع <bdi dir=\"ltr\">2026/27</bdi> جه من المحاضرة 1 و4 بس). بس مسائل <b>ملف الـ video</b> في الـ finals بتستخدم قاعدة المحاضرة دي:<span class=\"ltr\">frame = W × H × bits per pixel</span><span class=\"ltr\">video = frame × fps × seconds</span><span class=\"ltr\">total = video stream + audio stream</span>والـ grey بـ <b>8</b> bits والـ colour بـ <b>24</b>، والـ audio من المحاضرة 4."
    ],
    [
     "Midterm #1: 3 h, 1600 × 800 colour, <b>29 fps</b>, stereo audio: video = 1600 × 800 × 24 × 29 × 10,800 = <b>9,621,504,000,000 bits</b>; audio = 10,800 × 44,100 × Q × 2 = 952,560,000·Q bits (sample size Q not given); then the compression ratio to 3 MB.",
     "في <bdi dir=\"ltr\">Midterm #1</bdi>: مدة <bdi dir=\"ltr\">3 h</bdi> وصور <bdi dir=\"ltr\">1600 × 800</bdi> colour و<b><bdi dir=\"ltr\">29 fps</bdi></b> وaudio stereo، والحل:<span class=\"ltr\">video = 1600 × 800 × 24 × 29 × 10,800 = 9,621,504,000,000 bits</span><span class=\"ltr\">audio = 10,800 × 44,100 × Q × 2 = 952,560,000·Q bits</span>لإن الـ sample size (Q) مش مدّيهولك؛ وبعدها الـ compression ratio لـ <bdi dir=\"ltr\">3 MB</bdi>."
    ],
    [
     "Final 2023/24: 10 h, 1600 × 800 colour, fps not given: video = 1600 × 800 × 24 × FPS × 36,000 = 1,105,920,000,000·FPS bits; (a) mono speech adds 8000 × Q × 36,000 = 288,000,000·Q bits; (b) stereo music adds 44,100 × Q × 2 × 36,000 = 3,175,200,000·Q bits.",
     "في <bdi dir=\"ltr\">Final 2023/24</bdi>: مدة <bdi dir=\"ltr\">10 h</bdi> وصور <bdi dir=\"ltr\">1600 × 800</bdi> colour، والـ fps مش مدّيهولك:<span class=\"ltr\">video = 1600 × 800 × 24 × FPS × 36,000 = 1,105,920,000,000·FPS bits</span>الجزء (a) فيه mono speech:<span class=\"ltr\">8000 × Q × 36,000 = 288,000,000·Q bits</span>والجزء (b) فيه stereo music:<span class=\"ltr\">44,100 × Q × 2 × 36,000 = 3,175,200,000·Q bits</span>"
    ],
    [
     "Final 2022/23 T2: 4 h, 600 × 800 <b>grey-scale</b> (8 bits), stereo speech: total = 55,296,000,000·FPS + 230,400,000·Q bits; then the compression ratio to 1000 KB (convert both to bits first). Trap: keep a missing fps or sample size as a variable, and state any example value you plug in (the site's answers use 25 fps and 16 bits).",
     "في <bdi dir=\"ltr\">Final 2022/23 T2</bdi>: مدة <bdi dir=\"ltr\">4 h</bdi> وصور <bdi dir=\"ltr\">600 × 800</bdi> <b>grey-scale</b> (يعني <bdi dir=\"ltr\">8 bits</bdi>) وstereo speech:<span class=\"ltr\">total = 55,296,000,000·FPS + 230,400,000·Q bits</span>وبعدها الـ compression ratio لـ <bdi dir=\"ltr\">1000 KB</bdi> (حوّل الاتنين لـ bits الأول). الفخ: لو الـ fps أو الـ sample size ناقصين سيبهم variable، وقول أي قيمة مثال بتعوّض بيها (إجابات الموقع بتستخدم <bdi dir=\"ltr\">25 fps</bdi> و<bdi dir=\"ltr\">16 bits</bdi>)."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Sampling and quantisation",
   "ar_h": "الـ Sampling والـ quantisation",
   "pts": [
    [
     "<b>Sampling</b> = measuring the analog signal at <b>regular discrete intervals</b> (sampling interval T) and recording the values; done by an ADC, e.g. a <b>sound card</b> (digital sampling).",
     "الـ <b>Sampling</b> إننا نقيس الـ analog signal على <b>فترات discrete منتظمة</b> (الـ sampling interval T) ونسجل القيم؛ وبيعمله ADC زي الـ <b>sound card</b> (وده الـ digital sampling)."
    ],
    [
     "<b>Sample rate</b> = samples per second, unit <b>Hertz (Hz)</b>; <b>fs = 1 / T</b>. Rates: <b>8 kHz</b> telephone, <b>11.025 kHz</b> speech, <b>22.05 kHz</b> low-grade (WWW, AM radio), <b>44.1 kHz</b> CD. E.g. T = 0.000125 s → fs = 8000 Hz.",
     "الـ <b>Sample rate</b> هو عدد الـ samples في الثانية، ووحدته <b>Hertz (Hz)</b>، والقانون:<span class=\"ltr\">fs = 1 / T</span>الـ rates: <bdi dir=\"ltr\">8&nbsp;kHz</bdi> للتليفون، و<bdi dir=\"ltr\">11.025&nbsp;kHz</bdi> للـ speech، و<bdi dir=\"ltr\">22.05&nbsp;kHz</bdi> للجودة الضعيفة (WWW وراديو AM)، و<bdi dir=\"ltr\">44.1&nbsp;kHz</bdi> للـ CD. مثال:<span class=\"ltr\">T = 0.000125 s → fs = 8000 Hz</span>"
    ],
    [
     "<b>Bit size = quantisation</b>: levels = 2<sup>bits</sup>; 8-bit: 0–255, 16-bit: 0–65535. SNR: <b>16-bit 98 dB</b>, <b>8-bit 50 dB</b> (8-bit roughly 8 times as noisy); <b>6 dB = twice as loud</b>; dB is logarithmic because ears are not linear.",
     "الـ <b>Bit size</b> هو الـ <b>quantisation</b>، وعدد الـ levels:<span class=\"ltr\">levels = 2^bits; 8-bit: 0–255, 16-bit: 0–65535</span>الـ SNR للـ <bdi dir=\"ltr\">16-bit</bdi> هو <b><bdi dir=\"ltr\">98&nbsp;dB</bdi></b> وللـ <bdi dir=\"ltr\">8-bit</bdi> هو <b><bdi dir=\"ltr\">50&nbsp;dB</bdi></b> (يعني الـ <bdi dir=\"ltr\">8-bit</bdi> noisy أكتر بحوالي 8 مرات)؛ وزيادة <b><bdi dir=\"ltr\">6&nbsp;dB</bdi> يعني الصوت أعلى بالضعف</b>؛ وبنستخدم الـ dB لأنه logarithmic والودان مش linear."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Nyquist and aliasing",
   "ar_h": "نظرية Nyquist والـ aliasing",
   "pts": [
    [
     "<b>Nyquist's theorem</b>: fs must be <b>at least twice the highest</b> frequency: <b>fs ≥ 2·fmax</b>. <b>Nyquist rate</b> = 2·fmax (minimum fs); <b>Nyquist frequency</b> = fs / 2 (highest representable, 44.1 kHz → 22.05 kHz). Traps: \"at most\" and \"lowest\" are False; a minimum frequency alone gives \"None\".",
     "الـ <b>Nyquist's theorem</b>: الـ fs لازم تكون <b>على الأقل ضعف أعلى</b> frequency:<span class=\"ltr\">fs ≥ 2·fmax</span>الـ <b>Nyquist rate</b> هو <bdi dir=\"ltr\">2·fmax</bdi> (أقل fs)، والـ <b>Nyquist frequency</b> هي <bdi dir=\"ltr\">fs&nbsp;/&nbsp;2</bdi> (أعلى frequency تتمثل)، مثلًا:<span class=\"ltr\">44.1 kHz → 22.05 kHz</span>فخاخ: كلمة \"at most\" وكلمة \"lowest\" غلط؛ ولو مدّيك أقل frequency بس الإجابة \"None\"."
    ],
    [
     "<b>Signal formula method</b>: each term is cos/sin(2πf·t), so f = (coefficient of t) / 2π. Take fmax, fs = 2·fmax, limiting interval T = 1/fs. Lecture: 200πt → 100 Hz, 100πt → 50 Hz; fs ≥ 200 Hz; T ≤ <b>0.005 s</b>.",
     "طريقة الـ <b>signal formula</b>: كل term شكله <bdi dir=\"ltr\">cos/sin(2πf·t)</bdi>، فالـ f بتساوي معامل الـ t على 2π. هات الـ fmax، وبعدين:<span class=\"ltr\">fs = 2·fmax, T = 1/fs</span>مثال المحاضرة:<span class=\"ltr\">200πt → 100 Hz, 100πt → 50 Hz</span><span class=\"ltr\">fs ≥ 200 Hz → T ≤ 0.005 s</span>"
    ],
    [
     "<b>Undersampling</b> → <b>aliasing</b> (a false lower frequency; affects audio, images and video). <b>Oversampling</b> (above Nyquist rate) reduces aliasing but costs more data. So <b>low-pass filter before the A/D converter</b>. Slides: sampling at the signal frequency loses the sine; at twice it, peaks give a triangle wave, zero crossings give zeros.",
     "الـ <b>Undersampling</b> بيعمل <b>aliasing</b> (frequency وهمية أوطى؛ وبيأثر على الـ audio والصور والـ video). والـ <b>Oversampling</b> (فوق الـ Nyquist rate) بيقلل الـ aliasing بس بيكلّف data أكتر. عشان كده <b>الـ low-pass filter قبل الـ <bdi dir=\"ltr\">A/D</bdi> converter</b>. في السلايدز: الـ sampling بنفس frequency الإشارة بيضيّع الـ sine؛ وبالضعف لو على القمم يطلع triangle wave، ولو على نقط الصفر يطلع أصفار."
    ],
    [
     "<b>CD = 44.1 kHz</b> because hearing reaches about 20–22 kHz: 2 × 22.05 = 44.1 kHz. Course constants: <b>music fs = 44.1 kHz</b> (T ≈ 0.0000227 s), <b>speech fmax = 4 kHz → fs = 8 kHz</b> (T = 0.000125 s).",
     "الـ <b>CD</b> بيستخدم <b><bdi dir=\"ltr\">44.1&nbsp;kHz</bdi></b> لأن السمع بيوصل لحوالي <bdi dir=\"ltr\">20–22&nbsp;kHz</bdi>، فـ:<span class=\"ltr\">2 × 22.05 = 44.1 kHz</span>ثوابت الكورس للـ music:<span class=\"ltr\">fs = 44.1 kHz, T ≈ 0.0000227 s</span>وللـ speech:<span class=\"ltr\">fmax = 4 kHz → fs = 8 kHz, T = 0.000125 s</span>"
    ]
   ]
  },
  {
   "lec": 4,
   "h": "Audio file size, formats and synthesis",
   "ar_h": "حجم ملف الـ audio والـ formats والـ synthesis",
   "pts": [
    [
     "<b>Size (bits) = time (s) × sample rate (Hz) × sample size (bits) × channels</b>; ÷8 → bytes, ÷1024 → KB, ÷1024 → MB. Mono = 1, stereo = 2. Convert minutes/hours to seconds; interval given → fs = 1/T; nothing given → 8 kHz speech or 44.1 kHz audio.",
     "القانون:<span class=\"ltr\">size (bits) = time (s) × fs (Hz) × bits × channels</span>اقسم على 8 للـ bytes، وعلى 1024 للـ KB، وعلى 1024 تاني للـ MB. الـ mono بيساوي <bdi dir=\"ltr\">1&nbsp;channel</bdi> والـ stereo <bdi dir=\"ltr\">2&nbsp;channels</bdi>. حوّل الدقايق والساعات لثواني؛ ولو الـ interval موجود هات الـ fs منه؛ ولو مفيش حاجة استخدم <bdi dir=\"ltr\">8&nbsp;kHz</bdi> للـ speech أو <bdi dir=\"ltr\">44.1&nbsp;kHz</bdi> للـ audio."
    ],
    [
     "Worked (Ex 2): T = 0.000125 s → fs = 8000 Hz; 4.5 min = 270 s; stereo, 16-bit: 8000 × 16 × 270 × 2 = 69,120,000 bits = 8,640,000 B = 8437.5 KB. Higher rate or bits = better quality but <b>bigger files</b> (1 min 16-bit stereo 44.1 kHz = 10.1 MB; 8-bit mono 11.025 kHz = 630 KB).",
     "مثال 2: الـ interval <bdi dir=\"ltr\">0.000125&nbsp;s</bdi> و<bdi dir=\"ltr\">4.5&nbsp;min</bdi> و<bdi dir=\"ltr\">16-bit</bdi> و stereo، والحل:<span class=\"ltr\">fs = 8000 Hz, t = 270 s</span><span class=\"ltr\">8000 × 16 × 270 × 2 = 69,120,000 bits = 8,640,000 B = 8437.5 KB</span>الـ rate أو الـ bits الأعلى معناه جودة أحسن بس <b>ملفات أكبر</b>:<span class=\"ltr\">1 min 16-bit stereo 44.1 kHz = 10.1 MB</span><span class=\"ltr\">1 min 8-bit mono 11.025 kHz = 630 KB</span>"
    ],
    [
     "Formats: <b>.au</b> Unix/Sun, <b>.aiff</b> Mac/SGI, <b>.wav</b> PC/DEC; compression possible in some, <b>not mandatory</b>. <b>ADPCM</b> predicts the next sample and encodes the difference. <b>.voc</b> can use silence deletion.",
     "الـ Formats: الـ <bdi dir=\"ltr\"><b>.au</b></bdi> من Unix وSun، والـ <bdi dir=\"ltr\"><b>.aiff</b></bdi> من Mac وSGI، والـ <bdi dir=\"ltr\"><b>.wav</b></bdi> من PC وDEC؛ والـ compression ممكن في بعضها بس <b>مش إجباري</b>. الـ <b>ADPCM</b> بيتوقع الـ sample الجاية ويعمل encode للفرق. والـ <bdi dir=\"ltr\"><b>.voc</b></bdi> ممكن تستخدم silence deletion."
    ],
    [
     "<b>Synthetic sound</b>: only <b>parameters</b> are sent (MIDI/MP4/HTML5) and the client makes the sound; like <b>vector graphics</b> vs recorded sound like a bitmap. Methods: FM, wavetable (real instrument samples), additive (sum), subtractive (filter out), granular (small fragments), physical modelling, sample-based.",
     "الـ <b>Synthetic sound</b>: بنبعت <b>الـ parameters</b> بس (<bdi dir=\"ltr\">MIDI/MP4/HTML5</bdi>) والـ client هو اللي بيطلّع الصوت؛ وده زي الـ <b>vector graphics</b>، والصوت المتسجل زي الـ bitmap. الطرق: الـ FM، والـ wavetable (samples لآلات حقيقية)، والـ additive (جمع)، والـ subtractive (filter لأجزاء)، والـ granular (حتت صغيرة)، والـ physical modelling، والـ sample-based."
    ]
   ]
  },
  {
   "lec": 4,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "Definitions (Final 2025/26 MCQ): sampling frequency = samples per <b>second</b>; unit <b>Hz</b>; Nyquist = at least <b>twice the highest</b> frequency; 5 kHz → 10 kHz; undersampling → <b>aliasing</b>; oversampling = <b>above</b> the Nyquist rate; higher fs <b>reduces aliasing</b> and captures high frequencies; CD = <b>44.1 kHz</b>.",
     "تعريفات <bdi dir=\"ltr\">(Final 2025/26 MCQ)</bdi>: الـ sampling frequency هي عدد الـ samples في <b>الثانية</b>؛ ووحدتها <b>Hz</b>؛ والـ Nyquist يعني على الأقل <b>ضعف أعلى</b> frequency؛ و<bdi dir=\"ltr\">5 kHz → 10 kHz</bdi>؛ والـ undersampling بيعمل <b>aliasing</b>؛ والـ oversampling يعني <b>فوق</b> الـ Nyquist rate؛ والـ fs الأعلى <b>بيقلل الـ aliasing</b> وبيلقط الـ high frequencies؛ والـ CD بيستخدم <b><bdi dir=\"ltr\">44.1 kHz</bdi></b>."
    ],
    [
     "Final 2025/26 True/False: Nyquist frequency = fs/2 → <b>True</b>; aliasing when fs is too <b>high</b> → <b>False</b>; 1 kHz max needs 2 kHz or higher → <b>True</b>; exactly the Nyquist rate \"guarantees\" perfect reconstruction → <b>False</b>; raising fs \"always\" improves quality → <b>False</b>; oversampling reduces aliasing → <b>True</b>; \"digital signals do not require sampling\" → <b>False</b> (digital = sampling + quantisation); fs sets the highest representable frequency → <b>True</b>.",
     "صح ولا غلط في <bdi dir=\"ltr\">Final 2025/26</bdi>: الـ Nyquist frequency هي <bdi dir=\"ltr\">fs/2</bdi> والإجابة <b>True</b>؛ والـ aliasing بيحصل لما الـ fs تبقى <b>عالية</b> والإجابة <b>False</b>؛ وإشارة أقصاها <bdi dir=\"ltr\">1 kHz</bdi> محتاجة <bdi dir=\"ltr\">2 kHz</bdi> أو أكتر والإجابة <b>True</b>؛ والـ sampling عند الـ Nyquist rate بالظبط \"بيضمن\" reconstruction كامل والإجابة <b>False</b>؛ وزيادة الـ fs \"دايمًا\" بتحسّن الجودة والإجابة <b>False</b>؛ والـ oversampling بيقلل الـ aliasing والإجابة <b>True</b>؛ و\"الـ digital signals مش محتاجة sampling\" والإجابة <b>False</b> (الـ digital يعني sampling + quantisation)؛ والـ fs بتحدد أعلى frequency ينفع تتمثّل والإجابة <b>True</b>."
    ],
    [
     "True/False traps (Final 2020/21, Final 2021/22 T1): \"at most twice\" → False; \"twice the lowest\" → False; \"sampling frequency is not critical\" → False. Minimum fs for fmax 11025 Hz → 22.05 kHz; for 1000 Hz → 2 kHz; given only a MINIMUM frequency → None.",
     "فخاخ الصح والغلط <bdi dir=\"ltr\">(Final 2020/21, Final 2021/22 T1)</bdi>: جملة \"at most twice\" غلط؛ و\"twice the lowest\" غلط؛ و\"sampling frequency is not critical\" غلط. وأقل fs لما الـ fmax تبقى <bdi dir=\"ltr\">11025 Hz</bdi> هي <bdi dir=\"ltr\">22.05 kHz</bdi>، ولما تبقى <bdi dir=\"ltr\">1000 Hz</bdi> هي <bdi dir=\"ltr\">2 kHz</bdi>؛ ولو مدّيك أقل frequency بس الإجابة None."
    ],
    [
     "Midterm 2026/27 (40 online questions, most from this lecture, answers not yet confirmed by the doctors): fs for a maximum of 2000, 3000, 4000, 5000, 7000, 9000, 10000, 11025 Hz → just <b>× 2</b>: 4000, 6000, 8000, 10000 Hz, 14, 18, 20, 22.05 kHz. <b>Nyquist rate</b> = twice the highest frequency (5 kHz → 10 kHz; \"4 kHz speech → 8 kHz\" True); <b>Nyquist frequency</b> = half the sampling rate.",
     "الـ Midterm بتاع <bdi dir=\"ltr\">2026/27</bdi> (40 سؤال online، أغلبهم من المحاضرة دي، والإجابات لسه الدكاترة ما أكدوهاش): الـ fs لـ maximum قيمته <bdi dir=\"ltr\">2000, 3000, 4000, 5000, 7000, 9000, 10000, 11025 Hz</bdi> هي بس <b><bdi dir=\"ltr\">× 2</bdi></b>:<span class=\"ltr\">4000, 6000, 8000, 10000 Hz, 14, 18, 20, 22.05 kHz</span>والـ <b>Nyquist rate</b> هي ضعف أعلى frequency (<bdi dir=\"ltr\">5 kHz → 10 kHz</bdi>؛ وجملة \"<bdi dir=\"ltr\">4 kHz</bdi> speech تبقى <bdi dir=\"ltr\">8 kHz</bdi>\" صح)؛ والـ <b>Nyquist frequency</b> هي نص الـ sampling rate."
    ],
    [
     "Midterm 2026/27: telephone / clear speech → <b>8 kHz</b> (\"16 kHz\" → False), and the reason is speech bandwidth limitation <b>and</b> avoiding aliasing (\"Both\"); aliasing occurs when the signal is <b>undersampled</b> (\"below Nyquist can cause aliasing\" True, \"aliasing improves quality\" False); oversampling = higher than Nyquist, it reduces aliasing and improves accuracy.",
     "الـ Midterm بتاع <bdi dir=\"ltr\">2026/27</bdi>: التليفون والـ speech الواضح بياخدوا <b><bdi dir=\"ltr\">8 kHz</bdi></b> (وجملة <bdi dir=\"ltr\">16 kHz</bdi> غلط)، والسبب إن الـ speech bandwidth محدودة <b>و</b>كمان عشان نتجنب الـ aliasing (الإجابة \"Both\")؛ والـ aliasing بيحصل لما الإشارة تبقى <b>undersampled</b> (جملة \"تحت الـ Nyquist ممكن يحصل aliasing\" صح، و\"الـ aliasing بيحسّن الجودة\" غلط)؛ والـ oversampling يعني أعلى من الـ Nyquist، وبيقلل الـ aliasing وبيحسّن الدقة."
    ],
    [
     "Midterm 2026/27 on quantisation: it converts continuous amplitudes into discrete levels → <b>True</b>; it is performed <b>before</b> sampling → <b>False</b> (sampling first); more bits per sample / more levels → <b>less</b> quantisation error and noise → <b>True</b>; speech is a continuous-time signal → <b>True</b>.",
     "الـ Midterm بتاع <bdi dir=\"ltr\">2026/27</bdi> عن الـ quantisation: إنها بتحوّل الـ amplitudes المتصلة لـ levels منفصلة والإجابة <b>True</b>؛ وإنها بتحصل <b>قبل</b> الـ sampling والإجابة <b>False</b> (الـ sampling الأول)؛ وإن bits أكتر لكل sample أو levels أكتر معناها quantisation error وnoise <b>أقل</b> والإجابة <b>True</b>؛ وإن الـ speech إشارة continuous-time والإجابة <b>True</b>."
    ],
    [
     "Written \"why\": \"Why is the CD sample rate 44.1 kHz?\" → hearing reaches about 20 to 22 kHz, fmax = 22.05 kHz, Nyquist 2 × 22.05 = <b>44.1 kHz</b> (Final 2021/22 T2, Final 2023/24, Final 2024/25). Sampling intervals: speech 1/8000 = <b>0.000125 s</b>, music 1/44,100 ≈ <b>0.0000227 s</b> (Final 2022/23 T2).",
     "سؤال \"ليه\" مقالي: \"ليه الـ CD sample rate بـ <bdi dir=\"ltr\">44.1 kHz</bdi>؟\" والإجابة إن السمع بيوصل لحوالي <bdi dir=\"ltr\">20 to 22 kHz</bdi>، يعني<span class=\"ltr\">fmax = 22.05 kHz → fs = 2 × 22.05 = 44.1 kHz</span><bdi dir=\"ltr\">(Final 2021/22 T2, Final 2023/24, Final 2024/25)</bdi>. والـ sampling intervals:<span class=\"ltr\">speech: 1/8000 = 0.000125 s</span><span class=\"ltr\">music: 1/44,100 ≈ 0.0000227 s</span><bdi dir=\"ltr\">(Final 2022/23 T2)</bdi>"
    ],
    [
     "Limiting sampling interval from x(t): Final 2020/21 (250πt → 125 Hz → <b>0.004 s</b>), Midterm 2021/22 (2500πt → 1250 Hz → <b>0.0004 s</b>), Final 2021/22 T2 (1000πt → 500 Hz → <b>0.001 s</b>). The amplitudes do not matter as long as they are non-zero.",
     "أقصى sampling interval من <bdi dir=\"ltr\">x(t)</bdi>:<span class=\"ltr\">Final 2020/21: 250πt → 125 Hz → 0.004 s</span><span class=\"ltr\">Midterm 2021/22: 2500πt → 1250 Hz → 0.0004 s</span><span class=\"ltr\">Final 2021/22 T2: 1000πt → 500 Hz → 0.001 s</span>والـ amplitudes مش فارقة طالما مش صفر."
    ],
    [
     "Audio file size: 500 ms, 64-bit, 5.5 h stereo → <b>633,600 B</b> (Final 2021/22 T2); 0.00125 s, 64-bit, 6.5 h stereo → 800 × 64 × 23,400 × 2 = 2,396,160,000 bits = <b>299,520,000 B</b> (Midterm 2021/22); speech, 32-bit, 2.5 h stereo → fs 8 kHz → <b>576,000,000 B</b> (Final 2022/23 Summer); 0.00525 s, 8-bit, 2.5 h mono → fs ≈ 190.48 Hz → ≈ <b>1,714,285.7 B</b>, not a whole number, so state your rounding (Midterm #1).",
     "حجم ملف الـ audio:<span class=\"ltr\">500 ms, 64-bit, 5.5 h, stereo → 633,600 B</span><bdi dir=\"ltr\">(Final 2021/22 T2)</bdi><span class=\"ltr\">0.00125 s, 64-bit, 6.5 h, stereo → 800 × 64 × 23,400 × 2 = 2,396,160,000 bits = 299,520,000 B</span><bdi dir=\"ltr\">(Midterm 2021/22)</bdi><span class=\"ltr\">speech, 32-bit, 2.5 h, stereo → fs = 8 kHz → 576,000,000 B</span><bdi dir=\"ltr\">(Final 2022/23 Summer)</bdi><span class=\"ltr\">0.00525 s, 8-bit, 2.5 h, mono → fs ≈ 190.48 Hz → ≈ 1,714,285.7 B</span><bdi dir=\"ltr\">(Midterm #1)</bdi> والرقم ده مش صحيح، فقول إنت قرّبت إزاي."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Synthesis approaches, subtractive synthesis and the ADSR envelope",
   "ar_h": "طرق الـ synthesis والـ subtractive synthesis والـ ADSR envelope",
   "pts": [
    [
     "Three practical audio applications follow: <b>synthesis</b> (making sounds), <b>effects</b> (changing sounds) and <b>MIDI</b> (control and compression). The <b>seven</b> synthesis approaches: subtractive, additive, FM, sample-based, wavetable, granular, physical modelling.",
     "التطبيقات العملية الجاية تلاتة: الـ <b>synthesis</b> (عمل أصوات)، والـ <b>effects</b> (تغيير الأصوات)، والـ <b>MIDI</b> (التحكم والـ compression). وطرق الـ synthesis <b>سبعة</b>: الـ subtractive، والـ additive، والـ FM، والـ sample-based، والـ wavetable، والـ granular، والـ physical modelling."
    ],
    [
     "<b>Subtractive synthesis</b>: subtract overtones from a harmonically rich sound by applying an <b>audio filter</b>. First example the <b>Vocoder</b> (1939); popularised by <b>Moog</b> (1960 to 1970s). Bowed string = a <b>sawtooth</b> that is <b>low-pass filtered</b> to dampen the higher partials.",
     "الـ <b>Subtractive synthesis</b>: بنشيل overtones من صوت غني بالـ harmonics باستخدام <b>audio filter</b>. أول مثال كان الـ <b>Vocoder</b> <bdi dir=\"ltr\">(1939)</bdi>، واتشهر مع الـ <b>Moog</b> (الستينات والسبعينات). والـ bowed string هو <b>sawtooth</b> معمول له <b>low-pass filter</b> عشان يهدّي الـ partials العالية."
    ],
    [
     "Voice model: vocal cords = <b>oscillator</b> (source), mouth and throat = <b>filter</b>; \"aah\" keeps most harmonics, \"ooh\" removes most; sweeping ooh → aah → ooh = a <b>sweeping filter</b>, the basis of <b>wah-wah</b>. \"ssh\" = <b>white noise</b>; removing its highs gives <b>pink noise</b> (jet landing); filtered white noise also makes waves, wind and early snare sounds.",
     "موديل الصوت البشري: الأحبال الصوتية هي الـ <b>oscillator</b> (الـ source)، والبق والزور هما الـ <b>filter</b>؛ \"aah\" بتسيب أغلب الـ harmonics و\"ooh\" بتشيل أغلبها؛ والتنقل <bdi dir=\"ltr\">ooh → aah → ooh</bdi> هو <b>sweeping filter</b>، وده أساس الـ <b>wah-wah</b>. وصوت \"ssh\" هو <b>white noise</b>؛ ولو شلت الـ highs منه يبقى <b>pink noise</b> (صوت طيارة بتنزل)؛ والـ white noise بعد الـ filter بيعمل كمان صوت الموج والريح والـ snare القديم."
    ],
    [
     "Three basic elements of electronic control: <b>source signal</b> (square, pulse, sawtooth, triangle), <b>filtering</b> (cut-off frequency and resonance set the timbre) and the <b>amplitude envelope</b> (strictly not subtractive, but used with it and with other techniques).",
     "عناصر التحكم الإلكتروني الأساسية تلاتة: الـ <b>source signal</b> (الـ square والـ pulse والـ sawtooth والـ triangle)، والـ <b>filtering</b> (الـ cut-off frequency والـ resonance بيحددوا الـ timbre)، والـ <b>amplitude envelope</b> (مش subtractive بالظبط، بس بيتستخدم معاه ومع طرق تانية)."
    ],
    [
     "<b>ADSR</b> shapes volume (or filter frequency, pitch) over time: <b>Attack</b> = how fast to full volume (slow for bowed strings and pads); <b>Decay</b> = drop to the sustain level; <b>Sustain</b> = a <b>level</b>, not a time, held until key release; <b>Release</b> = fade after release (very short for an <b>organ</b>, long for a bell or piano with the pedal). An organ is constant in volume; a guitar is loudest right after plucking and fades.",
     "الـ <b>ADSR</b> بيشكّل الـ volume (أو الـ filter frequency أو الـ pitch) مع الوقت: الـ <b>Attack</b> هو سرعة الوصول للـ volume الكامل (بطيء في الـ bowed strings والـ pads)؛ والـ <b>Decay</b> هو النزول لمستوى الـ sustain؛ والـ <b>Sustain</b> هو <b>مستوى (level)</b> مش وقت، وبيفضل لحد ما تسيب الـ key؛ والـ <b>Release</b> هو الاختفاء بعد ما تسيب الـ key (قصير جدًا في الـ <b>organ</b>، وطويل في الجرس أو البيانو بالـ pedal). الـ organ صوته ثابت، والـ guitar أعلى صوت بعد الـ pluck على طول وبعدين بيخفت."
    ],
    [
     "MATLAB demo: <code>butter(1, 0.04, 'low')</code> vs <code>butter(4, 0.04, 'low')</code> at Fs = 22050: the cut-off is a fraction of <b>Nyquist</b>, 0.04 × 11025 = <b>441 Hz</b>; the 4th order removes more highs. <code>synth.m</code> sawtooth period = Fs / freq = 22050 / 440 ≈ <b>50.1 samples</b>.",
     "ديمو الـ MATLAB: الـ <bdi dir=\"ltr\"><code>butter(1, 0.04, 'low')</code></bdi> قصاد <bdi dir=\"ltr\"><code>butter(4, 0.04, 'low')</code></bdi> عند <bdi dir=\"ltr\">Fs = 22050</bdi>. الـ cut-off نسبة من الـ <b>Nyquist</b>:<span class=\"ltr\">0.04 × 11025 = 441 Hz</span>والـ 4th order بيشيل highs أكتر. والـ period بتاع الـ sawtooth في <bdi dir=\"ltr\"><code>synth.m</code></bdi> هو:<span class=\"ltr\">Fs / freq = 22050 / 440 ≈ 50.1 samples</span>"
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Additive and FM synthesis",
   "ar_h": "الـ Additive والـ FM synthesis",
   "pts": [
    [
     "<b>Additive</b>: complex tones by <b>summing simpler ones</b> (frequency mixing is its essence); each <b>partial</b> has its own amplitude envelope. Basis: <b>Fourier theory</b>. Examples: pipe and Hammond organs, the <b>Telharmonium</b> (1900s), Fairlight CMI, Synclavier, Kawai K5000.",
     "الـ <b>Additive</b>: أصوات معقدة بـ <b>جمع أصوات أبسط</b> (أساسه الـ frequency mixing)؛ وكل <b>partial</b> ليه amplitude envelope خاص بيه. الأساس هو <b>الـ Fourier theory</b>. أمثلة: الـ pipe organ والـ Hammond organ، والـ <b>Telharmonium</b> (أوائل القرن العشرين)، والـ Fairlight CMI، والـ Synclavier، والـ Kawai K5000."
    ],
    [
     "Advantage: recreates the <b>micro-variations</b> of each partial that make natural sounds lively. Disadvantage: <b>inefficient</b>, a great deal of data. Square wave: <b>odd</b> harmonics f, 3f, 5f with amplitudes 1, 1/3, 1/5 (100 Hz → 100, 300, 500 Hz). The Aphex Twin spectrogram \"paints\" sinusoids by inverse Fourier.",
     "الميزة: بيعيد عمل الـ <b>micro-variations</b> بتاعة كل partial اللي بتخلي الأصوات الطبيعية حيّة. العيب: <b>inefficient</b>، محتاج data كتير جدًا. الـ square wave بيتعمل من الـ harmonics <b>الفردية</b>:<span class=\"ltr\">f, 3f, 5f with amplitudes 1, 1/3, 1/5</span>يعني لـ <bdi dir=\"ltr\">100 Hz</bdi> بيبقى <bdi dir=\"ltr\">100, 300, 500 Hz</bdi>. والـ spectrogram بتاع Aphex Twin بيرسم sinusoids بالـ inverse Fourier."
    ],
    [
     "<b>FM</b>: change the timbre of a simple waveform by <b>frequency modulating</b> it. <b>John Chowning</b> (Stanford, 1967 to 68), patented 1975, licensed to <b>Yamaha</b> (DX7). Digital (analog oscillators are unstable); found when vibrato was sped up into audible <b>sidebands</b>. <b>Carrier</b> = being modulated, <b>modulator</b> = doing it; <b>operators</b> = oscillators, <b>4 or 6</b> per synth.",
     "الـ <b>FM</b>: بنغيّر الـ timbre بتاع waveform بسيطة بالـ <b>frequency modulation</b>. اكتشفه <b>John Chowning</b> في Stanford سنة <bdi dir=\"ltr\">1967 to 68</bdi>، واتعمله patent في 1975 واترخّص لـ <b>Yamaha</b> (الـ DX7). بيتعمل digital (الـ analog oscillators مش مستقرة)؛ واتكشف لما سرّعوا الـ vibrato لحد ما طلع <b>sidebands</b> مسموعة. الـ <b>Carrier</b> هو اللي بيتعمله modulation، والـ <b>modulator</b> هو اللي بيعمله؛ والـ <b>operators</b> هي الـ oscillators، و<b>4 أو 6</b> في كل synth."
    ],
    [
     "e = A sin(αt + I sin βt), <b>I = peak deviation / modulator frequency</b>. Sidebands at <b>fc ± n·fm</b> with amplitudes J<sub>n</sub>(I); J<sub>0</sub> sets the carrier. Higher-order sidebands matter only when I is <b>large</b>; bandwidth grows with I; for I &gt; 1 energy is stolen from the carrier. Harmonic sounds need a <b>harmonic (integer)</b> ratio; non-integer ratios give bell-like, inharmonic sounds.",
     "القانون:<span class=\"ltr\">e = A sin(αt + I sin βt)</span><span class=\"ltr\">I = peak deviation / modulator frequency</span>والـ sidebands بتبقى عند <b><bdi dir=\"ltr\">fc ± n·fm</bdi></b> والـ amplitude بتاعها <bdi dir=\"ltr\">J<sub>n</sub>(I)</bdi>؛ والـ <bdi dir=\"ltr\">J<sub>0</sub></bdi> بيحدد الـ carrier. الـ sidebands العالية بتفرق بس لما الـ I تبقى <b>كبيرة</b>؛ والـ bandwidth بيكبر مع الـ I؛ ولو <bdi dir=\"ltr\">I &gt; 1</bdi> الطاقة بتتسرق من الـ carrier. الأصوات الـ harmonic محتاجة نسبة <b>harmonic (صحيحة)</b>؛ والنسب اللي مش صحيحة بتدي أصوات زي الجرس، inharmonic."
    ],
    [
     "Worked (<code>fm_eg.m</code>): fc = 440 Hz, fm = 30 Hz: n = 1 → <b>410, 470 Hz</b>; n = 2 → <b>380, 500 Hz</b>; n = 3 → <b>350, 530 Hz</b>; as I rises from 0 to 20 more sidebands gain energy (brighter). 200 : 200 → 0, 400, 600 … (multiples of 200, harmonic); 200 : 141 → 59, 341, 482 … (bell-like).",
     "مثال محلول <bdi dir=\"ltr\">(<code>fm_eg.m</code>)</bdi> عند <bdi dir=\"ltr\">fc = 440 Hz, fm = 30 Hz</bdi>:<span class=\"ltr\">n = 1 → 410, 470 Hz</span><span class=\"ltr\">n = 2 → 380, 500 Hz</span><span class=\"ltr\">n = 3 → 350, 530 Hz</span>ولما الـ I تطلع من 0 لـ 20 sidebands أكتر بتاخد طاقة (الصوت بيبقى أنصع). والنسبة <bdi dir=\"ltr\">200 : 200</bdi> بتدي <bdi dir=\"ltr\">0, 400, 600 …</bdi> (مضاعفات 200، يعني harmonic)؛ و<bdi dir=\"ltr\">200 : 141</bdi> بتدي <bdi dir=\"ltr\">59, 341, 482 …</bdi> (زي الجرس)."
    ],
    [
     "FM <b>algorithms</b> (preset routings): <b>multiple carriers</b> (one oscillator modulates two or more carriers), <b>multiple modulators</b> (two or more modulate one carrier), <b>feedback</b> (an oscillator's output modulates itself).",
     "الـ <b>algorithms</b> في الـ FM (توصيلات جاهزة): الـ <b>multiple carriers</b> (oscillator واحد بيعمل modulation لـ اتنين carriers أو أكتر)، والـ <b>multiple modulators</b> (اتنين أو أكتر بيعملوا modulation لـ carrier واحد)، والـ <b>feedback</b> (الـ output بتاع الـ oscillator بيعمل modulation لنفسه)."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Sample-based synthesis and beat slicing",
   "ar_h": "الـ Sample-based synthesis والـ beat slicing",
   "pts": [
    [
     "<b>Sample-based</b>: like subtractive/additive but the seed waveforms are <b>sampled sounds</b>. Advantage: much <b>lower processing power</b> (the nuance is in the recordings). Disadvantage: detail needs several samples at once, which <b>reduces polyphony</b>. Examples: Mellotron (1962), Fairlight CMI (1979), <b>Korg M1</b> (1988, the \"workstation\"), Kontakt, Halion.",
     "الـ <b>Sample-based</b>: زي الـ subtractive والـ additive بس الـ waveforms اللي بنبدأ بيها <b>أصوات متسجلة (samples)</b>. الميزة: <b>processing power أقل بكتير</b> (التفاصيل موجودة في التسجيل). العيب: التفاصيل محتاجة كذا sample في نفس الوقت، وده <b>بيقلل الـ polyphony</b>. أمثلة: الـ Mellotron <bdi dir=\"ltr\">(1962)</bdi>، والـ Fairlight CMI <bdi dir=\"ltr\">(1979)</bdi>، والـ <b>Korg M1</b> <bdi dir=\"ltr\">(1988)</bdi> اللي قدّم الـ \"workstation\"، والـ Kontakt، والـ Halion."
    ],
    [
     "<b>Looping</b> saves memory. Loop points: <b>silence points (zero crossings)</b>, e.g. drum beats, or portions with the <b>same audio content</b> (pattern matching), e.g. sustaining instruments. Ending the loop: early samplers faded with a volume envelope; today a <b>tail-off sample</b> is triggered by note-off.",
     "الـ <b>Looping</b> بيوفّر memory. نقط الـ loop: إما <b>نقط سكوت (zero crossings)</b> زي ضربات الدرامز، أو أجزاء فيها <b>نفس الـ audio content</b> (pattern matching) زي الآلات اللي صوتها مستمر. ونهاية الـ loop: زمان كانوا بيعملوا fade بـ volume envelope؛ دلوقتي فيه <b>tail-off sample</b> بيشتغل مع الـ note-off."
    ],
    [
     "<b>Pitch</b>: speeding up or slowing a sample is realistic only over a <b>few semitones</b>, so <b>multisampling</b> is needed (regions of adjacent notes = <b>splits</b>, or every note); drum mapping is the non-pitched case. <b>Velocity layers</b>: single layer = only volume changes; dual and triple = different sounds for harder hits. <b>Keyswitching</b>: low keys outside the range select the playing style (muted/open trumpet).",
     "الـ <b>Pitch</b>: تسريع أو تبطيء الـ sample بيبقى طبيعي بس على <b>كام semitone</b>، فلازم <b>multisampling</b> (مناطق notes جنب بعض اسمها <b>splits</b>، أو كل note لوحدها)؛ والـ drum mapping هو الحالة اللي من غير pitch. الـ <b>Velocity layers</b>: الـ single layer يعني الـ volume بس اللي بيتغير؛ والـ dual والـ triple يعني أصوات مختلفة للضرب الأقوى. والـ <b>Keyswitching</b> معناه إن keys واطية برّه مدى الآلة بتختار طريقة العزف (trumpet مكتوم أو مفتوح)."
    ],
    [
     "<b>Beat detection</b> (simple sound energy): compare the <b>instant</b> energy (about <b>0.05 s</b>) with the <b>average</b> energy (about <b>1 s</b>); a beat when instant &gt; average. At 44.1 kHz: 0.05 × 44,100 = <b>2,205</b> samples vs 44,100. <b>Frequency-selected</b>: FFT over <b>1024</b> samples, about <b>32 sub-bands</b>; a beat when <b>one or more</b> sub-bands exceed their own average.",
     "الـ <b>Beat detection</b> (الطريقة البسيطة بالـ sound energy): بنقارن الطاقة <b>اللحظية</b> (حوالي <b><bdi dir=\"ltr\">0.05 s</bdi></b>) بالطاقة <b>المتوسطة</b> (حوالي <b><bdi dir=\"ltr\">1 s</bdi></b>)؛ والـ beat بيتسجل لما اللحظية تبقى أكبر من المتوسط. عند <bdi dir=\"ltr\">44.1 kHz</bdi>:<span class=\"ltr\">0.05 × 44,100 = 2,205 samples  vs  44,100</span>وطريقة الـ <b>Frequency-selected</b> بتعمل FFT على <b>1024</b> sample، وحوالي <b>32 sub-band</b>؛ والـ beat بيتسجل لما <b>sub-band واحدة أو أكتر</b> تعدّي المتوسط بتاعها."
    ],
    [
     "Slicing tools: <b>ReCycle</b> (Sensitivity slider), Cubase (Hitpoints + Threshold), Groove Agent One (slices to pads). Playing the slices at a <b>slower</b> tempo leaves <b>silent gaps</b>; <b>faster</b> gives <b>tail overlap</b>; attacks stay clean. Fixes: an <b>envelope</b> to fade each slice, and <b>loop the end of the tail</b> through a gap.",
     "أدوات الـ slicing: الـ <b>ReCycle</b> (الـ Sensitivity slider)، والـ Cubase (الـ Hitpoints والـ Threshold)، والـ Groove Agent One (الـ slices بتروح على pads). لو شغّلت الـ slices بـ tempo <b>أبطأ</b> بيبقى فيه <b>فراغات ساكتة</b>؛ ولو <b>أسرع</b> بيحصل <b>tail overlap</b>؛ والـ attacks بتفضل نضيفة. والحل: <b>envelope</b> يعمل fade لكل slice، و<b>loop لآخر الـ tail</b> عشان يملا الفراغ."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Wavetable and granular synthesis",
   "ar_h": "الـ Wavetable والـ granular synthesis",
   "pts": [
    [
     "<b>Wavetable</b>: a lookup table holding <b>one period of a general waveshape</b> that can <b>change dynamically</b> as the note evolves, giving a <b>quasi-periodic</b> output (not plain PCM playback). Examples: <b>PPG Wave</b> (64 pointers to single-cycle waves), <b>Roland D-50</b> (sampled attack + simple sustain), <b>Korg Wavestation</b> (vector synthesis).",
     "الـ <b>Wavetable</b> هو lookup table فيه <b>period واحد لـ waveshape عامة</b>، والشكل ده ممكن <b>يتغير dynamically</b> مع تطور الـ note، فالـ output بيبقى <b>quasi-periodic</b> (مش مجرد PCM playback). أمثلة: الـ <b>PPG Wave</b> (64 pointer لموجات single-cycle)، والـ <b>Roland D-50</b> (attack متسجل + sustain بسيط)، والـ <b>Korg Wavestation</b> (الـ vector synthesis)."
    ],
    [
     "In practice it stores an <b>attack sample</b> played once, then a <b>looped sustain</b> enveloped to decay. Unlike sample playback, output is generated <b>in real time</b> and tables are rarely more than <b>1 or 2 periods</b>. Advantages: <b>compact storage</b>, as general as additive with far less real-time computation, the <b>inverse DFT is precomputed</b>. Demo: 22050/440 ≈ 50 and 22050/500 = 44.1 samples per period.",
     "عمليًا بيخزّن <b>attack sample</b> بيشتغل مرة واحدة، وبعده <b>sustain متعمله loop</b> وenvelope عشان يخفت. وعلى عكس الـ sample playback، الـ output بيتعمل <b>في الـ real time</b> والـ tables نادرًا ما تزيد عن <b>period أو اتنين</b>. المميزات: <b>تخزين صغير</b>، وعام زي الـ additive بحسابات real-time أقل بكتير، والـ <b>inverse DFT محسوب مسبقًا</b>. وفي الديمو:<span class=\"ltr\">22050/440 ≈ 50 , 22050/500 = 44.1 samples per period</span>"
    ],
    [
     "Dynamic waveshaping: <b>linear crossfading</b> (crossfade from one table to the next with an envelope) and <b>sequential enveloping</b> (two tables mixed at any instant by moving envelopes). Linear crossfading is the subclass whose envelopes are <b>overlapping triangular pulses</b>.",
     "الـ Dynamic waveshaping نوعين: الـ <b>linear crossfading</b> (crossfade من table للي بعدها بـ envelope)، والـ <b>sequential enveloping</b> (اتنين tables بيتخلطوا في أي لحظة بـ envelopes بتتحرك). والـ linear crossfading هو الحالة الخاصة اللي الـ envelopes فيها <b>نبضات مثلثية متداخلة</b>."
    ],
    [
     "<b>Granular</b>: \"all sound is an integration of grains\" (<b>Xenakis</b>, 1971); grains of about <b>1 to 50 ms</b> (usually 10 to 50), many layered at different speed, phase and volume → a <b>cloud / soundscape</b>. History: Beeckman 1618, <b>Gabor</b> 1947, Xenakis 1971 (tape and razor), <b>Roads</b> 1988 (digital), <b>Truax</b> 1990 (real time). Uses include changing speed while <b>preserving pitch/tempo</b>.",
     "الـ <b>Granular</b>: \"كل صوت هو تجميع لـ grains\" (قالها <b>Xenakis</b> سنة 1971)؛ grains طولها حوالي <b><bdi dir=\"ltr\">1 to 50 ms</bdi></b> (غالبًا <bdi dir=\"ltr\">10 to 50</bdi>)، وكتير منهم فوق بعض بسرعات وphases وvolumes مختلفة، والنتيجة <b>cloud / soundscape</b>. التاريخ: Beeckman <bdi dir=\"ltr\">1618</bdi>، و<b>Gabor</b> <bdi dir=\"ltr\">1947</bdi>، وXenakis <bdi dir=\"ltr\">1971</bdi> (بشريط وموس)، و<b>Roads</b> <bdi dir=\"ltr\">1988</bdi> (digital)، و<b>Truax</b> <bdi dir=\"ltr\">1990</bdi> (real time). ومن استخداماته تغيير السرعة مع <b>الحفاظ على الـ pitch والـ tempo</b>."
    ],
    [
     "A grain = <b>envelope</b> (prevents clicks; sharper attacks give broader bandwidth) × <b>contents</b>. Combining: <b>quasi-synchronous</b> (equal-duration stream → amplitude modulation for grains &lt; 50 ms), <b>asynchronous</b> (stochastic), <b>pitch/tempo-synchronous</b> (keeps pitch/tempo while changing speed, fewer artefacts). <code>granulation.m</code>: 10 to 20 ms at 44.1 kHz = <b>441 to 882 samples</b>.",
     "الـ grain هو <b>envelope</b> (بيمنع الـ clicks؛ والـ attack الحاد بيوسّع الـ bandwidth) مضروب في <b>contents</b>. طرق التجميع: الـ <b>quasi-synchronous</b> (سلسلة grains بنفس الطول، بتعمل amplitude modulation للـ grains الأقل من <bdi dir=\"ltr\">50 ms</bdi>)، والـ <b>asynchronous</b> (عشوائي)، والـ <b>pitch/tempo-synchronous</b> (بيحافظ على الـ pitch والـ tempo وإنت بتغيّر السرعة، وartefacts أقل). وفي <bdi dir=\"ltr\"><code>granulation.m</code></bdi>:<span class=\"ltr\">10 to 20 ms at 44.1 kHz = 441 to 882 samples</span>"
    ],
    [
     "<b>PSOLA</b> (Pitch Synchronous Overlap-Add): overlapping segments; moved <b>further apart → lower pitch</b>, <b>closer → higher pitch</b>; <b>repeated → longer</b>, some <b>eliminated → shorter</b>; recombined by overlap-add. There is <b>no STFT</b> in PSOLA (it predates the phase vocoder).",
     "الـ <b>PSOLA</b> (Pitch Synchronous Overlap-Add) بيقسم الإشارة لـ segments متداخلة؛ لو <b>بعّدتها عن بعض الـ pitch بيوطى</b>، ولو <b>قرّبتها بيعلى</b>؛ ولو <b>كررتها المدة بتطول</b>، ولو <b>شلت شوية منها بتقصر</b>؛ وبعدين بتتجمع بالـ overlap-add. ومفيش <b>STFT</b> في الـ PSOLA (أقدم من الـ phase vocoder)."
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Physical modelling and Karplus-Strong",
   "ar_h": "الـ Physical modelling والـ Karplus-Strong",
   "pts": [
    [
     "<b>Physical modelling</b>: sound from a <b>mathematical model</b> (equations and algorithms) of a physical source, with parameters for materials and the player's interaction (plucking, bowing, covering toneholes, striking a membrane). Examples: Yamaha VL1 (1994), Roland COSM, PianoTeq. Algorithms: <b>Karplus-Strong</b> (1971), <b>digital waveguide</b> (1980s), <b>formant synthesis</b> (1950s).",
     "الـ <b>Physical modelling</b>: الصوت بيطلع من <b>mathematical model</b> (معادلات وalgorithms) لمصدر فيزيائي، بـ parameters للخامات وطريقة العازف (pluck أو bow أو قفل الـ toneholes أو ضرب membrane). أمثلة: الـ Yamaha VL1 <bdi dir=\"ltr\">(1994)</bdi>، والـ Roland COSM، والـ PianoTeq. والـ algorithms: الـ <b>Karplus-Strong</b> <bdi dir=\"ltr\">(1971)</bdi>، والـ <b>digital waveguide</b> (الثمانينات)، والـ <b>formant synthesis</b> (الخمسينات)."
    ],
    [
     "<b>Karplus-Strong</b>: loop a short <b>white-noise burst</b> through a <b>filtered delay line</b> to make a plucked string or percussion. It is essentially <b>subtractive</b>, with a feedback loop like a <b>comb filter</b>; the filter gain must be <b>&lt; 1</b> at all frequencies (usually a first-order low-pass).",
     "الـ <b>Karplus-Strong</b>: بنلف <b>دفعة white noise</b> قصيرة جوه <b>delay line عليها filter</b> عشان نعمل صوت وتر متشد أو percussion. هو أساسًا <b>subtractive</b>، وفيه feedback loop زي الـ <b>comb filter</b>؛ والـ gain بتاع الـ filter لازم يبقى <b><bdi dir=\"ltr\">&lt; 1</bdi></b> عند كل الـ frequencies (غالبًا first-order low-pass)."
    ],
    [
     "Tuning: period = delay length (+ filter group delay), so <b>D = Fs / F1</b>. <code>karplus.m</code>: Fs = 44100, D = 200 → F1 = <b>220.5 Hz</b>; for 441 Hz, D = 44100/441 = <b>100 samples</b>. Its filter b = −0.99 × [0.5 0.5] (averaging with gain 0.99 &lt; 1). Halving D doubles the pitch.",
     "الضبط: الـ period هو طول الـ delay (+ الـ group delay بتاع الـ filter)، يعني:<span class=\"ltr\">D = Fs / F1</span>وفي <bdi dir=\"ltr\"><code>karplus.m</code></bdi>:<span class=\"ltr\">Fs = 44100, D = 200 → F1 = 220.5 Hz</span><span class=\"ltr\">441 Hz → D = 44100/441 = 100 samples</span>والـ filter بتاعه <bdi dir=\"ltr\">b = −0.99 × [0.5 0.5]</bdi> (متوسط بـ gain <bdi dir=\"ltr\">0.99 &lt; 1</bdi>). ولو قسمت الـ D على 2 الـ pitch بيتضاعف."
    ],
    [
     "Drum variant: X(t) = +½(X(t−p) + X(t−p+1)) with probability <b>b</b>, else −½(…). <b>b</b> = blend factor: ½ best <b>snare</b>, near 0 <b>string</b>-like, near 1 electric <b>crash cymbal</b>. <b>p</b> (table length, about 150 to 500): bigger → <b>longer decay</b> and <b>lower pitch</b>. Presets: crash b &gt; 0.98, p 200 to 800; plink b &gt; 0.98, p 5 to 50; string b &lt; 0.05, p 20 to 400.",
     "الـ Drum variant:<span class=\"ltr\">X(t) = +½(X(t−p) + X(t−p+1))  with probability b,  else −½(…)</span>والـ <b>b</b> هو الـ blend factor: الـ ½ أحسن <b>snare</b>، وقريب من 0 بيبقى زي الـ <b>string</b>، وقريب من 1 بيبقى <b>crash cymbal</b> إلكتروني. والـ <b>p</b> (طول الـ table، حوالي <bdi dir=\"ltr\">150 to 500</bdi>): كل ما يكبر <b>الـ decay بيطول</b> و<b>الـ pitch بيوطى</b>. الـ presets:<span class=\"ltr\">crash: b &gt; 0.98, p = 200 to 800</span><span class=\"ltr\">plink: b &gt; 0.98, p = 5 to 50</span><span class=\"ltr\">string: b &lt; 0.05, p = 20 to 400</span>"
    ]
   ]
  },
  {
   "lec": 5,
   "h": "Likely questions",
   "ar_h": "أسئلة متوقعة",
   "pts": [
    [
     "Past papers have none from this lecture: no final, midterm or quiz item on the site comes from synthesis (Midterm 2026/27 covered Lectures 1 and 4). Expect questions like the site's practice ones.",
     "الامتحانات اللي فاتت مفيهاش ولا سؤال من المحاضرة دي: مفيش final ولا midterm ولا سؤال quiz على الموقع جه من الـ synthesis (الـ Midterm بتاع <bdi dir=\"ltr\">2026/27</bdi> كان على المحاضرة 1 و4). استنى أسئلة شبه أسئلة التدريب بتاعة الموقع."
    ],
    [
     "Name the method from a description: filter a sawtooth → <b>subtractive</b>; add partials → <b>additive</b>; modulate a carrier → <b>FM</b>; grains → <b>granular</b>; noise through a filtered delay → <b>Karplus-Strong</b>; one-period tables that evolve → <b>wavetable</b>. And ADSR: which phase is a <b>level</b> (Sustain).",
     "تعرف الطريقة من وصفها: filter على sawtooth يبقى <b>subtractive</b>؛ جمع partials يبقى <b>additive</b>؛ modulation لـ carrier يبقى <b>FM</b>؛ grains يبقى <b>granular</b>؛ noise جوه delay عليها filter يبقى <b>Karplus-Strong</b>؛ tables فيها period واحد وبتتطور يبقى <b>wavetable</b>. وفي الـ ADSR: أنهي مرحلة هي <b>level</b> (الـ Sustain)."
    ],
    [
     "Calculations: FM sideband pairs <b>fc ± n·fm</b> and whether the ratio is harmonic; modulation index I = peak deviation / fm; Karplus-Strong <b>D = Fs / F1</b> both ways; a <code>butter</code> cut-off = fraction × Fs/2; window sizes in samples (beat 0.05 s × fs, grain ms × fs, period Fs / f).",
     "الحسابات: أزواج الـ FM sidebands <b><bdi dir=\"ltr\">fc ± n·fm</bdi></b> وهل النسبة harmonic؛ والـ modulation index <bdi dir=\"ltr\">I = peak deviation / fm</bdi>؛ والـ Karplus-Strong <b><bdi dir=\"ltr\">D = Fs / F1</bdi></b> في الاتجاهين؛ والـ cut-off بتاع <bdi dir=\"ltr\"><code>butter</code></bdi> يساوي النسبة × <bdi dir=\"ltr\">Fs/2</bdi>؛ وأطوال النوافذ بالـ samples (الـ beat <bdi dir=\"ltr\">0.05 s × fs</bdi>، والـ grain <bdi dir=\"ltr\">ms × fs</bdi>، والـ period <bdi dir=\"ltr\">Fs / f</bdi>)."
    ],
    [
     "Pros, cons and rules: additive is <b>inefficient</b>; sample-based <b>reduces polyphony</b>; wavetable is <b>compact</b>; PSOLA pitch and duration rules; beat-slicing <b>gaps</b> (slower) and <b>overlaps</b> (faster) and their fixes; Karplus-Strong b and p presets.",
     "المميزات والعيوب والقواعد: الـ additive <b>inefficient</b>؛ والـ sample-based <b>بيقلل الـ polyphony</b>؛ والـ wavetable <b>صغير في التخزين</b>؛ وقواعد الـ pitch والمدة في الـ PSOLA؛ و<b>الفراغات</b> (أبطأ) والـ <b>overlaps</b> (أسرع) في الـ beat slicing وحلولها؛ والـ presets بتاعة الـ b والـ p في الـ Karplus-Strong."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "MIDI: what it is, why it compresses, and its components",
   "ar_h": "الـ MIDI: هو إيه، وليه بيعمل compression، ومكوّناته",
   "pts": [
    [
     "<b>MIDI</b> = a <b>protocol</b> that lets computers, synthesisers, keyboards and other musical devices <b>communicate</b>. Today it is a <b>very low bandwidth</b> way to send music on the Web, and (modified) a <b>compression control language</b> in MPEG-4 and HTML5.",
     "الـ <b>MIDI</b> هو <b>protocol</b> بيخلي الكمبيوترات والـ synthesisers والـ keyboards والأجهزة الموسيقية <b>تكلم بعض</b>. ودلوقتي هو طريقة <b>bandwidth قليلة جدًا</b> لإرسال الموسيقى على الـ Web، وبشكل متعدّل بيتستخدم كـ <b>compression control language</b> في الـ MPEG-4 والـ HTML5."
    ],
    [
     "Why it compresses: it sends <b>instructions</b> (which note, how loud, which instrument), not audio samples, so a file needs only a few 100K bytes. The <b>responsibility for producing the sound moves to the client</b> (synth module, sampler, soundcard, software synth). Browsers: plugins and, since 2013, the <b>Web MIDI API</b>. MIDI is about 40 years old; <b>MIDI 2.0</b> = \"High Definition MIDI\".",
     "ليه بيعمل compression: لإنه بيبعت <b>تعليمات</b> (أنهي note، وبأي قوة، وأنهي آلة)، مش audio samples، فالملف بياخد كام 100K byte بس. و<b>مسئولية إنتاج الصوت بتنتقل للـ client</b> (الـ synth module أو الـ sampler أو الـ soundcard أو الـ software synth). والـ browsers بتشغله بـ plugins، ومن 2013 بالـ <b>Web MIDI API</b>. والـ MIDI عمره حوالي 40 سنة؛ والـ <b>MIDI 2.0</b> اسمه \"High Definition MIDI\"."
    ],
    [
     "Components: <b>synthesiser/sampler</b> (the sound generator, \"tone generation unit\"); <b>sequencer</b> (hardware or software); <b>computer</b> = the <b>heart</b> (scheduling, synchronisation, recording; DAWs such as Cubase, Logic); <b>control input devices</b> (keyboard with sustain, pitch bend, modulation, aftertouch; wind, breath, motion controllers); <b>interfaces</b> (cable, USB, Ethernet, Bluetooth, WiFi); <b>control output devices</b> (lighting, robotics such as the Orchestrion, video, MPEG-4).",
     "المكوّنات: الـ <b>synthesiser/sampler</b> (مولّد الصوت، \"tone generation unit\")؛ والـ <b>sequencer</b> (hardware أو software)؛ والـ <b>computer</b> وهو <b>القلب</b> (الـ scheduling والـ synchronisation والـ recording؛ والـ DAWs زي Cubase وLogic)؛ والـ <b>control input devices</b> (keyboard فيه sustain وpitch bend وmodulation وaftertouch؛ وwind وbreath وmotion controllers)؛ والـ <b>interfaces</b> (cable أو USB أو Ethernet أو Bluetooth أو WiFi)؛ والـ <b>control output devices</b> (الإضاءة، والـ robotics زي الـ Orchestrion، والـ video، والـ MPEG-4)."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Basic concepts and connectors",
   "ar_h": "المفاهيم الأساسية والـ connectors",
   "pts": [
    [
     "<b>Track</b>: organises recordings in a sequencer (turned on/off). <b>Channel</b>: separates information; <b>16 channels in one cable</b>, and the channel number is <b>coded into each message</b>.",
     "الـ <b>Track</b>: بينظم التسجيلات في الـ sequencer (بيتقفل ويتفتح). والـ <b>Channel</b>: بيفصل المعلومات؛ فيه <b>16 channel في الـ cable الواحد</b>، ورقم الـ channel <b>متكتب جوه كل message</b>."
    ],
    [
     "<b>Timbre</b> = quality of the sound (flute, cello…); <b>multitimbral</b> = plays many different sounds at once. <b>Pitch</b> = the note played. <b>Voice</b> = the portion of the synth that <b>produces sound</b> (12, 20, 24, 36 … voices working independently). <b>Patch</b> = the control settings that define a timbre.",
     "الـ <b>Timbre</b> هو نوعية الصوت (flute أو cello…)؛ والـ <b>multitimbral</b> يعني يقدر يعزف أصوات كتير مختلفة في نفس الوقت. والـ <b>Pitch</b> هو الـ note اللي بتتعزف. والـ <b>Voice</b> هو الجزء من الـ synth اللي <b>بيطلّع الصوت</b> (12 أو 20 أو 24 أو 36 voice شغالين مستقلين). والـ <b>Patch</b> هو إعدادات التحكم اللي بتحدد timbre معين."
    ],
    [
     "Connectors: USB, or (older) three <b>5-pin ports</b>: <b>MIDI IN</b> receives all MIDI data; <b>MIDI OUT</b> transmits the data the device <b>generates itself</b>; <b>MIDI THROUGH</b> <b>echoes</b> what arrives at MIDI IN. Trap: OUT does not repeat IN, THROUGH does.",
     "الـ Connectors: الـ USB، أو (القديم) تلات <b>ports بـ 5 pins</b>: الـ <b>MIDI IN</b> بيستقبل كل الـ MIDI data؛ والـ <b>MIDI OUT</b> بيبعت الـ data اللي الجهاز <b>بيطلّعها بنفسه</b>؛ والـ <b>MIDI THROUGH</b> <b>بيكرر</b> اللي داخل على الـ MIDI IN. الفخ: الـ OUT مش بيكرر الـ IN، الـ THROUGH هو اللي بيكرره."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "MIDI messages: structure, channel messages and decoding",
   "ar_h": "الـ MIDI messages: التركيب والـ channel messages والفك",
   "pts": [
    [
     "A message = <b>one status byte + up to two data bytes</b>. <b>Status byte</b>: MSB = <b>1</b> (hex 80 to FF), the <b>4 low bits = channel</b> (16 channels), the other 3 bits = <b>message type</b>. <b>Data byte</b>: MSB = <b>0</b>, so values <b>0 to 127</b> (00 to 7F).",
     "الـ message هي <b>status byte واحد + لحد اتنين data bytes</b>. الـ <b>Status byte</b>: الـ MSB بـ <b>1</b> <bdi dir=\"ltr\">(hex 80 to FF)</bdi>، و<b>الـ 4 bits الواطيين هما الـ channel</b> (16 channel)، والـ 3 bits التانيين هما <b>نوع الـ message</b>. والـ <b>Data byte</b>: الـ MSB بـ <b>0</b>، فالقيم من <b><bdi dir=\"ltr\">0 to 127</bdi></b> <bdi dir=\"ltr\">(00 to 7F)</bdi>."
    ],
    [
     "Rule: first hex digit = message type, second = <b>channel − 1</b> (channels 1 to 16 → nibble 0 to F). Classes: <b>channel messages</b> (voice, mode) and <b>system messages</b> (common, real-time, exclusive). Voice messages go on <b>individual channels</b>.",
     "القاعدة: أول hex digit هو نوع الـ message، والتاني هو <b><bdi dir=\"ltr\">channel − 1</bdi></b> (الـ channels من 1 لـ 16 بتبقى nibble من 0 لـ F). الأنواع: الـ <b>channel messages</b> (voice وmode) والـ <b>system messages</b> (common وreal-time وexclusive). والـ voice messages بتتبعت على <b>channels منفردة</b>."
    ],
    [
     "Voice messages: <b>8x</b> Note Off, <b>9x</b> Note On (key, velocity), <b>Ax</b> polyphonic key pressure, <b>Bx</b> control change (controller, value), <b>Cx</b> program change (program only), <b>Dx</b> channel pressure (value only), <b>Ex</b> pitch bend (MSB, LSB). Program change and channel pressure = <b>2 bytes</b>; the others <b>3 bytes</b>.",
     "الـ Voice messages:<span class=\"ltr\">8x Note Off,  9x Note On (key, velocity)</span><span class=\"ltr\">Ax polyphonic key pressure,  Bx control change</span><span class=\"ltr\">Cx program change,  Dx channel pressure,  Ex pitch bend</span>الـ program change والـ channel pressure <b>2 bytes</b> بس (data byte واحد)؛ والباقي <b>3 bytes</b>."
    ],
    [
     "<b>Channel mode messages</b> are a special case of <b>Control Change (Bx)</b>: the <b>first data byte 121 to 127</b> is reserved for them; they decide how an instrument processes voice messages.",
     "الـ <b>Channel mode messages</b> حالة خاصة من الـ <b>Control Change (Bx)</b>: <b>أول data byte من 121 لـ 127</b> محجوز ليها؛ وهي بتحدد الـ instrument بيعالج الـ voice messages إزاي."
    ],
    [
     "Worked: <b>9C 50 7F</b> → Note On, channel 12 + 1 = <b>13</b>, key 5×16 = <b>80</b>, velocity <b>127</b>. <b>80 3C 40</b> → Note Off, channel 1, key 3×16 + 12 = <b>60</b>, velocity <b>64</b>. Encode Note On, snare key 38, velocity 100, channel 10 → 9 + (10 − 1) → <b>99 26 64</b>.",
     "أمثلة محلولة:<span class=\"ltr\">9C 50 7F → Note On, channel 12 + 1 = 13, key 5×16 = 80, velocity 127</span><span class=\"ltr\">80 3C 40 → Note Off, channel 1, key 3×16 + 12 = 60, velocity 64</span>ولو عايز تكتب Note On للـ snare (key 38) بـ velocity 100 على channel 10:<span class=\"ltr\">9 + (10 − 1) → 99 ,  38 = 26h ,  100 = 64h  →  99 26 64</span>"
    ],
    [
     "Size: 1000 notes = 1000 Note On + 1000 Note Off = 2000 × 3 = <b>6000 bytes</b>, against 1 minute of stereo CD audio = 44,100 × 16 × 2 × 60 / 8 = <b>10,584,000 bytes</b>. That is why MIDI is a compression tool. (Link speed 31.25 kbaud, 10 bits per byte → 0.96 ms per 3-byte message ‡.)",
     "الحجم:<span class=\"ltr\">1000 notes = 1000 On + 1000 Off = 2000 × 3 = 6000 bytes</span>قصاد دقيقة stereo CD audio:<span class=\"ltr\">44,100 × 16 × 2 × 60 / 8 = 10,584,000 bytes</span>وعشان كده الـ MIDI بيتقال عليه compression tool. (سرعة الـ link <bdi dir=\"ltr\">31.25 kbaud</bdi> و10 bits لكل byte، يعني <bdi dir=\"ltr\">0.96 ms</bdi> للـ message اللي 3 bytes ‡.)"
    ]
   ]
  },
  {
   "lec": 6,
   "h": "System messages and General MIDI",
   "ar_h": "الـ System messages والـ General MIDI",
   "pts": [
    [
     "<b>System messages</b> are <b>not channel specific</b>: timing, positioning in a sequence, device setup. <b>Real-time</b>: F8 timing clock, <b>FA</b> start, <b>FB</b> continue, <b>FC</b> stop, FE active sensing, FF reset. <b>Common</b>: F1 MIDI timing code (1 data byte), F2 song position (2), F3 song select (1), F6 tune request (none). <b>Sysex</b>: bracketed by <b>F0 … F7</b>, system dependent, not GM compliant.",
     "الـ <b>System messages</b> <b>مش مربوطة بـ channel</b>: توقيت، ومكان في الـ sequence، وإعداد الجهاز. الـ <b>Real-time</b>:<span class=\"ltr\">F8 clock, FA start, FB continue, FC stop, FE active sensing, FF reset</span>والـ <b>Common</b>:<span class=\"ltr\">F1 timing code (1 data byte), F2 song position (2), F3 song select (1), F6 tune request (0)</span>والـ <b>Sysex</b> محصورة بين <b><bdi dir=\"ltr\">F0 … F7</bdi></b>، وشكلها بيعتمد على الـ system، ومش GM compliant."
    ],
    [
     "<b>General MIDI</b> = MIDI + <b>Instrument Patch Map</b> + <b>Percussion Key Map</b>, so a piece sounds (more or less) the same anywhere.",
     "الـ <b>General MIDI</b> هو الـ MIDI + <b>Instrument Patch Map</b> + <b>Percussion Key Map</b>، عشان المقطوعة تطلع (تقريبًا) بنفس الصوت في أي مكان."
    ],
    [
     "Patch map: <b>128 instruments</b> in <b>16 families of 8</b>: 1 to 8 piano, 9 to 16 chromatic percussion, 17 to 24 organ, 25 to 32 guitar, 33 to 40 bass, 41 to 48 strings, 49 to 56 ensemble, 57 to 64 brass, 65 to 72 reed, 73 to 80 pipe, 81 to 88 synth lead, 89 to 96 synth pad, 97 to 104 synth effects, 105 to 112 ethnic, 113 to 120 percussive, 121 to 128 sound effects. E.g. 1 Acoustic Grand, 41 Violin, 57 Trumpet, 74 Flute, 128 Gunshot.",
     "الـ Patch map فيها <b>128 آلة</b> في <b>16 عيلة كل واحدة 8</b>:<span class=\"ltr\">1–8 piano, 9–16 chromatic perc., 17–24 organ, 25–32 guitar</span><span class=\"ltr\">33–40 bass, 41–48 strings, 49–56 ensemble, 57–64 brass</span><span class=\"ltr\">65–72 reed, 73–80 pipe, 81–88 synth lead, 89–96 synth pad</span><span class=\"ltr\">97–104 synth FX, 105–112 ethnic, 113–120 percussive, 121–128 SFX</span>مثلًا 1 هو Acoustic Grand، و41 Violin، و57 Trumpet، و74 Flute، و128 Gunshot."
    ],
    [
     "Percussion map: <b>47 sounds</b> on keys <b>35 to 81</b> (35 bass drum, 38 snare, 42 closed hi-hat, 49 crash, 81 open triangle), on <b>channel 10</b> by default; each key is a <b>switch</b> with no pitch. GM needs: all <b>16 channels</b>, <b>multitimbral</b>, <b>polyphony</b> per channel, at least <b>24</b> dynamically allocated voices.",
     "الـ Percussion map فيها <b>47 صوت</b> على الـ keys من <b>35 لـ 81</b> (35 bass drum، و38 snare، و42 closed hi-hat، و49 crash، و81 open triangle)، وبتتبعت على <b>channel 10</b> كـ default؛ وكل key هو <b>switch</b> من غير pitch. والـ GM محتاج: الـ <b>16 channel</b> كلهم، و<b>multitimbral</b>، و<b>polyphony</b> في كل channel، وعلى الأقل <b>24</b> voice بيتوزعوا dynamically."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Limitations of MIDI and MPEG-4 Structured Audio",
   "ar_h": "حدود الـ MIDI والـ MPEG-4 Structured Audio",
   "pts": [
    [
     "Limitations: few channels and controllers; limited resolution (most MIDI numbers are 8-bit). Solutions: combine two values as <b>LSB and MSB</b>, <b>Open Sound Control (OSC)</b>, <b>MIDI 2.0</b>.",
     "الحدود: channels وcontrollers قليلة؛ وresolution محدودة (أغلب أرقام الـ MIDI بـ 8 bits). والحلول: نجمع قيمتين كـ <b>LSB وMSB</b>، والـ <b>Open Sound Control (OSC)</b>، والـ <b>MIDI 2.0</b>."
    ],
    [
     "<b>MPEG-4 audio</b> combines <b>compression, synthesis and MIDI</b>: encode <b>what note to play and how</b> with a few parameters, a much greater reduction than coding audio bits; creating the audio is delegated to the generation side. Newer than MP3, from very low bit-rate speech to high-quality audio, with anti-piracy measures.",
     "الـ <b>MPEG-4 audio</b> بيجمع <b>الـ compression والـ synthesis والـ MIDI</b>: بيعمل encode لـ <b>أنهي note تتعزف وإزاي</b> بكام parameter، وده تقليل أكبر بكتير من encoding الـ audio bits؛ وعمل الصوت بيتساب لجهة التوليد. أحدث من الـ MP3، وبيغطي من speech بـ bit-rate واطي جدًا لحد audio عالي الجودة، وفيه حماية ضد القرصنة."
    ],
    [
     "Six Structured Audio tools: <b>SAOL</b> (orchestra language: describes synthesisers/instruments, any method), <b>SASL</b> (score language: which notes, how loud, tempo, how long; no looping, sections, repeats or expressions), <b>SASBF</b> (sample banks for wavetable/sample synthesis, partly compatible with MIDI <b>DLS</b>), <b>MIDI semantics</b> (drive SAOL with MIDI), <b>Scheduler</b> (main body: how SAOL makes sound when driven by MIDI or SASL), <b>AudioBIFS</b> (mixing and post-production of audio scenes at playback; part of BIFS, an extended VRML).",
     "أدوات الـ Structured Audio ستة: الـ <b>SAOL</b> (لغة الـ orchestra: بتوصف الـ synthesisers والآلات بأي طريقة)، والـ <b>SASL</b> (لغة الـ score: أنهي notes وبأي قوة والـ tempo والمدة؛ ومفيهاش looping ولا sections ولا repeats ولا expressions)، والـ <b>SASBF</b> (banks من الـ samples للـ wavetable والـ sample synthesis، ومتوافقة جزئيًا مع الـ MIDI <b>DLS</b>)، والـ <b>MIDI semantics</b> (تشغيل الـ SAOL بالـ MIDI)، والـ <b>Scheduler</b> (الجسم الأساسي: الـ SAOL بيعمل الصوت إزاي لما الـ MIDI أو الـ SASL يشغّله)، والـ <b>AudioBIFS</b> (الـ mixing والـ post-production للـ audio scenes وقت التشغيل؛ جزء من الـ BIFS، وهو VRML متوسّع)."
    ],
    [
     "<b>HTML5 Web MIDI API</b>: JavaScript access to MIDI input/output devices and synthesis in the browser (support not complete). Examples: the <b>Google Doodle Mini Moog</b> (subtractive, Bob Moog's 78th birthday), FM (DX7) synth, drum machine, granular synth, Chrome Music Lab.",
     "الـ <b>HTML5 Web MIDI API</b>: بيدّي JavaScript وصول لأجهزة الـ MIDI input والـ output وsynthesis جوه الـ browser (الدعم لسه مش كامل). أمثلة: الـ <b>Google Doodle Mini Moog</b> (subtractive، عيد ميلاد Bob Moog الـ 78)، وFM synth (DX7)، وdrum machine، وgranular synth، والـ Chrome Music Lab."
    ]
   ]
  },
  {
   "lec": 6,
   "h": "Likely questions",
   "ar_h": "أسئلة متوقعة",
   "pts": [
    [
     "Past papers have none from this lecture: no final, midterm or quiz item on the site is about MIDI or MPEG-4 (only Lecture 1's \"compression via synthesis: MIDI\" idea). Expect questions like the site's practice ones.",
     "الامتحانات اللي فاتت مفيهاش ولا سؤال من المحاضرة دي: مفيش final ولا midterm ولا سؤال quiz على الموقع عن الـ MIDI أو الـ MPEG-4 (غير فكرة المحاضرة 1 عن الـ compression via synthesis بالـ MIDI). استنى أسئلة شبه أسئلة التدريب بتاعة الموقع."
    ],
    [
     "Decode and encode messages: status type + channel − 1, hex data → decimal (key, velocity, program); spot <b>2-byte</b> messages (Cx, Dx); mode messages (Bx with 121 to 127); system bytes (F0/F7, F8 to FF).",
     "فك وكتابة الـ messages: نوع الـ status + <bdi dir=\"ltr\">channel − 1</bdi>، وتحويل الـ hex data لـ decimal (الـ key والـ velocity والـ program)؛ وتعرف الـ messages اللي <b>2 bytes</b> (الـ Cx والـ Dx)؛ والـ mode messages (Bx بـ 121 لـ 127)؛ والـ system bytes <bdi dir=\"ltr\">(F0/F7, F8 to FF)</bdi>."
    ],
    [
     "Count bytes for a sequence and compare with CD audio; GM facts (128 instruments, family = ⌈n / 8⌉, 47 percussion keys 35 to 81 on channel 10, 24 voices); the three ports; the six MPEG-4 Structured Audio tools and what each does.",
     "عدّ الـ bytes لـ sequence وقارنها بالـ CD audio؛ ومعلومات الـ GM (128 آلة، والعيلة <bdi dir=\"ltr\">⌈n / 8⌉</bdi>، و47 percussion key من 35 لـ 81 على channel 10، و24 voice)؛ والتلات ports؛ وأدوات الـ MPEG-4 Structured Audio الستة وشغل كل واحدة."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Where effects go and how they are classified",
   "ar_h": "مكان الـ effects وتقسيمها",
   "pts": [
    [
     "Effects are applied <b>during synthesis</b> or at the <b>end of the chain</b> (production, mastering), in series or in parallel. The <b>order matters</b> (different order, drastically different output), but there is <b>no absolute rule</b>. Standard order: <b>Compression → Distortion → EQ → Noise Redux → Amp Sim → Modulation → Delay → Reverb</b> (the Zoom G1 pedal links 8 such modules).",
     "الـ effects بتتعمل <b>وقت الـ synthesis</b> أو في <b>آخر السلسلة</b> (الـ production والـ mastering)، على التوالي أو على التوازي. و<b>الترتيب بيفرق</b> (ترتيب تاني يدي output مختلف خالص)، بس <b>مفيش قاعدة مطلقة</b>. الترتيب المعتاد:<span class=\"ltr\">Compression → Distortion → EQ → Noise Redux → Amp Sim → Modulation → Delay → Reverb</span>(والـ Zoom G1 pedal بيوصّل 8 modules زي دول)."
    ],
    [
     "Classification by processing: <b>basic filtering</b> (lowpass, highpass, equaliser); <b>time-varying filters</b> (wah-wah, phaser); <b>delays</b> (vibrato, flanger, chorus, echo); <b>modulators</b> (ring modulation, tremolo, vibrato); <b>non-linear</b> (compression, limiters, distortion, exciters/enhancers); <b>spatial</b> (panning, reverb, surround). Trap: <b>vibrato</b> is in both delays and modulators.",
     "التقسيم حسب المعالجة: الـ <b>basic filtering</b> (الـ lowpass والـ highpass والـ equaliser)؛ والـ <b>time-varying filters</b> (الـ wah-wah والـ phaser)؛ والـ <b>delays</b> (الـ vibrato والـ flanger والـ chorus والـ echo)؛ والـ <b>modulators</b> (الـ ring modulation والـ tremolo والـ vibrato)؛ والـ <b>non-linear</b> (الـ compression والـ limiters والـ distortion والـ exciters/enhancers)؛ والـ <b>spatial</b> (الـ panning والـ reverb والـ surround). الفخ: الـ <b>vibrato</b> موجود في الـ delays والـ modulators الاتنين."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Equalisers and time-varying filters",
   "ar_h": "الـ Equalisers والـ time-varying filters",
   "pts": [
    [
     "A <b>filter</b> removes or attenuates audio above or below a cut-off; an <b>equaliser</b> <b>enhances or diminishes certain bands while leaving others unchanged</b>, built from <b>shelving</b> and <b>peak</b> filters (1st or 2nd order). Shelving: boost/cut the <b>low or high</b> band (fc, G). Peak: boost/cut a <b>mid</b> band (fc, bandwidth fb, G).",
     "الـ <b>filter</b> بيشيل أو يقلل الصوت فوق أو تحت cut-off معين؛ أما الـ <b>equaliser</b> <b>بيعلّي أو يوطّي bands معينة ويسيب الباقي زي ما هو</b>، ومتبني من <b>shelving</b> و<b>peak</b> filters (1st أو 2nd order). الـ Shelving: بيعلّي أو يقطع الـ band <b>الواطية أو العالية</b> (<bdi dir=\"ltr\">fc, G</bdi>). والـ Peak: بيعلّي أو يقطع band <b>في النص</b> (<bdi dir=\"ltr\">fc, fb, G</bdi>)."
    ],
    [
     "Shelving uses a <b>first-order allpass</b> A(z) (passes all frequencies, changes phase): H(z) = 1 + (H<sub>0</sub>/2)(1 ± A(z)), + for LF, − for HF. Peak uses a <b>second-order allpass</b> with <b>d = −cos(2πfc/fs)</b>. Gain: <b>V<sub>0</sub> = 10<sup>G/20</sup></b>, <b>H<sub>0</sub> = V<sub>0</sub> − 1</b>: 4 dB → 1.585, 0.585; 20 dB → 10, 9; 6 dB → V<sub>0</sub> ≈ 1.995 (amplitude doubles).",
     "الـ Shelving بيستخدم <b>first-order allpass</b> <bdi dir=\"ltr\">A(z)</bdi> (بيعدّي كل الـ frequencies ويغيّر الـ phase):<span class=\"ltr\">H(z) = 1 + (H0/2)(1 ± A(z))   (+ LF, − HF)</span>والـ Peak بيستخدم <b>second-order allpass</b> مع:<span class=\"ltr\">d = −cos(2π fc / fs)</span>والـ gain:<span class=\"ltr\">V0 = 10^(G/20) ,  H0 = V0 − 1</span><span class=\"ltr\">4 dB → 1.585, 0.585 ;  20 dB → 10, 9 ;  6 dB → V0 ≈ 1.995</span>يعني الـ 6 dB بتضاعف الـ amplitude."
    ],
    [
     "<b>Wah-wah</b> = a <b>bandpass</b> filter with a time-varying centre frequency and <b>small bandwidth</b>, mixed with the direct signal. <b>Phaser</b> = the same with a <b>notch</b> filter (cascaded IIR). <b>M-fold wah-wah</b>: M tap-delay bandpass filters; a <b>bell effect</b> needs about a hundred.",
     "الـ <b>Wah-wah</b> هو <b>bandpass</b> filter الـ centre frequency بتاعه بيتغير مع الوقت والـ <b>bandwidth صغيرة</b>، ومخلوط مع الإشارة الأصلية. والـ <b>Phaser</b> نفس الفكرة بس بـ <b>notch</b> filter (IIR ورا بعض). والـ <b>M-fold wah-wah</b>: عدد M من الـ bandpass filters بـ tap delays؛ والـ <b>bell effect</b> محتاج حوالي مية."
    ],
    [
     "<b>State variable filter</b>: <b>independent control of cut-off and damping</b>, and <b>lowpass, bandpass and highpass outputs at the same time</b>. yl(n) = F1·yb(n) + yl(n−1); yb(n) = F1·yh(n) + yb(n−1); yh(n) = x(n) − yl(n−1) − Q1·yb(n−1), with <b>F1 = 2 sin(πfc/fs)</b>, <b>Q1 = 2d</b>. fc = 1000, fs = 44100 → F1 ≈ <b>0.1424</b>; d = 0.05 → Q1 = 0.1. F1 is recalculated whenever fc changes (the wah demo sweeps 500 to 3000 Hz as a triangle wave).",
     "الـ <b>State variable filter</b>: <b>تحكم مستقل في الـ cut-off والـ damping</b>، وبيطلّع <b>lowpass وbandpass وhighpass في نفس الوقت</b>:<span class=\"ltr\">yl(n) = F1·yb(n) + yl(n−1)</span><span class=\"ltr\">yb(n) = F1·yh(n) + yb(n−1)</span><span class=\"ltr\">yh(n) = x(n) − yl(n−1) − Q1·yb(n−1)</span><span class=\"ltr\">F1 = 2 sin(π fc / fs) ,  Q1 = 2d</span>مثال:<span class=\"ltr\">fc = 1000, fs = 44100 → F1 ≈ 0.1424 ;  d = 0.05 → Q1 = 0.1</span>والـ F1 بيتحسب تاني كل ما الـ fc تتغير (ديمو الـ wah بيلف من <bdi dir=\"ltr\">500 to 3000 Hz</bdi> على شكل triangle wave)."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Comb filters and delay effects",
   "ar_h": "الـ Comb filters والـ delay effects",
   "pts": [
    [
     "<b>FIR comb</b> (a single delay): <b>y(n) = x(n) + g·x(n − M)</b>. <b>IIR comb</b> (endless reflections, like the ends of a cylinder): <b>y(n) = c·x(n) + g·y(n − M)</b>, attenuated by g each pass. Delay in samples <b>M = τ × fs</b>: 100 ms at 44.1 kHz → <b>4410</b>; at 8 kHz, M = 10 is 1.25 ms.",
     "الـ <b>FIR comb</b> (delay واحد):<span class=\"ltr\">y(n) = x(n) + g·x(n − M)</span>والـ <b>IIR comb</b> (انعكاسات مالهاش آخر، زي طرفين أسطوانة):<span class=\"ltr\">y(n) = c·x(n) + g·y(n − M)</span>وبتقل بـ g في كل لفة. والـ delay بالـ samples:<span class=\"ltr\">M = τ × fs :  100 ms at 44.1 kHz → 4410</span>وعند <bdi dir=\"ltr\">8 kHz</bdi> الـ <bdi dir=\"ltr\">M = 10</bdi> تساوي <bdi dir=\"ltr\">1.25 ms</bdi>."
    ],
    [
     "Impulse with g = 0.5, M = 10: FIR → y(0) = 1, y(10) = 0.5, all else 0 (<b>one</b> echo). IIR (c = 1) → 1, 0.5, 0.25, 0.125, 0.0625 at n = 0, 10, 20, 30, 40: an <b>endless, exponentially decaying</b> series, y(k·M) = g<sup>k</sup>.",
     "مع impulse و<bdi dir=\"ltr\">g = 0.5, M = 10</bdi>:<span class=\"ltr\">FIR → y(0) = 1, y(10) = 0.5, else 0</span>يعني echo <b>واحد</b>. والـ IIR <bdi dir=\"ltr\">(c = 1)</bdi>:<span class=\"ltr\">n = 0, 10, 20, 30, 40 → 1, 0.5, 0.25, 0.125, 0.0625</span>يعني سلسلة <b>مالهاش آخر وبتقل exponentially</b>:<span class=\"ltr\">y(k·M) = g^k</span>"
    ],
    [
     "<b>Universal comb</b>: xh(n) = x(n) + FB·xh(n − M); y(n) = FF·xh(n − M) + BL·xh(n). Settings (BL, FB, FF): FIR comb (1, 0, g), IIR comb (1, g, 0), allpass (a, −a, 1), delay (0, 0, 1).",
     "الـ <b>Universal comb</b>:<span class=\"ltr\">xh(n) = x(n) + FB·xh(n − M)</span><span class=\"ltr\">y(n) = FF·xh(n − M) + BL·xh(n)</span>والإعدادات <bdi dir=\"ltr\">(BL, FB, FF)</bdi>:<span class=\"ltr\">FIR (1, 0, g) ; IIR (1, g, 0) ; allpass (a, −a, 1) ; delay (0, 0, 1)</span>"
    ],
    [
     "Delay ranges (ms): <b>resonator</b> 0 to 20, none; <b>flanger</b> 0 to 15, sinusoidal (≈ 1 Hz); <b>chorus</b> 10 to 25, random; <b>slapback</b> 25 to 50, none; <b>echo</b> &gt; 50, none. Slapback = quick repetition (doubling); flanging = continuously varying LFO delay; chorus = several copies with small random delays.",
     "مدى الـ delay بالـ ms:<span class=\"ltr\">resonator 0–20 (none) ; flanger 0–15 (sinusoidal ≈ 1 Hz)</span><span class=\"ltr\">chorus 10–25 (random) ; slapback 25–50 (none) ; echo &gt; 50 (none)</span>الـ slapback هو تكرار سريع للصوت (doubling)؛ والـ flanging هو delay بيتغير باستمرار بـ LFO؛ والـ chorus هو كذا نسخة بـ delays عشوائية صغيرة."
    ],
    [
     "<b>Vibrato</b>: periodically varying the <b>delay time</b> (like the <b>Doppler effect</b>), delay line + <b>LFO</b>; <b>only the delayed signal is heard</b>; delay <b>5 to 10 ms</b>, LFO <b>5 to 14 Hz</b>. Flanger demo: max 3 ms at 44.1 kHz → round(132.3) = <b>132 samples</b>, rate 1 Hz, y = 0.7·x(i) + 0.7·x(i − cur_delay).",
     "الـ <b>Vibrato</b>: بنغيّر <b>وقت الـ delay</b> بشكل دوري (زي الـ <b>Doppler effect</b>)، بـ delay line + <b>LFO</b>؛ و<b>بنسمع الإشارة المتأخرة بس</b>؛ والـ delay من <b><bdi dir=\"ltr\">5 to 10 ms</bdi></b> والـ LFO من <b><bdi dir=\"ltr\">5 to 14 Hz</bdi></b>. وديمو الـ flanger:<span class=\"ltr\">3 ms at 44.1 kHz → round(132.3) = 132 samples</span><span class=\"ltr\">y = 0.7·x(i) + 0.7·x(i − cur_delay)</span>والـ rate <bdi dir=\"ltr\">1 Hz</bdi>."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Modulation effects: ring modulation, AM, tremolo",
   "ar_h": "الـ Modulation effects: الـ ring modulation والـ AM والـ tremolo",
   "pts": [
    [
     "<b>Modulation</b> varies a sinusoid's <b>amplitude, frequency or phase</b> by an audio signal: amplitude → wah-wah, phaser; frequency → FM synthesis; phase → vibrato, chorus, flanger.",
     "الـ <b>Modulation</b> بتغيّر <b>الـ amplitude أو الـ frequency أو الـ phase</b> بتاعة sinusoid بإشارة audio: الـ amplitude في الـ wah-wah والـ phaser؛ والـ frequency في الـ FM synthesis؛ والـ phase في الـ vibrato والـ chorus والـ flanger."
    ],
    [
     "<b>Ring modulation</b>: <b>y(n) = x(n)·m(n)</b>; for sines you hear <b>only the sum and difference</b> fc + fx and fc − fx (fc 440, fx 200 → <b>640 and 240 Hz</b>, no 440 or 200). A periodic input with fundamental f0 gives lines at <b>|k·f0 ± fc|</b>. Used for robotic voices in old sci-fi.",
     "الـ <b>Ring modulation</b>:<span class=\"ltr\">y(n) = x(n)·m(n)</span>ومع sines بتسمع <b>المجموع والفرق بس</b>:<span class=\"ltr\">fc + fx , fc − fx :  440, 200 → 640 and 240 Hz</span>من غير 440 ولا 200. ولو الـ input دوري بـ fundamental <bdi dir=\"ltr\">f0</bdi> بيطلع خطوط عند:<span class=\"ltr\">|k·f0 ± fc|</span>وبيتستخدم للأصوات الآلية في أفلام الخيال العلمي القديمة."
    ],
    [
     "<b>AM</b>: <b>y(n) = (1 + α·m(n))·x(n)</b>, m an LFO with peak 1, <b>α = depth</b> (1 max, 0 off); with sines you hear <b>three</b> frequencies fc, fc − fx, fc + fx. <b>Tremolo</b> = AM with modulation frequency <b>below 20 Hz</b> (demo 5 Hz, α = 0.5 → gain 0.5 to 1.5); also made by RM with a <b>triangular</b> LFO.",
     "الـ <b>AM</b>:<span class=\"ltr\">y(n) = (1 + α·m(n))·x(n)</span>والـ m هو LFO أقصاه 1، والـ <b>α هي الـ depth</b> (الـ 1 أقصى حاجة، والـ 0 بيقفله)؛ ومع sines بتسمع <b>تلات</b> frequencies:<span class=\"ltr\">fc , fc − fx , fc + fx</span>والـ <b>Tremolo</b> هو AM بـ modulation frequency <b>أقل من <bdi dir=\"ltr\">20 Hz</bdi></b> (الديمو <bdi dir=\"ltr\">5 Hz</bdi> و<bdi dir=\"ltr\">α = 0.5</bdi>، فالـ gain من <bdi dir=\"ltr\">0.5 to 1.5</bdi>)؛ وممكن يتعمل كمان بـ RM مع LFO <b>مثلثي</b>."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Non-linear processing",
   "ar_h": "الـ Non-linear processing",
   "pts": [
    [
     "Non-linear processors create <b>harmonic and inharmonic components not in the original</b>. Three groups: <b>dynamic processing</b> (control the envelope while <b>minimising</b> distortion: compressors, limiters), <b>intentional harmonic processing</b> (guitar distortion), <b>exciters/enhancers</b> (add harmonics for subtle improvement).",
     "الـ Non-linear processors بتعمل <b>harmonic وinharmonic components مش موجودة في الأصل</b>. تلات مجموعات: الـ <b>dynamic processing</b> (التحكم في الـ envelope مع <b>تقليل</b> الـ distortion: الـ compressors والـ limiters)، والـ <b>intentional harmonic processing</b> (الـ guitar distortion)، والـ <b>exciters/enhancers</b> (إضافة harmonics لتحسين خفيف)."
    ],
    [
     "<b>Limiter</b>: controls <b>high peaks</b> with little change to the main dynamics; uses a <b>peak level measurement</b> and reacts <b>very quickly</b> above a threshold (instruments, final mastering). <b>Compressor</b>: <b>reduces the dynamics</b> (loud parts reduced by a static curve); vocals, guitar, mastering. <b>Expander</b>: works on <b>low</b> levels and <b>boosts</b> their dynamics → livelier sound.",
     "الـ <b>Limiter</b>: بيتحكم في <b>الـ peaks العالية</b> من غير ما يغيّر الـ dynamics الأساسية كتير؛ بيستخدم <b>peak level measurement</b> وبيرد <b>بسرعة جدًا</b> فوق الـ threshold (للآلات والـ final mastering). والـ <b>Compressor</b>: <b>بيقلل الـ dynamics</b> (الأجزاء العالية بتقل بـ static curve)؛ للـ vocals والـ guitar والـ mastering. والـ <b>Expander</b>: بيشتغل على المستويات <b>الواطية</b> و<b>بيكبّر</b> الـ dynamics بتاعتها، فالصوت يبقى أحيى."
    ],
    [
     "<b>Overdrive</b> = symmetrical <b>soft clipping</b>: f(x) = 2x for 0 ≤ x &lt; 1/3; (3 − (2 − 3x)²)/3 for 1/3 ≤ x &lt; 2/3; 1 for x ≥ 2/3. x = 0.2 → 0.4; x = 0.5 → 0.917; x = 0.8 → 1. <b>Distortion</b> = wider non-linear region; <b>fuzz</b> = completely non-linear, harshest; exponential curve with gain <b>α</b>, usually mixed with the original.",
     "الـ <b>Overdrive</b> هو <b>soft clipping</b> متماثل:<span class=\"ltr\">f(x) = 2x                 0 ≤ x &lt; 1/3</span><span class=\"ltr\">f(x) = (3 − (2 − 3x)²)/3   1/3 ≤ x &lt; 2/3</span><span class=\"ltr\">f(x) = 1                  x ≥ 2/3</span><span class=\"ltr\">x = 0.2 → 0.4 ;  x = 0.5 → 0.917 ;  x = 0.8 → 1</span>والـ <b>Distortion</b> منطقته الـ non-linear أوسع؛ والـ <b>fuzz</b> non-linear بالكامل وأخشن حاجة؛ بمنحنى exponential والـ gain بتاعه <b>α</b>، وغالبًا بيتخلط مع الأصل."
    ],
    [
     "<b>Exciter</b>: emphasises or de-emphasises frequencies to change <b>timbre</b>, brightness without EQ, via the <b>STFT</b> (phase vocoder); best on signals lacking highs. <b>Enhancer</b>: <b>equalisation + non-linear processing</b>, a just-noticeable distortion; a filter network (at least 3 bands) + harmonic generator; used for stereo enhancement in radio.",
     "الـ <b>Exciter</b>: بيبرز أو يخفي frequencies عشان يغيّر الـ <b>timbre</b>، ويدّي brightness من غير EQ، عن طريق الـ <b>STFT</b> (الـ phase vocoder)؛ وأحسن حاجة على الإشارات اللي ناقصها highs. والـ <b>Enhancer</b> عبارة عن <b>equalisation + non-linear processing</b>، بـ distortion يدوب يتلاحظ؛ filter network (على الأقل 3 bands) + harmonic generator؛ وبيتستخدم للـ stereo enhancement في الراديو."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Spatial effects: panning and reverb",
   "ar_h": "الـ Spatial effects: الـ panning والـ reverb",
   "pts": [
    [
     "<b>Panning</b>: map a <b>mono</b> source across the stereo image by a 2-D rotation: <b>gL = (cos θ + sin θ)x</b>, <b>gR = (cos θ − sin θ)x</b>. θ = 0 → equal (centre); θ = 45° → gL = 1.414x, gR = 0. (Demo: −40° to 40° in 32 steps.)",
     "الـ <b>Panning</b>: بنوزّع مصدر <b>mono</b> على الـ stereo image بـ 2-D rotation:<span class=\"ltr\">gL = (cos θ + sin θ)x ,  gR = (cos θ − sin θ)x</span><span class=\"ltr\">θ = 0 → equal (centre) ;  θ = 45° → gL = 1.414x, gR = 0</span>(والديمو من <bdi dir=\"ltr\">−40° to 40°</bdi> في 32 خطوة.)"
    ],
    [
     "<b>Reverb</b> = the many reflections in a room, arriving <b>later</b> (longer path) and <b>weaker</b> (walls absorb). An <b>echo</b> is a <b>distinct</b> copy (delay more than about one or two tenths of a second). A delay with feedback gives reflections at a <b>fixed interval</b>, but in a real room the <b>rate of arriving reflections changes</b>: <b>early reflections</b> (directional) then <b>diffuse late reverberation</b> (dense, random, exponential decay).",
     "الـ <b>Reverb</b> هو انعكاسات كتير في الأوضة، بتوصل <b>متأخرة</b> (المسافة أطول) و<b>أضعف</b> (الحيطان بتمتص). أما الـ <b>echo</b> فهو نسخة <b>واضحة لوحدها</b> (delay أكتر من حوالي عُشر أو عُشرين ثانية). والـ delay بالـ feedback بيدي انعكاسات على <b>فترات ثابتة</b>، بس في الأوضة الحقيقية <b>معدل وصول الانعكاسات بيتغير</b>: الأول <b>early reflections</b> (ليها اتجاه)، وبعدها <b>diffuse late reverberation</b> (كثيفة وعشوائية وبتقل exponentially)."
    ],
    [
     "<b>Schroeder (1961)</b>: IIR <b>comb filters in parallel</b> followed by <b>allpass filters in series</b>, classic <b>4 comb + 2 allpass</b>; does not create the rising reflection rate. <b>Moorer (1976)</b>: <b>tapped delay lines</b> for early reflections, <b>lowpass filters in the comb feedback loops</b> (shorter reverb at high frequencies), allpass for diffusion; demo 6 lowpass combs + 1 allpass.",
     "الـ <b>Schroeder (1961)</b> فيه IIR <b>comb filters على التوازي</b> وبعدها <b>allpass filters على التوالي</b>، والتصميم الكلاسيكي <b>4 comb + 2 allpass</b>؛ ومش بيعمل معدل الانعكاسات اللي بيزيد. والـ <b>Moorer (1976)</b> فيه <b>tapped delay lines</b> للـ early reflections، و<b>lowpass filters جوه الـ feedback loops بتاعة الـ combs</b> (الـ reverb أقصر في الـ high frequencies)، وallpass للـ diffusion؛ والديمو 6 lowpass combs + 1 allpass."
    ],
    [
     "<b>Convolution reverb</b>: convolve the input with the room's <b>impulse response</b> (most faithful). It is too long for direct filters (hundreds of taps), so use the <b>FFT</b> and the convolution theorem: <b>y = IFFT(FFT(x)·FFT(h))</b>. Record h with a gun shot, drum hit or hand clap; commercial: <b>Altiverb</b>.",
     "الـ <b>Convolution reverb</b>: بنعمل convolution للـ input مع الـ <b>impulse response</b> بتاع الأوضة (أدق طريقة). وهو أطول من إنه يتعمل بـ filters مباشرة (مئات الـ taps)، فبنستخدم الـ <b>FFT</b> والـ convolution theorem:<span class=\"ltr\">y = IFFT( FFT(x) · FFT(h) )</span>والـ h بيتسجل بطلقة أو ضربة drum أو تصفيقة؛ ومن البرامج التجارية الـ <b>Altiverb</b>."
    ]
   ]
  },
  {
   "lec": 7,
   "h": "Likely questions",
   "ar_h": "أسئلة متوقعة",
   "pts": [
    [
     "Past papers have none from this lecture: no final, midterm or quiz item on the site is about audio effects. Expect questions like the site's practice ones.",
     "الامتحانات اللي فاتت مفيهاش ولا سؤال من المحاضرة دي: مفيش final ولا midterm ولا سؤال quiz على الموقع عن الـ audio effects. استنى أسئلة شبه أسئلة التدريب بتاعة الموقع."
    ],
    [
     "Calculations: delay M = τ × fs and back; FIR and IIR comb impulse responses (g<sup>k</sup>); ring modulation and AM output frequencies; tremolo gain range 1 ± α; EQ V<sub>0</sub> and H<sub>0</sub>; d and F1; overdrive f(x); panning gains.",
     "الحسابات: الـ delay <bdi dir=\"ltr\">M = τ × fs</bdi> والعكس؛ والـ impulse responses بتاعة الـ FIR والـ IIR comb <bdi dir=\"ltr\">(g^k)</bdi>؛ وfrequencies الـ output في الـ ring modulation والـ AM؛ ومدى الـ gain في الـ tremolo <bdi dir=\"ltr\">1 ± α</bdi>؛ والـ <bdi dir=\"ltr\">V0</bdi> والـ <bdi dir=\"ltr\">H0</bdi> في الـ EQ؛ والـ d والـ F1؛ والـ <bdi dir=\"ltr\">f(x)</bdi> في الـ overdrive؛ وgains الـ panning."
    ],
    [
     "Concepts: the six classes (vibrato in two); which delay range names which effect; filter vs equaliser; wah-wah (bandpass) vs phaser (notch); limiter vs compressor vs expander; exciter vs enhancer; why delay-with-feedback is not real reverb; Schroeder vs Moorer; why convolution reverb uses the FFT.",
     "المفاهيم: التقسيمات الستة (والـ vibrato في اتنين)؛ وأنهي مدى delay لأنهي effect؛ والفرق بين الـ filter والـ equaliser؛ والـ wah-wah (bandpass) قصاد الـ phaser (notch)؛ والـ limiter والـ compressor والـ expander؛ والـ exciter قصاد الـ enhancer؛ وليه الـ delay بالـ feedback مش reverb حقيقي؛ والـ Schroeder قصاد الـ Moorer؛ وليه الـ convolution reverb بيستخدم الـ FFT."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Image types, sizes, colour look-up tables and dithering",
   "ar_h": "أنواع الصور وأحجامها والـ colour LUT والـ dithering",
   "pts": [
    [
     "An image is made of <b>pixels</b>; their number = <b>resolution</b>. Sizes for 640 × 480: <b>1-bit</b> bitmap = 307,200 bits = 38,400 B = <b>37.5 KB</b>; <b>grey-scale</b> 1 byte (0 to 255) = <b>307.2 KB</b>; <b>8-bit colour</b> (LUT, 256 colours) = <b>307.2 KB</b>; <b>24-bit</b> (3 bytes, 16,777,216 colours) = <b>921.6 KB</b>; <b>32-bit</b> adds an <b>alpha</b> byte (transparency) = 1,228,800 B.",
     "الصورة متكوّنة من <b>pixels</b>؛ وعددهم هو الـ <b>resolution</b>. الأحجام لـ <bdi dir=\"ltr\">640 × 480</bdi>:<span class=\"ltr\">1-bit bitmap = 307,200 bits = 38,400 B = 37.5 KB</span><span class=\"ltr\">grey-scale (1 byte, 0–255) = 307.2 KB</span><span class=\"ltr\">8-bit colour (LUT, 256 colours) = 307.2 KB</span><span class=\"ltr\">24-bit (3 bytes, 16,777,216 colours) = 921.6 KB</span><span class=\"ltr\">32-bit (+ alpha byte) = 1,228,800 B</span>والـ alpha للـ transparency."
    ],
    [
     "<b>Colour LUT</b>: each pixel stores only an <b>index</b>; the table gives the RGB colour (memory value 25 → R = 30, G = 190, B = 60). Built when converting 24-bit to 8-bit by grouping similar colours; changing the map gives <b>palette animation</b>.",
     "الـ <b>Colour LUT</b>: كل pixel بيخزّن <b>index</b> بس؛ والـ table هو اللي بيدّي اللون RGB (القيمة 25 في الـ memory بتبقى <bdi dir=\"ltr\">R = 30, G = 190, B = 60</bdi>). وبيتبني لما نحوّل من 24-bit لـ 8-bit بتجميع الألوان القريبة من بعض؛ وتغيير الـ map بيعمل <b>palette animation</b>."
    ],
    [
     "<b>Dithering</b> (grey → black/white, e.g. printing): a <b>4 × 4</b> pattern shows <b>17</b> levels; remap 0 to 255 → 0 to 16 by <b>× 17/256, round down</b>; dither matrix [0 8 2 10; 12 4 14 6; 3 11 1 9; 15 7 13 5]; a dot where the remapped value is <b>&gt;</b> the entry. Pixel 200 → 13.28 → 13 → <b>13 of 16 dots</b>. <b>Simple</b> dithering makes the image <b>16 times larger</b>; <b>ordered</b> dither keeps the size.",
     "الـ <b>Dithering</b> (من grey لأبيض وأسود، زي الطباعة): بنستخدم pattern <b><bdi dir=\"ltr\">4 × 4</bdi></b> بيعرض <b>17</b> مستوى؛ بنحوّل <bdi dir=\"ltr\">0–255</bdi> لـ <bdi dir=\"ltr\">0–16</bdi> بـ <b><bdi dir=\"ltr\">× 17/256</bdi> ونقرّب لتحت</b>؛ والـ dither matrix:<span class=\"ltr\">[0 8 2 10; 12 4 14 6; 3 11 1 9; 15 7 13 5]</span>ونحط نقطة لما القيمة الجديدة تبقى <b>أكبر من</b> الرقم اللي في الـ matrix. مثال:<span class=\"ltr\">200 → 13.28 → 13 → 13 of 16 dots</span>والـ dithering <b>البسيط</b> بيكبّر الصورة <b>16 مرة</b>؛ والـ <b>ordered</b> dither بيحافظ على الحجم."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Image file formats",
   "ar_h": "الـ Image file formats",
   "pts": [
    [
     "<b>GIF</b> (87a, 89a): UNISYS and CompuServe, for modems; <b>LZW</b> (the slide calls it a form of Huffman coding ‡: LZW is dictionary-based), <b>lossless</b>, limited to <b>8-bit (256 colours)</b>, supports <b>interlacing</b>; GIF89a adds simple <b>animation</b> and a transparency index. <b>JPEG</b>: for photos, exploits human vision, <b>lossy</b>, the user chooses the quality.",
     "الـ <b>GIF</b> (87a و89a): من UNISYS وCompuServe عشان الـ modems؛ بيستخدم <b>LZW</b> (السلايد بتقول عليه نوع من الـ Huffman coding ‡، والـ LZW في الحقيقة dictionary-based)، و<b>lossless</b>، ومحدود بـ <b>8-bit (256 لون)</b>، وبيدعم الـ <b>interlacing</b>؛ والـ GIF89a بيزوّد <b>animation</b> بسيط وtransparency index. والـ <b>JPEG</b>: للصور الفوتوغرافية، بيستغل حدود النظر، <b>lossy</b>، والـ user بيختار الجودة."
    ],
    [
     "<b>TIFF</b>: many image types identified by <b>tags</b>; Aldus (1980s), then Microsoft; typically <b>lossless</b> (a JPEG tag allows JPEG); no major advantage over JPEG, <b>not as user-controllable</b>, declining. <b>PNG</b>: meant to <b>replace GIF</b>; up to <b>48 bits/pixel</b>, gamma correction, <b>alpha channel</b>, progressive display (8 × 8 blocks). <b>PostScript/EPS</b>: typesetting language, <b>no compression</b> (large). <b>BMP</b> (DIB): Windows, system dependent, 24-bit.",
     "الـ <b>TIFF</b>: أنواع صور كتير بتتعرف بـ <b>tags</b>؛ من Aldus (الثمانينات) وبعدين Microsoft؛ غالبًا <b>lossless</b> (والـ JPEG tag بيسمح بـ JPEG)؛ مفيهوش ميزة كبيرة عن الـ JPEG و<b>مش قابل للتحكم زيه</b>، فبيقل استخدامه. والـ <b>PNG</b>: معمول عشان <b>يحل محل الـ GIF</b>؛ لحد <b>48 bits/pixel</b>، وgamma correction، و<b>alpha channel</b>، وعرض تدريجي (blocks <bdi dir=\"ltr\">8 × 8</bdi>). والـ <b>PostScript/EPS</b>: لغة typesetting، <b>من غير compression</b> (ملفات كبيرة). والـ <b>BMP</b> (DIB): بتاع الـ Windows، وهو system dependent وبيدعم 24-bit."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Light, the eye, RGB, CIE and Lab",
   "ar_h": "الضوء والعين والـ RGB والـ CIE والـ Lab",
   "pts": [
    [
     "Visible light: <b>400 to 700 nm</b>, usually a mix of wavelengths (a <b>spectrum</b>). Retina: <b>rods</b> (brightness, not colour) and <b>cones</b> (3 types: red, green, blue), each responding differently to wavelengths.",
     "الضوء المرئي: من <b><bdi dir=\"ltr\">400 to 700 nm</bdi></b>، وغالبًا خليط من wavelengths (<b>spectrum</b>). الـ retina فيها <b>rods</b> (للإضاءة، مش للون) و<b>cones</b> (3 أنواع: أحمر وأخضر وأزرق)، وكل نوع بيستجيب للـ wavelengths بشكل مختلف."
    ],
    [
     "<b>RGB</b>: additive red, green, blue intensities; CRT phosphors excited by electrons, or <b>TFT LCD</b> with a transistor per R, G or B pixel. <b>Gamut</b> = all colours the three primaries can reproduce; a monitor's gamut is smaller than CIE Lab.",
     "الـ <b>RGB</b>: شدّات أحمر وأخضر وأزرق بتتجمع (additive)؛ في الـ CRT phosphors بتنور بالـ electrons، أو <b>TFT LCD</b> فيها transistor لكل pixel R أو G أو B. والـ <b>Gamut</b> هو كل الألوان اللي التلات primaries يقدروا يعملوها؛ والـ gamut بتاع الشاشة أصغر من الـ CIE Lab."
    ],
    [
     "<b>CIE (1931)</b>: primaries <b>X, Y, Z</b>, with <b>Y</b> = the eye's luminous-efficiency function; the horseshoe <b>chromaticity diagram</b> has <b>pure</b> colours on its edge and white (6447 K) at the dot. It is <b>vector-based</b>: adding two colours gives a point on the <b>line between them</b>.",
     "الـ <b>CIE (1931)</b>: الـ primaries هي <b>X وY وZ</b>، والـ <b>Y</b> بيساوي الـ luminous-efficiency function بتاعة العين؛ والـ <b>chromaticity diagram</b> شكله حدوة حصان، على حرفه الألوان <b>النقية</b> والأبيض <bdi dir=\"ltr\">(6447 K)</bdi> عند النقطة. وهو <b>vector-based</b>: لو جمعت لونين بتطلع نقطة على <b>الخط اللي بينهم</b>."
    ],
    [
     "<b>CIE L*a*b* (1976)</b>: <b>L</b> = luminance (0 black to 100 white), <b>a</b> = green → red, <b>b</b> = blue → yellow; used by <b>Photoshop</b>. Also <b>HSB</b> and <b>HLS</b>. <b>Luminance</b> = brightness (the grey value Y); <b>chrominance</b> = colour (hue + saturation).",
     "الـ <b>CIE L*a*b* (1976)</b>: الـ <b>L</b> هي الـ luminance (من 0 أسود لـ 100 أبيض)، والـ <b>a</b> من الأخضر للأحمر، والـ <b>b</b> من الأزرق للأصفر؛ وبيستخدمه الـ <b>Photoshop</b>. وفيه كمان الـ <b>HSB</b> والـ <b>HLS</b>. الـ <b>Luminance</b> هي الإضاءة (قيمة الـ grey يعني Y)؛ والـ <b>chrominance</b> هي اللون (الـ hue + الـ saturation)."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Luminance-chrominance models: YIQ, YUV, YCrCb",
   "ar_h": "موديلات الـ luminance والـ chrominance: الـ YIQ والـ YUV والـ YCrCb",
   "pts": [
    [
     "All share <b>Y = 0.299R + 0.587G + 0.114B</b>. <b>YIQ</b>: I = 0.596R − 0.275G − 0.321B, Q = 0.212R − 0.528G + 0.311B; used in <b>NTSC</b> colour TV (compatible with B/W TV). The eye is most sensitive to Y, then I, then Q, so bandwidth <b>4, 1.5, 0.6 MHz</b> (analog compression).",
     "كلهم بيشتركوا في:<span class=\"ltr\">Y = 0.299R + 0.587G + 0.114B</span>والـ <b>YIQ</b>:<span class=\"ltr\">I = 0.596R − 0.275G − 0.321B</span><span class=\"ltr\">Q = 0.212R − 0.528G + 0.311B</span>وبيتستخدم في الـ <b>NTSC</b> colour TV (متوافق مع التلفزيون الأبيض والأسود). العين أحسّ حاجة للـ Y وبعدين I وبعدين Q، فالـ bandwidth:<span class=\"ltr\">Y 4 MHz , I 1.5 MHz , Q 0.6 MHz</span>وده analog compression."
    ],
    [
     "<b>YUV</b>: digital video standard (1982): <b>U = B − Y</b>, <b>V = R − Y</b>; two fields (odd, even lines) make a frame; PAL 50 fields/s, NTSC 60. <b>YCrCb</b> (CCIR 601): scaled YUV, <b>Cb = (B − Y)/1.772</b>, <b>Cr = (R − Y)/1.402</b>; used in <b>JPEG</b> and MPEG. Trap: the slide matrix swaps the row labels; [−0.169 −0.331 0.500] is really Cb.",
     "الـ <b>YUV</b> هو standard للـ digital video <bdi dir=\"ltr\">(1982)</bdi>:<span class=\"ltr\">U = B − Y ,  V = R − Y</span>واتنين fields (السطور الفردية والزوجية) بيعملوا frame؛ والـ PAL بـ 50 field في الثانية والـ NTSC بـ 60. والـ <b>YCrCb</b> <bdi dir=\"ltr\">(CCIR 601)</bdi> هو YUV متعمله scaling:<span class=\"ltr\">Cb = (B − Y)/1.772 ,  Cr = (R − Y)/1.402</span>وبيتستخدم في الـ <b>JPEG</b> والـ MPEG. الفخ: الـ matrix في السلايد مبدّلة أسامي الصفوف؛ والصف <bdi dir=\"ltr\">[−0.169 −0.331 0.500]</bdi> هو في الحقيقة Cb."
    ],
    [
     "Worked pixel (110, 110, 255), no normalising: Y = 32.89 + 64.57 + 29.07 = <b>126.53</b>; U = 255 − 126.53 = <b>128.47</b>, V = 110 − 126.53 = <b>−16.53</b>; Cb = 128.47/1.772 = <b>72.50</b>, Cr = −16.53/1.402 = <b>−11.79</b>. The course summary floors values and clips negatives to 0 when storing pixels; in the exam show the real values, then state any rounding.",
     "مثال محلول للـ pixel <bdi dir=\"ltr\">(110, 110, 255)</bdi> من غير normalising:<span class=\"ltr\">Y = 32.89 + 64.57 + 29.07 = 126.53</span><span class=\"ltr\">U = 255 − 126.53 = 128.47 ,  V = 110 − 126.53 = −16.53</span><span class=\"ltr\">Cb = 128.47/1.772 = 72.50 ,  Cr = −16.53/1.402 = −11.79</span>الـ course summary بيقرّب لتحت ويخلي السالب صفر لما يخزن pixels؛ في الامتحان اكتب القيم الحقيقية وبعدين قول إنت قرّبت إزاي."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Printing models: CMY and CMYK",
   "ar_h": "موديلات الطباعة: الـ CMY والـ CMYK",
   "pts": [
    [
     "<b>CMY</b> = the <b>subtractive primaries</b>, complements of RGB: <b>C = 1 − R, M = 1 − G, Y = 1 − B</b> (values 0 to 1). Pigments <b>absorb</b> colours. Additive: R + G + B = white; subtractive: C + M + Y = black (in theory); C + M = blue, C + Y = green, M + Y = red.",
     "الـ <b>CMY</b> هي الـ <b>subtractive primaries</b>، عكس الـ RGB:<span class=\"ltr\">C = 1 − R ,  M = 1 − G ,  Y = 1 − B   (0 to 1)</span>والأحبار <b>بتمتص</b> ألوان. في الـ additive:<span class=\"ltr\">R + G + B = white</span>وفي الـ subtractive:<span class=\"ltr\">C + M + Y = black (in theory)</span><span class=\"ltr\">C + M = blue , C + Y = green , M + Y = red</span>"
    ],
    [
     "<b>CMYK</b>: mixing C, M and Y is <b>never really black</b>, so a black ink <b>K</b> gives a true black and better dark colours (and saves ink). <b>K = min(C, M, Y)</b>, then C − K, M − K, Y − K. Why CMYK, not RGB, for printing: inks <b>absorb (subtract)</b> light, which is the subtractive model; RGB is additive (screens).",
     "الـ <b>CMYK</b>: خلط الـ C والـ M والـ Y <b>عمره ما بيدي أسود حقيقي</b>، فالحبر الأسود <b>K</b> بيدّي أسود حقيقي وألوان غامقة أحسن (وبيوفر حبر). القانون:<span class=\"ltr\">K = min(C, M, Y) ;  C − K , M − K , Y − K</span>وليه CMYK مش RGB في الطباعة: الأحبار <b>بتمتص (subtract)</b> الضوء، وده الموديل الـ subtractive؛ أما الـ RGB فـ additive (للشاشات)."
    ],
    [
     "Exam procedure: if values are 0 to 255, <b>normalise ÷ 255 first</b>, then CMY = 1 − RGB, K = min, subtract K; keep about 4 decimals. (60, 210, 130) → CMY (0.7647, 0.1765, 0.4902), K = 0.1765 → CMYK <b>(0.5882, 0, 0.3137, 0.1765)</b>. Values already in 0 to 1, (0.1, 0.5, 0.4) → CMY (0.9, 0.5, 0.6) → <b>(0.4, 0, 0.1, 0.5)</b>.",
     "خطوات الامتحان: لو القيم من 0 لـ 255 <b>اقسم على 255 الأول</b>، وبعدين <bdi dir=\"ltr\">CMY = 1 − RGB</bdi>، والـ K هي الـ min، واطرحها؛ وخلّي حوالي 4 أرقام عشرية. مثال:<span class=\"ltr\">(60, 210, 130) → CMY (0.7647, 0.1765, 0.4902)</span><span class=\"ltr\">K = 0.1765 → CMYK (0.5882, 0, 0.3137, 0.1765)</span>ولو القيم أصلًا من 0 لـ 1:<span class=\"ltr\">(0.1, 0.5, 0.4) → CMY (0.9, 0.5, 0.6) → (0.4, 0, 0.1, 0.5)</span>"
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Size, compression ratio, MSE and MAE (course summary)",
   "ar_h": "الحجم والـ compression ratio والـ MSE والـ MAE (من الـ course summary)",
   "pts": [
    [
     "Colour depth: B/W <b>1</b> bit, grey <b>8</b>, RGB <b>24</b>. Image size = W × H × depth; video = frame × fps × seconds; total file = video + audio. Units: 1 KB = 1024 B, 1 MB = 1024 KB. 1 min of 640 × 480 RGB at 25 fps = 921,600 × 25 × 60 = <b>1,382,400,000 B</b> ≈ 1318.36 MB; plus mono 16-bit speech 60 × 8000 × 16 = 960,000 B.",
     "الـ Colour depth: الأبيض والأسود <b>1</b> bit، والـ grey <b>8</b>، والـ RGB <b>24</b>. القوانين:<span class=\"ltr\">image = W × H × depth ;  video = frame × fps × seconds</span><span class=\"ltr\">total file = video + audio</span>والوحدات <bdi dir=\"ltr\">1 KB = 1024 B</bdi> و<bdi dir=\"ltr\">1 MB = 1024 KB</bdi>. مثال:<span class=\"ltr\">1 min, 640 × 480 RGB, 25 fps = 921,600 × 25 × 60 = 1,382,400,000 B ≈ 1318.36 MB</span>وزيادة عليه mono speech بـ 16-bit:<span class=\"ltr\">60 × 8000 × 16 bits = 960,000 B</span>"
    ],
    [
     "<b>Compression ratio</b> (course convention): <b>CR = size(compressed) / size(original) × 100 %</b>, the <b>same formula for lossy and lossless</b>. 5 × 5 grey (25 B) → 0.01 KB = 10.24 B → <b>40.96 %</b>; → 0.001 KB = 1.024 B → <b>4.096 %</b>. Textbook form is the inverse, original / compressed (2.44 : 1).",
     "الـ <b>Compression ratio</b> (طريقة الكورس):<span class=\"ltr\">CR = size(compressed) / size(original) × 100 %</span>و<b>نفس القانون للـ lossy والـ lossless</b>. أمثلة:<span class=\"ltr\">5 × 5 grey = 25 B → 0.01 KB = 10.24 B → 40.96 %</span><span class=\"ltr\">→ 0.001 KB = 1.024 B → 4.096 %</span>وشكل الكتب هو العكس، الأصل على المضغوط <bdi dir=\"ltr\">(2.44 : 1)</bdi>."
    ],
    [
     "<b>Lossless</b>: the decompressed image <b>equals the original</b> whatever the compressed size, so <b>MSE = MAE = 0</b>. <b>MSE = 1/(MN) ΣΣ (I − I″)²</b>, <b>MAE = 1/(MN) ΣΣ |I − I″|</b>; for colour divide by <b>3MN</b>. [10 15 23] vs [11 15 18] → MSE (1 + 0 + 25)/3 = <b>8.667</b>, MAE (1 + 0 + 5)/3 = <b>2</b>. In another colour space (e.g. CMY), convert both images first.",
     "الـ <b>Lossless</b>: الصورة بعد الـ decompression <b>هي الأصل بالظبط</b> مهما كان الحجم المضغوط، فـ <b><bdi dir=\"ltr\">MSE = MAE = 0</bdi></b>. والقوانين:<span class=\"ltr\">MSE = 1/(MN) ΣΣ (I − I″)² ,  MAE = 1/(MN) ΣΣ |I − I″|</span>وللصور الملونة اقسم على <b>3MN</b>. مثال:<span class=\"ltr\">[10 15 23] vs [11 15 18] → MSE = 26/3 = 8.667 , MAE = 6/3 = 2</span>ولو مطلوب في colour space تاني (زي الـ CMY) حوّل الصورتين الأول."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "Video signals, chroma subsampling and aliasing",
   "ar_h": "الـ Video signals والـ chroma subsampling والـ aliasing",
   "pts": [
    [
     "<b>Component</b> video: each primary a separate signal (best colour, more bandwidth, 3 signals to synchronise). <b>Composite</b>: luminance and chrominance mixed in one carrier (some interference). <b>S-Video</b>: <b>2 lines</b>, luminance + composite chrominance.",
     "الـ <b>Component</b> video: كل primary في إشارة لوحده (أحسن ألوان، bandwidth أكبر، و3 إشارات لازم يتزامنوا). والـ <b>Composite</b>: الـ luminance والـ chrominance مخلوطين في carrier واحد (فيه تداخل). والـ <b>S-Video</b>: <b>سلكين</b>، luminance + composite chrominance."
    ],
    [
     "<b>NTSC</b>: 525 lines, 30 (29.97) fps, 4:3, interlaced 262.5 lines/field, 20 lines per field for control → <b>485</b> visible; <b>YIQ</b>, Y 4, I 1.5, Q 0.6 MHz. <b>PAL</b>: <b>625</b> lines, <b>25 fps</b> (40 ms), 312.5 lines/field; <b>YUV</b>, Y 5.5 MHz, U and V 1.8 MHz each.",
     "الـ <b>NTSC</b>:<span class=\"ltr\">525 lines, 30 (29.97) fps, 4:3, 262.5 lines/field</span>و20 سطر في كل field للتحكم، فالمرئي <b>485</b> سطر؛ وبيستخدم <b>YIQ</b>:<span class=\"ltr\">Y 4 MHz , I 1.5 MHz , Q 0.6 MHz</span>والـ <b>PAL</b>:<span class=\"ltr\">625 lines, 25 fps (40 ms), 312.5 lines/field</span>وبيستخدم <b>YUV</b>:<span class=\"ltr\">Y 5.5 MHz , U and V 1.8 MHz each</span>"
    ],
    [
     "<b>Chroma subsampling</b>: store colour at <b>lower resolution</b> than luma, because the eye is more sensitive to brightness; one of the two main <b>lossy</b> sources in JPEG and MPEG. J:a:b: <b>4:4:4</b> none; <b>4:2:2</b> chroma at half horizontal rate; <b>4:1:1</b> a quarter horizontally; <b>4:2:0</b> half in both directions (store the <b>average of each 2 × 2 block</b>). A 0 third digit means Cb equals the 2nd digit and both are subsampled 2:1 vertically. Samples per 4 pixels: 12, 8, 6, 6.",
     "الـ <b>Chroma subsampling</b>: بنخزّن اللون بـ <b>resolution أقل</b> من الـ luma، لإن العين أحسّ للإضاءة؛ وده واحد من أهم مصدرين للـ <b>lossy</b> في الـ JPEG والـ MPEG. الـ <bdi dir=\"ltr\">J:a:b</bdi>:<span class=\"ltr\">4:4:4 none ; 4:2:2 half horizontal ; 4:1:1 quarter horizontal</span><span class=\"ltr\">4:2:0 half both ways (average of each 2 × 2 block)</span>والـ 0 في الرقم التالت معناه إن الـ Cb زي الرقم التاني والاتنين متعملهم subsampling <bdi dir=\"ltr\">2:1</bdi> رأسي. وعدد الـ samples لكل 4 pixels:<span class=\"ltr\">12 , 8 , 6 , 6</span>"
    ],
    [
     "Subsampling errors: (1) colour at half resolution, <b>not a real problem</b>; (2) <b>integer rounding</b> in RGB → YUV → RGB, much smaller, affecting about 1 or 2 % of pixels, so <b>edit the original</b> rather than recompressing often.",
     "أخطاء الـ subsampling: (1) اللون بنص الـ resolution، <b>ودي مش مشكلة حقيقية</b>؛ (2) الـ <b>integer rounding</b> في <bdi dir=\"ltr\">RGB → YUV → RGB</bdi>، وده تأثيره أصغر بكتير وبيمس حوالي <bdi dir=\"ltr\">1 or 2 %</bdi> من الـ pixels، فـ <b>عدّل على الأصل</b> بدل ما تعيد الـ compression كتير."
    ],
    [
     "Aliasing in images and video (all <b>Nyquist</b>): <b>stair-stepping</b> (jagged angled edges); <b>image zooming</b> (zoom by n divides sample resolution by n); <b>temporal</b> (wagon-wheel spokes reversing, the strobing effect: the wrong rate freezes frames at the wrong moment); <b>raster scan</b> (twinkling on sharp horizontal lines); <b>interlacing</b> (effectively <b>halves</b> the sampling frequency).",
     "الـ Aliasing في الصور والـ video (كله تطبيق للـ <b>Nyquist</b>): الـ <b>stair-stepping</b> (حواف مايلة مسنّنة)؛ والـ <b>image zooming</b> (الـ zoom بـ n بيقسم الـ resolution على n)؛ والـ <b>temporal</b> (برامق العجلة كإنها بترجع لورا، الـ strobing effect: الـ rate الغلط بيوقّف الـ frames في اللحظة الغلط)؛ والـ <b>raster scan</b> (ترعيش على الخطوط الأفقية الحادة)؛ والـ <b>interlacing</b> (عمليًا <b>بيقسم الـ sampling frequency على 2</b>)."
    ]
   ]
  },
  {
   "lec": 8,
   "h": "What the doctors ask",
   "ar_h": "الدكاترة بيسألوا في إيه",
   "pts": [
    [
     "\"Why is CMYK commonly used in colour printing?\" → inks absorb (subtract) light; CMY are the subtractive primaries; mixed CMY is not a true black, so K is added (Final 2021/22 T2, Final 2023/24, Final 2024/25). \"Which colour model does JPEG use?\" → <b>YCrCb</b> (Final 2023/24). \"Compare Lab, YIQ and YUV\" (Final 2022/23 T2).",
     "سؤال \"ليه الـ CMYK بيتستخدم في الطباعة؟\" والإجابة إن الأحبار بتمتص (subtract) الضوء، والـ CMY هي الـ subtractive primaries، وخلط الـ CMY مش أسود حقيقي فبنزوّد الـ K <bdi dir=\"ltr\">(Final 2021/22 T2, Final 2023/24, Final 2024/25)</bdi>. و\"الـ JPEG بيستخدم أنهي colour model؟\" والإجابة <b>YCrCb</b> <bdi dir=\"ltr\">(Final 2023/24)</bdi>. و\"قارن بين الـ Lab والـ YIQ والـ YUV\" <bdi dir=\"ltr\">(Final 2022/23 T2)</bdi>."
    ],
    [
     "Short items (Final 2020/21): RGB (0.25, 0.25, 0.5) → CMY (0.75, 0.75, 0.5), K = <b>0.5</b>; (0.5, 0.25, 0.25) → K = <b>0.5</b>; (0.1, 0.5, 0.4) → CMYK <b>(0.4, 0, 0.1, 0.5)</b>; \"monochrome images are encoded as a triplet\" → <b>False</b>; JPEG is <b>lossy</b> (also Final 2021/22 T1).",
     "أسئلة قصيرة <bdi dir=\"ltr\">(Final 2020/21)</bdi>:<span class=\"ltr\">(0.25, 0.25, 0.5) → CMY (0.75, 0.75, 0.5) , K = 0.5</span><span class=\"ltr\">(0.5, 0.25, 0.25) → K = 0.5</span><span class=\"ltr\">(0.1, 0.5, 0.4) → CMYK (0.4, 0, 0.1, 0.5)</span>وجملة \"الـ monochrome images بتتمثّل بـ triplet\" إجابتها <b>False</b>؛ والـ JPEG <b>lossy</b> (وكمان في <bdi dir=\"ltr\">Final 2021/22 T1</bdi>)."
    ],
    [
     "Whole-image RGB → CMYK in 0 to 255, so ÷ 255 first (Final 2025/26, Final 2024/25, Final 2023/24, Midterm 2021/22, Final 2021/22 T2): e.g. pixel (10, 10, 210) → CMY (0.9608, 0.9608, 0.1765) → CMYK <b>(0.7843, 0.7843, 0, 0.1765)</b>. \"Size after transformation\" (Final 2023/24): 4 channels × 8 bits, so a 5 × 5 image = <b>100 B</b> (75 B in RGB).",
     "تحويل صورة كاملة من RGB لـ CMYK والقيم من 0 لـ 255، فاقسم على 255 الأول <bdi dir=\"ltr\">(Final 2025/26, Final 2024/25, Final 2023/24, Midterm 2021/22, Final 2021/22 T2)</bdi>. مثال:<span class=\"ltr\">(10, 10, 210) → CMY (0.9608, 0.9608, 0.1765) → CMYK (0.7843, 0.7843, 0, 0.1765)</span>و\"الحجم بعد التحويل\" <bdi dir=\"ltr\">(Final 2023/24)</bdi> فيه 4 channels × 8 bits، يعني صورة <bdi dir=\"ltr\">5 × 5</bdi> تبقى <b><bdi dir=\"ltr\">100 B</bdi></b> (كانت <bdi dir=\"ltr\">75 B</bdi> في الـ RGB)."
    ],
    [
     "RGB → YIQ / YUV, no normalising (Midterm 2021/22, Final 2021/22 T2, Final 2022/23 T2): (100, 200, 250) → Y = <b>175.8</b>, I = <b>−75.65</b>, Q = <b>−6.65</b>, U = <b>74.2</b>, V = <b>−75.8</b>; (30, 130, 230) → Y = 111.5, U = <b>118.5</b>, V = <b>−81.5</b>.",
     "تحويل RGB لـ YIQ أو YUV من غير normalising <bdi dir=\"ltr\">(Midterm 2021/22, Final 2021/22 T2, Final 2022/23 T2)</bdi>:<span class=\"ltr\">(100, 200, 250) → Y = 175.8, I = −75.65, Q = −6.65, U = 74.2, V = −75.8</span><span class=\"ltr\">(30, 130, 230) → Y = 111.5, U = 118.5, V = −81.5</span>"
    ],
    [
     "Compression ratio: 5 × 5 grey (25 B) → 0.01 KB → <b>40.96 %</b> (Final 2024/25), → 0.001 KB → <b>4.096 %</b> (Final 2025/26), lossy or lossless alike; \"lossless, compressed to 0.25 KB / 5.5 KB: what is the decompressed image?\" → <b>the original matrix</b> (Final 2024/25, Final 2025/26). Video CR to 1000 KB (Final 2022/23 T2) or 3 MB (Midterm #1): both sizes in bits first.",
     "الـ Compression ratio:<span class=\"ltr\">5 × 5 grey = 25 B → 0.01 KB → 40.96 %</span><bdi dir=\"ltr\">(Final 2024/25)</bdi><span class=\"ltr\">→ 0.001 KB → 4.096 %</span><bdi dir=\"ltr\">(Final 2025/26)</bdi> وده نفس الحساب للـ lossy والـ lossless؛ وسؤال \"lossless واتضغطت لـ <bdi dir=\"ltr\">0.25 KB</bdi> أو <bdi dir=\"ltr\">5.5 KB</bdi>، الصورة بعد الـ decompression إيه؟\" والإجابة <b>الـ matrix الأصلية</b> <bdi dir=\"ltr\">(Final 2024/25, Final 2025/26)</bdi>. والـ CR بتاع الـ video لـ <bdi dir=\"ltr\">1000 KB</bdi> <bdi dir=\"ltr\">(Final 2022/23 T2)</bdi> أو <bdi dir=\"ltr\">3 MB</bdi> <bdi dir=\"ltr\">(Midterm #1)</bdi>: حوّل الحجمين لـ bits الأول."
    ],
    [
     "MSE / MAE: 4 × 4 grey MSE = 287,100/16 = <b>17,943.75</b> and 1-D signal MSE <b>0.2019</b>, MAE <b>0.3813</b> (Final 2020/21); MSE = 236,297/16 = <b>14,768.56</b> (Final 2021/22 T1); colour 5 × 5: MSE 562,400/75 = <b>7498.67</b>, MAE 4480/75 = <b>59.73</b> (Final 2021/22 T2); colour MAE 6600/75 = <b>88</b> (Final 2022/23 Summer); MSE in CMY 6250 on 0 to 255 or <b>0.0961</b> normalised (Final 2022/23 T2). Any \"assuming lossless\" part → <b>0</b> (Final 2021/22 T1 MCQ, Final 2022/23 T2, Final 2022/23 Summer).",
     "الـ MSE والـ MAE:<span class=\"ltr\">4 × 4 grey: MSE = 287,100/16 = 17,943.75</span><span class=\"ltr\">1-D signal: MSE = 0.2019 , MAE = 0.3813</span><bdi dir=\"ltr\">(Final 2020/21)</bdi><span class=\"ltr\">MSE = 236,297/16 = 14,768.56</span><bdi dir=\"ltr\">(Final 2021/22 T1)</bdi><span class=\"ltr\">colour 5 × 5: MSE = 562,400/75 = 7498.67 , MAE = 4480/75 = 59.73</span><bdi dir=\"ltr\">(Final 2021/22 T2)</bdi><span class=\"ltr\">colour MAE = 6600/75 = 88</span><bdi dir=\"ltr\">(Final 2022/23 Summer)</bdi><span class=\"ltr\">MSE in CMY = 6250 (0–255) or 0.0961 (normalised)</span><bdi dir=\"ltr\">(Final 2022/23 T2)</bdi> وأي جزء فيه \"assuming lossless\" إجابته <b>0</b> <bdi dir=\"ltr\">(Final 2021/22 T1 MCQ, Final 2022/23 T2, Final 2022/23 Summer)</bdi>."
    ],
    [
     "Old-syllabus items in the older papers are not in the current notes ‡: PSNR (5.59 dB, Final 2020/21), RLE (lossless), information and entropy, \"higher video bit rate → higher quality\" (Final 2021/22 T1).",
     "فيه أسئلة من منهج قديم في الامتحانات القديمة ومش موجودة في النوتس الحالية ‡: الـ PSNR (<bdi dir=\"ltr\">5.59 dB</bdi> في <bdi dir=\"ltr\">Final 2020/21</bdi>)، والـ RLE (lossless)، والـ information والـ entropy، وجملة \"الـ video bit rate الأعلى بيدي جودة أعلى\" <bdi dir=\"ltr\">(Final 2021/22 T1)</bdi>."
    ]
   ]
  }
 ]
};

// Midterm scope and exam-focused summary for mm: English and Egyptian Arabic per point. Merged by build.mjs.
window.MIDTERM = window.MIDTERM || {};
MIDTERM.mm = {
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
   "h": "What the doctor asks (Lecture 1)",
   "ar_h": "الدكتور بيسأل في إيه (المحاضرة 1)",
   "pts": [
    [
     "True or False: \"A Multimedia Application is an application which uses a collection of multiple media sources\" → <b>True</b> (Exam 2020/21, 2021/22).",
     "صح ولا غلط: \"الـ Multimedia Application هو application بيستخدم مجموعة من مصادر media متعددة\"، والإجابة <b>True</b> <bdi dir=\"ltr\">(Exam 2020/21, 2021/22)</bdi>."
    ],
    [
     "True or False: \"A Multimedia System is a system capable of processing multimedia data and applications\" → <b>True</b> (Exam 2021/22).",
     "صح ولا غلط: \"الـ Multimedia System هو system يقدر يعالج multimedia data وapplications\"، والإجابة <b>True</b> <bdi dir=\"ltr\">(Exam 2021/22)</bdi>."
    ],
    [
     "Fill the blank: \"……… means that computer information can be represented through audio, video, and animation in addition to traditional media\" → <b>Multimedia</b> (Exam 2021/22).",
     "املا الفراغ: \"……… معناها إن معلومات الكمبيوتر ممكن تتمثّل بـ audio وvideo وanimation زيادة على الـ media التقليدية\"، والإجابة <b>Multimedia</b> <bdi dir=\"ltr\">(Exam 2021/22)</bdi>."
    ],
    [
     "Lossy vs lossless True/False: \"MPEG video compression is a lossless compression\" → <b>False</b>; \"MP3 audio compression is a lossy compression\" → <b>True</b> (Exam 2021/22).",
     "صح ولا غلط عن الـ lossy والـ lossless: \"الـ MPEG video compression هو lossless\" والإجابة <b>False</b>؛ و\"الـ MP3 audio compression هو lossy\" والإجابة <b>True</b> <bdi dir=\"ltr\">(Exam 2021/22)</bdi>."
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
   "h": "What the doctor asks (Lecture 2)",
   "ar_h": "الدكتور بيسأل في إيه (المحاضرة 2)",
   "pts": [
    [
     "Fill the blank: \"dB is commonly used to quantify sound levels relative to some ……… dB reference\" → <b>0</b>; the True/False version with \"10 dB\" or \"60 dB\" → <b>False</b> (Exam 2020/21, 2021/22).",
     "املا الفراغ: \"الـ dB بيتستخدم لقياس مستوى الصوت بالنسبة لـ reference قيمته ……… dB\"، والإجابة <b>0</b>؛ ونسخة صح ولا غلط بـ \"<bdi dir=\"ltr\">10&nbsp;dB</bdi>\" أو \"<bdi dir=\"ltr\">60&nbsp;dB</bdi>\" إجابتها <b>False</b> <bdi dir=\"ltr\">(Exam 2020/21, 2021/22)</bdi>."
    ],
    [
     "Fill the blank: \"……… is the offset from the origin where waveform intersects the x-axis\" → <b>Phase</b>; True or False: \"Phase is the initial angle of a sinusoidal function at its origin\" → <b>True</b>.",
     "املا الفراغ: \"……… هي الـ offset من الـ origin اللي الموجة بتقطع عنده محور x\"، والإجابة <b>Phase</b>؛ وصح ولا غلط: \"الـ Phase هي الزاوية الابتدائية للـ sinusoidal function عند الـ origin\"، والإجابة <b>True</b>."
    ],
    [
     "IIR/FIR True/False: \"In FIR systems there is no feedback loop\" → <b>True</b>; \"In IIR systems there is no feedback loop\" → <b>False</b>; \"To develop a more complete FIR system we need to add N − 1 feed-forward delays\" → <b>True</b> (Exam 2020/21).",
     "صح ولا غلط عن الـ IIR والـ FIR: \"الـ FIR مفيهوش feedback loop\" والإجابة <b>True</b>؛ \"الـ IIR مفيهوش feedback loop\" والإجابة <b>False</b>؛ \"عشان تعمل FIR أكمل محتاج تضيف <bdi dir=\"ltr\">N&nbsp;−&nbsp;1</bdi> feed-forward delays\" والإجابة <b>True</b> <bdi dir=\"ltr\">(Exam 2020/21)</bdi>."
    ],
    [
     "Fill the blank: \"Signal-to-noise ratio is a term for the power ratio between a ……… (meaningful information) and the background noise\" → <b>Signal</b> (Exam 2020/21).",
     "املا الفراغ: \"الـ Signal-to-noise ratio هي نسبة الـ power بين ……… (المعلومة المفيدة) والـ background noise\"، والإجابة <b>Signal</b> <bdi dir=\"ltr\">(Exam 2020/21)</bdi>."
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
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل في إيه",
   "pts": [
    [
     "No doctor's questions (exam, midterm or sheet) for this lecture are on the site yet; all its quiz questions are site-written. They practise: static vs continuous media, ADC vs DAC, where the anti-aliasing filter goes, tweening, OpenGL, and image/video size calculations.",
     "لسه مفيش أسئلة للدكتور (امتحان أو midterm أو sheet) للمحاضرة دي على الموقع؛ كل أسئلة الـ quiz مكتوبة من الموقع. وبتتدرب على: الـ static مقابل الـ continuous media، والـ ADC مقابل الـ DAC، ومكان الـ anti-aliasing filter، والـ tweening، والـ OpenGL، وحسابات حجم الـ image والـ video."
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
   "h": "What the doctor asks",
   "ar_h": "الدكتور بيسأل في إيه",
   "pts": [
    [
     "Definitions (Exam 2025/26): sampling frequency = samples per <b>second</b>; unit <b>Hz</b>; Nyquist = at least <b>twice the highest</b> frequency; undersampling → <b>aliasing</b>; oversampling = <b>above</b> the Nyquist rate; higher fs <b>reduces aliasing</b> and captures high frequencies; CD = <b>44.1 kHz</b>.",
     "تعريفات (امتحان <bdi dir=\"ltr\">2025/26</bdi>): الـ sampling frequency هي عدد الـ samples في <b>الثانية</b>؛ ووحدتها <b>Hz</b>؛ والـ Nyquist يعني على الأقل <b>ضعف أعلى</b> frequency؛ والـ undersampling بيعمل <b>aliasing</b>؛ والـ oversampling يعني <b>فوق</b> الـ Nyquist rate؛ والـ fs الأعلى <b>بيقلل الـ aliasing</b> وبيلقط الـ high frequencies؛ والـ CD بيستخدم <b><bdi dir=\"ltr\">44.1&nbsp;kHz</bdi></b>."
    ],
    [
     "True/False traps (Exam 2020/21, 2021/22): \"at most twice\" → False; \"twice the lowest\" → False; \"sampling frequency is not critical\" → False. Minimum fs for fmax 11025 Hz → 22.05 kHz; for 1000 Hz → 2 kHz; given only a MINIMUM frequency → None.",
     "فخاخ الـ <bdi dir=\"ltr\">True/False</bdi> في امتحانات <bdi dir=\"ltr\">2020/21</bdi> و<bdi dir=\"ltr\">2021/22</bdi>، وهي: جملة \"at most twice\" غلط؛ و\"twice the lowest\" غلط؛ و\"sampling frequency is not critical\" غلط. وأقل fs لما الـ fmax تبقى <bdi dir=\"ltr\">11025&nbsp;Hz</bdi> هي <bdi dir=\"ltr\">22.05&nbsp;kHz</bdi>، ولما تبقى <bdi dir=\"ltr\">1000&nbsp;Hz</bdi> هي <bdi dir=\"ltr\">2&nbsp;kHz</bdi>؛ ولو مدّيك أقل frequency بس الإجابة None."
    ],
    [
     "Calculations: limiting sampling interval from x(t) = sum of cos/sin terms (Exam 2020/21: 250πt → 125 Hz → 0.004 s; Midterm 2021/22: 2500πt → 1250 Hz → 0.0004 s); file size in bytes from interval, bits, hours, stereo (500 ms, 64-bit, 5.5 h → 633,600 B); speech → 8 kHz (32-bit, 2.5 h stereo → 576,000,000 B).",
     "حسابات: أقصى sampling interval من <bdi dir=\"ltr\">x(t)</bdi> فيها terms من <bdi dir=\"ltr\">cos/sin</bdi>، زي امتحان <bdi dir=\"ltr\">2020/21</bdi> اللي فيه:<span class=\"ltr\">250πt → 125 Hz → 0.004 s</span>وزي الـ Midterm بتاع <bdi dir=\"ltr\">2021/22</bdi> اللي فيه:<span class=\"ltr\">2500πt → 1250 Hz → 0.0004 s</span>وحجم الملف بالـ bytes من الـ interval والـ bits والساعات والـ stereo:<span class=\"ltr\">500 ms, 64-bit, 5.5 h → 633,600 B</span>والـ speech يعني <bdi dir=\"ltr\">8&nbsp;kHz</bdi>، ومثالها:<span class=\"ltr\">32-bit, 2.5 h, stereo → 576,000,000 B</span>"
    ]
   ]
  }
 ]
};

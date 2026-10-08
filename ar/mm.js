window.AR = window.AR || {};
AR.mm = { lectures: {}, exams: [] };
AR.mm.lectures["1"] = {
  notes: [
    { h: `يعني إيه multimedia؟`, pts: [
      `<b>تعريف من ناحية الـ computer system</b>: معلومات الكمبيوتر ممكن تتمثّل بـ <b>audio وvideo وanimation</b> زيادة على الـ media التقليدية (text، graphics/drawings، images).`,
      `<b>التعريف العام (اللي بنشتغل بيه)</b>: الـ multimedia هو المجال اللي بيهتم بـ <b>الـ integration اللي بيتحكم فيه الكمبيوتر</b> بين الـ text والـ graphics والـ drawings والصور الثابتة والمتحركة (video) والـ animation والـ audio وأي media تانية، بحيث كل نوع معلومات يقدر <b>يتمثّل ويتخزن ويتبعت ويتعالج digitally</b>.`,
      `<b>Multimedia application</b>: أي application بيستخدم مجموعة من مصادر media متعددة، زي text وgraphics وimages وsound/audio وanimation و/أو video.`,
      `محتوى الكورس (مقدمة الكورس): الـ multimedia data (audio، graphics، images، video)، الـ signal processing (filtering، synthesis)، الـ MIDI، والـ compression (JPEG/GIF، MPEG video وaudio). الكتاب المقترح: <i>Fundamentals of Multimedia</i>، Ze-Nian Li و Mark S. Drew.`
    ]},
    { h: `الـ Hypertext والـ hypermedia`, pts: [
      `<b>Hypertext</b>: text فيه <b>links لنصوص تانية</b>. المصطلح ده اخترعه <b>Ted Nelson حوالي سنة 1965</b>.`,
      `التنقل بين صفحات الـ hypertext عادةً بيبقى <b>non-linear</b> (مش بالترتيب). وده بيأثر على شكل وتنظيم المادة، وبيعتمد جامد على الـ application.`,
      `<b>Hypermedia</b>: مش لازم يبقى text بس. ممكن يحتوي media تانية زي graphics وimages وخصوصًا <b>الـ continuous media — الصوت والـ video</b>.`,
      `أمثلة على hypermedia applications: الـ <b>World Wide Web</b> (المثال الواضح)، PowerPoint، Adobe Acrobat (برنامج الـ PDF)، Adobe Flash.`,
      `أمثلة على multimedia applications: الـ WWW، الـ multimedia authoring (Adobe/Macromedia Director)، hypermedia courseware، video-on-demand، interactive TV، الألعاب، الـ virtual reality، أنظمة الـ digital video editing والإنتاج، والـ multimedia database systems. وسلايد "Applications" اللي بعد كده بيزود video conferencing وgroupware والـ home shopping.`
    ]},
    { h: `الـ Multimedia systems: التعريف و4 خصائص`, pts: [
      `<b>Multimedia system</b>: system يقدر يعالج multimedia data وapplications. بيتميز بـ <b>الـ processing والـ storage والـ generation والـ manipulation والـ rendition</b> (العرض) للمعلومات الـ multimedia.`,
      `الأربع خصائص الأساسية: (1) لازم يكون <b>computer controlled</b>؛ (2) يكون <b>integrated</b>؛ (3) المعلومات اللي بيتعامل معاها لازم تتمثّل <b>digitally</b>؛ (4) الـ interface للعرض النهائي للـ media غالبًا بيكون <b>interactive</b>.`
    ]},
    { h: `الـ Challenges والـ key issues`, pts: [
      `<b>الـ Challenges</b>: الـ distributed networks؛ <b>الـ temporal relationship</b> (العلاقة الزمنية) بين الـ data؛ إنك تعرض data مختلفة في نفس الوقت وبشكل continuous؛ <b>الـ sequencing جوه الـ media</b> (تشغيل الـ video frames بالترتيب والتوقيت الصح)؛ <b>الـ synchronisation</b> — inter-media scheduling، زي <b>الـ lip synchronisation</b> بين الـ video والـ audio.`,
      `<b>الـ Key issues</b>: إزاي نمثّل ونخزن المعلومات الزمنية؛ إزاي نحافظ بدقة على العلاقات الزمنية وقت الـ playback/retrieval؛ إيه الـ processes اللي داخلة؛ الـ data لازم تتمثّل digitally (<b>analog–digital conversion، sampling</b>)؛ <b>الـ data requirements كبيرة</b> (bandwidth، storage) فـ <b>الـ data compression غالبًا بيبقى إجباري</b>.`
    ]},
    { h: `المميزات المطلوبة في الـ multimedia system`, pts: [
      `<b>Processing power عالية جدًا</b> — عشان معالجة data كبيرة والـ real-time delivery؛ والـ hardware الخاص منتشر.`,
      `<b>Multimedia-capable file system</b> — عشان يوصّل media في real-time (video/audio streaming)؛ hardware/software خاص زي <b>RAID</b>.`,
      `<b>Data representations</b> — file formats سهل التعامل معاها وفي نفس الوقت تسمح بـ compression/decompression في real-time.`,
      `<b>I/O كفء وعالي</b> — recording وplayback في real-time، زي الـ direct-to-disk recording.`,
      `<b>Operating system خاص</b> — direct transfers للـ disk، real-time scheduling، fast interrupt processing، I/O streaming.`,
      `<b>الـ Storage والـ memory</b> — storage بمئات الـ TB، memory كذا GB، caches كبيرة، high-speed buses.`,
      `<b>Network support</b> — client-server/distributed systems. <b>Software tools</b> — tools سهلة الاستخدام للتعامل مع الـ media، وتصميم/تطوير الـ applications، وتوصيل الـ media.`
    ]},
    { h: `مكونات الـ multimedia system (hardware وsoftware)`, pts: [
      `<b>Capture devices</b>: video camera، video recorder، audio microphone، keyboards، mice، graphics tablets، 3D input devices، tactile sensors، VR devices، digitising hardware.`,
      `<b>Storage devices</b>: hard disks، CD-ROMs، DVD-ROM، إلخ.`,
      `<b>Communication networks</b>: local networks، intranets، Internet، multimedia أو شبكات high-speed خاصة تانية.`,
      `<b>Computer systems</b>: multimedia desktop machines، workstations، MPEG/VIDEO/DSP hardware.`,
      `<b>Display devices</b>: CD-quality speakers، HDTV، SVGA، hi-res monitors، colour printers.`
    ]},
    { h: `الـ Multimedia data: الـ input والـ format والحجم`, pts: [
      `<b>Text/static data</b>: من الـ keyboard أو speech input أو OCR أو disk. 1 byte لكل حرف (أكتر في الـ Unicode). الـ formats: raw text، HTML، RTF، Word، program source. <b>مش temporal</b> (بس ممكن يكون ليه sequence ضمني). الحجم مش مهم.`,
      `<b>Graphics</b>: متبنية من <b>primitive objects</b> (lines، polygons، circles، curves، arcs)؛ بتتعمل بـ graphics editors (Illustrator) أو برامج (PostScript)؛ <b>ينفع تتعدل</b> (عكس الـ images)؛ الـ standards: OpenGL، PHIGS، GKS؛ الملفات بتخزن تجميعة الـ primitives فالـ storage صغير.`,
      `<b>Images</b>: bitmap (grid من الـ pixels)؛ بتتخزن بـ <b>1 bit/pixel</b> (أبيض وأسود)، <b>8 bits/pixel</b> (grey scale، colour map) أو <b>24 bits/pixel</b> (true colour).`,
      `<b>Audio</b>: analog signal متصلة، بتتعمل digitise من الـ microphone. <b>الـ CD quality = 16-bit sampling عند 44.1 kHz</b>؛ الـ audiophile مثلًا 24-bit، 96 kHz. دقيقة mono CD ≈ 5 MB، stereo ≈ 10 MB. غالبًا بيتعمله compression (MP3، AAC، FLAC، Ogg Vorbis).`,
      `<b>Video</b>: سلسلة صور منفصلة، عادةً <b>25 أو 30 أو 50 frame في الثانية</b>. غالبًا لازم يتعمله compression.`
    ]},
    { h: `الخلاصة: الكورس في الأساس عن الـ compression`, pts: [
      `الـ compression الـ <b>Lossless</b>: مثالي (زي zip، unix compress) بس <b>مش كفاية للـ MM data</b> (مش بيصغّر الحجم كفاية).`,
      `الـ compression الـ <b>Lossy</b>: بنرمي الأجزاء اللي مش أساسية (<b>الأقل أهمية للإدراك perceptually</b>) من الـ data stream — يعني بنعمل FILTER للـ data بشكل ما. أمثلة: MP3، JPEG، MPEG video/audio.`,
      `<b>Compression via synthesis</b>: بنعمل encode لـ <b>طريقة صناعة (synthesise)</b> الـ data، وده ممكن ياخد bits أقل بكتير في حالات معينة. أمثلة: vector graphics (Flash)، MPEG video، MP4 (audio)، <b>MIDI</b>.`,
      `ملاحظة من خلاصة الكورس: lossless = zero error، جودة عالية، compression قليل؛ lossy = فيه شوية error، جودة أقل، compression أعلى (زي YouTube بيستخدم lossy).`
    ]}
  ],
  cards: [
    `المجال اللي بيهتم بالـ integration اللي بيتحكم فيه الكمبيوتر بين الـ text والـ graphics والـ drawings والصور الثابتة والمتحركة والـ animation والـ audio وأي media تانية، بحيث كل نوع معلومات يقدر يتمثّل ويتخزن ويتبعت ويتعالج digitally.`,
    `application بيستخدم مجموعة من مصادر media متعددة، زي text وgraphics وimages وsound وanimation و/أو video.`,
    `text فيه links لنصوص تانية. المصطلح اخترعه Ted Nelson حوالي 1965. التنقل فيه non-linear.`,
    `زي الـ hypertext بس مش text بس: فيه graphics وimages وcontinuous media زي الصوت والـ video. مثال: الـ World Wide Web.`,
    `system يقدر يعالج multimedia data وapplications؛ بيتميز بالـ processing والـ storage والـ generation والـ manipulation والـ rendition للمعلومات الـ multimedia.`,
    `Computer controlled؛ integrated؛ المعلومات متمثّلة digitally؛ الـ interface للعرض النهائي غالبًا interactive.`,
    `inter-media synchronisation بين الـ video والـ audio عشان الكلام يطابق حركة البُق؛ ده مثال على الـ challenge بتاع الـ synchronisation.`,
    `لأن الـ multimedia data محتاجة bandwidth وstorage كبيرين جدًا.`,
    `1 bit/pixel أبيض وأسود؛ 8 bits/pixel grey scale أو colour map؛ 24 bits/pixel true colour.`,
    `samples بـ 16-bit عند 44.1 kHz. الدقيقة mono ≈ 5 MB، والـ stereo ≈ 10 MB من غير compression.`,
    `25 أو 30 أو 50 frame في الثانية.`,
    `الـ Graphics متبنية من primitives (lines، polygons، arcs)، ينفع تتعدل وحجمها صغير؛ الـ images عبارة عن pixel bitmaps، حجمها كبير وبتتعدل pixel بـ pixel بس.`,
    `الـ Lossless (zip) بيحتفظ بكل الـ data بس مش كفاية للـ MM data؛ الـ lossy بيرمي الـ data الأقل أهمية perceptually (MP3، JPEG، MPEG).`,
    `بدل ما تبعت الـ data نفسها، بتبعت تعليمات إزاي تتعمل: vector graphics (Flash)، MPEG video، MP4 audio، MIDI.`
  ],
  qa: [
    `1) لازم يكون computer controlled. 2) يكون integrated. 3) المعلومات اللي بيتعامل معاها لازم تتمثّل digitally. 4) الـ interface للعرض النهائي للـ media غالبًا بيكون interactive.`,
    `الـ Challenges: الـ distributed networks، الـ temporal relationships بين الـ data، عرض data مختلفة في نفس الوقت بشكل continuous، الـ sequencing جوه الـ media (الـ frames بالترتيب والتوقيت الصح) والـ inter-media synchronisation زي الـ lip sync. الـ Key issues: تمثيل وتخزين المعلومات الزمنية، الحفاظ بدقة على العلاقات الزمنية وقت الـ playback، الـ processes اللي داخلة، التمثيل الـ digital (A/D conversion، sampling) والـ data requirements الكبيرة، اللي بتخلي الـ compression غالبًا إجباري.`,
    `Processing power عالية جدًا؛ multimedia-capable file system (زي RAID) للـ streaming؛ data representations/file formats تسمح بـ compression وdecompression في real-time؛ I/O عالي وكفء (direct-to-disk recording)؛ operating system خاص (real-time scheduling، fast interrupts، I/O streaming)؛ storage وmemory كبار مع caches وbuses سريعة؛ network support (client-server)؛ software tools سهلة الاستخدام.`,
    `الـ Hypertext هو text فيه links لنصوص تانية (Ted Nelson، حوالي 1965)، وبتتنقل فيه non-linearly. الـ Hypermedia مش مقصور على الـ text: فيه graphics وimages وcontinuous media زي الصوت والـ video. أمثلة على hypermedia: الـ WWW، PowerPoint، Adobe Acrobat، Adobe Flash.`,
    `الطرق الـ lossless زي zip بتحتفظ بكل bit، فمش بتقدر تصغّر الـ audio/image/video data الضخمة بالقدر الكافي. الطرق الـ lossy بترمي الأجزاء الأقل أهمية perceptually (filtering)، زي MP3، JPEG، MPEG. وفيه طريق تاني هو الـ compression via synthesis: تعمل encode لطريقة صناعة الـ data (vector graphics، MIDI، MP4 audio).`
  ],
  quiz: [
    [`دي الخاصية رقم 1.`, `دي الخاصية رقم 2.`, `صح. معلومات الـ multimedia لازم تتمثّل digitally، مش analog.`, `دي الخاصية رقم 4.`],
    [`هو اللي عمل الـ WWW، مش اللي اخترع مصطلح hypertext.`, `صح.`, `Nyquist معروف بالـ sampling theorem.`, `مش مذكور في المحاضرة.`],
    [`الـ plain text مش hypermedia.`, `صح. الـ WWW بيربط text وimages وصوت وvideo.`, `ده مش hypermedia application.`, `الـ RAID ده storage hardware للـ multimedia file systems.`],
    [`صح. الـ video والـ audio لازم يفضلوا ماشيين مع بعض.`, `ده بيخص الـ bandwidth والـ storage.`, `دي challenge تانية منفصلة.`, `دي desirable feature، مش الـ challenge دي.`],
    [`صغير أوي؛ ده يبقى 4 bits لكل pixel.`, `صح. 512 × 512 × 1 byte = 262,144 B = 0.25 MB.`, `ده حجم نسخة الـ 24-bit colour.`, `كبير جدًا.`],
    [`ده الأبيض والأسود.`, `ده الـ grey scale أو الـ colour map.`, `مش مذكور في المحاضرة.`, `صح. 8 bits لكل واحد من R وG وB.`],
    [`ده الـ mono.`, `صح. 44,100 × 2 bytes × 2 channels × 60 s = 10,584,000 B ≈ 10 MB.`, `صغير أوي.`, `ده ثانية واحدة من الـ HD video.`],
    [`ده الـ 512 × 512 monochrome video.`, `صح. 720 × 576 × 3 B ≈ 1.24 MB لكل frame × 25 ≈ 31 MB.`, `ده الـ HD 1920 × 1080.`, `ده frame واحد بس.`],
    [`الـ Lossless مش بيضيّع أي حاجة.`, `صح. الـ MM data ضخمة، فمحتاجين طرق lossy بترمي الـ data الأقل أهمية perceptually.`, `كلام فاضي.`, `الـ Zip بيشتغل على أي file.`],
    [`صح. الـ MIDI بيبعت تعليمات عشان يعمل synthesise للصوت، مش الصوت نفسه.`, `الـ Zip ده lossless compression عام.`, `الـ WAV بيخزن الـ raw samples.`, `الـ bitmap بيخزن كل pixel.`],
    [`ده وصف الـ images.`, `صح.`, `ملفات الـ graphics غالبًا بتبقى صغيرة.`, `الـ Microphones بتلتقط audio.`],
    [`صح. السلايد بيدي الـ RAID كمثال.`, `الـ OCR طريقة لإدخال text.`, `ده graphics standard.`, `ده music protocol.`]
  ],
  extra: [
    [`1024 × 768 × 3 B = 2,359,296 B ÷ 1,048,576 = 2.25 MB — الـ true colour يعني 24 bits = 3 bytes لكل pixel.`, `ده 1024 × 768 × 1 B: حجم الـ 8-bit grey-scale. الـ true colour محتاج 3 bytes لكل pixel، يعني نسيت تضرب ×3.`, `ده حسب الـ 24 bits لكل pixel كأنها 24 bytes (ما قسمتش الـ bits على 8).`, `ده ضرب في 25 fps كأنها ثانية video؛ الصورة الثابتة الواحدة مالهاش frame rate.`],
    [`ده دقيقة واحدة بس mono؛ السؤال بيسأل عن دقيقتين.`, `44,100 × 2 B × 120 s = 10,584,000 B ≈ 10.1 MB — يعني ضعف الـ 5 MB بتاعة الدقيقة الـ mono في المحاضرة.`, `ده يبقى دقيقتين stereo؛ الـ mono فيه channel واحد بس، فمفيش ×2 زيادة.`, `ده الحجم بالـ megabits (الـ 16 bits لكل sample ما اتقسمتش على 8)، مش بالـ megabytes.`],
    [`ده استخدم 1 byte لكل pixel (حالة الـ monochrome)؛ الـ colour محتاج 3 bytes لكل pixel.`, `ده استخدم 25 fps (0.75 × 25)؛ الـ video هنا شغال 30 fps.`, `ده megabits في الثانية — الـ 24 bits لكل pixel ما اتحولتش لـ 3 bytes.`, `الـ frame الواحد = 512 × 512 × 3 B = 0.75 MB؛ × 30 fps = 22.5 MB في الثانية.`],
    [`غلط — التنقل في الـ hypertext/hypermedia غالبًا بيبقى non-linear.`, `غلط — المصطلح اللي اخترعه Ted Nelson سنة 1965 كان hypertext (text فيه links لنصوص تانية).`, `صح — المحاضرة بتعرّف الـ hypermedia إنه hypertext مش مقصور على الـ text.`, `غلط — زي الـ hypertext، الـ hypermedia متبني على links؛ الفرق في أنواع الـ media اللي بتتربط.`],
    [`غلط — الـ feature دي عن توصيل الـ real-time media streams، زي باستخدام RAID.`, `غلط — الـ network support يقصد بيه الـ client-server والـ distributed systems.`, `صح — المحاضرة بتذكر الأربعة دول بالظبط تحت "Special operating system".`, `غلط — الـ feature دي بتخص الـ file formats اللي تسمح بـ compression/decompression في real-time.`],
    [`غلط — الـ capture devices هي inputs زي الكاميرات والمايكات والـ tablets والـ digitising hardware.`, `غلط — الـ storage devices هي hard disks وCD-ROMs وDVD-ROMs، إلخ.`, `غلط — دول الـ LANs والـ intranets والـ Internet والـ high-speed networks الخاصة.`, `صح — دول الـ output/display devices بتوع الـ multimedia system.`],
    [`غلط — الـ synchronisation بيكون بين media مختلفة، زي الـ lip-sync بين الـ video والـ audio؛ هنا فيه medium واحد بس.`, `صح — مثال المحاضرة على الـ sequencing within the media هو تشغيل الـ video frames بالترتيب والتوقيت الصح.`, `غلط — الـ challenge دي عن data متوزعة على networks، مش عن ترتيب الـ frames.`, `غلط — دي key issue عن تمثيل الـ data digitally (sampling)، مش عن ترتيب التشغيل.`],
    [`صح — الـ data requirements الكبيرة (bandwidth، storage) بتخلي الـ compression غالبًا إجباري.`, `غلط — الـ analog data لازم تتعمل digitise (sampling)، ودي قضية منفصلة عن الـ compression.`, `غلط — الـ temporal relationships بنحافظ عليها بالـ synchronisation/scheduling، مش بالـ compression.`, `غلط — الـ zero error خاصية في الـ lossless coding، بس مش هو السبب إن الـ compression مطلوب؛ الـ lossless لوحده مش بيصغّر الـ MM data كفاية.`],
    [`غلط — الـ lossless فعلًا بيدي zero error وجودة عالية، بس الـ compression بتاعه قليل.`, `صح — الخلاصة بتقول lossless = zero error، جودة عالية، compression قليل (LOW)؛ الـ lossy بيدي compression أعلى مع شوية error.`],
    [`صح — المحاضرة بتوصف الـ video كده وبتقول إنه غالبًا لازم يتعمله compression.`, `غلط — ده بالظبط وصف المحاضرة للـ video data.`]
  ]
};

AR.mm.lectures["2"] = {
  notes: [
    { h: `الـ Waveforms والـ sine wave`, pts: [
      `الـ <b>Frequency</b> = عدد الـ cycles في الثانية، وبتتقاس بالـ <b>Hertz (Hz)</b>. الـ <b>Period</b> T = 1/f (مثلًا 8 Hz → T = 1/8 = 0.125 s).`,
      `الـ <b>Wavelength</b> <b>بيتناسب عكسيًا</b> مع الـ frequency (الـ wavelength بيتغير زي 1/frequency): كل ما الـ frequency تعلى → الـ wavelength يقصر.`,
      `الـ sine wave العامة (الـ sampled) اللي بنستخدمها في الكورس: <b>y = A·sin(2π·n·F<sub>w</sub>/F<sub>s</sub>)</b>، حيث A = الـ amplitude، F<sub>w</sub> = الـ frequency بتاعة الموجة، F<sub>s</sub> = الـ sample frequency، n = الـ sample index. الـ <code>sin()</code> في MATLAB بتشتغل بالـ <b>radians</b> (2π rad = 360° = cycle كاملة).`,
      `الـ sine wave بتتوصف بتلات حاجات: الـ <b>amplitude</b> والـ <b>frequency</b> والـ <b>phase</b>: z(t) = a·sin(ω·t + φ). لما تغيّر الـ phase الموجة بتتزحلق على محور الوقت (الـ sinphasedemo بيرسم محور x بالدرجات: 0، 90، 180، 270، 360 …).`,
      `الـ <b>cosine هو sine wave متأخرة/مزاحة 90° في الـ phase</b>.`,
      `<b>مثال محلول</b>: F<sub>w</sub> = 1000 Hz، F<sub>s</sub> = 8000 Hz → F<sub>w</sub>/F<sub>s</sub> = 1/8، يعني الـ cycle الواحدة بتاخد 8 samples. n = 1: y = A·sin(π/4) = 0.7071A؛ n = 2: y = A·sin(π/2) = A؛ n = 4: y = A·sin(π) = 0.`
    ]},
    { h: `الـ decibel (dB) والـ dynamic range والـ SNR`, pts: [
      `الـ Power/intensity بالـ decibels: <b>X<sub>dB</sub> = 10·log<sub>10</sub>(X / X<sub>0</sub>)</b>. X = القيمة المقاسة، X<sub>0</sub> = الـ reference level؛ ولازم X وX<sub>0</sub> يكونوا <b>بنفس الأبعاد والوحدات</b>.`,
      `الـ reference level دايمًا <b>0 dB</b> (لو X = X<sub>0</sub> → log<sub>10</sub>(1) = 0). لو X > X<sub>0</sub> → dB موجبة (الـ power زادت)؛ لو X &lt; X<sub>0</sub> → dB سالبة (الـ power قلّت).`,
      `ليه بنستخدم dB؟ الوحدات الـ logarithmic بتتستخدم لما يكون فيه <b>range كبير</b> في الـ frequency أو الـ magnitude (السلايدز حتى بتعرض مقياس حرارة الشطّة كمثال على dynamic range واسع).`,
      `الـ Power magnitude = |X(i)|<sup>2</sup>، فـ X<sub>dB</sub> = 10·log<sub>10</sub>(|X(i)|<sup>2</sup>) = <b>20·log<sub>10</sub>(|X(i)|)</b>: استخدم 10·log للـ power، و20·log للـ amplitude.`,
      `في الـ acoustics الـ 0 dB reference عادةً بيبقى <b>threshold of human perception</b> (أقل حاجة الإنسان يسمعها). نسبة أعلى power لأقل power الودن بتستحملها أكتر من تريليون (10<sup>12</sup>) → الـ log = 12 → <b>120 dB = threshold of pain</b>.`,
      `الودن أكتر حساسية بين <b>2 و4 kHz (الكلام)</b>؛ والـ <b>frequency weighting</b> بيدّي الـ range ده وزن أكبر. الـ filtering لـ bands في الـ range ده بيتستخدم في تحليل الكلام، وفي عمل model للسمع البشري، وفي الـ audio compression (MPEG audio).`,
      `<b>Digital noise: 6 dB لكل bit</b> (في الـ linear PCM). أول bit (الـ LSB) بيدي residual quantisation noise؛ وكل bit زيادة بيضاعف الـ resolution = 10·log<sub>10</sub>(4) ≈ 6 dB. الـ 16-bit: 15 × 6 = <b>90 dB</b> dynamic range؛ الـ 8-bit: 7 × 6 = <b>42 dB</b>؛ الفرق 48 dB = 48/6 = <b>8 times as noisy</b> (زي ما السلايد بتقولها).`,
      `الـ <b>Signal-to-noise ratio</b>: SNR = P<sub>signal</sub>/P<sub>noise</sub> = (A<sub>signal</sub>/A<sub>noise</sub>)<sup>2</sup>، حيث P = الـ average power، A = الـ RMS amplitude، وبيتقاسوا عند نقط متكافئة وفي نفس الـ bandwidth. SNR<sub>dB</sub> = 10·log<sub>10</sub>(P<sub>s</sub>/P<sub>n</sub>) = 20·log<sub>10</sub>(A<sub>s</sub>/A<sub>n</sub>).`
    ]},
    { h: `الـ Signal flow graphs: delay وmultiply وadd`, pts: [
      `الـ DSP algorithms بتترسم كـ <b>signal flow graphs</b> وبتتوصف بمعادلة. فيه تلات building blocks: <b>Delay</b>، <b>Multiplication</b>، <b>Summation</b>.`,
      `الـ <b>Delay</b> بمقدار sampling interval واحد: block مكتوب عليه <b>T</b>: y(n) = x(n − 1). اتنين T ورا بعض: y(n) = x(n − 2).`,
      `الـ <b>Multiplication</b> (weighting): دايرة فيها <b>×</b> ومعاها coefficient a: y(n) = a·x(n)، مثلًا a = 0.5 بتقسم الـ signal على اتنين.`,
      `الـ <b>Addition</b>: دايرة فيها <b>+</b>: y(n) = a<sub>1</sub>·x<sub>1</sub>(n) + a<sub>2</sub>·x<sub>2</sub>(n)؛ ولو a<sub>1</sub> = a<sub>2</sub> = 1: y(n) = x<sub>1</sub>(n) + x<sub>2</sub>(n).`,
      `مثال كامل: <b>y(n) = ½x(n) + ⅓x(n − 1) + ¼x(n − 2)</b> (2 delays، 3 multipliers، adder واحد). الـ <b>impulse response</b> بتاعه (الـ input 1، 0، 0، …) هو ½، ⅓، ¼، 0، 0، … (finite).`,
      `<b>مثال محلول</b>: input x = 2، 4، 6 (وبعدين أصفار) داخل على الـ filter ده:<br>y(0) = ½·2 = 1<br>y(1) = ½·4 + ⅓·2 = 2 + 0.667 = 2.667<br>y(2) = ½·6 + ⅓·4 + ¼·2 = 3 + 1.333 + 0.5 = 4.833<br>y(3) = ⅓·6 + ¼·4 = 2 + 1 = 3<br>y(4) = ¼·6 = 1.5، وبعدين 0.`
    ]},
    { h: `الـ Filtering؛ الـ IIR والـ FIR systems`, pts: [
      `الـ <b>Filtering</b> (بالمعنى الواسع) = إنك تختار جزء (أو أجزاء) من الـ data عشان تعمل عليه processing: إما <b>تشيله</b> (low-pass، high-pass …)، أو <b>تعمله attenuate</b> (تقويه أو تضعّفه، زي الـ equalisation، والـ effects/synthesis)، أو <b>تعالجه بطرق تانية</b>.`,
      `شيل الـ data أساسي في كل الـ representations الـ <b>lossy</b> تقريبًا: JPEG، MPEG video، MPEG audio. وفي الـ audio كمان بنعمل filter للـ tone (treble/bass)، والـ equalisation (EQ)، والـ subtractive synthesis.`,
      `فيه طريقتين للـ filtering: في الـ <b>temporal domain</b> (زي الـ sampled PCM audio، عن طريق الـ impulse responses) أو في الـ <b>frequency domain</b> (بنحلل الـ frequency components).`,
      `الـ <b>IIR (Infinite Impulse Response)</b>: الـ output <b>بيرجع تاني (fed back)</b> عن طريق weighted delays وبيتجمع على الـ output الجديد → <b>recursive</b> (feedback) system. البسيط: y(n) = x(n) − a<sub>1</sub>y(n − 1) − a<sub>2</sub>y(n − 2). العام: <b>y(n) = x(n) − Σ<sub>k=1..M</sub> a<sub>k</sub>·y(n − k)</b>.`,
      `الـ <b>FIR (Finite Impulse Response)</b>: أبسط، و<b>مفيهوش feedback loop</b>؛ الـ input بيعدّي على delay elements وweighted sum بيدّي الـ output. البسيط: y(n) = b<sub>0</sub>x(n) + b<sub>1</sub>x(n − 1) + b<sub>2</sub>x(n − 2). العام بـ N − 1 feed-forward delays: <b>y(n) = Σ<sub>k=0..N−1</sub> b<sub>k</sub>·x(n − k)</b>.`,
      `<b>مثال IIR محلول</b>: y(n) = x(n) − a<sub>1</sub>y(n − 1) مع a<sub>1</sub> = −0.5 (يعني y(n) = x(n) + 0.5y(n − 1)). الـ impulse input 1، 0، 0، … بيدّي 1، 0.5، 0.25، 0.125، … — عمره ما بيوصل صفر بالظبط، وعشان كده اسمه "infinite" impulse response.`,
      `الـ Filters عبارة عن 2 coefficient vectors: <b>A = {a<sub>k</sub>}</b> (feedback) و<b>B = {b<sub>k</sub>}</b> (feed-forward). الـ <code>filter(B,A,X)</code> في MATLAB بتنفذ IIR/FIR hybrid اسمه "Direct Form II Transposed": a(1)y(n) = b(1)x(n) + … + b(nb+1)x(n − nb) − a(2)y(n − 1) − … − a(na+1)y(n − na). لو a(1) ≠ 1 الـ coefficients بتتعمل normalise بالقسمة على a(1)؛ ولو a(1) = 0 بيطلع error.`,
      `الـ Filter banks ممكن <b>تتعمل بالإيد</b> (زي IIRdemo.m: cut-off fg = 4000 Hz، sampling fa = 48000 Hz، k = tan(π·fg/fa)، coefficients من الـ 2nd-order b(1..3)، a(1..3) مع a(1) = 1) أو بـ functions في MATLAB: <code>butter, buttord, besself, cheby1, cheby2, ellip</code>. لما تطبقها بالإيد بتستخدم state variables xh1، xh2، yh1، yh2 جوه loop؛ بس <code>filter()</code> أحسن لأنها عامة (أي طول للـ filter).`
    ]},
    { h: `الـ Frequency domain والـ Fourier Transform`, pts: [
      `الـ <b>Fourier Transform (FT)</b> بيحوّل الوصف الزمني (time) أو المكاني (spatial) لـ <b>frequency domain</b>: بنفكر في الـ sinusoids اللي تحت الـ signal بـ <b>frequency وamplitude وphase</b> مختلفين، مش في intensities الـ samples/pixels.`,
      `الاستخدامات: filtering، noise removal، تحليل الـ signals/images، تنفيذ بسيط للـ <b>convolution</b>، audio/image effects، الـ restoration (deblurring)، الـ compression (MPEG وJPEG بيستخدموا تقنيات قريبة).`,
      `مثال 1D audio: الـ chord بتاع البيانو ممكن يتوصف في الـ <b>temporal domain</b> (الـ amplitude متاخد منه samples كتير في الثانية) أو في الـ <b>frequency domain</b> (الـ pitches بتاعة النوتات والـ amplitudes بتاعتها). الـ fundamentals بتاعة الـ chord: D♭ 554.40 Hz، F 698.48 Hz، A♭ 830.64 Hz، C 1046.56 Hz، زائد الـ harmonics.`,
      `الـ <b>sine wave بـ 8 Hz</b> بتعمل 8 cycles في الثانية؛ والـ spectrum بتاعها فيه <b>peak واحدة عند 8 Hz</b> بـ magnitude 1.0 (الـ signal كلها).`,
      `في الـ Images: الـ brightness على خط ممكن تتسجل عند مسافات متساوية أو عند مجموعة <b>spatial frequencies</b>؛ والصورة بتدّي grid 2D من الـ spatial frequencies. لو فيه <b>high-frequency components كبيرة</b> → الـ data بتتغير بسرعة على مسافات قصيرة (زي صفحة text؛ والـ noise كمان بيدّي frequencies عالية جدًا). لو فيه <b>low-frequency components كبيرة</b> → الـ features الكبيرة هي المسيطرة (زي object بسيط واحد مالي الصورة).`,
      `الـ <b>Sinusoidal decomposition</b>: أي digital signal ينفع يتفكك لـ sine waves بـ amplitude وfrequency وphase مختلفين، ولما تجمعهم ترجع الـ original. مثال (additive synthesis): square(ish) wave بـ 200 Hz = sinusoids عند <b>200، 600، 1000 Hz …</b> (المضاعفات الفردية).`,
      `الـ Filtering في الـ frequency space = إنك تعمل attenuate أو تشيل frequencies: <b>low-pass</b> (تتجاهل الـ high-frequency noise وتسيب الـ low)، <b>high-pass</b> (العكس)، <b>band-pass</b> (range معين بس). فكّر في الـ <b>graphic equaliser</b>.`,
      `أدوات رياضة للتذكير: sin(−x) = −sin(x) (odd)، cos(−x) = cos(x) (even)؛ الـ phasor r·e<sup>iφ</sup> = r(cos φ + i sin φ)؛ ∫e<sup>kx</sup>dx = e<sup>kx</sup>/k.`
    ]},
    { h: `قوانين الـ FT والـ DFT والـ spectra`, pts: [
      `الـ <b>1D FT</b>: F(u) = ∫ f(x)·e<sup>−2πixu</sup> dx (من −∞ لـ ∞). الـ F(u) غالبًا بيطلع <b>complex</b> حتى لو الـ data real: الـ magnitude والـ <b>phase</b> الاتنين مهمين؛ والـ e<sup>−2πixu</sup> ده phasor.`,
      `الـ <b>Inverse FT</b>: f(x) = ∫ F(u)·e<sup>+2πixu</sup> du — نفس الشكل، بس إشارة الأُس عكس (موجبة).`,
      `<b>مثال الـ Top-hat</b>: f(x) = 1 لما |x| ≤ 1، و0 غير كده → F(u) = (−1/2πiu)(e<sup>−2πiu</sup> − e<sup>2πiu</sup>) = <b>sin(2πu)/(πu)</b>، اللي هي الـ <b>sinc function</b>. هي real بالكامل لأن f <b>even</b> (متماثلة بين x و−x). أعلى قيمة لما u → 0 بتبقى 2 (مساحة الـ top hat)؛ والأصفار عند u = ±0.5، ±1، ±1.5 …`,
      `الـ <b>2D FT</b> (للصور): F(u,v) = ∬ f(x,y)·e<sup>−2πi(xu+yv)</sup> dx dy؛ والـ inverse بيستخدم +.`,
      `الـ <b>DFT</b> (للـ data الـ digitised): بنبدّل الـ integral بـ sum على N sample متساويين المسافات: <b>F(u) = (1/N) Σ<sub>x=0..N−1</sub> f(x)·e<sup>−2πixu/N</sup></b>، والـ inverse f(x) = Σ F(u)·e<sup>2πixu/N</sup>. الفرق عن الـ continuous: factor 1/N جوه الأُس، و1/N قدام الـ forward transform بس.`,
      `الـ 2D DFT على grid N × M: F(u,v) = (1/NM) ΣΣ f(x,y)e<sup>−2πi(xu/N+yv/M)</sup>. وللصور المربعة (N = M) بيتعمله rebalance بـ 1/N قدام الـ forward والـ inverse الاتنين.`,
      `في MATLAB: <code>fft(X)</code> 1D (لو على matrix: لكل column لوحده، مش 2D)، <code>fft2(X)</code> 2D، <code>fftn(X)</code> N-D؛ والـ inverses هي <code>ifft, ifft2, ifftn</code>.`,
      `الـ <b>Magnitude spectrum</b>: |F(k)| = √(F<sub>R</sub>(k)<sup>2</sup> + F<sub>I</sub>(k)<sup>2</sup>) (في MATLAB <code>abs(fft(X,N))/N</code>). الـ <b>Phase spectrum</b>: φ = arctan(F<sub>I</sub>(k)/F<sub>R</sub>(k)) (<code>angle</code>). مثال: F = 3 + 4i → |F| = 5، φ = arctan(4/3) ≈ 53.13°.`,
      `<b>من الـ sample point للـ frequency</b>: <b>f<sub>k</sub> = k·f<sub>s</sub>/N</b>، خطوات متساوية كل واحدة f<sub>s</sub>/N من 0 لحد (N−1)f<sub>s</sub>/N Hz. مثال: f<sub>s</sub> = 8000 Hz، N = 256 → الخطوة 31.25 Hz، k = 32 → 1000 Hz.`,
      `الـ <b>Spectrogram</b> (time-frequency): بتقسم الـ signal لـ segments وتعمل <b>Short-Time Fourier Transform (STFT)</b> بـ window؛ والـ window من نوع <b>Blackman أو Hamming أو Hanning</b> بيقلل الـ leakage effect. في MATLAB <code>spectrogram(y,512,20,1024,Fs)</code>. والـ Aphex Twin مشهور إنه خبّى صور (وشّه) جوه الـ spectrogram بتاع tracks في الـ Windowlicker EP.`
    ]},
    { h: `الـ Filtering في الـ frequency domain`, pts: [
      `الـ Noise (الـ hiss في الصوت، الـ "salt and pepper" في الصور، noise الإرسال زي من space probe قدرته ضعيفة) = <b>high frequencies</b> مش حقيقية (تغيّرات محلية سريعة). فالـ <b>low-pass filter</b> لو متظبط صح بيقلل الـ noise. بس مش كل الـ high-frequency data تبقى noise.`,
      `الخطوات: <b>G(u,v) = H(u,v)·F(u,v)</b>: F = الـ FT بتاع الصورة، H = الـ filter function، G = الـ FT بتاع الصورة بعد التحسين؛ وبعدين تعمل inverse FT لـ G عشان تطلع g(x,y). (في MATLAB: <code>G = H.*F</code>.)`,
      `الـ <b>Ideal low-pass</b> (1D): H(u) = 1 لما 0 ≤ u ≤ u<sub>0</sub> (الـ cut-off)، و0 في أي مكان تاني — يعني top hat. في الـ 2D: H(u,v) = 1 لو √(u<sup>2</sup> + v<sup>2</sup>) ≤ w<sub>0</sub>، غير كده 0 (بنحتفظ بدايرة نص قطرها w<sub>0</sub>). مثال: w<sub>0</sub> = 20، (u,v) = (12,16) → √400 = 20 → بتتساب؛ (15,16) → √481 ≈ 21.9 → بتترمي.`,
      `المشكلة: فيه high frequencies مفيدة برضه (في الصوت: الـ pitches العالية، الـ cymbals، الخشخشة؛ في الصور: الـ <b>edges</b>). اختيار الـ cut-off صعب (زي اختيار threshold). لو الـ cut-off غلط/واطي بيحصل <b>blur</b>: الصوت يبقى <b>مكتوم (muffled)</b>، وحواف الصورة تبقى مش واضحة؛ وكل ما الـ cut-off يوطى، كل ما الموضوع يبوظ أكتر.`,
      `الـ <b>Butterworth low-pass</b>: <b>H(u,v) = 1 / (1 + [(u<sup>2</sup> + v<sup>2</sup>)/w<sub>0</sub><sup>2</sup>]<sup>n</sup>)</b>، n = الـ order. ده <b>top hat ناعم (smoothed)</b> (دايرة مـ blurred في الـ 2D): بيحتفظ بشوية high-frequency information فـ <b>بيقلل الـ blurring</b>/الـ ringing مقارنةً بالـ ideal filter. عند الـ cut-off بالظبط H = 1/2؛ والـ 2nd order عند ضعف الـ cut-off: 1/(1 + 4<sup>2</sup>) = 1/17 ≈ 0.059.`,
      `الـ Noise بيتضاف في MATLAB بـ <code>imnoise()</code>؛ والـ cut-off الأوطى بيشيل noise أكتر بس بيعمل blur أكتر.`,
      `Filters تانية: <b>high-pass</b> (بتختار اللي فوق u<sub>0</sub>؛ وعادةً بتتعرّف إنها <b>1 − low-pass = 1 − H</b>)، <b>band-pass</b> (بتحتفظ بـ u<sub>0</sub>…u<sub>1</sub>)، <b>band-reject</b> (بتعمل attenuate لـ u<sub>0</sub>…u<sub>1</sub>)، <b>notch</b> (بتعمل attenuate لـ band ضيق حوالين u<sub>0</sub>)، <b>resonator</b> (بتعمل amplify لـ band ضيق حوالين u<sub>0</sub>).`
    ]},
    { h: `الـ Convolution والـ convolution theorem والـ deconvolution`, pts: [
      `Effects بتتوصف بالـ convolution: الـ <b>filtering</b> (الـ Fourier filtering هو convolution مع low-pass filter)، الـ <b>deblurring</b> (high-pass filtering)، الـ <b>reverb</b> (convolution مع impulse response)؛ والـ edge detection كان مثال discrete.`,
      `الـ <b>1D convolution</b>: f(x) * g(x) = ∫ f(α)·g(x − α) dα. الـ g(−α) هي انعكاس g حوالين محور y، والـ g(x − α) هي نفس الانعكاس متزحلق يمين بمقدار x؛ والـ integral هو <b>مساحة التداخل (area of overlap)</b>.`,
      `مثال: f = top hat (1 لما |α| ≤ 1)، g = ½ لما 0 ≤ α ≤ 1. النتيجة: (x + 1)/2 لما −1 ≤ x ≤ 0؛ ½ لما 0 ≤ x ≤ 1؛ 1 − x/2 لما 1 ≤ x ≤ 2؛ و0 غير كده (مفيش تداخل لما x ≤ −1 أو x ≥ 2). تحقق: x = −0.5 → 0.25؛ x = 1.5 → 0.25.`,
      `الـ <b>Convolution theorem</b>: الـ FT بتاع f(x) * g(x) هو ببساطة <b>حاصل الضرب F(u)·G(u)</b>. الـ convolution في الـ frequency space سهل (مجرد ضرب)، وعشان كده <code>G = H.*F</code> بتشتغل.`,
      `الـ Fast convolution / الـ <b>deconvolution</b>: اعمل FT للـ audio/image، واعمل FT لتأثير الـ system، و<b>اضرب</b> عشان تطبق effect (زي الـ reverb) أو <b>اقسم</b> عشان تشيله/تعوّضه، وبعدين inverse FT. لما تقسم صورة اتعملها blur بـ Butterworth على H (<code>Ghigh = G./H</code>) ده بيشتغل زي high-pass filter وبيرجّع F في الحالة المثالية.`,
      `في الواقع الـ blurring function H بالظبط بتبقى مش معروفة، والـ noise بيبوّظ الـ deconvolution (الـ noise بيتضخّم): <b>الـ deconvolution مش دايمًا بالبساطة دي</b>.`
    ]}
  ],
  cards: [
    `عدد الـ cycles في الثانية، وبتتقاس بالـ Hertz (Hz). الـ Period T = 1/f.`,
    `الـ Wavelength بيتناسب عكسيًا مع الـ frequency.`,
    `y = A.sin(2*pi*n*Fw/Fs): الـ A هي الـ amplitude، الـ Fw هي frequency الموجة، الـ Fs هي الـ sample frequency، والـ n هو الـ sample index.`,
    `XdB = 10 log10(X/X0) للـ power؛ و20 log10 للـ amplitude. الـ reference level بيبقى 0 dB.`,
    `120 dB: نسبة أعلى power لأقل power حوالي 10^12، والـ log = 12.`,
    `حوالي 6 dB لكل bit (10 log10 4). الـ 16-bit = 90 dB، والـ 8-bit = 42 dB dynamic range.`,
    `Psignal/Pnoise = (Asignal/Anoise)^2؛ وبالـ dB: 10 log10 لنسبة الـ power = 20 log10 لنسبة الـ RMS amplitude.`,
    `Delay (block مكتوب عليه T)، Multiplication (دايرة فيها x)، Summation (دايرة فيها +).`,
    `Infinite impulse response: الـ output بيرجع تاني عن طريق weighted delays (recursive). y(n) = x(n) - sum ak y(n-k).`,
    `Finite impulse response: مفيش feedback؛ weighted sum للـ inputs المتأخرة (delayed). y(n) = sum bk x(n-k).`,
    `fk = k * fs / N.`,
    `الـ sinc function sin(2*pi*u)/(pi*u)، وهي real بالكامل لأن الـ top hat even.`,
    `H = 1/(1 + [(u^2+v^2)/w0^2]^n)؛ top hat ناعم (smoothed) بيعمل blur أقل من الـ ideal filter.`,
    `الـ High-pass = 1 - low-pass (يعني 1 - H).`,
    `الـ FT بتاع f*g بيساوي F(u)G(u): الـ convolution في الـ space/time هو ضرب في الـ frequency.`
  ],
  qa: [
    `الـ IIR (infinite impulse response) filters بترجّع الـ output تاني عن طريق weighted delays وبتجمعه على الـ output الجديد، فهي recursive والـ impulse response بتاعها مش بيخلص: y(n) = x(n) - sum(k=1..M) ak y(n-k). الـ FIR filters مفيهاش feedback loop؛ الـ input بيعدّي على delay elements والـ weighted sum بتاع الـ inputs المتأخرة بيدّي الـ output، فالـ impulse response بيبقى finite: y(n) = sum(k=0..N-1) bk x(n-k). والـ FIR هو الأبسط فيهم.`,
    `الـ dB ده scale لوغاريتمي للحاجات اللي ليها range كبير جدًا (زي الـ power range بتاع الودن 10^12 = 120 dB). في الـ linear PCM أول bit بيدي quantisation noise بس، وكل bit بعده بيضاعف الـ resolution، وده 10 log10(4) = حوالي 6 dB. الـ 16-bit audio فيه 15 bit بعد الأول، يعني 15 x 6 = 90 dB بين الـ quantisation noise والـ clipping (والـ 8-bit بيدي 7 x 6 = 42 dB).`,
    `احسب F(u,v) = الـ FT بتاع الصورة، واضربه في filter H(u,v) عشان تطلع G = H.F، وبعدين اعمل inverse transform لـ G عشان تطلع الصورة بعد الـ filtering. الـ ideal filter بيحتفظ بكل الـ frequencies اللي جوه نص القطر w0 وبيرمي الباقي. وبما إن الـ edges والتفاصيل المفيدة التانية برضه high frequency، فالـ cut-off لو متختار غلط (واطي أوي) بيعمل blur للـ edges في الصور وبيكتم الصوت (muffled). الـ Butterworth filter (top hat ناعم) بيحتفظ بشوية high frequencies وبيقلل الـ blurring.`,
    `الـ Fourier transform بتاع f(x)*g(x) هو F(u)G(u). فعشان نطبق effect (زي الـ reverb) بنضرب الـ transforms؛ وعشان نشيل effect (زي الـ blur) بناخد الـ FT بتاع الـ data المتبوظة والـ FT بتاع تأثير الـ system، ونقسم، ونعمل inverse transform. وده اسمه deconvolution. عمليًا الـ blurring function بالظبط بتبقى مش معروفة والـ noise بيصعّب الموضوع.`,
    `بيوريك الـ sinusoids اللي الـ signal متكونة منها (frequency، amplitude، phase). للصوت بيديك الـ pitches والـ amplitudes بتاعتها (مثلًا sine بـ 8 Hz ليها peak واحدة عند 8 Hz). للصورة، لو الـ high-frequency components كبيرة يبقى فيه تغيّرات سريعة على مسافات قصيرة (text، edges، noise)؛ ولو الـ low-frequency components كبيرة يبقى الـ features الكبيرة هي المسيطرة.`
  ],
  quiz: [
    [`ده F<sub>w</sub>.`, `صح. الـ F<sub>s</sub> هو الـ sampling frequency؛ والـ n هو الـ sample index.`, `ده A.`, `الـ Phase مش term لوحده في الشكل ده من القانون.`],
    [`الـ 3 dB هي power ratio = 2.`, `صح. 10·log<sub>10</sub>(1000) = 10 × 3 = 30 dB.`, `ده يبقى 20·log<sub>10</sub>(1000)، قانون الـ amplitude، بس هنا دي power ratio.`, `الـ dB لوغاريتمي، مش النسبة نفسها.`],
    [`ده 16 × 6. المحاضرة بتعدّ الـ 15 bit اللي بعد الأول بس (الـ LSB بيدي quantisation noise بس).`, `صح. 15 × 6 = 90 dB.`, `ده الـ 8-bit audio (7 × 6).`, `ده الفرق بين الـ 16-bit والـ 8-bit.`],
    [`الـ log بتاع 10<sup>12</sup> هو 12، بس الـ dB بيضرب في 10.`, `واطي أوي.`, `صح. power ratio أكتر من 10<sup>12</sup> → 10 × 12 = 120 dB.`, `عالي أوي.`],
    [`ده ½·6 بس؛ الـ delayed terms ناقصة.`, `صح. ½·6 + ⅓·4 + ¼·2 = 3 + 1.333 + 0.5 = 4.833.`, `ده y(1).`, `الـ filter بيدّي weights للـ inputs، مش بينسخها.`],
    [`الـ FIR مفيهوش feedback؛ بيستخدم الـ delayed inputs بس.`, `صح. الـ output y(n − k) بيرجع تاني عن طريق weighted delays.`, `الـ IIR بس هو اللي بيرجّع الـ output.`, `الـ IIR هو الـ recursive.`],
    [`الـ feedback بيفضل يطلّع قيم مش صفر.`, `صح. كل output نص اللي قبله: infinite impulse response (IIR).`, `ده كان محتاج coefficient = 1.`, `y(0) = x(0) = 1.`],
    [`الـ k ده index، مش frequency.`, `راجع: 32 × 8000 / 256.`, `صح. f<sub>k</sub> = k·f<sub>s</sub>/N = 32 × 8000 / 256 = 1000 Hz (خطوات 31.25 Hz).`, `ده الـ sampling frequency نفسها.`],
    [`لأ؛ الـ ideal low-pass filter هو اللي شكله top hat في الـ frequency space، بس الـ FT بتاع الـ top hat هو sinc.`, `صح. وهي real بالكامل لأن الـ top hat even.`, `الـ spike الواحدة هي الـ spectrum بتاع pure sine.`, `مش صح.`],
    [`الـ low-pass filter بيقلل الـ noise.`, `صح. الـ edges تغيّرات سريعة، فلما تشيل الـ high frequencies بتعملها blur (وبتكتم الصوت).`, `ملهاش علاقة.`, `الـ low-pass filter بيحتفظ بالـ low frequencies.`],
    [`التربيع مش بيعكس الـ pass band.`, `القسمة على H بتتستخدم في الـ deconvolution، مش التعريف العادي للـ high-pass.`, `صح. High pass = 1 − low pass.`, `ده بيدّي قيم سالبة.`],
    [`الجمع في الـ time بيبقى جمع في الـ frequency، مش convolution.`, `صح. الـ convolution بيتحول لضرب بسيط في الـ frequency space.`, `القسمة بتتستخدم عشان تلغي effect (deconvolution).`, `الـ convolution بين الـ transforms بيقابله ضرب f وg في الـ domain الأصلي، مش convolution بينهم.`],
    [`مذكور في المحاضرة.`, `مذكور في المحاضرة.`, `مذكور في المحاضرة.`, `صح. الـ Butterworth ده filter، مش STFT window.`]
  ],
  extra: [
    [`ده خلط بين الـ period والـ frequency؛ الـ period هو المقلوب 1/f.`, `ده 1/40، غلطة في العلامة العشرية؛ 1/250 = 0.004.`, `غلط بمعامل 10؛ 1/250 = 0.004 s.`, `T = 1/f = 1/250 = 0.004 s (4 ms).`],
    [`F<sub>w</sub>/F<sub>s</sub> = 1/8، فالزاوية 2π·6/8 = 3π/2 وsin(3π/2) = −1، فالناتج −A.`, `الـ sin(π/2) = 1 بتحصل عند n = 2، مش n = 6؛ عند n = 6 الموجة بتبقى عند الـ peak السالبة.`, `الـ y = 0 عند n = 0، 4، 8 (الزوايا 0، π، 2π)؛ والـ n = 6 بتدّي 3π/2.`, `ده sin(π/4) أو sin(3π/4) (n = 1 أو n = 3)؛ عند n = 6 الـ sine = −1.`],
    [`للـ amplitudes استخدم 20·log<sub>10</sub>: 20 × log<sub>10</sub>(1000) = 20 × 3 = 60 dB.`, `ده استخدم 10·log<sub>10</sub>، اللي هو للـ power ratios؛ الـ amplitude ratio محتاجة 20·log<sub>10</sub>.`, `ده log<sub>10</sub>(1000) بس من غير الـ factor 20.`, `النسبة نفسها مش قيمة dB؛ الـ dB لوغاريتمي.`],
    [`ده y(2) = ½·12 + ⅓·8 + ¼·4 = 6 + 2.667 + 1؛ والسؤال بيسأل عن y(3).`, `ده y(4) = ¼·12؛ عند n = 3 الـ term ⅓·x(2) لسه موجود.`, `الـ input خلص بس الـ delayed samples لسه جوه الـ 2 delay elements، فالـ output لسه مش صفر (الـ FIR response بيكمّل N − 1 samples بعد الـ input).`, `عند n = 3، x(3) = 0، فـ y(3) = ⅓·x(2) + ¼·x(1) = ⅓·12 + ¼·8 = 4 + 2 = 6.`],
    [`ده جمع الأجزاء (5 + 12)؛ الـ magnitude هي √(F<sub>R</sub>² + F<sub>I</sub>²).`, `|F| = √(5² + 12²) = √169 = 13.`, `ده |F|² (الـ power)؛ نسيت الجذر.`, `الـ Magnitude عمرها ما تبقى سالبة؛ و5 − 12 مش هو القانون.`],
    [`ده اللي الـ IDEAL low-pass كان هيدّيه (√400 = 20 > 10)؛ الـ Butterworth ده top hat ناعم وبيحتفظ بشوية high frequencies.`, `الـ H = ½ بالظبط عند نص قطر الـ cut-off بس (u² + v² = w<sub>0</sub>²).`, `(u² + v²)/w<sub>0</sub>² = 400/100 = 4؛ ومع n = 1، H = 1/(1 + 4) = 0.2.`, `ده 1/(1 + 4²) = 1/17، قيمة الـ 2nd-order؛ هنا n = 1.`],
    [`√800 ≈ 28.3 > 25، فبتترمي.`, `√640 ≈ 25.3 > 25، برا الدايرة بشعرة، فبتترمي.`, `√(225 + 400) = √625 = 25 ≤ 25، يعني جوه الدايرة فبتتساب.`, `√650 ≈ 25.5 > 25، فبتترمي.`],
    [`ده كل الـ harmonics؛ الـ square wave فيها الفردية بس (مثال المحاضرة بـ 200 Hz استخدم 200، 600، 1000 Hz).`, `دي مضاعفات زوجية والـ fundamental نفسها ناقصة.`, `الـ square wave فيها المضاعفات الفردية للـ fundamental: 1×، 3×، 5× … من 150 Hz.`, `component واحد بـ 150 Hz ده pure sine wave، مش square wave.`],
    [`غلط — الضرب في H بيطبق الـ blur تاني (وده اللي بنعمله عشان نضيف effect زي الـ reverb).`, `صح — الضرب بيطبق effect، والقسمة بتشيله (G./H)، وبعدها الـ inverse FT.`, `غلط — الـ convolution بيقابله ضرب الـ FTs، فالجمع مش بيلغيه.`, `غلط — الـ low-pass بيشيل الـ high frequencies وهيعمل blur أكتر؛ الـ deconvolution بيشتغل أقرب لـ high-pass.`],
    [`غلط — الـ fft على matrix بتشتغل column column (1D لكل column).`, `صح — الـ fft(X) على matrix بتحسب 1D FT لكل column، مش الـ 2D FT؛ وللـ 2D بنستخدم fft2(X).`]
  ]
};

AR.mm.lectures["3"] = {
  notes: [
    { h: `الـ multimedia systems بتتعامل مع إيه`, pts: [
      `الـ multimedia systems/applications بتتعامل مع <b>الـ generation والـ manipulation والـ storage والـ presentation والـ communication</b> للمعلومات/الـ data.`,
      `افتكر: كل الـ data لازم تكون في شكل <b>digital</b>، وبـ formats كتير: text، graphics، images، audio، video.`,
      `أغلب الـ data دي <b>حجمها كبير</b>، والـ media المختلفة ممكن تحتاج <b>synchronisation</b>: الـ data غالبًا فيها <b>temporal relationships</b> (علاقات زمنية) كجزء أساسي منها.`
    ]},
    { h: `الـ Static (discrete) media مقابل الـ continuous media`, pts: [
      `<b>Static / discrete media</b>: <b>مش معتمدة على الزمن (time independent)</b>. أمثلة: data عادية، text، صورة واحدة، graphics.`,
      `<b>Continuous media</b>: <b>معتمدة على الزمن (time dependent)</b>. أمثلة: video، animation، audio.`
    ]},
    { h: `الـ Analog والـ digital signals، والـ ADC والـ DAC`, pts: [
      `العالم اللي بنحسه مليان signals <b>analog</b>. الـ sensors الكهربائية (<b>transducers</b>) بتحوّل اللي بتحسه لـ electrical signals: الـ thermocouples (حرارة)، الـ microphones (صوت)، الكاميرات (ضوء).`,
      `<b>Analog</b>: signals متصلة (continuous) لازم تتحول (digitise) عشان الكمبيوتر يعالجها. <b>Digital</b>: signals متقطعة (discrete) الكمبيوتر يقدر يتعامل معاها على طول.`,
      `<b>الـ ADC (Analog-to-Digital Converter)</b>: hardware خاص بياخد الـ analog signals من analog sensor (زي الـ microphone) ويعملها sampling بشكل digital (زي الـ sound card).`,
      `<b>الـ DAC (Digital-to-Analog Converter)</b>: العكس، وبيُستخدم في الـ playback. بياخد digital signal (ممكن تكون اتعدلت، زي تغيير الـ volume أو الـ equalisation) ويطلّع analog signal لـ analog output device (سماعة loudspeaker، RGB monitor).`,
      `خلاصة الكورس: الـ ADC = <b>sampling</b> (من continuous لـ discrete في الزمن) + <b>quantisation</b> (من discrete لـ digital values). يعني Digital = sampling + quantisation.`
    ]},
    { h: `الـ pipeline من analog لـ digital لـ analog`, pts: [
      `الـ Pipeline: <b>Analog conditioning → ADC → Digital processing → DAC → Analog conditioning</b>.`,
      `<b>الـ Anti-aliasing filters</b> (جزء أساسي من الـ analog conditioning) لازم تكون عند الـ <b>input</b> عشان تشيل الـ frequencies اللي فوق حد الـ sampling اللي ممكن تعمل aliasing.`,
      `بعد الـ anti-aliasing filter، الـ ADC بيعمل <b>quantise</b> للـ input المتصل ويحوّله لـ levels متقطعة (discrete).`,
      `بعد الـ digital processing، الـ DAC بيحوّل الـ discrete levels لـ voltages أو currents متصلة.`,
      `الـ output كمان لازم يتعمله filter بـ <b>low-pass filter</b> عشان يشيل الـ aliases (images) اللي جت من الـ sampling. ممكن يحصل processing زيادة بعد كده (filtering، mixing) بس مش في المنهج.`
    ]},
    { h: `التقاط وتخزين كل medium`, pts: [
      `الـ text والـ graphics وبعض الـ images بتتعمل على طول بالكمبيوتر/الجهاز (زي برامج الرسم) في binary format، و<b>مش محتاجة digitising</b>.`,
      `الـ text المطبوع (وشوية من المكتوب بخط الإيد) ممكن يتعمله scan بالـ <b>OCR</b>؛ الخط اليدوي ممكن يتعمله digitise بـ electronic pen sensing؛ والصور المطبوعة ممكن تتعمل flatbed scan.`,
      `<b>Text</b>: keyboard، speech input، OCR، disk. <b>1 byte لكل حرف</b> (ASCII)، وأكتر في الـ Unicode. الـ Spreadsheets ممكن تكون text (CSV) أو binary. الـ Formatted text: HTML، RTF، Word، program source. مش temporal بس ممكن يكون ليه sequence ضمني. الحجم مش مهم. الـ Compression (zip، RAR، 7-zip) مريح للأرشفة، بس الـ general-purpose compressors ممكن ما تشتغلش كويس مع الـ audio أو الـ images أو الـ video.`,
      `<b>Graphics</b>: متكونة من primitives (lines، polygons، circles، curves، arcs)؛ بتتعمل بـ editors (Illustrator، Freehand) أو برامج (PostScript)؛ الـ input بالـ keyboard، mouse، trackball، tablet؛ <b>ينفع تتختار وتتعدل</b> (عكس الـ images)؛ الـ storage قليل. الـ Standard: <b>OpenGL</b> (API لـ 2D/3D graphics شغال مع لغات ومنصات مختلفة cross-language, cross-platform).`,
      `<b>Animation</b>: سلسلة graphics كل واحدة متغيرة شوية عن اللي قبلها. 2D (Flash): <b>key-frame interpolation — tweening</b> للحركة والشكل. 3D (Maya): تغييرات في الشكل والـ texture والمكان والإضاءة والكاميرا. الـ graphics animation <b>compact</b> (حجمها صغير)، فمناسبة للإرسال على الـ network.`
    ]},
    { h: `أحجام الـ images والـ audio والـ video`, pts: [
      `<b>Images</b>: bitmap (grid من الـ pixels، متوضحة في السلايد كـ grid 10×10 من قيم grey من 35 لـ 132). الـ input من scanner أو digital camera، أو بتتولد ببرامج. <b>1 bit/pixel</b> (B/W)، <b>8 bits</b> (grey scale، colour map)، <b>24 bits</b> (true colour). 512×512 grey = 1/4 MB؛ 512×512 24-bit = 3/4 MB؛ كاميرا 10+ megapixel ≈ 29 MB من غير compression. غالبًا بتقدر تعدّل pixels لوحدها أو مجموعات pixels بس (Photoshop).`,
      `<b>Audio</b>: analog متصل، من الـ microphones وبعدين بيتعمله digitise. الـ CD quality = <b>16-bit عند 44.1 kHz</b>؛ الـ audiophile 24-bit، 96 kHz. دقيقة mono CD = 5 MB؛ stereo = 10 MB. غالبًا بيتعمله compression (MP3، AAC، FLAC، Ogg Vorbis).`,
      `<b>Video</b>: بيتصوّر بكاميرا (الكاميرات الـ digital دلوقتي بتعمل digitise كمان). الـ Raw video = سلسلة صور بـ <b>25 أو 30 أو 50 fps</b>.`,
      `أحجام الـ video (من غير compression، في الثانية): 512×512 monochrome: 25 × 0.25 = <b>6.25 MB</b>؛ PAL 720×576 colour: ≈ 1.2 × 25 = <b>30 MB</b>؛ HD Blu-ray 1920×1080 (≈2 megapixels): ≈ 6 × 25 = <b>150 MB</b>، يعني تقريبًا <b>9 GB في الدقيقة</b>. (Lecture 1 بتذكر نفس الأمثلة بـ 31 MB و155 MB باستخدام 1.24 و6.2 MB لكل frame.)`
    ]},
    { h: `حسابات أحجام محلولة`, pts: [
      `<b>دقيقة HD</b>: 1920 × 1080 × 3 B = 6,220,800 B لكل frame؛ × 25 = 155,520,000 B/s؛ × 60 = 9,331,200,000 B ≈ <b>9.3 GB</b> (السلايد بيقرّب 150 MB/s × 60 = 9 GB).`,
      `<b>PAL frame</b>: 720 × 576 = 414,720 pixels × 3 B = 1,244,160 B ≈ 1.2 MB.`,
      `<b>صورة 10 megapixel</b>: 10,000,000 × 3 B = 30,000,000 B = 28.6 MB (لو 1 MB = 1,048,576 B) ≈ 29 MB.`,
      `<b>دقيقة mono CD audio</b>: 44,100 × 16 bits × 1 × 60 = 42,336,000 bits = 5,292,000 B ≈ 5.05 MB.`
    ]},
    { h: `الـ Roadmap: المواضيع العامة`, pts: [
      `المواضيع الجاية: digital audio، audio synthesis، MIDI، audio effects، graphics/image formats، تمثيل الألوان وإدراك الإنسان للألوان، digital video، chroma subsampling.`,
      `المواضيع العامة: الـ sampling/digitisation؛ عيوب الـ sampling — <b>الـ aliasing</b>؛ متطلبات الـ compression؛ الـ data formats وخصوصًا الحجم؛ <b>إدراك الإنسان → أفكار للـ compression</b>؛ ونبني لحد ما نوصل لـ multimedia compression algorithms كاملة.`
    ]}
  ],
  cards: [
    `الـ Generation والـ manipulation والـ storage والـ presentation والـ communication للـ data.`,
    `media مش معتمدة على الزمن (time-independent): text، صورة واحدة، graphics.`,
    `media معتمدة على الزمن (time-dependent): video، animation، audio.`,
    `Thermocouple (حرارة)، microphone (صوت)، camera (ضوء).`,
    `Analog-to-Digital Converter: بيعمل sampling وquantisation لـ signal الـ analog sensor ويحولها لـ digital data (زي الـ sound card).`,
    `Digital-to-Analog Converter: بيرجّع الـ digital data لـ signal متصلة عشان السماعات أو الـ monitors.`,
    `Analog conditioning (anti-aliasing filter) → ADC → digital processing → DAC → analog conditioning (low-pass filter).`,
    `Low-pass filter عند الـ input بيشيل الـ frequencies اللي فوق حد الـ sampling عشان ما تعملش aliasing.`,
    `Key-frame interpolation للحركة والشكل، بيُستخدم في الـ 2D animation (زي Flash).`,
    `Open Graphics Library: standard لـ API بتاع 2D/3D graphics، cross-language وcross-platform.`,
    `1 byte لكل حرف (ASCII)؛ bytes أكتر في الـ Unicode.`,
    `حوالي 150 MB في الثانية، يعني حوالي 9 GB في الدقيقة (1920×1080، 25 fps).`,
    `Sampling (تقطيع الزمن) + quantisation (تقطيع الـ amplitude).`
  ],
  qa: [
    `الـ Static (discrete) media مش معتمدة على الزمن: text، صورة واحدة، graphics. الـ Continuous media معتمدة على الزمن: video، animation، audio. الـ continuous media محتاجة نحافظ على الـ temporal relationships والـ synchronisation.`,
    `الـ analog input بيعدّي الأول على الـ analog conditioning، وأهمه anti-aliasing low-pass filter بيشيل الـ frequencies اللي فوق حد الـ sampling. الـ ADC بيعمله sampling وquantisation لـ discrete levels. الـ digital data بتتعالج. الـ DAC بيرجّع الـ discrete levels لـ voltages أو currents متصلة، وlow-pass filter بيشيل الـ aliases اللي عملها الـ sampling قبل الـ analog output.`,
    `Text: 1 byte لكل حرف، الحجم مش مهم. Graphics: بتخزن primitives، overhead قليل. Images: 1 أو 8 أو 24 bits لكل pixel، مثلًا 512x512 24-bit = 3/4 MB. Audio: الـ CD quality 16-bit 44.1 kHz، حوالي 5 MB لكل دقيقة mono. Video: سلسلة صور بـ 25-50 fps، مثلًا الـ HD حوالي 150 MB في الثانية، فالـ compression ضروري.`,
    `لأنها compact: بتخزن primitives وkey frames وبتعمل interpolation (tweening) بينهم، بدل ما تخزن كل frame كـ pixels.`
  ],
  quiz: [
    [`الـ Text ده static.`, `Static.`, `صح. الـ audio والـ video والـ animation معتمدين على الزمن (time dependent).`, `Static.`],
    [`الـ ADC بيشتغل في الاتجاه العكسي.`, `صح. Digital-to-Analog Converter.`, `الـ OCR بيحوّل الـ text المطبوع لحروف.`, `الـ RAID ده storage.`],
    [`فيه low-pass filter مطلوب هناك كمان، بس الـ anti-aliasing filter مكانه عند الـ input.`, `صح. بيشيلوا الـ frequencies اللي فوق حد الـ sampling قبل الـ sampling.`, `الـ filter ده جزء من الـ analog conditioning.`, `من غيرهم بيحصل aliasing.`],
    [`ده بيشيل الـ high frequencies بس.`, `صح.`, `الـ DAC بيرجّع الـ discrete levels لـ continuous.`, `ده output device.`],
    [`Analog، لازم يتعمله digitise.`, `لازم يتعمله digitise.`, `صح. بيتعمل على طول في binary format.`, `لازم يتعمله scan.`],
    [`الـ Dithering تقنية للصور.`, `صح. Tweening للحركة والشكل.`, `الـ Sampling بيعمل digitise للـ signals.`, `الـ Aliasing ده عيب (artefact).`],
    [`ده في الثانية.`, `صح. 150 MB/s × 60 s ≈ 9 GB.`, `ده الـ PAL في الثانية.`, `غلط.`],
    [`ده frame واحد.`, `صح. 25 × 0.25 MB.`, `غلط.`, `أكبر عشر مرات من الصح.`],
    [`المحاضرة بتقول العكس.`, `صح.`, `هما lossless.`, `بيُستخدموا مع أي file.`],
    [`page description language ممكن تولّد graphics.`, `صح.`, `text markup format.`, `music protocol.`]
  ],
  extra: [
    [`ده حجم الـ 24-bit (3 bytes لكل pixel)؛ الـ grey-scale بيستخدم 1 byte لكل pixel.`, `800 × 600 × 8 / 8 = 480,000 B ÷ 1024 = 468.75 KB.`, `ده قسم الـ bits على 1024 من غير ما يحوّلها لـ bytes الأول (نسي ÷ 8).`, `ده حجم الـ 1 bit لكل pixel (أبيض وأسود).`],
    [`ده استخدم 1 byte لكل pixel؛ الـ 24-bit colour يعني 3 bytes لكل pixel.`, `الـ Frame = 640 × 480 × 3 = 921,600 B؛ × 30 = 27,648,000 B/s ÷ 1,048,576 ≈ 26.37 MB/s (الـ data rate = حجم الـ frame × fps).`, `ده استخدم 25 fps بدل 30 fps.`, `ده megabits في الثانية (الـ 24 bits ما اتقسمتش على 8).`],
    [`ده حجم الـ mono — نسيت الـ ×2 بتاعة الـ stereo.`, `ده قسم الـ bits على 1024 من غير ما يقسم على 8 الأول عشان يجيب bytes.`, `22,050 × 16 × 2 × 30 = 21,168,000 bits = 2,646,000 B ÷ 1024 ≈ 2583.98 KB.`, `ده استخدم 44.1 kHz، مش الـ 22.05 kHz المذكورة.`],
    [`صح — sensors للحرارة والصوت والضوء بالترتيب.`, `غلط — الـ ADC ده hardware منفصل (زي الـ sound card) بيعمل sampling للـ analog signal بتاعة الـ sensor.`, `غلط — الـ DAC بيطلّع analog signal لأجهزة الـ playback زي السماعات.`, `غلط — دول analog conditioning filters عند input الـ ADC، مش sensors.`],
    [`غلط — الـ quantisation بيحصل في الـ ADC، في ناحية الـ input.`, `غلط — ده شغل الـ anti-aliasing filter عند الـ INPUT، قبل الـ ADC.`, `غلط — الـ low-pass filtering هنا بيعيد بناء analog signal ناعمة؛ مش compression للتخزين.`, `صح — المحاضرة بتقول إن الـ output لازم يتعمله low-pass filter عشان يشيل الـ aliases اللي جت من الـ sampling.`],
    [`صح — digital = sampling + quantisation.`, `غلط — الدورين متبدلين.`, `غلط — هما بيعملوا digitise للـ signal؛ الـ compression خطوة منفصلة بعدين.`, `غلط — الـ sampling والـ quantisation الاتنين بيعملهم الـ ADC.`],
    [`غلط — الـ continuous media (audio، video، animation) معتمدة على الزمن؛ الـ static data مش محتاجة توقيت.`, `غلط — حجم الحرف مالوش علاقة بالـ synchronisation.`, `صح — المحاضرة بتقول إن الـ multimedia data غالبًا فيها temporal relationships، فالـ media ممكن تحتاج synchronisation.`, `غلط — الـ graphics اللي بتتعمل بالكمبيوتر مش محتاجة digitising أصلًا.`],
    [`غلط — الـ tweening تقنية في الـ 2D animation.`, `غلط — الـ DAC بيحوّل من digital لـ analog، يعني الاتجاه العكسي.`, `غلط — ده بيلتقط audio، مش text مطبوع.`, `صح — الـ text المطبوع (وشوية من المكتوب بخط الإيد) ممكن يتعمله scan بالـ OCR.`],
    [`صح — المحاضرة بتقول إن الـ graphics animation (سلسلة graphics متغيرة شوية) compact، فمناسبة للإرسال على الـ network.`, `غلط — المحاضرة بتقول كده بالظبط: الـ animation المتبنية من graphics compact ومناسبة للـ networks.`],
    [`غلط — المحاضرة بتقول إن الـ spreadsheets ممكن تكون text (CSV) أو binary.`, `صح — الـ spreadsheets ممكن تتخزن كـ text (CSV) أو في binary format.`]
  ]
};

AR.mm.lectures["4"] = {
  notes: [
    { h: `الصوت وتحويله لـ digital`, pts: [
      `<b>توليد الصوت</b>: المصدر بيطلّع صوت على شكل <b>تغيرات في ضغط الهوا</b> — يا إما electrically (السماعة loudspeaker) يا إما acoustically (تغيرات ضغط مباشرة).`,
      `<b>استقبال الصوت</b>: electrically (الـ <b>microphone</b> بيطلّع electric signal) أو بـ <b>الودان</b>، اللي بتستجيب للضغط (والـ MPEG audio بيستغل الحقيقة دي).`,
      `الـ microphone بيستقبل الصوت ويحوله لـ <b>analog signal</b>. الكمبيوتر بيحب الحاجات الـ <b>discrete</b>، فمحتاجين تحويل <b>analog-to-digital</b> بـ hardware مخصوص (زي الـ <b>sound card</b>). وده اسمه برضه <b>digital sampling</b>.`,
      `<b>الـ Sampling</b> = إننا نقيس الـ analog signal على <b>فترات discrete منتظمة</b> (الـ sampling interval T) ونسجل القيمة عند النقط دي.`
    ]},
    { h: `الـ Sample rate والـ bit size (الـ quantisation)`, pts: [
      `<b>الـ Bit size = quantisation</b>: إزاي قيمة كل sample بتتخزن. قيمة <b>8-bit</b>: من 0 لـ 255. قيمة <b>16-bit</b>: من 0 لـ 65535.`,
      `<b>الـ Sample rate</b>: بناخد كام sample في الثانية (Hz). <b>11.025 kHz</b> — للكلام speech (التليفون <b>8 kHz</b>)؛ <b>22.05 kHz</b> — audio جودة ضعيفة (WWW audio، راديو AM)؛ <b>44.1 kHz</b> — جودة CD.`,
      `الـ Sampling frequency (الـ sample rate) = عدد الـ samples في الثانية = <b>1 / sampling interval</b>. الوحدة: <b>Hertz (Hz)</b>.`
    ]},
    { h: `نظرية Nyquist للـ sampling والـ aliasing`, pts: [
      `الـ sampling frequency <b>حاسمة</b> عشان نطلّع نسخة digital دقيقة من الـ analog waveform.`,
      `<b>نظرية Nyquist</b>: الـ sampling frequency للإشارة لازم تكون <b>على الأقل ضعف أعلى frequency component</b> في الإشارة: <b>fs ≥ 2·fmax</b>.`,
      `<b>الـ Nyquist frequency</b> = fs / 2 = أعلى frequency يقدر الـ sample rate ده يمثلها (مثلًا 44.1 kHz → 22.05 kHz). <b>الـ Nyquist rate</b> = 2·fmax = أقل sample rate ينفع للإشارة.`,
      `ديمو السلايدز: لو عملت sampling <b>بنفس frequency الإشارة</b> هتاخد sample واحدة في كل cycle، فكل الـ samples هيبقى ليها نفس القيمة (الـ sine بيضيع)؛ لو عملت sampling بالضعف بالعافية بتلقطها؛ ولو عملت sampling <b>أعلى</b> من Nyquist بتلقط الـ waveform كويس.`,
      `لو غلطت فيها (<b>undersampling</b>) بيطلع <b>digital sampling artefacts</b> اسمها <b>aliasing</b>: بتظهر frequency وهمية أوطى. الـ aliasing بيأثر على <b>الـ audio والصور والـ video</b> (ديمو الـ aliased sine wave والـ aliased piano).`,
      `<b>الـ Oversampling</b> = sampling أعلى من الـ Nyquist rate. بيقلل الـ aliasing بس بيكلّف data أكتر.`,
      `المعنى العملي: لازم الإشارة تعدي على <b>low-pass filter قبل الـ sampling</b> (analog input → low-pass filter → A/D converter → sampled digital)، وإلا الـ frequencies اللي فوق حد Nyquist هتظهر كـ artefacts غريبة.`
    ]},
    { h: `ليه الـ sample rate بتاع الـ CD هو 44.1 kHz؟`, pts: [
      `أعلى مدى لسمع الإنسان حوالي <b>20–22 kHz</b>. لو طبقنا Nyquist، محتاجين على الأقل الضعف: 2 × 22.05 kHz = <b>44.1 kHz</b>.`,
      `ثوابت الكورس: <b>الـ audio/music</b> fmax = 22.05 kHz → fs = 44.1 kHz؛ <b>الـ speech</b> fmax = 4 kHz → fs = 8 kHz. الـ Mono = channel واحد؛ الـ stereo = 2 channels.`
    ]},
    { h: `تأثير الـ sample rate والـ bit size على الجودة والحجم`, pts: [
      `الودان مش بتستجيب بشكل linear، فبنستخدم الـ <b>decibel (dB)</b>، وده مقياس logarithmic.`,
      `الـ <b>16-bit</b> الـ signal-to-noise ratio بتاعه <b>98 dB</b> (الـ noise تقريبًا مش مسموعة)؛ والـ <b>8-bit</b> بتاعه <b>50 dB</b>. عشان كده الـ 8-bit "noisy أكتر بحوالي 8 مرات" (كلام السلايد؛ الفرق 48 dB = 8 × 6 dB). <b>زيادة 6 dB معناها الصوت أعلى بالضعف</b>.`,
      `أمثلة الصوت في السلايد: 44 kHz 16-bit، 44 kHz 8-bit، 22 kHz 16-bit، 22 kHz 8-bit، 11 kHz 8-bit (كلهم mono): الجودة بتقل كل ما الـ rate والـ bits يقلوا.`,
      `sample rate أو bit size أعلى = جودة أحسن بس <b>ملفات أكبر</b>. وزيادة الـ fs عن اللي السمع محتاجه مش "دايمًا بتحسّن" الجودة.`
    ]},
    { h: `حجم ملف الـ audio — أمثلة محلولة (ملخص الكورس)`, pts: [
      `<b>القاعدة</b>: الحجم (bits) = <b>time (s) × sample rate (Hz) × sample size (bits) × channels</b>. اقسم على 8 عشان تجيب bytes، وعلى 1024 عشان KB، وعلى 1024 تاني عشان MB.`,
      `لو الـ sample rate مش مدّيهولك بس الـ <b>sampling interval</b> موجود: fs = 1 / interval. ولو الاتنين مش موجودين، استخدم الثوابت (speech 8 kHz، audio 44.1 kHz). شيت الـ Final Rules بيقول إن الـ sample size لو مش معروف بيفضل متغير (Q)؛ وشيت الـ midterm استخدم 16 bits.`,
      `<b>مثال 1</b>: 44.1 kHz، 16-bit، 60 s، stereo → 44,100 × 16 × 60 × 2 = <b>84,672,000 bits</b> = 10,584,000 B = <b>10,335.94 KB</b> ≈ 10.09 MB.`,
      `<b>مثال 2</b>: sampling interval 0.000125 s، 16-bit، 4.5 min، stereo → fs = 1/0.000125 = <b>8000 Hz</b>؛ t = 4.5 × 60 = 270 s؛ الحجم = 8000 × 16 × 270 × 2 = <b>69,120,000 bits</b> = 8,640,000 B = <b>8437.5 KB</b>.`,
      `<b>مثال 3</b>: interval 500 ms، 64-bit، 5.5 h، stereo → fs = 1/0.5 = 2 Hz؛ t = 5.5 × 3600 = 19,800 s؛ الحجم = 2 × 64 × 19,800 × 2 = <b>5,068,800 bits</b> = 633,600 B.`,
      `<b>مثال 4</b>: speech، 32-bit، 2.5 h، stereo → fs = 2 × 4000 = 8000 Hz؛ t = 9000 s؛ الحجم = 8000 × 32 × 9000 × 2 = <b>4,608,000,000 bits</b> = 576,000,000 B = <b>562,500 KB</b>.`,
      `<b>مثال 5</b>: x(t) = 2A·cos(200πt + π/3) + 3A·sin(100πt − π/6). كل term شكله 2πf·t، يبقى f1 = 200π/2π = <b>100 Hz</b>، f2 = 100π/2π = <b>50 Hz</b>؛ fmax = 100 Hz → fs ≥ 200 Hz → الـ sampling interval T ≤ 1/200 = <b>0.005 s</b> (أكبر interval مسموح).`,
      `<b>الـ Sampling intervals</b>: الـ speech 1/8000 = <b>0.000125 s</b> (125 µs)؛ الـ music 1/44,100 ≈ <b>0.0000227 s</b> (22.68 µs).`
    ]},
    { h: `الـ Audio file formats`, pts: [
      `formats مشهورة: <b>.au</b> (Unix، Sun)، <b>.aiff</b> (Mac، SGI)، <b>.wav</b> (PC، DEC). ينفع نستخدم compression بس <b>مش إجباري</b>.`,
      `طريقة بسيطة ومستخدمة كتير: <b>ADPCM</b> (Adaptive Delta Pulse Code Modulation): بناءً على الـ samples اللي فاتت <b>بيتوقع الـ sample الجاية</b> وبيعمل encode لـ <b>الفرق</b> بين القيمة الحقيقية والمتوقعة.`,
      `formats تانية (أغلبها بيستخدم compression): Sound Blaster <b>.voc</b> (ممكن تستخدم silence deletion)، Pro Tools/Sound Designer <b>.sd2</b>، RealAudio <b>.ra</b>، Ogg Vorbis <b>.ogg</b>، AAC/Apple/mp4، FLAC <b>.flac</b>، Dolby AC coding، MPEG audio (MP3، MPEG-4).`
    ]},
    { h: `الأصوات الـ Synthetic — تقليل الـ bandwidth`, pts: [
      `<b>الـ Synthesis pipeline</b>: بنعمل synthesise للأصوات بـ hardware أو software؛ الـ client هو اللي بيطلّع الصوت، فبنبعت بس <b>الـ parameters</b> اللي بتتحكم في الصوت (MIDI/MP4/HTML5).`,
      `الطرق: <b>FM</b> (Sound Blaster الرخيصة، شريحة OPL-4، Yamaha DX، أوائل الثمانينات)؛ <b>wavetable</b> (من samples لآلات حقيقية)؛ <b>additive</b> (بنجمع waveforms أبسط)؛ <b>subtractive</b> (بنعمل filter لأجزاء من waveform معقدة)؛ <b>granular</b> (حتت صغيرة من الـ samples)؛ <b>physical modelling</b> (بنعمل model لطريقة توليد الصوت)؛ <b>sample-based</b> (تسجيل وإعادة تشغيل). أغلب الـ synthesisers الحديثة بتخلط بين طرق الـ sample والـ synthesis.`,
      `تشبيه: الصوت المتسجل ≈ bitmap image (sampling منتظم، كبير، صعب تعدله)؛ الصوت الـ synthetic ≈ <b>vector graphics</b> (وصف high-level، صغير، سهل تعدله، ومحتاج تحويل — synthesis أو rasterisation — قبل التشغيل/العرض). الفرق: 1D مقابل 2D.`
    ]}
  ],
  cards: [
    `الـ sampling frequency لازم تكون على الأقل ضعف أعلى frequency component في الإشارة: fs ≥ 2 fmax.`,
    `نص الـ sampling frequency (fs/2): أعلى frequency ممكن تتمثل.`,
    `sampling artefact بييجي من الـ undersampling (fs أقل من 2 fmax): الـ frequencies العالية بتظهر كـ frequencies وهمية أوطى. بيأثر على الـ audio والصور والـ video.`,
    `sampling أعلى من الـ Nyquist rate؛ بيقلل الـ aliasing بس بيزوّد حجم الـ data.`,
    `fs = 1 / sampling interval (بالثواني). الوحدة: Hertz (Hz).`,
    `8 kHz للتليفون؛ 11.025 kHz للـ speech؛ 22.05 kHz جودة ضعيفة (WWW، راديو AM)؛ 44.1 kHz للـ CD.`,
    `سمع الإنسان بيوصل لحوالي 20-22 kHz؛ وNyquist محتاج الضعف: 2 × 22.05 = 44.1 kHz.`,
    `الـ 8-bit: من 0 لـ 255؛ الـ 16-bit: من 0 لـ 65535.`,
    `الـ 16-bit ≈ 98 dB؛ الـ 8-bit ≈ 50 dB. زيادة 6 dB = الصوت أعلى بالضعف.`,
    `time (s) × sample rate × bits per sample × channels (بالـ bits).`,
    `fmax = 4 kHz، fs = 8 kHz، الـ sampling interval = 0.000125 s.`,
    `نعدّي الإشارة على low-pass (anti-aliasing) filter.`,
    `Adaptive Delta PCM: بيتوقع الـ sample الجاية من الـ samples اللي فاتت وبيخزن الفرق.`,
    `.au من Unix/Sun؛ .aiff من Mac/SGI؛ .wav من PC/DEC.`
  ],
  qa: [
    `أعلى مدى لسمع الإنسان حوالي 20-22 kHz (fmax ≈ 22.05 kHz). نظرية Nyquist بتقول لازم نعمل sampling على الأقل بضعف أعلى frequency، فـ 2 × 22.05 kHz = 44.1 kHz بتلقط كل حاجة نقدر نسمعها.`,
    `الـ sampling frequency لازم تكون على الأقل ضعف أعلى frequency component في الإشارة. لو عملنا sampling أقل من كده (undersampling) بيحصل aliasing: الـ high-frequency components بترجع تتطوي وتظهر كـ frequencies وهمية أوطى، وده تشويه مينفعش يتشال بعد الـ sampling. عشان كده الإشارة بتعدي على low-pass filter قبل الـ ADC.`,
    `fs = 1/0.000125 = 8000 Hz. الوقت = 4.5 × 60 = 270 s. الحجم = 8000 × 16 × 270 × 2 = 69,120,000 bits = 8,640,000 bytes = 8437.5 KB.`,
    `الـ Speech: fmax = 4 kHz يبقى fs = 8000 Hz وT = 1/8000 = 0.000125 s (125 microseconds). الـ Music: fs = 44,100 Hz يبقى T = 1/44,100 ≈ 0.0000227 s (22.68 microseconds).`,
    `بيأثروا على الجودة والحجم. bits أكتر يعني quantisation أنعم وnoise أقل (الـ SNR بتاع 16-bit هو 98 dB مقابل 50 dB للـ 8-bit). والـ rate الأعلى بيلقط frequencies أعلى. والاتنين بيزودوا حجم الملف بنفس النسبة، مثلًا دقيقة 16-bit stereo عند 44.1 kHz حوالي 10.1 MB، بس 8-bit mono عند 11.025 kHz حوالي 630 KB.`
  ],
  quiz: [
    [`الوحدة في الثانية (Hz)، مش في الساعة.`, `صح. وعشان كده بتتقاس بالـ Hz.`, `المدة دي وقت، مش rate.`, `الـ Amplitude هو ارتفاع الموجة.`],
    [`صح. 1 Hz = 1 sample في الثانية.`, `وحدة الطاقة.`, `وحدة القوة.`, `وحدة التيار.`],
    [`بتعتمد على أعلى frequency، ولازم تكون ضعفها.`, `نص الـ fs هو الـ Nyquist frequency؛ لكن الـ fs نفسها لازم تكون ضعف الـ fmax.`, `صح. fs ≥ 2 fmax.`, `أكتر من المطلوب؛ الحد الأدنى هو الضعف.`],
    [`ده النص، وده هيعمل aliasing.`, `قد الـ fmax: sample واحدة في كل cycle، والـ tone بيضيع.`, `صح. 2 × 5 kHz = 10 kHz.`, `تنفع، بس مش هي الحد الأدنى.`],
    [`صح. الـ frequencies اللي فوق fs/2 بترجع تتطوي كـ frequencies وهمية واطية.`, `الـ Overshoot ده تأثير بتاع الـ filter/step-response.`, `ده بييجي من الـ bit size (تقريب الـ amplitude)، مش من الـ sample rate.`, `الـ Undersampling بيقلل الـ bandwidth اللي ممكن تتمثل.`],
    [`samples أكتر في الثانية يعني data أكتر.`, `صح. الـ fs الأعلى بترفع حد Nyquist اللي هو fs/2.`, `العكس: بتخلي الـ reconstruction أسهل.`, `الـ Quantisation error بيعتمد على الـ bit size.`],
    [`ده الـ undersampling.`, `ده الـ critical sampling.`, `صح.`, `ده مش تعريف مستخدم في الكورس.`],
    [`audio جودة ضعيفة (WWW، راديو AM)؛ وكمان هي الـ Nyquist frequency بتاعة الـ CD.`, `صح.`, `بتستخدم في الـ professional video/DAT، مش الـ CD.`, `دي rate بتاعة الـ audiophile.`],
    [`مستحيل تحت الـ Nyquist rate.`, `صح.`, `الـ sampling rate مش بيغير الـ amplitude.`, `الـ band-limiting بيتعمل قبل الـ sampling بالـ anti-aliasing filter؛ مش وصف للنتيجة اللي اتعملها undersampling.`],
    [`صح. أعلى frequency ممكن تتمثل هي fs/2.`, `بتستخدم memory أكتر.`, `samples أكتر يعني processing أكتر.`, `الـ time resolution بتتحسن.`],
    [`صح. 8000 × 16 × 270 × 2 = 69,120,000 bits = 8,640,000 B = 8437.5 KB.`, `ده حجم الـ mono (channel واحد).`, `ده نسي يحوّل الدقايق لثواني.`, `ده نسي يقسم على 8 (bits → bytes).`],
    [`ده sampling عند 100 Hz، يعني fmax بس، مش 2·fmax.`, `صح. f1 = 100 Hz، f2 = 50 Hz، fs ≥ 200 Hz، T ≤ 1/200 = 0.005 s.`, `ده sampling عند 50 Hz، بطيء جدًا.`, `مسموح بس مش هو الأكبر (ده 400 Hz).`],
    [`ده الـ 8-bit.`, `صح.`, `الـ 6 dB = الصوت أعلى بالضعف.`, `ده مدى عتبة الألم (threshold of pain).`],
    [`ده الـ silence deletion (.voc).`, `صح.`, `ده الـ synthesis.`, `ده الـ filtering.`]
  ],
  extra: [
    [`ده 2<sup>11</sup> — ناقص bit واحد.`, `ده 12 × 2؛ عدد الـ levels بيزيد exponentially، يعني 2<sup>bits</sup>.`, `ده 12²؛ عدد الـ levels هو 2<sup>12</sup>، مش 12².`, `الـ Levels = 2<sup>bits</sup> = 2<sup>12</sup> = 4096 (الـ 8-bit بيدي 256، والـ 16-bit بيدي 65,536).`],
    [`ده 2 × fs؛ الـ Nyquist RATE لإشارة هو 2·fmax، لكن الـ Nyquist frequency لـ sample rate هي fs/2.`, `الـ Nyquist frequency = fs/2 = 48/2 = 24 kHz، أعلى frequency الـ rate ده يقدر يمثلها.`, `ده الـ sample rate نفسه، مش الـ Nyquist frequency بتاعته.`, `دي الـ Nyquist frequency بتاعة 44.1 kHz (الـ CD audio)، مش 48 kHz.`],
    [`كل term شكله 2πf·t: f<sub>1</sub> = 600π/2π = 300 Hz، f<sub>2</sub> = 1000π/2π = 500 Hz؛ fmax = 500 Hz → fs ≥ 2 × 500 = 1000 Hz.`, `ده الـ fmax نفسه — نسيت الـ ×2 بتاعة Nyquist.`, `ده 2 × 300 Hz، معتمد على الـ component الأوطى؛ Nyquist بيستخدم أعلى frequency.`, `ده قرا 1000π على إنها 1000 Hz؛ لازم تقسم الـ angular frequency على 2π الأول.`],
    [`ده حجم الـ stereo؛ التسجيل mono (channel واحد).`, `ده قسم الـ bits على 1024 من غير ما يحوّل لـ bytes (نسي ÷ 8).`, `Speech → fs = 8000 Hz. 8000 × 8 × 1 × 120 = 7,680,000 bits = 960,000 B ÷ 1024 = 937.5 KB.`, `ده استخدم ثابت الـ audio/music اللي هو 44.1 kHz؛ الـ speech بيستخدم 8 kHz.`],
    [`ده 1/44,100 (rate الـ CD)، الـ interval بتاع الـ music في الملخص.`, `T = 1/fs = 1/22,050 ≈ 0.00004535 s ≈ 45.35 µs.`, `ده 1/8000، الـ interval بتاع الـ speech.`, `الـ interval هو مقلوب الـ rate، مش الـ rate نفسه.`],
    [`الـ Rate ÷2، الـ bits ÷2، الـ channels ÷2 → ½ × ½ × ½ = 1/8 (10.1 MB → حوالي 1.26 MB، زي جدول المحاضرة).`, `ده حسب اتنين بس من التلات تنصيفات (مثلًا نسي stereo → mono).`, `ده نصّ factor واحد بس؛ الـ rate والـ bit size والـ channels كلهم بيتنصفوا.`, `ده factor زيادة؛ فيه بالظبط تلات تنصيفات.`],
    [`غلط — بس الـ sampling أعلى من الـ Nyquist rate هو اللي بيلقطها كويس.`, `غلط — "just captured" ده ديمو الـ sampling بضعف الـ frequency.`, `صح — ده ديمو السلايد؛ محتاج على الأقل ضعف الـ frequency.`, `غلط — الـ oversampling يعني sampling أعلى من الـ Nyquist rate؛ وده تحته بكتير.`],
    [`صح — الـ 22.05 kHz متذكورة على إنها low-grade audio.`, `غلط — الـ speech متذكور عند 11.025 kHz (التليفون 8 kHz).`, `غلط — جودة الـ CD هي 44.1 kHz.`, `غلط — الـ audiophile audio متذكور إنه 24-bit عند 96 kHz.`],
    [`غلط — ده التشبيه بتاع الصوت المتسجل (RECORDED، اللي اتعمله sampling).`, `غلط — السلايدز بتشبه الصوت الـ synthetic بالـ vector graphics، مش بالصور المضغوطة.`, `غلط — مفيش تشبيه زي ده؛ الصوت الـ synthetic بيبعت parameters، مش palette indices.`, `صح — الـ synthesis بالنسبة للصوت زي الـ rasterisation بالنسبة للـ vector graphics.`],
    [`غلط — المحاضرة بتقول إن الـ compression ممكن يتستخدم مع الـ formats دي بس مش إجباري.`, `صح — في .au (Unix) و.aiff (Mac) و.wav (PC)، الـ compression ممكن يتستخدم بس مش إجباري.`]
  ]
};

AR.mm.lectures["5"] = {
  notes: [
    { h: `نظرة عامة: طرق الـ synthesis`, pts: [
      `الـ digital audio applications العملية اللي جاية: <b>Digital Audio Synthesis</b> (إنك تعمل أصوات)، <b>Digital Audio Effects</b> (إنك تغيّر الأصوات) والـ <b>MIDI</b> (للتحكم في الـ synthesis/الـ effects وللـ compression).`,
      `سبع طرق للـ synthesis: <b>Subtractive</b>، <b>Additive</b>، <b>FM</b> (Frequency Modulation)، <b>Sample-based</b>، <b>Wavetable</b>، <b>Granular</b> و<b>Physical Modelling</b>.`
    ]},
    { h: `الـ Subtractive synthesis والـ ADSR envelope`, pts: [
      `<b>Subtractive synthesis</b>: بنشيل overtones من صوت غني بالـ harmonics عن طريق إننا نطبّق <b>audio filter</b> على الـ audio signal. أول مثال: الـ <b>Vocoder</b> ("الروبوت اللي بيتكلم"، 1939). واشتهر مع الـ <b>Moog</b> synthesisers (1960–1970s).`,
      `مثال بسيط (وتر بالقوس bowed string): خد <b>sawtooth</b> generator واعمله <b>low-pass filter</b> عشان تهدّي الـ partials العالية. ده بيطلع صوت طبيعي أكتر من الـ sawtooth الخام.`,
      `مثال من الإنسان: الأحبال الصوتية = <b>oscillator</b> (المصدر)؛ البُق والزور = <b>filter</b>. "aah" بتسيب معظم الـ harmonics، و"ooh" بتشيل (بتقلل) معظمهم. لما تلف ooh→aah→ooh ده <b>sweeping filter</b>، وهو أساس الـ <b>wah-wah</b> effect بتاع الجيتار.`,
      `مثال الطيارة: "ssh" = <b>white noise</b>؛ لو شكّلت بُقك عشان تشيل الـ frequencies العالية بيطلع <b>pink noise</b> (صوت نزول طيارة jet). والـ white noise بعد الـ filtering بيعمل كمان صوت الموج والريح، والـ snare/percussion في الـ drum machines القديمة.`,
      `التلات عناصر الأساسية للتحكم الإلكتروني: <b>Source signal</b> (موجات square وpulse وsawtooth وtriangle؛ والـ synths الحديثة بتسمح بأي waveform)، <b>Filtering</b> (بنتحكم في الـ cut-off frequency والـ resonance عشان نقلّد الـ timbre بتاع آلة)، <b>Amplitude envelope</b> (بالظبط هو مش subtractive بس بيستخدم كتير، ومع تقنيات تانية كمان).`,
      `<b>ADSR envelope</b>: بيعمل modulate لجانب من الصوت مع الوقت، غالبًا الـ volume (وممكن الـ filter frequency أو الـ pitch بتاع الـ oscillator). محتاجينه لأن كل آلة حقيقية الـ volume بتاعها بيتغير مع الوقت بطريقتها: الـ <b>pipe organ</b> بيعزف بـ volume ثابت وبيموت بسرعة لما تسيب الزرار؛ والـ <b>guitar</b> بيبقى أعلى حاجة بعد ما تشد الوتر على طول وبعدين بيخفت.`,
      `<b>Attack</b>: الصوت بيوصل لأعلى volume بسرعة قد إيه بعد ما تدوس الزرار (تقريبًا فوري في معظم الآلات الميكانيكية؛ بطيء في الـ bowed strings والـ "pads"). <b>Decay</b>: بينزل للـ sustain level بسرعة قد إيه بعد الـ peak. <b>Sustain</b>: الـ volume الثابت اللي بيفضل لحد ما تسيب الزرار — ده <b>level مش وقت</b>. <b>Release</b>: بيخفت بسرعة قد إيه بعد ما تسيب الزرار (قصير جدًا في الـ organ؛ طويل في الجرس أو البيانو مع الـ sustain pedal).`,
      `الـ MATLAB demo <code>subtract_synth.m</code>: sawtooth عند 440 Hz، Fs = 22050، بيتعمله filter بـ <code>butter(1,0.04,'low')</code> و<code>butter(4,0.04,'low')</code> وبعدين <code>filter()</code>. الـ cut-off 0.04 ده نسبة من الـ Nyquist: 0.04 × 11025 = <b>441 Hz</b>. الـ filter الـ 4th-order بيشيل من الـ partials العالية أكتر من الـ 1st-order.`,
      `<code>synth.m</code> بيعمل notes من نوع 'sine' أو 'saw' أو 'fm'. الـ period بتاع الـ sawtooth فيه T = Fs/freq samples (22050/440 ≈ 50.1 samples) ومتبني بـ <code>ramp - fix(ramp)</code>؛ الـ up slope بتاعه non-linear، صوته أقل حدة شوية وأنسب للـ synthesis. الأطراف بتتنعّم بـ ramp مدته 10 ms.`
    ]},
    { h: `الـ Additive synthesis`, pts: [
      `الـ tones المعقدة بتتعمل عن طريق <b>جمع (addition) tones أبسط</b>. الـ <b>Frequency mixing</b> هو جوهرها.`,
      `كل frequency component (<b>partial</b>) ليه الـ amplitude envelope بتاعه، فالـ components بتتصرف مستقلة عن بعض. المصادر ممكن تكون أنواع synthesis تانية أو samples.`,
      `أمثلة: الـ <b>pipe / Hammond organs</b> (الـ register stops، إعدادات الـ tonewheel/drawbar)، الـ <b>Telharmonium</b> (synthesiser كهربائي عملاق في أوائل القرن العشرين بيجمع عشرات الـ electro-mechanical tone generators)، والحديث: Fairlight CMI، Synclavier، Kawai K5000، wavetable synthesis.`,
      `الأساس: <b>Fourier theory</b> — أي timbre بعد ما تحلله لـ sinusoids تقدر تبنيه تاني بإنك تجمعهم.`,
      `<b>الميزة</b>: يقدر يعيد عمل الـ micro-variations في الـ frequency والـ amplitude بتاعة كل partial، ودي اللي بتخلي الأصوات الطبيعية غنية وفيها حياة. <b>العيب</b>: <b>مش efficient</b> — لازم تحدد data كتير جدًا عشان صوت مفصّل.`,
      `أمثلة: تقريب <b>square wave</b> بجمع sine waves (الـ odd harmonics f، 3f، 5f، … بـ amplitudes 1، 1/3، 1/5، …؛ مثلًا لـ 100 Hz: 100، 300، 500 Hz …)، والـ <b>Aphex Twin spectrogram</b> (additive synthesis بالـ inverse-Fourier بي"رسم" sinusoids من شدة الصورة ومكان الـ pixel).`
    ]},
    { h: `الـ FM (Frequency Modulation) synthesis`, pts: [
      `الـ timbre بتاع waveform بسيطة بيتغير لما نعملها <b>frequency modulation</b>، فتطلع waveform أعقد. اكتشفها <b>John Chowning</b> (Stanford، 1967–68)، اتعملها patent سنة 1975، واترخصت لـ <b>Yamaha</b> (DX7، وكمان Casio CZ، في الثمانينات).`,
      `كويسة في الأصوات الـ <b>harmonic</b> والـ <b>inharmonic</b> ("clang"، "twang"، "bong"). الأصوات الـ harmonic محتاجة الـ modulator يكون ليه <b>harmonic relationship</b> مع الـ carrier؛ والنسب الـ <b>non-integer</b> بتدي أصوات زي الجرس، dissonant، وpercussive. كل ما الـ modulation يزيد الصوت يبقى أعقد.`,
      `بتتنفذ digitally (الـ analog oscillators مش stable). اتكتشفت لما سرّعوا الـ vibrato لحد ما عمل <b>sidebands</b> مسموعة (تغيير في الـ timbre) بدل التموّج (تغيير في الـ pitch). الـ DX synths بتستخدم <b>sine</b> waves للـ oscillators الاتنين.`,
      `مصطلحات: <b>Oscillator</b> = جهاز بيطلّع waveforms؛ <b>Carrier</b> = الـ oscillator اللي بيتعمله modulation؛ <b>Modulator</b> = الـ oscillator اللي بيعمل الـ modulation.`,
      `الـ Bessel expansion: e = A{J<sub>0</sub> sin αt + J<sub>1</sub>[sin(α+β)t − sin(α−β)t] + J<sub>2</sub>[sin(α+2β)t − sin(α−2β)t] + …}. يعني الـ side frequencies بتظهر عند <b>α ± nβ</b>.`,
      `الـ J<sub>0</sub>(I) بيحدد الـ amplitude بتاع الـ <b>carrier</b>؛ والـ J<sub>n</sub>(I) بيحدد الـ sidebands رقم n العلوية والسفلية. الـ sidebands اللي order بتاعها عالي بيبقى فيها energy ملحوظة بس لما I يكون <b>كبير</b>؛ الـ bandwidth بيزيد مع I؛ لو I &gt; 1 الـ energy بتتسحب أكتر وأكتر من الـ carrier؛ وطاقة الـ sidebands بتتغير زي damped sinusoid مع زيادة I.`,
      `الـ <b>Operators</b> = الـ oscillators في مصطلحات الـ FM؛ الـ FM synths فيها <b>4 أو 6</b> operators لأن carrier واحد + modulator واحد مش معقد كفاية. الـ <b>Algorithms</b> = توصيلات preset: <b>Multiple carriers</b> (oscillator واحد بيعمل modulate لـ 2 carriers أو أكتر)، <b>Multiple modulators</b> (2 oscillators أو أكتر بيعملوا modulate لـ carrier واحد)، <b>Feedback</b> (الـ output بتاع oscillator بيعمل modulate لنفسه).`,
      `أمثلة FM تانية: compressing/uncompressing sine، periodic modulation، bell، wood block، brass.`
    ]},
    { h: `مثال محلول: الـ FM sidebands`, pts: [
      `الـ Demo <code>fm_eg.m</code>: fc = 440 Hz، fm = 30 Hz، والـ I بيطلع من 0 لـ 20 على مدار 2 s.`,
      `n = 1: 440 ± 30 = <b>410 Hz و470 Hz</b> (amplitude J<sub>1</sub>).`,
      `n = 2: 440 ± 60 = <b>380 Hz و500 Hz</b> (J<sub>2</sub>). n = 3: 440 ± 90 = <b>350 Hz و530 Hz</b> (J<sub>3</sub>).`,
      `كل ما I يكبر أثناء الـ note، sidebands أكتر بتاخد energy، فالصوت بيبقى أنصع/أعقد تدريجيًا.`,
      `مثال harmonic: fc = 200، fm = 200 (نسبة 1:1) بيدي 200 ± 200n → 0، 400، 600 … كلهم مضاعفات 200 Hz (harmonic). ومع fm = 141 Hz (نسبة non-integer) الـ sidebands 59، 341، 482 … مش مضاعفات لـ fundamental مشترك → صوت زي الجرس، inharmonic.`
    ]},
    { h: `الـ Sample-based synthesis`, pts: [
      `زي الـ subtractive/additive synthesis بس الـ seed waveforms بتبقى <b>أصوات أو آلات متسجلة (sampled)</b> بدل موجات saw أو sine. الـ samplers مع الـ Foley artists هما الأساس في إنتاج الـ sound effects؛ والـ hip-hop والـ trip-hop والـ dance والـ jungle والـ trance وغيرهم اتخلقوا بسبب الـ samplers.`,
      `<b>الميزة</b> (مقارنة بالـ physical modelling أو الـ additive): processing power أقل بكتير؛ التفاصيل الدقيقة موجودة في الـ samples المتسجلة مسبقًا، مش بتتحسب في real time. <b>العيب</b>: لو عايز تفاصيل أكتر محتاج كذا sample شغالين مع بعض (الـ trumpet: صوت النَفَس، الـ growl، loop wave)، وده <b>بيقلل الـ polyphony</b> (الـ polyphony بيتقاس بعدد الـ multi-samples اللي ينفع تشتغل في نفس الوقت).`,
      `أمثلة: Mellotron (شريط analog، 1962)، Computer Music Melodian (1976، Stevie Wonder)، <b>CMI Fairlight</b> (1979، حوالي £20,000 — دلوقتي app على الـ iPad)، NED Synclavier (1979)، EMU Emulator (1981)، Akai S (1986)، <b>Korg M1</b> (1988، قدّم فكرة الـ "workstation")، وsoftware samplers زي NI Kontakt، Steinberg Halion (2005).`,
      `<b>Looping</b>: في أواخر الثمانينات/أوائل التسعينات الـ memory كانت غالية، فالـ samples كانت قصيرة وجزء منها بيتعمله loop. النهارده الـ looping لسه بيوفر memory وبيتستخدم في الـ drum tracks والـ effects. الـ loop points: دوّر على <b>silence points (zero crossings)</b>، زي ضربات الدرامز، أو دوّر على أجزاء فيها <b>نفس الـ audio content</b> (pattern matching)، زي الآلات اللي صوتها ممتد (sustaining).`,
      `<b>Pitch control</b>: إنك تسرّع/تبطّأ الـ sample بيغيّر الـ pitch بس بيبقى واقعي في مدى <b>كام semitone</b> بس، فلسه محتاجين samples على طول الـ keyboard (multisampling). إنهاء الـ loop: زمان كانوا بيستخدموا volume envelope يخفّته؛ النهارده فيه <b>tail-off sample</b> بيشتغل مع الـ note-off.`,
      `<b>Multisampling</b>: بتسجّل الآلة على فترات منتظمة بتغطي مناطق من notes جنب بعض (<b>splits</b>) أو كل note — فالانتقال من الـ registers الواطية للعالية يبقى طبيعي أكتر. الـ Drum mapping هو المثال اللي مالوش pitch.`,
      `<b>Velocity layers</b>: الصوت بيعتمد على قد إيه ضربت الزرار/الوتر/الدرام جامد (key velocity). Single layer: الـ volume بس اللي بيتغير، مفيش تغيير في الـ timbre. Dual layer: صوت 1 عند velocity أقل، وصوت 2 عند velocity أعلى. Triple: تلات أصوات. الـ multisamples بتترتب رأسيًا (vertically) في الـ keymap، والـ velocity layers أفقيًا (horizontally)؛ ومعظم الآلات بتجمع الاتنين.`,
      `<b>Keyswitching</b>: زراير (غالبًا زراير واطية برا مدى الآلة) بتختار طريقة العزف (trumpet مكتوم/مفتوح، violin بالنقر/بالقوس) — banks من samples متوزعة على الزراير وفيها velocity layers. الـ samplers المتقدمة فيها أوركسترا كاملة، وكورال بيغني كلام، وتحكم بالـ script (Kontakt 2+).`
    ]},
    { h: `الـ Beat slicing`, pts: [
      `إنك تلزق الـ audio عند الـ <b>silence points</b> بيمنع الـ clicks، بس دي طريقة بسيطة زيادة عشان تلاقي الـ loop points الصح.`,
      `<b>Beat perception</b>: الودن بتلاقي الـ rhythm من تتابع شبه دوري (pseudo-periodic) للـ beats. الصوت بيتسمع كـ beat بس لو الـ energy بتاعته <b>أعلى بكتير من الـ energy history</b> (تغيّر كبير في طاقة الصوت).`,
      `<b>Simple sound-energy detection</b>: احسب الـ energy الـ <b>average</b> على حوالي <b>1 ثانية</b> والـ energy الـ <b>instant</b> على حوالي <b>5/100 ثانية</b>؛ الـ beat بيتكشف لما الـ instant energy &gt; الـ local average. (عند 44.1 kHz ده 44,100 sample قصاد 0.05 × 44,100 = 2,205 sample.)`,
      `<b>Frequency-selected energy</b>: Fourier transform على <b>1024 sample</b>، قسّمه لحوالي <b>32 sub-band</b>، احسب الـ energy في كل واحد وقارنها بالـ average القريب بتاع نفس الـ sub-band؛ لو sub-band أو أكتر عدّى الـ average بتاعه، يبقى فيه beat.`,
      `الأدوات: <b>ReCycle</b> (الـ Sensitivity slider بيعمل slices)، <b>Cubase</b> Sample Editor (Hitpoints + Threshold، وبعدين Create Slices)، <b>Groove Agent One</b> drum sampler (اسحب الملف المتقطّع على pad؛ الـ slices بتروح على pads ورا بعض). التطبيق: MIDI chromatic scale بيشغّل كل slice في وقتها الصح عشان يعيد عمل الـ audio.`,
      `مشاكل الـ tempo: tempo أبطأ → <b>فراغات صامتة (silent gaps)</b> بين الـ slices؛ tempo أسرع → <b>tail overlap</b> (بيقلل وقت التشغيل). الـ attacks بتفضل من غير artefacts (ودي أهم حتة في الـ percussion).`,
      `الحلول: طبّق <b>envelope</b> يخفّت كل slice لحد الصمت قبل الـ gap/الـ overlap؛ وفي حالة الـ gaps، <b>اعمل loop لآخر الـ tail</b> عشان تمدّه ويملا الـ gap.`
    ]},
    { h: `الـ Wavetable synthesis`, pts: [
      `زي الـ digital sine generation/الـ additive synthesis بس متوسعة: الـ lookup table بيشيل <b>period واحد من waveshape عامة</b> (مش sine بس)، والـ waveshape ممكن <b>تتغير dynamically</b> مع تطور الـ note → output <b>quasi-periodic</b>. ماتلخبطهاش مع الـ PCM sample playback العادي في الـ sound cards.`,
      `أمثلة: <b>PPG Wave</b> (array من 64 pointer لموجات single-cycle)، Waldorf Microwave، <b>Roland D-50</b>/MT-32 "Linear Arithmetic" (attack متسجل + sustain أبسط: wave sequence من 2 entries)، Prophet-VS، <b>Korg Wavestation</b> ("vector synthesis" على grid ثنائي الأبعاد 2-D).`,
      `صناعة الموجات: note متسجلة بتتقسم لـ <b>circular sequence من الـ wavetables</b>، كل واحد period واحد (أو الـ tables بتتولد رياضيًا). الـ playback بيجيب الـ samples بالـ <b>table lookup</b>؛ الـ output بيتطور لما table يتمزج مع التاني، مع ADSR enveloping؛ والـ looping ممكن يبطّأ التطور أو يعكسه.`,
      `عمليًا بيخزن جزئين: <b>attack sample</b> (زي المطرقة وهي بتخبط وتر البيانو) بيشتغل مرة واحدة، وبعدين <b>looped sustain segment</b> عليه envelope عشان يخفت بشكل طبيعي.`,
      `مقارنة بالـ sample playback: الـ output دايمًا بيتولد <b>في real time</b>، والموجات اللي في الـ tables نادرًا ما بتبقى أطول من <b>1 أو 2 period</b>.`,
      `الـ Dynamic waveshaping: (1) <b>Linear crossfading</b> — crossfade بالترتيب من table للي بعده باستخدام envelope؛ (2) <b>Sequential enveloping</b> — 2 tables بيتمزجوا في أي لحظة بـ envelopes بتتحرك. الـ Linear crossfading حالة خاصة (subclass) فيها الـ envelopes عبارة عن <b>overlapping triangular pulses</b>.`,
      `<b>المميزات</b>: storage صغير (data أقل بكتير من الـ PCM sample لنفس الصوت)؛ عام زي الـ additive synthesis بحسابات real-time أقل بكتير؛ بيستغل الـ quasi-periodicity عشان يشيل الـ redundancy؛ الـ <b>inverse DFT بيتحسب مسبقًا (precomputed)</b> قبل الـ playback بدل ما يتحسب في real time.`,
      `الـ Demo <code>wavetable_synth.m</code>: period واحد من sine عند 440 Hz وperiod من saw عند 500 Hz بـ Fs = 22050 (22050/440 ≈ 50 sample، 22050/500 = 44.1 sample) وبيتعملهم crossfade؛ ونفس التقنية ممكن تبني ADSR envelope.`
    ]},
    { h: `الـ Granular synthesis`, pts: [
      `"كل الصوت عبارة عن تجميع لـ grains … من sonic quanta." — <b>Iannis Xenakis</b> (1971). بيشتغل على الـ time scale بتاع الـ <b>microsound</b>؛ وليه علاقة بالـ sampling/wavetable synthesis.`,
      `الـ samples بتتقسم لـ <b>grains</b> صغيرة حوالي <b>1–50 ms</b> (الـ grain غالبًا ≈ 10–50 ms). grains كتير بتتحط فوق بعض، كل واحد بسرعة وphase وvolume مختلفين. النتيجة: <b>soundscape / cloud</b> مش tone واحد. لما تغيّر الـ waveform والـ envelope والـ duration والمكان في الفراغ (spatial position) والكثافة (density) بتاعة الـ grains بتطلع أصوات كتير.`,
      `الاستخدامات: موسيقى/ambient soundscapes، sound effects، تغيير سرعة الـ sample مع <b>الحفاظ على الـ pitch/tempo</b>، مادة خام لـ DSP بعد كده؛ والـ effects فيها amplitude modulation، time stretching، توزيع stereo/multichannel، إعادة ترتيب عشوائي، disintegration وmorphing.`,
      `التاريخ: <b>Isaac Beeckman</b> (1618، "globules of sonic data")، <b>Denis Gabor</b> (1947، الـ grain كـ quantum للصوت)، Xenakis (1971، أول استخدام موسيقي بالشريط وموس الحلاقة)، <b>Curtis Roads</b> (1988، digital)، <b>Barry Truax</b> (1990، real-time، "Riverrun"). التطبيقات: Csound، MATLAB، MAX/MSP، Supercollider، Granulab، Kontakt/Intakt، Korg Kaos Pad، Cubase Padshop.`,
      `مكونات الـ grain: <b>envelope</b> (بيمنع الـ clicks/الـ distortion عند الأطراف؛ والـ slope بتاعه بيشكّل الـ spectrum — الـ attacks الحادة بتدي bandwidths أعرض، زي الـ grains القصيرة جدًا) و<b>contents</b> (أي waveform أو sample).`,
      `تلات طرق لتجميع الـ grains: <b>Quasi-synchronous</b> (stream من grains ليهم نفس المدة → amplitude modulation لو الـ grains &lt; 50 ms)، <b>Asynchronous</b> (الـ grains متوزعة stochastically يعني عشوائيًا)، <b>Pitch/Tempo-synchronous</b> (بيحافظ على الـ pitch/tempo وهو بيغيّر سرعة التشغيل؛ envelopes متداخلة ومتزامنة مع frequency الـ waveform بتاعة الـ grain، artefacts أقل).`,
      `الـ Demo <code>granulation.m</code>: 400 grain كل واحد 10–20 ms (من fs×0.01 لـ fs×0.02 sample)، مع Hanning fade-in/out مدته 10 ms. عند 44.1 kHz ده 441–882 sample لكل grain. الـ grains اللي متباعدة بانتظام بتتصرف زي <b>filtered pulse train</b>.`,
      `<b>PSOLA</b> (Pitch Synchronous Overlap-Add): جاي من الـ speech processing؛ بيقسم الـ waveform لـ segments صغيرة متداخلة. الـ Pitch: لو بعّدت الـ segments عن بعض <b>→ pitch أوطى</b>، لو قرّبتهم <b>→ pitch أعلى</b>. المدة: لو <b>كررت segments → أطول</b>، لو <b>شلت شوية → أقصر</b>. بيتجمعوا تاني بالـ overlap-add. وعكس الـ phase vocoder، <b>مفيش STFT</b> في الـ PSOLA (هو أقدم من الـ phase vocoder). grains بعيدة عن بعض → بينهم صمت؛ grains قصيرة كتير ومتداخلة → texture.`
    ]},
    { h: `الـ Physical modelling والـ Karplus-Strong`, pts: [
      `<b>Physical modelling</b>: الصوت بيتولد من <b>mathematical model</b> (معادلات وalgorithms) لمصدر فيزيائي، بـ parameters بتوصف المواد وتفاعل العازف (نقر/قوس على وتر، تغطية خُرم الفلوت، ضرب على membrane درام 2-D).`,
      `أمثلة: Yamaha VL1 (1994)، Roland COSM، Arturia Moog، PianoTeq. الـ Algorithms: <b>Karplus-Strong</b> (1971)، <b>digital waveguide</b> (الثمانينات)، <b>formant synthesis</b> (الخمسينات).`,
      `<b>Karplus-Strong</b>: بيعمل صوت موسيقي من noise عن طريق إنه يعمل loop لـ <b>white-noise burst</b> قصير (L sample) جوه <b>filtered delay line</b> — بيقلّد وتر بيتنقر/بيتخبط أو percussion. هو في الأساس تقنية <b>subtractive</b> فيها feedback loop زي الـ <b>comb filter</b>. الـ gain بتاع الـ filter لازم يكون <b>&lt; 1</b> عند كل الـ frequencies (غالبًا first-order low-pass).`,
      `الـ Tuning: الـ period = طول الـ delay-line + الـ average group delay بتاع الـ filter؛ الـ fundamental = 1/period، يبقى <b>D = Fs / F1</b>.`,
      `محلول: <code>karplus.m</code> بيستخدم fs = 44100، D = 200 → F1 = 44100/200 = <b>220.5 Hz</b>. لو عايز A = 441 Hz محتاج D = 44100/441 = <b>100 sample</b>. الـ filter بتاعه b = −0.99×[0.5 0.5] (averaging بـ gain 0.99 &lt; 1).`,
      `نسخة الدرام: X(t) = +½(X(t−p) + X(t−p+1)) باحتمال <b>b</b>، وإلا −½(…). الـ p (طول الـ wavetable، حوالي 150–500) بيحدد الـ decay (كبير = طويل) والـ pitch (كبير = أوطى). <b>b</b> = blend factor (0–1): b = ½ أحسن <b>snare</b>؛ b قريب من 0 → صوت زي الـ <b>string</b>؛ b قريب من 1 → <b>crash cymbal</b> كهربائي غريب.`,
      `الـ Presets: crash cymbal b &gt; 0.98، p = 200–800، random table، decaying envelope؛ metallic plink b &gt; 0.98، p = 5–50؛ string b &lt; 0.05، p = 20–400. الـ demo الكامل: notes جيتار، fretted strings، chords وstrumming.`
    ]}
  ],
  cards: [
    `Subtractive، additive، FM، sample-based، wavetable، granular، physical modelling.`,
    `بتشيل overtones من مصدر غني (زي sawtooth) بـ filter. أول مثال: الـ Vocoder (1939)؛ واشتهر مع Moog.`,
    `الأحبال الصوتية = oscillator، البُق والزور = filter. "aah" بتسيب معظم الـ harmonics، و"ooh" بتشيل معظمهم.`,
    `Attack (الوقت لحد أعلى volume)، Decay (الوقت لحد ما ينزل للـ sustain)، Sustain (LEVEL ثابت لحد الـ release)، Release (الوقت عشان يخفت بعد ما تسيب الزرار).`,
    `بتبني tones معقدة بجمع tones أبسط (Fourier). الميزة: بيعيد عمل الـ micro-variations بتاعة الـ partials. العيب: مش efficient، data كتير.`,
    `e = A sin(αt + I sin βt)؛ α الـ carrier، β الـ modulator، I = peak deviation / modulator frequency.`,
    `John Chowning، في Stanford سنة 1967-68؛ اتعملها patent 1975؛ واترخصت لـ Yamaha (DX7).`,
    `عند carrier ± n × modulator؛ الـ J0(I) بيحدد الـ amplitude بتاع الـ carrier، والـ Jn(I) بيحدد زوج الـ sidebands رقم n.`,
    `الـ Operators = oscillators (4 أو 6). الـ Algorithms = توصيلات: multiple carriers، multiple modulators، feedback.`,
    `الميزة: processing power قليلة، والتفاصيل متخزنة في الـ samples. العيب: التفاصيل محتاجة samples كتير شغالة مع بعض، وده بيقلل الـ polyphony.`,
    `الـ Multisampling بيغطي مناطق الـ pitch (رأسي في الـ keymap)؛ الـ velocity layers بتبدّل الأصوات حسب قوة ضغطة الزرار (أفقي).`,
    `فيه beat لما الـ instant energy (~0.05 s) تعدّي الـ average energy (~1 s).`,
    `الـ table بيشيل period واحد من waveform عامة؛ والـ tables بيتعملها crossfade/envelope مع الوقت. بيخزن attack sample + looped sustain.`,
    `حوالي 1-50 ms (غالبًا 10-50 ms)؛ الـ grain = envelope + contents.`,
    `D = Fs / F1. مثال: 44100 / 200 = 220.5 Hz.`
  ],
  qa: [
    `الآلات الحقيقية الـ volume بتاعها بيتغير مع الوقت بطرق مميزة (الـ organ ثابت وبعدين بيقف بسرعة، الجيتار عالي وبعدين بيخفت). الـ ADSR بيعمل model للكلام ده: Attack = الصوت بيوصل لأعلى volume بسرعة قد إيه، Decay = بينزل للـ sustain level بسرعة قد إيه، Sustain = الـ level الثابت اللي بيفضل طول ما الزرار متداس، Release = بيخفت بسرعة قد إيه بعد ما تسيب الزرار. وممكن كمان يتحكم في الـ filter frequency أو الـ pitch.`,
    `الاتنين ممكن يكونوا مبنيين على أفكار Fourier. الـ Additive بيجمع partials كتير sinusoidal كل واحد بالـ envelope بتاعه؛ صوته غني بس مش efficient (data كتير وinverse DFT في real-time). الـ Wavetable بيخزن period واحد من waveform عامة في كل table وبيعمل crossfade/envelope بين الـ tables؛ الـ inverse DFT بيتحسب مسبقًا، فهو compact ومحتاج حسابات real-time أقل بكتير وفي نفس الوقت عام بنفس القدر.`,
    `الميزة: processing power أقل بكتير من الـ physical modelling أو الـ additive synthesis، لأن التفاصيل الدقيقة موجودة في samples متسجلة مسبقًا. العيب: التفاصيل الأكتر محتاجة كذا sample شغالين مع بعض (زي نَفَس الـ trumpet، الـ growl، الـ loop)، وده بيقلل الـ polyphony.`,
    `burst قصير من الـ white noise بيدخل delay line؛ الـ output بتاع الـ delay بيعدي على low-pass filter الـ gain بتاعه أقل من 1 وبيتمزج مع الـ output وبيرجع تاني (feedback) للـ delay line. ده feedback loop من نوع subtractive وشبه الـ comb filter وبيقلّد وتر بيتنقر. الـ period بيساوي طول الـ delay + الـ group delay بتاع الـ filter، يبقى D = Fs / F1 (مثلًا 44100/200 = 220.5 Hz).`,
    `بيقسم الـ waveform لـ segments صغيرة متداخلة. لو قرّبت الـ segments من بعض الـ pitch بيعلى، ولو بعّدتهم بيوطى. لو كررت segments الصوت بيطول، ولو شلت شوية بيقصر. الـ segments بتتجمع تاني بالـ overlap-add. ومش بيستخدم STFT، عكس الـ phase vocoder.`,
    `الـ tempo الأبطأ بيسيب فراغات صامتة (silent gaps) بين الـ slices؛ والـ tempo الأسرع بيخلي الـ tails بتاعة الـ slices تتداخل. الحلول: طبّق envelope يخفّت كل slice للصمت قبل الـ gap أو الـ overlap، وفي حالة الـ gaps اعمل loop لآخر الـ tail عشان تمدّه.`
  ],
  quiz: [
    [`الـ Additive synthesis بيبني الأصوات بجمع partials، مش بإنه يشيلهم بالـ filter.`, `صح. الـ filter بيشيل (subtract) الـ partials العالية من مصدر غني.`, `الـ Granular synthesis بيستخدم grains صغيرة 1-50 ms، مش filtering لـ waveform.`, `الـ FM بيغيّر الـ timbre بالـ modulation للـ frequency، مش بالـ filtering.`],
    [`الـ Attack ده وقت: الصوت بيوصل لأعلى volume بسرعة قد إيه.`, `الـ Decay ده وقت: الصوت بينزل للـ sustain level بسرعة قد إيه.`, `صح. الـ Sustain هو الـ volume الثابت اللي بيفضل لحد ما تسيب الزرار.`, `الـ Release ده وقت: الصوت بيخفت بسرعة قد إيه بعد ما تسيب الزرار.`],
    [`الـ carrier frequency هي α.`, `صح. هو اللي بيتحكم في عدد الـ sidebands اللي فيها energy ملحوظة.`, `الـ peak amplitude هو A.`, `ده e.`],
    [`دول الـ first-order sidebands (440 ± 30).`, `صح. 440 ± 2×30 = 380 و500 Hz، بـ amplitude J2(I).`, `دول الـ third-order sidebands (440 ± 90).`, `دول harmonics للـ 440، مش FM sidebands.`],
    [`Moog شهّر الـ subtractive synthesisers.`, `صح. 1967-68، اتعملها patent سنة 1975 واترخصت لـ Yamaha.`, `Xenakis مرتبط بالـ granular synthesis.`, `Gabor اقترح الـ grain كـ quantum للصوت.`],
    [`النسب الـ integer (harmonic) بتدي أصوات harmonic.`, `صح. النسب الـ non-harmonic بتعمل أصوات inharmonic زي الجرس وpercussive.`, `من غير modulation بيفضل carrier عادي.`, `مالوش علاقة بتصميم الـ timbre.`],
    [`لأ يقدر؛ ودي ميزته أصلًا.`, `صح. كل partial محتاج data خاصة بيه للـ frequency/amplitude.`, `هو بيجمع waveforms بسيطة، غالبًا sines.`, `ده عيب الـ sample-based synthesis.`],
    [`ده اللي بيعمله الـ additive synthesis؛ الـ wavetable بيحسبه مسبقًا.`, `صح. بيستغل الـ quasi-periodicity عشان يشيل الـ redundancy.`, `الـ tables نادرًا ما بتبقى أطول من 1-2 period.`, `الـ Dynamic waveshaping (crossfading، enveloping) ميزة أساسية فيه.`],
    [`صح. الـ grains حتت صغيرة، غالبًا 10-50 ms.`, `طويل جدًا؛ دي samples عادية.`, `قصير جدًا ومش هيشيل محتوى مسموع.`, `ده مش grain.`],
    [`الـ segments الأقرب هي اللي بتعلّي الـ pitch.`, `صح. المسافة الأوسع معناها period أطول، يعني pitch أوطى.`, `المدة بتتغير بتكرار أو شيل segments.`, `الـ PSOLA مش بيستخدم STFT؛ ده الـ phase vocoder.`],
    [`ده خلط بين D والـ frequency.`, `صح. F1 = Fs / D = 44100 / 200 = 220.5 Hz.`, `ده محتاج D = 100.`, `غلط: 44100 × 0.2.`],
    [`صح. الودن بتسمع beat لما الـ energy تبقى أكبر بكتير من تاريخها القريب.`, `الـ Zero crossings بتستخدم للـ loop points، مش للـ beats.`, `ده الشرط بالعكس.`, `في طريقة الـ sub-bands، الـ beat هو band أو أكتر فوق الـ average بتاعهم.`],
    [`الـ Gaps بتظهر لما الـ tempo يبقى أبطأ.`, `صح. الـ slices بتبدأ قبل ما الـ tail بتاع اللي قبلها يخلص.`, `الـ Attacks بتفضل من غير artefacts.`, `مالوش علاقة.`]
  ],
  extra: [
    [`ده مجرد إعادة استخدام للـ frequency؛ طول الـ delay هو Fs ÷ F1.`, `D = Fs / F1 = 44,100 / 294 = 150 sample.`, `ده هيدي 44,100/300 = 147 Hz، يعني octave أوطى.`, `ده 1/294 s، يعني الـ period بالثواني، مش بالـ samples (نسيت تضرب × Fs).`],
    [`دول الـ first-order sidebands (n = 1).`, `دول الـ second-order sidebands (n = 2).`, `الـ Sidebands بتبقى عند fc ± n·fm: 1000 ± 3 × 150 = 1000 ± 450.`, `ده ضرب الـ carrier في 3؛ الـ n بيتضرب في frequency الـ MODULATOR، مش الـ carrier.`],
    [`ده ضرب في Fs بدل الـ Nyquist frequency اللي هي Fs/2.`, `الـ 0.1 قيمة normalised (نسبة من الـ Nyquist)، مش frequency بالـ Hz.`, `ده الـ cut-off بتاع إعداد الـ 0.04 في المحاضرة (0.04 × 11,025)، مش 0.1.`, `الـ cut-off نسبة من الـ Nyquist (Fs/2 = 11,025 Hz): 0.1 × 11,025 = 1102.5 Hz.`],
    [`ده الـ window اللي ~1 s المستخدم للـ local AVERAGE energy.`, `الـ 1024 sample ده حجم الـ FFT في طريقة الـ frequency-selected، مش الـ instant window.`, `الـ instant window حوالي 5/100 s: 0.05 × 48,000 = 2400 sample.`, `ده 0.05 × 44,100؛ الـ audio هنا 48 kHz.`],
    [`صح — الـ organ بيعزف بـ volume ثابت وبيموت بسرعة لما تسيب الزرار.`, `غلط — الجرس الـ release بتاعه طويل.`, `غلط — ده مثال المحاضرة على release طويل.`, `غلط — الجيتار مثال لصوت بيبقى أعلى حاجة بعد النقر على طول وبعدين بيخفت؛ مش متقال كمثال على release قصير.`],
    [`غلط — ده oscillator واحد بيعمل modulate لـ 2 carriers أو أكتر.`, `صح — الـ feedback: oscillator بيعمل modulate لنفسه.`, `غلط — ده 2 oscillators أو أكتر بيعملوا modulate لـ carrier واحد.`, `غلط — دي تقنية wavetable، مش FM algorithm.`],
    [`غلط — الـ ADVANTAGE بتاعه إن الـ processing power أقل بكتير، لأن التفاصيل متسجلة مسبقًا.`, `غلط — هو بيستخدم تسجيلات لآلات حقيقية كـ seed waveforms.`, `غلط — ده عيب الـ additive synthesis.`, `صح — مثلًا الـ trumpet محتاج صوت النَفَس والـ growl والـ looping wave مع بعض.`],
    [`صح — الـ keyswitches بتختار طريقة العزف من banks من samples متوزعة على الزراير وفيها velocity layers.`, `غلط — الـ velocity layers بتغيّر الصوت حسب قوة ضغطة الزرار.`, `غلط — الـ multisampling بيسجّل الآلة على فترات (splits) على طول الـ keyboard.`, `غلط — الـ looping بيكرر جزء من الـ sample عشان يوفر memory.`],
    [`غلط — b قريب من 0 بيدي صوت زي الـ string.`, `صح — b = ½ بيدي أحسن snare.`, `غلط — b قريب من 1 بيدي صوت crash-cymbal كهربائي غريب.`, `غلط — b ده probability/blend factor بين 0 و1.`],
    [`غلط — المحاضرة بتقول مفيش STFT في الـ PSOLA؛ هو بيشتغل على segments متداخلة في الـ time domain.`, `صح — الـ PSOLA مفيهوش STFT (أقدم من الـ phase vocoder)؛ بيحرّك أو يكرر أو يشيل segments متداخلة وبيعملهم overlap-add.`]
  ]
};

AR.mm.lectures["6"] = {
  notes: [
    { h: `يعني إيه MIDI وليه بيعتبر compression tool؟`, pts: [
      `<b>تعريف الـ MIDI</b>: <b>protocol</b> بيخلّي الكمبيوترات والـ synthesisers والـ keyboards وأي أجهزة موسيقية تانية <b>تتواصل</b> مع بعض.`,
      `مابقاش للموسيقيين بس: الـ MIDI بديل <b>bandwidth قليلة جدًا</b> على الـ Web لنقل الموسيقى وبعض الـ sound-effect data، وبيتستخدم (بشكل متعدّل) كـ <b>compression control language</b> (MPEG-4، HTML5).`,
      `الـ MIDI كـ compression: الملف محتاج بس <b>كام 100K bytes</b> storage / bandwidth قليلة جدًا، لأن الـ MIDI بيبعت <b>تعليمات</b> (أنهي note، بصوت عالي قد إيه، أنهي instrument)، مش audio samples.`,
      `<b>مسؤولية إنتاج الصوت بتتنقل للـ client</b>: synthesiser module أو sampler أو soundcard أو software synth. معظم الـ web browsers بتعرف تتعامل مع الـ MIDI (plugins زي QuickTime وMPEG-4، ومن 2013 فيه <b>Web MIDI API</b> في HTML5).`,
      `التاريخ: الـ MIDI عمره حوالي <b>40 سنة</b> (2022/3) ولسه بيتطور، زي <b>MIDI 2.0</b> ("High Definition MIDI"). حتى الـ iPad شغّل sequencer قديم بتاع Commodore.`
    ]},
    { h: `مكونات الـ MIDI system`, pts: [
      `<b>Synthesiser / Sampler</b>: <b>sound generator</b> (pitch وloudness وtone colour مختلفين) بيستخدم أي طريقة synthesis أو sample-based. في الكورس ده "synthesiser" = <b>وحدة توليد الـ tone</b>. فيه MIDI IN/OUT و/أو USB/Bluetooth/WiFi؛ وممكن يكون software (virtual MIDI connections).`,
      `<b>Sequencer</b>: وحدة hardware مستقلة أو software على كمبيوتر؛ فيه MIDI INs/OUTs و/أو USB/Bluetooth/WiFi؛ والـ software sequencers جواها virtual MIDI connections داخلية.`,
      `<b>Computer</b>: هو <b>قلب</b> الـ MIDI system؛ بيتحكم في <b>الـ scheduling والـ synchronisation والـ recording</b> لكل الـ data. الـ sequencers دلوقتي عايشة جوه <b>Digital Audio Workstations</b> (Cubase، Logic، Sonar، Live، Reason) مع softsynths (VSTi، Audio Units)، وreal-time effects وكمان video control.`,
      `<b>MIDI control input devices</b>: غالبًا keyboard فيه controls زيادة (sustain، pitch bend، modulation، aftertouch)؛ أو instrument تاني (جيتار متعدّل، wind controller)، أو مجموعة controllers، motion capture، virtual input، وحتى "mind control"؛ وفيه breath وmotion وbite controllers.`,
      `<b>MIDI interfaces</b>: بتوصّل أجهزة الـ MIDI بالكمبيوتر، wired أو wireless؛ غالبًا بتبقى مدمجة في الـ keyboard/controller أو في audio interface؛ عن طريق MIDI cable أو USB أو Ethernet أو Bluetooth أو WiFi.`,
      `<b>MIDI control output devices</b>: الـ MIDI بيتحكم في حاجات أكتر من الصوت: <b>الإضاءة، الـ robotics</b> (الـ robot band بتاعة Pat Metheny، الـ <b>Orchestrion</b>)، video systems (video DJing)، <b>MPEG-4 compression</b>، وحتى "hamster control".`
    ]},
    { h: `مفاهيم الـ MIDI الأساسية والـ hardware`, pts: [
      `<b>Track</b>: بيتستخدم في الـ sequencer عشان ننظّم التسجيلات؛ ممكن نشغّل/نطفي الـ tracks وقت الـ recording أو الـ playback.`,
      `<b>Channel</b>: بيفصل المعلومات في الـ MIDI system. فيه <b>16 MIDI channel في "cable" واحد</b>. رقم الـ channel <b>بيتكتب جوه كل MIDI message</b>.`,
      `<b>Timbre</b>: نوعية الصوت (صوت flute، صوت cello…). <b>Multitimbral</b> = يقدر يشغّل أصوات كتير مختلفة في نفس الوقت (piano، brass، drums…).`,
      `<b>Pitch</b>: الـ note الموسيقية اللي الـ instrument بيعزفها.`,
      `<b>Voice</b>: الجزء من الـ synthesiser اللي بيطلّع الصوت. الـ synthesisers فيها voices كتير (12، 20، 24، 36…)، كل واحد شغال لوحده وفي نفس الوقت عشان يطلّع أصوات بـ timbre وpitch مختلفين.`,
      `<b>Patch</b>: الـ control settings اللي بتحدد timbre معيّن.`,
      `<b>Connectors</b>: الـ interface الـ standard هو USB أو (القديم) <b>تلات ports بـ 5 pins</b>: <b>MIDI IN</b> (بيستقبل كل الـ MIDI data)، <b>MIDI OUT</b> (بيبعت الـ data اللي الجهاز <b>بيولّدها بنفسه</b>)، <b>MIDI THROUGH</b> (بيعمل <b>echo</b> للـ data اللي جت على الـ MIDI IN). الأجهزة الحديثة بتجمّعهم وبتتوصل مباشرة (USB/Ethernet، Bluetooth/WiFi).`
    ]},
    { h: `تركيب الـ MIDI messages`, pts: [
      `الـ MIDI messages هي طريقة تواصل الأجهزة؛ والـ bandwidth بتاعتها قليلة جدًا. الـ <b>Note On</b> بتقول أنهي key اتداس وعلى أنهي channel (أي صوت يتعزف) بـ <b>3 أرقام hexadecimal</b> بس. الـ Note Off شبهها؛ والـ commands التانية (زي <b>program change</b>) بتظبط الأصوات.`,
      `الـ message = <b>status byte واحد + لحد اتنين data bytes</b>.`,
      `<b>Status byte</b>: الـ most significant bit (MSB) = <b>1</b>؛ الـ <b>4 low-order bits = الـ channel</b> (4 bits → 16 channel)؛ والـ <b>3 bits الباقيين = نوع الـ message</b>.`,
      `<b>Data byte</b>: الـ MSB = <b>0</b>، فكل data value بتبقى 7 bits: <b>0–127</b> (hex 00–7F). وعشان كده الـ status bytes بتبقى hex 80–FF.`,
      `ترقيم الـ channels: الـ nibble بيشيل 0–15 بس الموسيقيين بيرقّموا الـ channels <b>1–16</b>. مثال السلايد بيستخدم channel 13 = hex C (يعني قيمة الـ nibble 12 + 1).`,
      `التقسيم: <b>Channel messages</b> → <b>voice</b> messages و<b>mode</b> messages. <b>System messages</b> → <b>common</b> و<b>real-time</b> و<b>exclusive</b> messages.`
    ]},
    { h: `الـ Channel voice والـ mode messages`, pts: [
      `<b>الـ Channel voice messages</b> بتتبعت على <b>channels منفردة</b> مش global لكل الأجهزة. بتقول للـ receiver يوزّع أصوات على الـ voices بتاعته، ويشغّل ويطفي notes، ويغيّر صوت الـ notes الشغالة.`,
      `<b>الـ Channel mode messages</b> حالة خاصة من <b>Control Change (Bx، binary 1011nnnn)</b>. الفرق في <b>أول data byte</b>: القيم من <b>121 لـ 127</b> محجوزة للـ channel mode messages. وهي بتحدد <b>الـ instrument بيعالج الـ voice messages إزاي</b>.`
    ]},
    { h: `أمثلة محلولة: فك وحساب حجم الـ MIDI messages`, pts: [
      `<b>القاعدة</b>: أول hex digit = نوع الـ message، تاني hex digit = الـ channel − 1. الـ channel n (1–16) → nibble n − 1.`,
      `<b>9C 50 7F</b> (مثال السلايد): Note On، channel 13، key 80، velocity 127. <b>3 bytes</b>.`,
      `<b>80 3C 40</b>: 8 = Note Off، 0 → channel 1؛ 3C = 3×16 + 12 = <b>60</b>؛ 40 = 4×16 = <b>64</b>. يعني Note Off، channel 1، key 60، release velocity 64.`,
      `<b>Note On، key 38 (Acoustic Snare في الـ GM percussion map)، velocity 100، على channel 10</b> (الـ GM drum channel): الـ status 9 + (10 − 1 = 9) = <b>99</b>؛ 38 = 2×16 + 6 = <b>26</b>؛ 100 = 6×16 + 4 = <b>64</b>. الـ message: <b>99 26 64</b>.`,
      `الـ <b>Program change</b> فيها data byte <b>واحد</b> بس (2 bytes في المجموع)؛ والـ <b>channel pressure</b> كمان 2 bytes. أما الـ note on/off والـ poly pressure والـ control change والـ pitch bend فـ 3 bytes.`,
      `<b>مقارنة الحجم</b>: مقطوعة مدتها دقيقة فيها 1000 note محتاجة 1000 Note On + 1000 Note Off = 2000 × 3 = <b>6000 bytes</b>. دقيقة واحدة stereo CD audio = 44100 × 16 × 2 × 60 / 8 = <b>10,584,000 bytes</b> (حوالي 10 MB). وعشان كده بنقول على الـ MIDI إنه compression tool.`,
      `<b>وقت الإرسال</b> (معلومة standard من MIDI 1.0، مش في السلايدز): الـ serial link شغال بـ <b>31.25 kbaud</b> وكل byte بيتبعت كـ <b>10 bits</b> (start + 8 data + stop). يعني message من 3 bytes = 30 bits / 31,250 bit/s = <b>0.96 ms</b>، فتقريبًا 1041 message من 3 bytes في الثانية.`
    ]},
    { h: `الـ System messages والـ General MIDI`, pts: [
      `<b>الـ System messages</b> بتشيل معلومات <b>مش خاصة بـ channel معيّنة</b>: timing signals للـ synchronisation، الـ positioning في sequences متسجلة قبل كده، والـ setup التفصيلي للجهاز اللي بيستقبل (الأصوات، أسماء الـ patches).`,
      `<b>System real-time</b> (timing/synchronisation): Timing Clock <b>F8</b>، Start Sequence <b>FA</b>، Continue <b>FB</b>، Stop <b>FC</b>، Active Sensing <b>FE</b>، System Reset <b>FF</b>.`,
      `<b>System common</b> (messages مالهاش علاقة ببعض): MIDI Timing Code <b>F1</b> (1 data byte)، Song Position Pointer <b>F2</b> (2)، Song Select <b>F3</b> (1)، Tune Request <b>F6</b> (ولا واحد).`,
      `<b>System exclusive (Sysex)</b>: للحاجات اللي مينفعش تتعمل standard (إنشاء/تنظيم الأصوات اللي بيعتمد على الـ system؛ مش GM compliant). إضافة على الـ spec الأصلي: stream من الـ bytes الـ high bits بتاعتها 0، محطوطة بين <b>F0 (Sysex Start)</b> و<b>F7 (Sysex End)</b>. الـ format بيعتمد على الـ system.`,
      `<b>General MIDI (GM)</b>: المشكلة = موسيقى الـ MIDI ممكن متطلعش بنفس الصوت في كل حتة. الـ GM = <b>MIDI + Instrument Patch Map + Percussion Key Map</b> عشان المقطوعة تطلع (تقريبًا) بنفس الصوت في أي مكان.`,
      `<b>الـ Patch map</b>: لستة standard فيها <b>128 instrument</b> في 16 family كل واحدة 8 (1–8 Piano، 9–16 Chromatic Percussion، 17–24 Organ، 25–32 Guitar، 33–40 Bass، 41–48 Strings، 49–56 Ensemble، 57–64 Brass، 65–72 Reed، 73–80 Pipe، 81–88 Synth Lead، 89–96 Synth Pad، 97–104 Synth Effects، 105–112 Ethnic، 113–120 Percussive، 121–128 Sound Effects). مثلًا 1 Acoustic Grand، 41 Violin، 57 Trumpet، 74 Flute، 128 Gunshot.`,
      `<b>الـ Percussion map</b>: <b>47 percussion sound</b> على الـ keys <b>35–81</b> (35 Acoustic Bass Drum، 38 Acoustic Snare، 42 Closed Hi-Hat، 49 Crash Cymbal 1، 81 Open Triangle). الـ percussion اللي بالـ keys بتتبعت على <b>channel 10</b> by default (وممكن channels تانية). كل key في الأساس عبارة عن <b>switch</b>، مفيهوش pitch information؛ وممكن كمان يشغّل video (VJ).`,
      `<b>متطلبات الـ GM</b>: يدعم كل الـ <b>16 channel</b>؛ كل channel تقدر تعزف instrument مختلف (<b>multitimbral</b>)؛ كل channel تقدر تعزف notes كتير (<b>polyphony</b>)؛ وعلى الأقل <b>24</b> voice بيتوزعوا dynamically بالكامل (غالبًا 64/128) ومتقسمين على كل الـ channels.`
    ]},
    { h: `عيوب الـ MIDI والـ MPEG-4 Structured Audio`, pts: [
      `<b>العيوب</b>: عدد channels وcontrollers محدود؛ resolution محدودة (معظم أرقام الـ MIDI 8-bit). الحلول: ندمج قيمتين data كـ LSB وMSB (<b>range 16-bit</b>، زي ما السلايد بتقول)؛ <b>Open Sound Control (OSC)</b>؛ <b>MIDI 2.0</b> High Definition MIDI.`,
      `<b>الـ MPEG-4 audio</b> بيجمع <b>الـ compression والـ synthesis والـ MIDI</b>: بيعمل encode لـ <b>أنهي note تتعزف وتتعزف إزاي</b> بعدد صغير من الـ parameters، وده تقليل أكبر بكتير من إنك تعمل encode للـ audio bits. وإنتاج الـ audio بيتساب للـ generation side.`,
      `الـ MPEG-4 أحدث من MP3، وبيغطي كل حاجة من speech بـ bit-rate قليل جدًا لحد audio full-bandwidth بجودة عالية، وفيه anti-piracy measures built-in.`,
      `<b>الـ 6 Structured Audio tools</b>: <b>SAOL</b> (Orchestra Language)، <b>SASL</b> (Score Language)، <b>SASBF</b> (Sample Bank Format)، <b>MIDI semantics</b> (التحكم في SAOL بـ subset من الـ MIDI)، <b>Scheduler</b> (إزاي نجمّع الأجزاء عشان نطلّع صوت)، <b>AudioBIFS</b> (جزء من BIFS، بيبني soundtracks بـ tools وeffects).`,
      `<b>SAOL</b> (بتتنطق "sail"): الجزء الأساسي؛ software-synthesis language بتوصف الـ synthesisers/instruments؛ معمولة للـ MPEG-4؛ ومش مربوطة بطريقة واحدة: FM، physical modelling، sample-based، granular، subtractive، FOF والـ hybrids.`,
      `<b>SASL</b>: language بسيطة جدًا للتحكم في instruments الـ SAOL: أنهي notes، بصوت عالي قد إيه، أنهي tempo، مدتها قد إيه، وإزاي نتحكم فيها. زي الـ MIDI بس من غير حدود الـ MIDI في الـ temporal resolution/bandwidth، ومعاها controller structure أغنى. عيوبها: مفيش looping ولا sections ولا repeats ولا expression evaluation؛ ومعظم الـ scores بتتعمل بـ automatic tools.`,
      `<b>SASBF</b>: بتنقل banks من الـ samples بكفاءة للـ wavetable/sample-based synthesis؛ متوافقة جزئيًا مع MIDI <b>DLS</b> (Downloaded Sounds)؛ ووراها <b>EMu Systems</b> والـ <b>MMA</b>.`,
      `<b>MIDI semantics</b>: الـ SAOL ممكن يتشغّل بـ SASL scripts أو بـ MIDI، لأن الـ MIDI هو أشهر score representation وtools كتير (sequencers) بتستخدمه. الـ MIDI syntax بيفضل external (MMA standard) بس بعض الـ semantics بتتعرّف من جديد في MPEG-4.`,
      `<b>Scheduler</b>: الجسم الرئيسي للـ Structured Audio؛ بيحدد الـ SAOL بيطلّع الصوت إزاي لما يتشغّل بـ MIDI أو SASL.`,
      `<b>AudioBIFS</b>: الـ BIFS = MPEG-4 <b>Binary Format for Scene Description</b>، بيوصف الـ objects (video، أصوات، animations) بتتركب مع بعض إزاي. الـ AudioBIFS بيحدد <b>الـ mixing والـ post-production</b> للـ audio scenes وقت الـ playback (زي صوت متمكسج مع background music، fading بعد 10 s، موسيقى جديدة بـ reverb). ده VRML متوسّع (extended). مثال الـ tree: Piano وBass وVocal AudioSources → AudioFX / AudioDelay → AudioMix nodes → الـ AudioMix النهائي.`,
      `<b>HTML5 Web MIDI API</b>: بتخلّي الـ web developers يوصلوا لأجهزة الـ MIDI input/output (hardware وsoftware) بـ JavaScript؛ synthesis جوه الـ browser؛ والدعم لسه مش كامل في كل الـ browsers. أمثلة: <b>Google Doodle Mini Moog</b> (subtractive synthesis، عيد ميلاد Bob Moog الـ 78)، modular subtractive synth، FM (DX7) synth، drum machine، granular synth، Chrome Music Lab.`
    ]}
  ],
  cards: [
    `protocol بيخلّي الكمبيوترات والـ synthesisers والـ keyboards وأي أجهزة موسيقية تانية تتواصل مع بعض.`,
    `بيبعت تعليمات (note، velocity، instrument) مش audio samples؛ كام 100 KB وbandwidth قليلة جدًا؛ وتوليد الصوت بيتنقل للـ client.`,
    `16 (متكتوبين في الـ 4 low-order bits بتوع الـ status byte).`,
    `الـ MSB = 1، الـ 3 bits اللي بعده = نوع الـ message، والـ 4 bits الواطيين = الـ channel.`,
    `الـ MSB = 0، فالقيم من 0 لـ 127 (hex 00 لـ 7F).`,
    `9x / 8x، حيث x = رقم الـ channel ناقص 1.`,
    `Note On، channel 13، key 80، velocity 127.`,
    `Cx + data byte واحد (رقم الـ program)؛ 2 bytes في المجموع.`,
    `Control Change (Bx) messages أول data byte فيها من 121 لـ 127.`,
    `الـ IN بيستقبل data؛ الـ OUT بيبعت الـ data اللي الجهاز بيولّدها بنفسه؛ الـ THROUGH بيعمل echo للي بيوصل على الـ IN.`,
    `F0 بيبدأ وF7 بينهي الـ system exclusive message.`,
    `F8 clock، FA start، FB continue، FC stop، FE active sensing، FF reset.`,
    `MIDI + patch map فيها 128 instrument + percussion key map فيها 47 sound؛ الـ drums على channel 10؛ وعلى الأقل 24 voice.`,
    `الـ Voice = الجزء من الـ synth اللي بيطلّع الصوت؛ الـ Patch = الـ settings اللي بتحدد timbre؛ الـ Timbre = نوعية الصوت (flute، cello).`,
    `SAOL، SASL، SASBF، MIDI semantics، Scheduler، AudioBIFS.`
  ],
  qa: [
    `status byte وبعده لحد اتنين data bytes. الـ status byte الـ most significant bit بتاعه = 1، وفيه 3 bits لنوع الـ message و4 low-order bits للـ channel (16 channel). الـ data bytes الـ most significant bit بتاعها = 0، فبتشيل قيم من 0 لـ 127.`,
    `9C 50 7F. الـ 9 معناها Note On والـ C (12) بتمثّل channel 13؛ 50 hex = 80 وده رقم الـ key؛ 7F hex = 127 وده أقصى velocity.`,
    `Channel messages (voice messages وmode messages) وsystem messages (common وreal-time وexclusive messages).`,
    `standard عشان موسيقى الـ MIDI تطلع تقريبًا بنفس الصوت في أي مكان: MIDI + patch map فيها 128 instrument + percussion key map فيها 47 sound (الـ percussion على channel 10). جهاز الـ GM لازم يدعم كل الـ 16 channel، ويكون multitimbral، ويكون polyphonic، وعنده على الأقل 24 voice بيتوزعوا dynamically.`,
    `عدد channels وcontrollers محدود، وresolution للـ data محدودة (معظمها 8-bit). الحلول: نربط قيمتين data كـ LSB/MSB عشان range أكبر، Open Sound Control، والـ MIDI 2.0 High Definition MIDI.`,
    `الـ SAOL بيوصف الـ synthesisers/instruments؛ الـ SASL هو الـ score اللي بيقول للـ SAOL يعزف أنهي notes وبصوت عالي قد إيه والـ tempo والمدة؛ الـ SASBF بينقل sample banks للـ wavetable synthesis؛ الـ MIDI semantics بتخلّي subset من الـ MIDI يتحكم في الـ SAOL؛ الـ Scheduler بيحدد الـ SAOL بيطلّع الصوت إزاي لما يتشغّل بـ MIDI أو SASL؛ والـ AudioBIFS بيوصف الـ mixing والـ post-production للـ audio scenes.`
  ],
  quiz: [
    [`صح. الـ 4 bits بيدّوا 16 channel ممكنة.`, `نوع الـ message هو الـ 3 bits اللي بعد الـ MSB.`, `الـ velocity بتتشال في data byte.`, `رقم الـ key هو أول data byte في الـ note message.`],
    [`ده الـ status byte.`, `هو ثابت عشان الـ receivers يقدروا يفرّقوا الـ status من الـ data.`, `صح. وعشان كده قيم الـ data من 0 لـ 127.`, `الـ MIDI bytes مفيهاش parity bit في الـ message.`],
    [`الـ 9x يعني Note On، والقيم لازم تتقري hex.`, `الـ Program change هي Cx وفيها data byte واحد بس.`, `الـ Control change هي Bx.`, `صح. 9 = Note On، الـ C بتمثّل channel 13، 50h = 80، 7Fh = 127.`],
    [`الـ A = 10 بتمثّل channel 11، لأن الـ channels من 1–16 بتتكتب 0–15.`, `صح. channel 10 → nibble 9، والـ Note On → 9، يبقى 99.`, `الـ 8x يعني Note Off.`, `الـ Cx يعني Program Change.`],
    [`صح. status Cx + data byte واحد (رقم الـ program).`, `محتاجة status byte ورقم program.`, `الـ Program change مفيهاش data byte تاني.`, `مفيش channel message حجمها 4 bytes.`],
    [`message غلط.`, `الـ Sysex ده system message، مش channel message.`, `الـ Pitch bend بتشيل قيم MSB/LSB.`, `صح. أرقام الـ controllers دي محجوزة للـ mode messages.`],
    [`الـ OUT بيبعت الـ data اللي الجهاز بيولّدها بنفسه.`, `الـ IN بيستقبل data.`, `صح.`, `الـ USB ده توصيلة حديثة، مش الـ port اللي بيعمل echo.`],
    [`دول Timing Clock وStop Sequence (real-time).`, `صح. F0 = Sysex Start، F7 = Sysex End.`, `دول Start وContinue Sequence.`, `دول Note Off/On على channel 1.`],
    [`مش دي الـ GM drum channel.`, `مش دي الـ GM drum channel.`, `الـ default هو channel 10 (وممكن channels تانية).`, `صح.`],
    [`صح. 16 family كل واحدة 8.`, `الـ 47 ده عدد الـ percussion sounds.`, `الـ 16 ده عدد الـ channels.`, `الـ 24 ده أقل عدد voices.`],
    [`ده عدد الـ channels.`, `ده حجم الـ percussion map.`, `صح (وفي الواقع غالبًا 64/128).`, `ده حجم الـ patch map.`],
    [`الـ SASL هي الـ score language اللي بتقول للـ instruments تعزف إيه.`, `الـ SASBF بينقل الـ sample banks.`, `الـ AudioBIFS بيوصف الـ mixing/post-production للـ audio scenes.`, `صح. الـ Structured Audio Orchestra Language، وبتتنطق "sail".`],
    [`صح. 3 × 10 = 30 bits؛ 30 / 31,250 = 0.00096 s.`, `غلط بعامل 10: 30 / 31250 = 0.00096 s.`, `أكبر من الصح بعامل 10.`, `ده يبقى 3 × 8 = 24 bits، يعني تجاهلت الـ start/stop bits.`]
  ],
  extra: [
    [`الـ nibble 3 ده الـ channel − 1، فرقم الـ channel عند الموسيقي يبقى 4.`, `الـ Program Change هي Cx وفيها data byte واحد بس؛ الـ Bx هي Control Change.`, `B = Control Change؛ الـ low nibble 3 → channel 3 + 1 = 4؛ 07 = 7؛ 64 hex = 6×16 + 4 = 100.`, `الـ 64 دي hexadecimal؛ بالـ decimal تبقى 100.`],
    [`Note Off = 8x؛ channel 6 → nibble 5 → 85؛ key 64 = 4×16 = 40 hex؛ velocity 00.`, `الـ channel nibble = الـ channel − 1، فـ channel 6 تبقى 5 مش 6.`, `الـ 9x يعني Note On، مش Note Off.`, `الـ 64 ده رقم الـ key بالـ decimal؛ بالـ hex لازم يتكتب 40.`],
    [`ده حسب الـ Program Change كأنها 3 bytes؛ هي فيها data byte واحد بس (2 bytes في المجموع).`, `1000 note message × 3 B = 3000 B، + 4 Program Changes × 2 B = 8 B → 3008 B.`, `ده نسي الـ 500 Note Off message.`, `ده حسب الـ note messages كأنها 2 bytes؛ الـ Note On/Off حجمها 3 bytes (status + key + velocity).`],
    [`الـ nibble = الـ channel − 1، فالـ 2 معناها channel 3.`, `الـ Channel Pressure هي Dx، مش Ex.`, `الـ Program Change هي Cx، مش Ex.`, `E = Pitch Bend؛ nibble 2 → channel 2 + 1 = 3.`],
    [`الـ Organ من 17–24.`, `الـ families مجموعات كل واحدة 8: من 25–32 يبقى Guitar.`, `الـ Bass من 33–40.`, `الـ Chromatic Percussion من 9–16.`],
    [`غلط — الـ 128 ده حجم الـ instrument patch map.`, `غلط — الـ percussion بتروح على channel 10 by default، وفيه 47 sound.`, `صح — مثلًا من 35 Acoustic Bass Drum لحد 81 Open Triangle.`, `غلط — العدد صح بس الـ keys من 35 لـ 81.`],
    [`غلط — الـ FA هي Start Sequence.`, `غلط — الـ F8 هي الـ Timing Clock.`, `غلط — الـ F7 هي Sysex End، مش real-time message.`, `صح — FC = Stop (FA = Start، FB = Continue، F8 = Timing Clock).`],
    [`صح — الـ patch هو مجموعة الـ control settings اللي بتحدد timbre.`, `غلط — الـ voice هو الجزء من الـ synthesiser اللي بيطلّع الصوت.`, `غلط — الـ track بينظّم التسجيلات في الـ sequencer.`, `غلط — الـ channel بيفصل المعلومات في الـ MIDI system (16 في كل cable).`],
    [`غلط — الـ SASL هي الـ score language اللي بتتحكم في instruments الـ SAOL (notes، loudness، tempo).`, `غلط — الـ SASBF بينقل banks من الـ samples للـ wavetable/sample-based synthesis.`, `صح — الـ AudioBIFS (جزء من الـ Binary Format for Scene Description) هو اللي بيتعامل مع الـ mixing/post-production.`, `غلط — الـ scheduler بيحدد الـ SAOL بيطلّع الصوت إزاي لما يتشغّل بـ MIDI أو SASL.`],
    [`غلط — الـ system messages بتشيل معلومات مش خاصة بـ channel معيّنة.`, `صح — الـ system messages (common، real-time، exclusive) مش خاصة بـ channel: timing، song position، device setup.`]
  ]
};

AR.mm.lectures["7"] = {
  notes: [
    { h: `الـ effects بتتحط فين وبتتصنف إزاي`, pts: [
      `الـ effects ممكن تتطبق <b>وقت الـ creation/synthesis</b> (وبعدين يتعملها filter أو re-synthesis) أو في <b>آخر الـ audio chain</b> (production / mastering).`,
      `الـ effects ممكن تتوصل ورا بعض (series) أو في audio chain <b>parallel</b>. <b>الترتيب بيفرق</b>: نفس الـ effects بترتيب مختلف ممكن تطلع output مختلف خالص. ومفيش <b>قاعدة ثابتة</b> للترتيب؛ ده بيعتمد على الصوت اللي انت عايزه.`,
      `ترتيب standard: <b>Compression → Distortion → EQ → Noise Redux → Amp Sim → Modulation → Delay → Reverb</b>. الـ guitar multi-effects pedal (Zoom G1/G1X) بيوصل 8 modules ورا بعض: COMP/EFX، DRIVE، EQ، ZNR، AMP، MODULATION، DELAY، REVERB (مثلًا الـ MODULATION module فيه Chorus وFlanger...؛ والـ REVERB فيه Hall وRoom...).`,
      `<b>التصنيف حسب طريقة معالجة الـ signal</b>:`,
      `• <b>Basic filtering</b>: lowpass، highpass، equaliser<br>• <b>Time-varying filters</b>: wah-wah، phaser<br>• <b>Delays</b>: vibrato، flanger، chorus، echo<br>• <b>Modulators</b>: ring modulation، tremolo، vibrato<br>• <b>Non-linear processing</b>: compression، limiters، distortion، exciters/enhancers<br>• <b>Spatial effects</b>: panning، reverb، surround sound`
    ]},
    { h: `الـ Equalisers: الـ shelving والـ peak filters`, pts: [
      `الـ <b>filter</b> بيشيل/يضعّف الصوت اللي فوق أو تحت cut-off frequency معينة. أما الـ <b>equaliser</b> فبـ <b>يقوّي أو يضعّف frequency bands معينة ويسيب الباقي زي ما هو</b>. الـ EQs متبنية من سلسلة <b>shelving</b> و<b>peak</b> filters (غالبًا 1st أو 2nd order).`,
      `<b>Shelving filter</b>: بيعمل boost أو cut للـ frequency bands <b>الواطية أو العالية</b>؛ الـ parameters: الـ cut-off frequency <b>f<sub>c</sub></b> والـ gain <b>G</b> (bass shelf / treble shelf).`,
      `<b>Peak filter</b>: بيعمل boost أو cut لـ band في <b>الـ mid-frequency</b>؛ الـ parameters: الـ centre/cut-off frequency <b>f<sub>c</sub></b>، الـ <b>bandwidth f<sub>b</sub></b> والـ gain <b>G</b>.`,
      `الـ shelving من الـ 1st-order: H(z) = 1 + (H<sub>0</sub>/2)(1 ± A(z)) (+ للـ LF، − للـ HF)، حيث A(z) = (z<sup>−1</sup> + a<sub>B/C</sub>)/(1 + a<sub>B/C</sub>z<sup>−1</sup>) ده <b>first-order allpass</b> filter (بيعدّي كل الـ frequencies بس بيغيّر الـ phase). B = boost، C = cut.`,
      `الـ peak من الـ 2nd-order: H(z) = 1 + (H<sub>0</sub>/2)(1 − A<sub>2</sub>(z)) مع <b>second-order allpass</b> A<sub>2</sub>(z)؛ معامل الـ centre frequency هو d = −cos(2πf<sub>c</sub>/f<sub>s</sub>)؛ والـ bandwidth f<sub>b</sub> هو اللي بيحدد a<sub>B</sub>/a<sub>C</sub>.`,
      `تحويل الـ gain من dB لـ linear: <b>V<sub>0</sub> = 10<sup>G/20</sup></b>، <b>H<sub>0</sub> = V<sub>0</sub> − 1</b>.`,
      `مثال MATLAB: الـ shelving(G, fc, fs, Q, type) والـ type يا 'Base_Shelf' يا 'Treble_Shelf' بيرجّع [b,a] عشان filter(b,a,x)؛ الـ demo استخدم G = 4 dB، bass f<sub>c</sub> = 300 Hz، treble f<sub>c</sub> = 600 Hz، Q = 3.`
    ]},
    { h: `الـ Time-varying filters: wah-wah، phaser، state variable filter`, pts: [
      `<b>Wah-wah</b>: <b>bandpass</b> filter الـ centre (resonant) frequency بتاعته بتتغير مع الوقت (modulated) والـ <b>bandwidth صغير</b>؛ الـ signal اللي اتعمله filter <b>بيتخلط مع الـ direct signal</b> (direct-mix + wah-mix).`,
      `<b>Phaser (phasing)</b>: نفس الفكرة بس بـ <b>notch</b> filter (ينفع يتعمل كمجموعة IIR filters ورا بعض cascaded)، وبيتخلط مع الـ direct signal. لو غيّرت الـ BP لـ band-reject/notch في كود الـ wah-wah هيتحول لـ phaser.`,
      `<b>M-fold wah-wah</b>: M من الـ tap-delay bandpass filters متوزعين على الـ spectrum كله وبيغيروا الـ centre frequencies بتاعتهم في نفس الوقت. الـ <b>bell effect</b> محتاج حوالي مية M tap delays بـ filters الـ bandwidth بتاعها ضيق.`,
      `<b>State Variable Filter</b> (مأخوذ من الـ analog electronics): بيدّيك <b>تحكم مستقل في الـ cut-off frequency والـ damping</b>، وبيطلّع <b>في نفس الوقت</b> outputs <b>lowpass وbandpass وhighpass</b>.`,
      `تنفيذ الـ wah-wah = state variable filter الـ f<sub>c</sub> بتاعه بيتعمله modulation (الـ demo بيحرّك f<sub>c</sub> على شكل <b>triangle wave</b> بين 500 و3000 Hz، Fw = 2000 Hz في الثانية، damping 0.05). لازم الـ F1 يتحسب من جديد كل مرة الـ f<sub>c</sub> يتغير. والـ damping factor الأقل بيدّي pass band أصغر.`
    ]},
    { h: `الـ effects المعتمدة على الـ delay: الـ comb filters`, pts: [
      `الـ delay effects بتعمل model للانعكاسات: في كهف أو أوضة كبيرة بنسمع <b>echo</b> و<b>reverberation</b>؛ والحيطان المتوازية القريبة من بعض بتدّي انعكاسات متكررة بنسمعها كتغيير في <b>لون الصوت (sound colour)</b>. الـ vibrato والـ flanging والـ chorus والـ echo كلهم delay effects.`,
      `بيتبنوا من <b>FIR وIIR comb filters</b>؛ ولو جمعت الاتنين بيطلع الـ <b>Universal Comb Filter</b>.`,
      `الـ <b>FIR comb</b> = <b>delay واحد</b>: الـ input متأخر بـ τ بيتجمع على الـ input بـ gain g. y(n) = x(n) + g·x(n−M)، H(z) = 1 + g·z<sup>−M</sup>.`,
      `الـ <b>IIR comb</b>: بيعمل simulation لـ <b>انعكاسات مالهاش نهاية</b> بين طرفين cylinder. الـ signal بيلف في delay line راجعة للـ input (feedback) وبيضعف بـ g كل لفة؛ والـ input أحيانًا بيتضرب في c عشان يعوّض الـ amplification العالي بتاع الـ structure. y(n) = c·x(n) + g·y(n−M).`,
      `السلايدز كاتبة M = τ/f<sub>s</sub>؛ بس حسابيًا الـ delay بالـ samples هو <b>M = τ × f<sub>s</sub></b> (يعني τ مقسومة على الـ sampling period). مثلًا τ = 100 ms عند 44.1 kHz → M = 0.1 × 44100 = <b>4410 samples</b>.`,
      `الـ <b>Universal comb</b>: هو في الأساس allpass فيه delay بـ M sample وmultiplier زيادة feed-forward. الـ parameters: <b>BL</b> (blend)، <b>FB</b> (feedback)، <b>FF</b> (feed-forward). الـ algorithm: xh(n) = x(n) + FB·xh(n−M)؛ y(n) = FF·xh(n−M) + BL·xh(n).`
    ]},
    { h: `مثال محلول: الـ impulse responses بتاعة الـ comb filters`, pts: [
      `الـ Input: unit impulse x = 1, 0, 0, ...؛ g = 0.5؛ M = 10 (زي fircomb.m / iircomb.m).`,
      `الـ <b>FIR comb</b>: y(0) = 1، y(10) = 0.5، وكل الـ samples التانية 0. يعني echo <b>واحد</b> بس.`,
      `الـ <b>IIR comb</b> (c = 1): y(0) = 1، y(10) = 0.5، y(20) = 0.25، y(30) = 0.125، y(40) = 0.0625 ... سلسلة echoes <b>مالهاش نهاية وبتقل exponentially</b> (كل لفة × g).`,
      `الـ delay بالوقت: عند f<sub>s</sub> = 8000 Hz، الـ M = 10 samples يساوي 10/8000 = 1.25 ms (في range الـ resonator)؛ ولو عايز echo بـ 100 ms عند 8 kHz هتحتاج M = 800 samples.`
    ]},
    { h: `الـ Vibrato والـ flanger والـ chorus والـ slapback والـ echo`, pts: [
      `<b>Vibrato</b>: إنك تغيّر (تعمل modulation لـ) <b>الـ time delay</b> بشكل دوري. شبه الـ <b>Doppler effect</b>: لما المسافة بين المصدر والسامع تتغير، الـ pitch بيتغير. التنفيذ: delay line + <b>low frequency oscillator (LFO)</b>؛ و<b>بنسمع الـ delayed signal بس</b> (مفيش forward ولا backward feed). الـ delay العادي <b>5–10 ms</b>، والـ LFO rate <b>5–14 Hz</b>. الكود بيستخدم linear (أو allpass) interpolation للـ fractional delays.`,
      `الـ Flanger والـ chorus والـ slapback والـ echo كلهم بيستخدموا comb filter (FIR أو IIR) مع شوية modulation؛ الفرق بينهم في الـ delay range:`,
      `الـ <b>Slapback (doubling)</b> = تكرار سريع للصوت. الـ <b>Flanging</b> = delay بيتغير باستمرار بـ LFO. الـ <b>Chorus</b> = كذا نسخة من الصوت متأخرة بـ delays صغيرة random.`,
      `كود الـ Flanger: FIR delay واحد بيتذبذب من 0–3 ms (أو 0–15 ms) بمعدل 0.1–5 Hz؛ الـ demo: max delay 3 ms، rate 1 Hz، amp = 0.7، y(i) = 0.7·x(i) + 0.7·x(i − cur_delay). عند 44.1 kHz، الـ 3 ms → round(0.003 × 44100) = round(132.3) = <b>132 samples</b>.`
    ]},
    { h: `الـ Modulation effects: ring modulation، AM، tremolo`, pts: [
      `<b>Modulation</b>: الـ parameters بتاعة sinusoid (<b>amplitude، frequency، phase</b>) بتتغير بـ audio signal. شفنا قبل كده: الـ <b>amplitude</b> modulation → wah-wah، phaser؛ الـ <b>frequency</b> modulation → FM synthesis؛ الـ <b>phase</b> modulation → vibrato، chorus، flanger.`,
      `<b>Ring modulation (RM)</b>: بتضرب الـ audio x(n) في sine carrier m(n) الـ frequency بتاعه f<sub>c</sub>: <b>y(n) = x(n)·m(n)</b>. لو x عبارة عن sine بـ frequency f<sub>x</sub> هتسمع <b>المجموع والفرق</b> بس: f<sub>c</sub> + f<sub>x</sub> و f<sub>c</sub> − f<sub>x</sub>. ولو الـ input دوري بـ fundamental f<sub>0</sub> هيطلع lines عند |k·f<sub>0</sub> ± f<sub>c</sub>|. بيستخدم للـ <b>robotic speech</b> في أفلام الـ sci-fi القديمة؛ ولو اتستخدم من غير تركيز بيطلع صوت غريب ومش musical.`,
      `مثال: f<sub>c</sub> = 440 Hz، f<sub>x</sub> = 200 Hz → الـ RM output فيه <b>640 Hz و240 Hz</b> (مفيش 440 ولا 200).`,
      `<b>Amplitude modulation (AM)</b>: <b>y(n) = (1 + α·m(n))·x(n)</b>، والـ m(n) normalised يعني أقصى قيمة ليها 1، الـ m هو LFO، والـ x هو الـ audio carrier؛ <b>α = depth</b>: α = 1 يعني أقصى modulation، وα = 0 بتقفلها. مع sines بـ f<sub>c</sub> وf<sub>x</sub> بتسمع <b>تلات</b> frequencies: f<sub>c</sub>، f<sub>c</sub> − f<sub>x</sub>، f<sub>c</sub> + f<sub>x</sub>.`,
      `الـ <b>Tremolo</b> = AM بـ modulation frequency <b>أقل من 20 Hz</b> (الـ demo: 5 Hz، α = 0.5 → الـ gain بيتغير بين 0.5 و1.5). وممكن تعمل tremolo كمان بـ ring modulation مع LFO على شكل <b>triangular</b> wave.`
    ]},
    { h: `الـ Non-linear processing: limiter، compressor، expander، distortion، exciter، enhancer`, pts: [
      `الـ non-linear processors بتعمل (بقصد أو من غير قصد) <b>harmonic وinharmonic components مكانتش موجودة في الـ signal الأصلي</b>. تلات أنواع: <b>dynamic processing</b> (بتتحكم في الـ envelope، وهدفها <b>تقلل</b> الـ harmonic distortion: compressors، limiters)، <b>intentional non-linear harmonic processing</b> (distortion قوي: guitar distortion)، و<b>exciters/enhancers</b> (بتزود harmonics لتحسين بسيط).`,
      `<b>Limiter</b>: بيتحكم في <b>الـ peaks العالية</b> وبيغيّر الـ dynamics الأساسية أقل ما يمكن؛ بيستخدم <b>peak level measurement</b> وبيتفاعل <b>بسرعة جدًا</b> لما الـ signal يعدّي threshold. لما تقلل الـ peaks تقدر تعلّي الـ signal كله. بيستخدم لآلات منفردة وفي الـ final mastering (CD، radio).`,
      `<b>Compressor</b>: بـ <b>يقلل الـ dynamics</b>: الأجزاء العالية بتقل بـ static curve (والأجزاء الواطية بتتعدل)، وبيستخدم عشان يعلّي الـ level العام في الـ mastering؛ كتير على الـ vocals والـ guitar. <b>Expander</b>: بيشتغل على مستويات الـ signal <b>الواطية</b> وبـ <b>يعلّي</b> الـ dynamics بتاعتها → صوت فيه حياة أكتر.`,
      `أنواع الـ <b>Distortion</b>: <b>Overdrive</b> (مستويات input واطية بتتزق لمستويات أعلى في non-linear curve)، <b>Distortion</b> (مساحة tonal أوسع، منطقة non-linear أعلى)، <b>Fuzz</b> (سلوك non-linear بالكامل، أخشن وأقسى).`,
      `الـ <b>Overdrive</b> = <b>symmetrical soft clipping</b>: f(x) = 2x لـ 0 ≤ x &lt; 1/3؛ (3 − (2 − 3x)<sup>2</sup>)/3 لـ 1/3 ≤ x &lt; 2/3؛ 1 لـ 2/3 ≤ x ≤ 1 (linear ×2، بعدين quadratic، بعدين saturated). تأكد: x = 0.2 → 0.4؛ x = 0.5 → (3 − 0.25)/3 ≈ 0.917؛ x = 0.8 → 1.`,
      `<b>Distortion/Fuzz</b>: non-linear exponential amplification f(x) = (x/|x|)(1 − e<sup>αx²/|x|</sup>) زي ما هي مكتوبة على السلايد؛ الـ gain <b>α</b> بيتحكم في الكمية؛ وعادةً جزء من الـ distorted signal بـ <b>يتخلط</b> مع الأصلي.`,
      `<b>Exciter</b>: بيبرز/يقلل frequencies معينة عشان يغيّر الـ <b>timbre</b>؛ brightness زيادة من غير EQ؛ distortion خفيف في الـ high-frequency وphase shifting عن طريق الـ <b>Short-Time Fourier Transform</b> (phase vocoder)؛ بيزود الـ presence والوضوح والـ speech intelligibility؛ أحسن حاجة على signals ناقصها high frequencies.`,
      `<b>Enhancer</b>: <b>equalisation + non-linear processing</b>، كمية distortion "بالكاد ملحوظة"؛ filter network (3 bands على الأقل) + harmonic generator؛ بيستخدم بدل الـ EQs في بعض الـ consoles، وللـ stereo enhancement في الـ radio broadcast.`
    ]},
    { h: `الـ Spatial effects: الـ panning والـ reverb`, pts: [
      `<b>Panning</b>: إنك توزّع مصدر <b>mono</b> على الـ stereo image، وتنقله من speaker للتاني في n خطوة. السامع في النص، والـ speakers عاملين زاوية 2θ<sub>l</sub> (نفترض θ<sub>l</sub> = 45°). الـ gains بتيجي من <b>2D rotation</b>: [g<sub>L</sub>; g<sub>R</sub>] = A<sub>θ</sub>·x، A<sub>θ</sub> = [cos θ, sin θ; −sin θ, cos θ]. ولو نفس الـ mono x في الصفين: g<sub>L</sub> = (cos θ + sin θ)x، g<sub>R</sub> = (cos θ − sin θ)x. θ = 0 → متساويين (في النص)؛ θ = 45° → g<sub>L</sub> = 1.414x، g<sub>R</sub> = 0. (الـ demo بيلف من −40° لـ 40° في 32 segment.)`,
      `<b>Reverb</b>: نتيجة <b>الانعكاسات الكتير</b> للصوت في أوضة. الموجات المنعكسة بتوصل <b>متأخر</b> (مسارها أطول) و<b>أضعف</b> (الحيطان بتمتص طاقة)؛ والسلسلة دي من الموجات المتأخرة والضعيفة هي اللي بتعمل <b>الإحساس بالمساحة (spaciousness)</b> بتاع الأوضة (أكبر في القاعات والكاتدرائيات).`,
      `<b>Reverb مقابل echo</b>: الـ echo نسخة متأخرة <b>واضحة ومنفصلة</b> (delay أكتر من حوالي عُشر أو عُشرين من الثانية)؛ في الـ reverb كل انعكاس بيوصل بسرعة لدرجة إننا مش بنحسه كنسخة، لكن بنسمع التأثير المجمّع.`,
      `<b>Reverb مقابل delay</b>: الـ delay مع feedback بيدّي انعكاسات على <b>فترة ثابتة</b> بس؛ في الـ reverb الحقيقي <b>معدل وصول الانعكاسات بيتغير مع الوقت</b>: الأول <b>early reflections</b> (ليها اتجاه، ومرتبطة بشكل/حجم الأوضة ومكان المصدر/السامع)، بعدين <b>diffuse reverberation / late reflections</b> (أكثف بكتير، random؛ بتدّي الـ spaciousness؛ وبتقل <b>exponentially</b> في القاعات الكويسة).`,
      `نوعين من طرق الـ simulation: طرق الـ <b>filter bank / delay line</b> وطرق الـ <b>convolution / impulse response</b>.`,
      `<b>Schroeder (1961)</b>: IIR <b>comb filters في parallel banks</b> وبعدها <b>allpass filters في series</b>؛ التصميم الكلاسيكي فيه <b>4 comb + 2 allpass</b>. هو <b>مش</b> بيعمل الزيادة في معدل وصول الانعكاسات (بدائي بمقاييس النهارده).`,
      `<b>Moorer (1976)</b>، بنى على Schroeder: combs parallel بأطوال delay مختلفة (room modes، انعكاسات بين حيطان متوازية)، allpass عشان يزود <b>reflection density (diffusion)</b>، <b>lowpass filters جوه الـ feedback loops</b> عشان الـ reverb time يبقى أقصر في الـ high frequencies (امتصاص الهوا، انعكاسية الحيطان)؛ (a) <b>tapped delay lines</b> بتعمل simulation للـ early reflections، (b) combs parallel + allpass بيعملوا simulation للـ diffuse reverb. الـ demo بيستخدم 6 lowpass combs + 1 allpass.`,
      `<b>Convolution reverb</b>: بتعمل convolution للـ input مع الـ <b>impulse response</b> بتاع الأوضة (الأدق). طويل جدًا على الـ direct filters (مئات الـ taps)، فبنستخدم الـ <b>FFT</b> والـ <b>convolution theorem</b>: FT(f ∗ g) = F(u)·G(u). بتسجل الـ impulse بطلقة مسدس أو ضربة drum أو تسقيفة إيد (أو تعملها simulation). تجاري: <b>Altiverb</b>، Kontakt/Intakt، Garritan Violin، PianoTeq (وبيعملوا simulation لجسم الآلة كمان). وتقدر تعمل convolution مع أي حاجة (كاتدرائية معكوسة، كلام).`
    ]}
  ],
  cards: [
    `الـ filter بيشيل/يضعّف الـ frequencies اللي فوق أو تحت cut-off؛ الـ equaliser بيعمل boost أو cut لـ bands معينة ويسيب الباقي زي ما هو.`,
    `بيعمل boost أو cut للـ frequency band الواطي أو العالي؛ الـ parameters: الـ cut-off fc والـ gain G.`,
    `بيعمل boost أو cut لـ band في الـ mid-frequency؛ الـ parameters: الـ centre frequency fc، الـ bandwidth fb والـ gain G.`,
    `V0 = 10^(G/20)، H0 = V0 − 1.`,
    `bandpass filter بيتغير مع الوقت، الـ bandwidth بتاعه ضيق والـ centre frequency بتاعته بيتعملها modulation، وبيتخلط مع الـ direct signal.`,
    `زي الـ wah-wah بس بـ notch filter (cascaded IIR) بدل الـ bandpass.`,
    `تحكم مستقل في الـ cut-off والـ damping، وoutputs lowpass وbandpass وhighpass في نفس الوقت. F1 = 2 sin(pi fc/fs)، Q1 = 2d.`,
    `delay واحد: y(n) = x(n) + g x(n − M)، H(z) = 1 + g z^−M.`,
    `انعكاسات مالهاش نهاية وبتقل: y(n) = c x(n) + g y(n − M).`,
    `BL (blend)، FB (feedback)، FF (feed-forward). الـ FIR comb 1,0,g؛ الـ IIR comb 1,g,0؛ الـ allpass a,−a,1؛ الـ delay 0,0,1.`,
    `delay بيتعمله modulation بـ LFO، وبنسمع الـ delayed signal بس؛ الـ delay 5–10 ms، الـ LFO 5–14 Hz (تغيير في الـ pitch شبه الـ Doppler).`,
    `Resonator 0–20 ms، flanger 0–15 ms (sinusoidal حوالي 1 Hz)، chorus 10–25 ms (random)، slapback 25–50 ms، echo > 50 ms.`,
    `y(n) = x(n)·m(n)؛ اتنين sines بيدّوا بس المجموع والفرق fc + fx و fc − fx.`,
    `y(n) = (1 + alpha m(n)) x(n)؛ بيدّي fc، fc − fx، fc + fx. الـ Tremolo = AM بـ modulation frequency أقل من 20 Hz.`,
    `Schroeder (1961): combs parallel وبعدها allpass في series (4 comb + 2 allpass). Moorer (1976): زوّد tapped delay line للـ early reflections وlowpass filters جوه الـ feedback loops بتاعة الـ combs.`
  ],
  qa: [
    `Basic filtering (lowpass، highpass، equaliser)؛ time-varying filters (wah-wah، phaser)؛ delays (vibrato، flanger، chorus، echo)؛ modulators (ring modulation، tremolo، vibrato)؛ non-linear processing (compression، limiters، distortion، exciters/enhancers)؛ spatial effects (panning، reverb، surround sound).`,
    `الـ FIR comb: نسخة واحدة متأخرة بتتجمع بـ gain g، y(n) = x(n) + g x(n − M)، H(z) = 1 + g z^−M؛ الـ impulse response بتاعه فيه echo واحد. الـ IIR comb: الـ output بيرجع تاني (feedback) عن طريق الـ delay line، y(n) = c x(n) + g y(n − M)، فبيطلع سلسلة echoes مالهاش نهاية كل واحد بيضعف بـ g (بيعمل simulation للانعكاسات بين طرفين cylinder). الـ universal comb بيجمع الاتنين باستخدام BL وFB وFF.`,
    `الـ Echo نسخة متأخرة واضحة ومنفصلة (delay أكتر من حوالي 0.1–0.2 s، أو أكتر من 50 ms في جدول الـ delay). الـ Reverb انعكاسات كتير بتوصل بسرعة لدرجة إنها مش بتتسمع لوحدها. الـ feedback delay بيطلع انعكاسات على فترة ثابتة بس، لكن الـ reverb الحقيقي فيه early reflections ليها اتجاه وبعدها diffuse (late) reverberation كثيفة، معدل وصولها بيزيد وبتقل exponentially.`,
    `الـ RM بيضرب الـ signal في carrier: y(n) = x(n) m(n)؛ الـ output فيه fc + fx و fc − fx بس (مثلًا 440 و200 Hz بيدّوا 640 و240 Hz)، وبيستخدم للأصوات الـ robotic. الـ AM: y(n) = (1 + alpha m(n)) x(n) بـ depth alpha (0 مقفول، 1 أقصى حاجة)؛ الـ output فيه fc، fc − fx و fc + fx. والـ AM بـ modulator أقل من 20 Hz هو الـ tremolo.`,
    `Dynamic processing (compressors، limiters؛ بتقلل الـ distortion)، intentional harmonic distortion (guitar distortion، overdrive، fuzz)، وexciters/enhancers (harmonics بسيطة زيادة). الـ limiter بيقيس الـ peak level وبيتفاعل بسرعة جدًا عشان يقلل الـ peaks اللي فوق الـ threshold. الـ compressor بيقلل الـ dynamics بتاعة الـ signal (الأجزاء العالية بتقل بـ static curve). الـ expander بيعلّي الـ dynamics بتاعة الـ signals الواطية عشان صوت فيه حياة أكتر.`,
    `بتسجل (أو تعمل simulation لـ) الـ impulse response بتاع الأوضة باستخدام impulse قصير زي تسقيفة إيد أو طلقة، وبعدين تعمل convolution للـ input معاه. الـ response طويل، فالـ direct filter هيحتاج مئات الـ taps؛ بدل كده بنستخدم الـ convolution theorem: نضرب الـ FFTs بتاعة الـ signal والـ impulse response وناخد الـ inverse FFT.`
  ],
  quiz: [
    [`الـ Flanger بيبقى 0–15 ms بـ modulation sinusoidal (حوالي 1 Hz).`, `صح. الـ Chorus: كذا نسخة متأخرة بـ delays صغيرة random في الـ range بتاع 10–25 ms.`, `الـ Slapback بيبقى 25–50 ms من غير modulation.`, `الـ Echo بيبقى أكتر من 50 ms من غير modulation.`],
    [`ده عدد samples بتوع 10 ms.`, `صح. M = τ × fs = 0.1 × 44100 = 4410 samples.`, `ده delay ثانية كاملة.`, `لو قسمت τ على fs حرفيًا هيطلع رقم صغير جدًا ملوش معنى؛ الـ delay بالـ samples هو τ × fs.`],
    [`صح. نسخة واحدة متأخرة من الـ input بتتجمع بـ gain g؛ H(z) = 1 + g z<sup>−M</sup>.`, `ده الـ IIR comb (feedback للـ output).`, `ده الـ ring modulation.`, `ده الـ amplitude modulation.`],
    [`ده يبقى الـ FIR comb، اللي فيه echo واحد بس عند n = 10.`, `ده y(10).`, `صح. كل لفة في الـ loop بتضرب في g: 1، 0.5، 0.25، 0.125 عند n = 0، 10، 20، 30.`, `الـ echoes بتقل؛ مش بتتجمع على sample واحد.`],
    [`ده الـ FIR comb.`, `ده الـ IIR comb.`, `ده الـ allpass.`, `صح. مفيش blend للـ direct signal، مفيش feedback، والـ feed-forward بـ 1: يعني الـ delayed signal بس هو اللي بيطلع.`],
    [`الـ RM بيشيل الأصليين؛ بيفضل المجموع والفرق بس.`, `صح. fc + fx = 640 Hz و fc − fx = 240 Hz.`, `ده (الـ carrier مع المجموع والفرق) اللي الـ AM بيطلعه.`, `مضاعفة الـ carrier مش هي طريقة شغل الـ ring modulation.`],
    [`الـ modulation للـ pitch عن طريق الـ delay ده الـ vibrato.`, `صح. y(n) = (1 + α m(n)) x(n) بـ sine بطيء (الـ demo: 5 Hz، α = 0.5)؛ وممكن يتعمل كمان بـ ring modulation مع triangular wave.`, `ده الـ slapback.`, `ده الـ convolution reverb.`],
    [`في الـ vibrato بتسمع الـ delayed signal بس، من غير forward ولا backward feed.`, `صح. لما تغيّر الـ delay بشكل دوري الـ pitch بيتغير، زي الـ Doppler effect.`, `الـ Notch filters بتستخدم في الـ phasers.`, `ده range الـ echo.`],
    [`الـ comb filter ده delay structure، مش LP/BP/HP filter ينفع يتظبط.`, `صح. F1 = 2 sin(π fc/fs)، Q1 = 2d؛ وبيستخدم في تنفيذ الـ wah-wah.`, `الـ allpass بيغيّر الـ phase بس.`, `ده reverb structure من combs وallpasses.`],
    [`ده محتاج V0 = 2 (حوالي 6 dB).`, `صح. V0 = 10^(20/20) = 10، فـ H0 = 10 − 1 = 9.`, `انت طرحت من الـ 20 dB على طول بدل ما تحوّل لـ linear الأول.`, `10^(20/10) = 100 ده الـ power ratio؛ الـ amplitude بيستخدم /20.`],
    [`الـ feedback gain g لو أقل من 1 بيضعّفهم فعلًا.`, `صح. الـ reverb الحقيقي فيه early reflections وبعدها diffuse reverberation كثيفة.`, `الـ Delays بتشتغل على الـ mono signals كمان.`, `الـ convolution reverb بس هو اللي بيستخدم الـ FFT.`],
    [`Moorer لسه بيستخدم parallel comb filters.`, `صح. الـ lowpass في الـ feedback بيدّي reverb أقصر في الـ high frequencies (امتصاص الهوا، انعكاسية الحيطان).`, `الـ Ring modulation مش جزء من الـ reverb.`, `ده الـ convolution reverb.`]
  ],
  extra: [
    [`غلطة في factor 10: الـ 40 ms يعني 0.04 s، مش 0.004 s.`, `ده τ ÷ f<sub>s</sub> مأخوذ حرفيًا من M = τ/f<sub>s</sub> اللي في السلايد؛ حسابيًا الـ delay هو τ × f<sub>s</sub>.`, `M = τ × f<sub>s</sub> = 0.04 × 48,000 = 1920 samples.`, `ده يبقى 25 ms عند 48 kHz؛ الـ 40 ms بتدّي 1920.`],
    [`ده RING modulation، اللي بيسيب المجموع والفرق بس؛ الـ AM بيسيب الـ carrier بتاع 500 Hz كمان.`, `الـ modulation بيعمل frequencies مجموع/فرق؛ مش بيطلّع الـ two inputs زي ما هم وخلاص.`, `الـ modulation بيزود sidebands، فبتسمع أكتر من الـ carrier.`, `الـ AM بيدّي تلات frequencies: f<sub>c</sub>، f<sub>c</sub> − f<sub>x</sub> و f<sub>c</sub> + f<sub>x</sub>.`],
    [`ده V<sub>0</sub>؛ نسيت الـ −1.`, `V<sub>0</sub> = 10<sup>12/20</sup> = 10<sup>0.6</sup> ≈ 3.98، فـ H<sub>0</sub> ≈ 2.98.`, `ده استخدم 10<sup>G/10</sup> (صيغة الـ power)؛ الـ formula بتاعة المحاضرة بتستخدم G/20.`, `الـ H<sub>0</sub> مش G − 1؛ لازم تحوّل الـ dB gain لـ linear الأول.`],
    [`ده استخدم 2π·f<sub>c</sub>/f<sub>s</sub> جوه الـ sine؛ الـ formula بتستخدم π·f<sub>c</sub>/f<sub>s</sub>.`, `ده sin(π·f<sub>c</sub>/f<sub>s</sub>) — نسيت الـ factor 2.`, `π × 2000/48,000 ≈ 0.1309 rad؛ الـ sin ≈ 0.1305؛ × 2 ≈ 0.2611.`, `ده 2·f<sub>c</sub>/f<sub>s</sub> من غير π ومن غير sine.`],
    [`ده استخدم الجزء الـ linear 2x، اللي بيتطبق بس لـ x &lt; 1/3.`, `الـ 0.6 في منطقة 1/3 ≤ x &lt; 2/3: (3 − (2 − 1.8)²)/3 = (3 − 0.04)/3 ≈ 0.987.`, `الـ saturation عند 1 بيتطبق بس لـ x ≥ 2/3.`, `ده 3 − (2 − 1.8)² من غير القسمة الأخيرة ÷ 3؛ المنطقة الـ quadratic هي (3 − (2 − 3x)²)/3.`],
    [`cos 30° ≈ 0.866، sin 30° = 0.5 → 1.366 و0.366.`, `الـ formulas بتاعة الشمال واليمين اتبدلوا.`, `دول cos θ وsin θ بس؛ الـ gains هي مجموعهم والفرق بينهم.`, `الـ gains المتساوية معناها θ = 0 (في النص)، مش 30°.`],
    [`غلط — الـ delays هي vibrato وflanger وchorus وecho.`, `غلط — المجموعة دي فيها compression وlimiters وdistortion وexciters/enhancers.`, `غلط — الـ spatial effects هي panning وreverb وsurround sound.`, `صح — الـ wah-wah والـ phaser متصنفين time-varying filters.`],
    [`غلط — الـ limiter بيتفاعل بسرعة عشان يتحكم في الـ peaks العالية (HIGH) اللي فوق الـ threshold.`, `غلط — الـ compressor بيقلل الـ dynamics (الأجزاء العالية بتقل).`, `غلط — الـ exciter بيغيّر الـ timbre/brightness بإنه يزود محتوى high-frequency خفيف، مش الـ dynamics بتاعة المستويات الواطية.`, `صح — الـ expander بيشتغل على المستويات الواطية وبيعلّي الـ dynamics بتاعتها.`],
    [`صح — comb banks parallel وبعدها allpass filters في series.`, `غلط — الأعداد وطريقة التوصيل متبدلين.`, `غلط — دي إضافات Moorer (1976)، مش تصميم Schroeder الأصلي.`, `غلط — ده الـ convolution reverb، النوع التاني من الـ reverb simulation.`],
    [`غلط — المحاضرة بتقول مفيش قاعدة ثابتة؛ ده بيعتمد على الصوت اللي انت عايزه.`, `صح — الترتيب بيفرق (ممكن يغيّر الـ output جامد)، بس مفيش قاعدة ثابتة؛ والترتيب الـ standard مجرد دليل.`]
  ]
};

AR.mm.lectures["8"] = {
  notes: [
    { h: `الـ Image data structures وأحجامها`, pts: [
      `"الصورة بألف كلمة، بس بتاكل memory قد الكلام ده تلات آلاف مرة."`,
      `الـ digital image متكونة من <b>pixels</b> (picture elements). عدد الـ pixels = <b>الـ resolution</b>؛ وكل ما الـ resolution تعلى الجودة بتبقى أحسن.`,
      `الـ <b>bit-map</b> representation بيخزن الصورة بنفس الطريقة اللي محتوى الشاشة بيتخزن بيها في الـ video memory.`,
      `<b>Bit-map (أبيض وأسود)</b>: 1 bit لكل pixel (0 أو 1). bitmap مقاسها 640×480 = 307,200 bits = 38,400 B = <b>37.5 KB</b>. الـ Dithering بيُستخدم كتير عشان نعرض الصور الـ monochrome.`,
      `<b>Grey-scale</b>: 1 byte لكل pixel (0–255). الـ pixel الغامق ممكن يبقى 10، والفاتح 240. 640×480 = 307,200 B ≈ <b>300 KB</b>.`,
      `<b>24-bit colour</b>: 3 bytes لكل pixel (R، G، B) → 256×256×256 = <b>16,777,216</b> لون. 640×480×3 = <b>921.6 KB</b> (921,600 B). الصور الـ <b>32-bit</b> بتزود byte زيادة لقيمة الـ <b>alpha</b> (special effects زي الـ transparency).`,
      `<b>8-bit colour</b>: 1 byte لكل pixel، 256 لون من ملايين الألوان، جودة مقبولة، ومحتاجة <b>Colour Look-Up Table (LUT)</b>. 640×480 = 307.2 KB (زي الـ 8-bit greyscale بالظبط).`,
      `<b>الـ Colour LUT</b>: كل pixel بيخزن <b>index</b> بس جوه الـ table؛ والـ table هو اللي بيدي لون الـ RGB. بيتبني وإحنا بنحوّل من 24-bit لـ 8-bit عن طريق تجميع الألوان المتشابهة (entry واحد لكل مجموعة). لو غيّرت الـ map تقدر تعمل <b>palette animation</b>.`
    ]},
    { h: `الـ Dithering`, pts: [
      `بيُستخدم لما نحوّل صورة greyscale لصورة bit-mapped (أبيض/أسود)، زي مثلًا عشان الطباعة.`,
      `الفكرة: نبدّل كل pixel (0–255) بـ pattern أكبر (مثلًا <b>4×4</b> نقط) بحيث عدد النقط المطبوعة يقرّب درجة الرمادي. الـ block الـ 4×4 يقدر يعرض من 0 (مفيش نقط) لحد 16 (كل النقط)، يعني 17 level.`,
      `بنعمل remap من 0–255 لـ 0–16 بإننا نقسم على <b>256/17</b> وناخد الـ floor (نقرّب لتحت).`,
      `الـ Dither matrix: <code>[0 8 2 10; 12 4 14 6; 3 11 1 9; 15 7 13 5]</code>.`,
      `<b>Simple dithering</b>: بنحط نقطة (1) في المكان لو الـ intensity بعد الـ remap <b>&gt;</b> الـ entry بتاع الـ matrix، غير كده 0. الصورة بتكبر <b>16 مرة</b> (كل pixel → 4×4 نقط).`,
      `الـ <b>Ordered dither</b> بيحافظ على حجم الصورة: الـ output pixel = 1 لو وبس لو الـ intensity بعد الـ remap عند الـ pixel ده أكبر من الـ entry بتاع الـ matrix في المكان المقابل.`,
      `مثال محلول: pixel قيمته 200 → 200 ÷ (256/17) = 200×17/256 = 13.28 → <b>13</b>. الـ entries الأصغر من 13 هي 0…12، يعني <b>13 من الـ 16 نقطة</b> بيتعملهم set.`
    ]},
    { h: `الـ Image file formats`, pts: [
      `أغلب الـ formats فيها compression (lossless أو lossy).`,
      `<b>GIF</b> (GIF87a، GIF89a): من UNISYS Corp. وCompuServe، كان في الأول عشان إرسال الصور على خطوط التليفون بالـ modem. بيستخدم <b>LZW</b> (Lempel-Ziv-Welch)، متعدل عشان الـ scan-line packets → <b>lossless</b>. محدود بـ <b>8-bit (256 لون)</b>، فمناسب للصور اللي فيها ألوان مميزة قليلة (الرسومات). بيدعم الـ <b>interlacing</b>. الـ GIF89a بيزود <b>animation</b> بسيطة وtransparency index.`,
      `<b>JPEG</b>: من الـ Joint Photographic Experts Group للصور الـ <b>photographic</b>. بيستغل حدود الرؤية عند الإنسان عشان يوصل لـ compression عالي. <b>Lossy</b>؛ والـ user بيختار مستوى الـ quality/compression.`,
      `<b>TIFF</b> (Tagged Image File Format): بيخزن أنواع صور كتير (bit-map، greyscale، 8-bit، 24-bit RGB) وبيتعرّف نوعها بالـ <b>tags</b>. من Aldus Corp. (التمانينات)، وبعدين Microsoft دعمته. غالبًا <b>lossless</b>؛ وفيه JPEG tag بيسمح بـ JPEG compression. مالوش ميزة كبيرة على الـ JPEG، فشعبيته بتقل.`,
      `<b>PNG</b> (Portable Network Graphics): معمول عشان <b>يحل محل الـ GIF</b>. لحد <b>48 bits لكل pixel</b>، فيه gamma-correction و<b>alpha channel</b> (transparency)، وprogressive display في blocks مقاسها 8×8.`,
      `<b>PostScript / EPS</b>: لغة typesetting فيها text وvector graphics وbitmaps (الـ output بتاع Illustrator وFreeHand). <b>مفيهوش compression</b>، فالملفات كبيرة (ممكن يتربط بـ compressors خارجية).`,
      `<b>BMP</b> (DIB): الـ format الـ standard بتاع Microsoft Windows واللي بيعتمد على الـ system؛ raster format؛ يقدر يخزن bitmaps بـ 24-bit.`
    ]},
    { h: `الضوء والعين والـ colour spaces (RGB، CIE، Lab)`, pts: [
      `الضوء المرئي هو electromagnetic wave في المدى <b>400–700 nm</b>. أغلب الضوء خليط من wavelengths؛ والـ profile ده اسمه <b>spectrum (spectra)</b>.`,
      `العين شغالة زي الكاميرا: فيه lens بتركّز الضوء على الـ <b>retina</b>، اللي مليانة neurons يا إما <b>rods</b> (مش حساسة للون، للإضاءة/brightness) يا إما <b>cones</b> (3 أنواع: أحمر، أخضر، أزرق — للون).`,
      `<b>RGB</b>: اللون بيتعمل من شدة الأحمر والأخضر والأزرق (additive). شاشات الـ CRT القديمة كان فيها 3 phosphors؛ والـ TFT LCD الحديثة فيها transistor switch لكل sub-pixel من R وG وB.`,
      `الـ <b>Gamut</b> = كل الألوان اللي ممكن تتعمل بالتلات primaries. الـ gamut بتاع الشاشة أصغر من models زي CIE Lab.`,
      `<b>CIE (1931)</b>: تلات primaries standard هما <b>X، Y، Z</b>. الـ <b>Y</b> اختاروه بحيث يساوي الـ luminous-efficiency function بتاعة العين (perceptual model). الألوان المرئية بتعمل cone شكله زي حدوة الحصان؛ ولو عملنا projection للـ plane اللي هو X+Y+Z=1 على الـ X-Y plane بيطلع الـ <b>chromaticity diagram</b>. أطرافه هي الألوان الـ pure؛ والأبيض (blackbody عند 6447 K) هو النقطة؛ ولو جمعت لونين بتطلع نقطة على الخط اللي بينهم.`,
      `<b>CIE L*a*b* (1976)</b>: نسخة متحسنة من CIE model. <b>L</b> = luminance؛ والـ chrominance: <b>a</b> = من الأخضر للأحمر، <b>b</b> = من الأزرق للأصفر. بيستخدمه <b>Photoshop</b>.`,
      `Models تانية: <b>HSB</b> (Hue، Saturation، Brightness — Photoshop) و<b>HLS</b> (Hue، Lightness، Saturation).`,
      `الـ <b>Luminance</b> = الإضاءة/brightness (قيمة الرمادي، Y). الـ <b>Chrominance</b> = معلومات اللون (hue + saturation).`
    ]},
    { h: `الـ Luminance–chrominance models: YIQ، YUV، YCrCb`, pts: [
      `الصورة الرمادي هي 2-D array من integers؛ والصورة الـ true-colour هي 2-D array من triplets (R,G,B). الـ YIQ والـ YUV بيعملوا encode للون بالطريقة اللي الإنسان بيشوف بيها (luminance + chrominance).`,
      `التلاتة بيشتركوا في نفس الـ luminance: <b>Y = 0.299R + 0.587G + 0.114B</b> (الـ CIE Y primary).`,
      `<b>YIQ</b>: بيُستخدم في <b>TV broadcasting الملون (NTSC)</b>؛ و<b>downward compatible مع التلفزيون الأبيض والأسود</b>. الـ I = محور أحمر-برتقالي، والـ Q تقريبًا orthogonal عليه. العين أكتر حساسية للـ Y، وبعده I، وبعده Q، عشان كده NTSC بيدي <b>4 MHz للـ Y، و1.5 MHz للـ I، و0.6 MHz للـ Q</b>.`,
      `<b>YUV</b>: digital video standard (1982). الـ Video = سلسلة fields (السطور الفردي والزوجي)؛ <b>كل fieldين بيعملوا frame</b>. بيشتغل في PAL (50 field/s) أو NTSC (60 field/s). U = B − Y، V = R − Y.`,
      `<b>YCrCb</b> (CCIR 601): شبه الـ YUV بس <b>scaled</b>: Cb = (B − Y)/1.772، Cr = (R − Y)/1.402. بيُستخدم في <b>JPEG</b> (وMPEG).`,
      `تحذير بخصوص السلايد: الـ YCrCb matrix اللي في السلايد (وفي الـ rules sheet) كاتبة على الصف التاني "Cr" = [−0.169 −0.331 0.500] وعلى الصف التالت "Cb" = [0.500 −0.419 −0.081]. من المعادلات، الصف [−0.169 −0.331 0.500] هو في الحقيقة <b>Cb</b> ((B−Y)/1.772) والصف [0.500 −0.419 −0.081] هو <b>Cr</b> ((R−Y)/1.402). اعتمد على المعادلات؛ وفي الامتحان اكتب الـ matrix زي ما هي وسمّي الصفوف صح لو اتطلب منك.`
    ]},
    { h: `موديلات الطباعة: CMY وCMYK`, pts: [
      `الـ <b>CMY</b> (Cyan، Magenta، Yellow) هما الـ complements بتوع الـ RGB — يعني الـ <b>subtractive primaries</b>. بيُستخدموا في الطباعة، لأن الأحبار على الورق <b>بتمتص (absorb)</b> ألوان معينة.`,
      `الـ Additive (RGB، ضوء): R+G+B = أبيض. الـ Subtractive (CMY، حبر): C+M+Y = أسود (نظريًا).`,
      `التحويل (القيم من 0…1): <b>C = 1 − R، M = 1 − G، Y = 1 − B</b>، والعكس R = 1 − C وهكذا. الأبيض (1,1,1) في RGB → (0,0,0) في CMY.`,
      `<b>CMYK</b> (K = أسود): موديل طباعة متحسن. خلط C وM وY <b>عمره ما بيدي أسود حقيقي</b>، فحبر أسود منفصل بيدي أسود أغمق وحقيقي وألوان غامقة أحسن (وبيوفر الحبر الملون).`,
      `من CMY لـ CMYK: <b>K = min(C, M, Y)</b>، وبعدين C' = C − K، M' = M − K، Y' = Y − K.`,
      `<b>ليه CMYK (مش RGB) للطباعة؟</b> الطباعة شغالة بإن الأحبار <b>بتمتص (بتطرح/subtract)</b> wavelengths من الضوء المنعكس، وده بالظبط الـ subtractive CMY model. الـ RGB ده additive (ضوء خارج من الشاشات). والـ K بيضيف أسود حقيقي الـ CMY مش بيقدر يعمله.`,
      `<b>خطوات الحل في الامتحان</b> (من الـ Final Rules sheet): القيم لازم تبقى من 0…1، فلو الصورة جاية من 0–255 الأول <b>اعمل normalize (÷255)</b>، وبعدين CMY = 1 − RGB، وبعدين K = min، وبعدين اطرح K. خلّي حوالي 4–6 أرقام عشرية.`
    ]},
    { h: `مثال تحويل محلول (من ملخص الكورس، مش في سلايدات CM3106)`, pts: [
      `صورة 2×2: R = [110 60; 20 70]، G = [110 210; 120 220]، B = [255 130; 90 140].`,
      `<b>Pixel (110,110,255)</b>: normalize → (0.431373, 0.431373, 1). CMY = (0.568627, 0.568627, 0). K = 0 → CMYK = (0.568627, 0.568627, 0, 0).`,
      `<b>Pixel (60,210,130)</b>: CMY = (0.764706, 0.176471, 0.490196). K = 0.176471 → CMYK = (0.588235, 0, 0.313725, 0.176471).`,
      `<b>Pixel (20,120,90)</b>: CMY = (0.921569, 0.529412, 0.647059). K = 0.529412 → CMYK = (0.392157, 0, 0.117647, 0.529412).`,
      `<b>Pixel (70,220,140)</b>: CMY = (0.725490, 0.137255, 0.450980). K = 0.137255 → CMYK = (0.588235, 0, 0.313725, 0.137255).`,
      `الـ <b>YIQ</b> لنفس الـ pixels (مش محتاج normalisation): Y = [126.53 156.03; 86.68 166.03]، I = [−46.545 −63.72; −49.97 −63.72]، Q = [44.545 −57.73; −31.13 −57.78].`,
      `مثلًا Y(110,110,255) = 0.299×110 + 0.587×110 + 0.114×255 = 32.89 + 64.57 + 29.07 = <b>126.53</b>.`,
      `الـ <b>YUV</b> للـ pixel (110,110,255): U = B − Y = 255 − 126.53 = <b>128.47</b>، V = R − Y = 110 − 126.53 = <b>−16.53</b>. الـ YCbCr: Cb = 128.47/1.772 = <b>72.50</b>، Cr = −16.53/1.402 = <b>−11.79</b>.`,
      `ملاحظة الملخص: لما بنخزن النتايج كـ pixel values، بنعمل floor للنتايج والسالب بيتعمله clip لـ 0 (عشان كده بيظهر I وQ بـ 0). في الامتحان اكتب القيم الحقيقية اللي حسبتها وبعدين قول أي rounding بتطبقه.`
    ]},
    { h: `الحجم والـ compression ratio والـ MSE والـ MAE (من ملخص الكورس / الـ Final Rules، مش في سلايدات CM3106)`, pts: [
      `الـ <b>Colour depth</b>: أبيض وأسود = 1 bit، greyscale = 8 bits (1 byte)، RGB true colour = 24 bits (3 bytes).`,
      `<b>حجم الصورة</b> = width × height × colour depth. مثلًا 5×5 greyscale = 25 B؛ 1920×1080 RGB = 6,220,800 B ≈ 5.93 MB.`,
      `<b>الـ Video</b>: حجم الـ frame = W × H × colour depth؛ الحجم في الثانية = حجم الـ frame × fps؛ حجم الـ video = الحجم في الثانية × الوقت (s). الملف كله = video stream + audio stream (الـ audio = الوقت × sampling rate × bits per sample × channels).`,
      `مثال: دقيقة 640×480 RGB عند 25 fps = 921,600 × 25 × 60 = 1,382,400,000 B ≈ 1318.36 MB؛ وزوّد عليه audio كلام mono بـ 60 × 8000 × 16 × 1 = 7,680,000 bits = 960,000 B.`,
      `الوحدات المستخدمة في الكورس: 1 byte = 8 bits؛ KB = 1024 B؛ MB = 1024 KB؛ GB = 1024 MB.`,
      `<b>الـ Compression ratio (حسب convention الكورس، من Multimedia Summary 2026 ص. 15، مكتوب بخط اليد)</b>: CR = size(compressed I') ÷ size(original I) × 100 %. معادلة الـ CR <b>هي هي في الـ lossy والـ lossless</b>. الـ convention بتاع الكتاب هو العكس: original ÷ compressed (مثلًا 25 B → 10.24 B = 2.44 : 1).`,
      `مثال: صورة 5×5 greyscale (25 B) اتعملها compress لـ 0.01 KB = 10.24 B → CR = 10.24/25 × 100 = <b>40.96 %</b>. ولـ 0.001 KB = 1.024 B → CR = <b>4.096 %</b>.`,
      `<b>Lossless</b>: الـ reconstructed I''' = الـ original I، يعني الصورة بعد الـ decompression هي نفس الـ matrix الأصلية بالظبط و<b>MSE = MAE = 0</b>. <b>Lossy</b>: I''' ≠ I (compression أعلى، جودة أقل).`,
      `مثال MSE: I = [10 15 23]، I''' = [11 15 18] → الفروق −1، 0، 5 → MSE = (1+0+25)/3 = <b>8.667</b>، MAE = (1+0+5)/3 = <b>2</b>.`,
      `مثال 2×2: I = [255 78; 255 15]، I''' = [15 100; 255 15] → الفروق 240، −22، 0، 0 → MSE = (57600+484)/4 = <b>14521</b>، MAE = (240+22)/4 = <b>65.5</b>.`,
      `لو الـ MSE/MAE مطلوب في colour space تاني (زي CMY)، حوّل الصورتين للـ space ده الأول، وبعدين طبّق المعادلة.`
    ]},
    { h: `الـ Video signals: component، composite، S-Video، NTSC، PAL`, pts: [
      `<b>Component video</b>: كل primary (RGB، أو YIQ/YUV) بيبقى signal لوحده. أحسن ألوان، بس محتاج bandwidth أكتر وsynchronisation كويس بين التلات signals.`,
      `<b>Composite video</b>: الـ chrominance والـ luminance متخلطين على carrier واحد؛ وشوية interference مفيش منه مفر.`,
      `<b>S-Video</b> (Separated video، S-VHS): حل وسط — 2 lines: واحد للـ luminance، وواحد للـ composite chrominance.`,
      `<b>NTSC</b>: 525 line/frame، 30 fps (بالظبط 29.97، 33.37 ms/frame)، aspect ratio 4:3، interlaced (2 fields، 262.5 line/field)، 20 line في كل field محجوزين للـ control → أقصى حاجة <b>485 visible lines</b> (الـ laser disc/S-VHS ≈ 420، التلفزيون العادي ≈ 320). بيستخدم <b>YIQ</b>: composite = Y + I cos(Fsc t) + Q sin(Fsc t). الـ Bandwidth: Y 4 MHz، I 1.5 MHz، Q 0.6 MHz (analog compression).`,
      `<b>PAL</b>: 625 line/frame، <b>25 fps</b> (40 ms/frame)، 4:3، interlaced (312.5 line/field). بيستخدم <b>YUV (YCrCb)</b>: composite = Y + 0.492 U sin(Fsc t) + 0.877 V cos(Fsc t). الـ Bandwidth: Y 5.5 MHz، وU وV كل واحد 1.8 MHz.`,
      `دوال الألوان في MATLAB: colormap، rgbplot، cmpermute؛ hsv2rgb/rgb2hsv، lab2double/lab2uint8، <b>ntsc2rgb/rgb2ntsc</b> (YIQ)، <b>ycbcr2rgb/rgb2ycbcr</b>.`
    ]},
    { h: `الـ Chroma subsampling`, pts: [
      `بيخزن اللون (chroma) بـ <b>resolution أقل</b> من الـ intensity (luma). استخدامه الأساسي: الـ <b>compression</b> في JPEG وMPEG — وهو واحد من أهم مصدرين للـ <b>lossy</b>.`,
      `ليه بينفع: الـ human visual system حساس للإضاءة أكتر من اللون، وأقل حساسية لمكان وحركة اللون، فبندي bandwidth للـ Y أكتر من Cr/I وCb/Q. تقريبًا مفيش فرق ملحوظ.`,
      `النسبة بتتكتب بـ 3 أجزاء J:a:b — الأول = الـ horizontal sampling reference بتاع الـ luma (Y) (في الأصل مضاعف لـ 3.579 MHz في NTSC، اتقرّب لـ 4)؛ التاني = الـ horizontal factor بتاع Cr/I؛ التالت = الـ horizontal factor بتاع Cb/Q، إلا لو كان <b>0</b> فمعناه إن Cb زي الرقم التاني وإن الاتنين chroma بيتعملهم subsample <b>2:1 vertically</b>.`,
      `<b>4:4:4</b> مفيش subsampling. <b>4:2:2</b> الـ chroma بنص الـ horizontal rate. <b>4:1:1</b> horizontal factor 4. <b>4:2:0</b> factor 2 horizontally وvertically.`,
      `الحساب: في 4:4:4/4:2:2/4:1:1 بناخد كل تاني أو رابع pixel (1×2، 1×4). في <b>4:2:0</b>، بنقسم الصورة لـ <b>blocks 2×2</b> وبنخزن <b>متوسط (average)</b> لون كل block (الـ chroma بيبقى في نص المسافة بين الصفوف). في MATLAB: imresize بـ 'nearest' (4:2:2، 4:1:1) أو 'bilinear' (4:2:0).`,
      `الـ data المتخزنة لكل 4 pixels (samples الـ Y+Cb+Cr، مقابل 12 في 4:4:4): 4:2:2 → 8 (2/3)، 4:1:1 → 6 (1/2)، 4:2:0 → 6 (1/2).`,
      `الـ Errors: (1) اللون بيتحفظ بنص الـ resolution — مش مشكلة حقيقية (العين والكاميرات أصلًا الـ colour resolution بتاعتهم أقل). (2) <b>integer rounding</b> وإحنا بنحوّل RGB→YUV والعكس — بيأثر على 1–2 % من الـ pixels. عشان كده ما تعملش recompress للـ videos كذا مرة؛ عدّل على الأصل.`
    ]},
    { h: `الـ Aliasing في الصور والـ video`, pts: [
      `<b>Stair-stepping</b>: حواف مسننة على الخطوط المايلة (زي الحروف المايلة).`,
      `الـ aliasing بتاع الـ <b>Image zooming</b>: لما تغيّر الـ resolution أو تعمل scan بـ resolution مش كفاية (digital zoom). الـ zoom in بـ n بيقسم الـ sample resolution على n. التفسير: <b>Nyquist's sampling theorem</b>.`,
      `<b>Temporal aliasing</b>: الـ wagon-wheel (strobing) effect — العجلة شكلها بيلف لورا؛ والقطر اللي باين إنه ماشي في الاتجاهين. الـ frame rate الغلط بـ"يفريز" الـ frames في اللحظة الغلط. أقل من Nyquist → حركة غلط؛ عند/فوق Nyquist → حركة صح.`,
      `<b>Raster scan aliasing</b>: twinkling/strobing (لمعان ورعشة) على الخطوط الأفقية الحادة.`,
      `<b>Interlacing aliasing</b>: الـ interlacing عمليًا <b>بيقسم الـ sampling frequency على اتنين</b>. والـ image aliasing بتاع كل frame برضه بيحصل.`
    ]}
  ],
  cards: [
    `37.5 KB (1 bit/pixel)، حوالي 300 KB (1 byte/pixel)، 921.6 KB (3 bytes/pixel).`,
    `256 × 256 × 256 = 16,777,216.`,
    `24-bit RGB وزيادة عليه byte للـ alpha عشان special effects زي الـ transparency.`,
    `كل pixel بيخزن index؛ والـ look-up table هو اللي بيدي لون الـ RGB. محتاجينه في الـ 8-bit colour؛ وبيسمح بالـ palette animation.`,
    `بنبدّل كل pixel بـ pattern نقط n×n (زي 4×4) بحيث عدد النقط يقرّب درجة الرمادي. بنعمل remap من 0-255 لـ 0-16 بالقسمة على 256/17.`,
    `UNISYS/CompuServe، LZW، lossless، أقصاه 8-bit (256 لون)، interlacing؛ والـ GIF89a بيزود animation وtransparency.`,
    `معمول عشان يحل محل الـ GIF: لحد 48 bits/pixel، gamma correction، alpha channel، progressive display بـ 8×8.`,
    `Tagged Image File Format (Aldus): أنواع صور كتير عن طريق الـ tags، غالبًا lossless، ويقدر يستخدم JPEG tag.`,
    `من 400 nm لـ 700 nm.`,
    `الـ Rods: مش حساسة للون (للإضاءة). الـ Cones: 3 أنواع (R، G، B) للون.`,
    `L = luminance، a = من الأخضر للأحمر، b = من الأزرق للأصفر. بيستخدمه Photoshop.`,
    `Y = 0.299R + 0.587G + 0.114B.`,
    `TV broadcasting ملون (NTSC)، compatible مع التلفزيون الأبيض والأسود. Y 4 MHz، I 1.5 MHz، Q 0.6 MHz.`,
    `الـ YUV: U = B - Y، V = R - Y (digital video، PAL). الـ YCbCr: Cb = (B - Y)/1.772، Cr = (R - Y)/1.402؛ بيُستخدم في JPEG.`,
    `اعمل normalize لـ 0-1، C = 1 - R، M = 1 - G، Y = 1 - B؛ K = min(C, M, Y)؛ اطرح K من C وM وY.`,
    `NTSC: 525 line، 29.97 fps، YIQ. PAL: 625 line، 25 fps، YUV. الاتنين 4:3 وinterlaced.`,
    `الـ chroma بيتقسم على 2 horizontally وvertically: متوسط لون كل block 2×2.`
  ],
  qa: [
    `الطباعة subtractive: الأحبار على الورق بتمتص (بتطرح) wavelengths من الضوء المنعكس، فالـ subtractive primaries (cyan وmagenta وyellow) ماشيين مع طريقة شغل الأحبار، عكس الـ RGB الـ additive اللي بيُستخدم للضوء الخارج من الشاشات. وخلط C وM وY عمره ما بيدي أسود حقيقي، فبنزود حبر أسود (K) منفصل عشان يطلع أسود حقيقي وأغمق وألوان غامقة أحسن.`,
    `الـ YCbCr (YCrCb)، وهو نسخة scaled من الـ YUV. بيفصل الـ luminance Y عن الـ chrominance Cb وCr. العين حساسة للإضاءة أكتر من اللون، فنقدر نعمل subsample للـ chroma (زي 4:2:0) ونضغطه أكتر تقريبًا من غير أي خسارة ملحوظة.`,
    `الـ Lab (CIE L*a*b*، 1976) هو تحسين perceptual وdevice-independent للـ CIE: L للـ luminance، a من الأخضر للأحمر، b من الأزرق للأصفر؛ بيستخدمه Photoshop. الـ YIQ بيُستخدم في TV broadcasting الملون NTSC، compatible مع التلفزيون الأبيض والأسود، وبيدي Y 4 MHz، I 1.5 MHz، Q 0.6 MHz. الـ YUV هو digital video standard (1982، PAL) فيه U = B - Y وV = R - Y. الـ YIQ والـ YUV بيشتركوا في Y = 0.299R + 0.587G + 0.114B.`,
    `1) اعمل normalize لكل قيمة بالقسمة على 255. 2) CMY = 1 - RGB لكل pixel. 3) K = min(C, M, Y) لكل pixel. 4) C = C - K، M = M - K، Y = Y - K. مثلًا (60, 210, 130) بيدي CMY (0.7647, 0.1765, 0.4902)، وK = 0.1765 وCMYK (0.5882, 0, 0.3137, 0.1765).`,
    `إنك تخزن معلومات اللون بـ resolution أقل من الـ intensity. بينفع لأن الـ human visual system حساس للإضاءة أكتر من اللون ومن مكان وحركة اللون، فعدد chroma samples أقل تقريبًا مش بيعمل فرق ملحوظ. بيتكتب كنسبة زي 4:2:2 أو 4:1:1 أو 4:2:0، وهو من أهم خطوات الـ lossy في JPEG وMPEG.`,
    `الـ Component: كل primary (RGB أو YIQ/YUV) على signal لوحده؛ أحسن ألوان بس محتاج bandwidth أكتر وsynchronisation. الـ Composite: الـ luminance والـ chrominance متخلطين على carrier واحد؛ فيه شوية interference. الـ S-Video: 2 lines، واحد للـ luminance وواحد للـ composite chrominance؛ حل وسط.`
  ],
  quiz: [
    [`غلط: الشاشات هي اللي additive (RGB). الطباعة subtractive.`, `صح. الـ CMY هما الـ subtractive primaries؛ وخلط الـ CMY عمره ما بيدي أسود حقيقي، فبنزود حبر أسود.`, `مش ده السبب؛ الـ gamut بتاع CMYK في الحقيقة أصغر وألوانه باهتة أكتر.`, `الـ JPEG بيستخدم YCbCr، مش CMYK.`],
    [`الـ CMYK للطباعة.`, `الـ YIQ بيُستخدم في الـ NTSC TV broadcasting.`, `صح. الـ JPEG بيحوّل الـ RGB لـ YCbCr عشان يقدر يعمل subsample للـ chroma.`, `الـ Lab بيستخدمه Photoshop.`],
    [`ده حجم الـ 1-bit bitmap.`, `ده حجم الـ 8-bit (1 byte/pixel).`, `صح. 640 × 480 × 3 = 921,600 bytes.`, `ده يبقى الـ 32-bit (4 bytes/pixel).`],
    [`ده الـ CMY؛ لسه ما طلّعناش الـ K.`, `صح. CMY = (0.7647, 0.1765, 0.4902)، K = min = 0.1765، وبعدين نطرح K.`, `دي قيم الـ RGB بعد الـ normalize، مش CMY.`, `الـ K لازم يبقى الـ minimum بتاع الـ CMY ويتطرح من التلاتة.`],
    [`صح. 0.299×110 + 0.587×110 + 0.114×255 = 32.89 + 64.57 + 29.07 = 126.53.`, `ده المتوسط العادي (110+110+255)/3، مش المعادلة الـ weighted.`, `ده الـ I component.`, `ده الـ Q component.`],
    [`معكوسين.`, `صح، من السلايد على طول.`, `دول Cb وCr بتوع الـ YCrCb (الـ YUV الـ scaled).`, `دول تحويلات CMY.`],
    [`صح. العين أكتر حساسية للـ Y، وبعده I، وبعده Q.`, `ده الـ PAL (Y، U، V).`, `الـ Y لازم ياخد أكبر bandwidth.`, `الفكرة كلها إننا ندي الـ chrominance أقل.`],
    [`الـ JPEG lossy وبيدعم 24-bit colour.`, `صح. LZW، lossless، 8-bit colour، interlacing؛ والـ GIF89a بيزود animation.`, `الـ PNG بيدعم لحد 48 bits لكل pixel.`, `الـ PostScript مفيهوش compression.`],
    [`ده الـ 4:4:4.`, `ده الـ 4:2:2.`, `صح.`, `الـ 0 مش معناه إن الـ Cb اتشال؛ معناه 2:1 vertical subsampling.`],
    [`نسيت تحوّل الـ KB لـ bytes (0.01/25).`, `استخدمت 1 KB = 1000 B؛ الكورس بيستخدم 1024.`, `صح. 0.01 × 1024 = 10.24 B؛ 10.24/25 × 100 = 40.96 %.`, `ده الـ ratio المعكوس مضروب في 100؛ الكورس بيحط الـ compressed فوق.`],
    [`صح. الـ Lossless معناه I''' = I، فكل الفروق بـ 0 (والـ MAE برضه 0).`, `مفيش أي error بيدخل خالص.`, `الـ CR والـ MSE كميات مالهاش علاقة ببعض.`, `هو معرّف وقيمته 0.`],
    [`ده الـ twinkling على الخطوط الأفقية الحادة.`, `صح. الـ frame rate أقل من الـ Nyquist rate بالنسبة للحركة (strobing).`, `دي مشكلة colour resolution/rounding.`, `ده spatial aliasing على الحواف المايلة.`],
    [`ده الـ NTSC.`, `صح. 40 ms لكل frame، و312.5 line لكل field.`, `الـ CMYK موديل طباعة.`, `ده مش PAL.`],
    [`ده الـ b.`, `صح.`, `ده الـ L (luminance).`, `ده مش محور في الـ Lab.`]
  ],
  extra: [
    [`ده نتيجة الـ CMY مع K = 0؛ لازم تطلّع K = min(C, M, Y) وتطرحه.`, `Normalise: (0.7843, 0.3922, 0.1961). CMY = 1 − RGB = (0.2157, 0.6078, 0.8039). K = min = 0.2157؛ اطرح K → (0, 0.3922, 0.5882, 0.2157).`, `الـ K اتحسب بس ما اتطرحش من C وM وY.`, `ده سايب قيم الـ RGB بعد الـ normalise؛ لازم الأول تحسب الـ CMY = 1 − RGB.`],
    [`ده المتوسط العادي (350/3)؛ الـ Y بيستخدم الأوزان 0.299، 0.587، 0.114.`, `Y = 0.299×100 + 0.587×200 + 0.114×50 = 29.9 + 117.4 + 5.7 = 153.0.`, `ده بدّل أوزان R وG (0.587×100 + 0.299×200 + 0.114×50)؛ الـ G هو اللي واخد أكبر وزن، 0.587.`, `ده الـ Y بعد الـ normalise لـ 0–1؛ الـ luminance بتاع YIQ/YUV بيتحسب هنا على قيم الـ 0–255 على طول.`],
    [`ده الـ MAE (متوسط |الفروق| = 9/4)؛ الـ MSE بيربّع الفروق.`, `ده مجموع الـ squared errors؛ لازم يتقسم على MN = 4.`, `ده قسم مجموع الـ squared errors (29) على 2 بدل MN = 4 pixels.`, `الفروق −2، 3، 0، −4 → المربعات 4، 9، 0، 16 → المجموع 29 ÷ 4 pixels = 7.25.`],
    [`ده استخدم 1 KB = 1000 B (100 B)؛ الكورس بيستخدم 1024 B.`, `ده original ÷ compressed (convention الكتاب)؛ معادلة الكورس compressed ÷ original.`, `ده عامل الصورة كأنها greyscale (100 B)؛ الـ RGB بيستخدم 3 bytes لكل pixel.`, `الـ Original = 10 × 10 × 3 = 300 B؛ الـ compressed = 0.1 × 1024 = 102.4 B؛ 102.4/300 × 100 ≈ 34.13 %.`],
    [`ده حط نقط في الأماكن اللي القيمة فيها ≥ الـ entry (0–6)؛ القاعدة أكبر من بس (strictly greater).`, `ده 16 − 6، يعني عدد النقط اللي فاضلة فاضية.`, `100 × 17/256 = 6.64 → 6. النقطة بتتحط لما 6 > الـ entry، يعني الـ entries من 0–5: ست نقط.`, `الـ pixel لازم الأول يتعمله remap لـ 0–16؛ والـ block الـ 4×4 فيه 16 نقطة بس.`],
    [`ده حجم الـ 24-bit؛ الـ 32-bit بيزود byte رابع (alpha).`, `ده 1 byte لكل pixel (8-bit).`, `800 × 600 × 4 B = 1,920,000 B ÷ 1024 = 1875 KB.`, `ده قسم الـ bits على 1024 من غير ما يحوّلها لـ bytes.`],
    [`لكل 4 pixels: 4 Y + 2 Cb + 2 Cr = 8 samples بدل 12 → 2/3.`, `ده الـ 4:1:1 أو 4:2:0 (6 من 12 sample).`, `ده يبقى محتفظ بالـ luma بس؛ الـ 4:2:2 بيحتفظ بنص كل chroma component.`, `دي مش نسبة من المحاضرة؛ 8 من 12 sample = 2/3.`],
    [`صح — Portable Network Graphics.`, `غلط — الـ TIFF بيستخدم tags عشان يخزن أنواع صور كتير وشعبيته بتقل.`, `غلط — الـ BMP هو الـ raster format بتاع Windows (يقدر يخزن bitmaps بـ 24-bit).`, `غلط — الـ JPEG format lossy للصور الـ photographic، مش بديل للـ GIF فيه alpha.`],
    [`صح — الـ S-Video هو الحل الوسط بين الـ component والـ composite video.`, `غلط — ده الـ component video.`, `غلط — ده الـ composite video.`, `غلط — الـ S-Video ده analog signal format؛ والـ chroma subsampling موضوع تاني.`],
    [`غلط — المحاضرة بتقول إن الـ interlacing عمليًا بيقسم الـ sampling frequency على اتنين (HALVES)، وده اللي بيعمل interlacing aliasing.`, `صح — الـ interlacing عمليًا بيقسم الـ sampling frequency على اتنين (الـ field الواحد فيه نص السطور بس).`]
  ]
};

AR.mm.exams = [
  { sections: [
    { items: [
      { why: `عدد الـ samples في الثانية، وبيتقاس بالـ Hz (L4).` },
      { why: `1 Hz = sample واحدة في الثانية.` },
      { why: `fs ≥ 2·fmax (L4).` },
      { why: `2 × 5 kHz = 10 kHz. الـ 20 kHz برضه تنفع بس هي مش الـ minimum.` },
      { why: `لما تعمل sampling أقل من الـ Nyquist rate، الـ frequencies العالية بتتطوي وتبان كأنها frequencies واطية مزيفة = aliasing. أما الـ quantisation noise فبييجي من الـ bit depth.` },
      { why: `لما الـ fs تعلى، حد الـ Nyquist اللي هو fs/2 بيعلى، فعدد components أقل بيحصلها aliasing. وده بيزوّد حجم الـ data (مش بيقلله)، والـ quantisation error بيعتمد على عدد الـ bits مش على الـ rate.` },
      { why: `Over = فوق الـ Nyquist rate اللي هو 2·fmax.` },
      { why: `الـ CD = 44.1 kHz، 16 bit (L1، L4). الـ 22.05 kHz ده audio جودته واطية.` },
      { why: `الـ Undersampling → aliasing distortion.` },
      { why: `أعلى frequency ممكن تتمثّل هي fs/2، فلما الـ fs تعلى بتقدر تلقط frequencies أعلى. بس ده بيكلّف memory وprocessing أكتر.` }
    ] },
    { items: [
      { why: `ده التعريف (L4).` },
      { why: `الـ Nyquist frequency = fs/2، يعني أعلى frequency الـ sample rate يقدر يمثّلها (مثلًا 44.1 kHz → 22.05 kHz).` },
      { why: `الـ Aliasing بيحصل لما الـ fs تكون واطية أوي LOW (أقل من 2·fmax).` },
      { why: `fs ≥ 2 × 1 kHz = 2 kHz.` },
      { why: `كلمة "Guarantees" (يضمن) قوية زيادة. لو الـ sampling بالظبط عند 2·fmax، ممكن كل الـ samples بتاعة أعلى frequency تيجي على الـ zero crossings، فالـ component ده ممكن يضيع؛ وعمليًا بنختار الـ fs أعلى من 2·fmax (44.1 kHz لحد 20 kHz). وصياغة المحاضرة "at least twice" معناها إن 2·fmax هي الحد الأدنى، مش ضمان. لو الدكتور بيعتبر الحد الأدنى كفاية ممكن يقبل True، بس الإجابة المقصودة False.` },
      { why: `كلمة "Always" (دايمًا) غلط: أول ما الـ fs تعدّي ضعف أعلى frequency (مسموعة)، أي rate أعلى بيزوّد حجم الملف بس من غير أي تحسن تسمعه؛ وكمان الجودة محدودة بالـ bit depth.` },
      { why: `الـ sampling فوق الـ Nyquist rate بيسيب margin فوق الـ bandwidth بتاع الـ signal، فبيقلل الـ aliasing.` },
      { why: `الإجابة المقصودة False: الـ digital signal بتطلع عن طريق الـ sampling (مع الـ quantisation) للـ analog signal — Digital = Sampling + Quantisation (خلاصة الكورس). (لو هندقق، الـ signal اللي هي digital أصلًا معمولها sampling خلاص؛ بس الممتحن بيختبر إن الـ digitisation محتاج sampling.)` },
      { why: `أعلى frequency ممكن تتمثّل هي fs/2 (الـ Nyquist frequency).` },
      { why: `الـ CD quality = 16-bit، 44.1 kHz.` }
    ] },
    { items: [
      { why: `الـ Final Rules: القيم لازم تبقى بين 0–1، فاعمل normalise (÷255) الأول، وبعدين CMY = 1 − RGB، وK = min(C, M, Y)، واطرح الـ K من C وM وY. مثال الـ pixel (1,1): R,G,B = 10,10,210 → C = M = 0.9608، Y = 0.1765 → K = 0.1765 → CMYK = (0.7843, 0.7843, 0, 0.1765). القيم متقربة لـ 4 decimals ومتراجعة بـ script.`,
        ans: `<b>Step 1 · normalise</b>: اقسم كل value على 255 (عشان القيم تبقى بين 0–1).<br><b>Step 2 · CMY</b> = 1 − RGB/255:<br>C (من الـ Red):<table><tr><td>0.9608</td><td>0.5686</td><td>0.7647</td><td>0.3725</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.7255</td><td>0.3333</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.6863</td><td>0.2941</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.6471</td><td>0.2549</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.6078</td><td>0.2157</td></tr></table>M (من الـ Green):<table><tr><td>0.9608</td><td>0.5686</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.0000</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.4118</td><td>0.0196</td></tr></table>Y (من الـ Blue):<table><tr><td>0.1765</td><td>0.7647</td><td>0.3725</td><td>0.9608</td></tr><tr><td>0.1373</td><td>0.7255</td><td>0.3333</td><td>0.9216</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.2941</td><td>0.8824</td></tr><tr><td>0.0588</td><td>0.6471</td><td>0.2549</td><td>0.8431</td></tr><tr><td>0.0196</td><td>0.6078</td><td>0.0196</td><td>0.8039</td></tr></table><b>Step 3 · K</b> = min(C, M, Y) لكل pixel:<table><tr><td>0.1765</td><td>0.5686</td><td>0.3725</td><td>0.1765</td></tr><tr><td>0.1373</td><td>0.5294</td><td>0.3333</td><td>0.1373</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.2941</td><td>0.0980</td></tr><tr><td>0.0588</td><td>0.4510</td><td>0.0000</td><td>0.0588</td></tr><tr><td>0.0196</td><td>0.4118</td><td>0.0196</td><td>0.0196</td></tr></table><b>Step 4 · CMYK</b>: C<sub>CMYK</sub> = C − K، M<sub>CMYK</sub> = M − K، Y<sub>CMYK</sub> = Y − K، والـ K زي ما هو فوق.<br>C:<table><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.6471</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr></table>M:<table><tr><td>0.7843</td><td>0.0000</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.0000</td></tr></table>Y:<table><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.2549</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr></table>K: نفس Step 3.` }
    ] },
    { items: [
      { why: `اعتبرها greyscale، 1 byte لكل pixel.`,
        ans: `شوف الأجزاء a–c تحت.` },
      { why: `حسب Multimedia Summary 2026، ص. 15 (scan مكتوب بخط اليد، فمش هتعرف تعمل search فيه): CR = size of compressed (I′) / size of original (I) × 100؛ وفي ص. 16–17 حالّين نفس الصورة الـ 5×5 دي بالظبط وطلعت 40.96 %، و1 KB = 1024 B، ومعادلة الـ CR هي هي سواء الـ scheme كان lossy أو lossless. ومعروض كمان convention الكتاب (original ÷ compressed).`,
        ans: `<b>الحجم الأصلي (Original size)</b> = colour depth × rows × columns = 1 byte (8-bit grey) × 5 × 5 = <b>25 bytes</b>.<br>الـ Compressed = 0.001 KB × 1024 = 1.024 B.<br>CR = 1.024 / 25 × 100 = <b>4.096 %</b><br>(بصيغة الكتاب: 25 / 1.024 ≈ <b>24.41 : 1</b>.)` },
      { why: `حسب Multimedia Summary 2026، ص. 15 (scan مكتوب بخط اليد، فمش هتعرف تعمل search فيه): CR = size of compressed (I′) / size of original (I) × 100؛ وفي ص. 16–17 حالّين نفس الصورة الـ 5×5 دي بالظبط وطلعت 40.96 %، و1 KB = 1024 B، ومعادلة الـ CR هي هي سواء الـ scheme كان lossy أو lossless. ومعروض كمان convention الكتاب (original ÷ compressed). (في الواقع مفيش lossless coder يصغّر 25 byte لحوالي 1 byte، بس الامتحان بيختبر المعادلة بس.)`,
        ans: `نفس الحسبة: CR = (0.001 × 1024) / 25 × 100 = <b>4.096 %</b> (≈ 24.41 : 1). كون الـ scheme lossy أو lossless مش بيغيّر معادلة الـ CR؛ الفرق بس هل الصورة اللي اتعملها reconstruct هتساوي الأصلية ولا لأ.` },
      { why: `Summary 2026: "at lossless compression the decompressed image equals the original image" (في الـ lossless الصورة بعد الـ decompression بتساوي الأصلية). رقم الـ 5.5 KB ده مجرد تشتيت.`,
        ans: `مع الـ compression الـ <b>lossless</b> الصورة بعد الـ decompression (اللي اتعملها reconstruct) بتبقى <b>نفس الأصلية بالظبط</b> (I = I″، MSE = MAE = 0)، مهما كان الحجم بعد الـ compression:<table><tr><td>10</td><td>110</td><td>110</td><td>210</td><td>210</td></tr><tr><td>20</td><td>120</td><td>120</td><td>220</td><td>220</td></tr><tr><td>30</td><td>130</td><td>130</td><td>230</td><td>230</td></tr><tr><td>40</td><td>140</td><td>255</td><td>240</td><td>240</td></tr><tr><td>50</td><td>150</td><td>150</td><td>250</td><td>250</td></tr></table>` }
    ] }
  ] },
  { sections: [
    { items: [
      { why: `أعلى مدى للسمع عند الإنسان حوالي 20–22 kHz (fmax = 22.05 kHz). Nyquist: fs ≥ 2·fmax = 2 × 22.05 = 44.1 kHz (L4).`,
        ans: `أعلى حد للسمع عند الإنسان حوالي <b>20–22 kHz</b>. وحسب <b>Nyquist's theorem</b> الـ sampling frequency لازم تكون على الأقل <b>ضعف أعلى frequency</b> في الـ signal. فـ fs = 2 × 22.05 kHz = <b>44.1 kHz</b> بتلقط كل الـ frequencies المسموعة من غير aliasing (والزيادة البسيطة فوق 2 × 20 kHz بتسيب مساحة للـ anti-aliasing low-pass filter).` },
      { why: `L8 الـ colour models + خلاصة الكورس ("ليه CMY مش RGB في الطباعة").`,
        ans: `الطباعة <b>subtractive</b>: الأحبار/الـ pigments على الورق <b>بتمتص (بتطرح)</b> wavelengths معينة من الضوء الأبيض وبتعكس الباقي. الـ Cyan والـ magenta والـ yellow هما الـ <b>subtractive primaries</b> (الـ complements بتاعة RGB: C = 1 − R، M = 1 − G، Y = 1 − B)، فالـ CMY بيطابق طريقة شغل الحبر، بينما الـ RGB <b>additive</b> (ضوء طالع من الشاشات). خلط C + M + Y <b>عمره ما بيدي أسود حقيقي</b> (بيطلع بني غامق معكّر) وبيهدر حبر، فبنضيف حبر <b>أسود (K)</b> لوحده عشان يدي أسود حقيقي وأغمق وألوان غامقة أحسن.` }
    ] },
    { items: [
      { why: `نفس الـ matrices بتاعة سؤال Q3 في 2025/26. اعمل normalise ÷255 → CMY = 1 − RGB → K = min(C,M,Y) → اطرح الـ K.`,
        ans: `<b>Step 1 · normalise</b>: اقسم كل value على 255 (عشان القيم تبقى بين 0–1).<br><b>Step 2 · CMY</b> = 1 − RGB/255:<br>C (من الـ Red):<table><tr><td>0.9608</td><td>0.5686</td><td>0.7647</td><td>0.3725</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.7255</td><td>0.3333</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.6863</td><td>0.2941</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.6471</td><td>0.2549</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.6078</td><td>0.2157</td></tr></table>M (من الـ Green):<table><tr><td>0.9608</td><td>0.5686</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.0000</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.4118</td><td>0.0196</td></tr></table>Y (من الـ Blue):<table><tr><td>0.1765</td><td>0.7647</td><td>0.3725</td><td>0.9608</td></tr><tr><td>0.1373</td><td>0.7255</td><td>0.3333</td><td>0.9216</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.2941</td><td>0.8824</td></tr><tr><td>0.0588</td><td>0.6471</td><td>0.2549</td><td>0.8431</td></tr><tr><td>0.0196</td><td>0.6078</td><td>0.0196</td><td>0.8039</td></tr></table><b>Step 3 · K</b> = min(C, M, Y) لكل pixel:<table><tr><td>0.1765</td><td>0.5686</td><td>0.3725</td><td>0.1765</td></tr><tr><td>0.1373</td><td>0.5294</td><td>0.3333</td><td>0.1373</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.2941</td><td>0.0980</td></tr><tr><td>0.0588</td><td>0.4510</td><td>0.0000</td><td>0.0588</td></tr><tr><td>0.0196</td><td>0.4118</td><td>0.0196</td><td>0.0196</td></tr></table><b>Step 4 · CMYK</b>: C<sub>CMYK</sub> = C − K، M<sub>CMYK</sub> = M − K، Y<sub>CMYK</sub> = Y − K، والـ K زي ما هو فوق.<br>C:<table><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.6471</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr></table>M:<table><tr><td>0.7843</td><td>0.0000</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.0000</td></tr></table>Y:<table><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.2549</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr></table>K: نفس Step 3.` }
    ] },
    { items: [
      { why: `1 byte لكل pixel → 25 bytes.`,
        ans: `شوف a–c.` },
      { why: `حسب Multimedia Summary 2026، ص. 15 (scan مكتوب بخط اليد، فمش هتعرف تعمل search فيه): CR = size of compressed (I′) / size of original (I) × 100؛ وفي ص. 16–17 حالّين نفس الصورة الـ 5×5 دي بالظبط وطلعت 40.96 %، و1 KB = 1024 B، ومعادلة الـ CR هي هي سواء الـ scheme كان lossy أو lossless. ومعروض كمان convention الكتاب (original ÷ compressed). السؤال ده بالظبط محلول في الـ Summary 2026 وطالع 40.96 %.`,
        ans: `<b>الحجم الأصلي (Original size)</b> = colour depth × rows × columns = 1 byte (8-bit grey) × 5 × 5 = <b>25 bytes</b>.<br>الـ Compressed = 0.01 × 1024 = 10.24 B.<br>CR = 10.24 / 25 × 100 = <b>40.96 %</b> (بصيغة الكتاب 25 / 10.24 ≈ <b>2.44 : 1</b>).` },
      { why: `حسب Multimedia Summary 2026، ص. 15 (scan مكتوب بخط اليد، فمش هتعرف تعمل search فيه): CR = size of compressed (I′) / size of original (I) × 100؛ وفي ص. 16–17 حالّين نفس الصورة الـ 5×5 دي بالظبط وطلعت 40.96 %، و1 KB = 1024 B، ومعادلة الـ CR هي هي سواء الـ scheme كان lossy أو lossless. ومعروض كمان convention الكتاب (original ÷ compressed).`,
        ans: `نفس الكلام: CR = (0.01 × 1024)/25 × 100 = <b>40.96 %</b>. معادلة الـ CR مش بتعتمد على lossy/lossless.` },
      { why: `الـ Summary 2026 حالّ السؤال ده بالظبط بنفس الطريقة.`,
        ans: `Lossless ⇒ الصورة بعد الـ decompression = الصورة الأصلية (I = I″):<table><tr><td>10</td><td>110</td><td>110</td><td>210</td><td>210</td></tr><tr><td>20</td><td>120</td><td>120</td><td>220</td><td>220</td></tr><tr><td>30</td><td>130</td><td>130</td><td>230</td><td>230</td></tr><tr><td>40</td><td>140</td><td>255</td><td>240</td><td>240</td></tr><tr><td>50</td><td>150</td><td>150</td><td>250</td><td>250</td></tr></table>` }
    ] }
  ] },
  { sections: [
    { items: [
      { why: `أعلى مدى للسمع عند الإنسان حوالي 20–22 kHz (fmax = 22.05 kHz). Nyquist: fs ≥ 2·fmax = 2 × 22.05 = 44.1 kHz (L4).`,
        ans: `أعلى حد للسمع عند الإنسان حوالي <b>20–22 kHz</b>. وحسب <b>Nyquist's theorem</b> الـ sampling frequency لازم تكون على الأقل <b>ضعف أعلى frequency</b> في الـ signal. فـ fs = 2 × 22.05 kHz = <b>44.1 kHz</b> بتلقط كل الـ frequencies المسموعة من غير aliasing (والزيادة البسيطة فوق 2 × 20 kHz بتسيب مساحة للـ anti-aliasing low-pass filter).` },
      { why: `L8 الـ colour models + خلاصة الكورس ("ليه CMY مش RGB في الطباعة").`,
        ans: `الطباعة <b>subtractive</b>: الأحبار/الـ pigments على الورق <b>بتمتص (بتطرح)</b> wavelengths معينة من الضوء الأبيض وبتعكس الباقي. الـ Cyan والـ magenta والـ yellow هما الـ <b>subtractive primaries</b> (الـ complements بتاعة RGB: C = 1 − R، M = 1 − G، Y = 1 − B)، فالـ CMY بيطابق طريقة شغل الحبر، بينما الـ RGB <b>additive</b> (ضوء طالع من الشاشات). خلط C + M + Y <b>عمره ما بيدي أسود حقيقي</b> (بيطلع بني غامق معكّر) وبيهدر حبر، فبنضيف حبر <b>أسود (K)</b> لوحده عشان يدي أسود حقيقي وأغمق وألوان غامقة أحسن.` },
      { why: `L8: الـ YCrCb "used in JPEG" (مستخدم في الـ JPEG) (وكمان في خلاصة الكورس).`,
        ans: `الـ JPEG بيستخدم الـ colour model <b>YCbCr (YCrCb)</b>: Y = 0.299R + 0.587G + 0.114B (luminance)، Cb = (B − Y)/1.772، Cr = (R − Y)/1.402 (chrominance). فصل الـ luminance عن الـ chrominance بيخلي الـ JPEG يقدر <b>يعمل subsample للـ chroma</b> (العين أقل حساسية لتفاصيل اللون من الإضاءة)، وده بيساعد في الـ compression.` }
    ] },
    { items: [
      { why: `حجم ملف الـ video الكلي = الـ audio stream + الـ video stream. ثوابت الـ speech: fmax 4 kHz → fs 8 kHz؛ mono = channel واحد؛ colour = 24 bits/pixel.`,
        ans: `المعطيات: t = 10 h = 10 × 3600 = <b>36,000 s</b>؛ الـ frame 1600 × 800، ملوّن ⇒ colour depth 24 bits. الـ frame rate (FPS) وحجم الـ audio sample (Q bits) <b>مش معطيين</b>، فـ (حسب الـ Final Rules) بنسيبهم variables.<br><b>الـ Video stream</b> = W × H × depth × FPS × t = 1600 × 800 × 24 × FPS × 36,000 = <b>1,105,920,000,000 × FPS bits</b>.<br><b>الـ Audio (mono speech)</b>: fs = 2 × 4 kHz = 8000 Hz، channel واحد → 8000 × Q × 1 × 36,000 = <b>288,000,000 × Q bits</b>.<br><b>الـ Total</b> = 1,105,920,000,000·FPS + 288,000,000·Q bits (÷8 عشان تحوّل لـ bytes).<br>مثال بـ FPS = 25 وQ = 16: 27,648,000,000,000 + 4,608,000,000 = <b>27,652,608,000,000 bits = 3,456,576,000,000 B</b> ≈ 3.14 TB.` },
      { why: `ثوابت الـ music: fmax 22.05 kHz → fs 44.1 kHz؛ stereo = 2 channels. جزء الـ video زي ما هو مش بيتغير.`,
        ans: `<b>الـ Audio (stereo music)</b>: fs = 2 × 22.05 kHz = 44,100 Hz، 2 channels → 44,100 × Q × 2 × 36,000 = <b>3,175,200,000 × Q bits</b>.<br><b>الـ Total</b> = 1,105,920,000,000·FPS + 3,175,200,000·Q bits.<br>مثال بـ FPS = 25 وQ = 16: 27,648,000,000,000 + 50,803,200,000 = <b>27,698,803,200,000 bits = 3,462,350,400,000 B</b> ≈ 3.15 TB.` }
    ] },
    { items: [
      { why: `اعمل normalise ÷255، وCMY = 1 − RGB، وK = min(C,M,Y)، واطرح الـ K. القيم متراجعة بـ script (4 d.p.).`,
        ans: `<b>Step 1 · normalise</b>: اقسم كل value على 255 (عشان القيم تبقى بين 0–1).<br><b>Step 2 · CMY</b> = 1 − RGB/255:<br>C (من الـ Red):<table><tr><td>0.9608</td><td>0.5686</td><td>0.1765</td><td>0.7647</td><td>0.3725</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.1373</td><td>0.7255</td><td>0.3333</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.0980</td><td>0.6863</td><td>0.2941</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.0588</td><td>0.6471</td><td>0.2549</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.0196</td><td>0.6078</td><td>0.2157</td></tr></table>M (من الـ Green):<table><tr><td>0.9608</td><td>0.5686</td><td>0.5686</td><td>0.1765</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.5294</td><td>0.1373</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.4902</td><td>0.0980</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.0000</td><td>0.0588</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.4118</td><td>0.0196</td><td>0.0196</td></tr></table>Y (من الـ Blue):<table><tr><td>0.1765</td><td>0.7647</td><td>0.3725</td><td>0.3725</td><td>0.9608</td></tr><tr><td>0.1373</td><td>0.7255</td><td>0.3333</td><td>0.3333</td><td>0.9216</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.2941</td><td>0.2941</td><td>0.8824</td></tr><tr><td>0.0588</td><td>0.6471</td><td>0.2549</td><td>0.2549</td><td>0.8431</td></tr><tr><td>0.0196</td><td>0.6078</td><td>0.2157</td><td>0.0196</td><td>0.8039</td></tr></table><b>Step 3 · K</b> = min(C, M, Y) لكل pixel:<table><tr><td>0.1765</td><td>0.5686</td><td>0.1765</td><td>0.1765</td><td>0.1765</td></tr><tr><td>0.1373</td><td>0.5294</td><td>0.1373</td><td>0.1373</td><td>0.1373</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.0980</td><td>0.0980</td><td>0.0980</td></tr><tr><td>0.0588</td><td>0.4510</td><td>0.0000</td><td>0.0588</td><td>0.0588</td></tr><tr><td>0.0196</td><td>0.4118</td><td>0.0196</td><td>0.0196</td><td>0.0196</td></tr></table><b>Step 4 · CMYK</b>: C<sub>CMYK</sub> = C − K، M<sub>CMYK</sub> = M − K، Y<sub>CMYK</sub> = Y − K، والـ K زي ما هو فوق.<br>C:<table><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0588</td><td>0.5882</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr></table>M:<table><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.3922</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.0000</td><td>0.0000</td></tr></table>Y:<table><tr><td>0.0000</td><td>0.1961</td><td>0.1961</td><td>0.1961</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.1961</td><td>0.1961</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.1961</td><td>0.1961</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.2549</td><td>0.1961</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr></table>K: نفس Step 3.` },
      { why: `حجم الصورة = rows × columns × colour depth؛ والـ colour depth بيبقى 4 × 8 = 32 bits بعد ما نضيف الـ K channel. لو القيم الـ normalised اتخزنت كـ floats الحجم هيختلف؛ بس افتراض byte لكل channel هو الـ standard.`,
        ans: `الـ CMYK فيه <b>4 channels</b>. لو افترضنا 8 bits (1 byte) لكل channel: الحجم = 5 × 5 × 4 × 8 = <b>800 bits = 100 bytes</b> (الصورة الأصلية RGB = 5 × 5 × 3 = 75 bytes، فصورة الـ CMYK أكبر بنسبة 4/3).` }
    ] }
  ] },
  { sections: [
    { items: [
      { why: `الـ Sampling interval = 1 / sampling frequency؛ والثوابت من الـ Final Rules.`,
        ans: `a) الـ Speech: fmax = 4 kHz → fs = 8000 Hz → T = 1/8000 = <b>0.000125 s</b> (125 µs).<br>b) الـ Music: fmax = 22.05 kHz → fs = 44,100 Hz → T = 1/44,100 ≈ <b>0.0000227 s</b> (22.68 µs).` },
      { why: `الـ Total = audio + video؛ الـ FPS والـ Q مش معطيين في الورقة.`,
        ans: `t = 4 × 3600 = <b>14,400 s</b>. Grey scale ⇒ 8 bits/pixel.<br>الـ Video = 600 × 800 × 8 × FPS × 14,400 = <b>55,296,000,000 × FPS bits</b>.<br>الـ Audio (stereo speech) = 8000 × Q × 2 × 14,400 = <b>230,400,000 × Q bits</b>.<br>الـ Total = 55,296,000,000·FPS + 230,400,000·Q bits.<br>مثال FPS = 25، Q = 16: 1,382,400,000,000 + 3,686,400,000 = <b>1,386,086,400,000 bits = 173,260,800,000 B</b>.` },
      { why: `convention الكورس CR = compressed/original × 100؛ حوّل الحجمين لنفس الوحدة (bits) الأول.`,
        ans: `الـ Compressed = 1000 × 1024 × 8 = <b>8,192,000 bits</b>.<br>CR = 8,192,000 / (55,296,000,000·FPS + 230,400,000·Q) × 100 %.<br>مثال (25 fps، 16 bit): 8,192,000 / 1,386,086,400,000 × 100 ≈ <b>0.000591 %</b> (بصيغة الكتاب ≈ 169,200 : 1).` }
    ] },
    { items: [
      { why: `L8 الـ colour models وخلاصة الكورس.`,
        ans: `<table><tr><th></th><th>Lab (CIE L*a*b*)</th><th>YIQ</th><th>YUV</th></tr><tr><td>الفكرة</td><td>CIE متحسّن، model perceptual (مبني على إدراك الإنسان)</td><td>Luminance + 2 chrominance</td><td>Luminance + 2 colour differences</td></tr><tr><td>الـ Components</td><td>L = luminance؛ a = green→red؛ b = blue→yellow</td><td>Y = 0.299R+0.587G+0.114B؛ I، Q chrominance</td><td>Y؛ U = B − Y؛ V = R − Y</td></tr><tr><td>بيُستخدم في</td><td>Photoshop / device-independent colour</td><td>NTSC colour TV broadcasting (backward compatible مع التلفزيون الأبيض والأسود)</td><td>Digital video، PAL</td></tr><tr><td>الـ Bandwidth</td><td>—</td><td>Y 4 MHz، I 1.5 MHz، Q 0.6 MHz (الخلاصة)</td><td>—</td></tr></table>` },
      { why: `معادلات الـ YUV من L8 / الـ Final Rules. الـ summary ساعات بيعمل floor للقيم وبيعمل clip للسالب لـ 0؛ هنا معروضة القيم المظبوطة.`,
        ans: `الـ pixel اللي تحته خط: R = 30، G = 130، B = 230.<br>Y = 0.299(30) + 0.587(130) + 0.114(230) = 8.97 + 76.31 + 26.22 = <b>111.5</b><br>U = B − Y = 230 − 111.5 = <b>118.5</b><br>V = R − Y = 30 − 111.5 = <b>−81.5</b><br>(تأكيد بالـ matrix: U = −0.299(30) − 0.587(130) + 0.886(230) = 118.5؛ V = 0.701(30) − 0.587(130) − 0.114(230) = −81.5.)` }
    ] },
    { items: [
      { why: `الـ MSE للـ RGB/CMY = 1/(3MN) ΣΣΣ [I − I″]². لو أخدت الـ CMY على إنها 255 − RGB (scale 0–255) الإجابة 6250؛ ومع الـ normalisation بتاع الكورس تبقى 0.0961. متراجعة بـ script.`,
        ans: `CMY = 1 − RGB/255، فكل فرق في الـ CMY = −(فرق الـ RGB)/255 (والـ squares مش بتتأثر بالإشارة).<br>فروق الـ RGB I − I″: الـ R فيها تلات −100 (column 2، rows 1–3) وتمانية +100؛ الـ G فيها تمانية +100؛ الـ B فيها تلات −100 وتمانية +100.<br>Σ(diff)² بوحدات الـ RGB: R 110,000 + G 80,000 + B 110,000 = <b>300,000</b>.<br>MSE = 1/(3MN) Σ = 300,000 / (3 × 4 × 4) = 300,000 / 48 = <b>6250</b> (على scale الـ 0–255).<br>في الـ CMY الـ normalised (0–1): MSE = 6250 / 255² = <b>0.0961</b>.` },
      { why: `Summary 2026: "MSE, MAE in case of lossless = 0" (في الـ lossless الـ MSE والـ MAE = 0). (لو تجاهلت افتراض الـ lossless واستخدمت الـ reconstruction المطبوعة، MAE = 3000/48 = 62.5 على scale الـ 0–255 = 0.2451 normalised — بس السؤال بيقول lossless.)`,
        ans: `مع scheme <b>lossless</b> الصورة اللي اتعملها reconstruct بتساوي الأصلية (I = I″)، فكل فرق = 0 و<b>MAE = 0</b> (والـ MSE = 0 كمان).` }
    ] }
  ] }
];

// ---- Arabic for PAPERS.mm (new exams + quiz items) ----
AR.mm.exams.push(
{ sections: [
  { items: [
    { why: `L2: الودن بتستحمل power ratio أكبر من 10<sup>12</sup> → 10·log10(10<sup>12</sup>) = <b>120 dB = threshold of pain</b> (عتبة الألم). الـ 0 dB هو الـ reference (threshold of hearing).` },
    { why: `L2: الـ reference level دايمًا <b>0 dB</b> (X = X0 → 10·log10(1) = 0). في الـ acoustics الـ 0 dB هو عتبة الإدراك عند الإنسان.` },
    { why: `نظرية Nyquist (L4): fs ≥ 2·fmax.` },
    { why: `L2: الـ sine wave بتتوصف بالـ amplitude والـ frequency والـ <b>phase</b>، z(t) = a·sin(ωt + φ)؛ الـ phase بيزحلق الموجة على محور الزمن (x)، يعني هي بتبدأ / بتقطع المحور على بُعد قد إيه من الـ origin. الـ amplitude هو الارتفاع، والـ frequency هي عدد الـ cycles في الثانية.` },
    { why: `fs = 2 × 11,025 = 22,050 Hz = <b>22.05 kHz</b> (Nyquist). الـ 44.1 kHz برضه مش هيعمل aliasing، بس مش هو الـ rate المطلوب (الـ minimum).` },
    { why: `CMY = 1 − RGB = (0.75, 0.75, 0.5). K = min(C, M, Y) = <b>0.5</b> (L8).` },
    { why: `CMY = (0.5, 0.75, 0.75). K = min = <b>0.5</b>.` },
    { why: `نفس لون سؤال 6 (متكرر في الورقة): CMY = (0.75, 0.75, 0.5)، K = <b>0.5</b>.` },
    { why: `C = 1 − R = 1 − 0.25 = <b>0.75</b>.` },
    { why: `M = 1 − G = 1 − 0.25 = <b>0.75</b>.` },
    { why: `Y = 1 − B = 1 − 0.5 = <b>0.5</b>.` },
    { why: `fs = 2 × 1000 = <b>2000 Hz = 2 kHz</b>.` },
    { why: `الـ Nyquist بيعتمد على <b>أعلى</b> frequency، مش أقل واحدة. لو عارف الـ minimum frequency بس مش هتعرف منها الـ rate المطلوب، فالإجابة <b>None</b>.` },
    { why: `L2: SNR = P<sub>signal</sub>/P<sub>noise</sub> — قدرة الـ <b>signal</b> (المعلومة المفيدة) على الـ background noise.` },
    { why: `L1/L8: الـ JPEG <b>lossy</b> — بيستغل حدود الرؤية عند الإنسان، والـ user هو اللي بيختار الـ quality level.` }
  ] },
  { items: [
    { why: `لازم تكون <b>على الأقل</b> الضعف (fs ≥ 2·fmax)، مش على الأكثر.` },
    { why: `الـ Nyquist بيستخدم <b>أعلى</b> frequency component، مش أقل واحد.` },
    { why: `L2: الـ FIR هو الـ system الأبسط اللي <b>مفيهوش feedback loop</b>: y(n) = Σ b<sub>k</sub>·x(n − k).` },
    { why: `L2: الـ IIR بيرجّع الـ output تاني من خلال weighted delays — يعني system <b>recursive (فيه feedback)</b>.` },
    { why: `L2: الـ FIR filter العام "with N − 1 feed-forward delays" هو y(n) = Σ<sub>k=0..N−1</sub> b<sub>k</sub>·x(n − k).` },
    { why: `L8: الصورة الـ grey/monochrome هي 2-D array من أرقام <b>مفردة</b> (1 bit أو 1 byte لكل pixel). الـ triplets (R, G, B) دي للصور الـ true-colour.` },
    { why: `في z(t) = a·sin(ωt + φ) (L2)، الـ φ هي زاوية الـ sinusoid عند t = 0 — يعني الزاوية الابتدائية بتاعتها.` },
    { why: `الـ reference هو <b>0 dB</b> (L2)، مش 10 dB.` },
    { why: `تعريف L1، زي text وgraphics وimages وsound/audio وanimation و/أو video.` },
    { why: `L4 بتقول العكس: الـ sampling frequency <b>مهمة جدًا (critical)</b> عشان الـ reproduction يطلع مظبوط (لو واطية أوي → aliasing).` }
  ] },
  { items: [
    { why: `نفس طريقة المثال المحلول في L4 (x(t) = 2A cos(200πt + π/3) + …): ω = 2πf، هات الـ fmax، fs = 2·fmax، T = 1/fs. الـ amplitudes (10A، 200A، 2C) مش فارقة طول ما هي مش صفر. "Lowest possible sampling interval" في الورق ده معناها الـ interval الحدّي 1/(2·fmax)؛ وأي interval أقصر منه برضه شغال.`,
      ans: `كل term شكله cos/sin(2πf·t)، فـ f = (المعامل اللي جنب πt)/2:<br>100πt → f1 = <b>50 Hz</b>؛ 150πt → f2 = <b>75 Hz</b>؛ 200πt → f3 = <b>100 Hz</b>؛ 250πt → f4 = <b>125 Hz</b>.<br>fmax = 125 Hz (C &gt; 0، فالـ term ده موجود فعلًا).<br>Nyquist: fs ≥ 2 × 125 = <b>250 Hz</b>.<br>الـ Sampling interval T = 1/fs ≤ 1/250 = <b>0.004 s (4 ms)</b>.` },
    { why: `L8: القيم أصلًا بين 0–1، فمش محتاجين نقسم على 255. K = min(C, M, Y)، وبعدين نطرح الـ K من كل واحدة.`,
      ans: `CMY = 1 − RGB = (0.9, 0.5, 0.6).<br>K = min(0.9, 0.5, 0.6) = <b>0.5</b>.<br>C' = 0.9 − 0.5 = 0.4، M' = 0.5 − 0.5 = 0، Y' = 0.6 − 0.5 = 0.1.<br><b>CMYK = (0.4, 0, 0.1, 0.5)</b>.` }
  ] },
  { items: [
    { why: `MSE = (1/MN) ΣΣ [I(x,y) − I″(x,y)]² (الـ course summary / L8). متراجعة بـ script.`,
      ans: `الفروق I − I″:<table><tr><td>−160</td><td>−160</td><td>−160</td><td>90</td></tr><tr><td>−160</td><td>−160</td><td>90</td><td>90</td></tr><tr><td>−160</td><td>−160</td><td>90</td><td>90</td></tr><tr><td>−160</td><td>−160</td><td>90</td><td>90</td></tr></table>المربعات: 160² = 25,600 (9 خانات) و 90² = 8,100 (7 خانات).<br>Σ(I − I″)² = 9 × 25,600 + 7 × 8,100 = <b>287,100</b>.<br>MSE = Σ / (M·N) = 287,100 / 16 = <b>17,943.75</b>.` },
    { why: `SNR = P<sub>signal</sub>/P<sub>noise</sub>، وبالـ dB = 10·log10(Ps/Pn) (L2). في الصورة الـ signal power هي Σ I² والـ noise power هي Σ (I − I″)². شكل المعادلة للصور مش موجود في السلايدز الحالية؛ هو بس تطبيق لتعريف L2. بعض الكتب بتستخدم الـ mean powers بدل كده؛ الـ ratio بيطلع هو هو لأن الاتنين متقسومين على MN.`,
      ans: `الـ Signal power = Σ I² للصورة الأصلية = 10² + 50² + … + 160² = <b>149,600</b>.<br>الـ Noise power = Σ (I − I″)² = 287,100.<br>SNR = 149,600 / 287,100 = <b>0.5211</b>، يعني SNR<sub>dB</sub> = 10·log10(0.5211) = <b>−2.83 dB</b>.<br>(الـ dB بالسالب: الـ error أكبر من الـ signal — reconstruction وحش جدًا.)` },
    { why: `الـ Peak signal-to-noise ratio بيستخدم أكبر قيمة pixel ممكنة (255) على إنها الـ "signal". متراجعة بـ script.`,
      ans: `PSNR = 10·log10(MAX² / MSE) مع MAX = 255 (8-bit):<br>= 10·log10(65,025 / 17,943.75) = 10·log10(3.6238) = <b>5.59 dB</b>.` }
  ] },
  { items: [
    { why: `MSE = (1/N) Σ (I − I″)². متراجعة بـ script.`,
      ans: `<table><tr><td>I − I″</td><td>−0.8</td><td>−0.5</td><td>−0.5</td><td>0</td><td>−0.2</td><td>0.5</td><td>0.1</td><td>0.3</td><td>0.4</td><td>−0.1</td><td>−0.1</td><td>−0.5</td><td>−0.2</td><td>0.7</td><td>0.7</td><td>−0.5</td></tr><tr><td>(I − I″)²</td><td>0.64</td><td>0.25</td><td>0.25</td><td>0</td><td>0.04</td><td>0.25</td><td>0.01</td><td>0.09</td><td>0.16</td><td>0.01</td><td>0.01</td><td>0.25</td><td>0.04</td><td>0.49</td><td>0.49</td><td>0.25</td></tr><tr><td>|I − I″|</td><td>0.8</td><td>0.5</td><td>0.5</td><td>0</td><td>0.2</td><td>0.5</td><td>0.1</td><td>0.3</td><td>0.4</td><td>0.1</td><td>0.1</td><td>0.5</td><td>0.2</td><td>0.7</td><td>0.7</td><td>0.5</td></tr></table>Σ(I − I″)² = <b>3.23</b> على N = 16 sample.<br>MSE = 3.23 / 16 = <b>0.201875</b> ≈ 0.2019.` },
    { why: `MAE = (1/N) Σ |I − I″|.`,
      ans: `Σ|I − I″| = <b>6.1</b> (الصف التالت في الجدول اللي فوق).<br>MAE = 6.1 / 16 = <b>0.38125</b> ≈ 0.3813.` }
  ] }
] },
{ sections: [
  { items: [
    { why: `L2: الـ reference level دايمًا <b>0 dB</b>.` },
    { why: `L2: power ratio &gt; 10<sup>12</sup> → <b>120 dB</b> = threshold of pain.` },
    { why: `Nyquist (L4): fs ≥ 2·fmax.` },
    { why: `L2: الـ <b>phase</b> بيزحلق الموجة على محور الزمن (x)، فهو اللي بيحدد الموجة بتقطع المحور فين بالنسبة للـ origin.` },
    { why: `2 × 11,025 Hz = <b>22.05 kHz</b>.` },
    { why: `Lossless ⇒ الـ reconstructed = الأصلية ⇒ كل فرق = 0 ⇒ <b>MSE = 0</b> (الـ course summary / L8).` },
    { why: `في z(t) = a·sin(ωt + φ) الـ y-intercept هو z(0) = a·sin φ: بيعتمد على الـ amplitude والـ phase <b>مع بعض</b>، فمش أي واحدة من الكميات اللي في الاختيارات لوحدها. الورقة سألت نسخة الـ x-axis (الإجابة: Phase) في سؤال 4 بنفس الاختيارات، وده معناه إن المقصود هنا إجابة تانية — غالبًا "None of the above". ومفيش key، فدي أقوى إجابة عندنا، بس مش أكيدة.` },
    { why: `L1، تعريف الـ <b>multimedia</b> من ناحية الـ computer system.` },
    { why: `الـ Run-length encoding بيخزن كل run على شكل (value, count) وتقدر ترجّعها بالظبط، فهو <b>lossless</b>.` },
    { why: `L1/L8: الـ JPEG <b>lossy</b>.` }
  ] },
  { items: [
    { why: `تعريف L1 للـ multimedia system.` },
    { why: `تعريف L1.` },
    { why: `L1/L8: الـ JPEG lossy.` },
    { why: `L1 حاطة الـ MPEG video/audio ضمن أمثلة الـ <b>lossy</b> (مع الـ MP3 والـ JPEG).` },
    { why: `L1: الـ MP3 مثال على الـ lossy (الأجزاء الأقل أهمية من ناحية الإدراك بتترمي).` },
    { why: `<b>على الأقل</b> الضعف (Nyquist).` },
    { why: `الـ reference هو <b>0 dB</b> (L2).` },
    { why: `الـ φ في a·sin(ωt + φ) هي الزاوية عند t = 0 (L2).` },
    { why: `ده نفي لجملة 8، واللي هي صح.` },
    { why: `الـ Bit rate = عدد الـ bits في الثانية من الـ video. bits أكتر في الثانية يعني compression أقل (data أقل بتترمي)، فالـ quality الأعلى ممكنة على حساب الـ bandwidth/storage.` }
  ] },
  { items: [
    { why: `Shannon information: اختيار واحد من اتنين احتمالهم متساوي = 1 bit.`,
      ans: `الـ Information بتاعة event احتماله p: I = log<sub>2</sub>(1/p).<br>I = log<sub>2</sub>(1/(1/2)) = log<sub>2</sub> 2 = <b>1 bit</b>.<br>(الـ Entropy H = −Σ p log<sub>2</sub> p = 2 × ½ × 1 = 1 bit.)` },
    { why: `لما الـ outcomes كلها احتمالها متساوي، الـ entropy = log<sub>2</sub>(عدد الـ outcomes). متراجعة: log2(3) = 1.58496.`,
      ans: `H = −Σ p<sub>i</sub> log<sub>2</sub> p<sub>i</sub> = −3 × (1/3) log<sub>2</sub>(1/3) = log<sub>2</sub> 3 ≈ <b>1.585 bits</b>.<br>يعني Bob وصّل log<sub>2</sub> 3 ≈ 1.585 bits.` }
  ] },
  { items: [
    { why: `MSE = (1/MN) ΣΣ [I − I″]². متراجعة بـ script (14,768.5625).`,
      ans: `الفروق I − I″:<table><tr><td>240</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>0</td><td>0</td><td>−178</td></tr><tr><td>0</td><td>245</td><td>−208</td><td>34</td></tr><tr><td>−40</td><td>42</td><td>−198</td><td>0</td></tr></table>Σ(I − I″)² = 240² + 178² + 245² + 208² + 34² + 40² + 42² + 198² = 57,600 + 31,684 + 60,025 + 43,264 + 1,156 + 1,600 + 1,764 + 39,204 = <b>236,297</b>.<br>MSE = 236,297 / 16 = <b>14,768.5625</b>.` },
    { why: `SNR = P<sub>signal</sub>/P<sub>noise</sub>، وبالـ dB بنستخدم 10·log10 (L2)، والـ signal = الصورة الأصلية والـ noise = الـ reconstruction error. شكل المعادلة للصور مش في السلايدز الحالية؛ هو تطبيق لتعريف L2. متراجعة بـ script.`,
      ans: `الـ Signal power Σ I² (الأصلية) = <b>252,443</b>؛ الـ noise power Σ (I − I″)² = 236,297.<br>SNR = 252,443 / 236,297 = <b>1.0683</b> → SNR<sub>dB</sub> = 10·log10(1.0683) = <b>0.29 dB</b>.` }
  ] },
  { items: [
    { why: `موضوع من الـ old syllabus. الورقة مش قايلة نعمل الصورة الـ grey إزاي؛ الـ luminance Y هي قيمة الـ grey في الكورس (L8). لو استخدمت المتوسط البسيط (R+G+B)/3 الـ pixelين المختلفين هيبقوا 196.67 → 197 و 145 — برضه مفيش runs، فالنتيجة هي هي. بعض الكتب بتخزن (value, count) بدل (count, value)؛ أي ترتيب مقبول طالما قلته.`,
      ans: `<b>Step 1 · الـ grey level</b> (luminance، L8): Grey = 0.299R + 0.587G + 0.114B. في أي مكان R = G = B قيمة الـ grey بتساوي القيمة دي نفسها؛ فيه pixelين بس مختلفين:<br>(row 3، col 2): 0.299·80 + 0.587·255 + 0.114·255 = 202.675 → <b>203</b><br>(row 4، col 2): 0.299·255 + 0.587·90 + 0.114·90 = 139.335 → <b>139</b><br>الصورة الـ Grey:<table><tr><td>10</td><td>60</td><td>110</td><td>160</td><td>210</td></tr><tr><td>20</td><td>70</td><td>120</td><td>170</td><td>220</td></tr><tr><td>30</td><td>203</td><td>130</td><td>180</td><td>230</td></tr><tr><td>40</td><td>139</td><td>140</td><td>190</td><td>240</td></tr><tr><td>50</td><td>100</td><td>150</td><td>200</td><td>250</td></tr></table><b>Step 2 · RLE</b>: امشي row row وخزّن كل run على شكل (count, value)، وكل واحد فيهم رقم binary من 8 bits. مفيش أي pixelين جنب بعض متساويين، فكل run طوله 1:<table><tr><th>Run</th><th>Value</th><th>Count</th><th>Binary (count, value)</th></tr><tr><td>1</td><td>10</td><td>1</td><td><code>00000001 00001010</code></td></tr><tr><td>2</td><td>60</td><td>1</td><td><code>00000001 00111100</code></td></tr><tr><td>3</td><td>110</td><td>1</td><td><code>00000001 01101110</code></td></tr><tr><td>4</td><td>160</td><td>1</td><td><code>00000001 10100000</code></td></tr><tr><td>5</td><td>210</td><td>1</td><td><code>00000001 11010010</code></td></tr><tr><td>6</td><td>20</td><td>1</td><td><code>00000001 00010100</code></td></tr><tr><td>7</td><td>70</td><td>1</td><td><code>00000001 01000110</code></td></tr><tr><td>8</td><td>120</td><td>1</td><td><code>00000001 01111000</code></td></tr><tr><td>9</td><td>170</td><td>1</td><td><code>00000001 10101010</code></td></tr><tr><td>10</td><td>220</td><td>1</td><td><code>00000001 11011100</code></td></tr><tr><td>11</td><td>30</td><td>1</td><td><code>00000001 00011110</code></td></tr><tr><td>12</td><td>203</td><td>1</td><td><code>00000001 11001011</code></td></tr><tr><td>13</td><td>130</td><td>1</td><td><code>00000001 10000010</code></td></tr><tr><td>14</td><td>180</td><td>1</td><td><code>00000001 10110100</code></td></tr><tr><td>15</td><td>230</td><td>1</td><td><code>00000001 11100110</code></td></tr><tr><td>16</td><td>40</td><td>1</td><td><code>00000001 00101000</code></td></tr><tr><td>17</td><td>139</td><td>1</td><td><code>00000001 10001011</code></td></tr><tr><td>18</td><td>140</td><td>1</td><td><code>00000001 10001100</code></td></tr><tr><td>19</td><td>190</td><td>1</td><td><code>00000001 10111110</code></td></tr><tr><td>20</td><td>240</td><td>1</td><td><code>00000001 11110000</code></td></tr><tr><td>21</td><td>50</td><td>1</td><td><code>00000001 00110010</code></td></tr><tr><td>22</td><td>100</td><td>1</td><td><code>00000001 01100100</code></td></tr><tr><td>23</td><td>150</td><td>1</td><td><code>00000001 10010110</code></td></tr><tr><td>24</td><td>200</td><td>1</td><td><code>00000001 11001000</code></td></tr><tr><td>25</td><td>250</td><td>1</td><td><code>00000001 11111010</code></td></tr></table><b>النتيجة</b>: 25 run × 16 bits = <b>400 bits</b>، قصاد 200 bits للـ 25 grey pixel الـ raw. الـ RLE هنا <b>بيضاعف</b> الحجم (CR = 400/200 × 100 = 200 %) لأن الصورة مفيهاش قيم متكررة جنب بعض؛ الـ RLE بيفيد بس لما يكون فيه runs طويلة.` }
  ] }
] },
{ sections: [
  { items: [
    { why: `طريقة المثال المحلول في L4: f = ω/2π، fs = 2·fmax، T = 1/fs. الـ Phase = الزاوية الابتدائية φ في sin/cos(ωt + φ) (L2). شرط A, B &gt; 0 بيضمن إن الـ components الاتنين موجودين.`,
      ans: `<b>الـ Frequencies</b> (الـ argument = 2πf·t + φ): 1500πt → f1 = 1500/2 = <b>750 Hz</b>؛ 2500πt → f2 = 2500/2 = <b>1250 Hz</b>.<br>fmax = 1250 Hz → fs ≥ 2 × 1250 = <b>2500 Hz</b> → الـ sampling interval T = 1/2500 = <b>0.0004 s (0.4 ms)</b>.<br><b>الـ Phases</b> (الثابت اللي متزود جوه كل قوس): component 1 (750 Hz): φ1 = <b>0.2π rad = 36°</b>؛ component 2 (1250 Hz): φ2 = <b>0.25π rad = 45°</b>.<br>(لو كتبت كل term الأول بشكل L2 a·sin(ωt + φ) بـ amplitude موجب: A cos(x + 0.2π) = A sin(x + 0.7π) → 0.7π = 126°؛ −B sin(x + 0.25π) = B sin(x + 1.25π) → 1.25π = 225° (≡ −0.75π). قول إنت مستخدم أنهي شكل.)` }
  ] },
  { items: [
    { why: `حجم الـ Audio = time × fs × sample size × channels (L4)؛ fs = 1/interval؛ 1 KB = 1024 B. متراجعة بـ script.`,
      ans: `fs = 1/0.00125 = <b>800 Hz</b>؛ t = 6.5 × 3600 = <b>23,400 s</b>؛ stereo = 2 channels.<br>Size = t × fs × bits × channels = 23,400 × 800 × 64 × 2 = <b>2,396,160,000 bits</b><br>= 299,520,000 B = 292,500 KB ≈ <b>285.64 MB</b>.` }
  ] },
  { items: [
    { why: `الـ YIQ matrix بتاعة الكورس (L8 / Final Rules): [0.299 0.587 0.114; 0.596 −0.275 −0.321; 0.212 −0.528 0.311]. القيم محسوبة بـ script ومقرّبة لرقمين عشريين. pixel مثال (100, 200, 250): Y = 29.9 + 117.4 + 28.5 = 175.8؛ I = 59.6 − 55 − 80.25 = −75.65؛ Q = 21.2 − 105.6 + 77.75 = −6.65. الـ summary بيعمل floor للقيم وبيعمل clip للسالب لـ 0 لما بيخزنها كـ pixels؛ اكتب القيم الحقيقية وقول لو قرّبت.`,
      ans: `مش محتاجين normalisation (اشتغل على 0–255).<br>Y = 0.299R + 0.587G + 0.114B<br>I = 0.596R − 0.275G − 0.321B<br>Q = 0.212R − 0.528G + 0.311B<br>Y:<table><tr><td>175.80</td><td>60.00</td><td>110.00</td><td>210.00</td></tr><tr><td>20.00</td><td>70.00</td><td>120.00</td><td>220.00</td></tr><tr><td>30.00</td><td>202.67</td><td>130.00</td><td>230.00</td></tr><tr><td>40.00</td><td>139.33</td><td>140.00</td><td>240.00</td></tr><tr><td>50.00</td><td>100.00</td><td>150.00</td><td>166.84</td></tr></table>I:<table><tr><td>−75.65</td><td>0.00</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>−104.30</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>98.34</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>0.00</td><td>0.00</td><td>−110.94</td></tr></table>Q:<table><tr><td>−6.65</td><td>−0.30</td><td>−0.55</td><td>−1.05</td></tr><tr><td>−0.10</td><td>−0.35</td><td>−0.60</td><td>−1.10</td></tr><tr><td>−0.15</td><td>−38.38</td><td>−0.65</td><td>−1.15</td></tr><tr><td>−0.20</td><td>34.53</td><td>−0.70</td><td>−1.20</td></tr><tr><td>−0.25</td><td>−0.50</td><td>−0.75</td><td>−83.23</td></tr></table>` },
    { why: `L8: U = B − Y، V = R − Y. pixel مثال (100, 200, 250): U = 250 − 175.8 = 74.2، V = 100 − 175.8 = −75.8.`,
      ans: `الـ Y هي نفسها اللي في الـ YIQ (0.299R + 0.587G + 0.114B). U = B − Y، V = R − Y.<br>Y:<table><tr><td>175.80</td><td>60.00</td><td>110.00</td><td>210.00</td></tr><tr><td>20.00</td><td>70.00</td><td>120.00</td><td>220.00</td></tr><tr><td>30.00</td><td>202.67</td><td>130.00</td><td>230.00</td></tr><tr><td>40.00</td><td>139.33</td><td>140.00</td><td>240.00</td></tr><tr><td>50.00</td><td>100.00</td><td>150.00</td><td>166.84</td></tr></table>U:<table><tr><td>74.20</td><td>0.00</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>52.33</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>−49.33</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>0.00</td><td>0.00</td><td>−16.84</td></tr></table>V:<table><tr><td>−75.80</td><td>0.00</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>−122.67</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>115.67</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>0.00</td><td>0.00</td><td>−156.84</td></tr></table>` },
    { why: `خطوات L8 / Final Rules: ÷255، CMY = 1 − RGB، K = min(C, M, Y)، وبعدين اطرح الـ K. pixel مثال (100, 200, 250): CMY = (0.6078, 0.2157, 0.0196)، K = 0.0196 → CMYK = (0.5882, 0.1961, 0, 0.0196).`,
      ans: `<b>Step 1 · normalise</b>: اقسم كل قيمة على 255.<br><b>Step 2 · CMY</b> = 1 − RGB/255:<br>C:<table><tr><td>0.6078</td><td>0.7647</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.7255</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.6863</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.0000</td><td>0.4510</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.6078</td><td>0.4118</td><td>0.9608</td></tr></table>M:<table><tr><td>0.2157</td><td>0.7647</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.7255</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.0000</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.6471</td><td>0.4510</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.6078</td><td>0.4118</td><td>0.0196</td></tr></table>Y:<table><tr><td>0.0196</td><td>0.7647</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.7255</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.0000</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.6471</td><td>0.4510</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.6078</td><td>0.4118</td><td>0.4118</td></tr></table><b>Step 3 · K</b> = min(C, M, Y) لكل pixel:<table><tr><td>0.0196</td><td>0.7647</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.7255</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.0000</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.0000</td><td>0.4510</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.6078</td><td>0.4118</td><td>0.0196</td></tr></table><b>Step 4 · اطرح الـ K</b>: C' = C − K، M' = M − K، Y' = Y − K.<br>C':<table><tr><td>0.5882</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.6863</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.9412</td></tr></table>M':<table><tr><td>0.1961</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.6471</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr></table>Y':<table><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.6471</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.3922</td></tr></table>K:<table><tr><td>0.0196</td><td>0.7647</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.7255</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.0000</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.0000</td><td>0.4510</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.6078</td><td>0.4118</td><td>0.0196</td></tr></table>` }
  ] }
] },
{ sections: [
  { items: [
    { why: `طريقة L4: f = ω/2π، fs = 2·fmax، T = 1/fs. L2: z(t) = a·sin(ωt + φ)، والـ cosine هو sine مزحلق 90° في الـ phase؛ وعلامة السالب بتزود 180° كمان. الورقة مش قايلة عايزة أنهي شكل، فالقراءتين معروضين — قول إنت مستخدم أنهي واحدة.`,
      ans: `<b>الـ Frequencies</b> (f = المعامل اللي جنب πt ÷ 2): 1000πt → <b>500 Hz</b>؛ 50πt → <b>25 Hz</b>؛ 200πt → <b>100 Hz</b>؛ 250πt → <b>125 Hz</b>.<br>fmax = 500 Hz (A &gt; 0) → fs ≥ 2 × 500 = <b>1000 Hz</b> → T = 1/1000 = <b>0.001 s (1 ms)</b>.<br><b>الـ Phases</b>: مفيش أي ثابت متزود جوه أي قوس، فلو قريتها على طول كل component الـ phase بتاعه <b>0</b> (500 Hz: 0، 25 Hz: 0، 100 Hz: 0، 125 Hz: 0).<br>لو كتبتها بشكل L2 a·sin(ωt + φ) بـ amplitudes موجبة: A cos(1000πt) = A sin(1000πt + π/2) → <b>π/2 (90°)</b>؛ −B sin(50πt) = B sin(50πt + π) → <b>π (180°)</b>؛ C cos(200πt) → <b>π/2 (90°)</b>؛ −D sin(250πt) → <b>π (180°)</b>.` },
    { why: `هو بالظبط Ex 3 من الـ course summary (ملاحظات L4). حجم الـ Audio = time × fs × bits × channels.`,
      ans: `fs = 1/0.5 s = <b>2 Hz</b>؛ t = 5.5 × 3600 = <b>19,800 s</b>؛ stereo = 2.<br>Size = 19,800 × 2 × 64 × 2 = <b>5,068,800 bits</b> = 633,600 B = <b>618.75 KB</b>.` }
  ] },
  { items: [
    { why: `الـ YIQ matrix بتاعة الكورس (L8). القيم بـ script، رقمين عشريين. pixel مثال (110, 230, 50): Y = 32.89 + 135.01 + 5.70 = 173.60؛ I = 65.56 − 63.25 − 16.05 = −13.74؛ Q = 23.32 − 121.44 + 15.55 = −82.57.`,
      ans: `مش محتاجين normalisation (اشتغل على 0–255).<br>Y = 0.299R + 0.587G + 0.114B<br>I = 0.596R − 0.275G − 0.321B<br>Q = 0.212R − 0.528G + 0.311B<br>Y:<table><tr><td>173.60</td><td>60.00</td><td>110.00</td><td>210.00</td></tr><tr><td>20.00</td><td>70.00</td><td>120.00</td><td>220.00</td></tr><tr><td>30.00</td><td>255.00</td><td>130.00</td><td>230.00</td></tr><tr><td>40.00</td><td>139.33</td><td>140.00</td><td>241.71</td></tr><tr><td>50.00</td><td>100.00</td><td>211.63</td><td>166.84</td></tr></table>I:<table><tr><td>−13.74</td><td>0.00</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>0.00</td><td>0.00</td><td>0.00</td></tr><tr><td>0.00</td><td>98.34</td><td>0.00</td><td>−4.82</td></tr><tr><td>0.00</td><td>0.00</td><td>−28.88</td><td>−110.94</td></tr></table>Q:<table><tr><td>−82.57</td><td>−0.30</td><td>−0.55</td><td>−1.05</td></tr><tr><td>−0.10</td><td>−0.35</td><td>−0.60</td><td>−1.10</td></tr><tr><td>−0.15</td><td>−1.28</td><td>−0.65</td><td>−1.15</td></tr><tr><td>−0.20</td><td>34.53</td><td>−0.70</td><td>3.46</td></tr><tr><td>−0.25</td><td>−0.50</td><td>−56.19</td><td>−83.23</td></tr></table>` },
    { why: `خطوات L8: ÷255، CMY = 1 − RGB، K = min، اطرح الـ K. pixel مثال (110, 230, 50): CMY = (0.5686, 0.0980, 0.8039)، K = 0.0980 → CMYK = (0.4706, 0, 0.7059, 0.0980).`,
      ans: `<b>Step 1 · normalise</b>: اقسم كل قيمة على 255.<br><b>Step 2 · CMY</b> = 1 − RGB/255:<br>C:<table><tr><td>0.5686</td><td>0.7647</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.7255</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.0000</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.0000</td><td>0.4510</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.6078</td><td>0.4118</td><td>0.9608</td></tr></table>M:<table><tr><td>0.0980</td><td>0.7647</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.7255</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.0000</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.6471</td><td>0.4510</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.6078</td><td>0.0000</td><td>0.0196</td></tr></table>Y:<table><tr><td>0.8039</td><td>0.7647</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.7255</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.0000</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.6471</td><td>0.4510</td><td>0.0000</td></tr><tr><td>0.8039</td><td>0.6078</td><td>0.4118</td><td>0.4118</td></tr></table><b>Step 3 · K</b> = min(C, M, Y) لكل pixel:<table><tr><td>0.0980</td><td>0.7647</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.7255</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.0000</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.0000</td><td>0.4510</td><td>0.0000</td></tr><tr><td>0.8039</td><td>0.6078</td><td>0.0000</td><td>0.0196</td></tr></table><b>Step 4 · اطرح الـ K</b>: C' = C − K، M' = M − K، Y' = Y − K.<br>C':<table><tr><td>0.4706</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0588</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.4118</td><td>0.9412</td></tr></table>M':<table><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.6471</td><td>0.0000</td><td>0.0588</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr></table>Y':<table><tr><td>0.7059</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.6471</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.4118</td><td>0.3922</td></tr></table>K:<table><tr><td>0.0980</td><td>0.7647</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.7255</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.0000</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.0000</td><td>0.4510</td><td>0.0000</td></tr><tr><td>0.8039</td><td>0.6078</td><td>0.0000</td><td>0.0196</td></tr></table>` }
  ] },
  { items: [
    { why: `الـ MSE للصورة الملونة = 1/(3MN) ΣΣΣ [I − I″]² (الـ course summary). متراجعة بـ script: 562,400 / 75 = 7498.67.`,
      ans: `I − I″ (R):<table><tr><td>0</td><td>−100</td><td>100</td><td>100</td><td>0</td></tr><tr><td>0</td><td>−100</td><td>100</td><td>100</td><td>0</td></tr><tr><td>0</td><td>−100</td><td>100</td><td>100</td><td>0</td></tr><tr><td>0</td><td>0</td><td>100</td><td>100</td><td>0</td></tr><tr><td>0</td><td>0</td><td>100</td><td>180</td><td>0</td></tr></table>I − I″ (G):<table><tr><td>0</td><td>0</td><td>100</td><td>100</td><td>0</td></tr><tr><td>0</td><td>0</td><td>100</td><td>100</td><td>0</td></tr><tr><td>0</td><td>0</td><td>100</td><td>100</td><td>0</td></tr><tr><td>0</td><td>0</td><td>100</td><td>100</td><td>0</td></tr><tr><td>0</td><td>0</td><td>100</td><td>0</td><td>0</td></tr></table>I − I″ (B):<table><tr><td>0</td><td>−100</td><td>100</td><td>100</td><td>200</td></tr><tr><td>0</td><td>−100</td><td>100</td><td>100</td><td>200</td></tr><tr><td>0</td><td>0</td><td>100</td><td>100</td><td>200</td></tr><tr><td>0</td><td>−100</td><td>100</td><td>100</td><td>200</td></tr><tr><td>0</td><td>0</td><td>100</td><td>0</td><td>200</td></tr></table>مجموع مربعات الـ errors: R = 152,400، G = 90,000، B = 320,000 → المجموع <b>562,400</b>.<br>MSE = Σ / (3·M·N) = 562,400 / (3 × 5 × 5) = 562,400 / 75 = <b>7,498.6667</b> (scale الـ 0–255).` },
    { why: `MAE = 1/(3MN) ΣΣΣ |I − I″|. متراجعة بـ script: 4480 / 75 = 59.73.`,
      ans: `مجموع الـ absolute errors: R = 1,380، G = 900، B = 2,200 → المجموع <b>4,480</b>.<br>MAE = 4,480 / 75 = <b>59.7333</b>.` }
  ] },
  { items: [
    { why: `الـ colour models في L8 + الـ course summary.`,
      ans: `الطباعة <b>subtractive</b>: الحبر/الـ pigments على الورق <b>بتمتص (بتطرح)</b> wavelengths معينة من الضوء الأبيض وبتعكس الباقي. الـ Cyan والـ magenta والـ yellow هما الـ <b>subtractive primaries</b> (المكمّلات بتاعة RGB: C = 1 − R، M = 1 − G، Y = 1 − B)، فالـ CMY ماشي مع طريقة شغل الحبر، أما الـ RGB فهو <b>additive</b> (ضوء طالع من الشاشات). خلط C + M + Y <b>عمره ما بيطلع أسود حقيقي</b> (بيطلع بني غامق معكّر) وبيهدر حبر، فبنزود حبر <b>أسود (K)</b> منفصل عشان يدي أسود حقيقي أغمق وألوان غامقة أحسن.` },
    { why: `L4: السمع ≈ 20–22 kHz (fmax = 22.05 kHz)؛ Nyquist fs = 2·fmax = 44.1 kHz.`,
      ans: `الحد الأعلى للسمع عند الإنسان حوالي <b>20–22 kHz</b>. وبنظرية <b>Nyquist</b> الـ sampling frequency لازم تكون على الأقل <b>ضعف أعلى frequency</b> في الـ signal. فـ fs = 2 × 22.05 kHz = <b>44.1 kHz</b> بتمسك كل frequency مسموعة من غير aliasing (وزيادة بسيطة فوق 2 × 20 kHz بتسيب مساحة للـ anti-aliasing low-pass filter).` }
  ] }
] },
{ sections: [
  { items: [
    { why: `L1، "Multimedia systems: definition and 4 characteristics".`,
      ans: `الأربع خصائص الأساسية (L1): (1) لازم يكون <b>computer controlled</b>؛ (2) يكون <b>integrated</b>؛ (3) المعلومات اللي بيتعامل معاها لازم تتمثّل <b>digitally</b>؛ (4) الـ interface للعرض النهائي للـ media غالبًا بيكون <b>interactive</b>.<br>(الـ multimedia system هو system يقدر يعالج multimedia data وapplications: processing وstorage وgeneration وmanipulation وrendition للمعلومات الـ multimedia.)` },
    { why: `L1، "Challenges and key issues".`,
      ans: `الـ Challenges (L1): <b>الـ distributed networks</b>؛ <b>الـ temporal relationship</b> (العلاقة الزمنية) بين الـ data؛ <b>إنك تعرض data مختلفة في نفس الوقت وبشكل continuous</b>؛ <b>الـ sequencing جوه الـ media</b> (تشغيل الـ video frames بالترتيب والتوقيت الصح)؛ <b>الـ synchronisation</b> — inter-media scheduling، زي <b>الـ lip synchronisation</b> بين الـ video والـ audio. الـ Key issues اللي وراها: إزاي نمثّل ونخزن المعلومات الزمنية ونحافظ عليها وقت الـ playback، الـ digital representation (A/D conversion، sampling)، و<b>الـ data الكبيرة المطلوبة</b> (bandwidth، storage)، وده اللي بيخلّي الـ data compression غالبًا إجباري.` }
  ] },
  { items: [
    { why: `عُرف الكورس: الـ speech fs = 8 kHz، والـ music 44.1 kHz (L4).`,
      ans: `الـ Speech الـ fmax بتاعه ≈ <b>4 kHz</b> (ثابت من الكورس). Nyquist: fs = 2 × 4000 = <b>8000 Hz (8 kHz)</b> (الـ sampling interval = 1/8000 = 0.000125 s).` },
    { why: `هو بالظبط Ex 4 من الـ course summary (ملاحظات L4). Size = time × fs × bits × channels.`,
      ans: `t = 2.5 × 3600 = <b>9000 s</b>؛ stereo = 2 channels.<br>Size = 9000 × 8000 × 32 × 2 = <b>4,608,000,000 bits</b> = 576,000,000 B = <b>562,500 KB</b> ≈ 549.32 MB.` }
  ] },
  { items: [
    { why: `Lossy ⇒ استخدم الـ reconstruction المطبوعة. MAE = 1/(3MN) ΣΣΣ |I − I″|. متراجعة بـ script. لو الأزرق (row 5، col 4) كان 200 مش 250، مجموع الأزرق يبقى 3250 والـ MAE = 6550/75 = 87.33.`,
      ans: `I − I″ (R):<table><tr><td>−50</td><td>−50</td><td>200</td><td>−50</td><td>−50</td></tr><tr><td>−50</td><td>−50</td><td>200</td><td>−50</td><td>−50</td></tr><tr><td>−50</td><td>−50</td><td>200</td><td>−50</td><td>−50</td></tr><tr><td>−50</td><td>−50</td><td>0</td><td>−50</td><td>−50</td></tr><tr><td>−50</td><td>−50</td><td>200</td><td>−50</td><td>−50</td></tr></table>I − I″ (G):<table><tr><td>−100</td><td>−100</td><td>0</td><td>100</td><td>0</td></tr><tr><td>−100</td><td>−100</td><td>0</td><td>100</td><td>0</td></tr><tr><td>−100</td><td>100</td><td>0</td><td>100</td><td>0</td></tr><tr><td>−100</td><td>−100</td><td>0</td><td>100</td><td>0</td></tr><tr><td>−100</td><td>−100</td><td>0</td><td>100</td><td>0</td></tr></table>I − I″ (B):<table><tr><td>150</td><td>−100</td><td>150</td><td>50</td><td>−200</td></tr><tr><td>150</td><td>−100</td><td>150</td><td>50</td><td>−200</td></tr><tr><td>150</td><td>−100</td><td>150</td><td>50</td><td>−200</td></tr><tr><td>150</td><td>−100</td><td>150</td><td>50</td><td>−200</td></tr><tr><td>150</td><td>−100</td><td>150</td><td>100</td><td>−200</td></tr></table>مجموع الـ absolute errors: R = 1,800، G = 1,500، B = 3,300 → المجموع <b>6,600</b>.<br>MAE = 6,600 / (3 × 5 × 5) = 6,600 / 75 = <b>88.00</b>.` },
    { why: `الـ course summary: "MSE, MAE in case of lossless = 0" (نفس الحركة اللي في ورقة الترم التاني 2022/23). للعلم بس، لو استخدمت الـ reconstruction المطبوعة (lossy) هيطلع مجموع المربعات R 210,000 + G 150,000 + B 495,000 = 855,000، والـ MSE = 855,000 / 75 = 11,400 — بس السؤال بيقول lossless.`,
      ans: `مع scheme <b>lossless</b> الصورة اللي اتعملها reconstruct بتساوي الأصلية (I = I″)، فكل فرق = 0 و<b>MSE = 0</b>.` }
  ] }
] },
{ sections: [
  { items: [
    { why: `L1، "Challenges and key issues".`,
      ans: `الـ Challenges (L1): <b>الـ distributed networks</b>؛ <b>الـ temporal relationship</b> (العلاقة الزمنية) بين الـ data؛ <b>إنك تعرض data مختلفة في نفس الوقت وبشكل continuous</b>؛ <b>الـ sequencing جوه الـ media</b> (تشغيل الـ video frames بالترتيب والتوقيت الصح)؛ <b>الـ synchronisation</b> — inter-media scheduling، زي <b>الـ lip synchronisation</b> بين الـ video والـ audio. الـ Key issues اللي وراها: إزاي نمثّل ونخزن المعلومات الزمنية ونحافظ عليها وقت الـ playback، الـ digital representation (A/D conversion، sampling)، و<b>الـ data الكبيرة المطلوبة</b> (bandwidth، storage)، وده اللي بيخلّي الـ data compression غالبًا إجباري.` },
    { why: `حجم الـ Audio = time × fs × bits × channels (L4)، fs = 1/interval. الـ interval مش بيقسم الـ duration بالظبط، فالإجابة مش رقم صحيح؛ سيب الكسر أو قول قرّبت إزاي. متراجعة بـ script.`,
      ans: `fs = 1/0.00525 ≈ <b>190.48 Hz</b>؛ t = 2.5 × 3600 = <b>9000 s</b>؛ mono = 1 channel.<br>عدد الـ samples = t × fs = 9000 / 0.00525 ≈ 1,714,285.71.<br>Size = 9000 × 190.48 × 8 × 1 ≈ <b>13,714,285.7 bits</b> ≈ 1,714,285.7 B ≈ <b>1674.1 KB</b> ≈ 1.63 MB.<br>(لو أخدت الـ samples الكاملة بس: 1,714,285 samples × 8 = 13,714,280 bits = 1,714,285 B.)` },
    { why: `المجموع = الـ video stream + الـ audio stream؛ الألوان = 24 bits/pixel؛ الـ audio (music) fs = 44.1 kHz؛ stereo = 2 channels (عُرف L3/L4/L8). متراجعة بـ script.`,
      ans: `t = 3 × 3600 = <b>10,800 s</b>.<br><b>الـ Video</b> = W × H × depth × fps × t = 1600 × 800 × 24 × 29 × 10,800 = <b>9,621,504,000,000 bits</b> (1,202,688,000,000 B).<br><b>الـ Audio</b> (stereo audio/music): fs = 44,100 Hz، 2 channels، الـ sample size Q مش معطى → 10,800 × 44,100 × Q × 2 = <b>952,560,000 × Q bits</b>.<br><b>المجموع</b> = 9,621,504,000,000 + 952,560,000·Q bits.<br>مثال Q = 16: audio = 15,240,960,000 bits → المجموع = <b>9,636,744,960,000 bits = 1,204,593,120,000 B</b> ≈ 1121.86 GB.` },
    { why: `عُرف الكورس CR = compressed ÷ original × 100 % مع 1 KB = 1024 B، 1 MB = 1024 KB؛ حوّل الاتنين لنفس الوحدة الأول.`,
      ans: `الـ Compressed = 3 × 1024 × 1024 B = 3,145,728 B = <b>25,165,824 bits</b>.<br>CR = compressed / original × 100 = 25,165,824 / (9,621,504,000,000 + 952,560,000·Q) × 100 %.<br>مثال Q = 16: 25,165,824 / 9,636,744,960,000 × 100 ≈ <b>0.000261 %</b> (بشكل الكتاب original/compressed ≈ 382,930 : 1).` }
  ] }
] }
);
AR.mm.lectures["1"].quiz.push(
  [`صح. ده تعريف L1 (text وgraphics وimages وsound وanimation و/أو video).`, `غلط: ده بالظبط تعريف L1 للـ multimedia application.`],
  [`صح. تعريف L1؛ وبيتميز بالـ processing والـ storage والـ generation والـ manipulation والـ rendition للمعلومات الـ multimedia.`, `غلط: ده تعريف L1 للـ multimedia system.`],
  [`الـ signal هي كمية بتتغير مع الزمن؛ مش هو اسم التعريف ده.`, `صح. تعريف L1 للـ multimedia من ناحية الـ computer system.`, `الـ image ده medium تقليدي واحد، مش مجموعة الـ media.`, `الـ Video ده واحد بس من الـ media اللي في التعريف.`],
  [`غلط: L1 حاطة الـ MPEG video/audio ضمن أمثلة الـ lossy، مع الـ MP3 والـ JPEG.`, `صح. الـ MPEG بيرمي الـ data الأقل أهمية من ناحية الإدراك، فهو lossy.`],
  [`صح. L1 بتدي الـ MP3 كمثال على الـ lossy: الأجزاء الأقل أهمية من ناحية الإدراك بتترمي.`, `غلط: الـ MP3 lossy. أمثلة الـ lossless في L1 هي zip و unix compress.`]
);
AR.mm.lectures["2"].quiz.push(
  [`صح. الـ reference level دايمًا 0 dB: 10·log10(X0/X0) = 10·log10(1) = 0.`, `الـ 60 dB تقريبًا علو الكلام العادي، مش الـ reference.`, `الـ 120 dB هو الـ threshold of pain، مش الـ reference.`, `أعلى بكتير من الـ threshold of pain؛ ومش reference level.`],
  [`غلط: الـ reference هو 0 dB، مش 10 dB (ولا 60 dB).`, `صح. الـ reference level دايمًا 0 dB (X = X0 بيدي log10 1 = 0).`],
  [`الـ Amplitude هو ارتفاع الموجة، مش المكان اللي بتقطع فيه المحور.`, `صح. الـ Phase φ في a·sin(ωt + φ) بيزحلق الموجة على محور الزمن (x).`, `الـ Frequency هي عدد الـ cycles في الثانية؛ مش بتزحلق بداية الموجة.`, `الـ Phase هو اللي بيوصف الـ offset ده، فواحد من الاختيارات صح.`],
  [`صح. في z(t) = a·sin(ωt + φ)، الـ φ هي الزاوية عند t = 0. (ورقة 2021/22 سألت كمان الصيغة المنفية "Phase is not…"، ودي False.)`, `غلط: الـ φ هي بالظبط زاوية الـ sinusoid عند t = 0.`],
  [`صح. FIR: y(n) = Σ b<sub>k</sub>·x(n − k)، feed-forward delays بس.`, `غلط: الـ FIR هو الـ system الأبسط اللي مفيهوش feedback؛ الـ IIR هو اللي فيه feedback.`],
  [`غلط: الـ IIR بيرجّع الـ output تاني من خلال weighted delays (recursive system).`, `صح. الـ IIR فيه feedback loop، وعشان كده الـ impulse response بتاعه مبيخلصش.`],
  [`صح. L2: الـ FIR العام "with N − 1 feed-forward delays": y(n) = Σ<sub>k=0..N−1</sub> b<sub>k</sub>·x(n − k).`, `غلط: ده بالظبط وصف L2 للـ FIR filter العام.`],
  [`صح. SNR = P<sub>signal</sub>/P<sub>noise</sub>.`, `الـ Multimedia هو مجموعة الـ media، مش طرف في power ratio.`, `الـ SNR بيتطبق على أي signal (audio، image، …)؛ "image" محددة زيادة عن اللزوم ومش هي المصطلح.`, `نفس السبب: الـ video نوع واحد من الـ signals، مش المصطلح اللي في التعريف.`]
);
AR.mm.lectures["4"].quiz.push(
  [`غلط: Nyquist بيقول على الأقل الضعف (fs ≥ 2·fmax).`, `صح. "At most" بتعكس Nyquist؛ الـ rate لازم يكون على الأقل 2·fmax.`],
  [`غلط: Nyquist بيستخدم أعلى frequency component.`, `صح. أقل component ملوش علاقة؛ fs ≥ 2·fmax.`],
  [`غلط: L4 بتقول إن الـ sampling frequency مهمة جدًا (critical) (لو واطية أوي → aliasing).`, `صح. L4: "The sampling frequency is critical to the accurate reproduction of a digital version of an analog waveform."`],
  [`دي بتساوي الـ fmax؛ لو عملت sampling بنفس frequency الـ signal هتاخد sample واحد في كل cycle وهتضيع الموجة.`, `صح. 2 × 11,025 = 22,050 Hz.`, `شغالة (مفيش aliasing) بس دي أربع أضعاف الـ fmax، مش الـ Nyquist rate اللي السؤال عايزه.`, `الـ 22.05 kHz موجودة في الاختيارات.`],
  [`بتساوي الـ fmax: sample واحد في كل cycle، والـ sine بيضيع.`, `صح. 2 × 1000 Hz = 2 kHz.`, `أقل من الـ fmax: aliasing جامد.`, `الـ 2 kHz موجودة في الاختيارات.`],
  [`الـ Nyquist محتاج أعلى frequency؛ الـ minimum مش بيحدد الـ rate.`, `ده يبقى 2 × الـ minimum frequency — والـ Nyquist بيستخدم الـ maximum.`, `ملوش أي أساس: ده حتى أقل من الـ minimum frequency المعطاة.`, `صح. لو عارف الـ minimum frequency بس مش هتقدر تجيب الـ Nyquist rate.`],
  [`ده 1/100: استخدم 2 × 50 Hz، اللي هو أقل component.`, `ده 1/125: الـ fmax من غير الـ factor 2 بتاع Nyquist.`, `صح. fmax = 250π/2π = 125 Hz → fs = 250 Hz → T = 1/250 = 0.004 s.`, `ده 1/500: اعتبر الـ 250 (من 250π) هي الـ frequency بالـ Hz، ونسي إن ω = 2πf.`],
  [`صح. f2 = 2500/2 = 1250 Hz = fmax → fs = 2500 Hz → T = 0.4 ms.`, `ده 1/1250: الـ fmax من غير الـ factor 2 بتاع Nyquist.`, `ده 1/5000: اعتبر الـ 2500 بالـ Hz وبعدين ضاعفها، ونسي إن ω = 2πf.`, `ده 1/1500: استخدم أول component (الأقل).`],
  [`صح. fs = 1/0.5 = 2 Hz؛ 19,800 s × 2 × 64 × 2 = 5,068,800 bits = 633,600 B.`, `ده mono (channel واحدة)؛ الـ stereo بيضاعفه.`, `الرقم ده هو الحجم بالـ bits، مش بالـ bytes.`, `استخدم 500 sample في الثانية (اعتبر الـ 500 ms على إنها 500 Hz) بدل fs = 1/0.5 s = 2 Hz.`],
  [`صح. fs = 800 Hz؛ 23,400 s × 800 × 64 × 2 = 2,396,160,000 bits ÷ 8.`, `ده mono؛ الـ stereo فيه 2 channels.`, `ده الحجم بالـ bits.`, `ده استخدم 6.5 دقيقة (390 s) بدل 6.5 ساعة.`],
  [`الـ 4 kHz هي أعلى frequency في الـ speech (fmax)، مش الـ sampling rate.`, `صح. fs = 2 × 4 kHz = 8 kHz (ثابت الكورس للـ speech).`, `دي الـ low-grade audio / أعلى frequency في الـ music.`, `ده الـ rate بتاع الـ music (CD)؛ الـ speech بيستخدم 8 kHz.`],
  [`صح. 9000 s × 8000 × 32 × 2 = 4,608,000,000 bits ÷ 8.`, `ده mono.`, `ده استخدم rate الـ music 44.1 kHz بدل 8 kHz للـ speech.`, `الرقم ده هو الحجم بالـ bits.`]
);
AR.mm.lectures["8"].quiz.push(
  [`غلط: الصور الـ monochrome/grey بتستخدم قيمة واحدة لكل pixel (1 bit أو 1 byte).`, `صح. الـ triplets (R, G, B) للصور الـ true-colour؛ الـ grey هي 2-D array من أرقام مفردة.`],
  [`الـ formats الـ lossless (GIF/LZW، PNG) بترجّع الصورة بالظبط؛ الـ JPEG لأ.`, `صح. الـ JPEG بيستغل حدود الرؤية عند الإنسان وبيرمي data.`, `ده مش التصنيف المستخدم في الكورس.`, `الـ Lossy موجودة في الاختيارات.`],
  [`دي أصغر قيمة في الـ RGB، مش أصغر قيمة في الـ CMY.`, `صح. CMY = (0.75, 0.75, 0.5)؛ K = min = 0.5.`, `دي أكبر قيمة في الـ CMY؛ والـ K هو الـ minimum.`, `الـ 0.5 موجودة في الاختيارات.`],
  [`ده min(RGB)؛ الـ K بيستخدم min(CMY).`, `صح. CMY = (0.5, 0.75, 0.75)؛ K = min = 0.5.`, `ده max(CMY).`, `الـ 0.5 موجودة في الاختيارات.`],
  [`ده الـ R نفسه؛ C = 1 − R.`, `ده 1 − B، اللي هو Y مش C.`, `صح. C = 1 − 0.25 = 0.75.`, `الـ 0.75 موجودة في الاختيارات.`],
  [`ده الـ G نفسه؛ M = 1 − G.`, `ده Y (1 − B).`, `صح. M = 1 − 0.25 = 0.75.`, `الـ 0.75 موجودة في الاختيارات.`],
  [`Y = 1 − B، والـ B قيمتها 0.5 مش 0.75.`, `صح. Y = 1 − 0.5 = 0.5.`, `ده C أو M (1 − 0.25).`, `الـ 0.5 موجودة في الاختيارات.`],
  [`ده الـ CMY مع K = 0؛ لازم تطلّع K = min(CMY) = 0.5.`, `صح. CMY = (0.9, 0.5, 0.6)، K = 0.5، اطرح الـ K.`, `ده طرح min(RGB) = 0.1 بدل K = min(CMY).`, `ده سايب قيم الـ RGB زي ما هي بدل 1 − RGB.`],
  [`صح. Σ|I − I″| = 6.1؛ 6.1 / 16 = 0.38125.`, `ده الـ MSE (مجموع المربعات 3.23 / 16).`, `ده المجموع؛ اقسم على N = 16.`, `ده صح بس في الـ lossless reconstruction.`],
  [`صح. 236,297 / 16.`, `ده المجموع، مش المتوسط.`, `ده قسم على 4 (row واحد) بدل M·N = 16.`, `ده بس في الـ lossless reconstruction.`]
);

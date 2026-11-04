// Practice questions written for Study Deck (not the professor's), per lecture.
window.EXTRA = window.EXTRA || {};
EXTRA.mm = {
 "1": [
  {
   "q": "An uncompressed <b>1024 × 768</b> true-colour (24-bit) image needs how much storage? (1 MB = 1024 × 1024 B)",
   "o": [
    [
     "2.25 MB",
     "1024 × 768 × 3 B = 2,359,296 B ÷ 1,048,576 = 2.25 MB — true colour is 24 bits = 3 bytes per pixel."
    ],
    [
     "0.75 MB",
     "That is 1024 × 768 × 1 B: the 8-bit grey-scale size. True colour needs 3 bytes per pixel, so ×3 was forgotten."
    ],
    [
     "18 MB",
     "That counts 24 bits per pixel as 24 bytes (bits not divided by 8)."
    ],
    [
     "56.25 MB",
     "That multiplies by 25 fps as if it were one second of video; a single still image has no frame rate."
    ]
   ],
   "a": 0
  },
  {
   "q": "About how much storage does <b>2 minutes</b> of uncompressed <b>mono</b> CD-quality audio need?",
   "o": [
    [
     "≈ 5.05 MB",
     "That is only 1 minute of mono audio; the question asks for 2 minutes."
    ],
    [
     "≈ 10.1 MB",
     "44,100 × 2 B × 120 s = 10,584,000 B ≈ 10.1 MB — twice the lecture's 5 MB per mono minute."
    ],
    [
     "≈ 20.2 MB",
     "That would be 2 minutes of stereo; mono has only one channel, so no extra ×2."
    ],
    [
     "≈ 80.7 MB",
     "That is the size in megabits (16 bits per sample not divided by 8), not megabytes."
    ]
   ],
   "a": 1
  },
  {
   "q": "A 512 × 512 <b>colour (24-bit)</b> video is played uncompressed at <b>30 fps</b>. What is its data rate? (1 MB = 1024 × 1024 B)",
   "o": [
    [
     "7.5 MB/s",
     "That uses 1 byte per pixel (the monochrome case); colour needs 3 bytes per pixel."
    ],
    [
     "18.75 MB/s",
     "That uses 25 fps (0.75 × 25); the video here runs at 30 fps."
    ],
    [
     "180 MB/s",
     "That is megabits per second — the 24 bits per pixel were not converted to 3 bytes."
    ],
    [
     "22.5 MB/s",
     "One frame = 512 × 512 × 3 B = 0.75 MB; × 30 fps = 22.5 MB per second."
    ]
   ],
   "a": 3
  },
  {
   "q": "What distinguishes <b>hypermedia</b> from hypertext?",
   "o": [
    [
     "Hypermedia pages are always read in a linear order",
     "Traversal of hypertext/hypermedia is usually non-linear."
    ],
    [
     "Hypermedia was the term Ted Nelson invented in 1965 for linked text",
     "Ted Nelson's 1965 term was hypertext (text with links to other texts)."
    ],
    [
     "Hypermedia is not limited to text: it can link graphics, images and especially continuous media such as sound and video",
     "Correct — the lecture defines hypermedia as hypertext that is not constrained to be text-based."
    ],
    [
     "Hypermedia contains no links; it simply stores several media in one file",
     "Like hypertext, hypermedia is built on links; the difference is the kinds of media linked."
    ]
   ],
   "a": 2
  },
  {
   "q": "Direct transfers to disk, real-time scheduling, fast interrupt processing and I/O streaming are requirements of which desirable multimedia-system feature?",
   "o": [
    [
     "A multimedia-capable file system",
     "That feature is about delivering real-time media streams, e.g. with RAID."
    ],
    [
     "Network support",
     "Network support refers to client-server and distributed systems."
    ],
    [
     "A special operating system",
     "Correct — the lecture lists exactly these four under \"Special operating system\"."
    ],
    [
     "Data representations",
     "That feature concerns file formats that allow real-time compression/decompression."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the list of multimedia system components, HDTV, CD-quality speakers, SVGA/hi-res monitors and colour printers are:",
   "o": [
    [
     "Capture devices",
     "Capture devices are inputs such as cameras, microphones, tablets and digitising hardware."
    ],
    [
     "Storage devices",
     "Storage devices are hard disks, CD-ROMs, DVD-ROMs, etc."
    ],
    [
     "Communication networks",
     "Those are LANs, intranets, the Internet and special high-speed networks."
    ],
    [
     "Display devices",
     "Correct — these are the output/display devices of a multimedia system."
    ]
   ],
   "a": 3
  },
  {
   "q": "Making sure the frames of <b>one video</b> are played in the correct order and time frame is which multimedia challenge?",
   "o": [
    [
     "Synchronisation (inter-media scheduling)",
     "Synchronisation is between different media, e.g. lip-sync of video and audio; here only one medium is involved."
    ],
    [
     "Sequencing within the media",
     "Correct — the lecture's example of sequencing within the media is playing video frames in the correct order/time frame."
    ],
    [
     "Distributed networks",
     "That challenge is about data spread over networks, not frame ordering."
    ],
    [
     "Analog-to-digital conversion",
     "That is a key issue about representing data digitally (sampling), not playback order."
    ]
   ],
   "a": 1
  },
  {
   "q": "According to the lecture's key issues, why is data compression \"usually mandatory\" in multimedia?",
   "o": [
    [
     "Because multimedia data has very large bandwidth and storage requirements",
     "Correct — large data requirements (bandwidth, storage) make compression usually mandatory."
    ],
    [
     "Because analog data cannot be stored without compression",
     "Analog data must be digitised (sampled), which is a separate issue from compression."
    ],
    [
     "Because compression is needed to keep temporal relationships",
     "Temporal relationships are maintained by synchronisation/scheduling, not by compression."
    ],
    [
     "Because lossless compression gives multimedia files zero error",
     "Zero error is a property of lossless coding, but it is not why compression is needed; lossless alone does not shrink MM data enough."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: according to the course summary, <b>lossless</b> compression gives zero error and a <b>high</b> compression ratio.",
   "o": [
    [
     "True",
     "Lossless does give zero error and high quality, but its compression is low."
    ],
    [
     "False",
     "Correct — the summary says lossless = zero error, high quality, LOW compression; lossy gives higher compression with some error."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: raw video is a series of single images, typically at 25, 30 or 50 frames per second.",
   "o": [
    [
     "True",
     "Correct — the lecture describes video this way and says it must usually be compressed."
    ],
    [
     "False",
     "This is exactly how the lecture describes video data."
    ]
   ],
   "a": 0
  },
  {
   "q": "---------- is text which contains links to other texts.",
   "o": [
    [
     "Hypertext",
     "Correct. Hypertext is text which contains links to other texts, a term invented by Ted Nelson around 1965. (L1, Hypertext and hypermedia)"
    ],
    [
     "Hypermedia",
     "Hypermedia is not constrained to text: it links graphics, images, sound and video too."
    ],
    [
     "Multimedia application",
     "A multimedia application uses a collection of multiple media sources; the definition is not about links between texts."
    ],
    [
     "Hot spot",
     "A hot spot is the clickable place inside hypertext that jumps to related material, not the text type itself."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Traversal through hypertext pages is usually linear, like reading a normal book.",
   "o": [
    [
     "True",
     "Normal text is read linear, but hypertext traversal is usually non-linear."
    ],
    [
     "False",
     "Correct. Traversal through hypertext pages is usually non-linear; only normal text is read linear. (L1, Hypertext and hypermedia)"
    ]
   ],
   "a": 1
  },
  {
   "q": "In a hypertext document, the reader is immediately transported to related material by clicking on:",
   "o": [
    [
     "Primitive objects",
     "Primitive objects (lines, polygons, circles) are what graphics are built from."
    ],
    [
     "Hot spots",
     "Correct. By clicking on hot spots in the text, the reader is immediately transported to related material. (L1, HyperText slide)"
    ],
    [
     "Capture devices",
     "Capture devices (camera, microphone, tablet) input media into the system; they are not links in a document."
    ],
    [
     "Display devices",
     "Display devices (HDTV, speakers, monitors) present the media; they do not navigate a document."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: Hypermedia is constrained to be text-based.",
   "o": [
    [
     "True",
     "That describes hypertext; hypermedia is explicitly not constrained to be text-based."
    ],
    [
     "False",
     "Correct. Hypermedia is not constrained to be text-based: it can include graphics, images and especially continuous media such as sound and video. (L1, Hypertext and hypermedia)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of the following is NOT given in the lecture as an example of a hypermedia application?",
   "o": [
    [
     "PowerPoint",
     "PowerPoint is listed as a hypermedia application example."
    ],
    [
     "Adobe Acrobat",
     "Adobe Acrobat (PDF software) is listed as a hypermedia application example."
    ],
    [
     "Unix compress",
     "Correct. Unix compress is given as an example of lossless compression, not a hypermedia application. (L1, Hypertext and hypermedia; Summary)"
    ],
    [
     "Adobe Flash",
     "Adobe Flash is listed as a hypermedia application example."
    ]
   ],
   "a": 2
  },
  {
   "q": "A multimedia system is characterised by the processing, storage, generation, manipulation and ---------- of multimedia information.",
   "o": [
    [
     "Compression",
     "Compression is a key issue (usually mandatory), but it is not in this list of characteristics."
    ],
    [
     "Synchronisation",
     "Synchronisation is one of the challenges (inter-media scheduling), not part of this definition."
    ],
    [
     "Sampling",
     "Sampling belongs to the key issue of digital representation (analog–digital conversion)."
    ],
    [
     "Rendition",
     "Correct. A multimedia system is characterised by the processing, storage, generation, manipulation and rendition of multimedia information. (L1, Multimedia systems)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: The information a multimedia system handles must be represented digitally.",
   "o": [
    [
     "True",
     "Correct. One of the four basic characteristics is that the information handled must be represented digitally. (L1, Multimedia systems)"
    ],
    [
     "False",
     "Digital representation is one of the four basic characteristics, so the statement is true."
    ]
   ],
   "a": 0
  },
  {
   "q": "According to the four characteristics, the interface to the final presentation of media is usually:",
   "o": [
    [
     "Interactive",
     "Correct. The fourth characteristic: the interface to the final presentation of media is usually interactive. (L1, Multimedia systems)"
    ],
    [
     "Linear",
     "Linear describes how normal text is read, not the presentation interface."
    ],
    [
     "Analog",
     "Information in a multimedia system must be digital, not analog."
    ],
    [
     "Distributed",
     "Distributed networks are one of the challenges, not a property of the presentation interface."
    ]
   ],
   "a": 0
  },
  {
   "q": "On the challenges slide, the two top-level challenges are:",
   "o": [
    [
     "Lossless and lossy compression",
     "These are the compression types from the course summary, not the challenges."
    ],
    [
     "Distributed networks and temporal relationship between data",
     "Correct. The slide has two top-level challenges, Distributed Networks and Temporal relationship between data; the rest sit under the temporal relationship. (L1, Challenges and key issues)"
    ],
    [
     "Capture devices and display devices",
     "These are two of the components of a multimedia system."
    ],
    [
     "Processing power and network support",
     "These are desirable features of a multimedia system, not the challenges."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of the following comes under the \"temporal relationship between data\" challenge?",
   "o": [
    [
     "Large storage units of hundreds of Tb",
     "That is the storage and memory desirable feature."
    ],
    [
     "Client-server systems",
     "Client-server systems belong to the network support feature."
    ],
    [
     "Rendering different data at the same time, continuously",
     "Correct. Rendering different data at the same time continuously, sequencing within the media and synchronisation all sit under the temporal relationship. (L1, Challenges and key issues)"
    ],
    [
     "Graphics tablets and VR devices",
     "These are capture devices, a component of the system."
    ]
   ],
   "a": 2
  },
  {
   "q": "The key issue \"data must be represented digitally\" involves:",
   "o": [
    [
     "Lip synchronisation",
     "Lip synchronisation is an example of the inter-media synchronisation challenge."
    ],
    [
     "RAID technology",
     "RAID is special hardware/software for a multimedia-capable file system."
    ],
    [
     "Lossless compression only",
     "Compression is a separate key issue caused by large data requirements, and lossless alone is not enough."
    ],
    [
     "Analog–digital conversion and sampling",
     "Correct. Representing data digitally means analog–digital conversion and sampling. (L1, Challenges and key issues)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Direct-to-disk recording systems are given as an example under which desirable feature?",
   "o": [
    [
     "Efficient and high I/O",
     "Correct. Efficient and high I/O must allow real-time recording as well as playback, e.g. direct-to-disk recording systems. (L1, Desirable features)"
    ],
    [
     "Network support",
     "Network support is about client-server and distributed systems."
    ],
    [
     "Software tools",
     "Software tools are user-friendly tools to handle media and design applications."
    ],
    [
     "Data representations",
     "Data representations are file formats that allow real-time compression/decompression."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Large caches and high-speed buses are listed under the \"storage and memory\" desirable feature.",
   "o": [
    [
     "True",
     "Correct. Storage and memory: large storage units, large memory, large caches and high-speed buses for efficient management. (L1, Desirable features)"
    ],
    [
     "False",
     "The storage and memory feature explicitly requires large caches and high-speed buses."
    ]
   ],
   "a": 0
  },
  {
   "q": "Graphics tablets, tactile sensors, VR devices and digitising hardware are examples of:",
   "o": [
    [
     "Display devices",
     "Display devices are CD-quality speakers, HDTV, SVGA, hi-res monitors and colour printers."
    ],
    [
     "Capture devices",
     "Correct. These are listed with video cameras, microphones, keyboards and mice as capture devices. (L1, Components)"
    ],
    [
     "Storage devices",
     "Storage devices are hard disks, CD-ROMs and DVD-ROMs."
    ],
    [
     "Communication networks",
     "Communication networks are local networks, intranets and the Internet."
    ]
   ],
   "a": 1
  },
  {
   "q": "MPEG/VIDEO/DSP hardware is listed under which component of a multimedia system?",
   "o": [
    [
     "Capture devices",
     "Capture devices input media (cameras, microphones, tablets)."
    ],
    [
     "Display devices",
     "Display devices output media (speakers, HDTV, monitors, printers)."
    ],
    [
     "Computer systems",
     "Correct. Computer systems: multimedia desktop machines, workstations, MPEG/VIDEO/DSP hardware. (L1, Components)"
    ],
    [
     "Storage devices",
     "Storage devices are hard disks, CD-ROMs and DVD-ROMs."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: Text data is temporal, so its timing must be maintained on playback.",
   "o": [
    [
     "True",
     "Text is not temporal; it may only have an implied sequence (e.g. the order of C program statements)."
    ],
    [
     "False",
     "Correct. Text is not temporal, although it may have a natural implied sequence, e.g. HTML format sequence or program statements. (L1, Multimedia data)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Which of the following is NOT one of the primitive objects that graphics are built from?",
   "o": [
    [
     "Polygons",
     "Polygons are one of the listed graphics primitives."
    ],
    [
     "Arcs",
     "Arcs are one of the listed graphics primitives."
    ],
    [
     "Curves",
     "Curves are one of the listed graphics primitives."
    ],
    [
     "Pixels",
     "Correct. Pixels make up bitmap images; graphics are built from lines, polygons, circles, curves and arcs. (L1, Multimedia data)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Which of the following is one of the graphics standards named in the lecture?",
   "o": [
    [
     "GKS",
     "Correct. The graphics standards named are OpenGL, PHIGS and GKS. (L1, Multimedia data)"
    ],
    [
     "RTF",
     "RTF (Rich Text Format) is a text format."
    ],
    [
     "FLAC",
     "FLAC is an audio compression format."
    ],
    [
     "RAID",
     "RAID is hardware/software for a multimedia-capable file system."
    ]
   ],
   "a": 0
  },
  {
   "q": "An image stored at 8 bits per pixel is a:",
   "o": [
    [
     "Black and white image",
     "Black and white images use 1 bit per pixel."
    ],
    [
     "Grey scale or colour-map image",
     "Correct. 8 bits/pixel is used for grey scale or colour-map images. (L1, Multimedia data)"
    ],
    [
     "True colour image",
     "True colour images use 24 bits per pixel."
    ],
    [
     "Vector graphic",
     "Vector graphics store primitives, not bits per pixel."
    ]
   ],
   "a": 1
  },
  {
   "q": "An uncompressed <b>256 × 256</b> true-colour (24-bit) image needs about how much storage? (1 MB = 1024 × 1024 B)",
   "o": [
    [
     "1/16 MB",
     "That is the 8-bit grey scale size: 256 × 256 × 1 B = 65,536 B = 1/16 MB."
    ],
    [
     "1/4 MB",
     "That is the size of a 512 × 512 grey scale image."
    ],
    [
     "3/16 MB",
     "Correct. 256 × 256 × 3 B = 196,608 B = 196,608 / 1,048,576 = 3/16 MB ≈ 0.19 MB. (L1, Multimedia data sizes)"
    ],
    [
     "3/4 MB",
     "That is the size of a 512 × 512 24-bit image (four times as many pixels)."
    ]
   ],
   "a": 2
  },
  {
   "q": "About how much storage does <b>30 seconds</b> of uncompressed <b>stereo</b> CD-quality audio need?",
   "o": [
    [
     "2.5 MB",
     "That would be 30 seconds of mono; stereo doubles it."
    ],
    [
     "10 MB",
     "That is a full minute of stereo, not 30 seconds."
    ],
    [
     "20 MB",
     "That would be two minutes of stereo."
    ],
    [
     "About 5 MB",
     "Correct. 44,100 samples/s × 2 B × 2 channels × 30 s = 5,292,000 B ≈ 5 MB (the same as 1 minute mono). (L1, Multimedia data sizes)"
    ]
   ],
   "a": 3
  },
  {
   "q": "A 512 × 512 monochrome video (0.25 MB per frame) is played uncompressed at <b>50 fps</b>. What is its data rate?",
   "o": [
    [
     "12.5 MB/s",
     "Correct. 50 × 0.25 MB = 12.5 MB per second. (L1, Multimedia data sizes)"
    ],
    [
     "6.25 MB/s",
     "That is the lecture's rate at 25 fps, not 50 fps."
    ],
    [
     "0.25 MB/s",
     "That is the size of one frame, not one second."
    ],
    [
     "37.5 MB/s",
     "That would be a 24-bit colour frame (0.75 MB) at 50 fps."
    ]
   ],
   "a": 0
  },
  {
   "q": "CD-quality audio is sampled at:",
   "o": [
    [
     "24-bit at 96 kHz",
     "That is the audiophile example, higher than CD quality."
    ],
    [
     "16-bit at 44.1 kHz",
     "Correct. CD quality = 16-bit sampling at 44.1 kHz. (L1, Multimedia data)"
    ],
    [
     "8-bit at 8 kHz",
     "This is not the CD-quality figure given in the lecture."
    ],
    [
     "16-bit at 25 kHz",
     "25 is a typical video frame rate, not the CD sampling rate."
    ]
   ],
   "a": 1
  },
  {
   "q": "High Definition video on Blu-ray (up to 1920 × 1080) has about how many pixels per frame?",
   "o": [
    [
     "0.25 Megapixels",
     "0.25 MB is the size of a 512 × 512 monochrome frame."
    ],
    [
     "10 Megapixels",
     "10+ Megapixels is the modern digital camera example."
    ],
    [
     "2 Megapixels",
     "Correct. 1920 × 1080 ≈ 2 Megapixels per frame. (L1, Multimedia data sizes)"
    ],
    [
     "1.24 Megapixels",
     "1.24 MB is the size of one PAL colour frame (720 × 576 × 3 B)."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: JPEG is an example of lossy compression.",
   "o": [
    [
     "True",
     "Correct. Lossy compression throws away perceptually less relevant data; examples are MP3, JPEG and MPEG video/audio. (L1, Summary)"
    ],
    [
     "False",
     "JPEG is listed with MP3 and MPEG as lossy; lossless examples are zip and unix compress."
    ]
   ],
   "a": 0
  },
  {
   "q": "Lossy compression reduces size by throwing away which parts of the data stream?",
   "o": [
    [
     "The perceptually most important parts",
     "Lossy compression keeps the important parts and throws away the less relevant ones, not the reverse."
    ],
    [
     "Nothing: it keeps every bit",
     "Keeping every bit describes lossless compression."
    ],
    [
     "The instructions to synthesise the data",
     "Encoding how to make the data is compression via synthesis."
    ],
    [
     "Non-essential, perceptually less relevant parts",
     "Correct. Lossy compression throws away non-essential (perceptually less relevant) parts, i.e. filters the data. (L1, Summary)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: According to the course summary, lossy compression gives some error and lower quality but higher compression.",
   "o": [
    [
     "True",
     "Correct. Lossy = some error, lower quality, higher compression (e.g. YouTube uses lossy). (L1, Summary)"
    ],
    [
     "False",
     "The summary note says exactly this: lossy has some error, lower quality and higher compression."
    ]
   ],
   "a": 0
  }
 ],
 "2": [
  {
   "q": "A sine wave has a frequency of <b>250 Hz</b>. What is its period?",
   "o": [
    [
     "250 s",
     "That confuses period with frequency; the period is the reciprocal 1/f."
    ],
    [
     "0.025 s",
     "That is 1/40, a decimal-place slip; 1/250 = 0.004."
    ],
    [
     "0.0004 s",
     "0.0004 s is 1/2500, ten times too small (a decimal slip). The period is T = 1/f = 1/250 = 0.004 s."
    ],
    [
     "0.004 s",
     "Correct. The period is the reciprocal of frequency: T = 1/f = 1/250 = 0.004 s = 4 ms (L2, Sine waves)."
    ]
   ],
   "a": 3
  },
  {
   "q": "Using y = A·sin(2π·n·F<sub>w</sub>/F<sub>s</sub>) with F<sub>w</sub> = 500 Hz and F<sub>s</sub> = 4000 Hz, what is y at sample <b>n = 6</b>?",
   "o": [
    [
     "−A",
     "F<sub>w</sub>/F<sub>s</sub> = 1/8, so the angle is 2π·6/8 = 3π/2 and sin(3π/2) = −1, giving −A."
    ],
    [
     "A",
     "sin(π/2) = 1 occurs at n = 2, not n = 6; at n = 6 the wave is at its negative peak."
    ],
    [
     "0",
     "y = 0 at n = 0, 4, 8 (angles 0, π, 2π); n = 6 gives 3π/2."
    ],
    [
     "0.7071A",
     "That is sin(π/4) or sin(3π/4) (n = 1 or n = 3); for n = 6 the sine is −1."
    ]
   ],
   "a": 0
  },
  {
   "q": "A signal's RMS <b>amplitude</b> is 1000 times the noise's RMS amplitude. What is the SNR in dB?",
   "o": [
    [
     "60 dB",
     "For amplitudes use 20·log<sub>10</sub>: 20 × log<sub>10</sub>(1000) = 20 × 3 = 60 dB."
    ],
    [
     "30 dB",
     "That uses 10·log<sub>10</sub>, which is for power ratios; an amplitude ratio needs 20·log<sub>10</sub>."
    ],
    [
     "3 dB",
     "That is just log<sub>10</sub>(1000) without the factor of 20."
    ],
    [
     "1000 dB",
     "The ratio itself is not a dB value; dB is logarithmic."
    ]
   ],
   "a": 0
  },
  {
   "q": "The FIR filter y(n) = ½x(n) + ⅓x(n − 1) + ¼x(n − 2) receives x = 4, 8, 12 followed by zeros. What is <b>y(3)</b>?",
   "o": [
    [
     "9.667",
     "That is y(2) = ½·12 + ⅓·8 + ¼·4 = 6 + 2.667 + 1; the question asks for y(3)."
    ],
    [
     "3",
     "That is y(4) = ¼·12; at n = 3 the ⅓·x(2) term is still present."
    ],
    [
     "0",
     "The input has ended but the delayed samples are still inside the two delay elements, so the output is not yet zero (an FIR response lasts N − 1 samples after the input)."
    ],
    [
     "6",
     "At n = 3, x(3) = 0, so y(3) = ⅓·x(2) + ¼·x(1) = ⅓·12 + ¼·8 = 4 + 2 = 6."
    ]
   ],
   "a": 3
  },
  {
   "q": "A DFT coefficient is F(k) = 5 − 12i. What is its magnitude |F(k)|?",
   "o": [
    [
     "17",
     "That adds the parts (5 + 12); the magnitude is √(F<sub>R</sub>² + F<sub>I</sub>²)."
    ],
    [
     "13",
     "Correct. |F(k)| = √(F<sub>R</sub>² + F<sub>I</sub>²) = √(5² + (−12)²) = √(25 + 144) = √169 = 13 (L2, Magnitude spectrum)."
    ],
    [
     "169",
     "That is |F|² (power); the square root was forgotten."
    ],
    [
     "−7",
     "Magnitude is never negative; 5 − 12 is not the formula."
    ]
   ],
   "a": 1
  },
  {
   "q": "A <b>1st-order</b> Butterworth low-pass filter has cut-off w<sub>0</sub> = 10. What is H(u,v) at (u,v) = (12, 16)?",
   "o": [
    [
     "0",
     "That is what the IDEAL low-pass would give (√400 = 20 > 10); the Butterworth is a smoothed top hat and keeps some high frequencies."
    ],
    [
     "0.5",
     "H = ½ only exactly at the cut-off radius (u² + v² = w<sub>0</sub>²)."
    ],
    [
     "0.2",
     "(u² + v²)/w<sub>0</sub>² = 400/100 = 4; with n = 1, H = 1/(1 + 4) = 0.2."
    ],
    [
     "0.059",
     "That is 1/(1 + 4²) = 1/17, the 2nd-order value; here n = 1."
    ]
   ],
   "a": 2
  },
  {
   "q": "An ideal 2D low-pass filter keeps (u,v) if √(u² + v²) ≤ w<sub>0</sub>. With <b>w<sub>0</sub> = 25</b>, which point is KEPT?",
   "o": [
    [
     "(20, 20)",
     "√(20² + 20²) = √800 ≈ 28.3, which is greater than w<sub>0</sub> = 25, so this point lies outside the circle and is discarded."
    ],
    [
     "(24, 8)",
     "√640 ≈ 25.3 > 25, just outside the circle, so it is discarded."
    ],
    [
     "(15, 20)",
     "√(225 + 400) = √625 = 25 ≤ 25, so it is inside the circle and kept."
    ],
    [
     "(5, 25)",
     "√(5² + 25²) = √650 ≈ 25.5 > 25: just outside the circle, so it is discarded even though v alone equals 25."
    ]
   ],
   "a": 2
  },
  {
   "q": "By sinusoidal decomposition, a <b>150 Hz</b> square(ish) wave is built from sinusoids at:",
   "o": [
    [
     "150, 300, 450 Hz …",
     "That is every harmonic; a square wave has only the odd ones (the lecture's 200 Hz example used 200, 600, 1000 Hz)."
    ],
    [
     "300, 600, 900 Hz …",
     "Those are even multiples and the fundamental is missing."
    ],
    [
     "150, 450, 750 Hz …",
     "A square wave contains the odd multiples of the fundamental: 1×, 3×, 5× … 150 Hz."
    ],
    [
     "150 Hz only",
     "A single 150 Hz component is a pure sine wave, not a square wave."
    ]
   ],
   "a": 2
  },
  {
   "q": "An image was blurred by a known filter H. Using the convolution theorem, how do you <b>remove</b> (compensate for) the blur in the frequency domain?",
   "o": [
    [
     "Multiply the image's FT by H, then take the inverse FT",
     "Multiplying by H applies the blur again (that is how an effect such as reverb is added)."
    ],
    [
     "Divide the image's FT by H, then take the inverse FT (deconvolution)",
     "Correct — multiplying applies an effect, dividing removes it (G./H), followed by the inverse FT."
    ],
    [
     "Add H to the image's FT",
     "Convolution corresponds to multiplication of FTs, so addition does not undo it."
    ],
    [
     "Apply an ideal low-pass filter to the blurred image",
     "A low-pass removes high frequencies and would blur further; deconvolution acts more like a high-pass."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: in MATLAB, applying <code>fft(X)</code> to a matrix X computes its 2D Fourier transform.",
   "o": [
    [
     "True",
     "Fft on a matrix works column by column (1D per column)."
    ],
    [
     "False",
     "Correct — fft(X) on a matrix computes a 1D FT per column, NOT the 2D FT; fft2(X) is used for 2D."
    ]
   ],
   "a": 1
  },
  {
   "q": "A sine wave has a frequency of <b>20 Hz</b>. What is its period?",
   "o": [
    [
     "0.05 s",
     "Correct. T = 1/f = 1/20 = 0.05 s. (L2, Waveforms)"
    ],
    [
     "20 s",
     "That confuses the period with the frequency; T = 1/f."
    ],
    [
     "0.5 s",
     "That would be the period of a 2 Hz wave."
    ],
    [
     "0.02 s",
     "That would be the period of a 50 Hz wave."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: Wavelength is directly proportional to frequency.",
   "o": [
    [
     "True",
     "Wavelength varies as 1/frequency, so it is inversely proportional."
    ],
    [
     "False",
     "Correct. Wavelength is inversely proportional to frequency: higher frequency means shorter wavelength. (L2, Waveforms)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Using y = A·sin(2π·n·F<sub>w</sub>/F<sub>s</sub>) with F<sub>w</sub> = 1000 Hz and F<sub>s</sub> = 8000 Hz, what is y at sample <b>n = 3</b>?",
   "o": [
    [
     "A",
     "y = A happens at n = 2 (angle π/2)."
    ],
    [
     "0.7071A",
     "Correct. y = A·sin(2π·3/8) = A·sin(3π/4) = 0.7071A. (L2, Waveforms)"
    ],
    [
     "0",
     "y = 0 happens at n = 4 (angle π)."
    ],
    [
     "−0.7071A (a negative value)",
     "sin(3π/4) is positive; −0.7071A happens at n = 5 (angle 5π/4)."
    ]
   ],
   "a": 1
  },
  {
   "q": "A 500 Hz wave is sampled at F<sub>s</sub> = 8000 Hz. How many samples does one cycle take?",
   "o": [
    [
     "8",
     "That is for the lecture example 1000 Hz at 8000 Hz (ratio 1/8)."
    ],
    [
     "500",
     "That is the wave frequency, not samples per cycle."
    ],
    [
     "16",
     "Correct. F<sub>w</sub>/F<sub>s</sub> = 500/8000 = 1/16, so one cycle takes 16 samples. (L2, Waveforms)"
    ],
    [
     "4",
     "That would be a 2000 Hz wave at 8000 Hz."
    ]
   ],
   "a": 2
  },
  {
   "q": "A sine wave is described by which three quantities?",
   "o": [
    [
     "Delay, multiplication and summation",
     "These are the three building blocks of a signal flow graph."
    ],
    [
     "Period, wavelength and sample index",
     "Period and wavelength follow from frequency; the sample index n is a variable of the sampled formula."
    ],
    [
     "Magnitude, SNR and decibels",
     "These are measures of level and noise, not the description of a sine wave."
    ],
    [
     "Amplitude, frequency and phase",
     "Correct. A sine wave is described by amplitude, frequency and phase: z(t) = a·sin(ωt + φ). (L2, Waveforms)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: A cosine is a sine wave 90° out of phase.",
   "o": [
    [
     "True",
     "Correct. The lecture states that a cosine is a sine wave 90° out of phase. (L2, Waveforms)"
    ],
    [
     "False",
     "The lecture says exactly this: a cosine is a sine 90° out of phase."
    ]
   ],
   "a": 0
  },
  {
   "q": "A sound has <b>0.01</b> times the power of the reference level. What is its level in dB?",
   "o": [
    [
     "−20 dB",
     "Correct. 10·log<sub>10</sub>(0.01) = 10 × (−2) = −20 dB; it is below the reference, so negative. (L2, Decibels)"
    ],
    [
     "20 dB (positive)",
     "The power is below the reference (X &lt; X<sub>0</sub>), so the dB value must be negative."
    ],
    [
     "−40 dB",
     "That uses 20·log, which is for amplitude ratios, not power."
    ],
    [
     "−2 dB",
     "That forgets the factor 10 in front of the log."
    ]
   ],
   "a": 0
  },
  {
   "q": "The signal <b>power</b> is 10<sup>4</sup> times the noise power. What is the SNR in dB?",
   "o": [
    [
     "80 dB",
     "That uses 20·log, which applies to amplitude ratios, not power ratios."
    ],
    [
     "40 dB",
     "Correct. SNR<sub>dB</sub> = 10·log<sub>10</sub>(10<sup>4</sup>) = 10 × 4 = 40 dB. (L2, SNR)"
    ],
    [
     "4 dB",
     "That forgets the factor 10 in front of the log."
    ],
    [
     "10,000 dB",
     "dB is logarithmic; the ratio itself is not the dB value."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: When the measured power X is less than the reference X<sub>0</sub>, the dB value is positive.",
   "o": [
    [
     "True",
     "X &lt; X<sub>0</sub> gives a ratio below 1, whose log is negative."
    ],
    [
     "False",
     "Correct. X &lt; X<sub>0</sub> gives a negative dB value (power decrease); only X &gt; X<sub>0</sub> gives positive dB. (L2, Decibels)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Using the lecture's \"6 dB per bit\" rule for linear PCM, what is the dynamic range of <b>12-bit</b> audio?",
   "o": [
    [
     "72 dB",
     "That multiplies all 12 bits by 6; the first bit only gives residual quantisation noise."
    ],
    [
     "42 dB",
     "That is the 8-bit figure (7 × 6)."
    ],
    [
     "66 dB",
     "Correct. The first bit gives quantisation noise, so 11 × 6 = 66 dB. (L2, Digital noise)"
    ],
    [
     "90 dB",
     "That is the 16-bit figure (15 × 6)."
    ]
   ],
   "a": 2
  },
  {
   "q": "The human ear is most sensitive in which range?",
   "o": [
    [
     "20 to 40 Hz",
     "This is not the range given; the most sensitive range is the speech range in kHz."
    ],
    [
     "44.1 to 96 kHz",
     "These are sampling rates (CD and audiophile), not the ear's sensitivity range."
    ],
    [
     "8 to 16 kHz",
     "This is not the range given in the lecture."
    ],
    [
     "2 to 4 kHz",
     "Correct. The ear is most sensitive between 2 and 4 kHz (speech), so frequency weighting factors these more heavily. (L2, Decibels)"
    ]
   ],
   "a": 3
  },
  {
   "q": "In a signal flow graph, a block labelled <b>T</b> represents:",
   "o": [
    [
     "A delay of one sampling interval",
     "Correct. A T block delays by one sampling interval: y(n) = x(n − 1). (L2, Signal flow graphs)"
    ],
    [
     "A multiplication by a coefficient",
     "Multiplication is drawn as a circle with ×."
    ],
    [
     "A summation of two signals",
     "Addition is drawn as a circle with +."
    ],
    [
     "The period of the wave",
     "T is also the symbol for the period, but in a signal flow graph the T block is a delay."
    ]
   ],
   "a": 0
  },
  {
   "q": "Three T (delay) blocks connected in series give:",
   "o": [
    [
     "y(n) = 3x(n)",
     "Delays shift in time; they do not multiply the signal."
    ],
    [
     "y(n) = x(n − 3)",
     "Correct. Each T block delays by one sampling interval; two give x(n − 2), so three give x(n − 3). (L2, Signal flow graphs)"
    ],
    [
     "y(n) = x(n + 3) (an advance)",
     "A delay looks back to earlier samples, so the index is n − 3, not n + 3."
    ],
    [
     "y(n) = x(n − 1)",
     "That is a single T block; three in series delay by three sampling intervals."
    ]
   ],
   "a": 1
  },
  {
   "q": "The filter y(n) = ½x(n) + ⅓x(n − 1) + ¼x(n − 2) receives x = 6, 12 followed by zeros. What is <b>y(1)</b>?",
   "o": [
    [
     "6",
     "That is only ½·12; it forgets the ⅓·x(0) term."
    ],
    [
     "10",
     "This does not follow from the coefficients ½ and ⅓."
    ],
    [
     "8",
     "Correct. y(1) = ½·12 + ⅓·6 = 6 + 2 = 8. (L2, Signal flow graphs)"
    ],
    [
     "7.5",
     "That uses ¼ for x(0) instead of ⅓; ¼ multiplies x(n − 2)."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: The impulse response of y(n) = ½x(n) + ⅓x(n − 1) + ¼x(n − 2) never becomes zero.",
   "o": [
    [
     "True",
     "This filter has no feedback, so after ½, ⅓, ¼ the output is 0: its impulse response is finite."
    ],
    [
     "False",
     "Correct. The impulse response is ½, ⅓, ¼, 0, 0, … (finite); never reaching zero is the IIR case. (L2, Signal flow graphs)"
    ]
   ],
   "a": 1
  },
  {
   "q": "The IIR filter y(n) = x(n) + 0.5y(n − 1) receives x = 4, 0, 0, … What is <b>y(2)</b>?",
   "o": [
    [
     "0",
     "The feedback keeps the output going; it does not drop to 0 after the input stops."
    ],
    [
     "2",
     "That is y(1) = 0 + 0.5 × 4."
    ],
    [
     "0.5",
     "That is the value for an impulse input of 1, not 4."
    ],
    [
     "1",
     "Correct. y(0) = 4, y(1) = 0.5 × 4 = 2, y(2) = 0.5 × 2 = 1. (L2, IIR and FIR)"
    ]
   ],
   "a": 3
  },
  {
   "q": "Which of the following equations describes an FIR filter?",
   "o": [
    [
     "y(n) = b<sub>0</sub>x(n) + b<sub>1</sub>x(n − 1) + b<sub>2</sub>x(n − 2)",
     "Correct. An FIR output is a weighted sum of the current and delayed inputs only, with no feedback. (L2, IIR and FIR)"
    ],
    [
     "y(n) = x(n) − a<sub>1</sub>y(n − 1) − a<sub>2</sub>y(n − 2)",
     "This feeds past outputs back, so it is the simple IIR filter."
    ],
    [
     "y(n) = x(n) + 0.5y(n − 1)",
     "This uses the previous output, so it is recursive (the lecture's IIR example)."
    ],
    [
     "y(n) = x(n) − Σ a<sub>k</sub>·y(n − k)",
     "This is the general IIR equation (feedback of past outputs)."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: In MATLAB <code>filter(B,A,X)</code>, the vector B holds the feedback coefficients.",
   "o": [
    [
     "True",
     "B = {b<sub>k</sub>} are the feed-forward coefficients; A = {a<sub>k</sub>} are the feedback ones."
    ],
    [
     "False",
     "Correct. A = {a<sub>k</sub>} holds the feedback coefficients and B = {b<sub>k</sub>} the feed-forward ones. (L2, IIR and FIR)"
    ]
   ],
   "a": 1
  },
  {
   "q": "In the broad sense of filtering, equalisation (EQ) is an example of:",
   "o": [
    [
     "Removing the selected data",
     "Removal examples are low-pass and high-pass filtering."
    ],
    [
     "Attenuating (enhancing or diminishing) the selected data",
     "Correct. Attenuate it: enhance or diminish, e.g. equalisation and effects/synthesis. (L2, Filtering)"
    ],
    [
     "Compression via synthesis",
     "Compression via synthesis is a Lecture 1 idea (MIDI, vector graphics), not a filtering type."
    ],
    [
     "Sampling the data",
     "Sampling converts analog to digital; it is not one of the three filtering actions."
    ]
   ],
   "a": 1
  },
  {
   "q": "In an image, large <b>high-frequency</b> components indicate:",
   "o": [
    [
     "One simple object filling the image",
     "That is the case of large low-frequency components (large-scale features dominate)."
    ],
    [
     "A purely real Fourier transform",
     "A real FT comes from an even function (like the top hat), not from high frequencies."
    ],
    [
     "Data changing rapidly over short distances",
     "Correct. Large high-frequency components mean data changing rapidly over short distances, e.g. a page of text (noise also gives high frequencies). (L2, Frequency domain)"
    ],
    [
     "A single peak at 8 Hz",
     "That is the spectrum of an 8 Hz sine wave."
    ]
   ],
   "a": 2
  },
  {
   "q": "With f<sub>s</sub> = 16000 Hz and an N = 512 point DFT, which frequency does sample point <b>k = 64</b> represent?",
   "o": [
    [
     "64 Hz",
     "That uses k itself as the frequency; it must be multiplied by f<sub>s</sub>/N."
    ],
    [
     "1000 Hz",
     "That is the lecture example (8000 Hz, N = 256, k = 32), not these values."
    ],
    [
     "31.25 Hz",
     "That is only the step size f<sub>s</sub>/N, not the frequency of k = 64."
    ],
    [
     "2000 Hz",
     "Correct. f<sub>k</sub> = k·f<sub>s</sub>/N = 64 × 16000/512 = 64 × 31.25 = 2000 Hz. (L2, DFT and spectra)"
    ]
   ],
   "a": 3
  },
  {
   "q": "A DFT coefficient is F(k) = 2 + 2i. What is its phase φ?",
   "o": [
    [
     "45°",
     "Correct. φ = arctan(F<sub>I</sub>/F<sub>R</sub>) = arctan(2/2) = arctan(1) = 45°. (L2, DFT and spectra)"
    ],
    [
     "90°",
     "90° would need a purely imaginary value (F<sub>R</sub> = 0)."
    ],
    [
     "2.83",
     "That is the magnitude √(2² + 2²) ≈ 2.83, not the phase."
    ],
    [
     "53.13°",
     "That is the phase of the lecture example 3 + 4i."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: In the 1D DFT, the 1/N factor in front appears on both the forward and the inverse transforms.",
   "o": [
    [
     "True",
     "The 1/N in front is on the forward transform only (for square 2D images it is rebalanced as 1/N on both)."
    ],
    [
     "False",
     "Correct. Compared with the continuous FT, the DFT has 1/N inside the exponent and 1/N in front of the forward transform only. (L2, DFT and spectra)"
    ]
   ],
   "a": 1
  },
  {
   "q": "A spectrogram is produced by splitting the signal into segments and applying a windowed:",
   "o": [
    [
     "Butterworth filter",
     "Butterworth is a low-pass filter shape, not the transform used for a spectrogram."
    ],
    [
     "Short-Time Fourier Transform (STFT)",
     "Correct. A spectrogram uses a windowed STFT; Blackman, Hamming or Hanning windows reduce leakage. (L2, DFT and spectra)"
    ],
    [
     "Inverse FFT",
     "The inverse FFT goes back from frequency to time; the spectrogram analyses time segments into frequency."
    ],
    [
     "Impulse response",
     "An impulse response describes a filter in the temporal domain, not a time-frequency analysis."
    ]
   ],
   "a": 1
  },
  {
   "q": "A <b>2nd-order</b> Butterworth low-pass filter is evaluated at <b>three times</b> its cut-off radius (u² + v² = 9w<sub>0</sub>²). What is H?",
   "o": [
    [
     "1/17",
     "That is 2nd order at twice the cut-off: 1/(1 + 4²)."
    ],
    [
     "1/2",
     "H = 1/2 only exactly at the cut-off."
    ],
    [
     "1/82",
     "Correct. H = 1/(1 + 9²) = 1/(1 + 81) = 1/82 ≈ 0.012. (L2, Filtering in the frequency domain)"
    ],
    [
     "1/10",
     "That forgets the order n = 2: 1/(1 + 9) is the 1st-order value."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which filter <b>amplifies</b> a narrow band of frequencies around u<sub>0</sub>?",
   "o": [
    [
     "Notch",
     "A notch filter attenuates a narrow band around u<sub>0</sub>, the opposite."
    ],
    [
     "Band-reject",
     "A band-reject filter attenuates the band u<sub>0</sub> to u<sub>1</sub>."
    ],
    [
     "High-pass",
     "A high-pass filter selects frequencies above u<sub>0</sub>."
    ],
    [
     "Resonator",
     "Correct. A resonator amplifies a narrow band around u<sub>0</sub>. (L2, Filtering in the frequency domain)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: Lowering the cut-off of a low-pass filter removes more noise but blurs the image more.",
   "o": [
    [
     "True",
     "Correct. A lower cut-off removes more noise but also removes more high-frequency edge detail, so it blurs more. (L2, Filtering in the frequency domain)"
    ],
    [
     "False",
     "The lecture says a lower cut-off removes more noise but blurs more, so the statement is true."
    ]
   ],
   "a": 0
  },
  {
   "q": "For the convolution of the top hat f (1 for |α| ≤ 1) with g = ½ on 0 ≤ α ≤ 1, what is the result at <b>x = −0.6</b>?",
   "o": [
    [
     "0.5",
     "½ is the value only for 0 ≤ x ≤ 1, where g fully overlaps f."
    ],
    [
     "0.2",
     "Correct. For −1 ≤ x ≤ 0 the result is (x + 1)/2 = (−0.6 + 1)/2 = 0.2. (L2, Convolution)"
    ],
    [
     "0.7",
     "That drops the minus sign of x and uses 1 − x/2 = 1 − 0.3; that formula is valid only for 1 ≤ x ≤ 2."
    ],
    [
     "0",
     "There is still overlap at x = −0.6; the result is 0 only for x ≤ −1 or x ≥ 2."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: The Fourier transform of the top hat is purely real because the top hat is an even function.",
   "o": [
    [
     "True",
     "Correct. The sinc result sin(2πu)/(πu) is purely real because f is even (symmetric in x and −x). (L2, FT formulas)"
    ],
    [
     "False",
     "The lecture explains the sinc is purely real exactly because the top hat is even."
    ]
   ],
   "a": 0
  },
  {
   "q": "To apply a reverb effect to audio in the frequency domain using the convolution theorem, you:",
   "o": [
    [
     "Divide the audio's FT by the effect's FT",
     "Dividing removes or compensates for an effect (deconvolution)."
    ],
    [
     "Add the two Fourier transforms",
     "The theorem gives a product, not a sum."
    ],
    [
     "Multiply the audio's FT by the effect's FT, then inverse FT",
     "Correct. FT of f * g = F(u)·G(u), so applying an effect such as reverb is a multiplication, then an inverse FT. (L2, Convolution)"
    ],
    [
     "Take only the magnitude spectrum of the audio",
     "The magnitude spectrum |F(k)| analyses the signal; it does not apply an effect."
    ]
   ],
   "a": 2
  }
 ],
 "3": [
  {
   "q": "How much storage does an uncompressed <b>800 × 600 grey-scale</b> (8-bit) image need? (1 KB = 1024 B)",
   "o": [
    [
     "1406.25 KB",
     "That is the 24-bit (3 bytes per pixel) size; grey-scale uses 1 byte per pixel."
    ],
    [
     "468.75 KB",
     "800 × 600 × 8 / 8 = 480,000 B ÷ 1024 = 468.75 KB."
    ],
    [
     "3750 KB",
     "That divides bits by 1024 without first converting to bytes (forgot ÷ 8)."
    ],
    [
     "58.59 KB",
     "That is the 1 bit per pixel (black-and-white) size."
    ]
   ],
   "a": 1
  },
  {
   "q": "What is the uncompressed data rate of <b>640 × 480</b>, 24-bit colour video at <b>30 fps</b>? (1 MB = 1024 × 1024 B)",
   "o": [
    [
     "≈ 8.79 MB/s",
     "That uses 1 byte per pixel; 24-bit colour is 3 bytes per pixel."
    ],
    [
     "≈ 26.37 MB/s",
     "Frame = 640 × 480 × 3 = 921,600 B; × 30 = 27,648,000 B/s ÷ 1,048,576 ≈ 26.37 MB/s (data rate = frame size × fps)."
    ],
    [
     "≈ 21.97 MB/s",
     "21.97 MB/s comes from using 25 fps: 921,600 × 25 = 23,040,000 B ÷ 1,048,576. The question says 30 fps, giving ≈ 26.37 MB/s."
    ],
    [
     "≈ 210.94 MB/s",
     "That is megabits per second (24 bits not divided by 8)."
    ]
   ],
   "a": 1
  },
  {
   "q": "Using audio size = sample rate × bits per sample × channels × seconds, how big is <b>30 s</b> of <b>stereo</b>, 16-bit audio at <b>22.05 kHz</b>? (1 KB = 1024 B)",
   "o": [
    [
     "≈ 1291.99 KB",
     "That is the mono size — the ×2 for stereo was forgotten."
    ],
    [
     "≈ 20,671.88 KB",
     "That divides bits by 1024 without first dividing by 8 to get bytes."
    ],
    [
     "≈ 2583.98 KB",
     "22,050 × 16 × 2 × 30 = 21,168,000 bits = 2,646,000 B ÷ 1024 ≈ 2583.98 KB."
    ],
    [
     "≈ 5167.97 KB",
     "That uses 44.1 kHz, not the stated 22.05 kHz."
    ]
   ],
   "a": 2
  },
  {
   "q": "A thermocouple, a microphone and a camera are all examples of:",
   "o": [
    [
     "Transducers — sensors that convert what they sense into electrical signals",
     "Correct — temperature, acoustic and light sensors respectively."
    ],
    [
     "Analog-to-digital converters",
     "An ADC is separate hardware (e.g. a sound card) that samples the sensor's analog signal."
    ],
    [
     "Digital-to-analog converters",
     "A DAC produces an analog signal for playback devices such as loudspeakers."
    ],
    [
     "Anti-aliasing filters",
     "Those are analog conditioning filters at the ADC input, not sensors."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the analog → digital → analog pipeline, why is the DAC output passed through a <b>low-pass filter</b>?",
   "o": [
    [
     "To quantise the signal into discrete levels",
     "Quantisation happens in the ADC, at the input side."
    ],
    [
     "To prevent aliasing before the signal is sampled",
     "That is the job of the anti-aliasing filter at the INPUT, before the ADC."
    ],
    [
     "To compress the signal for storage",
     "Low-pass filtering here reconstructs a smooth analog signal; it is not storage compression."
    ],
    [
     "To remove the aliases (images) created by sampling",
     "Correct — the lecture says the output must be low-pass filtered to remove the aliases from the sampling."
    ]
   ],
   "a": 3
  },
  {
   "q": "According to the course summary, which pair correctly describes the two steps of analog-to-digital conversion?",
   "o": [
    [
     "Sampling makes the signal discrete in time; quantisation turns the samples into discrete digital values",
     "Correct. Sampling makes the signal discrete in time (values at regular instants), and quantisation maps each sample to a discrete digital value: digital = sampling + quantisation (L3, ADC and DAC)."
    ],
    [
     "Sampling turns values into binary codes; quantisation picks the time instants",
     "The two roles are swapped: sampling picks the time instants, and quantisation turns each sampled value into a discrete level (binary code)."
    ],
    [
     "Sampling and quantisation both mean compressing the signal",
     "They digitise the signal; compression is a later, separate step."
    ],
    [
     "Quantisation happens in the DAC; sampling happens in the ADC",
     "Both sampling and quantisation are done by the ADC."
    ]
   ],
   "a": 0
  },
  {
   "q": "Why do the different media in a multimedia application often need <b>synchronisation</b>?",
   "o": [
    [
     "Because all multimedia data is static (time independent)",
     "Continuous media (audio, video, animation) are time dependent; static data would not need timing."
    ],
    [
     "Because text is stored at 1 byte per character",
     "Character size has nothing to do with synchronisation."
    ],
    [
     "Because the data usually has temporal relationships as an integral property",
     "Correct — the lecture states that multimedia data usually has temporal relationships, so the media may need synchronisation."
    ],
    [
     "Because graphics must be digitised before display",
     "Computer-made graphics do not need digitising at all."
    ]
   ],
   "a": 2
  },
  {
   "q": "How is printed text usually turned into digital text?",
   "o": [
    [
     "Key-frame interpolation (tweening)",
     "Tweening is a 2D animation technique."
    ],
    [
     "An anti-aliasing filter followed by a DAC",
     "A DAC converts digital to analog, the opposite direction."
    ],
    [
     "Recording it with a microphone at 44.1 kHz",
     "That captures audio, not printed text."
    ],
    [
     "Scanning with OCR (optical character recognition)",
     "Correct — printed (and some handwritten) text can be scanned via OCR."
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: graphics animation is compact, which makes it suitable for network transmission.",
   "o": [
    [
     "True",
     "Correct — the lecture notes that graphics animation (a sequence of slightly changed graphics) is compact, so it suits network transmission."
    ],
    [
     "False",
     "The lecture says exactly this: animation built from graphics is compact and suitable for networks."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: spreadsheets are always stored as binary files.",
   "o": [
    [
     "True",
     "The lecture says spreadsheets may be text (CSV) or binary."
    ],
    [
     "False",
     "Correct — spreadsheets may be stored as text (CSV) or in a binary format."
    ]
   ],
   "a": 1
  },
  {
   "q": "……… media are time independent; examples are text, single images and graphics.",
   "o": [
    [
     "Static (discrete)",
     "Correct. Static or discrete media do not depend on time. (L3, Static (discrete) vs continuous media)"
    ],
    [
     "Continuous",
     "Continuous media are time dependent: video, animation and audio."
    ],
    [
     "Analog",
     "Analog describes continuous signals that must be digitised, not a media class by time."
    ],
    [
     "Temporal",
     "Temporal relationships belong to time-dependent media, the opposite of this definition."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: animation is an example of static (discrete) media because it is made of graphics.",
   "o": [
    [
     "True",
     "Animation is listed with video and audio as continuous (time-dependent) media."
    ],
    [
     "False",
     "Correct. Animation is a sequence of graphics over time, so it is continuous media. (L3, Static (discrete) vs continuous media)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Which pair are BOTH continuous (time-dependent) media?",
   "o": [
    [
     "Text and graphics",
     "Both are static (discrete) media."
    ],
    [
     "Video and audio",
     "Correct. Both are listed as continuous media, together with animation. (L3, Static (discrete) vs continuous media)"
    ],
    [
     "Audio and a single image",
     "A single image is static media; only audio is continuous."
    ],
    [
     "Graphics and normal data",
     "Both are static, time-independent media."
    ]
   ],
   "a": 1
  },
  {
   "q": "Multimedia systems deal with the generation, manipulation, storage, presentation and ……… of information.",
   "o": [
    [
     "compression",
     "Compression is a later theme of the course, not one of the five things listed."
    ],
    [
     "quantisation",
     "Quantisation is a step of A-to-D conversion, not one of the five."
    ],
    [
     "communication",
     "Correct. Communication is the fifth item in the lecture's list. (L3, What multimedia systems deal with)"
    ],
    [
     "synchronisation",
     "Synchronisation is a need of the data (temporal relationships), not one of the five listed activities."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: most multimedia data is small, so the different media rarely need synchronisation.",
   "o": [
    [
     "True",
     "The lecture says the opposite on both points."
    ],
    [
     "False",
     "Correct. Most of the data is large, and media may need synchronisation because of temporal relationships. (L3, What multimedia systems deal with)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Which transducer converts temperature into an electrical signal?",
   "o": [
    [
     "Microphone",
     "A microphone senses acoustic signals (sound)."
    ],
    [
     "Camera",
     "A camera senses light."
    ],
    [
     "Sound card",
     "A sound card is an ADC, not a sensor."
    ],
    [
     "Thermocouple",
     "Correct. The lecture lists thermocouples for temperature. (L3, Analog and digital signals, ADC and DAC)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: digital signals are continuous signals that must be converted before a computer can process them.",
   "o": [
    [
     "True",
     "That describes analog signals; digital signals are discrete."
    ],
    [
     "False",
     "Correct. Analog signals are continuous and must be digitised; digital signals are discrete and the computer deals with them directly. (L3, Analog and digital signals, ADC and DAC)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Before playback, a DAC may receive a digital signal that was modified, for example by:",
   "o": [
    [
     "A volume change or equalisation",
     "Correct. The lecture gives volume change and equalisation as examples. (L3, Analog and digital signals, ADC and DAC)"
    ],
    [
     "Anti-aliasing filtering",
     "The anti-aliasing filter works on the analog input before the ADC."
    ],
    [
     "OCR scanning",
     "OCR turns printed text into digital text; it is not a playback modification."
    ],
    [
     "Tweening",
     "Tweening is key-frame interpolation in 2D animation."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of these is given in the lecture as an analog output device fed by a DAC?",
   "o": [
    [
     "Microphone",
     "A microphone is an input sensor that feeds an ADC."
    ],
    [
     "RGB monitor",
     "Correct. The DAC outputs an analog signal for a loudspeaker or an RGB monitor. (L3, Analog and digital signals, ADC and DAC)"
    ],
    [
     "Thermocouple",
     "A thermocouple is an input transducer for temperature."
    ],
    [
     "Sound card",
     "The sound card is the lecture's example of an ADC."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: quantisation is the step that makes a signal discrete in time.",
   "o": [
    [
     "True",
     "Sampling makes the signal discrete in time; quantisation makes the values discrete."
    ],
    [
     "False",
     "Correct. Sampling is continuous → discrete in time; quantisation turns the samples into digital values. (L3, Analog and digital signals, ADC and DAC)"
    ]
   ],
   "a": 1
  },
  {
   "q": "Which is the correct order of the analog-to-digital-to-analog pipeline?",
   "o": [
    [
     "ADC → Analog conditioning → Digital processing → Analog conditioning → DAC",
     "Analog conditioning (anti-aliasing) must come before the ADC, and the DAC comes before the output filter."
    ],
    [
     "Analog conditioning → DAC → Digital processing → ADC → Analog conditioning",
     "The ADC and DAC are swapped: the input is converted by the ADC."
    ],
    [
     "Analog conditioning → ADC → Digital processing → DAC → Analog conditioning",
     "Correct. This is the lecture's pipeline. (L3, Analog-to-digital-to-analog pipeline)"
    ],
    [
     "Digital processing → ADC → Analog conditioning → DAC",
     "Digital processing can only happen after the ADC has digitised the signal."
    ]
   ],
   "a": 2
  },
  {
   "q": "After digital processing, the DAC converts discrete levels into:",
   "o": [
    [
     "Binary numbers",
     "Producing binary numbers is the ADC's job."
    ],
    [
     "Quantised samples",
     "Quantising into discrete levels is done by the ADC at the input."
    ],
    [
     "Key frames",
     "Key frames belong to animation (tweening), not the DAC."
    ],
    [
     "Continuous voltages or currents",
     "Correct. The DAC turns discrete levels back into continuous voltages or currents. (L3, Analog-to-digital-to-analog pipeline)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: anti-aliasing filters are a major part of the analog conditioning stage at the input.",
   "o": [
    [
     "True",
     "Correct. They are placed at the input to remove frequencies above the sampling limit. (L3, Analog-to-digital-to-analog pipeline)"
    ],
    [
     "False",
     "The lecture calls them a major part of analog conditioning, at the input."
    ]
   ],
   "a": 0
  },
  {
   "q": "According to the lecture, printed images can be digitised by:",
   "o": [
    [
     "Flatbed scanning",
     "Correct. Printed images can be flatbed scanned. (L3, Capturing and storing each medium)"
    ],
    [
     "Electronic pen sensing",
     "Electronic pen sensing digitises handwriting."
    ],
    [
     "OCR",
     "OCR is for printed (and some handwritten) text."
    ],
    [
     "A DAC",
     "A DAC converts digital back to analog for playback."
    ]
   ],
   "a": 0
  },
  {
   "q": "A plain ASCII text file holds 3,000 characters. Using the lecture's rule, how big is it?",
   "o": [
    [
     "24,000 B",
     "24,000 is the size in bits (3,000 × 8), not bytes."
    ],
    [
     "3,000 B",
     "Correct. ASCII uses 1 byte per character, so 3,000 × 1 = 3,000 bytes. (L3, Capturing and storing each medium)"
    ],
    [
     "375 B",
     "This divides by 8 as if each character were 1 bit."
    ],
    [
     "6,000 B",
     "Two bytes per character would be Unicode-like; ASCII is 1 byte."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: graphics are selectable and editable, unlike images.",
   "o": [
    [
     "True",
     "Correct. Graphics are built from primitives, so they are selectable and editable; in images usually only pixels can be edited. (L3, Capturing and storing each medium)"
    ],
    [
     "False",
     "The lecture says graphics are selectable and editable, unlike images."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which of the following is NOT one of the graphics primitives listed in the lecture?",
   "o": [
    [
     "Polygons",
     "Polygons are a listed primitive."
    ],
    [
     "Arcs",
     "Arcs are a listed primitive."
    ],
    [
     "Pixels",
     "Correct. Pixels make up bitmap images; graphics primitives are lines, polygons, circles, curves and arcs. (L3, Capturing and storing each medium)"
    ],
    [
     "Curves",
     "Curves are a listed primitive."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which program is given in the lecture as an example of 3D animation?",
   "o": [
    [
     "Flash",
     "Flash is the lecture's 2D animation example (tweening)."
    ],
    [
     "Photoshop",
     "Photoshop is for editing pixels of images."
    ],
    [
     "Illustrator",
     "Illustrator is a graphics editor."
    ],
    [
     "Maya",
     "Correct. 3D animation (Maya) changes shape, texture, position, lighting and camera. (L3, Capturing and storing each medium)"
    ]
   ],
   "a": 3
  },
  {
   "q": "A true-colour image uses how many bits per pixel?",
   "o": [
    [
     "24 bits",
     "Correct. True colour = 24 bits per pixel. (L3, Images, audio and video data sizes)"
    ],
    [
     "1 bit",
     "1 bit per pixel is black and white."
    ],
    [
     "8 bits",
     "8 bits is grey scale or a colour map."
    ],
    [
     "16 bits",
     "16 bits is the CD audio sample size, not an image depth from the lecture."
    ]
   ],
   "a": 0
  },
  {
   "q": "How much storage does an uncompressed 1024 × 1024, 24-bit image need? (1 MB = 1024 × 1024 B)",
   "o": [
    [
     "1 MB",
     "That would be 8 bits per pixel (grey scale)."
    ],
    [
     "3 MB",
     "Correct. 1024 × 1024 × 24 / 8 = 3,145,728 B = 3 MB. (L3, Images, audio and video data sizes)"
    ],
    [
     "24 MB",
     "This forgets to divide the bits by 8."
    ],
    [
     "0.375 MB",
     "This divides by 8 twice."
    ]
   ],
   "a": 1
  },
  {
   "q": "An uncompressed 1024 × 768 black-and-white image (1 bit per pixel) needs: (1 KB = 1024 B)",
   "o": [
    [
     "768 KB",
     "That is 8 bits per pixel (grey scale), not B/W."
    ],
    [
     "2304 KB",
     "That is 24-bit true colour."
    ],
    [
     "96 KB",
     "Correct. 1024 × 768 × 1 = 786,432 bits / 8 = 98,304 B / 1024 = 96 KB. (L3, Images, audio and video data sizes)"
    ],
    [
     "12 KB",
     "This divides by 8 twice."
    ]
   ],
   "a": 2
  },
  {
   "q": "Using the lecture's method, a 12-megapixel, 24-bit photo needs uncompressed about: (1 MB = 1,048,576 B)",
   "o": [
    [
     "11.4 MB",
     "That uses 1 byte per pixel (grey scale) instead of 3."
    ],
    [
     "274.7 MB",
     "This uses bits (× 24) without dividing by 8."
    ],
    [
     "29 MB",
     "About 29 MB is the lecture's 10-megapixel result, not 12."
    ],
    [
     "34.3 MB",
     "Correct. 12,000,000 × 3 B = 36,000,000 B / 1,048,576 ≈ 34.3 MB. (L3, Worked size calculations)"
    ]
   ],
   "a": 3
  },
  {
   "q": "CD-quality audio is defined in the lecture as:",
   "o": [
    [
     "16-bit at 44.1 kHz",
     "Correct. CD quality = 16-bit at 44.1 kHz. (L3, Images, audio and video data sizes)"
    ],
    [
     "24-bit at 96 kHz",
     "That is the audiophile quality."
    ],
    [
     "8-bit at 22.05 kHz",
     "That is lower than CD quality."
    ],
    [
     "16-bit at 8 kHz",
     "8 kHz is a speech (telephone) rate, not CD."
    ]
   ],
   "a": 0
  },
  {
   "q": "How big is 10 seconds of uncompressed mono CD-quality audio?",
   "o": [
    [
     "1,764,000 B",
     "That is stereo (2 channels)."
    ],
    [
     "882,000 B",
     "Correct. 44,100 × 16 × 1 × 10 = 7,056,000 bits / 8 = 882,000 B. (L3, Worked size calculations)"
    ],
    [
     "7,056,000 B",
     "That is the size in bits, not bytes."
    ],
    [
     "441,000 B",
     "That uses 8-bit samples instead of 16-bit."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: according to the lecture, 1 minute of stereo CD audio needs about 10 MB uncompressed.",
   "o": [
    [
     "True",
     "Correct. 1 min mono CD = 5 MB and stereo doubles it to 10 MB. (L3, Images, audio and video data sizes)"
    ],
    [
     "False",
     "The lecture gives 5 MB for mono and 10 MB for stereo."
    ]
   ],
   "a": 0
  },
  {
   "q": "Uncompressed 1280 × 720, 24-bit colour video at 25 fps needs per second:",
   "o": [
    [
     "2,764,800 B",
     "That is one frame, not one second."
    ],
    [
     "23,040,000 B",
     "That uses 1 byte (8-bit) per pixel."
    ],
    [
     "69,120,000 B",
     "Correct. 1280 × 720 × 3 = 2,764,800 B per frame × 25 = 69,120,000 B/s. (L3, Images, audio and video data sizes)"
    ],
    [
     "82,944,000 B",
     "That uses 30 fps instead of 25."
    ]
   ],
   "a": 2
  },
  {
   "q": "A 512 × 512 monochrome (8-bit) video runs at 50 fps. Uncompressed, it needs per second:",
   "o": [
    [
     "6.25 MB",
     "That is at 25 fps, as in the lecture."
    ],
    [
     "37.5 MB",
     "That treats each frame as 24-bit (0.75 MB)."
    ],
    [
     "0.25 MB",
     "That is a single frame."
    ],
    [
     "12.5 MB",
     "Correct. Each frame is 0.25 MB, and 50 × 0.25 = 12.5 MB. (L3, Images, audio and video data sizes)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: one general theme of the course is that human perception leads to compression ideas.",
   "o": [
    [
     "True",
     "Correct. The roadmap lists \"human perception → compression ideas\" as a general theme. (L3, Roadmap: general themes)"
    ],
    [
     "False",
     "It is listed as one of the general themes."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which tool does the lecture give for editing individual pixels or groups of pixels in a bitmap image?",
   "o": [
    [
     "Photoshop",
     "Correct. In images usually only individual or groups of pixels can be edited (Photoshop). (L3, Images, audio and video data sizes)"
    ],
    [
     "Freehand",
     "Freehand is a graphics editor for primitives."
    ],
    [
     "OpenGL",
     "OpenGL is the API standard for 2D/3D graphics."
    ],
    [
     "PostScript",
     "PostScript is a program that generates graphics."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: text is not temporal, but it may have an implied sequence.",
   "o": [
    [
     "True",
     "Correct. The lecture says text is not temporal but may have an implied sequence. (L3, Capturing and storing each medium)"
    ],
    [
     "False",
     "The lecture states exactly this about text."
    ]
   ],
   "a": 0
  }
 ],
 "4": [
  {
   "q": "How many quantisation levels does a <b>12-bit</b> sample have?",
   "o": [
    [
     "2048",
     "2048 is 2<sup>11</sup>, one bit short. A 12-bit sample has 2<sup>12</sup> = 4096 levels."
    ],
    [
     "24",
     "That is 12 × 2; levels grow exponentially, as 2<sup>bits</sup>."
    ],
    [
     "144",
     "That is 12²; the number of levels is 2<sup>12</sup>, not 12²."
    ],
    [
     "4096",
     "Correct. Levels = 2<sup>bits</sup> = 2<sup>12</sup> = 4096 (8-bit gives 256, 16-bit 65,536) (L4, Sample rate and bit size)."
    ]
   ],
   "a": 3
  },
  {
   "q": "What is the <b>Nyquist frequency</b> for a sample rate of <b>48 kHz</b>?",
   "o": [
    [
     "96 kHz",
     "That is 2 × fs; the Nyquist RATE for a signal is 2·fmax, but the Nyquist frequency of a sample rate is fs/2."
    ],
    [
     "24 kHz",
     "Nyquist frequency = fs/2 = 48/2 = 24 kHz, the highest frequency this rate can represent."
    ],
    [
     "48 kHz",
     "That is the sample rate itself, not its Nyquist frequency."
    ],
    [
     "22.05 kHz",
     "That is the Nyquist frequency of 44.1 kHz (CD audio), not 48 kHz."
    ]
   ],
   "a": 1
  },
  {
   "q": "x(t) = 5·cos(600πt) + 2·sin(1000πt + π/4). What is the <b>minimum</b> sampling rate that satisfies Nyquist?",
   "o": [
    [
     "1000 Hz",
     "Each term is 2πf·t: f<sub>1</sub> = 600π/2π = 300 Hz, f<sub>2</sub> = 1000π/2π = 500 Hz; fmax = 500 Hz → fs ≥ 2 × 500 = 1000 Hz."
    ],
    [
     "500 Hz",
     "That is fmax itself — the ×2 from Nyquist was forgotten."
    ],
    [
     "600 Hz",
     "That is 2 × 300 Hz, based on the lower component; Nyquist uses the HIGHEST frequency."
    ],
    [
     "2000 Hz",
     "That reads 1000π as 1000 Hz; you must divide the angular frequency by 2π first."
    ]
   ],
   "a": 0
  },
  {
   "q": "A <b>speech</b> recording is <b>2 minutes</b> long, <b>8-bit</b>, <b>mono</b>, and no sample rate is given. Using the course constants, what is its size? (1 KB = 1024 B)",
   "o": [
    [
     "1875 KB",
     "That is the stereo size; the recording is mono (1 channel)."
    ],
    [
     "7500 KB",
     "That divides bits by 1024 without converting to bytes (forgot ÷ 8)."
    ],
    [
     "937.5 KB",
     "Speech → fs = 8000 Hz. 8000 × 8 × 1 × 120 = 7,680,000 bits = 960,000 B ÷ 1024 = 937.5 KB."
    ],
    [
     "≈ 5167.97 KB",
     "That uses the audio/music constant 44.1 kHz; speech uses 8 kHz."
    ]
   ],
   "a": 2
  },
  {
   "q": "What is the sampling interval for a sample rate of <b>22.05 kHz</b>?",
   "o": [
    [
     "≈ 22.68 µs",
     "That is 1/44,100 (CD rate), the music interval from the summary."
    ],
    [
     "≈ 45.35 µs",
     "T = 1/fs = 1/22,050 ≈ 0.00004535 s ≈ 45.35 µs."
    ],
    [
     "125 µs",
     "125 µs is 1/8000 s, the speech (telephone) interval. For 22.05 kHz, T = 1/22,050 ≈ 45.35 µs."
    ],
    [
     "22,050 s",
     "The interval is the reciprocal of the rate, not the rate itself."
    ]
   ],
   "a": 1
  },
  {
   "q": "Converting 1 minute of 44.1 kHz, 16-bit <b>stereo</b> audio to 22.05 kHz, 8-bit <b>mono</b> multiplies the file size by:",
   "o": [
    [
     "1/8",
     "Rate ÷2, bits ÷2, channels ÷2 → ½ × ½ × ½ = 1/8 (10.1 MB → about 1.26 MB, as in the lecture table)."
    ],
    [
     "1/4",
     "That only accounts for two of the three halvings (e.g. forgot stereo → mono)."
    ],
    [
     "1/2",
     "Only one factor was halved; rate, bit size and channels are all halved."
    ],
    [
     "1/16",
     "One factor too many; there are exactly three halvings."
    ]
   ],
   "a": 0
  },
  {
   "q": "On the slides, what happens when a sine wave is sampled at <b>exactly its own frequency</b>?",
   "o": [
    [
     "The waveform is captured perfectly",
     "Only sampling above the Nyquist rate captures it well."
    ],
    [
     "The sine is just captured, like sampling at twice its frequency",
     "\"Just captured\" describes sampling at twice the frequency, and only when the samples land on the peaks and troughs; at its own frequency the sine is always lost."
    ],
    [
     "There is one sample per cycle, every sample has the same value, and the sine is lost",
     "Correct — that is the slide demo; you need at least twice the frequency."
    ],
    [
     "The result is oversampling",
     "Oversampling means sampling ABOVE the Nyquist rate; this is far below it."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which use does the lecture give for a <b>22.05 kHz</b> sample rate?",
   "o": [
    [
     "Low-grade audio such as WWW audio and AM radio",
     "Correct — 22.05 kHz is listed as low-grade audio."
    ],
    [
     "Speech",
     "Speech is listed at 11.025 kHz (telephone 8 kHz)."
    ],
    [
     "CD quality",
     "CD quality is 44.1 kHz (16-bit), twice 22.05 kHz; 22.05 kHz is the CD's Nyquist frequency, not its sample rate."
    ],
    [
     "Audiophile recording",
     "Audiophile audio is quoted as 24-bit at 96 kHz."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the analogy between sounds and images, synthetic sound (e.g. MIDI) is most like:",
   "o": [
    [
     "A bitmap image — regularly sampled, large and hard to modify",
     "That is the analogy for RECORDED (sampled) sound."
    ],
    [
     "A JPEG photo — lossy compressed samples",
     "The slides compare synthetic sound to vector graphics, not to compressed photos."
    ],
    [
     "A colour look-up table",
     "No such analogy is made; synthetic sound sends parameters, not palette indices."
    ],
    [
     "Vector graphics — a small, easily edited high-level description that must be converted before playback",
     "Correct — synthesis is to sound what rasterisation is to vector graphics."
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: the .au, .aiff and .wav formats always require compression.",
   "o": [
    [
     "True",
     "The lecture says compression can be used with these formats but is not mandatory."
    ],
    [
     "False",
     "Correct — for .au (Unix), .aiff (Mac) and .wav (PC), compression can be used but is not mandatory."
    ]
   ],
   "a": 1
  },
  {
   "q": "An audio signal is sampled every 0.0000625 s. What is its sampling frequency?",
   "o": [
    [
     "16 kHz",
     "Correct. fs = 1 / 0.0000625 = 16,000 Hz. (L4, Sample rate and bit size)"
    ],
    [
     "8 kHz",
     "8 kHz comes from an interval of 0.000125 s."
    ],
    [
     "32 kHz",
     "That doubles the result, as if applying Nyquist; fs is just 1/T."
    ],
    [
     "4 kHz",
     "4 kHz is the speech fmax, not 1/T."
    ]
   ],
   "a": 0
  },
  {
   "q": "What is the sampling interval for a sample rate of 11.025 kHz?",
   "o": [
    [
     "≈ 45.35 µs",
     "That is the interval for 22.05 kHz."
    ],
    [
     "≈ 90.7 µs",
     "Correct. T = 1 / 11,025 ≈ 0.0000907 s ≈ 90.7 µs. (L4, Sample rate and bit size)"
    ],
    [
     "≈ 22.68 µs",
     "That is the interval for 44.1 kHz (music)."
    ],
    [
     "125 µs",
     "That is the interval for 8 kHz (speech)."
    ]
   ],
   "a": 1
  },
  {
   "q": "A signal contains frequency components up to 7.5 kHz. What is the minimum sampling frequency by Nyquist's theorem?",
   "o": [
    [
     "3.75 kHz",
     "That is half the highest frequency; Nyquist needs twice."
    ],
    [
     "7.5 kHz",
     "Sampling at the signal frequency loses the sine."
    ],
    [
     "15 kHz",
     "Correct. fs ≥ 2 × 7.5 = 15 kHz. (L4, Nyquist's sampling theorem and aliasing)"
    ],
    [
     "30 kHz",
     "That is four times fmax: allowed (oversampling) but not the minimum."
    ]
   ],
   "a": 2
  },
  {
   "q": "What is the Nyquist frequency of a system sampling at 22.05 kHz?",
   "o": [
    [
     "22.05 kHz",
     "That is fs itself, not half of it."
    ],
    [
     "44.1 kHz",
     "That is 2·fs; the Nyquist frequency is fs/2."
    ],
    [
     "5.5125 kHz",
     "This divides by 4 instead of 2."
    ],
    [
     "11.025 kHz",
     "Correct. Nyquist frequency = fs / 2 = 22.05 / 2 = 11.025 kHz. (L4, Nyquist's sampling theorem and aliasing)"
    ]
   ],
   "a": 3
  },
  {
   "q": "The <b>Nyquist rate</b> of a signal is:",
   "o": [
    [
     "2·fmax, the minimum sample rate for the signal",
     "Correct. Nyquist rate = 2·fmax. (L4, Nyquist's sampling theorem and aliasing)"
    ],
    [
     "fs / 2, the highest frequency a sample rate can represent",
     "That is the Nyquist frequency, not the Nyquist rate."
    ],
    [
     "2·fmin, twice the lowest frequency",
     "Nyquist uses the highest frequency component, not the lowest."
    ],
    [
     "1 / T, the number of samples per second",
     "That is the definition of the sampling frequency itself."
    ]
   ],
   "a": 0
  },
  {
   "q": "x(t) = 4A·cos(400πt) + A·sin(300πt + π/4). What is the limiting (largest) sampling interval without aliasing?",
   "o": [
    [
     "0.005 s",
     "That uses fs = 200 Hz (fmax itself), forgetting to double it."
    ],
    [
     "0.0025 s",
     "Correct. f1 = 400π/2π = 200 Hz, f2 = 150 Hz; fmax = 200 Hz → fs ≥ 400 Hz → T ≤ 1/400 = 0.0025 s. (L4, Audio file size, worked examples)"
    ],
    [
     "0.00333 s",
     "That uses the lower component (150 Hz → 300 Hz); Nyquist needs the highest."
    ],
    [
     "0.00125 s",
     "That takes f = 400 Hz (dividing by π instead of 2π), so fs = 800 Hz."
    ]
   ],
   "a": 1
  },
  {
   "q": "Y(t) = 3·cos(1200πt) − 2·sin(800πt + 0.3π). What is the minimum sampling frequency that avoids aliasing?",
   "o": [
    [
     "600 Hz",
     "That is fmax itself, not twice it."
    ],
    [
     "2400 Hz",
     "That takes f = 1200 Hz (dividing by π instead of 2π)."
    ],
    [
     "1200 Hz",
     "Correct. f1 = 1200π/2π = 600 Hz, f2 = 400 Hz; fs ≥ 2 × 600 = 1200 Hz. (L4, Audio file size, worked examples)"
    ],
    [
     "800 Hz",
     "That uses the lower component (400 Hz)."
    ]
   ],
   "a": 2
  },
  {
   "q": "x(t) = A·cos(3000πt) + B·sin(5000πt) + C·cos(1000πt), A, B, C &gt; 0. The limiting sampling interval without aliasing is:",
   "o": [
    [
     "0.0004 s",
     "That uses fs = 2500 Hz (no doubling)."
    ],
    [
     "0.000333 s",
     "That uses the 1500 Hz component (first term) instead of the highest."
    ],
    [
     "0.001 s",
     "That uses the lowest component (500 Hz)."
    ],
    [
     "0.0002 s",
     "Correct. Frequencies are 1500, 2500 and 500 Hz; fmax = 2500 → fs ≥ 5000 Hz → T ≤ 0.0002 s. (L4, Audio file size, worked examples)"
    ]
   ],
   "a": 3
  },
  {
   "q": "What is the size of 3 minutes of mono, 8-bit audio sampled at 22.05 kHz?",
   "o": [
    [
     "3,969,000 B",
     "Correct. 180 × 22,050 × 8 × 1 = 31,752,000 bits / 8 = 3,969,000 B. (L4, Audio file size, worked examples)"
    ],
    [
     "31,752,000 B",
     "That is the size in bits."
    ],
    [
     "7,938,000 B",
     "That is stereo (2 channels)."
    ],
    [
     "66,150 B",
     "This uses 3 seconds instead of 180 seconds."
    ]
   ],
   "a": 0
  },
  {
   "q": "Audio is sampled every 0.0000625 s with 16-bit samples for 3 minutes in mono. Its size is: (1 KB = 1024 B)",
   "o": [
    [
     "11,250 KB",
     "That is stereo; the signal is mono."
    ],
    [
     "5625 KB",
     "Correct. fs = 16,000 Hz; 16,000 × 16 × 180 × 1 = 46,080,000 bits = 5,760,000 B = 5625 KB. (L4, Audio file size, worked examples)"
    ],
    [
     "45,000 KB",
     "This divides bits by 1024 without dividing by 8 first."
    ],
    [
     "93.75 KB",
     "This uses 3 seconds instead of 180."
    ]
   ],
   "a": 1
  },
  {
   "q": "An audio signal is sampled with an interval of 250 ms, 32-bit samples, for 2 hours, in stereo. The file size is:",
   "o": [
    [
     "115,200 bytes",
     "That is mono; the signal is stereo."
    ],
    [
     "1,843,200 bytes",
     "That is the size in bits, not bytes."
    ],
    [
     "230,400 bytes",
     "Correct. fs = 1/0.25 = 4 Hz; t = 7200 s; 4 × 32 × 7200 × 2 = 1,843,200 bits = 230,400 B. (L4, Audio file size, worked examples)"
    ],
    [
     "3,840 bytes",
     "This uses 120 (minutes) instead of 7200 seconds."
    ]
   ],
   "a": 2
  },
  {
   "q": "A speech signal with 16-bit samples lasts 1.5 hours in mono, and no sample rate is given. Its size is:",
   "o": [
    [
     "43,200,000 bytes",
     "This uses fs = 4000 Hz (fmax) instead of 8000 Hz."
    ],
    [
     "691,200,000 bytes",
     "That is the size in bits."
    ],
    [
     "476,280,000 bytes",
     "This uses the music rate 44.1 kHz; speech uses 8 kHz."
    ],
    [
     "86,400,000 bytes",
     "Correct. Speech fs = 2 × 4000 = 8000 Hz; t = 5400 s; 8000 × 16 × 5400 × 1 = 691,200,000 bits = 86,400,000 B. (L4, Audio file size, worked examples)"
    ]
   ],
   "a": 3
  },
  {
   "q": "A music recording is 10 s long, 16-bit, stereo, and no sample rate is given. Using the course constants, its size is: (1 KB = 1024 B)",
   "o": [
    [
     "≈ 1722.66 KB",
     "Correct. Music fs = 44,100 Hz; 10 × 44,100 × 16 × 2 = 14,112,000 bits = 1,764,000 B ≈ 1722.66 KB. (L4, Audio file size, worked examples)"
    ],
    [
     "≈ 861.33 KB",
     "That is mono."
    ],
    [
     "312.5 KB",
     "This uses the speech rate 8 kHz instead of 44.1 kHz."
    ],
    [
     "≈ 13,781.25 KB",
     "This divides bits by 1024 without dividing by 8."
    ]
   ],
   "a": 0
  },
  {
   "q": "An audio signal is sampled every 0.0025 s with 64-bit samples for 4 hours in stereo. The file size is:",
   "o": [
    [
     "46,080,000 bytes",
     "That is mono."
    ],
    [
     "92,160,000 bytes",
     "Correct. fs = 1/0.0025 = 400 Hz; t = 14,400 s; 400 × 64 × 14,400 × 2 = 737,280,000 bits = 92,160,000 B. (L4, Audio file size, worked examples)"
    ],
    [
     "737,280,000 bytes",
     "That is the size in bits."
    ],
    [
     "1,536,000 bytes",
     "This uses 240 (minutes) instead of 14,400 seconds."
    ]
   ],
   "a": 1
  },
  {
   "q": "A recording's sample rate is halved and it is changed from mono to stereo (same bits, same length). Its file size:",
   "o": [
    [
     "Doubles",
     "Doubling the channels is cancelled by halving the rate."
    ],
    [
     "Halves",
     "Halving the rate is cancelled by doubling the channels."
    ],
    [
     "Stays the same",
     "Correct. Size ∝ rate × channels: ½ × 2 = 1. (L4, Audio file size, worked examples)"
    ],
    [
     "Becomes four times larger",
     "The two changes cancel; nothing is multiplied by 4."
    ]
   ],
   "a": 2
  },
  {
   "q": "A 16-bit integer sample can store values in the range:",
   "o": [
    [
     "0–255",
     "That is the 8-bit range."
    ],
    [
     "0–65536",
     "There are 65,536 levels, so the top value is 65535."
    ],
    [
     "0–32767",
     "That is half the range (2^15 − 1)."
    ],
    [
     "0–65535",
     "Correct. 2^16 = 65,536 levels, 0 to 65535. (L4, Sample rate and bit size)"
    ]
   ],
   "a": 3
  },
  {
   "q": "How many quantisation levels does a 10-bit sample have?",
   "o": [
    [
     "1024",
     "Correct. Levels = 2^10 = 1024. (L4, Sample rate and bit size)"
    ],
    [
     "100",
     "Levels are 2^bits, not 10²."
    ],
    [
     "20",
     "Levels grow as 2^bits, not 2 × bits."
    ],
    [
     "256",
     "That is 8 bits."
    ]
   ],
   "a": 0
  },
  {
   "q": "According to the slides, the signal-to-noise ratio of 8-bit audio is about:",
   "o": [
    [
     "98 dB",
     "That is 16-bit."
    ],
    [
     "50 dB",
     "Correct. 8-bit SNR = 50 dB (16-bit = 98 dB). (L4, Effect of sample rate and bit size on quality and size)"
    ],
    [
     "6 dB",
     "6 dB is the increment that is twice as loud."
    ],
    [
     "48 dB",
     "48 dB is the gap between 98 and 50, not the 8-bit SNR."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: on the decibel scale, a 6 dB increment is twice as loud.",
   "o": [
    [
     "True",
     "Correct. The slide states that a 6 dB increment is twice as loud. (L4, Effect of sample rate and bit size on quality and size)"
    ],
    [
     "False",
     "The slide states exactly this."
    ]
   ],
   "a": 0
  },
  {
   "q": "Sound is measured in decibels (dB) because:",
   "o": [
    [
     "dB counts the samples taken per second",
     "Samples per second are measured in Hertz."
    ],
    [
     "dB gives the number of bits per sample",
     "Bits per sample is the bit size (quantisation)."
    ],
    [
     "Ears do not respond linearly, and dB is a logarithmic measure",
     "Correct. (L4, Effect of sample rate and bit size on quality and size)"
    ],
    [
     "Ears respond linearly to pressure",
     "The lecture says ears do NOT respond linearly."
    ]
   ],
   "a": 2
  },
  {
   "q": "According to the lecture's table, 1 minute of 16-bit mono audio at 22.05 kHz is about:",
   "o": [
    [
     "5.05 MB",
     "That is 16-bit mono at 44.1 kHz (or stereo at 22.05 kHz)."
    ],
    [
     "1.26 MB",
     "That is 8-bit mono at 22.05 kHz."
    ],
    [
     "10.1 MB",
     "That is 16-bit stereo at 44.1 kHz."
    ],
    [
     "2.52 MB",
     "Correct. Half of 5.05 MB (44.1 kHz). (L4, Effect of sample rate and bit size on quality and size)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: increasing the sample rate beyond what hearing needs always improves audio quality.",
   "o": [
    [
     "True",
     "The lecture says it does not \"always improve\" quality; it only makes files bigger."
    ],
    [
     "False",
     "Correct. Higher rates give bigger files, but going beyond what hearing needs does not always improve quality. (L4, Effect of sample rate and bit size on quality and size)"
    ]
   ],
   "a": 1
  },
  {
   "q": "CD audio is sampled at 44.1 kHz because the upper range of human hearing is around:",
   "o": [
    [
     "20–22 kHz",
     "Correct. Nyquist: 2 × 22.05 kHz = 44.1 kHz. (L4, Why are CD sample rates 44.1 kHz?)"
    ],
    [
     "44.1 kHz",
     "That is the sample rate, which is twice the hearing limit."
    ],
    [
     "4 kHz",
     "That is the speech fmax."
    ],
    [
     "11.025 kHz",
     "That is a speech sample rate."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which use does the lecture give for an 11.025 kHz sample rate?",
   "o": [
    [
     "CD quality",
     "CD quality is 44.1 kHz."
    ],
    [
     "Speech",
     "Correct. 11.025 kHz is listed for speech (telephone uses 8 kHz). (L4, Sample rate and bit size)"
    ],
    [
     "AM radio",
     "AM radio is listed under 22.05 kHz."
    ],
    [
     "Audiophile recordings",
     "Audiophile is 96 kHz (Lecture 3)."
    ]
   ],
   "a": 1
  },
  {
   "q": "On the slides, a sine wave sampled at exactly twice its frequency, with the samples landing on the zero crossings, gives:",
   "o": [
    [
     "A triangle wave with the sine's frequency",
     "That happens when the samples land on the peaks and troughs."
    ],
    [
     "A flat line at the peak height",
     "That is sampling at the signal frequency (one sample per cycle)."
    ],
    [
     "All samples zero: a flat line and the sine is lost",
     "Correct. The red samples on the axis join into a flat line. (L4, Nyquist's sampling theorem and aliasing)"
    ],
    [
     "A close trace of the sine",
     "That needs sampling above the Nyquist frequency (many samples)."
    ]
   ],
   "a": 2
  },
  {
   "q": "What does slide 12 (three sinusoids in green, red and blue) show?",
   "o": [
    [
     "Oversampling removes the noise of 8-bit audio",
     "The slide is about undersampling ambiguity, not noise."
    ],
    [
     "ADPCM predicts the next sample from past samples",
     "ADPCM is in the audio formats section."
    ],
    [
     "Three sample rates for speech, WWW audio and CD",
     "The figure shows one set of samples shared by three waves."
    ],
    [
     "Different sinusoids pass through the same sample points, so the samples cannot tell them apart",
     "Correct. This is why getting Nyquist wrong causes aliasing. (L4, Nyquist's sampling theorem and aliasing)"
    ]
   ],
   "a": 3
  },
  {
   "q": "True or False: aliasing affects audio only; images and video are not affected.",
   "o": [
    [
     "True",
     "The slides say aliasing affects audio, imagery and video."
    ],
    [
     "False",
     "Correct. Aliasing affects audio, imagery and video. (L4, Nyquist's sampling theorem and aliasing)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: to prevent aliasing, the signal is low-pass filtered after the A/D converter.",
   "o": [
    [
     "True",
     "The low-pass filter comes before the A/D converter, on the analog signal."
    ],
    [
     "False",
     "Correct. The chain is Input → Low Pass Filter → A/D Converter → Sampled Signal. (L4, Nyquist's sampling theorem and aliasing)"
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: oversampling reduces aliasing but costs more data.",
   "o": [
    [
     "True",
     "Correct. Sampling above the Nyquist rate reduces aliasing at the price of more data. (L4, Nyquist's sampling theorem and aliasing)"
    ],
    [
     "False",
     "The lecture states this trade-off."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: the Nyquist rate of a speech signal with fmax = 4 kHz is 8 kHz.",
   "o": [
    [
     "True",
     "Correct. Nyquist rate = 2 × 4 = 8 kHz, the course's speech constant. (L4, Why are CD sample rates 44.1 kHz?)"
    ],
    [
     "False",
     "2 × 4 kHz = 8 kHz, so the statement is true."
    ]
   ],
   "a": 0
  },
  {
   "q": "The .aiff audio format originated on:",
   "o": [
    [
     "Mac and SGI",
     "Correct. (L4, Audio file formats)"
    ],
    [
     "Unix and Sun",
     "That is .au."
    ],
    [
     "PC and DEC",
     "That is .wav."
    ],
    [
     "Sound Blaster",
     "Sound Blaster is linked to .voc."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which audio format does the lecture say can use silence deletion?",
   "o": [
    [
     ".wav",
     ".wav is one of the popular formats; silence deletion is not mentioned for it."
    ],
    [
     ".voc (Sound Blaster)",
     "Correct. (L4, Audio file formats)"
    ],
    [
     ".flac",
     "FLAC is listed without silence deletion."
    ],
    [
     ".sd2",
     ".sd2 is Pro Tools/Sound Designer."
    ]
   ],
   "a": 1
  },
  {
   "q": "Which synthesis method makes a sound by summing simpler waveforms?",
   "o": [
    [
     "Subtractive",
     "Subtractive filters out parts of a complex waveform."
    ],
    [
     "Granular",
     "Granular uses small fragments of existing samples."
    ],
    [
     "Additive",
     "Correct. (L4, Synthetic sounds, reducing bandwidth)"
    ],
    [
     "Wavetable",
     "Wavetable uses samples of real instruments."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: in the synthesis pipeline, the full sampled audio is sent to the client.",
   "o": [
    [
     "True",
     "Only the parameters that control the sound are sent; the client produces the sound."
    ],
    [
     "False",
     "Correct. Only parameters are sent (MIDI/MP4/HTML5) and the client synthesises the sound. (L4, Synthetic sounds, reducing bandwidth)"
    ]
   ],
   "a": 1
  },
  {
   "q": "According to the lecture, which fact about hearing does MPEG audio exploit?",
   "o": [
    [
     "Ears respond linearly to loudness",
     "The lecture says ears do not respond linearly."
    ],
    [
     "Ears can hear up to 44.1 kHz",
     "Hearing reaches about 20–22 kHz; 44.1 kHz is the CD sample rate."
    ],
    [
     "Ears cannot hear 8-bit noise",
     "8-bit is roughly 8 times as noisy; it is audible."
    ],
    [
     "Ears respond to pressure",
     "Correct. Sound is received by ears, which respond to pressure; MPEG audio exploits this. (L4, Sound and digitising sound)"
    ]
   ],
   "a": 3
  }
 ],
 "5": [
  {
   "q": "A Karplus-Strong string must sound at <b>294 Hz</b> with Fs = 44,100 Hz. What delay-line length D is needed?",
   "o": [
    [
     "294 samples",
     "That just reuses the frequency; the delay length is Fs ÷ F1."
    ],
    [
     "150 samples",
     "Correct. Karplus-Strong tuning: D = Fs / F1 = 44,100 / 294 = 150 samples, since the period is the delay length (L5, Karplus-Strong)."
    ],
    [
     "300 samples",
     "That would give 44,100/300 = 147 Hz, an octave too low."
    ],
    [
     "0.0034 samples",
     "That is 1/294 s, the period in seconds, not in samples (forgot × Fs)."
    ]
   ],
   "a": 1
  },
  {
   "q": "A <b>1000 Hz</b> carrier is FM-modulated by a <b>150 Hz</b> modulator. Where are the <b>third-order</b> sidebands?",
   "o": [
    [
     "850 Hz and 1150 Hz",
     "850 and 1150 Hz are the first-order sidebands: 1000 ± 1 × 150. Third order uses n = 3: 1000 ± 450 = 550 and 1450 Hz."
    ],
    [
     "700 Hz and 1300 Hz",
     "Those are the second-order sidebands (n = 2)."
    ],
    [
     "550 Hz and 1450 Hz",
     "Correct. FM sidebands sit at fc ± n·fm; for n = 3: 1000 ± 3 × 150 = 1000 ± 450 = 550 and 1450 Hz, with amplitude J3(I) (L5, FM synthesis)."
    ],
    [
     "2850 Hz and 3150 Hz",
     "That multiplies the carrier by 3; n multiplies the MODULATOR frequency, not the carrier."
    ]
   ],
   "a": 2
  },
  {
   "q": "In the subtractive synthesis demo, a filter is made with <code>butter(4, 0.1, 'low')</code> at Fs = 22,050 Hz. What is the actual cut-off frequency?",
   "o": [
    [
     "2205 Hz",
     "That scales by Fs instead of the Nyquist frequency Fs/2."
    ],
    [
     "0.1 Hz",
     "0.1 is a normalised value (fraction of Nyquist), not a frequency in Hz."
    ],
    [
     "441 Hz",
     "That is the cut-off of the lecture's 0.04 setting (0.04 × 11,025), not 0.1."
    ],
    [
     "1102.5 Hz",
     "The cut-off is relative to Nyquist (Fs/2 = 11,025 Hz): 0.1 × 11,025 = 1102.5 Hz."
    ]
   ],
   "a": 3
  },
  {
   "q": "Using simple sound-energy beat detection on audio sampled at <b>48 kHz</b>, how many samples are in the \"instant\" energy window?",
   "o": [
    [
     "48,000",
     "That is the ~1 s window used for the local AVERAGE energy."
    ],
    [
     "1024",
     "1024 samples is the FFT size in the frequency-selected method, not the instant window."
    ],
    [
     "2400",
     "The instant window is about 5/100 s: 0.05 × 48,000 = 2400 samples."
    ],
    [
     "2205",
     "That is 0.05 × 44,100; the audio here is at 48 kHz."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which instrument does the lecture give as having a <b>very short release</b>?",
   "o": [
    [
     "A pipe organ",
     "Correct — the organ plays at constant volume and dies quickly when the key is released."
    ],
    [
     "A bell",
     "The lecture gives the bell (and the piano with sustain pedal) as an example of a LONG release; the sound rings on after it is struck. The organ has the short release."
    ],
    [
     "A piano with the sustain pedal held",
     "This is the lecture's example of a long release."
    ],
    [
     "A guitar",
     "The guitar is the example of a sound that is loudest just after plucking and then fades; it is not given as a short-release example."
    ]
   ],
   "a": 0
  },
  {
   "q": "In FM synthesis, which preset routing (\"algorithm\") is described as an oscillator's output modulating <b>itself</b>?",
   "o": [
    [
     "Multiple carriers",
     "That is one oscillator modulating two or more carriers."
    ],
    [
     "Feedback",
     "Correct — feedback: an oscillator modulates itself."
    ],
    [
     "Multiple modulators",
     "That is two or more oscillators modulating one carrier."
    ],
    [
     "Linear crossfading",
     "That is a wavetable technique, not an FM algorithm."
    ]
   ],
   "a": 1
  },
  {
   "q": "What is the main <b>disadvantage</b> of sample-based synthesis named in the lecture?",
   "o": [
    [
     "It needs much more processing power than physical modelling",
     "Its ADVANTAGE is much lower processing power, since nuances are pre-recorded."
    ],
    [
     "It cannot reproduce real instruments",
     "It uses recordings of real instruments as its seed waveforms."
    ],
    [
     "A great deal of data must be specified for each partial",
     "That is the disadvantage of additive synthesis."
    ],
    [
     "Detailed sounds need several samples played at once, which reduces polyphony",
     "Correct — e.g. a trumpet needs breath noise, growl and a looping wave together."
    ]
   ],
   "a": 3
  },
  {
   "q": "In a sampler, using low keys outside the instrument's range to switch between playing styles (e.g. muted/open trumpet) is called:",
   "o": [
    [
     "Keyswitching",
     "Correct — keyswitches select the playing style from banks of key-mapped, velocity-layered samples."
    ],
    [
     "Velocity layering",
     "Velocity layers change the sound depending on how hard the key is hit."
    ],
    [
     "Multisampling",
     "Multisampling records the instrument at intervals (splits) across the keyboard."
    ],
    [
     "Looping",
     "Looping repeats part of a sample to save memory."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the Karplus-Strong drum variant, which blend factor b gives the best <b>snare</b> sound?",
   "o": [
    [
     "b near 0",
     "b near 0 makes the drum variant behave like the plain string algorithm, giving a string-like sound. The best snare is at b = ½ (L5, Karplus-Strong drum)."
    ],
    [
     "b = ½",
     "Correct. In the drum variant each sample is +½ or −½ of the averaged pair with probability b; the lecture says b = ½ gives the best snare (L5, Karplus-Strong)."
    ],
    [
     "b near 1",
     "B near 1 gives a weird electric crash-cymbal sound."
    ],
    [
     "b = 2",
     "B is a probability/blend factor between 0 and 1."
    ]
   ],
   "a": 1
  },
  {
   "q": "True or False: PSOLA uses a Short-Time Fourier Transform (STFT), like the phase vocoder.",
   "o": [
    [
     "True",
     "The lecture states there is no STFT in PSOLA; it works on overlapping time-domain segments."
    ],
    [
     "False",
     "Correct — PSOLA has no STFT (it predates the phase vocoder); it moves, repeats or drops overlapping segments and overlap-adds them."
    ]
   ],
   "a": 1
  }
 ],
 "6": [
  {
   "q": "Decode the MIDI message <b>B3 07 64</b> (hex).",
   "o": [
    [
     "Control Change, channel 3, controller 7, value 100",
     "The nibble 3 is channel − 1, so the musician's channel number is 4."
    ],
    [
     "Program Change, channel 4, program 7, value 100",
     "Program Change is Cx and has only one data byte; Bx is Control Change."
    ],
    [
     "Control Change, channel 4, controller 7, value 100",
     "B = Control Change; low nibble 3 → channel 3 + 1 = 4; 07 = 7; 64 hex = 6×16 + 4 = 100."
    ],
    [
     "Control Change, channel 4, controller 7, value 64",
     "64 here is hexadecimal: 6 × 16 + 4 = 100 in decimal. Data bytes are written in hex, so the controller value is 100, not 64."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which hex bytes send <b>Note Off</b>, <b>channel 6</b>, key <b>64</b>, velocity 0?",
   "o": [
    [
     "85 40 00",
     "Note Off = 8x; channel 6 → nibble 5 → 85; key 64 = 4×16 = 40 hex; velocity 00."
    ],
    [
     "86 40 00",
     "The channel nibble is channel − 1, so channel 6 is 5, not 6."
    ],
    [
     "95 40 00",
     "9x is Note On, not Note Off. Note Off is 8x, and channel 6 → nibble 5, so the status byte is 85."
    ],
    [
     "85 64 00",
     "64 is the decimal key number; in hex it must be written 40."
    ]
   ],
   "a": 0
  },
  {
   "q": "A sequence has <b>500 notes</b> (each a Note On and a Note Off) plus <b>4 Program Change</b> messages. How many bytes of MIDI messages is that?",
   "o": [
    [
     "3012 bytes",
     "That counts Program Change as 3 bytes; it has only one data byte (2 bytes total)."
    ],
    [
     "3008 bytes",
     "1000 note messages × 3 B = 3000 B, plus 4 Program Changes × 2 B = 8 B → 3008 B."
    ],
    [
     "1508 bytes",
     "1508 counts only 500 note messages (500 × 3 + 8). Each note needs a Note On AND a Note Off: 1000 × 3 + 4 × 2 = 3008 bytes."
    ],
    [
     "2008 bytes",
     "That counts note messages as 2 bytes; Note On/Off are 3 bytes (status + key + velocity)."
    ]
   ],
   "a": 1
  },
  {
   "q": "What does the status byte <b>E2</b> mean?",
   "o": [
    [
     "Pitch Bend on channel 2",
     "The nibble is channel − 1, so 2 means channel 3."
    ],
    [
     "Channel Pressure on channel 3",
     "Channel Pressure has status Dx. E is Pitch Bend, and the nibble 2 means channel 3, so E2 = Pitch Bend on channel 3."
    ],
    [
     "Program Change on channel 3",
     "Program Change has status Cx. E is Pitch Bend, so E2 = Pitch Bend on channel 2 + 1 = 3."
    ],
    [
     "Pitch Bend on channel 3",
     "E = Pitch Bend; nibble 2 → channel 2 + 1 = 3."
    ]
   ],
   "a": 3
  },
  {
   "q": "In the General MIDI patch map, instrument number <b>30</b> belongs to which family?",
   "o": [
    [
     "Organ",
     "Organ covers patches 17–24 in the GM map. Number 30 falls in the next family of 8, 25–32, which is Guitar."
    ],
    [
     "Guitar",
     "Correct. The 128 GM patches form 16 families of 8: 1–8 Piano, 9–16 Chromatic Percussion, 17–24 Organ, 25–32 Guitar, so 30 is a Guitar (L6, General MIDI)."
    ],
    [
     "Bass",
     "Bass covers patches 33–40, the family after Guitar. Number 30 lies in 25–32, the Guitar family."
    ],
    [
     "Chromatic Percussion",
     "Chromatic Percussion covers patches 9–16. Number 30 lies in 25–32, the Guitar family."
    ]
   ],
   "a": 1
  },
  {
   "q": "The General MIDI percussion key map contains:",
   "o": [
    [
     "128 percussion sounds on keys 0–127",
     "128 is the size of the instrument patch map."
    ],
    [
     "16 percussion sounds, one per channel",
     "Percussion goes on channel 10 by default, and there are 47 sounds."
    ],
    [
     "47 percussion sounds on keys 35–81",
     "Correct — e.g. 35 Acoustic Bass Drum up to 81 Open Triangle."
    ],
    [
     "47 percussion sounds on keys 1–47",
     "The count is right but the keys run from 35 to 81."
    ]
   ],
   "a": 2
  },
  {
   "q": "Which system real-time message <b>stops</b> a sequence?",
   "o": [
    [
     "FA",
     "FA is Start Sequence, which begins playback. The system real-time message that stops a sequence is FC."
    ],
    [
     "F8",
     "F8 is the Timing Clock, sent repeatedly for synchronisation; it does not stop anything. Stop is FC."
    ],
    [
     "F7",
     "F7 is Sysex End, not a real-time message."
    ],
    [
     "FC",
     "Correct — FC = Stop (FA = Start, FB = Continue, F8 = Timing Clock)."
    ]
   ],
   "a": 3
  },
  {
   "q": "In MIDI terminology, the <b>control settings that define a particular timbre</b> are called a:",
   "o": [
    [
     "Patch",
     "Correct — a patch is the set of control settings defining a timbre."
    ],
    [
     "Voice",
     "A voice is the portion of the synthesiser that produces a sound."
    ],
    [
     "Track",
     "A track organises recordings in a sequencer."
    ],
    [
     "Channel",
     "A channel separates information in a MIDI system (16 per cable)."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which MPEG-4 Structured Audio tool specifies the <b>mixing and post-production</b> of audio scenes at playback (e.g. fading music, adding reverb)?",
   "o": [
    [
     "SASL",
     "SASL is the score language that controls SAOL instruments (notes, loudness, tempo)."
    ],
    [
     "SASBF",
     "SASBF transmits banks of samples for wavetable/sample-based synthesis."
    ],
    [
     "AudioBIFS",
     "Correct — AudioBIFS (part of the Binary Format for Scene Description) handles mixing/post-production."
    ],
    [
     "Scheduler",
     "The scheduler defines how SAOL creates sound when driven by MIDI or SASL."
    ]
   ],
   "a": 2
  },
  {
   "q": "True or False: MIDI system messages are channel specific.",
   "o": [
    [
     "True",
     "System messages carry information that is NOT channel specific."
    ],
    [
     "False",
     "Correct — system messages (common, real-time, exclusive) are not channel specific: timing, song position, device setup."
    ]
   ],
   "a": 1
  }
 ],
 "7": [
  {
   "q": "A slapback effect needs a delay of <b>40 ms</b> at f<sub>s</sub> = <b>48 kHz</b>. What is the delay M in samples?",
   "o": [
    [
     "192",
     "A factor-of-10 slip: 40 ms is 0.04 s, not 0.004 s."
    ],
    [
     "0.00000083",
     "That is τ ÷ f<sub>s</sub> taken literally from the slide's M = τ/f<sub>s</sub>; numerically the delay is τ × f<sub>s</sub>."
    ],
    [
     "1920",
     "Correct. The delay in samples is the time times the sample rate: M = τ × fs = 0.04 × 48,000 = 1920 samples (L7, Comb filters)."
    ],
    [
     "1200",
     "That would be 25 ms at 48 kHz; 40 ms gives 1920."
    ]
   ],
   "a": 2
  },
  {
   "q": "An audio sine of <b>500 Hz</b> is amplitude-modulated, y(n) = (1 + α·m(n))·x(n), by an <b>80 Hz</b> sine LFO. Which frequencies are heard?",
   "o": [
    [
     "420 and 580 Hz only",
     "That is RING modulation, which keeps only the sum and difference; AM also keeps the 500 Hz carrier."
    ],
    [
     "500 and 80 Hz",
     "Modulation creates sum/difference frequencies; it does not simply output the two inputs."
    ],
    [
     "500 Hz only",
     "The modulation adds sidebands, so more than the carrier is heard."
    ],
    [
     "420, 500 and 580 Hz",
     "AM gives three frequencies: f<sub>c</sub>, f<sub>c</sub> − f<sub>x</sub> and f<sub>c</sub> + f<sub>x</sub>."
    ]
   ],
   "a": 3
  },
  {
   "q": "An equaliser band is set to <b>G = 12 dB</b>. Using V<sub>0</sub> = 10<sup>G/20</sup> and H<sub>0</sub> = V<sub>0</sub> − 1, H<sub>0</sub> ≈",
   "o": [
    [
     "3.98",
     "3.98 is V0 = 10^(12/20) = 10^0.6, the linear gain. The formula then subtracts 1: H0 = V0 − 1 ≈ 2.98."
    ],
    [
     "2.98",
     "Correct. Convert dB to linear first: V0 = 10^(12/20) = 10^0.6 ≈ 3.98, then H0 = V0 − 1 ≈ 2.98 (L7, Equalisers)."
    ],
    [
     "14.85",
     "That uses 10<sup>G/10</sup> (power form); the lecture's formula uses G/20."
    ],
    [
     "11",
     "H<sub>0</sub> is not G − 1; the dB gain must first be converted to linear."
    ]
   ],
   "a": 1
  },
  {
   "q": "For the state variable filter (wah-wah), F<sub>1</sub> = 2·sin(π·f<sub>c</sub>/f<sub>s</sub>). What is F<sub>1</sub> for f<sub>c</sub> = 2000 Hz, f<sub>s</sub> = 48,000 Hz?",
   "o": [
    [
     "≈ 0.5176",
     "That uses 2π·f<sub>c</sub>/f<sub>s</sub> inside the sine; the formula uses π·f<sub>c</sub>/f<sub>s</sub>."
    ],
    [
     "≈ 0.1305",
     "That is sin(π·f<sub>c</sub>/f<sub>s</sub>) — the factor 2 was forgotten."
    ],
    [
     "≈ 0.2611",
     "π × 2000/48,000 ≈ 0.1309 rad; sin ≈ 0.1305; × 2 ≈ 0.2611."
    ],
    [
     "≈ 0.0833",
     "0.0833 is just 2 × 2000/48,000 with no π and no sine. The formula gives 2·sin(π × 2000/48,000) = 2·sin(0.1309) ≈ 0.2611."
    ]
   ],
   "a": 2
  },
  {
   "q": "Using the overdrive soft-clipping curve, what is f(x) for input <b>x = 0.6</b>?",
   "o": [
    [
     "1.2",
     "That uses the linear part 2x, which only applies for x &lt; 1/3."
    ],
    [
     "≈ 0.987",
     "0.6 is in the 1/3 ≤ x &lt; 2/3 region: (3 − (2 − 1.8)²)/3 = (3 − 0.04)/3 ≈ 0.987."
    ],
    [
     "1",
     "The output saturates at 1 only for x ≥ 2/3 (about 0.667). x = 0.6 is in the quadratic region: (3 − (2 − 1.8)²)/3 ≈ 0.987."
    ],
    [
     "≈ 2.96",
     "That is 3 − (2 − 1.8)² without the final ÷ 3; the quadratic region is (3 − (2 − 3x)²)/3."
    ]
   ],
   "a": 1
  },
  {
   "q": "A mono source x is panned with θ = 30° using g<sub>L</sub> = (cos θ + sin θ)x and g<sub>R</sub> = (cos θ − sin θ)x. What are the gains?",
   "o": [
    [
     "g<sub>L</sub> ≈ 1.366x, g<sub>R</sub> ≈ 0.366x",
     "cos 30° ≈ 0.866, sin 30° = 0.5 → 1.366 and 0.366."
    ],
    [
     "g<sub>L</sub> ≈ 0.366x, g<sub>R</sub> ≈ 1.366x",
     "This swaps the formulas: gL uses the plus sign, (cos 30° + sin 30°)x ≈ 1.366x, and gR the minus sign, (cos 30° − sin 30°)x ≈ 0.366x."
    ],
    [
     "g<sub>L</sub> ≈ 0.866x, g<sub>R</sub> ≈ 0.5x",
     "Those are just cos θ and sin θ; the gains are their sum and difference."
    ],
    [
     "g<sub>L</sub> = g<sub>R</sub> = x",
     "Equal gains correspond to θ = 0 (centre), not 30°."
    ]
   ],
   "a": 0
  },
  {
   "q": "In the lecture's classification of effects, the <b>phaser</b> belongs to which group?",
   "o": [
    [
     "Delays",
     "Delays are vibrato, flanger, chorus and echo."
    ],
    [
     "Non-linear processing",
     "That group is compression, limiters, distortion, exciters/enhancers."
    ],
    [
     "Spatial effects",
     "Spatial effects are panning, reverb and surround sound."
    ],
    [
     "Time-varying filters",
     "Correct — wah-wah and phaser are listed as time-varying filters."
    ]
   ],
   "a": 3
  },
  {
   "q": "Which dynamic processor operates on <b>low</b> signal levels and <b>boosts</b> their dynamics for a more lively sound?",
   "o": [
    [
     "Limiter",
     "A limiter reacts quickly to control HIGH peaks above a threshold."
    ],
    [
     "Compressor",
     "A compressor reduces the dynamics (loud parts reduced)."
    ],
    [
     "Exciter",
     "An exciter changes timbre/brightness by adding subtle high-frequency content, not low-level dynamics."
    ],
    [
     "Expander",
     "Correct — the expander works on low levels and boosts their dynamics."
    ]
   ],
   "a": 3
  },
  {
   "q": "What is the structure of the classic <b>Schroeder</b> reverberator?",
   "o": [
    [
     "4 IIR comb filters in parallel followed by 2 allpass filters in series",
     "Correct — parallel comb banks then series allpass filters."
    ],
    [
     "2 comb filters in series followed by 4 allpass filters in parallel",
     "The counts and arrangements are swapped."
    ],
    [
     "Tapped delay lines plus lowpass filters inside the comb feedback loops",
     "Those are Moorer's (1976) additions, not Schroeder's original design."
    ],
    [
     "Convolution of the input with a recorded room impulse response",
     "That is convolution reverb, the other class of reverb simulation."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: there is an absolute rule for the order in which effects must be chained.",
   "o": [
    [
     "True",
     "The lecture says there is no absolute rule; it depends on the sound you want."
    ],
    [
     "False",
     "Correct — order matters (it can drastically change the output), but there is no absolute rule; a standard order is only a guide."
    ]
   ],
   "a": 1
  }
 ],
 "8": [
  {
   "q": "Convert the RGB pixel <b>(200, 100, 50)</b> to CMYK (values 0–1).",
   "o": [
    [
     "(0.2157, 0.6078, 0.8039, 0)",
     "That is the CMY result with K = 0; K = min(C, M, Y) must be extracted and subtracted."
    ],
    [
     "(0, 0.3922, 0.5882, 0.2157)",
     "Normalise: (0.7843, 0.3922, 0.1961). CMY = 1 − RGB = (0.2157, 0.6078, 0.8039). K = min = 0.2157; subtract K → (0, 0.3922, 0.5882, 0.2157)."
    ],
    [
     "(0.2157, 0.6078, 0.8039, 0.2157)",
     "K was found but not subtracted from C, M and Y."
    ],
    [
     "(0.7843, 0.3922, 0.1961, 0.1961)",
     "That keeps the normalised RGB values; CMY must first be computed as 1 − RGB."
    ]
   ],
   "a": 1
  },
  {
   "q": "What is the luminance Y of the pixel (R, G, B) = <b>(100, 200, 50)</b>?",
   "o": [
    [
     "116.7",
     "That is the plain average (350/3); Y uses the weights 0.299, 0.587, 0.114."
    ],
    [
     "153.0",
     "Y = 0.299×100 + 0.587×200 + 0.114×50 = 29.9 + 117.4 + 5.7 = 153.0."
    ],
    [
     "124.2",
     "That swaps the R and G weights (0.587×100 + 0.299×200 + 0.114×50); G gets the largest weight, 0.587."
    ],
    [
     "0.6",
     "That is Y after normalising to 0–1; YIQ/YUV luminance is computed directly on the 0–255 values here."
    ]
   ],
   "a": 1
  },
  {
   "q": "Original I = [20 40; 60 80], reconstructed I''' = [22 37; 60 84]. What is the <b>MSE</b>?",
   "o": [
    [
     "2.25",
     "That is the MAE (mean of |differences| = 9/4); MSE squares the differences."
    ],
    [
     "29",
     "That is the sum of squared errors; it must be divided by MN = 4."
    ],
    [
     "14.5",
     "That divides the sum of squared errors (29) by 2 instead of by MN = 4 pixels."
    ],
    [
     "7.25",
     "Differences −2, 3, 0, −4 → squares 4, 9, 0, 16 → sum 29 ÷ 4 pixels = 7.25."
    ]
   ],
   "a": 3
  },
  {
   "q": "A <b>10 × 10 RGB</b> image is compressed to <b>0.1 KB</b>. Using the course convention CR = compressed ÷ original × 100 % with 1 KB = 1024 B, CR ≈",
   "o": [
    [
     "33.33 %",
     "That uses 1 KB = 1000 B (100 B); the course uses 1024 B."
    ],
    [
     "292.97 %",
     "That is original ÷ compressed (the textbook convention); the course formula is compressed ÷ original."
    ],
    [
     "102.4 %",
     "That treats the image as greyscale (100 B); RGB uses 3 bytes per pixel."
    ],
    [
     "34.13 %",
     "Original = 10 × 10 × 3 = 300 B; compressed = 0.1 × 1024 = 102.4 B; 102.4/300 × 100 ≈ 34.13 %."
    ]
   ],
   "a": 3
  },
  {
   "q": "Using 4×4 dithering, a grey pixel of value <b>100</b> is remapped to 0–16 (× 17/256, round down) and compared with the dither matrix [0 8 2 10; 12 4 14 6; 3 11 1 9; 15 7 13 5]. How many of the 16 dots are set?",
   "o": [
    [
     "7",
     "That sets dots where the value is ≥ the entry (0–6); the rule is strictly greater than."
    ],
    [
     "10",
     "That is 16 − 6, the number of dots left blank."
    ],
    [
     "6",
     "100 × 17/256 = 6.64 → 6. A dot is set where 6 > entry, i.e. entries 0–5: six dots."
    ],
    [
     "100",
     "The pixel must first be remapped to 0–16; a 4×4 block has only 16 dots."
    ]
   ],
   "a": 2
  },
  {
   "q": "How large is an uncompressed <b>800 × 600</b>, <b>32-bit</b> (RGB + alpha) image? (1 KB = 1024 B)",
   "o": [
    [
     "1406.25 KB",
     "That is the 24-bit size; 32-bit adds a fourth (alpha) byte."
    ],
    [
     "468.75 KB",
     "468.75 KB is 800 × 600 × 1 B ÷ 1024, the 8-bit size. 32-bit stores 4 bytes per pixel: 1,920,000 B ÷ 1024 = 1875 KB."
    ],
    [
     "1875 KB",
     "800 × 600 × 4 B = 1,920,000 B ÷ 1024 = 1875 KB."
    ],
    [
     "15,000 KB",
     "That divides bits by 1024 without converting to bytes."
    ]
   ],
   "a": 2
  },
  {
   "q": "Compared with 4:4:4, what fraction of the samples (Y + Cb + Cr) does <b>4:2:2</b> chroma subsampling keep?",
   "o": [
    [
     "2/3",
     "Per 4 pixels: 4 Y + 2 Cb + 2 Cr = 8 samples instead of 12 → 2/3."
    ],
    [
     "1/2",
     "Keeping 1/2 (6 of 12 samples) is 4:1:1 or 4:2:0. 4:2:2 keeps 4 Y + 2 Cb + 2 Cr = 8 of 12 samples = 2/3."
    ],
    [
     "1/3",
     "That would keep only the luma; 4:2:2 keeps half of each chroma component."
    ],
    [
     "3/4",
     "Not a ratio from the lecture; 8 of 12 samples is 2/3."
    ]
   ],
   "a": 0
  },
  {
   "q": "Which image format was designed to <b>replace GIF</b> and supports up to 48 bits per pixel, gamma correction and an alpha channel?",
   "o": [
    [
     "PNG",
     "Correct. PNG (Portable Network Graphics) was meant to replace GIF: up to 48 bits per pixel, gamma correction, alpha channel and progressive display (L8, Image file formats)."
    ],
    [
     "TIFF",
     "TIFF uses tags to store many image types and is declining in popularity."
    ],
    [
     "BMP",
     "BMP is the Windows raster format (can store 24-bit bitmaps)."
    ],
    [
     "JPEG",
     "JPEG is a lossy format for photographic images, not a GIF replacement with alpha."
    ]
   ],
   "a": 0
  },
  {
   "q": "How does <b>S-Video</b> carry the picture?",
   "o": [
    [
     "On 2 lines: one for luminance and one for composite chrominance",
     "Correct — S-Video is the compromise between component and composite video."
    ],
    [
     "On 3 separate lines, one per colour primary",
     "Three separate signals, one per primary (RGB, YIQ or YUV), is component video, the best colour but most bandwidth. S-Video uses 2 lines."
    ],
    [
     "On 1 line with luminance and chrominance mixed into one carrier",
     "Mixing luminance and chrominance into one carrier is composite video, where some interference is inevitable. S-Video keeps luminance on its own line."
    ],
    [
     "As a digital stream with 4:2:0 subsampling",
     "S-Video is an analog signal format; chroma subsampling is a different topic."
    ]
   ],
   "a": 0
  },
  {
   "q": "True or False: interlacing effectively <b>doubles</b> the sampling frequency of video.",
   "o": [
    [
     "True",
     "The lecture says interlacing effectively HALVES the sampling frequency, which causes interlacing aliasing."
    ],
    [
     "False",
     "Correct — interlacing effectively halves the sampling frequency (one field holds only half the lines)."
    ]
   ],
   "a": 1
  }
 ]
};

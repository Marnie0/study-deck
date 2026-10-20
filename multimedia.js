// Multimedia (Dr. Abbass Rostomme, Prof. Dr. Mahmoud Gadalla). Lectures 1, 4 and 8 were checked against the doctor's slides; points marked ‡ are notes beyond the slides.
window.COURSES = window.COURSES || {};
COURSES.mm = {
 "id": "mm",
 "name": "Multimedia",
 "short": "Multimedia",
 "code": "CS253",
 "by": "Dr. Abbass Rostomme, Prof. Dr. Mahmoud Gadalla",
 "lectures": [
  {
   "n": 1,
   "title": "Introduction to Multimedia",
   "notes": [
    {
     "h": "What is multimedia?",
     "pts": [
      "<b>Computer-system definition</b>: computer information can be represented through <b>audio, video and animation</b> in addition to traditional media (text, graphics/drawings, images).",
      "<b>General (working) definition</b>: multimedia is the field concerned with the <b>computer-controlled integration</b> of text, graphics, drawings, still and moving images (video), animation, audio and any other media, where every type of information can be <b>represented, stored, transmitted and processed digitally</b>.",
      "<b>Multimedia application</b>: an application that uses a collection of multiple media sources, e.g. text, graphics, images, sound/audio, animation and/or video.",
      "Course outline (course intro): multimedia data (audio, graphics, images, video), signal processing (filtering, synthesis), MIDI, and compression (JPEG/GIF, MPEG video and audio). Recommended book: <i>Fundamentals of Multimedia</i>, Ze-Nian Li and Mark S. Drew."
     ]
    },
    {
     "h": "Hypertext and hypermedia",
     "pts": [
      "<b>Hypertext</b>: text which contains <b>links to other texts</b>. The term was invented by <b>Ted Nelson around 1965</b>.",
      "Figure (slide 6, HyperText): a stack of hypertext pages with red <b>hot spots</b>, joined by arrows that jump from page to page, and a box that reads: HyperText is <b>non-linear</b> documents. By clicking on <b>hot spots</b> in the text, the reader is immediately transported to related material in the document. <b>Content table-like views</b>, such as the one at the left, are provided. Navigation in the document is by hot spots or <b>\"overview\" mechanisms</b>.",
      "Traversal through hypertext pages is usually <b>non-linear</b>. This affects the layout and organisation of the material and depends a lot on the application.",
      "Figure (slide 7, HyperText Navigation): <b>Normal Text</b> is read <b>LINEAR</b>: an open book with arrows running across the lines and down the pages, in one order. <b>HyperText</b>: pages joined by curved arrows from hot spots on one page to other pages, so the reading order is non-linear.",
      "<b>Hypermedia</b>: not constrained to be text-based. It can include other media, e.g. graphics, images and especially <b>continuous media — sound and video</b>.",
      "Figure (slide 8, Hypermedia): four media around a centre, joined by two-way arrows: <b>Graphics</b> (top), <b>Sound</b> (left, a loudspeaker), <b>Text</b> (right, linked text pages) and <b>Video</b> (bottom, a video recorder and a TV), above a film strip labelled <b>HYPERMEDIA</b>.",
      "Hypermedia application examples: the <b>World Wide Web</b> (the clear example), PowerPoint, Adobe Acrobat (PDF software), Adobe Flash. Many many others?",
      "Multimedia application examples: WWW, multimedia authoring (Adobe/Macromedia Director), hypermedia courseware, video-on-demand, interactive TV, computer games, virtual reality, digital video editing and production systems, multimedia database systems. The later \"Applications\" slide adds video conferencing, groupware and home shopping."
     ],
     "fig": [
      "mm-hypertext",
      "mm-linear-hyper",
      "mm-hypermedia"
     ],
     "figAt": {
      "mm-hypertext": 1,
      "mm-linear-hyper": 3,
      "mm-hypermedia": 5
     },
     "figH": {
      "mm-hypertext": "Try it: click hot spots to jump between hypertext pages",
      "mm-linear-hyper": "Normal text read linearly vs hypertext read non-linearly",
      "mm-hypermedia": "Hypermedia: text, graphics, sound and video linked both ways"
     }
    },
    {
     "h": "Multimedia systems: definition and 4 characteristics",
     "pts": [
      "<b>Multimedia system</b>: a system capable of processing multimedia data and applications. It is characterised by the <b>processing, storage, generation, manipulation and rendition</b> of multimedia information.",
      "Four basic characteristics: (1) must be <b>computer controlled</b>; (2) are <b>integrated</b>; (3) the information they handle must be represented <b>digitally</b>; (4) the interface to the final presentation of media is usually <b>interactive</b>."
     ]
    },
    {
     "h": "Challenges and key issues",
     "pts": [
      "<b>Challenges</b>: distributed networks; <b>temporal relationship</b> between data; rendering different data at the same time, continuously; <b>sequencing within the media</b> (playing video frames in the correct order/time frame); <b>synchronisation</b> — inter-media scheduling, e.g. <b>lip synchronisation</b> of video and audio.",
      "How the slide groups them: two top-level challenges, <b>Distributed Networks</b> and <b>Temporal relationship between data</b>. Under the temporal relationship come: render different data at the same time, continuously; sequencing within the media (playing frames in correct order/time frame in video); synchronisation, inter-media scheduling.",
      "E.g. Video and Audio: <b>lip synchronisation</b> is clearly important for humans to watch playback of video and audio, and even <b>animation and audio</b>. (Ever tried watching an out of (lip) sync film for a long time?)",
      "<b>Key issues</b>: how to represent and store temporal information; how to strictly maintain temporal relationships on playback/retrieval; what processes are involved; data must be represented digitally (<b>analog–digital conversion, sampling</b>); <b>large data requirements</b> (bandwidth, storage) so <b>data compression is usually mandatory</b>."
     ],
     "fig": "mm-lipsync",
     "figAt": {
      "mm-lipsync": 2
     },
     "figH": {
      "mm-lipsync": "Try it: shuffle the frames or shift the audio and watch the lip sync break"
     }
    },
    {
     "h": "Desirable features of a multimedia system",
     "pts": [
      "Given the above challenges, the following features are desirable (<b>if not a prerequisite</b>) for a multimedia system.",
      "<b>Very high processing power</b> — for large data processing and real-time delivery; special hardware commonplace.",
      "<b>Multimedia-capable file system</b> — to deliver real-time media (video/audio streaming); special hardware/software e.g. <b>RAID</b>.",
      "<b>Data representations</b> — file formats that are easy to handle yet allow real-time compression/decompression.",
      "<b>Efficient and high I/O</b>: input and output to the <b>file subsystem</b> needs to be efficient and fast. Needs to allow for real-time recording as well as playback of data, e.g. direct-to-disk recording systems.",
      "<b>Special operating system</b>: to allow access to the file system and process data efficiently and quickly. Needs to support direct transfers to disk, real-time scheduling, fast interrupt processing, I/O streaming, etc.",
      "<b>Storage and memory</b>: large storage units (of the order of hundreds of Tb, if not more) and large memory (several Gb or more). Large caches are also required, and high-speed buses for efficient management.",
      "<b>Network support</b>: client-server systems are common, as distributed systems are common. <b>Software tools</b>: user-friendly tools to handle media, design/develop applications and deliver media."
     ]
    },
    {
     "h": "Components of a multimedia system (hardware and software)",
     "pts": [
      "<b>Capture devices</b>: video camera, video recorder, audio microphone, keyboards, mice, graphics tablets, 3D input devices, tactile sensors, VR devices, digitising hardware.",
      "<b>Storage devices</b>: hard disks, CD-ROMs, DVD-ROM, etc.",
      "<b>Communication networks</b>: local networks, intranets, Internet, multimedia or other special high-speed networks.",
      "<b>Computer systems</b>: multimedia desktop machines, workstations, MPEG/VIDEO/DSP hardware.",
      "<b>Display devices</b>: CD-quality speakers, HDTV, SVGA, hi-res monitors, colour printers."
     ]
    },
    {
     "h": "Multimedia data: input, format and size",
     "pts": [
      "<b>Text/static data</b>: from keyboard, speech input, OCR, disk. 1 byte per character (more for Unicode). Formats: raw text, HTML, RTF, Word, program source. <b>Not temporal</b> (but may have an implied sequence). Size not significant.",
      "Text is stored and input <b>character by character</b>: 1 byte per char, more bytes for Unicode. Other forms of data (e.g. spreadsheet files) may store format as text (with formatting); others may use <b>binary encoding</b>. Format examples: raw or formatted text, e.g. HTML, Rich Text Format (RTF), Word or a program language source (Java, Python, MATLAB etc.). Not temporal, <b>but</b> may have a natural implied sequence, e.g. HTML format sequence, sequence of C program statements. Size not significant w.r.t. other multimedia data.",
      "<b>Graphics</b>: built from <b>primitive objects</b> (lines, polygons, circles, curves, arcs); made by graphics editors (Illustrator) or programs (PostScript); <b>editable</b> (unlike images); standards OpenGL, PHIGS, GKS; files store the primitive assembly so storage is small.",
      "Graphics input devices: <b>keyboard</b> (for text and cursor control), <b>mouse</b>, <b>trackball</b> or <b>graphics tablet</b>. Graphics do not take up a very high storage overhead.",
      "<b>Images</b>: bitmap (grid of pixels); stored at <b>1 bit/pixel</b> (black and white), <b>8 bits/pixel</b> (grey scale, colour map) or <b>24 bits/pixel</b> (true colour).",
      "Images are still pictures which (uncompressed) are represented as a bitmap. Input: <b>digitally scanned</b> photographs/pictures or direct from a <b>digital camera</b>; may also be generated by programs \"similar\" to graphics or animation programs. Size: a 512 × 512 grey scale image takes up 1/4 MB, a 512 × 512 24-bit image takes 3/4 MB with no compression. This overhead soon increases with image size: a modern high digital camera of 10+ Megapixels ≈ 29 MB uncompressed! <b>Compression is commonly applied</b>.",
      "<b>Audio</b>: continuous analog signal, digitised from a microphone. <b>CD quality = 16-bit sampling at 44.1 kHz</b>; audiophile e.g. 24-bit, 96 kHz. 1 min mono CD ≈ 5 MB, stereo ≈ 10 MB. Usually compressed (MP3, AAC, FLAC, Ogg Vorbis).",
      "<b>Video</b>: a series of single images, typically <b>25, 30 or 50 frames per second</b>. Must usually be compressed.",
      "Video input: <b>analog video</b> is usually captured by a video camera and then <b>digitised</b>. There are a variety of video (analog and digital) formats. E.g. 512 × 512 monochrome video takes 25 × 0.25 = 6.25 MB for a second uncompressed; typical PAL digital video (720 × 576 pixels per colour frame) ≈ 1.24 × 25 = 31 MB per second; High Definition video on <b>Blu-ray</b> (up to 1920 × 1080 = <b>2 Megapixels per frame</b>) ≈ 6.2 × 25 = 155 MB per second uncompressed (there are higher possible frame rates!). Digital video <b>clearly needs to be compressed</b> for most times."
     ],
     "table": [
      [
       "Data",
       "Slide figure",
       "Check"
      ],
      [
       "512×512 grey (8-bit)",
       "1/4 MB",
       "512×512×1 B = 262,144 B = 0.25 MB (this row: 1 MB = 1024×1024 B)"
      ],
      [
       "512×512 24-bit",
       "3/4 MB",
       "262,144×3 = 786,432 B = 0.75 MB (1 MB = 1024×1024 B)"
      ],
      [
       "10 megapixel camera, 24-bit",
       "≈ 29 MB",
       "10,000,000×3 = 30,000,000 B ≈ 28.6 MB (1 MB = 1024×1024 B)"
      ],
      [
       "1 min mono CD audio",
       "5 MB",
       "44,100×2 B×60 = 5,292,000 B ≈ 5.05 MB (1 MB = 1024×1024 B)"
      ],
      [
       "1 min stereo CD audio",
       "10 MB",
       "×2 = 10,584,000 B ≈ 10.1 MB (1 MB = 1024×1024 B)"
      ],
      [
       "512×512 mono video, 25 fps",
       "6.25 MB/s",
       "25 × 0.25 MB = 6.25 MB (1 MB = 1024×1024 B, as in the first row)"
      ],
      [
       "PAL 720×576 colour, 25 fps",
       "≈ 31 MB/s",
       "720×576×3 = 1,244,160 B ≈ 1.24 MB × 25 ≈ 31 MB (here 1 MB = 1,000,000 B, as on the slide; ‡ with 1 MB = 1024×1024 B it is ≈ 29.7 MB)"
      ],
      [
       "HD 1920×1080 colour, 25 fps",
       "≈ 155 MB/s",
       "1920×1080×3 = 6,220,800 B ≈ 6.2 MB × 25 ≈ 155 MB (here 1 MB = 1,000,000 B, as on the slide; ‡ with 1 MB = 1024×1024 B it is ≈ 148 MB)"
      ]
     ],
     "fig": [
      "mm-data-size",
      "mm-frames"
     ],
     "figAt": {
      "mm-frames": 7
     },
     "figH": {
      "mm-data-size": "Try it: work out the raw size of images, audio and video",
      "mm-frames": "One second of raw video as 25, 30 or 50 single images"
     }
    },
    {
     "h": "Summary: the course is essentially about compression",
     "pts": [
      "<b>Lossless</b> compression: ideal (e.g. zip, unix compress) but <b>not good enough for MM data</b> (does not reduce size enough).",
      "<b>Lossy</b> compression: throw away non-essential (<b>perceptually less relevant</b>) parts of the data stream — FILTER the data somehow. Examples: MP3, JPEG, MPEG video/audio.",
      "<b>Compression via synthesis</b>: encode <b>how to make (synthesise)</b> the data, which can take far fewer bits in certain cases. Examples: vector graphics (Flash), MPEG video, MP4 (audio), <b>MIDI</b>.",
      "Slide 27 photos: two small <b>MIDI keyboards</b>, one connected to a laptop (with headphones) and one to an iPad, as examples of compression via synthesis (MIDI).",
      "Course summary note: lossless = zero error, high quality, low compression; lossy = some error, lower quality, higher compression (e.g. YouTube uses lossy)."
     ],
     "fig": [
      "mm-lossy-lossless",
      "mm-synthesis"
     ],
     "figAt": {
      "mm-lossy-lossless": 1,
      "mm-synthesis": 2
     },
     "figH": {
      "mm-lossy-lossless": "Lossless vs lossy compression, step by step",
      "mm-synthesis": "Try it: store the sound itself or the instructions to make it"
     }
    }
   ],
   "cards": [
    [
     "Multimedia (general definition)",
     "The field concerned with the computer-controlled integration of text, graphics, drawings, still and moving images, animation, audio and any other media, where every type of information can be represented, stored, transmitted and processed digitally."
    ],
    [
     "Multimedia application",
     "An application that uses a collection of multiple media sources, e.g. text, graphics, images, sound, animation and/or video."
    ],
    [
     "Hypertext",
     "Text which contains links to other texts. Term invented by Ted Nelson around 1965. Navigation is non-linear."
    ],
    [
     "Hypermedia",
     "Like hypertext but not text-only: includes graphics, images and continuous media such as sound and video. Example: the World Wide Web."
    ],
    [
     "Multimedia system",
     "A system capable of processing multimedia data and applications; characterised by processing, storage, generation, manipulation and rendition of multimedia information."
    ],
    [
     "4 characteristics of a multimedia system",
     "Computer controlled; integrated; information represented digitally; interface to the final presentation usually interactive."
    ],
    [
     "Lip synchronisation",
     "Inter-media synchronisation of video and audio so speech matches mouth movement; an example of the synchronisation challenge."
    ],
    [
     "Why is compression usually mandatory?",
     "Multimedia data has large requirements for bandwidth and storage."
    ],
    [
     "Image bit depths",
     "1 bit/pixel black and white; 8 bits/pixel grey scale or colour map; 24 bits/pixel true colour."
    ],
    [
     "CD-quality audio",
     "16-bit samples at 44.1 kHz. 1 minute mono ≈ 5 MB, stereo ≈ 10 MB uncompressed."
    ],
    [
     "Typical video frame rates",
     "25, 30 or 50 frames per second."
    ],
    [
     "Graphics vs images",
     "Graphics are built from primitives (lines, polygons, circles, curves, arcs), usually editable or revisable, and small, since the file stores only how the primitives are assembled; images are pixel bitmaps, not editable or revisable in that way (unlike graphics), and large, so compression is commonly applied."
    ],
    [
     "Lossless vs lossy",
     "Lossless (zip) keeps all data but is not enough for MM data; lossy throws away perceptually less relevant data (MP3, JPEG, MPEG)."
    ],
    [
     "Compression via synthesis",
     "Send instructions for how to make the data instead of the data itself: vector graphics (Flash), MPEG video, MP4 audio, MIDI."
    ]
   ],
   "qa": [
    [
     "What are the four basic characteristics of a multimedia system?",
     "1) It must be computer controlled. 2) It is integrated. 3) The information it handles must be represented digitally. 4) The interface to the final presentation of media is usually interactive."
    ],
    [
     "What are the challenges and key issues for multimedia systems?",
     "Challenges: distributed networks, temporal relationships between data, rendering different data at the same time continuously, sequencing within media (frames in the right order and time) and inter-media synchronisation such as lip sync. Key issues: representing and storing temporal information, strictly maintaining temporal relationships on playback, the processes involved, digital representation (A/D conversion, sampling) and large data requirements, which make compression usually mandatory."
    ],
    [
     "List the desirable features of a multimedia system.",
     "Very high processing power; a multimedia-capable file system (e.g. RAID) for streaming; data representations/file formats allowing real-time compression and decompression; efficient high I/O (direct-to-disk recording); a special operating system (real-time scheduling, fast interrupts, I/O streaming); large storage and memory with caches and fast buses; network support (client-server); user-friendly software tools."
    ],
    [
     "Differentiate between hypertext and hypermedia and give examples.",
     "Hypertext is text containing links to other texts (Ted Nelson, about 1965), navigated non-linearly. Hypermedia is not constrained to text: it includes graphics, images and continuous media like sound and video. Examples of hypermedia: the WWW, PowerPoint, Adobe Acrobat, Adobe Flash."
    ],
    [
     "Why is lossless compression not enough for multimedia data, and what alternatives exist?",
     "Lossless methods like zip keep every bit, so they cannot shrink huge audio/image/video data enough. Lossy methods throw away perceptually less relevant parts (filtering), e.g. MP3, JPEG, MPEG. Another route is compression via synthesis: encode how to create the data (vector graphics, MIDI, MP4 audio)."
    ]
   ],
   "quiz": [
    {
     "q": "Which is NOT one of the four basic characteristics of a multimedia system?",
     "o": [
      [
       "Computer controlled",
       "Being computer controlled is characteristic 1 of a multimedia system, so it IS one of the four. The odd one out is analog representation (L1, Multimedia systems)."
      ],
      [
       "Integrated",
       "Being integrated (text, images, audio, video combined) is characteristic 2, so it is one of the four. Characteristic 3 says the information must be digital, not analog."
      ],
      [
       "Information represented in analog form",
       "Correct. Multimedia information must be represented digitally, not in analog form."
      ],
      [
       "Usually interactive interface to the final presentation",
       "An interactive interface to the final presentation is characteristic 4, so it belongs to the list. The option that breaks the list is analog representation (L1, Multimedia systems)."
      ]
     ],
     "a": 2
    },
    {
     "q": "The term \"hypertext\" was invented by:",
     "o": [
      [
       "Tim Berners-Lee around 1990",
       "Tim Berners-Lee built the World Wide Web around 1990, a hypermedia application that uses hypertext; the term itself came 25 years earlier from Ted Nelson."
      ],
      [
       "Ted Nelson around 1965",
       "Correct. The lecture defines hypertext as text containing links to other texts and says the term was invented by Ted Nelson around 1965 (L1, Hypertext and hypermedia)."
      ],
      [
       "Harry Nyquist around 1928",
       "Harry Nyquist is the name behind the sampling theorem (fs ≥ 2·fmax, L4), not hypertext. The lecture credits Ted Nelson, around 1965."
      ],
      [
       "Alan Kay around 1970",
       "Alan Kay is not linked to hypertext in the lecture (he is known for Smalltalk and the Dynabook idea). The slide credits Ted Nelson around 1965."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which is described as \"a clear example of a hypermedia application\"?",
     "o": [
      [
       "A plain text editor",
       "A plain text editor handles only unlinked text: it is not even hypertext, let alone hypermedia, which adds images, sound and video to links (L1, Hypertext and hypermedia)."
      ],
      [
       "The World Wide Web",
       "Correct. The WWW links text, images, sound and video."
      ],
      [
       "A compiler",
       "A compiler translates program source into machine code; it does not link media together, so it is not hypermedia. The slide's clear example is the WWW."
      ],
      [
       "A RAID array",
       "RAID is storage hardware for multimedia file systems."
      ]
     ],
     "a": 1
    },
    {
     "q": "Lip synchronisation is an example of which multimedia challenge?",
     "o": [
      [
       "Synchronisation — inter-media scheduling",
       "Correct. The slide lists synchronisation (inter-media scheduling) as a challenge and gives lip sync as its example: video frames and audio must stay in step (L1, Challenges)."
      ],
      [
       "Large data requirements",
       "Large data requirements is a key issue about bandwidth and storage (why compression is mandatory); it is about size, not keeping audio and video in step."
      ],
      [
       "Distributed networks",
       "Distributed networks is a separate challenge (data spread over machines); lip sync is the lecture's example of inter-media synchronisation."
      ],
      [
       "Data representation",
       "Data representation (file formats allowing real-time compression) is listed among desirable features, not challenges; lip sync illustrates synchronisation."
      ]
     ],
     "a": 0
    },
    {
     "q": "An uncompressed 512 × 512 grey-scale (8-bit) image needs about:",
     "o": [
      [
       "1/8 MB",
       "1/8 MB = 131,072 B would mean only 4 bits per pixel. An 8-bit grey image uses 1 byte per pixel: 512 × 512 × 1 B = 262,144 B = 1/4 MB."
      ],
      [
       "1/4 MB",
       "Correct. 512 × 512 × 1 byte = 262,144 B = 0.25 MB."
      ],
      [
       "3/4 MB",
       "3/4 MB is the 24-bit (true colour) version: 512 × 512 × 3 B = 786,432 B. A grey-scale image uses 1 byte per pixel, giving 1/4 MB."
      ],
      [
       "2 MB",
       "2 MB is 8 times too big; it would need 64 bits per pixel. At 8 bits: 512 × 512 × 1 B = 262,144 B = 0.25 MB (L1, Multimedia data)."
      ]
     ],
     "a": 1
    },
    {
     "q": "True colour images are stored at:",
     "o": [
      [
       "1 bit per pixel",
       "1 bit per pixel only stores black or white. The slide lists true colour as 24 bits per pixel (L1, Multimedia data)."
      ],
      [
       "8 bits per pixel",
       "8 bits per pixel is grey scale or a colour map (palette of 256 entries), not true colour. True colour needs 24 bits."
      ],
      [
       "16 bits per pixel",
       "16 bits per pixel is not one of the depths on the slide (1, 8 and 24 bits); 16 bits cannot give a full 8 bits to each of R, G and B."
      ],
      [
       "24 bits per pixel",
       "Correct. True colour uses 24 bits per pixel: 8 bits each for red, green and blue, so 2<sup>24</sup> ≈ 16.7 million colours (L1, Multimedia data)."
      ]
     ],
     "a": 3
    },
    {
     "q": "One minute of uncompressed stereo CD-quality audio requires about:",
     "o": [
      [
       "5 MB",
       "5 MB is one minute of MONO CD audio (44,100 × 2 B × 60 ≈ 5.05 MB). Stereo has 2 channels, so it doubles to about 10 MB."
      ],
      [
       "10 MB",
       "Correct. 44,100 × 2 bytes × 2 channels × 60 s = 10,584,000 B ≈ 10 MB."
      ],
      [
       "1.4 MB",
       "1.4 MB is far too small: stereo CD audio is 176,400 B per second, so 10 s alone is already about 1.7 MB. (1.41 is the CD bit rate in Mbit/s, not MB per minute.)"
      ],
      [
       "155 MB",
       "155 MB is about one second of uncompressed HD video (1920 × 1080 × 3 B × 25), not a minute of audio; stereo CD audio is about 10 MB/min."
      ]
     ],
     "a": 1
    },
    {
     "q": "Typical PAL digital video (720 × 576, colour, 25 fps) needs about how much per second uncompressed?",
     "o": [
      [
       "6.25 MB",
       "6.25 MB/s is 512 × 512 monochrome video (0.25 MB × 25). PAL is larger and in colour: 720 × 576 × 3 B × 25 ≈ 31 MB/s."
      ],
      [
       "31 MB",
       "Correct. 720 × 576 × 3 B ≈ 1.24 MB per frame × 25 ≈ 31 MB."
      ],
      [
       "155 MB",
       "155 MB/s is HD 1920 × 1080 colour video (≈ 6.2 MB per frame × 25), not PAL 720 × 576, which is about 31 MB/s."
      ],
      [
       "1.24 MB",
       "1.24 MB is the size of ONE PAL frame (720 × 576 × 3 B); per second you multiply by 25 frames, giving about 31 MB."
      ]
     ],
     "a": 1
    },
    {
     "q": "Why is lossless compression (e.g. zip) described as \"not good enough\" for multimedia data?",
     "o": [
      [
       "It loses too much quality",
       "Lossless compression keeps every bit and loses no quality at all; losing quality describes lossy methods (MP3, JPEG). Its weakness is too little size reduction."
      ],
      [
       "It does not reduce the size of MM data enough",
       "Correct. MM data is huge, so lossy methods that drop perceptually less relevant data are needed."
      ],
      [
       "It is illegal for audio",
       "Nothing in the lecture makes lossless compression illegal for audio (FLAC is even a lossless audio format). The problem is that it does not shrink MM data enough."
      ],
      [
       "It only works on video",
       "Zip and unix compress work on any file, not only video. The lecture's point is that on MM data they do not reduce size enough (L1, Summary)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which is an example of \"compression via synthesis\"?",
     "o": [
      [
       "MIDI",
       "Correct. MIDI sends instructions to synthesise the sound, not the sound itself."
      ],
      [
       "Zip",
       "Zip is general-purpose lossless compression: it stores the data itself more compactly. Synthesis sends instructions for making the data, as MIDI does."
      ],
      [
       "WAV",
       "WAV stores the raw sampled audio (PCM samples), i.e. the sound itself, so it is not compression via synthesis. MIDI is the slide's example."
      ],
      [
       "Bitmap image",
       "A bitmap stores every pixel value; the synthesis counterpart is vector graphics (Flash), which stores how to draw the picture (L1, Summary)."
      ]
     ],
     "a": 0
    },
    {
     "q": "Graphics (unlike images) are:",
     "o": [
      [
       "Stored as a grid of pixels",
       "A grid of pixels is a bitmap image. Graphics are stored as primitives (lines, polygons, circles, arcs) assembled into a picture (L1, Multimedia data)."
      ],
      [
       "Built from primitives and usually editable, with low storage overhead",
       "Correct. Graphics are built from primitive objects (lines, polygons, curves, arcs), are editable unlike images, and files store only the primitive assembly, so storage is small (L1, Multimedia data)."
      ],
      [
       "Always larger than images",
       "The opposite: graphics files store only the primitives, so they are usually much smaller than pixel images of the same picture."
      ],
      [
       "Captured with a microphone",
       "A microphone captures audio. Graphics are made in editors (Illustrator) or by programs (PostScript), input with keyboard, mouse or tablet."
      ]
     ],
     "a": 1
    },
    {
     "q": "A \"multimedia-capable file system\" typically needs special hardware/software such as:",
     "o": [
      [
       "RAID technology",
       "Correct. The slide gives RAID as the example."
      ],
      [
       "OCR",
       "OCR (optical character recognition) is a text input method listed under text data, not file-system hardware. The slide's example is RAID."
      ],
      [
       "OpenGL",
       "OpenGL is a graphics standard (with PHIGS, GKS), not a storage technology for real-time streaming; the slide gives RAID."
      ],
      [
       "MIDI",
       "MIDI is a music protocol that sends instructions to synthesise sound, not file-system hardware. The multimedia-capable file system example is RAID."
      ]
     ],
     "a": 0
    }
   ]
  },
  {
   "n": 2,
   "title": "DSP, Filters and the Fourier Transform",
   "notes": [
    {
     "h": "Waveforms and the sine wave",
     "pts": [
      "<b>Frequency</b> = number of cycles per second, measured in <b>Hertz (Hz)</b>. <b>Period</b> T = 1/f (e.g. 8 Hz → T = 1/8 = 0.125 s).",
      "<b>Wavelength</b> is <b>inversely proportional</b> to frequency (wavelength varies as 1/frequency): higher frequency → shorter wavelength.",
      "General (sampled) sine wave used in the course: <b>y = A·sin(2π·n·F<sub>w</sub>/F<sub>s</sub>)</b>, where A = amplitude, F<sub>w</sub> = frequency of the wave, F<sub>s</sub> = sample frequency, n = sample index. MATLAB <code>sin()</code> works in <b>radians</b> (2π rad = 360° = one complete cycle).",
      "A sine wave is described by three quantities: <b>amplitude</b>, <b>frequency</b> and <b>phase</b>: z(t) = a·sin(ω·t + φ). Changing the phase shifts the wave along the time axis (sinphasedemo plots the x-axis in degrees: 0, 90, 180, 270, 360 …).",
      "A <b>cosine is a sine wave 90° out of phase</b>.",
      "<b>Worked example</b>: F<sub>w</sub> = 1000 Hz, F<sub>s</sub> = 8000 Hz → F<sub>w</sub>/F<sub>s</sub> = 1/8, so one cycle takes 8 samples. n = 1: y = A·sin(π/4) = 0.7071A; n = 2: y = A·sin(π/2) = A; n = 4: y = A·sin(π) = 0."
     ],
     "fig": [
      "mm-period",
      "mm-sine-abc",
      "mm-phase-demo",
      "mm-sampled-sine"
     ],
     "figAt": {
      "mm-period": 1,
      "mm-sine-abc": 3,
      "mm-phase-demo": 4,
      "mm-sampled-sine": 5
     },
     "figH": {
      "mm-period": "Frequency, period and wavelength: change f and watch each cycle shrink",
      "mm-sine-abc": "Amplitude, frequency and phase of z = a·sin(ωt + φ)",
      "mm-phase-demo": "sinphasedemo: a sine shifted by a phase, and the cosine at 90°",
      "mm-sampled-sine": "The sampled sine y = A·sin(2π·n·Fw/Fs), sample by sample"
     }
    },
    {
     "h": "The decibel (dB), dynamic range and SNR",
     "pts": [
      "Power/intensity in decibels: <b>X<sub>dB</sub> = 10·log<sub>10</sub>(X / X<sub>0</sub>)</b>. X = measured value, X<sub>0</sub> = reference level; X and X<sub>0</sub> must have the <b>same dimensions and units</b>.",
      "The reference level is always <b>0 dB</b> (X = X<sub>0</sub> → log<sub>10</sub>(1) = 0). X > X<sub>0</sub> → positive dB (power increase); X &lt; X<sub>0</sub> → negative dB (power decrease).",
      "Why dB? Logarithmic units are used when there is a <b>large range</b> in frequency or magnitude (the slides even show the chilli heat scale as a wide dynamic range example).",
      "Power magnitude = |X(i)|<sup>2</sup>, so X<sub>dB</sub> = 10·log<sub>10</sub>(|X(i)|<sup>2</sup>) = <b>20·log<sub>10</sub>(|X(i)|)</b>: use 10·log for power, 20·log for amplitude.",
      "In acoustics the 0 dB reference is typically the <b>threshold of human perception</b>. The ratio of max to min power the ear handles is above a trillion (10<sup>12</sup>) → log = 12 → <b>120 dB = threshold of pain</b>.",
      "The ear is most sensitive between <b>2 and 4 kHz (speech)</b>; <b>frequency weighting</b> factors these more heavily. Filtering into bands in this range is used for speech analysis, modelling human hearing and audio compression (MPEG audio).",
      "<b>Digital noise: 6 dB per bit</b> (linear PCM). The first bit (LSB) gives residual quantisation noise; each extra bit doubles resolution = 10·log<sub>10</sub>(4) ≈ 6 dB. 16-bit: 15 × 6 = <b>90 dB</b> dynamic range; 8-bit: 7 × 6 = <b>42 dB</b>; difference 48 dB = 48/6 = <b>8 times as noisy</b> (as the slide words it).",
      "<b>Signal-to-noise ratio</b>: SNR = P<sub>signal</sub>/P<sub>noise</sub> = (A<sub>signal</sub>/A<sub>noise</sub>)<sup>2</sup>, P = average power, A = RMS amplitude, measured at equivalent points and in the same bandwidth. SNR<sub>dB</sub> = 10·log<sub>10</sub>(P<sub>s</sub>/P<sub>n</sub>) = 20·log<sub>10</sub>(A<sub>s</sub>/A<sub>n</sub>)."
     ],
     "table": [
      [
       "Given",
       "Formula",
       "Result"
      ],
      [
       "Power ratio 100",
       "10·log<sub>10</sub>(100)",
       "20 dB"
      ],
      [
       "Power ratio 10<sup>12</sup>",
       "10·log<sub>10</sub>(10<sup>12</sup>)",
       "120 dB (pain)"
      ],
      [
       "Power ratio 2",
       "10·log<sub>10</sub>(2)",
       "≈ 3.01 dB"
      ],
      [
       "Amplitude ratio 10",
       "20·log<sub>10</sub>(10)",
       "20 dB"
      ],
      [
       "Amplitude ratio 100 (SNR)",
       "20·log<sub>10</sub>(100)",
       "40 dB"
      ],
      [
       "Power ratio 0.5",
       "10·log<sub>10</sub>(0.5)",
       "≈ −3.01 dB"
      ]
     ],
     "fig": [
      "mm-db-scale",
      "mm-bits-db",
      "mm-db-calc"
     ],
     "figAt": {
      "mm-db-scale": 4,
      "mm-bits-db": 6,
      "mm-db-calc": 7
     },
     "figH": {
      "mm-db-scale": "Why decibels: the ear's 10¹² power range becomes 0 to 120 dB",
      "mm-bits-db": "6 dB per bit: dynamic range of 8-bit and 16-bit PCM",
      "mm-db-calc": "dB and SNR calculator for power and amplitude ratios"
     }
    },
    {
     "h": "Signal flow graphs: delay, multiply, add",
     "pts": [
      "DSP algorithms are drawn as <b>signal flow graphs</b> and described by an equation. Three building blocks: <b>Delay</b>, <b>Multiplication</b>, <b>Summation</b>.",
      "<b>Delay</b> of one sampling interval: a block labelled <b>T</b>: y(n) = x(n − 1). Two T blocks in series: y(n) = x(n − 2).",
      "<b>Multiplication</b> (weighting): a circle with <b>×</b> and coefficient a: y(n) = a·x(n), e.g. a = 0.5 halves the signal.",
      "<b>Addition</b>: a circle with <b>+</b>: y(n) = a<sub>1</sub>·x<sub>1</sub>(n) + a<sub>2</sub>·x<sub>2</sub>(n); with a<sub>1</sub> = a<sub>2</sub> = 1: y(n) = x<sub>1</sub>(n) + x<sub>2</sub>(n).",
      "Complete example: <b>y(n) = ½x(n) + ⅓x(n − 1) + ¼x(n − 2)</b> (two delays, three multipliers, one adder). Its <b>impulse response</b> (input 1, 0, 0, …) is ½, ⅓, ¼, 0, 0, … (finite).",
      "<b>Worked example</b>: input x = 2, 4, 6 (then zeros) into that filter:<br>y(0) = ½·2 = 1<br>y(1) = ½·4 + ⅓·2 = 2 + 0.667 = 2.667<br>y(2) = ½·6 + ⅓·4 + ¼·2 = 3 + 1.333 + 0.5 = 4.833<br>y(3) = ⅓·6 + ¼·4 = 2 + 1 = 3<br>y(4) = ¼·6 = 1.5, then 0."
     ],
     "fig": [
      "mm-sfg-blocks",
      "mm-sfg-run"
     ],
     "figAt": {
      "mm-sfg-blocks": 3,
      "mm-sfg-run": 5
     },
     "figH": {
      "mm-sfg-blocks": "The three building blocks: delay, multiply and add on a signal",
      "mm-sfg-run": "The complete example filter run on 2, 4, 6 sample by sample"
     }
    },
    {
     "h": "Filtering; IIR and FIR systems",
     "pts": [
      "<b>Filtering</b> (broad sense) = selecting portion(s) of data for some processing: <b>remove</b> it (low-pass, high-pass …), <b>attenuate</b> it (enhance or diminish, e.g. equalisation, effects/synthesis), or <b>process it in other ways</b>.",
      "Removal of data is essential in almost all <b>lossy</b> representations: JPEG, MPEG video, MPEG audio. In audio we also filter for tone (treble/bass), equalisation (EQ) and subtractive synthesis.",
      "Two ways to filter: in the <b>temporal domain</b> (e.g. sampled PCM audio, via impulse responses) or in the <b>frequency domain</b> (analyse the frequency components).",
      "<b>IIR (Infinite Impulse Response)</b>: the output is <b>fed back</b> through weighted delays and summed into the new output → a <b>recursive</b> (feedback) system. Simple: y(n) = x(n) − a<sub>1</sub>y(n − 1) − a<sub>2</sub>y(n − 2). General: <b>y(n) = x(n) − Σ<sub>k=1..M</sub> a<sub>k</sub>·y(n − k)</b>.",
      "<b>FIR (Finite Impulse Response)</b>: simpler, <b>no feedback loop</b>; the input goes through delay elements and a weighted sum gives the output. Simple: y(n) = b<sub>0</sub>x(n) + b<sub>1</sub>x(n − 1) + b<sub>2</sub>x(n − 2). General with N − 1 feed-forward delays: <b>y(n) = Σ<sub>k=0..N−1</sub> b<sub>k</sub>·x(n − k)</b>.",
      "<b>IIR worked example</b>: y(n) = x(n) − a<sub>1</sub>y(n − 1) with a<sub>1</sub> = −0.5 (so y(n) = x(n) + 0.5y(n − 1)). Impulse input 1, 0, 0, … gives 1, 0.5, 0.25, 0.125, … — it never becomes exactly zero, hence \"infinite\" impulse response.",
      "Filters are two coefficient vectors <b>A = {a<sub>k</sub>}</b> (feedback) and <b>B = {b<sub>k</sub>}</b> (feed-forward). MATLAB <code>filter(B,A,X)</code> implements a \"Direct Form II Transposed\" IIR/FIR hybrid: a(1)y(n) = b(1)x(n) + … + b(nb+1)x(n − nb) − a(2)y(n − 1) − … − a(na+1)y(n − na). If a(1) ≠ 1 the coefficients are normalised by a(1); a(1) = 0 gives an error.",
      "Filter banks can be <b>hand-created</b> (e.g. IIRdemo.m: cut-off fg = 4000 Hz, sampling fa = 48000 Hz, k = tan(π·fg/fa), 2nd-order coefficients b(1..3), a(1..3) with a(1) = 1) or made by MATLAB functions: <code>butter, buttord, besself, cheby1, cheby2, ellip</code>. Applying by hand uses state variables xh1, xh2, yh1, yh2 in a loop; <code>filter()</code> is preferable because it is general (any filter length)."
     ],
     "code": "for n=1:N\n  y(n)=b(1)*x(n) + b(2)*xh1 + b(3)*xh2 - a(2)*yh1 - a(3)*yh2;\n  xh2=xh1; xh1=x(n);\n  yh2=yh1; yh1=y(n);\nend;",
     "fig": [
      "mm-iir-graph",
      "mm-fir-graph",
      "mm-impulse",
      "mm-filter-ba",
      "mm-iirdemo"
     ],
     "figAt": {
      "mm-iir-graph": 3,
      "mm-fir-graph": 4,
      "mm-impulse": 5,
      "mm-filter-ba": 6,
      "mm-iirdemo": 7
     },
     "figH": {
      "mm-iir-graph": "The IIR signal flow graph: output fed back through weighted delays",
      "mm-fir-graph": "The FIR signal flow graph: N − 1 feed-forward delays, no feedback",
      "mm-impulse": "Impulse responses: IIR never reaches zero, FIR stops",
      "mm-filter-ba": "MATLAB filter(B, A, X) computed sample by sample",
      "mm-iirdemo": "IIRdemo.m: the coefficients and the loop's state variables"
     }
    },
    {
     "h": "Frequency domain and the Fourier Transform",
     "pts": [
      "The <b>Fourier Transform (FT)</b> converts a temporal (time) or spatial description into the <b>frequency domain</b>: we think in terms of underlying sinusoids of varying <b>frequency, amplitude and phase</b>, not sample/pixel intensities.",
      "Applications: filtering, noise removal, signal/image analysis, simple implementation of <b>convolution</b>, audio/image effects, restoration (deblurring), compression (MPEG, JPEG use related techniques).",
      "1D audio example: a piano chord can be described in the <b>temporal domain</b> (amplitude sampled many times a second) or the <b>frequency domain</b> (pitches of the notes and their amplitudes). Chord fundamentals: D♭ 554.40 Hz, F 698.48 Hz, A♭ 830.64 Hz, C 1046.56 Hz, plus harmonics.",
      "An <b>8 Hz sine wave</b> completes 8 cycles per second; its spectrum has <b>one peak at 8 Hz</b> with magnitude 1.0 (the whole signal).",
      "Images: brightness along a line can be recorded at equally spaced distances or at a set of <b>spatial frequencies</b>; an image gives a 2D grid of spatial frequencies. <b>Large high-frequency components</b> → data changing rapidly over short distances (e.g. a page of text; noise also gives very high frequencies). <b>Large low-frequency components</b> → large-scale features dominate (e.g. one simple object filling the image).",
      "<b>Sinusoidal decomposition</b>: any digital signal can be decomposed into sine waves of different amplitude, frequency and phase that add back to the original. Example (additive synthesis): a 200 Hz square(ish) wave = sinusoids at <b>200, 600, 1000 Hz …</b> (odd multiples).",
      "Filtering in frequency space = attenuating or removing frequencies: <b>low-pass</b> (ignore high-frequency noise, keep low), <b>high-pass</b> (opposite), <b>band-pass</b> (only a range). Think of a <b>graphic equaliser</b>.",
      "Maths tools recalled: sin(−x) = −sin(x) (odd), cos(−x) = cos(x) (even); phasor r·e<sup>iφ</sup> = r(cos φ + i sin φ); ∫e<sup>kx</sup>dx = e<sup>kx</sup>/k."
     ],
     "fig": [
      "mm-chord",
      "mm-8hz",
      "mm-image-line",
      "mm-additive",
      "mm-eq"
     ],
     "figAt": {
      "mm-chord": 2,
      "mm-8hz": 3,
      "mm-image-line": 4,
      "mm-additive": 5,
      "mm-eq": 6
     },
     "figH": {
      "mm-chord": "The piano chord in the temporal and frequency domains",
      "mm-8hz": "An 8 Hz sine and its single spectral peak",
      "mm-image-line": "Spatial frequencies along an image line: object, text and noise",
      "mm-additive": "Adding 200, 600, 1000 Hz … sines into a square(ish) wave",
      "mm-eq": "Filtering as a graphic equaliser: low-pass, high-pass, band-pass"
     }
    },
    {
     "h": "FT formulas, DFT and spectra",
     "pts": [
      "<b>1D FT</b>: F(u) = ∫ f(x)·e<sup>−2πixu</sup> dx (from −∞ to ∞). F(u) is generally <b>complex</b> even for real data: both magnitude and <b>phase</b> matter; e<sup>−2πixu</sup> is a phasor.",
      "<b>Inverse FT</b>: f(x) = ∫ F(u)·e<sup>+2πixu</sup> du — same form, but the exponent sign is opposite (positive).",
      "<b>Top-hat example</b>: f(x) = 1 for |x| ≤ 1, 0 otherwise → F(u) = (−1/2πiu)(e<sup>−2πiu</sup> − e<sup>2πiu</sup>) = <b>sin(2πu)/(πu)</b>, the <b>sinc function</b>. It is purely real because f is <b>even</b> (symmetric in x and −x). Peak value at u → 0 is 2 (the area of the top hat); zeros at u = ±0.5, ±1, ±1.5 …",
      "<b>2D FT</b> (images): F(u,v) = ∬ f(x,y)·e<sup>−2πi(xu+yv)</sup> dx dy; inverse uses +.",
      "<b>DFT</b> (digitised data): replace the integral by a sum over N equally spaced samples: <b>F(u) = (1/N) Σ<sub>x=0..N−1</sub> f(x)·e<sup>−2πixu/N</sup></b>, inverse f(x) = Σ F(u)·e<sup>2πixu/N</sup>. Differences from continuous: factor 1/N inside the exponent and 1/N in front of the forward transform only.",
      "2D DFT on an N × M grid: F(u,v) = (1/NM) ΣΣ f(x,y)e<sup>−2πi(xu/N+yv/M)</sup>. For square images (N = M) it is rebalanced with 1/N in front of both forward and inverse.",
      "MATLAB: <code>fft(X)</code> 1D (on a matrix: per column, NOT 2D), <code>fft2(X)</code> 2D, <code>fftn(X)</code> N-D; inverses <code>ifft, ifft2, ifftn</code>.",
      "<b>Magnitude spectrum</b>: |F(k)| = √(F<sub>R</sub>(k)<sup>2</sup> + F<sub>I</sub>(k)<sup>2</sup>) (MATLAB <code>abs(fft(X,N))/N</code>). <b>Phase spectrum</b>: φ = arctan(F<sub>I</sub>(k)/F<sub>R</sub>(k)) (<code>angle</code>). Example: F = 3 + 4i → |F| = 5, φ = arctan(4/3) ≈ 53.13°.",
      "<b>Sample point → frequency</b>: <b>f<sub>k</sub> = k·f<sub>s</sub>/N</b>, equidistant steps of f<sub>s</sub>/N from 0 to (N−1)f<sub>s</sub>/N Hz. Example: f<sub>s</sub> = 8000 Hz, N = 256 → step 31.25 Hz, k = 32 → 1000 Hz.",
      "<b>Spectrogram</b> (time-frequency): split the signal into segments and do a windowed <b>Short-Time Fourier Transform (STFT)</b>; a <b>Blackman, Hamming or Hanning</b> window reduces the leakage effect. MATLAB <code>spectrogram(y,512,20,1024,Fs)</code>. Aphex Twin famously hid images (his face) in the spectrogram of tracks on the Windowlicker EP."
     ],
     "fig": [
      "mm-sinc",
      "mm-dft",
      "mm-mag-phase",
      "mm-bin-freq",
      "mm-spectrogram"
     ],
     "figAt": {
      "mm-sinc": 2,
      "mm-dft": 4,
      "mm-mag-phase": 7,
      "mm-bin-freq": 8,
      "mm-spectrogram": 9
     },
     "figH": {
      "mm-sinc": "The Fourier transform of a top hat is the sinc function",
      "mm-dft": "The DFT sum as phasors added head to tail",
      "mm-mag-phase": "Magnitude and phase of F = FR + iFI",
      "mm-bin-freq": "From DFT sample point k to frequency fk = k·fs/N",
      "mm-spectrogram": "Building a spectrogram with a windowed STFT, and leakage"
     }
    },
    {
     "h": "Filtering in the frequency domain",
     "pts": [
      "Noise (audio hiss, \"salt and pepper\" in images, transmission noise e.g. from a low-power space probe) = spurious <b>high frequencies</b> (rapid local transitions). So a <b>low-pass filter</b>, tuned properly, reduces noise. Not all high-frequency data is noise though.",
      "Procedure: <b>G(u,v) = H(u,v)·F(u,v)</b>: F = FT of the image, H = filter function, G = FT of improved image; then inverse FT G to get g(x,y). (MATLAB: <code>G = H.*F</code>.)",
      "<b>Ideal low-pass</b> (1D): H(u) = 1 for 0 ≤ u ≤ u<sub>0</sub> (cut-off), 0 elsewhere — a top hat. 2D: H(u,v) = 1 if √(u<sup>2</sup> + v<sup>2</sup>) ≤ w<sub>0</sub>, else 0 (keep a circle of radius w<sub>0</sub>). Example: w<sub>0</sub> = 20, (u,v) = (12,16) → √400 = 20 → kept; (15,16) → √481 ≈ 21.9 → discarded.",
      "Problem: useful high frequencies exist too (audio: high pitches, cymbals, rustles; images: <b>edges</b>). Choosing the cut-off is hard (like choosing a threshold). A wrong/low cut-off <b>blurs</b>: audio becomes <b>muffled</b>, image edges blurred; the lower the cut-off, the worse.",
      "<b>Butterworth low-pass</b>: <b>H(u,v) = 1 / (1 + [(u<sup>2</sup> + v<sup>2</sup>)/w<sub>0</sub><sup>2</sup>]<sup>n</sup>)</b>, n = order. It is a <b>smoothed top hat</b> (blurred circle in 2D): keeps some high-frequency information and so <b>reduces blurring</b>/ringing compared with the ideal filter. At the cut-off H = 1/2; 2nd order at twice the cut-off: 1/(1 + 4<sup>2</sup>) = 1/17 ≈ 0.059.",
      "Noise is added in MATLAB with <code>imnoise()</code>; a lower cut-off removes more noise but blurs more.",
      "Other filters: <b>high-pass</b> (select above u<sub>0</sub>; usually defined as <b>1 − low-pass = 1 − H</b>), <b>band-pass</b> (keep u<sub>0</sub>…u<sub>1</sub>), <b>band-reject</b> (attenuate u<sub>0</sub>…u<sub>1</sub>), <b>notch</b> (attenuate a narrow band around u<sub>0</sub>), <b>resonator</b> (amplify a narrow band around u<sub>0</sub>)."
     ],
     "fig": [
      "mm-lpf-1d",
      "mm-ideal-2d",
      "mm-butter",
      "mm-image-lpf",
      "mm-other-filters"
     ],
     "figAt": {
      "mm-lpf-1d": 1,
      "mm-ideal-2d": 2,
      "mm-butter": 4,
      "mm-image-lpf": 5,
      "mm-other-filters": 6
     },
     "figH": {
      "mm-lpf-1d": "Low-pass filtering G = H·F on a noisy signal, step by step",
      "mm-ideal-2d": "The ideal 2D low-pass: is (u, v) inside the circle of radius w0?",
      "mm-butter": "Ideal vs Butterworth low-pass, in 1D and 2D",
      "mm-image-lpf": "Filtering the slides' images with fft2: ideal, Butterworth, high-pass",
      "mm-other-filters": "High-pass, band-pass, band-reject, notch and resonator shapes"
     }
    },
    {
     "h": "Convolution, the convolution theorem and deconvolution",
     "pts": [
      "Effects described by convolution: <b>filtering</b> (Fourier filtering is convolution with a low-pass filter), <b>deblurring</b> (high-pass filtering), <b>reverb</b> (impulse response convolution); edge detection was a discrete example.",
      "<b>1D convolution</b>: f(x) * g(x) = ∫ f(α)·g(x − α) dα. g(−α) is the reflection of g in the y-axis and g(x − α) is that shifted right by x; the integral is the <b>area of overlap</b>.",
      "Example: f = top hat (1 for |α| ≤ 1), g = ½ for 0 ≤ α ≤ 1. Result: (x + 1)/2 for −1 ≤ x ≤ 0; ½ for 0 ≤ x ≤ 1; 1 − x/2 for 1 ≤ x ≤ 2; 0 otherwise (no overlap for x ≤ −1 or x ≥ 2). Check: x = −0.5 → 0.25; x = 1.5 → 0.25.",
      "<b>Convolution theorem</b>: the FT of f(x) * g(x) is simply the <b>product F(u)·G(u)</b>. Convolution in frequency space is easy (multiply), which is why <code>G = H.*F</code> works.",
      "Fast convolution / <b>deconvolution</b>: FT the audio/image, FT the system's effect, <b>multiply</b> to apply an effect (e.g. reverb) or <b>divide</b> to remove/compensate for it, then inverse FT. Dividing a Butterworth-blurred image by H (<code>Ghigh = G./H</code>) acts like a high-pass filter and recovers F in the ideal case.",
      "In the real world the exact blurring function H is unknown, and noise makes deconvolution fail (noise gets amplified): <b>deconvolution is not always that simple</b>."
     ],
     "fig": [
      "mm-convolve",
      "mm-conv-theorem",
      "mm-deconv"
     ],
     "figAt": {
      "mm-convolve": 2,
      "mm-conv-theorem": 3,
      "mm-deconv": 5
     },
     "figH": {
      "mm-convolve": "Convolving the two top hats: reflect, shift, measure the overlap",
      "mm-conv-theorem": "The convolution theorem checked: direct sum vs F·G",
      "mm-deconv": "Deconvolution by G./H, and how noise breaks it"
     }
    }
   ],
   "cards": [
    [
     "Frequency",
     "Number of cycles per second, measured in Hertz (Hz). Period T = 1/f."
    ],
    [
     "Wavelength vs frequency",
     "Wavelength is inversely proportional to frequency."
    ],
    [
     "Sampled sine wave formula",
     "y = A.sin(2*pi*n*Fw/Fs): A amplitude, Fw wave frequency, Fs sample frequency, n sample index."
    ],
    [
     "Decibel formula",
     "XdB = 10 log10(X/X0) for power; 20 log10 for amplitude. The reference level is 0 dB."
    ],
    [
     "Threshold of pain",
     "120 dB: max/min power ratio about 10^12, log = 12."
    ],
    [
     "Digital noise per bit",
     "About 6 dB per bit (10 log10 4). 16-bit = 90 dB, 8-bit = 42 dB dynamic range."
    ],
    [
     "SNR",
     "Psignal/Pnoise = (Asignal/Anoise)^2; in dB: 10 log10 of power ratio = 20 log10 of RMS amplitude ratio."
    ],
    [
     "Three signal flow graph building blocks",
     "Delay (T block), Multiplication (x circle), Summation (+ circle)."
    ],
    [
     "IIR filter",
     "Infinite impulse response: output fed back through weighted delays (recursive). y(n) = x(n) - sum ak y(n-k)."
    ],
    [
     "FIR filter",
     "Finite impulse response: no feedback; weighted sum of delayed inputs. y(n) = sum bk x(n-k)."
    ],
    [
     "DFT bin to frequency",
     "fk = k * fs / N."
    ],
    [
     "Fourier transform of a top hat",
     "The sinc function sin(2*pi*u)/(pi*u), purely real because the top hat is even."
    ],
    [
     "Butterworth low-pass filter",
     "H = 1/(1 + [(u^2+v^2)/w0^2]^n); a smoothed top hat that blurs less than the ideal filter."
    ],
    [
     "High-pass from low-pass",
     "High-pass = 1 - low-pass (1 - H)."
    ],
    [
     "Convolution theorem",
     "FT of f*g equals F(u)G(u): convolution in space/time is multiplication in frequency."
    ]
   ],
   "qa": [
    [
     "Compare IIR and FIR filters.",
     "IIR (infinite impulse response) filters feed the output back through weighted delays and sum it into the new output, so they are recursive and their impulse response never ends: y(n) = x(n) - sum(k=1..M) ak y(n-k). FIR filters have no feedback loop; the input passes through delay elements and a weighted sum of the delayed inputs gives the output, so the impulse response is finite: y(n) = sum(k=0..N-1) bk x(n-k). FIR is the simpler of the two."
    ],
    [
     "Why are decibels used, and why is 16-bit audio said to have a 90 dB dynamic range?",
     "dB is a logarithmic scale for quantities with a very large range (e.g. the ear's 10^12 power range = 120 dB). In linear PCM the first bit only gives quantisation noise and each further bit doubles resolution, which is 10 log10(4) = about 6 dB. 16-bit audio has 15 bits beyond the first, so 15 x 6 = 90 dB between quantisation noise and clipping (8-bit gives 7 x 6 = 42 dB)."
    ],
    [
     "Explain how an image is low-pass filtered using the Fourier transform, and the problem with the ideal low-pass filter.",
     "Compute F(u,v) = FT of the image, multiply by a filter H(u,v) to get G = H.F, then inverse-transform G to get the filtered image. The ideal filter keeps all frequencies inside radius w0 and discards the rest. Because edges and other useful detail are also high frequency, a badly chosen (too low) cut-off blurs edges in images and muffles audio. A Butterworth filter (smoothed top hat) keeps some high frequencies and reduces the blurring."
    ],
    [
     "State the convolution theorem and explain how it is used for deconvolution.",
     "The Fourier transform of f(x)*g(x) is F(u)G(u). So to apply an effect (e.g. reverb) we multiply the transforms; to remove an effect (e.g. blur) we take the FT of the degraded data and of the system's effect, divide, and inverse transform. This is deconvolution. In practice the exact blurring function is unknown and noise makes it hard."
    ],
    [
     "What does the frequency domain tell us about an image or sound?",
     "It shows which sinusoids (frequency, amplitude, phase) make up the signal. For a sound it gives the pitches and their amplitudes (e.g. an 8 Hz sine has one peak at 8 Hz). For an image, large high-frequency components mean rapid changes over short distances (text, edges, noise); large low-frequency components mean large-scale features dominate."
    ]
   ],
   "quiz": [
    {
     "q": "In y = A·sin(2π·n·F<sub>w</sub>/F<sub>s</sub>), what is F<sub>s</sub>?",
     "o": [
      [
       "The frequency of the wave",
       "The frequency of the wave is F<sub>w</sub>. F<sub>s</sub> is the sample frequency, so F<sub>w</sub>/F<sub>s</sub> gives the fraction of a cycle per sample (L2, Sine waves)."
      ],
      [
       "The sample frequency",
       "Correct. F<sub>s</sub> is the sampling frequency; n is the sample index."
      ],
      [
       "The amplitude",
       "The amplitude is A, the factor in front of sin(). F<sub>s</sub> in the denominator is the sample frequency (L2, Sine waves)."
      ],
      [
       "The phase",
       "Phase is not a separate term in this form of the formula."
      ]
     ],
     "a": 1
    },
    {
     "q": "A sound has 1000 times the power of the reference level. Its level is:",
     "o": [
      [
       "3 dB",
       "3 dB is a power ratio of only 2 (10·log<sub>10</sub>2 ≈ 3.01). A ratio of 1000 = 10<sup>3</sup> gives 10 × 3 = 30 dB."
      ],
      [
       "30 dB",
       "Correct. For power, X<sub>dB</sub> = 10·log<sub>10</sub>(X/X<sub>0</sub>) = 10·log<sub>10</sub>(1000) = 10 × 3 = 30 dB (L2, The decibel)."
      ],
      [
       "60 dB",
       "That would be 20·log<sub>10</sub>(1000), the amplitude formula, but this is a power ratio."
      ],
      [
       "1000 dB",
       "1000 is the raw ratio, not decibels. dB is logarithmic: 10·log<sub>10</sub>(1000) = 30 dB."
      ]
     ],
     "a": 1
    },
    {
     "q": "Using \"6 dB per bit\", the dynamic range of 16-bit linear PCM audio is:",
     "o": [
      [
       "96 dB",
       "That is 16 × 6. The lecture counts only the 15 bits beyond the first (the LSB only gives quantisation noise)."
      ],
      [
       "90 dB",
       "Correct. The lecture counts 6 dB per bit, but the first bit (LSB) only gives quantisation noise, so 16-bit gives 15 × 6 = 90 dB (L2, The decibel)."
      ],
      [
       "42 dB",
       "42 dB is the 8-bit figure (7 × 6). For 16 bits the lecture's rule gives 15 × 6 = 90 dB."
      ],
      [
       "48 dB",
       "That is the difference between 16-bit and 8-bit."
      ]
     ],
     "a": 1
    },
    {
     "q": "The quoted threshold of pain for humans is about:",
     "o": [
      [
       "12 dB",
       "The log of 10<sup>12</sup> is 12, but dB multiplies by 10."
      ],
      [
       "60 dB",
       "60 dB is a power ratio of only 10<sup>6</sup>. The ear's range is above 10<sup>12</sup>, so the pain threshold is 10 × 12 = 120 dB."
      ],
      [
       "120 dB",
       "Correct. A power ratio above 10<sup>12</sup> → 10 × 12 = 120 dB."
      ],
      [
       "1200 dB",
       "1200 dB multiplies by 10 twice. 10·log<sub>10</sub>(10<sup>12</sup>) = 10 × 12 = 120 dB, the quoted threshold of pain."
      ]
     ],
     "a": 2
    },
    {
     "q": "For the filter y(n) = ½x(n) + ⅓x(n − 1) + ¼x(n − 2) with input x = 2, 4, 6, what is y(2)?",
     "o": [
      [
       "3",
       "That is only ½·6; the delayed terms are missing."
      ],
      [
       "4.833",
       "Correct. ½·6 + ⅓·4 + ¼·2 = 3 + 1.333 + 0.5 = 4.833."
      ],
      [
       "2.667",
       "2.667 is y(1) = ½·4 + ⅓·2. y(2) uses the current input 6 and both delayed inputs: ½·6 + ⅓·4 + ¼·2 = 4.833."
      ],
      [
       "6",
       "The filter weights the inputs, it does not copy them."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which filter has a feedback loop (recursive system)?",
     "o": [
      [
       "FIR",
       "FIR has no feedback; it only uses delayed inputs."
      ],
      [
       "IIR",
       "Correct. The output y(n − k) is fed back through weighted delays."
      ],
      [
       "Both",
       "Only IIR is recursive. FIR passes the input through delays and a weighted sum with no feedback loop (L2, IIR and FIR)."
      ],
      [
       "Neither",
       "IIR is a feedback (recursive) system: y(n) = x(n) − Σ a<sub>k</sub>·y(n − k) feeds past outputs back into the new output."
      ]
     ],
     "a": 1
    },
    {
     "q": "The impulse response of y(n) = x(n) + 0.5y(n − 1) is:",
     "o": [
      [
       "1, 0.5, 0, 0, …",
       "The feedback keeps producing non-zero values."
      ],
      [
       "1, 0.5, 0.25, 0.125, … (never ends)",
       "Correct. Each output is half the previous one: an infinite impulse response (IIR)."
      ],
      [
       "1, 1, 1, …",
       "1, 1, 1, … would need a feedback coefficient of 1 (y(n) = x(n) + y(n − 1)). With 0.5 each output halves the previous one."
      ],
      [
       "0.5, 0.25, 0.125, …",
       "This skips the first output: y(0) = x(0) + 0.5·y(−1) = 1 + 0 = 1, so the response starts 1, 0.5, 0.25, …"
      ]
     ],
     "a": 1
    },
    {
     "q": "With f<sub>s</sub> = 8000 Hz and an N = 256 point DFT, which frequency does sample point k = 32 represent?",
     "o": [
      [
       "32 Hz",
       "k = 32 is the sample-point index, not a frequency. Convert with f<sub>k</sub> = k·f<sub>s</sub>/N = 32 × 8000 / 256 = 1000 Hz."
      ],
      [
       "250 Hz",
       "250 Hz is f<sub>s</sub>/k = 8000/32, the wrong formula. The rule is f<sub>k</sub> = k·f<sub>s</sub>/N = 32 × 8000 / 256 = 1000 Hz."
      ],
      [
       "1000 Hz",
       "Correct. f<sub>k</sub> = k·f<sub>s</sub>/N = 32 × 8000 / 256 = 1000 Hz (steps of 31.25 Hz)."
      ],
      [
       "8000 Hz",
       "8000 Hz is the sampling frequency itself; the DFT points step through 0 to (N − 1)f<sub>s</sub>/N in steps of 31.25 Hz, so k = 32 is 1000 Hz."
      ]
     ],
     "a": 2
    },
    {
     "q": "The Fourier transform of a top hat function is:",
     "o": [
      [
       "Another top hat",
       "No; the ideal low-pass filter is a top hat in frequency space, but the FT of a top hat is a sinc."
      ],
      [
       "The sinc function sin(2πu)/(πu)",
       "Correct. It is purely real because the top hat is even."
      ],
      [
       "A single spike",
       "A single spike is the spectrum of a pure sine."
      ],
      [
       "A square wave",
       "A square wave is a sum of odd harmonics (e.g. 200, 600, 1000 Hz), so its spectrum is a set of spikes. The top hat transforms to the sinc sin(2πu)/(πu)."
      ]
     ],
     "a": 1
    },
    {
     "q": "Why does an ideal low-pass filter with a low cut-off blur an image?",
     "o": [
      [
       "Because it amplifies noise",
       "A low-pass filter removes high-frequency noise rather than amplifying it; the blur comes from also discarding edge frequencies (L2, Filtering in the frequency domain)."
      ],
      [
       "Because edges also contribute high frequencies, which are discarded",
       "Correct. Edges are rapid transitions, so removing high frequencies blurs them (and muffles audio)."
      ],
      [
       "Because it changes the image colours",
       "The filter acts on spatial frequencies, not colour values; it blurs because edges (rapid transitions) are high-frequency data that gets cut."
      ],
      [
       "Because it removes low frequencies",
       "A low-pass filter KEEPS the low frequencies and removes those above the cut-off; removing low frequencies is a high-pass filter."
      ]
     ],
     "a": 1
    },
    {
     "q": "A high-pass filter is usually defined from a low-pass filter H as:",
     "o": [
      [
       "H<sup>2</sup>",
       "H<sup>2</sup> is still a low-pass filter (1 in the pass band, 0 above the cut-off), so it does not swap the bands. High pass = 1 − H."
      ],
      [
       "1/H",
       "Dividing by H is used for deconvolution, not the standard high-pass definition."
      ],
      [
       "1 − H",
       "Correct. The lecture defines the high-pass filter as 1 − low pass: where H keeps a frequency (1) it removes it (0), and vice versa (L2, Filtering in the frequency domain)."
      ],
      [
       "H − 1",
       "H − 1 runs from −1 to 0, the negative of the high-pass filter, which would flip the sign of the kept frequencies. The definition is 1 − H."
      ]
     ],
     "a": 2
    },
    {
     "q": "The convolution theorem states that the Fourier transform of f(x) * g(x) equals:",
     "o": [
      [
       "F(u) + G(u)",
       "Addition in time is addition in frequency, not convolution."
      ],
      [
       "F(u)·G(u)",
       "Correct. Convolution becomes a simple product in frequency space."
      ],
      [
       "F(u)/G(u)",
       "Division is used to undo an effect (deconvolution)."
      ],
      [
       "F(u) * G(u)",
       "Convolving the transforms would correspond to multiplying f and g in the original domain, not convolving them."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which window is NOT one of the windows named for the Short-Time Fourier Transform?",
     "o": [
      [
       "Blackman",
       "Blackman IS one of the windows the lecture names for the STFT (Blackman, Hamming, Hanning) to reduce leakage; Butterworth is a filter."
      ],
      [
       "Hamming",
       "Hamming is one of the three STFT windows named (Blackman, Hamming, Hanning) to reduce the leakage effect, so it is not the odd one out."
      ],
      [
       "Hanning",
       "Hanning is one of the three STFT windows named on the spectrogram slide; the odd one out is Butterworth, a low-pass filter design."
      ],
      [
       "Butterworth",
       "Correct. Butterworth is a filter, not an STFT window."
      ]
     ],
     "a": 3
    }
   ]
  },
  {
   "n": 3,
   "title": "Multimedia Data Basics",
   "notes": [
    {
     "h": "What multimedia systems deal with",
     "pts": [
      "Multimedia systems/applications deal with the <b>generation, manipulation, storage, presentation and communication</b> of information/data.",
      "Recall: all data must be in <b>digital</b> form, in a variety of formats: text, graphics, images, audio, video.",
      "Most of this data is <b>large</b> and the different media may need <b>synchronisation</b>: the data usually has <b>temporal relationships</b> as an integral property."
     ]
    },
    {
     "h": "Static (discrete) vs continuous media",
     "pts": [
      "<b>Static / discrete media</b>: <b>time independent</b>. Examples: normal data, text, single images, graphics.",
      "<b>Continuous media</b>: <b>time dependent</b>. Examples: video, animation and audio."
     ],
     "fig": [
      "mm-l3-media-time"
     ],
     "figAt": {
      "mm-l3-media-time": 1
     },
     "figH": {
      "mm-l3-media-time": "Static media stay the same over time; continuous media change on one clock"
     }
    },
    {
     "h": "Analog and digital signals, ADC and DAC",
     "pts": [
      "The world we sense is full of <b>analog</b> signals. Electrical sensors (<b>transducers</b>) convert what they sense into electrical signals: thermocouples (temperature), microphones (acoustic), cameras (light).",
      "<b>Analog</b>: continuous signals that must be converted (digitised) for computer processing. <b>Digital</b>: discrete signals the computer can readily deal with.",
      "<b>ADC (Analog-to-Digital Converter)</b>: special hardware that takes analog signals from an analog sensor (e.g. microphone) and digitally samples them (e.g. a sound card).",
      "<b>DAC (Digital-to-Analog Converter)</b>: the converse, used for playback. Takes a digital signal (possibly modified, e.g. volume change, equalisation) and outputs an analog signal for an analog output device (loudspeaker, RGB monitor).",
      "Course summary: ADC = <b>sampling</b> (continuous → discrete in time) + <b>quantisation</b> (discrete → digital values). Digital = sampling + quantisation."
     ],
     "fig": [
      "mm-l3-sensors",
      "mm-l3-adc-dac",
      "mm-l3-digital"
     ],
     "figAt": {
      "mm-l3-sensors": 0,
      "mm-l3-adc-dac": 3,
      "mm-l3-digital": 4
     },
     "figH": {
      "mm-l3-sensors": "Transducers turn temperature, sound and light into electrical signals",
      "mm-l3-adc-dac": "Record with the ADC, modify the numbers, play back with the DAC",
      "mm-l3-digital": "Digital = sampling + quantisation, step by step"
     }
    },
    {
     "h": "Analog-to-digital-to-analog pipeline",
     "pts": [
      "Pipeline: <b>Analog conditioning → ADC → Digital processing → DAC → Analog conditioning</b>.",
      "<b>Anti-aliasing filters</b> (a major part of analog conditioning) are needed at the <b>input</b> to remove frequencies above the sampling limit that would cause aliasing.",
      "After the anti-aliasing filter, the ADC <b>quantises</b> the continuous input into discrete levels.",
      "After digital processing, the DAC converts discrete levels into continuous voltages or currents.",
      "The output must also be filtered with a <b>low-pass filter</b> to remove the aliases (images) from the sampling. Further processing (filtering, mixing) may follow but is not covered."
     ],
     "fig": [
      "mm-l3-pipeline"
     ],
     "figAt": {
      "mm-l3-pipeline": 4
     },
     "figH": {
      "mm-l3-pipeline": "The signal at every stage of the A-D-A pipeline, with or without its filters"
     }
    },
    {
     "h": "Capturing and storing each medium",
     "pts": [
      "Text, graphics and some images are generated directly by computer/device (e.g. drawing programs) in a binary format and <b>do not require digitising</b>.",
      "Printed (and some handwritten) text can be scanned via <b>OCR</b>; handwriting can be digitised by electronic pen sensing; printed images can be flatbed scanned.",
      "<b>Text</b>: keyboard, speech input, OCR, disk. <b>1 byte per character</b> (ASCII), more for Unicode. Spreadsheets may be text (CSV) or binary. Formatted text: HTML, RTF, Word, program source. Not temporal but may have an implied sequence. Size not significant. Compression (zip, RAR, 7-zip) is convenient for archiving, but general-purpose compressors may not work well for audio, images or video.",
      "<b>Graphics</b>: composed of primitives (lines, polygons, circles, curves, arcs); made by editors (Illustrator, Freehand) or programs (PostScript); input by keyboard, mouse, trackball, tablet; <b>selectable and editable</b> (unlike images); low storage. Standard: <b>OpenGL</b> (cross-language, cross-platform API for 2D/3D graphics).",
      "<b>Animation</b>: a sequence of slightly changed graphics. 2D (Flash): <b>key-frame interpolation — tweening</b> of motion and shape. 3D (Maya): changes of shape, texture, position, lighting, camera. Graphics animation is <b>compact</b>, so suitable for network transmission."
     ],
     "fig": [
      "mm-l3-capture",
      "mm-l3-text-bytes",
      "mm-l3-vector-bitmap",
      "mm-l3-tween"
     ],
     "figAt": {
      "mm-l3-capture": 1,
      "mm-l3-text-bytes": 2,
      "mm-l3-vector-bitmap": 3,
      "mm-l3-tween": 4
     },
     "figH": {
      "mm-l3-capture": "Which sources need digitising, and how each gets in",
      "mm-l3-text-bytes": "Text byte by byte: 1 byte per ASCII character, more for Unicode",
      "mm-l3-vector-bitmap": "Edit the slide's drawing as graphics primitives, then as pixels",
      "mm-l3-tween": "Tweening: two key frames, the in-betweens computed"
     }
    },
    {
     "h": "Images, audio and video data sizes",
     "pts": [
      "<b>Images</b>: bitmap (grid of pixels, shown on the slide as a 10×10 grid of grey values 35–132). Input from scanner or digital camera, or generated by programs. <b>1 bit/pixel</b> (B/W), <b>8 bits</b> (grey scale, colour map), <b>24 bits</b> (true colour). 512×512 grey = 1/4 MB; 512×512 24-bit = 3/4 MB; 10+ megapixel camera ≈ 29 MB uncompressed. Usually only individual/groups of pixels can be edited (Photoshop).",
      "<b>Audio</b>: continuous analog, from microphones then digitised. CD quality = <b>16-bit at 44.1 kHz</b>; audiophile 24-bit, 96 kHz. 1 min mono CD = 5 MB; stereo = 10 MB. Usually compressed (MP3, AAC, FLAC, Ogg Vorbis).",
      "<b>Video</b>: captured by a camera (digital cameras now digitise too). Raw video = a series of images at <b>25, 30 or 50 fps</b>.",
      "Video sizes (uncompressed, per second): 512×512 monochrome: 25 × 0.25 = <b>6.25 MB</b>; PAL 720×576 colour: ≈ 1.2 × 25 = <b>30 MB</b>; HD Blu-ray 1920×1080 (≈2 megapixels): ≈ 6 × 25 = <b>150 MB</b>, i.e. about <b>9 GB per minute</b>. (Lecture 1 quotes the same examples as 31 MB and 155 MB using 1.24 and 6.2 MB per frame.)"
     ],
     "formula": [
      "Image size (bytes) = width × height × bits per pixel / 8",
      "Video data rate = frame size × frames per second",
      "Audio size (bits) = sample rate × bits per sample × channels × seconds"
     ],
     "fig": [
      "mm-l3-bitmap",
      "mm-l3-video-rate"
     ],
     "figAt": {
      "mm-l3-bitmap": 0,
      "mm-l3-video-rate": 3
     },
     "figH": {
      "mm-l3-bitmap": "The slide's 10×10 bitmap of grey values, and what it costs per bit depth",
      "mm-l3-video-rate": "Uncompressed video per second and per minute at 25, 30 or 50 fps"
     }
    },
    {
     "h": "Worked size calculations",
     "pts": [
      "<b>HD minute</b>: 1920 × 1080 × 3 B = 6,220,800 B per frame; × 25 = 155,520,000 B/s; × 60 = 9,331,200,000 B ≈ <b>9.3 GB</b> (the slide rounds 150 MB/s × 60 = 9 GB).",
      "<b>PAL frame</b>: 720 × 576 = 414,720 pixels × 3 B = 1,244,160 B ≈ 1.2 MB.",
      "<b>10 megapixel photo</b>: 10,000,000 × 3 B = 30,000,000 B = 28.6 MB (with 1 MB = 1,048,576 B) ≈ 29 MB.",
      "<b>1 min mono CD audio</b>: 44,100 × 16 bits × 1 × 60 = 42,336,000 bits = 5,292,000 B ≈ 5.05 MB."
     ],
     "fig": [
      "mm-l3-worked"
     ],
     "figH": {
      "mm-l3-worked": "The four worked size sums, one line at a time"
     }
    },
    {
     "h": "Roadmap: general themes",
     "pts": [
      "Coming topics: digital audio, audio synthesis, MIDI, audio effects, graphics/image formats, colour representation and human colour perception, digital video, chroma subsampling.",
      "General themes: sampling/digitisation; sampling artefacts — <b>aliasing</b>; compression requirements; data formats, especially size; <b>human perception → compression ideas</b>; building up to full multimedia compression algorithms."
     ]
    }
   ],
   "cards": [
    [
     "5 things MM systems deal with",
     "Generation, manipulation, storage, presentation and communication of data."
    ],
    [
     "Static (discrete) media",
     "Time-independent media: text, single images, graphics."
    ],
    [
     "Continuous media",
     "Time-dependent media: video, animation, audio."
    ],
    [
     "Transducer examples",
     "Thermocouple (temperature), microphone (acoustic), camera (light)."
    ],
    [
     "ADC",
     "Analog-to-Digital Converter: samples and quantises an analog sensor signal into digital data (e.g. sound card)."
    ],
    [
     "DAC",
     "Digital-to-Analog Converter: turns digital data back into a continuous signal for speakers or monitors."
    ],
    [
     "A-D-A pipeline order",
     "Analog conditioning (anti-aliasing filter) → ADC → digital processing → DAC → analog conditioning (low-pass filter)."
    ],
    [
     "Anti-aliasing filter",
     "Low-pass filter at the input that removes frequencies above the sampling limit so they cannot alias."
    ],
    [
     "Tweening",
     "Key-frame interpolation of motion and shape used in 2D animation (e.g. Flash)."
    ],
    [
     "OpenGL",
     "Open Graphics Library: a cross-language, cross-platform API standard for 2D/3D graphics."
    ],
    [
     "Text storage",
     "1 byte per character (ASCII); more bytes for Unicode."
    ],
    [
     "HD video uncompressed",
     "About 150 MB per second, about 9 GB per minute (1920×1080, 25 fps)."
    ],
    [
     "Digital = ?",
     "Sampling (time discretisation) + quantisation (amplitude discretisation)."
    ]
   ],
   "qa": [
    [
     "Differentiate between static and continuous media with examples.",
     "Static (discrete) media are time independent: text, single images, graphics. Continuous media are time dependent: video, animation and audio. Continuous media need temporal relationships and synchronisation to be maintained."
    ],
    [
     "Describe the analog-to-digital-to-analog pipeline.",
     "Analog input first passes analog conditioning, mainly an anti-aliasing low-pass filter that removes frequencies above the sampling limit. The ADC samples and quantises it into discrete levels. The digital data is processed. A DAC converts the discrete levels back to continuous voltages or currents, and a low-pass filter removes the aliases created by sampling before the analog output."
    ],
    [
     "Compare the storage needs of text, graphics, images, audio and video.",
     "Text: 1 byte per character, size not significant. Graphics: store primitives, low overhead. Images: 1, 8 or 24 bits per pixel, e.g. 512x512 24-bit = 3/4 MB. Audio: CD quality 16-bit 44.1 kHz, about 5 MB per mono minute. Video: series of images at 25-50 fps, e.g. HD about 150 MB per second, so compression is essential."
    ],
    [
     "Why is graphics animation suitable for network transmission?",
     "Because it is compact: it stores primitives and key frames and interpolates (tweens) between them instead of storing every frame as pixels."
    ]
   ],
   "quiz": [
    {
     "q": "Which of these is a continuous (time-dependent) medium?",
     "o": [
      [
       "Text",
       "Text is static (discrete) media: time independent, so its meaning does not depend on playback timing. Continuous media are audio, video and animation (L3, Static vs continuous media)."
      ],
      [
       "A single image",
       "A single image is static media, listed with text and graphics as time independent; only audio, video and animation are continuous."
      ],
      [
       "Audio",
       "Correct. Audio, video and animation are time dependent."
      ],
      [
       "Graphics",
       "Graphics are static media (time independent). They become continuous only when sequenced as animation (L3, Static vs continuous media)."
      ]
     ],
     "a": 2
    },
    {
     "q": "Which device converts a digital signal back into an analog signal for a loudspeaker?",
     "o": [
      [
       "ADC",
       "The ADC works in the other direction: it samples an analog signal (e.g. from a microphone) into digital form. Playback needs the DAC."
      ],
      [
       "DAC",
       "Correct. The DAC (Digital-to-Analog Converter) takes a digital signal, possibly modified, and outputs an analog signal for an analog device such as a loudspeaker (L3, ADC and DAC)."
      ],
      [
       "OCR",
       "OCR scans printed text into characters, an input method for text; it has nothing to do with driving a loudspeaker."
      ],
      [
       "RAID",
       "RAID is storage hardware for a multimedia-capable file system (L1); it does not convert digital signals to analog."
      ]
     ],
     "a": 1
    },
    {
     "q": "Where are anti-aliasing filters placed in the A-D-A pipeline?",
     "o": [
      [
       "Only after the DAC",
       "A low-pass filter is also needed there, but the anti-aliasing filter is needed at the input."
      ],
      [
       "At the input, before the ADC",
       "Correct. They remove frequencies above the sampling limit before sampling."
      ],
      [
       "Inside the digital processing block only",
       "Anti-aliasing must act on the analog signal before sampling: once frequencies above the limit are sampled, the aliases are already in the digital data and cannot be separated."
      ],
      [
       "They are not needed",
       "They are needed: without removing frequencies above the sampling limit at the input, those frequencies appear as false lower frequencies (aliasing) (L3, A-D-A pipeline)."
      ]
     ],
     "a": 1
    },
    {
     "q": "In the pipeline, which component quantises the continuous input into discrete levels?",
     "o": [
      [
       "Anti-aliasing filter",
       "The anti-aliasing filter only removes frequencies above the sampling limit; it leaves the signal analog and continuous. The ADC does the quantising."
      ],
      [
       "ADC",
       "Correct. After the anti-aliasing filter, the ADC quantises the continuous input into discrete levels (sampling + quantisation) (L3, A-D-A pipeline)."
      ],
      [
       "DAC",
       "The DAC converts discrete levels back to continuous."
      ],
      [
       "Loudspeaker",
       "The loudspeaker is the analog output device at the end of the pipeline, fed by the DAC; it does no quantising."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which data type usually does NOT require digitising?",
     "o": [
      [
       "Sound from a microphone",
       "A microphone produces a continuous analog signal, so sound must be digitised (sampled and quantised by an ADC, e.g. a sound card)."
      ],
      [
       "Video from an analog camera",
       "An analog camera gives a continuous analog video signal, which must be digitised before the computer can store or process it."
      ],
      [
       "Graphics created in a drawing program",
       "Correct. It is generated directly in a binary format."
      ],
      [
       "A printed photograph",
       "A printed photograph exists only on paper, so it must be digitised with a flatbed scanner (L3, Capturing and storing each medium)."
      ]
     ],
     "a": 2
    },
    {
     "q": "2D animation in Flash uses key-frame interpolation called:",
     "o": [
      [
       "Dithering",
       "Dithering is an image technique for simulating more colours/greys with patterns of pixels; it is not key-frame interpolation."
      ],
      [
       "Tweening",
       "Correct. 2D animation in Flash uses key-frame interpolation called tweening of motion and shape: the in-between frames are generated from the key frames (L3, Capturing and storing each medium)."
      ],
      [
       "Sampling",
       "Sampling measures an analog signal at regular intervals to digitise it; it does not generate in-between animation frames."
      ],
      [
       "Aliasing",
       "Aliasing is a sampling artefact (false lower frequencies from undersampling), not an animation technique."
      ]
     ],
     "a": 1
    },
    {
     "q": "How much storage does 1 minute of uncompressed HD video (1920×1080, 25 fps) need according to the lecture?",
     "o": [
      [
       "About 150 MB",
       "About 150 MB is the rate for ONE second of HD video (≈ 6 MB per frame × 25). One minute is 60 times that."
      ],
      [
       "About 9 GB",
       "Correct. HD frame ≈ 6 MB (1920 × 1080 × 3 B), × 25 fps ≈ 150 MB/s, × 60 s ≈ 9 GB per minute (L3, Images, audio and video data sizes)."
      ],
      [
       "About 31 MB",
       "About 31 MB is one second of PAL 720 × 576 colour video, a smaller format and only one second, not a minute of HD."
      ],
      [
       "About 600 MB",
       "600 MB is only about 4 seconds of HD video at 150 MB/s; a full minute is 150 × 60 = 9000 MB ≈ 9 GB."
      ]
     ],
     "a": 1
    },
    {
     "q": "A 512×512 monochrome video at 25 fps needs per second (uncompressed):",
     "o": [
      [
       "0.25 MB",
       "0.25 MB is the size of ONE 512 × 512 8-bit frame; per second multiply by 25 frames: 6.25 MB."
      ],
      [
       "6.25 MB",
       "Correct. One monochrome frame = 512 × 512 × 1 B = 0.25 MB; data rate = frame size × fps = 0.25 × 25 = 6.25 MB/s (L3, Images, audio and video data sizes)."
      ],
      [
       "25 MB",
       "25 MB treats each frame as 1 MB (4 bytes per pixel). A monochrome frame is 1 byte per pixel, 0.25 MB, so 25 frames = 6.25 MB."
      ],
      [
       "62.5 MB",
       "62.5 MB is ten times too big (as if each frame were 2.5 MB). 0.25 MB × 25 fps = 6.25 MB per second."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which statement about general-purpose compressors (zip, RAR, 7-zip) is from the lecture?",
     "o": [
      [
       "They are the best choice for video",
       "The lecture says the opposite: general-purpose compressors may not work well for audio, images or video, which need specialised (lossy) methods."
      ],
      [
       "They are convenient for archiving but may not work well for audio, image or video",
       "Correct. The text slide says zip, RAR and 7-zip are convenient for archiving, but general-purpose compressors may not work well for audio, images or video (L3, Capturing and storing each medium)."
      ],
      [
       "They are lossy",
       "Zip, RAR and 7-zip are lossless: decompression gives back every bit. That is why they cannot shrink MM data enough (L1, Summary)."
      ],
      [
       "They are only used for graphics",
       "They are general-purpose and work on any file; the slide mentions them under text, for archiving."
      ]
     ],
     "a": 1
    },
    {
     "q": "Graphics standard described as \"a cross-language, cross-platform API for 2D/3D graphics\":",
     "o": [
      [
       "PostScript",
       "A page description language that can generate graphics."
      ],
      [
       "OpenGL",
       "Correct. The slide names OpenGL as the graphics standard: a cross-language, cross-platform API for 2D and 3D graphics (L3, Capturing and storing each medium)."
      ],
      [
       "HTML",
       "HTML is a formatted-text (markup) format listed under text data, not a 2D/3D graphics API."
      ],
      [
       "MIDI",
       "MIDI is a protocol for sending music/instrument instructions, not a graphics API; the slide's graphics standard is OpenGL."
      ]
     ],
     "a": 1
    }
   ]
  },
  {
   "n": 4,
   "title": "Digital Audio: Sampling, Nyquist and File Size",
   "notes": [
    {
     "h": "Sound and digitising sound",
     "pts": [
      "<b>Sound generation</b>: a source generates sound as <b>air pressure changes</b> — electrically (loudspeaker) or acoustically (direct pressure variations).",
      "<b>Sound reception</b>: electrically (a <b>microphone</b> produces an electric signal) or by <b>ears</b>, which respond to pressure (MPEG audio exploits this fact).",
      "A microphone receives sound and converts it to an <b>analog signal</b>. Computers like <b>discrete</b> entities, so we need <b>analog-to-digital</b> conversion by dedicated hardware (e.g. a <b>sound card</b>). This is also known as <b>digital sampling</b>.",
      "Figure (slide 3, Digitising Sound): sound waves → <b>microphone</b> → cable → <b>Sound card</b> → binary numbers (1010, 0100, 1110, 0111, 10101010, 11001111) coming out in a big arrow.",
      "<b>Sampling</b> = measuring the analog signal at <b>regular discrete intervals</b> (the sampling interval T) and recording the value at these points.",
      "Figure (slide 5, Digital Sampling (1)): top, the continuous analog signal <b>y(t)</b> against t (a smooth curve that rises then falls); bottom, the sampled signal <b>y<sub>s</sub>(t)</b>: vertical stems with circles at the regular times T<sub>s</sub>, 2T<sub>s</sub>, 3T<sub>s</sub>, 4T<sub>s</sub>, …, each stem as high as the signal value at that point.",
      "Figure (slide 6, Digital Sampling (2)): a shaded signal <b>S(t)</b> against t, going above and below the axis; the samples <b>S<sub>i</sub></b> are dots on the curve at sample indices 0, 1, …, i, 4, 5, …, 13, one every sampling interval <b>T</b>."
     ],
     "fig": [
      "mm-digitise",
      "mm-sampling-1",
      "mm-sampling-2"
     ],
     "figAt": {
      "mm-digitise": 3,
      "mm-sampling-1": 5
     },
     "figH": {
      "mm-digitise": "Digitising sound: from sound waves to binary numbers",
      "mm-sampling-1": "Digital sampling (1): the analog signal measured at regular intervals",
      "mm-sampling-2": "Digital sampling (2): one sample every sampling interval T"
     }
    },
    {
     "h": "Sample rate and bit size (quantisation)",
     "pts": [
      "<b>Bit size = quantisation</b>: how do we store each sample value? <b>8-bit</b> value: 0–255. <b>16-bit</b> value (integer): 0–65535.",
      "<b>Sample rate</b>: how many samples to take per second (Hz). <b>11.025 kHz</b> — speech (telephone <b>8 kHz</b>); <b>22.05 kHz</b> — low-grade audio (WWW audio, AM radio); <b>44.1 kHz</b> — CD quality.",
      "Sampling frequency (sample rate) = samples per second = <b>1 / sampling interval</b>. Unit: <b>Hertz (Hz)</b>."
     ],
     "formula": [
      "fs = 1 / T      (T = sampling interval in seconds)",
      "Levels = 2^bits  (8 bit → 256 levels, 16 bit → 65,536 levels)"
     ],
     "fig": "mm-bit-rate",
     "figH": {
      "mm-bit-rate": "Try it: pick a sample rate and store a sample as 8 or 16 bits"
     }
    },
    {
     "h": "Nyquist's sampling theorem and aliasing",
     "pts": [
      "The sampling frequency is <b>critical</b> to the accurate reproduction of a digital version of an analog waveform.",
      "<b>Nyquist's theorem</b>: the sampling frequency for a signal must be <b>at least twice the highest frequency component</b> in the signal: <b>fs ≥ 2·fmax</b>.",
      "<b>Nyquist frequency</b> = fs / 2 = the highest frequency a given sample rate can represent (e.g. 44.1 kHz → 22.05 kHz). <b>Nyquist rate</b> = 2·fmax = the minimum sample rate for a signal.",
      "Slide demos: sampling at the signal frequency gives one sample per cycle, so every sample has the same value (the sine is lost); sampling at twice the frequency keeps the frequency only if the samples land on the peaks and troughs (a triangle wave); if they land on the zero crossings every sample is zero and the sine is lost; sampling above Nyquist captures the waveform well.",
      "Figures (slides 8 to 10), a sine wave with the samples marked: <b>Sampling at Signal Frequency</b>: one sample per cycle, all at the same height (the peaks), so joining them gives a flat (green) line. <b>Sampling at Twice Nyquist Frequency</b> (slide title): samples at every peak and trough; joined, they give a triangle wave with the sine's frequency. <b>Sampling at above Nyquist Frequency</b>: many samples (red dots) that trace the sine closely. ‡ In the middle figure the sample rate is twice the signal frequency, i.e. the Nyquist rate 2·fmax.",
      "Both figures (slides 8 and 9) also mark a second set of samples in red on the axis, at the zero crossings, taken at the same rate; joined, they give a flat red line along the axis. So at the signal frequency the sine is lost either way, and at twice the frequency it is lost when the samples fall on the zero crossings.",
      "Getting it wrong (<b>undersampling</b>) creates <b>digital sampling artefacts</b> called <b>aliasing</b>: a false lower frequency appears. Aliasing affects <b>audio, imagery and video</b> (aliased sine wave and aliased piano demos).",
      "Figure (slide 11, If you get Nyquist Sampling Wrong? (1)): four panels on a 0 to 32 axis: the original continuous signal, then the same signal sampled as bars, first densely, then less densely, then sparsely; with fewer samples the shape of the signal is lost. <b>Digital Sampling Artefacts Arise</b>: effect known as <b>Aliasing</b>, which affects <b>Audio, Imagery and Video</b>.",
      "Figure (slide 12, If you get Nyquist Sampling Wrong? (2)): three sinusoids (green, red and blue) with different amplitudes and phases pass through exactly the <b>same sample points</b> (marked at t = −4, −3, …, 4: each sample is +1 or −1), so from the samples alone they cannot be told apart. All three repeat every 2 units on the axis, one sample per half cycle.",
      "What does aliasing sound like? (slide 13: click on the images to play sounds): <b>Sine Wave</b>, <b>Aliased Sine Wave</b> and <b>Aliased Piano</b>. <b>MATLAB code</b> for the sine demos: Plot Version, Audio Version. More on <b>image and video sampling artefacts</b> later.",
      "<b>Oversampling</b> = sampling above the Nyquist rate. It reduces aliasing but costs more data.",
      "Practical implication: the signal must be low-pass filtered before sampling: Input Signal (Analog) → <b>Low Pass Filter</b> → Filtered Signal (Analog) → <b>A/D Converter</b> → Sampled Signal (Digital). Otherwise frequencies above the Nyquist limit appear as strange artefacts."
     ],
     "formula": [
      "fs ≥ 2 × fmax",
      "Nyquist frequency = fs / 2",
      "Alias of a tone f between fs/2 and fs = fs − f   (standard result, not on the slides)"
     ],
     "fig": [
      "mm-nyquist-3",
      "mm-nyquist-calc",
      "mm-alias-panels",
      "mm-same-samples",
      "mm-alias-sound",
      "mm-lowpass"
     ],
     "figAt": {
      "mm-nyquist-3": 4,
      "mm-nyquist-calc": 2,
      "mm-alias-panels": 7,
      "mm-same-samples": 8,
      "mm-alias-sound": 9
     },
     "figH": {
      "mm-nyquist-3": "Sampling a sine at, twice and above its frequency",
      "mm-nyquist-calc": "Try it: find the Nyquist sample rate for a signal",
      "mm-alias-panels": "Getting Nyquist wrong (1): sampling a signal less and less densely",
      "mm-same-samples": "Getting Nyquist wrong (2): three sinusoids through the same samples",
      "mm-alias-sound": "Try it: hear a sine sweep alias at 8 kHz",
      "mm-lowpass": "Low-pass filter before sampling, or aliasing gets in"
     }
    },
    {
     "h": "Why are CD sample rates 44.1 kHz?",
     "pts": [
      "The upper range of human hearing is around <b>20–22 kHz</b>. Applying Nyquist, we need at least twice that: 2 × 22.05 kHz = <b>44.1 kHz</b>.",
      "Course constants: <b>audio/music</b> fmax = 22.05 kHz → fs = 44.1 kHz; <b>speech</b> fmax = 4 kHz → fs = 8 kHz. Mono = 1 channel; stereo = 2 channels."
     ],
     "fig": "mm-cd-rate",
     "figAt": {
      "mm-cd-rate": 0
     },
     "figH": {
      "mm-cd-rate": "Why CD audio is sampled at 44.1 kHz"
     }
    },
    {
     "h": "Effect of sample rate and bit size on quality and size",
     "pts": [
      "Ears do not respond linearly, so we use the <b>decibel (dB)</b>, a logarithmic measure.",
      "<b>16-bit</b> has a signal-to-noise ratio of <b>98 dB</b> (virtually inaudible); <b>8-bit</b> has a signal-to-noise ratio of <b>50 dB</b>. Therefore, 8-bit is roughly 8 times as noisy. A <b>6 dB increment is twice as loud</b>. ‡ The \"roughly 8 times\" is the slide's own statement; it is not 48 dB ÷ 6 dB, since by the 6 dB = twice rule a 48 dB gap would be 2<sup>8</sup> = 256 times.",
      "Sound examples on the slide: 44 kHz 16-bit, 44 kHz 8-bit, 22 kHz 16-bit, 22 kHz 8-bit, 11 kHz 8-bit (all mono): quality drops as rate and bits drop.",
      "Higher sample rate or bit size = better quality but <b>bigger files</b>. Increasing fs beyond what hearing needs does not \"always improve\" quality."
     ],
     "table": [
      [
       "1 minute of audio",
       "44.1 kHz",
       "22.05 kHz",
       "11.025 kHz"
      ],
      [
       "16 bit stereo",
       "10.1 MB",
       "5.05 MB",
       "2.52 MB"
      ],
      [
       "16 bit mono",
       "5.05 MB",
       "2.52 MB",
       "1.26 MB"
      ],
      [
       "8 bit mono",
       "2.52 MB",
       "1.26 MB",
       "630 KB"
      ]
     ],
     "fig": [
      "mm-quality-play",
      "mm-size-table"
     ],
     "figAt": {
      "mm-quality-play": 2
     },
     "figH": {
      "mm-quality-play": "Try it: hear audio quality drop with fewer samples and bits",
      "mm-size-table": "One minute of audio: size by sample rate, bits and channels"
     }
    },
    {
     "h": "Audio file size — worked examples (course summary)",
     "pts": [
      "<b>Rule</b>: Size (bits) = <b>time (s) × sample rate (Hz) × sample size (bits) × channels</b>. Divide by 8 for bytes, by 1024 for KB, by 1024 again for MB.",
      "If the sample rate is not given but the <b>sampling interval</b> is: fs = 1 / interval. If neither is given, use the constants (speech 8 kHz, audio 44.1 kHz). The Final Rules sheet says an unknown sample size is kept as a variable (Q); the midterm sheet used 16 bits.",
      "<b>Ex 1</b>: 44.1 kHz, 16-bit, 60 s, stereo → 44,100 × 16 × 60 × 2 = <b>84,672,000 bits</b> = 10,584,000 B = <b>10,335.94 KB</b> ≈ 10.09 MB.",
      "<b>Ex 2</b>: sampling interval 0.000125 s, 16-bit, 4.5 min, stereo → fs = 1/0.000125 = <b>8000 Hz</b>; t = 4.5 × 60 = 270 s; size = 8000 × 16 × 270 × 2 = <b>69,120,000 bits</b> = 8,640,000 B = <b>8437.5 KB</b>.",
      "<b>Ex 3</b>: interval 500 ms, 64-bit, 5.5 h, stereo → fs = 1/0.5 = 2 Hz; t = 5.5 × 3600 = 19,800 s; size = 2 × 64 × 19,800 × 2 = <b>5,068,800 bits</b> = 633,600 B.",
      "<b>Ex 4</b>: speech, 32-bit, 2.5 h, stereo → fs = 2 × 4000 = 8000 Hz; t = 9000 s; size = 8000 × 32 × 9000 × 2 = <b>4,608,000,000 bits</b> = 576,000,000 B = <b>562,500 KB</b>.",
      "<b>Ex 5</b>: x(t) = 2A·cos(200πt + π/3) + 3A·sin(100πt − π/6). Each term is 2πf·t, so f1 = 200π/2π = <b>100 Hz</b>, f2 = 100π/2π = <b>50 Hz</b>; fmax = 100 Hz → fs ≥ 200 Hz → sampling interval T ≤ 1/200 = <b>0.005 s</b> (the largest interval allowed).",
      "<b>Sampling intervals</b>: speech 1/8000 = <b>0.000125 s</b> (125 µs); music 1/44,100 ≈ <b>0.0000227 s</b> (22.68 µs)."
     ],
     "fig": "mm-size-calc",
     "figAt": {
      "mm-size-calc": 1
     },
     "figH": {
      "mm-size-calc": "Try it: audio file size calculator"
     }
    },
    {
     "h": "Audio file formats",
     "pts": [
      "Popular formats: <b>.au</b> (origin: Unix, Sun), <b>.aiff</b> (Mac, SGI), <b>.wav</b> (PC, DEC). Compression can be utilised in <b>some</b> of the above but is <b>not mandatory</b>.",
      "A simple and widely used (<b>by the above formats</b>) audio compression method is <b>ADPCM</b> (Adaptive Delta Pulse Code Modulation): based on past samples, it <b>predicts the next sample</b> and encodes the <b>difference</b> between the actual value and the predicted value. More on this later (Audio Compression).",
      "Many formats are linked to audio applications. Other formats (most use compression): Sound Blaster <b>.voc</b> (can use silence deletion), Pro Tools/Sound Designer <b>.sd2</b>, RealAudio <b>.ra</b>, Ogg Vorbis <b>.ogg</b>, AAC/Apple/mp4, FLAC <b>.flac</b>, Dolby AC coding, MPEG audio (MP3, MPEG-4)."
     ],
     "fig": "mm-adpcm",
     "figAt": {
      "mm-adpcm": 1
     },
     "figH": {
      "mm-adpcm": "ADPCM: predict the next sample, store only the difference"
     }
    },
    {
     "h": "Synthetic sounds — reducing bandwidth",
     "pts": [
      "Synthetic sounds: use more <b>high-level</b> descriptions to represent signals.",
      "<b>Synthesis pipeline</b>: synthesise sounds in hardware or software; the client produces the sound, so only <b>parameters</b> to control the sound are sent (MIDI/MP4/HTML5).",
      "Pictures (slide 22): a small MIDI keyboard connected to a laptop (with headphones), and a MIDI keyboard connected to a tablet.",
      "Methods: <b>FM</b> (low-end Sound Blaster, OPL-4 chip, Yamaha DX, early 1980s); <b>wavetable</b> (from sampled real instruments); <b>additive</b> (sum simpler waveforms); <b>subtractive</b> (filter out parts of a complex waveform); <b>granular</b> (use small fragments of existing samples to make new sounds); <b>physical modelling</b> (model how acoustic sound is generated, in software); <b>sample-based</b> (record and play back recorded audio, often small fragments and audio processed). Most modern synthesisers mix sample and synthesis methods.",
      "Analogy: recorded sound ≈ bitmap image (regular sampling, large, hard to modify); synthetic sound ≈ <b>vector graphics</b> (high-level description, small, easy to edit, needs conversion — synthesis or rasterisation — before playback/display). Difference: 1D vs 2D."
     ],
     "fig": [
      "mm-synth-pipe",
      "mm-synth-methods"
     ],
     "figAt": {
      "mm-synth-methods": 3
     },
     "figH": {
      "mm-synth-pipe": "Synthesis pipeline, and recorded vs synthetic sound",
      "mm-synth-methods": "Sound synthesis methods, with additive and subtractive to try"
     }
    }
   ],
   "cards": [
    [
     "Nyquist's sampling theorem",
     "The sampling frequency must be at least twice the highest frequency component in the signal: fs ≥ 2 fmax."
    ],
    [
     "Nyquist frequency",
     "Half the sampling frequency (fs/2): the highest frequency that can be represented."
    ],
    [
     "Aliasing",
     "A sampling artefact from undersampling (fs below 2 fmax): high frequencies appear as false lower frequencies. Affects audio, images and video."
    ],
    [
     "Oversampling",
     "Sampling above the Nyquist rate; reduces aliasing but increases data size."
    ],
    [
     "Sampling frequency formula",
     "fs = 1 / sampling interval (in seconds). Unit: Hertz (Hz)."
    ],
    [
     "Standard sample rates",
     "8 kHz telephone; 11.025 kHz speech; 22.05 kHz low-grade (WWW, AM radio); 44.1 kHz CD."
    ],
    [
     "Why CD = 44.1 kHz?",
     "Human hearing reaches about 20-22 kHz; Nyquist needs twice that: 2 × 22.05 = 44.1 kHz."
    ],
    [
     "8-bit vs 16-bit ranges",
     "8-bit: 0-255; 16-bit: 0-65535."
    ],
    [
     "SNR of 16-bit and 8-bit",
     "16-bit ≈ 98 dB; 8-bit ≈ 50 dB. 6 dB increment = twice as loud."
    ],
    [
     "Audio file size",
     "time (s) × sample rate × bits per sample × channels (bits)."
    ],
    [
     "Speech constants",
     "fmax = 4 kHz, fs = 8 kHz, sampling interval = 0.000125 s."
    ],
    [
     "Must do before sampling",
     "Low-pass (anti-aliasing) filter the signal."
    ],
    [
     "ADPCM",
     "Adaptive Delta PCM: predicts the next sample from past samples and stores the difference."
    ],
    [
     "Audio formats and origins",
     ".au Unix/Sun; .aiff Mac/SGI; .wav PC/DEC."
    ]
   ],
   "qa": [
    [
     "Why are CD sample rates 44.1 kHz?",
     "The upper range of human hearing is about 20-22 kHz (fmax ≈ 22.05 kHz). Nyquist's theorem says we must sample at least twice the highest frequency, so 2 × 22.05 kHz = 44.1 kHz captures everything we can hear."
    ],
    [
     "State Nyquist's theorem and explain what happens if it is violated.",
     "The sampling frequency must be at least twice the highest frequency component of the signal. If we sample below this (undersampling) we get aliasing: high-frequency components fold back and appear as false lower frequencies, a distortion that cannot be removed after sampling. That is why the signal is low-pass filtered before the ADC."
    ],
    [
     "An audio signal is sampled with interval 0.000125 s, 16-bit samples, for 4.5 minutes in stereo. Find the file size.",
     "fs = 1/0.000125 = 8000 Hz. Time = 4.5 × 60 = 270 s. Size = 8000 × 16 × 270 × 2 = 69,120,000 bits = 8,640,000 bytes = 8437.5 KB."
    ],
    [
     "What is the sampling interval for a speech signal and for a music signal?",
     "Speech: fmax = 4 kHz so fs = 8000 Hz and T = 1/8000 = 0.000125 s (125 microseconds). Music: fs = 44,100 Hz so T = 1/44,100 ≈ 0.0000227 s (22.68 microseconds)."
    ],
    [
     "How do sample rate and bit size affect audio?",
     "They affect quality and size. More bits give finer quantisation and less noise (16-bit SNR 98 dB vs 8-bit 50 dB). A higher rate captures higher frequencies. Both increase the file size proportionally, e.g. one minute of 16-bit stereo at 44.1 kHz is about 10.1 MB but 8-bit mono at 11.025 kHz is about 630 KB."
    ]
   ],
   "quiz": [
    {
     "q": "Sampling frequency refers to:",
     "o": [
      [
       "Number of samples taken per hour",
       "Sampling frequency counts samples per SECOND, which is why its unit is Hz; per hour is not how the rate is defined (L4, Sample rate)."
      ],
      [
       "Number of samples taken per second",
       "Correct. Sampling frequency (sample rate) is the number of samples taken per second, fs = 1/T where T is the sampling interval, measured in Hz (L4, Sample rate)."
      ],
      [
       "Total duration of the signal",
       "The total duration is a time in seconds; the sampling frequency is a rate. File size multiplies the two, but they are different quantities."
      ],
      [
       "Amplitude of the signal",
       "Amplitude is the height of the wave, stored by quantisation (bit size); the sampling frequency is how often the wave is measured."
      ]
     ],
     "a": 1,
     "src": "Exam 2025/26"
    },
    {
     "q": "The standard unit of sampling frequency is:",
     "o": [
      [
       "Hertz (Hz)",
       "Correct. Sampling frequency is measured in Hertz: 1 Hz = 1 sample per second, so 44.1 kHz = 44,100 samples per second (L4, Sample rate)."
      ],
      [
       "Joule (J)",
       "The joule is the SI unit of energy, not of a rate. Samples per second are measured in Hertz (Hz)."
      ],
      [
       "Newton (N)",
       "The newton is the SI unit of force. A sampling rate counts samples per second, so its unit is Hz."
      ],
      [
       "Ampere (A)",
       "The ampere is the SI unit of electric current. Sampling frequency is in Hz (samples per second)."
      ]
     ],
     "a": 0,
     "src": "Exam 2025/26"
    },
    {
     "q": "According to the Nyquist theorem, the sampling frequency should be at least:",
     "o": [
      [
       "Equal to the lowest frequency in the signal",
       "It depends on the highest frequency, and must be double it."
      ],
      [
       "Half the highest frequency in the signal",
       "Half of fs is the Nyquist frequency; fs itself must be twice fmax."
      ],
      [
       "Twice the highest frequency in the signal",
       "Correct. Nyquist's theorem: the sampling frequency must be at least twice the highest frequency component in the signal, fs ≥ 2·fmax (L4, Nyquist)."
      ],
      [
       "Ten times the highest frequency in the signal",
       "Ten times fmax also avoids aliasing (oversampling), but the theorem's minimum is only twice fmax; extra samples just cost data."
      ]
     ],
     "a": 2,
     "src": "Exam 2025/26"
    },
    {
     "q": "If a signal contains components up to 5 kHz, the minimum sampling frequency should be:",
     "o": [
      [
       "2.5 kHz",
       "2.5 kHz is half of fmax, below even fmax, so components up to 5 kHz would alias. Nyquist needs fs ≥ 2 × 5 = 10 kHz."
      ],
      [
       "5 kHz",
       "Equal to fmax: one sample per cycle, the tone is lost."
      ],
      [
       "10 kHz",
       "Correct. By Nyquist, fs ≥ 2·fmax = 2 × 5 kHz = 10 kHz (L4, Nyquist)."
      ],
      [
       "20 kHz",
       "20 kHz is four times fmax: it works (oversampling) but is not the minimum, which is 2 × 5 kHz = 10 kHz."
      ]
     ],
     "a": 2,
     "src": "Exam 2025/26"
    },
    {
     "q": "Undersampling a signal generally results in:",
     "o": [
      [
       "Aliasing",
       "Correct. Frequencies above fs/2 fold back as false low frequencies."
      ],
      [
       "Overshoot",
       "Overshoot is a filter/step-response effect (ringing past a target value), not the result of sampling too slowly; undersampling gives aliasing."
      ],
      [
       "Quantization noise",
       "That comes from the bit size (amplitude rounding), not from the sample rate."
      ],
      [
       "Increased signal bandwidth",
       "Undersampling reduces the bandwidth that can be represented."
      ]
     ],
     "a": 0,
     "src": "Exam 2025/26"
    },
    {
     "q": "Increasing the sampling frequency generally:",
     "o": [
      [
       "Decreases data size",
       "More samples per second means more data: size = time × fs × bits × channels, so raising fs increases the file size."
      ],
      [
       "Reduces aliasing",
       "Correct. A higher fs raises the Nyquist limit fs/2."
      ],
      [
       "Makes reconstruction impossible",
       "The opposite: it makes reconstruction easier."
      ],
      [
       "Eliminates quantization error",
       "Quantisation error comes from rounding amplitudes to 2<sup>bits</sup> levels, so it depends on bit size, not on how often samples are taken."
      ]
     ],
     "a": 1,
     "src": "Exam 2025/26"
    },
    {
     "q": "Oversampling refers to sampling:",
     "o": [
      [
       "Below the Nyquist rate",
       "Sampling below the Nyquist rate is undersampling, which causes aliasing; oversampling is the opposite."
      ],
      [
       "Exactly at the Nyquist rate",
       "Sampling exactly at the Nyquist rate (2·fmax) is the minimum that just captures the wave, not oversampling, which means going above it."
      ],
      [
       "Above the Nyquist rate",
       "Correct. Oversampling means sampling above the Nyquist rate (fs > 2·fmax); it reduces aliasing but costs more data (L4, Nyquist)."
      ],
      [
       "Only at integer multiples of the signal",
       "The course defines oversampling only relative to the Nyquist rate (above 2·fmax), not as sampling at integer multiples of the signal."
      ]
     ],
     "a": 2,
     "src": "Exam 2025/26"
    },
    {
     "q": "In digital audio, the common sampling frequency for CDs is:",
     "o": [
      [
       "22.05 kHz",
       "Low-grade audio (WWW, AM radio); also the CD's Nyquist frequency."
      ],
      [
       "44.1 kHz",
       "Correct. Hearing reaches about 20–22 kHz, so by Nyquist CDs use 2 × 22.05 kHz = 44.1 kHz (L4, Why are CD sample rates 44.1 kHz?)."
      ],
      [
       "48 kHz",
       "48 kHz is a common professional/video rate, but it is not the CD rate; the slides give 44.1 kHz for CD quality."
      ],
      [
       "96 kHz",
       "96 kHz is the audiophile rate (24-bit, 96 kHz) quoted in L1 (Audio), higher than the CD standard of 44.1 kHz."
      ]
     ],
     "a": 1,
     "src": "Exam 2025/26"
    },
    {
     "q": "If the sampling frequency is lower than the Nyquist rate, the reconstructed signal will:",
     "o": [
      [
       "Be perfectly accurate",
       "Below the Nyquist rate, frequencies above fs/2 cannot be represented and show up as false lower frequencies, so perfect reconstruction is impossible."
      ],
      [
       "Contain aliasing distortion",
       "Correct. Sampling below the Nyquist rate (undersampling) creates digital artefacts called aliasing: a false lower frequency appears in the reconstruction (L4, Nyquist)."
      ],
      [
       "Have increased amplitude",
       "The sampling rate affects which frequencies are captured, not the signal's amplitude; the error is aliasing, not extra loudness."
      ],
      [
       "Be band-limited",
       "Band-limiting is done before sampling by the anti-aliasing filter; it does not describe the undersampled result."
      ]
     ],
     "a": 1,
     "src": "Exam 2025/26"
    },
    {
     "q": "A higher sampling frequency allows:",
     "o": [
      [
       "Accurate capturing of high-frequency components",
       "Correct. The highest representable frequency is fs/2."
      ],
      [
       "Less memory usage",
       "A higher fs stores more samples per second, so it uses MORE memory (size = time × fs × bits × channels)."
      ],
      [
       "Lower power consumption",
       "More samples per second mean more conversion and processing work, so power use does not drop; the gain is capturing higher frequencies."
      ],
      [
       "No change in signal resolution",
       "A higher fs does change resolution: samples are closer in time and higher frequencies (up to fs/2) can be represented."
      ]
     ],
     "a": 0,
     "src": "Exam 2025/26"
    },
    {
     "q": "An audio signal is sampled every 0.000125 s with 16-bit samples for 4.5 minutes in stereo. The file size is:",
     "o": [
      [
       "8437.5 KB",
       "Correct. 8000 × 16 × 270 × 2 = 69,120,000 bits = 8,640,000 B = 8437.5 KB."
      ],
      [
       "4218.75 KB",
       "4218.75 KB is the mono size (8000 × 16 × 270 × 1 bits ÷ 8 ÷ 1024). Stereo has 2 channels, so the size doubles to 8437.5 KB."
      ],
      [
       "140.625 KB",
       "140.625 KB uses 4.5 instead of 270 seconds: 8000 × 16 × 4.5 × 2 = 1,152,000 bits = 144,000 B. Convert 4.5 min × 60 = 270 s first."
      ],
      [
       "67,500 KB",
       "67,500 KB is 69,120,000 bits ÷ 1024, i.e. the bits were never divided by 8 to get bytes. 8,640,000 B ÷ 1024 = 8437.5 KB."
      ]
     ],
     "a": 0
    },
    {
     "q": "x(t) = 2A cos(200πt + π/3) + 3A sin(100πt − π/6). The largest allowed sampling interval is:",
     "o": [
      [
       "0.01 s",
       "That samples at 100 Hz, only fmax, not 2·fmax."
      ],
      [
       "0.005 s",
       "Correct. f1 = 100 Hz, f2 = 50 Hz, fs ≥ 200 Hz, T ≤ 1/200 = 0.005 s."
      ],
      [
       "0.02 s",
       "0.02 s means fs = 50 Hz, which only matches the lower component f2 = 50 Hz and is half of fmax = 100 Hz; Nyquist needs 200 Hz."
      ],
      [
       "0.0025 s",
       "Allowed but not the largest (that is 400 Hz)."
      ]
     ],
     "a": 1
    },
    {
     "q": "According to the slides, the signal-to-noise ratio of 16-bit audio is about:",
     "o": [
      [
       "50 dB",
       "50 dB is the SNR the slides give for 8-bit audio. 16-bit is quoted at 98 dB, so 8-bit is \"roughly 8 times as noisy\"."
      ],
      [
       "98 dB",
       "Correct. The slides give 16-bit audio a signal-to-noise ratio of 98 dB (noise virtually inaudible), versus 50 dB for 8-bit (L4, Effect of sample rate and bit size)."
      ],
      [
       "6 dB",
       "6 dB is not an SNR figure here: the slide says a 6 dB increment is twice as loud (about one bit's worth). 16-bit SNR is 98 dB."
      ],
      [
       "120 dB",
       "120 dB is the human threshold of pain (power ratio 10<sup>12</sup>, L2), not the SNR of 16-bit audio, which is 98 dB."
      ]
     ],
     "a": 1
    },
    {
     "q": "ADPCM compresses audio by:",
     "o": [
      [
       "Deleting silence",
       "Silence deletion is a different trick, mentioned for Sound Blaster .voc files. ADPCM predicts each sample and stores the difference."
      ],
      [
       "Predicting the next sample from past samples and encoding the difference",
       "Correct. ADPCM (Adaptive Delta Pulse Code Modulation) predicts the next sample from past samples and encodes only the difference between the actual and predicted value (L4, Audio file formats)."
      ],
      [
       "Sending only MIDI parameters",
       "Sending only parameters is the synthetic-sound approach (MIDI/MP4), where the client synthesises the sound; ADPCM still codes the sampled waveform."
      ],
      [
       "Removing all frequencies above 4 kHz",
       "Removing frequencies above a limit is low-pass filtering, not ADPCM. ADPCM keeps the waveform and codes the prediction differences."
      ]
     ],
     "a": 1
    }
   ]
  },
  {
   "n": 5,
   "title": "Digital Audio Synthesis",
   "notes": [
    {
     "h": "Overview: synthesis approaches",
     "pts": [
      "Practical digital audio applications covered next: <b>Digital Audio Synthesis</b> (making sounds), <b>Digital Audio Effects</b> (changing sounds) and <b>MIDI</b> (synthesis/effect control and compression).",
      "Seven synthesis approaches: <b>Subtractive</b>, <b>Additive</b>, <b>FM</b> (Frequency Modulation), <b>Sample-based</b>, <b>Wavetable</b>, <b>Granular</b> and <b>Physical Modelling</b>."
     ]
    },
    {
     "h": "Subtractive synthesis and the ADSR envelope",
     "pts": [
      "<b>Subtractive synthesis</b>: subtract overtones from a harmonically rich sound by applying an <b>audio filter</b> to an audio signal. First example: the <b>Vocoder</b> (\"talking robot\", 1939). Popularised by <b>Moog</b> synthesisers (1960–1970s).",
      "Simple example (bowed string): take a <b>sawtooth</b> generator and <b>low-pass filter</b> it to dampen the higher partials. This sounds more natural than the raw sawtooth.",
      "Human example: vocal cords = <b>oscillator</b> (source); mouth and throat = <b>filter</b>. \"aah\" keeps most harmonics, \"ooh\" removes (reduces) most of them. Sweeping ooh→aah→ooh = <b>sweeping filter</b>, the basis of the <b>wah-wah</b> guitar effect.",
      "Aeroplane example: \"ssh\" = <b>white noise</b>; shaping the mouth to remove high frequencies gives <b>pink noise</b> (jet landing). Filtered white noise also makes ocean waves, wind, and snare/percussion in early drum machines.",
      "Three basic elements of electronic control: <b>Source signal</b> (square, pulse, sawtooth, triangle waves; modern synths allow arbitrary waveforms), <b>Filtering</b> (cut-off frequency and resonance are controlled to simulate an instrument's timbre), <b>Amplitude envelope</b> (strictly not subtractive but frequently used, also with other techniques).",
      "<b>ADSR envelope</b>: modulates some aspect of the sound over time, usually volume (also filter frequency or oscillator pitch). Needed because each real instrument's volume changes over time in its own way: a <b>pipe organ</b> plays at constant volume and dies quickly on release; a <b>guitar</b> is loudest right after plucking and fades.",
      "<b>Attack</b>: how quickly the sound reaches full volume after the key is pressed (almost instantaneous for most mechanical instruments; slow for bowed strings and \"pads\"). <b>Decay</b>: how quickly it drops to the sustain level after the peak. <b>Sustain</b>: the constant volume held until the key is released — it is a <b>level, not a time</b>. <b>Release</b>: how quickly it fades after the key is released (very short for an organ; long for a bell or a piano with the sustain pedal).",
      "MATLAB demo <code>subtract_synth.m</code>: sawtooth at 440 Hz, Fs = 22050, filtered with <code>butter(1,0.04,'low')</code> and <code>butter(4,0.04,'low')</code> then <code>filter()</code>. The cut-off 0.04 is relative to Nyquist: 0.04 × 11025 = <b>441 Hz</b>. The 4th-order filter removes more of the high partials than the 1st-order one.",
      "<code>synth.m</code> makes 'sine', 'saw' or 'fm' notes. Its sawtooth period is T = Fs/freq samples (22050/440 ≈ 50.1 samples) built with <code>ramp - fix(ramp)</code>; it has a non-linear up slope, sounds slightly less harsh and suits synthesis better. Edges are smoothed with a 10 ms ramp."
     ],
     "fig": [
      "mm-5-bowed",
      "mm-5-vocal",
      "mm-5-noise",
      "mm-5-control",
      "mm-5-adsr",
      "mm-5-butter",
      "mm-5-synth-saw"
     ],
     "figAt": {
      "mm-5-bowed": 1,
      "mm-5-vocal": 2,
      "mm-5-noise": 3,
      "mm-5-control": 4,
      "mm-5-adsr": 6,
      "mm-5-butter": 7,
      "mm-5-synth-saw": 8
     },
     "figH": {
      "mm-5-bowed": "Bowed string: a sawtooth, low-pass filtered",
      "mm-5-vocal": "The voice as oscillator and filter: ooh, aah and the sweeping filter",
      "mm-5-noise": "White noise filtered into pink noise",
      "mm-5-control": "Source, filter and amplitude envelope you can set",
      "mm-5-adsr": "ADSR envelope: four phases and four instruments",
      "mm-5-butter": "subtract_synth.m: butter(1, 0.04) against butter(4, 0.04)",
      "mm-5-synth-saw": "How synth.m builds its sawtooth, sample by sample"
     }
    },
    {
     "h": "Additive synthesis",
     "pts": [
      "Complex tones are created by the <b>summation (addition) of simpler ones</b>. <b>Frequency mixing</b> is its essence.",
      "Each frequency component (<b>partial</b>) has its own amplitude envelope, so components behave independently. Sources can be other synthesis forms or samples.",
      "Examples: <b>pipe / Hammond organs</b> (register stops, tonewheel/drawbar settings), the <b>Telharmonium</b> (1900s giant electrical synthesiser adding dozens of electro-mechanical tone generators), modern: Fairlight CMI, Synclavier, Kawai K5000, wavetable synthesis.",
      "Basis: <b>Fourier theory</b> — a timbre analysed into sinusoids can be rebuilt by adding them.",
      "<b>Advantage</b>: can recreate the micro-variations in frequency and amplitude of individual partials that make natural sounds rich and lively. <b>Disadvantage</b>: <b>inefficient</b> — a great deal of data must be specified for a detailed sound.",
      "Examples: approximating a <b>square wave</b> by adding sine waves (odd harmonics f, 3f, 5f, … with amplitudes 1, 1/3, 1/5, …; e.g. for 100 Hz: 100, 300, 500 Hz …), and the <b>Aphex Twin spectrogram</b> (inverse-Fourier additive synthesis that \"paints\" sinusoids from image intensity and pixel location)."
     ],
     "fig": [
      "mm-5-partials",
      "mm-5-square",
      "mm-5-paint"
     ],
     "figAt": {
      "mm-5-partials": 1,
      "mm-5-square": 5,
      "mm-5-paint": 5
     },
     "figH": {
      "mm-5-partials": "Each partial with its own amplitude envelope",
      "mm-5-square": "A square wave built from odd harmonics of 100 Hz",
      "mm-5-paint": "Paint a spectrogram, get it back as added sinusoids"
     }
    },
    {
     "h": "FM (Frequency Modulation) synthesis",
     "pts": [
      "The timbre of a simple waveform is changed by <b>frequency modulating</b> it, giving a more complex waveform. Discovered by <b>John Chowning</b> (Stanford, 1967–68), patented 1975, licensed to <b>Yamaha</b> (DX7, also Casio CZ, 1980s).",
      "Good at both <b>harmonic</b> and <b>inharmonic</b> (\"clang\", \"twang\", \"bong\") sounds. Harmonic sounds need the modulator to have a <b>harmonic relationship</b> to the carrier; <b>non-integer</b> ratios give bell-like, dissonant, percussive sounds. More modulation = more complex sound.",
      "Implemented digitally (analog oscillators are unstable). Discovered when vibrato was sped up until it created audible <b>sidebands</b> (timbre change) instead of warbling (pitch change). DX synths use <b>sine</b> waves for both oscillators.",
      "Terms: <b>Oscillator</b> = device generating waveforms; <b>Carrier</b> = the oscillator being modulated; <b>Modulator</b> = the oscillator doing the modulating.",
      "Bessel expansion: e = A{J<sub>0</sub> sin αt + J<sub>1</sub>[sin(α+β)t − sin(α−β)t] + J<sub>2</sub>[sin(α+2β)t − sin(α−2β)t] + …}. So side frequencies appear at <b>α ± nβ</b>.",
      "J<sub>0</sub>(I) sets the <b>carrier</b> amplitude; J<sub>n</sub>(I) sets the n-th upper and lower sidebands. Higher-order sidebands only have significant energy when I is <b>large</b>; bandwidth grows with I; if I &gt; 1 energy is increasingly stolen from the carrier; sideband energies vary like a damped sinusoid as I increases.",
      "<b>Operators</b> = oscillators in FM terminology; FM synths have <b>4 or 6</b> operators because one carrier + one modulator is not complex enough. <b>Algorithms</b> = preset routings: <b>Multiple carriers</b> (one oscillator modulates two or more carriers), <b>Multiple modulators</b> (two or more oscillators modulate one carrier), <b>Feedback</b> (an oscillator's output modulates itself).",
      "Further FM examples: compressing/uncompressing sine, periodic modulation, bell, wood block, brass."
     ],
     "formula": [
      "e = A sin(αt + I sin βt)",
      "A = peak amplitude, e = instantaneous amplitude, α = carrier freq, β = modulator freq",
      "I = modulation index = peak deviation / modulator frequency",
      "Sidebands at fc ± n·fm (n = 1, 2, 3 …)"
     ],
     "fig": [
      "mm-5-fm-basic",
      "mm-5-bessel",
      "mm-5-fm-algo"
     ],
     "figAt": {
      "mm-5-fm-basic": 3,
      "mm-5-bessel": 5,
      "mm-5-fm-algo": 6
     },
     "figH": {
      "mm-5-fm-basic": "Modulator, carrier and the FM wave e = A sin(αt + I sin βt)",
      "mm-5-bessel": "Bessel functions set the carrier and sideband amplitudes",
      "mm-5-fm-algo": "FM algorithms: multiple carriers, multiple modulators, feedback"
     }
    },
    {
     "h": "Worked example: FM sidebands",
     "pts": [
      "Demo <code>fm_eg.m</code>: fc = 440 Hz, fm = 30 Hz, I rises from 0 to 20 over 2 s.",
      "n = 1: 440 ± 30 = <b>410 Hz and 470 Hz</b> (amplitude J<sub>1</sub>).",
      "n = 2: 440 ± 60 = <b>380 Hz and 500 Hz</b> (J<sub>2</sub>). n = 3: 440 ± 90 = <b>350 Hz and 530 Hz</b> (J<sub>3</sub>).",
      "As I grows during the note, more of these sidebands gain energy, so the sound becomes progressively brighter/more complex.",
      "Harmonic example: fc = 200, fm = 200 (ratio 1:1) gives 200 ± 200n → 0, 400, 600 … all multiples of 200 Hz (harmonic). With fm = 141 Hz (non-integer ratio) the sidebands 59, 341, 482 … are not multiples of a common fundamental → bell-like, inharmonic."
     ],
     "fig": [
      "mm-5-fm-eg",
      "mm-5-fm-ratio"
     ],
     "figAt": {
      "mm-5-fm-eg": 2,
      "mm-5-fm-ratio": 4
     },
     "figH": {
      "mm-5-fm-eg": "fm_eg.m: sidebands of 440 Hz ± n × 30 Hz as I rises",
      "mm-5-fm-ratio": "Harmonic 1:1 ratio against the bell-like 200 : 141"
     }
    },
    {
     "h": "Sample-based synthesis",
     "pts": [
      "Like subtractive/additive synthesis but the seed waveforms are <b>sampled sounds or instruments</b> instead of saw or sine waves. Samplers plus Foley artists are the mainstay of sound-effects production; hip-hop, trip-hop, dance, jungle, trance etc. were invented due to samplers.",
      "<b>Advantage</b> (over physical modelling or additive): much lower processing power; the nuances are in the pre-recorded samples, not calculated in real time. <b>Disadvantage</b>: more detail needs several samples played at once (a trumpet: breath noise, growl, looping wave), which <b>reduces polyphony</b> (polyphony is rated by the number of multi-samples playable simultaneously).",
      "Examples: Mellotron (analog tape, 1962), Computer Music Melodian (1976, Stevie Wonder), <b>CMI Fairlight</b> (1979, about £20,000 — now an iPad app), NED Synclavier (1979), EMU Emulator (1981), Akai S (1986), <b>Korg M1</b> (1988, introduced the \"workstation\"), software samplers NI Kontakt, Steinberg Halion (2005).",
      "<b>Looping</b>: in the late 1980s/early 90s memory was expensive, so samples were kept short and part of the sample was looped. Today looping still saves memory and is used for drum tracks and effects. Loop points: find <b>silence points (zero crossings)</b>, e.g. drum beats, or find portions with the <b>same audio content</b> (pattern matching), e.g. sustaining instruments.",
      "<b>Pitch control</b>: speeding/slowing a sample changes pitch but is realistic only over a <b>few semitones</b>, so samples are still needed across the keyboard (multisampling). Ending the loop: early days used a volume envelope to fade; today a <b>tail-off sample</b> is triggered by note-off.",
      "<b>Multisampling</b>: sample the instrument at regular intervals covering regions of adjacent notes (<b>splits</b>) or every note — more natural progression from low to high registers. Drum mapping is the non-pitched example.",
      "<b>Velocity layers</b>: the sound depends on how hard a key/string/drum is hit (key velocity). Single layer: only volume changes, no timbre change. Dual layer: sound 1 at lower velocity, sound 2 at higher. Triple: three sounds. Multisamples are laid out vertically in the keymap, velocity layers horizontally; most instruments combine both.",
      "<b>Keyswitching</b>: keys (usually low keys outside the instrument's range) select the playing style (muted/open trumpet, plucked/bowed violin) — banks of key-mapped, velocity-layered samples. Advanced samplers have full orchestras, choirs that sing words, and script control (Kontakt 2+)."
     ],
     "fig": [
      "mm-5-loop",
      "mm-5-multi",
      "mm-5-velocity",
      "mm-5-keyswitch"
     ],
     "figAt": {
      "mm-5-loop": 3,
      "mm-5-multi": 5,
      "mm-5-velocity": 6,
      "mm-5-keyswitch": 7
     },
     "figH": {
      "mm-5-loop": "Finding loop points: zero crossings and pattern matching",
      "mm-5-multi": "Pitch shifting and multisampling on a keyboard",
      "mm-5-velocity": "Velocity layers and the key map",
      "mm-5-keyswitch": "Keyswitches choose the playing style"
     }
    },
    {
     "h": "Beat slicing",
     "pts": [
      "Joining audio at <b>silence points</b> avoids clicks, but is too simple to detect the right loop points.",
      "<b>Beat perception</b>: the ear finds rhythm from a pseudo-periodic succession of beats. A sound is heard as a beat only if its energy is <b>largely superior to the energy history</b> (a large variation in sound energy).",
      "<b>Simple sound-energy detection</b>: compute the <b>average</b> energy over about <b>1 second</b> and the <b>instant</b> energy over about <b>5/100 second</b>; a beat is detected when instant energy &gt; local average. (At 44.1 kHz that is 44,100 samples versus 0.05 × 44,100 = 2,205 samples.)",
      "<b>Frequency-selected energy</b>: Fourier transform over <b>1024 samples</b>, divide into about <b>32 sub-bands</b>, compute energy in each and compare to that sub-band's recent average; if one or more sub-bands exceed their average, a beat is detected.",
      "Tools: <b>ReCycle</b> (Sensitivity slider creates slices), <b>Cubase</b> Sample Editor (Hitpoints + Threshold, then Create Slices), <b>Groove Agent One</b> drum sampler (drag sliced file onto a pad; slices go to consecutive pads). Application: a MIDI chromatic scale triggers each slice at the right time to recreate the audio.",
      "Tempo problems: slower tempo → <b>silent gaps</b> between slices; faster tempo → <b>tail overlap</b> (reduces playing time). Attacks stay artefact-free (the most important part of percussion).",
      "Solutions: apply an <b>envelope</b> to fade each slice to silence before the gap/overlap; for gaps, <b>loop the end of the tail</b> to extend it through the gap."
     ],
     "fig": [
      "mm-5-beat",
      "mm-5-subbands",
      "mm-5-slices",
      "mm-5-tempo"
     ],
     "figAt": {
      "mm-5-beat": 2,
      "mm-5-subbands": 3,
      "mm-5-slices": 4,
      "mm-5-tempo": 6
     },
     "figH": {
      "mm-5-beat": "Instant energy against the 1 s average: beat detection",
      "mm-5-subbands": "Beat detection in 32 frequency sub-bands",
      "mm-5-slices": "Hitpoints, slices and pads",
      "mm-5-tempo": "Slower and faster tempo: gaps, overlaps and their fixes"
     }
    },
    {
     "h": "Wavetable synthesis",
     "pts": [
      "Like digital sine generation/additive synthesis but extended: the lookup table holds <b>one period of a general waveshape</b> (not just a sine), and the waveshape can <b>change dynamically</b> as the note evolves → a <b>quasi-periodic</b> output. Not to be confused with plain PCM sample playback on sound cards.",
      "Examples: <b>PPG Wave</b> (array of 64 pointers to single-cycle waves), Waldorf Microwave, <b>Roland D-50</b>/MT-32 \"Linear Arithmetic\" (sampled attack + simpler sustain: a 2-entry wave sequence), Prophet-VS, <b>Korg Wavestation</b> (\"vector synthesis\" on a 2-D grid).",
      "Making waves: a sampled note is parsed into a <b>circular sequence of wavetables</b>, one period each (or tables are generated mathematically). Playback fetches samples by <b>table lookup</b>; the output evolves as one table is mixed with another, with ADSR enveloping; looping can slow or reverse the evolution.",
      "Practically it stores two parts: an <b>attack sample</b> (e.g. hammer hitting a piano string) played once, then a <b>looped sustain segment</b> enveloped to decay naturally.",
      "Versus sample playback: output is always generated <b>in real time</b>, and waves in the tables are rarely more than <b>1 or 2 periods</b> long.",
      "Dynamic waveshaping: (1) <b>Linear crossfading</b> — crossfade sequentially from one table to the next using an envelope; (2) <b>Sequential enveloping</b> — two tables mixed at any instant by moving envelopes. Linear crossfading is a subclass where the envelopes are <b>overlapping triangular pulses</b>.",
      "<b>Advantages</b>: compact storage (far less data than the PCM sample of the same sound); as general as additive synthesis with much less real-time computation; exploits quasi-periodicity to remove redundancy; the <b>inverse DFT is precomputed</b> before playback instead of in real time.",
      "Demo <code>wavetable_synth.m</code>: one period each of a 440 Hz sine and a 500 Hz saw at Fs = 22050 (22050/440 ≈ 50 samples, 22050/500 = 44.1 samples) crossfaded; the same technique can build an ADSR envelope."
     ],
     "fig": [
      "mm-5-wavetable",
      "mm-5-attack-loop",
      "mm-5-seq-env",
      "mm-5-crossfade"
     ],
     "figAt": {
      "mm-5-wavetable": 2,
      "mm-5-attack-loop": 3,
      "mm-5-seq-env": 5,
      "mm-5-crossfade": 7
     },
     "figH": {
      "mm-5-wavetable": "Making waves: single-period tables read and mixed",
      "mm-5-attack-loop": "Attack once, then a looped and enveloped sustain",
      "mm-5-seq-env": "Linear crossfading and sequential enveloping",
      "mm-5-crossfade": "wavetable_synth.m: a sine period crossfaded into a saw period"
     }
    },
    {
     "h": "Granular synthesis",
     "pts": [
      "\"All sound is an integration of grains … of sonic quanta.\" — <b>Iannis Xenakis</b> (1971). Works on the <b>microsound</b> time scale; related to sampling/wavetable synthesis.",
      "Samples are split into small <b>grains</b> of about <b>1–50 ms</b> (a grain is usually ≈ 10–50 ms). Many grains are layered, each at different speed, phase and volume. Result: a <b>soundscape / cloud</b> rather than a single tone. Varying waveform, envelope, duration, spatial position and density of grains gives many sounds.",
      "Uses: music/ambient soundscapes, sound effects, changing sample speed while <b>preserving pitch/tempo</b>, raw material for further DSP; effects include amplitude modulation, time stretching, stereo/multichannel scattering, random reordering, disintegration and morphing.",
      "History: <b>Isaac Beeckman</b> (1618, \"globules of sonic data\"), <b>Denis Gabor</b> (1947, grain as quantum of sound), Xenakis (1971, first musical use with tape and razor blade), <b>Curtis Roads</b> (1988, digital), <b>Barry Truax</b> (1990, real-time, \"Riverrun\"). Implementations: Csound, MATLAB, MAX/MSP, Supercollider, Granulab, Kontakt/Intakt, Korg Kaos Pad, Cubase Padshop.",
      "Grain components: <b>envelope</b> (prevents clicks/distortion at the edges; its slope shapes the spectrum — sharper attacks give broader bandwidths, like very short grains) and <b>contents</b> (any waveform or sample).",
      "Three ways to combine grains: <b>Quasi-synchronous</b> (stream of equal-duration grains → amplitude modulation for grains &lt; 50 ms), <b>Asynchronous</b> (grains distributed stochastically), <b>Pitch/Tempo-synchronous</b> (preserve pitch/tempo while changing playback speed; overlapping envelopes synchronous with the grain waveform frequency, fewer artefacts).",
      "Demo <code>granulation.m</code>: 400 grains of 10–20 ms (fs×0.01 to fs×0.02 samples), 10 ms Hanning fade-in/out. At 44.1 kHz that is 441–882 samples per grain. Regularly spaced grains act like a <b>filtered pulse train</b>.",
      "<b>PSOLA</b> (Pitch Synchronous Overlap-Add): from speech processing; divides the waveform into small overlapping segments. Pitch: segments moved <b>further apart → lower pitch</b>, <b>closer → higher pitch</b>. Duration: segments <b>repeated → longer</b>, some <b>eliminated → shorter</b>. Recombined by overlap-add. Unlike the phase vocoder, there is <b>no STFT</b> in PSOLA (it predates the phase vocoder). Grains far apart → separated by silences; many short overlapping grains → texture."
     ],
     "fig": [
      "mm-5-grain",
      "mm-5-grain-modes",
      "mm-5-granulation",
      "mm-5-psola"
     ],
     "figAt": {
      "mm-5-grain": 4,
      "mm-5-grain-modes": 5,
      "mm-5-granulation": 6,
      "mm-5-psola": 7
     },
     "figH": {
      "mm-5-grain": "A grain: envelope × contents, and its spectrum",
      "mm-5-grain-modes": "Quasi-synchronous, asynchronous and pitch-synchronous grains",
      "mm-5-granulation": "granulation.m: random grains of 441 to 882 samples",
      "mm-5-psola": "PSOLA: move segments for pitch, repeat or drop them for duration"
     }
    },
    {
     "h": "Physical modelling and Karplus-Strong",
     "pts": [
      "<b>Physical modelling</b>: sound generated by a <b>mathematical model</b> (equations and algorithms) of a physical source, with parameters describing materials and the player's interaction (plucking/bowing a string, covering flute toneholes, striking a 2-D drum membrane).",
      "Examples: Yamaha VL1 (1994), Roland COSM, Arturia Moog, PianoTeq. Algorithms: <b>Karplus-Strong</b> (1971), <b>digital waveguide</b> (1980s), <b>formant synthesis</b> (1950s).",
      "<b>Karplus-Strong</b>: makes a musical sound from noise by looping a short <b>white-noise burst</b> (L samples) through a <b>filtered delay line</b> — simulates a plucked/hammered string or percussion. It is essentially a <b>subtractive</b> technique with a feedback loop like a <b>comb filter</b>. The filter gain must be <b>&lt; 1</b> at all frequencies (usually a first-order low-pass).",
      "Tuning: period = delay-line length + average group delay of the filter; fundamental = 1/period, so <b>D = Fs / F1</b>.",
      "Worked: <code>karplus.m</code> uses fs = 44100, D = 200 → F1 = 44100/200 = <b>220.5 Hz</b>. For A = 441 Hz you need D = 44100/441 = <b>100 samples</b>. Its filter is b = −0.99×[0.5 0.5] (averaging with gain 0.99 &lt; 1).",
      "Drum variant: X(t) = +½(X(t−p) + X(t−p+1)) with probability <b>b</b>, else −½(…). p (wavetable length, about 150–500) sets decay (big = long) and pitch (big = low). <b>b</b> = blend factor (0–1): b = ½ best <b>snare</b>; b near 0 → <b>string</b>-like; b near 1 → weird electric <b>crash cymbal</b>.",
      "Presets: crash cymbal b &gt; 0.98, p = 200–800, random table, decaying envelope; metallic plink b &gt; 0.98, p = 5–50; string b &lt; 0.05, p = 20–400. Full demo: guitar notes, fretted strings, chords and strumming."
     ],
     "formula": [
      "D = Fs / F1   (delay in samples)",
      "44100 / 200 = 220.5 Hz ;  44100 / 441 = 100 samples"
     ],
     "fig": [
      "mm-5-ks-diagram",
      "mm-5-karplus",
      "mm-5-ks-drum"
     ],
     "figAt": {
      "mm-5-ks-diagram": 2,
      "mm-5-karplus": 4,
      "mm-5-ks-drum": 6
     },
     "figH": {
      "mm-5-ks-diagram": "The Karplus-Strong loop: noise, delay, filter, feedback",
      "mm-5-karplus": "karplus.m: D = 200 samples gives 220.5 Hz",
      "mm-5-ks-drum": "The drum variant: table length p and blend factor b"
     }
    }
   ],
   "cards": [
    [
     "Seven digital synthesis approaches",
     "Subtractive, additive, FM, sample-based, wavetable, granular, physical modelling."
    ],
    [
     "Subtractive synthesis",
     "Remove overtones from a rich source (e.g. sawtooth) with a filter. First example: Vocoder (1939); popularised by Moog."
    ],
    [
     "Human subtractive synthesis",
     "Vocal cords = oscillator, mouth and throat = filter. \"aah\" keeps most harmonics, \"ooh\" removes most."
    ],
    [
     "ADSR",
     "Attack (time to full volume), Decay (time to drop to sustain), Sustain (a LEVEL held until release), Release (time to fade after key release)."
    ],
    [
     "Additive synthesis",
     "Build complex tones by adding simpler ones (Fourier). Pro: recreates micro-variations of partials. Con: inefficient, lots of data."
    ],
    [
     "FM equation",
     "e = A sin(αt + I sin βt); α carrier, β modulator, I = peak deviation / modulator frequency."
    ],
    [
     "Who discovered FM synthesis?",
     "John Chowning, Stanford 1967-68; patented 1975; licensed to Yamaha (DX7)."
    ],
    [
     "FM sidebands",
     "At carrier ± n × modulator; J0(I) sets carrier amplitude, Jn(I) sets the n-th sideband pair."
    ],
    [
     "FM operators and algorithms",
     "Operators = oscillators (4 or 6). Algorithms = routings: multiple carriers, multiple modulators, feedback."
    ],
    [
     "Sample-based synthesis pro/con",
     "Pro: low processing power, nuances stored in samples. Con: detail needs many simultaneous samples, reducing polyphony."
    ],
    [
     "Velocity layers vs multisampling",
     "Multisampling covers pitch regions (vertical in keymap); velocity layers switch sounds by how hard the key is hit (horizontal)."
    ],
    [
     "Beat detection (simple)",
     "Beat when instant energy (~0.05 s) exceeds average energy (~1 s)."
    ],
    [
     "Wavetable synthesis",
     "Table holds one period of a general waveform; tables crossfaded/enveloped over time. Stores attack sample + looped sustain."
    ],
    [
     "Grain size",
     "About 1-50 ms (usually 10-50 ms); grain = envelope + contents."
    ],
    [
     "Karplus-Strong tuning",
     "D = Fs / F1. Example: 44100 / 200 = 220.5 Hz."
    ]
   ],
   "qa": [
    [
     "Explain the ADSR envelope and why it is needed.",
     "Real instruments change volume over time in characteristic ways (organ constant then stops quickly, guitar loud then fades). ADSR models this: Attack = how fast the sound reaches full volume, Decay = how fast it falls to the sustain level, Sustain = the constant level held while the key is down, Release = how fast it fades after the key is released. It can also control filter frequency or pitch."
    ],
    [
     "Compare additive and wavetable synthesis.",
     "Both can be based on Fourier ideas. Additive sums many sinusoidal partials each with its own envelope; it is rich but inefficient (much data and real-time inverse DFT). Wavetable stores one period of a general waveform per table and crossfades/envelopes between tables; the inverse DFT is precomputed, so it is compact and needs far less real-time computation while being as general."
    ],
    [
     "What are the advantages and disadvantages of sample-based synthesis?",
     "Advantage: much lower processing power than physical modelling or additive synthesis, since the nuances are in pre-recorded samples. Disadvantage: more detail needs several samples playing at once (e.g. trumpet breath, growl, loop), which reduces polyphony."
    ],
    [
     "Describe the Karplus-Strong algorithm and how it is tuned.",
     "A short burst of white noise is fed into a delay line; the delay output goes through a low-pass filter with gain below 1 and is mixed to the output and fed back into the delay line. It is a subtractive, comb-filter-like feedback loop that simulates a plucked string. The period equals the delay length plus the filter's group delay, so D = Fs / F1 (e.g. 44100/200 = 220.5 Hz)."
    ],
    [
     "How does PSOLA change pitch and duration?",
     "It splits the waveform into small overlapping segments. Moving segments closer raises the pitch, further apart lowers it. Repeating segments lengthens the sound, removing some shortens it. Segments are recombined by overlap-add. It uses no STFT, unlike the phase vocoder."
    ],
    [
     "What problems appear when a beat-sliced loop is replayed at a different tempo and how are they solved?",
     "Slower tempo leaves silent gaps between slices; faster tempo makes slice tails overlap. Solutions: apply an envelope to fade each slice to silence before the gap or overlap, and for gaps loop the end of the tail to extend it."
    ]
   ],
   "quiz": [
    {
     "q": "Low-pass filtering a sawtooth wave to imitate a bowed string is an example of:",
     "o": [
      [
       "Additive synthesis",
       "Additive synthesis builds sounds by adding partials, not by filtering them out."
      ],
      [
       "Subtractive synthesis",
       "Correct. A filter removes (subtracts) the higher partials of a rich source."
      ],
      [
       "Granular synthesis",
       "Granular synthesis uses tiny grains of 1-50 ms, not filtering of a waveform."
      ],
      [
       "FM synthesis",
       "FM changes timbre by modulating frequency, not by filtering."
      ]
     ],
     "a": 1
    },
    {
     "q": "In an ADSR envelope, which parameter is a LEVEL rather than a time?",
     "o": [
      [
       "Attack",
       "Attack is a time: how quickly full volume is reached."
      ],
      [
       "Decay",
       "Decay is a time: how quickly the sound drops to the sustain level."
      ],
      [
       "Sustain",
       "Correct. Sustain is the constant volume held until the key is released."
      ],
      [
       "Release",
       "Release is a time: how quickly the sound fades after key release."
      ]
     ],
     "a": 2
    },
    {
     "q": "In the FM equation e = A sin(αt + I sin βt), I is:",
     "o": [
      [
       "The carrier frequency",
       "The carrier frequency is α in e = A sin(αt + I sin βt). I multiplies the modulator term sin βt and sets how strongly the carrier is modulated."
      ],
      [
       "The modulation index: peak deviation / modulator frequency",
       "Correct. It controls how many sidebands have significant energy."
      ],
      [
       "The peak amplitude",
       "The peak amplitude is A, the factor outside the sine. I sits inside the sine and scales the modulator term, so it controls the frequency deviation, not loudness."
      ],
      [
       "The instantaneous amplitude",
       "The instantaneous amplitude is e, the output of the whole equation. I is the modulation index (peak deviation / modulator frequency) inside the sine."
      ]
     ],
     "a": 1
    },
    {
     "q": "A 440 Hz carrier is frequency-modulated by a 30 Hz modulator. Where are the second-order sidebands?",
     "o": [
      [
       "410 Hz and 470 Hz",
       "These are the first-order sidebands (440 ± 30)."
      ],
      [
       "380 Hz and 500 Hz",
       "Correct. 440 ± 2×30 = 380 and 500 Hz, with amplitude J2(I)."
      ],
      [
       "350 Hz and 530 Hz",
       "Those are the third-order sidebands: 440 ± 3 × 30 = 350 and 530 Hz (amplitude J3). Second order uses n = 2: 440 ± 60 = 380 and 500 Hz."
      ],
      [
       "880 Hz and 1320 Hz",
       "These are harmonics of 440, not FM sidebands."
      ]
     ],
     "a": 1
    },
    {
     "q": "FM synthesis was discovered by:",
     "o": [
      [
       "Robert Moog",
       "Robert Moog's synthesisers (1960–70s) popularised subtractive synthesis. FM was discovered by John Chowning at Stanford in 1967–68 (L5, FM synthesis)."
      ],
      [
       "John Chowning at Stanford",
       "Correct. 1967-68, patented 1975 and licensed to Yamaha."
      ],
      [
       "Iannis Xenakis",
       "Xenakis (1971) is linked to granular synthesis (\"all sound is an integration of grains\"). FM was discovered by John Chowning at Stanford (L5, FM synthesis)."
      ],
      [
       "Denis Gabor",
       "Gabor proposed the grain as the quantum of sound."
      ]
     ],
     "a": 1
    },
    {
     "q": "To create bell-like, dissonant FM sounds, the modulator frequency should be:",
     "o": [
      [
       "An integer multiple of the carrier",
       "Integer (harmonic) ratios give harmonic sounds."
      ],
      [
       "A non-integer multiple of the carrier",
       "Correct. Non-harmonic ratios make inharmonic, bell-like and percussive sounds."
      ],
      [
       "Zero",
       "A zero-frequency modulator gives no modulation at all, so only the plain carrier sine remains. Bell-like sounds need a non-integer carrier:modulator ratio."
      ],
      [
       "Exactly equal to the sampling rate",
       "The sampling rate plays no role in FM timbre design. What matters is the carrier:modulator ratio: integer ratios give harmonic sounds, non-integer ratios bell-like ones."
      ]
     ],
     "a": 1
    },
    {
     "q": "The main disadvantage of additive synthesis is:",
     "o": [
      [
       "It cannot recreate natural sounds",
       "The opposite: its advantage is that it can recreate the micro-variations in frequency and amplitude of each partial that make natural sounds rich (L5, Additive synthesis)."
      ],
      [
       "It is inefficient: a great deal of data must be specified",
       "Correct. Every partial needs its own frequency/amplitude data."
      ],
      [
       "It needs sampled instruments",
       "Additive synthesis builds tones by summing simpler waveforms (typically sines, per Fourier theory); needing sampled sounds describes sample-based synthesis."
      ],
      [
       "It reduces polyphony because of multi-samples",
       "That is the disadvantage of sample-based synthesis."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which is an advantage of wavetable synthesis?",
     "o": [
      [
       "It computes the inverse DFT in real time",
       "That is what additive synthesis does; wavetable precomputes it."
      ],
      [
       "It stores far less data than a PCM sample of the same sound",
       "Correct. It exploits quasi-periodicity to remove redundancy."
      ],
      [
       "Its tables hold many seconds of audio",
       "Tables are rarely more than 1-2 periods long."
      ],
      [
       "It cannot change the waveform over time",
       "Dynamic waveshaping (crossfading, enveloping) is a key feature."
      ]
     ],
     "a": 1
    },
    {
     "q": "Grains in granular synthesis are typically about:",
     "o": [
      [
       "1 to 50 ms",
       "Correct. Grains are small pieces, usually 10-50 ms."
      ],
      [
       "1 to 5 s",
       "1–5 s is the length of ordinary samples or notes. Granular synthesis splits samples into tiny grains of about 1–50 ms on the microsound time scale."
      ],
      [
       "1 to 50 µs",
       "Microseconds are a thousand times too short: 50 µs is only about 2 samples at 44.1 kHz. Grains are about 1–50 ms (usually 10–50 ms)."
      ],
      [
       "One full song",
       "A whole song is the opposite of a grain. Granular synthesis cuts audio into small pieces of about 1–50 ms and layers many of them."
      ]
     ],
     "a": 0
    },
    {
     "q": "In PSOLA, moving the overlapping segments further apart:",
     "o": [
      [
       "Raises the pitch",
       "Raising the pitch is done by moving the segments closer together (shorter period). Moving them further apart lengthens the period and lowers the pitch (L5, PSOLA)."
      ],
      [
       "Lowers the pitch",
       "Correct. Wider spacing means a longer period, so lower pitch."
      ],
      [
       "Shortens the duration only",
       "Duration is changed by repeating or removing segments."
      ],
      [
       "Requires an STFT",
       "PSOLA uses no STFT; that is the phase vocoder."
      ]
     ],
     "a": 1
    },
    {
     "q": "A Karplus-Strong string uses Fs = 44100 Hz and a delay line of D = 200 samples. The fundamental is about:",
     "o": [
      [
       "200 Hz",
       "200 is the delay length D in samples, not a frequency. The fundamental is F1 = Fs / D = 44100 / 200 = 220.5 Hz."
      ],
      [
       "220.5 Hz",
       "Correct. F1 = Fs / D = 44100 / 200 = 220.5 Hz."
      ],
      [
       "441 Hz",
       "441 Hz would need D = 44100 / 441 = 100 samples, half the given delay. With D = 200, F1 = 44100 / 200 = 220.5 Hz."
      ],
      [
       "8820 Hz",
       "8820 Hz comes from multiplying 44100 × 0.2 instead of dividing. The rule is F1 = Fs / D = 44100 / 200 = 220.5 Hz."
      ]
     ],
     "a": 1
    },
    {
     "q": "In simple sound-energy beat detection, a beat is detected when:",
     "o": [
      [
       "The instant energy (~0.05 s) is larger than the local average energy (~1 s)",
       "Correct. The ear hears a beat when energy is much larger than its recent history."
      ],
      [
       "The signal crosses zero",
       "Zero crossings are used for loop points, not beats."
      ],
      [
       "The average energy is larger than the instant energy",
       "That is the reverse condition. A beat is heard when the instant energy (~0.05 s) is larger than the local average energy (~1 s), not smaller."
      ],
      [
       "All 32 sub-bands are silent",
       "In the sub-band method, a beat is one or more bands above their average."
      ]
     ],
     "a": 0
    },
    {
     "q": "When a beat-sliced drum loop is played at a FASTER tempo, the artefact is:",
     "o": [
      [
       "Silent gaps between slices",
       "Silent gaps appear when the loop is played SLOWER, because slices end before the next one starts. Faster tempo makes slice tails overlap."
      ],
      [
       "Tail overlap between slices",
       "Correct. Slices start before the previous tail finishes."
      ],
      [
       "Aliasing of the attacks",
       "The lecture says the attacks stay artefact-free whatever the tempo, which is why slicing suits percussion. The faster-tempo artefact is tail overlap."
      ],
      [
       "Loss of velocity layers",
       "Velocity layers belong to sample-based synthesis (sound chosen by key velocity) and are not affected by tempo. Faster tempo causes tail overlap between slices."
      ]
     ],
     "a": 1
    }
   ]
  },
  {
   "n": 6,
   "title": "MIDI and MPEG-4 Structured Audio",
   "notes": [
    {
     "h": "What is MIDI and why is it a compression tool?",
     "pts": [
      "<b>MIDI definition</b>: a <b>protocol</b> that enables computers, synthesisers, keyboards and other musical devices to <b>communicate</b> with each other.",
      "No longer only for musicians: MIDI is a <b>very low bandwidth</b> alternative on the Web for transmitting music and certain sound-effect data, and (in modified form) is used as a <b>compression control language</b> (MPEG-4, HTML5).",
      "MIDI as compression: a file needs only a <b>few 100K bytes</b> of storage / very low bandwidth, because MIDI sends <b>instructions</b> (which note, how loud, which instrument), not audio samples.",
      "The <b>responsibility of producing the sound is moved to the client</b>: a synthesiser module, sampler, soundcard or software synth. Most web browsers can handle MIDI (plugins such as QuickTime, MPEG-4, and since 2013 the <b>Web MIDI API</b> in HTML5).",
      "History: MIDI is about <b>40 years old</b> (2022/3) and still evolving, e.g. <b>MIDI 2.0</b> (\"High Definition MIDI\"). An iPad even played an old Commodore sequencer."
     ],
     "fig": [
      "mm-6-instr"
     ],
     "figAt": {
      "mm-6-instr": 3
     },
     "figH": {
      "mm-6-instr": "Audio sends samples, MIDI sends instructions the client turns into sound"
     }
    },
    {
     "h": "Components of a MIDI system",
     "pts": [
      "<b>Synthesiser / Sampler</b>: a <b>sound generator</b> (various pitch, loudness, tone colour) using any synthesis or sample-based method. In this course \"synthesiser\" = the <b>tone generation unit</b>. Has MIDI IN/OUT and/or USB/Bluetooth/WiFi; can be software (virtual MIDI connections).",
      "<b>Sequencer</b>: a stand-alone hardware unit or software on a computer; MIDI INs/OUTs and/or USB/Bluetooth/WiFi; software sequencers have internal virtual MIDI connections.",
      "<b>Computer</b>: the <b>heart</b> of a MIDI system; controls <b>scheduling, synchronisation and recording</b> of all data. Sequencers now live inside <b>Digital Audio Workstations</b> (Cubase, Logic, Sonar, Live, Reason) with softsynths (VSTi, Audio Units), real-time effects and even video control.",
      "<b>MIDI control input devices</b>: usually a keyboard with extra controls (sustain, pitch bend, modulation, aftertouch); or another instrument (customised guitar, wind controller), a bunch of controllers, motion capture, virtual input, even \"mind control\"; breath, motion and bite controllers exist.",
      "<b>MIDI interfaces</b>: connect MIDI devices to the computer, wired or wireless; often bundled into the keyboard/controller or an audio interface; via MIDI cable, USB, Ethernet, Bluetooth or WiFi.",
      "<b>MIDI control output devices</b>: MIDI controls more than sound: <b>lighting, robotics</b> (Pat Metheny's robot band, the <b>Orchestrion</b>), video systems (video DJing), <b>MPEG-4 compression</b>, even \"hamster control\"."
     ],
     "fig": [
      "mm-6-system"
     ],
     "figH": {
      "mm-6-system": "The parts of a MIDI system, from input device to sound and other outputs"
     }
    },
    {
     "h": "Basic MIDI concepts and hardware",
     "pts": [
      "<b>Track</b>: used in a sequencer to organise recordings; tracks can be turned on/off when recording or playing back.",
      "<b>Channel</b>: separates information in a MIDI system. There are <b>16 MIDI channels in one \"cable\"</b>. The channel number is <b>coded into each MIDI message</b>.",
      "<b>Timbre</b>: the quality of the sound (flute sound, cello sound…). <b>Multitimbral</b> = can play many different sounds at the same time (piano, brass, drums…).",
      "<b>Pitch</b>: the musical note the instrument plays.",
      "<b>Voice</b>: the portion of the synthesiser that produces sound. Synthesisers have many voices (12, 20, 24, 36…), each working independently and simultaneously to produce sounds of different timbre and pitch.",
      "<b>Patch</b>: the control settings that define a particular timbre.",
      "<b>Connectors</b>: standard interface is USB or (older) <b>three 5-pin ports</b>: <b>MIDI IN</b> (receives all MIDI data), <b>MIDI OUT</b> (transmits the data the device <b>generates itself</b>), <b>MIDI THROUGH</b> (<b>echoes</b> the data received at MIDI IN). Modern devices bundle these and connect directly (USB/Ethernet, Bluetooth/WiFi)."
     ],
     "fig": [
      "mm-6-concepts",
      "mm-6-ports"
     ],
     "figAt": {
      "mm-6-concepts": 5,
      "mm-6-ports": 6
     },
     "figH": {
      "mm-6-concepts": "Track, channel, timbre, pitch, voice and patch in one sequencer and synth",
      "mm-6-ports": "MIDI IN, OUT and THRU chaining a keyboard, an interface and two modules"
     }
    },
    {
     "h": "Structure of MIDI messages",
     "pts": [
      "MIDI messages are how devices communicate; they are very low bandwidth. A <b>Note On</b> says which key is pressed and on which channel (what sound to play) using just <b>3 hexadecimal numbers</b>. Note Off is similar; other commands (e.g. <b>program change</b>) configure the sounds.",
      "A message = <b>one status byte + up to two data bytes</b>.",
      "<b>Status byte</b>: most significant bit (MSB) = <b>1</b>; the <b>4 low-order bits = channel</b> (4 bits → 16 channels); the <b>3 remaining bits = which message</b>.",
      "<b>Data byte</b>: MSB = <b>0</b>, so each data value is 7 bits: <b>0–127</b> (hex 00–7F). Status bytes are therefore hex 80–FF.",
      "Channel numbering: the nibble holds 0–15 but musicians number channels <b>1–16</b>. The slide example uses channel 13 = hex C (i.e. nibble value 12 + 1).",
      "Classification: <b>Channel messages</b> → <b>voice</b> messages and <b>mode</b> messages. <b>System messages</b> → <b>common</b>, <b>real-time</b> and <b>exclusive</b> messages."
     ],
     "code": "Status byte:  1 m m m  c c c c      (m = message type, c = channel 0-15)\nData byte:    0 d d d  d d d d      (value 0-127)\n\nExample 9C 50 7F:\n  9C = 1001 1100 -> 1 | 001 = Note On (9x) | 1100 = C = 12 -> channel 13\n  50 = 0101 0000 = 80  -> key (note) number 80\n  7F = 0111 1111 = 127 -> maximum velocity",
     "fig": [
      "mm-6-bits",
      "mm-6-classes"
     ],
     "figAt": {
      "mm-6-bits": 4,
      "mm-6-classes": 5
     },
     "figH": {
      "mm-6-bits": "9C 50 7F decoded bit by bit: status byte, message type, channel, data",
      "mm-6-classes": "How MIDI messages are classified, with their status bytes"
     }
    },
    {
     "h": "Channel voice and mode messages",
     "pts": [
      "<b>Channel voice messages</b> are transmitted on <b>individual channels</b> rather than globally to all devices. They instruct the receiver to assign sounds to its voices, turn notes on and off, and alter the sound of the active notes.",
      "<b>Channel mode messages</b> are a special case of <b>Control Change (Bx, binary 1011nnnn)</b>. The difference is in the <b>first data byte</b>: values <b>121 to 127</b> are reserved for channel mode messages. They determine <b>how an instrument processes voice messages</b>."
     ],
     "table": [
      [
       "Voice message",
       "Status byte",
       "Data byte 1",
       "Data byte 2"
      ],
      [
       "Note off",
       "8x",
       "Key number",
       "Note off velocity"
      ],
      [
       "Note on",
       "9x",
       "Key number",
       "Note on velocity"
      ],
      [
       "Polyphonic key pressure",
       "Ax",
       "Key number",
       "Amount of pressure"
      ],
      [
       "Control change",
       "Bx",
       "Controller number",
       "Controller value"
      ],
      [
       "Program change",
       "Cx",
       "Program number",
       "None"
      ],
      [
       "Channel pressure",
       "Dx",
       "Pressure value",
       "None"
      ],
      [
       "Pitch bend",
       "Ex",
       "MSB",
       "LSB"
      ]
     ],
     "fig": [
      "mm-6-builder"
     ],
     "figH": {
      "mm-6-builder": "Build any voice message from the table, and spot a mode message"
     }
    },
    {
     "h": "Worked examples: decoding and sizing MIDI messages",
     "pts": [
      "<b>Rule</b>: first hex digit = message type, second hex digit = channel − 1. Channel n (1–16) → nibble n − 1.",
      "<b>9C 50 7F</b> (slide example): Note On, channel 13, key 80, velocity 127. <b>3 bytes</b>.",
      "<b>80 3C 40</b>: 8 = Note Off, 0 → channel 1; 3C = 3×16 + 12 = <b>60</b>; 40 = 4×16 = <b>64</b>. Note Off, channel 1, key 60, release velocity 64.",
      "<b>Note On, key 38 (Acoustic Snare in the GM percussion map), velocity 100, on channel 10</b> (the GM drum channel): status 9 + (10 − 1 = 9) = <b>99</b>; 38 = 2×16 + 6 = <b>26</b>; 100 = 6×16 + 4 = <b>64</b>. Message: <b>99 26 64</b>.",
      "<b>Program change</b> has only <b>one</b> data byte (2 bytes total); <b>channel pressure</b> also 2 bytes. Note on/off, poly pressure, control change and pitch bend are 3 bytes.",
      "<b>Size comparison</b>: a 1-minute piece with 1000 notes needs 1000 Note On + 1000 Note Off = 2000 × 3 = <b>6000 bytes</b>. One minute of stereo CD audio = 44100 × 16 × 2 × 60 / 8 = <b>10,584,000 bytes</b> (about 10 MB). That is why MIDI is called a compression tool.",
      "<b>Transmission time</b> (standard MIDI 1.0 fact, not on the slides): the serial link runs at <b>31.25 kbaud</b> and each byte is sent as <b>10 bits</b> (start + 8 data + stop). A 3-byte message = 30 bits / 31,250 bit/s = <b>0.96 ms</b>, so about 1041 three-byte messages per second."
     ],
     "fig": [
      "mm-6-decoder",
      "mm-6-size",
      "mm-6-wire"
     ],
     "figAt": {
      "mm-6-decoder": 3,
      "mm-6-size": 5,
      "mm-6-wire": 6
     },
     "figH": {
      "mm-6-decoder": "Decode the notes' examples or your own MIDI bytes",
      "mm-6-size": "1000 notes of MIDI against one minute of CD audio, to scale",
      "mm-6-wire": "A 3-byte message on the 31.25 kbaud link takes 0.96 ms"
     }
    },
    {
     "h": "System messages and General MIDI",
     "pts": [
      "<b>System messages</b> carry information that is <b>not channel specific</b>: timing signals for synchronisation, positioning in pre-recorded sequences, detailed setup for the destination device (sounds, patch names).",
      "<b>System real-time</b> (timing/synchronisation): Timing Clock <b>F8</b>, Start Sequence <b>FA</b>, Continue <b>FB</b>, Stop <b>FC</b>, Active Sensing <b>FE</b>, System Reset <b>FF</b>.",
      "<b>System common</b> (unrelated messages): MIDI Timing Code <b>F1</b> (1 data byte), Song Position Pointer <b>F2</b> (2), Song Select <b>F3</b> (1), Tune Request <b>F6</b> (none).",
      "<b>System exclusive (Sysex)</b>: things that cannot be standardised (system-dependent creation/organisation of sounds; not GM compliant). An addition to the original spec: a stream of bytes with high bits 0, bracketed by <b>F0 (Sysex Start)</b> and <b>F7 (Sysex End)</b>. Format is system dependent.",
      "<b>General MIDI (GM)</b>: problem = MIDI music may not sound the same everywhere. GM = <b>MIDI + Instrument Patch Map + Percussion Key Map</b> so a piece sounds (more or less) the same anywhere.",
      "<b>Patch map</b>: a standard list of <b>128 instruments</b> in 16 families of 8 (1–8 Piano, 9–16 Chromatic Percussion, 17–24 Organ, 25–32 Guitar, 33–40 Bass, 41–48 Strings, 49–56 Ensemble, 57–64 Brass, 65–72 Reed, 73–80 Pipe, 81–88 Synth Lead, 89–96 Synth Pad, 97–104 Synth Effects, 105–112 Ethnic, 113–120 Percussive, 121–128 Sound Effects). E.g. 1 Acoustic Grand, 41 Violin, 57 Trumpet, 74 Flute, 128 Gunshot.",
      "<b>Percussion map</b>: <b>47 percussion sounds</b> on keys <b>35–81</b> (35 Acoustic Bass Drum, 38 Acoustic Snare, 42 Closed Hi-Hat, 49 Crash Cymbal 1, 81 Open Triangle). Key-based percussion is transmitted on <b>channel 10</b> by default (other channels possible). Each key is essentially a <b>switch</b>, no pitch information; it can even trigger video (VJ).",
      "<b>GM requirements</b>: support all <b>16 channels</b>; each channel can play a different instrument (<b>multitimbral</b>); each channel can play many notes (<b>polyphony</b>); a minimum of <b>24</b> fully dynamically allocated voices (usually 64/128) shared across all channels."
     ],
     "fig": [
      "mm-6-sysbytes",
      "mm-6-patch",
      "mm-6-drums"
     ],
     "figAt": {
      "mm-6-sysbytes": 3,
      "mm-6-patch": 5,
      "mm-6-drums": 6
     },
     "figH": {
      "mm-6-sysbytes": "The system status bytes F0 to FF: real-time, common and exclusive",
      "mm-6-patch": "The GM patch map: 128 instruments in 16 families of 8",
      "mm-6-drums": "The GM percussion keys 35 to 81 and their Note On bytes on channel 10"
     }
    },
    {
     "h": "Limitations of MIDI and MPEG-4 Structured Audio",
     "pts": [
      "<b>Limitations</b>: limited number of channels and controllers; limited resolution (most MIDI numbers are 8-bit). Solutions: combine two data values as LSB and MSB (<b>16-bit range</b>, per the slide); <b>Open Sound Control (OSC)</b>; <b>MIDI 2.0</b> High Definition MIDI.",
      "<b>MPEG-4 audio</b> combines <b>compression, synthesis and MIDI</b>: encode <b>what note to play and how to play it</b> with a small number of parameters, a much greater reduction than encoding audio bits. Creating the audio is delegated to the generation side.",
      "MPEG-4 is newer than MP3, covers everything from very low bit-rate speech to full-bandwidth high-quality audio, and has built-in anti-piracy measures.",
      "<b>6 Structured Audio tools</b>: <b>SAOL</b> (Orchestra Language), <b>SASL</b> (Score Language), <b>SASBF</b> (Sample Bank Format), <b>MIDI semantics</b> (control SAOL with a subset of MIDI), <b>Scheduler</b> (how to combine the parts to create sound), <b>AudioBIFS</b> (part of BIFS, builds soundtracks with tools and effects).",
      "<b>SAOL</b> (\"sail\"): the central part; a software-synthesis language describing synthesisers/instruments; designed for MPEG-4; not tied to one method: FM, physical modelling, sample-based, granular, subtractive, FOF and hybrids.",
      "<b>SASL</b>: a very simple language to control SAOL instruments: what notes, how loud, what tempo, how long, how to control them. Like MIDI but without MIDI's limits on temporal resolution/bandwidth, with a richer controller structure. Limitations: no looping, sections, repeats, expression evaluation; most scores are made by automatic tools.",
      "<b>SASBF</b>: efficiently transmits banks of samples for wavetable/sample-based synthesis; partly compatible with MIDI <b>DLS</b> (Downloaded Sounds); driven by <b>EMu Systems</b> and the <b>MMA</b>.",
      "<b>MIDI semantics</b>: SAOL can be driven by SASL scripts or MIDI, because MIDI is the most common score representation and many tools (sequencers) use it. MIDI syntax stays external (MMA standard) but some semantics are redefined in MPEG-4.",
      "<b>Scheduler</b>: the main body of Structured Audio; defines how SAOL creates sound when driven by MIDI or SASL.",
      "<b>AudioBIFS</b>: BIFS = MPEG-4 <b>Binary Format for Scene Description</b>, describing how objects (video, sounds, animations) fit together. AudioBIFS specifies <b>mixing and post-production</b> of audio scenes at playback (e.g. voice mixed with background music, fading after 10 s, new music with reverb). An extended <b>VRML</b>. Example tree: Piano, Bass, Vocal AudioSources → AudioFX / AudioDelay → AudioMix nodes → final AudioMix.",
      "<b>HTML5 Web MIDI API</b>: lets web developers access MIDI input/output devices (hardware and software) with JavaScript; synthesis in the browser; support is not complete across browsers. Examples: the <b>Google Doodle Mini Moog</b> (subtractive synthesis, Bob Moog's 78th birthday), modular subtractive synth, FM (DX7) synth, drum machine, granular synth, Chrome Music Lab."
     ],
     "fig": [
      "mm-6-msblsb",
      "mm-6-sa-tools",
      "mm-6-bifs"
     ],
     "figAt": {
      "mm-6-msblsb": 0,
      "mm-6-sa-tools": 8,
      "mm-6-bifs": 9
     },
     "figH": {
      "mm-6-msblsb": "Two 8-bit values as MSB and LSB give a 16-bit range",
      "mm-6-sa-tools": "How the six Structured Audio tools work together",
      "mm-6-bifs": "An AudioBIFS tree mixing Piano, Bass and Vocal streams"
     }
    }
   ],
   "cards": [
    [
     "MIDI (definition)",
     "A protocol that enables computers, synthesisers, keyboards and other musical devices to communicate with each other."
    ],
    [
     "Why is MIDI a compression tool?",
     "It sends instructions (note, velocity, instrument) not audio samples; a few 100 KB and very low bandwidth; sound generation is moved to the client."
    ],
    [
     "Number of MIDI channels per cable",
     "16 (coded in the 4 low-order bits of the status byte)."
    ],
    [
     "Status byte layout",
     "MSB = 1, next 3 bits = message type, low 4 bits = channel."
    ],
    [
     "Data byte layout",
     "MSB = 0, so values 0 to 127 (hex 00 to 7F)."
    ],
    [
     "Note On / Note Off status",
     "9x / 8x, where x = channel number minus 1."
    ],
    [
     "Decode 9C 50 7F",
     "Note On, channel 13, key 80, velocity 127."
    ],
    [
     "Program Change",
     "Cx + one data byte (program number); 2 bytes total."
    ],
    [
     "Channel mode messages",
     "Control Change (Bx) messages whose first data byte is 121 to 127."
    ],
    [
     "MIDI IN / OUT / THROUGH",
     "IN receives data; OUT sends data the device generates itself; THROUGH echoes what arrives at IN."
    ],
    [
     "Sysex start and end bytes",
     "F0 starts and F7 ends a system exclusive message."
    ],
    [
     "System real-time bytes",
     "F8 clock, FA start, FB continue, FC stop, FE active sensing, FF reset."
    ],
    [
     "General MIDI",
     "MIDI + 128-instrument patch map + 47-sound percussion key map; drums on channel 10; at least 24 voices."
    ],
    [
     "Voice vs Patch vs Timbre",
     "Voice = part of the synth that produces a sound; Patch = settings defining a timbre; Timbre = quality of the sound (flute, cello)."
    ],
    [
     "6 MPEG-4 Structured Audio tools",
     "SAOL, SASL, SASBF, MIDI semantics, Scheduler, AudioBIFS."
    ]
   ],
   "qa": [
    [
     "Describe the structure of a MIDI message.",
     "A status byte followed by up to two data bytes. The status byte has its most significant bit set to 1, three bits for the message type and four low-order bits for the channel (16 channels). Data bytes have their most significant bit set to 0, so they carry values 0 to 127."
    ],
    [
     "Give the MIDI bytes to play note 80 at maximum velocity on channel 13 and explain them.",
     "9C 50 7F. 9 means Note On and C (12) codes channel 13; 50 hex = 80 is the key number; 7F hex = 127 is the maximum velocity."
    ],
    [
     "Classify MIDI messages.",
     "Channel messages (voice messages and mode messages) and system messages (common, real-time and exclusive messages)."
    ],
    [
     "What is General MIDI and what are its requirements?",
     "A standard so MIDI music sounds roughly the same anywhere: MIDI plus a 128-instrument patch map plus a 47-sound percussion key map (percussion on channel 10). A GM device must support all 16 channels, be multitimbral, be polyphonic and have at least 24 dynamically allocated voices."
    ],
    [
     "What are the limitations of MIDI and how are they solved?",
     "Limited channels and controllers and limited (mostly 8-bit) data resolution. Solutions: pair two data values as LSB/MSB for a larger range, Open Sound Control, and MIDI 2.0 High Definition MIDI."
    ],
    [
     "List and describe the MPEG-4 Structured Audio tools.",
     "SAOL describes synthesisers/instruments; SASL is the score telling SAOL what notes to play, how loud, tempo and duration; SASBF transmits sample banks for wavetable synthesis; MIDI semantics let a MIDI subset control SAOL; the Scheduler defines how SAOL makes sound when driven by MIDI or SASL; AudioBIFS describes mixing and post-production of audio scenes."
    ]
   ],
   "quiz": [
    {
     "q": "In a MIDI status byte, the four low-order bits identify:",
     "o": [
      [
       "The channel",
       "Correct. The status byte is 1 mmm cccc: the 4 low-order bits hold the channel (0–15, shown to musicians as 1–16), so one cable carries 16 channels (L6, MIDI messages)."
      ],
      [
       "The message type",
       "The message type is the 3 bits after the MSB."
      ],
      [
       "The velocity",
       "Velocity is not in the status byte; in Note On/Off it is the second data byte (0–127). The status byte's low 4 bits are the channel."
      ],
      [
       "The key number",
       "The key number is the first data byte of a note message."
      ]
     ],
     "a": 0
    },
    {
     "q": "The most significant bit of a MIDI data byte is:",
     "o": [
      [
       "1",
       "An MSB of 1 marks a status byte (hex 80–FF). Data bytes always start with 0, which is why their values run 0–127."
      ],
      [
       "Either, depending on the channel",
       "It is fixed so receivers can tell status from data."
      ],
      [
       "0",
       "Correct. That is why data values run 0 to 127."
      ],
      [
       "The parity bit",
       "MIDI bytes carry no parity bit in the message."
      ]
     ],
     "a": 2
    },
    {
     "q": "What does the message <code>9C 50 7F</code> mean?",
     "o": [
      [
       "Note Off, channel 12, key 50, velocity 7",
       "9x is Note On, and the values must be read as hex."
      ],
      [
       "Program change 80 on channel 9",
       "Program change is Cx and has only one data byte."
      ],
      [
       "Control change on channel 13",
       "Control Change has status Bx, not 9x. The first nibble 9 means Note On, and C codes channel 13, so 9C 50 7F is Note On, key 80, velocity 127."
      ],
      [
       "Note On, channel 13, key 80, velocity 127",
       "Correct. 9 = Note On, C codes channel 13, 50h = 80, 7Fh = 127."
      ]
     ],
     "a": 3
    },
    {
     "q": "Which status byte sends Note On on MIDI channel 10?",
     "o": [
      [
       "9A",
       "A = 10 codes channel 11, because channels 1–16 are coded 0–15."
      ],
      [
       "99",
       "Correct. Channel 10 → nibble 9, Note On → 9, so 99."
      ],
      [
       "8A",
       "8x is Note Off, not Note On, and nibble A would be channel 11. Note On on channel 10 is 9 followed by 10 − 1 = 9, giving 99."
      ],
      [
       "C9",
       "Cx is Program Change (first nibble C), here on channel 10. Note On needs first nibble 9, so the byte is 99."
      ]
     ],
     "a": 1
    },
    {
     "q": "How many bytes does a Program Change message occupy?",
     "o": [
      [
       "2",
       "Correct. Status Cx plus one data byte (program number)."
      ],
      [
       "1",
       "One byte would be just the status byte Cx. Program Change also needs one data byte holding the program number, so it is 2 bytes."
      ],
      [
       "3",
       "3 bytes is the size of Note On/Off, Control Change and Pitch Bend. Program Change has only one data byte (data byte 2 = none), so 2 bytes."
      ],
      [
       "4",
       "A MIDI message is one status byte plus up to two data bytes, so at most 3 bytes. Program Change uses 2 (status Cx + program number)."
      ]
     ],
     "a": 0
    },
    {
     "q": "Channel mode messages are a special case of which message?",
     "o": [
      [
       "Program Change (Cx)",
       "Program Change (Cx) selects an instrument and has a single data byte. Mode messages are Control Change (Bx) with first data byte 121–127 (L6, Channel mode messages)."
      ],
      [
       "System Exclusive (F0)",
       "Sysex is a system message, not a channel message."
      ],
      [
       "Pitch Bend (Ex)",
       "Pitch Bend (Ex) carries an MSB/LSB bend value and has no reserved numbers. Mode messages are Control Change (Bx) with first data byte 121–127."
      ],
      [
       "Control Change (Bx) with first data byte 121–127",
       "Correct. Those controller numbers are reserved for mode messages."
      ]
     ],
     "a": 3
    },
    {
     "q": "Which MIDI port echoes the data received at MIDI IN?",
     "o": [
      [
       "MIDI OUT",
       "MIDI OUT transmits only the data the device generates itself. Echoing what arrives at MIDI IN is the job of MIDI THROUGH (L6, Connectors)."
      ],
      [
       "MIDI IN",
       "MIDI IN is where data is received, not repeated. The port that echoes the data received at IN is MIDI THROUGH."
      ],
      [
       "MIDI THROUGH",
       "Correct. Of the three 5-pin ports, IN receives data, OUT sends the device's own data, and THROUGH echoes the data received at MIDI IN so devices can be chained (L6, Connectors)."
      ],
      [
       "USB",
       "USB is a modern connection, not the echo port."
      ]
     ],
     "a": 2
    },
    {
     "q": "System exclusive messages are bracketed by:",
     "o": [
      [
       "F8 and FC",
       "These are Timing Clock and Stop Sequence (real-time)."
      ],
      [
       "F0 and F7",
       "Correct. A Sysex message is a stream of data bytes (high bit 0) bracketed by F0 (Sysex Start) and F7 (Sysex End); its format is system dependent (L6, System messages)."
      ],
      [
       "FA and FB",
       "FA (Start Sequence) and FB (Continue) are system real-time messages for sequence control. Sysex is bracketed by F0 and F7."
      ],
      [
       "80 and 90",
       "80 and 90 are status bytes for Note Off and Note On on channel 1, channel voice messages. Sysex is bracketed by F0 and F7."
      ]
     ],
     "a": 1
    },
    {
     "q": "In General MIDI, key-based percussion is transmitted by default on channel:",
     "o": [
      [
       "1",
       "Channel 1 is an ordinary melodic channel. General MIDI sends key-based percussion on channel 10 by default (L6, General MIDI)."
      ],
      [
       "16",
       "Channel 16 is just the last of the 16 channels, not the drum channel. GM key-based percussion defaults to channel 10."
      ],
      [
       "Any; there is no default",
       "The default is channel 10 (other channels are possible)."
      ],
      [
       "10",
       "Correct. In General MIDI the percussion key map (47 sounds on keys 35–81) is played on channel 10 by default, though other channels are possible (L6, General MIDI)."
      ]
     ],
     "a": 3
    },
    {
     "q": "The GM instrument patch map contains how many instruments?",
     "o": [
      [
       "128",
       "Correct. The GM patch map is a standard list of 128 instruments in 16 families of 8 (e.g. 1 Acoustic Grand, 41 Violin, 128 Gunshot) (L6, General MIDI)."
      ],
      [
       "47",
       "47 is the size of the GM percussion key map (keys 35–81). The instrument patch map has 128 instruments in 16 families of 8."
      ],
      [
       "16",
       "16 is the number of MIDI channels (and of patch-map families). The patch map itself has 16 × 8 = 128 instruments."
      ],
      [
       "24",
       "24 is the minimum number of dynamically allocated voices for GM. The patch map has 128 instruments."
      ]
     ],
     "a": 0
    },
    {
     "q": "The minimum number of dynamically allocated voices required for GM compatibility is:",
     "o": [
      [
       "16",
       "16 is the number of channels a GM device must support. The voice requirement is at least 24 dynamically allocated voices."
      ],
      [
       "47",
       "47 is the number of sounds in the GM percussion key map. The minimum voice count is 24."
      ],
      [
       "24",
       "Correct. GM requires at least 24 fully dynamically allocated voices shared across all 16 channels; real devices usually have 64 or 128 (L6, GM requirements)."
      ],
      [
       "128",
       "128 is the number of instruments in the GM patch map. The minimum voice count for GM is 24 (usually 64/128 in practice)."
      ]
     ],
     "a": 2
    },
    {
     "q": "Which MPEG-4 Structured Audio tool is the language that describes synthesisers (instruments)?",
     "o": [
      [
       "SASL",
       "SASL is the score language that tells instruments what to play."
      ],
      [
       "SASBF",
       "SASBF (Sample Bank Format) efficiently transmits banks of samples for wavetable/sample-based synthesis. The language that describes instruments is SAOL."
      ],
      [
       "AudioBIFS",
       "AudioBIFS describes mixing/post-production of audio scenes."
      ],
      [
       "SAOL",
       "Correct. The Structured Audio Orchestra Language, pronounced \"sail\"."
      ]
     ],
     "a": 3
    },
    {
     "q": "A 3-byte MIDI message on a 31.25 kbaud link (10 bits per byte) takes about:",
     "o": [
      [
       "0.96 ms",
       "Correct. 3 × 10 = 30 bits; 30 / 31,250 = 0.00096 s."
      ],
      [
       "0.096 ms",
       "This is ten times too small: 30 bits / 31,250 bit/s = 0.00096 s = 0.96 ms, not 0.096 ms. The slip is moving the decimal point when converting to ms."
      ],
      [
       "9.6 ms",
       "This is ten times too large: 30 / 31,250 = 0.00096 s = 0.96 ms. 9.6 ms would need 300 bits, i.e. 30 bytes."
      ],
      [
       "0.77 ms",
       "That would be 3 × 8 = 24 bits, ignoring start/stop bits."
      ]
     ],
     "a": 0
    }
   ]
  },
  {
   "n": 7,
   "title": "Digital Audio Effects",
   "notes": [
    {
     "h": "Where effects go and how they are classified",
     "pts": [
      "Effects can be applied <b>during creation/synthesis</b> (then filtered or re-synthesised) or at the <b>end of the audio chain</b> (production / mastering).",
      "Effects can be chained in series or in a <b>parallel</b> audio chain. The <b>order matters</b>: the same effects in a different order can give drastically different output. There is <b>no absolute rule</b> for ordering; it depends on the sound you want.",
      "Standard orders: <b>Compression → Distortion → EQ → Noise Redux → Amp Sim → Modulation → Delay → Reverb</b>. A guitar multi-effects pedal (Zoom G1/G1X) links 8 modules in series: COMP/EFX, DRIVE, EQ, ZNR, AMP, MODULATION, DELAY, REVERB (e.g. the MODULATION module offers Chorus, Flanger...; REVERB offers Hall, Room...).",
      "<b>Classification by how the signal is processed</b>:",
      "• <b>Basic filtering</b>: lowpass, highpass, equaliser<br>• <b>Time-varying filters</b>: wah-wah, phaser<br>• <b>Delays</b>: vibrato, flanger, chorus, echo<br>• <b>Modulators</b>: ring modulation, tremolo, vibrato<br>• <b>Non-linear processing</b>: compression, limiters, distortion, exciters/enhancers<br>• <b>Spatial effects</b>: panning, reverb, surround sound"
     ],
     "fig": [
      "mm-fx-order",
      "mm-fx-pedal",
      "mm-fx-classes"
     ],
     "figAt": {
      "mm-fx-order": 1,
      "mm-fx-pedal": 2,
      "mm-fx-classes": 4
     },
     "figH": {
      "mm-fx-order": "Series and parallel chains, and how swapping two effects changes the output",
      "mm-fx-pedal": "The standard order and the 8 serial modules of the Zoom G1/G1X pedal",
      "mm-fx-classes": "Sort the effects into the six classes"
     }
    },
    {
     "h": "Equalisers: shelving and peak filters",
     "pts": [
      "A <b>filter</b> removes/attenuates audio above or below a cut-off frequency. An <b>equaliser</b> instead <b>enhances or diminishes certain frequency bands while leaving others unchanged</b>. EQs are built from a series of <b>shelving</b> and <b>peak</b> filters (usually 1st or 2nd order).",
      "<b>Shelving filter</b>: boosts or cuts the <b>low or high</b> frequency bands; parameters: cut-off frequency <b>f<sub>c</sub></b> and gain <b>G</b> (bass shelf / treble shelf).",
      "<b>Peak filter</b>: boosts or cuts a <b>mid-frequency</b> band; parameters: centre/cut-off frequency <b>f<sub>c</sub></b>, <b>bandwidth f<sub>b</sub></b> and gain <b>G</b>.",
      "1st-order shelving: H(z) = 1 + (H<sub>0</sub>/2)(1 ± A(z)) (+ for LF, − for HF), where A(z) = (z<sup>−1</sup> + a<sub>B/C</sub>)/(1 + a<sub>B/C</sub>z<sup>−1</sup>) is a <b>first-order allpass</b> filter (passes all frequencies but modifies phase). B = boost, C = cut.",
      "2nd-order peak: H(z) = 1 + (H<sub>0</sub>/2)(1 − A<sub>2</sub>(z)) with a <b>second-order allpass</b> A<sub>2</sub>(z); centre frequency coefficient d = −cos(2πf<sub>c</sub>/f<sub>s</sub>); the bandwidth f<sub>b</sub> sets a<sub>B</sub>/a<sub>C</sub>.",
      "Gain in dB → linear: <b>V<sub>0</sub> = 10<sup>G/20</sup></b>, <b>H<sub>0</sub> = V<sub>0</sub> − 1</b>.",
      "MATLAB example: shelving(G, fc, fs, Q, type) with type 'Base_Shelf' or 'Treble_Shelf' returns [b,a] for filter(b,a,x); demo used G = 4 dB, bass f<sub>c</sub> = 300 Hz, treble f<sub>c</sub> = 600 Hz, Q = 3."
     ],
     "formula": [
      "Shelving:  y1(n) = aB/C·x(n) + x(n−1) − aB/C·y1(n−1)",
      "           y(n)  = (H0/2)·(x(n) ± y1(n)) + x(n)",
      "aB = (tan(2π fc/fs) − 1) / (tan(2π fc/fs) + 1)",
      "aC = (tan(2π fc/fs) − V0) / (tan(2π fc/fs) + V0)",
      "Peak:  y1(n) = −aB/C·x(n) + d(1−aB/C)·x(n−1) + x(n−2) − d(1−aB/C)·y1(n−1) + aB/C·y1(n−2)",
      "       y(n)  = (H0/2)·(x(n) − y1(n)) + x(n),   d = −cos(2π fc/fs)",
      "Example: G = 4 dB → V0 = 10^(4/20) = 1.585 → H0 = 0.585;  G = 20 dB → V0 = 10, H0 = 9;  G = 6 dB → V0 ≈ 1.995 (≈ doubling of amplitude)"
     ],
     "fig": [
      "mm-eq-response",
      "mm-eq-flow",
      "mm-eq-db"
     ],
     "figAt": {
      "mm-eq-response": 2,
      "mm-eq-flow": 4,
      "mm-eq-db": 5
     },
     "figH": {
      "mm-eq-response": "Shelving and peak filter responses: change G, fc, Q and fb",
      "mm-eq-flow": "Signal flow graphs of the shelving and peak filters, step by step",
      "mm-eq-db": "Gain in dB to V0 and H0"
     }
    },
    {
     "h": "Time-varying filters: wah-wah, phaser, state variable filter",
     "pts": [
      "<b>Wah-wah</b>: a <b>bandpass</b> filter with a modulated, time-varying centre (resonant) frequency and a <b>small bandwidth</b>; the filtered signal is <b>mixed with the direct signal</b> (direct-mix + wah-mix).",
      "<b>Phaser (phasing)</b>: same idea but with a <b>notch</b> filter (realisable as a set of cascaded IIR filters), mixed with the direct signal. Changing the BP to a band-reject/notch in the wah-wah code turns it into a phaser.",
      "<b>M-fold wah-wah</b>: M tap-delay bandpass filters spread over the whole spectrum change centre frequencies simultaneously. A <b>bell effect</b> needs about a hundred M tap delays with narrow-bandwidth filters.",
      "<b>State Variable Filter</b> (borrowed from analog electronics): gives <b>independent control of cut-off frequency and damping</b>, and <b>simultaneously</b> outputs <b>lowpass, bandpass and highpass</b> signals.",
      "Wah-wah implementation = state variable filter whose f<sub>c</sub> is modulated (the demo sweeps f<sub>c</sub> as a <b>triangle wave</b> between 500 and 3000 Hz, Fw = 2000 Hz per second, damping 0.05). F1 must be recalculated every time f<sub>c</sub> changes. A lower damping factor gives a smaller pass band."
     ],
     "formula": [
      "yl(n) = F1·yb(n) + yl(n−1)            (lowpass)",
      "yb(n) = F1·yh(n) + yb(n−1)            (bandpass)",
      "yh(n) = x(n) − yl(n−1) − Q1·yb(n−1)   (highpass)",
      "F1 = 2 sin(π fc / fs),   Q1 = 2d",
      "Example: fc = 1000 Hz, fs = 44100 Hz → F1 = 2 sin(0.07124) ≈ 0.1424;  d = 0.05 → Q1 = 0.1"
     ],
     "fig": [
      "mm-wah-flow",
      "mm-wah-mfold",
      "mm-svf-step",
      "mm-wah-sweep"
     ],
     "figAt": {
      "mm-wah-flow": 1,
      "mm-wah-mfold": 2,
      "mm-svf-step": 3,
      "mm-wah-sweep": 4
     },
     "figH": {
      "mm-wah-flow": "Wah-wah signal flow with a sweeping bandpass, and the phaser's notch",
      "mm-wah-mfold": "M-fold wah-wah: M bandpass filters moving together",
      "mm-svf-step": "The state variable filter, run on an impulse sample by sample",
      "mm-wah-sweep": "Wah-wah: the SVF with fc swept as a triangle wave, its three outputs"
     }
    },
    {
     "h": "Delay-based effects: comb filters",
     "pts": [
      "Delay effects model reflections: in a cave/large room we hear <b>echo</b> and <b>reverberation</b>; closely spaced parallel walls give repeated reflections heard as a change of <b>sound colour</b>. Vibrato, flanging, chorus and echo are delay effects.",
      "They are built from <b>FIR and IIR comb filters</b>; combining both gives the <b>Universal Comb Filter</b>.",
      "<b>FIR comb</b> = a <b>single delay</b>: the input delayed by τ is added to the input with gain g. y(n) = x(n) + g·x(n−M), H(z) = 1 + g·z<sup>−M</sup>.",
      "<b>IIR comb</b>: simulates <b>endless reflections</b> at both ends of a cylinder. The signal circulates in a delay line fed back to the input and is attenuated by g on each pass; input sometimes scaled by c to compensate for the structure's high amplification. y(n) = c·x(n) + g·y(n−M).",
      "The slides write M = τ/f<sub>s</sub>; numerically the delay in samples is <b>M = τ × f<sub>s</sub></b> (τ divided by the sampling period). E.g. τ = 100 ms at 44.1 kHz → M = 0.1 × 44100 = <b>4410 samples</b>.",
      "<b>Universal comb</b>: basically an allpass with an M-sample delay and an extra feed-forward multiplier. Parameters <b>BL</b> (blend), <b>FB</b> (feedback), <b>FF</b> (feed-forward). Algorithm: xh(n) = x(n) + FB·xh(n−M); y(n) = FF·xh(n−M) + BL·xh(n)."
     ],
     "table": [
      [
       "Filter",
       "BL",
       "FB",
       "FF"
      ],
      [
       "FIR comb",
       "1",
       "0",
       "g"
      ],
      [
       "IIR comb",
       "1",
       "g",
       "0"
      ],
      [
       "Allpass",
       "a",
       "−a",
       "1"
      ],
      [
       "Delay",
       "0",
       "0",
       "1"
      ]
     ],
     "fig": [
      "mm-fir-comb",
      "mm-iir-comb",
      "mm-delay-samples",
      "mm-unicomb"
     ],
     "figAt": {
      "mm-fir-comb": 2,
      "mm-iir-comb": 3,
      "mm-delay-samples": 4,
      "mm-unicomb": 5
     },
     "figH": {
      "mm-fir-comb": "FIR comb filter signal flow: one delayed copy",
      "mm-iir-comb": "IIR comb filter signal flow: the output fed back through the delay",
      "mm-delay-samples": "Delay time to samples: M = τ × fs",
      "mm-unicomb": "Universal comb filter: pick BL, FB, FF and see the impulse response"
     }
    },
    {
     "h": "Worked example: comb filter impulse responses",
     "pts": [
      "Input: unit impulse x = 1, 0, 0, ...; g = 0.5; M = 10 (as in fircomb.m / iircomb.m).",
      "<b>FIR comb</b>: y(0) = 1, y(10) = 0.5, every other sample 0. Only <b>one</b> echo.",
      "<b>IIR comb</b> (c = 1): y(0) = 1, y(10) = 0.5, y(20) = 0.25, y(30) = 0.125, y(40) = 0.0625 ... an <b>endless, exponentially decaying</b> series of echoes (each pass × g).",
      "Delay in time: at f<sub>s</sub> = 8000 Hz, M = 10 samples is 10/8000 = 1.25 ms (resonator range); for a 100 ms echo at 8 kHz you need M = 800 samples."
     ],
     "fig": [
      "mm-comb-impulse"
     ],
     "figAt": {
      "mm-comb-impulse": 3
     },
     "figH": {
      "mm-comb-impulse": "fircomb.m and iircomb.m on a unit impulse, sample by sample"
     }
    },
    {
     "h": "Vibrato, flanger, chorus, slapback, echo",
     "pts": [
      "<b>Vibrato</b>: periodically varying (modulating) the <b>time delay</b>. Like the <b>Doppler effect</b>: changing the source-listener distance changes the pitch. Implementation: a delay line + a <b>low frequency oscillator (LFO)</b>; <b>only the delayed signal is heard</b> (no forward or backward feed). Typical delay <b>5–10 ms</b>, LFO rate <b>5–14 Hz</b>. The code uses linear (or allpass) interpolation for fractional delays.",
      "Flanger, chorus, slapback and echo all use a comb filter (FIR or IIR) plus some modulation; they differ in the delay range:",
      "<b>Slapback (doubling)</b> = quick repetition of the sound. <b>Flanging</b> = continuously varying LFO of delay. <b>Chorus</b> = multiple copies of the sound delayed by small random delays.",
      "Flanger code: single FIR delay oscillating 0–3 ms (or 0–15 ms) at 0.1–5 Hz; demo: max delay 3 ms, rate 1 Hz, amp = 0.7, y(i) = 0.7·x(i) + 0.7·x(i − cur_delay). At 44.1 kHz, 3 ms → round(0.003 × 44100) = round(132.3) = <b>132 samples</b>."
     ],
     "table": [
      [
       "Effect",
       "Delay range (ms)",
       "Modulation"
      ],
      [
       "Resonator",
       "0 … 20",
       "None"
      ],
      [
       "Flanger",
       "0 … 15",
       "Sinusoidal (≈ 1 Hz)"
      ],
      [
       "Chorus",
       "10 … 25",
       "Random"
      ],
      [
       "Slapback",
       "25 … 50",
       "None"
      ],
      [
       "Echo",
       "> 50",
       "None"
      ]
     ],
     "fig": [
      "mm-vibrato",
      "mm-delay-ranges",
      "mm-flanger"
     ],
     "figAt": {
      "mm-vibrato": 0,
      "mm-delay-ranges": 2,
      "mm-flanger": 3
     },
     "figH": {
      "mm-vibrato": "Vibrato: an LFO-modulated delay changes the pitch",
      "mm-delay-ranges": "Delay ranges of resonator, flanger, chorus, slapback and echo",
      "mm-flanger": "flanger.m: the oscillating delay sweeps the comb notches"
     }
    },
    {
     "h": "Modulation effects: ring modulation, AM, tremolo",
     "pts": [
      "<b>Modulation</b>: parameters of a sinusoid (<b>amplitude, frequency, phase</b>) are varied by an audio signal. Already met: <b>amplitude</b> modulation → wah-wah, phaser; <b>frequency</b> modulation → FM synthesis; <b>phase</b> modulation → vibrato, chorus, flanger.",
      "<b>Ring modulation (RM)</b>: multiply the audio x(n) by a sine carrier m(n) of frequency f<sub>c</sub>: <b>y(n) = x(n)·m(n)</b>. If x is a sine of frequency f<sub>x</sub> you hear only the <b>sum and difference</b> f<sub>c</sub> + f<sub>x</sub> and f<sub>c</sub> − f<sub>x</sub>. A periodic input with fundamental f<sub>0</sub> gives lines at |k·f<sub>0</sub> ± f<sub>c</sub>|. Used for <b>robotic speech</b> in old sci-fi films; odd, non-musical if used carelessly.",
      "Example: f<sub>c</sub> = 440 Hz, f<sub>x</sub> = 200 Hz → RM output contains <b>640 Hz and 240 Hz</b> (no 440 or 200).",
      "<b>Amplitude modulation (AM)</b>: <b>y(n) = (1 + α·m(n))·x(n)</b>, m(n) normalised to peak 1, m is an LFO, x is the audio carrier; <b>α = depth</b>: α = 1 maximum modulation, α = 0 turns it off. With sines f<sub>c</sub> and f<sub>x</sub> you hear <b>three</b> frequencies: f<sub>c</sub>, f<sub>c</sub> − f<sub>x</sub>, f<sub>c</sub> + f<sub>x</sub>.",
      "<b>Tremolo</b> = AM with modulation frequency <b>below 20 Hz</b> (demo: 5 Hz, α = 0.5 → gain varies between 0.5 and 1.5). Tremolo can also be made by ring modulating with a <b>triangular</b> wave LFO."
     ],
     "fig": [
      "mm-ring-mod",
      "mm-am-mod",
      "mm-tremolo"
     ],
     "figAt": {
      "mm-ring-mod": 2,
      "mm-am-mod": 3,
      "mm-tremolo": 4
     },
     "figH": {
      "mm-ring-mod": "Ring modulation of two sines: only the sum and difference remain",
      "mm-am-mod": "Amplitude modulation: carrier plus two side frequencies",
      "mm-tremolo": "Tremolo: the gain swings at a low rate (sine AM or triangle RM)"
     }
    },
    {
     "h": "Non-linear processing: limiter, compressor, expander, distortion, exciter, enhancer",
     "pts": [
      "Non-linear processors create (intentionally or not) <b>harmonic and inharmonic components not in the original signal</b>. Three categories: <b>dynamic processing</b> (control the envelope, aim to <b>minimise</b> harmonic distortion: compressors, limiters), <b>intentional non-linear harmonic processing</b> (strong distortion: guitar distortion), <b>exciters/enhancers</b> (add harmonics for subtle improvement).",
      "<b>Limiter</b>: controls <b>high peaks</b> while changing the main dynamics as little as possible; uses a <b>peak level measurement</b> and reacts <b>very quickly</b> when above a threshold. Lowering peaks lets the overall signal be boosted. Used for single instruments and for final mastering (CD, radio).",
      "<b>Compressor</b>: <b>reduces the dynamics</b>: loud parts reduced by a static curve (quiet parts modified), used to boost overall level in mastering; often on vocals and guitar. <b>Expander</b>: operates on <b>low</b> signal levels and <b>boosts</b> their dynamics → more lively sound.",
      "<b>Distortion</b> classes: <b>Overdrive</b> (low input levels driven by higher levels into a non-linear curve), <b>Distortion</b> (wider tonal area, higher non-linear region), <b>Fuzz</b> (complete non-linear behaviour, harder/harsher).",
      "<b>Overdrive</b> = <b>symmetrical soft clipping</b>: f(x) = 2x for 0 ≤ x &lt; 1/3; (3 − (2 − 3x)<sup>2</sup>)/3 for 1/3 ≤ x &lt; 2/3; 1 for 2/3 ≤ x ≤ 1 (linear ×2, then quadratic, then saturated). Check: x = 0.2 → 0.4; x = 0.5 → (3 − 0.25)/3 ≈ 0.917; x = 0.8 → 1.",
      "<b>Distortion/Fuzz</b>: non-linear exponential amplification f(x) = (x/|x|)(1 − e<sup>αx²/|x|</sup>) as printed on the slide; the gain <b>α</b> controls the amount; part of the distorted signal is usually <b>mixed</b> with the original.",
      "<b>Exciter</b>: emphasises/de-emphasises certain frequencies to change <b>timbre</b>; extra brightness without EQ; subtle high-frequency distortion and phase shifting via the <b>Short-Time Fourier Transform</b> (phase vocoder); adds presence/clarity and speech intelligibility; best on signals lacking high frequencies.",
      "<b>Enhancer</b>: <b>equalisation + non-linear processing</b>, a \"just noticeable\" amount of distortion; a filter network (at least 3 bands) + harmonic generator; used instead of EQs on some consoles, and for stereo enhancement in radio broadcast."
     ],
     "fig": [
      "mm-limiter",
      "mm-compexp",
      "mm-overdrive",
      "mm-fuzz",
      "mm-exciter"
     ],
     "figAt": {
      "mm-limiter": 1,
      "mm-compexp": 2,
      "mm-overdrive": 4,
      "mm-fuzz": 5,
      "mm-exciter": 7
     },
     "figH": {
      "mm-limiter": "limiter.m: peak level, gain and output on the slide's test signal",
      "mm-compexp": "compexp.m: compressing and expanding a quiet-loud-medium signal",
      "mm-overdrive": "Overdrive soft clipping: the curve, the waveform and the new harmonics",
      "mm-fuzz": "Fuzz: exponential distortion with gain and mix",
      "mm-exciter": "Exciter and enhancer, block by block"
     }
    },
    {
     "h": "Spatial effects: panning and reverb",
     "pts": [
      "<b>Panning</b>: mapping a <b>mono</b> source across the stereo image, moving it from one speaker to the other in n steps. Listener in the centre, speakers subtend 2θ<sub>l</sub> (assume θ<sub>l</sub> = 45°). Gains come from a <b>2D rotation</b>: [g<sub>L</sub>; g<sub>R</sub>] = A<sub>θ</sub>·x, A<sub>θ</sub> = [cos θ, sin θ; −sin θ, cos θ]. With the same mono x in both rows: g<sub>L</sub> = (cos θ + sin θ)x, g<sub>R</sub> = (cos θ − sin θ)x. θ = 0 → equal (centre); θ = 45° → g<sub>L</sub> = 1.414x, g<sub>R</sub> = 0. (Demo sweeps −40° to 40° in 32 segments.)",
      "<b>Reverb</b>: the result of the <b>many reflections</b> of a sound in a room. Reflected waves arrive <b>later</b> (longer path) and <b>weaker</b> (walls absorb energy); this series of delayed, attenuated waves creates the <b>spaciousness</b> of a room (bigger in halls/cathedrals).",
      "<b>Reverb vs echo</b>: an echo is a <b>distinct</b> delayed copy (delay more than about one or two tenths of a second); in reverb each reflection arrives so quickly we do not perceive it as a copy, but hear the combined effect.",
      "<b>Reverb vs delay</b>: a delay with feedback only gives reflections at a <b>fixed interval</b>; in real reverb the <b>rate of arriving reflections changes over time</b>: first <b>early reflections</b> (directional, related to room shape/size and source/listener position), then <b>diffuse reverberation / late reflections</b> (much denser, random; gives spaciousness; decays <b>exponentially</b> in good halls).",
      "Two simulation classes: <b>filter bank / delay line</b> methods and <b>convolution / impulse response</b> methods.",
      "<b>Schroeder (1961)</b>: IIR <b>comb filters in parallel banks</b> followed by <b>allpass filters in series</b>; the classic design has <b>4 comb + 2 allpass</b>. It does <b>not</b> create the increasing arrival rate of reflections (primitive by today's standards).",
      "<b>Moorer (1976)</b>, building on Schroeder: parallel combs with different delay lengths (room modes, reflections between parallel walls), allpass to increase <b>reflection density (diffusion)</b>, <b>lowpass filters in the feedback loops</b> so reverb time is shorter at high frequencies (air absorption, wall reflectivity); (a) <b>tapped delay lines</b> simulate early reflections, (b) parallel combs + allpass simulate diffuse reverb. Demo uses 6 lowpass combs + 1 allpass.",
      "<b>Convolution reverb</b>: convolve the input with the room's <b>impulse response</b> (most faithful). Too long for direct filters (hundreds of taps), so use the <b>FFT</b> and the <b>convolution theorem</b>: FT(f ∗ g) = F(u)·G(u). Record the impulse with a gun shot, drum hit or hand clap (or simulate it). Commercial: <b>Altiverb</b>, Kontakt/Intakt, Garritan Violin, PianoTeq (also simulate instrument body). You can convolve with anything (reverse cathedral, speech)."
     ],
     "formula": [
      "Discrete convolution: y(n) = Σ x(k)·h(n − k)",
      "Convolution theorem: f ∗ g  ⇔  F(u)·G(u)  → y = IFFT( FFT(x)·FFT(h) )"
     ],
     "fig": [
      "mm-panning",
      "mm-room-reflect",
      "mm-reverb-delay",
      "mm-schroeder",
      "mm-moorer",
      "mm-conv-reverb"
     ],
     "figAt": {
      "mm-panning": 0,
      "mm-room-reflect": 1,
      "mm-reverb-delay": 3,
      "mm-schroeder": 5,
      "mm-moorer": 6,
      "mm-conv-reverb": 7
     },
     "figH": {
      "mm-panning": "Panning by rotation: gL and gR as θ moves",
      "mm-room-reflect": "Reflections in a room and the echogram they build",
      "mm-reverb-delay": "Feedback delay v. room reverb: early reflections, then diffuse; and echo",
      "mm-schroeder": "Schroeder reverb: 4 parallel combs, then 2 allpass filters",
      "mm-moorer": "Moorer reverb: tapped delay line, 6 lowpass combs, allpass",
      "mm-conv-reverb": "Convolution reverb with the FFT on three impulse responses"
     }
    }
   ],
   "cards": [
    [
     "Filter vs equaliser",
     "A filter removes/attenuates frequencies above or below a cut-off; an equaliser boosts or cuts certain bands while leaving others unchanged."
    ],
    [
     "Shelving filter",
     "Boosts or cuts the low or high frequency band; parameters cut-off fc and gain G."
    ],
    [
     "Peak filter",
     "Boosts or cuts a mid-frequency band; parameters centre frequency fc, bandwidth fb and gain G."
    ],
    [
     "dB gain to linear (EQ)",
     "V0 = 10^(G/20), H0 = V0 − 1."
    ],
    [
     "Wah-wah",
     "Time-varying bandpass filter with a narrow bandwidth whose centre frequency is modulated, mixed with the direct signal."
    ],
    [
     "Phaser",
     "Like wah-wah but with a notch filter (cascaded IIR) instead of a bandpass."
    ],
    [
     "State variable filter advantage",
     "Independent control of cut-off and damping, and simultaneous lowpass, bandpass and highpass outputs. F1 = 2 sin(pi fc/fs), Q1 = 2d."
    ],
    [
     "FIR comb filter",
     "Single delay: y(n) = x(n) + g x(n − M), H(z) = 1 + g z^−M."
    ],
    [
     "IIR comb filter",
     "Endless decaying reflections: y(n) = c x(n) + g y(n − M)."
    ],
    [
     "Universal comb parameters",
     "BL (blend), FB (feedback), FF (feed-forward). FIR comb 1,0,g; IIR comb 1,g,0; allpass a,−a,1; delay 0,0,1."
    ],
    [
     "Vibrato",
     "Delay modulated by an LFO, only the delayed signal is heard; delay 5–10 ms, LFO 5–14 Hz (Doppler-like pitch change)."
    ],
    [
     "Delay ranges",
     "Resonator 0–20 ms, flanger 0–15 ms (sinusoidal about 1 Hz), chorus 10–25 ms (random), slapback 25–50 ms, echo > 50 ms."
    ],
    [
     "Ring modulation",
     "y(n) = x(n)·m(n); two sines give only the sum and difference frequencies fc + fx and fc − fx."
    ],
    [
     "Amplitude modulation / tremolo",
     "y(n) = (1 + alpha m(n)) x(n); gives fc, fc − fx, fc + fx. Tremolo = AM with modulation frequency below 20 Hz."
    ],
    [
     "Schroeder vs Moorer reverb",
     "Schroeder (1961): parallel combs then series allpass (4 comb + 2 allpass). Moorer (1976): adds tapped delay line early reflections and lowpass filters in comb feedback loops."
    ]
   ],
   "qa": [
    [
     "Classify audio effects by the way they process signals, with examples.",
     "Basic filtering (lowpass, highpass, equaliser); time-varying filters (wah-wah, phaser); delays (vibrato, flanger, chorus, echo); modulators (ring modulation, tremolo, vibrato); non-linear processing (compression, limiters, distortion, exciters/enhancers); spatial effects (panning, reverb, surround sound)."
    ],
    [
     "Compare the FIR and IIR comb filters.",
     "FIR comb: a single delayed copy added with gain g, y(n) = x(n) + g x(n − M), H(z) = 1 + g z^−M; its impulse response has one echo. IIR comb: the output is fed back through the delay line, y(n) = c x(n) + g y(n − M), giving an endless series of echoes each attenuated by g (simulates reflections at both ends of a cylinder). The universal comb combines both using BL, FB and FF."
    ],
    [
     "What is the difference between reverb, echo and a simple feedback delay?",
     "Echo is a distinct delayed copy (delay above roughly 0.1–0.2 s, or above 50 ms in the delay table). Reverb is many reflections arriving so fast they are not heard individually. A feedback delay only produces reflections at a fixed interval, while real reverb has early directional reflections followed by dense diffuse (late) reverberation whose arrival rate increases and which decays exponentially."
    ],
    [
     "Explain ring modulation and amplitude modulation and the frequencies each produces for two sine waves fc and fx.",
     "RM multiplies the signal by a carrier: y(n) = x(n) m(n); output contains only fc + fx and fc − fx (e.g. 440 and 200 Hz give 640 and 240 Hz), used for robotic voices. AM: y(n) = (1 + alpha m(n)) x(n) with depth alpha (0 off, 1 maximum); output contains fc, fc − fx and fc + fx. AM with a modulator below 20 Hz is tremolo."
    ],
    [
     "What are the three categories of non-linear processing? Describe limiter, compressor and expander.",
     "Dynamic processing (compressors, limiters; minimise distortion), intentional harmonic distortion (guitar distortion, overdrive, fuzz), and exciters/enhancers (subtle added harmonics). A limiter measures peak level and reacts very quickly to scale down peaks above a threshold. A compressor reduces the dynamics of the signal (loud parts reduced by a static curve). An expander boosts the dynamics of low-level signals for a livelier sound."
    ],
    [
     "How does convolution reverb work and why is it done with the FFT?",
     "Record (or simulate) the room's impulse response using a short impulse such as a hand clap or gun shot, then convolve the input with it. The response is long, so a direct filter would need hundreds of taps; instead use the convolution theorem: multiply the FFTs of the signal and the impulse response and take the inverse FFT."
    ]
   ],
   "quiz": [
    {
     "q": "Which effect has a delay range of <b>10–25 ms</b> with <b>random</b> modulation?",
     "o": [
      [
       "Flanger",
       "Flanger is 0–15 ms with sinusoidal (about 1 Hz) modulation."
      ],
      [
       "Chorus",
       "Correct. Chorus: multiple copies delayed by small random delays in the 10–25 ms range."
      ],
      [
       "Slapback",
       "Slapback (a quick repetition, doubling) uses a 25–50 ms delay with no modulation. 10–25 ms with random modulation is chorus (L7, delay ranges table)."
      ],
      [
       "Echo",
       "Echo uses delays above 50 ms with no modulation, long enough to hear a distinct copy. 10–25 ms with random modulation is chorus."
      ]
     ],
     "a": 1
    },
    {
     "q": "An echo of 100 ms is implemented with an FIR comb at f<sub>s</sub> = 44.1 kHz. The delay M in samples is:",
     "o": [
      [
       "441",
       "441 samples is only 0.01 × 44100, a 10 ms delay. For 100 ms: M = τ × fs = 0.1 × 44100 = 4410 samples."
      ],
      [
       "4410",
       "Correct. M = τ × fs = 0.1 × 44100 = 4410 samples."
      ],
      [
       "44100",
       "44100 samples is a full second at 44.1 kHz (1 × 44100). A 100 ms echo needs 0.1 × 44100 = 4410 samples."
      ],
      [
       "0.0000023",
       "Dividing τ by fs literally gives a meaningless tiny number; the delay in samples is τ × fs."
      ]
     ],
     "a": 1
    },
    {
     "q": "The FIR comb filter difference equation is:",
     "o": [
      [
       "y(n) = x(n) + g·x(n − M)",
       "Correct. A single delayed copy of the input added with gain g; H(z) = 1 + g z<sup>−M</sup>."
      ],
      [
       "y(n) = c·x(n) + g·y(n − M)",
       "That is the IIR comb (feedback of the output)."
      ],
      [
       "y(n) = x(n)·m(n)",
       "y(n) = x(n)·m(n) multiplies the audio by a sine carrier: that is ring modulation, giving sum and difference frequencies. The FIR comb adds a delayed copy: x(n) + g·x(n − M)."
      ],
      [
       "y(n) = (1 + α m(n))·x(n)",
       "(1 + α m(n))·x(n) is amplitude modulation (tremolo when m is below 20 Hz). The FIR comb is y(n) = x(n) + g·x(n − M), a single delayed copy."
      ]
     ],
     "a": 0
    },
    {
     "q": "An IIR comb with c = 1, g = 0.5, M = 10 is fed a unit impulse. What is y(30)?",
     "o": [
      [
       "0",
       "That would be the FIR comb, which has only one echo at n = 10."
      ],
      [
       "0.5",
       "0.5 is y(10), the first echo after one pass through the loop. Each further pass multiplies by g again, so y(30) = 0.5³ = 0.125."
      ],
      [
       "0.125",
       "Correct. Each pass through the loop multiplies by g: 1, 0.5, 0.25, 0.125 at n = 0, 10, 20, 30."
      ],
      [
       "1.5",
       "The echoes decay; they do not accumulate at a single sample."
      ]
     ],
     "a": 2
    },
    {
     "q": "In the Universal Comb Filter, which parameter set (BL, FB, FF) gives a pure <b>delay</b>?",
     "o": [
      [
       "1, 0, g",
       "BL = 1, FB = 0, FF = g is the FIR comb: direct signal plus one delayed copy. A pure delay removes the direct signal: BL = 0, FB = 0, FF = 1."
      ],
      [
       "1, g, 0",
       "BL = 1, FB = g, FF = 0 is the IIR comb: feedback produces endless decaying echoes. A pure delay is BL = 0, FB = 0, FF = 1."
      ],
      [
       "a, −a, 1",
       "BL = a, FB = −a, FF = 1 is the allpass filter, which passes all frequencies and changes only phase. A pure delay is 0, 0, 1."
      ],
      [
       "0, 0, 1",
       "Correct. No blend of the direct signal, no feedback, feed-forward 1: only the delayed signal comes out."
      ]
     ],
     "a": 3
    },
    {
     "q": "Ring modulating a 440 Hz carrier with a 200 Hz sine produces which frequencies?",
     "o": [
      [
       "440 Hz and 200 Hz",
       "RM suppresses the originals; only sum and difference remain."
      ],
      [
       "640 Hz and 240 Hz",
       "Correct. fc + fx = 640 Hz and fc − fx = 240 Hz."
      ],
      [
       "440, 240 and 640 Hz",
       "That (carrier plus sum and difference) is what AM produces."
      ],
      [
       "880 Hz only",
       "Doubling the carrier is not how ring modulation works."
      ]
     ],
     "a": 1
    },
    {
     "q": "Tremolo is:",
     "o": [
      [
       "Frequency modulation of the pitch using an LFO",
       "Periodically modulating the pitch with an LFO-driven delay is vibrato (Doppler-like). Tremolo modulates the amplitude, not the pitch."
      ],
      [
       "Amplitude modulation with a modulation frequency below 20 Hz",
       "Correct. y(n) = (1 + α m(n)) x(n) with a slow sine (demo: 5 Hz, α = 0.5); it can also be made by ring modulation with a triangular wave."
      ],
      [
       "A comb filter with 25–50 ms delay",
       "A comb filter with a 25–50 ms delay is slapback, a delay effect. Tremolo is amplitude modulation: y(n) = (1 + α m(n)) x(n) with m below 20 Hz."
      ],
      [
       "Convolution with a room impulse response",
       "Convolving with a room impulse response is convolution reverb, a spatial effect. Tremolo is AM with a modulation frequency below 20 Hz."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which statement about <b>vibrato</b> is correct?",
     "o": [
      [
       "The delayed signal is mixed with the direct signal",
       "For vibrato you only listen to the delayed signal, with no forward or backward feed."
      ],
      [
       "Typical delay 5–10 ms and LFO rate 5–14 Hz",
       "Correct. Varying the delay periodically changes pitch, like the Doppler effect."
      ],
      [
       "It uses a notch filter",
       "A notch filter mixed with the direct signal is the phaser (a time-varying filter). Vibrato is a delay line modulated by an LFO, with only the delayed signal heard."
      ],
      [
       "It needs a delay above 50 ms",
       "Delays above 50 ms give echo. Vibrato uses a short delay of 5–10 ms modulated by a 5–14 Hz LFO."
      ]
     ],
     "a": 1
    },
    {
     "q": "Which filter gives simultaneous lowpass, bandpass and highpass outputs with independent control of cut-off and damping?",
     "o": [
      [
       "FIR comb filter",
       "A comb filter is a delay structure, not a tunable LP/BP/HP filter."
      ],
      [
       "State variable filter",
       "Correct. F1 = 2 sin(π fc/fs), Q1 = 2d; it is used to implement the wah-wah."
      ],
      [
       "First-order allpass filter",
       "A first-order allpass passes all frequencies and only changes phase; it is the building block of shelving EQs, not a multi-output filter. The state variable filter gives LP, BP and HP at once."
      ],
      [
       "Schroeder reverberator",
       "That is a reverb structure of combs and allpasses."
      ]
     ],
     "a": 1
    },
    {
     "q": "An EQ band is set to G = 20 dB. Using V<sub>0</sub> = 10<sup>G/20</sup> and H<sub>0</sub> = V<sub>0</sub> − 1, H<sub>0</sub> equals:",
     "o": [
      [
       "1",
       "H0 = 1 would need V0 = 2, i.e. G ≈ 6 dB. For 20 dB: V0 = 10^(20/20) = 10, so H0 = 10 − 1 = 9."
      ],
      [
       "9",
       "Correct. V0 = 10^(20/20) = 10, so H0 = 10 − 1 = 9."
      ],
      [
       "19",
       "You subtracted from 20 dB directly instead of converting to linear first."
      ],
      [
       "100",
       "10^(20/10) = 100 is the power ratio; amplitude uses /20."
      ]
     ],
     "a": 1
    },
    {
     "q": "Why can a simple delay with feedback NOT fully reproduce room reverberation?",
     "o": [
      [
       "It cannot attenuate the reflections",
       "A feedback gain g below 1 does attenuate them."
      ],
      [
       "It produces reflections at a fixed interval, while in a real room the rate of arriving reflections increases over time",
       "Correct. Real reverb has early reflections followed by dense diffuse reverberation."
      ],
      [
       "It only works on stereo signals",
       "A feedback delay works fine on mono signals; stereo is not the issue. The problem is its fixed reflection interval, while real reflections grow denser over time."
      ],
      [
       "It needs the FFT",
       "A feedback delay needs no FFT; only convolution reverb uses the FFT to convolve with a long impulse response. The real limitation is the fixed reflection interval."
      ]
     ],
     "a": 1
    },
    {
     "q": "Moorer's reverberator improves on Schroeder's mainly by:",
     "o": [
      [
       "Removing all comb filters",
       "Moorer keeps Schroeder's parallel comb filters (with different delay lengths) and adds lowpass filters in their feedback loops plus tapped delay lines for early reflections."
      ],
      [
       "Adding tapped delay lines for early reflections and lowpass filters in the comb feedback loops",
       "Correct. Lowpass feedback gives shorter reverb at high frequencies (air absorption, wall reflectivity)."
      ],
      [
       "Using ring modulation",
       "Ring modulation (multiplying by a carrier) is a modulation effect and plays no part in reverb. Moorer adds tapped delay lines and lowpass filters in the comb feedback loops."
      ],
      [
       "Replacing filters by a recorded impulse response",
       "Using a recorded impulse response is convolution reverb, the other class of reverb simulation. Moorer is still a filter/delay-line design, improving Schroeder's combs and allpasses."
      ]
     ],
     "a": 1
    }
   ]
  },
  {
   "n": 8,
   "title": "Graphics, Images and Video: Formats, Colour Models, Video and Chroma Subsampling",
   "notes": [
    {
     "h": "Image data structures and sizes",
     "pts": [
      "\"A picture is worth a thousand words, but it uses up three thousand times the memory.\"",
      "A digital image is made of <b>pixels</b> (picture elements). The number of pixels = <b>resolution</b>; higher resolution gives better quality.",
      "A <b>bit-map</b> representation stores the image the same way the monitor contents are stored in video memory.",
      "<b>Bit-map (black-and-white)</b>: 1 bit per pixel (0 or 1). A 640×480 bitmap = 307,200 bits = 38,400 B = <b>37.5 KB</b>. Dithering is often used to display monochrome images.",
      "Grey-scale: 1 byte per pixel (0–255). A dark pixel may be 10, a bright one 240. A 640×480 grey-scale image requires over 300 KB of storage: 307,200 B = 307.2 KB, the same as an 8-bit colour image.",
      "Figures (slides 4 and 5): the Lena photo shown as a <b>dithered black-and-white bit-map</b> (1 bit per pixel) and as a <b>grey-scale</b> image (1 byte per pixel).",
      "<b>24-bit colour</b>: 3 bytes per pixel (R, G, B) → 256×256×256 = <b>16,777,216</b> colours. 640×480×3 = <b>921.6 KB</b> (921,600 B). <b>32-bit</b> images add an extra byte for an <b>alpha</b> value (special effects such as transparency).",
      "<b>8-bit colour</b>: 1 byte per pixel, 256 colours out of millions, acceptable quality, needs a <b>Colour Look-Up Table (LUT)</b>. 640×480 = 307.2 KB (same as 8-bit greyscale).",
      "Figures (slides 8 and 9): the same parrots photo shown as a <b>24-bit colour</b> image and as an <b>8-bit colour</b> image (8-bit takes 307.2 KB, cf. 8-bit greyscale).",
      "<b>Colour LUT</b>: each pixel stores only an <b>index</b> into the table; the table gives the RGB colour. Built when converting 24-bit to 8-bit by grouping similar colours (one entry per group). Changing the map allows <b>palette animation</b>.",
      "Figure (slide 10, Colour LUT): three panels joined by arrows. Left: the image memory, M×N (x from 0 to M−1, y from 0 to N−1); one pixel holds the <b>memory value 25</b>. Middle: the LUT with columns R, G, B and rows 0 to 255; row 25 holds 00011110 10111110 00111100. Right: the displayed image, where that pixel's <b>pixel value is R = 30, G = 190, B = 60</b>."
     ],
     "table": [
      [
       "Image type",
       "Bits per pixel",
       "640×480 size"
      ],
      [
       "Bit-map (B/W)",
       "1",
       "37.5 KB"
      ],
      [
       "Grey-scale",
       "8",
       "over 300 KB (307,200 B = 307.2 KB)"
      ],
      [
       "8-bit colour (LUT)",
       "8",
       "307.2 KB"
      ],
      [
       "24-bit colour",
       "24",
       "921.6 KB"
      ],
      [
       "32-bit colour",
       "32 (RGB + alpha)",
       "1,228,800 B"
      ]
     ],
     "fig": [
      "mm-8a-sizes",
      "mm-8a-lut"
     ],
     "figAt": {
      "mm-8a-lut": 10
     },
     "figH": {
      "mm-8a-sizes": "Try it: image types and their sizes",
      "mm-8a-lut": "The colour look-up table: from a pixel index to an RGB colour"
     }
    },
    {
     "h": "Dithering",
     "pts": [
      "Used when converting greyscale to a bit-mapped (black/white) image, e.g. for printing.",
      "Idea: replace each pixel (0–255) by a larger pattern (e.g. <b>4×4</b> dots) so that the number of printed dots approximates the grey level. A 4×4 block can show 0 (no dots) to 16 (all dots) levels, i.e. 17 levels.",
      "Remap 0–255 to 0–16 by dividing by <b>256/17</b> and rounding down.",
      "Dither matrix: <code>[0 8 2 10; 12 4 14 6; 3 11 1 9; 15 7 13 5]</code>.",
      "<b>Simple dithering</b>: put a dot (1) at a position if the remapped intensity is <b>&gt;</b> the matrix entry, else 0. The image becomes <b>16 times larger</b> (each pixel → 4×4 dots).",
      "<b>Ordered dither</b> keeps the image size: output pixel = 1 iff the remapped intensity at that pixel is greater than the matrix entry at the corresponding position.",
      "Figure (slide 7): the original grey-scale Lena photo (left) beside its dithered version (right), which shows the grey levels as patterns of black and white dots.",
      "Worked example: pixel 200 → 200 ÷ (256/17) = 200×17/256 = 13.28 → <b>13</b>. Entries smaller than 13 are 0…12, so <b>13 of the 16 dots</b> are set."
     ],
     "fig": [
      "mm-8a-dither",
      "mm-8a-ordered"
     ],
     "figAt": {
      "mm-8a-ordered": 5
     },
     "figH": {
      "mm-8a-dither": "Try it: dither one pixel with the 4×4 matrix",
      "mm-8a-ordered": "Simple dithering vs ordered dither"
     }
    },
    {
     "h": "Image file formats",
     "pts": [
      "Most formats include compression (lossless or lossy).",
      "Common graphics and image file formats: http://www.dcs.ed.ac.uk/home/mxr/gfx/ gives a comprehensive listing of various formats; see also the <b>Encyclopedia of Graphics File Formats</b> book in the library. Graphics, video and audio compression techniques are covered in the next chapter.",
      "<b>GIF</b> (GIF87a, GIF89a), under the slide heading <b>Standard System Independent Formats</b>: Graphics Interchange Format, devised by UNISYS Corp. and CompuServe, initially for transmitting graphical images over phone lines via modems. Uses the <b>Lempel-Ziv Welch (LZW)</b> algorithm (the slide calls it <b>a form of Huffman Coding</b>), modified slightly for image scan line packets (<b>line grouping of pixels</b>) → <b>lossless</b>. ‡ LZW is actually a dictionary-based method, not Huffman coding (both are lossless). Limited to <b>8-bit (256 colours)</b>, so suits images with few distinctive colours (e.g. graphics drawing). Supports <b>interlacing</b>. GIF89a adds simple <b>animation</b> and a transparency index.",
      "JPEG: by the Joint Photographic Experts Group for photographic images. Exploits limits of human vision for high compression. Lossy; the user chooses the quality/compression level. The algorithm is discussed in detail in the next chapter on compression.",
      "<b>TIFF</b> (Tagged Image File Format): stores many image types (bit-map, greyscale, 8-bit, 24-bit RGB) identified by <b>tags</b>. By Aldus Corp. (1980s), later supported by Microsoft. Typically <b>lossless</b>; a JPEG tag allows JPEG compression. It does not provide any major advantages over JPEG and is <b>not as user-controllable</b>, so it appears to be declining in popularity.",
      "<b>PNG</b> (Portable Network Graphics): meant to supersede (<b>replace</b>) the <b>GIF</b> standard. Up to <b>48 bits per pixel</b>, giving <b>more accurate colours</b>; gamma-correction and <b>alpha channel</b> (for controls such as transparency); progressive display through 8×8 blocks.",
      "<b>PostScript / EPS</b>: a typesetting language with text, vector graphics and bitmaps (output of Illustrator, FreeHand). <b>No compression</b>, so files are large (can link to external compressors).",
      "<b>BMP</b> (<b>bitmap image file</b> or <b>device independent bitmap (DIB)</b> file format), under the slide heading <b>System Dependent Format</b>: a system standard graphics file format for Microsoft Windows; raster image format; used in many PC graphics programs, cross-platform support; capable of storing 24-bit bitmap images."
     ]
    },
    {
     "h": "Light, the eye and colour spaces (RGB, CIE, Lab)",
     "pts": [
      "Visible light is an electromagnetic wave in the <b>400–700 nm</b> range. Most light we see is not one wavelength but a combination of many wavelengths (cf. a <b>rainbow</b>); the profile is a <b>spectrum (spectra)</b>.",
      "Figure (slide 17): a spectrum graph, <b>Amplitude E(λ)</b> on the vertical axis against <b>Wavelength (λ)</b> from 400 nm to 700 nm; the curve rises, has two humps, then falls towards 700 nm. This profile is called a spectra.",
      "The eye is basically similar to a camera: a lens focuses light onto the <b>retina</b>, which is full of neurons; each neuron is either a <b>rod</b> (not sensitive to colour, brightness) or a <b>cone</b> (3 types: red, green, blue, for colour).",
      "Figures (slide 18, the human eye): a photo of an eye; an eye anatomy diagram labelled sclera, choroid, retina, cornea, iris, lens, ciliary body and optic nerve, with light passing through the cornea and lens onto the retina; a micrograph with the rods and cones labelled; and a microscope image of retina cells.",
      "Cones and perception: each cone type <b>responds differently to various frequencies of light</b>. Figure (slide 19, luminous-efficiency function of the human eye's cones): the <b>spectral-response functions</b> of the cones, the fraction of light absorbed by each type of cone (vertical axis, ticks 0.1 and 0.2) against wavelength from 400 nm: the <b>Blue</b> curve is a small, low hump at short wavelengths; the <b>Green</b> curve peaks highest (about 0.2); the <b>Red</b> curve peaks slightly lower and further to the right.",
      "<b>RGB</b>: colour space made up of red, green and blue intensity components (additive). (Old) CRT displays have three phosphors (RGB) which <b>produce a mix of colours when excited with electrons</b>; (newer) colour LCD panels, typically thin-film-transistor liquid-crystal displays (<b>TFT LCD</b>), have a transistor switch for each R, G or B pixel.",
      "Figures (slides 20 and 21, RGB colour space): the parrots photo, and its <b>Red, Green, Blue (RGB) respective intensities</b> shown as three grey images.",
      "Figure (slide 22, colour displays): the <b>CRT</b> diagram: an electron gun sends an electron beam past deflectors onto the phosphors, a triangle of R, G, B dots. The <b>TFT LCD</b> layer diagram, from top to bottom: polarizer, color filter, color filter glass, liquid crystal (with a voltage), TFT glass, polarizer, backlight.",
      "<b>Gamut</b> = all colours reproducible with the three primaries. A monitor's gamut is smaller than models such as CIE Lab.",
      "<b>CIE (1931)</b>: three standard primaries <b>X, Y, Z</b>. <b>Y</b> was chosen to equal the eye's luminous-efficiency function (perceptual model). Visible colours form a horseshoe-shaped cone; projecting the plane X+Y+Z=1 onto the X-Y plane gives the <b>chromaticity diagram</b>. Its edges represent the <b>pure</b> colours; white (a blackbody radiating at 6447 K) is at the dot. It is a <b>vector-based colour model</b>: when added, any two colours (points on the CIE diagram) produce a point on the line between them.",
      "Figure (slide 24): left, the X, Y, Z axes with the horseshoe-shaped cone of visible colours starting at the origin. Right, the chromaticity diagram on x and y axes: the horseshoe edge is marked 400, 480, 490, 500, 510, 520, 540, 560, 580, 600 and 700 (nm); regions labelled Blue (bottom left), Cyan, Green (top), Yellow and Red (right); the white dot is in the middle.",
      "<b>CIE L*a*b* (1976)</b>: a refined CIE model. <b>L</b> = luminance; chrominance <b>a</b> ranges from green to red, <b>b</b> ranges from blue to yellow. Used by <b>Photoshop</b>. Figure (slide 25, Lab model): a vertical L axis from <b>L = 0 (Black)</b> at the bottom to <b>L = 100 (White)</b> at the top, through a colour disc with −a = Green, +a = Red, −b = Blue, +b = Yellow.",
      "Figure (slide 26, Lab image space): the original colour image (parrots) and its <b>L, A, B image intensities</b>: L looks like the grey-scale image; A and B are shown in false colour (green/pink and purple/blue).",
      "Other models: <b>HSB</b> (Hue, Saturation, Brightness — Photoshop) and <b>HLS</b> (Hue, Lightness, Saturation).",
      "<b>Luminance</b> = brightness (the grey value, Y). <b>Chrominance</b> = colour information (hue + saturation)."
     ],
     "fig": [
      "mm-8a-spectrum",
      "mm-8a-eye",
      "mm-8a-cones",
      "mm-8a-channels",
      "mm-8a-displays",
      "mm-8a-cie-cone",
      "mm-8a-cie-mix",
      "mm-8a-lab"
     ],
     "figAt": {
      "mm-8a-spectrum": 1,
      "mm-8a-eye": 3,
      "mm-8a-cones": 4,
      "mm-8a-channels": 6,
      "mm-8a-displays": 7,
      "mm-8a-cie-cone": 9,
      "mm-8a-cie-mix": 10,
      "mm-8a-lab": 11
     },
     "figH": {
      "mm-8a-spectrum": "Visible light and its spectrum, 400 to 700 nm",
      "mm-8a-eye": "The eye as a camera: lens, retina, rods and cones",
      "mm-8a-cones": "Try it: how the three cone types respond to each wavelength",
      "mm-8a-channels": "An image split into its RGB, Lab or YIQ channels",
      "mm-8a-displays": "Colour displays: CRT phosphors and LCD layers",
      "mm-8a-cie-cone": "CIE XYZ: from the horseshoe cone to the chromaticity diagram",
      "mm-8a-cie-mix": "Try it: mix colours on the CIE chromaticity diagram",
      "mm-8a-lab": "The CIE Lab model: L, a and b axes"
     }
    },
    {
     "h": "Luminance–chrominance models: YIQ, YUV, YCrCb",
     "pts": [
      "A grey-scale image is a 2-D array of integers; a <b>true colour image</b> is a 2-D array of (R,G,B) integer triplets, which encode <b>how much the corresponding colour pixel should be excited</b> in devices such as an LCD monitor. Luminance and chrominance better encode how humans 'see' colour: besides the RGB representation, <b>YIQ and YUV are the two commonly used in video</b> (both use a model of luminance and chrominance).",
      "Figure (slide 27): the <b>RGB colour cube</b> seen corner-on as a hexagon of colours (red, yellow, green, cyan, blue, magenta round the edge, white in the centre).",
      "Summary of colour (slide 40): colour images are encoded as triplets of values. <b>Three common systems of encoding in video are RGB, YIQ and YCrCb.</b> Besides the <b>hardware-oriented</b> colour models (i.e. RGB, CMY, YIQ, YUV), HSB (Hue, Saturation and Brightness, e.g. used in Photoshop) and HLS (Hue, Lightness and Saturation) are also commonly used.",
      "All three share the luminance: <b>Y = 0.299R + 0.587G + 0.114B</b> (the CIE Y primary).",
      "YIQ: the other two vectors are <b>I = 0.596R − 0.275G − 0.321B</b> and <b>Q = 0.212R − 0.528G + 0.311B</b>.",
      "YIQ: used in colour TV broadcasting (NTSC); downward compatible with B/W TV. I = red-orange axis, Q roughly orthogonal. Eye is most sensitive to Y, then I, then Q. This gives the <b>NTSC (analog) video compression scheme</b>: 4 MHz is allocated to Y, 1.5 MHz to I, 0.6 MHz to Q.",
      "Figure (slide 30, YIQ colour space): the original colour image (parrots) and its <b>Y, I, Q image intensities</b>: Y looks like the grey-scale image; I and Q are dark, low-contrast images.",
      "<b>YUV</b>: digital video standard (1982). Video = sequence of fields (odd and even lines); <b>two fields make a frame</b>. Works in PAL (50 fields/s) or NTSC (60 fields/s). U = B − Y, V = R − Y.",
      "<b>YCrCb</b> (CCIR 601): similar to YUV but <b>scaled</b>: Cb = (B − Y)/1.772, Cr = (R − Y)/1.402. Used in <b>JPEG</b> (and MPEG).",
      "Summary (slide 40): YIQ uses properties of the human eye to prioritise information: Y is the black and white (luminance) image, I and Q are the colour (chrominance) images; YUV uses a similar idea. <b>YUV/YCrCb is a standard for digital video that specifies image size, and decimates the chrominance images (for 4:2:2 video).</b>",
      "Slide warning: the YCrCb matrix on the slide (and on the rules sheet) labels row 2 \"Cr\" = [−0.169 −0.331 0.500] and row 3 \"Cb\" = [0.500 −0.419 −0.081]. From the formulas, [−0.169 −0.331 0.500] is actually <b>Cb</b> ((B−Y)/1.772) and [0.500 −0.419 −0.081] is <b>Cr</b> ((R−Y)/1.402). Use the formulas; in the exam write the matrix as given and label rows correctly if asked.",
      "Figure (slide 34, YCrCb colour space): the original colour image (parrots) and its <b>Y, Cr, Cb image intensities</b>: Y looks like the grey-scale image; Cr and Cb are low-contrast grey images."
     ],
     "formula": [
      "YIQ:   [Y; I; Q] = [0.299 0.587 0.114; 0.596 −0.275 −0.321; 0.212 −0.528 0.311] · [R; G; B]",
      "YUV:   [Y; U; V] = [0.299 0.587 0.114; −0.299 −0.587 0.886; 0.701 −0.587 −0.114] · [R; G; B]",
      "YCbCr: Y = 0.299R + 0.587G + 0.114B,  Cb = (B − Y)/1.772,  Cr = (R − Y)/1.402",
      "        Cb = −0.169R − 0.331G + 0.500B,   Cr = 0.500R − 0.419G − 0.081B"
     ],
     "fig": [
      "mm-8a-yiq-yuv",
      "mm-8a-ntsc",
      "mm-8a-fields",
      "mm-ycrcb-lab"
     ],
     "figAt": {
      "mm-8a-yiq-yuv": 4,
      "mm-8a-ntsc": 5,
      "mm-8a-fields": 7,
      "mm-ycrcb-lab": 8
     },
     "figH": {
      "mm-8a-yiq-yuv": "Try it: the YIQ and YUV transforms on one colour",
      "mm-8a-ntsc": "YIQ in NTSC: the I and Q axes and their bandwidths",
      "mm-8a-fields": "YUV video: odd and even fields make a frame",
      "mm-ycrcb-lab": "Try it: convert a pixel to YCrCb and see each component"
     }
    },
    {
     "h": "Printing models: CMY and CMYK",
     "pts": [
      "<b>CMY</b> (Cyan, Magenta, Yellow) are the complements of RGB — the <b>subtractive primaries</b>. Used in printing, where pigments on paper <b>absorb</b> certain colours.",
      "Figure (slide 35): <b>The RGB Cube</b> has Black (0,0,0) and White (1,1,1) at opposite corners, with the other corners Red, Green, Blue, Yellow, Cyan and Magenta. <b>The CMY Cube</b> has White (0,0,0) and Black (1,1,1) at opposite corners, with the other corners Cyan, Magenta, Yellow, Red, Green and Blue.",
      "Additive (RGB, light): R+G+B = white. Subtractive (CMY, ink): C+M+Y = black (in theory).",
      "Figure (slide 36, combinations of additive and subtractive colours): additive circles: Red + Green = Yellow, Green + Blue = Cyan, Blue + Red = Magenta, all three = White (centre). Subtractive circles: Cyan + Magenta = Blue, Cyan + Yellow = Green, Magenta + Yellow = Red, all three = Black (centre).",
      "Conversion (values in 0…1): <b>C = 1 − R, M = 1 − G, Y = 1 − B</b>, and back R = 1 − C etc. White (1,1,1) in RGB → (0,0,0) in CMY.",
      "<b>CMYK</b> (K = black): improved printing model. Mixing C, M and Y is <b>never really black</b>, so a separate black ink gives a darker, true black and better dark colours (and saves coloured ink).",
      "CMY → CMYK: <b>K = min(C, M, Y)</b>, then C' = C − K, M' = M − K, Y' = Y − K.",
      "Figure (slide 39, CMYK colour space): the original colour image (parrots) and its <b>C, M, Y, K image intensities</b>, one plate per ink: cyan, magenta, yellow and a grey black (K) plate.",
      "<b>Why CMYK (not RGB) for printing?</b> Printing works by inks <b>absorbing (subtracting)</b> wavelengths from reflected light, which is exactly the subtractive CMY model. RGB is additive (emitted light, screens). K adds a true black that CMY cannot produce.",
      "<b>Exam procedure</b> (from the Final Rules sheet): values must be in 0…1, so if the image is given in 0–255 first <b>normalize (÷255)</b>, then CMY = 1 − RGB, then K = min, then subtract K. Keep ~4–6 decimals."
     ],
     "formula": [
      "[C; M; Y] = [1; 1; 1] − [R; G; B]     [R; G; B] = [1; 1; 1] − [C; M; Y]",
      "K = min(C, M, Y);   C_cmyk = C − K;   M_cmyk = M − K;   Y_cmyk = Y − K"
     ],
     "fig": [
      "mm-cmy-cubes",
      "mm-add-sub",
      "mm-cmyk-lab"
     ],
     "figAt": {
      "mm-cmy-cubes": 1,
      "mm-add-sub": 3,
      "mm-cmyk-lab": 7
     },
     "figH": {
      "mm-cmy-cubes": "The RGB cube and the CMY cube, corner by corner",
      "mm-add-sub": "Try it: additive and subtractive colour mixing",
      "mm-cmyk-lab": "Try it: convert a pixel to CMYK and see each ink plate"
     }
    },
    {
     "h": "Worked conversion example (from the course summary, not on the CM3106 slides)",
     "pts": [
      "2×2 image: R = [110 60; 20 70], G = [110 210; 120 220], B = [255 130; 90 140].",
      "<b>Pixel (110,110,255)</b>: normalize → (0.431373, 0.431373, 1). CMY = (0.568627, 0.568627, 0). K = 0 → CMYK = (0.568627, 0.568627, 0, 0).",
      "<b>Pixel (60,210,130)</b>: CMY = (0.764706, 0.176471, 0.490196). K = 0.176471 → CMYK = (0.588235, 0, 0.313725, 0.176471).",
      "<b>Pixel (20,120,90)</b>: CMY = (0.921569, 0.529412, 0.647059). K = 0.529412 → CMYK = (0.392157, 0, 0.117647, 0.529412).",
      "<b>Pixel (70,220,140)</b>: CMY = (0.725490, 0.137255, 0.450980). K = 0.137255 → CMYK = (0.588235, 0, 0.313725, 0.137255).",
      "<b>YIQ</b> of the same pixels (no normalisation needed): Y = [126.53 156.03; 86.68 166.03], I = [−46.545 −63.72; −49.97 −63.72], Q = [44.545 −57.73; −31.13 −57.78].",
      "e.g. Y(110,110,255) = 0.299×110 + 0.587×110 + 0.114×255 = 32.89 + 64.57 + 29.07 = <b>126.53</b>.",
      "<b>YUV</b> of pixel (110,110,255): U = B − Y = 255 − 126.53 = <b>128.47</b>, V = R − Y = 110 − 126.53 = <b>−16.53</b>. YCbCr: Cb = 128.47/1.772 = <b>72.50</b>, Cr = −16.53/1.402 = <b>−11.79</b>.",
      "The summary's note: when storing as pixel values, results are floored and negatives clipped to 0 (so it shows I and Q as 0). In the exam show the real computed values and then state any rounding you apply."
     ]
    },
    {
     "h": "Size, compression ratio, MSE and MAE (from the course summary / Final Rules, not on the CM3106 slides)",
     "pts": [
      "<b>Colour depth</b>: B/W = 1 bit, greyscale = 8 bits (1 byte), RGB true colour = 24 bits (3 bytes).",
      "<b>Image size</b> = width × height × colour depth. e.g. 5×5 greyscale = 25 B; 1920×1080 RGB = 6,220,800 B ≈ 5.93 MB.",
      "<b>Video</b>: size per frame = W × H × colour depth; size per second = frame size × fps; video size = size per second × time (s). Total file = video stream + audio stream (audio = time × sampling rate × bits per sample × channels).",
      "Example: 1 min of 640×480 RGB at 25 fps = 921,600 × 25 × 60 = 1,382,400,000 B ≈ 1318.36 MB; plus mono speech audio 60 × 8000 × 16 × 1 = 7,680,000 bits = 960,000 B.",
      "Units used in the course: 1 byte = 8 bits; KB = 1024 B; MB = 1024 KB; GB = 1024 MB.",
      "<b>Compression ratio (course convention, per Multimedia Summary 2026 p. 15, handwritten)</b>: CR = size(compressed I') ÷ size(original I) × 100 %. The CR formula is the <b>same for lossy and lossless</b>. Textbook convention is the inverse: original ÷ compressed (e.g. 25 B → 10.24 B = 2.44 : 1).",
      "Example: 5×5 greyscale image (25 B) compressed to 0.01 KB = 10.24 B → CR = 10.24/25 × 100 = <b>40.96 %</b>. To 0.001 KB = 1.024 B → CR = <b>4.096 %</b>.",
      "<b>Lossless</b>: reconstructed I''' = original I, so the decompressed image is exactly the original matrix and <b>MSE = MAE = 0</b>. <b>Lossy</b>: I''' ≠ I (higher compression, lower quality).",
      "MSE example: I = [10 15 23], I''' = [11 15 18] → differences −1, 0, 5 → MSE = (1+0+25)/3 = <b>8.667</b>, MAE = (1+0+5)/3 = <b>2</b>.",
      "2×2 example: I = [255 78; 255 15], I''' = [15 100; 255 15] → diffs 240, −22, 0, 0 → MSE = (57600+484)/4 = <b>14521</b>, MAE = (240+22)/4 = <b>65.5</b>.",
      "If MSE/MAE is asked in another colour space (e.g. CMY), convert both images to that space first, then apply the formula."
     ],
     "formula": [
      "Image size = W × H × colour depth (bits)        Video size = W × H × depth × fps × seconds",
      "CR (course) = size(I') / size(I) × 100 %",
      "MSE (grey) = 1/(MN) · ΣΣ [I(i,j) − I'''(i,j)]²       MAE (grey) = 1/(MN) · ΣΣ |I(i,j) − I'''(i,j)|",
      "MSE (RGB)  = 1/(3MN) · Σ_c ΣΣ [I(i,j,c) − I'''(i,j,c)]²   MAE (RGB) = 1/(3MN) · Σ_c ΣΣ |I − I'''|"
     ]
    },
    {
     "h": "Video signals: component, composite, S-Video, NTSC, PAL",
     "pts": [
      "<b>Component video</b>: each primary (RGB, or YIQ/YUV) is a separate signal. Best colour, but needs more bandwidth and good synchronisation of 3 signals.",
      "<b>Composite video</b>: chrominance and luminance mixed into one carrier; some interference is inevitable.",
      "<b>S-Video</b> (Separated video, S-VHS): compromise — 2 lines: one luminance, one composite chrominance.",
      "<b>NTSC</b>: 525 lines/frame, 30 fps (exactly 29.97, 33.37 ms/frame), aspect ratio 4:3, interlaced (2 fields, 262.5 lines/field), 20 lines per field reserved for control → max <b>485 visible lines</b> (laser disc/S-VHS ≈ 420, ordinary TV ≈ 320). Uses <b>YIQ</b>: composite = Y + I cos(Fsc t) + Q sin(Fsc t), where <b>Fsc is the frequency of the colour subcarrier</b>. Basic compression idea: the eye is most sensitive to Y, next to I, next to Q, so bandwidth Y 4 MHz, I 1.5 MHz, Q 0.6 MHz. This is <b>still analog compression</b>; similar (easier to visualise) compression is part of digital compression.",
      "<b>PAL</b>: 625 lines/frame, <b>25 fps</b> (40 ms/frame), 4:3, interlaced (312.5 lines/field). Uses <b>YUV (YCrCb)</b>: composite = Y + 0.492 U sin(Fsc t) + 0.877 V cos(Fsc t). Bandwidth Y 5.5 MHz, U and V 1.8 MHz each.",
      "MATLAB's image processing toolbox colour space functions. Colormap manipulation: colormap (set or get colour lookup table), rgbplot (plot RGB colourmap components), cmpermute (rearrange colours in colormap). Colour space conversions: hsv2rgb/rgb2hsv (convert HSV values/RGB colour space), lab2double/lab2uint16/lab2uint8 (convert Lab colour values to double etc.), ntsc2rgb/rgb2ntsc (convert NTSC (YIQ)/RGB colour values), ycbcr2rgb/rgb2ycbcr (convert YCbCr/RGB colour). See forthcoming Lab Class."
     ],
     "fig": [
      "mm-video-signals",
      "mm-ntsc-pal"
     ],
     "figAt": {
      "mm-video-signals": 2,
      "mm-ntsc-pal": 4
     },
     "figH": {
      "mm-video-signals": "Component, composite and S-Video signals",
      "mm-ntsc-pal": "NTSC vs PAL: lines, frame rate, fields and bandwidth"
     }
    },
    {
     "h": "Chroma subsampling",
     "pts": [
      "Stores colour (chroma) at a <b>lower resolution</b> than intensity (luma). Main use: <b>compression</b> in JPEG and MPEG — one of the two main <b>lossy</b> sources.",
      "Why it works: the human visual system is more sensitive to brightness than colour, and less sensitive to the position and motion of colour, so give more bandwidth to Y than to Cr/I and Cb/Q. Almost no visible difference.",
      "<b>Bandwidth can be optimised</b> by storing more luminance detail than colour detail.",
      "How to chroma subsample (operate on colour difference components): the signal is divided into <b>Luma (Y)</b>, the intensity component, and <b>Chroma</b>, two colour difference components which we subsample in some way to reduce its bandwidth (analogous to analog video compression, NTSC or PAL). The subsampling scheme is commonly expressed as a three part ratio (e.g. <b>4:2:2</b>).",
      "Three-part ratio J:a:b: 1st = <b>Luma (Y) or Red (R)</b> horizontal sampling reference (originally a multiple of 3.579 MHz in the NTSC analog television system, rounded to 4); 2nd = <b>Cr/I/G</b> horizontal factor (relative to first digit); 3rd = <b>Cb/Q/B</b> horizontal factor (relative to first digit), except <b>zero</b>: 0 means the Cb (Q/B) horizontal factor is equal to the 2nd digit, and both Cr (I/G) and Cb (Q/B) are subsampled <b>2:1 vertically</b>.",
      "<b>4:4:4</b>: no subsampling in any band (equal ratios). <b>4:2:2</b>: the two chroma components are sampled at half the sample rate of luma, so horizontal chroma resolution is halved. <b>4:1:1</b>: horizontally subsampled by a factor of 4. <b>4:2:0</b>: subsampled by a factor of 2 in both the horizontal and vertical axes.",
      "Figure (slide 50, chroma subsampling examples), samples for a block of pixels: <b>4:4:4</b>: R0–R3, G0–G3 and B0–B3 (4 of each). <b>4:2:2</b>: Y0–Y3 with two Cb and two Cr (one per row of 2 pixels). <b>4:1:1</b>: Y0–Y7 (two rows of 4) with two Cb and two Cr (one per row of 4 pixels). <b>4:2:0</b>: Y0–Y3 with one Cb and one Cr for the whole 2×2 block.",
      "Computing: simple image subsampling is <b>simply different frequency sampling</b> of the digitised signal. Digital subsampling for 4:4:4, 4:2:2 and 4:1:1: perform 2×2 (or 1×2, or 1×4) chroma subsampling, subsampling horizontal and, where applicable, vertical directions, i.e. choose every second, fourth pixel value. For <b>4:2:0</b>, Cr and Cb are effectively centred vertically halfway between image rows: break the image into <b>2×2 pixel blocks</b> and store the <b>average</b> colour information for each 2×2 pixel group. MATLAB: imresize with 'nearest' (4:2:2, 4:1:1) or 'bilinear' (4:2:0).",
      "Figures (slides 51 and 52): an image overlaid with a grid of dots marking where chroma is sampled. <b>4:4:4</b>: a dot on every pixel. <b>4:2:2</b>: blue chroma dots on every second pixel along each row. <b>4:1:1</b>: blue chroma dots on every fourth pixel along each row. <b>4:2:0</b>: one blue chroma dot in the centre of each 2×2 block, halfway between rows.",
      "Chroma subsampling in MATLAB (slide 53): the function <b>imresize()</b> readily achieves all our subsampling needs. It resizes an image of any type using the specified interpolation method: 'nearest' (default, nearest neighbour interpolation) or 'bilinear' (bilinear interpolation). B = IMRESIZE(A,M,METHOD) returns an image that is M times the size of A (M between 0 and 1.0: B is smaller than A; M greater than 1.0: B is larger). B = IMRESIZE(A,[MROWS MCOLS],METHOD) returns an image of size MROWS-by-MCOLS. After the MATLAB colour conversion to YUV/YIQ, for the U/I and V/Q channels: use <b>nearest</b> for 4:2:2 and 4:2:1 and scale the MCOLS to half or quarter the size of the image; use <b>bilinear</b> (to average) for 4:2:0 and set scale to half. ‡ The slide prints \"4:2:1\", but 4:1:1 is meant (quarter-size MCOLS).",
      "See forthcoming Lab worksheet (slide 53).",
      "Data saved per 4 pixels (Y+Cb+Cr samples, vs 12 for 4:4:4): 4:2:2 → 8 (2/3), 4:1:1 → 6 (1/2), 4:2:0 → 6 (1/2).",
      "Error (1) in full (slide 54): this sampling process introduces two kinds of errors. The first is a <b>minor</b> problem: colour is typically stored at only <b>half the horizontal and vertical resolution</b> of the original image (subsampling). This is not a real problem: the human eye has lower resolving power for colour than for intensity, and nearly all digital cameras have lower resolution for colour than for intensity, so there is no high resolution colour information present in digital camera images.",
      "Errors: (1) colour kept at half resolution: not a real problem (eye and cameras have lower colour resolution). (2) <b>Integer rounding</b>: subsampling demands two conversions, from RGB to an intensity+colour (YIQ/YUV) representation and back again (YIQ/YUV → RGB) when the image is displayed; conversion is done in integer arithmetic, so some round-off error is introduced. <b>This is a much smaller effect</b>, but (slightly) affects the colour of (typically) one or two percent of the pixels. So do not compress/recompress videos too often: <b>edit the original</b>."
     ],
     "fig": [
      "mm-chroma-layout",
      "mm-chroma-grid"
     ],
     "figAt": {
      "mm-chroma-layout": 6,
      "mm-chroma-grid": 8
     },
     "figH": {
      "mm-chroma-layout": "Chroma subsampling: which Y, Cb and Cr samples each scheme keeps",
      "mm-chroma-grid": "Try it: where chroma is sampled in 4:4:4, 4:2:2, 4:1:1 and 4:2:0"
     }
    },
    {
     "h": "Aliasing in images and video",
     "pts": [
      "<b>Stair-stepping</b>: jagged edges on angled lines (e.g. slanted letters).",
      "<b>Image zooming</b> aliasing: changing resolution or scanning at inadequate resolution (digital zoom). Zooming in by n divides the sample resolution by n. Explanation: <b>Nyquist's sampling theorem</b>.",
      "Figures (slide 56): stair-stepping shown on a pixel grid: a slanted edge drawn smoothly (left) and as a staircase of filled pixels (right). Image zooming: the parrots photo beside a digitally zoomed crop of one parrot's head (see zoom_alias.m).",
      "<b>Temporal aliasing</b>: e.g. rotating wagon wheel spokes apparently reversing direction (the <b>'strobing effect'</b>); optical illusion: the train that seems to move both ways. Aliasing explained: the <b>incorrect</b> sampling rate <b>'freezes'</b> the frames at the wrong moment. The slides compare videos sampled <b>below</b>, <b>at</b> and <b>above</b> the Nyquist video sample rate; below the Nyquist rate the wheel appears to move wrongly (e.g. backwards). ‡ Sampling above the Nyquist rate shows the true motion; at exactly the Nyquist rate the direction is ambiguous.",
      "Figures (slides 57 to 61): a car video still (wagon wheel spokes apparently reversing direction); a photo of a train at a station platform (train moves both ways); and a black wheel with eight white spokes, one of them red, in three demo videos: Below Nyquist Video, At Nyquist Video and Above Nyquist Video (see aliasing_wheel.m + spokesR.gif).",
      "Figure (slide 62, aliasing explained): Frame 1 to Frame 5 of the wheel; the red spoke points straight up in Frame 1 and is caught a little further round (anticlockwise) in each next frame, pointing left by Frame 5.",
      "<b>Raster scan aliasing</b>: twinkling/strobing on sharp horizontal lines.",
      "Figure (slide 63): the Barbara image (Strobing Alias Video) and its frequency distribution (Strobing Alias Frequency Distributions Video); see raster_aliasing.m + barbara.gif.",
      "<b>Interlacing aliasing</b>: some video is interlaced; this effectively <b>halves</b> the sampling frequency (figure: Interlacing Aliasing effects, two copies of a slightly slanted line). <b>Image aliasing</b>: stair-stepping/zooming aliasing effects per frame (as in images). Explanation: simply an application of <b>Nyquist's Sampling Theorem</b>."
     ],
     "fig": [
      "mm-stair-zoom",
      "mm-wagon-wheel",
      "mm-interlace"
     ],
     "figAt": {
      "mm-stair-zoom": 2,
      "mm-wagon-wheel": 5
     },
     "figH": {
      "mm-stair-zoom": "Image aliasing: stair-stepping and digital zoom",
      "mm-wagon-wheel": "Try it: the wagon-wheel effect, sampled below and above Nyquist",
      "mm-interlace": "Interlacing aliasing: field by field"
     }
    }
   ],
   "cards": [
    [
     "Size of a 640×480 image: B/W, grey, 24-bit",
     "37.5 KB (1 bit/pixel), over 300 KB (307.2 KB, 1 byte/pixel), 921.6 KB (3 bytes/pixel)."
    ],
    [
     "Colours in 24-bit colour",
     "256 × 256 × 256 = 16,777,216."
    ],
    [
     "32-bit colour image",
     "24-bit RGB plus an extra alpha byte for special effects such as transparency."
    ],
    [
     "Colour LUT",
     "Each pixel stores an index; the look-up table gives the RGB colour. Needed for 8-bit colour; allows palette animation."
    ],
    [
     "Dithering",
     "Replace each pixel by an n×n dot pattern (e.g. 4×4) so the number of dots approximates the grey level. Remap 0-255 to 0-16 by dividing by 256/17."
    ],
    [
     "GIF",
     "UNISYS/CompuServe, LZW, lossless, max 8-bit (256 colours), interlacing; GIF89a adds animation and transparency."
    ],
    [
     "PNG",
     "Meant to replace GIF: up to 48 bits/pixel, gamma correction, alpha channel, progressive 8×8 display."
    ],
    [
     "TIFF",
     "Tagged Image File Format (Aldus): many image types via tags, typically lossless, can use a JPEG tag."
    ],
    [
     "Visible light range",
     "400 nm to 700 nm."
    ],
    [
     "Rods vs cones",
     "Rods: not colour sensitive (brightness). Cones: 3 types (R, G, B) for colour."
    ],
    [
     "CIE Lab",
     "L = luminance, a = green to red, b = blue to yellow. Used by Photoshop."
    ],
    [
     "Y (luminance) formula",
     "Y = 0.299R + 0.587G + 0.114B."
    ],
    [
     "YIQ use and bandwidth",
     "Colour TV broadcasting (NTSC), compatible with B/W TV. Y 4 MHz, I 1.5 MHz, Q 0.6 MHz."
    ],
    [
     "YUV and YCbCr",
     "YUV: digital video standard (1982), works in PAL (50 fields/s) or NTSC (60 fields/s); U = B - Y, V = R - Y. YCbCr: Cb = (B - Y)/1.772, Cr = (R - Y)/1.402; used in JPEG."
    ],
    [
     "CMY and CMYK conversion",
     "Normalize to 0-1, C = 1 - R, M = 1 - G, Y = 1 - B; K = min(C, M, Y); subtract K from C, M and Y."
    ],
    [
     "NTSC vs PAL",
     "NTSC: 525 lines, 29.97 fps, YIQ. PAL: 625 lines, 25 fps, YUV. Both 4:3 and interlaced."
    ],
    [
     "Chroma subsampling 4:2:0",
     "Chroma halved horizontally and vertically: average colour of each 2×2 block."
    ]
   ],
   "qa": [
    [
     "Why is CMYK commonly used in colour printing?",
     "Printing is subtractive: inks on paper absorb (subtract) wavelengths from reflected light, so the subtractive primaries cyan, magenta and yellow match how pigments work, unlike additive RGB used for emitted light on screens. Mixing C, M and Y never gives a real black, so a separate black (K) ink is added to produce a true, darker black and better dark colours."
    ],
    [
     "Which colour model is used by JPEG, and why?",
     "YCbCr (YCrCb), a scaled version of YUV. It separates luminance Y from chrominance Cb and Cr. The eye is more sensitive to brightness than colour, so the chroma can be subsampled (e.g. 4:2:0) and compressed more heavily with almost no visible loss."
    ],
    [
     "Compare the Lab, YIQ and YUV colour models.",
     "Lab (CIE L*a*b*, 1976) is a perceptual, device-independent refinement of CIE: L luminance, a green-red, b blue-yellow; used by Photoshop. YIQ is used in NTSC colour TV broadcasting, is compatible with B/W TV, and gives Y 4 MHz, I 1.5 MHz, Q 0.6 MHz. YUV is a digital video standard (1982) that works in PAL (50 fields/s) or NTSC (60 fields/s), with U = B - Y and V = R - Y. YIQ and YUV share Y = 0.299R + 0.587G + 0.114B."
    ],
    [
     "Explain the steps to convert an RGB image (0-255) to CMYK.",
     "1) Normalize each value by dividing by 255. 2) CMY = 1 - RGB for each pixel. 3) K = min(C, M, Y) for each pixel. 4) C = C - K, M = M - K, Y = Y - K. For example (60, 210, 130) gives CMY (0.7647, 0.1765, 0.4902), K = 0.1765 and CMYK (0.5882, 0, 0.3137, 0.1765)."
    ],
    [
     "What is chroma subsampling and why does it work?",
     "Storing colour information at a lower resolution than intensity. It works because the human visual system is more sensitive to brightness than to colour and to colour position and motion, so fewer chroma samples give almost no visible difference. It is written as a ratio such as 4:2:2, 4:1:1 or 4:2:0, and it is one of the main lossy steps in JPEG and MPEG."
    ],
    [
     "Compare component, composite and S-Video signals.",
     "Component: each primary (RGB or YIQ/YUV) on its own signal; best colour but needs more bandwidth and synchronisation. Composite: luminance and chrominance mixed on one carrier; some interference. S-Video: two lines, one luminance and one composite chrominance; a compromise."
    ]
   ],
   "quiz": [
    {
     "q": "Why is CMYK commonly used in colour printing?",
     "o": [
      [
       "Because printing is additive, like a monitor",
       "Monitors are additive (RGB). Printing is subtractive."
      ],
      [
       "Because inks absorb (subtract) light, and K gives a true black that mixing CMY cannot",
       "Correct. CMY are the subtractive primaries; mixed CMY is never really black, so black ink is added."
      ],
      [
       "Because CMYK has more colours than RGB",
       "Not the reason; the CMYK gamut is actually smaller and more muted."
      ],
      [
       "Because JPEG files are stored in CMYK",
       "JPEG stores colour as YCrCb (luminance + chrominance) so it can subsample the chroma; CMYK is a printing model. The real reason is that inks subtract light."
      ]
     ],
     "a": 1,
     "src": "Exam 2024/25"
    },
    {
     "q": "Which colour model is used by JPEG?",
     "o": [
      [
       "CMYK",
       "CMYK is the subtractive model for printing with inks. JPEG converts RGB to YCrCb (luminance + chroma) so it can subsample the chroma (L8, YCrCb)."
      ],
      [
       "YIQ",
       "YIQ is the model of NTSC colour TV broadcasting (4 / 1.5 / 0.6 MHz for Y, I, Q). JPEG (and MPEG) use YCrCb."
      ],
      [
       "YCrCb (YCbCr)",
       "Correct. JPEG converts RGB to YCbCr so it can subsample the chroma."
      ],
      [
       "CIE Lab",
       "CIE L*a*b* is the refined 1976 CIE model, used by Photoshop, not by JPEG. JPEG uses YCrCb (CCIR 601)."
      ]
     ],
     "a": 2,
     "src": "Exam 2023/24"
    },
    {
     "q": "A 640×480 24-bit colour image (uncompressed) takes about:",
     "o": [
      [
       "37.5 KB",
       "37.5 KB is the 1-bit bitmap: 640 × 480 = 307,200 bits ÷ 8 = 38,400 B. 24-bit colour needs 3 bytes per pixel."
      ],
      [
       "307.2 KB",
       "307.2 KB is 1 byte per pixel (8-bit colour or greyscale): 640 × 480 = 307,200 B. 24-bit colour is three times that."
      ],
      [
       "921.6 KB",
       "Correct. 24-bit colour stores 3 bytes (R, G, B) per pixel: 640 × 480 × 3 = 921,600 B = 921.6 KB (L8, Image data structures)."
      ],
      [
       "1.2 MB",
       "About 1.2 MB (1,228,800 B) is the 32-bit size, with a fourth alpha byte per pixel. 24-bit uses 3 bytes: 921.6 KB."
      ]
     ],
     "a": 2
    },
    {
     "q": "Convert the RGB pixel (60, 210, 130) to CMYK (values 0-1).",
     "o": [
      [
       "(0.7647, 0.1765, 0.4902, 0)",
       "This is only the CMY step (1 − RGB/255). For CMYK you still take K = min(C, M, Y) = 0.1765 and subtract it from C, M and Y."
      ],
      [
       "(0.5882, 0, 0.3137, 0.1765)",
       "Correct. CMY = (0.7647, 0.1765, 0.4902), K = min = 0.1765, then subtract K."
      ],
      [
       "(0.2353, 0.8235, 0.5098, 0.2353)",
       "These are the normalized RGB values, not CMY."
      ],
      [
       "(0.5882, 0.1765, 0.3137, 0)",
       "K must be the minimum of CMY and subtracted from all three."
      ]
     ],
     "a": 1
    },
    {
     "q": "The luminance Y of pixel (R,G,B) = (110, 110, 255) is:",
     "o": [
      [
       "126.53",
       "Correct. 0.299×110 + 0.587×110 + 0.114×255 = 32.89 + 64.57 + 29.07 = 126.53."
      ],
      [
       "158.33",
       "That is the simple average (110+110+255)/3, not the weighted formula."
      ],
      [
       "-46.545",
       "−46.545 is the I component of YIQ: 0.596×110 − 0.275×110 − 0.321×255. Luminance uses Y = 0.299R + 0.587G + 0.114B = 126.53."
      ],
      [
       "44.545",
       "44.545 is the Q component of YIQ: 0.212×110 − 0.528×110 + 0.311×255. Luminance is Y = 0.299R + 0.587G + 0.114B = 126.53."
      ]
     ],
     "a": 0
    },
    {
     "q": "In the YUV model, U and V are:",
     "o": [
      [
       "U = R - Y, V = B - Y",
       "This swaps the two: U is the blue difference and V the red difference. The slide gives U = B − Y and V = R − Y."
      ],
      [
       "U = B - Y, V = R - Y",
       "Correct. YUV keeps luminance Y = 0.299R + 0.587G + 0.114B and two colour differences: U = B − Y and V = R − Y (L8, YUV)."
      ],
      [
       "U = (B - Y)/1.772, V = (R - Y)/1.402",
       "Those scaled versions are Cb = (B − Y)/1.772 and Cr = (R − Y)/1.402 of YCrCb (CCIR 601). Plain YUV is unscaled: U = B − Y, V = R − Y."
      ],
      [
       "U = 1 - G, V = 1 - B",
       "Subtracting from 1 is the RGB → CMY conversion (M = 1 − G, Y = 1 − B). YUV uses colour differences: U = B − Y, V = R − Y."
      ]
     ],
     "a": 1
    },
    {
     "q": "NTSC allocates bandwidth to Y, I and Q as:",
     "o": [
      [
       "4 MHz, 1.5 MHz, 0.6 MHz",
       "Correct. The eye is most sensitive to Y, then I, then Q."
      ],
      [
       "5.5 MHz, 1.8 MHz, 1.8 MHz",
       "5.5 / 1.8 / 1.8 MHz is the PAL allocation for Y, U and V. NTSC gives Y 4 MHz, I 1.5 MHz and Q 0.6 MHz."
      ],
      [
       "1.5 MHz, 4 MHz, 0.6 MHz",
       "This gives I more than Y. The eye is most sensitive to luminance, so Y gets the most (4 MHz), then I (1.5 MHz), then Q (0.6 MHz)."
      ],
      [
       "Equal bandwidth to all",
       "The whole point is to give less to chrominance."
      ]
     ],
     "a": 0
    },
    {
     "q": "Which image format is lossless, uses LZW and is limited to 256 colours?",
     "o": [
      [
       "JPEG",
       "JPEG is lossy (it exploits limits of human vision) and handles 24-bit photographic colour. The lossless LZW, 256-colour format is GIF."
      ],
      [
       "GIF",
       "Correct. LZW, lossless, 8-bit colour, interlacing; GIF89a adds animation."
      ],
      [
       "PNG",
       "PNG was designed to replace GIF and supports up to 48 bits per pixel plus an alpha channel, so it is not limited to 256 colours."
      ],
      [
       "PostScript",
       "PostScript/EPS is a typesetting language with no compression, so files are large. The LZW-based 8-bit format is GIF."
      ]
     ],
     "a": 1
    },
    {
     "q": "In 4:2:0 chroma subsampling:",
     "o": [
      [
       "No chroma is removed",
       "Keeping all chroma samples is 4:4:4 (no subsampling). 4:2:0 halves chroma both horizontally and vertically."
      ],
      [
       "Chroma is halved horizontally only",
       "Halving chroma horizontally only is 4:2:2. In 4:2:0 the 0 means chroma is also subsampled 2:1 vertically (2×2 block averages)."
      ],
      [
       "Chroma is subsampled by 2 horizontally and vertically (average of each 2×2 block)",
       "Correct. The 0 means both chroma channels are subsampled 2:1 vertically as well as horizontally: each 2×2 block stores one averaged Cb and Cr (L8, Chroma subsampling)."
      ],
      [
       "The Cb channel is deleted",
       "The 0 does not mean Cb is dropped; it means 2:1 vertical subsampling."
      ]
     ],
     "a": 2
    },
    {
     "q": "A 5×5 greyscale image (25 bytes) is compressed to 0.01 KB. Using the course convention CR = compressed/original × 100 and 1 KB = 1024 B, CR =",
     "o": [
      [
       "0.04 %",
       "0.04 % comes from 0.01 / 25 × 100 without converting 0.01 KB into bytes. First 0.01 × 1024 = 10.24 B, then 10.24 / 25 × 100 = 40.96 %."
      ],
      [
       "40 %",
       "40 % uses 1 KB = 1000 B (10 B / 25 B). The course uses 1 KB = 1024 B, so 10.24 / 25 × 100 = 40.96 %."
      ],
      [
       "40.96 %",
       "Correct. 0.01 × 1024 = 10.24 B; 10.24/25 × 100 = 40.96 %."
      ],
      [
       "244 %",
       "Inverted ratio multiplied by 100; the course puts compressed on top."
      ]
     ],
     "a": 2
    },
    {
     "q": "For a lossless compression scheme, the MSE between original and reconstructed image is:",
     "o": [
      [
       "0",
       "Correct. Lossless means I''' = I, so every difference is 0 (MAE is 0 too)."
      ],
      [
       "1",
       "An MSE of 1 would mean some pixels changed. Lossless reconstruction gives I''' = I exactly, so every difference and the MSE are 0."
      ],
      [
       "Equal to the compression ratio",
       "CR measures size (compressed / original × 100) while MSE measures pixel error; they are unrelated. For lossless, MSE = 0 whatever the CR."
      ],
      [
       "Undefined",
       "MSE is defined for any reconstruction: 1/(MN) · Σ(I − I''')². For lossless every difference is 0, so MSE = 0."
      ]
     ],
     "a": 0
    },
    {
     "q": "The wagon-wheel effect (spokes appear to rotate backwards) is an example of:",
     "o": [
      [
       "Raster scan aliasing",
       "Raster scan aliasing is the twinkling/strobing seen on sharp horizontal lines. Backward-rotating wheels come from a frame rate below the Nyquist rate: temporal aliasing."
      ],
      [
       "Temporal aliasing",
       "Correct. The frame rate is below the Nyquist rate for the motion (strobing)."
      ],
      [
       "Chroma subsampling error",
       "Chroma subsampling errors are reduced colour resolution and integer-rounding errors in RGB↔YUV conversion, not motion effects. The wagon wheel is temporal aliasing."
      ],
      [
       "Stair-stepping",
       "Stair-stepping is spatial aliasing: jagged edges on slanted lines. Spokes turning backwards are temporal aliasing (frame rate below Nyquist)."
      ]
     ],
     "a": 1
    },
    {
     "q": "PAL video uses:",
     "o": [
      [
       "525 lines, 29.97 fps, YIQ",
       "525 lines, 29.97 fps and YIQ describe NTSC. PAL uses 625 lines, 25 fps and YUV."
      ],
      [
       "625 lines, 25 fps, YUV",
       "Correct. 40 ms per frame, 312.5 lines per field."
      ],
      [
       "625 lines, 30 fps, CMYK",
       "PAL does use 625 lines but at 25 fps, not 30, and its colour model is YUV; CMYK is a printing model, never used in video."
      ],
      [
       "1080 lines, 60 fps, RGB",
       "1080 lines is a modern HD format, and PAL encodes colour as YUV, not RGB. PAL is 625 lines, 25 fps, YUV."
      ]
     ],
     "a": 1
    },
    {
     "q": "In the CIE L*a*b* model, the \"a\" axis ranges from:",
     "o": [
      [
       "Blue to yellow",
       "Blue to yellow is the b axis. In L*a*b*, a runs green to red and L is luminance (L8, CIE Lab)."
      ],
      [
       "Green to red",
       "Correct. CIE L*a*b* (1976) has L = luminance and two chrominance axes: a from green to red and b from blue to yellow (L8, CIE Lab)."
      ],
      [
       "Black to white",
       "Black to white is the L (luminance) axis. The a axis is chrominance from green to red."
      ],
      [
       "Cyan to magenta",
       "Cyan and magenta are CMY printing primaries, not a Lab axis. Lab's axes are L (luminance), a (green–red) and b (blue–yellow)."
      ]
     ],
     "a": 1
    }
   ]
  }
 ],
 "exams": [
  {
   "title": "Final Exam 2025/2026 (January 2026)",
   "meta": "Funda. of Multimedia · CS253 · 3rd CS · 2 hours · 60 marks · Dr. Abbass Rostomme, Prof. Dr. Mahmoud Gadalla",
   "note": "No official answer key; answers are worked out from the lectures and the course summary. The same paper was given to 4th IT (IT404, \"Multimedia\", 50 marks: Q3 = 10, Q4 = 5 + 5 + 10) — the WhatsApp images IMG-20260106-WA0009/0010 are that copy with a student's pencil marks. Those marks agree with the answers here (T/F 3, 6, 8 False; 1, 2, 4, 7, 9, 10 True); the mark on T/F 5 is unclear.",
   "sections": [
    {
     "title": "Question One · MCQ",
     "marks": "10 × 1 points",
     "items": [
      {
       "type": "mcq",
       "q": "1. Sampling frequency refers to:",
       "o": [
        "Number of samples taken per hour",
        "Number of samples taken per second",
        "Total duration of the signal",
        "Amplitude of the signal"
       ],
       "a": 1,
       "why": "Sampling frequency (sample rate) is how many samples are taken <b>per second</b>, measured in Hz; it equals 1 / sampling interval T (L4, Sample rate).",
       "ow": [
        "Sample rate is counted per second, not per hour: 44.1 kHz means 44,100 samples every second (L4).",
        null,
        "The total duration is the length of the recording in seconds; it multiplies with the sample rate to give the file size, but it is not the rate itself (L4).",
        "Amplitude is the height (loudness) of the wave; each sample measures it, and how finely is set by the bit size (quantisation), not by the sampling frequency (L2, L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "2. The standard unit of sampling frequency is:",
       "o": [
        "Hertz (Hz)",
        "Joule (J)",
        "Newton (N)",
        "Ampere (A)"
       ],
       "a": 0,
       "why": "Sampling frequency is samples per second = 1 / T, and its unit is the <b>Hertz (Hz)</b>: 1 Hz = 1 sample per second, e.g. 44.1 kHz for CD (L4, Sample rate).",
       "ow": [
        null,
        "The joule is the unit of energy, not of a rate; sample rate is counted per second, in Hz (L4).",
        "The newton is the unit of force; sampling frequency is measured in Hertz (samples per second) (L4).",
        "The ampere is the unit of electric current; sampling frequency is measured in Hertz (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "3. According to the Nyquist theorem, the sampling frequency should be at least:",
       "o": [
        "Equal to the lowest frequency in the signal",
        "Half the highest frequency in the signal",
        "Twice the highest frequency in the signal",
        "Ten times the highest frequency in the signal"
       ],
       "a": 2,
       "why": "Nyquist's theorem: the sampling frequency must be <b>at least twice the highest frequency component</b> in the signal, fs ≥ 2·fmax (L4, Nyquist).",
       "ow": [
        "Nyquist depends on the highest frequency, not the lowest, and needs twice it; sampling at the signal frequency gives one sample per cycle and the sine is lost (L4).",
        "Half fmax is far too low and causes aliasing. You may be thinking of the Nyquist frequency, which is half of fs (fs/2), not of fmax (L4).",
        null,
        "Ten times fmax is oversampling: it works but is not the minimum the theorem requires, which is 2·fmax (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "4. If a signal contains components up to 5 kHz, the minimum sampling frequency should be:",
       "o": [
        "2.5 kHz",
        "5 kHz",
        "10 kHz",
        "20 kHz"
       ],
       "a": 2,
       "why": "Nyquist: fs ≥ 2·fmax = 2 × 5 kHz = <b>10 kHz</b> (L4, Nyquist). Higher rates also work but 10 kHz is the minimum.",
       "ow": [
        "2.5 kHz is fmax ÷ 2: the formula was inverted. Sampling below 10 kHz undersamples a 5 kHz signal and causes aliasing (L4).",
        "5 kHz equals fmax, i.e. one sample per cycle, so every sample has the same value and the sine is lost; the minimum is 2 × 5 = 10 kHz (L4).",
        null,
        "20 kHz (4·fmax) is oversampling: it captures the signal, but the question asks for the minimum, 2 × 5 = 10 kHz (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "5. Undersampling a signal generally results in:",
       "o": [
        "Aliasing",
        "Overshoot",
        "Quantization noise",
        "Increased signal bandwidth"
       ],
       "a": 0,
       "why": "Sampling below the Nyquist rate folds high frequencies into false low ones = aliasing. Quantisation noise comes from the bit depth.",
       "ow": [
        null,
        "Overshoot is ringing around sharp edges in filtering, not a sampling artefact; sampling below the Nyquist rate gives aliasing (L4).",
        "Quantisation noise comes from the bit size (about 6 dB per bit), not from the sampling rate; undersampling causes aliasing (L2, L4).",
        "Sampling cannot add bandwidth; undersampling actually lowers the highest frequency that can be represented (fs/2) and folds higher ones into false low frequencies (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "6. Increasing the sampling frequency generally:",
       "o": [
        "Decreases data size",
        "Reduces aliasing",
        "Makes reconstruction impossible",
        "Eliminates quantization error"
       ],
       "a": 1,
       "why": "Higher fs raises the Nyquist limit fs/2, so fewer components alias. It increases (not decreases) data size, and quantisation error depends on bits, not rate.",
       "ow": [
        "More samples per second means more data: file size = rate × bits × seconds × channels, so a higher fs increases the size (L4).",
        null,
        "A higher rate makes reconstruction easier, not impossible: it captures the waveform better (oversampling) (L4).",
        "Quantisation error depends on the bit size (number of levels 2<sup>bits</sup>), not on how often you sample (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "7. Oversampling refers to sampling:",
       "o": [
        "Below the Nyquist rate",
        "Exactly at the Nyquist rate",
        "Above the Nyquist rate",
        "Only at integer multiples of the signal"
       ],
       "a": 2,
       "why": "<b>Oversampling</b> = sampling above the Nyquist rate 2·fmax. It reduces aliasing but costs more data (L4, Nyquist and aliasing).",
       "ow": [
        "Sampling below the Nyquist rate is undersampling, which causes aliasing (L4).",
        "Exactly 2·fmax is the Nyquist rate itself, the minimum rate; oversampling means going above it (L4).",
        null,
        "Oversampling is defined relative to the Nyquist rate (above 2·fmax), not as integer multiples of the signal (L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "8. In digital audio, the common sampling frequency for CDs is:",
       "o": [
        "22.05 kHz",
        "44.1 kHz",
        "48 kHz",
        "96 kHz"
       ],
       "a": 1,
       "why": "CD = 44.1 kHz, 16 bit (L1, L4). 22.05 kHz is low-grade audio.",
       "ow": [
        "22.05 kHz is low-grade audio (WWW audio, AM radio); it is also the Nyquist frequency of a 44.1 kHz CD (L4).",
        null,
        "48 kHz is a common professional/video rate, but the slides give CD quality as 16-bit at 44.1 kHz (L1, L4).",
        "96 kHz is the audiophile example (24-bit, 96 kHz), not the CD rate of 44.1 kHz (L1, L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "9. If the sampling frequency is lower than the Nyquist rate, the reconstructed signal will be:",
       "o": [
        "perfectly accurate",
        "Contain aliasing distortion",
        "Have increased amplitude",
        "Band-limited"
       ],
       "a": 1,
       "why": "Sampling below the Nyquist rate (2·fmax) is undersampling, which creates the digital artefact called <b>aliasing</b>: frequencies above fs/2 appear as false lower frequencies (L4, Nyquist and aliasing).",
       "ow": [
        "Perfect reconstruction needs fs ≥ 2·fmax; below it, high frequencies fold into false low ones, so the result is distorted (L4).",
        null,
        "Undersampling changes which frequencies appear, not the amplitude; the artefact is aliasing (L4).",
        "Band-limiting is done by the low-pass (anti-aliasing) filter before sampling; sampling too slowly does not band-limit, it aliases (L3, L4)."
       ]
      },
      {
       "type": "mcq",
       "q": "10. A higher sampling frequency allows:",
       "o": [
        "Accurate capturing of high-frequency components",
        "Less memory usage",
        "Lower power consumption",
        "No change in signal resolution"
       ],
       "a": 0,
       "why": "The highest representable frequency is fs/2, so a higher fs captures higher frequencies. It costs more memory and processing.",
       "ow": [
        null,
        "More samples per second need more memory: size = rate × bits × seconds × channels (L4).",
        "Processing more samples per second takes more work and power, not less (L4).",
        "A higher rate raises the highest representable frequency fs/2, so it does change (improve) the time/frequency resolution (L4)."
       ]
      }
     ]
    },
    {
     "title": "Question Two · True (A) / False (B)",
     "marks": "10 × 1 points",
     "items": [
      {
       "type": "tf",
       "q": "1. Sampling frequency is the number of samples taken per second.",
       "a": 0,
       "why": "L4 defines sampling frequency (sample rate) as how many samples are taken per second, = 1 / sampling interval, in Hz (L4, Sample rate).",
       "ow": [
        null,
        "This is exactly the L4 definition: sample rate = samples per second (Hz) = 1 / T, so the statement is true."
       ]
      },
      {
       "type": "tf",
       "q": "2. Nyquist frequency is half of the sampling frequency.",
       "a": 0,
       "why": "Nyquist frequency = fs/2, the highest frequency a sample rate can represent (e.g. 44.1 kHz → 22.05 kHz).",
       "ow": [
        null,
        "L4 defines the Nyquist frequency as fs/2 (e.g. 44.1 kHz → 22.05 kHz). Do not confuse it with the Nyquist rate, 2·fmax."
       ]
      },
      {
       "type": "tf",
       "q": "3. Aliasing occurs when the sampling frequency is too high.",
       "a": 1,
       "why": "Aliasing comes from <b>undersampling</b>: fs below 2·fmax makes high frequencies appear as false lower ones. A high fs (oversampling) reduces aliasing (L4, Nyquist and aliasing).",
       "ow": [
        "Too high a rate only costs data; aliasing happens when fs is too low (below 2·fmax) (L4).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "4. A signal with maximum frequency 1 kHz must be sampled at 2 kHz or higher.",
       "a": 0,
       "why": "Nyquist: fs ≥ 2·fmax = 2 × 1 kHz = <b>2 kHz</b>, so 2 kHz or more is required (L4, Nyquist).",
       "ow": [
        null,
        "It is true: Nyquist requires fs ≥ 2 × 1 kHz = 2 kHz; anything lower undersamples and aliases (L4)."
       ]
      },
      {
       "type": "tf",
       "q": "5. Sampling at exactly the Nyquist rate guarantees perfect reconstruction.",
       "a": 1,
       "why": "\"Guarantees\" is too strong. At exactly 2·fmax the samples of the top frequency can all fall on zero crossings, so that component can be lost; in practice fs is chosen above 2·fmax (44.1 kHz for a 20 kHz limit). The lecture wording \"at least twice\" means 2·fmax is the lower bound, not a guarantee. If your lecturer treats the lower bound as sufficient he may accept True, but the intended answer is False.",
       "ow": [
        "2·fmax is only the lower bound; at exactly that rate the samples can land on the zero crossings and lose the top frequency (L4 demo: at 2f it just captures it), so it is not guaranteed.",
        null
       ]
      },
      {
       "type": "tf",
       "q": "6. Increasing the sampling frequency always improves sound quality.",
       "a": 1,
       "why": "\"Always\" is false: once fs exceeds twice the highest (audible) frequency, higher rates only increase file size without an audible improvement; quality is also limited by bit depth.",
       "ow": [
        "Not always: above 2·fmax extra samples add size but no audible detail, and quality is also limited by bit size (L4).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "7. Oversampling helps reduce aliasing.",
       "a": 0,
       "why": "Sampling above the Nyquist rate leaves margin above the signal bandwidth, reducing aliasing.",
       "ow": [
        null,
        "L4 states oversampling (above the Nyquist rate) reduces aliasing, at the cost of more data, so the statement is true."
       ]
      },
      {
       "type": "tf",
       "q": "8. Digital signals do not require sampling.",
       "a": 1,
       "why": "Intended answer False: a digital signal is produced BY sampling (plus quantisation) of the analog signal — Digital = Sampling + Quantisation (course summary). (Pedantically, an already-digital signal is already sampled; the examiner is testing that digitisation needs sampling.)",
       "ow": [
        "Digitising an analog signal means sampling it at regular intervals and then quantising the values, so sampling is required (L4).",
        null
       ]
      },
      {
       "type": "tf",
       "q": "9. Sampling frequency determines the highest frequency that can be accurately represented.",
       "a": 0,
       "why": "The highest frequency a sample rate can represent is the Nyquist frequency <b>fs/2</b>, so fs sets that limit, e.g. 44.1 kHz → 22.05 kHz (L4, Nyquist).",
       "ow": [
        null,
        "It is true: the Nyquist frequency fs/2 is the highest frequency a sample rate can represent (L4)."
       ]
      },
      {
       "type": "tf",
       "q": "10. 44.1 kHz is a common sampling frequency used in music CDs.",
       "a": 0,
       "why": "The slides give CD quality as <b>16-bit samples at 44.1 kHz</b>, chosen as 2 × 22.05 kHz to cover human hearing (L1, L4).",
       "ow": [
        null,
        "It is true: CD audio is 16-bit at 44.1 kHz, twice the ~22 kHz upper limit of hearing (L4)."
       ]
      }
     ]
    },
    {
     "title": "Question Three",
     "marks": "16 points (10 in the IT version)",
     "items": [
      {
       "type": "written",
       "q": "Convert the RGB image to CMYK.<b>RED</b><table><tr><td>10</td><td>110</td><td>60</td><td>160</td></tr><tr><td>20</td><td>120</td><td>70</td><td>170</td></tr><tr><td>30</td><td>130</td><td>80</td><td>180</td></tr><tr><td>40</td><td>140</td><td>90</td><td>190</td></tr><tr><td>50</td><td>150</td><td>100</td><td>200</td></tr></table><b>GREEN</b><table><tr><td>10</td><td>110</td><td>110</td><td>210</td></tr><tr><td>20</td><td>120</td><td>120</td><td>220</td></tr><tr><td>30</td><td>130</td><td>130</td><td>230</td></tr><tr><td>40</td><td>140</td><td>255</td><td>240</td></tr><tr><td>50</td><td>150</td><td>150</td><td>250</td></tr></table><b>BLUE</b><table><tr><td>210</td><td>60</td><td>160</td><td>10</td></tr><tr><td>220</td><td>70</td><td>170</td><td>20</td></tr><tr><td>230</td><td>180</td><td>180</td><td>30</td></tr><tr><td>240</td><td>90</td><td>190</td><td>40</td></tr><tr><td>250</td><td>100</td><td>250</td><td>50</td></tr></table>",
       "ans": "<b>Step 1 · normalise</b>: divide every value by 255 (so values lie in 0–1).<br><b>Step 2 · CMY</b> = 1 − RGB/255:<br>C (from Red):<table><tr><td>0.9608</td><td>0.5686</td><td>0.7647</td><td>0.3725</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.7255</td><td>0.3333</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.6863</td><td>0.2941</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.6471</td><td>0.2549</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.6078</td><td>0.2157</td></tr></table>M (from Green):<table><tr><td>0.9608</td><td>0.5686</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.0000</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.4118</td><td>0.0196</td></tr></table>Y (from Blue):<table><tr><td>0.1765</td><td>0.7647</td><td>0.3725</td><td>0.9608</td></tr><tr><td>0.1373</td><td>0.7255</td><td>0.3333</td><td>0.9216</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.2941</td><td>0.8824</td></tr><tr><td>0.0588</td><td>0.6471</td><td>0.2549</td><td>0.8431</td></tr><tr><td>0.0196</td><td>0.6078</td><td>0.0196</td><td>0.8039</td></tr></table><b>Step 3 · K</b> = min(C, M, Y) per pixel:<table><tr><td>0.1765</td><td>0.5686</td><td>0.3725</td><td>0.1765</td></tr><tr><td>0.1373</td><td>0.5294</td><td>0.3333</td><td>0.1373</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.2941</td><td>0.0980</td></tr><tr><td>0.0588</td><td>0.4510</td><td>0.0000</td><td>0.0588</td></tr><tr><td>0.0196</td><td>0.4118</td><td>0.0196</td><td>0.0196</td></tr></table><b>Step 4 · CMYK</b>: C<sub>CMYK</sub> = C − K, M<sub>CMYK</sub> = M − K, Y<sub>CMYK</sub> = Y − K, K as above.<br>C:<table><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.6471</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr></table>M:<table><tr><td>0.7843</td><td>0.0000</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.0000</td></tr></table>Y:<table><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.2549</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr></table>K: same as step 3.",
       "why": "Final Rules: values must be in 0–1, so normalise (÷255) first, then CMY = 1 − RGB, K = min(C, M, Y), and subtract K from C, M and Y. Example pixel (1,1): R,G,B = 10,10,210 → C = M = 0.9608, Y = 0.1765 → K = 0.1765 → CMYK = (0.7843, 0.7843, 0, 0.1765). Values rounded to 4 decimals and checked by script."
      }
     ]
    },
    {
     "title": "Question Four · Given the following image",
     "marks": "24 points (a 6, b 6, c 12); IT version 20",
     "items": [
      {
       "type": "written",
       "q": "The image (5 × 5, 8-bit greyscale):<table><tr><td>10</td><td>110</td><td>110</td><td>210</td><td>210</td></tr><tr><td>20</td><td>120</td><td>120</td><td>220</td><td>220</td></tr><tr><td>30</td><td>130</td><td>130</td><td>230</td><td>230</td></tr><tr><td>40</td><td>140</td><td>255</td><td>240</td><td>240</td></tr><tr><td>50</td><td>150</td><td>150</td><td>250</td><td>250</td></tr></table>",
       "ans": "See parts a–c below.",
       "why": "Treat it as greyscale, 1 byte per pixel."
      },
      {
       "type": "written",
       "q": "a) If the image is passed through a lossy compression scheme with a final size equal to 0.001 Kilo Bytes. What is the Compression Ratio?",
       "ans": "<b>Original size</b> = colour depth × rows × columns = 1 byte (8-bit grey) × 5 × 5 = <b>25 bytes</b>.<br>Compressed = 0.001 KB × 1024 = 1.024 B.<br>CR = 1.024 / 25 × 100 = <b>4.096 %</b><br>(Textbook form: 25 / 1.024 ≈ <b>24.41 : 1</b>.)",
       "why": "Per Multimedia Summary 2026, p. 15 (handwritten scan, so not text-searchable): CR = size of compressed (I′) / size of original (I) × 100; its pp. 16–17 solve this exact 5×5 image to 40.96 %, 1 KB = 1024 B, and the CR formula is the same whether the scheme is lossy or lossless. Textbook convention (original ÷ compressed) is also shown."
      },
      {
       "type": "written",
       "q": "b) If the image is passed through a lossless compression scheme with a final size equal to 0.001 Kilo Bytes. What is the Compression Ratio?",
       "ans": "Same calculation: CR = (0.001 × 1024) / 25 × 100 = <b>4.096 %</b> (≈ 24.41 : 1). Lossy or lossless does not change the CR formula; it only changes whether the reconstructed image equals the original.",
       "why": "Per Multimedia Summary 2026, p. 15 (handwritten scan, so not text-searchable): CR = size of compressed (I′) / size of original (I) × 100; its pp. 16–17 solve this exact 5×5 image to 40.96 %, 1 KB = 1024 B, and the CR formula is the same whether the scheme is lossy or lossless. Textbook convention (original ÷ compressed) is also shown. (Realistically no lossless coder shrinks 25 bytes to about 1 byte, but the exam only tests the formula.)"
      },
      {
       "type": "written",
       "q": "c) If the image is passed through a lossless compression scheme with a final size equal to 5.5 Kilo Bytes. What is the decompressed image?",
       "ans": "With <b>lossless</b> compression the decompressed (reconstructed) image is <b>identical to the original</b> (I = I″, MSE = MAE = 0), whatever the compressed size:<table><tr><td>10</td><td>110</td><td>110</td><td>210</td><td>210</td></tr><tr><td>20</td><td>120</td><td>120</td><td>220</td><td>220</td></tr><tr><td>30</td><td>130</td><td>130</td><td>230</td><td>230</td></tr><tr><td>40</td><td>140</td><td>255</td><td>240</td><td>240</td></tr><tr><td>50</td><td>150</td><td>150</td><td>250</td><td>250</td></tr></table>",
       "why": "Summary 2026: \"at lossless compression the decompressed image equals the original image\". The 5.5 KB figure is a distractor."
      }
     ]
    }
   ]
  },
  {
   "title": "Final Exam 2024/2025 (January 2025)",
   "meta": "Multimedia · IT404 · 4th CS/IT · 2 hours · 50 marks · Dr. Abbass Rostomme, Prof. Dr. Mahmoud Gadalla",
   "note": "No official key; solved from the lectures and the course summary (which works these exact questions).",
   "sections": [
    {
     "title": "Question One",
     "marks": "2 × 5 points",
     "items": [
      {
       "type": "written",
       "q": "a) Why CD sample rate is 44.1 KHz?",
       "ans": "The upper limit of human hearing is around <b>20–22 kHz</b>. By <b>Nyquist's theorem</b> the sampling frequency must be at least <b>twice the highest frequency</b> in the signal. So fs = 2 × 22.05 kHz = <b>44.1 kHz</b> captures every audible frequency without aliasing (a little above 2 × 20 kHz leaves room for the anti-aliasing low-pass filter).",
       "why": "The upper range of human hearing is about 20–22 kHz (fmax = 22.05 kHz). Nyquist: fs ≥ 2·fmax = 2 × 22.05 = 44.1 kHz (L4)."
      },
      {
       "type": "written",
       "q": "b) Why CMYK is commonly used in color printing?",
       "ans": "Printing is <b>subtractive</b>: inks/pigments on paper <b>absorb (subtract)</b> some wavelengths of white light and reflect the rest. Cyan, magenta and yellow are the <b>subtractive primaries</b> (complements of RGB: C = 1 − R, M = 1 − G, Y = 1 − B), so CMY matches how ink works, while RGB is <b>additive</b> (emitted light on screens). Mixing C + M + Y is <b>never a true black</b> (muddy dark brown) and wastes ink, so a separate <b>black (K)</b> ink is added to give real, darker blacks and better dark colours.",
       "why": "L8 colour models + course summary (\"why CMY not RGB for printing\")."
      }
     ]
    },
    {
     "title": "Question Two",
     "marks": "20 points",
     "items": [
      {
       "type": "written",
       "q": "Convert the RGB image to CMYK.<b>RED</b><table><tr><td>10</td><td>110</td><td>60</td><td>160</td></tr><tr><td>20</td><td>120</td><td>70</td><td>170</td></tr><tr><td>30</td><td>130</td><td>80</td><td>180</td></tr><tr><td>40</td><td>140</td><td>90</td><td>190</td></tr><tr><td>50</td><td>150</td><td>100</td><td>200</td></tr></table><b>GREEN</b><table><tr><td>10</td><td>110</td><td>110</td><td>210</td></tr><tr><td>20</td><td>120</td><td>120</td><td>220</td></tr><tr><td>30</td><td>130</td><td>130</td><td>230</td></tr><tr><td>40</td><td>140</td><td>255</td><td>240</td></tr><tr><td>50</td><td>150</td><td>150</td><td>250</td></tr></table><b>BLUE</b><table><tr><td>210</td><td>60</td><td>160</td><td>10</td></tr><tr><td>220</td><td>70</td><td>170</td><td>20</td></tr><tr><td>230</td><td>180</td><td>180</td><td>30</td></tr><tr><td>240</td><td>90</td><td>190</td><td>40</td></tr><tr><td>250</td><td>100</td><td>250</td><td>50</td></tr></table>",
       "ans": "<b>Step 1 · normalise</b>: divide every value by 255 (so values lie in 0–1).<br><b>Step 2 · CMY</b> = 1 − RGB/255:<br>C (from Red):<table><tr><td>0.9608</td><td>0.5686</td><td>0.7647</td><td>0.3725</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.7255</td><td>0.3333</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.6863</td><td>0.2941</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.6471</td><td>0.2549</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.6078</td><td>0.2157</td></tr></table>M (from Green):<table><tr><td>0.9608</td><td>0.5686</td><td>0.5686</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.5294</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.4902</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.0000</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.4118</td><td>0.0196</td></tr></table>Y (from Blue):<table><tr><td>0.1765</td><td>0.7647</td><td>0.3725</td><td>0.9608</td></tr><tr><td>0.1373</td><td>0.7255</td><td>0.3333</td><td>0.9216</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.2941</td><td>0.8824</td></tr><tr><td>0.0588</td><td>0.6471</td><td>0.2549</td><td>0.8431</td></tr><tr><td>0.0196</td><td>0.6078</td><td>0.0196</td><td>0.8039</td></tr></table><b>Step 3 · K</b> = min(C, M, Y) per pixel:<table><tr><td>0.1765</td><td>0.5686</td><td>0.3725</td><td>0.1765</td></tr><tr><td>0.1373</td><td>0.5294</td><td>0.3333</td><td>0.1373</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.2941</td><td>0.0980</td></tr><tr><td>0.0588</td><td>0.4510</td><td>0.0000</td><td>0.0588</td></tr><tr><td>0.0196</td><td>0.4118</td><td>0.0196</td><td>0.0196</td></tr></table><b>Step 4 · CMYK</b>: C<sub>CMYK</sub> = C − K, M<sub>CMYK</sub> = M − K, Y<sub>CMYK</sub> = Y − K, K as above.<br>C:<table><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.3922</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.6471</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr></table>M:<table><tr><td>0.7843</td><td>0.0000</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.1961</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.0000</td></tr></table>Y:<table><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.2549</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr></table>K: same as step 3.",
       "why": "Same matrices as 2025/26 Q3. Normalise ÷255 → CMY = 1 − RGB → K = min(C,M,Y) → subtract K."
      }
     ]
    },
    {
     "title": "Question Three · Given the following image",
     "marks": "20 points",
     "items": [
      {
       "type": "written",
       "q": "The image (5 × 5, 8-bit greyscale):<table><tr><td>10</td><td>110</td><td>110</td><td>210</td><td>210</td></tr><tr><td>20</td><td>120</td><td>120</td><td>220</td><td>220</td></tr><tr><td>30</td><td>130</td><td>130</td><td>230</td><td>230</td></tr><tr><td>40</td><td>140</td><td>255</td><td>240</td><td>240</td></tr><tr><td>50</td><td>150</td><td>150</td><td>250</td><td>250</td></tr></table>",
       "ans": "See a–c.",
       "why": "1 byte per pixel → 25 bytes."
      },
      {
       "type": "written",
       "q": "a) If the image is passed through a lossy compression scheme with a final size equal to 0.01 Kilo Bytes. What is the Compression Ratio? (5 points)",
       "ans": "<b>Original size</b> = colour depth × rows × columns = 1 byte (8-bit grey) × 5 × 5 = <b>25 bytes</b>.<br>Compressed = 0.01 × 1024 = 10.24 B.<br>CR = 10.24 / 25 × 100 = <b>40.96 %</b> (textbook form 25 / 10.24 ≈ <b>2.44 : 1</b>).",
       "why": "Per Multimedia Summary 2026, p. 15 (handwritten scan, so not text-searchable): CR = size of compressed (I′) / size of original (I) × 100; its pp. 16–17 solve this exact 5×5 image to 40.96 %, 1 KB = 1024 B, and the CR formula is the same whether the scheme is lossy or lossless. Textbook convention (original ÷ compressed) is also shown. This exact question is solved in the Summary 2026 with 40.96 %."
      },
      {
       "type": "written",
       "q": "b) If the image is passed through a lossless compression scheme with a final size equal to 0.01 Kilo Bytes. What is the Compression Ratio? (5 points)",
       "ans": "Same: CR = (0.01 × 1024)/25 × 100 = <b>40.96 %</b>. The CR formula does not depend on lossy/lossless.",
       "why": "Per Multimedia Summary 2026, p. 15 (handwritten scan, so not text-searchable): CR = size of compressed (I′) / size of original (I) × 100; its pp. 16–17 solve this exact 5×5 image to 40.96 %, 1 KB = 1024 B, and the CR formula is the same whether the scheme is lossy or lossless. Textbook convention (original ÷ compressed) is also shown."
      },
      {
       "type": "written",
       "q": "c) If the image is passed through a lossless compression scheme with a final size equal to 0.25 Kilo Bytes. What is the decompressed image? (10 points)",
       "ans": "Lossless ⇒ decompressed image = original image (I = I″):<table><tr><td>10</td><td>110</td><td>110</td><td>210</td><td>210</td></tr><tr><td>20</td><td>120</td><td>120</td><td>220</td><td>220</td></tr><tr><td>30</td><td>130</td><td>130</td><td>230</td><td>230</td></tr><tr><td>40</td><td>140</td><td>255</td><td>240</td><td>240</td></tr><tr><td>50</td><td>150</td><td>150</td><td>250</td><td>250</td></tr></table>",
       "why": "Summary 2026 solves this exact question the same way."
      }
     ]
    }
   ]
  },
  {
   "title": "Final Exam 2023/2024 (Spring)",
   "meta": "Multimedia Systems · CS 101 · 4th level CS · 2 hours · 75 marks · Dr. Abbass Rostomme, Prof. Dr. Mahmoud Gadalla",
   "note": "No official key. Q2 does not state the frame rate or audio sample size, so they are kept as variables (FPS, Q) as the Final Rules sheet instructs, with a numeric example at 25 fps / 16 bit. Handwritten numbers on the scan (8192, 32768, 3175200000, 1587600000) are a student's notes, not a key; 3,175,200,000 = 44,100 × 2 × 36,000 matches the stereo-music factor above.",
   "sections": [
    {
     "title": "Question One",
     "marks": "3 × 7.5 points",
     "items": [
      {
       "type": "written",
       "q": "a) Why are CD Sample Rates 44.1 KHz?",
       "ans": "The upper limit of human hearing is around <b>20–22 kHz</b>. By <b>Nyquist's theorem</b> the sampling frequency must be at least <b>twice the highest frequency</b> in the signal. So fs = 2 × 22.05 kHz = <b>44.1 kHz</b> captures every audible frequency without aliasing (a little above 2 × 20 kHz leaves room for the anti-aliasing low-pass filter).",
       "why": "The upper range of human hearing is about 20–22 kHz (fmax = 22.05 kHz). Nyquist: fs ≥ 2·fmax = 2 × 22.05 = 44.1 kHz (L4)."
      },
      {
       "type": "written",
       "q": "b) Why CMYK is commonly used in color printing?",
       "ans": "Printing is <b>subtractive</b>: inks/pigments on paper <b>absorb (subtract)</b> some wavelengths of white light and reflect the rest. Cyan, magenta and yellow are the <b>subtractive primaries</b> (complements of RGB: C = 1 − R, M = 1 − G, Y = 1 − B), so CMY matches how ink works, while RGB is <b>additive</b> (emitted light on screens). Mixing C + M + Y is <b>never a true black</b> (muddy dark brown) and wastes ink, so a separate <b>black (K)</b> ink is added to give real, darker blacks and better dark colours.",
       "why": "L8 colour models + course summary (\"why CMY not RGB for printing\")."
      },
      {
       "type": "written",
       "q": "c) What is the color model that is used by the JPEG?",
       "ans": "JPEG uses the <b>YCbCr (YCrCb)</b> colour model: Y = 0.299R + 0.587G + 0.114B (luminance), Cb = (B − Y)/1.772, Cr = (R − Y)/1.402 (chrominance). Separating luminance from chrominance lets JPEG <b>subsample the chroma</b> (the eye is less sensitive to colour detail than to brightness), which aids compression.",
       "why": "L8: YCrCb \"used in JPEG\" (course summary too)."
      }
     ]
    },
    {
     "title": "Question Two",
     "marks": "2 × 15 points",
     "items": [
      {
       "type": "written",
       "q": "Ten hours of video file that has two streams of audio and video. The video stream contains 1600 × 800 still color images. Calculate the total size of the video file when: a) the audio stream contains a mono speech data only.",
       "ans": "Given: t = 10 h = 10 × 3600 = <b>36,000 s</b>; frame 1600 × 800, colour ⇒ colour depth 24 bits. The frame rate (FPS) and audio sample size (Q bits) are <b>not given</b>, so (Final Rules) keep them as variables.<br><b>Video stream</b> = W × H × depth × FPS × t = 1600 × 800 × 24 × FPS × 36,000 = <b>1,105,920,000,000 × FPS bits</b>.<br><b>Audio (mono speech)</b>: fs = 2 × 4 kHz = 8000 Hz, 1 channel → 8000 × Q × 1 × 36,000 = <b>288,000,000 × Q bits</b>.<br><b>Total</b> = 1,105,920,000,000·FPS + 288,000,000·Q bits (÷8 for bytes).<br>Example with FPS = 25 and Q = 16: 27,648,000,000,000 + 4,608,000,000 = <b>27,652,608,000,000 bits = 3,456,576,000,000 B</b> ≈ 3.14 TB.",
       "why": "Total video file = audio stream + video stream. Speech constants: fmax 4 kHz → fs 8 kHz; mono = 1 channel; colour = 24 bits/pixel."
      },
      {
       "type": "written",
       "q": "b) The audio stream contains a stereo music data only.",
       "ans": "<b>Audio (stereo music)</b>: fs = 2 × 22.05 kHz = 44,100 Hz, 2 channels → 44,100 × Q × 2 × 36,000 = <b>3,175,200,000 × Q bits</b>.<br><b>Total</b> = 1,105,920,000,000·FPS + 3,175,200,000·Q bits.<br>Example with FPS = 25 and Q = 16: 27,648,000,000,000 + 50,803,200,000 = <b>27,698,803,200,000 bits = 3,462,350,400,000 B</b> ≈ 3.15 TB.",
       "why": "Music constants: fmax 22.05 kHz → fs 44.1 kHz; stereo = 2 channels. The video part is unchanged."
      }
     ]
    },
    {
     "title": "Question Three",
     "marks": "22.5 points (a 15, b 7.5)",
     "items": [
      {
       "type": "written",
       "q": "a) Transform the image to CMYK.<b>RED</b><table><tr><td>10</td><td>110</td><td>210</td><td>60</td><td>160</td></tr><tr><td>20</td><td>120</td><td>220</td><td>70</td><td>170</td></tr><tr><td>30</td><td>130</td><td>230</td><td>80</td><td>180</td></tr><tr><td>40</td><td>140</td><td>240</td><td>90</td><td>190</td></tr><tr><td>50</td><td>150</td><td>250</td><td>100</td><td>200</td></tr></table><b>GREEN</b><table><tr><td>10</td><td>110</td><td>110</td><td>210</td><td>210</td></tr><tr><td>20</td><td>120</td><td>120</td><td>220</td><td>220</td></tr><tr><td>30</td><td>130</td><td>130</td><td>230</td><td>230</td></tr><tr><td>40</td><td>140</td><td>255</td><td>240</td><td>240</td></tr><tr><td>50</td><td>150</td><td>150</td><td>250</td><td>250</td></tr></table><b>BLUE</b><table><tr><td>210</td><td>60</td><td>160</td><td>160</td><td>10</td></tr><tr><td>220</td><td>70</td><td>170</td><td>170</td><td>20</td></tr><tr><td>230</td><td>180</td><td>180</td><td>180</td><td>30</td></tr><tr><td>240</td><td>90</td><td>190</td><td>190</td><td>40</td></tr><tr><td>250</td><td>100</td><td>200</td><td>250</td><td>50</td></tr></table>",
       "ans": "<b>Step 1 · normalise</b>: divide every value by 255 (so values lie in 0–1).<br><b>Step 2 · CMY</b> = 1 − RGB/255:<br>C (from Red):<table><tr><td>0.9608</td><td>0.5686</td><td>0.1765</td><td>0.7647</td><td>0.3725</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.1373</td><td>0.7255</td><td>0.3333</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.0980</td><td>0.6863</td><td>0.2941</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.0588</td><td>0.6471</td><td>0.2549</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.0196</td><td>0.6078</td><td>0.2157</td></tr></table>M (from Green):<table><tr><td>0.9608</td><td>0.5686</td><td>0.5686</td><td>0.1765</td><td>0.1765</td></tr><tr><td>0.9216</td><td>0.5294</td><td>0.5294</td><td>0.1373</td><td>0.1373</td></tr><tr><td>0.8824</td><td>0.4902</td><td>0.4902</td><td>0.0980</td><td>0.0980</td></tr><tr><td>0.8431</td><td>0.4510</td><td>0.0000</td><td>0.0588</td><td>0.0588</td></tr><tr><td>0.8039</td><td>0.4118</td><td>0.4118</td><td>0.0196</td><td>0.0196</td></tr></table>Y (from Blue):<table><tr><td>0.1765</td><td>0.7647</td><td>0.3725</td><td>0.3725</td><td>0.9608</td></tr><tr><td>0.1373</td><td>0.7255</td><td>0.3333</td><td>0.3333</td><td>0.9216</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.2941</td><td>0.2941</td><td>0.8824</td></tr><tr><td>0.0588</td><td>0.6471</td><td>0.2549</td><td>0.2549</td><td>0.8431</td></tr><tr><td>0.0196</td><td>0.6078</td><td>0.2157</td><td>0.0196</td><td>0.8039</td></tr></table><b>Step 3 · K</b> = min(C, M, Y) per pixel:<table><tr><td>0.1765</td><td>0.5686</td><td>0.1765</td><td>0.1765</td><td>0.1765</td></tr><tr><td>0.1373</td><td>0.5294</td><td>0.1373</td><td>0.1373</td><td>0.1373</td></tr><tr><td>0.0980</td><td>0.2941</td><td>0.0980</td><td>0.0980</td><td>0.0980</td></tr><tr><td>0.0588</td><td>0.4510</td><td>0.0000</td><td>0.0588</td><td>0.0588</td></tr><tr><td>0.0196</td><td>0.4118</td><td>0.0196</td><td>0.0196</td><td>0.0196</td></tr></table><b>Step 4 · CMYK</b>: C<sub>CMYK</sub> = C − K, M<sub>CMYK</sub> = M − K, Y<sub>CMYK</sub> = Y − K, K as above.<br>C:<table><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0588</td><td>0.5882</td><td>0.1961</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.5882</td><td>0.1961</td></tr></table>M:<table><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.1961</td><td>0.3922</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr><tr><td>0.7843</td><td>0.0000</td><td>0.3922</td><td>0.0000</td><td>0.0000</td></tr></table>Y:<table><tr><td>0.0000</td><td>0.1961</td><td>0.1961</td><td>0.1961</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.1961</td><td>0.1961</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.0000</td><td>0.1961</td><td>0.1961</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.2549</td><td>0.1961</td><td>0.7843</td></tr><tr><td>0.0000</td><td>0.1961</td><td>0.1961</td><td>0.0000</td><td>0.7843</td></tr></table>K: same as step 3.",
       "why": "Normalise ÷255, CMY = 1 − RGB, K = min(C,M,Y), subtract K. Values checked by script (4 d.p.)."
      },
      {
       "type": "written",
       "q": "b) Calculate the size of the image after transformation.",
       "ans": "CMYK has <b>4 channels</b>. Assuming 8 bits (1 byte) per channel: size = 5 × 5 × 4 × 8 = <b>800 bits = 100 bytes</b> (the RGB original is 5 × 5 × 3 = 75 bytes, so the CMYK image is 4/3 as large).",
       "why": "Image size = rows × columns × colour depth; colour depth becomes 4 × 8 = 32 bits after adding the K channel. If the normalised values were stored as floats the size would differ; the byte-per-channel assumption is the standard one."
      }
     ]
    }
   ]
  },
  {
   "title": "Final Exam 2022/2023 (Second term)",
   "meta": "Multimedia Systems · IT404 · 4th CS, 4th IT · 2 hours · 50 marks · Dr. Abbass Rostomme, Dr. Mohamed El-Gamal",
   "note": "No official key. Q1-ii omits the frame rate and audio sample size, so they are kept as variables (FPS, Q) with a 25 fps / 16-bit example. The pencil note \"1/8000 = 0.000125\" on the scan is a student's.",
   "sections": [
    {
     "title": "Question One",
     "marks": "4 × 5 points",
     "items": [
      {
       "type": "written",
       "q": "i. What is the sampling interval for the following signals? a. Speech signal  b. Music signal",
       "ans": "a) Speech: fmax = 4 kHz → fs = 8000 Hz → T = 1/8000 = <b>0.000125 s</b> (125 µs).<br>b) Music: fmax = 22.05 kHz → fs = 44,100 Hz → T = 1/44,100 ≈ <b>0.0000227 s</b> (22.68 µs).",
       "why": "Sampling interval = 1 / sampling frequency; constants from the Final Rules."
      },
      {
       "type": "written",
       "q": "ii. Four hours video file has two streams audio and video. The audio stream contains a stereo speech data only. The video stream contains 600 × 800 grey-scale images. a) Calculate the total size of the video file.",
       "ans": "t = 4 × 3600 = <b>14,400 s</b>. Grey scale ⇒ 8 bits/pixel.<br>Video = 600 × 800 × 8 × FPS × 14,400 = <b>55,296,000,000 × FPS bits</b>.<br>Audio (stereo speech) = 8000 × Q × 2 × 14,400 = <b>230,400,000 × Q bits</b>.<br>Total = 55,296,000,000·FPS + 230,400,000·Q bits.<br>Example FPS = 25, Q = 16: 1,382,400,000,000 + 3,686,400,000 = <b>1,386,086,400,000 bits = 173,260,800,000 B</b>.",
       "why": "Total = audio + video; FPS and Q not given in the paper."
      },
      {
       "type": "written",
       "q": "b) If the video file is passed through a lossy compression scheme with final size equal to 1000 Kilo Bytes. What is the Compression Ratio?",
       "ans": "Compressed = 1000 × 1024 × 8 = <b>8,192,000 bits</b>.<br>CR = 8,192,000 / (55,296,000,000·FPS + 230,400,000·Q) × 100 %.<br>Example (25 fps, 16 bit): 8,192,000 / 1,386,086,400,000 × 100 ≈ <b>0.000591 %</b> (textbook form ≈ 169,200 : 1).",
       "why": "Course convention CR = compressed/original × 100; convert both sizes to the same unit (bits) first."
      }
     ]
    },
    {
     "title": "Question Two",
     "marks": "2 × 5 points",
     "items": [
      {
       "type": "written",
       "q": "i. Compare among Lab, YIQ, and YUV color models.",
       "ans": "<table><tr><th></th><th>Lab (CIE L*a*b*)</th><th>YIQ</th><th>YUV</th></tr><tr><td>Idea</td><td>Refined CIE, perceptual (human-based) model</td><td>Luminance + 2 chrominance</td><td>Luminance + 2 colour differences</td></tr><tr><td>Components</td><td>L = luminance; a = green→red; b = blue→yellow</td><td>Y = 0.299R+0.587G+0.114B; I, Q chrominance</td><td>Y; U = B − Y; V = R − Y</td></tr><tr><td>Used in</td><td>Photoshop / device-independent colour</td><td>NTSC colour TV broadcasting (backward compatible with B/W TV)</td><td>Digital video, PAL</td></tr><tr><td>Bandwidth</td><td>—</td><td>Y 4 MHz, I 1.5 MHz, Q 0.6 MHz (summary)</td><td>—</td></tr></table>",
       "why": "L8 colour models and the course summary."
      },
      {
       "type": "written",
       "q": "ii. Given the following color image, transform from RGB to YUV (underlined pixel only).<br><b>RED</b><table><tr><td>110</td><td>60</td><td>110</td><td>210</td></tr><tr><td>20</td><td>70</td><td>120</td><td>220</td></tr><tr><td>30</td><td>255</td><td>130</td><td><u>30</u></td></tr><tr><td>40</td><td>255</td><td>140</td><td>240</td></tr><tr><td>50</td><td>100</td><td>150</td><td>10</td></tr></table><b>GREEN</b><table><tr><td>230</td><td>60</td><td>110</td><td>210</td></tr><tr><td>20</td><td>70</td><td>120</td><td>220</td></tr><tr><td>30</td><td>255</td><td>130</td><td><u>130</u></td></tr><tr><td>40</td><td>90</td><td>140</td><td>240</td></tr><tr><td>50</td><td>100</td><td>255</td><td>250</td></tr></table><b>BLUE</b><table><tr><td>50</td><td>60</td><td>110</td><td>210</td></tr><tr><td>20</td><td>70</td><td>120</td><td>220</td></tr><tr><td>30</td><td>255</td><td>130</td><td><u>230</u></td></tr><tr><td>40</td><td>90</td><td>140</td><td>255</td></tr><tr><td>50</td><td>100</td><td>150</td><td>150</td></tr></table>",
       "ans": "Underlined pixel: R = 30, G = 130, B = 230.<br>Y = 0.299(30) + 0.587(130) + 0.114(230) = 8.97 + 76.31 + 26.22 = <b>111.5</b><br>U = B − Y = 230 − 111.5 = <b>118.5</b><br>V = R − Y = 30 − 111.5 = <b>−81.5</b><br>(Matrix check: U = −0.299(30) − 0.587(130) + 0.886(230) = 118.5; V = 0.701(30) − 0.587(130) − 0.114(230) = −81.5.)",
       "why": "YUV formulas from L8 / Final Rules. The summary sometimes floors values and clips negatives to 0; the exact values are shown here."
      }
     ]
    },
    {
     "title": "Question Three",
     "marks": "2 × 10 points",
     "items": [
      {
       "type": "written",
       "q": "Given an original 4 × 4 colour image and its reconstructed image:<br>Original R = [10 60 110 160; 20 70 120 170; 30 80 130 180; 40 255 140 190], G = [10 60 110 160; 20 70 120 170; 30 255 130 180; 40 90 140 190], B = [10 60 110 160; 20 70 120 170; 30 255 130 180; 40 90 140 190].<br>Reconstructed R = [10 160 10 60; 20 170 20 70; 30 180 30 80; 40 255 40 90], G = [10 60 10 60; 20 70 20 70; 30 255 30 80; 40 90 40 90], B = [10 160 10 60; 20 170 20 70; 30 255 30 80; 40 190 40 90].<br>(a) Calculate the MSE in the CMY colour space, assuming a lossy compression scheme.",
       "ans": "CMY = 1 − RGB/255, so each CMY difference = −(RGB difference)/255 (squares are unchanged in sign).<br>RGB differences I − I″: R has three −100s (column 2, rows 1–3) and eight +100s; G has eight +100s; B has three −100s and eight +100s.<br>Σ(diff)² in RGB units: R 110,000 + G 80,000 + B 110,000 = <b>300,000</b>.<br>MSE = 1/(3MN) Σ = 300,000 / (3 × 4 × 4) = 300,000 / 48 = <b>6250</b> (on the 0–255 scale).<br>In normalised CMY (0–1): MSE = 6250 / 255² = <b>0.0961</b>.",
       "why": "MSE for RGB/CMY = 1/(3MN) ΣΣΣ [I − I″]². If CMY is taken as 255 − RGB (0–255 scale) the answer is 6250; with the course normalisation it is 0.0961. Checked by script."
      },
      {
       "type": "written",
       "q": "(b) Calculate the MAE in the CMY colour space, assuming a lossless compression scheme.",
       "ans": "With a <b>lossless</b> scheme the reconstructed image equals the original (I = I″), so every difference is 0 and <b>MAE = 0</b> (MSE = 0 too).",
       "why": "Summary 2026: \"MSE, MAE in case of lossless = 0\". (If you ignored the lossless assumption and used the printed reconstruction, MAE = 3000/48 = 62.5 on the 0–255 scale = 0.2451 normalised — but the question says lossless.)"
      }
     ]
    }
   ]
  }
 ]
};

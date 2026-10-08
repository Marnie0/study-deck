window.EXTRA = window.EXTRA || {};
EXTRA.mm = {
  1: [
    { q: `An uncompressed <b>1024 × 768</b> true-colour (24-bit) image needs how much storage? (1 MB = 1024 × 1024 B)`,
      o: [
        [`2.25 MB`, `1024 × 768 × 3 B = 2,359,296 B ÷ 1,048,576 = 2.25 MB — true colour is 24 bits = 3 bytes per pixel.`],
        [`0.75 MB`, `That is 1024 × 768 × 1 B: the 8-bit grey-scale size. True colour needs 3 bytes per pixel, so ×3 was forgotten.`],
        [`18 MB`, `That counts 24 bits per pixel as 24 bytes (bits not divided by 8).`],
        [`56.25 MB`, `That multiplies by 25 fps as if it were one second of video; a single still image has no frame rate.`]
      ],
      a: 0 },
    { q: `About how much storage does <b>2 minutes</b> of uncompressed <b>mono</b> CD-quality audio need?`,
      o: [
        [`≈ 5.05 MB`, `That is only 1 minute of mono audio; the question asks for 2 minutes.`],
        [`≈ 10.1 MB`, `44,100 × 2 B × 120 s = 10,584,000 B ≈ 10.1 MB — twice the lecture's 5 MB per mono minute.`],
        [`≈ 20.2 MB`, `That would be 2 minutes of stereo; mono has only one channel, so no extra ×2.`],
        [`≈ 80.7 MB`, `That is the size in megabits (16 bits per sample not divided by 8), not megabytes.`]
      ],
      a: 1 },
    { q: `A 512 × 512 <b>colour (24-bit)</b> video is played uncompressed at <b>30 fps</b>. What is its data rate? (1 MB = 1024 × 1024 B)`,
      o: [
        [`7.5 MB/s`, `That uses 1 byte per pixel (the monochrome case); colour needs 3 bytes per pixel.`],
        [`18.75 MB/s`, `That uses 25 fps (0.75 × 25); the video here runs at 30 fps.`],
        [`180 MB/s`, `That is megabits per second — the 24 bits per pixel were not converted to 3 bytes.`],
        [`22.5 MB/s`, `One frame = 512 × 512 × 3 B = 0.75 MB; × 30 fps = 22.5 MB per second.`]
      ],
      a: 3 },
    { q: `What distinguishes <b>hypermedia</b> from hypertext?`,
      o: [
        [`Hypermedia pages are always read in a linear order`, `Wrong — traversal of hypertext/hypermedia is usually non-linear.`],
        [`Hypermedia was the term Ted Nelson invented in 1965 for linked text`, `Wrong — Ted Nelson's 1965 term was hypertext (text with links to other texts).`],
        [`Hypermedia is not limited to text: it can link graphics, images and especially continuous media such as sound and video`, `Correct — the lecture defines hypermedia as hypertext that is not constrained to be text-based.`],
        [`Hypermedia contains no links; it simply stores several media in one file`, `Wrong — like hypertext, hypermedia is built on links; the difference is the kinds of media linked.`]
      ],
      a: 2 },
    { q: `Direct transfers to disk, real-time scheduling, fast interrupt processing and I/O streaming are requirements of which desirable multimedia-system feature?`,
      o: [
        [`A multimedia-capable file system`, `Wrong — that feature is about delivering real-time media streams, e.g. with RAID.`],
        [`Network support`, `Wrong — network support refers to client-server and distributed systems.`],
        [`A special operating system`, `Correct — the lecture lists exactly these four under "Special operating system".`],
        [`Data representations`, `Wrong — that feature concerns file formats that allow real-time compression/decompression.`]
      ],
      a: 2 },
    { q: `In the list of multimedia system components, HDTV, CD-quality speakers, SVGA/hi-res monitors and colour printers are:`,
      o: [
        [`Capture devices`, `Wrong — capture devices are inputs such as cameras, microphones, tablets and digitising hardware.`],
        [`Storage devices`, `Wrong — storage devices are hard disks, CD-ROMs, DVD-ROMs, etc.`],
        [`Communication networks`, `Wrong — those are LANs, intranets, the Internet and special high-speed networks.`],
        [`Display devices`, `Correct — these are the output/display devices of a multimedia system.`]
      ],
      a: 3 },
    { q: `Making sure the frames of <b>one video</b> are played in the correct order and time frame is which multimedia challenge?`,
      o: [
        [`Synchronisation (inter-media scheduling)`, `Wrong — synchronisation is between different media, e.g. lip-sync of video and audio; here only one medium is involved.`],
        [`Sequencing within the media`, `Correct — the lecture's example of sequencing within the media is playing video frames in the correct order/time frame.`],
        [`Distributed networks`, `Wrong — that challenge is about data spread over networks, not frame ordering.`],
        [`Analog-to-digital conversion`, `Wrong — that is a key issue about representing data digitally (sampling), not playback order.`]
      ],
      a: 1 },
    { q: `According to the lecture's key issues, why is data compression "usually mandatory" in multimedia?`,
      o: [
        [`Because multimedia data has very large bandwidth and storage requirements`, `Correct — large data requirements (bandwidth, storage) make compression usually mandatory.`],
        [`Because analog data cannot be stored without compression`, `Wrong — analog data must be digitised (sampled), which is a separate issue from compression.`],
        [`Because compression is needed to keep temporal relationships`, `Wrong — temporal relationships are maintained by synchronisation/scheduling, not by compression.`],
        [`Because lossless compression gives multimedia files zero error`, `Wrong — zero error is a property of lossless coding, but it is not why compression is needed; lossless alone does not shrink MM data enough.`]
      ],
      a: 0 },
    { q: `True or False: according to the course summary, <b>lossless</b> compression gives zero error and a <b>high</b> compression ratio.`,
      o: [
        [`True`, `Wrong — lossless does give zero error and high quality, but its compression is low.`],
        [`False`, `Correct — the summary says lossless = zero error, high quality, LOW compression; lossy gives higher compression with some error.`]
      ],
      a: 1 },
    { q: `True or False: raw video is a series of single images, typically at 25, 30 or 50 frames per second.`,
      o: [
        [`True`, `Correct — the lecture describes video this way and says it must usually be compressed.`],
        [`False`, `Wrong — this is exactly how the lecture describes video data.`]
      ],
      a: 0 },
  ],
  2: [
    { q: `A sine wave has a frequency of <b>250 Hz</b>. What is its period?`,
      o: [
        [`250 s`, `That confuses period with frequency; the period is the reciprocal 1/f.`],
        [`0.025 s`, `That is 1/40, a decimal-place slip; 1/250 = 0.004.`],
        [`0.0004 s`, `Off by a factor of 10; 1/250 = 0.004 s.`],
        [`0.004 s`, `T = 1/f = 1/250 = 0.004 s (4 ms).`]
      ],
      a: 3 },
    { q: `Using y = A·sin(2π·n·F<sub>w</sub>/F<sub>s</sub>) with F<sub>w</sub> = 500 Hz and F<sub>s</sub> = 4000 Hz, what is y at sample <b>n = 6</b>?`,
      o: [
        [`−A`, `F<sub>w</sub>/F<sub>s</sub> = 1/8, so the angle is 2π·6/8 = 3π/2 and sin(3π/2) = −1, giving −A.`],
        [`A`, `sin(π/2) = 1 occurs at n = 2, not n = 6; at n = 6 the wave is at its negative peak.`],
        [`0`, `y = 0 at n = 0, 4, 8 (angles 0, π, 2π); n = 6 gives 3π/2.`],
        [`0.7071A`, `That is sin(π/4) or sin(3π/4) (n = 1 or n = 3); for n = 6 the sine is −1.`]
      ],
      a: 0 },
    { q: `A signal's RMS <b>amplitude</b> is 1000 times the noise's RMS amplitude. What is the SNR in dB?`,
      o: [
        [`60 dB`, `For amplitudes use 20·log<sub>10</sub>: 20 × log<sub>10</sub>(1000) = 20 × 3 = 60 dB.`],
        [`30 dB`, `That uses 10·log<sub>10</sub>, which is for power ratios; an amplitude ratio needs 20·log<sub>10</sub>.`],
        [`3 dB`, `That is just log<sub>10</sub>(1000) without the factor of 20.`],
        [`1000 dB`, `The ratio itself is not a dB value; dB is logarithmic.`]
      ],
      a: 0 },
    { q: `The FIR filter y(n) = ½x(n) + ⅓x(n − 1) + ¼x(n − 2) receives x = 4, 8, 12 followed by zeros. What is <b>y(3)</b>?`,
      o: [
        [`9.667`, `That is y(2) = ½·12 + ⅓·8 + ¼·4 = 6 + 2.667 + 1; the question asks for y(3).`],
        [`3`, `That is y(4) = ¼·12; at n = 3 the ⅓·x(2) term is still present.`],
        [`0`, `The input has ended but the delayed samples are still inside the two delay elements, so the output is not yet zero (an FIR response lasts N − 1 samples after the input).`],
        [`6`, `At n = 3, x(3) = 0, so y(3) = ⅓·x(2) + ¼·x(1) = ⅓·12 + ¼·8 = 4 + 2 = 6.`]
      ],
      a: 3 },
    { q: `A DFT coefficient is F(k) = 5 − 12i. What is its magnitude |F(k)|?`,
      o: [
        [`17`, `That adds the parts (5 + 12); the magnitude is √(F<sub>R</sub>² + F<sub>I</sub>²).`],
        [`13`, `|F| = √(5² + 12²) = √169 = 13.`],
        [`169`, `That is |F|² (power); the square root was forgotten.`],
        [`−7`, `Magnitude is never negative; 5 − 12 is not the formula.`]
      ],
      a: 1 },
    { q: `A <b>1st-order</b> Butterworth low-pass filter has cut-off w<sub>0</sub> = 10. What is H(u,v) at (u,v) = (12, 16)?`,
      o: [
        [`0`, `That is what the IDEAL low-pass would give (√400 = 20 > 10); the Butterworth is a smoothed top hat and keeps some high frequencies.`],
        [`0.5`, `H = ½ only exactly at the cut-off radius (u² + v² = w<sub>0</sub>²).`],
        [`0.2`, `(u² + v²)/w<sub>0</sub>² = 400/100 = 4; with n = 1, H = 1/(1 + 4) = 0.2.`],
        [`0.059`, `That is 1/(1 + 4²) = 1/17, the 2nd-order value; here n = 1.`]
      ],
      a: 2 },
    { q: `An ideal 2D low-pass filter keeps (u,v) if √(u² + v²) ≤ w<sub>0</sub>. With <b>w<sub>0</sub> = 25</b>, which point is KEPT?`,
      o: [
        [`(20, 20)`, `√800 ≈ 28.3 > 25, so it is discarded.`],
        [`(24, 8)`, `√640 ≈ 25.3 > 25, just outside the circle, so it is discarded.`],
        [`(15, 20)`, `√(225 + 400) = √625 = 25 ≤ 25, so it is inside the circle and kept.`],
        [`(5, 25)`, `√650 ≈ 25.5 > 25, so it is discarded.`]
      ],
      a: 2 },
    { q: `By sinusoidal decomposition, a <b>150 Hz</b> square(ish) wave is built from sinusoids at:`,
      o: [
        [`150, 300, 450 Hz …`, `That is every harmonic; a square wave has only the odd ones (the lecture's 200 Hz example used 200, 600, 1000 Hz).`],
        [`300, 600, 900 Hz …`, `Those are even multiples and the fundamental is missing.`],
        [`150, 450, 750 Hz …`, `A square wave contains the odd multiples of the fundamental: 1×, 3×, 5× … 150 Hz.`],
        [`150 Hz only`, `A single 150 Hz component is a pure sine wave, not a square wave.`]
      ],
      a: 2 },
    { q: `An image was blurred by a known filter H. Using the convolution theorem, how do you <b>remove</b> (compensate for) the blur in the frequency domain?`,
      o: [
        [`Multiply the image's FT by H, then take the inverse FT`, `Wrong — multiplying by H applies the blur again (that is how an effect such as reverb is added).`],
        [`Divide the image's FT by H, then take the inverse FT (deconvolution)`, `Correct — multiplying applies an effect, dividing removes it (G./H), followed by the inverse FT.`],
        [`Add H to the image's FT`, `Wrong — convolution corresponds to multiplication of FTs, so addition does not undo it.`],
        [`Apply an ideal low-pass filter to the blurred image`, `Wrong — a low-pass removes high frequencies and would blur further; deconvolution acts more like a high-pass.`]
      ],
      a: 1 },
    { q: `True or False: in MATLAB, applying <code>fft(X)</code> to a matrix X computes its 2D Fourier transform.`,
      o: [
        [`True`, `Wrong — fft on a matrix works column by column (1D per column).`],
        [`False`, `Correct — fft(X) on a matrix computes a 1D FT per column, NOT the 2D FT; fft2(X) is used for 2D.`]
      ],
      a: 1 },
  ],
  3: [
    { q: `How much storage does an uncompressed <b>800 × 600 grey-scale</b> (8-bit) image need? (1 KB = 1024 B)`,
      o: [
        [`1406.25 KB`, `That is the 24-bit (3 bytes per pixel) size; grey-scale uses 1 byte per pixel.`],
        [`468.75 KB`, `800 × 600 × 8 / 8 = 480,000 B ÷ 1024 = 468.75 KB.`],
        [`3750 KB`, `That divides bits by 1024 without first converting to bytes (forgot ÷ 8).`],
        [`58.59 KB`, `That is the 1 bit per pixel (black-and-white) size.`]
      ],
      a: 1 },
    { q: `What is the uncompressed data rate of <b>640 × 480</b>, 24-bit colour video at <b>30 fps</b>? (1 MB = 1024 × 1024 B)`,
      o: [
        [`≈ 8.79 MB/s`, `That uses 1 byte per pixel; 24-bit colour is 3 bytes per pixel.`],
        [`≈ 26.37 MB/s`, `Frame = 640 × 480 × 3 = 921,600 B; × 30 = 27,648,000 B/s ÷ 1,048,576 ≈ 26.37 MB/s (data rate = frame size × fps).`],
        [`≈ 21.97 MB/s`, `That uses 25 fps instead of 30 fps.`],
        [`≈ 210.94 MB/s`, `That is megabits per second (24 bits not divided by 8).`]
      ],
      a: 1 },
    { q: `Using audio size = sample rate × bits per sample × channels × seconds, how big is <b>30 s</b> of <b>stereo</b>, 16-bit audio at <b>22.05 kHz</b>? (1 KB = 1024 B)`,
      o: [
        [`≈ 1291.99 KB`, `That is the mono size — the ×2 for stereo was forgotten.`],
        [`≈ 20,671.88 KB`, `That divides bits by 1024 without first dividing by 8 to get bytes.`],
        [`≈ 2583.98 KB`, `22,050 × 16 × 2 × 30 = 21,168,000 bits = 2,646,000 B ÷ 1024 ≈ 2583.98 KB.`],
        [`≈ 5167.97 KB`, `That uses 44.1 kHz, not the stated 22.05 kHz.`]
      ],
      a: 2 },
    { q: `A thermocouple, a microphone and a camera are all examples of:`,
      o: [
        [`Transducers — sensors that convert what they sense into electrical signals`, `Correct — temperature, acoustic and light sensors respectively.`],
        [`Analog-to-digital converters`, `Wrong — an ADC is separate hardware (e.g. a sound card) that samples the sensor's analog signal.`],
        [`Digital-to-analog converters`, `Wrong — a DAC produces an analog signal for playback devices such as loudspeakers.`],
        [`Anti-aliasing filters`, `Wrong — those are analog conditioning filters at the ADC input, not sensors.`]
      ],
      a: 0 },
    { q: `In the analog → digital → analog pipeline, why is the DAC output passed through a <b>low-pass filter</b>?`,
      o: [
        [`To quantise the signal into discrete levels`, `Wrong — quantisation happens in the ADC, at the input side.`],
        [`To prevent aliasing before the signal is sampled`, `Wrong — that is the job of the anti-aliasing filter at the INPUT, before the ADC.`],
        [`To compress the signal for storage`, `Wrong — low-pass filtering here reconstructs a smooth analog signal; it is not storage compression.`],
        [`To remove the aliases (images) created by sampling`, `Correct — the lecture says the output must be low-pass filtered to remove the aliases from the sampling.`]
      ],
      a: 3 },
    { q: `According to the course summary, which pair correctly describes the two steps of analog-to-digital conversion?`,
      o: [
        [`Sampling makes the signal discrete in time; quantisation turns the samples into discrete digital values`, `Correct — digital = sampling + quantisation.`],
        [`Sampling turns values into binary codes; quantisation picks the time instants`, `Wrong — the two roles are swapped.`],
        [`Sampling and quantisation both mean compressing the signal`, `Wrong — they digitise the signal; compression is a later, separate step.`],
        [`Quantisation happens in the DAC; sampling happens in the ADC`, `Wrong — both sampling and quantisation are done by the ADC.`]
      ],
      a: 0 },
    { q: `Why do the different media in a multimedia application often need <b>synchronisation</b>?`,
      o: [
        [`Because all multimedia data is static (time independent)`, `Wrong — continuous media (audio, video, animation) are time dependent; static data would not need timing.`],
        [`Because text is stored at 1 byte per character`, `Wrong — character size has nothing to do with synchronisation.`],
        [`Because the data usually has temporal relationships as an integral property`, `Correct — the lecture states that multimedia data usually has temporal relationships, so the media may need synchronisation.`],
        [`Because graphics must be digitised before display`, `Wrong — computer-made graphics do not need digitising at all.`]
      ],
      a: 2 },
    { q: `How is printed text usually turned into digital text?`,
      o: [
        [`Key-frame interpolation (tweening)`, `Wrong — tweening is a 2D animation technique.`],
        [`An anti-aliasing filter followed by a DAC`, `Wrong — a DAC converts digital to analog, the opposite direction.`],
        [`Recording it with a microphone at 44.1 kHz`, `Wrong — that captures audio, not printed text.`],
        [`Scanning with OCR (optical character recognition)`, `Correct — printed (and some handwritten) text can be scanned via OCR.`]
      ],
      a: 3 },
    { q: `True or False: graphics animation is compact, which makes it suitable for network transmission.`,
      o: [
        [`True`, `Correct — the lecture notes that graphics animation (a sequence of slightly changed graphics) is compact, so it suits network transmission.`],
        [`False`, `Wrong — the lecture says exactly this: animation built from graphics is compact and suitable for networks.`]
      ],
      a: 0 },
    { q: `True or False: spreadsheets are always stored as binary files.`,
      o: [
        [`True`, `Wrong — the lecture says spreadsheets may be text (CSV) or binary.`],
        [`False`, `Correct — spreadsheets may be stored as text (CSV) or in a binary format.`]
      ],
      a: 1 },
  ],
  4: [
    { q: `How many quantisation levels does a <b>12-bit</b> sample have?`,
      o: [
        [`2048`, `That is 2<sup>11</sup> — one bit short.`],
        [`24`, `That is 12 × 2; levels grow exponentially, as 2<sup>bits</sup>.`],
        [`144`, `That is 12²; the number of levels is 2<sup>12</sup>, not 12².`],
        [`4096`, `Levels = 2<sup>bits</sup> = 2<sup>12</sup> = 4096 (8-bit gives 256, 16-bit 65,536).`]
      ],
      a: 3 },
    { q: `What is the <b>Nyquist frequency</b> for a sample rate of <b>48 kHz</b>?`,
      o: [
        [`96 kHz`, `That is 2 × fs; the Nyquist RATE for a signal is 2·fmax, but the Nyquist frequency of a sample rate is fs/2.`],
        [`24 kHz`, `Nyquist frequency = fs/2 = 48/2 = 24 kHz, the highest frequency this rate can represent.`],
        [`48 kHz`, `That is the sample rate itself, not its Nyquist frequency.`],
        [`22.05 kHz`, `That is the Nyquist frequency of 44.1 kHz (CD audio), not 48 kHz.`]
      ],
      a: 1 },
    { q: `x(t) = 5·cos(600πt) + 2·sin(1000πt + π/4). What is the <b>minimum</b> sampling rate that satisfies Nyquist?`,
      o: [
        [`1000 Hz`, `Each term is 2πf·t: f<sub>1</sub> = 600π/2π = 300 Hz, f<sub>2</sub> = 1000π/2π = 500 Hz; fmax = 500 Hz → fs ≥ 2 × 500 = 1000 Hz.`],
        [`500 Hz`, `That is fmax itself — the ×2 from Nyquist was forgotten.`],
        [`600 Hz`, `That is 2 × 300 Hz, based on the lower component; Nyquist uses the HIGHEST frequency.`],
        [`2000 Hz`, `That reads 1000π as 1000 Hz; you must divide the angular frequency by 2π first.`]
      ],
      a: 0 },
    { q: `A <b>speech</b> recording is <b>2 minutes</b> long, <b>8-bit</b>, <b>mono</b>, and no sample rate is given. Using the course constants, what is its size? (1 KB = 1024 B)`,
      o: [
        [`1875 KB`, `That is the stereo size; the recording is mono (1 channel).`],
        [`7500 KB`, `That divides bits by 1024 without converting to bytes (forgot ÷ 8).`],
        [`937.5 KB`, `Speech → fs = 8000 Hz. 8000 × 8 × 1 × 120 = 7,680,000 bits = 960,000 B ÷ 1024 = 937.5 KB.`],
        [`≈ 5167.97 KB`, `That uses the audio/music constant 44.1 kHz; speech uses 8 kHz.`]
      ],
      a: 2 },
    { q: `What is the sampling interval for a sample rate of <b>22.05 kHz</b>?`,
      o: [
        [`≈ 22.68 µs`, `That is 1/44,100 (CD rate), the music interval from the summary.`],
        [`≈ 45.35 µs`, `T = 1/fs = 1/22,050 ≈ 0.00004535 s ≈ 45.35 µs.`],
        [`125 µs`, `That is 1/8000, the speech interval.`],
        [`22,050 s`, `The interval is the reciprocal of the rate, not the rate itself.`]
      ],
      a: 1 },
    { q: `Converting 1 minute of 44.1 kHz, 16-bit <b>stereo</b> audio to 22.05 kHz, 8-bit <b>mono</b> multiplies the file size by:`,
      o: [
        [`1/8`, `Rate ÷2, bits ÷2, channels ÷2 → ½ × ½ × ½ = 1/8 (10.1 MB → about 1.26 MB, as in the lecture table).`],
        [`1/4`, `That only accounts for two of the three halvings (e.g. forgot stereo → mono).`],
        [`1/2`, `Only one factor was halved; rate, bit size and channels are all halved.`],
        [`1/16`, `One factor too many; there are exactly three halvings.`]
      ],
      a: 0 },
    { q: `On the slides, what happens when a sine wave is sampled at <b>exactly its own frequency</b>?`,
      o: [
        [`The waveform is captured perfectly`, `Wrong — only sampling above the Nyquist rate captures it well.`],
        [`The sine is just captured, like sampling at twice its frequency`, `Wrong — "just captured" is the demo for sampling at twice the frequency.`],
        [`There is one sample per cycle, every sample has the same value, and the sine is lost`, `Correct — that is the slide demo; you need at least twice the frequency.`],
        [`The result is oversampling`, `Wrong — oversampling means sampling ABOVE the Nyquist rate; this is far below it.`]
      ],
      a: 2 },
    { q: `Which use does the lecture give for a <b>22.05 kHz</b> sample rate?`,
      o: [
        [`Low-grade audio such as WWW audio and AM radio`, `Correct — 22.05 kHz is listed as low-grade audio.`],
        [`Speech`, `Wrong — speech is listed at 11.025 kHz (telephone 8 kHz).`],
        [`CD quality`, `Wrong — CD quality is 44.1 kHz.`],
        [`Audiophile recording`, `Wrong — audiophile audio is quoted as 24-bit at 96 kHz.`]
      ],
      a: 0 },
    { q: `In the analogy between sounds and images, synthetic sound (e.g. MIDI) is most like:`,
      o: [
        [`A bitmap image — regularly sampled, large and hard to modify`, `Wrong — that is the analogy for RECORDED (sampled) sound.`],
        [`A JPEG photo — lossy compressed samples`, `Wrong — the slides compare synthetic sound to vector graphics, not to compressed photos.`],
        [`A colour look-up table`, `Wrong — no such analogy is made; synthetic sound sends parameters, not palette indices.`],
        [`Vector graphics — a small, easily edited high-level description that must be converted before playback`, `Correct — synthesis is to sound what rasterisation is to vector graphics.`]
      ],
      a: 3 },
    { q: `True or False: the .au, .aiff and .wav formats always require compression.`,
      o: [
        [`True`, `Wrong — the lecture says compression can be used with these formats but is not mandatory.`],
        [`False`, `Correct — for .au (Unix), .aiff (Mac) and .wav (PC), compression can be used but is not mandatory.`]
      ],
      a: 1 },
  ],
  5: [
    { q: `A Karplus-Strong string must sound at <b>294 Hz</b> with Fs = 44,100 Hz. What delay-line length D is needed?`,
      o: [
        [`294 samples`, `That just reuses the frequency; the delay length is Fs ÷ F1.`],
        [`150 samples`, `D = Fs / F1 = 44,100 / 294 = 150 samples.`],
        [`300 samples`, `That would give 44,100/300 = 147 Hz, an octave too low.`],
        [`0.0034 samples`, `That is 1/294 s, the period in seconds, not in samples (forgot × Fs).`]
      ],
      a: 1 },
    { q: `A <b>1000 Hz</b> carrier is FM-modulated by a <b>150 Hz</b> modulator. Where are the <b>third-order</b> sidebands?`,
      o: [
        [`850 Hz and 1150 Hz`, `Those are the first-order sidebands (n = 1).`],
        [`700 Hz and 1300 Hz`, `Those are the second-order sidebands (n = 2).`],
        [`550 Hz and 1450 Hz`, `Sidebands sit at fc ± n·fm: 1000 ± 3 × 150 = 1000 ± 450.`],
        [`2850 Hz and 3150 Hz`, `That multiplies the carrier by 3; n multiplies the MODULATOR frequency, not the carrier.`]
      ],
      a: 2 },
    { q: `In the subtractive synthesis demo, a filter is made with <code>butter(4, 0.1, 'low')</code> at Fs = 22,050 Hz. What is the actual cut-off frequency?`,
      o: [
        [`2205 Hz`, `That scales by Fs instead of the Nyquist frequency Fs/2.`],
        [`0.1 Hz`, `0.1 is a normalised value (fraction of Nyquist), not a frequency in Hz.`],
        [`441 Hz`, `That is the cut-off of the lecture's 0.04 setting (0.04 × 11,025), not 0.1.`],
        [`1102.5 Hz`, `The cut-off is relative to Nyquist (Fs/2 = 11,025 Hz): 0.1 × 11,025 = 1102.5 Hz.`]
      ],
      a: 3 },
    { q: `Using simple sound-energy beat detection on audio sampled at <b>48 kHz</b>, how many samples are in the "instant" energy window?`,
      o: [
        [`48,000`, `That is the ~1 s window used for the local AVERAGE energy.`],
        [`1024`, `1024 samples is the FFT size in the frequency-selected method, not the instant window.`],
        [`2400`, `The instant window is about 5/100 s: 0.05 × 48,000 = 2400 samples.`],
        [`2205`, `That is 0.05 × 44,100; the audio here is at 48 kHz.`]
      ],
      a: 2 },
    { q: `Which instrument does the lecture give as having a <b>very short release</b>?`,
      o: [
        [`A pipe organ`, `Correct — the organ plays at constant volume and dies quickly when the key is released.`],
        [`A bell`, `Wrong — a bell has a long release.`],
        [`A piano with the sustain pedal held`, `Wrong — this is the lecture's example of a long release.`],
        [`A guitar`, `Wrong — the guitar is the example of a sound that is loudest just after plucking and then fades; it is not given as a short-release example.`]
      ],
      a: 0 },
    { q: `In FM synthesis, which preset routing ("algorithm") is described as an oscillator's output modulating <b>itself</b>?`,
      o: [
        [`Multiple carriers`, `Wrong — that is one oscillator modulating two or more carriers.`],
        [`Feedback`, `Correct — feedback: an oscillator modulates itself.`],
        [`Multiple modulators`, `Wrong — that is two or more oscillators modulating one carrier.`],
        [`Linear crossfading`, `Wrong — that is a wavetable technique, not an FM algorithm.`]
      ],
      a: 1 },
    { q: `What is the main <b>disadvantage</b> of sample-based synthesis named in the lecture?`,
      o: [
        [`It needs much more processing power than physical modelling`, `Wrong — its ADVANTAGE is much lower processing power, since nuances are pre-recorded.`],
        [`It cannot reproduce real instruments`, `Wrong — it uses recordings of real instruments as its seed waveforms.`],
        [`A great deal of data must be specified for each partial`, `Wrong — that is the disadvantage of additive synthesis.`],
        [`Detailed sounds need several samples played at once, which reduces polyphony`, `Correct — e.g. a trumpet needs breath noise, growl and a looping wave together.`]
      ],
      a: 3 },
    { q: `In a sampler, using low keys outside the instrument's range to switch between playing styles (e.g. muted/open trumpet) is called:`,
      o: [
        [`Keyswitching`, `Correct — keyswitches select the playing style from banks of key-mapped, velocity-layered samples.`],
        [`Velocity layering`, `Wrong — velocity layers change the sound depending on how hard the key is hit.`],
        [`Multisampling`, `Wrong — multisampling records the instrument at intervals (splits) across the keyboard.`],
        [`Looping`, `Wrong — looping repeats part of a sample to save memory.`]
      ],
      a: 0 },
    { q: `In the Karplus-Strong drum variant, which blend factor b gives the best <b>snare</b> sound?`,
      o: [
        [`b near 0`, `Wrong — b near 0 gives a string-like sound.`],
        [`b = ½`, `Correct — b = ½ gives the best snare.`],
        [`b near 1`, `Wrong — b near 1 gives a weird electric crash-cymbal sound.`],
        [`b = 2`, `Wrong — b is a probability/blend factor between 0 and 1.`]
      ],
      a: 1 },
    { q: `True or False: PSOLA uses a Short-Time Fourier Transform (STFT), like the phase vocoder.`,
      o: [
        [`True`, `Wrong — the lecture states there is no STFT in PSOLA; it works on overlapping time-domain segments.`],
        [`False`, `Correct — PSOLA has no STFT (it predates the phase vocoder); it moves, repeats or drops overlapping segments and overlap-adds them.`]
      ],
      a: 1 },
  ],
  6: [
    { q: `Decode the MIDI message <b>B3 07 64</b> (hex).`,
      o: [
        [`Control Change, channel 3, controller 7, value 100`, `The nibble 3 is channel − 1, so the musician's channel number is 4.`],
        [`Program Change, channel 4, program 7, value 100`, `Program Change is Cx and has only one data byte; Bx is Control Change.`],
        [`Control Change, channel 4, controller 7, value 100`, `B = Control Change; low nibble 3 → channel 3 + 1 = 4; 07 = 7; 64 hex = 6×16 + 4 = 100.`],
        [`Control Change, channel 4, controller 7, value 64`, `64 is hexadecimal; in decimal it is 100.`]
      ],
      a: 2 },
    { q: `Which hex bytes send <b>Note Off</b>, <b>channel 6</b>, key <b>64</b>, velocity 0?`,
      o: [
        [`85 40 00`, `Note Off = 8x; channel 6 → nibble 5 → 85; key 64 = 4×16 = 40 hex; velocity 00.`],
        [`86 40 00`, `The channel nibble is channel − 1, so channel 6 is 5, not 6.`],
        [`95 40 00`, `9x is Note On, not Note Off.`],
        [`85 64 00`, `64 is the decimal key number; in hex it must be written 40.`]
      ],
      a: 0 },
    { q: `A sequence has <b>500 notes</b> (each a Note On and a Note Off) plus <b>4 Program Change</b> messages. How many bytes of MIDI messages is that?`,
      o: [
        [`3012 bytes`, `That counts Program Change as 3 bytes; it has only one data byte (2 bytes total).`],
        [`3008 bytes`, `1000 note messages × 3 B = 3000 B, plus 4 Program Changes × 2 B = 8 B → 3008 B.`],
        [`1508 bytes`, `That forgets the 500 Note Off messages.`],
        [`2008 bytes`, `That counts note messages as 2 bytes; Note On/Off are 3 bytes (status + key + velocity).`]
      ],
      a: 1 },
    { q: `What does the status byte <b>E2</b> mean?`,
      o: [
        [`Pitch Bend on channel 2`, `The nibble is channel − 1, so 2 means channel 3.`],
        [`Channel Pressure on channel 3`, `Channel Pressure is Dx, not Ex.`],
        [`Program Change on channel 3`, `Program Change is Cx, not Ex.`],
        [`Pitch Bend on channel 3`, `E = Pitch Bend; nibble 2 → channel 2 + 1 = 3.`]
      ],
      a: 3 },
    { q: `In the General MIDI patch map, instrument number <b>30</b> belongs to which family?`,
      o: [
        [`Organ`, `Organ is 17–24.`],
        [`Guitar`, `Families are groups of 8: 25–32 is Guitar.`],
        [`Bass`, `Bass is 33–40.`],
        [`Chromatic Percussion`, `Chromatic Percussion is 9–16.`]
      ],
      a: 1 },
    { q: `The General MIDI percussion key map contains:`,
      o: [
        [`128 percussion sounds on keys 0–127`, `Wrong — 128 is the size of the instrument patch map.`],
        [`16 percussion sounds, one per channel`, `Wrong — percussion goes on channel 10 by default, and there are 47 sounds.`],
        [`47 percussion sounds on keys 35–81`, `Correct — e.g. 35 Acoustic Bass Drum up to 81 Open Triangle.`],
        [`47 percussion sounds on keys 1–47`, `Wrong — the count is right but the keys run from 35 to 81.`]
      ],
      a: 2 },
    { q: `Which system real-time message <b>stops</b> a sequence?`,
      o: [
        [`FA`, `Wrong — FA is Start Sequence.`],
        [`F8`, `Wrong — F8 is the Timing Clock.`],
        [`F7`, `Wrong — F7 is Sysex End, not a real-time message.`],
        [`FC`, `Correct — FC = Stop (FA = Start, FB = Continue, F8 = Timing Clock).`]
      ],
      a: 3 },
    { q: `In MIDI terminology, the <b>control settings that define a particular timbre</b> are called a:`,
      o: [
        [`Patch`, `Correct — a patch is the set of control settings defining a timbre.`],
        [`Voice`, `Wrong — a voice is the portion of the synthesiser that produces a sound.`],
        [`Track`, `Wrong — a track organises recordings in a sequencer.`],
        [`Channel`, `Wrong — a channel separates information in a MIDI system (16 per cable).`]
      ],
      a: 0 },
    { q: `Which MPEG-4 Structured Audio tool specifies the <b>mixing and post-production</b> of audio scenes at playback (e.g. fading music, adding reverb)?`,
      o: [
        [`SASL`, `Wrong — SASL is the score language that controls SAOL instruments (notes, loudness, tempo).`],
        [`SASBF`, `Wrong — SASBF transmits banks of samples for wavetable/sample-based synthesis.`],
        [`AudioBIFS`, `Correct — AudioBIFS (part of the Binary Format for Scene Description) handles mixing/post-production.`],
        [`Scheduler`, `Wrong — the scheduler defines how SAOL creates sound when driven by MIDI or SASL.`]
      ],
      a: 2 },
    { q: `True or False: MIDI system messages are channel specific.`,
      o: [
        [`True`, `Wrong — system messages carry information that is NOT channel specific.`],
        [`False`, `Correct — system messages (common, real-time, exclusive) are not channel specific: timing, song position, device setup.`]
      ],
      a: 1 },
  ],
  7: [
    { q: `A slapback effect needs a delay of <b>40 ms</b> at f<sub>s</sub> = <b>48 kHz</b>. What is the delay M in samples?`,
      o: [
        [`192`, `A factor-of-10 slip: 40 ms is 0.04 s, not 0.004 s.`],
        [`0.00000083`, `That is τ ÷ f<sub>s</sub> taken literally from the slide's M = τ/f<sub>s</sub>; numerically the delay is τ × f<sub>s</sub>.`],
        [`1920`, `M = τ × f<sub>s</sub> = 0.04 × 48,000 = 1920 samples.`],
        [`1200`, `That would be 25 ms at 48 kHz; 40 ms gives 1920.`]
      ],
      a: 2 },
    { q: `An audio sine of <b>500 Hz</b> is amplitude-modulated, y(n) = (1 + α·m(n))·x(n), by an <b>80 Hz</b> sine LFO. Which frequencies are heard?`,
      o: [
        [`420 and 580 Hz only`, `That is RING modulation, which keeps only the sum and difference; AM also keeps the 500 Hz carrier.`],
        [`500 and 80 Hz`, `Modulation creates sum/difference frequencies; it does not simply output the two inputs.`],
        [`500 Hz only`, `The modulation adds sidebands, so more than the carrier is heard.`],
        [`420, 500 and 580 Hz`, `AM gives three frequencies: f<sub>c</sub>, f<sub>c</sub> − f<sub>x</sub> and f<sub>c</sub> + f<sub>x</sub>.`]
      ],
      a: 3 },
    { q: `An equaliser band is set to <b>G = 12 dB</b>. Using V<sub>0</sub> = 10<sup>G/20</sup> and H<sub>0</sub> = V<sub>0</sub> − 1, H<sub>0</sub> ≈`,
      o: [
        [`3.98`, `That is V<sub>0</sub>; the −1 was forgotten.`],
        [`2.98`, `V<sub>0</sub> = 10<sup>12/20</sup> = 10<sup>0.6</sup> ≈ 3.98, so H<sub>0</sub> ≈ 2.98.`],
        [`14.85`, `That uses 10<sup>G/10</sup> (power form); the lecture's formula uses G/20.`],
        [`11`, `H<sub>0</sub> is not G − 1; the dB gain must first be converted to linear.`]
      ],
      a: 1 },
    { q: `For the state variable filter (wah-wah), F<sub>1</sub> = 2·sin(π·f<sub>c</sub>/f<sub>s</sub>). What is F<sub>1</sub> for f<sub>c</sub> = 2000 Hz, f<sub>s</sub> = 48,000 Hz?`,
      o: [
        [`≈ 0.5176`, `That uses 2π·f<sub>c</sub>/f<sub>s</sub> inside the sine; the formula uses π·f<sub>c</sub>/f<sub>s</sub>.`],
        [`≈ 0.1305`, `That is sin(π·f<sub>c</sub>/f<sub>s</sub>) — the factor 2 was forgotten.`],
        [`≈ 0.2611`, `π × 2000/48,000 ≈ 0.1309 rad; sin ≈ 0.1305; × 2 ≈ 0.2611.`],
        [`≈ 0.0833`, `That is 2·f<sub>c</sub>/f<sub>s</sub> with no π and no sine.`]
      ],
      a: 2 },
    { q: `Using the overdrive soft-clipping curve, what is f(x) for input <b>x = 0.6</b>?`,
      o: [
        [`1.2`, `That uses the linear part 2x, which only applies for x &lt; 1/3.`],
        [`≈ 0.987`, `0.6 is in the 1/3 ≤ x &lt; 2/3 region: (3 − (2 − 1.8)²)/3 = (3 − 0.04)/3 ≈ 0.987.`],
        [`1`, `Saturation at 1 only applies for x ≥ 2/3.`],
        [`≈ 2.96`, `That is 3 − (2 − 1.8)² without the final ÷ 3; the quadratic region is (3 − (2 − 3x)²)/3.`]
      ],
      a: 1 },
    { q: `A mono source x is panned with θ = 30° using g<sub>L</sub> = (cos θ + sin θ)x and g<sub>R</sub> = (cos θ − sin θ)x. What are the gains?`,
      o: [
        [`g<sub>L</sub> ≈ 1.366x, g<sub>R</sub> ≈ 0.366x`, `cos 30° ≈ 0.866, sin 30° = 0.5 → 1.366 and 0.366.`],
        [`g<sub>L</sub> ≈ 0.366x, g<sub>R</sub> ≈ 1.366x`, `The left and right formulas were swapped.`],
        [`g<sub>L</sub> ≈ 0.866x, g<sub>R</sub> ≈ 0.5x`, `Those are just cos θ and sin θ; the gains are their sum and difference.`],
        [`g<sub>L</sub> = g<sub>R</sub> = x`, `Equal gains correspond to θ = 0 (centre), not 30°.`]
      ],
      a: 0 },
    { q: `In the lecture's classification of effects, the <b>phaser</b> belongs to which group?`,
      o: [
        [`Delays`, `Wrong — delays are vibrato, flanger, chorus and echo.`],
        [`Non-linear processing`, `Wrong — that group is compression, limiters, distortion, exciters/enhancers.`],
        [`Spatial effects`, `Wrong — spatial effects are panning, reverb and surround sound.`],
        [`Time-varying filters`, `Correct — wah-wah and phaser are listed as time-varying filters.`]
      ],
      a: 3 },
    { q: `Which dynamic processor operates on <b>low</b> signal levels and <b>boosts</b> their dynamics for a more lively sound?`,
      o: [
        [`Limiter`, `Wrong — a limiter reacts quickly to control HIGH peaks above a threshold.`],
        [`Compressor`, `Wrong — a compressor reduces the dynamics (loud parts reduced).`],
        [`Exciter`, `Wrong — an exciter changes timbre/brightness by adding subtle high-frequency content, not low-level dynamics.`],
        [`Expander`, `Correct — the expander works on low levels and boosts their dynamics.`]
      ],
      a: 3 },
    { q: `What is the structure of the classic <b>Schroeder</b> reverberator?`,
      o: [
        [`4 IIR comb filters in parallel followed by 2 allpass filters in series`, `Correct — parallel comb banks then series allpass filters.`],
        [`2 comb filters in series followed by 4 allpass filters in parallel`, `Wrong — the counts and arrangements are swapped.`],
        [`Tapped delay lines plus lowpass filters inside the comb feedback loops`, `Wrong — those are Moorer's (1976) additions, not Schroeder's original design.`],
        [`Convolution of the input with a recorded room impulse response`, `Wrong — that is convolution reverb, the other class of reverb simulation.`]
      ],
      a: 0 },
    { q: `True or False: there is an absolute rule for the order in which effects must be chained.`,
      o: [
        [`True`, `Wrong — the lecture says there is no absolute rule; it depends on the sound you want.`],
        [`False`, `Correct — order matters (it can drastically change the output), but there is no absolute rule; a standard order is only a guide.`]
      ],
      a: 1 },
  ],
  8: [
    { q: `Convert the RGB pixel <b>(200, 100, 50)</b> to CMYK (values 0–1).`,
      o: [
        [`(0.2157, 0.6078, 0.8039, 0)`, `That is the CMY result with K = 0; K = min(C, M, Y) must be extracted and subtracted.`],
        [`(0, 0.3922, 0.5882, 0.2157)`, `Normalise: (0.7843, 0.3922, 0.1961). CMY = 1 − RGB = (0.2157, 0.6078, 0.8039). K = min = 0.2157; subtract K → (0, 0.3922, 0.5882, 0.2157).`],
        [`(0.2157, 0.6078, 0.8039, 0.2157)`, `K was found but not subtracted from C, M and Y.`],
        [`(0.7843, 0.3922, 0.1961, 0.1961)`, `That keeps the normalised RGB values; CMY must first be computed as 1 − RGB.`]
      ],
      a: 1 },
    { q: `What is the luminance Y of the pixel (R, G, B) = <b>(100, 200, 50)</b>?`,
      o: [
        [`116.7`, `That is the plain average (350/3); Y uses the weights 0.299, 0.587, 0.114.`],
        [`153.0`, `Y = 0.299×100 + 0.587×200 + 0.114×50 = 29.9 + 117.4 + 5.7 = 153.0.`],
        [`124.2`, `That swaps the R and G weights (0.587×100 + 0.299×200 + 0.114×50); G gets the largest weight, 0.587.`],
        [`0.6`, `That is Y after normalising to 0–1; YIQ/YUV luminance is computed directly on the 0–255 values here.`]
      ],
      a: 1 },
    { q: `Original I = [20 40; 60 80], reconstructed I''' = [22 37; 60 84]. What is the <b>MSE</b>?`,
      o: [
        [`2.25`, `That is the MAE (mean of |differences| = 9/4); MSE squares the differences.`],
        [`29`, `That is the sum of squared errors; it must be divided by MN = 4.`],
        [`14.5`, `That divides the sum of squared errors (29) by 2 instead of by MN = 4 pixels.`],
        [`7.25`, `Differences −2, 3, 0, −4 → squares 4, 9, 0, 16 → sum 29 ÷ 4 pixels = 7.25.`]
      ],
      a: 3 },
    { q: `A <b>10 × 10 RGB</b> image is compressed to <b>0.1 KB</b>. Using the course convention CR = compressed ÷ original × 100 % with 1 KB = 1024 B, CR ≈`,
      o: [
        [`33.33 %`, `That uses 1 KB = 1000 B (100 B); the course uses 1024 B.`],
        [`292.97 %`, `That is original ÷ compressed (the textbook convention); the course formula is compressed ÷ original.`],
        [`102.4 %`, `That treats the image as greyscale (100 B); RGB uses 3 bytes per pixel.`],
        [`34.13 %`, `Original = 10 × 10 × 3 = 300 B; compressed = 0.1 × 1024 = 102.4 B; 102.4/300 × 100 ≈ 34.13 %.`]
      ],
      a: 3 },
    { q: `Using 4×4 dithering, a grey pixel of value <b>100</b> is remapped to 0–16 (× 17/256, round down) and compared with the dither matrix [0 8 2 10; 12 4 14 6; 3 11 1 9; 15 7 13 5]. How many of the 16 dots are set?`,
      o: [
        [`7`, `That sets dots where the value is ≥ the entry (0–6); the rule is strictly greater than.`],
        [`10`, `That is 16 − 6, the number of dots left blank.`],
        [`6`, `100 × 17/256 = 6.64 → 6. A dot is set where 6 > entry, i.e. entries 0–5: six dots.`],
        [`100`, `The pixel must first be remapped to 0–16; a 4×4 block has only 16 dots.`]
      ],
      a: 2 },
    { q: `How large is an uncompressed <b>800 × 600</b>, <b>32-bit</b> (RGB + alpha) image? (1 KB = 1024 B)`,
      o: [
        [`1406.25 KB`, `That is the 24-bit size; 32-bit adds a fourth (alpha) byte.`],
        [`468.75 KB`, `That is 1 byte per pixel (8-bit).`],
        [`1875 KB`, `800 × 600 × 4 B = 1,920,000 B ÷ 1024 = 1875 KB.`],
        [`15,000 KB`, `That divides bits by 1024 without converting to bytes.`]
      ],
      a: 2 },
    { q: `Compared with 4:4:4, what fraction of the samples (Y + Cb + Cr) does <b>4:2:2</b> chroma subsampling keep?`,
      o: [
        [`2/3`, `Per 4 pixels: 4 Y + 2 Cb + 2 Cr = 8 samples instead of 12 → 2/3.`],
        [`1/2`, `That is 4:1:1 or 4:2:0 (6 of 12 samples).`],
        [`1/3`, `That would keep only the luma; 4:2:2 keeps half of each chroma component.`],
        [`3/4`, `Not a ratio from the lecture; 8 of 12 samples is 2/3.`]
      ],
      a: 0 },
    { q: `Which image format was designed to <b>replace GIF</b> and supports up to 48 bits per pixel, gamma correction and an alpha channel?`,
      o: [
        [`PNG`, `Correct — Portable Network Graphics.`],
        [`TIFF`, `Wrong — TIFF uses tags to store many image types and is declining in popularity.`],
        [`BMP`, `Wrong — BMP is the Windows raster format (can store 24-bit bitmaps).`],
        [`JPEG`, `Wrong — JPEG is a lossy format for photographic images, not a GIF replacement with alpha.`]
      ],
      a: 0 },
    { q: `How does <b>S-Video</b> carry the picture?`,
      o: [
        [`On 2 lines: one for luminance and one for composite chrominance`, `Correct — S-Video is the compromise between component and composite video.`],
        [`On 3 separate lines, one per colour primary`, `Wrong — that is component video.`],
        [`On 1 line with luminance and chrominance mixed into one carrier`, `Wrong — that is composite video.`],
        [`As a digital stream with 4:2:0 subsampling`, `Wrong — S-Video is an analog signal format; chroma subsampling is a different topic.`]
      ],
      a: 0 },
    { q: `True or False: interlacing effectively <b>doubles</b> the sampling frequency of video.`,
      o: [
        [`True`, `Wrong — the lecture says interlacing effectively HALVES the sampling frequency, which causes interlacing aliasing.`],
        [`False`, `Correct — interlacing effectively halves the sampling frequency (one field holds only half the lines).`]
      ],
      a: 1 },
  ],
};

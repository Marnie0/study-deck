// Head First chapter for File Processing Lecture 2 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Physical file organization, the hard disk: secondary storage (DASD, SASD), the disk's components (platters, read/write heads,
// arm assembly, spindle, arms), tracks, sectors, clusters and cylinders, the capacity formulas and the slides' worked problem,
// organizing tracks by sectors or by blocks (blocking factor, sub-blocks), non-data overhead and records per track, the cost of a
// disk access (seek + rotational delay + transfer) with Examples 1 and 2, Quiz (2), and the disk as a bottleneck.
// Every fact comes from the lecture's notes; analogies are marked as ours; ‡ marks what the notes add where the slides give no answer.
// Every number in the "Be the disk calculator" drill was worked by hand twice and checked with node (bytes throughout, as the notes;
// 1 MB = 1024 × 1024 B only for the notes' ≈ 195.3 MB): 7 platters, 30,720 B, 430,080 B, 5000 cylinders, 2,150,400,000 B;
// 23,040,000 B, 120 and 1680 records, 750 tracks, 53.57 (‡ 54) cylinders; 1300 B, ⌊15.38⌋ = 15 → 150, 6300 B, ⌊3.17⌋ = 3 → 180;
// 6 ms, 3 ms, 6/170 ≈ 0.035 ms, 11.035 ms; 16.67 ms, 8.33 ms, 12,800 B, 204,800,000 B; and Quiz (2)(c) 28 + 5593 + 400,000 = 405,621 ms.
(function () {
  const H = window.HF; H.chapters.fp = H.chapters.fp || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T2 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-fp2')) {
    const s = document.createElement('style'); s.id = 'hf-css-fp2';
    s.textContent = `
.hfb .hf-fp2-tb{ display:grid; grid-template-columns:auto 1fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-fp2-tb > span{ padding:4px 9px; font-size:14px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-fp2-tb > span:nth-child(-n+2){ border-top:0; }
.hfb .hf-fp2-tb > span.r{ font:800 14px/1.3 var(--body); color:var(--hf-k); background:var(--hf-grey); white-space:nowrap; }
.hfb .hf-fp2-dr{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; grid-template-columns:minmax(0,1fr); gap:7px; }
.hfb .hf-fp2-tabs{ display:flex; gap:5px; }
.hfb .hf-fp2-tabs button{ flex:1 1 0; min-width:0; padding:0 2px; font:800 13px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-fp2-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-fp2-tabs button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-fp2-tabs button.dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-fp2-ask{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); }
.hfb .hf-fp2-work{ font:600 13px/1.5 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; color:var(--ink); min-height:48px; }
.hfb .hf-fp2-work > div{ white-space:pre; overflow:hidden; text-overflow:ellipsis; animation:hf-up .35s both; }
.hfb .hf-fp2-work .cur{ color:var(--hf-hand); }
.hfb .hf-fp2-q{ font:700 14px/1.25 var(--body); margin:0; color:var(--ink); }
.hfb .hf-fp2-opts{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-fp2-opts button{ font:700 13.5px/1 var(--mono); min-height:32px; padding:0 9px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-fp2-bad{ font-size:13.5px; line-height:1.32; margin:0; color:var(--hf-red); }
.hfb .hf-fp2-ok{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-fp2-row{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hfb .hf-fp2-row .hf-btn{ padding:7px 9px; }
.hfb .hf-fp2-spin{ direction:ltr; display:block; width:100%; height:auto; color:var(--hf-k); }
.hfb .hf-fp2-spin .rot{ animation:hf-fp2-turn 5s linear infinite; transform-origin:96px 80px; }
.hfb .hf-fp2-spin text{ font:700 13px var(--body); fill:var(--ink); }
@keyframes hf-fp2-turn{ to{ transform:rotate(360deg); } }
@media (prefers-reduced-motion: reduce){ .hfb .hf-fp2-spin .rot{ animation:none; } }
.hf-ar .hf-fp2-tb > span, .hf-ar .hf-fp2-ask, .hf-ar .hf-fp2-bad, .hf-ar .hf-fp2-ok, .hf-ar .hf-fp2-q{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-fp2-tb > span.r{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-fp2-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-fp2-ok{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-fp2-work{ direction:ltr; text-align:left; }
`;
    document.head.appendChild(s);
  }

  // the opener's picture: a platter turning under a still head (track, sector, head and arm, as on slide 20)
  function Spinner() {
    const cx = 96, cy = 80, P = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const a1 = -0.35, a2 = 0.05, [x1, y1] = P(56, a1), [x2, y2] = P(56, a2), [x3, y3] = P(44, a2), [x4, y4] = P(44, a1);
    return html`<svg className="hf-fp2-spin hf-in" viewBox="0 0 328 160" role="img" aria-label="A platter with concentric tracks turning under a read/write head on an arm" dir="ltr">
      <circle cx=${cx} cy=${cy} r="76" fill="var(--hf-grey)" stroke="var(--hf-line)" strokeWidth="1.6" />
      ${[68, 56, 44, 32].map(r => html`<circle key=${r} cx=${cx} cy=${cy} r=${r} fill="none" stroke=${r === 56 || r === 44 ? 'currentColor' : 'var(--faint)'} strokeWidth=${r === 56 || r === 44 ? 1.6 : 1} />`)}
      <g className=${calm() ? '' : 'rot'}>
        <path d=${`M${x1},${y1} A56,56 0 0 1 ${x2},${y2} L${x3},${y3} A44,44 0 0 0 ${x4},${y4} Z`} fill="var(--hf-red)" />
        <path d=${`M${cx - 50},${cy} h6`} stroke="var(--hf-line)" strokeWidth="2" />
      </g>
      <circle cx=${cx} cy=${cy} r="14" fill="var(--paper)" stroke="var(--hf-line)" strokeWidth="1.6" />
      <path d=${`M${cx + 50} ${cy - 2} L300 128`} stroke="var(--hf-line)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="300" cy="128" r="9" fill="var(--paper)" stroke="var(--hf-line)" strokeWidth="2" />
      <rect x=${cx + 42} y=${cy - 9} width="14" height="12" rx="2" fill="var(--ink)" />
      <text x="190" y="40">read/write head</text>
      <path d="M200 46 L158 70" stroke="var(--hf-line)" strokeWidth="1.2" />
      <text x="244" y="98">arm</text>
      <text x="8" y="16">track</text>
      <path d="M40 20 L62 40" stroke="var(--hf-line)" strokeWidth="1.2" />
      <text x="8" y="156">sector</text>
      <path d="M40 144 L138 70" stroke="var(--hf-red)" strokeWidth="1.2" strokeDasharray="3 2" />
    </svg>`;
  }

  // Be the disk calculator: the lecture's own worked problems, one step at a time. Every option is a real mistake; every right answer was checked.
  const DRILL = [
    {
      en: 'The worked problem\'s disk: <b>512 B/sector</b>, <b>60 sectors/track</b>, <b>cylinder height 14</b>, <b>5000 tracks/surface</b>. Find the drive capacity.',
      ar: 'الـ disk بتاع المسألة المحلولة: الـ sector بـ <bdi dir="ltr">512 B</bdi>، والـ track فيه 60 sector، والـ cylinder height بـ 14، وكل surface فيه 5000 track. احسب الـ capacity بتاعة الـ drive.',
      steps: [
        { l: ['Platters?', 'عدد الـ platters كام؟'], o: ['14', '7', '28'], a: 1, w: 'platters = 14 / 2 = 7',
          h: [['14 is the number of surfaces (sides). Each platter has two.', 'الـ 14 دي عدد الـ surfaces (الأوجه)، وكل platter ليه وشين.'], null, ['That multiplies by 2. Platters = cylinder height / 2.', 'ده ضرب في 2، والصح إن عدد الـ platters هو الـ cylinder height على 2.']] },
        { l: ['Track size?', 'حجم الـ track كام؟'], o: ['2048 B', '30,720 B', '2,560,000 B'], a: 1, w: 'track = 60 × 512 = 30,720 B',
          h: [['2048 = 4 × 512 is a cluster of 4 sectors, not a track.', 'الـ 2048 دي <bdi dir="ltr">4 × 512</bdi> يعني cluster فيه 4 sectors، مش track.'], null, ['That uses the 5000 tracks per surface. A track has 60 sectors.', 'ده استخدم الـ 5000 track، والـ track فيه 60 sector بس.']] },
        { l: ['Cylinder size?', 'حجم الـ cylinder كام؟'], o: ['215,040 B', '430,080 B', '153,600,000 B'], a: 1, w: 'cyl = 14 × 30,720 = 430,080 B',
          h: [['That uses 7 platters. A cylinder has one track per surface: 14.', 'ده استخدم الـ 7 platters، والـ cylinder فيه track على كل surface يعني 14.'], null, ['5000 × 30,720 is one whole surface, not a cylinder.', 'الـ <bdi dir="ltr">5000 × 30,720</bdi> دي surface كامل، مش cylinder.']] },
        { l: ['Cylinders?', 'عدد الـ cylinders كام؟'], o: ['14', '70,000', '5000'], a: 2, w: 'cylinders = tracks/surface = 5000',
          h: [['14 is the cylinder height: tracks in ONE cylinder.', 'الـ 14 دي الـ cylinder height، يعني عدد الـ tracks في cylinder واحد.'], ['70,000 = 14 × 5000 is every track on the disk.', 'الـ 70,000 دي كل الـ tracks اللي على الـ disk.'], null] },
        { l: ['Drive capacity?', 'الـ capacity بتاعة الـ drive كام؟'], o: ['153,600,000 B', '2,150,400,000 B', '6,021,120 B'], a: 1, w: ['drive = 5000 × 430,080', '      = 2,150,400,000 B'],
          h: [['That is one surface (5000 tracks × 30,720 B).', 'ده surface واحد بس.'], null, ['That multiplies the cylinder by 14 again. Use the 5000 cylinders.', 'ده ضرب الـ cylinder في 14 تاني، والمفروض في الـ 5000 cylinder.']] }
      ]
    },
    {
      en: 'Same disk. A file of <b>90,000 fixed-length records of 256 B</b>. How many tracks and cylinders does it need?',
      ar: 'نفس الـ disk، وعندنا file فيه 90,000 record طولهم ثابت، والـ record بـ <bdi dir="ltr">256 B</bdi>. الـ file محتاج كام track وكام cylinder؟',
      steps: [
        { l: ['File size?', 'حجم الـ file كام؟'], o: ['46,080,000 B', '23,040,000 B', '351.56 B'], a: 1, w: 'file = 90,000 × 256 = 23,040,000 B',
          h: [['That uses the 512 B sector as the record size.', 'ده استخدم حجم الـ sector مكان حجم الـ record.'], null, ['That divides. File size = records × record size.', 'ده قسمة، والصح إن حجم الـ file هو عدد الـ records مضروب في حجم الـ record.']] },
        { l: ['Records per track?', 'كام record في الـ track؟'], o: ['2', '120', '60'], a: 1, w: 'per track = 30,720 / 256 = 120',
          h: [['2 = 512 / 256 is per SECTOR.', 'الـ 2 دي في الـ sector الواحد.'], null, ['60 is the sectors per track, and each sector holds 2 records.', 'الـ 60 دي عدد الـ sectors، وكل sector فيه 2 records.']] },
        { l: ['Records per cylinder?', 'كام record في الـ cylinder؟'], o: ['840', '1680', '120'], a: 1, w: 'per cyl = 430,080 / 256 = 1680',
          h: [['840 is the SECTORS per cylinder (430,080 / 512).', 'الـ 840 دي عدد الـ sectors في الـ cylinder.'], null, ['120 is per track. A cylinder has 14 tracks.', 'الـ 120 دي في الـ track، والـ cylinder فيه 14 track.']] },
        { l: ['Tracks for the file?', 'الـ file محتاج كام track؟'], o: ['45,000', '53.57', '750'], a: 2, w: 'tracks = 23,040,000 / 30,720 = 750',
          h: [['45,000 is the number of SECTORS (÷ 512).', 'الـ 45,000 دي عدد الـ sectors.'], ['53.57 is the number of cylinders.', 'الـ 53.57 دي عدد الـ cylinders.'], null] },
        { l: ['Cylinders for the file?', 'الـ file محتاج كام cylinder؟'], o: ['53.57 → 53', '53.57 → 54', '750'], a: 1, w: ['cyls = 23,040,000 / 430,080', '     = 53.57 → 54 cylinders ‡'],
          h: [['Rounding down leaves part of the file with nowhere to go.', 'لو قرّبت لتحت، حتة من الـ file مش هتلاقي مكان.'], null, ['750 is the number of tracks.', 'الـ 750 دي عدد الـ tracks.']] }
      ]
    },
    {
      en: 'A <b>block-addressable</b> disk: track = <b>20,000 B</b>, non-data overhead = <b>300 B per block</b>, record = <b>100 B</b>. Records per track with blocking factor <b>10</b>, then <b>60</b>?',
      ar: 'عندنا disk بالـ <b>block addressing</b>: الـ track بـ <bdi dir="ltr">20,000 B</bdi>، والـ overhead بـ <bdi dir="ltr">300 B</bdi> لكل block، والـ record بـ <bdi dir="ltr">100 B</bdi>. كام record في الـ track لو الـ blocking factor بـ 10، وبعدين بـ 60؟',
      steps: [
        { l: ['Data sub-block (BF 10)?', 'الـ data sub-block كام؟'], o: ['100 B', '1000 B', '1300 B'], a: 1, w: 'data = 10 × 100 = 1000 B',
          h: [['That is one record. The block holds 10.', 'ده record واحد، والـ block فيه 10.'], null, ['1300 already adds the overhead. The data alone is 10 × 100.', 'الـ 1300 دي ضايفة الـ overhead، والداتا لوحدها <bdi dir="ltr">10 × 100</bdi>.']] },
        { l: ['Block size?', 'حجم الـ block كام؟'], o: ['1300 B', '1000 B', '700 B'], a: 0, w: 'block = 1000 + 300 = 1300 B',
          h: [null, ['The 300 B overhead is part of every block.', 'الـ <bdi dir="ltr">300 B</bdi> overhead جزء من كل block.'], ['The overhead is ADDED, not subtracted.', 'الـ overhead بيتجمع، مش بيتطرح.']] },
        { l: ['Blocks per track?', 'كام block في الـ track؟'], o: ['15.38', '16', '15'], a: 2, w: '⌊20,000 / 1300⌋ = ⌊15.38⌋ = 15',
          h: [['Only whole blocks fit: take the floor.', 'الـ blocks الكاملة بس هي اللي بتدخل، فناخد الـ floor.'], ['16 × 1300 = 20,800 B: more than the track.', 'الـ 16 block محتاجين <bdi dir="ltr">20,800 B</bdi>، أكتر من الـ track.'], null] },
        { l: ['Records per track (BF 10)?', 'كام record في الـ track؟'], o: ['200', '153.8', '150'], a: 2, w: '15 × 10 = 150 records/track',
          h: [['20,000 / 100 ignores the overhead and the whole-block rule.', 'ده تجاهل الـ overhead وإن الـ block لازم يبقى كامل.'], ['That uses 15.38 blocks. Floor first.', 'ده استخدم 15.38 block، خد الـ floor الأول.'], null] },
        { l: ['Records per track (BF 60)?', 'ولو الـ BF بـ 60، كام record؟'], o: ['190', '180', '150'], a: 1, w: ['BF 60: block = 6000 + 300 = 6300', '⌊20,000 / 6300⌋ = 3 → 180 records'],
          h: [['190 ≈ 3.17 × 60 counts a part of a block.', 'الـ 190 دي حسبت حتة block.'], null, ['150 is the answer for BF 10.', 'الـ 150 دي إجابة الـ BF بـ 10.']] }
      ]
    },
    {
      en: 'Example 1: average seek <b>8 ms</b>, average rotational delay <b>3 ms</b>, maximum rotational delay <b>6 ms</b>, <b>10,000 rpm</b>, <b>170 sectors/track</b>. Average time to read one sector?',
      ar: 'مثال 1: الـ average seek بـ <bdi dir="ltr">8 ms</bdi>، والـ average rotational delay بـ <bdi dir="ltr">3 ms</bdi>، والـ maximum بـ <bdi dir="ltr">6 ms</bdi>، والسرعة <bdi dir="ltr">10,000 rpm</bdi>، والـ track فيه 170 sector. متوسط وقت قراية sector واحد كام؟',
      steps: [
        { l: ['Revolution time?', 'وقت اللفة كام؟'], o: ['3 ms', '6 ms', '0.006 ms'], a: 1, w: 'rev = 60 × 1000 / 10,000 = 6 ms',
          h: [['3 ms is half a revolution.', 'الـ <bdi dir="ltr">3 ms</bdi> دي نص لفة.'], null, ['0.006 is in SECONDS (60 / 10,000). × 1000 for ms.', 'الـ 0.006 دي بالثواني، اضرب في 1000 عشان تبقى ms.']] },
        { l: ['Rotational delay?', 'الـ rotational delay كام؟'], o: ['6 ms', '0 ms', '3 ms'], a: 2, w: 'latency = 3 ms (average, given)',
          h: [['6 ms is the MAXIMUM delay. We want the average.', 'الـ <bdi dir="ltr">6 ms</bdi> دي أكبر قيمة، وإحنا عايزين المتوسط.'], ['0 is the minimum.', 'الصفر ده أقل قيمة.'], null] },
        { l: ['Transfer (one sector)?', 'الـ transfer لـ sector واحد كام؟'], o: ['6 ms', '0.035 ms', '1020 ms'], a: 1, w: 'transfer = 6 / 170 ≈ 0.035 ms',
          h: [['6 ms passes the WHOLE track (170 sectors).', 'الـ <bdi dir="ltr">6 ms</bdi> دي وقت الـ track كله.'], null, ['That multiplies. One sector is 1/170 of a turn.', 'ده ضرب، والـ sector الواحد <bdi dir="ltr">1/170</bdi> من اللفة.']] },
        { l: ['Total?', 'الـ total كام؟'], o: ['11 ms', '14.035 ms', '11.035 ms'], a: 2, w: 'total = 8 + 3 + 0.035 = 11.035 ms',
          h: [['The transfer time is missing.', 'ناقص الـ transfer time.'], ['That uses the maximum delay (6 ms).', 'ده استخدم أكبر delay.'], null] }
      ]
    },
    {
      en: 'Quiz (2): <b>20 surfaces</b>, <b>800 tracks/surface</b>, <b>25 sectors/track</b>, <b>512 B/sector</b>, <b>3600 rpm</b>, average seek 28 ms. Average latency and disk capacity?',
      ar: 'الـ Quiz (2): فيه 20 surface، وكل surface فيه 800 track، وكل track فيه 25 sector، والـ sector بـ <bdi dir="ltr">512 B</bdi>، والسرعة <bdi dir="ltr">3600 rpm</bdi>، والـ average seek بـ <bdi dir="ltr">28 ms</bdi>. احسب الـ average latency والـ capacity.',
      steps: [
        { l: ['Revolution time?', 'وقت اللفة كام؟'], o: ['16.67 ms', '8.33 ms', '0.0167 ms'], a: 0, w: 'rev = 60,000 / 3600 = 16.67 ms',
          h: [null, ['That is already half a turn.', 'ده نص لفة.'], ['That is in seconds. × 1000 for ms.', 'ده بالثواني، اضرب في 1000.']] },
        { l: ['Average latency?', 'الـ average latency كام؟'], o: ['16.67 ms', '28 ms', '8.33 ms'], a: 2, w: 'latency = ½ × 16.67 = 8.33 ms',
          h: [['A full turn is the MAXIMUM latency.', 'اللفة الكاملة دي أكبر latency.'], ['28 ms is the average SEEK.', 'الـ <bdi dir="ltr">28 ms</bdi> دي الـ average seek.'], null] },
        { l: ['Track capacity?', 'الـ track capacity كام؟'], o: ['409,600 B', '12,800 B', '10,240 B'], a: 1, w: 'track = 25 × 512 = 12,800 B',
          h: [['That uses 800 (tracks per surface).', 'ده استخدم الـ 800.'], null, ['That uses 20 (surfaces).', 'ده استخدم الـ 20.']] },
        { l: ['Disk capacity?', 'الـ capacity بتاعة الـ disk كام؟'], o: ['10,240,000 B', '256,000 B', '204,800,000 B'], a: 2, w: ['disk = 20 × 800 × 12,800', '     = 204,800,000 B ≈ 195.3 MB'],
          h: [['That is ONE surface (800 tracks).', 'ده surface واحد بس.'], ['That is ONE cylinder (20 tracks).', 'ده cylinder واحد بس.'], null] }
      ]
    }
  ];
  const ANS = [['2,150,400,000 B', '2,150,400,000 B'], ['750 tracks, 53.57 → 54 cylinders ‡', '750 tracks, 54 cylinders ‡'], ['150 (BF 10) and 180 (BF 60)', '150 (BF 10), 180 (BF 60)'], ['11.035 ms', '11.035 ms'], ['8.33 ms and 204,800,000 B', '8.33 ms; 204,800,000 B']];
  function Drill({ id, set }) {
    const ar = useAr();
    const [p0, setP] = H.K.useSlot(id + ':p', set[0]);
    const p = set.includes(p0) ? p0 : set[0];
    const [k0, setK0] = H.K.useSlot(id + ':' + p, 0);
    const [d0] = H.K.useSlot(id + ':' + set[0], 0), [d1] = H.K.useSlot(id + ':' + set[1], 0), [d2] = H.K.useSlot(id + ':' + (set[2] != null ? set[2] : 'x'), 0);
    const prog = [d0, d1, d2];
    const [bad, setBad] = useState(null);
    useEffect(() => setBad(null), [p]);
    const P = DRILL[p], n = P.steps.length, k = Math.min(k0, n), done = k >= n, st = done ? null : P.steps[k];
    const setK = v => { setBad(null); setK0(v); };
    const pick = j => { if (j === st.a) setK(k + 1); else setBad(st.h[j]); };
    const last = set.indexOf(p) === set.length - 1;
    const ans = ANS[p];
    return html`<div className="hf-fp2-dr hf-in">
      <div className="hf-fp2-tabs" role="group" aria-label=${ar ? 'المسائل' : 'Problems'}>${set.map((q, j) => html`<button key=${q} className=${prog[j] >= DRILL[q].steps.length ? 'dn' : ''} aria-pressed=${String(p === q)} onClick=${() => setP(q)}>${ar ? 'مسألة ' : 'Problem '}${q + 1}</button>`)}</div>
      <p className="hf-fp2-ask">${T2(ar ? P.ar : P.en)}</p>
      <div className="hf-fp2-work" dir="ltr">${P.steps.slice(0, k).reduce((a, s) => a.concat(s.w), []).map((w, j) => html`<div key=${p + '-' + j}>${w}</div>`)}${!done && html`<div className="cur">${st.l[0].replace('?', ' = ?')}</div>`}</div>
      ${done ? html`<p className="hf-fp2-ok">${T2(ar ? `<b>خلصت!</b> الإجابة: <bdi dir="ltr"><b>${ans[1]}</b></bdi>.${last ? '' : ' جرّب المسألة اللي بعدها.'}` : `<b>Done!</b> The answer: <b>${ans[0]}</b>.${last ? '' : ' Try the next problem.'}`)}</p>`
        : html`<p className="hf-fp2-q">${ar ? st.l[1] : st.l[0]}</p><div className="hf-fp2-opts" dir="ltr">${st.o.map((o, j) => html`<button key=${p + '-' + k + '-' + j} onClick=${() => pick(j)}>${o}</button>`)}</div>`}
      ${bad && html`<p className="hf-fp2-bad">${T2(ar ? bad[1] : bad[0])}</p>`}
      <div className="hf-fp2-row">
        ${!done && html`<button className="hf-btn" onClick=${() => setK(k + 1)}>${ar ? 'ورّيني الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => setK(n)}>${ar ? 'ورّيني الحل كله' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => setK(0)}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && html`<span className="hf-score">✓</span>`}
      </div>
    </div>`;
  }

  H.chapters.fp[2] = {
    title: 'Physical File Organization: the Hard Disk', kicker: 'Chapter 2', run: 'the hard disk',
    ar: { title: 'التنظيم الفيزيائي للـ Files: الـ Hard Disk', kicker: 'الفصل 2', run: 'الـ hard disk' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (quiz items with src), with the site's Arabic explanations
      const lec = kit.course.lectures.find(l => l.n === 2);
      const arQuiz = (window.AR && window.AR.fp && window.AR.fp.lectures && window.AR.fp.lectures[2] && window.AR.fp.lectures[2].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const RT = rows => html`<div className="hf-fp2-tb hf-in">${rows.map(([r, u], i) => html`<${React.Fragment} key=${i}><span className="r">${T(/^[\d(]/.test(r) ? '<bdi dir="ltr">' + r + '</bdi>' : r)}</span><span>${T(u)}</span></${React.Fragment}>`)}</div>`;
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;
      return [
        // 0 · how to use this chapter (faces the opener)
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X('Last chapter, your program talked to a file through a <b>logical name</b> (<code>infile</code>), and the <b>physical file</b> (<code>b.txt</code>) sat on a hard disk. Now we open that disk up. It is <b>calculation-heavy</b>, so you will do the slides\' own problems yourself, step by step.',
            'في الفصل اللي فات، البرنامج كان بيكلّم الـ file عن طريق <b>logical name</b> زي <code>infile</code>، والـ <b>physical file</b> زي <code>b.txt</code> كان قاعد على hard disk. دلوقتي هنفتح الـ disk ده. والمحاضرة دي <b>كلها حسابات</b>، فهتحل مسائل السلايدز بنفسك خطوة خطوة.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> "Be the disk calculator" checks every step and tells you which mistake you made.', '<b>حل التمارين.</b> تمرين "خليك إنت الحاسبة" بيصحّح كل خطوة ويقولك غلطت فين.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you read on.', '<b>شغّل مخك</b>: وقّف وفكّر قبل ما تكمّل.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers what you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على اللي اتكسفت تسأله.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks an answer the notes add where the slides stop or give none.', 'معناها إجابة النوتس بتضيفها في حتة السلايدز وقفت فيها أو مفيهاش إجابة.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies, not the slides\'.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي تشبيهات مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">2</span><span className="t">${A ? html`الفصل التاني<br/>File Processing` : html`Chapter two<br/>File Processing`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('You Spin Me Round', 'دايخ في الدواير')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('physical file organization: the hard disk', 'التنظيم الفيزيائي للـ files: الـ hard disk')}</p></div>
          <${Spinner} />
          <${Talk} who="dev">${t('To me, my file is just a row of bytes.', 'بالنسبالي الـ file بتاعي مجرد bytes ورا بعض.')}</${Talk}>
          <${Talk} who="disk" flip=${true}>${t('To me, it is rings on spinning platters, and an arm that has to go and find them.', 'وبالنسبالي هو دواير على platters بتلف، ودراع لازم يروح يدوّر عليها.')}</${Talk}>
        `, { sec: t('Secondary storage', 'الـ Secondary storage') }),

        // 2 · secondary storage
        page(html`
          <${H1}>${t('Why look inside the disk at all?', 'ليه نبص جوّه الـ disk أصلًا؟')}</${H1}>
          <${P}>${X('Secondary storage is <b>different from main memory</b>, so we have to understand <b>how it works in order to do good file design</b>.',
            'الـ secondary storage <b>مختلف عن الـ main memory</b>، فلازم نفهم <b>هو بيشتغل إزاي عشان نعمل file design كويس</b>.')}</${P}>
          <${Def}>${X('Two major types of secondary storage:<br/>(1) <b>DASD</b>: Direct Access Storage Devices<br/>(2) <b>SASD</b>: Serial Access Storage Devices',
            'فيه نوعين أساسيين من الـ secondary storage:<span class="ltr">(1) <b>DASD</b>: Direct Access Storage Devices<br/>(2) <b>SASD</b>: Serial Access Storage Devices</span>')}</${Def}>
          ${RT(A ? [['الـ DASD', 'الـ <b>magnetic disks</b>: الـ hard disk والـ floppy disk.<br/>الـ <b>optical disks</b>: الـ CD-ROM والـ CD-R والـ CD-RW والـ DVD.'], ['الـ SASD', 'الـ <b>magnetic tape</b>.']]
            : [['DASD', '<b>Magnetic disks</b>: hard disk, floppy disk.<br/><b>Optical disks</b>: CD-ROM, CD-R, CD-RW, DVD.'], ['SASD', '<b>Magnetic tape</b>.']])}
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('The only serial device on the list is the tape. Read the two names again: what does "direct" promise that "serial" does not?', 'الجهاز الـ serial الوحيد هو الـ tape. اقرا الاسمين تاني: كلمة "direct" بتوعد بإيه وكلمة "serial" لأ؟')}</p></${Box}>
        `),

        // 3 · storage types figure
        page(html`
          <${Fig} name="fp-storage-types" head=${t('DASD or SASD? Sort the devices', 'الـ DASD ولا الـ SASD؟ صنّف الأجهزة')} />
          <${Hand} arrow="up">${X('CD-ROM = Compact Disk – Read Only Memory, CD-R = Recordable, CD-RW = ReWritable, DVD = Digital Video Disk', 'الاختصارات:<span class="ltr">CD-ROM = Compact Disk – Read Only Memory, CD-R = Recordable, CD-RW = ReWritable, DVD = Digital Video Disk</span>')}</${Hand}>
        `),

        // 4 · disk components
        page(html`
          <${H1}>${t('Inside the box: five parts', 'جوّه العلبة: خمس حاجات')}</${H1}>
          <${P} small=${true}>${X('We say <b>disks</b> or <b>HDD</b> for hard disks. The important components:', 'بنقول <b>disks</b> أو <b>HDD</b> ونقصد الـ hard disks. والـ components المهمة:')}</${P}>
          ${RT(A ? [['1', 'الـ <b>platters</b>'], ['2', 'الـ <b><bdi dir="ltr">read/write heads</bdi></b>'], ['3', 'الـ <b>arm assembly</b>'], ['4', 'الـ <b>spindle</b>'], ['5', 'الـ <b>arms</b>']]
            : [['1', '<b>Platters</b>'], ['2', '<b>Read/write heads</b>'], ['3', '<b>Arm assembly</b>'], ['4', '<b>Spindle</b>'], ['5', '<b>Arms</b>']])}
          <${Def}>${X('<b>1. Platter</b>: the <b>circular disk</b> on which magnetic data is stored in a hard disk drive. It stores information on <b>both sides (surfaces)</b>, and all surfaces have the <b>same components at the same position</b>.',
            '<b>(1) الـ Platter</b>: هو الـ <b>disk الدايرية</b> اللي الداتا الـ magnetic بتتخزن عليها جوه الـ hard disk drive. بيخزّن على <b>الوشين (surfaces)</b>، وكل الـ surfaces فيها <b>نفس الـ components في نفس المكان</b>.')}</${Def}>
          <${Talk} who="disk" flip=${true}>${X('Each platter: thousands of rings called <b>tracks</b>, each cut into <b>sectors</b>.', 'كل platter فيه آلاف الدواير اسمها <b>tracks</b>، وكل track متقسم لـ <b>sectors</b>.')}</${Talk}>
        `, { sec: t('Disk components', 'مكونات الـ disk') }),

        // 5 · disk parts figure
        page(html`
          <${Fig} name="fp-disk-parts" head=${t("The hard disk's parts, one by one (slide 20)", 'مكونات الـ hard disk واحد ورا التاني (slide 20)')} />
        `),

        // 6 · heads, arm assembly, spindle, arms
        page(html`
          <${H2}>${t('Who moves, who spins, who reads', 'مين بيتحرك، ومين بيلف، ومين بيقرا')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b><bdi dir="ltr">read/write heads</bdi></b>: الجزء الصغير اللي <b>بيتحرك فوق الـ platter</b>، وبيطير فوق السطح بمسافة ممكن توصل لـ <b>3 nanometers</b>. بيروح للـ track اللي فيه الداتا، و<b>كل surface ليه head</b>.',
            'الـ <b>arm assembly</b>: مجموعة components جوّه الـ disk <b>فيها الـ arms</b> اللي شايلة الـ heads. دوره يقرا ويكتب من الـ platters، ولو وقف <b>الـ drive كله بيبوظ</b>.',
            'الـ <b>spindle</b>: بيمسك الـ platters في <b>مكان ثابت</b> بمسافة كفاية للـ arms، و<b>بيلفّها</b> عشان يجيب الـ sector تحت الـ head.',
            'الـ <b>arms</b>: <b>بتشيل الـ heads وتوجهها وتحركها</b>. تحريك الـ arm اسمه <b>seeking</b>، وده غالبًا <b>أبطأ</b> جزء.'
          ] : [
            '<b>Read/write heads</b>: the small part that <b>moves above the platter</b>, flying as little as <b>3 nanometers</b> above it. A head moves to the track with the data; <b>each surface has its own head</b>.',
            '<b>Arm assembly</b>: an internal set of components <b>containing the arms</b>, which carry the heads. It reads and writes the platters; when it stops working, <b>the drive fails</b>.',
            '<b>Spindle</b>: holds the platters in a <b>fixed position</b> with enough space for the arms, and <b>rotates</b> them, bringing the sector under the head.',
            '<b>Arms</b>: <b>carry, guide and move</b> the heads. Moving the arm is called <b>seeking</b>, usually the <b>slowest</b> part.'
          ]} />
          <${Grow} />
          <${Talk} who="mem">${X('Asked for one byte? The OS finds the platter, track and sector, reads the <b>entire sector</b> into me, the <b>buffer</b>, and finds the byte here.', 'عايز byte واحد؟ الـ OS بيلاقي الـ platter والـ track والـ sector، ويقرا <b>الـ sector كله</b> فيّا أنا، الـ <b>buffer</b>، ويلاقي الـ byte عندي.')}</${Talk}>
        `),

        // 7 · watch it: definition traps + one doctor's question
        page(html`
          <${Box} kind="watch" title=${t('Watch it: the exam quotes the definitions', 'خلّي بالك: الامتحان بيقتبس التعريفات')}>
            <p className="hf-p small">${t('This year\'s midterm quoted the definitions word for word. The arms and the arm assembly are the classic swap:', 'ميدترم السنة دي اقتبس التعريفات بالنص. والـ arms والـ arm assembly هما اللخبطة المشهورة:')}</p>
            ${li(A ? [
              'الـ <b>arms</b> هي اللي:<span class="ltr">"carry, guide and move the read/write head"</span>',
              'الـ <b>arm assembly</b> هو:<span class="ltr">"internal set … containing arms"</span>'
            ] : [
              '"<i>carry, guide and move</i> the read/write head": the <b>arms</b>.',
              '"<i>internal set</i> of components <i>containing arms</i>": the <b>arm assembly</b>.'
            ])}</${Box}>
          ${mq('m-arms', /Gide/)}
        `),

        // 8 · match exercise
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Tap a part, then tap its job.', 'دوس على الجزء، وبعدين دوس على الشغلانة بتاعته.')}</${P}>
          <${Match} id="parts" left=${['Platter', 'Read/write head', 'Arm assembly', 'Spindle', 'Arms']}
            right=${A ? ['بيمسك الـ platters في مكان ثابت وبيلفّها', 'الـ disk الدايرية اللي الداتا الـ magnetic بتتخزن عليها', 'بتشيل الـ heads وتوجهها وتحركها', 'الجزء الصغير اللي بيتحرك فوق الـ platter، على بعد <bdi dir="ltr">3 nm</bdi> بس', 'مجموعة components فيها الـ arms، ولو وقفت الـ drive بيبوظ']
              : ['Holds the platters in a fixed position and rotates them', 'The circular disk on which magnetic data is stored', 'Carry, guide and move the heads', 'The small part that moves above the platter, as close as 3 nm', 'An internal set of components containing the arms; if it stops, the drive fails']}
            answer=${[1, 3, 4, 0, 2]} />
          <${Grow} />
          <${Hand} red=${true}>${t('Ours: the arms are the fingers, the arm assembly is the whole hand.', 'من عندنا: الـ arms هي الصوابع، والـ arm assembly هو الإيد كلها.')}</${Hand}>
        `, { sec: t('Exercise: who does what?', 'تمرين: مين بيعمل إيه؟') }),

        // 9 · tracks and sectors
        page(html`
          <${H1}>${t('Rings and slices', 'دواير وشرايح')}</${H1}>
          <${P} small=${true}>${X('Each platter is divided into concentric rings called <b>tracks</b> (thousands of them), and the information is stored in successive tracks. Each track is divided into <b>sectors</b>.',
            'كل platter متقسم لدواير جوّه بعض اسمها <b>tracks</b> (آلاف منها)، والمعلومات بتتخزن في tracks ورا بعض. وكل track متقسم لـ <b>sectors</b>.')}</${P}>
          <${Def}>${X('A <b>sector</b> is the <b>smallest addressable portion</b> of a disk, usually <b>512 bytes</b>.', 'الـ <b>sector</b> هو <b>أصغر جزء ليه address</b> في الـ disk، وغالبًا حجمه <b><bdi dir="ltr">512 bytes</bdi></b>.')}</${Def}>
          <${Box} kind="pencil" title=${t('Slide 10, in your head', 'slide 10 في دماغك')}><p className="hf-p small">${X('A platter has <b>1000 tracks</b>, each with <b>33 sectors</b>. Track capacity?', 'الـ platter فيه <b>1000 track</b>، وكل track فيه <b>33 sector</b>. الـ track capacity كام؟')}</p>
            <${K.Reveal} id="s10"><p className="hf-p small">${X('Track capacity = sectors per track × bytes per sector = 33 × 512 = <b>16,896 bytes</b>. The 1000 tracks do not matter.', 'الـ track capacity بتساوي عدد الـ sectors في الـ track مضروب في الـ bytes في الـ sector:<span class="ltr">33 × 512 = <b>16,896 bytes</b></span>والـ 1000 track مالهمش دعوة.')}</p></${K.Reveal}></${Box}>
          <${Talk} who="dev">${t('So the disk never hands out less than a sector?', 'يعني الـ disk عمره ما بيدّي أقل من sector؟')}</${Talk}>
        `, { sec: t('Tracks, sectors, clusters, cylinders', 'الـ tracks والـ sectors والـ clusters والـ cylinders') }),

        // 10 · clusters and cylinders
        page(html`
          <${H2}>${t('Two more ways to group sectors', 'طريقتين كمان نجمّع بيهم الـ sectors')}</${H2}>
          <${Def}>${X('The <b>OS file manager</b> views a file as a series of <b>clusters</b>. A <b>cluster</b> is a fixed number of <b>contiguous sectors</b>. Slide 11: 3 sectors of 512 bytes = 3 × 512 = <b>1536 bytes</b>.',
            'الـ <b>OS file manager</b> بيشوف الـ file كأنه سلسلة <b>clusters</b>. والـ <b>cluster</b> عدد ثابت من الـ <b>sectors اللي ورا بعض</b>. ومثال slide 11 هو 3 sectors كل واحد <bdi dir="ltr">512 bytes</bdi>:<span class="ltr">3 × 512 = <b>1536 bytes</b></span>')}</${Def}>
          <${Def}>${X('A <b>cylinder</b> is the set of tracks <b>directly above/below each other</b>. All data on one cylinder can be read <b>without moving the arm</b>. Number of cylinders = <b>number of tracks per surface</b>.',
            'الـ <b>cylinder</b> هو مجموعة الـ tracks اللي <b>فوق وتحت بعض بالظبط</b>. وكل الداتا اللي على cylinder واحد تتقري <b>من غير ما الـ arm يتحرك</b>. وعدد الـ cylinders بيساوي <b>عدد الـ tracks في كل surface</b>.')}</${Def}>
          <${Hand} tilt=${true}>${t('So a platter has four components: sector, cluster, track, cylinder (slide 14).', 'يعني الـ platter ليه 4 مكونات: الـ sector والـ cluster والـ track والـ cylinder (slide 14).')}</${Hand}>
          <${Grow} />
          <${Hand} red=${true}>${t('Ours: a cylinder is a stack of the same ring on every surface, like a can with its top and bottom cut off.', 'من عندنا: الـ cylinder هو نفس الحلقة على كل الـ surfaces فوق بعض، زي علبة كانز من غير غطا ولا قاع.')}</${Hand}>
        `),

        // 11 · platter parts figure
        page(html`
          <${Fig} name="fp-platter-parts" head=${t('Slide 12\'s A, B, C, D and the cylinder', 'الـ A والـ B والـ C والـ D بتوع slide 12، والـ cylinder')} />
        `),

        // 12 · dumb questions on geometry
        page(html`
          <${Dumb} qa=${A ? [
            ['يعني إيه "cylinder height"؟', 'عدد الـ tracks في الـ cylinder، يعني <b>عدد الـ surfaces</b> (track على كل surface). وكل platter ليه وشين، فعدد الـ platters هو الـ height على 2.'],
            ['disk فيه 20 surface، يبقى فيه كام head؟', '<b>20</b>. كل surface ليه الـ head بتاعه. ودي إجابة الميدترم.'],
            ['الـ geometrical sector والـ track sector، إيه الفرق؟', 'الـ <b>geometrical sector</b> (حرف B) شريحة زي حتة الكيكة معدية على كل الـ tracks. والـ <b>track sector</b> (حرف C) هو جزء الشريحة اللي على track واحد.'],
            ['ليه الـ cylinder مهم كده؟', 'لأن كل الداتا اللي عليه تتقري <b>من غير ما الـ arm يتحرك</b>، وتحريك الـ arm (الـ seeking) أبطأ جزء.']
          ] : [
            ['What is the "cylinder height"?', 'The number of tracks in a cylinder, which is the <b>number of surfaces</b> (one track per surface). Each platter has two surfaces, so platters = height / 2.'],
            ['A disk has 20 surfaces. How many heads?', '<b>20</b>. Each surface has its own head. That is the midterm\'s answer.'],
            ['Geometrical sector or track sector: what\'s the difference?', 'The <b>geometrical sector</b> (B) is a pie-shaped wedge across all tracks. The <b>track sector</b> (C) is the part of that wedge on one track.'],
            ['Why make such a fuss about cylinders?', 'Because all the data on one can be read <b>without moving the arm</b>, and moving the arm (seeking) is the slowest part.']
          ]} />
        `),

        // 13 · capacity formulas
        page(html`
          <${H1}>${t('How much fits? Multiply up', 'يساع قد إيه؟ اضرب وانت طالع')}</${H1}>
          <${P} small=${true}>${t('Each unit is made of the one below it. All sizes in bytes:', 'كل وحدة متكونة من اللي تحتها. وكل الأحجام بالـ bytes:')}</${P}>
          ${RT(A ? [
            ['الـ Sector', 'غالبًا <bdi dir="ltr">512 B</bdi>'],
            ['الـ Cluster', 'عدد الـ sectors فيه × الـ sector'],
            ['الـ Track', 'عدد الـ sectors فيه × الـ sector'],
            ['الـ Cylinder', 'عدد الـ tracks فيه × الـ track'],
            ['الـ Drive', 'عدد الـ cylinders × الـ cylinder'],
            ['الـ Platters', 'نص الـ cylinder height (اللي هو عدد الـ surfaces)'],
            ['الـ Cylinders', 'عدد الـ tracks في كل surface']
          ] : [
            ['Sector', 'bytes per sector (512 B)'],
            ['Cluster', 'sectors per cluster × bytes per sector'],
            ['Track', 'sectors per track × bytes per sector'],
            ['Cylinder', 'tracks per cylinder × track capacity'],
            ['Drive', 'number of cylinders × cylinder capacity'],
            ['Platters', 'cylinder height / 2 (surfaces = cylinder height)'],
            ['Cylinders', 'tracks per surface']
          ])}
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: <i>"512 B sector, 4 sectors per cluster, 64 sectors per track. Cluster size?"</i> The <b>64</b> is a distractor: 4 × 512 = <b>2048 B</b>. 64 × 512 = 32,768 is a <b>track</b>.',
            'سؤال ميدترم عن حجم الـ cluster، والـ sector بـ <bdi dir="ltr">512 B</bdi> و4 sectors في الـ cluster و64 في الـ track. الـ <b>64</b> للتشتيت، والإجابة <bdi dir="ltr">4 × 512 = <b>2048 B</b></bdi>.')}</p></${Box}>
        `, { sec: t('Capacity', 'الـ Capacity') }),

        // 14 · capacity figure
        page(html`
          <${Fig} name="fp-capacity" head=${t('Capacity calculator: try the slides\' examples', 'حاسبة الـ capacity: جرّب أمثلة السلايدز')} />
        `),

        // 15 · the worked problem
        page(html`
          <${H2}>${t('The worked problem (slides 22–26)', 'المسألة المحلولة (slides 22–26)')}</${H2}>
          <${P} small=${true}>${t('The one the slides solve in full. Read the givens, then try it yourself before the next page shows it:', 'دي اللي السلايدز حلّاها كلها. اقرا المعطيات، وجرّب تحلها بنفسك قبل ما الصفحة الجاية توريهالك:')}</${P}>
          ${RT(A ? [['90,000', 'عدد الـ records، وطولهم ثابت <bdi dir="ltr">256 B</bdi>'], ['512 B', 'حجم الـ sector'], ['60', 'عدد الـ sectors في الـ track'], ['14', 'الـ cylinder height (tracks)'], ['5000', 'عدد الـ tracks في كل surface'], ['4', 'عدد الـ sectors في الـ cluster']]
            : [['90,000', 'fixed-length records of 256 B'], ['512 B', 'per sector'], ['60', 'sectors per track'], ['14', 'cylinder height (tracks)'], ['5000', 'tracks per surface'], ['4', 'sectors per cluster']])}
          <${Box} kind="brain"><p className="hf-p small">${t('Find: platters and sides, track and cylinder size, sectors per cylinder, file size, records per sector, track and cylinder, and the sectors, tracks and cylinders the file needs. Which given is never used?', 'المطلوب: الـ platters والـ sides، وحجم الـ track والـ cylinder، والـ sectors في الـ cylinder، وحجم الـ file، والـ records في الـ sector والـ track والـ cylinder، والـ sectors والـ tracks والـ cylinders اللي الـ file محتاجها. أنهي معطى مش هنستخدمه خالص؟')}</p></${Box}>
          <${Grow} />
          <${Hand} red=${true}>${t('(the 4 sectors per cluster: no answer uses it)', '(الـ 4 sectors في الـ cluster: ولا إجابة بتستخدمه)')}</${Hand}>
        `, { sec: t('The worked problem', 'المسألة المحلولة') }),

        // 16 · worked problem figure
        page(html`
          <${Fig} name="fp-worked-problem" />
        `),

        // 17 · the answers in one table
        page(html`
          <${H2}>${t('The slides\' answers, all in one place', 'إجابات السلايدز في مكان واحد')}</${H2}>
          ${RT(A ? [
            ['7', 'عدد الـ platters، و 14 side'],
            ['30,720 B', 'الـ track (<bdi dir="ltr">60 × 512</bdi>)'],
            ['430,080 B', 'الـ cylinder (<bdi dir="ltr">14 × 30,720</bdi>)'],
            ['840', 'عدد الـ sectors في الـ cylinder'],
            ['5000', 'عدد الـ cylinders'],
            ['23,040,000 B', 'حجم الـ file (<bdi dir="ltr">90,000 × 256</bdi>)'],
            ['2 · 120 · 1680', 'الـ records في الـ sector والـ track والـ cylinder'],
            ['45,000 · 750', 'عدد الـ sectors والـ tracks للـ file'],
            ['53.57', 'عدد الـ cylinders للـ file (‡ 54 كاملين)'],
            ['2,150,400,000 B', 'الـ drive (<bdi dir="ltr">5000 × 430,080</bdi>)']
          ] : [
            ['7', 'platters (14 / 2), 14 sides'],
            ['30,720 B', 'track (60 × 512)'],
            ['430,080 B', 'cylinder (14 × 30,720)'],
            ['840', 'sectors per cylinder'],
            ['5000', 'cylinders (= tracks per surface)'],
            ['23,040,000 B', 'file size (90,000 × 256)'],
            ['2 · 120 · 1680', 'records per sector, track, cylinder'],
            ['45,000 · 750', 'sectors and tracks for the file'],
            ['53.57', 'cylinders for the file (‡ 54 whole ones)'],
            ['2,150,400,000 B', 'drive (5000 × 430,080)']
          ])}
          <${Grow} />
          <${Talk} who="table" flip=${true}>${X('Records per unit = unit size / record size. Units for the file = file size / unit size.', 'عدد الـ records في الوحدة هو حجمها ÷ حجم الـ record، وعدد الوحدات للـ file هو حجمه ÷ حجم الوحدة.')}</${Talk}>
        `),

        // 18 · sectors vs blocks
        page(html`
          <${H1}>${t('Sectors or blocks?', 'sectors ولا blocks؟')}</${H1}>
          <${P} small=${true}>${t('A track can be organized in two ways:', 'الـ track ممكن يتنظم بطريقتين:')}</${P}>
          ${RT(A ? [
            ['بالـ sectors', 'بيستخدمها الـ <b>OS</b>. فيها <b>access بطيء</b> أو <b>fragmentation</b> مع file فيه records. وبعض الـ OSs بتسمح للـ system administrator يستخدم clusters.'],
            ['بالـ blocks', 'بيستخدمها الـ <b>DBMS</b>. الـ tracks بتتقسم لـ <b>blocks (pages)</b> الـ user بيحددها، وكل block فيه <b>عدد صحيح من الـ logical records</b>.']
          ] : [
            ['By sectors', 'Used by the <b>OS</b>. <b>Slow access</b> or <b>fragmentation</b> with a file of records. Some OSs let the system administrator use clusters.'],
            ['By blocks', 'Used by the <b>DBMS</b>. Tracks are divided into user-defined <b>blocks (pages)</b>, each holding an <b>integral number of logical records</b>.']
          ])}
          <${Def}>${X('<b>Fragmentation</b>: loss of space within a sector, because records do not fit exactly in it (e.g. a 512 B sector and 300 B records).<br/><b>Blocking factor</b>: the number of records stored in each block.',
            'الـ <b>Fragmentation</b>: مساحة بتضيع جوّه الـ sector عشان الـ records مش جاية مظبوطة عليه (مثلًا sector بـ <bdi dir="ltr">512 B</bdi> و records بـ <bdi dir="ltr">300 B</bdi>).<br/>الـ <b>Blocking factor</b>: عدد الـ records اللي متخزنة في كل block.')}</${Def}>
        `, { sec: t('Sectors vs blocks', 'الـ sectors والـ blocks') }),

        // 19–20 · fireside chat: sector vs block
        page(html`
          <${Fireside} sub=${t("Tonight: a Sector (the OS's unit) and a Block (the DBMS's unit) argue over who should hold your records.", 'قعدة الليلة: Sector (وحدة الـ OS) وBlock (وحدة الـ DBMS) بيتخانقوا مين يشيل الـ records بتاعتك.')} />
          <${Chat} names=${[t('Sector', 'الـ Sector'), t('Block', 'الـ Block')]} lines=${A ? [
            [0, 'أنا <b>أصغر جزء ليه address</b> في الـ disk، وغالبًا <bdi dir="ltr">512 bytes</bdi>. والـ OS بينظّم الـ tracks بيّا.'],
            [1, 'والـ DBMS بيستخدمني أنا. حجمي <b>الـ user بيحدده</b>، واسمي التاني <b>page</b>.'],
            [0, 'هعترف: لما الـ record بـ <bdi dir="ltr">300 B</bdi> بيضيع مني حتة. ده الـ <b>fragmentation</b>.'],
            [1, 'أنا بشيل <b>عدد صحيح من الـ records</b>. فمفيش internal fragmentation، و<b>مفيش record بيتقسم على 2 blocks</b>.']
          ] : [
            [0, "I'm the <b>smallest addressable portion</b> of a disk, usually 512 bytes. The OS organizes tracks by me."],
            [1, 'The DBMS uses me. My size is <b>user-defined</b>, and you may call me a <b>page</b>.'],
            [0, "I'll admit it: with 300 B records, part of me is wasted. That's <b>fragmentation</b>."],
            [1, 'I hold an <b>integral number of records</b>. No internal fragmentation, and <b>no record spans two blocks</b>.']
          ]} />
        `),
        page(html`
          <${Chat} names=${[t('Sector', 'الـ Sector'), t('Block', 'الـ Block')]} start=${1} lines=${A ? [
            [0, 'بس إنت شايل عفش: <b>sub‑blocks</b> و<b>gaps</b>. عندك <b>non‑data overhead أكتر</b> مني.'],
            [1, 'يستاهل. الـ <b>key sub-block</b> بتاعي بيخلّي الـ controller يدوّر على key <b>من غير ما يحمّلني</b> في الـ memory.'],
            [0, 'وأنا كمان عندي overhead: الـ sector address والـ track address والـ condition، والـ gaps.'],
            [0, 'وبعض الـ OSs بتجمّعني في <b>clusters</b>.']
          ] : [
            [0, 'But you carry baggage: <b>sub-blocks</b> and <b>gaps</b>. You have <b>more non-data overhead</b> than me.'],
            [1, 'Worth it. My <b>key sub-block</b> lets the controller search for a key <b>without loading me</b> into main memory.'],
            [0, 'I have overhead too: sector address, track address and condition at my start, and gaps.'],
            [0, 'And some OSs group me into <b>clusters</b>.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<i>"The DBMS views the file as a series of…"</i> <b>blocks</b>. <b>Clusters</b> are the <b>OS file manager\'s</b> view. Don\'t swap them.',
            'سؤال:<span class="ltr"><i>"The DBMS views the file as a series of…"</i></span>إجابته <b>blocks</b>. أما الـ <b>clusters</b> فدي نظرة الـ <b>OS file manager</b>. متلخبطش بينهم.')}</p></${Box}>
        `),

        // 21 · sub-blocks
        page(html`
          <${H2}>${t('What travels with a block', 'إيه اللي ماشي مع الـ block')}</${H2}>
          <${P} small=${true}>${X('In the block-addressing scheme, each block of data comes with one or more <b>sub-blocks</b> of extra information:', 'في الـ block addressing، كل block داتا بيبقى معاه <b>sub-block</b> واحد أو أكتر فيهم معلومات زيادة:')}</${P}>
          ${RT(A ? [
            ['الـ Count', 'عدد الـ bytes في الـ block.'],
            ['الـ Key', '(اختياري) الـ key بتاع <b>آخر record</b> في الـ data sub-block، عشان الـ disk controller يدوّر على key من غير ما يحمّل الـ block.'],
            ['الـ Data', 'الـ data records نفسها.']
          ] : [
            ['Count', 'the number of bytes in the block.'],
            ['Key', '(optional) the key of the <b>last record</b> in the data sub-block, so the disk controller can search without loading the block.'],
            ['Data', 'the data records.']
          ])}
          <${Hand} arrow="up">${t('then a gap before the next block (slide 29)', 'وبعدهم gap قبل الـ block اللي بعده (slide 29)')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The key sub-block holds the key of the <b>last</b> record, not all the records and not the byte count. The <b>count</b> sub-block holds the byte count.',
            'الـ key sub-block فيه key <b>آخر</b> record، مش كل الـ records ومش عدد الـ bytes. اللي فيه عدد الـ bytes هو الـ <b>count</b> sub-block.')}</p></${Box}>
        `),

        // 22 · sectors-blocks figure
        page(html`
          <${Fig} name="fp-sectors-blocks" head=${t('By sectors, by blocks, and a 4-sector page', 'بالـ sectors، وبالـ blocks، وpage فيها 4 sectors')} />
        `),

        // 23 · non-data overhead
        page(html`
          <${H1}>${t('Space that isn\'t data', 'مساحة مش داتا')}</${H1}>
          <${P} small=${true}>${X('<b>Non-data overhead</b>: space used for things other than data.', 'الـ <b>Non-data overhead</b>: مساحة مستخدمة لحاجات غير الداتا.')}</${P}>
          ${RT(A ? [
            ['بالـ sectors', 'الـ sector address والـ track address والـ condition (بايظ؟) في أول كل sector، والـ gaps.'],
            ['بالـ blocks', 'الـ sub-blocks والـ inter-block gaps، فالـ overhead بيبقى <b>أكتر</b> من الـ sector addressing.']
          ] : [
            ['Sectors', 'sector address, track address and condition (defective?) at the start of each sector, plus gaps between sectors.'],
            ['Blocks', 'sub-blocks and inter-block gaps, so <b>more</b> overhead than sector addressing.']
          ])}
          <${Box} kind="pencil" title=${t('The exercise (slides 32–34)', 'التمرين (slides 32–34)')}><p className="hf-p small">${X('A block-addressable disk: track = <b>20,000 B</b>, overhead = <b>300 B per block</b>, record = <b>100 B</b>. Records per track if the blocking factor is (a) <b>10</b>, (b) <b>60</b>?',
            'الـ track بـ <bdi dir="ltr">20,000 B</bdi>، والـ overhead بـ <bdi dir="ltr">300 B</bdi> لكل block، والـ record بـ <bdi dir="ltr">100 B</bdi>. كام record في الـ track لو الـ BF بـ (a) <b>10</b> أو (b) <b>60</b>؟')}</p></${Box}>
          <${Box} kind="brain"><p className="hf-p small">${t('Bigger blocks: fewer blocks, so fewer 300 B overheads. Should (b) store more records or fewer?', 'لو الـ blocks أكبر، عددها يقل، فالـ overhead يقل. يبقى (b) هيخزّن أكتر ولا أقل؟')}</p></${Box}>
        `, { sec: t('Non-data overhead', 'الـ Non-data overhead') }),

        // 24 · records per track figure
        page(html`
          <${Fig} name="fp-records-track" head=${t('Records per track: (a) and (b), drawn to scale', 'الـ records في الـ track: (a) و(b) مترسومين بالمقاس')} />
        `),

        // 25 · drill A
        page(html`
          <${Box} kind="pencil" title=${t('Be the disk calculator', 'خليك إنت الحاسبة')}><p className="hf-p small">${t('The slides\' own problems, one step at a time. Pick each answer; a wrong pick tells you which mistake it is.', 'مسائل السلايدز نفسها، خطوة خطوة. اختار كل إجابة، ولو غلطت هيقولك غلطتك إيه.')}</p></${Box}>
          <${Drill} id="drA" set=${[0, 1, 2]} />
        `, { sec: t('Be the disk calculator', 'خليك إنت الحاسبة') }),

        // 26 · cost of a disk access
        page(html`
          <${H2}>${t('Three ways to wait: seek + latency + transfer', 'تلات أنواع انتظار، والـ total مجموعهم')}</${H2}>
          <${P} small=${true}>${X('The time to access a sector in a track on a surface is divided into <b>3 components</b>:', 'الوقت اللي بناخده عشان نوصل لـ sector في track على surface بيتقسم لـ <b>3 أجزاء</b>:')}</${P}>
          ${RT(A ? [
            ['الـ Seek time', 'الـ arm يروح للـ <b>cylinder الصح</b>.'],
            ['الـ Latency', 'الـ disk <b>يلف</b> لحد ما الـ sector ييجي تحت الـ head.'],
            ['الـ Transfer time', 'وقت <b>نقل</b> الداتا لما الـ head يبقى فوقها.']
          ] : [
            ['Seek time', 'time to move the read/write arm to the <b>correct cylinder</b>'],
            ['Rotational delay', 'time for the disk to <b>rotate</b> so the desired sector is under the head (latency)'],
            ['Transfer time', 'once the head is over the data, the time to <b>transfer</b> it']
          ])}
          ${mq('m-lat', /desired sector is under/)}
        `, { sec: t('The cost of a disk access', 'تكلفة الـ disk access') }),

        // 27 · access steps figure
        page(html`
          <${Fig} name="fp-access-steps" head=${t('Seek, then rotate, then transfer (slide 35)', 'seek، وبعدين لف، وبعدين transfer (slide 35)')} />
        `),

        // 28 · the formulas
        page(html`
          <${H2}>${t('The numbers behind each wait', 'الأرقام اللي ورا كل انتظار')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>seek</b> هو <b>أكبر</b> تكلفة: عادةً <bdi dir="ltr">5 ms</bdi> للـ track اللي جنبه، و<bdi dir="ltr">50 ms</bdi> أقصى حاجة، و<bdi dir="ltr">30 ms</bdi> في المتوسط.',
            'الـ <b>latency</b>: الـ disk عادةً بيلف حوالي <bdi dir="ltr">5000 rpm</bdi>، يعني لفة كل <bdi dir="ltr">12 ms</bdi>. أقلها صفر وأكبرها لفة، والمتوسط نص لفة، وده عادةً من 6 لـ 8 ms.',
            'الـ <b>transfer</b>: الـ head بيعدي على <b>block</b>. لو الـ track فيه 63 sector، الـ sector الواحد بياخد <bdi dir="ltr">1/63</bdi> من اللفة.'
          ] : [
            '<b>Seek</b> is the <b>largest</b> cost. Typically 5 ms track-to-track, 50 ms maximum (inside to outside track), 30 ms average (random to random).',
            '<b>Latency</b>: disks usually rotate at about 5000 rpm, one revolution per 12 ms. Min 0, max one revolution, average half (typically 6–8 ms).',
            '<b>Transfer</b>: the head passes over a <b>block</b>. With 63 sectors per track, one sector takes 1/63 of a revolution.'
          ]} />
          <${Code} lines=${[['rev (ms) = 60 × 1000 / RPM', ''], ['latency  = ½ × rev', t('average', 'المتوسط')], ['transfer = rev / spt', t('spt = sectors per track', 'الـ spt عدد الـ sectors في الـ track')]]} />
          <${P} small=${true}>${X('For more than one sector: transfer = (bytes transferred / bytes on a track) × revolution time.', 'ولأكتر من sector، الـ transfer بيساوي:<span class="ltr">(bytes transferred / bytes on a track) × revolution time</span>')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: <i>"average latency at 5000 rpm"</i>. Revolution = 60,000 / 5000 = 12 ms, but that is the <b>maximum</b>. The average is ½ × 12 = <b>6 ms</b>.',
            'في سؤال الـ average latency عند <bdi dir="ltr">5000 rpm</bdi>، اللفة <bdi dir="ltr">12 ms</bdi> دي <b>أكبر</b> قيمة، والمتوسط نصها: <bdi dir="ltr"><b>6 ms</b></bdi>.')}</p></${Box}>
        `),

        // 29 · interview: seek time
        page(html`
          <${Interview} title=${t('Seek Time, exposed', 'الـ Seek Time على المكشوف')} sub=${t("This week's interview: the slowest part of every disk access.", 'حوار الأسبوع: أبطأ جزء في أي disk access.')} lines=${A ? [
            ['المذيع', 'بيقولوا عليك أبطأ واحد.'],
            ['الـ Seek', 'تحريك الـ arm اسمه <b>seeking</b>، وأيوه، أنا غالبًا <b>أبطأ جزء</b> و<b>أكبر تكلفة</b>.'],
            ['المذيع', 'بتعمل إيه بالظبط؟'],
            ['الـ Seek', 'بحرّك الـ <bdi dir="ltr">read/write arm</bdi> لحد الـ <b>cylinder الصح</b>.'],
            ['المذيع', 'وبتاخد قد إيه؟'],
            ['الـ Seek', 'حوالي <bdi dir="ltr">5 ms</bdi> للـ track اللي جنبي، و<bdi dir="ltr">30 ms</bdi> في المتوسط، و<bdi dir="ltr">50 ms</bdi> من أجوّا track لأبرّا track.'],
            ['المذيع', 'فيه طريقة نستغنى عنك؟'],
            ['الـ Seek', 'حط الداتا على <b>cylinder واحد</b>: كلها تتقري من غير ما الـ arm يتحرك.']
          ] : [
            ['Head First', 'People say you\'re the slow one.'],
            ['Seek Time', 'Moving the arm is called <b>seeking</b>, and yes, I\'m usually the <b>slowest part</b>, the <b>largest cost</b>.'],
            ['Head First', 'What exactly do you do?'],
            ['Seek Time', 'I move the read/write arm to the <b>correct cylinder</b>.'],
            ['Head First', 'How long does that take?'],
            ['Seek Time', 'About 5 ms to the next track, 30 ms on average, and 50 ms from the inside track to the outside one.'],
            ['Head First', 'Any way to avoid you?'],
            ['Seek Time', 'Keep the data on <b>one cylinder</b>: all of it can be read without moving the arm.']
          ]} />
          <${Grow} />
          <${Talk} who="disk" flip=${true}>${t('My colleague Latency just waits for me to turn. Patiently.', 'زميلي الـ Latency بيستناني ألف وخلاص. بصبر.')}</${Talk}>
        `),

        // 30 · sort exercise
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Which wait? <b>S</b> = seek, <b>R</b> = rotational delay, <b>T</b> = transfer.', 'ده أنهي انتظار؟ دوس <b>S</b> للـ seek time، و<b>R</b> للـ rotational delay، و<b>T</b> للـ transfer time.')}</p></${Box}>
          <${Sort} id="srt" bins=${[['S', 'Seek time'], ['R', 'Rotational delay'], ['T', 'Transfer time']]} items=${A ? [
            ['الـ arm بيروح للـ cylinder الصح', 0],
            ['بنستنى الـ sector ييجي تحت الـ head', 1],
            ['الـ head بيعدي على الـ block', 2],
            ['أكبر تكلفة في التلاتة', 0],
            ['أقله صفر وأكبره لفة كاملة', 1],
            ['وقت اللفة ÷ عدد الـ sectors في الـ track', 2],
            ['عادةً <bdi dir="ltr">30 ms</bdi> في المتوسط', 0],
            ['المتوسط نص لفة', 1],
            ['بيتلغي لو الداتا كلها على cylinder واحد', 0]
          ] : [
            ['The arm moves to the right cylinder', 0],
            ['Waiting for the sector to arrive', 1],
            ['The head passes over the block', 2],
            ['The largest of the three costs', 0],
            ['Min 0, max one revolution', 1],
            ['Revolution time / sectors per track', 2],
            ['Typically 30 ms on average', 0],
            ['Its average is half a revolution', 1],
            ['Avoided if the data is on one cylinder', 0]
          ]} />
        `, { sec: t('Exercise: which wait?', 'تمرين: أنهي انتظار؟') }),

        // 31 · examples 1 and 2
        page(html`
          <${H2}>${t('Examples 1 and 2: one sector, start to finish', 'مثال 1 ومثال 2: قراية sector واحد')}</${H2}>
          <${P} small=${true}>${X('<b>Ex 1</b>: average seek 8 ms, average rotational delay 3 ms, maximum 6 ms, 10,000 rpm, 170 sectors/track, 512 B sectors.', '<b>مثال 1</b>: الـ average seek بـ <bdi dir="ltr">8 ms</bdi>، والـ average rotational delay بـ <bdi dir="ltr">3 ms</bdi>، والـ maximum بـ <bdi dir="ltr">6 ms</bdi>، والسرعة <bdi dir="ltr">10,000 rpm</bdi>، و170 sector في الـ track.')}</${P}>
          <${Code} lines=${['transfer = (60 / 10,000 s) / 170', '         = 6/170 ms ≈ 0.035 ms', 'total = 8 + 3 + 0.035 = 11.035 ms']} />
          <${P} small=${true}>${X('<b>Ex 2</b> (Seagate ST3200822A): 200 GB, 7200 rpm, average seek 8.5 ms, average latency 4.16 ms, 170 sectors/track, 512 B sectors, 2 discs / 4 heads.', '<b>مثال 2</b> (الـ Seagate ST3200822A): الـ capacity بـ <bdi dir="ltr">200 GB</bdi>، والسرعة <bdi dir="ltr">7200 rpm</bdi>، والـ average seek بـ <bdi dir="ltr">8.5 ms</bdi>، والـ average latency بـ <bdi dir="ltr">4.16 ms</bdi>، و170 sector في الـ track، و2 discs و4 heads.')}</${P}>
          <${Code} lines=${['transfer = (60 / 7200 s) / 170', '         = 6/122,400 ≈ 0.05 ms', 'total = 8.5 + 4.16 + 0.05 = 12.71 ms']} />
          <${Box} kind="watch"><p className="hf-p small">${X('When the question <b>gives</b> the average delay, use it. Don\'t add the maximum (6 ms) or a whole revolution.', 'لو السؤال <b>إداك</b> الـ average delay، استخدمه. متحطش الـ maximum ولا لفة كاملة.')}</p></${Box}>
        `, { sec: t('Examples 1 and 2', 'مثال 1 ومثال 2') }),

        // 32 · access time figure
        page(html`
          <${Fig} name="fp-access-time" head=${t('Change the disk and watch the total', 'غيّر الـ disk واتفرج على الـ total')} />
        `),

        // 33 · drill B
        page(html`
          <${Box} kind="pencil" title=${t('Be the disk calculator, part 2', 'خليك إنت الحاسبة، الجزء التاني')}><p className="hf-p small">${t('Now the clock: Example 1 and Quiz (2), parts (a) and (b).', 'دلوقتي الوقت: مثال 1 والـ Quiz (2)، الجزء (a) و(b).')}</p></${Box}>
          <${Drill} id="drB" set=${[3, 4]} />
        `),

        // 34 · quiz (2) part (c)
        page(html`
          <${H2}>${t('Quiz (2), part (c): read the whole disk ‡', 'الـ Quiz (2)، الجزء (c): اقرا الـ disk كله ‡')}</${H2}>
          <${P} small=${true}>${X('Same disk (20 surfaces, 800 tracks/surface, 3600 rpm; seek 7 ms track-to-track, 28 ms average, 50 ms max). Read it all, <b>one cylinder at a time</b>: 800 cylinders × 20 tracks. The slide gives no answer, so the notes assume:',
            'نفس الـ disk (فيه 20 surface و800 track في كل surface، والسرعة <bdi dir="ltr">3600 rpm</bdi>، والـ seek بـ <bdi dir="ltr">7 ms</bdi> للـ track اللي جنبه و<bdi dir="ltr">28 ms</bdi> في المتوسط). هنقراه كله <b>cylinder ورا التاني</b>، يعني 800 cylinder في 20 track. والسلايد مفيهاش إجابة، فالنوتس بتفترض:')}</${P}>
          ${li(A ? ['كل track بياخد average latency + لفة كاملة:<span class="ltr">8.33 + 16.67 = 25 ms</span>', 'فالـ cylinder بياخد:<span class="ltr">20 × 25 = 500 ms</span>', 'وفيه average seek واحد (<bdi dir="ltr">28 ms</bdi>) لأول cylinder، وبعده 799 seek بـ <bdi dir="ltr">7 ms</bdi>.']
            : ['each track costs average latency + one full revolution = 8.33 + 16.67 = 25 ms, so one cylinder = 20 × 25 = 500 ms;', 'one average seek (28 ms) to reach the first cylinder, then 799 track-to-track seeks (7 ms).'])}
          <${Code} lines=${['28 + 799×7 + 800×500', '= 28 + 5,593 + 400,000', '= 405,621 ms ≈ 405.6 s']} />
          <${Hand} red=${true}>${t('In the exam, write your assumptions down: the slide gives no answer.', 'في الامتحان اكتب افتراضاتك: السلايد مفيهاش إجابة.')}</${Hand}>
        `),

        // 35 · disk as a bottleneck
        page(html`
          <${H1}>${t('Everyone waits for the disk', 'الكل مستني الـ disk')}</${H1}>
          <${Talk} who="cpu">${X('Processes are often <b>disk-bound</b>: the network and I wait a long time for the disk.', 'الـ processes كتير بتبقى <b>disk-bound</b>: أنا والـ network بنستنى الـ disk وقت طويل.')}</${Talk}>
          ${RT(A ? [
            ['1', 'الـ <b>Multiprocessing</b>: الـ CPU يشتغل على jobs تانية وهو مستني.'],
            ['2', 'الـ <b>Disk striping</b>: blocks مختلفة من الـ file على drives مختلفة (parallelism).'],
            ['3', 'الـ <b>RAID</b>: اختصار Redundant Array of Independent Disks.'],
            ['4', 'الـ <b>RAM disk</b>: جزء من الـ main memory بيعمل نفسه disk (سرعة مقابل إنه volatile).'],
            ['5', 'الـ <b>Disk cache</b>: memory شايلة pages من الـ disk. بنشيك عليها الأول، ولو miss نروح للـ disk.']
          ] : [
            ['1', '<b>Multiprocessing</b>: the CPU works on other jobs while waiting.'],
            ['2', '<b>Disk striping</b>: different blocks of the file on different drives (parallelism).'],
            ['3', '<b>RAID</b>: Redundant Array of Independent Disks.'],
            ['4', '<b>RAM disk</b>: part of main memory simulates a disk (speed vs volatility).'],
            ['5', '<b>Disk cache</b>: memory holds pages from the disk; checked first, a miss goes to the disk.']
          ])}
          <${Talk} who="mem" flip=${true}>${t('Two of the five are me pretending to be a disk, or holding its pages.', 'اتنين من الخمسة دول أنا: يا بعمل نفسي disk، يا بشيل الـ pages بتاعته.')}</${Talk}>
        `, { sec: t('Disk as a bottleneck', 'الـ disk كـ bottleneck') }),

        // 36 · the odd midterm key
        page(html`
          ${mq('m-bn', /tansmit data/)}
          <${Box} kind="watch"><p className="hf-p small">${X('The options were <b>(A)</b> disk striping and distributed processing, <b>(B)</b> RAID, <b>(C)</b> both, <b>(D)</b> disk cache. Disk cache is a real technique too, but the key is <b>"Both A and B"</b>: it covers the most of the slide\'s list.',
            'الاختيارات كانت <b>(A)</b> الـ disk striping والـ distributed processing، و<b>(B)</b> الـ RAID، و<b>(C)</b> الاتنين، و<b>(D)</b> الـ disk cache. الـ disk cache حل حقيقي برضه، بس الإجابة <b>"Both A and B"</b> لأنها بتغطي أكتر حاجات من لستة السلايد.')}</p></${Box}>
        `),

        // 37–39 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' midterms. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من ميدترمات الدكاترة. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /4 sectors per cluster, 64 sectors per track/)}
          <${Grow} />
          <${Talk} who="disk" flip=${true}>${t('Hint: one of those numbers is just there to tempt you.', 'تلميح: رقم من دول موجود عشان يغريك بس.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /spinning at 5000 rpm/)}
          <${Gap} h=${4} />
          ${mq('m3', /20 surfaces will have/)}
        `),
        page(html`
          ${mq('m4', /accessed without:/)}
          <${Gap} h=${4} />
          ${mq('m5', /DBMS views the file/)}
        `),
        page(html`
          ${mq('m6', /surface is divided into/)}
          <${Grow} />
          <${Talk} who="disk" flip=${true}>${t('Seek, rotate, transfer. Three, every single time.', 'كل مرة نفس التلاتة: الـ seek واللف والـ transfer.')}</${Talk}>
        `),

        // 41 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>DASD</b> هي الـ magnetic disks والـ optical disks، والـ <b>SASD</b> هي الـ magnetic tape.',
            'الـ <b>platters</b> بتخزّن، والـ <b>heads</b> بتقرا (head لكل surface)، والـ <b>arms</b> بتشيل الـ heads وتحركها، والـ <b>arm assembly</b> فيه الـ arms، والـ <b>spindle</b> بيلف.',
            'الـ <b>sector</b> أصغر وحدة ليها address <bdi dir="ltr">(512 B)</bdi>. والـ <b>cluster</b> هو sectors ورا بعض (نظرة الـ OS)، والـ <b>cylinder</b> هو نفس الـ track على كل الـ surfaces.',
            'الـ capacity:<span class="ltr">track = spt × 512; cylinder = height × track; drive = cylinders × cylinder</span>',
            'الـ <b>OS</b> بينظّم بالـ sectors (فيها fragmentation)، والـ <b>DBMS</b> بالـ blocks (blocking factor وsub-blocks، و overhead أكتر).',
            'الـ records في الـ track:<span class="ltr">⌊track / (data + overhead)⌋ × BF</span>',
            'الـ access time:<span class="ltr"><b>seek</b> + ½ rev + rev / spt</span>'
          ] : [
            '<b>DASD</b>: magnetic and optical disks. <b>SASD</b>: magnetic tape.',
            '<b>Platters</b> store, <b>heads</b> read (one per surface), <b>arms</b> carry and move the heads, the <b>arm assembly</b> contains the arms, the <b>spindle</b> rotates.',
            '<b>Sector</b> = smallest addressable unit (512 B); <b>cluster</b> = contiguous sectors (OS view); <b>cylinder</b> = the same track on every surface.',
            'Track = spt × 512; cylinder = height × track; drive = cylinders × cylinder; platters = height / 2.',
            '<b>OS</b> → sectors (fragmentation); <b>DBMS</b> → blocks (blocking factor, sub-blocks, more overhead).',
            'Records per track = ⌊track / (data + overhead)⌋ × BF: only whole blocks fit.',
            'Access = <b>seek</b> + <b>latency</b> (½ revolution) + <b>transfer</b> (revolution / spt); revolution = 60,000 / RPM ms.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 42 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 2!', 'خلّصت الفصل التاني!')}</${H1}>
            <${Talk} who="table">${t('Next time: what goes inside those sectors. Fields and records!', 'المرة الجاية: إيه اللي جوّه الـ sectors دي. الـ fields والـ records!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [2], t: Date.now() } }}>${t('Quiz me on Lecture 2', 'امتحنّي في محاضرة 2')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 2, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 2, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

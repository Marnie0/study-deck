// Head First chapter for Operating Systems Lecture 8 (built on hf.js), English + Egyptian Arabic, same pages in both.
// I/O systems: hardware, registers and port addresses, polling, interrupts and the event-vector table, DMA, the application
// I/O interface, block and character devices, and performance. The course's last lecture. Every fact comes from the lecture's
// notes; analogies and jokes are marked as ours. The lecture has no doctor's questions, so the exam corner uses the site's own
// practice questions and says so.
// lectures: [8]
(function () {
  const H = window.HF; H.chapters.os = H.chapters.os || {};
  const { html } = H.K;
  const { useState, useEffect } = React;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-os8')) {
    const s = document.createElement('style'); s.id = 'hf-css-os8';
    s.textContent = `
.hfb .hf-os8-ord{ display:grid; gap:5px; }
.hfb .hf-os8-ord .hf-os8-it{ display:flex; align-items:center; gap:8px; width:100%; text-align:start; font:500 13.5px/1.25 var(--body); padding:3px 8px; min-height:33px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-os8-ord .hf-os8-it.hf-os8-ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 10%, var(--paper)); }
.hfb .hf-os8-ord .hf-os8-it.hf-os8-no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 8%, var(--paper)); }
.hfb .hf-os8-nb{ flex:none; display:inline-grid; place-items:center; width:24px; height:24px; border-radius:50%; font:800 13px/1 var(--body); background:var(--hf-grey2); color:var(--graphite); }
.hfb .hf-os8-nb.hf-os8-on{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-os8-steps{ display:grid; gap:5px; }
.hfb .hf-os8-steps > div{ display:flex; align-items:flex-start; gap:8px; font:500 14px/1.32 var(--body); color:var(--ink); }
.hfb .hf-os8-steps > div > .hf-os8-nb{ background:var(--hf-line); color:var(--paper); margin-top:1px; }
.hfb .hf-os8-steps > div.hf-os8-ctl > .hf-os8-nb{ background:var(--hf-k); }
.hfb .hf-os8-regs{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-os8-regs > div{ border:1.5px solid var(--hf-line); border-radius:7px; padding:5px 8px; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-os8-regs b{ display:block; font:800 14.5px/1.2 var(--mono); color:var(--hf-k); }
.hfb .hf-os8-regs span{ display:block; font:500 13px/1.28 var(--body); color:var(--graphite); }
.hfb .hf-os8-cats{ display:flex; gap:6px; flex-wrap:wrap; }
.hfb .hf-os8-cats span{ font:700 14px/1 var(--body); padding:7px 11px; border-radius:16px; border:1.5px solid var(--hf-line); background:var(--hf-grey); color:var(--ink); animation:hf-up .45s both; }
.hfb .hf-os8-dims{ display:grid; gap:6px; }
.hfb .hf-os8-dims > div{ display:flex; align-items:center; flex-wrap:wrap; gap:5px; padding:4px 0; border-bottom:1px dotted var(--faint); animation:hf-up .45s both; }
.hfb .hf-os8-dims .hf-os8-n{ font:800 13px/1 var(--body); color:var(--graphite); min-width:16px; }
.hfb .hf-os8-dims code{ font:700 13.5px/1.2 var(--mono); padding:4px 7px; border-radius:5px; background:var(--hf-grey); color:var(--ink); border:1px solid var(--hf-grey2); }
.hfb .hf-os8-dims i{ font:italic 13.5px/1 var(--body); color:var(--graphite); }
.hfb .hf-os8-bc{ border:1.5px solid var(--hf-line); border-radius:8px; padding:7px 10px; background:var(--paper); }
.hfb .hf-os8-bc h4{ margin:0 0 3px; font:800 15.5px/1.2 var(--body); color:var(--hf-k); }
.hfb .hf-os8-bc .hf-li{ font-size:14px; margin-bottom:2px; }
.hfb .hf-os8-cb{ display:grid; gap:7px; border:1.5px solid var(--hf-line); border-radius:9px; padding:9px; background:var(--hf-grey); }
.hfb .hf-os8-top{ display:grid; grid-template-columns:72px 1fr 112px; gap:6px; align-items:center; }
.hfb .hf-os8-bx{ border:1.5px solid var(--hf-line); border-radius:7px; padding:6px 4px; text-align:center; font:800 13.5px/1.15 var(--body); background:var(--paper); color:var(--ink); transition:background .4s, color .4s; }
.hfb .hf-os8-bx.hf-os8-hot{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-os8-bus{ position:relative; text-align:center; font:700 13px/1.2 var(--body); color:var(--graphite); padding:13px 0 0; }
.hfb .hf-os8-bus::before{ content:""; position:absolute; top:4px; left:0; right:0; height:5px; border-radius:3px; background:var(--graphite); transition:background .4s; }
.hfb .hf-os8-bus.hf-os8-dma::before{ background:var(--hf-k); }
.hfb .hf-os8-mem{ border:1.5px dashed var(--hf-line); border-radius:7px; padding:6px 8px; background:var(--paper); }
.hfb .hf-os8-mem > p{ margin:0 0 4px; font:800 13px/1.1 var(--body); color:var(--graphite); }
.hfb .hf-os8-fld{ display:flex; justify-content:space-between; gap:6px; font:600 13.5px/1.3 var(--mono); padding:3px 6px; border-radius:4px; margin-top:3px; background:var(--hf-grey); color:var(--ink); opacity:.18; transition:opacity .4s, background .4s; }
.hfb .hf-os8-fld.hf-os8-in{ opacity:1; }
.hfb .hf-os8-fld.hf-os8-now{ background:color-mix(in srgb, var(--hf-k) 24%, var(--paper)); }
.hfb .hf-os8-pill{ text-align:center; font:700 13.5px/1.25 var(--body); padding:5px 8px; border-radius:16px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); opacity:.18; transition:opacity .4s, background .4s, color .4s; }
.hfb .hf-os8-pill.hf-os8-in{ opacity:1; }
.hfb .hf-os8-pill.hf-os8-now{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-os8-pill.hf-os8-red.hf-os8-now{ background:var(--hf-red); border-color:var(--hf-red); }
.hfb .hf-os8-cap{ font:500 14px/1.35 var(--body); color:var(--ink); margin:0; min-height:57px; }
.hfb .hf-os8-bar{ display:flex; gap:7px; align-items:center; }
.hfb .hf-os8-bar .grow{ flex:1; }
.hfb.hf-ar .hf-os8-ord .hf-os8-it, .hfb.hf-ar .hf-os8-steps > div, .hfb.hf-ar .hf-os8-regs span, .hfb.hf-ar .hf-os8-cap, .hfb.hf-ar .hf-os8-bc h4, .hfb.hf-ar .hf-os8-dims i{ font-family:"IBM Plex Sans Arabic", var(--body); font-style:normal; }
.hfb.hf-ar .hf-os8-ord .hf-os8-it, .hfb.hf-ar .hf-os8-steps > div{ font-size:13.5px; line-height:1.4; }
.hfb.hf-ar .hf-os8-cap{ line-height:1.5; min-height:62px; }
.hfb.hf-ar .hf-os8-regs span{ line-height:1.4; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-os8-cats span, .hfb .hf-os8-dims > div{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  // a numbered list of steps (badges are drawn, not list markers, so the Arabic book shows them on the right side)
  function Steps({ items, ctl }) {
    return html`<div className="hf-os8-steps hf-in">${items.map((x, i) => html`<div key=${i} className=${ctl && ctl[i] ? 'hf-os8-ctl' : ''}><span className="hf-os8-nb">${i + 1}</span><span>${H.K.T(x)}</span></div>`)}</div>`;
  }

  // Put them in order: tap the steps in the order they happen, then check
  function Order({ id, items, shuffle }) {
    const ar = useAr();
    const [seq, setSeq] = H.K.useSlot(id, []);
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const n = items.length;
    const tap = k => { setCk(false); setSeq(seq.includes(k) ? seq.filter(x => x !== k) : seq.concat(k)); };
    const right = seq.filter((k, p) => k === p).length;
    return html`<div className="hf-in">
      <div className="hf-os8-ord" role="group" aria-label=${ar ? 'رتّب الخطوات' : 'Put the steps in order'}>
        ${shuffle.map(k => { const p = seq.indexOf(k), st = ck && p >= 0 ? (p === k ? ' hf-os8-ok' : ' hf-os8-no') : '';
          return html`<button key=${k} className=${'hf-os8-it' + st} aria-pressed=${String(p >= 0)} onClick=${() => tap(k)}><span className=${'hf-os8-nb' + (p >= 0 ? ' hf-os8-on' : '')}>${p >= 0 ? p + 1 : '?'}</span><span>${H.K.T(items[k])}</span></button>`; })}
      </div>
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn solid" disabled=${seq.length < n} onClick=${() => setCk(true)}>${ar ? 'صحّح الترتيب' : 'Check my order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq(items.map((_, k) => k)); setCk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${seq.length > 0 && html`<button className="hf-btn" onClick=${() => { setSeq([]); setCk(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${n}</bdi> صح${right === n ? '!' : ''}` : right + ' / ' + n + ' right' + (right === n ? '!' : '')}</span>`}
      </div></div>`;
  }

  // the DMA command block, one step at a time: the OS fills the block, hands its location over, the DMA controller takes the bus, one interrupt
  const CB_CAP = [
    ['A big transfer is coming. The OS will not move it byte by byte. Press play.', 'فيه نقل داتا كبير جاي، والـ OS مش هينقله byte byte. دوس شغّل.'],
    ['(1) The OS writes the <b>source and destination addresses</b> into the command block in memory.', 'أولًا: الـ OS بيكتب الـ <b>source والـ destination addresses</b> في الـ command block في الـ memory.'],
    ['(2) It writes the <b>mode</b>: read or write.', 'تانيًا: بيكتب الـ <b>mode</b>، read ولا write.'],
    ['(3) It writes the <b>count of bytes</b>.', 'تالتًا: بيكتب <b>عدد الـ bytes</b>.'],
    ['(4) It writes the <b>location of the command block</b> to the DMA controller.', 'رابعًا: بيكتب <b>مكان الـ command block</b> للـ DMA controller.'],
    ['(5) <b>Bus mastering</b>: the DMA controller grabs the bus from the CPU. That is <b>cycle stealing</b>, but still much more efficient.', 'خامسًا: الـ <b>bus mastering</b>، الـ DMA controller بياخد الـ bus من الـ CPU. ده اسمه <b>cycle stealing</b>، بس برضه أكفأ بكتير.'],
    ['(6) When it is done, it <b>interrupts</b> the CPU to signal completion. One interrupt for the whole block.', 'سادسًا: لما يخلّص، بيعمل <b>interrupt</b> للـ CPU عشان يقوله إنه خلص. يعني interrupt واحد للـ block كله.']
  ];
  function CmdBlock() {
    const ar = useAr();
    const [i, setI] = H.K.useSlot('cb', 0);
    const [play, setPlay] = useState(false);
    const last = CB_CAP.length - 1;
    useEffect(() => { if (!play) return; if (i >= last) { setPlay(false); return; } const t = setTimeout(() => setI(i + 1), calm() ? 900 : 2300); return () => clearTimeout(t); }, [play, i]);
    const f = k => 'hf-os8-fld' + (i >= k ? ' hf-os8-in' : '') + (i === k ? ' hf-os8-now' : '');
    const pl = (k, red) => 'hf-os8-pill' + (red ? ' hf-os8-red' : '') + (i >= k ? ' hf-os8-in' : '') + (i === k ? ' hf-os8-now' : '');
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-os8-cb" dir="ltr" aria-label="The DMA command block and the bus">
        <div className="hf-os8-top">
          <div className=${'hf-os8-bx' + (i < 5 ? ' hf-os8-hot' : '')}>CPU</div>
          <div className=${'hf-os8-bus' + (i >= 5 ? ' hf-os8-dma' : '')}>bus: ${i >= 5 ? 'DMA controller' : 'CPU'}</div>
          <div className=${'hf-os8-bx' + (i >= 5 ? ' hf-os8-hot' : '')}>DMA controller</div>
        </div>
        <div className="hf-os8-mem"><p>memory · DMA command block</p>
          <div className=${f(1)}><span>source → destination</span><span>disk → X</span></div>
          <div className=${f(2)}><span>mode</span><span>read / write</span></div>
          <div className=${f(3)}><span>count of bytes</span><span>C</span></div>
        </div>
        <div className=${pl(4)}>location of the block → DMA controller</div>
        <div className=${pl(6, true)}>interrupt → CPU: transfer complete</div>
      </div>
      <p className="hf-os8-cap" key=${i}>${H.K.T(ar ? CB_CAP[i][1] : CB_CAP[i][0])}</p>
      <div className="hf-os8-bar">
        <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.max(0, i - 1)); }} disabled=${i === 0} aria-label=${ar ? 'الخطوة اللي فاتت' : 'Back one step'}>${ar ? '›' : '‹'}</button>
        <button className="hf-btn solid" onClick=${() => { if (i >= last) { setI(0); setPlay(true); } else setPlay(!play); }}>${play ? (ar ? 'وقّف' : 'Pause') : i >= last ? (ar ? 'شغّلها تاني' : 'Run it again') : (ar ? 'شغّل' : 'Play')}</button>
        <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.min(last, i + 1)); }} disabled=${i === last} aria-label=${ar ? 'الخطوة الجاية' : 'Next step'}>${ar ? '‹' : '›'}</button>
        <span className="grow"></span>
        <span className="hf-dots">${CB_CAP.map((_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</span>
      </div>
    </div>`;
  }

  H.chapters.os[8] = {
    title: 'I/O Systems (Principles of I/O)',
    kicker: 'Chapter 8',
    run: 'I/O systems',
    ar: { title: 'الـ I/O Systems (مبادئ الـ I/O)', kicker: 'الفصل 8', run: 'الـ I/O systems' },
    pages(K, kit) {
      const { H1, H2, H3, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Reveal, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const io = 'I/O';
      // this lecture has no questions from the doctor's papers, so the exam corner uses the site's own practice questions
      // (quiz items and the extra applied ones), with the site's Egyptian Arabic explanation of every choice
      const lec = kit.course.lectures.find(l => l.n === 8);
      const arL = (window.AR && window.AR.os && window.AR.os.lectures && window.AR.os.lectures[8]) || {};
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      const q = re => {
        let i = lec.quiz.findIndex(x => re.test(strip(x.q)) && !x.src);
        if (i >= 0) return { q: lec.quiz[i], why: (arL.quiz || [])[i] };
        i = (lec.extra || []).findIndex(x => re.test(strip(x.q)) && !x.src);
        return i < 0 ? {} : { q: lec.extra[i], why: (arL.extra || [])[i] };
      };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const POLL = A ? [
        'الـ host بيقرا الـ <b>busy bit</b> من الـ status register لحد ما يبقى 0.',
        'الـ host بيظبط الـ read أو الـ write bit، ولو write بينسخ الداتا في الـ <b>data-out</b>.',
        'الـ host بيظبط الـ <b>command-ready</b>.',
        'الـ controller بيظبط الـ busy وينفّذ النقل.',
        'الـ controller بيمسح الـ busy والـ error والـ command-ready لما النقل يخلص.'
      ] : [
        'The host reads the <b>busy bit</b> from the status register until it is 0.',
        'The host sets the read or write bit; for a write it copies the data into <b>data-out</b>.',
        'The host sets <b>command-ready</b>.',
        'The controller sets busy and executes the transfer.',
        'The controller clears busy, error and command-ready when the transfer is done.'
      ];
      const DMA6 = A ? [
        'الـ device driver بيتقاله ينقل داتا الـ disk لـ buffer عند address X.',
        'الـ driver بيقول للـ disk controller ينقل C bytes من الـ disk للـ buffer عند X.',
        'الـ disk controller بيبدأ الـ DMA transfer.',
        'الـ disk controller بيبعت كل byte للـ DMA controller.',
        'الـ DMA controller بينقل الـ bytes لـ buffer X: الـ address بيزيد والـ C بتقل لحد ما توصل 0.',
        'لما C توصل 0، الـ DMA controller بيعمل interrupt للـ CPU.'
      ] : [
        'The device driver is told to transfer disk data to a buffer at address X.',
        'The driver tells the disk controller to transfer C bytes from disk to the buffer at X.',
        'The disk controller initiates the DMA transfer.',
        'The disk controller sends each byte to the DMA controller.',
        'The DMA controller moves the bytes to buffer X: the address goes up and C goes down until C = 0.',
        'When C = 0, the DMA controller interrupts the CPU.'
      ];
      return [
        // 0 · how this chapter works (faces the opener)
        page(html`
          <${H2}>${t('Last stop: the devices themselves', 'آخر محطة: الأجهزة نفسها')}</${H2}>
          <${P} small=${true}>${X("Last chapter your files lived on a disk. But how does a byte actually travel between that disk and memory? Who tells the CPU a key was pressed? This is the course's <b>last lecture</b>: how the OS talks to its devices.",
            `في الفصل اللي فات الـ files بتاعتك كانت عايشة على disk. بس الـ byte بيتنقل إزاي بجد بين الـ disk والـ memory؟ ومين بيقول للـ CPU إن حد داس على زرار؟ دي <b>آخر محاضرة</b> في الكورس: الـ OS بيكلّم الأجهزة بتاعته إزاي.`)}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Four exercises</b> on the page: match the hardware, order the polling handshake, order the six DMA steps, and sort block from character devices.', '<b>أربع تمارين</b> على الصفحة: وصّل الـ hardware بشغلته، رتّب خطوات الـ polling، رتّب الـ six DMA steps، وافصل الـ block عن الـ character devices.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are traps the practice questions love.', '<b>خلّي بالك!</b> دي فخاخ بتحبها أسئلة التدريب.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies, not the slides.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('You press a key while the CPU is busy running your program. How could the CPU possibly find out? Think of two different ways before you turn the page.',
            'إنت دُست على زرار في الـ keyboard والـ CPU مشغول بيشغّل البرنامج بتاعك. الـ CPU ممكن يعرف إزاي؟ فكّر في طريقتين مختلفين قبل ما تقلب الصفحة.')}</p></${Box}>
        `, { sec: t('How this chapter works', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">8</span><span className="t">${A ? html`الفصل التامن<br/>Operating Systems` : html`Chapter eight<br/>Operating Systems`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Are You Done Yet?', 'خلّصت ولا لسه؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('I/O systems: the principles of I/O', 'الـ I/O systems: مبادئ الـ I/O')}</p></div>
          <${Talk} who="cpu">${t('Disk, are you done yet? …Now? …How about now?', 'يا disk، خلّصت؟ …طب دلوقتي؟ …طب دلوقتي؟')}</${Talk}>
          <${Talk} who="disk" flip=${true}>${t("Stop asking! Go do something useful and I'll tell you when I'm done.", 'بطّل تسأل! روح اعمل حاجة مفيدة وأنا هقولك لما أخلّص.')}</${Talk}>
          <${P} small=${true}>${X('That little argument is this whole chapter: <b>polling</b> (keep asking), <b>interrupts</b> (I\'ll tell you), and <b>DMA</b> (let someone else carry the data). Plus the buses, registers and drivers underneath, and what all of it costs.',
            `الخناقة الصغيرة دي هي الفصل كله: الـ <b>polling</b> (فضل اسأل)، والـ <b>interrupts</b> (أنا هقولك)، والـ <b>DMA</b> (خلّي حد تاني يشيل الداتا). ومعاهم الـ buses والـ registers والـ drivers اللي تحت، والتمن اللي بندفعه في ده كله.`)}</${P}>
        `, { sec: t('Meet I/O', 'اتعرّف على الـ I/O') }),

        // 2 · why I/O is hard
        page(html`
          <${H1}>${t('Why the OS sweats over I/O', 'ليه الـ OS بيتعب مع الـ I/O')}</${H1}>
          <${P} small=${true}>${X('I/O management is a <b>major component</b> of OS design and operation: devices <b>vary greatly</b>, there are <b>various methods</b> to control them, <b>performance</b> must be managed, and <b>new types of devices</b> appear frequently.',
            `إدارة الـ ${io} <b>جزء أساسي</b> من تصميم وتشغيل الـ OS: الأجهزة <b>مختلفة جدًا</b> عن بعض، وفيه <b>طرق كتير</b> للتحكم فيها، والـ <b>performance</b> لازم يتدار، وأنواع <b>أجهزة جديدة</b> بتظهر كتير.`)}</${P}>
          <${Def}>${X('<b>Device drivers</b> encapsulate device details and present a <b>uniform device-access interface</b> to the I/O subsystem.',
            `الـ <b>device drivers</b> بتخبّي تفاصيل الجهاز وبتدّي <b>interface موحّد</b> للـ ${io} subsystem عشان يوصل للأجهزة.`)}</${Def}>
          <${H3}>${t('Three device categories', 'تلات أنواع أجهزة')}</${H3}>
          <div className="hf-os8-cats hf-in" dir="ltr">${['storage', 'transmission', 'human-interface'].map((c, j) => html`<span key=${c} style=${{ animationDelay: calm() ? '0s' : (0.2 + j * 0.15) + 's' }}>${c}</span>`)}</div>
          <${Grow} />
          <${Hand}>${t("Ours: a disk stores, a network card transmits, a keyboard has a human on it.", 'من عندنا: الـ disk بيخزّن، كارت الشبكة بيبعت، والـ keyboard عليه بني آدم.')}</${Hand}>
        `),

        // 3 · ports, buses, controllers
        page(html`
          <${H1}>${t('Ports, buses and controllers', 'الـ ports والـ buses والـ controllers')}</${H1}>
          <${Def}>${X('<b>Port</b>: a connection point for a device.', 'الـ <b>port</b> هو نقطة توصيل للجهاز.')}</${Def}>
          <${Def}>${X('<b>Bus</b>: shared direct access. <b>PCI</b> is common in PCs and servers (and PCI Express, PCIe); an <b>expansion bus</b> connects relatively slow devices such as the keyboard and the serial and parallel ports.',
            'الـ <b>bus</b> هو shared direct access. الـ <b>PCI</b> منتشر في الـ PCs والـ servers (ومعاه الـ PCI Express أو PCIe)، والـ <b>expansion bus</b> بيوصّل الأجهزة البطيئة نسبيًا زي الـ keyboard والـ serial والـ parallel ports.')}</${Def}>
          <${Def}>${X('<b>Controller (host adapter)</b>: the electronics that operate the port, bus or device. Sometimes integrated, sometimes a separate circuit board.',
            'الـ <b>controller</b> (واسمه كمان host adapter) هو الإلكترونيات اللي بتشغّل الـ port أو الـ bus أو الجهاز. ساعات بيبقى integrated، وساعات circuit board لوحده.')}</${Def}>
          <${Hand} arrow="up" red=${true}>${t('inside a controller: a processor, microcode, private memory, a bus controller… a little helper computer (that last bit is ours)', 'جوّه الـ controller فيه processor وmicrocode وprivate memory وbus controller… كمبيوتر صغير بيساعد (التشبيه ده من عندنا)')}</${Hand}>
        `, { sec: t('I/O hardware', 'الـ I/O hardware') }),

        // 4 · the PC bus figure
        page(html`
          <${H2}>${t('A typical PC bus structure', 'شكل الـ bus في الـ PC')}</${H2}>
          <${Fig} name="os-io-pc-bus" />
        `),

        // 5 · match
        page(html`
          <${Box} kind="pencil" title=${t('Who does what?', 'مين بيعمل إيه؟')}><p className="hf-p small">${t('Tap a name on the left, then its job on the right.', 'دوس على اسم في العمود الأول، وبعدين على شغلته في التاني.')}</p></${Box}>
          <${Match} id="hw" left=${['Port', 'Bus', 'Controller', 'Device driver', 'PCI', 'Expansion bus']} right=${A ? [
            'إلكترونيات بتشغّل port أو bus أو جهاز',
            'بيوصّل الأجهزة البطيئة زي الـ keyboard',
            'نقطة توصيل للجهاز',
            'بيخبّي تفاصيل الجهاز ويدّي interface موحّد',
            'الـ shared direct access',
            'الـ bus المنتشر في الـ PCs والـ servers'
          ] : [
            'Electronics that operate a port, bus or device',
            'Connects slow devices like the keyboard',
            'A connection point for a device',
            'Hides device details behind a uniform interface',
            'Shared direct access',
            'The bus common in PCs and servers'
          ]} answer=${[2, 4, 0, 3, 5, 1]} />
        `),

        // 6 · device registers and addressing
        page(html`
          <${H2}>${t('Four registers on every device', 'أربع registers في كل جهاز')}</${H2}>
          <${P} small=${true}>${X('<b>I/O instructions</b> control devices. Devices have registers where the driver places commands, addresses and data:', `الـ ${io} instructions هي اللي بتتحكم في الأجهزة. والأجهزة ليها registers الـ driver بيحط فيها commands وaddresses وdata:`)}</${P}>
          <div className="hf-os8-regs hf-in">
            <div><b>data-in</b><span>${t('data the host reads from the device', 'الداتا اللي الـ host بيقراها من الجهاز')}</span></div>
            <div><b>data-out</b><span>${t('data the host writes to the device', 'الداتا اللي الـ host بيكتبها للجهاز')}</span></div>
            <div><b>status</b><span>${t('holds the busy (and error) bits the host reads', 'فيه الـ busy bit (والـ error) اللي الـ host بيقراهم')}</span></div>
            <div><b>control</b><span>${t('commands from the host', 'الـ commands اللي جاية من الـ host')}</span></div>
          </div>
          <${P} small=${true}>${X('Each is typically <b>1–4 bytes</b>, or a <b>FIFO buffer</b>.', 'كل واحد غالبًا <b><bdi dir="ltr">1–4</bdi> bytes</b>، أو <b>FIFO buffer</b>.')}</${P}>
          <${H3}>${t('How does the CPU reach them?', 'الـ CPU بيوصلهم إزاي؟')}</${H3}>
          <${P} small=${true}>${X('Devices have <b>addresses</b>, used in one of two ways:', 'الأجهزة ليها <b>addresses</b>، وبتتستخدم بطريقة من اتنين:')}</${P}>
          <${UL} items=${A ? ['الـ <b>direct I/O instructions</b> اللي بتكلّم الـ address بتاع الجهاز.', `الـ <b>memory-mapped ${io}</b>: الـ data والـ command registers بتاعة الجهاز بتتعمل map في الـ address space بتاع الـ processor، خصوصًا للـ address spaces الكبيرة زي الـ graphics.`]
            : ['<b>Direct I/O instructions</b> that name the device\'s address.', '<b>Memory-mapped I/O</b>: the device\'s data and command registers are mapped into the processor\'s address space, especially for large address spaces such as graphics.']} />
        `, { sec: t('Registers and addresses', 'الـ registers والـ addresses') }),

        // 7 · port map
        page(html`
          <${H2}>${t('Who lives at which address?', 'مين ساكن في أنهي address؟')}</${H2}>
          <${Fig} name="os-io-port-map" />
        `),

        // 8 · polling
        page(html`
          <${H1}>${t('Polling: are you done yet?', 'الـ Polling: خلّصت ولا لسه؟')}</${H1}>
          <${P} small=${true}>${X('The simplest way for the host to move a byte is a <b>handshake</b> with the controller. The slides call it <b>polling (handshaking) for each byte</b>:', 'أبسط طريقة الـ host ينقل بيها byte هي <b>handshake</b> مع الـ controller. السلايدز بتسميها <b>polling (handshaking) لكل byte</b>:')}</${P}>
          <${Steps} items=${POLL} ctl=${[0, 0, 0, 1, 1]} />
          <${Hand}>${t('dark badges: the host · coloured badges: the controller', 'الأرقام الغامقة: الـ host · الأرقام الملوّنة: الـ controller')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Step 1 is a <b>busy-wait cycle</b>: <b>reasonable if the device is fast</b>, but <b>inefficient if the device is slow</b>, because the CPU could switch to other tasks.',
            'الخطوة 1 دي <b>busy-wait cycle</b>: <b>معقولة لو الجهاز سريع</b>، بس <b>مش efficient لو الجهاز بطيء</b>، عشان الـ CPU كان ممكن يروح لـ tasks تانية.')}</p></${Box}>
        `, { sec: t('Polling', 'الـ Polling') }),

        // 9 · polling figure
        page(html`
          <${H2}>${t('Watch one byte go, fast and slow', 'اتفرج على byte واحد، مع جهاز سريع وجهاز بطيء')}</${H2}>
          <${Fig} name="os-io-polling" />
        `),

        // 10 · order the handshake
        page(html`
          <${Box} kind="pencil" title=${t('Put the handshake in order', 'رتّب الـ handshake')}><p className="hf-p small">${t('Tap the five polling steps in the order they happen.', 'دوس على خطوات الـ polling الخمسة بالترتيب اللي بتحصل بيه.')}</p></${Box}>
          <${Order} id="poll" items=${POLL} shuffle=${[2, 0, 4, 1, 3]} />
          <${Grow} />
          <${Talk} who="cpu">${t('Busy? Busy? Busy?… Free! My turn.', 'مشغول؟ مشغول؟ مشغول؟… فاضي! دوري.')}</${Talk}>
        `),

        // 11 · interrupts
        page(html`
          <${H1}>${t("Interrupts: don't call us, we'll call you", 'الـ Interrupts: متتصلش، إحنا هنكلّمك')}</${H1}>
          <${P} small=${true}>${X('Sometimes it is more efficient for the controller to <b>notify the CPU</b> when the device is ready. Interrupts let a device notify the CPU of <b>any event</b>.', 'ساعات بيبقى أكفأ إن الـ controller <b>يبلّغ الـ CPU</b> لما الجهاز يبقى جاهز. الـ interrupts بتخلّي الجهاز يبلّغ الـ CPU بـ <b>أي event</b>.')}</${P}>
          <${Def}>${X('The CPU has a wire, the <b>Interrupt Request Line (IRL)</b>, that it senses <b>after executing every instruction</b>. When a controller asserts a signal on it, the CPU performs a <b>state save</b> and jumps to the <b>interrupt-handler routine</b> at a fixed address.',
            'الـ CPU فيه سلك اسمه <b>Interrupt Request Line (IRL)</b>، بيحس بيه <b>بعد تنفيذ كل instruction</b>. لما controller يبعت signal عليه، الـ CPU بيعمل <b>state save</b> وينط للـ <b>interrupt-handler routine</b> عند address ثابت.')}</${Def}>
          <${Talk} who="disk">${t('Done! *pulls the line*', 'خلّصت! *بيشد السلك*')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${t('Saw it after my last instruction. Saving my state… off to the handler.', 'شفته بعد آخر instruction. بحفظ الـ state بتاعتي… ورايح للـ handler.')}</${Talk}>
        `, { sec: t('Interrupts', 'الـ Interrupts') }),

        // 12 · the interrupt cycle figure
        page(html`
          <${H2}>${t('The interrupt-driven I/O cycle', 'الـ interrupt-driven I/O cycle')}</${H2}>
          <${Fig} name="os-io-irq-cycle" />
        `),

        // 13 · the handler
        page(html`
          <${H2}>${t('What the interrupt handler does', 'الـ interrupt handler بيعمل إيه')}</${H2}>
          <${Steps} items=${A ? ['بيحدّد <b>السبب</b>.', 'بيعمل الـ <b>processing</b> المطلوب.', 'بيعمل <b>state restore</b>.', 'بينفّذ <b>return-from-interrupt</b> instruction عشان يرجّع الـ CPU لحالته اللي كان فيها.']
            : ['Determines the <b>cause</b>.', 'Performs the necessary <b>processing</b>.', 'Performs a <b>state restore</b>.', 'Executes a <b>return-from-interrupt</b> instruction to return the CPU to its previous state.']} />
          <${Box} kind="watch"><p className="hf-p small">${X('The CPU senses the Interrupt Request Line <b>after executing every instruction</b>. Not once per second, not only when idle, not only during DMA.',
            'الـ CPU بيحس بالـ Interrupt Request Line <b>بعد تنفيذ كل instruction</b>. مش مرة كل ثانية، ولا لما يبقى فاضي بس، ولا وقت الـ DMA بس.')}</p></${Box}>
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['والـ interrupt بيجي إمتى بالظبط؟', 'لما الـ input يبقى جاهز، أو الـ output يخلص، أو يحصل <b>error</b> (الخطوة 3).']
          ] : [
            ['When exactly does an interrupt come?', 'When input is ready, output is complete, or an <b>error</b> happens (step 3).']
          ]} />
          <${Hand}>${t("Ours: polling is opening the oven every minute; an interrupt is its timer ringing.", 'من عندنا: الـ polling إنك تفتح الفرن كل دقيقة، والـ interrupt جرس التايمر.')}</${Hand}>
        `),

        // 14 · interview with the vector table
        page(html`
          <${Interview} title=${t('Head First interview', 'حوار Head First')} sub=${t("This week: the Intel Pentium event-vector table, on being everyone's phone book.", 'ضيفنا النهارده: الـ Intel Pentium event-vector table، دليل التليفونات بتاع الكل.')} lines=${A ? [
            ['هيد فيرست', 'عرّفنا بنفسك.'],
            ['الجدول', 'كل سطر عندي ليه رقم، اسمه الـ <b>vector</b>، وevent. الـ handler بيتلاقى من خلالي.'],
            ['هيد فيرست', 'ابدأ من فوق.'],
            ['الجدول', 'رقم 0 هو الـ <b>divide error</b>، ورقم 1 الـ debug exception، ورقم 2 الـ null interrupt، ورقم 3 الـ breakpoint.'],
            ['هيد فيرست', 'وأشهر واحد؟'],
            ['الجدول', 'رقم <b>14</b>: الـ <b>page fault</b>. قابلته في فصل الـ virtual memory. واللي قبله على طول، رقم 13، هو الـ general protection.'],
            ['هيد فيرست', 'وباقي الأوض؟'],
            ['الجدول', 'رقم 15 ومن 19 لـ 31 كلهم reserved، وكل حاجة من <b>32 لـ 255</b> هي الـ <b>maskable interrupts</b>.']
          ] : [
            ['Head First', 'Introduce yourself.'],
            ['Vector table', 'Each of my rows has a number, the <b>vector</b>, and an event. The handler is found through me.'],
            ['Head First', 'Start at the top.'],
            ['Vector table', 'Vector 0 is <b>divide error</b>, 1 debug exception, 2 null interrupt, 3 breakpoint.'],
            ['Head First', 'Your most famous entry?'],
            ['Vector table', 'Number <b>14</b>: <b>page fault</b>. You met it in the virtual-memory chapter. Right before it, 13 is general protection.'],
            ['Head First', 'And the rest of the house?'],
            ['Vector table', '15 and 19–31 are reserved, and everything from <b>32 to 255</b> is <b>maskable interrupts</b>.']
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('the favourites in questions: 14 and 32–255', 'المفضّلين في الأسئلة: رقم 14، والرينج من 32 لـ 255')}</${Hand}>
        `, { sec: t('Event-vector table', 'الـ event-vector table') }),

        // 15 · vector table figure (tall)
        page(html`
          <${Fig} name="os-io-vectors" />
        `),

        // 16 · DMA
        page(html`
          <${H1}>${t('DMA: the CPU hires a mover', 'الـ DMA: الـ CPU بيأجّر شيّال')}</${H1}>
          <${P} small=${true}>${X('Moving data one byte at a time with the CPU is <b>programmed I/O</b>: a waste for <b>large</b> data.', `إن الـ CPU ينقل الداتا byte byte ده اسمه <b>programmed ${io}</b>، وده تضييع لو الداتا <b>كبيرة</b>.`)}</${P}>
          <${Def}>${X('<b>DMA (Direct Memory Access)</b> avoids programmed I/O for large data movement. It requires a <b>DMA controller</b> and <b>bypasses the CPU</b> to transfer data directly between the I/O device and memory.',
            `الـ <b>DMA (Direct Memory Access)</b> بيتجنّب الـ programmed ${io} في نقل الداتا الكبيرة. محتاج <b>DMA controller</b>، و<b>بيعدّي الـ CPU</b> عشان ينقل الداتا على طول بين الجهاز والـ memory.`)}</${Def}>
          <${Talk} who="cpu">${t("You mean I don't touch every byte?", 'يعني أنا مش هلمس كل byte؟')}</${Talk}>
          <${Talk} who="os" flip=${true}>${X('Nope. I write a <b>command block</b>, the DMA controller carries, you hear <b>one interrupt</b> at the end.', 'لأ. أنا بكتب <b>command block</b>، والـ DMA controller بيشيل، وإنت بتسمع <b>interrupt واحد</b> في الآخر.')}</${Talk}>
          <${Grow} />
          <${Hand}>${t("Ours: moving house, you write the list, the movers carry, and they call once when it's all there.", 'من عندنا: وإنت بتعزّل بتكتب اللستة، والشيّالين يشيلوا، ويتصلوا مرة واحدة لما كله يوصل.')}</${Hand}>
        `, { sec: t('DMA', 'الـ DMA') }),

        // 17 · the command block
        page(html`
          <${H2}>${t('Inside the DMA command block', 'جوّه الـ DMA command block')}</${H2}>
          <${P} small=${true}>${X('The OS writes a <b>DMA command block</b> into memory, then lets the DMA controller loose. Step through it:', 'الـ OS بيكتب <b>DMA command block</b> في الـ memory، وبعدين بيسيب الـ DMA controller يشتغل. امشي معاه خطوة خطوة:')}</${P}>
          <${CmdBlock} />
        `),

        // 18 · six steps figure
        page(html`
          <${H2}>${t('The six-step DMA transfer', 'الـ DMA transfer في 6 خطوات')}</${H2}>
          <${Fig} name="os-io-dma-six" />
        `),

        // 19 · order the six steps
        page(html`
          <${Box} kind="pencil" title=${t('Six steps, in order', 'الست خطوات بالترتيب')}><p className="hf-p small">${t('Tap the six steps of a DMA transfer in the order they happen.', 'دوس على الست خطوات بتوع الـ DMA transfer بالترتيب.')}</p></${Box}>
          <${Order} id="dma" items=${DMA6} shuffle=${[3, 0, 5, 2, 4, 1]} />
        `),

        // 20 · counting down C; advantages
        page(html`
          <${Box} kind="pencil" title=${t('Count down C', 'عدّ الـ C لتحت')}><p className="hf-p small">${X('The driver asks for <b>C = 4,096</b> bytes into a buffer at address <b>X</b>. The DMA controller has moved <b>1,000</b> bytes so far. What is C now, and which address gets the next byte? How many interrupts will the CPU get for the whole transfer?',
            'الـ driver طالب <b><bdi dir="ltr">C = 4,096</bdi></b> bytes في buffer عند الـ address <b>X</b>. الـ DMA controller نقل لحد دلوقتي <b><bdi dir="ltr">1,000</bdi></b> byte. الـ C بقت كام، والـ byte الجاي رايح لأنهي address؟ والـ CPU هياخد كام interrupt في النقل كله؟')}</p>
            <${Gap} h=${5} />
            <${Reveal} id="cnt">${html`<p className="hf-hand">${A ? html`الـ C بقت <bdi dir="ltr">4,096 − 1,000 = 3,096</bdi>، والـ address الجاي <bdi dir="ltr">X + 1,000</bdi> (الـ address بيزيد والـ C بتقل). وinterrupt <b>واحد</b> بس، لما <bdi dir="ltr">C = 0</bdi>.` : html`C = 4,096 − 1,000 = 3,096, next address X + 1,000 (the address goes up, C goes down). And just <b>one</b> interrupt, when C = 0.`}</p>`}</${Reveal}>
          </${Box}>
          <${H3}>${t('Why bother? The advantages of DMA', 'ليه نتعب نفسنا؟ مميزات الـ DMA')}</${H3}>
          <${UL} items=${A ? ['الـ CPU بيفضى من النقل byte byte ويعمل شغل تاني.', 'بس <b>interrupt واحد لكل block</b> بدل واحد لكل byte.', 'الأجهزة السريعة بتنقل بسرعة قريبة من سرعة الـ memory.', 'الـ interrupts والـ context switches بتقل، فالـ performance كله بيتحسّن.']
            : ['The CPU is freed from byte-by-byte transfer and can do other work.', 'Only <b>one interrupt per block</b> instead of per byte.', 'High-speed devices transfer at close to memory speed.', 'Fewer interrupts and context switches improve overall performance.']} />
        `),

        // 21 · fireside 1: polling vs interrupt
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Polling and Interrupt argue over who should wait for the device.", 'قعدة الليلة: الـ Polling والـ Interrupt بيتخانقوا مين فيهم يستنى الجهاز.')} />
          <${Chat} names=${[t('Polling', 'الـ Polling'), t('Interrupt', 'الـ Interrupt')]} lines=${A ? [
            [0, 'أنا بسيط. الـ host بيفضل يقرا الـ <b>busy bit</b> بتاعي لحد ما يبقى 0. مفيش مفاجآت.'],
            [1, 'مفيش مفاجآت، ومفيش وقت فاضي. وإنت بتلف، الـ CPU مش قادر يروح لـ tasks تانية.'],
            [0, 'لو الجهاز <b>سريع</b>، الـ busy-wait بتاعي معقول جدًا.'],
            [1, 'ولو <b>بطيء</b>، تبقى مش efficient. أنا بخلّي الـ controller <b>يبلّغ</b> الـ CPU لما الجهاز يجهز.'],
            [0, 'وإنت بتخلّي الـ CPU يعمل <b>state save</b> وينط للـ handler كل مرة. ده ليه تمن.'],
            [1, 'الـ CPU بيبص على السلك بتاعي بعد كل instruction بس، وبيكمّل شغله في النص.'],
            [0, 'والسلايدز نفسها حاطّاني كطريقة <b>لتقليل الـ interrupts</b>. ها!']
          ] : [
            [0, "I'm simple. The host just keeps reading my <b>busy bit</b> until it's 0. No surprises."],
            [1, "No surprises, and no free time. While you spin, the CPU can't switch to other tasks."],
            [0, 'If the device is <b>fast</b>, my busy-wait is perfectly reasonable.'],
            [1, "And if it's <b>slow</b>, you're inefficient. I let the controller <b>notify</b> the CPU when the device is ready."],
            [0, 'You make the CPU do a <b>state save</b> and jump to a handler every time. That costs.'],
            [1, 'The CPU only checks my line after each instruction, and keeps working in between.'],
            [0, 'The slides even list me as a way to <b>reduce interrupts</b>. Ha!']
          ]} />
        `, { sec: t('Fireside chat', 'دردشة جنب الدفاية') }),

        // 22 · fireside 2: interrupt vs DMA
        page(html`
          <${Chat} names=${[t('Interrupt', 'الـ Interrupt'), t('DMA', 'الـ DMA')]} lines=${A ? [
            [1, 'إنتو الاتنين لسه بتنقلوا الداتا الكبيرة byte byte. ده الـ <b>programmed I/O</b>.'],
            [0, 'وإنت يعني أحسن؟'],
            [1, 'أنا <b>بعدّي الـ CPU</b> وبنقل الـ block كله على طول بين الجهاز والـ memory.'],
            [0, 'إنت بتاخد الـ bus من الـ CPU! ده <b>cycle stealing</b>.'],
            [1, 'معترف. بس برضه أكفأ بكتير: <b>interrupt واحد لكل block</b>، مش لكل byte.'],
            [0, 'استنى، إنت كمان بتستخدم interrupts؟'],
            [1, 'واحد بس، لما الـ C توصل 0. إنت المرسال المفضّل عندي.']
          ] : [
            [1, 'You two still move big data one byte at a time. That\'s <b>programmed I/O</b>.'],
            [0, 'And you do better?'],
            [1, 'I <b>bypass the CPU</b> and move the whole block straight between the device and memory.'],
            [0, 'You grab the bus from the CPU! That\'s <b>cycle stealing</b>.'],
            [1, 'Guilty. But it\'s still much more efficient: <b>one interrupt per block</b>, not per byte.'],
            [0, 'Wait, you use interrupts too?'],
            [1, 'Just one, when C reaches 0. You\'re my favourite messenger.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The DMA controller taking the bus from the CPU is <b>bus mastering</b>, also called <b>cycle stealing</b>. Not polling, not spooling, not context switching.',
            'إن الـ DMA controller ياخد الـ bus من الـ CPU ده اسمه <b>bus mastering</b>، أو <b>cycle stealing</b>. مش polling، ولا spooling، ولا context switching.')}</p></${Box}>
        `),

        // 23 · application I/O interface
        page(html`
          <${H1}>${t('Same calls, different devices', 'نفس الـ calls، أجهزة مختلفة')}</${H1}>
          <${P}>${X('<b>I/O system calls</b> encapsulate device behaviours in <b>generic classes</b>.', `الـ ${io} system calls بتجمّع تصرّفات الأجهزة في <b>classes عامة</b>.`)}</${P}>
          <${Def}>${X('The <b>device-driver layer hides differences among I/O controllers from the kernel</b>.', `<b>طبقة الـ device drivers بتخبّي الفروق بين الـ ${io} controllers عن الـ kernel</b>.`)}</${Def}>
          <${UL} items=${A ? ['الأجهزة الجديدة اللي بتستخدم protocols متنفّذة أصلًا <b>مش محتاجة شغل زيادة</b>.', `كل OS ليه الـ ${io} subsystem structures والـ driver frameworks بتوعه.`]
            : ['New devices that use already-implemented protocols need <b>no extra work</b>.', 'Each OS has its own I/O subsystem structures and device-driver frameworks.']} />
          <${Talk} who="os">${t('I ask for "a block device". The driver deals with which brand of disk it really is.', 'أنا بطلب "block device". والـ driver هو اللي يتصرّف مع نوع الـ disk الحقيقي.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('You plug in a new mouse that speaks a protocol your OS already knows. Why does it just work, with no new kernel code?', 'ركّبت mouse جديد بيتكلّم protocol الـ OS عارفه أصلًا. ليه بيشتغل على طول من غير ما الـ kernel يتغيّر؟')}</p></${Box}>
        `, { sec: t('Application I/O interface', 'الـ Application I/O interface') }),

        // 24 · kernel I/O structure figure
        page(html`
          <${H2}>${t('Kernel I/O structure', 'هيكل الـ kernel I/O')}</${H2}>
          <${Fig} name="os-io-kernel" />
        `),

        // 25 · six dimensions
        page(html`
          <${H2}>${t('Devices differ in six ways', 'الأجهزة بتختلف في ست حاجات')}</${H2}>
          <div className="hf-os8-dims hf-in">${[
            ['character-stream', 'block'], ['sequential', 'random-access'], ['synchronous', 'asynchronous'], ['sharable', 'dedicated'], ['speed of operation'], ['read-write', 'read-only', 'write-only']
          ].map((r, j) => html`<div key=${j} style=${{ animationDelay: calm() ? '0s' : (0.15 + j * 0.12) + 's' }}><span className="hf-os8-n">${j + 1}</span>${r.map((c, k) => html`<${React.Fragment} key=${k}>${k > 0 && html`<i>${t('or', 'أو')}</i>`}<code>${c}</code></${React.Fragment}>`)}</div>`)}</div>
          <${Gap} h=${4} />
          <${Box} kind="brain"><p className="hf-p">${X('A disk has a <code>seek</code> command; a keyboard does not. Which two of these six dimensions explain that?', 'الـ disk عنده command اسمه <code>seek</code>، والـ keyboard لأ. أنهي اتنين من الست حاجات دول بيفسّروا ده؟')}</p></${Box}>
        `),

        // 26 · block vs character
        page(html`
          <${H1}>${t('Block or character?', 'الـ block ولا الـ character؟')}</${H1}>
          <div className="hf-os8-bc hf-in"><h4>${t('Block devices', 'الـ Block devices')}</h4>
            <${UL} items=${A ? ['زي الـ <b>disk drives</b>.', 'الـ commands هي <b>read و write و seek</b>.', `الوصول بيبقى raw ${io} أو direct ${io} أو عن طريق الـ file system.`, 'الـ <b>memory-mapped file access</b> ممكن: الـ file بيتعمله map على الـ virtual memory، والـ clusters بتيجي بالـ demand paging.', 'وفيه <b>DMA</b>.']
              : ['Include <b>disk drives</b>.', 'Commands: <b>read, write, seek</b>.', 'Raw I/O, direct I/O or file-system access.', '<b>Memory-mapped file access</b> is possible: the file is mapped to virtual memory and clusters come in via demand paging.', '<b>DMA</b>.']} /></div>
          <div className="hf-os8-bc hf-in"><h4>${t('Character devices', 'الـ Character devices')}</h4>
            <${UL} items=${A ? ['زي الـ <b>keyboards والـ mice والـ serial ports</b>.', 'الـ commands هي <code>get()</code> و<code>put()</code>.', 'فيه libraries فوقيهم بتسمح بالـ <b>line editing</b>.']
              : ['Include <b>keyboards, mice, serial ports</b>.', 'Commands: <code>get()</code>, <code>put()</code>.', 'Libraries layered on top allow <b>line editing</b>.']} /></div>
        `, { sec: t('Block and character devices', 'الـ block والـ character devices') }),

        // 27 · block-char figure
        page(html`
          <${H2}>${t('Pick a device, see its kind', 'اختار جهاز، وشوف نوعه')}</${H2}>
          <${Fig} name="os-io-block-char" />
        `),

        // 28 · sort
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Block or character? Tap <b>B</b> or <b>C</b> for each one, then check.', 'هو block ولا character؟ دوس <b>B</b> أو <b>C</b> لكل واحدة، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="bc" bins=${[['B', 'Block'], ['C', 'Character']]} items=${A ? [
            ['الـ disk drive', 0],
            ['الـ keyboard', 1],
            ['الـ mouse', 1],
            ['الـ commands هي read و write و seek', 0],
            ['الـ commands هي <code>get()</code> و<code>put()</code>', 1],
            ['ينفع معاه memory-mapped file access', 0],
            ['فوقيه libraries للـ line editing', 1],
            ['ينفع raw أو direct أو file-system access', 0],
            ['بيستخدم DMA', 0]
          ] : [
            ['Disk drive', 0],
            ['Keyboard', 1],
            ['Mouse', 1],
            ['Commands read, write, seek', 0],
            ['Commands <code>get()</code>, <code>put()</code>', 1],
            ['Memory-mapped file access is possible', 0],
            ['Libraries on top allow line editing', 1],
            ['Raw, direct or file-system access', 0],
            ['Uses DMA', 0]
          ]} />
        `),

        // 29 · performance
        page(html`
          <${H1}>${t('Every interrupt has a price', 'كل interrupt ليه تمن')}</${H1}>
          <${P} small=${true}>${X('I/O is a <b>major factor in system performance</b>. It:', `الـ ${io} <b>عامل كبير في الـ performance</b> بتاع السيستم. عشان:`)}</${P}>
          <${UL} items=${A ? ['بيطلب من الـ CPU ينفّذ كود الـ <b>device driver</b>.', 'بيعمل <b>context switches بسبب الـ interrupts</b>.', 'بيعمل <b>data copying</b>.']
            : ['demands the CPU to execute <b>device-driver code</b>,', 'causes <b>context switches due to interrupts</b>,', 'causes <b>data copying</b>.']} />
          <${H3}>${t('The overheads of servicing an interrupt', 'الـ overheads بتاعة خدمة الـ interrupt')}</${H3}>
          <${Steps} items=${A ? ['الـ process الشغّالة بتتقاطع، والـ <b>state بتاعتها بتتحفظ في الـ PCB</b> بتاعها.', 'الـ <b>interrupt service routine (ISR)</b> بتشتغل عشان تتعامل مع الـ interrupt.', 'لما تخلص، <b>الـ state بترجع</b> والـ process بتكمّل.']
            : ['The running process is interrupted and its <b>state is stored in its PCB</b>.', 'The <b>interrupt service routine (ISR)</b> runs to deal with the interrupt.', 'On completion, the <b>state is restored</b> and the process resumes.']} />
          <${Grow} />
          <${Hand} red=${true}>${t('so the overhead = saving and restoring process state (plus running the ISR and the context switches)', 'يعني الـ overhead هو حفظ ورجوع الـ process state (ومعاهم تشغيل الـ ISR والـ context switches)')}</${Hand}>
        `, { sec: t('Performance', 'الـ Performance') }),

        // 30 · isr cost figure
        page(html`
          <${H2}>${t('Where the CPU time goes', 'وقت الـ CPU بيروح فين')}</${H2}>
          <${Fig} name="os-io-isr-cost" />
        `),

        // 31 · how to improve
        page(html`
          <${H2}>${t('How to make I/O faster', 'إزاي نخلّي الـ I/O أسرع')}</${H2}>
          <${UL} items=${A ? ['قلّل عدد الـ <b>context switches</b>.', 'قلّل <b>نسخ الداتا</b>.', 'قلّل الـ <b>interrupts</b> بـ transfers كبيرة وsmart controllers وpolling.', 'استخدم <b>DMA</b>.', 'استخدم hardware devices <b>أذكى</b>.', `<b>وازن</b> بين performance الـ CPU والـ memory والـ bus والـ ${io} عشان أعلى throughput.`]
            : ['Reduce the number of <b>context switches</b>.', 'Reduce <b>data copying</b>.', 'Reduce <b>interrupts</b> with large transfers, smart controllers and polling.', 'Use <b>DMA</b>.', 'Use <b>smarter</b> hardware devices.', '<b>Balance</b> CPU, memory, bus and I/O performance for the highest throughput.']} />
          <${Box} kind="watch"><p className="hf-p small">${X('"<b>Increase</b> the number of interrupts" is <b>not</b> on the list. Every interrupt costs a save, an ISR and a restore.', 'إنك <b>تزوّد</b> عدد الـ interrupts <b>مش</b> في اللستة. كل interrupt بيكلّف save وISR وrestore.')}</p></${Box}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Polling was "inefficient for slow devices", yet here it is on the list. Put the two slides together: when does polling <i>save</i> work instead of wasting it?',
            'الـ polling كان "مش efficient مع الأجهزة البطيئة"، وأهو موجود في اللستة. حط السلايدين جنب بعض: إمتى الـ polling <i>بيوفّر</i> شغل بدل ما يضيّعه؟')}</p></${Box}>
        `),

        // 32–36 · practice questions (this lecture has none from the doctor's papers)
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("This lecture has no questions from the doctors' papers yet, so these are the site's own practice questions. Tap an answer to see why it's right or wrong.", 'المحاضرة دي ملهاش أسئلة من امتحانات الدكاترة لسه، فدي أسئلة تدريب من الموقع. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /senses the Interrupt Request Line/)}
          <${Grow} />
          <${Talk} who="cpu" flip=${true}>${t('You know how often I look at that wire.', 'إنت عارف أنا ببص على السلك ده كل قد إيه.')}</${Talk}>
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${mq('m2', /busy-wait cycle for I\/O/)}
          <${Grow} />
          <${Dumb} qa=${A ? [['يعني الـ memory-mapped I/O هو الـ virtual memory؟', 'لأ. الـ virtual memory بتعمل map للـ pages بتاعة الـ process. الـ <b>memory-mapped I/O</b> بيعمل map للـ <b>registers بتاعة الجهاز</b> في الـ address space.']]
            : [['So is memory-mapped I/O just virtual memory?', 'No. Virtual memory maps a process\'s pages. <b>Memory-mapped I/O</b> maps the <b>device\'s registers</b> into the processor\'s address space.']]} />
        `),
        page(html`
          ${mq('m4', /vector 14 is/)}
          <${Gap} h=${8} />
          ${mq('m5', /part of the DMA command block/)}
        `),
        page(html`
          ${mq('m3', /host sets the command-ready/)}
          <${Grow} />
          <${Hand} red=${true}>${t('the handshake again: host, host, host, then controller, controller', 'الـ handshake تاني: الـ host تلات مرات، وبعدين الـ controller مرتين')}</${Hand}>
        `),
        page(html`
          ${mq('m6', /NOT listed as a way to improve/)}
          <${Grow} />
          <${Talk} who="os">${t('Nobody here is asking for more interrupts. Each one costs a save, an ISR and a restore.', 'محدّش هنا بيطلب interrupts أكتر. كل واحد بيكلّف save وISR وrestore.')}</${Talk}>
        `),

        // 37 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الأجهزة بتتوصّل بالـ <b>ports والـ buses والـ controllers</b>، والـ <b>drivers</b> بتدّي interface موحّد.',
            'أربع registers: الـ data-in والـ data-out والـ status والـ control.',
            'الـ <b>polling</b>: الـ host بيقرا الـ busy bit لحد ما يبقى 0. معقول للجهاز السريع، تضييع للبطيء.',
            'الـ <b>interrupts</b>: الـ CPU بيحس بالـ IRL بعد كل instruction، يعمل state save، ويروح للـ handler.',
            'في الـ Pentium vector table: الـ 14 page fault، ومن 32 لـ 255 maskable interrupts.',
            'الـ <b>DMA</b> بيعدّي الـ CPU، وبياخد الـ bus (cycle stealing)، وبيعمل interrupt واحد لكل block.',
            'الـ block devices بـ read و write و seek، والـ character devices بـ <code>get()</code> و<code>put()</code>.',
            'تمن الـ interrupt: حفظ ورجوع الـ state. فقلّل الـ interrupts والـ copying.'
          ] : [
            'Devices connect through <b>ports, buses and controllers</b>; <b>device drivers</b> give a uniform interface.',
            'Four registers: data-in, data-out, status, control; reached by direct I/O or memory-mapped I/O.',
            '<b>Polling</b>: the host reads the busy bit until 0. Fine for fast devices, wasteful for slow ones.',
            '<b>Interrupts</b>: the CPU senses the IRL after every instruction, saves state, jumps to the handler.',
            'Pentium vector table: 14 is page fault, 32–255 are maskable interrupts.',
            '<b>DMA</b> bypasses the CPU, takes the bus (cycle stealing), one interrupt per block.',
            'Block devices: read, write, seek. Character devices: <code>get()</code>, <code>put()</code>.',
            'An interrupt costs saving and restoring process state, so cut interrupts, copying and context switches.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 38 · the end of the chapter and of the course
        page(html`
          <div className="hf-end">
            <${H1}>${t('You finished Chapter 8, and the whole course!', 'خلّصت الفصل التامن، والكورس كله!')}</${H1}>
            <${Talk} who="os">${t("Processes, scheduling, memory, deadlocks, files, and now the devices: you've met everything I manage. Good luck in the final!", 'الـ processes والـ scheduling والـ memory والـ deadlocks والـ files، ودلوقتي الأجهزة: كده اتعرّفت على كل حاجة أنا بديرها. بالتوفيق في الفاينل!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [8], t: Date.now() } }}>${t('Quiz me on Lecture 8', 'امتحنّي في محاضرة 8')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 8, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 8, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

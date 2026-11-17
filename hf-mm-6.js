// Head First chapter for Multimedia Lecture 6 (built on hf.js), English + Egyptian Arabic, same pages in both.
// MIDI: what it is and why it compresses, the parts of a MIDI system, track/channel/timbre/pitch/voice/patch, IN/OUT/THRU,
// status and data bytes, channel voice and mode messages, decoding and sizing messages, system messages, General MIDI,
// limitations, and MPEG-4 Structured Audio (SAOL, SASL, SASBF, MIDI semantics, Scheduler, AudioBIFS), plus the Web MIDI API.
// Every fact comes from the lecture's notes; analogies are marked as ours. Every byte below was decoded by hand twice
// (status nibble = message, second nibble = channel − 1, data bytes in hex) and checked with node: 9C 50 7F, 80 3C 40,
// 99 26 64, B3 07 64, C0 05, D5 40, B0 7B 00, 85 40 00, 90 3C 40, BF 07 7F; 1000 notes = 6000 B, 1 min CD = 10,584,000 B.
// This lecture has none of the doctor's questions, so the exam corner uses the site's own practice questions, titled as such.
(function () {
  const H = window.HF; H.chapters.mm = H.chapters.mm || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T6 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-mm6')) {
    const s = document.createElement('style'); s.id = 'hf-css-mm6';
    s.textContent = `
.hfb .hf-mm6-dec{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:5px; background:var(--paper); }
.hfb .hf-mm6-tabs{ display:flex; gap:4px; }
.hfb .hf-mm6-tabs button{ flex:1 1 0; min-width:0; font:800 13.5px/1 var(--body); min-height:30px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-mm6-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-mm6-bytes{ display:flex; justify-content:center; gap:8px; }
.hfb .hf-mm6-bytes span{ font:800 21px/1 var(--mono); padding:5px 10px; border:2px solid var(--hf-line); border-radius:7px; background:var(--paper); color:var(--ink); }
.hfb .hf-mm6-bytes span.st{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); }
.hfb .hf-mm6-lab{ font:700 13px/1.15 var(--body); color:var(--graphite); margin:0; }
.hfb .hf-mm6-types{ display:grid; grid-template-columns:1fr 1fr; gap:4px; }
.hfb .hf-mm6-types button{ font:600 13px/1.1 var(--body); min-height:27px; padding:2px 6px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; text-align:left; }
.hfb .hf-mm6-types button[aria-pressed="true"]{ border-color:var(--hf-hand); box-shadow:0 0 0 1.5px var(--hf-hand); }
.hfb .hf-mm6-types button.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hfb .hf-mm6-types button.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-mm6-fields{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:6px; }
.hfb .hf-mm6-fields label{ display:grid; gap:3px; font:700 13px/1.1 var(--body); color:var(--graphite); }
.hfb .hf-mm6-in{ width:100%; box-sizing:border-box; height:34px; font:700 16px/1 var(--mono); text-align:center; border:1.5px solid var(--faint); border-radius:6px; background:var(--paper); color:var(--ink); }
.hfb .hf-mm6-in.ok{ border-color:var(--ok); box-shadow:0 0 0 1.5px var(--ok); } .hfb .hf-mm6-in.no{ border-color:var(--hf-red); box-shadow:0 0 0 1.5px var(--hf-red); }
.hfb .hf-mm6-none{ height:34px; display:grid; place-items:center; font:600 13px/1 var(--body); color:var(--graphite); border:1.5px dashed var(--faint); border-radius:6px; }
.hfb .hf-mm6-sol{ font:600 13px/1.38 var(--mono); color:var(--ink); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; margin:0; }
.hfb .hf-mm6-sol b{ color:var(--hf-k); }
.hfb .hf-mm6-tbl{ border-collapse:collapse; width:100%; font:500 13px/1.2 var(--body); color:var(--ink); }
.hfb .hf-mm6-tbl th, .hfb .hf-mm6-tbl td{ border:1px solid var(--hf-line); padding:4px 5px; text-align:left; vertical-align:middle; }
.hfb .hf-mm6-tbl th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-mm6-tbl td.m{ font:800 14px/1 var(--mono); text-align:center; color:var(--hf-k); }
.hfb .hf-mm6-tbl td.n{ font-weight:700; }
.hfb .hf-mm6-tbl td.c{ text-align:center; font-weight:800; }
.hfb .hf-mm6-tbl tr.two td{ background:color-mix(in srgb, var(--hf-hand) 9%, var(--paper)); }
.hfb .hf-mm6-grp{ display:grid; gap:6px; }
.hfb .hf-mm6-grp > div{ border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 8px; background:var(--paper); }
.hfb .hf-mm6-grp > div > b{ display:block; font:800 14px/1.2 var(--body); margin-bottom:4px; }
.hfb .hf-mm6-chips{ display:flex; flex-wrap:wrap; gap:4px; }
.hfb .hf-mm6-chips span{ font:600 13px/1.2 var(--body); border:1px solid var(--faint); border-radius:5px; padding:2px 6px; }
.hfb .hf-mm6-chips span code{ font:800 13px/1 var(--mono); color:var(--hf-k); margin-right:4px; background:none; padding:0; }
.hfb .hf-mm6-eq{ font:800 15px/1.3 var(--body); text-align:center; margin:0; padding:7px 8px; border:2px solid var(--hf-k); border-radius:8px; color:var(--ink); }
.hf-ar .hf-mm6-lab, .hf-ar .hf-mm6-fields label, .hf-ar .hf-mm6-none, .hf-ar .hf-mm6-grp > div > b{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-mm6-eq{ font-family:"IBM Plex Sans Arabic", var(--body); font-weight:600; }
.hf-ar .hf-mm6-sol{ direction:ltr; text-align:left; }
`;
    document.head.appendChild(s);
  }

  // the course's voice-message table (notes §5), with the size in bytes of each message
  const VOICE = [
    ['Note off', '8x', 'Key number', 'Note off velocity', 3], ['Note on', '9x', 'Key number', 'Note on velocity', 3],
    ['Polyphonic key pressure', 'Ax', 'Key number', 'Amount of pressure', 3], ['Control change', 'Bx', 'Controller number', 'Controller value', 3],
    ['Program change', 'Cx', 'Program number', 'None', 2], ['Channel pressure', 'Dx', 'Pressure value', 'None', 2], ['Pitch bend', 'Ex', 'MSB', 'LSB', 3]
  ];
  function VoiceTable() {
    return html`<table className="hf-mm6-tbl hf-in" dir="ltr"><thead><tr><th>Voice message</th><th>Status</th><th>Data 1</th><th>Data 2</th><th>Bytes</th></tr></thead>
      <tbody>${VOICE.map((v, i) => html`<tr key=${i} className=${v[4] === 2 ? 'two' : ''}><td className="n">${v[0]}</td><td className="m">${v[1]}</td><td>${v[2]}</td><td>${v[3]}</td><td className="c">${v[4]}</td></tr>`)}</tbody></table>`;
  }

  // Be the MIDI decoder: message type, channel and the data values, for seven byte strings
  const TYPES = ['Note Off', 'Note On', 'Poly key pressure', 'Control change', 'Program change', 'Channel pressure', 'Pitch bend', 'Channel mode'];
  const MSGS = [
    { b: ['9C', '50', '7F'], t: 1, ch: 13, d: [80, 127], sol: ['9 → <b>Note On</b>; C = 12 → ch <b>13</b>', '50 = 5×16 + 0 = <b>80</b> → key', '7F = 7×16 + 15 = <b>127</b> → velocity'] },
    { b: ['80', '3C', '40'], t: 0, ch: 1, d: [60, 64], sol: ['8 → <b>Note Off</b>; 0 → ch <b>1</b>', '3C = 3×16 + 12 = <b>60</b> → key', '40 = 4×16 + 0 = <b>64</b> → velocity'] },
    { b: ['99', '26', '64'], t: 1, ch: 10, d: [38, 100], sol: ['9 → <b>Note On</b>; 9 → ch <b>10</b> (drums)', '26 = 2×16 + 6 = <b>38</b> → key (snare)', '64 = 6×16 + 4 = <b>100</b> → velocity'] },
    { b: ['B3', '07', '64'], t: 3, ch: 4, d: [7, 100], sol: ['B → <b>Control change</b>; 3 → ch <b>4</b>', '07 = <b>7</b> → controller (< 121)', '64 = 6×16 + 4 = <b>100</b> → value'] },
    { b: ['C0', '05'], t: 4, ch: 1, d: [5], sol: ['C → <b>Program change</b>; 0 → ch <b>1</b>', '05 = <b>5</b> → program number', 'one data byte: <b>2 bytes</b> in all'] },
    { b: ['D5', '40'], t: 5, ch: 6, d: [64], sol: ['D → <b>Channel pressure</b>; 5 → ch <b>6</b>', '40 = 4×16 + 0 = <b>64</b> → pressure', 'one data byte: <b>2 bytes</b> in all'] },
    { b: ['B0', '7B', '00'], t: 7, ch: 1, d: [123, 0], sol: ['B → Control change; 0 → ch <b>1</b>', '7B = 7×16 + 11 = <b>123</b> → <b>mode</b>', '(121–127 = channel mode); 00 = <b>0</b>'] }
  ];
  function Decoder() {
    const ar = useAr();
    const [k, setK] = H.K.useSlot('dec', 0);
    const m = MSGS[k];
    const [a, setA] = H.K.useSlot('dec:a' + k, {});
    const [c, setC] = H.K.useSlot('dec:c' + k, false);
    const num = v => v != null && String(v).trim() !== '' && /^\d+$/.test(String(v).trim()) ? +String(v).trim() : NaN;
    const okT = a.t === m.t, okC = num(a.ch) === m.ch, okD = i => num(a['d' + i]) === m.d[i];
    const right = [okT, okC, okD(0), m.d.length > 1 ? okD(1) : null].filter(x => x === true).length, total = 2 + m.d.length;
    const set = (key, v) => { setA(Object.assign({}, a, { [key]: v })); if (c) setC(false); };
    const st = ok => c ? (ok ? ' ok' : ' no') : '';
    const inp = (key, ok, label) => html`<label><span>${label}</span><input className=${'hf-mm6-in' + st(ok)} type="text" inputMode="numeric" autoComplete="off" spellCheck="false" maxLength="3" aria-label=${label} value=${a[key] == null ? '' : a[key]} onChange=${e => set(key, e.target.value)} /></label>`;
    return html`<div className="hf-mm6-dec hf-in">
      <div className="hf-mm6-tabs" dir="ltr" role="group" aria-label="Messages">${MSGS.map((x, j) => html`<button key=${j} aria-pressed=${String(j === k)} onClick=${() => setK(j)} aria-label=${'Message ' + (j + 1)}>${j + 1}</button>`)}</div>
      <div className="hf-mm6-bytes" dir="ltr">${m.b.map((x, j) => html`<span key=${j} className=${j === 0 ? 'st' : ''}>${x}</span>`)}</div>
      <div className="hf-mm6-types" dir="ltr">${TYPES.map((x, j) => html`<button key=${j} aria-pressed=${String(a.t === j)} className=${c && a.t === j ? (j === m.t ? 'ok' : 'no') : c && j === m.t ? 'ok' : ''} onClick=${() => set('t', j)}>${x}</button>`)}</div>
      <div className="hf-mm6-fields">
        ${inp('ch', okC, ar ? 'الـ channel' : 'Channel (1–16)')}
        ${inp('d0', okD(0), ar ? 'الـ data 1' : 'Data 1 (decimal)')}
        ${m.d.length > 1 ? inp('d1', okD(1), ar ? 'الـ data 2' : 'Data 2 (decimal)') : html`<label><span>${ar ? 'الـ data 2' : 'Data 2'}</span><span className="hf-mm6-none">${ar ? 'مفيش' : 'none'}</span></label>`}
      </div>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setC(true)} disabled=${a.t == null && a.ch == null && a.d0 == null}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const n = { t: m.t, ch: String(m.ch), d0: String(m.d[0]) }; if (m.d.length > 1) n.d1 = String(m.d[1]); setA(n); setC(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${c && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${total}</bdi> صح` : right + ' / ' + total + ' right'}</span>`}
      </div>
      ${c && html`<div className="hf-mm6-sol hf-in" dir="ltr">${m.sol.map((l, j) => html`<div key=${j}>${T6(l)}</div>`)}</div>`}
    </div>`;
  }

  // the two families of MIDI messages (notes §4) with their status bytes
  function Families() {
    const ar = useAr();
    const box = (title, chips) => html`<div><b>${title}</b><div className="hf-mm6-chips" dir="ltr">${chips.map(([c, n], i) => html`<span key=${i}><code>${c}</code>${n}</span>`)}</div></div>`;
    return html`<div className="hf-mm6-grp hf-in">
      ${box(ar ? 'الـ Channel messages: فيها رقم channel' : 'Channel messages: carry a channel number', [['8x–Ex', 'voice messages'], ['Bx + 121–127', 'mode messages']])}
      ${box(ar ? 'الـ System messages: مش خاصة بـ channel' : 'System messages: not channel specific', [['F8 FA FB FC FE FF', 'real-time'], ['F1 F2 F3 F6', 'common'], ['F0 … F7', 'exclusive (Sysex)']])}
    </div>`;
  }

  H.chapters.mm[6] = {
    title: 'MIDI and MPEG-4 Structured Audio', kicker: 'Chapter 6', run: 'midi and structured audio',
    ar: { title: 'الـ MIDI والـ MPEG-4 Structured Audio', kicker: 'الفصل 6', run: 'الـ MIDI والـ structured audio' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Reveal, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 6);
      const arL = (window.AR && window.AR.mm && window.AR.mm.lectures && window.AR.mm.lectures[6]) || {};
      const arQuiz = arL.quiz || [], arExtra = arL.extra || [];
      // the site's own practice questions (no src): this lecture has none of the doctor's questions
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      const find = re => {
        let i = (lec.quiz || []).findIndex(x => !x.src && re.test(strip(x.q)));
        if (i >= 0) return { q: lec.quiz[i], why: arQuiz[i] };
        i = (lec.extra || []).findIndex(x => !x.src && re.test(strip(x.q)));
        return i < 0 ? {} : { q: lec.extra[i], why: arExtra[i] };
      };
      const pq = (id, re) => { const r = find(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · warm-up (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('In Lecture 4 you worked out how big recorded sound is. In Lecture 5 you <b>made</b> sound from numbers with synthesis. This chapter puts the two together.',
            'في محاضرة 4 حسبت الصوت المتسجل حجمه قد إيه. وفي محاضرة 5 <b>عملت</b> صوت من أرقام بالـ synthesis. الفصل ده بيجمع الاتنين.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('You want to send a friend a one-minute piano piece. Plan A: send the recording. Plan B: send a list of which keys to press, when and how hard, and let <i>his</i> keyboard play it. Which is smaller? And what could go wrong with Plan B?',
            'عايز تبعت لصاحبك مقطوعة piano مدتها دقيقة. الخطة الأولى: تبعتله التسجيل. الخطة التانية: تبعتله لستة بأنهي keys يدوس، وإمتى، وبقوة قد إيه، والـ keyboard <i>بتاعه</i> هو اللي يعزف. أنهي واحدة أصغر؟ وإيه اللي ممكن يبوظ في الخطة التانية؟')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will decode real MIDI bytes by hand.', '<b>حل التمارين.</b> هتفك MIDI bytes حقيقية بإيدك.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are the traps that cost marks.', '<b>خلّي بالك!</b> دي الفخاخ اللي بتضيّع درجات.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">6</span><span className="t">${A ? html`الفصل السادس<br/>Multimedia` : html`Chapter six<br/>Multimedia`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Send the Sheet Music, Not the Song', 'ابعت النوتة، مش الأغنية')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('MIDI and MPEG-4 Structured Audio', 'الـ MIDI والـ MPEG-4 Structured Audio')}</p></div>
          <${Talk} who="mic">${X('One second of stereo CD sound is <b>176,400 bytes</b> of samples. I record every one of them.', 'ثانية واحدة stereo CD فيها <b>176,400 bytes</b> من الـ samples. وأنا بسجّلهم كلهم.')}</${Talk}>
          <${Talk} who="spk" flip=${true}>${X('A Note On in MIDI is <b>3 bytes</b>: <code>9C 50 7F</code>. I make the sound myself.', 'أما الـ Note On في الـ MIDI فهي <b>3 bytes</b> بس: <code>9C 50 7F</code>. وأنا اللي بطلّع الصوت بنفسي.')}</${Talk}>
          <${P}>${X('In this chapter you meet <b>MIDI</b>, learn to read its bytes like a machine, see why <b>General MIDI</b> exists, and end with <b>MPEG-4 Structured Audio</b>, where whole instruments travel as code.',
            'في الفصل ده هتتعرف على الـ <b>MIDI</b>، وتتعلم تقرا الـ bytes بتاعته زي المكنة، وتعرف ليه الـ <b>General MIDI</b> اتعمل، وتختم بالـ <b>MPEG-4 Structured Audio</b> اللي فيه الـ instruments نفسها بتتبعت كـ code.')}</${P}>
        `, { sec: t('What is MIDI?', 'يعني إيه MIDI؟') }),

        // 2 · what is MIDI
        page(html`
          <${H1}>${t('So what is MIDI?', 'يعني إيه MIDI أصلًا؟')}</${H1}>
          <${Def}>${X('<b>MIDI</b> is a <b>protocol</b> that enables computers, synthesisers, keyboards and other musical devices to <b>communicate</b> with each other.',
            'الـ <b>MIDI</b> هو <b>protocol</b> بيخلّي الكمبيوترات والـ synthesisers والـ keyboards وأي أجهزة موسيقية تانية <b>تتواصل</b> مع بعض.')}</${Def}>
          <${P} small=${true}>${X("It's no longer only for musicians. MIDI is a <b>very low bandwidth</b> alternative on the Web for sending music and some sound-effect data, and in modified form it is a <b>compression control language</b> (MPEG-4, HTML5).",
            'ومابقاش للموسيقيين بس. الـ MIDI بديل <b>bandwidth قليلة جدًا</b> على الـ Web لنقل الموسيقى وبعض الـ sound effects، وبشكل متعدّل بقى <b>compression control language</b> (في الـ <bdi dir="ltr">MPEG-4</bdi> والـ HTML5).')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('MIDI sends <b>instructions</b> (which note, how loud, which instrument), <b>not audio samples</b>. A MIDI file is not a recording.',
            'الـ MIDI بيبعت <b>تعليمات</b> (أنهي note، بصوت عالي قد إيه، أنهي instrument)، <b>مش audio samples</b>. ملف الـ MIDI مش تسجيل.')}</p></${Box}>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': audio is a recording of the concert; MIDI is the sheet music, and the client is the pianist.", 'تشبيه من عندنا: الـ audio تسجيل للحفلة، والـ MIDI هو النوتة الموسيقية، والـ client هو العازف.')}</${Hand}>
        `),

        // 3 · figure: samples vs instructions
        page(html`
          <${Fig} name="mm-6-instr" />
        `),

        // 4 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: a Recorded Audio file and a MIDI file argue about who is the better way to send music.", 'قعدة الليلة: ملف Audio متسجل وملف MIDI بيتخانقوا مين أحسن طريقة لبعت الموسيقى.')} />
          <${Chat} names=${[t('Recorded Audio', 'الـ Audio'), t('MIDI', 'الـ MIDI')]} lines=${A ? [
            [0, 'أنا بشيل <b>الصوت نفسه</b>: samples ورا بعض. الدقيقة الـ stereo CD مني <b><bdi dir="ltr">10,584,000</bdi> bytes</b>.'],
            [1, 'وأنا بشيل <b>تعليمات</b> بس. مقطوعة دقيقة فيها 1000 note حجمها عندي <b><bdi dir="ltr">6000</bdi> bytes</b>.'],
            [0, 'بس إنت مبتطلّعش صوت أصلًا!'],
            [1, 'صح. <b>مسؤولية إنتاج الصوت بتتنقل للـ client</b>: الـ synthesiser module أو الـ sampler أو الـ soundcard أو الـ software synth.'],
            [0, 'يعني الملف بتاعك هيطلع بنفس الصوت على كل جهاز؟'],
            [1, 'مش دايمًا، وده بالظبط اللي الـ <b>General MIDI</b> بيحلّه. هتقابله بعد شوية.'],
            [0, 'ماشي، بس أنا شبه الحقيقة.'],
            [1, 'وأنا <b>compression tool</b>. كام 100K bytes وbandwidth قليلة جدًا.']
          ] : [
            [0, "I carry <b>the sound itself</b>: samples, one after another. One minute of me in stereo CD quality is <b>10,584,000 bytes</b>."],
            [1, "I carry <b>instructions</b>. A one-minute piece with 1000 notes is <b>6000 bytes</b> of me."],
            [0, "But you don't even make a sound!"],
            [1, "Right. <b>The responsibility of producing the sound is moved to the client</b>: a synthesiser module, sampler, soundcard or software synth."],
            [0, "So will you sound the same on every machine?"],
            [1, "Not always. That's exactly what <b>General MIDI</b> fixes. You'll meet it soon."],
            [0, "Fine. But I sound like the real thing."],
            [1, "And I'm a <b>compression tool</b>: a few 100K bytes, very low bandwidth."]
          ]} />
        `, { sec: t('Audio vs MIDI', 'الـ Audio والـ MIDI') }),

        // 5 · the client, the web, the history
        page(html`
          <${H2}>${t('Who plays it, and where?', 'مين بيعزف، وفين؟')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>client</b> هو اللي بيطلّع الصوت: synthesiser module أو sampler أو soundcard أو software synth.',
            'معظم الـ <b>web browsers</b> بتعرف تتعامل مع الـ MIDI: بـ plugins زي QuickTime والـ <bdi dir="ltr">MPEG-4</bdi>، ومن <b>2013</b> فيه الـ <b>Web MIDI API</b> في HTML5.',
            'عمر الـ MIDI حوالي <b>40 سنة</b> (<bdi dir="ltr">2022/3</bdi>) ولسه بيتطور، زي الـ <b>MIDI 2.0</b> ("High Definition MIDI").',
            'حتى الـ iPad شغّل sequencer قديم بتاع Commodore.'
          ] : [
            'The <b>client</b> makes the sound: a synthesiser module, sampler, soundcard or software synth.',
            'Most <b>web browsers</b> handle MIDI: plugins such as QuickTime and MPEG-4, and since <b>2013</b> the <b>Web MIDI API</b> in HTML5.',
            'MIDI is about <b>40 years old</b> (2022/3) and still evolving, e.g. <b>MIDI 2.0</b> ("High Definition MIDI").',
            'An iPad even played an old Commodore sequencer.'
          ]} />
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['يعني الـ MIDI نوع من الـ audio compression زي MP3؟', 'لأ. الـ MIDI مش بيضغط samples. هو بيبعت <b>تعليمات</b> بدل الصوت، وعشان كده حجمه صغير جدًا. ده المقصود بإنه "compression tool".'],
            ['ومين بيحوّل التعليمات لصوت؟', 'الـ <b>client</b>. الـ synth اللي عندك هو اللي بيعزف.']
          ] : [
            ['So is MIDI a kind of audio compression, like MP3?', 'No. MIDI doesn\'t squeeze samples. It sends <b>instructions</b> instead of sound, which is why it is so small. That is what "compression tool" means here.'],
            ['Then who turns the instructions into sound?', 'The <b>client</b>. Your own synth plays them.']
          ]} />
        `),

        // 6 · components of a MIDI system
        page(html`
          <${H1}>${t('Meet the band: a MIDI system', 'اتعرّف على الفرقة: الـ MIDI system')}</${H1}>
          <${UL} items=${A ? [
            'الـ <b>Synthesiser أو الـ Sampler</b>: <b>sound generator</b> (pitch وloudness وtone colour). في الكورس ده الـ "synthesiser" يعني <b>وحدة توليد الـ tone</b>. ممكن يبقى software.',
            'الـ <b>Sequencer</b>: وحدة hardware لوحدها أو software على الكمبيوتر.',
            'الـ <b>Computer</b>: <b>قلب</b> الـ system؛ بيتحكم في الـ <b>scheduling والـ synchronisation والـ recording</b>. الـ sequencers دلوقتي جوه الـ <b>DAWs</b> (Cubase وLogic وSonar وLive وReason).',
            'الـ <b>Control input devices</b>: غالبًا keyboard (sustain وpitch bend وmodulation وaftertouch)، أو جيتار متعدّل، أو wind أو breath أو bite controller.',
            'الـ <b>MIDI interfaces</b>: بتوصّل الأجهزة بالكمبيوتر بـ MIDI cable أو USB أو Ethernet أو Bluetooth أو WiFi.',
            'الـ <b>Control output devices</b>: الإضاءة، والـ robotics (الـ <b>Orchestrion</b> بتاع Pat Metheny)، والـ video، والـ <bdi dir="ltr">MPEG-4</bdi> compression.'
          ] : [
            '<b>Synthesiser / Sampler</b>: a <b>sound generator</b> (pitch, loudness, tone colour). In this course "synthesiser" = the <b>tone generation unit</b>. Can be software.',
            '<b>Sequencer</b>: a stand-alone hardware unit or software on a computer.',
            '<b>Computer</b>: the <b>heart</b> of the system; controls <b>scheduling, synchronisation and recording</b>. Sequencers now live inside <b>DAWs</b> (Cubase, Logic, Sonar, Live, Reason).',
            '<b>Control input devices</b>: usually a keyboard (sustain, pitch bend, modulation, aftertouch), or a customised guitar, wind controller, breath, motion or bite controllers.',
            '<b>MIDI interfaces</b>: connect devices to the computer by MIDI cable, USB, Ethernet, Bluetooth or WiFi.',
            '<b>Control output devices</b>: MIDI controls more than sound: lighting, robotics (Pat Metheny\'s <b>Orchestrion</b>), video, MPEG-4 compression.'
          ]} />
        `, { sec: t('The MIDI system', 'الـ MIDI system') }),

        // 7 · figure: the system
        page(html`
          <${Fig} name="mm-6-system" />
        `),

        // 8 · basic concepts
        page(html`
          <${H2}>${t('Six words a MIDI person uses', 'ست كلمات لازم تعرفهم')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Track</b>: بيستخدمه الـ sequencer عشان ينظّم التسجيلات؛ ممكن تشغّله أو تطفيه وإنت بتسجّل أو بتشغّل.',
            'الـ <b>Channel</b>: بيفصل المعلومات. فيه <b>16 channel في الـ "cable" الواحد</b>، ورقم الـ channel <b>متكوّد جوه كل message</b>.',
            'الـ <b>Timbre</b>: نوعية الصوت (flute أو cello…). والـ <b>Multitimbral</b> يعني يعزف أصوات مختلفة كتير في نفس الوقت.',
            'الـ <b>Pitch</b>: الـ note الموسيقية اللي الـ instrument بيعزفها.',
            'الـ <b>Voice</b>: الجزء من الـ synthesiser اللي <b>بيطلّع الصوت</b>. فيه voices كتير (12، 20، 24، 36…) شغالين لوحدهم وفي نفس الوقت.',
            'الـ <b>Patch</b>: الـ <b>control settings</b> اللي بتحدد timbre معيّن.'
          ] : [
            '<b>Track</b>: organises recordings in a sequencer; tracks can be turned on/off when recording or playing back.',
            '<b>Channel</b>: separates information. <b>16 channels in one "cable"</b>; the channel number is <b>coded into each message</b>.',
            '<b>Timbre</b>: the quality of the sound (flute, cello…). <b>Multitimbral</b> = plays many different sounds at the same time.',
            '<b>Pitch</b>: the musical note the instrument plays.',
            '<b>Voice</b>: the portion of the synthesiser that <b>produces sound</b>. Synths have many (12, 20, 24, 36…), each working independently and simultaneously.',
            '<b>Patch</b>: the <b>control settings</b> that define a particular timbre.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Voice</b> = the part that makes the sound. <b>Patch</b> = the settings that define a timbre. <b>Timbre</b> = the quality of the sound itself. Don\'t swap them.',
            'الـ <b>Voice</b> هو الجزء اللي بيطلّع الصوت. والـ <b>Patch</b> هو الإعدادات اللي بتحدد الـ timbre. والـ <b>Timbre</b> هو نوعية الصوت نفسه. متلخبطش بينهم.')}</p></${Box}>
        `, { sec: t('Basic concepts', 'المفاهيم الأساسية') }),

        // 9 · figure: concepts
        page(html`
          <${Fig} name="mm-6-concepts" />
        `),

        // 10 · connectors + sort
        page(html`
          <${H2}>${t('Three holes in the back: IN, OUT, THRU', 'تلات فتحات من ورا: IN وOUT وTHRU')}</${H2}>
          <${P} small=${true}>${X('The standard interface is USB or, on older units, <b>three 5-pin ports</b>. Modern devices bundle them and connect directly (USB/Ethernet, Bluetooth/WiFi).',
            'الـ interface الـ standard هو USB، أو في الأجهزة القديمة <b>3 ports بـ 5 pins</b>. الأجهزة الحديثة بتجمّعهم وبتتوصل على طول (<bdi dir="ltr">USB/Ethernet</bdi> أو <bdi dir="ltr">Bluetooth/WiFi</bdi>).')}</${P}>
          <${Box} kind="pencil"><p className="hf-p small">${t('Which port? Tap IN, OUT or THRU.', 'أنهي port؟ دوس IN أو OUT أو THRU.')}</p></${Box}>
          <${Sort} id="ports" bins=${[['IN', 'MIDI IN'], ['OUT', 'MIDI OUT'], ['THRU', 'MIDI THROUGH']]} items=${A ? [
            ['بيستقبل كل الـ MIDI data', 0],
            ['بيبعت الـ data اللي الجهاز بيولّدها بنفسه', 1],
            ['بيعمل echo للـ data اللي وصلت على الـ IN', 2],
            ['منه بتطلع الـ keys اللي عزفتها على الـ master keyboard', 1],
            ['فيه بيدخل الـ OUT بتاع الـ interface', 0]
          ] : [
            ['Receives all MIDI data', 0],
            ['Transmits the data the device generates itself', 1],
            ['Echoes the data received at MIDI IN', 2],
            ['The keys you play on the master keyboard leave through it', 1],
            ["Where the interface's OUT plugs into the keyboard", 0]
          ]} />
        `, { sec: t('Connectors', 'الـ Connectors') }),

        // 11 · figure: ports
        page(html`
          <${Fig} name="mm-6-ports" />
        `),

        // 12 · message structure
        page(html`
          <${H1}>${t('Inside a MIDI message', 'جوه الـ MIDI message')}</${H1}>
          <${P} small=${true}>${X('A <b>Note On</b> says which key and which channel with just <b>3 hexadecimal numbers</b>. Every message = <b>one status byte + up to two data bytes</b>.',
            'الـ <b>Note On</b> بتقول أنهي key وأنهي channel بـ <b>3 أرقام hexadecimal</b> بس. وكل message عبارة عن <b>status byte واحد + لحد اتنين data bytes</b>.')}</${P}>
          <${Code} lines=${[['1 mmm cccc', t('status byte', 'الـ status byte')], ['0 ddd dddd', t('data byte', 'الـ data byte')]]} />
          <${UL} items=${A ? [
            'الـ <b>status byte</b>: الـ MSB بـ <b>1</b>، والـ <b>3 bits</b> اللي بعده نوع الـ message، والـ <b>4 low-order bits</b> هما الـ channel (يعني 16 channel).',
            'الـ <b>data byte</b>: الـ MSB بـ <b>0</b>، فالقيمة 7 bits، يعني من <b>0 لـ 127</b> (<bdi dir="ltr">hex 00–7F</bdi>).',
            'وعشان كده الـ status bytes دايمًا من <bdi dir="ltr">80</bdi> لـ <bdi dir="ltr">FF</bdi>.'
          ] : [
            '<b>Status byte</b>: MSB = <b>1</b>; the next <b>3 bits</b> = which message; the <b>4 low-order bits</b> = channel (4 bits → 16 channels).',
            '<b>Data byte</b>: MSB = <b>0</b>, so 7 bits of value: <b>0–127</b> (hex 00–7F).',
            'So status bytes are always hex <b>80–FF</b>.'
          ]} />
          <${Hand} tilt=${true}>${t('Our trick: the first bit is a flag. 1 = "new message starts here".', 'حيلة من عندنا: أول bit ده علامة، والـ 1 معناها إن فيه message جديدة بتبدأ هنا.')}</${Hand}>
        `, { sec: t('MIDI messages', 'الـ MIDI messages') }),

        // 13 · figure: bits
        page(html`
          <${Fig} name="mm-6-bits" />
        `),

        // 14 · channel numbering
        page(html`
          <${Box} kind="watch" title=${t('Watch it: channel 13 is written C', 'خلّي بالك: رقم الـ channel مش هو الـ nibble')}><p className="hf-p small">${X('The channel nibble holds <b>0–15</b>, but musicians number channels <b>1–16</b>. So the nibble is <b>channel − 1</b>: C = 12 means <b>channel 13</b>, and channel 10 is written <b>9</b>.',
            'الـ nibble بتاع الـ channel بيشيل من <b>0 لـ 15</b>، بس الموسيقيين بيرقّموا الـ channels من <b>1 لـ 16</b>. يعني الـ nibble هو <bdi dir="ltr"><b>channel − 1</b></bdi>: الـ C يعني 12 يعني <b>channel 13</b>، والـ channel 10 بتتكتب <b>9</b>.')}</p></${Box}>
          <${Box} kind="watch" title=${t('Watch it: the bytes are hex', 'خلّي بالك: الـ bytes بالـ hex')}><p className="hf-p small">${X('<code>50</code> is not fifty: 5×16 + 0 = <b>80</b>. <code>64</code> is 6×16 + 4 = <b>100</b>. Convert before you answer.',
            'الـ <code>50</code> مش خمسين: <bdi dir="ltr">5×16 + 0 = 80</bdi>. والـ <code>64</code> قيمتها <bdi dir="ltr">6×16 + 4 = 100</bdi>. حوّل قبل ما تجاوب.')}</p></${Box}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Why can a receiver that joins in the middle of a stream always find where the next message starts?', 'ليه الجهاز اللي بيدخل في نص الـ stream يقدر دايمًا يعرف الـ message الجاية بتبدأ منين؟')}</p></${Box}>
          <${Talk} who="spk" flip=${true}>${X('I just wait for a byte with its top bit set to 1.', 'بستنى أي byte أول bit فيه بـ 1.')}</${Talk}>
        `),

        // 15 · families
        page(html`
          <${H2}>${t('Two families of messages', 'عيلتين من الـ messages')}</${H2}>
          <${P} small=${true}>${X('<b>Channel messages</b> split into <b>voice</b> and <b>mode</b> messages. <b>System messages</b> split into <b>common</b>, <b>real-time</b> and <b>exclusive</b>.',
            'الـ <b>Channel messages</b> بتتقسم لـ <b>voice</b> و<b>mode</b>. والـ <b>System messages</b> بتتقسم لـ <b>common</b> و<b>real-time</b> و<b>exclusive</b>.')}</${P}>
          <${Families} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Mode messages are <b>channel</b> messages (they carry a channel). Sysex is a <b>system</b> message.', 'الـ mode messages دي <b>channel</b> messages (فيها channel). أما الـ Sysex فهي <b>system</b> message.')}</p></${Box}>
        `, { sec: t('Message families', 'عيلات الـ messages') }),

        // 16 · voice messages
        page(html`
          <${H2}>${t('Channel voice messages', 'الـ Channel voice messages')}</${H2}>
          <${P} small=${true}>${X('Sent on <b>individual channels</b>, not globally to all devices. They tell the receiver to assign sounds to its voices, turn notes on and off, and alter the sound of the active notes.',
            'بتتبعت على <b>channels منفردة</b>، مش global لكل الأجهزة. بتقول للـ receiver يوزّع الأصوات على الـ voices بتاعته، ويشغّل ويطفي notes، ويغيّر صوت الـ notes الشغالة.')}</${P}>
          <${VoiceTable} />
          <${Hand} arrow="up" red=${true}>${t('the shaded rows have only ONE data byte: 2 bytes in all', 'الصفوف المتلونة فيها data byte واحد بس، يعني 2 bytes')}</${Hand}>
        `, { sec: t('Voice and mode messages', 'الـ voice والـ mode messages') }),

        // 17 · mode messages
        page(html`
          <${H2}>${t('Channel mode messages: Control Change in disguise', 'الـ Channel mode messages: Control Change متنكّر')}</${H2}>
          <${Def}>${X('<b>Channel mode messages</b> are a special case of <b>Control Change</b> (<b>Bx</b>, binary 1011nnnn). The difference is the <b>first data byte</b>: values <b>121 to 127</b> are reserved for mode messages. They decide <b>how an instrument processes voice messages</b>.',
            'الـ <b>Channel mode messages</b> حالة خاصة من الـ <b>Control Change</b> (<bdi dir="ltr"><b>Bx</b>, 1011nnnn</bdi>). الفرق في <b>أول data byte</b>: القيم من <b>121 لـ 127</b> محجوزة للـ mode messages. وهي بتحدد <b>الـ instrument بيعالج الـ voice messages إزاي</b>.')}</${Def}>
          <${Code} lines=${[['B3 07 64', t('7 < 121: control change', 'يعني control change، لأن الـ 7 أقل من 121')], ['B0 7B 00', t('7B = 123: mode message', 'يعني mode message، لأن الـ 7B قيمتها 123')]]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('A mode message has <b>no status byte of its own</b>: it is still Bx. Look at data byte 1.<br/><b>Program change (Cx)</b> and <b>channel pressure (Dx)</b> are <b>2 bytes</b>; every other voice message is 3.',
            'الـ mode message <b>ملهاش status byte خاص بيها</b>: هي برضه Bx. بص على أول data byte.<br/>والـ <b>program change</b> (<bdi dir="ltr">Cx</bdi>) والـ <b>channel pressure</b> (<bdi dir="ltr">Dx</bdi>) حجمهم <b>2 bytes</b>؛ وباقي الـ voice messages 3.')}</p></${Box}>
          <${Talk} who="dev">${t('So I can\'t tell a mode message from its first byte alone.', 'يعني مقدرش أعرف الـ mode message من أول byte لوحده.')}</${Talk}>
        `),

        // 18 · figure: builder
        page(html`
          <${Fig} name="mm-6-builder" />
        `),

        // 19 · the decoding rule, worked
        page(html`
          <${H1}>${t('Read bytes like a synth', 'اقرا الـ bytes زي الـ synth')}</${H1}>
          <${Def}>${X('<b>The rule:</b> first hex digit = message type, second hex digit = <b>channel − 1</b>. Then turn each data byte from hex into decimal.',
            '<b>القاعدة:</b> أول hex digit هو نوع الـ message، وتاني hex digit هو <bdi dir="ltr"><b>channel − 1</b></bdi>. وبعدين حوّل كل data byte من hex لـ decimal.')}</${Def}>
          <${P} small=${true}>${X('Worked example from the notes: <code>80 3C 40</code>.', 'مثال محلول من النوتس: <code>80 3C 40</code>.')}</${P}>
          <${Code} lines=${[['80 → 8 | 0', t('Note Off, channel 1', 'يعني Note Off على channel 1')], ['3C = 3×16 + 12', t('= 60, the key', 'يعني 60، وده الـ key')], ['40 = 4×16 + 0', t('= 64, release velocity', 'يعني 64، الـ release velocity')]]} />
          <${P} small=${true}>${X('And backwards: Note On, key 38 (Acoustic Snare), velocity 100, channel 10 → 9 and 10 − 1 = 9 → <code>99</code>; 38 = 2×16 + 6 → <code>26</code>; 100 = 6×16 + 4 → <code>64</code>. Message: <b>99 26 64</b>.',
            'والعكس: Note On بـ key 38 (الـ Acoustic Snare) وvelocity 100 على channel 10. الحساب:<span class="ltr">9 | 10 − 1 = 9 → 99</span><span class="ltr">38 = 2×16 + 6 → 26</span><span class="ltr">100 = 6×16 + 4 → 64</span>والـ message هي <b><bdi dir="ltr">99 26 64</bdi></b>.')}</${P}>
          <${Hand} tilt=${true}>${t('Our trick: hex → decimal = first digit × 16 + second digit (A=10 … F=15).', 'حيلة من عندنا: من hex لـ decimal يعني أول digit × 16 + التاني (A=10 … F=15).')}</${Hand}>
        `, { sec: t('Decoding messages', 'فك الـ messages') }),

        // 20 · be the decoder
        page(html`
          <${Box} kind="pencil" title=${t('Be the MIDI decoder', 'خليك إنت الـ MIDI decoder')}><p className="hf-p small">${t('Seven messages: pick the type, then type the channel and the data in decimal.', 'سبع messages: اختار النوع، واكتب الـ channel والـ data بالـ decimal.')}</p></${Box}>
          <${Decoder} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 21 · encode
        page(html`
          <${Box} kind="pencil" title=${t('Now the other way: write the bytes', 'دلوقتي بالعكس: اكتب الـ bytes')}><p className="hf-p small">${t('Work each one out on paper first, then reveal.', 'احسب كل واحدة في ورقة الأول، وبعدين اكشف.')}</p></${Box}>
          <${P} small=${true}>${X('<b>1.</b> Note Off, channel 6, key 64, velocity 0', '<b>1.</b> الـ Note Off على channel 6، والـ key 64، والـ velocity 0')}</${P}>
          <${Reveal} id="enc1"><${Code} lines=${[['85 40 00', t('8 | 6 − 1 = 5; 64 = 4×16 → 40', 'الـ channel 6 تبقى 5، والـ 64 تبقى 40')]]} /></${Reveal}>
          <${P} small=${true}>${X('<b>2.</b> Note On, channel 1, key 60, velocity 64', '<b>2.</b> الـ Note On على channel 1، والـ key 60، والـ velocity 64')}</${P}>
          <${Reveal} id="enc2"><${Code} lines=${[['90 3C 40', t('60 = 3×16 + 12 → 3C', 'الـ 60 تبقى 3C')]]} /></${Reveal}>
          <${P} small=${true}>${X('<b>3.</b> Control change on channel 16, controller 7, value 127', '<b>3.</b> الـ Control change على channel 16، والـ controller 7، والـ value 127')}</${P}>
          <${Reveal} id="enc3"><${Code} lines=${[['BF 07 7F', t('16 − 1 = 15 = F; 127 → 7F', 'الـ channel 16 تبقى F، والـ 127 تبقى 7F')]]} /></${Reveal}>
          <${Grow} />
          <${Hand} red=${true}>${t('the commonest slip: writing 86 for channel 6', 'أشهر غلطة: إنك تكتب 86 للـ channel 6')}</${Hand}>
        `),

        // 22 · size
        page(html`
          <${H1}>${t('Why MIDI is a compression tool, in numbers', 'ليه الـ MIDI compression tool، بالأرقام')}</${H1}>
          <${P} small=${true}>${X('A one-minute piece with <b>1000 notes</b>: each note is a Note On and a Note Off, 3 bytes each.', 'مقطوعة مدتها دقيقة فيها <b>1000 note</b>: كل note عبارة عن Note On وNote Off، كل واحدة 3 bytes.')}</${P}>
          <${Code} lines=${['MIDI: (1000 + 1000) × 3', ['     = 6,000 bytes', ''], 'CD:   44100 × 16 × 2 × 60 / 8', ['     = 10,584,000 bytes', t('≈ 10 MB', 'حوالي 10 MB')]]} />
          <p className="hf-mm6-eq hf-in">${A ? html`الـ CD أكبر بحوالي <bdi dir="ltr">1,764</bdi> مرة` : html`CD is about <bdi>1,764</bdi> times bigger`}</p>
          <${Grow} />
          <${Box} kind="pencil"><p className="hf-p small">${X('<b>500 notes</b> (each On + Off) plus <b>4 Program Changes</b> (2 bytes each, remember): how many bytes?', 'عندك <b>500 note</b> (كل واحدة On وOff) و<b>4 Program Change</b> (كل واحدة 2 bytes). كام byte؟')}</p>
            <${Reveal} id="size1"><p className="hf-p small">${X('1000 × 3 + 4 × 2 = 3000 + 8 = <b>3008 bytes</b>.', 'الإجابة:<span class="ltr">1000 × 3 + 4 × 2 = 3000 + 8 = 3008 bytes</span>')}</p></${Reveal}></${Box}>
        `, { sec: t('Size and speed', 'الحجم والسرعة') }),

        // 23 · figure: size
        page(html`
          <${Fig} name="mm-6-size" />
        `),

        // 24 · wire
        page(html`
          <${H2}>${t('How long does a message take?', 'الـ message بتاخد وقت قد إيه؟')}</${H2}>
          <${P} small=${true}>${X('A standard MIDI 1.0 fact, <b>not on the slides</b>: the serial link runs at <b>31.25 kbaud</b>, each byte is <b>10 bits</b> (start + 8 data + stop). 3 bytes = 30 bits / 31,250 bit/s = <b>0.96 ms</b>, about 1041 messages a second.',
            'معلومة من MIDI 1.0، <b>مش في السلايدز</b>: الـ link سرعته <b>31.25 kbaud</b> وكل byte <b>10 bits</b> (start و8 data وstop)، فالـ message اللي 3 bytes بتاخد <b><bdi dir="ltr">0.96 ms</bdi></b>، يعني حوالي 1041 message في الثانية.')}</${P}>
          <${Fig} name="mm-6-wire" />
        `),

        // 25 · system messages
        page(html`
          <${H1}>${t('System messages: for everyone', 'الـ System messages: للكل')}</${H1}>
          <${P} small=${true}>${X('They carry information that is <b>not channel specific</b>: timing signals for synchronisation, positioning in pre-recorded sequences, and detailed setup for the destination device (sounds, patch names).',
            'بتشيل معلومات <b>مش خاصة بـ channel</b>: timing signals للـ synchronisation، والـ positioning في sequences متسجلة، والـ setup التفصيلي للجهاز اللي بيستقبل (الأصوات وأسماء الـ patches).')}</${P}>
          <div className="hf-mm6-grp hf-in">
            <div><b>${t('Real-time: timing and synchronisation', 'الـ Real-time: للـ timing والـ synchronisation')}</b><div className="hf-mm6-chips" dir="ltr">${[['F8', 'Timing Clock'], ['FA', 'Start'], ['FB', 'Continue'], ['FC', 'Stop'], ['FE', 'Active Sensing'], ['FF', 'Reset']].map(([c, n], i) => html`<span key=${i}><code>${c}</code>${n}</span>`)}</div></div>
            <div><b>${t('Common: unrelated messages (data bytes)', 'الـ Common: رسايل ملهاش علاقة ببعض (عدد الـ data bytes)')}</b><div className="hf-mm6-chips" dir="ltr">${[['F1', 'MIDI Timing Code (1)'], ['F2', 'Song Position Pointer (2)'], ['F3', 'Song Select (1)'], ['F6', 'Tune Request (0)']].map(([c, n], i) => html`<span key=${i}><code>${c}</code>${n}</span>`)}</div></div>
            <div><b>${t('Exclusive (Sysex): system dependent', 'الـ Exclusive (Sysex): بيعتمد على الـ system')}</b><div className="hf-mm6-chips" dir="ltr"><span><code>F0</code>Sysex Start</span><span>0xxxxxxx …</span><span><code>F7</code>Sysex End</span></div></div>
          </div>
          <${P} small=${true}>${X('<b>Sysex</b> is for things that can\'t be standardised (system-dependent creation and organisation of sounds; not GM compliant). An addition to the original spec: a stream of bytes with high bits 0, bracketed by <b>F0</b> and <b>F7</b>.',
            'الـ <b>Sysex</b> للحاجات اللي مينفعش تتعمل standard (طريقة إنشاء وتنظيم الأصوات الخاصة بكل system؛ مش GM compliant). إضافة على الـ spec الأصلي: stream من bytes الـ high bit بتاعها 0، بين <b>F0</b> و<b>F7</b>.')}</${P}>
        `, { sec: t('System messages', 'الـ System messages') }),

        // 26 · figure: system bytes
        page(html`
          <${H2}>${t('Tap through F0 to FF', 'دوس على الـ bytes من F0 لـ FF')}</${H2}>
          <${Fig} name="mm-6-sysbytes" />
          <${Hand} arrow="up" red=${true}>${t('F7 ends a Sysex. It is not a real-time message.', 'الـ F7 بيقفل الـ Sysex. مش real-time message.')}</${Hand}>
        `),

        // 27 · sort system bytes
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Sort the bytes: <b>RT</b> real-time, <b>CO</b> common, <b>EX</b> exclusive, or <b>CH</b> a channel message.', 'صنّف كل byte: الـ <b>RT</b> يعني real-time، والـ <b>CO</b> يعني common، والـ <b>EX</b> يعني exclusive، والـ <b>CH</b> يعني channel message.')}</p></${Box}>
          <${Sort} id="sys" bins=${[['RT', 'System real-time'], ['CO', 'System common'], ['EX', 'System exclusive'], ['CH', 'Channel message']]} items=${A ? [
            ['الـ Timing Clock <code>F8</code>', 0], ['الـ Song Position Pointer <code>F2</code>', 1], ['الـ stream بين <code>F0</code> و<code>F7</code>', 2], ['الـ Stop <code>FC</code>', 0],
            ['الـ Note On <code>9C 50 7F</code>', 3], ['الـ Tune Request <code>F6</code>', 1], ['الـ mode message <code>B0 7B 00</code>', 3],
            ['الـ Song Select <code>F3</code>', 1]
          ] : [
            ['<code>F8</code> Timing Clock', 0], ['<code>F2</code> Song Position Pointer', 1], ['<code>F0</code> … <code>F7</code> stream', 2], ['<code>FC</code> Stop', 0],
            ['<code>9C 50 7F</code> Note On', 3], ['<code>F6</code> Tune Request', 1], ['<code>B0 7B 00</code> mode message', 3],
            ['<code>F3</code> Song Select', 1]
          ]} />
        `),

        // 28 · general MIDI
        page(html`
          <${H1}>${t('General MIDI: same song, any synth', 'الـ General MIDI: نفس الأغنية على أي synth')}</${H1}>
          <${P} small=${true}>${X('<b>The problem:</b> MIDI music may not sound the same everywhere. Program 1 on your synth could be a piano and on mine a trumpet.',
            '<b>المشكلة:</b> موسيقى الـ MIDI ممكن متطلعش بنفس الصوت في كل حتة. الـ program 1 عندك ممكن يبقى piano وعندي trumpet.')}</${P}>
          <p className="hf-mm6-eq hf-in" dir="ltr">GM = MIDI + Instrument Patch Map + Percussion Key Map</p>
          <${P} small=${true}>${t('So a piece sounds (more or less) the same anywhere. A GM device must:', 'عشان المقطوعة تطلع (تقريبًا) بنفس الصوت في أي مكان. والجهاز الـ GM لازم:')}</${P}>
          <${UL} items=${A ? [
            'يدعم كل الـ <b>16 channel</b>.',
            'كل channel تعزف instrument مختلف (<b>multitimbral</b>).',
            'كل channel تعزف notes كتير (<b>polyphony</b>).',
            'فيه على الأقل <b>24 voice</b> بيتوزعوا dynamically بالكامل (غالبًا 64 أو 128) على كل الـ channels.'
          ] : [
            'support all <b>16 channels</b>;',
            'let each channel play a different instrument (<b>multitimbral</b>);',
            'let each channel play many notes (<b>polyphony</b>);',
            'have at least <b>24</b> fully dynamically allocated voices (usually 64/128) shared across all channels.'
          ]} />
          <${Hand} tilt=${true}>${t("The 'program 1 = piano vs trumpet' clash is our example; the problem itself is the slide's.", 'مثال الـ piano والـ trumpet ده من عندنا؛ المشكلة نفسها من السلايد.')}</${Hand}>
        `, { sec: t('General MIDI', 'الـ General MIDI') }),

        // 29 · figure: patch map
        page(html`
          <${Fig} name="mm-6-patch" />
        `),

        // 30 · percussion map
        page(html`
          <${H2}>${t('The percussion key map', 'الـ percussion key map')}</${H2}>
          <${P} small=${true}>${X('<b>47 percussion sounds</b> on keys <b>35–81</b>, sent on <b>channel 10</b> by default (other channels possible). Each key is a <b>switch</b> with no pitch information; it can even trigger video (VJ).',
            '<b>47 صوت percussion</b> على الـ keys من <b>35 لـ 81</b>، بيتبعتوا على <b>channel 10</b> by default (وممكن channels تانية). كل key عبارة عن <b>switch</b> من غير pitch information؛ وممكن كمان يشغّل video (VJ).')}</${P}>
        `),
        page(html`
          <${Fig} name="mm-6-drums" />
        `),

        // 31 · match the numbers
        page(html`
          <${H2}>${t('Numbers that get mixed up', 'أرقام بتتلخبط')}</${H2}>
          <${P} small=${true}>${t('Tap a number, then what it counts.', 'دوس على الرقم، وبعدين على معناه.')}</${P}>
          <${Match} id="nums" left=${['16', '128', '47', '24', '10', '<bdi dir="ltr">121–127</bdi>']}
            right=${A ? ['أقل عدد voices في جهاز الـ GM', 'عدد الـ instruments في الـ GM patch map', 'قيم أول data byte في الـ Bx اللي بتعمل mode message', 'عدد الـ channels اللي جهاز الـ GM لازم يدعمها', 'الـ channel الافتراضية للـ percussion', 'عدد الأصوات في الـ percussion key map']
              : ['Minimum voices in a GM device', 'Instruments in the GM patch map', 'First data byte of Bx that makes a mode message', 'Channels a GM device must support', 'Default channel for key-based percussion', 'Sounds in the percussion key map']}
            answer=${[3, 1, 5, 0, 4, 2]} />
          <${Grow} />
          <${Hand} red=${true}>${t('Patch map 1–128 (16 × 8). Drum keys 35–81 (47 of them).', 'الـ patch map من 1 لـ 128 (16 × 8). والـ drum keys من 35 لـ 81 (47 key).')}</${Hand}>
        `),

        // 32 · limitations
        page(html`
          <${H1}>${t("MIDI's limits, and three ways out", 'حدود الـ MIDI، وتلات حلول')}</${H1}>
          <${UL} items=${A ? [
            'عدد <b>channels وcontrollers محدود</b>.',
            'الـ <b>resolution محدودة</b>: معظم أرقام الـ MIDI <bdi dir="ltr">8&#8209;bit</bdi>.'
          ] : [
            'A limited number of <b>channels and controllers</b>.',
            'Limited <b>resolution</b>: most MIDI numbers are 8-bit.'
          ]} />
          <${P} small=${true}>${t('Solutions on the slide:', 'الحلول اللي في السلايد:')}</${P}>
          <${UL} items=${A ? [
            'ندمج قيمتين data كـ <b>LSB وMSB</b>، فيبقى عندنا range <b><bdi dir="ltr">16&#8209;bit</bdi></b> (زي ما السلايد بتقول).',
            'الـ <b>Open Sound Control (OSC)</b>.',
            'الـ <b>MIDI 2.0</b>، الـ High Definition MIDI.'
          ] : [
            'Combine two data values as <b>LSB and MSB</b>: a <b>16-bit range</b> (per the slide).',
            '<b>Open Sound Control (OSC)</b>.',
            '<b>MIDI 2.0</b>, High Definition MIDI.'
          ]} />
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['بس الـ data byte فيه 7 bits قيمة بس، إزاي يبقى <bdi dir="ltr">8&#8209;bit</bdi>؟', 'ملاحظة في محلها. النوتس بتنقل كلام السلايد زي ما هو، وكاتبة إن الـ range اللي هو <bdi dir="ltr">16&#8209;bit</bdi> ده "زي ما السلايد بتقول". في الامتحان جاوب بأرقام السلايد.']
          ] : [
            ['But a data byte has only 7 value bits. Why "8-bit"?', 'Good catch. The notes keep the slide\'s wording ("8-bit", and a "16-bit range", "per the slide"). In the exam, answer with the slide\'s numbers.']
          ]} />
        `, { sec: t('Limitations', 'العيوب') }),

        // 33 · figure: MSB/LSB
        page(html`
          <${H2}>${t('Two bytes, one bigger number', 'اتنين bytes، رقم واحد أكبر')}</${H2}>
          <${Fig} name="mm-6-msblsb" />
        `),

        // 34 · MPEG-4 structured audio
        page(html`
          <${H1}>${t('MPEG-4 Structured Audio: send the instrument too', 'الـ MPEG-4 Structured Audio: ابعت الآلة كمان')}</${H1}>
          <${P} small=${true}>${X('MPEG-4 audio combines <b>compression, synthesis and MIDI</b>: encode <b>what note to play and how to play it</b> with a small number of parameters. That is a much greater reduction than encoding audio bits; creating the audio is left to the generation side.',
            'الـ <bdi dir="ltr">MPEG-4</bdi> audio بيجمع <b>الـ compression والـ synthesis والـ MIDI</b>: بيعمل encode لـ <b>أنهي note تتعزف وتتعزف إزاي</b> بعدد صغير من الـ parameters. وده تقليل أكبر بكتير من الـ encoding للـ audio bits؛ وإنتاج الصوت بيتساب للـ generation side.')}</${P}>
          <${Box} kind="bullets" title=${t('The 6 Structured Audio tools', 'الـ 6 Structured Audio tools')}><ul className="hf-ul">${(A ? [
            'الـ <b>SAOL</b>: الـ Orchestra Language',
            'الـ <b>SASL</b>: الـ Score Language',
            'الـ <b>SASBF</b>: الـ Sample Bank Format',
            'الـ <b>MIDI semantics</b>: subset من الـ MIDI بيتحكم في الـ SAOL',
            'الـ <b>Scheduler</b>: إزاي الأجزاء تتجمع وتطلّع صوت',
            'الـ <b>AudioBIFS</b>: جزء من الـ BIFS، بيبني الـ soundtrack بـ tools وeffects'
          ] : [
            '<b>SAOL</b>: Orchestra Language',
            '<b>SASL</b>: Score Language',
            '<b>SASBF</b>: Sample Bank Format',
            '<b>MIDI semantics</b>: control SAOL with a subset of MIDI',
            '<b>Scheduler</b>: how the parts combine to create sound',
            '<b>AudioBIFS</b>: part of BIFS; builds soundtracks with tools and effects'
          ]).map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>
        `, { sec: t('MPEG-4 Structured Audio', 'الـ MPEG-4 Structured Audio') }),

        // 35 · figure: SA tools
        page(html`
          <${P} small=${true}>${X('MPEG-4 is newer than MP3, covers everything from very low bit-rate speech to full-bandwidth high-quality audio, and has built-in anti-piracy measures.',
            'الـ <bdi dir="ltr">MPEG-4</bdi> أحدث من MP3، وبيغطي من speech بـ bit-rate قليل جدًا لحد audio بجودة عالية وfull bandwidth، وفيه anti-piracy measures جواه.')}</${P}>
          <${Fig} name="mm-6-sa-tools" />
        `),

        // 36 · SAOL and SASL
        page(html`
          <${H2}>${t('The orchestra and the score', 'الأوركسترا والنوتة')}</${H2}>
          <${Def}>${X('<b>SAOL</b> ("sail"): the central part. A software-synthesis language that describes synthesisers/instruments, designed for MPEG-4 and not tied to one method: FM, physical modelling, sample-based, granular, subtractive, FOF and hybrids.',
            'الـ <b>SAOL</b> (بتتنطق "sail"): الجزء الأساسي. language للـ software synthesis بتوصف الـ synthesisers والـ instruments، معمولة للـ <bdi dir="ltr">MPEG-4</bdi> ومش مربوطة بطريقة واحدة: الـ FM والـ physical modelling والـ sample-based والـ granular والـ subtractive والـ FOF والـ hybrids.')}</${Def}>
          <${Def}>${X('<b>SASL</b>: a very simple language to control SAOL instruments: what notes, how loud, what tempo, how long, how to control them. Like MIDI but without MIDI\'s limits on temporal resolution and bandwidth, with a richer controller structure.',
            'الـ <b>SASL</b>: language بسيطة جدًا بتتحكم في instruments الـ SAOL: أنهي notes، بصوت عالي قد إيه، أنهي tempo، مدتها قد إيه، وإزاي نتحكم فيها. زي الـ MIDI بس من غير حدوده في الـ temporal resolution والـ bandwidth، وبـ controller structure أغنى.')}</${Def}>
          <${Hand} tilt=${true}>${t('Our trick: sAOL = Orchestra (the instruments), sASL = Score (what to play).', 'حيلة من عندنا: الـ O في SAOL يعني Orchestra (الآلات)، والـ S التانية في SASL يعني Score (هتعزف إيه).')}</${Hand}>
        `),

        // 37 · SASBF, MIDI semantics, scheduler
        page(html`
          <${H2}>${t('The rest of the crew', 'باقي الفريق')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>SASBF</b>: بيبعت <b>banks من الـ samples</b> بكفاءة للـ wavetable أو الـ sample-based synthesis. متوافق جزئيًا مع MIDI <b>DLS</b> (Downloaded Sounds)، ووراه <b>EMu Systems</b> والـ <b>MMA</b>.',
            'الـ <b>MIDI semantics</b>: الـ SAOL ممكن يتشغّل بـ SASL scripts <b>أو بـ MIDI</b>، لأن الـ MIDI أشهر score representation وtools كتير (الـ sequencers) بتستخدمه. الـ MIDI syntax بيفضل برّه كـ MMA standard، بس بعض الـ semantics بتتعرّف من جديد في الـ <bdi dir="ltr">MPEG-4</bdi>.',
            'الـ <b>Scheduler</b>: <b>الجسم الرئيسي</b> للـ Structured Audio؛ بيحدد الـ SAOL بيطلّع الصوت إزاي لما يتشغّل بـ MIDI أو SASL.'
          ] : [
            '<b>SASBF</b>: efficiently transmits <b>banks of samples</b> for wavetable/sample-based synthesis. Partly compatible with MIDI <b>DLS</b> (Downloaded Sounds); driven by <b>EMu Systems</b> and the <b>MMA</b>.',
            '<b>MIDI semantics</b>: SAOL can be driven by SASL scripts <b>or by MIDI</b>, because MIDI is the most common score representation and many tools (sequencers) use it. MIDI syntax stays external (MMA standard), but some semantics are redefined in MPEG-4.',
            '<b>Scheduler</b>: the <b>main body</b> of Structured Audio; defines how SAOL creates sound when driven by MIDI or SASL.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('SASL\'s own limits: <b>no looping, sections, repeats or expression evaluation</b>; most scores are made by automatic tools.',
            'الـ SASL ليها حدود برضه: <b>مفيش looping ولا sections ولا repeats ولا expression evaluation</b>؛ ومعظم الـ scores بتتعمل بـ automatic tools.')}</p></${Box}>
        `),

        // 38 · AudioBIFS interview
        page(html`
          <${Interview} title=${t('AudioBIFS, exposed', 'الـ AudioBIFS على المكشوف')} sub=${t("This week's interview: the tool that mixes the soundtrack.", 'حوار الأسبوع: الـ tool اللي بيعمل mix للـ soundtrack.')} lines=${A ? [
            ['المذيع', 'اسمك طويل. يعني إيه BIFS؟'],
            ['الـ AudioBIFS', 'الـ <b>Binary Format for Scene Description</b> بتاع الـ <bdi dir="ltr">MPEG-4</bdi>: بيوصف الـ objects (video وأصوات وanimations) بتتركب إزاي.'],
            ['المذيع', 'وإنت بتعمل إيه فيه؟'],
            ['الـ AudioBIFS', 'بحدد الـ <b>mixing والـ post-production</b> للـ audio scenes <b>وقت الـ playback</b>: صوت مع background music، وfading بعد 10 ثواني، وموسيقى جديدة بـ reverb.'],
            ['المذيع', 'وأصلك؟'],
            ['الـ AudioBIFS', 'أنا <b>extended VRML</b>، وشكلي tree من الـ nodes.']
          ] : [
            ['Head First', 'Long name. What is BIFS?'],
            ['AudioBIFS', "MPEG-4's <b>Binary Format for Scene Description</b>. It describes how objects (video, sounds, animations) fit together."],
            ['Head First', 'And your part?'],
            ['AudioBIFS', 'I specify the <b>mixing and post-production</b> of audio scenes <b>at playback</b>: a voice mixed with background music, fading after 10 s, new music with reverb.'],
            ['Head First', 'Any family?'],
            ['AudioBIFS', "I'm an <b>extended VRML</b>, and I'm built as a tree of nodes."]
          ]} />
          <${Grow} />
          <${Talk} who="spk" flip=${true}>${X('Piano, Bass and Vocal go in as <b>AudioSources</b>, through <b>AudioFX</b> / <b>AudioDelay</b>, into <b>AudioMix</b> nodes.', 'الـ Piano والـ Bass والـ Vocal بيدخلوا كـ <b>AudioSources</b>، ويعدّوا على <b>AudioFX</b> و<b>AudioDelay</b>، ويوصلوا لـ <b>AudioMix</b> nodes.')}</${Talk}>
        `),

        // 39 · figure: BIFS tree
        page(html`
          <${Fig} name="mm-6-bifs" />
        `),

        // 40 · Web MIDI API
        page(html`
          <${H2}>${t('MIDI in your browser: the Web MIDI API', 'الـ MIDI في الـ browser: الـ Web MIDI API')}</${H2}>
          <${P} small=${true}>${X('The <b>HTML5 Web MIDI API</b> lets web developers reach MIDI <b>input and output devices</b> (hardware and software) with <b>JavaScript</b>, and synthesise sound in the browser. Support is <b>not complete</b> across browsers.',
            'الـ <b>HTML5 Web MIDI API</b> بيخلّي الـ web developers يوصلوا لأجهزة الـ MIDI <b>الـ input والـ output</b> (hardware وsoftware) بالـ <b>JavaScript</b>، ويعملوا synthesis جوه الـ browser. والدعم <b>لسه مش كامل</b> في كل الـ browsers.')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Google Doodle Mini Moog</b>: subtractive synthesis، في عيد ميلاد Bob Moog الـ 78.',
            'الـ modular subtractive synth، والـ FM synth (DX7)، والـ drum machine، والـ granular synth.',
            'الـ Chrome Music Lab.'
          ] : [
            'The <b>Google Doodle Mini Moog</b>: subtractive synthesis, for Bob Moog\'s 78th birthday.',
            'A modular subtractive synth, an FM (DX7) synth, a drum machine, a granular synth.',
            'Chrome Music Lab.'
          ]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('The Mini Moog doodle plays notes in your browser with no audio file sent at all. Which idea from page one makes that possible?',
            'الـ Mini Moog doodle بيعزف notes في الـ browser من غير ما أي audio file يتبعت. أنهي فكرة من أول الفصل بتخلّي ده ممكن؟')}</p></${Box}>
          <${Talk} who="spk" flip=${true}>${t('Sound production is moved to the client. Here, the client is the browser.', 'إنتاج الصوت بيتنقل للـ client. وهنا الـ client هو الـ browser.')}</${Talk}>
        `, { sec: t('Web MIDI API', 'الـ Web MIDI API') }),

        // 41 · match SA tools
        page(html`
          <${H2}>${t('Who does what in Structured Audio?', 'مين بيعمل إيه في الـ Structured Audio؟')}</${H2}>
          <${P} small=${true}>${t('Tap a tool, then its job.', 'دوس على الـ tool، وبعدين على شغلانته.')}</${P}>
          <${Match} id="sat" left=${['SAOL', 'SASL', 'SASBF', 'MIDI semantics', 'Scheduler', 'AudioBIFS']}
            right=${A ? ['الـ mixing والـ post&#8209;production وقت الـ playback', 'الـ score: أنهي notes، وبصوت عالي قد إيه، والـ tempo، والمدة', 'بيحدد الـ SAOL بيطلّع الصوت إزاي لما يشغّله MIDI أو SASL', 'الـ orchestra language اللي بتوصف الـ instruments', 'بيخلّي subset من الـ MIDI يشغّل الـ SAOL', 'بيبعت banks من الـ samples للـ wavetable synthesis']
              : ['Mixing and post-production of the audio scene at playback', 'The score: what notes, how loud, what tempo, how long', 'Defines how SAOL makes sound when driven by MIDI or SASL', 'The orchestra language that describes the instruments', 'Lets a subset of MIDI drive SAOL', 'Transmits banks of samples for wavetable synthesis']}
            answer=${[3, 1, 5, 4, 2, 0]} />
        `),

        // 42–44 · practice questions (the site's own; this lecture has none of the doctor's)
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("This lecture has no questions from the doctors' papers yet, so these are the site's own practice questions. Tap an answer to see why.", 'المحاضرة دي ملهاش أسئلة من امتحانات الدكاترة لسه، فدي أسئلة تدريب من الموقع. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${pq('p1', /sends Note On on MIDI channel 10/)}
          <${Grow} />
          <${Talk} who="dev">${t('Channel 10 again. I see a pattern.', 'الـ channel 10 تاني. شكلها هتيجي.')}</${Talk}>
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p2', /status byte E2 mean/)}
          <${Gap} h=${4} />
          ${pq('p3', /Channel mode messages are a special case/)}
        `),
        page(html`
          ${pq('p4', /instrument number 30/)}
          <${Gap} h=${4} />
          ${pq('p5', /describes synthesisers/)}
        `),

        // 45 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>MIDI</b> protocol بيبعت <b>تعليمات</b> مش samples، والـ client بيطلّع الصوت.',
            'الـ status byte شكله <bdi dir="ltr"><b>1 mmm cccc</b></bdi> (من 80 لـ FF)، والـ data byte شكله <bdi dir="ltr"><b>0 ddd dddd</b></bdi> (من 0 لـ 127).',
            'أول hex digit نوع الـ message، والتاني <bdi dir="ltr">channel − 1</bdi>: الـ <bdi dir="ltr">9C 50 7F</bdi> يعني Note On على channel 13، key 80، velocity 127.',
            'الـ Program change (<bdi dir="ltr">Cx</bdi>) والـ channel pressure (<bdi dir="ltr">Dx</bdi>) حجمهم 2 bytes؛ والباقي 3.',
            'الـ mode messages هي <bdi dir="ltr">Bx</bdi> وأول data byte فيها من 121 لـ 127.',
            'الـ real-time هي F8 وFA وFB وFC وFE وFF، والـ common هي F1 وF2 وF3 وF6، والـ Sysex بين F0 وF7.',
            'الـ GM فيه 128 instrument، و47 drum key (من 35 لـ 81) على channel 10، و16 channel، وأقل حاجة 24 voice.',
            'الـ Structured Audio فيه SAOL وSASL وSASBF وMIDI semantics وScheduler وAudioBIFS.'
          ] : [
            '<b>MIDI</b> is a protocol that sends <b>instructions</b>, not samples; the client makes the sound, so it is a compression tool.',
            'Status byte <b>1 mmm cccc</b> (80–FF); data byte <b>0 ddd dddd</b> (0–127).',
            'First hex digit = message, second = channel − 1. <b>9C 50 7F</b> = Note On, channel 13, key 80, velocity 127.',
            'Program change (Cx) and channel pressure (Dx) are 2 bytes; the rest are 3.',
            'Mode messages = Bx with first data byte 121–127.',
            'Real-time F8 FA FB FC FE FF; common F1 F2 F3 F6; Sysex between F0 and F7.',
            'GM: 128 instruments, 47 drum keys (35–81) on channel 10, 16 channels, at least 24 voices.',
            'Structured Audio: SAOL, SASL, SASBF, MIDI semantics, Scheduler, AudioBIFS.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 46 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 6!', 'خلّصت الفصل السادس!')}</${H1}>
            <${Talk} who="spk">${t('Next time: what we do to sound once we have it. Digital audio effects!', 'المرة الجاية: بنعمل إيه في الصوت بعد ما يبقى عندنا. الـ Digital audio effects!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [6], t: Date.now() } }}>${t('Quiz me on Lecture 6', 'امتحنّي في محاضرة 6')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 6, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 6, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

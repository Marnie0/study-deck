// Head First chapter for Human Computer Interaction Lecture 3 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Cognition: what it is, fast vs slow thinking (Kahneman, 2011), how understanding it helps, the six cognitive processes;
// attention (focused and divided, the design recommendation), Tullis (1987), multitasking and Ophir et al. (2009), multitasking
// at work, where alternative designs come from, phones and driving (Caird et al., 2018; Briggs et al., 2018), hands-free phones
// and the front-seat passenger, design implications for attention; perception, Weller (2004), the "What is the time?" boxes and
// the design implications for perception. Two small search experiments of our own (bunched-up vs grouped, plain vs salient) and
// the doctors' five midterm questions. Our own analogies and experiments are marked as ours.
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const AF = '"IBM Plex Sans Arabic", var(--body)';

  if (!document.getElementById('hf-css-hci3')) {
    const s = document.createElement('style'); s.id = 'hf-css-hci3';
    s.textContent = `
.hfb .hf-hci3-cloud{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; }
.hfb .hf-hci3-cloud span{ font:700 14px/1.2 var(--body); border:1.6px solid var(--hf-line); border-radius:999px; padding:4px 10px; background:var(--paper); color:var(--ink); }
.hfb .hf-hci3-cloud span:nth-child(3n+1){ background:color-mix(in srgb, var(--hf-k) 18%, var(--paper)); }
.hfb .hf-hci3-cloud span:nth-child(4n+2){ transform:rotate(-2deg); } .hfb .hf-hci3-cloud span:nth-child(5n+3){ transform:rotate(2deg); }
.hfb .hf-hci3-steps{ display:grid; gap:7px; }
.hfb .hf-hci3-steps > div{ display:grid; grid-template-columns:28px 1fr; gap:8px; align-items:start; font-size:14.5px; line-height:1.34; color:var(--ink); }
.hfb .hf-hci3-steps > div > b:first-child{ display:grid; place-items:center; width:26px; height:26px; border-radius:50%; background:var(--hf-line); color:var(--paper); font:800 14px/1 var(--body); }
.hfb .hf-hci3-steps > div b{ font-weight:700; }
.hfb .hf-hci3-procs{ display:grid; grid-template-columns:1fr 1fr; gap:7px; }
.hfb .hf-hci3-procs > div{ border:2px solid var(--hf-line); border-radius:9px; padding:6px 9px; background:var(--paper); display:flex; flex-direction:column; gap:3px; }
.hfb .hf-hci3-procs > div.hf-hci3-now{ background:color-mix(in srgb, var(--hf-k) 22%, var(--paper)); box-shadow:3px 3px 0 var(--hf-line); }
.hfb .hf-hci3-procs > div > b{ font:800 22px/1 var(--body); color:var(--hf-k); }
.hfb .hf-hci3-procs > div > span{ font:700 14px/1.22 var(--body); color:var(--ink); }
.hfb .hf-hci3-procs > div > i{ font:600 13px/1.1 var(--body); font-style:normal; color:var(--graphite); margin-top:auto; }
.hfb .hf-hci3-vs{ display:grid; grid-template-columns:1fr 1fr; border:2px solid var(--hf-line); }
.hfb .hf-hci3-vs > div{ padding:6px 8px; font-size:14px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-hci3-vs > div:nth-child(odd){ border-inline-end:2px solid var(--hf-line); }
.hfb .hf-hci3-vs > .hf-hci3-hd{ font:800 15px/1.1 var(--body); background:var(--hf-line); color:var(--paper); border-top:0; text-align:center; }
.hfb .hf-hci3-vs > .hf-hci3-big{ font:800 26px/1 var(--body); color:var(--hf-k); text-align:center; }
.hfb .hf-hci3-vs b{ font-weight:700; }
.hfb .hf-hci3-st{ border:2px solid var(--hf-line); border-radius:10px; overflow:hidden; background:var(--paper); }
.hfb .hf-hci3-top{ display:flex; align-items:center; gap:8px; padding:6px 10px; background:var(--hf-grey); font:600 14px/1.25 var(--body); color:var(--ink); min-height:38px; }
.hfb .hf-hci3-top b{ font-weight:800; }
.hfb .hf-hci3-clk{ margin-inline-start:auto; font:700 15px/1 var(--mono); color:var(--hf-k); white-space:nowrap; direction:ltr; }
.hfb .hf-hci3-stage{ position:relative; padding:8px; overflow:hidden; }
.hfb .hf-hci3-intro{ height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; text-align:center; }
.hfb .hf-hci3-intro p{ margin:0; font-size:14.5px; line-height:1.35; color:var(--ink); }
.hfb .hf-hci3-dense{ box-sizing:border-box; height:100%; direction:ltr; text-align:justify; font:500 13px/1.3 var(--body); color:var(--ink); background:var(--hf-grey); padding:6px 7px; border-radius:4px; }
.hfb .hf-hci3-dense button{ display:inline; border:0; background:none; padding:0; margin:0 3px 0 0; font:inherit; color:inherit; cursor:pointer; border-radius:3px; }
.hfb .hf-hci3-grp{ direction:ltr; display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-hci3-grp > div{ border:1.6px solid var(--hf-line); border-radius:7px; padding:4px 8px 5px; }
.hfb .hf-hci3-grp h5{ margin:0 0 2px; font:800 13px/1.25 var(--body); color:var(--hf-k); text-transform:uppercase; letter-spacing:.05em; }
.hfb .hf-hci3-grp button{ display:block; width:100%; text-align:left; border:0; background:none; padding:0 2px; margin:0; font:500 13px/1.3 var(--body); color:var(--ink); cursor:pointer; border-radius:3px; }
.hfb .hf-hci3-let{ direction:ltr; display:grid; grid-template-columns:repeat(9, 1fr); gap:3px; }
.hfb .hf-hci3-let button{ height:31px; border:0; background:none; padding:0; font:700 20px/31px var(--mono); color:var(--ink); cursor:pointer; border-radius:5px; }
.hfb .hf-hci3-let button.hf-hci3-red{ color:#E11D48; }
.hfb .hf-hci3-stage button.hf-hci3-hit{ outline:2.5px solid var(--ok); background:color-mix(in srgb, var(--ok) 22%, var(--paper)); }
.hfb .hf-hci3-stage button.hf-hci3-miss{ color:var(--hf-red); text-decoration:line-through; }
.hfb .hf-hci3-res{ height:100%; display:flex; flex-direction:column; justify-content:center; gap:8px; }
.hfb .hf-hci3-res > div{ display:flex; justify-content:space-between; align-items:center; gap:8px; border-bottom:1px dotted var(--faint); padding:4px 2px; font:600 14px/1.25 var(--body); color:var(--ink); }
.hfb .hf-hci3-res > div b{ font:800 20px/1 var(--mono); color:var(--hf-k); direction:ltr; }
.hfb .hf-hci3-res p{ margin:0; font-size:14px; line-height:1.35; color:var(--ink); }
.hfb .hf-hci3-bar{ display:flex; gap:7px; align-items:center; flex-wrap:wrap; padding:0 10px 9px; }
.hfb .hf-hci3-sw{ display:inline-block; padding:3px 8px; border-radius:4px; border:1px solid var(--hf-grey2); font-weight:800; }
.hfb .hf-hci3-car{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-hci3-car > div{ border:2px solid var(--hf-line); border-radius:9px; padding:7px 9px; background:var(--paper); }
.hfb .hf-hci3-car h5{ margin:0 0 3px; font:800 14.5px/1.2 var(--body); color:var(--ink); }
.hfb .hf-hci3-car p{ margin:0; font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-hci3-car > div.hf-hci3-bad{ border-color:var(--hf-red); }
.hfb .hf-hci3-car > div.hf-hci3-ok{ border-color:var(--ok); }
.hf-ar .hf-hci3-cloud span, .hf-ar .hf-hci3-steps > div, .hf-ar .hf-hci3-procs > div > span, .hf-ar .hf-hci3-procs > div > i, .hf-ar .hf-hci3-vs > div,
.hf-ar .hf-hci3-top, .hf-ar .hf-hci3-intro p, .hf-ar .hf-hci3-res > div, .hf-ar .hf-hci3-res p, .hf-ar .hf-hci3-car h5, .hf-ar .hf-hci3-car p, .hf-ar .hf-hci3-sw{ font-family:${AF}; font-style:normal; letter-spacing:0; }
.hf-ar .hf-hci3-steps > div, .hf-ar .hf-hci3-vs > div, .hf-ar .hf-hci3-intro p, .hf-ar .hf-hci3-res p, .hf-ar .hf-hci3-car p{ line-height:1.5; font-size:13.5px; }
.hf-ar .hf-hci3-vs > .hf-hci3-big{ font-family:var(--body); }
`;
    document.head.appendChild(s);
  }

  const Steps = ({ items }) => html`<div className="hf-hci3-steps">${items.map((x, j) => html`<div key=${j} className="hf-in" style=${{ animationDelay: calm() ? '0s' : j * 0.12 + 's' }}><b>${j + 1}</b><span>${H.K.T(x)}</span></div>`)}</div>`;

  // what cognition covers, as a cloud of words
  function Cloud() {
    const ar = useAr();
    const w = ar ? ['التفكير', 'التذكر', 'التعلم', 'السرحان', 'اتخاذ القرارات', 'الرؤية', 'القراية', 'الكلام', 'الكتابة', '…']
      : ['thinking', 'remembering', 'learning', 'daydreaming', 'decision-making', 'seeing', 'reading', 'talking', 'writing', '…'];
    return html`<div className="hf-hci3-cloud">${w.map((x, j) => html`<span key=${j} className="hf-in" style=${{ animationDelay: calm() ? '0s' : j * 0.09 + 's' }}>${x}</span>`)}</div>`;
  }

  // the six cognitive processes: the first two are this chapter, the rest are Lecture 4
  function Procs() {
    const ar = useAr();
    const P = ar ? ['الـ Attention', 'الـ Perception', 'الـ Memory', 'الـ Learning', 'الـ Reading والـ speaking والـ listening', 'الـ Problem-solving والـ planning والـ reasoning والـ decision-making']
      : ['Attention', 'Perception', 'Memory', 'Learning', 'Reading, speaking and listening', 'Problem-solving, planning, reasoning and decision-making'];
    return html`<div className="hf-hci3-procs">${P.map((x, j) => html`<div key=${j} className=${'hf-in' + (j < 2 ? ' hf-hci3-now' : '')} style=${{ animationDelay: calm() ? '0s' : j * 0.1 + 's' }}>
      <b>${j + 1}</b><span>${x}</span><i>${j < 2 ? (ar ? 'الفصل ده' : 'this chapter') : (ar ? 'المحاضرة 4' : 'Lecture 4')}</i></div>`)}</div>`;
  }

  // Tullis's two screens side by side (the notes' table)
  function Tullis() {
    const ar = useAr();
    const c = ar
      ? [['الشاشة الأولى', 'الشاشة التانية'], ['المعلومات لازقة في بعض (bunched up)', 'الحروف متجمعة في vertical categories'], ['صعب تدوّر فيها', 'أسهل في التدوير'], ['5.5 s', '3.2 s']]
      : [['1st screen', '2nd screen'], ['Information <b>bunched up</b> together', 'Characters grouped into <b>vertical categories</b>'], ['Hard to search', 'Easier to search'], ['5.5 s', '3.2 s']];
    return html`<div className="hf-hci3-vs hf-in">${c.map((r, i) => r.map((x, j) => html`<div key=${i + '-' + j} className=${i === 0 ? 'hf-hci3-hd' : i === 3 ? 'hf-hci3-big' : ''}>${H.K.T(x)}</div>`))}</div>`;
  }

  // our own search experiment: the clock runs while you look for the target; rounds differ only in layout
  const GROUPS = [['Display', ['Brightness', 'Dark mode', 'Font size', 'Wallpaper', 'Screen timeout', 'Night light']], ['Sound', ['Volume', 'Ringtone', 'Vibration', 'Do not disturb', 'Alarm sound', 'Media volume']],
    ['Network', ['Wi-Fi', 'Bluetooth', 'Mobile data', 'Hotspot', 'Airplane mode', 'VPN']], ['Privacy', ['Location', 'Camera access', 'Microphone', 'Passwords', 'App lock', 'Backup']]];
  const DENSE = ['Night light', 'VPN', 'Volume', 'Passwords', 'Font size', 'Mobile data', 'Alarm sound', 'Backup', 'Brightness', 'Do not disturb', 'Bluetooth', 'Camera access', 'Wallpaper', 'Media volume', 'Hotspot', 'Location', 'Vibration', 'Screen timeout', 'Airplane mode', 'App lock', 'Dark mode', 'Microphone', 'Ringtone', 'Wi-Fi'];
  const LETTERS = (at) => Array.from({ length: 54 }, (_, i) => i === at ? 'Q' : 'O');
  function SearchTest({ id, rounds, h, verdict }) {
    const ar = useAr();
    const [times, setTimes] = H.K.useSlot(id, []);
    const [mode, setMode] = useState('idle');
    const [miss, setMiss] = useState(null);
    const [t0, setT0] = useState(0), [now, setNow] = useState(0);
    useEffect(() => { if (mode !== 'run') return; const iv = setInterval(() => setNow(performance.now()), 100); return () => clearInterval(iv); }, [mode]);
    const n = rounds.length, done = times.length >= n, cur = done ? 0 : times.length, R = rounds[cur];
    const start = () => { const t = performance.now(); setT0(t); setNow(t); setMiss(null); setMode('run'); };
    const items = R.kind === 'groups' ? [].concat(...R.groups.map(g => g[1])) : R.items;
    const pick = i => {
      if (mode !== 'run') return;
      if (items[i] !== R.target) { setMiss(i); return; }
      setTimes(times.concat(Math.round((performance.now() - t0) / 100) / 10)); setMode('idle'); setMiss(null);
    };
    const cls = i => (mode === 'peek' && items[i] === R.target ? 'hf-hci3-hit' : miss === i ? 'hf-hci3-miss' : '');
    const btn = (x, i, extra) => html`<button key=${i} className=${(cls(i) + (extra ? ' ' + extra : '')).trim()} onClick=${() => pick(i)} tabIndex=${mode === 'run' ? 0 : -1}>${x}</button>`;
    let layout = null;
    if (R.kind === 'dense') layout = html`<div className="hf-hci3-dense">${items.map((x, i) => btn(x, i))}</div>`;
    else if (R.kind === 'groups') { let k = 0; layout = html`<div className="hf-hci3-grp">${R.groups.map(([g, its]) => html`<div key=${g}><h5>${g}</h5>${its.map(x => btn(x, k++))}</div>`)}</div>`; }
    else layout = html`<div className="hf-hci3-let">${items.map((x, i) => btn(x, i, R.pop && x === R.target ? 'hf-hci3-red' : ''))}</div>`;
    const secs = mode === 'run' ? (now - t0) / 1000 : 0;
    const L = r => ar ? r.ar : r.en;
    let body;
    if (mode === 'run' || mode === 'peek') body = layout;
    else if (done) body = html`<div className="hf-hci3-res">${rounds.map((r, j) => html`<div key=${j}><span>${L(r)}</span><b>${times[j].toFixed(1)} s</b></div>`)}<p>${H.K.T(ar ? verdict[1] : verdict[0])}</p></div>`;
    else body = html`<div className="hf-hci3-intro"><p>${H.K.T(ar ? R.taskAr : R.task)}</p><p className="hf-hand" style=${{ fontSize: '19px' }}>${ar ? 'الساعة بتبدأ لما تدوس ابدأ' : 'the clock starts when you press Start'}</p></div>`;
    return html`<div className="hf-hci3-st hf-in">
      <div className="hf-hci3-top"><span>${done && mode !== 'peek' ? (ar ? 'النتيجة' : 'Your result') : html`${L(R)}${ar ? ' · دوّر على ' : ' · find '}<b dir="ltr">${R.target}</b>`}</span>${!(done && mode !== 'peek') && html`<span className="hf-hci3-clk">${(mode === 'run' ? secs : 0).toFixed(1)} s</span>`}</div>
      <div className="hf-hci3-stage" style=${{ height: h + 'px' }}>${body}</div>
      <div className="hf-hci3-bar">
        ${!done && mode !== 'run' && html`<button className="hf-btn solid" onClick=${start}>${ar ? 'ابدأ ' + (cur === 0 ? 'الجولة الأولى' : 'الجولة التانية') : 'Start round ' + (cur + 1)}</button>`}
        ${mode !== 'run' && html`<button className="hf-btn" onClick=${() => setMode(mode === 'peek' ? 'idle' : 'peek')}>${mode === 'peek' ? (ar ? 'خبّيها' : 'Hide it') : (ar ? 'ورّيني مكانها' : 'Show me where it is')}</button>`}
        ${(times.length > 0 || mode === 'run') && html`<button className="hf-btn" onClick=${() => { setTimes([]); setMode('idle'); setMiss(null); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div></div>`;
  }

  H.chapters.hci[3] = {
    title: 'Cognition: Attention and Perception',
    kicker: 'Chapter 3',
    run: 'attention and perception',
    ar: { title: 'الـ Cognition: الـ Attention والـ Perception', kicker: 'الفصل 3', run: 'الـ attention والـ perception' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (this year's midterm), with the site's Egyptian Arabic explanations
      const lec = kit.course.lectures.find(l => l.n === 3);
      const arQuiz = (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[3] && window.AR.hci.lectures[3].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const small = (en, ar) => html`<p className="hf-p small">${X(en, ar)}</p>`;
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '4px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;
      return [
        // 0 · how to use this chapter
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X("This chapter is about how your brain handles what's on a screen, so it doesn't just tell you: it makes you <b>try it</b>. The facts all come from the lecture's slides.",
            'الفصل ده عن مخك بيتعامل إزاي مع اللي على الشاشة، فمش هيقولك وبس، هيخليك <b>تجرّب بنفسك</b>. وكل المعلومات من سلايدز المحاضرة.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises and the experiments.</b> Some of them time you.', '<b>حل التمارين والتجارب.</b> فيه منهم بيحسبلك الوقت.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف وفكّر.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps.', '<b>خلّي بالك!</b> دي فخاخ الامتحان.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Notes and experiments marked "ours" are our own, not the slides\'.', 'الملاحظات والتجارب اللي عليها "من عندنا" دي مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain" title=${t('Warm-up', 'تسخين')}><p className="hf-p small">${X('Without looking: what colour is the icon of the app you open most? You have seen it a thousand times. Did you ever really <i>look</i> at it?',
            'من غير ما تبص: لون أيقونة الأبلكيشن اللي بتفتحه أكتر حاجة إيه؟ شفتها ألف مرة. بس عمرك <i>بصّيت</i> عليها بجد؟')}</p></${Box}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">3</span><span className="t">${A ? html`الفصل التالت<br/>Human Computer Interaction` : html`Chapter three<br/>Human Computer Interaction`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Look Here! No, Here!', 'بص هنا! لأ، هنا!')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('cognition: attention and perception', 'الـ cognition: الـ attention والـ perception')}</p></div>
          <${P}>${X('Every screen you design is fighting for something you can\'t buy more of: the user\'s <b>attention</b>. And before anything gets attention, it has to be <b>perceived</b>: seen, read, heard.',
            'كل شاشة بتصممها بتتخانق على حاجة مينفعش تشتري منها زيادة: الـ <b>attention</b> بتاع الـ user. وقبل ما أي حاجة تاخد attention، لازم تتشاف وتتقري وتتسمع، يعني لازم يحصلها <b>perception</b>.')}</${P}>
          <${Talk} who="dev">${t('I put the important button right there. Why did nobody press it?', 'أنا حاطط الزرار المهم هناك أهو. محدش داس عليه ليه؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${t("Because I timed them, and nobody even found it. Let's find out why.", 'عشان أنا حسبت وقتهم، ومحدش لقاه أصلًا. تعالى نعرف ليه.')}</${Talk}>
          <${P} small=${true}>${X('In this chapter you\'ll <b>time yourself</b> searching screens, meet a very distracted multitasker, and find out why a phone call and a steering wheel don\'t mix.',
            'في الفصل ده هـ<b>تحسب وقتك</b> وإنت بتدوّر في شاشات، وهتقابل multitasker متشتت جدًا، وهتعرف ليه المكالمة والدريكسيون مش بيتفقوا.')}</${P}>
        `, { sec: t('What is cognition?', 'يعني إيه cognition؟') }),

        // 2 · what is cognition
        page(html`
          <${H1}>${t('So what is cognition?', 'يعني إيه cognition أصلًا؟')}</${H1}>
          <${Def}>${X('<b>Cognition</b> covers what goes on in our heads when we carry out everyday activities:', 'الـ <b>Cognition</b> بيشمل اللي بيحصل في دماغنا واحنا بنعمل حاجاتنا اليومية:')}</${Def}>
          <${Cloud} />
          <${Hand} arrow="up" tilt=${true}>${t('yes, daydreaming counts', 'أيوه، السرحان كمان محسوب')}</${Hand}>
          <${P}>${X('That\'s a long list. One way of classifying cognition <b>at a higher level</b>:', 'دي قايمة طويلة. فيه طريقة لتصنيف الـ cognition <b>على مستوى أعلى</b>:')}</${P}>
          <${Def}>${X('<b>Fast vs slow thinking</b> (Kahneman, 2011).', 'الـ <b>fast vs slow thinking</b>، والمرجع <bdi dir="ltr">(Kahneman,&nbsp;2011)</bdi>.')}</${Def}>
          <${Grow} />
          <${Talk} who="lens">${t('Let\'s test it on you. Next page.', 'تعالى نجربها عليك. الصفحة الجاية.')}</${Talk}>
        `),

        // 3 · fast vs slow
        page(html`
          <${H2}>${t('Fast or slow? Answer in your head', 'سريع ولا بطيء؟ جاوب في دماغك')}</${H2}>
          <${P} small=${true}>${X("The slide's activity: six questions. For each, notice: did the answer just <b>pop up</b>, or did you have to <b>work</b> for it?",
            'نشاط الـ slide: ست أسئلة. في كل سؤال، خد بالك: الإجابة <b>نطّت</b> لوحدها، ولا اضطريت <b>تشتغل</b> عشان توصلها؟')}</${P}>
          <${Fig} name="fast-slow" />
          <${Hand} red=${true}>${X('The slide gives <b>no answers</b>: it\'s for class discussion. Our take (not the slides\'): <bdi dir="ltr">2 + 2</bdi> pops up instantly; <bdi dir="ltr">21 × 29</bdi> makes you stop and work.',
            'الـ slide <b>مفيهاش إجابات</b>، ده سؤال للمناقشة. رأينا إحنا (مش من السلايدز): <bdi dir="ltr">2 + 2</bdi> بتنط على طول، و<bdi dir="ltr">21 × 29</bdi> بتخليك توقف وتحسب.')}</${Hand}>
        `),

        // 4 · how understanding cognition helps
        page(html`
          <${H2}>${t('Why should a designer care?', 'وإيه اللي يهم الـ designer في كده؟')}</${H2}>
          <${P} small=${true}>${t('The slide lists three ways understanding cognition helps:', 'الـ slide بتقول إن فهم الـ cognition بيساعد في تلات حاجات:')}</${P}>
          <${Steps} items=${A ? [
            'بيدينا معرفة بـ<b>اللي نقدر نتوقع</b> إن الـ users يعملوه <b>واللي منقدرش</b>.',
            'بـ<b>يحدد ويشرح</b> طبيعة وأسباب <b>المشاكل</b> اللي الـ users بيقابلوها.',
            'بيوفر <b>theories</b> و<b>modeling tools</b> و<b>guidance</b> و<b>methods</b> ممكن توصلنا لـ design أحسن للـ interactive products.'
          ] : [
            'Provides knowledge about what users <b>can and cannot</b> be expected to do.',
            '<b>Identifies and explains</b> the nature and causes of <b>problems</b> that users encounter.',
            'Provides <b>theories, modeling tools, guidance and methods</b> that can lead to the design of better interactive products.'
          ]} />
          <${Talk} who="bug" flip=${true}>${t("Number 2 is about me. I'm the problem users run into, and cognition explains why I happen.", 'رقم 2 ده عني أنا. أنا المشكلة اللي الـ users بيقابلوها، والـ cognition بيشرح أنا بحصل ليه.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('True or False? <i>"Understanding cognition identifies and explains the nature and causes of problems that users encounter."</i> That\'s <b>True</b>, word for word from the slide.',
            'صح ولا غلط؟<span class="ltr"><i>"Understanding cognition identifies and explains the nature and causes of problems that users encounter."</i></span>دي <b>صح</b>، نفس كلام الـ slide بالحرف.')}</p></${Box}>
        `),

        // 5 · the six cognitive processes
        page(html`
          <${H1}>${t('Six cognitive processes', 'ست cognitive processes')}</${H1}>
          <${Procs} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Learn the list: the midterm asked which choice is (or is not) one of them, and hid them among <b>body processes</b>: respiration, digestion, blood circulation, sleeping. Those are things your body does, <b>not</b> cognitive processes.',
            'الميدترم سأل أنهي اختيار منهم (أو مش منهم)، وخبّاهم وسط <b>عمليات جسمانية</b>: التنفس، والهضم، والدورة الدموية، والنوم. دي حاجات جسمك بيعملها، <b>مش</b> cognitive processes.')}</p></${Box}>
        `, { sec: t('Cognitive processes', 'الـ Cognitive processes') }),

        // 6 · sort: cognitive or not
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Cognitive process or not? Tap <b>Yes</b> or <b>No</b> for each, then check.', 'عملية معرفية ولا لأ؟ اختار <b>أيوه</b> أو <b>لأ</b> وصحّح.')}</p></${Box}>
          <${Sort} id="cog" bins=${A ? [['أيوه', 'عملية معرفية'], ['لأ', 'مش عملية معرفية']] : [['Yes', 'Cognitive process'], ['No', 'Not one']]} items=${A ? [
            ['الـ Attention', 0], ['الهضم (digestion)', 1], ['الـ Perception', 0], ['التنفس (respiration)', 1], ['الـ Memory', 0],
            ['الـ Prototyping', 1], ['الـ Decision-making', 0], ['النوم', 1]
          ] : [
            ['Attention', 0], ['Digestion', 1], ['Perception', 0], ['Respiration', 1], ['Memory', 0],
            ['Prototyping', 1], ['Decision-making', 0], ['Sleeping', 1]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('Prototyping is a design activity, not cognition.', 'الـ Prototyping نشاط design، مش عملية معرفية.')}</${Hand}>
        `),

        // 7 · attention
        page(html`
          <${H1}>${t('Attention: the spotlight', 'الـ Attention: الكشّاف')}</${H1}>
          <${Def}>${X('<b>Attention</b> allows us to <b>focus on information that is relevant</b> to what we are doing.', 'الـ <b>Attention</b> بيخلينا <b>نركّز على المعلومات اللي ليها علاقة</b> باللي إحنا بنعمله.')}</${Def}>
          <${UL} items=${A ? ['بيشمل الحواس <b>السمعية (audio)</b> و/أو <b>البصرية (visual)</b>.', 'فيه attention <b>focused</b> وفيه attention <b>divided</b>.']
            : ['It involves <b>audio and/or visual</b> senses.', 'There is <b>focused</b> and <b>divided</b> attention.']} />
          <${Hand} tilt=${true}>${t('Our analogy, not the slides\': attention is a spotlight on a dark stage. Whatever is in the beam, you notice. The rest might as well not be there.', 'تشبيه من عندنا، مش من السلايدز: الـ attention زي كشّاف على مسرح ضلمة. اللي في النور بتاخد بالك منه، والباقي كأنه مش موجود.')}</${Hand}>
          <${Box} kind="exam" title=${t('Design recommendation', 'توصية للـ design')}><p className="hf-p small">${X('Information at the interface should be <b>structured to capture users\' attention</b>, for example using <b>perceptual boundaries (windows)</b> and <b>colors</b>.',
            'المعلومات اللي على الـ interface لازم تكون <b>متنظمة بشكل يشد الـ attention</b> بتاع الـ users، مثلاً باستخدام <b>perceptual boundaries (windows)</b> و<b>الألوان</b>.')}</p></${Box}>
        `, { sec: t('Attention', 'الـ Attention') }),

        // 8 · Tullis intro
        page(html`
          <${H2}>${t('Two screens, one hotel price', 'شاشتين، وسعر أوتيل واحد')}</${H2}>
          <${P} small=${true}>${X('<b>Tullis (1987)</b> gave people two screens of hotel listings and timed how long it took to find one price. Both screens have <b>the same density of information</b>.',
            'الباحث <b>Tullis (1987)</b> إدّى الناس شاشتين فيهم أوتيلات، وحسب وقتهم عشان يلاقوا سعر واحد. والشاشتين فيهم <b>نفس الـ density من المعلومات</b>.')}</${P}>
          <${UL} items=${A ? ['<b>الشاشة الأولى</b>: <bdi dir="ltr">"Pennsylvania"</bdi>، الـ entries مكتوبة ورا بعض. الـ task: سعر الـ double room في الـ Quality Inn.', '<b>الشاشة التانية</b>: <bdi dir="ltr">"South Carolina"</bdi>، متقسمة columns. الـ task: سعر الـ double room في الـ Holiday Inn في Columbia.']
            : ['<b>1st screen</b>, "Pennsylvania": entries written one after another. Task: the double room at the Quality Inn.', '<b>2nd screen</b>, "South Carolina": laid out in columns. Task: the double room at the Holiday Inn in Columbia.']} />
          <${Box} kind="brain"><p className="hf-p">${t('Same amount of information on both. Will the time be the same? If not, which one wins, and why? Guess before you try it.', 'نفس كمية المعلومات في الاتنين. هل الوقت هيبقى واحد؟ ولو لأ، مين هيكسب وليه؟ خمّن قبل ما تجرب.')}</p></${Box}>
          <${Grow} />
          <${Hand} arrow="down">${t('the slide\'s activity is on the next page: time yourself', 'نشاط الـ slide في الصفحة الجاية: احسب وقتك')}</${Hand}>
        `, { sec: t('Tullis: searching screens', 'الباحث Tullis: التدوير في الشاشات') }),

        // 9 · hotel-search figure
        page(html`
          <${H2}>${t('Find the hotel price', 'دوّر على سعر الأوتيل')}</${H2}>
          <${Fig} name="hotel-search" />
        `),

        // 10 · Tullis result
        page(html`
          <${H2}>${t('What Tullis found', 'Tullis لقى إيه')}</${H2}>
          <${Tullis} />
          <${P}>${X('Same density, very different times. The reason is <b>spacing</b>: on the 1st screen the information is <b>bunched up together</b>, making it hard to search; on the 2nd, the characters are <b>grouped into vertical categories</b> of information, making it easier.',
            'نفس الـ density، ووقت مختلف جدًا. السبب هو الـ <b>spacing</b>: في الشاشة الأولى المعلومات <b>لازقة في بعض</b> وده بيصعّب التدوير، وفي التانية الحروف <b>متجمعة في vertical categories</b> وده بيسهّله.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('"Why was the 2nd screen faster?" Answer: <b>spacing</b> (vertical categories). Not brighter colors, not fewer hotels (same density!), and not borders: <b>borders</b> are Weller (2004), later in this chapter.',
            '"الشاشة التانية أسرع ليه؟" الإجابة: الـ <b>spacing</b> (الـ vertical categories). مش ألوان أفتح، ومش أوتيلات أقل (نفس الـ density!)، ومش الـ borders؛ الـ <b>borders</b> دي بتاعة Weller (2004)، جاية قدام في الفصل.')}</p></${Box}>
          <${Hand} red=${true}>${X('numbers to keep: <b>5.5 s</b> and <b>3.2 s</b>', 'أرقام تحفظها: <bdi dir="ltr"><b>5.5 s</b></bdi> و<bdi dir="ltr"><b>3.2 s</b></bdi>')}</${Hand}>
        `),

        // 11 · our clutter experiment
        page(html`
          <${Box} kind="pencil" title=${t('Our experiment: the settings screen', 'تجربة من عندنا: شاشة الـ settings')}><p className="hf-p small">${X('Not from the slides, but the same idea: the same 24 settings, first <b>bunched up</b>, then <b>grouped</b> and spaced out. Find each target fast.',
            'مش من السلايدز، بس نفس الفكرة: نفس الـ 24 setting، الأول <b>لازقين في بعض</b>، وبعدين <b>متجمعين</b> وبينهم مسافات. لاقي المطلوب بسرعة.')}</p></${Box}>
          <${SearchTest} id="clutter" h=${274} rounds=${[
            { kind: 'dense', items: DENSE, target: 'Hotspot', en: 'Round 1', ar: 'الجولة الأولى', task: 'Round 1: one bunched-up list. Find <b>Hotspot</b>.', taskAr: 'الجولة الأولى: لستة واحدة لازقة في بعض. دوّر على <bdi dir="ltr"><b>Hotspot</b></bdi>.' },
            { kind: 'groups', groups: GROUPS, target: 'Ringtone', en: 'Round 2', ar: 'الجولة التانية', task: 'Round 2: the same settings, grouped and spaced. Find <b>Ringtone</b>.', taskAr: 'الجولة التانية: نفس الـ settings، متجمعة وبينها مسافات. دوّر على <bdi dir="ltr"><b>Ringtone</b></bdi>.' }
          ]} verdict=${['Faster in round 2? That is the kind of result Tullis got. (One try of our toy is not a study, though.)', 'أسرع في الجولة التانية؟ ده نفس نوع النتيجة اللي Tullis لقاها. (بس تجربة واحدة من لعبتنا مش دراسة.)']} />
        `, { sec: t('Try it yourself', 'جرّب بنفسك') }),

        // 12 · multitasking
        page(html`
          <${H1}>${t('Can you really do two things at once?', 'تقدر فعلًا تعمل حاجتين في نفس الوقت؟')}</${H1}>
          <${P}>${X('The slide asks: is it possible to perform <b>multiple tasks</b> without one or more of them being <b>detrimentally affected</b>?',
            'الـ slide بتسأل: ينفع نعمل <b>كذا task</b> في نفس الوقت من غير ما واحدة أو أكتر منهم <b>تتأثر بشكل سلبي</b>؟')}</${P}>
          <${Def}>${X('<b>Multitasking</b> can cause people to:', 'الـ <b>Multitasking</b> ممكن يخلي الناس:')}
            ${li(A ? ['يتوهوا من <b>حبل أفكارهم</b> (train of thought)،', '<b>يغلطوا</b> (make errors)،', 'ويحتاجوا <b>يبدأوا من الأول</b> (start over).'] : ['lose their <b>train of thought</b>,', 'make <b>errors</b>,', 'and need to <b>start over</b>.'])}</${Def}>
          <${Talk} who="dev">${t('Ha. That\'s me with three tabs, a lecture video and a chat open.', 'ههه. ده أنا وفاتح تلات tabs وفيديو المحاضرة وشات.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${t('Someone who multitasks all day must get good at it with practice. True? A study tested exactly that. Guess, then turn the page.', 'اللي بيعمل multitasking طول اليوم أكيد بيبقى شاطر فيه من كتر التمرين. صح؟ فيه دراسة اختبرت ده بالظبط. خمّن وبعدين اقلب.')}</p></${Box}>
        `, { sec: t('Multitasking', 'الـ Multitasking') }),

        // 13 · interview
        page(html`
          <${Interview} title=${t('The Heavy Multitasker, exposed', 'الـ Heavy Multitasker على المكشوف')} sub=${t('This week\'s interview, if our guest can stay on topic.', 'حوار الأسبوع، لو الضيف عرف يركّز معانا.')} lines=${A ? [
            ['المذيع', 'الباحثين <b>Ophir et al. (2009)</b> قارنوا بين الـ heavy والـ light multitaskers. مين كان أكتر عرضة للتشتت؟'],
            ['الـ Multitasker', 'إحنا، الـ <b>heavy</b>. أكتر عرضة للتشتت من اللي <b>نادرًا</b> ما بيعملوا multitasking.'],
            ['الـ Multitasker', 'إحنا <b>بنتشتت بسهولة</b> وبنلاقي <b>صعوبة إننا نفلتر المعلومات اللي ملهاش لازمة</b>. استنى، جالي notification.'],
            ['المذيع', 'وفي الشغل؟'],
            ['الـ Multitasker', 'بقى <b>منتشر أكتر وأكتر</b>. شوف الناس في <b>أوضة العمليات</b>: بيتابعوا <b>كذا شاشة</b> بتديهم معلومات <b>real-time</b>.'],
            ['المذيع', 'ودول محتاجين إيه؟'],
            ['الـ Multitasker', 'محتاجين <b>attention مستمر</b> عشان يشوفوا لو فيه data غريبة أو شاذة. وعشان كده محتاجين <b>attention and scanning strategies جديدة</b>. كنت بتقول إيه؟']
          ] : [
            ['Head First', '<b>Ophir et al. (2009)</b> compared heavy and light multitaskers. Who was more prone to being distracted?'],
            ['Multitasker', 'Us, the <b>heavy</b> ones. More than people who <b>infrequently</b> multitask.'],
            ['Multitasker', 'We\'re <b>easily distracted</b> and find it <b>difficult to filter irrelevant information</b>. Hang on, a notification.'],
            ['Head First', 'And at work?'],
            ['Multitasker', 'It\'s <b>increasingly common</b>. Look at <b>hospital workers</b> in an operating room: <b>multiple screens</b> of new, <b>real-time</b> information.'],
            ['Head First', 'What does that demand?'],
            ['Multitasker', 'The clinician\'s <b>constant attention</b>, to check if any data is unusual or anomalous. So we need <b>new attention and scanning strategies</b>. Sorry, what was the question?']
          ]} />
        `),

        // 14 · watch it on multitasking + alternatives
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Trap answers flip the finding: "Heavy multitaskers were <b>better</b> at filtering irrelevant information" or "<b>Light</b> multitaskers were more easily distracted". Both <b>wrong</b>. Heavy = more distracted, worse at filtering.',
            'الاختيارات الغلط بتقلب النتيجة: تقولك إن الـ heavy multitaskers كانوا <b>أشطر</b> في فلترة المعلومات، أو إن الـ <b>light</b> هما اللي بيتشتتوا أكتر. الاتنين <b>غلط</b>. الـ heavy أكتر تشتت وأضعف في الفلترة.')}</p></${Box}>
          <${H2}>${t('Detour: where do alternative designs come from?', 'لفّة جانبية: الـ alternative designs بتيجي منين؟')}</${H2}>
          <${P} small=${true}>${X('This slide sits in the middle of this lecture, so here it is. Humans tend to <b>stick with something that works</b>, but considering alternatives helps identify <b>better designs</b>. Alternatives come from:',
            'الـ slide دي جاية في نص المحاضرة دي، فهنشرحها هنا. البني آدمين بيميلوا إنهم <b>يمسكوا في الحاجة اللي شغالة</b>، بس التفكير في alternatives بيساعدك تلاقي <b>designs أحسن</b>. وبتيجي من:')}</${P}>
          <${Steps} items=${A ? ['الـ <b>Flair and creativity</b>، يعني research و synthesis.', 'الـ <b>Cross-fertilization of ideas</b> من وجهات نظر مختلفة.', 'الـ <b>Users</b> نفسهم ممكن يطلّعوا designs مختلفة.', 'الـ <b>Seek inspiration</b>: منتجات و domain شبه بعض، أو مختلفين.']
            : ['<b>\'Flair and creativity\'</b>: research and synthesis.', '<b>Cross-fertilization of ideas</b> from different perspectives.', '<b>Users</b> can generate different designs.', '<b>Seek inspiration</b>: similar products and domain, or different products and domain.']} />
          <${Hand} red=${true}>${t('"Sticking with what already works" is NOT a source. It\'s the habit alternatives fight.', '"تمسك في اللي شغال" مش مصدر للـ alternatives. ده العادة اللي الـ alternatives بتحاربها.')}</${Hand}>
        `, { sec: t('Alternatives', 'الـ Alternatives') }),

        // 15 · phone driving figure
        page(html`
          <${Box} kind="brain"><p className="hf-p">${t('Is it OK to use a phone when driving? Give yourself one reason before you press play.', 'ينفع تستخدم الموبايل وإنت سايق؟ قول لنفسك سبب واحد قبل ما تشغّل.')}</p></${Box}>
          <${H2}>${t('The answer on the slide: No!', 'إجابة الـ slide: لأ!')}</${H2}>
          <${Fig} name="phone-driving" />
        `, { sec: t('Phones and driving', 'الموبايل والسواقة') }),

        // 16 · why not
        page(html`
          <${H2}>${t('Why the slide says no', 'ليه الـ slide بتقول لأ')}</${H2}>
          <${Steps} items=${A ? [
            'السواقة <b>متطلبة جدًا</b> (very demanding)، والسواقين <b>عرضة للتشتت</b>.',
            'فيه <b>احتمال كبير</b> إنهم يعملوا حوادث.',
            'الـ <b>reaction times</b> للأحداث الخارجية بتبقى <b>أطول</b> وهما بيتكلموا في التليفون في العربية، والمرجع <bdi dir="ltr">(Caird&nbsp;et&nbsp;al.,&nbsp;2018)</bdi>.',
            'بيعتمدوا أكتر على <b>توقعاتهم</b> للي هيحصل بعد كده، لأن المكالمة واخدة الـ attention بتاعهم.',
            'الـ <b>response time</b> أبطأ للأحداث <b>اللي مش متوقعة</b>، والمرجع <bdi dir="ltr">(Briggs&nbsp;et&nbsp;al.,&nbsp;2018)</bdi>.',
            'بيحاولوا <b>يتخيلوا وش</b> اللي بيكلموه، وده <b>بينافس على الـ processing resources</b> اللي محتاجينها عشان ياخدوا بالهم من اللي قدامهم.'
          ] : [
            'Driving is <b>very demanding</b>, and drivers are <b>prone to being distracted</b>.',
            'There is a <b>significant chance</b> of causing accidents.',
            '<b>Reaction times</b> to external events are <b>longer</b> when talking on the phone in a car (<b>Caird et al., 2018</b>).',
            'They rely more on their <b>expectations</b> of what is likely to happen next, as the conversation takes up their attention.',
            '<b>Response time</b> is slower to <b>unexpected</b> events (<b>Briggs et al., 2018</b>).',
            'They try to <b>imagine the other person\'s face</b>, which <b>competes with the processing resources</b> needed to notice and react to what is in front of them.'
          ]} />
          <${Hand} red=${true}>${t('Caird: reaction times to external events. Briggs: unexpected events.', 'الـ Caird: رد الفعل للأحداث الخارجية. الـ Briggs: الأحداث المفاجئة.')}</${Hand}>
        `),

        // 17 · hands-free + fireside part 1
        page(html`
          <${Def}>${X('<b>Are hands-free phones safer?</b> <b>No</b>, as the <b>same type of cognitive processing</b> is happening when talking.', '<b>هل الـ hands-free أأمن؟</b> <b>لأ</b>، لأن <b>نفس نوع الـ cognitive processing</b> بيحصل وإنت بتتكلم.')}</${Def}>
          <${Fireside} sub=${t('Tonight: a Front-Seat Passenger and a Remote Caller argue about who is worse for the driver.', 'قعدة الليلة: راكب قاعد قدام ومتصل من بعيد بيتخانقوا مين فيهم أوحش على السواق.')} />
          <${Chat} names=${[t('Passenger', 'الراكب'), t('Remote caller', 'المتصل')]} lines=${A ? [
            [0, 'هعترف: لما بكلّم السواق، بيحصل <b>نفس الحاجة</b>، نفس نوع الـ processing.'],
            [1, 'يبقى إحنا زي بعض! يعني اتكلم براحتي.'],
            [0, 'مش بالظبط. أنا قاعد جنبه. لو شفنا <b>خطر (hazard)</b>، الاتنين <b>بنوقف في نص الجملة</b>.'],
            [0, 'والسواق <b>بيحوّل على الطريق على طول</b>.']
          ] : [
            [0, "I'll admit it: when I chat with the driver, <b>the same thing happens</b>. Same type of processing."],
            [1, "So we're the same! I'll talk all I like."],
            [0, "Not quite. I'm sitting right here. If a <b>hazard</b> is spotted, we can both <b>stop mid-sentence</b>."],
            [0, 'And the driver can <b>switch immediately to the road</b>.']
          ]} />
        `),

        // 18 · fireside part 2
        page(html`
          <${Chat} names=${[t('Passenger', 'الراكب'), t('Remote caller', 'المتصل')]} start=${1} lines=${A ? [
            [1, 'وأنا مش شايف أي طريق من مكاني.'],
            [0, 'بالظبط. إنت <b>مش شايف اللي السواق شايفه</b> (not privy)، فـ<b>هتكمل الكلام</b> حتى والخطر قدامه.'],
            [1, 'وهو كمان بيحاول يتخيل وشي.'],
            [0, 'وده بيصعّب عليه <b>يحوّل كل الـ attention</b> بتاعه على الطريق.'],
            [1, 'يعني الكلام معاك...'],
            [0, '<b>أقل خطورة</b> من الكلام معاك إنت.']
          ] : [
            [1, "And I can't see any road from where I am."],
            [0, "Exactly. You're <b>not privy to what the driver is seeing</b>, so you <b>carry on the conversation</b> even when there's a hazard."],
            [1, "And they're busy picturing my face."],
            [0, 'Which makes it <b>difficult for the driver to switch all their attention</b> to the road.'],
            [1, 'So talking to you is...'],
            [0, '<b>Less dangerous</b> than talking to you.']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<i>"Hands-free phones are safe to use when driving because the hands stay on the wheel."</i> <b>False</b>: the problem is the <b>cognitive processing</b>, not the hands.',
            'دي <b>غلط</b>:<span class="ltr"><i>"Hands-free phones are safe to use when driving because the driver\'s hands stay on the wheel."</i></span>المشكلة في الـ <b>cognitive processing</b>، مش في الإيدين.')}</p></${Box}>
        `),

        // 19 · who found what
        page(html`
          <${H2}>${t('Who found what?', 'مين لقى إيه؟')}</${H2}>
          <${P} small=${true}>${t('Six names in this lecture, and the exam loves swapping them. Tap a study, then its finding.', 'ست أسامي في المحاضرة دي، والامتحان بيحب يبدّلهم. دوس على الدراسة، وبعدين على اللي لقته.')}</${P}>
          <${Match} id="who" left=${['<bdi dir="ltr">Kahneman (2011)</bdi>', '<bdi dir="ltr">Tullis (1987)</bdi>', '<bdi dir="ltr">Ophir et al. (2009)</bdi>', '<bdi dir="ltr">Caird et al. (2018)</bdi>', '<bdi dir="ltr">Briggs et al. (2018)</bdi>', '<bdi dir="ltr">Weller (2004)</bdi>']}
            right=${A ? ['الـ border بيكسب الـ color contrast في التدوير', 'رد فعل أبطأ للأحداث المفاجئة مع الموبايل', 'الـ fast vs slow thinking', 'الـ heavy multitaskers بيتشتتوا أكتر', 'نفس الـ density، و5.5 ثانية قصاد 3.2 بسبب الـ spacing', 'رد فعل أطول للأحداث الخارجية وإنت بتتكلم في التليفون في العربية']
              : ['Bordered groups beat color contrast for finding items', 'Slower response to unexpected events when on the phone', 'Fast vs slow thinking', 'Heavy multitaskers are more easily distracted', 'Same density, 5.5 s vs 3.2 s: spacing', 'Longer reaction times to external events when talking on the phone in a car']}
            answer=${[2, 4, 3, 5, 1, 0]} />
        `, { sec: t('Exercise: who found what?', 'تمرين: مين لقى إيه؟') }),

        // 20 · design implications for attention
        page(html`
          <${H1}>${t('Designing for attention', 'إزاي تصمم عشان الـ attention')}</${H1}>
          <${P} small=${true}>${t('The slide\'s four design implications:', 'الـ design implications الأربعة في الـ slide:')}</${P}>
          <${Steps} items=${A ? [
            'الـ <b>Context</b>: خلّي المعلومة <b>salient</b> (بارزة) لما يكون لازم ننتبه لها في مرحلة معينة من الـ task.',
            'استخدم techniques عشان كده: <b>اللون، والـ ordering، والـ spacing، والـ underlining، والـ sequencing، والـ animation</b>.',
            '<b>متزحمش</b> الـ visual interfaces بمعلومات كتير أوي (cluttering).',
            'فكّر في طرق مختلفة تدعم إن الـ user <b>يعمل switching بشكل فعال ويرجع</b> للـ interface.'
          ] : [
            'Context: make information <b>salient</b> when it needs to be attended to at a given stage of a task.',
            'Use techniques to achieve this: <b>color, ordering, spacing, underlining, sequencing and animation</b>.',
            '<b>Avoid cluttering</b> visual interfaces with too much information.',
            'Consider designing different ways to support <b>effective switching and returning</b> to an interface.'
          ]} />
          <${Talk} who="bug">${t('Hide the warning in clutter, make it the same colour as everything else... and I live forever.', 'خبّي التحذير وسط الزحمة، وخليه نفس لون كل حاجة... وأنا أعيش للأبد.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t('Watch it: "avoid animation and color" is wrong. They are on the list of techniques.', 'خلّي بالك: "ابعد عن الـ animation والألوان" غلط. دول من الـ techniques.')}</${Hand}>
        `, { sec: t('Designing for attention', 'التصميم للـ attention') }),

        // 21 · our salience experiment
        page(html`
          <${Box} kind="pencil" title=${t('Our experiment: make it salient', 'تجربة من عندنا: خليها بارزة')}><p className="hf-p small">${X('Not from the slides. Find the one <b>Q</b> among the <b>O</b>s. In round 2 the Q gets one design trick from the list: <b>color</b>.',
            'مش من السلايدز. دوّر على حرف <bdi dir="ltr"><b>Q</b></bdi> الوحيد وسط الـ <bdi dir="ltr"><b>O</b></bdi>. في الجولة التانية الـ Q هياخد حركة واحدة من القايمة: <b>اللون</b>.')}</p></${Box}>
          <${SearchTest} id="pop" h=${222} rounds=${[
            { kind: 'letters', items: LETTERS(31), target: 'Q', en: 'Round 1', ar: 'الجولة الأولى', task: 'Round 1: every letter looks the same. Find the <b>Q</b>.', taskAr: 'الجولة الأولى: كل الحروف شبه بعض. دوّر على الـ <bdi dir="ltr"><b>Q</b></bdi>.' },
            { kind: 'letters', items: LETTERS(12), pop: true, target: 'Q', en: 'Round 2', ar: 'الجولة التانية', task: 'Round 2: same letters, but the Q is <b>colored</b>. Find it.', taskAr: 'الجولة التانية: نفس الحروف، بس الـ Q <b>ملوّن</b>. دوّر عليه.' }
          ]} verdict=${['The colored Q is <b>salient</b>: it jumps out at you. That is the slide\'s advice for information that needs attending to.', 'الـ Q الملوّن <b>salient</b>، بينط في عينك. ودي نصيحة الـ slide للمعلومة اللي لازم ننتبه لها.']} />
          <${Grow} />
          <${Hand}>${t('try the same on a bunched-up screen: that\'s why clutter is on the "avoid" list', 'جرّب نفس الكلام على شاشة زحمة: عشان كده الـ clutter في قايمة "ابعد عنه"')}</${Hand}>
        `),

        // 22 · perception
        page(html`
          <${H1}>${t('Perception: getting it in', 'الـ Perception: إزاي المعلومة بتدخل')}</${H1}>
          <${Def}>${X('<b>Perception</b>: how information is <b>acquired from the world</b> and <b>transformed into experiences</b>.', 'الـ <b>Perception</b>: إزاي المعلومات <b>بتتاخد من العالم</b> و<b>بتتحول لـ experiences</b>.')}</${Def}>
          <${P}>${X('The obvious implication: design representations that are <b>readily perceivable</b>, for instance:', 'الـ implication الواضحة: صمم representations <b>سهل إنها تتدرك</b> (readily perceivable)، مثلاً:')}</${P}>
          <${UL} items=${A ? ['الـ <b>Text</b> لازم يكون <b>مقروء</b> (legible).', 'الـ <b>Icons</b> لازم تكون <b>سهل نفرّق بينها</b> ونقراها.'] : ['<b>Text</b> should be <b>legible</b>.', '<b>Icons</b> should be <b>easy to distinguish</b> and read.']} />
          <${Talk} who="lens" flip=${true}>${t('Attention picks what to focus on. Perception is how it gets in at all. If it can\'t be perceived, it can\'t be attended to.', 'الـ attention بيختار تركّز على إيه. الـ perception هو إزاي المعلومة بتدخل من الأساس. لو متتدركش، مش هتنتبهلها.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t('that last line is our summary, not the slide\'s', 'الجملة الأخيرة دي تلخيص من عندنا، مش من الـ slide')}</${Hand}>
        `, { sec: t('Perception', 'الـ Perception') }),

        // 23 · watch it: two definitions + face question
        page(html`
          <${Box} kind="watch" title=${t('Watch it: don\'t swap the definitions', 'خلّي بالك: متبدّلش التعريفين')}>
            ${li(A ? ['الـ <b>Attention</b>: نركّز على المعلومات اللي ليها علاقة باللي بنعمله.', 'الـ <b>Perception</b>: المعلومات بتتاخد من العالم وبتتحول لـ experiences.', 'أسئلة الـ quiz بتحط تعريف واحد منهم كاختيار غلط في سؤال التاني.']
              : ['<b>Attention</b>: focus on information relevant to what we are doing.', '<b>Perception</b>: information acquired from the world and transformed into experiences.', 'Quiz questions offer each one as a wrong choice in the other\'s question.'])}</${Box}>
          ${mq('m-face', /Recognizing a familiar face/i)}
        `),

        // 24 · Weller figure
        page(html`
          <${H2}>${t('Color contrast, or borders and white space?', 'الـ color contrast، ولا الـ borders والـ white space؟')}</${H2}>
          <${P} small=${true}>${X('<b>Weller (2004)</b>: two grids of 96 names. Groups split by <b>color contrast</b>, then by <b>borders</b> and <b>white space</b>. Time yourself:',
            'الباحث <b>Weller (2004)</b>: جدولين فيهم 96 اسم. مجموعات مفصولة بالـ <b>color contrast</b>، وبعدين بالـ <b>borders</b> والـ <b>white space</b>. احسب وقتك:')}</${P}>
          <${Fig} name="word-grids" />
        `, { sec: t('Weller: grouping', 'الباحث Weller: التجميع') }),

        // 25 · Weller result
        page(html`
          <${H2}>${t('What Weller found', 'Weller لقى إيه')}</${H2}>
          <div className="hf-hci3-car hf-in">
            <div><h5>${t('1st screen: find Italian', 'الشاشة الأولى: دوّر على Italian')}</h5><p>${X('Groups separated <b>only by color contrast</b> (alternating light blue and white).', 'المجموعات مفصولة <b>بالـ color contrast بس</b> (لبني فاتح وأبيض بالتبادل).')}</p></div>
            <div className="hf-hci3-ok"><h5>${t('2nd screen: find French', 'الشاشة التانية: دوّر على French')}</h5><p>${X('Each group in a <b>border</b>, with <b>white space</b> between groups.', 'كل مجموعة جوه <b>border</b>، وبينها وبين الباقي <b>white space</b>.')}</p></div>
          </div>
          <${Def}>${X('People took <b>less time</b> to locate items when the information was grouped using a <b>border</b> (2nd screen) than using <b>color contrast</b> (1st screen).',
            'الناس أخدوا <b>وقت أقل</b> عشان يلاقوا الـ items لما المعلومات كانت متجمعة بـ <b>border</b> (الشاشة التانية) مقارنة بالـ <b>color contrast</b> (الشاشة الأولى).')}</${Def}>
          <${Box} kind="brain"><p className="hf-p small">${X('Some argue that <b>too much white space</b> on web pages is detrimental to the search process: it makes it hard to find information. <b>Do you agree?</b> (The slide leaves it for discussion.)',
            'فيه ناس بتقول إن الـ <b>white space الكتير أوي</b> في صفحات الويب بيضر عملية التدوير وبيصعّب إنك تلاقي المعلومة. <b>إنت موافق؟</b> (الـ slide سايباها للمناقشة.)')}</p></${Box}>
          <${Grow} />
          <${Hand} red=${true}>${t('Watch it: Weller\'s finding is borders beat color contrast, not the reverse. "Too much white space slows search" is what some argue, not his finding.', 'خلّي بالك: نتيجة Weller إن الـ borders كسبت الـ color contrast، مش العكس. و"الـ white space الكتير بيبطّأ" ده رأي ناس، مش نتيجته.')}</${Hand}>
        `),

        // 26 · time boxes
        page(html`
          <${H2}>${t('Which is the easiest to read, and why?', 'أنهي واحد أسهل في القراية، وليه؟')}</${H2}>
          <${Fig} name="time-boxes" />
        `),

        // 27 · design implications for perception
        page(html`
          <${H1}>${t('Designing for perception', 'إزاي تصمم عشان الـ perception')}</${H1}>
          <${Steps} items=${A ? [
            'الـ <b>Icons</b> لازم تخلي الـ users <b>يفرّقوا</b> معناها بسهولة.',
            'الـ <b>Bordering and spacing</b> طرق بصرية فعالة لتجميع المعلومات.',
            'الأصوات لازم تكون <b>مسموعة</b> وسهل نفرّق بينها.',
            'اعمل research على techniques الـ <b>color contrast</b> الصح وإنت بتصمم interface.'
          ] : [
            '<b>Icons</b> should enable users to <b>distinguish</b> their meaning readily.',
            '<b>Bordering and spacing</b> are effective visual ways of grouping information.',
            'Sounds should be <b>audible and distinguishable</b>.',
            'Research proper <b>color contrast</b> techniques when designing an interface.'
          ]} />
          <div className="hf-hci3-car hf-in">
            <div className="hf-hci3-ok"><h5>${t('Fine', 'تمام')}</h5><p><span className="hf-hci3-sw" style=${{ background: '#000', color: '#facc15' }}>${t('Yellow on black', 'أصفر على أسود')}</span></p><p style=${{ marginTop: '5px' }}><span className="hf-hci3-sw" style=${{ background: '#1d4ed8', color: '#facc15' }}>${t('Yellow on blue', 'أصفر على أزرق')}</span></p></div>
            <div className="hf-hci3-bad"><h5>${t('A no-no', 'ممنوع خالص')}</h5><p><span className="hf-hci3-sw" style=${{ background: '#16a34a', color: '#facc15' }}>${t('Yellow on green', 'أصفر على أخضر')}</span></p><p style=${{ marginTop: '5px' }}><span className="hf-hci3-sw" style=${{ background: '#fff', color: '#facc15' }}>${t('Yellow on white', 'أصفر على أبيض')}</span></p></div>
          </div>
          <${Hand} red=${true}>${t('yellow is the trap: fine on black or blue, a no-no on green or white', 'الأصفر هو الفخ: تمام على أسود أو أزرق، وممنوع على أخضر أو أبيض')}</${Hand}>
        `, { sec: t('Designing for perception', 'التصميم للـ perception') }),

        // 28 · sort: attention or perception
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Which list does each design advice come from? <b>A</b> = attention, <b>P</b> = perception.', 'كل نصيحة دي جاية من أنهي قايمة؟ حرف <b>A</b> للـ attention وحرف <b>P</b> للـ perception.')}</p></${Box}>
          <${Sort} id="ap" bins=${A ? [['A', 'الـ attention'], ['P', 'الـ perception']] : [['A', 'Attention'], ['P', 'Perception']]} items=${A ? [
            ['خلّي المعلومة salient في المرحلة اللي محتاجاها', 0],
            ['الأيقونات لازم معناها يبان بسهولة', 1],
            ['متزحمش الـ interface بمعلومات كتير', 0],
            ['الـ bordering والـ spacing بيجمّعوا المعلومات', 1],
            ['ادعم الـ switching والرجوع للـ interface', 0],
            ['الأصوات مسموعة وسهل نفرّق بينها', 1],
            ['استخدم اللون والـ underlining والـ animation', 0],
            ['ادرس الـ color contrast الصح', 1]
          ] : [
            ['Make information salient at the stage it is needed', 0],
            ['Icons should let users distinguish their meaning', 1],
            ['Avoid cluttering the interface with too much information', 0],
            ['Bordering and spacing group information', 1],
            ['Support effective switching and returning to an interface', 0],
            ['Sounds should be audible and distinguishable', 1],
            ['Use color, underlining, sequencing and animation', 0],
            ['Research proper color contrast techniques', 1]
          ]} />
        `, { sec: t('Exercise: attention or perception?', 'تمرين: attention ولا perception؟') }),

        // 29 · sort: fine or no-no
        page(html`
          <${Box} kind="pencil" title=${t('Be the color checker', 'خليك إنت اللي بيراجع الألوان')}><p className="hf-p small">${X('By the slide\'s rule: <b>fine</b> or a <b>no-no</b>?', 'حسب قاعدة الـ slide: <b>تمام</b> ولا <b>ممنوع</b>؟')}</p></${Box}>
          <${Sort} id="col" bins=${A ? [['تمام', 'تمام'], ['ممنوع', 'ممنوع خالص']] : [['Fine', 'Fine'], ['No', 'A no-no']]} items=${[
            ['<span class="hf-hci3-sw" style="background:#fff;color:#facc15">' + t('Yellow on white', 'أصفر على أبيض') + '</span>', 1],
            ['<span class="hf-hci3-sw" style="background:#1d4ed8;color:#facc15">' + t('Yellow on blue', 'أصفر على أزرق') + '</span>', 0],
            ['<span class="hf-hci3-sw" style="background:#16a34a;color:#facc15">' + t('Yellow on green', 'أصفر على أخضر') + '</span>', 1],
            ['<span class="hf-hci3-sw" style="background:#000;color:#facc15">' + t('Yellow on black', 'أصفر على أسود') + '</span>', 0]
          ]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Now look back at the five "What is the time?" boxes. The slide never says which is easiest. Which would you pick, and which design implication backs you up?', 'ارجع بص على الخمس مربعات بتوع <bdi dir="ltr">"What is the time?"</bdi>. الـ slide عمرها ما قالت أنهي أسهل. إنت هتختار أنهي، وأنهي design implication بتأيدك؟')}</p></${Box}>
        `),

        // 30 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ Tullis والـ Weller نفس الحاجة؟', 'قريبين، بس <b>السبب مختلف</b>. الـ Tullis: الـ <b>spacing</b> (vertical categories)، و<bdi dir="ltr">5.5 s</bdi> قصاد <bdi dir="ltr">3.2 s</bdi>. الـ Weller: الـ <b>border</b> كسب الـ <b>color contrast</b>.'],
            ['لو الـ hands-free مش أأمن، يبقى الكلام مع الراكب خطر برضه؟', 'نفس الـ processing بيحصل، بس الراكب <b>أقل خطورة</b>: بيشوف الخطر وبيوقف الكلام. اللي في التليفون مش شايف، فبيكمل.'],
            ['التعرف على وش حد أعرفه perception ولا memory؟', 'في الميدترم الإجابة <b>perception</b>. المحاضرة 4 بتستخدم نفس المثال للـ memory، بس الـ memory مكانتش من الاختيارات.'],
            ['الـ alternatives بتعمل إيه في محاضرة الـ cognition؟', 'هي في سلايدز المحاضرة دي، فاحفظ مصادرها الأربعة.']
          ] : [
            ['Are Tullis and Weller the same thing?', 'Close, but the <b>reason differs</b>. Tullis: <b>spacing</b> (vertical categories), 5.5 s vs 3.2 s. Weller: <b>borders</b> beat <b>color contrast</b>.'],
            ['If hands-free isn\'t safer, is talking to a passenger dangerous too?', 'The same processing happens, but a passenger is <b>less dangerous</b>: they see the hazard and stop talking. The remote caller can\'t see it and carries on.'],
            ['Is recognizing a face perception or memory?', 'The midterm\'s answer is <b>perception</b>. Lecture 4 uses the same example for memory, but memory wasn\'t one of the choices.'],
            ['What is "generating alternatives" doing in a cognition lecture?', 'It\'s on these slides, so learn its four sources: flair and creativity, cross-fertilization, users, seeking inspiration.']
          ]} />
        `),

        // 31–32 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from this year's midterm. Tap an answer to see why.", 'أسئلة حقيقية من ميدترم السنة دي.')}</p></${Box}>
          ${mq('m-is', /^Which of the following is a cognitive process/i)}
          ${mq('m-not', /is NOT a cognitive process/)}
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-att', /^What is attention/i)}
          <${Gap} h=${6} />
          ${mq('m-exam', /Choosing the correct answer in an exam/i)}
        `),

        // 33 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'تصنيف الـ <b>cognition</b> على مستوى أعلى:<span class="ltr"><b>fast vs slow thinking</b> (Kahneman, 2011)</span>',
            'الـ six cognitive processes بالترتيب:<span class="ltr">attention, perception, memory, learning, reading/speaking/listening, problem-solving/planning/reasoning/decision-making</span>',
            'الـ <b>Attention</b>: نركّز على المعلومة اللي ليها علاقة باللي بنعمله. سمعي و/أو بصري، focused و divided.',
            'الباحث Tullis (1987): نفس الـ density، و<bdi dir="ltr">5.5 s</bdi> قصاد <bdi dir="ltr">3.2 s</bdi>، والسبب الـ <b>spacing</b>.',
            'الباحثين Ophir et al. (2009): الـ heavy multitaskers أكتر تشتت وأضعف في فلترة المعلومات.',
            'الموبايل وإنت سايق <b>لأ</b>، ولا حتى الـ hands-free.',
            'الـ <b>Perception</b>: المعلومات بتتاخد من العالم وبتتحول لـ experiences. الباحث Weller (2004): الـ border كسب الـ color contrast. والأصفر على أخضر أو أبيض ممنوع.'
          ] : [
            'Cognition at a higher level: <b>fast vs slow thinking</b> (Kahneman, 2011).',
            'Six cognitive processes: attention, perception, memory, learning, reading/speaking/listening, problem-solving/planning/reasoning/decision-making.',
            '<b>Attention</b>: focus on information relevant to what we are doing. Audio and/or visual; focused and divided.',
            'Tullis (1987): same density, 5.5 s vs 3.2 s, because of <b>spacing</b>.',
            'Ophir et al. (2009): heavy multitaskers are more distracted and worse at filtering irrelevant information.',
            'Phone while driving: <b>No</b>. Hands-free: still no. A passenger is less dangerous than a remote caller.',
            '<b>Perception</b>: information acquired from the world and transformed into experiences. Weller (2004): borders beat color contrast. Yellow on green or white: a no-no.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 34 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 3!', 'خلّصت الفصل التالت!')}</${H1}>
            <${Talk} who="lens">${t('Next time: memory, learning, language and reflective cognition.', 'المرة الجاية: الـ memory والـ learning والـ language والـ reflective cognition.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [3], t: Date.now() } }}>${t('Quiz me on Lecture 3', 'امتحنّي في محاضرة 3')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 3, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 3, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

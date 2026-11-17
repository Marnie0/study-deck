// Head First chapter for Human Computer Interaction Lecture 4 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Cognition, part 2: memory (encode then retrieve, filtering, context, recognition vs recall, Henkel 2014), what is easy to
// remember (visual cues vs arbitrary material), Miller's 7 ± 2 and the slide's open questions about it, design implications for
// memory, learning (incidental vs intentional, learn by doing) and its design implications, reading, speaking and listening with
// their applications and design implications, and reflective cognition (problem-solving, planning, reasoning, decision-making).
// Every fact comes from the lecture's notes; analogies, scenarios and examples that are ours are marked as ours.
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-hci4')) {
    const s = document.createElement('style'); s.id = 'hf-css-hci4';
    s.textContent = `
.hfb .hf-hci4-box{ border:2px solid var(--hf-line); border-radius:8px; overflow:hidden; background:var(--paper); }
.hfb .hf-hci4-bar{ display:flex; gap:8px; align-items:center; padding:7px 10px; background:var(--hf-grey); }
.hfb .hf-hci4-bar .grow{ flex:1; }
.hfb .hf-hci4-dots{ display:flex; gap:5px; } .hfb .hf-hci4-dots i{ width:8px; height:8px; border-radius:50%; background:var(--hf-grey2); } .hfb .hf-hci4-dots i.on{ background:var(--hf-k); }
.hfb .hf-hci4-cap{ margin:0; padding:8px 10px; height:66px; font-size:14px; line-height:1.36; color:var(--ink); border-top:1.5px solid var(--hf-grey2); }
.hfb .hf-hci4-cap b{ color:var(--hf-k); font-weight:700; }
/* memory funnel */
.hfb .hf-hci4-fun{ padding:8px 10px; display:grid; gap:4px; }
.hfb .hf-hci4-zone{ border:1.5px solid var(--hf-line); border-radius:7px; padding:5px 7px 6px; min-height:58px; }
.hfb .hf-hci4-zone > p{ margin:0 0 4px; font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--graphite); }
.hfb .hf-hci4-zone.mem{ background:color-mix(in srgb, var(--hf-k) 10%, var(--paper)); border-color:var(--hf-k); }
.hfb .hf-hci4-chips{ display:flex; flex-wrap:wrap; gap:4px; }
.hfb .hf-hci4-chips span{ font:600 13px/1.2 var(--body); border:1.5px solid var(--faint); border-radius:99px; padding:2px 8px; color:var(--ink); background:var(--paper); transition:opacity .4s, border-color .4s; }
.hfb .hf-hci4-chips span.at{ border-color:var(--hf-k); box-shadow:0 0 0 1.5px var(--hf-k); }
.hfb .hf-hci4-chips span.gone{ opacity:.3; text-decoration:line-through; }
.hfb .hf-hci4-flt{ position:relative; height:22px; display:flex; align-items:center; justify-content:center; }
.hfb .hf-hci4-flt::before{ content:""; position:absolute; left:8%; right:8%; top:50%; border-top:3px dotted var(--hf-line); }
.hfb .hf-hci4-flt span{ position:relative; background:var(--paper); padding:0 8px; font:700 13px/1 var(--body); color:var(--ink); }
.hfb .hf-hci4-flt.on span{ color:var(--hf-red); }
.hfb .hf-hci4-out{ display:flex; gap:6px; align-items:center; min-height:30px; font:600 13.5px/1.25 var(--body); color:var(--ink); }
.hfb .hf-hci4-out .ar{ font:800 18px/1 var(--body); color:var(--hf-k); }
.hfb .hf-hci4-out .dim{ color:var(--graphite); font-weight:500; }
/* memory lab */
.hfb .hf-hci4-lab{ padding:9px 10px; height:320px; display:flex; flex-direction:column; gap:7px; }
.hfb .hf-hci4-lab .hf-p{ font-size:14px; }
.hfb .hf-hci4-words{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-hci4-words span{ text-align:center; font:700 17px/1.2 var(--body); padding:7px 4px; border-radius:7px; background:var(--hf-grey); color:var(--ink); }
.hfb .hf-hci4-time{ height:6px; border-radius:3px; background:var(--hf-grey2); overflow:hidden; }
.hfb .hf-hci4-time i{ display:block; height:100%; background:var(--hf-k); animation:hf-hci4-run 10s linear both; }
@keyframes hf-hci4-run{ from{ width:100%; } to{ width:0; } }
.hfb .hf-hci4-nums{ display:grid; grid-template-columns:repeat(9,1fr); gap:4px; }
.hfb .hf-hci4-nums button{ min-height:36px; border-radius:6px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); font:800 15px/1 var(--body); cursor:pointer; padding:0; }
.hfb .hf-hci4-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:4px; }
.hfb .hf-hci4-grid button{ min-height:34px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); font:600 13px/1.15 var(--body); cursor:pointer; padding:2px; }
.hfb .hf-hci4-grid button[aria-pressed="true"]{ border-color:var(--hf-hand); box-shadow:0 0 0 2px var(--hf-hand); }
.hfb .hf-hci4-grid button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, var(--paper)); box-shadow:none; }
.hfb .hf-hci4-grid button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); box-shadow:none; }
.hfb .hf-hci4-grid button.miss{ border-style:dashed; border-color:var(--ok); }
.hfb .hf-hci4-res{ display:grid; gap:7px; }
.hfb .hf-hci4-res .rw{ display:grid; grid-template-columns:96px 1fr 42px; gap:8px; align-items:center; font:700 14px/1.1 var(--body); color:var(--ink); }
.hfb .hf-hci4-res .tr{ height:18px; border-radius:4px; background:var(--hf-grey2); overflow:hidden; }
.hfb .hf-hci4-res .tr i{ display:block; height:100%; background:var(--hf-k); transition:width .8s; }
.hfb .hf-hci4-res .rw.rec .tr i{ background:var(--hf-hand); }
/* the neighbor on the train */
.hfb .hf-hci4-sc{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-hci4-pn{ border:2px solid var(--hf-line); border-radius:8px; overflow:hidden; display:flex; flex-direction:column; }
.hfb .hf-hci4-pn > p{ margin:0; padding:5px 7px; font:800 13px/1.1 var(--body); background:var(--hf-grey); color:var(--ink); }
.hfb .hf-hci4-pn .st{ position:relative; height:112px; }
.hfb .hf-hci4-pn .st svg.bg{ position:absolute; inset:0; width:100%; height:100%; color:var(--graphite); }
.hfb .hf-hci4-pn .who-svg{ position:absolute; left:50%; bottom:2px; width:54px; height:54px; margin-left:-27px; color:var(--hf-line); }
.hfb .hf-hci4-pn .th{ position:relative; height:44px; padding:5px 7px; font:600 13.5px/1.25 var(--body); color:var(--ink); border-top:1.5px dashed var(--hf-line); }
.hfb .hf-hci4-pn .th span{ position:absolute; left:7px; right:7px; top:5px; }
.hfb .hf-hci4-pn .th .a1{ color:var(--hf-red); animation:hf-hci4-a1 6s infinite; }
.hfb .hf-hci4-pn .th .a2{ color:var(--ok); animation:hf-hci4-a2 6s infinite; }
@keyframes hf-hci4-a1{ 0%,45%{ opacity:1; } 50%,95%{ opacity:0; } 100%{ opacity:1; } }
@keyframes hf-hci4-a2{ 0%,45%{ opacity:0; } 50%,95%{ opacity:1; } 100%{ opacity:0; } }
.hfb .hf-hci4-pn .th.calm .a1{ display:none; } .hfb .hf-hci4-pn .th.calm .a2{ animation:none; opacity:1; }
/* labelling: before and after */
.hfb .hf-hci4-tabs{ display:flex; gap:5px; }
.hfb .hf-hci4-tabs button{ flex:1 1 0; min-width:0; min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); font:800 14px/1 var(--body); cursor:pointer; }
.hfb .hf-hci4-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-hci4-files{ border:1.5px solid var(--hf-line); border-radius:7px; overflow:hidden; height:206px; }
.hfb .hf-hci4-files .f{ display:grid; grid-template-columns:14px 1fr auto; gap:8px; align-items:center; padding:5px 9px; border-top:1px solid var(--hf-grey2); font:500 13.5px/1.25 var(--body); color:var(--ink); }
.hfb .hf-hci4-files .f:first-child{ border-top:0; }
.hfb .hf-hci4-files .f .d{ width:11px; height:11px; border-radius:50%; background:var(--hf-grey2); }
.hfb .hf-hci4-files .f code{ font:600 13px var(--mono); background:none; padding:0; }
.hfb .hf-hci4-files .f .m{ font:600 13px/1 var(--body); color:var(--graphite); white-space:nowrap; }
.hfb .hf-hci4-files .f .fl{ color:var(--hf-red); font-weight:800; }
.hfb .hf-hci4-files .f.dir{ font-weight:700; background:var(--hf-grey); }
/* reading, speaking, listening table */
.hfb .hf-hci4-tb{ display:grid; grid-template-columns:1.1fr 1fr; border:1.5px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-hci4-tb > span{ padding:6px 9px; font-size:14px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-hci4-tb > span:nth-child(-n+2){ border-top:0; }
.hfb .hf-hci4-tb > span.h{ font:800 13px/1.3 var(--body); text-transform:uppercase; letter-spacing:.05em; background:var(--hf-line); color:var(--paper); }
.hfb .hf-hci4-tb > span.k{ font-weight:700; color:var(--hf-k); background:var(--hf-grey); }
/* reflective cognition: the scale */
.hfb .hf-hci4-wp{ padding:8px 10px 2px; height:176px; display:flex; flex-direction:column; gap:5px; }
.hfb .hf-hci4-st{ font:800 17px/1.15 var(--body); color:var(--hf-k); margin:0; }
.hfb .hf-hci4-scale{ position:relative; height:104px; }
.hfb .hf-hci4-beam{ position:absolute; left:20px; right:20px; top:26px; height:4px; background:var(--hf-line); border-radius:2px; transition:transform .8s cubic-bezier(.3,.7,.3,1); }
.hfb .hf-hci4-post{ position:absolute; left:50%; top:26px; width:4px; margin-left:-2px; height:66px; background:var(--hf-line); }
.hfb .hf-hci4-base{ position:absolute; left:50%; bottom:6px; width:70px; margin-left:-35px; height:5px; background:var(--hf-line); border-radius:3px; }
.hfb .hf-hci4-pan{ position:absolute; top:4px; width:96px; text-align:center; }
.hfb .hf-hci4-pan.l{ left:-30px; } .hfb .hf-hci4-pan.r{ right:-30px; }
.hfb .hf-hci4-pan i{ display:block; margin:0 auto; width:2px; height:20px; background:var(--hf-line); }
.hfb .hf-hci4-pan b{ display:block; border:2px solid var(--hf-line); border-top:0; border-radius:0 0 40px 40px; padding:3px 4px 6px; font:700 13px/1.15 var(--body); color:var(--ink); background:var(--paper); }
.hfb .hf-hci4-pan.win b{ border-color:var(--hf-k); color:var(--hf-k); }
.hfb .hf-hci4-mt .hf-match{ grid-template-columns:1fr 1.2fr; }
.hfb .hf-hci4-art{ display:flex; flex-wrap:wrap; gap:5px; }
.hfb .hf-hci4-art span{ font:600 13px/1.2 var(--body); border:1.5px dashed var(--hf-line); border-radius:6px; padding:3px 8px; color:var(--ink); }
.hf-ar .hf-hci4-cap, .hf-ar .hf-hci4-zone > p, .hf-ar .hf-hci4-chips span, .hf-ar .hf-hci4-flt span, .hf-ar .hf-hci4-out, .hf-ar .hf-hci4-words span, .hf-ar .hf-hci4-grid button, .hf-ar .hf-hci4-res .rw, .hf-ar .hf-hci4-pn > p, .hf-ar .hf-hci4-pn .th, .hf-ar .hf-hci4-tabs button, .hf-ar .hf-hci4-files .f, .hf-ar .hf-hci4-files .f .m, .hf-ar .hf-hci4-tb > span, .hf-ar .hf-hci4-st, .hf-ar .hf-hci4-pan b, .hf-ar .hf-hci4-art span{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hf-ar .hf-hci4-cap{ line-height:1.5; font-size:13.5px; height:70px; }
.hf-ar .hf-hci4-tb > span{ line-height:1.45; font-size:13.5px; padding:5px 8px; }
.hf-ar .hf-hci4-pn .th span{ line-height:1.4; }
.hf-ar .hf-hci4-st{ font-weight:700; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-hci4-time i, .hfb .hf-hci4-pn .th span{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  // a stepper's controls: back, play/pause, next, and dots (the arrows swap sides in the Arabic book)
  function Stepper({ i, setI, n, play, setPlay }) {
    const ar = useAr(), last = n - 1;
    return html`<div className="hf-hci4-bar">
      <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.max(0, i - 1)); }} disabled=${i === 0} aria-label=${ar ? 'الخطوة اللي فاتت' : 'Back one step'}>${ar ? '›' : '‹'}</button>
      <button className="hf-btn solid" onClick=${() => { if (i >= last) setI(0); setPlay(!play); }}>${play ? (ar ? 'وقّف' : 'Pause') : i >= last ? (ar ? 'شغّلها تاني' : 'Run it again') : (ar ? 'شغّل' : 'Play')}</button>
      <button className="hf-btn" onClick=${() => { setPlay(false); setI(Math.min(last, i + 1)); }} disabled=${i === last} aria-label=${ar ? 'الخطوة الجاية' : 'Next step'}>${ar ? '‹' : '›'}</button>
      <span className="grow"></span>
      <span className="hf-hci4-dots">${Array.from({ length: n }, (_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</span>
    </div>`;
  }
  function usePlay(i, setI, n, ms) {
    const [play, setPlay] = useState(false);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(i + 1), ms); return () => clearTimeout(t); }, [play, i]);
    return [play, setPlay];
  }

  // memory: what is around you, the filter (what you attend to), encoding, and retrieval (our example scene)
  const AROUND = [['a face', 'وش', 1], ['her name', 'اسمها', 1], ['a song', 'أغنية', 0], ['a red car', 'عربية حمرا', 1], ['the clock', 'الساعة', 0], ['a poster', 'بوستر', 0]];
  const FUN = [
    ['<b>Around you:</b> lots of things reach your senses at once. (Our example: you meet someone new at a party.)', '<b>حواليك:</b> حاجات كتير بتوصل لحواسك مرة واحدة. (مثال من عندنا: قابلت حد جديد في حفلة.)'],
    ['<b>Filtering:</b> we don\'t remember everything. Memory filters and processes only <b>what is attended to</b>.', '<b>الـ filtering:</b> إحنا مش بنفتكر كل حاجة. الـ memory بتعمل filtering وprocessing للي <b>ركزنا معاه</b> بس.'],
    ['<b>Encode first:</b> what got through the filter is <b>encoded</b> into memory, along with its context: where, when, how.', '<b>الأول encode:</b> اللي عدّى من الـ filter بيتعمله <b>encode</b> في الـ memory، ومعاه الـ context بتاعه: فين، وإمتى، وإزاي.'],
    ['<b>Then retrieve:</b> later you <b>retrieve</b> it to act appropriately: recognizing her face, remembering her name.', '<b>وبعدين retrieve:</b> بعدين بتعمله <b>retrieve</b> عشان تتصرف صح: تتعرف على وشها، وتفتكر اسمها.']
  ];
  function Funnel() {
    const ar = useAr();
    const [i, setI] = H.K.useSlot('fun', 0);
    const [play, setPlay] = usePlay(i, setI, FUN.length, 2600);
    return html`<div className="hf-hci4-box hf-in">
      <div className="hf-hci4-fun">
        <div className="hf-hci4-zone"><p>${ar ? 'حواليك' : 'Around you'}</p>
          <div className="hf-hci4-chips">${AROUND.map((a, j) => html`<span key=${j} className=${i >= 1 ? (a[2] ? 'at' : 'gone') : ''}>${ar ? a[1] : a[0]}</span>`)}</div></div>
        <div className=${'hf-hci4-flt' + (i === 1 ? ' on' : '')}><span>${ar ? 'الـ filter: اللي ركزت معاه' : 'filter: what you attend to'}</span></div>
        <div className="hf-hci4-zone mem"><p>${ar ? 'الـ memory (بعد الـ encode)' : 'Memory (encoded)'}</p>
          <div className="hf-hci4-chips">${i >= 2 ? AROUND.filter(a => a[2]).map((a, j) => html`<span key=${j} className="at hf-in" style=${{ animationDelay: calm() ? '0s' : j * 0.15 + 's' }}>${ar ? a[1] : a[0]}</span>`) : null}</div></div>
        <div className="hf-hci4-out">${i >= 3 ? html`<span className="ar">${ar ? '←' : '→'}</span><span className="hf-in">${ar ? html`الـ retrieve: «أنا عارف الوش ده... اسمها منى!»` : 'retrieve: "I know that face... it\'s Mona!"'}</span>` : html`<span className="dim">${ar ? 'الـ retrieve بييجي في الآخر' : 'retrieval comes last'}</span>`}</div>
      </div>
      <p className="hf-hci4-cap" key=${i}>${T(ar ? FUN[i][1] : FUN[i][0])}</p>
      <${Stepper} i=${i} setI=${setI} n=${FUN.length} play=${play} setPlay=${setPlay} />
    </div>`;
  }

  // a small memory experiment: study 8 words, recall them, then recognize them among 16
  const W_EN = ['kite', 'lemon', 'anchor', 'guitar', 'candle', 'tiger', 'bridge', 'rocket'];
  const L_EN = ['kettle', 'mango', 'ladder', 'drum', 'lamp', 'lion', 'tunnel', 'train'];
  const W_AR = ['طيارة ورق', 'ليمونة', 'مرساة', 'جيتار', 'شمعة', 'نمر', 'كوبري', 'صاروخ'];
  const L_AR = ['براد', 'مانجة', 'سلّم', 'طبلة', 'لمبة', 'أسد', 'نفق', 'قطر'];
  const ORDER = [[1, 0], [0, 2], [1, 3], [0, 0], [0, 5], [1, 1], [1, 6], [0, 7], [0, 1], [1, 4], [0, 4], [1, 2], [0, 6], [1, 7], [0, 3], [1, 5]];
  function MemLab() {
    const ar = useAr();
    const [st, setSt] = H.K.useSlot('lab', { ph: 0, n: 0, pick: {} });
    const W = ar ? W_AR : W_EN, L = ar ? L_AR : L_EN;
    const go = o => setSt(Object.assign({}, st, o));
    useEffect(() => { if (st.ph !== 1) return; const t = setTimeout(() => go({ ph: 2 }), 10000); return () => clearTimeout(t); }, [st.ph]);
    const hits = ORDER.filter((o, k) => o[0] === 0 && st.pick[k]).length;
    const fa = ORDER.filter((o, k) => o[0] === 1 && st.pick[k]).length;
    let body;
    if (st.ph === 0) body = html`
      <p className="hf-p hf-in">${T(ar ? '<b>التجربة:</b> هتظهر 8 كلمات لمدة 10 ثواني. اقراهم مرة واحدة، <b>ومتكتبهمش</b>.' : '<b>The experiment:</b> 8 words will show for 10 seconds. Read them once, and <b>don\'t write them down</b>.')}</p>
      <p className="hf-p hf-in">${T(ar ? 'بعدها هنعمل اختبارين: <b>recall</b> (تفتكر من دماغك) و<b>recognition</b> (تتعرف عليهم وسط كلمات تانية).' : 'Then two tests: <b>recall</b> (bring them back from memory alone) and <b>recognition</b> (spot them among other words).')}</p>
      <div className="grow"></div>
      <div className="hf-row" style=${{ justifyContent: 'center' }}><button className="hf-btn solid" onClick=${() => go({ ph: 1, n: 0, pick: {} })}>${ar ? 'يلا نبدأ' : 'Start the clock'}</button></div>`;
    else if (st.ph === 1) body = html`
      <div className="hf-hci4-time"><i style=${calm() ? { animation: 'none', width: '50%' } : null}></i></div>
      <div className="hf-hci4-words">${W.map((w, k) => html`<span key=${k}>${w}</span>`)}</div>
      <div className="grow"></div>
      <div className="hf-row" style=${{ justifyContent: 'center' }}><button className="hf-btn" onClick=${() => go({ ph: 2 })}>${ar ? 'خلّصت قبل الوقت' : "I'm done early"}</button></div>`;
    else if (st.ph === 2) body = html`
      <p className="hf-p hf-in">${T(ar ? '<b>الكلمات اختفت! الـ recall:</b> قول أو اكتب على ورقة كل اللي فاكره، من دماغك بس.' : '<b>Words gone! Recall:</b> say or jot down every word you can, from memory alone.')}</p>
      <p className="hf-p hf-in">${ar ? 'افتكرت كام كلمة؟' : 'How many did you get?'}</p>
      <div className="hf-hci4-nums" dir="ltr">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => html`<button key=${k} onClick=${() => go({ ph: 3, n: k })}>${k}</button>`)}</div>
      <div className="grow"></div>
      <${H.K.Hand}>${ar ? 'بأمانة! ده بينك وبين نفسك.' : 'Be honest. Nobody is watching.'}</${H.K.Hand}>`;
    else if (st.ph === 3) body = html`
      <p className="hf-p hf-in">${T(ar ? '<b>الـ recognition:</b> دوس على كل كلمة كانت في الليستة.' : '<b>Recognition:</b> tap every word that was on the list.')}</p>
      <div className="hf-hci4-grid">${ORDER.map((o, k) => html`<button key=${k} aria-pressed=${String(!!st.pick[k])} onClick=${() => go({ pick: Object.assign({}, st.pick, { [k]: !st.pick[k] }) })}>${o[0] ? L[o[1]] : W[o[1]]}</button>`)}</div>
      <div className="grow"></div>
      <div className="hf-row" style=${{ justifyContent: 'center' }}><button className="hf-btn solid" onClick=${() => go({ ph: 4 })}>${ar ? 'صحّح' : 'Check'}</button></div>`;
    else body = html`
      <div className="hf-hci4-grid">${ORDER.map((o, k) => html`<button key=${k} disabled=${true} className=${st.pick[k] ? (o[0] ? 'no' : 'ok') : (o[0] ? '' : 'miss')}>${o[0] ? L[o[1]] : W[o[1]]}</button>`)}</div>
      <div className="hf-hci4-res">
        <div className="rw"><span>${ar ? 'الـ recall' : 'Recall'}</span><span className="tr"><i style=${{ width: (st.n / 8 * 100) + '%' }}></i></span><bdi dir="ltr">${st.n} / 8</bdi></div>
        <div className="rw rec"><span>${ar ? 'الـ recognition' : 'Recognition'}</span><span className="tr"><i style=${{ width: (hits / 8 * 100) + '%' }}></i></span><bdi dir="ltr">${hits} / 8</bdi></div>
      </div>
      <p className="hf-p small">${T(ar ? `${fa ? `اخترت ${fa} كلمة مكانتش موجودة. ` : ''}الأخضر المتقطع: كلمة فاتتك. ` : `${fa ? `You also picked ${fa} word${fa > 1 ? 's' : ''} that weren't there. ` : ''}Dashed green: a word you missed. `)}</p>
      <div className="hf-row"><button className="hf-btn" onClick=${() => go({ ph: 0, n: 0, pick: {} })}>${ar ? 'جرّب تاني' : 'Try again'}</button></div>`;
    return html`<div className="hf-hci4-box hf-in"><div className="hf-hci4-lab" key=${st.ph}>${body}</div></div>`;
  }

  // the slide's train example: the same neighbor in two contexts
  function Scene() {
    const ar = useAr();
    const hall = html`<svg className="bg" viewBox="0 0 150 112" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="10" y="14" width="30" height="70"/><circle cx="35" cy="50" r="1.8" fill="currentColor"/><rect x="110" y="14" width="30" height="70"/><circle cx="115" cy="50" r="1.8" fill="currentColor"/><path d="M0 92h150"/><path d="M60 8h30M75 8v6"/></svg>`;
    const train = html`<svg className="bg" viewBox="0 0 150 112" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="8" y="12" width="36" height="26" rx="5"/><rect x="57" y="12" width="36" height="26" rx="5"/><rect x="106" y="12" width="36" height="26" rx="5"/><path d="M0 92h150M8 80h28v12M114 80h28v12"/><path d="M20 4h110"/></svg>`;
    return html`<div className="hf-hci4-sc hf-in">
      <div className="hf-hci4-pn"><p>${ar ? 'في طرقة العمارة' : 'In your building\'s hallway'}</p><div className="st">${hall}<${H.K.Who} w="dev" /></div>
        <div className="th"><span style=${{ color: 'var(--ok)' }}>${ar ? '«أهلاً يا جاري!» على طول' : '"Hi, neighbor!" instantly'}</span></div></div>
      <div className="hf-hci4-pn"><p>${ar ? 'في القطر' : 'On a train'}</p><div className="st">${train}<${H.K.Who} w="dev" /></div>
        <div className=${'th' + (calm() ? ' calm' : '')}><span className="a1">${ar ? '«...مين ده؟»' : '"...who is this?"'}</span><span className="a2">${ar ? 'بعد ثواني: «آه، جاري!»' : 'moments later: "Oh, my neighbor!"'}</span></div></div>
    </div>`;
  }

  // labelling digital information: the same files before and after (our example)
  function Labels() {
    const ar = useAr();
    const [v, setV] = H.K.useSlot('lbl', 0);
    const before = [['IMG_0412.jpg', 'Aug'], ['scan(3).pdf', 'Aug'], ['IMG_0413.jpg', 'Aug'], ['DOC_77.pdf', 'Sep'], ['IMG_0414.jpg', 'Aug'], ['IMG_0415.jpg', 'Aug'], ['final_FINAL.pdf', 'Sep']];
    const after = ar ? [
      [1, 'var(--hf-k)', 'رحلة إسكندرية', 'صورتين'], [0, 'var(--hf-k)', 'IMG_0412.jpg', '12/8/2026'], [0, 'var(--hf-k)', 'IMG_0413.jpg', '12/8/2026'],
      [1, 'var(--hf-red)', 'أوراق الجامعة', 'مهم'], [0, 'var(--hf-red)', 'DOC_77.pdf', 'مهم'], [0, 'var(--hf-red)', 'scan(3).pdf', '3/9/2026'], [0, 'var(--hf-red)', 'final_FINAL.pdf', '5/9/2026']
    ] : [
      [1, 'var(--hf-k)', 'Trip to Alexandria', '2 photos'], [0, 'var(--hf-k)', 'IMG_0412.jpg', '12 Aug 2026'], [0, 'var(--hf-k)', 'IMG_0413.jpg', '12 Aug 2026'],
      [1, 'var(--hf-red)', 'University papers', 'flagged'], [0, 'var(--hf-red)', 'DOC_77.pdf', 'flagged'], [0, 'var(--hf-red)', 'scan(3).pdf', '3 Sep 2026'], [0, 'var(--hf-red)', 'final_FINAL.pdf', '5 Sep 2026']
    ];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-hci4-tabs">${[ar ? 'قبل' : 'Before', ar ? 'بعد الـ labelling' : 'After labelling'].map((b, j) => html`<button key=${j} aria-pressed=${String(v === j)} onClick=${() => setV(j)}>${b}</button>`)}</div>
      <div className="hf-hci4-files" key=${v}>${v === 0
        ? before.map((f, j) => html`<div key=${j} className="f hf-in"><span className="d"></span><code dir="ltr">${f[0]}</code><span></span></div>`)
        : after.map((f, j) => html`<div key=${j} className=${'f hf-in' + (f[0] ? ' dir' : '')} style=${f[0] ? null : { paddingInlineStart: '22px' }}><span className="d" style=${{ background: f[1] }}></span>${f[0] ? html`<span>${f[2]}</span>` : html`<code dir="ltr">${f[2]}</code>`}<span className=${'m' + (/flag|مهم/.test(f[3]) ? ' fl' : '')}>${/flag|مهم/.test(f[3]) ? '⚑ ' : ''}${/\d/.test(f[3]) ? html`<bdi dir="ltr">${f[3]}</bdi>` : f[3]}</span></div>`)}</div>
    </div>`;
  }

  // reflective cognition, step by step, on our own example decision
  const WEIGH = [
    ['Think about what to do', 'تفكر هتعمل إيه', 'Our example: your laptop breaks a week before exams.', 'مثال من عندنا: اللابتوب باظ قبل الامتحانات بأسبوع.'],
    ['What are the options?', 'إيه الـ options؟', 'Fix the old one, or buy a new one.', 'تصلّح القديم، ولا تشتري جديد.'],
    ['What are the consequences?', 'إيه العواقب (consequences)؟', 'Each option has costs and results. You think them through, consciously, maybe with pen and paper.', 'كل option ليه تمن ونتيجة. بتفكر فيهم بوعي، يمكن بورقة وقلم.'],
    ['Work through scenarios', 'تمشي في scenarios مختلفة', '"If the repair fails...", "If the new one arrives late..." You discuss it with others, or with yourself.', '«لو التصليح فشل...»، «لو الجديد اتأخر...». وبتتناقش مع الناس، أو مع نفسك.'],
    ['Weigh up alternatives', 'توازن بين البدائل', 'The pans tip. Here (in our example) fixing wins.', 'الكفة بتميل. هنا (في مثالنا) التصليح كسب.'],
    ['Decide on the best option', 'تقرر أنهي الأحسن', 'Problem-solving, planning, reasoning, decision-making: all reflective cognition.', 'الـ problem-solving والـ planning والـ reasoning والـ decision-making: كلهم reflective cognition.']
  ];
  function Weigh() {
    const ar = useAr();
    const [i, setI] = H.K.useSlot('weigh', 0);
    const [play, setPlay] = usePlay(i, setI, WEIGH.length, 2600);
    const w = WEIGH[i], tip = i >= 4;
    return html`<div className="hf-hci4-box hf-in">
      <div className="hf-hci4-wp" key=${i}>
        <p className="hf-hci4-st hf-in">${ar ? w[1] : w[0]}</p>
        <div className="hf-hci4-scale" dir="ltr">
          <div className="hf-hci4-post"></div><div className="hf-hci4-base"></div>
          <div className="hf-hci4-beam" style=${{ transform: tip ? 'rotate(-7deg)' : 'none', transition: calm() ? 'none' : null }}>
            ${i >= 1 && html`<div className=${'hf-hci4-pan l' + (tip ? ' win' : '')}><i></i><b>${ar ? 'تصلّحه' : 'Fix it'}</b></div>`}
            ${i >= 1 && html`<div className="hf-hci4-pan r"><i></i><b>${ar ? 'تشتري جديد' : 'Buy new'}</b></div>`}
          </div>
        </div>
      </div>
      <p className="hf-hci4-cap" key=${'c' + i}>${T(ar ? w[3] : w[2])}</p>
      <${Stepper} i=${i} setI=${setI} n=${WEIGH.length} play=${play} setPlay=${setPlay} />
    </div>`;
  }

  H.chapters.hci[4] = {
    title: 'Cognition (part 2): memory, learning, language and reflective cognition',
    kicker: 'Chapter 4',
    run: 'memory, learning, language',
    ar: { title: 'الـ Cognition (الجزء التاني): الـ memory والـ learning واللغة والـ reflective cognition', kicker: 'الفصل 4', run: 'الـ memory والـ learning واللغة' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => K.T(A ? ar : en);
      // the doctors' own questions on this lecture (this year's midterm), with the site's Arabic explanations in the Arabic book
      const lec = kit.course.lectures.find(l => l.n === 4);
      const arQuiz = (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[4] && window.AR.hci.lectures[4].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${K.MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · where we are, and how the chapter works
        page(html`
          <${H2}>${t('Previously, in Chapter 3…', 'في الفصل اللي فات…')}</${H2}>
          <${P} small=${true}>${X('<b>Cognition, part 1</b>: <b>attention</b> (focusing on what is relevant) and <b>perception</b> (how information is acquired from the world and turned into experiences).',
            'الـ <b>Cognition، الجزء الأول</b>: الـ <b>attention</b> (إنك تركز على المهم) والـ <b>perception</b> (إزاي المعلومة بتيجي من العالم وتتحول لـ experiences).')}</${P}>
          <${P} small=${true}>${X('Now the information is inside your head. What happens next? This chapter: <b>memory</b>, <b>learning</b>, <b>reading, speaking and listening</b>, and <b>reflective cognition</b>.',
            'طب المعلومة دخلت دماغك. وبعدين؟ الفصل ده: الـ <b>memory</b>، والـ <b>learning</b>، و<b>القراية والكلام والسماع</b>، والـ <b>reflective cognition</b>.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises</b> right on the page. There is a real memory experiment in here.', '<b>حل التمارين</b> على الصفحة نفسها. وفيه تجربة memory بجد كمان.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you turn the page.', '<b>شغّل مخك</b>: وقّف فكّر قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps from this year's midterm.", '<b>خلّي بالك!</b> دي فخاخ امتحان، من الـ midterm بتاع السنة دي.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Examples and analogies marked "ours" are not from the slides.', 'الأمثلة والتشبيهات اللي عليها "من عندنا" مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">4</span><span className="t">${A ? html`الفصل الرابع<br/>HCI` : html`Chapter four<br/>HCI`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('The Picky Librarian in Your Head', 'أمين مكتبة على مزاجه جوّه دماغك')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('cognition, part 2', 'الـ cognition، الجزء التاني')}</p></div>
          <${Talk} who="dev">${t("I read the chapter three times, and I still can't recall a thing!", 'قريت الفصل تلات مرات، ومش قادر أفتكر حاجة!')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${t('But shown four choices in the exam, you would recognize the right one, right?', 'بس لو الامتحان ورّاك أربع اختيارات، هتعرف الصح، صح؟')}</${Talk}>
          <${P} small=${true}>${X("That gap between <b>recall</b> and <b>recognition</b> is one of this chapter's big ideas, and designers use it every day.",
            'الفرق ده بين الـ <b>recall</b> والـ <b>recognition</b> من أهم أفكار الفصل ده، والـ designers بيستخدموه كل يوم.')}</${P}>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': memory is a picky librarian. It doesn't shelve everything, and it finds books faster when you point at them.", 'تشبيه من عندنا: الـ memory أمين مكتبة على مزاجه. مش بيرص كل الكتب، وبيلاقي الكتاب أسرع لو شاورتله عليه.')}</${Hand}>
        `, { sec: t('Memory', 'الـ Memory') }),

        // 2 · what memory is
        page(html`
          <${H1}>${t('So what does memory do?', 'الـ memory بتعمل إيه أصلًا؟')}</${H1}>
          <${Def}>${X("<b>Memory</b> involves recalling various kinds of knowledge that allow people to <b>act appropriately</b>, for example recognizing someone's face or remembering someone's name.",
            'الـ <b>Memory</b> معناها إننا نفتكر أنواع مختلفة من المعرفة اللي بتخلي الناس <b>تتصرف صح</b>، زي إنك تتعرف على وش حد أو تفتكر اسمه.')}</${Def}>
          <${UL} items=${A ? [
            'إحنا <b>الأول بنعمل encode</b> للمعرفة، <b>وبعدين retrieve</b>.',
            'إحنا <b>مش بنفتكر كل حاجة</b>: الـ memory فيها <b>filtering</b> وprocessing للي ركزنا معاه (attended to).',
            'الـ <b>context</b> مهم في طريقة ما بنفتكر: فين، وإمتى، وإزاي.',
            'إحنا بنعمل <b>recognize</b> للحاجات أحسن بكتير من إننا نعملها <b>recall</b>.'
          ] : [
            'We first <b>encode</b> and then <b>retrieve</b> knowledge.',
            "We <b>don't remember everything</b>: memory involves <b>filtering</b> and processing what is attended to.",
            '<b>Context</b> is important to how we remember: where, when, how, and so on.',
            'We <b>recognize</b> things much better than we can <b>recall</b> them.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Order matters. "In memory, we first retrieve and then encode knowledge" is <b>False</b>: <b>encode first, retrieve second</b>.',
            'الترتيب مهم. الجملة دي <b>غلط</b>:<span class="ltr">"In memory, we first retrieve and then encode knowledge"</span>الصح: <b>الأول encode، وبعدين retrieve</b>.')}</p></${Box}>
        `),

        // 3 · the funnel
        page(html`
          <${H2}>${t('Follow one memory in, and back out', 'امشي ورا ذكرى واحدة، داخلة وطالعة')}</${H2}>
          <${P} small=${true}>${t('Press play. Watch what gets through the filter.', 'دوس شغّل، واتفرج إيه اللي بيعدّي من الـ filter.')}</${P}>
          <${Funnel} />
          <${Grow} />
          <${Hand} arrow="up">${t('the song and the clock were there too, but you never attended to them', 'الأغنية والساعة كانوا موجودين، بس إنت مركزتش معاهم')}</${Hand}>
        `),

        // 4 · the experiment
        page(html`
          <${Box} kind="pencil" title=${t('Try it on yourself', 'جرّبها على نفسك')}><p className="hf-p small">${t('Before we explain recognition vs recall, measure it. It takes one minute.', 'قبل ما نشرح الـ recognition والـ recall، قيسهم بنفسك. دقيقة واحدة.')}</p></${Box}>
          <${MemLab} />
          <${Grow} />
          <${Hand} red=${true}>${t('Our experiment, not the slides\'. Your numbers are yours.', 'التجربة دي من عندنا، مش من السلايدز.')}</${Hand}>
        `, { sec: t('Recognition vs recall', 'الـ Recognition والـ Recall') }),

        // 5 · recognition vs recall explained
        page(html`
          <${H1}>${t('Recognition beats recall', 'الـ recognition بيكسب الـ recall')}</${H1}>
          <${P}>${X('Did your recognition bar come out longer? For most people it does. The slide puts it simply:', 'طلع شريط الـ recognition أطول؟ عند معظم الناس بيطلع كده. والسلايد بتقولها ببساطة:')}</${P}>
          <${Def}>${X('We <b>recognize</b> things much better than being able to <b>recall</b> things.', 'إحنا بنعمل <b>recognize</b> للحاجات أحسن بكتير من إننا نعملها <b>recall</b>.')}</${Def}>
          <${Talk} who="lens" flip=${true}>${X('In recognition the word was <b>in front of you</b>; you only had to say "yes, that one". In recall you had to <b>bring it back</b> with nothing to look at.',
            'في الـ recognition الكلمة كانت <b>قدامك</b>، وإنت بس بتقول "أيوه، دي". في الـ recall كان لازم <b>ترجّعها</b> من غير ما تبص على حاجة.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The quiz reverses it on purpose: "Recalling things rather than recognizing them" is the <b>wrong</b> choice. Recognition is the <b>easier</b> one.',
            'الكويز بيعكسها عشان يوقعك: «الـ recall أسهل من الـ recognition» دي <b>غلط</b>. الـ recognition هو <b>الأسهل</b>.')}</p></${Box}>
        `),

        // 6 · Henkel 2014
        page(html`
          <${Box} kind="brain"><p className="hf-p">${t('At a concert, one friend films the whole show on her phone. Another just watches. A week later, who remembers more about it?', 'في حفلة، صاحبتك صوّرت الحفلة كلها بالموبايل، وصاحبتك التانية اتفرجت بس. بعد أسبوع، مين فاكرة أكتر؟')}</p></${Box}>
          <${H2}>${t('Henkel (2014): the camera remembers, you don\'t', 'الـ Henkel (2014): الكاميرا بتفتكر، إنت لأ')}</${H2}>
          <${Def}>${X('We remember <b>less</b> about objects that we have <b>photographed</b> than when we observe them with the naked eye (<b>Henkel, 2014</b>).',
            'بنفتكر حاجات <b>أقل</b> عن الأشياء اللي <b>صورناها</b> عن لما بنشوفها بعينينا على طول (<b>Henkel, 2014</b>).')}</${Def}>
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['هو الـ Henkel صاحب الـ <bdi dir="ltr">7 ± 2</bdi>؟', 'لأ. ده <b>George Miller (1956)</b>. والـ <b>Henkel (2014)</b> بتاع الصور. الامتحان بيبدّلهم.'],
            ['يعني متصورش خالص؟', 'السلايد مش بتقول كده. بتقول بس إننا بنفتكر <b>أقل</b> عن اللي صورناه.']
          ] : [
            ['Is Henkel the 7 ± 2 person?', 'No. That is <b>George Miller (1956)</b>. <b>Henkel (2014)</b> is the photographs finding. The quiz swaps them.'],
            ['So I should never take photos?', "The slide doesn't say that. It only says we remember <b>less</b> about what we photographed."]
          ]} />
        `),

        // 7 · context: the train
        page(html`
          <${H1}>${t('Context is important', 'الـ Context مهم')}</${H1}>
          <${P} small=${true}>${X("The slide's own story: someone says hello to you on a train. For a few moments you don't recognize him...", 'حكاية السلايد نفسها: حد بيسلّم عليك في القطر، ولثواني مش عارفه...')}</${P}>
          <${Scene} />
          <${P} small=${true}>${X("...then you realize it is one of your neighbors. You only ever see him in the hallway of your apartment building, so <b>out of context</b> he is difficult to recognize at first.",
            '...وبعدين تكتشف إنه جارك. إنت متعود تشوفه في طرقة العمارة بس، فلما شفته <b>out of context</b> بقى صعب تعرفه في الأول.')}</${P}>
        `, { sec: t('Context', 'الـ Context') }),

        // 8 · context explained
        page(html`
          <${Def}>${X('<b>Context affects the extent to which information can be subsequently retrieved.</b> Sometimes it is difficult to recall information that was <b>encoded in a different context</b>.',
            '<b>الـ Context بيأثر على قد إيه المعلومة ممكن نعملها retrieve بعد كده.</b> وساعات بيبقى صعب نفتكر معلومة اتعملها <b>encode في context مختلف</b>.')}</${Def}>
          <${Talk} who="dev">${t('So the neighbor got stored together with the hallway?', 'يعني الجار اتخزّن مع الطرقة؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Exactly. He was <b>encoded</b> in the hallway. On the train, the hallway is missing, so <b>retrieving</b> him takes a few moments.',
            'بالظبط. اتعمله <b>encode</b> في الطرقة. في القطر الطرقة مش موجودة، فالـ <b>retrieve</b> بياخد ثواني.')}</${Talk}>
          <${Grow} />
          <${Box} kind="exam" title=${t('Fill in the blank', 'كمّل الجملة')}><p className="hf-p small">${X('"Sometimes it can be difficult for people to recall information that was ___." Answer: <b>encoded in a different context</b>.',
            'الجملة:<span class="ltr">"Sometimes it can be difficult for people to recall information that was ___."</span>الإجابة: <b><bdi dir="ltr">encoded in a different context</bdi></b>.')}</p></${Box}>
        `),

        // 9 · the activity figure
        page(html`
          <${H2}>${t('Activity: what is easy to remember?', 'نشاط: إيه اللي سهل نفتكره؟')}</${H2}>
          <${Fig} name="remember-activity" />
        `, { sec: t('Visual cues', 'الـ Visual cues') }),

        // 10 · visual cues vs arbitrary material
        page(html`
          <${H1}>${t('Pictures stick, numbers slip', 'الصور بتلزق، والأرقام بتفلت')}</${H1}>
          <${P}>${X('The grandparents\' birthdays were hard. The book covers were easy. Why?', 'أعياد ميلاد جدودك كانت صعبة، وأغلفة الكتب كانت سهلة. ليه؟')}</${P}>
          <${Def}>${X('People are very good at remembering <b>visual cues</b> about things: the <b>color</b> of items, the <b>location</b> of objects and <b>marks</b> on an object.',
            'الناس شاطرة جدًا في إنها تفتكر الـ <b>visual cues</b>: <b>لون</b> الحاجات، و<b>مكان</b> الأشياء، و<b>العلامات</b> اللي على أي حاجة.')}</${Def}>
          <${Def}>${X('They find it more difficult to learn and remember <b>arbitrary material</b>, for example <b>birthdays</b> and <b>phone numbers</b>.',
            'وبيلاقوا صعوبة أكتر في إنهم يتعلموا ويفتكروا الـ <b>arbitrary material</b>، زي <b>أعياد الميلاد</b> و<b>أرقام التليفونات</b>.')}</${Def}>
          <${Grow} />
          <${Talk} who="cpu" flip=${true}>${t("Funny. Phone numbers are the easiest thing in the world for me.", 'غريبة. أرقام التليفونات دي أسهل حاجة في الدنيا بالنسبالي.')}</${Talk}>
          <${Hand}>${t('our joke: that is exactly why the computer should remember them for you', 'نكتة من عندنا: وعشان كده الكمبيوتر هو اللي المفروض يفتكرها بدالك')}</${Hand}>
        `),

        // 11 · sort: visual cue or arbitrary
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Easy or hard to remember? Tap <b>V</b> for a visual cue or <b>A</b> for arbitrary material. (Items are our examples of the slide\'s categories.)',
            'سهل ولا صعب تفتكره؟ دوس <b>V</b> لو visual cue، أو <b>A</b> لو arbitrary material. (الأمثلة من عندنا على تقسيمة السلايد.)')}</p></${Box}>
          <${Sort} id="va" bins=${[['V', 'Visual cue'], ['A', 'Arbitrary material']]} items=${A ? [
            ['لون شنطة صاحبك', 0],
            ['عيد ميلاد ابن عمك', 1],
            ['مكان باب الخروج في المدرج', 0],
            ['رقم موبايل صاحبك', 1],
            ['خدش على شاشة موبايلك', 0],
            ['أعياد ميلاد جدودك (من السلايد)', 1],
            ['غلاف آخر كتاب قريته (من السلايد)', 0]
          ] : [
            ["The colour of your friend's bag", 0],
            ["Your cousin's birthday", 1],
            ['Where the exit is in your lecture hall', 0],
            ["Your friend's phone number", 1],
            ["A scratch on your phone's screen", 0],
            ["Your grandparents' birthdays (the slide's)", 1],
            ['The cover of the last book you read (the slide\'s)', 0]
          ]} />
        `),

        // 12 · Miller
        page(html`
          <${H1}>${t('The magic number 7 (give or take 2)', 'الرقم السحري 7 (زيادة أو نقص 2)')}</${H1}>
          <${Def}>${X("<b>George Miller's (1956)</b> theory of how much information people can remember: people's <b>immediate memory capacity</b> is very limited, to <b>7, + or - 2</b>.",
            'نظرية <b>George Miller (1956)</b> عن قد إيه معلومات الناس تقدر تفتكرها: الـ <b>immediate memory capacity</b> محدودة جدًا، بـ <b><bdi dir="ltr">7, + or - 2</bdi></b>.')}</${Def}>
          <${Hand} red=${true} big=${true}>${A ? 'يعني من خمسة لحد تسعة' : 'so: anywhere from 5 to 9'}</${Hand}>
          <${P}>${X('It has been applied in interaction design when considering <b>how many options to display</b>.', 'واتطبقت في الـ interaction design لما بنفكر <b>هنعرض كام option</b>.')}</${P}>
          <${Grow} />
          <${Talk} who="dev">${t('Easy! Seven options everywhere, done.', 'سهلة! 7 options في كل حتة، وخلصنا.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Not so fast. The slide is titled "<b>The problem with</b> the classic 7, + or - 2".', 'استنى. السلايد عنوانها «<b>المشكلة في</b> الـ <bdi dir="ltr">7 ± 2</bdi> الكلاسيكية».')}</${Talk}>
        `, { sec: t("Miller's 7 ± 2", 'قاعدة Miller') }),

        // 13 · the figure
        page(html`
          <${Fig} name="seven-plus-minus" />
        `),

        // 14 · the open questions
        page(html`
          <${H2}>${t("The slide's questions (and no answers)", 'أسئلة السلايد (من غير إجابات)')}</${H2}>
          <${P} small=${true}>${X('<b>Is it a good use of a theory in HCI? Is it helpful?</b> When creating an interface, should the designer:', '<b>هل ده استخدام كويس لنظرية في الـ HCI؟ هل هي مفيدة؟</b> لما بنعمل interface، هل المفروض الـ designer:')}</${P}>
          <${UL} items=${A ? ['يعرض 7 options بس في الـ menu؟', 'يعرض 7 icons بس على الـ tool bar؟', 'ميحطش أكتر من 7 bullets في list؟', 'يحط 7 items بس في الـ pull down menu؟', 'يحط 7 tabs بس فوق في صفحة الموقع؟']
            : ['present only 7 options on a menu?', 'display only 7 icons on a tool bar?', 'have no more than 7 bullets in a list?', 'place only 7 items on a pull down menu?', 'place only 7 tabs on the top of a website page?']} />
          <${P} small=${true}>${X('These are <b>questions for discussion</b>; the slide gives no answer.', 'دي <b>أسئلة للنقاش</b>؛ السلايد مش بتدي إجابة.')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X("A thought from us, not the slides: Miller's limit is about <b>immediate memory</b>. When a menu is open on the screen, are you <b>recalling</b> its options, or <b>recognizing</b> them?",
            'فكرة من عندنا، مش من السلايدز: حد Miller عن الـ <b>immediate memory</b>. لما الـ menu تبقى مفتوحة قدامك على الشاشة، إنت بتعمل <b>recall</b> للـ options، ولا <b>recognize</b>؟')}</p></${Box}>
        `),

        // 15 · the midterm's take
        page(html`
          <${Box} kind="watch" title=${t('Watch it: what the midterm expects', 'خلّي بالك: الـ midterm مستني إيه')}><p className="hf-p small">${X("The slide leaves the questions open, but this year's midterm asked which design <b>follows the slide's recommendation</b>. Its key: <b>7 tabs</b>, the only choice inside 7 ± 2 (15, 20 and 12 are all above 9).",
            'السلايد سايبة الأسئلة مفتوحة، بس الـ midterm بتاع السنة دي سأل أنهي design <b>ماشي على توصية السلايد</b>. الإجابة: <b><bdi dir="ltr">7 tabs</bdi></b>، الاختيار الوحيد اللي جوه <bdi dir="ltr">7 ± 2</bdi> (والـ 15 والـ 20 والـ 12 كلهم فوق 9).')}</p></${Box}>
          ${mq('m-seven', /follows the slide.s recommendation/)}
          <${Grow} />
          <${Hand} red=${true}>${t('in the exam: pick the number between 5 and 9', 'في الامتحان: اختار الرقم اللي بين خمسة وتسعة')}</${Hand}>
        `),

        // 16 · design implications for memory
        page(html`
          <${H1}>${t('Designing for a picky librarian', 'إزاي تصمم لأمين مكتبة على مزاجه')}</${H1}>
          <${P} small=${true}>${t("The lecture's three design implications for memory:", 'الـ design implications التلاتة للـ memory في المحاضرة:')}</${P}>
          <${UL} items=${A ? [
            'نقلل الـ <b>cognitive load</b> بإننا نبعد عن الـ <b>procedures الطويلة والمعقدة</b> عشان نخلّص الـ tasks.',
            'نصمم interfaces بتشجع على الـ <b>recognition بدل الـ recall</b>.',
            'ندي الـ users طرق مختلفة لـ <b>labelling الـ digital information</b> عشان يعرفوها تاني بسهولة: الـ <b>folders</b>، والـ <b>categories</b>، و<b>اللون</b>، والـ <b>flagging</b>، والـ <b>time stamping</b>.'
          ] : [
            'Reduce <b>cognitive load</b> by avoiding <b>long and complicated procedures</b> for carrying out tasks.',
            'Design interfaces that promote <b>recognition rather than recall</b>.',
            'Provide users with various ways of <b>labelling digital information</b> to help them easily identify it again: <b>folders</b>, <b>categories</b>, <b>color</b>, <b>flagging</b> and <b>time stamping</b>.'
          ]} />
          <${Grow} />
          <${Talk} who="bug">${X('I live in <b>14-step checkouts</b> and boxes that say "type the exact file name". Please don\'t evict me.', 'أنا ساكن في <b>الـ checkout اللي 14 خطوة</b>، وفي الخانات اللي بتقولك "اكتب اسم الملف بالظبط". متطردونيش.')}</${Talk}>
        `, { sec: t('Design for memory', 'التصميم للـ memory') }),

        // 17 · labelling before and after
        page(html`
          <${H2}>${t('Labelling, before and after', 'الـ labelling، قبل وبعد')}</${H2}>
          <${P} small=${true}>${t('Our example: find the photos from your Alexandria trip. Try it in both views.', 'مثال من عندنا: دوّر على صور رحلة إسكندرية. جرّب في الشكلين.')}</${P}>
          <${Labels} />
          <${Grow} />
          <${Hand} arrow="up">${t('folders, colour, flags, time stamps: labels from the slide', 'دي الـ labels اللي في السلايد')}</${Hand}>
        `),

        // 18–19 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: Recall and Recognition argue about who does the harder job.", 'قعدة الليلة: الـ Recall والـ Recognition بيتخانقوا مين شغلانته أصعب.')} />
          <${Chat} names=${[t('Recall', 'الـ Recall'), t('Recognition', 'الـ Recognition')]} lines=${A ? [
            [0, 'لما تحتاج اسم من العدم، بتنادي عليّا. بجيبه من الـ memory من غير أي مساعدة.'],
            [1, 'وأنا كفاية إني أشوفه. وش وسط الزحمة، وأقول: أنا عارفه!'],
            [0, 'فشّار.'],
            [1, 'السلايدز في صفّي: الناس بتعمل <b>recognize</b> أحسن بكتير من الـ <b>recall</b>.'],
            [0, 'والـ designers لسه بيرموا الشغل التقيل عليّا: "اكتب الأمر بالظبط"، "افتكر الـ password". (أمثلة من عندنا)']
          ] : [
            [0, "When you need a name out of nowhere, you call me. I bring it back from memory with no help at all."],
            [1, "I just need to see it. A face in the crowd, and I go: I know her!"],
            [0, 'Show-off.'],
            [1, 'The slides are on my side: people <b>recognize</b> things much better than they <b>recall</b> them.'],
            [0, 'Designers still dump the heavy lifting on me: "type the exact command", "remember your password". (Examples ours.)']
          ]} />
        `),
        page(html`
          <${Chat} names=${[t('Recall', 'الـ Recall'), t('Recognition', 'الـ Recognition')]} lines=${A ? [
            [1, 'وعشان كده السلايد بتقول للـ designers: <b>شجّعوا الـ recognition بدل الـ recall</b>.'],
            [0, 'على الأقل الـ <b>context</b> بيساعدني: فين، وإمتى، وإزاي.'],
            [1, 'وبيوقّعني أنا كمان. فاكر الجار اللي في القطر؟ <b>out of context</b> أخدت ثواني عشان أعرفه.'],
            [0, 'وأعياد الميلاد وأرقام التليفونات... الـ <b>arbitrary material</b> صعب نتعلمه ونفتكره.'],
            [1, 'إدّيني <b>visual cues</b>: لون، ومكان، وعلامات. دي بتلزق.'],
            [0, 'هنتفق على إننا مختلفين.']
          ] : [
            [1, "That's why the slide tells designers to <b>promote recognition rather than recall</b>."],
            [0, 'At least <b>context</b> helps me out: where, when, how.'],
            [1, 'It trips me up too. Remember the neighbor on the train? <b>Out of context</b>, he took me a few moments.'],
            [0, 'And birthdays, phone numbers... <b>arbitrary material</b> is harder to learn and remember.'],
            [1, 'Give me <b>visual cues</b>: colour, location, marks. Those stick.'],
            [0, "We'll have to agree to disagree."]
          ]} />
          <${Grow} />
          <${Hand}>${t('jokes ours; bold facts from the slides', 'الهزار من عندنا، والـ bold من السلايدز')}</${Hand}>
        `),

        // 20 · learning
        page(html`
          <${H1}>${t('Learning: memory that piles up', 'الـ Learning: memory بتتراكم')}</${H1}>
          <${Def}>${X('<b>Learning</b> involves the <b>accumulation</b> of skills and knowledge involving memory.', 'الـ <b>Learning</b> معناه <b>تجميع</b> skills ومعرفة، وده بيعتمد على الـ memory.')}</${Def}>
          <${P} small=${true}>${t('Two main types:', 'فيه نوعين أساسيين:')}</${P}>
          <div className="hf-hci4-tb hf-in">
            <span className="h">${t('Incidental learning', 'الـ Incidental learning')}</span><span className="h">${t('Intentional learning', 'الـ Intentional learning')}</span>
            <span>${t("Recognizing people's faces", 'إنك تتعرف على وشوش الناس')}</span><span>${t('Studying for an exam', 'المذاكرة لامتحان')}</span>
            <span>${t('What you did today', 'إيه اللي عملته النهارده')}</span><span>${t('Learning to cook', 'إنك تتعلم تطبخ')}</span>
          </div>
          <${Hand} red=${true} big=${true}>${t('Intentional learning is much harder!', 'الـ Intentional learning أصعب بكتير!')}</${Hand}>
          <${Grow} />
          <${Talk} who="dev">${t("Tell me about it. I remember every face in the café, and none of my notes.", 'قولّي عليها. فاكر كل وش في الكافيه، ومش فاكر ولا سطر من النوتس.')}</${Talk}>
        `, { sec: t('Learning', 'الـ Learning') }),

        // 21 · learning continued
        page(html`
          <${H2}>${t('How do people actually learn?', 'الناس بتتعلم إزاي بجد؟')}</${H2}>
          <${UL} items=${A ? [
            'فيه <b>technologies</b> كتير اتعملت عشان تساعد: الـ <b>multimedia</b>، والـ <b>animations</b>، والـ <b>VR</b>.',
            'الناس بتلاقي <b>صعوبة</b> إنها تتعلم من إنها تمشي ورا <b>instructions في manual</b>.',
            'الناس بتفضّل <b>تتعلم بالممارسة (learn by doing)</b>.'
          ] : [
            'Many <b>technologies</b> have been developed to help: <b>multimedia</b>, <b>animations</b>, <b>VR</b>.',
            'People find it <b>hard</b> to learn by following <b>instructions in a manual</b>.',
            'People prefer to <b>learn by doing</b>.'
          ]} />
          <${Talk} who="lens" flip=${true}>${t('Which is why this book makes you do the exercises.', 'وعشان كده الكتاب ده بيخليك تحل التمارين بإيدك.')}</${Talk}>
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['هو الـ incidental أسهل ليه؟', 'السلايدز بتقول بس إن الـ intentional <b>أصعب بكتير</b>، ومش بتشرح السبب. احفظ المقارنة والأمثلة.'],
            ['الـ learning والـ memory نفس الحاجة؟', 'لأ، بس مرتبطين: الـ learning هو <b>تجميع</b> skills ومعرفة، و<b>بيعتمد على الـ memory</b>.']
          ] : [
            ['Why is incidental learning easier?', 'The slides only say intentional learning is <b>much harder</b>; they give no reason. Learn the comparison and the examples.'],
            ['Are learning and memory the same thing?', 'No, but they are linked: learning is the <b>accumulation</b> of skills and knowledge, and it <b>involves memory</b>.']
          ]} />
        `),

        // 22 · sort incidental vs intentional
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X("Which type of learning? Tap <b>Inc</b> for incidental or <b>Int</b> for intentional. The first four are the slide's own examples; the rest are ours.",
            'أنهي نوع learning؟ دوس <b>Inc</b> للـ incidental أو <b>Int</b> للـ intentional. أول أربعة أمثلة السلايد نفسها، والباقي من عندنا.')}</p></${Box}>
          <${Sort} id="ii" bins=${[['Inc', 'Incidental learning'], ['Int', 'Intentional learning']]} items=${A ? [
            ['إنك تتعرف على وشوش الناس', 0],
            ['المذاكرة لامتحان', 1],
            ['إيه اللي عملته النهارده', 0],
            ['إنك تتعلم تطبخ', 1],
            ['إنك تحفظ كلمات إنجليزي لكويز بكرة', 1],
            ['إنك تفتكر الأغنية اللي كانت شغالة في الكافيه', 0],
            ['إنك تتدرب على السواقة كل يوم', 1]
          ] : [
            ["Recognizing people's faces", 0],
            ['Studying for an exam', 1],
            ['What you did today', 0],
            ['Learning to cook', 1],
            ["Memorizing vocabulary for tomorrow's quiz", 1],
            ['Remembering the song that played in the café', 0],
            ['Practising driving every day', 1]
          ]} />
        `),

        // 23 · design implications for learning
        page(html`
          <${H1}>${t('Designing for learners', 'إزاي تصمم للي بيتعلم')}</${H1}>
          <${P} small=${true}>${t("People learn by doing, so the lecture's three design implications for learning are:", 'الناس بتتعلم بالممارسة، فالـ design implications التلاتة للـ learning هم:')}</${P}>
          <${UL} items=${A ? [
            'نصمم interfaces <b>بتشجّع على الـ exploration</b>.',
            'نصمم interfaces <b>بتقيّد وتوجّه (constrain and guide)</b> اللي بيتعلموا.',
            'الـ <b>dynamically linking</b> بين الـ <b>concepts والـ representations</b> ممكن يسهّل تعلم الحاجات المعقدة.'
          ] : [
            'Design interfaces that <b>encourage exploration</b>.',
            'Design interfaces that <b>constrain and guide</b> learners.',
            '<b>Dynamically linking</b> concepts and representations can facilitate the learning of complex material.'
          ]} />
          <${Hand} tilt=${true}>${t("Our example, not the slides': a physics simulation where dragging a slider redraws the graph at once links the concept to its picture.", 'مثال من عندنا: simulation فيزيا، كل ما تحرّك الـ slider الرسمة تتغير على طول، كده بتربط الـ concept بالـ representation بتاعه.')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Quiz trap: "Which is NOT a design implication for learning?" Watch for options from the <b>memory</b> list (recognition, labelling) or ones that <b>reverse</b> these.',
            'فخ الكويز: «أنهي <b>مش</b> design implication للـ learning؟» خلّي بالك من اختيارات جاية من ليستة الـ <b>memory</b> (الـ recognition والـ labelling)، أو اختيارات <b>بتعكس</b> دول.')}</p></${Box}>
        `),

        // 24 · reading, speaking, listening
        page(html`
          <${H1}>${t('Read it, say it, or hear it?', 'تقراها، تقولها، ولا تسمعها؟')}</${H1}>
          <${P} small=${true}>${X('The ease with which people can read, listen or speak <b>differs</b>:', 'السهولة اللي الناس بتقرا أو تسمع أو تتكلم بيها <b>بتختلف</b>:')}</${P}>
          <div className="hf-hci4-tb hf-in">
            <span className="h">${t('The question', 'السؤال')}</span><span className="h">${t('The slide says', 'السلايد بتقول')}</span>
            <span className="k">${t('Which do many prefer?', 'الناس بتفضّل إيه؟')}</span><span>${X('<b>Listening</b> to reading', 'الـ <b>listening</b> عن القراية')}</span>
            <span className="k">${t('Which can be quicker?', 'إيه اللي ممكن يبقى أسرع؟')}</span><span>${X('<b>Reading</b>, quicker than speaking or listening', 'الـ <b>reading</b>، أسرع من الكلام أو السماع')}</span>
            <span className="k">${t('Which needs less cognitive effort?', 'إيه اللي محتاج cognitive effort أقل؟')}</span><span>${X('<b>Listening</b>, less than reading or speaking', 'الـ <b>listening</b>، أقل من القراية أو الكلام')}</span>
          </div>
          <${Grow} />
          <${Talk} who="dev">${t('So listening wins twice, and reading wins on speed.', 'يعني الـ listening كسب مرتين، والـ reading كسب في السرعة.')}</${Talk}>
          <${Box} kind="watch"><p className="hf-p small">${X('"Reading requires less cognitive effort than listening" is the <b>wrong</b> way round. <b>Listening</b> needs less effort.',
            'الجملة دي معكوسة و<b>غلط</b>:<span class="ltr">"Reading requires less cognitive effort than listening"</span>الـ <b>listening</b> هو اللي محتاج effort أقل.')}</p></${Box}>
        `, { sec: t('Reading, speaking, listening', 'القراية والكلام والسماع') }),

        // 25 · applications
        page(html`
          <${H2}>${t('Three kinds of talking technology', 'تلات أنواع من التكنولوجيا اللي بتتكلم')}</${H2}>
          <${Def}>${X('<b>Voice user interfaces</b> let users interact with them by <b>asking questions</b>, for example Google Voice, Siri and Alexa.',
            'الـ <b>Voice user interfaces</b> بتخلي الـ users يتفاعلوا معاها <b>بإنهم يسألوا أسئلة</b>، زي Google Voice وSiri وAlexa.')}</${Def}>
          <${Def}>${X('<b>Speech-output systems</b> use <b>artificially-generated speech</b>, for instance written text-to-speech systems for the visually impaired.',
            'الـ <b>Speech-output systems</b> بتستخدم <b>speech متولد صناعيًا</b>، زي الـ text-to-speech systems للناس ضعاف البصر (visually impaired).')}</${Def}>
          <${Def}>${X('<b>Natural-language systems</b> let users <b>type in questions</b> and give <b>text-based responses</b>, such as chatbots.',
            'الـ <b>Natural-language systems</b> بتخلي الـ users <b>يكتبوا أسئلة</b> وبترد <b>بردود نصية (text-based)</b>، زي الـ chatbots.')}</${Def}>
          <${Grow} />
          <${Hand} red=${true}>${t('ask aloud = voice UI · it talks = speech output · type and read = natural language', 'تسأل بصوتك يبقى voice UI، وهو اللي بيتكلم يبقى speech output، وتكتب وتقرا يبقى natural language')}</${Hand}>
        `),

        // 26 · sort applications
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Which kind is it? <b>V</b> voice user interface, <b>S</b> speech-output system, <b>N</b> natural-language system.', 'ده نوع إيه؟ <b>V</b> للـ voice user interface، و<b>S</b> للـ <bdi dir="ltr">speech-output system</bdi>، و<b>N</b> للـ natural-language system.')}</p></${Box}>
          <${Sort} id="vsn" bins=${[['V', 'Voice user interface'], ['S', 'Speech-output system'], ['N', 'Natural-language system']]} items=${A ? [
            ['الـ Siri', 0],
            ['الـ chatbot', 2],
            ['الـ text-to-speech للناس ضعاف البصر', 1],
            ['الـ Alexa', 0],
            ['بتكتب سؤال وبيرد عليك برد نصي', 2],
            ['بيتكلم بـ speech متولد صناعيًا', 1],
            ['بتسأله سؤال بصوتك', 0]
          ] : [
            ['Siri', 0],
            ['A chatbot', 2],
            ['Text-to-speech for the visually impaired', 1],
            ['Alexa', 0],
            ['You type a question; it replies in text', 2],
            ['It talks in artificially-generated speech', 1],
            ['You interact by asking it questions aloud', 0]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('trap: chatbots are natural-language systems, not voice UIs. You type to them.', 'فخ: الـ chatbots دي natural-language systems، مش voice UI. إنت بتكتب لها.')}</${Hand}>
        `),

        // 27 · design implications for language
        page(html`
          <${H1}>${t('Designing for ears and eyes', 'إزاي تصمم للودان وللعين')}</${H1}>
          <${UL} items=${A ? [
            'الـ menus والـ instructions اللي بالصوت <bdi dir="ltr">(speech-based)</bdi> لازم تبقى <b>قصيرة</b>.',
            '<b>نبرز الـ intonation</b> بتاع الأصوات المتولدة صناعيًا: لأنها <b>أصعب في الفهم من الأصوات البشرية</b>.',
            'ندي فرص إن الـ user <b>يكبّر النص</b> على الشاشة.'
          ] : [
            'Speech-based menus and instructions should be <b>short</b>.',
            '<b>Accentuate the intonation</b> of artificially generated speech voices: they are <b>harder to understand than human voices</b>.',
            'Provide opportunities for <b>making text large</b> on a screen.'
          ]} />
          <${Talk} who="bug">${t('"For billing, press 1. For complaints, press 2. For... press 9." By option 9 nobody remembers option 1.', '«للفواتير اضغط 1، للشكاوى اضغط 2، ولـ... اضغط 9». لحد رقم 9 محدش فاكر رقم 1.')}</${Talk}>
          <${Hand}>${t('our example: a speech menu has no screen to recognize from, so it must be short', 'مثال من عندنا: الـ menu الصوتية مفيهاش شاشة تتعرف منها، فلازم تبقى قصيرة')}</${Hand}>
          <${Grow} />
          <${Box} kind="exam" title=${t('Know the reason', 'اعرف السبب')}><p className="hf-p small">${X('<i>Why accentuate the intonation of artificial voices?</i> Because they are <b>harder to understand than human voices</b>.', '<i>ليه نبرز الـ intonation في الأصوات الصناعية؟</i> لأنها <b>أصعب في الفهم من الأصوات البشرية</b>.')}</p></${Box}>
        `),

        // 28 · match: problem to fix
        page(html`
          <${H2}>${t('Be the HCI consultant', 'خليك إنت الـ HCI consultant')}</${H2}>
          <${P} small=${true}>${t('Tap a problem (our examples), then the design implication that fixes it.', 'دوس على المشكلة (أمثلة من عندنا)، وبعدين على الـ design implication اللي بتحلها.')}</${P}>
          <div className="hf-hci4-mt"><${Match} id="fix" left=${A ? ['الـ checkout فيه 14 خطوة', 'لازم تكتب اسم الأمر بالظبط من دماغك', 'ألف صورة، لا folders ولا تواريخ', 'تطبيق جديد: manual في 40 صفحة ومفيش تجربة', 'الـ menu الصوتية بتقرا 12 اختيار', 'صوت صناعي ناشف على وتيرة واحدة']
            : ['A 14-step checkout', 'Type commands from memory', '1,000 untagged photos', 'A 40-page manual, no trying', 'A voice menu with 12 options', 'A flat, robotic voice']}
            right=${A ? ['نشجّع على الـ exploration', 'نخلّي الـ menus الصوتية قصيرة', 'نشجّع الـ recognition بدل الـ recall', 'نبرز الـ intonation', 'نبعد عن الـ procedures الطويلة والمعقدة', 'نوفّر labels: folders ولون وflags']
              : ['Encourage exploration', 'Keep speech-based menus short', 'Promote recognition over recall', 'Accentuate the intonation', 'Avoid long, complicated procedures', 'Offer labels: folders, colour, flags']}
            answer=${[4, 2, 5, 0, 1, 3]} /></div>
        `, { sec: t('Exercises', 'التمارين') }),

        // 29 · reflective cognition
        page(html`
          <${H1}>${t('Thinking about thinking', 'لما بتفكر في اللي هتعمله')}</${H1}>
          <${P} small=${true}>${X('<b>Problem-solving</b>, <b>planning</b>, <b>reasoning</b> and <b>decision-making</b> all involve one thing:', 'الـ <b>problem-solving</b> والـ <b>planning</b> والـ <b>reasoning</b> والـ <b>decision-making</b> كلهم فيهم حاجة واحدة:')}</${P}>
          <${Def}>${X('<b>Reflective cognition</b>: thinking about <b>what to do</b>, what the <b>options</b> are, and the <b>consequences</b>.', 'الـ <b>Reflective cognition</b>: إنك تفكر <b>هتعمل إيه</b>، وإيه الـ <b>options</b>، وإيه <b>العواقب (consequences)</b>.')}</${Def}>
          <${UL} items=${A ? [
            'غالبًا فيها <b>عمليات واعية (conscious processes)</b>.',
            'و<b>نقاش</b> مع الناس (أو مع نفسك).',
            'واستخدام <b>artifacts</b>، زي الخرايط، والكتب، والورقة والقلم.',
            'ممكن تمشي في <b>scenarios مختلفة</b> وتقرر أنهي الـ option الأحسن.',
            'و<b>توازن بين البدائل (weighing up alternatives)</b>.'
          ] : [
            'Often involves <b>conscious processes</b>,',
            '<b>discussion</b> with others (or oneself),',
            'and the use of <b>artifacts</b>, such as maps, books, pen and paper.',
            'May involve working through <b>different scenarios</b> and deciding which is the best option.',
            '<b>Weighing up alternatives.</b>'
          ]} />
          <${Grow} />
          <div className="hf-hci4-art hf-in">${(A ? ['الخرايط', 'الكتب', 'الورقة والقلم'] : ['maps', 'books', 'pen and paper']).map((a, j) => html`<span key=${j}>${a}</span>`)}<span style=${{ border: 0 }}>${t('these are artifacts', 'دول الـ artifacts')}</span></div>
        `, { sec: t('Reflective cognition', 'الـ Reflective cognition') }),

        // 30 · the scale
        page(html`
          <${H2}>${t('Watch a decision get made', 'اتفرج على قرار وهو بيتاخد')}</${H2}>
          <${P} small=${true}>${t('Step through reflective cognition with our own example.', 'امشي في الـ reflective cognition خطوة خطوة بمثال من عندنا.')}</${P}>
          <${Weigh} />
          <${Grow} />
          <${Hand} arrow="up">${t('the steps are the slide\'s; the laptop is ours', 'الخطوات من السلايد؛ اللابتوب من عندنا')}</${Hand}>
        `),

        // 31 · interview
        page(html`
          <${Interview} title=${t('Reflective Cognition, exposed', 'الـ Reflective Cognition على المكشوف')} sub=${t("This week's interview: the slow, careful thinker behind every big decision.", 'حوار الأسبوع: المفكّر الهادي اللي ورا كل قرار كبير.')} lines=${A ? [
            ['المذيع', 'إنت مين بالظبط؟'],
            ['الـ Reflective Cognition', 'أنا اللي ورا الـ <b>problem-solving</b> والـ <b>planning</b> والـ <b>reasoning</b> والـ <b>decision-making</b>.'],
            ['المذيع', 'وبتشتغل إزاي؟'],
            ['الـ Reflective Cognition', 'بفكر <b>هعمل إيه</b>، وإيه الـ <b>options</b>، وإيه <b>العواقب</b>. وغالبًا بشكل <b>واعي</b>.'],
            ['المذيع', 'لوحدك؟'],
            ['الـ Reflective Cognition', 'ساعات <b>بتناقش مع الناس</b>، وساعات مع نفسي. وبستخدم <b>artifacts</b>: خرايط، وكتب، وورقة وقلم.'],
            ['المذيع', 'وفي الآخر؟'],
            ['الـ Reflective Cognition', 'بمشي في <b>scenarios</b>، و<b>بوازن البدائل</b>، وأختار الـ option الأحسن.']
          ] : [
            ['Head First', 'Who are you, exactly?'],
            ['Reflective Cognition', "I'm behind <b>problem-solving</b>, <b>planning</b>, <b>reasoning</b> and <b>decision-making</b>."],
            ['Head First', 'How do you work?'],
            ['Reflective Cognition', 'I think about <b>what to do</b>, what the <b>options</b> are, and the <b>consequences</b>. Usually <b>consciously</b>.'],
            ['Head First', 'Alone?'],
            ['Reflective Cognition', 'Often I <b>discuss</b> things with others, or with myself. And I use <b>artifacts</b>: maps, books, pen and paper.'],
            ['Head First', 'And in the end?'],
            ['Reflective Cognition', 'I work through <b>scenarios</b>, <b>weigh up the alternatives</b>, and pick the best option.']
          ]} />
        `),

        // 32 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from this year's midterm. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من الـ midterm بتاع السنة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m-dec', /^Decision-making means/)}
          <${Grow} />
          <${Hand} red=${true}>${t('decision-making = choosing between options, after weighing them up', 'الـ decision-making يعني تختار بين options، بعد ما توازنهم')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-rea', /^Reasoning involves/)}
          <${Grow} />
          <${Dumb} qa=${A ? [['النوتس بتعرّف الـ reasoning؟', 'لأ، مش لوحده. هو في مجموعة الـ reflective cognition، و«التفكير المنطقي» هو معناه المعروف.']]
            : [['Do the notes define reasoning?', 'Not on its own. It sits in the reflective-cognition group; "thinking logically" is its standard meaning.']]} />
        `),
        page(html`
          ${mq('m-high', /higher-level thinking skills/)}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The distractors come from <b>Lecture 3</b>: hearing, smelling and tasting are the <b>senses</b>, which belong to <b>perception</b> (taking information in). Reflective cognition <b>works with</b> that information.',
            'الاختيارات الغلط جاية من <b>المحاضرة 3</b>: السمع والشم والتذوق دي <b>الحواس</b>، وتبع الـ <b>perception</b> (إنك تاخد المعلومة). أما الـ reflective cognition فهو اللي <b>بيشتغل</b> على المعلومة دي.')}</p></${Box}>
          <${Talk} who="lens" flip=${true}>${t('Higher-level thinking? Look for problem-solving, planning, reasoning, decision-making.', 'تفكير عالي المستوى؟ دوّر على الـ problem-solving والـ planning والـ reasoning والـ decision-making.')}</${Talk}>
        `),

        // 34 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>memory</b>: الأول <b>encode</b> وبعدين <b>retrieve</b>؛ فيها <b>filtering</b> للي ركزنا معاه؛ والـ <b>context</b> مهم.',
            'إحنا بنعمل <b>recognize</b> أحسن بكتير من الـ <b>recall</b>. وبنفتكر أقل عن اللي صورناه <bdi dir="ltr">(Henkel, 2014)</bdi>.',
            'الـ <b>visual cues</b> (لون، مكان، علامات) سهلة؛ والـ <b>arbitrary material</b> (أعياد ميلاد، أرقام) صعبة.',
            'قاعدة <b>Miller (1956)</b>: <bdi dir="ltr">7 ± 2</bdi>؛ السلايد بتسأل عنها من غير إجابة، والـ midterm اختار <bdi dir="ltr">7 tabs</bdi>.',
            'الـ memory: قلّل الـ cognitive load، شجّع الـ recognition، ووفّر labelling.',
            'الـ <b>learning</b>: incidental وintentional (أصعب بكتير)؛ الناس بتتعلم <b>بالممارسة</b>. صمم للـ exploration، والـ constrain and guide، والـ dynamic linking.',
            'الـ <b>listening</b> مفضّل وأقل effort، والـ <b>reading</b> ممكن يبقى أسرع. menus صوتية قصيرة، وintonation واضح، ونص يكبر.',
            'الـ <b>reflective cognition</b>: الـ problem-solving والـ planning والـ reasoning والـ decision-making.'
          ] : [
            '<b>Memory</b>: <b>encode</b> first, then <b>retrieve</b>; it <b>filters</b> what is attended to; <b>context</b> matters.',
            'We <b>recognize</b> far better than we <b>recall</b>; we remember less of what we photographed (Henkel, 2014).',
            '<b>Visual cues</b> (colour, location, marks) stick; <b>arbitrary material</b> (birthdays, phone numbers) is hard.',
            "<b>Miller (1956)</b>: 7 ± 2. The slide leaves its use open; the midterm's key picks 7 tabs.",
            'Design: less cognitive load, recognition over recall, labelling.',
            '<b>Learning</b>: incidental vs intentional (much harder); people <b>learn by doing</b>. Encourage exploration, constrain and guide, link dynamically.',
            'Many prefer <b>listening</b> (less effort); <b>reading</b> can be quicker. Short speech menus, accentuated intonation, large text.',
            '<b>Reflective cognition</b>: problem-solving, planning, reasoning, deciding.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 35 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 4!', 'خلّصت الفصل الرابع!')}</${H1}>
            <${Talk} who="lens">${t('Now test your recall, not just your recognition.', 'دلوقتي اختبر الـ recall بتاعك، مش الـ recognition بس.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [4], t: Date.now() } }}>${t('Quiz me on Lecture 4', 'امتحنّي في محاضرة 4')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 4, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 4, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

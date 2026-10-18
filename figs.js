// Visuals for the notes: animated versions of a lecture's own diagrams and small hands-on versions of its examples.
// A note section names one with fig: '<name>'. Every label and caption comes from that section's slide; nothing is added.
// build.mjs copies this file to data/figs.js; app.js loads it only when a lecture with a visual is opened.
(function () {
  const { useState, useEffect, useRef } = React;
  const html = htm.bind(React.createElement);
  const calm = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  const CSS = `
.fig{ margin:14px 0 20px; border:1px solid var(--line); border-radius:var(--radius-sm); background:var(--paper); overflow:hidden; }
.fig-stage{ padding:16px 12px 10px; background:var(--paper-2); }
.fig-stage svg{ width:100%; height:auto; display:block; margin:0 auto; max-width:560px; font-family:var(--body); }
.fig svg text{ fill:var(--ink); }
.fig-cap{ padding:10px 14px 12px; font-size:.95rem; line-height:1.5; color:var(--ink); min-height:3.2em; }
.fig-cap .ar{ display:block; direction:rtl; text-align:right; color:var(--graphite); margin-top:4px; font-family:"IBM Plex Sans Arabic", var(--body); }
.fig-bar{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; padding:0 14px 12px; }
.fig-bar .grow{ flex:1; }
.fig-dots{ display:flex; gap:6px; } .fig-dots i{ width:8px; height:8px; border-radius:50%; background:var(--line); } .fig-dots i.on{ background:var(--k-hci); }
.fig-btn{ font:inherit; font-size:.88rem; padding:6px 12px; border-radius:99px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; min-height:32px; }
.fig-btn:hover{ border-color:var(--k-hci); } .fig-btn.solid{ background:var(--s-hci); color:#fff; border-color:transparent; }
.fig .pop{ transition:opacity .5s ease, transform .5s ease; } .fig .pop.off{ opacity:0; transform:translateY(6px); }
.fig .fade{ transition:opacity .9s ease; }
.fig .flow{ stroke-dasharray:6 7; animation:figflow 1.1s linear infinite; }
@keyframes figflow{ to{ stroke-dashoffset:-26; } }
.fig .roll{ animation:figroll 2.6s ease-in infinite; }
@keyframes figroll{ 0%{ transform:translate(0,0); opacity:0; } 10%{ opacity:1; } 85%{ transform:translate(190px,64px); opacity:1; } 100%{ transform:translate(196px,66px); opacity:0; } }
.fig .tap{ animation:figtap 1.4s ease-in-out infinite; transform-box:fill-box; transform-origin:center; }
@keyframes figtap{ 0%,100%{ transform:translateY(-10px); } 45%,60%{ transform:translateY(0); } }
.fig-elev{ display:grid; gap:10px; padding:12px; border-radius:8px; background:#1b1d22; max-width:520px; margin:0 auto; }
.fig-elev .row{ display:grid; grid-template-columns:repeat(8, 1fr); gap:6px; align-items:center; }
.fig-elev .top{ grid-template-columns:repeat(6, 1fr); }
.fig-elev button{ aspect-ratio:1; border-radius:5px; border:0; cursor:pointer; font:600 .62rem/1.1 var(--body); color:#fff; padding:2px; min-width:0; }
.fig-elev .btn{ background:linear-gradient(145deg,#e9eef3,#aeb7c0); box-shadow:inset 0 0 0 3px #7d8790; }
.fig-elev .lbl{ background:#1f5fbf; } .fig-elev .dark{ background:#2a2d33; }
.fig-elev .num{ background:transparent; color:#fff; font-size:1.2rem; cursor:default; }
.fig-elev button.hit{ outline:3px solid #f87171; outline-offset:2px; } .fig-elev button.good{ outline:3px solid #4ade80; outline-offset:2px; }
.fig-steps{ display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; max-width:560px; margin:0 auto; }
.fig-step{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:10px; text-align:center; font-size:.92rem; line-height:1.35; opacity:.55; transition:opacity .4s, background .4s; }
.fig-step b{ display:block; color:var(--pen); font-size:.85rem; margin-bottom:2px; } .fig-step.on{ opacity:1; background:color-mix(in srgb, var(--k-hci) 18%, var(--paper)); }
.fig-reader{ text-align:center; margin:10px 0 0; font-size:.9rem; color:var(--graphite); } .fig-reader i{ display:inline-block; width:10px; height:10px; border-radius:50%; background:var(--faint); margin-right:6px; vertical-align:middle; } .fig-reader i.on{ background:var(--ok); }
@media (max-width:420px){ .fig-steps{ grid-template-columns:1fr; } }
.fig-umb{ display:grid; grid-template-columns:1fr auto auto auto 1fr; gap:8px; align-items:center; }
.fig-umb .grp{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.86rem; line-height:1.45; }
.fig-umb .grp b{ display:block; font-size:.78rem; text-transform:uppercase; letter-spacing:.06em; color:var(--k-hci); margin-bottom:4px; }
.fig-umb .id{ width:118px; height:118px; border-radius:50%; display:grid; place-items:center; text-align:center; background:var(--s-hci); color:#fff; font-weight:600; font-size:.95rem; line-height:1.2; padding:8px; }
.fig-umb .arr{ font-size:1.5rem; color:var(--k-hci); text-align:center; } .fig-umb .arr .v{ display:none; }
.fig-umb .bottom{ grid-column:1 / -1; }
@media (max-width:620px){ .fig-umb{ grid-template-columns:1fr; } .fig-umb .id{ margin:0 auto; } .fig-umb .arr .h{ display:none; } .fig-umb .arr .v{ display:inline; } }
.fig-row{ display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; } @media (max-width:620px){ .fig-row{ grid-template-columns:1fr; } }
.fig-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:10px; font-size:.9rem; line-height:1.4; transition:opacity .4s, box-shadow .4s; }
.fig-card b{ display:block; margin-bottom:6px; } .fig-card.dim{ opacity:.4; } .fig-card.on{ box-shadow:0 0 0 2px var(--k-hci); }
.fig-kb{ display:grid; gap:3px; font:600 .7rem/1 var(--mono); } .fig-kb span{ display:grid; place-items:center; height:20px; border-radius:3px; background:var(--paper-2); border:1px solid var(--line); }
.fig-kb span.cur{ background:var(--s-hci); color:#fff; border-color:transparent; }
.fig-mock{ border:1px solid var(--line); border-radius:8px; padding:8px; display:grid; gap:6px; font-size:.78rem; background:var(--paper); }
.fig-mock div{ border:1px solid var(--faint); border-radius:3px; padding:5px; text-align:center; }
.fig-mock .r{ display:grid; grid-template-columns:2fr 1.3fr .7fr; gap:6px; } .fig-mock .books{ display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; } .fig-mock .books div{ height:52px; display:grid; place-items:center; }
.fig-mock.color .hd{ background:#facc15; color:#111; } .fig-mock.color .sb{ background:#60a5fa; color:#111; } .fig-mock.color .dd{ background:#4ade80; color:#111; } .fig-mock.color .go{ background:#fb923c; color:#111; }
.fig-mock.color .books{ grid-template-columns:repeat(3, 1fr) 1.2fr; } .fig-mock .rox{ border:0; font-size:1.6rem; line-height:1; display:grid; place-items:center; } .fig-mock .rox small{ font-size:.66rem; background:#60a5fa; color:#111; border-radius:99px; padding:2px 6px; }
.fig-icdl{ display:grid; gap:10px; } .fig-icdl .grp{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; } .fig-icdl .grp > b{ width:100%; font-size:.8rem; color:var(--graphite); }
.fig-icdl button{ font:inherit; font-size:.82rem; border:1px solid var(--line); background:var(--paper); color:var(--ink); border-radius:10px; padding:6px 10px; cursor:pointer; display:inline-flex; gap:6px; align-items:center; min-height:34px; }
.fig-icdl button i{ width:18px; height:18px; border-radius:50%; display:inline-block; } .fig-icdl button.sel{ box-shadow:0 0 0 2px var(--k-hci); }
.fig-form{ max-width:520px; margin:0 auto; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:10px 12px; font-size:.86rem; }
.fig-form .who{ display:grid; grid-template-columns:repeat(2, 1fr); gap:4px 12px; margin:8px 0; } .fig-form .who span{ opacity:.35; transition:opacity .3s; } .fig-form .who span.done{ opacity:1; } .fig-form .who span.done::before{ content:"✓ "; color:var(--ok); }
.fig-form .bar{ height:8px; border-radius:99px; background:var(--paper-2); overflow:hidden; } .fig-form .bar i{ display:block; height:100%; background:var(--k-hci); transition:width .4s; }
.fig-form .err{ margin-top:10px; padding:10px; border-radius:10px; border:2px solid var(--pen); color:var(--pen); font-weight:700; text-align:center; font-size:1rem; }
.fig-phases{ display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; margin-top:8px; } .fig-phases div{ border-radius:8px; padding:6px; font-size:.82rem; line-height:1.3; text-align:center; opacity:.45; transition:opacity .4s, background .4s; }
.fig-phases div b{ display:block; color:var(--pen); } .fig-phases div.on{ opacity:1; background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
@media (max-width:480px){ .fig-phases{ grid-template-columns:repeat(2, 1fr); } }
.fig-walk{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; padding:0 14px 12px; } .fig-walk .path{ width:100%; font-size:.8rem; color:var(--graphite); }
.fig-chev{ display:flex; gap:2px; max-width:560px; margin:0 auto; } .fig-chev div{ flex:1; color:#fff; font-weight:600; font-size:.85rem; text-align:center; padding:12px 4px 12px 14px; clip-path:polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%, 12% 50%); opacity:.4; transition:opacity .4s, transform .4s; }
.fig-chev div:first-child{ clip-path:polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%); padding-left:6px; } .fig-chev div.on{ opacity:1; transform:translateY(-3px); } .fig-chev small{ display:block; font-size:.72rem; opacity:.9; }
.fig-ucd{ display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; max-width:560px; margin:0 auto; } .fig-ucd div{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:10px 6px; text-align:center; font-weight:600; opacity:.45; transition:opacity .4s, box-shadow .4s; }
.fig-ucd div.on{ opacity:1; box-shadow:0 0 0 2px var(--k-hci); } .fig-loop{ text-align:center; color:var(--k-hci); font-weight:600; margin-top:8px; }
@media (max-width:420px){ .fig-ucd{ grid-template-columns:repeat(2, 1fr); } }
@media (prefers-reduced-motion: reduce){ .fig .flow, .fig .tap, .fig .roll{ animation:none; } .fig .pop, .fig .fade{ transition:none; } }`;
  if (!document.getElementById('fig-css')) { const s = document.createElement('style'); s.id = 'fig-css'; s.textContent = CSS; document.head.appendChild(s); }

  // steps: [{ en, ar }]; returns [step, controls]
  function useSteps(n, ms) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm());
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play]);
    return [i, { replay: () => { setI(0); setPlay(!calm()); }, go: j => { setPlay(false); setI(j); } }];
  }
  const Cap = ({ en, ar, showAr }) => html`<div className="fig-cap" aria-live="polite"><span dangerouslySetInnerHTML=${{ __html: en }}></span>${showAr && ar && html`<span className="ar" dangerouslySetInnerHTML=${{ __html: ar }}></span>`}</div>`;
  const Bar = ({ steps, i, ctl }) => html`<div className="fig-bar">
    <div className="fig-dots" aria-hidden="true">${steps.map((_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</div>
    <span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(steps.length - 1, i + 1))} disabled=${i === steps.length - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button>
  </div>`;
  const pop = on => 'pop' + (on ? '' : ' off');

  /* ── L1 slide 5: the three parts of HCI ── */
  function HciParts({ ar }) {
    const steps = [
      { en: 'HCI is drawn as a pie with three parts.', ar: 'الـ HCI مترسوم كـ pie فيها 3 أجزاء.' },
      { en: '<b>Human</b>: Communication theory, Industrial design, Social science, Cognitive psychology, Human factors.', ar: '<b>Human</b>: Communication theory و Industrial design و Social science و Cognitive psychology و Human factors.' },
      { en: '<b>Computer</b>: Computer graphic, Operating system, Programming language.', ar: '<b>Computer</b>: Computer graphic و Operating system و Programming language.' },
      { en: '<b>Interaction</b>: Interaction design.', ar: '<b>Interaction</b>: Interaction design.' }
    ];
    const [i, ctl] = useSteps(steps.length, 1800);
    const cx = 210, cy = 175, r = 160, P = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
    const arc = (a, b) => { const [x1, y1] = P(a), [x2, y2] = P(b); return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2} Z`; };
    const part = (d, fill, on) => html`<path d=${d} fill=${fill} stroke="var(--paper)" strokeWidth="3" className="fade" style=${{ opacity: on ? 1 : .18 }} />`;
    const lines = (x, y, head, items, on) => html`<g className=${pop(on)}><text x=${x} y=${y} textAnchor="middle" fontSize="19" fontWeight="700">${head}</text>${items.map((t, j) => html`<text key=${j} x=${x} y=${y + 21 + j * 18} textAnchor="middle" fontSize="14">${t}</text>`)}</g>`;
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 420 345" role="img" aria-label="The three parts of HCI: Human, Computer and Interaction">
        ${part(arc(150, 270), 'color-mix(in srgb, var(--k-hci) 22%, var(--paper))', i >= 1)}
        ${part(arc(270, 390), 'color-mix(in srgb, var(--k-compiler) 20%, var(--paper))', i >= 2)}
        ${part(arc(30, 150), 'color-mix(in srgb, var(--k-mm) 18%, var(--paper))', i >= 3)}
        ${lines(116, 100, 'Human', ['Communication theory', 'Industrial design', 'Social science', 'Cognitive psychology', 'Human factors'], i >= 1)}
        ${lines(304, 108, 'Computer', ['Computer graphic', 'Operating system', 'Programming language'], i >= 2)}
        ${lines(210, 262, 'Interaction', ['Interaction design'], i >= 3)}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 8: the invisible interface ── */
  function Invisible({ ar }) {
    const steps = [
      { en: 'The user reaches the task <b>through the interface</b>.', ar: 'الـ user بيوصل للـ task <b>عن طريق الـ interface</b>.' },
      { en: 'Goal: make the interface <b>as invisible as possible</b>, so users spend little time on it and focus on the task.', ar: 'الهدف: نخلي الـ interface <b>مخفية على قد ما نقدر</b>، فالـ users ميضيعوش وقت عليها ويركزوا على الـ task.' },
      { en: 'The interface <b>vanishes</b> in the middle of the interaction: the user feels they are working directly with the task.', ar: 'الـ interface <b>بتختفي</b> في نص التفاعل: الـ user يحس إنه بيتعامل مع الـ task على طول.' },
      { en: 'The user should think about <b>the task</b>, not about the tool.', ar: 'الـ user المفروض يفكر في <b>الـ task</b> مش في الأداة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    const ui = i >= 2 ? .12 : i === 1 ? .55 : 1;
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 520 205" role="img" aria-label="User, interface and task">
        <g><circle cx="70" cy="80" r="24" fill="var(--k-hci)" /><path d="M30 150 q40 -50 80 0 z" fill="var(--k-hci)" /><text x="70" y="182" textAnchor="middle" fontSize="19" fontWeight="700">USER</text></g>
        <g className="fade" style=${{ opacity: ui }}>
          <rect x="205" y="58" width="110" height="74" rx="8" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="3" />
          <rect x="248" y="132" width="24" height="14" fill="var(--graphite)" /><rect x="228" y="146" width="64" height="6" rx="3" fill="var(--graphite)" />
          <text x="260" y="182" textAnchor="middle" fontSize="19" fontWeight="700" fill="var(--pen)">INTERFACE</text>
        </g>
        <path d="M110 86 H470" stroke="var(--k-hci)" strokeWidth="3" fill="none" className=${calm() ? '' : 'flow'} />
        <path d="M470 108 H110" stroke="var(--k-mm)" strokeWidth="3" fill="none" className=${calm() ? '' : 'flow'} />
        <g><rect x="440" y="52" width="58" height="76" rx="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" /><rect x="456" y="46" width="26" height="12" rx="3" fill="var(--ink)" />
          <path d="M455 92 l10 10 l20 -22" stroke="var(--ok)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <text x="469" y="182" textAnchor="middle" fontSize="19" fontWeight="700">TASK</text></g>
        <text x="290" y="30" textAnchor="middle" fontSize="18" fontWeight="600" className=${pop(i >= 3)}>think about the task, not the tool</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 9: elevator controls, try it ── */
  function Elevator({ ar }) {
    const [msg, setMsg] = useState(null), [hit, setHit] = useState(null), [tries, setTries] = useState(0);
    const say = (k, en, a, bad) => { setHit([k, bad]); setMsg({ en, ar: a }); setTries(t => t + 1); };
    const label = 'Wrong: that is the <b>DOOR OPEN label</b>, not a button. On the bottom row the labels and the control buttons all look the same, so it is easy to push a label by mistake instead of a control button.';
    const labelAr = 'غلط: ده <b>الـ label بتاع DOOR OPEN</b> مش زرار. في الصف اللي تحت الـ labels وزراير التحكم شكلهم كلهم واحد، فسهل تدوس على label بالغلط بدل الزرار.';
    const B = (k, cls, txt, en, a, bad) => html`<button key=${k} className=${cls + (hit && hit[0] === k ? (hit[1] ? ' hit' : ' good') : '')} onClick=${() => say(k, en, a, bad)} aria-label=${txt.replace(/<[^>]+>/g, '') || 'button'} dangerouslySetInnerHTML=${{ __html: txt }}></button>`;
    const intro = { en: '<b>Try it:</b> press the button that opens the elevator door. (Picture from the slide, www.baddesigns.com.)', ar: '<b>جرّب:</b> دوس على الزرار اللي بيفتح باب الأسانسير. (الصورة من الـ slide.)' };
    const m = msg || intro;
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fig-elev">
        <div className="row top">
          <button className="num" tabIndex="-1" aria-hidden="true">★1</button>${B('f1', 'btn', '', 'That is the button for floor 1.', 'ده زرار الدور 1.', false)}
          <button className="num" tabIndex="-1" aria-hidden="true">2</button>${B('f2', 'btn', '', 'That is the button for floor 2.', 'ده زرار الدور 2.', false)}
          <button className="num" tabIndex="-1" aria-hidden="true">3</button>${B('f3', 'btn', '', 'That is the button for floor 3.', 'ده زرار الدور 3.', false)}
        </div>
        <div className="row">
          ${B('ol', 'lbl', 'DOOR<br>◁▷<br>OPEN', label, labelAr, true)}
          ${B('ob', 'btn', '', 'Right: this is the <b>door-open button</b>, next to its label.', 'صح: ده <b>زرار فتح الباب</b>، جنب الـ label بتاعه.', false)}
          ${B('x', 'dark', '✕', 'That is the ✕ control on the bottom row.', 'ده الـ ✕ في الصف اللي تحت.', false)}
          ${B('sr', 'dark', 'STOP<br>▬<br>RUN', 'That is the STOP / RUN switch.', 'ده مفتاح الـ STOP / RUN.', false)}
          ${B('bell', 'dark', '🔔', 'That is the bell.', 'ده الجرس.', false)}
          ${B('b2', 'btn', '', 'That is a control button, but not the door-open one.', 'ده زرار تحكم، بس مش بتاع فتح الباب.', false)}
          ${B('cl', 'lbl', 'DOOR<br>▷◁<br>CLOSE', 'That is the <b>DOOR CLOSE label</b>, not a button: on the bottom row labels and buttons look the same.', 'ده <b>الـ label بتاع DOOR CLOSE</b> مش زرار: في الصف اللي تحت الـ labels والزراير شكلهم واحد.', true)}
          ${B('cb', 'btn', '', 'That is the door-close button.', 'ده زرار قفل الباب.', false)}
        </div>
      </div></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} />
      <div className="fig-bar"><span className="muted small">The slide asks: people do not make the same mistake on the top row. Why not? (for discussion)</span><span className="grow"></span>
        ${tries > 0 && html`<button className="fig-btn" onClick=${() => { setMsg(null); setHit(null); setTries(0); }}>↻ Try again</button>`}</div></figure>`;
  }

  /* ── L1 slide 10: the vending machine, try it ── */
  function Vending({ ar }) {
    const [st, setSt] = useState(0); // 0 idle, 1 reader active, 2 bill in
    const [msg, setMsg] = useState({ en: '<b>Try it the usual way:</b> you want to pay and choose. What do you do first?', ar: '<b>جرّبها بالطريقة المعتادة:</b> عايز تدفع وتختار. هتعمل إيه الأول؟' });
    const insert = () => {
      if (st === 0) setMsg({ en: 'Nothing happens: on this machine you <b>need to push a button first to activate the reader</b>. Normally you insert the bill first before making a selection, so this machine <b>contravenes a well known convention</b>.', ar: 'مفيش حاجة حصلت: في المكنة دي <b>لازم تدوس زرار الأول عشان الـ reader يشتغل</b>. عادةً بتحط الفلوس الأول قبل ما تختار، فالمكنة دي <b>بتخالف convention معروف</b>.' });
      else if (st === 1) { setSt(2); setMsg({ en: 'Bill accepted. Then <b>STEP 2</b>: follow directions on display, and <b>STEP 3</b>: take receipt, place on dash.', ar: 'الفلوس اتقبلت. بعد كده <b>STEP 2</b>: اتبع التعليمات على الشاشة، و<b>STEP 3</b>: خد الإيصال وحطه على الـ dash.' }); }
    };
    const push = () => { if (st === 0) { setSt(1); setMsg({ en: '<b>STEP 1: Push any button to start unit.</b> Now the reader is active and you can insert the bill.', ar: '<b>STEP 1: دوس أي زرار عشان المكنة تشتغل.</b> دلوقتي الـ reader شغال وتقدر تحط الفلوس.' }); } };
    const reset = () => { setSt(0); setMsg({ en: '<b>Try it the usual way:</b> you want to pay and choose. What do you do first?', ar: '<b>جرّبها بالطريقة المعتادة:</b> عايز تدفع وتختار. هتعمل إيه الأول؟' }); };
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fig-steps">${[['STEP 1', 'Push any button to start unit'], ['STEP 2', 'Follow directions on display'], ['STEP 3', 'Take receipt, place on dash']].map((t, j) => html`<div key=${j} className=${'fig-step' + (st === 2 || (st === 1 && j === 0) ? ' on' : '')}><b>${t[0]}</b>${t[1]}</div>`)}</div>
      <p className="fig-reader"><i className=${st === 0 ? '' : 'on'}></i>Bill reader: ${st === 0 ? 'off' : st === 1 ? 'ready' : 'bill accepted'}</p></div>
      <${Cap} en=${msg.en} ar=${msg.ar} showAr=${ar} />
      <div className="fig-bar">
        <button className="fig-btn solid" onClick=${insert} disabled=${st === 2}>Insert the bill</button>
        <button className="fig-btn" onClick=${push} disabled=${st !== 0}>Push a button</button>
        <span className="grow"></span><button className="fig-btn" onClick=${reset}>↻ Start over</button></div></figure>`;
  }

  /* ── L1 slide 14: the Qualcomm device for truckers ── */
  function Truckers({ ar }) {
    const steps = [
      { en: 'The <b>early version</b> of the Qualcomm device for truckers had <b>small buttons</b>.', ar: 'الـ <b>نسخة الأولى</b> من جهاز Qualcomm لسواقين التريلات كان فيها <b>زراير صغيرة</b>.' },
      { en: 'User research found that truckers often have <b>big hands</b> and often <b>wear gloves</b>.', ar: 'الـ user research لقى إن السواقين غالباً <b>إيديهم كبيرة</b> وغالباً <b>لابسين جوانتي</b>.' },
      { en: 'Better design: a <b>large touch screen</b> and a <b>stylus pen</b>.', ar: 'الـ design الأحسن: <b>touch screen كبيرة</b> و<b>stylus pen</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const small = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) small.push([40 + c * 30, 50 + r * 26]);
    const under = (x, y) => i === 1 && Math.hypot(x + 11 - 120, y + 9 - 100) < 40;
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 520 220" role="img" aria-label="Small buttons versus a large touch screen">
        <g className="fade" style=${{ opacity: i < 2 ? 1 : .25 }}>
          <rect x="24" y="30" width="200" height="140" rx="12" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="3" />
          ${small.map(([x, y], j) => html`<rect key=${j} x=${x} y=${y} width="22" height="18" rx="3" fill=${under(x, y) ? 'var(--pen)' : 'var(--paper-2)'} stroke="var(--faint)" />`)}
          <text x="124" y="200" textAnchor="middle" fontSize="17" fontWeight="700">Small buttons</text>
          <g className=${i === 1 && !calm() ? 'tap' : ''} style=${{ opacity: i === 1 ? 1 : 0 }}>
            <ellipse cx="120" cy="96" rx="34" ry="30" fill="#8a6a4a" opacity=".92" /><rect x="96" y="96" width="48" height="70" rx="18" fill="#8a6a4a" opacity=".92" />
            <text x="120" y="102" textAnchor="middle" fontSize="14" fill="#fff" style=${{ fill: '#fff' }}>glove</text></g>
        </g>
        <g className=${pop(i >= 2)}>
          <rect x="290" y="30" width="200" height="140" rx="12" fill="var(--paper)" stroke="var(--k-hci)" strokeWidth="3" />
          <rect x="304" y="44" width="172" height="112" rx="6" fill="color-mix(in srgb, var(--k-hci) 16%, var(--paper))" />
          <rect x="324" y="64" width="62" height="34" rx="6" fill="var(--paper)" stroke="var(--k-hci)" /><rect x="396" y="64" width="62" height="34" rx="6" fill="var(--paper)" stroke="var(--k-hci)" />
          <rect x="324" y="106" width="134" height="34" rx="6" fill="var(--paper)" stroke="var(--k-hci)" />
          <g className=${i >= 2 && !calm() ? 'tap' : ''}><path d="M418 8 L452 70" stroke="var(--ink)" strokeWidth="9" strokeLinecap="round" /><path d="M449 64 L456 80 L443 72 Z" fill="var(--ink)" /><path d="M418 8 L424 19" stroke="var(--k-hci)" strokeWidth="9" strokeLinecap="round" /></g>
          <text x="390" y="200" textAnchor="middle" fontSize="17" fontWeight="700">Large touch screen + stylus</text>
        </g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 22: interaction design and the fields around it ── */
  function Umbrella({ ar }) {
    const steps = [
      { en: '<b>Interaction design</b> sits in the middle of many fields.', ar: 'الـ <b>Interaction design</b> في النص بين مجالات كتير.' },
      { en: '<b>Academic disciplines</b> feed into interaction design.', ar: 'الـ <b>Academic disciplines</b> بتغذي الـ interaction design.' },
      { en: '<b>Design practices</b> feed into interaction design.', ar: 'الـ <b>Design practices</b> بتغذي الـ interaction design.' },
      { en: '<b>Interdisciplinary fields</b> work with interaction design both ways.', ar: 'الـ <b>Interdisciplinary fields</b> بتشتغل مع الـ interaction design في الاتجاهين.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2000);
    const G = (title, items, on, cls) => html`<div className=${'grp ' + (cls || '') + ' ' + pop(on)}><b>${title}</b>${items.join(' · ')}</div>`;
    return html`<figure className="fig"><div className="fig-stage"><div className="fig-umb">
      ${G('Academic disciplines', ['Ergonomics', 'Psychology / Cognitive Science', 'Informatics', 'Engineering', 'Computer Science / Software Engineering', 'Social Sciences (e.g. Sociology, Anthropology)'], i >= 1)}
      <div className=${'arr ' + pop(i >= 1)}><span className="h">→</span><span className="v">↓</span></div>
      <div className="id">Interaction<br />Design</div>
      <div className=${'arr ' + pop(i >= 2)}><span className="h">←</span><span className="v">↑</span></div>
      ${G('Design practices', ['Graphic Design', 'Product Design', 'Artist-Design', 'Industrial Design', 'Film Industry'], i >= 2)}
      <div className=${'bottom ' + pop(i >= 3)}><div className="arr">⇅</div>${G('Interdisciplinary fields', ['Human Factors (HF)', 'Cognitive Engineering', 'Human-Computer Interaction (HCI)', 'Cognitive Ergonomics', 'Computer-Supported Cooperative Work (CSCW)', 'Information Systems'], true)}</div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }


  /* ── L1 slide 4: user and computer joined by "Interaction" ── */
  function UserComputer({ ar }) {
    const steps = [
      { en: 'HCI: the <b>interaction</b> between user and computer,', ar: 'الـ HCI: <b>التفاعل</b> بين الـ user والكمبيوتر،' },
      { en: 'OR the <b>relationship</b> between users and computer systems.', ar: 'أو <b>العلاقة</b> بين الـ users والـ computer systems.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 190" role="img" aria-label="A user and a computer joined by a two-way arrow labelled Interaction">
        <circle cx="70" cy="62" r="24" fill="var(--k-hci)" /><path d="M30 132 q40 -54 80 0 z" fill="var(--k-hci)" />
        <text x="70" y="168" textAnchor="middle" fontSize="18" fontWeight="700">User</text>
        <rect x="318" y="44" width="96" height="66" rx="7" fill="var(--paper)" stroke="var(--graphite)" strokeWidth="3" /><rect x="356" y="110" width="20" height="12" fill="var(--graphite)" /><rect x="338" y="122" width="56" height="6" rx="3" fill="var(--graphite)" />
        <text x="366" y="168" textAnchor="middle" fontSize="18" fontWeight="700">Computer</text>
        <path d="M122 80 H300" stroke="var(--k-hci)" strokeWidth="4" fill="none" className=${calm() ? '' : 'flow'} /><path d="M300 80 l-12 -8 v16 z" fill="var(--k-hci)" />
        <path d="M300 100 H122" stroke="var(--k-mm)" strokeWidth="4" fill="none" className=${calm() ? '' : 'flow'} /><path d="M122 100 l12 -8 v16 z" fill="var(--k-mm)" />
        <text x="211" y="66" textAnchor="middle" fontSize="18" fontWeight="700">Interaction</text>
        <text x="211" y="132" textAnchor="middle" fontSize="15" className=${pop(i >= 1)}>relationship</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 11: the marble answering machine (Bishop, 1995) ── */
  function Marble({ ar }) {
    const steps = [
      { en: 'Marble answering machine (Bishop, 1995): marbles roll down a track into a tray.', ar: 'الـ Marble answering machine (Bishop, 1995): البلي بيتدحرج على مجرى لحد ما يوصل لصينية.' },
      { en: 'A hand picks up a marble: it only requires <b>one-step actions</b> to perform core tasks.', ar: 'إيد بتشيل بلية: بيحتاج <b>خطوة واحدة بس</b> عشان تعمل المهام الأساسية.' },
      { en: 'Based on <b>how everyday objects behave</b>: easy, intuitive, and a pleasure to use.', ar: 'مبني على <b>طريقة تصرف الحاجات اللي بنستعملها كل يوم</b>: سهل و intuitive وممتع في الاستخدام.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const tray = [[300, 150], [328, 150], [356, 150]];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 200" role="img" aria-label="Marbles rolling down a track into a tray, and a hand picking one up">
        <rect x="40" y="40" width="360" height="140" rx="16" fill="#c08a52" />
        <path d="M70 70 L280 140" stroke="#8a5a2c" strokeWidth="14" strokeLinecap="round" />
        <rect x="280" y="136" width="100" height="28" rx="12" fill="#8a5a2c" />
        ${[0, 1].map(j => html`<circle key=${j} cx="80" cy="73" r="9" fill=${['#ef4444', '#3b82f6'][j]} className=${calm() ? '' : 'roll'} style=${{ animationDelay: j * 1.3 + 's', opacity: calm() ? 0 : 1 }} />`)}
        ${tray.map(([x, y], j) => html`<circle key=${j} cx=${x} cy=${y} r="10" fill=${['#facc15', '#22c55e', '#a855f7'][j]} style=${{ opacity: i >= 1 && j === 2 ? 0 : 1, transition: 'opacity .6s' }} />`)}
        <g className=${pop(i >= 1)}><circle cx="356" cy="92" r="10" fill="#a855f7" /><path d="M344 104 q12 -30 40 -26 q14 4 8 24 l-20 40 h-30 z" fill="#f2c9a0" stroke="#b07a50" strokeWidth="2" /></g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 12: the TiVo remote ── */
  function Tivo({ ar }) {
    const steps = [
      { en: 'Why is the TiVo remote much better designed than standard remote controls?', ar: 'ليه الـ TiVo remote متصمم أحسن بكتير من الريموتات العادية؟' },
      { en: '<b>Peanut shaped</b> to fit in hand.', ar: '<b>على شكل فول سوداني (peanut)</b> عشان يتمسك في الإيد.' },
      { en: '<b>Logical layout</b> and <b>color-coded, distinctive buttons</b>.', ar: '<b>ترتيب منطقي</b> و<b>زراير متميزة بألوان مختلفة</b>.' },
      { en: '<b>Easy-to-locate</b> buttons.', ar: 'زراير <b>سهل تلاقيها</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    const glow = on => ({ stroke: on ? 'var(--k-hci)' : 'none', strokeWidth: 3 });
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 280" role="img" aria-label="The TiVo remote">
        <path d="M220 16 C270 16 282 60 270 100 C262 128 262 150 272 180 C290 238 258 268 220 268 C182 268 150 238 168 180 C178 150 178 128 170 100 C158 60 170 16 220 16 Z" fill="#26282d" style=${glow(i === 1)} />
        <circle cx="220" cy="78" r="30" fill="#3a3d44" style=${glow(i === 2)} /><circle cx="220" cy="78" r="11" fill="#9ca3af" />
        <circle cx="220" cy="38" r="9" fill="#60a5fa" style=${glow(i === 3)} />
        <circle cx="198" cy="128" r="10" fill="#ef4444" style=${glow(i === 2)} /><circle cx="242" cy="128" r="10" fill="#22c55e" style=${glow(i === 2)} />
        <ellipse cx="220" cy="160" rx="18" ry="11" fill="#facc15" style=${glow(i === 3)} />
        ${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => html`<rect key=${r + '-' + c} x=${196 + c * 18} y=${186 + r * 16} width="12" height="10" rx="3" fill="#6b7280" />`))}
        <text x="64" y="70" fontSize="15" className=${pop(i === 1)}>peanut shaped</text>
        <text x="300" y="130" fontSize="15" className=${pop(i === 2)}>color-coded</text>
        <text x="300" y="168" fontSize="15" className=${pop(i === 3)}>easy to locate</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 13: smart TV dilemma (no answer on the slide) ── */
  function SmartTv({ ar }) {
    const steps = [
      { en: 'Which is the best way to interact with a smart TV? Why? (question for discussion; the slide gives no answer)', ar: 'إيه أحسن طريقة للتعامل مع الـ smart TV؟ وليه؟ (سؤال للمناقشة؛ الـ slide مش بتدي إجابة)' },
      { en: '1) <b>Pecking</b> using a grid keyboard via a remote control.', ar: '1) <b>Pecking</b> بـ grid keyboard عن طريق الريموت.' },
      { en: '2) <b>Swiping</b> across two alphanumeric rows using a touchpad on a remote control.', ar: '2) <b>Swiping</b> على صفين حروف وأرقام بـ touchpad في الريموت.' },
      { en: '3) <b>Voice control</b> using a remote or smart speaker.', ar: '3) <b>Voice control</b> عن طريق الريموت أو smart speaker.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const [t, setT] = useState(0);
    useEffect(() => { if (calm()) return; const id = setInterval(() => setT(x => x + 1), 450); return () => clearInterval(id); }, []);
    const grid = 'abcdefghijklmnopqrstuvwxyz1234567890'.split(''), row1 = 'abcdefghijklm'.split(''), row2 = ['1', '2', '3', '…', '.com', '.net', '.edu'];
    const card = (j, title, body) => html`<div className=${'fig-card' + (i === 0 || i === j ? ' on' : ' dim')}><b>${title}</b>${body}</div>`;
    return html`<figure className="fig"><div className="fig-stage"><div className="fig-row">
      ${card(1, '1) Grid keyboard (pecking)', html`<div className="fig-kb" style=${{ gridTemplateColumns: 'repeat(6, 1fr)' }}>${grid.map((c, j) => html`<span key=${j} className=${j === (t * 7) % 36 ? 'cur' : ''}>${c}</span>`)}</div>`)}
      ${card(2, '2) Two rows (swiping)', html`<div className="fig-kb" style=${{ gridTemplateColumns: 'repeat(13, 1fr)' }}>${row1.map((c, j) => html`<span key=${j} className=${j === t % 13 ? 'cur' : ''}>${c}</span>`)}</div><div className="fig-kb" style=${{ gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr 2fr 2fr', marginTop: '4px' }}>${row2.map((c, j) => html`<span key=${j}>${c}</span>`)}</div><p className="muted small" style=${{ margin: '6px 0 0' }}>a to z on one row; numbers and symbols (.com, .net, .edu) on the other</p>`)}
      ${card(3, '3) Voice control', html`<svg viewBox="0 0 120 60" style=${{ maxWidth: '140px' }}><rect x="50" y="8" width="20" height="32" rx="10" fill="var(--k-hci)" /><path d="M42 30 a18 18 0 0 0 36 0" stroke="var(--k-hci)" strokeWidth="4" fill="none" /><path d="M60 48 v8" stroke="var(--k-hci)" strokeWidth="4" />${[0, 1, 2].map(k => html`<path key=${k} d=${'M' + (86 + k * 9) + ' 14 q8 14 0 28'} stroke="var(--k-mm)" strokeWidth="3" fill="none" style=${{ opacity: (t + k) % 3 === 0 ? 1 : .3 }} />`)}</svg><p className="muted small" style=${{ margin: '4px 0 0' }}>using a remote or smart speaker</p>`)}
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slides 15–16: two mock-ups for an online book library search ── */
  function BookMockups({ ar }) {
    const steps = [
      { en: 'Designing the search feature for an online book library: the first mock-up.', ar: 'تصميم الـ search feature لمكتبة كتب online: أول mock-up.' },
      { en: 'The second mock-up: the same layout in bright colors, with a cartoon face saying "Reading Rox".', ar: 'تاني mock-up: نفس الـ layout بألوان فاقعة، مع وش كارتون بيقول "Reading Rox".' },
      { en: '<b>Bad design</b>: the user research component is almost absent.', ar: '<b>Design وحش</b>: الـ user research تقريباً مش موجود.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const mock = (color, books) => html`<div className=${'fig-mock' + (color ? ' color' : '')}>
      <div className="hd">[header and menus]</div>
      <div className="r"><div className="sb">[Search box]</div><div className="dd">[by Title] ▾</div><div className="go">[Go]</div></div>
      <div className="books">${books.map((b, j) => html`<div key=${j}>${b}</div>`)}${color && html`<div className="rox">☺<small>Reading Rox</small></div>`}</div></div>`;
    return html`<figure className="fig"><div className="fig-stage"><div className="fig-row" style=${{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
      <div className=${pop(true)}>${mock(false, ['[Book 1]', '[Book 2]', '[Book 3]', '[Book 3]'])}</div>
      <div className=${pop(i >= 1)}>${mock(true, ['[Book 1]', '[Book 2]', '[Book 3]'])}</div>
    </div><p className=${pop(i >= 2)} style=${{ textAlign: 'center', margin: '10px 0 0', color: 'var(--pen)', fontWeight: 700 }}>Bad design: user research component is almost absent</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slides 17–18: the ICDL Simple Search page, try the picture buttons ── */
  function IcdlSearch({ ar }) {
    const [sel, setSel] = useState(null);
    const colors = [['Rainbow', 'conic-gradient(red, orange, yellow, green, blue, violet, red)'], ['Red', '#ef4444'], ['Orange', '#f97316'], ['Yellow', '#facc15'], ['Green', '#22c55e'], ['Blue', '#3b82f6']];
    const ages = ['Three to Five', 'Six to Nine', 'Ten to Thirteen'];
    const kinds = ['Make Believe Books', 'True Books', 'Short Books', 'Medium Books', 'Long Books', 'Picture Books', 'Chapter Books', 'Fairy Tales and Folk Tales', 'Kid Characters', 'Real Animal Characters', 'Imaginary Creature Characters', 'Award Winning Books', 'Recently Added Books'];
    const btn = (k, label, dot) => html`<button key=${k} className=${sel === k ? 'sel' : ''} onClick=${() => setSel(k)}>${dot && html`<i style=${{ background: dot }}></i>`}${label}</button>`;
    const en = sel ? 'You searched by <b>' + sel + '</b> with one tap on a picture button: the <b>visual search</b> that users preferred (71% of searches).' : '<b>Try it:</b> the ICDL Simple Search page searches with big picture buttons. HCIL designed it; good design with more than 3 million unique visitors.';
    const a = sel ? 'دورت بـ <b>' + sel + '</b> بضغطة واحدة على زرار بصورة: ده الـ <b>visual search</b> اللي الـ users فضّلوه (71% من عمليات البحث).' : '<b>جرّب:</b> صفحة الـ Simple Search في ICDL بتدور بزراير كبيرة فيها صور. اللي صممها HCIL؛ design كويس زاره أكتر من 3 مليون زائر مختلف.';
    return html`<figure className="fig"><div className="fig-stage"><div className="fig-icdl">
      <div className="grp"><b>Covers</b>${colors.map(([c, d]) => btn(c + ' Covers', c, d))}</div>
      <div className="grp"><b>Age</b>${ages.map(x => btn(x, x))}</div>
      <div className="grp"><b>Books</b>${kinds.map(x => btn(x, x))}</div>
    </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span>${sel && html`<button className="fig-btn" onClick=${() => setSel(null)}>↻ Clear</button>`}</div></figure>`;
  }

  /* ── L1 slide 19: the doctor's office form (no answer on the slide) ── */
  function DoctorForm({ ar }) {
    const who = ['my son', 'the patient', 'me', 'my wife', 'his doctors', 'dentists', 'pharmacies', 'insurance companies', 'emergency contact information', 'responsible parties'];
    const [n, setN] = useState(calm() ? who.length + 1 : 0), [run, setRun] = useState(!calm());
    useEffect(() => { if (!run || n > who.length) return; const t = setTimeout(() => setN(x => x + 1), 650); return () => clearTimeout(t); }, [n, run]);
    const done = n > who.length, mins = Math.min(30, Math.round(n / who.length * 30));
    const en = done ? 'After completing and submitting: <b>"Internal server error"</b>. How can this bad user experience be avoided through a better design? (question for discussion; the slide gives no answer)' : 'Filling out a doctor’s office form: address, phone number, email address and social security number, an average of 3 times, for at least 10 different people and organizations.';
    const a = done ? 'بعد ما خلّص وبعت الفورم: <b>"Internal server error"</b>. إزاي نتجنب الـ user experience الوحشة دي بـ design أحسن؟ (سؤال للمناقشة؛ الـ slide مش بتدي إجابة)' : 'بيملا فورم عند الدكتور: العنوان ورقم التليفون والإيميل ورقم الـ social security، في المتوسط 3 مرات، لـ 10 أشخاص وجهات مختلفة على الأقل.';
    return html`<figure className="fig"><div className="fig-stage"><div className="fig-form">
      <b>Doctor's office form</b> · address, phone, email, social security number
      <div className="who">${who.map((w, j) => html`<span key=${j} className=${j < n ? 'done' : ''}>${w}</span>`)}</div>
      <div className="bar"><i style=${{ width: Math.min(100, n / who.length * 100) + '%' }}></i></div>
      <p className="muted small" style=${{ margin: '6px 0 0' }}>${done ? 'at least 30 minutes' : mins + ' min'}</p>
      ${done && html`<div className="err">Internal server error ☹</div>`}
    </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setN(0); setRun(!calm()); }}>↻ Replay</button></div></figure>`;
  }

  /* ── L2 slide 5: the double diamond of design ── */
  function DoubleDiamond({ ar }) {
    const steps = [
      { en: 'The double diamond of design has four phases, across two diamonds: from the <b>Problem</b> to the <b>Solution</b>.', ar: 'الـ double diamond of design فيه 4 phases على 2 diamonds: من الـ <b>Problem</b> لحد الـ <b>Solution</b>.' },
      { en: '<b>Discover</b>: insight into the problem (the first diamond widens).', ar: '<b>Discover</b>: فهم للمشكلة (أول diamond بيوسع).' },
      { en: '<b>Define</b>: the area to focus upon (it narrows to the <b>Problem Definition / Design Brief</b>).', ar: '<b>Define</b>: المنطقة اللي هنركز عليها (بيضيق لحد الـ <b>Problem Definition / Design Brief</b>).' },
      { en: '<b>Develop</b>: potential solutions (the second diamond widens).', ar: '<b>Develop</b>: حلول محتملة (تاني diamond بيوسع).' },
      { en: '<b>Deliver</b>: solutions that work (it narrows to the <b>Solution</b>).', ar: '<b>Deliver</b>: حلول بتشتغل (بيضيق لحد الـ <b>Solution</b>).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    const X = [15, 117, 220, 322, 425], T = 40, B = 220, M = 130;
    const half = k => k % 2 === 0 ? `M${X[k]},${M} L${X[k + 1]},${T} L${X[k + 1]},${B} Z` : `M${X[k]},${T} L${X[k + 1]},${M} L${X[k]},${B} Z`;
    const ph = [['Discover', 'insight into the problem'], ['Define', 'the area to focus upon'], ['Develop', 'potential solutions'], ['Deliver', 'solutions that work']];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 272" role="img" aria-label="The double diamond of design">
        ${[0, 1, 2, 3].map(k => html`<path key=${k} d=${half(k)} fill=${i === k + 1 ? 'color-mix(in srgb, var(--pen) 22%, var(--paper))' : i > k + 1 || i === 0 ? 'color-mix(in srgb, var(--pen) 7%, var(--paper))' : 'var(--paper)'} className="fade" />`)}
        <path d=${`M${X[0]},${M} L${X[1]},${T} L${X[2]},${M} L${X[1]},${B} Z M${X[2]},${M} L${X[3]},${T} L${X[4]},${M} L${X[3]},${B} Z`} fill="none" stroke="var(--pen)" strokeWidth="3" strokeLinejoin="round" />
        <circle cx=${X[0]} cy=${M} r="6" fill="var(--pen)" /><circle cx=${X[2]} cy=${M} r="8" fill="var(--paper)" stroke="var(--pen)" strokeWidth="3" /><circle cx=${X[4] - 4} cy=${M} r="9" fill="var(--paper)" stroke="var(--pen)" strokeWidth="3" />
        <text x=${X[0]} y="248" fontSize="15" fontWeight="600">Problem</text>
        <text x=${X[2]} y="248" fontSize="14" fontWeight="600" textAnchor="middle">Problem Definition /</text><text x=${X[2]} y="264" fontSize="14" fontWeight="600" textAnchor="middle">Design Brief</text>
        <text x=${X[4]} y="248" fontSize="15" fontWeight="600" textAnchor="end">Solution</text>
      </svg>
      <div className="fig-phases">${ph.map(([a, b], k) => html`<div key=${k} className=${i === 0 || i === k + 1 ? 'on' : ''}><b>${a}</b>${b}</div>`)}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slide 7: a simple interaction design lifecycle model, walk it ── */
  function Lifecycle({ ar }) {
    const N = { dis: [220, 58, 'Discovering', 'requirements'], des: [82, 150, 'Designing', 'alternatives'], pro: [220, 240, 'Prototyping', ''], eva: [358, 150, 'Evaluating', ''] };
    const OUT = { start: ['dis'], dis: ['des'], des: ['dis', 'pro'], pro: ['des', 'eva'], eva: ['dis', 'des', 'end'] };
    const name = k => k === 'end' ? 'Final product' : (N[k][2] + ' ' + N[k][3]).trim().toLowerCase().replace(/^./, c => c.toUpperCase());
    const AR = { dis: 'Discovering requirements', des: 'Designing alternatives', pro: 'Prototyping', eva: 'Evaluating', end: 'Final product' };
    const [cur, setCur] = useState('start'), [path, setPath] = useState([]);
    const go = k => { setPath(p => p.concat(k)); setCur(k); };
    const reset = () => { setCur('start'); setPath([]); };
    const en = cur === 'start' ? '<b>Walk the model:</b> it exemplifies a user-centered design approach. The process enters at Discovering requirements.'
      : cur === 'end' ? 'Out of the cycle to the <b>Final product</b>. Only Evaluating has an arrow out.'
      : 'From <b>' + name(cur) + '</b> the arrows go to: ' + OUT[cur].map(name).join(', ') + '.';
    const a = cur === 'start' ? '<b>امشي في الـ model:</b> هو مثال على الـ user-centered design. الـ process بتبدأ من Discovering requirements.'
      : cur === 'end' ? 'خرجت من الـ cycle للـ <b>Final product</b>. الـ Evaluating بس هو اللي ليه سهم لبره.'
      : 'من <b>' + AR[cur] + '</b> الأسهم بتروح لـ: ' + OUT[cur].map(k => AR[k]).join('، ') + '.';
    const E = (k) => { const [x, y, l1, l2] = N[k]; const on = cur === k, next = (OUT[cur] || []).includes(k);
      return html`<g key=${k}><ellipse cx=${x} cy=${y} rx="74" ry="28" fill=${on ? 'var(--s-hci)' : next ? 'color-mix(in srgb, var(--k-hci) 18%, var(--paper))' : 'var(--paper)'} stroke=${next ? 'var(--k-hci)' : 'var(--graphite)'} strokeWidth=${next ? 3 : 1.5} className="fade" />
        <text x=${x} y=${l2 ? y - 3 : y + 5} textAnchor="middle" fontSize="15" fontWeight="600" style=${on ? { fill: '#fff' } : null}>${l1}</text>${l2 && html`<text x=${x} y=${y + 15} textAnchor="middle" fontSize="15" fontWeight="600" style=${on ? { fill: '#fff' } : null}>${l2}</text>`}</g>`; };
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 320" role="img" aria-label="A simple interaction design lifecycle model">
        <defs><marker id="lc-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--graphite)" /></marker></defs>
        <g stroke="var(--graphite)" strokeWidth="2" fill="none" markerEnd="url(#lc-ar)">
          <path d="M170 8 Q214 6 218 28" />
          <path d="M150 70 Q110 86 100 120" /><path d="M128 126 Q150 98 168 84" />
          <path d="M70 178 Q90 226 146 238" /><path d="M170 216 Q140 196 120 176" />
          <path d="M294 236 Q340 226 352 178" />
          <path d="M284 150 H158" />
          <path d="M350 122 Q336 76 296 66" />
          <path d="M424 160 Q436 230 420 290" />
        </g>
        ${['dis', 'des', 'pro', 'eva'].map(E)}
        <text x="420" y="310" textAnchor="end" fontSize="15" fontWeight="700" fill=${cur === 'end' ? 'var(--ok)' : 'var(--ink)'} style=${cur === 'end' ? { fill: 'var(--ok)' } : null}>Final product</text>
      </svg></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-walk">
        ${cur === 'end' ? null : (OUT[cur] || []).map(k => html`<button key=${k} className="fig-btn solid" onClick=${() => go(k)}>→ ${name(k)}</button>`)}
        <span className="grow"></span>${path.length > 0 && html`<button className="fig-btn" onClick=${reset}>↻ Start over</button>`}
        ${path.length > 0 && html`<span className="path">Your path: ${path.map(name).join(' → ')}</span>`}
      </div></figure>`;
  }

  /* ── L2 slide 8: Google Design Sprints (Knapp et al., 2016) ── */
  function Sprint({ ar }) {
    const S = [['Unpack', '#f97316'], ['Sketch', '#9ca3af'], ['Decide', '#eab308'], ['Prototype', '#4f6bd8'], ['Test', '#22a34a']];
    const steps = [
      { en: 'Another lifecycle model: <b>Google Design Sprints</b> (Knapp et al., 2016), with five steps.', ar: 'lifecycle model تاني: <b>Google Design Sprints</b> (Knapp et al., 2016)، فيه 5 خطوات.' },
      ...S.map(([n], k) => ({ en: (k + 1) + ') <b>' + n + '</b>', ar: (k + 1) + ') <b>' + n + '</b>' })),
      { en: 'The steps form a cycle labelled <b>Iterate</b>: Test leads back to Unpack.', ar: 'الخطوات بتعمل cycle اسمها <b>Iterate</b>: الـ Test بيرجع للـ Unpack.' }
    ];
    const [i, ctl] = useSteps(steps.length, 1700);
    const R = 62, cx = 220, cy = 210, pos = k => [cx + R * Math.cos((k / 5) * 2 * Math.PI - Math.PI / 2), cy + R * Math.sin((k / 5) * 2 * Math.PI - Math.PI / 2)];
    return html`<figure className="fig"><div className="fig-stage">
      <p style=${{ textAlign: 'center', margin: '0 0 8px', fontWeight: 600 }}>Google Design Sprint</p>
      <div className="fig-chev">${S.map(([n, c], k) => html`<div key=${k} className=${i === 0 || i === k + 1 || i === 6 ? 'on' : ''} style=${{ background: c }}><small>${k + 1}</small>${n}</div>`)}</div>
      <svg viewBox="40 110 360 200" role="img" aria-label="The sprint steps form a cycle labelled Iterate" style=${{ maxWidth: '440px', marginTop: '6px', opacity: i === 6 ? 1 : .35, transition: 'opacity .5s' }}>
        <defs><marker id="sp-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--k-compiler)" /></marker></defs>
        ${S.map(([n], k) => { const [x, y] = pos(k), [x2, y2] = pos(k + 1); return html`<g key=${k}><text x=${x + (x - cx) * .55} y=${y + (y - cy) * .45 + 5} textAnchor="middle" fontSize="15" fontWeight="600">${n}</text>
          <path d=${`M${x + (x2 - x) * .25},${y + (y2 - y) * .25} L${x + (x2 - x) * .75},${y + (y2 - y) * .75}`} stroke="var(--k-compiler)" strokeWidth="3" markerEnd="url(#sp-ar)" /></g>`; })}
        <text x=${cx} y=${cy + 6} textAnchor="middle" fontSize="17" fontWeight="700">Iterate</text>
      </svg>
      <p className="muted small" style=${{ textAlign: 'center', margin: 0 }}>Source: Google Design Sprints (used courtesy of Agile Marketing)</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2 slide 9: Joyner's design life cycle ── */
  function Joyner({ ar }) {
    const P = [['Need finding', 220, 42], ['Design alternative', 352, 140], ['Prototyping', 220, 238], ['Evaluation', 88, 140]];
    const steps = [
      { en: 'Joyner’s design life cycle: an <b>iterative process with four phases</b>.', ar: 'الـ design life cycle بتاع Joyner: <b>iterative process فيها 4 phases</b>.' },
      ...P.map(([n], k) => ({ en: (k + 1) + ') <b>' + n + '</b>' + (k === 3 ? ', then back to Need finding.' : ''), ar: (k + 1) + ') <b>' + n + '</b>' + (k === 3 ? '، وبعدين ترجع للـ Need finding.' : '') }))
    ];
    const [i, ctl] = useSteps(steps.length, 1800);
    const arrows = ['M302 66 L338 100', 'M338 180 L302 214', 'M138 214 L102 180', 'M102 100 L138 66'];
    return html`<figure className="fig"><div className="fig-stage">
      <svg viewBox="0 0 440 280" role="img" aria-label="Joyner's design life cycle">
        <defs><marker id="jy-ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#3a9ad9" /></marker></defs>
        ${arrows.map((d, k) => html`<path key=${k} d=${d} stroke="#3a9ad9" strokeWidth="5" strokeLinecap="round" markerEnd="url(#jy-ar)" style=${{ opacity: i === 0 || i === k + 1 ? 1 : .35, transition: 'opacity .4s' }} />`)}
        ${P.map(([n, x, y], k) => html`<g key=${k}><ellipse cx=${x} cy=${y} rx="80" ry="30" fill=${i === k + 1 ? '#1f8fd6' : '#5bb8ef'} stroke="#1f6fa6" strokeWidth="2" className="fade" />
          <text x=${x} y=${y + 6} textAnchor="middle" fontSize="17" fontWeight="600" style=${{ fill: '#fff' }}>${n}</text></g>`)}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L2, from last year's slides: Google's user-centered design process ── */
  function GoogleUcd({ ar }) {
    const S = [['Understand', 'how users experience the product (a lot of research)', 'إزاي الـ users بيستخدموا الـ product (research كتير)'], ['Specify', 'the most important user problem to solve', 'أهم مشكلة عند الـ user لازم تتحل'], ['Design', 'solutions, then start building', 'حلول، وبعدين تبدأ تبني'], ['Evaluate', 'test with real users', 'اختبر مع users حقيقيين']];
    const steps = [
      { en: 'Google’s user-centered design process: Understand → Specify → Design → Evaluate.', ar: 'الـ user-centered design process بتاع Google: Understand → Specify → Design → Evaluate.' },
      ...S.map(([n, e, a]) => ({ en: '<b>' + n + '</b>: ' + e + '.', ar: '<b>' + n + '</b>: ' + a + '.' })),
      { en: '<b>Iteration is key.</b>', ar: '<b>الـ iteration هي الأساس.</b>' }
    ];
    const [i, ctl] = useSteps(steps.length, 1900);
    return html`<figure className="fig"><div className="fig-stage">
      <div className="fig-ucd">${S.map(([n], k) => html`<div key=${k} className=${i === 0 || i === k + 1 || i === 5 ? 'on' : ''}>${n}${k < 3 ? ' →' : ''}</div>`)}</div>
      <p className=${'fig-loop ' + pop(i === 5)}>↺ iterate</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  window.FIGS = { 'hci-parts': HciParts, 'invisible-interface': Invisible, 'elevator': Elevator, 'vending': Vending, 'truckers': Truckers, 'id-umbrella': Umbrella, 'user-computer': UserComputer, 'marble': Marble, 'tivo': Tivo, 'smart-tv': SmartTv, 'book-mockups': BookMockups, 'icdl-search': IcdlSearch, 'doctor-form': DoctorForm, 'double-diamond': DoubleDiamond, 'id-lifecycle': Lifecycle, 'design-sprint': Sprint, 'joyner-cycle': Joyner, 'google-ucd': GoogleUcd };
})();

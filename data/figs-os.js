// Visuals for the Operating Systems notes (names 'os-…'), built on figs.js (window.FIGKIT).
// Every label and caption comes from the doctor's slides. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('fo-accent')) { const s = document.createElement('style'); s.id = 'fo-accent'; s.textContent = '[data-fig^="os-"]{ --fig-k: var(--k-os); --fig-s: var(--s-os); }'; document.head.appendChild(s); } })();
/* ── part 1 ── */
// Operating Systems visuals, part 1: Lecture 1 (Introduction), slides 5, 9, 10, 11–13, 14, 15, 16–19.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.fo1{ --fig-k:var(--k-os); --fig-s:var(--s-os); }
.fo1 .fig-btn:disabled{ opacity:.45; cursor:default; }
.fo1 .fig-btn.fo1-sel{ border-color:var(--k-os); box-shadow:0 0 0 1px var(--k-os); background:color-mix(in srgb, var(--k-os) 14%, var(--paper)); }
.fo1-k{ color:var(--k-os); font-weight:700; }
.fo1-muted{ color:var(--graphite); font-size:.85rem; }
.fo1-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 10px; }
.fo1-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.fo1-row > span{ font-size:.85rem; color:var(--graphite); }
/* four components */
.fo1-fc{ max-width:520px; margin:0 auto; color:var(--ink); }
.fo1-fc-top{ display:grid; }
.fo1-fc-col{ display:grid; grid-template-columns:1fr 1fr 1fr .5fr 1fr; gap:6px; }
.fo1-fc-u{ height:44px; border:1px solid var(--graphite); border-radius:4px; background:var(--paper); color:var(--ink); display:grid; place-items:center; font:inherit; font-size:.9rem; line-height:1.15; padding:0 4px; cursor:pointer; transition:box-shadow .4s; }
.fo1-fc-u.dots, .fo1-fc-n.dots{ border:0; background:transparent; cursor:default; font-weight:700; }
.fo1-fc-u.on{ box-shadow:0 0 0 2px var(--k-os); }
.fo1-fc-ar{ height:30px; display:grid; place-items:center; color:var(--k-os); font-size:1.25rem; font-weight:700; }
.fo1-fc-ar .h{ display:none; }
.fo1-ly{ display:block; width:100%; font:inherit; color:var(--ink); border:1.5px solid var(--graphite); border-radius:4px; background:color-mix(in srgb, var(--k-os) 12%, var(--paper)); padding:6px; text-align:center; cursor:pointer; transition:box-shadow .4s, opacity .5s, transform .5s; }
.fo1-ly.on{ box-shadow:0 0 0 3px var(--k-os); }
.fo1-fc-n{ min-height:40px; display:grid; place-items:center; font-size:.86rem; line-height:1.15; text-align:center; overflow-wrap:anywhere; }
.fo1-fc-lbl{ display:block; margin-top:4px; font-size:.92rem; font-weight:600; }
.fo1-fc-os{ width:68%; margin:0 auto; border-top:0; border-radius:0 0 4px 4px; padding:14px 6px; font-weight:600; }
.fo1-fc-hw{ width:42%; margin:0 auto; border-top:0; border-radius:0 0 4px 4px; padding:14px 6px; font-weight:600; }
.fo1-fc .pop.off{ opacity:.12; transform:none; }
@media (max-width:480px){
  .fo1-fc-top{ grid-template-columns:auto auto minmax(0, 1fr); align-items:start; }
  .fo1-fc-col{ grid-template-columns:none; grid-auto-rows:36px; gap:4px; }
  .fo1-fc-users, .fo1-fc-arrows{ padding-top:7.5px; }
  .fo1-fc-u{ height:36px; padding:0 10px; white-space:nowrap; }
  .fo1-fc-ar{ height:36px; width:28px; } .fo1-fc-ar .v{ display:none; } .fo1-fc-ar .h{ display:inline; }
  .fo1-fc-n{ min-height:0; height:36px; }
  .fo1-fc-os{ width:84%; } .fo1-fc-hw{ width:58%; }
}
/* chain of cards */
.fo1-chain{ display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:8px; max-width:600px; margin:0 auto; }
.fo1-cd{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:10px 8px; text-align:center; font-size:.9rem; line-height:1.35; color:var(--ink); transition:opacity .45s, box-shadow .45s, background .45s; }
.fo1-cd .t{ display:block; font-weight:700; margin-bottom:4px; }
.fo1-cd .s{ display:block; font-size:.84rem; color:var(--graphite); }
.fo1-cd.dim{ opacity:.3; } .fo1-cd.on{ box-shadow:0 0 0 2px var(--k-os); background:color-mix(in srgb, var(--k-os) 12%, var(--paper)); }
.fo1-run{ display:inline-block; margin-top:6px; padding:2px 8px; border-radius:99px; font-size:.82rem; font-weight:700; color:var(--ok); border:1px solid var(--ok); }
.fo1-run.go{ animation:fo1pulse 1.6s ease-in-out infinite; }
@keyframes fo1pulse{ 50%{ opacity:.45; } }
@media (max-width:560px){ .fo1-chain{ grid-template-columns:repeat(2, minmax(0, 1fr)); } }
/* system organization */
.fo1-org svg{ max-width:380px !important; }
.fo1-org .bx{ fill:var(--paper); stroke:var(--graphite); stroke-width:1.5; transition:stroke .3s, fill .3s; }
.fo1-org .bx.on{ stroke:var(--k-os); stroke-width:3; fill:color-mix(in srgb, var(--k-os) 14%, var(--paper)); }
.fo1-org .mem{ fill:color-mix(in srgb, var(--k-os) 10%, var(--paper)); }
.fo1-org .dv{ fill:var(--paper-2); stroke:var(--faint); stroke-width:1.5; }
.fo1-org .ln{ stroke:var(--graphite); stroke-width:2; fill:none; }
.fo1-org .hot{ stroke:var(--k-os); stroke-width:5; fill:none; stroke-linecap:round; }
.fo1-stat{ text-align:center; font-size:.92rem; color:var(--ink); margin:8px 0 0; min-height:2.6em; }
/* interrupt board */
.fo1-ib{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; max-width:560px; margin:0 auto; }
.fo1-ib .cd{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.88rem; line-height:1.4; color:var(--ink); transition:opacity .45s, box-shadow .45s; position:relative; min-width:0; }
.fo1-ib .cd > .t{ display:block; font-weight:700; margin-bottom:4px; }
.fo1-ib .cd.dim{ opacity:.3; } .fo1-ib .cd.on{ box-shadow:0 0 0 2px var(--k-os); }
.fo1-cells{ display:grid; grid-template-columns:repeat(4, 1fr); gap:3px; margin-top:4px; }
.fo1-cells i{ display:block; height:16px; border-radius:3px; border:1px solid var(--line); background:var(--paper-2); transition:background .4s; }
.fo1-cells i.f{ background:color-mix(in srgb, var(--k-os) 45%, var(--paper)); }
.fo1-reg{ display:flex; flex-wrap:wrap; gap:4px; margin-top:4px; }
.fo1-reg span{ font:600 .8rem/1.2 var(--mono); border:1px solid var(--line); border-radius:4px; padding:2px 6px; background:var(--paper-2); }
.fo1-flag{ position:absolute; top:6px; right:8px; font-size:.74rem; font-weight:800; letter-spacing:.04em; color:#fff; background:var(--pen); border-radius:99px; padding:2px 8px; }
.fo1-vec{ display:grid; gap:3px; margin-top:4px; }
.fo1-vec span{ font-size:.8rem; border:1px solid var(--line); border-radius:4px; padding:2px 6px; background:var(--paper-2); transition:background .4s, border-color .4s; }
.fo1-vec span.hit{ border-color:var(--k-os); background:color-mix(in srgb, var(--k-os) 22%, var(--paper)); font-weight:600; }
.fo1-wide{ grid-column:1 / -1; text-align:center; }
@media (max-width:480px){ .fo1-ib{ grid-template-columns:minmax(0, 1fr); } }
/* I/O structure */
.fo1-io{ max-width:560px; margin:0 auto; color:var(--ink); }
.fo1-lanes{ display:grid; grid-template-columns:auto minmax(0, 1fr); gap:6px 10px; align-items:center; font-size:.9rem; margin-bottom:10px; }
.fo1-lanes > b{ font-size:.86rem; }
.fo1-pill{ display:inline-block; padding:3px 10px; border-radius:99px; border:1px solid var(--line); background:var(--paper); font-size:.86rem; line-height:1.3; }
.fo1-pill.run{ border-color:var(--ok); color:var(--ok); font-weight:700; }
.fo1-pill.wait{ border-color:var(--pen); color:var(--pen); font-weight:700; }
.fo1-devs{ display:grid; gap:6px; }
.fo1-dev{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; }
.fo1-dev > b{ min-width:62px; font-size:.9rem; }
.fo1-dev .fig-btn{ font-size:.82rem; padding:3px 9px; min-height:30px; }
.fo1-tbl{ margin-top:10px; overflow:hidden; font-size:.86rem; }
.fo1-tbl table{ border-collapse:collapse; width:100%; font-size:inherit; }
.fo1-tbl th, .fo1-tbl td{ border:1px solid var(--line); padding:4px 6px; text-align:left; white-space:nowrap; }
.fo1-tbl th{ background:var(--paper-2); font-weight:700; }
.fo1-tbl caption{ font-size:.98em; color:var(--graphite); text-align:left; padding-bottom:4px; }
.fo1-tbl tr.ch td{ background:color-mix(in srgb, var(--k-os) 16%, var(--paper)); }
/* units */
.fo1-un{ max-width:560px; margin:0 auto; color:var(--ink); }
.fo1-word{ display:grid; grid-template-columns:repeat(auto-fit, minmax(112px, 1fr)); gap:6px; }
.fo1-byte{ border:1px solid var(--line); border-radius:6px; padding:3px; background:var(--paper); transition:box-shadow .3s; }
.fo1-byte.on{ box-shadow:0 0 0 2px var(--k-os); }
.fo1-byte > span{ display:block; font-size:.78rem; color:var(--graphite); text-align:center; }
.fo1-bits{ display:grid; grid-template-columns:repeat(8, minmax(0, 1fr)); gap:2px; }
.fo1-bits button{ font:600 .78rem/1 var(--mono); height:24px; padding:0; min-width:0; border:1px solid var(--line); border-radius:3px; background:var(--paper-2); color:var(--ink); cursor:pointer; }
.fo1-bits button.one{ background:color-mix(in srgb, var(--k-os) 40%, var(--paper)); }
.fo1-bits button.on{ outline:2px solid var(--pen); outline-offset:1px; }
.fo1-wl{ text-align:center; font-size:.86rem; margin:6px 0 0; color:var(--graphite); }
.fo1-cv{ margin-top:12px; border-top:1px dashed var(--line); padding-top:10px; }
.fo1-in{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; align-items:center; }
.fo1-in input{ font:inherit; font-size:.95rem; width:5.5em; padding:4px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); }
.fo1-in input:focus{ outline:2px solid var(--k-os); outline-offset:1px; }
.fo1-res{ margin-top:8px; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.9rem; line-height:1.55; overflow-wrap:anywhere; }
.fo1-res .n{ font-family:var(--mono); font-weight:700; color:var(--k-os); }
/* hierarchy */
.fo1-hi svg{ max-width:420px !important; }
.fo1-hi .lv{ cursor:pointer; transition:opacity .5s; }
.fo1-hi .lv.off{ opacity:.14; }
.fo1-hi .fr{ fill:color-mix(in srgb, var(--k-os) 14%, var(--paper)); stroke:var(--graphite); stroke-width:1.2; }
.fo1-hi .tp{ fill:color-mix(in srgb, var(--k-os) 30%, var(--paper)); stroke:var(--graphite); stroke-width:1.2; }
.fo1-hi .on .fr{ fill:color-mix(in srgb, var(--k-os) 34%, var(--paper)); stroke:var(--k-os); stroke-width:2.5; }
.fo1-hi .aw{ stroke:var(--k-os); stroke-width:2.5; fill:none; }
.fo1-axis{ display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px 12px; font-size:.86rem; color:var(--graphite); max-width:420px; margin:6px auto 0; }
/* caching */
.fo1-ca{ max-width:560px; margin:0 auto; color:var(--ink); }
.fo1-st{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px; }
.fo1-st > b{ display:block; font-size:.88rem; margin-bottom:6px; }
.fo1-st > b small{ font-weight:500; color:var(--graphite); }
.fo1-slots{ display:grid; gap:5px; }
.fo1-slots button{ font:700 .95rem/1 var(--mono); height:38px; min-width:0; border:1px solid var(--line); border-radius:6px; background:var(--paper-2); color:var(--ink); cursor:pointer; transition:background .35s, box-shadow .35s; }
.fo1-slots button.full{ background:color-mix(in srgb, var(--k-os) 22%, var(--paper)); }
.fo1-slots button.hit{ box-shadow:0 0 0 3px var(--ok); }
.fo1-slots button.new{ box-shadow:0 0 0 3px var(--k-os); }
.fo1-slots button.pick{ box-shadow:0 0 0 2px var(--pen); }
.fo1-slots button:disabled{ cursor:default; }
.fo1-cpy{ text-align:center; font-size:1.2rem; color:var(--k-os); margin:4px 0; font-weight:700; }
.fo1-score{ display:flex; gap:14px; justify-content:center; font-size:.9rem; margin-top:8px; }
.fo1-score b{ font-family:var(--mono); }
@media (prefers-reduced-motion: reduce){ .fo1-run.go{ animation:none; } .fo1-cd, .fo1-ly, .fo1-ib .cd, .fo1-hi .lv, .fo1-slots button{ transition:none; } }
`;
  if (!document.getElementById('fo1-css')) { const s = document.createElement('style'); s.id = 'fo1-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── L1 slides 3–5: Four Components of a Computer System ── */
  function FourComponents({ ar }) {
    const steps = [
      { en: 'A computer system can be divided into <b>four components</b>. At the bottom: the <b>computer hardware</b>, which provides the basic computing resources (CPU, memory, I/O devices).', ar: 'الـ computer system ممكن يتقسم لـ <b>4 components</b>. تحت خالص: الـ <b>computer hardware</b>، وده اللي بيوفر الـ resources الأساسية (CPU و memory و I/O devices).' },
      { en: 'On the hardware sits the <b>operating system</b>: it controls and coordinates use of the hardware among various applications and users.', ar: 'فوق الـ hardware فيه الـ <b>operating system</b>: بيتحكم وبينسّق استخدام الـ hardware بين الـ applications والـ users المختلفين.' },
      { en: '<b>System and application programs</b> (compiler, assembler, text editor, …, database system) define the ways in which the system resources are used to solve the computing problems of the users.', ar: 'الـ <b>system والـ application programs</b> (compiler و assembler و text editor و … و database system) بيحددوا إزاي الـ resources بتتستخدم عشان تحل مشاكل الـ users.' },
      { en: '<b>Users</b> 1 … n at the top (people, machines, other computers). Each user works with a program: the arrows go both ways.', ar: 'الـ <b>users</b> من 1 لـ n فوق خالص (ناس، أجهزة، كمبيوترات تانية). كل user بيتعامل مع program: الأسهم رايحة جاية.' },
      { en: 'So the OS is a program that acts as an <b>intermediary</b> between the user of a computer and the computer hardware.', ar: 'يبقى الـ OS برنامج بيقف <b>وسيط</b> بين الـ user بتاع الكمبيوتر وبين الـ computer hardware.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3200);
    const users = ['user 1', 'user 2', 'user 3', '…', 'user n'], progs = ['compiler', 'assembler', 'text editor', '…', 'database system'];
    const on = k => (i === k || (i === 4 && k === 1)) ? ' on' : '';
    return html`<figure className="fig fo1"><div className="fig-stage"><div className="fo1-fc">
      <div className="fo1-fc-top">
        <div className=${'fo1-fc-col fo1-fc-users ' + pop(i >= 3)}>${users.map((u, k) => u === '…'
          ? html`<span key=${k} className="fo1-fc-u dots" aria-hidden="true">…</span>`
          : html`<button key=${k} className=${'fo1-fc-u' + on(3)} onClick=${() => ctl.go(3)}>${u === 'user n' ? html`<span>user <i>n</i></span>` : u}</button>`)}</div>
        <div className=${'fo1-fc-col fo1-fc-arrows ' + pop(i >= 3)} aria-hidden="true">${users.map((u, k) => html`<span key=${k} className="fo1-fc-ar">${u === '…' ? '' : html`<span className="v">↕</span><span className="h">↔</span>`}</span>`)}</div>
        <button className=${'fo1-ly ' + pop(i >= 2) + on(2)} onClick=${() => ctl.go(2)}>
          <span className="fo1-fc-col">${progs.map((p, k) => html`<span key=${k} className=${'fo1-fc-n' + (p === '…' ? ' dots' : '')}>${p}</span>`)}</span>
          <span className="fo1-fc-lbl">system and application programs</span></button>
      </div>
      <button className=${'fo1-ly fo1-fc-os ' + pop(i >= 1) + on(1)} onClick=${() => ctl.go(1)}>operating system</button>
      <button className=${'fo1-ly fo1-fc-hw ' + pop(true) + on(0)} onClick=${() => ctl.go(0)}>computer hardware</button>
    </div></div>
    <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slides 8–9: Computer Startup ── */
  function Startup({ ar }) {
    const steps = [
      { en: '<b>Power-up or reboot.</b>', ar: '<b>الجهاز بيشتغل أو بيعمل reboot.</b>' },
      { en: 'The <b>bootstrap program</b> is loaded at power-up or reboot. It is typically stored in <b>ROM or EPROM</b>, generally known as <b>firmware</b>.', ar: 'الـ <b>bootstrap program</b> بيتحمّل أول ما الجهاز يشتغل أو يعمل reboot. غالبًا متخزن في <b>ROM أو EPROM</b>، واسمها <b>firmware</b>.' },
      { en: 'The bootstrap program <b>initializes all aspects of the system</b>.', ar: 'الـ bootstrap program بيعمل <b>initialize لكل حاجة في الـ system</b>.' },
      { en: 'It <b>loads the operating system kernel</b> and starts its execution.', ar: 'بيـ<b>load الـ kernel بتاع الـ OS</b> ويبدأ تشغيله.' },
      { en: 'The <b>kernel</b> is "the one program running at all times on the computer". Everything else is either a <b>system program</b> (ships with the OS) or an <b>application program</b>.', ar: 'الـ <b>kernel</b> هو "البرنامج الوحيد اللي شغال طول الوقت على الكمبيوتر". أي حاجة تانية يا إما <b>system program</b> (جاي مع الـ OS) يا إما <b>application program</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const cls = k => 'fo1-cd' + (i < k ? ' dim' : '') + (i === k || (k === 3 && i === 4) ? ' on' : '');
    return html`<figure className="fig fo1"><div className="fig-stage"><div className="fo1-chain">
      <div className=${cls(0)}><span className="t">⏻ power-up</span><span className="s">or reboot</span></div>
      <div className=${cls(1)}><span className="t">bootstrap program</span><span className="s">in ROM or EPROM (firmware)</span></div>
      <div className=${cls(2)}><span className="t">initialize</span><span className="s">all aspects of the system</span></div>
      <div className=${cls(3)}><span className="t">OS kernel</span><span className="s">loaded, execution starts</span>
        ${i >= 4 && html`<span className=${'fo1-run' + (calm() ? '' : ' go')}>running at all times</span>`}</div>
    </div></div>
    <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 10: Computer-system operation (CPU, controllers, common bus, shared memory) ── */
  const ORG = [
    { id: 'cpu', l: ['CPU'], cy: 40, dv: [] },
    { id: 'disk', l: ['disk', 'controller'], cy: 118, dv: [['disks', 118]] },
    { id: 'usb', l: ['USB', 'controller'], cy: 222, dv: [['mouse', 184], ['keyboard', 222], ['printer', 260]] },
    { id: 'gfx', l: ['graphics', 'adapter'], cy: 318, dv: [['monitor', 318]] }
  ];
  const ORGN = { cpu: 'the CPU', disk: 'the disk controller', usb: 'the USB controller', gfx: 'the graphics adapter' };
  const ORGA = { cpu: 'الـ CPU', disk: 'الـ disk controller', usb: 'الـ USB controller', gfx: 'الـ graphics adapter' };
  function SysOrg({ ar }) {
    const steps = [
      { en: 'Computer-system operation: one or more <b>CPUs</b> and <b>device controllers</b> connect through a <b>common bus</b>…', ar: 'تشغيل الـ computer system: واحد أو أكتر من الـ <b>CPUs</b> والـ <b>device controllers</b> متوصلين بـ <b>bus مشترك</b>…' },
      { en: '…providing access to <b>shared memory</b>.', ar: '…بيدّيهم access على <b>memory مشتركة (shared)</b>.' },
      { en: 'Each controller has its devices: the disk controller (disks), the USB controller (mouse, keyboard, printer), the graphics adapter (monitor).', ar: 'كل controller ليه الأجهزة بتاعته: الـ disk controller (الـ disks)، والـ USB controller (الـ mouse والـ keyboard والـ printer)، والـ graphics adapter (الـ monitor).' },
      { en: '<b>Concurrent execution</b> of CPUs and devices <b>competing for memory cycles</b>: they all run at once and take turns on the bus to memory.', ar: '<b>تنفيذ متزامن (concurrent)</b> للـ CPUs والأجهزة وهما <b>بيتنافسوا على الـ memory cycles</b>: كلهم شغالين في نفس الوقت وبياخدوا دور على الـ bus للـ memory.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const [t, setT] = useState(0);
    useEffect(() => { if (i !== 3 || calm()) return; const id = setInterval(() => setT(x => x + 1), 1100); return () => clearInterval(id); }, [i]);
    const cur = i === 3 && !calm() ? ORG[t % 4].id : null;
    const BX = 46, BW = 128, BH = 52, BUS = 20, MY = 364;
    return html`<figure className="fig fo1"><div className="fig-stage fo1-org">
      <svg viewBox="0 0 320 416" role="img" aria-label="CPU, disk controller with disks, USB controller with mouse, keyboard and printer, graphics adapter with monitor, all on a common bus to memory">
        <path d=${`M${BUS} ${ORG[0].cy} V${MY}`} className="ln" />
        ${ORG.map(o => html`<g key=${o.id}>
          <path d=${`M${BX} ${o.cy} H${BUS}`} className="ln" />
          ${cur === o.id && html`<path d=${`M${BX} ${o.cy} H${BUS} V${MY}`} className="hot" />`}
          <rect x=${BX} y=${o.cy - BH / 2} width=${BW} height=${BH} rx="3" className=${'bx' + (cur === o.id || (i === 0 && !calm()) ? ' on' : '')} />
          ${o.l.map((w, k) => html`<text key=${k} x=${BX + BW / 2} y=${o.cy + (o.l.length === 1 ? 6 : k === 0 ? -5 : 15)} textAnchor="middle" fontSize="16">${w}</text>`)}
          ${o.dv.map(([d, y]) => html`<g key=${d} className=${pop(i >= 2)}>
            <path d=${`M${BX + BW} ${o.cy} L204 ${y}`} className="ln" />
            <rect x="204" y=${y - 15} width="112" height="30" rx="8" className="dv" />
            <text x="260" y=${y + 6} textAnchor="middle" fontSize="16">${d}</text></g>`)}
        </g>`)}
        <rect x="2" y=${MY} width="150" height="48" rx="3" className=${'bx mem' + (i === 1 || cur ? ' on' : '')} />
        <text x="77" y=${MY + 30} textAnchor="middle" fontSize="17" fontWeight="600">memory</text>
      </svg>
      ${i === 3 && html`<p className="fo1-stat" aria-live="polite">${cur
        ? html`Memory cycle: <span className="fo1-k">${ORGN[cur]}</span>. The others wait their turn.${ar ? html`<span dir="rtl" className="fo1-muted" style=${{ display: 'block' }}>الـ memory cycle دلوقتي مع ${ORGA[cur]}، والباقيين مستنيين دورهم.</span>` : ''}`
        : 'CPU, disk controller, USB controller and graphics adapter all compete for memory cycles.'}</p>`}
    </div>
    <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slides 11–13: device controller, interrupt, interrupt handling ── */
  const IKIND = [
    ['io', 'Device finished I/O', 'device'],
    ['err', 'Program error (trap)', 'error'],
    ['req', 'User request (trap)', 'request']
  ];
  function Interrupts({ ar }) {
    const [kind, setKind] = useState('io'), [how, setHow] = useState('vec');
    const head = html`<div className="fo1-row" role="group" aria-label="What interrupts the CPU"><span>Event:</span>${IKIND.map(([k, l]) => html`<button key=${k} className=${'fig-btn' + (kind === k ? ' fo1-sel' : '')} onClick=${() => setKind(k)}>${l}</button>`)}</div>
      <div className="fo1-row" role="group" aria-label="How the type is found"><span>Type found by:</span>
        <button className=${'fig-btn' + (how === 'vec' ? ' fo1-sel' : '')} onClick=${() => setHow('vec')}>vectored interrupt system</button>
        <button className=${'fig-btn' + (how === 'poll' ? ' fo1-sel' : '')} onClick=${() => setHow('poll')}>polling</button></div>`;
    return html`<figure className="fig fo1"><${IntRun} key=${kind + how} kind=${kind} how=${how} ar=${ar} head=${head} /></figure>`;
  }
  function IntRun({ kind, how, ar, head }) {
    const io = kind === 'io';
    const first = io ? [
      { en: 'The CPU runs a user program while the <b>device controller</b> works: I/O devices and the CPU can execute <b>concurrently</b>. Each device controller is in charge of a particular device type and has a <b>local buffer</b>.', ar: 'الـ CPU بيشغّل user program والـ <b>device controller</b> شغال في نفس الوقت: الـ I/O devices والـ CPU بيشتغلوا <b>concurrently</b>. كل device controller مسؤول عن نوع أجهزة معيّن وليه <b>local buffer</b>.' },
      { en: 'I/O is from the <b>device</b> to the <b>local buffer</b> of its controller.', ar: 'الـ I/O بيبقى من الـ <b>device</b> للـ <b>local buffer</b> بتاع الـ controller بتاعه.' },
      { en: 'Done: the device controller informs the CPU that it has finished its operation by causing an <b>interrupt</b>.', ar: 'خلص: الـ device controller بيبلّغ الـ CPU إنه خلّص شغله عن طريق إنه يعمل <b>interrupt</b>.' }
    ] : [
      { en: 'The CPU runs a user program.', ar: 'الـ CPU بيشغّل user program.' },
      kind === 'err'
        ? { en: 'The program causes an <b>error</b> (for example, division by zero).', ar: 'البرنامج عمل <b>error</b> (زي القسمة على صفر).' }
        : { en: 'The program makes a <b>user request</b> for an OS service (a system call).', ar: 'البرنامج عمل <b>user request</b> لخدمة من الـ OS (system call).' },
      { en: 'That is a <b>trap</b> (or exception): a <b>software-generated interrupt</b> caused either by an error or a user request.', ar: 'ده اسمه <b>trap</b> (أو exception): <b>interrupt جاي من الـ software</b> سببه يا إما error يا إما user request.' }
    ];
    const rest = [
      { en: 'The OS <b>preserves the state of the CPU</b> by storing the <b>registers</b> and the <b>program counter</b>: the interrupt architecture must save the address of the interrupted instruction.', ar: 'الـ OS بيـ<b>حافظ على حالة الـ CPU</b> بإنه يخزّن الـ <b>registers</b> والـ <b>program counter</b>: الـ interrupt architecture لازم تحفظ عنوان الـ instruction اللي اتقطعت.' },
      how === 'vec'
        ? { en: 'Which type of interrupt has occurred? A <b>vectored interrupt system</b>: the <b>interrupt vector</b> contains the addresses of all the service routines.', ar: 'نوع الـ interrupt إيه؟ <b>vectored interrupt system</b>: الـ <b>interrupt vector</b> فيه عناوين كل الـ service routines.' }
        : { en: 'Which type of interrupt has occurred? Here the OS finds it by <b>polling</b>.', ar: 'نوع الـ interrupt إيه؟ هنا الـ OS بيعرفه بالـ <b>polling</b>.' },
      { en: 'Control transfers to the <b>interrupt service routine</b>' + (how === 'vec' ? ' through the interrupt vector' : '') + '. <b>Separate segments of code</b> determine what action should be taken for each type of interrupt.', ar: 'التحكم بيتنقل للـ <b>interrupt service routine</b>' + (how === 'vec' ? ' عن طريق الـ interrupt vector' : '') + '. فيه <b>أجزاء code منفصلة</b> بتحدد المفروض يحصل إيه لكل نوع interrupt.' }
    ];
    const last = io ? [
      { en: 'For this device: the CPU moves data from the controller\'s local buffer to <b>main memory</b>.', ar: 'للجهاز ده: الـ CPU بينقل الـ data من الـ local buffer بتاع الـ controller للـ <b>main memory</b>.' },
      { en: 'An operating system is <b>interrupt driven</b>.', ar: 'الـ operating system شغال بالـ <b>interrupts (interrupt driven)</b>.' }
    ] : [
      { en: 'An operating system is <b>interrupt driven</b>.', ar: 'الـ operating system شغال بالـ <b>interrupts (interrupt driven)</b>.' }
    ];
    const steps = first.concat(rest, last);
    const [i, ctl] = useSteps(steps.length, 3000);
    const S = { save: 3, type: 4, isr: 5, mem: 6 };
    const st = (k, also) => 'cd' + (i === k || also ? ' on' : i < k ? ' dim' : '');
    const row = kind === 'io' ? 0 : kind === 'err' ? 1 : 2;
    return html`<${React.Fragment}><div className="fig-stage">${head}<div className="fo1-ib">
      <div className=${st(0, i === 2)}><span className="t">CPU</span>${i < 3 ? 'running the user program' : i < 6 ? 'handling the interrupt' : 'interrupt handled'}
        <div className="fo1-reg"><span>registers</span><span>PC</span></div>
        ${i === 2 && html`<span className="fo1-flag">${io ? 'INTERRUPT' : 'TRAP'}</span>`}</div>
      ${io
        ? html`<div className=${st(1)}><span className="t">Device controller</span>local buffer
          <div className="fo1-cells">${[0, 1, 2, 3].map(k => html`<i key=${k} className=${i >= 1 && i < 6 ? 'f' : ''}></i>`)}</div></div>`
        : html`<div className=${st(1)}><span className="t">User program</span>${kind === 'err' ? 'error (e.g. division by zero)' : 'request for an OS service (system call)'}</div>`}
      <div className=${st(S.save)}><span className="t">Saved CPU state</span>${i >= 3 ? html`<div className="fo1-reg"><span>registers</span><span>PC = address of the interrupted instruction</span></div>` : 'empty'}</div>
      <div className=${st(S.type)}><span className="t">${how === 'vec' ? 'Interrupt vector' : 'Polling'}</span>
        ${how === 'vec'
          ? html`<div className="fo1-vec">${['address of the routine for: device', 'address of the routine for: error', 'address of the routine for: request', '…'].map((v, k) => html`<span key=${k} className=${i >= 4 && k === row ? 'hit' : ''}>${v}</span>`)}</div>`
          : html`<div>Which type has occurred? ${i >= 4 ? html`<b className="fo1-k">${IKIND[row][2]}</b>` : '?'}</div>`}</div>
      <div className=${st(S.isr) + ' fo1-wide'}><span className="t">Interrupt service routine</span>code segment for this type: <b>${IKIND[row][2]}</b></div>
      ${io && html`<div className=${st(S.mem) + ' fo1-wide'}><span className="t">Main memory</span>
        <div className="fo1-cells" style=${{ maxWidth: '200px', margin: '4px auto 0' }}>${[0, 1, 2, 3].map(k => html`<i key=${k} className=${i >= 6 ? 'f' : ''}></i>`)}</div></div>`}
    </div></div>
    <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /><//>`;
  }

  /* ── L1 slide 14: I/O Structure (wait for completion vs return without waiting) ── */
  const IODEV = ['disk', 'printer'];
  function IoStructure({ ar }) {
    const [mode, setMode] = useState('sync'), [wh, setWh] = useState('instr');
    const [busy, setBusy] = useState({}), [intr, setIntr] = useState({}), [waiting, setWaiting] = useState(false), [ch, setCh] = useState(null);
    const intro = { en: '<b>Try it:</b> start I/O on a device, then let the device finish. Switch between the two ways control can return to the user program.', ar: '<b>جرّب:</b> ابدأ I/O على جهاز، وبعدين خلّي الجهاز يخلص. بدّل بين الطريقتين اللي التحكم ممكن يرجع بيهم للـ user program.' };
    const [msg, setMsg] = useState(intro);
    const reset = m => { setMode(m); setBusy({}); setIntr({}); setWaiting(false); setCh(null); setMsg(intro); };
    const anyBusy = Object.values(busy).some(Boolean);
    const start = d => {
      if (mode === 'sync') {
        if (anyBusy) { setMsg({ en: 'Refused: <b>at most one I/O request is outstanding at a time</b>, no simultaneous I/O processing.', ar: 'مرفوض: <b>طلب I/O واحد بس ممكن يبقى مستني في المرة</b>، مفيش I/O processing متزامن.' }); return; }
        setBusy({ [d]: true }); setWaiting(true);
        setMsg(wh === 'instr'
          ? { en: 'After I/O starts, control returns to the user program <b>only upon I/O completion</b>. The <b>wait instruction idles the CPU</b> until the next interrupt.', ar: 'بعد ما الـ I/O يبدأ، التحكم بيرجع للـ user program <b>بس لما الـ I/O يخلص</b>. الـ <b>wait instruction بتخلّي الـ CPU idle</b> لحد الـ interrupt الجاي.' }
          : { en: 'After I/O starts, control returns to the user program <b>only upon I/O completion</b>. Here the CPU sits in a <b>wait loop</b> (contention for memory access).', ar: 'بعد ما الـ I/O يبدأ، التحكم بيرجع للـ user program <b>بس لما الـ I/O يخلص</b>. هنا الـ CPU قاعد في <b>wait loop</b> (contention على الـ memory access).' });
      } else {
        setBusy(b => Object.assign({}, b, { [d]: true })); setIntr(x => Object.assign({}, x, { [d]: false })); setCh(d);
        setMsg({ en: 'After I/O starts, control returns to the user program <b>without waiting</b> for I/O completion. The <b>device-status table</b> entry for the ' + d + ' shows its state.', ar: 'بعد ما الـ I/O يبدأ، التحكم بيرجع للـ user program <b>من غير ما يستنى</b> الـ I/O يخلص. الـ entry بتاع الـ ' + d + ' في الـ <b>device-status table</b> بيبيّن الـ state بتاعه.' });
      }
    };
    const finish = d => {
      const nb = Object.assign({}, busy, { [d]: false }), still = Object.values(nb).some(Boolean);
      setBusy(nb);
      if (mode === 'sync') { setWaiting(false); setMsg({ en: 'The ' + d + '\'s interrupt: I/O completed, so control returns to the user program.', ar: 'الـ interrupt بتاع الـ ' + d + ': الـ I/O خلص، فالتحكم رجع للـ user program.' }); return; }
      setIntr(x => Object.assign({}, x, { [d]: true })); setCh(d); if (!still) setWaiting(false);
      setMsg({ en: 'Interrupt from the ' + d + ': the OS <b>indexes into the I/O device table</b> to determine the device status and <b>modifies the table entry to include the interrupt</b>.' + (waiting && !still ? ' The I/O the user waited for is complete.' : ''), ar: 'interrupt من الـ ' + d + ': الـ OS <b>بيدوّر في الـ I/O device table</b> عشان يعرف حالة الجهاز و<b>يعدّل الـ entry عشان يسجّل الـ interrupt</b>.' + (waiting && !still ? ' الـ I/O اللي الـ user كان مستنيه خلص.' : '') });
    };
    const sysWait = () => { setWaiting(true); setMsg({ en: '<b>System call</b>: a request to the OS to allow the user to <b>wait for I/O completion</b>.', ar: '<b>System call</b>: طلب من الـ OS إنه يسمح للـ user <b>يستنى لحد ما الـ I/O يخلص</b>.' }); };
    const cpu = mode === 'sync' && waiting ? (wh === 'instr' ? 'idle (wait instruction)' : 'wait loop') : waiting ? 'running other work' : 'running the user program';
    const tref = useFit(JSON.stringify([busy, intr, mode]));
    return html`<figure className="fig fo1"><div className="fig-stage"><div className="fo1-io">
      <div className="fo1-row" role="group" aria-label="When control returns">
        <button className=${'fig-btn' + (mode === 'sync' ? ' fo1-sel' : '')} onClick=${() => reset('sync')}>Return only upon I/O completion</button>
        <button className=${'fig-btn' + (mode === 'async' ? ' fo1-sel' : '')} onClick=${() => reset('async')}>Return without waiting</button></div>
      ${mode === 'sync' && html`<div className="fo1-row" role="group" aria-label="How the CPU waits"><span>CPU waits with:</span>
        <button className=${'fig-btn' + (wh === 'instr' ? ' fo1-sel' : '')} onClick=${() => setWh('instr')} disabled=${anyBusy}>wait instruction</button>
        <button className=${'fig-btn' + (wh === 'loop' ? ' fo1-sel' : '')} onClick=${() => setWh('loop')} disabled=${anyBusy}>wait loop</button></div>`}
      <div className="fo1-lanes">
        <b>User program</b><span><span className=${'fo1-pill ' + (waiting ? 'wait' : 'run')}>${waiting ? 'waiting for I/O completion' : 'running'}</span></span>
        <b>CPU</b><span><span className="fo1-pill">${cpu}</span></span></div>
      <div className="fo1-devs">${IODEV.map(d => html`<div key=${d} className="fo1-dev"><b>${d}</b>
        <button className="fig-btn" onClick=${() => start(d)} disabled=${!!busy[d]}>Start I/O</button>
        <button className="fig-btn" onClick=${() => finish(d)} disabled=${!busy[d]}>I/O done → interrupt</button></div>`)}</div>
      ${mode === 'async' && html`<div className="fo1-row" style=${{ marginTop: '10px' }}><button className="fig-btn" onClick=${sysWait} disabled=${!anyBusy || waiting}>System call: wait for I/O completion</button></div>
        <div className="fo1-tbl" ref=${tref}><table><caption>Device-status table: one entry per I/O device</caption>
          <thead><tr><th>type</th><th>address</th><th>state</th><th>interrupt</th></tr></thead>
          <tbody>${IODEV.map(d => html`<tr key=${d} className=${ch === d ? 'ch' : ''}><td>${d}</td><td className="fo1-muted">(address)</td><td>${busy[d] ? 'busy' : 'idle'}</td><td>${intr[d] ? 'included' : ''}</td></tr>`)}</tbody></table></div>`}
    </div></div>
    <${Cap} en=${msg.en} ar=${msg.ar} showAr=${ar} />
    <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => reset(mode)}>↻ Start over</button></div></figure>`;
  }

  /* ── L1 slide 15: Storage Definitions and Notation Review ── */
  const UNITS = [['KB', 'kilobyte'], ['MB', 'megabyte'], ['GB', 'gigabyte'], ['TB', 'terabyte'], ['PB', 'petabyte']];
  const SUP = ['', '', '²', '³', '⁴', '⁵'];
  const grp = b => b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  function Units({ ar }) {
    const [bits, setBits] = useState(() => Array(64).fill(0)), [lvl, setLvl] = useState('word'), [hb, setHb] = useState(0);
    const [n, setN] = useState('1'), [u, setU] = useState(2);
    const txt = {
      bit: { en: 'The basic unit of computer storage is the <b>bit</b>. A bit can contain one of two values, <b>0 and 1</b>. All other storage is based on collections of bits. Click any bit to flip it.', ar: 'الوحدة الأساسية للتخزين هي الـ <b>bit</b>. الـ bit ممكن يشيل قيمة من اتنين، <b>0 أو 1</b>. أي تخزين تاني مبني على مجموعات bits. دوس على أي bit عشان تقلبه.' },
      byte: { en: 'A <b>byte</b> is <b>8 bits</b>, and on most computers it is the smallest convenient chunk of storage: most computers don\'t have an instruction to move a bit but do have one to move a byte.', ar: 'الـ <b>byte</b> = <b>8 bits</b>، وفي أغلب الكمبيوترات هو أصغر حتة مريحة للتخزين: أغلب الكمبيوترات مفيهاش instruction تنقل bit لكن فيها واحدة تنقل byte.' },
      word: { en: 'A <b>word</b> is a computer architecture\'s native unit of data, made up of one or more bytes. With 64-bit registers and 64-bit memory addressing: <b>64-bit (8-byte) words</b>. A computer executes many operations in its native word size rather than a byte at a time.', ar: 'الـ <b>word</b> هي وحدة الـ data الأصلية للـ architecture، ومكونة من byte أو أكتر. مع 64-bit registers و 64-bit memory addressing: <b>words حجمها 64 bit (8 bytes)</b>. الكمبيوتر بينفّذ عمليات كتير بحجم الـ word بتاعه مش byte byte.' }
    };
    const v = Math.max(0, Math.min(999999, parseInt(n, 10) || 0)), bytes = BigInt(v) * (1024n ** BigInt(u + 1));
    const flip = k => { setBits(b => b.map((x, j) => j === k ? 1 - x : x)); setLvl('bit'); setHb(k); };
    const on = (byteIdx, k) => (lvl === 'bit' && hb === byteIdx * 8 + k);
    return html`<figure className="fig fo1"><div className="fig-stage"><div className="fo1-un">
      <div className="fo1-row" role="group" aria-label="Unit">${['bit', 'byte', 'word'].map(l => html`<button key=${l} className=${'fig-btn' + (lvl === l ? ' fo1-sel' : '')} onClick=${() => setLvl(l)}>${l}</button>`)}</div>
      <div className="fo1-word">${[0, 1, 2, 3, 4, 5, 6, 7].map(by => html`<div key=${by} className=${'fo1-byte' + (lvl === 'word' || (lvl === 'byte' && by === Math.floor(hb / 8)) ? ' on' : '')}>
        <span>byte ${by + 1}</span><div className="fo1-bits">${[0, 1, 2, 3, 4, 5, 6, 7].map(k => html`<button key=${k} className=${(bits[by * 8 + k] ? 'one' : '') + (on(by, k) ? ' on' : '')} onClick=${() => flip(by * 8 + k)} aria-label=${'bit ' + (by * 8 + k + 1) + ' is ' + bits[by * 8 + k]}>${bits[by * 8 + k]}</button>`)}</div></div>`)}</div>
      <p className="fo1-wl">${lvl === 'bit' ? '1 bit: 0 or 1' : lvl === 'byte' ? '1 byte = 8 bits' : '1 word = 64 bits = 8 bytes'}</p>
      <div className="fo1-cv"><div className="fo1-in">
        <input type="number" min="0" max="999999" value=${n} onInput=${e => setN(e.target.value)} aria-label="Amount" />
        <span role="group" aria-label="Unit" style=${{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>${UNITS.map(([s], k) => html`<button key=${s} className=${'fig-btn' + (u === k ? ' fo1-sel' : '')} onClick=${() => setU(k)}>${s}</button>`)}</span></div>
        <div className="fo1-res" aria-live="polite">
          <div>1 ${UNITS[u][1]} (${UNITS[u][0]}) = 1,024${SUP[u + 1]} bytes</div>
          <div>${v} ${UNITS[u][0]} = <span className="n">${grp(bytes)}</span> bytes</div>
          <div>= <span className="n">${grp(bytes * 8n)}</span> bits <span className="fo1-muted">(networking is measured in bits, because networks move data a bit at a time)</span></div>
          ${(u === 1 || u === 2) && html`<div className="fo1-muted">Manufacturers often round off: they say ${v} ${UNITS[u][0]} = ${grp(BigInt(v) * (u === 1 ? 1000000n : 1000000000n))} bytes (a ${UNITS[u][1]} is 1 ${u === 1 ? 'million' : 'billion'} bytes).</div>`}
        </div></div>
    </div></div>
    <${Cap} ...${txt[lvl]} showAr=${ar} /></figure>`;
  }

  /* ── L1 slides 16–18: Storage-Device Hierarchy ── */
  const LEV = [
    ['registers', { en: '<b>registers</b>: the top of the hierarchy (fastest, smallest, most expensive).', ar: 'الـ <b>registers</b>: أعلى الـ hierarchy (الأسرع والأصغر والأغلى).' }],
    ['cache', { en: '<b>cache</b>: faster storage, checked first to determine if the data is there.', ar: 'الـ <b>cache</b>: تخزين أسرع، بيتشيّك عليه الأول عشان نعرف الـ data موجودة فيه ولا لأ.' }],
    ['main memory', { en: '<b>main memory</b>: the only large storage media that the CPU can access directly; <b>random access</b>; typically <b>volatile</b>.', ar: 'الـ <b>main memory</b>: الوسيط الكبير الوحيد اللي الـ CPU يقدر يوصله مباشرة؛ <b>random access</b>؛ وغالبًا <b>volatile</b>.' }],
    ['solid-state disk', { en: '<b>solid-state disk</b>: faster than hard disks, <b>nonvolatile</b>; various technologies; becoming more popular.', ar: 'الـ <b>solid-state disk</b>: أسرع من الـ hard disks، و<b>nonvolatile</b>؛ فيه technologies مختلفة؛ وبقى منتشر أكتر.' }],
    ['hard disk', { en: '<b>hard disk</b>: rigid metal or glass platters covered with magnetic recording material; the surface is divided into <b>tracks</b>, subdivided into <b>sectors</b>; the <b>disk controller</b> determines the logical interaction between the device and the computer.', ar: 'الـ <b>hard disk</b>: أطباق (platters) معدن أو زجاج متغطية بمادة تسجيل مغناطيسي؛ السطح متقسم لـ <b>tracks</b> والـ tracks متقسمة لـ <b>sectors</b>؛ والـ <b>disk controller</b> بيحدد التعامل المنطقي بين الجهاز والكمبيوتر.' }],
    ['optical disk', { en: '<b>optical disk</b>: further down: slower, larger and cheaper.', ar: 'الـ <b>optical disk</b>: تحت أكتر: أبطأ وأكبر وأرخص.' }],
    ['magnetic tapes', { en: '<b>magnetic tapes</b>: the bottom of the hierarchy (slowest, largest, cheapest).', ar: 'الـ <b>magnetic tapes</b>: آخر الـ hierarchy من تحت (الأبطأ والأكبر والأرخص).' }]
  ];
  function Hierarchy({ ar }) {
    const steps = [{ en: 'Storage systems are organized in a <b>hierarchy</b> by <b>speed</b>, <b>cost</b> and <b>volatility</b>.', ar: 'أنظمة التخزين متنظمة في <b>hierarchy</b> حسب الـ <b>speed</b> والـ <b>cost</b> والـ <b>volatility</b>.' }]
      .concat(LEV.map(l => l[1]), [{ en: 'The arrows join each level to the next. <b>Caching</b> is copying data into a faster storage system, so <b>main memory can be viewed as a cache for secondary storage</b>. A <b>device driver</b> for each device controller manages I/O and provides a uniform interface between the controller and the kernel. Click a level to read it again.', ar: 'الأسهم بتربط كل مستوى باللي بعده. الـ <b>Caching</b> هو نسخ الـ data لتخزين أسرع، فالـ <b>main memory ممكن نعتبرها cache للـ secondary storage</b>. وفيه <b>device driver</b> لكل device controller بيدير الـ I/O وبيدّي interface موحّد بين الـ controller والـ kernel. دوس على أي مستوى عشان تقراه تاني.' }]);
    const [i, ctl] = useSteps(steps.length, 2600);
    const W = [124, 164, 204, 244, 284, 324, 360], H = 36, G = 20, D = 8, CX = 184;
    return html`<figure className="fig fo1"><div className="fig-stage fo1-hi">
      <svg viewBox="0 0 372 396" role="img" aria-label="Storage-device hierarchy: registers, cache, main memory, solid-state disk, hard disk, optical disk, magnetic tapes">
        <defs><marker id="fo1-hi-a" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--k-os)" /></marker></defs>
        ${LEV.map(([name], k) => { const w = W[k], x = CX - w / 2, y = 10 + k * (H + G); return html`<g key=${k} className=${'lv' + (i >= k + 1 ? '' : ' off') + (i === k + 1 ? ' on' : '')} onClick=${() => ctl.go(k + 1)} role="button" aria-label=${name}>
          <path d=${`M${x} ${y} L${x + D} ${y - D} L${x + w + D} ${y - D} L${x + w} ${y} Z`} className="tp" />
          <path d=${`M${x + w} ${y} L${x + w + D} ${y - D} L${x + w + D} ${y + H - D} L${x + w} ${y + H} Z`} className="tp" />
          <rect x=${x} y=${y} width=${w} height=${H} className="fr" />
          <text x=${CX} y=${y + 25} textAnchor="middle" fontSize="18">${name}</text>
          ${k > 0 && html`<g><path d=${`M${CX - 22} ${y - 2} V${y - G + 4}`} className="aw" markerEnd="url(#fo1-hi-a)" /><path d=${`M${CX + 22} ${y - G + 2} V${y - 4}`} className="aw" markerEnd="url(#fo1-hi-a)" /></g>`}
        </g>`; })}
      </svg>
      <div className="fo1-axis"><span>↑ faster, smaller, more expensive</span><span>↓ slower, larger, cheaper</span></div>
    </div>
    <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slides 17 and 19: Caching ── */
  const DATA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const PAIRS = [['cache', 'main memory'], ['main memory', 'secondary storage']];
  function Caching({ ar }) {
    const [pair, setPair] = useState(0), [size, setSize] = useState(3);
    const [slots, setSlots] = useState(() => Array(3).fill(null)), [mark, setMark] = useState(null), [pend, setPend] = useState(null), [hit, setHit] = useState(0), [miss, setMiss] = useState(0);
    const intro = { en: 'Caching is an important principle, performed at many levels in a computer (in hardware, operating system, software). <b>Try it:</b> click data in the slower storage to use it.', ar: 'الـ Caching مبدأ مهم بيحصل على مستويات كتير في الكمبيوتر (في الـ hardware والـ OS والـ software). <b>جرّب:</b> دوس على data في التخزين الأبطأ عشان تستخدمها.' };
    const [msg, setMsg] = useState(intro);
    const [fast, slow] = PAIRS[pair];
    const reset = (p, s) => { setPair(p); setSize(s); setSlots(Array(s).fill(null)); setMark(null); setPend(null); setHit(0); setMiss(0); setMsg(intro); };
    const use = x => {
      if (pend) { setMsg({ en: 'First choose which entry in the ' + fast + ' to replace for data ' + pend + '.', ar: 'الأول اختار أنهي entry في الـ ' + fast + ' هيتبدّل عشان data ' + pend + '.' }); return; }
      const at = slots.indexOf(x);
      if (at >= 0) { setHit(h => h + 1); setMark(['hit', at]); setMsg({ en: 'The faster storage (' + fast + ') is checked first: data ' + x + ' <b>is there</b>, so it is <b>used directly from the cache (fast)</b>.', ar: 'التخزين الأسرع (' + fast + ') بيتشيّك عليه الأول: data ' + x + ' <b>موجودة</b>، فبتتستخدم <b>من الـ cache على طول (سريع)</b>.' }); return; }
      setMiss(m => m + 1);
      const free = slots.indexOf(null);
      if (free >= 0) { setSlots(s => s.map((v, j) => j === free ? x : v)); setMark(['new', free]); setMsg({ en: 'Checked the ' + fast + ' first: data ' + x + ' is <b>not there</b>, so it is <b>copied from ' + slow + ' to the cache and used there</b>.', ar: 'اتشيّك على الـ ' + fast + ' الأول: data ' + x + ' <b>مش موجودة</b>، فـ<b>بتتنسخ من الـ ' + slow + ' للـ cache وتتستخدم هناك</b>.' }); return; }
      setPend(x); setMark(null);
      setMsg({ en: 'Data ' + x + ' is not there, and the cache is full: the <b>cache is smaller than the storage being cached</b>. Click the entry to replace: that choice is the <b>replacement policy</b>.', ar: 'data ' + x + ' مش موجودة، والـ cache مليانة: الـ <b>cache أصغر من التخزين اللي بتعمله cache</b>. دوس على الـ entry اللي هيتبدّل: الاختيار ده هو الـ <b>replacement policy</b>.' });
    };
    const evict = j => {
      if (!pend) return;
      const old = slots[j];
      setSlots(s => s.map((v, k) => k === j ? pend : v)); setMark(['new', j]); setPend(null);
      setMsg({ en: 'Data ' + pend + ' replaced ' + old + ' and is used from the cache. Cache size and replacement policy: <b>cache management is an important design problem</b>.', ar: 'data ' + pend + ' خدت مكان ' + old + ' وبتتستخدم من الـ cache. حجم الـ cache والـ replacement policy: <b>إدارة الـ cache مشكلة design مهمة</b>.' });
    };
    return html`<figure className="fig fo1"><div className="fig-stage"><div className="fo1-ca">
      <div className="fo1-row" role="group" aria-label="Levels">${PAIRS.map((p, k) => html`<button key=${k} className=${'fig-btn' + (pair === k ? ' fo1-sel' : '')} onClick=${() => reset(k, size)}>${p[0]} ← ${p[1]}</button>`)}</div>
      <div className="fo1-row" role="group" aria-label="Cache size"><span>Cache size:</span>${[2, 3, 4].map(s => html`<button key=${s} className=${'fig-btn' + (size === s ? ' fo1-sel' : '')} onClick=${() => reset(pair, s)}>${s}</button>`)}</div>
      <div className="fo1-st"><b>${fast} <small>(faster, the cache: checked first)</small></b>
        <div className="fo1-slots" style=${{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>${slots.map((v, j) => html`<button key=${j + '-' + v} disabled=${!pend} onClick=${() => evict(j)} className=${(v ? 'full' : '') + (mark && mark[1] === j ? ' ' + mark[0] : '') + (pend ? ' pick' : '')} aria-label=${v ? 'cache entry ' + v : 'empty cache entry'}>${v || ''}</button>`)}</div></div>
      <div className="fo1-cpy" aria-hidden="true">↑</div>
      <div className="fo1-st"><b>${slow} <small>(slower, larger)</small></b>
        <div className="fo1-slots" style=${{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}>${DATA.map(x => html`<button key=${x} onClick=${() => use(x)} aria-label=${'use data ' + x}>${x}</button>`)}</div></div>
      <div className="fo1-score"><span>found in cache: <b>${hit}</b></span><span>copied to cache: <b>${miss}</b></span></div>
    </div></div>
    <${Cap} en=${msg.en} ar=${msg.ar} showAr=${ar} />
    <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => reset(pair, size)}>↻ Start over</button></div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'os-four-components': FourComponents,
    'os-startup': Startup,
    'os-sys-org': SysOrg,
    'os-interrupts': Interrupts,
    'os-io-structure': IoStructure,
    'os-units': Units,
    'os-storage-hierarchy': Hierarchy,
    'os-caching': Caching
  });
})();

/* ── part 2 ── */
// Operating Systems visuals, part 2: Lecture 1 (Introduction), slides 20, 22, 24 (with 23), 25, 26, 27, 33, 34.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.fo2{ --fig-k: var(--k-os); --fig-s: var(--s-os); }
.fo2 .fig-btn.solid{ background:var(--s-os); color:#fff; border-color:transparent; }
.fo2 .fig-btn.fo2-sel{ border-color:var(--k-os); box-shadow:0 0 0 1px var(--k-os); background:color-mix(in srgb, var(--k-os) 14%, var(--paper)); }
.fo2 .fig-btn:disabled{ opacity:.45; cursor:default; }
.fo2 .fig-stage svg{ max-width:420px; }
.fo2-k{ color:var(--k-os); font-weight:700; }
.fo2-muted{ color:var(--graphite); font-size:.85rem; text-align:center; margin:8px 0 0; }
.fo2-wrap{ max-width:520px; margin:0 auto; color:var(--ink); }
.fo2-pill{ display:inline-block; border-radius:99px; padding:2px 10px; font-size:.85rem; font-weight:600; border:1px solid var(--line); background:var(--paper); color:var(--ink); }
.fo2-pill.fo2-hot{ background:var(--s-os); color:#fff; border-color:transparent; }
/* DMA interrupts */
.fo2-blk{ display:grid; grid-template-columns:64px minmax(0, 1fr); gap:6px 8px; align-items:center; }
.fo2-blk > span{ font-size:.86rem; font-weight:600; }
.fo2-cells{ display:grid; grid-template-columns:repeat(8, minmax(0, 1fr)); gap:3px; }
.fo2-cells div{ height:24px; border-radius:4px; border:1px solid var(--line); background:var(--paper); transition:background .3s; }
.fo2-cells div.fo2-full{ background:color-mix(in srgb, var(--k-os) 38%, var(--paper)); }
.fo2-irq{ display:flex; flex-wrap:wrap; gap:6px 12px; justify-content:center; align-items:center; margin-top:10px; font-size:.95rem; }
.fo2-irq b{ font-family:var(--mono); font-size:1.2rem; color:var(--k-os); }
.fo2-flash{ animation:fo2flash .5s ease; }
@keyframes fo2flash{ 0%{ background:var(--pen); color:#fff; } 100%{ } }
/* multiprogramming memory */
.fo2-mp{ display:grid; grid-template-columns:44px minmax(0, 1fr); gap:0 6px; max-width:360px; margin:0 auto; }
.fo2-addr{ display:flex; flex-direction:column; justify-content:space-between; font:600 .85rem var(--mono); color:var(--ink); text-align:right; }
.fo2-mem{ border:1.5px solid var(--graphite); border-radius:4px; overflow:hidden; }
.fo2-mem > div{ display:flex; justify-content:space-between; align-items:center; gap:6px; padding:0 8px; border-top:1px solid var(--graphite); font-size:.95rem; transition:background .35s; }
.fo2-mem > div:first-child{ border-top:0; }
.fo2-mem .fo2-os{ background:color-mix(in srgb, var(--graphite) 22%, var(--paper)); height:46px; justify-content:center; }
.fo2-mem .fo2-job{ background:color-mix(in srgb, var(--k-os) 12%, var(--paper)); height:52px; }
.fo2-mem .fo2-job.fo2-free{ background:var(--paper); color:var(--graphite); }
.fo2-mem .fo2-job.fo2-run{ background:color-mix(in srgb, var(--k-os) 34%, var(--paper)); }
.fo2-mem .fo2-last{ height:38px; }
.fo2-st{ font-size:.8rem; border-radius:99px; padding:1px 8px; border:1px solid var(--line); background:var(--paper); white-space:nowrap; }
.fo2-st.fo2-r{ background:var(--s-os); color:#fff; border-color:transparent; } .fo2-st.fo2-w{ border-color:var(--pen); color:var(--pen); }
.fo2-cpu{ text-align:center; margin:10px 0 0; font-size:.95rem; }
/* user / kernel mode */
.fo2-bit{ display:flex; justify-content:center; align-items:center; gap:8px; margin-bottom:10px; font-size:.95rem; flex-wrap:wrap; }
.fo2-bit b{ font:700 1.25rem var(--mono); display:inline-grid; place-items:center; width:34px; height:34px; border-radius:8px; background:var(--paper); border:2px solid var(--k-os); color:var(--ink); }
.fo2-band{ border:1px solid var(--line); border-radius:8px; padding:6px; }
.fo2-band.fo2-u{ background:color-mix(in srgb, var(--graphite) 14%, var(--paper)); }
.fo2-band.fo2-kb{ background:color-mix(in srgb, var(--k-os) 12%, var(--paper)); }
.fo2-band.fo2-cur{ box-shadow:0 0 0 2px var(--k-os); }
.fo2-bh{ display:flex; justify-content:space-between; flex-wrap:wrap; gap:2px 8px; font-size:.85rem; margin-bottom:6px; }
.fo2-bh span:first-child{ font-weight:700; }
.fo2-g3{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:6px; }
.fo2-box{ border:1px solid var(--graphite); border-radius:6px; background:var(--paper); padding:6px 2px; text-align:center; font-size:.84rem; line-height:1.25; opacity:.55; transition:opacity .35s, box-shadow .35s; overflow-wrap:break-word; hyphens:manual; min-width:0; }
.fo2-box.fo2-done{ opacity:.85; } .fo2-box.fo2-on{ opacity:1; box-shadow:0 0 0 2px var(--k-os); }
.fo2-tr{ text-align:center; font-size:.84rem; line-height:1.25; padding:6px 2px; opacity:.4; transition:opacity .35s; }
.fo2-tr i{ display:block; font-style:normal; font-size:1.2rem; color:var(--k-os); line-height:1; }
.fo2-tr.fo2-on{ opacity:1; font-weight:700; }
.fo2-priv{ margin-top:10px; padding:8px 10px; border-radius:8px; font-size:.92rem; text-align:center; border:1px solid var(--line); background:var(--paper); }
.fo2-priv.fo2-no{ border-color:var(--pen); color:var(--pen); font-weight:600; } .fo2-priv.fo2-yes{ border-color:var(--ok); color:var(--ok); font-weight:600; }
/* timer */
.fo2-tm{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; }
.fo2-tm > div{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px; text-align:center; font-size:.88rem; transition:box-shadow .3s; }
.fo2-tm > div.fo2-on{ box-shadow:0 0 0 2px var(--k-os); }
.fo2-tm .fo2-big{ display:block; font:700 2rem/1.1 var(--mono); color:var(--k-os); margin:4px 0; }
.fo2-spin{ display:inline-block; font-size:1.6rem; line-height:1.2; color:var(--k-os); }
.fo2-spin.fo2-go{ animation:fo2spin 1s linear infinite; }
@keyframes fo2spin{ to{ transform:rotate(360deg); } }
.fo2-pick{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin-bottom:10px; font-size:.88rem; }
.fo2-alert{ margin-top:10px; padding:8px 10px; border-radius:8px; border:2px solid var(--pen); color:var(--pen); font-weight:700; text-align:center; font-size:.95rem; }
/* storage levels */
.fo2-lv{ display:flex; flex-wrap:wrap; justify-content:center; gap:6px; margin-bottom:10px; }
.fo2-lv button{ font:inherit; font-size:.86rem; line-height:1.2; border:1px solid var(--line); border-radius:99px; background:var(--paper); color:var(--ink); padding:5px 10px; cursor:pointer; min-height:34px; }
.fo2-lv button b{ margin-right:5px; color:var(--k-os); }
.fo2-lv button.fo2-on{ border-color:var(--k-os); background:color-mix(in srgb, var(--k-os) 18%, var(--paper)); box-shadow:0 0 0 1px var(--k-os); }
.fo2-dl{ display:grid; grid-template-columns:minmax(0, 9.5em) minmax(0, 1fr); border:1px solid var(--line); border-radius:10px; background:var(--paper); overflow:hidden; font-size:.9rem; }
.fo2-dl > span{ padding:5px 8px; border-top:1px solid var(--line); overflow-wrap:anywhere; }
.fo2-dl > span:nth-child(-n+2){ border-top:0; }
.fo2-dl > span:nth-child(odd){ color:var(--graphite); background:var(--paper-2); }
.fo2-acc{ margin-top:12px; display:grid; gap:5px; }
.fo2-acc .fo2-h{ font-size:.85rem; color:var(--graphite); text-align:center; }
.fo2-ar{ display:grid; grid-template-columns:minmax(0, 7.5em) minmax(0, 1fr); gap:6px; align-items:center; font-size:.82rem; cursor:pointer; opacity:.6; }
.fo2-ar.fo2-on{ opacity:1; font-weight:700; }
.fo2-track{ position:relative; height:16px; border-radius:4px; background:var(--paper-2); border:1px solid var(--line); }
.fo2-track i{ position:absolute; top:2px; bottom:2px; border-radius:3px; background:var(--k-os); min-width:5px; }
.fo2-ar small{ grid-column:2; font:600 .78rem var(--mono); color:var(--ink); margin-top:-2px; }
/* migration */
.fo2-mg{ display:flex; align-items:stretch; justify-content:center; gap:4px; }
.fo2-lvl{ flex:1 1 0; min-width:0; border:1px solid var(--graphite); border-radius:6px; background:color-mix(in srgb, var(--k-os) 10%, var(--paper)); padding:8px 4px; text-align:center; font-size:.9rem; line-height:1.2; display:flex; flex-direction:column; align-items:center; gap:6px; justify-content:center; transition:box-shadow .35s; }
.fo2-lvl.fo2-on{ box-shadow:0 0 0 2px var(--k-os); }
.fo2-a{ display:inline-grid; place-items:center; width:30px; height:30px; border-radius:50%; background:var(--s-os); color:#fff; font-weight:700; transition:opacity .4s, transform .4s; }
.fo2-a.fo2-off{ opacity:0; transform:scale(.4); }
.fo2-arw{ align-self:center; color:var(--k-os); font-size:1.3rem; font-weight:700; flex:none; }
.fo2-arw .fo2-v{ display:none; }
.fo2-env{ display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:6px; margin-top:12px; }
.fo2-env div{ border:1px dashed var(--k-os); border-radius:8px; background:var(--paper); padding:6px; text-align:center; font-size:.86rem; }
.fo2-envh{ text-align:center; font-weight:700; font-size:.9rem; margin-top:12px; }
@media (max-width:480px){ .fo2-mg{ flex-direction:column; align-items:center; } .fo2-lvl{ width:100%; max-width:240px; flex-direction:row; justify-content:space-between; padding:8px 12px; } .fo2-arw .fo2-h{ display:none; } .fo2-arw .fo2-v{ display:inline; } }
/* interrupt kinds */
.fo2-q{ display:grid; gap:8px; }
.fo2-q > div{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; }
.fo2-q p{ margin:0 0 6px; font-size:.92rem; }
.fo2-q .fo2-btns{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; }
.fo2-q .fo2-ok{ color:var(--ok); font-weight:700; font-size:.88rem; } .fo2-q .fo2-bad{ color:var(--pen); font-weight:700; font-size:.88rem; }
.fo2-score{ text-align:center; margin-top:8px; font-size:.92rem; }
@media (prefers-reduced-motion: reduce){ .fo2-spin.fo2-go, .fo2-flash{ animation:none; } .fo2-a, .fo2-box, .fo2-lvl, .fo2-tr{ transition:none; } }`;
  if (!document.getElementById('fo2-css')) { const s = document.createElement('style'); s.id = 'fo2-css'; s.textContent = CSS; document.head.appendChild(s); }

  const K = 'var(--k-os)', G = 'var(--faint)';
  const Defs = () => html`<defs>
    <marker id="fo2-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--graphite)" /></marker>
    <marker id="fo2-ahk" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--k-os)" /></marker></defs>`;
  // an arrow: lit ones are in the course colour and flow
  const Arrow = ({ d, on, start, end = true }) => html`<path d=${d} fill="none" stroke=${on ? K : 'var(--graphite)'} strokeWidth=${on ? 3 : 1.6} className=${on && !calm() ? 'flow' : ''} markerStart=${start ? `url(#fo2-ah${on ? 'k' : ''})` : undefined} markerEnd=${end ? `url(#fo2-ah${on ? 'k' : ''})` : undefined} />`;

  /* ── L1 slide 20: Direct Memory Access Structure ── */
  function Dma({ ar }) {
    const steps = [
      { en: 'The <b>DMA structure</b>: the <b>CPU (*N)</b> runs a thread of execution and has a cache, <b>memory</b> holds instructions and data, and a <b>device (*M)</b> is attached. DMA is used for <b>high-speed I/O devices</b> able to transmit data at close to memory speeds.', ar: 'الـ <b>DMA structure</b>: الـ <b>CPU (*N)</b> بيشغّل thread of execution وعنده cache، والـ <b>memory</b> فيها الـ instructions والـ data، وفيه <b>device (*M)</b> متوصل. الـ DMA بيستخدم مع الـ <b>high-speed I/O devices</b> اللي بتبعت data بسرعة قريبة من سرعة الـ memory.' },
      { en: 'Between CPU and memory: the <b>instruction execution cycle</b> (instructions come from memory).', ar: 'بين الـ CPU والـ memory: الـ <b>instruction execution cycle</b> (الـ instructions جاية من الـ memory).' },
      { en: 'And <b>data movement</b> between the CPU (through its cache) and memory.', ar: 'وكمان <b>data movement</b> بين الـ CPU (عن طريق الـ cache بتاعه) والـ memory.' },
      { en: 'The CPU sends an <b>I/O request</b> to the device. The figure also shows <b>data</b> passing between the CPU and the device.', ar: 'الـ CPU بيبعت <b>I/O request</b> للـ device. والرسمة كمان فيها <b>data</b> رايحة جاية بين الـ CPU والـ device.' },
      { en: '<b>DMA</b>: the device controller transfers <b>blocks of data</b> from buffer storage <b>directly to main memory</b> without CPU intervention.', ar: 'الـ <b>DMA</b>: الـ device controller بينقل <b>blocks of data</b> من الـ buffer storage <b>على الـ main memory على طول</b> من غير ما الـ CPU يتدخل.' },
      { en: 'When the block is done, the device sends an <b>interrupt</b> to the CPU: only <b>one interrupt per block</b>, rather than one interrupt per byte.', ar: 'لما الـ block يخلص، الـ device بيبعت <b>interrupt</b> للـ CPU: <b>interrupt واحد بس لكل block</b>، مش interrupt لكل byte.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const star = (cx, cy, R, r, n) => Array.from({ length: n * 2 }, (_, k) => { const a = -Math.PI / 2 + k * Math.PI / n, q = k % 2 ? r : R; return `${(cx + q * Math.cos(a)).toFixed(1)},${(cy + q * Math.sin(a)).toFixed(1)}`; }).join(' ');
    const pill = (x, y, w, lines, on) => html`<g><rect x=${x - w / 2} y=${y - 21} width=${w} height="42" rx="8" fill="var(--paper)" stroke=${on ? K : 'var(--line)'} strokeWidth=${on ? 2 : 1} />${lines.map((t, j) => html`<text key=${j} x=${x} y=${y - 4 + j * 17} textAnchor="middle" fontSize="16" fontWeight=${on ? 700 : 400}>${t}</text>`)}</g>`;
    const vlab = (x, y, t, on) => html`<text x=${x} y=${y} transform=${`rotate(-90 ${x} ${y})`} textAnchor="middle" fontSize="16" fontWeight=${on ? 700 : 400}>${t}</text>`;
    const dmaPath = 'M190 374 H300 V70';
    return html`<figure className="fig fo2"><div className="fig-stage">
      <svg viewBox="0 0 320 460" role="img" aria-label="Direct memory access structure: CPU, memory and device, with the I/O request, data, interrupt and DMA paths">
        <${Defs} />
        <rect x="10" y="8" width="300" height="58" rx="4" fill="color-mix(in srgb, var(--k-os) 10%, var(--paper))" stroke="var(--graphite)" />
        <text x="160" y="32" textAnchor="middle" fontSize="16" fontWeight="700">memory</text>
        <text x="160" y="54" textAnchor="middle" fontSize="16">instructions and data</text>
        <rect x="10" y="150" width="270" height="26" fill="var(--paper)" stroke="var(--graphite)" />
        <text x="145" y="169" textAnchor="middle" fontSize="16">cache</text>
        <rect x="10" y="176" width="270" height="56" fill="color-mix(in srgb, var(--graphite) 16%, var(--paper))" stroke="var(--graphite)" />
        <path d="M32 184 q7 5 0 10 q-7 5 0 10 q7 5 0 10 q-7 5 0 10" fill="none" stroke=${K} strokeWidth="2.5" />
        <text x="150" y="199" textAnchor="middle" fontSize="16">thread of execution</text>
        <text x="150" y="222" textAnchor="middle" fontSize="16" fontWeight="700">CPU (*N)</text>
        <${Arrow} d="M70 68 V148" start=${1} on=${i === 1} />
        <${Arrow} d="M200 68 V148" start=${1} on=${i === 2} />
        ${pill(70, 108, 132, ['instruction', 'execution cycle'], i === 1)}
        ${pill(200, 108, 92, ['data', 'movement'], i === 2)}
        <${Arrow} d="M95 234 V322" on=${i === 3} />
        <${Arrow} d="M145 234 V322" start=${1} on=${i === 3} />
        <${Arrow} d="M195 322 V234" on=${i === 5} />
        ${vlab(86, 278, 'I/O request', i === 3)}
        ${vlab(136, 278, 'data', i === 3)}
        ${vlab(186, 278, 'interrupt', i === 5)}
        <polygon points=${star(145, 374, 50, 30, 7)} fill="color-mix(in srgb, var(--k-os) 18%, var(--paper))" stroke="var(--graphite)" strokeWidth="1.5" />
        <text x="145" y="372" textAnchor="middle" fontSize="16">device</text>
        <text x="145" y="390" textAnchor="middle" fontSize="16">(*M)</text>
        <${Arrow} d=${dmaPath} start=${1} on=${i === 4} />
        <text x="294" y="300" textAnchor="end" fontSize="16" fontWeight=${i === 4 ? 700 : 400}>DMA</text>
        ${i === 4 && !calm() && html`<rect x="-12" y="-8" width="24" height="16" rx="3" fill=${K}><animateMotion dur="2.2s" repeatCount="indefinite" path=${dmaPath} /></rect>`}
        ${i === 5 && html`<g className=${pop(true)}><rect x="60" y="430" width="170" height="28" rx="14" fill="var(--s-os)" /><text x="145" y="450" textAnchor="middle" fontSize="16" fontWeight="700" style=${{ fill: '#fff' }}>1 interrupt per block</text></g>`}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 20: one interrupt per block, rather than one per byte ── */
  function DmaIrq({ ar }) {
    const N = 8;
    const [dma, setDma] = useState(true), [k, setK] = useState(0), [run, setRun] = useState(false), [tick, setTick] = useState(0);
    useEffect(() => { if (!run) return; if (k >= N) { setRun(false); return; } const t = setTimeout(() => { setK(x => x + 1); setTick(x => x + 1); }, calm() ? 150 : 450); return () => clearTimeout(t); }, [run, k]);
    const irq = dma ? (k === N ? 1 : 0) : k;
    const flash = (!dma && k > 0) || (dma && k === N);
    const pickMode = m => { setDma(m); setK(0); setRun(false); };
    const cap = dma
      ? { en: '<b>With DMA</b>: the device controller moves the whole block from its buffer straight into main memory without the CPU. <b>Only one interrupt is generated per block.</b> Press Transfer.', ar: '<b>بالـ DMA</b>: الـ device controller بينقل الـ block كله من الـ buffer بتاعه على الـ main memory على طول من غير الـ CPU. <b>بيطلع interrupt واحد بس لكل block.</b> دوس Transfer.' }
      : { en: '<b>One interrupt per byte</b>: the CPU is interrupted for every byte that moves. DMA avoids this. Press Transfer and compare the count.', ar: '<b>interrupt لكل byte</b>: الـ CPU بيتقاطع مع كل byte بيتنقل. الـ DMA بيمنع ده. دوس Transfer وقارن العدد.' };
    return html`<figure className="fig fo2"><div className="fig-stage"><div className="fo2-wrap">
      <div className="fo2-blk">
        <span>buffer</span><div className="fo2-cells">${Array.from({ length: N }, (_, j) => html`<div key=${j} className=${j >= k ? 'fo2-full' : ''}></div>`)}</div>
        <span>memory</span><div className="fo2-cells">${Array.from({ length: N }, (_, j) => html`<div key=${j} className=${j < k ? 'fo2-full' : ''}></div>`)}</div>
      </div>
      <div className="fo2-irq"><span>Interrupts to the CPU:</span> <b key=${tick} className=${flash && !calm() ? 'fo2-flash' : ''}>${irq}</b><span className="fo2-muted" style=${{ margin: 0 }}>(one block of ${N} bytes shown)</span></div>
    </div></div>
      <${Cap} ...${cap} showAr=${ar} />
      <div className="fig-bar">
        <button className=${'fig-btn' + (!dma ? ' fo2-sel' : '')} aria-pressed=${!dma} onClick=${() => pickMode(false)}>Interrupt per byte</button>
        <button className=${'fig-btn' + (dma ? ' fo2-sel' : '')} aria-pressed=${dma} onClick=${() => pickMode(true)}>DMA: per block</button>
        <span className="grow"></span>
        <button className="fig-btn solid" onClick=${() => { setK(0); setRun(true); }} disabled=${run}>▶ Transfer</button></div></figure>`;
  }

  /* ── L1 slide 22: A Dual-Core Design ── */
  function DualCore({ ar }) {
    const steps = [
      { en: '<b>Multicore</b>: two CPU cores, core<sub>0</sub> and core<sub>1</sub>, on one chip.', ar: 'الـ <b>Multicore</b>: 2 CPU cores، core<sub>0</sub> و core<sub>1</sub>، على chip واحدة.' },
      { en: 'Each core has its own <b>registers</b>.', ar: 'كل core ليه الـ <b>registers</b> بتاعته.' },
      { en: 'Each core has its own <b>cache</b>, below its registers.', ar: 'كل core ليه الـ <b>cache</b> بتاعه، تحت الـ registers.' },
      { en: 'Both caches connect to <b>one shared memory</b>, outside the chip.', ar: 'الـ 2 caches متوصلين بـ <b>memory واحدة مشتركة</b>، برة الـ chip.' },
      { en: 'Designs are <b>multi-chip</b> and <b>multicore</b>. Systems containing all chips: a <b>chassis containing multiple separate systems</b>.', ar: 'الـ designs بتبقى <b>multi-chip</b> و <b>multicore</b>. فيه systems فيها كل الـ chips: <b>chassis جواه كذا system منفصل</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    const core = (x, n) => html`<g key=${n}>
      <rect x=${x} y="18" width="124" height="176" fill="color-mix(in srgb, var(--graphite) 16%, var(--paper))" stroke=${i === 0 ? K : 'var(--graphite)'} strokeWidth=${i === 0 ? 2.5 : 1} />
      <text x=${x + 62} y="44" textAnchor="middle" fontSize="15">CPU core${n ? '₁' : '₀'}</text>
      <g className=${pop(i >= 1)}><rect x=${x + 12} y="60" width="100" height="34" fill="var(--paper)" stroke=${i === 1 ? K : 'var(--graphite)'} strokeWidth=${i === 1 ? 2.5 : 1} /><text x=${x + 62} y="82" textAnchor="middle" fontSize="15">registers</text></g>
      <g className=${pop(i >= 2)}><line x1=${x + 62} y1="94" x2=${x + 62} y2="120" stroke="var(--graphite)" strokeWidth="1.5" /><rect x=${x + 12} y="120" width="100" height="34" fill="var(--paper)" stroke=${i === 2 ? K : 'var(--graphite)'} strokeWidth=${i === 2 ? 2.5 : 1} /><text x=${x + 62} y="142" textAnchor="middle" fontSize="15">cache</text></g></g>`;
    return html`<figure className="fig fo2"><div className="fig-stage">
      <svg viewBox="0 0 300 296" role="img" aria-label="Dual-core design: CPU core 0 and core 1, each with registers and cache, sharing one memory">
        <rect x="6" y="6" width="288" height="200" fill="color-mix(in srgb, var(--k-os) 14%, var(--paper))" stroke="var(--graphite)" />
        ${core(18, 0)}${core(158, 1)}
        <g className=${pop(i >= 3)}>
          <path d="M80 154 V232 H220 V154 M150 232 V246" fill="none" stroke=${i === 3 ? K : 'var(--graphite)'} strokeWidth=${i === 3 ? 3 : 1.6} className=${i === 3 && !calm() ? 'flow' : ''} />
          <rect x="100" y="246" width="100" height="40" fill="color-mix(in srgb, var(--k-os) 14%, var(--paper))" stroke=${i === 3 ? K : 'var(--graphite)'} strokeWidth=${i === 3 ? 2.5 : 1} />
          <text x="150" y="272" textAnchor="middle" fontSize="15">memory</text></g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slides 23 and 24: multiprogramming and the memory layout for a multiprogrammed system ── */
  function Multiprog({ ar }) {
    const [multi, setMulti] = useState(true), [run, setRun] = useState(0), [wait, setWait] = useState(-1), [n, setN] = useState(0);
    const mode = m => { setMulti(m); setRun(0); setWait(-1); setN(0); };
    const press = () => {
      setN(x => x + 1);
      if (!multi) { if (run === 0) { setWait(0); setRun(-1); } else { setWait(-1); setRun(0); } return; }
      setWait(run); setRun((run + 1) % 4);
    };
    const jobs = [1, 2, 3, 4];
    const st = j => !multi && j > 0 ? 'free' : j === run ? 'run' : j === wait ? 'wait' : 'ready';
    let cap;
    if (!multi) cap = run === 0
      ? { en: 'One job only: a <b>single user cannot keep the CPU and I/O devices busy at all times</b>. Make the job wait for I/O.', ar: 'job واحد بس: <b>user واحد مش بيقدر يخلّي الـ CPU والـ I/O devices مشغولين طول الوقت</b>. خلّي الـ job يستنى I/O.' }
      : { en: 'The only job waits for I/O, so the <b>CPU is idle</b>: nothing else in memory to run. This is why multiprogramming is <b>needed for efficiency</b>.', ar: 'الـ job الوحيد مستني I/O، فالـ <b>CPU قاعد فاضي</b>: مفيش حاجة تانية في الـ memory يشغّلها. علشان كده الـ multiprogramming <b>مطلوب للـ efficiency</b>.' };
    else cap = n === 0
      ? { en: '<b>Multiprogramming (batch system)</b>: the OS sits at address 0 and a <b>subset of the total jobs</b> (job 1 to job 4) is kept in memory, up to 512M. One job is selected and run via <b>job scheduling</b>. Press the button.', ar: 'الـ <b>Multiprogramming (batch system)</b>: الـ OS عند address 0 و<b>جزء من الـ jobs الكلية</b> (من job 1 لـ job 4) محطوط في الـ memory لحد 512M. job واحد بيتختار ويشتغل بالـ <b>job scheduling</b>. دوس الزرار.' }
      : { en: 'Job ' + (wait + 1) + ' has to wait for I/O, so the <b>OS switches to another job</b> (job ' + (run + 1) + '). Multiprogramming organizes jobs (code and data) so the <b>CPU always has one to execute</b>.', ar: 'الـ job ' + (wait + 1) + ' لازم يستنى I/O، فالـ <b>OS بيبدّل لـ job تاني</b> (job ' + (run + 1) + '). الـ multiprogramming بيرتّب الـ jobs (code و data) بحيث <b>الـ CPU يلاقي دايمًا حاجة يشغّلها</b>.' };
    const lab = { run: 'running', wait: 'waiting for I/O', ready: 'ready', free: '' };
    return html`<figure className="fig fo2"><div className="fig-stage">
      <div className="fo2-mp">
        <div className="fo2-addr"><span>0</span><span>512M</span></div>
        <div className="fo2-mem">
          <div className="fo2-os">operating system</div>
          ${jobs.map((j, k) => html`<div key=${j} className=${'fo2-job fo2-' + st(k) + (k === 3 ? ' fo2-last' : '')}><span>job ${j}</span>${lab[st(k)] && html`<span className=${'fo2-st' + (st(k) === 'run' ? ' fo2-r' : st(k) === 'wait' ? ' fo2-w' : '')}>${lab[st(k)]}</span>`}</div>`)}
        </div>
      </div>
      <p className="fo2-cpu">CPU: ${run >= 0 ? html`<span className="fo2-pill fo2-hot">job ${run + 1}</span>` : html`<span className="fo2-pill">idle</span>`}</p>
    </div>
      <${Cap} ...${cap} showAr=${ar} />
      <div className="fig-bar">
        <button className=${'fig-btn' + (!multi ? ' fo2-sel' : '')} aria-pressed=${!multi} onClick=${() => mode(false)}>One job</button>
        <button className=${'fig-btn' + (multi ? ' fo2-sel' : '')} aria-pressed=${multi} onClick=${() => mode(true)}>Multiprogramming</button>
        <span className="grow"></span>
        <button className="fig-btn solid" onClick=${press}>${!multi && run < 0 ? 'I/O finishes' : 'Job waits for I/O'}</button></div></figure>`;
  }

  /* ── L1 slide 25: interrupt driven, hardware vs software interrupts ── */
  function IntrKinds({ ar }) {
    const Q = [
      { t: 'One of the devices signals the CPU', a: 'hw' },
      { t: 'Software error (e.g., division by zero)', a: 'sw' },
      { t: 'Request for operating system service', a: 'sw' }
    ];
    const [ans, setAns] = useState({});
    const right = Q.filter((q, k) => ans[k] === q.a).length, done = Object.keys(ans).length;
    const cap = done < Q.length
      ? { en: 'The OS is <b>interrupt driven</b> (hardware and software). Sort each event: a <b>hardware interrupt</b> by one of the devices, or a <b>software interrupt</b> (exception or trap)?', ar: 'الـ OS <b>interrupt driven</b> (hardware و software). صنّف كل حدث: <b>hardware interrupt</b> من device، ولا <b>software interrupt</b> (exception أو trap)؟' }
      : { en: right + ' of ' + Q.length + ' right. Hardware interrupt: by one of the devices. Software interrupt (<b>exception</b> or <b>trap</b>): software error (e.g., division by zero) or request for OS service. Other process problems include <b>infinite loop</b> and <b>processes modifying each other</b>.', ar: right + ' من ' + Q.length + ' صح. الـ hardware interrupt: من device. الـ software interrupt (<b>exception</b> أو <b>trap</b>): software error (زي القسمة على صفر) أو طلب service من الـ OS. ومن مشاكل الـ process كمان: الـ <b>infinite loop</b> والـ <b>processes اللي بتعدّل في بعض</b>.' };
    return html`<figure className="fig fo2"><div className="fig-stage"><div className="fo2-wrap fo2-q">
      ${Q.map((q, k) => html`<div key=${k}><p>${q.t}</p><div className="fo2-btns">
        <button className=${'fig-btn' + (ans[k] === 'hw' ? ' fo2-sel' : '')} onClick=${() => setAns(o => ({ ...o, [k]: 'hw' }))}>Hardware</button>
        <button className=${'fig-btn' + (ans[k] === 'sw' ? ' fo2-sel' : '')} onClick=${() => setAns(o => ({ ...o, [k]: 'sw' }))}>Software (trap)</button>
        ${ans[k] && html`<span className=${ans[k] === q.a ? 'fo2-ok' : 'fo2-bad'}>${ans[k] === q.a ? '✓ right' : '✗ ' + (q.a === 'hw' ? 'hardware' : 'software')}</span>`}</div></div>`)}
    </div></div>
      <${Cap} ...${cap} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => setAns({})} disabled=${!done}>↻ Again</button></div></figure>`;
  }

  /* ── L1 slides 26 and 27: dual mode and the transition from user to kernel mode ── */
  function Modes({ ar }) {
    const steps = [
      { en: 'The <b>user process</b> is executing in <b>user mode</b> (mode bit = 1). The <b>mode bit</b>, provided by hardware, distinguishes when the system is running user code or kernel code.', ar: 'الـ <b>user process</b> شغّال في الـ <b>user mode</b> (mode bit = 1). الـ <b>mode bit</b> اللي بيوفّره الـ hardware بيفرّق إمتى الـ system بيشغّل user code وإمتى kernel code.' },
      { en: 'The user process <b>calls a system call</b>.', ar: 'الـ user process <b>بينادي system call</b>.' },
      { en: '<b>Trap</b>: mode bit = 0. The system call changes the mode to <b>kernel</b>.', ar: '<b>Trap</b>: الـ mode bit = 0. الـ system call بيغيّر الـ mode لـ <b>kernel</b>.' },
      { en: 'The kernel <b>executes the system call</b> in <b>kernel mode</b> (mode bit = 0). <b>Privileged</b> instructions can run only here.', ar: 'الـ kernel <b>بينفّذ الـ system call</b> في الـ <b>kernel mode</b> (mode bit = 0). الـ instructions الـ <b>privileged</b> بتشتغل هنا بس.' },
      { en: '<b>Return</b>: mode bit = 1. Return from the call resets the mode to <b>user</b>.', ar: '<b>Return</b>: الـ mode bit = 1. الرجوع من الـ call بيرجّع الـ mode لـ <b>user</b>.' },
      { en: '<b>Return from system call</b>: the user process continues in user mode. Dual-mode operation lets the OS protect itself and other system components.', ar: '<b>Return from system call</b>: الـ user process بيكمّل في الـ user mode. الـ dual-mode operation بيخلّي الـ OS يحمي نفسه وباقي الـ system components.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const [priv, setPriv] = useState(null);
    useEffect(() => setPriv(null), [i]);
    const bit = i === 2 || i === 3 ? 0 : 1;
    const cls = k => 'fo2-box' + (i === k ? ' fo2-on' : i > k ? ' fo2-done' : '');
    const tr = k => 'fo2-tr' + (i === k ? ' fo2-on' : '');
    return html`<figure className="fig fo2"><div className="fig-stage"><div className="fo2-wrap">
      <div className="fo2-bit"><span>mode bit</span><b>${bit}</b><span className=${'fo2-pill' + (bit === 0 ? ' fo2-hot' : '')}>${bit ? 'user mode' : 'kernel mode'}</span></div>
      <div className=${'fo2-band fo2-u' + (bit ? ' fo2-cur' : '')}>
        <div className="fo2-bh"><span>user process</span><span>user mode (mode bit = 1)</span></div>
        <div className="fo2-g3"><div className=${cls(0)}>user process executing</div><div className=${cls(1)}>calls system call</div><div className=${cls(5)}>return from system call</div></div>
      </div>
      <div className="fo2-g3"><div></div><div className=${tr(2)}><i>↓</i>trap<br />mode bit = 0</div><div className=${tr(4)}><i>↑</i>return<br />mode bit = 1</div></div>
      <div className=${'fo2-band fo2-kb' + (!bit ? ' fo2-cur' : '')}>
        <div className="fo2-bh"><span>kernel</span><span>kernel mode (mode bit = 0)</span></div>
        <div className="fo2-g3"><div></div><div className=${cls(3)} style=${{ gridColumn: '2 / span 2' }}>execute system call</div></div>
      </div>
      ${priv && html`<div className=${'fo2-priv ' + (priv === 'no' ? 'fo2-no' : 'fo2-yes')}>${priv === 'no' ? '✗ Not allowed in user mode: privileged instructions are only executable in kernel mode.' : '✓ Allowed: the system is in kernel mode.'}</div>`}
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} />
      <div className="fig-bar"><button className="fig-btn" onClick=${() => setPriv(bit ? 'no' : 'yes')}>Try a privileged instruction</button></div>
      <${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L1 slide 27: the timer ── */
  function Timer({ ar }) {
    const [len, setLen] = useState(5), [cnt, setCnt] = useState(null), [ph, setPh] = useState('idle');
    useEffect(() => {
      if (ph !== 'run') return;
      if (cnt <= 0) { setPh('fired'); return; }
      const t = setTimeout(() => setCnt(c => c - 1), 700); return () => clearTimeout(t);
    }, [ph, cnt]);
    const reset = () => { setCnt(null); setPh('idle'); };
    const C = {
      idle: { en: 'A <b>timer</b> prevents an infinite loop or a process hogging resources. First the operating system <b>sets the counter</b> (a <b>privileged instruction</b>). Pick a time period and press the button.', ar: 'الـ <b>timer</b> بيمنع الـ infinite loop أو إن process يحتكر الـ resources. الأول الـ OS <b>بيظبط الـ counter</b> (ودي <b>privileged instruction</b>). اختار مدة ودوس الزرار.' },
      set: { en: 'The timer is set to interrupt the computer after this time period. It is <b>set up before scheduling the process</b>. Now schedule the process.', ar: 'الـ timer اتظبط إنه يعمل interrupt للكمبيوتر بعد المدة دي. ده بيتعمل <b>قبل ما الـ process يتعمله scheduling</b>. دلوقتي اعمل schedule للـ process.' },
      run: { en: 'The process is stuck in an <b>infinite loop</b>, but the counter is <b>decremented by the physical clock</b> on every tick.', ar: 'الـ process واقع في <b>infinite loop</b>، بس الـ counter <b>بيقل مع كل tick من الـ physical clock</b>.' },
      fired: { en: '<b>Counter zero: an interrupt is generated.</b> The OS <b>regains control</b>, or terminates the program that exceeds its allotted time.', ar: '<b>الـ counter وصل صفر: بيطلع interrupt.</b> الـ OS <b>بيرجع ياخد الـ control</b>، أو بيقفل البرنامج اللي عدّى الوقت المسموح له.' },
      term: { en: 'The OS <b>terminated the program</b> that exceeded its allotted time. The CPU is back with the operating system.', ar: 'الـ OS <b>قفل البرنامج</b> اللي عدّى الوقت المسموح له. الـ CPU رجع للـ operating system.' }
    }[ph];
    return html`<figure className="fig fo2"><div className="fig-stage"><div className="fo2-wrap">
      <div className="fo2-pick"><span>time period:</span>${[3, 5, 8].map(v => html`<button key=${v} className=${'fig-btn' + (len === v ? ' fo2-sel' : '')} disabled=${ph !== 'idle'} onClick=${() => setLen(v)}>${v} ticks</button>`)}</div>
      <div className="fo2-tm">
        <div className=${ph === 'run' ? 'fo2-on' : ''}>process<br /><span className=${'fo2-spin' + (ph === 'run' && !calm() ? ' fo2-go' : '')} aria-hidden="true">⟳</span><br />${ph === 'run' ? 'infinite loop' : ph === 'term' ? 'terminated' : ph === 'fired' ? 'stopped' : 'not running'}</div>
        <div className=${ph === 'set' || ph === 'fired' ? 'fo2-on' : ''}>timer counter<span className="fo2-big">${cnt == null ? '-' : cnt}</span>${ph === 'run' ? 'clock ticking' : ''}</div>
      </div>
      ${ph === 'fired' && html`<div className="fo2-alert">Interrupt! The OS regains control.</div>`}
    </div></div>
      <${Cap} ...${C} showAr=${ar} />
      <div className="fig-bar">
        ${ph === 'idle' && html`<button className="fig-btn solid" onClick=${() => { setCnt(len); setPh('set'); }}>OS sets the counter</button>`}
        ${ph === 'set' && html`<button className="fig-btn solid" onClick=${() => setPh('run')}>▶ Schedule the process</button>`}
        ${ph === 'fired' && html`<button className="fig-btn solid" onClick=${() => setPh('term')}>Terminate the program</button>`}
        <span className="grow"></span>
        <button className="fig-btn" onClick=${reset}>↻ Reset</button></div></figure>`;
  }

  /* ── L1 slide 33: Performance of Various Levels of Storage ── */
  const LV = [
    { n: 'registers', size: '< 1 KB', tech: 'custom memory with multiple ports CMOS', acc: '0.25 - 0.5', lo: .25, hi: .5, bw: '20,000 - 100,000', man: 'compiler', back: 'cache' },
    { n: 'cache', size: '< 16MB', tech: 'on-chip or off-chip CMOS SRAM', acc: '0.5 - 25', lo: .5, hi: 25, bw: '5,000 - 10,000', man: 'hardware', back: 'main memory' },
    { n: 'main memory', size: '< 64GB', tech: 'CMOS SRAM', acc: '80 - 250', lo: 80, hi: 250, bw: '1,000 - 5,000', man: 'operating system', back: 'disk' },
    { n: 'solid state disk', size: '< 1 TB', tech: 'flash memory', acc: '25,000 - 50,000', lo: 25000, hi: 50000, bw: '500', man: 'operating system', back: 'disk' },
    { n: 'magnetic disk', size: '< 10 TB', tech: 'magnetic disk', acc: '5,000,000', lo: 5e6, hi: 5e6, bw: '20 - 150', man: 'operating system', back: 'disk or tape' }
  ];
  function StorageLevels({ ar }) {
    const [s, setS] = useState(0);
    const L = LV[s], pos = v => (Math.log10(v) + 1) / 8 * 100;
    const rows = [['Name', L.n], ['Typical size', L.size], ['Implementation technology', L.tech], ['Access time (ns)', L.acc], ['Bandwidth (MB/sec)', L.bw], ['Managed by', L.man], ['Backed by', L.back]];
    const cap = { en: '<b>Level ' + (s + 1) + ': ' + L.n + '</b>, managed by the <b>' + L.man + '</b> and backed by <b>' + L.back + '</b>. Pick a level. Movement between levels of the storage hierarchy can be <b>explicit or implicit</b>.', ar: '<b>Level ' + (s + 1) + ': ' + L.n + '</b>، اللي بيديره الـ <b>' + L.man + '</b> ووراه <b>' + L.back + '</b>. اختار level. الحركة بين مستويات الـ storage hierarchy ممكن تبقى <b>explicit أو implicit</b>.' };
    return html`<figure className="fig fo2"><div className="fig-stage"><div className="fo2-wrap">
      <div className="fo2-lv" role="group" aria-label="Storage level">${LV.map((l, k) => html`<button key=${k} className=${s === k ? 'fo2-on' : ''} aria-pressed=${s === k} onClick=${() => setS(k)}><b>${k + 1}</b>${l.n}</button>`)}</div>
      <div className="fo2-dl">${rows.map(([a, b]) => html`<${React.Fragment} key=${a}><span>${a}</span><span>${b}</span></${React.Fragment}>`)}</div>
      <div className="fo2-acc"><div className="fo2-h">Access time (ns) of each level, log scale</div>
        ${LV.map((l, k) => html`<div key=${k} className=${'fo2-ar' + (s === k ? ' fo2-on' : '')} onClick=${() => setS(k)}><span>${l.n}</span><div className="fo2-track"><i style=${{ left: pos(l.lo) + '%', width: (pos(l.hi) - pos(l.lo)) + '%' }}></i></div><small>${l.acc}</small></div>`)}
      </div>
    </div></div>
      <${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L1 slide 34: Migration of data "A" from disk to register ── */
  function Migrate({ ar }) {
    const steps = [
      { en: 'Data <b>"A"</b> starts on the <b>hard disk</b>.', ar: 'الـ data <b>"A"</b> بتبدأ على الـ <b>hard disk</b>.' },
      { en: 'A is copied into <b>main memory</b>.', ar: 'الـ A بتتنسخ في الـ <b>main memory</b>.' },
      { en: 'Then into the <b>cache</b>.', ar: 'وبعدين في الـ <b>cache</b>.' },
      { en: 'Then into a <b>hardware register</b>, where the CPU uses it.', ar: 'وبعدين في <b>hardware register</b>، وهنا الـ CPU بيستخدمها.' },
      { en: 'A now exists at several levels. <b>Multitasking</b> environments must be careful to use the <b>most recent value</b>, no matter where it is stored in the storage hierarchy.', ar: 'الـ A دلوقتي موجودة في كذا level. الـ <b>Multitasking</b> environments لازم تاخد بالها تستخدم <b>آخر قيمة (most recent value)</b>، مهما كانت متخزنة فين في الـ storage hierarchy.' },
      { en: '<b>Multiprocessor</b> environment: must provide <b>cache coherency</b> in hardware such that all CPUs have the most recent value in their cache.', ar: 'الـ <b>Multiprocessor</b> environment: لازم يوفّر <b>cache coherency</b> في الـ hardware بحيث كل الـ CPUs يبقى عندها آخر قيمة في الـ cache بتاعها.' },
      { en: '<b>Distributed</b> environment: the situation is even more complex. <b>Several copies of a data can exist.</b>', ar: 'الـ <b>Distributed</b> environment: الموضوع أعقد كمان. <b>ممكن يبقى فيه كذا نسخة من نفس الـ data.</b>' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    const names = ['hard disk', 'main memory', 'cache', 'hardware register'];
    return html`<figure className="fig fo2"><div className="fig-stage"><div className="fo2-wrap">
      <div className="fo2-mg">${names.map((t, k) => html`<${React.Fragment} key=${t}>
        ${k > 0 && html`<span className="fo2-arw" aria-hidden="true"><span className="fo2-h">➜</span><span className="fo2-v">⬇</span></span>`}
        <div className=${'fo2-lvl' + (i === k || i === 4 ? ' fo2-on' : '')}><span>${t}</span><span className=${'fo2-a' + (i >= k ? '' : ' fo2-off')}>A</span></div></${React.Fragment}>`)}</div>
      ${i === 5 && html`<div className=${pop(true)}><div className="fo2-envh">cache coherency (hardware)</div><div className="fo2-env"><div>CPU 0 cache: <span className="fo2-k">A</span></div><div>CPU 1 cache: <span className="fo2-k">A</span></div></div></div>`}
      ${i === 6 && html`<div className=${pop(true)}><div className="fo2-envh">distributed environment</div><div className="fo2-env"><div>copy of <span className="fo2-k">A</span></div><div>copy of <span className="fo2-k">A</span></div><div>copy of <span className="fo2-k">A</span></div></div></div>`}
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'os-dma': Dma, 'os-dma-irq': DmaIrq, 'os-dualcore': DualCore, 'os-multiprog': Multiprog, 'os-intr-kinds': IntrKinds, 'os-modes': Modes, 'os-timer': Timer, 'os-storage-levels': StorageLevels, 'os-migrate': Migrate });
})();

/* ── part 3 ── */
// OS visuals, part 3: Lecture 2 (Processes), slides 3, 5, 6, 7, 9, 10, 12, 17–18, 19.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.fo3 .fig-dots i.on{ background:var(--k-os); } .fo3 .fig-btn:hover{ border-color:var(--k-os); } .fo3 .fig-btn.solid{ background:var(--s-os); color:#fff; border-color:transparent; }
.fo3 .fig-btn:disabled{ opacity:.45; cursor:default; }
.fo3 .fig-btn.sel{ border-color:var(--k-os); box-shadow:0 0 0 1px var(--k-os); background:color-mix(in srgb, var(--k-os) 14%, var(--paper)); }
.fo3-acts{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; padding:0 14px 12px; }
.fo3-acts .lab{ width:100%; font-size:.82rem; color:var(--graphite); }
.fo3-muted{ color:var(--graphite); font-size:.85rem; }
.fo3-tok{ transition:transform .42s linear, opacity .3s; }
.fo3-tok.jump{ transition:none; }
.fo3-hot{ transition:fill .3s, stroke .3s; }
/* status chips (CPU switch) */
.fo3-st{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:6px; max-width:520px; margin:0 auto 10px; }
.fo3-st div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 4px; font-size:.8rem; text-align:center; color:var(--ink); line-height:1.3; min-width:0; overflow-wrap:anywhere; transition:background .3s, border-color .3s; }
.fo3-st div span{ display:block; font-weight:700; }
.fo3-st div.ex{ background:color-mix(in srgb, var(--k-os) 22%, var(--paper)); border-color:var(--k-os); }
.fo3-leg{ display:flex; flex-wrap:wrap; gap:4px 14px; justify-content:center; font-size:.8rem; color:var(--ink); margin-top:8px; }
.fo3-leg i{ display:inline-block; width:22px; vertical-align:middle; margin-right:5px; border-radius:2px; }
/* PCB */
.fo3-pcb{ max-width:250px; margin:0 auto; border:2px solid var(--ink); display:grid; }
.fo3-pcb button{ font:inherit; font-size:1rem; border:0; border-bottom:1px solid var(--graphite); background:var(--paper); color:var(--ink); padding:8px; min-height:40px; cursor:pointer; transition:background .3s; }
.fo3-pcb button:last-child{ border-bottom:0; }
.fo3-pcb button.tall{ min-height:78px; background:color-mix(in srgb, var(--k-os) 9%, var(--paper)); }
.fo3-pcb button.on{ background:color-mix(in srgb, var(--k-os) 34%, var(--paper)); font-weight:700; box-shadow:inset 0 0 0 2px var(--k-os); }
.fo3-pcb button.seen:not(.on)::after{ content:" ✓"; color:var(--ok); }
/* Chrome */
.fo3-seg{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.fo3-br{ border:1px solid var(--graphite); border-radius:8px; overflow:hidden; background:var(--paper); max-width:520px; margin:0 auto; }
.fo3-tabs{ display:flex; gap:2px; padding:6px 6px 0; background:var(--paper-2); border-bottom:1px solid var(--line); }
.fo3-tabs button{ flex:1 1 0; min-width:0; font:inherit; font-size:.76rem; padding:6px 5px; border:1px solid var(--line); border-bottom:0; border-radius:6px 6px 0 0; background:var(--paper-2); color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; cursor:pointer; text-align:left; }
.fo3-tabs button.on{ background:var(--paper); font-weight:600; }
.fo3-tabs button.dead{ color:var(--pen); text-decoration:line-through; }
.fo3-page{ padding:12px 10px; min-height:84px; text-align:center; font-size:.9rem; color:var(--ink); display:grid; gap:8px; justify-items:center; align-content:center; }
.fo3-page .t{ font-weight:700; overflow-wrap:anywhere; }
.fo3-page.dead{ background:color-mix(in srgb, var(--pen) 10%, var(--paper)); }
.fo3-page.dead .t{ color:var(--pen); }
.fo3-procs{ display:grid; gap:6px; max-width:520px; margin:10px auto 0; }
.fo3-proc{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; font-size:.82rem; line-height:1.35; color:var(--ink); display:flex; flex-wrap:wrap; gap:2px 8px; align-items:baseline; }
.fo3-proc .nm{ font-weight:700; } .fo3-proc .st{ margin-left:auto; font-weight:700; color:var(--ok); }
.fo3-proc.dead{ border-color:var(--pen); } .fo3-proc.dead .st{ color:var(--pen); }
.fo3-proc .d{ width:100%; color:var(--graphite); overflow-wrap:anywhere; }
.fo3-sand{ border:1.5px dashed var(--k-os); border-radius:10px; padding:6px; display:grid; gap:6px; }
.fo3-sand > .h{ font-size:.8rem; color:var(--k-os); font-weight:700; }
.fo3-cap2{ text-align:center; font-style:italic; font-weight:600; font-size:.9rem; color:var(--ink); margin:8px 0 0; }
/* fork / exec / wait / exit */
.fo3-fk{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; max-width:520px; margin:0 auto; }
.fo3-pr{ border:1.5px solid var(--line); border-radius:10px; background:var(--paper); padding:8px; display:grid; gap:6px; align-content:start; font-size:.86rem; color:var(--ink); min-width:0; transition:opacity .3s, border-color .3s; }
.fo3-pr .hd{ font-weight:700; }
.fo3-chip{ justify-self:start; border-radius:99px; padding:2px 9px; font-size:.8rem; font-weight:700; background:var(--paper-2); border:1px solid var(--line); }
.fo3-chip.run{ color:var(--ok); border-color:var(--ok); } .fo3-chip.wait{ color:var(--k-os); border-color:var(--k-os); }
.fo3-chip.zom, .fo3-chip.orph, .fo3-chip.end{ color:var(--pen); border-color:var(--pen); }
.fo3-mem{ border:1px dashed var(--graphite); border-radius:6px; padding:6px 4px; font-size:.8rem; text-align:center; overflow-wrap:anywhere; transition:background .4s, border-color .4s; }
.fo3-mem.nw{ border-style:solid; border-color:var(--k-os); background:color-mix(in srgb, var(--k-os) 16%, var(--paper)); }
.fo3-pr .bt{ display:flex; flex-wrap:wrap; gap:4px; }
.fo3-pr .fig-btn{ font-family:var(--mono); font-size:.78rem; padding:4px 8px; min-height:30px; }
.fo3-pr.gone{ opacity:.5; } .fo3-pr.none{ border-style:dashed; color:var(--graphite); }
.fo3-opt{ display:flex; gap:8px; align-items:flex-start; justify-content:center; max-width:520px; margin:10px auto 0; font-size:.84rem; color:var(--ink); line-height:1.4; }
.fo3-opt input{ margin-top:3px; accent-color:var(--k-os); }
@media (prefers-reduced-motion: reduce){ .fo3-tok, .fo3-hot, .fo3-st div, .fo3-mem, .fo3-pcb button{ transition:none; } }
`;
  if (!document.getElementById('fo3-css')) { const s = document.createElement('style'); s.id = 'fo3-css'; s.textContent = CSS; document.head.appendChild(s); }

  const K = 'var(--k-os)', G = 'var(--graphite)', INK = 'var(--ink)';
  const HI = 'color-mix(in srgb, var(--k-os) 30%, var(--paper))', BOX = 'var(--paper-2)';
  const mk = (id, col) => html`<marker id=${id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill=${col} /></marker>`;
  // centred (or anchored) lines of SVG text
  const T = (x, y, lines, o) => { o = o || {}; return lines.map((s, k) => html`<text key=${k} x=${x} y=${y + k * (o.lh || 22)} textAnchor=${o.a || 'middle'} fontSize=${o.fs || 21} fontWeight=${o.fw || 400} style=${o.col ? { fill: o.col } : null}>${s}</text>`); };

  // a dot that travels along waypoints ({x, y, at, jump, hide}); the last point's `at` names where it rests (drawn sitting just above that box, off its label)
  function useToken() {
    const [p, setP] = useState({ x: 0, y: 0, hide: true, jump: true }), [busy, setBusy] = useState(false), tm = useRef([]);
    useEffect(() => () => tm.current.forEach(clearTimeout), []);
    const run = (pts, done) => {
      tm.current.forEach(clearTimeout); tm.current = [];
      if (calm()) { setP(Object.assign({}, pts[pts.length - 1], { jump: true })); done && done(); return; }
      setBusy(true); let t = 0;
      pts.forEach((q, k) => { if (q.jump) { tm.current.push(setTimeout(() => setP(q), t)); t += 40; return; }
        tm.current.push(setTimeout(() => { setP(q); if (k === pts.length - 1) tm.current.push(setTimeout(() => { setBusy(false); done && done(); }, 420)); }, t)); t += 420; });
    };
    const reset = () => { tm.current.forEach(clearTimeout); tm.current = []; setBusy(false); setP({ x: 0, y: 0, hide: true, jump: true }); };
    return [p, busy, run, reset];
  }
  const Tok = ({ p }) => html`<circle className=${'fo3-tok' + (p.jump ? ' jump' : '')} cx="0" cy="0" r="11" fill=${K} stroke="var(--paper)" strokeWidth="3" style=${{ transform: `translate(${p.x}px, ${p.y - (p.at && p.at !== 'gone' && p.at !== 'end' ? 30 : 0)}px)`, opacity: p.hide ? 0 : 1 }} />`;

  /* ── slide 3: process in memory (max … 0) ── */
  function ProcMemory({ ar }) {
    const steps = [
      { en: '<b>Process</b>: a program in execution; process execution must progress in sequential fashion. It has multiple parts in memory, from address 0 up to max.', ar: 'الـ <b>Process</b>: برنامج وهو شغال؛ والتنفيذ بتاعها لازم يمشي بالترتيب (sequential). ليها أجزاء كتير في الـ memory، من العنوان 0 لحد الـ max.' },
      { en: 'The program code, also called the <b>text section</b>.', ar: 'الـ program code، واسمه كمان الـ <b>text section</b>.' },
      { en: '<b>Data section</b> containing global and static variables: declared outside the main function and can be accessed by any function.', ar: 'الـ <b>Data section</b> فيه الـ global والـ static variables: متعرفين برة الـ main function وأي function تقدر توصلهم.' },
      { en: '<b>Heap</b> containing memory dynamically allocated during run time, as the pointers: new, delete, malloc, free, etc. It grows up into the free space.', ar: 'الـ <b>Heap</b> فيه الـ memory اللي بتتحجز dynamically وقت التشغيل، زي الـ pointers: new و delete و malloc و free. وبيكبر لفوق في المساحة الفاضية.' },
      { en: '<b>Stack</b> containing temporary / local variables: function parameters, return addresses, local variables. It grows down into the free space.', ar: 'الـ <b>Stack</b> فيه الـ temporary / local variables: الـ function parameters والـ return addresses والـ local variables. وبيكبر لتحت في المساحة الفاضية.' },
      { en: 'Current activity including the <b>program counter</b> and the <b>processor registers</b>.', ar: 'الـ current activity، وفيها الـ <b>program counter</b> والـ <b>processor registers</b>.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const seg = (y, h, label, on) => html`<g><rect className="fo3-hot" x="70" y=${y} width="150" height=${h} fill=${on ? HI : BOX} stroke=${on ? K : G} strokeWidth=${on ? 3 : 1.5} />${T(145, y + h / 2 + 6, [label], { fs: 18, fw: on ? 700 : 400 })}</g>`;
    return html`<figure className="fig fo3"><div className="fig-stage">
      <svg viewBox="0 0 340 384" role="img" aria-label="A process in memory: stack at max, free space, heap, data, text at 0">
        <defs>${mk('fo3-pm-a', INK)}${mk('fo3-pm-k', K)}</defs>
        <text x="62" y="30" textAnchor="end" fontSize="17">max</text><text x="62" y="372" textAnchor="end" fontSize="17">0</text>
        <rect x="70" y="75" width="150" height="140" fill="color-mix(in srgb, var(--k-os) 8%, var(--paper))" stroke=${G} strokeWidth="1.5" />
        <rect x="74" y="75" width="142" height="32" fill="none" stroke=${K} strokeWidth="2" strokeDasharray="5 4" className=${pop(i === 4)} />
        <rect x="74" y="183" width="142" height="32" fill="none" stroke=${K} strokeWidth="2" strokeDasharray="5 4" className=${pop(i === 3)} />
        <path d="M145 80 V122" stroke=${i === 4 ? K : INK} strokeWidth="2.5" markerEnd=${i === 4 ? 'url(#fo3-pm-k)' : 'url(#fo3-pm-a)'} />
        <path d="M145 210 V168" stroke=${i === 3 ? K : INK} strokeWidth="2.5" markerEnd=${i === 3 ? 'url(#fo3-pm-k)' : 'url(#fo3-pm-a)'} />
        ${seg(20, 55, 'stack', i === 4)}${seg(215, 50, 'heap', i === 3)}${seg(265, 50, 'data', i === 2)}${seg(315, 50, 'text', i === 1)}
        <g className=${pop(i >= 5)}>
          <rect x="246" y="130" width="90" height="56" rx="6" fill=${HI} stroke=${K} strokeWidth="2" />${T(291, 153, ['processor', 'registers'], { fs: 17, lh: 20 })}
          <path d="M330 340 H226" stroke=${K} strokeWidth="2.5" markerEnd="url(#fo3-pm-k)" />${T(282, 312, ['program', 'counter'], { fs: 17, lh: 19 })}
        </g>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 5: drive the process state diagram ── */
  const SD = { new: [80, 40, 50], terminated: [355, 40, 72], ready: [125, 170, 62], running: [335, 170, 72], waiting: [220, 330, 70] };
  const SDE = [
    { k: 'admitted', from: 'new', to: 'ready', d: 'M90 66 Q96 110 112 144', lab: [114, 114, ['admitted'], 'start'] },
    { k: 'scheduler dispatch', from: 'ready', to: 'running', d: 'M172 188 Q228 246 288 190', lab: [230, 250, ['scheduler', 'dispatch'], 'middle'] },
    { k: 'interrupt', from: 'running', to: 'ready', d: 'M290 150 Q228 86 170 150', lab: [268, 96, ['interrupt'], 'middle'] },
    { k: 'I/O or event wait', from: 'running', to: 'waiting', d: 'M332 196 Q338 292 288 320', lab: [350, 244, ['I/O or', 'event', 'wait'], 'start'] },
    { k: 'I/O or event completion', from: 'waiting', to: 'ready', d: 'M158 322 Q118 292 122 198', lab: [4, 240, ['I/O or', 'event', 'completion'], 'start'] },
    { k: 'exit', from: 'running', to: 'terminated', d: 'M362 145 Q384 104 366 68', lab: [388, 112, ['exit'], 'start'] }
  ];
  const SDM = {
    new: ['<b>new</b>: the process is being created.', '<b>new</b>: الـ process بتتعمل (being created).'],
    ready: ['<b>ready</b>: the process is waiting to be assigned to a processor.', '<b>ready</b>: الـ process مستنية تتخصص لـ processor.'],
    running: ['<b>running</b>: instructions are being executed.', '<b>running</b>: الـ instructions بتتنفذ.'],
    waiting: ['<b>waiting</b>: the process is waiting for some event to occur.', '<b>waiting</b>: الـ process مستنية event معينة تحصل.'],
    terminated: ['<b>terminated</b>: the process has finished execution.', '<b>terminated</b>: الـ process خلصت تنفيذ.']
  };
  const SDA = { 'admitted': 'admitted', 'scheduler dispatch': 'scheduler dispatch', 'interrupt': 'interrupt', 'I/O or event wait': 'I/O or event wait', 'I/O or event completion': 'I/O or event completion', 'exit': 'exit' };
  function StateDiagram({ ar }) {
    const [cur, setCur] = useState('new'), [last, setLast] = useState(null), [path, setPath] = useState(['new']);
    const go = e => { setCur(e.to); setLast(e.k); setPath(p => p.concat(e.to).slice(-8)); };
    const out = SDE.filter(e => e.from === cur);
    const m = SDM[cur];
    const en = (last ? 'Took <b>' + last + '</b>. Now ' : 'As a process executes, it changes <b>state</b>. <b>Try it:</b> press a transition below. Now ') + m[0];
    const a = (last ? 'حصل <b>' + SDA[last] + '</b>. دلوقتي ' : 'والـ process شغالة، الـ <b>state</b> بتاعتها بتتغير. <b>جرّب:</b> دوس على transition تحت. دلوقتي ') + m[1];
    return html`<figure className="fig fo3"><div className="fig-stage">
      <svg viewBox="0 0 440 364" role="img" aria-label="Process state diagram: new, ready, running, waiting, terminated">
        <defs>${mk('fo3-sd-a', G)}${mk('fo3-sd-k', K)}</defs>
        ${SDE.map(e => { const on = e.k === last; return html`<g key=${e.k}><path d=${e.d} fill="none" stroke=${on ? K : G} strokeWidth=${on ? 4 : 2} markerEnd=${on ? 'url(#fo3-sd-k)' : 'url(#fo3-sd-a)'} className="fo3-hot" />
          ${T(e.lab[0], e.lab[1], e.lab[2], { a: e.lab[3], fw: on ? 700 : 400 })}</g>`; })}
        ${Object.keys(SD).map(s => { const [x, y, rx] = SD[s], on = s === cur; return html`<g key=${s}><ellipse className="fo3-hot" cx=${x} cy=${y} rx=${rx} ry="26" fill=${on ? HI : BOX} stroke=${on ? K : G} strokeWidth=${on ? 4 : 1.5} />
          ${T(x, y + 7, [s], { fw: on ? 700 : 400 })}</g>`; })}
      </svg>
      <p className="fo3-muted" style=${{ textAlign: 'center', margin: '6px 0 0' }}>Path: ${path.join(' → ')}</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fo3-acts"><span className="lab">${cur === 'terminated' ? 'The process has finished.' : 'Transitions out of ' + cur + ':'}</span>
        ${out.map(e => html`<button key=${e.k} className="fig-btn solid" onClick=${() => go(e)}>${e.k} → ${e.to}</button>`)}
        <span style=${{ flex: 1 }}></span><button className="fig-btn" onClick=${() => { setCur('new'); setLast(null); setPath(['new']); }}>↻ New process</button></div></figure>`;
  }

  /* ── slide 6: the PCB, tap a field ── */
  const PCBF = [
    ['process state', 0, 'Process state: running, waiting, etc.', 'الـ Process state: running أو waiting إلخ.'],
    ['process number', 0, 'Process number: the process is identified and managed via a process identifier (PID).', 'الـ Process number: الـ process بتتعرف وتتدار عن طريق الـ process identifier (PID).'],
    ['program counter', 0, 'Program counter: location of instruction to next execute.', 'الـ Program counter: مكان الـ instruction اللي هتتنفذ بعد كده.'],
    ['registers', 1, 'CPU registers: contents of all process-centric registers.', 'الـ CPU registers: محتوى كل الـ registers الخاصة بالـ process.'],
    ['memory limits', 0, 'Memory-management information: memory allocated to the process.', 'الـ Memory-management information: الـ memory المتخصصة للـ process.'],
    ['list of open files', 0, 'I/O status information: I/O devices allocated to process, list of open files.', 'الـ I/O status information: الـ I/O devices المتخصصة للـ process، وليستة الـ open files.'],
    ['• • •', 1, 'The rest of the PCB also holds <b>CPU scheduling information</b> (priorities, scheduling queue pointers) and <b>accounting information</b> (CPU used, clock time elapsed since start, time limits).', 'باقي الـ PCB فيه كمان <b>CPU scheduling information</b> (الـ priorities والـ scheduling queue pointers) و<b>accounting information</b> (الـ CPU المستخدم، والوقت اللي عدى من البداية، والـ time limits).']
  ];
  function Pcb({ ar }) {
    const [sel, setSel] = useState(null), [seen, setSeen] = useState({});
    const pick = k => { setSel(k); setSeen(s => Object.assign({}, s, { [k]: 1 })); };
    const n = Object.keys(seen).length;
    const m = sel == null ? { en: 'The <b>PCB</b> (Process Control Block, also called task control block) is the information associated with each process. <b>Tap a field</b> to see what it holds.', ar: 'الـ <b>PCB</b> (Process Control Block، واسمه كمان task control block) هو المعلومات المرتبطة بكل process. <b>دوس على أي خانة</b> عشان تشوف فيها إيه.' } : { en: PCBF[sel][2], ar: PCBF[sel][3] };
    return html`<figure className="fig fo3"><div className="fig-stage">
      <div className="fo3-pcb" role="group" aria-label="Process control block">
        ${PCBF.map((f, k) => html`<button key=${k} className=${(f[1] ? 'tall ' : '') + (sel === k ? 'on ' : '') + (seen[k] ? 'seen' : '')} onClick=${() => pick(k)} aria-pressed=${sel === k}>${f[0]}</button>`)}</div>
      <p className="fo3-muted" style=${{ textAlign: 'center', margin: '8px 0 0' }}>Fields explored: ${n} of ${PCBF.length}</p></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setSel(null); setSeen({}); }}>↻ Start over</button></div></figure>`;
  }

  /* ── slide 7: CPU switch from process to process ── */
  function CpuSwitch({ ar }) {
    const steps = [
      { en: '<b>Process P0</b> is executing; process P1 is idle.', ar: 'الـ <b>process P0</b> شغالة (executing)؛ والـ process P1 واقفة (idle).', s: ['executing', '', 'idle'] },
      { en: 'An <b>interrupt or system call</b> passes control to the operating system. P0 stops executing.', ar: 'بيحصل <b>interrupt أو system call</b> فالتحكم بيروح للـ operating system. الـ P0 بتقف.', s: ['idle', 'interrupt or system call', 'idle'] },
      { en: 'The OS <b>saves the state of P0 into PCB0</b>.', ar: 'الـ OS <b>بيحفظ الـ state بتاعة P0 في PCB0</b>.', s: ['idle', 'save state into PCB0', 'idle'] },
      { en: '... then <b>reloads the state of P1 from PCB1</b>. While the OS switches, neither process runs: context-switch time is overhead; the system does no useful work while switching.', ar: '... وبعدين <b>بيحمّل الـ state بتاعة P1 من PCB1</b>. وهو بيبدّل مفيش ولا process شغالة: وقت الـ context switch ده overhead، السيستم مابيعملش شغل مفيد وهو بيبدّل.', s: ['idle', 'reload state from PCB1', 'idle'] },
      { en: '<b>Process P1</b> is executing; P0 is idle.', ar: 'الـ <b>process P1</b> شغالة؛ والـ P0 واقفة (idle).', s: ['idle', '', 'executing'] },
      { en: 'Another <b>interrupt or system call</b>: the OS <b>saves the state of P1 into PCB1</b>.', ar: '<b>interrupt أو system call</b> تاني: الـ OS <b>بيحفظ الـ state بتاعة P1 في PCB1</b>.', s: ['idle', 'save state into PCB1', 'idle'] },
      { en: '... then <b>reloads the state of P0 from PCB0</b>.', ar: '... وبعدين <b>بيحمّل الـ state بتاعة P0 من PCB0</b>.', s: ['idle', 'reload state from PCB0', 'idle'] },
      { en: '<b>P0 is executing again</b>, from where it stopped; P1 is idle. The context of a process is represented in its PCB.', ar: 'الـ <b>P0 رجعت تشتغل تاني</b> من المكان اللي وقفت عنده؛ والـ P1 واقفة. الـ context بتاع الـ process بيتمثل في الـ PCB بتاعها.', s: ['executing', '', 'idle'] }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    const box = (y, txt, on, show) => html`<g className=${pop(show)}><rect className="fo3-hot" x="102" y=${y} width="236" height="40" fill=${on ? HI : BOX} stroke=${on ? K : G} strokeWidth=${on ? 3 : 1.5} />${T(220, y + 27, [txt], { fw: on ? 700 : 400 })}</g>`;
    const dots = (y, show) => html`<g className=${pop(show)}>${[0, 1, 2].map(k => html`<circle key=${k} cx="220" cy=${y + k * 14} r="3.5" fill=${INK} />`)}</g>`;
    const bar = (x, y1, y2, ex, show) => html`<path d=${'M' + x + ' ' + y1 + ' V' + y2} stroke=${ex ? K : G} strokeWidth=${ex ? 9 : 4} markerEnd=${ex ? 'url(#fo3-cs-k)' : ''} className=${pop(show)} />`;
    const S = steps[i].s;
    return html`<figure className="fig fo3"><div className="fig-stage">
      <div className="fo3-st">${['process P0', 'operating system', 'process P1'].map((h, k) => html`<div key=${k} className=${S[k] === 'executing' || (k === 1 && S[1]) ? 'ex' : ''}>${h}<span>${S[k] || '·'}</span></div>`)}</div>
      <svg viewBox="0 0 440 552" role="img" aria-label="CPU switch from process P0 to process P1 and back">
        <defs>${mk('fo3-cs-a', INK)}${mk('fo3-cs-k', K)}</defs>
        <rect x="0" y="0" width="440" height="40" fill="color-mix(in srgb, var(--k-os) 14%, var(--paper))" />
        <text x="6" y="27" fontSize="21">process P0</text><text x="220" y="27" textAnchor="middle" fontSize="21">operating system</text><text x="434" y="27" textAnchor="end" fontSize="21">process P1</text>
        ${bar(40, 50, 80, true, true)}${bar(40, 84, 460, false, i >= 1)}${bar(40, 466, 540, true, i >= 7)}
        ${bar(400, 84, 230, false, true)}${bar(400, 234, 310, true, i >= 4)}${bar(400, 314, 452, false, i >= 5)}
        <g className=${pop(i >= 1)}>${T(220, 70, ['interrupt or system call'])}<path d="M48 82 L100 98" stroke=${INK} strokeWidth="2" fill="none" markerEnd="url(#fo3-cs-a)" /></g>
        ${box(84, 'save state into PCB0', i === 2, i >= 2)}${dots(140, i >= 3)}${box(182, 'reload state from PCB1', i === 3, i >= 3)}
        <path d="M220 222 V244 H320 L392 234" stroke=${INK} strokeWidth="2" fill="none" markerEnd="url(#fo3-cs-a)" className=${pop(i >= 4)} />
        <g className=${pop(i >= 5)}>${T(220, 302, ['interrupt or system call'])}<path d="M392 314 L342 330" stroke=${INK} strokeWidth="2" fill="none" markerEnd="url(#fo3-cs-a)" /></g>
        ${box(314, 'save state into PCB1', i === 5, i >= 5)}${dots(370, i >= 6)}${box(412, 'reload state from PCB0', i === 6, i >= 6)}
        <path d="M220 452 V476 H120 L50 466" stroke=${INK} strokeWidth="2" fill="none" markerEnd="url(#fo3-cs-a)" className=${pop(i >= 7)} />
      </svg>
      <div className="fo3-leg"><span><i style=${{ height: '8px', background: K }}></i>executing</span><span><i style=${{ height: '3px', background: G }}></i>idle</span></div></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 9: ready queue and various I/O device queues ── */
  const DQ = [
    { name: 'ready queue', y: 36, pcbs: ['PCB7', 'PCB2'], reg: true, st: 1 },
    { name: 'mag tape unit 0', y: 214, pcbs: [], st: 3 },
    { name: 'mag tape unit 1', y: 296, pcbs: [], st: 3 },
    { name: 'disk unit 0', y: 404, pcbs: ['PCB3', 'PCB14', 'PCB6'], st: 4 },
    { name: 'terminal unit 0', y: 580, pcbs: ['PCB5'], st: 5 }
  ];
  function DeviceQueues({ ar }) {
    const steps = [
      { en: 'The scheduler keeps <b>scheduling queues</b>. Each queue has a <b>queue header</b> with a <b>head</b> and a <b>tail</b> pointer.', ar: 'الـ scheduler بيحتفظ بـ <b>scheduling queues</b>. كل queue ليها <b>queue header</b> فيه pointer للـ <b>head</b> و pointer للـ <b>tail</b>.' },
      { en: '<b>Ready queue</b> (processes in main memory, ready and waiting to execute): head → PCB7 → PCB2. The ground sign after PCB2 means no next PCB.', ar: 'الـ <b>Ready queue</b> (الـ processes اللي في الـ main memory وجاهزة ومستنية تتنفذ): head ← PCB7 ← PCB2. علامة الـ ground بعد PCB2 معناها مفيش PCB بعدها.' },
      { en: 'The <b>tail</b> points to the last PCB in the queue, PCB2.', ar: 'الـ <b>tail</b> بيشاور على آخر PCB في الـ queue، وهو PCB2.' },
      { en: '<b>mag tape unit 0</b> and <b>mag tape unit 1</b> are empty: their head and tail point to nothing.', ar: 'الـ <b>mag tape unit 0</b> والـ <b>mag tape unit 1</b> فاضيين: الـ head والـ tail بتوعهم مش بيشاوروا على حاجة.' },
      { en: '<b>disk unit 0</b> is a device queue (processes waiting for an I/O device): head → PCB3 → PCB14 → PCB6; tail → PCB6.', ar: 'الـ <b>disk unit 0</b> دي device queue (processes مستنية I/O device): head ← PCB3 ← PCB14 ← PCB6؛ والـ tail ← PCB6.' },
      { en: '<b>terminal unit 0</b> holds one process, so head and tail both point to PCB5. Processes migrate among the various queues.', ar: 'الـ <b>terminal unit 0</b> فيها process واحدة، فالـ head والـ tail الاتنين بيشاوروا على PCB5. والـ processes بتتنقل بين الـ queues المختلفة.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const gnd = (x, y) => html`<path d=${`M${x - 14} ${y} H${x} M${x} ${y - 10} V${y + 10} M${x + 4} ${y - 6} V${y + 6} M${x + 8} ${y - 3} V${y + 3}`} stroke=${INK} strokeWidth="2" fill="none" />`;
    const row = (r, k) => {
      const y = r.y, show = i >= r.st, on = i === r.st || (r.st === 1 && i === 2), h = r.reg ? 100 : 90, n = r.pcbs.length, X = j => 114 + j * 104, lx = X(n - 1);
      return html`<g key=${k}>
        ${n ? T(10, y - 10, [r.name], { a: 'start', fw: on ? 700 : 400 }) : T(126, y + 38, [r.name], { a: 'start', fw: on ? 700 : 400 })}
        <rect x="10" y=${y} width="90" height="30" fill=${on ? HI : 'color-mix(in srgb, var(--k-os) 12%, var(--paper))'} stroke=${on ? K : G} strokeWidth=${on ? 2.5 : 1.5} className="fo3-hot" />
        <rect x="10" y=${y + 30} width="90" height="30" fill=${on && (r.st !== 1 || i === 2) ? HI : BOX} stroke=${on ? K : G} strokeWidth=${on ? 2.5 : 1.5} className="fo3-hot" />
        ${T(50, y + 22, ['head'], { fs: 21 })}${T(50, y + 52, ['tail'], { fs: 21 })}
        ${!n && html`<g className=${pop(show)}>${gnd(104, y + 15)}${gnd(104, y + 45)}</g>`}
        ${n > 0 && html`<g className=${pop(show)}>
          <path d=${`M88 ${y + 15} H${X(0) - 1}`} stroke=${INK} strokeWidth="2" markerEnd="url(#fo3-dq-a)" />
          ${r.pcbs.map((p, j) => html`<g key=${p}>
            <rect x=${X(j)} y=${y} width="94" height=${h} fill=${BOX} stroke=${G} strokeWidth="1.5" />
            <rect x=${X(j)} y=${y} width="94" height="30" fill="color-mix(in srgb, var(--k-os) 12%, var(--paper))" stroke=${G} strokeWidth="1.5" />
            ${T(X(j) + 40, y + 22, [p], { fw: 600 })}
            ${r.reg ? html`<g><path d=${`M${X(j)} ${y + 60} h94`} stroke=${G} strokeWidth="1.5" />${T(X(j) + 47, y + 52, ['registers'], { fs: 21 })}${[0, 1, 2].map(d => html`<circle key=${d} cx=${X(j) + 47} cy=${y + 70 + d * 10} r="3" fill=${INK} />`)}</g>`
              : html`<path d=${`M${X(j)} ${y + 55} h94`} stroke=${G} strokeWidth="1.5" />`}
            ${j < n - 1 ? html`<path d=${`M${X(j) + 84} ${y + 15} H${X(j + 1) - 1}`} stroke=${INK} strokeWidth="2" markerEnd="url(#fo3-dq-a)" />` : gnd(X(j) + 108, y + 15)}
            <circle cx=${X(j) + 84} cy=${y + 15} r="3" fill=${INK} /></g>`)}</g>`}
        ${n > 0 && html`<path className=${pop(r.st === 1 ? i >= 2 : show)} d=${n === 1 ? `M88 ${y + 45} L${X(0) - 1} ${y + 40}` : `M88 ${y + 45} C120 ${y + h + 44}, ${lx - 30} ${y + h + 44}, ${lx + 18} ${y + h + 2}`} fill="none" stroke=${on ? K : INK} strokeWidth=${on ? 3 : 2} markerEnd=${on ? 'url(#fo3-dq-k)' : 'url(#fo3-dq-a)'} />`}
      </g>`;
    };
    return html`<figure className="fig fo3"><div className="fig-stage">
      <svg viewBox="0 0 440 716" role="img" aria-label="Ready queue and various I/O device queues as linked lists of PCBs">
        <defs>${mk('fo3-dq-a', INK)}${mk('fo3-dq-k', K)}</defs>
        ${DQ.map(row)}
        ${[0, 1, 2].map(k => html`<circle key=${k} cx="55" cy=${686 + k * 11} r="3" fill=${INK} />`)}
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 10: queueing diagram, send a process around it ── */
  const QR = { x: 120, y: 41, at: 'rq' }, QC = { x: 345, y: 41, at: 'cpu' };
  const qBack = [{ x: 14, y: 52 }, { x: 40, y: 52 }, QR];
  const qDown = [{ x: 368, y: 56 }, { x: 412, y: 56 }];
  const QP = {
    io: [...qDown, { x: 412, y: 110 }, { x: 331, y: 110, at: 'ioreq' }, { x: 331, y: 110, at: 'ioreq' }, { x: 181, y: 110, at: 'ioq' }, { x: 181, y: 110, at: 'ioq' }, { x: 70, y: 110, at: 'io' }, { x: 70, y: 110, at: 'io' }, { x: 14, y: 110 }, ...qBack],
    slice: [...qDown, { x: 412, y: 190 }, { x: 331, y: 190, at: 'slice' }, { x: 331, y: 190, at: 'slice' }, { x: 14, y: 190 }, ...qBack],
    fork: [...qDown, { x: 412, y: 275 }, { x: 331, y: 275, at: 'fork' }, { x: 331, y: 275, at: 'fork' }, { x: 160, y: 275, at: 'child' }, { x: 160, y: 275, at: 'child' }, { x: 14, y: 275 }, ...qBack],
    intr: [...qDown, { x: 412, y: 360 }, { x: 331, y: 360, at: 'wait' }, { x: 331, y: 360, at: 'wait' }, { x: 160, y: 360, at: 'occurs' }, { x: 160, y: 360, at: 'occurs' }, { x: 14, y: 360 }, ...qBack],
    end: [{ x: 373, y: 34, at: 'end' }, { x: 440, y: 34, hide: true, at: 'gone' }]
  };
  const QM = {
    start: ['The <b>queueing diagram</b> represents queues, resources, flows. <b>Try it:</b> press <b>New process</b>.', 'الـ <b>queueing diagram</b> بيمثل الـ queues والـ resources والـ flows. <b>جرّب:</b> دوس <b>New process</b>.'],
    rq: ['The process waits in the <b>ready queue</b>: in main memory, ready and waiting to execute.', 'الـ process مستنية في الـ <b>ready queue</b>: في الـ main memory، جاهزة ومستنية تتنفذ.'],
    cpu: ['The process is on the <b>CPU</b>. What happens next?', 'الـ process على الـ <b>CPU</b>. إيه اللي هيحصل بعد كده؟'],
    io: ['<b>I/O request</b>: the process waits in the <b>I/O queue</b> (a device queue), gets its <b>I/O</b>, then goes back to the ready queue.', '<b>I/O request</b>: الـ process بتستنى في الـ <b>I/O queue</b> (device queue)، وتاخد الـ <b>I/O</b> بتاعها، وبعدين ترجع للـ ready queue.'],
    slice: ['<b>Time slice expired</b>: the process goes straight back to the ready queue.', '<b>Time slice expired</b>: الـ process بترجع على طول للـ ready queue.'],
    fork: ['<b>Fork a child</b>: the <b>child executes</b>, then the process goes back to the ready queue.', '<b>Fork a child</b>: الـ <b>child بيتنفذ</b>، وبعدين الـ process بترجع للـ ready queue.'],
    intr: ['<b>Wait for an interrupt</b>: when the <b>interrupt occurs</b>, the process goes back to the ready queue.', '<b>Wait for an interrupt</b>: لما الـ <b>interrupt يحصل</b>، الـ process بترجع للـ ready queue.'],
    end: ['The process leaves the CPU and ends.', 'الـ process بتسيب الـ CPU وبتخلص.']
  };
  function Queueing({ ar }) {
    const [p, busy, run, reset] = useToken(), [where, setWhere] = useState('out'), [msg, setMsg] = useState('start');
    const go = (pts, w, m) => { setMsg(m); setWhere('moving'); run(pts, () => setWhere(w)); };
    const enter = () => go([{ x: 4, y: 30, jump: true }, { x: 40, y: 30 }, QR], 'rq', 'rq');
    const hot = id => p.at === id && !p.hide;
    const bx = (id, x, y, w, h, lines) => html`<g><rect className="fo3-hot" x=${x} y=${y} width=${w} height=${h} fill=${hot(id) ? HI : BOX} stroke=${hot(id) ? K : G} strokeWidth=${hot(id) ? 3 : 1.5} />${T(x + w / 2, y + h / 2 + (lines.length > 1 ? -4 : 7), lines, { fw: hot(id) ? 700 : 400 })}</g>`;
    const el = (id, cx, cy, rx, ry, lines) => html`<g><ellipse className="fo3-hot" cx=${cx} cy=${cy} rx=${rx} ry=${ry} fill=${hot(id) ? HI : 'color-mix(in srgb, var(--k-os) 10%, var(--paper))'} stroke=${hot(id) ? K : G} strokeWidth=${hot(id) ? 3 : 1.5} />${T(cx, cy + (lines.length > 1 ? -4 : 7), lines, { fw: hot(id) ? 700 : 400 })}</g>`;
    const ln = d => html`<path d=${d} fill="none" stroke=${INK} strokeWidth="2" markerEnd="url(#fo3-qd-a)" />`;
    const m = QM[msg];
    return html`<figure className="fig fo3"><div className="fig-stage">
      <svg viewBox="0 0 440 400" role="img" aria-label="Queueing diagram: ready queue, CPU, I/O request, I/O queue, I/O, time slice expired, fork a child, child executes, wait for an interrupt, interrupt occurs">
        <defs>${mk('fo3-qd-a', INK)}</defs>
        ${ln('M2 30 H38')}${ln('M14 360 V52 H38')}${ln('M200 41 H315')}${ln('M373 34 H436')}
        <path d="M366 56 H412 V360" fill="none" stroke=${INK} strokeWidth="2" />
        ${ln('M412 110 H402')}${ln('M262 110 H242')}${ln('M122 110 H100')}<path d="M42 110 H14" stroke=${INK} strokeWidth="2" />
        ${ln('M412 190 H402')}<path d="M262 190 H14" stroke=${INK} strokeWidth="2" />
        ${ln('M412 275 H402')}${ln('M262 275 H222')}<path d="M100 275 H14" stroke=${INK} strokeWidth="2" />
        ${ln('M412 360 H402')}${ln('M262 360 H222')}<path d="M100 360 H14" stroke=${INK} strokeWidth="2" />
        ${bx('rq', 40, 20, 160, 42, ['ready queue'])}${el('cpu', 345, 41, 28, 28, ['CPU'])}
        ${bx('ioreq', 262, 90, 138, 40, ['I/O request'])}${bx('ioq', 122, 90, 118, 40, ['I/O queue'])}${el('io', 70, 110, 28, 28, ['I/O'])}
        ${bx('slice', 262, 164, 138, 54, ['time slice', 'expired'])}
        ${bx('fork', 262, 249, 138, 54, ['fork a', 'child'])}${el('child', 160, 275, 60, 32, ['child', 'executes'])}
        ${bx('wait', 262, 334, 138, 54, ['wait for an', 'interrupt'])}${el('occurs', 160, 360, 60, 32, ['interrupt', 'occurs'])}
        <${Tok} p=${p} />
      </svg></div>
      <${Cap} en=${m[0]} ar=${m[1]} showAr=${ar} />
      <div className="fo3-acts">
        ${where === 'out' && html`<button className="fig-btn solid" onClick=${enter}>New process</button>`}
        ${where === 'rq' && html`<button className="fig-btn solid" onClick=${() => go([{ x: 200, y: 41 }, QC], 'cpu', 'cpu')}>ready queue → CPU</button>`}
        ${where === 'cpu' && html`<span className="lab">From the CPU:</span>
          <button className="fig-btn solid" onClick=${() => go(QP.io, 'rq', 'io')}>I/O request</button>
          <button className="fig-btn solid" onClick=${() => go(QP.slice, 'rq', 'slice')}>time slice expired</button>
          <button className="fig-btn solid" onClick=${() => go(QP.fork, 'rq', 'fork')}>fork a child</button>
          <button className="fig-btn solid" onClick=${() => go(QP.intr, 'rq', 'intr')}>wait for an interrupt</button>
          <button className="fig-btn" onClick=${() => go(QP.end, 'out', 'end')}>leave (end)</button>`}
        ${where === 'moving' && html`<span className="lab">…</span>`}
        <span style=${{ flex: 1 }}></span><button className="fig-btn" disabled=${busy} onClick=${() => { reset(); setWhere('out'); setMsg('start'); }}>↻ Start over</button></div></figure>`;
  }

  /* ── slide 12: addition of medium-term scheduling (swapping) ── */
  const MR = { x: 185, y: 160, at: 'rq' }, MC = { x: 328, y: 160, at: 'cpu' }, MS = { x: 220, y: 40, at: 'sw' };
  const MP = {
    io: [{ x: 352, y: 174 }, { x: 416, y: 174 }, { x: 416, y: 258 }, { x: 305, y: 258, at: 'iowq' }, { x: 305, y: 258, at: 'iowq' }, { x: 152, y: 258, at: 'io' }, { x: 152, y: 258, at: 'io' }, { x: 70, y: 258 }, { x: 70, y: 176 }, { x: 108, y: 176 }, MR],
    out: [{ x: 356, y: 152 }, { x: 370, y: 152 }, { x: 370, y: 40 }, { x: 352, y: 40 }, MS],
    in: [{ x: 90, y: 40 }, { x: 40, y: 40 }, { x: 40, y: 145 }, { x: 108, y: 145 }, MR],
    end: [{ x: 356, y: 152 }, { x: 440, y: 152, hide: true, at: 'gone' }]
  };
  const MM = {
    start: ['<b>Medium-term scheduler</b> can be added if the degree of multiple programming needs to decrease. <b>Try it:</b> press <b>New process</b>.', 'الـ <b>Medium-term scheduler</b> ممكن يتضاف لو الـ degree of multiple programming محتاجة تقل. <b>جرّب:</b> دوس <b>New process</b>.'],
    rq: ['The process is in the <b>ready queue</b>.', 'الـ process في الـ <b>ready queue</b>.'],
    cpu: ['The process is on the <b>CPU</b>. Send it to I/O, swap it out, or let it end.', 'الـ process على الـ <b>CPU</b>. ابعتها للـ I/O، أو اعملها swap out، أو سيبها تخلص.'],
    io: ['It waits in the <b>I/O waiting queues</b>, does its <b>I/O</b>, then returns to the ready queue.', 'بتستنى في الـ <b>I/O waiting queues</b>، وتعمل الـ <b>I/O</b> بتاعها، وبعدين ترجع للـ ready queue.'],
    out: ['<b>Swap out</b>: remove the process from memory and store it on disk. It joins the <b>partially executed swapped-out processes</b>, so the degree of multiprogramming decreases.', '<b>Swap out</b>: نشيل الـ process من الـ memory ونخزنها على الـ disk. بتنضم للـ <b>partially executed swapped-out processes</b>، فالـ degree of multiprogramming بتقل.'],
    in: ['<b>Swap in</b>: bring it back in from disk to continue execution. Removing and bringing back is <b>swapping</b>.', '<b>Swap in</b>: نرجعها من الـ disk عشان تكمل تنفيذ. الشيل والإرجاع ده اسمه <b>swapping</b>.'],
    end: ['The process leaves the CPU: <b>end</b>.', 'الـ process بتسيب الـ CPU: <b>end</b>.']
  };
  function MediumTerm({ ar }) {
    const [p, busy, run, reset] = useToken(), [where, setWhere] = useState('out'), [msg, setMsg] = useState('start');
    const go = (pts, w, m, after) => { setMsg(m); setWhere('moving'); run(pts, () => { setWhere(w); if (after) setMsg(after); }); };
    const hot = id => p.at === id && !p.hide;
    const bx = (id, x, y, w, h, lines) => html`<g><rect className="fo3-hot" x=${x} y=${y} width=${w} height=${h} fill=${hot(id) ? HI : BOX} stroke=${hot(id) ? K : G} strokeWidth=${hot(id) ? 3 : 1.5} />${T(x + w / 2, y + h / 2 + (lines.length > 1 ? -4 : 7), lines, { fw: hot(id) ? 700 : 400 })}</g>`;
    const el = (id, cx, cy, lines) => html`<g><circle className="fo3-hot" cx=${cx} cy=${cy} r="28" fill=${hot(id) ? HI : 'color-mix(in srgb, var(--k-os) 10%, var(--paper))'} stroke=${hot(id) ? K : G} strokeWidth=${hot(id) ? 3 : 1.5} />${T(cx, cy + 7, lines, { fw: hot(id) ? 700 : 400 })}</g>`;
    const ln = (d, on) => html`<path d=${d} fill="none" stroke=${on ? K : INK} strokeWidth=${on ? 3 : 2} markerEnd=${on ? 'url(#fo3-mt-k)' : 'url(#fo3-mt-a)'} />`;
    const m = MM[msg];
    return html`<figure className="fig fo3"><div className="fig-stage">
      <svg viewBox="0 0 440 300" role="img" aria-label="Medium-term scheduling: swap out from the CPU path to partially executed swapped-out processes, swap in back to the ready queue">
        <defs>${mk('fo3-mt-a', INK)}${mk('fo3-mt-k', K)}</defs>
        ${ln('M90 40 H40 V145 H108', msg === 'in')}${T(46, 88, ['swap', 'in'], { a: 'start', fw: msg === 'in' ? 700 : 400 })}
        ${ln('M370 152 V40 H352', msg === 'out')}${T(376, 88, ['swap', 'out'], { a: 'start', fw: msg === 'out' ? 700 : 400 })}
        ${ln('M2 160 H108')}${ln('M260 160 H298')}${ln('M356 152 H392')}${T(396, 158, ['end'], { a: 'start' })}
        ${ln('M352 174 H416 V258 H382')}${ln('M230 258 H182')}${ln('M124 258 H70 V176 H108')}
        ${bx('sw', 90, 10, 260, 60, ['partially executed', 'swapped-out processes'])}
        ${bx('rq', 110, 135, 150, 50, ['ready queue'])}${el('cpu', 328, 160, ['CPU'])}
        ${bx('iowq', 230, 230, 150, 56, ['I/O waiting', 'queues'])}${el('io', 152, 258, ['I/O'])}
        <${Tok} p=${p} />
      </svg></div>
      <${Cap} en=${m[0]} ar=${m[1]} showAr=${ar} />
      <div className="fo3-acts">
        ${where === 'out' && html`<button className="fig-btn solid" onClick=${() => go([{ x: 4, y: 160, jump: true }, MR], 'rq', 'rq')}>New process</button>`}
        ${where === 'rq' && html`<button className="fig-btn solid" onClick=${() => go([{ x: 260, y: 160 }, MC], 'cpu', 'cpu')}>ready queue → CPU</button>`}
        ${where === 'cpu' && html`<span className="lab">From the CPU:</span>
          <button className="fig-btn solid" onClick=${() => go(MP.io, 'rq', 'io')}>I/O</button>
          <button className="fig-btn solid" onClick=${() => go(MP.out, 'sw', 'out')}>swap out</button>
          <button className="fig-btn" onClick=${() => go(MP.end, 'out', 'end')}>end</button>`}
        ${where === 'sw' && html`<button className="fig-btn solid" onClick=${() => go(MP.in, 'rq', 'in')}>swap in</button>`}
        ${where === 'moving' && html`<span className="lab">…</span>`}
        <span style=${{ flex: 1 }}></span><button className="fig-btn" disabled=${busy} onClick=${() => { reset(); setWhere('out'); setMsg('start'); }}>↻ Start over</button></div></figure>`;
  }

  /* ── slides 17–18: fork(), exec(), wait(), exit(), abort(); zombie and orphan ── */
  function ForkLife({ ar }) {
    const [par, setPar] = useState('run'), [ch, setCh] = useState(null), [cas, setCas] = useState(false), [msg, setMsg] = useState(null);
    const say = (en, a) => setMsg({ en, ar: a });
    const fork = () => { setCh({ prog: 'dup', st: 'run' }); say('<b>fork()</b> system call creates a new process. The child is a <b>duplicate of the parent</b> (first type of address space).', 'الـ <b>fork()</b> system call بيعمل process جديدة. الـ child <b>نسخة من الـ parent</b> (أول نوع من الـ address space).'); };
    const exec = () => { setCh(c => Object.assign({}, c, { prog: 'new' })); say('<b>exec()</b> system call, used after a fork(), replaces the process\' memory space with a <b>new program</b>: the child has a program loaded into it (second type).', 'الـ <b>exec()</b> system call، بيتستخدم بعد الـ fork()، بيبدّل الـ memory space بتاعة الـ process بـ <b>program جديد</b>: الـ child بقى فيه program متحمّل (تاني نوع).'); };
    const wait = () => {
      if (ch && ch.st === 'zombie') { setCh(null); say('<b>pid = wait(&amp;status);</b> returns the status information and the pid of the terminated child. Its resources are deallocated by the operating system.', 'الـ <b>pid = wait(&amp;status);</b> بيرجّع الـ status والـ pid بتاع الـ child اللي خلص. والـ resources بتاعته الـ OS بيرجعها (deallocated).'); return; }
      setPar('wait'); say('The parent calls <b>wait()</b>: the parent waits until the child terminates.', 'الـ parent بينادي <b>wait()</b>: الـ parent بيستنى لحد ما الـ child يخلص.');
    };
    const cexit = () => {
      if (par === 'wait') { setCh(null); setPar('run'); say('The child executes its last statement and asks the OS to delete it using <b>exit()</b>. Status data returns from child to parent via wait(): <b>pid = wait(&amp;status);</b> gives the status and the pid. The child\'s resources are deallocated by the OS.', 'الـ child بينفذ آخر statement ويطلب من الـ OS يمسحه بـ <b>exit()</b>. الـ status بيرجع من الـ child للـ parent عن طريق wait(): الـ <b>pid = wait(&amp;status);</b> بيدي الـ status والـ pid. والـ resources بتاعة الـ child الـ OS بيرجعها.'); return; }
      setCh(c => Object.assign({}, c, { st: 'zombie' })); say('The child called <b>exit()</b>, but no parent is waiting (it did not invoke wait()): the child is a <b>zombie</b>. Press the parent\'s wait() to collect it.', 'الـ child نادى <b>exit()</b>، بس مفيش parent مستني (ماندهش wait()): الـ child بقى <b>zombie</b>. دوس wait() بتاعة الـ parent عشان يلمّه.');
    };
    const abort = () => { setCh(null); say('The parent terminates the child using <b>abort()</b>. Some reasons: the child has exceeded allocated resources; the task assigned to the child is no longer required; the parent is exiting and the OS does not allow a child to continue if its parent terminates.', 'الـ parent بينهي الـ child بـ <b>abort()</b>. من الأسباب: الـ child عدّى الـ resources المتخصصة له؛ الـ task اللي مع الـ child مبقتش مطلوبة؛ الـ parent خارج والـ OS مابيسمحش لـ child يكمل لو الـ parent بتاعه خلص.'); };
    const pexit = () => {
      setPar('end');
      if (ch && ch.st === 'run') {
        if (cas) { setCh(null); say('The parent called <b>exit()</b>. This OS does not allow a child to exist if its parent has terminated: <b>cascading termination</b>. All children, grandchildren, etc. are terminated; the termination is initiated by the operating system.', 'الـ parent نادى <b>exit()</b>. الـ OS ده مابيسمحش إن child يفضل موجود لو الـ parent خلص: <b>cascading termination</b>. كل الـ children والـ grandchildren إلخ بيخلصوا؛ والـ OS هو اللي بيبدأ الإنهاء.'); }
        else { setCh(c => Object.assign({}, c, { st: 'orphan' })); say('The parent terminated without invoking <b>wait()</b>: the child is an <b>orphan</b>.', 'الـ parent خلص من غير ما ينادي <b>wait()</b>: الـ child بقى <b>orphan</b>.'); }
        return;
      }
      say('The parent executes its last statement and asks the OS to delete it using <b>exit()</b>; its resources are deallocated by the OS.', 'الـ parent بينفذ آخر statement ويطلب من الـ OS يمسحه بـ <b>exit()</b>؛ والـ resources بتاعته الـ OS بيرجعها.');
    };
    const reset = () => { setPar('run'); setCh(null); setMsg(null); };
    const m = msg || { en: 'A <b>parent</b> process creates <b>children</b> processes. <b>Try it:</b> press <b>fork()</b>, then try exec(), wait() and exit() in different orders.', ar: 'الـ <b>parent</b> process بتعمل <b>children</b> processes. <b>جرّب:</b> دوس <b>fork()</b>، وبعدين جرّب exec() و wait() و exit() بترتيبات مختلفة.' };
    const chip = (st) => { const L = { run: ['running', 'run'], wait: ['waiting in wait()', 'wait'], end: ['terminated', 'end'], zombie: ['zombie', 'zom'], orphan: ['orphan', 'orph'] }[st]; return html`<span className=${'fo3-chip ' + L[1]}>${L[0]}</span>`; };
    const B = (txt, fn, ok) => html`<button className="fig-btn" onClick=${fn} disabled=${!ok}>${txt}</button>`;
    const pr = par === 'run';
    return html`<figure className="fig fo3"><div className="fig-stage">
      <div className="fo3-fk">
        <div className=${'fo3-pr' + (par === 'end' ? ' gone' : '')}><span className="hd">Parent</span>${chip(par)}
          <div className="fo3-mem">parent's program</div>
          <div className="bt">${B('fork()', fork, pr && !ch)}${B('wait()', wait, pr && !!ch && ch.st !== 'orphan')}${B('abort()', abort, pr && !!ch && ch.st === 'run')}${B('exit()', pexit, pr && !(ch && ch.st === 'zombie'))}</div></div>
        ${ch ? html`<div className=${'fo3-pr' + (ch.st === 'zombie' ? ' gone' : '')}><span className="hd">Child</span>${chip(ch.st)}
          <div className=${'fo3-mem' + (ch.prog === 'new' ? ' nw' : '')}>${ch.prog === 'new' ? 'new program' : "duplicate of parent's program"}</div>
          <div className="bt">${B('exec()', exec, ch.st === 'run' && ch.prog === 'dup')}${B('exit()', cexit, ch.st === 'run' && par !== 'end')}</div></div>`
        : html`<div className="fo3-pr none"><span className="hd">Child</span><span>${par === 'end' ? '' : 'no child yet: press fork()'}</span></div>`}
      </div>
      <label className="fo3-opt"><input type="checkbox" checked=${cas} onChange=${e => setCas(e.target.checked)} /><span>OS does not allow a child to exist if its parent has terminated (cascading termination)</span></label></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} />
      <div className="fig-bar"><span className="fo3-muted">Execution options: parent and children execute concurrently, or the parent waits until children terminate.</span><span className="grow"></span><button className="fig-btn" onClick=${reset}>↻ Start over</button></div></figure>`;
  }

  /* ── slide 19: Chrome, each tab represents a separate process ── */
  const TABS = ['Wiley::Operating System Con…', 'BBC - Homepage', 'The New York Times - Break…', 'Google Chrome - The web i…'];
  function Chrome({ ar }) {
    const [mode, setMode] = useState('multi'), [sel, setSel] = useState(3), [dead, setDead] = useState({}), [msg, setMsg] = useState(null);
    const all = mode === 'single' && Object.keys(dead).length > 0;
    const isDead = k => all || !!dead[k];
    const trouble = () => {
      setDead(d => Object.assign({}, d, { [sel]: 1 }));
      if (mode === 'single') setMsg({ en: 'Many web browsers ran as a <b>single process</b> (some still do): if one web site causes trouble, the <b>entire browser can hang or crash</b>. Every tab is lost.', ar: 'متصفحات كتير كانت شغالة كـ <b>process واحدة</b> (وفيه لسه كده): لو موقع واحد عمل مشكلة، <b>المتصفح كله ممكن يهنّج أو يقع</b>. كل التابات راحت.' });
      else setMsg({ en: 'Only this tab\'s <b>renderer process</b> is lost. The browser process and the other renderers keep running: <b>each tab represents a separate process</b>.', ar: 'الـ <b>renderer process</b> بتاعة التاب ده بس هي اللي وقعت. الـ browser process وباقي الـ renderers شغالين عادي: <b>كل tab بتمثل process لوحدها</b>.' });
    };
    const setM = md => { setMode(md); setDead({}); setMsg(null); };
    const m = msg || (mode === 'multi'
      ? { en: 'Google Chrome is <b>multiprocess</b> with 3 different types of processes. <b>Try it:</b> pick a tab and make its web site cause trouble.', ar: 'الـ Google Chrome <b>multiprocess</b> وفيه 3 أنواع مختلفة من الـ processes. <b>جرّب:</b> اختار tab وخلّي الموقع بتاعها يعمل مشكلة.' }
      : { en: 'A <b>single-process</b> browser: all tabs live in one process. <b>Try it:</b> make one web site cause trouble.', ar: 'متصفح <b>single-process</b>: كل التابات في process واحدة. <b>جرّب:</b> خلّي موقع واحد يعمل مشكلة.' });
    const P = (nm, d, st, k) => html`<div key=${k} className=${'fo3-proc' + (st === false ? ' dead' : '')}><span className="nm">${nm}</span>${st != null && html`<span className="st">${st ? 'running' : 'crashed'}</span>`}${d && html`<span className="d">${d}</span>`}</div>`;
    return html`<figure className="fig fo3"><div className="fig-stage">
      <div className="fo3-seg" role="group" aria-label="Browser type">
        <button className=${'fig-btn' + (mode === 'multi' ? ' sel' : '')} onClick=${() => setM('multi')}>Chrome: multiprocess</button>
        <button className=${'fig-btn' + (mode === 'single' ? ' sel' : '')} onClick=${() => setM('single')}>Single-process browser</button></div>
      <div className="fo3-br">
        <div className="fo3-tabs" role="tablist">${TABS.map((t, k) => html`<button key=${k} role="tab" aria-selected=${sel === k} title=${t} className=${(sel === k ? 'on ' : '') + (isDead(k) ? 'dead' : '')} onClick=${() => setSel(k)}>${t}</button>`)}</div>
        <div className=${'fo3-page' + (isDead(sel) ? ' dead' : '')}>
          <span className="t">${isDead(sel) ? (all ? 'The whole browser crashed' : 'This tab\'s process crashed') : TABS[sel]}</span>
          ${!isDead(sel) && html`<button className="fig-btn solid" onClick=${trouble}>This web site causes trouble</button>`}</div></div>
      <p className="fo3-cap2">Each tab represents a separate process</p>
      <div className="fo3-procs">
        ${mode === 'multi' ? html`
          ${P('Browser process', 'manages user interface, disk and network I/O', true, 'b')}
          <div className="fo3-sand"><span className="h">Renderer processes: render web pages, deal with HTML, Javascript. They run in a sandbox restricting disk and network I/O, minimizing effect of security exploits.</span>
            ${TABS.map((t, k) => P('Renderer: ' + t, '', !dead[k], k))}</div>
          ${P('Plug-in process', 'one for each type of plug-in', null, 'p')}`
        : P('Browser (single process)', 'all tabs', !all, 's')}</div></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} />
      <div className="fig-bar"><span className="fo3-muted">A new renderer is created for each website opened.</span><span className="grow"></span><button className="fig-btn" onClick=${() => { setDead({}); setMsg(null); }}>↻ Start over</button></div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'os-proc-memory': ProcMemory, 'os-state-diagram': StateDiagram, 'os-pcb': Pcb, 'os-cpu-switch': CpuSwitch, 'os-device-queues': DeviceQueues, 'os-queueing': Queueing, 'os-medium-term': MediumTerm, 'os-fork-life': ForkLife, 'os-chrome': Chrome });
})();

/* ── part 4 ── */
// Operating Systems visuals, part 4: L3 CPU Scheduling (slides 2, 3, 6, 10–13, 15–18, 20–21, 23–27, 29, 30).
// Every label, number and caption comes from the slides or the site's notes for them.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, useSteps, Cap, Bar, pop, calm, useClock, useFit, sec } = window.FIGKIT;
  const CSS = `
.fo4 .fig-dots i.on{ background:var(--k-os); } .fo4 .fig-btn:hover{ border-color:var(--k-os); } .fo4 .fig-btn.solid{ background:var(--s-os); color:#fff; border-color:transparent; }
.fo4 .fig-btn.sel{ border-color:var(--k-os); box-shadow:0 0 0 1px var(--k-os); background:color-mix(in srgb, var(--k-os) 14%, var(--paper)); }
.fo4 .fig-btn:disabled{ opacity:.45; cursor:default; }
.fo4-muted{ color:var(--graphite); font-size:.85rem; }
.fo4-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.fo4-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
/* simulator */
.fo4-sim{ max-width:600px; margin:0 auto; color:var(--ink); }
.fo4-tblw{ overflow:hidden; }
.fo4-tbl{ border-collapse:collapse; margin:0 auto 4px; font-size:.92rem; }
.fo4-tbl th, .fo4-tbl td{ border:1px solid var(--line); padding:4px 7px; text-align:center; background:var(--paper); white-space:nowrap; }
.fo4-tbl th{ background:var(--paper-2); font-weight:600; font-size:.85rem; color:var(--graphite); }
.fo4-tbl td.res{ font-family:var(--mono); font-size:.86rem; }
.fo4-tbl td.res.off{ color:transparent; }
.fo4-tbl td.res.new{ background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.fo4-tbl input{ font:inherit; font-size:.92rem; width:3.1em; padding:3px 2px; text-align:center; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); box-sizing:border-box; }
.fo4-tbl input:focus{ outline:2px solid var(--k-os); outline-offset:1px; }
.fo4-tbl.ed th, .fo4-tbl.ed td{ padding:3px 4px; } .fo4-tbl.ed input{ width:2.7em; }
.fo4-tbl .x{ font:inherit; font-size:.9rem; border:0; background:transparent; color:var(--pen); cursor:pointer; padding:2px 4px; min-height:28px; }
.fo4-sw{ display:inline-block; width:10px; height:10px; border-radius:3px; margin-right:4px; vertical-align:0; }
.fo4-leg{ text-align:center; font-size:.8rem; color:var(--graphite); margin:0 0 10px; line-height:1.4; }
.fo4-q{ display:flex; gap:6px; align-items:center; justify-content:center; margin:0 0 10px; font-size:.92rem; }
.fo4-q b{ font-family:var(--mono); min-width:4.2em; text-align:center; }
.fo4-q .fig-btn{ min-width:34px; padding:4px 8px; }
.fo4-gantt{ padding:2px 10px 0 8px; }
.fo4-grow{ display:flex; margin:0 0 24px; }
.fo4-blk{ position:relative; box-sizing:border-box; height:36px; border:1.5px solid var(--graphite); margin-left:-1.5px; display:grid; place-items:center; font-size:.88rem; font-weight:600; color:var(--ink); opacity:0; transform:scaleX(.3); transform-origin:left center; transition:opacity .45s ease, transform .45s ease; }
.fo4-grow .fo4-blk:first-child{ margin-left:0; }
.fo4-blk.on{ opacity:1; transform:none; }
.fo4-blk.cur{ box-shadow:0 0 0 2px var(--k-os) inset; }
.fo4-blk.idle{ border-style:dashed; color:var(--graphite); font-weight:500; background:var(--paper); }
.fo4-blk .t0, .fo4-blk .t1{ position:absolute; top:38px; font:500 .8rem/1 var(--mono); color:var(--graphite); }
.fo4-blk .t0{ left:0; transform:translateX(-50%); } .fo4-blk .t1{ right:0; transform:translateX(50%); }
.fo4-sum{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 12px; font-size:.9rem; line-height:1.55; overflow-wrap:anywhere; transition:opacity .4s; }
.fo4-sum.off{ opacity:.35; }
.fo4-sum .f{ font-family:var(--mono); font-size:.84rem; }
.fo4-sum .big{ font-weight:700; color:var(--k-os); }
.fo4-ok{ margin-top:6px; padding:4px 8px; border-radius:6px; background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.fo4-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; font-size:.86rem; }
.fo4-chips button{ font:inherit; font-size:.86rem; border:1px solid var(--line); border-radius:99px; background:var(--paper); color:var(--ink); padding:4px 10px; cursor:pointer; min-height:30px; }
.fo4-chips button.min{ border-color:var(--ok); box-shadow:0 0 0 1px var(--ok); }
.fo4-chips button.sel{ background:color-mix(in srgb, var(--k-os) 16%, var(--paper)); }
.fo4-chips span{ font-family:var(--mono); font-weight:700; }
.fo4-nav{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; padding:0 14px 12px; }
.fo4-nav .grow{ flex:1; } .fo4-nav .cnt{ font-size:.84rem; color:var(--graphite); }
/* burst cycle */
.fo4-bc{ display:grid; grid-template-columns:minmax(0, 170px) auto; gap:0 10px; justify-content:center; max-width:360px; margin:0 auto; }
.fo4-bc .dots{ grid-column:1; text-align:center; font-size:1.2rem; line-height:.7; color:var(--graphite); letter-spacing:0; }
.fo4-bc .seg{ padding:6px 8px; font-size:.9rem; line-height:1.35; color:var(--ink); }
.fo4-bc .seg.io{ border:1.5px solid var(--graphite); border-radius:3px; text-align:center; font-style:italic; margin:6px 0; background:var(--paper); }
.fo4-bc .seg.io.c1{ background:color-mix(in srgb, #0284C7 18%, var(--paper)); } .fo4-bc .seg.io.c3{ background:color-mix(in srgb, var(--graphite) 22%, var(--paper)); }
.fo4-bc .seg.cpu b{ font-weight:700; }
.fo4-bc .lab{ display:flex; align-items:stretch; gap:6px; font-size:.88rem; color:var(--ink); }
.fo4-bc .lab i{ width:8px; border:2px solid var(--graphite); border-left:0; border-radius:0 9px 9px 0; margin:3px 0; }
.fo4-bc .lab span{ align-self:center; white-space:nowrap; }
.fo4-bc .cur{ box-shadow:0 0 0 2px var(--k-os); border-radius:4px; }
.fo4-bc .lab.cur{ box-shadow:none; color:var(--k-os); font-weight:700; } .fo4-bc .lab.cur i{ border-color:var(--k-os); }
/* state diagram */
.fo4-sd svg{ max-width:440px !important; }
.fo4-sd .st{ transition:fill .4s; }
.fo4-sd .ed{ transition:stroke .4s, stroke-width .4s; }
.fo4-sit{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:6px; max-width:520px; margin:10px auto 0; font-size:.84rem; line-height:1.3; }
.fo4-sit div{ border:1px solid var(--line); border-radius:8px; padding:5px 8px; background:var(--paper); opacity:.6; transition:opacity .3s, box-shadow .3s; }
.fo4-sit div b{ color:var(--pen); } .fo4-sit div.ch b{ color:var(--k-os); }
.fo4-sit div.on{ opacity:1; box-shadow:0 0 0 2px var(--k-os); }
.fo4-ev{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; padding:0 14px 12px; }
.fo4-ev .fig-btn{ font-size:.84rem; padding:4px 10px; }
/* dispatcher */
.fo4-dp{ display:grid; grid-template-columns:minmax(0, 170px) 96px; justify-content:center; max-width:340px; margin:0 auto; }
.fo4-dp .bx{ grid-column:1; border:1.5px solid var(--graphite); border-radius:3px; padding:8px 6px; text-align:center; font-size:.9rem; line-height:1.3; background:var(--paper); color:var(--ink); }
.fo4-dp .bx.ex{ background:color-mix(in srgb, #0284C7 16%, var(--paper)); }
.fo4-dp .bx.cur{ box-shadow:0 0 0 2px var(--k-os); }
.fo4-dp .arw{ grid-column:1; text-align:center; font-size:1.1rem; line-height:1.4; color:var(--graphite); }
.fo4-dp .br{ grid-column:2; grid-row:2 / 7; position:relative; margin-left:14px; }
.fo4-dp .br i{ position:absolute; left:0; top:0; width:10px; border:2px solid var(--graphite); border-left:0; transition:height .6s ease; }
.fo4-dp .br span{ position:absolute; left:16px; top:50%; transform:translateY(-50%); font-size:.86rem; line-height:1.25; color:var(--ink); transition:opacity .4s; }
.fo4-dp .br.hl i{ border-color:var(--k-os); } .fo4-dp .br.hl span{ color:var(--k-os); font-weight:700; }
/* multilevel queue */
.fo4-mq{ display:grid; grid-template-columns:auto minmax(0, 1fr); gap:10px 8px; align-items:center; max-width:420px; margin:0 auto; }
.fo4-mq .pl{ font-size:.9rem; white-space:nowrap; color:var(--ink); }
.fo4-mq .cells{ display:flex; }
.fo4-mq .cells span{ flex:0 1 40px; min-width:0; height:34px; display:grid; place-items:center; border:1.5px solid var(--graphite); margin-left:-1.5px; background:color-mix(in srgb, #0284C7 16%, var(--paper)); font-size:.88rem; color:var(--ink); transition:opacity .4s, background .4s; }
.fo4-mq .cells span:first-child{ margin-left:0; }
.fo4-mq .cells span.gone{ opacity:.25; background:var(--paper); }
.fo4-mq .cells span.cur{ background:color-mix(in srgb, var(--k-os) 40%, var(--paper)); box-shadow:0 0 0 2px var(--k-os); position:relative; }
.fo4-mq .vd{ grid-column:2; font-size:1.1rem; line-height:.9; color:var(--graphite); padding-left:12px; }
.fo4-mq .row.top .pl{ color:var(--k-os); font-weight:700; }
.fo4-pick{ text-align:center; margin:12px 0 0; font-size:.9rem; color:var(--ink); }
.fo4-pick span{ font-family:var(--mono); color:var(--k-os); font-weight:700; }
.fo4-mt{ max-width:460px; margin:0 auto; display:grid; gap:10px; }
.fo4-mt .hl{ font-size:.86rem; color:var(--graphite); }
.fo4-mt .q{ display:grid; grid-template-columns:30px minmax(0, 1fr) 30px; align-items:center; gap:4px; }
.fo4-mt .q i{ height:8px; border-radius:2px; background:linear-gradient(90deg, transparent, color-mix(in srgb, #0284C7 70%, var(--paper))); position:relative; }
.fo4-mt .q i::after{ content:""; position:absolute; right:-6px; top:-5px; border:9px solid transparent; border-left:9px solid color-mix(in srgb, #0284C7 70%, var(--paper)); border-right:0; }
.fo4-mt .q div{ padding:9px 6px; text-align:center; font-size:.9rem; color:var(--ink); background:color-mix(in srgb, #0284C7 var(--m), var(--paper)); border-radius:2px; }
.fo4-mt .q.on div{ box-shadow:0 0 0 2px var(--k-os); font-weight:700; }
/* MLFQ */
.fo4-fb{ max-width:420px; margin:0 auto; display:grid; gap:4px; }
.fo4-fb .lv{ display:grid; grid-template-columns:34px minmax(0, 1fr) 34px; align-items:center; gap:4px; }
.fo4-fb .qb{ border:1.5px solid var(--graphite); border-radius:3px; background:color-mix(in srgb, #0284C7 16%, var(--paper)); padding:6px; min-height:56px; display:grid; align-content:center; justify-items:center; gap:4px; font-size:.92rem; color:var(--ink); transition:box-shadow .3s; }
.fo4-fb .qb.on{ box-shadow:0 0 0 2px var(--k-os); }
.fo4-fb .arw{ text-align:center; font-size:1.2rem; color:var(--graphite); line-height:1; display:grid; justify-items:center; gap:3px; }
.fo4-fb .dn{ display:grid; grid-template-columns:34px minmax(0, 1fr); align-items:center; gap:4px; min-height:30px; }
.fo4-fb .dn .arw{ font-size:1.2rem; }
.fo4-tok{ display:inline-block; padding:3px 8px; border-radius:99px; background:var(--s-os); color:#fff; font-size:.8rem; font-weight:600; white-space:nowrap; animation:fo4in .4s ease both; }
.fo4-tok.done{ background:var(--ok); }
@keyframes fo4in{ from{ opacity:0; transform:scale(.6); } to{ opacity:1; transform:none; } }
.fo4-ctl{ display:flex; flex-wrap:wrap; gap:6px 10px; align-items:center; justify-content:center; margin:0 0 12px; font-size:.9rem; color:var(--ink); }
.fo4-ctl input[type=range]{ width:150px; accent-color:var(--k-os); }
.fo4-ctl b{ font-family:var(--mono); color:var(--k-os); }
@media (prefers-reduced-motion: reduce){ .fo4-blk, .fo4-sd .st, .fo4-dp .br i, .fo4-mq .cells span{ transition:none; } .fo4-tok{ animation:none; } }`;
  if (!document.getElementById('fo4-css')) { const s = document.createElement('style'); s.id = 'fo4-css'; s.textContent = CSS; document.head.appendChild(s); }

  // ── engine start ──
  // ps: [{ n, at, bt, pr }] in table order (equal arrival times are served in table order).
  // alg: 'fcfs' | 'sjf' | 'srtf' | 'rr' | 'prio' | 'priorr'. Returns { blocks: [{ p, s, e, en, ar }], ct: [] }.
  const fmtN = x => String(Math.round(x * 100) / 100);
  const joinEn = a => a.join(', '), joinAr = a => a.join('، ');
  function simulate(ps, alg, q) {
    const n = ps.length, rem = ps.map(p => p.bt), blocks = [], N = i => ps[i].n;
    const order = ps.map((_, i) => i).sort((a, b) => ps[a].at - ps[b].at || a - b);
    let t = 0, done = 0;
    const nextArr = () => Math.min.apply(null, ps.map((p, i) => rem[i] > 0 && p.at > t ? p.at : Infinity));
    const idle = t2 => { blocks.push({ p: -1, s: t, e: t2, en: `No process is in the ready queue: the CPU is idle from ${t} to ${t2}.`, ar: `مفيش process في الـ ready queue: الـ CPU فاضي من ${t} لـ ${t2}.` }); t = t2; };
    if (alg === 'fcfs' || alg === 'sjf' || alg === 'prio') {
      const key = alg === 'fcfs' ? () => 0 : alg === 'sjf' ? i => ps[i].bt : i => ps[i].pr;
      while (done < n) {
        const ready = order.filter(i => rem[i] > 0 && ps[i].at <= t);
        if (!ready.length) { idle(nextArr()); continue; }
        let c = ready[0]; for (const i of ready) if (key(i) < key(c)) c = i;
        const tie = ready.filter(i => key(i) === key(c)).length > 1;
        const s = t; t += ps[c].bt; rem[c] = 0; done++;
        let en, ar;
        if (alg === 'fcfs') {
          if (ready.length === 1) { en = `${N(c)} is the only process in the ready queue, so it gets the CPU and keeps it until its burst of ${ps[c].bt} ends: ${s} to ${t}.`; ar = `الـ ${N(c)} هي الـ process الوحيدة في الـ ready queue، فبتاخد الـ CPU وتفضل ماسكاه لحد ما الـ burst بتاعها (${ps[c].bt}) يخلص: من ${s} لـ ${t}.`; }
          else { const l = ready.map(N); en = `Ready queue, in order of arrival: ${joinEn(l)}. ${N(c)} came first, so it gets the CPU and keeps it until its burst of ${ps[c].bt} ends: ${s} to ${t}.`; ar = `الـ ready queue بترتيب الوصول: ${joinAr(l)}. الـ ${N(c)} جت الأول، فبتاخد الـ CPU وتفضل ماسكاه لحد ما الـ burst بتاعها (${ps[c].bt}) يخلص: من ${s} لـ ${t}.`; }
        } else if (alg === 'sjf') {
          const l = ready.map(i => `${N(i)} (${ps[i].bt})`);
          if (ready.length === 1) { en = `At t = ${s} only ${l[0]} is ready, so it runs to the end: ${s} to ${t}.`; ar = `عند t = ${s} الجاهزة بس ${l[0]}، فبتشتغل لحد ما تخلص: من ${s} لـ ${t}.`; }
          else { en = `At t = ${s} the ready processes and their next CPU bursts are ${joinEn(l)}. The shortest is ${N(c)} (${ps[c].bt})${tie ? ', first come among the equal ones' : ''}, so it runs to the end: ${s} to ${t}.`; ar = `عند t = ${s} الـ processes الجاهزة والـ CPU burst الجاي لكل واحدة: ${joinAr(l)}. الأقصر هي ${N(c)} (${ps[c].bt})${tie ? '، والتعادل بيتحل بالأسبق' : ''}، فبتشتغل لحد ما تخلص: من ${s} لـ ${t}.`; }
        } else {
          const l = ready.map(i => `${N(i)} (${ps[i].pr})`);
          if (ready.length === 1) { en = `At t = ${s} only ${l[0]} is ready, so it runs its burst of ${ps[c].bt}: ${s} to ${t}.`; ar = `عند t = ${s} الجاهزة بس ${l[0]}، فبتشغّل الـ burst بتاعها (${ps[c].bt}): من ${s} لـ ${t}.`; }
          else { en = `At t = ${s} the ready processes and their priorities are ${joinEn(l)}. The smallest integer is the highest priority: ${N(c)} (${ps[c].pr})${tie ? ', first come among the equal ones,' : ''} runs its burst of ${ps[c].bt}: ${s} to ${t}.`; ar = `عند t = ${s} الـ processes الجاهزة والـ priority بتاعتها: ${joinAr(l)}. أصغر رقم = أعلى priority: الـ ${N(c)} (${ps[c].pr})${tie ? ' (والتعادل بيتحل بالأسبق)' : ''} بتشغّل الـ burst بتاعها (${ps[c].bt}): من ${s} لـ ${t}.`; }
        }
        blocks.push({ p: c, s, e: t, en, ar });
      }
    } else if (alg === 'srtf') {
      let cur = -1;
      while (done < n) {
        const ready = order.filter(i => rem[i] > 0 && ps[i].at <= t);
        if (!ready.length) { const t2 = nextArr(); const last = blocks[blocks.length - 1]; idle(t2); cur = -1; continue; }
        let c = cur >= 0 && rem[cur] > 0 ? cur : ready[0];
        for (const i of ready) if (rem[i] < rem[c]) c = i;
        const last = blocks[blocks.length - 1];
        if (!last || last.p !== c) {
          blocks.push({ p: c, s: t, e: t, m: { arr: ready.filter(i => ps[i].at === t).map(N), fin: last && last.p >= 0 && rem[last.p] === 0 ? N(last.p) : null, rems: ready.map(i => [N(i), rem[i]]), pre: cur >= 0 && rem[cur] > 0 && cur !== c ? cur : -1, preRem: cur >= 0 ? rem[cur] : 0 } });
        }
        rem[c]--; t++; blocks[blocks.length - 1].e = t; if (!rem[c]) done++; cur = c;
      }
      for (const b of blocks) {
        if (b.p < 0) continue;
        const m = b.m, c = b.p;
        const during = ps.map((p, i) => i).filter(i => i !== c && ps[i].at > b.s && ps[i].at < b.e);
        let hEn = `At t = ${b.s}: `, hAr = `عند t = ${b.s}: `;
        if (m.fin) { hEn += `${m.fin} finishes. `; hAr += `الـ ${m.fin} بتخلص. `; }
        if (m.arr.length) { hEn += `${joinEn(m.arr)} ${m.arr.length > 1 ? 'arrive' : 'arrives'}. `; hAr += `${joinAr(m.arr)} ${m.arr.length > 1 ? 'بيوصلوا' : 'بتوصل'}. `; }
        const rl = m.rems.map(([x, r]) => `${x} ${r}`);
        let en = hEn + `Remaining times: ${joinEn(rl)}. `, ar = hAr + `الوقت الفاضل: ${joinAr(rl)}. `;
        if (m.pre >= 0) { en += `${N(c)} (${rem0(c, b)}) is shorter than what is left of ${N(m.pre)} (${m.preRem}), so ${N(m.pre)} is preempted. `; ar += `الـ ${N(c)} (${rem0(c, b)}) أقصر من اللي فاضل من ${N(m.pre)} (${m.preRem})، فـ ${N(m.pre)} بتتعملها preempt. `; }
        else if (m.rems.length > 1) { en += `The shortest is ${N(c)}. `; ar += `الأقصر هي ${N(c)}. `; }
        en += `${N(c)} runs ${b.s} to ${b.e}`; ar += `الـ ${N(c)} بتشتغل من ${b.s} لـ ${b.e}`;
        if (during.length) { const dl = during.map(i => `${N(i)} (${ps[i].bt})`); en += `; ${joinEn(dl)} ${during.length > 1 ? 'arrive' : 'arrives'} meanwhile but ${during.length > 1 ? 'are' : 'is'} not shorter than its remaining time`; ar += `؛ ${joinAr(dl)} ${during.length > 1 ? 'بيوصلوا' : 'بتوصل'} في النص بس مش أقصر من الفاضل منها`; }
        b.en = en + '.'; b.ar = ar + '.'; delete b.m;
      }
    } else if (alg === 'rr') {
      const Q = [], added = new Set();
      const add = up => { for (const i of order) if (!added.has(i) && ps[i].at <= up) { Q.push(i); added.add(i); } };
      add(0);
      while (done < n) {
        if (!Q.length) { idle(nextArr()); add(t); continue; }
        const c = Q.shift(), run = Math.min(q, rem[c]), s = t; t += run; rem[c] -= run; add(t);
        if (rem[c] > 0) Q.push(c); else done++;
        const ql = Q.map(N), qEn = ql.length ? `Ready queue now: ${joinEn(ql)}.` : 'The ready queue is now empty.', qAr = ql.length ? `الـ ready queue دلوقتي: ${joinAr(ql)}.` : 'الـ ready queue فاضية دلوقتي.';
        let en = `${N(c)} is at the head of the ready queue and runs ${s} to ${t}`, ar = `الـ ${N(c)} في أول الـ ready queue وبتشتغل من ${s} لـ ${t}`;
        if (rem[c] > 0) { en += ` (a full quantum, q = ${q}). The quantum expires with ${rem[c]} left, so it is preempted and added to the end of the ready queue. `; ar += ` (quantum كامل، q = ${q}). الـ quantum بيخلص وفاضل لها ${rem[c]}، فبتتعملها preempt وتتحط في آخر الـ ready queue. `; }
        else if (run < q) { en += ` and finishes before its quantum (q = ${q}) is used up. `; ar += ` وبتخلص قبل ما الـ quantum (q = ${q}) يخلص. `; }
        else { en += ` (q = ${q}) and finishes. `; ar += ` (q = ${q}) وبتخلص. `; }
        blocks.push({ p: c, s, e: t, en: en + qEn, ar: ar + qAr });
      }
    } else { // priority with round-robin
      const L = {}, added = new Set();
      const add = up => { for (const i of order) if (!added.has(i) && ps[i].at <= up) { (L[ps[i].pr] = L[ps[i].pr] || []).push(i); added.add(i); } };
      add(0);
      const raw = [];
      while (done < n) {
        const lv = Object.keys(L).map(Number).filter(k => L[k].length).sort((a, b) => a - b);
        if (!lv.length) { const t2 = nextArr(); raw.push({ p: -1, s: t, e: t2 }); t = t2; add(t); continue; }
        const peers = L[lv[0]].map(N), c = L[lv[0]].shift(), run = Math.min(q, rem[c]), s = t; t += run; rem[c] -= run; add(t);
        if (rem[c] > 0) L[lv[0]].push(c); else done++;
        raw.push({ p: c, s, e: t, peers, lvl: lv[0], left: rem[c] });
      }
      for (const r of raw) { const last = blocks[blocks.length - 1]; if (last && last.p === r.p) { last.e = r.e; last.left = r.left; last.k++; } else blocks.push(Object.assign({ k: 1 }, r)); }
      for (const b of blocks) {
        if (b.p < 0) { b.en = `No process is in the ready queue: the CPU is idle from ${b.s} to ${b.e}.`; b.ar = `مفيش process في الـ ready queue: الـ CPU فاضي من ${b.s} لـ ${b.e}.`; continue; }
        const c = N(b.p), fin = b.left === 0;
        if (b.peers.length === 1) {
          b.en = `The highest priority waiting is ${b.lvl}, and ${c} is the only process with it, so it keeps the CPU: ${b.s} to ${b.e}${fin ? ' and finishes' : ''}.`;
          b.ar = `أعلى priority مستنية هي ${b.lvl}، والـ ${c} هي الوحيدة اللي ليها الـ priority دي، فبتفضل ماسكة الـ CPU: من ${b.s} لـ ${b.e}${fin ? ' وبتخلص' : ''}.`;
        } else {
          b.en = `The highest priority waiting is ${b.lvl}: ${joinEn(b.peers)}. Same priority, so they run round-robin with q = ${q}: ${c} runs ${b.s} to ${b.e}${fin ? ' and finishes' : `, then goes to the end of the queue (${b.left} left)`}.`;
          b.ar = `أعلى priority مستنية هي ${b.lvl}: ${joinAr(b.peers)}. نفس الـ priority، فبيشتغلوا round-robin بـ q = ${q}: الـ ${c} بتشتغل من ${b.s} لـ ${b.e}${fin ? ' وبتخلص' : `، وبعدين بتروح آخر الـ queue (فاضل ${b.left})`}.`;
        }
        delete b.peers; delete b.lvl; delete b.left; delete b.k;
      }
    }
    const ct = ps.map(() => 0); blocks.forEach(b => { if (b.p >= 0) ct[b.p] = Math.max(ct[b.p], b.e); });
    return { blocks, ct };
    function rem0(c, b) { const m = b.m || {}; const r = (m.rems || []).find(x => x[0] === N(c)); return r ? r[1] : ps[c].bt; }
  }
  const ganttStr = (ps, blocks) => blocks.map(b => (b.p < 0 ? 'idle' : ps[b.p].n) + ' ' + b.s + '-' + b.e).join(', ');
  // ── engine end ──

  /* ── Scheduling simulators (slides 10–13, 15–18, 20–21, 23–25, 30) ── */
  const HUE = ['#7444D6', '#0E9F6E', '#D97706', '#DB2777', '#0284C7', '#65A30D', '#B45309', '#475569'];
  const pnum = name => parseInt(String(name).replace(/\D/g, ''), 10) || 1;
  const pbg = name => `color-mix(in srgb, ${HUE[(pnum(name) - 1) % HUE.length]} 30%, var(--paper))`;
  function useW(pad) {
    const ref = useRef(null), [w, setW] = useState(0);
    useEffect(() => { const el = ref.current; if (!el) return; const f = () => setW(Math.max(0, el.clientWidth - pad)); f(); if (!window.ResizeObserver) return; const ro = new ResizeObserver(f); ro.observe(el); return () => ro.disconnect(); }, []);
    return [ref, w];
  }
  // proportional widths with a minimum per block; rows break where the chart no longer fits
  function layout(blocks, W, M) {
    if (!blocks.length || W <= 0) return [];
    const d = blocks.map(b => b.e - b.s), tot = d.reduce((a, b) => a + b, 0);
    const f = U => d.reduce((a, x) => a + Math.max(x * U, M), 0);
    let U = W / tot;
    if (blocks.length * M < W) { let lo = 0, hi = W; for (let k = 0; k < 40; k++) { const mid = (lo + hi) / 2; if (f(mid) <= W) lo = mid; else hi = mid; } U = lo; }
    const rows = []; let row = [], cum = 0;
    blocks.forEach((b, j) => { const w = Math.floor(Math.max(d[j] * U, M)); if (row.length && cum + w > W + .5) { rows.push(row); row = []; cum = 0; } row.push({ b, w, j, first: !row.length }); cum += w; });
    if (row.length) rows.push(row);
    return rows;
  }
  function Gantt({ ps, blocks, shown, cur }) {
    const [ref, W] = useW(18);
    const rows = layout(blocks, W, 30);
    return html`<div className="fo4-gantt" ref=${ref} role="img" aria-label=${'Gantt chart: ' + (shown ? ganttStr(ps, blocks.slice(0, shown)) : 'empty')}>
      ${rows.map((r, k) => html`<div className="fo4-grow" key=${k}>${r.map(({ b, w, j, first }) => html`<div key=${j} className=${'fo4-blk' + (j < shown ? ' on' : '') + (j === cur ? ' cur' : '') + (b.p < 0 ? ' idle' : '')} style=${{ width: w + 'px', background: b.p < 0 ? undefined : pbg(ps[b.p].n) }}>${b.p < 0 ? 'idle' : ps[b.p].n}${first ? html`<span className="t0">${b.s}</span>` : null}<span className="t1">${b.e}</span></div>`)}</div>`)}
    </div>`;
  }
  function useRun(n, ms, sig, atEnd) {
    const [i, setI] = useState(atEnd || calm() ? n - 1 : 0), [play, setPlay] = useState(!atEnd && !calm());
    const first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(atEnd || calm() ? n - 1 : 0); setPlay(!atEnd && !calm()); }, [sig]);
    const ii = Math.min(i, n - 1);
    useEffect(() => { if (!play) return; if (ii >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => Math.min(x, n - 1) + 1), ms); return () => clearTimeout(t); }, [ii, play, n]);
    return [ii, { replay: () => { setI(0); setPlay(!calm()); }, go: j => { setPlay(false); setI(j); } }];
  }
  const ALG = { fcfs: 'FCFS', sjf: 'SJF', srtf: 'SRTF', rr: 'RR', prio: 'Priority', priorr: 'Priority + RR' };
  const INTRO = {
    fcfs: () => ({ en: '<b>First-Come, First-Served</b>: the processes get the CPU in the order they arrive, and each keeps it until its CPU burst ends. Watch the Gantt chart being drawn, or press Next.', ar: 'الـ <b>First-Come, First-Served</b>: الـ processes بتاخد الـ CPU بترتيب وصولها، وكل واحدة بتفضل ماسكاه لحد ما الـ CPU burst بتاعها يخلص. اتفرج على الـ Gantt chart وهو بيترسم، أو دوس Next.' }),
    sjf: () => ({ en: '<b>Shortest-Job-First</b>: associate with each process the length of its next CPU burst, and schedule the process with the shortest time. SJF is optimal: it gives the minimum average waiting time.', ar: 'الـ <b>Shortest-Job-First</b>: بنربط كل process بطول الـ CPU burst الجاي بتاعها، ونشغّل الأقصر. الـ SJF هو الـ optimal: بيدّي أقل متوسط waiting time.' }),
    srtf: () => ({ en: '<b>Preemptive SJF</b> (shortest-remaining-time-first): now we add the concepts of varying arrival times and preemption. A process that arrives with a shorter burst than what is left of the running one preempts it.', ar: 'الـ <b>Preemptive SJF</b> (shortest-remaining-time-first): دلوقتي بنضيف فكرة أوقات الوصول المختلفة والـ preemption. الـ process اللي توصل بـ burst أقصر من اللي فاضل من الشغالة بتعملها preempt.' }),
    rr: q => ({ en: `<b>Round Robin</b>, time quantum q = ${q}: each process gets a small unit of CPU time; after it has elapsed, the process is preempted and added to the end of the ready queue.`, ar: `الـ <b>Round Robin</b>، الـ time quantum q = ${q}: كل process بتاخد حتة صغيرة من وقت الـ CPU؛ ولما تخلص بتتعملها preempt وتتحط في آخر الـ ready queue.` }),
    prio: () => ({ en: '<b>Priority scheduling</b>: the CPU is allocated to the process with the highest priority (smallest integer = highest priority).', ar: 'الـ <b>Priority scheduling</b>: الـ CPU بيروح للـ process اللي ليها أعلى priority (أصغر رقم = أعلى priority).' }),
    priorr: q => ({ en: `<b>Priority with round-robin</b>: run the process with the highest priority. Processes with the same priority run round-robin (time quantum = ${q}).`, ar: `الـ <b>Priority مع round-robin</b>: شغّل الـ process اللي ليها أعلى priority. والـ processes اللي ليها نفس الـ priority بتشتغل round-robin (time quantum = ${q}).` })
  };
  const LIM = { at: [0, 30], bt: [1, 30], pr: [0, 20] };
  function runAll(ps, alg, q) {
    const r = simulate(ps, alg, q), n = ps.length;
    const tat = ps.map((p, i) => r.ct[i] - p.at), wt = tat.map((x, i) => x - ps[i].bt);
    const byName = ps.map((_, i) => i).sort((a, b) => pnum(ps[a].n) - pnum(ps[b].n));
    const formula = arr => { const v = byName.map(i => arr[i]), s = v.reduce((a, b) => a + b, 0); return `(${v.join(' + ')})/${n} = ${s}/${n} = ${fmtN(s / n)}`; };
    return Object.assign(r, { tat, wt, byName, avgW: fmtN(wt.reduce((a, b) => a + b, 0) / n), fW: formula(wt), fT: formula(tat) });
  }
  function Sim({ ar, cfg }) {
    const P = cfg.presets;
    const [pi, setPi] = useState(0), [rows, setRows] = useState(P[0].rows), [q, setQ] = useState(P[0].q || 2), [alg, setAlg] = useState(cfg.algs[0]), [edit, setEdit] = useState(false);
    const load = j => { setPi(j); setRows(P[j].rows); if (P[j].q) setQ(P[j].q); };
    const ps = rows.map(r => ({ n: r[0], at: r[1], bt: r[2], pr: r[3] }));
    const hasQ = alg === 'rr' || alg === 'priorr';
    const R = runAll(ps, alg, q), B = R.blocks, nSteps = B.length + 2;
    const pre = P[pi], exp = pre && pre.expect[alg];
    const match = !!exp && JSON.stringify(rows) === JSON.stringify(pre.rows) && ganttStr(ps, B) === exp[0] && R.avgW === exp[1];
    const sig = JSON.stringify([rows, alg, hasQ ? q : 0]);
    const [i, ctl] = useRun(nSteps, 1700, sig, edit);
    const shown = Math.min(i, B.length), cur = i >= 1 && i <= B.length ? i - 1 : -1, fin = i === nSteps - 1;
    const lastIdx = ps.map((_, k) => { let m = -1; B.forEach((b, j) => { if (b.p === k) m = j; }); return m; });
    const showAT = alg === 'srtf' || edit || ps.some(p => p.at > 0), showPr = !!cfg.pr;
    const set = (k, f, v) => { const lim = LIM[f], x = Math.round(Number(v)); if (v === '' || !isFinite(x)) return; const c = Math.min(lim[1], Math.max(lim[0], x)); setRows(rows.map((r, j) => { if (j !== k) return r; const nr = r.slice(); nr[{ at: 1, bt: 2, pr: 3 }[f]] = c; return nr; })); };
    const addRow = () => { const used = new Set(rows.map(r => pnum(r[0]))); let m = 1; while (used.has(m)) m++; setRows(rows.concat([['P' + m, 0, 3, showPr ? 1 : undefined]])); };
    const delRow = k => setRows(rows.filter((_, j) => j !== k));
    const cell = (k, f, v) => edit ? html`<td><input type="number" inputMode="numeric" min=${LIM[f][0]} max=${LIM[f][1]} value=${v} aria-label=${ps[k].n + ' ' + { at: 'arrival time', bt: 'burst time', pr: 'priority' }[f]} onFocus=${e => e.target.select()} onChange=${e => set(k, f, e.target.value)} /></td>` : html`<td>${v}</td>`;
    const res = (k, v) => { const vis = lastIdx[k] >= 0 && lastIdx[k] < shown; return html`<td className=${'res' + (vis ? '' : ' off') + (vis && lastIdx[k] === cur ? ' new' : '')}>${vis ? v : '·'}</td>`; };
    const table = html`<div className="fo4-tblw"><table className=${'fo4-tbl' + (edit ? ' ed' : '')}><thead><tr>${edit && rows.length > 1 ? html`<th></th>` : null}<th>P</th>${showAT ? html`<th>AT</th>` : null}<th>BT</th>${showPr ? html`<th>Pr</th>` : null}${edit ? null : html`<th>CT</th><th>TAT</th><th>WT</th>`}</tr></thead>
      <tbody>${ps.map((p, k) => html`<tr key=${p.n}>${edit && rows.length > 1 ? html`<td><button className="x" onClick=${() => delRow(k)} aria-label=${'Remove ' + p.n}>×</button></td>` : null}<td><span className="fo4-sw" style=${{ background: HUE[(pnum(p.n) - 1) % HUE.length] }}></span>${p.n}</td>${showAT ? cell(k, 'at', p.at) : null}${cell(k, 'bt', p.bt)}${showPr ? cell(k, 'pr', p.pr) : null}${edit ? null : html`${res(k, R.ct[k])}${res(k, R.tat[k])}${res(k, R.wt[k])}`}</tr>`)}</tbody></table></div>
      <p className="fo4-leg">${showAT ? 'AT arrival time · ' : ''}BT burst time${showPr ? ' · Pr priority (smallest = highest)' : ''}${edit ? '' : ' · CT completion time · TAT = CT − AT · WT = TAT − BT'}${edit ? html`<br />Equal arrival times are served in table order.` : null}</p>
      ${edit && rows.length < 6 ? html`<div className="fo4-row"><button className="fig-btn" onClick=${addRow}>+ Add process</button></div>` : null}`;
    const srcEn = pre && pre.src === 'notes' ? 'the worked answer in the notes' : 'slide ' + (pre && pre.slide), srcAr = pre && pre.src === 'notes' ? 'الحل في الـ notes' : 'slide ' + (pre && pre.slide);
    const maxB = Math.max.apply(null, ps.map(p => p.bt));
    const cmp = cfg.algs.length > 1 ? cfg.algs.map(a => ({ a, v: runAll(ps, a, q).avgW })) : null;
    const minV = cmp && Math.min.apply(null, cmp.map(c => Number(c.v)));
    let cap;
    if (i === 0) cap = INTRO[alg](q);
    else if (!fin) cap = { en: B[i - 1].en, ar: B[i - 1].ar };
    else {
      const w = R.byName.map(k => `${ps[k].n} = ${R.wt[k]}`);
      cap = { en: `Waiting time for ${w.join('; ')}. Average waiting time = ${R.fW}.`, ar: `الـ waiting time: <span dir="ltr">${w.join('; ')}</span>. متوسط الـ waiting time = <span dir="ltr">${R.fW}</span>.` };
      if (alg === 'rr' && q >= maxB) { cap.en += ' q is at least as long as every burst, so RR gives the FCFS chart (q large ⇒ FIFO).'; cap.ar += ' الـ q أطول من أو بيساوي كل الـ bursts، فالـ RR بيدّي نفس chart الـ FCFS (q large ⇒ FIFO).'; }
      if (cmp) { const best = cmp.filter(c => Number(c.v) === minV).map(c => ALG[c.a]).join(', '); cap.en += ` Minimum average waiting time: ${best} (${fmtN(minV)}).`; cap.ar += ` أقل متوسط waiting time: ${best} (${fmtN(minV)}).`; }
      if (match) { cap.en += ` <b>Same Gantt chart and average as ${srcEn}.</b>`; cap.ar += ` <b>نفس الـ Gantt chart والمتوسط اللي في ${srcAr}.</b>`; }
    }
    if (edit && i !== 0) { cap = { en: 'Change the arrival times, bursts' + (showPr ? ', priorities' : '') + (hasQ ? ' or the quantum' : '') + ', or add and remove processes. The chart and the times update at once; press Done to watch it being drawn. ' + cap.en, ar: 'غيّر أوقات الوصول أو الـ bursts' + (showPr ? ' أو الـ priorities' : '') + (hasQ ? ' أو الـ quantum' : '') + '، أو زوّد وشيل processes. الـ chart والأوقات بتتحدث على طول؛ دوس Done عشان تتفرج عليه وهو بيترسم. ' + cap.ar }; }
    return html`<figure className="fig fo4"><div className="fig-stage"><div className="fo4-sim">
      ${cmp ? html`<div className="fo4-chips" role="tablist">${cmp.map(c => html`<button key=${c.a} role="tab" aria-selected=${alg === c.a} className=${(alg === c.a ? 'sel' : '') + (Number(c.v) === minV ? ' min' : '')} onClick=${() => setAlg(c.a)}>${ALG[c.a]}${c.a === 'rr' ? ` (q = ${q})` : ''} <span>${c.v}</span></button>`)}</div><p className="fo4-leg">Average waiting time of each algorithm (tap one to draw it)</p>` : null}
      <div className="fo4-row">${P.map((p, j) => html`<button key=${j} className=${'fig-btn' + (pi === j && JSON.stringify(rows) === JSON.stringify(p.rows) ? ' sel' : '')} onClick=${() => load(j)}>${p.label}</button>`)}
        <button className=${'fig-btn' + (edit ? ' solid' : '')} onClick=${() => { if (edit) { setEdit(false); ctl.replay(); } else { setEdit(true); ctl.go(nSteps - 1); } }}>${edit ? '✓ Done' : '✎ Edit the table'}</button></div>
      ${hasQ ? html`<div className="fo4-q"><span>Time quantum</span><button className="fig-btn" onClick=${() => setQ(Math.max(1, q - 1))} disabled=${q <= 1} aria-label="Smaller quantum">−</button><b>q = ${q}</b><button className="fig-btn" onClick=${() => setQ(Math.min(30, q + 1))} disabled=${q >= 30} aria-label="Larger quantum">+</button></div>` : null}
      ${table}
      <${Gantt} ps=${ps} blocks=${B} shown=${shown} cur=${cur} />
      ${fin ? html`<div className="fo4-sum"><div>Average waiting time = <span className="f big">${R.fW}</span></div><div>Average turnaround time = <span className="f">${R.fT}</span></div>${match ? html`<div className="fo4-ok">✓ Same Gantt chart and average as ${srcEn}.</div>` : null}</div>` : html`<div className="fo4-sum off"><span className="fo4-muted">The averages appear when the chart is complete.</span></div>`}
    </div></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} />
      <div className="fo4-nav"><span className="cnt">Step ${i + 1} of ${nSteps}</span><span className="grow"></span>
        <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
        <button className="fig-btn" onClick=${() => ctl.go(Math.min(nSteps - 1, i + 1))} disabled=${fin} aria-label="Next step">Next ›</button>
        <button className="fig-btn" onClick=${() => ctl.go(nSteps - 1)} disabled=${fin}>End »</button>
        <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div></figure>`;
  }
  const T = (rows, at) => rows.map(r => [r[0], at ? r[1] : 0, at ? r[2] : r[1]].concat(at ? r.slice(3) : r.slice(2)));
  const SIMS = {
    fcfs: { algs: ['fcfs'], presets: [
      { label: 'Slide 11: P1, P2, P3', slide: 11, rows: T([['P1', 24], ['P2', 3], ['P3', 3]]), expect: { fcfs: ['P1 0-24, P2 24-27, P3 27-30', '17'] } },
      { label: 'Slide 13: P2, P3, P1', slide: 13, rows: T([['P2', 3], ['P3', 3], ['P1', 24]]), expect: { fcfs: ['P2 0-3, P3 3-6, P1 6-30', '3'] } }] },
    sjf: { algs: ['sjf'], presets: [{ label: 'Slide 16 example', slide: 16, rows: T([['P1', 6], ['P2', 8], ['P3', 7], ['P4', 3]]), expect: { sjf: ['P4 0-3, P1 3-9, P3 9-16, P2 16-24', '7'] } }] },
    srtf: { algs: ['srtf'], presets: [{ label: 'Slide 18 example', slide: 18, rows: T([['P1', 0, 8], ['P2', 1, 4], ['P3', 2, 9], ['P4', 3, 5]], true), expect: { srtf: ['P1 0-1, P2 1-5, P4 5-10, P1 10-17, P3 17-26', '6.5'] } }] },
    rr: { algs: ['rr'], presets: [{ label: 'Slide 21: q = 4', slide: 21, q: 4, rows: T([['P1', 24], ['P2', 3], ['P3', 3]]), expect: { rr: ['P1 0-4, P2 4-7, P3 7-10, P1 10-14, P1 14-18, P1 18-22, P1 22-26, P1 26-30', '5.67'] } }] },
    prio: { algs: ['prio'], pr: true, presets: [{ label: 'Slide 24 example', slide: 24, rows: T([['P1', 10, 3], ['P2', 1, 1], ['P3', 2, 4], ['P4', 1, 5], ['P5', 5, 2]]), expect: { prio: ['P2 0-1, P5 1-6, P1 6-16, P3 16-18, P4 18-19', '8.2'] } }] },
    priorr: { algs: ['priorr'], pr: true, presets: [{ label: 'Slide 25: q = 2', slide: 25, q: 2, rows: T([['P1', 4, 3], ['P2', 5, 2], ['P3', 8, 2], ['P4', 7, 1], ['P5', 3, 3]]), expect: { priorr: ['P4 0-7, P2 7-9, P3 9-11, P2 11-13, P3 13-15, P2 15-16, P3 16-20, P1 20-22, P5 22-24, P1 24-26, P5 26-27', '13.8'] } }] },
    review: { algs: ['fcfs', 'sjf', 'rr', 'prio'], pr: true, presets: [{ label: 'Slide 30, question 4', src: 'notes', q: 1, rows: T([['P1', 10, 3], ['P2', 3, 1], ['P3', 2, 2], ['P4', 1, 4]]), expect: {
      fcfs: ['P1 0-10, P2 10-13, P3 13-15, P4 15-16', '9.5'], sjf: ['P4 0-1, P3 1-3, P2 3-6, P1 6-16', '2.5'],
      rr: ['P1 0-1, P2 1-2, P3 2-3, P4 3-4, P1 4-5, P2 5-6, P3 6-7, P1 7-8, P2 8-9, P1 9-10, P1 10-11, P1 11-12, P1 12-13, P1 13-14, P1 14-15, P1 15-16', '5'], prio: ['P2 0-3, P3 3-5, P1 5-15, P4 15-16', '5.75'] } }] }
  };
  const mk = k => ({ ar }) => html`<${Sim} ar=${ar} cfg=${SIMS[k]} />`;

  /* ── slide 2: CPU–I/O burst cycle ── */
  const BC = [
    { cpu: [['load store', ''], ['add store', ''], ['read', ' from file']] }, { io: 1 },
    { cpu: [['store increment', ''], ['index', ''], ['write', ' to file']] }, { io: 2 },
    { cpu: [['load store', ''], ['add store', ''], ['read', ' from file']] }, { io: 3 }
  ];
  function BurstCycle({ ar }) {
    const steps = [
      { en: 'Process execution consists of a <b>cycle</b> of CPU execution and I/O wait (the CPU–I/O Burst Cycle).', ar: 'تنفيذ الـ process عبارة عن <b>cycle</b> من تنفيذ على الـ CPU وانتظار I/O (الـ CPU–I/O Burst Cycle).' },
      { en: '<b>CPU burst</b>: load store, add store, read from file.', ar: '<b>CPU burst</b>: load store و add store و read from file.' },
      { en: '<b>I/O burst</b>: wait for I/O.', ar: '<b>I/O burst</b>: wait for I/O.' },
      { en: 'Another <b>CPU burst</b>: store increment, index, write to file.', ar: '<b>CPU burst</b> تاني: store increment و index و write to file.' },
      { en: 'Another <b>I/O burst</b>: wait for I/O.', ar: '<b>I/O burst</b> تاني: wait for I/O.' },
      { en: '<b>CPU burst</b>: load store, add store, read from file.', ar: '<b>CPU burst</b>: load store و add store و read from file.' },
      { en: '<b>I/O burst</b>: wait for I/O. And so on: a <b>CPU burst followed by an I/O burst</b>. The CPU burst distribution is of main concern; maximum CPU utilization is obtained with multiprogramming.', ar: '<b>I/O burst</b>: wait for I/O. وهكذا: <b>CPU burst وبعده I/O burst</b>. الاهتمام الأساسي بتوزيع الـ CPU bursts؛ وأعلى CPU utilization بتيجي من الـ multiprogramming.' }
    ];
    const [i, ctl] = useSteps(steps.length, 1800);
    return html`<figure className="fig fo4"><div className="fig-stage"><div className="fo4-bc">
      <div className="dots" aria-hidden="true">⋮</div><div></div>
      ${BC.map((s, k) => {
        const on = i >= k + 1, cur = i === k + 1;
        return html`<${React.Fragment} key=${k}>${s.cpu
          ? html`<div className=${'seg cpu ' + pop(on) + (cur ? ' cur' : '')}>${s.cpu.map(([b, t], j) => html`<div key=${j}><b>${b}</b>${t}</div>`)}</div>`
          : html`<div className=${'seg io c' + s.io + ' ' + pop(on) + (cur ? ' cur' : '')}>wait for I/O</div>`}
          <div className=${'lab ' + pop(on) + (cur ? ' cur' : '')}><i></i><span>${s.cpu ? 'CPU burst' : 'I/O burst'}</span></div></${React.Fragment}>`;
      })}
      <div className=${'dots ' + pop(i >= 6)} aria-hidden="true">⋮</div><div></div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 3: process states and the four scheduling situations ── */
  const ST = { new: [62, 38, 50, 'new'], ready: [100, 196, 56, 'ready'], running: [300, 196, 62, 'running'], waiting: [200, 326, 62, 'waiting'], terminated: [322, 38, 72, 'terminated'] };
  const EV = [
    { id: 'admitted', from: 'new', to: 'ready', d: 'M74 62 C 82 100, 92 130, 96 168', lx: 88, ly: 94, la: 'start', lab: ['admitted'], sit: 0,
      en: '<b>admitted</b>: the new process enters the ready queue.', ar: '<b>admitted</b>: الـ process الجديدة بتدخل الـ ready queue.' },
    { id: 'dispatch', from: 'ready', to: 'running', d: 'M132 218 Q 200 284 266 218', lx: 200, ly: 280, la: 'middle', lab: ['scheduler dispatch'], sit: 0,
      en: '<b>scheduler dispatch</b>: the CPU scheduler selects the process from the ready queue and allocates a CPU core to it. It is now running.', ar: '<b>scheduler dispatch</b>: الـ CPU scheduler بيختار الـ process من الـ ready queue ويدّيها CPU core. هي دلوقتي running.' },
    { id: 'interrupt', from: 'running', to: 'ready', d: 'M276 172 Q 200 96 126 170', lx: 200, ly: 120, la: 'middle', lab: ['interrupt'], sit: 2,
      en: '<b>interrupt</b>: the process switches from running to ready state. This is situation <b>2</b>: there is a <b>choice</b> (scheduling here makes it preemptive).', ar: '<b>interrupt</b>: الـ process بتتنقل من running لـ ready. دي الحالة <b>2</b>: فيه <b>اختيار</b> (لو بنعمل scheduling هنا يبقى preemptive).' },
    { id: 'wait', from: 'running', to: 'waiting', d: 'M318 222 Q 330 300 262 318', lx: 396, ly: 384, la: 'end', lab: ['I/O or event', 'wait'], sit: 1,
      en: '<b>I/O or event wait</b>: the process switches from running to waiting state. This is situation <b>1</b>: <b>no choice</b> in terms of scheduling. A new process (if one exists in the ready queue) must be selected for execution.', ar: '<b>I/O or event wait</b>: الـ process بتتنقل من running لـ waiting. دي الحالة <b>1</b>: <b>مفيش اختيار</b> في الـ scheduling. لازم process جديدة (لو فيه واحدة في الـ ready queue) تتختار للتنفيذ.' },
    { id: 'completion', from: 'waiting', to: 'ready', d: 'M140 318 Q 76 300 84 224', lx: 4, ly: 384, la: 'start', lab: ['I/O or event', 'completion'], sit: 3,
      en: '<b>I/O or event completion</b>: the process switches from waiting to ready. This is situation <b>3</b>: there is a <b>choice</b>.', ar: '<b>I/O or event completion</b>: الـ process بتتنقل من waiting لـ ready. دي الحالة <b>3</b>: فيه <b>اختيار</b>.' },
    { id: 'exit', from: 'running', to: 'terminated', d: 'M318 170 L 322 66', lx: 330, ly: 124, la: 'start', lab: ['exit'], sit: 4,
      en: '<b>exit</b>: the process terminates. This is situation <b>4</b>: <b>no choice</b>. A new process (if one exists in the ready queue) must be selected for execution.', ar: '<b>exit</b>: الـ process بتخلص (terminates). دي الحالة <b>4</b>: <b>مفيش اختيار</b>. لازم process جديدة (لو فيه واحدة في الـ ready queue) تتختار للتنفيذ.' }
  ];
  const SIT = [['1', 'running → waiting', 'no choice'], ['2', 'running → ready', 'choice'], ['3', 'waiting → ready', 'choice'], ['4', 'terminates', 'no choice']];
  function SchedStates({ ar }) {
    const [st, setSt] = useState('new'), [last, setLast] = useState(null);
    const ev = last && EV.find(e => e.id === last);
    const go = e => { setSt(e.to); setLast(e.id); };
    const cap = ev ? ev : st === 'new'
      ? { en: 'CPU scheduling decisions may take place when a process: <b>1</b> switches from running to waiting state, <b>2</b> switches from running to ready state, <b>3</b> switches from waiting to ready, <b>4</b> terminates. Drive a process through its states with the buttons.', ar: 'قرارات الـ CPU scheduling ممكن تحصل لما الـ process: <b>1</b> تتنقل من running لـ waiting، <b>2</b> تتنقل من running لـ ready، <b>3</b> تتنقل من waiting لـ ready، <b>4</b> تخلص (terminates). حرّك process بين الـ states بالزراير.' }
      : null;
    const nm = [];
    return html`<figure className="fig fo4"><div className="fig-stage fo4-sd">
      <svg viewBox="0 0 400 414" role="img" aria-label=${'Process state diagram, current state: ' + st}>
        <defs>
          <marker id="fo4-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--graphite)" /></marker>
          <marker id="fo4-ahk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--k-os)" /></marker>
        </defs>
        ${EV.map(e => { const hot = e.id === last; return html`<g key=${e.id}>
          <path className=${'ed' + (hot && !calm() ? ' flow' : '')} d=${e.d} fill="none" stroke=${hot ? 'var(--k-os)' : 'var(--graphite)'} strokeWidth=${hot ? 3 : 1.8} markerEnd=${hot ? 'url(#fo4-ahk)' : 'url(#fo4-ah)'} />
          ${e.lab.map((l, j) => html`<text key=${j} x=${e.lx} y=${e.ly + j * 22} textAnchor=${e.la} fontSize="20" style=${{ fill: hot ? 'var(--k-os)' : 'var(--graphite)', fontWeight: hot ? 700 : 400 }}>${l}</text>`)}
        </g>`; })}
        ${Object.keys(ST).map(k => { const [x, y, rx, l] = ST[k], on = k === st; return html`<g key=${k}>
          <ellipse className="st" cx=${x} cy=${y} rx=${rx} ry="25" fill=${on ? 'color-mix(in srgb, var(--k-os) 35%, var(--paper))' : 'color-mix(in srgb, #0284C7 14%, var(--paper))'} stroke=${on ? 'var(--k-os)' : 'var(--graphite)'} strokeWidth=${on ? 3 : 1.5} />
          <text x=${x} y=${y + 6} textAnchor="middle" fontSize="21" fontWeight=${on ? 700 : 400}>${l}</text></g>`; })}
      </svg>
      <div className="fo4-sit">${SIT.map(([n, t, c], j) => html`<div key=${n} className=${(c === 'choice' ? 'ch' : '') + (ev && ev.sit === j + 1 ? ' on' : '')}>${n}. ${t}: <b>${c}</b></div>`)}</div>
    </div>
      <${Cap} en=${cap ? cap.en : 'The process is <b>' + st + '</b>.'} ar=${cap ? cap.ar : 'الـ process دلوقتي <b>' + st + '</b>.'} showAr=${ar} />
      <div className="fo4-ev">${EV.map(e => html`<button key=${e.id} className="fig-btn" disabled=${e.from !== st} onClick=${() => go(e)}>${e.lab.join(' ')}</button>`)}
        <button className="fig-btn" onClick=${() => { setSt('new'); setLast(null); }}>↻ Reset</button></div></figure>`;
  }

  /* ── slide 6: dispatcher and dispatch latency ── */
  function Dispatch({ ar }) {
    const steps = [
      { en: 'P<sub>0</sub> is executing. The CPU scheduler has selected P<sub>1</sub>; the <b>dispatcher</b> module gives control of the CPU to it.', ar: 'الـ P<sub>0</sub> شغالة. الـ CPU scheduler اختار P<sub>1</sub>؛ والـ <b>dispatcher</b> هو اللي بيدّيها التحكم في الـ CPU.' },
      { en: '<b>Switching context</b>: save the state of P<sub>0</sub> into PCB<sub>0</sub>. The dispatch latency starts.', ar: '<b>Switching context</b>: نحفظ الـ state بتاعة P<sub>0</sub> في PCB<sub>0</sub>. الـ dispatch latency بتبدأ.' },
      { en: 'Restore the state of P<sub>1</sub> from PCB<sub>1</sub>.', ar: 'نرجّع الـ state بتاعة P<sub>1</sub> من PCB<sub>1</sub>.' },
      { en: '<b>Switching to user mode</b> and <b>jumping to the proper location</b> in the user program to restart that program: P<sub>1</sub> is executing.', ar: '<b>Switching to user mode</b> و<b>jumping to the proper location</b> في الـ user program عشان يكمّل: الـ P<sub>1</sub> شغالة.' },
      { en: '<b>Dispatch latency</b>: the time it takes for the dispatcher to stop one process and start another running.', ar: 'الـ <b>Dispatch latency</b>: الوقت اللي بياخده الـ dispatcher عشان يوقف process ويشغّل واحدة تانية.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2200);
    const H = [0, 34, 70, 100, 100][i];
    const bx = (k, cls, body) => html`<div className=${'bx ' + cls + ' ' + pop(i >= k) + (i === k ? ' cur' : '')}>${body}</div>`;
    const arw = k => html`<div className=${'arw ' + pop(i >= k)} aria-hidden="true">↓</div>`;
    return html`<figure className="fig fo4"><div className="fig-stage"><div className="fo4-dp">
      ${bx(0, 'ex', html`P<sub>0</sub><br />executing`)}${arw(1)}
      ${bx(1, '', html`save state<br />into PCB<sub>0</sub>`)}${arw(2)}
      ${bx(2, '', html`restore state<br />from PCB<sub>1</sub>`)}${arw(3)}
      ${bx(3, 'ex', html`P<sub>1</sub><br />executing`)}
      <div className=${'br' + (i === 4 ? ' hl' : '')} aria-hidden=${i === 0}><i style=${{ height: H + '%', borderBottomWidth: H >= 100 ? '2px' : '0' }}></i><span style=${{ opacity: i >= 1 ? 1 : 0 }}>dispatch<br />latency</span></div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 26: multilevel queue (schedule the process in the highest-priority queue) ── */
  const MQ = [['0', ['0', '1', '2', '3', '4']], ['1', ['5', '6', '7']], ['2', ['8', '9', '10', '11']], ['n', ['x', 'y', 'z']]];
  function MultiQueue({ ar }) {
    const [picked, setPicked] = useState([]);
    const all = MQ.flatMap(([, ts]) => ts), left = all.filter(t => !picked.includes(t));
    const topRow = MQ.findIndex(([, ts]) => ts.some(t => !picked.includes(t)));
    const next = topRow >= 0 ? MQ[topRow][1].find(t => !picked.includes(t)) : null;
    const lastT = picked[picked.length - 1];
    const lastRow = lastT != null ? MQ.findIndex(([, ts]) => ts.includes(lastT)) : -1;
    const sub = t => html`<i style=${{ fontStyle: 'normal' }}>T<sub>${t}</sub></i>`;
    let cap;
    if (!picked.length) cap = { en: 'With priority scheduling, have <b>separate queues for each priority</b>. Schedule the process in the <b>highest-priority queue</b>! Press Schedule.', ar: 'مع الـ priority scheduling، بنعمل <b>queue منفصلة لكل priority</b>. شغّل الـ process اللي في <b>الـ queue اللي ليها أعلى priority</b>! دوس Schedule.' };
    else if (next == null) cap = { en: 'Every queue is empty. Each pick came from the highest-priority queue that still had a process.', ar: 'كل الـ queues فضيت. كل اختيار جه من أعلى priority queue كان لسه فيها process.' };
    else cap = { en: `T<sub>${lastT}</sub> is picked: priority = ${MQ[lastRow][0]} is the highest-priority queue that is not empty.${lastRow === 3 ? ' (The slide shows the queues between 2 and n only as dots.)' : ''}`, ar: `الـ T<sub>${lastT}</sub> اتختارت: الـ priority = ${MQ[lastRow][0]} هي أعلى priority queue مش فاضية.${lastRow === 3 ? ' (الـ slide بتبيّن الـ queues اللي بين 2 و n كنقط بس.)' : ''}` };
    return html`<figure className="fig fo4"><div className="fig-stage"><div className="fo4-mq">
      ${MQ.map(([p, ts], r) => html`<${React.Fragment} key=${p}>
        ${r === 3 ? html`<div></div><div className="vd" aria-hidden="true">●<br />●<br />●</div>` : null}
        <div className=${'pl' + (r === topRow ? ' top' : '')} style=${{ color: r === topRow ? 'var(--k-os)' : undefined, fontWeight: r === topRow ? 700 : 400 }}>priority = ${p}</div>
        <div className="cells">${ts.map(t => html`<span key=${t} className=${picked.includes(t) ? (t === lastT ? 'cur' : 'gone') : ''}>${sub(t)}</span>`)}</div></${React.Fragment}>`)}
    </div>
      <p className="fo4-pick">Order picked: ${picked.length ? picked.map((t, j) => html`<span key=${t}>${j ? ', ' : ''}T<sub>${t}</sub></span>`) : '·'}</p></div>
      <${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} />
      <div className="fig-bar"><span className="fo4-muted">${left.length} waiting</span><span className="grow"></span>
        <button className="fig-btn solid" onClick=${() => next != null && setPicked(picked.concat(next))} disabled=${next == null}>Schedule ›</button>
        <button className="fig-btn" onClick=${() => setPicked([])}>↻ Reset</button></div></figure>`;
  }

  /* ── slide 27: multilevel queue, prioritization based upon process type ── */
  const MT = [['real-time processes', '70%'], ['system processes', '52%'], ['interactive processes', '38%'], ['batch processes', '26%']];
  function MultiTypes({ ar }) {
    const steps = [
      { en: 'Multilevel queue: <b>prioritization based upon process type</b>.', ar: 'الـ Multilevel queue: <b>الـ priority على حسب نوع الـ process</b>.' },
      { en: '<b>Real-time processes</b>: highest priority.', ar: 'الـ <b>Real-time processes</b>: أعلى priority.' },
      { en: '<b>System processes</b>.', ar: 'الـ <b>System processes</b>.' },
      { en: '<b>Interactive processes</b>.', ar: 'الـ <b>Interactive processes</b>.' },
      { en: '<b>Batch processes</b>: lowest priority.', ar: 'الـ <b>Batch processes</b>: أقل priority.' }
    ];
    const [i, ctl] = useSteps(steps.length, 1700);
    return html`<figure className="fig fo4"><div className="fig-stage"><div className="fo4-mt">
      <div className=${'hl ' + pop(i >= 1)}>highest priority</div>
      ${MT.map(([t, m], k) => html`<div key=${t} className=${'q ' + pop(i === 0 || i >= k + 1) + (i === k + 1 ? ' on' : '')} style=${{ '--m': m }}><i></i><div>${t}</div><i></i></div>`)}
      <div className=${'hl ' + pop(i >= 4)}>lowest priority</div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── slide 29: multilevel feedback queue example ── */
  function Feedback({ ar }) {
    const [b, setB] = useState(30);
    const s = [{ at: 'in', en: `A new process (CPU burst ${b} ms) enters queue Q<sub>0</sub>, which is served in RR.`, ar: `process جديدة (CPU burst ${b} ms) بتدخل الـ queue Q<sub>0</sub>، اللي بتتخدم RR.` }];
    if (b <= 8) {
      s.push({ at: 'q0', tok: `${b} ms used`, en: `When it gains the CPU, the process receives 8 milliseconds. It needs only ${b}, so it finishes in Q<sub>0</sub>.`, ar: `لما تاخد الـ CPU بتاخد 8 milliseconds. هي محتاجة ${b} بس، فبتخلص في Q<sub>0</sub>.` });
      s.push({ at: 'out0', en: `Finished after ${b} ms in Q<sub>0</sub>.`, ar: `خلصت بعد ${b} ms في Q<sub>0</sub>.` });
    } else {
      s.push({ at: 'q0', tok: `8 ms used, ${b - 8} left`, en: 'When it gains the CPU, the process receives 8 milliseconds.', ar: 'لما تاخد الـ CPU بتاخد 8 milliseconds.' });
      s.push({ at: 'd1', tok: `${b - 8} ms left`, en: 'It does not finish in 8 milliseconds, so the process is moved to queue Q<sub>1</sub>.', ar: 'ماخلصتش في 8 milliseconds، فالـ process بتتنقل لـ queue Q<sub>1</sub>.' });
      if (b <= 24) {
        s.push({ at: 'q1', tok: `${b - 8} ms used`, en: `At Q<sub>1</sub> the job is again served in RR and receives 16 additional milliseconds. It needs ${b - 8} more, so it finishes in Q<sub>1</sub>.`, ar: `في Q<sub>1</sub> الـ job بتتخدم RR تاني وبتاخد 16 milliseconds زيادة. محتاجة ${b - 8} كمان، فبتخلص في Q<sub>1</sub>.` });
        s.push({ at: 'out1', en: `Finished: 8 ms in Q<sub>0</sub> + ${b - 8} ms in Q<sub>1</sub> = ${b} ms.`, ar: `خلصت: 8 ms في Q<sub>0</sub> + ${b - 8} ms في Q<sub>1</sub> = ${b} ms.` });
      } else {
        s.push({ at: 'q1', tok: `16 ms used, ${b - 24} left`, en: 'At Q<sub>1</sub> the job is again served in RR and receives 16 additional milliseconds.', ar: 'في Q<sub>1</sub> الـ job بتتخدم RR تاني وبتاخد 16 milliseconds زيادة.' });
        s.push({ at: 'd2', tok: `${b - 24} ms left`, en: 'It still does not complete, so it is preempted and moved to queue Q<sub>2</sub>.', ar: 'لسه ماخلصتش، فبتتعملها preempt وتتنقل لـ queue Q<sub>2</sub>.' });
        s.push({ at: 'q2', tok: `${b - 24} ms used`, en: `Q<sub>2</sub> is FCFS: it runs the remaining ${b - 24} ms.`, ar: `الـ Q<sub>2</sub> هي FCFS: بتشغّل الـ ${b - 24} ms الفاضلين.` });
        s.push({ at: 'out2', en: `Finished: 8 ms in Q<sub>0</sub> + 16 ms in Q<sub>1</sub> + ${b - 24} ms in Q<sub>2</sub> = ${b} ms.`, ar: `خلصت: 8 ms في Q<sub>0</sub> + 16 ms في Q<sub>1</sub> + ${b - 24} ms في Q<sub>2</sub> = ${b} ms.` });
      }
    }
    const [i, ctl] = useRun(s.length, 1900, b, false);
    const at = s[i].at, tok = (w, done) => at === w ? html`<span className=${'fo4-tok' + (done ? ' done' : '')}>${done ? '✓ done' : s[i].tok || `P · ${b} ms`}</span>` : null;
    const lv = (k, label) => html`<div className="lv"><div className="arw">${k === 0 ? html`<span>→</span>${tok('in')}` : null}</div>
      <div className=${'qb' + (at === 'q' + k || at === 'out' + k ? ' on' : '')}><span>${label}</span>${tok('q' + k)}${tok('out' + k, true)}</div>
      <div className="arw" style=${{ color: at === 'out' + k ? 'var(--ok)' : undefined, fontWeight: at === 'out' + k ? 700 : undefined }}><span>→</span></div></div>`;
    const dn = k => html`<div className="dn"><div className="arw">↓</div><div>${tok('d' + k)}</div></div>`;
    return html`<figure className="fig fo4"><div className="fig-stage"><div className="fo4-ctl"><label htmlFor="fo4-burst">CPU burst of the new process</label><input id="fo4-burst" type="range" min="1" max="40" value=${b} onChange=${e => setB(Number(e.target.value))} /><b>${b} ms</b></div><div className="fo4-fb">
      ${lv(0, 'quantum = 8')}${dn(1)}${lv(1, 'quantum = 16')}${dn(2)}${lv(2, 'FCFS')}
    </div></div>
      <${Cap} en=${s[i].en} ar=${s[i].ar} showAr=${ar} /><${Bar} steps=${s} i=${i} ctl=${ctl} /></figure>`;
  }
  window.FIGS = Object.assign(window.FIGS || {}, {
    'os-burst-cycle': BurstCycle, 'os-sched-states': SchedStates, 'os-dispatch': Dispatch,
    'os-fcfs-sim': mk('fcfs'), 'os-sjf-sim': mk('sjf'), 'os-srtf-sim': mk('srtf'), 'os-rr-sim': mk('rr'),
    'os-prio-sim': mk('prio'), 'os-prio-rr-sim': mk('priorr'), 'os-review-sim': mk('review'),
    'os-mlq': MultiQueue, 'os-mlq-types': MultiTypes, 'os-mlfq': Feedback
  });
})();


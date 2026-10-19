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
/* ── part 5 ── */
// OS visuals, part 5: L4 Memory Management (internal memory). Every label and caption comes from the site's notes for that lecture.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.fo5 .fig-dots i.on{ background:var(--k-os); } .fo5 .fig-btn:hover{ border-color:var(--k-os); }
.fo5 .fig-btn[aria-pressed="true"]{ background:var(--s-os); color:#fff; border-color:transparent; }
.fo5 .fig-btn:disabled{ opacity:.45; cursor:default; }
.fo5-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.fo5-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.fo5-wrap{ max-width:460px; margin:0 auto; color:var(--ink); font-size:.88rem; line-height:1.45; }
.fo5-box{ border:1.4px solid var(--line); border-radius:9px; background:var(--paper); padding:6px 10px; transition:all .45s ease; }
.fo5-box.on{ border-color:var(--k-os); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-os) 22%, transparent); }
.fo5-box.dim{ opacity:.35; }
.fo5-box.bad{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 10%, var(--paper)); }
.fo5-box.good{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.fo5-box b.t{ display:block; font-size:.9rem; }
.fo5-box small{ display:block; color:var(--graphite); font-size:.8rem; }
.fo5-arrow{ text-align:center; color:var(--graphite); line-height:1.1; margin:2px 0; font-size:.95rem; }
.fo5-mono{ font-family:var(--mono); }
.fo5-big{ font-family:var(--mono); font-weight:700; color:var(--k-os); }
.fo5-red{ color:var(--pen); font-weight:700; }
.fo5-ok{ color:var(--ok); font-weight:700; }
.fo5-in{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; justify-content:center; margin:0 0 10px; font-size:.86rem; }
.fo5-in input, .fo5-in select{ font:inherit; font-family:var(--mono); font-size:.88rem; width:6.2em; padding:4px 6px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); }
.fo5-in input.w{ width:13em; }
.fo5-in input:focus, .fo5-in select:focus{ outline:2px solid var(--k-os); outline-offset:1px; }
.fo5-line{ position:relative; height:46px; margin:14px 8px 26px; }
.fo5-line .bar{ position:absolute; left:0; right:0; top:18px; height:10px; border-radius:5px; background:color-mix(in srgb, var(--pen) 22%, var(--paper)); border:1px solid var(--line); }
.fo5-line .ok{ position:absolute; top:18px; height:10px; background:color-mix(in srgb, var(--ok) 45%, var(--paper)); border:1px solid var(--ok); }
.fo5-line .mk{ position:absolute; top:6px; width:2px; height:34px; background:var(--ink); transition:left .6s ease; }
.fo5-line .mk i{ position:absolute; top:-4px; left:50%; transform:translateX(-50%); width:10px; height:10px; border-radius:50%; background:var(--k-os); }
.fo5-line .lb{ position:absolute; top:32px; font-family:var(--mono); font-size:.76rem; color:var(--graphite); transform:translateX(-50%); white-space:nowrap; }
.fo5-chain{ display:flex; flex-direction:column; gap:0; }
.fo5-tag{ display:inline-block; font-size:.76rem; font-weight:700; border-radius:99px; padding:1px 8px; margin-left:4px; border:1px solid var(--k-os); color:var(--k-os); background:var(--paper); }
.fo5-pipe{ display:grid; grid-template-columns:1fr auto 1fr auto 1fr; align-items:center; gap:4px; text-align:center; }
.fo5-pipe .fo5-box{ padding:6px 4px; }
.fo5-pipe .op{ font-weight:700; color:var(--graphite); }
.fo5-pkt{ display:inline-block; font-family:var(--mono); font-weight:700; padding:1px 6px; border-radius:6px; background:color-mix(in srgb, var(--k-os) 18%, var(--paper)); }
.fo5-two{ display:grid; grid-template-columns:1fr 1fr; gap:10px; align-items:stretch; }
.fo5-mem{ border:1.4px solid var(--line); border-radius:8px; overflow:hidden; display:flex; flex-direction:column; background:var(--paper-2); min-height:150px; }
.fo5-mem .seg{ border-bottom:1px solid var(--line); padding:4px 6px; font-size:.8rem; text-align:center; transition:all .6s ease; }
.fo5-mem .os{ background:color-mix(in srgb, var(--graphite) 18%, var(--paper)); }
.fo5-mem .p{ background:color-mix(in srgb, var(--k-os) 22%, var(--paper)); font-weight:600; }
.fo5-mem .p.hi{ background:var(--s-os); color:#fff; }
.fo5-mem .free{ background:var(--paper); color:var(--graphite); }
.fo5-mem .hd{ background:var(--paper); font-weight:700; font-size:.8rem; }
.fo5-prog{ height:10px; border-radius:5px; background:var(--paper-2); border:1px solid var(--line); overflow:hidden; margin:4px 0; }
.fo5-prog i{ display:block; height:100%; background:var(--k-os); transition:width .8s ease; }
.fo5-parts{ display:flex; flex-direction:column; gap:6px; }
.fo5-part{ display:grid; grid-template-columns:3.4em 1fr; gap:6px; align-items:center; }
.fo5-part .nm{ font-family:var(--mono); font-size:.8rem; color:var(--graphite); text-align:right; }
.fo5-cells{ display:flex; height:30px; border:1.4px solid var(--graphite); border-radius:5px; overflow:hidden; background:var(--paper); transition:box-shadow .4s; }
.fo5-cells.cand{ box-shadow:0 0 0 2px color-mix(in srgb, var(--k-os) 45%, transparent); }
.fo5-cells.pick{ box-shadow:0 0 0 3px var(--k-os); }
.fo5-cells .u{ display:grid; place-items:center; font-size:.76rem; font-weight:700; color:#fff; background:var(--s-os); border-right:1px solid var(--paper); white-space:nowrap; overflow:hidden; transition:flex-grow .6s ease; }
.fo5-cells .u.n2{ background:color-mix(in srgb, var(--s-os) 70%, var(--ink)); } .fo5-cells .u.n3{ background:color-mix(in srgb, var(--s-os) 55%, var(--ok)); } .fo5-cells .u.n4{ background:color-mix(in srgb, var(--s-os) 60%, var(--pen)); }
.fo5-cells .h{ display:grid; place-items:center; font-size:.76rem; color:var(--graphite); white-space:nowrap; overflow:hidden; }
.fo5-q{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:0 0 10px; }
.fo5-q span{ border:1.3px solid var(--line); border-radius:99px; padding:2px 9px; font-size:.8rem; font-family:var(--mono); background:var(--paper); transition:all .4s; }
.fo5-q span.cur{ border-color:var(--k-os); box-shadow:0 0 0 2px color-mix(in srgb, var(--k-os) 30%, transparent); font-weight:700; }
.fo5-q span.done{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.fo5-q span.wait{ border-color:var(--pen); color:var(--pen); }
.fo5-res{ margin-top:10px; border:1px solid var(--line); border-radius:9px; background:var(--paper); padding:6px 10px; font-size:.84rem; }
.fo5-tbl{ border-collapse:collapse; margin:0 auto; font-size:.82rem; }
.fo5-tbl th, .fo5-tbl td{ border:1px solid var(--line); padding:3px 6px; text-align:center; background:var(--paper); }
.fo5-tbl th{ background:var(--paper-2); color:var(--graphite); font-weight:600; }
.fo5-tbl tr.on td{ background:color-mix(in srgb, var(--k-os) 18%, var(--paper)); font-weight:700; }
.fo5-tbl tr.no td{ background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.fo5-pm{ display:flex; flex-direction:column; border:1.4px solid var(--line); border-radius:6px; overflow:hidden; }
.fo5-pm div{ font-size:.78rem; padding:0 4px; display:flex; align-items:center; justify-content:center; border-bottom:1px solid var(--line); transition:all .5s; }
.fo5-pm .s{ background:color-mix(in srgb, var(--k-os) 18%, var(--paper)); font-weight:600; }
.fo5-pm .s.on{ background:var(--s-os); color:#fff; }
.fo5-pm .e{ background:var(--paper); color:var(--graphite); }
.fo5-frames{ display:flex; flex-direction:column; gap:3px; }
.fo5-fr{ display:grid; grid-template-columns:3.6em 1fr; gap:6px; align-items:center; font-size:.8rem; }
.fo5-fr .n{ font-family:var(--mono); color:var(--graphite); text-align:right; }
.fo5-fr .c{ height:24px; border:1.3px solid var(--line); border-radius:5px; display:grid; place-items:center; background:var(--paper); transition:all .5s ease; }
.fo5-fr .c.full{ background:color-mix(in srgb, var(--k-os) 20%, var(--paper)); border-color:var(--k-os); font-weight:600; }
.fo5-fr .c.on{ background:var(--s-os); color:#fff; border-color:var(--s-os); }
.fo5-split{ display:flex; border:1.4px solid var(--k-os); border-radius:6px; overflow:hidden; font-family:var(--mono); font-size:.86rem; text-align:center; }
.fo5-split span{ flex:1; padding:4px; } .fo5-split span + span{ border-left:1.4px solid var(--k-os); }
.fo5-split .pp{ background:color-mix(in srgb, var(--k-os) 18%, var(--paper)); }
.fo5-last{ display:flex; height:30px; border:1.4px solid var(--graphite); border-radius:5px; overflow:hidden; margin:4px 0; }
.fo5-last .used{ background:var(--s-os); color:#fff; display:grid; place-items:center; font-size:.76rem; font-weight:700; white-space:nowrap; overflow:hidden; transition:width .7s ease; }
.fo5-last .waste{ flex:1; display:grid; place-items:center; font-size:.76rem; color:var(--pen); font-weight:700; background:repeating-linear-gradient(45deg, var(--paper), var(--paper) 5px, color-mix(in srgb, var(--pen) 14%, var(--paper)) 5px, color-mix(in srgb, var(--pen) 14%, var(--paper)) 10px); white-space:nowrap; overflow:hidden; }
.fo5-pg{ display:flex; flex-wrap:wrap; gap:3px; margin:4px 0; }
.fo5-pg i{ width:12px; height:12px; border-radius:2px; background:color-mix(in srgb, var(--k-os) 40%, var(--paper)); border:1px solid var(--k-os); }
.fo5-pg i.l{ background:repeating-linear-gradient(45deg, var(--k-os), var(--k-os) 3px, var(--paper) 3px, var(--paper) 6px); }
@media (prefers-reduced-motion: reduce){ .fo5 *{ transition:none !important; animation:none !important; } }`;
  if (!document.getElementById('fo5-css')) { const s = document.createElement('style'); s.id = 'fo5-css'; s.textContent = CSS; document.head.appendChild(s); }
  const fmt = n => Number(n).toLocaleString('en-US');
  const Modes = ({ list, val, set }) => html`<div className="fo5-row" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(val === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const L = t => `<span class="ltr">${t}</span>`;

  /* ── §0 base and limit registers: is this address legal? ── */
  function BaseLimit({ ar }) {
    const BASE = 300040, LIM = 120900, TOP = BASE + LIM;
    const [a, setA] = useState(300040);
    const [txt, setTxt] = useState('300040');
    const legal = a >= BASE && a < TOP, c1 = a >= BASE, c2 = a < TOP;
    const lo = 280000, hi = 440000, pos = v => Math.max(0, Math.min(100, (v - lo) / (hi - lo) * 100));
    const pick = v => { setA(v); setTxt(String(v)); };
    const en = legal ? `<b>${fmt(a)}</b> is legal: base ≤ address &lt; base + limit, so the access goes to memory.` : `<b>${fmt(a)}</b> is outside base … base + limit: the CPU traps to the OS (<b>addressing error</b>).`;
    const arT = legal ? `العنوان <b>${a}</b> legal، لأنه بيحقق الشرط:${L('base ≤ address &lt; base + limit')}فالـ access بيروح للـ memory.` : `العنوان <b>${a}</b> برّه المدى من الـ base لحد base + limit، فالـ CPU بيعمل trap للـ OS (<b>addressing error</b>).`;
    return html`<figure className="fig fo5"><div className="fig-stage"><div className="fo5-wrap">
      <div className="fo5-in"><label>Address <input inputMode="numeric" value=${txt} aria-label="Address to check" onInput=${e => { setTxt(e.target.value); const v = parseInt(e.target.value.replace(/\D/g, ''), 10); if (!isNaN(v)) setA(v); }} /></label></div>
      <div className="fo5-row">${[[299999, '299999'], [300040, '300040'], [350000, '350000'], [420939, '420939'], [420940, '420940']].map(([v, t]) => html`<button key=${v} className="fig-btn" aria-pressed=${String(a === v)} onClick=${() => pick(v)}>${t}</button>`)}</div>
      <div className="fo5-line" aria-hidden="true"><div className="bar"></div><div className="ok" style=${{ left: pos(BASE) + '%', width: (pos(TOP) - pos(BASE)) + '%' }}></div>
        <div className="mk" style=${{ left: pos(a) + '%' }}><i></i></div>
        <span className="lb" style=${{ left: pos(BASE) + '%' }}>300040</span><span className="lb" style=${{ left: pos(TOP) + '%' }}>420940</span></div>
      <div className="fo5-two">
        <div className="fo5-box"><small>base register</small><span className="fo5-mono">300040</span></div>
        <div className="fo5-box"><small>limit register</small><span className="fo5-mono">120900</span></div></div>
      <div className="fo5-arrow">↓ CPU checks every user-mode access</div>
      <div className=${'fo5-box ' + (c1 ? 'good' : 'bad')}>address ≥ base? <b className=${c1 ? 'fo5-ok' : 'fo5-red'}>${c1 ? 'yes' : 'no → trap'}</b></div>
      <div className="fo5-arrow">↓</div>
      <div className=${'fo5-box ' + (!c1 ? 'dim' : c2 ? 'good' : 'bad')}>address ${'<'} base + limit (420940)? <b className=${c2 ? 'fo5-ok' : 'fo5-red'}>${c2 ? 'yes' : 'no → trap'}</b></div>
      <div className="fo5-arrow">↓</div>
      <div className=${'fo5-box ' + (legal ? 'good' : 'bad')}><b className="t">${legal ? 'Memory access' : 'Trap to OS: addressing error'}</b><small>legal range 300040 … 420939</small></div>
      </div></div><${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  /* ── §1 multistep processing and the three binding times ── */
  const BIND = [
    { k: 'Source program', s: 'symbolic addresses (variables)', en: 'The <b>source program</b> uses <b>symbolic</b> addresses, such as variable names.', ar: 'الـ <b>source program</b> بيستخدم addresses <b>symbolic</b>، زي أسامي الـ variables.' },
    { k: 'Compiler or assembler', s: '', en: 'The <b>compiler or assembler</b> translates it. <b>Compile-time binding</b>: if the memory location is known a priori, absolute code is generated, and it must be recompiled if the start location changes.', ar: 'الـ <b>compiler أو الـ assembler</b> بيترجمه. الـ <b>compile-time binding</b>: لو مكان الـ memory معروف من الأول بيطلع absolute code، ولو مكان البداية اتغير لازم نعمل recompile.', b: 'Compile time' },
    { k: 'Object module', s: 'relocatable: "14 bytes from the beginning of this module"', en: 'The <b>object module</b> has <b>relocatable</b> addresses, such as "14 bytes from the beginning of this module".', ar: 'الـ <b>object module</b> فيه addresses <b>relocatable</b>، زي <bdi>"14 bytes from the beginning of this module"</bdi>.' },
    { k: 'Linkage editor', s: '+ other object modules', en: 'The <b>linkage editor</b> joins it with <b>other object modules</b>.', ar: 'الـ <b>linkage editor</b> بيجمعه مع <b>object modules تانية</b>.' },
    { k: 'Load module', s: '', en: 'The result is the <b>load module</b>, which waits on disk in the <b>input queue</b>.', ar: 'النتيجة هي الـ <b>load module</b>، وبيستنى على الـ disk في الـ <b>input queue</b>.' },
    { k: 'Loader', s: '+ system library', en: 'The <b>loader</b> brings it into memory with the <b>system library</b>. <b>Load-time binding</b>: relocatable code is generated when the location is not known at compile time.', ar: 'الـ <b>loader</b> بيحمّله في الـ memory مع الـ <b>system library</b>. الـ <b>load-time binding</b>: بيطلع relocatable code لما المكان مايكونش معروف وقت الـ compile.', b: 'Load time' },
    { k: 'In-memory binary image', s: 'absolute addresses, e.g. 74014', en: 'The <b>in-memory binary image</b> has <b>absolute</b> addresses, e.g. 74014. A <b>dynamically loaded system library</b> can join it through <b>dynamic linking</b>.', ar: 'الـ <b>in-memory binary image</b> فيها addresses <b>absolute</b>، زي 74014. وممكن <b>system library</b> تتحمّل بشكل dynamic وتنضم ليها عن طريق الـ <b>dynamic linking</b>.' },
    { k: 'Execution time', s: '', en: '<b>Execution-time binding</b>: binding is delayed until run time if the process can move during execution. It needs hardware support (base and limit registers).', ar: 'الـ <b>execution-time binding</b>: الـ binding بيتأجل لوقت التشغيل لو الـ process ممكن تتنقل وهي شغالة، وده محتاج دعم من الـ hardware (الـ base والـ limit registers).', b: 'Execution time', last: 1 }
  ];
  function Binding({ ar }) {
    const [i, ctl] = useSteps(BIND.length, 2400);
    const boxes = BIND.filter(x => !x.last), s = BIND[i];
    return html`<figure className="fig fo5"><div className="fig-stage"><div className="fo5-wrap fo5-chain">
      ${boxes.map((x, k) => html`<div key=${k}>${k > 0 && html`<div className="fo5-arrow">↓</div>`}
        <div className=${'fo5-box' + (k === i ? ' on' : k > i ? ' dim' : '')}><b className="t">${x.k}${x.b && k <= i ? html`<span className="fo5-tag">${x.b} binding</span>` : ''}</b>${x.s && html`<small>${x.s}</small>`}</div></div>`)}
      <div className="fo5-arrow">↓</div>
      <div className=${'fo5-box' + (s.last ? ' on' : ' dim')}><b className="t">While it runs<span className="fo5-tag">Execution time binding</span></b><small>process may move: base and limit registers</small></div>
      </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${BIND} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §1 MMU with a relocation register ── */
  function Mmu({ ar }) {
    const R = 14000;
    const [x, setX] = useState(346), [t, setT] = useState('346'), [run, setRun] = useState(0);
    const steps = [0, 1, 2, 3];
    const [i, ctl] = useSteps(steps.length, 1500);
    const go = v => { setX(v); setT(String(v)); ctl.replay(); setRun(r => r + 1); };
    const cap = [
      { en: 'The CPU sends the <b>logical address</b>. The user program deals only with logical addresses.', ar: 'الـ CPU بيبعت الـ <b>logical address</b>. الـ user program بيتعامل مع الـ logical addresses بس.' },
      { en: 'The <b>MMU</b> (hardware) maps it at run time: the base register is now the <b>relocation register</b>.', ar: 'الـ <b>MMU</b> (hardware) بيعمل الـ mapping وقت التشغيل، والـ base register بقى اسمه <b>relocation register</b>.' },
      { en: `Its value is added to every address: ${fmt(R)} + ${fmt(x)} = <b>${fmt(R + x)}</b>.`, ar: `قيمته بتتجمع على كل address:${L(`${R} + ${x} = <b>${R + x}</b>`)}` },
      { en: `Memory receives the <b>physical address ${fmt(R + x)}</b>; the program never sees it.`, ar: `الـ memory بيوصلها الـ <b>physical address ${R + x}</b>، والبرنامج عمره ما بيشوفه.` }
    ][i];
    return html`<figure className="fig fo5"><div className="fig-stage"><div className="fo5-wrap" key=${run}>
      <div className="fo5-in"><label>Logical address <input inputMode="numeric" value=${t} aria-label="Logical address" onInput=${e => { setT(e.target.value); const v = parseInt(e.target.value.replace(/\D/g, ''), 10); if (!isNaN(v)) { setX(v); } }} /></label>
        <button className="fig-btn" onClick=${() => go(x)}>Send</button><button className="fig-btn" onClick=${() => go(346)}>Example 346</button></div>
      <div className="fo5-pipe">
        <div className=${'fo5-box' + (i === 0 ? ' on' : '')}><b className="t">CPU</b><small>logical</small><span className="fo5-pkt">${fmt(x)}</span></div>
        <span className="op">→</span>
        <div className=${'fo5-box' + (i === 1 || i === 2 ? ' on' : '')}><b className="t">MMU</b><small>relocation register</small><span className="fo5-mono">${fmt(R)}</span>${i >= 2 && html`<small className="fo5-mono">+ ${fmt(x)}</small>`}</div>
        <span className="op">→</span>
        <div className=${'fo5-box' + (i === 3 ? ' on' : i < 2 ? ' dim' : '')}><b className="t">Memory</b><small>physical</small><span className="fo5-pkt">${i >= 2 ? fmt(R + x) : '…'}</span></div>
      </div></div></div><${Cap} ...${cap} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §2 swapping: roll out, roll in ── */
  function Swap({ ar }) {
    const [mb, setMb] = useState(100);
    const RATE = 50, ms = Math.round(mb / RATE * 1000);
    const steps = [
      { en: 'Memory holds the OS and a <b>lower-priority</b> process P1. A <b>higher-priority</b> process P2 is ready, but its memory image is on the <b>backing store</b> (a fast disk with direct access to all memory images).', ar: 'الـ memory فيها الـ OS و process اسمها P1 <b>أولويتها أقل</b>. فيه process تانية P2 <b>أولويتها أعلى</b> جاهزة، بس الـ memory image بتاعتها على الـ <b>backing store</b> (disk سريع بيوصل لكل الـ memory images مباشرةً).', o: 0 },
      { en: `<b>Roll out</b>: P1 is swapped out to the backing store. Transfer time is proportional to the size: ${mb} MB at ${RATE} MB/s = <b>${fmt(ms)} ms</b>.`, ar: `الـ <b>roll out</b>: الـ P1 بتتنقل للـ backing store. وقت النقل بيتناسب مع الحجم:${L(`${mb} MB ÷ ${RATE} MB/s = <b>${ms} ms</b>`)}`, o: 1 },
      { en: `<b>Roll in</b>: P2 is swapped in, another <b>${fmt(ms)} ms</b>, and runs.`, ar: `الـ <b>roll in</b>: الـ P2 بتدخل الـ memory في <b>${ms} ms</b> كمان، وبعدين تشتغل.`, o: 2 },
      { en: `The swap component of this context switch is ${fmt(ms)} + ${fmt(ms)} = <b>${fmt(2 * ms / 1000)} s</b>. Most of swap time is <b>transfer time</b>, so it grows with the memory swapped.`, ar: `الجزء بتاع الـ swap في الـ context switch ده ${L(`${ms} + ${ms} ms = <b>${2 * ms / 1000} s</b>`)}وأغلب وقت الـ swap هو <b>transfer time</b>، فبيزيد مع حجم الـ memory اللي بتتنقل.`, o: 3 }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const s = steps[i], p1In = s.o < 1, p2In = s.o >= 2;
    return html`<figure className="fig fo5"><div className="fig-stage"><div className="fo5-wrap">
      <div className="fo5-in"><label>Process size <select value=${mb} aria-label="Process size in MB" onChange=${e => setMb(+e.target.value)}>${[10, 50, 100, 200, 500].map(v => html`<option key=${v} value=${v}>${v} MB</option>`)}</select></label><span>at ${RATE} MB/s</span></div>
      <div className="fo5-two">
        <div className="fo5-mem"><div className="seg hd">Main memory</div><div className="seg os">Operating system</div>
          <div className=${'seg p' + (s.o === 1 || s.o === 2 ? ' hi' : '')} style=${{ flex: 1, display: 'grid', placeItems: 'center' }}>${p1In ? 'P1 (low priority)' : p2In ? 'P2 (high priority)' : html`<span style=${{ color: 'var(--graphite)' }}>user space (free)</span>`}</div></div>
        <div className="fo5-mem"><div className="seg hd">Backing store</div>
          <div className="seg free">${p1In ? 'P2 image' : 'P1 image'}</div>
          <div className="seg free" style=${{ flex: 1, display: 'grid', placeItems: 'center' }}>${p2In ? 'P1 waits here' : ''}</div></div></div>
      <div style=${{ marginTop: '8px' }}>
        <small>Swap out ${fmt(ms)} ms</small><div className="fo5-prog"><i style=${{ width: s.o >= 1 ? '100%' : '0%' }}></i></div>
        <small>Swap in ${fmt(ms)} ms</small><div className="fo5-prog"><i style=${{ width: s.o >= 2 ? '100%' : '0%' }}></i></div></div>
      </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §3 first-fit, best-fit, worst-fit on the notes' partitions ── */
  const PARTS = [100, 500, 200, 300, 600];
  function runFit(alg, procs) {
    const used = PARTS.map(() => []), log = [];
    procs.forEach((p, k) => {
      const free = used.map((u, j) => PARTS[j] - u.reduce((a, b) => a + b.s, 0));
      const cand = free.map((f, j) => f >= p ? j : -1).filter(j => j >= 0);
      let j = -1;
      if (cand.length) j = alg === 'first' ? cand[0] : alg === 'best' ? cand.reduce((a, b) => free[b] < free[a] ? b : a) : cand.reduce((a, b) => free[b] > free[a] ? b : a);
      if (alg === 'worst' && cand.length) { const mx = Math.max(...free); j = free.indexOf(mx) >= 0 && mx >= p ? free.indexOf(mx) : -1; }
      log.push({ p, k, cand, j, hole: j >= 0 ? free[j] : null, left: j >= 0 ? free[j] - p : null });
      if (j >= 0) used[j].push({ s: p, k });
    });
    return log;
  }
  const NAME = { first: 'First-fit', best: 'Best-fit', worst: 'Worst-fit' };
  const RULE = { first: 'the first hole that is big enough', best: 'the smallest hole that is big enough', worst: 'the largest hole' };
  const RULE_AR = { first: 'أول hole كبيرة كفاية', best: 'أصغر hole كبيرة كفاية', worst: 'أكبر hole' };
  function FitSim({ ar }) {
    const [alg, setAlg0] = useState('first');
    const [txt, setTxt] = useState('212, 417, 112, 426');
    const procs = (txt.match(/\d+/g) || []).map(Number).filter(v => v > 0).slice(0, 6);
    const ex = txt.replace(/\s/g, '') === '212,417,112,426';
    const log = runFit(alg, procs);
    const steps = [null, ...log.flatMap(e => [{ e, ph: 0 }, { e, ph: 1 }]), { end: 1 }];
    const [i, ctl] = useSteps(steps.length, 1700);
    const setAlg = a => { setAlg0(a); ctl.replay(); };
    const s = steps[Math.min(i, steps.length - 1)];
    const doneK = s && s.end ? procs.length : s ? s.e.k + (s.ph ? 1 : 0) : 0;
    const used = PARTS.map(() => []); log.slice(0, doneK).forEach(e => { if (e.j >= 0) used[e.j].push({ s: e.p, k: e.k }); });
    const free = used.map((u, j) => PARTS[j] - u.reduce((a, b) => a + b.s, 0));
    let en, a;
    if (!s) { en = `<b>${NAME[alg]}</b> takes ${RULE[alg]}. Partitions 100, 500, 200, 300, 600 KB; the processes arrive in order${ex ? ' (the example from the notes)' : ''}. After each placement the hole shrinks and the leftover can hold later processes.`; a = `الـ <b>${NAME[alg]}</b> بياخد ${RULE_AR[alg]}. الـ partitions هي 100 و 500 و 200 و 300 و 600 KB، والـ processes بتيجي بالترتيب${ex ? ' (ده مثال الـ notes)' : ''}. بعد كل placement الـ hole بتصغر، واللي فاضل منها ممكن ياخد processes بعدين.`; }
    else if (s.end) { const n = log.filter(e => e.j >= 0).length; en = `<b>${NAME[alg]}</b>: ${n} of ${procs.length} placed.${ex ? (alg === 'best' ? ' All placed: best-fit is the most efficient here.' : ' 426 KB must wait.') : ''} First-fit and best-fit are better than worst-fit in speed and storage utilization.`; a = `الـ <b>${NAME[alg]}</b>: اتحط ${n} من ${procs.length}.${ex ? (alg === 'best' ? ' كلهم اتحطوا، فالـ best-fit هو الأكفأ هنا.' : ' والـ 426 KB لازم تستنى.') : ''} الـ first-fit والـ best-fit أحسن من الـ worst-fit في السرعة واستغلال الـ storage.`; }
    else if (s.ph === 0) { en = `<b>${s.e.p} KB</b>: holes big enough: ${s.e.cand.length ? s.e.cand.map(j => free[j] + ' KB').join(', ') : 'none'}.`; a = `الـ process اللي حجمها <b>${s.e.p} KB</b>: الـ holes الكبيرة كفاية هي ${s.e.cand.length ? s.e.cand.map(j => free[j] + ' KB').join(' و ') : 'مفيش'}.`; }
    else if (s.e.j >= 0) { en = `${NAME[alg]} picks ${RULE[alg]}: <b>${s.e.hole} KB</b> (partition ${PARTS[s.e.j]}), leaving <b>${s.e.left} KB</b>.`; a = `الـ ${NAME[alg]} بياخد ${RULE_AR[alg]}: <b>${s.e.hole} KB</b> (الـ partition اللي حجمها ${PARTS[s.e.j]})، ويفضل منها <b>${s.e.left} KB</b>.`; }
    else { en = `No hole is big enough: <b>${s.e.p} KB must wait</b>.`; a = `مفيش hole كبيرة كفاية، فالـ <b>${s.e.p} KB لازم تستنى</b>.`; }
    const cur = s && !s.end ? s.e : null;
    return html`<figure className="fig fo5"><div className="fig-stage"><div className="fo5-wrap">
      <${Modes} list=${[['first', 'First-fit'], ['best', 'Best-fit'], ['worst', 'Worst-fit']]} val=${alg} set=${setAlg} />
      <div className="fo5-in"><label>Processes (KB) <input className="w" value=${txt} aria-label="Process sizes in KB" onInput=${e => { setTxt(e.target.value); ctl.go(0); }} /></label>
        ${!ex && html`<button className="fig-btn" onClick=${() => { setTxt('212, 417, 112, 426'); ctl.go(0); }}>Notes example</button>`}</div>
      <div className="fo5-q">${procs.map((p, k) => { const e = log[k]; const st = cur && cur.k === k ? 'cur' : k < doneK ? (e.j >= 0 ? 'done' : 'wait') : ''; return html`<span key=${k} className=${st}>${p}${k < doneK ? (e.j >= 0 ? ' ✓' : ' waits') : ''}</span>`; })}</div>
      <div className="fo5-parts">${PARTS.map((P, j) => { const isC = cur && cur.cand.includes(j), isP = cur && s.ph === 1 && cur.j === j;
        return html`<div key=${j} className="fo5-part"><span className="nm">${P} KB</span>
          <div className=${'fo5-cells' + (isP ? ' pick' : isC ? ' cand' : '')} style=${{ width: (P / 600 * 100) + '%' }}>
            ${used[j].map(u => html`<span key=${u.k} className=${'u n' + (u.k + 1)} style=${{ flexGrow: u.s, flexBasis: 0 }}>${u.s}</span>`)}
            ${free[j] > 0 && html`<span className="h" style=${{ flexGrow: free[j], flexBasis: 0 }}>${free[j] >= 60 ? free[j] : ''}</span>`}</div></div>`; })}</div>
      </div></div><${Cap} en=${en} ar=${a} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §4 external fragmentation and compaction (the first-fit result) ── */
  function ExtFrag({ ar }) {
    // first-fit result from the notes' example: holes 100, 176 (500 − 212 − 112), 200, 300, 183 (600 − 417)
    const ROWS = [{ P: 100, used: [] }, { P: 500, used: [212, 112] }, { P: 200, used: [] }, { P: 300, used: [] }, { P: 600, used: [417] }];
    const total = 100 + 176 + 200 + 300 + 183;
    const steps = [
      { en: 'After <b>first-fit</b>, the 426 KB process is waiting. The holes left are 100, 176, 200, 300 and 183 KB.', ar: 'بعد الـ <b>first-fit</b>، الـ process اللي حجمها 426 KB مستنية. والـ holes اللي فاضلة هي 100 و 176 و 200 و 300 و 183 KB.' },
      { en: `<b>External fragmentation</b>: the free memory adds up to ${total} KB, enough for 426 KB, but it is <b>not contiguous</b>. The largest hole is only 300 KB.`, ar: `الـ <b>external fragmentation</b>: مجموع الـ memory الفاضية ${total} KB، وده يكفي الـ 426 KB، بس هي <b>مش contiguous</b>، وأكبر hole فيها 300 KB بس.` },
      { en: '<b>Compaction</b> shuffles memory contents to place all free memory together in one large block. It is possible only if relocation is dynamic and done at execution time.', ar: 'الـ <b>compaction</b> بيحرك محتويات الـ memory عشان يجمع كل الـ free memory في block واحدة كبيرة. وده ينفع بس لو الـ relocation dynamic وبيحصل وقت الـ execution.' },
      { en: `Now one hole of <b>${total} KB</b> exists and the 426 KB process fits. During compaction, a job doing I/O must be latched in memory, or I/O is done only into OS buffers.`, ar: `دلوقتي فيه hole واحدة <b>${total} KB</b>، والـ process اللي حجمها 426 KB دخلت. وأثناء الـ compaction، الـ job اللي بتعمل I/O لازم تتثبت في الـ memory، أو الـ I/O يتعمل في الـ OS buffers بس.` }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const packed = i >= 2;
    const blocks = packed ? [...ROWS.flatMap(r => r.used), ...(i >= 3 ? [426] : [])] : null;
    return html`<figure className="fig fo5"><div className="fig-stage"><div className="fo5-wrap">
      <div className="fo5-q"><span className=${i >= 3 ? 'done' : 'wait'}>426 KB ${i >= 3 ? '✓' : 'waits'}</span><span>free: ${total} KB</span></div>
      ${packed && html`<div className="fo5-q"><span>packed together: 212, 112, 417${i >= 3 ? ', 426' : ''} KB</span></div>`}
      ${!packed ? html`<div className="fo5-parts">${ROWS.map((r, j) => { const f = r.P - r.used.reduce((a, b) => a + b, 0);
          return html`<div key=${j} className="fo5-part"><span className="nm">${r.P} KB</span><div className=${'fo5-cells' + (i === 1 ? ' cand' : '')} style=${{ width: (r.P / 600 * 100) + '%' }}>
            ${r.used.map((u, k) => html`<span key=${k} className="u" style=${{ flexGrow: u, flexBasis: 0 }}>${u}</span>`)}
            ${f > 0 && html`<span className="h" style=${{ flexGrow: f, flexBasis: 0, background: i === 1 ? 'color-mix(in srgb, var(--pen) 14%, var(--paper))' : undefined }}>${f >= 60 ? f : ''}</span>`}</div></div>`; })}</div>`
        : html`<div className="fo5-part"><span className="nm">all</span><div className="fo5-cells pick" style=${{ height: '40px' }}>
            ${blocks.map((u, k) => html`<span key=${k} className=${'u' + (u === 426 && i >= 3 ? ' n4' : '')} style=${{ flexGrow: u, flexBasis: 0 }} title=${u + ' KB'}>${u >= 400 ? u : ''}</span>`)}
            ${i < 3 && html`<span className="h" style=${{ flexGrow: total, flexBasis: 0, fontWeight: 700, color: 'var(--ok)' }}>${total} free</span>`}
            ${i >= 3 && html`<span className="h" style=${{ flexGrow: total - 426, flexBasis: 0 }}>${total - 426}</span>`}</div></div>`}
      </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §5 segmentation address translation (slide example and review Q6) ── */
  const SEG = { slide: [[1000, 1400], [400, 6300], [400, 4300], [1100, 3200], [1000, 4700]], q6: [[600, 219], [14, 2300], [100, 90], [580, 1327], [96, 1952]] };
  const SEG_EX = { slide: [[2, 53], [3, 852], [0, 1222]], q6: [[0, 430], [1, 10], [2, 500], [3, 400], [4, 112]] };
  function Segment({ ar }) {
    const [set, setSet0] = useState('slide');
    const [sd, setSd] = useState([2, 53]);
    const [st, setSt] = useState('2'), [dt, setDt] = useState('53');
    const T = SEG[set], [s, d] = sd;
    const sOk = s >= 0 && s < T.length, row = sOk ? T[s] : null, dOk = sOk && d < row[0], phys = dOk ? row[1] + d : null;
    const pick = (a, b) => { setSd([a, b]); setSt(String(a)); setDt(String(b)); };
    const setSet = k => { setSet0(k); const e = SEG_EX[k][0]; pick(e[0], e[1]); };
    const en = !sOk ? `Segment ${s} is illegal: s must be &lt; STLR (${T.length}). Trap.` : dOk ? `Logical &lt;${s}, ${d}&gt;: STBR points to the segment table; entry ${s} has limit ${row[0]}, base ${row[1]}. Offset ${d} &lt; ${row[0]}, so physical = ${row[1]} + ${d} = <b>${phys}</b>.` : `Logical &lt;${s}, ${d}&gt;: entry ${s} has limit ${row[0]}. Offset ${d} ≥ ${row[0]}, so the hardware <b>traps: addressing error</b>.`;
    const lg = `<bdi dir="ltr">&lt;${s}, ${d}&gt;</bdi>`;
    const a = !sOk ? `الـ segment رقم ${s} illegal، لأن s لازم يبقى أقل من الـ STLR (${T.length}). فيه trap.` : dOk ? `العنوان ${lg}: الـ STBR بيشاور على الـ segment table، والـ entry رقم ${s} فيها limit ${row[0]} و base ${row[1]}. والـ offset ${d} أقل من ${row[0]}، فالـ physical address هو${L(`${row[1]} + ${d} = <b>${phys}</b>`)}` : `العنوان ${lg}: الـ entry رقم ${s} فيها limit ${row[0]}. والـ offset ${d} مش أقل منه، فالـ hardware بيعمل <b>trap: addressing error</b>.`;
    const top = set === 'slide' ? 6700 : 2600, order = T.map((r, k) => ({ k, base: r[1], lim: r[0] })).sort((x, y) => x.base - y.base);
    const cells = []; let at = 0;
    order.forEach(g => { if (g.base > at) cells.push({ e: 1, h: g.base - at }); cells.push({ k: g.k, h: g.lim, base: g.base }); at = g.base + g.lim; });
    if (at < top) cells.push({ e: 1, h: top - at });
    return html`<figure className="fig fo5"><div className="fig-stage"><div className="fo5-wrap">
      <${Modes} list=${[['slide', 'Slide example'], ['q6', 'Review Q6']]} val=${set} set=${setSet} />
      <div className="fo5-row">${SEG_EX[set].map(([a2, b2]) => html`<button key=${a2 + '-' + b2} className="fig-btn" aria-pressed=${String(s === a2 && d === b2)} onClick=${() => pick(a2, b2)}>(${a2}, ${b2})</button>`)}</div>
      <div className="fo5-in"><label>s <input style=${{ width: '3.4em' }} inputMode="numeric" value=${st} aria-label="Segment number" onInput=${e => { setSt(e.target.value); const v = parseInt(e.target.value, 10); if (!isNaN(v)) setSd([v, d]); }} /></label>
        <label>d <input style=${{ width: '4.6em' }} inputMode="numeric" value=${dt} aria-label="Offset" onInput=${e => { setDt(e.target.value); const v = parseInt(e.target.value, 10); if (!isNaN(v)) setSd([s, v]); }} /></label></div>
      <div className="fo5-two" style=${{ gridTemplateColumns: '1.25fr 1fr' }}>
        <div><table className="fo5-tbl"><thead><tr><th>s</th><th>limit</th><th>base</th></tr></thead>
          <tbody>${T.map((r, k) => html`<tr key=${k} className=${k === s ? (dOk ? 'on' : 'no') : ''}><td>${k}</td><td>${r[0]}</td><td>${r[1]}</td></tr>`)}</tbody></table>
          <div className=${'fo5-box ' + (dOk ? 'good' : 'bad')} style=${{ marginTop: '6px', textAlign: 'center' }}>${dOk ? html`<span className="fo5-mono">${row[1]} + ${d} = </span><b className="fo5-big">${phys}</b>` : html`<b className="fo5-red">trap</b>`}</div></div>
        <div className="fo5-pm" aria-label="Physical memory" style=${{ height: '210px' }}>${cells.map((c, k) => html`<div key=${k} className=${c.e ? 'e' : 's' + (c.k === s && dOk ? ' on' : '')} style=${{ flex: c.h + ' 0 0' }}>${c.e ? '' : 'seg ' + c.k}</div>`)}</div>
      </div></div></div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── §6 paging model: page table 0→1, 1→4, 2→3, 3→7 ── */
  function Paging({ ar }) {
    const PT = [1, 4, 3, 7];
    const steps = [
      { en: 'Logical memory has 4 <b>pages</b>; physical memory is divided into <b>frames</b> of the same size. The OS keeps track of the free frames.', ar: 'الـ logical memory فيها 4 <b>pages</b>، والـ physical memory متقسمة لـ <b>frames</b> بنفس الحجم. والـ OS بيتابع الـ frames الفاضية.', n: 0 },
      ...PT.map((f, p) => ({ en: `Page ${p} is loaded into a free frame: the page table records <b>${p} → ${f}</b>.`, ar: `الـ page رقم ${p} بتتحط في frame فاضية، والـ page table بتسجل${L(`<b>${p} → ${f}</b>`)}`, n: p + 1 })),
      { en: 'Translation: the logical address is (p, d). <b>p</b> indexes the page table to get the frame; the offset <b>d</b> is combined with the frame base. For page 2: (2, d) → frame 3, offset d.', ar: 'الـ translation: الـ logical address هو (p, d). الـ <b>p</b> بيدخل على الـ page table ويجيب الـ frame، والـ offset <b>d</b> بيتضاف على بداية الـ frame. يعني الـ page رقم 2:' + L('(2, d) → frame 3, offset d'), n: 4, x: 2 },
      { en: 'With a logical address space of 2<sup>m</sup> and page size 2<sup>n</sup>, <b>p</b> is the high m − n bits and <b>d</b> the low n bits. The physical frames of a process can be <b>noncontiguous</b>: no external fragmentation.', ar: 'لو الـ logical address space حجمها 2<sup>m</sup> والـ page size حجمها 2<sup>n</sup>، يبقى الـ <b>p</b> هو أعلى m − n bits والـ <b>d</b> هو أقل n bits. والـ frames بتاعة الـ process ممكن تبقى <b>noncontiguous</b>، فمفيش external fragmentation.', n: 4, bits: 1 }
    ];
    const [i, ctl] = useSteps(steps.length, 2300);
    const s = steps[i];
    const [sel, setSel] = useState(null);
    const hl = sel != null ? sel : s.x != null ? s.x : (s.n >= 1 && s.n <= 4 && i <= 4 ? s.n - 1 : null);
    return html`<figure className="fig fo5"><div className="fig-stage"><div className="fo5-wrap">
      <div className="fo5-two" style=${{ gridTemplateColumns: '1fr 1.2fr 1fr' }}>
        <div><small className="fo5-mono" style=${{ color: 'var(--graphite)' }}>logical</small><div className="fo5-frames">${PT.map((f, p) => html`<div key=${p} className="fo5-fr" style=${{ gridTemplateColumns: '1fr' }}><button className=${'c fig-btn' + (p === hl ? ' on' : ' full')} style=${{ minHeight: '24px', padding: '0' }} onClick=${() => { setSel(p); ctl.go(steps.length - 2); }}>page ${p}</button></div>`)}</div></div>
        <div><small className="fo5-mono" style=${{ color: 'var(--graphite)' }}>page table</small>
          <table className="fo5-tbl" style=${{ width: '100%' }}><thead><tr><th>p</th><th>frame</th></tr></thead><tbody>${PT.map((f, p) => html`<tr key=${p} className=${p === hl ? 'on' : ''}><td>${p}</td><td>${p < s.n ? f : ''}</td></tr>`)}</tbody></table></div>
        <div><small className="fo5-mono" style=${{ color: 'var(--graphite)' }}>physical</small><div className="fo5-frames">${[0, 1, 2, 3, 4, 5, 6, 7].map(f => { const p = PT.indexOf(f), on = p >= 0 && p < s.n;
          return html`<div key=${f} className="fo5-fr" style=${{ gridTemplateColumns: '1.6em 1fr' }}><span className="n">${f}</span><span className=${'c' + (on ? (p === hl ? ' on' : ' full') : '')} style=${{ height: '20px' }}>${on ? 'p' + p : ''}</span></div>`; })}</div></div>
      </div>
      ${hl != null && i >= 5 && html`<div className="fo5-split" style=${{ marginTop: '10px' }}><span className="pp">p = ${hl}</span><span>d</span><span style=${{ flex: '.4', border: 0 }}>→</span><span className="pp">f = ${PT[hl]}</span><span>d</span></div>`}
      ${s.bits && html`<div className="fo5-split" style=${{ marginTop: '8px' }}><span className="pp">p: m − n bits</span><span>d: n bits</span></div>`}
      </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §6 internal fragmentation calculator (page 2,048 B, process 72,766 B) ── */
  function PageFrag({ ar }) {
    const [ps, setPs] = useState(2048), [sz, setSz] = useState(72766), [t, setT] = useState('72766');
    const full = Math.floor(sz / ps), rest = sz % ps, frames = full + (rest ? 1 : 0), waste = rest ? ps - rest : 0;
    const ex = ps === 2048 && sz === 72766;
    const en = `${fmt(sz)} B ÷ ${fmt(ps)} B = <b>${full} pages + ${fmt(rest)} B</b>, so the process needs <b>${frames} frames</b>. The last frame wastes ${fmt(ps)} − ${fmt(rest)} = <b>${fmt(waste)} B</b> of <b>internal fragmentation</b>${ex ? ' (the example from the notes)' : ''}. Worst case = 1 frame − 1 byte; on average ½ frame. Smaller pages mean less fragmentation but more page-table entries.`;
    const a = `الحسبة:${L(`${sz} B ÷ ${ps} B = <b>${full} pages + ${rest} B</b>`)}يعني الـ process محتاجة <b>${frames} frames</b>. وآخر frame بيضيع منها${L(`${ps} − ${rest} = <b>${waste} B</b>`)}وده اسمه <b>internal fragmentation</b>${ex ? '، وده مثال الـ notes' : ''}. أسوأ حالة هي frame إلا byte واحد، وفي المتوسط نص frame. والـ pages الأصغر معناها fragmentation أقل، بس entries أكتر في الـ page table.`;
    const shown = Math.min(frames, 48);
    return html`<figure className="fig fo5"><div className="fig-stage"><div className="fo5-wrap">
      <div className="fo5-in"><label>Process (B) <input inputMode="numeric" value=${t} aria-label="Process size in bytes" onInput=${e => { setT(e.target.value); const v = parseInt(e.target.value.replace(/\D/g, ''), 10); if (v > 0) setSz(v); }} /></label>
        <label>Page <select value=${ps} aria-label="Page size in bytes" onChange=${e => setPs(+e.target.value)}>${[512, 1024, 2048, 4096, 8192].map(v => html`<option key=${v} value=${v}>${fmt(v)} B</option>`)}</select></label>
        ${!ex && html`<button className="fig-btn" onClick=${() => { setPs(2048); setSz(72766); setT('72766'); }}>Notes example</button>`}</div>
      <small>${frames} frames${frames > shown ? ` (first ${shown} drawn)` : ''}</small>
      <div className="fo5-pg" aria-hidden="true">${Array.from({ length: shown }, (_, k) => html`<i key=${k} className=${k === frames - 1 && rest ? 'l' : ''}></i>`)}</div>
      <small>Last frame (${fmt(ps)} B)</small>
      <div className="fo5-last"><span className="used" style=${{ width: (rest ? rest / ps * 100 : 100) + '%' }}>${rest ? fmt(rest) + ' B used' : 'full'}</span>${waste > 0 && html`<span className="waste">${fmt(waste)} B wasted</span>`}</div>
      </div></div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'os-base-limit': BaseLimit, 'os-binding-steps': Binding, 'os-mmu-reloc': Mmu, 'os-swapping': Swap, 'os-fit-sim': FitSim, 'os-ext-frag': ExtFrag, 'os-segment-xlate': Segment, 'os-paging-model': Paging, 'os-page-frag': PageFrag });
})();
/* ── part 6 ── */
// OS visuals, part 6: L5 virtual memory (demand paging, page faults, page replacement FIFO / OPT / LRU, Belady, LRU implementations, second chance, LFU/MFU). Every label and caption comes from the site's notes for L5.
(function () {
  const { useState, useEffect } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.fo6 .fig-dots i.on{ background:var(--k-os); } .fo6 .fig-btn:hover{ border-color:var(--k-os); }
.fo6 .fig-btn.sel, .fo6 .fig-btn[aria-pressed="true"]{ border-color:var(--k-os); box-shadow:0 0 0 1px var(--k-os); background:color-mix(in srgb, var(--k-os) 14%, var(--paper)); }
.fo6 .fig-btn:disabled{ opacity:.45; cursor:default; }
.fo6-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.fo6-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.fo6-h{ font-size:.8rem; color:var(--graphite); text-align:center; margin:0 0 4px; font-weight:600; }
.fo6-muted{ font-size:.8rem; color:var(--graphite); text-align:center; margin:6px 0 0; }
.fo6-box{ border:1.4px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:5px 8px; font-size:.84rem; line-height:1.3; transition:all .4s ease; }
.fo6-box.on{ border-color:var(--k-os); box-shadow:0 0 0 2px color-mix(in srgb, var(--k-os) 35%, transparent); }
.fo6-box.dim{ opacity:.35; }
.fo6-box.bad{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 10%, var(--paper)); }
.fo6-box.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, var(--paper)); }
.fo6-box small{ display:block; font-size:.78rem; color:var(--graphite); }
.fo6-tag{ display:inline-block; font-size:.76rem; font-weight:700; border-radius:99px; padding:0 7px; border:1px solid var(--line); background:var(--paper-2); color:var(--ink); margin-left:4px; }
.fo6-tag.v{ border-color:var(--ok); color:var(--ink); background:color-mix(in srgb, var(--ok) 18%, var(--paper)); }
.fo6-tag.i{ border-color:var(--pen); color:var(--pen); background:var(--paper); }
.fo6-tag.k{ border-color:var(--k-os); background:color-mix(in srgb, var(--k-os) 16%, var(--paper)); }
.fo6-two{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:10px; max-width:460px; margin:0 auto; align-items:start; }
.fo6-col{ display:flex; flex-direction:column; gap:5px; }
.fo6-arrow{ text-align:center; color:var(--graphite); font-size:1rem; line-height:1.2; }
/* page-fault picture */
.fo6-pf{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:8px; max-width:440px; margin:0 auto; }
.fo6-pf .fo6-box{ min-height:46px; }
.fo6-pf .wide{ grid-column:1 / -1; }
.fo6-num{ display:inline-grid; place-items:center; width:20px; height:20px; border-radius:50%; font-size:.78rem; font-weight:700; background:var(--s-os); color:#fff; margin-right:5px; vertical-align:1px; }
.fo6-page{ display:inline-block; font-family:var(--mono); font-weight:700; border-radius:5px; padding:0 6px; background:color-mix(in srgb, var(--k-os) 22%, var(--paper)); color:var(--ink); }
/* stages */
.fo6-st{ display:flex; flex-direction:column; gap:4px; max-width:460px; margin:0 auto; }
.fo6-st div{ display:grid; grid-template-columns:22px minmax(0,1fr) auto; gap:6px; align-items:center; border:1px solid var(--line); border-radius:7px; padding:4px 7px; font-size:.82rem; line-height:1.3; background:var(--paper); color:var(--ink); opacity:.4; transition:all .35s; }
.fo6-st div.done{ opacity:.8; }
.fo6-st div.on{ opacity:1; border-color:var(--k-os); box-shadow:0 0 0 2px color-mix(in srgb, var(--k-os) 30%, transparent); }
.fo6-st b.n{ font-size:.78rem; color:var(--graphite); }
.fo6-who{ font-size:.76rem; font-weight:700; border-radius:99px; padding:1px 7px; white-space:nowrap; border:1px solid var(--line); }
.fo6-who.os{ background:color-mix(in srgb, var(--k-os) 16%, var(--paper)); } .fo6-who.disk{ background:color-mix(in srgb, var(--graphite) 16%, var(--paper)); } .fo6-who.other{ background:color-mix(in srgb, var(--ok) 16%, var(--paper)); } .fo6-who.me{ background:var(--paper-2); }
.fo6-now{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:3px 8px; max-width:460px; margin:0 auto 10px; font-size:.82rem; color:var(--ink); }
.fo6-now span:nth-child(odd){ color:var(--graphite); }
/* simulator */
.fo6-in{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; margin:0 0 8px; font-size:.84rem; color:var(--ink); }
.fo6-in textarea{ resize:none; overflow:hidden; } .fo6-in input, .fo6-in textarea{ font:inherit; font-family:var(--mono); font-size:.84rem; width:100%; max-width:330px; box-sizing:border-box; padding:5px 7px; border:1px solid var(--line); border-radius:7px; background:var(--paper); color:var(--ink); }
.fo6-in textarea:focus, .fo6-in input:focus{ outline:2px solid var(--k-os); outline-offset:1px; }
.fo6-in .fig-btn{ min-width:32px; padding:3px 8px; }
.fo6-str{ display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin:0 auto 10px; max-width:460px; }
.fo6-str span{ position:relative; min-width:22px; text-align:center; font-family:var(--mono); font-size:.86rem; padding:2px 3px; border-radius:5px; border:1px solid var(--line); background:var(--paper); color:var(--ink); }
.fo6-str span.past{ opacity:.55; } .fo6-str span.cur{ border-color:var(--k-os); box-shadow:0 0 0 2px var(--k-os); opacity:1; font-weight:700; }
.fo6-str span.f::after{ content:'F'; position:absolute; top:-9px; right:-4px; font-size:.7rem; font-weight:700; color:var(--pen); background:var(--paper); border-radius:4px; padding:0 2px; line-height:1.2; }
.fo6-str span.mark{ background:color-mix(in srgb, var(--k-os) 18%, var(--paper)); }
.fo6-fr{ display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin:0 0 8px; }
.fo6-fr div{ min-width:62px; border:1.5px solid var(--graphite); border-radius:7px; padding:4px 6px; text-align:center; background:var(--paper); color:var(--ink); transition:all .35s; }
.fo6-fr div b{ display:block; font-family:var(--mono); font-size:1.1rem; line-height:1.2; min-height:1.2em; }
.fo6-fr div small{ display:block; font-size:.76rem; color:var(--graphite); line-height:1.2; }
.fo6-fr div.new{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.fo6-fr div.vic{ border-color:var(--pen); box-shadow:0 0 0 2px color-mix(in srgb, var(--pen) 30%, transparent); }
.fo6-fr div.hit{ border-color:var(--k-os); box-shadow:0 0 0 2px color-mix(in srgb, var(--k-os) 35%, transparent); }
.fo6-cnt{ text-align:center; font-size:.9rem; color:var(--ink); margin:0 0 8px; }
.fo6-cnt b{ color:var(--k-os); font-size:1.05rem; }
.fo6-hist{ display:flex; flex-wrap:wrap; gap:3px; justify-content:center; max-width:460px; margin:0 auto; }
.fo6-hist .c{ display:flex; flex-direction:column; gap:1px; }
.fo6-hist .c span{ width:22px; height:19px; display:grid; place-items:center; font-family:var(--mono); font-size:.76rem; border:1px solid var(--line); background:var(--paper); color:var(--ink); }
.fo6-hist .c span.r{ background:var(--paper-2); font-weight:700; }
.fo6-hist .c span.n{ background:color-mix(in srgb, var(--ok) 20%, var(--paper)); font-weight:700; }
.fo6-hist .c span.x{ border:0; background:transparent; color:var(--pen); font-weight:700; }
.fo6-nav{ display:flex; gap:6px; align-items:center; flex-wrap:wrap; justify-content:center; padding:0 12px 12px; }
.fo6-nav .cnt{ font-size:.82rem; color:var(--graphite); }
.fo6-cmp{ display:flex; gap:6px; justify-content:center; flex-wrap:wrap; margin:8px 0 0; font-size:.82rem; }
.fo6-cmp span{ border:1px solid var(--line); border-radius:99px; padding:2px 9px; background:var(--paper); color:var(--ink); }
.fo6-cmp span.on{ border-color:var(--k-os); background:color-mix(in srgb, var(--k-os) 14%, var(--paper)); font-weight:700; }
/* belady */
.fo6-bl{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:10px; max-width:460px; margin:0 auto; }
.fo6-bl .fo6-fr div{ min-width:24px; padding:2px 3px; } .fo6-bl .fo6-fr{ gap:3px; flex-wrap:nowrap; }
/* lru implementations */
.fo6-tbl{ border-collapse:collapse; margin:0 auto; font-size:.84rem; }
.fo6-tbl td, .fo6-tbl th{ border:1px solid var(--line); padding:3px 7px; text-align:center; background:var(--paper); color:var(--ink); }
.fo6-tbl th{ background:var(--paper-2); color:var(--graphite); font-size:.78rem; }
.fo6-tbl td.min{ background:color-mix(in srgb, var(--pen) 12%, var(--paper)); font-weight:700; }
.fo6-stack{ display:flex; flex-direction:column; gap:3px; align-items:center; }
.fo6-stack span{ width:70px; text-align:center; font-family:var(--mono); font-size:.88rem; border:1.4px solid var(--graphite); border-radius:5px; padding:2px 0; background:var(--paper); color:var(--ink); transition:all .3s; }
.fo6-stack span.top{ border-color:var(--k-os); background:color-mix(in srgb, var(--k-os) 16%, var(--paper)); }
.fo6-stack span.bot{ border-color:var(--pen); }
/* clock */
.fo6-ring{ position:relative; width:240px; height:220px; margin:0 auto 6px; }
.fo6-ring .s{ position:absolute; width:76px; transform:translate(-50%,-50%); border:1.5px solid var(--graphite); border-radius:8px; background:var(--paper); color:var(--ink); text-align:center; padding:3px 0; transition:all .35s; }
.fo6-ring .s b{ display:block; font-family:var(--mono); font-size:1.05rem; min-height:1.2em; }
.fo6-ring .s small{ display:block; font-size:.76rem; color:var(--graphite); }
.fo6-ring .s .hd{ position:absolute; top:-19px; left:50%; transform:translateX(-50%); font-size:.78rem; font-weight:700; color:var(--k-os); }
.fo6-ring .s.hand{ border-color:var(--k-os); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-os) 35%, transparent); }
.fo6-ring .s.new{ background:color-mix(in srgb, var(--ok) 16%, var(--paper)); }
.fo6-ring .ctr{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); font-size:.78rem; color:var(--graphite); text-align:center; }
.fo6 .ltr{ display:block; direction:ltr; unicode-bidi:isolate; }
@media (prefers-reduced-motion: reduce){ .fo6-box, .fo6-st div, .fo6-fr div, .fo6-stack span, .fo6-ring .s{ transition:none; } }`;
  if (!document.getElementById('fo6-css')) { const s = document.createElement('style'); s.id = 'fo6-css'; s.textContent = CSS; document.head.appendChild(s); }

  const LECT = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
  const BEL = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];
  const LTR = t => `<span class="ltr">${t}</span>`;

  // page replacement on a reference string: each step keeps the frames (victim replaced in its own frame), fault, victim and why
  function simulate(refs, nf, algo) {
    const fr = Array(nf).fill(null), loaded = Array(nf).fill(-1), last = {}, out = [];
    refs.forEach((p, t) => {
      let slot = fr.indexOf(p), fault = false, victim = null, key = null, kind = 'hit';
      if (slot < 0) {
        fault = true; slot = fr.indexOf(null); kind = 'empty';
        if (slot < 0) {
          kind = 'replace';
          if (algo === 'FIFO') { slot = loaded.indexOf(Math.min(...loaded)); key = loaded[slot] + 1; }
          else if (algo === 'LRU') { let b = 0; fr.forEach((q, k) => { if (last[q] < last[fr[b]]) b = k; }); slot = b; key = last[fr[b]] + 1; }
          else { const nx = fr.map(q => { const k = refs.indexOf(q, t + 1); return k < 0 ? Infinity : k; }); let b = 0; nx.forEach((v, k) => { if (v > nx[b]) b = k; }); slot = b; key = nx[b] === Infinity ? null : nx[b] + 1; }
          victim = fr[slot];
        }
        fr[slot] = p; loaded[slot] = t;
      }
      last[p] = t;
      const info = fr.map((q, k) => q == null ? null : algo === 'FIFO' ? loaded[k] + 1 : algo === 'LRU' ? last[q] + 1 : (() => { const n = refs.indexOf(q, t + 1); return n < 0 ? null : n + 1; })());
      out.push({ t, p, frames: fr.slice(), fault, slot, victim, key, kind, info });
    });
    return out;
  }
  const NAME = { FIFO: 'FIFO', OPT: 'Optimal (OPT)', LRU: 'LRU' };
  function sayStep(s, algo) {
    if (!s) return null;
    const p = s.p, n = s.t + 1;
    if (s.kind === 'hit') return { en: `Reference #${n}: page <b>${p}</b> is already in memory, so <b>no fault</b>.`, ar: `الـ reference رقم ${n}: الـ page <b>${p}</b> موجودة في الـ memory أصلًا، فـ<b>مفيش fault</b>.` };
    if (s.kind === 'empty') return { en: `Reference #${n}: page <b>${p}</b> goes into an empty frame. That is still a <b>fault</b>: every empty-frame fill at the start counts.`, ar: `الـ reference رقم ${n}: الـ page <b>${p}</b> بتدخل frame فاضي. وده برضه <b>fault</b>، لأن كل ملء لـ frame فاضي في الأول بيتحسب.` };
    const v = s.victim;
    if (algo === 'FIFO') return { en: `Reference #${n}: page <b>${p}</b> is not in memory: <b>fault</b>. FIFO replaces page <b>${v}</b>, the page that has been in memory the longest (loaded at #${s.key}).`, ar: `الـ reference رقم ${n}: الـ page <b>${p}</b> مش في الـ memory، يعني <b>fault</b>. الـ FIFO بيشيل الـ page <b>${v}</b>، لأنها أقدم page في الـ memory (دخلت عند رقم ${s.key}).` };
    if (algo === 'LRU') return { en: `Reference #${n}: page <b>${p}</b> is not in memory: <b>fault</b>. LRU replaces page <b>${v}</b>, the page that has not been used for the longest time (last used at #${s.key}).`, ar: `الـ reference رقم ${n}: الـ page <b>${p}</b> مش في الـ memory، يعني <b>fault</b>. الـ LRU بيشيل الـ page <b>${v}</b>، لأنها أكتر page بقالها مدة ماتستخدمتش (آخر استخدام عند رقم ${s.key}).` };
    return s.key == null
      ? { en: `Reference #${n}: page <b>${p}</b> is not in memory: <b>fault</b>. OPT replaces page <b>${v}</b>: it is never used again.`, ar: `الـ reference رقم ${n}: الـ page <b>${p}</b> مش في الـ memory، يعني <b>fault</b>. الـ OPT بيشيل الـ page <b>${v}</b>، لأنها مش هتتستخدم تاني خالص.` }
      : { en: `Reference #${n}: page <b>${p}</b> is not in memory: <b>fault</b>. OPT replaces page <b>${v}</b>: of the pages in memory it is used farthest in the future (next at #${s.key}).`, ar: `الـ reference رقم ${n}: الـ page <b>${p}</b> مش في الـ memory، يعني <b>fault</b>. الـ OPT بيشيل الـ page <b>${v}</b>، لأنها أبعد page هتتستخدم في المستقبل (جاية عند رقم ${s.key}).` };
  }
  const infoLabel = (algo, v, ar) => v == null ? (algo === 'OPT' ? (ar ? 'never again' : 'never again') : '') : algo === 'FIFO' ? `in since #${v}` : algo === 'LRU' ? `last used #${v}` : `next use #${v}`;
  // a small step controller for simulators: 0 = nothing processed yet
  function useRun(n, ms) {
    const [t, setT] = useState(calm() ? n : 0), [play, setPlay] = useState(!calm());
    useEffect(() => { if (t > n) setT(n); }, [n]);
    useEffect(() => { if (!play) return; if (t >= n) { setPlay(false); return; } const id = setTimeout(() => setT(x => x + 1), ms); return () => clearTimeout(id); }, [t, play, n]);
    return { t: Math.min(t, n), play, go: x => { setPlay(false); setT(Math.max(0, Math.min(n, x))); }, toggle: () => { if (t >= n) { setT(0); setPlay(true); } else setPlay(p => !p); }, restart: () => { setT(0); setPlay(!calm()); } };
  }
  const Nav = ({ r, n }) => html`<div className="fig-bar fo6-nav">
    <button className="fig-btn" onClick=${() => r.go(r.t - 1)} disabled=${r.t === 0} aria-label="Previous reference">‹ Back</button>
    <button className="fig-btn" onClick=${() => r.go(r.t + 1)} disabled=${r.t >= n} aria-label="Next reference">Next ›</button>
    <button className="fig-btn" onClick=${r.toggle}>${r.play ? '❚❚ Pause' : '▶ Play'}</button>
    <button className="fig-btn" onClick=${() => r.go(n)} disabled=${r.t >= n}>End</button>
    <span className="cnt">${r.t} / ${n}</span></div>`;
  const parseRefs = s => (s.match(/\d+/g) || []).map(Number).filter(x => x <= 99).slice(0, 30);

  /* ── 0.0-0.4: only part of the program in memory, the rest on disk ── */
  function VmSpace({ ar }) {
    const PG = [['Code in use', 0], ['Code in use', 1], ['Error code', null], ['Unusual routines', null], ['Large data structures', null], ['Large data structures', null]];
    const steps = [
      { en: 'Code must be in memory to execute, but the <b>entire program is rarely used</b>.', ar: 'الـ code لازم يبقى في الـ memory عشان يتنفذ، بس <b>البرنامج كله نادرًا ما بيتستخدم</b>.' },
      { en: 'Parts like <b>error code</b>, <b>unusual routines</b> and <b>large data structures</b> are rarely used, and not all parts are needed at the same time.', ar: 'فيه أجزاء زي الـ <b>error code</b> والـ <b>unusual routines</b> والـ <b>large data structures</b> نادرًا ما بتتستخدم، ومش كل الأجزاء محتاجينها في نفس الوقت.', rare: 1 },
      { en: '<b>Virtual memory</b> separates user logical memory from physical memory: only the needed part is in memory, and the <b>MMU</b> maps logical pages to physical page frames. The rest stays on disk.', ar: 'الـ <b>virtual memory</b> بتفصل الـ logical memory بتاعة الـ user عن الـ physical memory: الجزء المحتاجينه بس هو اللي في الـ memory، والـ <b>MMU</b> بيربط الـ logical pages بالـ physical page frames. والباقي بيفضل على الـ disk.', map: 1 },
      { en: 'So the <b>logical address space can be much larger</b> than the physical address space: the program is no longer constrained by physical memory.', ar: 'وبكده الـ <b>logical address space ممكن يبقى أكبر بكتير</b> من الـ physical address space، والبرنامج مابقاش محدود بالـ physical memory.', map: 1 },
      { en: 'Each program uses less memory, so <b>more programs run at the same time</b>: higher CPU utilization and throughput, and less I/O to load or swap.', ar: 'كل برنامج بقى بياخد memory أقل، فـ<b>برامج أكتر بتشتغل في نفس الوقت</b>: الـ CPU utilization والـ throughput بيزيدوا، والـ I/O اللي بنحتاجه للـ load أو الـ swap بيقل.', map: 1, two: 1 },
      { en: 'Virtual memory is implemented via <b>demand paging</b> or <b>demand segmentation</b>.', ar: 'الـ virtual memory بتتنفذ عن طريق الـ <b>demand paging</b> أو الـ <b>demand segmentation</b>.', map: 1, two: 1 }
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const s = steps[i];
    const frames = [s.map ? 'P1 page 0' : '', s.two ? 'P2 page 0' : '', s.map ? 'P1 page 1' : '', s.two ? 'P2 page 1' : ''];
    return html`<figure className="fig fo6"><div className="fig-stage">
      <div className="fo6-two">
        <div><p className="fo6-h">Logical address space (P1)</p><div className="fo6-col">
          ${PG.map(([t, f], k) => { const rare = f == null; return html`<div key=${k} className=${'fo6-box' + (s.rare && rare ? ' bad' : '') + (s.map && !rare ? ' on' : '')}>page ${k}<small>${t}</small>
            ${s.map ? html`<span className=${'fo6-tag ' + (rare ? 'i' : 'v')}>${rare ? 'disk' : 'frame ' + (f * 2)}</span>` : null}</div>`; })}</div></div>
        <div><p className="fo6-h">Physical memory (page frames)</p><div className="fo6-col">
          ${frames.map((t, k) => html`<div key=${k} className=${'fo6-box' + (t ? ' ok' : ' dim')}>frame ${k}<small>${t || 'free'}</small></div>`)}</div>
          ${s.map ? html`<p className="fo6-muted">MMU: logical → physical</p>` : null}
          ${s.two ? html`<p className="fo6-muted">P2 also fits: more programs run at once</p>` : null}</div>
      </div></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 1.0-1.4: demand paging with the valid-invalid bit (try it) ── */
  function DemandPaging({ ar }) {
    const N = 6;
    const [tab, setTab] = useState(() => Array(N).fill(null)), [msg, setMsg] = useState(null), [last, setLast] = useState(null);
    const free = () => { for (let f = 0; f < N; f++) if (!tab.includes(f)) return f; return null; };
    const ref = p => {
      setLast(p);
      if (p >= N) { setMsg({ en: `Page ${p} is outside the process's address space: an <b>invalid reference</b>, so the process is <b>aborted</b>.`, ar: `الـ page ${p} برة الـ address space بتاع الـ process، يعني <b>invalid reference</b>، فالـ process بيتعمله <b>abort</b>.`, bad: 1 }); return; }
      if (tab[p] != null) { setMsg({ en: `Entry ${p} has <b>v</b>: the page is memory resident, so the MMU translates to frame ${tab[p]}. No difference from ordinary paging.`, ar: `الـ entry رقم ${p} عليها <b>v</b>، يعني الـ page موجودة في الـ memory، فالـ MMU بيترجم العنوان لـ frame ${tab[p]}. مفيش أي فرق عن الـ paging العادي.` }); return; }
      const f = free(); const t = tab.slice(); t[p] = f; setTab(t);
      setMsg({ en: `Entry ${p} has <b>i</b>: the MMU finds i during translation, so a <b>page fault</b> occurs. The page is brought into frame ${f} only now that it is needed, and its bit becomes <b>v</b>.`, ar: `الـ entry رقم ${p} عليها <b>i</b>، فالـ MMU لما يلاقي i وهو بيترجم بيحصل <b>page fault</b>. الـ page بتدخل frame ${f} دلوقتي بس لما احتجناها، والـ bit بتاعها بيبقى <b>v</b>.`, fault: 1 });
    };
    const reset = () => { setTab(Array(N).fill(null)); setMsg(null); setLast(null); };
    const m = msg || { en: '<b>Try it:</b> reference a page. Initially every page-table entry is <b>i</b> (not in memory): a lazy swapper brings a page in only when it is needed.', ar: '<b>جرّب:</b> اعمل reference لـ page. في الأول كل الـ entries في الـ page table عليها <b>i</b> (مش في الـ memory)، والـ lazy swapper مش بيدخّل page غير لما نحتاجها.' };
    return html`<figure className="fig fo6"><div className="fig-stage">
      <div className="fo6-row">${[...Array(N).keys(), 9].map(p => html`<button key=${p} className="fig-btn" onClick=${() => ref(p)}>Page ${p}</button>`)}<button className="fig-btn" onClick=${reset}>↻ Reset</button></div>
      <div className="fo6-two">
        <div><p className="fo6-h">Page table</p><div className="fo6-col">
          ${tab.map((f, p) => html`<div key=${p} className=${'fo6-box' + (last === p ? ' on' : '')}>page ${p}: ${f == null ? '-' : 'frame ' + f}<span className=${'fo6-tag ' + (f == null ? 'i' : 'v')}>${f == null ? 'i' : 'v'}</span></div>`)}</div></div>
        <div><p className="fo6-h">Physical memory</p><div className="fo6-col">
          ${[...Array(N).keys()].map(f => { const p = tab.indexOf(f); return html`<div key=${f} className=${'fo6-box' + (p < 0 ? ' dim' : last === p ? ' ok' : '')}>frame ${f}<small>${p < 0 ? 'free' : 'page ' + p}</small></div>`; })}</div></div>
      </div>
      ${m.bad ? html`<p className="fo6-muted" style=${{ color: 'var(--pen)', fontWeight: 700 }}>Abort</p>` : null}</div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /></figure>`;
  }

  /* ── 2.0-2.5: the steps in handling a page fault ── */
  function PageFault({ ar }) {
    const steps = [
      { en: 'The process references page <b>M</b>, but its page-table entry is <b>i</b>: the page is not resident.', ar: 'الـ process بيعمل reference للـ page <b>M</b>، بس الـ entry بتاعها في الـ page table عليها <b>i</b>، يعني الـ page مش موجودة.', on: ['proc', 'tab'] },
      { en: 'The first reference to a non-resident page <b>traps to the OS</b>: a <b>page fault</b>.', ar: 'أول reference لـ page مش موجودة بيعمل <b>trap للـ OS</b>، وده الـ <b>page fault</b>.', on: ['os'], n: 0 },
      { en: '<b>1)</b> The OS looks at another table to decide: an <b>invalid reference</b> → abort; <b>just not in memory</b> → continue.', ar: '<b>(1)</b> الـ OS بيبص في table تاني عشان يقرر: لو <b>invalid reference</b> يبقى abort، ولو <b>مش في الـ memory بس</b> يبقى نكمل.', on: ['os'], n: 1 },
      { en: '<b>2)</b> Find a <b>free frame</b> in physical memory.', ar: '<b>(2)</b> نلاقي <b>free frame</b> في الـ physical memory.', on: ['mem'], n: 2 },
      { en: '<b>3)</b> Swap the page from the backing store into the frame, via a <b>scheduled disk operation</b>.', ar: '<b>(3)</b> نعمل swap للـ page من الـ backing store للـ frame، عن طريق <b>disk operation متجدولة</b>.', on: ['disk', 'mem'], n: 3, moving: 1 },
      { en: '<b>4)</b> Reset the tables to show the page is now in memory: set the validation bit = <b>v</b>.', ar: '<b>(4)</b> نظبط الـ tables عشان توضح إن الـ page بقت في الـ memory، يعني الـ validation bit يبقى <b>v</b>.', on: ['tab'], n: 4, inMem: 1 },
      { en: '<b>5)</b> <b>Restart the instruction</b> that caused the page fault. This time the reference succeeds.', ar: '<b>(5)</b> نعمل <b>restart للـ instruction</b> اللي عملت الـ page fault، والمرة دي الـ reference بينجح.', on: ['proc'], n: 5, inMem: 1 }
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const s = steps[i], on = k => s.on.includes(k), v = i >= 5;
    const B = (k, title, body, extra) => html`<div className=${'fo6-box' + (on(k) ? ' on' : '') + (extra || '')}>${title}<small>${body}</small></div>`;
    return html`<figure className="fig fo6"><div className="fig-stage"><div className="fo6-pf">
      ${B('proc', 'Process', v ? html`<span>load <span className="fo6-page">M</span> ✓ restarted</span>` : html`<span>load <span className="fo6-page">M</span></span>`)}
      ${B('tab', 'Page table', html`<span>M: ${v ? 'frame 2' : '-'} <span className=${'fo6-tag ' + (v ? 'v' : 'i')}>${v ? 'v' : 'i'}</span></span>`)}
      ${B('os', html`<span>${s.n === 0 ? html`<span className="fo6-num">!</span>` : null}Operating system</span>`, i >= 1 && i <= 2 ? (i === 1 ? 'trap: page fault' : 'invalid → abort, not in memory → continue') : 'waiting for a trap', s.n === 0 ? ' bad' : '')}
      ${B('disk', 'Backing store (disk)', html`<span>page <span className="fo6-page">M</span>${s.moving ? ' → moving to frame 2' : ''}</span>`)}
      ${B('mem', 'Physical memory', html`<span>frame 2: ${s.inMem || s.moving ? html`<span className="fo6-page">M</span>` : i >= 3 ? 'free ✓' : 'free'}</span>`, ' wide')}
      </div>
      <p className="fo6-muted">${s.n ? html`<span><span className="fo6-num">${s.n}</span>step ${s.n} of 5</span>` : 'page fault handling'}</p></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 3.0-3.10: the 11 stages (worst case), and who has the CPU ── */
  function FaultStages({ ar }) {
    const S = [
      ['Trap to the operating system', 'os'], ['Save the user registers and process state', 'os'], ['Determine that the interrupt was a page fault', 'os'],
      ['Check the reference is legal; find the page on the disk', 'os'], ['Issue a read from the disk to a free frame (queue, seek/latency, transfer)', 'disk'],
      ['While waiting, allocate the CPU to some other user', 'other'], ['Interrupt from the disk I/O subsystem (I/O completed)', 'os'],
      ['Save the registers and process state for the other user', 'os'], ['Correct the page table: the page is now in memory', 'os'],
      ['Wait for the CPU to be allocated to this process again', 'other'], ['Restore registers, state and new page table; resume the instruction', 'me']];
    const AR = ['<bdi dir="ltr">1.</bdi> نعمل trap للـ operating system.', '<bdi dir="ltr">2.</bdi> نحفظ الـ user registers والـ process state.', '<bdi dir="ltr">3.</bdi> نحدد إن الـ interrupt كان page fault.',
      '<bdi dir="ltr">4.</bdi> نتأكد إن الـ page reference كان legal، ونحدد مكان الـ page على الـ disk.', '<bdi dir="ltr">5.</bdi> نطلب read من الـ disk لـ free frame: نستنى في الـ device queue لحد ما يتخدم، ونستنى الـ seek و/أو الـ latency، وبعدين يبدأ نقل الـ page للـ free frame.',
      '<bdi dir="ltr">6.</bdi> وإحنا مستنيين، الـ CPU بيروح لـ user تاني.', '<bdi dir="ltr">7.</bdi> بييجي interrupt من الـ disk I/O subsystem إن الـ I/O خلص.',
      '<bdi dir="ltr">8.</bdi> نحفظ الـ registers والـ process state بتوع الـ user التاني.', '<bdi dir="ltr">9.</bdi> نصلّح الـ page table (والـ tables التانية) عشان توضح إن الـ page بقت في الـ memory.',
      '<bdi dir="ltr">10.</bdi> نستنى لحد ما الـ CPU يرجع للـ process ده تاني.', '<bdi dir="ltr">11.</bdi> نرجّع الـ user registers والـ process state والـ page table الجديدة، ونكمل الـ instruction اللي اتقطعت.'];
    const EN = ['Trap to the operating system.', 'Save the user registers and process state.', 'Determine that the interrupt was a page fault.', 'Check that the page reference was legal and determine the location of the page on the disk.', 'Issue a read from the disk to a free frame: wait in the device queue until serviced, wait for the device seek and/or latency time, then begin the transfer of the page to a free frame.', 'While waiting, allocate the CPU to some other user.', 'Receive an interrupt from the disk I/O subsystem (I/O completed).', 'Save the registers and process state for the other user.', 'Correct the page table (and other tables) to show the page is now in memory.', 'Wait for the CPU to be allocated to this process again.', 'Restore the user registers, process state and new page table, then resume the interrupted instruction.'];
    const steps = [{ en: 'The <b>worst case</b> of demand paging goes through <b>11 stages</b>. Watch who has the CPU and what the disk is doing.', ar: 'أسوأ حالة في الـ demand paging بتعدي على <b>11 مرحلة</b>. خلي بالك مين ماسك الـ CPU والـ disk بيعمل إيه.' },
      ...EN.map((e, k) => ({ en: `${k + 1}. ${e}`, ar: AR[k] }))];
    const [i, ctl] = useSteps(steps.length, 2300);
    const k = i - 1, who = { os: 'OS', disk: 'Disk', other: 'Other user', me: 'This process' };
    const cpu = k < 0 ? 'This process' : k <= 4 ? 'OS (this fault)' : k === 5 || k === 9 ? 'Other user' : k === 10 ? 'This process' : 'OS';
    const disk = k >= 4 && k <= 5 ? 'reading the page' : k === 6 ? 'done: interrupt' : 'idle';
    return html`<figure className="fig fo6"><div className="fig-stage">
      <div className="fo6-now"><span>CPU:</span><b>${cpu}</b><span>Disk:</span><b>${disk}</b></div>
      <div className="fo6-st">${S.map(([t, w], j) => html`<div key=${j} className=${j === k ? 'on' : j < k ? 'done' : ''}><b className="n">${j + 1}</b><span>${t}</span><span className=${'fo6-who ' + w}>${who[w]}</span></div>`)}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 4.1-4.2: basic page replacement, one or two transfers ── */
  function BasicReplace({ ar }) {
    const [dirty, setDirty] = useState(true);
    const steps = [
      { en: 'Process needs page <b>D</b>, which is not in memory, and <b>there is no free frame</b>.', ar: 'الـ process محتاج الـ page <b>D</b>، وهي مش في الـ memory، و<b>مفيش free frame</b>.' },
      { en: '<b>(1)</b> Find the location of the desired page <b>D</b> on disk.', ar: '<b>(1)</b> نلاقي مكان الـ page المطلوبة <b>D</b> على الـ disk.', disk: 1 },
      { en: '<b>(2)</b> No free frame, so a <b>page-replacement algorithm selects a victim</b> frame: here page <b>B</b>.', ar: '<b>(2)</b> مفيش free frame، فالـ <b>page-replacement algorithm بيختار victim</b> frame، وهنا الـ page <b>B</b>.', vic: 1, disk: 1 },
      dirty ? { en: 'The victim is <b>dirty</b> (modified), so it is <b>written to disk</b> first (swap out), and its entry becomes <b>i</b>.', ar: 'الـ victim متعدّل (<b>dirty</b>)، فلازم <b>يتكتب على الـ disk</b> الأول (swap out)، والـ entry بتاعته تبقى <b>i</b>.', vic: 1, out: 1, disk: 1 }
        : { en: 'The victim is <b>clean</b> (not modified): the copy on disk is already up to date, so nothing is written. Its entry becomes <b>i</b>.', ar: 'الـ victim مش متعدّل (<b>clean</b>)، والنسخة اللي على الـ disk لسه مظبوطة، فمش محتاجين نكتب حاجة. والـ entry بتاعته تبقى <b>i</b>.', vic: 1, out: 1, disk: 1 },
      { en: '<b>(3)</b> Bring page <b>D</b> into the freed frame (swap in) and update the page and frame tables: D becomes <b>v</b>.', ar: '<b>(3)</b> ندخّل الـ page <b>D</b> في الـ frame اللي فضي (swap in)، ونظبط الـ page table والـ frame table، فالـ D تبقى <b>v</b>.', in: 1, out: 1 },
      { en: '<b>(4)</b> Restart the instruction that caused the trap. ' + (dirty ? 'This fault needed <b>2 page transfers</b> (out + in).' : 'This fault needed only <b>1 page transfer</b> (in).'), ar: '<b>(4)</b> نعمل restart للـ instruction اللي عملت الـ trap. ' + (dirty ? 'الـ fault ده احتاج <b>2 page transfers</b> (out و in).' : 'الـ fault ده احتاج <b>page transfer واحد بس</b> (in).'), in: 1, out: 1, done: 1 }
    ];
    const [i, ctl] = useSteps(steps.length, 2700);
    const s = steps[i], xfers = (s.out && dirty ? 1 : 0) + (s.in ? 1 : 0);
    const mem = ['A', s.in ? 'D' : 'B', 'C'];
    const pt = [['A', 'v'], ['B', s.out ? 'i' : 'v'], ['C', 'v'], ['D', s.in ? 'v' : 'i']];
    return html`<figure className="fig fo6"><div className="fig-stage">
      <div className="fo6-row"><button className="fig-btn" aria-pressed=${String(dirty)} onClick=${() => { setDirty(true); ctl.replay(); }}>Victim is dirty</button><button className="fig-btn" aria-pressed=${String(!dirty)} onClick=${() => { setDirty(false); ctl.replay(); }}>Victim is clean</button></div>
      <div className="fo6-two">
        <div><p className="fo6-h">Physical memory (full)</p><div className="fo6-col">
          ${mem.map((p, k) => html`<div key=${k} className=${'fo6-box' + (k === 1 && s.vic && !s.in ? ' bad' : '') + (k === 1 && s.in ? ' ok' : '')}>frame ${k}<small>page ${p}${k === 1 && !s.in ? (dirty ? ' (dirty)' : ' (clean)') : ''}</small></div>`)}</div></div>
        <div><p className="fo6-h">Page table</p><div className="fo6-col">
          ${pt.map(([p, b]) => html`<div key=${p} className="fo6-box">page ${p}<span className=${'fo6-tag ' + b}>${b}</span></div>`)}</div></div>
      </div>
      <div className="fo6-box" style=${{ maxWidth: '440px', margin: '10px auto 0' }}>Disk<small>${s.disk || s.in ? 'page D is here' : ''}${s.out ? (dirty ? ' · B written out' : ' · B not written (clean)') : ''}${s.in ? ' · D read in' : ''}</small></div>
      <p className="fo6-cnt">Page transfers for this fault: <b>${xfers}</b></p></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 5.0-5.3: FIFO / OPT / LRU simulator on the lecture string (or your own) ── */
  function ReplaceSim({ ar }) {
    const [algo, setAlgo] = useState('FIFO'), [nf, setNf] = useState(3), [txt, setTxt] = useState(LECT.join(','));
    const refs = parseRefs(txt), sim = simulate(refs, nf, algo), r = useRun(refs.length, 1100);
    const s = r.t > 0 ? sim[r.t - 1] : null, faults = sim.slice(0, r.t).filter(x => x.fault).length;
    const lect = txt.replace(/\s/g, '') === LECT.join(',') && nf === 3;
    const totals = ['FIFO', 'OPT', 'LRU'].map(a => [a, simulate(refs, nf, a).filter(x => x.fault).length]);
    const cap = s ? sayStep(s, algo) : { en: `<b>${NAME[algo]}</b> on the ${lect ? 'lecture' : 'your'} reference string with <b>${nf} frames</b>. ${algo === 'FIFO' ? 'FIFO replaces the page that has been in memory the longest.' : algo === 'OPT' ? 'OPT replaces the page that will not be used for the longest period of time.' : 'LRU replaces the page that has not been used for the longest time.'} Press Play or Next.`, ar: `الـ <b>${NAME[algo]}</b> على الـ reference string ${lect ? 'بتاع المحاضرة' : 'بتاعك'}، بـ <b>${nf} frames</b>. ${algo === 'FIFO' ? 'الـ FIFO بيشيل أقدم page دخلت الـ memory.' : algo === 'OPT' ? 'الـ OPT بيشيل الـ page اللي مش هتتستخدم لأطول فترة.' : 'الـ LRU بيشيل الـ page اللي بقالها أطول مدة ماتستخدمتش.'} دوس Play أو Next.` };
    const end = r.t === refs.length && refs.length;
    const note = end && lect ? { FIFO: { en: ' Total: <b>15 faults</b>, as in the lecture.', ar: ' الإجمالي: <b>15 fault</b>، زي المحاضرة.' }, OPT: { en: ' Total: <b>9 faults</b>, the minimum possible.', ar: ' الإجمالي: <b>9 faults</b>، وده أقل عدد ممكن.' }, LRU: { en: ' Total: <b>12 faults</b>: better than FIFO, worse than OPT.', ar: ' الإجمالي: <b>12 fault</b>: أحسن من الـ FIFO وأوحش من الـ OPT.' } }[algo] : { en: '', ar: '' };
    return html`<figure className="fig fo6"><div className="fig-stage">
      <div className="fo6-row">${['FIFO', 'OPT', 'LRU'].map(a => html`<button key=${a} className="fig-btn" aria-pressed=${String(algo === a)} onClick=${() => { setAlgo(a); r.restart(); }}>${a}</button>`)}</div>
      <div className="fo6-in"><span>Frames</span><button className="fig-btn" onClick=${() => { setNf(Math.max(1, nf - 1)); r.restart(); }} disabled=${nf <= 1} aria-label="Fewer frames">−</button><b>${nf}</b><button className="fig-btn" onClick=${() => { setNf(Math.min(7, nf + 1)); r.restart(); }} disabled=${nf >= 7} aria-label="More frames">+</button>
        <button className="fig-btn" onClick=${() => { setTxt(LECT.join(',')); setNf(3); r.restart(); }}>Example from the notes</button></div>
      <div className="fo6-in"><textarea aria-label="Reference string" rows="2" value=${txt} onChange=${e => { setTxt(e.target.value); r.restart(); }}></textarea></div>
      <div className="fo6-str">${refs.map((p, k) => html`<span key=${k} className=${(k < r.t - 1 ? 'past' : k === r.t - 1 ? 'cur' : '') + (k < r.t && sim[k].fault ? ' f' : '') + (s && s.key != null && s.kind === 'replace' && k === s.key - 1 && algo !== 'FIFO' ? ' mark' : '')}>${p}</span>`)}</div>
      <div className="fo6-fr">${Array.from({ length: nf }, (_, k) => { const p = s ? s.frames[k] : null, isNew = s && s.fault && s.slot === k, hit = s && !s.fault && s.slot === k;
        return html`<div key=${k} className=${isNew ? 'new' : hit ? 'hit' : ''}><small>frame ${k + 1}</small><b>${p == null ? '' : p}</b><small>${s && p != null ? infoLabel(algo, s.info[k]) : ' '}</small></div>`; })}</div>
      <p className="fo6-cnt">Page faults: <b>${faults}</b></p>
      <div className="fo6-hist" aria-label="History">${sim.slice(0, r.t).map((x, k) => html`<div key=${k} className="c"><span className="r">${x.p}</span>${x.frames.map((q, j) => html`<span key=${j} className=${x.fault && x.slot === j ? 'n' : ''}>${q == null ? '' : q}</span>`)}<span className="x">${x.fault ? 'F' : ''}</span></div>`)}</div>
      ${end ? html`<div className="fo6-cmp">${totals.map(([a, n]) => html`<span key=${a} className=${a === algo ? 'on' : ''}>${a}: ${n} faults</span>`)}</div>` : null}</div>
      <${Cap} en=${cap.en + note.en} ar=${cap.ar + note.ar} showAr=${ar} /><${Nav} r=${r} n=${refs.length} /></figure>`;
  }

  /* ── 5.4: Belady's anomaly, 3 vs 4 frames ── */
  function Belady({ ar }) {
    const [algo, setAlgo] = useState('FIFO');
    const a = simulate(BEL, 3, algo), b = simulate(BEL, 4, algo), r = useRun(BEL.length, 1100);
    const fa = a.slice(0, r.t).filter(x => x.fault).length, fb = b.slice(0, r.t).filter(x => x.fault).length, end = r.t === BEL.length;
    const Side = (sim, nf, f) => { const s = r.t ? sim[r.t - 1] : null; return html`<div><p className="fo6-h">${nf} frames</p>
      <div className="fo6-fr">${Array.from({ length: nf }, (_, k) => html`<div key=${k} className=${s && s.slot === k ? (s.fault ? 'new' : 'hit') : ''}><b>${s && s.frames[k] != null ? s.frames[k] : ''}</b></div>`)}</div>
      <p className="fo6-cnt">faults: <b>${f}</b>${s ? (s.fault ? ' (F)' : ' (hit)') : ''}</p></div>`; };
    let cap;
    if (!end) cap = { en: `${algo} on <b>1,2,3,4,1,2,5,1,2,3,4,5</b> with 3 frames and with 4 frames, side by side.${r.t ? ` Reference #${r.t}: page <b>${BEL[r.t - 1]}</b>.` : ''}`, ar: `الـ ${algo} على الـ reference string ده، مرة بـ 3 frames ومرة بـ 4 frames جنب بعض:${LTR('1,2,3,4,1,2,5,1,2,3,4,5')}${r.t ? `الـ reference رقم ${r.t} هو الـ page <b>${BEL[r.t - 1]}</b>.` : ''}` };
    else if (algo === 'FIFO') cap = { en: '<b>Belady\'s anomaly</b>: FIFO gives <b>9 faults with 3 frames but 10 with 4 frames</b>. Adding more frames can cause more page faults.', ar: 'ده الـ <b>Belady\'s anomaly</b>: الـ FIFO بيدّي <b>9 faults بـ 3 frames، بس 10 بـ 4 frames</b>. يعني زيادة الـ frames ممكن تزوّد الـ page faults.' };
    else cap = { en: `${algo} is a <b>stack algorithm</b> and never suffers from Belady's anomaly: ${fa} faults with 3 frames, ${fb} with 4.`, ar: `الـ ${algo} من الـ <b>stack algorithms</b>، وعمره ما بيحصل فيه Belady's anomaly: ${fa} faults بـ 3 frames، و ${fb} بـ 4 frames.` };
    return html`<figure className="fig fo6"><div className="fig-stage">
      <div className="fo6-row">${['FIFO', 'LRU', 'OPT'].map(x => html`<button key=${x} className="fig-btn" aria-pressed=${String(algo === x)} onClick=${() => { setAlgo(x); r.restart(); }}>${x}</button>`)}</div>
      <div className="fo6-str">${BEL.map((p, k) => html`<span key=${k} className=${k < r.t - 1 ? 'past' : k === r.t - 1 ? 'cur' : ''}>${p}</span>`)}</div>
      <div className="fo6-bl">${Side(a, 3, fa)}${Side(b, 4, fb)}</div></div>
      <${Cap} ...${cap} showAr=${ar} /><${Nav} r=${r} n=${BEL.length} /></figure>`;
  }

  /* ── 6.0 / 7.0: why OPT and LRU pick their victims (every replacement on the lecture string) ── */
  function WhyVictim({ ar, algo }) {
    const sim = simulate(LECT, 3, algo), reps = sim.filter(s => s.kind === 'replace');
    const steps = [{ intro: 1 }, ...reps];
    const [i, ctl] = useSteps(steps.length, 3600);
    const s = steps[i];
    let cap;
    if (s.intro) cap = algo === 'OPT'
      ? { en: `<b>Optimal</b> looks into the <b>future</b>: at each replacement, for every page in memory find its next use; the page used farthest away (or never) is the victim. ${reps.length} replacements + 3 empty-frame fills = <b>9 faults</b>.`, ar: `الـ <b>Optimal</b> بيبص على <b>المستقبل</b>: عند كل replacement بنشوف كل page في الـ memory هتتستخدم إمتى تاني، والـ page اللي استخدامها أبعد حاجة (أو مش هتتستخدم خالص) هي الـ victim. فيه ${reps.length} replacements و 3 مرات ملء frames فاضية، يعني <b>9 faults</b>.` }
      : { en: `<b>LRU</b> looks into the <b>past</b>: at each replacement, for every page in memory find its last use; the page used longest ago is the victim. ${reps.length} replacements + 3 empty-frame fills = <b>12 faults</b>.`, ar: `الـ <b>LRU</b> بيبص على <b>الماضي</b>: عند كل replacement بنشوف كل page في الـ memory آخر مرة اتستخدمت إمتى، والـ page اللي آخر استخدام ليها أقدم حاجة هي الـ victim. فيه ${reps.length} replacements و 3 مرات ملء frames فاضية، يعني <b>12 fault</b>.` };
    else {
      const prev = sim[s.t - 1].frames, n = s.t + 1;
      const pos = prev.map(q => algo === 'OPT' ? (() => { const k = LECT.indexOf(q, s.t + 1); return k < 0 ? null : k + 1; })() : LECT.lastIndexOf(q, s.t - 1) + 1);
      const listEn = prev.map((q, k) => `${q} ${algo === 'OPT' ? (pos[k] ? 'next at #' + pos[k] : 'never again') : 'last at #' + pos[k]}`).join(', ');
      const listAr = prev.map((q, k) => `الـ ${q} ${algo === 'OPT' ? (pos[k] ? 'جاية عند رقم ' + pos[k] : 'مش هتتستخدم تاني') : 'آخر مرة عند رقم ' + pos[k]}`).join('، و');
      cap = { en: `Reference #${n} (page <b>${s.p}</b>): pages in memory ${prev.join(', ')}. ${listEn}. Replace <b>${s.victim}</b>.`, ar: `الـ reference رقم ${n} (الـ page <b>${s.p}</b>): الـ pages اللي في الـ memory هي ${prev.join(' و ')}. ${listAr}. فبنشيل الـ <b>${s.victim}</b>.` };
    }
    const cur = s.intro ? null : s.t, prev = s.intro ? null : sim[s.t - 1].frames;
    const mark = k => { if (s.intro) return ''; if (k === cur) return 'cur'; if (algo === 'OPT' ? k > cur : k < cur) { const q = LECT[k]; if (prev.includes(q)) { const first = algo === 'OPT' ? LECT.indexOf(q, cur + 1) === k : LECT.lastIndexOf(q, cur - 1) === k; if (first) return 'mark'; } } return algo === 'OPT' ? (k < cur ? 'past' : '') : (k > cur ? 'past' : ''); };
    return html`<figure className="fig fo6"><div className="fig-stage">
      <p className="fo6-h">${algo === 'OPT' ? 'Next use of each page in memory (shaded)' : 'Last use of each page in memory (shaded)'}</p>
      <div className="fo6-str">${LECT.map((p, k) => html`<span key=${k} className=${mark(k)}>${p}</span>`)}</div>
      ${!s.intro ? html`<div className="fo6-fr">${prev.map((q, k) => html`<div key=${k} className=${q === s.victim ? 'vic' : ''}><small>frame ${k + 1}</small><b>${q}</b><small>${q === s.victim ? 'victim → ' + s.p : 'stays'}</small></div>`)}</div>` : null}</div>
      <${Cap} ...${cap} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  const WhyOpt = ({ ar }) => html`<${WhyVictim} ar=${ar} algo="OPT" />`;
  const WhyLru = ({ ar }) => html`<${WhyVictim} ar=${ar} algo="LRU" />`;

  /* ── 8.0-8.1: LRU with counters and with a stack ── */
  function LruImpl({ ar }) {
    const sim = simulate(LECT, 3, 'LRU'), r = useRun(LECT.length, 1200);
    const s = r.t ? sim[r.t - 1] : null;
    const last = {}; LECT.slice(0, r.t).forEach((p, k) => { last[p] = k + 1; });
    const frames = s ? s.frames : [null, null, null];
    const inMem = frames.filter(x => x != null), minP = inMem.length === 3 ? inMem.reduce((a, b) => last[a] < last[b] ? a : b) : null;
    const stack = inMem.slice().sort((a, b) => last[b] - last[a]);
    const cap = !s ? { en: 'Two ways to implement LRU, on the lecture string with 3 frames. <b>Counter</b>: each page entry gets a copy of the clock when referenced. <b>Stack</b>: a referenced page moves to the top.', ar: 'طريقتين لتنفيذ الـ LRU، على الـ string بتاع المحاضرة بـ 3 frames. الـ <b>counter</b>: كل page entry بياخد نسخة من الـ clock لما يتعملها reference. والـ <b>stack</b>: الـ page اللي بيتعملها reference بتطلع فوق.' }
      : { en: `Clock = ${r.t}: page <b>${s.p}</b> is referenced, so its counter becomes ${r.t} and it moves to the top of the stack.${s.kind === 'replace' ? ` To replace, the counter way <b>searches</b> for the smallest counter; the stack way just takes the <b>bottom</b>: both give page <b>${s.victim}</b>.` : ''}`, ar: `الـ clock بقى ${r.t}: الـ page <b>${s.p}</b> اتعملها reference، فالـ counter بتاعها بقى ${r.t} وطلعت فوق الـ stack.${s.kind === 'replace' ? ` وعشان نعمل replace، طريقة الـ counter لازم <b>تدوّر</b> على أصغر counter، أما الـ stack فبتاخد اللي <b>تحت خالص</b>، والاتنين بيدّوا الـ page <b>${s.victim}</b>.` : ''}` };
    const prevMin = s && s.kind === 'replace' ? s.victim : minP;
    return html`<figure className="fig fo6"><div className="fig-stage">
      <div className="fo6-str">${LECT.map((p, k) => html`<span key=${k} className=${k < r.t - 1 ? 'past' : k === r.t - 1 ? 'cur' : ''}>${p}</span>`)}</div>
      <div className="fo6-two">
        <div><p className="fo6-h">Counter (clock copy)</p><table className="fo6-tbl"><thead><tr><th>page</th><th>counter</th></tr></thead><tbody>
          ${inMem.map(p => html`<tr key=${p}><td>${p}</td><td className=${p === minP && inMem.length === 3 ? 'min' : ''}>${last[p]}</td></tr>`)}
          ${s && s.kind === 'replace' ? html`<tr><td>${s.victim}</td><td className="min">out</td></tr>` : null}</tbody></table>
          <p className="fo6-muted">replace: smallest counter (search)</p></div>
        <div><p className="fo6-h">Stack (top = most recent)</p><div className="fo6-stack">
          ${stack.map((p, k) => html`<span key=${p} className=${k === 0 ? 'top' : k === stack.length - 1 && stack.length === 3 ? 'bot' : ''}>${p}</span>`)}</div>
          <p className="fo6-muted">replace: bottom, no search</p></div>
      </div>
      ${s && s.kind === 'replace' ? html`<p className="fo6-cnt">victim: <b>${prevMin}</b></p>` : null}</div>
      <${Cap} ...${cap} showAr=${ar} /><${Nav} r=${r} n=${LECT.length} /></figure>`;
  }

  /* ── 8.2-8.3: reference bit and the second-chance (clock) algorithm ── */
  function clockRun(refs, nf) {
    const fr = Array(nf).fill(null), bit = Array(nf).fill(0); let hand = 0; const out = [];
    for (const p of refs) {
      const k = fr.indexOf(p), ev = [];
      if (k >= 0) { bit[k] = 1; out.push({ p, fr: fr.slice(), bit: bit.slice(), hand, hit: k, ev }); continue; }
      const e = fr.indexOf(null);
      if (e >= 0) { fr[e] = p; bit[e] = 1; hand = (e + 1) % nf; out.push({ p, fr: fr.slice(), bit: bit.slice(), hand, put: e, ev, fault: 1 }); continue; }
      while (bit[hand] === 1) { ev.push(fr[hand]); bit[hand] = 0; hand = (hand + 1) % nf; }
      const v = fr[hand]; fr[hand] = p; bit[hand] = 1; const put = hand; hand = (hand + 1) % nf;
      out.push({ p, fr: fr.slice(), bit: bit.slice(), hand, put, victim: v, ev, fault: 1 });
    }
    return out;
  }
  function SecondChance({ ar }) {
    const NF = 3, refs = LECT, sim = clockRun(refs, NF), r = useRun(refs.length, 1500);
    const s = r.t ? sim[r.t - 1] : null, faults = sim.slice(0, r.t).filter(x => x.fault).length;
    const pos = k => { const a = -Math.PI / 2 + k * 2 * Math.PI / NF; return { left: 120 + 80 * Math.cos(a) + 'px', top: 112 + 58 * Math.sin(a) + 'px' }; };
    let cap;
    if (!s) cap = { en: 'Each page has a <b>reference bit</b>: 0 at first, set to 1 when referenced. <b>Second chance</b> = FIFO + this bit: the hand moves around the frames; a page with bit 1 gets a second chance (bit cleared to 0, page stays), a page with bit 0 is replaced. Lecture string, 3 frames.', ar: 'كل page ليها <b>reference bit</b>: بيبدأ 0، ولما يتعملها reference بيبقى 1. والـ <b>second chance</b> هو FIFO مع الـ bit ده: العقرب بيلف على الـ frames، والـ page اللي الـ bit بتاعها 1 بتاخد فرصة تانية (الـ bit يبقى 0 والـ page تفضل)، واللي الـ bit بتاعها 0 بتتشال. الـ string بتاع المحاضرة، بـ 3 frames.' };
    else if (s.hit != null) cap = { en: `Page <b>${s.p}</b> is in memory: its reference bit is set to 1. No fault.`, ar: `الـ page <b>${s.p}</b> موجودة في الـ memory، فالـ reference bit بتاعها بيبقى 1. ومفيش fault.` };
    else if (s.victim == null) cap = { en: `Page <b>${s.p}</b> fills an empty frame (fault). Its bit is 1.`, ar: `الـ page <b>${s.p}</b> بتملا frame فاضي (fault)، والـ bit بتاعها 1.` };
    else cap = { en: `Page <b>${s.p}</b>: fault, no free frame. ${s.ev.length ? `The hand passes ${s.ev.join(', ')} with bit 1: each gets a second chance (bit set to 0, stays in memory). ` : ''}It stops at page <b>${s.victim}</b> with bit 0 and replaces it.`, ar: `الـ page <b>${s.p}</b>: فيه fault ومفيش free frame. ${s.ev.length ? `العقرب بيعدي على ${s.ev.join(' و ')} والـ bit بتاعهم 1، فكل واحدة بتاخد فرصة تانية (الـ bit يبقى 0 وتفضل في الـ memory). ` : ''}وبيقف عند الـ page <b>${s.victim}</b> اللي الـ bit بتاعها 0 ويشيلها.` };
    const fr = s ? s.fr : Array(NF).fill(null), bit = s ? s.bit : Array(NF).fill(0), hand = s ? s.hand : 0;
    return html`<figure className="fig fo6"><div className="fig-stage">
      <div className="fo6-str">${refs.map((p, k) => html`<span key=${k} className=${(k < r.t - 1 ? 'past' : k === r.t - 1 ? 'cur' : '') + (k < r.t && sim[k].fault ? ' f' : '')}>${p}</span>`)}</div>
      <div className="fo6-ring">${fr.map((p, k) => html`<div key=${k} className=${'s' + (k === hand ? ' hand' : '') + (s && s.put === k ? ' new' : '')} style=${pos(k)}>${k === hand ? html`<span className="hd">hand</span>` : null}<small>frame ${k + 1}</small><b>${p == null ? '' : p}</b><small>bit ${bit[k]}</small></div>`)}
</div>
      <p className="fo6-cnt">Page faults: <b>${faults}</b></p></div>
      <${Cap} ...${cap} showAr=${ar} /><${Nav} r=${r} n=${refs.length} /></figure>`;
  }

  /* ── 8.4: counting algorithms, LFU and MFU ── */
  function Counting({ ar }) {
    const r = useRun(LECT.length, 1300);
    const cnt = {}; LECT.slice(0, r.t).forEach(p => { cnt[p] = (cnt[p] || 0) + 1; });
    const pages = Object.keys(cnt).map(Number).sort((a, b) => a - b), max = Math.max(1, ...Object.values(cnt));
    const lo = pages.length ? Math.min(...pages.map(p => cnt[p])) : 0, hi = pages.length ? Math.max(...pages.map(p => cnt[p])) : 0;
    const lfu = pages.filter(p => cnt[p] === lo), mfu = pages.filter(p => cnt[p] === hi);
    const cap = !r.t ? { en: '<b>Counting algorithms</b> keep a count of the references to each page. Step through the lecture string and watch the counts.', ar: 'الـ <b>counting algorithms</b> بتعدّ الـ references لكل page. امشي على الـ string بتاع المحاضرة وشوف الـ counts.' }
      : { en: `After ${r.t} references, among the pages counted so far: <b>LFU</b> would replace the page with the smallest count (${lfu.join(' or ')}, count ${lo}); <b>MFU</b> would replace the page with the largest count (${mfu.join(' or ')}, count ${hi}), arguing that the page with the smallest count was probably just brought in and has yet to be used.`, ar: `بعد ${r.t} references، ومن الـ pages اللي اتعدّت لحد دلوقتي: الـ <b>LFU</b> هيشيل الـ page اللي الـ count بتاعها أصغر حاجة (${lfu.join(' أو ')}، والـ count بتاعها ${lo})، والـ <b>MFU</b> هيشيل اللي الـ count بتاعها أكبر حاجة (${mfu.join(' أو ')}، والـ count بتاعها ${hi})، وحجته إن الـ page اللي الـ count بتاعها صغير غالبًا لسه داخلة ولسه هتتستخدم.` };
    return html`<figure className="fig fo6"><div className="fig-stage">
      <div className="fo6-str">${LECT.map((p, k) => html`<span key=${k} className=${k < r.t - 1 ? 'past' : k === r.t - 1 ? 'cur' : ''}>${p}</span>`)}</div>
      <div className="fo6-col" style=${{ maxWidth: '400px', margin: '0 auto' }}>${pages.map(p => html`<div key=${p} style=${{ display: 'grid', gridTemplateColumns: '58px minmax(0,1fr) auto', gap: '6px', alignItems: 'center', fontSize: '.84rem', color: 'var(--ink)' }}>
        <span>page ${p}</span><span style=${{ height: '12px', borderRadius: '99px', background: 'var(--paper)', border: '1px solid var(--line)', overflow: 'hidden' }}><i style=${{ display: 'block', height: '100%', width: (cnt[p] / max * 100) + '%', background: lfu.includes(p) ? 'var(--pen)' : mfu.includes(p) ? 'var(--k-os)' : 'var(--graphite)', transition: 'width .4s' }}></i></span>
        <span>${cnt[p]}${lfu.includes(p) ? html` <span className="fo6-tag i">LFU</span>` : null}${mfu.includes(p) ? html` <span className="fo6-tag k">MFU</span>` : null}</span></div>`)}</div></div>
      <${Cap} ...${cap} showAr=${ar} /><${Nav} r=${r} n=${LECT.length} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'os-vm-space': VmSpace, 'os-demand-paging': DemandPaging, 'os-page-fault': PageFault, 'os-fault-stages': FaultStages, 'os-replace-basic': BasicReplace, 'os-replace-sim': ReplaceSim, 'os-belady': Belady, 'os-opt-why': WhyOpt, 'os-lru-why': WhyLru, 'os-lru-impl': LruImpl, 'os-second-chance': SecondChance, 'os-lfu-mfu': Counting });
})();
/* ── part 7 ── */
// OS visuals, part 7: L6 Deadlocks (four conditions, resource-allocation graphs, ordering, safe states, Banker's, detection). Every label and caption comes from the site's notes for that lecture.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.fo7 .fig-dots i.on{ background:var(--k-os); } .fo7 .fig-btn:hover{ border-color:var(--k-os); } .fo7 .fig-btn.solid{ background:var(--s-os); color:#fff; border-color:transparent; }
.fo7 .fig-btn[aria-pressed="true"]{ background:var(--s-os); color:#fff; border-color:transparent; }
.fo7 .fig-btn:disabled{ opacity:.45; cursor:default; }
.fo7-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.fo7-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.fo7-svg{ display:block; width:100%; max-width:380px; margin:0 auto; }
.fo7-svg text{ fill:var(--ink); font-weight:600; }
.fo7-leg{ display:flex; flex-wrap:wrap; gap:4px 12px; justify-content:center; font-size:.8rem; color:var(--graphite); margin:6px 0 0; }
.fo7-leg i{ display:inline-block; width:18px; height:3px; border-radius:2px; vertical-align:3px; margin-right:4px; }
.fo7-note{ text-align:center; font-size:.86rem; color:var(--ink); margin:8px auto 0; max-width:420px; min-height:1.4em; }
.fo7-note b{ color:var(--k-os); }
.fo7-bad{ color:var(--pen); font-weight:700; }
.fo7-good{ color:var(--ok); font-weight:700; }
.fo7-tbl{ border-collapse:collapse; margin:0 auto; font-size:.84rem; }
.fo7-tbl th, .fo7-tbl td{ border:1px solid var(--line); padding:3px 6px; text-align:center; background:var(--paper); color:var(--ink); white-space:nowrap; transition:background .4s; }
.fo7-tbl th{ background:var(--paper-2); color:var(--graphite); font-weight:600; font-size:.8rem; }
.fo7-tbl td.v{ font-family:var(--mono); font-size:.82rem; }
.fo7-tbl tr.cur td{ background:color-mix(in srgb, var(--k-os) 16%, var(--paper)); }
.fo7-tbl tr.no td{ background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
.fo7-tbl tr.yes td{ background:color-mix(in srgb, var(--ok) 18%, var(--paper)); }
.fo7-tbl tr.done td{ color:var(--graphite); }
.fo7-work{ display:flex; flex-wrap:wrap; justify-content:center; align-items:baseline; gap:4px 10px; margin:0 0 8px; font-size:.9rem; color:var(--ink); }
.fo7-work b{ font-family:var(--mono); font-size:1rem; color:var(--k-os); }
.fo7-seq{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:8px 0 0; min-height:28px; font-size:.84rem; align-items:center; color:var(--graphite); }
.fo7-seq span{ border:1px solid var(--k-os); background:color-mix(in srgb, var(--k-os) 14%, var(--paper)); color:var(--ink); border-radius:99px; padding:2px 9px; font-weight:600; animation:fo7in .4s ease both; }
.fo7-seq span.bad{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 12%, var(--paper)); }
@keyframes fo7in{ from{ opacity:0; transform:scale(.8); } to{ opacity:1; transform:none; } }
.fo7-ord{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:360px; margin:0 auto; }
.fo7-ord button{ font:inherit; font-size:.84rem; border:1.4px solid var(--line); border-radius:10px; background:var(--paper); color:var(--ink); padding:6px 4px; cursor:pointer; line-height:1.3; }
.fo7-ord button b{ display:block; font-family:var(--mono); color:var(--k-os); font-size:.9rem; }
.fo7-ord button.held{ border-color:var(--k-os); background:color-mix(in srgb, var(--k-os) 16%, var(--paper)); }
.fo7-ord button.no{ border-color:var(--pen); animation:fo7shake .35s; }
@keyframes fo7shake{ 25%{ transform:translateX(-4px); } 75%{ transform:translateX(4px); } }
.fo7-log{ max-width:420px; margin:8px auto 0; font-size:.84rem; color:var(--ink); line-height:1.5; min-height:3em; }
.fo7-log div{ animation:fo7in .3s ease both; }
.fo7-sets{ position:relative; max-width:330px; margin:0 auto; height:210px; }
.fo7-sets div{ position:absolute; border-radius:50%; display:flex; align-items:flex-start; justify-content:center; padding-top:10px; box-sizing:border-box; font-size:.86rem; font-weight:700; color:var(--ink); transition:all .5s ease; }
.fo7-sets .s{ inset:0; background:color-mix(in srgb, var(--ok) 14%, var(--paper)); border:1.5px solid var(--ok); justify-content:flex-start; padding:16px 0 0 26px; }
.fo7-sets .u{ left:40%; right:4%; top:14%; bottom:8%; background:color-mix(in srgb, var(--pen) 10%, var(--paper)); border:1.5px solid var(--pen); }
.fo7-sets .d{ left:56%; right:16%; top:46%; bottom:18%; background:color-mix(in srgb, var(--pen) 26%, var(--paper)); border:1.5px solid var(--pen); align-items:center; padding:0; }
.fo7-sets .off{ opacity:.18; }
.fo7-sets .hi{ box-shadow:0 0 0 3px color-mix(in srgb, var(--k-os) 45%, transparent); }
.fo7-req{ max-width:420px; margin:0 auto; }
.fo7-req .row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; align-items:center; margin:0 0 8px; font-size:.86rem; color:var(--ink); }
.fo7-req .row .fig-btn{ padding:4px 9px; min-width:34px; }
.fo7-step{ display:flex; gap:6px; align-items:center; }
.fo7-step b{ font-family:var(--mono); min-width:1.2em; text-align:center; }
.fo7-out{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; font-size:.84rem; line-height:1.55; color:var(--ink); margin:8px 0 0; overflow-wrap:anywhere; }
.fo7-out .m{ font-family:var(--mono); }
@media (prefers-reduced-motion: reduce){ .fo7-seq span, .fo7-log div, .fo7-ord button.no{ animation:none; } .fo7-sets div{ transition:none; } }`;
  if (!document.getElementById('fo7-css')) { const s = document.createElement('style'); s.id = 'fo7-css'; s.textContent = CSS; document.head.appendChild(s); }

  const L = t => `<span class="ltr">${t}</span>`;
  const Modes = ({ list, mode, set }) => html`<div className="fo7-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const C_ASSIGN = 'var(--k-os)', C_REQ = 'var(--graphite)', C_CYC = 'var(--pen)';

  /* ── a small resource-allocation graph renderer: processes are circles, resource types boxes with one dot per instance ── */
  const PR = 19, BW = 50, BH = 32;
  function dotPos(n, k) { const g = n === 1 ? [0] : [-9, 9]; return g[k] || 0; }
  function edgeLine(N, e) {
    const [a, b, kind, dot] = e, A = N[a], B = N[b];
    let x1 = A.x, y1 = A.y; if (A.r) { x1 = A.x + dotPos(A.r, dot || 0); y1 = A.y; }
    const dx = B.x - x1, dy = B.y - y1, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
    if (!A.r) { x1 += ux * PR; y1 += uy * PR; } else { x1 += ux * 5; y1 += uy * 5; }
    let x2, y2;
    if (B.r) { const t = Math.min((BW / 2) / Math.abs(dx || 1e-9), (BH / 2) / Math.abs(dy || 1e-9)) * d; x2 = B.x - ux * (t + 3); y2 = B.y - uy * (t + 3); }
    else { x2 = B.x - ux * (PR + 3); y2 = B.y - uy * (PR + 3); }
    return { x1, y1, x2, y2 };
  }
  function Rag({ N, E, cyc = [], gone = [], vb, id, label }) {
    const onCyc = e => cyc.some(c => c[0] === e[0] && c[1] === e[1]);
    return html`<svg className="fo7-svg" viewBox=${vb} role="img" aria-label=${label}>
      <defs>${[['a', C_ASSIGN], ['r', C_REQ], ['c', C_CYC]].map(([k, c]) => html`<marker key=${k} id=${`fo7-${id}-${k}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill=${c} /></marker>`)}</defs>
      ${E.map((e, k) => { const g = edgeLine(N, e), c = onCyc(e), col = c ? C_CYC : e[2] === 'a' ? C_ASSIGN : C_REQ;
        return html`<line key=${e.join('-')} x1=${g.x1} y1=${g.y1} x2=${g.x2} y2=${g.y2} stroke=${col} strokeWidth=${c ? 3 : 2} markerEnd=${`url(#fo7-${id}-${c ? 'c' : e[2]})`} className=${c && !calm() ? 'flow' : ''} />`; })}
      ${Object.entries(N).map(([k, v]) => { const off = gone.includes(k);
        return v.r ? html`<g key=${k} style=${{ opacity: off ? .3 : 1, transition: 'opacity .5s' }}><rect x=${v.x - BW / 2} y=${v.y - BH / 2} width=${BW} height=${BH} rx="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            ${Array.from({ length: v.r }, (_, d) => html`<circle key=${d} cx=${v.x + dotPos(v.r, d)} cy=${v.y} r="4" fill="var(--ink)" />`)}
            <text x=${v.lx ?? v.x} y=${v.ly ?? v.y - BH / 2 - 6} textAnchor="middle" fontSize="15">${k}</text></g>`
          : html`<g key=${k} style=${{ opacity: off ? .3 : 1, transition: 'opacity .5s' }}><circle cx=${v.x} cy=${v.y} r=${PR} fill="var(--paper)" stroke="var(--k-os)" strokeWidth="2" /><text x=${v.x} y=${v.y + 5} textAnchor="middle" fontSize="15">${k}</text></g>`; })}
    </svg>`;
  }
  const Legend = () => html`<div className="fo7-leg"><span><i style=${{ background: C_REQ }}></i>request P → R</span><span><i style=${{ background: C_ASSIGN }}></i>assignment R → P</span><span><i style=${{ background: C_CYC }}></i>cycle</span></div>`;

  /* ── §0: the four necessary conditions on a three-process circle ── */
  function Conditions({ ar }) {
    const N = { P0: { x: 150, y: 34 }, P1: { x: 250, y: 200 }, P2: { x: 50, y: 200 }, R1: { x: 72, y: 100, r: 1, lx: 72, ly: 77 }, R2: { x: 228, y: 100, r: 1, lx: 228, ly: 77 }, R3: { x: 150, y: 214, r: 1, ly: 248 } };
    const hold = [['R1', 'P0', 'a'], ['R2', 'P1', 'a'], ['R3', 'P2', 'a']], want = [['P0', 'R2', 'r'], ['P1', 'R3', 'r'], ['P2', 'R1', 'r']];
    // P0 holds R1 and wants R2 (held by P1); P1 wants R3 (held by P2); P2 wants R1 (held by P0)
    const steps = [
      { en: 'Each process uses a resource as <b>request → use → release</b>. Deadlock can arise if <b>four conditions hold simultaneously</b>. Here P0, P1 and P2 each hold one resource.', ar: 'كل process بتستخدم الـ resource على 3 خطوات:' + L('request → use → release') + 'والـ deadlock ممكن يحصل لو <b>4 conditions اتحققوا في نفس الوقت</b>. هنا كل process من الـ P0 والـ P1 والـ P2 ماسكة resource واحد.', E: hold },
      { en: '1. <b>Mutual exclusion</b>: only one process at a time can use a resource. Each box has a single instance, held by one process.', ar: '(1) الـ <b>Mutual exclusion</b>: process واحدة بس في المرة تقدر تستخدم الـ resource. كل box فيه instance واحد، وماسكاه process واحدة.', E: hold },
      { en: '2. <b>Hold and wait</b>: a process holding at least one resource is waiting to acquire additional resources held by other processes.', ar: '(2) الـ <b>Hold and wait</b>: process ماسكة resource واحد على الأقل، ومستنية resources زيادة ماسكاها processes تانية.', E: hold.concat([want[0]]) },
      { en: '3. <b>No preemption</b>: a resource can be released only voluntarily by the process holding it, after it has completed its task. Nobody can take R2 away from P1.', ar: '(3) الـ <b>No preemption</b>: الـ resource مايتسابش غير بإرادة الـ process اللي ماسكاه، بعد ما تخلّص الـ task بتاعتها. محدش يقدر ياخد الـ R2 من الـ P1 غصب عنها.', E: hold.concat([want[0]]) },
      { en: '4. <b>Circular wait</b>: P0 waits for a resource held by P1, P1 waits for P2, and P2 waits for P0.', ar: '(4) الـ <b>Circular wait</b>: الـ P0 مستنية resource ماسكاه الـ P1، والـ P1 مستنية الـ P2، والـ P2 مستنية الـ P0.', E: hold.concat(want), cyc: hold.concat(want) },
      { en: 'All four hold at the same time, so no process can continue: <b>deadlock</b>. Break any one condition and the deadlock cannot happen.', ar: 'الـ 4 conditions متحققين مع بعض، فمفيش process تقدر تكمّل: ده <b>deadlock</b>. ولو كسرنا أي condition منهم، الـ deadlock مش هيحصل.', E: hold.concat(want), cyc: hold.concat(want), dead: 1 }
    ];
    const [i, ctl] = useSteps(steps.length, 3000), s = steps[i];
    return html`<figure className="fig fo7"><div className="fig-stage">
      <${Rag} N=${N} E=${s.E} cyc=${s.cyc || []} vb="0 0 300 255" id="cond" label="Three processes, each holding one resource and waiting for the next" />
      <${Legend} />
      <p className="fo7-note">${s.dead ? html`<span className="fo7-bad">Deadlock: P0, P1, P2 all wait</span>` : html`Conditions shown: <b>${Math.max(0, i)}</b> of 4`}</p></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §1: the three resource-allocation graphs of the notes ── */
  const G1 = { P1: { x: 45, y: 128 }, P2: { x: 150, y: 128 }, P3: { x: 255, y: 128 }, R1: { x: 97, y: 42, r: 1 }, R3: { x: 203, y: 42, r: 1 }, R2: { x: 97, y: 218, r: 2, ly: 252 } };
  const base1 = [['R1', 'P2', 'a', 0], ['R2', 'P1', 'a', 0], ['R2', 'P2', 'a', 1], ['R3', 'P3', 'a', 0], ['P1', 'R1', 'r'], ['P2', 'R3', 'r']];
  const G2 = { P2: { x: 150, y: 26 }, P1: { x: 42, y: 140 }, P3: { x: 258, y: 140 }, P4: { x: 150, y: 254 }, R1: { x: 150, y: 92, r: 2, lx: 196, ly: 97 }, R2: { x: 150, y: 188, r: 2, lx: 196, ly: 193 } };
  const base2 = [['P1', 'R1', 'r'], ['R1', 'P3', 'a', 1], ['R1', 'P2', 'a', 0], ['P3', 'R2', 'r'], ['R2', 'P1', 'a', 0], ['R2', 'P4', 'a', 1]];
  const cyc2 = [['P1', 'R1'], ['R1', 'P3'], ['P3', 'R2'], ['R2', 'P1']];
  const RAG = {
    none: [
      { en: '<b>No deadlock</b> (slide example). Assignments: R1 → P2, R2 → P1 and P2, R3 → P3. Requests: P1 → R1, P2 → R3. There is <b>no cycle</b>.', ar: '<b>مفيش deadlock</b> (مثال الـ slide).' + L('Assignments: R1 → P2, R2 → P1 and P2, R3 → P3') + L('Requests: P1 → R1, P2 → R3') + 'ومفيش <b>cycle</b>.', E: base1 },
      { en: '<b>P3 can finish</b>: it holds R3 and requests nothing. It releases R3, which is given to P2 (P2 → R3 becomes R3 → P2).', ar: 'الـ <b>P3 تقدر تخلّص</b>: ماسكة الـ R3 ومش طالبة حاجة. بتسيب الـ R3، فبيروح للـ P2 (الـ request بقى assignment).', E: [['R1', 'P2', 'a', 0], ['R2', 'P1', 'a', 0], ['R2', 'P2', 'a', 1], ['R3', 'P2', 'a', 0], ['P1', 'R1', 'r']], gone: ['P3'] },
      { en: '<b>Then P2</b> finishes and releases R1, R2 and R3. R1 goes to P1.', ar: '<b>وبعدين الـ P2</b> بتخلّص وتسيب الـ R1 والـ R2 والـ R3، فالـ R1 بيروح للـ P1.', E: [['R2', 'P1', 'a', 0], ['R1', 'P1', 'a', 0]], gone: ['P3', 'P2'] },
      { en: '<b>Then P1</b> finishes. Every process completed: no cycle means no deadlock.', ar: '<b>وبعدين الـ P1</b> بتخلّص. كل الـ processes خلّصت: مفيش cycle يعني مفيش deadlock.', E: [], gone: ['P3', 'P2', 'P1'], ok: 1 }
    ],
    dead: [
      { en: '<b>Graph with a deadlock</b>: the same graph plus a new request <b>P3 → R2</b>. Both instances of R2 are held, by P1 and P2.', ar: '<b>Graph فيه deadlock</b>: نفس الـ graph وزيادة عليه request جديد من الـ P3 للـ R2. والـ 2 instances بتوع الـ R2 ماسكينهم الـ P1 والـ P2.', E: base1.concat([['P3', 'R2', 'r']]) },
      { en: 'First cycle: P1 → R1 → P2 → R3 → P3 → R2 → P1.', ar: 'أول cycle:' + L('P1 → R1 → P2 → R3 → P3 → R2 → P1'), E: base1.concat([['P3', 'R2', 'r']]), cyc: [['P1', 'R1'], ['R1', 'P2'], ['P2', 'R3'], ['R3', 'P3'], ['P3', 'R2'], ['R2', 'P1']] },
      { en: 'Second cycle: P2 → R3 → P3 → R2 → P2.', ar: 'تاني cycle:' + L('P2 → R3 → P3 → R2 → P2'), E: base1.concat([['P3', 'R2', 'r']]), cyc: [['P2', 'R3'], ['R3', 'P3'], ['P3', 'R2'], ['R2', 'P2']] },
      { en: 'Nobody can finish: P3 waits for R2, P2 waits for P3 (R3), P1 waits for P2 (R1). <b>P1, P2 and P3 are all deadlocked.</b>', ar: 'محدش يقدر يخلّص: الـ P3 مستنية الـ R2، والـ P2 مستنية الـ P3 (عشان الـ R3)، والـ P1 مستنية الـ P2 (عشان الـ R1). <b>الـ P1 والـ P2 والـ P3 كلهم في deadlock.</b>', E: base1.concat([['P3', 'R2', 'r']]), cyc: [['P1', 'R1'], ['R1', 'P2'], ['P2', 'R3'], ['R3', 'P3'], ['P3', 'R2'], ['R2', 'P1'], ['R2', 'P2']], bad: 1 }
    ],
    cycle: [
      { en: '<b>Graph with a cycle but no deadlock</b>: P1 → R1 → P3 → R2 → P1. R1 and R2 have two instances each.', ar: '<b>Graph فيه cycle بس مفيش deadlock</b>:' + L('P1 → R1 → P3 → R2 → P1') + 'والـ R1 والـ R2 كل واحد فيهم ليه 2 instances.', E: base2, cyc: cyc2 },
      { en: 'R1\'s other instance is held by <b>P2</b>, and R2\'s by <b>P4</b>. Neither of them waits for anything.', ar: 'الـ instance التاني بتاع الـ R1 ماسكاه الـ <b>P2</b>، والتاني بتاع الـ R2 ماسكاه الـ <b>P4</b>. والاتنين دول مش مستنيين أي حاجة.', E: base2, cyc: cyc2 },
      { en: '<b>P4 releases</b> its instance of R2, so P3\'s request is granted (P3 → R2 becomes R2 → P3). The cycle is broken.', ar: 'الـ <b>P4 بتسيب</b> الـ instance بتاعها من الـ R2، فالـ request بتاع الـ P3 بيتنفذ (بقى assignment من الـ R2 للـ P3). وكده الـ cycle اتكسر.', E: [['P1', 'R1', 'r'], ['R1', 'P3', 'a', 1], ['R1', 'P2', 'a', 0], ['R2', 'P1', 'a', 0], ['R2', 'P3', 'a', 1]], gone: ['P4'], ok: 1 }
    ]
  };
  function RagFig({ ar }) {
    const [mode, set0] = useState('none'); const steps = RAG[mode];
    const [i, ctl] = useSteps(steps.length, 3200), s = steps[Math.min(i, steps.length - 1)];
    const set = m => { set0(m); ctl.go(0); if (!calm()) setTimeout(ctl.replay, 0); };
    const G = mode === 'cycle' ? G2 : G1;
    return html`<figure className="fig fo7"><div className="fig-stage">
      <${Modes} list=${[['none', 'No deadlock'], ['dead', 'Deadlock'], ['cycle', 'Cycle, no deadlock']]} mode=${mode} set=${set} />
      <${Rag} N=${G} E=${s.E} cyc=${s.cyc || []} gone=${s.gone || []} vb=${mode === 'cycle' ? '0 0 300 280' : '0 0 300 262'} id=${'rag' + mode} label="Resource-allocation graph" />
      <${Legend} />
      <p className="fo7-note">${s.bad ? html`<span className="fo7-bad">Cycle, one instance free for nobody: deadlock</span>` : s.ok ? html`<span className="fo7-good">All processes can finish</span>` : html`No cycle → no deadlock. Cycle + several instances → <b>possibly</b> deadlock.`}</p></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${Math.min(i, steps.length - 1)} ctl=${ctl} /></figure>`;
  }

  /* ── §2: preventing circular wait with a total ordering ── */
  const ORD = [['Tape drive', 1], ['Disk drive', 5], ['Printer', 12]];
  function Ordering({ ar }) {
    const [held, setHeld] = useState([]), [log, setLog] = useState([]), [no, setNo] = useState(null);
    const top = held.length ? Math.max(...held.map(h => ORD[h][1])) : 0;
    const ask = k => {
      if (held.includes(k)) return;
      const [n, f] = ORD[k];
      if (f > top) { setHeld(h => h.concat(k)); setLog(l => l.concat({ ok: 1, t: `Request ${n} (F = ${f}): granted, ${f} > ${top || 'nothing held'}.` })); setNo(null); }
      else { setLog(l => l.concat({ ok: 0, t: `Request ${n} (F = ${f}): refused, it is lower than ${top}, which you already hold.` })); setNo(k); }
    };
    const reset = () => { setHeld([]); setLog([]); setNo(null); };
    const cap = { en: '<b>Circular wait</b> is prevented by a <b>total ordering</b> of all resource types: requests must come in <b>increasing order</b>. F(tape drive) = 1, F(disk drive) = 5, F(printer) = 12. To use the tape and the printer, request the tape first, then the printer; never the printer then the tape. Try both orders.', ar: 'الـ <b>Circular wait</b> بنمنعه بإننا نرتّب كل الـ resource types <b>ترتيب كامل</b>، اسمه الـ total ordering، والـ requests لازم تيجي <b>بترتيب تصاعدي</b>:' + L('F(tape drive) = 1, F(disk drive) = 5, F(printer) = 12') + 'يعني عشان تستخدم الـ tape والـ printer، اطلب الـ tape الأول وبعدين الـ printer، وعمرك ما تطلب الـ printer الأول. جرّب الترتيبين.' };
    return html`<figure className="fig fo7"><div className="fig-stage">
      <div className="fo7-ord">${ORD.map(([n, f], k) => html`<button key=${n} className=${held.includes(k) ? 'held' : no === k ? 'no' : ''} onClick=${() => ask(k)} aria-pressed=${String(held.includes(k))}><b>F = ${f}</b>${n}</button>`)}</div>
      <div className="fo7-log" aria-live="polite">${log.length ? log.slice(-3).map((l, k) => html`<div key=${log.length - 3 + k} className=${l.ok ? 'fo7-good' : 'fo7-bad'}>${l.t}</div>`) : html`<div style=${{ color: 'var(--graphite)', textAlign: 'center' }}>Tap a resource to request it.</div>`}</div>
      <div className="fo7-modes" style=${{ marginTop: '8px' }}><button className="fig-btn" onClick=${reset}>Release all</button></div>
      <p className="fo7-note">Every process climbs the same order, so no process can wait for a lower resource held by another: <b>no cycle</b>.</p></div>
      <${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §3: safe, unsafe and deadlock states ── */
  function SafeStates({ ar }) {
    const steps = [
      { en: 'A state is <b>safe</b> if there exists a sequence &lt;P1, P2, …, Pn&gt; of all processes such that each Pi\'s remaining requests can be met by the available resources plus those held by all Pj with j &lt; i.', ar: 'الـ state بتبقى <b>safe</b> لو فيه sequence لكل الـ processes، كل Pi فيها تقدر تاخد اللي باقي لها من الـ resources المتاحة، زائد اللي ماسكينه كل الـ Pj اللي قبلها.', on: 's' },
      { en: '<b>Safe → no deadlocks.</b>', ar: '<b>الـ safe يعني مفيش deadlocks.</b>', on: 's' },
      { en: '<b>Unsafe → possibility of deadlock.</b> An unsafe state is not yet a deadlock.', ar: '<b>الـ unsafe يعني فيه احتمال deadlock.</b> والـ unsafe state لسه مش deadlock.', on: 'u' },
      { en: 'Deadlock states are a <b>subset of the unsafe states</b>.', ar: 'الـ deadlock states هي <b>جزء من الـ unsafe states</b>.', on: 'd' },
      { en: '<b>Avoidance</b> = ensure the system never enters an unsafe state, so it can never reach a deadlock.', ar: 'الـ <b>Avoidance</b> معناه إننا نضمن إن الـ system عمره ما يدخل unsafe state، فمستحيل يوصل لـ deadlock.', on: 'a' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800), s = steps[i];
    const cls = k => (s.on === k ? ' hi' : '') + (s.on === 'a' && k !== 's' ? ' off' : '');
    return html`<figure className="fig fo7"><div className="fig-stage">
      <div className="fo7-sets" role="img" aria-label="Safe states contain no deadlocks; deadlock states lie inside the unsafe states">
        <div className=${'s' + cls('s')}>safe</div>
        <div className=${'u' + cls('u') + (i < 2 ? ' off' : '')}>unsafe</div>
        <div className=${'d' + cls('d') + (i < 3 ? ' off' : '')}>deadlock</div>
      </div></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── Banker's data from the notes (§5) ── */
  const PS = ['P0', 'P1', 'P2', 'P3', 'P4'];
  const ALLOC = [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]], MAX = [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]], AVAIL = [3, 3, 2];
  const v = a => '(' + a.join(',') + ')', sp = a => a.join(' ');
  const add = (a, b) => a.map((x, k) => x + b[k]), subv = (a, b) => a.map((x, k) => x - b[k]), le = (a, b) => a.every((x, k) => x <= b[k]);
  // the notes' scan: go through P0…P4 repeatedly, taking the next process whose Need ≤ Work
  function safety(avail, alloc, need) {
    let work = avail.slice(); const fin = alloc.map(() => false), seq = [], trace = [];
    let k = 0, idle = 0;
    while (idle < alloc.length && seq.length < alloc.length) {
      if (!fin[k]) {
        if (le(need[k], work)) { const w0 = work; work = add(work, alloc[k]); fin[k] = true; seq.push(k); trace.push({ k, ok: 1, w0, w1: work }); idle = 0; }
        else { trace.push({ k, ok: 0, w0: work }); idle++; }
      } else idle++;
      k = (k + 1) % alloc.length;
    }
    return { safe: fin.every(Boolean), seq, trace, work };
  }

  /* ── §5: the safety algorithm on the notes' snapshot, step by step ── */
  function Bankers({ ar }) {
    const need = MAX.map((m, k) => subv(m, ALLOC[k])), run = safety(AVAIL, ALLOC, need);
    const steps = [{ en: 'Snapshot: 5 processes, A = 10, B = 5, C = 7 instances, <b>Available = (3,3,2)</b>. Need = Max − Allocation. Start with Work = Available and every Finish = false.', ar: 'الـ snapshot: فيه 5 processes، والـ instances هي A = 10 و B = 5 و C = 7، والـ <b>Available</b> هو (3,3,2). الـ Need بيساوي Max ناقص Allocation. بنبدأ بالـ Work بيساوي الـ Available، وكل الـ Finish بـ false.', t: null }]
      .concat(run.trace.map(t => t.ok
        ? { en: `${PS[t.k]}: Need ${v(need[t.k])} ≤ Work ${v(t.w0)} ✓. It runs, then returns its Allocation: Work = ${v(t.w0)} + ${v(ALLOC[t.k])} = <b>${v(t.w1)}</b>.`, ar: `الـ ${PS[t.k]}: الـ Need أصغر من أو بيساوي الـ Work، فبتشتغل وترجّع الـ Allocation بتاعها:` + L(`Need ${v(need[t.k])} ≤ Work ${v(t.w0)} ✓ → Work = ${v(t.w0)} + ${v(ALLOC[t.k])} = ${v(t.w1)}`), t }
        : { en: `${PS[t.k]}: Need ${v(need[t.k])} ≤ Work ${v(t.w0)}? <b>No</b>, it must wait for now.`, ar: `الـ ${PS[t.k]}: الـ Need أكبر من الـ Work، فلازم تستنى دلوقتي:` + L(`Need ${v(need[t.k])} ≤ Work ${v(t.w0)}? no`), t }))
      .concat([{ en: `All Finish = true, and Work = (10,5,7) = the totals. The state is <b>SAFE</b> with sequence &lt;${run.seq.map(k => PS[k]).join(', ')}&gt; (other safe orders exist).`, ar: 'كل الـ Finish بقت true، والـ Work وصل (10,5,7) اللي هو الـ totals. يبقى الـ state <b>SAFE</b>، والـ sequence هي:' + L(`&lt;${run.seq.map(k => PS[k]).join(', ')}&gt;`) + 'وفيه ترتيبات safe تانية كمان.', t: null, end: 1 }]);
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    const upto = steps.slice(1, i + 1).map(x => x.t).filter(Boolean), fin = new Set(upto.filter(t => t.ok).map(t => t.k));
    const work = upto.length ? (upto[upto.length - 1].w1 || upto[upto.length - 1].w0) : AVAIL;
    return html`<figure className="fig fo7"><div className="fig-stage">
      <div className="fo7-work">Work <b>${v(s.t && s.t.ok ? s.t.w1 : work)}</b></div>
      <table className="fo7-tbl"><thead><tr><th>Process</th><th>Alloc</th><th>Need</th><th>Finish</th></tr></thead>
        <tbody>${PS.map((p, k) => { const cur = s.t && s.t.k === k;
          return html`<tr key=${p} className=${cur ? (s.t.ok ? 'yes' : 'no') : fin.has(k) ? 'done' : ''}><td>${p}</td><td className="v">${sp(ALLOC[k])}</td><td className="v">${sp(need[k])}</td><td>${fin.has(k) ? '✓' : '·'}</td></tr>`; })}</tbody></table>
      <div className="fo7-seq" aria-label="Safe sequence so far">${fin.size ? html`Sequence:` : ''}${[...fin].map(k => html`<span key=${k}>${PS[k]}</span>`)}${s.end ? html`<span className="fo7-good" style=${{ border: 0, background: 'none' }}>SAFE</span>` : ''}</div></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §5: the resource-request algorithm, hands on (default: P1 requests (1,0,2)) ── */
  function Request({ ar }) {
    const [p, setP] = useState(1), [req, setReq] = useState([1, 0, 2]), [res, setRes] = useState(null);
    const need = MAX.map((m, k) => subv(m, ALLOC[k]));
    const bump = (k, d) => { setReq(r => r.map((x, j) => j === k ? Math.max(0, Math.min(9, x + d)) : x)); setRes(null); };
    const runIt = () => {
      if (!le(req, need[p])) return setRes({ kind: 'err', lines: [`1. Request ${v(req)} ≤ Need ${v(need[p])}? No → <b>ERROR</b>: ${PS[p]} exceeded its maximum claim.`] });
      const l1 = `1. Request ${v(req)} ≤ Need ${v(need[p])} ✓`;
      if (!le(req, AVAIL)) return setRes({ kind: 'wait', lines: [l1, `2. Request ${v(req)} ≤ Available ${v(AVAIL)}? No → ${PS[p]} must <b>WAIT</b>.`] });
      const av = subv(AVAIL, req), al = ALLOC.map((a, k) => k === p ? add(a, req) : a), nd = need.map((n, k) => k === p ? subv(n, req) : n);
      const r = safety(av, al, nd);
      const lines = [l1, `2. Request ${v(req)} ≤ Available ${v(AVAIL)} ✓`, `3. Pretend: Available = ${v(av)}, Allocation ${PS[p]} = ${v(al[p])}, Need ${PS[p]} = ${v(nd[p])}.`,
        r.safe ? `Safety finds &lt;${r.seq.map(k => PS[k]).join(', ')}&gt; → <b>SAFE: the request is granted.</b>` : `Safety gets stuck after &lt;${r.seq.map(k => PS[k]).join(', ') || 'none'}&gt; → <b>UNSAFE: ${PS[p]} waits, the old state is restored.</b>`];
      setRes({ kind: r.safe ? 'ok' : 'unsafe', lines, seq: r.seq });
    };
    const notes = p === 1 && req.join() === '1,0,2';
    const cap = { en: 'Pick a process and a request, then run the <b>resource-request algorithm</b> on the snapshot above (Available = (3,3,2)). The notes\' example, <b>P1 requests (1,0,2)</b>, is loaded: it is granted because the safety algorithm still finds &lt;P1, P3, P4, P0, P2&gt;.', ar: 'اختار process و request، وبعدين شغّل الـ <b>resource-request algorithm</b> على نفس الـ snapshot، والـ Available فيه هو (3,3,2). ومثال الـ notes محطوط جاهز، وهو إن الـ P1 بتطلب (1,0,2): الطلب ده بيتقبل، لأن الـ safety algorithm لسه بتلاقي sequence:' + L('&lt;P1, P3, P4, P0, P2&gt;') };
    return html`<figure className="fig fo7"><div className="fig-stage"><div className="fo7-req">
      <div className="row" role="group" aria-label="Requesting process">${PS.map((x, k) => html`<button key=${x} className="fig-btn" aria-pressed=${String(p === k)} onClick=${() => { setP(k); setRes(null); }}>${x}</button>`)}</div>
      <div className="row">${['A', 'B', 'C'].map((n, k) => html`<span key=${n} className="fo7-step"><button className="fig-btn" aria-label=${'less ' + n} onClick=${() => bump(k, -1)}>−</button><span>${n}</span><b>${req[k]}</b><button className="fig-btn" aria-label=${'more ' + n} onClick=${() => bump(k, 1)}>+</button></span>`)}</div>
      <div className="row"><span>Need ${PS[p]} <b className="m" style=${{ fontFamily: 'var(--mono)' }}>${v(need[p])}</b></span><button className="fig-btn solid" onClick=${runIt}>Run request</button></div>
      ${notes && !res && html`<p className="fo7-note">Example from the notes loaded.</p>`}
      ${res && html`<div className="fo7-out" aria-live="polite">${res.lines.map((l, k) => html`<div key=${k} dangerouslySetInnerHTML=${{ __html: l }}></div>`)}
        ${res.seq && html`<div className="fo7-seq">${res.seq.map(k => html`<span key=${k} className=${res.kind === 'ok' ? '' : 'bad'}>${PS[k]}</span>`)}</div>`}</div>`}
      </div></div>
      <${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §6: the detection algorithm on the notes' example, and after P2 asks for one more C ── */
  const D_ALLOC = [[0, 1, 0], [2, 0, 0], [3, 0, 3], [2, 1, 1], [0, 0, 2]];
  const D_REQ = { ok: [[0, 0, 0], [2, 0, 2], [0, 0, 0], [1, 0, 0], [0, 0, 2]], dead: [[0, 0, 0], [2, 0, 2], [0, 0, 1], [1, 0, 0], [0, 0, 2]] };
  const D_STEPS = {
    ok: [
      { en: 'Detection: A = 7, B = 2, C = 6, <b>Available = (0,0,0)</b>. No process has Allocation = 0, so every Finish starts false. A process can finish if its <b>Request ≤ Work</b>.', ar: 'الـ detection: الـ A = 7 و B = 2 و C = 6، والـ <b>Available</b> هو (0,0,0). مفيش process الـ Allocation بتاعها صفر، فكل الـ Finish بتبدأ false. والـ process تقدر تخلّص لو الـ <b>Request</b> بتاعها أصغر من أو بيساوي الـ Work.', w: [0, 0, 0], f: [] },
      { en: 'P0 requests (0,0,0) ✓ → Work = (0,1,0).', ar: 'الـ P0 طالبة (0,0,0)، فبتخلّص:' + L('Work = (0,0,0) + (0,1,0) = (0,1,0)'), w: [0, 1, 0], f: [0], c: 0 },
      { en: 'P2 requests (0,0,0) ✓ → Work = (3,1,3).', ar: 'الـ P2 طالبة (0,0,0)، فبتخلّص:' + L('Work = (0,1,0) + (3,0,3) = (3,1,3)'), w: [3, 1, 3], f: [0, 2], c: 2 },
      { en: 'P3 requests (1,0,0) ✓ → Work = (5,2,4).', ar: 'الـ P3 طالبة (1,0,0)، فبتخلّص:' + L('Work = (3,1,3) + (2,1,1) = (5,2,4)'), w: [5, 2, 4], f: [0, 2, 3], c: 3 },
      { en: 'P1 requests (2,0,2) ✓ → Work = (7,2,4).', ar: 'الـ P1 طالبة (2,0,2)، فبتخلّص:' + L('Work = (5,2,4) + (2,0,0) = (7,2,4)'), w: [7, 2, 4], f: [0, 2, 3, 1], c: 1 },
      { en: 'P4 requests (0,0,2) ✓ → Work = (7,2,6). Sequence &lt;P0, P2, P3, P1, P4&gt;: every Finish is true, <b>no deadlock</b>.', ar: 'الـ P4 طالبة (0,0,2)، فبتخلّص:' + L('Work = (7,2,4) + (0,0,2) = (7,2,6)') + 'كل الـ Finish بقت true بالـ sequence دي، يعني <b>مفيش deadlock</b>:' + L('&lt;P0, P2, P3, P1, P4&gt;'), w: [7, 2, 6], f: [0, 2, 3, 1, 4], c: 4, ok: 1 }
    ],
    dead: [
      { en: 'Now <b>P2 requests one more C</b>: Request P2 = (0,0,1). Available is still (0,0,0).', ar: 'دلوقتي الـ <b>P2 طلبت C واحدة زيادة</b>، فالـ Request بتاعها بقى (0,0,1)، والـ Available لسه (0,0,0).', w: [0, 0, 0], f: [] },
      { en: 'P0 can finish: Work = (0,1,0).', ar: 'الـ P0 تقدر تخلّص، فالـ Work بقى (0,1,0).', w: [0, 1, 0], f: [0], c: 0 },
      { en: 'No other request can be met: P1 (2,0,2), P2 (0,0,1), P3 (1,0,0) and P4 (0,0,2) all exceed Work (0,1,0).', ar: 'مفيش أي request تاني ينفع يتنفذ، كلهم أكبر من الـ Work اللي هو (0,1,0):' + L('P1 (2,0,2), P2 (0,0,1), P3 (1,0,0), P4 (0,0,2)'), w: [0, 1, 0], f: [0], stuck: 1 },
      { en: 'Finish is false for P1, P2, P3 and P4: <b>a deadlock exists</b>, consisting of P1, P2, P3 and P4.', ar: 'الـ Finish لسه false عند الـ P1 والـ P2 والـ P3 والـ P4، يعني <b>فيه deadlock</b>، والـ processes اللي فيه هي الـ P1 والـ P2 والـ P3 والـ P4.', w: [0, 1, 0], f: [0], dead: 1 }
    ]
  };
  function Detect({ ar }) {
    const [mode, set0] = useState('ok'); const steps = D_STEPS[mode], R = D_REQ[mode];
    const [i, ctl] = useSteps(steps.length, 2800), s = steps[Math.min(i, steps.length - 1)];
    const set = m => { set0(m); ctl.go(0); if (!calm()) setTimeout(ctl.replay, 0); };
    return html`<figure className="fig fo7"><div className="fig-stage">
      <${Modes} list=${[['ok', 'Notes example'], ['dead', 'P2 asks one more C']]} mode=${mode} set=${set} />
      <div className="fo7-work">Work <b>${v(s.w)}</b></div>
      <table className="fo7-tbl"><thead><tr><th>Process</th><th>Alloc</th><th>Request</th><th>Finish</th></tr></thead>
        <tbody>${PS.map((p, k) => { const fin = s.f.includes(k), cur = s.c === k, bad = (s.stuck || s.dead) && !fin;
          return html`<tr key=${p} className=${cur ? 'yes' : bad ? 'no' : fin ? 'done' : ''}><td>${p}</td><td className="v">${sp(D_ALLOC[k])}</td><td className="v">${sp(R[k])}</td><td>${fin ? 'true' : 'false'}</td></tr>`; })}</tbody></table>
      <div className="fo7-seq">${s.f.map(k => html`<span key=${k}>${PS[k]}</span>`)}${s.dead ? PS.filter((_, k) => !s.f.includes(k)).map(p => html`<span key=${p} className="bad">${p}</span>`) : ''}</div>
      <p className="fo7-note">${s.ok ? html`<span className="fo7-good">No deadlock</span>` : s.dead ? html`<span className="fo7-bad">Deadlock: P1, P2, P3, P4</span>` : ''}</p></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${Math.min(i, steps.length - 1)} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'os-dl-conditions': Conditions, 'os-dl-rag': RagFig, 'os-dl-ordering': Ordering, 'os-dl-safe': SafeStates, 'os-dl-bankers': Bankers, 'os-dl-request': Request, 'os-dl-detect': Detect });
})();
/* ── part 8 ── */
// OS visuals, part 8: L7 File-System (file operations, open files, access methods, directories, protection, directory implementation, FAT, allocation methods).
// Every label and caption comes from the site's notes for Lecture 7.
(function () {
  const { useState, useEffect } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.fo8 .fig-dots i.on{ background:var(--k-os); } .fo8 .fig-btn:hover{ border-color:var(--k-os); } .fo8 .fig-btn.solid{ background:var(--s-os); }
.fo8-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 12px; }
.fo8-modes .fig-btn[aria-pressed="true"]{ background:var(--s-os); color:#fff; border-color:transparent; }
.fo8-acts{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:10px 0 0; }
.fo8-acts .fig-btn{ font-size:.82rem; padding:5px 10px; }
.fo8-two{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:8px; max-width:440px; margin:0 auto; }
.fo8-panel{ border:1.4px solid var(--line); border-radius:10px; background:var(--paper); padding:7px 8px; font-size:.82rem; color:var(--ink); min-width:0; }
.fo8-panel h4{ margin:0 0 5px; font-size:.8rem; color:var(--graphite); font-weight:700; }
.fo8-row{ border:1.2px solid var(--line); border-radius:6px; padding:3px 6px; margin:3px 0; transition:all .4s ease; background:var(--paper); color:var(--ink); }
.fo8-row.k{ border-color:var(--k-os); background:color-mix(in srgb, var(--k-os) 16%, var(--paper)); font-weight:700; }
.fo8-row.on{ border-color:var(--s-os); background:var(--s-os); color:#fff; font-weight:700; }
.fo8-row.ghost{ opacity:.35; border-style:dashed; }
.fo8-scan{ animation:fo8scan .5s ease 2; }
@keyframes fo8scan{ 50%{ background:color-mix(in srgb, var(--k-os) 28%, var(--paper)); } }
.fo8-strip{ display:grid; grid-template-columns:repeat(8, minmax(0,1fr)); gap:3px; max-width:400px; margin:10px auto 0; }
.fo8-cell{ border:1.3px solid var(--line); border-radius:5px; min-height:30px; display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--ink); background:var(--paper); transition:all .35s ease; text-align:center; line-height:1.15; }
.fo8-cell.full{ background:color-mix(in srgb, var(--k-os) 22%, var(--paper)); border-color:var(--k-os); }
.fo8-cell.on{ background:var(--s-os); border-color:var(--s-os); color:#fff; font-weight:700; }
.fo8-cell.gone{ background:var(--paper-2); color:var(--graphite); border-style:dashed; }
.fo8-ptrs{ display:grid; grid-template-columns:repeat(8, minmax(0,1fr)); gap:3px; max-width:400px; margin:2px auto 0; font-size:.76rem; color:var(--k-os); font-weight:700; text-align:center; min-height:18px; }
.fo8-note{ text-align:center; font-size:.8rem; color:var(--graphite); margin:6px 0 0; }
.fo8-ltr{ direction:ltr; unicode-bidi:isolate; }
.fo8-code{ direction:ltr; text-align:left; font-family:var(--mono, ui-monospace, monospace); font-size:.8rem; max-width:400px; margin:10px auto 0; display:grid; gap:4px; }
.fo8-code div{ border:1.2px solid var(--line); border-radius:6px; padding:4px 8px; background:var(--paper); color:var(--ink); transition:all .35s ease; overflow-wrap:anywhere; }
.fo8-code div.on{ border-color:var(--s-os); background:color-mix(in srgb, var(--k-os) 18%, var(--paper)); font-weight:700; }
.fo8-tbl{ width:100%; border-collapse:collapse; font-size:.8rem; color:var(--ink); }
.fo8-tbl th, .fo8-tbl td{ border:1px solid var(--line); padding:3px 5px; text-align:center; }
.fo8-tbl th{ color:var(--graphite); font-weight:700; background:var(--paper-2); }
.fo8-tbl tr.on td{ background:color-mix(in srgb, var(--k-os) 20%, var(--paper)); font-weight:700; }
.fo8-tree{ direction:ltr; text-align:left; font-size:.84rem; max-width:360px; margin:0 auto; }
.fo8-tree ul{ list-style:none; margin:0; padding-left:16px; border-left:1.3px dashed var(--line); }
.fo8-tree > ul{ border-left:0; padding-left:0; }
.fo8-tree li{ margin:3px 0; }
.fo8-node{ display:inline-block; border:1.2px solid var(--line); border-radius:6px; padding:1px 7px; background:var(--paper); color:var(--ink); transition:all .4s ease; }
.fo8-node.dir{ font-weight:700; }
.fo8-node.cwd{ background:var(--s-os); border-color:var(--s-os); color:#fff; }
.fo8-node.new{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 18%, var(--paper)); }
.fo8-node.del{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 14%, var(--paper)); text-decoration:line-through; }
.fo8-node.path{ border-color:var(--k-os); background:color-mix(in srgb, var(--k-os) 18%, var(--paper)); }
.fo8-node.bad{ border-color:var(--pen); color:var(--pen); border-style:dashed; }
.fo8-perm{ display:grid; grid-template-columns:auto repeat(3, 34px) auto auto; gap:5px 6px; align-items:center; justify-content:center; font-size:.84rem; color:var(--ink); }
.fo8-perm .bit{ min-height:32px; border-radius:6px; border:1.3px solid var(--line); background:var(--paper); color:var(--graphite); font:inherit; font-weight:700; cursor:pointer; }
.fo8-perm .bit.on{ background:var(--s-os); border-color:var(--s-os); color:#fff; }
.fo8-perm .hd{ color:var(--graphite); font-size:.78rem; text-align:center; font-weight:700; }
.fo8-perm .num{ font-weight:700; font-size:1rem; color:var(--k-os); text-align:center; min-width:22px; }
.fo8-perm .bin{ font-family:var(--mono, ui-monospace, monospace); font-size:.8rem; color:var(--graphite); }
.fo8-cmd{ direction:ltr; text-align:center; font-family:var(--mono, ui-monospace, monospace); font-size:.95rem; font-weight:700; margin:10px 0 0; color:var(--ink); }
.fo8-buckets{ display:grid; gap:5px; max-width:400px; margin:0 auto; }
.fo8-bk{ display:flex; align-items:center; gap:5px; flex-wrap:wrap; font-size:.8rem; color:var(--ink); }
.fo8-bk > b{ min-width:62px; color:var(--graphite); font-size:.78rem; }
.fo8-grid{ display:grid; grid-template-columns:repeat(8, minmax(0,1fr)); gap:3px; max-width:400px; margin:0 auto; }
.fo8-blk{ border:1.2px solid var(--line); border-radius:5px; min-height:30px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:.75rem; color:var(--ink); background:var(--paper); transition:all .4s ease; line-height:1.1; }
.fo8-blk.on{ outline:2.5px solid var(--s-os); outline-offset:-1px; font-weight:700; }
.fo8-blk.ix{ border-width:2px; border-color:var(--ink); }
.fo8-legend{ display:flex; flex-wrap:wrap; gap:5px 10px; justify-content:center; font-size:.78rem; color:var(--ink); margin:8px 0 0; }
.fo8-legend i{ display:inline-block; width:12px; height:12px; border-radius:3px; margin-right:4px; vertical-align:-2px; border:1px solid var(--line); }
.fo8-chain{ direction:ltr; text-align:center; font-size:.84rem; margin:8px 0 0; color:var(--ink); line-height:1.8; }
.fo8-chain span{ display:inline-block; border:1.2px solid var(--line); border-radius:5px; padding:0 6px; background:var(--paper); transition:all .35s ease; }
.fo8-chain span.on{ background:var(--s-os); border-color:var(--s-os); color:#fff; font-weight:700; }
.fo8-chain span.seen{ background:color-mix(in srgb, var(--k-os) 18%, var(--paper)); border-color:var(--k-os); }
.fo8-chain em{ font-style:normal; color:var(--graphite); margin:0 3px; }
.fo8-meter{ text-align:center; font-size:.84rem; font-weight:700; color:var(--k-os); margin:6px 0 0; }
.fo8-warn{ text-align:center; font-size:.84rem; font-weight:700; color:var(--pen); margin:6px 0 0; }
@media (prefers-reduced-motion: reduce){ .fo8-scan{ animation:none; } }`;
  if (!document.getElementById('fo8-css')) { const s = document.createElement('style'); s.id = 'fo8-css'; s.textContent = CSS; document.head.appendChild(s); }

  const Modes = ({ list, v, set }) => html`<div className="fo8-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(v === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;
  const Btn = ({ on, dis, children }) => html`<button className="fig-btn" disabled=${!!dis} onClick=${on}>${children}</button>`;

  /* ── L7 [0.2]-[0.3]: open, read, write, seek and close move the directory entry between disk and memory ── */
  const FO = [
    { en: 'Information about files is kept in the <b>directory structure</b>, which is maintained on the <b>disk</b>.', ar: 'المعلومات عن الـ files محفوظة في الـ <b>directory structure</b>، واللي متخزّن على الـ <b>disk</b>.' },
    { en: '<b>open(Fi)</b>: search the directory on disk for entry Fi…', ar: 'الـ <b>open(Fi)</b>: بندوّر في الـ directory اللي على الـ disk على الـ entry بتاع Fi…' },
    { en: '…and move its content to memory.', ar: '…وبعدين بننقل محتواه للـ memory.' },
    { en: '<b>write</b>: data is written at the <b>write pointer</b>, and the pointer moves on.', ar: 'الـ <b>write</b>: الـ data بتتكتب عند الـ <b>write pointer</b>، والـ pointer بيتحرك لقدام.' },
    { en: '<b>read</b>: data is read at the <b>read pointer</b>.', ar: 'الـ <b>read</b>: الـ data بتتقري عند الـ <b>read pointer</b>.' },
    { en: '<b>Reposition within the file (seek)</b>: the pointer jumps to another place in the file.', ar: 'الـ <b>reposition (seek)</b>: الـ pointer بينط لمكان تاني جوه الـ file.' },
    { en: '<b>close(Fi)</b>: move the content of entry Fi in memory back to the directory on disk. The other operations are <b>create</b>, <b>delete</b> and <b>truncate</b>.', ar: 'الـ <b>close(Fi)</b>: بننقل محتوى الـ entry بتاع Fi من الـ memory ونرجّعه للـ directory اللي على الـ disk. والـ operations التانية هي الـ <b>create</b> والـ <b>delete</b> والـ <b>truncate</b>.' }
  ];
  function FileOpen({ ar }) {
    const [i, ctl] = useSteps(FO.length, 2600);
    const inMem = i >= 2 && i <= 5, written = i >= 3, W = i >= 3 ? 3 : 0, R = i >= 5 ? 2 : i >= 4 ? 1 : 0;
    const cellCls = k => 'fo8-cell' + ((i === 3 && k < 3) || (i === 4 && k === 0) ? ' on' : written && k < 3 ? ' full' : '');
    return html`<figure className="fig fo8"><div className="fig-stage">
      <div className="fo8-two">
        <div className="fo8-panel"><h4>Disk: directory</h4>
          ${['F1', 'Fi', 'F3'].map((f, k) => html`<div key=${f + (i === 1 ? 's' : '')} className=${'fo8-row' + (f === 'Fi' && (i === 2 || i === 6) ? ' k' : '') + (i === 1 && !calm() ? ' fo8-scan' : '')} style=${{ animationDelay: (k * .5) + 's' }}>${f}${f === 'Fi' && i === 1 ? ' ← found' : ''}${f === 'Fi' && i === 6 ? ' ← updated' : ''}</div>`)}</div>
        <div className="fo8-panel"><h4>Memory</h4>
          ${inMem ? html`<div className="fo8-row on">Fi (open)</div>` : html`<div className="fo8-row ghost">no entry</div>`}</div>
      </div>
      <div className="fo8-strip" aria-label="The file Fi, block by block">${[0, 1, 2, 3, 4, 5, 6, 7].map(k => html`<div key=${k} className=${cellCls(k)}>${k}</div>`)}</div>
      <div className="fo8-ptrs" aria-hidden="true">${[0, 1, 2, 3, 4, 5, 6, 7].map(k => html`<span key=${k}>${inMem ? [k === W ? 'W' : '', k === R ? 'R' : ''].filter(Boolean).join(' ') : ''}</span>`)}</div>
      <p className="fo8-note">W = write pointer, R = read pointer</p>
      </div>
      <${Cap} ...${FO[i]} showAr=${ar} /><${Bar} steps=${FO} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L7 [1.0]: the open-file table, file-open count, per-process file pointer and access rights ── */
  function OpenCount({ ar }) {
    const P0 = { A: { open: false, ptr: 0 }, B: { open: false, ptr: 0 } }, RIGHTS = { A: 'read, write', B: 'read' };
    const [p, setP] = useState(P0), [msg, setMsg] = useState(null);
    const count = (p.A.open ? 1 : 0) + (p.B.open ? 1 : 0);
    const act = (who, what) => {
      const n = { A: { ...p.A }, B: { ...p.B } };
      if (what === 'open') n[who].open = true;
      if (what === 'read') n[who].ptr += 1;
      if (what === 'close') { n[who].open = false; n[who].ptr = 0; }
      const c = (n.A.open ? 1 : 0) + (n.B.open ? 1 : 0); setP(n); setMsg({ who, what, c });
    };
    let en = 'Two processes, <b>A</b> and <b>B</b>, use the same file <b>Fi</b>. Open it from A or B.', a = 'فيه process-ين، <b>A</b> و <b>B</b>، بيستخدموا نفس الـ file <b>Fi</b>. افتحه من A أو من B.';
    if (msg && msg.what === 'open') { en = `Process ${msg.who} opened Fi: the <b>open-file table</b> tracks it, the <b>file-open count</b> is ${msg.c}, and ${msg.who} gets its own <b>file pointer</b> and <b>access rights</b> (${RIGHTS[msg.who]}).`; a = `الـ process ${msg.who} فتح Fi: الـ <b>open-file table</b> بيتابعه، والـ <b>file-open count</b> بقى ${msg.c}، و${msg.who} خد <b>file pointer</b> و<b>access rights</b> خاصين بيه (${RIGHTS[msg.who]}).`; }
    if (msg && msg.what === 'read') { en = `Process ${msg.who} reads: only <b>its own</b> file pointer moves, because the pointer is kept <b>per process</b> (last read/write location).`; a = `الـ process ${msg.who} بيقرا: الـ file pointer بتاعه هو بس اللي بيتحرك، لأن الـ pointer بيتحفظ <b>لكل process لوحده</b> (آخر مكان اتقرا أو اتكتب).`; }
    if (msg && msg.what === 'close' && msg.c > 0) { en = `Process ${msg.who} closed Fi: the count drops to ${msg.c}, so the entry <b>stays</b>; another process still has the file open.`; a = `الـ process ${msg.who} قفل Fi: الـ count نزل لـ ${msg.c}، فالـ entry <b>بيفضل</b> موجود؛ لسه فيه process تاني فاتح الـ file.`; }
    if (msg && msg.what === 'close' && msg.c === 0) { en = 'The <b>last</b> process closed Fi: the count is 0, so its entry is <b>removed</b> from the open-file table.'; a = 'آخر process قفل Fi: الـ count بقى 0، فالـ entry بتاعه <b>بيتشال</b> من الـ open-file table.'; }
    return html`<figure className="fig fo8"><div className="fig-stage">
      <div className="fo8-panel" style=${{ maxWidth: '420px', margin: '0 auto' }}><h4>Open-file table</h4>
        ${count ? html`<div className="fo8-row k">Fi · file-open count = ${count}</div>` : html`<div className="fo8-row ghost">empty</div>`}</div>
      <div className="fo8-two" style=${{ marginTop: '8px' }}>
        ${['A', 'B'].map(w => html`<div key=${w} className="fo8-panel"><h4>Process ${w}</h4>
          ${p[w].open ? html`<div className="fo8-row">pointer: ${p[w].ptr}</div><div className="fo8-row">rights: ${RIGHTS[w]}</div>` : html`<div className="fo8-row ghost">Fi not open</div>`}
          <div className="fo8-acts">${p[w].open ? html`<${Btn} on=${() => act(w, 'read')}>Read</${Btn}><${Btn} on=${() => act(w, 'close')}>Close</${Btn}>` : html`<${Btn} on=${() => act(w, 'open')}>Open</${Btn}>`}</div></div>`)}
      </div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L7 [2.0]-[2.2]: sequential access, direct access, and sequential access simulated on a direct-access file ── */
  function Access({ ar }) {
    const [mode, setMode] = useState('seq'), [cp, setCp] = useState(0), [end, setEnd] = useState(5), [hit, setHit] = useState(null), [line, setLine] = useState(-1), [n, setN] = useState(3), [msg, setMsg] = useState(null);
    const change = m => { setMode(m); setCp(0); setEnd(5); setHit(null); setLine(-1); setMsg(null); };
    const readNext = () => { if (cp >= end) { setHit(null); setMsg('eof'); return; } setHit(cp); setCp(cp + 1); setMsg('read'); setLine(1); };
    const writeNext = () => { setHit(cp); setEnd(mode === 'seq' ? cp + 1 : Math.max(end, cp + 1)); setCp(cp + 1); setMsg('write'); setLine(2); };
    const reset = () => { setCp(0); setHit(null); setMsg('reset'); setLine(0); };
    const nOp = op => { setHit(n); if (op === 'read') setMsg('readn'); if (op === 'write') { setMsg('writen'); setEnd(Math.max(end, n + 1)); } if (op === 'pos') { setCp(n); setHit(null); setMsg('pos'); } };
    let en, a;
    if (mode === 'seq') {
      en = '<b>Sequential access</b> follows the tape model: beginning, current position, end. Operations: <b>read next</b>, <b>write next</b>, <b>reset</b>.'; a = 'الـ <b>sequential access</b> ماشي على الـ tape model: بداية، ومكان حالي، ونهاية. الـ operations هي الـ <b>read next</b> والـ <b>write next</b> والـ <b>reset</b>.';
      if (msg === 'write') { en = `<b>write next</b> wrote record ${hit} and moved on. There is <b>no read after the last write</b>: the old records after it are gone (rewrite).`; a = `الـ <b>write next</b> كتب الـ record رقم ${hit} واتحرك. مفيش <b>read بعد آخر write</b>: الـ records القديمة اللي بعده راحت (rewrite).`; }
      if (msg === 'read') { en = `<b>read next</b> read record ${hit}; the current position moved to ${cp}.`; a = `الـ <b>read next</b> قرا الـ record رقم ${hit}، والمكان الحالي بقى ${cp}.`; }
      if (msg === 'eof') { en = 'Nothing after the end: read next has no record to read.'; a = 'مفيش حاجة بعد النهاية: الـ read next مش لاقي record يقراه.'; }
      if (msg === 'reset') { en = '<b>reset</b> goes back to the beginning.'; a = 'الـ <b>reset</b> بيرجع للبداية.'; }
    } else if (mode === 'dir') {
      en = '<b>Direct access</b>: the file is fixed-length logical records. Pick n (the <b>relative block number</b>) and read n, write n or position to n.'; a = 'الـ <b>direct access</b>: الـ file عبارة عن logical records طولها ثابت. اختار n (الـ <b>relative block number</b>) واعمل read n أو write n أو position to n.';
      if (msg === 'readn' || msg === 'writen') { en = `<b>${msg === 'readn' ? 'read' : 'write'} ${n}</b> went straight to block ${n}, without passing the blocks before it. Relative block numbers let the OS decide where the file is placed.`; a = `الـ <b>${msg === 'readn' ? 'read' : 'write'} ${n}</b> راح على block ${n} على طول، من غير ما يعدّي على اللي قبله. والـ relative block numbers بتسيب الـ OS يقرر الـ file يتحط فين.`; }
      if (msg === 'pos') { en = `<b>position to ${n}</b>: the current position is now ${n}, so read next or write next continue from there.`; a = `الـ <b>position to ${n}</b>: المكان الحالي بقى ${n}، فالـ read next أو الـ write next بيكمّلوا من هناك.`; }
    } else {
      en = 'Sequential access <b>simulated</b> on a direct-access file, using a current position <b>cp</b>. Press an operation to run its code.'; a = 'الـ sequential access <b>متعمل بالمحاكاة</b> على file بـ direct access، باستخدام مكان حالي اسمه <b>cp</b>. دوس على operation عشان يشغّل الـ code بتاعها.';
      if (line === 0) { en = '<b>reset</b> → cp = 0.'; a = 'الـ <b>reset</b> بيخلي الـ cp يساوي 0.'; }
      if (line === 1 && msg === 'read') { en = `<b>read next</b> → read cp; cp = cp + 1. Block ${hit} was read and cp is now ${cp}.`; a = `الـ <b>read next</b> بيقرا الـ cp وبعدين يزوّده 1. اتقرا block ${hit} والـ cp بقى ${cp}.`; }
      if (msg === 'eof') { en = 'cp is past the last record: there is nothing more to read.'; a = 'الـ cp عدّى آخر record: مفيش حاجة تانية تتقري.'; }
      if (line === 2) { en = `<b>write next</b> → write cp; cp = cp + 1. Block ${hit} was written and cp is now ${cp}.`; a = `الـ <b>write next</b> بيكتب عند الـ cp وبعدين يزوّده 1. اتكتب block ${hit} والـ cp بقى ${cp}.`; }
    }
    const curPos = mode === 'dir' ? cp : cp;
    return html`<figure className="fig fo8"><div className="fig-stage">
      <${Modes} list=${[['seq', 'Sequential'], ['dir', 'Direct'], ['sim', 'Sequential on direct']]} v=${mode} set=${change} />
      <div className="fo8-strip" aria-label="Records of the file">${[0, 1, 2, 3, 4, 5, 6, 7].map(k => html`<div key=${k} className=${'fo8-cell' + (k === hit ? ' on' : k < end ? ' full' : mode === 'seq' ? ' gone' : '')}>${k}</div>`)}</div>
      <div className="fo8-ptrs" aria-hidden="true">${[0, 1, 2, 3, 4, 5, 6, 7].map(k => html`<span key=${k}>${k === curPos ? (mode === 'sim' ? 'cp' : 'cur') : ''}</span>`)}</div>
      ${mode === 'seq' && html`<p className="fo8-note">beginning = 0 · end = ${end}</p>`}
      ${mode === 'dir' && html`<div className="fo8-acts"><span style=${{ alignSelf: 'center', fontSize: '.84rem' }}>n =</span>${[0, 1, 2, 3, 4, 5, 6, 7].map(k => html`<button key=${k} className=${'fig-btn' + (k === n ? ' solid' : '')} onClick=${() => setN(k)}>${k}</button>`)}</div>`}
      ${mode === 'sim' && html`<div className="fo8-code">${['reset → cp = 0', 'read next → read cp; cp = cp + 1', 'write next → write cp; cp = cp + 1'].map((t, k) => html`<div key=${k} className=${k === line ? 'on' : ''}>${t}</div>`)}</div>`}
      <div className="fo8-acts">${mode === 'dir'
        ? html`<${Btn} on=${() => nOp('read')}>read ${n}</${Btn}><${Btn} on=${() => nOp('write')}>write ${n}</${Btn}><${Btn} on=${() => nOp('pos')}>position to ${n}</${Btn}><${Btn} on=${readNext}>read next</${Btn}>`
        : html`<${Btn} on=${readNext}>read next</${Btn}><${Btn} on=${writeNext}>write next</${Btn}><${Btn} on=${reset}>reset</${Btn}>`}</div>
      </div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L7 [3.2]-[3.3] and its table: single-level, two-level and tree-structured directories ── */
  function DirStructures({ ar }) {
    const [mode, setMode] = useState('one'), [act, setAct] = useState(null);
    const change = m => { setMode(m); setAct(null); };
    const N = (t, cls) => html`<span className=${'fo8-node ' + (cls || '')}>${t}</span>`;
    let body, acts, en, a;
    if (mode === 'one') {
      body = html`<div className="fo8-tree"><ul><li>${N('directory (all users)', 'dir')}<ul>
        <li>${N('test (user 1)')}</li><li>${N('prog (user 1)')}</li><li>${N('data (user 2)')}</li>
        ${act === 'dup' && html`<li>${N('test (user 2) ✗ name taken', 'bad')}</li>`}</ul></li></ul></div>`;
      acts = html`<${Btn} on=${() => setAct('dup')}>User 2 creates "test"</${Btn}>`;
      en = '<b>Single-level directory</b>: one directory for all users. There is <b>no grouping</b> of files, and searching gets slow as the files grow.'; a = 'الـ <b>single-level directory</b>: directory واحد لكل الـ users. مفيش <b>grouping</b> للـ files، والـ search بيبطأ لما الـ files تكتر.';
      if (act === 'dup') { en = '<b>Naming problem</b>: all files must have unique names, so user 2 cannot also call a file "test".'; a = 'دي <b>مشكلة الـ naming</b>: كل الـ files لازم أساميها تبقى مختلفة، فالـ user 2 مايقدرش يسمي file كمان باسم "test".'; }
    } else if (mode === 'two') {
      const hot = act === 'find';
      body = html`<div className="fo8-tree"><ul><li>${N('master directory', 'dir' + (hot ? ' path' : ''))}<ul>
        <li>${N('user1 (UFD)', 'dir')}<ul><li>${N('test')}</li><li>${N('prog')}</li></ul></li>
        <li>${N('user2 (UFD)', 'dir' + (hot ? ' path' : ''))}<ul><li>${N('test', hot ? 'path' : '')}</li><li>${N('data')}</li></ul></li></ul></li></ul></div>`;
      acts = html`<${Btn} on=${() => setAct('find')}>Open user2/test</${Btn}>`;
      en = '<b>Two-level directory</b>: a separate directory (<b>UFD</b>) for each user under a master directory. Different users can have the <b>same file name</b>.'; a = 'الـ <b>two-level directory</b>: كل user ليه directory لوحده (<b>UFD</b>) تحت الـ master directory. وبكده الـ users المختلفين ممكن يستخدموا <b>نفس اسم الـ file</b>.';
      if (hot) { en = 'Files are addressed by <b>path name</b> (user/file), here <b>user2/test</b>, and searching is <b>efficient</b>. Still, there is <b>no grouping capability</b> within a user.'; a = 'الـ files بنوصلها بالـ <b>path name</b> (user/file)، وهنا هو <b>user2/test</b>، والـ search بيبقى <b>efficient</b>. بس لسه مفيش <b>grouping</b> جوه الـ user الواحد.'; }
    } else {
      const del = act === 'del', made = act === 'mkdir' || del, cd = act === 'cd';
      body = html`<div className="fo8-tree"><ul><li>${N('/', 'dir')}<ul>
        <li>${N('spell', 'dir' + (cd ? ' path' : ''))}<ul><li>${N('mail', 'dir' + (cd ? ' path' : ''))}<ul><li>${N('prog', 'dir' + (cd ? ' cwd' : ''))}</li></ul></li></ul></li>
        <li>${N('mail', 'dir' + (del ? ' del' : act === 'mkdir' ? ' cwd' : ''))}${made && html`<ul><li>${N('count', 'dir ' + (del ? 'del' : 'new'))}</li></ul>`}</li></ul></li></ul></div>`;
      acts = html`<${Btn} on=${() => setAct('cd')}>cd /spell/mail/prog</${Btn}><${Btn} on=${() => setAct('mkdir')}>in /mail: mkdir count</${Btn}><${Btn} dis=${!made} on=${() => setAct('del')}>Delete mail</${Btn}>`;
      en = '<b>Tree-structured directory</b>: efficient searching, grouping capability, and a <b>current (working) directory</b>. Try the commands.'; a = 'الـ <b>tree-structured directory</b>: الـ search فيه efficient، وفيه grouping، وفيه <b>current (working) directory</b>. جرّب الـ commands.';
      if (cd) { en = '<b>cd /spell/mail/prog</b> makes prog the current directory. A path name can be <b>absolute</b> (from the root, /spell/mail/prog) or <b>relative</b> (from the current directory).'; a = 'الـ <b>cd /spell/mail/prog</b> بيخلي prog هو الـ current directory. والـ path name ممكن يبقى <b>absolute</b> (من الـ root زي /spell/mail/prog) أو <b>relative</b> (من الـ current directory).'; }
      if (act === 'mkdir') { en = 'New files and subdirectories are created in the <b>current directory</b>: in /mail, <b>mkdir count</b> adds count under mail.'; a = 'الـ files والـ subdirectories الجديدة بتتعمل في الـ <b>current directory</b>: في /mail، الـ <b>mkdir count</b> بيضيف count تحت mail.'; }
      if (del) { en = 'Deleting <b>mail</b> deletes the <b>entire subtree</b> rooted at mail, so count goes with it.'; a = 'لما نمسح <b>mail</b>، بيتمسح <b>الـ subtree كله</b> اللي تحته، فالـ count بيتمسح معاه.'; }
    }
    return html`<figure className="fig fo8"><div className="fig-stage">
      <${Modes} list=${[['one', 'Single-level'], ['two', 'Two-level'], ['tree', 'Tree']]} v=${mode} set=${change} />
      ${body}
      <div className="fo8-acts">${acts}${act && html`<${Btn} on=${() => setAct(null)}>Reset</${Btn}>`}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L7 [4.3]: UNIX/Linux modes for owner, group and public, chmod 761 game ── */
  function Chmod({ ar }) {
    const START = [[1, 1, 1], [1, 1, 0], [0, 0, 1]];
    const [b, setB] = useState(START);
    const flip = (r, c) => setB(b.map((row, i) => i !== r ? row : row.map((x, j) => j === c ? 1 - x : x)));
    const digit = row => row[0] * 4 + row[1] * 2 + row[2], code = b.map(digit).join(''), isEx = code === '761';
    const CL = ['owner', 'group', 'public'];
    return html`<figure className="fig fo8"><div className="fig-stage">
      <div className="fo8-perm" role="group" aria-label="Access modes">
        <span></span><span className="hd">R</span><span className="hd">W</span><span className="hd">X</span><span className="hd">bits</span><span className="hd">digit</span>
        ${b.map((row, r) => [html`<span key=${'l' + r}>${CL[r]}</span>`,
          ...row.map((x, c) => html`<button key=${r + '-' + c} className=${'bit' + (x ? ' on' : '')} aria-pressed=${String(!!x)} aria-label=${CL[r] + ' ' + 'RWX'[c]} onClick=${() => flip(r, c)}>${x ? 'RWX'[c] : '-'}</button>`),
          html`<span key=${'b' + r} className="bin">${row.join('')}</span>`, html`<span key=${'d' + r} className="num">${digit(row)}</span>`])}
      </div>
      <p className="fo8-cmd">chmod ${code} game</p>
      ${!isEx && html`<div className="fo8-acts"><${Btn} on=${() => setB(START)}>Example from the notes (761)</${Btn}></div>`}</div>
      <${Cap} en=${isEx ? 'Three classes get read, write and execute modes: <b>owner 7 = RWX 111</b>, <b>group 6 = RW- 110</b>, <b>public 1 = --X 001</b>, so <b>chmod 761 game</b>. Tap a mode to change it. (To use a group, ask the manager to create it, e.g. G, and add users.)' : `Each class is 3 bits (R = 4, W = 2, X = 1), and their sum is the class's digit: <b>chmod ${code} game</b>.`}
        ar=${isEx ? 'فيه 3 classes وكل واحدة ليها modes للـ read والـ write والـ execute:<span class="ltr">owner 7 = RWX 111, group 6 = RW- 110, public 1 = --X 001</span>وبكده الأمر هو <b>chmod 761 game</b>. دوس على أي mode عشان تغيّره. (ولو عايز group، اطلب من الـ manager يعمله، زي G، ويضيف الـ users.)' : `كل class ليها 3 bits (الـ R بـ 4 والـ W بـ 2 والـ X بـ 1)، ومجموعهم هو الرقم بتاع الـ class:<span class="ltr">chmod ${code} game</span>`} showAr=${ar} /></figure>`;
  }

  /* ── L7 [5.3]-[5.4]: directory as a linear list or a hash table (with chained overflow) ── */
  const NAMES = ['count', 'tr', 'mail', 'list', 'f'];
  const hsh = s => [...s].reduce((a, c) => a + c.charCodeAt(0), 0) % 4;
  function DirImpl({ ar }) {
    const [mode, setMode] = useState('lin'), [q, setQ] = useState(null), [k, setK] = useState(0);
    const buckets = [0, 1, 2, 3].map(b => NAMES.filter(n => hsh(n) === b));
    const path = !q ? [] : mode === 'lin' ? NAMES.slice(0, NAMES.indexOf(q) + 1) : buckets[hsh(q)].slice(0, buckets[hsh(q)].indexOf(q) + 1);
    useEffect(() => { if (!q) return; if (calm()) { setK(path.length); return; } if (k >= path.length) return; const t = setTimeout(() => setK(x => x + 1), 650); return () => clearTimeout(t); }, [q, k, mode]);
    const go = n => { setQ(n); setK(0); }, change = m => { setMode(m); setQ(null); setK(0); };
    const done = q && k >= path.length, seen = path.slice(0, k);
    const cls = n => 'fo8-row' + (done && n === q ? ' on' : seen.includes(n) ? ' k' : '');
    let en = mode === 'lin' ? '<b>Linear list</b> of file names with pointers to the data blocks: simple to program, but time-consuming, because a search is linear. Pick a name to search for.' : '<b>Hash table</b>: a linear list plus a hash structure, which decreases the directory search time. Pick a name to search for.';
    let a = mode === 'lin' ? 'الـ <b>linear list</b> فيها أسامي الـ files ومعاها pointers للـ data blocks: سهلة في البرمجة، بس بتاخد وقت لأن الـ search بيبقى linear. اختار اسم تدوّر عليه.' : 'الـ <b>hash table</b> هي linear list ومعاها hash structure، وده بيقلل وقت الـ search في الـ directory. اختار اسم تدوّر عليه.';
    if (done) {
      if (mode === 'lin') { en = `Found <b>${q}</b> after <b>${path.length}</b> comparison${path.length > 1 ? 's' : ''}: the search walks the list from the top. Keeping it sorted (a linked list or a B+ tree) can help.`; a = `لقينا <b>${q}</b> بعد <b>${path.length}</b> مقارنة: الـ search بيمشي على الـ list من أولها. ولو خليناها sorted (بـ linked list أو B+ tree) ده ممكن يساعد.`; }
      else { const c = buckets[hsh(q)].length > 1; en = `<b>${q}</b> hashes straight to bucket ${hsh(q)}: found after <b>${path.length}</b> comparison${path.length > 1 ? 's' : ''}.${c ? ' Two names hash to the same location here (a <b>collision</b>), so they are kept in a chain (<b>chained overflow</b>).' : ''}`; a = `الاسم <b>${q}</b> بيروح على bucket رقم ${hsh(q)} على طول، ولقيناه بعد <b>${path.length}</b> مقارنة.${c ? ' وهنا فيه اسمين بيروحوا لنفس المكان (ده <b>collision</b>)، فبنحطهم في chain (الـ <b>chained overflow</b>).' : ''}`; }
    }
    return html`<figure className="fig fo8"><div className="fig-stage">
      <${Modes} list=${[['lin', 'Linear list'], ['hash', 'Hash table']]} v=${mode} set=${change} />
      ${mode === 'lin'
        ? html`<div className="fo8-panel" style=${{ maxWidth: '300px', margin: '0 auto' }}><h4>Directory (linear list)</h4>${NAMES.map(n => html`<div key=${n} className=${cls(n)}>${n} → data blocks</div>`)}</div>`
        : html`<div className="fo8-buckets">${buckets.map((bk, b) => html`<div key=${b} className="fo8-bk"><b>bucket ${b}</b>${bk.length ? bk.map((n, j) => html`<${React.Fragment} key=${n}>${j > 0 && html`<span aria-hidden="true">→</span>`}<span className=${cls(n)} style=${{ margin: 0 }}>${n}</span></${React.Fragment}>`) : html`<span className="fo8-row ghost" style=${{ margin: 0 }}>empty</span>`}</div>`)}
          <p className="fo8-note fo8-ltr">toy hash for this demo: sum of letter codes mod 4</p></div>`}
      <div className="fo8-acts">${NAMES.map(n => html`<button key=${n} className=${'fig-btn' + (q === n ? ' solid' : '')} onClick=${() => go(n)}>${n}</button>`)}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L7 [6.3]: the File-Allocation Table, test = 217 → 618 → 339 → end ── */
  const FS = [
    { en: '<b>FAT</b> is a variation of linked allocation that keeps the links in a <b>table at the start of the volume</b>. The directory entry <b>test</b> holds its start block, <b>217</b>.', ar: 'الـ <b>FAT</b> نوع من الـ linked allocation، بس الـ links بتتحفظ في <b>table في أول الـ volume</b>. والـ directory entry اسمه <b>test</b> شايل الـ start block بتاعه، وهو <b>217</b>.', at: 217, chain: [217] },
    { en: 'Look up <b>FAT[217]</b>: it holds <b>618</b>, the next block of test.', ar: 'بنبص في <b>FAT[217]</b>: فيه <b>618</b>، وده الـ block اللي بعده في test.', at: 217, chain: [217, 618] },
    { en: '<b>FAT[618]</b> holds <b>339</b>.', ar: 'والـ <b>FAT[618]</b> فيه <b>339</b>.', at: 618, chain: [217, 618, 339] },
    { en: '<b>FAT[339]</b> holds <b>−1</b>: the end of the file.', ar: 'والـ <b>FAT[339]</b> فيه <b>−1</b>، يعني ده آخر الـ file.', at: 339, chain: [217, 618, 339, 'end'] }
  ];
  function Fat({ ar }) {
    const [i, ctl] = useSteps(FS.length, 2600), s = FS[i];
    const rows = [[0, ''], ['…', ''], [217, 618], ['…', ''], [339, '−1'], ['…', ''], [618, 339], ['…', '']];
    return html`<figure className="fig fo8"><div className="fig-stage">
      <div className="fo8-two">
        <div className="fo8-panel"><h4>Directory</h4><table className="fo8-tbl"><thead><tr><th>name</th><th>start block</th></tr></thead><tbody><tr className=${i === 0 ? 'on' : ''}><td>test</td><td>217</td></tr></tbody></table></div>
        <div className="fo8-panel"><h4>FAT</h4><table className="fo8-tbl"><thead><tr><th>block</th><th>next</th></tr></thead><tbody>
          ${rows.map(([b, v], k) => html`<tr key=${k} className=${b === s.at && i > 0 ? 'on' : ''}><td>${b}</td><td>${v}</td></tr>`)}</tbody></table></div>
      </div>
      <div className="fo8-chain" aria-label="Blocks of test in order">${s.chain.map((c, k) => html`<${React.Fragment} key=${k}>${k > 0 && html`<em>→</em>`}<span className=${k === s.chain.length - 1 ? 'on' : 'seen'}>${c === 'end' ? 'end of file' : c}</span></${React.Fragment}>`)}</div></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${FS} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L7 [6.1]-[6.4] and its table: contiguous, linked and indexed allocation on a 32-block disk ── */
  const HUE = { count: 'var(--k-os)', tr: 'var(--pen)', mail: 'var(--ok)', list: '#c08a00', f: '#2a8fb0', jeep: 'var(--k-os)', new: '#c08a00' };
  const CONT = [['count', 0, 2], ['tr', 14, 3], ['mail', 19, 6], ['list', 28, 4], ['f', 6, 2]];
  const PACKED = [['count', 0, 2], ['f', 2, 2], ['tr', 4, 3], ['mail', 7, 6], ['list', 13, 4]];
  const JEEP = [9, 16, 1, 10, 25];
  function Alloc({ ar }) {
    const [mode, setMode] = useState('cont'), [st, setSt] = useState({}), [k, setK] = useState(0);
    const change = m => { setMode(m); setSt({}); setK(0); };
    const files = st.packed ? PACKED.concat(st.made ? [['new', 17, 7]] : []) : CONT;
    const owner = b => { if (mode !== 'cont') return JEEP.includes(b) || (mode === 'idx' && b === 19) ? 'jeep' : null; const f = files.find(([, s, l]) => b >= s && b < s + l); return f ? f[0] : null; };
    // linked / indexed walk: how many blocks have been read so far
    useEffect(() => { if (!st.walk) return; if (calm()) { setK(st.walk.length); return; } if (k >= st.walk.length) return; const t = setTimeout(() => setK(x => x + 1), 700); return () => clearTimeout(t); }, [st, k]);
    const walk = list => { setSt({ walk: list }); setK(0); };
    const readBlocks = st.walk ? st.walk.slice(0, k) : [], cur = readBlocks[readBlocks.length - 1];
    const on = b => (st.hit === b) || cur === b;
    const free = [...Array(32).keys()].filter(b => !owner(b)), holes = []; free.forEach(b => { const h = holes[holes.length - 1]; if (h && h[1] === b - 1) h[1] = b; else holes.push([b, b]); });
    const biggest = Math.max(0, ...holes.map(([a, z]) => z - a + 1));
    let en, a, acts, extra = null;
    if (mode === 'cont') {
      en = '<b>Contiguous</b>: each file occupies a set of contiguous blocks, so the directory needs only the <b>start block and length</b>. Best performance in most cases.'; a = 'الـ <b>contiguous</b>: كل file واخد blocks جنب بعض، فالـ directory محتاج بس الـ <b>start block والـ length</b>. وده أحسن performance في أغلب الحالات.';
      if (st.hit != null) { en = 'Direct access is fast: block 3 of mail is just <b>start + 3 = 19 + 3 = 22</b>, one read.'; a = 'الـ direct access سريع: الـ block رقم 3 في mail هو ببساطة <b>start + 3</b>، يعني 19 + 3 = 22، وده read واحد بس.'; }
      if (st.fail) { en = `<b>External fragmentation</b>: there are ${free.length} free blocks, but the largest free run is only ${biggest}, so a 7-block file does not fit. The fix is <b>compaction</b>.`; a = `دي <b>external fragmentation</b>: فيه ${free.length} block فاضيين، بس أكبر مساحة فاضية جنب بعض ${biggest} بس، فالـ file اللي حجمه 7 blocks مش هيدخل. والحل هو الـ <b>compaction</b>.`; }
      if (st.packed && !st.made) { en = '<b>Compaction</b> moved the files together, so all the free blocks are now one run. (It can be done off-line or on-line.)'; a = 'الـ <b>compaction</b> لمّ الـ files جنب بعض، فكل الـ blocks الفاضية بقت مساحة واحدة. (وممكن يتعمل off-line أو on-line.)'; }
      if (st.made) { en = 'Now the 7-block file fits at blocks 17 to 23. Contiguous allocation also needs the file size <b>known in advance</b>.'; a = 'دلوقتي الـ file اللي حجمه 7 blocks دخل في الـ blocks من 17 لـ 23. والـ contiguous allocation كمان محتاج نعرف حجم الـ file <b>من الأول</b>.'; }
      acts = st.packed ? html`<${Btn} dis=${st.made} on=${() => setSt({ packed: 1, made: 1 })}>Create a 7-block file</${Btn}>` : html`<${Btn} on=${() => setSt({ hit: 22 })}>Read block 3 of mail</${Btn}>${st.fail ? html`<${Btn} on=${() => setSt({ packed: 1 })}>Compact</${Btn}>` : html`<${Btn} on=${() => setSt({ fail: 1 })}>Create a 7-block file</${Btn}>`}`;
      extra = html`<table className="fo8-tbl" style=${{ maxWidth: '300px', margin: '8px auto 0' }}><thead><tr><th>file</th><th>start</th><th>length</th></tr></thead><tbody>${files.map(([n, s, l]) => html`<tr key=${n}><td>${n}</td><td>${s}</td><td>${l}</td></tr>`)}</tbody></table>`;
    } else if (mode === 'link') {
      en = '<b>Linked</b>: the file is a linked list of blocks scattered anywhere on the disk. Each block points to the next, and a <b>null</b> pointer ends the file. The directory holds <b>start 9</b> and <b>end 25</b>.'; a = 'الـ <b>linked</b>: الـ file عبارة عن linked list من blocks متفرقة في أي حتة على الـ disk. كل block بيشاور على اللي بعده، والـ file بيخلص عند pointer قيمته <b>null</b>. والـ directory شايل الـ <b>start 9</b> والـ <b>end 25</b>.';
      if (st.walk) { en = `To reach block 4 of jeep, the chain must be followed from the start: <b>${k} read${k === 1 ? '' : 's'}</b> so far. No efficient direct access, and a lost or damaged pointer breaks the file. No external fragmentation, though.`; a = `عشان نوصل للـ block رقم 4 في jeep، لازم نمشي ورا الـ chain من الأول: لحد دلوقتي <b>${k} read</b>. يعني مفيش direct access كويس، ولو pointer ضاع أو باظ الـ file بيبوظ. بس مفيش external fragmentation.`; }
      acts = html`<${Btn} on=${() => walk(JEEP)}>Read block 4 of jeep</${Btn}>`;
      extra = html`<div className="fo8-chain">${JEEP.map((b, j) => html`<${React.Fragment} key=${b}>${j > 0 && html`<em>→</em>`}<span className=${cur === b ? 'on' : readBlocks.includes(b) ? 'seen' : ''}>${b}</span></${React.Fragment}>`)}<em>→</em><span>null</span></div>`;
    } else {
      en = '<b>Indexed</b>: each file has its own <b>index block</b> of pointers to its data blocks. jeep\'s index block is <b>19</b>, listing 9, 16, 1, 10, 25, −1.'; a = 'الـ <b>indexed</b>: كل file ليه <b>index block</b> خاص بيه فيه pointers للـ data blocks. والـ index block بتاع jeep هو <b>19</b>، وفيه 9 و 16 و 1 و 10 و 25 و −1.';
      if (st.walk) { en = `Random (direct) access: read the index block 19, then go straight to block 25: <b>${k} read${k === 1 ? '' : 's'}</b>. No external fragmentation, but each file has the overhead of an index block. (A file of max 256 KB with 512-byte blocks is 512 blocks, so 1 index block is enough.)`; a = `الـ random (direct) access: بنقرا الـ index block 19، وبعدين نروح على block 25 على طول: <b>${k} read</b>. مفيش external fragmentation، بس كل file عليه overhead الـ index block. (ولو الـ file أقصاه 256 KB والـ block حجمه 512 byte، يبقى 512 block، فـ index block واحد كفاية.)`; }
      acts = html`<${Btn} on=${() => walk([19, 25])}>Read block 4 of jeep</${Btn}>`;
      extra = html`<div className="fo8-chain"><span className=${cur === 19 ? 'on' : readBlocks.includes(19) ? 'seen' : ''}>index block 19</span><em>:</em>${[9, 16, 1, 10, 25, '−1'].map(b => html`<span key=${b} style=${{ marginLeft: '3px' }} className=${cur === b ? 'on' : ''}>${b}</span>`)}</div>`;
    }
    const legend = mode === 'cont' ? files.map(f => f[0]) : ['jeep'];
    return html`<figure className="fig fo8"><div className="fig-stage">
      <${Modes} list=${[['cont', 'Contiguous'], ['link', 'Linked'], ['idx', 'Indexed']]} v=${mode} set=${change} />
      <div className="fo8-grid" aria-label="Disk blocks 0 to 31">${[...Array(32).keys()].map(b => { const o = owner(b);
        return html`<div key=${b} className=${'fo8-blk' + (on(b) ? ' on' : '') + (mode === 'idx' && b === 19 ? ' ix' : '')} style=${o ? { background: `color-mix(in srgb, ${HUE[o]} 30%, var(--paper))`, borderColor: HUE[o] } : null}>${b}</div>`; })}</div>
      <div className="fo8-legend">${legend.map(n => html`<span key=${n}><i style=${{ background: `color-mix(in srgb, ${HUE[n]} 30%, var(--paper))`, borderColor: HUE[n] }}></i>${n}</span>`)}<span><i></i>free</span></div>
      ${extra}
      <div className="fo8-acts">${acts}${Object.keys(st).length > 0 && html`<${Btn} on=${() => change(mode)}>Reset</${Btn}>`}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'os-file-open': FileOpen, 'os-open-count': OpenCount, 'os-access-methods': Access, 'os-dir-structures': DirStructures, 'os-chmod': Chmod, 'os-dir-impl': DirImpl, 'os-fat': Fat, 'os-alloc-methods': Alloc });
})();
/* ── part 9 ── */
// OS visuals, part 9: L8 I/O systems (bus structure, port addresses, polling, interrupt cycle, event vectors, DMA transfer, kernel I/O layers, block and character devices, interrupt overheads). Every label and caption comes from the site's notes for L8.
(function () {
  const { useState, useEffect } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.fo9 .fig-btn.solid{ background:var(--s-os); color:#fff; border-color:transparent; }
.fo9 .fig-btn[aria-pressed="true"]{ background:var(--s-os); color:#fff; border-color:transparent; }
.fo9 .fig-btn:disabled{ opacity:.45; cursor:default; }
.fo9-wrap{ max-width:440px; margin:0 auto; color:var(--ink); font-size:.86rem; line-height:1.35; }
.fo9-box{ border:1.4px solid var(--line); background:var(--paper); color:var(--ink); border-radius:8px; padding:5px 8px; text-align:center; font-weight:600; transition:background .45s, border-color .45s, color .45s, opacity .45s; }
.fo9-box small{ display:block; font-weight:400; font-size:.8rem; color:var(--graphite); }
.fo9-box.on{ background:var(--s-os); border-color:var(--s-os); color:#fff; } .fo9-box.on small{ color:rgba(255,255,255,.92); }
.fo9-box.seen{ background:color-mix(in srgb, var(--k-os) 14%, var(--paper)); border-color:var(--k-os); }
.fo9-box.dim{ opacity:.35; }
.fo9-bus{ border-radius:6px; padding:3px 8px; text-align:center; font-weight:700; font-size:.82rem; color:var(--ink); background:color-mix(in srgb, var(--graphite) 18%, var(--paper)); border:1px solid var(--graphite); transition:all .45s; }
.fo9-bus.on{ background:var(--s-os); color:#fff; border-color:var(--s-os); }
.fo9-bus.dim{ opacity:.35; }
.fo9-v{ text-align:center; color:var(--graphite); line-height:1; margin:3px 0; font-size:.9rem; }
.fo9-row{ display:grid; gap:6px; }
.fo9-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:6px 0; }
.fo9-chip{ border:1.3px solid var(--line); background:var(--paper); color:var(--ink); border-radius:99px; padding:3px 10px; font-size:.82rem; cursor:pointer; font:inherit; font-size:.82rem; }
.fo9-chip[aria-pressed="true"]{ background:var(--s-os); color:#fff; border-color:var(--s-os); }
.fo9-tbl{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:3px 8px; align-items:center; }
.fo9-tbl > span{ padding:3px 6px; border-radius:5px; transition:background .35s, color .35s; }
.fo9-tbl > span.mono{ font-family:var(--mono); font-weight:700; white-space:nowrap; }
.fo9-tbl > span.hit{ background:var(--s-os); color:#fff; }
.fo9-in{ display:flex; gap:8px; align-items:center; justify-content:center; flex-wrap:wrap; margin-bottom:8px; }
.fo9-in input{ font:700 1rem var(--mono); width:5.5em; padding:4px 8px; border:1.4px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); text-transform:uppercase; }
.fo9-in input[type=range]{ width:150px; padding:0; accent-color:var(--k-os); }
.fo9-out{ text-align:center; font-weight:700; margin:6px 0 2px; min-height:1.4em; }
.fo9-regs{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; margin:6px 0; }
.fo9-bit{ border:1.4px solid var(--line); border-radius:7px; padding:4px 2px; text-align:center; background:var(--paper); font-size:.8rem; transition:all .35s; }
.fo9-bit b{ display:block; font-family:var(--mono); font-size:1.1rem; }
.fo9-bit.one{ background:color-mix(in srgb, var(--k-os) 20%, var(--paper)); border-color:var(--k-os); }
.fo9-side{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.fo9-lane{ border:1px dashed var(--line); border-radius:8px; padding:6px; }
.fo9-lane h5{ margin:0 0 5px; font-size:.82rem; text-align:center; color:var(--graphite); }
.fo9-spin{ display:inline-block; animation:fo9spin 1s linear infinite; }
@keyframes fo9spin{ to{ transform:rotate(360deg); } }
.fo9-cells{ display:grid; grid-template-columns:repeat(8, minmax(0,1fr)); gap:3px; }
.fo9-cells div{ height:22px; border-radius:4px; border:1px solid var(--line); background:var(--paper); transition:background .25s; }
.fo9-cells div.full{ background:color-mix(in srgb, var(--k-os) 40%, var(--paper)); }
.fo9-cells div.now{ background:var(--s-os); }
.fo9-kv{ display:flex; justify-content:center; gap:14px; flex-wrap:wrap; font-weight:700; margin:6px 0; }
.fo9-kv b{ font-family:var(--mono); color:var(--k-os); font-size:1.05rem; }
.fo9-irq{ text-align:center; font-weight:700; color:#fff; background:var(--pen); border-radius:99px; padding:3px 12px; margin:6px auto 0; width:max-content; max-width:100%; }
.fo9-tl{ display:flex; height:26px; border-radius:6px; overflow:hidden; border:1px solid var(--line); }
.fo9-tl i{ display:block; height:100%; }
.fo9-key{ display:flex; flex-wrap:wrap; gap:6px 12px; justify-content:center; font-size:.8rem; color:var(--graphite); margin-top:8px; }
.fo9-key i{ display:inline-block; width:12px; height:10px; border-radius:2px; margin-right:4px; vertical-align:-1px; }
@keyframes fo9in{ from{ opacity:0; transform:scaleY(.3); } to{ opacity:1; transform:none; } }
@media (prefers-reduced-motion: reduce){ .fo9-spin{ animation:none; } }`;
  if (!document.getElementById('fo9-css')) { const s = document.createElement('style'); s.id = 'fo9-css'; s.textContent = CSS; document.head.appendChild(s); }
  const L = t => `<span class="ltr">${t}</span>`;
  const cls = (on, seen, dim) => 'fo9-box' + (on ? ' on' : seen ? ' seen' : '') + (dim ? ' dim' : '');

  /* ── L8 §0: a typical PC bus structure ── */
  function PcBus({ ar }) {
    const steps = [
      { en: '<b>Ports, buses and device controllers</b> connect devices. A <b>port</b> is a connection point for a device; a <b>bus</b> gives shared direct access; a <b>controller (host adapter)</b> is the electronics that operate the port, bus or device.', ar: 'الـ <b>ports والـ buses والـ device controllers</b> هما اللي بيوصّلوا الـ devices. الـ <b>port</b> هو نقطة توصيل للـ device، والـ <b>bus</b> بيدي shared direct access، والـ <b>controller (host adapter)</b> هو الـ electronics اللي بتشغّل الـ port أو الـ bus أو الـ device.', k: -1 },
      { en: 'The <b>processor</b> with its <b>cache</b> connects through the <b>bridge/memory controller</b> to <b>memory</b>.', ar: 'الـ <b>processor</b> ومعاه الـ <b>cache</b> متوصل عن طريق الـ <b>bridge/memory controller</b> بالـ <b>memory</b>.', k: 0 },
      { en: 'The <b>PCI bus</b> (common in PCs and servers) connects the device controllers.', ar: 'الـ <b>PCI bus</b> (منتشر في الـ PCs والـ servers) هو اللي بيوصّل الـ device controllers.', k: 1 },
      { en: 'On the PCI bus: the <b>graphics controller</b> (monitor), the <b>SCSI controller</b> (disks) and the <b>IDE disk controller</b> (disks).', ar: 'على الـ PCI bus فيه: الـ <b>graphics controller</b> (للـ monitor)، والـ <b>SCSI controller</b> (للـ disks)، والـ <b>IDE disk controller</b> (للـ disks).', k: 2 },
      { en: 'The <b>expansion bus interface</b> leads to the <b>expansion bus</b>, which connects relatively slow devices: the <b>keyboard</b> and the <b>parallel and serial ports</b>.', ar: 'الـ <b>expansion bus interface</b> بيوصل للـ <b>expansion bus</b>، وده بيوصّل الـ devices البطيئة نسبيًا: الـ <b>keyboard</b> والـ <b>parallel والـ serial ports</b>.', k: 3 },
      { en: 'A controller contains a processor, microcode, private memory, a bus controller and so on; it is sometimes integrated and sometimes a separate circuit board.', ar: 'الـ controller جواه processor و microcode و private memory و bus controller وغيرهم؛ وساعات بيبقى integrated وساعات بيبقى circuit board لوحده.', k: 4 }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const k = steps[i].k, a = k === -1 || k === 4;
    const box = (t, sub, kk) => html`<div className=${cls(k === kk, a || k > kk, false)}>${t}${sub && html`<small>${sub}</small>`}</div>`;
    return html`<figure className="fig fo9"><div className="fig-stage"><div className="fo9-wrap" role="img" aria-label="A typical PC bus structure">
      <div className="fo9-row" style=${{ gridTemplateColumns: '1fr 1fr 1fr' }}>${box('processor', 'cache', 0)}${box('bridge / memory controller', null, 0)}${box('memory', null, 0)}</div>
      <div className="fo9-v">↕</div>
      <div className=${'fo9-bus' + (k === 1 ? ' on' : '')}>PCI bus</div>
      <div className="fo9-v">↕</div>
      <div className="fo9-row" style=${{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
        ${box('graphics controller', 'monitor', 2)}${box('SCSI controller', 'disks', 2)}${box('IDE disk controller', 'disks', 2)}${box('expansion bus interface', null, 3)}</div>
      <div className="fo9-v">↕</div>
      <div className=${'fo9-bus' + (k === 3 ? ' on' : '') + (!a && k < 3 ? ' dim' : '')}>expansion bus</div>
      <div className="fo9-v">↕</div>
      <div className="fo9-row" style=${{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>${box('keyboard', null, 3)}${box('parallel port', null, 3)}${box('serial port', null, 3)}</div>
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L8 §1: PC I/O port addresses (partial) ── */
  const PORTS = [[0x000, 0x00F, 'DMA controller'], [0x020, 0x021, 'interrupt controller'], [0x040, 0x043, 'timer'], [0x200, 0x20F, 'game controller'], [0x2F8, 0x2FF, 'serial port (secondary)'], [0x320, 0x32F, 'hard-disk controller'], [0x378, 0x37F, 'parallel port'], [0x3D0, 0x3DF, 'graphics controller'], [0x3F0, 0x3F7, 'diskette-drive controller'], [0x3F8, 0x3FF, 'serial port (primary)']];
  const hx = n => n.toString(16).toUpperCase().padStart(3, '0');
  function PortMap({ ar }) {
    const [v, setV] = useState('3F8');
    const n = /^[0-9A-Fa-f]{1,3}$/.test(v) ? parseInt(v, 16) : NaN, hit = PORTS.findIndex(p => n >= p[0] && n <= p[1]);
    const res = isNaN(n) ? { en: 'Type a hexadecimal address from 000 to 3FF.', ar: 'اكتب address بالـ hexadecimal من 000 لـ 3FF.' }
      : hit >= 0 ? { en: `Address <b>${hx(n)}</b> belongs to the <b>${PORTS[hit][2]}</b> (range ${hx(PORTS[hit][0])}–${hx(PORTS[hit][1])}).`, ar: `الـ address ده (<b>${hx(n)}</b>) تبع الـ <b>${PORTS[hit][2]}</b>، والـ range بتاعه ${L(hx(PORTS[hit][0]) + '–' + hx(PORTS[hit][1]))}` }
      : { en: `Address <b>${hx(n)}</b> is not in this partial table.`, ar: `الـ address ده (<b>${hx(n)}</b>) مش موجود في الجدول الجزئي ده.` };
    const cap = { en: 'Devices have <b>addresses</b>, used by direct I/O instructions or by <b>memory-mapped I/O</b>. These are some of the <b>PC I/O port</b> ranges. ' + res.en, ar: 'الـ devices ليها <b>addresses</b>، بتستخدمها الـ direct I/O instructions أو الـ <b>memory-mapped I/O</b>. دي بعض الـ ranges بتاعة الـ <b>PC I/O ports</b>.<br>' + res.ar };
    return html`<figure className="fig fo9"><div className="fig-stage"><div className="fo9-wrap">
      <div className="fo9-in"><label for="fo9-port">I/O address (hex)</label><input id="fo9-port" value=${v} maxLength="3" onInput=${e => setV(e.target.value.trim())} aria-label="I/O port address in hexadecimal" /></div>
      <div className="fo9-tbl" role="table" aria-label="PC I/O port addresses (partial)">
        ${PORTS.map((p, j) => [html`<span key=${'a' + j} className=${'mono' + (j === hit ? ' hit' : '')}>${hx(p[0])}–${hx(p[1])}</span>`, html`<span key=${'b' + j} className=${j === hit ? 'hit' : ''} style=${{ cursor: 'pointer' }} onClick=${() => setV(hx(p[0]))}>${p[2]}</span>`])}
      </div></div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L8 §1: polling (handshaking) for one byte ── */
  function Polling({ ar }) {
    const [slow, setSlow] = useState(false);
    const steps = [
      { en: '<b>Polling</b> for each byte. The device controller has a <b>status register</b> (busy, command-ready, error bits) and a <b>data-out</b> register. The host wants to write one byte.', ar: 'الـ <b>Polling</b> لكل byte. الـ device controller فيه <b>status register</b> (فيه الـ bits دي: busy و command-ready و error) و register اسمه <b>data-out</b>. الـ host عايز يكتب byte واحد.', r: [0, 0, 0], d: '', who: 0 },
      { en: '(1) The host reads the <b>busy</b> bit from the status register <b>until it is 0</b>.', ar: '(1) الـ host بيقرا الـ <b>busy</b> bit من الـ status register <b>لحد ما يبقى 0</b>.', r: [slow ? 1 : 0, 0, 0], d: '', who: 1, spin: 1 },
      { en: '(2) The host sets the <b>write</b> bit and copies the data into <b>data-out</b>.', ar: '(2) الـ host بيحط الـ <b>write</b> bit، وبينسخ الـ data في الـ <b>data-out</b>.', r: [0, 0, 0], d: 'byte', who: 1 },
      { en: '(3) The host sets <b>command-ready</b>.', ar: '(3) الـ host بيحط الـ <b>command-ready</b>.', r: [0, 1, 0], d: 'byte', who: 1 },
      { en: '(4) The controller sets <b>busy</b> and executes the transfer.', ar: '(4) الـ controller بيحط الـ <b>busy</b> وبينفذ الـ transfer.', r: [1, 1, 0], d: 'byte', who: 2 },
      { en: '(5) When the transfer is done, the controller clears <b>busy</b>, <b>error</b> and <b>command-ready</b>.', ar: '(5) لما الـ transfer يخلص، الـ controller بيمسح الـ <b>busy</b> والـ <b>error</b> والـ <b>command-ready</b>.', r: [0, 0, 0], d: '', who: 2 },
      { en: slow ? 'Step 1 is a <b>busy-wait</b> cycle. With a <b>slow device</b> it is <b>inefficient</b>: the CPU keeps reading the busy bit when it could switch to other tasks.' : 'Step 1 is a <b>busy-wait</b> cycle. With a <b>fast device</b> it is <b>reasonable</b>: the busy bit clears quickly. Try the slow device.', ar: slow ? 'الخطوة 1 دي <b>busy-wait</b> cycle. ومع <b>device بطيء</b> بتبقى <b>مش كفء</b>: الـ CPU فاضل يقرا الـ busy bit وهو كان ممكن يشتغل على tasks تانية.' : 'الخطوة 1 دي <b>busy-wait</b> cycle. ومع <b>device سريع</b> بتبقى <b>معقولة</b>: الـ busy bit بيتمسح بسرعة. جرّب الـ device البطيء.', r: [0, 0, 0], d: '', who: 0 }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const [reads, setReads] = useState(0);
    useEffect(() => { setReads(0); if (i !== 1 || calm()) return; const t = setInterval(() => setReads(x => x + 1), 260); return () => clearInterval(t); }, [i, slow]);
    const s = steps[i], B = ['busy', 'command-ready', 'error'];
    const pick = m => { setSlow(m); ctl.go(0); };
    return html`<figure className="fig fo9"><div className="fig-stage"><div className="fo9-wrap">
      <div className="fo9-chips">${[[false, 'Fast device'], [true, 'Slow device']].map(([m, t]) => html`<button key=${t} className="fo9-chip" aria-pressed=${String(slow === m)} onClick=${() => pick(m)}>${t}</button>`)}</div>
      <div className="fo9-side">
        <div className="fo9-lane"><h5>host (CPU)</h5><div className=${cls(s.who === 1, false, s.who === 2)}>${s.spin ? html`<span><span className=${calm() ? '' : 'fo9-spin'}>↻</span> read busy bit${!calm() ? ` ×${slow ? reads : Math.min(reads, 1)}` : ''}</span>` : i === 2 ? 'set write, copy data' : i === 3 ? 'set command-ready' : 'host'}</div></div>
        <div className="fo9-lane"><h5>device controller</h5><div className=${cls(s.who === 2, false, s.who === 1)}>${i === 4 ? 'execute transfer' : i === 5 ? 'clear the bits' : 'controller'}</div></div>
      </div>
      <p style=${{ margin: '8px 0 2px', textAlign: 'center', fontWeight: 700 }}>status register</p>
      <div className="fo9-regs">${B.map((b, j) => html`<div key=${b} className=${'fo9-bit' + (s.r[j] ? ' one' : '')}>${b}<b>${s.r[j]}</b></div>`)}</div>
      <div className="fo9-kv"><span>data-out: <b>${s.d || '–'}</b></span></div>
    </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L8 §2: the interrupt-driven I/O cycle ── */
  function IrqCycle({ ar }) {
    const steps = [
      { en: 'Sometimes it is more efficient for the controller to <b>notify the CPU</b> when the device is ready. This is the <b>interrupt-driven I/O cycle</b>.', ar: 'ساعات بيبقى أكفأ إن الـ controller <b>يبلّغ الـ CPU</b> لما الـ device يبقى جاهز. ده الـ <b>interrupt-driven I/O cycle</b>.', c: 0, d: 0 },
      { en: '(1) The <b>device driver</b> initiates I/O.', ar: '(1) الـ <b>device driver</b> بيبدأ الـ I/O.', c: 1, d: 0 },
      { en: '(2) The <b>I/O controller</b> initiates I/O. Meanwhile the CPU keeps executing, checking for interrupts between instructions.', ar: '(2) الـ <b>I/O controller</b> بيبدأ الـ I/O. وفي نفس الوقت الـ CPU مكمّل شغل، وبيشيك على الـ interrupts بين كل instruction والتانية.', c: 0, d: 2 },
      { en: '(3) Input ready, output complete or error: the controller <b>generates an interrupt signal</b> on the Interrupt Request Line.', ar: '(3) الـ input جاهز، أو الـ output خلص، أو حصل error: الـ controller <b>بيطلّع interrupt signal</b> على الـ Interrupt Request Line.', c: 0, d: 3, irq: 1 },
      { en: '(4) The CPU, checking between instructions, <b>receives the interrupt</b>, saves its state and transfers control to the <b>interrupt handler</b>.', ar: '(4) الـ CPU، وهو بيشيك بين الـ instructions، <b>بيستقبل الـ interrupt</b>، وبيحفظ الـ state بتاعته، وبينقل التحكم للـ <b>interrupt handler</b>.', c: 4, d: 0, irq: 1 },
      { en: '(5) The handler <b>processes the data</b>, restores the state and returns from interrupt.', ar: '(5) الـ handler <b>بيعالج الـ data</b>، وبيرجّع الـ state، وبيعمل return from interrupt.', c: 5, d: 0 },
      { en: '(6) The CPU <b>resumes the interrupted task</b>. (7) The cycle loops back while the CPU executes.', ar: '(6) الـ CPU <b>بيكمّل الـ task اللي اتقاطعت</b>. (7) والـ cycle بترجع تتكرر والـ CPU شغال.', c: 6, d: 0 }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const s = steps[i];
    const C = [[1, 'device driver initiates I/O'], [4, 'receive interrupt, go to handler'], [5, 'handler processes data, returns'], [6, 'resume interrupted task']];
    const D = [[2, 'initiate I/O'], [3, 'input ready, output complete or error: interrupt signal']];
    return html`<figure className="fig fo9"><div className="fig-stage"><div className="fo9-wrap">
      <div className="fo9-side">
        <div className="fo9-lane"><h5>CPU</h5><div className="fo9-row">${C.map(([n, t]) => html`<div key=${n} className=${cls(s.c === n, i > 0 && (s.c > n || (n === 1 && i > 1)), false)}><small style=${{ color: 'inherit' }}>${n}</small>${t}</div>`)}</div></div>
        <div className="fo9-lane"><h5>I/O controller</h5><div className="fo9-row">${D.map(([n, t]) => html`<div key=${n} className=${cls(s.d === n, i > n - 1 && s.d !== n && i >= n, false)}><small style=${{ color: 'inherit' }}>${n}</small>${t}</div>`)}</div></div>
      </div>
      ${s.irq && html`<div className="fo9-irq">${s.c === 4 ? 'CPU senses the interrupt' : 'interrupt signal →'}</div>`}
      ${i === 2 && html`<p className="fo9-v" style=${{ marginTop: '8px' }}><span className=${calm() ? '' : 'fo9-spin'}>↻</span> CPU executing, checking for interrupts between instructions</p>`}
    </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L8 §2: Intel Pentium event-vector table ── */
  const VEC = ['divide error', 'debug exception', 'null interrupt', 'breakpoint', 'INTO-detected overflow', 'bound range exception', 'invalid opcode', 'device not available', 'double fault', 'coprocessor segment overrun', 'invalid task state segment', 'segment not present', 'stack fault', 'general protection', 'page fault', 'reserved', 'floating-point error', 'alignment check', 'machine check'];
  const vecName = n => n <= 18 ? VEC[n] : n <= 31 ? 'reserved' : 'maskable interrupt';
  function Vectors({ ar }) {
    const [n, setN] = useState(14);
    const cap = { en: `The interrupt handler is found through the <b>Intel Pentium event-vector table</b>. Vector <b>${n}</b>: <b>${vecName(n)}</b>${n >= 19 && n <= 31 ? ' (19–31 are reserved)' : n >= 32 ? ' (32–255 are maskable interrupts)' : ''}. Drag the slider or tap a row.`, ar: `الـ interrupt handler بيتلاقى عن طريق الـ <b>Intel Pentium event-vector table</b>. الـ vector رقم <b>${n}</b> هو الـ <b>${vecName(n)}</b>${n >= 19 && n <= 31 ? '، والأرقام من 19 لـ 31 كلها reserved' : n >= 32 ? '، والأرقام من 32 لـ 255 كلها maskable interrupts' : ''}. حرّك الـ slider أو دوس على سطر.` };
    const rows = [...VEC.map((t, j) => [String(j), t, j === n]), ['19–31', 'reserved', n >= 19 && n <= 31], ['32–255', 'maskable interrupts', n >= 32]];
    return html`<figure className="fig fo9"><div className="fig-stage"><div className="fo9-wrap">
      <div className="fo9-in"><label for="fo9-vec">vector</label><input id="fo9-vec" type="range" min="0" max="255" value=${n} onInput=${e => setN(+e.target.value)} /><b style=${{ fontFamily: 'var(--mono)', minWidth: '2.5em' }}>${n}</b></div>
      <div className="fo9-tbl" role="table" aria-label="Intel Pentium event-vector table">
        ${rows.map(([a, t, on], j) => [html`<span key=${'a' + j} className=${'mono' + (on ? ' hit' : '')} style=${{ cursor: 'pointer' }} onClick=${() => setN(parseInt(a, 10))}>${a}</span>`, html`<span key=${'b' + j} className=${on ? 'hit' : ''}>${t}</span>`])}
      </div></div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L8 §3: the six-step DMA transfer ── */
  function DmaSix({ ar }) {
    const [C0, setC0] = useState(8), [k, setK] = useState(-1), [run, setRun] = useState(false);
    useEffect(() => { if (!run) return; if (k >= C0 + 3) { setRun(false); return; } const t = setTimeout(() => setK(x => x + 1), calm() ? 120 : k < 2 ? 1300 : 420); return () => clearTimeout(t); }, [run, k, C0]);
    const moved = Math.max(0, Math.min(C0, k - 2)), C = C0 - moved, done = k >= C0 + 2;
    const step = k < 0 ? 0 : k === 0 ? 1 : k === 1 ? 2 : k === 2 ? 3 : !done ? 5 : 6;
    const T = [
      ['', ''],
      ['(1) The device driver is told to transfer disk data to a buffer at address <b>X</b>.', '(1) الـ device driver بيتقاله ينقل data من الـ disk لـ buffer عند الـ address <b>X</b>.'],
      [`(2) The device driver tells the disk controller to transfer <b>C = ${C0}</b> bytes from disk to the buffer at address X.`, `(2) الـ device driver بيقول للـ disk controller ينقل <b>C = ${C0}</b> bytes من الـ disk للـ buffer اللي عند X.`],
      ['(3) The disk controller initiates the DMA transfer.', '(3) الـ disk controller بيبدأ الـ DMA transfer.'],
      ['', ''],
      [`(4) The disk controller sends each byte to the DMA controller. (5) The DMA controller transfers the bytes to buffer X, <b>increasing the memory address</b> and <b>decreasing C</b>: now C = ${C}.`, `(4) الـ disk controller بيبعت كل byte للـ DMA controller. (5) والـ DMA controller بينقل الـ bytes للـ buffer X، و<b>بيزوّد الـ memory address</b> و<b>بينقّص C</b>، فبقت C = ${C}.`],
      ['(6) <b>C = 0</b>: the DMA controller <b>interrupts the CPU</b> to signal transfer completion. One interrupt for the whole block.', '(6) لما <b>C = 0</b>، الـ DMA controller <b>بيعمل interrupt للـ CPU</b> عشان يقوله إن الـ transfer خلص. يعني interrupt واحد للـ block كله.']
    ];
    const cap = step === 0 ? { en: '<b>DMA</b> bypasses the CPU to move data directly between the I/O device and memory. Pick C and press Transfer to run the <b>six-step process</b>.', ar: 'الـ <b>DMA</b> بيعدّي الـ CPU وينقل الـ data على طول بين الـ I/O device والـ memory. اختار C ودوس Transfer عشان تشوف الـ <b>six-step process</b>.' } : { en: T[step][0], ar: T[step][1] };
    const box = (t, n) => html`<div className=${cls(step === n || (n === 45 && step === 5), false, false)}>${t}</div>`;
    return html`<figure className="fig fo9"><div className="fig-stage"><div className="fo9-wrap">
      <div className="fo9-in"><label for="fo9-c">C (bytes)</label><input id="fo9-c" type="range" min="4" max="16" step="4" value=${C0} disabled=${run} onInput=${e => { setC0(+e.target.value); setK(-1); }} /><b style=${{ fontFamily: 'var(--mono)' }}>${C0}</b></div>
      <div className="fo9-row" style=${{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))' }}>${box('device driver', 1)}${box('disk controller', 3)}${box('DMA controller', 45)}</div>
      <div className="fo9-kv"><span>address: <b>X${moved ? ' + ' + moved : ''}</b></span><span>C = <b>${k < 1 ? '–' : C}</b></span></div>
      <p style=${{ margin: '0 0 3px', fontWeight: 700, textAlign: 'center' }}>buffer at X (memory)</p>
      <div className="fo9-cells" style=${{ gridTemplateColumns: `repeat(${Math.min(C0, 8)}, minmax(0,1fr))` }}>${Array.from({ length: C0 }, (_, j) => html`<div key=${j} className=${j < moved - 1 || (done && j < moved) ? 'full' : j === moved - 1 ? 'now' : ''}></div>`)}</div>
      ${done && html`<div className="fo9-irq">interrupt → CPU (transfer complete)</div>`}
    </div></div><${Cap} ...${cap} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn solid" disabled=${run} onClick=${() => { setK(0); setRun(true); }}>▶ Transfer</button></div></figure>`;
  }

  /* ── L8 §4: kernel I/O structure ── */
  const DRV = ['SCSI', 'keyboard', 'mouse', 'PCI bus', 'floppy', 'ATAPI'];
  function KernelIo({ ar }) {
    const [d, setD] = useState(1);
    const lit = j => d >= 0 ? true : false;
    const cap = { en: `<b>Kernel I/O structure</b>: a request from the kernel goes through the <b>kernel I/O subsystem</b>, then the <b>${DRV[d]} device driver</b>, then its <b>device controller</b>, and reaches the <b>device</b>. The device-driver layer hides the differences among I/O controllers from the kernel. Tap another driver.`, ar: `الـ <b>Kernel I/O structure</b>: الـ request بتطلع من الـ kernel وتعدّي على الـ <b>kernel I/O subsystem</b>، وبعدين على الـ <b>${DRV[d]} device driver</b>، وبعدين الـ <b>device controller</b> بتاعه، لحد ما توصل للـ <b>device</b>. وطبقة الـ device drivers بتخبّي الاختلافات بين الـ I/O controllers عن الـ kernel. دوس على driver تاني.` };
    return html`<figure className="fig fo9"><div className="fig-stage"><div className="fo9-wrap" role="img" aria-label="Kernel I/O structure layers">
      <div className="fo9-box on">kernel</div><div className="fo9-v">↓</div>
      <div className="fo9-box on">kernel I/O subsystem</div><div className="fo9-v">↓</div>
      <p style=${{ margin: '0 0 4px', textAlign: 'center', color: 'var(--graphite)' }}>device drivers</p>
      <div className="fo9-chips" style=${{ margin: 0 }}>${DRV.map((t, j) => html`<button key=${t} className="fo9-chip" aria-pressed=${String(j === d)} onClick=${() => setD(j)}>${t}</button>`)}</div>
      <div className="fo9-v">↓</div>
      <div className=${cls(lit(), false, false)}>${DRV[d]} device controller</div><div className="fo9-v">↓</div>
      <div className=${cls(lit(), false, false)}>${DRV[d]} device</div>
    </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L8 §4: block and character devices ── */
  const DEV = [['disk drive', 'block', 'read, write, seek'], ['keyboard', 'character', 'get(), put()'], ['mouse', 'character', 'get(), put()'], ['serial port', 'character', 'get(), put()']];
  function BlockChar({ ar }) {
    const [d, setD] = useState(0);
    const [n, kind, cmds] = DEV[d], blk = kind === 'block';
    const cap = blk
      ? { en: 'A <b>disk drive</b> is a <b>block device</b>: commands <b>read, write, seek</b>; access can be raw I/O, direct I/O or through the file system; memory-mapped file access is possible (the file is mapped to virtual memory and clusters come in by demand paging); DMA.', ar: 'الـ <b>disk drive</b> ده <b>block device</b>: الـ commands بتاعته هي الـ read والـ write والـ seek. الـ access ممكن يبقى raw I/O أو direct I/O أو عن طريق الـ file system. وينفع كمان memory-mapped file access (الـ file بيتعمله map على الـ virtual memory، والـ clusters بتيجي بالـ demand paging)، وفيه DMA.' }
      : { en: `A <b>${n}</b> is a <b>character device</b>: commands <b>get()</b> and <b>put()</b>; libraries layered on top allow <b>line editing</b>.`, ar: `الـ <b>${n}</b> ده <b>character device</b>: الـ commands بتاعته هي الـ <b>get()</b> والـ <b>put()</b>، وفيه libraries فوقيه بتسمح بالـ <b>line editing</b>.` };
    return html`<figure className="fig fo9"><div className="fig-stage"><div className="fo9-wrap">
      <div className="fo9-chips">${DEV.map((x, j) => html`<button key=${x[0]} className="fo9-chip" aria-pressed=${String(j === d)} onClick=${() => setD(j)}>${x[0]}</button>`)}</div>
      <div className="fo9-side" style=${{ marginTop: '6px' }}>
        <div className=${cls(blk, false, !blk)}>block device<small>read, write, seek</small></div>
        <div className=${cls(!blk, false, blk)}>character device<small>get(), put()</small></div>
      </div>
      <div className="fo9-out">${n}: ${kind} device · ${cmds}</div>
      <div className=${blk ? 'fo9-cells' : 'fo9-cells'} style=${{ gridTemplateColumns: blk ? 'repeat(4, minmax(0,1fr))' : 'repeat(8, minmax(0,1fr))', marginTop: '6px' }} aria-hidden="true">${Array.from({ length: blk ? 4 : 8 }, (_, j) => html`<div key=${d + '-' + j} className="full" style=${{ height: blk ? '30px' : '16px', opacity: calm() ? 1 : undefined, animation: calm() ? 'none' : `fo9in .35s ${j * 0.12}s both` }}></div>`)}</div>
      <p className="fo9-v" style=${{ fontSize: '.8rem', marginTop: '5px' }}>${blk ? 'data moves in blocks' : 'data moves as a stream of characters'}</p>
    </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L8 §5: the overheads of servicing interrupts ── */
  function IsrCost({ ar }) {
    const [big, setBig] = useState(false);
    const steps = [
      { en: 'The process is <b>running</b>.', ar: 'الـ process <b>شغالة</b>.', k: 0 },
      { en: 'An interrupt occurs: the process is interrupted and its <b>state is stored in its PCB</b>.', ar: 'حصل interrupt: الـ process بتتقاطع، والـ <b>state بتاعتها بتتحفظ في الـ PCB</b> بتاعها.', k: 1 },
      { en: 'The <b>interrupt service routine (ISR)</b> runs to deal with the interrupt.', ar: 'الـ <b>interrupt service routine (ISR)</b> بتشتغل عشان تتعامل مع الـ interrupt.', k: 2 },
      { en: 'On completion, the <b>state is restored</b> and the process <b>resumes</b>.', ar: 'لما تخلص، الـ <b>state بتترجع</b> والـ process <b>بتكمّل</b>.', k: 3 },
      { en: big ? '<b>Large transfers</b>: fewer interrupts, so less time goes to saving and restoring state and running the ISR. Reducing interrupts (large transfers, smart controllers, polling, DMA) improves performance.' : 'With <b>many small transfers</b>, every interrupt adds its save, ISR and restore overhead (and the context switches involved). Try large transfers.', ar: big ? 'الـ <b>transfers الكبيرة</b>: interrupts أقل، يعني وقت أقل في حفظ الـ state ورجوعها وتشغيل الـ ISR. وتقليل الـ interrupts (بالـ transfers الكبيرة والـ smart controllers والـ polling والـ DMA) بيحسّن الـ performance.' : 'مع <b>transfers صغيرة كتير</b>، كل interrupt بيزوّد overhead الحفظ والـ ISR والرجوع (والـ context switches اللي معاهم). جرّب الـ transfers الكبيرة.', k: 4 }
    ];
    const [i, ctl] = useSteps(steps.length, 2400);
    const s = steps[i], n = big ? 1 : 4;
    const seg = [];
    if (s.k < 4) { seg.push(['run', 3]); if (s.k >= 1) seg.push(['save', 1]); if (s.k >= 2) seg.push(['isr', 2]); if (s.k >= 3) { seg.push(['restore', 1]); seg.push(['run', 3]); } }
    else for (let j = 0; j < n; j++) seg.push(['run', big ? 12 : 3], ['save', 1], ['isr', 2], ['restore', 1]);
    const col = { run: 'color-mix(in srgb, var(--k-os) 45%, var(--paper))', save: 'var(--pen)', isr: 'var(--graphite)', restore: 'color-mix(in srgb, var(--pen) 55%, var(--paper))' };
    const tot = seg.reduce((a, x) => a + x[1], 0);
    const pick = m => { setBig(m); ctl.go(4); };
    return html`<figure className="fig fo9"><div className="fig-stage"><div className="fo9-wrap">
      ${i === 4 && html`<div className="fo9-chips">${[[false, 'Many small transfers'], [true, 'Large transfers']].map(([m, t]) => html`<button key=${t} className="fo9-chip" aria-pressed=${String(big === m)} onClick=${() => pick(m)}>${t}</button>`)}</div>`}
      <p style=${{ margin: '4px 0', textAlign: 'center', fontWeight: 700 }}>CPU time (schematic)${i === 4 ? ` · ${n} interrupt${n > 1 ? 's' : ''}` : ''}</p>
      <div className="fo9-tl" role="img" aria-label="Timeline of running, saving state, ISR and restoring state">${seg.map(([t, w], j) => html`<i key=${j} title=${t} style=${{ width: (w / tot * 100) + '%', background: col[t] }}></i>`)}</div>
      <div className="fo9-key">${[['run', 'process runs'], ['save', 'save state to PCB'], ['isr', 'ISR'], ['restore', 'restore state']].map(([k2, t]) => html`<span key=${k2}><i style=${{ background: col[k2] }}></i>${t}</span>`)}</div>
    </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'os-io-pc-bus': PcBus, 'os-io-port-map': PortMap, 'os-io-polling': Polling, 'os-io-irq-cycle': IrqCycle, 'os-io-vectors': Vectors, 'os-io-dma-six': DmaSix, 'os-io-kernel': KernelIo, 'os-io-block-char': BlockChar, 'os-io-isr-cost': IsrCost });
})();

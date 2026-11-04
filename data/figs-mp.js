// Visuals for the Microprocessors & Assembly Language notes (names 'mp-…'), built on figs.js (window.FIGKIT).
// Every label and caption comes from the doctor's slides and the site's notes. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('fmp-accent')) { const s = document.createElement('style'); s.id = 'fmp-accent'; s.textContent = '[data-fig^="mp-"]{ --fig-k: var(--k-hci); --fig-s: var(--s-hci); }'; document.head.appendChild(s); } })();
/* ── part L3 ── */
// Microprocessors visuals, Lecture 3 (Addressing modes 1: register, immediate, direct, displacement): the four modes side by side, a MOV rule checker, the segment-register detour, immediate data in a register, direct vs displacement, segment × 10H + offset, the slides' two memory figures, segment overriding and the Lab 3 emu8086 programs. Every label and number comes from the site's notes (slides Lec_03).
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop } = window.FIGKIT;
  const CSS = `
.mpv3 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mpv3-code{ font:700 1rem/1.4 var(--mono); text-align:center; padding:8px 10px; border-radius:8px; background:var(--paper); border:1px solid var(--line); color:var(--ink); margin:0 auto 10px; max-width:420px; overflow-wrap:anywhere; }
.mpv3-hs{ color:var(--fig-k); text-decoration:underline; text-underline-offset:3px; } .mpv3-hd{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); border-radius:4px; padding:0 2px; }
.mpv3-hp{ color:var(--fig-k); }
.mpv3-ov{ display:grid; grid-template-columns:minmax(0,1fr) 30px 92px; gap:6px; align-items:center; max-width:420px; margin:0 auto; }
.mpv3-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; text-align:center; transition:opacity .4s, box-shadow .4s, background .4s; }
.mpv3-card small{ display:block; font-size:.78rem; color:var(--graphite); } .mpv3-card b{ display:block; font:700 .95rem var(--mono); color:var(--ink); }
.mpv3-card.mpv3-src{ box-shadow:0 0 0 2px var(--fig-k); } .mpv3-card.mpv3-dim{ opacity:.4; }
.mpv3-card.mpv3-dst{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); align-self:stretch; display:grid; place-content:center; }
.mpv3-arr{ font-size:1.5rem; line-height:1; text-align:center; color:var(--fig-k); font-weight:700; }
.mpv3-mode{ text-align:center; font-weight:700; margin:10px 0 0; color:var(--ink); }
.mpv3-in{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; margin:0 0 10px; font-size:.86rem; color:var(--ink); }
.mpv3-in input, .mpv3-in select, .mpv3-in textarea{ font:600 .9rem var(--mono); padding:5px 8px; border:1px solid var(--line); border-radius:7px; background:var(--paper); color:var(--ink); min-width:0; box-sizing:border-box; max-width:100%; }
.mpv3-in input:focus, .mpv3-in select:focus, .mpv3-in textarea:focus{ outline:2px solid var(--fig-k); outline-offset:1px; }
.mpv3-lbl{ font-size:.8rem; color:var(--graphite); width:100%; text-align:center; }
.mpv3-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.mpv3-chip{ font:600 .8rem/1.2 var(--mono); padding:5px 8px; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv3-chip[aria-pressed="true"]{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.mpv3-ops{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; max-width:420px; margin:0 auto 10px; }
.mpv3-op{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:7px 8px; font-size:.82rem; color:var(--ink); }
.mpv3-op small{ display:block; color:var(--graphite); font-size:.78rem; } .mpv3-op b{ display:block; font:700 .95rem var(--mono); overflow-wrap:anywhere; }
.mpv3-wbar{ display:block; height:8px; border-radius:99px; background:var(--paper-2); margin-top:5px; overflow:hidden; } .mpv3-wbar i{ display:block; height:100%; background:var(--fig-k); }
.mpv3-ver{ max-width:420px; margin:0 auto; border-radius:10px; padding:8px 10px; border:2px solid var(--line); font-size:.86rem; color:var(--ink); background:var(--paper); }
.mpv3-ver.mpv3-ok{ border-color:var(--ok); } .mpv3-ver.mpv3-bad{ border-color:var(--pen); } .mpv3-ver.mpv3-nt{ border-color:var(--fig-k); border-style:dashed; }
.mpv3-ver > b{ display:block; } .mpv3-ver.mpv3-ok > b{ color:var(--ok); } .mpv3-ver.mpv3-bad > b{ color:var(--pen); }
.mpv3-ver ul{ margin:4px 0 0; padding-left:18px; } .mpv3-ver li{ margin:2px 0; }
.mpv3-lines{ max-width:420px; margin:0 auto 10px; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 0; font:600 .84rem/1.45 var(--mono); color:var(--ink); }
.mpv3-lines div{ padding:1px 10px; white-space:pre-wrap; overflow-wrap:anywhere; transition:background .3s; }
.mpv3-lines div.mpv3-cmt{ color:var(--graphite); font-weight:500; } .mpv3-lines div.mpv3-cur{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); } .mpv3-lines div.mpv3-done{ opacity:.6; }
.mpv3-lines div.mpv3-bad{ color:var(--pen); } .mpv3-lines div.mpv3-bad.mpv3-cur{ background:color-mix(in srgb, var(--pen) 14%, var(--paper)); }
.mpv3-regs{ display:grid; grid-template-columns:repeat(var(--n, 3), minmax(0,1fr)); gap:6px; max-width:420px; margin:0 auto; align-items:stretch; }
.mpv3-rg{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 4px; text-align:center; min-height:62px; transition:background .4s, box-shadow .4s; }
.mpv3-rg small{ display:block; font:700 .85rem var(--mono); color:var(--ink); } .mpv3-rg b{ display:block; font:700 1.05rem var(--mono); color:var(--ink); } .mpv3-rg span{ display:block; font:.78rem var(--mono); color:var(--graphite); }
.mpv3-rg.mpv3-on{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); box-shadow:0 0 0 2px var(--fig-k); }
.mpv3-tok{ display:inline-block; margin-top:4px; padding:2px 7px; border-radius:99px; font-size:.78rem; font-weight:700; background:var(--fig-s); color:#fff; }
.mpv3-old{ display:inline-block; margin-top:4px; font-size:.78rem; color:var(--graphite); }
.mpv3-x{ text-align:center; color:var(--pen); font-weight:700; margin:0 0 8px; font-size:.9rem; }
.mpv3-lay{ display:flex; max-width:420px; margin:0 auto 8px; border:1px solid var(--line); border-radius:8px; overflow:hidden; background:var(--paper); }
.mpv3-cell{ border-left:1px solid var(--line); padding:5px 2px; text-align:center; min-width:0; } .mpv3-cell:first-child{ border-left:0; }
.mpv3-cell small{ display:block; font-size:.78rem; color:var(--graphite); } .mpv3-cell b{ display:block; font:700 1rem var(--mono); color:var(--faint); letter-spacing:.04em; }
.mpv3-cell.mpv3-on{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); } .mpv3-cell.mpv3-on b{ color:var(--ink); } .mpv3-cell.mpv3-on small{ color:var(--ink); font-weight:700; }
.mpv3-vals{ max-width:420px; margin:0 auto; display:grid; grid-template-columns:auto minmax(0,1fr); gap:3px 10px; font-size:.86rem; color:var(--ink); }
.mpv3-vals span{ color:var(--graphite); } .mpv3-vals b{ font-family:var(--mono); overflow-wrap:anywhere; }
.mpv3-pick{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:5px; max-width:300px; margin:0 auto 10px; }
.mpv3-pick button{ font:700 .86rem var(--mono); padding:5px 0; border-radius:7px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv3-pick button.mpv3-d{ border-color:color-mix(in srgb, var(--fig-k) 60%, var(--line)); }
.mpv3-pick button[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mpv3-dd{ display:grid; grid-template-columns:minmax(0,1fr) 40px minmax(0,1fr); gap:6px; align-items:center; max-width:420px; margin:0 auto; }
.mpv3-sum{ display:grid; gap:2px; justify-content:center; font:700 1rem var(--mono); color:var(--ink); margin:0 auto; }
.mpv3-sum > div{ display:grid; grid-template-columns:96px repeat(var(--c), 24px); align-items:center; }
.mpv3-sum span{ text-align:center; } .mpv3-sum .mpv3-l{ text-align:right; white-space:nowrap; padding-right:8px; font:600 .82rem var(--body); color:var(--graphite); }
.mpv3-sum .mpv3-cy{ font-size:.78rem; color:var(--fig-k); } .mpv3-sum .mpv3-new{ color:var(--fig-k); } .mpv3-sum .mpv3-tot{ border-top:2px solid var(--ink); padding-top:2px; } .mpv3-sum .mpv3-tot span:not(.mpv3-l){ color:var(--fig-k); }
.mpv3-err{ text-align:center; color:var(--pen); font-size:.86rem; margin:6px 0 0; }
.mpv3-calc{ text-align:center; font:600 .86rem/1.5 var(--mono); color:var(--ink); margin:8px auto 0; max-width:420px; overflow-wrap:anywhere; }
.mpv3-segs{ display:flex; gap:8px; justify-content:center; align-items:stretch; flex-wrap:wrap; margin:0 auto 8px; }
.mpv3-segs .mpv3-card{ min-width:84px; } .mpv3-card.mpv3-off{ opacity:.45; text-decoration:line-through; }
.mpv3-fig svg text{ font-family:var(--mono); }
.mpv3-fig .mpv3-ln{ stroke:var(--ink); stroke-width:1.5; fill:none; } .mpv3-fig .mpv3-cl{ fill:var(--paper); stroke:var(--ink); stroke-width:1.2; }
.mpv3-fig .mpv3-hi{ fill:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); } .mpv3-fig .mpv3-aw{ stroke:var(--fig-k); stroke-width:2.2; fill:none; }
@media (max-width:380px){ .mpv3-sum > div{ grid-template-columns:84px repeat(var(--c), 22px); } }`;
  if (!document.getElementById('mpv3-css')) { const s = document.createElement('style'); s.id = 'mpv3-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* shared: registers, numbers, small text helpers */
  const R32 = ['EAX', 'EBX', 'ECX', 'EDX', 'ESI', 'EDI', 'ESP', 'EBP'], R16 = ['AX', 'BX', 'CX', 'DX', 'SI', 'DI', 'SP', 'BP'], R8 = ['AL', 'AH', 'BL', 'BH', 'CL', 'CH', 'DL', 'DH'], SEG = ['CS', 'DS', 'ES', 'SS'];
  const width = r => R32.includes(r) ? 32 : R16.includes(r) ? 16 : R8.includes(r) ? 8 : SEG.includes(r) ? 16 : 0;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const bdi = s => `<bdi dir="ltr">${esc(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const ltr = s => `<span class="ltr">${esc(s)}</span>`;
  const hx = (v, d) => v.toString(16).toUpperCase().padStart(d, '0');
  // course number suffixes: H = hexadecimal, B = binary, none = decimal
  function num(t) {
    t = String(t).trim().toUpperCase(); let m;
    if ((m = /^([0-9][0-9A-F]*)H$/.exec(t))) return { v: parseInt(m[1], 16), base: 'hex' };
    if ((m = /^([01]+)B$/.exec(t))) return { v: parseInt(m[1], 2), base: 'bin' };
    if (/^[0-9]+$/.test(t)) return { v: parseInt(t, 10), base: 'dec' };
    return null;
  }

  /* ── 0.0-0.1: one MOV, four places the source can be ── */
  function ModesOverview({ ar }) {
    const steps = [
      { src: -1, dst: 'dest', ins: ['MOV ', 'dest', ', ', 'src'], name: 'MOV destination, source',
        en: 'All four modes of this lecture use the same instruction, <code>MOV destination, source</code>: it copies the source into the destination. Only <b>where the source data is</b> changes.',
        ar: 'الـ modes الأربعة في المحاضرة دي بيستخدموا نفس الـ instruction وهي ' + bdi('MOV dest, src') + '، وبتنسخ الـ source في الـ destination. اللي بيتغيّر بس هو <b>الداتا بتاعة الـ source موجودة فين</b>.' },
      { src: 0, dst: 'AX', ins: ['MOV ', 'AX', ', ', 'BX'], name: 'Register addressing',
        en: '<b>Register addressing</b>, <code>MOV AX, BX</code>: the source is another register (BX), so the data moves between registers inside the CPU.',
        ar: 'في الـ <b>Register addressing</b> زي ' + bdi('MOV AX, BX') + ' الـ source هو register تاني (BX)، فالداتا بتتنقل بين registers جوه الـ CPU.' },
      { src: 1, dst: 'AX', ins: ['MOV ', 'AX', ', ', '0005H'], name: 'Immediate addressing',
        en: '<b>Immediate addressing</b>, <code>MOV AX, 0005H</code>: the source is a constant written in the instruction itself (immediate data).',
        ar: 'في الـ <b>Immediate addressing</b> زي ' + bdi('MOV AX, 0005H') + ' الـ source رقم ثابت مكتوب جوه الـ instruction نفسها (immediate data).' },
      { src: 2, dst: 'AL', ins: ['MOV ', 'AL', ', ', '[123H]'], name: 'Direct addressing',
        en: '<b>Direct addressing</b>, <code>MOV AL, [123H]</code>: the source is the memory location at offset 123H in the data segment (DS), and the register is AL, AX or EAX.',
        ar: 'في الـ <b>Direct addressing</b> زي ' + bdi('MOV AL, [123H]') + ' الـ source هو الـ memory location اللي عند الـ offset ' + bdi('123H') + ' في الـ data segment (DS)، والـ register يا AL يا AX يا EAX.' },
      { src: 2, dst: 'CL', ins: ['MOV ', 'CL', ', ', '[123H]'], name: 'Displacement addressing',
        en: '<b>Displacement addressing</b>, <code>MOV CL, [123H]</code>: the same memory location, but with any other register (here CL).',
        ar: 'في الـ <b>Displacement addressing</b> زي ' + bdi('MOV CL, [123H]') + ' نفس الـ memory location، بس مع أي register تاني (هنا CL).' },
      { src: -1, dst: 'register', ins: ['MOV ', 'reg', ', ', '[BX]'], name: 'Next: Lecture 4',
        en: 'Lecture 4 adds register indirect, indexed, base plus index and base plus index plus displacement addressing: there the address comes from registers.',
        ar: 'وفي Lecture 4 هنشوف الـ register indirect والـ indexed والـ base plus index والـ base plus index plus displacement، ودول الـ address فيهم جاي من registers.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    const SRC = [['Register', 'BX'], ['Instruction', '0005H'], ['Memory (DS)', '[123H]']];
    return html`<figure className="fig mpv3"><div className="fig-stage">
      <div className="mpv3-code">${s.ins.map((p, k) => html`<span key=${k} className=${s.src >= 0 && k === 3 ? 'mpv3-hs' : s.src >= 0 && k === 1 ? 'mpv3-hd' : ''}>${p}</span>`)}</div>
      <div className="mpv3-ov">
        ${SRC.map(([l, v], k) => html`<div key=${k} className=${'mpv3-card' + (s.src === k ? ' mpv3-src' : s.src >= 0 ? ' mpv3-dim' : '')} style=${{ gridColumn: 1, gridRow: k + 1 }}><small>${l}</small><b>${v}</b></div>`)}
        ${s.src >= 0 && html`<div className="mpv3-arr" style=${{ gridColumn: 2, gridRow: s.src + 1 }} aria-hidden="true">→</div>`}
        <div className="mpv3-card mpv3-dst" style=${{ gridColumn: 3, gridRow: '1 / 4' }}><small>Destination</small><b>${s.dst}</b></div>
      </div>
      <p className="mpv3-mode">${s.name}</p></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 1.0-1.6 (and 6.1): is this MOV legal? the five restrictions checked ── */
  function opnd(raw) {
    const t = raw.trim().toUpperCase().replace(/\s+/g, '');
    if (!t) return { k: 'unk', t: '' };
    const w = width(t);
    if (w) return { k: SEG.includes(t) ? 'seg' : 'reg', n: t, w };
    let m = /^(?:(CS|DS|ES|SS):)?\[([^\]]*)\]$/.exec(t);
    if (m) {
      const parts = m[2].split('+'), regs = parts.filter(p => width(p) && !SEG.includes(p));
      const bad = !m[2] || parts.some(p => !(regs.includes(p) || num(p)));
      const badReg = regs.filter(r => !['BX', 'BP', 'SI', 'DI'].includes(r) && !R32.includes(r));
      const def = regs.some(r => r === 'BP' || r === 'EBP') ? 'SS' : 'DS';
      return { k: 'mem', seg: m[1] || def, ovr: !!m[1], def, inner: m[2], regs, bad, badReg, n: (m[1] ? m[1] + ':' : '') + '[' + m[2] + ']' };
    }
    m = /^(CS|DS|ES|SS):(.+)$/.exec(t);
    if (m) return { k: 'nobr', seg: m[1], rest: m[2], n: t };
    const v = num(t);
    if (v) return Object.assign({ k: 'imm', n: raw.trim() }, v);
    return { k: 'unk', t: raw.trim() };
  }
  function checkMov(ins) {
    const m = /^\s*MOV\s+([^,]*?)\s*,\s*(.*?)\s*$/i.exec(ins);
    if (!m) return { ok: false, errs: [{ en: 'Write it as <code>MOV destination, source</code>: two operands separated by a comma.', ar: 'اكتبها بالشكل ده ' + bdi('MOV dest, src') + '، يعني 2 operands بينهم comma.' }] };
    const d = opnd(m[1]), s = opnd(m[2]), E = [], add = (en, a) => E.push({ en, ar: a });
    const isR = o => o.k === 'reg' || o.k === 'seg';
    for (const o of [d, s]) if (o.k === 'unk') add(`<code>${esc(o.t || '(empty)')}</code> is not a register, a memory operand or a number.`, `الـ ${bdi(o.t || '(empty)')} مش register ولا memory operand ولا رقم.`);
    for (const o of [d, s]) if (o.k === 'nobr') add(`<code>${esc(o.n)}</code> is illegal: the brackets are missing, so ${esc(o.rest)} is a register, not a memory operand. Write <code>${esc(o.seg + ':[' + o.rest + ']')}</code>.`,
      `الـ ${bdi(o.n)} غلط (illegal)، لأن الأقواس ناقصة، فالـ ${esc(o.rest)} هنا register مش memory operand. الصح إنك تكتب ${bdi(o.seg + ':[' + o.rest + ']')}.`);
    if (d.k === 'imm') add('Rule 5: the destination cannot be immediate data; it must be a register or a memory location.', 'القاعدة 5: الـ destination ماينفعش يبقى immediate data، لازم يبقى register أو memory location.');
    if (d.k === 'mem' && s.k === 'mem') add('Rule 4: memory to memory moves are not allowed (except string instructions).', 'القاعدة 4: النقل من memory لـ memory مش مسموح (إلا في الـ string instructions).');
    if (d.k === 'seg' && d.n === 'CS') add('Rule 3: changing the value of CS is not allowed (reading CS is fine).', 'القاعدة 3: ماينفعش تغيّر قيمة الـ CS (بس القراية منه عادي).');
    if (d.k === 'seg' && s.k === 'seg') add('Rule 2: you cannot move data from one segment register to another with a single instruction.' + (d.n !== 'CS' ? ` Use a general register: <code>MOV AX, ${s.n}</code> then <code>MOV ${d.n}, AX</code>.` : ''),
      'القاعدة 2: ماينفعش تنقل داتا من segment register لـ segment register تاني في instruction واحدة.' + (d.n !== 'CS' ? ' الحل إنك تعدّي على general register:' + ltr(`MOV AX, ${s.n}  then  MOV ${d.n}, AX`) : ''));
    if (isR(d) && isR(s) && !(d.k === 'seg' && s.k === 'seg') && d.w !== s.w) add(`Rule 1: both operands must be the same size: ${d.n} is ${d.w}-bit, ${s.n} is ${s.w}-bit.`, `القاعدة 1: الـ operands الاتنين لازم يبقوا نفس الحجم، والـ ${d.n} حجمه ${bdi(d.w + '-bit')} أما الـ ${s.n} فحجمه ${bdi(s.w + '-bit')}.`);
    if (d.k === 'reg' && s.k === 'imm' && s.v >= 2 ** d.w) add(`Rule 1 (same size): ${esc(s.n)} = ${s.v} needs more than ${d.w} bits, so it does not fit in ${d.n}.`, `القاعدة 1 (نفس الحجم): الرقم ${bdi(s.n)}${s.base !== 'dec' ? ' قيمته ' + bdi(String(s.v)) : ''} ومحتاج أكتر من ${bdi(d.w + ' bits')}، فمش هيدخل في الـ ${d.n}.`);
    for (const o of [d, s]) {
      if (o.k === 'mem' && o.bad) add(`The address inside [ ] is not understood: write a number (like 1234H) or BX, BP, SI, DI.`, 'الـ address اللي جوه الأقواس مش مفهوم، اكتب رقم زي ' + bdi('1234H') + ' أو register من BX و BP و SI و DI.');
      else if (o.k === 'mem' && o.badReg.length && !(d.k === 'mem' && s.k === 'mem')) add(`In this course only BX, BP, SI and DI hold an address inside [ ] (Lecture 4); ${o.badReg.join(', ')} does not.`, `في الكورس ده الـ registers اللي بتشيل address جوه الأقواس هي BX و BP و SI و DI بس (Lecture 4)، والـ ${o.badReg[0]} مش منهم.`);
    }
    if (E.length) return { ok: false, d, s, errs: E };
    if (d.k === 'seg' && s.k === 'imm') return { ok: 'note', d, s, mode: 'Not in this lecture',
      en: 'Loading a segment register with immediate data is not one of this lecture\'s examples. The notes load segment registers through a general register (<code>MOV DS, AX</code>).',
      ar: 'تحميل segment register بـ immediate data مش من أمثلة المحاضرة دي. الـ notes بتحمّل الـ segment registers عن طريق general register زي ' + bdi('MOV DS, AX') + '.' };
    if (isR(d) && isR(s)) return { ok: true, d, s, mode: 'Register addressing',
      en: `Valid: <b>register addressing</b>. ${s.n} is copied into ${d.n}; ${s.n} keeps its value (MOV never deletes the source).` + (s.k === 'seg' ? ` Reading a segment register like ${s.n} is fine.` : ''),
      ar: `صح، ده <b>register addressing</b>. الـ ${s.n} بيتنسخ في الـ ${d.n}، والـ ${s.n} بيفضل بقيمته (الـ MOV عمرها ما بتمسح الـ source).` + (s.k === 'seg' ? ` والقراية من segment register زي الـ ${s.n} عادي.` : '') };
    const segEn = o => o.ovr ? `the segment is forced to ${o.seg} (segment override)` : `the default segment ${o.seg} is used` + (o.seg === 'SS' ? ' (BP uses SS)' : '');
    const segAr = o => o.ovr ? `الـ segment هنا اتغيّر غصب لـ ${o.seg} (segment override).` : `الـ segment هنا الـ default وهو ${o.seg}` + (o.seg === 'SS' ? ' (لأن الـ BP بيستخدم SS).' : '.');
    if (s.k === 'imm') return { ok: true, d, s, mode: 'Immediate addressing',
      en: `Valid: <b>immediate addressing</b>. The constant ${esc(s.n)} written in the instruction is copied into ${d.k === 'mem' ? 'the memory location ' + esc(d.n) + ' (' + segEn(d) + ')' : d.n}.`,
      ar: `صح، ده <b>immediate addressing</b>. الرقم الثابت ${bdi(s.n)} المكتوب في الـ instruction بيتنسخ في ${d.k === 'mem' ? 'الـ memory location ' + bdi(d.n) + '. ' + segAr(d) : 'الـ ' + d.n + '.'}` };
    const mem = d.k === 'mem' ? d : s, r = d.k === 'mem' ? s : d, f = `${mem.seg}×10 + ${mem.inner}`;
    if (mem.regs.length) return { ok: true, d, s, mode: 'Register indirect family (Lecture 4)',
      en: `Valid: the offset comes from ${mem.regs.join(' + ')}, the register indirect family of Lecture 4${mem.inner === 'DI' ? ' (exams sometimes call <code>MOV EAX, [DI]</code> "direct addressing environment")' : ''}. Address = ${f}; ${segEn(mem)}.`,
      ar: `صح، والـ offset هنا جاي من ${bdi(mem.regs.join('+'))}، ودي عيلة الـ register indirect اللي في Lecture 4${mem.inner === 'DI' ? ' (والامتحانات ساعات بتسمّي ' + bdi('MOV EAX, [DI]') + ' "direct addressing environment")' : ''}. العنوان:` + ltr(f) + segAr(mem) };
    const dir = ['AL', 'AX', 'EAX'].includes(r.n);
    return { ok: true, d, s, mode: dir ? 'Direct addressing' : 'Displacement addressing',
      en: `Valid: <b>${dir ? 'direct' : 'displacement'} addressing</b> (memory with ${dir ? 'AL, AX or EAX' : 'a register other than AL, AX, EAX'}). Address = ${f}; ${segEn(mem)}.`,
      ar: `صح، ده <b>${dir ? 'direct' : 'displacement'} addressing</b> (memory مع ${dir ? 'AL أو AX أو EAX' : 'register غير AL و AX و EAX'}). العنوان:` + ltr(f) + segAr(mem) };
  }
  const EXAMPLES = ['MOV AX, BX', 'MOV BL, CL', 'MOV EAX, BL', 'MOV SI, BL', 'MOV EBX, AX', 'MOV ECX, AX', 'MOV DS, CS', 'MOV DS, ES', 'MOV SS, CS', 'MOV AX, CS', 'MOV DS, AX', 'MOV CS, AX', 'MOV AX, DS', 'MOV CS, DS', 'MOV [DI], [SI]', 'MOV [AX], [5000H]', 'MOV 55H, BL', 'MOV 100, [DI]', 'MOV EAX, ESP', 'MOV AX, 100', 'MOV ES:SI, CX', 'MOV ES:[SI], CX', 'MOV CS:[SI], 100'];
  function MovCheck({ ar }) {
    const [txt, setTxt] = useState('MOV EAX, BL'), r = checkMov(txt);
    const card = (o, l) => { if (!o) return null;
      const [n, kind, w] = o.k === 'reg' ? [o.n, o.w + '-bit register', o.w] : o.k === 'seg' ? [o.n, 'segment register, 16-bit', 16] : o.k === 'mem' ? [o.n, 'memory location in ' + o.seg + (o.ovr ? ' (override)' : ''), 0] : o.k === 'imm' ? [o.n, 'immediate data (' + { hex: 'hexadecimal', bin: 'binary', dec: 'decimal' }[o.base] + ')', 0] : o.k === 'nobr' ? [o.n, 'brackets missing', 0] : [o.t || '?', 'not recognised', 0];
      return html`<div className="mpv3-op"><small>${l}</small><b>${n}</b>${kind}${w ? html`<span className="mpv3-wbar" aria-hidden="true"><i style=${{ width: w / 32 * 100 + '%' }}></i></span>` : null}</div>`; };
    const en = r.ok ? r.en : r.errs.map(e => e.en).join(' '), a = r.ok ? r.ar : r.errs.map(e => e.ar).join('<br>');
    return html`<figure className="fig mpv3"><div className="fig-stage">
      <div className="mpv3-in"><span className="mpv3-lbl">Example from the notes and quiz</span>
        <select aria-label="Example from the notes" value=${EXAMPLES.includes(txt) ? txt : ''} onChange=${e => e.target.value && setTxt(e.target.value)}>
          <option value="">choose…</option>${EXAMPLES.map(x => html`<option key=${x} value=${x}>${x}</option>`)}</select></div>
      <div className="mpv3-in"><span className="mpv3-lbl">Try your own</span><input aria-label="MOV instruction" value=${txt} onInput=${e => setTxt(e.target.value)} onChange=${e => setTxt(e.target.value)} spellCheck="false" style=${{ width: '230px' }} /></div>
      ${r.d && html`<div className="mpv3-ops">${card(r.d, 'Destination')}${card(r.s, 'Source')}</div>`}
      <div className=${'mpv3-ver ' + (r.ok === true ? 'mpv3-ok' : r.ok === 'note' ? 'mpv3-nt' : 'mpv3-bad')}>
        <b>${r.ok === true ? '✓ Valid: ' + r.mode : r.ok === 'note' ? r.mode : '✗ Incorrect'}</b>
        ${!r.ok && html`<ul>${r.errs.map((e, k) => html`<li key=${k} dangerouslySetInnerHTML=${{ __html: e.en.replace(/^(Rule \d)/, '<b>$1</b>') }}></li>`)}</ul>`}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── 1.2: segment to segment goes through a general register ── */
  function SegDetour({ ar }) {
    const LINES = ['MOV DS, CS', 'MOV AX, CS', 'MOV DS, AX'];
    const steps = [
      { en: 'Goal: copy CS into DS. <code>MOV DS, CS</code> is incorrect: you cannot move data from one segment register to another with a single instruction (the same for <code>MOV DS, ES</code> and <code>MOV SS, CS</code>).',
        ar: 'الهدف إننا ننسخ الـ CS في الـ DS. بس ' + bdi('MOV DS, CS') + ' غلط، لأن ماينفعش تنقل داتا من segment register لـ segment register تاني في instruction واحدة (ونفس الكلام في ' + bdi('MOV DS, ES') + ' و ' + bdi('MOV SS, CS') + ').' },
      { en: 'Step 1: <code>MOV AX, CS</code> copies CS into the general register AX. Reading CS is allowed, and CS keeps its value.',
        ar: 'أول خطوة ' + bdi('MOV AX, CS') + ' بتنسخ الـ CS في الـ general register اللي هو AX. القراية من الـ CS مسموحة، والـ CS بيفضل بقيمته.' },
      { en: 'Step 2: <code>MOV DS, AX</code> copies AX into DS. Now DS holds the value of CS, done in two instructions.',
        ar: 'تاني خطوة ' + bdi('MOV DS, AX') + ' بتنسخ الـ AX في الـ DS. كده الـ DS بقى فيه قيمة الـ CS، في خطوتين.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600);
    const has = { CS: true, AX: i >= 1, DS: i >= 2 };
    const box = (n, on) => html`<div className=${'mpv3-rg' + (on ? ' mpv3-on' : '')}><small>${n}</small>${has[n] ? html`<span className="mpv3-tok">CS value</span>` : html`<span className="mpv3-old">old value</span>`}</div>`;
    return html`<figure className="fig mpv3"><div className="fig-stage">
      <div className="mpv3-lines">${LINES.map((l, k) => html`<div key=${k} className=${(k === 0 ? 'mpv3-bad ' : '') + (k === i ? 'mpv3-cur' : k < i ? 'mpv3-done' : '')}>${l}${k === 0 ? '   ✗ incorrect' : ''}</div>`)}</div>
      <p className=${'mpv3-x ' + pop(i === 0)}>✗ CS → DS directly</p>
      <div className="mpv3-regs" style=${{ '--n': 5, gridTemplateColumns: 'minmax(0,1fr) 22px minmax(0,1fr) 22px minmax(0,1fr)' }}>
        ${box('CS', false)}<div className=${'mpv3-arr ' + pop(i >= 1)} aria-hidden="true">→</div>${box('AX', i === 1)}<div className=${'mpv3-arr ' + pop(i >= 2)} aria-hidden="true">→</div>${box('DS', i === 2)}</div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 2.0-2.3: immediate data, its suffix, and where it lands in the register ── */
  const IMM_EX = [['BL', '44'], ['AX', '44H'], ['CH', '100'], ['EAX', '12'], ['EBX', '100B'], ['AX', '1001b'], ['AX', '0005H']];
  function layout(r) {
    const base = r.replace(/^E/, '');
    if (/^[ABCD][XHL]$/.test(base)) { const L = base[0], E = 'E' + L + 'X', w = width(r);
      return [{ n: E + ' upper', d: 4, on: w === 32, sh: 16 }, { n: L + 'H', d: 2, on: w === 32 || w === 16 || r === L + 'H', sh: 8 }, { n: L + 'L', d: 2, on: w === 32 || w === 16 || r === L + 'L', sh: 0 }]; }
    return [{ n: 'E' + base + ' upper', d: 4, on: width(r) === 32, sh: 16 }, { n: base, d: 4, on: true, sh: 0 }];
  }
  function ImmediateLab({ ar }) {
    const [reg, setReg] = useState('BL'), [txt, setTxt] = useState('44');
    const n = num(txt), w = width(reg), fits = n && n.v < 2 ** w;
    const cells = layout(reg), own = R8.includes(reg) ? cells.findIndex(c => c.n === reg) : -1;
    const hexW = n && fits ? hx(n.v, w / 4) : '', bin = n && fits ? n.v.toString(2).padStart(w, '0').replace(/(.{4})(?=.)/g, '$1 ') : '';
    const sufEn = n && { hex: 'the suffix H means hexadecimal', bin: 'the suffix B means binary', dec: 'no suffix means decimal' }[n.base];
    const sufAr = n && { hex: 'اللاحقة H يعني hexadecimal', bin: 'اللاحقة B يعني binary', dec: 'الرقم من غير لاحقة يعني decimal' }[n.base];
    const ins = `MOV ${reg}, ${txt.trim()}`;
    let en, a;
    if (!n) { en = 'Type a number like 44 (decimal), 44H (hexadecimal) or 100B (binary).'; a = 'اكتب رقم زي ' + bdi('44') + ' (decimal) أو ' + bdi('44H') + ' (hexadecimal) أو ' + bdi('100B') + ' (binary).'; }
    else if (!fits) { en = `<code>${esc(ins)}</code>: ${esc(txt.trim())} = ${n.v} needs more than ${w} bits, so it does not fit in ${reg}. Both operands must be the same size.`; a = `الـ ${bdi(ins)} مش هتنفع، لأن الرقم قيمته ${bdi(String(n.v))} ومحتاج أكتر من ${bdi(w + ' bits')}، فمش هيدخل في الـ ${reg}.`; }
    else { en = `<code>${esc(ins)}</code>: ${sufEn}, so the value is <b>${n.v}</b> in decimal = <b>${hexW}H</b>. Immediate addressing copies this constant from the instruction into ${reg} (${w} bits).`;
      a = `الـ ${bdi(ins)} فيها ${sufAr}، فالقيمة:` + ltr(`${txt.trim()} = ${n.v} (decimal) = ${hexW}H`) + `والـ immediate addressing بينسخ الرقم الثابت ده من الـ instruction للـ ${reg} (${bdi(w + ' bits')}).`; }
    const cellDigits = c => { if (!fits || !c.on) return '·'.repeat(c.d); return hx(Math.floor(n.v / 2 ** (own >= 0 ? 0 : c.sh)) % 2 ** (c.d * 4), c.d); };
    return html`<figure className="fig mpv3"><div className="fig-stage">
      <div className="mpv3-chips"><span className="mpv3-lbl">Examples from the notes</span>${IMM_EX.map(([r, t]) => html`<button key=${r + t} className="mpv3-chip" aria-pressed=${String(reg === r && txt === t)} onClick=${() => { setReg(r); setTxt(t); }}>MOV ${r}, ${t}</button>`)}</div>
      <div className="mpv3-in"><span className="mpv3-lbl">Try your own</span><b style=${{ fontFamily: 'var(--mono)' }}>MOV</b>
        <select aria-label="Destination register" value=${reg} onChange=${e => setReg(e.target.value)}>${[...R8, ...R16, ...R32].map(x => html`<option key=${x} value=${x}>${x}</option>`)}</select><b>,</b>
        <input aria-label="Immediate data" value=${txt} onInput=${e => setTxt(e.target.value)} onChange=${e => setTxt(e.target.value)} spellCheck="false" style=${{ width: '110px' }} /></div>
      <div className="mpv3-lay" aria-label=${'Register ' + reg}>${cells.map((c, k) => html`<div key=${k} className=${'mpv3-cell' + (fits && c.on ? ' mpv3-on' : '')} style=${{ flex: c.d }}><small>${c.n}</small><b>${cellDigits(c)}</b></div>`)}</div>
      ${n && fits ? html`<div className="mpv3-vals"><span>written</span><b>${txt.trim()} (${{ hex: 'H = hex', bin: 'B = binary', dec: 'no suffix = decimal' }[n.base]})</b><span>decimal</span><b>${n.v}</b><span>hex</span><b>${hexW}H</b><span>binary</span><b>${bin}</b></div>`
        : html`<p className="mpv3-err">${n ? `Does not fit in ${w} bits.` : 'Not a number: use 44, 44H or 100B.'}</p>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── 3.0-3.1: direct vs displacement: which register, which segment ── */
  const PICK = [['AL', 'AX', 'EAX'], ['BL', 'BX', 'EBX'], ['CL', 'CX', 'ECX'], ['DL', 'DX', 'EDX']];
  const DD_EX = [['AL', false], ['EAX', true], ['CL', false], ['EBX', true]];
  function DirectDisp({ ar }) {
    const [reg, setReg] = useState('AL'), [ovr, setOvr] = useState(false), [store, setStore] = useState(false);
    const seg = ovr ? 'ES' : 'DS', mem = (ovr ? 'ES:' : '') + '[123H]', ins = store ? `MOV ${mem}, ${reg}` : `MOV ${reg}, ${mem}`;
    const dir = ['AL', 'AX', 'EAX'].includes(reg), mode = dir ? 'Direct addressing' : 'Displacement addressing';
    const en = `<code>${ins}</code> is <b>${mode.toLowerCase()}</b>: ${dir ? 'the register is AL, AX or EAX' : 'the register is not AL, AX or EAX (displacement covers all other registers)'}. The memory location is in ${seg} ${ovr ? '(segment forced to ES)' : '(default segment DS)'}: address = ${seg}×10 + 123H.`;
    const a = `الـ ${bdi(ins)} ده <b>${mode}</b>، لأن ${dir ? 'الـ register هو AL أو AX أو EAX' : 'الـ register مش AL ولا AX ولا EAX (والـ displacement لكل الـ registers التانية)'}. الـ memory location في الـ ${seg} ${ovr ? '(الـ segment اتغيّر غصب لـ ES)' : '(الـ segment الـ default هو DS)'}، والعنوان:` + ltr(`${seg}×10 + 123H`);
    return html`<figure className="fig mpv3"><div className="fig-stage">
      <div className="mpv3-chips"><span className="mpv3-lbl">Examples from the notes</span>${DD_EX.map(([r, o]) => html`<button key=${r} className="mpv3-chip" aria-pressed=${String(reg === r && ovr === o && !store)} onClick=${() => { setReg(r); setOvr(o); setStore(false); }}>MOV ${r}, ${o ? 'ES:' : ''}[123H]</button>`)}</div>
      <div className="mpv3-pick" role="group" aria-label="Register">${PICK.flat().map(r => html`<button key=${r} className=${['AL', 'AX', 'EAX'].includes(r) ? 'mpv3-d' : ''} aria-pressed=${String(reg === r)} onClick=${() => setReg(r)}>${r}</button>`)}</div>
      <div className="mpv3-in"><button className="fig-btn" aria-pressed=${String(!ovr)} onClick=${() => setOvr(false)}>Default DS</button><button className="fig-btn" aria-pressed=${String(ovr)} onClick=${() => setOvr(true)}>ES: override</button>
        <button className="fig-btn" aria-pressed=${String(!store)} onClick=${() => setStore(false)}>Load</button><button className="fig-btn" aria-pressed=${String(store)} onClick=${() => setStore(true)}>Store</button></div>
      <div className="mpv3-code">${store ? html`MOV <span className="mpv3-hp">${ovr ? 'ES:' : ''}</span>[123H], <span className="mpv3-hd">${reg}</span>` : html`MOV <span className="mpv3-hd">${reg}</span>, <span className="mpv3-hp">${ovr ? 'ES:' : ''}</span>[123H]`}</div>
      <div className="mpv3-dd">
        <div className="mpv3-card"><small>Memory in ${seg}</small><b>${seg}×10 + 123H</b></div>
        <div className="mpv3-arr" aria-hidden="true">${store ? '←' : '→'}</div>
        <div className="mpv3-card mpv3-dst"><small>Register</small><b>${reg}</b></div></div>
      <p className="mpv3-mode">${mode}</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── 4: physical address = segment × 10H + offset, digit by digit ── */
  const PA_EX = [['DS', '1000', '1234', 'MOV AL, [1234H]'], ['ES', '1400', '1234', 'MOV BL, ES:[1234H]'], ['DS', '1000', '150', 'MOV EAX, [DI], DI=150'], ['DS', '20A0', '0', 'DS = 20A0']];
  function PhysCalc({ ar }) {
    const [sn, setSn] = useState('DS'), [sv, setSv] = useState('1000'), [ov, setOv] = useState('1234');
    const [i, ctl] = useSteps(4, 1700);
    const clean = t => t.trim().toUpperCase().replace(/H$/, ''), S = clean(sv), O = clean(ov);
    const ok = /^[0-9A-F]{1,4}$/.test(S) && /^[0-9A-F]{1,4}$/.test(O);
    const set = (f, v) => { f(v); ctl.replay(); };
    let body, en, a;
    if (!ok) { body = html`<p className="mpv3-err">Segment and offset: 1 to 4 hex digits each.</p>`; en = 'Type the segment and the offset in hex (1 to 4 digits each, like 1000 and 1234).'; a = 'اكتب الـ segment والـ offset بالـ hex، من رقم لـ 4 أرقام لكل واحد، زي ' + bdi('1000') + ' و ' + bdi('1234') + '.'; }
    else {
      const s = parseInt(S, 16), o = parseInt(O, 16), b = s * 16, p = b + o;
      const segH = hx(s, 4), baseH = hx(b, 5), offH = hx(o, 4), pH = hx(p, 5), C = Math.max(5, pH.length);
      const cols = (str) => { const a = str.padStart(C, ' ').split(''); return a; };
      const carry = Array(C).fill(''); let c = 0;
      for (let k = 0; k < C; k++) { const da = parseInt(baseH[baseH.length - 1 - k] || '0', 16), db = parseInt(offH[offH.length - 1 - k] || '0', 16), t = da + db + c; c = t > 15 ? 1 : 0; if (c && k + 1 < C) carry[C - 2 - k] = '1'; }
      const row = (l, str, cls, extra) => html`<div className=${cls || ''}><span className="mpv3-l">${l}</span>${cols(str).map((d, k) => html`<span key=${k} className=${extra && extra(k) ? 'mpv3-new' : ''}>${d}</span>`)}</div>`;
      body = html`<div className="mpv3-sum" style=${{ '--c': C }}>
        ${row(sn, segH)}
        <div className=${pop(i >= 2)} aria-hidden="true"><span className="mpv3-l"></span>${carry.map((d, k) => html`<span key=${k} className="mpv3-cy">${d}</span>`)}</div>
        ${row(sn + ' × 10H', baseH, pop(i >= 1), k => k === C - 1)}
        ${row('+ offset', offH, pop(i >= 2))}
        ${row('= address', pH, 'mpv3-tot ' + pop(i >= 3))}</div>
        <p className=${'mpv3-calc ' + pop(i >= 1)}>×10 in hex = ×16 in decimal: ${segH}H = ${s}, ${s} × 16 = ${b} = ${baseH}H</p>`;
      const steps = [
        { en: `A memory address has two parts, segment and offset, written <code>Segment:[offset]</code>. Here ${sn} = ${segH} and offset = ${offH}.`, ar: 'الـ memory address ليه جزئين، الـ segment والـ offset، وبيتكتب كده ' + bdi('Segment:[offset]') + '. هنا:' + ltr(`${sn} = ${segH}, offset = ${offH}`) },
        { en: `${sn} × 10H: in hex, × 10 shifts one hex digit left (a 0 is appended), which is × 16 in decimal: ${segH} → ${baseH}.`, ar: `نضرب الـ ${sn} في ${bdi('10H')}، وفي الـ hex الضرب في 10 بيزق الرقم خانة hex واحدة لليسار (بنزود 0 على اليمين)، وده نفس الضرب في 16 بالـ decimal:` + ltr(`${segH} × 10H = ${baseH}`) },
        { en: `Add the offset column by column in hex: ${baseH} + ${offH}.`, ar: 'نجمع الـ offset خانة خانة بالـ hex:' + ltr(`${baseH} + ${offH}`) },
        { en: `Physical address = (${sn} × 10H) + offset = ${baseH} + ${offH} = <b>${pH}</b>.`, ar: 'الـ physical address بيطلع:' + ltr(`(${sn} × 10H) + offset = ${baseH} + ${offH} = ${pH}`) }];
      en = steps[i].en; a = steps[i].ar;
    }
    return html`<figure className="fig mpv3"><div className="fig-stage">
      <div className="mpv3-chips"><span className="mpv3-lbl">Examples from the notes</span>${PA_EX.map(([n, s, o, l]) => html`<button key=${l} className="mpv3-chip" aria-pressed=${String(sn === n && clean(sv) === s && clean(ov) === o)} onClick=${() => { setSn(n); setSv(s); setOv(o); ctl.replay(); }}>${l}</button>`)}</div>
      <div className="mpv3-in"><span className="mpv3-lbl">Try your own</span>
        <select aria-label="Segment register" value=${sn} onChange=${e => set(setSn, e.target.value)}>${SEG.map(x => html`<option key=${x} value=${x}>${x}</option>`)}</select>
        <input aria-label="Segment value (hex)" value=${sv} onInput=${e => set(setSv, e.target.value)} onChange=${e => set(setSv, e.target.value)} spellCheck="false" style=${{ width: '74px' }} />
        <span>offset</span><input aria-label="Offset (hex)" value=${ov} onInput=${e => set(setOv, e.target.value)} onChange=${e => set(setOv, e.target.value)} spellCheck="false" style=${{ width: '74px' }} /></div>
      ${body}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${ok && html`<${Bar} steps=${[0, 1, 2, 3]} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── 5: the slides' figures for MOV AL, [1234H] and MOV BL, ES:[1234H] ── */
  const LEX = [
    { ins: 'MOV AL, [1234H]', seg: 'DS', sv: '1000', base: '10000', addr: '11234', val: '22', row: 0, reg: 'AL', E: 'EAX' },
    { ins: 'MOV BL, ES:[1234H]', seg: 'ES', sv: '1400', base: '14000', addr: '15234', val: '33', row: 1, reg: 'BL', E: 'EBX' }];
  function LecInner({ ex, ar }) {
    const steps = [
      { en: `Given DS=1000, ES=1400, DI=150, EAX=1234, execute <code>${ex.ins}</code>. ${ex.seg === 'DS' ? 'No segment is written, so the default segment DS is used.' : 'ES: forces the segment to ES (segment override).'}`,
        ar: 'المعطى:' + ltr('DS=1000, ES=1400, DI=150, EAX=1234') + `والمطلوب ننفّذ ${bdi(ex.ins)}. ` + (ex.seg === 'DS' ? 'مفيش segment مكتوب، فبنستخدم الـ default segment وهو DS.' : 'كتابة ' + bdi('ES:') + ' بتجبر الـ segment يبقى ES (segment override).') },
      { en: `Segment register × 10: ${ex.seg} = ${ex.sv}, and ${ex.sv} × 10 = ${ex.base}.`, ar: 'نضرب الـ segment register في 10:' + ltr(`${ex.seg} × 10 = ${ex.sv} × 10 = ${ex.base}`) },
      { en: `The adder (+) adds the offset 1234: ${ex.base} + 1234 = ${ex.addr}.`, ar: 'الـ adder بيجمع الـ offset:' + ltr(`${ex.base} + 1234 = ${ex.addr}`) },
      { en: `The arrow points to memory location ${ex.addr}; the byte there (e.g. ${ex.val}) is read.`, ar: `السهم بيشاور على الـ memory location ${bdi(ex.addr)}، والـ byte اللي هناك (مثلاً ${bdi(ex.val)}) بيتقري.` },
      { en: `The byte is copied into ${ex.reg}, the lowest byte of ${ex.E}. Memory location = (Segment Register × 10) + offset = ${ex.seg} × 10 + 1234H = ${ex.addr}.`, ar: `الـ byte بيتنسخ في الـ ${ex.reg}، وده أصغر byte في الـ ${ex.E}. والحساب كله:` + ltr(`(Segment Register × 10) + offset = ${ex.seg} × 10 + 1234H = ${ex.addr}`) }];
    const [i, ctl] = useSteps(steps.length, 2000);
    const A = parseInt(ex.addr, 16), RW = ['EAX', 'EBX', 'ECX', 'EDX'], ry = k => 40 + k * 28, my = k => 40 + k * 28;
    return html`<div><div className="fig-stage mpv3-fig">
      <div className="mpv3-code">${ex.seg === 'ES' ? html`MOV <span className="mpv3-hd">BL</span>, <span className="mpv3-hp">ES:</span>[1234H]` : html`MOV <span className="mpv3-hd">AL</span>, [1234H]`}</div>
      <svg viewBox="0 0 330 290" role="img" aria-label=${'Figure for ' + ex.ins + ': ' + ex.seg + ' times 10 plus 1234 points to ' + ex.addr + ', whose byte goes to ' + ex.reg}>
        <defs><marker id=${'mpv3-ah' + ex.row} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--fig-k)" /></marker></defs>
        <text x="48" y="28" fontSize="14.5" fontWeight="700">Registers</text>
        ${RW.map((n, k) => html`<g key=${n}><text x="8" y=${ry(k) + 19} fontSize="14.5">${n}</text>
          ${[0, 1, 2, 3].map(c => html`<rect key=${c} x=${48 + c * 30} y=${ry(k)} width="30" height="28" className=${'mpv3-cl' + (i >= 4 && k === ex.row && c === 3 ? ' mpv3-hi' : '')} />`)}
          ${i >= 4 && k === ex.row && html`<text x="153" y=${ry(k) + 19} fontSize="14.5" fontWeight="700" textAnchor="middle">${ex.val}</text>`}</g>`)}
        <text x="153" y=${ry(ex.row) - 4} fontSize="14.5" textAnchor="middle" className=${pop(i >= 4)}>${ex.reg}</text>
        <text x="8" y="227" fontSize="14.5">${ex.seg}</text>
        <rect x="48" y="208" width="70" height="30" className=${'mpv3-cl' + (i >= 1 ? ' mpv3-hi' : '')} /><text x="83" y="228" fontSize="15" fontWeight="700" textAnchor="middle">${ex.sv}</text>
        <g className=${pop(i >= 1)}><path d="M118,223 H184" className="mpv3-aw" markerEnd=${`url(#mpv3-ah${ex.row})`} />
          <text x="151" y="216" fontSize="14.5" textAnchor="middle">×10</text><text x="151" y="242" fontSize="14.5" textAnchor="middle" fontWeight="700">${ex.base}</text></g>
        <g className=${pop(i >= 2)}><circle cx="198" cy="223" r="13" className="mpv3-cl" /><text x="198" y="228" fontSize="16" textAnchor="middle" fontWeight="700">+</text>
          <path d="M198,272 V239" className="mpv3-aw" markerEnd=${`url(#mpv3-ah${ex.row})`} /><text x="198" y="287" fontSize="14.5" textAnchor="middle" fontWeight="700">1234</text></g>
        <text x="236" y="28" fontSize="14.5" fontWeight="700">Memory</text>
        ${[0, 1, 2, 3, 4].map(k => html`<g key=${k}><rect x="236" y=${my(k)} width="88" height="28" className=${'mpv3-cl' + (i >= 3 && k === 2 ? ' mpv3-hi' : '')} />
          <text x="242" y=${my(k) + 19} fontSize="14.5" fill="var(--graphite)" style=${{ fill: 'var(--graphite)' }}>${hx(A - 2 + k, 5)}</text>
          ${i >= 3 && k === 2 && html`<text x="306" y=${my(k) + 19} fontSize="14.5" fontWeight="700" textAnchor="middle">${ex.val}</text>`}</g>`)}
        <g className=${pop(i >= 2)}><path d=${`M211,223 H222 V${my(2) + 14} H234`} className="mpv3-aw" markerEnd=${`url(#mpv3-ah${ex.row})`} />
          <text x="218" y="190" fontSize="14.5" textAnchor="end" fontWeight="700">${ex.addr}</text></g>
        <g className=${pop(i >= 4)}><path d=${`M236,${my(2) + 14} L170,${ry(ex.row) + 14}`} className="mpv3-aw" markerEnd=${`url(#mpv3-ah${ex.row})`} /></g>
      </svg>
      <p className="mpv3-calc">Memory location = (Segment Register × 10) + offset<br /><span className=${pop(i >= 1)}>= ${ex.seg} × 10 + 1234H</span><br /><span className=${pop(i >= 2)}>= ${ex.base} + 1234 = ${ex.addr}</span></p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function LectureFig({ ar }) {
    const [k, setK] = useState(0);
    return html`<figure className="fig mpv3"><div className="fig-bar" style=${{ padding: '10px 14px 0', justifyContent: 'center' }}>
      ${LEX.map((e, j) => html`<button key=${j} className="fig-btn" aria-pressed=${String(k === j)} onClick=${() => setK(j)} style=${{ fontFamily: 'var(--mono)' }}>${e.ins}</button>`)}</div>
      <${LecInner} key=${k} ex=${LEX[k]} ar=${ar} /></figure>`;
  }

  /* ── 6.0-6.1: segment overriding: default segment vs the one written before the offset ── */
  const OV_EX = [
    { ins: 'MOV BL, ES:[1234H]', a: 'MOV BL, ', b: '[1234H]', off: '1234H', def: 'DS', ovr: 'ES', calc: { DS: 'DS×10 + 1234 = 10000 + 1234 = 11234', ES: 'ES×10 + 1234 = 14000 + 1234 = 15234' } },
    { ins: 'MOV AL, CS:[BX]', a: 'MOV AL, ', b: '[BX]', off: 'BX', def: 'DS', ovr: 'CS' },
    { ins: 'MOV AX, DS:[BP]', a: 'MOV AX, ', b: '[BP]', off: 'BP', def: 'SS', ovr: 'DS' },
    { ins: 'MOV ES:[SI], CX', a: 'MOV ', b: '[SI], CX', off: 'SI', def: 'DS', ovr: 'ES' },
    { ins: 'MOV ES:SI, CX', bad: true }];
  function Override({ ar }) {
    const [k, setK] = useState(0), [on, setOn] = useState(true), x = OV_EX[k];
    let body, en, a;
    if (x.bad) {
      body = html`<div className="mpv3-code">MOV ES:<span className="mpv3-hs">SI</span>, CX</div>
        <div className="mpv3-ver mpv3-bad"><b>✗ Illegal: the brackets are missing</b>SI here is a register, not a memory operand.</div>
        <div className="mpv3-in" style=${{ marginTop: '10px' }}><button className="fig-btn solid" onClick=${() => { setK(3); setOn(true); }}>Fix it: MOV ES:[SI], CX</button></div>`;
      en = '<code>MOV ES:SI, CX</code> is illegal: the brackets are missing, so SI is a register, not a memory operand. <code>MOV ES:[SI], CX</code> would be correct.';
      a = 'الـ ' + bdi('MOV ES:SI, CX') + ' غلط (illegal)، لأن الأقواس ناقصة، فالـ SI هنا register مش memory operand. الصح ' + bdi('MOV ES:[SI], CX') + '.';
    } else {
      const seg = on ? x.ovr : x.def, f = (x.calc && x.calc[seg]) || `${seg}×10 + ${x.off}`, pre = x.a + x.b, bp = x.def === 'SS' ? ' (BP’s default segment is SS, Lecture 4)' : '';
      body = html`<div className="mpv3-in"><button className="fig-btn" aria-pressed=${String(!on)} onClick=${() => setOn(false)}>No prefix</button><button className="fig-btn" aria-pressed=${String(on)} onClick=${() => setOn(true)}>With ${x.ovr}: prefix</button></div>
        <div className="mpv3-code">${x.a}${on && html`<span className="mpv3-hp">${x.ovr}:</span>`}${x.b}</div>
        <div className="mpv3-segs">
          <div className=${'mpv3-card' + (on ? ' mpv3-off' : ' mpv3-src')}><small>default</small><b>${x.def}</b></div>
          <div className=${'mpv3-card' + (on ? ' mpv3-src' : ' mpv3-dim')}><small>override</small><b>${x.ovr}</b></div>
          <div className="mpv3-card"><small>offset</small><b>${x.off}</b></div></div>
        <p className="mpv3-calc">address = ${f}</p>`;
      en = on ? `<code>${x.ins}</code>: the offset ${x.off} normally uses ${x.def}${bp}; writing <b>${x.ovr}:</b> before it overrides that, so the address uses ${x.ovr}: ${f}.`
        : `<code>${pre}</code>: no segment is written, so the offset ${x.off} uses its default segment ${x.def}${bp}: ${f}.`;
      const bpA = x.def === 'SS' ? ' (الـ default segment بتاع الـ BP هو SS، من Lecture 4)' : '';
      a = on ? `في ${bdi(x.ins)} الـ offset اللي هو ${x.off} المفروض يستخدم الـ ${x.def}${bpA}، بس كتابة ${bdi(x.ovr + ':')} قبله بتعمل override، فالعنوان بيستخدم الـ ${x.ovr}:` + ltr(f)
        : `في ${bdi(pre)} مفيش segment مكتوب، فالـ offset اللي هو ${x.off} بيستخدم الـ default segment بتاعه وهو ${x.def}${bpA}:` + ltr(f);
    }
    return html`<figure className="fig mpv3"><div className="fig-stage">
      <div className="mpv3-chips"><span className="mpv3-lbl">Examples from the notes</span>${OV_EX.map((e, j) => html`<button key=${j} className="mpv3-chip" aria-pressed=${String(k === j)} onClick=${() => { setK(j); setOn(true); }}>${e.ins}</button>`)}</div>
      ${body}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── 7: Lab 3 programs run line by line (or your own) ── */
  const PROGS = [
    ['ADD', '; ADD 5 , 6 -> AX = 11 (0Bh)\nMOV AX, 5\nADD AX, 6'],
    ['SUB', '; SUB 11 , 7 -> AX = 4\nMOV AX, 11\nSUB AX, 7'],
    ['XCHG', '; exchange AX and BX\n; -> AX = 3, BX = 5\nMOV AX, 5\nMOV BX, 3\nXCHG AX, BX'],
    ['5 + 3 - 2', '; (5 + 3 - 2) in CX -> CX = 6\nMOV AX, 5\nADD AX, 3\nSUB AX, 2\nMOV CX, AX'],
    ['INC / DEC', '; INC / DEC change a value by 1\nMOV AX, 5\nINC AX ; AX = 6\nMOV AX, 3\nDEC AX ; AX = 2']];
  const LREG = ['AX', 'BX', 'CX', 'DX'], h4 = v => hx(v, 4) + 'h';
  function runLab(txt) {
    const R = { AX: 0, BX: 0, CX: 0, DX: 0 }, out = [];
    txt.split('\n').forEach((line, li) => {
      const code = line.split(';')[0].trim();
      if (!code) { out.push({ line, li }); return; }
      const m = /^([A-Za-z]+)\s*(.*)$/.exec(code), op = m ? m[1].toUpperCase() : '', args = m && m[2] ? m[2].split(',').map(x => x.trim().toUpperCase()) : [];
      const isReg = x => LREG.includes(x), val = x => isReg(x) ? R[x] : (num(x) || {}).v;
      let err = null, ch = [], calc = '', en = '', ar = '';
      if (['MOV', 'ADD', 'SUB'].includes(op)) {
        if (args.length !== 2 || !isReg(args[0]) || val(args[1]) == null) err = 'needs a register (AX, BX, CX, DX) and a register or number';
        else if (val(args[1]) > 0xFFFF) err = 'the number does not fit in 16 bits';
        else { const d = args[0], v = val(args[1]), o = R[d];
          R[d] = op === 'MOV' ? v : op === 'ADD' ? (o + v) & 0xFFFF : (o - v + 0x10000) & 0xFFFF; ch = [d];
          calc = op === 'MOV' ? `${d} = ${v}` : `${d} = ${o} ${op === 'ADD' ? '+' : '-'} ${v} = ${R[d]}`;
          calc += ` (${h4(R[d])})`;
          en = op === 'MOV' ? `copies ${args[1]} into ${d}` : op === 'ADD' ? `adds ${args[1]} to ${d}` : `subtracts ${args[1]} from ${d}`;
          ar = op === 'MOV' ? 'بتنسخ القيمة' : op === 'ADD' ? 'بتجمع' : 'بتطرح'; }
      } else if (op === 'XCHG') {
        if (args.length !== 2 || !isReg(args[0]) || !isReg(args[1])) err = 'needs two registers';
        else { const [p, q] = args, t = R[p]; R[p] = R[q]; R[q] = t; ch = [p, q]; calc = `${p} = ${R[p]}, ${q} = ${R[q]}`; en = `swaps the contents of ${p} and ${q}`; ar = 'بتبدّل محتوى الاتنين'; }
      } else if (op === 'INC' || op === 'DEC') {
        if (args.length !== 1 || !isReg(args[0])) err = 'needs one register';
        else { const d = args[0], o = R[d]; R[d] = (o + (op === 'INC' ? 1 : 0xFFFF)) & 0xFFFF; ch = [d]; calc = `${d} = ${o} ${op === 'INC' ? '+' : '-'} 1 = ${R[d]} (${h4(R[d])})`; en = op === 'INC' ? `adds 1 to ${d}` : `subtracts 1 from ${d}`; ar = op === 'INC' ? 'بتزود واحد' : 'بتنقص واحد'; }
      } else err = 'this lab uses MOV, ADD, SUB, XCHG, INC, DEC';
      out.push({ line, li, code, exec: true, err, R: Object.assign({}, R), ch, calc, en, ar });
    });
    return out;
  }
  function Lab3({ ar }) {
    const [p, setP] = useState(0), [txt, setTxt] = useState(PROGS[0][1]), [t, setT] = useState(0), [edit, setEdit] = useState(false);
    const out = runLab(txt), ex = out.filter(o => o.exec), n = ex.length, cur = t > 0 ? ex[t - 1] : null;
    const regs = cur ? cur.R : { AX: 0, BX: 0, CX: 0, DX: 0 };
    const load = j => { setP(j); setTxt(PROGS[j][1]); setT(0); setEdit(false); };
    let en, a;
    if (!cur) { en = 'Lab 3 in emu8086: pick a program and press <b>Next</b> to run it line by line (registers start at 0 here). <b>Edit</b> lets you try your own with MOV, ADD, SUB, XCHG, INC and DEC on AX, BX, CX, DX.';
      a = 'الـ Lab 3 على الـ emu8086. اختار برنامج ودوس <b>Next</b> عشان يتنفذ سطر سطر (الـ registers بتبدأ بـ 0 هنا). وبالـ <b>Edit</b> تقدر تجرّب برنامجك بالـ MOV والـ ADD والـ SUB والـ XCHG والـ INC والـ DEC على AX و BX و CX و DX.'; }
    else if (cur.err) { en = `<code>${esc(cur.code)}</code>: ${cur.err}. The line is skipped.`; a = `السطر ${bdi(cur.code)} فيه مشكلة ومش هيتنفذ. المسموح هنا الـ MOV والـ ADD والـ SUB والـ XCHG والـ INC والـ DEC على AX و BX و CX و DX.`; }
    else { en = `<code>${esc(cur.code)}</code> ${cur.en}: ${cur.calc}.` + (t === n ? ' End of the program.' : ''); a = `الـ ${bdi(cur.code)} ${cur.ar}:` + ltr(cur.calc) + (t === n ? 'وكده البرنامج خلص.' : ''); }
    return html`<figure className="fig mpv3"><div className="fig-stage">
      <div className="mpv3-chips">${PROGS.map(([l], j) => html`<button key=${j} className="mpv3-chip" aria-pressed=${String(p === j && txt === PROGS[j][1])} onClick=${() => load(j)}>${l}</button>`)}</div>
      ${edit ? html`<div className="mpv3-in"><textarea aria-label="Program" rows=${Math.max(4, txt.split('\n').length)} value=${txt} onInput=${e => { setTxt(e.target.value); setT(0); }} onChange=${e => { setTxt(e.target.value); setT(0); }} spellCheck="false" style=${{ width: '100%', maxWidth: '420px', resize: 'vertical' }}></textarea></div>`
        : html`<div className="mpv3-lines">${out.map((o, k) => html`<div key=${k} className=${(!o.exec ? 'mpv3-cmt' : '') + (o.err ? ' mpv3-bad' : '') + (cur && o.li === cur.li ? ' mpv3-cur' : o.exec && cur && o.li < cur.li ? ' mpv3-done' : '')}>${o.line || ' '}</div>`)}</div>`}
      <div className="mpv3-regs" style=${{ '--n': 4 }}>${LREG.map(r => html`<div key=${r} className=${'mpv3-rg' + (cur && cur.ch.includes(r) ? ' mpv3-on' : '')}><small>${r}</small><b>${regs[r]}</b><span>${h4(regs[r])}</span></div>`)}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><div className="fig-dots" aria-hidden="true">${ex.map((_, j) => html`<i key=${j} className=${j < t ? 'on' : ''}></i>`)}</div><span className="grow"></span>
        <button className="fig-btn" onClick=${() => setEdit(!edit)}>${edit ? '✓ Done' : '✎ Edit'}</button>
        <button className="fig-btn" onClick=${() => setT(Math.max(0, t - 1))} disabled=${t === 0} aria-label="Previous line">‹ Back</button>
        <button className="fig-btn solid" onClick=${() => { setEdit(false); setT(Math.min(n, t + 1)); }} disabled=${t >= n} aria-label="Next line">Next ›</button>
        <button className="fig-btn" onClick=${() => setT(0)}>↻ Reset</button></div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'mp-modes-overview': ModesOverview, 'mp-mov-check': MovCheck, 'mp-seg-detour': SegDetour, 'mp-immediate': ImmediateLab, 'mp-direct-disp': DirectDisp, 'mp-phys-addr': PhysCalc, 'mp-lec3-figure': LectureFig, 'mp-override': Override, 'mp-lab3': Lab3 });
})();
/* ── part L1 ── */
// Microprocessors visuals, Lecture 1 (Introduction: hardware, software, languages and memory): source code to binary, the language staircase, CPU-dependent assemblers, .ASM → .OBJ → .EXE, debugger vs assembler sorter, the microcomputer block diagram, a bus read/write, the memory chip lab and the slide's register map. Every label comes from the site's notes (slides Lec_01).
(function () {
  const { useState, useEffect } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.mpv1 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mpv1-row{ display:flex; gap:6px; flex-wrap:wrap; justify-content:center; margin:0 0 10px; }
.mpv1-lbl{ font-size:.8rem; color:var(--graphite); width:100%; text-align:center; }
.mpv1-flow{ display:grid; gap:4px; max-width:340px; margin:0 auto; }
.mpv1-node{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 10px; text-align:center; color:var(--ink); transition:opacity .4s, box-shadow .4s, background .4s; }
.mpv1-node small{ display:block; font-size:.78rem; color:var(--graphite); } .mpv1-node b{ display:block; font-size:.95rem; }
.mpv1-node.mpv1-on{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.mpv1-node.mpv1-dim{ opacity:.35; }
.mpv1-node.mpv1-tool{ border-style:dashed; border-width:2px; border-color:var(--fig-k); }
.mpv1-dn{ text-align:center; color:var(--fig-k); font-weight:700; line-height:1; font-size:1.1rem; transition:opacity .4s; }
.mpv1-bulbs{ display:flex; gap:4px; justify-content:center; margin-top:6px; }
.mpv1-bulb{ width:28px; padding:3px 0 2px; border-radius:7px; border:1px solid var(--line); background:var(--paper-2); color:var(--graphite); font:700 .85rem var(--mono); cursor:pointer; line-height:1.15; }
.mpv1-bulb i{ display:block; width:12px; height:12px; margin:0 auto 2px; border-radius:50%; background:var(--paper); border:1px solid var(--line); }
.mpv1-bulb.mpv1-lit{ color:var(--ink); border-color:var(--fig-k); } .mpv1-bulb.mpv1-lit i{ background:var(--fig-k); border-color:var(--fig-k); box-shadow:0 0 8px var(--fig-k); }
.mpv1-mn{ display:inline-block; font:700 .85rem var(--mono); padding:1px 6px; border-radius:6px; background:var(--paper-2); margin:2px 2px 0; }
.mpv1-stack{ display:flex; flex-direction:column-reverse; gap:4px; max-width:360px; margin:0 auto; }
.mpv1-lay{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 8px; color:var(--ink); font-weight:700; font-size:.9rem; display:flex; align-items:center; gap:6px; transition:opacity .4s, box-shadow .4s, background .4s, transform .4s; cursor:pointer; text-align:left; font-family:inherit; }
.mpv1-lay span{ flex:1; } .mpv1-lay em{ font-style:normal; font-size:.75rem; font-weight:700; padding:1px 6px; border-radius:99px; background:var(--fig-s); color:#fff; white-space:nowrap; }
.mpv1-lay.mpv1-on{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.mpv1-lay.mpv1-hide{ opacity:0; transform:translateY(-8px); pointer-events:none; }
.mpv1-langs{ display:flex; gap:4px; } .mpv1-langs .mpv1-lay{ flex:1; justify-content:center; font-family:var(--mono); }
.mpv1-axis{ display:flex; justify-content:space-between; font-size:.78rem; color:var(--graphite); max-width:360px; margin:6px auto 0; gap:8px; }
.mpv1-pick{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:6px 8px; align-items:center; max-width:340px; margin:0 auto 10px; font-size:.84rem; color:var(--ink); }
.mpv1-pick > div{ display:flex; gap:6px; flex-wrap:wrap; }
.mpv1-res{ max-width:340px; margin:8px auto 0; border-radius:10px; padding:7px 10px; border:2px solid var(--line); font-size:.88rem; color:var(--ink); background:var(--paper); text-align:center; font-weight:700; }
.mpv1-res.mpv1-ok{ border-color:var(--ok); color:var(--ok); } .mpv1-res.mpv1-bad{ border-color:var(--pen); color:var(--pen); } .mpv1-res.mpv1-nt{ border-color:var(--fig-k); border-style:dashed; }
.mpv1-card{ border:1px solid var(--line); border-radius:12px; background:var(--paper); padding:12px 10px; text-align:center; font-weight:700; color:var(--ink); max-width:340px; margin:0 auto 8px; min-height:44px; display:grid; place-items:center; }
.mpv1-card.mpv1-shake{ animation:mpv1-shake .35s; border-color:var(--pen); }
@keyframes mpv1-shake{ 25%{ transform:translateX(-6px); } 75%{ transform:translateX(6px); } }
.mpv1-tbl{ width:100%; max-width:360px; margin:0 auto; border-collapse:collapse; font-size:.82rem; color:var(--ink); table-layout:fixed; }
.mpv1-tbl th, .mpv1-tbl td{ border:1px solid var(--line); padding:4px 6px; vertical-align:top; }
.mpv1-tbl th{ background:var(--paper-2); } .mpv1-tbl td{ background:var(--paper); }
.mpv1-tbl td div{ padding:2px 0; } .mpv1-tbl td div.mpv1-new{ color:var(--fig-k); font-weight:700; }
.mpv1-score{ text-align:center; font-size:.82rem; color:var(--graphite); margin:6px 0 0; }
.mpv1-bd svg{ display:block; width:100%; height:auto; max-width:460px; margin:0 auto; }
.mpv1-bd text{ fill:var(--ink); font-family:var(--body); }
.mpv1-bd .mpv1-bx{ fill:var(--paper); stroke:var(--ink); stroke-width:1.4; transition:fill .4s, stroke .4s; }
.mpv1-bd .mpv1-bx.mpv1-hl{ fill:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); stroke:var(--fig-k); stroke-width:2.4; }
.mpv1-bd .mpv1-w{ stroke:var(--ink); stroke-width:1.4; fill:none; transition:stroke .4s; }
.mpv1-bd .mpv1-bus{ stroke:var(--ink); stroke-width:2.2; fill:none; transition:stroke .4s; }
.mpv1-bd .mpv1-bus.mpv1-dash{ stroke-dasharray:7 5; }
.mpv1-bd .mpv1-hl.mpv1-bus, .mpv1-bd .mpv1-hl.mpv1-w{ stroke:var(--fig-k); stroke-width:3.2; }
.mpv1-bd g{ transition:opacity .45s; }
@media (prefers-reduced-motion: no-preference){ .mpv1-bd .mpv1-bus.mpv1-hl{ stroke-dasharray:10 6; animation:mpv1-flow 1s linear infinite; } }
@keyframes mpv1-flow{ to{ stroke-dashoffset:-32; } }
.mpv1-bt{ display:grid; grid-template-columns:66px minmax(0,1fr) 104px; gap:0 6px; max-width:380px; margin:0 auto; align-items:stretch; }
.mpv1-unit{ border:1.5px solid var(--ink); border-radius:10px; background:var(--paper); padding:6px 4px; text-align:center; color:var(--ink); grid-row:1 / 4; display:flex; flex-direction:column; gap:4px; justify-content:center; }
.mpv1-unit > b{ font-size:.9rem; }
.mpv1-reg{ border:1px solid var(--line); border-radius:6px; padding:3px 2px; font-size:.78rem; background:var(--paper-2); transition:background .4s, box-shadow .4s; overflow-wrap:anywhere; }
.mpv1-reg small{ display:block; color:var(--graphite); font:700 .72rem var(--body); }
.mpv1-reg.mpv1-on{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.mpv1-cell{ display:flex; gap:4px; align-items:center; border:1px solid var(--line); border-radius:6px; padding:2px 4px; font-size:.78rem; background:var(--paper-2); text-align:left; transition:background .4s, box-shadow .4s; color:var(--ink); cursor:pointer; font-family:inherit; }
.mpv1-cell small{ font:700 .78rem var(--mono); color:var(--graphite); }
.mpv1-cell.mpv1-sel{ box-shadow:0 0 0 2px var(--fig-k); } .mpv1-cell.mpv1-on{ background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.mpv1-bus{ position:relative; min-height:56px; }
.mpv1-bus > span{ display:block; font-size:.78rem; color:var(--graphite); text-align:center; padding-top:2px; transition:color .3s; }
.mpv1-bus > i{ position:absolute; left:0; right:0; top:34px; border-top:3px solid var(--line); transition:border-color .3s; }
.mpv1-bus.mpv1-dash > i{ border-top-style:dashed; }
.mpv1-bus.mpv1-on > i{ border-top-color:var(--fig-k); } .mpv1-bus.mpv1-on > span{ color:var(--ink); font-weight:700; }
.mpv1-tok{ position:absolute; top:25px; padding:1px 6px; border-radius:99px; background:var(--fig-s); color:#fff; font:700 .78rem var(--body); white-space:nowrap; }
.mpv1-tok.mpv1-r{ left:100%; transform:translateX(-100%); } .mpv1-tok.mpv1-l{ left:0; }
@media (prefers-reduced-motion: no-preference){ .mpv1-tok.mpv1-r{ animation:mpv1-goR 1.1s ease-in-out both; } .mpv1-tok.mpv1-l{ animation:mpv1-goL 1.1s ease-in-out both; } }
@keyframes mpv1-goR{ from{ left:0; transform:none; } to{ left:100%; transform:translateX(-100%); } }
@keyframes mpv1-goL{ from{ left:100%; transform:translateX(-100%); } to{ left:0; transform:none; } }
.mpv1-chips{ display:flex; gap:5px; flex-wrap:wrap; justify-content:center; margin:0 0 10px; }
.mpv1-chips button{ font:700 .84rem var(--mono); padding:5px 9px; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv1-chips button[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mpv1-chip{ display:flex; gap:10px; align-items:center; justify-content:center; margin:0 auto 10px; max-width:340px; }
.mpv1-ic{ position:relative; width:86px; height:52px; border-radius:6px; background:var(--ink); flex:none; }
.mpv1-ic::before, .mpv1-ic::after{ content:""; position:absolute; left:8px; right:8px; height:6px; background:repeating-linear-gradient(90deg, var(--graphite) 0 5px, transparent 5px 10px); }
.mpv1-ic::before{ top:-6px; } .mpv1-ic::after{ bottom:-6px; }
.mpv1-ic b{ position:absolute; left:6px; bottom:4px; font:700 .78rem var(--mono); color:var(--paper); }
.mpv1-win{ position:absolute; right:10px; top:9px; width:24px; height:24px; border-radius:50%; background:color-mix(in srgb, var(--paper) 70%, var(--fig-k)); border:2px solid var(--paper-2); transition:box-shadow .4s, background .4s; }
.mpv1-win.mpv1-uv{ background:var(--fig-k); box-shadow:0 0 12px 4px var(--fig-k); }
.mpv1-data{ flex:1; min-width:0; font-size:.82rem; color:var(--ink); }
.mpv1-data small{ display:block; color:var(--graphite); font-size:.78rem; }
.mpv1-data b{ display:block; font-size:.95rem; }
.mpv1-prog{ display:block; height:8px; border-radius:99px; background:var(--paper-2); overflow:hidden; margin-top:4px; } .mpv1-prog i{ display:block; height:100%; background:var(--fig-k); transition:width 2.4s linear; }
.mpv1-acts{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; max-width:360px; margin:0 auto; }
.mpv1-acts button{ font:600 .8rem/1.25 var(--body); padding:6px 6px; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv1-acts button:hover{ border-color:var(--fig-k); }
.mpv1-rm{ max-width:380px; margin:0 auto; display:grid; gap:6px; }
.mpv1-grp{ border-radius:8px; padding:3px 0 0; transition:background .4s; }
.mpv1-grp > small{ display:block; font-size:.78rem; font-weight:700; color:var(--graphite); margin:0 0 2px; }
.mpv1-grp > small em{ font-style:normal; color:#fff; background:var(--fig-s); border-radius:99px; padding:0 6px; margin-left:4px; }
.mpv1-rr{ display:flex; align-items:stretch; gap:4px; margin-bottom:2px; }
.mpv1-rr > u{ text-decoration:none; width:42px; flex:none; font:700 .8rem var(--mono); color:var(--fig-k); display:grid; place-items:center; }
.mpv1-rr.mpv1-flr{ flex-direction:column; gap:1px; } .mpv1-rr.mpv1-flr > u{ width:auto; place-items:start; }
.mpv1-rb{ flex:1; display:flex; border:1.5px solid var(--ink); background:var(--paper); min-width:0; }
.mpv1-rb span{ flex:1; text-align:center; font:700 .8rem var(--mono); color:var(--ink); padding:2px 0; border-left:1px solid var(--ink); min-width:0; }
.mpv1-rb span:first-child{ border-left:0; }
.mpv1-rb.mpv1-fl span{ font-size:.72rem; letter-spacing:-.04em; padding:3px 0; overflow:hidden; }
.mpv1-g0{ background:color-mix(in srgb, var(--fig-k) 12%, transparent); } .mpv1-g1{ background:color-mix(in srgb, var(--k-compiler) 14%, transparent); } .mpv1-g2{ background:color-mix(in srgb, var(--k-mm) 14%, transparent); }
@media (max-width:380px){ .mpv1-rb.mpv1-fl span{ font-size:.72rem; } }`;
  if (!document.getElementById('mpv1-css')) { const s = document.createElement('style'); s.id = 'mpv1-css'; s.textContent = CSS; document.head.appendChild(s); }
  const bdi = s => `<bdi dir="ltr">${String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/ /g, '&nbsp;')}</bdi>`;

  /* ── 0.0-0.2: people's directions → source code → compiler → executable → on/off hardware ── */
  function L1SourceToBinary({ ar }) {
    const [bits, setBits] = useState([1, 0, 1, 1, 0, 0, 1, 0]);
    const steps = [
      { on: ['hw'], en: 'Computer <b>hardware</b>, being part of a machine, can only understand two basic concepts: <b>on</b> and <b>off</b>. The on and off concept is called <b>binary</b> (on = 1, off = 0). Tap the switches.',
        ar: 'الـ <b>hardware</b> عشان هو جزء من machine، مابيفهمش غير حاجتين بس وهما الـ <b>on</b> والـ <b>off</b>. الفكرة دي اسمها <b>binary</b>، والـ on بنكتبه ' + bdi('1') + ' والـ off بنكتبه ' + bdi('0') + '. دوس على المفاتيح.' },
      { on: ['idea', 'src'], en: 'Computer <b>software</b> translates concepts and directions that people can understand into something the hardware can actually do. It tells the computer what to do and where to do it. These commands are called <b>source code</b>.',
        ar: 'الـ <b>software</b> بيترجم الأفكار والأوامر اللي البني آدم بيفهمها لحاجة الـ hardware يقدر ينفذها فعلًا. بيقول للكمبيوتر يعمل إيه ويعمله فين. والأوامر دي اسمها <b>source code</b>.' },
      { on: ['comp'], en: 'A <b>compiler</b> is another program used on the source code: it transforms the commands into a language the computer understands.',
        ar: 'الـ <b>compiler</b> برنامج تاني بيشتغل على الـ source code، وبيحوّل الأوامر للغة الكمبيوتر بيفهمها.' },
      { on: ['exe', 'hw'], en: 'The result is an <b>executable program</b> (another name for software), which the hardware runs as on and off: binary.',
        ar: 'والناتج اسمه <b>executable program</b> (اسم تاني للـ software)، والـ hardware بيشغّله على هيئة on و off يعني binary.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2800), s = steps[i];
    const cls = k => 'mpv1-node' + (k === 'comp' ? ' mpv1-tool' : '') + (s.on.includes(k) ? ' mpv1-on' : steps.slice(0, i).some(t => t.on.includes(k)) ? '' : ' mpv1-dim');
    const arrow = k => html`<div className="mpv1-dn" aria-hidden="true" style=${{ opacity: steps.slice(0, i + 1).some(t => t.on.includes(k)) ? 1 : .25 }}>↓</div>`;
    return html`<figure className="fig mpv1"><div className="fig-stage"><div className="mpv1-flow">
      <div className=${cls('idea')}><small>people</small><b>Concepts and directions</b></div>${arrow('src')}
      <div className=${cls('src')}><small>what to do and where to do it</small><b>Source code</b></div>${arrow('comp')}
      <div className=${cls('comp')}><small>another program</small><b>Compiler</b></div>${arrow('exe')}
      <div className=${cls('exe')}><small>another name for software</small><b>Executable program</b></div>${arrow('exe')}
      <div className=${cls('hw')}><small>understands only on / off</small><b>Hardware: binary</b>
        <div className="mpv1-bulbs">${bits.map((b, k) => html`<button key=${k} className=${'mpv1-bulb' + (b ? ' mpv1-lit' : '')} aria-label=${'switch ' + (k + 1) + (b ? ' on' : ' off')} aria-pressed=${String(!!b)} onClick=${() => setBits(bits.map((x, j) => j === k ? 1 - x : x))}><i></i>${b}</button>`)}</div></div>
    </div></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 1: the slide's staircase: hardware → machine → assembly → high-level → FORTRAN, C, Pascal ── */
  const L1_LAYERS = [
    { n: 'Hardware', en: 'At the bottom is the <b>hardware</b>: it only understands on and off (binary).', ar: 'تحت خالص الـ <b>hardware</b>، وده مابيفهمش غير on و off يعني binary.' },
    { n: 'Machine Language', tag: 'low-level', en: '<b>Machine language</b> (machine code): the native, elemental language of computers, a string of 0\'s and 1\'s. It is directly understood and executed by the machine.', ar: 'الـ <b>Machine language</b> (أو الـ machine code) هي اللغة الأصلية للكمبيوتر، عبارة عن سلسلة 0 و 1. والـ machine بيفهمها وينفذها على طول.' },
    { n: 'Assembly Language', tag: 'low-level', en: '<b>Assembly language</b>, also called a low-level language, is one step away from machine language: the most basic language for a processor, working only with operations implemented directly on the physical CPU.', ar: 'الـ <b>Assembly language</b> اسمها كمان low-level language، وهي خطوة واحدة بعد الـ machine language. دي أبسط لغة متاحة للـ processor، والمبرمج بيشتغل فيها بس بالعمليات اللي متنفذة مباشرة على الـ CPU الحقيقي.' },
    { n: 'High-Level Language', tag: 'high-level', en: 'A <b>high-level language</b> is machine-independent: closer to human languages and further from machine languages.', ar: 'الـ <b>High-level language</b> مش مرتبطة بنوع machine معين (machine-independent)، وهي أقرب للغة البني آدم وأبعد عن لغة الـ machine.' },
    { n: 'langs', tag: 'high-level', en: 'On top, the slide\'s high-level languages: <b>FORTRAN, C, Pascal</b> (the notes also name Java).', ar: 'وفوق خالص أمثلة الـ slide للـ high-level languages وهي <b>FORTRAN و C و Pascal</b> (والـ notes بتقول Java كمان).' }
  ];
  function L1LanguageStack({ ar }) {
    const steps = [...L1_LAYERS, { n: 'all', en: 'Machine and assembly languages are <b>low-level</b>: very close to machine languages. High-level languages are closer to human languages. Tap a layer to read it again.', ar: 'الـ machine language والـ assembly language الاتنين <b>low-level</b> لأنهم قريبين جدًا من لغة الـ machine، أما الـ high-level فأقرب للغة البني آدم. دوس على أي طبقة تقراها تاني.' }];
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    const all = i === steps.length - 1;
    const lay = (L, k, inner) => html`<button key=${k} className=${'mpv1-lay' + (i === k ? ' mpv1-on' : '') + (k > i ? ' mpv1-hide' : '')} style=${{ marginLeft: k * 14 + 'px' }} onClick=${() => ctl.go(k)}>${inner || html`<span>${L.n}</span>`}${all && L.tag ? html`<em>${L.tag}</em>` : null}</button>`;
    return html`<figure className="fig mpv1"><div className="fig-stage">
      <div className="mpv1-stack">
        ${L1_LAYERS.slice(0, 4).map((L, k) => lay(L, k))}
        <div className="mpv1-langs" style=${{ marginLeft: 56 + 'px' }}>${['FORTRAN', 'C', 'Pascal'].map(n => html`<button key=${n} className=${'mpv1-lay' + (i === 4 ? ' mpv1-on' : '') + (4 > i ? ' mpv1-hide' : '')} onClick=${() => ctl.go(4)}><span>${n}</span></button>`)}</div>
      </div>
      <div className=${'mpv1-axis ' + pop(all)}><span>↓ closer to the machine</span><span>closer to human languages ↑</span></div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 2.0: hardware dependent: each CPU type needs its own assembler ── */
  function L1CpuAssemblerMatch({ ar }) {
    const [asm, setAsm] = useState(1), [cpu, setCpu] = useState(2);
    const ok = asm === cpu;
    const en = ok ? `The assembler for CPU type ${asm} produces CPU type ${asm}'s machine language, so the program <b>runs</b> on CPU type ${cpu}.`
      : `The assembler for CPU type ${asm} produces CPU type ${asm}'s machine language. CPU type ${cpu} has its own machine language and assembly language, so the program <b>won't run</b> on it: assembly is <b>hardware dependent</b>, and different manufacturers need different assemblers.`;
    const a = ok ? `الـ assembler بتاع الـ CPU رقم ${bdi(asm)} بيطلّع الـ machine language بتاعة نفس النوع، فالبرنامج <b>هيشتغل</b> على الـ CPU رقم ${bdi(cpu)}.`
      : `الـ assembler بتاع الـ CPU رقم ${bdi(asm)} بيطلّع الـ machine language بتاعة النوع ده بس. والـ CPU رقم ${bdi(cpu)} ليه الـ machine language والـ assembly language بتوعه، فالبرنامج <b>مش هيشتغل</b> عليه. عشان كده الـ assembly اسمها <b>hardware dependent</b>، والشركات المختلفة محتاجة assemblers مختلفة.`;
    const tb = (v, set, n) => html`<button className="fig-btn" aria-pressed=${String(v === n)} onClick=${() => set(n)}>CPU type ${n}</button>`;
    return html`<figure className="fig mpv1"><div className="fig-stage">
      <div className="mpv1-pick"><span>Assemble with</span><div>${tb(asm, setAsm, 1)}${tb(asm, setAsm, 2)}</div><span>Run on</span><div>${tb(cpu, setCpu, 1)}${tb(cpu, setCpu, 2)}</div></div>
      <div className="mpv1-flow">
        <div className="mpv1-node"><small>one program</small><b>Assembly source code</b><span className="mpv1-mn">MOV</span><span className="mpv1-mn">ADD</span></div><div className="mpv1-dn" aria-hidden="true">↓</div>
        <div className="mpv1-node mpv1-tool"><small>translator</small><b>Assembler for CPU type ${asm}</b></div><div className="mpv1-dn" aria-hidden="true">↓</div>
        <div className="mpv1-node"><small>0's and 1's</small><b>Machine language of CPU type ${asm}</b></div><div className="mpv1-dn" aria-hidden="true">↓</div>
        <div className=${'mpv1-node ' + (ok ? 'mpv1-on' : '')}><small>hardware</small><b>CPU type ${cpu}</b></div></div>
      <div className=${'mpv1-res ' + (ok ? 'mpv1-ok' : 'mpv1-bad')}>${ok ? '✓ Runs' : '✗ Won\'t run: wrong machine language'}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── 2.2-2.3: the slide's figure, Source code (.ASM) → ASSEMBLER → Object code (.OBJ) → Hardware, plus the linker's .EXE ── */
  function L1AsmObjExe({ ar }) {
    const steps = [
      { on: 'src', en: '<b>Source code (.ASM)</b>: assembly has the same structure and commands as machine language, but uses names instead of numbers (mnemonics such as MOV, ADD). Every assembly program is saved as <b>.ASM</b>.',
        ar: 'الـ <b>Source code</b> بيتحفظ ' + bdi('.ASM') + '. الـ assembly ليها نفس الـ structure ونفس الأوامر بتاعة الـ machine language، بس بتستخدم أسامي بدل الأرقام (mnemonics زي MOV و ADD).' },
      { on: 'asm', en: 'To run, the program must be translated into machine code by the <b>assembler</b>: a program that translates a low-level program ("source code") into executable code ("object code").',
        ar: 'عشان البرنامج يشتغل لازم يتترجم لـ machine code عن طريق الـ <b>assembler</b>، وده برنامج بيترجم البرنامج المكتوب بـ low-level language ("source code") لكود executable ("object code").' },
      { on: 'obj', en: '<b>Object code (.OBJ)</b>: the coded object modules, machine code made of 0\'s and 1\'s.',
        ar: 'الـ <b>Object code</b> في ملف ' + bdi('.OBJ') + '، وفيه الـ coded object modules يعني machine code من 0 و 1.' },
      { on: 'lnk', en: 'From the revision sheet: the <b>linker</b> then produces the <b>.EXE</b> file.',
        ar: 'ومن الـ revision sheet، الـ <b>linker</b> بعد كده بيطلّع ملف الـ ' + bdi('.EXE') + '.' },
      { on: 'hw', en: 'The <b>hardware</b> runs it. The slide\'s figure in one line: Source code → ASSEMBLER → Object code → HARDWARE.',
        ar: 'وفي الآخر الـ <b>hardware</b> بيشغّله. رسمة الـ slide في سطر واحد:<span class="ltr">Source code → ASSEMBLER → Object code → HARDWARE</span>' }
    ];
    const K = ['src', 'asm', 'obj', 'lnk', 'hw'];
    const [i, ctl] = useSteps(steps.length, 2600), at = K.indexOf(steps[i].on);
    const cls = (k, tool) => 'mpv1-node' + (tool ? ' mpv1-tool' : '') + (K.indexOf(k) === at ? ' mpv1-on' : K.indexOf(k) > at ? ' mpv1-dim' : '');
    const dn = k => html`<div className="mpv1-dn" aria-hidden="true" style=${{ opacity: K.indexOf(k) <= at ? 1 : .25 }}>↓</div>`;
    return html`<figure className="fig mpv1"><div className="fig-stage"><div className="mpv1-flow">
      <div className=${cls('src')}><small>names instead of numbers</small><b>Source code (.ASM)</b><span className="mpv1-mn">MOV</span><span className="mpv1-mn">ADD</span></div>${dn('asm')}
      <div className=${cls('asm', 1)}><small>translator</small><b>ASSEMBLER</b></div>${dn('obj')}
      <div className=${cls('obj')}><small>0's and 1's</small><b>Object code (.OBJ)</b></div>${dn('lnk')}
      <div className=${cls('lnk', 1)}><small>revision sheet</small><b>Linker → .EXE</b></div>${dn('hw')}
      <div className=${cls('hw')}><small>runs the program</small><b>HARDWARE</b></div>
    </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 3: debugger vs assembler, sorted by the student into the slide's table ── */
  const L1_DA = [
    ['Easy to run', 'd', 'سهل في التشغيل'], ['Isolated from the machine', 'a', 'معزول عن الـ machine'], ['Low overhead programs', 'd', 'برامج الـ overhead فيها قليل'],
    ['Good on long programs', 'a', 'كويس مع البرامج الطويلة'], ['Runs the program step by step to find the exact location of an error', 'd', 'بيشغّل البرنامج step by step عشان تلاقي مكان الـ error بالظبط'],
    ['Hard to run', 'a', 'صعب في التشغيل'], ['Close to the machine', 'd', 'قريب من الـ machine'], ['Translates low-level source code into executable object code', 'a', 'بيترجم الـ source code لـ object code'],
    ['More program overhead', 'a', 'الـ overhead في البرنامج أكتر'], ['Good on short programs', 'd', 'كويس مع البرامج القصيرة']
  ];
  function L1DebuggerAssemblerSort({ ar }) {
    const [done, setDone] = useState(0), [miss, setMiss] = useState(0), [shake, setShake] = useState(false), [last, setLast] = useState(-1);
    const cur = L1_DA[done], fin = done >= L1_DA.length;
    const pick = c => { if (fin) return; if (c === cur[1]) { setLast(done); setDone(done + 1); setShake(false); } else { setMiss(miss + 1); setShake(false); setTimeout(() => setShake(true), 10); } };
    const col = c => L1_DA.slice(0, done).map((x, k) => [x, k]).filter(([x]) => x[1] === c);
    let en, a;
    if (fin) { en = `Done${miss ? ` with ${miss} wrong ${miss === 1 ? 'try' : 'tries'}` : ' with no mistakes'}. In one line: the assembler is hard to run, has more overhead, is isolated from the machine and is good on long programs; the debugger is the opposite.`;
      a = 'خلصت. في سطر واحد: الـ assembler صعب في التشغيل والـ overhead فيه أكتر ومعزول عن الـ machine وكويس مع البرامج الطويلة، والـ debugger عكسه.'; }
    else if (shake) { en = `Not that one. "${cur[0]}": try the other column.`; a = `لأ، جرّب العمود التاني. المعنى: ${cur[2]}.`; }
    else { en = `Debugger or assembler? Statement ${done + 1} of ${L1_DA.length}.`; a = `ده بتاع الـ debugger ولا الـ assembler؟ المعنى: ${cur[2]}.`; }
    return html`<figure className="fig mpv1"><div className="fig-stage">
      <div className=${'mpv1-card' + (shake ? ' mpv1-shake' : '')}>${fin ? '✓ All sorted' : cur[0]}</div>
      <div className="mpv1-row"><button className="fig-btn solid" disabled=${fin} onClick=${() => pick('d')}>Debugger</button><button className="fig-btn solid" disabled=${fin} onClick=${() => pick('a')}>Assembler</button></div>
      <table className="mpv1-tbl"><thead><tr><th>Debugger</th><th>Assembler</th></tr></thead>
        <tbody><tr>${['d', 'a'].map(c => html`<td key=${c}>${col(c).map(([x, k]) => html`<div key=${k} className=${k === last ? 'mpv1-new' : ''}>${x[0]}</div>`)}</td>`)}</tr></tbody></table>
      <p className="mpv1-score">${done} / ${L1_DA.length} sorted${miss ? ` · ${miss} wrong` : ''}</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setDone(L1_DA.length); setLast(-1); setShake(false); }} disabled=${fin}>Show the table</button><button className="fig-btn" onClick=${() => { setDone(0); setMiss(0); setShake(false); setLast(-1); }}>↻ Start over</button></div></figure>`;
  }

  /* ── 4.1-4.6, 5: the slide's microcomputer block diagram, built part by part ── */
  function L1BlockDiagram({ ar }) {
    const steps = [
      { k: 'cpu', en: 'The <b>CPU</b> is where all calculations and logic operations take place. It contains a limited number of storage locations called <b>registers</b>, a high-frequency <b>clock</b>, a control unit (<b>CU</b>) and an arithmetic logic unit (<b>ALU</b>).',
        ar: 'الـ <b>CPU</b> هو المكان اللي كل الحسابات والـ logic operations بتحصل فيه. جواه عدد محدود من أماكن التخزين اسمها <b>registers</b>، وclock بتردد عالي، والـ <b>CU</b> والـ <b>ALU</b>.' },
      { k: 'alu', en: '<b>ALU</b>: performs arithmetic operations (addition, subtraction) and logical operations (AND, OR, NOT).', ar: 'الـ <b>ALU</b> بيعمل العمليات الحسابية (جمع وطرح) والعمليات المنطقية زي AND و OR و NOT.' },
      { k: 'cu', en: '<b>CU</b> (control unit): coordinates the sequencing of steps involved in executing machine instructions.', ar: 'الـ <b>CU</b> (control unit) بينظّم ترتيب الخطوات اللي محتاجينها عشان ننفذ الـ machine instructions.' },
      { k: 'clk', en: '<b>Clock</b>: synchronizes the internal operations of the CPU with other system components (the basic timing for processor operation and bus control activity).', ar: 'الـ <b>Clock</b> بيعمل synchronize للعمليات الداخلية للـ CPU مع باقي أجزاء السيستم (التوقيت الأساسي لشغل الـ processor ولنشاط التحكم في الـ bus).' },
      { k: 'mem', en: '<b>Memory storage unit</b>: where instructions and data are held while a program is running. It receives requests for data from the CPU and transfers data from RAM to the CPU and from the CPU into memory.', ar: 'الـ <b>Memory storage unit</b> هو المكان اللي الـ instructions والداتا بتفضل فيه وهو البرنامج شغال. بيستقبل طلبات الداتا من الـ CPU، وبينقل الداتا من الـ RAM للـ CPU ومن الـ CPU للـ memory.' },
      { k: 'io', en: '<b>I/O Device #1</b> and <b>I/O Device #2</b> sit next to the memory, on the same buses.', ar: 'وجنب الـ memory فيه جهازين للـ input والـ output وهما ' + bdi('I/O Device #1') + ' و ' + bdi('I/O Device #2') + '، على نفس الـ buses.' },
      { k: 'data', en: 'A <b>bus</b> is a group of parallel wires that transfer data from one part of the computer to another. The <b>data bus</b> (top) transfers instructions and data between the CPU and memory.', ar: 'الـ <b>bus</b> مجموعة أسلاك متوازية بتنقل الداتا من جزء في الكمبيوتر لجزء تاني. والـ <b>data bus</b> (فوق) بينقل الـ instructions والداتا بين الـ CPU والـ memory.' },
      { k: 'ctrl', en: 'The <b>control bus</b> (dashed) uses binary signals to synchronize the actions of all devices attached to the system bus.', ar: 'الـ <b>control bus</b> (المتقطع) بيستخدم binary signals عشان يعمل synchronize لكل الأجهزة المتوصلة بالـ system bus.' },
      { k: 'addr', en: 'The <b>address bus</b> (bottom) holds the addresses of instructions and data when the executing instruction transfers data between the CPU and memory. This is the whole diagram to draw.', ar: 'الـ <b>address bus</b> (تحت) شايل الـ addresses بتاعة الـ instructions والداتا لما الـ instruction تنقل داتا بين الـ CPU والـ memory. وكده دي الرسمة كلها اللي مطلوب ترسمها.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2700), k = steps[i].k;
    const seen = n => steps.findIndex(s => s.k === n) <= i;
    const hl = (...n) => n.includes(k) ? ' mpv1-hl' : '';
    const op = n => ({ opacity: seen(n) ? 1 : 0 });
    const T = (x, y, t, o) => html`<text x=${x} y=${y} textAnchor="middle" fontSize="13" ...${o || {}}>${t}</text>`;
    const box = (x, w, lines, part) => html`<g style=${op(part)}><rect className=${'mpv1-bx' + hl(part)} x=${x} y="44" width=${w} height="124" rx="3" />
      ${lines.map((l, j) => T(x + w / 2, 96 + j * 16 - (lines.length - 1) * 8, l, { key: j }))}</g>`;
    const stubs = (x, part) => html`<g style=${op(part)}><line className="mpv1-w" x1=${x} y1="24" x2=${x} y2="44" style=${op('data')} /><line className="mpv1-w" x1=${x - 8} y1="168" x2=${x - 8} y2="198" style=${op('ctrl')} /><line className="mpv1-w" x1=${x + 8} y1="168" x2=${x + 8} y2="226" style=${op('addr')} /></g>`;
    return html`<figure className="fig mpv1"><div className="fig-stage mpv1-bd">
      <svg viewBox="0 0 300 240" role="img" aria-label="Microcomputer block diagram: CPU with registers, ALU, CU and clock; memory storage unit; two I/O devices; data bus, control bus and address bus">
        <g style=${op('data')}>${T(150, 15, 'data bus', { fontWeight: 700 })}<line className=${'mpv1-bus' + hl('data')} x1="4" y1="24" x2="296" y2="24" /></g>
        <g style=${op('ctrl')}>${T(42, 192, 'control bus', { fontWeight: 700 })}<line className=${'mpv1-bus mpv1-dash' + hl('ctrl')} x1="4" y1="198" x2="296" y2="198" /></g>
        <g style=${op('addr')}>${T(42, 220, 'address bus', { fontWeight: 700 })}<line className=${'mpv1-bus' + hl('addr')} x1="4" y1="226" x2="296" y2="226" /></g>
        <g style=${op('cpu')}><rect className=${'mpv1-bx' + hl('cpu')} x="4" y="44" width="112" height="124" rx="3" />
          ${T(60, 62, 'CPU', { fontWeight: 700 })}
          <rect className=${'mpv1-bx' + hl('cpu')} x="16" y="72" width="88" height="24" rx="2" />${T(60, 89, 'registers')}
          <rect className=${'mpv1-bx' + hl('alu')} x="8" y="134" width="32" height="26" rx="2" />${T(24, 152, 'ALU')}
          <rect className=${'mpv1-bx' + hl('cu')} x="42" y="134" width="30" height="26" rx="2" />${T(57, 152, 'CU')}
          <rect className=${'mpv1-bx' + hl('clk')} x="74" y="134" width="38" height="26" rx="2" />${T(93, 152, 'clock')}
          <line className="mpv1-w" x1="60" y1="24" x2="60" y2="44" style=${op('data')} />
          <line className="mpv1-w" x1="98" y1="168" x2="98" y2="198" style=${op('ctrl')} /><line className="mpv1-w" x1="108" y1="168" x2="108" y2="226" style=${op('addr')} /></g>
        ${box(122, 58, ['Memory', 'Storage', 'Unit'], 'mem')}${stubs(151, 'mem')}
        ${box(186, 52, ['I/O', 'Device', '#1'], 'io')}${stubs(212, 'io')}
        ${box(244, 52, ['I/O', 'Device', '#2'], 'io')}${stubs(270, 'io')}
      </svg></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 5.1-5.3 with 4.6: one transfer between CPU and memory, bus by bus ── */
  const L1_MEM0 = ['instruction 1', 'instruction 2', 'data X', 'data Y'];
  function L1Transfer({ op, cell, before, after, ar }) {
    const read = op === 'read';
    const steps = [
      { en: read ? `The CPU requests the contents of memory location <b>#${cell}</b>.` : `The CPU sends its register (<b>${before.reg}</b>) to memory location <b>#${cell}</b>.`,
        ar: read ? `الـ CPU عايز اللي في الـ memory location رقم ${bdi('#' + cell)}.` : `الـ CPU عايز يبعت اللي في الـ register بتاعه (${before.reg}) للـ memory location رقم ${bdi('#' + cell)}.` },
      { en: `<b>Address bus</b>: holds the address <b>#${cell}</b> of the ${read && cell < 2 ? 'instruction' : 'data'} being transferred between the CPU and memory.`,
        ar: `الـ <b>address bus</b> شايل الـ address رقم ${bdi('#' + cell)} بتاع ${read && cell < 2 ? 'الـ instruction' : 'الداتا'} اللي بتتنقل بين الـ CPU والـ memory.` },
      { en: `<b>Control bus</b>: a binary signal (${op}) synchronizes the CPU and the memory for this transfer.`,
        ar: `الـ <b>control bus</b> بيبعت binary signal (${op}) عشان الـ CPU والـ memory يبقوا synchronized في النقلة دي.` },
      { en: read ? `<b>Data bus</b>: "${before.mem[cell]}" travels from memory to the CPU register. The data bus transfers instructions and data between the CPU and memory.` : `<b>Data bus</b>: "${before.reg}" travels from the CPU into memory location #${cell}.`,
        ar: read ? `الـ <b>data bus</b> بينقل "${before.mem[cell]}" من الـ memory للـ register اللي في الـ CPU. والـ data bus هو اللي بينقل الـ instructions والداتا بين الـ CPU والـ memory.` : `الـ <b>data bus</b> بينقل "${before.reg}" من الـ CPU للـ memory location رقم ${bdi('#' + cell)}.` }
    ];
    const [i, ctl] = useSteps(steps.length, 1900), st = i >= 3 ? after : before;
    const bus = (n, j, tok, dir, dash) => html`<div className=${'mpv1-bus' + (dash ? ' mpv1-dash' : '') + (i === j ? ' mpv1-on' : '')}><span>${n}</span><i></i>
      ${i >= j && html`<b key=${j + '-' + i} className=${'mpv1-tok ' + (i === j ? dir : dir === 'mpv1-r' ? 'mpv1-r' : 'mpv1-l')} style=${i > j ? { animation: 'none', opacity: .55 } : null}>${tok}</b>`}</div>`;
    return html`<div>
      <div className="mpv1-bt">
        <div className="mpv1-unit" style=${{ gridColumn: 1 }}><b>CPU</b><div className=${'mpv1-reg' + (i === 3 && read ? ' mpv1-on' : '')}><small>register</small>${st.reg}</div></div>
        <div style=${{ gridColumn: 2, gridRow: 1 }}>${bus('data bus', 3, read ? before.mem[cell] : before.reg, read ? 'mpv1-l' : 'mpv1-r')}</div>
        <div style=${{ gridColumn: 2, gridRow: 2 }}>${bus('control bus', 2, op, 'mpv1-r', 1)}</div>
        <div style=${{ gridColumn: 2, gridRow: 3 }}>${bus('address bus', 1, '#' + cell, 'mpv1-r')}</div>
        <div className="mpv1-unit" style=${{ gridColumn: 3 }}><b>Memory</b>${st.mem.map((m, k) => html`<div key=${k} className=${'mpv1-cell' + (k === cell && i >= 1 ? ' mpv1-sel' : '') + (k === cell && i === 3 && !read ? ' mpv1-on' : '')}><small>#${k}</small>${m}</div>`)}</div>
      </div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function L1BusReadWrite({ ar }) {
    const [st, setSt] = useState({ mem: L1_MEM0, reg: 'result', op: 'read', cell: 2, run: 0, before: { mem: L1_MEM0, reg: 'result' }, after: { mem: L1_MEM0, reg: 'data X' } });
    const go = (op, cell) => setSt(p => { const before = { mem: p.after.mem, reg: p.after.reg };
      const after = op === 'read' ? { mem: before.mem, reg: before.mem[cell] } : { mem: before.mem.map((m, k) => k === cell ? before.reg : m), reg: before.reg };
      return { op, cell, run: p.run + 1, before, after }; });
    const [cell, setCell] = useState(2);
    return html`<figure className="fig mpv1"><div className="fig-stage">
      <div className="mpv1-row"><span className="mpv1-lbl">Memory location</span>${[0, 1, 2, 3].map(c => html`<button key=${c} className="fig-btn" aria-pressed=${String(cell === c)} onClick=${() => setCell(c)}>#${c}</button>`)}</div>
      <div className="mpv1-row"><button className="fig-btn solid" onClick=${() => go('read', cell)}>Read: memory → CPU</button><button className="fig-btn solid" onClick=${() => go('write', cell)}>Write: CPU → memory</button></div>
      <${L1Transfer} key=${st.run} op=${st.op} cell=${st.cell} before=${st.before} after=${st.after} ar=${ar} /></div></figure>`;
  }

  /* ── 6: memory chip lab: try to write, power off, UV-erase and program each type ── */
  const L1_CHIPS = {
    RAM: { full: 'Random Access Memory', d0: 'empty', win: false },
    ROM: { full: 'Read Only Memory', d0: 'data written once', win: false },
    PROM: { full: 'Programmable ROM', d0: 'blank', win: false },
    EPROM: { full: 'Erasable Programmable ROM', d0: 'old data', win: true },
    EEPROM: { full: 'Electrically Erasable PROM', d0: 'firmware (BIOS)', win: false }
  };
  const L1_ACTS = [['board', 'Write on the circuit board'], ['power', 'Remove the power, then restore it'], ['uv', 'Remove the chip, shine UV light'], ['prog', 'Write with a PROM programmer']];
  function l1ChipAct(t, s, a) {
    const r = (ok, en, ar, d, extra) => ({ ok, en, ar, s: Object.assign({}, s, d !== undefined ? { d } : {}, extra || {}) });
    const onlyE = r('no', 'Nothing changes: only the <b>EPROM</b> is erased by ultraviolet light, through its small transparent window.', 'مفيش حاجة اتغيّرت، لأن الـ <b>EPROM</b> بس هو اللي بيتمسح بالـ ultraviolet light من الشباك الشفاف الصغير بتاعه.');
    if (a === 'power') return t === 'RAM' ? r('no', 'RAM is <b>volatile</b>: removing the power loses the data.', 'الـ RAM <b>volatile</b>، يعني لما الكهربا تتشال الداتا بتضيع.', 'empty')
      : r('ok', `The data stays: it is stored permanently, even when the power is removed.`, 'الداتا لسه موجودة، لأنها متخزنة بشكل دائم حتى لو الكهربا اتشالت.');
    if (t === 'RAM') return a === 'board' ? r('ok', 'Written. RAM is used for reading and writing data in any order, as required by the processor.', 'اتكتبت. الـ RAM بتستخدم للقراية والكتابة بأي ترتيب حسب ما الـ processor محتاج.', 'new data')
      : a === 'uv' ? onlyE : r('nt', 'Not needed: the processor itself reads and writes RAM, in any order.', 'مش محتاجين ده، الـ processor نفسه بيقرا ويكتب في الـ RAM بأي ترتيب.');
    if (t === 'ROM') return a === 'uv' ? onlyE : r('no', 'Refused: in ROM the data is written once and then not changed.', 'مش هينفع، لأن في الـ ROM الداتا بتتكتب مرة واحدة وبعد كده ماتتغيرش.');
    if (t === 'PROM') return a === 'uv' ? onlyE : a === 'board' ? r('no', 'Refused: PROM data is written into the chip <b>before</b> it is installed in the circuit, using a PROM programmer.', 'مش هينفع، لأن الـ PROM الداتا بتتكتب فيه <b>قبل</b> ما يتركب في الـ circuit باستخدام PROM programmer.')
      : s.w ? r('no', 'Refused: a PROM can only be written <b>once</b>.', 'مش هينفع، لأن الـ PROM بيتكتب <b>مرة واحدة</b> بس.') : r('ok', 'Written with the PROM programmer, before installing the chip. This was its one and only write.', 'اتكتب بالـ PROM programmer قبل ما الـ chip يتركب، ودي كانت الكتابة الوحيدة ليه.', 'new data', { w: true });
    if (t === 'EPROM') return a === 'board' ? r('no', 'Refused: to rewrite an EPROM you must remove the chip from the board.', 'مش هينفع، عشان تكتب في الـ EPROM تاني لازم تشيل الـ chip من الـ board.')
      : a === 'uv' ? r('ok', 'Erased: the chip was removed from the board and exposed to <b>ultraviolet light</b> through its transparent window.', 'اتمسح، الـ chip اتشال من الـ board واتعرض لـ <b>ultraviolet light</b> من الشباك الشفاف بتاعه.', 'erased (blank)', { uv: true })
      : s.d === 'erased (blank)' ? r('ok', 'Rewritten: after the UV erase, the chip is plugged into a PROM programmer. EPROMs are used for prototypes and small production runs.', 'اتكتب تاني، بعد المسح بالـ UV الـ chip بيدخل الـ PROM programmer. والـ EPROM بيستخدم في الـ prototypes والإنتاج الصغير.', 'new data', { uv: false })
        : r('no', 'Erase it first: expose the chip to ultraviolet light, then use the PROM programmer.', 'امسحه الأول بالـ ultraviolet light، وبعدين استخدم الـ PROM programmer.');
    return a === 'board' ? r('ok', 'Rewritten <b>electrically while on the circuit board</b>, but slowly. That is why EEPROM holds firmware such as the BIOS: it can be updated.', 'اتكتب تاني <b>بالكهربا وهو على الـ circuit board</b>، بس الكتابة بطيئة. وعشان كده الـ EEPROM بيشيل الـ firmware زي الـ BIOS عشان يتعمله update.', 'updated firmware (BIOS)')
      : a === 'uv' ? onlyE : r('nt', 'Not needed: an EEPROM is rewritten electrically while it stays on the circuit board.', 'مش محتاجين ده، الـ EEPROM بيتكتب بالكهربا وهو لسه على الـ circuit board.');
  }
  function L1MemoryChipLab({ ar }) {
    const fresh = () => Object.fromEntries(Object.keys(L1_CHIPS).map(k => [k, { d: L1_CHIPS[k].d0, w: k !== 'PROM', uv: false }]));
    const [t, setT] = useState('EPROM'), [S, setS] = useState(fresh), [msg, setMsg] = useState(null), [slow, setSlow] = useState(0);
    const C = L1_CHIPS[t], s = S[t];
    useEffect(() => { if (!slow) return; const id = setTimeout(() => setSlow(0), calm() ? 0 : 2500); return () => clearTimeout(id); }, [slow]);
    const act = a => { if (slow) return; const r = l1ChipAct(t, s, a); setS(Object.assign({}, S, { [t]: r.s })); setMsg(Object.assign({ a }, r)); if (t === 'EEPROM' && a === 'board') setSlow(Date.now()); };
    const en = msg ? msg.en : `<b>${t}</b> (${C.full}). Try each action and see what the chip allows.`;
    const a = msg ? msg.ar : `الـ <b>${t}</b> اختصار ${C.full}. جرّب كل action وشوف الـ chip بيسمح بإيه.`;
    const res = msg && (msg.ok === 'ok' ? '✓ ' : msg.ok === 'no' ? '✗ ' : '');
    return html`<figure className="fig mpv1"><div className="fig-stage">
      <div className="mpv1-chips">${Object.keys(L1_CHIPS).map(k => html`<button key=${k} aria-pressed=${String(k === t)} onClick=${() => { setT(k); setMsg(null); setSlow(0); }}>${k}</button>`)}</div>
      <div className="mpv1-chip"><div className="mpv1-ic" aria-hidden="true"><b>${t}</b>${C.win ? html`<span className=${'mpv1-win' + (s.uv ? ' mpv1-uv' : '')}></span>` : null}</div>
        <div className="mpv1-data"><small>${C.full}</small><small>contents</small><b>${slow ? 'writing…' : s.d}</b>${t === 'EEPROM' && html`<span className="mpv1-prog"><i style=${{ width: slow ? '100%' : '0%', transition: slow && !calm() ? 'width 2.4s linear' : 'none' }}></i></span>`}</div></div>
      <div className="mpv1-acts">${L1_ACTS.map(([k, l]) => html`<button key=${k} onClick=${() => act(k)} disabled=${!!slow}>${l}</button>`)}</div>
      ${msg && html`<div className=${'mpv1-res ' + (msg.ok === 'ok' ? 'mpv1-ok' : msg.ok === 'no' ? 'mpv1-bad' : 'mpv1-nt')}>${res}${L1_ACTS.find(x => x[0] === msg.a)[1]}</div>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setS(fresh()); setMsg(null); setSlow(0); }}>↻ Reset the chips</button></div></figure>`;
  }

  /* ── 7.0, 7.2: the slide's register map, in the slide's five groups or the lab's three types ── */
  const L1_FLAGS = ['', '', '', '', 'OF', 'DF', 'IF', 'TF', 'SF', 'ZF', '', 'AF', '', 'PF', '', 'CF'];
  const L1_RGROUPS = [
    { n: 'General Registers', lab: 0, rows: [['AX', 'AH', 'AL'], ['BX', 'BH', 'BL'], ['CX', 'CH', 'CL'], ['DX', 'DH', 'DL']] },
    { n: 'Index Registers', lab: 0, rows: [['SI', 'SI'], ['DI', 'DI']] },
    { n: 'Pointer Registers', lab: 0, rows: [['BP', 'BP'], ['SP', 'SP']] },
    { n: 'Control Registers', lab: 1, rows: [['IP', 'IP'], ['FLAGS']] },
    { n: 'Segment Registers', lab: 2, rows: [['CS', 'CS'], ['DS', 'DS'], ['SS', 'SS'], ['ES', 'ES']] }
  ];
  const L1_LAB = ['General purpose', 'Special purpose', 'Segment'];
  function L1RegisterMap({ ar }) {
    const [lab, setLab] = useState(false);
    const row = (r, k) => html`<div key=${k} className=${'mpv1-rr' + (r[0] === 'FLAGS' ? ' mpv1-flr' : '')}>${lab ? html`<u>${r[0]}</u>` : null}
      ${r[0] === 'FLAGS' ? html`<div className="mpv1-rb mpv1-fl">${L1_FLAGS.map((f, j) => html`<span key=${j}>${f}</span>`)}</div>` : html`<div className="mpv1-rb">${r.slice(1).map(x => html`<span key=${x}>${x}</span>`)}</div>`}</div>`;
    const en = lab ? 'Lab 1 sorts the same registers into three types: <b>(1) general purpose</b> AX, BX, CX, DX, SI, DI, SP, BP; <b>(2) special purpose</b> IP, FLAGS; <b>(3) segment</b> CS, DS, ES, SS. Details in Lecture 2.'
      : 'A <b>register</b> is a high speed temporary storage area built into a CPU, and each register has a specific length. The slide draws them in five groups: general, index, pointer, control (IP and the flags) and segment registers.';
    const a = lab ? 'الـ Lab 1 بيقسّم نفس الـ registers لتلات أنواع: <b>(1) الـ general purpose</b> وهما AX و BX و CX و DX و SI و DI و SP و BP، وبعدين <b>(2) الـ special purpose</b> وهما IP و FLAGS، وأخيرًا <b>(3) الـ segment</b> وهما CS و DS و ES و SS. التفاصيل في Lecture 2.'
      : 'الـ <b>register</b> مكان تخزين مؤقت سريع جدًا جوه الـ CPU، وكل register ليه طول معين. الـ slide راسماهم في خمس مجموعات: الـ general والـ index والـ pointer والـ control (الـ IP والـ flags) والـ segment registers.';
    let blocks;
    if (!lab) blocks = L1_RGROUPS.map((g, k) => html`<div key=${k} className="mpv1-grp"><small>${g.n}</small>${g.rows.map(row)}</div>`);
    else blocks = L1_LAB.map((n, k) => html`<div key=${n} className=${'mpv1-grp mpv1-g' + k}><small>${'(' + (k + 1) + ') ' + n}<em>${L1_RGROUPS.filter(g => g.lab === k).reduce((c, g) => c + g.rows.length, 0)}</em></small>${L1_RGROUPS.filter(g => g.lab === k).flatMap(g => g.rows).map(row)}</div>`);
    return html`<figure className="fig mpv1"><div className="fig-stage">
      <div className="mpv1-row"><button className="fig-btn" aria-pressed=${String(!lab)} onClick=${() => setLab(false)}>Slide: 5 groups</button><button className="fig-btn" aria-pressed=${String(lab)} onClick=${() => setLab(true)}>Lab 1: 3 types</button></div>
      <div className="mpv1-rm">${blocks}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'mp-l1-source-to-binary': L1SourceToBinary, 'mp-l1-language-stack': L1LanguageStack, 'mp-l1-cpu-assembler-match': L1CpuAssemblerMatch,
    'mp-l1-asm-obj-exe': L1AsmObjExe, 'mp-l1-debugger-assembler-sort': L1DebuggerAssemblerSort, 'mp-l1-block-diagram': L1BlockDiagram,
    'mp-l1-bus-read-write': L1BusReadWrite, 'mp-l1-memory-chip-lab': L1MemoryChipLab, 'mp-l1-register-map': L1RegisterMap
  });
})();
/* ── part L2 ── */
// Microprocessors visuals, Lecture 2 (Registers and the MOV instruction): the register classification tree, EAX/AX/AH/AL, the Lab AX example, the programming model, segments in memory, the EFLAGS bits, Z/S/C/O after an addition, PC/MAR/MBR/IR in a fetch, a register sorting drill and a MOV simulator (slides Lec_02). Every label and number comes from the site's notes.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop } = window.FIGKIT;
  const CSS = `
.mpv2 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mpv2-tree{ max-width:440px; margin:0 auto; }
.mpv2-root{ width:max-content; margin:0 auto 12px; padding:8px 18px; border-radius:99px; border:2px solid var(--fig-k); background:var(--paper); font-weight:700; color:var(--ink); }
.mpv2-fork{ height:16px; margin:0 25%; border:2px solid var(--fig-k); border-bottom:0; border-radius:8px 8px 0 0; position:relative; }
.mpv2-fork::before{ content:""; position:absolute; left:50%; top:-14px; height:12px; border-left:2px solid var(--fig-k); }
.mpv2-kinds{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:10px; }
.mpv2-kind{ text-align:center; font-weight:700; font-size:.88rem; color:var(--ink); line-height:1.25; }
.mpv2-leaves{ display:flex; flex-direction:column; gap:6px; margin:8px 0 0 6px; padding-left:8px; border-left:2px solid var(--fig-k); }
.mpv2-leaf{ font:inherit; font-size:.84rem; line-height:1.2; padding:7px 6px; border-radius:99px; border:1px solid var(--fig-k); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv2-leaf.mpv2-on{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mpv2-split{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:5px; max-width:440px; margin:0 auto 10px; }
.mpv2-bits{ text-align:center; font:.75rem var(--mono); color:var(--graphite); }
.mpv2-blk{ border:1.5px solid var(--ink); border-radius:6px; background:var(--paper); text-align:center; padding:5px 2px; color:var(--ink); transition:background .4s, opacity .5s; min-width:0; }
.mpv2-blk b{ display:block; font:700 1rem var(--mono); } .mpv2-blk small{ display:block; font-size:.75rem; color:var(--graphite); }
.mpv2-blk.mpv2-hi{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
.mpv2-blk.mpv2-none{ border-style:dashed; border-color:var(--pen); background:transparent; } .mpv2-blk.mpv2-none b{ color:var(--pen); font-size:.8rem; font-family:var(--body); }
.mpv2-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 4px; }
.mpv2-chip{ font:600 .82rem/1.2 var(--mono); padding:5px 8px; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv2-chip[aria-pressed="true"]{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.mpv2-reg16{ display:grid; grid-template-columns:repeat(16, minmax(0,1fr)); gap:1px; max-width:420px; margin:0 auto; }
.mpv2-reg16 > span{ text-align:center; font:700 .8rem/1.9 var(--mono); color:var(--ink); background:var(--paper); border:1px solid var(--line); transition:background .4s; }
.mpv2-reg16 > span.mpv2-h{ background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); } .mpv2-reg16 > span.mpv2-new{ background:color-mix(in srgb, var(--fig-k) 42%, var(--paper)); }
.mpv2-reg16 > i{ grid-column:span 8; text-align:center; font:700 .8rem var(--mono); font-style:normal; color:var(--ink); padding:2px 0; }
.mpv2-reg16 > i.mpv2-ax{ grid-column:span 16; border-top:2px solid var(--fig-k); margin-top:3px; }
.mpv2-reg16 > i.mpv2-hl{ border-bottom:2px solid var(--fig-k); margin-bottom:3px; }
.mpv2-vals{ max-width:420px; margin:10px auto 0; display:grid; grid-template-columns:auto minmax(0,1fr); gap:3px 10px; font-size:.86rem; color:var(--ink); }
.mpv2-vals span{ color:var(--graphite); font-family:var(--mono); font-weight:700; } .mpv2-vals b{ font-family:var(--mono); overflow-wrap:anywhere; }
.mpv2-in{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; margin:12px 0 0; font-size:.86rem; color:var(--ink); }
.mpv2-in input, .mpv2-in select{ font:600 .9rem var(--mono); padding:5px 8px; border:1px solid var(--line); border-radius:7px; background:var(--paper); color:var(--ink); min-width:0; box-sizing:border-box; max-width:100%; }
.mpv2-in input:focus, .mpv2-in select:focus{ outline:2px solid var(--fig-k); outline-offset:1px; }
.mpv2-lbl{ font-size:.8rem; color:var(--graphite); width:100%; text-align:center; }
.mpv2-err{ text-align:center; color:var(--pen); font-size:.86rem; margin:6px 0 0; }
.mpv2-pm{ display:grid; gap:3px; max-width:460px; margin:0 auto; }
.mpv2-pr{ font-size:.75rem; display:grid; grid-template-columns:4.1em minmax(0,1fr) minmax(0,6.4em); gap:6px; align-items:center; font-family:inherit; color:var(--ink); background:transparent; border:0; border-radius:6px; padding:1px 2px; cursor:pointer; text-align:left; animation:mpv2in .5s ease both; }
.mpv2-pr.mpv2-sel{ background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); box-shadow:0 0 0 1.5px var(--fig-k); }
.mpv2-pr > b{ font:700 .78rem var(--mono); } .mpv2-pr > small{ font-size:.75rem; line-height:1.15; color:var(--graphite); }
.mpv2-pbar{ display:grid; grid-template-columns:1fr 1fr; height:26px; }
.mpv2-pbar > span{ border:1px solid var(--ink); display:grid; grid-auto-flow:column; grid-auto-columns:1fr; align-items:center; text-align:center; font:600 .75rem var(--mono); }
.mpv2-pbar > span:first-child{ border-right:0; background:color-mix(in srgb, var(--graphite) 28%, var(--paper)); } .mpv2-pbar > span.mpv2-nob{ border:0; background:transparent; }
.mpv2-pbar > span:last-child{ background:var(--paper); } .mpv2-pbar > span.mpv2-g{ background:color-mix(in srgb, var(--graphite) 28%, var(--paper)); }
.mpv2-gap{ height:8px; }
@keyframes mpv2in{ from{ opacity:0; transform:translateX(-8px); } to{ opacity:1; transform:none; } }
.mpv2-mem{ display:grid; grid-template-columns:5.4em 22px minmax(0,1fr); gap:0 6px; max-width:420px; margin:0 auto; align-items:stretch; }
.mpv2-rows{ display:flex; flex-direction:column; border:1.5px solid var(--ink); }
.mpv2-rows button{ font:600 .75rem/1 var(--mono); height:17px; padding:0 4px; border:0; border-top:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; text-align:left; }
.mpv2-rows button:first-child{ border-top:0; } .mpv2-rows button.mpv2-on{ background:var(--fig-s); color:#fff; }
.mpv2-arr{ align-self:center; text-align:center; color:var(--fig-k); font-weight:700; font-size:1.3rem; }
.mpv2-zoom{ position:relative; margin:18px 0; border:1.5px solid var(--ink); background:var(--paper); transition:opacity .5s; }
.mpv2-zoom > span{ position:absolute; left:0; right:0; font:700 .78rem var(--mono); color:var(--ink); text-align:center; }
.mpv2-zoom > .mpv2-t{ top:-17px; } .mpv2-zoom > .mpv2-b{ bottom:-17px; }
.mpv2-zoom > .mpv2-o{ border-top:2px dashed var(--fig-k); text-align:right; padding-right:4px; color:var(--fig-k); transition:bottom .5s; }
.mpv2-big{ text-align:center; font:700 1.15rem var(--mono); color:var(--ink); margin:12px 0 0; }
.mpv2-big small{ display:block; font:.8rem var(--body); color:var(--graphite); }
.mpv2-ef{ max-width:420px; margin:0 auto; display:grid; gap:4px; }
.mpv2-efrow{ display:grid; grid-template-columns:repeat(8, minmax(0,1fr)); gap:2px; }
.mpv2-efc{ font:inherit; border:1px solid var(--line); border-radius:4px; background:var(--paper); color:var(--ink); padding:2px 0 3px; cursor:pointer; text-align:center; min-width:0; transition:background .4s, opacity .4s; }
.mpv2-efc small{ display:block; font:.75rem var(--mono); color:var(--graphite); } .mpv2-efc b{ display:block; font:700 .78rem var(--mono); }
.mpv2-efc.mpv2-fx{ background:color-mix(in srgb, var(--graphite) 22%, var(--paper)); } .mpv2-efc.mpv2-fx b{ font-weight:500; }
.mpv2-efc.mpv2-on{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); border-color:var(--fig-k); } .mpv2-efc.mpv2-dim{ opacity:.45; }
.mpv2-efc.mpv2-sel{ box-shadow:0 0 0 2px var(--fig-k); opacity:1; }
.mpv2-brace{ text-align:center; font:700 .8rem var(--mono); color:var(--fig-k); border-top:2px solid var(--fig-k); margin-top:6px; padding-top:2px; transition:opacity .4s; }
.mpv2-add{ display:grid; grid-template-columns:3.4em repeat(9, minmax(0,1fr)) 3.6em; gap:1px 2px; max-width:380px; margin:0 auto; font:700 .84rem/1.6 var(--mono); color:var(--ink); align-items:center; }
.mpv2-add > span{ text-align:center; } .mpv2-add .mpv2-l{ text-align:left; font:600 .78rem var(--body); color:var(--graphite); } .mpv2-add .mpv2-d{ text-align:right; font-size:.78rem; color:var(--graphite); }
.mpv2-add .mpv2-ln{ grid-column:1 / -1; border-top:2px solid var(--ink); height:0; }
.mpv2-add .mpv2-c{ color:var(--pen); } .mpv2-add .mpv2-ms{ color:var(--fig-k); }
.mpv2-flags{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:6px; max-width:380px; margin:12px auto 0; }
.mpv2-flags div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); text-align:center; padding:4px 2px; color:var(--ink); }
.mpv2-flags small{ display:block; font-size:.75rem; color:var(--graphite); } .mpv2-flags b{ display:block; font:700 1.1rem var(--mono); }
.mpv2-flags div.mpv2-on{ background:var(--fig-s); border-color:transparent; } .mpv2-flags div.mpv2-on small, .mpv2-flags div.mpv2-on b{ color:#fff; }
.mpv2-fx2{ display:grid; gap:10px; max-width:420px; margin:0 auto; }
.mpv2-box{ border:1.5px solid var(--ink); border-radius:10px; padding:6px 8px 8px; background:var(--paper); }
.mpv2-box > b{ display:block; font-size:.8rem; color:var(--graphite); margin-bottom:5px; }
.mpv2-cpu{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:6px; }
.mpv2-rg{ border:1px solid var(--line); border-radius:8px; padding:3px 6px; background:var(--paper-2); transition:background .4s, box-shadow .4s; min-width:0; }
.mpv2-rg small{ display:block; font:700 .78rem var(--mono); color:var(--graphite); } .mpv2-rg b{ display:block; font:700 .86rem var(--mono); color:var(--ink); min-height:1.3em; overflow-wrap:anywhere; }
.mpv2-rg.mpv2-on{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); box-shadow:0 0 0 2px var(--fig-k); }
.mpv2-rg.mpv2-src{ box-shadow:0 0 0 2px var(--fig-k); }
.mpv2-mt{ display:grid; grid-template-columns:3.2em minmax(0,1fr); font:600 .86rem/1.8 var(--mono); color:var(--ink); }
.mpv2-mt span{ border-top:1px solid var(--line); padding:0 6px; transition:background .4s; } .mpv2-mt span:nth-child(-n+2){ border-top:0; }
.mpv2-mt span.mpv2-a{ color:var(--graphite); border-right:1px solid var(--line); } .mpv2-mt span.mpv2-on{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
.mpv2-flow{ text-align:center; font:700 .95rem var(--mono); color:var(--fig-k); min-height:1.4em; }
.mpv2-q{ text-align:center; font:700 1.8rem var(--mono); color:var(--ink); padding:10px 0 6px; }
.mpv2-q small{ display:block; font:.8rem var(--body); color:var(--graphite); }
.mpv2-opts{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; max-width:420px; margin:0 auto; }
.mpv2-opts button{ font:inherit; font-size:.84rem; padding:6px 10px; border-radius:99px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv2-opts button.mpv2-ok{ background:var(--ok); color:#fff; border-color:transparent; } .mpv2-opts button.mpv2-no{ border-color:var(--pen); color:var(--pen); box-shadow:0 0 0 1px var(--pen); }
.mpv2-score{ text-align:center; font-size:.84rem; color:var(--graphite); margin:8px 0 0; }
.mpv2-mregs{ display:grid; gap:5px; max-width:420px; margin:0 auto; }
.mpv2-mr{ display:grid; grid-template-columns:3em minmax(0,2fr) minmax(0,1fr) minmax(0,1fr); gap:3px; align-items:stretch; }
.mpv2-mr > b{ font:700 .86rem var(--mono); color:var(--ink); align-self:center; }
.mpv2-mr > span{ border:1px solid var(--line); border-radius:5px; background:var(--paper); text-align:center; padding:1px 0 2px; transition:background .4s, box-shadow .4s; min-width:0; }
.mpv2-mr > span small{ display:block; font:.75rem var(--mono); color:var(--graphite); } .mpv2-mr > span i{ display:block; font:700 .9rem var(--mono); font-style:normal; color:var(--ink); }
.mpv2-mr > span.mpv2-on{ background:color-mix(in srgb, var(--fig-k) 28%, var(--paper)); box-shadow:0 0 0 1.5px var(--fig-k); }
.mpv2-mr > span.mpv2-src{ box-shadow:0 0 0 1.5px var(--fig-k); border-style:dashed; }
.mpv2-prog{ max-width:420px; margin:0 auto 10px; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 0; font:600 .86rem/1.5 var(--mono); color:var(--ink); }
.mpv2-prog div{ padding:1px 10px; display:flex; justify-content:space-between; gap:8px; transition:background .3s; } .mpv2-prog div small{ font:.75rem var(--body); color:var(--graphite); }
.mpv2-prog div.mpv2-cur{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); } .mpv2-prog div.mpv2-done{ opacity:.6; }
@media (prefers-reduced-motion: reduce){ .mpv2-pr{ animation:none; } .mpv2-zoom > .mpv2-o{ transition:none; } }`;
  if (!document.getElementById('mpv2-css')) { const s = document.createElement('style'); s.id = 'mpv2-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* shared helpers */
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const bdi = s => `<bdi dir="ltr">${esc(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const ltr = s => `<span class="ltr">${esc(s)}</span>`;
  const hx = (v, d) => v.toString(16).toUpperCase().padStart(d, '0');
  const bn = (v, d) => v.toString(2).padStart(d, '0');
  const hxc = (v, d) => { const t = hx(v, d || 1); return (/^[A-F]/.test(t) ? '0' : '') + t + 'H'; }; // course style: 0FFH
  // course number suffixes: H = hexadecimal, B = binary, none = decimal
  function num(t) {
    t = String(t).trim().toUpperCase(); let m;
    if ((m = /^([0-9][0-9A-F]*)H$/.exec(t))) return { v: parseInt(m[1], 16), base: 'hex' };
    if ((m = /^([01]+)B$/.exec(t))) return { v: parseInt(m[1], 2), base: 'bin' };
    if (/^[0-9]+$/.test(t)) return { v: parseInt(t, 10), base: 'dec' };
    return null;
  }
  const withCtl = (ctl, reset) => ({ go: j => { reset(); ctl.go(j); }, replay: () => { reset(); ctl.replay(); } });

  /* ── 0.0-0.3: the slide's tree, Registers → user-visible / user-invisible ── */
  const TREE = {
    gp: { en: '<b>General purpose</b> registers (user-visible): EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI. Used mainly for arithmetic and data movement.',
      ar: 'الـ <b>General purpose</b> registers (user-visible) هما EAX و EBX و ECX و EDX و EBP و ESP و EDI و ESI، وبتستخدم أساسًا في الحسابات ونقل الداتا.' },
    sp: { en: '<b>Special purpose</b> registers (user-visible): EIP and EFLAGS, both 32-bit. The CPU manipulates them directly.',
      ar: 'الـ <b>Special purpose</b> registers (user-visible) هما EIP و EFLAGS، الاتنين ' + bdi('32-bit') + '، والـ CPU هو اللي بيعدّل فيهم مباشرة.' },
    seg: { en: '<b>Segment registers</b> (user-visible): CS, DS, ES, SS, 16-bit each. They hold the base locations of the code, data and stack segments.',
      ar: 'الـ <b>Segment registers</b> (user-visible) هما CS و DS و ES و SS، كل واحد ' + bdi('16-bit') + '، وشايلين نقطة البداية بتاعة الـ code والـ data والـ stack segments.' },
    pc: { en: '<b>Program Counter (PC)</b> (user-invisible): contains the address of an instruction to be fetched, the next instruction.',
      ar: 'الـ <b>Program Counter (PC)</b> (user-invisible) فيه عنوان الـ instruction اللي هتتجاب (fetch)، يعني الـ instruction الجاية.' },
    mar: { en: '<b>MAR</b>, Memory Address Register (user-invisible): contains the address of a location in memory.',
      ar: 'الـ <b>MAR</b> أو الـ Memory Address Register (user-invisible) فيه عنوان مكان في الـ memory.' },
    mbr: { en: '<b>MBR</b>, Memory Buffer Register (user-invisible): contains a word of data to be written to memory, or the word most recently read.',
      ar: 'الـ <b>MBR</b> أو الـ Memory Buffer Register (user-invisible) فيه word داتا هتتكتب في الـ memory، أو آخر word اتقرت منها.' },
    ir: { en: '<b>Instruction Register (IR)</b> (user-invisible): contains the instruction most recently fetched, the one being executed.',
      ar: 'الـ <b>Instruction Register (IR)</b> (user-invisible) فيه آخر instruction اتجابت (fetched)، يعني اللي بتتنفذ دلوقتي.' }
  };
  function RegTree({ ar }) {
    const steps = [
      { en: 'A <b>register</b> is a high speed temporary storage area built into a CPU.', ar: 'الـ <b>register</b> هو مكان تخزين مؤقت سريع جدًا جوه الـ CPU.' },
      { en: 'A processor has two kinds: <b>user-visible</b> registers and <b>user-invisible</b> (control/status) registers.', ar: 'الـ processor فيه نوعين: <b>user-visible</b> registers (المبرمج يشوفها) و <b>user-invisible</b> registers (الـ control والـ status).' },
      { en: 'User-visible: <b>general purpose</b>, <b>special purpose</b> and <b>segment</b> registers. The machine language can reference them, so the programmer uses them to cut down main memory references.', ar: 'الـ User-visible فيها الـ <b>general purpose</b> والـ <b>special purpose</b> والـ <b>segment</b> registers. الـ machine language تقدر تشاور عليهم، فالمبرمج يستخدمهم ويقلل الرجوع للـ main memory.' },
      { en: 'User-invisible: <b>Program Counter</b>, <b>MAR</b>, <b>MBR</b> and <b>Instruction Register</b>. They control the operation of the CPU. Tap any box to see what it holds.', ar: 'الـ User-invisible فيها الـ <b>Program Counter</b> والـ <b>MAR</b> والـ <b>MBR</b> والـ <b>Instruction Register</b>، وبيتحكموا في شغل الـ CPU. دوس على أي واحد تشوف فيه إيه.' }
    ];
    const [i, ctl0] = useSteps(steps.length, 2400), [sel, setSel] = useState(null), ctl = withCtl(ctl0, () => setSel(null));
    const leaf = (k, label, on) => html`<button key=${k} className=${'mpv2-leaf' + (sel === k ? ' mpv2-on' : '')} aria-pressed=${sel === k} disabled=${!on} onClick=${() => setSel(sel === k ? null : k)}>${label}</button>`;
    return html`<figure className="fig mpv2"><div className="fig-stage"><div className="mpv2-tree">
      <div className="mpv2-root">Registers</div>
      <div className=${'mpv2-fork ' + pop(i >= 1)}></div>
      <div className="mpv2-kinds">
        <div className=${pop(i >= 1)}><div className="mpv2-kind">User-visible registers</div>
          <div className=${'mpv2-leaves ' + pop(i >= 2)}>${leaf('gp', 'General purpose', i >= 2)}${leaf('sp', 'Special purpose', i >= 2)}${leaf('seg', 'Segment registers', i >= 2)}</div></div>
        <div className=${pop(i >= 1)}><div className="mpv2-kind">User-invisible registers</div>
          <div className=${'mpv2-leaves ' + pop(i >= 3)}>${leaf('pc', 'Program Counter', i >= 3)}${leaf('mar', 'MAR', i >= 3)}${leaf('mbr', 'MBR', i >= 3)}${leaf('ir', 'Instruction Register', i >= 3)}</div></div>
      </div></div></div>
      <${Cap} ...${sel ? TREE[sel] : steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 1.1-1.2: EAX → AX → AH, AL (slide figure); SI, DI, SP, BP have no 8-bit halves ── */
  const FAM = [['EAX', 'AX', 'AH', 'AL'], ['EBX', 'BX', 'BH', 'BL'], ['ECX', 'CX', 'CH', 'CL'], ['EDX', 'DX', 'DH', 'DL'], ['ESP', 'SP'], ['EBP', 'BP'], ['EDI', 'DI'], ['ESI', 'SI']];
  function famCap(f) {
    if (f[2]) return {
      en: `<b>${f[0]}</b> is 32 bits. Its lower 16 bits are <b>${f[1]}</b>, and ${f[1]} splits into <b>${f[2]}</b> (upper 8 bits) and <b>${f[3]}</b> (lower 8 bits).`,
      ar: `الـ <b>${f[0]}</b> حجمه ${bdi('32 bits')}، والـ ${bdi('16 bits')} اللي تحت منه اسمهم <b>${f[1]}</b>. والـ ${f[1]} بيتقسم لـ <b>${f[2]}</b> (الـ ${bdi('8 bits')} العليا) و <b>${f[3]}</b> (الـ ${bdi('8 bits')} اللي تحت).` };
    return {
      en: `<b>${f[0]}</b> is 32 bits and its lower 16 bits are <b>${f[1]}</b>, but ${f[1]} has <b>no 8-bit halves</b> (there is no SH/SL): use it as 16 or 32 bits only.`,
      ar: `الـ <b>${f[0]}</b> حجمه ${bdi('32 bits')} والـ ${bdi('16 bits')} اللي تحت منه اسمهم <b>${f[1]}</b>، بس الـ ${f[1]} <b>مالوش أنصاص</b> ${bdi('8-bit')} (مفيش حاجة اسمها SH أو SL)، فبتستخدمه ${bdi('16')} أو ${bdi('32 bits')} بس.` };
  }
  function RegParts({ ar }) {
    const steps = [
      { r: 0, lv: 0, en: '<b>EAX</b> is one 32-bit general purpose register.', ar: 'الـ <b>EAX</b> هو general purpose register واحد حجمه ' + bdi('32 bits') + '.' },
      { r: 0, lv: 1, en: 'Its lower 16 bits are named <b>AX</b>: you can use them as a 16-bit register.', ar: 'الـ ' + bdi('16 bits') + ' اللي تحت منه اسمهم <b>AX</b>، وتقدر تستخدمهم كـ register حجمه ' + bdi('16 bits') + '.' },
      { r: 0, lv: 2, en: 'The upper 8 bits of AX are <b>AH</b> and the lower 8 bits are <b>AL</b>. The same holds for EBX/BX/BH/BL, ECX/CX/CH/CL and EDX/DX/DH/DL.', ar: 'الـ ' + bdi('8 bits') + ' العليا من AX اسمها <b>AH</b>، واللي تحت اسمها <b>AL</b>. ونفس الكلام في' + ltr('EBX/BX/BH/BL, ECX/CX/CH/CL, EDX/DX/DH/DL') },
      { r: 7, lv: 2, en: 'ESI, EDI, ESP and EBP only have a 16-bit part (SI, DI, SP, BP). There is <b>no SH or SL</b>. Tap a register to compare.', ar: 'أما ESI و EDI و ESP و EBP فليهم جزء ' + bdi('16-bit') + ' بس (SI و DI و SP و BP). <b>مفيش SH أو SL</b>. دوس على أي register تقارن.' }
    ];
    const [i, ctl0] = useSteps(steps.length, 2400), [p, setP] = useState(null), ctl = withCtl(ctl0, () => setP(null));
    const f = FAM[p != null ? p : steps[i].r], lv = p != null ? 2 : steps[i].lv, cap = p != null ? famCap(f) : steps[i];
    return html`<figure className="fig mpv2"><div className="fig-stage">
      <div className="mpv2-split">
        ${['31–24', '23–16', '15–8', '7–0'].map(t => html`<div key=${t} className="mpv2-bits">${t}</div>`)}
        ${f[2] ? html`<div className=${'mpv2-blk ' + pop(lv >= 2) + (lv === 2 && p == null && i === 2 ? ' mpv2-hi' : '')} style=${{ gridColumn: '3' }}><b>${f[2]}</b><small>8 bits</small></div>
          <div className=${'mpv2-blk ' + pop(lv >= 2) + (lv === 2 && p == null && i === 2 ? ' mpv2-hi' : '')} style=${{ gridColumn: '4' }}><b>${f[3]}</b><small>8 bits</small></div>`
        : html`<div className=${'mpv2-blk mpv2-none ' + pop(lv >= 2)} style=${{ gridColumn: '3 / 5' }}><b>no 8-bit halves</b><small>16 / 32 bits only</small></div>`}
        <div className=${'mpv2-blk ' + pop(lv >= 1) + (lv === 1 ? ' mpv2-hi' : '')} style=${{ gridColumn: '3 / 5' }}><b>${f[1]}</b><small>16 bits</small></div>
        <div className=${'mpv2-blk' + (lv === 0 ? ' mpv2-hi' : '')} style=${{ gridColumn: '1 / 5' }}><b>${f[0]}</b><small>32 bits</small></div>
      </div>
      <div className="mpv2-chips">${FAM.map((g, k) => html`<button key=${k} className="mpv2-chip" aria-pressed=${p === k} onClick=${() => setP(k)}>${g[0]}</button>`)}</div>
      </div><${Cap} ...${cap} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 1.3: the Lab example, AX = 0011000000111001b; change a half, AX changes with it ── */
  const AX0 = 0b0011000000111001;
  function axHalvesCap(st) {
    const A = bn(st.ax, 16), H = bn(st.ax >> 8, 8), L = bn(st.ax & 255, 8);
    if (!st.op) return {
      en: `Lab example: AX = ${A}b, so <b>AH = ${H}b</b> (the upper 8 bits) and <b>AL = ${L}b</b> (the lower 8 bits). Write a new value into AX, AH or AL below.`,
      ar: 'مثال الـ Lab:' + ltr(`AX = ${A}b`) + 'يبقى الـ <b>AH</b> هو الـ ' + bdi('8 bits') + ' العليا والـ <b>AL</b> هو الـ ' + bdi('8 bits') + ' اللي تحت:' + ltr(`AH = ${H}b, AL = ${L}b`) + 'اكتب قيمة جديدة في الـ AX أو الـ AH أو الـ AL تحت.' };
    const ins = `MOV ${st.op}, ${st.raw}`;
    if (st.op === 'AX') return {
      en: `<code>${esc(ins)}</code> wrote all 16 bits of AX, so both halves changed: AH = ${H}b, AL = ${L}b.`,
      ar: 'الـ instruction دي:' + ltr(ins) + 'كتبت الـ ' + bdi('16 bits') + ' كلهم في الـ AX، فالنصين اتغيروا:' + ltr(`AH = ${H}b, AL = ${L}b`) };
    const hi = st.op === 'AH', other = hi ? 'AL' : 'AH';
    return {
      en: `<code>${esc(ins)}</code> wrote only the ${hi ? 'upper' : 'lower'} 8 bits, and the 16-bit register changed with it: AX = ${A}b (${hx(st.ax, 4)}H). ${other} kept its value.`,
      ar: 'الـ instruction دي:' + ltr(ins) + 'كتبت في الـ ' + bdi('8 bits') + (hi ? ' العليا' : ' اللي تحت') + ' بس، والـ register الـ ' + bdi('16-bit') + ' اتغير معاها:' + ltr(`AX = ${A}b (${hx(st.ax, 4)}H)`) + 'أما الـ ' + other + ' فقيمته ما اتغيرتش.' };
  }
  function AxHalves({ ar }) {
    const [st, setSt] = useState({ ax: AX0, op: null, old: AX0 }), [tg, setTg] = useState('AL'), [val, setVal] = useState('0FFH'), [err, setErr] = useState('');
    const run = () => {
      const n = num(val), max = tg === 'AX' ? 0xFFFF : 0xFF;
      if (!n) return setErr('Write a number: decimal (57), hexadecimal with H (39H) or binary with B (00111001B).');
      if (n.v > max) return setErr(`${tg} is ${tg === 'AX' ? 16 : 8} bits: the largest value is ${max} (${hx(max, tg === 'AX' ? 4 : 2)}H).`);
      setErr('');
      const ax = tg === 'AX' ? n.v : tg === 'AH' ? (n.v << 8) | (st.ax & 255) : (st.ax & 0xFF00) | n.v;
      setSt({ ax, op: tg, raw: val.trim().toUpperCase(), old: st.ax });
    };
    const bits = bn(st.ax, 16).split(''), oldb = bn(st.old, 16);
    return html`<figure className="fig mpv2"><div className="fig-stage">
      <div className="mpv2-reg16">
        <i className="mpv2-hl">AH</i><i className="mpv2-hl">AL</i>
        ${bits.map((b, k) => html`<span key=${k} className=${(oldb[k] !== b ? 'mpv2-new' : k < 8 ? 'mpv2-h' : '')}>${b}</span>`)}
        <i className="mpv2-ax">AX</i>
      </div>
      <div className="mpv2-vals">
        <span>AX</span><b>${bn(st.ax, 16)}b = ${hx(st.ax, 4)}H</b>
        <span>AH</span><b>${bn(st.ax >> 8, 8)}b = ${hx(st.ax >> 8, 2)}H</b>
        <span>AL</span><b>${bn(st.ax & 255, 8)}b = ${hx(st.ax & 255, 2)}H</b>
      </div>
      <div className="mpv2-in"><span className="mpv2-lbl">Try your own</span>
        <b>MOV</b><select value=${tg} onChange=${e => setTg(e.target.value)} aria-label="Destination">${['AX', 'AH', 'AL'].map(r => html`<option key=${r}>${r}</option>`)}</select>,
        <input value=${val} size="10" onChange=${e => setVal(e.target.value)} onKeyDown=${e => e.key === 'Enter' && run()} aria-label="Value" />
        <button className="fig-btn solid" onClick=${run}>Run</button>
        <button className="fig-btn" onClick=${() => { setErr(''); setSt({ ax: AX0, op: null, old: AX0 }); }}>Example from the notes</button></div>
      ${err && html`<p className="mpv2-err">${err}</p>`}
      </div><${Cap} ...${axHalvesCap(st)} showAr=${ar} /></figure>`;
  }

  /* ── 2: the programming model (slide), each register's name and use ── */
  const PM = [
    { n: 'EAX', p: ['AH', 'AX', 'AL'], role: 'Accumulator', en: '<b>AX (EAX), Accumulator</b>: math and logic, often holds the result. Must be used in MUL and DIV.', ar: 'الـ <b>AX (EAX)</b> هو الـ Accumulator، بيستخدم في الحسابات والـ logic وغالبًا بيشيل النتيجة. ولازم يستخدم في الـ MUL والـ DIV.' },
    { n: 'EBX', p: ['BH', 'BX', 'BL'], role: 'Base index', en: '<b>BX (EBX), Base index</b>: holds the base (offset) address of a memory location.', ar: 'الـ <b>BX (EBX)</b> هو الـ Base index، بيشيل الـ base address (الـ offset) بتاع مكان في الـ memory.' },
    { n: 'ECX', p: ['CH', 'CX', 'CL'], role: 'Count', en: '<b>CX (ECX), Count</b>: the count for rotate, shift and LOOP instructions.', ar: 'الـ <b>CX (ECX)</b> هو الـ Count، بيشيل العدد في الـ rotate والـ shift والـ LOOP instructions.' },
    { n: 'EDX', p: ['DH', 'DX', 'DL'], role: 'Data', en: '<b>DX (EDX), Data</b>: extension of AX in multiplication and division; holds the remainder in DIV.', ar: 'الـ <b>DX (EDX)</b> هو الـ Data، بيكمّل الـ AX في الضرب والقسمة، وبيشيل باقي القسمة في الـ DIV.' },
    { n: 'ESP', p: ['SP'], role: 'Stack pointer', en: '<b>SP (ESP), Stack pointer</b>: offset of the top of the stack inside the stack segment.', ar: 'الـ <b>SP (ESP)</b> هو الـ Stack pointer، فيه الـ offset بتاع أعلى الـ stack جوه الـ stack segment.' },
    { n: 'EBP', p: ['BP'], role: 'Base pointer', en: '<b>BP (EBP), Base pointer</b>: addresses an array of data in the stack.', ar: 'الـ <b>BP (EBP)</b> هو الـ Base pointer، بيشاور على array داتا جوه الـ stack.' },
    { n: 'EDI', p: ['DI'], role: 'Destination index', en: '<b>DI (EDI), Destination index</b>: destination data for string instructions.', ar: 'الـ <b>DI (EDI)</b> هو الـ Destination index، للداتا اللي رايحة لها الـ string instructions (الـ destination).' },
    { n: 'ESI', p: ['SI'], role: 'Source index', en: '<b>SI (ESI), Source index</b>: source data for string instructions.', ar: 'الـ <b>SI (ESI)</b> هو الـ Source index، للداتا اللي جاية منها الـ string instructions (الـ source).' },
    null,
    { n: 'EIP', p: ['IP'], role: 'Instruction pointer', en: '<b>IP (EIP), Instruction pointer</b>: with CS (CS:IP) it points to the next instruction to fetch.', ar: 'الـ <b>IP (EIP)</b> هو الـ Instruction pointer، ومع الـ CS (يعني ' + bdi('CS:IP') + ') بيشاور على الـ instruction الجاية اللي هتتجاب.' },
    { n: 'EFLAGS', p: ['FLAGS'], role: 'Flags', en: '<b>FLAGS (EFLAGS)</b>: the status of the processor and control of its operation.', ar: 'الـ <b>FLAGS (EFLAGS)</b> فيه حالة الـ processor والتحكم في شغله.' },
    null,
    { n: '', p: ['CS'], seg: 1, role: 'Code', en: '<b>CS, Code segment</b>: addresses the segment where the executable program (the instructions) is stored.', ar: 'الـ <b>CS</b> هو الـ Code segment، بيشاور على الـ segment اللي البرنامج الـ executable (الـ instructions) متخزن فيه.' },
    { n: '', p: ['DS'], seg: 1, role: 'Data', en: '<b>DS, Data segment</b>: points to the segment where data is stored.', ar: 'الـ <b>DS</b> هو الـ Data segment، بيشاور على الـ segment اللي الداتا متخزنة فيه.' },
    { n: '', p: ['ES'], seg: 1, role: 'Extra', en: '<b>ES, Extra segment</b>: another data segment.', ar: 'الـ <b>ES</b> هو الـ Extra segment، يعني data segment تاني إضافي.' },
    { n: '', p: ['SS'], seg: 1, role: 'Stack', en: '<b>SS, Stack segment</b>: holds the starting address of the currently active stack segment.', ar: 'الـ <b>SS</b> هو الـ Stack segment، شايل عنوان البداية بتاع الـ stack segment الشغال دلوقتي.' },
    { n: '', p: ['FS'], seg: 2, role: '', en: '<b>FS</b>: an extra segment register that exists on the 80386 and later (shaded in the slide).', ar: 'الـ <b>FS</b> هو segment register زيادة موجود في الـ 80386 وبعده (متظلل في الـ slide).' },
    { n: '', p: ['GS'], seg: 2, role: '', en: '<b>GS</b>: an extra segment register that exists on the 80386 and later (shaded in the slide).', ar: 'الـ <b>GS</b> هو segment register زيادة موجود في الـ 80386 وبعده (متظلل في الـ slide).' }
  ];
  function ProgModel({ ar }) {
    const [sel, setSel] = useState(null);
    const cap = sel != null ? PM[sel] : { en: 'The programming model of the 80x86. The grey part is the upper 16 bits that only the 32-bit name (EAX, …) reaches. Tap a register to see its name and use.',
      ar: 'ده الـ programming model بتاع الـ 80x86. الجزء الرمادي هو الـ ' + bdi('16 bits') + ' العليا اللي بتوصلها بس بالاسم الـ ' + bdi('32-bit') + ' زي EAX. دوس على أي register تشوف اسمه وبيستخدم في إيه.' };
    return html`<figure className="fig mpv2"><div className="fig-stage"><div className="mpv2-pm">
      ${PM.map((r, k) => r ? html`<button key=${k} className=${'mpv2-pr' + (sel === k ? ' mpv2-sel' : '')} style=${{ animationDelay: (k * 0.08) + 's' }} aria-pressed=${sel === k} onClick=${() => setSel(sel === k ? null : k)}>
          <b>${r.n}</b>
          <div className="mpv2-pbar"><span className=${r.seg ? 'mpv2-nob' : ''}></span><span className=${r.seg === 2 ? 'mpv2-g' : ''}>${r.p.map(t => html`<span key=${t}>${t}</span>`)}</span></div>
          <small>${r.role}</small></button>` : html`<div key=${k} className="mpv2-gap"></div>`)}
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── 3.0: the slide's segment figure, memory blocks, segment 8000, offset 0250 → 8000:0250 ── */
  function segCap(s, o) {
    const S = hx(s * 0x1000, 4), O = hx(o, 4);
    return { en: `The segment register holds <b>${S}</b> and the offset is <b>${O}</b>: the location is written <b>${S}:${O}</b> (seg:ofs).`,
      ar: 'الـ segment register قيمته ' + bdi(S) + ' والـ offset قيمته ' + bdi(O) + '، فالمكان ده بيتكتب كده:' + ltr(`${S}:${O}   (seg:ofs)`) };
  }
  function SegMap({ ar }) {
    const steps = [
      { en: 'The slide draws memory as blocks starting at 00000, 10000, 20000, … F0000.', ar: 'الـ slide راسم الـ memory كـ blocks بتبدأ من:' + ltr('00000, 10000, 20000, …, F0000') },
      { en: 'A segment register (CS, DS, ES or SS) holds a base location. Here it holds <b>8000</b>: the segment drawn at 80000.', ar: 'الـ segment register (زي CS أو DS أو ES أو SS) شايل الـ base location (نقطة البداية). هنا قيمته <b>8000</b>، وده الـ segment المرسوم عند ' + bdi('80000') + '.' },
      { en: 'Inside that segment the locations run from <b>8000:0000</b> to <b>8000:FFFF</b>: segment first, then offset.', ar: 'جوه الـ segment ده الأماكن بتبدأ من' + ltr('8000:0000  …  8000:FFFF') + 'الرقم الأول هو الـ segment والتاني هو الـ offset.' },
      { en: 'Offset <b>0250</b> in segment 8000 is the location <b>8000:0250</b> (seg:ofs). Tap another block or type an offset to try your own.', ar: 'الـ offset ' + bdi('0250') + ' جوه الـ segment ' + bdi('8000') + ' هو المكان:' + ltr('8000:0250   (seg:ofs)') + 'دوس على block تاني أو اكتب offset تجرّب بنفسك.' }
    ];
    const [i, ctl0] = useSteps(steps.length, 2600), [own, setOwn] = useState(null), [txt, setTxt] = useState('0250'), [err, setErr] = useState('');
    const ctl = withCtl(ctl0, () => { setOwn(null); setTxt('0250'); setErr(''); });
    const s = own ? own.s : 8, o = own ? own.o : 0x250, show = own ? 3 : i;
    const setOfs = t => { setTxt(t); const v = /^[0-9A-F]{1,4}H?$/i.test(t.trim()) ? parseInt(t.trim().replace(/h$/i, ''), 16) : NaN;
      if (isNaN(v)) { setErr('Offset: 1 to 4 hexadecimal digits, 0000 to FFFF.'); return; } setErr(''); setOwn({ s, o: v }); };
    const S = hx(s * 0x1000, 4), bottom = 6 + 80 * (o / 0xFFFF);
    return html`<figure className="fig mpv2"><div className="fig-stage">
      <div className="mpv2-mem">
        <div className="mpv2-rows">${Array.from({ length: 16 }, (_, k) => 15 - k).map(k => html`<button key=${k} className=${show >= 1 && k === s ? 'mpv2-on' : ''} aria-label=${'Segment ' + hx(k * 0x1000, 4)} onClick=${() => { setErr(''); setOwn({ s: k, o }); }}>${hx(k * 0x10000, 5)}</button>`)}</div>
        <div className=${'mpv2-arr ' + pop(show >= 1)}>→</div>
        <div className=${'mpv2-zoom ' + pop(show >= 2)}>
          <span className="mpv2-t">${S}:FFFF</span>
          <span className="mpv2-b">${S}:0000</span>
          ${show >= 3 && html`<span className="mpv2-o" style=${{ bottom: bottom + '%' }}>${S}:${hx(o, 4)}</span>`}
        </div>
      </div>
      ${show >= 3 && html`<div className="mpv2-big">${S}:${hx(o, 4)}<small>seg : ofs</small></div>`}
      <div className="mpv2-in"><span className="mpv2-lbl">Try your own: tap a block, type an offset (hex)</span>
        <input value=${txt} size="6" onChange=${e => setOfs(e.target.value)} aria-label="Offset in hexadecimal" />
        <button className="fig-btn" onClick=${() => ctl.go(3)}>Example from the notes</button></div>
      ${err && html`<p className="mpv2-err">${err}</p>`}
      </div><${Cap} ...${own ? segCap(s, o) : steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${own ? steps.length - 1 : i} ctl=${ctl} /></figure>`;
  }

  /* ── 5: the EFLAGS register (slide): 32 bits, status / control / system flags ── */
  const EFN = { 21: 'ID', 20: 'VIP', 19: 'VIF', 18: 'AC', 17: 'VM', 16: 'RF', 14: 'NT', 13: 'IOPL', 12: 'IOPL', 11: 'OF', 10: 'DF', 9: 'IF', 8: 'TF', 7: 'SF', 6: 'ZF', 4: 'AF', 2: 'PF', 0: 'CF' };
  const EFG = { CF: 'status', PF: 'status', AF: 'status', ZF: 'status', SF: 'status', OF: 'status', DF: 'control' };
  const EFFULL = { CF: 'Carry Flag', PF: 'Parity Flag', AF: 'Auxiliary Carry Flag', ZF: 'Zero Flag', SF: 'Sign Flag', OF: 'Overflow Flag', DF: 'Direction Flag', TF: 'Trap Flag', IF: 'Interrupt Flag', IOPL: 'I/O Privilege Level', NT: 'Nested Task', RF: 'Resume Flag', VM: 'Virtual 8086 Mode', AC: 'Alignment Check', VIF: 'Virtual Interrupt Flag', VIP: 'Virtual Interrupt Pending', ID: 'ID Flag' };
  const EFD = {
    ZF: { en: 'Set to 1 when the arithmetic result is zero.', ar: 'بيبقى 1 لما نتيجة العملية الحسابية تساوي صفر.' },
    CF: { en: 'Set when the result of an unsigned operation is too large to fit in the destination (also the borrow flag for SBB).', ar: 'بيبقى 1 لما نتيجة عملية unsigned تبقى أكبر من إنها تتشال في الـ destination (وهو كمان الـ borrow flag في الـ SBB).' },
    SF: { en: 'Set when the result is negative (most significant bit = 1).', ar: 'بيبقى 1 لما النتيجة تبقى سالبة (الـ most significant bit بيساوي 1).' },
    OF: { en: 'Set when the signed result is too large or too small to fit into the destination.', ar: 'بيبقى 1 لما النتيجة الـ signed تبقى أكبر أو أصغر من إنها تتشال في الـ destination.' },
    DF: { en: 'Used by string instructions.', ar: 'بتستخدمه الـ string instructions.' }
  };
  const grpOf = k => EFN[k] ? (EFG[EFN[k]] || 'system') : null;
  function efCap(b) {
    const k = EFN[b];
    if (!k) return { en: `Bit ${b} holds no flag: the slide shows it as ${b === 1 ? 1 : 0}.`, ar: 'الـ bit رقم ' + bdi(String(b)) + ' مافيهوش flag، والـ slide كاتبه ' + bdi(b === 1 ? '1' : '0') + '.' };
    const g = EFG[k] || 'system', G = { status: 'Status', control: 'Control', system: 'System' }[g], d = EFD[k], bits = k === 'IOPL' ? 'bits 13–12' : 'bit ' + b;
    return { en: `<b>${k}</b> = ${EFFULL[k]} (${bits}), a ${g} flag.` + (d ? ' ' + d.en : ''),
      ar: `الـ <b>${k}</b> معناه ${bdi(EFFULL[k])} وده ${k === 'IOPL' ? 'الـ bits' : 'الـ bit'} رقم ${bdi(k === 'IOPL' ? '13–12' : String(b))}، وهو من الـ ${G} flags.` + (d ? ' وهو ' + d.ar : '') };
  }
  function Eflags({ ar }) {
    const steps = [
      { hl: null, en: 'EFLAGS is 32 bits (bit 31 down to bit 0). Each bit either controls the CPU or reflects the outcome of a CPU operation.', ar: 'الـ EFLAGS حجمه ' + bdi('32 bits') + ' (من الـ bit رقم ' + bdi('31') + ' لحد ' + bdi('0') + '). كل bit يا إما بيتحكم في شغل الـ CPU يا إما بيعكس نتيجة عملية عملها.' },
      { hl: 'status', en: '<b>Status flags</b>: CF carry, PF parity, AF auxiliary carry, ZF zero, SF sign, OF overflow. They show the condition of the result of an ALU operation.', ar: 'الـ <b>Status flags</b> هما CF و PF و AF و ZF و SF و OF، وبيوضحوا حالة نتيجة عملية الـ ALU.' },
      { hl: 'control', en: '<b>Control flag</b>: DF, the direction flag, used by string instructions.', ar: 'الـ <b>Control flag</b> هو DF (الـ direction flag)، وبتستخدمه الـ string instructions.' },
      { hl: 'system', en: '<b>System flags</b>: TF, IF, IOPL, NT, RF, VM, AC, VIF, VIP, ID.', ar: 'الـ <b>System flags</b> هما TF و IF و IOPL و NT و RF و VM و AC و VIF و VIP و ID.' },
      { hl: 'low', en: 'The lower 16 bits are the 16-bit <b>FLAGS</b> register. Tap any bit for its name.', ar: 'الـ ' + bdi('16 bits') + ' اللي تحت هما الـ <b>FLAGS</b> register. دوس على أي bit تشوف اسمه.' }
    ];
    const [i, ctl0] = useSteps(steps.length, 2600), [sel, setSel] = useState(null), ctl = withCtl(ctl0, () => setSel(null)), hl = steps[i].hl;
    const isOn = b => hl === 'low' ? b < 16 : hl && grpOf(b) === hl;
    const cell = b => {
      const k = EFN[b], fx = !k, on = isOn(b), span = k === 'IOPL';
      return html`<button key=${b} className=${'mpv2-efc' + (fx ? ' mpv2-fx' : '') + (on ? ' mpv2-on' : hl ? ' mpv2-dim' : '') + (sel === b ? ' mpv2-sel' : '')} style=${span ? { gridColumn: 'span 2' } : null}
        aria-label=${k ? EFFULL[k] : 'bit ' + b} onClick=${() => setSel(sel === b ? null : b)}><small>${span ? '13 12' : b}</small><b>${k || (b === 1 ? 1 : 0)}</b></button>`;
    };
    const row = (hi) => { const out = []; for (let b = hi; b > hi - 8; b--) { if (b === 12) continue; out.push(cell(b)); } return out; };
    return html`<figure className="fig mpv2"><div className="fig-stage"><div className="mpv2-ef">
      <div className="mpv2-efrow">${row(31)}</div><div className="mpv2-efrow">${row(23)}</div>
      <div className="mpv2-brace">FLAGS (bits 15–0)</div>
      <div className="mpv2-efrow">${row(15)}</div><div className="mpv2-efrow">${row(7)}</div>
      </div></div><${Cap} ...${sel != null ? efCap(sel) : steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 5 (Z, C, S, O): the four flags the notes define, computed for an 8-bit ADD or SUB ── */
  function parse8(t) {
    t = String(t).trim();
    if (/^-[0-9]+$/.test(t)) { const v = parseInt(t, 10); return v >= -128 ? { v: v & 255 } : null; }
    const n = num(t); return n && n.v <= 255 ? n : null;
  }
  const sg = v => v >= 128 ? v - 256 : v, mn = v => v < 0 ? "−" + (-v) : String(v);
  function flagsOf(op, a, b) {
    const raw = op === 'ADD' ? a + b : a - b, r = raw & 255;
    const Z = r === 0 ? 1 : 0, S = r >> 7, C = op === 'ADD' ? (raw > 255 ? 1 : 0) : (a < b ? 1 : 0);
    const sraw = op === 'ADD' ? sg(a) + sg(b) : sg(a) - sg(b), O = sraw > 127 || sraw < -128 ? 1 : 0;
    return { raw, r, Z, S, C, O, sraw };
  }
  function flagsCap(op, a, b, f) {
    const sym = op === 'ADD' ? '+' : '−';
    const en = `${op}: unsigned ${a} ${sym} ${b} = ${mn(f.raw)}, signed ${mn(sg(a))} ${sym} ${mn(sg(b))} = ${mn(f.sraw)}. The 8-bit result is ${bn(f.r, 8)}b.<br>`
      + `<b>ZF = ${f.Z}</b>: the result ${f.Z ? 'is' : 'is not'} zero. <b>SF = ${f.S}</b>: the most significant bit is ${f.S}${f.S ? ' (negative)' : ''}. `
      + `<b>CF = ${f.C}</b>: ${op === 'ADD' ? (f.C ? `the unsigned result ${mn(f.raw)} is too large for 8 bits (above 255)` : 'the unsigned result fits in 8 bits') : (f.C ? `a borrow is needed (${a} is smaller than ${b})` : 'no borrow is needed')}. `
      + `<b>OF = ${f.O}</b>: the signed result ${mn(f.sraw)} ${f.O ? 'is outside' : 'fits in'} −128 to 127.`;
    const ar = 'الحساب:' + ltr(`unsigned: ${a} ${sym} ${b} = ${mn(f.raw)}`) + ltr(`signed: ${mn(sg(a))} ${sym} ${mn(sg(b))} = ${mn(f.sraw)}`) + ltr(`8-bit result = ${bn(f.r, 8)}b`)
      + 'الـ <b>ZF</b> قيمته ' + bdi(String(f.Z)) + (f.Z ? ' لأن النتيجة صفر.' : ' لأن النتيجة مش صفر.') + '<br>'
      + 'الـ <b>SF</b> قيمته ' + bdi(String(f.S)) + ' لأن الـ most significant bit قيمته ' + bdi(String(f.S)) + (f.S ? ' (يعني سالبة).' : '.') + '<br>'
      + 'الـ <b>CF</b> قيمته ' + bdi(String(f.C)) + (op === 'ADD' ? (f.C ? ' لأن النتيجة الـ unsigned أكبر من ' + bdi('255') + ' ومش هتتشال في ' + bdi('8 bits') + '.' : ' لأن النتيجة الـ unsigned بتتشال في ' + bdi('8 bits') + '.') : (f.C ? ' لأن محتاجين borrow (الرقم الأول أصغر من التاني).' : ' لأن مش محتاجين borrow.')) + '<br>'
      + 'الـ <b>OF</b> قيمته ' + bdi(String(f.O)) + ' لأن النتيجة الـ signed ' + (f.O ? 'برة' : 'جوه') + ' المدى' + ltr('−128 … 127');
    return { en, ar };
  }
  const FPRE = [['ADD', '255', '1'], ['ADD', '100', '50'], ['SUB', '5', '10'], ['ADD', '0F0H', '10H']];
  function FlagsCalc({ ar }) {
    const [op, setOp] = useState('ADD'), [ta, setTa] = useState('100'), [tb, setTb] = useState('50');
    const A = parse8(ta), B = parse8(tb), ok = A && B;
    const a = ok ? A.v : 0, b = ok ? B.v : 0, f = flagsOf(op, a, b);
    const bitsRow = (lbl, v, d, cls, carry) => html`<span className="mpv2-l">${lbl}</span><span className="mpv2-c">${carry || ''}</span>${bn(v, 8).split('').map((x, k) => html`<span key=${k} className=${k === 0 ? cls : ''}>${x}</span>`)}<span className="mpv2-d">${d}</span>`;
    return html`<figure className="fig mpv2"><div className="fig-stage">
      <div className="mpv2-in" style=${{ marginTop: 0, marginBottom: '10px' }}>
        <select value=${op} onChange=${e => setOp(e.target.value)} aria-label="Operation"><option>ADD</option><option>SUB</option></select>
        <input value=${ta} size="6" onChange=${e => setTa(e.target.value)} aria-label="First 8-bit value" />
        <b>${op === 'ADD' ? '+' : '−'}</b>
        <input value=${tb} size="6" onChange=${e => setTb(e.target.value)} aria-label="Second 8-bit value" /></div>
      <div className="mpv2-chips">${FPRE.map((p, k) => html`<button key=${k} className="mpv2-chip" aria-pressed=${op === p[0] && ta === p[1] && tb === p[2]} onClick=${() => { setOp(p[0]); setTa(p[1]); setTb(p[2]); }}>${p[0]} ${p[1]}, ${p[2]}</button>`)}</div>
      ${ok ? html`<div className="mpv2-add" style=${{ marginTop: '10px' }}>
          ${bitsRow('', a, a, 'mpv2-ms')}
          ${bitsRow(op, b, b, 'mpv2-ms')}
          <span className="mpv2-ln"></span>
          ${bitsRow('result', f.r, f.r, 'mpv2-ms', f.C && op === 'ADD' ? '1' : '')}
        </div>
        <div className="mpv2-flags">${[['ZF', f.Z], ['SF', f.S], ['CF', f.C], ['OF', f.O]].map(([k, v]) => html`<div key=${k} className=${v ? 'mpv2-on' : ''}><small>${k}</small><b>${v}</b></div>`)}</div>`
      : html`<p className="mpv2-err">Each value: 8 bits, 0 to 255 (or −128 to −1), decimal, with H (hex) or B (binary).</p>`}
      </div>${ok ? html`<${Cap} ...${flagsCap(op, a, b, f)} showAr=${ar} />` : html`<${Cap} en="Type two 8-bit values." ar=${'اكتب رقمين، كل واحد حجمه ' + bdi('8 bits') + '.'} showAr=${ar} />`}</figure>`;
  }

  /* ── 6: PC, MAR, MBR, IR while one instruction is fetched ── */
  const PROG = ['MOV EAX, 100', 'MOV BL, 10H', 'MOV DX, CX'];
  function Fetch({ ar }) {
    const steps = [
      { r: { PC: '0', MAR: '', MBR: '', IR: '' }, on: ['PC'], m: -1, fl: '', en: 'Memory holds the program (here one instruction per location, at addresses 0, 1, 2). The <b>PC</b> contains the address of the instruction to be fetched: 0.', ar: 'الـ memory فيها البرنامج (هنا كل instruction في مكان، عند العناوين ' + bdi('0, 1, 2') + '). الـ <b>PC</b> فيه عنوان الـ instruction اللي هتتجاب، وهو ' + bdi('0') + '.' },
      { r: { PC: '0', MAR: '0', MBR: '', IR: '' }, on: ['MAR'], src: 'PC', m: -1, fl: 'PC → MAR', en: 'The address goes to <b>MAR</b>, which contains the address of a location in memory.', ar: 'العنوان بيروح للـ <b>MAR</b>، واللي فيه عنوان مكان في الـ memory.' },
      { r: { PC: '0', MAR: '0', MBR: PROG[0], IR: '' }, on: ['MBR'], m: 0, fl: 'memory[MAR] → MBR', en: 'The word at that location is read into <b>MBR</b>: the word most recently read.', ar: 'الـ word اللي في المكان ده بيتقري ويروح للـ <b>MBR</b>، وده آخر word اتقرت.' },
      { r: { PC: '1', MAR: '0', MBR: PROG[0], IR: PROG[0] }, on: ['IR', 'PC'], src: 'MBR', m: 0, fl: 'MBR → IR', en: 'The instruction goes to <b>IR</b>, the instruction most recently fetched (being executed), and the PC now holds the next address, 1.', ar: 'الـ instruction بتروح للـ <b>IR</b>، وده آخر instruction اتجابت (اللي بتتنفذ)، والـ PC بقى فيه العنوان الجاي وهو ' + bdi('1') + '.' },
      { r: { PC: '2', MAR: '1', MBR: PROG[1], IR: PROG[1] }, on: ['MAR', 'MBR', 'IR', 'PC'], m: 1, fl: 'PC → MAR → MBR → IR', en: 'The same for the next instruction: address 1 goes PC → MAR, its word comes into MBR, then into IR; PC moves to 2.', ar: 'ونفس الكلام للـ instruction اللي بعدها: العنوان ' + bdi('1') + ' بيمشي كده:' + ltr('PC → MAR → MBR → IR') + 'والـ PC بيبقى ' + bdi('2') + '.' },
      { r: { PC: '2', MAR: '1', MBR: PROG[1], IR: PROG[1] }, on: ['PC'], m: 2, fl: 'next: address 2', en: 'The programmer never names PC, MAR, MBR or IR: they are user-invisible. On the 80x86 the visible IP (EIP), with CS, points to the next instruction to fetch.', ar: 'المبرمج عمره ما بيكتب PC أو MAR أو MBR أو IR في الكود، لأنهم user-invisible. وفي الـ 80x86 الـ IP (EIP) مع الـ CS بيشاوروا على الـ instruction الجاية اللي هتتجاب.' }
    ];
    const [i, ctl] = useSteps(steps.length, 3000), s = steps[i];
    return html`<figure className="fig mpv2"><div className="fig-stage"><div className="mpv2-fx2">
      <div className="mpv2-box"><b>CPU (user-invisible registers)</b><div className="mpv2-cpu">
        ${['PC', 'MAR', 'MBR', 'IR'].map(k => html`<div key=${k} className=${'mpv2-rg' + (s.on.includes(k) ? ' mpv2-on' : s.src === k ? ' mpv2-src' : '')}><small>${k}</small><b>${s.r[k] || '·'}</b></div>`)}
      </div></div>
      <div className="mpv2-flow">${s.fl}</div>
      <div className="mpv2-box"><b>Memory</b><div className="mpv2-mt">
        <span className="mpv2-a">addr</span><span>content</span>
        ${PROG.map((t, k) => html`<span key=${'a' + k} className=${'mpv2-a' + (s.m === k ? ' mpv2-on' : '')}>${k}</span><span key=${'c' + k} className=${s.m === k ? 'mpv2-on' : ''}>${t}</span>`)}
      </div></div>
      </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 0-6 review: which kind of register is it? (the notes' quiz traps included) ── */
  const KINDS = [['gp', 'General purpose'], ['sp', 'Special purpose'], ['seg', 'Segment'], ['inv', 'User-invisible'], ['none', 'No such register']];
  const DRILL = [
    ['EAX', 'gp', 'EAX is one of the eight 32-bit general purpose registers.', 'الـ EAX واحد من الـ general purpose registers التمانية، وحجمه ' + bdi('32 bits') + '.'],
    ['MBR', 'inv', 'MBR is user-invisible: it holds a word to be written to memory or the word most recently read.', 'الـ MBR هو user-invisible، وبيشيل word هتتكتب في الـ memory أو آخر word اتقرت.'],
    ['CS', 'seg', 'CS is the code segment register: 16-bit and user-visible.', 'الـ CS هو الـ code segment register، وهو ' + bdi('16-bit') + ' و user-visible.'],
    ['EFLAGS', 'sp', 'EFLAGS is one of the two 32-bit special purpose registers.', 'الـ EFLAGS واحد من الاتنين special purpose registers، وحجمه ' + bdi('32 bits') + '.'],
    ['SI', 'gp', 'SI is the 16-bit part of ESI, a general purpose register. SI and DI are not segment registers.', 'الـ SI هو الجزء الـ ' + bdi('16-bit') + ' من ESI، وده general purpose register. خلي بالك إن SI و DI مش segment registers.'],
    ['PC', 'inv', 'PC is user-invisible: it contains the address of the instruction to be fetched (not a count of executed instructions).', 'الـ PC هو user-invisible، وفيه عنوان الـ instruction اللي هتتجاب (مش عدد الـ instructions اللي اتنفذت).'],
    ['ESP', 'gp', 'ESP (stack pointer) is a general purpose register, user-visible.', 'الـ ESP (الـ stack pointer) هو general purpose register و user-visible.'],
    ['SL', 'none', 'There is no SL or SH: SI has no 8-bit halves, so ESI is used as 16 or 32 bits only.', 'مفيش حاجة اسمها SL أو SH، لأن الـ SI مالوش أنصاص ' + bdi('8-bit') + '، فالـ ESI بيستخدم ' + bdi('16') + ' أو ' + bdi('32 bits') + ' بس.'],
    ['DS', 'seg', 'DS is the data segment register.', 'الـ DS هو الـ data segment register.'],
    ['IR', 'inv', 'IR is user-invisible: it contains the instruction most recently fetched, the one being executed.', 'الـ IR هو user-invisible، وفيه آخر instruction اتجابت، يعني اللي بتتنفذ.'],
    ['EIP', 'sp', 'EIP is a special purpose register: the address of the next instruction to be executed.', 'الـ EIP هو special purpose register، وفيه عنوان الـ instruction الجاية اللي هتتنفذ.'],
    ['BP', 'gp', 'BP is the 16-bit part of EBP, a general purpose register.', 'الـ BP هو الجزء الـ ' + bdi('16-bit') + ' من EBP، وده general purpose register.'],
    ['EX', 'none', 'There is no EX (or FX): the general purpose registers are EAX, EBX, ECX, EDX, EBP, ESP, EDI, ESI.', 'مفيش حاجة اسمها EX أو FX. الـ general purpose registers هما EAX و EBX و ECX و EDX و EBP و ESP و EDI و ESI.'],
    ['SS', 'seg', 'SS is the stack segment register: it holds the segment of the stack.', 'الـ SS هو الـ stack segment register، وبيشيل الـ segment بتاع الـ stack.'],
    ['MAR', 'inv', 'MAR is user-invisible: it contains the address of a location in memory (not an instruction).', 'الـ MAR هو user-invisible، وفيه عنوان مكان في الـ memory (مش instruction).'],
    ['DI', 'gp', 'DI is the 16-bit part of EDI, a general purpose register, not a segment register.', 'الـ DI هو الجزء الـ ' + bdi('16-bit') + ' من EDI، وده general purpose register مش segment register.']
  ];
  function SortDrill({ ar }) {
    const [k, setK] = useState(0), [pick, setPick] = useState(null), [score, setScore] = useState(0);
    const done = k >= DRILL.length, d = DRILL[Math.min(k, DRILL.length - 1)];
    const choose = g => { if (pick) return; setPick(g); if (g === d[1]) setScore(x => x + 1); };
    const next = () => { setPick(null); setK(k + 1); };
    const again = () => { setPick(null); setK(0); setScore(0); };
    const name = g => KINDS.find(x => x[0] === g)[1];
    const cap = done ? { en: `Done: ${score} of ${DRILL.length} right.`, ar: 'خلصت، وجبت ' + bdi(score + ' / ' + DRILL.length) + ' صح.' }
      : !pick ? { en: 'Which kind of register is it? Pick one.', ar: 'الـ register ده من أنهي نوع؟ اختار واحد.' }
      : { en: (pick === d[1] ? 'Right. ' : `Not quite: the answer is <b>${name(d[1])}</b>. `) + d[2], ar: (pick === d[1] ? 'صح. ' : 'لأ، الإجابة هي <b>' + name(d[1]) + '</b>. ') + d[3] };
    return html`<figure className="fig mpv2"><div className="fig-stage">
      ${done ? html`<div className="mpv2-q">${score} / ${DRILL.length}<small>right answers</small></div>`
      : html`<div className="mpv2-q">${d[0]}<small>${k + 1} of ${DRILL.length}</small></div>
        <div className="mpv2-opts">${KINDS.map(([g, l]) => html`<button key=${g} className=${pick && g === d[1] ? 'mpv2-ok' : pick === g ? 'mpv2-no' : ''} disabled=${!!pick && pick !== g && g !== d[1]} onClick=${() => choose(g)}>${l}</button>`)}</div>`}
      <div className="mpv2-in">${done ? html`<button className="fig-btn solid" onClick=${again}>↻ Again</button>` : pick && html`<button className="fig-btn solid" onClick=${next}>Next ›</button>`}</div>
      <p className="mpv2-score">Score: ${score}</p>
      </div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── 7.0-7.2: MOV destination, source with the slide's three examples; word / double word ── */
  const MREG = {};
  ['A', 'B', 'C', 'D'].forEach(x => { MREG['E' + x + 'X'] = { r: x, w: 32 }; MREG[x + 'X'] = { r: x, w: 16 }; MREG[x + 'H'] = { r: x, w: 8, hi: 1 }; MREG[x + 'L'] = { r: x, w: 8 }; });
  const OTHER = ['ESI', 'EDI', 'ESP', 'EBP', 'SI', 'DI', 'SP', 'BP', 'CS', 'DS', 'ES', 'SS', 'EIP', 'IP', 'EFLAGS'];
  const rd = (R, d) => d.w === 32 ? R[d.r] : d.w === 16 ? R[d.r] & 0xFFFF : d.hi ? (R[d.r] >>> 8) & 255 : R[d.r] & 255;
  const wr = (R, d, v) => { const o = Object.assign({}, R), x = R[d.r]; o[d.r] = (d.w === 32 ? v : d.w === 16 ? ((x & 0xFFFF0000) | v) : d.hi ? ((x & 0xFFFF00FF) | (v << 8)) : ((x & 0xFFFFFF00) | v)) >>> 0; return o; };
  const SIZE = { 32: ['a double word (4 bytes)', 'double word يعني ' + bdi('4 bytes')], 16: ['a word (2 bytes)', 'word يعني ' + bdi('2 bytes')], 8: ['one byte (8 bits)', 'byte واحد يعني ' + bdi('8 bits')] };
  function movRun(R, line) {
    const m = /^\s*MOV\s+([A-Za-z]+)\s*,\s*(\S+)\s*$/i.exec(line);
    if (!m) return { err: 'Write it as MOV destination, source, e.g. MOV AX, 1234H.' };
    const dn = m[1].toUpperCase(), sn = m[2].toUpperCase(), d = MREG[dn];
    if (!d) return { err: OTHER.includes(dn) ? `This simulator shows only the A, B, C and D registers; pick one of those as the destination.` : `${dn} is not a register here.` };
    const s = MREG[sn];
    if (s) {
      if (s.w !== d.w) return { err: `${dn} is ${d.w} bits and ${sn} is ${s.w} bits: both operands must be the same size.` };
      const v = rd(R, s);
      return { R: wr(R, d, v), d, dn, s: sn, w: d.w, ins: `MOV ${dn}, ${sn}`, v,
        en: `<code>${esc(`MOV ${dn}, ${sn}`)}</code> copies the content of ${sn} (${hxc(v, d.w / 4)}) into ${dn}: ${SIZE[d.w][0]}. ${sn} keeps its value.`,
        ar: 'الـ instruction دي:' + ltr(`MOV ${dn}, ${sn}`) + 'بتنسخ محتوى الـ ' + sn + ' في الـ ' + dn + '، والقيمة اللي اتنسخت هي ' + bdi(hxc(v, d.w / 4)) + '، وحجمها ' + SIZE[d.w][1] + '. والـ ' + sn + ' بيفضل زي ما هو.' };
    }
    if (OTHER.includes(sn)) return { err: 'This simulator shows only the A, B, C and D registers as a source.' };
    const n = num(sn);
    if (!n) return { err: `${sn}: write a register or a number (decimal like 100, hex like 10H, binary like 1010B).` };
    if (n.v >= 2 ** d.w) return { err: `${sn} does not fit in ${dn} (${d.w} bits, largest ${hxc(2 ** d.w - 1, d.w / 4)}).` };
    const base = { dec: 'decimal', hex: 'hexadecimal', bin: 'binary' }[n.base];
    return { R: wr(R, d, n.v), d, dn, w: d.w, ins: `MOV ${dn}, ${sn}`, v: n.v,
      en: `<code>${esc(`MOV ${dn}, ${sn}`)}</code> copies ${sn.replace(/[HB]$/, '')} ${base}${n.base === 'hex' ? '' : ` (= ${hxc(n.v)})`} into ${dn}: ${SIZE[d.w][0]}. ${dn} = ${hxc(n.v, d.w / 4)}.`,
      ar: 'الـ instruction دي:' + ltr(`MOV ${dn}, ${sn}`) + 'بتنسخ الرقم ' + bdi(sn.replace(/[HB]$/, '')) + ' ' + base + (n.base === 'hex' ? '' : ' (يعني ' + bdi(hxc(n.v)) + ')') + ' في الـ ' + dn + '، وحجمه ' + SIZE[d.w][1] + '. النتيجة:' + ltr(`${dn} = ${hxc(n.v, d.w / 4)}`) };
  }
  const R0 = { A: 0, B: 0, C: 0x1234, D: 0 };
  function MovSim({ ar }) {
    const ex = [{ R: R0 }]; PROG.forEach(l => ex.push(movRun(ex[ex.length - 1].R, l)));
    const steps = [
      { en: '<code>MOV destination, source</code> copies a register, a memory location or immediate data into a register or memory location. Suppose CX = 1234H and the other registers are 0.', ar: 'الـ MOV بتنسخ register أو memory location أو immediate data في register أو memory location تاني:' + ltr('MOV destination, source') + 'هنفترض إن الـ CX فيه ' + bdi('1234H') + ' وباقي الـ registers بصفر.' },
      ex[1], ex[2], ex[3]
    ];
    const [i, ctl0] = useSteps(steps.length, 3000), [own, setOwn] = useState(null), [txt, setTxt] = useState('MOV AH, 0FFH'), [err, setErr] = useState('');
    const ctl = withCtl(ctl0, () => { setOwn(null); setErr(''); });
    const cur = own || ex[i], R = cur.R;
    const run = () => { const r = movRun(R, txt); if (r.err) { setErr(r.err); return; } setErr(''); setOwn(r); };
    const part = (x, k) => { const d = cur.d; if (!d || d.r !== x) return false; return d.w === 32 || (d.w === 16 && k > 0) || (d.w === 8 && (d.hi ? k === 1 : k === 2)); };
    const isSrc = (x, k) => { const s = cur.s && MREG[cur.s]; if (!s || s.r !== x) return false; return s.w === 32 || (s.w === 16 && k > 0) || (s.w === 8 && (s.hi ? k === 1 : k === 2)); };
    const cap = own ? own : steps[i];
    return html`<figure className="fig mpv2"><div className="fig-stage">
      ${!own && html`<div className="mpv2-prog">${PROG.map((l, k) => html`<div key=${k} className=${k + 1 === i ? 'mpv2-cur' : k + 1 < i ? 'mpv2-done' : ''}><span>${l}</span><small>${['32-bit', '8-bit', '16-bit'][k]}</small></div>`)}</div>`}
      ${own && html`<div className="mpv2-prog"><div className="mpv2-cur"><span>${own.ins}</span><small>${own.w}-bit</small></div></div>`}
      <div className="mpv2-mregs">${['A', 'B', 'C', 'D'].map(x => { const v = R[x]; return html`<div key=${x} className="mpv2-mr"><b>E${x}X</b>
        ${[['31–16', hx(v >>> 16, 4)], [x + 'H', hx((v >>> 8) & 255, 2)], [x + 'L', hx(v & 255, 2)]].map(([l, t], k) => html`<span key=${k} className=${part(x, k) ? 'mpv2-on' : isSrc(x, k) ? 'mpv2-src' : ''}><small>${l}</small><i>${t}</i></span>`)}</div>`; })}</div>
      <div className="mpv2-in"><span className="mpv2-lbl">Try your own (registers EAX to EDX, values in H, B or decimal)</span>
        <input value=${txt} size="15" onChange=${e => setTxt(e.target.value)} onKeyDown=${e => e.key === 'Enter' && run()} aria-label="MOV instruction" />
        <button className="fig-btn solid" onClick=${run}>Run</button>
        <button className="fig-btn" onClick=${() => { setOwn(null); setErr(''); ctl0.replay(); }}>Example from the notes</button></div>
      ${err && html`<p className="mpv2-err">${err}</p>`}
      </div><${Cap} en=${cap.en} ar=${cap.ar} showAr=${ar} /><${Bar} steps=${steps} i=${own ? steps.length - 1 : i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'mp-l2-reg-tree': RegTree, 'mp-l2-eax-parts': RegParts, 'mp-l2-ax-halves': AxHalves, 'mp-l2-prog-model': ProgModel, 'mp-l2-seg-map': SegMap, 'mp-l2-eflags': Eflags, 'mp-l2-zsco': FlagsCalc, 'mp-l2-fetch': Fetch, 'mp-l2-reg-drill': SortDrill, 'mp-l2-mov': MovSim });
})();
/* ── part L4 ── */
// Microprocessors visuals, Lecture 4 (Addressing modes 2: register indirect, indexed, base plus index, base plus index plus displacement): the four pointer registers and their default segments, the default-segment rule as a checker, indexed forms, an array walked by base + index, the slides' memory-state figures, the sheet address calculator and a memory-state figure builder. Every label and number comes from the site's notes (slides Lec_04).
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop } = window.FIGKIT;
  const CSS = `
.mpv4 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mpv4-code{ font:700 1rem/1.4 var(--mono); text-align:center; padding:8px 10px; border-radius:8px; background:var(--paper); border:1px solid var(--line); color:var(--ink); margin:0 auto 10px; max-width:420px; overflow-wrap:anywhere; }
.mpv4-hs{ color:var(--fig-k); text-decoration:underline; text-underline-offset:3px; } .mpv4-hd{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); border-radius:4px; padding:0 2px; } .mpv4-hp{ color:var(--fig-k); }
.mpv4-in{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; margin:0 0 10px; font-size:.86rem; color:var(--ink); }
.mpv4-in input, .mpv4-in select{ font:600 .9rem var(--mono); padding:5px 8px; border:1px solid var(--line); border-radius:7px; background:var(--paper); color:var(--ink); min-width:0; box-sizing:border-box; max-width:100%; }
.mpv4-in input:focus, .mpv4-in select:focus, .mpv4-rv input:focus{ outline:2px solid var(--fig-k); outline-offset:1px; }
.mpv4-lbl{ font-size:.8rem; color:var(--graphite); width:100%; text-align:center; }
.mpv4-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.mpv4-chip{ font:600 .8rem/1.2 var(--mono); padding:5px 8px; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv4-chip[aria-pressed="true"]{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.mpv4-grp{ font-size:.78rem; color:var(--graphite); width:100%; text-align:center; margin-top:2px; }
.mpv4-rv{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:5px 6px; max-width:360px; margin:0 auto 10px; }
.mpv4-rv label{ display:grid; gap:2px; font:700 .8rem var(--mono); color:var(--graphite); text-align:center; min-width:0; }
.mpv4-rv input{ font:600 .84rem var(--mono); padding:4px 4px; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); min-width:0; width:100%; box-sizing:border-box; }
.mpv4-ver{ max-width:420px; margin:0 auto; border-radius:10px; padding:8px 10px; border:2px solid var(--line); font-size:.86rem; color:var(--ink); background:var(--paper); }
.mpv4-ver.mpv4-ok{ border-color:var(--ok); } .mpv4-ver.mpv4-bad{ border-color:var(--pen); } .mpv4-ver.mpv4-nt{ border-color:var(--fig-k); border-style:dashed; }
.mpv4-ver > b{ display:block; } .mpv4-ver.mpv4-ok > b{ color:var(--ok); } .mpv4-ver.mpv4-bad > b{ color:var(--pen); }
.mpv4-ver ul{ margin:4px 0 0; padding-left:18px; } .mpv4-ver li{ margin:2px 0; }
.mpv4-seg{ font:700 1.3rem var(--mono); color:var(--fig-k); }
.mpv4-tbl{ width:100%; max-width:420px; margin:0 auto 10px; border-collapse:collapse; font-size:.84rem; color:var(--ink); background:var(--paper); }
.mpv4-tbl th, .mpv4-tbl td{ border:1px solid var(--line); padding:4px 6px; text-align:left; vertical-align:top; }
.mpv4-tbl th{ font-size:.8rem; color:var(--graphite); font-weight:600; } .mpv4-tbl td:last-child{ font-family:var(--mono); font-weight:700; }
.mpv4-tbl tr.mpv4-on td{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); } .mpv4-tbl tr.mpv4-on td:last-child{ color:var(--fig-k); }
.mpv4-calc{ text-align:center; font:600 .86rem/1.5 var(--mono); color:var(--ink); margin:8px auto 0; max-width:420px; overflow-wrap:anywhere; }
.mpv4-parts{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:420px; margin:0 auto 8px; }
.mpv4-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 4px; text-align:center; transition:opacity .4s, box-shadow .4s, background .4s; min-width:0; }
.mpv4-card small{ display:block; font-size:.78rem; color:var(--graphite); } .mpv4-card b{ display:block; font:700 .95rem var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.mpv4-card.mpv4-on{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); box-shadow:0 0 0 2px var(--fig-k); }
.mpv4-card.mpv4-dim{ opacity:.45; }
.mpv4-eq{ text-align:center; font:700 .95rem var(--mono); color:var(--ink); margin:0 0 10px; overflow-wrap:anywhere; } .mpv4-eq span{ color:var(--graphite); font:600 .8rem var(--body); display:block; }
.mpv4-mode{ text-align:center; font-weight:700; margin:8px 0 0; color:var(--ink); }
.mpv4-err{ text-align:center; color:var(--pen); font-size:.86rem; margin:6px 0 0; }
.mpv4-steps{ max-width:420px; margin:0 auto; display:grid; gap:6px; }
.mpv4-st{ border:1px solid var(--line); border-radius:9px; background:var(--paper); padding:6px 9px; font-size:.84rem; color:var(--ink); transition:opacity .4s, box-shadow .4s; }
.mpv4-st small{ display:block; color:var(--graphite); font-size:.78rem; } .mpv4-st b{ display:block; font:700 .9rem/1.45 var(--mono); overflow-wrap:anywhere; }
.mpv4-st.mpv4-on{ box-shadow:0 0 0 2px var(--fig-k); } .mpv4-st.mpv4-tot b{ color:var(--fig-k); }
.mpv4-walk{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.25fr); gap:10px; max-width:420px; margin:0 auto; align-items:start; }
.mpv4-regs{ display:grid; gap:6px; }
.mpv4-mem{ border:1px solid var(--line); border-radius:8px; overflow:hidden; background:var(--paper); }
.mpv4-mem div{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:6px; padding:4px 7px; border-top:1px solid var(--line); font:600 .84rem var(--mono); color:var(--ink); transition:background .35s; }
.mpv4-mem div:first-child{ border-top:0; } .mpv4-mem div span{ color:var(--graphite); } .mpv4-mem div i{ font-style:normal; text-align:right; }
.mpv4-mem div.mpv4-on{ background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); } .mpv4-mem div.mpv4-on span{ color:var(--ink); }
.mpv4-mem div.mpv4-gap{ display:block; text-align:center; color:var(--graphite); }
.mpv4-mh{ font-size:.78rem; color:var(--graphite); text-align:center; margin:0 0 3px; }
.mpv4-fig svg text{ font-family:var(--mono); }
.mpv4-fig .mpv4-ln{ stroke:var(--ink); stroke-width:1.4; fill:none; } .mpv4-fig .mpv4-cl{ fill:var(--paper); stroke:var(--ink); stroke-width:1.2; }
.mpv4-fig .mpv4-hi{ fill:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); } .mpv4-fig .mpv4-aw{ stroke:var(--fig-k); stroke-width:2.2; fill:none; }
.mpv4-fig .mpv4-dimc{ fill:var(--paper-2); stroke:var(--line); stroke-width:1.2; } .mpv4-fig .mpv4-x{ stroke:var(--pen); stroke-width:2.4; }
.mpv4-fig .mpv4-g{ fill:var(--graphite); } .mpv4-fig .mpv4-k{ fill:var(--fig-k); } .mpv4-fig .mpv4-p{ fill:var(--pen); }
.mpv4-tabs{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; padding:10px 12px 0; }
.mpv4-tabs .fig-btn{ font-family:var(--mono); font-size:.8rem; padding:5px 9px; }`;
  if (!document.getElementById('mpv4-css')) { const s = document.createElement('style'); s.id = 'mpv4-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* shared: registers, hex numbers, text helpers */
  const R32 = ['EAX', 'EBX', 'ECX', 'EDX', 'ESI', 'EDI', 'ESP', 'EBP'], R16 = ['AX', 'BX', 'CX', 'DX', 'SI', 'DI', 'SP', 'BP'], R8 = ['AL', 'AH', 'BL', 'BH', 'CL', 'CH', 'DL', 'DH'], SEG = ['CS', 'DS', 'ES', 'SS'];
  const width = r => R32.includes(r) ? 32 : R16.includes(r) ? 16 : R8.includes(r) ? 8 : SEG.includes(r) ? 16 : 0;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const bdi = s => `<bdi dir="ltr">${esc(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const ltr = s => `<span class="ltr">${esc(s)}</span>`;
  const H = v => (v < 0 ? '-' : '') + Math.abs(v).toString(16).toUpperCase();
  const H5 = v => v.toString(16).toUpperCase().padStart(5, '0');
  // in this lecture every number is hexadecimal, with or without the H suffix (100 = 100H, 0BC, AB)
  const hexv = t => { t = String(t || '').trim().toUpperCase().replace(/H$/, ''); return /^[0-9A-F]{1,5}$/.test(t) ? parseInt(t, 16) : null; };
  const BASE = ['BX', 'BP'], INDEX = ['SI', 'DI'], PTR = ['BX', 'BP', 'SI', 'DI'];
  const VKEYS = ['DS', 'SS', 'ES', 'CS', 'BX', 'BP', 'SI', 'DI'];
  const E = {
    form: { en: 'Write the memory operand like <code>[BX]</code>, <code>20[BX]</code>, <code>[BX+SI]</code> or <code>100[BX][DI]</code>.', ar: 'اكتب الـ memory operand بالشكل ده:' + ltr('[BX]   20[BX]   [BX+SI]   100[BX][DI]') },
    noMem: { en: 'There is no memory operand in [ ], so no address is computed (register and immediate addressing are Lecture 3).', ar: 'مفيش memory operand جوه الأقواس، فمفيش address بيتحسب (الـ register والـ immediate addressing في Lecture 3).' },
    m2m: { en: 'Memory to memory moves are not allowed except for string instructions: <code>MOV [DI], [SI]</code> is incorrect.', ar: 'النقل من memory لـ memory مش مسموح إلا في الـ string instructions، فالـ ' + bdi('MOV [DI], [SI]') + ' غلط.' },
    unk: { en: 'An operand is not a register, a memory operand in [ ] or a number.', ar: 'فيه operand مش register ولا memory operand جوه أقواس ولا رقم.' }
  };

  // one memory operand: [optional SEG:] [optional displacement] [...][...]
  function parseMem(raw) {
    let t = raw.toUpperCase().replace(/\s+/g, ''), ovr = null, m;
    if ((m = /^(CS|DS|ES|SS):(.*)$/.exec(t))) { ovr = m[1]; t = m[2]; }
    m = /^([0-9A-F]+H?)?((?:\[[^[\]]*\])+)$/.exec(t);
    if (!m) return { errs: [E.form] };
    const terms = [], errs = [];
    if (m[1]) terms.push({ s: 1, x: m[1], out: true });
    for (const g of m[2].match(/\[[^\]]*\]/g)) {
      const inner = g.slice(1, -1), toks = inner.match(/[+-]?[^+-]+/g) || [];
      if (!inner || toks.join('') !== inner) return { errs: [E.form] };
      for (const k of toks) terms.push({ s: k[0] === '-' ? -1 : 1, x: k.replace(/^[+-]/, '') });
    }
    for (const q of terms) { if (width(q.x)) q.reg = q.x; else if (hexv(q.x) != null) q.v = hexv(q.x); else return { errs: [E.form] }; }
    const regs = terms.filter(q => q.reg).map(q => q.reg), nums = terms.filter(q => !q.reg);
    const bad = regs.filter(r => !PTR.includes(r));
    if (bad.length) errs.push(R32.includes(bad[0])
      ? { en: `${bad[0]} is a 32-bit register: this lecture's pointers are the 16-bit BX, BP, SI and DI.`, ar: `الـ ${bad[0]} ده register حجمه ${bdi('32-bit')}، والـ pointers في المحاضرة دي هي الـ 16-bit بس، يعني BX و BP و SI و DI.` }
      : { en: `<code>[${esc(bad[0])}]</code> is invalid: only BP, BX, DI and SI can hold the offset in 16-bit mode (<code>[AX]</code>, <code>[CX]</code>, <code>[DX]</code> are invalid).`, ar: `الـ ${bdi('[' + bad[0] + ']')} غلط، لأن BP و BX و DI و SI بس اللي ينفع يشيلوا الـ offset في الـ ${bdi('16-bit')} mode (والـ ${bdi('[AX]')} و ${bdi('[CX]')} و ${bdi('[DX]')} غلط).` });
    if (terms.some(q => q.reg && q.s < 0)) errs.push({ en: 'A register cannot be subtracted: only the displacement can be negative, like <code>[BP-2]</code>.', ar: 'ماينفعش تطرح register، الـ displacement بس هو اللي ممكن يبقى سالب زي ' + bdi('[BP-2]') + '.' });
    if (new Set(regs).size < regs.length) errs.push({ en: 'The same register is written twice.', ar: 'نفس الـ register مكتوب مرتين.' });
    else if (regs.length > 2) errs.push({ en: 'At most one base (BX or BP) and one index (SI or DI).', ar: 'الحد الأقصى base واحد (BX أو BP) و index واحد (SI أو DI).' });
    const pair = regs.length === 2 && (regs.every(r => BASE.includes(r)) || regs.every(r => INDEX.includes(r)));
    const def = regs.includes('BP') ? 'SS' : 'DS', seg = ovr || def;
    const mode = !regs.length ? 'Direct or displacement addressing (Lecture 3)' : regs.length === 1 ? (nums.length ? 'Indexed addressing' : 'Register indirect addressing') : nums.length ? 'Base plus index plus displacement' : 'Base plus index';
    const row = ovr ? 5 : def === 'SS' ? 1 : 0;
    const sym = terms.map((q, k) => (k ? (q.s < 0 ? ' - ' : ' + ') : (q.s < 0 ? '-' : '')) + (q.reg || H(q.v))).join('');
    return { errs, ovr, def, seg, terms, regs, nums, pair, mode, row, sym, n: raw.trim().toUpperCase().replace(/\s+/g, '') };
  }
  function opnd(o) {
    if (width(o)) return { k: 'reg', n: o, w: width(o) };
    if (/\[/.test(o)) return Object.assign({ k: 'mem' }, parseMem(o));
    if (hexv(o) != null) return { k: 'imm', n: o };
    return { k: 'unk', n: o };
  }
  // a whole instruction (or a bare operand): which memory operand, which register, load or store
  function analyse(raw) {
    const t = String(raw).trim().toUpperCase().replace(/\s+/g, ' ');
    if (/^(PUSH|POP)\b/.test(t)) return { kind: 'stack', row: 2 };
    if (/^(STOS|INS)/.test(t)) return { kind: 'str', row: 4 };
    if (/FETCH|^IP$/.test(t)) return { kind: 'fetch', row: 3 };
    const m = /^MOV\s+([^,]+),(.+)$/.exec(t);
    let d = null, s;
    if (m) { d = opnd(m[1].replace(/ /g, '')); s = opnd(m[2].replace(/ /g, '')); }
    else if (/\[/.test(t)) s = opnd(t.replace(/^MOV\s*/, '').replace(/ /g, ''));
    else return { kind: 'err', errs: [E.form] };
    if ((d && d.k === 'unk') || s.k === 'unk') return { kind: 'err', errs: [E.unk] };
    if (d && d.k === 'mem' && s.k === 'mem') return { kind: 'err', errs: [E.m2m] };
    const mem = d && d.k === 'mem' ? d : s.k === 'mem' ? s : null, reg = mem === d ? s : d;
    if (!mem) return { kind: 'err', errs: [E.noMem] };
    if (mem.errs.length) return { kind: 'err', errs: mem.errs, mem };
    return { kind: 'mem', mem, reg: reg && reg.k === 'reg' ? reg.n : null, store: mem === d, size: reg && reg.k === 'reg' ? reg.w / 8 : 0 };
  }
  // the address with the course's method: segment × 10, plus every offset part, all in hex
  function solve(ins, V) {
    const a = analyse(ins);
    if (a.kind !== 'mem') return a.kind === 'err' ? a : { kind: 'err', errs: [{ en: 'Type a MOV with a memory operand in [ ] to compute an address.', ar: 'اكتب MOV فيها memory operand جوه أقواس عشان نحسب الـ address.' }] };
    const m = a.mem, need = [m.seg, ...m.regs], miss = need.filter(r => hexv(V[r]) == null);
    if (miss.length) return { kind: 'err', errs: [{ en: `Give ${miss.join(' and ')} a hex value (1 to 4 digits) in the boxes.`, ar: `اكتب قيمة hex للـ ${miss.join(' و ')} في المربعات (من رقم لـ 4 أرقام).` }] };
    if (need.some(r => hexv(V[r]) > 0xFFFF)) return { kind: 'err', errs: [{ en: 'Segment and register values are 16-bit: at most 4 hex digits (FFFF).', ar: 'قيم الـ segment والـ registers حجمها ' + bdi('16-bit') + '، يعني 4 أرقام hex بالكتير ' + bdi('(FFFF)') + '.' }] };
    const segv = hexv(V[m.seg]), base = segv * 16;
    const parts = m.terms.map(q => ({ ...q, val: q.reg ? hexv(V[q.reg]) : q.v }));
    const off = parts.reduce((s, q) => s + q.s * q.val, 0), addr = base + off;
    const vals = parts.map((q, k) => (k ? (q.s < 0 ? ' - ' : ' + ') : (q.s < 0 ? '-' : '')) + H(q.val)).join('');
    return Object.assign({}, a, { segv, base, parts, off, addr, vals, odd: off < 0 || off > 0xFFFF || addr > 0xFFFFF });
  }
  const segWhyEn = m => m.ovr ? `${m.ovr}: is written, so the segment is forced to ${m.ovr} (override)` : m.def === 'SS' ? 'BP is used, so the default segment is SS' : m.regs.length ? `${m.regs.join(' and ')} use the default segment DS` : 'a constant only uses DS';
  const segWhyAr = m => m.ovr ? `مكتوب ${bdi(m.ovr + ':')}، فالـ segment اتغيّر غصب لـ ${m.ovr} (override).` : m.def === 'SS' ? 'فيه BP، فالـ default segment هو SS.' : m.regs.length ? `الـ ${m.regs.join(' و ')} الـ default segment بتاعهم DS.` : 'رقم ثابت بس، فالـ segment هو DS.';
  const byteNames = r => { const b = r.replace(/^E/, ''); return /^[ABCD]X$/.test(b) ? [b[0] + 'L', b[0] + 'H'] : ['the low byte', 'the high byte']; };

  /* ── 0.0-0.2: the four pointer registers and their default segments ── */
  const RI = [
    { r: 'BX', ins: 'MOV AL, [BX]', d: 'AL', seg: 'DS' },
    { r: 'DI', ins: 'MOV BL, [DI]', d: 'BL', seg: 'DS' },
    { r: 'SI', ins: 'MOV EAX, [SI]', d: 'EAX', seg: 'DS' },
    { r: 'BP', ins: 'MOV AL, [BP]', d: 'AL', seg: 'SS' },
    { r: null, ins: 'MOV AL, [AX]', bad: true }];
  function RiPointer({ ar }) {
    const steps = [
      { en: '<code>MOV AL, [BX]</code>: BX holds an offset. The CPU reads the byte at DS×10 + BX (default segment DS) and copies it into AL.',
        ar: 'في ' + bdi('MOV AL, [BX]') + ' الـ BX شايل offset. الـ CPU بيقرا الـ byte اللي عند الـ address ده وبينسخه في الـ AL (الـ default segment هو DS):' + ltr('DS×10 + BX') },
      { en: '<code>MOV BL, [DI]</code>: DI holds the offset, the default segment is again DS. One byte goes into BL.',
        ar: 'في ' + bdi('MOV BL, [DI]') + ' الـ DI هو اللي شايل الـ offset، والـ default segment برضه DS. وبيتنقل byte واحد للـ BL.' },
      { en: '<code>MOV EAX, [SI]</code>: SI holds the offset, segment DS. EAX is 32-bit, so 4 bytes are read starting at DS×10 + SI.',
        ar: 'في ' + bdi('MOV EAX, [SI]') + ' الـ SI شايل الـ offset والـ segment هو DS. والـ EAX حجمه ' + bdi('32-bit') + '، فبيتقري 4 bytes بادئين من العنوان ده:' + ltr('DS×10 + SI') },
      { en: '<code>MOV AL, [BP]</code>: BP is different, its default segment is <b>SS</b> (the stack segment), so the address is SS×10 + BP.',
        ar: 'في ' + bdi('MOV AL, [BP]') + ' الـ BP مختلف، الـ default segment بتاعه <b>SS</b> (الـ stack segment)، فالعنوان بيبقى:' + ltr('SS×10 + BP') },
      { en: 'Only these four (BX, DI, SI, BP) can be pointers in 16-bit mode: <code>[AX]</code>, <code>[CX]</code> and <code>[DX]</code> are invalid.',
        ar: 'الأربعة دول بس (BX و DI و SI و BP) اللي ينفع يبقوا pointers في الـ ' + bdi('16-bit') + ' mode، والـ ' + bdi('[AX]') + ' و ' + bdi('[CX]') + ' و ' + bdi('[DX]') + ' غلط.' }];
    const [i, ctl] = useSteps(steps.length, 2600), x = RI[i];
    const REG = ['BX', 'DI', 'SI', 'BP', 'AX', 'CX', 'DX'], ry = k => 34 + k * 34 + (k > 3 ? 12 : 0);
    const segY = { DS: 34, SS: 166 }, cellY = s => segY[s] + 40, n = x.d === 'EAX' ? 4 : 1;
    return html`<figure className="fig mpv4"><div className="fig-stage mpv4-fig">
      <div className="mpv4-code">${x.bad ? html`MOV AL, [<span className="mpv4-hs">AX</span>]` : html`MOV <span className="mpv4-hd">${x.d}</span>, [<span className="mpv4-hs">${x.r}</span>]`}</div>
      <svg viewBox="0 0 300 300" role="img" aria-label=${x.bad ? 'AX, CX and DX cannot hold an offset' : x.r + ' holds the offset into the ' + x.seg + ' segment'}>
        <defs><marker id="mpv4-ah0" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--fig-k)" /></marker></defs>
        <text x="8" y="22" fontSize="14" fontWeight="700">Pointers</text>
        ${REG.map((r, k) => { const ok = k < 4, on = ok ? x.r === r : !!x.bad; return html`<g key=${r}>
          <rect x="8" y=${ry(k)} width="64" height="28" rx="5" className=${on && ok ? 'mpv4-cl mpv4-hi' : ok ? 'mpv4-cl' : 'mpv4-dimc'} />
          <text x="40" y=${ry(k) + 19} fontSize="15" fontWeight="700" textAnchor="middle" className=${ok ? '' : 'mpv4-g'}>${'[' + r + ']'}</text>
          ${!ok && html`<g className=${pop(x.bad)}><path d=${`M80,${ry(k) + 6} l14,14 M94,${ry(k) + 6} l-14,14`} className="mpv4-x" /></g>`}</g>`; })}
        <path d=${`M8,${ry(4) - 8} H72`} className="mpv4-ln" strokeDasharray="4 4" />
        ${['DS', 'SS'].map(s => html`<g key=${s}>
          <text x="160" y=${segY[s] - 8} fontSize="14" fontWeight="700" className=${!x.bad && x.seg === s ? 'mpv4-k' : ''}>${s + ' segment'}</text>
          ${[0, 1, 2, 3, 4].map(c => html`<rect key=${c} x="160" y=${segY[s] + c * 20} width="132" height="20" className=${!x.bad && x.seg === s && c >= 2 && c < 2 + n ? 'mpv4-cl mpv4-hi' : 'mpv4-cl'} />`)}
          ${!x.bad && x.seg === s && html`<text x="226" y=${cellY(s) + 14} fontSize="13.5" textAnchor="middle" fontWeight="700">${s + '×10 + ' + x.r}</text>`}</g>`)}
        ${!x.bad && html`<g key=${'a' + i} className="pop"><path d=${`M72,${ry(i) + 14} C120,${ry(i) + 14} 112,${cellY(x.seg) + 10} 158,${cellY(x.seg) + 10}`} className="mpv4-aw" markerEnd="url(#mpv4-ah0)" /></g>`}
        ${x.bad && html`<text x="226" y="150" fontSize="14" textAnchor="middle" fontWeight="700" className="mpv4-p">✗ invalid</text>`}
      </svg>
      <p className="mpv4-mode">${x.bad ? 'Not a pointer register' : `${x.r} → ${x.seg} segment${n > 1 ? ' (4 bytes for EAX)' : ''}`}</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 1 (and 3.3, quiz): which segment? the default-segment rule as a checker ── */
  const ROWS = [['BX, SI, DI, or a constant only', 'DS'], ['BP (anywhere in the expression)', 'SS'], ['SP (PUSH / POP)', 'SS'], ['IP (instruction fetch)', 'CS'], ['DI in string destinations (STOS, INS)', 'ES'], ['Explicit prefix like ES:[...]', 'The written segment (override)']];
  const SEG_EX = ['MOV BX, 50[BP]', 'MOV 30[BP], BX', 'MOV BX, 50[SI-10]', 'MOV [SI][BP], BX', 'MOV [BX][BP], AX', 'MOV AL, [BX]', 'MOV AX, 1000[BP]', 'MOV AX, [BP-2]', 'MOV AX, DS:[BP-2]', 'MOV AL, CS:[BX]', 'MOV EAX, ES:[BX][SI]', 'MOV AX, 10[SI+BC]', 'MOV [DI], [SI]', 'MOV AL, [AX]', 'PUSH / POP', 'instruction fetch', 'STOS / INS'];
  function segVerdict(a) {
    if (a.kind === 'stack') return { seg: 'SS', en: 'PUSH and POP use SP as the offset, and SP always works in the stack segment <b>SS</b>.', ar: 'الـ PUSH والـ POP بيستخدموا الـ SP كـ offset، والـ SP دايمًا شغال في الـ stack segment يعني <b>SS</b>.' };
    if (a.kind === 'fetch') return { seg: 'CS', en: 'Instructions are fetched at CS:IP: the offset is IP and the segment is <b>CS</b>.', ar: 'الـ instructions بتتجاب من ' + bdi('CS:IP') + '، يعني الـ offset هو IP والـ segment هو <b>CS</b>.' };
    if (a.kind === 'str') return { seg: 'ES', en: 'In string destinations (STOS, INS) DI points into the extra segment <b>ES</b>.', ar: 'في الـ destination بتاع الـ string instructions (STOS و INS) الـ DI بيشاور جوه الـ extra segment يعني <b>ES</b>.' };
    const m = a.mem, f = `${m.seg}×10 + ${m.sym}`;
    let en = `Segment <b>${m.seg}</b>: ${segWhyEn(m)}. ${m.mode}, address = ${esc(f)}.`;
    let ar = `الـ segment هنا <b>${m.seg}</b>. ` + segWhyAr(m) + ` والـ mode اسمه ${m.mode}، والعنوان:` + ltr(f);
    if (m.pair) { en += ` Note: ${m.regs.join(' and ')} are two ${BASE.includes(m.regs[0]) ? 'bases' : 'indexes'}, which cannot be combined on a real 8086; exams still ask for the segment, and the intended answer is ${m.seg}${m.regs.includes('BP') ? ' (because BP is used)' : ''}.`;
      ar += `خلي بالك إن الـ ${m.regs.join(' و ')} اتنين ${BASE.includes(m.regs[0]) ? 'base' : 'index'}، ودول ماينفعش يتجمعوا على الـ 8086 الحقيقي. بس الامتحان بيسأل عن الـ segment، والإجابة المقصودة ${m.seg}${m.regs.includes('BP') ? ' (عشان فيه BP)' : ''}.`; }
    return { seg: m.seg, en, ar, mode: m.mode };
  }
  function SegPick({ ar }) {
    const [txt, setTxt] = useState('MOV BX, 50[BP]'), a = analyse(txt), v = a.kind === 'err' ? null : segVerdict(a);
    const row = a.kind === 'err' ? -1 : a.kind === 'mem' ? a.mem.row : a.row;
    const en = v ? v.en : a.errs.map(e => e.en).join(' '), arT = v ? v.ar : a.errs.map(e => e.ar).join('<br>');
    return html`<figure className="fig mpv4"><div className="fig-stage">
      <div className="mpv4-in"><span className="mpv4-lbl">Example from the notes and quiz</span>
        <select aria-label="Example from the notes" value=${SEG_EX.includes(txt) ? txt : ''} onChange=${e => e.target.value && setTxt(e.target.value)}>
          <option value="">choose…</option>${SEG_EX.map(x => html`<option key=${x} value=${x}>${x}</option>`)}</select></div>
      <div className="mpv4-in"><span className="mpv4-lbl">Try your own</span><input aria-label="Instruction" value=${txt} onInput=${e => setTxt(e.target.value)} onChange=${e => setTxt(e.target.value)} spellCheck="false" style=${{ width: '230px' }} /></div>
      <table className="mpv4-tbl"><thead><tr><th>Offset uses</th><th>Default segment</th></tr></thead><tbody>
        ${ROWS.map((r, k) => html`<tr key=${k} className=${k === row ? 'mpv4-on' : ''}><td>${r[0]}</td><td>${k === 5 && a.kind === 'mem' && row === 5 ? a.mem.seg + ' (override)' : r[1]}</td></tr>`)}</tbody></table>
      <div className=${'mpv4-ver ' + (v ? (a.kind === 'mem' && a.mem.pair ? 'mpv4-nt' : 'mpv4-ok') : 'mpv4-bad')}>
        ${v ? html`<b>Segment: <span className="mpv4-seg">${v.seg}</span></b>${v.mode && html`<span>${v.mode}</span>`}${a.kind === 'mem' && html`<div className="mpv4-calc" style=${{ margin: '4px 0 0', textAlign: 'left' }}>${a.mem.seg}×10 + ${a.mem.sym}</div>`}`
          : html`<b>✗ Incorrect</b><ul>${a.errs.map((e, k) => html`<li key=${k} dangerouslySetInnerHTML=${{ __html: e.en }}></li>`)}</ul>`}</div></div>
      <${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  /* ── 2.0-2.2: indexed addressing: displacement + register, two ways to write it ── */
  const IDX = [
    { w: 'MOV AL, 20[BX]', same: 'MOV AL, [BX+20]', d: '20', r: 'BX', seg: 'DS', how: 'default' },
    { w: 'MOV AX, 1000[BP]', same: 'MOV AX, [BP+1000]', d: '1000', r: 'BP', seg: 'SS', how: 'default' },
    { w: 'MOV AX, AB[SI]', same: 'MOV AX, [SI+AB]', d: 'AB', r: 'SI', seg: 'DS', how: 'default' },
    { w: 'MOV EAX, ES:100[DI]', same: 'MOV EAX, ES:[DI+100]', d: '100', r: 'DI', seg: 'ES', how: 'override' },
    { w: 'MOV AX, [BP-2]', same: 'MOV AX, -2[BP]', d: '-2', r: 'BP', seg: 'SS', how: 'default', neg: true },
    { w: 'MOV AX, [BP+200H]', same: 'MOV AX, 200H[BP]', d: '200H', r: 'BP', seg: 'SS', how: 'default' }];
  function IndexedForms({ ar }) {
    const steps = [
      { en: 'Indexed addressing: the offset is the sum of a displacement constant and the register. <code>MOV AL, 20[BX]</code> is the same as <code>[BX+20]</code>; BX uses the default segment DS.',
        ar: 'في الـ Indexed addressing الـ offset هو مجموع displacement ثابت والـ register. والـ ' + bdi('MOV AL, 20[BX]') + ' هي هي ' + bdi('[BX+20]') + '، والـ BX الـ default segment بتاعه DS.' },
      { en: '<code>MOV AX, 1000[BP]</code>: BP uses the default segment <b>SS</b>, so the address is SS×10 + BP + 1000.',
        ar: 'في ' + bdi('MOV AX, 1000[BP]') + ' الـ BP الـ default segment بتاعه <b>SS</b>، فالعنوان:' + ltr('SS×10 + BP + 1000') },
      { en: '<code>MOV AX, AB[SI]</code>: the displacement AB (hex) plus SI, in DS.',
        ar: 'في ' + bdi('MOV AX, AB[SI]') + ' الـ displacement هو ' + bdi('AB') + ' (hex) زائد الـ SI، في الـ DS.' },
      { en: '<code>MOV EAX, ES:100[DI]</code>: ES: overrides the default DS, so the address is ES×10 + DI + 100.',
        ar: 'في ' + bdi('MOV EAX, ES:100[DI]') + ' الـ ' + bdi('ES:') + ' بتاخد مكان الـ DS الـ default، فالعنوان:' + ltr('ES×10 + DI + 100') },
      { en: '<code>[BP-2]</code> is legal: BP plus a negative displacement, segment SS.',
        ar: 'الـ ' + bdi('[BP-2]') + ' سليمة (legal)، ده BP زائد displacement سالب، والـ segment هو SS.' },
      { en: '<code>[BP+200H]</code> is legal too: the same as <code>200H[BP]</code>, segment SS.',
        ar: 'والـ ' + bdi('[BP+200H]') + ' سليمة برضه، وهي هي ' + bdi('200H[BP]') + '، والـ segment هو SS.' }];
    const [i, ctl] = useSteps(steps.length, 2800), x = IDX[i];
    const f = `${x.seg}×10 + ${x.r} ${x.neg ? '- 2' : '+ ' + x.d}`;
    return html`<figure className="fig mpv4"><div className="fig-stage">
      <div className="mpv4-code">${x.w}</div>
      <p className="mpv4-eq"><span>is the same as</span>${x.same}</p>
      <div className="mpv4-parts">
        <div className=${'mpv4-card' + (x.how === 'override' || x.seg === 'SS' ? ' mpv4-on' : '')}><small>${x.how === 'override' ? 'segment (override)' : 'default segment'}</small><b>${x.seg}</b></div>
        <div className="mpv4-card"><small>register</small><b>${x.r}</b></div>
        <div className="mpv4-card"><small>displacement</small><b>${x.d}</b></div></div>
      <p className="mpv4-calc">address = ${f}</p>
      <p className="mpv4-mode">${x.r === 'BP' ? 'BP → SS' : x.how === 'override' ? 'ES: override' : x.r + ' → DS'}${i >= 4 ? ' · legal' : ''}</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 3.0-3.1: base plus index walks an array: BX = start, DI = position ── */
  function ArrayWalk({ ar }) {
    const DI = [0, 1, 2, 3, 0x150];
    const steps = DI.map((d, k) => {
      const a = 0x10000 + 0xCD01 + d, calc = `DS×10 + BX + DI = 10000 + CD01 + ${H(d)} = ${H5(a)}`;
      if (k === 0) return { en: `Base plus index: BX (base) holds the beginning of the array, CD01; DI (index) holds the position of the element, 0. <code>MOV AL, [BX][DI]</code> reads ${calc}.`,
        ar: 'في الـ Base plus index الـ BX (الـ base) شايل بداية الـ array وهي ' + bdi('CD01') + '، والـ DI (الـ index) شايل مكان العنصر وهو ' + bdi('0') + '. والـ ' + bdi('MOV AL, [BX][DI]') + ' بتقرا من:' + ltr(calc) };
      if (k < 4) return { en: `DI = ${d}: BX stays the same and only the index changes, so the next element is read: ${calc}.`,
        ar: `الـ DI بقى ${bdi(String(d))}، والـ BX زي ما هو، الـ index بس اللي بيتغيّر، فبنقرا العنصر اللي بعده:` + ltr(calc) };
      return { en: `DI = 150 is the lecture's example: <code>MOV AL, [BX][DI]</code> with DS=1000, BX=CD01, DI=150 gives 10000 + CE51 = <b>1CE51</b>.`,
        ar: 'ولو الـ DI قيمته ' + bdi('150') + ' ده مثال المحاضرة، والحساب:' + ltr('DS=1000, BX=CD01, DI=150 → 10000 + CE51 = 1CE51') };
    });
    const [i, ctl] = useSteps(steps.length, 2200), d = DI[i];
    const cells = [0, 1, 2, 3].map(k => [0x1CD01 + k, 'element ' + k]);
    return html`<figure className="fig mpv4"><div className="fig-stage">
      <div className="mpv4-code">MOV AL, [<span className="mpv4-hp">BX</span>][<span className="mpv4-hs">DI</span>]</div>
      <div className="mpv4-walk">
        <div className="mpv4-regs">
          <div className="mpv4-card"><small>DS</small><b>1000</b></div>
          <div className="mpv4-card mpv4-on"><small>BX (base): array start</small><b>CD01</b></div>
          <div className="mpv4-card mpv4-on"><small>DI (index): position</small><b key=${i} className="pop">${H(d)}</b></div></div>
        <div><p className="mpv4-mh">Memory (DS)</p><div className="mpv4-mem">
          ${cells.map(([a, l], k) => html`<div key=${k} className=${i < 4 && k === i ? 'mpv4-on' : ''}><span>${H5(a)}</span><i>${l}</i></div>`)}
          <div className="mpv4-gap">⋮</div>
          <div className=${i === 4 ? 'mpv4-on' : ''}><span>1CE51</span><i>DI = 150</i></div></div></div></div>
      <p className="mpv4-calc">10000 + CD01 + ${H(d)} = ${H5(0x1CD01 + d)}</p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── shared memory-state figure (7.0-7.2): registers, ×10, adder, memory column, bytes back ── */
  // r = solve() result, V = given values, i = step 0..4, sym = byte values as b0..b3 instead of the slides' 22
  function figSteps(r, V, sym) {
    const m = r.mem, giv = VKEYS.concat(['EAX']).filter(k => V[k]).map(k => `${k}=${V[k]}`).join(', ');
    const offRegs = r.parts.filter(q => q.reg), disp = r.parts.filter(q => !q.reg);
    const n = r.size || 1, last = H5(r.addr + n - 1), ins = r.ins;
    const names = r.reg ? byteNames(r.reg) : [];
    const bytesEn = r.size === 1 ? `the byte at ${H5(r.addr)} ${r.store ? 'is written from' : 'goes into'} ${r.reg}` : `${r.reg} is ${r.size * 8}-bit, so ${r.size} bytes ${H5(r.addr)} to ${last} are ${r.store ? 'written' : 'read'}. Little-endian: the byte at the lower address ${H5(r.addr)} is ${r.store ? 'taken from' : 'put in'} the low half (${names[0]}), ${H5(r.addr + 1)} ${r.store ? 'from' : 'in'} ${names[1]}${r.size === 4 ? ', and the next two bytes are the upper half' : ''}.`;
    const bytesAr = r.size === 1 ? `الـ byte اللي عند ${bdi(H5(r.addr))} ${r.store ? 'بيتكتب من الـ ' + r.reg : 'بيروح للـ ' + r.reg}.` : `الـ ${r.reg} حجمه ${bdi(r.size * 8 + '-bit')}، فبنستخدم ${r.size} bytes من ${bdi(H5(r.addr))} لحد ${bdi(last)}. وبالـ little-endian الـ byte اللي في العنوان الأصغر ${bdi(H5(r.addr))} ${r.store ? 'جاي من' : 'بيروح لـ'} النص الواطي (${names[0]})، واللي في ${bdi(H5(r.addr + 1))} ${r.store ? 'جاي من' : 'بيروح لـ'} الـ ${names[1]}${r.size === 4 ? '، والـ 2 bytes اللي بعدهم هما النص العالي' : ''}.`;
    return [
      { en: `Given ${esc(giv)}. <code>${esc(ins)}</code> is ${m.mode.toLowerCase()}. On the left: the register boxes with their values, and ${m.seg}.`,
        ar: 'المعطى:' + ltr(giv) + `والـ ${bdi(ins)} نوعها ${m.mode}. على الشمال مربعات الـ registers وقيمها، والـ ${m.seg}.` },
      { en: `The segment value goes through ×10 into the adder (+): ${segWhyEn(m)}; ${m.seg} = ${H(r.segv)}, ×10 = ${H5(r.base)}.`,
        ar: `قيمة الـ segment بتعدّي على ${bdi('×10')} وتدخل الـ adder. ` + segWhyAr(m) + ' والحساب:' + ltr(`${m.seg} × 10 = ${H(r.segv)} × 10 = ${H5(r.base)}`) },
      { en: `The offset${offRegs.length ? (offRegs.length > 1 ? ' registers ' : ' register ') + offRegs.map(q => `${q.reg} = ${H(q.val)}`).join(', ') : ''}${disp.length ? `${offRegs.length ? ' and' : ':'} the displacement (Disp. ${disp.map(q => (q.s < 0 ? '-' : '') + H(q.val)).join(', ')})` : ''} also enter the adder: offset = ${esc(m.sym)} = ${esc(r.vals)} = ${H(r.off)}.`,
        ar: `الـ ${offRegs.length ? 'offset register' + (offRegs.length > 1 ? 's' : '') + (disp.length ? ' والـ displacement' : '') : 'displacement'} بيدخلوا الـ adder هما كمان:` + ltr(`offset = ${m.sym} = ${r.vals} = ${H(r.off)}`) },
      { en: `The adder output points to the computed address in the memory column: ${m.seg}×10 + offset = ${H5(r.base)} + ${H(r.off)} = <b>${H5(r.addr)}</b>.`,
        ar: 'السهم الخارج من الـ adder بيشاور على العنوان اللي اتحسب في عمود الـ memory:' + ltr(`${m.seg}×10 + offset = ${H5(r.base)} + ${H(r.off)} = ${H5(r.addr)}`) },
      { en: (r.store ? `The arrow goes from ${r.reg} to memory: ` : `An arrow from the memory cell${n > 1 ? 's' : ''} goes back to ${r.reg}: `) + bytesEn + (sym ? ` (b0 = the byte at ${H5(r.addr)}${n > 1 ? `, b1 at ${H5(r.addr + 1)}` : ''}${n > 2 ? ', …' : ''})` : (V.EAX && !r.store ? ` EAX was ${V.EAX}: only ${r.reg} changes.` : '')),
        ar: (r.store ? `السهم رايح من الـ ${r.reg} للـ memory. ` : `فيه سهم من الـ memory راجع للـ ${r.reg}. `) + bytesAr + (sym ? ` والـ b0 هو الـ byte اللي عند ${bdi(H5(r.addr))}${n > 1 ? `، والـ b1 اللي عند ${bdi(H5(r.addr + 1))}` : ''}.` : (V.EAX && !r.store ? ` والـ EAX كان ${bdi(V.EAX)}، والـ ${r.reg} بس اللي اتغيّر.` : '')) }];
  }
  function MemFig({ r, V, i, sym, id }) {
    const m = r.mem, offRegs = r.parts.filter(q => q.reg), disp = r.parts.filter(q => !q.reg);
    const ORDER = ['EAX', 'EBX', 'ECX', 'EDX', 'ESI', 'EDI', 'EBP'], E32 = x => R32.includes(x) ? x : 'E' + x.replace(/[LH]$/, 'X');
    const dE = r.reg ? E32(r.reg) : null, rows = ORDER.filter(x => x === dE || offRegs.some(q => 'E' + q.reg === x));
    const n = r.size || 1, NC = n === 1 ? 3 : n + 1, memY = k => 34 + k * 28, my = memY(1) + 14 * n;
    const ry = k => 34 + k * 32, cy = Math.max(34 + rows.length * 32 + 26, memY(NC) + 18), cx = 192;
    // which cell (0..3, left to right) of the register gets memory byte k
    const cellOf = k => r.size === 1 ? (/H$/.test(r.reg) ? 2 : 3) : 3 - k;
    const init = dE && V.EAX && dE === 'EAX' ? hexv(V.EAX) : null;
    const regCell = (x, c) => {
      if (x === dE) { const k = [0, 1, 2, 3].find(j => j < n && cellOf(j) === c); const filled = r.store || i >= 4;
        if (k != null && filled) return sym ? 'b' + k : '22';
        return init != null ? H((init >> ((3 - c) * 8)) & 255).padStart(2, '0') : ''; }
      return '';
    };
    const segv = H(r.segv), segBox = 'mpv4-cl' + (i >= 1 ? ' mpv4-hi' : '');
    const offs = offRegs.map(q => ({ ...q, row: rows.indexOf('E' + q.reg) })).sort((a, b) => a.row - b.row);
    const xin = k => offs.length === 2 ? (k === 0 ? cx + 7 : cx - 7) : cx;
    const regRowY = dE ? ry(rows.indexOf(dE)) + 14 : 0;
    const dispLbl = 'Disp. ' + disp.map((q, k) => (q.s < 0 ? '-' : k ? '+' : '') + H(q.val)).join('');
    const ah = `url(#mpv4-ah${id})`;
    return html`<svg viewBox=${`0 0 330 ${cy + (disp.length ? 70 : 44)}`} role="img" aria-label=${`Memory state for ${r.ins}: ${m.seg} times 10 plus the offset ${H(r.off)} gives ${H5(r.addr)}`}>
      <defs><marker id=${'mpv4-ah' + id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--fig-k)" /></marker></defs>
      <text x="42" y="24" fontSize="15" fontWeight="700">Registers</text>
      ${rows.map((x, k) => html`<g key=${x}><text x="2" y=${ry(k) + 19} fontSize="15">${x}</text>
        ${x === dE ? [0, 1, 2, 3].map(c => html`<rect key=${c} x=${42 + c * 26} y=${ry(k)} width="26" height="28" className=${'mpv4-cl' + ((r.store || i >= 4) && [0, 1, 2, 3].some(j => j < n && cellOf(j) === c) ? ' mpv4-hi' : '')} />`)
          : [0, 1].map(c => html`<rect key=${c} x=${42 + c * 52} y=${ry(k)} width="52" height="28" className="mpv4-cl" />`)}
        ${x === dE ? [0, 1, 2, 3].map(c => html`<text key=${c} x=${55 + c * 26} y=${ry(k) + 19} fontSize="15" textAnchor="middle" fontWeight="700">${regCell(x, c)}</text>`)
          : html`<text x="120" y=${ry(k) + 19} fontSize="15" textAnchor="middle" fontWeight="700">${H(offRegs.find(q => 'E' + q.reg === x).val)}</text>`}</g>`)}
      <text x="2" y=${cy + 5} fontSize="15">${m.seg}</text>
      <rect x="42" y=${cy - 14} width="62" height="28" className=${segBox} /><text x="73" y=${cy + 5} fontSize="15" fontWeight="700" textAnchor="middle">${segv}</text>
      <g className=${pop(i >= 1)}><path d=${`M104,${cy} H${cx - 14}`} className="mpv4-aw" markerEnd=${ah} />
        <text x="141" y=${cy - 6} fontSize="15" textAnchor="middle">×10</text><text x="141" y=${cy + 22} fontSize="15" textAnchor="middle" fontWeight="700">${H5(r.base)}</text>
        <circle cx=${cx} cy=${cy} r="13" className="mpv4-cl" /><text x=${cx} y=${cy + 5} fontSize="16" textAnchor="middle" fontWeight="700">+</text></g>
      <g className=${pop(i >= 2)}>${offs.map((q, k) => html`<path key=${q.reg} d=${`M146,${ry(q.row) + 14} H${xin(k)} V${cy - 15}`} className="mpv4-aw" markerEnd=${ah} />`)}
        ${disp.length ? html`<g><path d=${`M${cx},${cy + 46} V${cy + 15}`} className="mpv4-aw" markerEnd=${ah} /><text x=${cx} y=${cy + 62} fontSize="15" textAnchor="middle" fontWeight="700">${dispLbl}</text></g>` : null}</g>
      <text x="226" y="24" fontSize="15" fontWeight="700">Memory</text>
      ${Array.from({ length: NC }, (_, k) => k).map(k => { const on = i >= 3 && k >= 1 && k <= n, val = on && (!r.store || i >= 4) ? (sym ? 'b' + (k - 1) : '22') : '';
        return html`<g key=${k}><rect x="226" y=${memY(k)} width="80" height="28" className=${'mpv4-cl' + (on ? ' mpv4-hi' : '')} />
        <text x="230" y=${memY(k) + 19} fontSize="15" className=${on ? '' : 'mpv4-g'} fontWeight=${on ? 700 : 400}>${H5(r.addr - 1 + k)}</text>
        <text x="302" y=${memY(k) + 19} fontSize="15" textAnchor="end" fontWeight="700">${val}</text></g>`; })}
      <g className=${pop(i >= 3)}><path d=${`M${cx + 13},${cy} H320 V${memY(1) + 14} H308`} className="mpv4-aw" markerEnd=${ah} /></g>
      ${r.reg && html`<g className=${pop(i >= 4)}>${r.store ? html`<path d=${`M148,${regRowY} L224,${my}`} className="mpv4-aw" markerEnd=${ah} />` : html`<path d=${`M224,${my} L148,${regRowY}`} className="mpv4-aw" markerEnd=${ah} />`}</g>`}
    </svg>`;
  }

  /* ── 4: the slides' four examples drawn as memory-state figures ── */
  const L4EX = [
    { ins: 'MOV AL, [DI]', V: { DS: 'AB00', ES: '1400', DI: '150', EAX: '1234' } },
    { ins: 'MOV AX, 100[DI]', V: { DS: '1000', ES: '1400', DI: '150', EAX: '1234' } },
    { ins: 'MOV AL, [BX][DI]', V: { DS: '1000', ES: '1400', DI: '150', BX: 'CD01' } },
    { ins: 'MOV AL, 100[BX][DI]', V: { DS: '1000', ES: '1400', DI: '150', BX: 'CD01' } }];
  const slideFormula = r => {
    const words = r.parts.map(q => q.reg ? (BASE.includes(q.reg) ? 'base' : r.parts.filter(p => p.reg).length === 1 ? 'offset' : 'index') : 'Disp.');
    return `Memory location = (Segment Register × 10) + ${words.join(' + ')}`;
  };
  function L4Inner({ ex, id, ar }) {
    const r = Object.assign(solve(ex.ins, ex.V), { ins: ex.ins });
    const steps = figSteps(r, ex.V, false);
    const [i, ctl] = useSteps(steps.length, 2300);
    if (r.kind !== 'mem') return null;
    return html`<div><div className="fig-stage mpv4-fig">
      <div className="mpv4-code">${ex.ins}</div>
      <${MemFig} r=${r} V=${ex.V} i=${i} sym=${false} id=${id} />
      <p className="mpv4-calc">${slideFormula(r)}<br /><span className=${pop(i >= 2)}>= ${r.mem.seg}×10 + ${r.vals}</span><br /><span className=${pop(i >= 3)}>= ${H5(r.base)} + ${H(r.off)} = ${H5(r.addr)}</span></p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></div>`;
  }
  function Lec4Figure({ ar }) {
    const [k, setK] = useState(3);
    return html`<figure className="fig mpv4"><div className="mpv4-tabs">
      ${L4EX.map((e, j) => html`<button key=${j} className="fig-btn" aria-pressed=${String(k === j)} onClick=${() => setK(j)}>${e.ins}</button>`)}</div>
      <${L4Inner} key=${k} ex=${L4EX[k]} id=${'L' + k} ar=${ar} /></figure>`;
  }

  /* ── shared example sets and inputs for the calculator and the figure builder ── */
  const SETS = [
    { name: 'Sheet 1 (DS=1100H, BX=0200H, SI=0500H)', V: { DS: '1100H', BX: '0200H', SI: '0500H' }, ins: ['MOV 120[SI], EDX', 'MOV CL, 100[BX+SI]', 'MOV CH, [BX+SI]'] },
    { name: 'Sheet 1 (DS=1300H, SS=1400H, BP=1500H, SI=0100H)', V: { DS: '1300H', SS: '1400H', BP: '1500H', SI: '0100H' }, ins: ['MOV EAX, [BP+200H]', 'MOV AL, [BP+SI-200H]', 'MOV AL, [SI][BP]'] },
    { name: 'Q14 (SS=2000H, DS=2200H, SI=1200H, BP=0101H)', V: { SS: '2000H', DS: '2200H', SI: '1200H', BP: '0101H' }, ins: ['MOV EAX, [BP+120H]', 'MOV BL, [BP+SI-100H]', 'MOV CX, [SI+0BC]'] },
    { name: 'Lecture (DS=1000, ES=1400, DI=150, BX=CD01)', V: { DS: '1000', ES: '1400', DI: '150', BX: 'CD01' }, ins: ['MOV AX, 100[DI]', 'MOV AL, [BX][DI]', 'MOV AL, 100[BX][DI]', 'MOV EAX, ES:[BX][DI]'] }];
  const blankV = () => Object.fromEntries(VKEYS.map(k => [k, '']));
  function useSetup(set, k) {
    const [ins, setIns] = useState(SETS[set].ins[k]), [V, setV] = useState(Object.assign(blankV(), SETS[set].V));
    return { ins, V, setIns, setV, load: (s, j) => { setIns(SETS[s].ins[j]); setV(Object.assign(blankV(), SETS[s].V)); } };
  }
  function Setup({ st, onChange, sets }) {
    const same = (s, j) => st.ins === SETS[s].ins[j] && VKEYS.every(k => (st.V[k] || '') === (SETS[s].V[k] || ''));
    let cur = ''; sets.forEach(s => SETS[s].ins.forEach((x, j) => { if (same(s, j)) cur = s + '|' + j; }));
    return html`<div>
      <div className="mpv4-in"><span className="mpv4-lbl">Example from the notes</span>
        <select aria-label="Example from the notes" style=${{ width: '100%', maxWidth: '300px' }} value=${cur} onChange=${e => { if (!e.target.value) return; const [s, j] = e.target.value.split('|').map(Number); st.load(s, j); onChange(); }}>
          <option value="">choose…</option>${sets.map(s => html`<optgroup key=${s} label=${SETS[s].name}>${SETS[s].ins.map((x, j) => html`<option key=${x} value=${s + '|' + j}>${x}</option>`)}</optgroup>`)}</select></div>
      <div className="mpv4-in"><span className="mpv4-lbl">Try your own: instruction and register values (hex)</span>
        <input aria-label="Instruction" value=${st.ins} onInput=${e => { st.setIns(e.target.value); onChange(); }} onChange=${e => { st.setIns(e.target.value); onChange(); }} spellCheck="false" style=${{ width: '230px' }} /></div>
      <div className="mpv4-rv">${VKEYS.map(k => html`<label key=${k}>${k}<input aria-label=${k + ' value'} value=${st.V[k]} onInput=${e => { st.setV(Object.assign({}, st.V, { [k]: e.target.value })); onChange(); }} onChange=${e => { st.setV(Object.assign({}, st.V, { [k]: e.target.value })); onChange(); }} spellCheck="false" /></label>`)}</div></div>`;
  }

  /* ── 5-6: the sheets' address questions with the 3-step method ── */
  function calcSteps(r) {
    const m = r.mem, full = `${m.seg}×10 + ${m.sym} = ${H5(r.base)} + ${r.vals} = ${H5(r.addr)}`, n = r.size;
    const range = n > 1 ? ` (${r.reg} ${r.store ? 'is stored in' : 'uses'} ${n} bytes ${H5(r.addr)} to ${H5(r.addr + n - 1)})` : '';
    const rangeAr = n > 1 ? ` والـ ${r.reg} ${r.store ? 'بيتخزن في' : 'بياخد'} ${n} bytes من ${bdi(H5(r.addr))} لحد ${bdi(H5(r.addr + n - 1))}.` : '';
    return [
      { en: `<code>${esc(r.ins)}</code>: ${m.mode}. Step 1, pick the segment: ${segWhyEn(m)}.`,
        ar: `الـ ${bdi(r.ins)} نوعها ${m.mode}. أول خطوة نختار الـ segment. ` + segWhyAr(m) },
      { en: `Step 2, shift it one hex digit (×10): ${m.seg} = ${H(r.segv)} → ${H5(r.base)}.`,
        ar: 'تاني خطوة نزق الـ segment خانة hex واحدة (يعني نضربه في 10):' + ltr(`${m.seg} = ${H(r.segv)} → ${H5(r.base)}`) },
      { en: `Step 3, add every offset part in hex: ${esc(m.sym)} = ${esc(r.vals)}.`,
        ar: 'تالت خطوة نجمع كل أجزاء الـ offset بالـ hex:' + ltr(`${m.sym} = ${r.vals}`) },
      { en: `Address = ${esc(full)}${range}.` + (r.odd ? ' Note: here the offset leaves the 16-bit range, which the course\'s examples never do.' : ''),
        ar: 'العنوان:' + ltr(full) + rangeAr + (r.odd ? ' خلي بالك إن الـ offset هنا طلع برا الـ ' + bdi('16-bit') + '، وده مش بيحصل في أمثلة الكورس.' : '') }];
  }
  function EaCalc({ ar }) {
    const st = useSetup(0, 1), [i, ctl] = useSteps(4, 2000);
    const r = Object.assign(solve(st.ins, st.V), { ins: st.ins.trim().toUpperCase().replace(/\s+/g, ' ') });
    let body, cap;
    if (r.kind !== 'mem') { body = html`<div className="mpv4-ver mpv4-bad"><b>✗ Cannot compute</b><ul>${r.errs.map((e, k) => html`<li key=${k} dangerouslySetInnerHTML=${{ __html: e.en }}></li>`)}</ul></div>`; cap = { en: r.errs.map(e => e.en).join(' '), ar: r.errs.map(e => e.ar).join('<br>') }; }
    else {
      const S = calcSteps(r), m = r.mem;
      const box = (k, l, v, tot) => html`<div key=${k} className=${'mpv4-st ' + pop(i >= k) + (i === k ? ' mpv4-on' : '') + (tot ? ' mpv4-tot' : '')}><small>${l}</small><b>${v}</b></div>`;
      body = html`<div className="mpv4-steps">
        ${box(0, '1) pick the segment', `${m.seg}${m.ovr ? ' (override)' : m.def === 'SS' ? ' (BP → SS)' : ' (default)'}`)}
        ${box(1, '2) shift it one hex digit (×10)', `${m.seg} = ${H(r.segv)} → ${H5(r.base)}`)}
        ${box(2, '3) add every offset part in hex', `${m.sym} = ${r.vals}`)}
        ${box(3, 'address', `${H5(r.base)} + ${r.vals} = ${H5(r.addr)}`, true)}</div>
        ${r.size > 1 && html`<p className=${'mpv4-calc ' + pop(i >= 3)}>${r.reg}: ${r.size} bytes, ${H5(r.addr)} to ${H5(r.addr + r.size - 1)}</p>`}`;
      cap = S[i];
    }
    return html`<figure className="fig mpv4"><div className="fig-stage">
      <${Setup} st=${st} onChange=${ctl.replay} sets=${[0, 1, 2]} />${body}</div>
      <${Cap} ...${cap} showAr=${ar} />${r.kind === 'mem' && html`<${Bar} steps=${[0, 1, 2, 3]} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── 7: draw the memory-state figure for any of the sheet questions (b0 = byte at the lowest address) ── */
  function MemDraw({ ar }) {
    const st = useSetup(0, 0), [i, ctl] = useSteps(5, 2300);
    const r = Object.assign(solve(st.ins, st.V), { ins: st.ins.trim().toUpperCase().replace(/\s+/g, ' ') });
    const ok = r.kind === 'mem' && r.reg && !SEG.includes(r.reg);
    const S = ok ? figSteps(r, st.V, true) : null;
    const errs = r.kind !== 'mem' ? r.errs : !ok ? [{ en: 'The figure needs a register on the other side of the MOV (AL, AX, EAX, …).', ar: 'الرسمة محتاجة register في الناحية التانية من الـ MOV زي AL أو AX أو EAX.' }] : null;
    return html`<figure className="fig mpv4"><div className="fig-stage mpv4-fig">
      <${Setup} st=${st} onChange=${ctl.replay} sets=${[0, 1, 2, 3]} />
      ${ok ? html`<${MemFig} r=${r} V=${st.V} i=${i} sym=${true} id="D" />` : html`<div className="mpv4-ver mpv4-bad"><b>✗ Cannot draw</b><ul>${errs.map((e, k) => html`<li key=${k} dangerouslySetInnerHTML=${{ __html: e.en }}></li>`)}</ul></div>`}</div>
      <${Cap} en=${ok ? S[i].en : errs.map(e => e.en).join(' ')} ar=${ok ? S[i].ar : errs.map(e => e.ar).join('<br>')} showAr=${ar} />${ok && html`<${Bar} steps=${S} i=${i} ctl=${ctl} />`}</figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'mp-ri-pointers': RiPointer, 'mp-seg-rule': SegPick, 'mp-indexed-forms': IndexedForms, 'mp-array-walk': ArrayWalk, 'mp-lec4-figure': Lec4Figure, 'mp-ea-calc': EaCalc, 'mp-mem-draw': MemDraw });
})();
/* ── part L5 ── */
// Microprocessors visuals, Lecture 5 (Stack instructions: PUSH, POP, PUSHA, POPA): a stack simulator (SS:SP, LIFO, grows down), the slides' ESP figures for push/pop EAX, PUSHA/POPA order, the two slide examples (PUSH AX, POP EAX) redrawn step by step, a PUSH/POP memory calculator and the Lab 6 programs. Every label and number comes from the site's notes (slides Lec_05).
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop, calm } = window.FIGKIT;
  const CSS = `
.mpv5 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mpv5-code{ font:700 1rem/1.4 var(--mono); text-align:center; padding:6px 10px; border-radius:8px; background:var(--paper); border:1px solid var(--line); color:var(--ink); margin:0 auto 10px; max-width:420px; overflow-wrap:anywhere; }
.mpv5-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.mpv5-chip{ font:600 .8rem/1.2 var(--mono); padding:5px 8px; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv5-chip[aria-pressed="true"]{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.mpv5-chip:disabled{ opacity:.45; cursor:default; }
.mpv5-lbl{ font-size:.8rem; color:var(--graphite); width:100%; text-align:center; }
.mpv5-in{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; margin:0 0 10px; font-size:.86rem; color:var(--ink); }
.mpv5-in input, .mpv5-in select, .mpv5-in textarea, .mpv5-rg input{ font:600 .9rem var(--mono); padding:4px 6px; border:1px solid var(--line); border-radius:7px; background:var(--paper); color:var(--ink); min-width:0; box-sizing:border-box; max-width:100%; }
.mpv5-in input:focus, .mpv5-in select:focus, .mpv5-in textarea:focus, .mpv5-rg input:focus{ outline:2px solid var(--fig-k); outline-offset:1px; }
.mpv5-err{ text-align:center; color:var(--pen); font-size:.86rem; margin:6px 0 0; }
.mpv5-calc{ text-align:center; font:600 .86rem/1.55 var(--mono); color:var(--ink); margin:8px auto 0; max-width:420px; overflow-wrap:anywhere; }
.mpv5-hl{ color:var(--fig-k); }
/* simulator */
.mpv5-sim{ display:grid; grid-template-columns:minmax(0,104px) minmax(0,1fr); gap:10px; max-width:420px; margin:0 auto; align-items:start; }
.mpv5-regs{ display:grid; gap:6px; }
.mpv5-rg{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:5px 6px; text-align:center; transition:background .4s, box-shadow .4s; }
.mpv5-rg small{ display:block; font:700 .85rem var(--mono); color:var(--ink); } .mpv5-rg b{ display:block; font:700 1rem var(--mono); color:var(--ink); } .mpv5-rg span{ display:block; font:.78rem var(--mono); color:var(--graphite); }
.mpv5-rg input{ width:100%; text-align:center; }
.mpv5-rg.mpv5-on{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); box-shadow:0 0 0 2px var(--fig-k); }
.mpv5-mem{ display:grid; grid-template-columns:38px minmax(0,1fr) 30px 28px; border:1px solid var(--line); border-radius:8px; background:var(--paper); overflow:hidden; font:600 .85rem/1 var(--mono); color:var(--ink); }
.mpv5-mem > div{ height:25px; display:flex; align-items:center; justify-content:center; border-top:1px solid var(--line); transition:background .4s, opacity .4s; min-width:0; }
.mpv5-mem > .mpv5-h{ border-top:0; font:600 .78rem var(--body); color:var(--graphite); height:22px; }
.mpv5-mem .mpv5-ad{ color:var(--graphite); justify-content:flex-start; padding-left:6px; }
.mpv5-mem .mpv5-sp{ color:var(--fig-k); font-weight:700; font-size:.8rem; }
.mpv5-mem .mpv5-in-st{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.mpv5-mem .mpv5-old{ opacity:.45; } .mpv5-mem .mpv5-tg{ font-size:.78rem; color:var(--graphite); }
.mpv5-mem .mpv5-new{ background:color-mix(in srgb, var(--fig-k) 34%, var(--paper)); }
.mpv5-btns{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:420px; margin:10px auto 0; }
.mpv5-btns button{ font:700 .85rem var(--mono); padding:6px 0; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv5-btns button.mpv5-pu{ border-color:color-mix(in srgb, var(--fig-k) 60%, var(--line)); }
.mpv5-order{ text-align:center; font-size:.82rem; color:var(--graphite); margin:8px 0 0; } .mpv5-order b{ font-family:var(--mono); color:var(--ink); }
/* ESP figure */
.mpv5-top{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin:0 0 10px; }
.mpv5-box{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 10px; font:700 .92rem var(--mono); color:var(--ink); text-align:center; transition:background .4s; }
.mpv5-box small{ display:block; font:600 .78rem var(--body); color:var(--graphite); }
.mpv5-box.mpv5-on{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.mpv5-esp{ display:grid; grid-template-columns:54px minmax(0,1fr) 84px; grid-auto-rows:22px; max-width:340px; margin:0 auto; font:600 .8rem var(--mono); color:var(--ink); }
.mpv5-esp .mpv5-c{ grid-column:2; border:1px solid var(--line); border-top:0; background:var(--paper); transition:background .5s; }
.mpv5-esp .mpv5-c.mpv5-first{ border-top:1px solid var(--line); }
.mpv5-esp .mpv5-c.mpv5-used{ background:color-mix(in srgb, var(--graphite) 45%, var(--paper)); }
.mpv5-esp .mpv5-c.mpv5-val{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); }
.mpv5-esp .mpv5-a{ grid-column:3; padding-left:6px; display:flex; align-items:center; color:var(--graphite); }
.mpv5-esp .mpv5-gap{ grid-column:2 / 4; display:flex; align-items:center; justify-content:center; color:var(--graphite); font-size:.8rem; }
.mpv5-esp .mpv5-blk{ grid-column:2; display:flex; align-items:center; justify-content:center; text-align:center; font:600 .8rem/1.25 var(--body); color:var(--ink); padding:0 4px; z-index:1; }
.mpv5-esp .mpv5-ptr{ grid-column:1; display:flex; align-items:center; justify-content:flex-end; gap:2px; color:var(--fig-k); font-weight:700; padding-right:3px; transition:transform .5s; }
/* PUSHA */
.mpv5-pa{ display:grid; grid-template-columns:minmax(0,92px) minmax(0,1fr); gap:10px; max-width:420px; margin:0 auto; align-items:start; }
.mpv5-pr{ display:grid; gap:4px; }
.mpv5-pr div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); height:24px; display:flex; align-items:center; justify-content:space-between; padding:0 7px; font:700 .85rem var(--mono); color:var(--ink); transition:background .4s, box-shadow .4s; }
.mpv5-pr div span{ font:600 .78rem var(--body); color:var(--graphite); }
.mpv5-pr div.mpv5-on{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.mpv5-ps{ display:grid; grid-template-columns:76px minmax(0,1fr) 34px; gap:0; border:1px solid var(--line); border-radius:8px; background:var(--paper); overflow:hidden; font:600 .82rem var(--mono); color:var(--ink); }
.mpv5-ps > div{ height:24px; display:flex; align-items:center; border-top:1px solid var(--line); transition:background .4s, opacity .4s; min-width:0; }
.mpv5-ps > div:nth-child(-n+3){ border-top:0; }
.mpv5-ps .mpv5-ol{ color:var(--graphite); padding-left:6px; font-size:.78rem; }
.mpv5-ps .mpv5-w{ justify-content:center; font-weight:700; }
.mpv5-ps .mpv5-w.mpv5-in-st{ background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.mpv5-ps .mpv5-w.mpv5-new{ background:color-mix(in srgb, var(--fig-k) 38%, var(--paper)); }
.mpv5-ps .mpv5-w.mpv5-gone{ opacity:.35; }
.mpv5-ps .mpv5-used{ background:color-mix(in srgb, var(--graphite) 40%, var(--paper)); }
.mpv5-ps .mpv5-sp{ justify-content:center; color:var(--fig-k); font-weight:700; font-size:.78rem; }
.mpv5-cnt{ font:700 .86rem var(--mono); color:var(--ink); }
/* slide figure */
.mpv5-fig svg text{ font-family:var(--mono); }
.mpv5-fig .mpv5-cl{ fill:var(--paper); stroke:var(--ink); stroke-width:1.2; }
.mpv5-fig .mpv5-hi{ fill:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); }
.mpv5-fig .mpv5-aw{ stroke:var(--fig-k); stroke-width:2.2; fill:none; }
.mpv5-fig .mpv5-ln{ stroke:var(--ink); stroke-width:1.5; fill:none; }
.mpv5-fig .mpv5-k{ fill:var(--fig-k); } .mpv5-fig .mpv5-g{ fill:var(--graphite); }
/* calculator */
.mpv5-tab{ max-width:300px; margin:0 auto; border:1px solid var(--line); border-radius:8px; background:var(--paper); overflow:hidden; font:600 .88rem var(--mono); color:var(--ink); }
.mpv5-tab > div{ display:grid; grid-template-columns:62px 48px minmax(0,1fr); align-items:center; min-height:26px; border-top:1px solid var(--line); transition:background .4s; }
.mpv5-tab > div:first-child{ border-top:0; } .mpv5-tab > div > span{ padding:0 8px; }
.mpv5-tab .mpv5-ad{ color:var(--graphite); } .mpv5-tab .mpv5-tg{ font:600 .78rem var(--body); color:var(--graphite); }
.mpv5-tab > div.mpv5-new{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
/* lab */
.mpv5-lines{ max-width:420px; margin:0 auto 10px; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 0; font:600 .82rem/1.45 var(--mono); color:var(--ink); }
.mpv5-lines div{ padding:1px 8px; white-space:pre-wrap; overflow-wrap:anywhere; transition:background .3s; }
.mpv5-lines div.mpv5-cmt{ color:var(--graphite); font-weight:500; } .mpv5-lines div.mpv5-cur{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); } .mpv5-lines div.mpv5-done{ opacity:.6; }
.mpv5-lines div.mpv5-bad{ color:var(--pen); }
.mpv5-lines i{ font-style:normal; color:var(--graphite); font-weight:500; }
.mpv5-lr{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:420px; margin:0 auto 8px; }
.mpv5-lst{ max-width:300px; margin:0 auto; }
.mpv5-lst > div{ display:grid; grid-template-columns:52px minmax(0,1fr) 40px; align-items:center; height:24px; border:1px solid var(--line); border-top:0; background:var(--paper); font:600 .82rem var(--mono); color:var(--ink); }
.mpv5-lst > div:first-child{ border-top:1px solid var(--line); border-radius:8px 8px 0 0; } .mpv5-lst > div:last-child{ border-radius:0 0 8px 8px; }
.mpv5-lst > div:only-child{ border-radius:8px; }
.mpv5-lst span{ padding:0 6px; } .mpv5-lst .mpv5-ad{ color:var(--graphite); } .mpv5-lst .mpv5-sp{ color:var(--fig-k); font-weight:700; font-size:.78rem; }
.mpv5-lst .mpv5-new{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.mpv5-lst .mpv5-em{ justify-content:center; font:600 .8rem var(--body); color:var(--graphite); display:flex; }`;
  if (!document.getElementById('mpv5-css')) { const s = document.createElement('style'); s.id = 'mpv5-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* shared helpers */
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const bdi = s => `<bdi dir="ltr">${esc(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const ltr = s => `<span class="ltr">${esc(s)}</span>`;
  const hx = (v, d) => v.toString(16).toUpperCase().padStart(d, '0');
  const cleanHex = t => String(t).trim().toUpperCase().replace(/H$/, '');
  const isHex = (t, n) => new RegExp(`^[0-9A-F]{1,${n}}$`).test(t);

  /* ── 0.0-0.2: a stack simulator: SS:SP, PUSH/POP of AX, BX, CX, LIFO, grows down ── */
  const SIM_SS = 0x300, SIM_SP0 = 0x07FE, SIM_W = 4, SIM_R = ['AX', 'BX', 'CX'], SIM_INIT = { AX: '5AB3', BX: 'ABCD', CX: '1234' };
  const simPh = off => hx(SIM_SS * 16 + off, 4);
  const simStart = () => ({ txt: Object.assign({}, SIM_INIT), sp: SIM_SP0, mem: {}, own: {}, words: [], last: { k: 'init' } });
  function simAct(st, op, r) {
    const n = Object.assign({}, st, { txt: Object.assign({}, st.txt), mem: Object.assign({}, st.mem), own: Object.assign({}, st.own), words: st.words.slice() });
    if (op === 'PUSH') {
      const t = cleanHex(st.txt[r]);
      if (!isHex(t, 4)) { n.last = { k: 'bad', r }; return n; }
      if (st.sp <= SIM_SP0 - 2 * SIM_W) { n.last = { k: 'full' }; return n; }
      const v = parseInt(t, 16), hi = v >> 8, lo = v & 255, old = st.sp, nw = old - 2;
      n.mem[old - 1] = hi; n.mem[old - 2] = lo; n.own[old - 1] = r[0] + 'H'; n.own[old - 2] = r[0] + 'L';
      n.sp = nw; n.words.push(r); n.txt[r] = hx(v, 4);
      n.last = { k: 'push', r, old: hx(old, 4), nw: hx(nw, 4), hiA: simPh(old - 1), loA: simPh(old - 2), hi: hx(hi, 2), lo: hx(lo, 2) };
    } else {
      if (st.sp >= SIM_SP0) { n.last = { k: 'empty' }; return n; }
      const old = st.sp, v = (st.mem[old + 1] << 8) | st.mem[old], from = n.words.pop();
      n.sp = old + 2; n.txt[r] = hx(v, 4);
      n.last = { k: 'pop', r, from, old: hx(old, 4), nw: hx(old + 2, 4), v: hx(v, 4) };
    }
    return n;
  }
  function simCap(l) {
    if (l.k === 'init') return { en: 'SS = 0300 and SP = 07FE (the lecture\'s values), so the top of the stack is at SS×10 + SP = 3000 + 07FE = 37FE. Press <b>PUSH</b> and <b>POP</b> and watch SP: it goes down on PUSH (the stack grows toward lower addresses) and up on POP. You can change AX, BX and CX first.',
      ar: 'قيم المحاضرة هي' + ltr('SS = 0300, SP = 07FE') + 'فقمة الـ stack عند' + ltr('SS×10 + SP = 3000 + 07FE = 37FE') + 'دوس <b>PUSH</b> و <b>POP</b> وبص على الـ SP، بينزل مع الـ PUSH (الـ stack بيكبر ناحية العناوين الأقل) ويطلع مع الـ POP. وتقدر تغيّر قيم الـ AX والـ BX والـ CX الأول.' };
    if (l.k === 'bad') return { en: `${l.r} must be 1 to 4 hex digits.`, ar: `الـ ${l.r} لازم يبقى من رقم لـ 4 أرقام بالـ hex.` };
    if (l.k === 'full') return { en: `This drawing holds ${SIM_W} words: POP something first.`, ar: `الرسمة دي بتشيل ${bdi(String(SIM_W))} words بس، اعمل POP الأول.` };
    if (l.k === 'empty') return { en: 'Nothing left to pop here: SP is back at 07FE, where it started.', ar: 'مفيش حاجة نعملها pop هنا، والـ SP رجع لـ ' + bdi('07FE') + ' زي ما بدأ.' };
    if (l.k === 'push') return {
      en: `<code>PUSH ${l.r}</code>: ${l.r[0]}H = ${l.hi} goes to SS:[SP−1] = ${l.hiA}, ${l.r[0]}L = ${l.lo} to SS:[SP−2] = ${l.loA}, then SP = ${l.old} − 2 = ${l.nw}.`,
      ar: `الـ ${bdi('PUSH ' + l.r)} بتحط الـ ${l.r[0]}H عند ${bdi('SS:[SP-1]')} والـ ${l.r[0]}L عند ${bdi('SS:[SP-2]')} يعني` + ltr(`[${l.hiA}] = ${l.hi}, [${l.loA}] = ${l.lo}`) + 'وبعدين' + ltr(`SP = ${l.old} - 2 = ${l.nw}`) };
    const lifo = l.from !== l.r;
    return {
      en: `<code>POP ${l.r}</code> copies the word at SS:[SP] into ${l.r}, then SP = ${l.old} + 2 = ${l.nw}. ${l.r} = ${l.v}: ` + (lifo ? `the value ${l.from} pushed, because the last value pushed comes out first (LIFO).` : 'the last value pushed comes out first (LIFO).'),
      ar: `الـ ${bdi('POP ' + l.r)} بتنسخ الـ word اللي عند ${bdi('SS:[SP]')} في الـ ${l.r} وبعدين تزوّد الـ SP بـ 2 يعني` + ltr(`${l.r} = ${l.v}, SP = ${l.old} + 2 = ${l.nw}`) +
        (lifo ? `يعني الـ ${l.r} خد القيمة اللي الـ ${l.from} عملها push، لأن آخر حاجة دخلت هي أول حاجة تطلع (LIFO).` : 'آخر حاجة دخلت هي أول حاجة تطلع (LIFO).') };
  }
  function StackSim({ ar }) {
    const [st, setSt] = useState(simStart);
    const l = st.last, c = simCap(l), rows = [];
    for (let k = 0; k <= 2 * SIM_W; k++) rows.push(SIM_SP0 - k);
    const hot = l.k === 'push' ? [st.sp, st.sp + 1] : [];
    const edit = (r, v) => setSt(Object.assign({}, st, { txt: Object.assign({}, st.txt, { [r]: v }), last: { k: 'init' } }));
    return html`<figure className="fig mpv5"><div className="fig-stage">
      <div className="mpv5-sim">
        <div className="mpv5-regs">
          ${SIM_R.map(r => html`<label key=${r} className=${'mpv5-rg' + ((l.k === 'push' || l.k === 'pop') && l.r === r ? ' mpv5-on' : '')}><small>${r}</small>
            <input aria-label=${r + ' (hex)'} value=${st.txt[r]} onInput=${e => edit(r, e.target.value)} onChange=${e => edit(r, e.target.value)} spellCheck="false" /></label>`)}
          <div className=${'mpv5-rg' + (l.k === 'push' || l.k === 'pop' ? ' mpv5-on' : '')}><small>SP</small><b>${hx(st.sp, 4)}</b><span>SS = 0300</span></div>
          <div className="mpv5-rg"><small>SS:[SP]</small><b>${simPh(st.sp)}</b></div>
        </div>
        <div className="mpv5-mem" role="table" aria-label="Stack memory, high addresses at the top">
          <div className="mpv5-h"></div><div className="mpv5-h">address</div><div className="mpv5-h">byte</div><div className="mpv5-h"></div>
          ${rows.map(off => { const inSt = off >= st.sp && off < SIM_SP0, has = st.mem[off] != null, cls = hot.includes(off) ? ' mpv5-new' : inSt ? ' mpv5-in-st' : has ? ' mpv5-old' : '';
            return html`<${React.Fragment} key=${off}>
              <div className="mpv5-sp">${off === st.sp ? 'SP→' : ''}</div>
              <div className=${'mpv5-ad' + cls}>${simPh(off)}</div>
              <div className=${cls}>${has && off < SIM_SP0 ? hx(st.mem[off], 2) : '··'}</div>
              <div className=${'mpv5-tg' + cls}>${has && off < SIM_SP0 ? st.own[off] : ''}</div></${React.Fragment}>`; })}
        </div>
      </div>
      <div className="mpv5-btns">
        ${SIM_R.map(r => html`<button key=${'u' + r} className="mpv5-pu" onClick=${() => setSt(simAct(st, 'PUSH', r))}>PUSH ${r}</button>`)}
        ${SIM_R.map(r => html`<button key=${'o' + r} onClick=${() => setSt(simAct(st, 'POP', r))}>POP ${r}</button>`)}
      </div>
      <p className="mpv5-order">On the stack, top first: <b>${st.words.length ? st.words.slice().reverse().join(', ') : 'nothing pushed yet'}</b></p></div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => setSt(simStart())}>↻ Reset</button></div></figure>`;
  }

  /* ── 1.2 and 2.1: the slides' ESP figures for push EAX and pop EAX ── */
  const ESP_HI = ['00FFFFFF', '00FFFFFE', '00FFFFFD', '00FFFFFC', '00FFFFFB', '00FFFFFA'];
  const ESP_LO = ['00FFFFE9', '00FFFFE8', '00FFFFE7', '00FFFFE6', '00FFFFE5', '00FFFFE4', '00FFFFE3', '00FFFFE2'];
  function espSteps(isPush) {
    return isPush ? [
      { esp: 'E8', val: false, eax: 'EAX', en: 'Before: ESP = 00FFFFE8 points to the last value pushed. The addresses above it are already used; the stack grows toward lower addresses.',
        ar: 'قبل التنفيذ:' + ltr('ESP = 00FFFFE8') + 'والـ ESP بيشاور على آخر قيمة اتعملها push. العناوين اللي فوقه مستخدمة، والـ stack بيكبر ناحية العناوين الأقل.' },
      { esp: 'E4', val: false, eax: 'EAX', en: '<code>PUSH EAX</code> first decrements ESP by the size of EAX, 4 bytes: ESP = 00FFFFE8 − 4 = 00FFFFE4.',
        ar: 'الـ ' + bdi('PUSH EAX') + ' الأول بتقلل الـ ESP بحجم الـ EAX وهو 4 bytes يعني' + ltr('ESP = 00FFFFE8 - 4 = 00FFFFE4') },
      { esp: 'E4', val: true, eax: 'EAX', en: 'Then it stores the current value of EAX at [ESP] = 00FFFFE4: four bytes, 00FFFFE4 to 00FFFFE7, the most-significant byte at the highest address.',
        ar: 'وبعدين بتخزن قيمة الـ EAX الحالية عند ' + bdi('[ESP]') + ' يعني ' + bdi('00FFFFE4') + '، أربع bytes من ' + bdi('00FFFFE4') + ' لحد ' + bdi('00FFFFE7') + ' والـ most-significant byte في أعلى عنوان.' }
    ] : [
      { esp: 'E4', val: true, eax: 'EAX', en: 'Before: ESP = 00FFFFE4, and the four bytes 00FFFFE4 to 00FFFFE7 hold an EAX value on the stack.',
        ar: 'قبل التنفيذ:' + ltr('ESP = 00FFFFE4') + 'والأربع bytes من ' + bdi('00FFFFE4') + ' لحد ' + bdi('00FFFFE7') + ' فيهم قيمة EAX متخزنة في الـ stack.' },
      { esp: 'E4', val: true, eax: 'EAX ← value from stack', on: true, en: '<code>POP EAX</code> copies the 4 bytes at [ESP] (00FFFFE4 to 00FFFFE7) into EAX.',
        ar: 'الـ ' + bdi('POP EAX') + ' بتنسخ الـ 4 bytes اللي عند ' + bdi('[ESP]') + ' (من ' + bdi('00FFFFE4') + ' لحد ' + bdi('00FFFFE7') + ') في الـ EAX.' },
      { esp: 'E8', val: true, eax: 'EAX ← value from stack', en: 'Then ESP is incremented by 4: ESP = 00FFFFE4 + 4 = 00FFFFE8. The new top of the stack is the value pushed before.',
        ar: 'وبعدين الـ ESP بيزيد 4 يعني' + ltr('ESP = 00FFFFE4 + 4 = 00FFFFE8') + 'وقمة الـ stack الجديدة هي القيمة اللي اتعملها push قبلها.' }];
  }
  function EspFig({ ar, isPush }) {
    const steps = espSteps(isPush), [i, ctl] = useSteps(steps.length, 2400), s = steps[i];
    // grid rows: 1..6 high addresses, 7 the break, 8..15 low addresses
    const rowOf = a => { const h = ESP_HI.indexOf(a); return h >= 0 ? h + 1 : ESP_LO.indexOf(a) + 8; };
    const used = a => ESP_HI.includes(a) || a === '00FFFFE9' || a === '00FFFFE8';
    const isVal = a => s.val && ['00FFFFE7', '00FFFFE6', '00FFFFE5', '00FFFFE4'].includes(a);
    const all = ESP_HI.concat(ESP_LO), pr = rowOf('00FFFF' + s.esp);
    return html`<figure className="fig mpv5"><div className="fig-stage">
      <div className="mpv5-top">
        <div className="mpv5-box"><small>Instruction</small>${isPush ? 'PUSH EAX' : 'POP EAX'}</div>
        <div className=${'mpv5-box' + (s.on ? ' mpv5-on' : '')}><small>Register</small>${s.eax}</div>
        <div className=${'mpv5-box' + (i > 0 && s.esp !== steps[0].esp ? ' mpv5-on' : '')}><small>ESP</small>00FFFF${s.esp}</div>
      </div>
      <div className="mpv5-esp" role="img" aria-label=${(isPush ? 'push EAX' : 'pop EAX') + ': ESP points to 00FFFF' + s.esp}>
        ${all.map((a, k) => html`<${React.Fragment} key=${a}>
          <div className=${'mpv5-c' + (k === 0 || k === 6 ? ' mpv5-first' : '') + (isVal(a) ? ' mpv5-val' : used(a) ? ' mpv5-used' : '')} style=${{ gridRow: rowOf(a) }}></div>
          <div className="mpv5-a" style=${{ gridRow: rowOf(a) }}>${a}</div></${React.Fragment}>`)}
        <div className="mpv5-gap" style=${{ gridRow: 7 }}>⋮</div>
        ${s.val && html`<div className="mpv5-blk" style=${{ gridRow: `${rowOf('00FFFFE7')} / span 4` }}>${isPush ? 'Current EAX value' : 'EAX value on stack'}</div>`}
        <div className="mpv5-ptr" style=${{ gridRow: pr }}>ESP <span aria-hidden="true">→</span></div>
      </div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  const EspPush = ({ ar }) => html`<${EspFig} ar=${ar} isPush=${true} />`;
  const EspPop = ({ ar }) => html`<${EspFig} ar=${ar} isPush=${false} />`;

  /* ── 1.3 and 2.2: PUSHA / POPA (PUSHAD / POPAD): order and SP ── */
  const PA16 = ['AX', 'CX', 'DX', 'BX', 'SP', 'BP', 'SI', 'DI'], PA32 = PA16.map(r => 'E' + r);
  function paStep(w, i) {
    const R = w === 4 ? PA32 : PA16, P = w === 4 ? 'PUSHAD' : 'PUSHA', Q = w === 4 ? 'POPAD' : 'POPA', unit = w === 4 ? 'double word' : 'word', B = 8 * w;
    if (i === 0) return w === 4
      ? { en: `<b>PUSHAD</b> pushes the eight 32-bit registers in the order ${R.join(', ')}. Each push is a double word, 4 bytes.`, ar: 'الـ <b>PUSHAD</b> بتعمل push للـ 8 registers الـ 32-bit بالترتيب ده:' + ltr(R.join(', ')) + 'وكل push بياخد double word يعني 4 bytes.' }
      : { en: `<b>PUSHA</b> pushes the eight 16-bit registers in the order ${R.join(', ')}. Each push is a word, 2 bytes.`, ar: 'الـ <b>PUSHA</b> بتعمل push للـ 8 registers الـ 16-bit بالترتيب ده:' + ltr(R.join(', ')) + 'وكل push بياخد word يعني 2 bytes.' };
    if (i <= 8) { const r = R[i - 1], t = i * w;
      return { en: `${P}, push ${i} of 8: SP goes down by ${w} and ${r} is stored at the new top. SP = old SP − ${t} bytes.` + (i === 8 ? ` Done: 8 ${unit}s = ${B} bytes.` : ''),
        ar: `الـ ${P} بتعمل push رقم ${bdi(String(i))} من 8، فالـ SP بيقل ${bdi(String(w))} والـ ${r} بيتخزن عند القمة الجديدة يعني` + ltr(`SP = old SP - ${t} bytes`) + (i === 8 ? `وكده خلصت ${bdi('8')} ${unit}s يعني ${bdi(B + ' bytes')}.` : '') }; }
    const k = i - 9, r = R[7 - k], t = (8 - k - 1) * w;
    return { en: `${Q}, pop ${k + 1} of 8: ${r} was pushed last${k ? ' of those left' : ''}, so it comes out first and gets its own value back. SP = old SP − ${t} bytes.` + (k === 7 ? ` All eight restored in the reverse order ${R.slice().reverse().join(', ')}; SP is back up by ${B}.` : ''),
      ar: `الـ ${Q} بتعمل pop رقم ${bdi(String(k + 1))} من 8، والـ ${r} هو آخر واحد اتعمله push${k ? ' من اللي فاضلين' : ''} فبيطلع الأول ويرجعله قيمته يعني` + ltr(`SP = old SP - ${t} bytes`) +
        (k === 7 ? 'وكده الـ 8 رجعوا بالترتيب العكسي:' + ltr(R.slice().reverse().join(', ')) + `والـ SP زاد ${bdi(String(B))} ورجع مكانه.` : '') };
  }
  function PaInner({ ar, w }) {
    const R = w === 4 ? PA32 : PA16, [i, ctl] = useSteps(17, 1300), c = paStep(w, i);
    const pushed = Math.min(i, 8), popped = i > 8 ? i - 8 : 0, cnt = pushed - popped; // words on the stack now
    const cur = i === 0 ? -1 : i <= 8 ? i - 1 : 8 - (i - 8); // index of the register acting now
    return html`<div><div className="fig-stage">
      <div className="mpv5-code">${i === 0 ? (w === 4 ? 'PUSHAD' : 'PUSHA') : i <= 8 ? (w === 4 ? 'PUSHAD' : 'PUSHA') : (w === 4 ? 'POPAD' : 'POPA')}</div>
      <div className="mpv5-pa">
        <div className="mpv5-pr">${R.map((r, k) => { const st = k < pushed ? (k >= cnt ? 'back' : 'saved') : '';
          return html`<div key=${r} className=${cur === k ? 'mpv5-on' : ''}>${r}<span>${st === 'saved' ? '↓ saved' : st === 'back' ? '↑ back' : ''}</span></div>`; })}</div>
        <div className="mpv5-ps" role="img" aria-label=${'Stack with ' + cnt + ' registers saved'}>
          <div className="mpv5-ol">old SP</div><div className="mpv5-w mpv5-used"></div><div className="mpv5-sp">${cnt === 0 ? '←SP' : ''}</div>
          ${R.map((r, k) => html`<${React.Fragment} key=${r}>
            <div className="mpv5-ol">−${(k + 1) * w}</div>
            <div className=${'mpv5-w' + (k < cnt ? (k === cur && i <= 8 ? ' mpv5-new' : ' mpv5-in-st') : k < pushed ? ' mpv5-gone' : '')}>${k < pushed ? r : ''}</div>
            <div className="mpv5-sp">${cnt === k + 1 ? '←SP' : ''}</div></${React.Fragment}>`)}
        </div>
      </div>
      <p className="mpv5-calc">SP = old SP − ${cnt * w} bytes (${cnt} ${w === 4 ? 'double words' : 'words'} on the stack)</p></div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} />
      <div className="fig-bar"><span className="mpv5-cnt">${i === 0 ? 'start' : i <= 8 ? `push ${i}/8` : `pop ${i - 8}/8`}</span><span className="grow"></span>
        <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
        <button className="fig-btn" onClick=${() => ctl.go(Math.min(16, i + 1))} disabled=${i === 16} aria-label="Next step">Next ›</button>
        <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div></div>`;
  }
  function PushAll({ ar }) {
    const [w, setW] = useState(2);
    return html`<figure className="fig mpv5"><div className="fig-bar" style=${{ padding: '10px 14px 0', justifyContent: 'center' }}>
      <button className="fig-btn" aria-pressed=${String(w === 2)} onClick=${() => setW(2)}>PUSHA / POPA</button>
      <button className="fig-btn" aria-pressed=${String(w === 4)} onClick=${() => setW(4)}>PUSHAD / POPAD</button></div>
      <${PaInner} key=${w} w=${w} ar=${ar} /></figure>`;
  }

  /* ── 3 and 4: the slides' figures for PUSH AX and POP EAX, step by step ── */
  const LEC_PUSH = [
    { en: 'Given AL = B3, AH = 5A, SP = 07FE, SS = 300, DS = 100: show the memory state when executing <code>PUSH AX</code>. The stack is addressed with SS and SP, so DS is not needed.',
      ar: 'المعطى:' + ltr('AL = B3, AH = 5A, SP = 07FE, SS = 300, DS = 100') + 'والمطلوب حالة الـ memory لما ننفّذ ' + bdi('PUSH AX') + '. والـ stack بيتوصله بالـ SS والـ SP، فالـ DS مش محتاجينه هنا.' },
    { en: 'Segment register × 10: SS × 10 = 300 × 10 = 3000.', ar: 'نضرب الـ segment register في 10:' + ltr('SS × 10 = 300 × 10 = 3000') },
    { en: 'The adder adds SP: memory location = SS × 10 + SP = 3000 + 07FE = 37FE, the current top of the stack.', ar: 'الـ adder بيجمع الـ SP، فالعنوان بيبقى' + ltr('SS × 10 + SP = 3000 + 07FE = 37FE') + 'وده قمة الـ stack الحالية.' },
    { en: 'The most-significant byte, AH = 5A, goes to SS:[SP−1] = 37FD.', ar: 'الـ most-significant byte وهو الـ AH بيروح للـ ' + bdi('SS:[SP-1]') + ' يعني' + ltr('[37FD] = 5A (AH)') },
    { en: 'The least-significant byte, AL = B3, goes to SS:[SP−2] = 37FC.', ar: 'الـ least-significant byte وهو الـ AL بيروح للـ ' + bdi('SS:[SP-2]') + ' يعني' + ltr('[37FC] = B3 (AL)') },
    { en: 'Then SP = 07FE − 2 = 07FC: the slide crosses out 07FE and writes 7FC. SS stays 300. (The Final 2024/25 asked the same with PUSH BX, BH = 5A, BL = B3: same numbers.)', ar: 'وبعدين الـ SP بيقل 2 يعني' + ltr('SP = 07FE - 2 = 07FC') + 'والـ slide بتشطب الـ ' + bdi('07FE') + ' وتكتب ' + bdi('7FC') + '. والـ SS بيفضل ' + bdi('300') + ' زي ما هو. (امتحان الـ Final ' + bdi('2024/25') + ' جاب نفس السؤال بـ ' + bdi('PUSH BX') + ' و ' + bdi('BH=5A, BL=B3') + ' بنفس الأرقام.)' }];
  const LEC_POP = [
    { en: 'Given SP = 1234, SS = 300, DS = 100, [SP] = 11, [SP+1] = 22, [SP+2] = 33, [SP+3] = 44: show the memory state when executing <code>POP EAX</code>.',
      ar: 'المعطى:' + ltr('SP = 1234, SS = 300, DS = 100, [SP] = 11, [SP+1] = 22, [SP+2] = 33, [SP+3] = 44') + 'والمطلوب حالة الـ memory لما ننفّذ ' + bdi('POP EAX') + '.' },
    { en: 'Segment register × 10: SS × 10 = 300 × 10 = 3000.', ar: 'نضرب الـ segment register في 10:' + ltr('SS × 10 = 300 × 10 = 3000') },
    { en: 'The adder adds SP: memory location = SS × 10 + SP = 3000 + 1234 = 4234. That is [SP], which holds 11.', ar: 'الـ adder بيجمع الـ SP، فالعنوان بيبقى' + ltr('SS × 10 + SP = 3000 + 1234 = 4234') + 'وده الـ ' + bdi('[SP]') + ' اللي فيه ' + bdi('11') + '.' },
    { en: 'POP EAX copies 4 bytes, 4234 to 4237, into EAX; the byte at the lowest address goes to AL: EAX = 44 33 22 11 (AL = 11, AH = 22, upper word 4433).', ar: 'الـ ' + bdi('POP EAX') + ' بتنسخ 4 bytes من ' + bdi('4234') + ' لحد ' + bdi('4237') + ' في الـ EAX، والـ byte اللي في أقل عنوان بيروح للـ AL يعني' + ltr('EAX = 44 33 22 11 (AL = 11, AH = 22, upper word 4433)') },
    { en: 'Then SP = 1234 + 4 = 1238: the slide crosses out 1234 and writes 1238. (The slide drew the bytes at 4235 to 4238; the revision sheet and the final use [SP] to [SP+3], 4234 to 4237, as drawn here: POP reads from SS:SP upward.)',
      ar: 'وبعدين الـ SP بيزيد 4 يعني' + ltr('SP = 1234 + 4 = 1238') + 'والـ slide بتشطب الـ ' + bdi('1234') + ' وتكتب ' + bdi('1238') + '. (الـ slide رسمت الـ bytes من ' + bdi('4235') + ' لحد ' + bdi('4238') + '، لكن الـ revision sheet والـ final بيستخدموا من ' + bdi('[SP]') + ' لحد ' + bdi('[SP+3]') + ' يعني من ' + bdi('4234') + ' لحد ' + bdi('4237') + ' زي الرسمة هنا، لأن الـ POP بتقرا من ' + bdi('SS:SP') + ' لفوق.)' }];
  function LecFig({ ar, isPush }) {
    const steps = isPush ? LEC_PUSH : LEC_POP, [i, ctl] = useSteps(steps.length, 2300), s = steps[i];
    const id = isPush ? 'mpv5-ahp' : 'mpv5-aho', mk = `url(#${id})`;
    const ry = k => 36 + k * 28, my = k => 36 + k * 28;
    const RW = ['EAX', 'EBX', 'ECX', 'ESP'];
    const mem = isPush ? ['37FE', '37FD', '37FC', '37FB'] : ['4238', '4237', '4236', '4235', '4234'];
    const memV = isPush ? [null, i >= 3 ? '5A' : null, i >= 4 ? 'B3' : null, null] : [null, '44', '33', '22', '11'];
    const tgt = isPush ? 0 : 4, oldSp = isPush ? '07FE' : '1234', newSp = isPush ? '7FC' : '1238', last = steps.length - 1;
    const eax = isPush ? [null, null, '5A', 'B3'] : (i >= 3 ? ['44', '33', '22', '11'] : [null, null, null, null]);
    const hiMem = k => isPush ? (i === 3 && k === 1) || (i === 4 && k === 2) || (i === 2 && k === 0) : (i >= 3 && k >= 1) || (i === 2 && k === 4);
    return html`<figure className="fig mpv5"><div className="fig-stage mpv5-fig">
      <div className="mpv5-code">${isPush ? 'PUSH AX' : 'POP EAX'}</div>
      <svg viewBox="0 0 330 222" role="img" aria-label=${isPush ? 'PUSH AX: SS 300 times 10 plus SP 07FE is 37FE; AH 5A goes to 37FD, AL B3 to 37FC, SP becomes 07FC' : 'POP EAX: SS 300 times 10 plus SP 1234 is 4234; bytes 11, 22, 33, 44 at 4234 to 4237 go to EAX, SP becomes 1238'}>
        <defs><marker id=${id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--fig-k)" /></marker></defs>
        <text x="119" y="30" fontSize="15" textAnchor="middle" className="mpv5-g">AH</text><text x="149" y="30" fontSize="15" textAnchor="middle" className="mpv5-g">AL</text>
        ${RW.map((n, k) => html`<g key=${n}><text x="2" y=${ry(k) + 19} fontSize="15">${n}</text>
          ${k < 3 && [0, 1, 2, 3].map(c => html`<rect key=${c} x=${44 + c * 30} y=${ry(k)} width="30" height="28" className=${'mpv5-cl' + (k === 0 && i >= 3 && !isPush ? ' mpv5-hi' : k === 0 && isPush && ((i === 3 && c === 2) || (i === 4 && c === 3)) ? ' mpv5-hi' : '')} />`)}
          ${k === 3 && html`<g><rect x="44" y=${ry(k)} width="60" height="28" className="mpv5-cl" /><rect x="104" y=${ry(k)} width="60" height="28" className=${'mpv5-cl' + (i === last ? ' mpv5-hi' : '')} /></g>`}
          ${k === 0 && eax.map((v, c) => v && html`<text key=${c} x=${59 + c * 30} y=${ry(0) + 19} fontSize="15" fontWeight="700" textAnchor="middle">${v}</text>`)}</g>`)}
        <text x="134" y=${ry(3) + 19} fontSize="15" fontWeight="700" textAnchor="middle">${oldSp}</text>
        <g className=${pop(i === last)}><path d=${`M108,${ry(3) + 24} L160,${ry(3) + 4}`} className="mpv5-ln" style=${{ stroke: 'var(--pen)' }} /><text x="74" y=${ry(3) + 19} fontSize="15" fontWeight="700" textAnchor="middle" className="mpv5-k">${newSp}</text></g>
        <text x="2" y="173" fontSize="15">SS</text>
        <rect x="104" y="154" width="60" height="28" className=${'mpv5-cl' + (i === 1 ? ' mpv5-hi' : '')} /><text x="134" y="173" fontSize="15" fontWeight="700" textAnchor="middle">300</text>
        <g className=${pop(i >= 1)}><path d="M164,168 H186" className="mpv5-aw" markerEnd=${mk} /><text x="134" y="202" fontSize="15" textAnchor="middle">300×10 = 3000</text></g>
        <g className=${pop(i >= 2)}><path d=${`M164,${ry(3) + 14} H198 V154`} className="mpv5-aw" markerEnd=${mk} />
          <circle cx="198" cy="168" r="12" className="mpv5-cl" /><text x="198" y="173" fontSize="16" textAnchor="middle" fontWeight="700">+</text>
          <path d=${`M210,168 H213 V${my(tgt) + 14} H220`} className="mpv5-aw" markerEnd=${mk} /></g>
        ${mem.map((a, k) => html`<g key=${a}><rect x="222" y=${my(k)} width="104" height="28" className=${'mpv5-cl' + (hiMem(k) ? ' mpv5-hi' : '')} />
          <text x="228" y=${my(k) + 19} fontSize="15" className="mpv5-g">${a}</text>
          ${memV[k] && html`<text x="304" y=${my(k) + 19} fontSize="15" fontWeight="700" textAnchor="middle">${memV[k]}</text>`}</g>`)}
        ${isPush && html`<g className=${pop(i >= 3)}><path d=${`M164,${ry(0) + 8} L220,${my(1) + 14}`} className="mpv5-aw" markerEnd=${mk} /></g>`}
        ${isPush && html`<g className=${pop(i >= 4)}><path d=${`M164,${ry(0) + 20} L220,${my(2) + 14}`} className="mpv5-aw" markerEnd=${mk} /></g>`}
        ${!isPush && html`<g className=${pop(i >= 3)}><path d=${`M218,${my(1) + 2} h-5 V${my(5) - 2} h5`} className="mpv5-ln" /><path d=${`M213,${my(3)} L166,${ry(0) + 14}`} className="mpv5-aw" markerEnd=${mk} /></g>`}
      </svg>
      <p className="mpv5-calc">Memory location = (Segment Register × 10) + offset<br /><span className=${pop(i >= 1)}>= SS × 10 + SP</span><br /><span className=${pop(i >= 2)}>= 3000 + ${oldSp} = ${isPush ? '37FE' : '4234'}</span>
        <br /><span className=${pop(i === last)}>SP = ${oldSp} ${isPush ? '− 2 = 07FC' : '+ 4 = 1238'}</span></p></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  const LecPush = ({ ar }) => html`<${LecFig} ar=${ar} isPush=${true} />`;
  const LecPop = ({ ar }) => html`<${LecFig} ar=${ar} isPush=${false} />`;

  /* ── 3, 4, 5: PUSH / POP memory calculator (lecture, final, revision, Sheet 1 Q5, or your own) ── */
  const CR16 = ['AX', 'BX', 'CX', 'DX'], CR32 = CR16.map(r => 'E' + r);
  const CALC_EX = [
    { l: 'Lecture: PUSH AX', op: 'PUSH', r: 'AX', ss: '300', sp: '07FE', v: '5AB3' },
    { l: 'Final: PUSH BX', op: 'PUSH', r: 'BX', ss: '300', sp: '07FE', v: '5AB3' },
    { l: 'Revision: POP EAX', op: 'POP', r: 'EAX', ss: '300', sp: '1234', v: '11 22 33 44' },
    { l: 'Sheet 1 Q5: PUSH EAX', op: 'PUSH', r: 'EAX', ss: '0200', sp: '0100', v: 'ABCD' }];
  // the course's way: address = SS × 10 + SP; PUSH stores MSB first at SP-1 down, POP reads from SP up
  function calcRun(x) {
    const n = x.r.length === 3 ? 4 : 2, SS = cleanHex(x.ss), SP = cleanHex(x.sp);
    if (!isHex(SS, 4) || !isHex(SP, 4)) return { err: 'SS and SP: 1 to 4 hex digits each.', errAr: 'الـ SS والـ SP لازم كل واحد يبقى من رقم لـ 4 أرقام بالـ hex.' };
    const ss = parseInt(SS, 16), sp = parseInt(SP, 16), base = ss * 16, A = base + sp, n2 = 2 * n;
    const lo8 = x.r.length === 3 ? x.r.slice(1, 2) : x.r[0], names = n === 4 ? ['', '', lo8 + 'H', lo8 + 'L'] : [lo8 + 'H', lo8 + 'L'];
    const out = { n, ss: hx(ss, Math.max(3, SS.length)), sp: hx(sp, 4), base: hx(base, 4), A: hx(A, 4), op: x.op, r: x.r };
    if (x.op === 'PUSH') {
      const V = cleanHex(x.v); if (!isHex(V, n2)) return { err: `${x.r} value: 1 to ${n2} hex digits.`, errAr: `قيمة الـ ${x.r} لازم تبقى من رقم لـ ${bdi(String(n2))} أرقام بالـ hex.` };
      const full = V.padStart(n2, '0'), bytes = full.match(/../g);
      out.val = full; out.bytes = bytes; out.rows = bytes.map((b, k) => ({ a: hx(A - 1 - k, 4), b, t: names[k], off: `SP-${k + 1}` }));
      out.nsp = hx((sp - n + 0x10000) & 0xFFFF, 4);
    } else {
      const bs = String(x.v).trim().toUpperCase().split(/[\s,]+/).filter(Boolean);
      if (bs.length !== n || !bs.every(b => isHex(b, 2))) return { err: `Type the ${n} bytes at [SP], [SP+1]${n === 4 ? ', [SP+2], [SP+3]' : ''} in hex, like 11 22${n === 4 ? ' 33 44' : ''}.`, errAr: `اكتب الـ ${bdi(String(n))} bytes اللي من ${bdi('[SP]')} لفوق بالـ hex، زي ${bdi(n === 4 ? '11 22 33 44' : '11 22')}.` };
      const bytes = bs.map(b => b.padStart(2, '0'));
      out.bytes = bytes; out.rows = bytes.map((b, k) => ({ a: hx(A + k, 4), b, t: names[n - 1 - k], off: k ? `SP+${k}` : 'SP' })).reverse();
      out.val = bytes.slice().reverse().join(''); out.nsp = hx((sp + n) & 0xFFFF, 4);
    }
    return out;
  }
  function calcSteps(o) {
    const lo8 = o.r.length === 3 ? o.r.slice(1, 2) : o.r[0], s0 = `SS × 10 + SP = ${o.base} + ${o.sp} = ${o.A}`;
    const steps = [{ en: `Memory location = SS × 10 + SP = ${o.base} + ${o.sp} = <b>${o.A}</b>.`, ar: 'الـ memory location بيتحسب كده:' + ltr(s0) }];
    if (o.op === 'PUSH') {
      const spaced = o.bytes.join(' ');
      steps.push({ en: `${o.r} = ${o.val}: its ${o.n} bytes are ${o.bytes.join(', ')}, most-significant first; ${lo8}H = ${o.bytes[o.n - 2]} and ${lo8}L = ${o.bytes[o.n - 1]}.`,
        ar: `الـ ${o.r} فيها ${bdi(String(o.n))} bytes والـ most-significant الأول، يعني` + ltr(`${o.r} = ${spaced}, ${lo8}H = ${o.bytes[o.n - 2]}, ${lo8}L = ${o.bytes[o.n - 1]}`) });
      steps.push({ en: `Stored from SS:[SP−1] down: ${o.rows.map(w => `[${w.a}] = ${w.b}`).join(', ')}.`, ar: 'بتتخزن من ' + bdi('SS:[SP-1]') + ' ونازل يعني' + ltr(o.rows.map(w => `[${w.a}] = ${w.b}`).join(', ')) });
      steps.push({ en: `SP = ${o.sp} − ${o.n} = <b>${o.nsp}</b>. SS does not change.`, ar: `وبعدين الـ SP بيقل ${bdi(String(o.n))} يعني` + ltr(`SP = ${o.sp} - ${o.n} = ${o.nsp}`) + 'والـ SS مش بيتغير.' });
    } else {
      const up = o.rows.slice().reverse();
      steps.push({ en: `Bytes from SS:[SP] up: ${up.map(w => `[${w.a}] = ${w.b}`).join(', ')}.`, ar: 'الـ bytes من ' + bdi('SS:[SP]') + ' لفوق هي' + ltr(up.map(w => `[${w.a}] = ${w.b}`).join(', ')) });
      steps.push({ en: `The byte at the lowest address goes to ${lo8}L: ${o.r} = <b>${o.val}</b> (${lo8}L = ${o.bytes[0]}, ${lo8}H = ${o.bytes[1]}).`, ar: `الـ byte اللي في أقل عنوان بيروح للـ ${lo8}L يعني` + ltr(`${o.r} = ${o.val} (${lo8}L = ${o.bytes[0]}, ${lo8}H = ${o.bytes[1]})`) });
      steps.push({ en: `SP = ${o.sp} + ${o.n} = <b>${o.nsp}</b>. SS does not change.`, ar: `وبعدين الـ SP بيزيد ${bdi(String(o.n))} يعني` + ltr(`SP = ${o.sp} + ${o.n} = ${o.nsp}`) + 'والـ SS مش بيتغير.' });
    }
    return steps;
  }
  function StackCalc({ ar }) {
    const [x, setX] = useState(CALC_EX[0]), [i, ctl] = useSteps(4, 2000);
    const set = (k, v) => { const y = Object.assign({}, x, { [k]: v }); if (k === 'op') y.v = v === 'POP' ? (y.r.length === 3 ? '11 22 33 44' : '11 22') : '5AB3'; if (k === 'r' && x.op === 'POP') y.v = v.length === 3 ? '11 22 33 44' : '11 22'; setX(y); ctl.replay(); };
    const o = calcRun(x), steps = o.err ? null : calcSteps(o), c = o.err ? { en: o.err, ar: o.errAr } : steps[i];
    const same = e => ['op', 'r', 'ss', 'sp', 'v'].every(k => cleanHex(e[k]) === cleanHex(x[k]));
    return html`<figure className="fig mpv5"><div className="fig-stage">
      <div className="mpv5-chips"><span className="mpv5-lbl">Examples from the notes</span>${CALC_EX.map(e => html`<button key=${e.l} className="mpv5-chip" aria-pressed=${String(same(e))} onClick=${() => { setX(e); ctl.replay(); }}>${e.l}</button>`)}</div>
      <div className="mpv5-in"><span className="mpv5-lbl">Try your own</span>
        <select aria-label="Instruction" value=${x.op} onChange=${e => set('op', e.target.value)}><option value="PUSH">PUSH</option><option value="POP">POP</option></select>
        <select aria-label="Register" value=${x.r} onChange=${e => set('r', e.target.value)}>${CR16.concat(CR32).map(r => html`<option key=${r} value=${r}>${r}</option>`)}</select>
        <span>SS</span><input aria-label="SS (hex)" value=${x.ss} onInput=${e => set('ss', e.target.value)} onChange=${e => set('ss', e.target.value)} spellCheck="false" style=${{ width: '58px' }} />
        <span>SP</span><input aria-label="SP (hex)" value=${x.sp} onInput=${e => set('sp', e.target.value)} onChange=${e => set('sp', e.target.value)} spellCheck="false" style=${{ width: '58px' }} />
        <span>${x.op === 'PUSH' ? x.r : 'bytes [SP] up'}</span><input aria-label=${x.op === 'PUSH' ? x.r + ' value (hex)' : 'Bytes at [SP] upward (hex)'} value=${x.v} onInput=${e => set('v', e.target.value)} onChange=${e => set('v', e.target.value)} spellCheck="false" style=${{ width: x.op === 'PUSH' ? '96px' : '110px' }} /></div>
      ${o.err ? html`<p className="mpv5-err">${o.err}</p>` : html`<div>
        <div className="mpv5-code">${x.op} ${x.r}</div>
        <div className="mpv5-tab" role="table" aria-label="Stack bytes, high address at the top">
          ${o.op === 'PUSH' && html`<div><span className="mpv5-ad">${o.A}</span><span>··</span><span className="mpv5-tg">old top (SP = ${o.sp})</span></div>`}
          ${o.rows.map((w, k) => html`<div key=${w.a} className=${(o.op === 'PUSH' ? (i >= 2 ? 'mpv5-new' : '') : (i >= 1 ? 'mpv5-new' : ''))}>
            <span className="mpv5-ad">${w.a}</span><span>${o.op === 'PUSH' && i < 2 ? '··' : w.b}</span><span className="mpv5-tg">${w.off}${w.t ? ' ← ' + w.t : ''}${o.op === 'POP' && k === o.rows.length - 1 ? ' (old top)' : ''}</span></div>`)}
        </div>
        <p className="mpv5-calc">address = ${o.ss} × 10 + ${o.sp} = ${o.A}
          <span className=${pop(o.op === 'PUSH' ? i >= 1 : i >= 2)}><br />${o.r} = ${o.val}</span>
          <span className=${pop(i >= 3)}><br />SP = ${o.sp} ${o.op === 'PUSH' ? '−' : '+'} ${o.n} = <span className="mpv5-hl">${o.nsp}</span></span></p></div>`}</div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} />${!o.err && html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── 6: Lab 6 programs run line by line (or your own) ── */
  const LAB_PROGS = [
    ['PUSH / POP AX', 'MOV AX, 1234h\nPUSH AX        ; store value of AX in stack\nMOV AX, 5678h  ; modify the AX value\nPOP AX         ; restore the original value: AX = 1234h'],
    ['PUSHF / POPF', 'PUSHF          ; save flags\nSTC            ; set carry (changes CF)\nPOPF           ; restore the old flags'],
    ['PUSHA / POPA', 'PUSHA          ; save AX,CX,DX,BX,SP,BP,SI,DI\nMOV AX, 3\nMOV BX, 4\nADD AX, BX     ; AX = 7 temporarily\nPOPA           ; all registers restored']];
  const LR = ['AX', 'BX', 'CX', 'DX', 'SI', 'DI', 'BP', 'SP'], LSHOW = ['AX', 'BX', 'CX', 'DX', 'SP'], LAB_SP0 = 0x0100;
  function lnum(t) {
    t = String(t).trim().toUpperCase(); let m;
    if ((m = /^([0-9][0-9A-F]*)H$/.exec(t))) return parseInt(m[1], 16) & 0xFFFF;
    if (/^[0-9]+$/.test(t)) return parseInt(t, 10) & 0xFFFF;
    return null;
  }
  function runLab6(txt) {
    const R = { AX: 0, BX: 0, CX: 0, DX: 0, SI: 0, DI: 0, BP: 0, SP: LAB_SP0 }, S = [], out = []; let CF = 0;
    const h = v => hx(v, 4), isR = a => LR.includes(a);
    const val = a => isR(a) ? R[a] : lnum(a);
    txt.split('\n').forEach((line, li) => {
      const code = line.replace(/;.*$/, '').trim();
      if (!code) { out.push({ line, li, exec: false }); return; }
      const m = /^([A-Za-z]+)\s*(.*)$/.exec(code), op = m[1].toUpperCase(), args = m[2] ? m[2].split(',').map(a => a.trim().toUpperCase()) : [];
      let err = null, en = '', ar = '', ch = [], calc = '', push = 0;
      const sp0 = R.SP;
      const doPush = (v, tag) => { R.SP = (R.SP - 2) & 0xFFFF; S.push({ v, tag, at: R.SP }); };
      if (op === 'MOV' || op === 'ADD' || op === 'SUB') {
        if (args.length !== 2 || !isR(args[0]) || args[0] === 'SP' || val(args[1]) == null) err = 'use a register (AX, BX, CX, DX, SI, DI, BP) and a register or number';
        else { const d = args[0], o = R[d], s = val(args[1]);
          if (op === 'MOV') { R[d] = s; calc = `${d} = ${h(s)}`; en = `copies ${args[1]} into ${d}`; ar = `بتحط ${bdi(args[1])} في الـ ${d}`; }
          else if (op === 'ADD') { const t = o + s; R[d] = t & 0xFFFF; CF = t > 0xFFFF ? 1 : 0; calc = `${d} = ${h(o)} + ${h(s)} = ${h(R[d])}, CF = ${CF}`; en = `adds ${args[1]} to ${d}`; ar = `بتجمع ${bdi(args[1])} على الـ ${d}`; }
          else { R[d] = (o - s) & 0xFFFF; CF = o < s ? 1 : 0; calc = `${d} = ${h(o)} - ${h(s)} = ${h(R[d])}, CF = ${CF}`; en = `subtracts ${args[1]} from ${d}`; ar = `بتطرح ${bdi(args[1])} من الـ ${d}`; }
          ch = [d]; }
      } else if (op === 'PUSH') {
        if (args.length !== 1 || val(args[0]) == null) err = 'PUSH needs a 16-bit register or a number here';
        else if (S.length >= 12) err = 'this simulator keeps at most 12 words';
        else { const v = val(args[0]); doPush(v, isR(args[0]) ? args[0] : ''); ch = ['SP']; push = 1; calc = `SP = ${h(sp0)} - 2 = ${h(R.SP)}, [SP] = ${h(v)}`; en = `decrements SP by 2 and stores ${args[0]} at SS:[SP]`; ar = `بتقلل الـ SP بـ 2 وتحط الـ ${args[0]} عند ${bdi('SS:[SP]')}`; }
      } else if (op === 'POP') {
        if (args.length !== 1) err = 'POP needs one register';
        else if (args[0] === 'CS') err = 'POP CS is not allowed';
        else if (!isR(args[0])) err = lnum(args[0]) != null ? 'POP cannot take an immediate value' : 'POP needs a 16-bit register here';
        else if (!S.length) err = 'nothing on the stack to pop';
        else { const d = args[0], w = S.pop(); R.SP = (R.SP + 2) & 0xFFFF; R[d] = w.v; if (d === 'SP') R.SP = w.v; ch = [d, 'SP'];
          calc = d === 'SP' ? `SP = ${h(w.v)}` : `${d} = ${h(w.v)}, SP = ${h(sp0)} + 2 = ${h((sp0 + 2) & 0xFFFF)}`; en = `copies the word at SS:[SP] into ${d} and increments SP by 2`; ar = `بتنسخ الـ word اللي عند ${bdi('SS:[SP]')} في الـ ${d} وتزوّد الـ SP بـ 2`; }
      } else if (op === 'PUSHF' || op === 'POPF' || op === 'PUSHA' || op === 'POPA' || op === 'STC' || op === 'CLC') {
        if (args.length) err = op + ' takes no operand';
        else if (op === 'PUSHF') { doPush(CF, 'FLAGS'); ch = ['SP']; push = 1; calc = `SP = ${h(sp0)} - 2 = ${h(R.SP)}, saved CF = ${CF}`; en = 'pushes the 16-bit FLAGS register'; ar = 'بتعمل push للـ FLAGS register'; }
        else if (op === 'POPF') { if (!S.length) err = 'nothing on the stack to pop'; else { const w = S.pop(); R.SP = (R.SP + 2) & 0xFFFF; CF = w.v & 1; ch = ['CF', 'SP']; calc = `CF = ${CF}, SP = ${h(sp0)} + 2 = ${h(R.SP)}`; en = 'pops the stack into FLAGS'; ar = 'بتعمل pop من الـ stack للـ FLAGS'; } }
        else if (op === 'STC' || op === 'CLC') { CF = op === 'STC' ? 1 : 0; ch = ['CF']; calc = `CF = ${CF}`; en = op === 'STC' ? 'sets the carry flag' : 'clears the carry flag'; ar = op === 'STC' ? 'بتخلي الـ carry flag بواحد' : 'بتخلي الـ carry flag بصفر'; }
        else if (op === 'PUSHA') { if (S.length > 4) err = 'this simulator keeps at most 12 words'; else { ['AX', 'CX', 'DX', 'BX', 'SP', 'BP', 'SI', 'DI'].forEach(r => doPush(r === 'SP' ? sp0 : R[r], r)); ch = ['SP']; push = 8;
          calc = `SP = ${h(sp0)} - 10 = ${h(R.SP)}`; en = 'pushes AX, CX, DX, BX, SP, BP, SI, DI (16 bytes; 10 in hex)'; ar = 'بتعمل push للـ 8 registers بالترتيب الـ PUSHA (16 bytes يعني 10 بالـ hex)'; } }
        else { if (S.length < 8) err = 'POPA needs 8 words on the stack'; else { const back = ['DI', 'SI', 'BP', 'SP', 'BX', 'DX', 'CX', 'AX']; const got = {}; back.forEach(r => { got[r] = S.pop().v; }); back.forEach(r => { if (r !== 'SP') R[r] = got[r]; }); R.SP = (sp0 + 16) & 0xFFFF; ch = ['AX', 'BX', 'CX', 'DX', 'SP'];
          calc = `SP = ${h(sp0)} + 10 = ${h(R.SP)}`; en = 'pops DI, SI, BP, SP, BX, DX, CX, AX, so every register gets back what PUSHA saved'; ar = 'بتعمل pop بالترتيب العكسي، فكل register بيرجعله اللي الـ PUSHA حفظته'; } }
      } else err = 'this lab uses MOV, ADD, SUB, PUSH, POP, PUSHF, POPF, PUSHA, POPA, STC, CLC';
      out.push({ line, li, code, exec: true, err, R: Object.assign({}, R), CF, S: S.map(w => Object.assign({}, w)), ch, calc, en, ar, push });
    });
    return out;
  }
  function labCap(cur, t, n) {
    if (!cur) return { en: 'Lab 6 in emu8086: pick a program and press <b>Next</b> to run it line by line. Registers start at 0, CF = 0, and SP = 0100, the top of a <code>.stack 100h</code>. <b>Edit</b> lets you try your own.',
      ar: 'الـ Lab 6 على الـ emu8086. اختار برنامج ودوس <b>Next</b> عشان يتنفذ سطر سطر. الـ registers بتبدأ بـ 0 والـ CF بصفر، والـ SP بيبدأ عند قمة الـ ' + bdi('.stack 100h') + ' يعني ' + bdi('0100') + '. وبالـ <b>Edit</b> تقدر تجرّب برنامجك.' };
    if (cur.err) return { en: `<code>${esc(cur.code)}</code>: ${cur.err}. The line is skipped.`, ar: `السطر ${bdi(cur.code)} فيه مشكلة ومش هيتنفذ. المسموح هنا الـ MOV والـ ADD والـ SUB والـ PUSH والـ POP والـ PUSHF والـ POPF والـ PUSHA والـ POPA والـ STC والـ CLC على الـ registers الـ ${bdi('16-bit')}، والـ POP مش بتاخد رقم ولا CS.` };
    return { en: `<code>${esc(cur.code)}</code> ${cur.en}: ${cur.calc}.` + (t === n ? ' End of the program.' : ''),
      ar: `الـ ${bdi(cur.code)} ${cur.ar} يعني` + ltr(cur.calc) + (t === n ? 'وكده البرنامج خلص.' : '') };
  }
  function Lab6({ ar }) {
    const [p, setP] = useState(0), [txt, setTxt] = useState(LAB_PROGS[0][1]), [t, setT] = useState(0), [edit, setEdit] = useState(false);
    const out = runLab6(txt), ex = out.filter(o => o.exec), n = ex.length, cur = t > 0 ? ex[t - 1] : null;
    const R = cur ? cur.R : { AX: 0, BX: 0, CX: 0, DX: 0, SP: LAB_SP0 }, CF = cur ? cur.CF : 0, S = cur ? cur.S : [];
    const load = j => { setP(j); setTxt(LAB_PROGS[j][1]); setT(0); setEdit(false); };
    const c = labCap(cur, t, n), fresh = cur && !cur.err ? cur.push : 0;
    return html`<figure className="fig mpv5"><div className="fig-stage">
      <div className="mpv5-chips"><span className="mpv5-lbl">Lab 6 code examples</span>${LAB_PROGS.map(([l], j) => html`<button key=${j} className="mpv5-chip" aria-pressed=${String(p === j && txt === LAB_PROGS[j][1])} onClick=${() => load(j)}>${l}</button>`)}</div>
      ${edit ? html`<div className="mpv5-in"><textarea aria-label="Program" rows=${Math.max(4, txt.split('\n').length)} value=${txt} onInput=${e => { setTxt(e.target.value); setT(0); }} onChange=${e => { setTxt(e.target.value); setT(0); }} spellCheck="false" style=${{ width: '100%', maxWidth: '420px', resize: 'vertical' }}></textarea></div>`
        : html`<div className="mpv5-lines">${out.map((o, k) => { const ci = o.line.indexOf(';'), a = ci >= 0 ? o.line.slice(0, ci).replace(/\s+$/, '') : o.line, b = ci >= 0 ? o.line.slice(ci) : '';
          return html`<div key=${k} className=${(!o.exec ? 'mpv5-cmt' : '') + (o.err ? ' mpv5-bad' : '') + (cur && o.li === cur.li ? ' mpv5-cur' : o.exec && cur && o.li < cur.li ? ' mpv5-done' : '')}>${a || (b ? '' : ' ')}${b && html`${a ? ' ' : ''}<i>${b}</i>`}</div>`; })}</div>`}
      <div className="mpv5-lr">${LSHOW.map(r => html`<div key=${r} className=${'mpv5-rg' + (cur && cur.ch.includes(r) ? ' mpv5-on' : '')}><small>${r}</small><b>${hx(R[r], 4)}</b></div>`)}
        <div className=${'mpv5-rg' + (cur && cur.ch.includes('CF') ? ' mpv5-on' : '')}><small>CF</small><b>${CF}</b></div></div>
      <div className="mpv5-lst" role="table" aria-label="Words on the stack, top at the bottom">
        ${S.length ? S.map((w, k) => html`<div key=${k} className=${k >= S.length - fresh ? 'mpv5-new' : ''}><span className="mpv5-ad">${hx(w.at, 4)}</span>
          <span>${w.tag === 'FLAGS' ? `FLAGS (CF = ${w.v})` : hx(w.v, 4) + (w.tag ? ` (${w.tag})` : '')}</span><span className="mpv5-sp">${k === S.length - 1 ? '←SP' : ''}</span></div>`)
          : html`<div className="mpv5-em">stack empty, SP = ${hx(R.SP, 4)}</div>`}
      </div></div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} />
      <div className="fig-bar"><div className="fig-dots" aria-hidden="true">${ex.map((_, j) => html`<i key=${j} className=${j < t ? 'on' : ''}></i>`)}</div><span className="grow"></span>
        <button className="fig-btn" onClick=${() => setEdit(!edit)}>${edit ? '✓ Done' : '✎ Edit'}</button>
        <button className="fig-btn" onClick=${() => setT(Math.max(0, t - 1))} disabled=${t === 0} aria-label="Previous line">‹ Back</button>
        <button className="fig-btn solid" onClick=${() => { setEdit(false); setT(Math.min(n, t + 1)); }} disabled=${t >= n} aria-label="Next line">Next ›</button>
        <button className="fig-btn" onClick=${() => setT(0)}>↻ Reset</button></div></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'mp-l5-stack-sim': StackSim, 'mp-l5-esp-push': EspPush, 'mp-l5-esp-pop': EspPop, 'mp-l5-pusha-popa': PushAll, 'mp-l5-push-ax-figure': LecPush, 'mp-l5-pop-eax-figure': LecPop, 'mp-l5-stack-calc': StackCalc, 'mp-l5-lab6': Lab6 });
})();
/* ── part L6 ── */
// Microprocessors visuals, Lecture 6 (Load Effective Address: LEA, OFFSET, LDS, LES, LSS): LEA vs MOV on the same operand, who calculates the offset (OFFSET vs LEA), an LDS/LES/LSS simulator, the slides' LES and LDS memory figures, the revision LDS and the two final-exam chains (LSS then POP, LES then STOSW). Every label and number comes from the site's notes (slides Lec06).
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop } = window.FIGKIT;
  const CSS = `
.mpv6-f .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mpv6-code{ font:700 1rem/1.4 var(--mono); text-align:center; padding:8px 10px; border-radius:8px; background:var(--paper); border:1px solid var(--line); color:var(--ink); margin:0 auto 10px; max-width:420px; overflow-wrap:anywhere; }
.mpv6-in{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; margin:0 0 10px; font-size:.86rem; color:var(--ink); }
.mpv6-in input, .mpv6-in select{ font:600 .9rem var(--mono); padding:5px 8px; border:1px solid var(--line); border-radius:7px; background:var(--paper); color:var(--ink); min-width:0; box-sizing:border-box; max-width:100%; }
.mpv6-in input:focus, .mpv6-in select:focus{ outline:2px solid var(--fig-k); outline-offset:1px; }
.mpv6-in label{ display:inline-flex; gap:4px; align-items:center; font-size:.84rem; color:var(--graphite); }
.mpv6-lbl{ font-size:.8rem; color:var(--graphite); width:100%; text-align:center; }
.mpv6-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.mpv6-chip{ font:600 .8rem/1.2 var(--mono); padding:5px 8px; border-radius:8px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.mpv6-chip[aria-pressed="true"]{ border-color:var(--fig-k); box-shadow:0 0 0 1px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.mpv6-card{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 6px; text-align:center; transition:opacity .4s, box-shadow .4s, background .4s; min-width:0; }
.mpv6-card small{ display:block; font-size:.78rem; color:var(--graphite); } .mpv6-card b{ display:block; font:700 1rem var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.mpv6-card.mpv6-on{ background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); box-shadow:0 0 0 2px var(--fig-k); }
.mpv6-card.mpv6-dim{ opacity:.45; } .mpv6-card.mpv6-on.mpv6-sgc{ background:color-mix(in srgb, var(--fig-s) 20%, var(--paper)); box-shadow:0 0 0 2px var(--fig-s); }
.mpv6-card s{ display:block; font:.8rem var(--mono); color:var(--graphite); }
.mpv6-arr{ text-align:center; color:var(--fig-k); font-weight:700; font-size:.86rem; margin:4px 0; }
.mpv6-mem{ border:1px solid var(--line); border-radius:8px; background:var(--paper); overflow:hidden; font:600 .9rem/1.2 var(--mono); color:var(--ink); min-width:0; }
.mpv6-mem > div{ display:grid; grid-template-columns:minmax(0,1fr) 34px; border-top:1px solid var(--line); transition:background .4s; }
.mpv6-mem > div:first-child{ border-top:0; }
.mpv6-mem > div span{ padding:4px 6px; color:var(--graphite); font-weight:500; white-space:nowrap; } .mpv6-mem > div b{ padding:4px 0; text-align:center; border-left:1px solid var(--line); }
.mpv6-mem > div.mpv6-on{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); } .mpv6-mem > div.mpv6-sg{ background:color-mix(in srgb, var(--fig-s) 22%, var(--paper)); }
.mpv6-mem > div.mpv6-on span, .mpv6-mem > div.mpv6-sg span{ color:var(--ink); }
.mpv6-mh{ font-size:.78rem; color:var(--graphite); text-align:center; margin:0 0 3px; }
.mpv6-lm{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:8px; max-width:420px; margin:0 auto; }
.mpv6-top{ display:grid; grid-template-columns:minmax(0,1fr) 128px; gap:8px; align-items:center; max-width:420px; margin:0 auto 8px; }
.mpv6-calc{ text-align:center; font:600 .86rem/1.5 var(--mono); color:var(--ink); margin:8px auto 0; max-width:420px; overflow-wrap:anywhere; }
.mpv6-err{ text-align:center; color:var(--pen); font-size:.88rem; margin:6px auto 0; max-width:420px; border:2px solid var(--pen); border-radius:10px; padding:8px; }
.mpv6-lane{ max-width:420px; margin:0 auto 8px; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px; transition:opacity .4s, box-shadow .4s; }
.mpv6-lane.mpv6-on{ box-shadow:0 0 0 2px var(--fig-k); } .mpv6-lane.mpv6-dim{ opacity:.5; }
.mpv6-lane > b{ display:block; text-align:center; font:700 .95rem var(--mono); color:var(--ink); margin-bottom:5px; }
.mpv6-who{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:6px; }
.mpv6-who > div{ border:1px dashed var(--line); border-radius:8px; padding:5px; font-size:.82rem; line-height:1.35; color:var(--ink); min-height:52px; transition:background .4s; }
.mpv6-who > div small{ display:block; font-size:.76rem; color:var(--graphite); font-weight:700; }
.mpv6-who > div.mpv6-on{ background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); border-style:solid; border-color:var(--fig-k); }
.mpv6-tag{ display:inline-block; margin-top:3px; padding:1px 7px; border-radius:99px; font-size:.76rem; font-weight:700; background:var(--fig-s); color:#fff; }
.mpv6-ops{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:420px; margin:0 auto; }
.mpv6-ops > div{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 4px; text-align:center; font-size:.8rem; color:var(--ink); }
.mpv6-ops > div b{ display:block; font:700 .92rem var(--mono); } .mpv6-ops > div i{ display:block; font-style:normal; font-weight:700; color:var(--fig-k); }
.mpv6-lines{ max-width:420px; margin:0 auto 10px; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 0; font:600 .9rem/1.45 var(--mono); color:var(--ink); }
.mpv6-lines div{ padding:1px 10px; transition:background .3s; } .mpv6-lines div.mpv6-cur{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); } .mpv6-lines div.mpv6-done{ opacity:.6; }
.mpv6-regs{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:6px; max-width:420px; margin:0 auto 8px; }
.mpv6-two{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:8px; max-width:420px; margin:0 auto; }
.mpv6-res{ display:grid; grid-template-columns:repeat(var(--n, 2), minmax(0,1fr)); gap:6px; max-width:420px; margin:8px auto 0; }
.mpv6-fig svg text{ font-family:var(--mono); }
.mpv6-fig .mpv6-ln{ stroke:var(--ink); stroke-width:1.5; fill:none; } .mpv6-fig .mpv6-cl{ fill:var(--paper); stroke:var(--ink); stroke-width:1.2; }
.mpv6-fig .mpv6-hi{ fill:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); } .mpv6-fig .mpv6-hs{ fill:color-mix(in srgb, var(--fig-s) 30%, var(--paper)); }
.mpv6-fig .mpv6-aw{ stroke:var(--fig-k); stroke-width:2.2; fill:none; } .mpv6-fig .mpv6-ai{ stroke:var(--ink); stroke-width:1.6; fill:none; }
.mpv6-fig .mpv6-st{ stroke:var(--pen); stroke-width:1.6; }
.mpv6-fig text.mpv6-g{ fill:var(--graphite); }`;
  if (!document.getElementById('mpv6-css')) { const s = document.createElement('style'); s.id = 'mpv6-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* shared helpers */
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const bdi = s => `<bdi dir="ltr">${esc(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const ltr = s => `<span class="ltr">${esc(s)}</span>`;
  const hx = (v, d) => v.toString(16).toUpperCase().padStart(d, '0');
  const hexv = (t, max) => { t = String(t).trim().toUpperCase().replace(/H$/, ''); if (!/^[0-9A-F]{1,4}$/.test(t)) return null; const v = parseInt(t, 16); return v <= max ? v : null; };
  const phys = (seg, off) => (seg * 16 + off) & 0xFFFFF;

  /* ── 0.0-0.2: LEA BX, [DI] loads the address, MOV BX, [DI] loads the data stored there ── */
  function LeaMov({ ar }) {
    const [di, setDi] = useState('0300'), [wd, setWd] = useState('1234');
    const d = hexv(di, 0xFFFF), w = hexv(wd, 0xFFFF), ok = d !== null && w !== null;
    const D = ok ? hx(d, 4) : '?', W = ok ? hx(w, 4) : '?', lo = ok ? hx(w & 255, 2) : '?', hi = ok ? hx(w >> 8, 2) : '?', D1 = ok ? hx((d + 1) & 0xFFFF, 4) : '?';
    const steps = [
      { en: `Two instructions with the same source operand <code>[DI]</code>. Here DI = ${D}H and the word stored at DS:${D} is ${W}H.`,
        ar: `عندنا 2 instructions ليهم نفس الـ source operand وهو ${bdi('[DI]')}. والمعطى هنا:` + ltr(`DI = ${D}H, word at DS:${D} = ${W}H`) },
      { en: `Both calculate the source operand the same way: the offset of <code>[DI]</code> is the value of DI, ${D}H.`,
        ar: `الاتنين بيحسبوا الـ source operand بنفس الطريقة، والـ offset بتاع ${bdi('[DI]')} هو قيمة الـ DI نفسها:` + ltr(`offset = DI = ${D}H`) },
      { en: `<code>LEA BX, [DI]</code> loads the address (offset) itself into BX: BX = ${D}H.`,
        ar: `الـ ${bdi('LEA BX, [DI]')} بتحمّل العنوان نفسه (الـ offset) في الـ BX:` + ltr(`BX = ${D}H`) },
      { en: `<code>MOV BX, [DI]</code> loads the data stored at that memory location: [${D}] = ${lo}, [${D1}] = ${hi}, so BX = ${W}H.`,
        ar: `أما الـ ${bdi('MOV BX, [DI]')} فبتحمّل الداتا المتخزنة في الـ memory location ده:` + ltr(`[${D}] = ${lo}, [${D1}] = ${hi} → BX = ${W}H`) }];
    const [i, ctl] = useSteps(steps.length, 2600);
    const set = (f, v) => { f(v); ctl.go(steps.length - 1); };
    const cap = ok ? steps[i] : { en: 'Write DI and the word as hexadecimal numbers of up to 4 digits (for example 0300 and 1234).', ar: 'اكتب الـ DI والـ word كأرقام hex لحد 4 digits، زي ' + bdi('0300') + ' و ' + bdi('1234') + '.' };
    return html`<figure className="fig mpv6-f"><div className="fig-stage">
      <div className="mpv6-in"><button className="mpv6-chip" aria-pressed=${String(di === '0300' && wd === '1234')} onClick=${() => { setDi('0300'); setWd('1234'); ctl.replay(); }}>Example from the quiz</button></div>
      <div className="mpv6-in"><span className="mpv6-lbl">Try your own (hex)</span>
        <label>DI <input aria-label="DI value in hex" value=${di} onInput=${e => set(setDi, e.target.value)} onChange=${e => set(setDi, e.target.value)} spellCheck="false" style=${{ width: '70px' }} /></label>
        <label>word at DS:DI <input aria-label="Word stored at DS:DI in hex" value=${wd} onInput=${e => set(setWd, e.target.value)} onChange=${e => set(setWd, e.target.value)} spellCheck="false" style=${{ width: '70px' }} /></label></div>
      ${ok ? html`<div>
      <div className="mpv6-top">
        <div><div className=${'mpv6-card' + (i === 1 ? ' mpv6-on' : '')}><small>DI</small><b>${D}</b></div>
          <p className=${'mpv6-arr ' + pop(i >= 1)}>offset of [DI]<br />= ${D} →</p></div>
        <div><p className="mpv6-mh">Memory (DS)</p><div className="mpv6-mem">
          <div className=${i >= 3 ? 'mpv6-on' : ''}><span>DS:${D1}</span><b>${hi}</b></div>
          <div className=${i >= 1 ? 'mpv6-on' : ''}><span>DS:${D}</span><b>${lo}</b></div></div></div></div>
      <div className="mpv6-lm">
        <div className=${'mpv6-card' + (i === 2 ? ' mpv6-on' : i < 2 ? ' mpv6-dim' : '')}><small>LEA BX, [DI]</small><small>loads the address</small><b className=${pop(i >= 2)}>BX = ${D}</b></div>
        <div className=${'mpv6-card' + (i === 3 ? ' mpv6-on' : i < 3 ? ' mpv6-dim' : '')}><small>MOV BX, [DI]</small><small>loads the data</small><b className=${pop(i >= 3)}>BX = ${W}</b></div></div></div>` : null}</div>
      <${Cap} ...${cap} showAr=${ar} />${ok ? html`<${Bar} steps=${steps} i=${i} ctl=${ctl} />` : null}</figure>`;
  }

  /* ── 1: MOV BX, OFFSET LIST vs LEA BX, LIST: who calculates the offset ── */
  function OffsetLea({ ar }) {
    const steps = [
      { en: '<code>MOV BX, OFFSET LIST</code> and <code>LEA BX, LIST</code> perform the same function: both load the offset address of memory location LIST into BX.',
        ar: 'الـ ' + bdi('MOV BX, OFFSET LIST') + ' والـ ' + bdi('LEA BX, LIST') + ' بيعملوا نفس الحاجة، الاتنين بيحمّلوا الـ offset address بتاع الـ memory location اللي اسمها LIST في الـ BX.' },
      { en: 'With <b>OFFSET</b>, the <b>assembler</b> calculates the offset address of LIST. The microprocessor only loads it into BX, so it takes less time.',
        ar: 'مع الـ <b>OFFSET</b> الـ <b>assembler</b> هو اللي بيحسب الـ offset address بتاع LIST، والـ microprocessor بيحطه في الـ BX وبس، فبياخد وقت أقل.' },
      { en: 'With <b>LEA</b>, the <b>microprocessor</b> calculates the address when the instruction executes, so it takes longer than <code>MOV BX, OFFSET</code>.',
        ar: 'مع الـ <b>LEA</b> الـ <b>microprocessor</b> هو اللي بيحسب العنوان وقت تنفيذ الـ instruction، فبياخد وقت أطول من الـ ' + bdi('MOV BX, OFFSET') + '.' },
      { en: 'So OFFSET is more efficient for simple operands such as LIST, and LEA is used for more complex operands such as <code>[DI]</code> and <code>LIST[SI]</code>.',
        ar: 'عشان كده الـ OFFSET أكفأ مع الـ simple operands زي LIST، والـ LEA بتتستخدم مع الـ operands الأعقد زي ' + bdi('[DI]') + ' و ' + bdi('LIST[SI]') + '.' }];
    const [i, ctl] = useSteps(steps.length, 3000);
    const lane = (code, on, dim, asm, cpu, asmOn, cpuOn, tag) => html`<div className=${'mpv6-lane' + (on ? ' mpv6-on' : dim ? ' mpv6-dim' : '')}><b>${code}</b>
      <div className="mpv6-who"><div className=${asmOn ? 'mpv6-on' : ''}><small>Assembler</small>${asm}</div><div className=${cpuOn ? 'mpv6-on' : ''}><small>Microprocessor</small>${cpu}</div></div>
      <div style=${{ textAlign: 'center' }} className=${pop(i >= 1 && (on || i === 3))}><span className="mpv6-tag">${tag}</span></div></div>`;
    return html`<figure className="fig mpv6-f"><div className="fig-stage">
      ${lane('MOV BX, OFFSET LIST', i === 1, i === 2, i >= 1 ? 'calculates the offset of LIST' : '', i >= 1 ? 'loads it into BX' : 'BX = offset of LIST', i === 1, false, 'less time')}
      ${lane('LEA BX, LIST', i === 2, i === 1, i >= 1 ? 'nothing to calculate' : '', i >= 1 ? 'calculates the address at run time, then loads BX' : 'BX = offset of LIST', false, i === 2, 'takes longer')}
      <div className=${pop(i >= 3)}><p className="mpv6-mh">Which one for the operand?</p><div className="mpv6-ops">
        <div><b>LIST</b>simple<i>OFFSET</i></div><div><b>[DI]</b>complex<i>LEA</i></div><div><b>LIST[SI]</b>complex<i>LEA</i></div></div></div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 2.0-2.3: LDS / LES / LSS simulator: 4 bytes, first word to the register, second word to the segment register ── */
  const SIM_EX = [
    { k: 'Lecture LES', ins: 'LES', reg: 'BX', ptr: 'DI', ds: 'A000', pv: '0200', bytes: 'B2 1A 00 3C', old: { BX: '2C2A', ES: '0200', SS: '2100', DI: '0200', SI: '0320' } },
    { k: 'Lecture LDS', ins: 'LDS', reg: 'BX', ptr: 'DI', ds: 'A000', pv: '0200', bytes: 'B2 1A 00 3C', old: { BX: '2C2A', ES: '0200', SS: '2100', DI: '0200', SI: '0320' } },
    { k: 'Revision LDS', ins: 'LDS', reg: 'BX', ptr: 'DI', ds: '1000', pv: '1000', bytes: '7A 12 00 30', old: { BX: '6F2A', DI: '1000' } },
    { k: 'Final 24/25 LSS', ins: 'LSS', reg: 'AX', ptr: 'SI', ds: '2000', pv: '0300', bytes: 'CD AB 34 12', old: { SS: '1100', SI: '0300' } },
    { k: 'Final 23/24 LES', ins: 'LES', reg: 'AX', ptr: 'SI', ds: '2000', pv: '0300', bytes: 'CD AB 34 12', old: { ES: '1100', SI: '0300' } }];
  const SIM_REGS = ['AX', 'BX', 'CX', 'DX', 'SI', 'DI'];
  function simRun(st) {
    const ds = hexv(st.ds, 0xFFFF), pv = hexv(st.pv, 0xFFFF), by = st.bytes.trim().split(/[\s,]+/).map(b => /^[0-9A-Fa-f]{1,2}$/.test(b) ? hx(parseInt(b, 16), 2) : null);
    const ins = `${st.ins} ${st.reg}, [${st.ptr}]`;
    if (st.ins === 'LCS') return { ins, bad: true, en: 'There is no "LCS": CS cannot be loaded this way. Only LDS, LES and LSS exist.', ar: 'مفيش حاجة اسمها "LCS"، والـ CS ماينفعش يتحمّل بالطريقة دي. الموجود بس هو الـ LDS والـ LES والـ LSS.' };
    if (ds === null || pv === null || by.length !== 4 || by.includes(null)) return { ins, bad: true, en: 'Write DS and the offset as hex numbers of up to 4 digits, and exactly four bytes like <code>B2 1A 00 3C</code>.', ar: 'اكتب الـ DS والـ offset كأرقام hex لحد 4 digits، واكتب 4 bytes بالظبط زي ' + bdi('B2 1A 00 3C') + '.' };
    const seg = st.ins.slice(1, 3), A = phys(ds, pv), base = hx(ds * 16, 5), off = pv.toString(16).toUpperCase(), adr = [0, 1, 2, 3].map(k => hx((A + k) & 0xFFFFF, 5));
    const rv = by[1] + by[0], sv = by[3] + by[2], calc = `DS×10 + ${st.ptr} = ${base} + ${off} = ${adr[0]}`;
    const old = Object.assign({ DS: hx(ds, 4), [st.ptr]: hx(pv, 4) }, st.old);
    const en = `<code>${ins}</code> reads 4 bytes starting at DS×10 + ${st.ptr} = ${base} + ${off} = ${adr[0]}. The first two bytes (${by[0]}, ${by[1]}) go into ${st.reg}: ${st.reg} = ${rv}. The next two (${by[2]}, ${by[3]}) go into ${seg}: ${seg} = ${sv}.`
      + (seg === 'DS' ? ' DS is changed after it was used to compute the address, so both ' + st.reg + ' and DS change.' : ` DS is not changed; only ${st.reg} and ${seg} change.`);
    const a = `الـ ${bdi(ins)} بتقرا 4 bytes بادئة من العنوان ده:` + ltr(calc)
      + `أول اتنين bytes بيروحوا للـ ${st.reg}، والاتنين اللي بعدهم بيروحوا للـ ${seg}:` + ltr(`${st.reg} = ${rv}, ${seg} = ${sv}`)
      + (seg === 'DS' ? `يعني الـ DS اتغيّر بعد ما اتستخدم في حساب العنوان، فالـ ${st.reg} والـ DS الاتنين اتغيروا.` : `والـ DS ماتغيّرش، اللي اتغيّر بس الـ ${st.reg} والـ ${seg}.`);
    return { ins, seg, by, adr, rv, sv, calc, old, en, ar: a };
  }
  function LxsSim({ ar }) {
    const [st, setSt] = useState(SIM_EX[0]), r = simRun(st);
    const set = (k, v) => setSt(Object.assign({}, st, { [k]: v }));
    const pick = ex => setSt(ex);
    const card = (n, oldV, newV, on, note, cls) => html`<div className=${'mpv6-card' + (on ? ' mpv6-on' : '') + (cls ? ' ' + cls : '')}><small>${n}${note ? ' (' + note + ')' : ''}</small><b>${newV}</b>${oldV && oldV !== newV ? html`<s>was ${oldV}</s>` : null}</div>`;
    let body = null;
    if (!r.bad) {
      const rows = [3, 2, 1, 0];
      const segs = ['DS', 'ES', 'SS'];
      body = html`<div><div className="mpv6-two">
        <div><p className="mpv6-mh">Memory from ${r.adr[0]}</p><div className="mpv6-mem">${rows.map(k => html`<div key=${k} className=${k < 2 ? 'mpv6-on' : 'mpv6-sg'}><span>${r.adr[k]}</span><b>${r.by[k]}</b></div>`)}</div></div>
        <div><p className="mpv6-mh">After ${st.ins}</p>
          ${card(st.reg, r.old[st.reg] || '?', r.rv, true, 'offset ← ' + r.by[0] + ', ' + r.by[1])}
          <div style=${{ height: '6px' }}></div>
          ${card(r.seg, r.old[r.seg] || '?', r.sv, true, 'segment ← ' + r.by[2] + ', ' + r.by[3], 'mpv6-sgc')}</div></div>
        <div className="mpv6-res" style=${{ '--n': 3 }}>${segs.filter(x => x !== r.seg).concat(st.ptr === st.reg ? [] : [st.ptr]).map(x => html`<div key=${x}>${card(x, null, r.old[x] || '?', false, 'unchanged')}</div>`)}</div>
        <p className="mpv6-calc">Address = ${r.calc}</p></div>`;
    }
    return html`<figure className="fig mpv6-f"><div className="fig-stage">
      <div className="mpv6-chips"><span className="mpv6-lbl">Examples from the notes</span>${SIM_EX.map(ex => html`<button key=${ex.k} className="mpv6-chip" aria-pressed=${String(st === ex)} onClick=${() => pick(ex)}>${ex.k}</button>`)}</div>
      <div className="mpv6-in"><span className="mpv6-lbl">Try your own</span>
        <select aria-label="Instruction" value=${st.ins} onChange=${e => set('ins', e.target.value)}>${['LDS', 'LES', 'LSS', 'LCS'].map(x => html`<option key=${x} value=${x}>${x}</option>`)}</select>
        <select aria-label="Register" value=${st.reg} onChange=${e => set('reg', e.target.value)}>${SIM_REGS.map(x => html`<option key=${x} value=${x}>${x}</option>`)}</select>
        <select aria-label="Address register" value=${st.ptr} onChange=${e => set('ptr', e.target.value)}>${['DI', 'SI', 'BX'].map(x => html`<option key=${x} value=${x}>[${x}]</option>`)}</select></div>
      <div className="mpv6-in">
        <label>DS <input aria-label="DS in hex" value=${st.ds} onInput=${e => set('ds', e.target.value)} onChange=${e => set('ds', e.target.value)} spellCheck="false" style=${{ width: '64px' }} /></label>
        <label>${st.ptr} <input aria-label="Offset register value in hex" value=${st.pv} onInput=${e => set('pv', e.target.value)} onChange=${e => set('pv', e.target.value)} spellCheck="false" style=${{ width: '64px' }} /></label>
        <label>bytes <input aria-label="Four bytes in hex" value=${st.bytes} onInput=${e => set('bytes', e.target.value)} onChange=${e => set('bytes', e.target.value)} spellCheck="false" style=${{ width: '120px' }} /></label></div>
      <div className="mpv6-code">${r.ins}</div>
      ${r.bad ? html`<p className="mpv6-err">✗ ${st.ins === 'LCS' ? 'No such instruction' : 'Check the inputs'}</p>` : body}</div>
      <${Cap} en=${r.en} ar=${r.ar} showAr=${ar} /></figure>`;
  }

  /* ── 3, 4, 5: the slides' memory figure: DS×10 + DI into the adder, 4 bytes, first word to EBX, second to ES or DS ── */
  const FEX = {
    les: { ins: 'LES BX, [DI]', seg: 'ES', ds: 'A000', di: '200', es: '0200', bxOld: '2C2A', bytes: ['B2', '1A', '00', '3C'], given: 'DS=A000H, SS=2100H, BX=2C2AH, SI=320H, ES=200H, DI=200H' },
    lds: { ins: 'LDS BX, [DI]', seg: 'DS', ds: 'A000', di: '200', es: '0200', bxOld: '2C2A', bytes: ['B2', '1A', '00', '3C'], given: 'DS=A000H, SS=2100H, BX=2C2AH, SI=320H, ES=200H, DI=200H' },
    rev: { ins: 'LDS BX, [DI]', seg: 'DS', ds: '1000', di: '1000', es: null, bxOld: '6F2A', bytes: ['7A', '12', '00', '30'], given: 'DS=1000H, BX=6F2AH, DI=1000H' }};
  function SlideFig({ ex, id, ar }) {
    const b = ex.bytes, dsv = parseInt(ex.ds, 16), A = phys(dsv, parseInt(ex.di, 16)), base = hx(dsv * 16, 5), adr = [0, 1, 2, 3].map(k => hx(A + k, 5));
    const nr = b[1] + b[0], ns = b[3] + b[2], sp = v => v.slice(0, 2) + ' ' + v.slice(2);
    const segStep = ex.seg === 'ES'
      ? { en: `The next two bytes go into ES: ES = ${ns} (the old ${ex.es} is replaced). DS and DI are unchanged.`,
          ar: 'الاتنين bytes اللي بعدهم بيروحوا للـ ES:' + ltr(`[${adr[3]}][${adr[2]}] = ${b[3]}${b[2]} → ES = ${ns}`) + `والـ ES القديم ${bdi(ex.es)} اتشال، والـ DS والـ DI ماتغيروش.` }
      : { en: `The next two bytes go into DS: DS = ${ns} (was ${ex.ds}). DS is changed after it was used to compute the address${ex.es ? '; ES stays ' + ex.es : ''}.`,
          ar: 'الاتنين bytes اللي بعدهم بيروحوا للـ DS:' + ltr(`[${adr[3]}][${adr[2]}] = ${b[3]}${b[2]} → DS = ${ns}`) + `يعني الـ DS اتغيّر (كان ${bdi(ex.ds)}) بعد ما اتستخدم في حساب العنوان` + (ex.es ? `، والـ ES فضل ${bdi(ex.es)}.` : '.') };
    const steps = [
      { en: `Given ${ex.given}, execute <code>${ex.ins}</code>. The four bytes stored from the calculated address are ${b.join(', ')}.`,
        ar: 'المعطى:' + ltr(ex.given) + `والمطلوب ننفّذ ${bdi(ex.ins)}، والـ 4 bytes المتخزنين بادئين من العنوان اللي هيتحسب هما:` + ltr(b.join(', ')) },
      { en: `DS × 10: ${ex.ds} × 10 = ${base}.`, ar: 'نضرب الـ DS في 10:' + ltr(`DS × 10 = ${ex.ds} × 10 = ${base}`) },
      { en: `The adder adds DI: memory address = DS×10 + DI = ${base} + ${ex.di} = ${adr[0]}.`, ar: 'الـ adder بيجمع الـ DI، فالـ memory address بيطلع:' + ltr(`DS×10 + DI = ${base} + ${ex.di} = ${adr[0]}`) },
      { en: `Four bytes are read starting at ${adr[0]}: [${adr[0]}]=${b[0]}, [${adr[1]}]=${b[1]}, [${adr[2]}]=${b[2]}, [${adr[3]}]=${b[3]}.`,
        ar: 'بنقرا 4 bytes بادئين من العنوان ده:' + ltr(`[${adr[0]}]=${b[0]}, [${adr[1]}]=${b[1]}, [${adr[2]}]=${b[2]}, [${adr[3]}]=${b[3]}`) },
      { en: `The first two bytes (lower addresses) go into BX: BX = ${nr} (the old ${ex.bxOld} is replaced).`,
        ar: 'أول اتنين bytes (العناوين الأصغر) بيروحوا للـ BX:' + ltr(`[${adr[1]}][${adr[0]}] = ${b[1]}${b[0]} → BX = ${nr}`) + `والقيمة القديمة ${bdi(ex.bxOld)} اتشالت.` },
      segStep];
    const [i, ctl] = useSteps(steps.length, 2300);
    const my = k => 30 + (3 - k) * 26, mk = `url(#mpv6-ah-${id})`;
    const segBox = (n, y, cur, isTarget) => html`<g>
      <text x="4" y=${y + 19} fontSize="14.5">${n}</text>
      <rect x="40" y=${y} width="100" height="28" className=${'mpv6-cl' + (isTarget && i >= 5 ? ' mpv6-hs' : n === 'DS' && (i === 1) ? ' mpv6-hi' : '')} />
      ${isTarget && i >= 5 ? html`<g><text x="66" y=${y + 19} fontSize="15" fontWeight="700" textAnchor="middle">${ns}</text>
        <text x="114" y=${y + 19} fontSize="14.5" textAnchor="middle" className="mpv6-g">${cur}</text><line x1="96" y1=${y + 15} x2="132" y2=${y + 11} className="mpv6-st" /></g>`
        : html`<text x="90" y=${y + 19} fontSize="15" fontWeight="700" textAnchor="middle">${cur}</text>`}</g>`;
    const tgtY = ex.seg === 'ES' ? 254 : 190;
    return html`<figure className="fig mpv6-f"><div className="fig-stage mpv6-fig">
      <div className="mpv6-code">${ex.ins}</div>
      <svg viewBox=${'0 0 330 ' + (ex.es ? 280 : 236)} role="img" aria-label=${`Figure for ${ex.ins}: DS times 10 plus DI gives ${adr[0]}; bytes ${b.join(', ')}; BX becomes ${nr} and ${ex.seg} becomes ${ns}`}>
        <defs><marker id=${'mpv6-ah-' + id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--fig-k)" /></marker>
          <marker id=${'mpv6-ai-' + id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink)" /></marker></defs>
        <text x="4" y="79" fontSize="14.5">EBX</text>
        <rect x="40" y="60" width="110" height="28" className=${'mpv6-cl' + (i >= 4 ? ' mpv6-hi' : '')} />
        ${i >= 4 ? html`<g><text x="74" y="79" fontSize="15" fontWeight="700" textAnchor="middle">${sp(nr)}</text>
          <text x="124" y="79" fontSize="14.5" textAnchor="middle" className="mpv6-g">${sp(ex.bxOld)}</text><line x1="102" y1="75" x2="146" y2="71" className="mpv6-st" /></g>`
          : html`<text x="122" y="79" fontSize="15" fontWeight="700" textAnchor="middle">${sp(ex.bxOld)}</text>`}
        <text x="4" y="129" fontSize="14.5">EDI</text>
        <rect x="40" y="110" width="110" height="28" className=${'mpv6-cl' + (i === 2 ? ' mpv6-hi' : '')} /><text x="122" y="129" fontSize="15" fontWeight="700" textAnchor="middle">${ex.di}</text>
        ${segBox('DS', 190, ex.ds, ex.seg === 'DS')}
        ${ex.es && segBox('ES', 240, ex.es, ex.seg === 'ES')}
        <g className=${pop(i >= 1)}><path d="M140,204 H185" className="mpv6-ai" markerEnd=${`url(#mpv6-ai-${id})`} />
          <text x="162" y="198" fontSize="14.5" textAnchor="middle">×10</text><text x="162" y="231" fontSize="14.5" textAnchor="middle" fontWeight="700">${base}</text></g>
        <g className=${pop(i >= 2)}><path d="M150,124 H200 V189" className="mpv6-ai" markerEnd=${`url(#mpv6-ai-${id})`} />
          <circle cx="200" cy="204" r="13" className="mpv6-cl" /><text x="200" y="209" fontSize="16" textAnchor="middle" fontWeight="700">+</text>
          <path d="M213,204 H270 V137" className="mpv6-ai" markerEnd=${`url(#mpv6-ai-${id})`} /><text x="276" y="190" fontSize="14.5" fontWeight="700">${adr[0]}</text></g>
        <text x="270" y="22" fontSize="14.5" fontWeight="700" textAnchor="middle">Memory</text>
        ${[3, 2, 1, 0].map(k => html`<g key=${k}><rect x="214" y=${my(k)} width="112" height="26" className=${'mpv6-cl' + (i >= 3 ? (k < 2 ? ' mpv6-hi' : ' mpv6-hs') : '')} />
          <text x="220" y=${my(k) + 18} fontSize="14.5" className="mpv6-g">${adr[k]}</text><text x="306" y=${my(k) + 18} fontSize="15" fontWeight="700" textAnchor="middle">${b[k]}</text></g>`)}
        <g className=${pop(i >= 4)}><path d="M211,84 H207 V132 H211" className="mpv6-ln" /><path d="M206,108 L153,76" className="mpv6-aw" markerEnd=${mk} /></g>
        <g className=${pop(i >= 5)}><path d="M211,32 H207 V80 H211" className="mpv6-ln" /><path d=${ex.seg === 'ES' ? 'M206,56 L143,250' : 'M206,56 L126,187'} className="mpv6-aw" markerEnd=${mk} /></g>
      </svg>
      <p className="mpv6-calc">Memory address = DS×10 + DI<br /><span className=${pop(i >= 2)}>= ${base} + ${ex.di} = ${adr[0]}</span><br /><span className=${pop(i >= 5)}>BX = ${nr}, ${ex.seg} = ${ns}</span></p></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }
  const LesFig = ({ ar }) => html`<${SlideFig} ex=${FEX.les} id="les" ar=${ar} />`;
  const LdsFig = ({ ar }) => html`<${SlideFig} ex=${FEX.lds} id="lds" ar=${ar} />`;
  const RevFig = ({ ar }) => html`<${SlideFig} ex=${FEX.rev} id="rev" ar=${ar} />`;

  /* ── 6: final exams: LSS then POP (2024/25), LES then STOSW (2023/24) ── */
  const CH = [
    { k: 'Final 2024/25 (e)', lines: ['LSS AX, [SI]', 'POP AX'], seg: 'SS', regs: ['DS', 'SS', 'SI', 'SP', 'AX'],
      init: { DS: '2000', SS: '1100', SI: '0300', SP: '0200', AX: '?' }, mB: ['E0', 'F1'], mBn: ['[SP]', '[SP+1]'],
      st: [
        { en: 'Given DS=2000H, SS=1100H, SP=200H, SI=300H and [SI]=CD, [SI+1]=AB, [SI+2]=34, [SI+3]=12. Execute <code>LSS AX, [SI]</code> then <code>POP AX</code>.',
          ar: 'المعطى:' + ltr('DS=2000H, SS=1100H, SP=200H, SI=300H') + ltr('[SI]=CD, [SI+1]=AB, [SI+2]=34, [SI+3]=12') + 'والمطلوب ننفّذ ' + bdi('LSS AX, [SI]') + ' وبعدها ' + bdi('POP AX') + '.' },
        { en: 'LSS AX, [SI]: address = DS×10 + SI = 20000 + 300 = 20300.', ar: 'في الـ ' + bdi('LSS AX, [SI]') + ' العنوان بيطلع:' + ltr('DS×10 + SI = 20000 + 300 = 20300') },
        { en: 'The first two bytes go into AX = ABCD and the next two into SS = 1234 (was 1100).', ar: 'أول اتنين bytes بيروحوا للـ AX، والاتنين اللي بعدهم بيروحوا للـ SS (كان ' + bdi('1100') + '):' + ltr('AX = ABCD, SS = 1234') },
        { en: 'POP AX uses the NEW SS: address = SS×10 + SP = 12340 + 200 = 12540.', ar: 'الـ ' + bdi('POP AX') + ' بتستخدم الـ SS الجديد، فالعنوان بيطلع:' + ltr('SS×10 + SP = 12340 + 200 = 12540') },
        { en: 'Given [SP]=E0 and [SP+1]=F1: AX = [SP+1][SP] = F1E0, and SP = 202.', ar: 'والمعطى إن الـ [SP] فيه E0 والـ [SP+1] فيه F1، فبيطلع:' + ltr('AX = [SP+1][SP] = F1E0, SP = 202') }],
      at: i => ({ cur: i <= 0 ? -1 : i <= 2 ? 0 : 1, mA: i >= 1, mB: i >= 3, mBv: ['E0', 'F1'], addrB: i >= 3,
        R: { DS: ['2000'], SS: i >= 2 ? ['1234', '1100', i === 2] : ['1100'], SI: ['0300'], SP: i >= 4 ? ['0202', '0200', true] : ['0200'], AX: i >= 4 ? ['F1E0', 'ABCD', true] : i >= 2 ? ['ABCD', '?', i === 2] : ['?'] } }) },
    { k: 'Final 2023/24 (e)', lines: ['LES AX, [SI]', 'STOSW'], seg: 'ES', regs: ['DS', 'ES', 'SI', 'DI', 'AX'],
      init: {}, mBn: ['ES:DI', 'ES:DI+1'],
      st: [
        { en: 'Same bytes ([SI]=CD, [SI+1]=AB, [SI+2]=34, [SI+3]=12) with DS=2000H, SI=300H, ES=1100H, DI=200H and D=0. Execute <code>LES AX, [SI]</code> then <code>STOSW</code>.',
          ar: 'نفس الـ bytes مع المعطى ده:' + ltr('DS=2000H, SI=300H, ES=1100H, DI=200H, D=0') + 'والمطلوب ننفّذ ' + bdi('LES AX, [SI]') + ' وبعدها ' + bdi('STOSW') + '.' },
        { en: 'LES AX, [SI]: address = DS×10 + SI = 20000 + 300 = 20300.', ar: 'في الـ ' + bdi('LES AX, [SI]') + ' العنوان بيطلع:' + ltr('DS×10 + SI = 20000 + 300 = 20300') },
        { en: 'The first two bytes go into AX = ABCD and the next two into ES = 1234 (was 1100).', ar: 'أول اتنين bytes بيروحوا للـ AX، والاتنين اللي بعدهم بيروحوا للـ ES (كان ' + bdi('1100') + '):' + ltr('AX = ABCD, ES = 1234') },
        { en: 'STOSW stores AX at ES:DI using the NEW ES: address = ES×10 + DI = 12340 + 200 = 12540.', ar: 'الـ STOSW بتخزّن الـ AX في ' + bdi('ES:DI') + ' بالـ ES الجديد، فالعنوان بيطلع:' + ltr('ES×10 + DI = 12340 + 200 = 12540') },
        { en: '[12540] = CD (AL) and [12541] = AB (AH). With D=0, DI = 202.', ar: 'الـ AL بيتخزن في الأول والـ AH بعده:' + ltr('[12540] = CD (AL), [12541] = AB (AH)') + 'ولأن الـ D بصفر، الـ DI بيبقى ' + bdi('202') + '.' }],
      at: i => ({ cur: i <= 0 ? -1 : i <= 2 ? 0 : 1, mA: i >= 1, mB: i >= 3, mBv: i >= 4 ? ['CD', 'AB'] : ['?', '?'], addrB: i >= 3,
        R: { DS: ['2000'], ES: i >= 2 ? ['1234', '1100', i === 2] : ['1100'], SI: ['0300'], DI: i >= 4 ? ['0202', '0200', true] : ['0200'], AX: i >= 2 ? ['ABCD', '?', i === 2] : ['?'] } }) }];
  function ChainInner({ ex, ar }) {
    const [i, ctl] = useSteps(ex.st.length, 2800), s = ex.at(i);
    const A = [['20300', 'CD'], ['20301', 'AB'], ['20302', '34'], ['20303', '12']];
    return html`<div><div className="fig-stage">
      <div className="mpv6-lines">${ex.lines.map((l, k) => html`<div key=${k} className=${k === s.cur ? 'mpv6-cur' : k < s.cur ? 'mpv6-done' : ''}>${l}</div>`)}</div>
      <div className="mpv6-regs">${ex.regs.map(n => { const [v, o, now] = s.R[n]; return html`<div key=${n} className=${'mpv6-card' + (now ? ' mpv6-on' : '')}><small>${n}</small><b>${v}</b>${o && o !== '?' ? html`<s>was ${o}</s>` : null}</div>`; })}</div>
      <div className="mpv6-two">
        <div className=${s.mA ? '' : 'mpv6-dim'}><p className="mpv6-mh">DS×10 + SI = 20300</p><div className="mpv6-mem">${[3, 2, 1, 0].map(k => html`<div key=${k} className=${s.mA && !s.mB ? (k < 2 ? 'mpv6-on' : 'mpv6-sg') : ''}><span>${A[k][0]}</span><b>${A[k][1]}</b></div>`)}</div></div>
        <div><p className="mpv6-mh">${ex.seg}×10 + ${ex.lines[1] === 'POP AX' ? 'SP' : 'DI'} = ${s.addrB ? '12540' : '?'}</p><div className="mpv6-mem">${[1, 0].map(k => html`<div key=${k} className=${s.mB ? 'mpv6-on' : ''}><span>${s.addrB ? (k ? '12541' : '12540') : ex.mBn[k]}</span><b>${s.mBv[k]}</b></div>`)}</div></div></div></div>
      <${Cap} ...${ex.st[i]} showAr=${ar} /><${Bar} steps=${ex.st} i=${i} ctl=${ctl} /></div>`;
  }
  function FinalChain({ ar }) {
    const [k, setK] = useState(0);
    return html`<figure className="fig mpv6-f"><div className="fig-bar" style=${{ padding: '10px 14px 0', justifyContent: 'center' }}>
      ${CH.map((e, j) => html`<button key=${j} className="fig-btn" aria-pressed=${String(k === j)} onClick=${() => setK(j)}>${e.k}</button>`)}</div>
      <${ChainInner} key=${k} ex=${CH[k]} ar=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'mp-l6-lea-mov': LeaMov, 'mp-l6-offset-lea': OffsetLea, 'mp-l6-lxs-sim': LxsSim, 'mp-l6-les-figure': LesFig, 'mp-l6-lds-figure': LdsFig, 'mp-l6-rev-lds': RevFig, 'mp-l6-final-chain': FinalChain });
})();
/* ── part L7 ── */
// Microprocessors visuals, Lecture 7 (String instructions: LODS, STOS, OUTS, INS): a string-instruction simulator built from the summary table, the four data paths (DS:[SI] sources, ES:[DI] destinations), the direction flag stepping SI, and the slides' five memory-state figures (LODSW, STOSD, OUTSB, INSD, STOSW after LES) step by step. Every label and number comes from the site's notes (slides Lec07_String_Instructions).
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop } = window.FIGKIT;
  const CSS = `
.mpv7 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.mpv7-ins{ text-align:center; font:700 1.05rem var(--mono); color:var(--fig-k); margin:0 0 6px; }
.mpv7-giv{ display:flex; flex-wrap:wrap; gap:4px 6px; justify-content:center; margin:0 auto 10px; max-width:440px; }
.mpv7-giv span{ font:600 .8rem var(--mono); padding:2px 7px; border-radius:99px; border:1px solid var(--line); background:var(--paper); color:var(--ink); transition:opacity .4s; white-space:nowrap; }
.mpv7-giv span.mpv7-x{ opacity:.5; text-decoration:line-through; }
.mpv7-ex{ display:flex; gap:12px; justify-content:center; align-items:flex-start; flex-wrap:wrap; }
.mpv7-cpu{ display:grid; gap:5px; }
.mpv7-rg{ display:grid; grid-template-columns:38px auto; align-items:center; gap:4px; }
.mpv7-rg > span{ font:700 .8rem var(--mono); color:var(--graphite); }
.mpv7-bytes{ display:grid; justify-self:start; grid-template-columns:repeat(4, 27px); border:1px solid var(--ink); border-radius:4px; overflow:hidden; background:var(--paper); }
.mpv7-bytes i{ font:700 .82rem/26px var(--mono); font-style:normal; text-align:center; color:var(--ink); height:26px; border-left:1px solid var(--line); transition:background .4s; }
.mpv7-bytes i:first-child{ border-left:0; } .mpv7-bytes i:nth-child(3){ border-left:1.5px solid var(--ink); }
.mpv7-on{ background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)) !important; }
.mpv7-box{ border:1px solid var(--ink); border-radius:4px; background:var(--paper); font:700 .85rem/26px var(--mono); padding:0 8px; color:var(--ink); justify-self:start; white-space:nowrap; transition:background .4s; }
.mpv7-box s{ color:var(--graphite); font-weight:500; margin-right:8px; } .mpv7-box em{ font-style:normal; color:var(--fig-k); }
.mpv7-sn{ grid-column:2; font-size:.78rem; color:var(--graphite); margin-top:-3px; }
.mpv7-add{ border:1px dashed var(--fig-k); border-radius:8px; padding:4px 8px; text-align:center; font:600 .82rem/1.4 var(--mono); color:var(--ink); margin-top:4px; background:var(--paper); }
.mpv7-add small{ display:block; color:var(--graphite); font-size:.78rem; }
.mpv7-mem{ display:grid; }
.mpv7-mem > small{ font-size:.78rem; color:var(--graphite); text-align:center; margin-bottom:3px; max-width:110px; justify-self:end; line-height:1.25; }
.mpv7-mr{ display:grid; grid-template-columns:54px 46px; align-items:center; }
.mpv7-ma{ font:600 .78rem var(--mono); color:var(--graphite); text-align:right; padding-right:5px; white-space:nowrap; }
.mpv7-ma.mpv7-pt{ color:var(--fig-k); font-weight:700; }
.mpv7-mc{ font:700 .85rem/26px var(--mono); text-align:center; height:26px; border:1px solid var(--ink); border-top-width:0; background:var(--paper); color:var(--ink); transition:background .4s; }
.mpv7-mem > small + .mpv7-mr .mpv7-mc{ border-top-width:1px; }
.mpv7-dev{ display:flex; gap:8px; align-items:center; justify-content:center; flex-wrap:wrap; margin:10px auto 0; font-size:.84rem; color:var(--ink); }
.mpv7-dev > b{ border:2px solid var(--fig-k); border-radius:8px; padding:3px 9px; background:var(--paper); }
.mpv7-dev span{ display:inline-flex; gap:4px; } .mpv7-dev i{ font:700 .85rem/24px var(--mono); font-style:normal; padding:0 5px; border:1px solid var(--line); border-radius:4px; background:var(--paper); }
.mpv7-xf{ text-align:center; font:600 .84rem/1.45 var(--mono); color:var(--fig-k); margin:8px auto 0; overflow-wrap:anywhere; max-width:420px; }
.mpv7-flow svg{ display:block; max-width:420px; margin:0 auto; }
.mpv7-flow .mpv7-bx{ fill:var(--paper); stroke:var(--ink); stroke-width:1.4; transition:fill .4s; } .mpv7-flow .mpv7-bx.mpv7-hb{ fill:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); stroke:var(--fig-k); stroke-width:2.2; }
.mpv7-flow text{ fill:var(--ink); } .mpv7-flow .mpv7-sub{ fill:var(--graphite); }
.mpv7-flow .mpv7-ar{ stroke:var(--faint); stroke-width:2; fill:none; stroke-dasharray:5 4; transition:stroke .4s; } .mpv7-flow .mpv7-ar.mpv7-ha{ stroke:var(--fig-k); stroke-width:3; stroke-dasharray:none; }
.mpv7-flow .mpv7-al{ font-weight:700; fill:var(--graphite); } .mpv7-flow .mpv7-al.mpv7-ha{ fill:var(--fig-k); }
.mpv7-flow #mpv7-hd path{ fill:var(--fig-k); } .mpv7-flow #mpv7-hdf path{ fill:var(--faint); }
.mpv7-prog{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin:0 auto 10px; }
.mpv7-prog span{ font:700 .82rem var(--mono); padding:3px 8px; border-radius:7px; border:1px solid var(--line); background:var(--paper); color:var(--ink); transition:background .3s, opacity .3s; }
.mpv7-prog span.mpv7-done{ opacity:.55; } .mpv7-prog span.mpv7-cur{ background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); border-color:var(--fig-k); opacity:1; }
.mpv7-strip{ display:grid; grid-template-columns:repeat(4, minmax(0, 58px)); justify-content:center; margin:0 auto; }
.mpv7-strip > div{ text-align:center; }
.mpv7-strip b{ display:block; font:700 .9rem/30px var(--mono); height:30px; border:1px solid var(--ink); border-left-width:0; background:var(--paper); color:var(--ink); transition:background .4s; }
.mpv7-strip > div:first-child b{ border-left-width:1px; }
.mpv7-strip small{ display:block; font:600 .78rem var(--mono); color:var(--graphite); margin-top:2px; }
.mpv7-strip u{ display:block; text-decoration:none; font:700 .8rem var(--mono); color:var(--fig-k); height:20px; }
.mpv7-st{ display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin:10px auto 0; }
.mpv7-st div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:4px 10px; text-align:center; min-width:58px; transition:box-shadow .4s; }
.mpv7-st div.mpv7-chg{ box-shadow:0 0 0 2px var(--fig-k); }
.mpv7-st small{ display:block; font-size:.78rem; color:var(--graphite); } .mpv7-st b{ font:700 .95rem var(--mono); color:var(--ink); }
.mpv7-in{ display:flex; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap; margin:0 0 8px; font-size:.84rem; color:var(--ink); }
.mpv7-in label{ display:inline-flex; gap:4px; align-items:center; font:700 .8rem var(--mono); color:var(--graphite); }
.mpv7-in input, .mpv7-in select{ font:600 .9rem var(--mono); padding:4px 7px; border:1px solid var(--line); border-radius:7px; background:var(--paper); color:var(--ink); min-width:0; box-sizing:border-box; max-width:100%; }
.mpv7-in input:focus, .mpv7-in select:focus{ outline:2px solid var(--fig-k); outline-offset:1px; }
.mpv7-lbl{ font-size:.8rem; color:var(--graphite); width:100%; text-align:center; }
.mpv7-opl{ text-align:center; font:700 .9rem var(--mono); color:var(--ink); margin:2px 0 8px; }
.mpv7-big{ display:flex; justify-content:center; margin:0 auto; }
.mpv7-big > div{ border:2px solid var(--fig-k); border-radius:8px; background:var(--paper); padding:3px 10px; text-align:center; }
.mpv7-big small{ display:block; font-size:.78rem; color:var(--graphite); } .mpv7-big b{ font:700 1rem var(--mono); color:var(--ink); }
.mpv7-dn{ text-align:center; font-size:1.3rem; line-height:1.2; color:var(--fig-k); font-weight:700; margin:2px 0; }
.mpv7-rows{ max-width:430px; margin:10px auto 0; display:grid; gap:4px; font:600 .82rem/1.4 var(--mono); color:var(--ink); }
.mpv7-rows div{ border-left:3px solid var(--fig-k); padding:2px 8px; background:var(--paper); border-radius:0 6px 6px 0; overflow-wrap:anywhere; }
.mpv7-rows div small{ display:block; font:600 .76rem var(--body); color:var(--graphite); }
.mpv7-err{ text-align:center; color:var(--pen); font-size:.86rem; margin:6px 0 0; }`;
  if (!document.getElementById('mpv7-css')) { const s = document.createElement('style'); s.id = 'mpv7-css'; s.textContent = CSS; document.head.appendChild(s); }

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const bdi = s => `<bdi dir="ltr">${esc(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const ltr = s => `<span class="ltr">${esc(s)}</span>`;
  // hex the way the notes write it: no padding, a leading 0 when it would start with a letter (0FC)
  const H = v => { const s = v.toString(16).toUpperCase(); return /^[A-F]/.test(s) ? '0' + s : s; };
  const B2 = v => v.toString(16).toUpperCase().padStart(2, '0');

  /* ── 1.0: the four data paths ── */
  function Flow({ ar }) {
    const steps = [
      { on: [0, 1, 2, 3], bx: [], en: 'Four string instructions move data between memory, the accumulator (AL, AX or EAX) and I/O devices. Each one moves a byte (B), a word (W, 2 bytes) or a double word (D, 4 bytes).',
        ar: 'عندنا 4 string instructions بينقلوا داتا بين الـ memory والـ accumulator (AL أو AX أو EAX) والـ input والـ output devices. وكل واحدة بتنقل byte (B) أو word (W يعني 2 bytes) أو double word (D يعني 4 bytes).' },
      { on: [0], bx: ['src', 'reg'], en: '<b>LODS</b> loads AL, AX or EAX from the source string at <code>DS:[SI]</code>; then SI moves by 1, 2 or 4.',
        ar: 'الـ <b>LODS</b> بتحمّل الـ AL أو الـ AX أو الـ EAX من الـ source string اللي عند ' + bdi('DS:[SI]') + '، وبعدها الـ SI بيتحرك بـ 1 أو 2 أو 4.' },
      { on: [1], bx: ['reg', 'dst'], en: '<b>STOS</b> stores AL, AX or EAX at the destination <code>ES:[DI]</code>; then DI moves by 1, 2 or 4.',
        ar: 'الـ <b>STOS</b> بتخزن الـ AL أو الـ AX أو الـ EAX في الـ destination اللي عند ' + bdi('ES:[DI]') + '، وبعدها الـ DI بيتحرك بـ 1 أو 2 أو 4.' },
      { on: [2], bx: ['src', 'out'], en: '<b>OUTS</b> sends data stored at <code>DS:[SI]</code> to an output device; SI moves.',
        ar: 'الـ <b>OUTS</b> بتبعت الداتا اللي عند ' + bdi('DS:[SI]') + ' للـ output device، والـ SI بيتحرك.' },
      { on: [3], bx: ['in', 'dst'], en: '<b>INS</b> takes data from an input device into memory at <code>ES:[DI]</code>; DI moves.',
        ar: 'الـ <b>INS</b> بتاخد داتا من الـ input device وتحطها في الـ memory عند ' + bdi('ES:[DI]') + '، والـ DI بيتحرك.' },
      { on: [0, 1, 2, 3], bx: ['src', 'dst'], en: 'The rule: source strings are read from <b>DS:[SI]</b> (LODS, OUTS); destination strings are written to <b>ES:[DI]</b> (STOS, INS).',
        ar: 'القاعدة: الـ strings الـ source بتتقري من ' + bdi('DS:[SI]') + ' (LODS و OUTS). والـ strings الـ destination بتتكتب في ' + bdi('ES:[DI]') + ' (STOS و INS).' }
    ];
    const [i, ctl] = useSteps(steps.length, 2700), s = steps[i];
    const box = (k, x, y, w, h, t1, t2) => html`<g key=${k}><rect className=${'mpv7-bx' + (s.bx.includes(k) ? ' mpv7-hb' : '')} x=${x} y=${y} width=${w} height=${h} rx="7" />
      <text x=${x + w / 2} y=${t2 ? y + 20 : y + h / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fontFamily=${t1.includes(':') || t1.includes('/') ? 'var(--mono)' : 'inherit'}>${t1}</text>
      ${t2 && html`<text className="mpv7-sub" x=${x + w / 2} y=${y + 38} textAnchor="middle" fontSize="13">${t2}</text>`}</g>`;
    const A = [['M90 196 L124 152', 'LODS', 84, 170, 'end'], ['M176 152 L210 196', 'STOS', 216, 170, 'start'], ['M32 196 V56', 'OUTS', 38, 118, 'start'], ['M268 50 V190', 'INS', 262, 118, 'end']];
    return html`<figure className="fig mpv7 mpv7-flow"><div className="fig-stage">
      <svg viewBox="0 0 300 250" role="img" aria-label="LODS and OUTS read DS:[SI], STOS and INS write ES:[DI]">
        <defs><marker id="mpv7-hd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" /></marker>
          <marker id="mpv7-hdf" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" /></marker></defs>
        ${box('out', 6, 8, 130, 44, 'Output device')}
        ${box('in', 164, 8, 130, 44, 'Input device')}
        ${box('reg', 92, 106, 116, 44, 'AL/AX/EAX')}
        ${box('src', 6, 196, 130, 48, 'DS:[SI]', 'source')}
        ${box('dst', 164, 196, 130, 48, 'ES:[DI]', 'destination')}
        ${A.map(([d, l, x, y, an], k) => { const on = s.on.includes(k); return html`<g key=${l}>
          <path className=${'mpv7-ar' + (on ? ' mpv7-ha' : '')} d=${d} markerEnd=${on ? 'url(#mpv7-hd)' : 'url(#mpv7-hdf)'} />
          <text className=${'mpv7-al' + (on ? ' mpv7-ha' : '')} x=${x} y=${y} textAnchor=${an} fontSize="14" fontFamily="var(--mono)">${l}</text></g>`; })}
      </svg></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 1.1-1.2: D decides the direction; LODS uses D but never changes it ── */
  function DFlag({ ar }) {
    const PROG = ['CLD', 'LODSB', 'STD', 'LODSB', 'LODSB', 'LODSB'];
    const CELLS = [['0FFE', ''], ['0FFF', '00'], ['1000', 'AB'], ['1001', 'CD']];
    const steps = [
      { d: 0, si: 2, al: '', rd: -1, chg: 'D',
        en: '<code>CLD</code> clears D: <b>D = 0</b>, positive direction. SI = 1000 points at AB (the bytes of the LODSW example: [SI−1] = 00, [SI] = AB, [SI+1] = CD).',
        ar: 'الـ ' + bdi('CLD') + ' بتصفّر الـ D، يعني <b>' + bdi('D = 0') + '</b> والاتجاه positive. والـ SI قيمته ' + bdi('1000') + ' وبيشاور على AB (نفس bytes مثال الـ LODSW):' + ltr('[SI−1] = 00, [SI] = AB, [SI+1] = CD') },
      { d: 0, si: 3, al: 'AB', rd: 2, chg: 'SI',
        en: '<code>LODSB</code>: AL = [1000] = AB. D = 0, so SI = 1000 + 1 = 1001. D is not changed and no flag is affected.',
        ar: 'الـ LODSB بتحط الـ byte في الـ AL، وعشان ' + bdi('D = 0') + ' الـ SI بيزيد بواحد:' + ltr('AL = [1000] = AB, SI = 1000 + 1 = 1001') + 'والـ D نفسه ماتغيّرش، ومفيش flag اتأثر.' },
      { d: 1, si: 3, al: 'AB', rd: -1, chg: 'D',
        en: '<code>STD</code> sets <b>D = 1</b>: negative direction. Only CLD and STD change D; SI stays 1001.',
        ar: 'الـ ' + bdi('STD') + ' بتخلي <b>' + bdi('D = 1') + '</b> والاتجاه بقى negative. الـ CLD والـ STD بس هما اللي بيغيّروا الـ D، والـ SI لسه ' + bdi('1001') + '.' },
      { d: 1, si: 2, al: 'CD', rd: 3, chg: 'SI',
        en: '<code>LODSB</code> again: AL = [1001] = CD. Now D = 1, so SI = 1001 − 1 = 1000.',
        ar: 'الـ LODSB تاني، بس دلوقتي ' + bdi('D = 1') + ' فالـ SI بيقل بواحد:' + ltr('AL = [1001] = CD, SI = 1001 − 1 = 1000') },
      { d: 1, si: 1, al: 'AB', rd: 2, chg: 'SI',
        en: '<code>LODSB</code>: AL = [1000] = AB, SI = 1000 − 1 = 0FFF.',
        ar: 'وكمان LODSB، والـ SI بيرجع لورا:' + ltr('AL = [1000] = AB, SI = 1000 − 1 = 0FFF') },
      { d: 1, si: 0, al: '00', rd: 1, chg: 'SI',
        en: '<code>LODSB</code>: AL = [0FFF] = 00, SI = 0FFE. The string is read backwards; D is still 1, because string instructions use D but never change it.',
        ar: 'وآخر LODSB، والـ string بيتقري بالعكس byte ورا byte:' + ltr('AL = [0FFF] = 00, SI = 0FFF − 1 = 0FFE') + 'والـ D لسه قيمته واحد، لأن الـ string instructions بتستخدم الـ D بس عمرها ما بتغيّره.' }
    ];
    const [i, ctl] = useSteps(steps.length, 2600), s = steps[i];
    return html`<figure className="fig mpv7"><div className="fig-stage">
      <div className="mpv7-prog">${PROG.map((p, k) => html`<span key=${k} className=${k === i ? 'mpv7-cur' : k < i ? 'mpv7-done' : ''}>${p}</span>`)}</div>
      <div className="mpv7-strip" aria-label="Memory at DS:0FFE to DS:1001">${CELLS.map(([a, v], k) => html`<div key=${a}>
        <b className=${k === s.rd ? 'mpv7-on' : ''}>${v || '·'}</b><small>${a}</small><u>${k === s.si ? '▲ SI' : ''}</u></div>`)}</div>
      <div className="mpv7-st">
        <div className=${s.chg === 'D' ? 'mpv7-chg' : ''}><small>D</small><b>${s.d} ${s.d ? '←' : '→'}</b></div>
        <div className=${s.chg === 'SI' ? 'mpv7-chg' : ''}><small>SI</small><b>${CELLS[s.si][0]}</b></div>
        <div className=${s.rd >= 0 ? 'mpv7-chg' : ''}><small>AL</small><b>${s.al || '··'}</b></div></div></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── 2-6: the slides' memory-state figures, phase by phase ── */
  // ph: 0 givens, 1 address (segment × 10 + offset), 2 data moved, 3 pointer updated, 4 real byte order
  function ExFig({ ar, c }) {
    const [i, ctl] = useSteps(c.steps.length, 2900), s = c.steps[i], ph = s.ph;
    const mem = ph >= 4 && c.mem2 ? c.mem2 : c.mem;
    return html`<figure className="fig mpv7"><div className="fig-stage">
      <div className="mpv7-ins">${c.ins}</div>
      <div className="mpv7-giv">${c.giv.map(([t, used]) => html`<span key=${t} className=${!used && ph >= 1 ? 'mpv7-x' : ''}>${t}</span>`)}</div>
      <div className="mpv7-ex">
        <div className="mpv7-cpu">
          <div className="mpv7-rg"><span>EAX</span><div className="mpv7-bytes">${c.eax.map((v, k) => html`<i key=${k} className=${v && ph === 2 && c.hiEax.includes(k) ? 'mpv7-on' : ''}>${v && (c.eaxAt <= ph) ? v : ''}</i>`)}</div></div>
          <div className="mpv7-rg"><span>${c.pn}</span><div className=${'mpv7-box' + (ph === 3 ? ' mpv7-on' : '')}>${ph >= 3 ? html`<s>${c.p0}</s><em>${c.p1}</em>` : c.p0}</div>
            ${ph >= 3 && c.pnote && html`<div className="mpv7-sn">${c.pnote}</div>`}</div>
          <div className="mpv7-rg"><span>${c.sn}</span><div className="mpv7-box">${c.sv}</div></div>
          <div className=${'mpv7-add ' + pop(ph >= 1)}><small>${c.sn} × 10 + ${c.pn.slice(1)}</small>${c.calc}</div>
        </div>
        <div className="mpv7-mem"><small>${ph >= 4 && c.mem2 ? 'real 8086 (little-endian)' : 'memory' + (c.mem2 ? ' (as on the slide)' : '')}</small>
          ${mem.map(([a, v, hit, pt], k) => html`<div key=${k + a} className="mpv7-mr"><span className=${'mpv7-ma' + (pt && ph >= 1 ? ' mpv7-pt' : '')}>${a}${pt && ph >= 1 ? ' ▸' : ''}</span>
            <b className=${'mpv7-mc' + (hit && ph >= 2 ? ' mpv7-on' : '')}>${c.dst && ph < 2 ? '' : v}</b></div>`)}</div>
      </div>
      ${c.dev && html`<div className=${'mpv7-dev ' + pop(c.dev.inp || ph >= 2)}><b>${c.dev.lab}</b><span>${c.dev.v.map(v => html`<i key=${v} className=${ph === 2 ? 'mpv7-on' : ''}>${v}</i>`)}</span></div>`}
      <div className=${'mpv7-xf ' + pop(ph >= 2)}>${c.xf}</div></div>
      <${Cap} ...${s} showAr=${ar} /><${Bar} steps=${c.steps} i=${i} ctl=${ctl} /></figure>`;
  }
  const addrEn = (sg, pt, calc) => `Memory location = ${sg} × 10 + ${pt} = ${calc}.`;
  const addrAr = (sg, pt, calc) => `الـ memory location بيتحسب من الـ ${sg} والـ ${pt}:` + ltr(`${sg} × 10 + ${pt} = ${calc}`);
  const diEn = 'D = 1, so DI moves back by 4. The slide writes <b>96</b> (it subtracted in decimal); in hex 100H − 4 = 00FCH, so write <b>DI = 0FCH</b> (and mention 96 if you follow the slide).';
  const diAr = 'وعشان ' + bdi('D = 1') + ' الـ DI بيقل بـ 4. الـ slide كاتبة 96 (طرحت بالـ decimal)، لكن بالـ hex الصح:' + ltr('DI = 100H − 4 = 00FCH') + 'يعني اكتب <b>' + bdi('DI = 0FCH') + '</b> (واذكر الـ 96 لو ماشي على الـ slide).';
  const SLIDE4 = [['2100', 'AB', 1, 1], ['', 'CD', 1], ['', '12', 1], ['', '34', 1], ['2096', '']];
  const EX = {
    lodsw: { ins: 'LODSW', giv: [['DS = 1000', 1], ['SI = 1000', 1], ['D = 0', 1], ['SS = 200', 0], ['[SI] = AB', 1], ['[SI+1] = CD', 1], ['[SI−1] = 00', 0]],
      eax: ['', '', 'CD', 'AB'], eaxAt: 2, hiEax: [2, 3], pn: 'ESI', p0: '1000', p1: '1002', sn: 'DS', sv: '1000', calc: '10000 + 1000 = 11000',
      mem: [['11002', ''], ['11001', 'CD', 1], ['11000', 'AB', 1, 1], ['10FFF', '00']], xf: 'AL = AB, AH = CD → AX = CDAB',
      steps: [
        { ph: 0, en: 'LODSW with DS = 1000, SI = 1000, D = 0, [SI] = AB, [SI+1] = CD. SS = 200 and [SI−1] = 00 are distractors: LODS never uses them.',
          ar: 'في الـ LODSW المعطيات هي:' + ltr('DS = 1000, SI = 1000, D = 0, [SI] = AB, [SI+1] = CD') + 'أما ' + bdi('SS = 200') + ' و ' + bdi('[SI−1] = 00') + ' فدول distractors، لأن الـ LODS مابتستخدمهمش.' },
        { ph: 1, en: addrEn('DS', 'SI', '10000 + 1000 = 11000'), ar: addrAr('DS', 'SI', '10000 + 1000 = 11000') },
        { ph: 2, en: 'A word is 2 bytes: AL = [11000] = AB, AH = [11001] = CD, so <b>AX = CDAB</b> (the byte at the lower address goes to AL).',
          ar: 'الـ word عبارة عن 2 bytes، والـ byte اللي في العنوان الأصغر بيروح للـ AL:' + ltr('AL = [11000] = AB, AH = [11001] = CD → AX = CDAB') },
        { ph: 3, en: 'D = 0, so SI moves forward by 2: <b>SI = 1000 + 2 = 1002</b> (the slide crosses out 1000). The next LODSW would read from 11002.',
          ar: 'وعشان ' + bdi('D = 0') + ' الـ SI بيزيد بحجم الـ word:' + ltr('SI = 1000 + 2 = 1002') + 'والـ LODSW اللي بعدها هتقرا من العنوان ' + bdi('11002') + '.' }
      ] },
    stosd: { ins: 'STOSD', giv: [['DS = 1000', 0], ['DI = 100', 1], ['D = 1', 1], ['ES = 200', 1], ['EAX = ABCD1234', 1]],
      eax: ['AB', 'CD', '12', '34'], eaxAt: 0, hiEax: [0, 1, 2, 3], pn: 'EDI', p0: '100', p1: '0FC', pnote: 'slide: 96', sn: 'ES', sv: '200', calc: '2000 + 100 = 2100', dst: 1,
      mem: SLIDE4, mem2: [['2104', ''], ['2103', 'AB', 1], ['2102', 'CD', 1], ['2101', '12', 1], ['2100', '34', 1, 1]], xf: 'EAX (4 bytes) → ES:[DI] = 2100',
      steps: [
        { ph: 0, en: 'STOSD with ES = 200, DI = 100, D = 1, EAX = ABCD1234. DS = 1000 is a distractor: STOS always writes to ES:[DI].',
          ar: 'في الـ STOSD المعطيات هي:' + ltr('ES = 200, DI = 100, D = 1, EAX = ABCD1234') + 'أما ' + bdi('DS = 1000') + ' فده distractor، لأن الـ STOS دايمًا بتكتب في ' + bdi('ES:[DI]') + '.' },
        { ph: 1, en: addrEn('ES', 'DI', '2000 + 100 = 2100'), ar: addrAr('ES', 'DI', '2000 + 100 = 2100') },
        { ph: 2, en: 'The 4 bytes of EAX are stored starting at 2100. The slide draws them as AB, CD, 12, 34 going down from 2100 towards 2096.',
          ar: 'الـ 4 bytes بتوع الـ EAX بيتخزنوا من أول العنوان ' + bdi('2100') + '. والـ slide راسماهم من ' + bdi('2100') + ' ونازل ناحية ' + bdi('2096') + ' بالترتيب ده:' + ltr('AB, CD, 12, 34') },
        { ph: 3, en: diEn, ar: diAr },
        { ph: 4, en: 'On a real 8086, STOSD writes EAX little-endian at 2100..2103: [2100] = 34, [2101] = 12, [2102] = CD, [2103] = AB.',
          ar: 'على الـ 8086 الحقيقي الـ STOSD بتكتب الـ EAX بالـ little-endian، يعني الـ byte الصغير في العنوان الأصغر:' + ltr('[2100] = 34, [2101] = 12, [2102] = CD, [2103] = AB') }
      ] },
    outsb: { ins: 'OUTSB', giv: [['DS = 1000', 1], ['SI = 1000', 1], ['D = 0', 1], ['[SI] = AB', 1], ['[SI+1] = CD', 0]],
      eax: ['', '', '', ''], eaxAt: 9, hiEax: [], pn: 'ESI', p0: '1000', p1: '1001', sn: 'DS', sv: '1000', calc: '10000 + 1000 = 11000',
      mem: [['11001', 'CD'], ['11000', 'AB', 1, 1]], dev: { lab: 'Output device', v: ['AB'] }, xf: '[11000] = AB → output device',
      steps: [
        { ph: 0, en: 'OUTSB with DS = 1000, SI = 1000, D = 0, [SI] = AB, [SI+1] = CD.',
          ar: 'في الـ OUTSB المعطيات هي:' + ltr('DS = 1000, SI = 1000, D = 0, [SI] = AB, [SI+1] = CD') },
        { ph: 1, en: addrEn('DS', 'SI', '10000 + 1000 = 11000'), ar: addrAr('DS', 'SI', '10000 + 1000 = 11000') },
        { ph: 2, en: 'OUTSB sends <b>one byte</b>, AB, from DS:[SI] to the output device. No register is loaded: EAX stays empty.',
          ar: 'الـ OUTSB بتبعت <b>byte واحد</b> بس وهو AB من ' + bdi('DS:[SI]') + ' للـ output device. ومفيش register بيتحمّل، والـ EAX بيفضل فاضي.' },
        { ph: 3, en: 'D = 0 and one byte was sent, so <b>SI = 1000 + 1 = 1001</b>.',
          ar: 'وعشان ' + bdi('D = 0') + ' والمبعوت byte واحد، الـ SI بيزيد بواحد:' + ltr('SI = 1000 + 1 = 1001') }
      ] },
    insd: { ins: 'INSD', giv: [['DS = 1000', 0], ['DI = 100', 1], ['D = 1', 1], ['ES = 200', 1], ['input = ABCD1234', 1]],
      eax: ['', '', '', ''], eaxAt: 9, hiEax: [], pn: 'EDI', p0: '100', p1: '0FC', pnote: 'slide: 96', sn: 'ES', sv: '200', calc: '2000 + 100 = 2100', dst: 1,
      mem: SLIDE4, dev: { lab: 'Input device', v: ['AB', 'CD', '12', '34'], inp: 1 }, xf: 'input device → ES:[DI] = 2100',
      steps: [
        { ph: 0, en: 'INSD with DS = 1000, DI = 100, D = 1, ES = 200, input string ABCD1234. DS is <b>not</b> used: INS always writes to ES:[DI].',
          ar: 'في الـ INSD المعطيات هي:' + ltr('DS = 1000, DI = 100, D = 1, ES = 200') + 'والـ input string هو ' + bdi('ABCD1234') + '. والـ DS هنا <b>مش</b> مستخدم، لأن الـ INS دايمًا بتكتب في ' + bdi('ES:[DI]') + '.' },
        { ph: 1, en: addrEn('ES', 'DI', '2000 + 100 = 2100'), ar: addrAr('ES', 'DI', '2000 + 100 = 2100') },
        { ph: 2, en: 'The 4 bytes AB, CD, 12, 34 come from the input device and are stored starting at 2100 (as drawn in the lecture).',
          ar: 'الـ 4 bytes جايين من الـ input device وبيتخزنوا من أول العنوان ' + bdi('2100') + ' زي ما المحاضرة راسماهم:' + ltr('AB, CD, 12, 34') },
        { ph: 3, en: diEn + ' This one is asked in almost every final.', ar: diAr + ' والسؤال ده بييجي تقريبًا في كل final.' }
      ] },
    les: { ins: 'STOSW', giv: [['AX = ABCD', 1], ['ES = 1234', 1], ['DI = 200H', 1], ['D = 0', 1]],
      eax: ['', '', 'AB', 'CD'], eaxAt: 0, hiEax: [2, 3], pn: 'EDI', p0: '200', p1: '202', sn: 'ES', sv: '1234', calc: '12340 + 200 = 12540', dst: 1,
      mem: [['12542', ''], ['12541', 'AB', 1], ['12540', 'CD', 1, 1]], xf: 'AL = CD → [12540], AH = AB → [12541]',
      steps: [
        { ph: 0, en: 'After <code>LES AX,[SI]</code>: AX = ABCD and ES = 1234. With DI = 200H and D = 0, run STOSW (Final 2023/24).',
          ar: 'بعد الـ ' + bdi('LES AX,[SI]') + ' بقى عندنا:' + ltr('AX = ABCD, ES = 1234, DI = 200H, D = 0') + 'ودلوقتي هننفذ الـ STOSW (سؤال Final ' + bdi('2023/24') + ').' },
        { ph: 1, en: addrEn('ES', 'DI', '12340 + 200 = 12540'), ar: addrAr('ES', 'DI', '12340 + 200 = 12540') },
        { ph: 2, en: 'The word is stored low byte first: <b>[12540] = CD</b> (AL), <b>[12541] = AB</b> (AH).',
          ar: 'الـ word بيتخزن والـ byte الصغير الأول:' + ltr('[12540] = CD (AL), [12541] = AB (AH)') },
        { ph: 3, en: 'D = 0, so <b>DI = 200 + 2 = 202</b>.',
          ar: 'وعشان ' + bdi('D = 0') + ' الـ DI بيزيد بحجم الـ word:' + ltr('DI = 200 + 2 = 202') }
      ] }
  };
  const Lodsw = ({ ar }) => html`<${ExFig} ar=${ar} c=${EX.lodsw} />`;
  const Stosd = ({ ar }) => html`<${ExFig} ar=${ar} c=${EX.stosd} />`;
  const Outsb = ({ ar }) => html`<${ExFig} ar=${ar} c=${EX.outsb} />`;
  const Insd = ({ ar }) => html`<${ExFig} ar=${ar} c=${EX.insd} />`;
  const LesStosw = ({ ar }) => html`<${ExFig} ar=${ar} c=${EX.les} />`;

  /* ── 0: the summary table as a simulator ── */
  const PRESETS = [
    ['LODSW (example)', { op: 'LODS', sz: 'W', d: 0, ds: '1000', si: '1000', mem: 'AB CD' }],
    ['STOSD (example)', { op: 'STOS', sz: 'D', d: 1, es: '200', di: '100', eax: 'ABCD1234' }],
    ['OUTSB (example)', { op: 'OUTS', sz: 'B', d: 0, ds: '1000', si: '1000', mem: 'AB CD' }],
    ['INSD (example)', { op: 'INS', sz: 'D', d: 1, es: '200', di: '100', inp: 'AB CD 12 34' }],
    ['STOSW after LES', { op: 'STOS', sz: 'W', d: 0, es: '1234', di: '200', eax: 'ABCD' }]
  ];
  const INIT = { op: 'LODS', sz: 'W', d: 0, ds: '1000', si: '1000', es: '200', di: '100', eax: 'ABCD1234', mem: 'AB CD', inp: 'AB CD 12 34' };
  const N = { B: 1, W: 2, D: 4 }, REG = { B: 'AL', W: 'AX', D: 'EAX' }, NAR = { 1: 'byte واحد', 2: '2 bytes', 4: '4 bytes' };
  function Sim({ ar }) {
    const [st, setSt] = useState(INIT), [pre, setPre] = useState('');
    const set = (k, v) => { setPre(''); setSt(o => Object.assign({}, o, { [k]: v })); };
    const { op, sz, d } = st, n = N[sz], reg = REG[sz], name = op + sz, src = op === 'LODS' || op === 'OUTS';
    const sn = src ? 'DS' : 'ES', pn = src ? 'SI' : 'DI', sT = (src ? st.ds : st.es).trim(), pT = (src ? st.si : st.di).trim();
    const hx4 = /^[0-9A-F]{1,4}$/i;
    let err = null, r = null;
    const bytesOf = t => t.trim().split(/[\s,]+/).filter(Boolean);
    if (!hx4.test(sT) || !hx4.test(pT)) err = { en: `Enter ${sn} and ${pn} in hex, up to 4 digits.`, ar: `اكتب الـ ${sn} والـ ${pn} بالـ hex، لحد 4 digits.` };
    else {
      const S = parseInt(sT, 16), P = parseInt(pT, 16), base = S * 16, A = base + P;
      let bytes = null;
      if (op === 'STOS') {
        if (!/^[0-9A-F]{1,8}$/i.test(st.eax.trim())) err = { en: 'Enter EAX in hex, up to 8 digits.', ar: 'اكتب الـ EAX بالـ hex، لحد 8 digits.' };
        else { const v = parseInt(st.eax.trim(), 16); bytes = Array.from({ length: n }, (_, k) => Math.floor(v / 256 ** k) % 256); }
      } else {
        const t = bytesOf(op === 'INS' ? st.inp : st.mem);
        if (!t.every(b => /^[0-9A-F]{1,2}$/i.test(b))) err = { en: 'Write the bytes in hex pairs, like AB CD.', ar: 'اكتب الـ bytes بالـ hex أزواج زي ' + bdi('AB CD') + '.' };
        else if (t.length < n) err = { en: `${name} needs ${n} byte${n > 1 ? 's' : ''}: write more.`, ar: `الـ ${bdi(name)} محتاجة ${NAR[n]}، اكتب bytes أكتر.` };
        else bytes = t.slice(0, n).map(b => parseInt(b, 16));
      }
      if (bytes) {
        const P1 = ((P + (d ? -n : n)) % 65536 + 65536) % 65536;
        const addr = k => H((A + k) % 0x100000);
        const regVal = bytes.slice().reverse().map(B2).join('');
        const part = k => n === 4 ? '' : n === 2 ? (k ? ' (AH)' : ' (AL)') : ' (AL)';
        let xf;
        if (op === 'LODS') xf = (n === 2 ? `AL = [${addr(0)}] = ${B2(bytes[0])}, AH = [${addr(1)}] = ${B2(bytes[1])}` : bytes.map((b, k) => `[${addr(k)}] = ${B2(b)}`).join(', ')) + ` → ${reg} = ${regVal}`;
        else if (op === 'STOS') xf = bytes.map((b, k) => `[${addr(k)}] = ${B2(b)}${part(k)}`).join(', ');
        else if (op === 'OUTS') xf = 'output device ← ' + bytes.map(B2).join(' ');
        else xf = bytes.map((b, k) => `[${addr(k)}] = ${B2(b)}`).join(', ');
        const calc = `${sn} × 10 + ${pn} = ${H(base)} + ${H(P)} = ${H(A)}`, pc = `${pn} = ${H(P)} ${d ? '−' : '+'} ${n} = ${H(P1)}`;
        let dec = null;
        if (d && /^[0-9]+$/.test(pT)) { const v = parseInt(pT, 10) - n; if (v >= 0 && String(v) !== H(P1)) dec = String(v); }
        r = { A, bytes, addr, regVal, xf, calc, pc, dec, P1 };
      }
    }
    const opLine = { LODS: `${reg} ← DS:[SI]`, STOS: `ES:[DI] ← ${reg}`, OUTS: 'output device ← DS:[SI]', INS: 'ES:[DI] ← input device' }[op];
    const opEn = { LODS: `loads ${reg} from DS:[SI]`, STOS: `stores ${reg} at ES:[DI]`, OUTS: `sends ${n} byte${n > 1 ? 's' : ''} from DS:[SI] to the output device`, INS: `takes ${n} byte${n > 1 ? 's' : ''} from the input device into ES:[DI]` }[op];
    const opAr = { LODS: `بتحمّل الـ ${reg} من ${bdi('DS:[SI]')}.`, STOS: `بتخزن الـ ${reg} في ${bdi('ES:[DI]')}.`, OUTS: `بتبعت ${NAR[n]} من ${bdi('DS:[SI]')} للـ output device.`, INS: `بتاخد ${NAR[n]} من الـ input device وتحطهم في ${bdi('ES:[DI]')}.` }[op];
    let en, a;
    if (err) { en = err.en; a = err.ar; }
    else {
      en = `<b>${name}</b> ${opEn}. D = ${d}, so ${pn} ${d ? 'decreases' : 'increases'} by ${n}: ${r.pc}. D and the flags are not changed.` + (op === 'STOS' && n > 1 ? ' The low byte goes to the lower address (little-endian).' : '') + (r.dec ? ` Subtract in hex: subtracting in decimal would wrongly give ${r.dec} (the slides write 96 this way in the STOSD and INSD examples).` : '');
      a = `الـ ${bdi(name)} ${opAr} وعشان ${bdi('D = ' + d)} الـ ${pn} ${d ? 'بيقل' : 'بيزيد'} بعدد الـ bytes:` + ltr(r.pc) + 'والـ D والـ flags مابيتغيّروش.' + (op === 'STOS' && n > 1 ? ' والـ byte الصغير بيروح للعنوان الأصغر (little-endian).' : '') + (r.dec ? ` خلي بالك إن الطرح بالـ hex، لو طرحت بالـ decimal هيطلع ${bdi(r.dec)} وده غلط (الـ slides عملت كده في مثالين الـ STOSD والـ INSD وكتبت 96).` : '');
    }
    const field = (k, lab, w) => html`<label>${lab}<input aria-label=${lab} value=${st[k]} spellCheck="false" style=${{ width: w }} onInput=${e => set(k, e.target.value)} onChange=${e => set(k, e.target.value)} /></label>`;
    const dataK = op === 'STOS' ? 'eax' : op === 'INS' ? 'inp' : 'mem', dataL = op === 'STOS' ? 'EAX' : op === 'INS' ? 'input' : 'bytes at DS:[SI]…';
    const top = op === 'OUTS' ? ['Output device', r ? r.bytes.map(B2).join(' ') : '?'] : op === 'INS' ? ['Input device', r ? r.bytes.map(B2).join(' ') : '?'] : [reg, r ? r.regVal : '?'];
    return html`<figure className="fig mpv7"><div className="fig-stage">
      <div className="mpv7-in"><span className="mpv7-lbl">Example from the notes</span>
        <select aria-label="Example from the notes" value=${pre} onChange=${e => { const p = PRESETS.find(x => x[0] === e.target.value); if (p) { setSt(o => Object.assign({}, o, p[1])); setPre(p[0]); } }}>
          <option value="">choose…</option>${PRESETS.map(([l]) => html`<option key=${l} value=${l}>${l}</option>`)}</select></div>
      <div className="mpv7-in"><span className="mpv7-lbl">Try your own</span>
        <select aria-label="Instruction" value=${name} onChange=${e => { setPre(''); setSt(o => Object.assign({}, o, { op: e.target.value.slice(0, -1), sz: e.target.value.slice(-1) })); }}>
          ${['LODS', 'STOS', 'OUTS', 'INS'].flatMap(o => ['B', 'W', 'D'].map(z => html`<option key=${o + z} value=${o + z}>${o + z}</option>`))}</select>
        ${[0, 1].map(v => html`<button key=${v} className="fig-btn" aria-pressed=${d === v} onClick=${() => set('d', v)}>D=${v}</button>`)}</div>
      <div className="mpv7-in">${field(src ? 'ds' : 'es', sn, '66px')}${field(src ? 'si' : 'di', pn, '66px')}</div>
      <div className="mpv7-in">${field(dataK, dataL, op === 'STOS' ? '110px' : '130px')}</div>
      <p className="mpv7-opl">${opLine}</p>
      ${r ? html`<div>
        <div className="mpv7-big"><div><small>${top[0]}</small><b>${top[1]}</b></div></div>
        <div className="mpv7-dn" aria-hidden="true">${src ? '↑' : '↓'}</div>
        <div className="mpv7-strip" style=${{ gridTemplateColumns: `repeat(${n}, minmax(0, 58px))` }}>${r.bytes.map((b, k) => html`<div key=${k}><b className="mpv7-on">${B2(b)}</b><small>${r.addr(k)}</small></div>`)}</div>
        <div className="mpv7-rows">
          <div><small>(1) address</small>${r.calc}</div>
          <div><small>(2) data</small>${r.xf}</div>
          <div><small>(3) pointer, D = ${d}</small>${r.pc}</div></div></div>` : html`<p className="mpv7-err">${err.en}</p>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'mp-l7-sim': Sim, 'mp-l7-flow': Flow, 'mp-l7-dflag': DFlag,
    'mp-l7-lodsw': Lodsw, 'mp-l7-stosd': Stosd, 'mp-l7-outsb': Outsb, 'mp-l7-insd': Insd, 'mp-l7-les-stosw': LesStosw
  });
})();

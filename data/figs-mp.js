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

// Visuals for the Data Structures notes (names 'ds-…'), built on figs.js (window.FIGKIT).
// Every label and caption comes from the doctor's slides and the site's notes. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('fds-accent')) { const s = document.createElement('style'); s.id = 'fds-accent'; s.textContent = '[data-fig^="ds-"]{ --fig-k: var(--k-mm); --fig-s: var(--s-mm); }'; document.head.appendChild(s); } })();
/* ── part L1 ── */
// Data Structures visuals, Lecture 1 (Overview: arrays and structs): data → program → information, data types, the classification tree, operations, ADTs, array layout and address formula, ways to fill and pass arrays, sum/average/sort traces, 2D arrays and row-major mapping, matrix transpose/add/multiply, structs and arrays of structs (slides 5–39). Every label and number comes from the site's notes and the slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm, useFit } = window.FIGKIT;
  const CSS = `
.dsv1 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dsv1 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv1-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dsv1-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dsv1-row{ display:flex; flex-wrap:wrap; gap:6px 10px; justify-content:center; align-items:center; margin:6px 0; }
.dsv1-cells{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; align-items:flex-start; margin:6px 0; }
.dsv1-c{ display:flex; flex-direction:column; align-items:center; gap:2px; }
.dsv1-v{ min-width:34px; height:34px; padding:0 4px; box-sizing:border-box; display:grid; place-items:center; border:1px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); font:600 .95rem var(--mono); transition:background .35s, box-shadow .35s, opacity .35s; }
.dsv1-v.on{ background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); }
.dsv1-v.hot{ box-shadow:0 0 0 2px var(--fig-k); }
.dsv1-v.ok{ box-shadow:0 0 0 2px var(--ok); }
.dsv1-v.dim{ opacity:.4; }
.dsv1-v.empty{ border-style:dashed; color:var(--graphite); }
.dsv1-v.gap{ border:0; background:transparent; min-width:22px; color:var(--graphite); }
.dsv1-ix{ font:.75rem/1.2 var(--mono); color:var(--graphite); min-height:1.1em; text-align:center; }
.dsv1-mk{ font:700 .78rem var(--mono); color:var(--fig-k); min-height:1.2em; }
.dsv1 *{ font-variant-ligatures:none; }
.dsv1-code{ margin:0 auto 8px; max-width:440px; padding:8px 10px; border:1px solid var(--line); border-radius:8px; background:var(--paper); font:.8rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv1-code span{ display:block; border-radius:3px; padding:0 3px; transition:background .3s; }
.dsv1-code span.cur{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.dsv1-in{ font:.9rem var(--mono); padding:4px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:32px; max-width:100%; box-sizing:border-box; }
.dsv1-lbl{ font-size:.85rem; color:var(--graphite); display:inline-flex; gap:6px; align-items:center; flex-wrap:wrap; justify-content:center; }
.dsv1-note{ font-size:.82rem; color:var(--graphite); text-align:center; margin:6px 0 0; line-height:1.4; }
.dsv1-out{ max-width:440px; margin:8px auto 0; padding:6px 10px; border:1px solid var(--line); border-left:4px solid var(--fig-k); border-radius:6px; background:var(--paper); font:600 .86rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; min-height:1.5em; text-align:left; direction:ltr; }
.dsv1-out small{ display:block; font:600 .75rem var(--body); color:var(--graphite); }
.dsv1-err{ color:var(--pen); font-weight:700; }
.dsv1-cnt{ font-size:.85rem; color:var(--graphite); }
.dsv1-box{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 10px; color:var(--ink); }
.dsv1-box > b{ display:block; font-size:.85rem; margin-bottom:4px; }
.dsv1-pop{ animation:dsv1-in .45s ease both; }
@keyframes dsv1-in{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }
.dsv1-show{ transition:opacity .45s, transform .45s; } .dsv1-show.off{ opacity:0; transform:translateY(6px); pointer-events:none; }
.dsv1-flow{ display:grid; grid-template-columns:1fr 1.25fr 1fr; gap:4px; align-items:center; max-width:460px; margin:0 auto; }
.dsv1-arrow{ min-height:64px; display:grid; place-items:center; text-align:center; padding:4px 14px 4px 6px; background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); clip-path:polygon(0 18%, 78% 18%, 78% 0, 100% 50%, 78% 100%, 78% 82%, 0 82%); font-size:.82rem; font-weight:700; color:var(--ink); line-height:1.2; transition:background .4s; }
.dsv1-arrow.on{ background:color-mix(in srgb, var(--fig-k) 40%, var(--paper)); }
.dsv1-arrow i{ display:block; font-style:normal; font-weight:600; font-family:var(--mono); font-size:.8rem; }
.dsv1-prog{ border:2px solid var(--ink); border-radius:6px; background:var(--paper); padding:6px; text-align:center; font-size:.82rem; color:var(--ink); }
.dsv1-prog > b{ display:block; margin-bottom:4px; line-height:1.2; }
.dsv1-prog div{ border-radius:5px; padding:2px; opacity:.4; transition:opacity .35s, background .35s; }
.dsv1-prog div.on{ opacity:1; background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); font-weight:700; }
.dsv1-prog div.done{ opacity:1; }
.dsv1-dt{ max-width:420px; margin:0 auto; }
.dsv1-chip{ font:600 .95rem var(--mono); min-width:40px; }
.dsv1-chip.bad{ border-style:dashed; border-color:var(--pen); }
.dsv1-chip.bad[aria-pressed="true"]{ background:var(--pen); }
.dsv1-tree{ max-width:480px; margin:0 auto; text-align:center; color:var(--ink); }
.dsv1-root{ display:inline-block; padding:6px 14px; border-radius:8px; background:var(--fig-s); color:#fff; font-weight:700; }
.dsv1-two{ display:grid; grid-template-columns:minmax(0, .8fr) minmax(0, 1.4fr); gap:8px; margin-top:10px; text-align:left; }
.dsv1-br{ border:1px solid var(--line); border-top:3px solid var(--fig-k); border-radius:8px; background:var(--paper); padding:6px; font-size:.82rem; }
.dsv1-br > b{ display:block; font-size:.82rem; margin-bottom:4px; line-height:1.2; }
.dsv1-sub{ border-left:2px solid var(--fig-k); padding-left:6px; margin-top:6px; }
.dsv1-sub > b{ display:block; font-size:.8rem; margin-bottom:2px; }
.dsv1-sub em{ display:block; font-style:normal; font-size:.75rem; color:var(--graphite); margin-top:3px; }
.dsv1-leaf{ font:inherit; font-size:.82rem; display:inline-block; margin:2px 3px 2px 0; padding:2px 7px; border-radius:99px; border:1px solid var(--line); background:var(--paper-2); color:var(--ink); cursor:pointer; }
.dsv1-leaf[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv1-pic{ margin:10px auto 0; max-width:360px; text-align:center; }
.dsv1-pic svg{ width:100%; max-width:260px; height:auto; }
.dsv1-pic .s{ fill:var(--paper); stroke:var(--ink); stroke-width:2; } .dsv1-pic .l{ fill:none; stroke:var(--ink); stroke-width:2; } .dsv1-pic .k{ fill:var(--fig-k); }
.dsv1-adt{ max-width:440px; margin:0 auto; text-align:center; }
.dsv1-iface{ display:inline-block; border:2px dashed var(--fig-k); border-radius:10px; padding:6px 16px; background:var(--paper); color:var(--ink); }
.dsv1-iface b{ display:block; font-size:1.05rem; } .dsv1-iface small{ font-size:.78rem; color:var(--graphite); }
.dsv1-down{ font-size:1.3rem; color:var(--fig-k); line-height:1.2; }
.dsv1-imps{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; }
.dsv1-imps div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 10px; font-size:.86rem; color:var(--ink); }
.dsv1-imps small{ display:block; font-size:.75rem; color:var(--graphite); }
.dsv1-frame{ max-width:400px; margin:8px auto 0; border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; text-align:center; color:var(--ink); font-size:.85rem; }
.dsv1-frame > b{ display:block; font-size:.8rem; color:var(--graphite); margin-bottom:2px; }
.dsv1-ref{ color:var(--fig-k); font-weight:700; }
.dsv1-tb{ border-collapse:collapse; margin:6px auto 0; font-size:.86rem; color:var(--ink); }
.dsv1-tb th, .dsv1-tb td{ border:1px solid var(--line); padding:3px 7px; text-align:center; font-family:var(--mono); background:var(--paper); transition:background .3s; }
.dsv1-tb th{ font-family:var(--body); background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.dsv1-tb tr.cur td{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); font-weight:700; }
.dsv1-tb tr.fut td{ color:transparent; }
.dsv1-g2{ display:inline-grid; gap:3px; margin:0 auto; }
.dsv1-g2 .h{ font:.75rem var(--mono); color:var(--graphite); display:grid; place-items:center; padding:0 2px; }
.dsv1-g2 .e{ display:grid; place-items:center; height:32px; padding:0 4px; border:1px solid var(--line); border-radius:5px; background:var(--paper); color:var(--ink); font:600 .78rem var(--mono); white-space:nowrap; cursor:pointer; transition:background .35s, box-shadow .35s, opacity .35s; }
.dsv1-g2 .e.on{ background:color-mix(in srgb, var(--fig-k) 28%, var(--paper)); }
.dsv1-g2 .e.hot{ box-shadow:0 0 0 2px var(--fig-k); }
.dsv1-g2 .e.dim{ opacity:.45; }
.dsv1-strip{ display:flex; flex-wrap:wrap; gap:8px 4px; justify-content:center; margin-top:10px; }
.dsv1-run{ display:flex; flex-direction:column; align-items:flex-start; gap:2px; }
.dsv1-run > small{ font:.75rem var(--mono); color:var(--graphite); }
.dsv1-run > div{ display:flex; gap:2px; }
.dsv1-run .p{ width:28px; height:28px; display:grid; place-items:center; border:1px solid var(--line); border-radius:4px; font:600 .78rem var(--mono); color:var(--ink); transition:background .35s, box-shadow .35s; }
.dsv1-run .p.a{ background:color-mix(in srgb, var(--fig-k) 12%, var(--paper)); } .dsv1-run .p.b{ background:var(--paper); }
.dsv1-run .p.on{ background:color-mix(in srgb, var(--fig-k) 34%, var(--paper)); }
.dsv1-run .p.hot{ box-shadow:0 0 0 2px var(--ok); }
.dsv1-mats{ display:flex; flex-wrap:wrap; gap:8px 10px; justify-content:center; align-items:center; }
.dsv1-mat{ display:flex; flex-direction:column; align-items:center; gap:3px; }
.dsv1-mat > small{ font-size:.8rem; font-weight:700; color:var(--ink); }
.dsv1-mat > div{ display:inline-grid; gap:3px; padding:3px 5px; border-left:2px solid var(--ink); border-right:2px solid var(--ink); border-radius:4px; }
.dsv1-mat .m{ min-width:30px; height:30px; padding:0 3px; box-sizing:border-box; display:grid; place-items:center; border-radius:4px; font:600 .86rem var(--mono); color:var(--ink); background:var(--paper); transition:background .35s, box-shadow .35s, opacity .35s; }
.dsv1-mat .m.on{ background:color-mix(in srgb, var(--fig-k) 28%, var(--paper)); }
.dsv1-mat .m.hot{ box-shadow:0 0 0 2px var(--fig-k); }
.dsv1-mat .m.dim{ opacity:.35; }
.dsv1-op{ font:700 1.1rem var(--mono); color:var(--graphite); }
.dsv1-dots{ display:inline-grid; gap:2px; }
.dsv1-dots i{ width:13px; height:13px; border-radius:3px; background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); border:1px solid var(--line); }
.dsv1-dots.c i{ background:color-mix(in srgb, var(--ok) 40%, var(--paper)); }
.dsv1-step{ display:inline-flex; align-items:center; gap:4px; font-size:.82rem; color:var(--ink); }
.dsv1-step .fig-btn{ min-width:32px; padding:2px 8px; }
.dsv1-step b{ font-family:var(--mono); min-width:1.1em; text-align:center; }
.dsv1-cmp{ display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; max-width:520px; margin:0 auto; }
.dsv1-tiny{ display:flex; gap:2px; flex-wrap:wrap; }
.dsv1-tiny i{ width:13px; height:26px; border:1px solid var(--line); border-radius:3px; background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.dsv1-mem{ display:flex; flex-wrap:wrap; gap:6px; align-items:flex-end; margin-top:4px; }
.dsv1-mem > div{ display:flex; flex-direction:column; gap:2px; }
.dsv1-mem small{ font:.75rem var(--mono); color:var(--graphite); }
.dsv1-objs{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
.dsv1-obj{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:6px 8px; min-width:84px; text-align:center; color:var(--ink); }
.dsv1-obj > b{ display:block; font-size:.88rem; margin-bottom:4px; }
.dsv1-obj div{ border:1px solid var(--line); border-radius:5px; padding:2px 4px; margin-top:3px; font:.78rem var(--mono); transition:background .3s, box-shadow .3s; }
.dsv1-obj div.on{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); box-shadow:0 0 0 2px var(--fig-k); }
.dsv1-chips{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin-top:10px; }
.dsv1-chips .fig-btn{ font:.8rem var(--mono); padding:3px 8px; min-height:30px; }
.dsv1-emp{ width:100%; table-layout:fixed; border-collapse:collapse; font-size:.8rem; color:var(--ink); }
.dsv1-emp th, .dsv1-emp td{ border:1px solid var(--line); padding:2px; text-align:center; background:var(--paper); transition:background .3s; }
.dsv1-emp th{ font-weight:700; background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); font-size:.75rem; }
.dsv1-emp tr.cur td{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
.dsv1-emp input{ width:100%; box-sizing:border-box; font:.8rem var(--mono); padding:3px 2px; border:1px solid transparent; border-radius:4px; background:transparent; color:var(--ink); text-align:center; }
.dsv1-emp input:focus{ border-color:var(--fig-k); outline:none; }
.dsv1-emp td.t{ font:700 .8rem var(--mono); }
@media (prefers-reduced-motion: reduce){ .dsv1-pop{ animation:none; } .dsv1-show, .dsv1-v, .dsv1-code span{ transition:none; } }`;
  if (!document.getElementById('dsv1-css')) { const s = document.createElement('style'); s.id = 'dsv1-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* helpers */
  const L = s => `<span class="ltr">${s}</span>`;
  const D = s => `<bdi dir="ltr">${String(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const nums = s => String(s).split(/[\s,]+/).filter(Boolean).map(Number).filter(Number.isFinite);
  // what cout prints for a double (default precision: 6 significant digits)
  const cout = x => { if (!Number.isFinite(x)) return String(x); if (x !== 0 && (Math.abs(x) >= 1e6 || Math.abs(x) < 1e-4)) { const [m, e] = x.toExponential(5).split('e'); return String(Number(m)) + 'e' + (e[0] === '-' ? '-' : '+') + e.replace(/^[-+]/, '').padStart(2, '0'); } return String(Number(x.toPrecision(6))); };
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  const SBar = ({ n, i, ctl }) => html`<div className="fig-bar">
    ${n <= 14 ? html`<div className="fig-dots" aria-hidden="true">${Array.from({ length: n }, (_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</div>` : html`<span className="dsv1-cnt">Step ${i + 1} / ${n}</span>`}
    <span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i >= n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;
  const Modes = ({ list, mode, set }) => html`<div className="dsv1-modes" role="group">${list.map(([k, l]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${l}</button>`)}</div>`;
  const Code = ({ lines, cur }) => html`<pre className="dsv1-code">${lines.map((l, k) => html`<span key=${k} className=${(Array.isArray(cur) ? cur.includes(k) : k === cur) ? 'cur' : ''}>${l || ' '}</span>`)}</pre>`;
  const Cells = ({ vals, cls, ix, mk }) => html`<div className="dsv1-cells">${vals.map((v, k) => html`<div key=${k} className="dsv1-c">${mk && html`<span className="dsv1-mk">${mk[k] || ''}</span>`}<span className=${'dsv1-v ' + ((cls && cls[k]) || '')}>${v}</span>${ix !== false && html`<span className="dsv1-ix">${ix ? ix[k] : '[' + k + ']'}</span>`}</div>`)}</div>`;
  const Mat = ({ M, label, cls, base = 0 }) => html`<div className="dsv1-mat"><small>${label}</small><div style=${{ gridTemplateColumns: `repeat(${M[0].length}, auto)` }}>
    ${M.map((row, i) => row.map((v, j) => html`<span key=${i + '-' + j} className=${'m ' + ((cls && cls(i, j)) || '')} title=${`(${i + base},${j + base})`}>${v}</span>`))}</div></div>`;
  const parseMat = s => { const rows = String(s).split(/[\/;\n]/).map(r => nums(r)).filter(r => r.length); if (!rows.length || rows.length > 4 || rows.some(r => r.length !== rows[0].length || r.length > 4)) return null; return rows; };
  const matStr = M => M.map(r => r.join(' ')).join(' / ');
  const Stepper = ({ label, v, set, min, max }) => html`<span className="dsv1-step">${label}<button className="fig-btn" onClick=${() => set(Math.max(min, v - 1))} disabled=${v <= min} aria-label=${label + ' minus'}>−</button><b>${v}</b><button className="fig-btn" onClick=${() => set(Math.min(max, v + 1))} disabled=${v >= max} aria-label=${label + ' plus'}>+</button></span>`;

  /* ── [0.1] slide 5: data → application / program → information ── */
  function DataFlow({ ar }) {
    const steps = [
      { en: 'Slide 5: <b>data</b> goes into an <b>application / program</b> and <b>information</b> comes out. The notes\' example: the data is the temperature 35°C.', ar: 'الـ slide بترسم الـ <b>data</b> داخلة الـ <b><bdi dir="ltr">application / program</bdi></b> وطالع منه <b>information</b>. مثال الـ notes: الداتا هي الحرارة <bdi dir="ltr">35°C</bdi>.' },
      { en: '(1) The program <b>reads</b> the data: 35°C.', ar: '(1) البرنامج <b>بيقرا</b> الداتا، يعني <bdi dir="ltr">35°C</bdi>.' },
      { en: '(2) It <b>stores</b> it temporarily.', ar: '(2) وبعدين <b>بيخزنها</b> مؤقتًا.' },
      { en: '(3) It <b>processes</b> it: is 35°C hot?', ar: '(3) وبعدين <b>بيعالجها</b> (process)، يعني بيشوف هل <bdi dir="ltr">35°C</bdi> حر؟' },
      { en: '(4) Finally it <b>outputs</b> the result, the information (the conclusion): <b>it is hot</b>.', ar: '(4) وفي الآخر <b>بيطلّع</b> النتيجة (output)، يعني الـ information (الاستنتاج): <b>الجو حر</b>.' }
    ];
    const [i, ctl] = useWalk(steps.length, 2200, 0);
    const P = ['read', 'store', 'process', 'output'];
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <div className="dsv1-flow">
        <div className=${'dsv1-arrow' + (i === 1 ? ' on' : '')}>Data<i>35°C</i></div>
        <div className="dsv1-prog"><b>Application / Program</b>${P.map((p, k) => html`<div key=${k} className=${i === k + 1 ? 'on' : i > k + 1 ? 'done' : ''}>${k + 1}. ${p}${k === 1 && i >= 2 ? ': 35°C' : ''}</div>`)}</div>
        <div className=${'dsv1-arrow' + (i === 4 ? ' on' : '')}>Information<i className=${'dsv1-show' + (i >= 4 ? '' : ' off')}>It is hot</i></div>
      </div></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${SBar} n=${steps.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.2]–[0.3] slides 6–7: a data type = domain + operations; a wrong operation is a compile error ── */
  const DTYPES = [
    { k: 'boolean', dom: '0, 1', ops: ['and', 'or', '='] },
    { k: 'char', dom: 'ASCII', ops: ['=', '<>', '<'], bad: '*' },
    { k: 'integer', dom: '-maxint to +maxint', ops: ['+', '-', '=', '==', '<>', '<'] }
  ];
  function DataType({ ar }) {
    const [t, setT] = useState(1), [op, setOp] = useState(null);
    const T = DTYPES[t], pickT = k => { setT(k); setOp(null); };
    let en, a;
    if (op == null) { en = `A data type is (i) a <b>domain</b> of allowed values and (ii) a <b>set of operations</b> on these values. <b>${T.k}</b>: domain ${esc(T.dom)}; operations ${esc(T.ops.join(', '))} (slide 7, "etc."). Tap an operation.`;
      a = `الـ data type عبارة عن (i) <b>domain</b> من القيم المسموحة و(ii) <b>set of operations</b> على القيم دي. النوع ده هو الـ <b>${T.k}</b>، والـ domain بتاعه:` + L(esc(T.dom)) + 'والـ operations بتاعته (من slide 7):' + L(esc(T.ops.join(', ')) + ', etc.') + 'دوس على operation.'; }
    else if (op === T.bad) { en = '<span class="dsv1-err">Compiler error:</span> <code>char x,y,z; z=x*y;</code> is not allowed: * is not one of the operations of char, so the compiler signals an error.';
      a = '<span class="dsv1-err">الـ compiler بيطلّع error</span> لأن الكود ده مش مسموح:<pre>char x,y,z;\nz=x*y;</pre>والسبب إن الـ <bdi dir="ltr">*</bdi> مش من الـ operations بتاعة الـ char.'; }
    else { en = `<b>${esc(op)}</b> is one of the operations of <b>${T.k}</b>: the compiler accepts it.`; a = `الـ operation دي ${D(esc(op))} من الـ operations بتاعة الـ ${T.k}، فالـ compiler بيقبلها.`; }
    return html`<figure className="fig dsv1"><div className="fig-stage"><div className="dsv1-dt">
      <${Modes} list=${DTYPES.map((d, k) => [k, d.k])} mode=${t} set=${pickT} />
      <div className="dsv1-cmp">
        <div className="dsv1-box"><b>(i) Domain</b><span style=${{ fontFamily: 'var(--mono)' }}>${T.dom}</span></div>
        <div className="dsv1-box"><b>(ii) Operations</b><div className="dsv1-row" style=${{ justifyContent: 'flex-start' }}>
          ${T.ops.map(o => html`<button key=${o} className="fig-btn dsv1-chip" aria-pressed=${String(op === o)} onClick=${() => setOp(o)}>${o}</button>`)}
          ${T.bad && html`<button className="fig-btn dsv1-chip bad" aria-pressed=${String(op === T.bad)} onClick=${() => setOp(T.bad)} aria-label="multiply, not an operation of char">${T.bad}</button>`}</div></div>
      </div>
      ${op && op === T.bad && html`<pre className="dsv1-code dsv1-pop" style=${{ marginTop: '10px' }}><span>char x,y,z;</span><span className="cur">z=x*y;   <span className="dsv1-err" style=${{ display: 'inline' }}>✕ error</span></span></pre>`}
      </div></div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [1] slides 10–11: classification tree, with the pictures of slide 11 ── */
  const PIC = {
    Arrays: html`<svg viewBox="0 0 200 50" aria-hidden="true">${[0, 1, 2, 3, 4].map(k => html`<rect key=${k} className="s" x=${10 + k * 36} y="8" width="36" height="34" />`)}</svg>`,
    'Linked List': html`<svg viewBox="0 0 200 50" aria-hidden="true">${[0, 1, 2].map(k => html`<g key=${k}><rect className="s" x=${6 + k * 66} y="10" width="40" height="30" rx="4" /><line className="l" x1=${32 + k * 66} y1="10" x2=${32 + k * 66} y2="40" /><circle className="k" cx=${39 + k * 66} cy="25" r="3" />${k < 2 && html`<path className="l" d=${`M${39 + k * 66} 25 H${68 + k * 66} m-7 -5 l7 5 l-7 5`} />`}</g>`)}<path className="l" d="M171 25 H192 M192 17 V33" /></svg>`,
    Stack: html`<svg viewBox="0 0 200 80" aria-hidden="true"><path className="l" d="M70 8 V74 H130 V8" />${[0, 1, 2].map(k => html`<rect key=${k} className="s" x="76" y=${50 - k * 20} width="48" height="18" rx="3" />`)}<path className="l" d="M150 30 V8 m-5 7 l5 -7 l5 7 M164 8 V30 m-5 -7 l5 7 l5 -7" /></svg>`,
    Queue: html`<svg viewBox="0 0 200 50" aria-hidden="true"><path className="l" d="M40 8 H160 M40 42 H160" />${[0, 1, 2, 3].map(k => html`<rect key=${k} className="s" x=${48 + k * 27} y="13" width="23" height="24" rx="3" />`)}<path className="l" d="M8 25 H34 m-7 -5 l7 5 l-7 5 M166 25 H194 m-7 -5 l7 5 l-7 5" /></svg>`,
    Trees: html`<svg viewBox="0 0 200 80" aria-hidden="true"><path className="l" d="M100 14 L60 42 M100 14 L140 42 M60 42 L40 68 M60 42 L80 68 M140 42 L160 68" />${[[100, 14], [60, 42], [140, 42], [40, 68], [80, 68], [160, 68]].map(([x, y], k) => html`<circle key=${k} className=${k ? 's' : 'k'} cx=${x} cy=${y} r="9" />`)}</svg>`,
    Graphs: html`<svg viewBox="0 0 200 80" aria-hidden="true"><path className="l" d="M40 20 L100 12 L160 30 L120 68 L50 60 Z M40 20 L120 68 M100 12 L50 60" />${[[40, 20], [100, 12], [160, 30], [120, 68], [50, 60]].map(([x, y], k) => html`<circle key=${k} className="s" cx=${x} cy=${y} r="9" />`)}</svg>`
  };
  const CLS = {
    prim: { en: '<b>Primitive</b>: basic built-in types (int, float, char and pointers).', ar: 'الـ <b>Primitive</b> هي الأنواع الأساسية الـ built-in، زي الـ int والـ float والـ char والـ pointers.' },
    stat: { en: '<b>Non-primitive, linear, static</b>: elements in a sequence, size fixed at design time.', ar: 'ده <b>non-primitive و linear و static</b>، يعني العناصر ورا بعض والحجم ثابت بيتحدد وقت الـ design.' },
    dyn: { en: '<b>Non-primitive, linear, dynamic</b>: elements in a sequence, size can change.', ar: 'ده <b>non-primitive و linear و dynamic</b>، يعني العناصر ورا بعض والحجم ممكن يتغير.' },
    non: { en: '<b>Non-primitive, non-linear</b>: elements are not in a single sequence (hierarchy / network).', ar: 'ده <b>non-primitive و non-linear</b>، يعني العناصر مش في sequence واحد (hierarchy أو network).' }
  };
  function Classify({ ar }) {
    const steps = [
      { en: 'Slide 10: data structures are either <b>primitive</b> or <b>non-primitive</b>.', ar: 'في slide 10 الـ data structures نوعين: <b>primitive</b> و<b>non-primitive</b>.' },
      { en: '<b>Primitive</b>: the basic built-in types integer, float, character and pointers.', ar: 'الـ <b>Primitive</b> هي الأنواع الأساسية الـ built-in: الـ integer والـ float والـ character والـ pointers.' },
      { en: '<b>Non-primitive</b> structures split into <b>linear</b> and <b>non-linear</b>.', ar: 'الـ <b>Non-primitive</b> بتتقسم لـ <b>linear</b> و<b>non-linear</b>.' },
      { en: '<b>Linear</b>: elements in a sequence. Arrays are <b>static</b> (size fixed at design time); linked list, stack and queue are <b>dynamic</b> (size can change).', ar: 'في الـ <b>Linear</b> العناصر ورا بعض في sequence. الـ Arrays نوعها <b>static</b> (الحجم ثابت من وقت الـ design)، أما الـ linked list والـ stack والـ queue فنوعهم <b>dynamic</b> (الحجم ممكن يتغير).' },
      { en: '<b>Non-linear</b>: elements are not in a single sequence: trees (hierarchy) and graphs (network).', ar: 'في الـ <b>Non-linear</b> العناصر مش في sequence واحد، زي الـ trees (hierarchy) والـ graphs (network).' },
      { en: 'Tap any structure to see its class and its picture from slide 11.', ar: 'دوس على أي structure عشان تشوف هو من أنهي class وشكله في slide 11.' }
    ];
    const [i, ctl] = useWalk(steps.length, 2300, 0), [pick, setPick] = useState(null);
    const leaf = (name, cls) => html`<button key=${name} className="dsv1-leaf" aria-pressed=${String(pick && pick[0] === name)} onClick=${() => { setPick([name, cls]); ctl.go(steps.length - 1); }}>${name}</button>`;
    const sh = on => 'dsv1-show' + (on ? '' : ' off');
    const cap = pick ? CLS[pick[1]] : steps[i];
    return html`<figure className="fig dsv1"><div className="fig-stage"><div className="dsv1-tree">
      <span className="dsv1-root">Data Structure</span>
      <div className="dsv1-two">
        <div className=${'dsv1-br ' + sh(i >= 1)}><b>Primitive</b>${['integer', 'float', 'character', 'pointers'].map(n => leaf(n, 'prim'))}</div>
        <div className=${'dsv1-br ' + sh(i >= 2)}><b>Non-primitive</b>
          <div className=${'dsv1-sub ' + sh(i >= 3)}><b>Linear (linear lists)</b>${leaf('Arrays', 'stat')}<em>static</em>${leaf('Linked List', 'dyn')}${leaf('Stack', 'dyn')}${leaf('Queue', 'dyn')}<em>dynamic</em></div>
          <div className=${'dsv1-sub ' + sh(i >= 4)}><b>Non-linear (non-linear lists)</b>${leaf('Trees', 'non')}${leaf('Graphs', 'non')}</div></div>
      </div>
      ${pick && PIC[pick[0]] && html`<div className="dsv1-pic dsv1-pop" key=${pick[0]}>${PIC[pick[0]]}</div>`}
      </div></div>
      <${Cap} ...${cap} showAr=${ar} /><${SBar} n=${steps.length} i=${i} ctl=${{ go: k => { setPick(null); ctl.go(k); }, replay: () => { setPick(null); ctl.replay(); } }} /></figure>`;
  }

  /* ── [2.0]–[2.2] slides 12–13: the six operations, on the list of slide 16 ── */
  const BASE = [5, 2, 4, 8, 1];
  function opSteps(op, key, x) {
    const A = BASE, S = [], st = (arr, cls, en, ar, B) => S.push({ arr, cls: cls || {}, en, ar, B });
    if (op === 'nav') {
      st(A, {}, '<b>Navigating (traversing)</b>: access each data element <b>exactly once</b> so that it can be processed.', 'الـ <b>Navigating</b> (الـ traversing) يعني نوصل لكل data element <b>مرة واحدة بالظبط</b> عشان نعالجه.');
      A.forEach((v, k) => { const c = {}; for (let q = 0; q < k; q++) c[q] = 'ok'; c[k] = 'on hot'; st(A, c, `Visit [${k}] = ${v} and process it.`, `بنوصل للعنصر ${D('[' + k + '] = ' + v)} ونعالجه.`); });
      const c = {}; A.forEach((_, k) => { c[k] = 'ok'; }); st(A, c, 'Every element was accessed exactly once.', 'كل عنصر اتزار مرة واحدة بالظبط.');
    } else if (op === 'search' || op === 'del') {
      st(A, {}, (op === 'search' ? '<b>Searching</b>: find the location of the key ' : '<b>Deletion</b>: remove the element ') + `<b>${key}</b> in the structure.`, (op === 'search' ? 'الـ <b>Searching</b> يعني نلاقي مكان الـ key ' : 'الـ <b>Deletion</b> يعني نمسح العنصر ') + `${D(key)} من الـ structure.`);
      let f = -1;
      for (let k = 0; k < A.length; k++) { const hit = A[k] === key, c = {}; for (let q = 0; q < k; q++) c[q] = 'dim'; c[k] = hit ? 'on ok' : 'hot';
        st(A, c, `Is [${k}] = ${A[k]} the key ${key}? ${hit ? 'Yes.' : 'No.'}`, `هل ${D('[' + k + '] = ' + A[k])} هو الـ key؟ ${hit ? 'أيوه.' : 'لأ.'}`); if (hit) { f = k; break; } }
      if (f < 0) st(A, Object.fromEntries(A.map((_, k) => [k, 'dim'])), `${key} is not in the structure${op === 'del' ? ': nothing is deleted' : ''}.`, `العنصر ${D(key)} مش موجود في الـ structure${op === 'del' ? '، فمفيش حاجة هتتمسح' : ''}.`);
      else if (op === 'search') st(A, { [f]: 'on ok' }, `Found: the key ${key} is at location ${f}.`, `لقيناه: الـ key ده مكانه location رقم ${D(f)}.`);
      else { const B2 = A.filter((_, k) => k !== f); st(B2, {}, `Deleted: ${key} is removed and the structure now has ${B2.length} elements.`, `اتمسح العنصر ${D(key)}، والـ structure بقى فيه ${D(B2.length)} عناصر.`); }
    } else if (op === 'ins') {
      st(A, {}, `<b>Insertion</b>: add a new data element <b>${x}</b> to the structure.`, `الـ <b>Insertion</b> يعني نضيف data element جديد ${D(x)} للـ structure.`);
      st(A.concat(x), { [A.length]: 'on hot' }, `${x} is added (here at the end); the structure now has ${A.length + 1} elements.`, `اتضاف العنصر ${D(x)} (هنا في الآخر)، والـ structure بقى فيه ${D(A.length + 1)} عناصر.`);
    } else if (op === 'sort') {
      st(A, {}, '<b>Sorting</b>: arrange the elements in a logical order.', 'الـ <b>Sorting</b> يعني نرتب العناصر ترتيب منطقي.');
      st(A.slice().sort((p, q) => p - q), Object.fromEntries(A.map((_, k) => [k, 'on'])), '<b>Ascending</b>: smallest first.', 'ترتيب <b>تصاعدي</b> (ascending)، يعني الأصغر الأول.');
      st(A.slice().sort((p, q) => q - p), Object.fromEntries(A.map((_, k) => [k, 'on'])), '<b>Descending</b>: largest first.', 'ترتيب <b>تنازلي</b> (descending)، يعني الأكبر الأول.');
    } else {
      st([5, 2, 4], {}, '<b>Merging</b>: two data structures, A and B.', 'الـ <b>Merging</b>: عندنا اتنين data structures هما A و B.', [8, 1]);
      st(A, { 3: 'on', 4: 'on' }, 'Their elements are combined into <b>one</b> structure.', 'عناصرهم بتتجمع في structure <b>واحد</b>.');
    }
    return S;
  }
  function Ops({ ar }) {
    const [op, setOp] = useState('nav'), [key, setKey] = useState('8'), [x, setX] = useState('6');
    const kv = Number.isFinite(parseFloat(key)) ? parseFloat(key) : 8, xv = Number.isFinite(parseFloat(x)) ? parseFloat(x) : 6;
    const S = opSteps(op, kv, xv), [i, ctl] = useWalk(S.length, 1500, op + kv + '|' + xv), s = S[i];
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <${Modes} list=${[['nav', 'Navigating'], ['search', 'Searching'], ['ins', 'Insertion'], ['del', 'Deletion'], ['sort', 'Sorting'], ['merge', 'Merging']]} mode=${op} set=${setOp} />
      ${(op === 'search' || op === 'del') && html`<div className="dsv1-row"><label className="dsv1-lbl">key <input className="dsv1-in" style=${{ width: '70px' }} inputMode="numeric" value=${key} onChange=${e => setKey(e.target.value)} aria-label="Key" /></label></div>`}
      ${op === 'ins' && html`<div className="dsv1-row"><label className="dsv1-lbl">new element <input className="dsv1-in" style=${{ width: '70px' }} inputMode="numeric" value=${x} onChange=${e => setX(e.target.value)} aria-label="New element" /></label></div>`}
      ${s.B ? html`<div className="dsv1-row"><span className="dsv1-lbl">A</span><${Cells} vals=${s.arr} cls=${s.cls} /><span className="dsv1-op">+</span><span className="dsv1-lbl">B</span><${Cells} vals=${s.B} /></div>` : html`<${Cells} vals=${s.arr} cls=${s.cls} />`}
      <p className="dsv1-note">The list of slide 16: 5 2 4 8 1</p></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.5] slide 15: ADT → implementations ── */
  const ADTS = [
    { k: 'List', imp: ['Dynamic array', 'Linked list'], en: '<b>List</b> is the ADT: only the interface, no details of how or in which language. It is implemented as a <b>dynamic array</b> or a <b>linked list</b>.', ar: 'الـ <b>List</b> هنا هو الـ ADT، يعني interface بس من غير تفاصيل الـ implementation ولا الـ language. وبيتعمل implementation بـ <b>dynamic array</b> أو بـ <b>linked list</b>.' },
    { k: 'Queue', imp: ['Linked list based queue', 'Array based queue'], en: '<b>Queue</b> is the ADT; a <b>linked-list based queue</b> and an <b>array based queue</b> are two implementations of the same interface.', ar: 'الـ <b>Queue</b> هو الـ ADT، وليه implementation بـ <b>linked list</b> وimplementation تاني بـ <b>array</b>، والاتنين بيلتزموا بنفس الـ interface.' },
    { k: 'Map', imp: ['Tree map', 'Hash map / hash table'], en: '<b>Map</b> is the ADT; a <b>tree map</b> and a <b>hash map / hash table</b> implement it.', ar: 'الـ <b>Map</b> هو الـ ADT، وبيتعمله implementation بـ <b>tree map</b> أو بـ <b><bdi dir="ltr">hash map / hash table</bdi></b>.' },
    { k: 'Vehicle', imp: ['Golf car', 'Bicycle', 'Smart car'], en: 'The analogy: <b>Vehicle</b> is the ADT (what it is for); a golf car, a bicycle and a smart car are implementations (how it is built).', ar: 'التشبيه: الـ <b>Vehicle</b> هو الـ ADT، والـ golf car والـ bicycle والـ smart car هم الـ implementations.' }
  ];
  function Adt({ ar }) {
    const [k, setK] = useState(0), A = ADTS[k];
    return html`<figure className="fig dsv1"><div className="fig-stage"><div className="dsv1-adt">
      <${Modes} list=${ADTS.map((a, j) => [j, a.k])} mode=${k} set=${setK} />
      <div className="dsv1-iface"><b>${A.k}</b><small>ADT: the interface only</small></div>
      <div className="dsv1-down" aria-hidden="true">↓ implemented by ↓</div>
      <div className="dsv1-imps" key=${k}>${A.imp.map((m, j) => html`<div key=${j} className="dsv1-pop" style=${{ animationDelay: j * .18 + 's' }}>${m}<small>${k === 3 ? 'implementation' : 'implementation (DS)'}</small></div>`)}</div>
      </div></div><${Cap} en=${A.en} ar=${A.ar} showAr=${ar} /></figure>`;
  }

  /* ── [3.1] slide 16: array-based representation, location(i) = i - 1 ── */
  function ArrayLoc({ ar }) {
    const [n, setN] = useState(3), A = BASE, p = n - 1;
    const ords = ['1st', '2nd', '3rd', '4th', '5th'];
    const vals = A.map(String).concat('…', ''), cls = vals.map((_, k) => k === p ? 'on hot' : k === 5 ? 'gap' : k > 5 ? 'empty' : '');
    const ix = ['[0]', '[1]', '[2]', '[3]', '[4]', '', html`MaxSize<br />-1`];
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <div className="dsv1-row"><span className="dsv1-lbl">i-th element of the list:</span>${[1, 2, 3, 4, 5].map(k => html`<button key=${k} className="fig-btn" aria-pressed=${String(n === k)} onClick=${() => setN(k)}>i = ${k}</button>`)}</div>
      <div style=${{ fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--graphite)', textAlign: 'center', marginTop: '8px' }}>element</div>
      <${Cells} vals=${vals} cls=${cls} ix=${ix} />
      <p className="dsv1-note" style=${{ fontFamily: 'var(--mono)' }}>length = 5 (full when length = MaxSize)</p>
      <div className="dsv1-out" style=${{ textAlign: 'center' }}>location(${n}) = ${n} - 1 = ${p}</div></div>
      <${Cap} en=${`location(i) = i - 1: the <b>${ords[p]}</b> element of the list (${A[p]}) is in position <b>${p}</b> of the array. Indexes run from 0 to MaxSize-1 (zero-based).`}
        ar=${`العنصر رقم ${D(n)} في الـ list (قيمته ${D(A[p])}) موجود في الـ position رقم ${D(p)} في الـ array:` + L(`location(${n}) = ${n} - 1 = ${p}`) + 'والـ index بيبدأ من صفر لحد <bdi dir="ltr">MaxSize-1</bdi> (zero-based).'} showAr=${ar} /></figure>`;
  }

  /* ── [3.3] ways to put data in an array ── */
  function ArrayInit({ ar }) {
    const [v, setV] = useState('30'); const vv = String(parseInt(v, 10)) === 'NaN' ? '?' : String(parseInt(v, 10));
    const S = [
      { code: 'int arr[5]={10,20,30,40,50};', vals: ['10', '20', '30', '40', '50'], cls: { 0: 'on', 1: 'on', 2: 'on', 3: 'on', 4: 'on' }, en: '<b>All</b> elements: <code>int arr[5]={10,20,30,40,50};</code> gives a value to each of the five elements.', ar: 'الطريقة الأولى بتدخّل <b>كل</b> العناصر: السطر ده بيدّي قيمة لكل عنصر من الخمسة.' },
      { code: "char arr[5]={'a','b','c'};", vals: ["'a'", "'b'", "'c'", "'\\0'", "'\\0'"], cls: { 0: 'on', 1: 'on', 2: 'on', 3: 'empty', 4: 'empty' }, en: "The <b>first 3 only</b>: <code>char arr[5]={'a','b','c'};</code> lists 3 values; C++ fills the rest with zero ('\\0').", ar: 'الطريقة التانية بتدخّل <b>أول 3 بس</b>: السطر ده فيه 3 قيم بس، والباقي لغة الـ <bdi dir="ltr">C++</bdi> بتملاه بصفر.' },
      { code: 'arr[0]=10;', vals: ['10', '?', '?', '?', '?'], cls: { 0: 'on hot' }, en: 'A <b>specific index</b>: <code>arr[0]=10;</code> puts 10 in element 0 only. (Here arr is an int arr[5] declared without values: ? = not set yet.)', ar: 'الطريقة التالتة بتحط داتا في <b>index معين</b>: السطر ده بيحط 10 في العنصر رقم 0 بس. (هنا الـ arr متعرف من غير قيم، وعلامة الاستفهام معناها لسه متحطش فيه حاجة.)' },
      { code: 'cin>>arr[2];', vals: ['10', '?', vv, '?', '?'], cls: { 0: 'on', 2: 'on hot' }, en: `At <b>run time</b>: <code>cin&gt;&gt;arr[2];</code> reads what the user types (${vv}) into element 2. Type another value.`, ar: `الطريقة الرابعة وقت الـ <b>run time</b>: السطر ده بيقرا اللي الـ user بيكتبه (${D(vv)}) ويحطه في العنصر رقم 2. جرّب تكتب قيمة تانية.` }
    ];
    const [i, ctl] = useWalk(S.length, 2600, 0), s = S[i];
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <${Code} lines=${S.map(x => x.code)} cur=${i} />
      <${Cells} vals=${s.vals} cls=${s.cls} />
      ${i === 3 && html`<div className="dsv1-row dsv1-pop"><label className="dsv1-lbl">keyboard input <input className="dsv1-in" style=${{ width: '80px' }} inputMode="numeric" value=${v} onChange=${e => setV(e.target.value)} aria-label="Value typed at run time" /></label></div>`}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3.4] whole array by reference, one element by value ── */
  function ArrayPass({ ar }) {
    const S = [
      { cur: 6, arr: [10, 20, 30, 40, 50], en: 'Start: <code>int arr[5]={10,20,30,40,50};</code> in main. (A small example written for the rule in the notes.)', ar: 'البداية: الـ array ده متعرف في الـ main بالقيم دي. (مثال صغير معمول عشان القاعدة اللي في الـ notes.)' },
      { cur: [7, 0], arr: [10, 20, 30, 40, 50], f: 'a', en: '<code>setFirst(arr)</code>: the <b>whole array</b> is passed <b>by reference</b>. <code>a</code> is another name for the same cells: nothing is copied.', ar: 'لما بننادي <bdi dir="ltr">setFirst(arr)</bdi> الـ array <b>كله</b> بيتبعت <b>by reference</b>، يعني الـ a ده اسم تاني لنفس الأماكن ومفيش حاجة بتتنسخ.' },
      { cur: 1, arr: [0, 20, 30, 40, 50], f: 'a', hot: 0, en: '<code>a[0] = 0;</code> changes arr[0] in main too: it is now 0.', ar: 'السطر <bdi dir="ltr">a[0]&nbsp;=&nbsp;0;</bdi> بيغيّر <bdi dir="ltr">arr[0]</bdi> اللي في الـ main كمان، وبقى 0.' },
      { cur: [8, 3], arr: [0, 20, 30, 40, 50], f: 'x', x: 20, hot: 1, en: '<code>setOne(arr[1])</code>: one <b>element</b> is passed <b>by value</b>, like a simple variable: x gets a copy, 20.', ar: 'لما بننادي <bdi dir="ltr">setOne(arr[1])</bdi> العنصر الواحد بيتبعت <b>by value</b> زي أي variable عادي، فالـ x بياخد نسخة قيمتها 20.' },
      { cur: 4, arr: [0, 20, 30, 40, 50], f: 'x', x: 0, hot: 1, en: '<code>x = 0;</code> changes only the copy: arr[1] in main is still 20.', ar: 'السطر <bdi dir="ltr">x&nbsp;=&nbsp;0;</bdi> بيغيّر النسخة بس، و<bdi dir="ltr">arr[1]</bdi> اللي في الـ main لسه 20.' }
    ];
    const [i, ctl] = useWalk(S.length, 2500, 0), s = S[i];
    const lines = ['void setFirst(int a[]) {', '  a[0] = 0;', '}', 'void setOne(int x) {', '  x = 0;', '}', 'int arr[5]={10,20,30,40,50};', 'setFirst(arr);', 'setOne(arr[1]);'];
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <${Code} lines=${lines} cur=${s.cur} />
      <div className="dsv1-frame"><b>main: arr</b><${Cells} vals=${s.arr} cls=${{ [s.hot]: s.f === 'a' ? 'on hot' : s.f === 'x' ? 'hot' : '' }} /></div>
      ${s.f === 'a' && html`<div className="dsv1-frame dsv1-pop" key="a"><b>setFirst</b><span className="dsv1-ref">a ↑ refers to the same array (by reference)</span></div>`}
      ${s.f === 'x' && html`<div className="dsv1-frame dsv1-pop" key="x"><b>setOne</b><div className="dsv1-row"><span>x (a copy, by value)</span><span className=${'dsv1-v on' + (i === 4 ? ' hot' : '')}>${s.x}</span></div></div>`}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3.0], [3.5] consecutive memory, size = number of elements × size of type ── */
  function ArraySize({ ar }) {
    const [n, setN] = useState(15), [b, setB] = useState(4), ex = n === 15 && b === 4;
    const show = Math.min(n, 24);
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <div className="dsv1-row"><${Stepper} label="elements" v=${n} set=${setN} min=${1} max=${60} /><${Stepper} label="bytes each" v=${b} set=${setB} min=${1} max=${8} /></div>
      <div className="dsv1-row"><button className="fig-btn" aria-pressed=${String(ex)} onClick=${() => { setN(15); setB(4); }}>Example from the notes: int arr[15]</button></div>
      <div className="dsv1-cells" key=${n + '-' + b} style=${{ gap: '3px' }}>${Array.from({ length: show }, (_, k) => html`<div key=${k} className="dsv1-c dsv1-pop" style=${{ animationDelay: (calm() ? 0 : k * .04) + 's' }}><span className="dsv1-v on" style=${{ minWidth: '30px', height: '28px', fontSize: '.78rem' }}>[${k}]</span><span className="dsv1-ix">${k * b}</span></div>`)}
        ${n > show && html`<div className="dsv1-c"><span className="dsv1-v gap">…</span><span className="dsv1-ix">${(n - 1) * b}</span></div>`}</div>
      <p className="dsv1-note">numbers under the cells: byte offset from the start (the cells are consecutive)</p>
      <div className="dsv1-out" style=${{ textAlign: 'center' }}>${n} × ${b} = ${n * b} bytes</div></div>
      <${Cap} en=${`The elements sit in <b>consecutive</b> memory locations, each ${b} byte${b > 1 ? 's' : ''}. Size in memory = number of elements × size of type = ${n} × ${b} = <b>${n * b} bytes</b>.` + (ex ? ' (int arr[15] with a 4-byte int.)' : '')}
        ar=${`العناصر متخزنة في أماكن <b>متتالية</b> في الـ memory، وكل عنصر حجمه ${D(b)} bytes. والحجم الكلي بيساوي عدد العناصر في حجم الـ type:` + L(`${n} × ${b} = ${n * b} bytes`) + (ex ? 'وده مثال الـ notes، يعني <bdi dir="ltr">int&nbsp;arr[15]</bdi> والـ int بـ 4 bytes.' : '')} showAr=${ar} /></figure>`;
  }

  /* ── [5] slides 21–22: Sum and Average traced ── */
  function SumAvg({ ar }) {
    const [mode, setMode] = useState('sum'), [own, setOwn] = useState('3, 8, 1, 6');
    const cfg = mode === 'sum' ? { A: [16, 2, 77, 40, 12071], nm: 'billy', ix: 'n', r: 'result', avg: false }
      : mode === 'avg' ? { A: [5, 10, 15], nm: 'nums', ix: 'i', r: 'average', avg: true }
      : { A: nums(own).slice(0, 8), nm: 'nums', ix: 'i', r: 'average', avg: true };
    const { A, nm, ix, r, avg } = cfg, run = []; let t = 0; A.forEach(v => { run.push([t, t + v]); t += v; });
    const n = A.length + 2, [i, ctl] = useWalk(Math.max(n, 1), 1500, mode + '|' + A.join(','));
    const lines = mode === 'sum' ? ['int billy[] = {16, 2, 77, 40, 12071};', 'int n, result = 0;', 'for (n = 0; n < 5; n++)', '  result += billy[n];', 'cout << result;']
      : [`const int size = ${A.length};`, `int nums[size] = {${A.join(', ')}};`, 'double average = 0;', 'for (int i = 0; i < size; ++i)', '  average += nums[i];', 'cout << "average = " << average / size;'];
    let en, a, cur, out = '';
    if (!A.length) { en = 'Type some numbers.'; a = 'اكتب شوية أرقام.'; cur = -1; }
    else if (i === 0) { en = `<b>${r} = 0</b> before the loop. The array: ${A.join(', ')}.`; a = `قبل الـ loop الـ ${r} بيبدأ بصفر، والـ array فيه:` + L(A.join(', ')); cur = avg ? 2 : 1; }
    else if (i <= A.length) { const k = i - 1, [p, c] = run[k];
      en = `${ix} = ${k}: ${r} += ${nm}[${k}] → ${cout(p)} + ${A[k]} = <b>${cout(c)}</b>.`; a = `لما ${D(ix + ' = ' + k)} بنزوّد العنصر ده على الـ ${r}:` + L(`${r} = ${cout(p)} + ${A[k]} = ${cout(c)}`); cur = avg ? 4 : 3; }
    else if (!avg) { out = String(t); en = `The loop is over: <code>cout &lt;&lt; result;</code> prints <b>${t}</b>` + (mode === 'sum' ? ' (the slide: "output is : 12206").' : '.'); a = 'الـ loop خلص، والبرنامج بيطبع الـ result:' + L(String(t)); cur = 4; }
    else { const m = t / A.length; out = 'average = ' + cout(m); en = `The loop is over: it prints <b>average = ${cout(m)}</b> (${cout(t)} / ${A.length}).`; a = 'الـ loop خلص، والبرنامج بيقسم على الـ size ويطبع:' + L(`average = ${cout(t)} / ${A.length} = ${cout(m)}`); cur = 5; }
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <${Modes} list=${[['sum', 'Sum (slide 22)'], ['avg', 'Average (slide 21)'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'own' && html`<div className="dsv1-row"><label className="dsv1-lbl">nums <input className="dsv1-in" style=${{ width: '170px' }} value=${own} onChange=${e => setOwn(e.target.value)} aria-label="Numbers, separated by commas" /></label></div>`}
      <${Code} lines=${lines} cur=${cur} />
      <${Cells} vals=${A} cls=${Object.fromEntries(A.map((_, k) => [k, i - 1 === k ? 'on hot' : k < i - 1 ? 'ok' : '']))} />
      <table className="dsv1-tb"><thead><tr><th>${ix}</th><th>${nm}[${ix}]</th><th>${r}</th></tr></thead><tbody>
        ${A.map((v, k) => html`<tr key=${k} className=${k === i - 1 ? 'cur' : k > i - 1 ? 'fut' : ''}><td>${k}</td><td>${v}</td><td>${cout(run[k][1])}</td></tr>`)}</tbody></table>
      <div className="dsv1-out"><small>output</small>${out}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${A.length > 0 && html`<${SBar} n=${n} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── [5] slide 23: the descending exchange sort traced ── */
  function SortTrace({ ar }) {
    const [mode, setMode] = useState('ex'), [own, setOwn] = useState('3, 9, 4, 1, 7');
    const A0 = mode === 'ex' ? [16, 2, 77, 40, 12] : nums(own).slice(0, 8), N = A0.length;
    const S = React.useMemo(() => { const a = A0.slice(), out = [{ a: a.slice() }];
      for (let n = 0; n < N - 1; n++) for (let m = n + 1; m < N; m++) { const x = a[n], y = a[m], sw = x < y; if (sw) { a[n] = y; a[m] = x; } out.push({ a: a.slice(), n, m, x, y, sw }); }
      out.push({ a: a.slice(), end: true }); return out; }, [mode, A0.join(',')]);
    const [i, ctl] = useWalk(S.length, 1400, mode + A0.join(',')), s = S[i];
    const lines = [`for (n = 0; n < ${N - 1}; n++)`, `  for (m = n+1; m < ${N}; m++)`, '    if (billy[n] < billy[m])', '    { temp = billy[n];', '      billy[n] = billy[m];', '      billy[m] = temp; }', `for (m = 0; m < ${N}; m++) cout << billy[m];`];
    let en, a, cur, cls = {}, mk = [];
    if (N < 2) { en = 'Type at least two numbers.'; a = 'اكتب رقمين على الأقل.'; cur = -1; }
    else if (i === 0) { en = `billy = {${A0.join(', ')}}. For each n, compare billy[n] with every billy[m] after it; swap when billy[n] &lt; billy[m].`; a = 'الـ array في الأول:' + L(`billy = {${A0.join(', ')}}`) + 'ولكل n بنقارن العنصر ده بكل عنصر بعده، ولو أصغر منه بنبدّلهم.'; cur = 0; }
    else if (s.end) { en = `Done: the array is in <b>descending</b> order (because of billy[n] &lt; billy[m]). It prints ${s.a.join(' ')}.`; a = 'خلصنا: الـ array بقى مترتب <b>تنازلي</b> (descending) بسبب الشرط' + L('billy[n] &lt; billy[m]') + 'والبرنامج بيطبع:' + L(s.a.join(' ')); cur = 6; s.a.forEach((_, k) => { cls[k] = 'ok'; }); }
    else { mk[s.n] = 'n'; mk[s.m] = 'm'; cls[s.n] = 'on hot'; cls[s.m] = 'hot'; for (let k = 0; k < s.n; k++) cls[k] = 'ok';
      en = `n = ${s.n}, m = ${s.m}: billy[${s.n}] &lt; billy[${s.m}]? ${s.x} &lt; ${s.y} is <b>${s.sw}</b>` + (s.sw ? ': swap them through temp.' : ': no swap.') + (s.m === N - 1 ? ` Position ${s.n} now holds the largest of the rest.` : '');
      a = `لما ${D('n = ' + s.n)} و${D('m = ' + s.m)} بنسأل:` + L(`billy[${s.n}] &lt; billy[${s.m}] → ${s.x} &lt; ${s.y} → ${s.sw}`) + (s.sw ? 'فبنبدّلهم (swap) عن طريق الـ temp.' : 'فمفيش تبديل.') + (s.m === N - 1 ? ` ومكان رقم ${D(s.n)} بقى فيه أكبر عنصر من الباقيين.` : ''); cur = s.sw ? [2, 3, 4, 5] : 2; }
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <${Modes} list=${[['ex', 'Example from the notes'], ['own', 'Try your own']]} mode=${mode} set=${setMode} />
      ${mode === 'own' && html`<div className="dsv1-row"><label className="dsv1-lbl">billy <input className="dsv1-in" style=${{ width: '170px' }} value=${own} onChange=${e => setOwn(e.target.value)} aria-label="Numbers to sort, separated by commas" /></label></div>`}
      <${Code} lines=${lines} cur=${cur} />
      ${N > 0 && html`<${Cells} vals=${s.a} cls=${cls} mk=${N >= 2 ? s.a.map((_, k) => mk[k]) : null} />`}
      ${s.end && html`<div className="dsv1-out dsv1-pop"><small>output (one per line)</small>${s.a.join('\n')}</div>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${N >= 2 && html`<${SBar} n=${S.length} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── [6.0] slides 25–27: int a[3][4] as a table, its rows and its columns ── */
  function Grid2D({ ar }) {
    const S = [{ en: '<code>int a[3][4];</code> shown as a table: 3 rows (0..2) and 4 columns (0..3), a[0][0] to a[2][3].', ar: 'الـ <bdi dir="ltr">int&nbsp;a[3][4];</bdi> متعرض كجدول فيه 3 rows و4 columns، من <bdi dir="ltr">a[0][0]</bdi> لحد <bdi dir="ltr">a[2][3]</bdi>.' }];
    for (let r = 0; r < 3; r++) S.push({ r, en: `<b>Row ${r}</b> (slide 26): a[${r}][0] to a[${r}][3]. The first index is the row.`, ar: `الـ <b>row رقم ${r}</b> (slide 26) فيه من ${D('a[' + r + '][0]')} لحد ${D('a[' + r + '][3]')}. الـ index الأول هو الـ row.` });
    for (let c = 0; c < 4; c++) S.push({ c, en: `<b>Column ${c}</b> (slide 27): a[0][${c}] to a[2][${c}]. The second index is the column.`, ar: `الـ <b>column رقم ${c}</b> (slide 27) فيه من ${D('a[0][' + c + ']')} لحد ${D('a[2][' + c + ']')}. الـ index التاني هو الـ column.` });
    const [i, ctl] = useWalk(S.length, 1500, 0), [pick, setPick] = useState(null), s = S[i];
    const cap = pick ? { en: `a[${pick[0]}][${pick[1]}]: row ${pick[0]}, column ${pick[1]}.`, ar: `العنصر ${D('a[' + pick[0] + '][' + pick[1] + ']')} موجود في الـ row رقم ${D(pick[0])} والـ column رقم ${D(pick[1])}.` } : s;
    const on = (r, c) => pick ? (pick[0] === r || pick[1] === c) : (s.r === r || s.c === c);
    return html`<figure className="fig dsv1"><div className="fig-stage" style=${{ textAlign: 'center' }}>
      <div className="dsv1-g2" style=${{ gridTemplateColumns: 'auto repeat(4, minmax(0, 1fr))', width: '100%', maxWidth: '400px' }}>
        <span className="h">row</span>${[0, 1, 2, 3].map(c => html`<span key=${'c' + c} className="h">col ${c}</span>`)}
        ${[0, 1, 2].map(r => [html`<span key=${'r' + r} className="h">${r}</span>`, ...[0, 1, 2, 3].map(c => html`<button key=${r + '-' + c} className=${'e' + (on(r, c) ? ' on' : '') + (pick && pick[0] === r && pick[1] === c ? ' hot' : '')} onClick=${() => setPick([r, c])}>a[${r}][${c}]</button>`)])}
      </div><p className="dsv1-note">Tap an element.</p></div>
      <${Cap} ...${cap} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${{ go: k => { setPick(null); ctl.go(k); }, replay: () => { setPick(null); ctl.replay(); } }} /></figure>`;
  }

  /* ── [6.2] slide 28: locating x[i][j], row-major, position i·c + j ── */
  function RowMajor({ ar }) {
    const [r, setR] = useState(3), [c, setC] = useState(4), [ii, setI] = useState(2), [jj, setJ] = useState(1);
    const i = Math.min(ii, r - 1), j = Math.min(jj, c - 1), pos = i * c + j, ex = r === 3 && c === 4 && i === 2 && j === 1;
    const [st, ctl] = useWalk(4, 2400, [r, c, i, j].join());
    const S = [
      { en: `x has r = ${r} rows and c = ${c} columns. Where is <b>x[${i}][${j}]</b> in the 1D array?`, ar: `الـ x فيه ${D('r = ' + r)} rows و${D('c = ' + c)} columns. فين مكان ${D('x[' + i + '][' + j + ']')} في الـ 1D array؟` },
      { en: `Row-major: the rows are laid one after another in a 1D array. Each row has c = ${c} elements, so the rows start at 0, c, 2c, … = ${Array.from({ length: r }, (_, k) => k * c).join(', ')}.`, ar: `في الـ row-major الـ rows بتتحط ورا بعض في 1D array، وكل row فيه ${D('c = ' + c)} عناصر، فبدايات الـ rows هي:` + L(`0, c, 2c, … = ${Array.from({ length: r }, (_, k) => k * c).join(', ')}`) },
      { en: `There are i = ${i} rows before row ${i}, so i·c = ${i}·${c} = <b>${i * c}</b> elements come before x[${i}][0].`, ar: `قبل الـ row رقم ${D(i)} فيه ${D(i)} rows، فعدد العناصر اللي قبل ${D('x[' + i + '][0]')} هو:` + L(`i·c = ${i}·${c} = ${i * c}`) },
      { en: `Then j = ${j} more: x[${i}][${j}] is at position <b>i·c + j = ${i}·${c} + ${j} = ${pos}</b>.` + (ex ? ' (The notes\' example: int a[3][4], a[2][1] → 9.)' : ''), ar: `وبعدين نزوّد ${D('j = ' + j)}، فمكان ${D('x[' + i + '][' + j + ']')} هو:` + L(`i·c + j = ${i}·${c} + ${j} = ${pos}`) + (ex ? 'وده مثال الـ notes بتاع <bdi dir="ltr">int&nbsp;a[3][4]</bdi>.' : '') }
    ];
    const before = p => st >= 2 && p < i * c, tgt = p => st >= 3 && p === pos;
    return html`<figure className="fig dsv1"><div className="fig-stage" style=${{ textAlign: 'center' }}>
      <div className="dsv1-row"><${Stepper} label="r" v=${r} set=${setR} min=${1} max=${5} /><${Stepper} label="c" v=${c} set=${setC} min=${1} max=${5} /></div>
      <div className="dsv1-row"><${Stepper} label="i" v=${i} set=${setI} min=${0} max=${r - 1} /><${Stepper} label="j" v=${j} set=${setJ} min=${0} max=${c - 1} /></div>
      <div className="dsv1-row"><button className="fig-btn" aria-pressed=${String(ex)} onClick=${() => { setR(3); setC(4); setI(2); setJ(1); }}>Example from the notes: a[2][1]</button></div>
      <div className="dsv1-g2" style=${{ gridTemplateColumns: `repeat(${c}, minmax(0, 54px))` }}>
        ${Array.from({ length: r }, (_, a) => Array.from({ length: c }, (_, b) => { const p = a * c + b; return html`<span key=${p} className=${'e' + (tgt(p) ? ' on hot' : before(p) ? ' on' : st >= 2 ? ' dim' : '')} style=${{ cursor: 'default' }}>[${a}][${b}]</span>`; }))}</div>
      <div className=${'dsv1-strip dsv1-show' + (st >= 1 ? '' : ' off')}>${Array.from({ length: r }, (_, a) => html`<div key=${a} className="dsv1-run"><small>row ${a} @ ${a * c}</small><div>${Array.from({ length: c }, (_, b) => { const p = a * c + b; return html`<span key=${b} className=${'p ' + (a % 2 ? 'b' : 'a') + (before(p) ? ' on' : '') + (tgt(p) ? ' on hot' : '')}>${p}</span>`; })}</div></div>`)}</div>
      <p className="dsv1-note">top: x as a table · bottom: the 1D array (numbers = positions)</p></div>
      <${Cap} ...${S[st]} showAr=${ar} /><${SBar} n=${4} i=${st} ctl=${ctl} /></figure>`;
  }

  /* ── [6.3] slide 30: transpose, Mᵀ(j,i) = M(i,j) ── */
  function Transpose({ ar }) {
    const [txt, setTxt] = useState('1 2 3 / 4 5 6'), M = parseMat(txt);
    const m = M ? M.length : 0, n = M ? M[0].length : 0, n1 = m * n + 2;
    const [s, ctl] = useWalk(M ? n1 : 1, 1300, txt);
    let en, a, ci = -1, cj = -1;
    if (!M) { en = 'Type a matrix: numbers in a row separated by spaces, rows separated by /, up to 4×4.'; a = 'اكتب matrix: الأرقام في الـ row بينها مسافات، والـ rows بينها علامة /، لحد <bdi dir="ltr">4×4</bdi>.'; }
    else if (s === 0) { en = `M is ${m}×${n}; its transpose Mᵀ is ${n}×${m}, with Mᵀ(j,i) = M(i,j). Matrices are indexed from 1.`; a = `الـ M مقاسها ${D(m + '×' + n)}، والـ transpose بتاعها مقاسه ${D(n + '×' + m)}، والقاعدة:` + L('Mᵀ(j,i) = M(i,j)') + 'والـ matrices الـ index بتاعها بيبدأ من 1.'; }
    else if (s <= m * n) { ci = Math.floor((s - 1) / n); cj = (s - 1) % n; const v = M[ci][cj];
      en = `M(${ci + 1},${cj + 1}) = ${v} goes to Mᵀ(${cj + 1},${ci + 1}).`; a = 'العنصر ده بيروح مكانه الجديد:' + L(`M(${ci + 1},${cj + 1}) = ${v} → Mᵀ(${cj + 1},${ci + 1})`); }
    else { en = 'Done: every row of M became a column of Mᵀ.'; a = 'خلصنا: كل row في الـ M بقى column في الـ Mᵀ.'; }
    const done = (i, j) => s > m * n || (i * n + j) < s;
    const MT = M ? Array.from({ length: n }, (_, j) => Array.from({ length: m }, (_, i) => done(i, j) ? M[i][j] : '')) : null;
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <div className="dsv1-row"><label className="dsv1-lbl">M <input className="dsv1-in" style=${{ width: '170px' }} value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="Matrix M, rows separated by slash" /></label></div>
      ${M && html`<div className="dsv1-mats"><${Mat} M=${M} label=${`M (${m}×${n})`} base=${1} cls=${(i, j) => i === ci && j === cj ? 'on hot' : done(i, j) && s > 0 ? 'on' : ''} />
        <span className="dsv1-op">→</span><${Mat} M=${MT} label=${`Mᵀ (${n}×${m})`} base=${1} cls=${(j, i) => i === ci && j === cj ? 'on hot' : MT[j][i] !== '' ? 'on' : ''} /></div>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${M && html`<${SBar} n=${n1} i=${s} ctl=${ctl} />`}</figure>`;
  }

  /* ── [6.4] slide 30: addition, same dimensions only ── */
  function MatAdd({ ar }) {
    const [ta, setA] = useState('1 2 / 3 4'), [tb, setB] = useState('5 6 / 7 8'), A = parseMat(ta), B = parseMat(tb);
    const ok = A && B && A.length === B.length && A[0].length === B[0].length, m = ok ? A.length : 0, n = ok ? A[0].length : 0;
    const [s, ctl] = useWalk(ok ? m * n + 1 : 1, 1400, ta + '|' + tb);
    let en, a, ci = -1, cj = -1;
    if (!A || !B) { en = 'Type both matrices: numbers separated by spaces, rows by /, up to 4×4.'; a = 'اكتب الـ matrices الاتنين: الأرقام بينها مسافات والـ rows بينها علامة /.'; }
    else if (!ok) { en = `A is ${A.length}×${A[0].length} and B is ${B.length}×${B[0].length}: the sum is only defined for matrices that have <b>the same dimensions</b>.`; a = `الـ A مقاسها ${D(A.length + '×' + A[0].length)} والـ B مقاسها ${D(B.length + '×' + B[0].length)}، والجمع بيتعمل بس للـ matrices اللي ليها <b>نفس الأبعاد</b>.`; }
    else if (s === 0) { en = `A and B are both ${m}×${n}, so A + B is defined and is ${m}×${n}: C(i,j) = A(i,j) + B(i,j).`; a = `الـ A والـ B الاتنين مقاسهم ${D(m + '×' + n)}، فالجمع مسموح والناتج نفس المقاس:` + L('C(i,j) = A(i,j) + B(i,j)'); }
    else { ci = Math.floor((s - 1) / n); cj = (s - 1) % n; const x = A[ci][cj], y = B[ci][cj];
      en = `C(${ci + 1},${cj + 1}) = A(${ci + 1},${cj + 1}) + B(${ci + 1},${cj + 1}) = ${x} + ${y} = <b>${x + y}</b>.`; a = 'بنحسب العنصر ده:' + L(`C(${ci + 1},${cj + 1}) = ${x} + ${y} = ${x + y}`); }
    const C = ok ? A.map((r, i) => r.map((v, j) => (i * n + j) < s ? v + B[i][j] : '')) : null, hc = (i, j) => i === ci && j === cj ? 'on hot' : '';
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <div className="dsv1-row"><label className="dsv1-lbl">A <input className="dsv1-in" style=${{ width: '120px' }} value=${ta} onChange=${e => setA(e.target.value)} aria-label="Matrix A" /></label><label className="dsv1-lbl">B <input className="dsv1-in" style=${{ width: '120px' }} value=${tb} onChange=${e => setB(e.target.value)} aria-label="Matrix B" /></label></div>
      ${A && B && html`<div className="dsv1-mats"><${Mat} M=${A} label="A" base=${1} cls=${hc} /><span className="dsv1-op">+</span><${Mat} M=${B} label="B" base=${1} cls=${hc} />
        ${ok ? html`<span className="dsv1-op">=</span><${Mat} M=${C} label="C" base=${1} cls=${(i, j) => hc(i, j) || (C[i][j] !== '' ? 'on' : '')} />` : html`<span className="dsv1-err">✕ not defined</span>`}</div>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${ok && html`<${SBar} n=${m * n + 1} i=${s} ctl=${ctl} />`}</figure>`;
  }

  /* ── [6.5] slide 31: when is A×B defined, and its size ── */
  function MatDims({ ar }) {
    const [m, setM] = useState(2), [n, setN] = useState(3), [p, setP] = useState(3), [q, setQ] = useState(4), ok = n === p;
    const G = (r, c, cls) => html`<span className=${'dsv1-dots ' + (cls || '')} style=${{ gridTemplateColumns: `repeat(${c}, 13px)` }}>${Array.from({ length: r * c }, (_, k) => html`<i key=${k}></i>`)}</span>`;
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <div className="dsv1-row"><span className="dsv1-lbl"><b>A</b></span><${Stepper} label="rows" v=${m} set=${setM} min=${1} max=${5} /><${Stepper} label="cols" v=${n} set=${setN} min=${1} max=${5} /></div>
      <div className="dsv1-row"><span className="dsv1-lbl"><b>B</b></span><${Stepper} label="rows" v=${p} set=${setP} min=${1} max=${5} /><${Stepper} label="cols" v=${q} set=${setQ} min=${1} max=${5} /></div>
      <div className="dsv1-mats" style=${{ marginTop: '8px' }}>
        <div className="dsv1-mat"><small>A ${m}×${n}</small>${G(m, n)}</div><span className="dsv1-op">×</span>
        <div className="dsv1-mat"><small>B ${p}×${q}</small>${G(p, q)}</div><span className="dsv1-op">=</span>
        ${ok ? html`<div className="dsv1-mat dsv1-pop" key=${m + 'x' + q}><small>C ${m}×${q}</small>${G(m, q, 'c')}</div>` : html`<span className="dsv1-err">not defined</span>`}</div>
      <div className="dsv1-out" style=${{ textAlign: 'center' }}>${ok ? `${m}×${n} · ${n}×${q} → ${m}×${q}` : `columns of A (${n}) ≠ rows of B (${p})`}</div></div>
      <${Cap} en=${ok ? `Columns of A (${n}) = rows of B (${p}), so A×B is defined: an m×n matrix times an n×q matrix gives <b>${m}×${q}</b>.` : `Columns of A (${n}) ≠ rows of B (${p}), so A×B is <b>not defined</b>.`}
        ar=${ok ? 'عدد الـ columns بتاع A بيساوي عدد الـ rows بتاع B، فالضرب مسموح والناتج مقاسه:' + L(`${m}×${n} · ${n}×${q} → ${m}×${q}`) : 'عدد الـ columns بتاع A مش بيساوي عدد الـ rows بتاع B، فالضرب <b>مش مسموح</b>:' + L(`${n} ≠ ${p}`)} showAr=${ar} /></figure>`;
  }

  /* ── [7] slide 33: the professor's multiplication code traced ── */
  function MatMult({ ar }) {
    const [ta, setA] = useState('1 2 3 / 4 5 6'), [tb, setB] = useState('7 8 / 9 10 / 11 12'), A = parseMat(ta), B = parseMat(tb);
    const r1 = A ? A.length : 0, c1 = A ? A[0].length : 0, r2 = B ? B.length : 0, c2 = B ? B[0].length : 0, ok = A && B && c1 === r2;
    const S = React.useMemo(() => { const out = [{ t: 'chk' }]; if (!ok) return out; const mult = A.map(() => Array(c2).fill(''));
      for (let i = 0; i < r1; i++) for (let j = 0; j < c2; j++) { mult[i][j] = 0; out.push({ t: 'init', i, j, mult: mult.map(r => r.slice()) });
        for (let k = 0; k < c1; k++) { const p = mult[i][j]; mult[i][j] += A[i][k] * B[k][j]; out.push({ t: 'k', i, j, k, p, mult: mult.map(r => r.slice()) }); } }
      out.push({ t: 'end', mult: mult.map(r => r.slice()) }); return out; }, [ta, tb]);
    const [s, ctl] = useWalk(S.length, 1300, ta + '|' + tb), x = S[s];
    const lines = ['do {', '  cin >> r1 >> c1;', '  cin >> r2 >> c2;', '} while (c1 != r2);', 'for (i = 0; i < r1; ++i)', ' for (j = 0; j < c2; ++j) {', '  mult[i][j] = 0;', '  for (k = 0; k < c1; ++k)', '   mult[i][j]+=a[i][k]*b[k][j];', ' }'];
    let en, a, cur = -1;
    if (!A || !B) { en = 'Type both matrices: numbers separated by spaces, rows by /, up to 4×4.'; a = 'اكتب الـ matrices الاتنين: الأرقام بينها مسافات والـ rows بينها علامة /.'; }
    else if (x.t === 'chk') { cur = 3;
      if (ok) { en = `r1 = ${r1}, c1 = ${c1}, r2 = ${r2}, c2 = ${c2}: <code>c1 != r2</code> is false, so the do-while ends; mult will be ${r1}×${c2}.`; a = 'المقاسات:' + L(`r1 = ${r1}, c1 = ${c1}, r2 = ${r2}, c2 = ${c2}`) + `والشرط ${D('c1 != r2')} طلع false، فالـ do-while بيخلص والناتج مقاسه ${D(r1 + '×' + c2)}.`; }
      else { en = `c1 = ${c1}, r2 = ${r2}: <code>c1 != r2</code> is true, so the loop asks for the sizes again ("column of first matrix must equal rows of second"). These cannot be multiplied.`; a = `الشرط ${D('c1 != r2')} طلع true لأن:` + L(`c1 = ${c1} ≠ r2 = ${r2}`) + 'فالـ loop بيطلب المقاسات تاني، والـ matrices دي مينفعش تتضرب.'; } }
    else if (x.t === 'init') { cur = 6; en = `i = ${x.i}, j = ${x.j}: <code>mult[${x.i}][${x.j}] = 0</code>.`; a = `لما ${D('i = ' + x.i)} و${D('j = ' + x.j)} بنبدأ العنصر ده بصفر:` + L(`mult[${x.i}][${x.j}] = 0`); }
    else if (x.t === 'k') { cur = 8; const av = A[x.i][x.k], bv = B[x.k][x.j], c = x.mult[x.i][x.j];
      en = `k = ${x.k}: mult[${x.i}][${x.j}] += a[${x.i}][${x.k}] * b[${x.k}][${x.j}] → ${x.p} + ${av}·${bv} = <b>${c}</b>.` + (x.k === c1 - 1 ? ' This element is done.' : '');
      a = `لما ${D('k = ' + x.k)} بنزوّد حاصل الضرب ده:` + L(`mult[${x.i}][${x.j}] = ${x.p} + ${av}×${bv} = ${c}`) + (x.k === c1 - 1 ? 'وكده العنصر ده خلص.' : ''); }
    else { en = `Done: mult = A×B, a ${r1}×${c2} matrix. Each element C(i,j) is the sum over k of A(i,k)·B(k,j).`; a = `خلصنا: الـ mult بقى هو حاصل ضرب A في B، ومقاسه ${D(r1 + '×' + c2)}. وكل عنصر هو مجموع حواصل الضرب دي:` + L('C(i,j) = Σ A(i,k)·B(k,j)'); }
    const act = x.t === 'k' || x.t === 'init', ca = (i, k) => !act ? '' : i !== x.i ? 'dim' : x.t === 'k' && k === x.k ? 'on hot' : 'on';
    const cb = (k, j) => !act ? '' : j !== x.j ? 'dim' : x.t === 'k' && k === x.k ? 'on hot' : 'on';
    const M = ok ? (x.mult || A.map(() => Array(c2).fill(''))) : null;
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <div className="dsv1-row"><label className="dsv1-lbl">a <input className="dsv1-in" style=${{ width: '160px' }} value=${ta} onChange=${e => setA(e.target.value)} aria-label="Matrix a" /></label><label className="dsv1-lbl">b <input className="dsv1-in" style=${{ width: '200px' }} value=${tb} onChange=${e => setB(e.target.value)} aria-label="Matrix b" /></label></div>
      <${Code} lines=${lines} cur=${cur} />
      ${A && B && html`<div className="dsv1-mats"><${Mat} M=${A} label=${`a (${r1}×${c1})`} cls=${ca} /><span className="dsv1-op">×</span><${Mat} M=${B} label=${`b (${r2}×${c2})`} cls=${cb} />
        ${ok ? html`<span className="dsv1-op">=</span><${Mat} M=${M} label="mult" cls=${(i, j) => act && i === x.i && j === x.j ? 'on hot' : M[i][j] !== '' ? 'on' : ''} />` : html`<span className="dsv1-err">c1 ≠ r2</span>`}</div>`}
      ${act && html`<p className="dsv1-note" style=${{ fontFamily: 'var(--mono)' }}>i = ${x.i}  j = ${x.j}${x.t === 'k' ? '  k = ' + x.k : ''}</p>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} />${ok && html`<${SBar} n=${S.length} i=${s} ctl=${ctl} />`}</figure>`;
  }

  /* ── [8.0]–[8.1] slides 34, 36: array (same type) vs struct (different types and lengths) ── */
  function StructVsArray({ ar }) {
    const S = [
      { en: 'An <b>array</b>: elements of the <b>same type</b> (here int arr[5]), each the same size, reached by an integer index: arr[0] … arr[4].', ar: 'الـ <b>array</b> عناصره كلها من <b>نفس النوع</b> (هنا <bdi dir="ltr">int&nbsp;arr[5]</bdi>) ونفس الحجم، وبنوصلها بـ index رقم، من <bdi dir="ltr">arr[0]</bdi> لحد <bdi dir="ltr">arr[4]</bdi>.' },
      { en: 'A <b>struct</b> (a <b>record</b>): members (<b>fields</b>) of <b>different types and lengths</b> grouped under one name, reached by name with the dot. movies_t of slide 36: title is char[10] (10 characters), year is an int.', ar: 'الـ <b>struct</b> (اسمه كمان <b>record</b>) فيه members (اسمها <b>fields</b>) من <b>أنواع وأطوال مختلفة</b> متجمعة تحت اسم واحد، وبنوصلها بالاسم والـ dot. في الـ movies_t بتاع slide 36 الـ title عبارة عن 10 characters والـ year عبارة عن int.' }
    ];
    const [i, ctl] = useWalk(2, 3200, 0);
    return html`<figure className="fig dsv1"><div className="fig-stage"><div className="dsv1-cmp">
      <div className=${'dsv1-box' + (i === 0 ? '' : '')}><b>int arr[5];</b><${Cells} vals=${['int', 'int', 'int', 'int', 'int']} cls=${{ 0: 'on', 1: 'on', 2: 'on', 3: 'on', 4: 'on' }} /></div>
      <div className=${'dsv1-box dsv1-show' + (i >= 1 ? '' : ' off')}><b>struct movies_t { char title[10]; int year; }</b>
        <div className="dsv1-mem"><div><small>title (char[10])</small><span className="dsv1-tiny">${Array.from({ length: 10 }, (_, k) => html`<i key=${k}></i>`)}</span><small>films[0].title</small></div>
          <div><small>year (int)</small><span className="dsv1-v on" style=${{ height: '28px', fontSize: '.8rem' }}>int</span><small>films[0].year</small></div></div></div>
      </div></div><${Cap} ...${S[i]} showAr=${ar} /><${SBar} n=${2} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [8.2] slides 34–35: two ways to declare the objects, members with the dot ── */
  function StructObjects({ ar }) {
    const [w, setW] = useState('1'), [pick, setPick] = useState(null);
    const code = w === '1' ? ['struct product {', '  int weight;', '  float price;', '} apple, banana, melon;'] : ['struct product {', '  int weight;', '  float price;', '};', 'product apple;', 'product banana, melon;'];
    const O = ['apple', 'banana', 'melon'], F = [['weight', 'int'], ['price', 'float']];
    const wEn = w === '1' ? 'Way 1: the objects are declared right after the closing brace.' : 'Way 2: the type first, then the objects declared separately.';
    const wAr = w === '1' ? 'الطريقة الأولى: الـ objects بتتعرف بعد القوس اللي بيقفل على طول.' : 'الطريقة التانية: الـ type الأول، وبعدين الـ objects لوحدهم.';
    const en = wEn + ' Both give the same three objects, each with its own weight and price. ' + (pick ? `<b>${pick[0]}.${pick[1]}</b>: the ${pick[1]} member (${pick[1] === 'weight' ? 'int' : 'float'}) of the object ${pick[0]}.` : 'Tap a member to access it with the dot.');
    const a = wAr + ' والاتنين بيعملوا نفس التلات objects، وكل واحد ليه weight و price بتوعه. ' + (pick ? `والـ ${D(pick[0] + '.' + pick[1])} معناه الـ member اللي اسمه ${pick[1]} جوه الـ object اللي اسمه ${pick[0]}.` : 'دوس على member عشان توصله بالـ dot.');
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <${Modes} list=${[['1', 'Way 1'], ['2', 'Way 2']]} mode=${w} set=${setW} />
      <${Code} lines=${code} cur=${w === '1' ? 3 : [4, 5]} />
      <div className="dsv1-objs">${O.map(o => html`<div key=${o} className="dsv1-obj"><b>${o}</b>${F.map(([f, t]) => html`<div key=${f} className=${pick && pick[0] === o && pick[1] === f ? 'on' : ''}>${t} ${f}</div>`)}</div>`)}</div>
      <div className="dsv1-chips">${O.map(o => F.map(([f]) => html`<button key=${o + f} className="fig-btn" aria-pressed=${String(!!pick && pick[0] === o && pick[1] === f)} onClick=${() => setPick([o, f])}>${o}.${f}</button>`))}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [8.3] slides 36–37: arrays of structs ── */
  function StructArray({ ar }) {
    const [mode, setMode] = useState('p'), [inp, setInp] = useState([['Ali', '90'], ['Mona', '85']]);
    const D3 = {
      p: { arr: 'product_name', f: ['weight', 'price'], dec: ['#define N_MOVIES 3', 'struct product {', '  int weight;', '  float price;', '} product_name[N_MOVIES];'], rows: [['2', '2.4'], ['3', '5.6'], ['7', '15.2']] },
      f: { arr: 'films', f: ['title', 'year'], dec: ['#define N_MOVIES 3', 'struct movies_t {', '  char title[10];', '  int year;', '} films[N_MOVIES];'], rows: [['"samy"', '2021'], ['"ali"', '2023'], ['"abas"', '2019']] }
    };
    let lines, steps = [], rowsN, F, nm;
    if (mode !== 's') { const d = D3[mode]; nm = d.arr; F = d.f; rowsN = 3;
      d.rows.forEach((r, k) => r.forEach((v, q) => steps.push({ k, q, v, line: `${d.arr}[${k}].${d.f[q]}=${v};` })));
      lines = d.dec.concat(steps.map(s => s.line)); }
    else { nm = 'Student'; F = ['name', 'mark']; rowsN = 2;
      inp.forEach((r, k) => r.forEach((v, q) => steps.push({ k, q, v: q ? String(parseInt(v, 10) || 0) : (v.split(/\s+/)[0] || '?'), line: `cin >> Student[${k}].${F[q]};` })));
      lines = ['struct StudentRec {', '  string name;', '  int mark;', '} Student[2];', 'for (int i=0; i<2 ; i++)', '{ cin >>Student[i].name;', '  cin >>Student[i].mark; }', 'for (int i=0; i<2 ; i++)', ' cout << "\\n" << Student[i].name', '      << Student[i].mark;']; }
    const n = steps.length + 1 + (mode === 's' ? 1 : 0), [i, ctl] = useWalk(n, 1400, mode + JSON.stringify(inp));
    const filled = Array.from({ length: rowsN }, () => ['', '']); steps.slice(0, i).forEach(s => { filled[s.k][s.q] = s.v; });
    const cs = i >= 1 && i <= steps.length ? steps[i - 1] : null, outStep = mode === 's' && i === n - 1;
    let en, a, cur;
    if (i === 0) { en = mode === 's' ? 'Slide 37: <b>Student[2]</b> is an array of 2 StudentRec structs. The program reads a name and a mark for each, then prints them. Type the input in the boxes.' : `Slide 36: <b>${nm}[N_MOVIES]</b> is an array of 3 structs; each element has the members ${F[0]} and ${F[1]}.`;
      a = mode === 's' ? 'في slide 37 الـ <bdi dir="ltr">Student[2]</bdi> عبارة عن array فيه 2 structs من نوع StudentRec. البرنامج بيقرا name و mark لكل واحد وبعدين يطبعهم. اكتب الـ input في الخانات.' : `في slide 36 الـ ${D(nm + '[N_MOVIES]')} عبارة عن array فيه 3 structs، وكل عنصر فيه member اسمه ${F[0]} و member اسمه ${F[1]}.`; cur = mode === 's' ? [0, 1, 2, 3] : [0, 1, 2, 3, 4]; }
    else if (cs) { en = `<code>${esc(cs.line)}</code>: element ${cs.k} of the array, member <b>${F[cs.q]}</b> = ${esc(cs.v)}.`; a = 'السطر ده:' + L(esc(cs.line)) + `بيحط القيمة في الـ member اللي اسمه ${F[cs.q]} في العنصر رقم ${D(cs.k)} من الـ array.`; cur = mode === 's' ? (cs.q ? 6 : 5) : 5 + steps.indexOf(cs); }
    else { const o = filled.map(r => r[0] + r[1]).join('\n'); en = `The second loop prints each <b>Student[i].name</b> then <b>Student[i].mark</b> with nothing between them: ${filled.map(r => esc(r[0] + r[1])).join(', ')}.`; a = 'الـ loop التانية بتطبع الـ name وبعده الـ mark على طول من غير مسافة:' + L(filled.map(r => esc(r[0] + r[1])).join(', ')); cur = [7, 8, 9]; }
    const setCell = (k, q, v) => setInp(inp.map((r, kk) => kk === k ? r.map((x, qq) => qq === q ? v : x) : r));
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <${Modes} list=${[['p', 'product_name'], ['f', 'films'], ['s', 'Student (your input)']]} mode=${mode} set=${setMode} />
      ${mode === 's' && html`<div className="dsv1-row">${inp.map((r, k) => html`<span key=${k} className="dsv1-lbl">input ${k + 1} <input className="dsv1-in" style=${{ width: '74px' }} value=${r[0]} onChange=${e => setCell(k, 0, e.target.value)} aria-label=${'Name ' + (k + 1)} /><input className="dsv1-in" style=${{ width: '52px' }} inputMode="numeric" value=${r[1]} onChange=${e => setCell(k, 1, e.target.value)} aria-label=${'Mark ' + (k + 1)} /></span>`)}</div>`}
      <${Code} lines=${lines} cur=${cur} />
      <table className="dsv1-tb"><thead><tr><th>${nm}[i]</th><th>.${F[0]}</th><th>.${F[1]}</th></tr></thead><tbody>
        ${filled.map((r, k) => html`<tr key=${k} className=${cs && cs.k === k ? 'cur' : ''}><td>[${k}]</td><td>${r[0]}</td><td>${r[1]}</td></tr>`)}</tbody></table>
      ${mode === 's' && html`<div className="dsv1-out"><small>output</small>${outStep ? '\n' + filled.map(r => r[0] + r[1]).join('\n') : ''}</div>`}</div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><${SBar} n=${n} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [8.4] slide 38: passing a struct to a function (by value, a copy) ── */
  function StructPass({ ar }) {
    const lines = ['struct Employee {', '  int id;', '  double salary;', '};', 'void printInfo(Employee emp) {', '  cout << emp.id;', '  cout << emp.salary;', '}', 'Employee e1 = {1, 1000};', 'printInfo(e1);'];
    const S = [
      { cur: 8, out: '', en: '<code>Employee e1 = {1, 1000};</code>: e1.id = 1 and e1.salary = 1000.', ar: 'السطر ده بيعمل الـ e1 وبيدّيله القيم دي:' + L('e1.id = 1, e1.salary = 1000') },
      { cur: [9, 4], out: '', emp: true, en: '<code>printInfo(e1);</code>: the struct is passed <b>by value</b>: the parameter emp gets a <b>copy</b> of e1.', ar: 'لما بننادي <bdi dir="ltr">printInfo(e1);</bdi> الـ struct بيتبعت <b>by value</b>، يعني الـ parameter اللي اسمه emp بياخد <b>نسخة</b> من e1.' },
      { cur: 5, out: '1', emp: true, en: '<code>cout &lt;&lt; emp.id;</code> prints 1.', ar: 'السطر <bdi dir="ltr">cout&nbsp;&lt;&lt;&nbsp;emp.id;</bdi> بيطبع 1.' },
      { cur: 6, out: '11000', emp: true, en: '<code>cout &lt;&lt; emp.salary;</code> prints 1000 right after it, with nothing in between, so the screen shows <b>11000</b>.', ar: 'السطر <bdi dir="ltr">cout&nbsp;&lt;&lt;&nbsp;emp.salary;</bdi> بيطبع 1000 بعده على طول من غير مسافة، فالشاشة بتبان كده:' + L('11000') }
    ];
    const [i, ctl] = useWalk(S.length, 2400, 0), s = S[i];
    const Obj = (nm, hot) => html`<div className=${'dsv1-obj' + (hot ? ' dsv1-pop' : '')}><b>${nm}</b><div className=${i === 2 && nm === 'emp' ? 'on' : ''}>id = 1</div><div className=${i === 3 && nm === 'emp' ? 'on' : ''}>salary = 1000</div></div>`;
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <${Code} lines=${lines} cur=${s.cur} />
      <div className="dsv1-objs"><div className="dsv1-frame" style=${{ margin: 0 }}><b>main</b>${Obj('e1')}</div>
        ${s.emp && html`<div className="dsv1-frame dsv1-pop" style=${{ margin: 0 }}><b>printInfo (copy)</b>${Obj('emp', true)}</div>`}</div>
      <div className="dsv1-out"><small>output</small>${s.out}</div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [9] the exam pattern: array of Employee, total = salary + bonus - deduction ── */
  const EMP0 = [['Ali', '3000', '500', '200'], ['Mona', '4000', '300', '100'], ['Omar', '2500', '0', '150'], ['Sara', '3500', '700', '0']];
  function EmpTable({ ar }) {
    const [rows, setRows] = useState(EMP0), N = 4;
    const val = x => { const v = parseFloat(x); return Number.isFinite(v) ? v : 0; };
    const tot = rows.map(r => val(r[1]) + val(r[2]) - val(r[3])), nm = rows.map(r => (r[0].split(/\s+/)[0] || '?'));
    const [i, ctl] = useWalk(N + 2, 1900, JSON.stringify(rows));
    const lines = ['for (int i = 0; i < N; i++) {', '  cin >> e[i].name', '      >> e[i].salary', '      >> e[i].bonus', '      >> e[i].deduction;', '  e[i].total = e[i].salary', '    + e[i].bonus', '    - e[i].deduction;', '}', 'for (int i = 0; i < N; i++)', '  cout << e[i].name', '   << " total salary = "', '   << e[i].total << endl;'];
    let en, a, cur;
    if (i === 0) { en = '<code>Employee e[N];</code> with N = 4: an array of 4 structs (name, salary, bonus, deduction, total). The table holds a sample input: type your own values.'; a = 'الـ <bdi dir="ltr">Employee&nbsp;e[N];</bdi> مع <bdi dir="ltr">N&nbsp;=&nbsp;4</bdi> عبارة عن array فيه 4 structs. الجدول فيه input تجريبي، وتقدر تكتب قيمك.'; cur = -1; }
    else if (i <= N) { const k = i - 1, r = rows[k];
      en = `i = ${k}: cin reads ${esc(nm[k])}, ${val(r[1])}, ${val(r[2])}, ${val(r[3])}; then e[${k}].total = ${val(r[1])} + ${val(r[2])} - ${val(r[3])} = <b>${cout(tot[k])}</b>.`;
      a = `لما ${D('i = ' + k)} الـ cin بيقرا داتا الموظف ده، وبعدين الـ total بيتحسب كده:` + L(`e[${k}].total = ${val(r[1])} + ${val(r[2])} - ${val(r[3])} = ${cout(tot[k])}`); cur = [1, 2, 3, 4, 5, 6, 7]; }
    else { en = 'The second loop prints each employee\'s name and total salary.'; a = 'الـ loop التانية بتطبع اسم كل موظف والـ total salary بتاعه.'; cur = [9, 10, 11, 12]; }
    const setCell = (k, q, v) => setRows(rows.map((r, kk) => kk === k ? r.map((x, qq) => qq === q ? v : x) : r));
    return html`<figure className="fig dsv1"><div className="fig-stage">
      <table className="dsv1-emp"><thead><tr><th style=${{ width: '24%' }}>name</th><th>salary</th><th>bonus</th><th>deduct.</th><th>total</th></tr></thead><tbody>
        ${rows.map((r, k) => html`<tr key=${k} className=${i - 1 === k ? 'cur' : ''}>${r.map((v, q) => html`<td key=${q}><input value=${v} onChange=${e => setCell(k, q, e.target.value)} inputMode=${q ? 'decimal' : 'text'} aria-label=${['name', 'salary', 'bonus', 'deduction'][q] + ' of employee ' + (k + 1)} /></td>`)}<td className="t">${i > k ? cout(tot[k]) : ''}</td></tr>`)}</tbody></table>
      <div className="dsv1-row"><button className="fig-btn" onClick=${() => setRows(EMP0)}>Sample input</button></div>
      <${Code} lines=${lines} cur=${cur} />
      <div className="dsv1-out"><small>output</small>${i === N + 1 ? rows.map((_, k) => `${nm[k]} total salary = ${cout(tot[k])}`).join('\n') : ''}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><${SBar} n=${N + 2} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ds-data-flow': DataFlow, 'ds-data-type': DataType, 'ds-classify': Classify, 'ds-ops': Ops, 'ds-adt': Adt,
    'ds-array-loc': ArrayLoc, 'ds-array-init': ArrayInit, 'ds-array-pass': ArrayPass, 'ds-array-size': ArraySize,
    'ds-sum-avg': SumAvg, 'ds-sort-trace': SortTrace, 'ds-2d-grid': Grid2D, 'ds-row-major': RowMajor,
    'ds-transpose': Transpose, 'ds-mat-add': MatAdd, 'ds-mat-dims': MatDims, 'ds-mat-mult': MatMult,
    'ds-struct-vs-array': StructVsArray, 'ds-struct-objects': StructObjects, 'ds-struct-array': StructArray, 'ds-struct-pass': StructPass, 'ds-emp-table': EmpTable
  });
})();
/* ── part L2 ── */
// Data Structures visuals, Lecture 2 (Stack using arrays): the add/remove pictures of slides 4–5, real-life stacks (undo, back), string reversal, underflow/overflow conditions, static vs dynamic, display/count/search/get traced, the Lab 3 dynamic-array menu, Stack_Copy and sum/average, and the push statement order (exam pattern). push/pop themselves are already animated on the page (viz.js) and are not redone. Every label and number comes from the site's notes and the slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm } = window.FIGKIT;
  const CSS = `
.dsv2 *{ font-variant-ligatures:none; }
.dsv2 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dsv2 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv2-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dsv2-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dsv2-row{ display:flex; flex-wrap:wrap; gap:8px 12px; justify-content:center; align-items:flex-start; margin:6px 0; }
.dsv2-mid{ align-items:center; }
.dsv2-vs{ display:inline-flex; flex-direction:column; gap:3px; }
.dsv2-vt{ font-size:.86rem; font-weight:700; text-align:center; color:var(--ink); margin-bottom:2px; }
.dsv2-vr{ display:grid; align-items:center; gap:6px; }
.dsv2-ix{ font:.8rem var(--mono); color:var(--graphite); text-align:right; }
.dsv2-cell{ height:32px; padding:0 3px; box-sizing:border-box; display:grid; place-items:center; border:2px solid var(--ink); border-radius:3px; background:var(--paper); color:var(--ink); font:600 .95rem var(--mono); white-space:nowrap; overflow:hidden; transition:background .35s, box-shadow .35s, opacity .35s; }
.dsv2-cell.on{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
.dsv2-cell.new{ background:color-mix(in srgb, var(--fig-k) 42%, var(--paper)); box-shadow:0 0 0 2px var(--fig-k); }
.dsv2-cell.hot{ box-shadow:0 0 0 3px var(--fig-k); }
.dsv2-cell.ok{ box-shadow:0 0 0 3px var(--ok); }
.dsv2-cell.bad{ box-shadow:0 0 0 3px var(--pen); }
.dsv2-cell.out{ border-style:dashed; border-color:var(--pen); }
.dsv2-cell.dim{ opacity:.4; }
.dsv2-tp{ font:700 .8rem var(--mono); color:var(--fig-k); white-space:nowrap; min-width:78px; }
.dsv2-neg{ font:700 .8rem var(--mono); color:var(--fig-k); min-height:1.3em; white-space:nowrap; }
.dsv2-sub{ font:.8rem var(--mono); color:var(--graphite); text-align:center; margin-top:3px; }
.dsv2-lab{ font-size:.92rem; font-weight:700; text-align:center; color:var(--ink); margin-top:8px; }
.dsv2-chip{ display:inline-block; padding:3px 10px; border-radius:99px; border:1px solid var(--line); background:var(--paper); font:600 .86rem var(--mono); color:var(--ink); }
.dsv2-chip.k{ border-color:var(--fig-k); color:var(--fig-k); }
.dsv2-pop{ animation:dsv2-in .45s ease both; }
@keyframes dsv2-in{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }
.dsv2-fly{ animation:dsv2-fly .7s ease both; }
@keyframes dsv2-fly{ from{ opacity:1; transform:none; } to{ opacity:.55; transform:translateX(10px); } }
.dsv2-code{ margin:0 auto 8px; max-width:440px; padding:8px 10px; border:1px solid var(--line); border-radius:8px; background:var(--paper); font:.8rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv2-code span{ display:block; border-radius:3px; padding:0 3px; transition:background .3s; }
.dsv2-code span.cur{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.dsv2-out{ max-width:440px; margin:8px auto 0; padding:6px 10px; border:1px solid var(--line); border-left:4px solid var(--fig-k); border-radius:6px; background:var(--paper); font:600 .84rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; min-height:1.5em; text-align:left; direction:ltr; }
.dsv2-out small{ display:block; font:600 .75rem var(--body); color:var(--graphite); }
.dsv2-err{ color:var(--pen); }
.dsv2-in{ font:.9rem var(--mono); padding:4px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:32px; max-width:100%; box-sizing:border-box; }
.dsv2-lbl{ font-size:.85rem; color:var(--graphite); display:inline-flex; gap:6px; align-items:center; flex-wrap:wrap; justify-content:center; }
.dsv2-cnt{ font-size:.85rem; color:var(--graphite); }
.dsv2-note{ font-size:.82rem; color:var(--graphite); text-align:center; margin:6px 0 0; line-height:1.4; }
.dsv2-chars{ display:flex; flex-wrap:wrap; gap:3px; justify-content:center; align-items:center; min-height:32px; }
.dsv2-chars > b{ font-size:.82rem; color:var(--graphite); margin-right:4px; font-weight:600; }
.dsv2-chars span{ min-width:26px; height:28px; display:grid; place-items:center; border:1px solid var(--line); border-radius:5px; background:var(--paper); color:var(--ink); font:600 .9rem var(--mono); transition:background .3s, box-shadow .3s, opacity .3s; }
.dsv2-chars span.hot{ box-shadow:0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); }
.dsv2-chars span.dim{ opacity:.35; }
.dsv2-ed{ max-width:440px; margin:0 auto 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); padding:6px 10px; font:.92rem var(--mono); min-height:1.6em; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv2-ed small{ display:block; font:600 .75rem var(--body); color:var(--graphite); }
.dsv2-tb{ border-collapse:collapse; margin:8px auto 0; font-size:.84rem; color:var(--ink); max-width:100%; }
.dsv2-tb th, .dsv2-tb td{ border:1px solid var(--line); padding:4px 6px; text-align:left; background:var(--paper); font-family:var(--mono); }
.dsv2-tb th{ font-family:var(--body); font-weight:600; background:color-mix(in srgb, var(--fig-k) 12%, var(--paper)); }
.dsv2-tb td.t{ color:var(--ok); font-weight:700; } .dsv2-tb td.f{ color:var(--graphite); } .dsv2-tb td.x{ color:var(--pen); font-weight:700; }
.dsv2-two{ display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px; max-width:440px; margin:0 auto; }
.dsv2-box{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 6px; color:var(--ink); text-align:center; display:flex; flex-direction:column; align-items:center; }
.dsv2-box > b{ display:block; font-size:.85rem; margin-bottom:6px; line-height:1.25; }
.dsv2-box > small{ display:block; font-size:.78rem; color:var(--graphite); margin-top:6px; line-height:1.35; }
.dsv2-node{ display:grid; grid-template-columns:44px 30px; border:2px solid var(--ink); border-radius:4px; background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); font:600 .9rem var(--mono); color:var(--ink); }
.dsv2-node span{ display:grid; place-items:center; height:28px; } .dsv2-node span + span{ border-left:2px solid var(--ink); font-size:.8rem; }
.dsv2-link{ font:.85rem/1 var(--mono); color:var(--graphite); height:14px; text-align:center; }
.dsv2-null{ font:600 .8rem var(--mono); color:var(--graphite); }
.dsv2-msg{ font:700 .84rem var(--mono); color:var(--pen); min-height:1.3em; margin-top:4px; }
.dsv2 .fig-bar .dsv2-cnt{ white-space:nowrap; }
@media (prefers-reduced-motion: reduce){ .dsv2-pop, .dsv2-fly{ animation:none; } .dsv2-cell, .dsv2-code span, .dsv2-chars span{ transition:none; } }`;
  if (!document.getElementById('dsv2-css')) { const s = document.createElement('style'); s.id = 'dsv2-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* helpers */
  const L = s => `<span class="ltr">${s}</span>`;
  const D = s => `<bdi dir="ltr">${String(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const ints = s => String(s).split(/[\s,]+/).filter(Boolean).map(x => parseInt(x, 10)).filter(Number.isFinite);
  // what cout prints for a float (6 significant digits)
  const cout = x => String(Number(x.toPrecision(6)));
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  const SBar = ({ n, i, ctl }) => html`<div className="fig-bar">
    ${n <= 14 ? html`<div className="fig-dots" aria-hidden="true">${Array.from({ length: n }, (_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</div>` : html`<span className="dsv2-cnt">Step ${i + 1} / ${n}</span>`}
    <span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i >= n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;
  const Modes = ({ list, mode, set }) => html`<div className="dsv2-modes" role="group">${list.map(([k, l]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${l}</button>`)}</div>`;
  const Code = ({ lines, cur }) => html`<pre className="dsv2-code">${lines.map((l, k) => html`<span key=${k} className=${(Array.isArray(cur) ? cur.includes(k) : k === cur) ? 'cur' : ''}>${l || ' '}</span>`)}</pre>`;
  // a stack drawn upright as in slides 4–5: location numbers on the left, "← top = k" on the right
  // vals[k - lo] is the value at location k; top = -1 is drawn under location 0 unless lo = -1
  const VStack = ({ vals, top, cls, title, ix = true, arrow = true, cw = 48, lo = 0, sub }) => {
    const ks = vals.map((_, j) => lo + vals.length - 1 - j), cols = (ix ? '22px ' : '') + cw + 'px' + (arrow ? ' auto' : '');
    return html`<div className="dsv2-vs">
      ${title && html`<b className="dsv2-vt">${title}</b>`}
      ${ks.map(k => html`<div key=${k} className="dsv2-vr" style=${{ gridTemplateColumns: cols }}>
        ${ix && html`<span className="dsv2-ix">${k}</span>`}
        <span className=${'dsv2-cell ' + ((cls && cls[k]) || '')}>${vals[k - lo] == null ? '' : vals[k - lo]}</span>
        ${arrow && html`<span className="dsv2-tp">${top === k ? '← top = ' + k : ''}</span>`}</div>`)}
      ${arrow && lo === 0 && html`<div className="dsv2-neg" style=${{ paddingLeft: ix ? '28px' : '0' }}>${top === -1 ? '← top = -1' : ''}</div>`}
      ${sub && html`<div className="dsv2-sub">${sub}</div>`}</div>`;
  };
  const fill = (arr, n) => Array.from({ length: n }, (_, k) => arr[k] == null ? '' : arr[k]);

  /* ── [0.2] slides 4–5: adding items to a stack, removing items from the stack ── */
  function StackSlidePics({ ar }) {
    const S = [
      { v: [], top: -1, lab: 'Stack empty', sl: 4, en: 'Slide 4, <b>Stack empty</b>: locations 0 to 4 and nothing stored, so <b>top = -1</b> (below location 0).', ar: 'في slide 4 الـ stack فاضي: أماكنه من 0 لـ 4 ومفيهوش حاجة، فالـ top واقف تحت location 0:' + L('top = -1') },
      { v: [10], top: 0, nw: 0, lab: 'Insert first element', sl: 4, en: '<b>Insert first element</b> 10: top goes up by one to <b>top = 0</b> and 10 is stored there. The base (location 0) stays fixed.', ar: 'لما نضيف أول عنصر (10) الـ top بيزيد واحد والـ 10 بيتخزن مكانه:' + L('top = 0') + 'والـ base (يعني location 0) ثابت مكانه.' },
      { v: [10, 20], top: 1, nw: 1, lab: 'Insert second element', sl: 4, en: '<b>Insert second element</b> 20: top goes up again to <b>top = 1</b>, and 20 sits on top of 10.', ar: 'لما نضيف العنصر التاني (20) الـ top بيزيد تاني، والـ 20 بيقعد فوق الـ 10:' + L('top = 1') },
      { v: [10, 20], top: 1, lab: 'Stack Initially', sl: 5, en: 'Slide 5 starts from the same stack: 10 and 20 with <b>top = 1</b>. Now the items are removed.', ar: 'في slide 5 بنبدأ من نفس الـ stack (10 و 20) والـ top واقف على 1. دلوقتي هنشيل العناصر.' },
      { v: [10], top: 0, gone: 20, lab: 'Element 20 deleted', sl: 5, en: '<b>Element 20 deleted</b>: the last one in is the first one out. top goes down to <b>top = 0</b>.', ar: 'العنصر 20 اتمسح: آخر واحد دخل هو أول واحد يطلع. والـ top نزل واحد:' + L('top = 0') },
      { v: [], top: -1, gone: 10, lab: 'Element 10 deleted', sl: 5, en: '<b>Element 10 deleted</b>: the stack is empty again, <b>top = -1</b>. 10 went in first and came out last: LIFO.', ar: 'العنصر 10 اتمسح والـ stack رجع فاضي:' + L('top = -1') + 'والـ 10 دخل الأول وطلع الآخر، وده معنى الـ LIFO.' }
    ];
    const [i, ctl] = useWalk(S.length, 2300, 0), s = S[i];
    const cls = {}; s.v.forEach((_, k) => { cls[k] = k === s.nw ? 'new' : 'on'; });
    return html`<figure className="fig dsv2"><div className="fig-stage">
      <div className="dsv2-row" style=${{ marginBottom: '8px' }}><span className="dsv2-chip k">${s.sl === 4 ? 'Slide 4: Adding items to a stack' : 'Slide 5: Removing items from the stack'}</span></div>
      <div className="dsv2-row dsv2-mid">
        <${VStack} vals=${fill(s.v, 5)} top=${s.top} cls=${cls} />
        <div style=${{ minWidth: '74px', textAlign: 'center' }}>${s.gone != null && html`<span key=${i} className="dsv2-chip dsv2-fly">pop → ${s.gone}</span>`}</div>
      </div>
      <div key=${'l' + i} className="dsv2-lab dsv2-pop">${s.lab}</div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.3] slide 3: real-life stacks: undo/redo in a text editor, the browser's back button ── */
  function StackRealLife({ ar }) {
    const [mode, setMode] = useState('ed'), [word, setWord] = useState('stack');
    const [ed, setEd] = useState({ u: ['Last', 'In', 'First', 'Out'], r: [], last: null });
    const [br, setBr] = useState({ h: ['site 1', 'site 2', 'site 3'], n: 4, last: null });
    const MAX = 6;
    let body, c;
    if (mode === 'ed') {
      const typeW = () => { const w = word.trim().split(/\s+/)[0]; if (!w || ed.u.length >= MAX) return; setEd({ u: ed.u.concat(w.slice(0, 8)), r: [], last: ['t', w.slice(0, 8)] }); };
      const undo = () => { if (!ed.u.length) return; const w = ed.u[ed.u.length - 1]; setEd({ u: ed.u.slice(0, -1), r: ed.r.concat(w), last: ['u', w] }); };
      const redo = () => { if (!ed.r.length || ed.u.length >= MAX) return; const w = ed.r[ed.r.length - 1]; setEd({ u: ed.u.concat(w), r: ed.r.slice(0, -1), last: ['r', w] }); };
      const lw = ed.last && esc(ed.last[1]);
      c = !ed.last ? { en: 'Text editors keep what you typed on a stack. Here the words <b>Last In First Out</b> were typed one by one. Press <b>Undo</b>: which word goes first?', ar: 'الـ text editors بتحط اللي بتكتبه في stack. هنا الكلمات دي اتكتبت واحدة ورا التانية:' + L('Last In First Out') + 'دوس <b>Undo</b> وشوف أنهي كلمة هتتشال الأول.' }
        : ed.last[0] === 'u' ? { en: `<b>Undo</b> pops the last word typed, <b>${lw}</b>, from the top of the undo stack and pushes it on the redo stack.`, ar: `الـ <b>Undo</b> بيعمل pop لآخر كلمة اتكتبت (${D(lw)}) من فوق الـ undo stack، وبيعملها push على الـ redo stack.` }
        : ed.last[0] === 'r' ? { en: `<b>Redo</b> pops <b>${lw}</b> from the redo stack and pushes it back on the undo stack.`, ar: `الـ <b>Redo</b> بيعمل pop للكلمة ${D(lw)} من الـ redo stack، ويرجّعها بـ push على الـ undo stack.` }
        : { en: `Typing <b>${lw}</b> pushes it on the undo stack (and empties the redo stack).`, ar: `لما تكتب ${D(lw)} بتتعمل لها push على الـ undo stack (والـ redo stack بيفضى).` };
      body = html`<div className="dsv2-ed"><small>document</small>${ed.u.join(' ')}</div>
        <div className="dsv2-row">
          <${VStack} title="undo stack" vals=${fill(ed.u, Math.max(ed.u.length, 1))} top=${ed.u.length - 1} ix=${false} arrow=${false} cw=${72} cls=${{ [ed.u.length - 1]: 'hot' }} sub=${'top = ' + (ed.u.length - 1)} />
          <${VStack} title="redo stack" vals=${fill(ed.r, Math.max(ed.r.length, 1))} top=${ed.r.length - 1} ix=${false} arrow=${false} cw=${72} cls=${{ [ed.r.length - 1]: 'hot' }} sub=${'top = ' + (ed.r.length - 1)} /></div>
        <div className="dsv2-row dsv2-mid"><input className="dsv2-in" style=${{ width: '96px' }} value=${word} maxLength="8" onChange=${e => setWord(e.target.value)} aria-label="Word to type" />
          <button className="fig-btn" onClick=${typeW} disabled=${ed.u.length >= MAX}>Type</button>
          <button className="fig-btn solid" onClick=${undo} disabled=${!ed.u.length}>Undo</button>
          <button className="fig-btn" onClick=${redo} disabled=${!ed.r.length || ed.u.length >= MAX}>Redo</button></div>
        ${ed.u.length >= MAX && html`<p className="dsv2-note">The picture holds ${MAX} words.</p>`}`;
    } else {
      const visit = () => { if (br.h.length >= MAX) return; setBr({ h: br.h.concat('site ' + br.n), n: br.n + 1, last: ['v', 'site ' + br.n] }); };
      const back = () => { if (br.h.length <= 1) return; const w = br.h[br.h.length - 1]; setBr({ h: br.h.slice(0, -1), n: br.n, last: ['b', w] }); };
      const cur = br.h[br.h.length - 1];
      c = !br.last ? { en: 'The browser keeps the history of visited sites on a stack; the page on the screen is the top. Press <b>Back</b>.', ar: 'الـ browser بيحط تاريخ المواقع اللي زرتها في stack، والصفحة اللي على الشاشة هي اللي فوق (الـ top). دوس <b>Back</b>.' }
        : br.last[0] === 'b' ? { en: `<b>Back</b> pops <b>${br.last[1]}</b>; the previous site, <b>${cur}</b>, is now on top and opens immediately.`, ar: `الـ <b>Back</b> بيعمل pop للـ ${D(br.last[1])}، فالموقع اللي قبله (${D(cur)}) بقى فوق وبيفتح على طول.` }
        : { en: `Opening <b>${br.last[1]}</b> pushes it on top of the history stack.`, ar: `لما تفتح ${D(br.last[1])} بيتعمل له push فوق الـ history stack.` };
      body = html`<div className="dsv2-ed"><small>on the screen</small>${cur}</div>
        <div className="dsv2-row"><${VStack} title="history" vals=${fill(br.h, br.h.length)} top=${br.h.length - 1} ix=${false} cw=${70} cls=${{ [br.h.length - 1]: 'hot' }} /></div>
        <div className="dsv2-row dsv2-mid"><button className="fig-btn" onClick=${visit} disabled=${br.h.length >= MAX}>Open site ${br.n}</button>
          <button className="fig-btn solid" onClick=${back} disabled=${br.h.length <= 1}>‹ Back</button></div>`;
    }
    return html`<figure className="fig dsv2"><div className="fig-stage">
      <${Modes} list=${[['ed', 'Text editor: undo/redo'], ['br', 'Browser: back']]} mode=${mode} set=${setMode} />${body}</div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setEd({ u: ['Last', 'In', 'First', 'Out'], r: [], last: null }); setBr({ h: ['site 1', 'site 2', 'site 3'], n: 4, last: null }); }}>↻ Start over</button></div></figure>`;
  }

  /* ── [0.4] Lab 3 application / assignment: reverse a string with a stack ── */
  function StackReverse({ ar }) {
    const [txt, setTxt] = useState('STACK'), s = [...(txt.slice(0, 8) || '?')], n = s.length;
    const show = ch => ch === ' ' ? '␣' : ch;
    const [i, ctl] = useWalk(2 * n + 2, 1100, txt);
    let st, out = [], hot = -1, c;
    if (i <= n) { st = s.slice(0, i); hot = i - 1; }
    else { const q = Math.min(i - n, n); st = s.slice(0, n - q); out = s.slice(n - q).reverse(); }
    const word = esc(s.join('')), rev = esc(s.slice().reverse().join(''));
    if (i === 0) c = { en: `Reverse <b>${word}</b>: push each character, then pop them all. top starts at -1.`, ar: 'عشان نعكس الـ string ده هنعمل push لكل حرف، وبعدين pop للكل:' + L(word) + 'والـ top بيبدأ من <bdi dir="ltr">-1</bdi>.' };
    else if (i <= n) c = { en: `push('${esc(show(s[i - 1]))}'): top = ${i - 1}.`, ar: `بنعمل push للحرف ${D("'" + esc(show(s[i - 1])) + "'")} والـ top بقى ${D(i - 1)}.` };
    else if (i <= 2 * n) { const ch = esc(show(s[2 * n - i])); c = { en: `pop() returns '${ch}', the last character pushed; it goes next in the output. top = ${2 * n - i - 1}.`, ar: `الـ ${D('pop()')} بترجع ${D("'" + ch + "'")} (آخر حرف اتعمله push)، وبيتحط بعد كده في الـ output. والـ top بقى ${D(2 * n - i - 1)}.` }; }
    else c = { en: `All popped: <b>${rev}</b>. The first character in came out last (LIFO), so the string is reversed.`, ar: 'خلاص كله اتعمله pop والناتج:' + L(rev) + 'أول حرف دخل طلع الآخر (LIFO)، فالـ string اتعكس.' };
    return html`<figure className="fig dsv2"><div className="fig-stage">
      <div className="dsv2-row dsv2-mid"><label className="dsv2-lbl">Try your own <input className="dsv2-in" style=${{ width: '120px' }} value=${txt} maxLength="8" onChange=${e => setTxt(e.target.value)} aria-label="String to reverse" /></label></div>
      <div className="dsv2-chars"><b>input</b>${s.map((ch, k) => html`<span key=${k} className=${k === hot ? 'hot' : i > k ? 'dim' : ''}>${show(ch)}</span>`)}</div>
      <div className="dsv2-row"><${VStack} vals=${fill(st, n)} top=${st.length - 1} cw=${40} cls=${Object.fromEntries(st.map((_, k) => [k, k === hot ? 'new' : 'on']))} /></div>
      <div className="dsv2-chars"><b>output</b>${out.map((ch, k) => html`<span key=${k} className=${k === out.length - 1 && i <= 2 * n ? 'hot' : ''}>${show(ch)}</span>`)}</div></div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /><${SBar} n=${2 * n + 2} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1.4] slide 9: underflow (top at the bottom) and overflow (top at the highest location), MAXSIZE = 4 ── */
  function StackLimits({ ar }) {
    const N = 4, [top, setTop] = useState(-1);
    const empty = top === -1, full = top === N - 1, cls = {};
    for (let k = 0; k <= top; k++) cls[k] = 'on';
    if (full) cls[top] = 'bad';
    const c = empty ? { en: '<b>STACK UNDERFLOW</b> condition: the stack contains no element, top is at the bottom (<b>top == -1</b>). isEmpty(top) is true, so a pop prints "Stack underflow".', ar: 'دي حالة الـ <b>STACK UNDERFLOW</b> اللي فيها الـ stack مفيهوش ولا عنصر والـ top تحت خالص:' + L('top == -1') + 'الـ <bdi dir="ltr">isEmpty(top)</bdi> بترجع true، فلو عملت pop هيطبع "Stack underflow".' }
      : full ? { en: '<b>STACK OVERFLOW</b> condition: the stack is full, top is at the highest location (<b>top == MAXSIZE - 1 == 3</b>). isFull(top) is true, so a push prints "Stack overflow".', ar: 'دي حالة الـ <b>STACK OVERFLOW</b> اللي فيها الـ stack مليان والـ top في أعلى مكان:' + L('top == MAXSIZE - 1 == 3') + 'الـ <bdi dir="ltr">isFull(top)</bdi> بترجع true، فلو عملت push هيطبع "Stack overflow".' }
      : { en: `top = ${top}: ${top + 1} of 4 locations used. Neither condition holds, so both push and pop work.`, ar: `الـ top واقف على ${D(top)} يعني مستخدمين ${D(top + 1 + ' من 4')} أماكن. ولا حالة فيهم متحققة، فالـ push والـ pop الاتنين شغالين.` };
    const B = v => html`<td className=${v ? 't' : 'f'}>${String(v)}</td>`;
    return html`<figure className="fig dsv2"><div className="fig-stage">
      <div className="dsv2-modes" role="group"><span className="dsv2-lbl">top =</span>${[-1, 0, 1, 2, 3].map(k => html`<button key=${k} className="fig-btn" aria-pressed=${String(top === k)} onClick=${() => setTop(k)}>${k}</button>`)}</div>
      <div className="dsv2-row"><${VStack} title="stack_arr[4]" vals=${fill([], N)} top=${top} cls=${cls} /></div>
      <table className="dsv2-tb"><tbody>
        <tr><th>isEmpty(top)</th><td>top == -1</td>${B(empty)}</tr>
        <tr><th>isFull(top)</th><td>top == 3</td>${B(full)}</tr>
        <tr><th>push(item)</th><td colSpan="2" className=${full ? 'x' : ''}>${full ? 'Stack overflow' : `stack_arr[${top + 1}] = item`}</td></tr>
        <tr><th>pop()</th><td colSpan="2" className=${empty ? 'x' : ''}>${empty ? 'Stack underflow' : `returns stack_arr[${top}]`}</td></tr></tbody></table></div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /></figure>`;
  }

  /* ── [2] slide 10: static (array) vs dynamic (linked list) implementation ── */
  function StackStaticDynamic({ ar }) {
    const N = 4, MAXD = 6;
    const [st, setSt] = useState({ s: [10, 20], d: [10, 20], next: 30, last: null });
    const push = () => { if (st.d.length >= MAXD) return; const v = st.next; setSt({ s: st.s.length < N ? st.s.concat(v) : st.s, d: st.d.concat(v), next: v + 10, last: st.s.length < N ? ['p', v] : ['o', v] }); };
    const popF = () => { if (!st.d.length && !st.s.length) return; setSt({ s: st.s.slice(0, -1), d: st.d.slice(0, -1), next: st.next, last: ['q'] }); };
    const k = st.s.length, m = st.d.length, cls = {}; st.s.forEach((_, j) => { cls[j] = 'on'; });
    const c = !st.last ? { en: 'Push the same values on both. <b>Static</b>: an array of 4 declared at design time; all 4 cells are reserved even when unused. <b>Dynamic</b>: one node (value + pointer) per item, made at run time.', ar: 'اعمل push لنفس القيم على الاتنين. الـ <b>static</b> عبارة عن array حجمه 4 متعرف وقت الـ design، والـ 4 أماكن محجوزين حتى لو مش مستخدمين. والـ <b>dynamic</b> بيعمل node (قيمة و pointer) لكل عنصر وقت الـ run time.' }
      : st.last[0] === 'o' ? { en: `push(${st.last[1]}): the array is full, so the static stack gives <b>Stack overflow</b>; its size cannot be varied. The linked list just adds a node.`, ar: `لما عملنا push للـ ${D(st.last[1])} الـ array كان مليان، فالـ static طلّع <b>Stack overflow</b> لأن حجمه مينفعش يتغير. أما الـ linked list فزوّد node وخلاص.` }
      : st.last[0] === 'p' ? { en: `push(${st.last[1]}): stored in the array at index ${k - 1}, and a new node is linked on top of the list.`, ar: `لما عملنا push للـ ${D(st.last[1])} اتخزن في الـ array في index ${D(k - 1)}، واتعمل node جديد فوق الـ list.` }
      : { en: 'pop(): the array keeps its 4 cells reserved; the list frees the top node and shrinks.', ar: 'لما عملنا pop الـ array لسه حاجز الـ 4 أماكن بتوعه، أما الـ list فبتمسح الـ node اللي فوق وبتصغر.' };
    const nodes = st.d.slice().reverse();
    return html`<figure className="fig dsv2"><div className="fig-stage"><div className="dsv2-two">
      <div className="dsv2-box"><b>Static (array)</b>
        <${VStack} vals=${fill(st.s, N)} top=${k - 1} cls=${cls} cw=${40} ix=${true} arrow=${false} sub=${'top = ' + (k - 1)} />
        <div className="dsv2-msg">${st.last && st.last[0] === 'o' ? 'Stack overflow' : ''}</div>
        <small>${N} cells reserved, ${k} used</small></div>
      <div className="dsv2-box"><b>Dynamic (linked list)</b>
        <span className="dsv2-null" style=${{ color: 'var(--fig-k)' }}>top</span><div className="dsv2-link">↓</div>
        ${nodes.map((v, j) => html`<div key=${m - j} className=${j === 0 && st.last && st.last[0] !== 'q' ? 'dsv2-pop' : ''}><div className="dsv2-node"><span>${v}</span><span>•</span></div><div className="dsv2-link">↓</div></div>`)}
        <span className="dsv2-null">NULL</span>
        <small>${m} node${m === 1 ? '' : 's'}: ${m} value${m === 1 ? '' : 's'} + ${m} pointer${m === 1 ? '' : 's'}</small></div></div>
      <div className="dsv2-row dsv2-mid" style=${{ marginTop: '10px' }}><button className="fig-btn solid" onClick=${push} disabled=${m >= MAXD}>push(${st.next})</button><button className="fig-btn" onClick=${popF} disabled=${!m && !k}>pop()</button>
        <button className="fig-btn" onClick=${() => setSt({ s: [10, 20], d: [10, 20], next: 30, last: null })}>↻ Start over</button></div>
      ${m >= MAXD && html`<p className="dsv2-note">The picture stops at ${MAXD} nodes; a linked list has no fixed size.</p>`}</div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /></figure>`;
  }

  /* ── [4] slides 14–16: display, count, search, get traced on a stack ── */
  const FN_CODE = {
    display: ['void display()', '{', '  if (isEmpty(top))', '    cout << "Nothing to display, "', '            "stack is empty\\n";', '  else', '    for (int j = top; j >= 0; j--)', '      cout << "Item number " << j', '        << " is " << Stack[j]', '        << "\\n";', '}'],
    count: ['int count()', '{', '  int c = 0, index = top;', '  while (index >= 0)', '  { c++; index--; }', '  return c;', '}'],
    search: ['void search(int item)', '{', '  int temp = top, flag = 0;', '  while (temp >= 0)', '  {', '    if (Stack[temp] == item)', '    { flag = 1; cout <<', '      "Item found at location"', '      << temp << "\\n"; break; }', '    else temp--;', '  }', '  if (flag == 0)', '    cout << "Not Found\\n";', '}'],
    get: ['void get()', '{', '  if (top != -1) cout << Stack[top]', '    << " is the element at the "', '       "top of the stack";', '  else cout << "Stack is Empty";', '}']
  };
  function fnTrace(fn, A, item) {
    const top = A.length - 1, S = [];
    if (fn === 'display') {
      if (top === -1) { S.push({ cur: [2, 3, 4], out: ['Nothing to display, stack is empty'], en: 'isEmpty(top) is true (top = -1): nothing to display.', ar: 'الـ <bdi dir="ltr">isEmpty(top)</bdi> بترجع true لأن الـ top بـ <bdi dir="ltr">-1</bdi>، فمفيش حاجة تتعرض.' }); return S; }
      S.push({ cur: 2, out: [], en: `isEmpty(top) is false (top = ${top}), so the for loop runs from j = top down to 0: LIFO order.`, ar: `الـ ${D('isEmpty(top)')} بترجع false (الـ top بـ ${D(top)})، فالـ for loop بتلف من الـ top نازلة لحد 0، يعني بترتيب الـ LIFO.` });
      const out = [];
      for (let j = top; j >= 0; j--) { out.push(`Item number ${j} is ${A[j]}`); S.push({ cur: [6, 7, 8, 9], j, out: out.slice(), en: `j = ${j}: prints "Item number ${j} is ${A[j]}".`, ar: `لما ${D('j = ' + j)} بيطبع السطر ده:` + L(`Item number ${j} is ${A[j]}`) }); }
      S.push({ cur: 6, out: out.slice(), en: 'j = -1: j >= 0 is false, the loop ends. The top item was printed first.', ar: 'لما الـ j بقى <bdi dir="ltr">-1</bdi> الشرط بقى false والـ loop خلصت. العنصر اللي فوق اتطبع الأول.' });
    } else if (fn === 'count') {
      S.push({ cur: 2, c: 0, idx: top, out: [], en: `c = 0, index = top = ${top}. Count from the top down to the bottom.`, ar: 'بنبدأ كده، وبنعد من الـ top نازلين لحد تحت:' + L(`c = 0, index = top = ${top}`) });
      let c = 0;
      for (let ix = top; ix >= 0; ix--) { c++; S.push({ cur: [3, 4], c, idx: ix - 1, j: ix, out: [], en: `index = ${ix} >= 0: c++ → c = ${c}, index-- → ${ix - 1}.`, ar: `الـ index بـ ${D(ix)} وده أكبر من أو يساوي 0، فبيحصل كده:` + L(`c++ → c = ${c}, index-- → ${ix - 1}`) }); }
      S.push({ cur: 5, c, idx: -1, out: [`count() = ${c}`], en: `index = -1: the loop stops and count() returns <b>${c}</b>, which is simply top + 1.`, ar: 'لما الـ index بقى <bdi dir="ltr">-1</bdi> الـ loop وقفت والـ <bdi dir="ltr">count()</bdi> بترجع الناتج، وهو ببساطة <bdi dir="ltr">top&nbsp;+&nbsp;1</bdi>:' + L(`count() = ${c} = ${top} + 1`) });
    } else if (fn === 'search') {
      S.push({ cur: 2, out: [], en: `search(${item}): temp = top = ${top}, flag = 0. Search from the top down.`, ar: `بندوّر على ${D(item)} من فوق لتحت، وبنبدأ كده:` + L(`temp = top = ${top}, flag = 0`) });
      let found = -1;
      for (let t = top; t >= 0; t--) {
        if (A[t] === item) { found = t; S.push({ cur: [5, 6, 7, 8], j: t, hit: true, out: [`Item found at location${t}`], en: `Stack[${t}] == ${item}: flag = 1, prints "Item found at location${t}" (no space in the cout) and breaks.`, ar: `الـ ${D('Stack[' + t + ']')} بيساوي ${D(item)}، فالـ flag بقى 1 وبيطبع السطر ده (من غير مسافة لأن الـ cout مفيهوش مسافة) وبيعمل break:` + L(`Item found at location${t}`) }); break; }
        S.push({ cur: [5, 9], j: t, out: [], en: `Stack[${t}] = ${A[t]} ≠ ${item}: temp-- → ${t - 1}.`, ar: `الـ ${D('Stack[' + t + ']')} قيمته ${D(A[t])} ومش هو اللي بندوّر عليه، فبيحصل كده:` + L(`temp-- → ${t - 1}`) });
      }
      if (found < 0) S.push({ cur: [11, 12], out: ['Not Found'], en: 'temp = -1: the loop ends with flag == 0, so it prints "Not Found".', ar: 'لما الـ temp بقى <bdi dir="ltr">-1</bdi> الـ loop خلصت والـ flag لسه 0، فبيطبع "Not Found".' });
    } else {
      if (top === -1) S.push({ cur: 5, out: ['Stack is Empty'], en: 'top == -1, so it prints "Stack is Empty".', ar: 'الـ top بـ <bdi dir="ltr">-1</bdi>، فبيطبع "Stack is Empty".' });
      else S.push({ cur: [2, 3, 4], j: top, out: [`${A[top]} is the element at the top of the stack`], en: `top = ${top} ≠ -1: prints Stack[top] = ${A[top]} without popping it; top stays ${top}.`, ar: `الـ top بـ ${D(top)} ومش <bdi dir="ltr">-1</bdi>، فبيطبع ${D('Stack[top] = ' + A[top])} من غير ما يعمل pop، والـ top بيفضل زي ما هو.` });
    }
    return S;
  }
  function StackFuncs({ ar }) {
    const [fn, setFn] = useState('search'), [vals, setVals] = useState('10 20 40'), [item, setItem] = useState('20');
    const A = ints(vals).slice(0, 4), it = parseInt(item, 10) || 0;
    const S = fnTrace(fn, A, it), [i, ctl] = useWalk(S.length, 1600, fn + vals + item), s = S[i];
    const cls = {}; A.forEach((_, k) => { cls[k] = 'on'; }); if (s.j != null) cls[s.j] = s.hit ? 'ok' : 'hot';
    return html`<figure className="fig dsv2"><div className="fig-stage">
      <${Modes} list=${[['display', 'display()'], ['count', 'count()'], ['search', 'search(item)'], ['get', 'get()']]} mode=${fn} set=${setFn} />
      <div className="dsv2-row dsv2-mid"><label className="dsv2-lbl">Stack (bottom → top) <input className="dsv2-in" style=${{ width: '120px' }} value=${vals} onChange=${e => setVals(e.target.value)} aria-label="Stack values, bottom to top" /></label>
        ${fn === 'search' && html`<label className="dsv2-lbl">item <input className="dsv2-in" style=${{ width: '58px' }} inputMode="numeric" value=${item} onChange=${e => setItem(e.target.value)} aria-label="Item to search for" /></label>`}</div>
      <div className="dsv2-row dsv2-mid">
        <${VStack} title="Stack[4]" vals=${fill(A, 4)} top=${A.length - 1} cls=${cls} />
        ${fn === 'count' && html`<div className="dsv2-sub" style=${{ textAlign: 'left', fontSize: '.88rem', color: 'var(--ink)' }}>c = ${s.c}<br />index = ${s.idx}</div>`}</div>
      <${Code} lines=${FN_CODE[fn]} cur=${s.cur} />
      <div className="dsv2-out"><small>output</small>${s.out.join('\n')}</div>
      <p className="dsv2-note">MAXSIZE = 4; the default 10 20 40 is the stack left by the push/pop example above.</p></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5.0]–[5.1] Lab 3: size read at run time, new int[size], the i/o/t/e menu ── */
  function StackLabMenu({ ar }) {
    const [size, setSize] = useState(3), [st, setSt] = useState({ a: [], log: [], last: null, done: false }), [v, setV] = useState('10');
    const top = st.a.length - 1, full = top === size - 1;
    const reset = n => { setSize(n); setSt({ a: [], log: [], last: null, done: false }); };
    const act = k => {
      if (st.done) return; let a = st.a, out = null, last;
      if (k === 'i') { const x = parseInt(v, 10); if (!Number.isFinite(x)) return; if (full) { out = 'Stack overflow'; last = ['of', x]; } else { a = a.concat(x); last = ['i', x]; setV(String(x + 10)); } }
      else if (k === 'o') { if (top === -1) { out = 'Stack underflow'; last = ['uf']; } else { last = ['o', a[top]]; a = a.slice(0, -1); } }
      else if (k === 't') { out = a.length ? a.slice().reverse().join(' ') : '(empty)'; last = ['t']; }
      else { last = ['e']; }
      setSt({ a, log: st.log.concat((k === 'i' ? 'i ' + v : k) + (out ? '  → ' + out : '')).slice(-4), last, done: k === 'e' });
    };
    const L0 = st.last, cls = {}; st.a.forEach((_, k) => { cls[k] = 'on'; }); if (full) cls[top] = 'bad';
    const c = !L0 ? { en: `<code>cin&gt;&gt;size;</code> read <b>${size}</b> at run time, so <code>stack_arr = new int[${size}];</code> made an array of ${size} ints and isFull() checks <b>top == size-1 == ${size - 1}</b>. Use the menu.`, ar: `الـ size اتقرى وقت الـ run time وبقى ${D(size)}، فالكود ده عمل array فيه ${D(size)} ints:` + `<pre>cin&gt;&gt;size;\nstack_arr = new int[size];</pre>` + 'والـ <bdi dir="ltr">isFull()</bdi> بقت بتشيك على:' + L(`top == size-1 == ${size - 1}`) + 'استخدم الـ menu.' }
      : L0[0] === 'i' ? { en: `(i) push(${L0[1]}): top = ${top}.`, ar: `الـ (i) عمل push للـ ${D(L0[1])} والـ top بقى ${D(top)}.` }
      : L0[0] === 'of' ? { en: `(i) push(${L0[1]}): top == size-1 == ${size - 1}, isFull() is true: <b>Stack overflow</b>. A bigger size needs a new run.`, ar: `الـ (i) حاول يعمل push للـ ${D(L0[1])} بس الـ ${D('isFull()')} رجعت true لأن ${D('top == ' + (size - 1))}، فطلع <b>Stack overflow</b>. لو عايز size أكبر لازم تشغّل تاني.` }
      : L0[0] === 'o' ? { en: `(o) pop() returned ${L0[1]}: top = ${top}.`, ar: `الـ (o) عمل pop ورجّع ${D(L0[1])}، والـ top بقى ${D(top)}.` }
      : L0[0] === 'uf' ? { en: '(o) pop() on an empty stack (top == -1): <b>Stack underflow</b>.', ar: 'الـ (o) عمل pop والـ stack فاضي (الـ top بـ <bdi dir="ltr">-1</bdi>)، فطلع <b>Stack underflow</b>.' }
      : L0[0] === 't' ? { en: '(t) traverse: displays from the top down to index 0.', ar: 'الـ (t) بيعمل traverse، يعني بيعرض من الـ top نازل لحد index 0.' }
      : { en: '(e) exit: the program ends.', ar: 'الـ (e) بيعمل exit والبرنامج بيخلص.' };
    return html`<figure className="fig dsv2"><div className="fig-stage">
      <div className="dsv2-modes" role="group"><span className="dsv2-lbl">cin &gt;&gt; size;</span>${[2, 3, 4, 5].map(k => html`<button key=${k} className="fig-btn" aria-pressed=${String(size === k)} onClick=${() => reset(k)}>${k}</button>`)}</div>
      <div className="dsv2-row"><${VStack} key=${size} title=${'new int[' + size + ']'} vals=${fill(st.a, size)} top=${top} cls=${cls} /></div>
      <div className="dsv2-row dsv2-mid"><input className="dsv2-in" style=${{ width: '64px' }} inputMode="numeric" value=${v} onChange=${e => setV(e.target.value)} aria-label="Value to push" disabled=${st.done} />
        <button className="fig-btn solid" onClick=${() => act('i')} disabled=${st.done}>(i) push</button>
        <button className="fig-btn" onClick=${() => act('o')} disabled=${st.done}>(o) pop</button>
        <button className="fig-btn" onClick=${() => act('t')} disabled=${st.done}>(t) traverse</button>
        <button className="fig-btn" onClick=${() => act('e')} disabled=${st.done}>(e) exit</button></div>
      <div className="dsv2-out"><small>menu choices and what they print</small>${st.log.map((l, k) => html`<div key=${k} className=${/overflow|underflow/.test(l) ? 'dsv2-err' : ''}>${l}</div>`)}</div>
      ${st.done && html`<div className="dsv2-row"><button className="fig-btn" onClick=${() => reset(size)}>↻ Run again</button></div>`}</div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /></figure>`;
  }

  /* ── [5.2] Lab 3 assignments: Stack_Copy() through a temp stack; sum and average of a full stack ── */
  function StackCopySum({ ar }) {
    const [mode, setMode] = useState('copy'), [vals, setVals] = useState({ copy: '10 20 30', sum: '10 20 40 50' });
    const A = ints(vals[mode]).slice(0, mode === 'copy' ? 5 : 6), n = Math.max(A.length, 1);
    const steps = mode === 'copy' ? 2 * A.length + 2 : A.length + 2;
    const [i, ctl] = useWalk(steps, 1300, mode + vals[mode]);
    let body, c;
    if (mode === 'copy') {
      const m = A.length; let s1 = A.slice(), tmp = [], s2 = [], mv = null;
      for (let k = 1; k <= Math.min(i, 2 * m); k++) { if (k <= m) { mv = s1.pop(); tmp.push(mv); } else { mv = tmp.pop(); s2.push(mv); } }
      const tag = (arr, nw) => { const o = {}; arr.forEach((_, k) => { o[k] = 'on'; }); if (nw && arr.length) o[arr.length - 1] = 'new'; return o; };
      const sub = a => 'top = ' + (a.length - 1);
      body = html`<div className="dsv2-row">
        <${VStack} title="s1" vals=${fill(s1, n)} top=${s1.length - 1} cls=${tag(s1)} ix=${false} arrow=${false} cw=${44} sub=${sub(s1)} />
        <${VStack} title="temp" vals=${fill(tmp, n)} top=${tmp.length - 1} cls=${tag(tmp, i >= 1 && i <= m)} ix=${false} arrow=${false} cw=${44} sub=${sub(tmp)} />
        <${VStack} title="s2" vals=${fill(s2, n)} top=${s2.length - 1} cls=${tag(s2, i > m && i <= 2 * m)} ix=${false} arrow=${false} cw=${44} sub=${sub(s2)} /></div>`;
      const list = esc(A.join(', '));
      if (i === 0) c = { en: `Stack_Copy(): copy s1 (bottom → top: ${list}) into the empty s2. Popping straight into s2 would turn it upside down, so go through a temp stack.`, ar: 'الـ <bdi dir="ltr">Stack_Copy()</bdi> بتنسخ s1 لـ s2 الفاضي. الـ s1 من تحت لفوق:' + L(list) + 'لو عملنا pop على s2 على طول هيتقلب، فهنعدي على temp stack الأول.' };
      else if (i <= m) c = { en: `pop ${mv} from s1, push it on temp.`, ar: `بنعمل pop للـ ${D(mv)} من s1 وpush على الـ temp.` };
      else if (i <= 2 * m) c = { en: `pop ${mv} from temp, push it on s2.`, ar: `بنعمل pop للـ ${D(mv)} من الـ temp وpush على s2.` };
      else c = { en: `Done: s2 holds ${list} bottom → top, the same order s1 had (temp reversed it once, s2 reversed it back). s1 was emptied by the pops.`, ar: 'خلاص، الـ s2 بقى فيه نفس ترتيب s1 من تحت لفوق:' + L(list) + 'الـ temp قلبه مرة والـ s2 رجّعه تاني. والـ s1 فضي بسبب الـ pops.' };
    } else {
      const top = A.length - 1, at = i >= 1 && i <= A.length ? top - (i - 1) : null;
      const sum = A.slice(Math.max(0, top - Math.min(i, A.length) + 1)).reduce((x, y) => x + y, 0);
      const cls = {}; A.forEach((_, k) => { cls[k] = 'on'; }); if (at != null) cls[at] = 'hot';
      const code = ['int sum = 0;', 'for (int j = top; j >= 0; j--)', '  sum += stack_arr[j];', 'float avg = (float)sum / (top + 1);'];
      const avg = A.length ? cout(sum / A.length) : '0';
      body = html`<div className="dsv2-row dsv2-mid"><${VStack} title=${'stack_arr[' + A.length + '] (full)'} vals=${fill(A, n)} top=${top} cls=${cls} /></div>
        <${Code} lines=${code} cur=${i === 0 ? 0 : at != null ? [1, 2] : 3} />
        <div className="dsv2-out"><small>variables</small>sum = ${sum}${i === steps - 1 ? `\navg = ${sum} / ${A.length} = ${avg}` : ''}</div>`;
      if (i === 0) c = { en: `The stack is full (MAXSIZE = ${A.length}, top = ${top}). sum starts at 0; walk from the top down to index 0.`, ar: `الـ stack مليان (يعني ${D('top = ' + top)}). الـ sum بيبدأ بـ 0، وبنلف من الـ top نازلين لحد index 0.` };
      else if (at != null) c = { en: `j = ${at}: sum += ${A[at]} → sum = ${sum}.`, ar: `لما ${D('j = ' + at)} بنزوّد العنصر على الـ sum:` + L(`sum += ${A[at]} → sum = ${sum}`) };
      else c = { en: `Average = sum / number of items (top + 1) = ${sum} / ${A.length} = <b>${avg}</b>.`, ar: 'الـ average هو الـ sum على عدد العناصر (top + 1):' + L(`avg = ${sum} / ${A.length} = ${avg}`) };
    }
    return html`<figure className="fig dsv2"><div className="fig-stage">
      <${Modes} list=${[['copy', 'Stack_Copy()'], ['sum', 'Sum and average']]} mode=${mode} set=${setMode} />
      <div className="dsv2-row dsv2-mid"><label className="dsv2-lbl">Try your own (bottom → top) <input className="dsv2-in" style=${{ width: '128px' }} value=${vals[mode]} onChange=${e => setVals(Object.assign({}, vals, { [mode]: e.target.value }))} aria-label="Stack values, bottom to top" /></label></div>
      ${body}</div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /><${SBar} n=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5.3] exam pattern: top++ then store (right) vs store then top++ (wrong), top starting at -1 ── */
  function StackPushOrder({ ar }) {
    const [mode, setMode] = useState('right');
    const right = mode === 'right', items = [10, 20];
    const code = right ? ['void push(int item)', '{', '  top++;', '  stack[top] = item;', '}'] : ['void push(int item)', '{', '  stack[top] = item;', '  top++;', '}'];
    // replay the statements
    const S = [{ top: -1, mem: {}, cur: -1, en: right ? 'Right order, as the exam expects. top starts at -1; push 10, then 20.' : 'Wrong order: store first, then increment. top starts at -1; push 10, then 20.', ar: right ? 'الترتيب الصح زي ما الامتحان عايزه. الـ top بيبدأ من <bdi dir="ltr">-1</bdi>، وهنعمل push للـ 10 وبعدين الـ 20.' : 'الترتيب الغلط: نخزّن الأول وبعدين نزوّد. الـ top بيبدأ من <bdi dir="ltr">-1</bdi>، وهنعمل push للـ 10 وبعدين الـ 20.' }];
    let top = -1, mem = {};
    items.forEach(v => {
      const inc = () => { top++; S.push({ top, mem: Object.assign({}, mem), cur: right ? 2 : 3, en: `push(${v}): top++ → top = ${top}.`, ar: `في الـ ${D('push(' + v + ')')} الـ top بيزيد:` + L(`top++ → top = ${top}`) }); };
      const store = () => { mem = Object.assign({}, mem, { [top]: v }); const bad = top < 0;
        S.push({ top, mem: Object.assign({}, mem), cur: right ? 3 : 2, hit: top, en: bad ? `push(${v}): stack[top] = stack[-1] = ${v}: index -1 is <b>outside the array</b>; the value is lost (and may overwrite other memory).` : `push(${v}): stack[${top}] = ${v}.`, ar: bad ? `في الـ ${D('push(' + v + ')')} الكود بيكتب في ${D('stack[-1]')}، وده <b>برّه الـ array</b>، فالقيمة بتضيع (وممكن تكتب فوق memory تانية).` : `في الـ ${D('push(' + v + ')')} بيتخزن كده:` + L(`stack[${top}] = ${v}`) }); };
      if (right) { inc(); store(); } else { store(); inc(); }
    });
    S.push(right ? { top, mem, cur: -1, en: 'Result: stack[0] = 10, stack[1] = 20, top = 1, top points at the last item. Increment first, then store: <b>top++; stack[top] = item;</b>', ar: 'النتيجة إن الـ top بيشاور على آخر عنصر:' + L('stack[0] = 10, stack[1] = 20, top = 1') + 'يعني زوّد الأول وبعدين خزّن:' + L('top++; stack[top] = item;') }
      : { top, mem, cur: -1, en: 'Result: 10 was written outside the array, 20 sits at index 0, and top = 1 points at a slot that holds no item. That is why the order must be <b>top++; stack[top] = item;</b>', ar: 'النتيجة إن الـ 10 اتكتب برّه الـ array، والـ 20 في index 0، والـ top بـ 1 بيشاور على مكان مفيهوش عنصر. عشان كده لازم الترتيب يبقى كده:' + L('top++; stack[top] = item;') });
    const [i, ctl] = useWalk(S.length, 1700, mode), s = S[i];
    const vals = [-1, 0, 1, 2, 3].map(k => s.mem[k] == null ? '' : s.mem[k]);
    const cls = { '-1': 'out' + (s.hit === -1 ? ' bad' : '') }; [0, 1, 2, 3].forEach(k => { if (s.mem[k] != null) cls[k] = s.hit === k ? 'new' : 'on'; });
    if (!right && i === S.length - 1) cls[1] = 'bad';
    return html`<figure className="fig dsv2"><div className="fig-stage">
      <${Modes} list=${[['right', 'top++; then store'], ['wrong', 'store; then top++']]} mode=${mode} set=${setMode} />
      <${Code} lines=${code} cur=${s.cur} />
      <div className="dsv2-row"><${VStack} title="stack[4]" vals=${vals} lo=${-1} top=${s.top} cls=${cls} /></div>
      <p className="dsv2-note">Location -1 (dashed) is outside the array.</p></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ds-stack-slide-pics': StackSlidePics, 'ds-stack-real-life': StackRealLife, 'ds-stack-reverse': StackReverse, 'ds-stack-limits': StackLimits,
    'ds-stack-static-dynamic': StackStaticDynamic, 'ds-stack-funcs': StackFuncs, 'ds-stack-lab-menu': StackLabMenu, 'ds-stack-copy-sum': StackCopySum, 'ds-stack-push-order': StackPushOrder
  });
})();
/* ── part L3 ── */
// Data Structures visuals, Lecture 3 (Linear and Circular Queues using Arrays): the FIFO line of slide 3, the linear-queue trace of slides 6–13, the "full even after removing 2" problem of slide 14, the circle of slide 15, the two full cases of slides 17/21, the 100-insertion of slides 19–20, a linear-vs-circular simulator and the Exam 2022/23 trace. Every label and number comes from the site's notes and the slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm } = window.FIGKIT;
  const CSS = `
.dsv3 *{ font-variant-ligatures:none; }
.dsv3 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dsv3 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv3-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dsv3-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dsv3-row{ display:flex; flex-wrap:wrap; gap:6px 8px; justify-content:center; align-items:center; margin:8px 0 0; }
.dsv3-strip{ display:flex; gap:3px; justify-content:center; align-items:flex-start; margin:4px 0; }
.dsv3-c{ display:flex; flex-direction:column; align-items:center; gap:2px; width:var(--w, 34px); }
.dsv3-v{ width:100%; height:var(--w, 34px); box-sizing:border-box; display:grid; place-items:center; border:1px solid var(--line); border-radius:5px; background:var(--paper); color:var(--ink); font:600 .82rem var(--mono); transition:background .35s, box-shadow .35s, opacity .35s; }
.dsv3-v.on{ background:color-mix(in srgb, var(--fig-k) 28%, var(--paper)); }
.dsv3-v.hot{ box-shadow:0 0 0 2px var(--fig-k); }
.dsv3-v.ok{ box-shadow:0 0 0 2px var(--ok); }
.dsv3-v.bad{ box-shadow:0 0 0 2px var(--pen); }
.dsv3-v.gone{ color:var(--faint); text-decoration:line-through; border-style:dashed; }
.dsv3-v.ghost{ border:2px dashed var(--pen); color:var(--pen); background:transparent; }
.dsv3-ix{ font:.75rem/1.2 var(--mono); color:var(--graphite); }
.dsv3-mk{ font:700 .75rem/1.2 var(--mono); color:var(--fig-k); min-height:1.2em; white-space:nowrap; }
.dsv3-legend{ font-size:.78rem; color:var(--graphite); text-align:center; margin:2px 0 0; }
.dsv3-legend b{ color:var(--fig-k); font-family:var(--mono); }
.dsv3-code{ margin:0 auto 8px; max-width:420px; padding:8px 10px; border:1px solid var(--line); border-radius:8px; background:var(--paper); font:.8rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv3-code span{ display:block; border-radius:3px; padding:0 3px; transition:background .3s; }
.dsv3-code span.cur{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.dsv3-out{ max-width:420px; margin:8px auto 0; padding:6px 10px; border:1px solid var(--line); border-left:4px solid var(--fig-k); border-radius:6px; background:var(--paper); font:600 .82rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; min-height:1.5em; text-align:left; direction:ltr; }
.dsv3-out small{ display:block; font:600 .75rem var(--body); color:var(--graphite); }
.dsv3-out .t{ display:block; }
.dsv3-out .y{ color:var(--ok); } .dsv3-out .n{ color:var(--pen); }
.dsv3-err{ color:var(--pen); font-weight:700; } .dsv3-yes{ color:var(--ok); font-weight:700; }
.dsv3-cnt{ font-size:.85rem; color:var(--graphite); }
.dsv3-pop{ animation:dsv3-in .45s ease both; }
@keyframes dsv3-in{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }
.dsv3-show{ transition:opacity .45s, transform .45s; } .dsv3-show.off{ opacity:0; transform:translateY(6px); pointer-events:none; }
.dsv3-fifo{ max-width:330px; margin:0 auto; color:var(--ink); }
.dsv3-ends{ display:flex; justify-content:space-between; font-size:.78rem; font-weight:700; color:var(--graphite); gap:8px; }
.dsv3-io{ display:flex; align-items:center; gap:6px; min-height:40px; font-size:.82rem; font-weight:700; color:var(--graphite); }
.dsv3-io.r{ justify-content:flex-end; }
.dsv3-io .dsv3-v{ width:34px; }
.dsv3-arw{ color:var(--fig-k); font-size:1.15rem; }
.dsv3-served{ font:.8rem var(--mono); color:var(--graphite); text-align:center; margin-top:4px; }
.dsv3-brace{ height:8px; border:2px solid var(--pen); border-top:0; border-radius:0 0 8px 8px; }
.dsv3-tag{ font:700 .75rem/1.2 var(--body); color:var(--pen); text-align:center; }
.dsv3-tr{ display:grid; grid-template-columns:repeat(9, 26px); gap:2px; justify-content:center; margin:0 auto; }
.dsv3-tr > .dsv3-c{ width:26px; }
.dsv3-new{ display:flex; justify-content:center; align-items:center; gap:6px; min-height:34px; font-size:.8rem; color:var(--graphite); }
.dsv3-new i{ width:24px; height:24px; border-radius:4px; background:var(--ink); display:inline-block; }
.dsv3-ring{ display:block; width:100%; max-width:250px; height:auto; margin:4px auto 0; }
.dsv3-ring .sec{ fill:var(--paper); stroke:var(--line); stroke-width:1.5; transition:fill .35s, stroke .35s; }
.dsv3-ring .sec.on{ fill:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); }
.dsv3-ring .sec.hot{ stroke:var(--fig-k); stroke-width:4; }
.dsv3-ring .sec.ok{ stroke:var(--ok); stroke-width:4; }
.dsv3-ring .sec.gone{ stroke-dasharray:5 4; }
.dsv3 .dsv3-ring text{ font-family:var(--mono); text-anchor:middle; dominant-baseline:central; }
.dsv3 .dsv3-ring .val{ font-size:17px; font-weight:700; fill:var(--ink); }
.dsv3 .dsv3-ring .val.gone{ fill:var(--faint); text-decoration:line-through; }
.dsv3 .dsv3-ring .ix{ font-size:14px; fill:var(--graphite); }
.dsv3 .dsv3-ring .mk{ font-size:15px; font-weight:700; fill:var(--fig-k); }
.dsv3 .dsv3-ring .mid{ font-size:15px; fill:var(--ink); }
.dsv3-ring .wrap{ fill:none; stroke:var(--fig-k); stroke-width:2.5; }
.dsv3-pair{ display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:10px; max-width:560px; margin:0 auto; }
.dsv3-box{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 6px; color:var(--ink); text-align:center; }
.dsv3-box > b{ display:block; font-size:.86rem; margin-bottom:2px; }
.dsv3-vars{ font:600 .8rem var(--mono); color:var(--ink); margin-top:4px; }
.dsv3-verd{ font-size:.82rem; margin-top:4px; min-height:1.3em; line-height:1.35; }
.dsv3-step{ display:inline-flex; align-items:center; gap:4px; font-size:.82rem; color:var(--ink); }
.dsv3-step .fig-btn{ min-width:32px; padding:2px 8px; }
.dsv3-step b{ font-family:var(--mono); min-width:1.4em; text-align:center; }
.dsv3-in{ font:.9rem var(--mono); width:64px; padding:4px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:32px; box-sizing:border-box; }
.dsv3-tb{ width:100%; max-width:520px; margin:10px auto 0; border-collapse:collapse; table-layout:fixed; font-size:.78rem; color:var(--ink); }
.dsv3-tb th, .dsv3-tb td{ border:1px solid var(--line); padding:3px 5px; text-align:left; background:var(--paper); vertical-align:top; transition:background .3s; overflow-wrap:anywhere; }
.dsv3-tb th{ background:color-mix(in srgb, var(--fig-k) 14%, var(--paper)); }
.dsv3-tb tr.cur td{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); font-weight:600; }
.dsv3-log{ font:.75rem var(--mono); color:var(--graphite); text-align:center; margin-top:6px; overflow-wrap:anywhere; }
@media (prefers-reduced-motion: reduce){ .dsv3-pop{ animation:none; } .dsv3-show, .dsv3-v, .dsv3-code span, .dsv3-ring .sec{ transition:none; } }`;
  if (!document.getElementById('dsv3-css')) { const s = document.createElement('style'); s.id = 'dsv3-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* helpers */
  const L = s => `<span class="ltr">${s}</span>`;
  const D = s => `<bdi dir="ltr">${String(s).replace(/ /g, '&nbsp;')}</bdi>`;
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  const SBar = ({ n, i, ctl }) => html`<div className="fig-bar">
    <div className="fig-dots" aria-hidden="true">${Array.from({ length: n }, (_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</div>
    <span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i >= n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;
  const Stepper = ({ label, v, set, min, max }) => html`<span className="dsv3-step">${label}<button className="fig-btn" onClick=${() => set(Math.max(min, v - 1))} disabled=${v <= min} aria-label=${label + ' minus'}>−</button><b>${v}</b><button className="fig-btn" onClick=${() => set(Math.min(max, v + 1))} disabled=${v >= max} aria-label=${label + ' plus'}>+</button></span>`;
  const mark = (k, F, R) => [k === F ? 'F' : '', k === R ? 'R' : ''].filter(Boolean).join(' ');
  // one array row: index above, cell, F/R marker below
  const Strip = ({ n, vals, F, R, cls, w }) => html`<div className="dsv3-strip" style=${{ '--w': (w || 34) + 'px' }}>${Array.from({ length: n }, (_, k) => html`<div key=${k} className="dsv3-c"><span className="dsv3-ix">${k}</span><span className=${'dsv3-v ' + ((cls && cls[k]) || '')}>${vals[k] == null ? '' : vals[k]}</span><span className="dsv3-mk">${mark(k, F, R)}</span></div>`)}</div>`;
  const Legend = ({ h }) => html`<p className="dsv3-legend"><b>F</b> = ${h ? 'head (front)' : 'front (head)'} · <b>R</b> = ${h ? 'tail (rear)' : 'rear (tail)'}</p>`;
  // the circle of slides 15/19/20: index 0 at the top, clockwise
  const pol = (r, a) => [r * Math.cos(a * Math.PI / 180), r * Math.sin(a * Math.PI / 180)];
  function Ring({ n, vals, F, R, cls, mid, wrapFrom }) {
    const per = 360 / n, r1 = 56, r2 = 96, f = x => x.toFixed(1);
    const sec = k => { const a0 = -90 - per / 2 + k * per + 2.5, a1 = a0 + per - 5, [x1, y1] = pol(r2, a0), [x2, y2] = pol(r2, a1), [x3, y3] = pol(r1, a1), [x4, y4] = pol(r1, a0);
      return `M${f(x1)} ${f(y1)} A${r2} ${r2} 0 0 1 ${f(x2)} ${f(y2)} L${f(x3)} ${f(y3)} A${r1} ${r1} 0 0 0 ${f(x4)} ${f(y4)} Z`; };
    let wrap = null;
    if (wrapFrom != null) { const a0 = -90 + wrapFrom * per, a1 = -90 + (wrapFrom + 1) * per, [x1, y1] = pol(44, a0 + 8), [x2, y2] = pol(44, a1 - 8), [hx, hy] = pol(44, a1 - 8), [tx, ty] = pol(36, a1 - 20), [ux, uy] = pol(53, a1 - 20);
      wrap = html`<path className="wrap" d=${`M${f(x1)} ${f(y1)} A44 44 0 0 1 ${f(x2)} ${f(y2)} M${f(tx)} ${f(ty)} L${f(hx)} ${f(hy)} L${f(ux)} ${f(uy)}`} />`; }
    return html`<svg className="dsv3-ring" viewBox="-140 -140 280 280" role="img" aria-label=${'circular array of ' + n + ' cells'}>
      ${Array.from({ length: n }, (_, k) => { const a = -90 + k * per, [vx, vy] = pol(77, a), [ix, iy] = pol(110, a), [mx, my] = pol(128, a), c = (cls && cls[k]) || '';
        return html`<g key=${k}><path className=${'sec ' + c} d=${sec(k)} />${vals[k] != null && html`<text className=${'val' + (/gone/.test(c) ? ' gone' : '')} x=${f(vx)} y=${f(vy)}>${vals[k]}</text>`}
          <text className="ix" x=${f(ix)} y=${f(iy)}>${k}</text>${mark(k, F, R) && html`<text className="mk" x=${f(mx)} y=${f(my)}>${mark(k, F, R)}</text>`}</g>`; })}
      ${wrap}
      ${mid && mid.map((t, k) => html`<text key=${'m' + k} className="mid" x="0" y=${(k - (mid.length - 1) / 2) * 19}>${t}</text>`)}</svg>`;
  }

  /* ── [0.0]–[0.4] slide 3: the FIFO line, dequeue at the front, enqueue at the rear ── */
  const FIFO0 = [2, 3, 4, 5, 6, 7, 8];
  function FifoLine({ ar }) {
    const steps = [
      { q: FIFO0, en: 'Slide 3\'s picture: a queue is a line <b>open at both ends</b>. The <b>front / head</b> (2) is the entry ready to be served; the <b>back / tail / rear</b> (8) is the one most recently added.', ar: 'ده رسم slide 3: الـ queue طابور <b>مفتوح من الطرفين</b>. الـ <b><bdi dir="ltr">front&nbsp;/&nbsp;head</bdi></b> هو العنصر 2 اللي جاهز يتخدم، والـ <b><bdi dir="ltr">back&nbsp;/&nbsp;tail&nbsp;/&nbsp;rear</bdi></b> هو العنصر 8 اللي اتضاف آخر واحد.' },
      { q: FIFO0.slice(1), out: 2, en: '<b>dequeue()</b> removes from the <b>front</b>: 2 leaves first, and 3 is now the front.', ar: 'الـ <b><bdi dir="ltr">dequeue()</bdi></b> بتشيل من الـ <b>front</b>، فالعنصر 2 بيطلع الأول والـ front بقى 3.' },
      { q: FIFO0.slice(1), out: 2, inc: 9, en: '<b>enqueue()</b> inserts at the <b>rear</b>: 9 comes in behind 8.', ar: 'الـ <b><bdi dir="ltr">enqueue()</bdi></b> بتضيف عند الـ <b>rear</b>، فالعنصر 9 داخل ورا الـ 8.' },
      { q: FIFO0.slice(1).concat(9), out: 2, en: 'Now 9 is the rear. Like the ticket line: the first one in is the first one served (<b>FIFO</b>), so 9 is served after 3, 4, 5, 6, 7 and 8. Try it below.', ar: 'دلوقتي الـ 9 هو الـ rear. زي طابور التذاكر بالظبط: اللي يدخل الأول يتخدم الأول (<b>FIFO</b>)، فالـ 9 هيتخدم بعد 3 و4 و5 و6 و7 و8. جرّب تحت.' }
    ];
    const [i, ctl] = useWalk(steps.length, 2400, 0), [free, setFree] = useState(null);
    const st = free || steps[i];
    const enq = () => { const q = st.q, v = Math.max(9, ...q, ...(st.served || [])) + 1; if (q.length >= 8) { setFree({ ...st, inc: null, en: 'This picture holds 8 entries: dequeue some first.', ar: 'الرسمة دي بتشيل 8 عناصر بس، اعمل dequeue الأول.' }); return; }
      setFree({ q: q.concat(v), out: st.out, served: st.served || [], en: `enqueue(${v}): ${v} joins at the rear.`, ar: `الـ ${D('enqueue(' + v + ')')} بتحط ${D(v)} عند الـ rear.` }); };
    const deq = () => { const q = st.q; if (!q.length) { setFree({ ...st, en: 'The queue is empty: nothing to dequeue.', ar: 'الـ queue فاضي ومفيش حاجة تتشال.' }); return; }
      const served = (st.served || []).concat(q[0]); setFree({ q: q.slice(1), out: q[0], served, en: `dequeue() returns ${q[0]}, the oldest entry. Served so far: ${served.join(', ')} (the order they came in).`, ar: `الـ <bdi dir="ltr">dequeue()</bdi> بترجّع ${D(q[0])} لأنه أقدم عنصر. اللي اتخدموا لحد دلوقتي بنفس ترتيب دخولهم:` + L(served.join(', ')) }); };
    const reset = () => { setFree(null); ctl.replay(); };
    return html`<figure className="fig dsv3"><div className="fig-stage"><div className="dsv3-fifo">
      <div className="dsv3-io r">${st.inc != null && html`<span className="dsv3-v on hot dsv3-pop">${st.inc}</span><span className="dsv3-arw">↘</span>`}</div>
      <div className="dsv3-ends"><span>Front / Head</span><span>Back / Tail / Rear</span></div>
      <div className="dsv3-strip" style=${{ '--w': '32px', minHeight: '36px' }}>${st.q.map((v, k) => html`<div key=${v} className="dsv3-c dsv3-pop"><span className=${'dsv3-v on' + (k === 0 ? ' hot' : '') + (k === st.q.length - 1 ? ' ok' : '')}>${v}</span></div>`)}</div>
      <div className="dsv3-ends"><span>↙ Dequeue</span><span>Enqueue ↖</span></div>
      <div className="dsv3-io">${st.out != null && html`<span key=${'o' + st.out} className="dsv3-v dsv3-pop">${st.out}</span>`}</div>
      ${st.served && st.served.length > 0 && html`<p className="dsv3-served">served: ${st.served.join(', ')}</p>`}
      <div className="dsv3-row"><button className="fig-btn" onClick=${enq}>enqueue</button><button className="fig-btn" onClick=${deq}>dequeue</button></div>
      </div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} />
      ${free ? html`<div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${reset}>↻ Slide example</button></div>` : html`<${SBar} n=${steps.length} i=${i} ctl=${ctl} />`}</figure>`;
  }

  /* ── [2.0]–[2.1] slides 6–13: the linear trace on an array 0..7 ── */
  const TR = [
    { f: 0, r: 4, en: 'Slide 6, <b>linear implementation</b>: an array 0..7 holding 5 entries, <b>front = 0</b>, <b>rear = 4</b>.', ar: 'ده slide 6، الـ <b>linear implementation</b>: الـ array من 0 لـ 7 وفيه 5 عناصر، والـ front عند 0 والـ rear عند 4.' },
    { f: 0, r: 5, en: 'Slide 7, <b>insert</b>: the rear moves right, rear = 5.', ar: 'ده slide 7، الـ <b>insert</b> بيحرك الـ rear يمين فبقى عند 5.' },
    { f: 0, r: 6, en: 'Slide 8, <b>insert</b>: rear = 6.', ar: 'ده slide 8، الـ <b>insert</b> بيخلي الـ rear عند 6.' },
    { f: 1, r: 6, off: 0, en: 'Slide 9, <b>delete</b>: the entry at index 0 comes off the queue; the front moves right, front = 1.', ar: 'ده slide 9، الـ <b>delete</b> بيشيل العنصر اللي عند index 0، والـ front بيتحرك يمين فبقى عند 1.' },
    { f: 2, r: 6, off: 1, en: 'Slide 10, <b>delete</b>: index 1 comes off; front = 2.', ar: 'ده slide 10، الـ <b>delete</b> بيشيل العنصر اللي عند index 1، والـ front بقى عند 2.' },
    { f: 2, r: 7, en: 'Slide 11, <b>insert</b>: rear = 7, the last index.', ar: 'ده slide 11، الـ <b>insert</b> بيوصّل الـ rear لـ 7 وده آخر index.' },
    { f: 2, r: 7, wait: true, nos: true, en: 'Slide 12, <b>insert</b> one more: rear == MAX-1 (7 == 7), so isFull is true: <b>NO SPACE HERE</b> after index 7.', ar: 'ده slide 12، عايزين <b>insert</b> كمان واحد، بس الشرط ده بقى true:' + L('rear == MAX-1 → 7 == 7') + 'يعني الـ isFull بترجع true، و<b>مفيش مكان</b> بعد index 7.' },
    { f: 2, r: 7, wait: true, sp: true, en: 'Slide 13: yet indexes 0 and 1 are empty, <b>SPACE HERE</b>. The rear only moves right, so the linear queue never reaches them.', ar: 'ده slide 13: مع إن الـ index 0 والـ index 1 فاضيين (<b>فيه مكان هنا</b>)، الـ rear بيتحرك يمين بس، فالـ linear queue عمره ما يوصلهم.' }
  ];
  function SlideTrace({ ar }) {
    const [i, ctl] = useWalk(TR.length, 2300, 0), s = TR[i];
    const cls = Array.from({ length: 9 }, (_, k) => k === 8 ? (s.nos ? 'ghost' : '') : k >= s.f && k <= s.r ? 'on' + (k === s.r && i > 0 && i !== 3 && i !== 4 ? ' hot' : '') : k === s.off ? 'bad' : (s.sp && k < 2 ? 'bad' : ''));
    return html`<figure className="fig dsv3"><div className="fig-stage">
      <div className="dsv3-new">${s.wait ? html`<i className="dsv3-pop"></i><span>new entry to insert</span>` : html`<span>${i === 3 || i === 4 ? 'delete at the front' : 'insert at the rear'}</span>`}</div>
      <div className="dsv3-tr">
        ${Array.from({ length: 9 }, (_, k) => k === 8 ? html`<div key=${k} className="dsv3-c"><span className="dsv3-ix"></span><span className=${'dsv3-v ' + cls[k]} style=${{ height: '26px', visibility: s.nos ? 'visible' : 'hidden' }}>✕</span><span className="dsv3-mk"></span></div>`
          : html`<div key=${k} className="dsv3-c"><span className="dsv3-ix">${k}</span><span className=${'dsv3-v ' + cls[k]} style=${{ height: '26px' }}></span><span className="dsv3-mk">${mark(k, s.f, s.r)}</span></div>`)}
        <div style=${{ gridColumn: '1 / 3', visibility: s.sp ? 'visible' : 'hidden' }}><div className="dsv3-brace"></div><div className="dsv3-tag">SPACE HERE</div></div>
        <div style=${{ gridColumn: '6 / 10', visibility: s.nos ? 'visible' : 'hidden' }}><div className="dsv3-tag">NO SPACE HERE ↑</div></div>
      </div>
      <${Legend} />
      <p className="dsv3-vars" style=${{ textAlign: 'center' }}>front = ${s.f}   rear = ${s.r}   MAX = 8</p>
      </div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${TR.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.2] slide 14: "Queue is Full (even after removing 2 elements)" ── */
  const W14 = [21, 33, 4, 12, 67, 78, 93];
  function Wasted({ ar }) {
    const [k, setK] = useState(calm() ? 2 : 0), [tried, setTried] = useState(false), [auto, setAuto] = useState(!calm());
    useEffect(() => { if (!auto) return; const t = setTimeout(() => { if (k < 2) setK(k + 1); else if (!tried) setTried(true); else setAuto(false); }, 2000); return () => clearTimeout(t); }, [k, tried, auto]);
    const set = v => { setAuto(false); setTried(false); setK(v); };
    const head = k, tail = 6, full = tail === 7 - 1, empty = head === -1 || head > tail, n = tail - head + 1;
    const cls = W14.map((_, j) => j < k ? 'gone' : 'on');
    let en, a;
    if (k === 0) { en = 'Slide 14, top: 7 entries, head = 0, tail = 6 = maxsize-1. <b>Queue is full</b>.'; a = 'ده الجزء الأول من slide 14: فيه 7 عناصر والـ head عند 0 والـ tail عند 6 اللي هو maxsize-1، يعني <b>الـ queue مليان</b>.'; }
    else if (tried) { en = `enqueue: isFull(tail) checks tail == maxsize-1: 6 == 6, true, so it prints <span class="dsv3-err">Queue is full</span>, although ${k} cell${k > 1 ? 's are' : ' is'} empty before head. Those cells are wasted.`; a = 'الـ enqueue بتنادي <bdi dir="ltr">isFull(tail)</bdi> وهي بتشيك:' + L('tail == maxsize-1 → 6 == 6 → true') + `فبتطبع <span class="dsv3-err">Queue is full</span>، مع إن فيه ${D(k)} خانة فاضية قبل الـ head، والخانات دي ضايعة.`; }
    else if (k <= 6) { en = `After ${k} dequeue${k > 1 ? 's' : ''}: head = ${k}, tail still 6. Still <b>full</b> (tail == maxsize-1) with only ${n} entr${n > 1 ? 'ies' : 'y'}: ${k} cell${k > 1 ? 's' : ''} can't be used again.`; a = `بعد ${D(k)} مرة dequeue بقى الـ head عند ${D(k)} والـ tail لسه عند 6. الـ queue لسه <b>full</b> (لأن <bdi dir="ltr">tail&nbsp;==&nbsp;maxsize-1</bdi>) وفيه ${D(n)} عنصر بس، والـ ${D(k)} خانة اللي فضيوا مش هينفع يتستخدموا تاني.`; }
    else { en = 'All 7 dequeued: head = 7 > tail = 6, so isEmpty is true, and tail == maxsize-1, so isFull is true too: an empty queue that accepts nothing.'; a = 'كل الـ 7 اتعملهم dequeue، فالـ head بقى 7 وده أكبر من الـ tail اللي هو 6، يعني الـ isEmpty بقت true، وفي نفس الوقت <bdi dir="ltr">tail&nbsp;==&nbsp;maxsize-1</bdi> يعني الـ isFull كمان true. الـ queue فاضي ومش بيقبل أي عنصر.'; }
    return html`<figure className="fig dsv3"><div className="fig-stage">
      <${Strip} n=${7} vals=${W14} F=${head} R=${tail} cls=${cls} w=${32} />
      <p className="dsv3-legend"><b>F</b> = head · <b>R</b> = tail · maxsize = 7${head > 6 ? ' · head = 7 (past the end)' : ''}</p>
      <div className="dsv3-out"><small>Professor's checks</small><span className="t">isFull:  tail == maxsize-1 → 6 == 6 → <span className=${full ? 'n' : 'y'}>${String(full)}</span></span><span className="t">isEmpty: head == -1 || head > tail → ${head} > 6 → ${String(empty)}</span><span className="t">entries = ${n}, wasted cells = ${k}</span></div>
      <div className="dsv3-row"><${Stepper} label="dequeues" v=${k} set=${set} min=${0} max=${7} /><button className="fig-btn" onClick=${() => { setAuto(false); setTried(true); }}>try enqueue</button></div>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${() => { setK(calm() ? 2 : 0); setTried(false); setAuto(!calm()); }}>↻ Slide example</button></div></figure>`;
  }

  /* ── [3.0] slide 15: the last cell connected to the first ── */
  const V15 = [29, 21, 72, 13, 34, 24];
  function RingIntro({ ar }) {
    const steps = [
      { en: 'Slide 15, <b>linear queue</b>: 29 21 72 13 34 24 in a straight line, front = 0, rear = 5. After index 5 there is nothing.', ar: 'ده slide 15، الـ <b>linear queue</b>: العناصر 29 21 72 13 34 24 على خط مستقيم، والـ front عند 0 والـ rear عند 5. بعد index 5 مفيش حاجة.' },
      { en: 'A <b>circular queue</b> connects the <b>last</b> position (5) back to the <b>first</b> (0).', ar: 'الـ <b>circular queue</b> بيوصّل <b>آخر</b> مكان (index 5) بـ <b>أول</b> مكان (index 0).' },
      { en: 'Bent into a circle: same cells, same front and rear, but after 5 comes 0 again, so freed cells at the start can be reused.', ar: 'ولما نلفه دايرة بيبقى نفس الخانات ونفس الـ front والـ rear، بس بعد index 5 بييجي index 0 تاني، فالخانات اللي تفضى في الأول ينفع تتستخدم تاني.' }
    ];
    const [i, ctl] = useWalk(steps.length, 2600, 0);
    const cls = V15.map((_, k) => 'on' + (i === 1 && (k === 0 || k === 5) ? ' hot' : ''));
    return html`<figure className="fig dsv3"><div className="fig-stage">
      <div className="dsv3-pair">
        <div className="dsv3-box"><b>Linear queue</b><${Strip} n=${6} vals=${V15} F=${0} R=${5} cls=${cls} w=${36} />
          <div className=${'dsv3-legend dsv3-show' + (i >= 1 ? '' : ' off')}>index 5 → index 0</div></div>
        <div className=${'dsv3-box dsv3-show' + (i >= 2 ? '' : ' off')}><b>Circular queue</b><${Ring} n=${6} vals=${V15} F=${0} R=${5} cls=${V15.map(() => 'on')} wrapFrom=${5} /></div>
      </div><${Legend} />
      </div><${Cap} ...${steps[i]} showAr=${ar} /><${SBar} n=${steps.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3.2] slides 17/21: the two full cases, checked on any head/tail ── */
  function FullCheck({ ar }) {
    const [S, setS] = useState(5), [h, setH] = useState(2), [t, setT] = useState(1);
    const setHead = v => { setH(v); if (v === -1) setT(-1); else if (t === -1) setT(v); };
    const setTail = v => { setT(v); if (v === -1) setH(-1); else if (h === -1) setH(0); };
    const setSize = v => { setS(v); setH(x => Math.min(x, v - 1)); setT(x => Math.min(x, v - 1)); };
    const preset = (a, b) => { setH(a); setT(b); };
    const empty = h === -1, n = empty ? 0 : ((t - h + S) % S) + 1;
    const c1 = h === 0 && t === S - 1, m = (h - 1) % (S - 1), c2 = t === m, std = (t + 1) % S === h, full = c1 || c2;
    const occ = k => !empty && ((k - h + S) % S) < n;
    const cls = Array.from({ length: S }, (_, k) => occ(k) ? 'on' : '');
    const vals = Array.from({ length: S }, (_, k) => occ(k) ? '•' : null);
    const yn = b => html`<span className=${b ? 'y' : 'n'}>${String(b)}</span>`;
    let en, a;
    if (empty) { en = 'head = tail = -1: the queue is <b>empty</b> (isEmpty: head == -1). Neither full case can be true.'; a = 'لما <bdi dir="ltr">head&nbsp;=&nbsp;tail&nbsp;=&nbsp;-1</bdi> الـ queue بيبقى <b>فاضي</b> (لأن الـ isEmpty بتشيك <bdi dir="ltr">head&nbsp;==&nbsp;-1</bdi>)، ومفيش ولا حالة من حالات الـ full تنفع تبقى true.'; }
    else if (c1) { en = `<b>Case 1</b>: head == 0 && tail == SIZE-1. All ${S} cells are used: <b>full</b>.`; a = `دي <b>الحالة الأولى</b>:` + L('head == 0 && tail == SIZE-1') + `كل الـ ${D(S)} خانات مستخدمة، يعني الـ queue <b>full</b>.`; }
    else if (c2) { en = `<b>Case 2</b>: tail is just one less than head (${t} = ${h} − 1), the rear has wrapped round and caught up with the front: <b>full</b> with ${n} entries.`; a = `دي <b>الحالة التانية</b>: الـ tail أقل من الـ head بواحد بالظبط، يعني الـ rear لف ولحق الـ front، فالـ queue <b>full</b> وفيه ${D(n)} عناصر:` + L(`${t} = ${h} − 1`); }
    else { en = `${n} of ${S} cells used: <b>not full</b>, so enQueue may store at (tail+1) % SIZE = ${(t + 1) % S}. Change head and tail, or try the presets.`; a = `فيه ${D(n)} خانات مستخدمة من ${D(S)}، يعني الـ queue <b>مش full</b>، والـ enQueue تقدر تخزّن في المكان ده:` + L(`(tail+1) % SIZE = ${(t + 1) % S}`) + 'غيّر الـ head والـ tail أو جرّب الـ presets.'; }
    return html`<figure className="fig dsv3"><div className="fig-stage">
      <div className="dsv3-modes" role="group">
        <button className="fig-btn" onClick=${() => preset(0, S - 1)}>Case 1</button><button className="fig-btn" onClick=${() => preset(2, 1)}>Case 2</button>
        <button className="fig-btn" onClick=${() => preset(1, Math.min(3, S - 1))}>Not full</button><button className="fig-btn" onClick=${() => preset(-1, -1)}>Empty</button></div>
      <${Ring} n=${S} vals=${vals} F=${h} R=${t} cls=${cls} mid=${[`head = ${h}`, `tail = ${t}`]} />
      <${Legend} h=${1} />
      <div className="dsv3-row"><${Stepper} label="SIZE" v=${S} set=${setSize} min=${3} max=${8} /></div>
      <div className="dsv3-row"><${Stepper} label="head" v=${h} set=${setHead} min=${-1} max=${S - 1} /><${Stepper} label="tail" v=${t} set=${setTail} min=${-1} max=${S - 1} /></div>
      <div className="dsv3-out"><small>Case 1</small><span className="t">head == 0 && tail == ${S - 1} → ${yn(c1)}</span>
        <small>Case 2 (slide code, C++ %)</small><span className="t">(head-1) % (SIZE-1) = ${h - 1} % ${S - 1} = ${m}</span><span className="t">tail == ${m} → ${yn(c2)}</span>
        <small>Standard single test</small><span className="t">(tail+1) % SIZE == head → ${(t + 1) % S} == ${h} → ${yn(std)}</span>
        <small>isFull()</small><span className="t">${yn(full)}${full === std ? '  (same answer as the single test)' : ''}</span></div>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [3.4] slides 19–20: inserting 100 into both queues ── */
  function Insert100({ ar }) {
    const S = [
      { f: 0, en: 'Slide 15: both queues hold 29 21 72 13 34 24, front = 0, rear = 5.', ar: 'ده slide 15: الـ queues الاتنين فيهم 29 21 72 13 34 24، والـ front عند 0 والـ rear عند 5.' },
      { f: 1, en: 'dequeue: 29 leaves both queues, front = 1.', ar: 'أول dequeue بيشيل 29 من الاتنين، والـ front بقى عند 1.' },
      { f: 2, en: 'Slide 19: after the 2nd dequeue (21), in both queues the front points at <b>72</b> and the rear at <b>24</b>.', ar: 'ده slide 19: بعد تاني dequeue (شال 21) الـ front في الاتنين بيشاور على <b>72</b> والـ rear على <b>24</b>.' },
      { f: 2, ins: true, en: 'Slide 20, enqueue 100. <span class="dsv3-err">Linear: not possible</span>, rear == MAX-1 (5 == 5). <span class="dsv3-yes">Circular: possible</span>, rear = (5 + 1) % 6 = 0, so 100 goes into index 0.', ar: 'ده slide 20، عايزين enqueue للـ 100. في الـ linear <span class="dsv3-err">مش ممكن</span> لأن:' + L('rear == MAX-1 → 5 == 5') + 'أما في الـ circular فـ<span class="dsv3-yes">ممكن</span>، والـ 100 بتتحط في index 0 لأن:' + L('rear = (5 + 1) % 6 = 0') }
    ];
    const [i, ctl] = useWalk(S.length, 2500, 0), s = S[i];
    const lin = V15.map((v, k) => k < s.f ? null : v), cir = V15.map((v, k) => k < s.f ? (s.ins && k === 0 ? 100 : null) : v);
    const lc = V15.map((_, k) => k < s.f ? '' : 'on'), cc = V15.map((_, k) => k < s.f ? (s.ins && k === 0 ? 'on ok' : '') : 'on');
    return html`<figure className="fig dsv3"><div className="fig-stage"><div className="dsv3-pair">
      <div className="dsv3-box"><b>Linear queue</b><${Strip} n=${6} vals=${lin} F=${s.f} R=${5} cls=${lc} w=${36} />
        <div className="dsv3-vars">front = ${s.f}  rear = 5</div>
        <div className="dsv3-verd">${s.ins && html`<span className="dsv3-err dsv3-pop">✕ Insertion not possible!</span>`}</div></div>
      <div className="dsv3-box"><b>Circular queue</b><${Ring} n=${6} vals=${cir} F=${s.f} R=${s.ins ? 0 : 5} cls=${cc} />
        <div className="dsv3-vars">front = ${s.f}  rear = ${s.ins ? 0 : 5}</div>
        <div className="dsv3-verd">${s.ins && html`<span className="dsv3-yes dsv3-pop">✓ Insertion possible!</span>`}</div></div>
      </div><${Legend} /></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4] the comparison table, driven: the same operations on a linear and a circular queue of size 5 ── */
  const MX = 5;
  const C_EX = [['E', 10], ['E', 20], ['E', 30], ['E', 40], ['E', 50], ['D'], ['D'], ['E', 60], ['E', 70], ['E', 80]];
  function runBoth(ops) {
    const l = { h: -1, t: -1, a: Array(MX).fill(null) }, c = { f: -1, r: -1, a: Array(MX).fill(null) };
    let lm = null, cm = null, row = null;
    for (const [op, v] of ops) {
      if (op === 'E') {
        if (l.t === MX - 1) { lm = { en: '"Queue is full": tail == maxsize-1 (4 == 4)', bad: 1 }; }
        else { if (l.h === -1) l.h = 0; l.t = l.t + 1; l.a[l.t] = v; lm = { en: `tail = tail + 1 = ${l.t}; queue[${l.t}] = ${v}` }; }
        const cfull = (c.f === 0 && c.r === MX - 1) || (c.r === (c.f - 1) % (MX - 1));
        if (cfull) { cm = { en: `"Queue is full." (${c.f === 0 && c.r === MX - 1 ? 'front == 0 && rear == 4' : 'rear == (front-1) % 4 = ' + c.r})`, bad: 1 }; }
        else { if (c.f === -1) c.f = 0; const r0 = c.r; c.r = (c.r + 1) % MX; c.a[c.r] = v; cm = { en: `rear = (${r0} + 1) % 5 = ${c.r}; arr[${c.r}] = ${v}` }; }
        row = lm.bad ? (cm.bad ? 'full' : 'reuse') : (c.r === 0 && c.f > 0 ? 'reuse' : 'rear');
      } else {
        if (l.h === -1 || l.h > l.t) { lm = { en: `"Queue Underflow" (${l.h === -1 ? 'head == -1' : 'head ' + l.h + ' > tail ' + l.t}); returns -1`, bad: 1 }; }
        else { const e = l.a[l.h]; l.a[l.h] = { gone: e }; l.h++; lm = { en: `returns ${e}; head++ → ${l.h}` }; }
        if (c.f === -1) { cm = { en: '"Queue is empty." (front == -1); returns -1', bad: 1 }; }
        else { const e = c.a[c.f]; c.a[c.f] = null; if (c.f === c.r) { c.f = -1; c.r = -1; cm = { en: `returns ${e}; front == rear, so front = rear = -1` }; } else { const f0 = c.f; c.f = (c.f + 1) % MX; cm = { en: `returns ${e}; front = (${f0} + 1) % 5 = ${c.f}` }; } }
        row = 'empty';
      }
    }
    return { l, c, lm, cm, row };
  }
  const ROWS = [
    ['line', 'Elements arranged in a straight line', 'Last position is connected back to the first'],
    ['full', 'Full when rear == MAX-1', 'Full when (front == 0 && rear == MAX-1) or rear is one behind front'],
    ['reuse', 'Empty cells before front cannot be reused (memory wastage)', 'Freed cells are reused (rear wraps around)'],
    ['rear', 'rear = rear + 1', 'rear = (rear + 1) % MAX'],
    ['empty', 'Empty when front == -1 or front > rear', 'Empty when front == -1 (reset to -1 after removing the last element)']
  ];
  function VsSim({ ar }) {
    const [ops, setOps] = useState(C_EX), [pos, setPos] = useState(calm() ? C_EX.length : 0), [auto, setAuto] = useState(!calm()), [val, setVal] = useState('');
    useEffect(() => { if (!auto) return; if (pos >= ops.length) { setAuto(false); return; } const t = setTimeout(() => setPos(p => p + 1), 1500); return () => clearTimeout(t); }, [pos, auto, ops]);
    const S = runBoth(ops.slice(0, pos)), cur = pos > 0 ? ops[pos - 1] : null;
    const nextV = () => { const used = ops.slice(0, pos).filter(o => o[0] === 'E').map(o => o[1]); return used.length ? Math.max(...used) + 10 : 10; };
    const push = op => { setAuto(false); const v = parseInt(val, 10); const o = op === 'E' ? ['E', Number.isFinite(v) ? Math.max(-999, Math.min(999, v)) : nextV()] : ['D']; setOps(ops.slice(0, pos).concat([o])); setPos(pos + 1); setVal(''); };
    const ex = () => { setOps(C_EX); setPos(0); setAuto(!calm()); if (calm()) setPos(C_EX.length); };
    const lv = S.l.a.map(x => x && typeof x === 'object' ? x.gone : x), lc = S.l.a.map((x, k) => x == null ? '' : typeof x === 'object' ? 'gone' : 'on');
    const cv = S.c.a, cc = S.c.a.map(x => x == null ? '' : 'on');
    const what = cur ? (cur[0] === 'E' ? `enqueue(${cur[1]})` : 'dequeue()') : 'start';
    const en = cur ? `<b>${what}</b> on both queues. Linear: ${S.lm.en}. Circular: ${S.cm.en}. The matching row of the table is highlighted.` : 'Both queues start empty: head = tail = -1 (front = rear = -1). Press Next to run the notes\' sequence, or use enqueue / dequeue.';
    const a = cur ? `اتعمل ${D(what)} على الاتنين. اللي حصل في الـ linear:` + L(S.lm.en.replace(/"/g, '&quot;')) + 'واللي حصل في الـ circular:' + L(S.cm.en.replace(/"/g, '&quot;')) + 'والسطر اللي بيشرح ده في الجدول متعلّم.' : 'الـ queues الاتنين بيبدأوا فاضيين، يعني الـ head والـ tail بـ -1. دوس Next عشان تشغّل sequence الـ notes، أو استخدم الـ enqueue والـ dequeue.';
    return html`<figure className="fig dsv3"><div className="fig-stage">
      <div className="dsv3-pair">
        <div className="dsv3-box"><b>Linear queue (size 5)</b><${Strip} n=${MX} vals=${lv} F=${S.l.h} R=${S.l.t} cls=${lc} w=${40} />
          <div className="dsv3-vars">head = ${S.l.h}  tail = ${S.l.t}</div><div className=${'dsv3-verd' + (S.lm && S.lm.bad ? ' dsv3-err' : '')}>${S.lm ? S.lm.en : ''}</div></div>
        <div className="dsv3-box"><b>Circular queue (size 5)</b><${Strip} n=${MX} vals=${cv} F=${S.c.f} R=${S.c.r} cls=${cc} w=${40} />
          <div className="dsv3-legend">index 4 → index 0</div>
          <div className="dsv3-vars">front = ${S.c.f}  rear = ${S.c.r}</div><div className=${'dsv3-verd' + (S.cm && S.cm.bad ? ' dsv3-err' : '')}>${S.cm ? S.cm.en : ''}</div></div>
      </div>
      <div className="dsv3-row"><input className="dsv3-in" inputMode="numeric" placeholder=${String(nextV())} value=${val} onInput=${e => setVal(e.target.value.replace(/[^0-9-]/g, '').slice(0, 4))} aria-label="value to enqueue" />
        <button className="fig-btn" onClick=${() => push('E')}>enqueue</button><button className="fig-btn" onClick=${() => push('D')}>dequeue</button></div>
      <p className="dsv3-log">${ops.map((o, k) => html`<span key=${k} style=${{ fontWeight: k === pos - 1 ? 700 : 400, opacity: k < pos ? 1 : .5 }}>${o[0] === 'E' ? 'E' + o[1] : 'D'}${k < ops.length - 1 ? ' ' : ''}</span>`)}</p>
      <table className="dsv3-tb"><thead><tr><th>Linear queue</th><th>Circular queue</th></tr></thead><tbody>
        ${ROWS.map(r => html`<tr key=${r[0]} className=${S.row === r[0] || (!cur && r[0] === 'line') ? 'cur' : ''}><td>${r[1]}</td><td>${r[2]}</td></tr>`)}</tbody></table>
      </div><${Cap} en=${en} ar=${a} showAr=${ar} />
      <div className="fig-bar"><span className="dsv3-cnt">${pos} / ${ops.length}</span><span className="grow"></span>
        <button className="fig-btn" onClick=${() => { setAuto(false); setPos(Math.max(0, pos - 1)); }} disabled=${pos === 0}>‹ Back</button>
        <button className="fig-btn" onClick=${() => { setAuto(false); setPos(Math.min(ops.length, pos + 1)); }} disabled=${pos >= ops.length}>Next ›</button>
        <button className="fig-btn" onClick=${ex}>Example from the notes</button></div></figure>`;
  }

  /* ── [6] Exam 2022/23: the trace on a circular queue of size 5 ── */
  const EX_CODE = ['enqueue(10)', 'enqueue(20)', 'print head and tail', 'enqueue(30)', 'cout << dequeue()', 'x = dequeue()', 'print head and tail'];
  const EX = [
    { f: -1, r: -1, a: [], out: [], en: 'Start: a circular queue of size 5, head = tail = -1 (empty).', ar: 'في الأول عندنا circular queue حجمه 5، والـ head والـ tail بـ -1 يعني فاضي.' },
    { f: 0, r: 0, a: [10], out: [], msg: ['Enqueued element: 10'], en: '<b>enqueue(10)</b>: first element, so front = 0; rear = (-1 + 1) % 5 = 0; arr[0] = 10.', ar: 'الـ <b><bdi dir="ltr">enqueue(10)</bdi></b> ده أول عنصر فالـ front بقى 0، وبعدين:' + L('rear = (-1 + 1) % 5 = 0, arr[0] = 10') },
    { f: 0, r: 1, a: [10, 20], out: [], msg: ['Enqueued element: 20'], en: '<b>enqueue(20)</b>: rear = (0 + 1) % 5 = 1; arr[1] = 20.', ar: 'الـ <b><bdi dir="ltr">enqueue(20)</bdi></b> بتعمل:' + L('rear = (0 + 1) % 5 = 1, arr[1] = 20') },
    { f: 0, r: 1, a: [10, 20], out: ['Head = 0 Tail = 1'], en: 'Print: <b>Head = 0 Tail = 1</b>.', ar: 'بنطبع الـ head والـ tail فيطلع:' + L('Head = 0 Tail = 1') },
    { f: 0, r: 2, a: [10, 20, 30], out: [], msg: ['Enqueued element: 30'], en: '<b>enqueue(30)</b>: rear = (1 + 1) % 5 = 2; arr[2] = 30.', ar: 'الـ <b><bdi dir="ltr">enqueue(30)</bdi></b> بتعمل:' + L('rear = (1 + 1) % 5 = 2, arr[2] = 30') },
    { f: 1, r: 2, a: [null, 20, 30], g: [0], out: ['10'], msg: ['Dequeued element: 10'], en: '<b>cout &lt;&lt; dequeue()</b>: element = arr[0] = 10; front ≠ rear, so front = (0 + 1) % 5 = 1. Prints <b>10</b>.', ar: 'الـ <b><bdi dir="ltr">dequeue()</bdi></b> هنا بترجّع:' + L('element = arr[0] = 10') + 'وبما إن الـ front مش بيساوي الـ rear فـ:' + L('front = (0 + 1) % 5 = 1') + 'والـ cout بتطبع <b>10</b>.' },
    { f: 2, r: 2, a: [null, null, 30], g: [0, 1], out: [], msg: ['Dequeued element: 20'], en: '<b>x = dequeue()</b>: x = arr[1] = 20; front = (1 + 1) % 5 = 2.', ar: 'الـ <b><bdi dir="ltr">x&nbsp;=&nbsp;dequeue()</bdi></b> بتدّي:' + L('x = arr[1] = 20, front = (1 + 1) % 5 = 2') },
    { f: 2, r: 2, a: [null, null, 30], g: [0, 1], out: ['Head = 2 Tail = 2'], en: 'Print: <b>Head = 2 Tail = 2</b>. One element, 30, is left (head == tail).', ar: 'بنطبع تاني فيطلع:' + L('Head = 2 Tail = 2') + 'يعني فاضل عنصر واحد بس وهو 30 (الـ head بيساوي الـ tail).' }
  ];
  function ExamTrace({ ar }) {
    const [i, ctl] = useWalk(EX.length, 2400, 0), [msgs, setMsgs] = useState(false), s = EX[i];
    const lines = []; EX.slice(1, i + 1).forEach(e => { if (msgs && e.msg) lines.push(...e.msg.map(m => ['m', m])); e.out.forEach(o => lines.push(['o', o])); });
    const vals = Array.from({ length: 5 }, (_, k) => s.a[k] != null ? s.a[k] : (s.g && s.g.includes(k) ? [10, 20][k] : null));
    const cls = vals.map((v, k) => s.a[k] != null ? 'on' : s.g && s.g.includes(k) ? 'gone' : '');
    return html`<figure className="fig dsv3"><div className="fig-stage">
      <pre className="dsv3-code">${EX_CODE.map((l, k) => html`<span key=${k} className=${k === i - 1 ? 'cur' : ''}>${l}</span>`)}</pre>
      <${Ring} n=${5} vals=${vals} F=${s.f} R=${s.r} cls=${cls} mid=${[`head = ${s.f}`, `tail = ${s.r}`]} />
      <${Legend} h=${1} />
      <div className="dsv3-modes" style=${{ marginTop: '8px' }}><button className="fig-btn" aria-pressed=${String(msgs)} onClick=${() => setMsgs(!msgs)}>with the slide's cout lines</button></div>
      <div className="dsv3-out"><small>Output</small>${lines.length ? lines.map((l, k) => html`<span key=${k} className="t" style=${{ color: l[0] === 'm' ? 'var(--graphite)' : 'var(--ink)', fontWeight: l[0] === 'm' ? 400 : 700 }}>${l[1]}</span>`) : ' '}</div>
      </div><${Cap} en=${s.en + (msgs && i > 0 ? ' (Grey lines: the slide\'s enQueue/deQueue messages.)' : '')} ar=${s.ar} showAr=${ar} /><${SBar} n=${EX.length} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ds-l3-fifo-line': FifoLine, 'ds-l3-slide-trace': SlideTrace, 'ds-l3-wasted': Wasted, 'ds-l3-ring': RingIntro,
    'ds-l3-full-check': FullCheck, 'ds-l3-insert-100': Insert100, 'ds-l3-vs-sim': VsSim, 'ds-l3-exam-trace': ExamTrace
  });
})();

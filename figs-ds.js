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
/* ── part L4 ── */
// Data Structures visuals, Lecture 4 (Pointers and dynamic allocation): the pointer box-and-arrow of slide 2, the pointer operations of slide 3 (plus new/delete), the swap goal of slide 4, the fakeSwap/trueSwap memory traces of slides 6–19, the Lab pointer program, normal vs dynamic arrays, the three memory segments and linked nodes made with new. Every label, address and number comes from the site's notes and the slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm } = window.FIGKIT;
  const CSS = `
.dsv4 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dsv4 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv4 *{ font-variant-ligatures:none; font-feature-settings:"liga" 0, "calt" 0; }
.dsv4-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dsv4-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dsv4-chips .fig-btn{ font:.8rem var(--mono); padding:3px 8px; min-height:30px; }
.dsv4-row{ display:flex; flex-wrap:wrap; gap:6px 10px; justify-content:center; align-items:center; margin:6px 0; }
.dsv4-code{ margin:0 auto 8px; max-width:440px; padding:8px 10px; border:1px solid var(--line); border-radius:8px; background:var(--paper); font:.8rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv4-code span{ display:block; border-radius:3px; padding:0 3px; transition:background .3s; }
.dsv4-code span.cur{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.dsv4-code i{ font-style:normal; color:var(--graphite); }
.dsv4-out{ max-width:440px; margin:8px auto 0; padding:6px 10px; border:1px solid var(--line); border-left:4px solid var(--fig-k); border-radius:6px; background:var(--paper); font:600 .82rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; min-height:1.5em; text-align:left; direction:ltr; }
.dsv4-out small{ display:block; font:600 .75rem var(--body); color:var(--graphite); }
.dsv4-out div.new{ background:color-mix(in srgb, var(--fig-k) 22%, transparent); border-radius:3px; }
.dsv4-in{ font:.9rem var(--mono); padding:4px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:32px; width:64px; box-sizing:border-box; }
.dsv4-lbl{ font-size:.85rem; color:var(--graphite); display:inline-flex; gap:6px; align-items:center; }
.dsv4-note{ font-size:.8rem; color:var(--graphite); text-align:center; margin:6px 0 0; line-height:1.4; }
.dsv4-cnt{ font-size:.85rem; color:var(--graphite); }
.dsv4-svg{ width:100%; max-width:340px; height:auto; display:block; margin:0 auto; }
.dsv4-svg text{ fill:var(--ink); font-family:var(--mono); font-size:15px; }
.dsv4-svg text.ad{ fill:var(--graphite); font-size:14px; }
.dsv4-svg text.nm{ font-weight:700; }
.dsv4-svg text.it{ font-style:italic; font-weight:700; font-size:14px; }
.dsv4-svg text.sg{ fill:var(--graphite); font-family:var(--body); font-size:14px; }
.dsv4-svg .bx{ fill:var(--paper); stroke:var(--ink); stroke-width:2; transition:fill .35s, stroke .35s, opacity .35s; }
.dsv4-svg .bx.hot{ stroke:var(--fig-k); stroke-width:3.5; fill:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.dsv4-svg .bx.free{ stroke-dasharray:6 4; opacity:.55; }
.dsv4-svg .ln{ fill:none; stroke:var(--fig-k); stroke-width:2.6; }
.dsv4-svg .ln.dim{ stroke-dasharray:5 4; opacity:.45; }
.dsv4-svg .ah{ fill:var(--fig-k); }
.dsv4-svg .dv{ stroke:var(--line); stroke-width:1.5; stroke-dasharray:4 4; }
.dsv4-svg .gr{ transition:opacity .4s; }
.dsv4-swap{ display:flex; flex-wrap:wrap; gap:8px 14px; justify-content:center; align-items:center; }
.dsv4-pair{ display:grid; gap:6px; }
.dsv4-var{ display:flex; align-items:center; gap:6px; font:700 .95rem var(--mono); color:var(--ink); }
.dsv4-var span{ min-width:42px; height:36px; display:grid; place-items:center; border:2px solid var(--ink); border-radius:4px; background:var(--paper); transition:background .35s, border-color .35s; }
.dsv4-var span.hot{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.dsv4-mid{ display:flex; flex-direction:column; align-items:center; font:700 .85rem var(--body); color:var(--fig-k); }
.dsv4-mid b{ font-size:1.5rem; line-height:1; }
.dsv4-mark{ font:700 .9rem var(--body); text-align:center; margin-top:8px; min-height:1.3em; }
.dsv4-mark.ok{ color:var(--ok); } .dsv4-mark.bad{ color:var(--pen); }
.dsv4-mem{ display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 1.25fr); gap:8px; max-width:460px; margin:0 auto; }
.dsv4-seg{ border:1px solid var(--line); border-top:3px solid var(--fig-k); border-radius:8px; background:var(--paper); padding:6px; color:var(--ink); min-width:0; }
.dsv4-seg > b{ display:block; font-size:.82rem; margin-bottom:4px; }
.dsv4-seg > small{ display:block; font-size:.75rem; color:var(--graphite); margin-bottom:4px; line-height:1.3; }
.dsv4-slot{ display:flex; align-items:center; gap:5px; margin:4px 0; font:600 .82rem var(--mono); }
.dsv4-slot > span{ flex:1; min-width:0; min-height:30px; display:grid; place-items:center; border:2px solid var(--ink); border-radius:4px; padding:0 3px; font-size:.78rem; text-align:center; transition:background .35s, border-color .35s; }
.dsv4-slot > span.hot{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 20%, var(--paper)); }
.dsv4-blk{ display:flex; flex-wrap:wrap; gap:3px; padding:4px; border:2px solid var(--fig-k); border-radius:6px; transition:opacity .4s; }
.dsv4-blk.free{ border-style:dashed; opacity:.45; }
.dsv4-blk div{ display:flex; flex-direction:column; align-items:center; }
.dsv4-blk span{ width:30px; height:28px; display:grid; place-items:center; border:1px solid var(--line); border-radius:4px; background:var(--paper); font:600 .78rem var(--mono); transition:background .35s; }
.dsv4-blk span.on{ background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); }
.dsv4-blk small{ font:.75rem var(--mono); color:var(--graphite); }
.dsv4-empty{ font-size:.78rem; color:var(--graphite); font-style:italic; }
.dsv4-segs{ display:grid; gap:8px; max-width:440px; margin:10px auto 0; }
.dsv4-segs .dsv4-seg{ min-height:56px; transition:box-shadow .35s; }
.dsv4-segs .dsv4-seg.hot{ box-shadow:0 0 0 2px var(--fig-k); }
.dsv4-tag{ display:inline-block; margin:2px 4px 2px 0; padding:2px 8px; border-radius:99px; background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); font:.78rem var(--mono); color:var(--ink); }
.dsv4-list{ display:flex; flex-wrap:wrap; gap:8px 4px; align-items:center; }
.dsv4-node{ display:flex; border:2px solid var(--ink); border-radius:5px; overflow:hidden; font:600 .78rem var(--mono); }
.dsv4-node span{ padding:5px 6px; background:var(--paper); }
.dsv4-node span + span{ border-left:2px solid var(--ink); min-width:22px; text-align:center; color:var(--fig-k); }
.dsv4-node.hot{ border-color:var(--fig-k); }
.dsv4-to{ color:var(--fig-k); font-weight:700; }
.dsv4-pop{ animation:dsv4-in .45s ease both; }
@keyframes dsv4-in{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }
@media (prefers-reduced-motion: reduce){ .dsv4-pop{ animation:none; } .dsv4-code span, .dsv4-svg .bx, .dsv4-svg .gr, .dsv4-var span, .dsv4-slot > span, .dsv4-blk{ transition:none; } }`;
  if (!document.getElementById('dsv4-css')) { const s = document.createElement('style'); s.id = 'dsv4-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* helpers */
  const L = s => `<span class="ltr">${s}</span>`;
  const D = s => `<bdi dir="ltr">${String(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const int = (s, d) => { const v = parseInt(s, 10); return Number.isFinite(v) && Math.abs(v) < 1e6 ? v : d; };
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  const SBar = ({ n, i, ctl }) => html`<div className="fig-bar">
    ${n <= 14 ? html`<div className="fig-dots" aria-hidden="true">${Array.from({ length: n }, (_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</div>` : html`<span className="dsv4-cnt">Step ${i + 1} / ${n}</span>`}
    <span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i >= n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;
  const Modes = ({ list, mode, set }) => html`<div className="dsv4-modes" role="group">${list.map(([k, l]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${l}</button>`)}</div>`;
  const Code = ({ lines, cur }) => html`<pre className="dsv4-code">${lines.map((l, k) => html`<span key=${k} className=${(Array.isArray(cur) ? cur.includes(k) : k === cur) ? 'cur' : ''}>${l || ' '}</span>`)}</pre>`;
  // arrowhead with its tip at (x, y), pointing l / r / u / d
  const tri = (x, y, d) => { const s = 8, w = 5.5, P = { l: [[x + s, y - w], [x + s, y + w]], r: [[x - s, y - w], [x - s, y + w]], u: [[x - w, y + s], [x + w, y + s]], d: [[x - w, y - s], [x + w, y - s]] }[d];
    return html`<polygon className="ah" points=${[[x, y]].concat(P).map(p => p.join(',')).join(' ')} />`; };
  // a memory row as on the slides: address, name, box with the value
  const MemRow = ({ y, addr, name, val, hot, free, ital, ax = 4, nx = 94, bx = 100, bw = 112, h = 34, fs }) => html`<g>
    <text className="ad" x=${ax} y=${y + h / 2 + 5}>${addr}</text>
    <text className="nm" x=${nx} y=${y + h / 2 + 5} textAnchor="end">${name}</text>
    <rect className=${'bx' + (hot ? ' hot' : '') + (free ? ' free' : '')} x=${bx} y=${y} width=${bw} height=${h} rx="3" />
    <text className=${ital ? 'it' : ''} x=${bx + bw / 2} y=${y + h / 2 + 5} textAnchor="middle" style=${fs ? { fontSize: fs + 'px' } : null}>${val}</text></g>`;
  const ToolIn = ({ label, v, set }) => html`<label className="dsv4-lbl">${label}<input className="dsv4-in" inputMode="numeric" value=${v} onChange=${e => set(e.target.value)} aria-label=${label} /></label>`;

  /* ── [0.0]–[0.2] slide 2: int *pointer1 = &x; box and arrow ── */
  function L4PointerBox({ ar }) {
    const steps = [
      { en: '<code>int x;</code> is an ordinary int variable. On slide 2 it holds <b>1</b> and its place in memory is address <b>0x9060</b>.', ar: 'المتغير ' + D('int x;') + ' هو variable عادي من نوع int. في slide 2 جواه القيمة <b>1</b> ومكانه في الـ memory هو الـ address ' + D('0x9060') + '.' },
      { en: '<code>int *pointer1</code>: a pointer is a <b>data type</b>, so you create a variable of it like any other type. pointer1 gets its own place in memory, <b>0x2000</b>.', ar: 'الـ pointer هو <b>data type</b>، فبنعمل منه variable زي أي type تاني. الـ pointer1 ليه مكان خاص بيه في الـ memory هو ' + D('0x2000') + '.' },
      { en: '<code>= &x</code> stores the <b>address of x</b> (& = address-of) in pointer1. Its content is an address, <b>addr of x = 0x9060</b>, not the value 1. The arrow: pointer1 <b>points to</b> x.', ar: 'الجزء ' + D('= &x') + ' بيخزن <b>الـ address بتاع x</b> جوه الـ pointer1 (الـ & معناها address-of). يعني المحتوى بتاعه address وهو ' + D('0x9060') + '، مش القيمة 1. والسهم معناه إن الـ pointer1 <b>بيشاور</b> على x.' },
      { en: '<code>*pointer1</code> follows the arrow: it reads the int stored at 0x9060, the value <b>1</b>. A pointer points to a <b>specific data type</b>: pointer1 is an int*, so what it points to is read as an int.', ar: 'الـ ' + D('*pointer1') + ' بيمشي ورا السهم ويقرا الـ int اللي في ' + D('0x9060') + '، يعني القيمة <b>1</b>. والـ pointer بيشاور على <b>data type معين</b>: الـ pointer1 نوعه ' + D('int*') + ' فاللي بيشاور عليه بيتقري كـ int.' }
    ];
    const [i, ctl] = useWalk(steps.length, 2400, 0);
    return html`<figure className="fig dsv4"><div className="fig-stage">
      <${Code} lines=${['int x;', 'int *pointer1 = &x;', 'cout << *pointer1;   // 1']} cur=${i === 0 ? 0 : i < 3 ? 1 : 2} />
      <svg className="dsv4-svg" viewBox="0 0 300 176" role="img" aria-label="pointer1 at 0x2000 holds the address of x; x at 0x9060 holds 1">
        <g className="gr" style=${{ opacity: i >= 1 ? 1 : .15 }}>
          <text className="nm" x="70" y="24" textAnchor="middle">pointer1</text>
          <rect className=${'bx' + (i === 2 ? ' hot' : '')} x="10" y="32" width="120" height="50" rx="3" />
          <text className="it" x="70" y="53" textAnchor="middle">${i >= 2 ? 'addr of x' : '?'}</text>
          ${i >= 2 && html`<text className="ad" x="70" y="73" textAnchor="middle">= 0x9060</text>`}
          <text className="ad" x="70" y="100" textAnchor="middle">0x2000</text></g>
        <g className="gr" style=${{ opacity: i >= 2 ? 1 : 0 }}><path className="ln" d="M130 57 C 168 57, 140 131, 164 131" />${tri(170, 131, 'r')}</g>
        <text className="nm" x="230" y="104" textAnchor="middle">int x;</text>
        <rect className=${'bx' + (i === 0 || i === 3 ? ' hot' : '')} x="170" y="112" width="120" height="38" rx="3" />
        <text x="230" y="136" textAnchor="middle">1</text>
        <text className="ad" x="230" y="168" textAnchor="middle">0x9060</text>
      </svg></div>
      <${Cap} ...${steps[i]} showAr=${ar} /><${SBar} n=${steps.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1] slide 3 + table: the pointer operations, one by one ── */
  const OPS = [
    { k: 'Type* aPtr;', en: '<code>Type object; Type* aPtr;</code> declares an object and a <b>pointer to Type</b>. aPtr exists but holds no address yet.', ar: 'السطرين دول بيعرّفوا object وكمان <b>pointer to Type</b> اسمه aPtr:' + L('Type object; Type* aPtr;') + 'الـ aPtr موجود بس لسه مفيهوش address.' },
    { k: 'aPtr = &object;', en: '<code>aPtr = &object;</code> assigns the <b>address of object</b> to aPtr (& = address-of). Now aPtr points to object.', ar: 'السطر ده بيحط <b>الـ address بتاع الـ object</b> في الـ aPtr (الـ & معناها address-of)، فالـ aPtr بقى بيشاور على الـ object:' + L('aPtr = &object;') },
    { k: '*aPtr', en: '<code>*aPtr</code> <b>accesses the object through the pointer</b> (dereference): follow the arrow and you reach object itself.', ar: 'الـ ' + D('*aPtr') + ' بيوصل <b>للـ object عن طريق الـ pointer</b> (ده الـ dereference)، يعني تمشي ورا السهم توصل للـ object نفسه.' },
    { k: '(*aPtr).member', en: 'If aPtr points to a structure, <code>(*aPtr).member</code> is a member of it: first *aPtr reaches the structure, then <b>.member</b> picks the field.', ar: 'لو الـ aPtr بيشاور على structure، يبقى الـ ' + D('(*aPtr).member') + ' هو member فيه: الأول ' + D('*aPtr') + ' يوصل للـ structure، وبعدين ' + D('.member') + ' تختار الـ field.' },
    { k: 'aPtr->member', en: '<code>aPtr->member</code> (the arrow operator) is <b>the same as</b> <code>(*aPtr).member</code>: the same field is reached.', ar: 'الـ arrow operator هو <b>نفس الحاجة</b> بالظبط ويوصل لنفس الـ field:' + L('aPtr->member  ≡  (*aPtr).member') },
    { k: 'p = new Type;', en: '<code>new Type</code> (or <code>new Type[n]</code>) <b>allocates memory on the heap at run time</b> and returns its address, which p stores.', ar: 'الـ ' + D('new Type') + ' (أو ' + D('new Type[n]') + ') <b>بتحجز memory في الـ heap وقت الـ run time</b> وترجّع الـ address بتاعها، والـ p بيخزنه.' },
    { k: 'delete p;', en: '<code>delete p</code> <b>frees</b> the memory allocated with new (<code>delete[] p</code> for memory from new[]).', ar: 'الـ ' + D('delete p') + ' <b>بتحرر</b> الـ memory اللي اتحجزت بالـ new، واللي اتحجز بـ ' + D('new[]') + ' بيتحرر بـ ' + D('delete[] p') + '.' }
  ];
  function L4PtrOps({ ar }) {
    const [i, ctl] = useWalk(OPS.length, 2600, 0), O = OPS[i];
    return html`<figure className="fig dsv4"><div className="fig-stage">
      <div className="dsv4-modes dsv4-chips" role="group">${OPS.map((o, k) => html`<button key=${k} className="fig-btn" aria-pressed=${String(i === k)} onClick=${() => ctl.go(k)}>${o.k}</button>`)}</div>
      <svg className="dsv4-svg" viewBox="0 0 300 226" role="img" aria-label="object, aPtr and p on the stack side; the block from new on the heap side">
        <text className="sg" x="76" y="14" textAnchor="middle">local variables</text><text className="sg" x="230" y="14" textAnchor="middle">heap</text>
        <line className="dv" x1="160" y1="4" x2="160" y2="222" />
        <text className="nm" x="75" y="36" textAnchor="middle">object</text>
        <rect className=${'bx' + (i === 2 ? ' hot' : '')} x="12" y="42" width="126" height="58" rx="4" />
        <text className="ad" x="75" y="60" textAnchor="middle">Type</text>
        <rect className=${'bx' + (i === 3 || i === 4 ? ' hot' : '')} x="22" y="68" width="106" height="26" rx="3" />
        <text x="75" y="86" textAnchor="middle">member</text>
        <text className="nm" x="75" y="122" textAnchor="middle">aPtr</text>
        <rect className=${'bx' + (i === 1 ? ' hot' : '')} x="12" y="128" width="126" height="34" rx="3" />
        <text className=${i >= 1 ? 'it' : ''} x="75" y="150" textAnchor="middle" style=${{ fontSize: '13.5px' }}>${i >= 1 ? 'addr of object' : '?'}</text>
        <g className="gr" style=${{ opacity: i >= 1 ? 1 : 0 }}><path className="ln" d="M138 145 H152 V71 H147" />${tri(139, 71, 'l')}</g>
        <g className="gr" style=${{ opacity: i >= 5 ? 1 : 0 }}>
          <text className="nm" x="75" y="184" textAnchor="middle">p</text>
          <rect className=${'bx' + (i === 5 ? ' hot' : '')} x="12" y="190" width="126" height="34" rx="3" />
          <text className="it" x="75" y="212" textAnchor="middle" style=${{ fontSize: '13.5px' }}>addr of block</text>
          <path className=${'ln' + (i === 6 ? ' dim' : '')} d="M138 207 H150 C 160 207, 152 178, 164 178" />${tri(172, 178, 'r')}
          <text className="nm" x="230" y="150" textAnchor="middle">${i === 6 ? 'freed' : 'new Type'}</text>
          <rect className=${'bx' + (i === 5 ? ' hot' : '') + (i === 6 ? ' free' : '')} x="172" y="158" width="116" height="40" rx="4" />
          <text x="230" y="183" textAnchor="middle" style=${{ opacity: i === 6 ? .5 : 1 }}>Type</text></g>
      </svg></div>
      <${Cap} en=${O.en} ar=${O.ar} showAr=${ar} /><${SBar} n=${OPS.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2] slide 4: the goal, and what each solution really prints ── */
  function L4SwapGoal({ ar }) {
    const [m, setM] = useState('goal');
    const after = m === 'fake' ? [1, 2] : [2, 1];
    const C = {
      goal: { en: 'Slide 4: the goal is a function that <b>swaps</b> x and y, so x: 1, y: 2 becomes x: 2, y: 1. Try the two solutions.', ar: 'في slide 4 الهدف function <b>تبدّل</b> قيمة x مع y، يعني من' + L('x: 1, y: 2') + 'تبقى' + L('x: 2, y: 1') + 'جرّب الحلّين.', mark: '' },
      fake: { en: '<b>Solution 1</b>, <code>fakeSwap(x, y)</code>, passes the <b>values</b>: the function swaps its own copies a and b, so main still prints <b>x= 1 y= 2</b>.', ar: 'الحل الأول بيبعت <b>القيم</b> بس، فالـ function بتبدّل النسخ بتاعتها a و b، والـ main بتطبع برضه:' + L('x= 1 y= 2'), mark: '✕ not swapped' },
      tru: { en: '<b>Solution 2</b>, <code>trueSwap(&x, &y)</code>, passes the <b>addresses</b>: through *a and *b the function changes x and y themselves, so main prints <b>x= 2 y= 1</b>.', ar: 'الحل التاني بيبعت <b>الـ addresses</b>، فالـ function عن طريق ' + D('*a') + ' و ' + D('*b') + ' بتغيّر x و y نفسهم، والـ main بتطبع:' + L('x= 2 y= 1'), mark: '✓ swapped' }
    }[m];
    const V = (n, v, hot) => html`<div className="dsv4-var">${n}:<span className=${hot ? 'hot' : ''}>${v}</span></div>`;
    return html`<figure className="fig dsv4"><div className="fig-stage">
      <${Modes} list=${[['goal', 'Goal (slide 4)'], ['fake', 'fakeSwap(x, y)'], ['tru', 'trueSwap(&x, &y)']]} mode=${m} set=${setM} />
      <div className="dsv4-swap">
        <div className="dsv4-pair">${V('x', 1)}${V('y', 2)}</div>
        <div className="dsv4-mid"><span>${m === 'goal' ? 'swap' : m === 'fake' ? 'fakeSwap' : 'trueSwap'}</span><b>→</b></div>
        <div className="dsv4-pair dsv4-pop" key=${m}>${V('x', after[0], m !== 'fake')}${V('y', after[1], m !== 'fake')}</div>
      </div>
      <div className=${'dsv4-mark ' + (m === 'fake' ? 'bad' : 'ok')}>${C.mark}</div>
      ${m !== 'goal' && html`<div className="dsv4-out"><small>Output</small>x= ${after[0]} y= ${after[1]}</div>`}</div>
      <${Cap} en=${C.en} ar=${C.ar} showAr=${ar} /></figure>`;
  }

  /* ── [3] slides 6–19: the memory traces of fakeSwap and trueSwap ── */
  const FAKE = ['void fakeSwap(int a, int b)', '{', '   int tmp;', '   tmp = a;', '   a = b;', '   b = tmp;', '}', 'int main()', '{', '   int x = X, y = Y;', '   fakeSwap(x, y);', '   cout << "x= " << x', '        << " y= " << y;', '}'];
  const TRUE = ['void trueSwap(int* a, int* b)', '{', '   int tmp;', '   tmp = *a;', '   *a = *b;', '   *b = tmp;', '}', 'int main()', '{', '   int x = X, y = Y;', '   trueSwap(&x, &y);', '   cout << "x= " << x', '        << " y= " << y;', '}'];
  function swapSteps(mode, X, Y) {
    const S = [], f = mode === 'fake';
    const st = (o, en, a) => S.push(Object.assign({ x: X, y: Y, a: null, b: null, tmp: null, frame: 0, hot: [], en, ar: a }, o));
    st({ cur: 9 }, `main: <code>int x = ${X}, y = ${Y};</code> puts x = ${X} at <b>0x2000</b> and y = ${Y} at <b>0x2010</b>.`, 'الـ main بتعرّف x و y، فالـ x بيتحط في ' + D('0x2000') + ' والـ y في ' + D('0x2010') + ':' + L(`x = ${X}, y = ${Y}`), {});
    S[0].hot = ['x', 'y'];
    if (f) {
      st({ cur: [10, 0, 2], frame: 1, a: X, b: Y, hot: ['a', 'b', 'tmp'] }, `<code>fakeSwap(x, y)</code> creates <b>new variables</b>: a = ${X} (0x2038) and b = ${Y} (0x2040) are <b>copies</b> of x and y; tmp is at 0x2060.`, 'الـ ' + D('fakeSwap(x, y)') + ' بتعمل <b>variables جديدة</b>: الـ a والـ b <b>نسخ</b> من x و y، والـ tmp في ' + D('0x2060') + ':' + L(`a = ${X} (0x2038), b = ${Y} (0x2040)`));
      st({ cur: 3, frame: 1, a: X, b: Y, tmp: X, hot: ['tmp'] }, `<code>tmp = a;</code> → tmp = ${X}.`, 'السطر ده بيحط قيمة a في tmp:' + L(`tmp = a → tmp = ${X}`));
      st({ cur: 4, frame: 1, a: Y, b: Y, tmp: X, hot: ['a'] }, `<code>a = b;</code> → a = ${Y}. Only the copy a changes; x is still ${X}.`, 'السطر ده بيغيّر النسخة a بس، والـ x لسه زي ما هو:' + L(`a = b → a = ${Y}`));
      st({ cur: 5, frame: 1, a: Y, b: X, tmp: X, hot: ['b'] }, `<code>b = tmp;</code> → b = ${X}. a and b are swapped, but x and y were never touched.`, 'السطر ده بيكمّل التبديل بين a و b، بس x و y محدش لمسهم:' + L(`b = tmp → b = ${X}`));
      st({ cur: [6, 11, 12], frame: 2, a: Y, b: X, tmp: X, hot: ['x', 'y'], out: `x= ${X} y= ${Y}` }, `The function returns: a, b and tmp <b>disappear</b>. x and y are unchanged, so it prints <b>x= ${X} y= ${Y}</b>.`, 'الـ function بترجع والـ a والـ b والـ tmp <b>بيختفوا</b>. الـ x والـ y متغيروش، فبيطبع:' + L(`x= ${X} y= ${Y}`));
    } else {
      st({ cur: [10, 0, 2], frame: 1, a: 'addr of x', b: 'addr of y', hot: ['a', 'b'] }, `<code>trueSwap(&x, &y)</code>: a (0x2038) holds the <b>address of x</b> and b (0x2040) the <b>address of y</b>; the arrows show where they point.`, 'في الـ ' + D('trueSwap(&x, &y)') + ' الـ a بيشيل <b>الـ address بتاع x</b> والـ b <b>الـ address بتاع y</b>، والأسهم بتوضح بيشاوروا على إيه:' + L('a = &x (0x2038), b = &y (0x2040)'));
      st({ cur: 3, frame: 1, a: 'addr of x', b: 'addr of y', tmp: X, hot: ['tmp', 'x'], arr: 'a' }, `<code>tmp = *a;</code> follows a to x: tmp = ${X}.`, 'السطر ده بيمشي ورا a لحد x:' + L(`tmp = *a → tmp = ${X}`));
      st({ cur: 4, frame: 1, a: 'addr of x', b: 'addr of y', tmp: X, x: Y, hot: ['x', 'y'], arr: 'ab' }, `<code>*a = *b;</code> writes y's value into x itself: <b>x = ${Y}</b>.`, 'السطر ده بيكتب قيمة y في x نفسه:' + L(`*a = *b → x = ${Y}`));
      st({ cur: 5, frame: 1, a: 'addr of x', b: 'addr of y', tmp: X, x: Y, y: X, hot: ['y'], arr: 'b' }, `<code>*b = tmp;</code> writes tmp into y itself: <b>y = ${X}</b>.`, 'السطر ده بيكتب tmp في y نفسه:' + L(`*b = tmp → y = ${X}`));
      st({ cur: [6, 11, 12], frame: 2, a: 'addr of x', b: 'addr of y', tmp: X, x: Y, y: X, hot: ['x', 'y'], out: `x= ${Y} y= ${X}` }, `The function returns; its variables disappear but x and y <b>stay swapped</b>: it prints <b>x= ${Y} y= ${X}</b>.`, 'الـ function بترجع والـ variables بتاعتها بتختفي، بس x و y <b>فضلوا متبدلين</b>، فبيطبع:' + L(`x= ${Y} y= ${X}`));
    }
    return S;
  }
  function L4SwapTrace({ ar }) {
    const [mode, setMode] = useState('fake'), [xs, setXs] = useState('1'), [ys, setYs] = useState('2');
    const X = int(xs, 1), Y = int(ys, 2), S = swapSteps(mode, X, Y), [i, ctl] = useWalk(S.length, 2300, mode + X + '|' + Y), s = S[i];
    const lines = (mode === 'fake' ? FAKE : TRUE).map(l => l.replace('X', X).replace('Y', Y));
    const h = k => s.hot.includes(k), fr = s.frame === 1 ? 1 : s.frame === 2 ? .2 : 0, tru = mode === 'tru', ptr = v => typeof v === 'string';
    const arrA = tru && s.frame === 1, arrHot = c => s.arr && s.arr.includes(c);
    return html`<figure className="fig dsv4"><div className="fig-stage">
      <${Modes} list=${[['fake', 'Solution 1: fakeSwap'], ['tru', 'Solution 2: trueSwap']]} mode=${mode} set=${setMode} />
      <div className="dsv4-row"><${ToolIn} label="x =" v=${xs} set=${setXs} /><${ToolIn} label="y =" v=${ys} set=${setYs} />
        <button className="fig-btn" onClick=${() => { setXs('1'); setYs('2'); }}>Example from the slides</button></div>
      <${Code} lines=${lines} cur=${s.cur} />
      <svg className="dsv4-svg" viewBox="0 0 300 258" role="img" aria-label=${(tru ? 'trueSwap' : 'fakeSwap') + ' memory: tmp, a, b of the function, x and y of main'}>
        <g className="gr" style=${{ opacity: fr }}>
          <text className="sg" x="4" y="14">${tru ? 'trueSwap' : 'fakeSwap'}: ${s.frame === 2 ? 'gone after return' : 'new variables'}</text>
          <${MemRow} y=${22} addr="0x2060" name="tmp:" val=${s.tmp == null ? '' : s.tmp} hot=${h('tmp')} free=${s.frame === 2} />
          <${MemRow} y=${64} addr="0x2038" name="a:" val=${s.a == null ? '' : s.a} hot=${h('a')} free=${s.frame === 2} ital=${ptr(s.a)} />
          <${MemRow} y=${106} addr="0x2040" name="b:" val=${s.b == null ? '' : s.b} hot=${h('b')} free=${s.frame === 2} ital=${ptr(s.b)} />
        </g>
        <g className="gr" style=${{ opacity: arrA ? 1 : 0 }}>
          <path className=${'ln' + (s.arr && !arrHot('a') ? ' dim' : '')} d="M212 81 H248 V189 H222" />${tri(214, 189, 'l')}
          <path className=${'ln' + (s.arr && !arrHot('b') ? ' dim' : '')} d="M212 123 H272 V231 H222" />${tri(214, 231, 'l')}</g>
        <text className="sg" x="4" y="164">main</text>
        <${MemRow} y=${172} addr="0x2000" name="x:" val=${s.x} hot=${h('x')} />
        <${MemRow} y=${214} addr="0x2010" name="y:" val=${s.y} hot=${h('y')} />
      </svg>
      <div className="dsv4-out"><small>Output</small>${s.out || ' '}</div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4] Lab: int x = 5, *ptr; ptr = &x; … *ptr = 24; ── */
  const AX = '001DFAD8', AP = '001DFACC';
  function L4LabPtr({ ar }) {
    const [xs, setXs] = useState('5'), [ns, setNs] = useState('24');
    const X = int(xs, 5), N = int(ns, 24);
    const lines = [`int x = ${X}, *ptr;`, 'ptr = &x;', 'cout << x;', 'cout << &x;', 'cout << ptr;', 'cout << *ptr;', 'cout << &ptr;', `*ptr = ${N};`, 'cout << x;'];
    const OUT = [null, null, `The Value of X =${X}`, `The Address of X =${AX}`, `The Value of ptr =${AX}`, `The Value pointed by pointer ptr ${X}`, `The Address of ptr =${AP}`, null, `The Value of X after changes =${N}`];
    const S = [
      { en: `<code>int x = ${X}, *ptr;</code> makes an int x = ${X} and a pointer ptr (no address in it yet).`, ar: 'السطر الأول بيعمل int اسمه x وpointer اسمه ptr لسه مفيهوش address:' + L(`int x = ${X}, *ptr;`), hot: ['x'] },
      { en: '<code>ptr = &x;</code> stores the <b>address of x</b> in ptr: ptr now points to x.', ar: 'السطر ده بيخزن <b>الـ address بتاع x</b> في الـ ptr، فالـ ptr بقى بيشاور على x:' + L('ptr = &x;'), hot: ['p'] },
      { en: `<code>x</code> is the value of x: <b>${X}</b>.`, ar: 'الـ x لوحده هو القيمة بتاعته، يعني ' + D(X) + '.', hot: ['x'] },
      { en: `<code>&x</code> is the address of x, e.g. <b>${AX}</b>.`, ar: 'الـ ' + D('&x') + ' هو الـ address بتاع x، مثلًا ' + D(AX) + '.', hot: ['x'] },
      { en: `<code>ptr</code> is the value of ptr: the <b>same address</b> as &x (${AX}).`, ar: 'الـ ptr قيمته هي <b>نفس الـ address</b> بتاع ' + D('&x') + '، يعني ' + D(AX) + '.', hot: ['p'] },
      { en: `<code>*ptr</code> is the value ptr points to: follow the arrow to x, <b>${X}</b>.`, ar: 'الـ ' + D('*ptr') + ' هو القيمة اللي الـ ptr بيشاور عليها، تمشي ورا السهم لحد x فتلاقي ' + D(X) + '.', hot: ['x'], arr: 1 },
      { en: `<code>&ptr</code> is the address of ptr itself, e.g. <b>${AP}</b>: the pointer is a variable with its own place in memory.`, ar: 'الـ ' + D('&ptr') + ' هو الـ address بتاع الـ ptr نفسه، مثلًا ' + D(AP) + '، لأن الـ pointer هو variable ليه مكانه في الـ memory.', hot: ['p'] },
      { en: `<code>*ptr = ${N};</code> writes ${N} <b>through the pointer</b> into x.`, ar: 'السطر ده بيكتب ' + D(N) + ' في x <b>عن طريق الـ pointer</b>:' + L(`*ptr = ${N};`), hot: ['x'], arr: 1, nx: 1 },
      { en: `So x itself changed: it prints <b>The Value of X after changes =${N}</b>.`, ar: 'يعني x نفسه اتغيّر، والبرنامج بيطبع:' + L(`The Value of X after changes =${N}`), hot: ['x'], nx: 1 }
    ];
    const [i, ctl] = useWalk(S.length, 2200, X + '|' + N), s = S[i], xv = s.nx ? N : X;
    const out = OUT.slice(0, i + 1).map((o, k) => o && html`<div key=${k} className=${k === i ? 'new' : ''}>${o}</div>`).filter(Boolean);
    return html`<figure className="fig dsv4"><div className="fig-stage">
      <div className="dsv4-row"><${ToolIn} label="x =" v=${xs} set=${setXs} /><${ToolIn} label="*ptr =" v=${ns} set=${setNs} />
        <button className="fig-btn" onClick=${() => { setXs('5'); setNs('24'); }}>Example from the notes</button></div>
      <${Code} lines=${lines} cur=${i} />
      <svg className="dsv4-svg" viewBox="0 0 300 120" role="img" aria-label="ptr holds the address of x and points to it">
        <${MemRow} y=${14} addr=${AP} name="ptr:" val=${i >= 1 ? AX : '?'} hot=${s.hot.includes('p')} ax=${2} nx=${118} bx=${124} bw=${116} fs=${14} />
        <g className="gr" style=${{ opacity: i >= 1 ? 1 : 0 }}><path className=${'ln' + (s.arr || i === 1 ? '' : ' dim')} d="M240 31 H272 V89 H250" />${tri(242, 89, 'l')}</g>
        <${MemRow} y=${72} addr=${AX} name="x:" val=${xv} hot=${s.hot.includes('x')} ax=${2} nx=${118} bx=${124} bw=${116} />
      </svg>
      <p className="dsv4-note">Each cout also prints its label (see Output). Addresses are the notes' example run: they change from run to run.</p>
      <div className="dsv4-out"><small>Output</small>${out.length ? out : ' '}</div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5.0]–[5.1] normal array vs dynamic array with new / delete[] ── */
  function L4DynArray({ ar }) {
    const [mode, setMode] = useState('dyn'), [ns, setNs] = useState('5');
    const n = Math.max(1, Math.min(10, int(ns, 5)));
    const lines = ['int size;', 'int *arr;', 'cin >> size;', 'arr = new int[size];', '...   // use arr[i]', 'delete[] arr;'];
    const S = [
      { cur: [0, 1], en: '<code>int size; int *arr;</code> are ordinary local variables. arr is a pointer with no block yet.', ar: 'الـ size والـ arr هما local variables عادية، والـ arr هو pointer لسه مش بيشاور على أي block.' },
      { cur: 2, en: `<code>cin >> size;</code> the size is known only <b>at run time</b>: here the user types <b>${n}</b>.`, ar: 'الـ size بيتعرف <b>وقت الـ run time</b> بس، وهنا الـ user كتب ' + D(n) + ':' + L(`cin >> size;  // size = ${n}`) },
      { cur: 3, en: `<code>arr = new int[size];</code> new allocates the memory the array needs (${n} ints) and <b>arr stores the address</b> of this block.`, ar: 'الـ new بتحجز الـ memory اللي الـ array محتاجها، يعني ' + D(n) + ' من الـ int، والـ <b>arr بيخزن الـ address</b> بتاع الـ block ده:' + L('arr = new int[size];') },
      { cur: 4, en: `The block is used like a normal array through the pointer: arr[0] .. arr[${n - 1}].`, ar: 'الـ block بيتستخدم زي الـ array العادي عن طريق الـ pointer:' + L(`arr[0] .. arr[${n - 1}]`) },
      { cur: 5, en: '<code>delete[] arr;</code> frees the dynamic array that new[] allocated.', ar: 'السطر ده بيحرر الـ dynamic array اللي اتحجز بـ ' + D('new[]') + ':' + L('delete[] arr;') }
    ];
    const [i, ctl] = useWalk(S.length, 2200, mode + n), s = S[i];
    if (mode === 'norm') {
      return html`<figure className="fig dsv4"><div className="fig-stage">
        <${Modes} list=${[['norm', 'Normal array'], ['dyn', 'Dynamic array (new)']]} mode=${mode} set=${setMode} />
        <pre className="dsv4-code"><span>int arr[5];          <b style=${{ color: 'var(--ok)' }}>✓</b></span><span> </span><span>int size;</span><span>cin >> size;</span><span>int arr[size];       <b style=${{ color: 'var(--pen)' }}>✕</b></span></pre></div>
        <${Cap} en="A <b>normal array</b>'s size must be a <b>constant expression</b> fixed at design time: <code>int arr[5];</code> is fine, but a size read with cin is not a constant expression."
          ar=${'الـ <b>array العادي</b> لازم الـ size بتاعه يبقى <b>constant expression</b> متحدد وقت الـ design. يعني ' + D('int arr[5];') + ' تمام، لكن الـ size اللي بيتقري بالـ cin مش constant expression.'} showAr=${ar} /></figure>`;
    }
    const blk = i >= 2;
    return html`<figure className="fig dsv4"><div className="fig-stage">
      <${Modes} list=${[['norm', 'Normal array'], ['dyn', 'Dynamic array (new)']]} mode=${mode} set=${setMode} />
      <div className="dsv4-row"><${ToolIn} label="size (cin) =" v=${ns} set=${setNs} /><span className="dsv4-cnt">1 to 10</span></div>
      <${Code} lines=${lines} cur=${s.cur} />
      <div className="dsv4-mem">
        <div className="dsv4-seg"><b>Stack segment</b><small>local variables</small>
          <div className="dsv4-slot">size<span className=${i === 1 ? 'hot' : ''}>${i >= 1 ? n : '?'}</span></div>
          <div className="dsv4-slot">arr<span className=${i === 2 ? 'hot' : ''}>${blk ? (i === 4 ? '(freed)' : 'addr of block →') : '?'}</span></div></div>
        <div className="dsv4-seg"><b>Heap segment</b><small>allocated with new at run time</small>
          ${blk ? html`<div className=${'dsv4-blk dsv4-pop' + (i === 4 ? ' free' : '')} key=${n}>${Array.from({ length: n }, (_, k) => html`<div key=${k}><span className=${i === 3 ? 'on' : ''}></span><small>[${k}]</small></div>`)}</div>
            ${i === 4 && html`<div className="dsv4-empty">freed by delete[]</div>`}` : html`<div className="dsv4-empty">nothing allocated yet</div>`}</div>
      </div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5.2] the three memory segments: where does each thing live? ── */
  const SEGS = [['code', 'Code segment', 'compiled machine code'], ['stack', 'Stack segment', 'local / temporary variables'], ['heap', 'Heap segment', 'dynamic memory allocation (new)']];
  const ITEMS = [
    { k: 'machine code of main()', s: 'code', en: 'The <b>compiled machine code</b> of the program (main and the functions) is in the <b>code segment</b>.', ar: 'الـ <b>machine code</b> بتاع البرنامج بعد الـ compile (الـ main والـ functions) مكانه في الـ <b>code segment</b>.' },
    { k: 'int size;', s: 'stack', en: '<code>int size;</code> is a <b>local variable</b>: <b>stack segment</b>.', ar: 'الـ size هو <b>local variable</b>، فمكانه في الـ <b>stack segment</b>.' },
    { k: 'int *arr;', s: 'stack', en: 'The pointer <code>arr</code> itself is a local variable too: <b>stack segment</b> (only what it points to is on the heap).', ar: 'الـ pointer اللي اسمه arr نفسه local variable برضه، فمكانه في الـ <b>stack segment</b>، واللي بيشاور عليه بس هو اللي في الـ heap.' },
    { k: "fakeSwap's a, b, tmp", s: 'stack', en: 'The temporary variables of a call (fakeSwap\'s a, b, tmp) are in the <b>stack segment</b>; they disappear when the function returns.', ar: 'الـ temporary variables بتاعة الـ function call (زي a و b و tmp في الـ fakeSwap) مكانها في الـ <b>stack segment</b>، وبتختفي لما الـ function ترجع.' },
    { k: 'new int[size]', s: 'heap', en: 'The block made by <code>new int[size]</code> is <b>dynamic memory allocation</b>: <b>heap segment</b>.', ar: 'الـ block اللي بتعمله ' + D('new int[size]') + ' ده <b>dynamic memory allocation</b>، فمكانه في الـ <b>heap segment</b>.' },
    { k: 'a linked-list node', s: 'heap', en: 'A <b>linked list node</b> is created with new at run time: <b>heap segment</b>.', ar: 'الـ <b>node</b> بتاعة الـ linked list بتتعمل بالـ new وقت الـ run time، فمكانها في الـ <b>heap segment</b>.' }
  ];
  function L4Segments({ ar }) {
    const [put, setPut] = useState([]), [last, setLast] = useState(null);
    const tap = k => { setPut(p => p.includes(k) ? p : p.concat(k)); setLast(k); };
    const all = () => { setPut(ITEMS.map((_, k) => k)); setLast(null); };
    const I = last == null ? null : ITEMS[last];
    const en = I ? I.en : put.length === ITEMS.length ? 'Every program has <b>three memory segments</b>: code (machine code), stack (local / temporary variables) and heap (new).' : 'Every program has <b>three memory segments</b>. Tap a piece of the Lab program to see which segment it lives in.';
    const a = I ? I.ar : put.length === ITEMS.length ? 'كل برنامج ليه <b>تلات memory segments</b>: الـ code للـ machine code، والـ stack للـ local والـ temporary variables، والـ heap للي بيتحجز بالـ new.' : 'كل برنامج ليه <b>تلات memory segments</b>. دوس على أي حتة من برنامج الـ Lab عشان تشوف مكانها في أنهي segment.';
    return html`<figure className="fig dsv4"><div className="fig-stage">
      <div className="dsv4-modes dsv4-chips" role="group">${ITEMS.map((it, k) => html`<button key=${k} className="fig-btn" aria-pressed=${String(last === k)} onClick=${() => tap(k)}>${it.k}</button>`)}</div>
      <div className="dsv4-row"><button className="fig-btn" onClick=${all}>Place all</button><button className="fig-btn" onClick=${() => { setPut([]); setLast(null); }}>↻ Reset</button></div>
      <div className="dsv4-segs">${SEGS.map(([id, name, what]) => html`<div key=${id} className=${'dsv4-seg' + (I && I.s === id ? ' hot' : '')}><b>${name}</b><small>${what}</small>
        <div>${put.filter(k => ITEMS[k].s === id).map(k => html`<span key=${k} className="dsv4-tag dsv4-pop">${ITEMS[k].k}</span>`)}</div></div>`)}</div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── [5.3] linked structures: each node created with new at run time ── */
  function L4LinkedNew({ ar }) {
    const [n, setN] = useState(0), MAX = 5;
    const en = n === 0 ? 'A linked list starts with only a pointer on the stack (head = NULL). Press <b>new node</b>: each node is made with <code>new</code> while the program runs.'
      : `Node ${n} was created with <code>new</code> at run time on the heap and linked to the list: it now has <b>${n}</b> node${n > 1 ? 's' : ''}. The number of nodes was never fixed at design time: this is <b>dynamic memory allocation</b>, used by linked lists, linked stacks and linked queues.`;
    const a = n === 0 ? 'الـ linked list بتبدأ بـ pointer بس في الـ stack قيمته NULL. دوس <b>new node</b>، وكل node هتتعمل بالـ new والبرنامج شغال.'
      : 'الـ node رقم ' + D(n) + ' اتعملت بالـ new وقت الـ run time في الـ heap واتربطت بالـ list، فبقى فيها ' + D(n) + ' من الـ nodes. عدد الـ nodes عمره ما اتحدد وقت الـ design، وده الـ <b>dynamic memory allocation</b> اللي بتستخدمه الـ linked lists والـ linked stacks والـ linked queues.';
    return html`<figure className="fig dsv4"><div className="fig-stage">
      <div className="dsv4-row"><button className="fig-btn" onClick=${() => setN(Math.min(MAX, n + 1))} disabled=${n >= MAX}>+ new node</button><button className="fig-btn" onClick=${() => setN(0)} disabled=${n === 0}>↻ Reset</button></div>
      ${n > 0 && html`<pre className="dsv4-code" style=${{ maxWidth: '300px' }}><span className="cur">Node *p = new Node;   // node ${n}</span></pre>`}
      <div className="dsv4-mem" style=${{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.7fr)' }}>
        <div className="dsv4-seg"><b>Stack</b><div className="dsv4-slot">head<span>${n ? '→' : 'NULL'}</span></div></div>
        <div className="dsv4-seg"><b>Heap</b>${n === 0 ? html`<div className="dsv4-empty">no nodes yet</div>` : html`<div className="dsv4-list">${Array.from({ length: n }, (_, k) => html`<span key=${k} style=${{ display: 'contents' }}><span className=${'dsv4-node dsv4-pop' + (k === n - 1 ? ' hot' : '')}><span>node ${k + 1}</span><span>${k < n - 1 ? '•' : '/'}</span></span>${k < n - 1 && html`<span className="dsv4-to">→</span>`}</span>`)}</div>`}</div>
      </div>
      <p className="dsv4-note">/ = NULL (end of the list)</p></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ds-l4-pointer-box': L4PointerBox, 'ds-l4-ptr-ops': L4PtrOps, 'ds-l4-swap-goal': L4SwapGoal, 'ds-l4-swap-trace': L4SwapTrace,
    'ds-l4-lab-ptr': L4LabPtr, 'ds-l4-dyn-array': L4DynArray, 'ds-l4-segments': L4Segments, 'ds-l4-linked-new': L4LinkedNew
  });
})();
/* ── part L6 ── */
// Data Structures visuals, Lecture 6 (Linked Stacks): the slide 4 figure built push by push, the creation steps (Node, top = NULL, menu), the pop statement order compared with wrong orders, display/get/count/search traced with temp, the exam main traced with its output, and the Lab 7 struct version next to the class version. push/pop themselves are already animated on the page (viz.js) and are not redone. Every label and number comes from the site's notes and the slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm } = window.FIGKIT;
  const CSS = `
.dsv6 *{ font-variant-ligatures:none; }
.dsv6 bdi{ white-space:nowrap; }
.dsv6 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dsv6 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv6-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dsv6-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dsv6-row{ display:flex; flex-wrap:wrap; gap:8px 12px; justify-content:center; align-items:center; margin:6px 0; }
.dsv6-chain{ display:grid; grid-template-columns:auto 74px minmax(0, 118px); column-gap:8px; align-items:center; justify-content:center; margin:4px auto; }
.dsv6-pt{ font:700 .8rem var(--mono); color:var(--fig-k); text-align:right; white-space:nowrap; }
.dsv6-sd{ font-size:.78rem; line-height:1.25; color:var(--graphite); }
.dsv6-sd.dsv6-k{ color:var(--fig-k); font-weight:700; }
.dsv6-sd.dsv6-p{ color:var(--pen); font-weight:700; }
.dsv6-node{ display:grid; grid-template-columns:44px 30px; border:2px solid var(--ink); border-radius:4px; background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); font:600 .92rem var(--mono); color:var(--ink); transition:background .35s, box-shadow .35s, opacity .35s; }
.dsv6-node > span{ display:grid; place-items:center; height:30px; }
.dsv6-node > span + span{ border-left:2px solid var(--ink); font-size:.8rem; }
.dsv6-node .dsv6-n{ color:var(--pen); font-weight:700; }
.dsv6-node.dsv6-new{ background:color-mix(in srgb, var(--fig-k) 42%, var(--paper)); box-shadow:0 0 0 2px var(--fig-k); }
.dsv6-node.dsv6-hot{ box-shadow:0 0 0 3px var(--fig-k); }
.dsv6-node.dsv6-ok{ box-shadow:0 0 0 3px var(--ok); }
.dsv6-node.dsv6-gone{ border-style:dashed; border-color:var(--pen); background:var(--paper); opacity:.75; }
.dsv6-node.dsv6-gone > span + span{ border-left-style:dashed; border-left-color:var(--pen); }
.dsv6-node.dsv6-lost{ border-style:dashed; opacity:.6; }
.dsv6-dn{ height:16px; position:relative; }
.dsv6-dn::before{ content:""; position:absolute; left:58px; top:-15px; width:2px; height:26px; background:var(--pen); }
.dsv6-dn::after{ content:""; position:absolute; left:54px; top:10px; border:5px solid transparent; border-top:6px solid var(--pen); }
.dsv6-nul{ display:inline-block; font:700 .8rem var(--mono); color:var(--pen); border:1px dashed var(--pen); border-radius:4px; padding:3px 8px; }
.dsv6-empty{ font:600 .84rem var(--mono); color:var(--graphite); }
.dsv6-lab{ font-size:.86rem; font-weight:700; text-align:center; color:var(--ink); margin:2px 0 4px; }
.dsv6-sub{ font-size:.78rem; color:var(--graphite); text-align:center; }
.dsv6-chip{ display:inline-block; padding:3px 10px; border-radius:99px; border:1px solid var(--line); background:var(--paper); font:600 .84rem var(--mono); color:var(--ink); }
.dsv6-chip.dsv6-k{ border-color:var(--fig-k); color:var(--fig-k); }
.dsv6-chip.dsv6-p{ border-color:var(--pen); color:var(--pen); }
.dsv6-in-a{ animation:dsv6-in .45s ease both; }
@keyframes dsv6-in{ from{ opacity:0; transform:translateY(-8px); } to{ opacity:1; transform:none; } }
.dsv6-code{ margin:0 auto 8px; max-width:440px; padding:8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); font:.75rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv6-code > span{ display:block; border-radius:3px; padding:0 3px; transition:background .3s; }
.dsv6-code > span.dsv6-cur{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.dsv6-code > span.dsv6-bad{ background:color-mix(in srgb, var(--pen) 20%, transparent); }
.dsv6-code > span.dsv6-skip{ opacity:.45; }
.dsv6-ct{ font:600 .78rem var(--body); color:var(--graphite); max-width:440px; margin:6px auto 3px; }
.dsv6-out{ max-width:440px; margin:8px auto 0; padding:6px 10px; border:1px solid var(--line); border-left:4px solid var(--fig-k); border-radius:6px; background:var(--paper); font:600 .84rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; min-height:1.5em; text-align:left; direction:ltr; }
.dsv6-out small{ display:block; font:600 .75rem var(--body); color:var(--graphite); }
.dsv6-err{ max-width:440px; margin:8px auto 0; padding:6px 10px; border:2px solid var(--pen); border-radius:8px; color:var(--pen); font-weight:700; font-size:.86rem; text-align:center; }
.dsv6-vars{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:6px 0 0; }
.dsv6-in{ font:.9rem var(--mono); padding:4px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:32px; max-width:100%; box-sizing:border-box; }
.dsv6-lbl{ font-size:.85rem; color:var(--graphite); display:inline-flex; gap:6px; align-items:center; flex-wrap:wrap; justify-content:center; }
.dsv6-cnt{ font-size:.85rem; color:var(--graphite); white-space:nowrap; }
.dsv6-try{ border-top:1px dashed var(--line); margin-top:10px; padding-top:8px; }
.dsv6-msg{ font-size:.82rem; color:var(--pen); text-align:center; min-height:1.2em; margin-top:4px; }
.dsv6-steps{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:6px; max-width:440px; margin:0 auto 10px; }
.dsv6-steps > div{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:5px 4px; text-align:center; font-size:.8rem; line-height:1.25; color:var(--ink); opacity:.45; transition:opacity .35s, box-shadow .35s; }
.dsv6-steps > div b{ display:block; color:var(--fig-k); font-size:.78rem; }
.dsv6-steps > div.dsv6-on{ opacity:1; box-shadow:0 0 0 2px var(--fig-k); }
.dsv6-obj{ border:2px solid var(--fig-k); border-radius:8px; padding:6px 10px; background:var(--paper); text-align:center; color:var(--ink); }
.dsv6-obj > b{ display:block; font:700 .8rem var(--mono); color:var(--fig-k); margin-bottom:4px; }
.dsv6-fld{ display:grid; grid-template-columns:auto auto; gap:2px 8px; font:600 .84rem var(--mono); justify-content:center; }
.dsv6-fld i{ font-style:normal; color:var(--graphite); text-align:right; }
.dsv6-menu{ display:grid; gap:4px; max-width:300px; margin:0 auto; }
.dsv6-menu > div{ display:grid; grid-template-columns:minmax(0, 1fr) auto; gap:8px; align-items:center; border:1px solid var(--line); border-radius:6px; padding:3px 8px; background:var(--paper); font:600 .84rem var(--mono); color:var(--ink); }
.dsv6-menu > div span + span{ color:var(--fig-k); }
@media (prefers-reduced-motion: reduce){ .dsv6-in-a{ animation:none; } .dsv6-node, .dsv6-code > span, .dsv6-steps > div{ transition:none; } }`;
  if (!document.getElementById('dsv6-css')) { const s = document.createElement('style'); s.id = 'dsv6-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* helpers */
  const L = s => `<span class="ltr">${s}</span>`;
  const D = s => `<bdi dir="ltr">${String(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const ints = s => String(s).split(/[\s,]+/).filter(Boolean).map(x => parseInt(x, 10)).filter(Number.isFinite);
  const chainTxt = (p, vals) => [p].concat(vals, ['NULL']).join(' → ');
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  const SBar = ({ n, i, ctl }) => html`<div className="fig-bar">
    ${n <= 14 ? html`<div className="fig-dots" aria-hidden="true">${Array.from({ length: n }, (_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</div>` : html`<span className="dsv6-cnt">Step ${i + 1} / ${n}</span>`}
    <span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i >= n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;
  const Modes = ({ list, mode, set }) => html`<div className="dsv6-modes" role="group">${list.map(([k, l]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${l}</button>`)}</div>`;
  const has = (cur, k) => Array.isArray(cur) ? cur.includes(k) : k === cur;
  const Code = ({ lines, cur, bad, skip }) => html`<pre className="dsv6-code">${lines.map((l, k) => html`<span key=${k} className=${has(bad, k) ? 'dsv6-bad' : has(cur, k) ? 'dsv6-cur' : has(skip, k) ? 'dsv6-skip' : ''}>${l || ' '}</span>`)}</pre>`;
  // a linked stack drawn top-down as on slide 4: pointer names on the left, node (data | next), red arrows down, N in the last next
  // nodes: [{ v, c (class), side: [text, cls], nul (next shown as N even if not last) }]; ptr: { index: [names] }; ptr index = nodes.length means NULL
  const Chain = ({ nodes, ptr = {}, anim }) => {
    const out = [];
    if (!nodes.length) {
      out.push(html`<span key="p" className="dsv6-pt">${(ptr[0] || ['top']).join(', ')} →</span>`, html`<span key="n"><span className="dsv6-nul">NULL</span></span>`, html`<span key="s"></span>`);
    }
    nodes.forEach((nd, k) => {
      const last = k === nodes.length - 1, nul = last || nd.nul, nx = nd.nx || (nul ? 'N' : '•');
      if (k) out.push(html`<span key=${'a' + k}></span>`, nodes[k - 1].nul ? html`<span key=${'d' + k} style=${{ height: '16px' }}></span>` : html`<div key=${'d' + k} className="dsv6-dn"></div>`, html`<span key=${'b' + k}></span>`);
      out.push(html`<span key=${'p' + k} className="dsv6-pt">${ptr[k] ? ptr[k].join(', ') + ' →' : ''}</span>`,
        html`<div key=${'n' + k + (anim && k === 0 ? 'x' + nd.v + nodes.length : '')} className=${'dsv6-node ' + (nd.c || '') + (anim && k === 0 ? ' dsv6-in-a' : '')}><span>${nd.v}</span><span className=${nul ? 'dsv6-n' : ''}>${nx}</span></div>`,
        html`<span key=${'s' + k} className=${'dsv6-sd ' + ((nd.side && nd.side[1]) || '')}>${nd.side ? nd.side[0] : ''}</span>`);
    });
    if (nodes.length && ptr[nodes.length]) out.push(html`<span key="pa"></span>`, html`<span key="pb" style=${{ height: '6px' }}></span>`, html`<span key="pc"></span>`,
      html`<span key="pn" className="dsv6-pt">${ptr[nodes.length].join(', ')} →</span>`, html`<span key="nn"><span className="dsv6-nul">NULL</span></span>`, html`<span key="sn"></span>`);
    return html`<div className="dsv6-chain">${out}</div>`;
  };

  /* ── [0.4] slide 4: the linked stack 25, 32, 50, 99 built push by push ── */
  function L6SlideStack({ ar }) {
    const EX = [25, 32, 50, 99];
    const [order, setOrder] = useState(EX), [txt, setTxt] = useState(EX.join(' ')), [msg, setMsg] = useState('');
    const S = [{ k: 0 }].concat(order.map((_, j) => ({ k: j + 1 })), [{ k: order.length, fin: true }]);
    const [i, ctl] = useWalk(S.length, 1700, order.join(','));
    const s = S[i], inStack = order.slice(0, s.k).reverse(), top = inStack[0], first = order[0], last = order[order.length - 1];
    const nodes = inStack.map((v, j) => ({ v, c: !s.fin && j === 0 && s.k ? 'dsv6-new' : '',
      side: s.fin ? (j === 0 ? ['last inserted', 'dsv6-k'] : j === inStack.length - 1 ? ['first inserted', 'dsv6-k'] : null) : (j === 0 && s.k ? ['new top', 'dsv6-k'] : null) }));
    let en, a;
    if (s.k === 0) { en = 'Before any push the stack is empty: <b>top = NULL</b>.'; a = 'قبل أي push الـ stack بيبقى فاضي، والـ top بيساوي ' + D('NULL') + '.'; }
    else if (s.fin) {
      en = `Inserted in the order ${order.join(', ')}: ${chainTxt('top', inStack)}. Last inserted = <b>${last}</b> (pointed to by top), first inserted = <b>${first}</b> (its next is NULL, the N). display() prints <b>${inStack.join(' ')}</b>.`;
      a = 'العناصر اتضافت بالترتيب ده:' + L(order.join(', ')) + 'والسلسلة بقت:' + L(chainTxt('top', inStack)) + `آخر واحد اتضاف هو ${D(last)} (والـ top بيشاور عليه)، وأول واحد اتضاف هو ${D(first)} (والـ next بتاعه NULL، يعني الـ N). والـ <bdi dir="ltr">display()</bdi> بتطبع:` + L(inStack.join(' '));
    } else if (s.k === 1) {
      en = `push(${top}): the stack was empty, so the new node's next = NULL (the N) and top points at ${top}.`;
      a = `بنعمل ${D('push(' + top + ')')} والـ stack فاضي، فالـ next بتاع الـ node الجديدة بيبقى NULL (الـ N في الرسمة)، والـ top بيشاور عليها.`;
    } else {
      en = `push(${top}): the new node points at the old top (${inStack[1]}), then top moves to ${top}. Every new element is inserted as the top element.`;
      a = `بنعمل ${D('push(' + top + ')')} فالـ node الجديدة بتشاور على الـ top القديم (${D(inStack[1])})، وبعدين الـ top بيتحرك لـ ${D(top)}. كل عنصر جديد بيدخل كـ top.`;
    }
    const load = () => { const v = ints(txt); if (v.length < 1 || v.length > 6) { setMsg('Type 1 to 6 whole numbers, in the order they are pushed.'); return; } setMsg(''); setOrder(v); };
    return html`<figure className="fig dsv6"><div className="fig-stage">
      <div className="dsv6-lab">${s.k === 0 ? 'Empty stack' : s.fin ? 'Slide 4: linked stack' : 'push(' + top + ')'}</div>
      <${Chain} nodes=${nodes} ptr=${{ 0: ['top'] }} anim=${!s.fin} />
      <div className="dsv6-vars"><span className="dsv6-chip">inserted: ${order.slice(0, s.k).join(', ') || 'nothing yet'}</span></div>
      <div className="dsv6-try"><div className="dsv6-row">
        <button className="fig-btn" onClick=${() => { setTxt(EX.join(' ')); setOrder(EX.slice()); setMsg(''); }}>Example from the notes</button>
        <label className="dsv6-lbl">Try your own (push order) <input className="dsv6-in" style=${{ width: '128px' }} value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="Values in push order" /></label>
        <button className="fig-btn solid" onClick=${load}>Build</button></div>
        <div className="dsv6-msg">${msg}</div></div></div>
      <${Cap} en=${en} ar=${a} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1.0] creation: Step 1 Node class, Step 2 top = NULL, Step 3 main with a menu ── */
  function L6Creation({ ar }) {
    const CODES = [
      ['class Node', '{', 'public:', '   int data;', '   Node *next;', '   Node()', '   { data = 0;', '     next = NULL; }', '};'],
      ['class Stack', '{', '   Node *top;', 'public:', '   Stack() { top = NULL; }', '   // isEmpty, push, pop, ...', '};'],
      ['int main()', '{', '   Stack s;', '   // show the menu, read a choice', '   // call s.push(item), s.pop(),', '   // s.display(), ...', '}']
    ];
    const CUR = [[3, 4, 6, 7], [2, 4], [2, 3, 4, 5]];
    const T = [
      { en: '<b>Step 1</b>: define a <b>Node</b> class with two members, <b>data</b> and <b>next</b>. Its constructor Node() makes data = 0 and next = NULL, so a new node starts as 0 | N.', ar: '(1) أول خطوة نعرّف Node class فيها member اسمه data وmember اسمه next. والـ constructor بتاعها (<bdi dir="ltr">Node()</bdi>) بيخلّي:' + L('data = 0, next = NULL') + 'فأي node جديدة بتبدأ كده (0 و N).' },
      { en: '<b>Step 2</b>: define a Node pointer <b>top</b> and set it to <b>NULL</b>. In the class, the Stack() constructor does it, so <b>Stack s;</b> starts empty.', ar: '(2) تاني خطوة نعرّف Node pointer اسمه top ونخليه NULL. في الـ class الـ constructor بتاع الـ Stack هو اللي بيعمل كده، فلما نكتب ' + D('Stack s;') + ' الـ stack بيبدأ فاضي.' },
      { en: '<b>Step 3</b>: main displays a <b>menu</b> with the list of operations and calls the matching function on the stack object.', ar: '(3) تالت خطوة الـ main بتعرض menu فيها الـ operations، وبتنادي الـ function المناسبة على الـ stack object.' }
    ];
    const [i, ctl] = useWalk(3, 2600, 0);
    let pic;
    if (i === 0) pic = html`<div className="dsv6-row"><div className="dsv6-obj"><b>new Node()</b>
        <div className="dsv6-row" style=${{ margin: '0', gap: '0' }}><div style=${{ display: 'grid', gridTemplateColumns: '44px 30px', font: '600 .75rem var(--mono)', color: 'var(--graphite)', textAlign: 'center' }}><span>data</span><span>next</span></div></div>
        <div className="dsv6-row" style=${{ margin: '2px 0 0' }}><div className="dsv6-node dsv6-new"><span>0</span><span className="dsv6-n">N</span></div></div></div></div>`;
    else if (i === 1) pic = html`<div className="dsv6-row"><div className="dsv6-obj"><b>Stack s</b><div className="dsv6-fld"><i>top</i><span>NULL</span></div></div></div>
      <${Chain} nodes=${[]} ptr=${{ 0: ['top'] }} />`;
    else pic = html`<div className="dsv6-menu">${[['1. Push', 's.push(item)'], ['2. Pop', 's.pop()'], ['3. Display', 's.display()'], ['4. Get top', 's.get()'], ['5. Count', 's.count()'], ['6. Search', 's.search(item)'], ['7. Exit', 'return 0']].map(([m, f]) => html`<div key=${m}><span>${m}</span><span>${f}</span></div>`)}</div>`;
    return html`<figure className="fig dsv6"><div className="fig-stage">
      <div className="dsv6-steps">${['Node class', 'top = NULL', 'main + menu'].map((t, k) => html`<div key=${k} className=${k === i ? 'dsv6-on' : ''}><b>Step ${k + 1}</b>${t}</div>`)}</div>
      <${Code} lines=${CODES[i]} cur=${CUR[i]} />
      ${pic}</div>
      <${Cap} en=${T[i].en} ar=${T[i].ar} showAr=${ar} /><${SBar} n=${3} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1.2] pop: why "temp = top; top = top->next; delete temp;" in this order ── */
  function L6PopOrder({ ar }) {
    const [mode, setMode] = useState('ok');
    const V = [99, 50, 32, 25];
    const base = V.map(v => ({ v }));
    const M = {
      ok: { code: ['Node *temp = top;', 'top = top->next;', 'delete temp;'], S: [
        { cur: -1, nodes: base, ptr: { 0: ['top'] }, en: 'The slide 4 stack: top → 99 → 50 → 32 → 25 → NULL. pop() must remove 99.', ar: 'ده الـ stack بتاع slide 4، والمفروض الـ <bdi dir="ltr">pop()</bdi> تشيل الـ 99:' + L(chainTxt('top', V)) },
        { cur: 0, nodes: base, ptr: { 0: ['top', 'temp'] }, en: '<b>temp = top</b>: temp keeps the address of the node with 99.', ar: 'بنعمل ' + D('temp = top') + ' فالـ temp بيمسك عنوان الـ node اللي فيها 99.' },
        { cur: 1, nodes: [{ v: 99, c: 'dsv6-hot' }].concat(base.slice(1)), ptr: { 0: ['temp'], 1: ['top'] }, en: '<b>top = top->next</b>: top moves to 50. The node 99 is out of the stack but temp still holds it.', ar: 'بنعمل ' + D('top = top->next') + ' فالـ top بيتحرك للـ 50. الـ node بتاعة 99 خرجت من الـ stack، بس الـ temp لسه ماسكها.' },
        { cur: 2, nodes: [{ v: 99, c: 'dsv6-gone', side: ['deleted', 'dsv6-p'], nul: true, nx: '?' }].concat(base.slice(1).map(n => ({ v: n.v, c: 'dsv6-ok' }))), ptr: { 0: ['temp'], 1: ['top'] }, en: '<b>delete temp</b>: the memory of 99 is freed. Result: top → 50 → 32 → 25 → NULL. Correct.', ar: 'بنعمل ' + D('delete temp') + ' فالـ memory بتاعة الـ 99 بتتمسح، والنتيجة صح:' + L(chainTxt('top', V.slice(1))) }
      ] },
      del: { code: ['Node *temp = top;', 'delete temp;', 'top = top->next;'], S: [
        { cur: -1, nodes: base, ptr: { 0: ['top'] }, en: 'Same stack, but the last two statements swapped: delete first, then move top.', ar: 'نفس الـ stack، بس هنبدّل آخر سطرين: نعمل delete الأول وبعدين نحرّك الـ top.' },
        { cur: 0, nodes: base, ptr: { 0: ['top', 'temp'] }, en: '<b>temp = top</b>: temp and top both point at 99.', ar: 'بنعمل ' + D('temp = top') + ' فالـ temp والـ top الاتنين بيشاوروا على 99.' },
        { cur: 1, nodes: [{ v: '?', c: 'dsv6-gone', side: ['deleted', 'dsv6-p'], nul: true, nx: '?' }].concat(base.slice(1)), ptr: { 0: ['top', 'temp'] }, en: '<b>delete temp</b>: the node is freed, but <b>top still points at it</b>. Its data and next are gone.', ar: 'بنعمل ' + D('delete temp') + ' فالـ node بتتمسح، بس الـ top لسه بيشاور عليها، والـ data والـ next بتوعها راحوا.' },
        { cur: 2, bad: 2, nodes: [{ v: '?', c: 'dsv6-gone', side: ['deleted', 'dsv6-p'], nul: true, nx: '?' }].concat(base.slice(1).map(n => ({ v: n.v, c: 'dsv6-lost' }))), ptr: { 0: ['top', 'temp'] }, err: 'top->next is read from a deleted node', en: '<b>top = top->next</b> reads next from memory that was already deleted: undefined behaviour (a crash or a wrong address). The rest of the stack may be lost.', ar: 'الـ ' + D('top = top->next') + ' بيقرا الـ next من memory اتمسحت خلاص، وده undefined behaviour (ممكن crash أو عنوان غلط)، وباقي الـ stack ممكن يضيع.' }
      ] },
      leak: { code: ['top = top->next;', '// no temp, no delete'], S: [
        { cur: -1, nodes: base, ptr: { 0: ['top'] }, en: 'Same stack, but pop only moves top and never keeps or deletes the old node.', ar: 'نفس الـ stack، بس الـ pop هنا بتحرّك الـ top بس، ومش بتمسك الـ node القديمة ولا بتمسحها.' },
        { cur: 0, bad: 1, nodes: [{ v: 99, c: 'dsv6-lost', side: ['nothing points here', 'dsv6-p'] }].concat(base.slice(1)), ptr: { 1: ['top'] }, err: 'memory leak: node 99 can never be deleted', en: '<b>top = top->next</b>: the stack looks right (top → 50), but node 99 is still in memory and no pointer reaches it, so it can never be deleted: a <b>memory leak</b>. That is why pop keeps it in temp first.', ar: 'بنعمل ' + D('top = top->next') + ' فالـ stack شكله صح (الـ top على 50)، بس الـ node بتاعة 99 لسه في الـ memory ومفيش pointer بيوصلها، فمش هينفع تتمسح أبداً، وده اسمه memory leak. عشان كده الـ pop بتمسكها في الـ temp الأول.' }
      ] }
    };
    const m = M[mode], [i, ctl] = useWalk(m.S.length, 2200, mode), s = m.S[i];
    return html`<figure className="fig dsv6"><div className="fig-stage">
      <${Modes} list=${[['ok', 'Lecture order'], ['del', 'delete first'], ['leak', 'no temp']]} mode=${mode} set=${setMode} />
      <${Code} lines=${m.code} cur=${s.cur} bad=${s.bad != null && s.bad < m.code.length ? s.bad : -1} />
      <${Chain} nodes=${s.nodes} ptr=${s.ptr} />
      ${s.err && html`<div className="dsv6-err">${s.err}</div>`}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${m.S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3] display, get, count, search traced with temp ── */
  const WCODE = {
    display: ['void display()', '{', '   if (isEmpty())', '      cout << "Empty Stack";', '   else', '   { Node *temp = top;', '     while (temp != NULL)', '     { cout<<temp->data<<" ";', '       temp = temp->next; }', '     cout<<endl<<"END"<<endl;', '   }', '}'],
    get: ['int get()', '{', '   if (top != NULL)', '      return (top->data);', '   else', '   { cout << "Empty";', '     return 0; }', '}'],
    count: ['int count()', '{', '   int c = 0;', '   Node *temp = top;', '   while (temp != NULL)', '   { c++;', '     temp = temp->next; }', '   return (c);', '}'],
    search: ['bool search(int item)', '{', '   Node *temp = top;', '   while (temp != NULL)', '   { if (temp->data == item)', '        return (true);', '     else temp = temp->next; }', '   return (false);', '}']
  };
  function walkSteps(mode, st, item) {
    const n = st.length, S = [];
    const add = (l, t, en, a, x) => S.push(Object.assign({ l, t, en, ar: a }, x));
    const tv = t => t >= n ? 'NULL' : st[t];
    if (mode === 'display') {
      if (!n) { add(2, null, 'isEmpty() is true (top == NULL).', 'الـ <bdi dir="ltr">isEmpty()</bdi> بترجع true لأن ' + D('top == NULL') + '.'); add(3, null, 'So display prints <b>Empty Stack</b> and ends.', 'فالـ display بتطبع ' + D('Empty Stack') + ' وتخلص.', { out: 'Empty Stack' }); return S; }
      add(2, null, 'isEmpty() is false: top points at a node.', 'الـ <bdi dir="ltr">isEmpty()</bdi> بترجع false لأن الـ top بيشاور على node.', { out: '' });
      add(5, 0, `<b>temp = top</b>: temp starts at the top node (${st[0]}).`, `بنعمل ${D('temp = top')} فالـ temp بيبدأ من الـ top node (${D(st[0])}).`, { out: '' });
      let out = '';
      for (let k = 0; k < n; k++) {
        out += st[k] + ' ';
        add([6, 7], k, `temp != NULL, so print temp->data: <b>${st[k]}</b>.`, `الـ temp مش NULL، فبنطبع الـ <bdi dir="ltr">temp->data</bdi> اللي هي ${D(st[k])}.`, { out });
        add(8, k + 1, `<b>temp = temp->next</b>: temp moves to ${k + 1 < n ? st[k + 1] : 'NULL'}.`, `بنعمل ${D('temp = temp->next')} فالـ temp بيروح لـ ${D(tv(k + 1))}.`, { out });
      }
      add(6, n, 'temp == NULL: the loop stops after the first-inserted node.', 'الـ temp بقى NULL فالـ loop بتقف بعد أول node اتضافت.', { out });
      add(9, n, `Then a new line and <b>END</b>. Printed top first: ${st.join(' ')}.`, 'وبعدين سطر جديد وكلمة END. الطباعة بتبدأ من الـ top:' + L(st.join(' ')), { out: out + '\nEND' });
    } else if (mode === 'get') {
      if (!n) { add(2, null, 'top == NULL, so the stack is empty.', 'الـ top بيساوي NULL، فالـ stack فاضي.'); add([5, 6], null, 'get() prints <b>Empty</b> and returns 0.', 'الـ <bdi dir="ltr">get()</bdi> بتطبع Empty وبترجع ' + D('0') + '.', { out: 'Empty', ret: '0' }); return S; }
      add(2, null, 'top != NULL: there is a top node.', 'الـ top مش NULL، يعني فيه top node.', { hot: 0 });
      add(3, null, `get() returns top->data = <b>${st[0]}</b> without removing it. The stack is unchanged.`, `الـ <bdi dir="ltr">get()</bdi> بترجع الـ <bdi dir="ltr">top->data</bdi> من غير ما تشيله، وقيمته ${D(st[0])}. والـ stack زي ما هو.`, { hot: 0, ret: st[0] });
    } else if (mode === 'count') {
      add(2, null, '<b>c = 0</b>.', 'بنبدأ بـ ' + D('c = 0') + '.', { c: 0 });
      add(3, 0, 'temp = top.', 'بنعمل ' + D('temp = top') + '.', { c: 0 });
      for (let k = 0; k < n; k++) {
        add([4, 5], k, `temp != NULL (node ${st[k]}), so c++: <b>c = ${k + 1}</b>.`, `الـ temp مش NULL (الـ node بتاعة ${D(st[k])})، فبنعمل <bdi dir="ltr">c++</bdi> والـ c بقى ${D(k + 1)}.`, { c: k + 1, ok: k });
        add(6, k + 1, `temp = temp->next: temp moves to ${k + 1 < n ? st[k + 1] : 'NULL'}.`, `بنعمل ${D('temp = temp->next')} فالـ temp بيروح لـ ${D(tv(k + 1))}.`, { c: k + 1, ok: k });
      }
      add(4, n, 'temp == NULL: the loop stops.', 'الـ temp بقى NULL فالـ loop بتقف.', { c: n, ok: n - 1 });
      add(7, n, `count() returns <b>${n}</b>.`, `الـ <bdi dir="ltr">count()</bdi> بترجع ${D(n)}.`, { c: n, ret: n, ok: n - 1 });
    } else {
      add(2, 0, `temp = top. Looking for ${item}.`, `بنعمل ${D('temp = top')} وبندوّر على ${D(item)}.`);
      for (let k = 0; k < n; k++) {
        if (st[k] === item) {
          add([3, 4], k, `temp->data = ${st[k]} equals ${item}.`, `الـ <bdi dir="ltr">temp->data</bdi> بيساوي ${D(st[k])} وده هو الـ item.`, { ok: k, hot: k });
          add(5, k, `search(${item}) returns <b>true</b>.`, `الـ search بترجع true، يعني الـ ${D(item)} موجود.`, { ok: k, ret: 'true' });
          return S;
        }
        add([3, 4], k, `temp->data = ${st[k]} is not ${item}.`, `الـ <bdi dir="ltr">temp->data</bdi> بيساوي ${D(st[k])} ومش هو الـ item.`, { hot: k });
        add(6, k + 1, `temp = temp->next: temp moves to ${k + 1 < n ? st[k + 1] : 'NULL'}.`, `بنعمل ${D('temp = temp->next')} فالـ temp بيروح لـ ${D(tv(k + 1))}.`);
      }
      add(3, n, 'temp == NULL: every node was checked.', 'الـ temp بقى NULL، يعني كل الـ nodes اتشافت.');
      add(7, n, `search(${item}) returns <b>false</b>.`, `الـ search بترجع false، يعني الـ ${D(item)} مش موجود.`, { ret: 'false' });
    }
    return S;
  }
  function L6Walk({ ar }) {
    const EX = [25, 32, 50, 99];
    const [mode, setMode] = useState('display'), [order, setOrder] = useState(EX), [item, setItem] = useState(32);
    const [txt, setTxt] = useState(EX.join(' ')), [itxt, setItxt] = useState('32'), [msg, setMsg] = useState('');
    const st = order.slice().reverse();
    const S = walkSteps(mode, st, item);
    const [i, ctl] = useWalk(S.length, 1500, mode + order.join(',') + '|' + item), s = S[i];
    const ptr = { 0: ['top'] };
    if (s.t != null) { if (s.t === 0) ptr[0] = ['top', 'temp']; else ptr[s.t] = ['temp']; }
    const nodes = st.map((v, k) => ({ v, c: s.ok != null && (mode === 'count' ? k <= s.ok : k === s.ok) ? 'dsv6-ok' : s.hot === k || (s.t === k && mode !== 'count') ? 'dsv6-hot' : '' }));
    const load = () => {
      const v = ints(txt), it = ints(itxt);
      if (v.length > 6) { setMsg('Use at most 6 values.'); return; }
      if (mode === 'search' && it.length !== 1) { setMsg('Type one whole number to search for.'); return; }
      setMsg(''); setOrder(v); if (it.length === 1) setItem(it[0]);
    };
    const vars = [];
    if (s.t != null) vars.push('temp → ' + (s.t >= st.length ? 'NULL' : st[s.t]));
    if (s.c != null) vars.push('c = ' + s.c);
    if (s.ret != null) vars.push('returns ' + s.ret);
    return html`<figure className="fig dsv6"><div className="fig-stage">
      <${Modes} list=${[['display', 'display()'], ['get', 'get()'], ['count', 'count()'], ['search', 'search(' + item + ')']]} mode=${mode} set=${setMode} />
      <${Code} lines=${WCODE[mode]} cur=${s.l} />
      <${Chain} nodes=${nodes} ptr=${ptr} />
      <div className="dsv6-vars">${vars.map(v => html`<span key=${v} className="dsv6-chip dsv6-k">${v}</span>`)}</div>
      ${s.out != null && html`<div className="dsv6-out"><small>output</small>${s.out}</div>`}
      <div className="dsv6-try"><div className="dsv6-row">
        <button className="fig-btn" onClick=${() => { setTxt(EX.join(' ')); setItxt('32'); setOrder(EX.slice()); setItem(32); setMsg(''); }}>Example from the notes</button>
        <label className="dsv6-lbl">Push order <input className="dsv6-in" style=${{ width: '120px' }} value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="Values in push order" /></label>
        <label className="dsv6-lbl">item <input className="dsv6-in" style=${{ width: '56px' }} value=${itxt} onChange=${e => setItxt(e.target.value)} aria-label="Item to search for" /></label>
        <button className="fig-btn solid" onClick=${load}>Run</button></div>
        <div className="dsv6-msg">${msg}</div></div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4] exam pattern: main traced with its output ── */
  const MCODE = ['int main()', '{', '  Stack s;', '  if (s.isEmpty())', '    cout<<"Stack is empty"<<endl;', '  s.push(A);', '  s.push(B);', '  cout << "Removed "', '       << s.pop() << endl;', '  s.removeAll();', '  return 0;', '}', '', 'void removeAll()', '{', '  while (!isEmpty())', '    cout<<"popped "<<pop()<<endl;', '}'];
  function L6ExamMain({ ar }) {
    const EX = [50, 70];
    const [vals, setVals] = useState(EX), [txt, setTxt] = useState(EX.join(' ')), [msg, setMsg] = useState('');
    // code: one push line per value
    const code = MCODE.slice(0, 5).concat(vals.map(v => `  s.push(${v});`), MCODE.slice(7));
    const P = vals.length, at = k => k < 5 ? k : k - 2 + P; // MCODE line index → index in code (P push lines replace MCODE 5–6)
    const S = [];
    let out = '', st = [];
    S.push({ l: at(2), st: [], out, en: '<b>Stack s;</b> the constructor sets top = NULL.', ar: 'الـ ' + D('Stack s;') + ' بتنادي الـ constructor اللي بيخلّي الـ top بـ NULL.' });
    out += 'Stack is empty\n';
    S.push({ l: [at(3), at(4)], st: [], out, en: 'isEmpty() is true, so it prints <b>Stack is empty</b>.', ar: 'الـ <bdi dir="ltr">isEmpty()</bdi> بترجع true، فبيطبع ' + D('Stack is empty') + '.' });
    vals.forEach((v, j) => { st = [v].concat(st); S.push({ l: 5 + j, st: st.slice(), nw: 0, out, en: `s.push(${v}): ${chainTxt('top', st)}.`, ar: `بعد ${D('s.push(' + v + ')')} الـ stack بقى:` + L(chainTxt('top', st)) }); });
    const r = st[0]; st = st.slice(1); out += 'Removed ' + r + '\n';
    S.push({ l: [at(7), at(8)], st: st.slice(), out, en: `s.pop() removes the top (${r}) and returns it: prints <b>Removed ${r}</b>. Now ${chainTxt('top', st)}.`, ar: `الـ <bdi dir="ltr">s.pop()</bdi> بتشيل الـ top (${D(r)}) وبترجعه، فبيطبع ${D('Removed ' + r)}. والـ stack بقى:` + L(chainTxt('top', st)) });
    S.push({ l: [at(9), at(15)], st: st.slice(), out, en: 's.removeAll(): pop until the stack is empty.', ar: 'الـ <bdi dir="ltr">s.removeAll()</bdi> بتعمل pop لحد ما الـ stack يفضى.' });
    while (st.length) {
      const v = st[0]; st = st.slice(1); out += 'popped ' + v + '\n';
      S.push({ l: [at(15), at(16)], st: st.slice(), out, en: `!isEmpty() is true, so pop() returns ${v}: prints <b>popped ${v}</b>.`, ar: `الـ <bdi dir="ltr">!isEmpty()</bdi> بترجع true، فالـ <bdi dir="ltr">pop()</bdi> بترجع ${D(v)} وبيطبع ${D('popped ' + v)}.` });
    }
    S.push({ l: [at(15), at(10)], st: [], out, en: 'isEmpty() is now true: the loop ends, top = NULL, and main returns 0.', ar: 'الـ <bdi dir="ltr">isEmpty()</bdi> بقت true فالـ loop بتخلص، والـ top بقى NULL، والـ main بترجع ' + D('0') + '.' });
    const [i, ctl] = useWalk(S.length, 1800, vals.join(',')), s = S[i];
    const load = () => { const v = ints(txt); if (v.length < 1 || v.length > 5) { setMsg('Type 1 to 5 whole numbers to push.'); return; } setMsg(''); setVals(v); };
    return html`<figure className="fig dsv6"><div className="fig-stage">
      <${Code} lines=${code} cur=${s.l} />
      <${Chain} nodes=${s.st.map((v, k) => ({ v, c: s.nw === k ? 'dsv6-new' : '' }))} ptr=${{ 0: ['top'] }} />
      <div className="dsv6-out"><small>output</small>${s.out}</div>
      <div className="dsv6-try"><div className="dsv6-row">
        <button className="fig-btn" onClick=${() => { setTxt(EX.join(' ')); setVals(EX.slice()); setMsg(''); }}>Example from the notes</button>
        <label className="dsv6-lbl">Try your own (values pushed) <input className="dsv6-in" style=${{ width: '110px' }} value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="Values pushed in main" /></label>
        <button className="fig-btn solid" onClick=${load}>Run</button></div>
        <div className="dsv6-msg">${msg}</div></div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5] Lab 7 struct version next to the class version ── */
  const CPUSH = ['void push(int item)', '{ Node *newnode = new Node();', '  newnode->data = item;', '  if (isEmpty())', '  { newnode->next = NULL;', '    top = newnode; }', '  else', '  { newnode->next = top;', '    top = newnode; }', '}'];
  const SPUSH = ['void push(int item)', '{ node *newnode = new node;', '  newnode->data = item;', '  newnode->next = top;', '  top = newnode;', '}'];
  const CPOP = ['int pop()', '{ int value;', '  Node *temp = top;', '  if (isEmpty())', '  { cout << "Empty" << endl;', '    return 0; }', '  else', '  { value = top->data;', '    top = top->next;', '    delete(temp);', '    return (value); }', '}'];
  const SPOP = ['void pop()', '{ node *delnode = top;', '  if (top == NULL)', '    cout << "Stack Underflow\\n";', '  else', '  {cout<<"The popped element is "', '        <<top->data<<endl;', '    top = top->next;', '    delete delnode; }', '}'];
  function L6Lab7Compare({ ar }) {
    const [mode, setMode] = useState('pe');
    const M = {
      pe: { before: [], after: [50], cc: CPUSH, cl: [1, 2, 3, 4, 5], cs: [6, 7, 8], sc: SPUSH, sl: [1, 2, 3, 4], co: '', so: '',
        en: 'push(50) on an empty stack. The class version tests isEmpty() and sets next = NULL. Lab 7 just sets <b>newnode->next = top</b>, and top is NULL anyway, so both give top → 50 → NULL.',
        ar: 'بنعمل ' + D('push(50)') + ' على stack فاضي. نسخة الـ class بتشيك الـ <bdi dir="ltr">isEmpty()</bdi> وبتحط الـ next بـ NULL. أما Lab 7 فبتعمل ' + D('newnode->next = top') + ' على طول، والـ top أصلاً NULL، فالاتنين بيدّوا نفس النتيجة:' + L('top → 50 → NULL') },
      pn: { before: [50], after: [70, 50], cc: CPUSH, cl: [1, 2, 3, 6, 7, 8], cs: [4, 5], sc: SPUSH, sl: [1, 2, 3, 4], co: '', so: '',
        en: 'push(70) on top → 50. Both set newnode->next = top, then top = newnode: top → 70 → 50 → NULL. Push = insert at the beginning.',
        ar: 'بنعمل ' + D('push(70)') + ' والـ top على 50. الاتنين بيعملوا ' + D('newnode->next = top') + ' وبعدين ' + D('top = newnode') + '، والنتيجة:' + L('top → 70 → 50 → NULL') + 'يعني الـ push هو إضافة في الأول.' },
      on: { before: [70, 50], after: [50], cc: CPOP, cl: [1, 2, 3, 7, 8, 9, 10], cs: [4, 5], sc: SPOP, sl: [1, 2, 5, 6, 7, 8], co: 'pop() returns 70', so: 'The popped element is 70',
        en: 'pop() on top → 70 → 50. The class version <b>returns</b> 70 (main prints it); Lab 7 <b>prints</b> "The popped element is 70" and returns nothing. Both delete the old top: top → 50 → NULL.',
        ar: 'بنعمل <bdi dir="ltr">pop()</bdi> والـ stack فيه 70 فوق 50. نسخة الـ class بترجع الـ 70 (والـ main هي اللي تطبعه)، أما Lab 7 فبتطبع الجملة بنفسها ومش بترجع حاجة. والاتنين بيمسحوا الـ top القديم، والنتيجة:' + L('top → 50 → NULL') },
      oe: { before: [], after: [], cc: CPOP, cl: [1, 2, 3, 4, 5], cs: [7, 8, 9, 10], sc: SPOP, sl: [1, 2, 3], co: 'Empty  (returns 0)', so: 'Stack Underflow',
        en: 'pop() on an empty stack (top == NULL). The class version prints <b>Empty</b> and returns 0; Lab 7 prints <b>Stack Underflow</b>. Nothing is deleted.',
        ar: 'بنعمل <bdi dir="ltr">pop()</bdi> على stack فاضي (' + D('top == NULL') + '). نسخة الـ class بتطبع Empty وبترجع ' + D('0') + '، وLab 7 بتطبع ' + D('Stack Underflow') + '. ومفيش حاجة بتتمسح.' }
    }[mode];
    const allC = M.cc.map((_, k) => k), allS = M.sc.map((_, k) => k);
    return html`<figure className="fig dsv6"><div className="fig-stage">
      <${Modes} list=${[['pe', 'push(50), empty'], ['pn', 'push(70)'], ['on', 'pop()'], ['oe', 'pop(), empty']]} mode=${mode} set=${setMode} />
      <div className="dsv6-row" style=${{ alignItems: 'flex-start' }}>
        <div><div className="dsv6-lab">before</div><${Chain} nodes=${M.before.map(v => ({ v }))} ptr=${{ 0: ['top'] }} /></div>
        <div><div className="dsv6-lab">after</div><${Chain} key=${mode} nodes=${M.after.map((v, k) => ({ v, c: mode[0] === 'p' && k === 0 ? 'dsv6-new' : '' }))} ptr=${{ 0: ['top'] }} anim=${mode[0] === 'p'} /></div></div>
      <div className="dsv6-ct">Lecture class (Stack)</div>
      <${Code} lines=${M.cc} cur=${M.cl} skip=${M.cs} />
      ${M.co && html`<div className="dsv6-out" style=${{ margin: '0 auto 8px' }}><small>class output</small>${M.co}</div>`}
      <div className="dsv6-ct">Lab 7 (struct node, global top)</div>
      <${Code} lines=${M.sc} cur=${M.sl} skip=${allS.filter(k => k && k < M.sc.length - 1 && !M.sl.includes(k))} />
      ${M.so && html`<div className="dsv6-out"><small>Lab 7 output</small>${M.so}</div>`}</div>
      <${Cap} en=${M.en} ar=${M.ar} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ds-l6-slide-stack': L6SlideStack,
    'ds-l6-creation': L6Creation,
    'ds-l6-pop-order': L6PopOrder,
    'ds-l6-walk': L6Walk,
    'ds-l6-exam-main': L6ExamMain,
    'ds-l6-lab7-compare': L6Lab7Compare
  });
})();
/* ── part L7 ── */
// Data Structures visuals, Lecture 7 (Linked Queues): slide 4's queue built node by node with its addresses, fixed-size array queue vs linked queue, the creation steps (slides 5–7), slide 12's display steps, the professor's display/get/count/search traced, linked stack vs linked queue (quiz sequence), the exam pattern main traced, and Lab 7's dequeue branches. The enqueue/dequeue pointer animations are viz.js's (not redone here). Every label and number comes from the site's notes and the slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm } = window.FIGKIT;
  const CSS = `
.dsv7 *{ font-variant-ligatures:none; }
.dsv7 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dsv7 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv7-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dsv7-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dsv7-row{ display:flex; flex-wrap:wrap; gap:6px 8px; justify-content:center; align-items:center; margin:8px 0 0; }
.dsv7-chain{ display:flex; flex-wrap:wrap; justify-content:center; align-items:flex-start; row-gap:8px; min-height:66px; margin:2px 0; }
.dsv7-item{ display:flex; align-items:flex-start; }
.dsv7-n{ display:flex; flex-direction:column; align-items:center; }
.dsv7-top{ height:17px; font:.75rem/17px var(--mono); color:var(--graphite); white-space:nowrap; }
.dsv7-box{ display:flex; height:30px; box-sizing:border-box; border:2px solid var(--fig-k); border-radius:5px; overflow:hidden; background:var(--paper); transition:box-shadow .35s, opacity .35s; }
.dsv7-d{ display:grid; place-items:center; padding:0 6px; min-width:20px; font:700 .85rem var(--mono); color:var(--ink); background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); }
.dsv7-x{ display:grid; place-items:center; padding:0 5px; min-width:12px; font:600 .78rem var(--mono); color:var(--ink); border-left:1px solid var(--line); transition:background .35s; }
.dsv7-x.chg{ background:color-mix(in srgb, var(--ok) 30%, var(--paper)); }
.dsv7-box.new{ box-shadow:0 0 0 3px var(--ok); }
.dsv7-box.hot{ box-shadow:0 0 0 3px var(--fig-k); }
.dsv7-box.gone{ border-style:dashed; border-color:var(--faint); opacity:.6; }
.dsv7-box.gone .dsv7-d{ background:transparent; color:var(--faint); text-decoration:line-through; }
.dsv7-bot{ display:flex; flex-direction:column; align-items:center; min-height:17px; }
.dsv7-tag{ font:700 .75rem/1.25 var(--mono); color:var(--fig-k); white-space:nowrap; }
.dsv7-tag.t2{ color:var(--pen); }
.dsv7-arw{ display:flex; align-items:center; height:30px; margin-top:17px; padding:0 3px; color:var(--fig-k); font-size:1rem; }
.dsv7-null{ display:flex; align-items:center; height:30px; margin-top:17px; font:600 .78rem var(--mono); color:var(--graphite); }
.dsv7-empty{ align-self:center; font:.82rem var(--mono); color:var(--graphite); }
.dsv7-vars{ display:flex; flex-wrap:wrap; justify-content:center; gap:6px; margin:6px 0 0; }
.dsv7-vars span{ font:600 .78rem var(--mono); color:var(--ink); border:1px solid var(--line); border-radius:6px; padding:2px 7px; background:var(--paper); transition:background .35s; }
.dsv7-vars span.chg{ background:color-mix(in srgb, var(--ok) 26%, var(--paper)); }
.dsv7-code{ margin:0 auto 8px; max-width:420px; padding:8px 10px; border:1px solid var(--line); border-radius:8px; background:var(--paper); font:.78rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv7-code small{ display:block; font:700 .75rem var(--body); color:var(--graphite); margin-bottom:2px; }
.dsv7-code span{ display:block; border-radius:3px; padding:0 3px; transition:background .3s; }
.dsv7-code span.cur{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.dsv7-out{ max-width:420px; margin:8px auto 0; padding:6px 10px; border:1px solid var(--line); border-left:4px solid var(--fig-k); border-radius:6px; background:var(--paper); font:600 .8rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; min-height:1.5em; text-align:left; direction:ltr; }
.dsv7-out small{ display:block; font:600 .75rem var(--body); color:var(--graphite); }
.dsv7-pop{ animation:dsv7-in .45s ease both; }
@keyframes dsv7-in{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }
.dsv7-pair{ display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:10px; max-width:600px; margin:0 auto; }
.dsv7-panel{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 6px; color:var(--ink); text-align:center; min-width:0; }
.dsv7-panel > b{ display:block; font-size:.86rem; margin-bottom:4px; }
.dsv7-panel .dsv7-chain{ min-height:66px; }
.dsv7-msg{ font-size:.8rem; line-height:1.35; margin-top:4px; min-height:1.3em; color:var(--graphite); }
.dsv7-msg.bad{ color:var(--pen); font-weight:700; } .dsv7-msg.good{ color:var(--ok); font-weight:700; }
.dsv7-arr{ display:flex; justify-content:center; gap:3px; margin:4px 0; }
.dsv7-cell{ display:flex; flex-direction:column; align-items:center; gap:2px; width:38px; }
.dsv7-cell i{ font:normal .75rem var(--mono); color:var(--graphite); }
.dsv7-cell span{ width:100%; height:32px; box-sizing:border-box; display:grid; place-items:center; border:1px solid var(--line); border-radius:5px; background:var(--paper-2); font:700 .82rem var(--mono); color:var(--ink); }
.dsv7-cell span.on{ background:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); }
.dsv7-cell span.bad{ box-shadow:0 0 0 2px var(--pen); }
.dsv7-in{ font:.9rem var(--mono); width:64px; padding:4px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:32px; box-sizing:border-box; }
.dsv7-in.wide{ width:150px; }
.dsv7-lbl{ font-size:.82rem; color:var(--graphite); }
.dsv7-steps{ max-width:420px; margin:0 auto 8px; padding:0; list-style:none; display:grid; gap:3px; }
.dsv7-steps li{ font-size:.82rem; line-height:1.35; padding:3px 8px; border-radius:6px; border:1px solid var(--line); background:var(--paper); color:var(--ink); opacity:.55; transition:opacity .3s, background .3s; }
.dsv7-steps li.cur{ opacity:1; background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.dsv7-steps li b{ font-family:var(--mono); }
.dsv7-menu{ max-width:240px; margin:8px auto 0; border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px 10px; font:.8rem/1.5 var(--mono); color:var(--ink); text-align:left; direction:ltr; }
.dsv7-menu b{ display:block; font-family:var(--body); font-size:.8rem; color:var(--graphite); }
.dsv7-show{ transition:opacity .45s, transform .45s; } .dsv7-show.off{ opacity:0; transform:translateY(6px); pointer-events:none; }
@media (prefers-reduced-motion: reduce){ .dsv7-pop{ animation:none; } .dsv7-show, .dsv7-box, .dsv7-x, .dsv7-code span, .dsv7-steps li, .dsv7-vars span{ transition:none; } }`;
  if (!document.getElementById('dsv7-css')) { const s = document.createElement('style'); s.id = 'dsv7-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* helpers */
  const L = s => `<span class="ltr">${s}</span>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const D = s => `<bdi dir="ltr">${esc(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const parseVals = t => (String(t).match(/-?\d+/g) || []).slice(0, 8).map(x => Math.max(-999, Math.min(999, parseInt(x, 10))));
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
  // a chain of nodes: [data | next], address above, pointer tags below
  // nodes: [{ id, v, nx, top, tags:[{t, c}], cls, xc }]; nul: draw "→ NULL" after the last node
  const Chain = ({ nodes, nul, empty }) => html`<div className="dsv7-chain">
    ${!nodes.length && html`<span className="dsv7-empty">${empty || 'empty'}</span>`}
    ${nodes.map((n, k) => html`<div key=${n.id != null ? n.id : k} className="dsv7-item dsv7-pop">
      <div className="dsv7-n"><span className="dsv7-top">${n.top || ''}</span>
        <span className=${'dsv7-box ' + (n.cls || '')}><span className="dsv7-d">${n.v}</span><span className=${'dsv7-x' + (n.xc ? ' chg' : '')}>${n.nx != null ? n.nx : '•'}</span></span>
        <span className="dsv7-bot">${(n.tags || []).map((g, j) => html`<span key=${j} className=${'dsv7-tag' + (g.c ? ' ' + g.c : '')}>↑${g.t}</span>`)}</span></div>
      ${(k < nodes.length - 1 || nul) && html`<span className="dsv7-arw">→</span>`}</div>`)}
    ${nul && nodes.length > 0 && html`<span className="dsv7-null">NULL</span>`}</div>`;
  const Vars = ({ list }) => html`<div className="dsv7-vars">${list.map(([t, chg], k) => html`<span key=${k} className=${chg ? 'chg' : ''}>${t}</span>`)}</div>`;
  const Code = ({ title, lines, cur }) => html`<div className="dsv7-code">${title && html`<small>${title}</small>`}${lines.map((t, k) => html`<span key=${k} className=${cur.includes(k) ? 'cur' : ''}>${t || ' '}</span>`)}</div>`;
  const Out = ({ label, text }) => html`<div className="dsv7-out"><small>${label || 'Output'}</small>${text || ' '}</div>`;
  // queue tags: front on the first node, rear on the last, extra tags by index
  const qTags = (n, k, extra) => [...(k === 0 ? [{ t: 'front' }] : []), ...(k === n - 1 ? [{ t: 'rear' }] : []), ...((extra && extra[k]) || [])];

  /* ── [0.3] slide 4: 10, 15, 22, 50 inserted, with the slide's addresses ── */
  const S4 = [[10, 1001], [15, 1004], [22, 1008], [50, 1012]];
  function buildSlideFig() {
    const steps = [{ k: 0, en: 'Before any insertion the queue is empty: both pointers are NULL.', ar: 'قبل أي إضافة الـ queue فاضي، والـ pointers الاتنين بـ NULL:' + L('front = NULL, rear = NULL') }];
    S4.forEach(([v, a], j) => {
      if (j === 0) steps.push({ k: 1, en: `Insert ${v}: a node at address ${a} with next = NULL. It is the only node, so front and rear both hold ${a}.`, ar: `نضيف ${D(v)}، فبتتعمل node في العنوان ${D(a)} والـ next بتاعها بـ NULL. هي الـ node الوحيدة، فالـ front والـ rear الاتنين شايلين ${D(a)}.` });
      else steps.push({ k: j + 1, en: `Insert ${v} at ${a}: the old last node's next changes from NULL to ${a}, and rear moves to ${a}. front stays at 1001.` + (j === 3 ? ' This is the slide\'s figure: rear points to the last inserted node (50) and front to the first (10); the order of insertion is 10, 15, 22, 50.' : ''),
        ar: `نضيف ${D(v)} في العنوان ${D(a)}، فالـ next بتاع آخر node قديمة بيتغير من NULL لـ ${D(a)}، والـ rear بيتنقل لـ ${D(a)}. والـ front فاضل عند ${D(1001)}.` + (j === 3 ? ' ودي رسمة الـ slide: الـ rear بيشاور على آخر node اتضافت (50) والـ front على أول واحدة (10)، وترتيب الإضافة:' + L('10, 15, 22, 50') : '') });
    });
    return steps;
  }
  function SlideFig({ ar }) {
    const steps = buildSlideFig(), [i, ctl] = useWalk(steps.length, 2300, 0), st = steps[i], k = st.k;
    const nodes = S4.slice(0, k).map(([v, a], j) => ({ id: a, v, top: a, nx: j < k - 1 ? S4[j + 1][1] : 'NULL', xc: j === k - 2, cls: j === k - 1 && i > 0 ? 'new' : '', tags: qTags(k, j) }));
    return html`<figure className="fig dsv7"><div className="fig-stage">
      <${Chain} nodes=${nodes} empty="front = NULL, rear = NULL" />
      <${Vars} list=${[['front = ' + (k ? 1001 : 'NULL'), k === 1], ['rear = ' + (k ? S4[k - 1][1] : 'NULL'), k > 0]]} />
      <p className="dsv7-msg">Each box: data | next (the next node's address)</p></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${steps.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.1] fixed-size array queue vs linked queue ── */
  const AQ = 5, LMAX = 10;
  function fixedMsg(vals) {
    const n = vals.length;
    if (!n) return { en: `An array queue is declared with a fixed size (here ${AQ} cells); the linked queue has no size. Type a value and press enqueue.`, ar: `الـ array queue بيتعرّف بحجم ثابت (هنا ${D(AQ)} خانات)، والـ linked queue ملوش حجم. اكتب قيمة ودوس enqueue.` };
    const v = vals[n - 1], call = 'enqueue(' + v + ')';
    if (n <= AQ) return { en: `${call}: the array stores it in cell [${n - 1}] of its ${AQ}; the linked queue creates a new node (new Node()) and links it after rear.`, ar: `الـ ${D(call)} بتحطها في الـ array في خانة رقم ${D(n - 1)} من الـ ${D(AQ)}، والـ linked queue بيعمل node جديدة بـ ${D('new Node()')} ويربطها بعد الـ rear.` };
    if (n < LMAX) return { en: `${call}: the array queue is full (all ${AQ} cells are used), so ${v} cannot go in. The linked queue just creates node number ${n}: it works for a variable number of values.`, ar: `الـ ${D(call)} مش هتدخل الـ array queue لأنه full (الـ ${D(AQ)} خانات اتملوا). لكن الـ linked queue بيعمل node رقم ${D(n)} عادي، لأنه بيشتغل مع عدد متغير من القيم.` };
    return { en: `${call}: still no limit for the linked queue (node number ${n}). This picture stops at ${LMAX} nodes, but the linked queue itself has no fixed size.`, ar: `الـ ${D(call)} برضه مفيش حد للـ linked queue (دي node رقم ${D(n)}). الرسمة هنا بتقف عند ${D(LMAX)} nodes، لكن الـ linked queue نفسه ملوش حجم ثابت.` };
  }
  function FixedVsLinked({ ar }) {
    const [vals, setVals] = useState([]), [txt, setTxt] = useState('10');
    const n = vals.length, full = n >= LMAX;
    const add = () => { const v = parseVals(txt)[0]; if (v == null || full) return; setVals(vals.concat(v)); setTxt(String(v + 5)); };
    const m = fixedMsg(vals), rej = vals.slice(AQ);
    return html`<figure className="fig dsv7"><div className="fig-stage"><div className="dsv7-pair">
      <div className="dsv7-panel"><b>Array queue (size ${AQ})</b>
        <div className="dsv7-arr">${Array.from({ length: AQ }, (_, k) => html`<div key=${k} className="dsv7-cell"><i>[${k}]</i><span className=${(k < n ? 'on' : '') + (n > AQ ? ' bad' : '')}>${k < n ? vals[k] : ''}</span></div>`)}</div>
        <p className=${'dsv7-msg' + (rej.length ? ' bad' : '')}>${rej.length ? 'Queue is full: ' + rej.join(', ') + ' rejected' : n + ' of ' + AQ + ' cells used'}</p></div>
      <div className="dsv7-panel"><b>Linked queue (no fixed size)</b>
        <${Chain} nodes=${vals.map((v, k) => ({ id: k, v, cls: k === n - 1 ? 'new' : '', tags: qTags(n, k) }))} nul=${true} empty="front = rear = NULL" />
        <p className=${'dsv7-msg' + (n > AQ ? ' good' : '')}>${n} node${n === 1 ? '' : 's'}</p></div></div>
      <div className="dsv7-row"><span className="dsv7-lbl">value</span><input className="dsv7-in" inputMode="numeric" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="value to enqueue" />
        <button className="fig-btn solid" onClick=${add} disabled=${full}>enqueue</button>
        <button className="fig-btn" onClick=${() => { setVals([]); setTxt('10'); }}>↻ Reset</button></div></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /></figure>`;
  }

  /* ── [0.4] slides 5–7: the three creation steps ── */
  const C_NODE = ['class Node', '{', 'public:', '   int data;', '   Node *next;', '   Node() { data = 0;', '            next = NULL; }', '};'];
  const C_Q = ['class Queue', '{', '   Node *front;', '   Node *rear;', 'public:', '   Queue() { front = NULL;', '             rear = NULL; }', '};'];
  const C_MAIN = ['int main()', '{', '   Queue q;', '   // show the menu, read a choice,', '   // call the chosen function', '}'];
  const MENU = ['1. enqueue', '2. dequeue', '3. display', '4. get', '5. count', '6. search'];
  const CREATE = [
    { code: C_NODE, cur: [3, 4], title: 'Step 1: the Node class', en: 'Step 1: define a <b>Node</b> class with two members, <b>data</b> and <b>next</b> (a pointer to the next node).', ar: 'الخطوة 1: عرّف <b>Node</b> class فيها member-ين، الـ <b>data</b> والـ <b>next</b> (pointer على الـ node اللي بعدها).' },
    { code: C_NODE, cur: [5, 6], title: 'Step 1: the Node class', node: true, en: 'Its constructor <b>Node()</b> sets data = 0 and next = NULL, so every new node starts like this box.', ar: 'الـ constructor بتاعها <b><bdi dir="ltr">Node()</bdi></b> بيخلي القيم دي، فأي node جديدة بتبدأ زي الصندوق ده:' + L('data = 0, next = NULL') },
    { code: C_Q, cur: [2, 3], title: 'Step 2: the Queue class', node: true, ptr: true, en: 'Step 2: define two Node pointers, <b>front</b> and <b>rear</b>.', ar: 'الخطوة 2: عرّف اتنين Node pointers هما الـ <b>front</b> والـ <b>rear</b>.' },
    { code: C_Q, cur: [5, 6], title: 'Step 2: the Queue class', node: true, ptr: true, nul: true, en: 'The Queue() constructor sets both to <b>NULL</b>: an empty queue.', ar: 'الـ constructor بتاع الـ Queue بيخلي الاتنين بـ <b>NULL</b>، يعني queue فاضي.' },
    { code: C_MAIN, cur: [2, 3, 4], title: 'Step 3: main', node: true, ptr: true, nul: true, menu: true, en: 'Step 3: main displays a menu of the operations and calls the function the user picks (they are traced in the visuals below).', ar: 'الخطوة 3: الـ main بتعرض menu فيها العمليات وبتنادي الـ function اللي المستخدم يختارها (متتبعة في الرسومات اللي تحت).' }
  ];
  function Creation({ ar }) {
    const [i, ctl] = useWalk(CREATE.length, 2600, 0), st = CREATE[i];
    return html`<figure className="fig dsv7"><div className="fig-stage">
      <${Code} title=${st.title} lines=${st.code} cur=${st.cur} />
      <div className="dsv7-pair" style=${{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
        <div className=${'dsv7-panel dsv7-show' + (st.node ? '' : ' off')}><b>new Node()</b><${Chain} nodes=${[{ v: 0, nx: 'NULL' }]} /><p className="dsv7-msg">data | next</p></div>
        <div className=${'dsv7-panel dsv7-show' + (st.ptr ? '' : ' off')}><b>Queue q</b><${Vars} list=${[['front = ' + (st.nul ? 'NULL' : '?'), i === 3], ['rear = ' + (st.nul ? 'NULL' : '?'), i === 3]]} /></div></div>
      <div className=${'dsv7-menu dsv7-show' + (st.menu ? '' : ' off')}><b>Menu</b>${MENU.map(t => html`<div key=${t}>${t}</div>`)}</div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${CREATE.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1.2] slide 12: the display steps ── */
  const SL12 = ['Step 1: empty? (front == NULL)', 'Step 2: if empty, display "Queue is Empty", stop', 'Step 3: temp = front', 'Step 4: display temp→data, move to the next node, until temp reaches rear (temp→next == NULL)', 'Step 5: display "temp→data ---> NULL"'];
  function buildDisplay(vals) {
    const n = vals.length, S = [];
    if (!n) {
      S.push({ s: 0, t: null, out: '', en: 'Step 1: is the queue empty? front == NULL: <b>yes</b>.', ar: 'الخطوة 1: الـ queue فاضي؟ الـ front بـ NULL، يعني <b>آه</b>.' });
      S.push({ s: 1, t: null, out: 'Queue is Empty', en: 'Step 2: it is empty, so display "Queue is Empty" and terminate the function.', ar: 'الخطوة 2: هو فاضي، فبنعرض "Queue is Empty" ونخرج من الـ function.' });
      return S;
    }
    S.push({ s: 0, t: null, out: '', en: 'Step 1: is the queue empty? front == NULL: <b>no</b>.', ar: 'الخطوة 1: الـ queue فاضي؟ الـ front مش NULL، يعني <b>لأ</b>.' });
    S.push({ s: 2, t: 0, out: '', en: `Step 3: define temp and set it to front (the node ${vals[0]}).`, ar: `الخطوة 3: عرّف temp وخليه يساوي الـ front، يعني على الـ node اللي فيها ${D(vals[0])}.` });
    let out = '';
    for (let k = 0; k < n - 1; k++) {
      out += vals[k] + ' ';
      S.push({ s: 3, t: k + 1, out, en: `Step 4: display ${vals[k]}, then move temp to the next node (${vals[k + 1]}). temp→next is not NULL yet, so repeat.`, ar: `الخطوة 4: اعرض ${D(vals[k])} وبعدين حرّك الـ temp للـ node اللي بعدها (${D(vals[k + 1])}). الـ ${D('temp→next')} لسه مش NULL، فبنكرر.` });
    }
    S.push({ s: 3, t: n - 1, out, stop: true, en: `temp has reached rear (${vals[n - 1]}): temp→next == NULL, so the loop stops.`, ar: `الـ temp وصل للـ rear عند ${D(vals[n - 1])}، والـ next بتاعه بـ NULL، فالـ loop بتقف.` });
    out += vals[n - 1] + ' ---> NULL';
    S.push({ s: 4, t: n - 1, out, en: `Step 5: finally display "${vals[n - 1]} ---> NULL". The whole queue is shown from front to rear.`, ar: 'الخطوة 5: في الآخر اعرض ' + D(vals[n - 1] + ' ---> NULL') + '. كده الـ queue كله اتعرض من الـ front للـ rear.' });
    return S;
  }
  function DisplaySteps({ ar }) {
    const [txt, setTxt] = useState('10, 15, 22, 50'), [vals, setVals] = useState([10, 15, 22, 50]);
    const S = buildDisplay(vals), [i, ctl] = useWalk(S.length, 2000, vals.join(',')), st = S[i];
    const nodes = vals.map((v, k) => ({ id: k + ':' + v, v, cls: k === st.t ? 'hot' : '', tags: qTags(vals.length, k, { [st.t]: [{ t: 'temp', c: 't2' }] }) }));
    const load = v => { setVals(v); setTxt(v.join(', ')); };
    return html`<figure className="fig dsv7"><div className="fig-stage">
      <div className="dsv7-modes"><button className="fig-btn" aria-pressed=${vals.join() === '10,15,22,50'} onClick=${() => load([10, 15, 22, 50])}>Slide 4's queue</button><button className="fig-btn" aria-pressed=${!vals.length} onClick=${() => load([])}>Empty queue</button></div>
      <ul className="dsv7-steps">${SL12.map((t, k) => html`<li key=${k} className=${k === st.s ? 'cur' : ''}>${t}</li>`)}</ul>
      <${Chain} nodes=${nodes} nul=${true} empty="front = NULL" />
      <${Out} text=${st.out} />
      <div className="dsv7-row"><span className="dsv7-lbl">Try your own</span><input className="dsv7-in wide" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="queue values, front first" /><button className="fig-btn" onClick=${() => setVals(parseVals(txt))}>Load</button></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3] the professor's display, get, count, search traced ── */
  const FCODE = {
    display: ['void display()', '{', '   Node *temp = front;', '   while (temp != NULL)', '   {  cout << temp->data << " ";', '      temp = temp->next; }', '   cout << endl << "END" << endl;', '}'],
    get: ['int get()          // first node', '{', '   if (front != NULL)', '      return front->data;', '   else { cout << "Empty";', '          return 0; }', '}'],
    count: ['int count()', '{', '   int c = 0;', '   Node *temp = front;', '   while (temp != NULL)', '   {  c++;', '      temp = temp->next; }', '   return (c);', '}'],
    search: ['bool search(int item)', '{', '   Node *temp = front;', '   while (temp != NULL)', '   {  if (temp->data == item)', '         return (true);', '      else temp = temp->next; }', '   return (false);', '}']
  };
  function buildFn(fn, vals, item) {
    const n = vals.length, S = [], tn = t => t == null || t >= n ? 'NULL' : 'node ' + vals[t];
    const tA = t => t == null || t >= n ? 'NULL' : D(vals[t]);
    if (fn === 'display') {
      let out = '';
      S.push({ cur: [2], t: 0, out, en: `temp = front: temp points to ${tn(0)}.`, ar: `الـ temp بياخد قيمة الـ front، فبيشاور على ${n ? 'الـ node ' + tA(0) : 'NULL'}.` });
      for (let k = 0; k < n; k++) {
        out += vals[k] + ' ';
        S.push({ cur: [3, 4, 5], t: k + 1, out, en: `temp != NULL, so print ${vals[k]} and a space, then temp = temp->next (now ${tn(k + 1)}).`, ar: `الـ temp مش NULL، فبنطبع ${D(vals[k])} ومسافة، وبعدين ${D('temp = temp->next')} فبقى على ${k + 1 < n ? 'الـ node ' + tA(k + 1) : 'NULL'}.` });
      }
      out += '\nEND';
      S.push({ cur: [3, 6], t: n, out, en: (n ? 'temp is NULL (past the rear), so the loop ends' : 'The queue is empty: temp is NULL at once, so the loop never runs') + '; print a new line and END.', ar: (n ? 'الـ temp بقى NULL (عدّى الـ rear)، فالـ loop خلصت' : 'الـ queue فاضي، فالـ temp بـ NULL من الأول والـ loop مش بتلف خالص') + '، وبنطبع سطر جديد وبعده END.' });
    } else if (fn === 'get') {
      if (n) S.push({ cur: [2, 3], t: null, g: true, out: 'returns ' + vals[0], en: `front != NULL, so get() returns front->data = ${vals[0]}, the head (first node). Nothing is removed.`, ar: `الـ front مش NULL، فالـ ${D('get()')} بترجّع الـ data بتاعة الـ head (أول node) وهي ${D(vals[0])}. ومفيش حاجة بتتشال.` });
      else S.push({ cur: [4, 5], t: null, out: 'Empty\nreturns 0', en: 'front is NULL, so get() prints "Empty" and returns 0.', ar: 'الـ front بـ NULL، فالـ ' + D('get()') + ' بتطبع "Empty" وبترجّع صفر.' });
    } else if (fn === 'count') {
      S.push({ cur: [2, 3], t: 0, c: 0, out: '', en: `c = 0 and temp = front (${tn(0)}).`, ar: `الـ c بيبدأ بصفر والـ temp على الـ front (${n ? 'الـ node ' + tA(0) : 'NULL'}).` });
      for (let k = 0; k < n; k++) S.push({ cur: [4, 5, 6], t: k + 1, c: k + 1, out: '', en: `temp != NULL: c++ makes c = ${k + 1}, then temp moves on (now ${tn(k + 1)}).`, ar: `الـ temp مش NULL، فالـ ${D('c++')} بتخلي الـ c بـ ${D(k + 1)}، وبعدين الـ temp بيتحرك (بقى على ${k + 1 < n ? 'الـ node ' + tA(k + 1) : 'NULL'}).` });
      S.push({ cur: [4, 7], t: n, c: n, out: 'returns ' + n, en: `temp is NULL, so the loop ends and count() returns ${n}.`, ar: `الـ temp بقى NULL، فالـ loop خلصت والـ ${D('count()')} بترجّع ${D(n)}.` });
    } else {
      S.push({ cur: [2], t: 0, out: '', en: `Looking for item = ${item}. temp = front (${tn(0)}).`, ar: `بندوّر على الـ item وهو ${D(item)}. الـ temp بيبدأ من الـ front (${n ? 'الـ node ' + tA(0) : 'NULL'}).` });
      let found = false;
      for (let k = 0; k < n; k++) {
        if (vals[k] === item) { S.push({ cur: [3, 4, 5], t: k, hit: true, out: 'returns true', en: `temp->data == ${item}: found, so search() returns true (after ${k + 1} node${k ? 's' : ''}).`, ar: `الـ data بتاعة الـ temp بتساوي ${D(item)}، يعني لقيناه بعد ما عدّينا على ${D(k + 1)} ${k ? 'nodes' : 'node'}، فالـ ${D('search()')} بترجّع true.` }); found = true; break; }
        S.push({ cur: [3, 4, 6], t: k + 1, out: '', en: `${vals[k]} is not ${item}, so temp = temp->next (now ${tn(k + 1)}).`, ar: `الـ ${D(vals[k])} مش هو الـ ${D(item)}، فبنعمل ${D('temp = temp->next')} وبقى على ${k + 1 < n ? 'الـ node ' + tA(k + 1) : 'NULL'}.` });
      }
      if (!found) S.push({ cur: [3, 7], t: n, out: 'returns false', en: `temp is NULL: the whole queue was checked without finding ${item}, so search() returns false.`, ar: `الـ temp بقى NULL، يعني لفّينا على الـ queue كله ومالقيناش ${D(item)}، فالـ ${D('search()')} بترجّع false.` });
    }
    return S;
  }
  function Funcs({ ar }) {
    const [fn, setFn] = useState('search'), [txt, setTxt] = useState('10, 15, 22, 50'), [vals, setVals] = useState([10, 15, 22, 50]), [itx, setItx] = useState('22'), [item, setItem] = useState(22);
    const S = buildFn(fn, vals, item), [i, ctl] = useWalk(S.length, 1900, fn + vals.join(',') + '|' + item), st = S[i];
    const nodes = vals.map((v, k) => ({ id: k + ':' + v, v, cls: st.hit && k === st.t ? 'new' : (k === st.t || (st.g && k === 0)) ? 'hot' : '', tags: qTags(vals.length, k, { [st.t]: [{ t: 'temp', c: 't2' }] }) }));
    const vars = [[st.t == null ? 'temp: -' : st.t >= vals.length ? 'temp = NULL' : 'temp → ' + vals[st.t], false]];
    if (fn === 'count') vars.push(['c = ' + st.c, i > 0]);
    if (fn === 'search') vars.push(['item = ' + item, false]);
    if (fn === 'get') vars.length = 0;
    const loadItem = () => { const v = parseVals(itx)[0]; if (v != null) setItem(v); };
    return html`<figure className="fig dsv7"><div className="fig-stage">
      <div className="dsv7-modes">${['display', 'get', 'count', 'search'].map(f => html`<button key=${f} className="fig-btn" aria-pressed=${fn === f} onClick=${() => setFn(f)}>${f}()</button>`)}</div>
      <${Code} lines=${FCODE[fn]} cur=${st.cur} />
      <${Chain} nodes=${nodes} nul=${true} empty="front = NULL" />
      ${vars.length > 0 && html`<${Vars} list=${vars} />`}
      <${Out} label=${fn === 'display' ? 'Output' : 'Output / return value'} text=${st.out} />
      <div className="dsv7-row"><span className="dsv7-lbl">queue</span><input className="dsv7-in wide" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="queue values, front first" /><button className="fig-btn" onClick=${() => setVals(parseVals(txt))}>Load</button></div>
      ${fn === 'search' && html`<div className="dsv7-row"><span className="dsv7-lbl">item</span><input className="dsv7-in" inputMode="numeric" value=${itx} onChange=${e => setItx(e.target.value)} aria-label="item to search for" /><button className="fig-btn" onClick=${loadItem}>Search</button></div>`}
      <div className="dsv7-row"><button className="fig-btn" onClick=${() => { setTxt('10, 15, 22, 50'); setVals([10, 15, 22, 50]); setItx('22'); setItem(22); }}>Example: slide 4's queue</button></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1.3] linked stack vs linked queue, same values (quiz: 10, 15, 22, 50, two removals, 7) ── */
  const QUIZ = [{ t: 'in', v: 10 }, { t: 'in', v: 15 }, { t: 'in', v: 22 }, { t: 'in', v: 50 }, { t: 'out' }, { t: 'out' }, { t: 'in', v: 7 }];
  function buildSQ(ops) {
    let s = [], q = []; const S = [{ s: [], q: [], en: 'Same operations on a linked stack (one pointer, top) and a linked queue (two pointers, front and rear).', ar: 'نفس العمليات على linked stack (فيه pointer واحد هو الـ top) وعلى linked queue (فيه اتنين هما الـ front والـ rear).' }];
    for (const o of ops) {
      let en, a, ns = null, nq = null;
      if (o.t === 'in') {
        s = [o.v].concat(s); q = q.concat(o.v); ns = 0; nq = q.length - 1;
        en = `push(${o.v}) puts ${o.v} at the <b>beginning</b> of the stack (new top); enqueue(${o.v}) puts it at the <b>end</b> of the queue (new rear).`;
        a = `الـ ${D('push(' + o.v + ')')} بتحط ${D(o.v)} في <b>أول</b> الـ stack (بقت الـ top)، والـ ${D('enqueue(' + o.v + ')')} بتحطها في <b>آخر</b> الـ queue (بقت الـ rear).`;
      } else {
        if (!s.length) { en = 'Both are empty: pop() and dequeue() have nothing to remove.'; a = 'الاتنين فاضيين، فالـ pop والـ dequeue مش لاقيين حاجة يشيلوها.'; }
        else {
          const ps = s[0], pq = q[0]; s = s.slice(1); q = q.slice(1);
          en = `pop() removes ${ps} from the beginning (the top, the last one in: LIFO); dequeue() removes ${pq} from the front (the first one in: FIFO).`;
          a = `الـ ${D('pop()')} بتشيل ${D(ps)} من الأول، يعني الـ top اللي دخل آخر واحد (LIFO). والـ ${D('dequeue()')} بتشيل ${D(pq)} من الـ front، يعني اللي دخل الأول (FIFO).`;
        }
      }
      S.push({ s, q, ns, nq, en, ar: a });
    }
    const last = S[S.length - 1];
    if (ops.length === QUIZ.length && ops.every((o, k) => o.t === QUIZ[k].t && o.v === QUIZ[k].v)) {
      last.en += ' The quiz answer: display prints <b>22 50 7</b> for the queue (front to rear); the stack would show 7 15 10 from the top.';
      last.ar += ' إجابة الـ quiz إن الـ display بيطبع للـ queue من الـ front للـ rear:' + L('22 50 7') + 'أما الـ stack فبيبان من الـ top كده:' + L('7 15 10');
    }
    return S;
  }
  function StackVsQueue({ ar }) {
    const [ops, setOps] = useState(QUIZ), [txt, setTxt] = useState('30');
    const S = buildSQ(ops), [i, ctl] = useWalk(S.length, 1800, ops.length + ':' + ops.map(o => o.t + (o.v != null ? o.v : '')).join()), st = S[i];
    const add = o => { const keep = ops.slice(0, i); if (o.t === 'in' && S[i].q.length >= 6) return; const nx = keep.concat(o); setOps(nx); };
    const stk = st.s.map((v, k) => ({ id: 's' + k + ':' + v, v, cls: k === st.ns ? 'new' : '', tags: k === 0 ? [{ t: 'top' }] : [] }));
    const que = st.q.map((v, k) => ({ id: 'q' + k + ':' + v, v, cls: k === st.nq ? 'new' : '', tags: qTags(st.q.length, k) }));
    // after a manual add, show the new last step
    useEffect(() => { if (ops !== QUIZ) ctl.go(ops.length); }, [ops]);
    return html`<figure className="fig dsv7"><div className="fig-stage"><div className="dsv7-pair">
      <div className="dsv7-panel"><b>Linked stack: push / pop at the beginning</b><${Chain} nodes=${stk} nul=${true} empty="top = NULL" /><p className="dsv7-msg">display (top first): ${st.s.join(' ') || '-'}</p></div>
      <div className="dsv7-panel"><b>Linked queue: enqueue at the rear, dequeue at the front</b><${Chain} nodes=${que} nul=${true} empty="front = rear = NULL" /><p className="dsv7-msg">display (front to rear): ${st.q.join(' ') || '-'}</p></div></div>
      <div className="dsv7-row"><span className="dsv7-lbl">value</span><input className="dsv7-in" inputMode="numeric" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="value to insert" />
        <button className="fig-btn solid" onClick=${() => { const v = parseVals(txt)[0]; if (v != null) add({ t: 'in', v }); }}>push / enqueue</button>
        <button className="fig-btn" onClick=${() => add({ t: 'out' })}>pop / dequeue</button></div>
      <div className="dsv7-row"><button className="fig-btn" onClick=${() => setOps(QUIZ)}>Example from the quiz</button><button className="fig-btn" onClick=${() => setOps([])}>Start empty</button></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4] the exam pattern: main with enqueue(30), enqueue(50), removeAll() ── */
  const E_MAIN = ['int main()', '{', '   Queue q;', '   if (q.isEmpty())', '      cout << "Queue is empty" << endl;', '   q.enqueue(A);', '   q.enqueue(B);', '   q.removeAll();', '   return 0;', '}'];
  const E_RA = ['void removeAll()', '{', '   while (!isEmpty())', '      cout << "dequeued "', '           << dequeue() << endl;', '}'];
  const E_DQ = ['int dequeue()', '{', '   if (isEmpty())', '   { cout << "Queue is empty" << endl;', '     return 0; }', '   Node *temp = front;', '   int value = front->data;', '   front = front->next;', '   if (front == NULL) rear = NULL;', '   delete temp;', '   return value;', '}'];
  function buildExam(a, b) {
    const S = [], q = (list, extra) => ({ list, extra: extra || {} });
    S.push({ f: 'main', cur: [2], ...q([]), fr: 'NULL', rr: 'NULL', out: '', en: 'Queue q: the constructor sets front = NULL and rear = NULL.', ar: 'الـ Queue q بيتعمل، والـ constructor بيخلي:' + L('front = NULL, rear = NULL') });
    S.push({ f: 'main', cur: [3, 4], ...q([]), fr: 'NULL', rr: 'NULL', out: 'Queue is empty', en: 'q.isEmpty() is true (front and rear are NULL), so main prints "Queue is empty".', ar: 'الـ ' + D('q.isEmpty()') + ' بترجّع true لأن الـ front والـ rear بـ NULL، فالـ main بتطبع "Queue is empty".' });
    S.push({ f: 'main', cur: [5], ...q([{ v: a, n: 1 }]), fr: a, rr: a, out: 'Queue is empty', en: `q.enqueue(${a}): the queue was empty, so front = rear = the new node ${a}.`, ar: `الـ ${D('q.enqueue(' + a + ')')} والـ queue كان فاضي، فالـ front والـ rear الاتنين بقوا على الـ node الجديدة ${D(a)}.` });
    S.push({ f: 'main', cur: [6], ...q([{ v: a }, { v: b, n: 1 }]), fr: a, rr: b, out: 'Queue is empty', en: `q.enqueue(${b}): rear->next = the new node, then rear = it. Now front → ${a} → ${b} ← rear.`, ar: `الـ ${D('q.enqueue(' + b + ')')} بتخلي الـ next بتاع الـ rear يشاور على الـ node الجديدة، وبعدين الـ rear نفسه يبقى عليها. دلوقتي:` + L(`front → ${a} → ${b} ← rear`) });
    const o1 = 'Queue is empty\ndequeued ' + a, o2 = o1 + '\ndequeued ' + b;
    S.push({ f: 'removeAll', cur: [2], ...q([{ v: a }, { v: b }]), fr: a, rr: b, out: 'Queue is empty', en: 'q.removeAll(): !isEmpty() is true, so the loop body runs and calls dequeue().', ar: 'الـ ' + D('q.removeAll()') + ' بتشيك، والـ queue مش فاضي، فالـ loop بتلف وبتنادي الـ ' + D('dequeue()') + '.' });
    S.push({ f: 'dequeue', cur: [5, 6], ...q([{ v: a, temp: 1 }, { v: b }]), fr: a, rr: b, val: a, out: 'Queue is empty', en: `dequeue(): not empty, so temp = front (node ${a}) and value = ${a}.`, ar: `الـ ${D('dequeue()')} بتلاقي الـ queue مش فاضي، فالـ temp بيشاور على الـ front (الـ node ${D(a)}) والـ value بتبقى ${D(a)}.` });
    S.push({ f: 'dequeue', cur: [7, 8], ...q([{ v: a, temp: 1, gone: 1, off: 1 }, { v: b }]), fr: b, rr: b, val: a, out: 'Queue is empty', en: `front = front->next: front moves to ${b}. front is not NULL, so rear stays on ${b}.`, ar: `الـ ${D('front = front->next')} بيحرّك الـ front لـ ${D(b)}. والـ front مش NULL، فالـ rear فاضل على ${D(b)}.` });
    S.push({ f: 'dequeue', cur: [9, 10], ...q([{ v: b }]), fr: b, rr: b, out: o1, en: `delete temp frees node ${a}; dequeue returns ${a} and removeAll prints "dequeued ${a}".`, ar: `الـ ${D('delete temp')} بيمسح الـ node ${D(a)}، والـ dequeue بترجّع ${D(a)}، والـ removeAll بتطبع "dequeued ${esc(a)}".` });
    S.push({ f: 'dequeue', cur: [5, 6], ...q([{ v: b, temp: 1 }]), fr: b, rr: b, val: b, out: o1, en: `The loop checks again: still not empty, so dequeue() runs: temp = front (node ${b}), value = ${b}.`, ar: `الـ loop بتشيك تاني، ولسه مش فاضي، فالـ ${D('dequeue()')} بتشتغل. الـ temp على الـ front (الـ node ${D(b)}) والـ value بتبقى ${D(b)}.` });
    S.push({ f: 'dequeue', cur: [7, 8], ...q([{ v: b, temp: 1, gone: 1, off: 1 }]), fr: 'NULL', rr: 'NULL', val: b, out: o1, en: 'front = front->next makes front NULL: the queue became empty, so <b>rear = NULL</b> too (the safe line the lecture\'s dequeue was missing).', ar: 'الـ ' + D('front = front->next') + ' بيخلي الـ front بـ NULL، يعني الـ queue فضي، فبنخلي الـ <b>rear</b> كمان بـ NULL (ده السطر الآمن اللي كان ناقص في الـ dequeue بتاع المحاضرة).' });
    S.push({ f: 'dequeue', cur: [9, 10], ...q([]), fr: 'NULL', rr: 'NULL', out: o2, en: `delete temp frees node ${b}; dequeue returns ${b} and removeAll prints "dequeued ${b}".`, ar: `الـ ${D('delete temp')} بيمسح الـ node ${D(b)}، والـ dequeue بترجّع ${D(b)}، والـ removeAll بتطبع "dequeued ${esc(b)}".` });
    S.push({ f: 'main', cur: [7, 8], ...q([]), fr: 'NULL', rr: 'NULL', out: o2, en: 'Back in the loop: isEmpty() is now true (front and rear are both NULL), so removeAll ends and main returns 0.', ar: 'نرجع للـ loop، والـ ' + D('isEmpty()') + ' بقت true لأن الـ front والـ rear الاتنين بـ NULL، فالـ removeAll بتخلص والـ main بترجّع صفر.' });
    return S;
  }
  function ExamTrace({ ar }) {
    const [ab, setAb] = useState([30, 50]), [ta, setTa] = useState('30'), [tb, setTb] = useState('50');
    const [a, b] = ab, S = buildExam(a, b), [i, ctl] = useWalk(S.length, 2300, ab.join()), st = S[i];
    const live = st.list.filter(x => !x.off);
    const nodes = st.list.map((x, k) => { const idx = live.indexOf(x); return { id: k + ':' + x.v, v: x.v, cls: x.gone ? 'gone' : x.n ? 'new' : x.temp ? 'hot' : '', tags: [...(idx === 0 ? [{ t: 'front' }] : []), ...(idx >= 0 && idx === live.length - 1 ? [{ t: 'rear' }] : []), ...(x.temp ? [{ t: 'temp', c: 't2' }] : [])] }; });
    const code = { main: E_MAIN.map(t => t.replace('A', a).replace('B', b)), removeAll: E_RA, dequeue: E_DQ }[st.f];
    const load = (x, y) => { setTa(String(x)); setTb(String(y)); setAb([x, y]); };
    const vars = [[st.fr === 'NULL' ? 'front = NULL' : 'front → ' + st.fr, false], [st.rr === 'NULL' ? 'rear = NULL' : 'rear → ' + st.rr, st.f === 'dequeue' && st.rr === 'NULL' && st.list.length > 0]];
    if (st.val != null) vars.push(['value = ' + st.val, false]);
    return html`<figure className="fig dsv7"><div className="fig-stage">
      <div className="dsv7-modes"><button className="fig-btn" aria-pressed=${a === 30 && b === 50} onClick=${() => load(30, 50)}>30 and 50 (the pattern)</button><button className="fig-btn" aria-pressed=${a === 25 && b === 20} onClick=${() => load(25, 20)}>25 and 20 (Exam 2025/26)</button></div>
      <${Code} title=${st.f + '()'} lines=${code} cur=${st.cur} />
      <${Chain} nodes=${nodes} nul=${true} empty="front = NULL, rear = NULL" />
      <${Vars} list=${vars} />
      <${Out} text=${st.out} />
      <div className="dsv7-row"><span className="dsv7-lbl">Try your own</span><input className="dsv7-in" inputMode="numeric" value=${ta} onChange=${e => setTa(e.target.value)} aria-label="first value" /><input className="dsv7-in" inputMode="numeric" value=${tb} onChange=${e => setTb(e.target.value)} aria-label="second value" />
        <button className="fig-btn" onClick=${() => { const x = parseVals(ta)[0], y = parseVals(tb)[0]; if (x != null && y != null) setAb([x, y]); }}>Run</button></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5] Lab 7: the struct-based dequeue and its three branches ── */
  const LAB = ['void dequeue()', '{', '  if (front == NULL && rear == NULL)', '    cout << "Queue Underflow\\n";', '  else', '  { node *temp;', '    if (front->next != NULL) // >1 item', '    { temp = front;', '      front = front->next;', '      cout << "The deleted element is "', '           << temp->data << endl;', '      delete (temp); }', '    else              // only one item', '    { cout << "The deleted element is "', '           << front->data << endl;', '      front = rear = NULL; }', '  }', '}'];
  function labMsg(ev) {
    if (!ev) return { cur: [], en: 'Lab 7\'s dequeue() on slide 4\'s queue. Press dequeue() to see which branch runs; enqueue adds at the rear.', ar: 'الـ ' + D('dequeue()') + ' بتاعة Lab 7 على الـ queue بتاع slide 4. دوس dequeue عشان تشوف أنهي فرع بيشتغل، والـ enqueue بتضيف عند الـ rear.' };
    if (ev.k === 'under') return { cur: [2, 3], en: 'front and rear are both NULL: "Queue Underflow", nothing to delete.', ar: 'الـ front والـ rear الاتنين بـ NULL، فبيطبع "Queue Underflow" ومفيش حاجة تتمسح.' };
    if (ev.k === 'many') return { cur: [6, 7, 8, 9, 10, 11], en: `front->next != NULL (more than 1 item): temp = front, front moves to ${ev.nx}, prints "The deleted element is ${ev.v}" and deletes temp.`, ar: `الـ next بتاع الـ front مش NULL، يعني فيه أكتر من item. الـ temp بياخد الـ front، والـ front بيتنقل لـ ${D(ev.nx)}، وبيطبع "The deleted element is ${esc(ev.v)}" ويمسح الـ temp.` };
    if (ev.k === 'one') return { cur: [12, 13, 14, 15], en: `front->next == NULL (only one item): prints "The deleted element is ${ev.v}" and sets front = rear = NULL, so the queue is empty again.`, ar: `الـ next بتاع الـ front بـ NULL، يعني فيه item واحد بس. بيطبع "The deleted element is ${esc(ev.v)}" وبيخلي الـ front والـ rear الاتنين بـ NULL، فالـ queue يرجع فاضي.` };
    return { cur: [], en: `enqueue(${ev.v}): ${ev.v} joins at the rear.`, ar: `الـ ${D('enqueue(' + ev.v + ')')} بتضيف ${D(ev.v)} عند الـ rear.` };
  }
  function LabDequeue({ ar }) {
    const [q, setQ] = useState([10, 15, 22, 50]), [ev, setEv] = useState(null), [log, setLog] = useState([]), [txt, setTxt] = useState('7');
    const deq = () => {
      if (!q.length) { setEv({ k: 'under' }); setLog(log.concat('Queue Underflow').slice(-4)); return; }
      const v = q[0]; setEv(q.length > 1 ? { k: 'many', v, nx: q[1] } : { k: 'one', v }); setQ(q.slice(1)); setLog(log.concat('The deleted element is ' + v).slice(-4));
    };
    const enq = () => { const v = parseVals(txt)[0]; if (v == null || q.length >= 6) return; setQ(q.concat(v)); setEv({ k: 'in', v }); };
    const m = labMsg(ev);
    const nodes = q.map((v, k) => ({ id: k + ':' + v, v, cls: ev && ev.k === 'in' && k === q.length - 1 ? 'new' : '', tags: qTags(q.length, k) }));
    return html`<figure className="fig dsv7"><div className="fig-stage">
      <${Code} lines=${LAB} cur=${m.cur} />
      <${Chain} nodes=${nodes} nul=${true} empty="front = rear = NULL" />
      <${Out} text=${log.join('\n')} />
      <div className="dsv7-row"><button className="fig-btn solid" onClick=${deq}>dequeue()</button>
        <input className="dsv7-in" inputMode="numeric" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="value to enqueue" /><button className="fig-btn" onClick=${enq} disabled=${q.length >= 6}>enqueue</button>
        <button className="fig-btn" onClick=${() => { setQ([10, 15, 22, 50]); setEv(null); setLog([]); }}>↻ Reset</button></div></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /></figure>`;
  }

  // step builders kept on the components so the Arabic built at run time can be checked
  Object.assign(SlideFig, { build: buildSlideFig }); Object.assign(FixedVsLinked, { build: fixedMsg }); Object.assign(DisplaySteps, { build: buildDisplay });
  Object.assign(Funcs, { build: buildFn }); Object.assign(StackVsQueue, { build: buildSQ, QUIZ }); Object.assign(ExamTrace, { build: buildExam }); Object.assign(LabDequeue, { build: labMsg });
  window.FIGS = Object.assign(window.FIGS || {}, { 'ds-l7-slide-fig': SlideFig, 'ds-l7-fixed-vs-linked': FixedVsLinked, 'ds-l7-creation': Creation, 'ds-l7-display-steps': DisplaySteps, 'ds-l7-funcs': Funcs, 'ds-l7-stack-vs-queue': StackVsQueue, 'ds-l7-exam-trace': ExamTrace, 'ds-l7-lab-dequeue': LabDequeue });
})();
/* ── part L5 ── */
// Data Structures visuals, Lecture 5 (Linked Lists): the node and chain of slides 2–3, the scattered memory of slides 4–7, the three types of slides 9–11, linear access, the Node/Linkedlist classes of slides 14–17, the pictures of slides 19, 21–22, 27 and 29 with what goes wrong if the two link steps are swapped, search/count/get/update traced, and Lab 5's InsertAt. Every label and number comes from the site's notes and the slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm } = window.FIGKIT;
  const CSS = `
.dsv5 *{ font-variant-ligatures:none; }
.dsv5 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dsv5 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv5-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dsv5-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dsv5-row{ display:flex; flex-wrap:wrap; gap:6px 8px; justify-content:center; align-items:center; margin:8px 0 0; }
.dsv5-svg{ display:block; width:100%; max-width:430px; height:auto; margin:0 auto; overflow:visible; }
.dsv5 svg text{ font-family:var(--body); font-size:14px; dominant-baseline:central; }
.dsv5 svg text.m{ text-anchor:middle; } .dsv5 svg text.e{ text-anchor:end; }
.dsv5 svg text.lb{ font-weight:700; }
.dsv5 svg text.v{ font:700 14px var(--mono); text-anchor:middle; }
.dsv5 svg text.k{ fill:var(--fig-k); } .dsv5 svg text.p{ fill:var(--pen); } .dsv5 svg text.g{ fill:var(--graphite); }
.dsv5 svg text.x{ font:700 18px var(--body); fill:var(--pen); text-anchor:middle; }
.dsv5-f{ transition:opacity .45s; } .dsv5-f.off{ opacity:0; } .dsv5-f.dim{ opacity:.3; }
.dsv5-a path{ fill:none; stroke:var(--ink); stroke-width:1.7; transition:stroke .35s; }
.dsv5-a polygon{ fill:var(--ink); transition:fill .35s; }
.dsv5-a.k path{ stroke:var(--fig-k); stroke-width:2.4; } .dsv5-a.k polygon{ fill:var(--fig-k); }
.dsv5-a.p path{ stroke:var(--pen); stroke-width:2.4; } .dsv5-a.p polygon{ fill:var(--pen); }
.dsv5-a.ok path{ stroke:var(--ok); stroke-width:2.4; } .dsv5-a.ok polygon{ fill:var(--ok); }
.dsv5-a.dash path{ stroke-dasharray:5 4; }
.dsv5-sn rect{ fill:var(--paper); stroke:var(--ink); stroke-width:1.5; transition:fill .35s, stroke .35s; }
.dsv5-sn.hot rect{ stroke:var(--fig-k); stroke-width:3; }
.dsv5-sn.new rect{ fill:color-mix(in srgb, var(--fig-k) 26%, var(--paper)); }
.dsv5-sn.bad rect{ stroke:var(--pen); stroke-width:2.5; }
.dsv5-sq{ stroke:var(--ink); stroke-width:1.2; transition:stroke .35s, opacity .45s; }
.dsv5-sq.hot{ stroke:var(--fig-k); stroke-width:3.5; } .dsv5-sq.bad{ stroke:var(--pen); stroke-width:3; }
.dsv5-ell{ fill:none; stroke:var(--ok); stroke-width:1.5; stroke-dasharray:4 3; }
.dsv5-dot{ fill:var(--ink); }
.dsv5-order{ font:600 .82rem/1.45 var(--mono); color:var(--ink); text-align:center; margin:6px 0 0; overflow-wrap:anywhere; direction:ltr; }
.dsv5-order .n{ color:var(--pen); }
.dsv5-legend{ font-size:.8rem; color:var(--graphite); text-align:center; margin:0 0 6px; }
.dsv5-legend b{ color:var(--fig-k); font-family:var(--mono); }
.dsv5-code{ margin:0 auto 8px; max-width:420px; padding:6px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); font:.75rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv5-code span{ display:block; border-radius:3px; padding:0 3px; transition:background .3s; }
.dsv5-code span.cur{ background:color-mix(in srgb, var(--fig-k) 26%, transparent); }
.dsv5-code small{ display:block; font:600 .75rem var(--body); color:var(--graphite); margin-bottom:2px; }
.dsv5-out{ max-width:420px; margin:8px auto 0; padding:6px 10px; border:1px solid var(--line); border-left:4px solid var(--fig-k); border-radius:6px; background:var(--paper); font:600 .8rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; min-height:1.5em; text-align:left; direction:ltr; }
.dsv5-out .y{ color:var(--ok); } .dsv5-out .n{ color:var(--pen); }
.dsv5-chain{ display:flex; flex-wrap:wrap; align-items:flex-start; justify-content:center; gap:4px 0; margin:4px auto; max-width:440px; color:var(--ink); direction:ltr; }
.dsv5-unit{ display:inline-flex; align-items:flex-start; }
.dsv5-hd{ font:700 .8rem/30px var(--body); color:var(--fig-k); padding-right:2px; }
.dsv5-ar{ font:700 .9rem/30px var(--body); color:var(--ink); width:18px; text-align:center; }
.dsv5-nd{ display:inline-grid; grid-template-columns:auto 15px; }
.dsv5-dv{ min-width:30px; height:30px; box-sizing:border-box; display:grid; place-items:center; padding:0 3px; border:1.5px solid var(--ink); border-right-width:1px; border-radius:5px 0 0 5px; background:var(--paper); font:700 .85rem var(--mono); transition:background .35s, box-shadow .35s, opacity .35s; }
.dsv5-pv{ height:30px; box-sizing:border-box; border:1.5px solid var(--ink); border-left:0; border-radius:0 5px 5px 0; background:var(--paper); display:grid; place-items:center; }
.dsv5-pv::after{ content:""; width:5px; height:5px; border-radius:50%; background:var(--ink); }
.dsv5-dv.hot{ box-shadow:0 0 0 3px var(--fig-k); }
.dsv5-dv.new{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); }
.dsv5-dv.ok{ box-shadow:0 0 0 3px var(--ok); }
.dsv5-mk{ grid-column:1 / -1; font:700 .75rem/1.3 var(--mono); color:var(--fig-k); text-align:center; min-height:1.3em; white-space:nowrap; }
.dsv5-null{ display:inline-flex; flex-direction:column; align-items:center; font:700 .8rem/30px var(--mono); color:var(--graphite); }
.dsv5-null .dsv5-mk{ line-height:1.3; }
.dsv5-null.hot{ color:var(--fig-k); }
.dsv5-tmp{ display:flex; justify-content:center; align-items:flex-start; gap:2px; min-height:46px; font:700 .8rem/30px var(--body); color:var(--graphite); flex-wrap:wrap; direction:ltr; }
.dsv5-tmp .t{ font-family:var(--mono); color:var(--pen); line-height:30px; }
.dsv5-arr{ display:flex; justify-content:center; gap:3px; margin:2px 0 8px; direction:ltr; }
.dsv5-ac{ display:flex; flex-direction:column; align-items:center; }
.dsv5-ac .dsv5-dv{ border-radius:5px; border-right-width:1.5px; }
.dsv5-ix{ font:.75rem/1.3 var(--mono); color:var(--graphite); }
.dsv5-cap{ font-size:.8rem; font-weight:700; color:var(--graphite); text-align:center; margin:6px 0 2px; }
.dsv5-in{ font:.9rem var(--mono); width:64px; padding:4px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:32px; box-sizing:border-box; }
.dsv5-in.wide{ width:120px; }
.dsv5-lbl{ display:inline-flex; align-items:center; gap:4px; font-size:.82rem; color:var(--ink); }
.dsv5-step{ display:inline-flex; align-items:center; gap:4px; font-size:.82rem; color:var(--ink); }
.dsv5-step .fig-btn{ min-width:32px; padding:2px 8px; }
.dsv5-step b{ font-family:var(--mono); min-width:1.4em; text-align:center; }
.dsv5-err{ color:var(--pen); font-weight:700; font-size:.82rem; text-align:center; margin:6px 0 0; }
.dsv5-var{ display:flex; justify-content:center; align-items:center; gap:6px; flex-wrap:wrap; margin:4px 0; font:700 .82rem var(--mono); color:var(--ink); direction:ltr; }
.dsv5-var .box{ border:1.5px solid var(--ink); border-radius:5px; padding:4px 8px; background:var(--paper); min-width:44px; text-align:center; }
.dsv5-var .nm{ color:var(--fig-k); }
.dsv5-fld{ display:inline-grid; grid-template-columns:auto auto; }
.dsv5-fld span{ border:1.5px solid var(--fig-k); padding:3px 8px; text-align:center; background:var(--paper); }
.dsv5-fld span:first-child{ border-right-width:0; border-radius:5px 0 0 5px; } .dsv5-fld span:last-child{ border-radius:0 5px 5px 0; }
.dsv5-fld i{ display:block; font:italic 700 .75rem var(--body); color:var(--pen); }
.dsv5-show{ transition:opacity .45s, transform .45s; } .dsv5-show.off{ opacity:0; transform:translateY(6px); }
@media (prefers-reduced-motion: reduce){ .dsv5-f, .dsv5-a path, .dsv5-a polygon, .dsv5-sn rect, .dsv5-sq, .dsv5-dv, .dsv5-code span, .dsv5-show{ transition:none; } }`;
  if (!document.getElementById('dsv5-css')) { const s = document.createElement('style'); s.id = 'dsv5-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* helpers */
  const L = s => `<span class="ltr">${s}</span>`;
  const D = s => `<bdi dir="ltr">${String(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
  const Code = ({ title, lines, cur }) => html`<div className="dsv5-code">${title && html`<small>${title}</small>`}${lines.map((t, k) => html`<span key=${k} className=${(cur || []).includes(k) ? 'cur' : ''}>${t || ' '}</span>`)}</div>`;
  // SVG arrow: path d, ending at e, arriving from the direction of p
  const r1 = v => Math.round(v * 10) / 10;
  function Arr({ d, e, p, c, on }) {
    const dx = e[0] - p[0], dy = e[1] - p[1], l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l, bx = e[0] - ux * 8, by = e[1] - uy * 8;
    return html`<g className=${'dsv5-a dsv5-f ' + (c || '') + (on === false ? ' off' : '')}><path d=${d} /><polygon points=${`${r1(e[0])},${r1(e[1])} ${r1(bx - uy * 4.2)},${r1(by + ux * 4.2)} ${r1(bx + uy * 4.2)},${r1(by - ux * 4.2)}`} /></g>`;
  }
  const Ln = (x1, y1, x2, y2, c, on) => html`<${Arr} d=${`M${x1} ${y1} L${x2} ${y2}`} e=${[x2, y2]} p=${[x1, y1]} c=${c} on=${on} />`;
  // SVG node: data cell + pointer cell
  const SN = ({ x, y, v, w1 = 30, w2 = 22, h = 26, c, on, dot }) => html`<g className=${'dsv5-sn dsv5-f ' + (c || '') + (on === false ? ' off' : '')}>
    <rect x=${x} y=${y} width=${w1} height=${h} /><rect x=${x + w1} y=${y} width=${w2} height=${h} />
    ${v != null && html`<text className="v" x=${x + w1 / 2} y=${y + h / 2}>${v}</text>`}${dot && html`<circle className="dsv5-dot" cx=${x + w1 + w2 / 2} cy=${y + h / 2} r="2.6" />`}</g>`;
  // HTML chain: head → [v|•] → … → NULL, with pointer names under nodes
  const Chain = ({ vals, marks = {}, cls = {}, nul, noHead }) => html`<div className="dsv5-chain">
    ${!noHead && html`<span className="dsv5-hd">head</span><span className="dsv5-ar">→</span>`}
    ${vals.map((v, k) => html`<span key=${k} className="dsv5-unit"><span className="dsv5-nd"><span className=${'dsv5-dv ' + (cls[k] || '')}>${v}</span><span className="dsv5-pv"></span><span className="dsv5-mk">${marks[k] || ''}</span></span><span className="dsv5-ar">→</span></span>`)}
    <span className=${'dsv5-null ' + (nul || '')}>NULL<span className="dsv5-mk">${marks.N || ''}</span></span></div>`;
  const parseList = s => { const t = String(s).trim(); if (!t) return []; const a = t.split(/[\s,]+/).map(Number); return a.every(n => Number.isInteger(n) && Math.abs(n) < 1000) ? a : null; };

  /* ── [0.0]–[0.2] slides 2–3: node, chain, NULL, head, tail ── */
  function L5NodeChain({ ar }) {
    const steps = [
      { en: 'One <b>node</b> has two fields: <b>data</b> (the value) and <b>next</b> (a pointer that stores the address of the next node).', ar: 'الـ <b>node</b> الواحدة فيها field-ين: الـ <b>data</b> (القيمة) والـ <b>next</b> (pointer بيخزن الـ address بتاع الـ node اللي بعدها).' },
      { en: 'A linked list is a <b>series of connected nodes</b>: each next field leads to the following node.', ar: 'الـ linked list عبارة عن <b>سلسلة nodes متوصلة ببعض</b>، وكل next بيوصّلك للـ node اللي بعدها.' },
      { en: 'The <b>last node contains NULL</b> in its second field, because it points to no node.', ar: 'آخر node فيها <b>NULL</b> في الـ field التاني، لأنها مش بتشاور على أي node.' },
      { en: 'The list is accessed through the <b>head</b>, which points to the first node.', ar: 'بنوصل للـ list عن طريق الـ <b>head</b>، اللي بيشاور على أول node.' },
      { en: 'The last node (the one pointing to NULL) is the <b>tail</b>. The list grows and shrinks by adding or removing nodes and changing links.', ar: 'آخر node (اللي بتشاور على NULL) اسمها الـ <b>tail</b>. والـ list بتكبر وتصغر لما نضيف أو نشيل nodes ونغيّر الـ links.' }
    ];
    const [i, ctl] = useWalk(steps.length, 2600, 0);
    const X = [6, 90, 174], Y = 56, W1 = 34, W2 = 32, H = 28, cy = Y + H / 2;
    return html`<figure className="fig dsv5"><div className="fig-stage">
      <svg className="dsv5-svg" viewBox="0 0 300 150" role="img" aria-label="head, three nodes with data and next fields, NULL">
        ${X.map((x, k) => html`<g key=${k} className=${'dsv5-f' + (k > 0 && i < 1 ? ' off' : '')}>
          <ellipse className="dsv5-ell" cx=${x + 33} cy=${cy} rx="38" ry="25" />
          <rect className="dsv5-sq" x=${x} y=${Y} width=${W1} height=${H} style=${{ fill: 'color-mix(in srgb, var(--ok) 22%, var(--paper))' }} />
          <rect className="dsv5-sq" x=${x + W1} y=${Y} width=${W2} height=${H} style=${{ fill: 'color-mix(in srgb, var(--ok) 22%, var(--paper))' }} />
          <text className="m" x=${x + W1 / 2} y=${cy}>data</text><text className="m" x=${x + W1 + W2 / 2} y=${cy}>next</text>
          ${Ln(x + 33, 121, x + 33, 98, 'ok')}<text className="m lb" x=${x + 33} y="136">Node</text>
          ${k < 2 && Ln(x + 66, cy, X[k + 1], cy, '', i >= 1)}</g>`)}
        ${Ln(240, cy, 256, cy, '', i >= 2)}<text className=${'lb dsv5-f' + (i >= 2 ? '' : ' off')} x="258" y=${cy}>NULL</text>
        <text className=${'m lb k dsv5-f' + (i >= 3 ? '' : ' off')} x="39" y="14">head</text>${Ln(39, 22, 39, Y - 1, 'k', i >= 3)}
        <text className=${'m lb dsv5-f' + (i >= 4 ? '' : ' off')} x="207" y="14">tail</text>${Ln(207, 22, 207, Y - 1, '', i >= 4)}
      </svg></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${SBar} n=${steps.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.3] slides 4–7: scattered through memory; add 5, delete 5 by changing links ── */
  function L5Scatter({ ar }) {
    const steps = [
      { o: [1, 2, 3, 4], en: 'Slide 4: the nodes 1, 2, 3, 4 are <b>scattered randomly through memory</b>, not side by side. Only the links give the order.', ar: 'ده slide 4: الـ nodes اللي فيها 1 و2 و3 و4 <b>متفرقة عشوائي في الـ memory</b>، مش ورا بعض. الـ links بس هي اللي بتحدد الترتيب.' },
      { o: [1, 2, 3, 4], en: 'Slide 5, <b>easy to add</b>: node 5 is created anywhere in memory and first points to 3.', ar: 'ده slide 5، <b>الإضافة سهلة</b>: الـ node اللي فيها 5 بتتعمل في أي مكان في الـ memory، وأول حاجة بتشاور على 3.' },
      { o: [1, 2, 3, 4], en: 'Then 2\'s link is changed to point to 5 (the old link 2 → 3 is replaced). No node moves.', ar: 'وبعدين بنغيّر الـ link بتاع 2 يشاور على 5 بدل 3. ومفيش ولا node بتتحرك من مكانها.' },
      { o: [1, 2, 5, 3, 4], en: 'Slide 6: the order is now 1, 2, 5, 3, 4, only by changing links.', ar: 'ده slide 6: الترتيب بقى 1 و2 و5 و3 و4، بتغيير الـ links بس.' },
      { o: [1, 2, 3, 4], en: 'Slide 7, <b>easy to delete</b>: 2 links straight to 3 again, so 5 is no longer in the list.', ar: 'ده slide 7، <b>المسح سهل</b>: الـ 2 بيرجع يشاور على 3 على طول، فالـ 5 خرجت من الـ list.' }
    ];
    const [i, ctl] = useWalk(steps.length, 2600, 0);
    const P = { 1: [48, 16], 4: [150, 16], 3: [236, 76], 2: [100, 172], 5: [146, 98] };
    const node = k => html`<${SN} key=${k} x=${P[k][0]} y=${P[k][1]} w1=${30} w2=${24} v=${k} c=${k === 5 && i >= 1 && i <= 3 ? 'new' : ''} on=${k !== 5 || (i >= 1 && i <= 3)} />`;
    return html`<figure className="fig dsv5"><div className="fig-stage">
      <svg className="dsv5-svg" viewBox="0 0 300 206" role="img" aria-label="Nodes 1 to 4 scattered in memory, node 5 added then deleted">
        <text className="lb p" x="2" y="29">head</text>${Ln(38, 29, 48, 29, 'p')}
        ${Ln(90, 29, 112, 172)}
        ${Ln(142, 185, 240, 102, i === 2 ? 'dash' : i === 4 ? 'k' : '', i === 0 || i === 2 || i === 4)}
        ${Ln(142, 185, 160, 124, 'k', i >= 2 && i <= 3)}
        ${Ln(188, 111, 236, 92, 'k', i >= 1 && i <= 3)}
        ${Ln(278, 89, 190, 42)}
        ${Ln(204, 29, 220, 29)}<text className="lb g" x="222" y="29">NULL</text>
        ${[1, 2, 3, 4, 5].map(node)}
      </svg>
      <p className="dsv5-order">head → ${steps[i].o.join(' → ')} → NULL</p></div>
      <${Cap} en=${steps[i].en} ar=${steps[i].ar} showAr=${ar} /><${SBar} n=${steps.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1] slides 9–11: singly, doubly, circular, with a traversal ── */
  const TY = {
    s: { name: 'Singly linked list', en: 'Each node references the <b>next</b> node only: traversal goes <b>forward</b> only.', ar: 'كل node بتشاور على الـ <b>next</b> بس، فالـ traversal بيمشي <b>لقدّام</b> بس.' },
    d: { name: 'Doubly linked list', en: 'Each node references both the <b>next</b> and the <b>previous</b> node: traversal goes forward and backward, but the backward reference costs extra memory.', ar: 'كل node بتشاور على الـ <b>next</b> وعلى الـ <b>previous</b>، فالـ traversal بيمشي لقدّام ولورا، بس الـ reference اللي لورا بياخد memory زيادة.' },
    c: { name: 'Circular linked list', en: 'The <b>last node points back to the head node</b>, making a circle (it can be singly or doubly linked; this one is singly).', ar: 'آخر node <b>بترجع تشاور على أول node</b> فبتعمل دايرة (ممكن تبقى singly أو doubly، واللي هنا singly).' }
  };
  function L5Types({ ar }) {
    const [t, setT] = useState('s'), [run, setRun] = useState(null), [k, setK] = useState(0);
    const seq = run === 'f' ? (t === 'c' ? [0, 1, 2, 0, 1, 2, 0] : [0, 1, 2, 'N']) : run === 'b' ? [2, 1, 0, 'P'] : [];
    useEffect(() => { if (!run || run === 'x') return; if (calm()) { setK(seq.length - 1); return; } if (k >= seq.length - 1) return; const tm = setTimeout(() => setK(k + 1), 900); return () => clearTimeout(tm); }, [run, k, t]);
    const go = r => { if (r === 'b' && t !== 'd') { setRun('x'); setK(0); return; } setRun(r); setK(0); };
    const pick = v => { setT(v); setRun(null); setK(0); };
    const cur = seq.length ? seq[Math.min(k, seq.length - 1)] : null, done = seq.length && k >= seq.length - 1;
    const vis = seq.slice(0, k + 1).filter(x => typeof x === 'number').map(x => [10, 20, 30][x]);
    const d = t === 'd', Y = 52, H = 26;
    const X = d ? [8, 111, 214] : [14, 114, 214], W = d ? 70 : 54;
    let msg = { en: TY[t].en, ar: TY[t].ar };
    if (run === 'x') msg = { en: TY[t].en + ' <b>Backward is not possible</b>: a node has no reference to the previous one.', ar: TY[t].ar + ' <b>الرجوع لورا مش ممكن</b> لأن الـ node مفيهاش reference للي قبلها.' };
    else if (run && done) {
      const seen = vis.join(' → ');
      if (run === 'f' && t === 'c') msg = { en: 'Forward: ' + seen + ' … the last node\'s next leads back to the head, so a traversal never meets NULL: it stops when it is back at the head.', ar: 'لقدّام بالترتيب ده:' + L(seen + ' …') + 'الـ next بتاع آخر node بيرجّعك للـ head، فالـ traversal عمره ما يقابل NULL، وبيقف لما يرجع للـ head.' };
      else if (run === 'f') msg = { en: 'Forward from the head: ' + seen + ', then next is NULL: the end.', ar: 'لقدّام من الـ head بالترتيب ده:' + L(seen) + 'وبعدها الـ next بقى NULL، يعني خلصنا.' };
      else msg = { en: 'Backward from the last node using prev: ' + seen + ', then prev is NULL: the start.', ar: 'لورا من آخر node باستخدام الـ prev بالترتيب ده:' + L(seen) + 'وبعدها الـ prev بقى NULL، يعني وصلنا للأول.' };
    }
    const hot = j => cur === j ? 'hot' : '';
    return html`<figure className="fig dsv5"><div className="fig-stage">
      <div className="dsv5-modes">${['s', 'd', 'c'].map(v => html`<button key=${v} className="fig-btn" aria-pressed=${String(t === v)} onClick=${() => pick(v)}>${TY[v].name.replace(' linked list', '')}</button>`)}</div>
      <p className="dsv5-legend">${TY[t].name}: each box is <b>${d ? 'prev | data | next' : 'data | next'}</b></p>
      <svg className="dsv5-svg" viewBox="0 0 300 126" role="img" aria-label=${TY[t].name}>
        <text className="m lb k" x=${X[0] + (d ? 35 : 27)} y="12">head</text>${Ln(X[0] + (d ? 35 : 27), 19, X[0] + (d ? 35 : 27), Y - 1, 'k')}
        ${X.map((x, j) => d ? html`<g key=${j} className=${'dsv5-sn ' + hot(j)}><rect x=${x} y=${Y} width="18" height=${H} /><rect x=${x + 18} y=${Y} width="34" height=${H} /><rect x=${x + 52} y=${Y} width="18" height=${H} />
            <circle className="dsv5-dot" cx=${x + 9} cy=${Y + 13} r="2.6" /><text className="v" x=${x + 35} y=${Y + 13}>${[10, 20, 30][j]}</text><circle className="dsv5-dot" cx=${x + 61} cy=${Y + 13} r="2.6" /></g>`
          : html`<${SN} key=${j} x=${x} y=${Y} w1=${34} w2=${20} v=${[10, 20, 30][j]} dot=${true} c=${hot(j)} />`)}
        ${[0, 1].map(j => d ? html`<g key=${'l' + j}>${Ln(X[j] + W - 9, Y + 7, X[j + 1], Y + 7)}${Ln(X[j + 1] + 9, Y + 19, X[j] + W, Y + 19)}</g>` : html`<g key=${'l' + j}>${Ln(X[j] + 44, Y + 13, X[j + 1], Y + 13)}</g>`)}
        ${t === 'c' ? html`<${Arr} d=${`M258 ${Y + 13} H272 V104 H4 V${Y + 13} H14`} e=${[14, Y + 13]} p=${[4, Y + 13]} c=${cur === 0 && k > 0 ? 'k' : ''} />`
          : html`<g>${Ln(X[2] + W - 9, Y + 13, X[2] + W - 9, 92)}<text className=${'m lb ' + (cur === 'N' ? 'k' : 'g')} x=${d ? 268 : 259} y="104">NULL</text>
            ${d && html`<g>${Ln(X[0] + 9, Y + 13, X[0] + 9, 92)}<text className=${'m lb ' + (cur === 'P' ? 'k' : 'g')} x="26" y="104">NULL</text></g>`}</g>`}
        ${typeof cur === 'number' && html`<text className="m lb k" x=${X[cur] + W / 2} y="120">temp</text>`}
      </svg>
      <div className="dsv5-row"><button className="fig-btn" onClick=${() => go('f')}>traverse forward</button><button className="fig-btn" onClick=${() => go('b')}>traverse backward</button></div></div>
      <${Cap} en=${msg.en} ar=${msg.ar} showAr=${ar} /></figure>`;
  }

  /* ── [2.1] linear access vs direct access by index ── */
  const ACC = [5, 20, 10, 30];
  function L5Access({ ar }) {
    const [k, setK] = useState(3), [h, setH] = useState(calm() ? 3 : 0);
    useEffect(() => { if (calm() || h >= k) return; const t = setTimeout(() => setH(h + 1), 800); return () => clearTimeout(t); }, [h, k]);
    const pick = v => { setK(v); setH(calm() ? v : 0); };
    const marks = { [Math.min(h, k)]: 'temp' }, cls = { [Math.min(h, k)]: h >= k ? 'ok' : 'hot' };
    const en = `Element number ${k + 1}: the array reads <b>a[${k}]</b> directly in one step. The list starts at head and follows next ${k} time${k === 1 ? '' : 's'} (${h >= k ? 'done' : h + ' so far'}). For the 500th element: a[499] directly, but 499 hops in a list. Also every node stores a next pointer next to its data (extra memory).`;
    const arT = `العنصر رقم ${D(k + 1)}: الـ array بيقرا ${D('a[' + k + ']')} على طول في خطوة واحدة. أما الـ list فبتبدأ من الـ head وتمشي ورا الـ next عدد مرات قدّه ${D(k)} (${h >= k ? 'خلصت' : 'لحد دلوقتي ' + D(h)}). ولو عايز العنصر رقم 500 فالـ array بيقرا ${D('a[499]')} على طول، والـ list محتاجة 499 خطوة. وكمان كل node بتخزن pointer اسمه next جنب الـ data، وده memory زيادة.`;
    return html`<figure className="fig dsv5"><div className="fig-stage">
      <p className="dsv5-cap">array: direct access by index</p>
      <div className="dsv5-arr">${ACC.map((v, j) => html`<div key=${j} className="dsv5-ac"><span className="dsv5-ix">${j}</span><span className=${'dsv5-dv' + (j === k ? ' ok' : '')}>${v}</span></div>`)}</div>
      <p className="dsv5-cap">linked list: traversal from head</p>
      <${Chain} vals=${ACC} marks=${marks} cls=${cls} />
      <div className="dsv5-row">${ACC.map((_, j) => html`<button key=${j} className="fig-btn" aria-pressed=${String(j === k)} onClick=${() => pick(j)}>#${j + 1}</button>`)}</div></div>
      <${Cap} en=${en} ar=${arT} showAr=${ar} /></figure>`;
  }

  /* ── [3] slides 14–17: Linkedlist(), isEmpty, isFull and the new node ── */
  function L5Classes({ ar }) {
    const main = ['Linkedlist list;', 'list.isEmpty();', 'list.isFull();'];
    const steps = [
      { m: 0, run: 'Linkedlist() { head = NULL; }', en: '<b>Linkedlist list;</b> runs the constructor: <b>head = NULL</b>. The list is empty.', ar: 'السطر ده بيشغّل الـ constructor، فالـ head بيبقى NULL والـ list فاضية:' + L('Linkedlist list; → head = NULL') },
      { m: 1, run: 'if (head == NULL) return true;', out: 'true', en: '<b>isEmpty()</b> checks head == NULL: true, so it returns <b>true</b>.', ar: 'الـ <bdi dir="ltr">isEmpty()</bdi> بتشيك على الشرط ده ولقيته true، فبترجّع <b>true</b>:' + L('head == NULL') },
      { m: 2, nn: true, run: 'Node *newnode = new Node();', en: '<b>isFull()</b> tries <b>new Node()</b>. The Node() constructor sets <b>data = 0</b> and <b>next = NULL</b> (slide 14 calls the two fields element and next).', ar: 'الـ <bdi dir="ltr">isFull()</bdi> بتجرّب تعمل <bdi dir="ltr">new&nbsp;Node()</bdi>. والـ constructor بتاع الـ Node بيخلي الـ data بصفر والـ next بـ NULL (في slide 14 اسم الـ field-ين element و next).' },
      { m: 2, nn: true, run: 'if (newnode == NULL) return true; else return false;', out: 'false', en: 'new found memory, so newnode is not NULL: isFull returns <b>false</b>. A linked list is full only when new cannot allocate memory.', ar: 'الـ new لقت memory، فالـ newnode مش NULL والـ isFull بترجّع <b>false</b>. الـ linked list مش بتبقى full غير لما الـ new متلاقيش memory تحجزها.' }
    ];
    const [i, ctl] = useWalk(steps.length, 2800, 0), s = steps[i];
    return html`<figure className="fig dsv5"><div className="fig-stage">
      <${Code} title="main" lines=${main} cur=${[s.m]} />
      <div className="dsv5-var"><span className="nm">head</span><span className="box">NULL</span></div>
      <div className=${'dsv5-var dsv5-show' + (s.nn ? '' : ' off')}><span className="nm">newnode</span><span>→</span>
        <span className="dsv5-fld"><span><i>element</i>data = 0</span><span><i>next</i>NULL</span></span></div>
      <div className="dsv5-out">runs: ${s.run}${s.out ? '\nreturns ' : ''}${s.out && html`<span className=${s.out === 'true' ? 'y' : 'n'}>${s.out}</span>`}</div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${steps.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4] slide 19: insert E at the beginning, and the wrong order ── */
  function L5FrontInsert({ ar }) {
    const [wrong, setWrong] = useState(false);
    const R = [
      { hd: 'A', en: 'Slide 19: head → A → B → C → D → NULL, and a new node <b>E</b> (newnode->data = item).', ar: 'ده رسم slide 19: الـ list فيها A وB وC وD والـ head بيشاور على A، وعندنا node جديدة فيها <b>E</b>.' },
      { hd: 'A', eA: true, en: 'Step 1: <b>newnode->next = head;</b> E now points at the old first node A.', ar: 'الخطوة الأولى خلّت E تشاور على أول node قديمة اللي هي A:' + L('newnode-&gt;next = head;') },
      { hd: 'E', eA: true, x: true, en: 'Step 2: <b>head = newnode;</b> the old head link to A is crossed out; head points at E.', ar: 'الخطوة التانية شالت الـ link القديم من الـ head لـ A، وخلّت الـ head يشاور على E:' + L('head = newnode;') },
      { hd: 'E', eA: true, o: 'E A B C D', en: 'Done: head → E → A → B → C → D → NULL. Nothing was lost.', ar: 'خلصنا والترتيب بقى زي ما تحت، ومفيش حاجة ضاعت.' }
    ];
    const W = [
      R[0],
      { hd: 'E', lost: true, en: 'Wrong order, <b>head = newnode;</b> first: head points at E, and <b>nothing points to A any more</b>.', ar: 'لو عملنا الخطوة دي الأول، الـ head هيشاور على E و<b>مفيش حاجة بقت بتشاور على A</b>:' + L('head = newnode;') },
      { hd: 'E', self: true, lost: true, o: 'E E E …', en: 'Then <b>newnode->next = head;</b> head is already E, so E points to itself. A, B, C, D are lost.', ar: 'وبعدها الـ head أصلًا بقى E، فالـ E بتشاور على نفسها، والـ A وB وC وD ضاعوا:' + L('newnode-&gt;next = head;') }
    ];
    const S = wrong ? W : R, [i, ctl] = useWalk(S.length, 2600, wrong), s = S[i];
    const X = [18, 78, 138, 198], Y = 40;
    return html`<figure className="fig dsv5"><div className="fig-stage">
      <div className="dsv5-modes"><button className="fig-btn" aria-pressed=${String(!wrong)} onClick=${() => setWrong(false)}>slide's order</button><button className="fig-btn" aria-pressed=${String(wrong)} onClick=${() => setWrong(true)}>steps swapped</button></div>
      <svg className="dsv5-svg" viewBox="0 0 300 150" role="img" aria-label="Insert E at the beginning of A, B, C, D">
        <text className="m lb k" x="41" y="10">head</text>
        ${Ln(41, 17, 41, Y - 1, s.x ? 'p dash' : 'k', s.hd === 'A' || !!s.x)}${s.x && html`<text className="x" x="52" y="27">X</text>`}
        <${Arr} d=${`M21 10 H6 V${Y + 73} H18`} e=${[18, Y + 73]} p=${[6, Y + 73]} c="k" on=${s.hd === 'E'} />
        <g className=${'dsv5-f' + (s.lost ? ' dim' : '')}>
          ${X.map((x, j) => html`<${SN} key=${j} x=${x} y=${Y} w1=${28} w2=${18} v=${'ABCD'[j]} dot=${true} />`)}
          ${[0, 1, 2].map(j => html`<g key=${'l' + j}>${Ln(X[j] + 46, Y + 13, X[j + 1], Y + 13)}</g>`)}
          ${Ln(244, Y + 13, 258, Y + 13)}<text className="lb g" x="260" y=${Y + 13}>NULL</text></g>
        ${s.lost && html`<text className="m lb p" x="150" y="86">A, B, C, D lost</text>`}
        <${SN} x=${18} y=${Y + 60} w1=${28} w2=${18} v="E" c="new" dot=${true} />
        <${Arr} d=${`M55 ${Y + 73} Q72 ${Y + 50} 48 ${Y + 26}`} e=${[48, Y + 26]} p=${[72, Y + 50]} c="k" on=${!!s.eA} />
        <${Arr} d=${`M59 ${Y + 73} C92 ${Y + 73} 82 ${Y + 108} 33 ${Y + 87}`} e=${[33, Y + 87]} p=${[82, Y + 108]} c="p" on=${!!s.self} />
      </svg>
      <p className="dsv5-order">${s.o ? html`head → ${s.o.split(' ').join(' → ')}${s.self ? '' : ' → NULL'}` : ' '}</p></div>
      <${Cap} en=${s.en.replace(/->/g, '-&gt;')} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5.0] slides 21–22: insert after the third node, and the wrong order ── */
  function L5OrderInsert({ ar }) {
    const [wrong, setWrong] = useState(false);
    const R = [
      { en: 'Slide 21: insert the new <b>node</b> after the <b>third</b> node; the insertion point is between the third and the fourth.', ar: 'ده slide 21: عايزين نضيف الـ <b>node</b> الجديدة بعد الـ node <b>التالتة</b>، ومكان الإضافة بين التالتة والرابعة.' },
      { cur: true, en: 'Step 1: locate the node <b>preceding the insertion point</b> and make <b>current</b> point to it.', ar: 'الخطوة (1): نحدد الـ node اللي <b>قبل مكان الإضافة</b> ونخلي الـ <b>current</b> يشاور عليها.' },
      { cur: true, s2: true, en: 'Step 2: <b>newnode->next = current->next;</b> the new node points to the node after the insertion point.', ar: 'الخطوة (2): الـ node الجديدة بتشاور على الـ node اللي بعد مكان الإضافة:' + L('newnode-&gt;next = current-&gt;next;') },
      { cur: true, s2: true, s3: true, x: true, en: 'Step 3: <b>current->next = newnode;</b> the third node points to the new node; its old link is crossed out.', ar: 'الخطوة (3): الـ node التالتة بتشاور على الـ node الجديدة، والـ link القديم بتاعها بيتشطب:' + L('current-&gt;next = newnode;') },
      { cur: true, s2: true, s3: true, gone: true, o: true, en: 'Done: head → 1st → 2nd → 3rd → node → 4th → NULL.', ar: 'خلصنا، والـ node الجديدة بقت بين التالتة والرابعة.' }
    ];
    const W = [
      R[1],
      { cur: true, s3: true, gone: true, lost: true, en: 'Swapped, step 3 first: <b>current->next = newnode;</b> the link to the fourth node is gone, and <b>nothing points to it any more</b>.', ar: 'لو بدّلنا وعملنا الخطوة (3) الأول، الـ link اللي رايح للـ node الرابعة بيروح، و<b>مفيش حاجة بقت بتشاور عليها</b>:' + L('current-&gt;next = newnode;') },
      { cur: true, s3: true, gone: true, lost: true, self: true, en: 'Then <b>newnode->next = current->next;</b> but current->next is now the new node itself, so it points to itself. The rest of the list is lost.', ar: 'وبعدها الـ <bdi dir="ltr">current-&gt;next</bdi> بقى هو الـ node الجديدة نفسها، فبتشاور على نفسها وباقي الـ list ضاع:' + L('newnode-&gt;next = current-&gt;next;') }
    ];
    const S = wrong ? W : R, [i, ctl] = useWalk(S.length, 2700, wrong), s = S[i];
    const X = [40, 96, 152, 246], Y = 86, fills = [55, 25, 40, 70];
    return html`<figure className="fig dsv5"><div className="fig-stage">
      <div className="dsv5-modes"><button className="fig-btn" aria-pressed=${String(!wrong)} onClick=${() => setWrong(false)}>slide's order</button><button className="fig-btn" aria-pressed=${String(wrong)} onClick=${() => setWrong(true)}>steps 2 and 3 swapped</button></div>
      <svg className="dsv5-svg" viewBox="0 0 300 172" role="img" aria-label="Inserting a node after the third node">
        <text className="lb" x="4" y="80">head</text>${Ln(4, Y + 15, X[0], Y + 15, 'k')}
        ${X.map((x, j) => html`<rect key=${j} className=${'dsv5-sq dsv5-f' + (j === 2 && s.cur ? ' hot' : '') + (j === 3 && s.lost ? ' dim' : '')} x=${x} y=${Y} width="30" height="30" style=${{ fill: `color-mix(in srgb, var(--fig-k) ${fills[j]}%, var(--paper))` }} />`)}
        ${Ln(70, Y + 15, 96, Y + 15, 'k')}${Ln(126, Y + 15, 152, Y + 15, 'k')}
        ${Ln(182, Y + 15, 246, Y + 15, s.x ? 'p dash' : 'k', !s.gone)}${s.x && html`<text className="x" x="214" y=${Y + 15}>X</text>`}
        <g className=${'dsv5-f' + (i === 0 && !wrong ? '' : ' off')}><text className="m p" x="214" y="62">insertion point</text>${Ln(214, 70, 214, Y + 10, 'p')}</g>
        ${Ln(276, Y + 15, 290, Y + 15, '', true)}
        <text className="lb e" x="206" y="35">node</text>${Ln(210, 35, 246, 35, 'k')}
        <rect className="dsv5-sq" x="246" y="20" width="30" height="30" style=${{ fill: 'color-mix(in srgb, var(--fig-k) 35%, var(--paper))' }} />
        ${Ln(261, 50, 261, Y - 1, 'p', !!s.s2)}
        ${Ln(182, Y + 4, 246, 46, 'p', !!s.s3)}
        <${Arr} d="M276 30 C298 30 296 2 266 3 C254 4 252 10 254 19" e=${[254, 19]} p=${[252, 10]} c="p" on=${!!s.self} />
        <g className=${'dsv5-f' + (s.cur ? '' : ' off')}><text className="lb p" x="4" y="158">current</text><${Arr} d="M62 156 Q140 162 165 118" e=${[165, 118]} p=${[140, 162]} c="p" /></g>
        ${s.lost && html`<text className="m lb p" x="261" y="136">lost</text>`}
      </svg>
      <p className="dsv5-order">${s.o ? 'head → 1st → 2nd → 3rd → node → 4th → NULL' : s.self ? 'head → 1st → 2nd → 3rd → node → node → …' : ' '}</p></div>
      <${Cap} en=${s.en.replace(/->/g, '-&gt;')} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [7] slides 27 and 29: deleting the first node, deleting an interior node ── */
  function L5DeletePics({ ar }) {
    const [m, setM] = useState('b');
    const B = [
      { en: 'Slide 27: <b>head</b> points to the first node, which points to the second.', ar: 'ده slide 27: الـ <b>head</b> بيشاور على أول node، وهي بتشاور على التانية.' },
      { tmp: true, en: '<b>Node *temp = head;</b> and <b>value = head->data;</b> keep the first node so it can be deleted.', ar: 'بنمسك أول node في الـ temp وناخد قيمتها في الـ value عشان نقدر نمسحها:' + L('Node *temp = head; value = head-&gt;data;') },
      { tmp: true, jump: true, en: '<b>head = head->next;</b> head points to the second node (the node pointed to by the first node).', ar: 'الـ head بقى بيشاور على التانية، اللي هي الـ node اللي الأولى بتشاور عليها:' + L('head = head-&gt;next;') },
      { jump: true, del: true, en: '<b>delete(temp);</b> the old first node is freed and value is returned. The list starts at the second node.', ar: 'الـ node الأولى القديمة اتمسحت والـ value اترجعت، والـ list بقت بتبدأ من التانية:' + L('delete(temp); return (value);') }
    ];
    const N = [
      { en: 'Slide 29: delete the <b>fourth</b> node, an interior node.', ar: 'ده slide 29: عايزين نمسح الـ node <b>الرابعة</b>، ودي node في النص.' },
      { pc: true, en: 'Step 1: traverse so that <b>current</b> points to the node to delete and <b>previous</b> to the node before it (in deleteitem: temp1 and temp2).', ar: 'الخطوة (1): نمشي لحد ما الـ <b>current</b> يشاور على الـ node اللي هتتمسح والـ <b>previous</b> على اللي قبلها (في الـ deleteitem اسمهم temp1 وtemp2).' },
      { pc: true, fol: true, en: 'Step 2: get at the node <b>following</b> the one to delete: <b>current->next</b>.', ar: 'الخطوة (2): نوصل للـ node اللي <b>بعد</b> اللي هتتمسح، اللي هي <bdi dir="ltr">current-&gt;next</bdi>.' },
      { pc: true, fol: true, jump: true, en: 'Step 3: <b>previous->next = current->next;</b> previous now points past current; the old link is crossed out.', ar: 'الخطوة (3): الـ previous بقى بيشاور على اللي بعد الـ current، والـ link القديم اتشطب:' + L('previous-&gt;next = current-&gt;next;') },
      { pc: true, jump: true, del: true, en: '<b>delete(current);</b> the node is freed: the list is 1st → 2nd → 3rd → 5th.', ar: 'الـ node اتمسحت بالسطر ده والـ list بقت الأولى والتانية والتالتة والخامسة:' + L('delete(current);') }
    ];
    const S = m === 'b' ? B : N, [i, ctl] = useWalk(S.length, 2700, m), s = S[i];
    const X = [52, 100, 148, 196, 244], Y = 62, fills = [70, 20, 8, 45, 75], dn = m === 'b' ? 0 : 3;
    const sq = j => html`<rect key=${j} className=${'dsv5-sq dsv5-f' + (j === dn && s.del ? ' off' : '') + (j === dn && (s.tmp || s.pc) && !s.del ? ' bad' : '') + (m === 'n' && j === 2 && s.pc ? ' hot' : '') + (m === 'n' && j === 4 && s.fol ? ' hot' : '')} x=${X[j]} y=${Y} width="28" height="28" style=${{ fill: `color-mix(in srgb, var(--fig-k) ${fills[j]}%, var(--paper))` }} />`;
    const lnk = j => { const gone = j === dn && s.jump; return html`<g key=${'l' + j}>${Ln(X[j] + 28, Y + 14, X[j + 1], Y + 14, gone ? 'p dash' : 'k', !(j === dn && s.del))}${gone && !s.del && m === 'n' && html`<text className="x" x=${X[j] - 10} y=${Y + 14}>X</text>`}</g>`; };
    return html`<figure className="fig dsv5"><div className="fig-stage">
      <div className="dsv5-modes"><button className="fig-btn" aria-pressed=${String(m === 'b')} onClick=${() => setM('b')}>first node (slide 27)</button><button className="fig-btn" aria-pressed=${String(m === 'n')} onClick=${() => setM('n')}>interior node (slide 29)</button></div>
      <svg className="dsv5-svg" viewBox="0 0 300 150" role="img" aria-label=${m === 'b' ? 'Deleting the first node' : 'Deleting an interior node'}>
        ${m === 'b' ? html`<g><text className="lb" x="4" y="44">head</text><rect className="dsv5-sq" x="4" y=${Y + 4} width="24" height="20" style=${{ fill: 'var(--paper)' }} />
            ${Ln(16, Y + 14, 52, Y + 14, s.jump ? 'p dash' : 'k', !s.del)}${s.jump && !s.del && html`<text className="x" x="38" y=${Y + 2}>X</text>`}
            <${Arr} d=${`M18 ${Y + 6} Q60 6 112 ${Y - 1}`} e=${[112, Y - 1]} p=${[90, 12]} c="p" on=${!!s.jump} />
            <g className=${'dsv5-f' + (s.tmp ? '' : ' off')}><text className="m lb p" x="66" y="126">temp</text>${Ln(66, 116, 66, Y + 31, 'p')}</g></g>`
          : html`<g><text className="lb" x="4" y="44">head</text>${Ln(10, Y + 14, 52, Y + 14, 'k')}
            <${Arr} d=${`M170 ${Y - 2} Q216 6 254 ${Y - 1}`} e=${[254, Y - 1]} p=${[234, 12]} c="p" on=${!!s.jump} />
            <g className=${'dsv5-f' + (s.pc ? '' : ' off')}><text className="m lb p" x="150" y="128">previous</text>${Ln(158, 116, 162, Y + 31, 'p')}
              <text className="m lb p" x="236" y="128">current</text>${Ln(220, 116, 212, Y + 31, 'p', !s.del)}</g>
            <g className=${'dsv5-f' + (s.fol && !s.del ? '' : ' off')}><text className="m lb k" x="262" y="108">next</text></g></g>`}
        ${X.map((_, j) => sq(j))}${[0, 1, 2, 3].map(lnk)}
      </svg></div>
      <${Cap} en=${s.en.replace(/->/g, '-&gt;')} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [8] search, count, get, update traced ── */
  const FN5 = {
    search: ['bool search(int item)', '{', '   Node *temp = head;', '   while (temp != NULL)', '   {', '      if (temp->data == item)', '         return (true);', '      else temp = temp->next;', '   }', '   return (false);', '}'],
    count: ['int count()', '{', '   int c = 0;', '   Node *temp = head;', '   while (temp != NULL)', '   { c++; temp = temp->next; }', '   return (c);', '}'],
    get: ['int get()', '{', '   if (head != NULL)', '      return head->data;', '   else', '   { cout << "Empty";', '     return 0; }', '}'],
    update: ['bool update(int old_item,', '            int new_item)', '{', '   Node *temp = head;', '   while (temp != NULL)', '   {', '      if (temp->data == old_item)', '      { temp->data = new_item;', '        return true; }', '      else temp = temp->next;', '   }', '   return false;', '}']
  };
  const NX = 'temp = temp-&gt;next';
  function funcSteps(fn, list, a, b) {
    const S = [], v = list.slice(), n = v.length;
    const st = (o) => S.push(Object.assign({ vals: v.slice(), t: null }, o));
    if (fn === 'get') {
      if (n) st({ t: 0, line: [2, 3], ret: v[0], en: `head != NULL, so get() returns head->data = <b>${v[0]}</b>, the first element.`, ar: 'الـ head مش NULL، فالـ <bdi dir="ltr">get()</bdi> بترجّع أول عنصر:' + L(`head-&gt;data = ${v[0]}`) });
      else st({ t: 'N', line: [2, 4, 5, 6], ret: 0, print: 'Empty', en: 'head is NULL: get() prints <b>Empty</b> and returns 0.', ar: 'الـ head بـ NULL، فالـ <bdi dir="ltr">get()</bdi> بتطبع <b>Empty</b> وترجّع صفر.' });
      return S;
    }
    const isC = fn === 'count', isU = fn === 'update', key = a, item = isU ? 'old_item' : 'item';
    const t0 = n ? 0 : 'N', first = isU ? [3] : isC ? [2, 3] : [2];
    st({ t: t0, c: isC ? 0 : undefined, line: first, en: (isC ? 'c = 0, ' : '') + `temp = head${n ? ` (the node ${v[0]})` : ' = NULL (empty list)'}.`, ar: (isC ? 'الـ c بيبدأ بصفر، و' : '') + `الـ temp بيبدأ من الـ head` + (n ? ` اللي هو الـ node اللي فيها ${D(v[0])}.` : '، والـ list فاضية فهو NULL.') });
    const W = isU ? 4 : isC ? 4 : 3, IF = isU ? 6 : 5, ELSE = isU ? 9 : 7;
    for (let k = 0; k < n; k++) {
      const nx = k + 1 < n ? v[k + 1] : 'NULL';
      if (isC) { st({ t: k, c: k + 1, line: [4, 5], en: `temp at ${v[k]}: c++ makes c = ${k + 1}, then temp moves to ${nx}.`, ar: `الـ temp واقف عند ${D(v[k])}، فالـ ${D('c++')} بتخلي الـ c قيمته ${D(k + 1)}، وبعدين الـ temp بيروح على ${D(nx)}.` }); continue; }
      if (v[k] === key) {
        if (isU) { v[k] = b; st({ t: k, hit: k, line: [W, IF, 7, 8], ret: 'true', en: `${key} == ${key}: temp->data = new_item, the node now holds <b>${b}</b>; return true.`, ar: `الـ node دي فيها ${D(key)} وهي الـ old_item، فبتتغيّر لـ <b>${D(b)}</b> والدالة بترجّع true:` + L(`temp-&gt;data = ${b}`) }); }
        else st({ t: k, hit: k, line: [W, IF, 6], ret: 'true', en: `temp->data == item: ${v[k]} == ${key}, so search returns <b>true</b>.`, ar: `الشرط ده اتحقق، فالـ search بترجّع <b>true</b>:` + L(`temp-&gt;data == item → ${v[k]} == ${key}`) });
        return S;
      }
      st({ t: k, line: [W, IF, ELSE], en: `${v[k]} != ${key} (${item}), so temp = temp->next: now ${nx}.`, ar: `القيمة ${D(v[k])} مش هي الـ ${item} اللي هي ${D(key)}، فبنعمل ${D(NX)} ويروح على ${D(nx)}.` });
    }
    if (isC) st({ t: 'N', c: n, line: [4, 6], ret: n, en: `temp is NULL: the loop ends and count() returns <b>${n}</b>.`, ar: `الـ temp بقى NULL فالـ loop خلص، والـ <bdi dir="ltr">count()</bdi> بترجّع <b>${D(n)}</b>.` });
    else st({ t: 'N', line: [W, isU ? 11 : 9], ret: 'false', en: `temp is NULL: ${key} is not in the list, so ${fn} returns <b>false</b>${isU ? ' and nothing changes' : ''}.`, ar: `الـ temp بقى NULL، يعني ${D(key)} مش موجود في الـ list، فالـ ${fn} بترجّع <b>false</b>${isU ? ' ومفيش حاجة بتتغيّر' : ''}.` });
    return S;
  }
  function L5Funcs({ ar }) {
    const [cfg, setCfg] = useState({ fn: 'count', list: [4, 9, 2], a: 9, b: 7, key: 0 });
    const [txt, setTxt] = useState('4 9 2'), [ta, setTa] = useState('9'), [tb, setTb] = useState('7'), [err, setErr] = useState('');
    const S = funcSteps(cfg.fn, cfg.list, cfg.a, cfg.b), [i, ctl] = useWalk(S.length, 1700, cfg.key + cfg.fn), s = S[i];
    const runFn = fn => { const l = parseList(txt), a = parseInt(ta, 10), b = parseInt(tb, 10);
      if (!l || l.length > 6) { setErr('List: up to 6 whole numbers separated by spaces.'); return; }
      if ((fn === 'search' || fn === 'update') && !Number.isInteger(a) || fn === 'update' && !Number.isInteger(b)) { setErr('Type whole numbers for the arguments.'); return; }
      setErr(''); setCfg({ fn, list: l, a, b, key: cfg.key + 1 }); };
    const ex = () => { setTxt('4 9 2'); setTa('9'); setTb('7'); setErr(''); setCfg({ fn: 'count', list: [4, 9, 2], a: 9, b: 7, key: cfg.key + 1 }); };
    const call = cfg.fn === 'search' ? `search(${cfg.a})` : cfg.fn === 'update' ? `update(${cfg.a}, ${cfg.b})` : cfg.fn + '()';
    const marks = s.t === null ? {} : { [s.t]: 'temp' }, cls = s.t === null || s.t === 'N' ? {} : { [s.t]: s.hit === s.t ? 'ok' : 'hot' };
    const done = i === S.length - 1;
    return html`<figure className="fig dsv5"><div className="fig-stage">
      <div className="dsv5-modes">${['search', 'count', 'get', 'update'].map(f => html`<button key=${f} className="fig-btn" aria-pressed=${String(cfg.fn === f)} onClick=${() => runFn(f)}>${f}</button>`)}</div>
      <${Chain} vals=${s.vals} marks=${marks} cls=${cls} nul=${s.t === 'N' ? 'hot' : ''} />
      <${Code} title=${call} lines=${FN5[cfg.fn]} cur=${s.line} />
      <div className="dsv5-out">${s.c !== undefined ? `c = ${s.c}\n` : ''}${s.print ? `prints: ${s.print}\n` : ''}${done && s.ret !== undefined ? html`returns <span className=${s.ret === 'false' ? 'n' : 'y'}>${String(s.ret)}</span>` : 'running…'}</div>
      <div className="dsv5-row"><label className="dsv5-lbl">list <input className="dsv5-in wide" value=${txt} onInput=${e => setTxt(e.target.value)} aria-label="list values" /></label>
        <label className="dsv5-lbl">item / old <input className="dsv5-in" value=${ta} onInput=${e => setTa(e.target.value)} aria-label="item or old_item" /></label>
        <label className="dsv5-lbl">new <input className="dsv5-in" value=${tb} onInput=${e => setTb(e.target.value)} aria-label="new_item" /></label></div>
      <p className="dsv5-legend" style=${{ marginTop: '6px' }}>Try your own: edit the list or the values, then pick a function.</p>
      ${err && html`<p className="dsv5-err">${err}</p>`}</div>
      <${Cap} en=${s.en.replace(/->/g, '-&gt;')} ar=${s.ar} showAr=${ar} />
      <${SBar} n=${S.length} i=${i} ctl=${ctl} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${ex}>Example from the notes</button></div></figure>`;
  }
  L5Funcs.gen = funcSteps;

  /* ── [9] Lab 5: InsertB, InsertE, InsertAt traced ── */
  const INSB = ['void InsertB(int item)', '{', '   node *temp = new node;', '   temp->data = item;', '   temp->next = head;', '   head = temp;', '}'];
  const INSAT = ['void InsertAt(int item, int pos)', '{', '   int curr = 1;', '   node *temp = new node;', '   temp->data = item;', '   temp->next = NULL;', '   if (head == NULL) head = temp;', '   else if (pos == 1)', '   { temp->next = head;', '     head = temp; }', '   else', '   {', '      node *p = head;', '      while (curr < pos-1)', '      { curr++; p = p->next; }', '      temp->next = p->next;', '      p->next = temp;', '   }', '}'];
  function insAtSteps(list, item, pos, mi) {
    const S = [], st = o => S.push(Object.assign({ vals: list, fn: 'at', mi }, o));
    st({ tmp: [item, 'NULL'], line: [2, 3, 4, 5], en: `InsertAt(${item}, ${pos}): curr = 1, and temp is a new node with data ${item} and next NULL.`, ar: `في الـ ${D('InsertAt(' + item + ', ' + pos + ')')} الـ curr بيبدأ بـ 1، والـ temp بقت node جديدة فيها ${D(item)} والـ next بتاعها NULL.` });
    if (!list.length) { st({ vals: [item], nw: 0, line: [6], en: `head == NULL, so head = temp: the list is just ${item} (pos is not used).`, ar: `الـ head كان NULL، فالـ head بقى الـ temp والـ list فيها ${D(item)} بس (والـ pos مش بيتستخدم هنا).` }); return S; }
    if (pos === 1) {
      st({ tmp: [item, list[0]], line: [7, 8], en: `pos == 1: temp->next = head, so ${item} points to ${list[0]}.`, ar: `الـ pos بيساوي 1، فالـ temp بتشاور على ${D(list[0])} اللي هو الـ head، بالسطر ده:` + L('temp-&gt;next = head;') });
      st({ vals: [item].concat(list), nw: 0, line: [9], en: `head = temp: the list is ${[item].concat(list).join(' ')}.`, ar: 'الـ head بقى بيشاور على الـ temp، والـ list بقت:' + L([item].concat(list).join(' ')) });
      return S;
    }
    let curr = 1, p = 0;
    st({ tmp: [item, 'NULL'], mk: { 0: 'p' }, line: [12], en: `pos is ${pos}, so the else part runs: p = head (${list[0]}).`, ar: `الـ pos قيمته ${D(pos)}، فبيدخل في الـ else، والـ p بيبدأ من الـ head اللي هو ${D(list[0])}.` });
    while (curr < pos - 1) {
      curr++; p++;
      st({ tmp: [item, 'NULL'], mk: { [p]: 'p' }, line: [13, 14], en: `curr < pos-1 (${curr - 1} < ${pos - 1}): curr becomes ${curr}, p moves to ${list[p]}.`, ar: `الشرط ${D((curr - 1) + ' < ' + (pos - 1))} صح، فالـ curr بقى ${D(curr)} والـ p راح على ${D(list[p])}.` });
    }
    st({ tmp: [item, 'NULL'], mk: { [p]: 'p' }, line: [13], en: `curr < pos-1 is false (${curr} < ${pos - 1}): p stops at position ${pos - 1}, the node ${list[p]}.`, ar: `الشرط ${D(curr + ' < ' + (pos - 1))} غلط، فالـ p بيقف عند الـ position رقم ${D(pos - 1)}، اللي هو الـ node اللي فيها ${D(list[p])}.` });
    const nx = p + 1 < list.length ? list[p + 1] : 'NULL';
    st({ tmp: [item, nx], mk: { [p]: 'p' }, line: [15], en: `temp->next = p->next: ${item} now points to ${nx}.`, ar: `الـ temp بقت بتشاور على ${D(nx)} اللي بعد الـ p، بالسطر ده:` + L('temp-&gt;next = p-&gt;next;') });
    const out = list.slice(0, p + 1).concat(item, list.slice(p + 1));
    st({ vals: out, nw: p + 1, mk: { [p]: 'p' }, line: [16], en: `p->next = temp: ${list[p]} now points to ${item}. The list is ${out.join(' ')}.`, ar: `الـ p بقت بتشاور على الـ temp، والـ list بقت:` + L(out.join(' ')) });
    return S;
  }
  function exampleSteps() {
    const S = [{ vals: [], mi: 0, en: 'main: node *head = NULL; the list is empty.', ar: 'في الـ main الـ head بيبدأ بـ NULL، يعني الـ list فاضية.' },
      { vals: [10], nw: 0, mi: 1, fn: 'b', line: [2, 3, 4, 5], en: 'InsertB(10): new node 10, temp->next = head (NULL), head = temp. List: 10.', ar: 'الـ <bdi dir="ltr">InsertB(10)</bdi> بتعمل node فيها 10 تشاور على الـ head القديم (NULL)، والـ head يشاور عليها. الـ list بقت 10.' },
      { vals: [10, 30], nw: 1, mi: 2, en: 'InsertE(30): 30 is added at the end. List: 10 30.', ar: 'الـ <bdi dir="ltr">InsertE(30)</bdi> بتضيف 30 في الآخر، فالـ list بقت:' + L('10 30') },
      { vals: [5, 10, 30], nw: 0, mi: 3, fn: 'b', line: [2, 3, 4, 5], en: 'InsertB(5): 5 goes in front of 10. List: 5 10 30.', ar: 'الـ <bdi dir="ltr">InsertB(5)</bdi> بتحط 5 قبل الـ 10، فالـ list بقت:' + L('5 10 30') }];
    return S.concat(insAtSteps([5, 10, 30], 20, 2, 4));
  }
  function L5InsertAt({ ar }) {
    const [run, setRun] = useState({ S: exampleSteps(), key: 0, ex: true }), [item, setItem] = useState('40'), [pos, setPos] = useState(2), [err, setErr] = useState('');
    const S = run.S, [i, ctl] = useWalk(S.length, 2200, run.key), s = S[i];
    const now = S[S.length - 1].vals, n = now.length, P = Math.min(pos, n + 1);
    const go = () => { const v = parseInt(item, 10); if (!Number.isInteger(v) || Math.abs(v) > 999) { setErr('Type a whole number for item.'); return; } if (n >= 7) { setErr('The picture holds 7 nodes: empty the list first.'); return; }
      setErr(''); setRun({ S: insAtSteps(now, v, P, 0), key: run.key + 1, ex: false, call: `InsertAt(${v}, ${P});` }); };
    const empty = () => { setErr(''); setRun({ S: [{ vals: [], mi: 0, en: 'head = NULL: the list is empty. InsertAt now takes the head == NULL branch.', ar: 'الـ head بقى NULL والـ list فاضية، فالـ InsertAt هتدخل في أول if.' }], key: run.key + 1, ex: false, call: 'node *head = NULL;' }); setPos(1); };
    const ex = () => { setErr(''); setRun({ S: exampleSteps(), key: run.key + 1, ex: true }); };
    const main = run.ex ? ['node *head = NULL;', 'InsertB(10);', 'InsertE(30);', 'InsertB(5);', 'InsertAt(20,2);'] : [run.call];
    const mk = s.mk || {}, cls = s.nw != null ? { [s.nw]: 'new' } : {};
    return html`<figure className="fig dsv5"><div className="fig-stage">
      <${Code} title="main" lines=${main} cur=${[s.mi]} />
      <${Chain} vals=${s.vals} marks=${mk} cls=${cls} />
      <div className="dsv5-tmp">${s.tmp ? html`<span>temp →</span><span className="dsv5-nd"><span className="dsv5-dv new">${s.tmp[0]}</span><span className="dsv5-pv"></span></span><span>→</span><span className="t">${s.tmp[1]}</span>` : ''}</div>
      ${s.fn && html`<${Code} title=${s.fn === 'b' ? 'InsertB' : 'InsertAt (positions start at 1)'} lines=${s.fn === 'b' ? INSB : INSAT} cur=${s.line} />`}
      <div className="dsv5-row"><label className="dsv5-lbl">item <input className="dsv5-in" value=${item} onInput=${e => setItem(e.target.value)} aria-label="item" /></label>
        <span className="dsv5-step">pos<button className="fig-btn" onClick=${() => setPos(Math.max(1, P - 1))} disabled=${P <= 1} aria-label="pos minus">−</button><b>${P}</b><button className="fig-btn" onClick=${() => setPos(Math.min(n + 1, P + 1))} disabled=${P >= n + 1} aria-label="pos plus">+</button></span>
        <button className="fig-btn" onClick=${go}>InsertAt</button><button className="fig-btn" onClick=${empty}>empty list</button></div>
      <p className="dsv5-legend" style=${{ marginTop: '6px' }}>Try your own: InsertAt on the list as it ends (pos 1 to ${n + 1}).</p>
      ${err && html`<p className="dsv5-err">${err}</p>`}</div>
      <${Cap} en=${s.en.replace(/->/g, '-&gt;')} ar=${s.ar} showAr=${ar} />
      <${SBar} n=${S.length} i=${i} ctl=${ctl} />
      <div className="fig-bar"><span className="grow"></span><button className="fig-btn" onClick=${ex}>Example from the notes</button></div></figure>`;
  }
  L5InsertAt.gen = [insAtSteps, exampleSteps];

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ds-l5-node-chain': L5NodeChain,
    'ds-l5-scatter': L5Scatter,
    'ds-l5-types': L5Types,
    'ds-l5-access': L5Access,
    'ds-l5-classes': L5Classes,
    'ds-l5-front-insert': L5FrontInsert,
    'ds-l5-order-insert': L5OrderInsert,
    'ds-l5-delete-pics': L5DeletePics,
    'ds-l5-funcs': L5Funcs,
    'ds-l5-insert-at': L5InsertAt
  });
})();
/* ── part L8 ── */
// Data Structures visuals, Lecture 8 (Doubly linked lists): the slide 3 list travelled forward and backward (singly vs doubly), the slide 4 node fields, the cost of the extra prev links, the Node/Linkedlist classes of slides 5–7, insertsorted on the notes' example, deletefrombeginning / deletefromend (slides 13–14), removeAll, and the Lab 8 head/tail list (insertLast, removeLast, displayBackward, the lab main). Every label and number comes from the site's notes and the slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm } = window.FIGKIT;
  const CSS = `
.dsv8 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dsv8 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv8 *{ font-variant-ligatures:none; font-feature-settings:"liga" 0, "calt" 0; }
.dsv8-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dsv8-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dsv8-mono .fig-btn{ font:.8rem var(--mono); padding:3px 9px; min-height:30px; }
.dsv8-row{ display:flex; flex-wrap:wrap; gap:6px 10px; justify-content:center; align-items:center; margin:6px 0 10px; }
.dsv8-code{ margin:0 auto 10px; max-width:440px; padding:8px 10px; border:1px solid var(--line); border-radius:8px; background:var(--paper); font:.78rem/1.45 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv8-code span{ display:block; border-radius:3px; padding:0 3px; transition:background .3s; }
.dsv8-code span.cur{ background:color-mix(in srgb, var(--fig-k) 24%, transparent); }
.dsv8-code span.bad{ background:color-mix(in srgb, var(--pen) 22%, transparent); }
.dsv8-out{ max-width:440px; margin:10px auto 0; padding:6px 10px; border:1px solid var(--line); border-left:4px solid var(--fig-k); border-radius:6px; background:var(--paper); font:600 .82rem/1.5 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv8-out small{ font:600 .75rem var(--body); color:var(--graphite); margin-right:6px; }
.dsv8-out.bad{ border-left-color:var(--pen); color:var(--pen); }
.dsv8-in{ resize:none; overflow-wrap:anywhere; font:.85rem var(--mono); padding:5px 8px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:32px; width:100%; max-width:420px; box-sizing:border-box; }
.dsv8-lbl{ display:grid; gap:4px; width:100%; max-width:420px; font-size:.8rem; color:var(--graphite); }
.dsv8-note{ font-size:.78rem; color:var(--graphite); text-align:center; margin:8px 0 0; line-height:1.4; }
.dsv8-cnt{ font-size:.85rem; color:var(--graphite); }
.dsv8-list{ display:flex; flex-wrap:wrap; justify-content:center; align-items:flex-end; row-gap:8px; }
.dsv8-grp{ display:flex; align-items:flex-end; }
.dsv8-nd{ display:flex; flex-direction:column; align-items:center; transition:opacity .35s; }
.dsv8-tg{ min-height:20px; display:flex; flex-wrap:wrap; gap:2px; justify-content:center; margin-bottom:2px; }
.dsv8-tg span{ font:600 .75rem var(--mono); color:#fff; background:var(--fig-s); border-radius:4px; padding:0 4px; line-height:18px; }
.dsv8-box{ display:flex; border:2px solid var(--ink); border-radius:5px; overflow:hidden; background:var(--paper); transition:border-color .35s, box-shadow .35s; }
.dsv8-box > span{ min-width:28px; padding:6px 4px; text-align:center; font:600 .75rem/1.2 var(--mono); color:var(--graphite); transition:background .35s, color .35s; }
.dsv8-box > span + span{ border-left:1.5px solid var(--ink); }
.dsv8-box > span.dv{ min-width:30px; font-size:.9rem; color:var(--ink); background:var(--paper-2); }
.dsv8-box > span.hot{ background:color-mix(in srgb, var(--fig-k) 30%, var(--paper)); color:var(--ink); }
.dsv8-box > span.lab{ min-width:40px; font:600 .75rem var(--body); color:var(--ink); }
.dsv8-nd.on .dsv8-box{ border-color:var(--fig-k); box-shadow:0 0 0 2px color-mix(in srgb, var(--fig-k) 45%, transparent); }
.dsv8-nd.gone{ opacity:.45; } .dsv8-nd.gone .dsv8-box{ border-style:dashed; }
.dsv8-nd.gone .dsv8-tg::after{ content:"deleted"; font:600 .75rem var(--body); color:var(--pen); }
.dsv8-cn{ display:flex; flex-direction:column; align-items:center; width:20px; margin-bottom:4px; font:700 .9rem/1 var(--mono); color:var(--fig-k); }
.dsv8-cn i{ font-style:normal; transition:opacity .3s; } .dsv8-cn i.off{ opacity:.12; }
.dsv8-cn.sg{ margin-bottom:9px; }
.dsv8-dots{ align-self:center; padding:0 4px; color:var(--graphite); font:700 1rem var(--mono); margin-top:18px; }
.dsv8-nulls{ text-align:center; font:600 .78rem var(--mono); color:var(--graphite); margin-top:6px; min-height:1.2em; }
.dsv8-leg{ text-align:center; font-size:.75rem; color:var(--graphite); margin:0 0 6px; line-height:1.35; }
.dsv8-emp{ text-align:center; font:600 .85rem var(--mono); color:var(--graphite); padding:12px 0; }
.dsv8-big{ display:grid; grid-template-columns:minmax(0,1fr) auto minmax(0,1fr); gap:6px; align-items:center; max-width:360px; margin:0 auto; }
.dsv8-big .side{ font-size:.8rem; color:var(--graphite); line-height:1.25; text-align:center; transition:color .3s; }
.dsv8-big .side.on{ color:var(--fig-k); font-weight:700; }
.dsv8-big .side b{ display:block; font-size:1.1rem; color:var(--fig-k); }
.dsv8-big .dsv8-box > span{ min-width:44px; padding:10px 6px; font-size:.82rem; }
.dsv8-big .dsv8-box > span.dv{ min-width:54px; font-size:.95rem; }
.dsv8-slots{ display:flex; flex-wrap:wrap; gap:8px 14px; justify-content:center; margin:0 0 10px; }
.dsv8-slot{ display:flex; align-items:center; gap:6px; font:700 .85rem var(--mono); color:var(--ink); }
.dsv8-slot span{ min-width:54px; min-height:30px; display:grid; place-items:center; border:2px solid var(--ink); border-radius:4px; background:var(--paper); padding:0 6px; font-size:.8rem; transition:background .35s, border-color .35s; }
.dsv8-slot span.hot{ border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.dsv8-tally{ text-align:center; font:700 .88rem var(--body); color:var(--fig-k); margin-top:8px; }
.dsv8-pop{ animation:dsv8-in .45s ease both; }
@keyframes dsv8-in{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }
@media (prefers-reduced-motion: reduce){ .dsv8-pop{ animation:none; } .dsv8-code span, .dsv8-box, .dsv8-box > span, .dsv8-nd, .dsv8-cn i, .dsv8-slot span{ transition:none; } }`;
  if (!document.getElementById('dsv8-css')) { const s = document.createElement('style'); s.id = 'dsv8-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* helpers */
  const L = s => `<span class="ltr">${s}</span>`;
  const D = s => `<bdi dir="ltr">${String(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const LC = s => L(esc(s));
  const DC = s => D(esc(s));
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  const SBar = ({ n, i, ctl }) => html`<div className="fig-bar">
    ${n <= 14 ? html`<div className="fig-dots" aria-hidden="true">${Array.from({ length: n }, (_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</div>` : html`<span className="dsv8-cnt">Step ${i + 1} / ${n}</span>`}
    <span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i >= n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;
  const Modes = ({ list, mode, set, mono }) => html`<div className=${'dsv8-modes' + (mono ? ' dsv8-mono' : '')} role="group">${list.map(([k, l]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${l}</button>`)}</div>`;
  const Code = ({ lines, cur, bad }) => html`<pre className="dsv8-code">${lines.map((l, k) => html`<span key=${k} className=${(bad != null && bad === k) ? 'bad' : (Array.isArray(cur) ? cur.includes(k) : k === cur) ? 'cur' : ''}>${l || ' '}</span>`)}</pre>`;
  const Out = ({ rows, bad }) => html`<div className=${'dsv8-out' + (bad ? ' bad' : '')}>${rows.map((r, k) => html`<div key=${k}>${r[0] ? html`<small>${r[0]}</small>` : null}${r[1]}</div>`)}</div>`;

  /* the list model: nodes in display order, each { id, v, p, n } (p / n = id of the node pointed to, or null);
     a p / n that is not an id of a shown node is a label of a node outside the window (e.g. '10'). */
  let UID = 0;
  const mkList = vals => { const ids = vals.map(() => 'k' + (UID++)); return { nodes: vals.map((v, k) => ({ id: ids[k], v, p: k ? ids[k - 1] : null, n: k < vals.length - 1 ? ids[k + 1] : null })), tags: { head: ids.length ? ids[0] : null } }; };
  const clone = st => JSON.parse(JSON.stringify(st));
  const get = (st, id) => st.nodes.find(x => x.id === id);
  const lab = (st, ref) => ref == null ? 'NULL' : (get(st, ref) || { v: ref }).v;
  const fwd = st => { const r = []; let id = st.tags.head, g = 0; while (id != null && g++ < 40) { const x = get(st, id); if (!x) break; r.push(x.v); id = x.n; } return r; };
  const lastId = st => { let id = st.tags.head, g = 0; while (id != null && g++ < 40) { const x = get(st, id); if (x.n == null) return id; id = x.n; } return null; };
  const bwd = (st, from) => { const r = []; let id = from === undefined ? lastId(st) : from, g = 0; while (id != null && g++ < 40) { const x = get(st, id); if (!x) break; r.push(x.v); id = x.p; } return r; };
  const order = st => { const r = []; let id = st.tags.head, g = 0; while (id != null && g++ < 40) { const x = get(st, id); r.push(x); id = x.n; } st.nodes = r; return st; };
  const diffHot = (a, b) => { const H = []; b.nodes.forEach(x => { const o = get(a, x.id); if (!o) H.push(x.id + '.p', x.id + '.v', x.id + '.n'); else { if (o.p !== x.p) H.push(x.id + '.p'); if (o.n !== x.n) H.push(x.id + '.n'); } }); return H; };

  // draws the list: [prev | data | next] boxes, ⇄ between neighbours (→ when a.next is b, ← when b.prev is a), pointer names on top
  function DList({ st, hot = [], on = [], single, dots, gone = [] }) {
    const N = st.nodes, T = st.tags || {};
    const names = id => Object.keys(T).filter(k => T[k] === id);
    const nulls = Object.keys(T).filter(k => T[k] == null);
    if (!N.length) return html`<div><div className="dsv8-emp">${nulls.map(k => k + ' = NULL').join('   ') || 'empty list'}</div></div>`;
    const cell = (x, f) => html`<span className=${hot.includes(x.id + '.' + f) ? 'hot' : ''}>${lab(st, x[f])}</span>`;
    return html`<div>
      <div className="dsv8-list">
        ${dots && html`<span className="dsv8-dots">…</span>`}
        ${N.map((x, k) => { const a = N[k - 1];
          return html`<div key=${x.id} className="dsv8-grp">
            ${k > 0 && html`<span className=${'dsv8-cn' + (single ? ' sg' : '')} aria-hidden="true"><i className=${a.n === x.id ? '' : 'off'}>→</i>${!single && html`<i className=${x.p === a.id ? '' : 'off'}>←</i>`}</span>`}
            <div className=${'dsv8-nd' + (on.includes(x.id) ? ' on' : '') + (gone.includes(x.id) ? ' gone' : '')}>
              <div className="dsv8-tg">${names(x.id).map(k2 => html`<span key=${k2}>${k2}</span>`)}</div>
              <div className="dsv8-box">${!single && cell(x, 'p')}<span className=${'dv' + (hot.includes(x.id + '.v') ? ' hot' : '')}>${x.v}</span>${cell(x, 'n')}</div>
            </div></div>`; })}
        ${dots && html`<span className="dsv8-dots">…</span>`}
      </div>
      <div className="dsv8-nulls">${nulls.map(k => k + ' = NULL').join('   ')}</div></div>`;
  }
  const Legend = ({ single }) => html`<p className="dsv8-leg">${single ? 'Each node: data | next.' : 'Each node: prev | data | next.'} A pointer cell shows the node it points to.</p>`;

  /* ── [0.0]–[0.1] slide 3: the list 1 2 3, travelled forward and backward; singly vs doubly ── */
  function travelSteps(kind, dir) {
    const base = mkList([1, 2, 3]), ids = base.nodes.map(x => x.id), S = [];
    const at = (k, o) => { const st = clone(base); st.tags = { head: ids[0], temp: k == null ? null : ids[k] }; S.push(Object.assign({ st }, o)); };
    if (dir === 'fw') {
      at(0, { on: [ids[0]], out: '1', en: 'Forward: start at <b>head</b>, node 1. Print its data and follow its <b>next</b> pointer.', ar: 'لقدام: نبدأ من الـ <b>head</b> يعني أول node، نطبع الـ data بتاعتها ونمشي ورا الـ <b>next</b>.' });
      at(1, { on: [ids[1]], hot: [ids[0] + '.n'], out: '1 2', en: '<code>temp = temp->next</code>: node 2. Print it.', ar: 'الـ temp بيمشي للـ node التانية ونطبعها:' + LC('temp = temp->next;') });
      at(2, { on: [ids[2]], hot: [ids[1] + '.n'], out: '1 2 3', en: 'Next again: node 3, the last one. Print it.', ar: 'ونمشي تاني ورا الـ next لحد التالتة، ودي آخر node، ونطبعها.' });
      at(null, { hot: [ids[2] + '.n'], out: '1 2 3', en: 'The last node\'s next is <b>NULL</b>, so temp becomes NULL and the walk stops. ' + (kind === 'sg' ? 'A singly list can do this: it only needs next.' : 'Forward works the same in both lists.'), ar: 'الـ next بتاع آخر node قيمته <b>NULL</b>، فالـ temp بيبقى NULL والمشي بيقف. ' + (kind === 'sg' ? 'والـ singly list تقدر تعمل كده لأنها محتاجة الـ next بس.' : 'والمشي لقدام واحد في النوعين.') });
    } else if (kind === 'sg') {
      at(2, { on: [ids[2]], out: '3', en: 'Backward in a <b>singly</b> list: we are at the last node (3), but a node has <b>only data and next</b>. There is no pointer back to node 2.', ar: 'لورا في الـ <b>singly</b> list: إحنا عند آخر node، بس الـ node فيها <b>data وnext بس</b>، ومفيش pointer يرجّعنا للـ node اللي قبلها.' });
      at(2, { on: [ids[2]], out: '3   (stuck)', bad: 1, en: 'So we can travel in <b>only one direction</b>, forward: that is why it is called singly linked. Going back means starting again from head.', ar: 'عشان كده بنمشي في <b>اتجاه واحد بس</b> وهو لقدام، وده سبب اسم الـ singly. ولو عايز ترجع لازم تبدأ من الـ head من الأول.' });
    } else {
      at(2, { on: [ids[2]], out: '3', en: 'Backward: start at the <b>last node</b>, 3. Print it and follow its <b>prev</b> pointer.', ar: 'لورا: نبدأ من <b>آخر node</b>، نطبعها ونمشي ورا الـ <b>prev</b> بتاعها.' });
      at(1, { on: [ids[1]], hot: [ids[2] + '.p'], out: '3 2', en: '<code>temp = temp->prev</code>: node 2. Print it.', ar: 'الـ temp بيرجع للـ node اللي قبلها ونطبعها:' + LC('temp = temp->prev;') });
      at(0, { on: [ids[0]], hot: [ids[1] + '.p'], out: '3 2 1', en: 'prev again: node 1, the first one. Print it.', ar: 'ونرجع تاني ورا الـ prev لحد أول node ونطبعها.' });
      at(null, { hot: [ids[0] + '.p'], out: '3 2 1', en: 'The first node\'s prev is <b>NULL</b>: the walk stops. With prev pointers we travel in <b>both directions</b>, forward and backward.', ar: 'الـ prev بتاع أول node قيمته <b>NULL</b>، فالمشي بيقف. وبالـ prev pointers بنقدر نمشي في <b>الاتجاهين</b>، لقدام ولورا.' });
    }
    return S;
  }
  function L8Travel({ ar }) {
    const [kind, setKind] = useState('db'), [dir, setDir] = useState('fw');
    const S = travelSteps(kind, dir), [i, ctl] = useWalk(S.length, 1700, kind + dir), s = S[i];
    return html`<figure className="fig dsv8"><div className="fig-stage">
      <${Modes} list=${[['sg', 'Singly linked list'], ['db', 'Doubly linked list']]} mode=${kind} set=${setKind} />
      <${Modes} list=${[['fw', '→ Forward'], ['bw', '← Backward']]} mode=${dir} set=${setDir} />
      <${Legend} single=${kind === 'sg'} />
      <${DList} st=${s.st} single=${kind === 'sg'} hot=${s.hot || []} on=${s.on || []} />
      <${Out} rows=${[['Printed', s.out]]} bad=${s.bad} /></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.2] slide 4: the node, Data / prev / next; NULL at both ends ── */
  const ANAT = [
    { f: '', en: 'Slide 4: a doubly linked list is made of <b>connected nodes</b>, and each node contains three things.', ar: 'في slide 4: الـ doubly linked list مكوّنة من <b>nodes متوصلة ببعض</b>، وكل node فيها تلات حاجات.' },
    { f: 'v', en: '<b>Data</b>: the value that the node contains.', ar: 'الـ <b>Data</b> هي القيمة اللي جوه الـ node.' },
    { f: 'p', en: '<b>prev</b>: a pointer to the <b>previous node</b>.', ar: 'الـ <b>prev</b> هو pointer للـ <b>node اللي قبلها</b>.' },
    { f: 'n', en: '<b>next</b>: a pointer to the <b>next node</b>.', ar: 'الـ <b>next</b> هو pointer للـ <b>node اللي بعدها</b>.' },
    { f: 'ends', en: 'In a list (slide 3: 1, 2, 3) the <b>first node\'s prev</b> and the <b>last node\'s next</b> are <b>NULL</b>: nothing before the first, nothing after the last.', ar: 'وفي الـ list (زي slide 3) الـ <b>prev بتاع أول node</b> والـ <b>next بتاع آخر node</b> قيمتهم <b>NULL</b>، لأن مفيش حاجة قبل الأولى ولا بعد الأخيرة.' }
  ];
  function L8NodeAnatomy({ ar }) {
    const [i, ctl] = useWalk(ANAT.length, 2200, 0), A = ANAT[i];
    const st = mkList([1, 2, 3]); st.tags = {};
    const c = f => A.f === f ? 'hot' : '';
    return html`<figure className="fig dsv8"><div className="fig-stage">
      ${A.f !== 'ends' ? html`<div className="dsv8-big">
          <div className=${'side' + (A.f === 'p' ? ' on' : '')}><b>←</b>Previous node</div>
          <div className="dsv8-box"><span className=${c('p')}>prev</span><span className=${'dv ' + c('v')}>Data</span><span className=${c('n')}>next</span></div>
          <div className=${'side' + (A.f === 'n' ? ' on' : '')}><b>→</b>Next node</div></div>`
        : html`<div className="dsv8-pop"><${DList} st=${st} hot=${[st.nodes[0].id + '.p', st.nodes[2].id + '.n']} /></div>`}
      <pre className="dsv8-code" style=${{ maxWidth: '260px', marginTop: '12px' }}><span className=${c('v')}>int data;</span><span className=${c('n')}>Node *next;</span><span className=${c('p')}>Node *prev;</span></pre></div>
      <${Cap} en=${A.en} ar=${A.ar} showAr=${ar} /><${SBar} n=${ANAT.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.3] the cost: linking 25 in between 20 and 30 (the notes' insertsorted example), singly vs doubly ── */
  function costSteps(kind) {
    const st = { nodes: [{ id: 't', v: 20, p: '10', n: 'b' }, { id: 'w', v: 25, p: null, n: null }, { id: 'b', v: 30, p: 't', n: '40' }], tags: { temp: 't', newnode: 'w' } };
    const S = [], push = (o, f) => { if (f) f(st); S.push(Object.assign({ st: clone(st) }, o)); };
    const first = { cur: -1, k: 0, hot: ['w.v'], en: 'From the notes\' example: 25 goes between <b>20</b> (temp) and <b>30</b>. newnode = new Node() with data 25, not linked yet.', ar: 'من مثال الـ notes: الـ 25 هتتحط بين الـ 20 (الـ temp) والـ 30. الـ newnode اتعملت بالـ new وفيها 25 ولسه مش متوصلة.' };
    if (kind === 'sg') {
      st.nodes.forEach(x => { delete x.p; }); push(first);
      push({ cur: 0, k: 1, hot: ['w.n'], en: '<code>newnode->next = temp->next;</code> 25 now points on to 30.', ar: 'الـ 25 بقت بتشاور على الـ 30:' + LC('newnode->next = temp->next;') }, s => { get(s, 'w').n = 'b'; });
      push({ cur: 1, k: 2, hot: ['t.n'], en: '<code>temp->next = newnode;</code> 20 now points to 25. Done: a singly list changes <b>2 links</b>.', ar: 'الـ 20 بقت بتشاور على الـ 25، وكده خلصنا. الـ singly list بتغيّر <b>2 links</b> بس:' + LC('temp->next = newnode;') }, s => { get(s, 't').n = 'w'; });
      return S;
    }
    push(first);
    push({ cur: 0, k: 1, hot: ['w.n'], en: '<code>newnode->next = temp->next;</code> 25\'s next points to 30.', ar: 'الـ next بتاع الـ 25 بقى بيشاور على الـ 30:' + LC('newnode->next = temp->next;') }, s => { get(s, 'w').n = 'b'; });
    push({ cur: 1, k: 2, hot: ['w.p'], en: '<code>newnode->prev = temp;</code> 25\'s prev points back to 20: a link the singly list does not have.', ar: 'الـ prev بتاع الـ 25 بقى بيشاور على الـ 20، وده link مش موجود في الـ singly list:' + LC('newnode->prev = temp;') }, s => { get(s, 'w').p = 't'; });
    push({ cur: 2, k: 3, hot: ['b.p'], en: '<code>temp->next->prev = newnode;</code> 30\'s prev, which pointed to 20, now points back to 25.', ar: 'الـ prev بتاع الـ 30 كان بيشاور على الـ 20، دلوقتي بقى بيشاور على الـ 25:' + LC('temp->next->prev = newnode;') }, s => { get(s, 'b').p = 'w'; });
    push({ cur: 3, k: 4, hot: ['t.n'], en: '<code>temp->next = newnode;</code> 20 now points to 25. A doubly list changes <b>4 links</b>, both next and prev; and every node pays the <b>extra memory</b> of its prev pointer.', ar: 'الـ 20 بقت بتشاور على الـ 25. الـ doubly list بتغيّر <b>4 links</b>، الـ next والـ prev، وكمان كل node بتدفع <b>memory زيادة</b> للـ prev pointer بتاعها:' + LC('temp->next = newnode;') }, s => { get(s, 't').n = 'w'; });
    return S;
  }
  function L8LinkCost({ ar }) {
    const [kind, setKind] = useState('db');
    const S = costSteps(kind), [i, ctl] = useWalk(S.length, 2300, kind), s = S[i];
    const lines = kind === 'sg' ? ['newnode->next = temp->next;', 'temp->next = newnode;'] : ['newnode->next = temp->next;', 'newnode->prev = temp;', 'temp->next->prev = newnode;', 'temp->next = newnode;'];
    return html`<figure className="fig dsv8"><div className="fig-stage">
      <${Modes} list=${[['sg', 'Singly: insert after temp'], ['db', 'Doubly: insert after temp']]} mode=${kind} set=${setKind} />
      <${Code} lines=${lines} cur=${s.cur} />
      <${Legend} single=${kind === 'sg'} />
      <${DList} st=${s.st} single=${kind === 'sg'} hot=${s.hot} dots=${true} />
      <div className="dsv8-tally">Links changed: ${s.k} of ${lines.length}</div></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1] slides 5–7: Node(), Linkedlist(), isEmpty, isFull ── */
  const CLS = ['Linkedlist() { head = NULL; }', 'bool isEmpty()', '{ if (head == NULL) return true;', '  else return false; }', 'bool isFull()', '{ Node *newnode = new Node();', '  if (newnode == NULL) return true;', '  else return false; }', 'Node() { data = 0;', '         next = NULL;', '         prev = NULL; }'];
  const CLS_S = [
    { cur: 0, head: 1, en: '<code>Linkedlist L;</code> runs the constructor: <code>head = NULL</code>. The list starts with no nodes.', ar: 'لما نعمل object من الـ Linkedlist الـ constructor بيشتغل ويخلي الـ head قيمته NULL، فالـ list بتبدأ من غير nodes:' + LC('Linkedlist() { head = NULL; }') },
    { cur: [1, 2], head: 1, ret: 'isEmpty() → true', en: '<code>isEmpty()</code>: head == NULL, so it returns <b>true</b>.', ar: 'الـ ' + DC('isEmpty()') + ' بتلاقي الـ head قيمته NULL فبترجّع <b>true</b>.' },
    { cur: [4, 5, 8, 9, 10], node: 1, en: '<code>isFull()</code> tries <code>new Node()</code>. The Node constructor sets <b>data = 0</b>, <b>next = NULL</b>, <b>prev = NULL</b>.', ar: 'الـ ' + DC('isFull()') + ' بتجرّب تعمل node جديدة بالـ new، والـ constructor بتاع الـ Node بيحط القيم دي:' + L('data = 0, next = NULL, prev = NULL') },
    { cur: [6, 7], node: 1, ret: 'isFull() → false', en: 'newnode is not NULL (memory was available), so <code>isFull()</code> returns <b>false</b>. It would be true only if new failed.', ar: 'الـ newnode مش NULL لأن الـ memory كانت متاحة، فالـ ' + DC('isFull()') + ' بترجّع <b>false</b>. وكانت هترجّع true بس لو الـ new فشلت.' }
  ];
  function L8NodeClass({ ar }) {
    const [i, ctl] = useWalk(CLS_S.length, 2400, 0), s = CLS_S[i];
    return html`<figure className="fig dsv8"><div className="fig-stage">
      <${Code} lines=${CLS} cur=${s.cur} />
      <div className="dsv8-slots">
        <div className="dsv8-slot">head<span className=${i === 0 ? 'hot' : ''}>NULL</span></div>
        ${s.node && html`<div className="dsv8-slot dsv8-pop">newnode<span>→</span></div>`}</div>
      ${s.node && html`<div className="dsv8-pop"><p className="dsv8-leg">prev | data | next</p><div className="dsv8-list"><div className="dsv8-nd"><div className="dsv8-box"><span className=${i === 2 ? 'hot' : ''}>NULL</span><span className=${'dv' + (i === 2 ? ' hot' : '')}>0</span><span className=${i === 2 ? 'hot' : ''}>NULL</span></div></div></div></div>`}
      ${s.ret && html`<${Out} rows=${[['returns', s.ret]]} />`}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${CLS_S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [3] insertsorted (safe version) on the notes' example 30, 10, 20, 5, 40, 25 ── */
  const SORT_CODE = ['if (isEmpty())', '   head = newnode;', 'else if (item < head->data)', '{  newnode->next = head;', '   head->prev = newnode;', '   head = newnode;  }', 'else', '{  Node *temp = head;', '   while (temp->next != NULL &&', '      temp->next->data < item)', '      temp = temp->next;', '   newnode->next = temp->next;', '   newnode->prev = temp;', '   if (temp->next != NULL)', '      temp->next->prev = newnode;', '   temp->next = newnode;  }'];
  const SORT_EX = '30, 10, 20, 5, 40, 25';
  const parseNums = (s, max) => (String(s).match(/-?\d+/g) || []).slice(0, max).map(x => Math.max(-999, Math.min(9999, parseInt(x, 10))));
  function sortedSteps(vals) {
    let st = { nodes: [], tags: { head: null } }; const S = [];
    const outs = s => [['Forward', fwd(s).join(' ') || '(empty)'], ['Backward', bwd(s).join(' ') || '(empty)']];
    S.push({ st: clone(st), cur: -1, out: outs(st), en: `Start: an empty list (head = NULL). Next inserts ${vals.join(', ')} one by one, each in its order.`, ar: 'البداية: list فاضية والـ head قيمته NULL. كل Next بيضيف رقم من دول في مكانه بالترتيب:' + L(vals.join(', ')) });
    vals.forEach(x => {
      const before = clone(st), id = 'k' + (UID++), nn = { id, v: x, p: null, n: null }, h = get(st, st.tags.head);
      let o;
      if (!h) {
        st.nodes.push(nn); st.tags.head = id;
        o = { cur: [0, 1], en: `insertsorted(${x}): the list is empty, so <code>head = newnode</code>.`, ar: 'نضيف ' + D(x) + '. الـ list فاضية، فالـ head بيشاور على الـ newnode على طول:' + LC('head = newnode;') };
      } else if (x < h.v) {
        nn.n = h.id; h.p = id; st.tags.head = id; st.nodes.unshift(nn);
        o = { cur: [2, 3, 4, 5], slide: 1, en: `insertsorted(${x}): ${x} &lt; ${h.v} (head's data), so it becomes the <b>new first node</b>: its next is the old head, the old head's prev points back to it, head moves to it. <b>The slide's version fails here</b> (it never changes head).`, ar: 'نضيف ' + D(x) + '، وهو أصغر من الـ data بتاعة الـ head اللي هي ' + D(h.v) + '، فبيبقى <b>أول node</b>:' + LC('newnode->next = head; head->prev = newnode; head = newnode;') + '<b>ونسخة الـ slide بتبوظ هنا</b> لأنها عمرها ما بتغيّر الـ head.' };
      } else {
        let t = h; const path = [h.v];
        while (t.n != null && get(st, t.n).v < x) { t = get(st, t.n); path.push(t.v); }
        const nx = t.n == null ? null : get(st, t.n);
        nn.n = t.n; nn.p = t.id; if (nx) nx.p = id; t.n = id; st.nodes.splice(st.nodes.indexOf(t) + 1, 0, nn);
        const walk = path.length > 1 ? 'الـ temp بيمشي من الـ head:' + L(path.join(' → ')) + 'ويقف عند ' + D(t.v) : 'الـ temp بيفضل عند الـ head اللي هو ' + D(t.v);
        const walkEn = path.length > 1 ? `temp walks ${path.join(' → ')} and stops at ${t.v}` : `temp stays at head (${t.v})`;
        o = nx
          ? { cur: [7, 8, 9, 10, 11, 12, 13, 14, 15], temp: t.id, en: `insertsorted(${x}): ${walkEn}, because the next node (${nx.v}) is not smaller than ${x}. ${x} goes between ${t.v} and ${nx.v}: <b>4 links</b> change.`, ar: 'نضيف ' + D(x) + '. ' + walk + ' لأن الـ node اللي بعده قيمتها ' + D(nx.v) + ' ومش أصغر من ' + D(x) + '. فالـ ' + D(x) + ' بتدخل بين ' + D(t.v) + ' و ' + D(nx.v) + ' وبيتغيّر <b>4 links</b>.' }
          : { cur: [7, 8, 9, 10, 11, 12, 13, 15], temp: t.id, slide: 1, en: `insertsorted(${x}): ${walkEn}, the last node. ${x} becomes the <b>last node</b>: its next stays NULL, so the <code>if</code> skips <code>temp->next->prev</code>. <b>The slide's version fails here</b> (newnode->next->prev on NULL).`, ar: 'نضيف ' + D(x) + '. ' + walk + ' وده آخر node، فالـ ' + D(x) + ' بتبقى <b>آخر node</b> والـ next بتاعها بيفضل NULL، فالـ if بتمنع السطر ' + DC('temp->next->prev') + '. <b>ونسخة الـ slide بتبوظ هنا</b> لأنها بتكتب في ' + DC('NULL->prev') + '.' };
      }
      order(st);
      const snap = clone(st); if (o.temp) snap.tags = Object.assign({}, snap.tags, { temp: o.temp });
      S.push(Object.assign({ st: snap, hot: diffHot(before, st), out: outs(st) }, o));
    });
    const L1 = S[S.length - 1];
    if (vals.length) S.push(Object.assign({}, L1, { cur: -1, hot: [], slide: 0, st: clone(st), en: `Done. Forward: <b>${fwd(st).join(' ')}</b>; backward (following prev): <b>${bwd(st).join(' ')}</b>.`, ar: 'خلصنا. لقدام بتطبع:' + L(fwd(st).join(' ')) + 'ولورا بالـ prev بتطبع:' + L(bwd(st).join(' ')) }));
    return S;
  }
  function L8InsertSorted({ ar }) {
    const [txt, setTxt] = useState(SORT_EX);
    const vals = parseNums(txt, 7), S = sortedSteps(vals), [i, ctl] = useWalk(S.length, 2600, vals.join(',')), s = S[i];
    return html`<figure className="fig dsv8"><div className="fig-stage">
      <div className="dsv8-row"><label className="dsv8-lbl">Values to insert (up to 7)<input className="dsv8-in" value=${txt} onChange=${e => setTxt(e.target.value)} /></label>
        <button className="fig-btn" onClick=${() => setTxt(SORT_EX)}>Example from the notes</button></div>
      <${Code} lines=${SORT_CODE} cur=${s.cur} />
      <${Legend} />
      <${DList} st=${s.st} hot=${s.hot || []} />
      <${Out} rows=${s.out} /></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [4] slides 13–14: deletefrombeginning, deletefromend, and the one-node case ── */
  const DEL_CODE = {
    beg: ['Node *temp = head;', 'value = head->data;', 'head = head->next;', 'head->prev = NULL;', 'delete(temp);', 'return (value);'],
    end: ['Node *temp1 = head;', 'while (temp1->next != NULL)', '   temp1 = temp1->next;', 'value = temp1->data;', 'temp1->prev->next = NULL;', 'delete temp1;', 'return (value);'],
    one: ['Node *temp = head;', 'value = head->data;', 'head = head->next;', 'head->prev = NULL;  // slide', 'if (head != NULL)   // safe', '   head->prev = NULL;', 'delete(temp);', 'return (value);']
  };
  function delSteps(m) {
    const st = mkList(m === 'one' ? [1] : [1, 2, 3]), ids = st.nodes.map(x => x.id), S = [];
    const push = (o, f) => { if (f) f(st); S.push(Object.assign({ st: clone(st), gone: [] }, o)); };
    if (m === 'beg') {
      push({ cur: 0, en: 'deletefrombeginning() on the slide 3 list 1, 2, 3. <code>temp = head</code> keeps the first node so it can be deleted later.', ar: 'الـ ' + DC('deletefrombeginning()') + ' على الـ list بتاعة slide 3. الـ temp بيمسك أول node عشان نمسحها بعدين:' + LC('Node *temp = head;') }, s => { s.tags.temp = ids[0]; });
      push({ cur: 1, val: 1, on: [ids[0]], en: '<code>value = head->data;</code> value = 1.', ar: 'الـ value بتاخد الـ data بتاعة أول node، يعني 1:' + LC('value = head->data;') });
      push({ cur: 2, hot: [], en: '<code>head = head->next;</code> head moves to node 2. Node 2\'s prev still points to node 1.', ar: 'الـ head بيتنقل للـ node التانية، بس الـ prev بتاعها لسه بيشاور على الأولى:' + LC('head = head->next;') }, s => { s.tags.head = ids[1]; });
      push({ cur: 3, hot: [ids[1] + '.p'], en: '<code>head->prev = NULL;</code> the new first node\'s prev becomes NULL: the step a singly list does not need.', ar: 'الـ prev بتاع أول node جديدة بقى NULL، ودي الخطوة اللي الـ singly list مش محتاجاها:' + LC('head->prev = NULL;') }, s => { get(s, ids[1]).p = null; });
      push({ cur: 4, gone: [ids[0]], en: '<code>delete(temp);</code> frees the old first node.', ar: 'الـ ' + DC('delete(temp)') + ' بتحرر الـ node اللي كانت أولى.' });
      push({ cur: 5, val: 1, ret: 1, en: '<code>return (value);</code> returns <b>1</b>. The list is now 2, 3 (backward 3, 2).', ar: 'الـ function بترجّع <b>1</b>، والـ list بقت كده:' + L('2 3') + 'ولورا بتتقري:' + L('3 2') }, s => { s.nodes.shift(); delete s.tags.temp; });
    } else if (m === 'end') {
      push({ cur: 0, en: 'deletefromend() (slide 14) on the list 1, 2, 3. <code>temp1 = head</code>.', ar: 'الـ ' + DC('deletefromend()') + ' من slide 14 على نفس الـ list، والـ temp1 بيبدأ من الـ head:' + LC('Node *temp1 = head;') }, s => { s.tags.temp1 = ids[0]; });
      push({ cur: [1, 2], en: 'temp1->next is not NULL: <code>temp1 = temp1->next</code>, node 2.', ar: 'الـ next بتاع الـ temp1 مش NULL، فالـ temp1 بيمشي للتانية:' + LC('temp1 = temp1->next;') }, s => { s.tags.temp1 = ids[1]; });
      push({ cur: [1, 2], en: 'Again: temp1 reaches node 3. Its next is NULL, so the loop stops at the <b>last node</b>.', ar: 'وتاني، الـ temp1 بيوصل للتالتة، والـ next بتاعها NULL فالـ loop بيقف عند <b>آخر node</b>.' }, s => { s.tags.temp1 = ids[2]; });
      push({ cur: 3, val: 3, on: [ids[2]], en: '<code>value = temp1->data;</code> value = 3.', ar: 'الـ value بتاخد الـ data بتاعة آخر node، يعني 3:' + LC('value = temp1->data;') });
      push({ cur: 4, hot: [ids[1] + '.n'], en: '<code>temp1->prev->next = NULL;</code> thanks to prev, we reach node 2 directly from temp1 and cut its next. (A singly list needs a second pointer, temp2, for this.)', ar: 'بفضل الـ prev بنوصل للـ node التانية من الـ temp1 على طول ونخلي الـ next بتاعها NULL. والـ singly list كانت محتاجة pointer تاني اسمه temp2 عشان كده:' + LC('temp1->prev->next = NULL;') }, s => { get(s, ids[1]).n = null; });
      push({ cur: 5, gone: [ids[2]], en: '<code>delete temp1;</code> frees the last node.', ar: 'الـ ' + DC('delete temp1') + ' بتحرر آخر node.' });
      push({ cur: 6, val: 3, ret: 3, en: '<code>return (value);</code> returns <b>3</b>. The list is now 1, 2.', ar: 'الـ function بترجّع <b>3</b>، والـ list بقت كده:' + L('1 2') }, s => { s.nodes.pop(); delete s.tags.temp1; });
    } else {
      push({ cur: [0, 1], val: 1, en: 'deletefrombeginning() when the list has <b>only one node</b> (1): temp = head, value = 1.', ar: 'الـ ' + DC('deletefrombeginning()') + ' لما الـ list فيها <b>node واحدة بس</b>، والـ value بقت 1:' + LC('Node *temp = head; value = head->data;') }, s => { s.tags.temp = ids[0]; });
      push({ cur: 2, en: '<code>head = head->next;</code> the only node\'s next is NULL, so head becomes <b>NULL</b>.', ar: 'الـ next بتاع الـ node الوحيدة NULL، فالـ head بقى <b>NULL</b>:' + LC('head = head->next;') }, s => { s.tags.head = null; });
      push({ cur: -1, bad: 3, crash: 1, en: '<code>head->prev = NULL;</code> as on the slide would now use a NULL pointer: the program <b>crashes</b>. The notes add a check.', ar: 'السطر بتاع الـ slide ده دلوقتي بيستخدم NULL pointer فالبرنامج <b>بيقع</b>، وعشان كده الـ notes زوّدت check:' + LC('head->prev = NULL;') });
      push({ cur: [4, 5], en: 'Safe version: <code>if (head != NULL) head->prev = NULL;</code> head is NULL, so the line is skipped.', ar: 'النسخة الآمنة بتشيّك الأول، والـ head هنا NULL فالسطر بيتنط:' + LC('if (head != NULL) head->prev = NULL;') });
      push({ cur: 6, gone: [ids[0]], en: '<code>delete(temp);</code> frees the node.', ar: 'الـ ' + DC('delete(temp)') + ' بتحرر الـ node.' });
      push({ cur: 7, val: 1, ret: 1, en: 'Returns <b>1</b>; the list is empty again (head = NULL).', ar: 'الـ function بترجّع <b>1</b> والـ list رجعت فاضية والـ head قيمته NULL.' }, s => { s.nodes = []; delete s.tags.temp; });
    }
    return S;
  }
  function L8DeleteEnds({ ar }) {
    const [m, setM] = useState('beg');
    const S = delSteps(m), [i, ctl] = useWalk(S.length, 2300, m), s = S[i];
    const vk = S.slice(0, i + 1).filter(x => x.val != null).pop(), rows = [['value', vk ? String(vk.val) : '?']]; if (s.ret != null) rows.push(['returns', String(s.ret)]);
    return html`<figure className="fig dsv8"><div className="fig-stage">
      <${Modes} list=${[['beg', 'deletefrombeginning()'], ['end', 'deletefromend()'], ['one', 'only one node']]} mode=${m} set=${setM} mono=${true} />
      <${Code} lines=${DEL_CODE[m]} cur=${s.cur} bad=${s.bad} />
      <${Legend} />
      <${DList} st=${s.st} hot=${s.hot || []} on=${s.on || []} gone=${s.gone} />
      ${s.crash ? html`<${Out} rows=${[['', 'crash: head is NULL, so head->prev does not exist']]} bad=${true} />` : html`<${Out} rows=${rows} />`}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [5] removeAll (exam 2024/25 pattern) ── */
  const RA_CODE = ['if (isEmpty())', '{ cout << "List is empty" << endl;', '  return; }', 'while (head != NULL)', '{  Node *temp = head;', '   head = head->next;', '   if (head != NULL) head->prev = NULL;', '   delete temp;  }'];
  function raSteps(m) {
    const S = [];
    if (m === 'empty') {
      const st = { nodes: [], tags: { head: null } };
      S.push({ st, cur: [0, 1, 2], out: 'List is empty', en: 'On an empty list <code>isEmpty()</code> is true: it prints <b>List is empty</b> and returns. The exam asks for this check.', ar: 'لو الـ list فاضية الـ ' + DC('isEmpty()') + ' بترجّع true، فبتطبع الرسالة دي وترجع. والامتحان طالب الـ check ده:' + L('List is empty') });
      return S;
    }
    const st = mkList([1, 2, 3]), ids = st.nodes.map(x => x.id);
    const push = (o, f) => { if (f) f(st); S.push(Object.assign({ st: clone(st), gone: [] }, o)); };
    push({ cur: [0, 3], en: 'removeAll() on the list 1, 2, 3: not empty, and head != NULL, so the loop starts.', ar: 'الـ ' + DC('removeAll()') + ' على الـ list دي: مش فاضية والـ head مش NULL، فالـ loop بيبدأ.' });
    ids.forEach((id, k) => {
      const nx = ids[k + 1];
      push({ cur: [4, 5], en: `<code>temp = head; head = head->next;</code> temp keeps node ${k + 1}, head moves ${nx ? 'to node ' + (k + 2) : 'to NULL'}.`, ar: 'الـ temp بيمسك الـ node رقم ' + D(k + 1) + ' والـ head بيتنقل ' + (nx ? 'للي بعدها' : 'لـ NULL') + ':' + LC('temp = head; head = head->next;') }, s => { s.tags.temp = id; s.tags.head = nx || null; });
      if (nx) push({ cur: 6, hot: [nx + '.p'], en: `<code>if (head != NULL) head->prev = NULL;</code> the new first node (${k + 2}) must not point back to the node being deleted.`, ar: 'الـ node اللي بقت أولى مينفعش تفضل بتشاور على الـ node اللي هتتمسح، فالـ prev بتاعها بيبقى NULL:' + LC('if (head != NULL) head->prev = NULL;') }, s => { get(s, nx).p = null; });
      else push({ cur: 6, en: 'head is NULL now, so the <code>if</code> skips <code>head->prev</code> (without this check the program would crash).', ar: 'الـ head بقى NULL، فالـ if بتنط السطر ده، ومن غير الـ check ده البرنامج كان هيقع:' + LC('head->prev = NULL;') });
      push({ cur: 7, gone: [id], en: `<code>delete temp;</code> frees node ${k + 1}.`, ar: 'الـ ' + DC('delete temp') + ' بتحرر الـ node رقم ' + D(k + 1) + '.' }, null);
      st.nodes = st.nodes.filter(x => x.id !== id); delete st.tags.temp;
    });
    push({ cur: 3, en: 'head == NULL: the loop stops. Every node was deleted and the list is empty.', ar: 'الـ head بقى NULL فالـ loop وقف، وكل الـ nodes اتمسحت والـ list بقت فاضية.' });
    return S;
  }
  function L8RemoveAll({ ar }) {
    const [m, setM] = useState('ex');
    const S = raSteps(m), [i, ctl] = useWalk(S.length, 1900, m), s = S[i];
    return html`<figure className="fig dsv8"><div className="fig-stage">
      <${Modes} list=${[['ex', 'List 1, 2, 3'], ['empty', 'Empty list']]} mode=${m} set=${setM} />
      <${Code} lines=${RA_CODE} cur=${s.cur} />
      <${DList} st=${s.st} hot=${s.hot || []} gone=${s.gone || []} />
      ${s.out && html`<${Out} rows=${[['Output', s.out]]} />`}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [6.0]–[6.2] Lab 8 with a tail pointer: insertLast, removeLast, displayBackward ── */
  const TAIL_CODE = {
    ins: ['Node *newnode = new Node();', 'newnode->data = 30;', 'newnode->prev = tail;', 'tail->next = newnode;', 'tail = newnode;'],
    rem: ['Node *delnode = tail;', 'tail->prev->next = NULL;', 'tail = tail->prev;', 'delete delnode;'],
    back: ['Node *temp = tail;', 'while (temp != NULL)', '{  cout << temp->data << " ";', '   temp = temp->prev;  }']
  };
  function tailSteps(m) {
    const S = [];
    if (m === 'ins') {
      const st = mkList([10, 20]), ids = st.nodes.map(x => x.id); st.tags.tail = ids[1];
      const push = (o, f) => { if (f) f(st); S.push(Object.assign({ st: clone(st) }, o)); };
      push({ cur: -1, en: 'Lab main, third call: <code>insertLast(30)</code> on the list 10, 20. head and tail point to the two ends.', ar: 'تالت سطر في الـ main بتاع الـ lab بيضيف 30 في الآخر على الـ list دي، والـ head والـ tail بيشاوروا على الطرفين:' + LC('insertLast(30);') });
      push({ cur: [0, 1], hot: ['w.v', 'w.p', 'w.n'], en: 'A new node with data 30, prev and next NULL.', ar: 'فيه node جديدة فيها 30، والـ prev والـ next بتوعها NULL.' }, s => { s.nodes.push({ id: 'w', v: 30, p: null, n: null }); s.tags.newnode = 'w'; });
      push({ cur: 2, hot: ['w.p'], en: '<code>newnode->prev = tail;</code> 30 points back to 20. No loop: tail <b>already</b> points to the last node.', ar: 'الـ 30 بقت بتشاور لورا على الـ 20، ومن غير loop لأن الـ tail <b>أصلًا</b> بيشاور على آخر node:' + LC('newnode->prev = tail;') }, s => { get(s, 'w').p = ids[1]; });
      push({ cur: 3, hot: [ids[1] + '.n'], en: '<code>tail->next = newnode;</code> 20 points on to 30.', ar: 'الـ 20 بقت بتشاور لقدام على الـ 30:' + LC('tail->next = newnode;') }, s => { get(s, ids[1]).n = 'w'; });
      push({ cur: 4, en: '<code>tail = newnode;</code> tail moves to 30. The list is 10 20 30.', ar: 'الـ tail اتنقل للـ 30، والـ list بقت كده:' + L('10 20 30') }, s => { s.tags.tail = 'w'; delete s.tags.newnode; });
    } else if (m === 'rem') {
      const st = mkList([100, 10, 20, 30]), ids = st.nodes.map(x => x.id); st.tags.tail = ids[3];
      const push = (o, f) => { if (f) f(st); S.push(Object.assign({ st: clone(st), gone: [] }, o)); };
      push({ cur: -1, en: 'Lab main: <code>removeLast</code> on the list 100, 10, 20, 30.', ar: 'في الـ main بتاع الـ lab بنشيل آخر node بالـ ' + DC('removeLast') + ' من الـ list دي:' + L('100 10 20 30') });
      push({ cur: 0, en: '<code>delnode = tail;</code> delnode keeps the last node, 30.', ar: 'الـ delnode بيمسك آخر node اللي هي 30:' + LC('Node *delnode = tail;') }, s => { s.tags.delnode = ids[3]; });
      push({ cur: 1, hot: [ids[2] + '.n'], en: '<code>tail->prev->next = NULL;</code> through prev we reach 20 at once and cut its next. No walk from head.', ar: 'عن طريق الـ prev بنوصل للـ 20 على طول ونخلي الـ next بتاعها NULL، من غير ما نمشي من الـ head:' + LC('tail->prev->next = NULL;') }, s => { get(s, ids[2]).n = null; });
      push({ cur: 2, en: '<code>tail = tail->prev;</code> tail moves back to 20.', ar: 'الـ tail بيرجع خطوة للـ 20:' + LC('tail = tail->prev;') }, s => { s.tags.tail = ids[2]; });
      push({ cur: 3, gone: [ids[3]], en: '<code>delete delnode;</code> frees 30. The list is 100 10 20.', ar: 'الـ ' + DC('delete delnode') + ' بتحرر الـ 30، والـ list بقت كده:' + L('100 10 20') });
    } else {
      const st = mkList([100, 10, 20]), ids = st.nodes.map(x => x.id); st.tags.tail = ids[2];
      const out = [];
      S.push({ st: clone(st), cur: -1, out: '', en: 'displayBackward on the list 100, 10, 20: it starts at <b>tail</b>, not head.', ar: 'الـ ' + DC('displayBackward') + ' على الـ list دي بتبدأ من الـ <b>tail</b> مش من الـ head:' + L('100 10 20') });
      [2, 1, 0].forEach((k, j) => {
        out.push(st.nodes[k].v); const s2 = clone(st); s2.tags.temp = ids[k];
        S.push({ st: s2, cur: j ? [2, 3] : [0, 2], on: [ids[k]], hot: j ? [ids[k + 1] + '.p'] : [], out: out.join(' '), en: j ? `<code>temp = temp->prev</code>: ${st.nodes[k].v}. Print it.` : 'temp = tail: 20. Print it.', ar: j ? 'الـ temp بيرجع ورا الـ prev للـ ' + D(st.nodes[k].v) + ' ونطبعها.' : 'الـ temp بيبدأ من الـ tail، يعني 20، ونطبعها.' });
      });
      const s3 = clone(st); s3.tags.temp = null;
      S.push({ st: s3, cur: 1, hot: [ids[0] + '.p'], out: out.join(' '), en: 'The first node\'s prev is NULL: the loop stops. Output <b>20 10 100</b>. This is only possible because every node has a <b>prev</b> pointer.', ar: 'الـ prev بتاع أول node قيمته NULL فالـ loop بيقف، والناتج' + L('20 10 100') + 'وده ممكن بس عشان كل node فيها <b>prev</b> pointer.' });
    }
    return S;
  }
  function L8TailOps({ ar }) {
    const [m, setM] = useState('ins');
    const S = tailSteps(m), [i, ctl] = useWalk(S.length, 2200, m), s = S[i];
    return html`<figure className="fig dsv8"><div className="fig-stage">
      <${Modes} list=${[['ins', 'insertLast(30)'], ['rem', 'removeLast()'], ['back', 'displayBackward()']]} mode=${m} set=${setM} mono=${true} />
      <${Code} lines=${TAIL_CODE[m]} cur=${s.cur} />
      <${DList} st=${s.st} hot=${s.hot || []} on=${s.on || []} gone=${s.gone || []} />
      ${m === 'back' && html`<${Out} rows=${[['Printed', s.out || ' ']]} />`}</div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [6.3] the Lab 8 main, call by call, with head and tail ── */
  const LAB_EX = 'insertFirst(10), insertLast(20), insertLast(30), insertFirst(100), insertFirst(200), removeFirst(), removeLast(), insertAtPosition(1000,2), insertAtPosition(2000,4), insertAtPosition(5,1)';
  const parseOps = s => [...String(s).matchAll(/(insertFirst|insertLast|removeFirst|removeLast|insertAtPosition)\s*\(([^)]*)\)/g)].slice(0, 12).map(m => ({ f: m[1], a: parseNums(m[2], 2) }));
  function labSteps(ops) {
    const st = { nodes: [], tags: { head: null, tail: null } }, S = [];
    const outs = s => [['displayForward', fwd(s).join(' ') || '(empty)'], ['displayBackward', bwd(s, s.tags.tail).join(' ') || '(empty)']];
    S.push({ st: clone(st), out: outs(st), call: 'start', en: 'An empty list: head = NULL and tail = NULL. Each Next runs one call of the Lab main.', ar: 'دي list فاضية، والـ head والـ tail الاتنين NULL. كل Next بينفّذ سطر من الـ main بتاع الـ lab.' });
    const link = (a, nn, b) => { nn.p = a ? a.id : null; nn.n = b ? b.id : null; if (a) a.n = nn.id; else st.tags.head = nn.id; if (b) b.p = nn.id; else st.tags.tail = nn.id; st.nodes.push(nn); };
    ops.forEach(op => {
      const before = clone(st), x = op.a[0], N = fwd(st).length, H = get(st, st.tags.head), T = get(st, st.tags.tail);
      const call = op.f + '(' + op.a.join(',') + ')'; let en, a, warn = 0;
      const mk = () => ({ id: 'k' + (UID++), v: x == null ? 0 : x, p: null, n: null });
      if ((op.f === 'insertFirst' || op.f === 'insertLast' || op.f === 'insertAtPosition') && x == null) { en = `${call}: no value given, skipped.`; a = 'السطر ده مفيهوش قيمة فاتنط.'; warn = 1; }
      else if (op.f === 'insertFirst' || (op.f === 'insertAtPosition' && op.a[1] === 1)) {
        link(null, mk(), H);
        en = `${call}: ${x} becomes the first node${H ? `; the old first node (${H.v}) points back to it with prev` : '; it is also the last, so tail points to it too'}; head moves to it.`;
        a = H ? 'الـ ' + D(x) + ' بقت أول node، والـ prev بتاع الـ ' + D(H.v) + ' بقى بيشاور عليها، والـ head اتنقل لها.' : 'الـ ' + D(x) + ' بقت أول node وآخر node، فالـ head والـ tail الاتنين بيشاوروا عليها.';
      } else if (op.f === 'insertLast' || (op.f === 'insertAtPosition' && op.a[1] === N + 1)) {
        link(T, mk(), null);
        if (T) { en = `${call}: ${x} goes after the tail (${T.v}) with no loop: newnode->prev = tail; tail->next = newnode; tail = newnode.`;
          a = 'الـ ' + D(x) + ' بتتحط في الآخر من غير loop، والـ tail بيتنقل لها:' + LC('newnode->prev = tail; tail->next = newnode; tail = newnode;'); }
        else { en = `${call}: the list is empty, so ${x} becomes the only node: head and tail both point to it.`;
          a = 'الـ list فاضية، فالـ ' + D(x) + ' بقت الـ node الوحيدة والـ head والـ tail الاتنين بيشاوروا عليها.'; }
      } else if (op.f === 'insertAtPosition') {
        const p = op.a[1], ord = order(clone(st)).nodes;
        if (p == null || p < 1 || p > N + 1) { en = `${call}: position ${p} is outside 1 to ${N + 1}, nothing is inserted.`; a = 'الـ position ده بره الـ list فمفيش حاجة اتضافت.'; warn = 1; }
        else { const A = get(st, ord[p - 2].id), B = get(st, ord[p - 1].id); link(A, mk(), B);
          en = `${call}: walk to node ${p - 1} (${A.v}), counting current from 1, and link ${x} between ${A.v} and ${B.v}, so it becomes node ${p}.`;
          a = 'بنمشي لحد الـ node رقم ' + D(p - 1) + ' (عدّ الـ current من 1)، ونحط الـ ' + D(x) + ' بين ' + D(A.v) + ' و ' + D(B.v) + '، فتبقى الـ node رقم ' + D(p) + '.'; }
      } else if (op.f === 'removeFirst') {
        if (!H) { en = `${call}: the list is empty.`; a = 'الـ list فاضية فمفيش حاجة تتشال.'; warn = 1; }
        else { const nx = get(st, H.n); st.nodes = st.nodes.filter(y => y !== H); st.tags.head = nx ? nx.id : null; if (nx) nx.p = null; else st.tags.tail = null;
          en = `${call}: ${H.v} is removed; head moves to ${nx ? nx.v + ' and its prev becomes NULL' : 'NULL'}.`; a = 'الـ ' + D(H.v) + ' اتشالت والـ head اتنقل ' + (nx ? 'للـ ' + D(nx.v) + ' والـ prev بتاعها بقى NULL.' : 'لـ NULL.'); }
      } else {
        if (!T) { en = `${call}: the list is empty.`; a = 'الـ list فاضية فمفيش حاجة تتشال.'; warn = 1; }
        else { const pv = get(st, T.p); st.nodes = st.nodes.filter(y => y !== T); st.tags.tail = pv ? pv.id : null; if (pv) pv.n = null; else st.tags.head = null;
          en = `${call}: tail->prev->next = NULL; tail = tail->prev; ${T.v} is deleted and tail moves back to ${pv ? pv.v : 'NULL'}.` + (pv ? '' : ' (With one node tail->prev is NULL: the lab code needs a check here.)');
          a = 'الـ ' + D(T.v) + ' اتمسحت والـ tail رجع ' + (pv ? 'للـ ' + D(pv.v) + '.' : 'لـ NULL، ومع node واحدة الـ prev بتاع الـ tail بيبقى NULL فكود الـ lab محتاج check هنا.'); }
      }
      order(st);
      const res = fwd(st).join(' ');
      S.push({ st: clone(st), hot: diffHot(before, st), out: outs(st), call, warn, en: en + (warn ? '' : ` List: <b>${res || '(empty)'}</b>.`), ar: a + (warn ? '' : ' الـ list بقت:' + L(res || 'NULL')) });
    });
    return S;
  }
  function L8LabMain({ ar }) {
    const [txt, setTxt] = useState(LAB_EX);
    const ops = parseOps(txt), S = labSteps(ops), [i, ctl] = useWalk(S.length, 2300, JSON.stringify(ops)), s = S[i];
    const chip = html`<${Code} lines=${[s.call === 'start' ? 'Linkedlist list;' : 'list.' + s.call + ';']} cur=${0} />`;
    return html`<figure className="fig dsv8"><div className="fig-stage">
      <div className="dsv8-row"><label className="dsv8-lbl">Calls (insertFirst, insertLast, removeFirst, removeLast, insertAtPosition)<textarea className="dsv8-in" rows="4" spellCheck="false" value=${txt} onChange=${e => setTxt(e.target.value)}></textarea></label>
        <button className="fig-btn" onClick=${() => setTxt(LAB_EX)}>Example from the notes</button></div>
      ${chip}
      <${Legend} />
      <${DList} st=${s.st} hot=${s.hot || []} />
      <${Out} rows=${s.out} bad=${s.warn} /></div>
      <${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, {
    'ds-l8-travel': L8Travel, 'ds-l8-node-anatomy': L8NodeAnatomy, 'ds-l8-link-cost': L8LinkCost, 'ds-l8-node-class': L8NodeClass,
    'ds-l8-insert-sorted': L8InsertSorted, 'ds-l8-delete-ends': L8DeleteEnds, 'ds-l8-remove-all': L8RemoveAll,
    'ds-l8-tail-ops': L8TailOps, 'ds-l8-lab-main': L8LabMain
  });
})();
/* ── part L10 ── */
// Data Structures visuals, Lecture 10 (Searching Techniques: Hashing): slide 3's key → hash function → index pipeline (store and retrieve), slide 4's collision figure, the four hash function types (slides 6–9), the division exercise and its collision (slides 10–12, with the quiz tables), the two quadratic formulas side by side (slides 18–20), probe sequences of linear / quadratic / double hashing (slides 14, 18, 21), the linear probing search (slide 17), and open addressing vs separate chaining when the table fills up (slide 24). The insertion animations themselves are viz.js's (not redone here). Every label and number comes from the site's notes and the slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm } = window.FIGKIT;
  const CSS = `
.dsv10 *{ font-variant-ligatures:none; }
.dsv10 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dsv10 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv10-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.dsv10-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dsv10-row{ display:flex; flex-wrap:wrap; gap:6px 8px; justify-content:center; align-items:center; margin:10px 0 0; }
.dsv10-in{ font:.9rem var(--mono); width:72px; padding:4px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:32px; box-sizing:border-box; }
.dsv10-in.sm{ width:50px; } .dsv10-in.wide{ width:170px; } .dsv10-in.keys{ width:100%; max-width:280px; font-size:.8rem; }
.dsv10-lbl{ font-size:.82rem; color:var(--graphite); }
.dsv10-wrap{ display:flex; flex-wrap:wrap; gap:10px; justify-content:center; align-items:flex-start; }
.dsv10-tbl{ display:grid; grid-template-columns:34px 52px; border:1px solid var(--line); border-radius:6px; overflow:hidden; background:var(--paper); font:.82rem/1 var(--mono); color:var(--ink); flex:none; }
.dsv10-tbl > b{ grid-column:1 / -1; font:700 .78rem/1.3 var(--body); color:var(--graphite); text-align:center; padding:4px 2px; background:var(--paper-2); border-bottom:1px solid var(--line); }
.dsv10-tbl > i{ font:600 .76rem/22px var(--body); font-style:normal; color:var(--graphite); text-align:center; border-bottom:1px solid var(--line); }
.dsv10-tr{ display:contents; }
.dsv10-tr span{ height:24px; display:grid; place-items:center; border-bottom:1px solid var(--line); transition:background .35s, box-shadow .35s; }
.dsv10-tr span:first-child{ color:var(--graphite); border-right:1px solid var(--line); background:var(--paper-2); }
.dsv10-tr span:last-child{ font-weight:700; }
.dsv10-tr:last-child span{ border-bottom:0; }
.dsv10-tr.new span:last-child{ background:color-mix(in srgb, var(--ok) 30%, var(--paper)); }
.dsv10-tr.hit span:last-child{ background:color-mix(in srgb, var(--pen) 22%, var(--paper)); box-shadow:inset 0 0 0 2px var(--pen); }
.dsv10-tr.look span:last-child{ box-shadow:inset 0 0 0 2px var(--fig-k); background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.dsv10-tr.dim span:last-child{ color:var(--faint); }
.dsv10-pt{ display:block; font:700 .8rem/1.3 var(--body); color:var(--graphite); margin:0 0 4px; text-align:center; }
.dsv10-ch{ flex:1 1 200px; max-width:330px; min-width:0; border:1px solid var(--line); border-radius:6px; background:var(--paper); padding:5px 6px; }
.dsv10-cr{ display:flex; flex-wrap:wrap; align-items:center; gap:2px 0; min-height:26px; border-radius:4px; padding:1px 2px; transition:background .35s; }
.dsv10-cr.look{ background:color-mix(in srgb, var(--fig-k) 16%, var(--paper)); }
.dsv10-ci{ font:.78rem var(--mono); color:var(--graphite); width:30px; flex:none; }
.dsv10-cn{ display:inline-flex; align-items:center; }
.dsv10-cn i, .dsv10-nl i{ font-style:normal; color:var(--fig-k); padding:0 3px; font-size:.85rem; }
.dsv10-nb{ min-width:26px; height:22px; padding:0 4px; box-sizing:border-box; display:grid; place-items:center; border:2px solid var(--fig-k); border-radius:4px; font:700 .8rem var(--mono); color:var(--ink); background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
.dsv10-nb.new{ box-shadow:0 0 0 2px var(--ok); }
.dsv10-nl{ display:inline-flex; align-items:center; font:600 .76rem var(--mono); color:var(--graphite); }
.dsv10-calc{ flex:1 1 120px; max-width:300px; min-width:0; margin:0; padding:0; list-style:none; display:grid; gap:3px; align-content:start; font:.8rem/1.35 var(--mono); color:var(--ink); text-align:left; direction:ltr; }
.dsv10-calc li{ padding:2px 6px; border-radius:5px; border:1px solid var(--line); background:var(--paper); overflow-wrap:anywhere; }
.dsv10-calc li.cur{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.dsv10-calc li.bad{ color:var(--pen); font-weight:700; }
.dsv10-calc li.good{ color:var(--ok); font-weight:700; }
.dsv10-calc li.head{ border:0; background:transparent; font:700 .78rem var(--body); color:var(--graphite); padding:0 2px; }
.dsv10-msg{ font-size:.82rem; line-height:1.35; margin:6px 0 0; min-height:1.3em; color:var(--graphite); text-align:center; }
.dsv10-msg.bad{ color:var(--pen); font-weight:700; } .dsv10-msg.good{ color:var(--ok); font-weight:700; }
.dsv10-pair{ display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:10px; max-width:620px; margin:0 auto; }
.dsv10-panel{ border:1px solid var(--line); border-radius:10px; background:var(--paper); padding:8px 6px; color:var(--ink); min-width:0; }
.dsv10-panel > b{ display:block; font-size:.84rem; margin-bottom:6px; text-align:center; }
.dsv10-panel > b bdi{ font-family:var(--mono); font-weight:600; }
.dsv10-pipe{ display:grid; grid-template-columns:1fr 20px 1fr 20px 1fr; align-items:stretch; max-width:460px; margin:0 auto 12px; }
.dsv10-pb{ border:1.5px solid var(--ink); background:var(--paper); padding:6px 4px; text-align:center; display:flex; flex-direction:column; justify-content:center; gap:4px; min-width:0; }
.dsv10-pb small{ font:.76rem/1.2 var(--body); color:var(--graphite); }
.dsv10-pb strong{ font:700 1rem var(--mono); color:var(--ink); }
.dsv10-pb em{ font:normal .78rem var(--mono); color:var(--ink); overflow-wrap:anywhere; }
.dsv10-pa{ display:grid; place-items:center; color:var(--fig-k); font-size:1.15rem; }
.dsv10-flow .dsv10-pb{ animation:dsv10-lit .6s ease both; }
.dsv10-flow .dsv10-pa{ animation:dsv10-fade .4s ease both; }
.dsv10-flow > :nth-child(2){ animation-delay:.35s; } .dsv10-flow > :nth-child(3){ animation-delay:.6s; } .dsv10-flow > :nth-child(4){ animation-delay:.95s; } .dsv10-flow > :nth-child(5){ animation-delay:1.2s; }
@keyframes dsv10-lit{ from{ opacity:.25; box-shadow:0 0 0 0 var(--fig-k); } 60%{ opacity:1; box-shadow:0 0 0 4px color-mix(in srgb, var(--fig-k) 45%, transparent); } to{ opacity:1; box-shadow:none; } }
@keyframes dsv10-fade{ from{ opacity:0; } to{ opacity:1; } }
.dsv10-op{ display:inline-block; font:700 .78rem var(--mono); color:#fff; background:var(--fig-s); border-radius:99px; padding:2px 8px; margin:0 auto 8px; }
.dsv10-center{ text-align:center; }
.dsv10-svg text{ font-family:var(--mono); }
.dsv10-svg .dsv10-lb{ fill:var(--graphite); }
.dsv10-svg .dsv10-show{ transition:opacity .45s; } .dsv10-svg .dsv10-show.off{ opacity:0; }
.dsv10-digits{ display:flex; flex-wrap:wrap; justify-content:center; gap:3px; margin:4px 0 8px; direction:ltr; }
.dsv10-dg{ width:24px; height:30px; display:grid; place-items:center; border:1px solid var(--line); border-radius:5px; background:var(--paper); font:700 .95rem var(--mono); color:var(--faint); transition:background .35s, color .35s; }
.dsv10-dg.on{ color:var(--ink); background:color-mix(in srgb, var(--fig-k) 28%, var(--paper)); border-color:var(--fig-k); }
.dsv10-dg.g2{ color:var(--ink); background:color-mix(in srgb, var(--ok) 24%, var(--paper)); border-color:var(--ok); }
.dsv10-dg.gap{ margin-right:8px; }
.dsv10-lines{ max-width:360px; margin:0 auto; display:grid; gap:4px; font:.84rem/1.4 var(--mono); color:var(--ink); text-align:center; direction:ltr; }
.dsv10-lines > div{ padding:3px 8px; border-radius:6px; background:var(--paper); border:1px solid var(--line); overflow-wrap:anywhere; animation:dsv10-up .45s ease both; }
.dsv10-lines > div:nth-child(2){ animation-delay:.5s; } .dsv10-lines > div:nth-child(3){ animation-delay:1s; } .dsv10-lines > div:nth-child(4){ animation-delay:1.5s; }
.dsv10-lines > div.out{ font-weight:700; border-color:var(--fig-k); background:color-mix(in srgb, var(--fig-k) 18%, var(--paper)); }
@keyframes dsv10-up{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:none; } }
.dsv10-strip{ display:grid; gap:2px; margin:2px 0 0; direction:ltr; }
.dsv10-strip span{ height:24px; display:grid; place-items:center; border:1px solid var(--line); border-radius:4px; background:var(--paper-2); font:700 .76rem var(--mono); color:var(--ink); min-width:0; transition:background .3s, box-shadow .3s; }
.dsv10-strip span.v{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.dsv10-strip span.cur{ box-shadow:inset 0 0 0 2px var(--pen); }
.dsv10-strip.ix span{ height:auto; border:0; background:transparent; font:.76rem var(--mono); color:var(--graphite); }
.dsv10-seq{ border:1px solid var(--line); border-radius:8px; background:var(--paper); padding:6px; margin:0 0 8px; }
.dsv10-seq > b{ display:block; font-size:.82rem; color:var(--ink); }
.dsv10-seq > code{ display:block; font:.78rem/1.4 var(--mono); color:var(--graphite); margin-top:3px; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv10-seq > p{ margin:3px 0 0; font-size:.78rem; color:var(--graphite); }
@media (max-width:420px){ .dsv10-pipe{ grid-template-columns:1fr 16px 1fr 16px 1fr; } }
@media (prefers-reduced-motion: reduce){ .dsv10-flow .dsv10-pb, .dsv10-flow .dsv10-pa, .dsv10-lines > div{ animation:none; } .dsv10-tr span, .dsv10-cr, .dsv10-dg, .dsv10-strip span, .dsv10-svg .dsv10-show{ transition:none; } }`;
  if (!document.getElementById('dsv10-css')) { const s = document.createElement('style'); s.id = 'dsv10-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* helpers */
  const L = s => `<span class="ltr">${s}</span>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const D = s => `<bdi dir="ltr">${esc(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const nums = (t, max) => (String(t).match(/\d+/g) || []).slice(0, max || 10).map(x => Math.min(99999, parseInt(x, 10)));
  const isPrime = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  const primeBelow = m => { for (let p = m - 1; p >= 2; p--) if (isPrime(p)) return p; return 1; };
  function useWalk(n, ms, key) {
    const [i, setI] = useState(calm() ? n - 1 : 0), [play, setPlay] = useState(!calm()), first = useRef(true);
    useEffect(() => { if (first.current) { first.current = false; return; } setI(calm() ? n - 1 : 0); setPlay(!calm()); }, [key]);
    useEffect(() => { if (!play) return; if (i >= n - 1) { setPlay(false); return; } const t = setTimeout(() => setI(x => x + 1), ms); return () => clearTimeout(t); }, [i, play, n]);
    const j = Math.max(0, Math.min(i, n - 1));
    return [j, { replay: () => { setI(0); setPlay(!calm()); }, go: k => { setPlay(false); setI(k); } }];
  }
  const SBar = ({ n, i, ctl }) => html`<div className="fig-bar">
    <div className="fig-dots" aria-hidden="true">${n <= 16 && Array.from({ length: n }, (_, j) => html`<i key=${j} className=${j <= i ? 'on' : ''}></i>`)}</div>
    <span className="grow"></span>
    <button className="fig-btn" onClick=${() => ctl.go(Math.max(0, i - 1))} disabled=${i === 0} aria-label="Previous step">‹ Back</button>
    <button className="fig-btn" onClick=${() => ctl.go(Math.min(n - 1, i + 1))} disabled=${i >= n - 1} aria-label="Next step">Next ›</button>
    <button className="fig-btn" onClick=${ctl.replay}>↻ Replay</button></div>`;
  // the slides' vertical "Index | Value" table; cls: { [row]: 'new' | 'hit' | 'look' }
  const Tbl = ({ m, vals, cls, title }) => html`<div className="dsv10-tbl">${title && html`<b>${title}</b>`}<i>Index</i><i>Value</i>
    ${Array.from({ length: m }, (_, k) => html`<div key=${k} className=${'dsv10-tr ' + ((cls && cls[k]) || '')}><span>${k}</span><span>${vals[k] == null ? '' : vals[k]}</span></div>`)}</div>`;
  // separate chaining: [r] → a → b → NULL; nw = [row, position] of the newest node
  const Chains = ({ m, ch, hot, nw, title }) => html`<div className="dsv10-ch">${title && html`<b className="dsv10-pt">${title}</b>`}
    ${Array.from({ length: m }, (_, r) => html`<div key=${r} className=${'dsv10-cr' + (hot === r ? ' look' : '')}><span className="dsv10-ci">[${r}]</span>
      ${(ch[r] || []).map((v, j) => html`<span key=${j} className="dsv10-cn"><i>→</i><span className=${'dsv10-nb' + (nw && nw[0] === r && nw[1] === j ? ' new' : '')}>${v}</span></span>`)}
      <span className="dsv10-nl"><i>→</i>NULL</span></div>`)}</div>`;

  /* ── [0.2] slide 3: key → hash function → index, used to store and to retrieve ── */
  const PM = 7, PIPE_EX = [{ op: 'store', k: 18 }, { op: 'store', k: 72 }, { op: 'store', k: 34 }, { op: 'find', k: 72 }];
  function pipeMsg(o) {
    if (!o) return { en: `A hash table of size ${PM}: indexes 0 to ${PM - 1}. Here the hash function is H(k) = k mod ${PM} (the division method, as in the lecture's examples). It turns every key into one of these indexes.`, ar: `ده hash table حجمه ${D(PM)}، يعني indexes من ${D(0)} لـ ${D(PM - 1)}. والـ hash function هنا هي` + L(`H(k) = k mod ${PM}`) + `(الـ division method زي أمثلة المحاضرة)، وبتحوّل أي key لـ index من دول.` };
    const { op, k, idx, v, res } = o, calc = `H(${k}) = ${k} mod ${PM} = ${idx}`;
    if (res === 'stored') return { en: `Store ${k}: ${calc}, so ${k} goes into cell ${idx}.`, ar: `نخزّن ${D(k)}، والـ hash function بتحسب` + L(calc) + `فالـ key ده بيتحط في الخانة ${D(idx)}.` };
    if (res === 'same') return { en: `Store ${k}: ${calc}, and cell ${idx} already holds ${k}.`, ar: `نخزّن ${D(k)}، والحساب` + L(calc) + `والخانة ${D(idx)} فيها ${D(k)} أصلًا.` };
    if (res === 'coll') return { en: `Store ${k}: ${calc}, but cell ${idx} already holds ${v}. Two different keys, same cell: a <b>collision</b> (next visual). This plain table cannot store ${k}.`, ar: `نحاول نخزّن ${D(k)}، والحساب` + L(calc) + `لكن الخانة ${D(idx)} فيها ${D(v)} أصلًا. يعني اتنين keys مختلفين على نفس الخانة، وده اسمه <b>collision</b> (الرسمة اللي جاية). والـ table البسيط ده مش هيقدر يخزّن ${D(k)}.` };
    if (res === 'found') return { en: `Retrieve ${k}: the <b>same</b> hash function gives ${calc}. Cell ${idx} holds ${k}: found at once, no need to look anywhere else.`, ar: `نسترجع ${D(k)}، ونفس الـ hash function بالظبط بتدّي` + L(calc) + `والخانة ${D(idx)} فيها ${D(k)}، يعني لقيناه على طول من غير ما ندوّر في أي مكان تاني.` };
    if (res === 'empty') return { en: `Retrieve ${k}: ${calc}. Cell ${idx} is empty, so ${k} was never stored.`, ar: `نسترجع ${D(k)}، والحساب` + L(calc) + `والخانة ${D(idx)} فاضية، يعني ${D(k)} عمره ما اتخزن.` };
    return { en: `Retrieve ${k}: ${calc}. Cell ${idx} holds ${v}, not ${k}, so ${k} is not in this table.`, ar: `نسترجع ${D(k)}، والحساب` + L(calc) + `والخانة ${D(idx)} فيها ${D(v)} مش ${D(k)}، يعني ${D(k)} مش في الـ table ده.` };
  }
  function buildPipe(ops) {
    const vals = Array(PM).fill(null), S = [{ o: null, vals: vals.slice(), ...pipeMsg(null) }];
    for (const x of ops) {
      const idx = x.k % PM, v = vals[idx]; let res;
      if (x.op === 'store') { if (v == null) { vals[idx] = x.k; res = 'stored'; } else res = v === x.k ? 'same' : 'coll'; }
      else res = v === x.k ? 'found' : v == null ? 'empty' : 'other';
      const o = { ...x, idx, v, res };
      S.push({ o, vals: vals.slice(), ...pipeMsg(o) });
    }
    return S;
  }
  function Pipeline({ ar }) {
    const [ops, setOps] = useState(PIPE_EX), [txt, setTxt] = useState('25');
    const S = buildPipe(ops), [i, ctl] = useWalk(S.length, 2400, 0), st = S[i], o = st.o;
    const add = op => { const k = nums(txt, 1)[0]; if (k == null || ops.length >= 14) return; const nx = ops.concat({ op, k }); setOps(nx); ctl.go(nx.length); };
    const cls = o ? { [o.idx]: o.res === 'stored' || o.res === 'found' ? 'new' : o.res === 'empty' ? 'look' : o.res === 'same' ? 'new' : 'hit' } : {};
    return html`<figure className="fig dsv10"><div className="fig-stage">
      <div className=${'dsv10-pipe' + (o ? ' dsv10-flow' : '')} key=${i}>
        <div className="dsv10-pb"><small>KEY or Element</small><strong>${o ? o.k : 'k'}</strong></div><span className="dsv10-pa">⇒</span>
        <div className="dsv10-pb"><small>HASH FUNCTION</small><em>${o ? o.k + ' mod ' + PM : 'k mod ' + PM}</em></div><span className="dsv10-pa">⇒</span>
        <div className="dsv10-pb"><small>Hash Address or Hash Table Index</small><strong>${o ? o.idx : '0…' + (PM - 1)}</strong></div></div>
      <div className="dsv10-center">${o && html`<span className="dsv10-op">${o.op === 'store' ? 'store ' + o.k : 'retrieve ' + o.k}</span>`}</div>
      <div className="dsv10-wrap"><${Tbl} m=${PM} vals=${st.vals} cls=${cls} /></div>
      <div className="dsv10-row"><span className="dsv10-lbl">Try your own key</span><input className="dsv10-in" inputMode="numeric" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="key" />
        <button className="fig-btn solid" onClick=${() => add('store')}>Store</button><button className="fig-btn" onClick=${() => add('find')}>Retrieve</button>
        <button className="fig-btn" onClick=${() => { setOps(PIPE_EX); ctl.replay(); }}>↻ Example</button></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [0.3] slide 4: keys k and j mapped to the same cell ── */
  const COLL = [
    { en: 'Slide 4\'s picture: three records with keys <b>k</b>, <b>j</b> and <b>i</b>, and a hash table whose cells are empty.', ar: 'رسمة slide 4: تلات records بالـ keys دي <b>k</b> و<b>j</b> و<b>i</b>، وhash table كل خاناته فاضية.' },
    { en: 'The hash function h maps k to cell <b>h(k)</b>; it is empty, so k is stored there.', ar: 'الـ hash function h بتودّي k على الخانة <b><bdi dir="ltr">h(k)</bdi></b>، وهي فاضية، فالـ k بيتخزن فيها.' },
    { en: 'h maps i to cell <b>h(i)</b>; it is empty too, so i is stored there.', ar: 'والـ h بتودّي i على الخانة <b><bdi dir="ltr">h(i)</bdi></b>، وهي كمان فاضية، فالـ i بيتخزن فيها.' },
    { en: 'h maps j to the <b>same cell as k</b>: h(j) = h(k). Two different keys, one cell: this situation is called a <b>collision</b>.', ar: 'الـ h بتودّي j على <b>نفس خانة الـ k</b>، يعني' + L('h(j) = h(k)') + 'اتنين keys مختلفين على خانة واحدة، والحالة دي اسمها <b>collision</b>.' },
    { en: 'The slide then sends j on: the next try, <b>h1(j)</b>, lands on i\'s cell, which is taken too.', ar: 'وبعدين الـ slide بتبعت j لمكان تاني: المحاولة اللي بعدها <b><bdi dir="ltr">h1(j)</bdi></b> بتيجي على خانة الـ i، وهي كمان مش فاضية.' },
    { en: 'One more try, <b>h2(j)</b>, finds an empty cell and j is stored. Finding another cell for a colliding key is what the collision resolution techniques (below) do.', ar: 'ومحاولة كمان <b><bdi dir="ltr">h2(j)</bdi></b> بتلاقي خانة فاضية فالـ j بيتخزن. والدوّارة دي على خانة تانية للـ key اللي عمل collision هي شغل الـ collision resolution techniques (تحت).' }
  ];
  function CollisionFig({ ar }) {
    const [i, ctl] = useWalk(COLL.length, 2300, 0);
    const RY = r => 14 + r * 32, RC = r => RY(r) + 16, show = on => 'dsv10-show' + (on ? '' : ' off');
    const cell = { 1: i >= 1 ? 'k' : '', 3: i >= 2 ? 'i' : '', 5: i >= 5 ? 'j' : '' };
    const hit = { 1: i === 3, 3: i === 4 }, newR = { 1: i === 1, 3: i === 2, 5: i === 5 };
    const fillOf = r => hit[r] ? 'color-mix(in srgb, var(--pen) 24%, var(--paper))' : newR[r] ? 'color-mix(in srgb, var(--ok) 30%, var(--paper))' : cell[r] ? 'color-mix(in srgb, var(--fig-k) 16%, var(--paper))' : 'var(--paper)';
    const key = (y, t) => html`<g><rect x="4" y=${y - 13} width="26" height="26" fill="var(--paper)" stroke="var(--pen)" strokeWidth="1.5" /><rect x="30" y=${y - 13} width="38" height="26" fill="var(--paper)" stroke="var(--fig-k)" strokeWidth="1.5" /><text x="17" y=${y + 5} textAnchor="middle" fontSize="15" fontWeight="700">${t}</text></g>`;
    return html`<figure className="fig dsv10"><div className="fig-stage">
      <svg className="dsv10-svg" viewBox="0 0 300 248" role="img" aria-label="Keys k and j hashed to the same cell: a collision">
        <defs><marker id="dsv10-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--fig-k)" /></marker>
          <marker id="dsv10-ahr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--pen)" /></marker></defs>
        ${key(24, 'k')}${key(120, 'j')}${key(214, 'i')}
        ${Array.from({ length: 7 }, (_, r) => html`<g key=${r}><rect x="150" y=${RY(r)} width="80" height="32" fill=${fillOf(r)} stroke=${hit[r] ? 'var(--pen)' : 'var(--line)'} strokeWidth=${hit[r] ? 2.5 : 1} /><line x1="178" y1=${RY(r)} x2="178" y2=${RY(r) + 32} stroke="var(--line)" strokeDasharray="3 3" /><text x="164" y=${RC(r) + 5} textAnchor="middle" fontSize="15" fontWeight="700">${cell[r] || ''}</text></g>`)}
        <text x="146" y=${RC(1) + 5} textAnchor="end" fontSize="13" className=${'dsv10-lb ' + show(i >= 1)}>h(k)</text>
        <text x="146" y=${RC(3) + 5} textAnchor="end" fontSize="13" className=${'dsv10-lb ' + show(i >= 2)}>h(i)</text>
        <line x1="70" y1="30" x2="110" y2=${RC(1) - 4} stroke="var(--fig-k)" strokeWidth="2" markerEnd="url(#dsv10-ah)" className=${show(i >= 1)} />
        <line x1="70" y1="208" x2="110" y2=${RC(3) + 4} stroke="var(--fig-k)" strokeWidth="2" markerEnd="url(#dsv10-ah)" className=${show(i >= 2)} />
        <line x1="70" y1="114" x2="110" y2=${RC(1) + 4} stroke="var(--pen)" strokeWidth="2" markerEnd="url(#dsv10-ahr)" className=${show(i >= 3)} />
        <path d=${`M234,${RC(1)} Q264,${(RC(1) + RC(3)) / 2} 234,${RC(3)}`} fill="none" stroke="var(--pen)" strokeWidth="2" markerEnd="url(#dsv10-ahr)" className=${show(i >= 4)} />
        <text x="256" y=${(RC(1) + RC(3)) / 2 + 5} fontSize="13" className=${show(i >= 4)}>h1(j)</text>
        <path d=${`M234,${RC(3)} Q264,${(RC(3) + RC(5)) / 2} 234,${RC(5)}`} fill="none" stroke="var(--pen)" strokeWidth="2" markerEnd="url(#dsv10-ahr)" className=${show(i >= 5)} />
        <text x="256" y=${(RC(3) + RC(5)) / 2 + 5} fontSize="13" className=${show(i >= 5)}>h2(j)</text>
        <text x="190" y=${RC(1) + 5} fontSize="13" fontWeight="700" fill="var(--pen)" style=${{ fill: 'var(--pen)' }} className=${show(i === 3)}>j?</text>
        <text x="190" y=${RC(3) + 5} fontSize="13" fontWeight="700" style=${{ fill: 'var(--pen)' }} className=${show(i === 4)}>j?</text>
      </svg>
      <p className=${'dsv10-msg' + (i === 3 ? ' bad' : '')}>${i === 3 ? 'h(j) = h(k): collision' : i >= 4 ? 'j looks for another cell' : ' '}</p></div>
      <${Cap} en=${COLL[i].en} ar=${COLL[i].ar} showAr=${ar} /><${SBar} n=${COLL.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [1] slides 6–9: truncation, folding, mid square, division ── */
  const METH = [
    { id: 'trunc', t: 'Truncation', ex: ['987456', '125978', '963294'] },
    { id: 'fold', t: 'Folding', ex: ['143765980'] },
    { id: 'mid', t: 'Mid square', ex: ['456', '978'] },
    { id: 'div', t: 'Division', ex: ['5', '17', '37', '20', '42', '3'] }
  ];
  function methodCalc(id, raw, opt) {
    const s = String(raw).replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, id === 'mid' ? 5 : 12) || '0';
    const o = opt || {};
    if (id === 'trunc') {
      const left = o.side === 'left', short = s.length <= 3, t = short ? s : left ? s.slice(0, 3) : s.slice(-3), a = parseInt(t, 10);
      const on = s.split('').map((_, j) => short || (left ? j < 3 : j >= s.length - 3) ? 'on' : '');
      const lines = short ? [`${s} has 3 digits or fewer`, `hash address = ${a}`] : [`table size 1000 → keep 3 digits`, `${left ? 'leftmost' : 'rightmost'} 3 digits of ${s} = ${t}`, `hash address = ${a}`];
      const en = short ? `${s} has 3 digits or fewer, so for a table of size 1000 the whole key is the hash address: ${a}.` : `The table has size 1000, so only 3 digits are kept: the ${left ? 'leftmost' : 'rightmost'} 3 digits of ${s} are ${t}, hash address ${a}. Simplest method, but only part of the key counts, so different keys that share those digits collide: more collisions.`;
      const arr = short ? `الـ key ${D(s)} فيه 3 أرقام أو أقل، فلو الـ table حجمه ${D(1000)} الـ key كله هو الـ hash address، يعني ${D(a)}.` : `الـ table حجمه ${D(1000)}، فبناخد 3 أرقام بس. ${left ? 'أول' : 'آخر'} 3 أرقام من ${D(s)} هما ${D(t)}، يعني الـ hash address هو ${D(a)}. دي أسهل طريقة، لكن جزء بس من الـ key هو اللي بيفرق، فأي keys بتشترك في الأرقام دي بتعمل collision، يعني الـ collisions بتبقى أكتر.`;
      return { s, digits: s.split(''), on, lines, en, ar: arr };
    }
    if (id === 'fold') {
      const g = s.match(/.{1,3}/g), sum = g.reduce((x, y) => x + parseInt(y, 10), 0);
      const on = []; g.forEach((p, j) => p.split('').forEach((_, q) => on.push((j % 2 ? 'g2' : 'on') + (q === p.length - 1 && j < g.length - 1 ? ' gap' : ''))));
      const lines = [`groups: ${g.map(p => '(' + p + ')').join(' + ')}`, `${g.join(' + ')} = ${sum}`, `hash address = ${sum}`];
      if (sum > 999) lines.push(`small table (size 1000): last 3 digits = ${sum % 1000}`);
      const en = `Break ${s} into groups of 3 digits and add them: ${g.join(' + ')} = ${sum}. ` + (sum > 999 ? `You can use ${sum} as it is; if the table is small (say size 1000), truncate to the last 3 digits: ${sum % 1000}.` : `${sum} is the hash address.`);
      const arr = `قسّم ${D(s)} لمجموعات كل واحدة 3 أرقام، واجمعهم:` + L(`${g.join(' + ')} = ${sum}`) + (sum > 999 ? `وممكن تستخدم الناتج زي ما هو كـ hash address، ولو الـ table صغير (حجمه ${D(1000)} مثلًا) خد آخر 3 أرقام بس، يعني ${D(sum % 1000)}.` : `والناتج ده هو الـ hash address.`);
      return { s, digits: s.split(''), on, lines, en, ar: arr };
    }
    if (id === 'mid') {
      const k = parseInt(s, 10), sq = String(k * k), n = sq.length, st = n <= 2 ? 0 : Math.floor((n - 2) / 2), mid = sq.slice(st, st + 2), a = parseInt(mid, 10), odd = n > 2 && n % 2 === 1;
      const lines = [`${k}² = ${k} × ${k} = ${sq}`, `middle 2 digits of ${sq} = ${mid}`, `hash address = ${a}`];
      const en = `Square the key: ${k}² = ${sq}. Take the middle 2 digits: ${mid}, the hash address.` + (odd ? ` (${sq} has an odd number of digits, so there is no exact middle pair: this takes digits ${st + 1} and ${st + 2}.)` : '') + ' The slide allows 2 or 3 middle digits; its examples take 2.';
      const arr = `ربّع الـ key:` + L(`${k}² = ${sq}`) + `وخد الرقمين اللي في النص، يعني ${D(mid)}، وده الـ hash address.` + (odd ? ` (عدد أرقام ${D(sq)} فردي فمفيش رقمين في النص بالظبط، فهنا خدنا الرقم رقم ${D(st + 1)} والرقم رقم ${D(st + 2)}.)` : '') + ' والـ slide بتقول رقمين أو تلاتة، وأمثلتها بتاخد رقمين.';
      return { s: String(k), digits: sq.split(''), on: sq.split('').map((_, j) => j >= st && j < st + 2 ? 'on' : ''), lines, en, ar: arr };
    }
    const k = parseInt(s, 10), m = Math.max(2, Math.min(99, o.m || 9)), q = Math.floor(k / m), r = k % m;
    const lines = [`${k} = ${q} × ${m} + ${r}`, `${k} mod ${m} = ${r}`, `hash address = ${r}`];
    return { s: String(k), m, digits: String(k).split(''), on: String(k).split('').map(() => 'on'), lines, en: `Divide by the table size ${m} and keep the remainder: ${k} = ${q} × ${m} + ${r}, so ${k} mod ${m} = ${r} is the hash address. One of the best methods.`, ar: `بنقسم على حجم الـ table ${D(m)} وناخد الباقي:` + L(`${k} = ${q} × ${m} + ${r}`) + `يعني` + L(`${k} mod ${m} = ${r}`) + `والباقي ده هو الـ hash address. ودي من أحسن الطرق.` };
  }
  function Methods({ ar }) {
    const [mi, setMi] = useState(0), [txt, setTxt] = useState('987456'), [key, setKey] = useState('987456'), [side, setSide] = useState('right'), [m, setM] = useState(9), [mt, setMt] = useState('9');
    const M = METH[mi], c = methodCalc(M.id, key, { side, m });
    const pick = j => { setMi(j); setTxt(METH[j].ex[0]); setKey(METH[j].ex[0]); if (METH[j].id === 'div') { setM(9); setMt('9'); } };
    const load = v => { setTxt(v); setKey(v); };
    const run = () => { const d = String(txt).replace(/\D/g, ''); if (d) setKey(d); if (M.id === 'div') { const z = nums(mt, 1)[0]; if (z >= 2 && z <= 99) setM(z); } };
    return html`<figure className="fig dsv10"><div className="fig-stage">
      <div className="dsv10-modes">${METH.map((x, j) => html`<button key=${x.id} className="fig-btn" aria-pressed=${mi === j} onClick=${() => pick(j)}>${x.t}</button>`)}</div>
      <div className="dsv10-modes"><span className="dsv10-lbl">Slide keys:</span>${M.ex.map(v => html`<button key=${v} className="fig-btn" aria-pressed=${key === v && (M.id !== 'div' || m === 9)} onClick=${() => { load(v); if (M.id === 'div') { setM(9); setMt('9'); } }}>${v}</button>`)}
        ${M.id === 'trunc' && html`<button className="fig-btn" aria-pressed=${side === 'left'} onClick=${() => setSide(side === 'left' ? 'right' : 'left')}>${side === 'left' ? 'leftmost' : 'rightmost'} 3</button>`}</div>
      <div className="dsv10-center"><span className="dsv10-lbl">${M.id === 'mid' ? 'key ' + c.s + ' squared:' : 'key:'}</span></div>
      <div className="dsv10-digits" key=${M.id + key + side + m}>${c.digits.map((d, j) => html`<span key=${j} className=${'dsv10-dg ' + (c.on[j] || '')}>${d}</span>`)}</div>
      <div className="dsv10-lines" key=${'l' + M.id + key + side + m}>${c.lines.map((t, j) => html`<div key=${j} className=${/^hash address/.test(t) ? 'out' : ''}>${t}</div>`)}</div>
      <div className="dsv10-row"><span className="dsv10-lbl">Try your own key</span><input className="dsv10-in wide" inputMode="numeric" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="key" />
        ${M.id === 'div' && html`<span className="dsv10-lbl">size</span><input className="dsv10-in sm" inputMode="numeric" value=${mt} onChange=${e => setMt(e.target.value)} aria-label="table size" />`}
        <button className="fig-btn solid" onClick=${run}>Hash</button></div></div>
      <${Cap} en=${c.en} ar=${c.ar} showAr=${ar} /></figure>`;
  }

  /* ── [1] slides 10–12 (and the quiz tables): division method, then a collision ── */
  const DIV_MODES = [
    { t: 'Slides 10–12 (size 9)', keys: [5, 17, 37, 20, 42, 3, 11], m: 9 },
    { t: 'Quiz: size 11', keys: [14, 17, 25, 37, 34, 16], m: 11 },
    { t: 'Quiz: size 5', keys: [25, 42, 96, 101, 102, 162, 197], m: 5 }
  ];
  function buildDiv(keys, m) {
    const tb = Array(m).fill(null), ch = Array.from({ length: m }, () => []), calc = [], S = [];
    let coll = false;
    const snap = (x) => S.push({ tb: tb.slice(), ch: ch.map(c => c.slice()), calc: calc.slice(), coll, ...x });
    snap({ en: `Store ${keys.join(', ')} in an array of size ${m} using the division method: address = k mod ${m}.`, ar: `عايزين نخزّن القيم دي في array حجمها ${D(m)} بالـ division method:` + L(keys.join(', ')) + `والعنوان هو` + L(`k mod ${m}`) });
    keys.forEach(k => {
      const a = k % m, v = tb[a], c = `${k} mod ${m} = ${a}`;
      if (v == null) {
        tb[a] = k; ch[a].push(k); calc.push({ t: c });
        snap({ cls: { [a]: 'new' }, hot: a, nw: [a, 0], en: `${c}: cell ${a} is empty, so ${k} goes there.`, ar: `الحساب:` + L(c) + `والخانة ${D(a)} فاضية، فالـ ${D(k)} بيتحط فيها.` });
        return;
      }
      const first = !coll; coll = true; calc.push({ t: c + ' → collision', bad: true });
      snap({ cls: { [a]: 'hit' }, hot: a, en: `${c}, but cell ${a} already holds ${v}: a <b>collision situation</b>.` + (first ? ' The division method alone cannot store it: a collision resolution technique is needed. Two of them are shown next.' : ''), ar: `الحساب:` + L(c) + `لكن الخانة ${D(a)} فيها ${D(v)} أصلًا، ودي <b>collision situation</b>.` + (first ? ' الـ division method لوحدها مش هتعرف تخزّنه، ومحتاجين collision resolution technique، واتنين منهم جايين دلوقتي.' : '') });
      const probes = []; let slot = null;
      for (let i = 1; i < m; i++) { const p = (a + i) % m; probes.push(p); if (tb[p] == null) { slot = p; break; } }
      const last = ch[a][ch[a].length - 1]; ch[a].push(k);
      if (slot != null) tb[slot] = k;
      calc.push({ t: slot != null ? `linear: ${probes.join(', ')} → ${slot}` : 'linear: table full', good: slot != null, bad: slot == null });
      const cls = { [a]: 'hit' }; probes.forEach(p => { cls[p] = p === slot ? 'new' : 'look'; });
      snap({ cls, hot: a, nw: [a, ch[a].length - 1],
        en: (slot != null ? `<b>Linear probing</b> tries the next cells ${probes.join(', ')} and puts ${k} in cell ${slot}.` : `<b>Linear probing</b> tries every other cell (${probes.join(', ')}): the table is full, so ${k} cannot be stored.`) + ` <b>Separate chaining</b> just links ${k} into chain [${a}], after ${last}.`,
        ar: (slot != null ? `الـ <b>linear probing</b> بيجرب الخانات اللي بعدها` + L(probes.join(', ')) + `وبيحط ${D(k)} في الخانة ${D(slot)}.` : `الـ <b>linear probing</b> بيجرب كل الخانات التانية` + L(probes.join(', ')) + `والـ table مليان، فمش هيقدر يخزّن ${D(k)}.`) + ` أما الـ <b>separate chaining</b> فبيربط ${D(k)} في الـ chain بتاعة الخانة ${D(a)} بعد ${D(last)}.` });
    });
    const order = tb.filter(v => v != null), sorted = order.every((v, j) => !j || order[j - 1] <= v);
    snap({ fin: true, en: `Done. Reading the ${coll ? 'linear probing ' : ''}table from index 0 gives ${order.join(', ')}. ` + (sorted ? 'Here they happen to be in order, but in general a hash table does not keep keys sorted.' : 'Not in sorted order: a hash table does not keep keys in order, positions depend on the hash function.'), ar: `خلصنا. لو قرينا الـ table${coll ? ' بتاع الـ linear probing' : ''} من أول index ${D(0)} هنلاقي:` + L(order.join(', ')) + (sorted ? 'وهنا بالصدفة طلعوا مترتبين، لكن الـ hash table عمومًا مش بيحافظ على ترتيب الـ keys.' : 'ومش مترتبين: الـ hash table مش بيحافظ على ترتيب الـ keys، والأماكن بتعتمد على الـ hash function.') });
    return S;
  }
  function DivisionEx({ ar }) {
    const [cfg, setCfg] = useState({ keys: DIV_MODES[0].keys, m: 9 }), [kt, setKt] = useState(DIV_MODES[0].keys.join(', ')), [mt, setMt] = useState('9');
    const S = buildDiv(cfg.keys, cfg.m), [i, ctl] = useWalk(S.length, 2100, cfg.keys.join() + '/' + cfg.m), st = S[i];
    const load = c => { setCfg({ keys: c.keys, m: c.m }); setKt(c.keys.join(', ')); setMt(String(c.m)); };
    const run = () => { const ks = nums(kt, 10), m = nums(mt, 1)[0]; if (!ks.length || !(m >= 2 && m <= 13)) return; setCfg({ keys: ks, m }); };
    const n = st.calc.length;
    return html`<figure className="fig dsv10"><div className="fig-stage">
      <div className="dsv10-modes">${DIV_MODES.map(c => html`<button key=${c.t} className="fig-btn" aria-pressed=${cfg.m === c.m && cfg.keys.join() === c.keys.join()} onClick=${() => load(c)}>${c.t}</button>`)}</div>
      <div className="dsv10-wrap">
        <ul className="dsv10-calc"><li className="head">use k mod ${cfg.m}</li>${st.calc.map((c, j) => html`<li key=${j} className=${(j === n - 1 && !st.fin ? 'cur ' : '') + (c.bad ? 'bad' : c.good ? 'good' : '')}>${c.t}</li>`)}</ul>
        <${Tbl} m=${cfg.m} vals=${st.tb} cls=${st.cls} title=${st.coll ? 'Linear probing' : 'Division'} />
        ${st.coll && html`<${Chains} m=${cfg.m} ch=${st.ch} hot=${st.hot} nw=${st.nw} title="Separate chaining" />`}</div>
      <div className="dsv10-row"><span className="dsv10-lbl">Try your own keys</span><input className="dsv10-in keys" inputMode="numeric" value=${kt} onChange=${e => setKt(e.target.value)} aria-label="keys" />
        <span className="dsv10-lbl">size</span><input className="dsv10-in sm" inputMode="numeric" value=${mt} onChange=${e => setMt(e.target.value)} aria-label="table size (2 to 13)" />
        <button className="fig-btn solid" onClick=${run}>Run</button></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.2] quadratic probing: the lecture's (h1 + i + i²) vs h + i² ── */
  function quadRun(keys, m, lect) {
    const tb = Array(m).fill(null);
    return keys.map(k => {
      const h = k % m, tries = []; let slot = null;
      for (let i = 0; i < m; i++) { const off = lect ? i + i * i : i * i, p = (h + off) % m; const ok = tb[p] == null; tries.push({ i, off, p, ok }); if (ok) { slot = p; break; } }
      if (slot != null) tb[slot] = k;
      return { k, h, tries, slot, tb: tb.slice() };
    });
  }
  const qLine = (t, h, m, lect) => `i=${t.i}: ` + (t.i === 0 ? `${h}` : `(${h}+${lect ? t.i + '+' + t.i * t.i : t.i * t.i}) mod ${m} = ${t.p}`) + (t.ok ? ' ✓' : ' ✗');
  const qDesc = (r, ar) => {
    const bad = r.tries.filter(t => !t.ok).map(t => t.p);
    if (r.slot == null) return ar ? `مش لاقي خانة فاضية في ${D(r.tries.length)} محاولات` : `finds no empty cell in ${r.tries.length} tries`;
    if (!bad.length) return ar ? `بيروح الخانة ${D(r.slot)} على طول` : `goes straight to slot ${r.slot}`;
    return ar ? `بيعمل collision في ${D(bad.join(', '))} وبعدين بيروح الخانة ${D(r.slot)}` : `collides at ${bad.join(', ')}, then goes to slot ${r.slot}`;
  };
  function buildQuad(keys, m) {
    const A = quadRun(keys, m, true), B = quadRun(keys, m, false), S = [];
    S.push({ j: -1, en: `Keys ${keys.join(', ')} into a table of size ${m}, run with both formulas. The lecture's h(k, i) = (h1(k) + i + i²) mod m adds +2, +6, +12 … after the first try; "h + i²" (h+1, h+4, h+9 …) adds +1, +4, +9 ….`, ar: `نفس الـ keys دي في table حجمه ${D(m)} بالمعادلتين:` + L(keys.join(', ')) + `معادلة المحاضرة بتزوّد على الـ h1 بعد أول محاولة` + L('h(k, i) = (h1(k) + i + i²) mod m → +2, +6, +12, …') + `والمعادلة التانية ${D('h + i²')} بتزوّد` + L('h+1, h+4, h+9, …') });
    keys.forEach((k, j) => {
      const a = A[j], b = B[j], same = a.slot === b.slot && a.tries.length === b.tries.length;
      S.push({ j, en: `Insert ${k} (h1 = ${k} mod ${m} = ${a.h}). Lecture formula: ${qDesc(a)}. h + i²: ${qDesc(b)}.` + (same ? '' : ' <b>Different cells.</b>'), ar: `نضيف ${D(k)} والـ h1 بتاعه` + L(`${k} mod ${m} = ${a.h}`) + `بمعادلة المحاضرة ${qDesc(a, 1)}، وبالمعادلة التانية ${qDesc(b, 1)}.` + (same ? '' : ' <b>خانات مختلفة.</b>') });
    });
    const fa = A[A.length - 1].tb, fb = B[B.length - 1].tb, diff = fa.join() !== fb.join();
    S.push({ j: keys.length - 1, fin: true, en: diff ? 'All keys in, and the two formulas give different tables. So in the exam use the lecture\'s formula, h(k, i) = (h1(k) + i + i²) mod m, and write it down.' : 'All keys in: here both formulas happen to give the same table, but in general they differ. In the exam use the lecture\'s formula, h(k, i) = (h1(k) + i + i²) mod m, and write it down.', ar: (diff ? 'كل الـ keys دخلت، والمعادلتين طلّعوا tables مختلفة. ' : 'كل الـ keys دخلت، وهنا بالصدفة المعادلتين طلّعوا نفس الـ table، لكن عمومًا بيختلفوا. ') + 'فخلي بالك: في الامتحان استخدم معادلة المحاضرة واكتبها:' + L('h(k, i) = (h1(k) + i + i²) mod m') });
    return { S, A, B };
  }
  function QuadPanel({ title, runs, j, m, lect }) {
    const r = j >= 0 ? runs[j] : null, tb = r ? r.tb : Array(m).fill(null), cls = {};
    if (r) { r.tries.forEach(t => { cls[t.p] = t.ok ? 'new' : 'hit'; }); }
    return html`<div className="dsv10-panel"><b>${title}</b><div className="dsv10-wrap">
      <${Tbl} m=${m} vals=${tb} cls=${cls} />
      <ul className="dsv10-calc">${r ? html`<li className="head">key ${r.k}, h1 = ${r.h}</li>` : html`<li className="head">empty table</li>`}${r && r.tries.map((t, q) => html`<li key=${q} className=${t.ok ? 'good' : 'bad'}>${qLine(t, r.h, m, lect)}</li>`)}</ul></div></div>`;
  }
  function QuadFormulas({ ar }) {
    const EX = { keys: [18, 72, 65, 34, 13], m: 7 };
    const [cfg, setCfg] = useState(EX), [kt, setKt] = useState(EX.keys.join(', ')), [mt, setMt] = useState('7');
    const { S, A, B } = buildQuad(cfg.keys, cfg.m), [i, ctl] = useWalk(S.length, 2600, cfg.keys.join() + '/' + cfg.m), st = S[i];
    const run = () => { const ks = nums(kt, 8), m = nums(mt, 1)[0]; if (!ks.length || !(m >= 2 && m <= 13)) return; setCfg({ keys: ks, m }); };
    const isEx = cfg.m === 7 && cfg.keys.join() === EX.keys.join();
    return html`<figure className="fig dsv10"><div className="fig-stage">
      <div className="dsv10-modes"><button className="fig-btn" aria-pressed=${isEx} onClick=${() => { setCfg(EX); setKt(EX.keys.join(', ')); setMt('7'); }}>Example from the notes</button></div>
      <div className="dsv10-pair">
        <${QuadPanel} title=${html`Lecture: <bdi>(h1 + i + i²) mod ${cfg.m}</bdi>`} runs=${A} j=${st.j} m=${cfg.m} lect=${true} />
        <${QuadPanel} title=${html`<bdi>h + i²</bdi> (h+1, h+4, h+9 …)`} runs=${B} j=${st.j} m=${cfg.m} lect=${false} /></div>
      <div className="dsv10-row"><span className="dsv10-lbl">Try your own keys</span><input className="dsv10-in keys" inputMode="numeric" value=${kt} onChange=${e => setKt(e.target.value)} aria-label="keys" />
        <span className="dsv10-lbl">size</span><input className="dsv10-in sm" inputMode="numeric" value=${mt} onChange=${e => setMt(e.target.value)} aria-label="table size (2 to 13)" />
        <button className="fig-btn solid" onClick=${run}>Run</button></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.3] probe sequences of one key: linear, quadratic (lecture), double hashing ── */
  function seqCalc(k, m) {
    const P = primeBelow(m), h1 = k % m, h2 = 1 + (k % P);
    const rows = [
      { t: 'Linear probing', f: i => (h1 + i) % m, s: i => `(${h1} + ${i}) mod ${m}` },
      { t: 'Quadratic (lecture)', f: i => (h1 + i + i * i) % m, s: i => `(${h1} + ${i} + ${i * i}) mod ${m}` },
      { t: 'Double hashing', f: i => (h1 + i * h2) % m, s: i => `(${h1} + ${i}·${h2}) mod ${m}` }
    ].map(r => ({ ...r, seq: Array.from({ length: m }, (_, i) => r.f(i)) }));
    rows.forEach(r => { r.reach = new Set(r.seq).size; });
    return { P, h1, h2, rows };
  }
  function seqMsg(k, m, i) {
    const { P, h1, h2, rows } = seqCalc(k, m);
    if (i === 0) return { en: `i = 0: all three start at the same cell, h1(${k}) = ${k} mod ${m} = ${h1}. Double hashing's step is h2(${k}) = 1 + ${k} mod ${P} = ${h2} (${P} is a prime smaller than ${m}${m === 13 ? ', as in the lecture' : ''}). Each later probe is shown as it happens.`, ar: `عند ${D('i = 0')} التلاتة بيبدأوا من نفس الخانة:` + L(`h1(${k}) = ${k} mod ${m} = ${h1}`) + `والـ step بتاع الـ double hashing هو` + L(`h2(${k}) = 1 + ${k} mod ${P} = ${h2}`) + `(والـ ${D(P)} ده prime أصغر من ${D(m)}${m === 13 ? ' زي المحاضرة' : ''}).` };
    if (i < m - 1) return { en: `i = ${i}: linear probing moves 1 cell on, quadratic jumps ${i + i * i} from h1, double hashing jumps ${i}·${h2} = ${i * h2}.`, ar: `عند ${D('i = ' + i)} الـ linear probing بيتحرك خانة واحدة، والـ quadratic بيقفز ${D(i + i * i)} من الـ h1، والـ double hashing بيقفز ${D(i + '·' + h2 + ' = ' + i * h2)}.` };
    const [a, b, c] = rows.map(r => r.reach);
    return { en: `After ${m} probes (i = 0 … ${m - 1}): linear probing reached ${a} of ${m} cells, one after another (neighbouring cells, which is how clusters form); quadratic reached ${b} (bigger and bigger jumps); double hashing reached ${c}, in steps of ${h2} that depend on the key, so different keys follow different sequences.`, ar: `بعد ${D(m)} محاولات (من ${D('i = 0')} لـ ${D('i = ' + (m - 1))}) الـ linear probing وصل لـ ${D(a)} خانات من ${D(m)} ورا بعض (خانات جنب بعض، ودي اللي بتعمل clusters)، والـ quadratic وصل لـ ${D(b)} (قفزات بتكبر)، والـ double hashing وصل لـ ${D(c)} بقفزات قدها ${D(h2)} بتعتمد على الـ key، فكل key ليه ترتيب مختلف.` };
  }
  function ProbeSeq({ ar }) {
    const EXS = [{ t: '14 in size 13 (double hashing example)', k: 14, m: 13 }, { t: '13 in size 7 (linear and quadratic examples)', k: 13, m: 7 }];
    const [cfg, setCfg] = useState(EXS[0]), [kt, setKt] = useState('14'), [mt, setMt] = useState('13');
    const { k, m } = cfg, C = seqCalc(k, m), [i, ctl] = useWalk(m, 1300, k + '/' + m), msg = seqMsg(k, m, i);
    const run = () => { const kk = nums(kt, 1)[0], mm = nums(mt, 1)[0]; if (kk == null || !(mm >= 3 && mm <= 13)) return; setCfg({ k: kk, m: mm }); };
    const cols = { gridTemplateColumns: `repeat(${m}, minmax(0, 1fr))` };
    return html`<figure className="fig dsv10"><div className="fig-stage">
      <div className="dsv10-modes">${EXS.map(x => html`<button key=${x.t} className="fig-btn" aria-pressed=${x.k === k && x.m === m} onClick=${() => { setCfg(x); setKt(String(x.k)); setMt(String(x.m)); }}>${x.t}</button>`)}</div>
      <div className="dsv10-strip ix" style=${cols} aria-hidden="true">${Array.from({ length: m }, (_, c) => html`<span key=${c}>${c}</span>`)}</div>
      ${C.rows.map(r => {
        const first = {}; r.seq.slice(0, i + 1).forEach((p, q) => { if (first[p] == null) first[p] = q; });
        return html`<div key=${r.t} className="dsv10-seq"><b>${r.t}</b>
          <div className="dsv10-strip" style=${cols}>${Array.from({ length: m }, (_, c) => html`<span key=${c} className=${(first[c] != null ? 'v' : '') + (r.seq[i] === c ? ' cur' : '')}>${first[c] != null ? first[c] : ''}</span>`)}</div>
          <code>i = ${i}: ${r.s(i)} = ${r.seq[i]}</code>
          <code>order: ${r.seq.slice(0, i + 1).join(', ')}</code>
          ${i === m - 1 && html`<p>cells reached: ${r.reach} of ${m}</p>`}</div>`;
      })}
      <p className="dsv10-msg">Each cell shows the i of the first probe that reached it.</p>
      <div className="dsv10-row"><span className="dsv10-lbl">Try your own key</span><input className="dsv10-in" inputMode="numeric" value=${kt} onChange=${e => setKt(e.target.value)} aria-label="key" />
        <span className="dsv10-lbl">size</span><input className="dsv10-in sm" inputMode="numeric" value=${mt} onChange=${e => setMt(e.target.value)} aria-label="table size (3 to 13)" />
        <button className="fig-btn solid" onClick=${run}>Run</button></div></div>
      <${Cap} en=${msg.en} ar=${msg.ar} showAr=${ar} /><${SBar} n=${m} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── [2.4] open addressing fills up; separate chaining does not ── */
  const FULL_EX = [18, 72, 65, 34, 13], FM = 7, FMAX = 14;
  function fullState(keys) {
    const tb = Array(FM).fill(null), ch = Array.from({ length: FM }, () => []), rej = [];
    let last = null;
    keys.forEach(k => {
      const a = k % FM, probes = []; let slot = null;
      for (let i = 0; i < FM; i++) { const p = (a + i) % FM; probes.push(p); if (tb[p] == null) { slot = p; break; } }
      if (slot != null) tb[slot] = k; else rej.push(k);
      ch[a].push(k); last = { k, a, slot, probes, len: ch[a].length };
    });
    return { tb, ch, rej, last };
  }
  function fullMsg(keys) {
    const { last, rej } = fullState(keys);
    if (keys.length <= FULL_EX.length) return { en: `The lecture's keys ${FULL_EX.join(', ')} in a table of size ${FM}: one table with linear probing, one with separate chaining. Keep inserting keys and watch what happens when the ${FM} cells run out.`, ar: `الـ keys بتاعة المحاضرة في table حجمه ${D(FM)}، الـ linear probing في ناحية والـ separate chaining في الناحية التانية:` + L(FULL_EX.join(', ')) + `كمّل ضيف keys وشوف إيه اللي بيحصل لما الـ ${D(FM)} خانات يخلصوا.` };
    const { k, a, slot, len } = last, c = `${k} mod ${FM} = ${a}`;
    const lpEn = slot != null ? (slot === a ? `goes to cell ${a}` : `probes on to cell ${slot}`) : `finds <b>no empty cell</b>: all ${FM} are used, so ${k} cannot be stored`;
    const lpAr = slot != null ? (slot === a ? `بيروح الخانة ${D(a)}` : `بيكمّل لحد الخانة ${D(slot)}`) : `مش لاقي <b>ولا خانة فاضية</b> لأن الـ ${D(FM)} خانات اتملوا، فمش هيقدر يخزّن ${D(k)}`;
    return { en: `${c}. Linear probing ${lpEn}. Separate chaining adds ${k} to chain [${a}], now ${len} long.` + (rej.length ? ' Chaining handles an unlimited number of collisions at the same address and needs no prior knowledge of how many keys will be stored.' : ''),
      ar: `الحساب:` + L(c) + `الـ linear probing ${lpAr}، والـ separate chaining بيضيف ${D(k)} للـ chain بتاعة الخانة ${D(a)} وطولها بقى ${D(len)}.` + (rej.length ? ' والـ chaining بيتعامل مع عدد مش محدود من الـ collisions على نفس الـ address ومش محتاج تعرف مسبقًا هتخزن كام key.' : '') };
  }
  function FullTable({ ar }) {
    const [keys, setKeys] = useState(FULL_EX), [txt, setTxt] = useState('20');
    const { tb, ch, rej, last } = fullState(keys), m = fullMsg(keys), full = keys.length >= FMAX, fresh = keys.length > FULL_EX.length;
    const add = () => { const v = nums(txt, 1)[0]; if (v == null || full) return; setKeys(keys.concat(v)); setTxt(String(v + 7)); };
    const cls = {}; if (fresh && last) { last.probes.forEach(p => { cls[p] = p === last.slot ? 'new' : 'hit'; }); }
    return html`<figure className="fig dsv10"><div className="fig-stage"><div className="dsv10-pair">
      <div className="dsv10-panel"><b>Linear probing (size ${FM})</b><div className="dsv10-wrap"><${Tbl} m=${FM} vals=${tb} cls=${cls} /></div>
        <p className=${'dsv10-msg' + (rej.length ? ' bad' : '')}>${rej.length ? 'Table full: ' + rej.join(', ') + ' not stored' : tb.filter(v => v != null).length + ' of ' + FM + ' cells used'}</p></div>
      <div className="dsv10-panel"><b>Separate chaining (size ${FM})</b><div className="dsv10-wrap"><${Chains} m=${FM} ch=${ch} hot=${fresh && last ? last.a : null} nw=${fresh && last ? [last.a, last.len - 1] : null} /></div>
        <p className=${'dsv10-msg' + (rej.length ? ' good' : '')}>${keys.length} keys stored</p></div></div>
      <div className="dsv10-row"><span className="dsv10-lbl">key</span><input className="dsv10-in" inputMode="numeric" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="key to insert" />
        <button className="fig-btn solid" onClick=${add} disabled=${full}>Insert</button>
        <button className="fig-btn" onClick=${() => { setKeys(FULL_EX); setTxt('20'); }}>↻ Reset</button></div></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /></figure>`;
  }

  /* ── [3] slide 17: searching the linear probing table ── */
  const LT = [13, null, 72, 65, 18, null, 34], LM = 7;
  function buildSearch(k) {
    const h = k % LM, S = [{ p: null, done: [], en: `Search ${k} in slide 17's table. Start at its hash address: h1(${k}) = ${k} mod ${LM} = ${h}.`, ar: `ندوّر على ${D(k)} في الـ table بتاع slide 17، ونبدأ من الـ hash address بتاعه:` + L(`h1(${k}) = ${k} mod ${LM} = ${h}`) }];
    const done = [];
    for (let i = 0; i < LM; i++) {
      const p = (h + i) % LM, v = LT[p];
      if (v === k) { S.push({ p, done: done.slice(), res: 'new', en: `Cell ${p} holds ${k}: <b>found</b> after ${i + 1} probe${i ? 's' : ''}.`, ar: `الخانة ${D(p)} فيها ${D(k)}، يعني <b>لقيناه</b> بعد ${D(i + 1)} ${i ? 'محاولات' : 'محاولة'}.` }); return S; }
      if (v == null) { S.push({ p, done: done.slice(), res: 'look', en: `Cell ${p} is empty: ${k} is <b>not in the table</b> (when inserted it would have been placed here, at the first empty cell).`, ar: `الخانة ${D(p)} فاضية، يعني ${D(k)} <b>مش موجود في الـ table</b> (لو كان اتضاف كان هيتحط هنا، في أول خانة فاضية).` }); return S; }
      const nx = (h + i + 1) % LM;
      S.push({ p, done: done.slice(), res: 'hit', en: `Cell ${p} holds ${v}, not ${k}: continue linearly to the next cell, (${h} + ${i + 1}) mod ${LM} = ${nx}.`, ar: `الخانة ${D(p)} فيها ${D(v)} مش ${D(k)}، فنكمّل بالترتيب للخانة اللي بعدها:` + L(`(${h} + ${i + 1}) mod ${LM} = ${nx}`) });
      done.push(p);
    }
    S.push({ p: null, done: done.slice(), en: `All ${LM} cells checked: ${k} is not in the table.`, ar: `اتشيّكنا على الـ ${D(LM)} خانات كلهم، و${D(k)} مش موجود في الـ table.` });
    return S;
  }
  function LinSearch({ ar }) {
    const [k, setK] = useState(13), [txt, setTxt] = useState('13');
    const S = buildSearch(k), [i, ctl] = useWalk(S.length, 2000, k), st = S[i];
    const cls = {}; st.done.forEach(p => { cls[p] = 'dim'; }); if (st.p != null) cls[st.p] = st.res;
    const calc = S.slice(1, i + 1).map(x => x.p != null ? `cell ${x.p}: ` + (x.res === 'new' ? 'found' : x.res === 'look' ? 'empty → stop' : LT[x.p] + ' ≠ ' + k) : 'all cells checked');
    return html`<figure className="fig dsv10"><div className="fig-stage">
      <div className="dsv10-modes">${[[13, '13'], [65, '65'], [27, '27 (not stored)']].map(([v, t]) => html`<button key=${v} className="fig-btn" aria-pressed=${k === v} onClick=${() => { setK(v); setTxt(String(v)); }}>${t}</button>`)}</div>
      <div className="dsv10-wrap"><${Tbl} m=${LM} vals=${LT} cls=${cls} title="slide 17" />
        <ul className="dsv10-calc"><li className="head">search ${k}: h1 = ${k} mod ${LM} = ${k % LM}</li>${calc.map((t, j) => html`<li key=${j} className=${(j === calc.length - 1 ? 'cur ' : '') + (/found/.test(t) ? 'good' : /stop|checked/.test(t) ? 'bad' : '')}>${t}</li>`)}</ul></div>
      <div className="dsv10-row"><span className="dsv10-lbl">Try your own key</span><input className="dsv10-in" inputMode="numeric" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="key to search" />
        <button className="fig-btn solid" onClick=${() => { const v = nums(txt, 1)[0]; if (v != null) setK(v); }}>Search</button></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }

  // step builders kept on the components so the Arabic built at run time can be checked
  Object.assign(Pipeline, { build: buildPipe }); Object.assign(CollisionFig, { STEPS: COLL }); Object.assign(Methods, { build: methodCalc });
  Object.assign(DivisionEx, { build: buildDiv }); Object.assign(QuadFormulas, { build: buildQuad }); Object.assign(ProbeSeq, { build: seqMsg });
  Object.assign(FullTable, { build: fullMsg }); Object.assign(LinSearch, { build: buildSearch });
  window.FIGS = Object.assign(window.FIGS || {}, { 'ds-l10-pipeline': Pipeline, 'ds-l10-collision': CollisionFig, 'ds-l10-methods': Methods, 'ds-l10-division': DivisionEx, 'ds-l10-quad-formulas': QuadFormulas, 'ds-l10-probe-seq': ProbeSeq, 'ds-l10-full-table': FullTable, 'ds-l10-lin-search': LinSearch });
})();
/* ── part L9 ── */
// Data Structures visuals, Lecture 9 (Trees and Binary Search Trees): the parts of a tree (slides 3–11), the BST rule checked node by node (slide 12), traversals of the slides' trees (slides 15–21 and the quiz tree), a tree built from an insertion order with its subtree sizes (quiz), the Node/Tree classes as boxes and pointers (slides 22–23), inserting 57 (slides 28–29) and 0.9 (slides 32–36) with the insert code, sorted insertion giving a degenerate tree, minimum/maximum (slide 49), find 0.7 / 0.5 (slides 39–47), the three delete cases, and slide 48's deleteitem run on real trees. The viz.js animations on the page (tree 2's traversals, inserts, search 60/30, delete 12/25/65) are not redone here. Every label and number comes from the site's notes and the slides.
(function () {
  const { useState, useEffect, useRef } = React;
  const { html, Cap, calm } = window.FIGKIT;
  const CSS = `
.dsv9 *{ font-variant-ligatures:none; }
.dsv9 .fig-btn:disabled{ opacity:.45; cursor:default; }
.dsv9 .fig-btn[aria-pressed="true"]{ background:var(--fig-s); color:#fff; border-color:transparent; }
.dsv9 .fig-cap .ltr{ font-family:var(--mono); font-size:.86rem; margin:2px 0; overflow-wrap:anywhere; }
.dsv9-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 8px; }
.dsv9-modes .fig-btn{ font-size:.84rem; padding:4px 10px; }
.dsv9-row{ display:flex; flex-wrap:wrap; gap:6px 8px; justify-content:center; align-items:center; margin:8px 0 0; }
.dsv9-lbl{ font-size:.82rem; color:var(--graphite); }
.dsv9-in{ font:.9rem var(--mono); width:70px; padding:4px 6px; border:1px solid var(--line); border-radius:8px; background:var(--paper); color:var(--ink); min-height:32px; box-sizing:border-box; }
.dsv9-in.dsv9-wide{ flex:1 1 180px; width:auto; min-width:0; max-width:330px; resize:vertical; white-space:pre-wrap; overflow-wrap:anywhere; overflow-x:hidden; }
.dsv9-tree{ position:relative; max-width:520px; margin:0 auto; }
.dsv9-tree svg{ position:absolute; left:0; top:0; width:100%; height:100%; overflow:visible; }
.dsv9-e{ stroke:var(--graphite); stroke-width:1.6; fill:none; }
.dsv9-e.dsv9-hi{ stroke:var(--ink); stroke-width:3.6; }
.dsv9-e.dsv9-path{ stroke:var(--fig-k); stroke-width:3.6; }
.dsv9-st{ stroke:var(--graphite); stroke-width:1.3; fill:none; opacity:.8; }
.dsv9-st.dsv9-hi{ stroke:var(--ink); stroke-width:3; opacity:1; }
.dsv9-st.dsv9-nul{ stroke:var(--pen); stroke-width:3; opacity:1; }
.dsv9-nd{ position:absolute; width:30px; height:30px; margin-left:-15px; box-sizing:border-box; border-radius:50%; border:2px solid var(--graphite); background:var(--paper); color:var(--ink); font:700 12px/26px var(--mono); letter-spacing:-.04em; text-align:center; padding:0; transition:background .3s, box-shadow .3s, border-color .3s, opacity .3s; }
button.dsv9-nd{ cursor:pointer; }
button.dsv9-nd:focus-visible{ outline:2px solid var(--fig-k); outline-offset:2px; }
.dsv9-nd.dsv9-k{ background:color-mix(in srgb, var(--fig-k) 45%, var(--paper)); border-color:var(--fig-k); }
.dsv9-nd.dsv9-s{ background:color-mix(in srgb, var(--fig-s) 55%, var(--paper)); border-color:var(--fig-s); }
.dsv9-nd.dsv9-red{ background:color-mix(in srgb, var(--pen) 40%, var(--paper)); border-color:var(--pen); }
.dsv9-nd.dsv9-grn{ background:color-mix(in srgb, var(--ok) 40%, var(--paper)); border-color:var(--ok); }
.dsv9-nd.dsv9-sub{ background:color-mix(in srgb, var(--fig-k) 38%, var(--paper)); border:3px solid var(--ink); line-height:24px; }
.dsv9-nd.dsv9-lo{ background:color-mix(in srgb, var(--ok) 32%, var(--paper)); border-color:var(--ok); }
.dsv9-nd.dsv9-hi{ background:color-mix(in srgb, var(--fig-k) 32%, var(--paper)); border-color:var(--fig-k); }
.dsv9-nd.dsv9-path{ border:3px solid var(--fig-k); line-height:24px; }
.dsv9-nd.dsv9-done{ background:color-mix(in srgb, var(--fig-k) 22%, var(--paper)); }
.dsv9-nd.dsv9-cur{ background:color-mix(in srgb, var(--fig-k) 50%, var(--paper)); border:3px solid var(--fig-k); line-height:24px; box-shadow:0 0 0 3px color-mix(in srgb, var(--fig-k) 40%, transparent); }
.dsv9-nd.dsv9-found{ background:color-mix(in srgb, var(--ok) 45%, var(--paper)); border:3px solid var(--ok); line-height:24px; box-shadow:0 0 0 3px color-mix(in srgb, var(--ok) 35%, transparent); }
.dsv9-nd.dsv9-new{ border:3px solid var(--ok); line-height:24px; animation:dsv9-in .5s ease both; }
.dsv9-nd.dsv9-bad{ background:color-mix(in srgb, var(--pen) 38%, var(--paper)); border:3px solid var(--pen); line-height:24px; }
.dsv9-nd.dsv9-gone{ border-style:dashed; opacity:.55; }
.dsv9-nd.dsv9-dim{ opacity:.4; }
.dsv9-tg{ position:absolute; transform:translateX(-50%); font:700 12px/15px var(--mono); color:var(--ink); background:var(--paper-2); padding:0 2px; border-radius:4px; white-space:nowrap; pointer-events:none; }
.dsv9-tg.dsv9-k{ color:var(--fig-k); } .dsv9-tg.dsv9-pen{ color:var(--pen); } .dsv9-tg.dsv9-ok{ color:var(--ok); }
.dsv9-code{ margin:8px auto 0; max-width:440px; padding:7px 9px; border:1px solid var(--line); border-radius:8px; background:var(--paper); font:12px/1.42 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; }
.dsv9-code small{ display:block; font:700 .75rem var(--body); color:var(--graphite); margin-bottom:2px; }
.dsv9-code span{ display:block; border-radius:3px; padding:0 3px; transition:background .3s; }
.dsv9-code span.dsv9-cur{ background:color-mix(in srgb, var(--fig-k) 26%, transparent); }
.dsv9-code span.dsv9-gap{ color:var(--graphite); }
.dsv9-box{ max-width:440px; margin:8px auto 0; padding:6px 10px; border:1px solid var(--line); border-left:4px solid var(--fig-k); border-radius:6px; background:var(--paper); font:600 12px/1.5 var(--mono); color:var(--ink); white-space:pre-wrap; overflow-wrap:anywhere; text-align:left; direction:ltr; min-height:1.5em; }
.dsv9-box small{ display:block; font:600 .75rem var(--body); color:var(--graphite); }
.dsv9-out{ display:flex; flex-wrap:wrap; gap:3px; justify-content:center; margin:8px auto 0; max-width:440px; direction:ltr; }
.dsv9-out span{ min-width:28px; height:28px; box-sizing:border-box; padding:0 3px; display:grid; place-items:center; border:1px solid var(--line); border-radius:4px; background:var(--paper); font:700 12px var(--mono); color:var(--ink); }
.dsv9-out span.dsv9-on{ background:color-mix(in srgb, var(--ok) 32%, var(--paper)); border-color:var(--ok); }
.dsv9-out span.dsv9-last{ box-shadow:0 0 0 2px var(--fig-k); }
.dsv9-note{ text-align:center; font-size:.8rem; line-height:1.35; color:var(--graphite); margin:6px 0 0; }
.dsv9-note.dsv9-bad{ color:var(--pen); font-weight:700; } .dsv9-note.dsv9-good{ color:var(--ok); font-weight:700; }
.dsv9-mem{ display:flex; flex-direction:column; align-items:center; gap:2px; min-height:200px; }
.dsv9-ptr{ font:700 12px var(--mono); color:var(--ink); border:1px solid var(--line); border-radius:6px; padding:3px 8px; background:var(--paper); }
.dsv9-ptr b{ color:var(--fig-k); }
.dsv9-arw{ font:700 15px/1 var(--mono); color:var(--fig-k); height:16px; }
.dsv9-bx{ display:flex; border:2px solid var(--fig-k); border-radius:6px; overflow:hidden; background:var(--paper); }
.dsv9-bx > span{ width:40px; display:flex; flex-direction:column; align-items:center; padding:2px 0 3px; }
.dsv9-bx > span + span{ border-left:1px solid var(--line); }
.dsv9-bx i{ font:normal 11.5px/1.2 var(--mono); color:var(--graphite); }
.dsv9-bx b{ font:700 12px/1.4 var(--mono); color:var(--ink); }
.dsv9-bx > span.dsv9-d{ background:color-mix(in srgb, var(--fig-k) 24%, var(--paper)); }
.dsv9-bx.dsv9-new{ box-shadow:0 0 0 3px var(--ok); animation:dsv9-in .5s ease both; }
.dsv9-kids{ display:flex; gap:10px; justify-content:center; }
.dsv9-kid{ display:flex; flex-direction:column; align-items:center; gap:2px; min-width:124px; }
.dsv9-show{ transition:opacity .45s; } .dsv9-show.dsv9-off{ opacity:0; }
.dsv9-pair{ display:flex; flex-wrap:wrap; gap:6px 14px; justify-content:center; margin:6px 0 0; font-size:.82rem; color:var(--ink); }
.dsv9-pair b{ font-family:var(--mono); }
.dsv9-key{ display:inline-block; width:12px; height:12px; border-radius:50%; vertical-align:-1px; margin-right:4px; border:2px solid; box-sizing:border-box; }
@keyframes dsv9-in{ from{ opacity:0; transform:scale(.6); } to{ opacity:1; transform:none; } }
@media (prefers-reduced-motion: reduce){ .dsv9-nd, .dsv9-bx, .dsv9-code span, .dsv9-show{ transition:none; animation:none; } }`;
  if (!document.getElementById('dsv9-css')) { const s = document.createElement('style'); s.id = 'dsv9-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── helpers ── */
  const L = s => `<span class="ltr">${esc(s)}</span>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const D = s => `<bdi dir="ltr">${esc(s).replace(/ /g, '&nbsp;')}</bdi>`;
  const P = s => (s || '').split(' ').filter(Boolean).map(w => 'dsv9-' + w).join(' ');
  const SIDE = { l: 'left', r: 'right' }, GO = { l: 'شمال', r: 'يمين' };
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
  const Code = ({ title, lines, cur }) => html`<div className="dsv9-code">${title && html`<small>${title}</small>`}${lines.map((t, k) => html`<span key=${k} className=${t === '…' ? 'dsv9-gap' : (cur || []).includes(k) ? 'dsv9-cur' : ''}>${t || ' '}</span>`)}</div>`;
  const Box = ({ label, text }) => html`<div className="dsv9-box"><small>${label}</small>${text || ' '}</div>`;

  /* ── BST model: nodes keyed by id; lab is what is drawn, v what is compared ── */
  const val = lab => { const x = Number(lab); return lab !== '' && !isNaN(x) ? x : lab; };
  const cmp = (a, b) => typeof a === 'number' && typeof b === 'number' ? a - b : (String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0);
  const cp = t => JSON.parse(JSON.stringify(t));
  function add(t, lab) {
    lab = String(lab); const v = val(lab);
    if (Object.values(t.n).some(x => cmp(x.v, v) === 0)) return false;
    let id = lab; while (t.n[id]) id += "'";
    let p = t.root, par = null, side = null;
    while (p != null) { par = p; side = cmp(v, t.n[p].v) < 0 ? 'l' : 'r'; p = t.n[p][side]; }
    t.n[id] = { v, lab, l: null, r: null };
    if (par == null) t.root = id; else t.n[par][side] = id;
    return id;
  }
  const mk = labs => { const t = { root: null, n: {} }; labs.forEach(l => add(t, l)); return t; };
  function order(t, kind, from) {
    const out = [], go = id => { if (id == null) return; const x = t.n[id];
      if (kind === 'pre') out.push(id); go(kind === 'rev' ? x.r : x.l); if (kind === 'in' || kind === 'rev') out.push(id); go(kind === 'rev' ? x.l : x.r); if (kind === 'post') out.push(id); };
    go(from === undefined ? t.root : from); return out;
  }
  const subOf = (t, id) => id == null ? [] : order(t, 'pre', id);
  const parentOf = (t, id) => Object.keys(t.n).find(k => t.n[k].l === id || t.n[k].r === id) || null;
  const sideOf = (t, par, id) => t.n[par].l === id ? 'l' : 'r';
  const pathTo = (t, id) => { const p = []; let x = id; while (x != null) { p.unshift(x); x = parentOf(t, x); } return p; };
  const labs = (t, ids) => ids.map(id => t.n[id].lab);
  function lay(t) {
    const ids = order(t, 'in'), pos = {}; let md = 0;
    const dep = (id, d) => { if (id == null) return; pos[id] = { d }; md = Math.max(md, d); dep(t.n[id].l, d + 1); dep(t.n[id].r, d + 1); };
    dep(t.root, 0); ids.forEach((id, k) => { pos[id].x = (k + .5) / ids.length * 100; });
    return { pos, md, n: ids.length };
  }
  const levels = t => t.root == null ? 0 : lay(t).md + 1;

  // the slides' trees
  const T1 = ['43', '31', '20', '28', '40', '33', '64', '56', '47', '59', '89'];
  const T2 = ['50', '25', '65', '12', '33', '70', '55', '60', '53'];
  const T10 = ['1.0', '0.6', '0.3', '0.4', '0.8', '0.7', '1.9', '1.4', '1.1', '1.8', '2.7'];
  const TF = ['F', 'B', 'A', 'D', 'C', 'E', 'G', 'I', 'H'];
  const QUIZ = ['45', '15', '8', '56', '5', '65', '47', '12', '18', '10', '73', '50', '16', '61'];
  const SORTED = T2.slice().sort((a, b) => a - b);

  /* ── the tree drawing: nodes are HTML (readable on phones), links are one SVG ── */
  const R = 15, TOP = 22;
  function TreeView({ t, cls = {}, tags = {}, stubs, hiE, stubCls = {}, stubTag = {}, onTap, blank, rh = 46, label }) {
    if (t.root == null) return html`<div className="dsv9-tree" style=${{ height: '60px' }}><p className="dsv9-note">The tree is empty (root = NULL).</p></div>`;
    const { pos, md, n } = lay(t), yc = id => TOP + pos[id].d * rh + R, sw = 100 / n * .3;
    const H = TOP + md * rh + 2 * R + (stubs ? 30 : 6);
    const lines = [], ticks = [], stags = [];
    Object.keys(t.n).forEach(id => { const x = t.n[id];
      ['l', 'r'].forEach(sd => { const c = x[sd];
        if (c != null) lines.push(html`<line key=${id + sd} className=${'dsv9-e ' + P(hiE && hiE[c])} x1=${pos[id].x} y1=${yc(id)} x2=${pos[c].x} y2=${yc(c)} vectorEffect="non-scaling-stroke" />`);
        else if (stubs) { const x2 = pos[id].x + (sd === 'l' ? -sw : sw), y2 = yc(id) + R + 11, k = id + ':' + sd, c2 = 'dsv9-st ' + P(stubCls[k]);
          ticks.push(html`<g key=${k}><line className=${c2} x1=${pos[id].x} y1=${yc(id)} x2=${x2} y2=${y2} vectorEffect="non-scaling-stroke" /><line className=${c2} x1=${x2 - sw * .35} y1=${y2} x2=${x2 + sw * .35} y2=${y2} vectorEffect="non-scaling-stroke" /></g>`);
          if (stubTag[k]) stags.push(html`<span key=${'t' + k} className="dsv9-tg dsv9-pen" style=${{ left: x2 + '%', top: (y2 + 2) + 'px' }}>${stubTag[k]}</span>`); }
      }); });
    const tg = id => tags[id] && html`<span key=${'g' + id} className=${'dsv9-tg ' + P(tags[id].c || 'k')} style=${{ left: pos[id].x + '%', top: (yc(id) - R - 16) + 'px' }}>${tags[id].t}</span>`;
    return html`<div className="dsv9-tree" style=${{ height: H + 'px' }} role="img" aria-label=${label || 'A binary tree'}>
      <svg viewBox=${`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden="true">${lines}${ticks}</svg>
      ${Object.keys(t.n).map(id => { const st = { left: pos[id].x + '%', top: (yc(id) - R) + 'px' }, c = 'dsv9-nd ' + P(cls[id]), lab = blank ? '' : t.n[id].lab;
        return onTap ? html`<button key=${id} className=${c} style=${st} onClick=${() => onTap(id)} aria-label=${'node ' + (blank ? (pos[id].d ? 'at depth ' + pos[id].d : 'root') : lab)}>${lab}</button>`
          : html`<span key=${id} className=${c} style=${st}>${lab}</span>`; })}
      ${Object.keys(tags).filter(id => pos[id]).map(tg)}${stags}</div>`;
  }

  /* ── [0.1–0.2] slides 3–11: the parts of a tree ── */
  const PT = mk(T1), ALL = Object.keys(PT.n);
  const each = (ids, c) => Object.fromEntries(ids.map(id => [id, c]));
  const LEAVES = ALL.filter(id => !PT.n[id].l && !PT.n[id].r), INNER = ALL.filter(id => !LEAVES.includes(id));
  const subSet = id => { const s = subOf(PT, id), e = {}, st = {}; s.forEach(x => { if (x !== id) e[x] = 'hi'; st[x + ':l'] = 'hi'; st[x + ':r'] = 'hi'; }); return { cls: each(s, 'sub'), hiE: e, stubCls: st }; };
  const PARTS = [
    { cls: each(ALL, 'k'), en: 'A tree is a non-linear (hierarchical) data structure made of <b>nodes</b> (the circles), with links from each node down to its children.', ar: 'الـ tree هو data structure من نوع non-linear (hierarchical) مكوّن من <b>nodes</b> (الدواير)، وكل node ليها links نازلة للـ children بتوعها.' },
    { cls: { 43: 'red', 31: 'grn', 64: 'grn' }, tags: { 43: { t: 'root', c: 'pen' }, 31: { t: 'child', c: 'ok' }, 64: { t: 'child', c: 'ok' } }, en: 'The <b>root node</b> is the top node: it has no parent. The nodes right under it are its <b>child nodes</b>.', ar: 'الـ <b>root node</b> هي الـ node اللي فوق خالص ومالهاش parent. والـ nodes اللي تحتها على طول هي الـ <b>child nodes</b> بتاعتها.' },
    { cls: { 31: 'red', 64: 'red', 20: 'grn', 40: 'grn', 56: 'grn', 89: 'grn' }, tags: { 31: { t: 'parent', c: 'pen' }, 64: { t: 'parent', c: 'pen' } }, en: 'A node with children is the <b>parent node</b> of those <b>child nodes</b>: each red node is the parent of the green nodes right under it.', ar: 'أي node ليها children تبقى الـ <b>parent node</b> بتاعة الـ <b>child nodes</b> دي. وهنا كل node حمرا هي الـ parent بتاع الـ nodes الخضرا اللي تحتها على طول.' },
    { cls: each(LEAVES, 's'), en: '<b>Leaf (terminal) nodes</b> have no children: both of their links are NULL (the short end marks).', ar: 'الـ <b>Leaf (terminal) nodes</b> مالهاش children، والـ links الاتنين بتوعها NULL (العلامات القصيرة اللي في الآخر).' },
    { cls: each(INNER, 'k'), en: 'An <b>internal node</b> has at least one child: every node that is not a leaf (here 6 of the 11).', ar: 'الـ <b>internal node</b> ليها child واحد على الأقل، يعني أي node مش leaf (هنا 6 من الـ 11).' },
    Object.assign(subSet('31'), { en: 'A <b>sub-tree</b> is a node together with all its descendants: here the root\'s left child and everything under it.', ar: 'الـ <b>sub-tree</b> هو node ومعاها كل الـ descendants بتوعها، وهنا الـ left child بتاع الـ root وكل اللي تحته.' }),
    Object.assign(subSet('64'), { en: 'Another sub-tree: the root\'s right child with all its descendants.', ar: 'وده sub-tree تاني، الـ right child بتاع الـ root ومعاه كل الـ descendants بتوعه.' }),
    Object.assign(subSet('56'), { en: 'A sub-tree can start at any node; this one has 3 nodes. Each sub-tree is a tree itself.', ar: 'الـ sub-tree ممكن يبدأ من أي node، وده فيه 3 nodes. وكل sub-tree هو نفسه tree.' }),
    { cls: {}, stubCls: Object.fromEntries(ALL.flatMap(id => ['l', 'r'].filter(s => !PT.n[id][s]).map(s => [id + ':' + s, 'nul']))), en: 'This is a <b>binary tree</b>: each node has at most 2 children, a left one and a right one; a missing child is a NULL link (red). Tap any node to see its parent, children and sub-tree.', ar: 'ده <b>binary tree</b>، يعني كل node ليها 2 children بالكتير (left وright)، والـ child اللي مش موجود بيبقى NULL link (الأحمر). دوس على أي node عشان تشوف الـ parent والـ children والـ sub-tree بتوعها.' }
  ];
  function partsTap(id) {
    const x = PT.n[id], par = parentOf(PT, id), kids = [x.l, x.r].filter(c => c != null), s = subOf(PT, id), k = kids.length, m = s.length;
    const cls = Object.assign(each(s, 'sub'), each(kids, 'grn'), { [id]: 'red' }), tags = { [id]: { t: 'this', c: 'pen' } };
    if (par) { cls[par] = 'k'; tags[par] = { t: 'parent', c: 'k' }; }
    kids.forEach(c => { tags[c] = { t: 'child', c: 'ok' }; });
    const hiE = {}; s.forEach(c => { if (c !== id) hiE[c] = 'hi'; });
    const en = (par ? 'This node\'s parent is marked <b>parent</b>. ' : 'This node is the <b>root</b>: it has no parent. ') + (k ? `It has ${k} ${k === 1 ? 'child' : 'children'}, so it is an <b>internal node</b>.` : 'It has no children, so it is a <b>leaf</b>.') + ` Its sub-tree (bold outline) has ${m} node${m > 1 ? 's' : ''}.`;
    const ar = (par ? 'الـ parent بتاع الـ node دي متعلّم عليه <b>parent</b>. ' : 'الـ node دي هي الـ <b>root</b> ومالهاش parent. ') + (k ? `ليها ${D(k)} ${k === 1 ? 'child' : 'children'}، فهي <b>internal node</b>.` : 'مالهاش children، فهي <b>leaf</b>.') + ` والـ sub-tree بتاعها (الحدود التخينة) فيه ${D(m)} ${m > 1 ? 'nodes' : 'node'}.`;
    return { cls, tags, hiE, en, ar };
  }
  function Parts({ ar }) {
    const [i, ctl] = useWalk(PARTS.length, 2600, 0), [tap, setTap] = useState(null);
    const st = tap ? partsTap(tap) : PARTS[i];
    const go = { replay: () => { setTap(null); ctl.replay(); }, go: k => { setTap(null); ctl.go(k); } };
    return html`<figure className="fig dsv9"><div className="fig-stage">
      <${TreeView} t=${PT} blank=${true} stubs=${true} cls=${st.cls} tags=${st.tags || {}} hiE=${st.hiE} stubCls=${st.stubCls || {}} onTap=${id => { ctl.go(PARTS.length - 1); setTap(id); }} label="The slides' tree of 11 nodes" />
      <p className="dsv9-note">Tap a node to explore it</p></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${PARTS.length} i=${tap ? PARTS.length - 1 : i} ctl=${go} /></figure>`;
  }
  Parts.build = () => PARTS.concat(ALL.map(partsTap));

  /* ── [0.3] slide 12: the BST rule, node by node ── */
  function bstFirstBad(t) {
    const ids = order(t, 'pre');
    for (const a of ids) for (const sd of ['l', 'r']) for (const x of subOf(t, t.n[a][sd])) { const c = cmp(t.n[x].v, t.n[a].v); if (sd === 'l' ? c >= 0 : c <= 0) return { a, x, sd, eq: c === 0 }; }
    return null;
  }
  function bstMsg(t, id) {
    const x = t.n[id], lo = subOf(t, x.l), hi = subOf(t, x.r);
    const lBad = lo.filter(c => cmp(t.n[c].v, x.v) >= 0), rBad = hi.filter(c => cmp(t.n[c].v, x.v) <= 0), k = x.lab;
    const part = (ids, bad, sd) => {
      const w = sd === 'l' ? 'less' : 'greater', wa = sd === 'l' ? 'أصغر' : 'أكبر';
      if (!ids.length) return { en: `no ${SIDE[sd]} subtree`, ar: `ومالهاش ${SIDE[sd]} subtree.` };
      return { en: `${SIDE[sd]} subtree (${labs(t, ids).join(', ')}) ` + (bad.length ? `has ${labs(t, bad).join(', ')}, not ${w} than ${k}` : `all ${w} than ${k}`),
        ar: `والـ ${SIDE[sd]} subtree بتاعها فيه` + L(labs(t, ids).join(', ')) + (bad.length ? `وفيه ${D(labs(t, bad).join(', '))} مش ${wa} من ${D(k)}.` : `وكلهم ${wa} من ${D(k)}.`) };
    };
    const a = part(lo, lBad, 'l'), b = part(hi, rBad, 'r'), f = bstFirstBad(t);
    let en = `Node <b>${esc(k)}</b>: ${a.en}; ${b.en}. `, ar = `دي الـ node ${D(k)}. ` + a.ar + ' ' + b.ar + ' ';
    if (!f) { en += 'Every node passes, and all keys are unique: <b>this is a BST</b>.'; ar += 'وكل الـ nodes بتعدّي القاعدتين والـ keys مش متكررة، فـ<b>ده BST</b>.'; }
    else { const A = t.n[f.a].lab, X = t.n[f.x].lab, rel = f.eq ? '=' : f.sd === 'l' ? '>' : '<';
      en += `<b>Not a BST</b>: ${esc(X)} is in the ${SIDE[f.sd]} subtree of ${esc(A)}, but ${esc(X + ' ' + rel + ' ' + A)}` + (f.eq ? ' (keys must be unique).' : '.');
      ar += `<b>ده مش BST</b>، لأن ${D(X)} موجودة في الـ ${SIDE[f.sd]} subtree بتاع ${D(A)}، مع إن` + L(X + ' ' + rel + ' ' + A) + (f.eq ? 'والـ keys لازم تبقى unique.' : ''); }
    return { en, ar, lBad, rBad, lo, hi, bad: f };
  }
  function BstRule({ ar }) {
    const [t, setT] = useState(() => mk(T1)), [sel, setSel] = useState('43'), [txt, setTxt] = useState('45');
    const m = bstMsg(t, sel), cls = Object.assign(each(m.lo, 'lo'), each(m.hi, 'hi'), each(m.lBad.concat(m.rBad), 'bad'), { [sel]: 'cur' });
    if (m.bad && !cls[m.bad.x]) cls[m.bad.x] = 'bad';
    const set = () => { const v = parseInt(txt, 10); if (isNaN(v)) return; const t2 = cp(t); t2.n[sel].v = Math.max(-99, Math.min(999, v)); t2.n[sel].lab = String(t2.n[sel].v); setT(t2); };
    return html`<figure className="fig dsv9"><div className="fig-stage">
      <${TreeView} t=${t} cls=${cls} tags=${{ [sel]: { t: 'node', c: 'k' } }} onTap=${setSel} label="Tree 1 with the selected node's left and right subtrees coloured" />
      <div className="dsv9-pair"><span><i className="dsv9-key" style=${{ borderColor: 'var(--ok)' }}></i>left subtree: must be less</span><span><i className="dsv9-key" style=${{ borderColor: 'var(--fig-k)' }}></i>right subtree: must be greater</span></div>
      <p className="dsv9-note">Tap a node to check it. Try your own: give it a new key.</p>
      <div className="dsv9-row"><span className="dsv9-lbl">new key for ${t.n[sel].lab}</span><input className="dsv9-in" inputMode="numeric" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="new key for the selected node" />
        <button className="fig-btn solid" onClick=${set}>Set</button><button className="fig-btn" onClick=${() => { setT(mk(T1)); setSel('43'); }}>↻ Reset</button></div></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /></figure>`;
  }
  BstRule.build = () => { const out = []; const t = mk(T1); Object.keys(t.n).forEach(id => out.push(bstMsg(t, id)));
    [['33', 45], ['59', 43], ['20', 28], ['89', 60], ['28', 10]].forEach(([id, v]) => { const t2 = cp(t); t2.n[id].v = v; t2.n[id].lab = String(v); Object.keys(t2.n).forEach(k => out.push(bstMsg(t2, k))); }); return out; };

  /* ── [1] slides 13–21: the traversals of the slides' trees ── */
  const TRAV_TREES = [{ k: 't1', b: 'Tree 1 (slides 15–19)', keys: T1 }, { k: 't2', b: 'Tree 2 (slide 20)', keys: T2 }, { k: 'tf', b: 'Quiz tree F…', keys: TF }, { k: 'one', b: 'One node', keys: ['43'] }];
  const ORD = { in: { b: 'Inorder', f: 'inorder', rule: 'Left → Parent → Right', en: 'left subtree, then the parent, then the right subtree' }, pre: { b: 'Preorder', f: 'preorder', rule: 'Parent → Left → Right', en: 'the parent, then its left subtree, then its right subtree' },
    post: { b: 'Postorder', f: 'postorder', rule: 'Left → Right → Parent', en: 'left subtree, then right subtree, then the parent' }, rev: { b: 'Reverse inorder', f: 'reverse', rule: 'Right → Parent → Left', en: 'right subtree, then the parent, then the left subtree' } };
  function travSteps(t, kind, single) {
    const o = ORD[kind], seq = order(t, kind), rt = t.n[t.root].lab, S = [];
    S.push({ k: 0, cur: null, en: `<b>${o.b}</b>: ${o.en}. Start with ${o.f}(root), at ${esc(rt)}.`, ar: `ترتيب الـ <b>${o.b}</b> هو` + L(o.rule) + `ونبدأ بالـ call على الـ root (${D(rt)}).` });
    seq.forEach((id, j) => { const x = t.n[id], lab = x.lab, leaf = !x.l && !x.r; let en, ar;
      if (kind === 'in') { en = `Print <b>${esc(lab)}</b>: ${x.l ? 'its left subtree is finished' : 'its left link is NULL'}, so the parent comes now; next, its right subtree${x.r ? '' : ' (NULL)'}.`; ar = `نطبع <b>${D(lab)}</b>، لأن ${x.l ? 'الـ left subtree بتاعها خلص' : 'الـ left link بتاعها NULL'}، فده دور الـ parent، وبعده الـ right subtree${x.r ? '' : ' (NULL)'}.`; }
      else if (kind === 'pre') { en = `Print <b>${esc(lab)}</b> as soon as its call starts (parent first); then its left subtree, then its right${leaf ? ' (both NULL)' : ''}.`; ar = `نطبع <b>${D(lab)}</b> أول ما الـ call بتاعها تبدأ (الـ parent الأول)، وبعدين الـ left subtree، وبعدين الـ right${leaf ? ' (الاتنين NULL)' : ''}.`; }
      else if (kind === 'post') { en = `Print <b>${esc(lab)}</b> only after both its subtrees are finished${leaf ? ' (it is a leaf: both NULL)' : ''}: the parent comes last.`; ar = `نطبع <b>${D(lab)}</b> بعد ما الـ subtrees الاتنين بتوعها يخلصوا${leaf ? ' (هي leaf والاتنين NULL)' : ''}، فالـ parent بييجي في الآخر.`; }
      else { en = `Print <b>${esc(lab)}</b>: ${x.r ? 'its right subtree is finished' : 'its right link is NULL'}, so the parent comes now; next, its left subtree.`; ar = `نطبع <b>${D(lab)}</b>، لأن ${x.r ? 'الـ right subtree بتاعها خلص' : 'الـ right link بتاعها NULL'}، فده دور الـ parent، وبعده الـ left subtree.`; }
      if (j === seq.length - 1) {
        if (single) { en += ' With only one node, preorder and postorder print the same output.'; ar += ' ومع node واحدة بس، الـ preorder والـ postorder بيطلّعوا نفس الـ output.'; }
        else if (kind === 'in') { en += ' Done: on a BST, inorder gives the keys in ascending (sorted) order.'; ar += ' وكده خلصنا، والـ inorder على BST بيطلّع الـ keys مترتبة تصاعدي (ascending).'; }
        else if (kind === 'rev') { en += ' Done: right, root, left on a BST gives descending order.'; ar += ' وكده خلصنا، والترتيب ده على BST بيطلّع الـ keys تنازلي (descending).'; }
        else if (kind === 'pre') { en += ` Done: the root (${esc(rt)}) was printed first.`; ar += ` وكده خلصنا، والـ root (${D(rt)}) اتطبع الأول.`; }
        else { en += ` Done: the root (${esc(rt)}) was printed last.`; ar += ` وكده خلصنا، والـ root (${D(rt)}) اتطبع في الآخر.`; }
      }
      S.push({ k: j + 1, cur: id, en, ar }); });
    return { S, seq };
  }
  function Traverse({ ar }) {
    const [tk, setTk] = useState('t1'), [kind, setKind] = useState('in');
    const tr = TRAV_TREES.find(x => x.k === tk), t = mk(tr.keys), { S, seq } = travSteps(t, kind, tk === 'one');
    const [i, ctl] = useWalk(S.length, 1500, tk + kind), st = S[i], done = seq.slice(0, st.k);
    const cls = Object.assign(each(done, 'done'), st.cur ? { [st.cur]: 'found' } : {});
    const stack = st.cur ? pathTo(t, st.cur).map(id => ORD[kind].f + '(' + t.n[id].lab + ')') : [ORD[kind].f + '(' + t.n[t.root].lab + ')'];
    return html`<figure className="fig dsv9"><div className="fig-stage">
      <div className="dsv9-modes">${TRAV_TREES.map(x => html`<button key=${x.k} className="fig-btn" aria-pressed=${tk === x.k} onClick=${() => setTk(x.k)}>${x.b}</button>`)}</div>
      <div className="dsv9-modes">${Object.keys(ORD).map(k => html`<button key=${k} className="fig-btn" aria-pressed=${kind === k} onClick=${() => setKind(k)}>${ORD[k].b}</button>`)}</div>
      <${TreeView} t=${t} cls=${cls} stubs=${true} tags=${st.cur ? { [st.cur]: { t: 'print', c: 'ok' } } : {}} label=${tr.b} />
      <div className="dsv9-out" aria-label="output">${seq.map((id, j) => html`<span key=${j} className=${j < st.k ? 'dsv9-on' + (j === st.k - 1 ? ' dsv9-last' : '') : ''}>${j < st.k ? t.n[id].lab : ''}</span>`)}</div>
      <${Box} label="Calls open now (the current node and its ancestors)" text=${stack.join(' → ')} /></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }
  Traverse.build = () => TRAV_TREES.flatMap(x => Object.keys(ORD).flatMap(k => travSteps(mk(x.keys), k, x.k === 'one').S));

  /* ── [2] a tree from an insertion order: subtree sizes and the three traversals (quiz) ── */
  const parseKeys = (s, dec) => (String(s).match(dec ? /-?\d+(\.\d+)?/g : /-?\d+/g) || []).slice(0, 15).map(x => dec ? Number(x).toFixed(1) : String(Math.max(-99, Math.min(999, parseInt(x, 10)))));
  const BUILDS = [{ k: 't2', b: 'Tree 2', keys: T2 }, { k: 'quiz', b: 'Quiz: 45, 15, 8, …', keys: QUIZ }, { k: 't1', b: 'Tree 1', keys: T1 }];
  function buildMsg(keys, isQuiz) {
    const t = { root: null, n: {} }, dup = []; keys.forEach(k => { if (!add(t, k)) dup.push(k); });
    if (t.root == null) return { t, en: 'Type some keys (numbers separated by commas or spaces).', ar: 'اكتب شوية keys (أرقام بينها فواصل أو مسافات).' };
    const r = t.n[t.root], nl = subOf(t, r.l).length, nr = subOf(t, r.r).length, lv = levels(t);
    let en = `Root <b>${esc(r.lab)}</b>: its left subtree has <b>${nl}</b> node${nl === 1 ? '' : 's'} and its right subtree <b>${nr}</b>; the tree has ${lv} level${lv === 1 ? '' : 's'}.`;
    let ar = `الـ root هو <b>${D(r.lab)}</b>، والـ left subtree بتاعه فيه <b>${D(nl)}</b> ${nl === 1 ? 'node' : 'nodes'}، والـ right subtree فيه <b>${D(nr)}</b>، والـ tree كله ${D(lv)} ${lv === 1 ? 'level' : 'levels'}.`;
    if (isQuiz) { en += ' This is the quiz answer: 7 left and 6 right.'; ar += ' ودي إجابة سؤال الـ quiz (7 في الـ left و6 في الـ right).'; }
    if (dup.length) { en += ` ${esc(dup.join(', '))} skipped: BST keys are unique.`; ar += ' واتشال المكرر' + L(dup.join(', ')) + 'لأن الـ keys في الـ BST لازم تبقى unique.'; }
    return { t, en, ar };
  }
  function Build({ ar }) {
    const [txt, setTxt] = useState(T2.join(', ')), [keys, setKeys] = useState(T2);
    const m = buildMsg(keys, keys.join() === QUIZ.join()), t = m.t, r = t.root;
    const cls = r == null ? {} : Object.assign(each(subOf(t, t.n[r].l), 'lo'), each(subOf(t, t.n[r].r), 'hi'), { [r]: 'cur' });
    const tl = k => labs(t, order(t, k)).join(' ');
    const load = k => { setKeys(k); setTxt(k.join(', ')); };
    return html`<figure className="fig dsv9"><div className="fig-stage">
      <div className="dsv9-modes">${BUILDS.map(x => html`<button key=${x.k} className="fig-btn" aria-pressed=${keys.join() === x.keys.join()} onClick=${() => load(x.keys)}>${x.b}</button>`)}</div>
      <${TreeView} t=${t} cls=${cls} tags=${r == null ? {} : { [r]: { t: 'root', c: 'k' } }} rh=${42} label="BST built from the insertion order" />
      <div className="dsv9-pair"><span><i className="dsv9-key" style=${{ borderColor: 'var(--ok)' }}></i>left subtree</span><span><i className="dsv9-key" style=${{ borderColor: 'var(--fig-k)' }}></i>right subtree</span></div>
      ${r != null && html`<${Box} label="Traversals" text=${'Preorder:  ' + tl('pre') + '\nInorder:   ' + tl('in') + '\nPostorder: ' + tl('post')} />`}
      <div className="dsv9-row"><span className="dsv9-lbl">Try your own insertion order</span><textarea className="dsv9-in dsv9-wide" rows="2" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="keys in insertion order"></textarea>
        <button className="fig-btn solid" onClick=${() => setKeys(parseKeys(txt))}>Build</button></div></div>
      <${Cap} en=${m.en} ar=${m.ar} showAr=${ar} /></figure>`;
  }
  Build.build = () => [buildMsg(T2), buildMsg(QUIZ, true), buildMsg(T1), buildMsg(['5', '5', '3']), buildMsg([]), buildMsg(['7'])];

  /* ── [3] slides 22–23: the Node and Tree classes as boxes and pointers ── */
  const NCODE = ['class Node', '{', 'public:', '   int data;', '   Node *left;', '   Node *right;', '   Node() { data = 0;', '            left = right = NULL; }', '};', 'class Tree', '{', 'public:', '   Node *root;', '   Tree() { root = NULL; }', '};', '// in main:', 'Tree list;', 'list.root = list.insert(list.root, a[i]);'];
  const NM = [
    { cur: [3, 4, 5], box: 'blank', en: 'Each tree node stores three things: its <b>data</b> and two pointers, <b>left</b> and <b>right</b>, one for each child.', ar: 'كل node في الـ tree شايلة 3 حاجات، الـ <b>data</b> بتاعتها و2 pointers هما الـ <b>left</b> والـ <b>right</b>، واحد لكل child.' },
    { cur: [6, 7], box: 'new', en: 'The constructor Node() sets data = 0 and left = right = NULL: a new node starts with no children.', ar: 'الـ constructor بتاع الـ Node بيخلّي القيم دي، يعني الـ node الجديدة بتبدأ من غير children:' + L('data = 0, left = right = NULL') },
    { cur: [12, 13, 16], root: 'NULL', en: 'The Tree class keeps only <b>root</b>, a pointer to the top node. Tree() sets root = NULL: the tree starts empty.', ar: 'الـ Tree class شايلة <b>root</b> بس، وده pointer على الـ node اللي فوق. والـ constructor بتاعها بيخلّي الـ root بـ NULL، يعني الـ tree بيبدأ فاضي.' },
    { cur: [17], root: 43, en: 'Insert 43: insert(list.root, 43) finds temp == NULL, creates a node with data 43 and returns it; main stores it in list.root.', ar: 'نضيف 43، فالـ insert بتلاقي الـ temp بـ NULL، فتعمل node فيها 43 وترجّعها، والـ main بتحطها في الـ root:' + L('list.root = list.insert(list.root, 43);') },
    { cur: [17], root: 43, kids: ['31'], en: 'Insert 31: 31 &lt; 43, so the new node is stored in 43\'s <b>left</b> pointer.', ar: 'نضيف 31، ولأن ' + D('31 < 43') + ' فالـ node الجديدة بتتحط في الـ <b>left</b> pointer بتاع 43.' },
    { cur: [17], root: 43, kids: ['31', '64'], en: 'Insert 64: 64 &gt; 43, so it goes in 43\'s <b>right</b> pointer. Every circle in the tree drawings is one of these boxes; each NULL pointer is an empty subtree (an end mark).', ar: 'نضيف 64، ولأن ' + D('64 > 43') + ' فبتتحط في الـ <b>right</b> pointer بتاع 43. وكل دايرة في رسومات الـ tree هي صندوق من دول، وكل NULL pointer هو subtree فاضي (علامة النهاية).' }
  ];
  const NBox = ({ l, d, r, cls }) => html`<div className=${'dsv9-bx ' + P(cls)}><span><i>left</i><b>${l}</b></span><span className="dsv9-d"><i>data</i><b>${d}</b></span><span><i>right</i><b>${r}</b></span></div>`;
  function NodeMem({ ar }) {
    const [i, ctl] = useWalk(NM.length, 2600, 0), st = NM[i], kids = st.kids || [];
    return html`<figure className="fig dsv9"><div className="fig-stage">
      <div className="dsv9-mem">
        ${st.box && html`<div className="dsv9-ptr">${st.box === 'blank' ? 'Node' : 'new Node()'}</div>`}
        ${st.box && html`<${NBox} l=${st.box === 'blank' ? '?' : 'NULL'} d=${st.box === 'blank' ? '?' : 0} r=${st.box === 'blank' ? '?' : 'NULL'} cls=${st.box === 'new' ? 'new' : ''} />`}
        ${st.root != null && html`<div className="dsv9-ptr">list.root = <b>${st.root === 'NULL' ? 'NULL' : '•'}</b></div>`}
        ${st.root != null && st.root !== 'NULL' && html`<span className="dsv9-arw">↓</span>`}
        ${st.root != null && st.root !== 'NULL' && html`<${NBox} l=${kids.includes('31') ? '•' : 'NULL'} d=${43} r=${kids.includes('64') ? '•' : 'NULL'} cls=${kids.length ? '' : 'new'} />`}
        ${kids.length > 0 && html`<div className="dsv9-kids">
          <div className="dsv9-kid"><span className="dsv9-arw">↙</span><${NBox} l="NULL" d=${31} r="NULL" cls=${kids.length === 1 ? 'new' : ''} /></div>
          <div className=${'dsv9-kid dsv9-show' + (kids.includes('64') ? '' : ' dsv9-off')}><span className="dsv9-arw">↘</span><${NBox} l="NULL" d=${64} r="NULL" cls="new" /></div></div>`}
      </div>
      <${Code} title="Slides 22–23" lines=${NCODE} cur=${st.cur} /></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${NM.length} i=${i} ctl=${ctl} /></figure>`;
  }
  NodeMem.build = () => NM;

  /* ── insert / search / minimum / maximum walked with the professor's code ── */
  const C_INS = ['Node* insert(Node *temp, int item)', '{', '   if (temp == NULL)', '   {', '      Node *newnode = new Node();', '      newnode->data = item;', '      temp = newnode;', '   }', '   else if (item < temp->data)', '      temp->left = insert(temp->left, item);', '   else', '      temp->right = insert(temp->right, item);', '   return temp;', '}'];
  const C_SRCH = ['bool search(Node *temp, int item)', '{', '   if (temp == NULL) return false;', '   else if (item == temp->data)', '      return true;', '   else if (item < temp->data)', '      return search(temp->left, item);', '   else', '      return search(temp->right, item);', '}'];
  const C_MIN = ['Node* minimum(Node *temp)', '{', '   if (temp == NULL) return NULL;', '   else if (temp->left == NULL)', '      return temp;', '   else return minimum(temp->left);', '}'];
  const C_MAX = ['Node* maximum(Node *temp)', '{', '   if (temp == NULL) return NULL;', '   else if (temp->right == NULL)', '      return temp;', '   else return maximum(temp->right);', '}'];
  function walkSteps(t, mode, key) {
    const S = [], stack = [], path = [], fn = mode === 'ins' ? 'insert' : mode === 'find' ? 'search' : mode;
    if (mode === 'ins' || mode === 'find') {
      const v = val(key), ex = Object.keys(t.n).find(id => cmp(t.n[id].v, v) === 0);
      if (mode === 'ins' && ex) return { S: [{ t, cls: { [ex]: 'bad' }, lines: [], stack: [], en: `${esc(key)} is already in the tree. BST keys are unique, so it is not inserted again.`, ar: `الـ ${D(key)} موجودة في الـ tree أصلًا، والـ keys في الـ BST مش بتتكرر، فمش هنضيفها تاني.` }], tEnd: t };
      let p = t.root, last = null, side = null;
      while (p != null) {
        const x = t.n[p], c = cmp(v, x.v); stack.push(fn + '(' + x.lab + ')');
        if (mode === 'find' && c === 0) {
          S.push({ t, cur: p, path: path.slice(), lines: [3, 4], stack: stack.slice(), found: p, en: `${esc(key)} == ${esc(x.lab)}: <b>found</b>, return true. Path: ${esc(labs(t, path.concat(p)).join(' → '))}.`, ar: `لقيناها لأن ${D(key + ' == ' + x.lab)}، فبنرجّع true. والطريق كان:` + L(labs(t, path.concat(p)).join(' → ')) });
          return { S, tEnd: t };
        }
        side = c < 0 ? 'l' : 'r'; const op = c < 0 ? '<' : '>', call = `${mode === 'ins' ? 'temp->' + SIDE[side] + ' = ' : 'return '}${fn}(temp->${SIDE[side]}, ${key})`;
        S.push({ t, cur: p, path: path.slice(), lines: mode === 'ins' ? (c < 0 ? [8, 9] : [10, 11]) : (c < 0 ? [5, 6] : [7, 8]), stack: stack.slice(),
          en: `${esc(key + ' ' + op + ' ' + x.lab)}, so go ${SIDE[side]}: ${esc(call)}.`, ar: `نقارن ${D(key + ' ' + op + ' ' + x.lab)}، فنروح ${GO[side]}، يعني` + L(call + ';') });
        path.push(p); last = p; p = x[side];
      }
      stack.push(fn + '(NULL)');
      const nul = last == null ? {} : { [last + ':' + side]: 'nul' }, ntag = last == null ? {} : { [last + ':' + side]: 'NULL' };
      if (mode === 'find') {
        S.push({ t, path: path.slice(), nul, ntag, lines: [2], stack: stack.slice(), en: `temp is NULL (${esc(t.n[last].lab)} has no ${SIDE[side]} child): return false, ${esc(key)} is <b>not found</b>. Path: ${esc(labs(t, path).join(' → '))} → NULL.`,
          ar: `الـ temp بقى NULL (مفيش ${SIDE[side]} child لـ ${D(t.n[last].lab)})، فبنرجّع false، يعني ${D(key)} <b>مش موجودة</b>. والطريق كان:` + L(labs(t, path).join(' → ') + ' → NULL') });
        return { S, tEnd: t };
      }
      const t2 = cp(t), nid = add(t2, key), where = last == null ? 'the tree is empty' : `${esc(t.n[last].lab)} has no ${SIDE[side]} child`;
      S.push({ t, path: path.slice(), nul, ntag, lines: [2], stack: stack.slice(), en: `temp is NULL (${where}): this is where ${esc(key)} goes.`, ar: last == null ? `الـ temp بقى NULL لأن الـ tree فاضي، وده مكان ${D(key)}.` : `الـ temp بقى NULL (مفيش ${SIDE[side]} child لـ ${D(t.n[last].lab)})، وده المكان اللي ${D(key)} هتتحط فيه.` });
      S.push({ t: t2, path: path.slice(), cls: { [nid]: 'new' }, tags: { [nid]: { t: 'newnode', c: 'ok' } }, lines: [4, 5, 6], stack: stack.slice(), en: `Create a new node: newnode->data = ${esc(key)}, temp = newnode, and return it.`, ar: 'نعمل node جديدة ونحط فيها القيمة، ونرجّعها:' + L(`newnode->data = ${key}; temp = newnode;`) });
      const fin = last == null ? { en: `The returned node becomes the root.`, ar: 'والـ node اللي رجعت بقت هي الـ root.' }
        : { en: `Back in ${fn}(${esc(t.n[last].lab)}): temp->${SIDE[side]} = the new node, so <b>${esc(key)} is the ${SIDE[side]} child of ${esc(t.n[last].lab)}</b>. Every other call returns its own temp, so the links above stay the same.`,
          ar: `نرجع للـ call بتاعة ${D(t.n[last].lab)}، والـ ${SIDE[side]} link بتاعها بياخد الـ node الجديدة، فـ<b>الـ ${D(key)} بقت الـ ${SIDE[side]} child بتاع ${D(t.n[last].lab)}</b>. وباقي الـ calls كل واحدة بترجّع الـ temp بتاعها، فالـ links اللي فوق مش بتتغير.` };
      S.push(Object.assign({ t: t2, path: path.slice(), cls: { [nid]: 'found' }, lines: [12], stack: stack.slice() }, fin));
      return { S, tEnd: t2 };
    }
    // minimum / maximum: keep going left (right) until that link is NULL
    const sd = mode === 'minimum' ? 'l' : 'r'; let p = t.root;
    while (p != null) { const x = t.n[p], nx = x[sd]; stack.push(fn + '(' + x.lab + ')');
      if (nx == null) { S.push({ t, cur: p, path: path.slice(), found: p, nul: { [p + ':' + sd]: 'nul' }, ntag: { [p + ':' + sd]: 'NULL' }, lines: [3, 4], stack: stack.slice(),
        en: `temp->${SIDE[sd]} is NULL, so return temp: the <b>${mode} is ${esc(x.lab)}</b>, the ${sd === 'l' ? 'leftmost' : 'rightmost'} node. Path: ${esc(labs(t, path.concat(p)).join(' → '))}.`,
        ar: `الـ ${SIDE[sd]} بتاع ${D(x.lab)} بـ NULL، فبنرجّع الـ temp، يعني الـ <b>${mode} هو ${D(x.lab)}</b>، وهو آخر node ${sd === 'l' ? 'على الشمال (leftmost)' : 'على اليمين (rightmost)'}. والطريق كان:` + L(labs(t, path.concat(p)).join(' → ')) }); break; }
      S.push({ t, cur: p, path: path.slice(), lines: [5], stack: stack.slice(), en: `${esc(x.lab)} has a ${SIDE[sd]} child (${esc(t.n[nx].lab)}), so return ${fn}(temp->${SIDE[sd]}).`, ar: `الـ ${D(x.lab)} ليها ${SIDE[sd]} child (${D(t.n[nx].lab)})، فبنرجّع الـ call على الـ ${SIDE[sd]}:` + L(`return ${fn}(temp->${SIDE[sd]});`) });
      path.push(p); p = nx; }
    return { S, tEnd: t };
  }
  const CODES = { ins: C_INS, find: C_SRCH, minimum: C_MIN, maximum: C_MAX };
  function Walk({ ar, presets, input, title }) {
    const [job, setJob] = useState({ ...presets[0], t: mk(presets[0].base), n: 0 }), [txt, setTxt] = useState(input ? input.start : '');
    const { S, tEnd } = walkSteps(job.t, job.mode, job.key), [i, ctl] = useWalk(S.length, 1900, job.n), st = S[i];
    const cls = Object.assign(each(st.path || [], 'path'), st.cur ? { [st.cur]: 'cur' } : {}, st.found ? { [st.found]: 'found' } : {}, st.cls || {});
    const hiE = {}; (st.path || []).concat(st.cur || st.found ? [st.cur || st.found] : []).forEach((id, k) => { if (k) hiE[id] = 'path'; });
    const tags = Object.assign({}, st.cur ? { [st.cur]: { t: 'temp', c: 'k' } } : {}, st.tags || {});
    if (st.t.root != null && !tags[st.t.root]) tags[st.t.root] = { t: 'root', c: 'pen' };
    const run = (p, keep) => setJob({ ...p, t: keep ? tEnd : mk(p.base), n: job.n + 1 });
    const fromInput = () => { const k = parseKeys(txt, input.dec)[0]; if (k == null) return; run({ mode: input.mode, key: k, base: presets[0].base }, input.mode === 'ins'); };
    return html`<figure className="fig dsv9"><div className="fig-stage">
      <div className="dsv9-modes">${presets.map((p, k) => html`<button key=${k} className="fig-btn" aria-pressed=${job.b === p.b} onClick=${() => run(p)}>${p.b}</button>`)}</div>
      <${TreeView} t=${st.t} cls=${cls} tags=${tags} hiE=${hiE} stubs=${true} stubCls=${st.nul || {}} stubTag=${st.ntag || {}} label=${title} />
      <${Box} label="Calls" text=${st.stack.join(' → ')} />
      <${Code} lines=${CODES[job.mode]} cur=${st.lines} />
      ${input && html`<div className="dsv9-row"><span className="dsv9-lbl">Try your own</span><input className="dsv9-in" inputMode="decimal" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label=${input.b + ' value'} />
        <button className="fig-btn solid" onClick=${fromInput}>${input.b}</button>${input.mode === 'ins' && html`<button className="fig-btn" onClick=${() => run(presets[0])}>↻ Reset</button>`}</div>`}</div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }
  const Insert57 = ({ ar }) => html`<${Walk} ar=${ar} title="Tree 1, inserting 57" presets=${[{ b: 'Insert 57 (slides 28–29)', base: T1, mode: 'ins', key: '57' }]} input=${{ mode: 'ins', b: 'insert', start: '30' }} />`;
  const Insert09 = ({ ar }) => html`<${Walk} ar=${ar} title="The 1.0 tree, inserting 0.9" presets=${[{ b: 'Insert 0.9 (slides 32–36)', base: T10, mode: 'ins', key: '0.9' }]} input=${{ mode: 'ins', b: 'insert', start: '1.5', dec: true }} />`;
  const Search = ({ ar }) => html`<${Walk} ar=${ar} title="The 1.0 tree, searching" presets=${[{ b: 'Find 0.7', base: T10, mode: 'find', key: '0.7' }, { b: 'Find 0.5', base: T10, mode: 'find', key: '0.5' }]} input=${{ mode: 'find', b: 'find', start: '1.8', dec: true }} />`;
  const MinMax = ({ ar }) => html`<${Walk} ar=${ar} title="Minimum and maximum" presets=${[{ b: 'Tree 1: minimum', base: T1, mode: 'minimum' }, { b: 'Tree 1: maximum', base: T1, mode: 'maximum' }, { b: '1.0 tree: minimum', base: T10, mode: 'minimum' }, { b: '1.0 tree: maximum', base: T10, mode: 'maximum' }]} />`;
  Insert57.build = () => ['57', '30', '43', '100', '-5', '29'].flatMap(k => walkSteps(mk(T1), 'ins', k).S).concat(walkSteps({ root: null, n: {} }, 'ins', '7').S);
  Insert09.build = () => ['0.9', '1.5', '0.1', '3.0'].flatMap(k => walkSteps(mk(T10), 'ins', k).S);
  Search.build = () => ['0.7', '0.5', '1.8', '2.9', '1.0', '0.0'].flatMap(k => walkSteps(mk(T10), 'find', k).S);
  MinMax.build = () => [T1, T10, ['5']].flatMap(b => ['minimum', 'maximum'].flatMap(m => walkSteps(mk(b), m).S));

  /* ── [4.4] the insertion order decides the shape: sorted keys give a degenerate tree ── */
  const SHAPES = [{ k: 'mix', b: "Tree 2's order", keys: T2 }, { k: 'sort', b: 'Same keys, sorted', keys: SORTED }];
  function shapeSteps(keys) {
    const S = [], t = { root: null, n: {} }; let added = [];
    keys.forEach(k => { const id = add(t, k); if (id === false) return; added = added.concat(id);
      S.push({ t: cp(t), last: id, en: `Insert ${esc(k)} (key ${added.length} of ${keys.length}).`, ar: `نضيف ${D(k)} (الـ key رقم ${D(added.length)} من ${D(keys.length)}).` }); });
    if (!S.length) return [{ t, en: 'Type some keys.', ar: 'اكتب شوية keys.' }];
    const lv = levels(t), n = added.length, deep = order(t, 'pre').find(id => lay(t).pos[id].d === lv - 1), st = S[S.length - 1];
    st.en = `${n} keys, <b>${lv} levels</b>. Reaching the deepest key (${esc(t.n[deep].lab)}) takes ${lv} comparison${lv === 1 ? '' : 's'}.`;
    st.ar = `فيه ${D(n)} keys في <b>${D(lv)} levels</b>، والوصول لأعمق key (${D(t.n[deep].lab)}) محتاج ${D(lv)} مقارنات.`;
    if (n > 2 && lv === n) { st.en += ' Every node has one child: the tree is <b>degenerate</b>, like a linked list.'; st.ar += ' وكل node ليها child واحد بس، فالـ tree بقى <b>degenerate</b> زي الـ linked list.'; }
    else if (n > 2) { st.en += ' The same keys in sorted order would need ' + n + ' levels.'; st.ar += ` ونفس الـ keys لو مترتبة كانت هتعمل ${D(n)} levels.`; }
    return S;
  }
  function Shape({ ar }) {
    const [keys, setKeys] = useState(T2), [txt, setTxt] = useState(SORTED.slice().reverse().join(', '));
    const S = shapeSteps(keys), [i, ctl] = useWalk(S.length, 700, keys.join()), st = S[i];
    return html`<figure className="fig dsv9"><div className="fig-stage">
      <div className="dsv9-modes">${SHAPES.map(x => html`<button key=${x.k} className="fig-btn" aria-pressed=${keys.join() === x.keys.join()} onClick=${() => setKeys(x.keys)}>${x.b}</button>`)}</div>
      <${Box} label="Insertion order" text=${keys.join(', ')} />
      <div style=${{ marginTop: '8px' }}><${TreeView} t=${st.t} cls=${st.last ? { [st.last]: 'new' } : {}} rh=${36} label="BST built from the insertion order" /></div>
      <div className="dsv9-row"><span className="dsv9-lbl">Try your own order</span><textarea className="dsv9-in dsv9-wide" rows="2" value=${txt} onChange=${e => setTxt(e.target.value)} aria-label="keys in insertion order"></textarea>
        <button className="fig-btn solid" onClick=${() => { const k = parseKeys(txt).slice(0, 12); if (k.length) setKeys(k); }}>Build</button></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }
  Shape.build = () => [T2, SORTED, SORTED.slice().reverse(), ['5'], ['3', '1'], ['5', '5']].flatMap(shapeSteps);

  /* ── [6.2] the three delete cases ── */
  function delSteps(t, id) {
    const x = t.n[id], lab = x.lab, path = pathTo(t, id), par = parentOf(t, id), S = [], kids = [x.l, x.r].filter(c => c != null);
    const pl = labs(t, path).join(' → '), kindEn = kids.length === 0 ? 'a leaf (no children)' : kids.length === 1 ? `has one child (${esc(t.n[kids[0]].lab)})` : 'has two children';
    const kindAr = kids.length === 0 ? 'leaf (مالهاش children)' : kids.length === 1 ? `ليها child واحد (${D(t.n[kids[0]].lab)})` : 'ليها اتنين children';
    S.push({ t, cls: Object.assign(each(path.slice(0, -1), 'path'), { [id]: 'bad' }), tags: { [id]: { t: 'delete', c: 'pen' } }, en: `Delete ${esc(lab)}: search for it (${esc(pl)}). It is ${kindEn}.`, ar: `هنمسح ${D(lab)}، فبندوّر عليها الأول:` + L(pl) + `وهي ${kindAr}.` });
    const t2 = cp(t), fin = (s) => { const ino = labs(s.t, order(s.t, 'in')).join(' '); s.en += ` Inorder is still sorted: ${esc(ino || '(empty)')}.`; s.ar += ' والـ inorder لسه مترتب:' + L(ino || '(empty)'); return s; };
    if (kids.length < 2) {
      const c = kids[0] != null ? kids[0] : null;
      if (par == null) t2.root = c; else t2.n[par][sideOf(t, par, id)] = c; delete t2.n[id];
      const sd = par != null ? sideOf(t, par, id) : null;
      if (!kids.length) S.push(fin({ t: t2, cls: {}, nul: par ? { [par + ':' + sd]: 'nul' } : {}, ntag: par ? { [par + ':' + sd]: 'NULL' } : {},
        en: par ? `Case 1, leaf: just remove it; ${esc(t.n[par].lab)}'s ${SIDE[sd]} link becomes NULL.` : 'Case 1, leaf: it was the only node, so root becomes NULL.',
        ar: par ? `دي الحالة (1) لأنها leaf، فبنشيلها على طول، والـ ${SIDE[sd]} link بتاع ${D(t.n[par].lab)} بيبقى NULL.` : 'دي الحالة (1) لأنها leaf، وكانت الـ node الوحيدة، فالـ root بقى NULL.' }));
      else { const cs = subOf(t2, c), hiE = {}; hiE[c] = 'path';
        S.push(fin({ t: t2, cls: Object.assign(each(cs, 'done'), { [c]: 'found' }), hiE,
          en: par ? `Case 2, one child: replace ${esc(lab)} by its child ${esc(t.n[c].lab)}; ${esc(t.n[par].lab)}'s ${SIDE[sd]} link now points to ${esc(t.n[c].lab)}${cs.length > 1 ? ' (with its whole sub-tree)' : ''}.` : `Case 2, one child: ${esc(lab)} was the root, so its child ${esc(t.n[c].lab)} becomes the new root.`,
          ar: par ? `دي الحالة (2) لأن ليها child واحد، فبنحط الـ child ${D(t.n[c].lab)} مكانها، والـ ${SIDE[sd]} link بتاع ${D(t.n[par].lab)} بقى بيشاور على ${D(t.n[c].lab)}${cs.length > 1 ? ' ومعاه الـ sub-tree بتاعه كله' : ''}.` : `دي الحالة (2) لأن ليها child واحد، وكانت الـ root، فالـ child ${D(t.n[c].lab)} بقى الـ root الجديد.` })); }
      return { S, tEnd: t2 };
    }
    let s = x.r; const walk = [s]; while (t.n[s].l) { s = t.n[s].l; walk.push(s); }
    let p = x.l; while (t.n[p].r) p = t.n[p].r;
    const sl = t.n[s].lab, rs = subOf(t, x.r);
    S.push({ t, cls: Object.assign(each(rs, 'hi'), each(walk, 'path'), { [id]: 'bad', [s]: 'found', [p]: 'lo' }), tags: { [id]: { t: 'delete', c: 'pen' }, [s]: { t: 'succ', c: 'ok' }, [p]: { t: 'pred', c: 'k' } },
      en: `Case 3, two children: find the inorder successor, the minimum of ${esc(lab)}'s right subtree: go right to ${esc(t.n[x.r].lab)}, then left as far as possible: <b>${esc(sl)}</b>. (The predecessor, the maximum of the left subtree, is ${esc(t.n[p].lab)}; either one works.)`,
      ar: `دي الحالة (3) لأن ليها اتنين children. بندوّر على الـ inorder successor، يعني أصغر قيمة في الـ right subtree بتاعها، فبنروح يمين لـ ${D(t.n[x.r].lab)} وبعدين شمال لحد الآخر، فنوصل لـ <b>${D(sl)}</b>. (والـ predecessor، أكبر قيمة في الـ left subtree، هو ${D(t.n[p].lab)}، وأي واحد فيهم ينفع.)` });
    const tm = cp(t); tm.n[id].lab = sl; tm.n[id].v = t.n[s].v;
    S.push({ t: tm, cls: { [id]: 'found', [s]: 'bad gone' }, tags: { [id]: { t: 'copy', c: 'ok' } }, en: `Copy ${esc(sl)} into the node being deleted. Now ${esc(sl)} appears twice; the old ${esc(sl)} node has no left child, so it is easy to remove.`, ar: `بننسخ ${D(sl)} في الـ node اللي بنمسحها، فبقت ${D(sl)} موجودة مرتين. والـ node القديمة بتاعة ${D(sl)} مالهاش left child، فشيلها سهل.` });
    const sp = parentOf(t, s); t2.n[id].lab = sl; t2.n[id].v = t.n[s].v; t2.n[sp][sideOf(t, sp, s)] = t.n[s].r; delete t2.n[s];
    const c2 = t.n[s].r != null;
    S.push(fin({ t: t2, cls: { [id]: 'found' }, en: `Delete the old ${esc(sl)} node with case ${c2 ? '2 (its right child moves up)' : '1 (it is a leaf)'}.`, ar: `بنمسح الـ node القديمة بتاعة ${D(sl)} بالحالة ${c2 ? '(2)، والـ right child بتاعها بيطلع مكانها' : '(1)، لأنها leaf'}.` }));
    return { S, tEnd: t2 };
  }
  const DEL_P = [{ b: 'Leaf: 28', id: '28' }, { b: 'One child: 40', id: '40' }, { b: 'Two children: 31', id: '31' }];
  function DeleteCases({ ar }) {
    const [job, setJob] = useState({ t: mk(T1), id: '28', b: DEL_P[0].b, n: 0 });
    const { S, tEnd } = delSteps(job.t, job.id), [i, ctl] = useWalk(S.length, 2600, job.n), st = S[i];
    const tap = id => { const base = i === S.length - 1 ? tEnd : job.t; if (!base.n[id]) return; setJob({ t: base, id, b: null, n: job.n + 1 }); };
    return html`<figure className="fig dsv9"><div className="fig-stage">
      <div className="dsv9-modes">${DEL_P.map(p => html`<button key=${p.id} className="fig-btn" aria-pressed=${job.b === p.b} onClick=${() => setJob({ t: mk(T1), id: p.id, b: p.b, n: job.n + 1 })}>${p.b}</button>`)}</div>
      <${TreeView} t=${st.t} cls=${st.cls} tags=${st.tags || {}} hiE=${st.hiE} stubs=${true} stubCls=${st.nul || {}} stubTag=${st.ntag || {}} onTap=${tap} label="Tree 1, deleting a node" />
      <p className="dsv9-note">Try your own: tap any node to delete it${i === S.length - 1 ? '' : ' (from the tree as it was before this delete)'}.</p>
      <div className="dsv9-row"><button className="fig-btn" onClick=${() => setJob({ t: mk(T1), id: '28', b: DEL_P[0].b, n: job.n + 1 })}>↻ Reset tree</button></div></div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }
  DeleteCases.build = () => { const out = []; [mk(T1), mk(T2), mk(['5']), mk(['5', '8']), mk(['5', '8', '7', '9'])].forEach(t => Object.keys(t.n).forEach(id => out.push(...delSteps(t, id).S))); return out; };

  /* ── [6.3] slide 48's deleteitem run on real trees ── */
  const SD_FIND = ['Node* deleteitem(Node *temp, int item)', '{', '  if (temp == NULL) return NULL;', '  …', '  else if (item < temp->data)', '    temp->left = deleteitem(temp->left, item);', '  else if (item > temp->data)', '    temp->right = deleteitem(temp->right, item);', '  else {   // temp is the node to delete', '  …'];
  const SD_CASE = {
    root: ['  else if (root->left == NULL &&', '           root->right == NULL &&', '           item == root->data)', '    { root = NULL; delete temp; }'],
    leaf: ['  else {', '    if (temp->left == NULL &&', '        temp->right == NULL &&', '        item == temp->data)', '      temp = NULL;', '  …', '  return temp;'],
    r: ['  else {', '  …', '    else if (temp->left == NULL &&', '             temp->right != NULL)', '    { temp->data = temp->right->data;', '      delete temp->right;', '      temp->right = NULL; }', '  …', '  return temp;'],
    l: ['  else {', '  …', '    else if (temp->left != NULL &&', '             temp->right == NULL)', '    { temp->data = temp->left->data;', '      delete temp->left;', '      temp->left = NULL; }', '  …', '  return temp;'],
    two: ['  else {', '    if (left == NULL && right == NULL) …', '    else if (left == NULL && right != NULL) …', '    else if (left != NULL && right == NULL) …', '  }   // no branch for two children', '  return temp;']
  };
  function slideDel(t, id) {
    const t2 = cp(t), x = t2.n[id], par = parentOf(t, id);
    if (t.root === id && !x.l && !x.r) { t2.root = null; delete t2.n[id]; return { t: t2, kind: 'root', lost: [] }; }
    if (!x.l && !x.r) { t2.n[par][sideOf(t, par, id)] = null; delete t2.n[id]; return { t: t2, kind: 'leaf', lost: [] }; }
    if (x.l && x.r) return { t: t2, kind: 'two', lost: [] };
    const sd = x.l ? 'l' : 'r', c = x[sd], gone = subOf(t, c);
    x.lab = t.n[c].lab; x.v = t.n[c].v; x[sd] = null; gone.forEach(g => delete t2.n[g]);
    return { t: t2, kind: sd, lost: gone.slice(1), child: c };
  }
  function stdDel(t, id) { return delSteps(t, id).tEnd; }
  function sdSteps(t, id) {
    const lab = t.n[id].lab, path = pathTo(t, id), r = slideDel(t, id), std = stdDel(t, id), S = [];
    const pl = labs(t, path).join(' → ');
    S.push({ t, code: SD_FIND, cur: path.length > 1 ? [4, 5, 6, 7] : [8], cls: Object.assign(each(path.slice(0, -1), 'path'), { [id]: 'bad' }), tags: { [id]: { t: 'temp', c: 'pen' } },
      en: `deleteitem(root, ${esc(lab)}) moves left or right (${esc(pl)}) until temp is the node holding ${esc(lab)}.`, ar: `الـ deleteitem بتمشي شمال أو يمين لحد ما الـ temp يوصل للـ node اللي فيها ${D(lab)}، والطريق هو:` + L(pl) });
    let en, ar; const lost = labs(t, r.lost).join(', ');
    if (r.kind === 'root') { en = 'The tree has only this node: root = NULL and the node is deleted. Correct.'; ar = 'الـ tree فيه الـ node دي بس، فالـ root بيبقى NULL والـ node بتتمسح، وده صح.'; }
    else if (r.kind === 'leaf') { en = 'Both links are NULL: temp = NULL is returned, so the parent\'s link becomes NULL. The leaf leaves the tree (the code never runs delete on it). Same tree as the standard case 1.'; ar = 'الـ links الاتنين NULL، فبيرجع الـ temp بـ NULL، والـ link بتاع الـ parent بيبقى NULL. الـ leaf خرجت من الـ tree (مع إن الكود مش بيعمل delete ليها)، ونفس نتيجة الحالة (1) الـ standard.'; }
    else if (r.kind === 'two') { en = `${esc(lab)} has two children and no branch handles that: <b>nothing changes</b>, ${esc(lab)} stays in the tree.`; ar = `الـ ${D(lab)} ليها اتنين children ومفيش فرع بيتعامل مع الحالة دي، فـ<b>مفيش حاجة بتتغير</b> والـ ${D(lab)} فاضلة في الـ tree.`; }
    else { const cl = t.n[r.child].lab;
      en = `One ${SIDE[r.kind]} child: copy ${esc(cl)} into this node, delete the ${esc(cl)} node, and set temp->${SIDE[r.kind]} = NULL.` + (r.lost.length ? ` But ${esc(cl)} had its own children, so <b>${esc(lost)} are cut off and lost</b>.` : ` ${esc(cl)} was a leaf, so the result is correct.`);
      ar = `ليها ${SIDE[r.kind]} child واحد، فبننسخ ${D(cl)} في الـ node دي، ونمسح الـ node بتاعة ${D(cl)}، ونخلّي الـ ${SIDE[r.kind]} بـ NULL.` + (r.lost.length ? ` لكن ${D(cl)} كان ليها children، فـ<b>دول اتقطعوا وضاعوا</b>:` + L(lost) : ` ولأن ${D(cl)} كانت leaf، النتيجة صح.`); }
    S.push({ t: r.t, code: SD_CASE[r.kind], cur: { root: [0, 1, 2, 3], leaf: [1, 2, 3, 4, 6], r: [2, 3, 4, 5, 6], l: [2, 3, 4, 5, 6], two: [4, 5] }[r.kind], cls: r.t.n[id] ? { [id]: r.kind === 'two' ? 'bad' : 'found' } : {}, title: "Slide 48's deleteitem: result", en, ar });
    const ino = labs(std, order(std, 'in')).join(' ');
    S.push({ t: std, std: true, cls: {}, title: 'The standard delete: result', en: 'For comparison, the standard delete (the three cases) gives this tree. Inorder: ' + esc(ino || '(empty)') + '. In an exam, describe the three standard cases.', ar: 'وللمقارنة، الـ delete الـ standard (التلات حالات) بيدّي الـ tree ده. والـ inorder بتاعه:' + L(ino || '(empty)') + 'وفي الامتحان، اشرح التلات حالات الـ standard.' });
    return S;
  }
  const SD_P = [{ b: 'Tree 1: delete 40', keys: T1, id: '40' }, { b: 'Tree 1: delete 31', keys: T1, id: '31' }, { b: 'Sorted keys: delete 25', keys: SORTED, id: '25' }];
  function SlideDelete({ ar }) {
    const [job, setJob] = useState({ ...SD_P[2], n: 0 }), t = mk(job.keys);
    const S = sdSteps(t, job.id), [i, ctl] = useWalk(S.length, 3000, job.n), st = S[i];
    return html`<figure className="fig dsv9"><div className="fig-stage">
      <div className="dsv9-modes">${SD_P.map(p => html`<button key=${p.b} className="fig-btn" aria-pressed=${job.b === p.b} onClick=${() => setJob({ ...p, n: job.n + 1 })}>${p.b}</button>`)}</div>
      ${st.title && html`<p className="dsv9-note dsv9-good">${st.title}</p>`}
      <${TreeView} t=${st.t} cls=${st.cls} tags=${st.tags || {}} stubs=${true} rh=${job.keys === SORTED ? 34 : 46} onTap=${i === 0 ? (id => setJob({ ...job, b: null, id, n: job.n + 1 })) : null} label="Running slide 48's deleteitem" />
      <p className="dsv9-note">Try your own: on the first step, tap any node to delete it instead.</p>
      ${st.code ? html`<${Code} title="Slide 48" lines=${st.code} cur=${st.cur} />` : null}</div>
      <${Cap} en=${st.en} ar=${st.ar} showAr=${ar} /><${SBar} n=${S.length} i=${i} ctl=${ctl} /></figure>`;
  }
  SlideDelete.build = () => { const out = []; [mk(T1), mk(SORTED), mk(['5']), mk(T2)].forEach(t => Object.keys(t.n).forEach(id => out.push(...sdSteps(t, id)))); return out; };

  window.FIGS = Object.assign(window.FIGS || {}, { 'ds-l9-parts': Parts, 'ds-l9-bst-rule': BstRule, 'ds-l9-traverse': Traverse, 'ds-l9-build': Build, 'ds-l9-node-boxes': NodeMem, 'ds-l9-insert-57': Insert57, 'ds-l9-insert-09': Insert09, 'ds-l9-shape': Shape, 'ds-l9-minmax': MinMax, 'ds-l9-search': Search, 'ds-l9-delete': DeleteCases, 'ds-l9-slide-delete': SlideDelete });
})();

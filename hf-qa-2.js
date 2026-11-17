// Head First chapter for Software Quality Assurance Lecture 2, Black Box Testing (built on hf.js), English + Egyptian Arabic,
// same pages in both. Testing terms, black-box testing and its pros and cons, static vs dynamic (black-box) testing,
// test-to-pass vs test-to-fail, equivalence partitioning, data testing and boundary conditions, state testing and the
// media player state diagram. Every fact comes from the lecture notes; the partitions, boundary values and media player
// traces are the notes' own worked answers (checked by hand and with a script). Our own analogies are marked as ours.
(function () {
  const H = window.HF; H.chapters.qa = H.chapters.qa || {};
  const { html } = H.K; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-qa2')) {
    const s = document.createElement('style'); s.id = 'hf-css-qa2';
    s.textContent = `
.hfb .hf-qa2-terms{ display:grid; grid-template-columns:auto 1fr; border:2px solid var(--hf-line); }
.hfb .hf-qa2-terms > *{ padding:5px 8px; border-top:1px solid var(--hf-grey2); font-size:13.5px; line-height:1.28; color:var(--ink); }
.hfb .hf-qa2-terms > :nth-child(-n+2){ border-top:0; }
.hfb .hf-qa2-terms > b{ font:800 13.5px/1.2 var(--body); background:var(--hf-grey); border-inline-end:2px solid var(--hf-line); display:flex; align-items:center; }
.hfb .hf-qa2-terms > span i{ display:block; font-style:normal; color:var(--graphite); font-size:13px; margin-top:1px; }
.hfb .hf-qa2-vs{ display:grid; grid-template-columns:1fr 1fr; border:2px solid var(--hf-line); }
.hfb .hf-qa2-vs > div{ padding:5px 8px; font-size:13.5px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-qa2-vs > div:nth-child(odd){ border-inline-end:2px solid var(--hf-line); }
.hfb .hf-qa2-vs > .hd{ font:800 14px/1.15 var(--body); background:var(--hf-line); color:var(--paper); border-top:0; text-align:center; }
.hfb .hf-qa2-vs > .hd.ok{ background:var(--ok); } .hfb .hf-qa2-vs > .hd.no{ background:var(--hf-red); }
.hfb .hf-qa2-vs b{ font-weight:700; }
.hfb .hf-qa2-tb{ border-collapse:collapse; direction:ltr; font:600 13.5px/1.2 var(--mono); color:var(--ink); margin:0 auto; }
.hfb .hf-qa2-tb th{ font:800 13px/1.1 var(--body); background:var(--hf-line); color:var(--paper); padding:4px 8px; text-align:left; }
.hfb .hf-qa2-tb td{ border:1px solid var(--hf-grey2); padding:3px 8px; }
.hfb .hf-qa2-tb td:first-child{ font-weight:800; }
.hfb .hf-qa2-tb td.hf-qa2-v{ color:var(--ok); } .hfb .hf-qa2-tb td.hf-qa2-x{ color:var(--hf-red); }
.hfb .hf-qa2-tb td small{ font:600 13px var(--body); color:var(--graphite); }
.hfb .hf-qa2-age{ display:grid; gap:6px; }
.hfb .hf-qa2-age .hf-qa2-bar{ position:relative; display:flex; height:40px; border:2px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-qa2-age .hf-qa2-bar > span{ display:grid; place-items:center; font:800 13px/1 var(--body); color:var(--ink); border-right:1.5px solid var(--hf-line); transition:background .3s; }
.hfb .hf-qa2-age .hf-qa2-bar > span:last-of-type{ border-right:0; }
.hfb .hf-qa2-age .hf-qa2-bar > span.iv{ background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hfb .hf-qa2-age .hf-qa2-bar > span.v{ background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hfb .hf-qa2-age .hf-qa2-bar > span.iv.on{ background:color-mix(in srgb, var(--hf-red) 38%, var(--paper)); }
.hfb .hf-qa2-age .hf-qa2-bar > span.v.on{ background:color-mix(in srgb, var(--ok) 42%, var(--paper)); }
.hfb .hf-qa2-age .hf-qa2-bar > i{ position:absolute; top:0; bottom:0; width:3px; margin-left:-1.5px; background:var(--hf-line); }
.hfb .hf-qa2-age .hf-qa2-ax{ position:relative; height:16px; font:700 13px/1 var(--mono); color:var(--graphite); }
.hfb .hf-qa2-age .hf-qa2-ax span{ position:absolute; top:0; transform:translateX(-50%); }
.hfb .hf-qa2-age input[type=range]{ width:100%; margin:0; accent-color:var(--hf-k); height:30px; }
.hfb .hf-qa2-age .hf-qa2-rd{ font:600 14.5px/1.35 var(--body); text-align:center; margin:0; color:var(--ink); }
.hfb .hf-qa2-tabs{ display:flex; gap:4px; direction:ltr; }
.hfb .hf-qa2-tabs button{ flex:1 1 0; font:700 13.5px/1 var(--mono); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-qa2-tabs button[aria-pressed="true"]{ background:var(--hf-line); color:var(--paper); border-color:var(--hf-line); }
.hfb .hf-qa2-spec{ font-size:14px; line-height:1.3; margin:0; color:var(--ink); text-align:center; }
.hfb .hf-qa2-ep{ display:grid; gap:4px 5px; align-items:center; direction:ltr; }
.hfb .hf-qa2-ep .hf-qa2-hd{ font:700 13px/1.1 var(--body); color:var(--graphite); text-align:center; }
.hfb .hf-qa2-ep .hf-qa2-val{ font:800 14px/1 var(--mono); color:var(--ink); text-align:right; padding-right:3px; }
.hfb .hf-qa2-ep button{ font:700 13px/1 var(--mono); min-height:29px; padding:0 2px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; min-width:0; white-space:nowrap; }
.hfb .hf-qa2-ep button[aria-pressed="true"]{ background:var(--hf-line); color:var(--paper); border-color:var(--hf-line); }
.hfb .hf-qa2-ep button.bv[aria-pressed="true"]{ background:var(--hf-red); border-color:var(--hf-red); color:#fff; }
.hfb .hf-qa2-ep .hf-qa2-val.ok{ color:var(--ok); } .hfb .hf-qa2-ep .hf-qa2-val.no{ color:var(--hf-red); }
.hfb .hf-qa2-ep .hf-qa2-val.ok::after{ content:" ✓"; } .hfb .hf-qa2-ep .hf-qa2-val.no::after{ content:" ✗"; }
.hfb .hf-qa2-ep .hf-qa2-nt{ grid-column:1 / -1; font:600 13px/1.15 var(--body); color:var(--hf-k); margin:-2px 0 2px; text-align:center; }
.hfb .hf-qa2-tr{ display:grid; grid-template-columns:22px 74px repeat(4, minmax(0,1fr)); gap:4px 5px; align-items:center; direction:ltr; }
.hfb .hf-qa2-tr > b{ font:800 13px/1 var(--body); color:var(--graphite); text-align:center; }
.hfb .hf-qa2-tr > span{ font:700 13.5px/1 var(--mono); color:var(--ink); }
.hfb .hf-qa2-tr > span.ok{ color:var(--ok); } .hfb .hf-qa2-tr > span.no{ color:var(--hf-red); }
.hfb .hf-qa2-tr > span.ok::after{ content:" ✓"; } .hfb .hf-qa2-tr > span.no::after{ content:" ✗"; }
.hfb .hf-qa2-tr button{ font:700 13px/1 var(--mono); min-height:29px; padding:0; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; min-width:0; }
.hfb .hf-qa2-tr button[aria-pressed="true"]{ background:var(--hf-line); color:var(--paper); border-color:var(--hf-line); }
.hfb .hf-qa2-tr .hf-qa2-st{ grid-column:2 / -1; font:800 13.5px/1 var(--mono); color:var(--hf-k); }
.hfb .hf-qa2-cov{ display:grid; grid-template-columns:1fr 1fr; gap:3px 8px; direction:ltr; }
.hfb .hf-qa2-cov span{ font:600 13px/1.25 var(--mono); color:var(--graphite); padding:2px 6px; border-radius:5px; border:1.5px dashed var(--faint); white-space:nowrap; }
.hfb .hf-qa2-cov span.on{ color:var(--ink); border-style:solid; border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hfb .hf-qa2-cov span.on::after{ content:" ✓"; color:var(--ok); font-weight:800; }
.hfb .hf-qa2-cnt{ font:700 13.5px/1.3 var(--body); color:var(--ink); text-align:center; margin:0; }
.hfb .hf-qa2-five{ display:grid; gap:6px; }
.hfb .hf-qa2-five > div{ display:grid; grid-template-columns:30px 1fr; gap:9px; align-items:center; font-size:14.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-qa2-five > div > b{ display:grid; place-items:center; width:28px; height:28px; border-radius:50%; background:var(--hf-k); color:#fff; font:800 14px/1 var(--body); }
.hfb .hf-qa2-five > div.ex{ animation:hf-qa2-pop .5s ease both; }
@keyframes hf-qa2-pop{ from{ opacity:0; transform:translateX(-10px); } }
.hfb.hf-ar .hf-qa2-terms > *, .hfb.hf-ar .hf-qa2-vs > div, .hfb.hf-ar .hf-qa2-five > div, .hfb.hf-ar .hf-qa2-rd, .hfb.hf-ar .hf-qa2-spec, .hfb.hf-ar .hf-qa2-cnt, .hfb.hf-ar .hf-qa2-ep .hf-qa2-nt, .hfb.hf-ar .hf-qa2-ep .hf-qa2-hd{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.45; }
.hfb.hf-ar .hf-qa2-terms > b{ font-family:var(--body); }
@media (prefers-reduced-motion: reduce){ .hfb .hf-qa2-five > div.ex{ animation:none; } .hfb .hf-qa2-age .hf-qa2-bar > span{ transition:none; } }
`;
    document.head.appendChild(s);
  }

  // a two-column table of terms: the term, its meaning, and the lecture's example
  const Terms = ({ rows }) => html`<div className="hf-qa2-terms hf-in">${rows.map(([a, b, c], j) => html`<${React.Fragment} key=${j}><b><bdi>${a}</bdi></b><span>${T(b)}${c ? html`<i>${T(c)}</i>` : null}</span></${React.Fragment}>`)}</div>`;
  // two things side by side
  const VS = ({ head, rows, tone }) => html`<div className="hf-qa2-vs hf-in"><div className=${'hd' + (tone ? ' ok' : '')}>${T(head[0])}</div><div className=${'hd' + (tone ? ' no' : '')}>${T(head[1])}</div>
    ${rows.map(([a, b], j) => html`<${React.Fragment} key=${j}><div>${T(a)}</div><div>${T(b)}</div></${React.Fragment}>`)}</div>`;
  // a small data table (always left to right: it is data)
  const TB = ({ head, rows }) => html`<table className="hf-qa2-tb hf-in" dir="ltr"><thead><tr>${head.map((h, j) => html`<th key=${j}>${h}</th>`)}</tr></thead>
    <tbody>${rows.map((r, i) => html`<tr key=${i}>${r.map((c, j) => { const [txt, cls] = [].concat(c); return html`<td key=${j} className=${cls || ''}>${T(String(txt))}</td>`; })}</tr>`)}</tbody></table>`;

  // the driving-license example as a number line: slide the age and watch which of the 3 classes it falls in
  function License() {
    const ar = useAr();
    const [a, setA] = H.K.useSlot('lic', 30);
    const M = 80, c = a < 18 ? 0 : a > 60 ? 2 : 1;
    const segs = [[0, 18], [18, 60], [60, 80]];
    const names = ar ? ['أقل من 18', 'من 18 لـ 60', 'أكبر من 60'] : ['below 18', '18 to 60', 'above 60'];
    const vd = c === 1 ? 'valid' : 'invalid';
    return html`<div className="hf-qa2-age hf-in">
      <div className="hf-qa2-bar" dir="ltr">${segs.map(([x0, x1], j) => html`<span key=${j} className=${(j === 1 ? 'v' : 'iv') + (j === c ? ' on' : '')} style=${{ flex: (x1 - x0) + ' 0 0' }}>${j === 1 ? 'valid' : 'invalid'}</span>`)}
        <i style=${{ left: (a / M * 100) + '%' }}></i></div>
      <div className="hf-qa2-ax" dir="ltr">${[0, 18, 60, 80].map(x => html`<span key=${x} style=${{ left: (x / M * 100) + '%', transform: x === 0 ? 'none' : x === M ? 'translateX(-100%)' : null }}>${x}</span>`)}</div>
      <input type="range" dir="ltr" min="0" max=${M} step="1" value=${a} aria-label=${ar ? 'السن' : 'Age'} onInput=${e => setA(+e.target.value)} onChange=${e => setA(+e.target.value)} />
      <p className="hf-qa2-rd" dir=${ar ? 'rtl' : 'ltr'}>${ar
        ? html`السن <b><bdi>${a}</bdi></b> في الـ class رقم <bdi>${c + 1}</bdi> من 3 (<b>${names[c]}</b>)، يعني <b>${vd}</b>`
        : html`Age <b>${a}</b> is in class ${c + 1} of 3 (<b>${names[c]}</b>): <b>${vd}</b>`}</p>
    </div>`;
  }

  // Be the partitioner: for each value pick its partition and say whether it is a boundary value (the notes' own answers)
  const SPEC = [
    { tab: '1–255', en: 'A text entry field allows <b>1 to 255</b> characters. Each value is a length.', ar: 'فيه text field بيقبل من <b>1 لـ 255</b> حرف. وكل قيمة هنا هي طول الكلام.', parts: ['< 1', '1–255', '> 255'],
      rows: [['0', 0, 1, 'invalid boundary', 'الـ invalid boundary'], ['1', 1, 1, 'valid boundary', 'الـ valid boundary'], ['128', 1, 0, 'a middle value: valid, not a boundary', 'قيمة في النص: valid ومش boundary'], ['255', 1, 1, 'valid boundary', 'الـ valid boundary'], ['256', 2, 1, 'invalid boundary', 'الـ invalid boundary']] },
    { tab: '> 9000', en: 'The program shall accept an input value of <b>integer &gt; 9000</b>.', ar: 'البرنامج لازم يقبل input قيمته <b><bdi dir="ltr">integer &gt; 9000</bdi></b>.', parts: ['≤ 9000', '> 9000'],
      rows: [['5000', 0, 0, 'invalid, but far from the edge', 'قيمة invalid، بس بعيدة عن الحافة'], ['9000', 0, 1, 'invalid boundary: must be rejected', 'الـ invalid boundary: لازم تترفض'], ['9001', 1, 1, 'valid boundary: the first valid value', 'الـ valid boundary: أول قيمة valid'], ['9999', 1, 0, 'a normal valid value', 'قيمة valid عادية']] },
    { tab: '10000–99999', en: 'Each input is a <b>5-digit integer</b>, from <b>10,000 to 99,999</b>.', ar: 'كل input عبارة عن <b>integer من 5 digits</b>، من <b><bdi dir="ltr">10,000</bdi> لـ <bdi dir="ltr">99,999</bdi></b>.', parts: ['< 10000', '10000–99999', '> 99999'],
      rows: [['00000', 0, 0, 'invalid special value', 'الـ invalid special value'], ['09999', 0, 1, 'invalid left boundary', 'الـ invalid left boundary'], ['10000', 1, 1, 'valid left boundary', 'الـ valid left boundary'], ['50000', 1, 0, 'valid mid', 'الـ valid mid'], ['99999', 1, 1, 'valid right boundary', 'الـ valid right boundary'], ['100000', 2, 1, 'invalid right boundary', 'الـ invalid right boundary']] }
  ];
  function Parts() {
    const ar = useAr();
    const [tab, setTab] = H.K.useSlot('ep:t', 0);
    const s = SPEC[tab];
    const [p, setP] = H.K.useSlot('ep' + tab + ':p', {});
    const [b, setB] = H.K.useSlot('ep' + tab + ':b', {});
    const [ck, setCk] = H.K.useSlot('ep' + tab + ':c', false);
    const ok = i => p[i] === s.rows[i][1] && !!b[i] === !!s.rows[i][2];
    const right = s.rows.filter((_, i) => ok(i)).length, n = s.rows.length;
    const cols = { gridTemplateColumns: '58px repeat(' + s.parts.length + ', minmax(0,1fr)) 38px' };
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-qa2-tabs" role="group" aria-label="Specification">${SPEC.map((x, j) => html`<button key=${j} aria-pressed=${String(j === tab)} onClick=${() => setTab(j)}>${x.tab}</button>`)}</div>
      <p className="hf-qa2-spec">${T(ar ? s.ar : s.en)}</p>
      <div className="hf-qa2-ep" style=${cols}>
        <span></span>${s.parts.map((x, j) => html`<span key=${j} className="hf-qa2-hd">${j === 1 ? 'valid' : 'invalid'}</span>`)}<span className="hf-qa2-hd">BV?</span>
        ${s.rows.map((r, i) => html`<${React.Fragment} key=${tab + '-' + i}>
          <span className=${'hf-qa2-val' + (ck && p[i] != null ? (ok(i) ? ' ok' : ' no') : '')}>${r[0]}</span>
          ${s.parts.map((x, j) => html`<button key=${j} aria-pressed=${String(p[i] === j)} aria-label=${r[0] + ' in ' + x} onClick=${() => { setP(Object.assign({}, p, { [i]: j })); setCk(false); }}>${x}</button>`)}
          <button className="bv" aria-pressed=${String(!!b[i])} aria-label=${r[0] + ' is a boundary value'} onClick=${() => { setB(Object.assign({}, b, { [i]: !b[i] })); setCk(false); }}>BV</button>
          ${ck && (p[i] != null || b[i] != null) && html`<span className="hf-qa2-nt" dir=${ar ? 'rtl' : 'ltr'}>${ar ? html`${r[4]} (<bdi>${r[0]}</bdi>)` : r[0] + ': ' + r[3]}</span>`}
        </${React.Fragment}>`)}
      </div>
      <div className="hf-row" style=${{ justifyContent: 'center' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(p).length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const P = {}, B = {}; s.rows.forEach((r, i) => { P[i] = r[1]; B[i] = !!r[2]; }); setP(P); setB(B); setCk(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${n}</bdi> صح` : right + ' / ' + n + ' right'}</span>`}
      </div>
    </div>`;
  }

  // Be the media player: after each button press, tap the state you are in; solved test cases light up the transitions they cover
  const MP = { OFF: { play: 'PLAY', ff: 'FF' }, PLAY: { stop: 'OFF', ff: 'FP' }, FF: { stop: 'OFF', play: 'PLAY' }, FP: { stop: 'PLAY', ff: 'FF' } };
  const EDGES = [['OFF', 'play', 'PLAY'], ['OFF', 'ff', 'FF'], ['PLAY', 'stop', 'OFF'], ['PLAY', 'ff', 'FP'], ['FF', 'stop', 'OFF'], ['FF', 'play', 'PLAY'], ['FP', 'stop', 'PLAY'], ['FP', 'ff', 'FF']];
  const TCS = [['play', 'ff', 'ff', 'stop'], ['ff', 'play', 'ff', 'stop', 'stop']];
  const chain = seq => { let s = 'OFF'; return seq.map(a => (s = MP[s][a])); };
  const SN = ['OFF', 'PLAY', 'FF', 'FP'];
  const BL = { play: 'play', ff: 'fast fwd', stop: 'stop' };
  function Trace() {
    const ar = useAr();
    const [tab, setTab] = H.K.useSlot('tr:t', 0);
    const [v0, setV0] = H.K.useSlot('tr0:v', {}), [c0, setC0] = H.K.useSlot('tr0:c', false);
    const [v1, setV1] = H.K.useSlot('tr1:v', {}), [c1, setC1] = H.K.useSlot('tr1:c', false);
    const V = [v0, v1], C = [c0, c1], SV = [setV0, setV1], SC = [setC0, setC1];
    const seq = TCS[tab], ans = chain(seq), v = V[tab], ck = C[tab];
    const solved = k => C[k] && chain(TCS[k]).every((x, i) => V[k][i] === x);
    const right = ans.filter((x, i) => v[i] === x).length;
    const cov = new Set(), seen = new Set();
    [0, 1].forEach(k => { if (!solved(k)) return; let s = 'OFF'; seen.add(s); TCS[k].forEach(a => { const to = MP[s][a]; cov.add(s + a); seen.add(to); s = to; }); });
    const pick = (i, st) => { SV[tab](Object.assign({}, v, { [i]: st })); SC[tab](false); };
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-qa2-tabs" role="group" aria-label="Test case">${['TC1', 'TC2'].map((x, j) => html`<button key=${j} aria-pressed=${String(j === tab)} onClick=${() => setTab(j)}>${x}${solved(j) ? ' ✓' : ''}</button>`)}</div>
      <div className="hf-qa2-tr">
        <b>0</b><span className="hf-qa2-st">${'<Off>'}</span>
        ${seq.map((a, i) => html`<${React.Fragment} key=${tab + '-' + i}>
          <b>${i + 1}</b><span className=${ck && v[i] ? (v[i] === ans[i] ? 'ok' : 'no') : ''}>${BL[a]}</span>
          ${SN.map(st => html`<button key=${st} aria-pressed=${String(v[i] === st)} aria-label=${'after ' + a + ': ' + st} onClick=${() => pick(i, st)}>${st}</button>`)}
        </${React.Fragment}>`)}
      </div>
      <div className="hf-row" style=${{ justifyContent: 'center' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => SC[tab](true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; ans.forEach((x, i) => { o[i] = x; }); SV[tab](o); SC[tab](true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${ans.length}</bdi> صح` : right + ' / ' + ans.length + ' right'}</span>`}
      </div>
      <p className="hf-qa2-cnt" dir=${ar ? 'rtl' : 'ltr'}>${ar
        ? html`الـ states اللي اتزارت: <bdi>${seen.size} / 4</bdi> · الـ transitions: <bdi>${cov.size} / 8</bdi>`
        : html`States visited: ${seen.size} / 4 · transitions exercised: ${cov.size} / 8`}</p>
      <div className="hf-qa2-cov">${EDGES.map(([f, a, t]) => html`<span key=${f + a} className=${cov.has(f + a) ? 'on' : ''}>${f} –${a}→ ${t}</span>`)}</div>
    </div>`;
  }

  // the five ways to cut down the states and transitions, appearing one by one
  const Five = ({ items }) => html`<div className="hf-qa2-five">${items.map((x, j) => html`<div key=${j} className="ex" style=${{ animationDelay: calm() ? '0s' : (0.15 + j * 0.2) + 's' }}><b>${j + 1}</b><span>${T(x)}</span></div>`)}</div>`;

  H.chapters.qa[2] = {
    title: 'Black Box Testing', kicker: 'Chapter 2', run: 'black box testing',
    ar: { title: 'الـ Black Box Testing', kicker: 'الفصل 2', run: 'الـ black box testing' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 2);
      const arQuiz = (window.AR && window.AR.qa && window.AR.qa.lectures && window.AR.qa.lectures[2] && window.AR.qa.lectures[2].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · where we left off (faces the opener)
        page(html`
          <${H2}>${t('Where we left off', 'إحنا وقفنا فين')}</${H2}>
          <${P} small=${true}>${X('In Chapter 1 you met <b>software testing</b>: what makes something a <b>bug</b>, why bugs happen, why the cost of fixing one depends on <b>when</b> it is found, and the development models (Waterfall, Spiral, <b>V-Model</b>, RAD, Agile) with their test levels.',
            'في الفصل الأول اتعرّفت على الـ <b>software testing</b>: إمتى الحاجة تبقى <b>bug</b>، والـ bugs بتحصل ليه، وليه تكلفة إصلاحها بتعتمد على <b>إمتى</b> اكتشفناها، والـ development models (الـ Waterfall والـ Spiral والـ <b>V-Model</b> والـ RAD والـ Agile) ومستويات الـ testing فيها.')}</${P}>
          <${P} small=${true}>${X('Now the real question: <b>how do you actually design tests?</b> This chapter starts with the kind where you <b>never look at the code</b>.',
            'دلوقتي السؤال الحقيقي: <b>إزاي تصمم الـ tests فعلًا؟</b> الفصل ده بيبدأ بالنوع اللي <b>عمرك ما بتبص فيه على الـ code</b>.')}</${P}>
          <${Box} kind="brain"><p className="hf-p">${X('A warm-up. Someone hands you a sealed calculator and its manual. You may not open it. How would you convince yourself that <b>addition</b> works? Which sums would you try first, and which would you try to <b>break</b> it?',
            'تسخين. حد إدّاك calculator متقفلة ومعاها الـ manual بتاعها، وممنوع تفتحها. هتتأكد إزاي إن <b>الجمع</b> شغال؟ أنهي عمليات هتجربها الأول، وأنهي عمليات هتجربها عشان <b>تبوّظها</b>؟')}</p></${Box}>
          <${Grow} />
          <${Hand}>${t('keep your answer: the lecture tests exactly this calculator', 'خلّي إجابتك معاك: المحاضرة بتختبر الـ calculator دي بالظبط')}</${Hand}>
        `, { sec: t('Where we left off', 'إحنا وقفنا فين') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">2</span><span className="t">${A ? html`الفصل التاني<br/>Software Quality` : html`Chapter two<br/>Software Quality`}</span></div>
            <${Gap} h=${8} /><${H1}>${t("Don't Open the Box", 'ماتفتحش الصندوق')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('black box testing', 'الـ black box testing')}</p></div>
          <${Talk} who="bug">${X("You'll never find me. I'm hiding <b>inside</b> the code, and you can't even see it.", 'عمرك ما هتلاقيني. أنا مستخبي <b>جوه</b> الـ code، وإنت أصلًا مش شايفه.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X("I don't need to see inside. I know what <b>should</b> come out for what goes in. When the output is wrong, I've got you.", 'أنا مش محتاج أشوف جوه. أنا عارف إيه اللي <b>المفروض</b> يطلع لكل حاجة بتدخل. ولما الـ output يطلع غلط، أبقى مسكتك.')}</${Talk}>
          <${P}>${X('In this chapter you will learn the tester\'s vocabulary, test <b>without</b> the code, choose a handful of values that stand in for millions (<b>equivalence partitions</b> and <b>boundaries</b>), and walk a program through its <b>states</b>.',
            'في الفصل ده هتتعلم لغة الـ testers، وتختبر <b>من غير</b> الـ code، وتختار شوية قيم بيمثلوا ملايين القيم (الـ <b>equivalence partitions</b> والـ <b>boundaries</b>)، وتمشّي البرنامج على الـ <b>states</b> بتاعته.')}</${P}>
        `, { sec: t('Meet the black box', 'اتعرّف على الـ black box') }),

        // 2 · terms, part 1
        page(html`
          <${H2}>${t('Speak like a tester (1)', 'اتكلم زي الـ tester (1)')}</${H2}>
          <${P} small=${true}>${t("The lecture's table of terms, with its examples:", 'جدول المصطلحات بتاع المحاضرة، بأمثلته:')}</${P}>
          <${Terms} rows=${A ? [
            ['Bug / Defect', 'عيب أو غلطة بتطلّع نتايج مش مقصودة', 'زي زرار الـ login اللي مش شغال'],
            ['Verification', 'السؤال:<span class="ltr">"Are we building the product right?"</span>', 'زي الـ code reviews والـ design checks'],
            ['Validation', 'السؤال:<span class="ltr">"Are we building the right product?"</span>', 'زي الـ user acceptance testing'],
            ['QA', 'مركّز على الـ <b>process</b>، و<b>وقائي</b> (preventive)', 'زي الـ process audits والـ checklists'],
            ['QC', 'مركّز على الـ <b>product</b>، و<b>تصحيحي</b> (corrective)', 'زي الـ unit testing والـ system testing']
          ] : [
            ['Bug / Defect', 'A flaw or error causing unintended results', 'Login button not working'],
            ['Verification', '"Are we building the product <b>right</b>?"', 'Code reviews, design checks'],
            ['Validation', '"Are we building the <b>right product</b>?"', 'User acceptance testing'],
            ['QA', 'Quality Assurance: <b>process</b>-focused, <b>preventive</b>', 'Process audits, checklists'],
            ['QC', 'Quality Control: <b>product</b>-focused, <b>corrective</b>', 'Unit and system testing']
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('our trick: QA guards the Process (prevents), QC checks the Product (corrects)', 'حيلة من عندنا: الـ QA بيحرس الـ process (يمنع)، والـ QC بيفحص الـ product (يصلّح)')}</${Hand}>
        `, { sec: t('Testing terms', 'المصطلحات') }),

        // 3 · terms, part 2
        page(html`
          <${H2}>${t('Speak like a tester (2)', 'اتكلم زي الـ tester (2)')}</${H2}>
          <${Terms} rows=${A ? [
            ['Test Plan', 'الـ document اللي فيه <b>أهداف الـ testing والـ scope</b>', 'زي وصف الـ scope بتاع الـ login testing'],
            ['Test Case', 'الـ <b>input</b> والـ <b>conditions</b> والـ <b>expected output</b>', 'زي password غلط يطلّع "Error"'],
            ['Unit', 'أصغر component ينفع يتعمله test', 'زي test لـ function أو module'],
            ['Integration', 'بيختبر الـ <b>interfaces</b> بين الـ modules', 'زي توصيل الـ payment بالـ billing'],
            ['System', 'بيختبر سلوك الـ system <b>كله</b>', 'إن الـ specifications اتحققت'],
            ['Acceptance', 'بيعمله الـ <b>user أو العميل</b>', 'إن الـ product ماشي على الـ requirements'],
            ['Agile', 'testing بدري ومركّز على العميل في دورات الـ agile', 'زي الـ validation في كل sprint']
          ] : [
            ['Test Plan', 'Document with the test <b>objectives and scope</b>', 'Describes the login testing scope'],
            ['Test Case', '<b>Input</b>, <b>conditions</b> and <b>expected output</b>', 'Invalid password → "Error" message'],
            ['Unit', 'The smallest testable component', 'A function or module test'],
            ['Integration', 'Tests the <b>interfaces</b> between modules', 'Payment module connects to billing'],
            ['System', 'Tests the <b>complete</b> system behaviour', 'Ensure the specifications are met'],
            ['Acceptance', 'Performed by the <b>user/customer</b>', 'The product meets the requirements'],
            ['Agile', 'Early, customer-focused testing in agile cycles', 'Sprint-based validation']
          ]} />
        `),

        // 4 · verification vs validation, a doctors' question
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('The exam asks this pair <b>every time</b>, in both directions. Checked against the <b>specification</b> → <b>verification</b> (product right). Checked against the <b>user\'s / customer\'s requirement</b> → <b>validation</b> (right product). "Design" and "Requirements" are distractors: they are not checking processes.',
            'الامتحان بيسأل الاتنين دول <b>كل مرة</b>، وفي الاتجاهين. لو بنقارن بالـ <b>specification</b> يبقى <b>verification</b> (الـ product صح). ولو بنقارن بـ <b>requirement الـ user أو العميل</b> يبقى <b>validation</b> (الـ product الصح). والـ "Design" والـ "Requirements" تمويه: دول مش processes بتاعة تأكيد.')}</p></${Box}>
          ${mq('vv', /customer's Requirement/)}
          <${Grow} />
          <${Hand} red=${true}>${t('our trick: VERification checks the spec; VALidation checks VALue to the user', 'حيلة من عندنا: الـ VERification بيقارن بالـ spec؛ والـ VALidation بيشوف الـ VALue عند الـ user')}</${Hand}>
        `),

        // 5 · match the terms
        page(html`
          <${Box} kind="pencil" title=${t('Who means what?', 'مين معناه إيه؟')}><p className="hf-p small">${t('Tap a term on the left, then its meaning on the right.', 'دوس على المصطلح، وبعدين على معناه.')}</p></${Box}>
          <${Match} id="terms" left=${['Verification', 'Validation', 'QA', 'QC', 'Test plan', 'Test case']}
            right=${A ? ['الـ input والـ conditions والـ expected output', 'هل بنبني الـ product الصح؟', 'مركّز على الـ process ووقائي', 'الـ document اللي فيه الأهداف والـ scope', 'هل بنبني الـ product صح؟', 'مركّز على الـ product وتصحيحي']
              : ['Input, conditions and expected output', 'Are we building the right product?', 'Process-focused, preventive', 'Document with test objectives and scope', 'Are we building the product right?', 'Product-focused, corrective']}
            answer=${[4, 1, 2, 5, 3, 0]} />
        `),

        // 6 · black-box testing
        page(html`
          <${H1}>${t('Inputs in, outputs out, eyes shut', 'input داخل، output خارج، والعين مقفولة')}</${H1}>
          <${Def}>${X('<b>Black-box (functional) testing</b>, also called <b>behavioral testing</b>, focuses on functionality <b>without knowing the internal logic</b>. The tester analyses <b>inputs and expected outputs</b> and checks that the software meets the requirements.',
            'الـ <b>Black-box (functional) testing</b>، واسمه كمان <b>behavioral testing</b>، بيركز على الـ functionality <b>من غير ما نعرف الـ internal logic</b>. الـ tester بيحلل <b>الـ inputs والـ expected outputs</b> ويتأكد إن الـ software ماشي على الـ requirements.')}</${Def}>
          <${Talk} who="dev">${t("So you never read my code? Not even a little?", 'يعني إنت عمرك ما بتقرا الـ code بتاعي؟ ولا حتة صغيرة؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Never. I act like the <b>customer</b>. In the lecture\'s <b>ATM</b> example I check, through the GUI: the display changes when the card is detected, the password is masked, and I can go from the main menu to a function.',
            'أبدًا. أنا بتصرف زي <b>العميل</b>. في مثال الـ <b>ATM</b> في المحاضرة بختبر من خلال الـ GUI: الشاشة بتتغير لما الكارت يتعرف عليه، والـ password بيبان نجوم (masking)، وأقدر أروح من الـ main menu لأي function.')}</${Talk}>
          <${Grow} />
          <${Hand}>${t('our analogy: a vending machine. Coin in, snack out; you never unscrew the back.', 'تشبيه من عندنا: مكنة حاجة ساقعة. فلوس داخلة وحاجة طالعة، وعمرك ما بتفك ضهرها.')}</${Hand}>
        `, { sec: t('Black-box testing', 'الـ Black-box testing') }),
        page(html`
          <${H2}>${t('The closed box (slide 6)', 'الصندوق المقفول (سلايد 6)')}</${H2}>
          <${Fig} name="qa-blackbox" />
        `),

        // 8 · pros and cons
        page(html`
          <${H2}>${t('What the black box is good and bad at', 'الـ black box شاطر في إيه ووحش في إيه')}</${H2}>
          <${VS} tone=${true} head=${A ? ['المميزات', 'العيوب'] : ['Advantages', 'Disadvantages']} rows=${A ? [
            ['مش محتاج تفهم الـ code', 'مش هتقدر تختبر <b>كل</b> الـ inputs الممكنة'],
            ['الـ test cases بتتعمل بسرعة', 'صعب تصمم cases لو الـ requirements <b>مش واضحة</b>'],
            ['بيساعد <b>يكشف الغموض</b> (ambiguities) في الـ specifications', 'الـ bugs اللي في الأجزاء <b>المعقدة</b> ممكن ماتتكشفش'],
            ['مناسب للـ testing من <b>وجهة نظر الـ user</b> (الـ GUI)', '']
          ] : [
            ['No need to understand the code', 'Cannot test <b>all</b> possible inputs'],
            ['Quick test-case development', 'Hard to design cases if requirements are <b>unclear</b>'],
            ['Helps <b>expose ambiguities</b> in the specifications', 'Bugs in <b>complex</b> areas may go undetected'],
            ['Suits <b>user-perspective</b> (GUI) testing', '']
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('If a question says <i>"exposes ambiguities in the specifications"</i> and <i>"from a user\'s perspective"</i>, the answer is <b>black box testing</b>, not white box, manual or automation testing. (It is waiting for you in the Exam corner.)',
            'لو السؤال فيه "بيكشف الغموض في الـ specifications" و"من وجهة نظر الـ user"، تبقى الإجابة <b>black box testing</b>، مش white box ولا manual ولا automation. (مستنيك في ركن الامتحان.)')}</p></${Box}>
        `),

        // 9 · static vs dynamic
        page(html`
          <${H2}>${t('Is it running? Static or dynamic', 'هو شغال ولا لأ؟ static ولا dynamic')}</${H2}>
          <${Def}>${X('<b>Static testing</b> = testing something that is <b>not running</b> (examining and reviewing it).<br/><b>Dynamic testing</b> = <b>running</b> and using the software.',
            'الـ <b>Static testing</b> معناه إنك تختبر حاجة <b>مش شغالة</b> (بتفحصها وتراجعها).<br/>والـ <b>Dynamic testing</b> معناه إنك <b>تشغّل</b> الـ software وتستخدمه.')}</${Def}>
          ${mq('static', /not running, examining/)}
          <${Grow} />
          <${Hand} red=${true}>${t('our trick: static = standing still; dynamic = moving. "Requirement" and "analysis" testing are not lecture terms.', 'حيلة من عندنا: الـ static يعني واقف، والـ dynamic يعني بيتحرك. و"requirement testing" و"analysis testing" مش مصطلحات المحاضرة.')}</${Hand}>
        `, { sec: t('Static vs dynamic', 'الـ Static والـ dynamic') }),

        // 10 · static and dynamic black-box
        page(html`
          <${H2}>${t('Two flavours of black box', 'نوعين من الـ black box')}</${H2}>
          <${VS} head=${A ? ['الـ Static black-box', 'الـ Dynamic black-box'] : ['Static black-box', 'Dynamic black-box']} rows=${A ? [
            ['testing <b>من غير ما نشغّل</b> الـ software', 'testing عن طريق إننا <b>نشغّل</b> الـ software بـ data'],
            ['بيركز على الـ <b>specification</b>', 'من غير ما نعرف الـ code اللي جوه (وجهة نظر العميل)'],
            ['الهدف منه: نتأكد إنها <b>كاملة ومناسبة</b>', 'اسمه كمان <b>exploratory</b> أو behavioral testing'],
            ['الـ document الأساسي: الـ spec (زي الـ user manual) من بدري في الـ SDLC', 'لازم يكون معاك الـ specification'],
            ['الهدف: documentation من غير bugs، واضحة، ومركزة على الـ user', 'ابدأ بالـ <b>test-to-pass</b>، وبعدين الـ <b>test-to-fail</b>']
          ] : [
            ['Testing <b>without executing</b> the software', 'Testing by <b>executing</b> the software with data'],
            ['Focuses on the <b>specification</b>', 'Without knowing the inside code (the customer\'s view)'],
            ['Purpose: ensure <b>completeness and appropriateness</b>', 'Also called <b>exploratory</b> / behavioral testing'],
            ['Key document: the spec (e.g. user manual), from early in the SDLC', 'You should have the specification'],
            ['Goal: bug-free, clear, user-focused documentation', 'Start with <b>test-to-pass</b>, then <b>test-to-fail</b>']
          ]} />
          <${Grow} />
          <${Talk} who="lens">${X('Static black-box: I test the <b>manual</b> before anyone writes code. Dynamic black-box: I press the buttons.', 'الـ static black-box: بختبر الـ <b>manual</b> قبل ما حد يكتب code. والـ dynamic black-box: بدوس على الزراير.')}</${Talk}>
        `),

        // 11 · steps of dynamic black-box testing
        page(html`
          <${H2}>${t('Starting dynamic black-box testing', 'إزاي تبدأ الـ dynamic black-box testing')}</${H2}>
          <${UL} items=${A ? ['أولًا: يكون معاك الـ <b>documents أو الـ specifications</b>.', 'تانيًا: <b>تحدد الـ test cases</b>.'] : ['Step 1: have the <b>documents / specifications</b>.', 'Step 2: <b>define the test cases</b>.']} />
          <${P} small=${true}>${X('The lecture\'s example: the <b>addition</b> function of the Windows calculator. Its test cases:', 'مثال المحاضرة: عملية <b>الجمع</b> في الـ Windows calculator. والـ test cases بتاعتها:')}</${P}>
          <${Code} lines=${['0 + 0   = 0', '0 + 1   = 1', '254 + 1 = 255', '255 + 1 = 256', '256 + 1 = 257']} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Three of the five cases sit right around <b>255</b>. Why would a tester crowd them there? (Our hint, not the slides\': 255 is the biggest number one byte can hold. Keep the thought: <b>boundaries</b> are coming.)',
            'تلاتة من الخمس cases متلمّين حوالين الـ <b>255</b>. ليه الـ tester يزحمهم هناك؟ (تلميح من عندنا مش من السلايدز: الـ 255 هي أكبر رقم ينفع يتخزن في byte واحد. خلّي الفكرة دي معاك، الـ <b>boundaries</b> جاية.)')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('Run it and watch only the edges (slides 12–13)', 'شغّله وبص على اللي داخل وطالع بس (سلايد 12–13)')}</${H2}>
          <${Fig} name="qa-dynamic-bb" />
        `),

        // 13 · test-to-pass vs test-to-fail
        page(html`
          <${H1}>${t('Be kind first, then be cruel', 'اتعامل بالراحة الأول، وبعدين اقسى')}</${H1}>
          <${Def}>${X('<b>Test-to-pass</b>: assure the software <b>minimally works</b> ("kindness dealing"). Test in normal cases, using boundaries, sub-boundaries and default data.',
            'الـ <b>Test-to-pass</b>: نتأكد إن الـ software <b>شغال على الأقل بالحد الأدنى</b> ("kindness dealing"، يعني بالراحة عليه). بنختبر في الحالات العادية، بالـ boundaries والـ sub-boundaries والـ default data.')}</${Def}>
          <${Def}>${X('<b>Test-to-fail</b>: find weaknesses by using <b>abnormal cases</b> (<b>forcing an error</b>).',
            'الـ <b>Test-to-fail</b>: بنلاقي نقط الضعف باستخدام <b>حالات مش طبيعية</b> (abnormal cases)، يعني <b>بنجبره يطلّع error</b>.')}</${Def}>
          <${Hand}>${t("and don't be surprised to find bugs even in test-to-pass", 'وماتستغربش لو لقيت bugs حتى في الـ test-to-pass')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<i>"Which dynamic technique pushes the software to its limits to find bugs under extreme conditions?"</i> → <b>test to fail</b>. Not data testing, not state testing.',
            'الـ technique اللي بيضغط على الـ software لحد أقصى حدوده عشان يلاقي bugs الظروف المتطرفة هو <b>test to fail</b>، مش data testing ولا state testing.')}</p></${Box}>
        `, { sec: t('Test-to-pass, test-to-fail', 'الـ Test-to-pass والـ test-to-fail') }),
        page(html`
          <${H2}>${t('The car example (slides 14–15)', 'مثال العربية (سلايد 14–15)')}</${H2}>
          <${Fig} name="qa-pass-fail" />
        `),

        // 15 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Test-to-pass and Test-to-fail, on who gets the software first.", 'كلام الليلة: الـ Test-to-pass والـ Test-to-fail، مين ياخد الـ software الأول.')} />
          <${Chat} names=${['Test-to-pass', 'Test-to-fail']} lines=${A ? [
            [0, 'أنا اللي بدخل الأول. بتأكد إن الـ software شغال على الأقل، بحالات عادية و default data. بالراحة عليه.'],
            [1, 'بالراحة؟ أنا بقى بضغط عليه لحد أقصى حدوده، بـ inputs متطرفة وحالات مش طبيعية، لحد ما حاجة تتكسر.'],
            [0, 'عشان كده السلايد بيقول: استخدمني أطلّع الـ bugs قبل ما تيجي إنت. سوق العربية عادي قبل الـ crash-test.'],
            [1, 'ماشي. بس ماتفتكرش نفسك نضيف: الـ testers بيلاقوا bugs حتى فيك إنت.'],
            [0, 'طب رسالة الـ error دي بتاعة مين؟ تعمل save على disk drive مفيهوش disk. الـ spec بتقول لازم يطلع error، وأنا بتأكد إنه ماشي على الـ spec. يبقى بتاعتي.'],
            [1, 'بس إنت كده بتجبره يطلّع error. يبقى بتاعتي أنا.'],
            [0, 'السلايد بيقول إنها في الآخر غالبًا <b>الاتنين</b>.'],
            [1, 'تمام، نتقاسمها.']
          ] : [
            [0, 'I go first. I check the software minimally works, with normal cases and default data. Kindness dealing.'],
            [1, 'Kindness? I push it to its limits with extreme inputs and abnormal cases until something breaks.'],
            [0, 'That\'s why the slide says: use me to reveal bugs before you test-to-fail. Drive the car before you crash it.'],
            [1, 'Fine. But don\'t act so clean: testers find bugs even in test-to-pass.'],
            [0, 'So whose is the error-message test? Saving to a disk drive with no disk. The spec says an error must appear, and I check it does. Mine.'],
            [1, 'You are forcing an error, though. Mine.'],
            [0, 'The slide says that in the end it is probably <b>both</b>.'],
            [1, 'Fine. We share it.']
          ]} />
        `),

        // 16 · sort: pass, fail or both
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Tap <b>P</b> for test-to-pass, <b>F</b> for test-to-fail, or <b>B</b> for both, then check.', 'دوس <b>P</b> للـ test-to-pass، أو <b>F</b> للـ test-to-fail، أو <b>B</b> لو الاتنين، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="pf" bins=${[['P', 'Test-to-pass'], ['F', 'Test-to-fail'], ['B', 'Both']]} items=${A ? [
            ['إنك تسوق العربية عادي', 0],
            ['الـ crash-test للعربية', 1],
            ['حالات عادية بالـ default data', 0],
            ['حالات مش طبيعية بتجبره يطلّع error', 1],
            ['إنك تتأكد إنه شغال بالحد الأدنى ("kindness dealing")', 0],
            ['إنك تضغط عليه لحد أقصى حدوده بـ inputs متطرفة', 1],
            ['إنك تعمل save على drive مفيهوش disk، والـ spec بتقول يطلع error', 2],
            ['إنك تدوّر على نقط الضعف في الـ software', 1]
          ] : [
            ['Driving the car normally', 0],
            ['Crash-testing the car', 1],
            ['Normal cases with default data', 0],
            ['Abnormal cases that force an error', 1],
            ['Assure it minimally works ("kindness dealing")', 0],
            ['Push it to its limits with extreme inputs', 1],
            ['Save to a drive with no disk; the spec says show an error', 2],
            ['Find weaknesses in the software', 1]
          ]} />
        `),

        // 17 · equivalence partitioning
        page(html`
          <${H1}>${t('A million tests? Pick one per class', 'مليون test؟ اختار واحد من كل class')}</${H1}>
          <${Talk} who="dev">${X('So I test <code>1+1</code>, <code>1+2</code>, <code>1+3</code>… all day?', 'يعني أقعد أختبر <code>1+1</code> و<code>1+2</code> و<code>1+3</code>… طول اليوم؟')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('They all test the <b>same thing</b>. One partition, one test. But <code>1+999999999999999999999999999</code> is a different partition: it may <b>overflow</b>.', 'كلهم بيختبروا <b>نفس الحاجة</b>: partition واحدة، test واحد. بس <code>1+999999999999999999999999999</code> partition تانية (ممكن تعمل <b>overflow</b>).')}</${Talk}>
          <${Def}>${X('An <b>equivalence class (partition)</b> is a set of test cases that <b>tests the same thing or reveals the same bug</b>, so testing <b>one case from each class</b> is enough. <b>Equivalence partitioning</b> methodically reduces the huge set of possible test cases into a much smaller one, <b>without lowering test quality</b>.',
            'الـ <b>equivalence class (partition)</b> هي مجموعة test cases <b>بتختبر نفس الحاجة أو بتكشف نفس الـ bug</b>، فكفاية نختبر <b>case واحدة من كل class</b>. والـ <b>Equivalence partitioning</b> بيقلل بنظام الـ test cases الممكنة الضخمة لمجموعة أصغر بكتير، <b>من غير ما يقلل الجودة</b>.')}</${Def}>
          <${Grow} />
          <${P} small=${true}>${X('Classes are <b>valid</b> (satisfy the condition) or <b>invalid</b> (do not). Benefit: far fewer test cases, same good coverage.',
            'والـ classes يا <b>valid</b> (بتحقق الشرط) يا <b>invalid</b> (مابتحققوش). والفايدة: test cases أقل بكتير، بنفس الـ coverage.')}</${P}>
        `, { sec: t('Equivalence partitioning', 'الـ Equivalence partitioning') }),

        // 18 · driving license
        page(html`
          <${H2}>${t('The driving license: how many classes?', 'رخصة السواقة: كام class؟')}</${H2}>
          <${P} small=${true}>${X('The lecture\'s example: an individual <b>above 18 and at most 60</b> is eligible for a driving license. Slide the age:', 'مثال المحاضرة: الشخص اللي سنه <b>فوق 18 ولحد 60 بالكتير</b> يبقى مستحق رخصة سواقة. حرّك السن:')}</${P}>
          <${License} />
          <${UL} items=${A ? ['الـ valid: من 18 لـ 60.', 'الـ invalid: أقل من 18.', 'الـ invalid: أكبر من 60.'] : ['Valid: 18 to 60.', 'Invalid: below 18.', 'Invalid: above 60.']} />
          <${Hand} red=${true} big=${true}>${t('→ 3 equivalence classes', '← يعني 3 equivalence classes')}</${Hand}>
          <${Grow} />
          <${Hand}>${t('note: the slide says "above 18" but lists the valid class as 18 to 60; either way the count is 3', 'ملحوظة: السلايد كاتبها "فوق 18" بس كاتب الـ valid class من 18 لـ 60؛ وفي الحالتين العدد 3')}</${Hand}>
        `),

        // 19 · the program example
        page(html`
          <${H2}>${t('The lecture\'s program: two partitions at once', 'برنامج المحاضرة: partitions على حاجتين')}</${H2}>
          <${P} small=${true}>${X('A program accepts <b>4 to 10 inputs</b>, each a <b>5-digit integer ≥ 10,000</b>. Partition the <b>number</b> of inputs:', 'برنامج بيقبل <b>من 4 لـ 10 inputs</b>، وكل واحد <b>integer من 5 digits</b> وأكبر من أو يساوي <bdi dir="ltr">10,000</bdi>. قسّم <b>عدد</b> الـ inputs:')}</${P}>
          <${TB} head=${['Number of inputs', 'Class', 'Test']} rows=${[['less than 4', ['invalid', 'hf-qa2-x'], '3'], ['4 to 10', ['valid', 'hf-qa2-v'], '4, 7, 10'], ['more than 10', ['invalid', 'hf-qa2-x'], '11']]} />
          <${P} small=${true}>${X('Then the <b>values</b> 10,000–99,999: partitions &lt;10,000, 10,000–99,999, &gt;99,999, and <b>6 test cases</b>:', 'وبعدين الـ <b>values</b> من <bdi dir="ltr">10,000</bdi> لـ <bdi dir="ltr">99,999</bdi>، والـ partitions هي أقل من <bdi dir="ltr">10,000</bdi>، ومن <bdi dir="ltr">10,000</bdi> لـ <bdi dir="ltr">99,999</bdi>، وأكبر من <bdi dir="ltr">99,999</bdi>. والـ <b>6 test cases</b>:')}</${P}>
          <${TB} head=${['Value', 'Role']} rows=${[['00000', ['invalid special value', 'hf-qa2-x']], ['09999', ['invalid left boundary', 'hf-qa2-x']], ['10000', ['valid left boundary', 'hf-qa2-v']], ['50000', ['valid mid', 'hf-qa2-v']], ['99999', ['valid right boundary', 'hf-qa2-v']], ['100000', ['invalid right boundary', 'hf-qa2-x']]]} />
          <${Grow} />
          <${Hand}>${t('partition the system\'s inputs and outputs into "equivalence sets"', 'قسّم الـ inputs والـ outputs بتاعة الـ system لـ "equivalence sets"')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('Try any value on the two bars (slide 21)', 'جرّب أي قيمة على الـ 2 bars (سلايد 21)')}</${H2}>
          <${Fig} name="qa-ep-boundary" />
        `),

        // 21 · exercise: be the partitioner
        page(html`
          <${H2}>${t('Be the partitioner', 'إنت الـ partitioner')}</${H2}>
          <${P} small=${true}>${X('Tap each value\'s <b>partition</b>, and <b>BV</b> if it is a <b>boundary value</b> (at the edge or just outside it).', 'دوس على الـ <b>partition</b> بتاعة كل قيمة، و<b>BV</b> لو هي <b>boundary value</b> (على الحافة أو بره منها على طول).')}</${P}>
          <${Parts} />
        `, { sec: t('Be the partitioner', 'إنت الـ partitioner') }),

        // 22 · watch it: > 9000, and dumb questions
        page(html`
          <${Box} kind="watch" title=${t('Watch it: one word apart', 'خلّي بالك: الفرق كلمة واحدة')}><p className="hf-p small">${X('<i>"Integer &gt; 9000. Determine <b>the test case</b>"</i> → <b>All answers</b>: 9000 (invalid boundary), 9001 (valid boundary) and 9999 (a valid value) are all useful tests.<br/><i>"Determine <b>the invalid</b> test case"</i> → <b>9000</b>: with &gt; 9000 the valid class starts at 9001. Both are in the Exam corner.',
            'سؤال <bdi dir="ltr">"Integer &gt; 9000. Determine the test case"</bdi> إجابته <b>All answers</b>: الـ 9000 (invalid boundary) والـ 9001 (valid boundary) والـ 9999 (قيمة valid) كلهم tests مفيدة.<br/>أما "Determine <b>the invalid</b> test case" فإجابته <b>9000</b>، لأن مع <bdi dir="ltr">&gt; 9000</bdi> الـ valid class بتبدأ من 9001. والاتنين في ركن الامتحان.')}</p></${Box}>
          <${Dumb} qa=${A ? [
            ['هل الـ 00000 boundary value؟', 'لأ. المحاضرة بتسميها <b>invalid special value</b>. والـ boundaries هي 09999 و10000 و99999 و100000.'],
            ['ليه نختبر 7 لو 4 و10 valid أصلًا؟', 'الـ 4 والـ 10 هما الأطراف؛ والـ 7 قيمة من <b>جوه</b> الـ valid partition. والمحاضرة بتختبر <bdi dir="ltr">4, 7, 10</bdi>.']
          ] : [
            ['Is 00000 a boundary value?', 'No. The lecture calls it an <b>invalid special value</b>. The boundaries are 09999, 10000, 99999 and 100000.'],
            ['Why test 7 when 4 and 10 are already valid?', '4 and 10 are the edges; 7 is a value from <b>inside</b> the valid partition. The lecture tests 4, 7 and 10.']
          ]} />
        `),

        // 23 · data testing
        page(html`
          <${H1}>${t('Software is data plus program', 'الـ software عبارة عن data و program')}</${H1}>
          <${VS} head=${A ? ['الـ Data', 'الـ Program'] : ['Data', 'Program']} rows=${A ? [
            ['input من الكيبورد، ضغطات الماوس', 'الـ executable flow'],
            ['ملفات على الـ disk', 'الـ transitions'],
            ['الـ printouts…', 'الـ logic والحسابات']
          ] : [
            ['Keyboard input, mouse clicks', 'Executable flow'],
            ['Disk files', 'Transitions'],
            ['Printouts…', 'Logic, computations']
          ]} />
          <${UL} items=${A ? ['الكلام اللي بتكتبه في الـ word processor', 'الأرقام اللي بتدخلها في الـ spreadsheet', 'الصورة اللي بيطبعها برنامج الصور', 'الـ backup files على الـ floppy disk', 'الـ data اللي الـ modem بيبعتها على خطوط التليفون']
            : ['the words you type into a word processor', 'the numbers entered into a spreadsheet', 'the picture printed by your photo software', 'the backup files stored on your floppy disk', 'the data sent by your modem over the phone lines']} />
          <${Grow} />
          <${Def}>${X('Goal: fewer test cases, using partitions based on <b>boundary conditions, sub-boundary conditions, nulls and bad data</b>.', 'الهدف: test cases أقل، بـ partitions مبنية على <b>الـ boundary conditions والـ sub-boundaries والـ nulls والـ bad data</b>.')}</${Def}>
        `, { sec: t('Data and boundaries', 'الـ Data والـ boundaries') }),

        // 24 · boundary conditions and the cliff
        page(html`
          <${Def}>${X('<b>Boundary conditions</b>: situations at the <b>edge of the planned operational limits</b> of the software. Programming is susceptible to problems at its edges.', 'الـ <b>Boundary conditions</b>: المواقف اللي على <b>حافة الحدود التشغيلية المخططة</b> للـ software. والـ programming بيبقى معرّض للمشاكل عند الأطراف بتاعته.')}</${Def}>
          <${Fig} name="qa-cliff" head=${t('Figure 5.5', 'الشكل 5.5')} />
        `),

        // 25 · boundary examples
        page(html`
          <${H2}>${t('Where are the edges?', 'الأطراف فين؟')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Text field</b> من <bdi dir="ltr">1–255</bdi> حرف: الـ valid هو 1 و255 (و254)؛ والـ invalid هو <b>0 و256</b>.',
            'الـ <b>CD-R</b>: ملف صغير جدًا، ملف على حد سعة الـ disc بالظبط، ملف فاضي، ملف كبير زيادة.',
            'طباعة <b>كذا صفحة في الورقة</b>: 1، والـ maximum، و0، و<bdi dir="ltr">max+1</bdi>.',
            'الـ <b>ZIP</b> اللي 9 digits، زي <bdi dir="ltr">00000-0000</bdi> و<bdi dir="ltr">99999-9999</bdi>، و digit زيادة أو ناقص.'
          ] : [
            '<b>Text field</b> of 1–255 characters: valid 1, 255 (and 254); invalid <b>0 and 256</b>.',
            '<b>CD-R</b>: a very small file, a file at the disc\'s limit, an empty file, a file too large.',
            '<b>Print several pages per sheet</b>: 1, the maximum, 0 and max+1.',
            '<b>9-digit ZIP</b>: 00000-0000, 99999-9999, and one digit more or less.'
          ]} />
          <${Box} kind="relax" title=${t('But not only the edges', 'بس مش الأطراف بس')}><p className="hf-p small">${X('Bugs increase at the boundaries, but testing the edges alone may not be enough. Use equivalence partitions to test data <b>in</b>, <b>out of</b> and <b>at</b> the boundary: data that works, data that does not, data at the boundary.',
            'الـ bugs بتزيد عند الـ boundaries، بس إنك تختبر الأطراف بس ممكن مايكفيش. استخدم الـ equivalence partitions عشان تختبر data <b>جوه</b> و<b>بره</b> و<b>على</b> الـ boundary، يعني data شغالة، وdata مش شغالة، وdata على الـ boundary.')}</p></${Box}>
          <${Grow} />
          <${P} small=${true}>${X('Floppy disk program (write and read a file): very small file, very large file that fits, empty file, file too large. Its boundary: <b>max file, min file</b>. Searching for boundaries is a very important task.',
            'برنامج الـ floppy disk (بيكتب ويقرا file) بنجرّب فيه ملف صغير جدًا، ملف كبير جدًا بس داخل، ملف فاضي، ملف كبير زيادة. والـ boundary بتاعته: <b>الـ max file والـ min file</b>. والبحث عن الـ boundaries مهمة مهمة جدًا.')}</${P}>
        `),

        // 26 · the Day field, a doctors' question
        page(html`
          <${H2}>${t('The field with four last days', 'الخانة اللي ليها أربع أيام أخيرة')}</${H2}>
          <${P} small=${true}>${t('Before you answer: does every month end on the same day?', 'قبل ما تجاوب: هو كل الشهور بتخلص في نفس اليوم؟')}</${P}>
          ${mq('day', /in order to test the field Day/)}
          <${Grow} />
          <${Hand} red=${true}>${t('28 (February), 29 (February, leap year), 30 and 31: all of them are boundaries', 'الـ 28 (فبراير)، والـ 29 (فبراير في السنة الكبيسة)، والـ 30 والـ 31: كلهم boundaries')}</${Hand}>
        `),

        // 27 · state testing
        page(html`
          <${H1}>${t('Same click, different result', 'نفس الضغطة، ونتيجة مختلفة')}</${H1}>
          <${Def}>${X('A <b>software state</b> is the condition or mode the software is currently in. <b>State testing</b> verifies the program\'s logic through its <b>states</b> and the <b>transitions</b> between them.',
            'الـ <b>software state</b> هي الحالة أو الـ mode اللي الـ software فيه دلوقتي. والـ <b>State testing</b> بيتأكد من الـ logic بتاع البرنامج من خلال الـ <b>states</b> بتاعته والـ <b>transitions</b> بينهم.')}</${Def}>
          <${Talk} who="dev">${X('I dragged the mouse in Paint and got a thin line. My friend did the same drag and got a spray of dots!', 'أنا سحبت الماوس في الـ Paint وطلع خط رفيع. وصاحبي عمل نفس السحبة وطلعله رشة نقط!')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('You were in the <b>pencil state</b>, your friend in the <b>airbrush state</b>. Same input, different state, different output. Try it on the next page.', 'إنت كنت في الـ <b>pencil state</b>، وصاحبك في الـ <b>airbrush state</b>. نفس الـ input، state مختلفة، output مختلف. جرّبها في الصفحة الجاية.')}</${Talk}>
          <${Grow} />
          <${Hand}>${t('the program side of software: flow, transitions, logic', 'ده الجزء الـ program من الـ software: الـ flow والـ transitions والـ logic')}</${Hand}>
        `, { sec: t('State testing', 'الـ State testing') }),
        page(html`
          <${H2}>${t("Paint's pencil and airbrush states", 'الـ pencil state والـ airbrush state في Paint')}</${H2}>
          <${Fig} name="qa-paint-states" />
        `),

        // 29 · state transition map
        page(html`
          <${H2}>${t('Draw the map first', 'ارسم الخريطة الأول')}</${H2}>
          <${P} small=${true}>${X('A <b>state transition map</b> shows:', 'الـ <b>state transition map</b> بتوضح:')}</${P}>
          <${Five} items=${A ? ['كل <b>state</b> مميزة الـ software ممكن يبقى فيها', 'الـ <b>input أو الـ condition</b> اللي بينقلك من state للي بعدها', 'الـ <b>conditions</b> اللي بتتظبط والـ <b>output</b> اللي بيطلع لما تدخل state أو تخرج منها']
            : ['each <b>unique state</b> the software can be in', 'the <b>input/condition</b> that moves it from one state to the next', 'the <b>conditions set</b> and <b>output produced</b> when a state is entered or exited']} />
          <${P} small=${true}>${X('The map may be in the <b>specification</b>, or you make it yourself. Use any diagram <b>the whole team accepts</b> (boxes, arrows, circles).', 'الـ map ممكن تكون موجودة في الـ <b>specification</b>، أو إنت تعملها. واستخدم أي diagram <b>كل الـ team يوافق عليه</b> (boxes وأسهم ودواير).')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Draw the map from the <b>user\'s view</b> of the software. A map does <b>not</b> show source-code lines: that would be white-box.', 'ارسم الـ map من <b>وجهة نظر الـ user</b>. والـ map <b>مابتوضحش</b> سطور الـ source code: ده يبقى white-box.')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('Figure 5.10: one map, two drawings', 'الشكل 5.10: map واحدة مرسومة بطريقتين')}</${H2}>
          <${Fig} name="qa-password-states" />
        `),

        // 31 · five ways
        page(html`
          <${H2}>${t('Too many paths? Five ways to cut them', 'paths كتير؟ خمس طرق تقللها')}</${H2}>
          <${P} small=${true}>${t('The lecture\'s 5 ways to reduce the states and transitions you test:', 'الـ 5 طرق بتوع المحاضرة عشان تقلل الـ states والـ transitions اللي هتختبرها:')}</${P}>
          <${Five} items=${A ? ['زور <b>كل state</b> مرة واحدة على الأقل', 'اختبر الـ transitions <b>الأكتر شيوعًا</b> بين الـ states', 'اختبر الـ paths <b>الأقل شيوعًا</b>', 'اختبر <b>كل الـ error states</b> والرجوع منها', 'اختبر <b>transitions عشوائية</b>']
            : ['visit <b>each state</b> at least once', 'test the <b>most common</b> state-to-state transitions', 'test the <b>least common</b> paths', 'test <b>all error states</b> and returning from them', 'test <b>random</b> transitions']} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Testing <i>every possible sequence</i> of transitions is not on the list. Why not? (Think about what this whole chapter is trying to do with the number of test cases.)', 'إنك تختبر <i>كل sequence ممكنة</i> من الـ transitions مش موجودة في الليستة. ليه؟ (فكّر الفصل ده كله بيحاول يعمل إيه في عدد الـ test cases.)')}</p></${Box}>
        `),

        // 32 · interview with Paint's startup state
        page(html`
          <${Interview} title=${t('Head First interview', 'حوار Head First')} sub=${t("This week: Paint's startup state, on its state variables", 'الأسبوع ده: الـ startup state بتاعة Paint، عن الـ state variables بتاعتها')} lines=${A ? [
            ['هيد فيرست', 'أهلًا بيكي. الـ testers بيعرفوكي إزاي؟'],
            ['الـ Startup state', 'من الـ <b>state variables</b> بتاعتي. الـ window زي ما كانت آخر مرة، وبنفس الحجم بتاع آخر مرة، ومساحة الرسم فاضية.'],
            ['هيد فيرست', 'بس كده؟'],
            ['الـ Startup state', 'لأ. الـ tool box والـ color box والـ status bar ظاهرين، والـ <b>pencil</b> متختار، والألوان أسود على أبيض، والـ document اسمه "untitled".'],
            ['هيد فيرست', 'ولو حاجة واحدة اتغيرت؟'],
            ['الـ Startup state', 'يبقى إنت مش فيّا خلاص، إنت في state تانية. عشان كده المحاضرة بتقول: <b>اتأكد من كل الـ state variables</b>.']
          ] : [
            ['Head First', 'Welcome. How do testers recognise you?'],
            ['Startup state', 'By my <b>state variables</b>. The window looks as it was last shown, the same size as last time, and the drawing area is blank.'],
            ['Head First', 'Is that all?'],
            ['Startup state', 'No. The tool box, color box and status bar are shown, the <b>pencil</b> is selected, the colours are black on white, and the document is "untitled".'],
            ['Head First', 'And if just one of those changes?'],
            ['Startup state', 'Then you are not in me any more, you are in another state. That\'s why the lecture says: <b>check all state variables</b>.']
          ]} />
          <${Grow} />
          <${Hand}>${t("Figure .11: Paint's opening screen in the startup state (you met it two pages back)", 'الشكل .11: شاشة فتح Paint في الـ startup state (شفتها من كام صفحة)')}</${Hand}>
        `),

        // 33 · media player
        page(html`
          <${H2}>${t('Worked example: the media player', 'مثال محلول: الـ media player')}</${H2}>
          <${P} small=${true}>${X('Three operations: <b>play, fast forward</b> and <b>fast play</b>. Play and fast forward use the play and fast forward buttons; <b>stop</b> cancels. States: OFF, PLAY, FAST FORWARD, FAST PLAY. The diagram as a table:',
            'فيه 3 operations هي <b>play و fast forward و fast play</b>. الـ play والـ fast forward بيشتغلوا بزرار الـ play وزرار الـ fast forward، وزرار الـ <b>stop</b> بيلغيهم. والـ states هي OFF و PLAY و FAST FORWARD و FAST PLAY. والـ diagram في جدول:')}</${P}>
          <${TB} head=${['From state', 'Input', 'To state']} rows=${[['OFF', 'play', 'PLAY'], ['OFF', 'fast forward', 'FAST FORWARD'], ['PLAY', 'stop', 'OFF'], ['PLAY', 'fast forward', 'FAST PLAY'], ['FAST FORWARD', 'stop', 'OFF'], ['FAST FORWARD', 'play', 'PLAY'], ['FAST PLAY', 'stop', 'PLAY'], ['FAST PLAY', 'fast forward', 'FAST FORWARD']]} />
          <${Grow} />
          <${Hand} red=${true}>${t('careful: stop from FAST PLAY goes back to PLAY, not OFF', 'خلّي بالك: الـ stop من FAST PLAY بيرجّعك لـ PLAY، مش OFF')}</${Hand}>
        `, { sec: t('Media player', 'الـ Media player') }),
        page(html`
          <${H2}>${t('Press the buttons (slide 35)', 'دوس على الزراير (سلايد 35)')}</${H2}>
          <${Fig} name="qa-media-player" />
        `),

        // 35 · exercise: be the media player
        page(html`
          <${H2}>${t('Be the media player', 'إنت الـ media player')}</${H2}>
          <${P} small=${true}>${X('Start in OFF. After each button, tap the state you land in (<b>FF</b> = FAST FORWARD, <b>FP</b> = FAST PLAY). Solve both test cases and watch the transitions fill in.',
            'ابدأ من OFF. بعد كل زرار، دوس على الـ state اللي وصلتلها (الـ <b>FF</b> هي FAST FORWARD، والـ <b>FP</b> هي FAST PLAY). حل الـ 2 test cases وشوف الـ transitions بتتملي.')}</${P}>
          <${Trace} />
        `, { sec: t('Be the media player', 'إنت الـ media player') }),

        // 36 · the media player answers
        page(html`
          <${H2}>${t('The answers the slide gives', 'الإجابات اللي في السلايد')}</${H2}>
          <${P} small=${true}>${X('<b>All states at least once</b>: the minimum is <b>1 test case</b>:', '<b>كل الـ states مرة واحدة على الأقل</b>: والـ minimum هو <b>test case واحدة</b>:')}</${P}>
          <${Code} lines=${['<Off> play → ff → ff']} />
          <${P} small=${true}>${X('<b>All 8 transitions at least once</b>: <b>2 test cases</b>:', '<b>كل الـ 8 transitions مرة واحدة على الأقل</b>: محتاجين <b>2 test cases</b>:')}</${P}>
          <${Code} lines=${['TC1 <Off> play → ff → ff → stop', 'TC2 <Off> ff → play → ff', '          → stop → stop']} />
          <${Hand}>${t('ff = fast forward', 'الـ ff يعني fast forward')}</${Hand}>
          <${Dumb} qa=${A ? [
            ['والـ TC1 بتخلص في OFF، والـ TC2 بتبدأ من OFF. ينفع أكمّل على طول؟', 'ينفع تلزقهم في sequence واحدة طويلة، بس السلايد بيعدّهم <b>2 test cases</b>، وده الرقم اللي تكتبه في الامتحان.']
          ] : [
            ['TC1 ends in OFF and TC2 starts in OFF. Could I just keep going?', 'You could chain them into one long sequence, but the slide counts them as <b>2 test cases</b>, and that is the number to write in the exam.']
          ]} />
        `),

        // 37–41 · exam corner, one question a page
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' exam and this year's midterm. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من امتحان الدكاترة وميدترم السنة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /9000\. Determine the test case/)}
          <${Grow} />
          <${Hand} red=${true}>${t('"the test case" (not "the invalid one"): every option is a useful BVA/EP test', '"the test case" (مش الـ invalid): كل الاختيارات tests مفيدة')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /Determine the invalid test case/)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${X('Same spec, one extra word: <b>invalid</b>. 9999 and 10000 are both greater than 9000, so only 9000 is rejected.', 'نفس الـ spec، وكلمة زيادة واحدة: <b>invalid</b>. الـ 9999 والـ 10000 الاتنين أكبر من 9000، فالـ 9000 بس هي اللي بتترفض.')}</${Talk}>
        `),
        page(html`
          ${mq('m3', /expose ambiguities/)}
          <${Grow} />
          <${Hand} red=${true}>${t('manual and automation say HOW tests are run, not what they look at', 'الـ manual والـ automation بيقولوا الـ tests بتتنفذ إزاي، مش بتبص على إيه')}</${Hand}>
        `),
        page(html`
          ${mq('m4', /pushes the software to its limits/)}
          <${Grow} />
          <${Talk} who="bug">${t("Extreme conditions? That's where test-to-fail comes looking for me.", 'ظروف متطرفة؟ ده المكان اللي الـ test-to-fail بييجي يدوّر عليّا فيه.')}</${Talk}>
        `),
        page(html`
          ${mq('m5', /meets its specification/)}
          <${Grow} />
          <${Hand} red=${true}>${t('specification → verification · user\'s requirement → validation', 'الـ specification يبقى verification · واحتياج الـ user يبقى validation')}</${Hand}>
        `),

        // 42 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>Verification</b> بيقارن بالـ spec (الـ product صح)، والـ <b>Validation</b> باحتياج الـ user (الـ product الصح). الـ QA للـ process، والـ QC للـ product.',
            'الـ <b>Black-box</b> (behavioral): inputs و expected outputs من غير الـ code. بيكشف الغموض في الـ specs، بس مش بيختبر كل الـ inputs.',
            'الـ <b>Static</b> يعني مش شغال (مراجعة)، والـ <b>dynamic</b> يعني شغال. ابدأ بالـ <b>test-to-pass</b> وبعدين الـ <b>test-to-fail</b>.',
            'الـ <b>Equivalence partition</b>: cases بتختبر نفس الحاجة، فواحدة من كل class كفاية. رخصة السواقة فيها 3 classes.',
            'الـ <b>Boundaries</b>: على الحافة وبره منها على طول. في الـ <bdi dir="ltr">1–255</bdi> الـ invalid هي 0 و256.',
            'الـ <b>State testing</b>: map من وجهة نظر الـ user و5 طرق للتقليل. والـ media player: كل الـ states في test case واحدة، والـ 8 transitions في 2.'
          ] : [
            '<b>Verification</b>: against the spec (product right). <b>Validation</b>: against user needs (right product). QA: process. QC: product.',
            '<b>Black-box</b> (behavioral): inputs and expected outputs, no code. Exposes spec ambiguities; cannot test all inputs.',
            '<b>Static</b> = not running (reviewing); <b>dynamic</b> = running. Start with <b>test-to-pass</b>, then <b>test-to-fail</b>.',
            '<b>Equivalence partition</b>: cases that test the same thing; one per class is enough. Driving license: 3 classes.',
            '<b>Boundaries</b>: at the edge and just outside it. For 1–255 the invalid ones are 0 and 256.',
            '<b>State testing</b>: a map from the user\'s view, 5 ways to cut it down. Media player: all states in 1 test case, all 8 transitions in 2.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 43 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 2!', 'خلّصت الفصل التاني!')}</${H1}>
            <${Talk} who="lens">${X('Next time I finally <b>open the box</b>: white box testing.', 'المرة الجاية أخيرًا <b>هفتح الصندوق</b>: الـ white box testing.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [2], t: Date.now() } }}>${t('Quiz me on Lecture 2', 'امتحنّي في محاضرة 2')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 2, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 2, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

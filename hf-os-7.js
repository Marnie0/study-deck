// Head First chapter for Operating Systems Lecture 7 (built on hf.js), English + Egyptian Arabic, same pages in both.
// File-System: the file concept, attributes, operations, open files, types and structure, access methods, directory structures,
// sharing and protection (chmod), implementation (FCB, linear list vs hash table) and allocation (contiguous, linked, FAT, indexed).
// Every fact comes from the lecture's notes; our own analogies and extra examples are marked as ours.
// This lecture has none of the doctor's questions, so the exam corner uses the site's practice questions and says so.
(function () {
  const H = window.HF; H.chapters.os = H.chapters.os || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-os7')) {
    const s = document.createElement('style'); s.id = 'hf-css-os7';
    s.textContent = `
.hfb .hf-os7-split{ display:grid; grid-template-columns:auto repeat(3, 1fr); gap:4px 6px; align-items:center; border:2px solid var(--hf-line); border-radius:8px; padding:8px 10px; background:var(--paper); }
.hfb .hf-os7-split .hd{ font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.05em; color:var(--graphite); text-align:center; }
.hfb .hf-os7-split .rl{ font:700 13px/1.1 var(--body); color:var(--graphite); white-space:nowrap; }
.hfb .hf-os7-split .bits{ display:flex; justify-content:center; gap:3px; }
.hfb .hf-os7-split .bits i{ font:800 15px/26px var(--mono); font-style:normal; width:24px; height:26px; text-align:center; border-radius:5px; background:var(--hf-line); color:var(--paper); }
.hfb .hf-os7-split .bits i.off{ background:var(--hf-grey2); color:var(--graphite); }
.hfb .hf-os7-split .w{ display:flex; justify-content:center; gap:3px; font:700 13px/1 var(--mono); color:var(--hf-hand); }
.hfb .hf-os7-split .w span{ width:24px; text-align:center; }
.hfb .hf-os7-split .bn{ font:700 14px/1 var(--mono); text-align:center; color:var(--ink); }
.hfb .hf-os7-split .dg{ font:800 25px/1 var(--body); text-align:center; color:var(--hf-k); }
.hfb .hf-os7-split .pop{ animation:hf-up .5s both; }
.hfb .hf-os7-cmd{ font:800 19px/1.2 var(--mono); text-align:center; margin:0; color:var(--ink); direction:ltr; }
.hfb .hf-os7-cmd b{ color:var(--hf-k); }
.hfb .hf-os7-vs{ display:grid; grid-template-columns:76px 1fr 1fr; border:2px solid var(--hf-line); }
.hfb .hf-os7-vs > div{ padding:5px 7px; font-size:13.5px; line-height:1.3; border-top:1px solid var(--hf-grey2); color:var(--ink); }
.hfb .hf-os7-vs > div.k{ font:800 13px/1.2 var(--body); background:var(--hf-grey); }
.hfb .hf-os7-vs > .hd{ font:800 14px/1.15 var(--body); background:var(--hf-line); color:var(--paper); border-top:0; text-align:center; }
.hfb .hf-os7-vs > div:not(:nth-child(3n)){ border-inline-end:1.5px solid var(--hf-line); }
.hfb .hf-os7-vs b{ font-weight:700; }
.hfb .hf-os7-tbl{ display:grid; gap:0; border:2px solid var(--hf-line); border-radius:6px; overflow:hidden; }
.hfb .hf-os7-tr{ display:grid; align-items:center; border-top:1px solid var(--hf-grey2); min-height:31px; }
.hfb .hf-os7-tr:first-child{ border-top:0; }
.hfb .hf-os7-tr.hd{ background:var(--hf-line); color:var(--paper); font:800 13px/1.15 var(--body); min-height:28px; }
.hfb .hf-os7-tr > span{ padding:3px 6px; font:600 13.5px/1.2 var(--body); color:inherit; }
.hfb .hf-os7-tr code{ font:700 14px/1 var(--mono); background:none; padding:0; }
.hfb .hf-os7-in{ width:100%; max-width:64px; height:28px; font:700 15px/1 var(--mono); text-align:center; border:1.5px solid var(--faint); border-radius:5px; background:var(--hf-grey); color:var(--ink); padding:0; margin:0; box-sizing:border-box; }
.hfb .hf-os7-in.wide{ max-width:128px; letter-spacing:.06em; }
.hfb .hf-os7-in.ok{ border-color:var(--ok); color:var(--ok); }
.hfb .hf-os7-in.no{ border-color:var(--hf-red); color:var(--hf-red); }
.hfb .hf-os7-fix{ font-family:"Caveat", cursive; font-size:18px; font-weight:600; color:var(--hf-red); margin-left:4px; }
.hfb .hf-os7-give{ font:800 16px/1 var(--mono); letter-spacing:.04em; color:var(--ink); }
.hfb .hf-os7-give i{ font-style:normal; margin-right:5px; }
.hfb .hf-os7-fat{ display:grid; grid-template-columns:1fr 1.15fr; gap:10px; align-items:start; }
.hfb .hf-os7-fat h5{ font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--graphite); margin:0 0 4px; }
.hfb .hf-os7-fat .dir{ display:grid; gap:4px; }
.hfb .hf-os7-fat .dir button, .hfb .hf-os7-fat .ft button{ display:grid; grid-template-columns:1fr 1fr; align-items:center; width:100%; min-height:29px; border:1.5px solid var(--faint); border-radius:6px; background:var(--paper); color:var(--ink); font:700 14px/1 var(--mono); cursor:pointer; padding:0 6px; text-align:center; }
.hfb .hf-os7-fat .dir button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-os7-fat .ft{ display:grid; gap:3px; }
.hfb .hf-os7-fat .ft .hdr{ display:grid; grid-template-columns:1fr 1fr; font:800 12.5px/1 var(--body); color:var(--graphite); text-align:center; text-transform:uppercase; letter-spacing:.05em; }
.hfb .hf-os7-fat .ft button.seen{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); }
.hfb .hf-os7-fat .ft button.bad{ border-color:var(--hf-red); animation:hf-os7-shake .35s; }
.hfb .hf-os7-fat .ft .dots{ text-align:center; font:700 13px/.8 var(--mono); color:var(--graphite); }
@keyframes hf-os7-shake{ 25%{ transform:translateX(-3px); } 75%{ transform:translateX(3px); } }
.hfb .hf-os7-chain{ display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:4px; min-height:32px; direction:ltr; }
.hfb .hf-os7-chain span{ font:700 14px/1 var(--mono); border:1.6px solid var(--hf-line); border-radius:6px; padding:6px 8px; background:var(--paper); color:var(--ink); }
.hfb .hf-os7-chain span.end{ border-style:dashed; color:var(--hf-red); border-color:var(--hf-red); }
.hfb .hf-os7-chain span.q{ border-style:dashed; color:var(--graphite); }
.hfb .hf-os7-chain em{ font-style:normal; color:var(--hf-k); font:800 15px/1 var(--body); }
.hfb .hf-os7-chain span.run{ animation:hf-os7-run 4.2s infinite both; }
@keyframes hf-os7-run{ 0%,100%{ background:var(--paper); } 8%,18%{ background:color-mix(in srgb, var(--hf-k) 35%, var(--paper)); } 26%{ background:var(--paper); } }
.hfb .hf-os7-ix{ display:flex; flex-direction:column; gap:3px; align-items:center; direction:ltr; }
.hfb .hf-os7-ix .blk{ display:flex; align-items:center; gap:4px; border:2px solid var(--hf-line); border-radius:6px; padding:4px 7px; background:var(--hf-grey); }
.hfb .hf-os7-ix .blk b{ font:800 13px/1 var(--body); text-transform:uppercase; letter-spacing:.04em; color:var(--graphite); margin-right:3px; }
.hfb .hf-os7-ix .blk span{ font:700 14px/1 var(--mono); color:var(--ink); padding:3px 4px; border:1px solid var(--hf-grey2); border-radius:4px; background:var(--paper); }
.hfb .hf-os7-ix .data{ display:grid; grid-template-columns:repeat(5, auto); gap:4px; }
.hfb .hf-os7-ix .data span{ font:700 14px/1 var(--mono); border:1.6px solid var(--hf-k); border-radius:5px; padding:6px 7px; background:var(--paper); color:var(--ink); }
.hfb .hf-os7-row2{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-os7-row2 > div{ border:1.5px solid var(--hf-line); border-radius:7px; padding:6px 8px; background:var(--paper); font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-os7-row2 > div > b:first-child{ display:block; font:800 14px/1.2 var(--body); color:var(--hf-k); margin-bottom:2px; }
.hfb .hf-os7-msg{ font-size:13.5px; line-height:1.35; margin:0; color:var(--ink); min-height:1.35em; }
.hfb .hf-os7-msg.red{ color:var(--hf-red); }
.hfb.hf-ar .hf-os7-vs > div, .hfb.hf-ar .hf-os7-row2 > div, .hfb.hf-ar .hf-os7-msg, .hfb.hf-ar .hf-os7-tr.hd, .hfb.hf-ar .hf-os7-fat h5, .hfb.hf-ar .hf-os7-fat .ft .hdr, .hfb.hf-ar .hf-os7-split .rl, .hfb.hf-ar .hf-os7-split .hd{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; text-transform:none; }
.hfb.hf-ar .hf-os7-vs > div, .hfb.hf-ar .hf-os7-row2 > div{ font-size:13px; line-height:1.45; }
`;
    document.head.appendChild(s);
  }

  // chmod 761 game, bit by bit: R = 4, W = 2, X = 1 for owner, group and public
  function Split761() {
    const ar = useAr();
    const cols = [['owner', 'rwx', '111', 7], ['group', 'rw-', '110', 6], ['public', '--x', '001', 1]];
    const d = j => ({ animationDelay: calm() ? '0s' : (0.2 + j * 0.35) + 's' });
    return html`<div className="hf-in"><div className="hf-os7-split" dir="ltr" aria-label="chmod 761: owner rwx 111 = 7, group rw- 110 = 6, public --x 001 = 1">
      <span></span>${cols.map(c => html`<span key=${c[0]} className="hd">${c[0]}</span>`)}
      <span className="rl" dir="auto">${ar ? 'الوزن' : 'weight'}</span>${cols.map(c => html`<span key=${c[0]} className="w"><span>4</span><span>2</span><span>1</span></span>`)}
      <span className="rl" dir="auto">${ar ? 'الـ modes' : 'modes'}</span>${cols.map((c, j) => html`<span key=${c[0]} className="bits pop" style=${d(j)}>${[...c[1]].map((ch, k) => html`<i key=${k} className=${ch === '-' ? 'off' : ''}>${ch === '-' ? '-' : ch.toUpperCase()}</i>`)}</span>`)}
      <span className="rl" dir="auto">${ar ? 'الـ bits' : 'bits'}</span>${cols.map((c, j) => html`<span key=${c[0]} className="bn pop" style=${d(j)}>${c[2]}</span>`)}
      <span className="rl" dir="auto">${ar ? 'الرقم' : 'digit'}</span>${cols.map((c, j) => html`<span key=${c[0]} className="dg pop" style=${d(j + 0.5)}>${c[3]}</span>`)}
    </div><p className="hf-os7-cmd" style=${{ marginTop: '8px' }}>chmod <b>761</b> game</p></div>`;
  }

  // sharpen your pencil: rwx ↔ octal. The first row is the lecture's; the rest are ours.
  const DRILL = [['rwxrw---x', '761'], ['rw-r-----', '640'], ['rwxr-xr--', '754'], ['755', 'rwxr-xr-x'], ['600', 'rw-------']];
  const norm = s => String(s || '').toLowerCase().replace(/\s+/g, '');
  const chunk = m => m.length === 9 ? m.slice(0, 3) + ' ' + m.slice(3, 6) + ' ' + m.slice(6) : m;
  function ChmodDrill() {
    const ar = useAr();
    const [v, setV] = H.K.useSlot('chm', {});
    const [chk, setChk] = H.K.useSlot('chm:c', false);
    const right = DRILL.filter((d, i) => norm(v[i]) === d[1]).length;
    return html`<div className="hf-in">
      <div className="hf-os7-tbl" dir="ltr">
        <div className="hf-os7-tr hd" style=${{ gridTemplateColumns: '1.15fr 1fr' }}><span>${ar ? 'المعطى' : 'given'}</span><span>${ar ? 'إجابتك' : 'your answer'}</span></div>
        ${DRILL.map(([g, w], i) => { const isNum = /^\d+$/.test(w), ok = norm(v[i]) === w;
          return html`<div key=${i} className="hf-os7-tr" style=${{ gridTemplateColumns: '1.15fr 1fr' }}>
            <span className="hf-os7-give">${/^\d+$/.test(g) ? html`<i>chmod</i>${g}` : chunk(g)}</span>
            <span><input className=${'hf-os7-in' + (isNum ? '' : ' wide') + (chk ? (ok ? ' ok' : ' no') : '')} value=${v[i] || ''} maxLength=${isNum ? 3 : 11} inputMode=${isNum ? 'numeric' : 'text'} autoCapitalize="off" autoComplete="off" spellCheck=${false}
              placeholder=${isNum ? '???' : '--- --- ---'} aria-label=${'Answer for ' + g}
              onChange=${e => { setV(Object.assign({}, v, { [i]: e.target.value })); if (chk) setChk(false); }} />${chk && !ok ? html`<span className="hf-os7-fix">${isNum ? w : chunk(w)}</span>` : null}</span></div>`; })}
      </div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; DRILL.forEach((d, i) => { o[i] = /^\d+$/.test(d[1]) ? d[1] : chunk(d[1]); }); setV(o); setChk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${chk && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${DRILL.length}</bdi> صح` : right + ' / ' + DRILL.length + ' right'}</span>`}
      </div></div>`;
  }

  // sequential access simulated on a direct-access file: trace cp through five operations (our sequence, the lecture's rules)
  const CPOPS = [['read next', 0, 1], ['read next', 1, 2], ['write next', 2, 3], ['reset', null, 0], ['read next', 0, 1]];
  function CpTrace() {
    const ar = useAr();
    const [v, setV] = H.K.useSlot('cp', {});
    const [chk, setChk] = H.K.useSlot('cp:c', false);
    const cells = []; CPOPS.forEach((o, i) => { if (o[1] != null) cells.push(['b' + i, o[1]]); cells.push(['c' + i, o[2]]); });
    const right = cells.filter(([k, a]) => String(v[k] || '').trim() === String(a)).length;
    const cols = '28px 1.3fr 1fr 1fr';
    const inp = (k, a) => { const ok = String(v[k] || '').trim() === String(a);
      return html`<input className=${'hf-os7-in' + (chk ? (ok ? ' ok' : ' no') : '')} value=${v[k] || ''} maxLength="2" inputMode="numeric" aria-label=${k}
        onChange=${e => { setV(Object.assign({}, v, { [k]: e.target.value.replace(/[^0-9]/g, '') })); if (chk) setChk(false); }} />`; };
    return html`<div className="hf-in">
      <div className="hf-os7-tbl" dir="ltr">
        <div className="hf-os7-tr hd" style=${{ gridTemplateColumns: cols }}><span>#</span><span dir="auto">${ar ? 'الـ operation' : 'operation'}</span><span dir="auto">${ar ? 'الـ block' : 'block'}</span><span dir="auto">${ar ? 'الـ cp بعدها' : 'cp after'}</span></div>
        ${CPOPS.map(([op, b, c], i) => html`<div key=${i} className="hf-os7-tr" style=${{ gridTemplateColumns: cols }}>
          <span style=${{ color: 'var(--graphite)' }}>${i + 1}</span><span><code>${op}</code></span>
          <span>${b == null ? html`<code style=${{ color: 'var(--graphite)' }}>—</code>` : inp('b' + i, b)}</span><span>${inp('c' + i, c)}</span></div>`)}
      </div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; cells.forEach(([k, a]) => { o[k] = String(a); }); setV(o); setChk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${chk && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${cells.length}</bdi> صح` : right + ' / ' + cells.length + ' right'}</span>`}
      </div></div>`;
  }

  // follow a file through the FAT: tap the blocks in order. test is the lecture's example, notes is ours.
  const FATROWS = [[3, -1], [5, 12], [12, 3], [217, 618], [339, -1], [618, 339]];
  const FATF = [['test', 217], ['notes', 5]];
  const nextOf = b => { const r = FATROWS.find(x => x[0] === b); return r ? r[1] : null; };
  const chainOf = st => { const c = [st]; while (nextOf(c[c.length - 1]) !== -1) c.push(nextOf(c[c.length - 1])); return c; };
  const fmt = n => n === -1 ? '−1' : String(n);
  function FatWalk() {
    const ar = useAr();
    const [f, setF] = H.K.useSlot('fat:f', 0);
    const [walks, setWalks] = H.K.useSlot('fat:w', {});
    const [bad, setBad] = useState(null);
    const [name, start] = FATF[f], mine = walks[f] || [], full = chainOf(start), done = mine.length === full.length;
    const last = mine[mine.length - 1], expect = mine.length ? nextOf(last) : start;
    const tap = b => { if (done) return; if (b === expect) { setWalks(Object.assign({}, walks, { [f]: mine.concat(b) })); setBad(null); } else setBad(b); };
    let msg, red = false;
    if (done) msg = ar ? html`الـ file <b>${name}</b> فيه <b>${full.length} blocks</b>، والـ <bdi dir="ltr">−1</bdi> معناها آخر الـ file. مش block!` : html`<b>${name}</b> has <b>${full.length} blocks</b>, and −1 marks the end of the file. It is not a block!`;
    else if (bad != null) { red = true; msg = mine.length ? (ar ? html`مش ${bad}. بص على خانة الـ next في <bdi dir="ltr">FAT[${last}]</bdi>.` : html`Not ${bad}. Look at the "next" column of FAT[${last}].`) : (ar ? html`مش ${bad}. ابدأ من الـ start block اللي في الـ directory.` : html`Not ${bad}. Start where the directory entry says.`); }
    else msg = mine.length ? (ar ? html`كويس. والـ block اللي بعد ${last}؟` : html`Good. Which block comes after ${last}?`) : (ar ? html`دوس على أول block في الـ file، في جدول الـ FAT.` : html`Tap the file's first block in the FAT.`);
    return html`<div className="hf-in">
      <div className="hf-os7-fat" dir="ltr">
        <div><h5 dir="auto">${ar ? 'الـ directory' : 'Directory'}</h5><div className="dir">
          ${FATF.map(([n, st], j) => html`<button key=${n} aria-pressed=${String(j === f)} onClick=${() => { setF(j); setBad(null); }}><span>${n}</span><span>${st}</span></button>`)}</div>
          <p className="hf-hand" dir=${ar ? 'rtl' : 'ltr'} style=${{ fontSize: '17px', marginTop: '6px' }}>${ar ? 'الاسم والـ start block' : 'name and start block'}</p></div>
        <div className="ft"><h5>FAT</h5><div className="hdr"><span>block</span><span>next</span></div>
          ${FATROWS.map(([b, n], j) => html`<${React.Fragment} key=${b}>${j === 3 && html`<div className="dots">…</div>`}<button className=${mine.includes(b) ? 'seen' : bad === b ? 'bad' : ''} onClick=${() => tap(b)} aria-label=${'FAT[' + b + '] = ' + fmt(n)}><span>${b}</span><span>${fmt(n)}</span></button></${React.Fragment}>`)}
          <div className="dots">…</div></div>
      </div>
      <div className="hf-os7-chain" style=${{ marginTop: '8px' }} aria-label="Blocks so far">${mine.map((b, j) => html`<${React.Fragment} key=${b}>${j > 0 && html`<em>→</em>`}<span>${b}</span></${React.Fragment}>`)}${done ? html`<em>→</em><span className="end">−1</span>` : html`${mine.length > 0 && html`<em>→</em>`}<span className="q">?</span>`}</div>
      <p className=${'hf-os7-msg' + (red ? ' red' : '')} style=${{ marginTop: '6px' }}>${msg}</p>
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn" onClick=${() => { setWalks(Object.assign({}, walks, { [f]: full })); setBad(null); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        <button className="hf-btn" disabled=${!mine.length} onClick=${() => { setWalks(Object.assign({}, walks, { [f]: [] })); setBad(null); }}>${ar ? 'من الأول' : 'Start over'}</button>
      </div></div>`;
  }

  // the lecture's linked file jeep: start 9, end 25, a pointer in every block
  function JeepChain() {
    const ch = [9, 16, 1, 10, 25];
    return html`<div className="hf-os7-chain hf-in" aria-label="jeep: 9, 16, 1, 10, 25, then null">${ch.map((b, j) => html`<${React.Fragment} key=${b}>${j > 0 && html`<em>→</em>`}<span className=${calm() ? '' : 'run'} style=${{ animationDelay: (j * 0.6) + 's' }}>${b}</span></${React.Fragment}>`)}<em>→</em><span className="end">null</span></div>`;
  }
  // the lecture's indexed file jeep: index block 19 holds the pointers
  function JeepIndex() {
    return html`<div className="hf-os7-ix hf-in" aria-label="jeep's index block 19 lists 9, 16, 1, 10, 25, -1">
      <div className="blk"><b>index block 19</b>${['9', '16', '1', '10', '25', '−1'].map(x => html`<span key=${x}>${x}</span>`)}</div>
      <em style=${{ fontStyle: 'normal', font: '800 18px/1 var(--body)', color: 'var(--hf-k)' }}>↓</em>
      <div className="data">${[9, 16, 1, 10, 25].map(b => html`<span key=${b}>${b}</span>`)}</div></div>`;
  }

  H.chapters.os[7] = {
    title: 'File-System', kicker: 'Chapter 7', run: 'file-system',
    ar: { title: 'الـ File-System', kicker: 'الفصل 7', run: 'الـ file-system' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // this lecture has no questions from the doctor's papers, so these are the site's own practice questions (quiz and extra),
      // with the site's Egyptian Arabic explanation of each choice
      const lec = kit.course.lectures.find(l => l.n === 7);
      const arL = (window.AR && window.AR.os && window.AR.os.lectures && window.AR.os.lectures[7]) || {};
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      const q = re => {
        let i = (lec.quiz || []).findIndex(x => re.test(strip(x.q)));
        if (i >= 0) return { q: lec.quiz[i], why: (arL.quiz || [])[i] };
        i = (lec.extra || []).findIndex(x => re.test(strip(x.q)));
        return i < 0 ? {} : { q: lec.extra[i], why: (arL.extra || [])[i] };
      };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · where we left off (faces the opener)
        page(html`
          <${H2}>${t('Where we left off', 'إحنا وقفنا فين')}</${H2}>
          <${P} small=${true}>${X('In Chapter 6 processes got stuck waiting for each other in a <b>deadlock</b>. Now we leave the CPU and the memory behind and go down to the <b>disk</b>, where everything you save actually lives.',
            'في الفصل السادس الـ processes علقت وهي مستنية بعض في <b>deadlock</b>. دلوقتي هنسيب الـ CPU والـ memory وننزل للـ <b>disk</b>، المكان اللي كل حاجة بتعملها save عايشة فيه بجد.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You answer right on the page, and your answers stay when you switch language.', '<b>حل التمارين.</b> بتجاوب على الصفحة نفسها، وإجاباتك بتفضل لو غيّرت اللغة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are traps: things that are easy to mix up in an exam.', '<b>خلّي بالك!</b> دي فخاخ: حاجات سهل تلخبطها في الامتحان.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Notes marked "ours" are our own analogies and examples, not the slides\'.', 'الحاجات اللي عليها "من عندنا" تشبيهات وأمثلة مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('You save <code>notes.txt</code> and switch the computer off. Next morning the OS finds it in a blink. What must it have remembered about the file, and where?',
            'إنت عملت save لـ <code>notes.txt</code> وقفلت الجهاز. تاني يوم الـ OS لقاه في ثانية. يا ترى كان فاكر إيه عن الـ file، وكان حاطط المعلومات دي فين؟')}</p></${Box}>
        `, { sec: t('Where we left off', 'إحنا وقفنا فين') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">7</span><span className="t">${A ? html`الفصل السابع<br/>Operating Systems` : html`Chapter seven<br/>Operating Systems`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Where Did I Put That File?', 'أنا حاطط الـ file فين؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('the file-system', 'الـ file-system')}</p></div>
          <${Talk} who="dev">${X('To me a file is just <code>notes.txt</code>. Double-click, done.', 'الـ file بالنسبالي مجرد <code>notes.txt</code>. دبل كليك وخلاص.')}</${Talk}>
          <${Talk} who="disk" flip=${true}>${X('To me it\'s a bunch of <b>blocks</b> scattered across my surface. Somebody has to keep track.', 'وبالنسبالي هو شوية <b>blocks</b> متفرقين على السطح بتاعي. لازم حد يفتكر هما فين.')}</${Talk}>
          <${Talk} who="os">${X('That\'s me, through the <b>file system</b>: names, directories, permissions, and which block goes where.', 'ده أنا، عن طريق الـ <b>file system</b>: الأسامي، والـ directories، والـ permissions، وكل block رايح فين.')}</${Talk}>
          <${P} small=${true}>${X('From the outside in: what a file <i>is</i>, how you reach it, how directories organize it, who may touch it, and where its blocks go.',
            'من برّه لجوّه: الـ file <i>إيه</i>، بتوصله إزاي، بيتنظّم إزاي، مين يلمسه، والـ blocks بتاعته بتروح فين.')}</${P}>
        `, { sec: t('Meet the file system', 'اتعرّف على الـ file system') }),

        // 2 · what is a file
        page(html`
          <${H1}>${t('So what is a file?', 'يعني إيه file أصلًا؟')}</${H1}>
          <${Def}>${X('A <b>file</b> is a <b>contiguous logical address space</b>: a logical storage unit, a collection of related information.',
            'الـ <b>file</b> هو <b>contiguous logical address space</b>، يعني وحدة تخزين منطقية فيها مجموعة معلومات مرتبطة ببعض.')}</${Def}>
          <${Hand} arrow="up" red=${true}>${t('"contiguous" here is the logical view, how you see it, not how the disk stores it', 'الـ "contiguous" هنا في الشكل المنطقي، يعني إنت شايفه إزاي، مش الـ disk مخزّنه إزاي')}</${Hand}>
          <div className="hf-os7-row2 hf-in">
            <div><b>${t('Type 1: data', 'النوع الأول: data')}</b>${X('numeric, character or binary', 'زي الـ numeric والـ character والـ binary')}</div>
            <div><b>${t('Type 2: program', 'النوع التاني: program')}</b>${X('code you can run', 'كود ينفع يشتغل')}</div>
          </div>
          <${P} small=${true}>${X("What's inside is defined by the file's <b>creator</b>: a text file, a source file, an executable file…", 'اللي جوّه بيحدده <b>اللي عمل الـ file</b>: text file، أو source file، أو executable file…')}</${P}>
          <${Grow} />
          <${Hand}>${t("Our analogy: the file is a book you read page after page. Where its pages sit in the warehouse is the file system's business.", 'تشبيه من عندنا: الـ file زي كتاب بتقراه صفحة ورا صفحة. والصفحات متشالة فين في المخزن، دي شغلانة الـ file system.')}</${Hand}>
        `, { sec: t('Files', 'الـ Files') }),

        // 3 · attributes
        page(html`
          <${H2}>${t('Seven things the OS remembers about every file', 'سبع حاجات الـ OS فاكرها عن كل file')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Name</b>: المعلومة الوحيدة اللي البني آدم يقدر يقراها.',
            'الـ <b>Identifier</b>: tag أو رقم مميز جوّه الـ file system.',
            'الـ <b>Type</b>.',
            'الـ <b>Location</b>: pointer لمكان الـ file على الجهاز.',
            'الـ <b>Size</b>.',
            'الـ <b>Protection</b>: مين يقدر يقرا ويكتب وينفّذ.',
            'الـ <b>Time والـ date والـ user identification</b>: للـ protection والـ security ومتابعة الاستخدام.'
          ] : [
            '<b>Name</b>: the only information kept in human-readable form.',
            '<b>Identifier</b>: a unique tag (number) within the file system.',
            '<b>Type</b>.',
            '<b>Location</b>: a pointer to the file\'s location on the device.',
            '<b>Size</b>.',
            '<b>Protection</b>: who can read, write, execute.',
            '<b>Time, date and user identification</b>: for protection, security and usage monitoring.'
          ]} />
          <${P} small=${true}>${X('Extended attributes add things like a <b>file checksum</b>. All this information is kept in the <b>directory structure</b>, which is maintained <b>on the disk</b>.',
            'والـ extended attributes بتزوّد حاجات زي الـ <b>file checksum</b>. وكل المعلومات دي متحفوظة في الـ <b>directory structure</b>، اللي متخزّن <b>على الـ disk</b>.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Which attribute is the only one in human-readable form?" The <b>name</b>. The <b>identifier</b> is a number for the system, not for you.',
            'لو اتسألت أنهي attribute هو الوحيد اللي البني آدم يقراه، يبقى الـ <b>name</b>. أما الـ <b>identifier</b> فده رقم للـ system، مش ليك.')}</p></${Box}>
        `),

        // 4 · operations
        page(html`
          <${H2}>${t('What you can do to a file', 'تقدر تعمل إيه في الـ file')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>create</b>.',
            'الـ <b>write</b> عند الـ <b>write pointer</b>.',
            'الـ <b>read</b> عند الـ <b>read pointer</b>.',
            'الـ <b>reposition</b> جوّه الـ file، واسمها <b>seek</b>.',
            'الـ <b>delete</b> والـ <b>truncate</b>.'
          ] : [
            '<b>create</b>.',
            '<b>write</b>, at the <b>write pointer</b>.',
            '<b>read</b>, at the <b>read pointer</b>.',
            '<b>reposition</b> within the file, a.k.a. <b>seek</b>.',
            '<b>delete</b> and <b>truncate</b>.'
          ]} />
          <${Def}>${X('<b>open(F<sub>i</sub>)</b>: search the directory structure on disk for entry F<sub>i</sub>, and move its content to <b>memory</b>.<br/><b>close(F<sub>i</sub>)</b>: move the content of entry F<sub>i</sub> in memory <b>back</b> to the directory structure on disk.',
            'الـ <b><bdi dir="ltr">open(Fi)</bdi></b>: دوّر في الـ directory structure اللي على الـ disk على الـ entry بتاع Fi، وانقل محتواه للـ <b>memory</b>.<br/>والـ <b><bdi dir="ltr">close(Fi)</bdi></b>: انقل محتوى الـ entry اللي في الـ memory <b>ورجّعه</b> للـ directory structure على الـ disk.')}</${Def}>
          <${Talk} who="proc">${X('So <code>open</code> drags my whole file into memory?', 'يعني الـ <code>open</code> بيشيل الـ file كله للـ memory؟')}</${Talk}>
          <${Talk} who="os" flip=${true}>${X('No, the file\'s <b>directory entry</b>. Its data stays where it is until you read it.', 'لأ، بيشيل الـ <b>directory entry</b> بتاعه. الداتا نفسها بتفضل مكانها لحد ما تقراها.')}</${Talk}>
        `, { sec: t('File operations', 'الـ File operations') }),

        // 5 · figure
        page(html`
          <${H2}>${t('Watch open, write, read, seek and close', 'اتفرج على الـ open والـ write والـ read والـ seek والـ close')}</${H2}>
          <${Fig} name="os-file-open" />
        `),

        // 6 · open files
        page(html`
          <${H1}>${t('Keeping track of open files', 'إزاي الـ OS بيتابع الـ files المفتوحة')}</${H1}>
          <${P} small=${true}>${X('Once files are open, the OS needs four pieces of data to manage them. Match each one to its job:', 'لما الـ files تتفتح، الـ OS محتاج أربع حاجات عشان يديرها. وصّل كل واحدة بشغلانتها:')}</${P}>
          <${Match} id="open" left=${['Open-file table', 'File pointer', 'File-open count', 'Access rights']}
            right=${A ? ['معلومات الـ access-mode لكل process', 'آخر مكان حصل فيه <bdi dir="ltr">read/write</bdi>، لكل process لوحده', 'بيتابع الـ files المفتوحة', 'الـ file مفتوح كام مرة، عشان الـ entry يتشال لما آخر process تقفله']
              : ['Per-process access-mode information', 'The last read/write location, kept per process', 'Tracks the open files', 'How many times the file is open, so its entry can be removed when the last process closes it']}
            answer=${[2, 1, 3, 0]} />
          <${Grow} />
          <${Hand} red=${true}>${t('the pointer and the rights belong to each process; the count belongs to the file', 'الـ pointer والـ rights لكل process، أما الـ count فهو بتاع الـ file')}</${Hand}>
        `, { sec: t('Open files', 'الـ Open files') }),

        // 7 · figure
        page(html`
          <${H2}>${t('Two processes, one file', 'اتنين processes وfile واحد')}</${H2}>
          <${Fig} name="os-open-count" />
        `),

        // 8 · interview
        page(html`
          <${Interview} title=${t('The Open-File Table, exposed', 'الـ Open-File Table على المكشوف')} sub=${t("This week's interview: the table that knows which files are in use.", 'حوار الأسبوع: الـ table اللي عارف مين الـ files اللي شغالة.')} lines=${A ? [
            ['المذيع', 'إنت مين بالظبط؟'],
            ['الـ Table', 'أنا الـ <b>open-file table</b>. شغلتي إني <b>أتابع الـ files المفتوحة</b>.'],
            ['المذيع', 'ولو اتنين processes فتحوا نفس الـ file؟'],
            ['الـ Table', 'عندي <b>file-open count</b>: الـ file مفتوح كام مرة. ولما <b>آخر process</b> تقفله، الـ entry بتاعه يتشال.'],
            ['المذيع', 'وكل process عارفة هي واقفة فين في الـ file إزاي؟'],
            ['الـ Table', 'كل process ليها <b>file pointer</b> خاص بيها (آخر read أو write)، و<b>access rights</b> خاصة بيها.']
          ] : [
            ['Head First', 'Who exactly are you?'],
            ['Table', "I'm the <b>open-file table</b>. My job is to <b>track open files</b>."],
            ['Head First', 'And if two processes open the same file?'],
            ['Table', 'I keep a <b>file-open count</b>: how many times it is open. When the <b>last</b> process closes it, its entry can be removed.'],
            ['Head First', 'How does each process know where it is in the file?'],
            ['Table', 'Each one has its own <b>file pointer</b> (last read/write location) and its own <b>access rights</b>.']
          ]} />
          <${Grow} />
          <${Talk} who="table" flip=${true}>${t('Count goes to zero, I let go.', 'لما الـ count يوصل صفر، بسيبه يمشي.')}</${Talk}>
        `),

        // 9 · file types and structure
        page(html`
          <${H2}>${t('File types and file structure', 'أنواع الـ files والـ structure بتاعها')}</${H2}>
          <${P} small=${true}>${X('The <b>extension</b> tells the type:', 'الـ <b>extension</b> بيقولك النوع:')}</${P}>
          <div className="hf-os7-tbl hf-in" dir="ltr" style=${{ fontSize: '13px' }}>
            ${[['executable', 'exe, com, bin'], ['object', 'obj, o'], ['source code', 'c, cc, java, asm…'], ['batch', 'bat, sh'], ['text', 'txt, doc'], ['word processor', 'wp, tex, rtf, doc'], ['library', 'lib, a, so, dll'], ['print or view', 'ps, pdf, jpg'], ['archive', 'arc, zip, tar'], ['multimedia', 'mpeg, mov, mp3, mp4, avi']].map(([k, e]) => html`<div key=${k} className="hf-os7-tr" style=${{ gridTemplateColumns: '1fr 1.2fr', minHeight: '21px' }}><span style=${{ fontWeight: 700, padding: '1px 6px', fontSize: '13px' }}>${k}</span><span style=${{ padding: '1px 6px' }}><code style=${{ fontSize: '13px', fontWeight: 600 }}>${e}</code></span></div>`)}
          </div>
          <${P} small=${true}>${X('And the <b>structure</b> inside, decided by the <b>operating system</b> or the <b>program</b>:', 'والـ <b>structure</b> اللي جوّه، واللي بيحدده يا الـ <b>operating system</b> يا الـ <b>program</b>:')}</${P}>
          <${UL} items=${A ? ['مفيش structure خالص (<b>none</b>)، يعني words أو bytes ورا بعض.', 'الـ <b>simple record structure</b>، زي الـ lines أو الـ fixed length أو الـ variable length.', 'الـ <b>complex structures</b>، زي الـ formatted document أو الـ relocatable load file.']
            : ['<b>None</b>: a sequence of words or bytes.', '<b>Simple record structure</b>: lines, fixed length, variable length.', '<b>Complex structures</b>: formatted document, relocatable load file.']} />
        `),

        // 10 · access methods
        page(html`
          <${H1}>${t('Two ways to get at the data', 'طريقتين توصل بيهم للداتا')}</${H1}>
          <div className="hf-os7-row2 hf-in">
            <div><b>${t('Sequential', 'الـ Sequential')}</b>${X('The <b>tape model</b>: beginning, current position, end.<br/><code>read next</code>, <code>write next</code><br/><code>reset</code><br/>No read after the last write (rewrite).',
              'ماشي على <b>الـ tape model</b>: بداية، ومكان حالي، ونهاية.<br/><code>read next</code>، <code>write next</code><br/><code>reset</code><br/>ومفيش read بعد آخر write (rewrite).')}</div>
            <div><b>${t('Direct', 'الـ Direct')}</b>${X('The file is <b>fixed-length logical records</b>.<br/><code>read n</code>, <code>write n</code><br/><code>position to n</code><br/><code>read next</code>, <code>write next</code><br/><code>rewrite n</code>',
              'الـ file عبارة عن <b>logical records طولها ثابت</b>.<br/><code>read n</code>، <code>write n</code><br/><code>position to n</code><br/><code>read next</code>، <code>write next</code><br/><code>rewrite n</code>')}</div>
          </div>
          <${Def}>${X('In direct access, <b>n = relative block number</b>. Relative block numbers let the <b>OS decide where the file is placed</b>.',
            'في الـ direct access الـ <b>n هو الـ relative block number</b>. والـ relative block numbers بتخلّي <b>الـ OS يقرر الـ file يتحط فين</b>.')}</${Def}>
          <${Hand} tilt=${true}>${t("Ours: sequential is a cassette tape; direct is a playlist, jump to song n.", 'من عندنا: الـ sequential شريط كاسيت، والـ direct زي playlist بتنط فيها للأغنية رقم n.')}</${Hand}>
          <${Box} kind="watch"><p className="hf-p small">${X('<code>read n</code> means <b>direct</b> access. "Linked" is an <b>allocation</b> method, not an access method.',
            'الـ <code>read n</code> معناها <b>direct</b> access. والـ "linked" ده <b>allocation</b> method، مش access method.')}</p></${Box}>
        `, { sec: t('Access methods', 'الـ Access methods') }),

        // 11 · figure
        page(html`
          <${H2}>${t('Try all three modes', 'جرّب الـ modes التلاتة')}</${H2}>
          <${Fig} name="os-access-methods" />
        `),

        // 12 · simulation + trace
        page(html`
          <${H2}>${t('Faking sequential on a direct file', 'الـ sequential بالمحاكاة على direct file')}</${H2}>
          <${Code} lines=${[['reset       → cp = 0'], ['read next   → read cp; cp = cp + 1'], ['write next  → write cp; cp = cp + 1']]} />
          <${Box} kind="pencil" title=${t('Be the file pointer', 'خليك إنت الـ cp')}><p className="hf-p small">${X('cp starts at 0. For each operation, write the block it reads or writes and cp after it. (Our sequence, the lecture\'s rules.)',
            'الـ cp بيبدأ من 0. لكل operation اكتب الـ block اللي اتقرا أو اتكتب، والـ cp بعدها. (الترتيب من عندنا، والقواعد من المحاضرة.)')}</p></${Box}>
          <${CpTrace} />
        `),

        // 13 · directory structure
        page(html`
          <${H1}>${t('Directories: the file system\'s index', 'الـ Directories: فهرس الـ file system')}</${H1}>
          <${Def}>${X('A <b>directory</b> is a collection of nodes containing information about all files. <b>Both the directory structure and the files reside on disk.</b>',
            'الـ <b>directory</b> مجموعة nodes فيها معلومات عن كل الـ files. <b>والـ directory structure والـ files الاتنين موجودين على الـ disk.</b>')}</${Def}>
          <${P} small=${true}>${X('Its operations: <b>search</b> for a file, <b>create</b> a file, <b>delete</b> a file, <b>list</b> a directory, <b>rename</b> a file, <b>traverse</b> the file system.',
            'الـ operations بتاعته: الـ <b>search</b> عن file، والـ <b>create</b>، والـ <b>delete</b>، والـ <b>list</b> للـ directory، والـ <b>rename</b>، والـ <b>traverse</b> للـ file system.')}</${P}>
          <${H3c} t=${t('Organize it to get three things', 'بننظّمه عشان نكسب تلات حاجات')} />
          <${UL} items=${A ? [
            'الـ <b>Efficiency</b>: تلاقي الـ file بسرعة.',
            'الـ <b>Naming</b>: مريح للـ users. اتنين users ممكن يدّوا نفس الاسم لـ files مختلفة، والـ file الواحد ممكن يبقى ليه كذا اسم.',
            'الـ <b>Grouping</b>: تجميع منطقي حسب الخصائص، زي كل برامج الـ Java أو كل الـ games.'
          ] : [
            '<b>Efficiency</b>: locate a file quickly.',
            '<b>Naming</b>: convenient to users. Two users can use the same name for different files, and one file can have several names.',
            '<b>Grouping</b>: logical grouping by properties, e.g. all Java programs, all games.'
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('keep these three in mind: each structure next is judged by them', 'خلّي التلاتة دول في دماغك: كل structure جاي هنقيّمه بيهم')}</${Hand}>
        `, { sec: t('Directory structure', 'الـ Directory structure') }),

        // 14 · single vs two level
        page(html`
          <${H2}>${t('Single-level vs two-level', 'الـ single-level والـ two-level')}</${H2}>
          <div className="hf-os7-vs hf-in">
            <div className="hd"></div><div className="hd">${t('Single-level', 'الـ Single-level')}</div><div className="hd">${t('Two-level', 'الـ Two-level')}</div>
            <div className="k">${t('Structure', 'الشكل')}</div><div>${X('One directory for all users', 'فيه directory واحد لكل الـ users')}</div><div>${X('A separate directory (<b>UFD</b>) for each user, under a master directory', 'لكل user الـ directory بتاعه (<b>UFD</b>) تحت الـ master directory')}</div>
            <div className="k">${t('Naming', 'الـ Naming')}</div><div>${X('<b>Naming problem</b>: all files need unique names', '<b>مشكلة naming</b>: كل الـ files لازم أساميها unique')}</div><div>${X('Same file name OK for different users; addressed by <b>path name</b> (user/file)', 'نفس الاسم مسموح لـ users مختلفين، والوصول بالـ <b>path name</b> <bdi dir="ltr">user/file</bdi>')}</div>
            <div className="k">${t('Grouping', 'الـ Grouping')}</div><div>${X('<b>No grouping</b>', '<b>مفيش grouping</b>')}</div><div>${X('Still <b>no grouping</b> within a user', 'لسه <b>مفيش grouping</b> جوّه الـ user')}</div>
            <div className="k">${t('Search', 'الـ Search')}</div><div>${X('Slow as files grow', 'بيبطأ لما الـ files تكتر')}</div><div>${X('<b>Efficient</b> searching', 'الـ search بيبقى <b>efficient</b>')}</div>
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X("A single-level directory's two named problems are <b>naming</b> and <b>grouping</b>. Two-level fixes <b>naming</b> only: grouping still needs a tree.",
            'المشكلتين اللي بيتقال عليهم في الـ single-level هما الـ <b>naming</b> والـ <b>grouping</b>. والـ two-level بيحل الـ <b>naming</b> بس، أما الـ grouping فمحتاج tree.')}</p></${Box}>
        `),

        // 15 · tree-structured
        page(html`
          <${H2}>${t('The tree: what you actually use', 'الـ tree: اللي إنت بتستخدمه فعلًا')}</${H2}>
          <${P} small=${true}>${X('A <b>tree-structured</b> directory gives <b>efficient searching</b>, <b>grouping capability</b>, and a <b>current (working) directory</b>:',
            'الـ <b>tree-structured</b> directory بيدّيك <b>search efficient</b>، و<b>إمكانية grouping</b>، و<b>current (working) directory</b>:')}</${P}>
          <${Code} lines=${[['cd /spell/mail/prog', t('← now prog is the current directory', 'دلوقتي prog هو الـ current directory')]]} />
          <${P} small=${true}>${X('Path names are <b>absolute</b> (from the root) or <b>relative</b> (from the current directory). New files and subdirectories are created <b>in the current directory</b>:',
            'الـ path names يا <b>absolute</b> (من الـ root) يا <b>relative</b> (من الـ current directory). والـ files والـ subdirectories الجديدة بتتعمل <b>في الـ current directory</b>:')}</${P}>
          <${Code} lines=${['rm <file-name>', 'mkdir <dir-name>', ['mkdir count', t('← in /mail: count goes under mail', 'جوّه /mail: الـ count بيتعمل تحت mail')]]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Deleting the directory <b>mail</b> deletes the <b>entire subtree</b> rooted at mail, so <code>count</code> goes with it.',
            'لما تمسح الـ directory اللي اسمه <b>mail</b>، <b>الـ subtree كله</b> اللي تحته بيتمسح، فالـ <code>count</code> بيروح معاه.')}</p></${Box}>
        `),

        // 16 · figure
        page(html`
          <${H2}>${t('Single-level, two-level, tree', 'الـ single-level والـ two-level والـ tree')}</${H2}>
          <${Fig} name="os-dir-structures" />
        `),

        // 17 · dumb questions
        page(html`
          <${Dumb} qa=${A ? [
            ['في الـ two-level، لسه محتاج أسامي unique؟', 'جوّه الـ UFD بتاعك بس. الـ file بيتعرف بالـ path name، فالـ <bdi dir="ltr">user1/test</bdi> غير الـ <bdi dir="ltr">user2/test</bdi>.'],
            ['طب ليه الـ two-level مش بيحل الـ grouping؟', 'لأن كل user عنده directory واحد مسطّح، فمش هيعرف يجمّع الـ games لوحدها وبرامج الـ Java لوحدها. الـ <b>tree</b> هو اللي بيدّي الـ grouping.'],
            ['يعني إيه absolute وrelative path؟', 'الـ absolute بيبدأ من الـ root، زي <bdi dir="ltr">/spell/mail/prog</bdi>. والـ relative بيبدأ من الـ current directory، فلو إنت في <bdi dir="ltr">/spell</bdi> يبقى <bdi dir="ltr">mail/prog</bdi> (المثال التاني ده من عندنا).'],
            ['الـ directory متخزّن في الـ memory؟', 'لأ، <b>الـ directory structure والـ files الاتنين على الـ disk</b>. الـ open بس هو اللي بيجيب entry للـ memory.']
          ] : [
            ['In a two-level directory, do names still have to be unique?', 'Only inside your own UFD. A file is named by its path, so <code>user1/test</code> and <code>user2/test</code> are different files.'],
            ['Why doesn\'t two-level fix grouping?', 'Each user still has one flat directory, so you can\'t keep your games apart from your Java programs. The <b>tree</b> brings grouping.'],
            ['Absolute or relative path?', 'Absolute starts at the root: <code>/spell/mail/prog</code>. Relative starts at the current directory: from <code>/spell</code> it is <code>mail/prog</code> (that second example is ours).'],
            ['Is the directory kept in memory?', 'No: <b>both the directory structure and the files reside on disk</b>. Only open brings an entry into memory.']
          ]} />
        `),

        // 18 · sharing and protection
        page(html`
          <${H1}>${t('Sharing, and who may touch what', 'المشاركة، ومين يلمس إيه')}</${H1}>
          <${Talk} who="dev">${X('I want my friend to <b>play</b> my game, not <b>edit</b> it.', 'عايز صاحبي <b>يلعب</b> اللعبة بتاعتي، مش <b>يعدّل</b> فيها.')}</${Talk}>
          <${Talk} who="os" flip=${true}>${X('Sharing on a multi-user system is desirable, and it is done through a <b>protection scheme</b>.', 'المشاركة في الـ multi-user system حاجة كويسة، وبتتعمل عن طريق <b>protection scheme</b>.')}</${Talk}>
          <${UL} items=${A ? [
            'في الـ distributed systems الـ files بتتشارك على network، والـ <b>NFS (Network File System)</b> طريقة مشهورة.',
            'الـ <b>User IDs</b> بتعرّف الـ users، فينفع permissions لكل user. والـ <b>group IDs</b> بتحط الـ users في groups ليها access rights.',
            'كل file أو directory ليه <b>owner</b> و<b>group</b>.',
            'الـ owner (الـ creator) بيتحكم في <b>إيه اللي يتعمل ومين يعمله</b>.'
          ] : [
            'On distributed systems files are shared across a network; <b>NFS (Network File System)</b> is a common method.',
            '<b>User IDs</b> identify users, allowing per-user permissions. <b>Group IDs</b> put users in groups with group access rights.',
            'Each file or directory has an <b>owner</b> and a <b>group</b>.',
            'The owner/creator controls <b>what can be done and by whom</b>.'
          ]} />
          <${P} small=${true}>${X('Types of access: <b>read, write, execute, append, delete, list</b>.', 'وأنواع الـ access هي <b>read و write و execute و append و delete و list</b>.')}</${P}>
        `, { sec: t('Sharing and protection', 'الـ Sharing والـ protection') }),

        // 19 · unix modes
        page(html`
          <${H2}>${t('UNIX/Linux: three classes, three modes', 'الـ UNIX/Linux: تلات classes وتلات modes')}</${H2}>
          <${P} small=${true}>${X('Modes <b>read, write, execute</b> for three classes: <b>owner</b>, <b>group</b>, <b>public</b>. One bit per mode:',
            'فيه modes للـ <b>read والـ write والـ execute</b> لتلات classes: الـ <b>owner</b> والـ <b>group</b> والـ <b>public</b>. كل mode بـ bit:')}</${P}>
          <${Split761} />
          <${P} small=${true}>${X('For a group: ask the manager to create one (say <b>G</b>) and add users, then set the file\'s access.',
            'وعشان group: اطلب من الـ manager يعمله (زي <b>G</b>) ويضيف الـ users، وبعدين ظبّط الـ access بتاع الـ file.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('Digits go <b>owner, group, public</b>. In 761 the group is the <b>middle</b> 6 = RW-: read and write, no execute.',
            'الترتيب دايمًا <b>owner ثم group ثم public</b>. في 761 الـ group هو <b>الرقم اللي في النص</b>، يعني 6، يعني read وwrite من غير execute.')}</p></${Box}>
          <${P} small=${true}>${X('Windows uses <b>access-control lists</b> instead: full control, modify, read &amp; execute, read, write.', 'أما الـ Windows فبيستخدم <b>access-control lists</b>، زي:<span class="ltr">full control, modify, read &amp; execute, read, write</span>')}</${P}>
        `),

        // 20 · figure
        page(html`
          <${H2}>${t('Flip the bits yourself', 'اقلب الـ bits بنفسك')}</${H2}>
          <${Fig} name="os-chmod" />
        `),

        // 21 · chmod drill
        page(html`
          <${Box} kind="pencil" title=${t('Be chmod', 'خليك إنت chmod')}><p className="hf-p small">${X('Turn each mode string into its three digits, and each <code>chmod</code> number back into a mode string (like <code>rwx r-x ---</code>). The first row is the lecture\'s; the rest are ours.',
            'حوّل كل mode string لتلات أرقام، وكل رقم <code>chmod</code> لـ mode string (زي <code>rwx r-x ---</code>). أول سطر من المحاضرة، والباقي من عندنا.')}</p></${Box}>
          <${ChmodDrill} />
          <${Grow} />
          <${Hand} arrow="up">${t('R = 4, W = 2, X = 1: add them up per class', 'الـ R بـ 4 والـ W بـ 2 والـ X بـ 1: اجمعهم لكل class')}</${Hand}>
        `, { sec: t('Exercise: chmod', 'تمرين: الـ chmod') }),

        // 22 · implementation
        page(html`
          <${H1}>${t('Under the hood', 'تحت الكبوت')}</${H1}>
          <${P} small=${true}>${X('The file system <b>resides on secondary storage</b> (disks). It gives you two things:', 'الـ file system <b>موجود على الـ secondary storage</b> (الـ disks)، وبيدّيك حاجتين:')}</${P}>
          <${UL} items=${A ? ['الـ <b>user interface</b> للـ storage، يعني <b>mapping</b> من الـ logical للـ physical.', 'الـ <b>access efficient ومريح</b>: إنك تعمل store وlocate وretrieve للداتا بسهولة.']
            : ['The <b>user interface</b> to storage: <b>mapping logical to physical</b>.', '<b>Efficient and convenient access</b>: data is easy to store, locate and retrieve.']} />
          <${P} small=${true}>${X('Disks allow <b>in-place rewrite</b> and <b>random access</b>. I/O is done in <b>blocks of sectors</b>, usually <b>512 bytes</b>.',
            'الـ disks بتسمح بالـ <b>in-place rewrite</b> والـ <b>random access</b>. والـ <bdi dir="ltr">I/O</bdi> بيتعمل في <b>blocks of sectors</b>، غالبًا <b>512 bytes</b>.')}</${P}>
          <div className="hf-os7-row2 hf-in">
            <div><b>FCB</b>${X('<b>File control block</b>: the storage structure holding information about a file.', 'الـ <b>file control block</b>: الـ storage structure اللي فيه معلومات عن الـ file.')}</div>
            <div><b>${t('Device driver', 'الـ Device driver')}</b>${X('Controls the <b>physical device</b>.', 'بيتحكم في <b>الجهاز الـ physical</b>.')}</div>
          </div>
          <${Grow} />
          <${Talk} who="disk" flip=${true}>${X("I don't do bytes one at a time. Give me <b>whole blocks</b>.", 'أنا مبتعاملش byte byte. هاتلي <b>blocks كاملة</b>.')}</${Talk}>
        `, { sec: t('Implementation', 'الـ Implementation') }),

        // 23 · directory implementation
        page(html`
          <${H2}>${t('How is a directory built?', 'الـ directory بيتعمل إزاي؟')}</${H2}>
          <div className="hf-os7-row2 hf-in">
            <div><b>${t('Linear list', 'الـ Linear list')}</b>${X('File names with pointers to the data blocks.<br/>+ simple to program<br/>− time-consuming: a <b>linear search</b><br/>Could be kept sorted with a linked list or a <b>B+ tree</b>.',
              'أسامي الـ files ومعاها pointers للـ data blocks.<br/>الميزة: سهلة في البرمجة.<br/>العيب: بتاخد وقت، لأن الـ search <b>linear</b>.<br/>ممكن تبقى sorted بـ linked list أو <b>B+ tree</b>.')}</div>
            <div><b>${t('Hash table', 'الـ Hash table')}</b>${X('Linear list + hash structure.<br/>+ <b>decreases directory search time</b><br/>− <b>collisions</b>: two names hash to the same location<br/>Only good if entries are <b>fixed size</b>, or use <b>chained overflow</b>.',
              'هي linear list ومعاها hash structure.<br/>الميزة: <b>بتقلّل وقت الـ search</b>.<br/>العيب: الـ <b>collisions</b>، يعني اسمين يروحوا لنفس المكان.<br/>كويسة بس لو الـ entries <b>ثابتة الحجم</b>، أو استخدم الـ <b>chained overflow</b>.')}</div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${t('A directory of 10,000 files as a linear list: how many names might a search have to compare in the worst case? And with a good hash table and no collisions?', 'directory فيه 10,000 file على هيئة linear list: الـ search ممكن يقارن كام اسم في أسوأ حالة؟ وفي hash table كويس ومفيش collisions؟')}</p></${Box}>
          <${Box} kind="watch"><p className="hf-p small">${X('A hash table <b>decreases</b> search time (not increases), and its price is handling <b>collisions</b>.', 'الـ hash table <b>بيقلّل</b> وقت الـ search (مش بيزوّده)، والتمن إنه لازم يتعامل مع الـ <b>collisions</b>.')}</p></${Box}>
        `),

        // 24 · figure
        page(html`
          <${H2}>${t('Search both ways', 'دوّر بالطريقتين')}</${H2}>
          <${Fig} name="os-dir-impl" />
        `),

        // 25 · allocation + contiguous
        page(html`
          <${H1}>${t('Where do the blocks go?', 'الـ blocks تروح فين؟')}</${H1}>
          <${P} small=${true}>${X('An <b>allocation method</b> is how disk blocks are allocated to files. Three of them: <b>contiguous</b>, <b>linked</b>, <b>indexed</b>.', 'الـ <b>allocation method</b> هي إزاي الـ disk blocks بتتوزّع على الـ files. وهما تلاتة: <b>contiguous</b> و<b>linked</b> و<b>indexed</b>.')}</${P}>
          <${P} small=${true}>${X('<b>Contiguous</b>: each file occupies a run of <b>contiguous blocks</b>, so the directory needs only the <b>start block and the length</b>:', 'في الـ <b>contiguous</b> كل file بياخد <b>blocks جنب بعض</b>، فالـ directory محتاج بس <b>الـ start block والـ length</b>:')}</${P}>
          <div className="hf-os7-tbl hf-in" dir="ltr">
            <div className="hf-os7-tr hd" style=${{ gridTemplateColumns: '1fr 1fr 1fr' }}><span>file</span><span>start</span><span>length</span></div>
            ${[['count', 0, 2], ['tr', 14, 3], ['mail', 19, 6], ['list', 28, 4], ['f', 6, 2]].map(([n, s, l]) => html`<div key=${n} className="hf-os7-tr" style=${{ gridTemplateColumns: '1fr 1fr 1fr', minHeight: '21px' }}><span><code>${n}</code></span><span><code>${s}</code></span><span><code>${l}</code></span></div>`)}
          </div>
          <${Box} kind="brain"><p className="hf-p small">${X('Which blocks does <code>tr</code> occupy? And where is block 3 of <code>mail</code>, counting from 0?', 'الـ <code>tr</code> واخد أنهي blocks؟ وفين الـ block رقم 3 في <code>mail</code>، لو بنعد من 0؟')}</p>
            <${K.Reveal} id="cont"><p className="hf-p small">${X('<code>tr</code>: 14, 15, 16. Block 3 of <code>mail</code>: start + 3 = 19 + 3 = <b>22</b>, one read. That\'s why contiguous gives the <b>best performance in most cases</b>.',
              'الـ <code>tr</code> واخد 14 و15 و16. والـ block رقم 3 في <code>mail</code> هو <bdi dir="ltr">19 + 3 = 22</bdi>، يعني read واحد بس، وعشان كده الـ contiguous <b>أحسن performance في أغلب الحالات</b>.')}</p></${K.Reveal}></${Box}>
        `, { sec: t('Allocation methods', 'الـ Allocation methods') }),

        // 26 · contiguous problems + linked
        page(html`
          <${Box} kind="watch" title=${t("Contiguous's problems", 'مشاكل الـ contiguous')}><${UL} items=${A ? ['إنك <b>تلاقي مساحة</b> للـ file الجديد.', 'لازم <b>تعرف حجم الـ file مقدمًا</b>.', 'الـ <b>external fragmentation</b>، ومحتاج <b>compaction</b> يا off-line يا on-line.']
            : ['<b>Finding space</b> for a new file.', 'Knowing the <b>file size in advance</b>.', '<b>External fragmentation</b>, so it needs <b>compaction</b> (off-line or on-line).']} /></${Box}>
          <${H3c} t=${t('Linked: a treasure hunt', 'الـ Linked: لعبة الكنز')} />
          <${P} small=${true}>${X('Each file is a <b>linked list of blocks</b> scattered anywhere on the disk. Each block has a <b>pointer to the next</b>; the file ends at a <b>null</b> pointer. The directory holds the <b>start</b> and the <b>end</b>. The lecture\'s file <code>jeep</code>: start 9, end 25.',
            'كل file عبارة عن <b>linked list من blocks</b> متفرقة في أي حتة على الـ disk. كل block فيه <b>pointer للي بعده</b>، والـ file بيخلص عند pointer قيمته <b>null</b>. والـ directory شايل الـ <b>start</b> والـ <b>end</b>. والـ file بتاع المحاضرة <code>jeep</code> بيبدأ من 9 وبيخلص عند 25.')}</${P}>
          <${JeepChain} />
          <div className="hf-os7-row2 hf-in">
            <div><b>${t('Advantages', 'المميزات')}</b>${X('No external fragmentation<br/>No compaction<br/>No need to declare the size at creation', 'مفيش external fragmentation<br/>مفيش compaction<br/>مش لازم تعلن الحجم وقت الإنشاء')}</div>
            <div><b>${t('Disadvantages', 'العيوب')}</b>${X('Reliability: pointers lost or damaged<br/>Locating a block: many I/Os and seeks<br/>Space for the pointers', 'الـ reliability: الـ pointers ممكن تضيع أو تبوظ<br/>الوصول لأي block بياخد <bdi dir="ltr">I/Os</bdi> وseeks كتير<br/>مساحة للـ pointers')}</div>
          </div>
        `),

        // 27 · FAT
        page(html`
          <${H2}>${t('FAT: all the links in one table', 'الـ FAT: كل الـ links في table واحد')}</${H2}>
          <${Def}>${X('The <b>FAT (File-Allocation Table)</b> is a <b>variation of linked allocation</b> that keeps the links in a <b>table at the start of the volume</b>. FAT[b] holds the block that comes after b; <b>−1</b> marks the end of the file.',
            'الـ <b>FAT (File-Allocation Table)</b> هو <b>نوع من الـ linked allocation</b> بيحط الـ links في <b>table في أول الـ volume</b>. الـ <bdi dir="ltr">FAT[b]</bdi> فيه الـ block اللي بعد b، والـ <bdi dir="ltr">−1</bdi> معناها آخر الـ file.')}</${Def}>
          <${P} small=${true}>${X('The lecture\'s file <code>test</code>: its directory entry holds start block <b>217</b>.', 'الـ file بتاع المحاضرة اسمه <code>test</code>، والـ directory entry بتاعه فيه start block <b>217</b>.')}</${P}>
          <${Code} lines=${[['FAT[217] = 618', t('← next is 618', 'اللي بعده 618')], ['FAT[618] = 339', t('← next is 339', 'اللي بعده 339')], ['FAT[339] = −1', t('← end of file', 'آخر الـ file')]]} />
          <div className="hf-os7-chain hf-in"><span>217</span><em>→</em><span>618</span><em>→</em><span>339</span><em>→</em><span className="end">−1</span></div>
          <${Grow} />
          <${Talk} who="table">${X("I'm the same chain as linked allocation, only the pointers live <b>with me</b>, not inside the blocks.", 'أنا نفس الـ chain بتاعة الـ linked allocation، بس الـ pointers عايشة <b>عندي</b>، مش جوّه الـ blocks.')}</${Talk}>
        `),

        // 28 · figure
        page(html`
          <${H2}>${t('Follow test through the FAT', 'امشي ورا test في الـ FAT')}</${H2}>
          <${Fig} name="os-fat" />
        `),

        // 29 · FAT exercise
        page(html`
          <${Box} kind="pencil" title=${t('Walk the FAT', 'امشي في الـ FAT')}><p className="hf-p small">${X('Pick a file, then tap its blocks in the FAT <b>in order</b>. <code>test</code> is the lecture\'s, <code>notes</code> is ours.',
            'اختار file، ودوس على الـ blocks بتاعته في الـ FAT <b>بالترتيب</b>. الـ <code>test</code> من المحاضرة والـ <code>notes</code> من عندنا.')}</p></${Box}>
          <${FatWalk} />
        `, { sec: t('Exercise: the FAT', 'تمرين: الـ FAT') }),

        // 30 · indexed
        page(html`
          <${H2}>${t('Indexed: a table of contents per file', 'الـ Indexed: فهرس لكل file')}</${H2}>
          <${P} small=${true}>${X('Each file has its own <b>index block(s)</b> of pointers to its data blocks. <code>jeep</code> again, this time with index block 19:', 'كل file ليه <b><bdi dir="ltr">index block(s)</bdi></b> فيه pointers للـ data blocks بتاعته. وده <code>jeep</code> تاني، بـ index block رقم 19:')}</${P}>
          <${JeepIndex} />
          <div className="hf-os7-row2 hf-in">
            <div><b>${t('Good', 'الحلو')}</b>${X('<b>Random (direct) access</b><br/>Dynamic access <b>without external fragmentation</b>', 'الـ <b>random (direct) access</b><br/>الـ dynamic access <b>من غير external fragmentation</b>')}</div>
            <div><b>${t('Price', 'التمن')}</b>${X('The <b>overhead of the index block</b>, one for every file', 'الـ <b>overhead بتاع الـ index block</b>، واحد لكل file')}</div>
          </div>
          <${Box} kind="brain"><p className="hf-p small">${X('A file of at most <b>256 KB</b>, <b>512-byte</b> blocks: how many index blocks?', 'لو الـ file أقصاه <b>256 KB</b> والـ block بـ <b>512 byte</b>، محتاج كام index block؟')}</p>
            <${K.Reveal} id="ix"><p className="hf-p small">${X('256 KB / 512 B = <b>512 blocks</b>: the lecture says <b>1 index block</b> is enough. For unbounded length, a <b>linked scheme</b> links the index table\'s blocks, with no size limit.',
              'الحساب:<span class="ltr">256 KB / 512 B = 512 blocks</span>والمحاضرة بتقول <b>index block واحد</b> كفاية. ولو الطول مش محدود، الـ <b>linked scheme</b> بيربط blocks الـ index table ببعض من غير حد.')}</p></${K.Reveal}></${Box}>
        `),

        // 31 · figure
        page(html`
          <${H2}>${t('All three on the same disk', 'التلاتة على نفس الـ disk')}</${H2}>
          <${Fig} name="os-alloc-methods" />
        `),

        // 32–33 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: Contiguous and Linked allocation argue over who should own the disk.", 'قعدة الليلة: الـ Contiguous والـ Linked بيتخانقوا مين فيهم يمسك الـ disk.')} />
          <${Chat} names=${[t('Contiguous', 'الـ Contiguous'), t('Linked', 'الـ Linked')]} lines=${A ? [
            [0, 'أنا بحط كل file في <b>blocks ورا بعض</b>. الـ directory محتاج مني <b>الـ start والـ length</b> بس.'],
            [1, 'شيك أوي، لحد ما تحتاج مساحة. هتلاقي منين blocks فاضية جنب بعض قد كده؟'],
            [0, 'ماشي، <b>إيجاد المساحة</b> مشكلة. ولازم كمان <b>أعرف حجم الـ file من الأول</b>.'],
            [1, 'أنا لأ. الـ file بتاعي بيكبر block block، في أي block فاضي في أي حتة. <b>مفيش external fragmentation</b> ولا compaction.'],
            [0, 'عندي external fragmentation، وساعات محتاج <b>compaction</b>. بس أنا <b>أحسن performance في أغلب الحالات</b>.']
          ] : [
            [0, 'I keep every file in <b>one unbroken run of blocks</b>. The directory only needs my <b>start and length</b>.'],
            [1, 'Very tidy, until you need space. Where do you find a free run that big?'],
            [0, 'Fine, <b>finding space</b> is a problem. And I need to <b>know the file size in advance</b>.'],
            [1, "I don't. My files grow block by block, into any free block anywhere. <b>No external fragmentation</b>, no compaction."],
            [0, 'Yes, I get external fragmentation, and sometimes I need <b>compaction</b>. But I give the <b>best performance in most cases</b>.']
          ]} />
        `, { sec: t('Fireside chat', 'دردشة جنب الدفاية') }),
        page(html`
          <${Chat} names=${[t('Contiguous', 'الـ Contiguous'), t('Linked', 'الـ Linked')]} start=${1} lines=${A ? [
            [0, 'عايز block رقم 3؟ <bdi dir="ltr">start + 3</bdi>، وread واحد.'],
            [1, 'أنا... بمشي ورا الـ chain من الأول. <bdi dir="ltr">I/Os</bdi> وseeks كتير. <b>مفيش direct access كويس</b>.'],
            [0, 'ولو pointer من بتوعك ضاع أو باظ؟'],
            [1, 'الـ file بيبوظ. الـ <b>reliability</b> هي نقطة ضعفي. وكمان كل block بيصرف مساحة على pointer.'],
            [1, 'بس ابن عمي الـ <b>FAT</b> بيحط كل الـ links في table في أول الـ volume.'],
            [0, 'وابن عمك التاني الـ <b>Indexed</b> بيحط pointers الـ file كلها في <b>index block</b>: random access ومفيش external fragmentation.'],
            [1, 'بس ده index block لكل file، يعني <b>overhead</b>.']
          ] : [
            [0, 'Want block 3? <b>Start + 3</b>, one read.'],
            [1, 'I… follow the chain from the start. Many I/Os and seeks. <b>No efficient direct access</b>.'],
            [0, 'And if one of your pointers gets lost or damaged?'],
            [1, 'The file breaks. <b>Reliability</b> is my weak spot. And every block spends space on a pointer.'],
            [1, 'My cousin <b>FAT</b> keeps the links in a table at the start of the volume.'],
            [0, 'And your other cousin <b>Indexed</b> puts a file\'s pointers in an <b>index block</b>: random access, no external fragmentation.'],
            [1, 'At the cost of an index block for every file. <b>Overhead</b>.']
          ]} />
          <${Hand} tilt=${true}>${t('every method buys something and pays for it somewhere else', 'كل method بتكسب حاجة وبتدفع تمنها في حتة تانية')}</${Hand}>
        `),

        // 34 · sort
        page(html`
          <${Box} kind="pencil" title=${t('Which method is it?', 'أنهي method دي؟')}><p className="hf-p small">${X('Tap <b>C</b> for contiguous, <b>L</b> for linked, <b>I</b> for indexed, then check.', 'دوس <b>C</b> للـ contiguous، و<b>L</b> للـ linked، و<b>I</b> للـ indexed، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="alloc" bins=${[['C', 'Contiguous'], ['L', 'Linked'], ['I', 'Indexed']]} items=${A ? [
            ['الـ directory شايل الـ start والـ length بس', 0],
            ['كل block فيه pointer للي بعده', 1],
            ['كل file ليه block فيه pointers لكل الـ blocks بتاعته', 2],
            ['عنده external fragmentation ومحتاج compaction', 0],
            ['لازم تعرف حجم الـ file من الأول', 0],
            ['عشان توصل لـ block لازم تمشي ورا الـ chain', 1],
            ['فيه random access بس عليه overhead الـ index block', 2],
            ['الـ FAT نوع منه', 1]
          ] : [
            ['The directory keeps only start and length', 0],
            ['Each block points to the next', 1],
            ['Each file has a block of pointers to all its blocks', 2],
            ['Suffers external fragmentation, needs compaction', 0],
            ['The file size must be known in advance', 0],
            ['Reaching a block means following the chain', 1],
            ['Random access, but index-block overhead', 2],
            ['FAT is a variation of it', 1]
          ]} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 35–37 · exam corner: the site's practice questions (the lecture has none of the doctor's)
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("These are the site's own practice questions: there are no questions from the doctors' papers on this lecture yet. Tap an answer to see why.", 'دي أسئلة تدريب من الموقع، لأن لسه مفيش أسئلة من امتحانات الدكاترة على المحاضرة دي. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${mq('m1', /chmod 761 game gives the group/i)}
          <${Grow} />
          <${Talk} who="os" flip=${true}>${t('Owner, group, public. Always in that order.', 'الـ owner، وبعده الـ group، وبعده الـ public. دايمًا بالترتيب ده.')}</${Talk}>
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${mq('m2', /FAT entry for block 339/i)}
          <${Gap} h=${6} />
          ${mq('m3', /suffers from external fragmentation/i)}
        `),
        page(html`
          ${mq('m4', /hash-table directory implementation/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('faster search, but collisions: that is the whole hash-table story', 'search أسرع، بس فيه collisions: دي حكاية الـ hash table كلها')}</${Hand}>
        `),

        // 38 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>file</b> هو contiguous logical address space، والـ <b>name</b> هو الـ attribute الوحيد اللي بيتقري.',
            'الـ open بيجيب الـ directory entry للـ memory، والـ close بيرجّعه للـ disk.',
            'الـ open files محتاجة open-file table وfile pointer وfile-open count وaccess rights.',
            'الـ <b>sequential</b> فيه read next وreset، والـ <b>direct</b> فيه read n.',
            'الـ <b>single-level</b> فيه مشكلة naming وgrouping، والـ <b>two-level</b> بيحل الـ naming، والـ <b>tree</b> بيدّي grouping.',
            'الترتيب owner ثم group ثم public:<span class="ltr">chmod 761 = rwx rw- --x</span>',
            'الـ <b>hash table</b> أسرع من الـ linear list، بس فيه collisions.',
            'الـ <b>contiguous</b> سريع وفيه external fragmentation، والـ <b>linked</b> والـ <b>FAT</b> بطيئين في الـ direct access، والـ <b>indexed</b> عليه overhead الـ index block.'
          ] : [
            'A <b>file</b> is a contiguous logical address space, data or program. The <b>name</b> is the only human-readable attribute.',
            'open(F<sub>i</sub>) brings the directory entry from disk to memory; close(F<sub>i</sub>) moves it back.',
            'Open files need an open-file table, a per-process file pointer, a file-open count and access rights.',
            '<b>Sequential</b>: read next, write next, reset. <b>Direct</b>: read n by relative block number.',
            '<b>Single-level</b>: naming and grouping problems. <b>Two-level</b> fixes naming only. <b>Tree</b> adds grouping and a current directory.',
            'Digits go owner, group, public: <code>chmod 761</code> = rwx rw- --x.',
            '<b>Linear list</b>: simple but slow. <b>Hash table</b>: faster, but collisions.',
            '<b>Contiguous</b>: fast, but external fragmentation. <b>Linked</b> and <b>FAT</b>: no fragmentation, slow direct access. <b>Indexed</b>: random access, index-block overhead.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 39 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 7!', 'خلّصت الفصل السابع!')}</${H1}>
            <${Talk} who="os">${t('Next time: I/O systems, how I talk to the devices themselves.', 'المرة الجاية: الـ I/O systems، أنا بكلّم الأجهزة نفسها إزاي.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [7], t: Date.now() } }}>${t('Quiz me on Lecture 7', 'امتحنّي في محاضرة 7')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 7, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 7, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };

  // a small section heading inside a page
  function H3c({ t }) { return html`<h4 className="hf-h3 hf-in" style=${{ color: 'var(--ink)' }}>${t}</h4>`; }
})();

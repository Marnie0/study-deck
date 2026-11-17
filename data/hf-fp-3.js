// Head First chapter for File Processing Lecture 3 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Logical file organization: text and binary files, input and output files, the file of records (field, record), the three
// file structures (stream, field, record), the four field structures and their pros and cons, the three record structures and
// fixed vs variable-length records, primary and secondary keys, sequential search O(n) vs direct access O(1) with the RRN,
// seeking (Seek, fseek and its origins, seekg / seekp), and Quiz (3): copying a file with no loops and UpdateRecord by RRN.
// Every fact comes from the lecture's notes; analogies and practice numbers are marked as ours.
// Every number was counted by hand and checked with node: the book record is 5 + 7 + 25 = 37 bytes fixed (padding 0 + 0 + 6),
// 37 bytes with length indicators (2+5+2+7+2+19), 44 bytes as keyword=value (10+1+10+1+22), 34 bytes delimited (6+8+20);
// method 3 gives 33 (5+1+7+1+19) and 26 for the FOLK record (5+1+4+1+15); the stream example is 64 bytes;
// offsets: 4 × 37 = 148, 259 ÷ 37 = 7, 1000 ÷ 40 = 25 records (RRN 0–24), the last one starts at 1000 − 40 = 960 = 24 × 40.
(function () {
  const H = window.HF; H.chapters.fp = H.chapters.fp || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T3 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-fp3')) {
    const s = document.createElement('style'); s.id = 'hf-css-fp3';
    s.textContent = `
.hfb .hf-fp3-strip{ display:flex; justify-content:center; gap:2px; direction:ltr; position:relative; padding:4px 0 2px; }
.hfb .hf-fp3-strip span{ position:relative; width:17px; height:26px; display:inline-grid; place-items:center; font:700 14px/1 var(--mono); border:1.4px solid var(--hf-line); border-radius:3px; background:var(--paper); color:var(--ink); }
.hfb .hf-fp3-strip span.sp{ color:var(--graphite); font-weight:400; }
.hfb .hf-fp3-strip span.cut::after{ content:""; position:absolute; right:-3px; top:-5px; bottom:-5px; width:3px; border-radius:2px; background:var(--hf-red); }
.hfb .hf-fp3-strip-l{ text-align:center; font:600 13.5px/1.3 var(--body); color:var(--hf-red); margin:2px 0 0; min-height:1.3em; }
.hfb .hf-fp3-bytes{ font:600 13.5px/1.45 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:4px 8px; margin:0; color:var(--ink); white-space:pre-wrap; word-break:break-all; direction:ltr; text-align:left; }
.hfb .hf-fp3-bytes i{ font-style:normal; color:var(--graphite); }
.hfb .hf-fp3-bytes u{ text-decoration:none; color:var(--hf-k); font-weight:800; }
.hfb .hf-fp3-bytes s{ text-decoration:none; color:var(--hf-red); font-weight:800; }
.hfb .hf-fp3-lab{ font:800 13.5px/1.2 var(--body); margin:0 0 2px; color:var(--ink); }
.hfb .hf-fp3-lab small{ font-weight:500; color:var(--graphite); font-size:13px; }
.hfb .hf-fp3-bc{ display:grid; gap:4px; }
.hfb .hf-fp3-bc .rw{ display:grid; grid-template-columns:minmax(0,1fr) 58px; gap:3px 6px; align-items:end; }
.hfb .hf-fp3-bc .rw .hf-fp3-bytes{ grid-column:1 / -1; }
.hfb .hf-fp3-bc input{ height:30px; }
.hfb .hf-fp3-bc input{ width:58px; box-sizing:border-box; font:700 15px/1 var(--mono); padding:5px 4px; text-align:center; border:1.5px solid var(--hf-line); border-radius:6px; background:var(--paper); color:var(--ink); }
.hfb .hf-fp3-bc input.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hfb .hf-fp3-bc input.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hfb .hf-fp3-bc .wk{ grid-column:1 / -1; font:600 13px/1.3 var(--mono); color:var(--hf-hand); direction:ltr; text-align:left; margin:0; }
.hfb .hf-fp3-tb{ display:grid; gap:6px; }
.hfb .hf-fp3-tb .cd{ border:1.5px solid var(--hf-line); border-radius:7px; padding:5px 9px; background:var(--paper); }
.hfb .hf-fp3-tb .cd > b{ display:block; font:800 14.5px/1.2 var(--body); color:var(--hf-k); margin:0 0 2px; }
.hfb .hf-fp3-tb .cd p{ margin:0; font-size:14px; line-height:1.32; color:var(--ink); padding-left:18px; position:relative; }
.hfb .hf-fp3-tb .cd p::before{ position:absolute; left:0; top:0; font:800 15px/1.3 var(--mono); }
.hfb .hf-fp3-tb .cd p.pl::before{ content:"+"; color:var(--ok); }
.hfb .hf-fp3-tb .cd p.mn::before{ content:"−"; color:var(--hf-red); }
.hfb .hf-fp3-off{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-fp3-tabs{ display:flex; gap:5px; }
.hfb .hf-fp3-tabs button{ flex:1 1 0; min-width:0; padding:0 3px; font:800 13.5px/1.1 var(--body); min-height:34px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-fp3-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-fp3-tabs button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-fp3-tabs button.dn[aria-pressed="true"]{ background:var(--ok); color:var(--paper); }
.hfb .hf-fp3-rrn{ display:flex; gap:8px; align-items:center; justify-content:center; font:800 16px/1 var(--body); color:var(--ink); }
.hfb .hf-fp3-rrn .hf-btn{ min-width:40px; font-size:18px; padding:4px 0; }
.hfb .hf-fp3-rrn b{ font-family:var(--mono); color:var(--hf-k); font-size:20px; min-width:26px; text-align:center; }
.hfb .hf-fp3-recs{ display:flex; gap:3px; direction:ltr; }
.hfb .hf-fp3-recs span{ flex:1 1 0; min-width:0; height:30px; display:grid; place-items:center; font:700 13px/1 var(--mono); border:1.5px solid var(--hf-line); border-radius:4px; background:var(--paper); color:var(--ink); transition:background .3s, color .3s; }
.hfb .hf-fp3-recs span.sk{ background:var(--hf-grey2); color:var(--graphite); }
.hfb .hf-fp3-recs span.on{ background:var(--hf-k); border-color:var(--hf-k); color:#fff; }
.hfb .hf-fp3-recs.var span:nth-child(3n+1){ flex-grow:1.6; } .hfb .hf-fp3-recs.var span:nth-child(3n+2){ flex-grow:.7; }
.hfb .hf-fp3-out{ font:600 13.5px/1.55 var(--mono); background:var(--hf-grey); border-left:3px solid var(--hf-k); padding:5px 8px; color:var(--ink); direction:ltr; text-align:left; white-space:pre-wrap; word-break:break-word; min-height:68px; }
.hfb .hf-fp3-out b{ color:var(--hf-k); }
.hfb .hf-fp3-msg{ font-size:14px; line-height:1.36; margin:0; color:var(--ink); }
.hfb .hf-fp3-dr{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; grid-template-columns:minmax(0,1fr); gap:7px; }
.hfb .hf-fp3-ask{ font-size:14.5px; line-height:1.36; margin:0; color:var(--ink); }
.hfb .hf-fp3-ask code{ font-family:var(--mono); font-size:.88em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-fp3-opts{ display:grid; gap:5px; }
.hfb .hf-fp3-opts button{ text-align:left; font:600 13.5px/1.25 var(--body); min-height:34px; padding:5px 9px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-fp3-opts button code{ font:700 13.5px var(--mono); }
.hfb .hf-fp3-opts button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hfb .hf-fp3-opts button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hfb .hf-fp3-fb{ font-size:13.5px; line-height:1.34; margin:0; padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); color:var(--ink); }
.hfb .hf-fp3-fb.no{ border-left-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 8%, var(--paper)); }
.hfb .hf-fp3-fb .ltr, .hfb .hf-fp3-fb code{ font-family:var(--mono); }
.hfb .hf-fp3-bs code{ word-break:break-all; font-family:var(--mono); font-size:13px; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hf-ar .hf-fp3-strip-l, .hf-ar .hf-fp3-lab, .hf-ar .hf-fp3-tb .cd > b, .hf-ar .hf-fp3-tabs button, .hf-ar .hf-fp3-rrn{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-fp3-tb .cd p, .hf-ar .hf-fp3-msg, .hf-ar .hf-fp3-ask, .hf-ar .hf-fp3-fb, .hf-ar .hf-fp3-opts button{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-fp3-tb .cd p{ padding-left:0; padding-right:18px; } .hf-ar .hf-fp3-tb .cd p::before{ left:auto; right:0; }
.hf-ar .hf-fp3-opts button{ text-align:right; }
.hf-ar .hf-fp3-opts button.mono{ text-align:left; direction:ltr; }
.hf-ar .hf-fp3-fb{ border-left:0; border-right:3px solid var(--ok); } .hf-ar .hf-fp3-fb.no{ border-right-color:var(--hf-red); }
.hf-ar .hf-fp3-bytes{ border-left:3px solid var(--hf-k); }
@media (prefers-reduced-motion: reduce){ .hfb .hf-fp3-recs span{ transition:none; } }
`;
    document.head.appendChild(s);
  }

  // the opener's picture: the stream file's first bytes, and a red cut that keeps guessing where a field might end
  function Strip() {
    const ar = useAr();
    const src = 'AmesMary123 Maple';
    const guesses = [3, 7, 10, 1, 5, 11];
    const [g, setG] = useState(0);
    useEffect(() => { if (calm()) return; const id = setInterval(() => setG(x => (x + 1) % guesses.length), 1300); return () => clearInterval(id); }, []);
    const cut = calm() ? -1 : guesses[g];
    return html`<div className="hf-in" aria-label="The bytes AmesMary123 Maple with nothing that marks where a field ends">
      <div className="hf-fp3-strip">${[...src].map((c, k) => html`<span key=${k} className=${(c === ' ' ? 'sp' : '') + (k === cut ? ' cut' : '')}>${c === ' ' ? '·' : c}</span>`)}</div>
      <p className="hf-fp3-strip-l">${ar ? 'هل فيه field بيخلص هنا؟ الـ bytes مبتقولش.' : 'Does a field end here? The bytes don\'t say.'}</p>
    </div>`;
  }

  // Sharpen your pencil: count the bytes of the book record in each of the four field structures
  const BC = [
    { k: 'fx', en: 'Fixed length (5, 7, 25)', ar: 'الـ Fixed length (5 و 7 و 25)', b: '87359CARROLLALICE IN WONDERLAND<i>······</i>', n: 37, w: '5 + 7 + 25 = 37' },
    { k: 'li', en: 'Length indicator', ar: 'الـ Length indicator', b: '<u>05</u>87359<u>07</u>CARROLL<u>19</u>ALICE IN WONDERLAND', n: 37, w: '2+5 + 2+7 + 2+19 = 37' },
    { k: 'kw', en: 'keyword = value', ar: 'الـ <bdi dir="ltr">keyword = value</bdi>', b: '<u>ISBN=</u>87359 <u>AU=</u>CARROLL <u>TI=</u>ALICE IN WONDERLAND', n: 44, w: '10 + 1 + 10 + 1 + 22 = 44' },
    { k: 'de', en: 'Delimiter', ar: 'الـ Delimiter', b: '87359<s>|</s>CARROLL<s>|</s>ALICE IN WONDERLAND<s>|</s>', n: 34, w: '6 + 8 + 20 = 34' }
  ];
  function ByteCount({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const [shown, setShown] = H.K.useSlot(id + ':s', false);
    const right = BC.filter(r => +v[r.k] === r.n).length;
    return html`<div className="hf-fp3-bc hf-in">
      ${BC.map(r => { const st = chk && v[r.k] != null && v[r.k] !== '' ? (+v[r.k] === r.n ? ' ok' : ' no') : '';
        return html`<div key=${r.k} className="rw">
          <p className="hf-fp3-lab">${T3(ar ? r.ar : r.en)}</p>
          <input type="text" inputMode="numeric" maxLength="3" className=${st.trim()} aria-label=${(ar ? 'عدد الـ bytes: ' : 'Bytes: ') + r.en} value=${v[r.k] == null ? '' : v[r.k]}
            onInput=${e => { setChk(false); setV(Object.assign({}, v, { [r.k]: e.target.value.replace(/[^0-9]/g, '') })); }} />
          <p className="hf-fp3-bytes">${T3(r.b)}</p>
          ${shown && html`<p className="wk">${r.w}</p>`}
        </div>`; })}
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.values(v).some(x => x)} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const a = {}; BC.forEach(r => { a[r.k] = String(r.n); }); setV(a); setChk(true); setShown(true); }}>${ar ? 'ورّيني الحسبة' : 'Show the working'}</button>
        ${chk && html`<span className="hf-score">${ar ? html`<bdi>${right} / 4</bdi> صح` : right + ' / 4 right'}</span>`}
      </div>
    </div>`;
  }

  // a pros-and-cons table drawn as cards (one card per structure)
  function Cards({ rows }) {
    return html`<div className="hf-fp3-tb hf-in">${rows.map((r, i) => html`<div key=${i} className="cd"><b>${T3(r[0])}</b><p className="pl">${T3(r[1])}</p><p className="mn">${T3(r[2])}</p></div>`)}</div>`;
  }

  // the RRN → byte offset calculator: pick a record size, step the RRN, see the offset and the seek calls that get there
  function Offset() {
    const ar = useAr();
    const [m, setM] = H.K.useSlot('off:m', '37');
    const [rrn, setRrn] = H.K.useSlot('off:r', 3);
    const size = m === '40' ? 40 : 37, fixed = m !== 'var', off = rrn * size;
    return html`<div className="hf-fp3-off hf-in">
      <div className="hf-fp3-tabs" role="group" aria-label=${ar ? 'حجم الـ record' : 'Record size'}>
        ${[['37', html`<bdi dir="ltr">37 B (5+7+25)</bdi>`], ['40', html`<bdi dir="ltr">40 B</bdi>`], ['var', ar ? 'الـ variable' : 'variable']].map(([k, l]) => html`<button key=${k} aria-pressed=${String(m === k)} onClick=${() => setM(k)}>${l}</button>`)}
      </div>
      <div className="hf-fp3-rrn" dir="ltr"><button className="hf-btn" onClick=${() => setRrn(Math.max(0, rrn - 1))} disabled=${rrn <= 0} aria-label="RRN − 1">−</button><span>RRN</span><b>${rrn}</b><button className="hf-btn" onClick=${() => setRrn(Math.min(9, rrn + 1))} disabled=${rrn >= 9} aria-label="RRN + 1">+</button></div>
      <div className=${'hf-fp3-recs' + (fixed ? '' : ' var')} aria-label="Records 0 to 9">${Array.from({ length: 10 }, (_, r) => html`<span key=${r} className=${r === rrn ? 'on' : r < rrn ? 'sk' : ''}>${r}</span>`)}</div>
      ${fixed ? html`<div className="hf-fp3-out">offset = RRN × size = ${rrn} × ${size} = <b>${off}</b>${'\n'}fseek(fp, ${off}L, 0);${'\n'}file.seekg(${rrn} * ${size}, ios::beg);</div>`
        : html`<p className="hf-fp3-msg">${T3(ar ? 'الـ records أحجامها <b>مختلفة</b>، فمفيش <bdi dir="ltr">RRN × size</bdi>. عشان توصل للـ RRN ' + rrn + ' لازم تقرا الـ length indicator بتاع كل record قبله (' + rrn + ' records)، أو تستخدم <b>index file</b>.'
          : 'Records have <b>different sizes</b>, so there is no RRN × size. To reach RRN ' + rrn + ' you must read the length indicator of every record before it (' + rrn + ' of them), or use an <b>index file</b>.')}</p>`}
    </div>`;
  }

  // Be the calculator: five offset questions; every wrong option is a real mistake
  const DR = [
    { en: 'Fixed-length records of <b>37 bytes</b> (5 + 7 + 25). Byte offset of <b>RRN 4</b>?', ar: 'الـ records ثابتة، وحجم كل واحد <b>37 byte</b> يعني <bdi dir="ltr">5 + 7 + 25</bdi>. كام الـ byte offset بتاع <b>الـ RRN 4</b>؟',
      o: ['148', '185', '41', '4'], a: 0, w: ['4 × 37 = 148', 'الحسبة:<span class="ltr">4 × 37 = 148</span>'],
      h: [null, ['185 = 5 × 37: that counts RRNs from 1. The first record is RRN 0.', 'الـ 185 دي <bdi dir="ltr">5 × 37</bdi>، يعني عدّيت من 1. أول record الـ RRN بتاعه 0.'], ['41 = 4 + 37 adds. Offset = RRN × record size.', 'الـ 41 دي <bdi dir="ltr">4 + 37</bdi>، يعني جمعت بدل ما تضرب.'], ['4 is the RRN itself, not a byte offset.', 'الـ 4 ده الـ RRN نفسه، مش الـ byte offset.']] },
    { en: 'Same file. The pointer stands at <b>byte 259</b>, the start of a record. Which RRN is it?', ar: 'نفس الـ file. الـ pointer واقف عند <b>الـ byte رقم 259</b>، في أول record. ده الـ RRN كام؟',
      o: ['7', '8', '6'], a: 0, w: ['259 ÷ 37 = 7', 'الحسبة:<span class="ltr">259 ÷ 37 = 7</span>'],
      h: [null, ['Counting from 1 again: it is the 8th record, but its RRN is 7.', 'عدّيت من 1 تاني: ده الـ record التامن، بس الـ RRN بتاعه 7.'], ['RRN 6 starts at 6 × 37 = 222.', 'الـ RRN 6 بيبدأ عند <bdi dir="ltr">6 × 37 = 222</bdi>.']] },
    { en: 'A file of <b>40-byte</b> records. <code>seekg</code> to the end, and <code>tellg</code> says <b>1000</b>. How many records, and what is the last RRN?', ar: 'عندنا file فيه records كل واحد <b>40 byte</b>. عملنا <code>seekg</code> للآخر، والـ <code>tellg</code> قال <b>1000</b>. فيه كام record، وآخر RRN كام؟',
      o: [['25 records, last RRN 24', 'فيه 25 record، وآخر RRN هو 24'], ['25 records, last RRN 25', 'فيه 25 record، وآخر RRN هو 25'], ['40,000 records', 'فيه 40,000 record']], a: 0, w: ['1000 ÷ 40 = 25 records: RRN 0 … 24', 'الحسبة:<span class="ltr">1000 ÷ 40 = 25 records: RRN 0 … 24</span>'],
      h: [null, ['RRNs start at 0, so 25 records are RRN 0 to 24.', 'الـ RRNs بتبدأ من 0، فالـ 25 record أرقامهم من 0 لـ 24.'], ['1000 × 40 multiplies. Records = file size ÷ record size.', 'ده ضرب بدل القسمة. عدد الـ records هو حجم الـ file مقسوم على حجم الـ record.']] },
    { en: 'Same 40-byte file. Which call puts the pointer at the start of the <b>last</b> record?', ar: 'نفس الـ file. أنهي call بتحط الـ pointer في أول <b>آخر</b> record؟', mono: true,
      o: ['fseek(fp, -40L, 2)', 'fseek(fp, 40L, 2)', 'fseek(fp, -40L, 1)', 'fseek(fp, -40L, 0)'], a: 0,
      w: ['origin 2 = end; 1000 − 40 = byte 960 = 24 × 40', 'الـ origin 2 هو النهاية:<span class="ltr">1000 − 40 = 960 = 24 × 40</span>'],
      h: [null, ['A positive offset from the end goes 40 bytes past the end of the file.', 'الـ offset الموجب من النهاية بيروح 40 byte بعد آخر الـ file.'], ['Origin 1 is the current position, not the end: this goes back 40 bytes from wherever the pointer is.', 'الـ origin 1 هو المكان الحالي مش النهاية، فده بيرجع 40 byte من مكان الـ pointer أيًّا كان.'], ['Origin 0 is the beginning: 40 bytes before the start is not in the file.', 'الـ origin 0 هو البداية، و40 byte قبل البداية مش جوه الـ file أصلًا.']] },
    { en: 'Records that each <b>begin with a length indicator</b> (method 3). Byte offset of <b>RRN 2</b>?', ar: 'عندنا records كل واحد فيهم <b>بيبدأ بـ length indicator</b> (الطريقة 3). الـ byte offset بتاع <b>الـ RRN 2</b> كام؟',
      o: [['2 × 33 = 66', '<bdi dir="ltr">2 × 33 = 66</bdi>'], ['It cannot be computed: read the lengths before it, or use an index file', 'مينفعش يتحسب: لازم تقرا الأطوال اللي قبله، أو تستخدم index file'], ['2', '2']], a: 1,
      w: ['Variable-length records: no RRN × size. You cannot jump to the i-th record unless through an index file.', 'الـ variable-length records مفيهاش RRN × size، ومتقدرش تنط للـ record رقم i إلا عن طريق index file.'],
      h: [['33 is the size of the CARROLL record only; the other records have other sizes.', 'الـ 33 ده حجم record الـ CARROLL بس، والـ records التانية أحجامها مختلفة.'], null, ['2 is the RRN, not a byte offset.', 'الـ 2 ده الـ RRN، مش الـ byte offset.']] }
  ];
  function Drill({ id }) {
    const ar = useAr();
    const [p, setP] = H.K.useSlot(id + ':p', 0);
    const picks = DR.map((_, k) => H.K.useSlot(id + ':' + k, null));
    const [pick, setPick] = picks[p];
    const q = DR[p], L = x => Array.isArray(x) ? (ar ? x[1] : x[0]) : x;
    const done = pick === q.a;
    return html`<div className="hf-fp3-dr hf-in">
      <div className="hf-fp3-tabs" role="group" aria-label=${ar ? 'الأسئلة' : 'Questions'}>${DR.map((_, k) => html`<button key=${k} className=${picks[k][0] === DR[k].a ? 'dn' : ''} aria-pressed=${String(p === k)} onClick=${() => setP(k)}>${k + 1}</button>`)}</div>
      <p className="hf-fp3-ask">${T3(ar ? q.ar : q.en)}</p>
      <div className="hf-fp3-opts">${q.o.map((o, j) => html`<button key=${j} className=${(q.mono ? 'mono ' : '') + (pick == null ? '' : j === q.a && done ? 'ok' : j === pick ? 'no' : '')} onClick=${() => !done && setPick(j)}>${q.mono ? html`<code>${o}</code>` : T3(L(o))}${done && j === q.a ? ' ✓' : ''}</button>`)}</div>
      ${pick != null && (done ? html`<p className="hf-fp3-fb">${T3(L(q.w))}</p>` : html`<p className="hf-fp3-fb no">${T3(L(q.h[pick]))}</p>`)}
      <div className="hf-row">
        <button className="hf-btn" onClick=${() => setPick(q.a)}>${ar ? 'ورّيني الإجابة' : 'Show me'}</button>
        ${pick != null && !done && html`<button className="hf-btn" onClick=${() => setPick(null)}>${ar ? 'جرّب تاني' : 'Try again'}</button>`}
        ${p < DR.length - 1 && html`<button className="hf-btn solid" onClick=${() => setP(p + 1)}>${ar ? 'السؤال الجاي' : 'Next question'}</button>`}
      </div>
    </div>`;
  }

  H.chapters.fp[3] = {
    title: 'Logical File Organization: Fields and Records',
    kicker: 'Chapter 3',
    run: 'fields and records',
    ar: { title: 'الـ Fields والـ Records: التنظيم الـ logical للـ files', kicker: 'الفصل 3', run: 'الـ fields والـ records' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Reveal, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 3);
      const arL = (window.AR && window.AR.fp && window.AR.fp.lectures && window.AR.fp.lectures[3]) || {};
      const arQuiz = arL.quiz || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' own questions (src set), with the site's Egyptian Arabic "why" for each choice
      const q = re => { const i = lec.quiz.findIndex(x => re.test(strip(x.q)) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const bytes = s => html`<p className="hf-fp3-bytes hf-in">${T(s)}</p>`;
      return [
        // 0 · where we left off + how this chapter works
        page(html`
          <${H2}>${t('Where we left off', 'وقفنا فين؟')}</${H2}>
          <${P} small=${true}>${X('Last chapter was the <b>physical</b> side: the hard disk, its tracks and sectors, and how long it takes to reach your data. But whatever it reads, the disk hands you one thing: <b>bytes</b>.',
            'الفصل اللي فات كان عن الجانب الـ <b>physical</b>: الـ hard disk والـ tracks والـ sectors بتوعه، والوقت اللي بياخده عشان يوصل للداتا. بس مهما قرا، الـ disk بيديك حاجة واحدة: <b>bytes</b>.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('You saved a name, an address and a city, one after another. The disk gives you back 64 bytes in a row. Where does the name stop and the address start? How would your program know?',
            'إنت حفظت اسم وعنوان ومدينة ورا بعض. الـ disk رجّعلك 64 byte لازقين في بعض. الاسم بيخلص فين والعنوان بيبدأ فين؟ والبرنامج بتاعك هيعرف إزاي؟')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will count bytes and compute offsets yourself.', '<b>حل التمارين.</b> هتعد bytes وتحسب offsets بإيدك.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps, from the doctors\' papers.', '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and practice numbers.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي تشبيهات وأرقام تدريب مننا.')}</span></div>
          </div>
        `, { sec: t('Where we left off', 'وقفنا فين؟') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">3</span><span className="t">${A ? html`الفصل التالت<br/>File Processing` : html`Chapter three<br/>File Processing`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Where Does Mary End?', 'ماري بتخلص فين؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('logical file organization: fields and records', 'التنظيم الـ logical: الـ fields والـ records')}</p></div>
          <${Strip} />
          <${Talk} who="disk">${X('I store bytes. What they <i>mean</i> is your problem.', 'أنا بخزّن bytes وبس. معناها إيه دي مشكلتك إنت.')}</${Talk}>
          <${Talk} who="dev" flip=${true}>${X('Then I need to <b>add some structure</b>, so I can find my fields and records again.', 'يبقى لازم <b>أضيف structure</b>، عشان ألاقي الـ fields والـ records بتوعي تاني.')}</${Talk}>
          <${P} small=${true}>${X('That is this chapter: the <b>logical</b> view of a file, and the ways to keep fields and records apart.', 'وده الفصل ده: الـ <b>logical</b> view بتاع الـ file، والطرق اللي بنفصل بيها الـ fields والـ records عن بعض.')}</${P}>
        `, { sec: t('Meet the logical view', 'اتعرّف على الـ logical view') }),

        // 2 · text vs binary, input vs output
        page(html`
          <${H1}>${t('Two kinds of file, two directions', 'نوعين files، واتجاهين')}</${H1}>
          <${Def}>${X('A <b>text file</b> is a sequence of <b>characters</b> (for example C source code). You can view it in a text editor.', 'الـ <b>text file</b> سلسلة من الـ <b>characters</b> (زي الـ source code بتاع C)، وتقدر تشوفه في أي text editor.')}</${Def}>
          <${Def}>${X('A <b>binary file</b> is a sequence of <b>bytes</b> (for example a movie or music). It needs a specialized program.', 'الـ <b>binary file</b> سلسلة من الـ <b>bytes</b> (زي فيلم أو مزيكا)، ومحتاج برنامج مخصوص.')}</${Def}>
          <${P}>${X('And from the program\'s side, a file is either an <b>input</b> file (the program <b>reads</b> it) or an <b>output</b> file (the program <b>writes</b> it).',
            'ومن ناحية البرنامج، الـ file يا إما <b>input</b> file (البرنامج <b>بيقرا</b> منه) يا إما <b>output</b> file (البرنامج <b>بيكتب</b> فيه).')}</${P}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Open an MP3 song in Notepad. What do you see, and why? Which kind of file is it?', 'افتح أغنية MP3 في الـ Notepad. هتشوف إيه، وليه؟ وده أنهي نوع file؟')}</p></${Box}>
          <${Hand} red=${true}>${t('in the copy program later, the input file is read and the output file is written', 'في برنامج النسخ اللي جاي، الـ input file بيتقري والـ output file بيتكتب فيه')}</${Hand}>
        `, { sec: t('Files and records', 'الـ Files والـ records') }),

        // 3 · file of records
        page(html`
          <${H1}>${t('A file of records', 'الـ file عبارة عن records')}</${H1}>
          <${P}>${X('In the <b>logical view</b>, the data in a file is a <b>collection of records</b>.', 'في الـ <b>logical view</b>، الداتا اللي في الـ file عبارة عن <b>مجموعة records</b>.')}</${P}>
          <${Def}>${X('A <b>record</b> is a group of fields forming a logical unit.', 'الـ <b>record</b> مجموعة fields بتكوّن وحدة logical واحدة.')}</${Def}>
          <${Def}>${X('A <b>field</b> is a data value: the <b>smallest unit of data with logical meaning</b>. Fields have <b>names, types, lengths and values</b>.',
            'الـ <b>field</b> قيمة داتا، وهو <b>أصغر وحدة داتا ليها معنى logical</b>. والـ fields ليها <b>أسماء وأنواع (types) وأطوال وقيم</b>.')}</${Def}>
          <${Talk} who="table">${X('Me? I\'m one record: a book. My fields are <b>ISBN</b>, <b>AU</b> (author) and <b>TI</b> (title).', 'أنا؟ أنا record واحد: كتاب. والـ fields بتوعي هم الـ <b>ISBN</b> والـ <b>AU</b> (المؤلف) والـ <b>TI</b> (العنوان).')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('There are <b>three file structures</b>: <b>stream</b>, <b>field</b> and <b>record</b> structures. Not "text, binary and stream": text and binary are kinds of file.',
            'فيه <b>3 file structures</b>: الـ <b>stream</b> والـ <b>field</b> والـ <b>record</b> structures. مش "text وbinary وstream"، لأن الـ text والـ binary دول أنواع files.')}</p></${Box}>
        `),
        page(html`
          <${H2}>${t('File → records → fields', 'الـ File ← الـ records ← الـ fields')}</${H2}>
          <${Fig} name="fp-file-records" />
        `),

        // 5 · stream files
        page(html`
          <${H1}>${t('Structure 1: the stream file', 'الـ structure الأول: الـ stream file')}</${H1}>
          <${P}>${X('The simplest way: write the information as a <b>stream of bytes containing no added information</b>. Here is the notes\' example:', 'أبسط طريقة: نكتب المعلومات كـ <b>stream من الـ bytes من غير أي معلومات زيادة</b>. ده مثال الـ notes:')}</${P}>
          ${bytes('AmesMary123 MapleStillwaterOK74075MasonAlan90 EastgateAdaOK74820')}
          <${Talk} who="dev">${X('I can see two people in there… I think.', 'أنا شايف اتنين أشخاص جوه الكلام ده… تقريبًا.')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X('You <i>think</i>. I see 64 bytes and not one sign of where a field or a record ends.', 'إنت <i>بتخمّن</i>. أنا شايف 64 byte ومفيش ولا علامة الـ field أو الـ record بيخلص فين.')}</${Talk}>
          <${Box} kind="watch"><p className="hf-p small">${X('<b>The problem</b>: there is <b>no way to get the information back</b> in the organized record format.', '<b>المشكلة</b>: <b>مفيش أي طريقة نرجّع بيها المعلومات</b> بشكل الـ record المنظم.')}</p></${Box}>
        `, { sec: t('Stream files', 'الـ Stream files') }),
        page(html`
          <${H2}>${t('64 bytes, no borders', '64 byte، من غير حدود')}</${H2}>
          <${Fig} name="fp-stream-file" />
        `),

        // 7 · interview: the stream file
        page(html`
          <${Interview} title=${t('The Stream File, exposed', 'الـ Stream File على المكشوف')} sub=${t("This week's interview: a file that forgot to leave notes.", 'حوار الأسبوع: file نسي يسيب أي علامات.')} lines=${A ? [
            ['المذيع', 'إنت أبسط file في الدنيا؟'],
            ['الـ Stream File', 'أبسط واحد! بكتب المعلومات <b>stream من الـ bytes</b> ومبضيفش حاجة: لا أطوال، ولا delimiters، ولا keywords.'],
            ['المذيع', 'طب إيه اللي جواك ده؟'],
            ['الـ Stream File', 'عناوين اتنين أشخاص تقريبًا. Ames وMary، وبعدين Mason وAlan…'],
            ['المذيع', 'تقريبًا؟!'],
            ['الـ Stream File', 'دي مشكلتي: <b>مفيش طريقة أرجّع بيها المعلومات بشكل الـ record المنظم</b>. حتى أنا مش عارف الـ field بيخلص فين.'],
            ['المذيع', 'ومين يقدر يصلّحك؟'],
            ['الـ Stream File', 'الـ <b>field structures</b>. هي بتضيف المعلومات اللي أنا مبضيفهاش.']
          ] : [
            ['Head First', 'You\'re the simplest file there is?'],
            ['Stream File', 'The simplest! I write the information as a <b>stream of bytes</b> and add nothing: no lengths, no delimiters, no keywords.'],
            ['Head First', 'So what\'s inside you?'],
            ['Stream File', 'Two people\'s addresses, I think. Ames, Mary, and then Mason, Alan…'],
            ['Head First', 'You <i>think</i>?'],
            ['Stream File', 'That\'s my problem: <b>there is no way to get the information back in the organized record format</b>. Even I can\'t tell where a field ends.'],
            ['Head First', 'Who can fix you?'],
            ['Stream File', 'The <b>field structures</b>. They add the information I leave out.']
          ]} />
          <${Grow} />
          <${Talk} who="disk" flip=${true}>${t('Don\'t look at me. I just stored what you gave me.', 'متبصليش كده. أنا خزّنت اللي إنت اديتهولي.')}</${Talk}>
        `),

        // 8 · the doctors' stream question
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('The definition, word for word: <i>"a stream of bytes containing <b>no added information</b>"</i>. Added information (lengths, delimiters, keywords) is exactly what the field structures bring.',
            'التعريف بالحرف:<span class="ltr">"a stream of bytes containing <b>no added information</b>"</span>والمعلومات الزيادة (الأطوال والـ delimiters والـ keywords) هي بالظبط اللي الـ field structures بتجيبه.')}</p></${Box}>
          ${mq('m-stream', /stream of bytes containing/i)}
        `),

        // 9 · the four field structures
        page(html`
          <${H1}>${t('Structure 2: four ways to mark a field', 'الـ structure التاني: 4 طرق نعلّم بيها الـ field')}</${H1}>
          <${P} small=${true}>${X('One book record, four ways to keep its fields apart. Watch what each one <b>adds</b>:', 'record كتاب واحد، و4 طرق نفصل بيها الـ fields بتاعته. بص كل طريقة <b>بتضيف</b> إيه:')}</${P}>
          <p className="hf-fp3-lab hf-in">${t('1. Fixed length', '1. الـ Fixed length')} <small>${A ? html`(الأطوال <bdi dir="ltr">5, 7, 25</bdi>)` : '(lengths 5, 7, 25)'}</small></p>
          ${bytes('87358CARROLLALICE IN WONDERLAND<i>······</i>\n03818FOLK<i>···</i>FILE STRUCTURES<i>··········</i>')}
          <p className="hf-fp3-lab hf-in">${t('2. Length indicator at the start of each field', '2. الـ Length indicator في أول كل field')}</p>
          ${bytes('<u>05</u>87359<u>07</u>CARROLL<u>19</u>ALICE IN WONDERLAND')}
          <p className="hf-fp3-lab hf-in">${A ? html`3. الـ <bdi dir="ltr">keyword = value</bdi>` : '3. keyword = value'}</p>
          ${bytes('<u>ISBN=</u>87359 <u>AU=</u>CARROLL <u>TI=</u>ALICE IN WONDERLAND')}
          <p className="hf-fp3-lab hf-in">${t('4. Delimiter at the end of each field', '4. الـ Delimiter في آخر كل field')}</p>
          ${bytes('87359<s>|</s>CARROLL<s>|</s>ALICE IN WONDERLAND<s>|</s>')}
          <${Hand}>${X('· = a padding blank. The slide\'s fixed example prints the ISBN as 87358; the others say 87359.', 'النقطة · معناها blank للـ padding. ومثال الـ fixed في السلايد كاتب الـ ISBN على إنه 87358، والباقيين 87359.')}</${Hand}>
        `, { sec: t('Field structures', 'الـ Field structures') }),
        page(html`
          <${Fig} name="fp-field-structs" />
        `),

        // 10 · fixed and length indicator, in detail
        page(html`
          <${H2}>${t('Fixed length: count, don\'t look', 'الـ Fixed length: عِد ومتبصّش')}</${H2}>
          <${P} small=${true}>${X('Every field has a set size, so the reader just <b>counts bytes</b>. <b>Easy to read and store.</b> But <code>FOLK</code> in a 7-byte field leaves 3 bytes empty: it <b>wastes space with padding</b>.',
            'كل field ليه حجم ثابت، فالـ reader <b>بيعد bytes</b> وبس. <b>سهل في القراية والتخزين.</b> بس <code>FOLK</code> في field حجمه 7 بيسيب 3 bytes فاضيين، يعني <b>بيضيّع مساحة في الـ padding</b>.')}</${P}>
          <${H2}>${t('Length indicator: read the number, then jump', 'الـ Length indicator: اقرا الرقم ونُط')}</${H2}>
          <${P} small=${true}>${X('Each field starts with its length: <code>05</code> then 5 bytes, <code>07</code> then 7, <code>19</code> then 19. <b>Easy to jump ahead to the end of the field.</b> The catch: <b>long fields need more than 1 byte to store the length</b> (max size &gt; 256).',
            'كل field بيبدأ بطوله: <code>05</code> وبعدها 5 bytes، و<code>07</code> وبعدها 7، و<code>19</code> وبعدها 19. <b>سهل تنط لآخر الـ field على طول.</b> العيب: <b>الـ fields الطويلة محتاجة أكتر من byte عشان تخزّن الطول</b> (لما الـ max size يبقى <bdi dir="ltr">&gt; 256</bdi>).')}</${P}>
          <${Grow} />
          <${Dumb} qa=${A ? [['ليه byte واحد ميكفيش الطول؟', 'الـ byte الواحد بيشيل 256 قيمة بس (من 0 لـ 255)، فالـ field اللي أطول من كده طوله مش هيدخل في byte واحد.']]
            : [['Why can\'t one byte hold the length?', 'One byte holds only 256 different values (0 to 255), so a longer field\'s length won\'t fit in it.']]} />
        `),

        // 11 · keyword and delimiter, in detail
        page(html`
          <${H2}>${A ? html`الـ <bdi dir="ltr">keyword = value</bdi>: كل field بيقول اسمه` : 'keyword = value: every field says its name'}</${H2}>
          <${P} small=${true}>${X('<code>ISBN=87359 AU=CARROLL …</code> Fields are <b>self-describing</b>, so a field with no value can simply be left out: it <b>allows missing fields</b>. The price: it <b>wastes space with keywords</b>.',
            'في <code>ISBN=87359 AU=CARROLL …</code> الـ fields <b>بتوصف نفسها (self-describing)</b>، فالـ field اللي ملوش قيمة ممكن ببساطة يتشال، يعني <b>بيسمح إن fields تبقى ناقصة</b>. التمن: <b>الـ keywords بتضيّع مساحة</b>.')}</${P}>
          <${H2}>${t('Delimiter: look at every byte', 'الـ Delimiter: بُص على كل byte')}</${H2}>
          <${P} small=${true}>${X('<code>87359|CARROLL|…|</code> No padding and no length bytes, so it <b>may waste less space</b> than length-based fields. But the reader <b>must check every byte of the field against the delimiter</b> to find where it ends.',
            'في <code>87359|CARROLL|…|</code> مفيش padding ولا bytes للطول، فـ <b>ممكن يضيّع مساحة أقل</b> من الـ fields اللي بالطول. بس الـ reader <b>لازم يشيك كل byte في الـ field ويقارنه بالـ delimiter</b> عشان يعرف الـ field بيخلص فين.')}</${P}>
          <${Grow} />
          <${Talk} who="cpu">${X('Delimited? Is this <code>|</code>? No. Is this <code>|</code>? No. Is this…', 'الـ delimited؟ ده <code>|</code>؟ لأ. وده <code>|</code>؟ لأ. وده…')}</${Talk}>
        `),

        // 12 · count the bytes
        page(html`
          <${Box} kind="pencil" title=${t('Count the bytes', 'عِد الـ bytes')}><p className="hf-p small">${X('Bytes in the CARROLL record, per structure? Spaces count; · is padding.',
            'الـ record بتاع CARROLL بياخد كام byte في كل structure؟ المسافات بتتعد، والنقطة · padding.')}</p></${Box}>
          <${ByteCount} id="bc" />
        `, { sec: t('Exercises: fields', 'تمارين: الـ fields') }),

        // 13 · pros and cons
        page(html`
          <${H2}>${t('The field structures table', 'جدول الـ field structures')}</${H2}>
          <${Cards} rows=${A ? [
            ['الـ Fixed', 'سهل في القراية والتخزين', 'بيضيّع مساحة في الـ padding'],
            ['الـ Length indicator', 'سهل تنط لآخر الـ field', 'الـ fields الطويلة محتاجة أكتر من byte للطول (الـ max size <bdi dir="ltr">&gt; 256</bdi>)'],
            ['الـ Delimited', 'ممكن يضيّع مساحة أقل من الـ length-based', 'لازم تشيك كل byte في الـ field وتقارنه بالـ delimiter'],
            ['الـ Keyword', 'الـ fields بتوصف نفسها، وبيسمح بـ fields ناقصة', 'بيضيّع مساحة في الـ keywords']
          ] : [
            ['Fixed', 'Easy to read/store', 'Wastes space with padding'],
            ['Length indicator', 'Easy to jump ahead to the end of the field', 'Long fields need more than 1 byte to store the length (max size &gt; 256)'],
            ['Delimited', 'May waste less space than length-based', 'Must check every byte of the field against the delimiter'],
            ['Keyword', 'Fields are self-describing; allows missing fields', 'Wastes space with keywords']
          ]} />
        `),

        // 14 · sort pros and cons
        page(html`
          <${Box} kind="pencil" title=${t('Whose is it?', 'دي بتاعة مين؟')}><p className="hf-p small">${X('Each line is an advantage or a disadvantage. Tap <b>F</b> fixed, <b>L</b> length indicator, <b>K</b> keyword or <b>D</b> delimiter.',
            'كل سطر ميزة أو عيب. دوس <b>F</b> للـ fixed، أو <b>L</b> للـ length indicator، أو <b>K</b> للـ keyword، أو <b>D</b> للـ delimiter.')}</p></${Box}>
          <${Sort} id="pc" bins=${A ? [['F', 'الـ fixed'], ['L', 'الـ length indicator'], ['K', 'الـ keyword'], ['D', 'الـ delimiter']] : [['F', 'Fixed'], ['L', 'Length indicator'], ['K', 'Keyword'], ['D', 'Delimiter']]} items=${A ? [
            ['سهل في القراية والتخزين', 0],
            ['بيضيّع مساحة في الـ padding', 0],
            ['سهل تنط لآخر الـ field', 1],
            ['الـ fields الطويلة محتاجة أكتر من byte للطول', 1],
            ['الـ fields بتوصف نفسها', 2],
            ['بيضيّع مساحة في الـ keywords', 2],
            ['ممكن يضيّع مساحة أقل من الـ length-based', 3],
            ['لازم تشيك كل byte وتقارنه بالـ delimiter', 3]
          ] : [
            ['Easy to read and store', 0],
            ['Wastes space with padding', 0],
            ['Easy to jump ahead to the end of the field', 1],
            ['Long fields need more than 1 byte for the length', 1],
            ['Fields are self-describing', 2],
            ['Wastes space with keywords', 2],
            ['May waste less space than length-based', 3],
            ['Must check every byte against the delimiter', 3]
          ]} />
        `),

        // 15 · watch it: the doctors' phrasing
        page(html`
          <${Box} kind="watch" title=${t('Watch it: "it\'s advantage of ...."', 'خلّي بالك: "it\'s advantage of ...."')}>
            <p className="hf-p small">${X('This year\'s midterm gave one line of the table and asked whose it is. Four questions, four structures, and the options are always the same four:',
              'ميدترم السنة دي جاب سطر واحد من الجدول وسأل ده بتاع مين. 4 أسئلة لـ 4 structures، والاختيارات هي هي الأربعة:')}</p>
            <ul className="hf-ul" style=${{ marginTop: '4px' }}>${(A ? [
              'الـ <b>padding</b> ده عيب الـ <b>fixed</b>.',
              'الـ <b>jump ahead to the end</b> دي ميزة الـ <b>length indicator</b>.',
              'الـ <b>self describing</b> والـ <b>missing fields</b> دول ميزة الـ <b>keyword</b>.',
              'الـ <b>check every byte</b> ده عيب الـ <b>delimiter</b>.'
            ] : [
              '<b>Padding</b> → disadvantage of <b>fixed</b>.',
              '<b>Jump ahead to the end</b> → advantage of <b>length indicator</b>.',
              '<b>Self describing, missing fields</b> → advantage of <b>keyword</b>.',
              '<b>Check every byte</b> → disadvantage of <b>delimiter</b>.'
            ]).map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>
          <${Dumb} qa=${A ? [
            ['يعني الـ delimiter على طول أصغر؟', 'الجدول بيقول <b>ممكن</b> يضيّع مساحة أقل. في الـ CARROLL record طلع 34 byte قصاد 37، بس ده مش قانون.']
          ] : [
            ['So the delimiter is always smallest?', 'The table says it <b>may</b> waste less space. For the CARROLL record it was 34 bytes against 37, but that is no rule.']
          ]} />
        `),

        // 16 · classify the bytes
        page(html`
          <${Box} kind="pencil" title=${t('Name that structure', 'اسم الـ structure إيه؟')}><p className="hf-p small">${X('Bytes from the notes\' people and books. Which structure wrote them? <b>S</b> = a stream with no structure. (· is a padding blank.)',
            'دي bytes من أشخاص وكتب الـ notes. أنهي structure اللي كتبها؟ الـ <b>S</b> معناها stream من غير structure. (النقطة · دي blank للـ padding.)')}</p></${Box}>
          <div className="hf-fp3-bs"><${Sort} id="nm" bins=${A ? [['F', 'الـ fixed'], ['L', 'الـ length indicator'], ['K', 'الـ keyword'], ['D', 'الـ delimiter'], ['S', 'الـ stream']] : [['F', 'Fixed'], ['L', 'Length indicator'], ['K', 'Keyword'], ['D', 'Delimiter'], ['S', 'Stream']]} items=${[
            ['<code>MASON|ALAN|ADA|</code>', 3],
            ['<code>05MASON04ALAN03ADA</code>', 1],
            ['<code>MASON·····ALAN··ADA··</code>', 0],
            ['<code>MasonAlan90 EastgateAda</code>', 4],
            ['<code>AU=FOLK TI=FILE STRUCTURES</code>', 2],
            ['<code>050381804FOLK15FILE STRUCTURES</code>', 1]
          ]} /></div>
          <${Grow} />
          <${Hand} red=${true}>${A ? html`الـ <bdi dir="ltr">AU=FOLK</bdi> مفيهوش ISBN: يعني field ناقص، وده عادي مع الـ keywords` : 'the AU=FOLK one has no ISBN: a missing field, and that\'s fine for keywords'}</${Hand}>
        `),

        // 17 · record structures
        page(html`
          <${H1}>${t('Structure 3: records', 'الـ structure التالت: الـ records')}</${H1}>
          <${Def}>${X('A <b>record</b> is a set of fields that belong together at a <b>higher level of organization</b>. It is a conceptual tool and an important logical notion in the file\'s structure.',
            'الـ <b>record</b> مجموعة fields بتنتمي لبعض في <b>مستوى تنظيم أعلى</b>. هو أداة conceptual وفكرة logical مهمة في structure الـ file.')}</${Def}>
          <${P} small=${true}>${t('Fields are marked now. But where does one record end and the next begin? Three methods:', 'الـ fields بقت متعلّمة. بس الـ record بيخلص فين واللي بعده بيبدأ فين؟ فيه 3 طرق:')}</${P}>
          <${UL} items=${A ? [
            '<b>(1) الـ fixed-length records بـ fixed-length fields.</b>',
            '<b>(2) الـ fixed-length records بـ variable-length fields</b>: fields بـ delimiters أو بـ length indicators، ونعمل padding لحد ما الـ record يوصل للحجم الثابت.',
            '<b>(3) كل record بيبدأ بـ length indicator</b> (عدد الـ bytes بتاعته).'
          ] : [
            '<b>(1) Fixed-length records with fixed-length fields.</b>',
            '<b>(2) Fixed-length records with variable-length fields</b>: delimited fields or fields with length indicators, padded to a fixed record size.',
            '<b>(3) Each record begins with a length indicator</b> (its byte count).'
          ]} />
          ${bytes('<u>33</u>87359|CARROLL|ALICE IN WONDERLAND')}
          <${Hand} arrow="up">${t('method 3, the notes\' example: 33 bytes follow', 'الطريقة 3، مثال الـ notes: بعدها 33 byte')}</${Hand}>
        `, { sec: t('Record structures', 'الـ Record structures') }),
        page(html`
          <${Fig} name="fp-record-structs" />
        `),

        // 19 · where the 33 comes from
        page(html`
          <${H2}>${t('Where does the 33 come from?', 'الـ 33 جاية منين؟')}</${H2}>
          <${P} small=${true}>${t('Count the bytes after the length indicator, delimiters included:', 'عِد الـ bytes اللي بعد الـ length indicator، والـ delimiters معاهم:')}</${P}>
          <${Code} lines=${[['87359|', '5 + 1'], ['CARROLL|', '7 + 1'], ['ALICE IN WONDERLAND', '19'], ['= 5+1+7+1+19 = 33', t('no | after the last field', 'مفيش | بعد آخر field')]]} />
          <${Box} kind="pencil" title=${t('Your turn', 'دورك')}><p className="hf-p small">${X('Write the FOLK record (<code>03818</code>, <code>FOLK</code>, <code>FILE STRUCTURES</code>) the same way. What is its length indicator?',
            'اكتب الـ record بتاع FOLK بنفس الطريقة، والـ fields بتاعته هي:<span class="ltr"><code>03818</code> · <code>FOLK</code> · <code>FILE STRUCTURES</code></span>الـ length indicator بتاعه كام؟')}</p>
            <${Gap} h=${4} />
            <${Reveal} id="folk">${bytes('<u>26</u>03818|FOLK|FILE STRUCTURES')}<p className="hf-p small" style=${{ marginTop: '4px' }}>${X('5 + 1 + 4 + 1 + 15 = <b>26</b>', 'الحسبة: <bdi dir="ltr">5 + 1 + 4 + 1 + 15 = 26</bdi>')}</p></${Reveal}></${Box}>
          <${Grow} />
          <${Hand} red=${true}>${t('33 and 26: two records, two sizes. That\'s what "variable-length" means.', 'الـ 33 والـ 26: اتنين records بحجمين مختلفين، وده معنى الـ variable-length.')}</${Hand}>
        `),

        // 20 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: a Fixed-length Record and a Variable-length Record argue about space and speed.", 'الليلة: Fixed-length Record وVariable-length Record بيتخانقوا على المساحة والسرعة.')} />
          <${Chat} names=${[t('Fixed-length', 'الـ Fixed-length'), t('Variable-length', 'الـ Variable-length')]} lines=${A ? [
            [0, 'عايز الـ record رقم 1000؟ أنا عارف مكانه بالظبط: <b>1000 × حجمي</b>. seek واحد ووصلت.'],
            [1, 'وكام في المية منك blanks؟ إنت <b>بتضيّع مساحة في الـ padding</b>.'],
            [0, 'الـ padding ده تمن إن مكاني معروف.'],
            [1, 'أنا باخد اللي محتاجه بس. ولما أحجام الـ records تبقى مختلفة، أنا <b>بوفّر مساحة</b>.'],
            [0, 'طب هات الـ record رقم 1000 بتاعك. يلا.'],
            [1, '…مقدرش <b>أنط للـ record رقم i إلا عن طريق index file</b>.'],
            [0, 'بالظبط كده.']
          ] : [
            [0, 'Want record 1000? I know exactly where it is: <b>1000 × my size</b>. One seek.'],
            [1, 'And how much of you is blanks? You <b>waste space with padding</b>.'],
            [0, 'Padding is the price of being predictable.'],
            [1, 'I take only what I need. When record sizes are diverse, I <b>save space</b>.'],
            [0, 'Then fetch your record 1000. Go on.'],
            [1, '…I <b>can\'t jump to the i-th record unless through an index file</b>.'],
            [0, 'Exactly.']
          ]} />
        `),

        // 21 · record pros and cons
        page(html`
          <${H2}>${t('The record structures table', 'جدول الـ record structures')}</${H2}>
          <${Cards} rows=${A ? [
            ['الـ Fixed-length record', 'سهل تنط للـ record رقم i', 'بيضيّع مساحة في الـ padding'],
            ['الـ Variable-length record', 'بيوفّر مساحة لما أحجام الـ records تبقى مختلفة', 'متقدرش تنط للـ record رقم i إلا عن طريق index file']
          ] : [
            ['Fixed-length record', 'Easy to jump to the i-th record', 'Wastes space with padding'],
            ['Variable-length record', 'Saves space when record sizes are diverse', 'Cannot jump to the i-th record unless through an index file']
          ]} />
          <${Box} kind="brain"><p className="hf-p small">${X('Method 2 uses <i>variable-length fields</i>. Is it a fixed-length or a variable-length <b>record</b>? Can you still jump to record i?',
            'الطريقة 2 بتستخدم <i>variable-length fields</i>. هي كده record ثابت ولا متغير؟ وتقدر لسه تنط للـ record رقم i؟')}</p>
            <${Gap} h=${4} />
            <${Reveal} id="m2"><p className="hf-p small">${X('<b>Fixed-length record.</b> The fields vary inside, but the record is padded to a fixed size, so jumping is still easy (and padding still wastes space).',
              '<b>record ثابت.</b> الـ fields جواه متغيرة، بس الـ record متعمله padding لحجم ثابت، فالنط لسه سهل (والـ padding لسه بيضيّع مساحة).')}</p></${Reveal}></${Box}>
        `),

        // 22 · keys
        page(html`
          <${H1}>${t('Finding a record: keys', 'إزاي نلاقي record: الـ keys')}</${H1}>
          <${Def}>${X('A <b>primary key</b> uniquely identifies a record and does not change.', 'الـ <b>primary key</b> بيميّز الـ record بشكل unique ومش بيتغير.')}</${Def}>
          <${Def}>${X('A <b>secondary key</b> is used for searching but does not typically identify a record uniquely.', 'الـ <b>secondary key</b> بنستخدمه في البحث، بس عادةً مش بيميّز الـ record بشكل unique.')}</${Def}>
          <${Hand} tilt=${true}>${t('Our example, not the slides\': for the books, the ISBN could be the primary key; searching by author is a secondary key, since one author can write many books.', 'مثال من عندنا: في الكتب، الـ ISBN ممكن يبقى الـ primary key، والبحث بالمؤلف secondary key، لأن المؤلف الواحد ممكن يكتب كتب كتير.')}</${Hand}>
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['هو الـ RRN key؟', 'لأ. الـ RRN هو <b>رقم مكان</b> الـ record في الـ file، مش قيمة جوه الـ record. هنقابله في الصفحة الجاية.']
          ] : [
            ['Is the RRN a key?', 'No. The RRN is the record\'s <b>position number</b> in the file, not a value inside the record. You\'ll meet it on the next page.']
          ]} />
        `, { sec: t('Managing records', 'إدارة الـ records') }),

        // 23 · sequential vs direct
        page(html`
          <${H1}>${t('Search or seek?', 'تدوّر ولا تنط؟')}</${H1}>
          <${Def}>${X('<b>Sequential search</b>: read the records in order until a match. <b>O(n)</b>. Appropriate for <b>pattern matching</b> or files with <b>few records</b>.',
            'الـ <b>Sequential search</b>: نقرا الـ records بالترتيب لحد ما نلاقي اللي عايزينه. <b><bdi dir="ltr">O(n)</bdi></b>. مناسب للـ <b>pattern matching</b> أو للـ files اللي فيها <b>records قليلة</b>.')}</${Def}>
          <${Def}>${X('<b>Direct access</b>: seek directly to the start of the record. <b>O(1)</b>. Possible when we know the <b>RRN</b>.',
            'الـ <b>Direct access</b>: نعمل seek على طول لأول الـ record. <b><bdi dir="ltr">O(1)</bdi></b>. ينفع لما نكون عارفين الـ <b>RRN</b>.')}</${Def}>
          <${Def}>${X('<b>RRN</b> (Relative Record Number): the first record has RRN <b>0</b>, the next RRN 1, and so on.',
            'الـ <b>RRN</b> (Relative Record Number): أول record الـ RRN بتاعه <b>0</b>، واللي بعده 1، وهكذا.')}</${Def}>
          <${Talk} who="disk">${X('Give me a byte number and I\'ll go straight there. Don\'t make me read 999 records to find the 1000th.', 'اديني رقم byte وأنا أروح له على طول. متخلينيش أقرا 999 record عشان ألاقي الـ 1000.')}</${Talk}>
        `, { sec: t('Search and direct access', 'الـ Search والـ direct access') }),
        page(html`
          <${H2}>${t('Race them', 'خليهم يتسابقوا')}</${H2}>
          <${Fig} name="fp-access" />
        `),

        // 25 · the complexity trio
        page(html`
          <${Box} kind="watch" title=${t('Watch it: three costs, three methods', 'خلّي بالك: 3 costs لـ 3 طرق')}><p className="hf-p small">${X('The midterm models asked all three, each with the same four options:<br/>sequential <b>O(n)</b> · direct access <b>O(1)</b> · binary search <b>O(log₂ n)</b>.',
            'نماذج الميدترم سألت التلاتة، وكل واحد بنفس الـ 4 اختيارات:<span class="ltr">sequential O(n) · direct O(1) · binary O(log₂ n)</span>')}</p></${Box}>
          ${mq('m-seq', /^Sequential access has the complexity/i)}
          <${Hand} red=${true}>${t('binary search needs a sorted file: that\'s Lecture 4', 'الـ binary search محتاج file مترتب: ده في محاضرة 4')}</${Hand}>
        `),
        page(html`
          ${mq('m-bin', /binary search has the complexity/i)}
          ${mq('m-dir', /^Direct access has the complexity/i)}
        `),

        // 27 · RRN to byte offset
        page(html`
          <${H1}>${t('From RRN to byte', 'من الـ RRN للـ byte')}</${H1}>
          <${P} small=${true}>${X('With fixed-length records every record has the same size, so record <b>RRN</b> starts exactly at:', 'لما الـ records ثابتة، كل record ليه نفس الحجم، فالـ record رقم <b>RRN</b> بيبدأ بالظبط عند:')}</${P}>
          <${Def}><p className="hf-p" style=${{ textAlign: 'center', fontFamily: 'var(--mono)', fontWeight: 700, direction: 'ltr' }}>byte offset = RRN × record size</p></${Def}>
          <${P} small=${true}>${X('Play with it: the book record is 37 bytes. Step the RRN, switch the size, then try <b>variable</b>.', 'جرّبها: حجم record الكتاب 37 byte. غيّر الـ RRN، وغيّر الحجم، وبعدين جرّب الـ <b>variable</b>.')}</${P}>
          <${Offset} />
          <${Hand} arrow="up" red=${true}>${t('RRN 0 is at byte 0: that\'s why RRNs start at 0', 'الـ RRN 0 عند الـ byte 0، وعشان كده الـ RRNs بتبدأ من 0')}</${Hand}>
        `, { sec: t('RRN and offsets', 'الـ RRN والـ offsets') }),

        // 28 · be the calculator
        page(html`
          <${Box} kind="pencil" title=${t('Be the calculator', 'خليك إنت الآلة الحاسبة')}><p className="hf-p small">${t('Five quick ones (our practice numbers). A wrong pick names your mistake.', '5 أسئلة سريعة (أرقام تدريب من عندنا). الغلط بيقولك غلطت فين.')}</p></${Box}>
          <${Drill} id="dr" />
        `),

        // 29 · seeking in C
        page(html`
          <${H1}>${t('Seeking: moving the pointer', 'الـ Seeking: تحريك الـ pointer')}</${H1}>
          <${P} small=${true}>${X('In general, <code>Seek(Source_File, Offset)</code>: <code>Seek(infile, 3030)</code> moves to byte 3030. In C:',
            'بشكل عام <code>Seek(Source_File, Offset)</code>، فمثلًا <code>Seek(infile, 3030)</code> بتنقلك للـ byte رقم 3030. وفي C:')}</${P}>
          <${Code} lines=${['int fseek(FILE *stream,', '          long offset,', '          int origin);']} />
          <${Cards} rows=${A ? [['الـ origin', 'الـ <b>0</b> البداية، والـ <b>1</b> المكان الحالي، والـ <b>2</b> النهاية', 'الـ offset ممكن يبقى سالب: يعني نرجع لورا']] : [['origin', '<b>0</b> = beginning, <b>1</b> = current, <b>2</b> = end', 'the offset can be negative: move backwards']]} />
          <${Code} lines=${[['fseek(infile, 0L, 0);', t('start', 'البداية')], ['fseek(infile, 0L, 2);', t('end', 'النهاية')], ['fseek(infile, -10L, 1);', t('back 10 bytes', 'ارجع 10')]]} />
        `, { sec: t('Seeking', 'الـ Seeking') }),

        // 30 · seeking in C++
        page(html`
          <${H2}>${A ? html`في <bdi dir="ltr">C++</bdi>، الـ file الواحد ليه pointer-ين` : 'C++: one file, two pointers'}</${H2}>
          <${P} small=${true}>${X('An <code>fstream</code> has <b>two pointers</b>. <code>seekg</code> moves the <b>get</b> (read) pointer, <code>seekp</code> moves the <b>put</b> (write) pointer. Origins: <code>ios::beg</code>, <code>ios::cur</code>, <code>ios::end</code>.',
            'الـ <code>fstream</code> ليه <b>pointer-ين</b>. الـ <code>seekg</code> بيحرك الـ <b>get</b> pointer (القراية)، والـ <code>seekp</code> بيحرك الـ <b>put</b> pointer (الكتابة). والـ origins هي <code>ios::beg</code> و<code>ios::cur</code> و<code>ios::end</code>.')}</${P}>
          <${Code} lines=${[['infile.seekg(0, ios::beg);', t('start', 'البداية')], ['infile.seekg(0, ios::end);', t('end', 'النهاية')], ['infile.seekg(-10, ios::cur);', t('back 10', 'ارجع 10')]]} />
          <${Talk} who="mem">${X('Remember it by the letter: <b>g</b>et reads, <b>p</b>ut writes.', 'افتكرها بالحرف: الـ <b>g</b> من get يعني قراية، والـ <b>p</b> من put يعني كتابة.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Which function moves the PUT (write) pointer?" <b>seekp</b>. <code>seekg</code> moves the get pointer, <code>tellg</code> only <i>reports</i> a position, and <code>fseek</code> is C.',
            'لو اتسألت مين بيحرك الـ PUT pointer؟ الإجابة <b>seekp</b>. الـ <code>seekg</code> بيحرك الـ get، والـ <code>tellg</code> <i>بيقولك</i> المكان بس، والـ <code>fseek</code> دي بتاعة C.')}</p></${Box}>
        `),
        page(html`
          <${Fig} name="fp-seek" />
        `),

        // 32 · match the seeking words
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Tap a name on the left, then what it does on the right.', 'دوس على اسم، وبعدين دوس على الشغلانة بتاعته.')}</${P}>
          <${Match} id="sk" left=${['seekg', 'seekp', 'tellg', 'origin 0 / ios::beg', 'origin 1 / ios::cur', 'origin 2 / ios::end']}
            right=${A ? ['المكان الحالي', 'بيحرك الـ put pointer (الكتابة)', 'نهاية الـ file', 'بيقول مكان الـ get pointer (في الآخر يبقى حجم الـ file)', 'بداية الـ file', 'بيحرك الـ get pointer (القراية)']
              : ['the current position', 'moves the put (write) pointer', 'the end of the file', 'reports the get pointer\'s position (at the end: the file size)', 'the beginning of the file', 'moves the get (read) pointer']}
            answer=${[5, 1, 3, 4, 0, 2]} />
        `, { sec: t('Exercises: seeking', 'تمارين: الـ seeking') }),

        // 33 · quiz 3 Q1: copy a file
        page(html`
          <${H2}>${t('Quiz (3) Q1: copy a file with no loops', 'سؤال الـ Quiz (3) الأول: انسخ file من غير loops')}</${H2}>
          <${P} small=${true}>${X('Inside <code>main()</code>, with <code>#include &lt;fstream&gt;</code>:', 'ده جوه الـ <code>main()</code>، ومعاه <code>#include &lt;fstream&gt;</code>:')}</${P}>
          <${Code} lines=${['ifstream infile("d:\\\\IFile.txt",', '                ios::binary);', 'ofstream outfile("d:\\\\OFile.txt",', '                 ios::binary);', 'infile.seekg(0, infile.end);', 'long size = infile.tellg();', 'infile.seekg(0);', 'char* buffer = new char[size];', 'infile.read(buffer, size);', 'outfile.write(buffer, size);', 'delete[] buffer;', 'outfile.close(); infile.close();']} />
          <${P} small=${true}>${X('<b>The trick</b>: <code>seekg</code> to the end, and <code>tellg</code> gives the position, which is the <b>file size</b>. Go back to the start, then <b>one read</b> and <b>one write</b> of that size.',
            '<b>الفكرة</b>: <code>seekg</code> للآخر، والـ <code>tellg</code> بتدي المكان، وده هو <b>حجم الـ file</b>. ارجع للبداية، وبعدين <b>read واحدة</b> و<b>write واحدة</b> بالحجم ده.')}</${P}>
        `, { sec: t('Quiz (3)', 'الـ Quiz (3)') }),
        page(html`
          <${Fig} name="fp-copy-file" />
        `),

        // 35 · quiz 3 Q2: update by RRN
        page(html`
          <${H2}>${t('Quiz (3) Q2: update a record by RRN', 'سؤال الـ Quiz (3) التاني: عدّل record بالـ RRN')}</${H2}>
          <${Code} lines=${['struct Item { char desc[31];', '              int qty;', '              float price; };', 'void UpdateRecord(fstream &file,', '       Item &newItem, int RRN) {', '  file.seekp(RRN * sizeof(newItem),', '             ios::beg);', '  file.write((char*)&newItem,', '             sizeof(newItem));', '}']} />
          <${P} small=${true}>${X('Fixed-length fields and records mean every record has the same size, so the byte offset is exactly <b>RRN × record size</b>. <code>seekp</code> moves the <b>put</b> pointer there (we are writing), and <code>write</code> overwrites the old record.',
            'الـ fields والـ records الثابتة معناها إن كل record ليه نفس الحجم، فالـ byte offset بيبقى بالظبط <bdi dir="ltr">RRN × record size</bdi>. والـ <code>seekp</code> بيحرك الـ <b>put</b> pointer هناك (عشان إحنا بنكتب)، والـ <code>write</code> بتكتب فوق الـ record القديم.')}</${P}>
        `),
        page(html`
          <${Fig} name="fp-update-rrn" />
          <${Dumb} qa=${A ? [['ليه <code>sizeof(newItem)</code> ومش رقم؟', 'مجموع الـ fields هو <bdi dir="ltr">31 + 4 + 4 = 39</bdi> byte، بس الـ compiler ممكن يزوّد padding للـ alignment (غالبًا 40)، والـ <code>sizeof</code> بتجيب الحجم الحقيقي. (من عندنا.)']]
            : [['Why <code>sizeof(newItem)</code> and not a number?', 'The fields add up to 31 + 4 + 4 = 39 bytes (4-byte int and float), but a compiler may add padding for alignment (often making it 40). <code>sizeof</code> gives the real size. (Our note.)']]} />
        `),

        // 37–39 · exam corner
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the doctors' papers (this year's midterm and the midterm models). Tap an answer to see why.", 'أسئلة حقيقية من امتحانات الدكاترة (ميدترم السنة دي ونماذج الميدترم). دوس على إجابة عشان تعرف ليه.')}</p></${Box}>
          ${mq('m-jump', /jump ahead to the end of the field/i)}
          <${Grow} />
          <${Talk} who="table" flip=${true}>${t('Hint: which one tells you how far to jump?', 'تلميح: مين فيهم بيقولك تنط قد إيه؟')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m-pad', /^Waste space with padding/i)}
          ${mq('m-kw', /self describing, allows/i)}
        `),
        page(html`
          ${mq('m-del', /check every byte of field/i)}
          <${Grow} />
          <${Talk} who="cpu">${t('Is this |? No. Is this |? No… you know the one.', 'ده |؟ لأ. وده |؟ لأ… إنت عارفها.')}</${Talk}>
        `),

        // 40 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>text file</b> سلسلة characters، والـ <b>binary file</b> سلسلة bytes.',
            'الـ <b>field</b> أصغر وحدة داتا ليها معنى logical. والـ <b>record</b> مجموعة fields بتكوّن وحدة logical.',
            'فيه 3 file structures: الـ <b>stream</b> والـ <b>field</b> والـ <b>record</b>. والـ stream <b>مفيهوش معلومات زيادة</b>.',
            'الـ fixed فيه padding، والـ length indicator بينط، والـ keyword بيوصف نفسه، والـ delimiter بيشيك كل byte.',
            'الـ record الثابت سهل ننط فيه للـ record رقم i، والمتغير بيوفر مساحة بس محتاج index file.',
            'الـ primary key unique ومبيتغيرش، والـ secondary key للبحث.',
            'الـ sequential هو <bdi dir="ltr">O(n)</bdi>، والـ direct هو <bdi dir="ltr">O(1)</bdi> بالـ RRN (بيبدأ من 0):<span class="ltr">offset = RRN × record size</span>',
            'الـ fseek origins هي 0 و1 و2 (البداية والحالي والنهاية). والـ seekg للقراية والـ seekp للكتابة.'
          ] : [
            'A <b>text file</b> is characters, a <b>binary file</b> is bytes.',
            'A <b>field</b> is the smallest unit of data with logical meaning; a <b>record</b> is a group of fields forming a logical unit.',
            'Three file structures: <b>stream</b>, <b>field</b>, <b>record</b>. A stream has <b>no added information</b>.',
            'Fixed (padding), length indicator (jump; long fields need &gt; 1 byte), keyword (self-describing; keywords waste space), delimiter (less space; check every byte).',
            'Fixed-length records: easy jump to record i, but padding. Variable-length: save space, but need an index file to jump.',
            'Primary key: unique and unchanging. Secondary key: for searching.',
            'Sequential search <b>O(n)</b>; direct access <b>O(1)</b> with the RRN (from 0): offset = RRN × record size.',
            'fseek origins 0 / 1 / 2 = beginning / current / end. seekg moves the get pointer, seekp the put pointer.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 41 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 3!', 'خلّصت الفصل التالت!')}</${H1}>
            <${Talk} who="disk">${t('Next time: what happens when the records are sorted, or not sorted at all.', 'المرة الجاية: إيه اللي بيحصل لما الـ records تبقى مترتبة، أو مش مترتبة خالص.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [3], t: Date.now() } }}>${t('Quiz me on Lecture 3', 'امتحنّي في محاضرة 3')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 3, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 3, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

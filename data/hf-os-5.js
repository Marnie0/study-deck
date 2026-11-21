// Head First chapter for Operating Systems Lecture 5 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Virtual memory, demand paging, the valid–invalid bit, page faults (5 steps, 11 worst-case stages), page replacement,
// FIFO / Optimal / LRU, Belady's anomaly, LRU implementations and approximations (second chance), LFU and MFU.
// Every fact comes from the lecture's notes; analogies are marked as ours. Every frame table and fault count below is computed
// here by simulate() (the same rule as the site's visuals: a victim is replaced in its own frame) and was checked by hand
// against the notes' tables (lecture string: FIFO 15, OPT 9, LRU 12; Belady: 9 vs 10) and the 2025/2026 final's key (11, 8, 10).
(function () {
  const H = window.HF; H.chapters.os = H.chapters.os || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T5 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-os5')) {
    const s = document.createElement('style'); s.id = 'hf-css-os5';
    s.textContent = `
.hfb .hf-os5-ft{ border-collapse:collapse; width:100%; table-layout:fixed; font:600 13.5px/1 var(--mono); color:var(--ink); }
.hfb .hf-os5-ft th, .hfb .hf-os5-ft td{ border:1px solid var(--hf-line); height:20px; padding:0; text-align:center; }
.hfb .hf-os5-ft th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-os5-ft .lb{ width:42px; background:var(--hf-grey); font:800 13px/1 var(--body); }
.hfb .hf-os5-ft td.nw{ font-weight:800; color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 13%, var(--paper)); }
.hfb .hf-os5-ft td.fl{ color:var(--hf-red); font-weight:800; }
.hfb .hf-os5-ft th.cur{ background:var(--hf-line); color:var(--paper); }
.hfb .hf-os5-ft td.cur{ background:color-mix(in srgb, var(--hf-hand) 10%, var(--paper)); }
.hfb .hf-os5-fts{ display:grid; gap:6px; }
.hfb .hf-os5-cnt{ font:700 13.5px/1.2 var(--body); margin:0; color:var(--ink); }
.hfb .hf-os5-cnt b{ color:var(--hf-red); }
.hfb .hf-os5-steps{ display:grid; gap:6px; margin:0; padding:0; list-style:none; }
.hfb .hf-os5-steps li{ display:grid; grid-template-columns:26px 1fr; gap:8px; align-items:start; font-size:14.5px; line-height:1.34; }
.hfb .hf-os5-steps li > b:first-child{ display:grid; place-items:center; width:24px; height:24px; border-radius:50%; background:var(--hf-line); color:var(--paper); font:800 13px/1 var(--body); }
/* the page replacer */
.hfb .hf-os5-rp{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; }
.hfb .hf-os5-tabs{ display:flex; gap:5px; }
.hfb .hf-os5-tabs button{ flex:1 1 0; font:800 13.5px/1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-os5-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-os5-ask{ font-size:14px; line-height:1.32; margin:0; color:var(--ink); }
.hfb .hf-os5-ask code{ font-family:var(--mono); font-size:.9em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-os5-opts{ display:flex; gap:5px; flex-wrap:wrap; }
.hfb .hf-os5-opts button{ font:700 13.5px/1 var(--body); min-height:32px; padding:0 10px; border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-os5-bad{ font-size:13.5px; line-height:1.32; margin:0; color:var(--hf-red); }
.hfb .hf-os5-ok{ font-size:13.5px; line-height:1.32; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-os5-row{ display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hfb .hf-os5-row .hf-btn{ padding:7px 9px; }
/* put-in-order */
.hfb .hf-os5-ord{ display:grid; gap:5px; }
.hfb .hf-os5-ord button{ display:grid; grid-template-columns:24px 1fr; gap:8px; align-items:center; text-align:left; font:500 14px/1.28 var(--body); padding:6px 8px; min-height:38px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-os5-ord button > i{ font-style:normal; display:grid; place-items:center; width:22px; height:22px; border-radius:50%; background:var(--hf-grey2); font:800 12.5px/1 var(--body); }
.hfb .hf-os5-ord button.on > i{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-os5-ord button.ok{ border-color:var(--ok); } .hfb .hf-os5-ord button.no{ border-color:var(--hf-red); }
/* second chance */
.hfb .hf-os5-clk{ display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; }
.hfb .hf-os5-clk button{ position:relative; display:grid; gap:3px; justify-items:center; padding:16px 0 7px; border-radius:8px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); cursor:pointer; transition:background .3s, border-color .3s; }
.hfb .hf-os5-clk button b{ font:800 21px/1 var(--mono); }
.hfb .hf-os5-clk button small{ font:700 13px/1 var(--mono); color:var(--graphite); }
.hfb .hf-os5-clk button.hd{ border-width:2.5px; border-color:var(--hf-hand); }
.hfb .hf-os5-clk button.hd::before{ content:"▼"; position:absolute; top:2px; left:0; right:0; text-align:center; font-size:11px; color:var(--hf-hand); }
.hfb .hf-os5-clk button.gone{ background:color-mix(in srgb, var(--hf-red) 12%, var(--paper)); border-color:var(--hf-red); }
.hfb .hf-os5-clk button.sav small{ color:var(--hf-hand); }
.hfb .hf-os5-old{ display:flex; justify-content:space-between; font:600 13px/1 var(--body); color:var(--graphite); margin:0 0 3px; }
.hfb .hf-os5-two{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-os5-card{ border:1.5px solid var(--hf-line); border-radius:8px; padding:8px 9px; background:var(--paper); display:grid; gap:4px; align-content:start; }
.hfb .hf-os5-card > b{ font:800 15px/1.1 var(--body); color:var(--ink); }
.hfb .hf-os5-card > span{ font-size:13.5px; line-height:1.32; }
.hfb .hf-os5-card .pro{ color:var(--ok); font-weight:600; } .hfb .hf-os5-card .con{ color:var(--hf-red); font-weight:600; }
.hf-ar .hf-os5-steps li, .hf-ar .hf-os5-ask, .hf-ar .hf-os5-bad, .hf-ar .hf-os5-ok, .hf-ar .hf-os5-ord button, .hf-ar .hf-os5-card > span, .hf-ar .hf-os5-cnt, .hf-ar .hf-os5-old{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hf-ar .hf-os5-steps li, .hf-ar .hf-os5-ord button{ font-size:13.5px; }
.hf-ar .hf-os5-card > b, .hf-ar .hf-os5-opts button, .hf-ar .hf-os5-steps li > b:first-child, .hf-ar .hf-os5-ord button > i{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-os5-ord button{ text-align:right; }
.hf-ar .hf-os5-ok{ border-left:0; border-right:3px solid var(--ok); }
@media (prefers-reduced-motion: reduce){ .hfb .hf-os5-clk button{ transition:none; } }
`;
    document.head.appendChild(s);
  }

  // page replacement on a reference string; a victim is replaced in its own frame (as in the notes' tables and the site's visuals)
  function simulate(refs, nf, algo) {
    const fr = Array(nf).fill(null), loaded = Array(nf).fill(-1), last = {}, out = [];
    refs.forEach((p, t) => {
      const before = fr.slice();
      let slot = fr.indexOf(p), fault = false, victim = null, kind = 'hit';
      if (slot < 0) {
        fault = true; slot = fr.indexOf(null); kind = 'empty';
        if (slot < 0) {
          kind = 'replace';
          if (algo === 'FIFO') slot = loaded.indexOf(Math.min(...loaded));
          else if (algo === 'LRU') { let b = 0; fr.forEach((q, k) => { if (last[q] < last[fr[b]]) b = k; }); slot = b; }
          else { const nx = fr.map(q => { const k = refs.indexOf(q, t + 1); return k < 0 ? Infinity : k; }); let b = 0; nx.forEach((v, k) => { if (v > nx[b]) b = k; }); slot = b; }
          victim = fr[slot];
        }
        fr[slot] = p;
      }
      // what each algorithm looks at, for every page in memory before this reference (1-based positions)
      const info = before.map((q, k) => q == null ? null : algo === 'FIFO' ? loaded[k] + 1 : algo === 'LRU' ? last[q] + 1 : (() => { const n = refs.indexOf(q, t + 1); return n < 0 ? 0 : n + 1; })());
      if (fault) loaded[slot] = t;
      last[p] = t;
      out.push({ t, p, before, frames: fr.slice(), fault, slot, victim, kind, info });
    });
    return out;
  }
  const LECT = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
  const EXAM = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1];   // Final Exam 2025/2026, Third Question (a)
  const BEL = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];

  // a frame table: Ref row, one row per frame, Fault row; bold-coloured = the page just loaded; split into chunks of `per` references
  function FT({ refs, nf, algo, per, upto, cur }) {
    const S = simulate(refs, nf, algo), n = refs.length, per_ = per || n;
    const chunks = []; for (let a = 0; a < n; a += per_) chunks.push([a, Math.min(n, a + per_)]);
    const shown = k => upto == null || k < upto;
    return html`<div className="hf-os5-fts hf-in" dir="ltr">${chunks.map(([a, b]) => html`<table key=${a} className="hf-os5-ft"><tbody>
      <tr><th className="lb">Ref</th>${refs.slice(a, b).map((p, j) => html`<th key=${j} className=${a + j === cur ? 'cur' : ''}>${p}</th>`)}${Array.from({ length: per_ - (b - a) }, (_, j) => html`<th key=${'e' + j} style=${{ border: 0, background: 'none' }}></th>`)}</tr>
      ${Array.from({ length: nf }, (_, f) => html`<tr key=${f}><td className="lb">F${f + 1}</td>${S.slice(a, b).map((x, j) => { const k = a + j; const q = x.frames[f];
        return html`<td key=${j} className=${!shown(k) ? (k === cur ? 'cur' : '') : x.fault && x.slot === f ? 'nw' : ''}>${shown(k) && q != null ? q : ''}</td>`; })}${Array.from({ length: per_ - (b - a) }, (_, j) => html`<td key=${'e' + j} style=${{ border: 0 }}></td>`)}</tr>`)}
      <tr><td className="lb">${'Fault'}</td>${S.slice(a, b).map((x, j) => html`<td key=${j} className="fl">${shown(a + j) && x.fault ? 'F' : ''}</td>`)}${Array.from({ length: per_ - (b - a) }, (_, j) => html`<td key=${'e' + j} style=${{ border: 0 }}></td>`)}</tr>
    </tbody></table>`)}</div>`;
  }
  const faultsOf = (refs, nf, algo) => simulate(refs, nf, algo).filter(x => x.fault).length;

  // Be the page replacer: the 2025/2026 final's string, 3 frames; at every reference decide hit, empty frame, or which page goes out
  const SIMS = { FIFO: simulate(EXAM, 3, 'FIFO'), OPT: simulate(EXAM, 3, 'OPT'), LRU: simulate(EXAM, 3, 'LRU') };
  function Replacer({ id }) {
    const ar = useAr();
    const [algo, setAlgo] = H.K.useSlot(id + ':a', 'FIFO');
    const [k, setK] = H.K.useSlot(id + ':' + algo, 0);
    const [bad, setBad] = useState(null);
    useEffect(() => setBad(null), [algo]);
    const S = SIMS[algo], n = EXAM.length, done = k >= n, s = done ? null : S[k];
    const faults = S.slice(0, k).filter(x => x.fault).length;
    const before = s ? s.before : [];
    // Optimal: when several pages are never used again, any of them is a correct victim
    const never = s && algo === 'OPT' ? before.filter(q => q != null && EXAM.indexOf(q, k + 1) < 0) : [];
    const right = c => !s ? false : s.kind === 'hit' ? c === 'hit' : s.kind === 'empty' ? c === 'empty' : c === 'v' + s.victim || (never.length > 1 && never.some(q => c === 'v' + q));
    const lbl = { FIFO: ['loaded at', 'دخلت عند'], LRU: ['last used at', 'آخر استخدام عند'], OPT: ['next used at', 'جاية عند'] }[algo];
    const why = () => before.map((q, j) => q == null ? '' : `${q} → ${s.info[j] ? '#' + s.info[j] : (ar ? 'مش جاية تاني' : 'never')}`).filter(Boolean).join(', ');
    const pick = c => {
      if (right(c)) { setBad(null); setK(k + 1); return; }
      let m;
      if (c === 'hit') m = ar ? `الـ page ${s.p} مش في أي frame، يعني ده fault.` : `Page ${s.p} isn't in any frame, so this is a fault.`;
      else if (s.kind === 'hit') m = ar ? `الـ page ${s.p} موجودة أصلًا في frame، يعني hit ومش fault.` : `Page ${s.p} is already in a frame: a hit, not a fault.`;
      else if (s.kind === 'empty') m = ar ? `لسه فيه frame فاضي، فالـ page ${s.p} تدخل فيه (وبرضه بتتحسب fault).` : `There's still an empty frame: page ${s.p} goes there (it still counts as a fault).`;
      else if (c === 'empty') m = ar ? 'مفيش frame فاضي خلاص. اختار victim.' : 'No empty frame left: pick a victim.';
      else m = ar ? `فكّر تاني. ${{ FIFO: 'الـ FIFO بيطلّع اللي دخلت الأول', LRU: 'الـ LRU بيطلّع اللي آخر استخدام ليها أقدم', OPT: 'الـ OPT بيطلّع اللي استخدامها الجاي أبعد' }[algo]}. (${lbl[1]}: <bdi dir="ltr">${why()}</bdi>)`
        : `Not that one. ${{ FIFO: 'FIFO evicts the page loaded earliest', LRU: 'LRU evicts the page whose last use is oldest', OPT: 'OPT evicts the page whose next use is farthest away' }[algo]}. (${lbl[0]}: ${why()})`;
      setBad(m);
    };
    const key = { FIFO: 11, OPT: 8, LRU: 10 }[algo];
    const opts = s ? ['hit'].concat(before.includes(null) ? ['empty'] : []).concat(before.filter(q => q != null).map(q => 'v' + q)) : [];
    const optL = c => c === 'hit' ? (ar ? 'موجودة (hit)' : 'Hit') : c === 'empty' ? (ar ? 'في frame فاضي' : 'Empty frame') : (ar ? 'طلّع ' : 'Out: ') + c.slice(1);
    return html`<div className="hf-os5-rp hf-in">
      <div className="hf-os5-tabs" dir="ltr" role="group" aria-label="Algorithm">${['FIFO', 'OPT', 'LRU'].map(a => html`<button key=${a} aria-pressed=${String(algo === a)} onClick=${() => setAlgo(a)}>${a}</button>`)}</div>
      <${FT} refs=${EXAM} nf=${3} algo=${algo} upto=${k} cur=${done ? null : k} />
      ${done ? html`<p className="hf-os5-ok">${T5(ar ? `<b>خلصت!</b> الـ ${algo} بيعمل <b>${faults} faults</b>. إجابة الدكاترة: الـ FIFO بـ 11، والـ Optimal بـ 8، والـ LRU بـ 10.${algo === 'OPT' ? ' في آخر reference مفيش ولا page هتتستخدم تاني، فأي واحدة تنفع، والجدول بتاع الحل بيطلّع الـ 2.' : ''}`
          : `<b>Done!</b> ${algo} makes <b>${faults} faults</b>. The doctors' key: FIFO 11, Optimal 8, LRU 10.${algo === 'OPT' ? ' On the last reference no page is used again, so any victim works; the key\'s table replaces 2.' : ''}`)}</p>`
        : html`<p className="hf-os5-ask">${T5(ar ? `الـ reference رقم <bdi dir="ltr">#${k + 1}</bdi> هو الـ page <b>${s.p}</b>. هيحصل إيه؟ <span style="color:var(--graphite)">(الـ faults لحد دلوقتي ${faults})</span>`
          : `Reference <b>#${k + 1}</b> is page <b>${s.p}</b>. What happens? <span style="color:var(--graphite)">(faults so far: ${faults})</span>`)}</p>
        <div className="hf-os5-opts">${opts.map(c => html`<button key=${c} onClick=${() => pick(c)}>${optL(c)}</button>`)}</div>`}
      ${bad && html`<p className="hf-os5-bad">${T5(bad)}</p>`}
      <div className="hf-os5-row">
        ${!done && html`<button className="hf-btn" onClick=${() => { setBad(null); setK(k + 1); }}>${ar ? 'ورّيني الخطوة دي' : 'Show this step'}</button>`}
        ${!done && html`<button className="hf-btn" onClick=${() => { setBad(null); setK(n); }}>${ar ? 'ورّيني الكل' : 'Show all'}</button>`}
        ${k > 0 && html`<button className="hf-btn" onClick=${() => { setBad(null); setK(0); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
        ${done && key === faults && html`<span className="hf-score">✓ ${key}</span>`}
      </div>
    </div>`;
  }

  // put the steps in order: tap them first to last
  function Order({ id, items, right }) {
    const ar = useAr();
    const [seq, setSeq] = H.K.useSlot(id, []);
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const tap = i => { setChk(false); setSeq(seq.includes(i) ? seq.filter(x => x !== i) : seq.concat(i)); };
    const good = seq.filter((x, j) => right[j] === x).length;
    return html`<div className="hf-in"><div className="hf-os5-ord">${items.map((t, i) => { const at = seq.indexOf(i);
      return html`<button key=${i} className=${(at >= 0 ? 'on' : '') + (chk && at >= 0 ? (right[at] === i ? ' ok' : ' no') : '')} aria-pressed=${String(at >= 0)} onClick=${() => tap(i)}><i>${at >= 0 ? at + 1 : '?'}</i><span>${T5(t)}</span></button>`; })}</div>
      <div className="hf-os5-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${seq.length < items.length} onClick=${() => setChk(true)}>${ar ? 'صحّح الترتيب' : 'Check the order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq(right.slice()); setChk(true); }}>${ar ? 'ورّيني الترتيب' : 'Show the order'}</button>
        ${seq.length > 0 && html`<button className="hf-btn" onClick=${() => { setSeq([]); setChk(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
        ${chk && html`<span className="hf-score">${good} / ${items.length}</span>`}
      </div></div>`;
  }

  // second chance: FIFO order A, B, C, D (oldest first) with reference bits 1, 1, 0, 1; tap the victim, then watch the hand sweep
  const CLK = [['A', 1], ['B', 1], ['C', 0], ['D', 1]];
  function Clock({ id }) {
    const ar = useAr();
    const [pk, setPk] = H.K.useSlot(id, null);
    const [st, setSt] = useState(pk === 'C' ? 3 : 0);
    useEffect(() => { if (pk !== 'C' || st >= 3) return; const tm = setTimeout(() => setSt(st + 1), calm() ? 0 : 700); return () => clearTimeout(tm); }, [pk, st]);
    const go = p => { setPk(p); if (p === 'C') setSt(calm() ? 3 : 0); };
    const ok = pk === 'C';
    const hand = ok ? Math.min(st, 2) : 0;
    const msg = !pk ? null : ok ? (st >= 3 ? (ar ? 'صح! الـ A والـ B الـ bit بتاعهم 1، فكل واحدة خدت فرصة تانية: الـ bit بقى 0 وفضلت في الـ memory. الـ C الـ bit بتاعها 0، فهي الـ victim.' : 'Right! A and B have bit 1, so each gets a second chance: bit set to 0, page stays. C has bit 0, so C is the victim.') : (ar ? 'العقرب بيلف من الأقدم…' : 'The hand moves on from the oldest page…'))
      : pk === 'D' ? (ar ? 'العقرب بيبدأ من الأقدم (الـ A)، ويقف عند أول bit بـ 0. وكمان الـ bit بتاع الـ D بـ 1.' : 'The hand starts at the oldest page (A) and stops at the first bit 0. And D\'s bit is 1 anyway.')
      : (ar ? `الـ bit بتاع الـ ${pk} بـ 1، فهي بتاخد فرصة تانية: الـ bit يبقى 0 وتفضل. كمّل للي بعدها.` : `${pk}'s bit is 1, so it gets a second chance: its bit is cleared to 0 and it stays. Move on.`);
    return html`<div className="hf-in">
      <p className="hf-os5-old" dir="ltr"><span>${ar ? 'الأقدم' : 'oldest'}</span><span>${ar ? 'الأحدث' : 'newest'}</span></p>
      <div className="hf-os5-clk" dir="ltr">${CLK.map(([p, b], j) => { const cleared = ok && st > j && j < 2, gone = ok && st >= 3 && j === 2;
        return html`<button key=${p} className=${(hand === j && !(ok && st >= 3) ? 'hd' : '') + (gone ? ' gone' : '') + (cleared ? ' sav' : '')} onClick=${() => go(p)} aria-label=${'page ' + p}>
          <b>${p}</b><small>${gone ? 'victim' : 'bit ' + (cleared ? 0 : b)}</small></button>`; })}</div>
      ${msg && html`<p className=${ok ? 'hf-os5-ok' : 'hf-os5-bad'} style=${{ marginTop: '7px' }}>${msg}</p>`}
      <div className="hf-os5-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn" onClick=${() => go('C')}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${pk && html`<button className="hf-btn" onClick=${() => { setPk(null); setSt(0); }}>${ar ? 'من الأول' : 'Start over'}</button>`}
      </div></div>`;
  }

  H.chapters.os[5] = {
    title: 'Virtual Memory', kicker: 'Chapter 5', run: 'virtual memory',
    ar: { title: 'الـ Virtual Memory', kicker: 'الفصل 5', run: 'الـ virtual memory' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 5);
      const arQuiz = (window.AR && window.AR.os && window.AR.os.lectures && window.AR.os.lectures[5] && window.AR.os.lectures[5].quiz) || [];
      // the doctor's questions (with src) and, separately, the site's own practice questions (no src)
      const find = (re, src) => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && !!x.src === src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = find(re, true); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const pq = (id, re) => { const r = find(re, false); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const L = s => `<span class="ltr">${s}</span>`;
      const B = s => `<bdi dir="ltr">${s}</bdi>`;
      const steps = items => html`<ol className="hf-os5-steps hf-in">${items.map((x, i) => html`<li key=${i}><b>${i + 1}</b><span>${T(x)}</span></li>`)}</ol>`;
      return [
        // 0 · warm-up (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Last chapter you cut memory into <b>frames</b> and programs into <b>pages</b>, and a <b>page table</b> turned logical addresses into physical ones. The rule was: to run a program of <b>N</b> pages, find <b>N</b> free frames and load the program.',
            'في الفصل اللي فات قسّمت الـ memory لـ <b>frames</b> والبرامج لـ <b>pages</b>، والـ <b>page table</b> كان بيترجم الـ logical addresses لـ physical. والقاعدة كانت: عشان تشغّل برنامج حجمه <b>N</b> pages، لاقي <b>N</b> free frames وحمّل البرنامج.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('A program has <b>10 pages</b> and memory has only <b>4 free frames</b>. By that rule, can it run? Now suppose the program only ever uses 3 of its pages at a time. Does it really need all 10 frames?',
            'برنامج فيه <b>10 pages</b> والـ memory فيها <b>4 free frames</b> بس. بالقاعدة دي، ينفع يشتغل؟ طب افرض إن البرنامج مش بيستخدم غير 3 pages بس في أي وقت. هل محتاج الـ 10 frames فعلًا؟')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will be the page replacer, frame by frame.', '<b>حل التمارين.</b> هتبقى إنت الـ page replacer وتمشي frame بـ frame.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps.', '<b>خلّي بالك!</b> دي فخاخ الامتحان.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">5</span><span className="t">${A ? html`الفصل الخامس<br/>Operating Systems` : html`Chapter five<br/>Operating Systems`}</span></div>
            <${Gap} h=${8} /><${H1}>${t("The Memory That Isn't There", 'الـ memory اللي مش موجودة')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('memory management: virtual memory', 'إدارة الـ memory: الـ virtual memory')}</p></div>
          <${P}>${X("Back to the warm-up: the program doesn't need all 10 frames. A program can run while <b>part of it isn't in memory at all</b>.",
            'نرجع لسؤال البداية: البرنامج مش محتاج الـ 10 frames. البرنامج ممكن يشتغل و<b>جزء منه مش في الـ memory خالص</b>.')}</${P}>
          <${Talk} who="proc">${X("Wait. I'm only <i>partly</i> here?", 'استنى. أنا موجود <i>حتة</i> مني بس؟')}</${Talk}>
          <${Talk} who="mem" flip=${true}>${X('Only the part you need. The rest waits on the disk until you ask for it.', 'الحتة اللي محتاجها بس. والباقي مستني على الـ disk لحد ما تطلبه.')}</${Talk}>
          <${P} small=${true}>${X("That's <b>virtual memory</b>. You'll catch a <b>page fault</b> in the act, follow its 11 stages, and then play judge: when memory is full, <b>which page gets thrown out?</b>",
            'ده الـ <b>virtual memory</b>. هتمسك <b>page fault</b> متلبّس، وتمشي وراه في الـ 11 مرحلة بتوعه، وبعدين تبقى إنت القاضي: لما الـ memory تتملي، <b>أنهي page تطلع برة؟</b>')}</${P}>
        `, { sec: t('Why virtual memory', 'ليه الـ virtual memory') }),

        // 2 · why
        page(html`
          <${H1}>${t("Why load what you won't use?", 'ليه تحمّل حاجة مش هتستخدمها؟')}</${H1}>
          <${P} small=${true}>${X('Code must be in memory to execute. But the <b>entire program is rarely used</b>:', 'الكود لازم يبقى في الـ memory عشان يتنفّذ. بس <b>البرنامج كله نادرًا ما بيتستخدم</b>:')}</${P}>
          <${UL} items=${A ? ['كود الـ <b>errors</b>', 'الـ <b>routines</b> اللي مش بتتستخدم كتير', 'الـ <b>data structures</b> الكبيرة', 'وحتى الأجزاء اللي بتتستخدم مش كلها محتاجينها في نفس الوقت.']
            : ['<b>error</b> code', '<b>unusual routines</b>', '<b>large data structures</b>', 'and even the parts you use are not all needed at the same time.']} />
          <${P} small=${true}>${X('So run a <b>partially loaded</b> program. What do you win?', 'يبقى شغّل برنامج <b>متحمّل جزء منه بس</b>. هتكسب إيه؟')}</${P}>
          <${UL} items=${A ? ['البرنامج <b>مابقاش محدود بالـ physical memory</b>.', 'كل برنامج بياخد memory أقل، فـ<b>برامج أكتر تشتغل في نفس الوقت</b>: الـ CPU utilization والـ throughput بيزيدوا، من غير ما الـ response أو الـ turnaround time يزيدوا.', 'الـ <bdi dir="ltr">I/O</bdi> اللي محتاجينه للتحميل أو الـ swap <b>بيقل</b>، فكل برنامج بيشتغل أسرع.']
            : ['The program is <b>no longer constrained by physical memory</b>.', 'Each program uses less memory, so <b>more programs run at the same time</b>: CPU utilization and throughput go up, with no increase in response or turnaround time.', '<b>Less I/O</b> to load or swap, so each program runs faster.']} />
                  `),

        // 3 · definition
        page(html`
          <${Def}>${X('<b>Virtual memory</b> = separation of user <b>logical memory</b> from <b>physical memory</b>. Only part of the program needs to be in memory.',
            'الـ <b>virtual memory</b> معناها فصل الـ <b>logical memory</b> بتاعة الـ user عن الـ <b>physical memory</b>. جزء بس من البرنامج محتاج يبقى في الـ memory.')}</${Def}>
          <${UL} items=${A ? ['الـ logical address space ممكن يبقى <b>أكبر بكتير</b> من الـ physical address space.', 'الـ address spaces ممكن <b>تتشارك</b> بين كذا process.', 'إنشاء الـ process بيبقى <b>أكفأ</b>.']
            : ['The logical address space can be <b>much larger</b> than the physical address space.', 'Address spaces can be <b>shared</b> by several processes.', 'Process creation is <b>more efficient</b>.']} />
          <${Def}>${X('<b>Virtual address space</b>: the logical view of how a process is stored, usually from <b>0</b> and <b>contiguous</b>. Physical memory is in <b>page frames</b>; the <b>MMU</b> maps logical to physical.',
            'الـ <b>virtual address space</b> هو النظرة المنطقية لتخزين الـ process: غالبًا من <b>0</b> و<b>contiguous</b>. والـ physical memory في <b>page frames</b>، والـ <b>MMU</b> بيعمل mapping من الـ logical للـ physical.')}</${Def}>
          <${P} small=${true}>${X('It is implemented via <b>demand paging</b> or <b>demand segmentation</b>. The rest of this chapter is demand paging.',
            'وبيتنفّذ عن طريق الـ <b>demand paging</b> أو الـ <b>demand segmentation</b>. وباقي الفصل عن الـ demand paging.')}</${P}>
          <${Grow} />
          <${Hand}>${t("Our analogy: you borrow this week's books, not the whole library.", 'تشبيه من عندنا: بتستلف كتب الأسبوع ده بس، مش المكتبة كلها.')}</${Hand}>
        `),

        // 4 · figure
        page(html`
          <${H2}>${t('Only the needed part is in memory', 'الجزء المطلوب بس هو اللي في الـ memory')}</${H2}>
          <${Fig} name="os-vm-space" />
        `),

        // 5 · demand paging
        page(html`
          <${H1}>${t('Demand paging: lazy on purpose', 'الـ Demand paging: كسلان عن قصد')}</${H1}>
          <${P}>${X('Bring a page into memory <b>only when it is needed</b>. It is similar to a paging system with swapping, and you get:', 'هات الـ page للـ memory <b>بس لما تحتاجها</b>. ده شبه paging system مع swapping، وبتكسب:')}</${P}>
          <${UL} items=${A ? ['الـ <bdi dir="ltr">I/O</bdi> أقل (مفيش <bdi dir="ltr">I/O</bdi> ملوش لازمة)', 'محتاج memory أقل', 'الـ response أسرع', 'عدد users أكتر'] : ['less I/O (no unnecessary I/O)', 'less memory needed', 'faster response', 'more users']} />
          <${Def}>${X('A <b>lazy swapper</b> never swaps a page into memory unless it will be needed. A swapper that deals with pages is a <b>pager</b>.',
            'الـ <b>lazy swapper</b> عمره ما بيعمل swap لـ page للـ memory إلا لو هتتحتاج. والـ swapper اللي بيتعامل مع pages اسمه <b>pager</b>.')}</${Def}>
          <${P} small=${true}>${X('A page is needed → reference it. An <b>invalid reference → abort</b>. <b>Not in memory → bring it into memory.</b>',
            'لما الـ page تبقى مطلوبة بنعملها reference. لو الـ reference <b>مش valid يبقى abort</b>. ولو الـ page <b>مش في الـ memory نجيبها</b>.')}</${P}>
          <${P} small=${true}>${X('If the pages it needs are already resident, nothing differs from ordinary paging. If not, the page must be detected and loaded <b>without changing program behaviour or code</b>. That needs new MMU functionality.',
            'لو الـ pages المطلوبة موجودة أصلًا، مفيش فرق عن الـ paging العادي. لو لأ، لازم الـ page تتكشف وتتحمّل <b>من غير ما سلوك البرنامج أو الكود يتغير</b>، وده محتاج وظايف جديدة في الـ MMU.')}</${P}>
        `, { sec: t('Demand paging', 'الـ Demand paging') }),

        // 6 · valid–invalid bit
        page(html`
          <${H2}>${t('The bit that says "not here"', 'الـ bit اللي بيقول "مش هنا"')}</${H2}>
          <${Def}>${X('Every page-table entry has a <b>valid–invalid bit</b>:<br/><b>v</b> = in memory (memory resident)<br/><b>i</b> = not in memory<br/>Initially <b>all entries are i</b>. If the MMU finds <b>i</b> during translation, a <b>page fault</b> occurs.',
            'كل page-table entry ليها <b>valid–invalid bit</b>:<br/>الـ <b>v</b> معناها إن الـ page في الـ memory (memory resident).<br/>الـ <b>i</b> معناها إنها مش في الـ memory.<br/>في الأول <b>كل الـ entries بتبقى i</b>. ولو الـ MMU لقى <b>i</b> وقت الترجمة، بيحصل <b>page fault</b>.')}</${Def}>
          <${Talk} who="mem">${X("A brand-new process? Every entry is <b>i</b>. I'm empty until someone asks.", 'عندك process لسه جديدة؟ كل الـ entries بـ <b>i</b>. أنا فاضية لحد ما حد يطلب.')}</${Talk}>
          <${Talk} who="os" flip=${true}>${X('And the moment the MMU meets an <b>i</b>, it traps to me.', 'وأول ما الـ MMU يقابل <b>i</b>، بيعمل trap ليّا أنا.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>i</b> does <b>not</b> mean "abort". A page fault goes to the OS, which looks at <b>another table</b>: only an <b>invalid reference</b> is aborted. A page that is just not in memory is brought in.',
            'الـ <b>i</b> <b>مش</b> معناها abort. الـ page fault بيروح للـ OS، وهو بيبص في <b>table تانية</b>: الـ <b>invalid reference</b> بس هو اللي بيتعمله abort. أما الـ page اللي مجرد مش في الـ memory فبتتجاب.')}</p></${Box}>
        `),

        // 7 · figure
        page(html`
          <${H2}>${t('Try it: reference some pages', 'جرّب: اعمل reference لشوية pages')}</${H2}>
          <${Fig} name="os-demand-paging" />
        `),

        // 8 · sort
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('What happens? Tap <b>H</b> for a hit (no fault), <b>F</b> for a page fault that brings the page in, or <b>A</b> for abort.',
            'هيحصل إيه؟ دوس <b>H</b> لو hit (مفيش fault)، أو <b>F</b> لو page fault والـ page هتتجاب، أو <b>A</b> لو abort.')}</p></${Box}>
          <${Sort} id="hfa" bins=${A ? [['H', 'موجودة (hit)'], ['F', 'حصل page fault'], ['A', 'إلغاء (abort)']] : [['H', 'Hit'], ['F', 'Page fault'], ['A', 'Abort']]} items=${A ? [
            ['الـ page-table entry عليها <b>v</b>', 0],
            ['الـ MMU لقى <b>i</b> وقت الترجمة، والـ page على الـ disk', 1],
            ['أول reference خالص بعد ما الـ process بدأت', 1],
            ['فيه reference لـ page برة الـ address space بتاع الـ process', 2],
            ['تاني reference لـ page لسه داخلة حالًا', 0],
            ['الـ OS بص في الـ table التانية ولقى الـ reference مش valid', 2],
            ['الـ page سليمة (legal) بس مش في الـ memory', 1]
          ] : [
            ['The page-table entry has <b>v</b>', 0],
            ['The MMU finds <b>i</b>; the page is on the disk', 1],
            ['The very first reference after the process starts', 1],
            ['A reference outside the process\'s address space', 2],
            ['A second reference to a page just brought in', 0],
            ['The OS checks the other table: the reference is invalid', 2],
            ['The page is legal but not in memory', 1]
          ]} />
        `),

        // 9 · page fault handling
        page(html`
          <${H1}>${t('Caught in the act: the page fault', 'متلبّس: الـ page fault')}</${H1}>
          <${P} small=${true}>${X('The first reference to a non-resident page <b>traps to the OS</b>. That trap is a <b>page fault</b>, and the OS handles it in five steps:',
            'أول reference لـ page مش موجودة في الـ memory <b>بيعمل trap للـ OS</b>. الـ trap ده اسمه <b>page fault</b>، والـ OS بيتعامل معاه في خمس خطوات:')}</${P}>
          ${steps(A ? ['الـ OS بيبص في <b>table تانية</b> عشان يقرر: لو الـ reference مش valid يبقى abort، ولو الـ page مجرد مش في الـ memory يكمّل.', 'يلاقي <b>free frame</b>.', 'يعمل swap للـ page جوه الـ frame عن طريق <b>disk operation متعملها schedule</b>.', 'يعدّل الـ tables عشان توضح إن الـ page بقت في الـ memory: <b>الـ validation bit يبقى v</b>.', 'يعمل <b>restart للـ instruction</b> اللي عملت الـ page fault.']
            : ['The OS looks at <b>another table</b> to decide: invalid reference → abort; just not in memory → continue.', 'Find a <b>free frame</b>.', 'Swap the page into the frame via a <b>scheduled disk operation</b>.', 'Reset the tables to show the page is now in memory: <b>set the validation bit = v</b>.', '<b>Restart the instruction</b> that caused the page fault.'])}
          <${Grow} />
          <${Talk} who="os">${X('Notice: the program never knows. Its instruction just runs again, and this time the page is there.', 'لاحظ: البرنامج عمره ما بيعرف. الـ instruction بتاعته بتتنفّذ تاني بس، والمرة دي الـ page موجودة.')}</${Talk}>
        `, { sec: t('Page faults', 'الـ Page faults') }),

        // 10 · figure
        page(html`
          <${H2}>${t('Handling a page fault, step by step', 'التعامل مع الـ page fault خطوة خطوة')}</${H2}>
          <${Fig} name="os-page-fault" />
        `),

        // 11 · put in order
        page(html`
          <${Box} kind="pencil" title=${t('Put them in order', 'رتّبهم')}><p className="hf-p small">${t('The five steps got shuffled. Tap them from first to last, then check.', 'الخمس خطوات اتلخبطوا. دوس عليهم من الأول للآخر، وبعدين صحّح.')}</p></${Box}>
          <${Order} id="ord" right=${[2, 4, 0, 3, 1]} items=${A ? ['خلّي الـ validation bit بـ <b>v</b>', 'اعمل restart للـ instruction', 'بص في الـ table التانية: abort ولا نكمّل؟', 'اعمل swap للـ page من الـ disk جوه الـ frame', 'لاقي free frame']
            : ['Set the validation bit to <b>v</b>', 'Restart the instruction', 'Check the other table: abort or continue?', 'Swap the page from disk into the frame', 'Find a free frame']} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Bit = <b>v</b> comes <b>before</b> the restart, or the instruction would just fault again.',
            'الـ bit بيبقى <b>v</b> <b>قبل</b> الـ restart، وإلا الـ instruction هتعمل fault تاني.')}</p></${Box}>
        `),

        // 12 · interview, part 1: stages 1–6
        page(html`
          <${Interview} title=${t('A Page Fault, exposed', 'الـ Page Fault على المكشوف')} sub=${t("This week's interview: the worst case of demand paging, in 11 stages.", 'حوار الأسبوع: أسوأ حالة في الـ demand paging، في 11 مرحلة.')} lines=${A ? [
            ['المذيع', 'إنت غلطة؟'],
            ['الـ Page Fault', 'لأ! أنا بحصل لما process تعمل reference لـ page مش في الـ memory. أول حاجة <b>trap للـ OS</b>، دي المرحلة 1.'],
            ['المذيع', 'وبعدين؟'],
            ['الـ Page Fault', 'الـ OS <b>بيحفظ الـ user registers والـ process state</b> (2)، ويحدد إن الـ interrupt كان page fault (3)، و<b>يتأكد إن الـ reference كان legal</b> ويحدد مكان الـ page على الـ disk (4).'],
            ['المذيع', 'وييجي دور الـ disk؟'],
            ['الـ Page Fault', 'أيوه: <b>read من الـ disk لـ free frame</b> (5). أستنى في الـ device queue لحد ما يتخدم، وأستنى الـ seek و/أو الـ latency، وبعدين نقل الـ page يبدأ.'],
            ['المذيع', 'والـ CPU قاعد يتفرج؟'],
            ['الـ Page Fault', 'لأ طبعًا. <b>وإحنا مستنيين، الـ CPU بيروح لـ user تاني</b> (6).']
          ] : [
            ['Head First', 'So, are you an error?'],
            ['Page Fault', "No! I happen when a process references a page that isn't in memory. First comes the <b>trap to the OS</b>: stage 1."],
            ['Head First', 'Then what?'],
            ['Page Fault', 'The OS <b>saves the user registers and process state</b> (2), determines that the interrupt was a page fault (3), and <b>checks the reference was legal</b> and finds my page on the disk (4).'],
            ['Head First', 'And then the disk?'],
            ['Page Fault', 'A <b>read from the disk to a free frame</b> (5): wait in the device queue until serviced, wait for the seek and/or latency, then the transfer begins.'],
            ['Head First', 'Meanwhile the CPU just waits?'],
            ['Page Fault', 'Never. <b>While waiting, the CPU goes to some other user</b> (6).']
          ]} />
        `, { sec: t('The 11 stages', 'الـ 11 مرحلة') }),

        // 13 · interview, part 2: stages 7–11, and dumb questions
        page(html`
          <${Interview} title=${t('…and after the disk', '…وبعد الـ disk')} lines=${A ? [
            ['المذيع', 'وتعرف منين إن الـ page وصلت؟'],
            ['الـ Page Fault', 'بييجي <b>interrupt من الـ disk <bdi dir="ltr">I/O</bdi> subsystem</b> (7). الـ OS بيحفظ الـ registers والـ state بتوع الـ user التاني (8)، و<b>يصحّح الـ page table</b> (9).'],
            ['المذيع', 'خلاص الـ process رجعت؟'],
            ['الـ Page Fault', 'لسه: <b>بتستنى الـ CPU</b> يتدّيلها تاني (10). وبعدين الـ registers والـ state والـ page table الجديدة <b>بيرجعوا</b>، والـ instruction <b>تكمّل</b> (11).']
          ] : [
            ['Head First', 'How do you know the page has arrived?'],
            ['Page Fault', 'An <b>interrupt from the disk I/O subsystem</b> (7). The OS saves the other user\'s registers and state (8), then <b>corrects the page table</b> (9).'],
            ['Head First', 'And the process is back?'],
            ['Page Fault', 'Not yet: it <b>waits for the CPU</b> again (10). Then its registers, state and new page table are <b>restored</b>, and the interrupted instruction <b>resumes</b> (11).']
          ]} />
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['يعني الـ page fault مش غلطة؟', 'لوحده لأ. الـ page اللي مش في الـ memory بتتجاب والـ instruction بتتعمل restart. الـ <b>invalid reference</b> بس هو اللي بيعمل abort.'],
            ['ليه الـ CPU بيروح لحد تاني في المرحلة 6؟', 'قراية الـ page فيها انتظار في الـ device queue وانتظار الـ seek والـ latency. فبدل ما الـ CPU يقعد فاضي، بيشغّل user تاني لحد ما الـ disk يعمل interrupt (7).']
          ] : [
            ['So a page fault is not an error?', 'No. The page is brought in and the instruction restarted. Only an <b>invalid reference</b> aborts.'],
            ['Why does the CPU go to someone else in stage 6?', 'The read waits in the device queue and for seek and latency. Rather than sit idle, the CPU runs another user until the disk interrupts (7).']
          ]} />
        `),

        // 14 · figure
        page(html`
          <${H2}>${t('The 11 stages, and who has the CPU', 'الـ 11 مرحلة، ومين ماسك الـ CPU')}</${H2}>
          <${Fig} name="os-fault-stages" />
        `),

        // 15 · page replacement
        page(html`
          <${H1}>${t("Memory's full. Now what?", 'الـ memory اتملت. نعمل إيه؟')}</${H1}>
          <${Talk} who="mem">${X('Every single frame is taken!', 'كل الـ frames مليانة!')}</${Talk}>
          <${P} small=${true}>${X('<b>No free frame?</b> <b>Page replacement</b>: find some page in memory that is not really in use and page it out. We want an algorithm with the <b>minimum number of page faults</b>. The same page may be brought in several times.',
            '<b>مفيش free frame؟</b> يبقى <b>page replacement</b>: دوّر على page في الـ memory مش مستخدمة فعلًا وطلّعها. عايزين algorithm يدّي <b>أقل عدد page faults</b>. ونفس الـ page ممكن تدخل كذا مرة.')}</${P}>
          ${steps(A ? ['لاقي مكان الـ page المطلوبة على الـ disk.', 'لاقي free frame: لو فيه استخدمه. لو مفيش، الـ page-replacement algorithm يختار <b>victim frame</b>، و<b>يتكتب على الـ disk لو dirty</b>.', 'هات الـ page المطلوبة في الـ frame اللي فضي، وحدّث الـ page والـ frame tables.', 'اعمل restart للـ instruction اللي عملت الـ trap.']
            : ['Find the location of the desired page on disk.', 'Find a free frame: if there is one, use it. If not, a page-replacement algorithm selects a <b>victim frame</b>, which is <b>written to disk if dirty</b>.', 'Bring the desired page into the freed frame; update the page and frame tables.', 'Restart the instruction that caused the trap.'])}
          <${Grow} />
          <${Hand} red=${true}>${X('So now there are potentially <b>2 page transfers</b> per page fault: out + in.', 'يعني دلوقتي ممكن يبقى فيه <b>2 page transfers</b> لكل page fault، واحد out وواحد in.')}</${Hand}>
        `, { sec: t('Page replacement', 'الـ Page replacement') }),

        // 16 · figure
        page(html`
          <${H2}>${t('One transfer or two?', 'عملية transfer واحدة ولا اتنين؟')}</${H2}>
          <${P} small=${true}>${X('Switch the victim between <b>dirty</b> and <b>clean</b>: a clean victim\'s copy on disk is already up to date, so only the new page is read in.',
            'بدّل الـ victim بين <b>dirty</b> و<b>clean</b>: الـ victim الـ clean نسخته على الـ disk لسه مظبوطة، فبنقرا الـ page الجديدة بس.')}</${P}>
          <${Fig} name="os-replace-basic" />
        `),

        // 17 · grading
        page(html`
          <${H2}>${t('Two algorithms, one report card', 'اتنين algorithms، وشهادة واحدة')}</${H2}>
          <${UL} items=${A ? ['الـ <b>frame-allocation</b> algorithm بيقرر كل process تاخد <b>كام frame</b>، وأنهي frames تتبدل.', 'الـ <b>page-replacement</b> algorithm عايز <b>أقل page-fault rate</b>، في أول access وفي الـ re-access كمان.']
            : ['The <b>frame-allocation</b> algorithm decides <b>how many frames</b> each process gets and which frames to replace.', 'The <b>page-replacement</b> algorithm wants the <b>lowest page-fault rate</b> on both first access and re-access.']} />
          <${P} small=${true}>${X('To grade one, run it on a <b>reference string</b> (page numbers only) and <b>count the faults</b>. The lecture\'s string, with 3 frames:',
            'عشان نقيّمه، نشغّله على <b>reference string</b> (أرقام pages بس) و<b>نعد الـ faults</b>. الـ string بتاع المحاضرة، بـ 3 frames:')}</${P}>
          <p className="hf-p hf-in" dir="ltr" style=${{ fontFamily: 'var(--mono)', fontSize: '14px', textAlign: 'center', fontWeight: 700 }}>${LECT.join(',')}</p>
          <${Box} kind="watch" title=${t('Watch it: what counts as a fault', 'خلّي بالك: إيه اللي بيتحسب fault')}>
            <ul className="hf-ul">${(A ? ['الـ access المتكرر لـ page موجودة أصلًا في الـ memory <b>مش fault</b>. يعني 22 reference مش معناها 22 fault.', 'كل مرة بنملا <b>frame فاضي في الأول</b> بتتحسب <b>fault</b> برضه.', 'النتايج <b>بتعتمد على عدد الـ frames</b>.']
              : ['Repeated access to a page already in memory is <b>not a fault</b>. 22 references do not mean 22 faults.', 'Every <b>empty-frame fill at the start</b> also <b>counts as a fault</b>.', 'Results <b>depend on the number of frames</b>.']).map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>
        `),

        // 18 · FIFO
        page(html`
          <${H1}>${t('FIFO: first in, first out', 'الـ FIFO: اللي دخل الأول يطلع الأول')}</${H1}>
          <${P} small=${true}>${X('Replace the page that has been in memory <b>the longest</b> (track it with a <b>FIFO queue</b>). Coloured = just loaded, F = fault.', 'استبدل الـ page اللي قعدت في الـ memory <b>أطول وقت</b> (بتتابعها بـ <b>FIFO queue</b>). الملوّن لسه داخل، وحرف F يعني fault.')}</${P}>
          <${FT} refs=${LECT} nf=${3} algo="FIFO" per=${11} />
          <p className="hf-os5-cnt hf-in">${X(`FIFO on the lecture string: <b>${faultsOf(LECT, 3, 'FIFO')} faults</b>`, `الـ FIFO على string المحاضرة بيعمل <b>${faultsOf(LECT, 3, 'FIFO')} fault</b>`)}</p>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('At #8, FIFO throws out page 2, the oldest. Who comes right back at #9?', 'عند رقم 8 الـ FIFO طلّع الـ page 2 لأنها الأقدم. مين رجع على طول عند رقم 9؟')}</p></${Box}>
        `, { sec: t('FIFO', 'الـ FIFO') }),

        // 19 · simulator
        page(html`
          <${H2}>${t('The simulator: FIFO, Optimal and LRU', 'المحاكي: الـ FIFO والـ Optimal والـ LRU')}</${H2}>
          <${Fig} name="os-replace-sim" />
        `),

        // 20 · Belady
        page(html`
          <${H2}>${t("Belady's anomaly: more frames, more faults?!", 'الـ Belady\'s anomaly: frames أكتر، faults أكتر؟!')}</${H2}>
          <${P} small=${true}>${X('FIFO on <code>1,2,3,4,1,2,5,1,2,3,4,5</code>, first with 3 frames, then with 4:', 'الـ FIFO على <code>1,2,3,4,1,2,5,1,2,3,4,5</code> بـ 3 ثم 4 frames:')}</${P}>
          <${FT} refs=${BEL} nf=${3} algo="FIFO" />
          <${FT} refs=${BEL} nf=${4} algo="FIFO" />
          <p className="hf-os5-cnt hf-in">${X(`3 frames: <b>${faultsOf(BEL, 3, 'FIFO')} faults</b>. 4 frames: <b>${faultsOf(BEL, 4, 'FIFO')} faults</b>.`, `بـ 3 frames فيه <b>${faultsOf(BEL, 3, 'FIFO')} faults</b>، وبـ 4 frames فيه <b>${faultsOf(BEL, 4, 'FIFO')}</b>.`)}</p>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X("FIFO only. LRU and OPT are <b>stack algorithms</b> and never suffer from it: \"LRU can suffer from Belady's anomaly\" is <b>False</b>.",
            'في الـ FIFO بس. الـ LRU والـ OPT <b>stack algorithms</b> وعمرهم ما بيعانوا منها، فدي <b>غلط</b>:' + L('"LRU can suffer from Belady\'s anomaly"'))}</p></${Box}>
        `, { sec: t("Belady's anomaly", 'الـ Belady\'s anomaly') }),

        // 21 · figure
        page(html`
          <${H2}>${t('Watch the anomaly happen', 'اتفرج على الـ anomaly وهي بتحصل')}</${H2}>
          <${Fig} name="os-belady" />
          <${Hand}>${t('switch to LRU or OPT: 4 frames never do worse', 'جرّب الـ LRU أو الـ OPT: الـ 4 frames عمرها ما بتبقى أوحش')}</${Hand}>
        `),

        // 22 · Optimal
        page(html`
          <${H1}>${t('Optimal: the fortune teller', 'الـ Optimal: قارئ المستقبل')}</${H1}>
          <${P} small=${true}>${X('Replace the page that <b>will not be used for the longest period of time</b>. That gives the fewest faults possible.', 'استبدل الـ page اللي <b>مش هتتستخدم لأطول فترة جاية</b>. وده بيدّي أقل عدد faults ممكن.')}</${P}>
          <${FT} refs=${LECT} nf=${3} algo="OPT" per=${11} />
          <p className="hf-os5-cnt hf-in">${X(`Optimal on the lecture string: <b>${faultsOf(LECT, 3, 'OPT')} faults</b>`, `الـ Optimal على string المحاضرة بيعمل <b>${faultsOf(LECT, 3, 'OPT')} faults</b>`)}</p>
          <${Hand}>${t('7, then 1, then 0 go out first. Next page: why', 'الـ 7 وبعدين الـ 1 وبعدين الـ 0 طلعوا الأول، والصفحة الجاية بتوضح ليه اتختار كل victim')}</${Hand}>
          <${Grow} />
          <${Talk} who="os">${X("Nobody can read the future. So OPT is used to <b>measure</b> how well the others perform.", 'محدش يقدر يعرف المستقبل. عشان كده الـ OPT بيستخدم عشان <b>نقيس</b> الـ algorithms التانية كويسة قد إيه.')}</${Talk}>
        `, { sec: t('Optimal', 'الـ Optimal') }),

        // 23 · figure
        page(html`
          <${H2}>${t('Why Optimal picks each victim', 'الـ Optimal بيختار كل victim ليه')}</${H2}>
          <${Fig} name="os-opt-why" />
        `),

        // 24 · LRU
        page(html`
          <${H1}>${t('LRU: judge by the past', 'الـ LRU: احكم بالماضي')}</${H1}>
          <${P} small=${true}>${X('<b>Least Recently Used</b>: use the past. Replace the page that <b>has not been used for the longest time</b>.', 'الـ <b>Least Recently Used</b>: استخدم الماضي. استبدل الـ page اللي <b>ماتستخدمتش من أطول وقت</b>.')}</${P}>
          <${FT} refs=${LECT} nf=${3} algo="LRU" per=${11} />
          <p className="hf-os5-cnt hf-in">${X(`LRU on the lecture string: <b>${faultsOf(LECT, 3, 'LRU')} faults</b>`, `الـ LRU على string المحاضرة بيعمل <b>${faultsOf(LECT, 3, 'LRU')} fault</b>`)}</p>
          <${P} small=${true}>${X('At 4 (8th reference), memory holds 2, 0, 3, last used at positions 4, 7 and 6. Page 2 is the least recently used, so it goes.',
            'عند الـ 4 (الـ reference التامن)، الـ memory فيها <bdi dir="ltr">2,&nbsp;0,&nbsp;3</bdi>، وآخر استخدام ليهم في الأماكن 4 و7 و6. يبقى الـ 2 هي الـ least recently used، فهي اللي تطلع.')}</${P}>
          <${Grow} />
          <${Hand} red=${true}>${X('12: <b>better than FIFO (15), worse than OPT (9)</b>. A generally good and frequently used algorithm.', 'الـ 12 <b>أحسن من الـ FIFO (15) وأوحش من الـ OPT (9)</b>. وهو algorithm كويس عمومًا وبيستخدم كتير.')}</${Hand}>
        `, { sec: t('LRU', 'الـ LRU') }),

        // 25 · figure
        page(html`
          <${H2}>${t('Why LRU picks each victim', 'الـ LRU بيختار كل victim ليه')}</${H2}>
          <${Fig} name="os-lru-why" />
        `),

        // 26–27 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: FIFO and LRU argue about who deserves to stay in memory.", 'قعدة الليلة: الـ FIFO والـ LRU بيتخانقوا مين يستاهل يفضل في الـ memory.')} />
          <${Chat} names=${[t('FIFO', 'الـ FIFO'), t('LRU', 'الـ LRU')]} lines=${A ? [
            [0, 'أنا بسيط. <b>FIFO queue</b>: لما الـ memory تتملي، اللي قعدت <b>أطول وقت</b> تطلع.'],
            [1, 'حتى لو الـ page القديمة دي هي اللي الكل بيستخدمها؟ أنا ببص على <b>الماضي</b>: اللي <b>ماتستخدمتش من أطول وقت</b> تطلع.'],
            [0, 'ماشي، على string المحاضرة عملت <b>15 fault</b>.'],
            [1, 'وأنا عملت <b>12</b>. أحسن منك، وأوحش من الـ OPT اللي عمل 9.'],
            [0, 'الـ OPT ده بيغش. بيقرا المستقبل!'],
            [1, 'ومحدش يقدر يعمل كده، فالـ OPT مجرد <b>مقياس</b> بنتقاس بيه.']
          ] : [
            [0, "I keep it simple. A <b>FIFO queue</b>: when memory is full, out goes the page that's been in memory <b>the longest</b>."],
            [1, 'Even if that old page is the one everybody keeps using? I look at the <b>past</b>: out goes the page that <b>hasn\'t been used for the longest time</b>.'],
            [0, 'Fine. On the lecture string I made <b>15 faults</b>.'],
            [1, 'And I made <b>12</b>. Better than you, worse than OPT\'s 9.'],
            [0, 'OPT cheats. It reads the future!'],
            [1, 'Nobody can, so OPT is just the <b>yardstick</b> the rest of us are measured with.']
          ]} />
        `, { sec: t('Fireside chat', 'دردشة جنب الدفاية') }),
        page(html`
          <${Chat} names=${[t('FIFO', 'الـ FIFO'), t('LRU', 'الـ LRU')]} lines=${A ? [
            [0, 'وعندي حركة: ادّيني <b>frames أكتر</b> وممكن أعمل <b>faults أكتر</b>. 9 بـ 3 frames، و10 بـ 4.'],
            [1, 'ده الـ <b>Belady\'s anomaly</b>، بتاعك إنت. أنا <b>stack algorithm</b> زي الـ OPT، وعمرنا ما بنعاني منه.'],
            [0, 'بس أنا رخيص. إنت محتاج ترتيب كل استخدام.'],
            [1, 'صح، محتاج مساعدة: <b>counters</b> فيها نسخة من الـ clock وsearch، أو <b>stack</b> بيغيّر 6 pointers.'],
            [0, 'طب نتقابل في النص: ادّيني <b>reference bit</b> وأبقى <b>second chance</b>.'],
            [1, 'كده الكل كسبان. ماعدا الـ victim.']
          ] : [
            [0, 'My party trick: give me <b>more frames</b> and I can make <b>more faults</b>. 9 with 3 frames, 10 with 4.'],
            [1, 'That\'s <b>Belady\'s anomaly</b>, and it\'s all yours. I\'m a <b>stack algorithm</b>, like OPT. We never suffer from it.'],
            [0, 'At least I\'m cheap. You need the order of every use.'],
            [1, 'True, I need help: <b>counters</b> with a clock copy and a search, or a <b>stack</b> with 6 pointer changes.'],
            [0, 'So meet me halfway: give me a <b>reference bit</b> and I become <b>second chance</b>.'],
            [1, 'Everybody wins. Except the victim.']
          ]} />
          <${Grow} />
          <${Hand}>${t('Trick (ours): FIFO asks "who came first?", LRU "who was used longest ago?", OPT "who is needed latest?"', 'حيلة (من عندنا): الـ FIFO بيسأل "مين دخل الأول؟"، والـ LRU "مين اتستخدم من زمان؟"، والـ OPT "مين هيتحتاج متأخر؟"')}</${Hand}>
        `),

        // 28 · be the page replacer
        page(html`
          <${Box} kind="pencil" title=${t('Be the page replacer', 'خليك إنت الـ page replacer')}><p className="hf-p small">${X("The doctors' <b>Final 2025/2026</b> string, 3 frames. At each reference, choose: hit, an empty frame, or which page goes out. Do all three algorithms.",
            'الـ string بتاع <b>امتحان الدكاترة 2025/2026</b>، بـ 3 frames. عند كل reference اختار: hit، ولا frame فاضي، ولا أنهي page تطلع. اعمل التلات algorithms.')}</p></${Box}>
          <${Replacer} id="rep" />
        `, { sec: t('Be the page replacer', 'خليك إنت الـ page replacer') }),

        // 29 · implementing LRU
        page(html`
          <${H1}>${t('How do you remember "least recently"?', 'تفتكر "الأقدم استخدامًا" إزاي؟')}</${H1}>
          <${P} small=${true}>${X('LRU needs to know the order of past uses. Two ways to keep it:', 'الـ LRU محتاج يعرف ترتيب الاستخدامات اللي فاتت. فيه طريقتين:')}</${P}>
          <div className="hf-os5-two hf-in">
            <div className="hf-os5-card"><b>${t('Counter', 'الـ Counter')}</b><span>${X('Every page entry has a counter. Each time the page is referenced, <b>copy the clock</b> into it.', 'كل page entry ليها counter. كل ما الـ page تتعملها reference، <b>انسخ الـ clock</b> فيه.')}</span>
              <span className="con">${t('To replace: search the table for the smallest counter.', 'عشان تستبدل لازم search في الـ table عن أصغر counter.')}</span></div>
            <div className="hf-os5-card"><b>${t('Stack', 'الـ Stack')}</b><span>${X('A stack of page numbers in <b>doubly-linked</b> form. A referenced page <b>moves to the top</b> (6 pointers change).', 'فيه stack بأرقام الـ pages على شكل <b>doubly-linked</b>. الـ page اللي اتعملها reference <b>تطلع فوق</b> (6 pointers بيتغيروا).')}</span>
              <span className="pro">${t('No search: the LRU page is at the bottom.', 'مفيش search: الـ LRU page في الآخر تحت.')}</span></div>
          </div>
          <${P} small=${true}>${X('The trade-off: the counter makes each reference cheap but replacement needs a <b>search</b>; the stack makes each update <b>more expensive</b> but replacement needs <b>no search</b>.',
            'الفرق: الـ counter بيخلّي كل reference رخيص بس الـ replacement محتاج <b>search</b>. والـ stack بيخلّي كل update <b>أغلى</b> بس الـ replacement <b>من غير search</b>.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Moving the page to the top of a stack" is the <b>stack</b> way, not the counter way. "Knowledge of future references" is <b>OPT</b>: LRU only uses the past.',
            'الـ "نقل الـ page لفوق الـ stack" دي طريقة الـ <b>stack</b> مش الـ counter. والـ "معرفة الـ references الجاية" دي بتاعة الـ <b>OPT</b>، أما الـ LRU فبيستخدم الماضي بس.')}</p></${Box}>
        `, { sec: t('Implementing LRU', 'تنفيذ الـ LRU') }),

        // 30 · figure
        page(html`
          <${H2}>${t('LRU two ways: counters and a stack', 'الـ LRU بطريقتين: counters وstack')}</${H2}>
          <${Fig} name="os-lru-impl" />
        `),

        // 31 · approximations + clock exercise
        page(html`
          <${H2}>${t('Cheaper: LRU approximations', 'أرخص: الـ LRU approximations')}</${H2}>
          <${Def}>${X('<b>Reference bit</b>: initially 0, set to 1 when the page is referenced. Replace any page with bit 0, but <b>we do not know the order</b>.',
            'الـ <b>reference bit</b>: في الأول 0، وبيبقى 1 لما الـ page تتعملها reference. استبدل أي page الـ bit بتاعها 0، بس <b>مانعرفش الترتيب</b>.')}</${Def}>
          <${Def}>${X('<b>Second chance (clock)</b> = FIFO + the hardware reference bit. If the page to be replaced has bit <b>0</b>, replace it. If <b>1</b>, set it to 0, leave the page in memory, and consider the next page by the same rules.',
            'الـ <b><bdi dir="ltr">second chance (clock)</bdi></b> هو FIFO مع الـ hardware reference bit. لو الـ bit بتاع الـ page اللي عليها الدور <b>0</b> استبدلها، ولو <b>1</b> خليه 0 وسيبها، وشوف اللي بعدها بنفس القواعد.')}</${Def}>
          <${Hand}>${t('Your turn: FIFO order with reference bits. Tap the victim.', 'دورك: ترتيب الـ FIFO ومعاه الـ reference bits. دوس على الـ victim.')}</${Hand}>
          <${Clock} id="clk" />
        `, { sec: t('LRU approximations', 'الـ LRU approximations') }),

        // 32 · figure
        page(html`
          <${H2}>${t('Second chance on the lecture string', 'الـ second chance على string المحاضرة')}</${H2}>
          <${Fig} name="os-second-chance" />
        `),

        // 33 · counting
        page(html`
          <${H2}>${t('Counting algorithms: LFU and MFU', 'العدّ: الـ LFU والـ MFU')}</${H2}>
          <${P} small=${true}>${X('Keep a <b>count of the references</b> to each page. <b>LFU</b> (Least Frequently Used) replaces the page with the <b>smallest count</b>. <b>MFU</b> (Most Frequently Used) replaces the page with the <b>largest count</b>, arguing that the page with the smallest count was probably just brought in and has yet to be used.',
            'بنعدّ <b>الـ references</b> لكل page. الـ <b>LFU</b> بيستبدل الـ page اللي ليها <b>أصغر count</b>. والـ <b>MFU</b> بيستبدل اللي ليها <b>أكبر count</b>، على أساس إن اللي ليها أصغر count غالبًا لسه داخلة ولسه ماتستخدمتش.' + L('LFU = Least Frequently Used<br/>MFU = Most Frequently Used'))}</${P}>
          <${Talk} who="table">${X('P = 5, Q = 2, R = 9. LFU throws out <b>Q</b>; MFU throws out <b>R</b>.', 'لو P بـ 5 وQ بـ 2 وR بـ 9، الـ LFU بيطلّع <b>Q</b>، والـ MFU بيطلّع <b>R</b>.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('LFU and MFU get swapped in exams. <b>L</b>FU removes the <b>L</b>owest count, <b>M</b>FU the <b>M</b>aximum. (Memory trick: ours.)',
            'الـ LFU والـ MFU بيتبدّلوا في الامتحانات. الـ <b>L</b>FU بيشيل الـ <b>L</b>owest count، والـ <b>M</b>FU بيشيل الـ <b>M</b>aximum. (الحيلة دي من عندنا.)')}</p></${Box}>
        `, { sec: t('Counting algorithms', 'الـ Counting algorithms') }),
        page(html`
          <${H2}>${t('Counting the lecture string', 'بنعدّ على string المحاضرة')}</${H2}>
          <${Fig} name="os-lfu-mfu" />
        `),

        // 34 · match
        page(html`
          <${H2}>${t('Who throws out whom?', 'مين بيطلّع مين؟')}</${H2}>
          <${P} small=${true}>${t('Match each algorithm to its rule. Tap an algorithm, then its rule.', 'وصّل كل algorithm بالقاعدة بتاعته. دوس على الـ algorithm، وبعدين على القاعدة.')}</${P}>
          <${Match} id="who" left=${['FIFO', 'Optimal', 'LRU', 'Second chance', 'LFU', 'MFU']}
            right=${A ? ['اللي ماتستخدمتش من أطول وقت', 'اللي ليها أكبر reference count', 'اللي قعدت في الـ memory أطول وقت', 'الـ bit بـ 1؟ يتمسح وتفضل. الـ bit بـ 0؟ تطلع', 'اللي مش هتتستخدم لأطول فترة جاية', 'اللي ليها أصغر reference count']
              : ['The page not used for the longest time', 'The page with the largest reference count', 'The page in memory the longest', 'Bit 1? Cleared and kept. Bit 0? Out', 'The page not used for the longest time to come', 'The page with the smallest reference count']}
            answer=${[2, 4, 0, 3, 5, 1]} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 35 · exam corner: the doctor's question
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("From the doctors' Final 2025/2026: the string you just played.", 'من امتحان الدكاترة 2025/2026، الـ string اللي لعبته.')}</p></${Box}>
          ${mq('m1', /0,3,2,1 using FIFO/)}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X("<b>Every final</b> from 2021/2022 to 2025/2026 has a FIFO / Optimal / LRU problem, and the strings change: 14 references gave 11, 8, 10, not the lecture's 15, 9, 12. Trace the table.",
            '<b>كل final</b> من 2021/2022 لـ 2025/2026 فيه مسألة FIFO وOptimal وLRU بـ string مختلف. هنا 11 و8 و10 مش 15 و9 و12. ارسم الجدول.')}</p></${Box}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),

        // 36–37 · practice questions (the site's own, not the doctor's)
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("These are the site's own practice questions, not the doctors'.", 'دي أسئلة تدريب من الموقع، مش من امتحانات الدكاترة.')}</p></${Box}>
          ${pq('p1', /^Belady's anomaly means/)}
        `),
        page(html`
          ${pq('p3', /require 2 page transfers/)}
          <${Gap} h=${4} />
          ${pq('p4', /second-chance algorithm, a candidate/)}
        `),

        // 38 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>virtual memory</b> بتفصل الـ logical عن الـ physical memory، فالـ logical space ممكن يبقى أكبر بكتير.',
            'الـ <b>demand paging</b> بيجيب الـ page بس لما تتحتاج (lazy swapper، أو pager).',
            'الـ <b>v</b> يعني في الـ memory، والـ <b>i</b> يعني لأ (في الأول كله i)، والـ i وقت الترجمة يعني <b>page fault</b>.',
            'في الـ page fault بنبص في الـ table التانية (invalid يبقى abort)، ونلاقي free frame ونقرا الـ page، والـ bit يبقى v، وبعدين restart.',
            'مفيش free frame؟ اختار <b>victim</b> واكتبه لو dirty، يعني ممكن 2 page transfers.',
            'على string المحاضرة بـ 3 frames: الـ <b>FIFO بـ 15</b>، والـ <b>OPT بـ 9</b> (المقياس)، والـ <b>LRU بـ 12</b>.',
            'الـ <b>Belady\'s anomaly</b> في الـ FIFO بس (9 ثم 10). والـ LRU والـ OPT دول stack algorithms.',
            'الـ second chance هو FIFO مع reference bit. والـ LFU بيشيل أصغر count، والـ MFU بيشيل أكبر count.'
          ] : [
            '<b>Virtual memory</b> separates logical from physical memory; only part of a program is in memory, so the logical space can be much larger.',
            '<b>Demand paging</b> brings a page in only when it is needed (lazy swapper / pager).',
            'Valid–invalid bit: <b>v</b> in memory, <b>i</b> not (initially all i). i during translation → <b>page fault</b>.',
            'Page fault: check the other table (invalid → abort), find a free frame, read the page in, set the bit to v, restart the instruction.',
            'No free frame? Pick a <b>victim</b>, write it out if dirty: up to 2 page transfers.',
            'Lecture string, 3 frames: <b>FIFO 15</b>, <b>OPT 9</b> (the minimum, a benchmark), <b>LRU 12</b>.',
            '<b>Belady\'s anomaly</b> (FIFO only): 9 faults with 3 frames, 10 with 4. LRU and OPT are stack algorithms.',
            'Second chance = FIFO + reference bit. LFU replaces the smallest count, MFU the largest.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 39 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 5!', 'خلّصت الفصل الخامس!')}</${H1}>
            <${Talk} who="mem">${t('Next time: processes and the resources they fight over. Deadlocks!', 'المرة الجاية: الـ processes والـ resources اللي بيتخانقوا عليها. الـ Deadlocks!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [5], t: Date.now() } }}>${t('Quiz me on Lecture 5', 'امتحنّي في محاضرة 5')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 5, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 5, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

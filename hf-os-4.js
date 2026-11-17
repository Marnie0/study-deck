// Head First chapter for Operating Systems Lecture 4 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Memory management, internal memory: base and limit registers, address binding, logical vs physical addresses and the MMU,
// dynamic loading, swapping, contiguous allocation, first/best/worst fit, fragmentation and compaction, segmentation, paging.
// Every fact, placement and address comes from the lecture's notes; our own analogies, tricks and practice numbers are marked
// as ours. ‡ marks a point the notes add to the slides. Arabic follows the site's rules (see hf-compiler.js).
// lectures: [4]
(function () {
  const H = window.HF; H.chapters.os = H.chapters.os || {};
  const { html } = H.K;
  const { useState } = React;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-os4')) {
    const s = document.createElement('style'); s.id = 'hf-css-os4';
    s.textContent = `
.hfb .hf-os4-tabs{ display:flex; gap:4px; }
.hfb .hf-os4-tabs button{ flex:1 1 0; min-width:0; font:700 13.5px/1.1 var(--body); min-height:32px; padding:4px 3px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-os4-tabs button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb.hf-ar .hf-os4-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-os4-card{ border:2px solid var(--hf-line); border-radius:8px; padding:8px 10px; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); display:grid; gap:6px; }
.hfb .hf-os4-kv{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:3px 8px; font-size:14px; line-height:1.3; color:var(--ink); align-items:baseline; }
.hfb .hf-os4-kv > span:nth-child(odd){ font:800 12.5px/1.3 var(--body); text-transform:uppercase; letter-spacing:.05em; color:var(--graphite); }
.hfb.hf-ar .hf-os4-kv{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.5; }
.hfb.hf-ar .hf-os4-kv > span:nth-child(odd){ font-family:"IBM Plex Sans Arabic", var(--body); text-transform:none; letter-spacing:0; font-size:13px; }
.hfb .hf-os4-track{ position:relative; height:44px; border:1.5px solid var(--hf-line); border-radius:6px; background:var(--hf-grey); overflow:hidden; }
.hfb .hf-os4-blk{ position:absolute; top:5px; bottom:5px; width:26%; border-radius:4px; background:var(--hf-k); color:var(--paper); display:grid; place-items:center; font:700 13px/1.1 var(--mono); transition:left .9s cubic-bezier(.3,.7,.2,1); }
.hfb .hf-os4-blk.calm{ transition:none; }
.hfb .hf-os4-ax{ display:flex; justify-content:space-between; font:600 13px/1 var(--mono); color:var(--graphite); margin-top:3px; }
.hfb .hf-os4-addr{ font:700 14px/1.35 var(--mono); color:var(--ink); text-align:center; }
.hfb .hf-os4-addr b{ color:var(--hf-k); }
.hfb .hf-os4-fg{ width:100%; border-collapse:collapse; table-layout:fixed; font:600 13px/1.1 var(--mono); color:var(--ink); }
.hfb .hf-os4-fg th, .hfb .hf-os4-fg td{ border:1px solid var(--hf-line); text-align:center; padding:0; height:34px; }
.hfb .hf-os4-fg thead th{ background:var(--hf-grey); font-weight:800; height:28px; }
.hfb .hf-os4-fg tbody th{ background:var(--hf-grey); color:var(--hf-k); font-weight:800; }
.hfb .hf-os4-fg td button{ width:100%; height:34px; border:0; margin:0; padding:0; background:var(--paper); color:var(--hf-hand); font:800 15px/1 var(--mono); cursor:pointer; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1px; }
.hfb .hf-os4-fg td button.hf-os4-sel{ background:color-mix(in srgb, var(--hf-hand) 16%, var(--paper)); }
.hfb .hf-os4-fg td button.hf-os4-ok{ background:color-mix(in srgb, var(--ok) 24%, var(--paper)); color:var(--ink); }
.hfb .hf-os4-fg td button.hf-os4-no{ background:color-mix(in srgb, var(--hf-red) 20%, var(--paper)); color:var(--ink); }
.hfb .hf-os4-fg td button small{ font:700 11.5px/1 var(--mono); color:var(--graphite); }
.hfb .hf-os4-xl{ display:grid; gap:5px; }
.hfb .hf-os4-xr{ display:grid; grid-template-columns:minmax(0,1fr) 78px 50px 16px; gap:5px; align-items:center; padding:2px 4px; border-radius:6px; border:1.5px solid transparent; }
.hfb .hf-os4-xr.hf-os4-ok{ border-color:var(--ok); } .hfb .hf-os4-xr.hf-os4-no{ border-color:var(--hf-red); }
.hfb .hf-os4-xq{ font:700 13.5px/1.2 var(--mono); color:var(--ink); }
.hfb .hf-os4-xr input{ width:100%; box-sizing:border-box; height:30px; font:700 14px/1 var(--mono); padding:0 6px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); }
.hfb .hf-os4-xr input:focus{ outline:2px solid var(--hf-hand); outline-offset:0; }
.hfb .hf-os4-xr .hf-os4-trap{ height:30px; padding:0; font:700 12.5px/1 var(--mono); border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-os4-xr .hf-os4-trap[aria-pressed="true"]{ border-color:var(--hf-red); background:var(--hf-red); color:var(--paper); }
.hfb .hf-os4-mk{ font:800 14px/1 var(--body); }
.hfb .hf-os4-ok .hf-os4-mk{ color:var(--ok); } .hfb .hf-os4-no .hf-os4-mk{ color:var(--hf-red); }
.hfb .hf-os4-why{ grid-column:1 / -1; font:600 13px/1.2 var(--mono); color:var(--hf-hand); }
.hfb .hf-os4-no .hf-os4-why{ color:var(--hf-red); }
.hfb .hf-os4-pt{ width:100%; table-layout:fixed; border-collapse:collapse; font:600 13px/1.2 var(--mono); color:var(--ink); }
.hfb .hf-os4-pt th, .hfb .hf-os4-pt td{ border:1px solid var(--hf-line); padding:3px 8px; text-align:center; }
.hfb .hf-os4-pt th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-os4-pt tbody th{ color:var(--hf-k); }
.hfb .hf-os4-cmp{ width:100%; border-collapse:collapse; table-layout:fixed; font-size:13.5px; line-height:1.25; color:var(--ink); }
.hfb .hf-os4-cmp th, .hfb .hf-os4-cmp td{ border:1px solid var(--hf-line); padding:4px 5px; vertical-align:top; text-align:start; }
.hfb .hf-os4-cmp thead th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-os4-cmp tbody th{ font-weight:700; color:var(--graphite); }
.hfb.hf-ar .hf-os4-cmp{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.4; }
`;
    document.head.appendChild(s);
  }

  // the three binding times: what code is made, whether logical = physical, and whether the process can move while it runs
  // (14000 + 346 is slide 10's example; the move to 30000 is our own number)
  function BindTimes() {
    const ar = useAr();
    const [k, setK] = H.K.useSlot('bind', 0);
    const [moved, setMoved] = useState(false);
    const base = k === 2 && moved ? 30000 : 14000;
    const TAB = ar ? ['الـ Compile', 'الـ Load', 'الـ Execution'] : ['Compile time', 'Load time', 'Execution time'];
    const ROW = ar ? [
      ['لو مكان الـ memory معروف من الأول بيطلع <b>absolute code</b>.', 'الـ logical والـ physical <b>نفس الحاجة</b>.', 'لو مكان البداية اتغير لازم تعمل <b>recompile</b>.'],
      ['لازم يطلع <b>relocatable code</b> لو المكان مش معروف وقت الـ compile.', 'الـ logical والـ physical <b>نفس الحاجة</b>.', 'الـ loader بيعمل bind للعناوين لما بيحمّل البرنامج.'],
      ['الـ binding <b>بيتأجل لوقت التشغيل</b>.', 'الـ logical والـ physical <b>بيختلفوا</b>.', 'الـ process <b>تقدر تتنقل وهي شغالة</b>، ومحتاج <b>دعم hardware</b> (الـ base والـ limit).']
    ] : [
      ['If the memory location is known a priori, <b>absolute code</b> is generated.', 'Logical and physical are the <b>same</b>.', 'If the starting location changes, you must <b>recompile</b>.'],
      ['<b>Relocatable code</b> must be generated if the location is not known at compile time.', 'Logical and physical are the <b>same</b>.', 'The loader binds the addresses when it loads the program.'],
      ['Binding is <b>delayed until run time</b>.', 'Logical and physical <b>differ</b>.', 'The process <b>can be moved during its execution</b>; needs <b>hardware support</b> (e.g. base and limit registers).']
    ];
    const r = ROW[k];
    const left = ((base - 10000) / 32000 * 100) + '%';
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-os4-tabs" role="group">${TAB.map((x, j) => html`<button key=${j} aria-pressed=${String(k === j)} onClick=${() => { setK(j); setMoved(false); }}>${x}</button>`)}</div>
      <div className="hf-os4-card" key=${k}>
        <div className="hf-os4-kv">
          <span>${ar ? 'الكود' : 'Code'}</span><span>${T(r[0])}</span>
          <span>${ar ? 'العناوين' : 'Addresses'}</span><span>${T(r[1])}</span>
          <span>${ar ? 'ملاحظة' : 'Note'}</span><span>${T(r[2])}</span>
        </div>
        <div dir="ltr">
          <div className="hf-os4-track"><div className=${'hf-os4-blk' + (calm() ? ' calm' : '')} style=${{ left }}>process</div></div>
          <div className="hf-os4-ax"><span>10000</span><span>26000</span><span>42000</span></div>
        </div>
        <p className="hf-os4-addr" dir="ltr">${k < 2 ? html`CPU <b>${base + 346}</b> → memory <b>${base + 346}</b>` : html`CPU <b>346</b> → MMU → memory <b>${base + 346}</b>`}</p>
        ${k === 2 ? html`<div className="hf-row" style=${{ justifyContent: 'center' }}><button className="hf-btn solid" onClick=${() => setMoved(!moved)}>${moved ? (ar ? 'رجّعها مكانها' : 'Move it back') : (ar ? 'انقل الـ process وهي شغالة' : 'Move the process while it runs')}</button></div>`
          : html`<p className="hf-hand red" style=${{ textAlign: 'center', fontSize: '18px' }}>${ar ? 'العناوين اتثبتت قبل التشغيل، فالـ process ماتقدرش تتنقل وهي شغالة' : 'addresses were fixed before it ran: it cannot move while it runs'}</p>`}
      </div>
    </div>`;
  }

  // be the allocator: place each process (in order) with first-fit, best-fit or worst-fit. Our own numbers, checked by hand and by script:
  // partitions 200, 450, 150, 350, 500 KB; processes 300, 180, 420, 140 KB
  const FP_PARTS = [200, 450, 150, 350, 500], FP_PROCS = [300, 180, 420, 140];
  const FP_ANS = { first: [1, 0, 4, 1], best: [3, 0, 1, 2], worst: [4, 1, 5, 3] };      // 5 = must wait
  const FP_LEFT = { first: [150, 20, 80, 10], best: [50, 20, 30, 10], worst: [200, 270, null, 210] };
  function FitPlay({ id }) {
    const ar = useAr();
    const [alg, setAlg] = H.K.useSlot(id + ':alg', 'first');
    const [pick, setPick] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', {});
    const mine = pick[alg] || {}, checked = !!chk[alg], ans = FP_ANS[alg];
    const right = FP_PROCS.filter((_, i) => mine[i] === ans[i]).length;
    const set = (i, j) => { setPick(Object.assign({}, pick, { [alg]: Object.assign({}, mine, { [i]: j }) })); setChk(Object.assign({}, chk, { [alg]: false })); };
    const NM = { first: 'First-fit', best: 'Best-fit', worst: 'Worst-fit' };
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '4px' }}>
      <div className="hf-os4-tabs" role="group" dir="ltr">${['first', 'best', 'worst'].map(a => html`<button key=${a} aria-pressed=${String(alg === a)} onClick=${() => setAlg(a)}>${NM[a]}</button>`)}</div>
      <div dir="ltr"><table className="hf-os4-fg"><thead><tr><th>KB</th>${FP_PARTS.map(p => html`<th key=${p}>${p}</th>`)}<th style=${{ fontSize: '12px' }}>wait</th></tr></thead>
        <tbody>${FP_PROCS.map((p, i) => html`<tr key=${i}><th>${p}</th>${[0, 1, 2, 3, 4, 5].map(j => {
          const on = mine[i] === j, st = checked && on ? (j === ans[i] ? ' hf-os4-ok' : ' hf-os4-no') : (on ? ' hf-os4-sel' : '');
          const showLeft = checked && on && j === ans[i] && j < 5;
          return html`<td key=${j}><button className=${st.trim()} aria-pressed=${String(on)} aria-label=${p + ' KB → ' + (j < 5 ? FP_PARTS[j] + ' KB partition' : 'must wait')} onClick=${() => set(i, j)}>${on ? (j < 5 ? '√' : '✕') : ''}${showLeft ? html`<small>${FP_LEFT[alg][i]}</small>` : null}</button></td>`; })}</tr>`)}</tbody></table></div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(mine).length} onClick=${() => setChk(Object.assign({}, chk, { [alg]: true }))}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; ans.forEach((j, i) => { m[i] = j; }); setPick(Object.assign({}, pick, { [alg]: m })); setChk(Object.assign({}, chk, { [alg]: true })); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / 4</bdi></span>`}
      </div>
      ${checked && html`<p className="hf-p small" style=${{ color: 'var(--graphite)' }}>${ar ? 'الرقم الصغير تحت ✓ هو الـ KB اللي فضلت في الـ hole.' : 'The small number under each ✓: KB left in that hole.'}</p>`}
      ${checked && right === 4 && html`<p className="hf-hand" style=${{ fontSize: '18px' }}>${alg === 'worst'
        ? (ar ? html`الـ 420 مستنية مع إن <bdi dir="ltr">1170 KB</bdi> فاضيين: external fragmentation!` : '420 waits though 1170 KB is free: external fragmentation!')
        : alg === 'first' ? (ar ? 'الـ 140 دخلت في الـ 150 الفاضلين من الـ 450.' : '140 went into the 150 KB left in the 450.')
        : (ar ? 'الأربعة اتحطوا، كل مرة في أصغر hole تكفي.' : 'All four placed, each in the smallest hole that fits.')}</p>`}
    </div>`;
  }

  // translate logical → physical, or say "trap". rows: [question (notation), answer (number or 'trap'), working (notation)]
  function Xlate({ id, rows }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const ok = i => String(v[i] == null ? '' : v[i]).replace(/[\s,]/g, '') === String(rows[i][1]);
    const right = rows.filter((_, i) => ok(i)).length;
    const put = (i, x) => { setV(Object.assign({}, v, { [i]: x })); setChecked(false); };
    return html`<div className="hf-in">
      <div className="hf-os4-xl" dir="ltr">${rows.map((r, i) => {
        const st = checked ? (ok(i) ? ' hf-os4-ok' : ' hf-os4-no') : '';
        const isTrap = v[i] === 'trap';
        return html`<div key=${i} className=${'hf-os4-xr' + st}>
          <span className="hf-os4-xq">${T(r[0])}</span>
          <input type="text" inputMode="numeric" value=${isTrap ? '' : (v[i] || '')} placeholder=${isTrap ? '' : '?'} aria-label=${'Physical address for ' + String(r[0]).replace(/<[^>]+>/g, '')} onInput=${e => put(i, e.target.value)} />
          <button className="hf-os4-trap" aria-pressed=${String(isTrap)} onClick=${() => put(i, isTrap ? '' : 'trap')}>trap</button>
          <span className="hf-os4-mk">${checked ? (ok(i) ? '✓' : '✗') : ''}</span>
          ${checked ? html`<span className="hf-os4-why">${T(r[2])}</span>` : null}</div>`; })}</div>
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; rows.forEach((r, i) => { m[i] = String(r[1]); }); setV(m); setChecked(true); }}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${rows.length}</bdi></span>`}
      </div></div>`;
  }

  H.chapters.os[4] = {
    title: 'Memory Management: Internal Memory',
    kicker: 'Chapter 4',
    run: 'memory management',
    ar: { title: 'إدارة الـ Memory: الـ Internal Memory', kicker: 'الفصل 4', run: 'إدارة الـ memory' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, MCQ, Reveal, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 4);
      const arL = (window.AR && window.AR.os && window.AR.os.lectures && window.AR.os.lectures[4]) || {};
      const arQuiz = arL.quiz || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctor's own questions (src set) and the site's practice questions (no src), with the Arabic "why" for each choice
      const find = (re, doc) => { const i = lec.quiz.findIndex(x => re.test(strip(x.q)) && (doc ? !!x.src : !x.src)); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = find(re, true); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const pq = (id, re) => { const r = find(re, false); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const pt = (rows, head) => html`<table className="hf-os4-pt hf-in" dir="ltr"><thead><tr>${head.map((h, j) => html`<th key=${j}>${h}</th>`)}</tr></thead><tbody>${rows.map((r, i) => html`<tr key=${i}>${r.map((c, j) => j ? html`<td key=${j}>${c}</td>` : html`<th key=${j}>${c}</th>`)}</tr>`)}</tbody></table>`;
      return [
        // 0 · where we left off + how this chapter works
        page(html`
          <${H2}>${t('Where we left off', 'وقفنا فين؟')}</${H2}>
          <${P} small=${true}>${X('Last chapter, the <b>CPU scheduler</b> picked which ready process runs next: FCFS, SJF, priority, round robin. But every one of those processes has to be <b>sitting in memory</b> to run at all.',
            'في الفصل اللي فات، الـ <b>CPU scheduler</b> كان بيختار أنهي process جاهزة تشتغل بعد كده: الـ FCFS والـ SJF والـ priority والـ round robin. بس كل process من دول لازم تكون <b>قاعدة في الـ memory</b> عشان تشتغل أصلًا.')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('Five processes want to run and memory is one long row of bytes. Where does each one go? What stops process 3 from scribbling over process 4, or over the OS itself? And what if they don\'t all fit?',
            'خمس processes عايزين يشتغلوا، والـ memory صف طويل من الـ bytes. كل واحدة تتحط فين؟ وإيه اللي يمنع الـ process رقم 3 إنها تكتب فوق الـ process رقم 4، أو فوق الـ OS نفسه؟ وطب لو مش كلهم داخلين؟')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will place processes in holes and translate addresses yourself.', '<b>حل التمارين.</b> هتحط processes في holes وتترجم addresses بإيدك.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps.', '<b>خلّي بالك!</b> دي فخاخ الامتحان.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a point the notes add to the slides.', 'معناها نقطة النوتس زوّدتها على السلايدز.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and practice numbers.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" دي تشبيهات وأرقام تدريب مننا.')}</span></div>
          </div>
        `, { sec: t('Where we left off', 'وقفنا فين؟') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">4</span><span className="t">${A ? html`الفصل الرابع<br/>Operating Systems` : html`Chapter four<br/>Operating Systems`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Who Lives Where?', 'مين ساكن فين؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('memory management: internal memory', 'إدارة الـ memory: الـ internal memory')}</p></div>
          <${P}>${X('A program on disk is just a file. To run, it must be <b>brought into memory and placed within a process</b>.', 'البرنامج اللي على الـ disk مجرد file. عشان يشتغل لازم <b>يتجاب للـ memory ويتحط جوه process</b>.')}</${P}>
          <${Talk} who="proc">${X('I just got here from the disk. Which room is mine?', 'لسه جاية من الـ disk. فين أوضتي؟')}</${Talk}>
          <${Talk} who="mem" flip=${true}>${X("I'm one long row of addresses. The <b>OS</b> decides who gets which part, and makes sure nobody wanders into someone else's.", 'أنا صف طويل من الـ addresses. والـ <b>OS</b> هو اللي بيقرر مين ياخد أنهي حتة، وبيتأكد إن محدش يدخل حتة حد تاني.')}</${Talk}>
          <${Hand} tilt=${true}>${t("Our analogy, not the slides': memory is a hotel, processes are guests, the OS is the front desk.", 'تشبيه من عندنا: الـ memory فندق، والـ processes نزلاء، والـ OS هو الريسبشن.')}</${Hand}>
        `, { sec: t('Meet main memory', 'اتعرّف على الـ main memory') }),

        // 2 · background
        page(html`
          <${H1}>${t('What the CPU can reach', 'الـ CPU بيوصل لإيه؟')}</${H1}>
          <${Def}>${X('<b>Main memory and registers</b> are the only storage the CPU can access directly.', 'الـ <b>main memory والـ registers</b> هما الـ storage الوحيد اللي الـ CPU يقدر يوصله مباشرةً.')}</${Def}>
          <${UL} items=${A ? [
            'الـ <b>register</b> بياخد CPU clock واحدة أو أقل، والـ <b>main memory</b> ممكن تاخد cycles كتير.',
            'الـ <b>cache</b> قاعد في النص بين الـ main memory والـ CPU registers.',
            'الـ memory unit مابتشوفش غير سلسلة <b>addresses + read requests</b>، أو <b>address + data</b> مع <b>write requests</b>.'
          ] : [
            'A <b>register</b> takes one CPU clock (or less); <b>main memory</b> can take many cycles.',
            'The <b>cache</b> sits between main memory and the CPU registers.',
            'The memory unit only sees a stream of <b>addresses + read requests</b>, or <b>address + data and write requests</b>.'
          ]} />
          <${Talk} who="mem">${X("I don't know who's asking or why. I just see an address and a read or a write.", 'أنا مش عارفة مين بيسأل ولا ليه. أنا بشوف address وread أو write وخلاص.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('If memory itself can\'t tell whose address it is, who must check that a process only touches its own part? <b>Protection of memory</b> is required to ensure correct operation.',
            'لو الـ memory مش عارفة الـ address بتاع مين، مين يتأكد إن الـ process مابتلمسش غير حتتها؟ الـ <b>protection</b> بتاع الـ memory لازم عشان الشغل يمشي صح.')}</p></${Box}>
        `),

        // 3 · base and limit
        page(html`
          <${H2}>${t('Two registers guard the door', 'اتنين registers على الباب')}</${H2}>
          <${Def}>${X('A pair of <b>base</b> and <b>limit</b> registers define the logical address space of a process.',
            'زوج <b>base</b> و<b>limit</b> registers بيحددوا الـ logical address space بتاع الـ process.')}</${Def}>
          <${Fig} name="os-base-map" />
        `, { sec: t('Base and limit', 'الـ Base والـ limit') }),

        // 4 · hardware address protection
        page(html`
          <${H2}>${t('Slide 4: every address gets checked', 'سلايد 4: كل address بيتشيّك عليه')}</${H2}>
          <${Fig} name="os-base-limit" />
        `),

        // 5 · watch it on the legal range
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('An access is legal only if <b>base ≤ address &lt; base + limit</b>. The first test is <b>≥</b>, the second is a strict <b>&lt;</b>. So with base 300040 and limit 120900, 420940 is <b>not</b> legal: it is where the next process starts. The last legal address is <b>420939</b>.',
            'الـ access يبقى legal بس لو:<span class="ltr"><b>base ≤ address &lt; base + limit</b></span>الشرط الأول <b>≥</b> والتاني <b>&lt;</b> بس من غير يساوي. فلو الـ base هو 300040 والـ limit هو 120900، يبقى 420940 <b>مش</b> legal، ده مكان بداية الـ process اللي بعدها. وآخر address legal هو <b>420939</b>.')}</p></${Box}>
          <${P} small=${true}>${X('The CPU checks <b>every</b> memory access generated in <b>user mode</b>.', 'الـ CPU بيتشيك على <b>كل</b> memory access طالع من الـ <b>user mode</b>.')}</${P}>
          <${Talk} who="os" flip=${true}>${X('Fail either test and the CPU <b>traps</b> to me, the operating system monitor: <b>addressing error</b>.', 'لو وقع في أي شرط فيهم الـ CPU بيعمل <b>trap</b> ليّا، أنا الـ operating system monitor، وده اسمه <b>addressing error</b>.')}</${Talk}>
          <${Grow} />
          <${Dumb} qa=${A ? [
            ['الـ limit ده آخر address؟', 'لأ، الـ limit هو <b>الطول</b>. آخر address هو <bdi dir="ltr">base + limit − 1</bdi>.']
          ] : [
            ['Is the limit the last address?', 'No, the limit is the <b>length</b>. The last legal address is base + limit − 1.']
          ]} />
        `),

        // 6 · address binding
        page(html`
          <${H1}>${t('An address changes clothes', 'الـ address بيغيّر هدومه')}</${H1}>
          <${P} small=${true}>${X('Programs on disk, ready to be brought into memory, form an <b>input queue</b>. Without support, a program must be loaded at address <b>0000</b>, which is inconvenient. The way out: addresses are represented differently at each stage, and each <b>binding</b> maps one address space to another.',
            'البرامج اللي على الـ disk وجاهزة تتجاب للـ memory بتكوّن <b>input queue</b>. ومن غير دعم، البرنامج لازم يتحمّل عند العنوان <b>0000</b>، وده مش مريح. الحل إن الـ addresses بتتمثل بشكل مختلف في كل مرحلة، وكل <b>binding</b> بيعمل mapping من address space لواحدة تانية.')}</${P}>
          <${Code} lines=${[['count', t('symbolic (source code)', 'في الـ source code بيبقى symbolic')], ['"14 bytes from beginning', ''], [' of this module"', t('relocatable (compiler)', 'بعد الـ compiler بيبقى relocatable')], ['74014', t('absolute (linker or loader)', 'بعد الـ loader بيبقى absolute')]]} />
          <${Hand} arrow="up">${t('"count" is our example of a variable; the other two are the slide\'s', 'الـ count مثال من عندنا لـ variable، والاتنين التانيين من السلايد')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Binding of instructions and data to memory addresses can happen at <b>three different stages</b>. Before you turn the page: which stage would let a process <b>move</b> while it runs?',
            'الـ binding بتاع الـ instructions والـ data للـ memory addresses ممكن يحصل في <b>3 مراحل مختلفة</b>. قبل ما تقلب الصفحة: أنهي مرحلة فيهم تخلّي الـ process <b>تتنقل</b> وهي شغالة؟')}</p></${Box}>
        `, { sec: t('Address binding', 'الـ Address binding') }),

        // 7 · three binding times
        page(html`
          <${H2}>${t('Three moments to bind', 'تلات أوقات للـ binding')}</${H2}>
          <${P} small=${true}>${t('Tap each binding time and see what the CPU sends and what memory receives.', 'دوس على كل وقت binding وشوف الـ CPU بيبعت إيه والـ memory بيوصلها إيه.')}</${P}>
          <${BindTimes} />
          <${Hand}>${X('14000 + 346 is slide 10\'s example; moving to 30000 is ours', 'الحسبة <bdi dir="ltr">14000 + 346</bdi> من سلايد 10، والنقل لـ 30000 من عندنا')}</${Hand}>
        `),

        // 8 · multistep processing
        page(html`
          <${H2}>${t('Slide 7: from source program to memory image', 'سلايد 7: من الـ source program للـ memory image')}</${H2}>
          <${Fig} name="os-binding-steps" />
        `),

        // 9 · logical vs physical
        page(html`
          <${H1}>${t('Logical vs physical', 'الـ Logical والـ physical')}</${H1}>
          <${Def}>${X('<b>Logical address</b>: generated by the CPU; also called a <b>virtual address</b>.<br/><b>Physical address</b>: the address seen by the memory unit.',
            'الـ <b>Logical address</b>: الـ CPU هو اللي بيطلّعه، واسمه كمان <b>virtual address</b>.<br/>الـ <b>Physical address</b>: العنوان اللي الـ memory unit بتشوفه.')}</${Def}>
          <${UL} items=${A ? [
            'الـ <b>logical address space</b>: كل الـ virtual addresses اللي الـ CPU بيطلّعها وقت التنفيذ.',
            'الـ <b>physical address space</b>: كل الـ actual addresses اللي بتقابلهم. ‡',
            'الاتنين <b>نفس الحاجة</b> في الـ compile-time والـ load-time binding، و<b>بيختلفوا</b> في الـ execution-time.'
          ] : [
            '<b>Logical address space</b>: all the virtual addresses the CPU generates during execution.',
            '<b>Physical address space</b>: all the actual addresses corresponding to them. ‡',
            'They are <b>the same</b> with compile-time and load-time binding, and <b>differ</b> with execution-time binding.'
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('The slide says the physical address space is "generated by a program". It isn\'t: the program generates <b>logical</b> addresses and <b>never sees</b> the physical ones (slides 8 and 9).',
            'السلايد بيقول إن الـ physical address space:<span class="ltr">"generated by a program"</span>ده مش صح: البرنامج بيطلّع <b>logical</b> addresses و<b>عمره ما بيشوف</b> الـ physical (سلايد 8 و9).')}</p></${Box}>
        `, { sec: t('Logical vs physical, MMU', 'الـ Logical والـ physical والـ MMU') }),

        // 10 · MMU
        page(html`
          <${Def}>${X('The <b>MMU</b> (Memory-Management Unit) is a <b>hardware device</b> that maps virtual to physical addresses <b>at run time</b>. Simplest scheme: the <b>relocation register</b> (the base register\'s new name) is added to every address a user process sends to memory.',
            'الـ <b>MMU</b> (Memory-Management Unit) ده <b>hardware device</b> بيعمل mapping من virtual لـ physical addresses <b>وقت التشغيل</b>. أبسط طريقة: الـ <b>relocation register</b> (ده الاسم الجديد للـ base register) بيتجمع على كل address الـ user process بتبعته للـ memory.')}</${Def}>
          <${Fig} name="os-mmu-reloc" />
        `),

        // 11 · dynamic loading
        page(html`
          <${H1}>${t("Don't load what you don't call", 'ماتحمّلش اللي مش هتناديه')}</${H1}>
          <${Def}>${X('<b>Dynamic loading</b>: a routine is <b>not loaded until it is called</b>.', 'الـ <b>Dynamic loading</b>: الـ routine <b>مابتتحمّلش غير لما تتنادى</b>.')}</${Def}>
          <${UL} items=${A ? [
            'استخدام أحسن لمساحة الـ memory: الـ routine اللي مش مستخدمة <b>عمرها ما بتتحمّل</b>.',
            'كل الـ routines متخزنة على الـ disk بـ <b>relocatable load format</b>.',
            'مفيدة لما يبقى فيه كود كبير عشان <b>حالات نادرة الحدوث</b>، زي كود الـ error handling. ‡',
            'مش محتاجة <b>دعم خاص من الـ OS</b>: بتتعمل بتصميم البرنامج، والـ OS ممكن يساعد بـ libraries.'
          ] : [
            'Better memory-space utilization: an unused routine is <b>never loaded</b>.',
            'All routines are kept on disk in <b>relocatable load format</b>.',
            'Useful when large amounts of code handle <b>infrequently occurring cases</b>, e.g. error-handling code. ‡',
            'No <b>special support from the OS</b> is required: it is done through program design; the OS can help by providing libraries.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X("Slide 10's title says <b>Dynamic relocation</b> (its picture is the MMU), but its bullets are about <b>dynamic loading</b>.",
            'عنوان سلايد 10 <b><bdi dir="ltr">Dynamic relocation</bdi></b> (والرسمة هي الـ MMU)، بس الـ bullets بتاعتها عن الـ <b>dynamic loading</b>.')}</p></${Box}>
        `, { sec: t('Dynamic loading', 'الـ Dynamic loading') }),

        // 12 · swapping
        page(html`
          <${H1}>${t('Not enough room? Swap!', 'مفيش مكان؟ اعمل swap!')}</${H1}>
          <${Def}>${X('A process can be <b>swapped</b> temporarily out of memory to a <b>backing store</b>, and then brought back into memory for continued execution. So the total memory of all processes can <b>exceed physical memory</b>.',
            'الـ process ممكن تتعملها <b>swap</b> مؤقتًا برّه الـ memory لـ <b>backing store</b>، وبعدين ترجع تكمّل تنفيذ. فمجموع memory الـ processes كلها ممكن <b>يعدّي الـ physical memory</b>.')}</${Def}>
          <${Talk} who="disk">${X("That's me, the <b>backing store</b>: a fast disk, big enough for copies of all users' memory images, with <b>direct access</b> to them.", 'ده أنا، الـ <b>backing store</b>: disk سريع وكبير كفاية يشيل نسخ من كل الـ memory images بتاعة الـ users، وفيه <b>direct access</b> ليهم.')}</${Talk}>
          <${UL} items=${A ? [
            'الـ <b><bdi dir="ltr">roll out, roll in</bdi></b>: نوع swapping مع الـ priority-based scheduling. اللي أولويتها أقل تطلع، عشان اللي أعلى تدخل وتتنفذ.',
            'السيستم بيحتفظ بـ <b>ready queue</b> للـ processes الجاهزة اللي الـ memory images بتاعتها على الـ disk.',
            'لو الـ process الجاية مش في الـ memory، لازم swap out وswap in، فالـ <b>context switch time</b> ممكن يبقى عالي جدًا.'
          ] : [
            '<b>Roll out, roll in</b>: swapping for priority-based scheduling. A lower-priority process is swapped out so a higher-priority one can be loaded and run.',
            'The system keeps a <b>ready queue</b> of ready processes whose memory images are on disk.',
            'If the next process is not in memory, we swap one out and swap it in, so the <b>context switch time</b> can be very high.'
          ]} />
        `, { sec: t('Swapping', 'الـ Swapping') }),

        // 13 · swapping figure
        page(html`
          <${H2}>${t('Slides 12–13: swap out, swap in', 'سلايد 12 و13: الـ swap out والـ swap in')}</${H2}>
          <${Fig} name="os-swapping" />
        `),

        // 14 · swap time
        page(html`
          <${P}>${X('The major part of swap time is <b>transfer time</b>, and it is <b>directly proportional</b> to the amount of memory swapped.', 'الجزء الأكبر من وقت الـ swap هو الـ <b>transfer time</b>، وهو <b>بيتناسب طرديًا</b> مع كمية الـ memory اللي بتتنقل.')}</${P}>
          <${Code} lines=${['100 MB ÷ 50 MB/s = 2 s = 2000 ms', ['+ swap in, same size: 2000 ms', ''], ['= 4000 ms = 4 s', t('slide 13', 'سلايد 13')]]} />
          <${Box} kind="watch"><p className="hf-p small">${X('The question asks for the swapping part of the <b>context switch</b>: that is swap <b>out</b> plus swap <b>in</b>. Answering 2 s forgets half of it.',
            'السؤال بيسأل على جزء الـ swapping في الـ <b>context switch</b>، وده swap <b>out</b> زائد swap <b>in</b>. لو جاوبت 2 ثانية تبقى نسيت نصه.')}</p></${Box}>
          <${Box} kind="pencil"><p className="hf-p small">${X('Your turn (our numbers): a <b>200 MB</b> process, the same 50 MB/s disk, swapped out and a same-sized process swapped in. Total?',
            'دورك (أرقام من عندنا): process حجمها <bdi dir="ltr">200 MB</bdi>، على نفس الـ disk بتاع <bdi dir="ltr">50 MB/s</bdi>، تطلع وتدخل مكانها process بنفس الحجم. الإجمالي كام؟')}</p>
            <${Gap} h=${4} />
            <${Reveal} id="swap">${html`<${Code} lines=${['200 ÷ 50 = 4 s = 4000 ms (out)', '+ 4000 ms (in) = 8000 ms = 8 s']} />`}</${Reveal}></${Box}>
        `),

        // 15 · contiguous allocation
        page(html`
          <${H1}>${t('One piece per process', 'حتة واحدة لكل process')}</${H1}>
          <${P} small=${true}>${X('Memory must hold both the OS and user processes, and it is limited, so it must be allocated efficiently. <b>Contiguous allocation</b> is one early method.', 'الـ memory لازم تشيل الـ OS والـ user processes مع بعض، وهي محدودة، فلازم تتوزع بكفاءة. والـ <b>contiguous allocation</b> طريقة من الطرق الأولى.')}</${P}>
          <${UL} items=${A ? [
            'الـ memory بتتقسم لـ <b>two partitions</b>: الـ <b>resident OS</b> في الـ <b>low memory</b> ومعاه الـ interrupt vector، والـ <b>user processes</b> في الـ <b>high memory</b>.',
            'كل process في <b>section واحدة contiguous</b>.',
            'الـ <b>relocation registers</b> بتحمي الـ user processes من بعض، وبتمنع تغيير code وdata الـ OS.',
            'الـ <b>base register</b> فيه أصغر physical address.',
            'الـ <b>limit register</b> فيه الـ range بتاع الـ logical addresses: كل logical address لازم يبقى <b>أقل من الـ limit</b>.',
            'الـ <b>MMU</b> بيعمل mapping للـ logical address <i>dynamically</i>.'
          ] : [
            'Memory is usually split into <b>two partitions</b>: the <b>resident OS</b> in <b>low memory</b> with the interrupt vector, and <b>user processes</b> in <b>high memory</b>.',
            'Each process is in a <b>single contiguous section</b>.',
            '<b>Relocation registers</b> protect user processes from each other, and from changing OS code and data.',
            'The <b>base register</b> holds the smallest physical address.',
            'The <b>limit register</b> holds the range of logical addresses: each logical address must be <b>less than the limit</b>.',
            'The <b>MMU</b> maps the logical address <i>dynamically</i>.'
          ]} />
        `, { sec: t('Contiguous allocation', 'الـ Contiguous allocation') }),

        // 16 · slide 15
        page(html`
          <${H2}>${t('Slide 15: limit first, then relocate', 'سلايد 15: الـ limit الأول، وبعدين الـ relocation')}</${H2}>
          <${Fig} name="os-reloc-limit" />
        `),

        // 17 · slide 4 vs slide 15 + exercise
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Slide 4</b> checks the address against <b>base</b> and <b>base + limit</b>. <b>Slide 15</b> checks the <b>logical</b> address against the <b>limit</b> only, <b>then</b> adds the relocation register.',
            'في <b>سلايد 4</b> بيقارن الـ address بالـ <b>base</b> وبالـ <b><bdi dir="ltr">base + limit</bdi></b>. وفي <b>سلايد 15</b> بيقارن الـ <b>logical</b> address بالـ <b>limit</b> بس، و<b>بعدين</b> يجمع الـ relocation register.')}</p></${Box}>
          <${Box} kind="pencil" title=${t('Be the MMU', 'خليك إنت الـ MMU')}><p className="hf-p small">${X('Relocation = <b>14000</b> (slide 10), limit = <b>1200</b> (ours). Type the physical address of each logical address, or tap <b>trap</b>.',
            'الـ relocation قيمته <b>14000</b> (سلايد 10)، والـ limit قيمته <b>1200</b> (من عندنا). اكتب الـ physical address لكل logical address، أو دوس <b>trap</b>.')}</p></${Box}>
          <${Xlate} id="xr" rows=${[
            ['346', 14346, '346 &lt; 1200 → 14000 + 346 = 14346'],
            ['1199', 15199, '1199 &lt; 1200 → 14000 + 1199 = 15199'],
            ['1200', 'trap', '1200 ≥ 1200 → trap']
          ]} />
        `),

        // 18 · holes and the fit algorithms
        page(html`
          <${H1}>${t('Which hole?', 'أنهي hole؟')}</${H1}>
          <${P} small=${true}>${X('<b>Multiple partitions</b> of <b>variable</b> size (the number of partitions limits the degree of multiprogramming). A <b>hole</b> is a block of available memory; holes are scattered throughout memory, and the OS tracks allocated and free partitions. The <b>dynamic storage-allocation problem</b>: how to satisfy a request of size <i>n</i> from the list of free holes?',
            'الـ memory فيها <b>multiple partitions</b> أحجامها <b>variable</b> (وعددهم بيحدد الـ degree of multiprogramming). والـ <b>hole</b> هو block من الـ memory المتاحة، والـ holes متفرقة، والـ OS بيتابع الـ allocated والـ free partitions. والـ <b>dynamic storage-allocation problem</b>: إزاي نلبّي request حجمه <i>n</i> من لستة الـ free holes؟')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>First-fit</b>: <b>أول</b> hole كبيرة كفاية.',
            'الـ <b>Best-fit</b>: <b>أصغر</b> hole كبيرة كفاية. لازم تدوّر في اللستة كلها إلا لو مترتبة بالحجم، وبيسيب <b>أصغر</b> leftover.',
            'الـ <b>Worst-fit</b>: <b>أكبر</b> hole. برضه بيدوّر في اللستة كلها، وبيسيب <b>أكبر</b> leftover.'
          ] : [
            '<b>First-fit</b>: the <b>first</b> hole that is big enough.',
            '<b>Best-fit</b>: the <b>smallest</b> hole that is big enough. Must search the whole list unless it is ordered by size; leaves the <b>smallest</b> leftover.',
            '<b>Worst-fit</b>: the <b>largest</b> hole. Also searches the whole list; leaves the <b>largest</b> leftover.'
          ]} />
          <${Def}>${X('First-fit and best-fit are better than worst-fit in terms of <b>speed and storage utilization</b>.', 'الـ First-fit والـ best-fit أحسن من الـ worst-fit في <b>السرعة واستغلال الـ storage</b>.')}</${Def}>
          <${Talk} who="os" flip=${true}>${X('A process exits? I free its partition and <b>combine adjacent free partitions</b>.', 'process خرجت؟ بفضّي الـ partition بتاعتها و<b>أجمّع الـ free partitions اللي جنب بعض</b>.')}</${Talk}>
        `, { sec: t('Holes: first, best, worst fit', 'الـ Holes والـ first والـ best والـ worst fit') }),

        // 19 · slide 16: holes
        page(html`
          <${H2}>${t('Slide 16: holes appear and get filled', 'سلايد 16: الـ holes بتظهر وبتتملى')}</${H2}>
          <${Fig} name="os-holes" />
        `),

        // 20 · slide 18-19 simulation
        page(html`
          <${H2}>${t("Slides 18–19: the lecture's example", 'سلايد 18 و19: مثال المحاضرة')}</${H2}>
          <${Fig} name="os-fit-sim" />
        `),

        // 21 · slide 20 grid
        page(html`
          <${H2}>${t('Slide 20: the same answer as a table', 'سلايد 20: نفس الإجابة في table')}</${H2}>
          <${Fig} name="os-fit-grid" />
          <${Box} kind="watch"><p className="hf-p small">${X('Go through the processes <b>in order</b>, and after each placement the hole <b>shrinks</b>: under first-fit, 112 goes into the <b>288 K left</b> in the 500 (500 − 212). Only <b>best-fit</b> places all four, so it is the most efficient here.',
            'امشي على الـ processes <b>بالترتيب</b>، وبعد كل placement الـ hole <b>بتصغر</b>: في الـ first-fit الـ 112 بتروح للـ <b><bdi dir="ltr">288 K</bdi> اللي فضلوا</b> من الـ 500 (يعني <bdi dir="ltr">500 − 212</bdi>). والـ <b>best-fit</b> بس هو اللي حط الأربعة، فهو الأكفأ هنا.')}</p></${Box}>
        `),

        // 22 · be the allocator
        page(html`
          <${Box} kind="pencil" title=${t('Be the allocator', 'خليك إنت الـ allocator')}><p className="hf-p small">${X('Our numbers: partitions <b>200, 450, 150, 350, 500 KB</b> (in order), processes <b>300, 180, 420, 140 KB</b> (in order). Pick an algorithm and tap where each process goes, or <b>wait</b>. Track the leftovers in your head, like in the exam.',
            'أرقام من عندنا: الـ partitions بالترتيب<span class="ltr"><b>200, 450, 150, 350, 500 KB</b></span>والـ processes بالترتيب<span class="ltr"><b>300, 180, 420, 140 KB</b></span>اختار algorithm ودوس مكان كل process.')}</p></${Box}>
          <${FitPlay} id="fit" />
        `, { sec: t('Exercise: be the allocator', 'تمرين: خليك إنت الـ allocator') }),

        // 23 · fragmentation
        page(html`
          <${H1}>${t('Wasted space, two flavours', 'مساحة ضايعة، نوعين')}</${H1}>
          <${Def}>${X('<b>External fragmentation</b>: total memory space exists to satisfy a request, but it is <b>not contiguous</b>. It occurs with variable partitions and segmentation. ‡',
            'الـ <b>External fragmentation</b>: إجمالي المساحة موجود ويكفي الطلب، بس <b>مش contiguous</b>. وبيحصل مع الـ variable partitions والـ segmentation. ‡')}</${Def}>
          <${Def}>${X('<b>Internal fragmentation</b>: allocated memory may be <b>slightly larger</b> than requested; the difference is memory <b>inside</b> a partition that is <b>not being used</b>. It occurs with fixed-size blocks, so paging still has it. ‡',
            'الـ <b>Internal fragmentation</b>: الـ memory المتخصصة ممكن تبقى <b>أكبر شوية</b> من المطلوب، والفرق ده memory <b>جوه</b> الـ partition <b>مش مستخدمة</b>. وبيحصل مع الـ fixed-size blocks، فالـ paging لسه فيه. ‡')}</${Def}>
          <${Talk} who="proc">${X('Outside: plenty of free rooms, but none big enough for me. <b>External.</b>', 'برّه: أوض فاضية كتير، بس ولا واحدة تساعني. ده <b>external</b>.')}</${Talk}>
          <${Talk} who="proc" flip=${true}>${X('Inside: I got a room bigger than I need, and nobody else can use the rest. <b>Internal.</b>', 'جوه: خدت أوضة أكبر من احتياجي، ومحدش غيري يقدر يستخدم الباقي. ده <b>internal</b>.')}</${Talk}>
        `, { sec: t('Fragmentation', 'الـ Fragmentation') }),

        // 24 · external fragmentation figure
        page(html`
          <${H2}>${t('Free memory in pieces, then compaction', 'memory فاضية متقطعة، وبعدين compaction')}</${H2}>
          <${Fig} name="os-ext-frag" />
        `),

        // 25 · compaction
        page(html`
          <${H1}>${t('Compaction', 'الـ Compaction')}</${H1}>
          <${Def}>${X('Reduce external fragmentation by <b>compaction</b>: <b>defragment</b> memory contents to place all free memory together in one large block.',
            'بنقلل الـ external fragmentation بالـ <b>compaction</b>: نعمل <b>defragment</b> لمحتويات الـ memory عشان كل الـ free memory تتجمع في block واحد كبير.')}</${Def}>
          <${Box} kind="watch"><p className="hf-p small">${X('Compaction is possible <b>only if relocation is dynamic</b>, and it is done at <b>execution time</b>. With compile-time or load-time binding a process cannot be moved.',
            'الـ compaction ينفع <b>بس لو الـ relocation dynamic</b>، وبيتعمل وقت الـ <b>execution</b>. مع الـ compile-time أو الـ load-time binding الـ process ماتقدرش تتنقل.')}</p></${Box}>
          <${Box} kind="brain"><p className="hf-p small">${X('A job is doing I/O and compaction wants to move it. The slide\'s two fixes: <b>latch the job in memory</b> during I/O, or do I/O <b>only into OS buffers</b>.',
            'فيه job بتعمل I/O والـ compaction عايز ينقلها. الحلين في السلايد: <b>نثبّت (latch) الـ job في الـ memory</b> وقت الـ I/O، أو نعمل I/O في <b>الـ OS buffers بس</b>.')}</p></${Box}>
          <${Talk} who="disk" flip=${true}>${X('And I, the backing store, have the <b>same fragmentation problems</b>.', 'وأنا كمان، الـ backing store، عندي <b>نفس مشاكل الـ fragmentation</b>.')}</${Talk}>
        `),

        // 26 · sort: internal or external
        page(html`
          <${Box} kind="pencil" title=${t('Internal or external?', 'internal ولا external؟')}><p className="hf-p small">${X('Tap <b>I</b> for internal or <b>E</b> for external fragmentation, then check.', 'دوس <b>I</b> للـ internal أو <b>E</b> للـ external، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="frag" bins=${[['I', 'Internal'], ['E', 'External']]} items=${A ? [
            ['الـ free memory الكلية تكفي، بس مش contiguous', 1],
            ['الـ process خدت memory أكبر شوية من طلبها', 0],
            ['آخر page في الـ process مليانة لنصها بس', 0],
            ['فيه holes متفرقة بين الـ variable partitions', 1],
            ['بيحصل مع الـ segmentation', 1],
            ['بيحصل مع الـ fixed-size blocks', 0],
            ['الـ compaction بيقلله', 1],
            ['أسوأ حالة: frame إلا byte واحد', 0],
            ['الـ paging بيتجنبه', 1]
          ] : [
            ['Total free memory is enough, but not contiguous', 1],
            ['A process got slightly more memory than it asked for', 0],
            ['The last page of a process is only half full', 0],
            ['Holes scattered between variable partitions', 1],
            ['Happens with segmentation', 1],
            ['Happens with fixed-size blocks', 0],
            ['Compaction reduces it', 1],
            ['Worst case: 1 frame − 1 byte', 0],
            ['Paging avoids it', 1]
          ]} />
        `),

        // 27 · segmentation: user view
        page(html`
          <${H1}>${t('Memory the way you see it', 'الـ memory زي ما إنت شايفها')}</${H1}>
          <${Def}>${X('<b>Segmentation</b> supports the <b>user view of memory</b>. A program is a collection of <b>segments</b>: logical units such as main program, procedure, function, object, local and global variables, stack, symbol table, arrays.',
            'الـ <b>Segmentation</b> بيدعم <b>نظرة الـ user للـ memory</b>. البرنامج مجموعة <b>segments</b>، وكل segment وحدة منطقية زي الـ main program والـ function والـ object والـ variables والـ stack والـ symbol table والـ arrays.')}</${Def}>
          <${Fig} name="os-seg-view" />
        `, { sec: t('Segmentation', 'الـ Segmentation') }),

        // 28 · segment table
        page(html`
          <${H2}>${t('The segment table', 'الـ segment table')}</${H2}>
          <${P} small=${true}>${X('A logical address is a two tuple <b>&lt;segment-number, offset&gt;</b>. The <b>segment table</b> maps it to a physical address. Each entry has a <b>base</b> (the starting physical address of the segment) and a <b>limit</b> (its length).',
            'الـ logical address بيتكون من اتنين:<span class="ltr"><b>&lt;segment-number, offset&gt;</b></span>والـ <b>segment table</b> بتحوّله لـ physical address. وكل entry فيها <b>base</b> (أول physical address للـ segment) و<b>limit</b> (طوله).')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>STBR</b> بيشاور على مكان الـ table في الـ memory.',
            'الـ <b>STLR</b> هو عدد الـ segments، والـ s يبقى legal بس لو:<span class="ltr"><b>s &lt; STLR</b></span>',
            'الـ <b>validation bit</b> لو قيمته 0 يبقى الـ segment illegal، ومعاه صلاحيات <bdi dir="ltr">r/w/x</bdi>.',
            'مشاركة الكود بتحصل <b>على مستوى الـ segment</b>.'
          ] : [
            '<b>STBR</b> (segment-table base register) points to the table in memory.',
            '<b>STLR</b> (segment-table length register) is the number of segments; s is legal only if <b>s &lt; STLR</b>.',
            'A <b>validation bit</b> (0 ⇒ illegal segment) and <b>read/write/execute</b> privileges per entry.',
            '<b>Code sharing occurs at segment level</b>.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The slide says the table maps "two-dimensional <b>physical</b> addresses". The two-dimensional one is the <b>logical</b> address &lt;s, d&gt;.',
            'السلايد كاتب:<span class="ltr">"maps two-dimensional physical addresses"</span>والصح إن اللي بُعدين هو الـ <b>logical</b> address.')}</p></${Box}>
        `),

        // 29 · segmentation hardware
        page(html`
          <${H2}>${t('Slide 27: segmentation hardware', 'سلايد 27: الـ segmentation hardware')}</${H2}>
          <${Fig} name="os-seg-hw" />
        `),

        // 30 · translation figure
        page(html`
          <${H2}>${t('Slide 28 and review Q6', 'سلايد 28 والسؤال 6 من الـ review')}</${H2}>
          <${Fig} name="os-segment-xlate" />
        `),

        // 31 · segmentation exercise
        page(html`
          <${Box} kind="pencil" title=${t('Be the hardware', 'خليك إنت الـ hardware')}><p className="hf-p small">${X("Slide 28's segment table, new offsets (ours), STLR = 5. Type the physical address of each (s, d), or tap <b>trap</b>.", 'نفس الـ segment table بتاعة سلايد 28، بس offsets جديدة من عندنا، والـ STLR قيمته 5. اكتب الـ physical address لكل <bdi dir="ltr">(s, d)</bdi>، أو دوس <b>trap</b>.')}</p></${Box}>
          ${pt([['limit', 1000, 400, 400, 1100, 1000], ['base', 1400, 6300, 4300, 3200, 4700]], ['s', 0, 1, 2, 3, 4])}
          <${Xlate} id="xs" rows=${[
            ['(1, 399)', 6699, '399 &lt; 400 → 6300 + 399 = 6699'],
            ['(4, 1000)', 'trap', '1000 ≥ 1000 → trap'],
            ['(3, 1099)', 4299, '1099 &lt; 1100 → 3200 + 1099 = 4299'],
            ['(5, 10)', 'trap', 's = 5 ≥ STLR = 5 → trap']
          ]} />
        `),

        // 32 · paging
        page(html`
          <${H1}>${t('Paging: same-size rooms', 'الـ Paging: أوض كلها بنفس المقاس')}</${H1}>
          <${P} small=${true}>${X('With paging, the physical address space of a process can be <b>noncontiguous</b>: it gets memory wherever memory is available. That <b>avoids external fragmentation</b> and the problem of varying-sized chunks.',
            'مع الـ paging، الـ physical address space بتاع الـ process ممكن يبقى <b>noncontiguous</b>: بتاخد memory في أي حتة فاضية. وده <b>بيتجنب الـ external fragmentation</b> ومشكلة الحتت اللي أحجامها مختلفة.')}</${P}>
          <${UL} items=${A ? [
            'الـ physical memory بتتقسم لـ blocks ثابتة اسمها <b>frames</b>. حجمها power of 2، من <bdi dir="ltr">512 bytes</bdi> لحد <bdi dir="ltr">16 Mbytes</bdi>.',
            'الـ logical memory بتتقسم لـ blocks بنفس الحجم اسمها <b>pages</b>. والـ backing store كمان بيتقسم لـ pages.',
            'الـ OS بيتابع كل الـ <b>free frames</b>. عشان تشغّل برنامج حجمه <b>N</b> pages، لاقي <b>N</b> free frames.',
            'الـ <b>page table</b> بتترجم من logical لـ physical.',
            'بس الـ paging <b>لسه فيه internal fragmentation</b>.'
          ] : [
            'Physical memory is divided into fixed-size blocks called <b>frames</b>; the size is a power of 2, between 512 bytes and 16 Mbytes.',
            'Logical memory is divided into blocks of the same size called <b>pages</b>. The backing store is split into pages too.',
            'The OS keeps track of all <b>free frames</b>. To run a program of <b>N</b> pages, find <b>N</b> free frames.',
            'A <b>page table</b> translates logical to physical addresses.',
            'Paging <b>still has internal fragmentation</b>.'
          ]} />
          <${Talk} who="mem" flip=${true}>${X('Any free frame will do. Your pages don\'t even have to sit next to each other.', 'أي frame فاضية تنفع. والـ pages بتاعتك مش لازم تقعد جنب بعض أصلًا.')}</${Talk}>
        `, { sec: t('Paging', 'الـ Paging') }),

        // 33 · paging hardware
        page(html`
          <${H2}>${t('Slides 30–31: paging hardware', 'سلايد 30 و31: الـ paging hardware')}</${H2}>
          <${Fig} name="os-paging-hw" />
        `),

        // 34 · paging model
        page(html`
          <${H2}>${t('Slide 32: pages, page table, frames', 'سلايد 32: الـ pages والـ page table والـ frames')}</${H2}>
          <${Fig} name="os-paging-model" />
        `),

        // 35 · DIV / MOD
        page(html`
          <${H2}>${t('Translating by hand: DIV and MOD ‡', 'الترجمة بالإيد: الـ DIV والـ MOD ‡')}</${H2}>
          <${Code} lines=${['p = logical DIV page size', 'd = logical MOD page size', 'physical = frame(p) × page size + d']} />
          <${P} small=${true}>${X('Page size 1 KB = 1024 B, page table 0 → 1, 1 → 4, 2 → 3, 3 → 7:', 'لو الـ page size هو <bdi dir="ltr">1 KB = 1024 B</bdi>، والـ page table فيها:<span class="ltr">0 → 1, 1 → 4, 2 → 3, 3 → 7</span>')}</${P}>
          <${Code} lines=${['logical 2500', ['p = 2500 DIV 1024 = 2', ''], ['d = 2500 − 2048 = 452', ''], ['frame(2) = 3', t('look it up', 'من الـ table')], '3 × 1024 + 452 = 3524']} />
          <${Box} kind="watch"><p className="hf-p small">${X('The offset <b>d never changes</b>: only p is replaced by f. In bits: p = the high <b>m − n</b> bits, d = the low <b>n</b> bits. E.g. a 16-bit address with 4 KB pages (n = 12): p = 4 bits, d = 12 bits. ‡',
            'الـ offset <b>d عمره ما بيتغير</b>، الـ p بس هي اللي بتتبدل بالـ f. وبالـ bits:<span class="ltr">p = high m − n bits, d = low n bits</span>ومثال على كده: ‡<span class="ltr">16-bit address, 4 KB page → p = 4, d = 12 bits</span>')}</p></${Box}>
        `, { sec: t('Paging by hand', 'الـ Paging بالإيد') }),

        // 36 · paging exercise
        page(html`
          <${Box} kind="pencil" title=${t('Be the paging hardware', 'خليك إنت الـ hardware')}><p className="hf-p small">${X('Page size 1024 B, the same page table. Find p and d, then type the physical address. (2500 is the notes\' example; the rest are ours.)', 'الـ page size هو <bdi dir="ltr">1024 B</bdi> بنفس الـ page table. طلّع الـ p والـ d واكتب الـ physical address. والـ 2500 مثال النوتس، والباقي من عندنا.')}</p></${Box}>
          ${pt([['frame', 1, 4, 3, 7]], ['page', 0, 1, 2, 3])}
          <${Xlate} id="xp" rows=${[
            ['2500', 3524, 'p = 2, d = 452 → 3 × 1024 + 452 = 3524'],
            ['100', 1124, 'p = 0, d = 100 → 1 × 1024 + 100 = 1124'],
            ['1030', 4102, 'p = 1, d = 6 → 4 × 1024 + 6 = 4102'],
            ['3071', 4095, 'p = 2, d = 1023 → 3 × 1024 + 1023 = 4095']
          ]} />
        `),

        // 37 · internal fragmentation calculation
        page(html`
          <${H2}>${t('Slide 33: how much does the last frame waste?', 'سلايد 33: آخر frame بيضيّع قد إيه؟')}</${H2}>
          <${Fig} name="os-page-frag" />
        `, { sec: t('Internal fragmentation', 'حساب الـ internal fragmentation') }),

        // 38 · page size trade-off + pencil
        page(html`
          <${UL} items=${A ? [
            'أسوأ حالة: <bdi dir="ltr">1 frame − 1 byte</bdi>. وفي المتوسط: <b>نص frame</b>.',
            'يبقى نصغّر الـ frames؟ بس كل <b>page table entry</b> بياخد memory. فالـ pages الأصغر معناها fragmentation أقل، بس entries أكتر. ‡',
            'أحجام الـ pages <b>بتكبر مع الوقت</b>، والـ Solaris بيدعم حجمين: <bdi dir="ltr">8 KB</bdi> و<bdi dir="ltr">4 MB</bdi>.',
            'نظرة الـ process والـ physical memory بقوا مختلفين جدًا، والـ process <b>تقدر توصل للـ memory بتاعتها بس</b>.'
          ] : [
            'Worst case: <b>1 frame − 1 byte</b>. On average: <b>½ frame</b>.',
            'So small frames are better? But each <b>page table entry</b> takes memory. Smaller pages: less fragmentation, more entries. ‡',
            'Page sizes are <b>growing over time</b>; Solaris supports two: 8 KB and 4 MB.',
            'The process view and physical memory are now very different, and a process <b>can only access its own memory</b>.'
          ]} />
          <${Box} kind="pencil"><p className="hf-p small">${X('Your turn (our numbers): page size <b>4,096 B</b>, process <b>10,000 B</b>. How many frames, and how much internal fragmentation?',
            'دورك (أرقام من عندنا): الـ page size هو <bdi dir="ltr">4,096 B</bdi>، والـ process حجمها <bdi dir="ltr">10,000 B</bdi>. محتاجة كام frame، والـ internal fragmentation قد إيه؟')}</p>
            <${Gap} h=${4} />
            <${Reveal} id="ifrag">${html`<${Code} lines=${['2 × 4,096 = 8,192', '10,000 − 8,192 = 1,808 B', '→ 3 frames', '4,096 − 1,808 = 2,288 B']} />`}</${Reveal}></${Box}>
        `),

        // 39 · fireside chat 1
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Segmentation and Paging argue about the best way to hand out memory.", 'قعدة الليلة: الـ Segmentation والـ Paging بيتخانقوا مين أحسن طريقة لتوزيع الـ memory.')} />
          <${Chat} names=${[t('Segmentation', 'الـ Segmentation'), t('Paging', 'الـ Paging')]} lines=${A ? [
            [0, 'أنا بشوف البرنامج زي ما المبرمج شايفه، فالـ main program والـ stack والـ functions كل واحد فيهم <b>segment</b>.'],
            [1, 'وأنا بقطّع كل حاجة لـ <b>pages بنفس الحجم</b>، وأحطها في أي <b>frames</b> فاضية، حتى لو مش جنب بعض.'],
            [0, 'العنوان عندي segment ومعاه offset، وكل entry عندي فيها <b>base وlimit</b>.'],
            [1, 'وعندي page ومعاها offset، وكل entry فيها <b>رقم frame</b> بس.'],
            [1, 'وكمان <b>مفيش external fragmentation</b> عندي. إنت الـ segments بتاعتك أطوالها مختلفة، فلازم first-fit وbest-fit وworst-fit.']
          ] : [
            [0, 'I see a program the way its programmer does: main program, stack, functions, symbol table. Each one a <b>segment</b>.'],
            [1, 'I chop everything into <b>same-size pages</b> and drop them into any free <b>frames</b>, even if they\'re not next to each other.'],
            [0, 'My address is <b>&lt;segment-number, offset&gt;</b>, and each of my entries holds a <b>base and a limit</b>.'],
            [1, 'Mine is <b>(page number, offset)</b>, and each entry holds just a <b>frame number</b>.'],
            [1, 'And I have <b>no external fragmentation</b>. Your segments vary in length, so you\'re stuck with first-fit, best-fit, worst-fit.']
          ]} />
        `, { sec: t('Segmentation vs paging', 'الـ Segmentation والـ paging') }),

        // 40 · fireside chat 2 + comparison
        page(html`
          <${Chat} names=${[t('Segmentation', 'الـ Segmentation'), t('Paging', 'الـ Paging')]} start=${1} lines=${A ? [
            [0, 'على الأقل أنا مش بضيّع آخر page. إنت <b>لسه فيك internal fragmentation</b>. ‡'],
            [0, 'والـ protection والمشاركة عندي طبيعيين: <b><bdi dir="ltr">r/w/x</bdi> bits لكل segment</b>، والكود بيتشارك على مستوى الـ segment.'],
            [1, 'وأنا بعمل protection <b>لكل page</b>. ‡ وكل process توصل للـ memory بتاعتها بس.']
          ] : [
            [0, 'At least I don\'t waste the end of a last page. You <b>still have internal fragmentation</b>. ‡'],
            [0, 'And protection and sharing come naturally to me: <b>r/w/x bits per segment</b>, code shared at segment level.'],
            [1, 'I protect <b>per page</b>. ‡ And a process can only access its own memory.']
          ]} />
          <${Grow} />
          <table className="hf-os4-cmp hf-in"><thead><tr><th></th><th>${t('Paging', 'الـ Paging')}</th><th>${t('Segmentation', 'الـ Segmentation')}</th></tr></thead><tbody>
            ${(A ? [
              ['التقسيم', 'الـ pages والـ frames ثابتة الحجم', 'الـ segments منطقية وأحجامها مختلفة'],
              ['الـ table', 'رقم frame لكل page', 'الـ base والـ limit لكل segment'],
              ['الـ fragmentation', 'مفيهوش external بس فيه internal', 'فيه external ‡'],
              ['الـ allocation', 'أي free frame', 'الـ first والـ best والـ worst fit']
            ] : [
              ['Division', 'Fixed-size pages / frames', 'Variable-size logical segments'],
              ['Table', 'Frame number per page', 'Base + limit per segment'],
              ['Fragmentation', 'No external; has internal', 'Has external ‡'],
              ['Allocation', 'Any free frame', 'First / best / worst fit']
            ]).map((r, i) => html`<tr key=${i}><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td></tr>`)}</tbody></table>
        `),

        // 41–43 · exam corner: the doctor's questions, then one of the site's practice questions
        page(html`
          <${Box} kind="exam" title=${t("Exam corner: from the doctor's papers", 'ركن الامتحان: من الامتحانات')}><p className="hf-p small">${t("The 2026 exam asked about slide 18's example. Tap an answer to see why.", 'امتحان 2026 سأل على مثال سلايد 18. دوس على إجابة عشان تعرف ليه.')}</p></${Box}>
          ${mq('m1', /Under first-fit, where does the 112 KB/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('in order, and the hole shrinks after each placement', 'بالترتيب، والـ hole بتصغر بعد كل placement')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /most efficient use of memory/i)}
          <${Grow} />
          <${Talk} who="os" flip=${true}>${X('Count who gets placed. Only one algorithm fits <b>all four</b> here.', 'عدّ مين اتحط. algorithm واحد بس حط <b>الأربعة</b> هنا.')}</${Talk}>
        `),
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("The site's own practice questions, not the doctor's.", 'أسئلة تدريب من الموقع، مش من الامتحانات.')}</p></${Box}>
          ${pq('p1', /differ in which address-binding scheme/i)}
          <${Grow} />
          <${Hand}>${t('flip back to "Three moments to bind" if you are unsure', 'ارجع لصفحة "تلات أوقات للـ binding" لو مش متأكد')}</${Hand}>
        `),

        // 44 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ CPU بيوصل مباشرةً للـ <b>registers والـ main memory</b> بس، والـ access يبقى legal لو:<span class="ltr">base ≤ address &lt; base + limit</span>',
            'الـ binding في الـ <b>compile</b> أو الـ <b>load</b> أو الـ <b>execution time</b>، والـ logical والـ physical بيختلفوا في التالت بس.',
            'الـ <b>MMU</b> بيجمع الـ relocation register على كل logical address.',
            'الـ <b>swap</b> أغلبه transfer time، وفي سلايد 13:<span class="ltr">2 s out + 2 s in = 4 s</span>',
            'الـ <b>first-fit</b> أول hole تكفي، والـ <b>best-fit</b> أصغرها، والـ <b>worst-fit</b> أكبرها.',
            'الـ <b>external</b>: مساحة مش contiguous، وحلها compaction. والـ <b>internal</b>: هدر جوه الـ partition.',
            'الـ physical في الـ <b>segmentation</b> وفي الـ <b>paging</b>:<span class="ltr">base + d (d &lt; limit)</span><span class="ltr">f × page size + d</span>'
          ] : [
            'The CPU reaches only <b>registers and main memory</b> directly. A legal access: base ≤ address &lt; base + limit.',
            'Binding at <b>compile time</b> (absolute code), <b>load time</b> (relocatable code) or <b>execution time</b>; logical and physical differ only in the last.',
            'The <b>MMU</b> adds the relocation register to every logical address; the program never sees physical ones.',
            '<b>Swap time</b> is mostly transfer time: 100 MB at 50 MB/s → 2 s out + 2 s in = 4 s.',
            '<b>First-fit</b>: first hole big enough; <b>best-fit</b>: smallest; <b>worst-fit</b>: largest. On slide 18 only best-fit places all four.',
            '<b>External</b>: enough space but not contiguous (fix: compaction, only with dynamic relocation). <b>Internal</b>: waste inside a partition.',
            '<b>Segmentation</b>: (s, d), d &lt; limit, physical = base + d. <b>Paging</b>: physical = f × page size + d; no external, but internal fragmentation.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 45 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 4!', 'خلّصت الفصل الرابع!')}</${H1}>
            <${Talk} who="os">${t('Next time: what if a process is bigger than memory itself? Virtual memory!', 'المرة الجاية: طب لو الـ process أكبر من الـ memory نفسها؟ الـ Virtual memory!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [4], t: Date.now() } }}>${t('Quiz me on Lecture 4', 'امتحنّي في محاضرة 4')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 4, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 4, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

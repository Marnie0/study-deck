// Head First chapter for File Processing Lecture 1 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Intro to file organization (data processing, files and computer storage, file structures, file organization, file management
// and file managers) and file I/O in C/C++ (physical vs logical files, opening with modes and flags, closing and the buffer,
// reading and writing, end of file, the read methods, standard I/O names, the sample program and the full methods).
// Every fact comes from the lecture's notes; our own analogies, examples and file contents are marked as ours. ‡ marks a slide
// error the notes also flag. Arabic follows the site's rules (see hf-compiler.js).
// lectures: [1]
(function () {
  const H = window.HF; H.chapters.fp = H.chapters.fp || {};
  const { html } = H.K;
  const { useState, useEffect } = React;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-fp1')) {
    const s = document.createElement('style'); s.id = 'hf-css-fp1';
    s.textContent = `
.hfb .hf-fp1-dp{ display:grid; grid-template-columns:1fr 1fr; gap:7px; }
.hfb .hf-fp1-dp > div{ border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 8px; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-fp1-dp > div b{ display:block; font:800 14px/1.2 var(--body); color:var(--ink); margin-bottom:2px; }
.hfb .hf-fp1-dp > div i{ font-style:normal; display:inline-grid; place-items:center; width:20px; height:20px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 12.5px/1 var(--body); margin-inline-end:5px; vertical-align:1px; }
.hfb.hf-ar .hf-fp1-dp > div{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.5; }
.hfb.hf-ar .hf-fp1-dp > div b{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-fp1-tb{ width:100%; border-collapse:collapse; table-layout:fixed; font-size:13.5px; line-height:1.28; color:var(--ink); }
.hfb .hf-fp1-tb th, .hfb .hf-fp1-tb td{ border:1px solid var(--hf-line); padding:4px 6px; vertical-align:top; text-align:start; }
.hfb .hf-fp1-tb thead th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-fp1-tb td code, .hfb .hf-fp1-tb th code{ font:700 13px/1.2 var(--mono); background:none; padding:0; color:var(--hf-k); }
.hfb .hf-fp1-tb td.m{ font:700 13.5px/1.2 var(--mono); color:var(--hf-k); text-align:center; }
.hfb.hf-ar .hf-fp1-tb{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13px; line-height:1.45; }
.hfb .hf-fp1-pick{ display:grid; gap:4px; }
.hfb .hf-fp1-pr{ border:1.5px solid transparent; border-radius:7px; padding:2px 5px; display:flex; flex-wrap:wrap; align-items:center; gap:3px 8px; }
.hfb .hf-fp1-pr.ok{ border-color:var(--ok); } .hfb .hf-fp1-pr.no{ border-color:var(--hf-red); }
.hfb .hf-fp1-pq{ flex:1 1 auto; font-size:14px; line-height:1.3; color:var(--ink); margin:0; }
.hfb .hf-fp1-pr .hf-fp1-pn{ flex:1 1 100%; margin:0; }
.hfb .hf-fp1-grid{ width:100%; border-collapse:collapse; font:700 13px/1.1 var(--mono); color:var(--ink); }
.hfb .hf-fp1-grid th, .hfb .hf-fp1-grid td{ border:1px solid var(--hf-line); text-align:center; padding:0; height:32px; }
.hfb .hf-fp1-grid thead th{ background:var(--hf-grey); padding:0 3px; height:28px; }
.hfb .hf-fp1-grid tbody th{ background:var(--hf-grey); color:var(--hf-k); text-align:start; padding:0 5px; font:700 13px/1.15 var(--mono); }
.hfb .hf-fp1-grid tbody th small{ display:block; font:600 11.5px/1.1 var(--body); color:var(--graphite); }
.hfb.hf-ar .hf-fp1-grid tbody th small{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:12px; }
.hfb .hf-fp1-grid td button{ width:100%; height:32px; border:0; margin:0; padding:0; background:var(--paper); color:var(--hf-hand); font:800 16px/1 var(--mono); cursor:pointer; }
.hfb .hf-fp1-grid td button.ok{ background:color-mix(in srgb, var(--ok) 26%, var(--paper)); color:var(--ink); }
.hfb .hf-fp1-grid td button.no{ background:color-mix(in srgb, var(--hf-red) 22%, var(--paper)); color:var(--ink); }
.hfb .hf-fp1-step{ border:2px solid var(--hf-line); border-radius:8px; padding:9px 10px; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); display:grid; gap:8px; }
.hfb .hf-fp1-task{ font-size:15px; line-height:1.38; color:var(--ink); margin:0; min-height:64px; }
.hfb.hf-ar .hf-fp1-task{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:14px; line-height:1.6; }
.hfb .hf-fp1-task code{ font-family:var(--mono); font-size:.88em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb .hf-fp1-big button{ min-width:44px; height:36px; font-size:15px; }
.hfb .hf-fp1-res{ font:700 14px/1.35 var(--body); margin:0; min-height:40px; }
.hfb .hf-fp1-res.ok{ color:var(--ok); } .hfb .hf-fp1-res.no{ color:var(--hf-red); }
.hfb .hf-fp1-res code{ font:700 13px var(--mono); color:var(--ink); }
.hfb.hf-ar .hf-fp1-res{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hfb .hf-fp1-pq code{ font-family:var(--mono); font-size:.9em; background:var(--hf-grey); padding:0 3px; border-radius:3px; }
.hfb.hf-ar .hf-fp1-pq{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.5; }
.hfb .hf-fp1-po{ display:flex; flex-wrap:wrap; gap:4px; }
.hfb .hf-fp1-po button{ font:700 13px/1 var(--mono); min-width:38px; height:28px; padding:0 7px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-fp1-po button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-fp1-po button.ok{ border-color:var(--ok); background:var(--ok); color:var(--paper); }
.hfb .hf-fp1-po button.no{ border-color:var(--hf-red); background:var(--hf-red); color:var(--paper); }
.hfb .hf-fp1-po button.right{ border-color:var(--ok); color:var(--ok); border-style:dashed; }
.hfb .hf-fp1-pn{ font:600 13px/1.3 var(--body); color:var(--hf-hand); margin:3px 0 0; }
.hfb .hf-fp1-pn code{ font:700 12.5px var(--mono); }
.hfb.hf-ar .hf-fp1-pn{ font-family:"IBM Plex Sans Arabic", var(--body); line-height:1.5; }
.hfb .hf-fp1-file{ display:flex; gap:3px; justify-content:center; }
.hfb .hf-fp1-file span{ width:22px; height:26px; display:grid; place-items:center; border:1.5px solid var(--hf-line); border-radius:4px; font:700 14px/1 var(--mono); background:var(--paper); color:var(--ink); }
.hfb .hf-fp1-trip{ border:2px solid var(--hf-line); border-radius:8px; padding:8px; display:grid; gap:7px; background:var(--paper); }
.hfb .hf-fp1-lab{ font:800 12.5px/1 var(--body); text-transform:uppercase; letter-spacing:.06em; color:var(--graphite); margin:0; }
.hfb.hf-ar .hf-fp1-lab{ font-family:"IBM Plex Sans Arabic", var(--body); text-transform:none; letter-spacing:0; font-size:13px; }
.hfb .hf-fp1-disk{ display:flex; gap:6px; }
.hfb .hf-fp1-blk{ flex:1 1 0; display:flex; gap:2px; padding:3px; border:1.5px dashed var(--faint); border-radius:6px; transition:background .4s, border-color .4s; }
.hfb .hf-fp1-blk.got{ border-style:solid; border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); }
.hfb .hf-fp1-blk span{ flex:1 1 0; height:24px; border-radius:3px; background:var(--hf-grey2); display:grid; place-items:center; font:800 12.5px/1 var(--mono); color:var(--paper); }
.hfb .hf-fp1-blk span.r{ background:var(--hf-k); }
.hfb .hf-fp1-ram{ display:flex; align-items:center; gap:8px; min-height:30px; }
.hfb .hf-fp1-ram > b{ font:800 13px/1 var(--body); color:var(--ink); }
.hfb .hf-fp1-cnt{ margin-inline-start:auto; font:800 22px/1 var(--mono); color:var(--hf-k); }
.hfb .hf-fp1-tabs{ display:flex; gap:4px; }
.hfb .hf-fp1-tabs button{ flex:1 1 0; font:700 13.5px/1.1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-fp1-tabs button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb.hf-ar .hf-fp1-tabs button, .hfb.hf-ar .hf-fp1-ram > b{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-fp1-sm .hf-code{ font-size:13px; line-height:1.45; }
.hfb .hf-fp1-sm .hf-code > div{ min-height:1.45em; }
`;
    document.head.appendChild(s);
  }

  // pick the right answer in each row (fopen modes, file contents, read traces); Check marks the rows, Show fills in the key
  function Pick({ id, items, opts }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const right = items.filter((it, i) => pick[i] === it.a).length;
    return html`<div className="hf-fp1-pick hf-in">
      ${items.map((it, i) => {
        const o = it.o || opts, p = pick[i], st = checked && p != null ? (p === it.a ? ' ok' : ' no') : '';
        return html`<div key=${i} className=${'hf-fp1-pr' + st}>
          <p className="hf-fp1-pq">${T(it.q)}</p>
          <div className="hf-fp1-po" dir="ltr">${o.map((x, j) => {
            const cls = checked && p === j ? (j === it.a ? 'ok' : 'no') : checked && p != null && j === it.a ? 'right' : '';
            return html`<button key=${j} className=${cls} aria-pressed=${String(p === j)} onClick=${() => { setPick(Object.assign({}, pick, { [i]: j })); setChecked(false); }}>${x}</button>`; })}</div>
          ${checked && p != null && p !== it.a && it.n ? html`<p className="hf-fp1-pn">${T(it.n)}</p>` : null}
        </div>`; })}
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; items.forEach((it, i) => { m[i] = it.a; }); setPick(m); setChecked(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${items.length}</bdi></span>`}
      </div>
    </div>`;
  }

  // be the C runtime: one program's need at a time; pick the fopen mode, check it, and see its C++ flags
  function ModeStep({ id, tasks }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id + ':k', 0);
    const [pick, setPick] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', {});
    const tk = tasks[k], p = pick[k], c = !!chk[k];
    const right = tasks.filter((x, i) => chk[i] && pick[i] === x.a).length;
    const set = j => { setPick(Object.assign({}, pick, { [k]: j })); setChk(Object.assign({}, chk, { [k]: false })); };
    return html`<div className="hf-fp1-step hf-in">
      <div className="hf-row"><span className="hf-fp1-lab">${ar ? html`البرنامج <bdi dir="ltr">${k + 1} / ${tasks.length}</bdi>` : 'Program ' + (k + 1) + ' of ' + tasks.length}</span><span className="grow" style=${{ flex: 1 }}></span>
        <span className="hf-dots">${tasks.map((x, j) => html`<i key=${j} className=${chk[j] && pick[j] === x.a ? 'on' : ''}></i>`)}</span></div>
      <p className="hf-fp1-task" key=${k}>${T(tk.q)}</p>
      <div className="hf-fp1-po hf-fp1-big" dir="ltr">${tk.o.map((x, j) => html`<button key=${j} className=${c && p === j ? (j === tk.a ? 'ok' : 'no') : ''} aria-pressed=${String(p === j)} onClick=${() => set(j)}>${x}</button>`)}</div>
      <p className=${'hf-fp1-res' + (c ? (p === tk.a ? ' ok' : ' no') : '')}>${c ? T(p === tk.a ? tk.n : tk.w) : ''}</p>
      <div className="hf-row">
        <button className="hf-btn" onClick=${() => setK(Math.max(0, k - 1))} disabled=${k === 0} aria-label=${ar ? 'اللي فات' : 'Previous program'}>${ar ? '›' : '‹'}</button>
        <button className="hf-btn solid" disabled=${p == null} onClick=${() => setChk(Object.assign({}, chk, { [k]: true }))}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setPick(Object.assign({}, pick, { [k]: tk.a })); setChk(Object.assign({}, chk, { [k]: true })); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        <button className="hf-btn" onClick=${() => setK(Math.min(tasks.length - 1, k + 1))} disabled=${k === tasks.length - 1} aria-label=${ar ? 'اللي بعده' : 'Next program'}>${ar ? '‹' : '›'}</button>
        <span className="hf-score"><bdi dir="ltr">${right} / ${tasks.length}</bdi></span>
      </div>
    </div>`;
  }

  // fill the table: for each row (how the file was opened), tick the column that holds the result
  function Grid({ id, cols, rows }) {
    const ar = useAr();
    const [pick, setPick] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const right = rows.filter((r, i) => pick[i] === r.a).length;
    const wrong = checked ? rows.filter((r, i) => pick[i] != null && pick[i] !== r.a) : [];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div dir="ltr"><table className="hf-fp1-grid"><thead><tr><th></th>${cols.map(c => html`<th key=${c}>${c}</th>`)}</tr></thead>
        <tbody>${rows.map((r, i) => html`<tr key=${i}><th dir=${ar ? 'rtl' : 'ltr'}><bdi dir="ltr">${r.l}</bdi>${r.s ? html`<small>${r.s}</small>` : null}</th>${cols.map((c, j) => {
          const on = pick[i] === j, st = checked && on ? (j === r.a ? 'ok' : 'no') : '';
          return html`<td key=${j}><button className=${st} aria-pressed=${String(on)} aria-label=${c} onClick=${() => { setPick(Object.assign({}, pick, { [i]: j })); setChecked(false); }}>${on ? '✓' : ''}</button></td>`; })}</tr>`)}</tbody></table></div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(pick).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; rows.forEach((r, i) => { m[i] = r.a; }); setPick(m); setChecked(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${rows.length}</bdi></span>`}
      </div>
      ${wrong.map((r, i) => html`<p key=${i} className="hf-fp1-pn">${T(r.n)}</p>`)}
    </div>`;
  }

  // our own example of the course objective: one student's record in three pieces, scattered over three disk blocks or grouped in one.
  // Each block brought into memory is one trip to the disk.
  function Trips() {
    const ar = useAr();
    const [m, setM] = H.K.useSlot('trips', 's');
    const [k, setK] = useState(0);
    const [run, setRun] = useState(false);
    const where = m === 's' ? [[0, 1], [1, 2], [2, 1]] : [[1, 0], [1, 1], [1, 2]];   // [block, cell] of each piece
    const blocks = [...new Set(where.map(w => w[0]))];
    const need = blocks.length;
    useEffect(() => { if (!run) return; if (k >= need) { setRun(false); return; } const t = setTimeout(() => setK(k + 1), calm() ? 0 : 750); return () => clearTimeout(t); }, [run, k, need]);
    const got = blocks.slice(0, k);
    const PC = ['N', 'G', 'A'];
    return html`<div className="hf-fp1-trip hf-in">
      <div className="hf-fp1-tabs" role="group">${[['s', ar ? 'مبعترة' : 'Scattered'], ['g', ar ? 'متجمّعة' : 'Grouped']].map(([v, l]) => html`<button key=${v} aria-pressed=${String(m === v)} onClick=${() => { setM(v); setK(0); setRun(false); }}>${l}</button>`)}</div>
      <p className="hf-fp1-lab">${ar ? 'الـ disk: تلات blocks' : 'Disk: three blocks'}</p>
      <div className="hf-fp1-disk" dir="ltr">${[0, 1, 2].map(b => html`<div key=${b} className=${'hf-fp1-blk' + (got.includes(b) ? ' got' : '')}>${[0, 1, 2, 3].map(c => { const pi = where.findIndex(w => w[0] === b && w[1] === c); return html`<span key=${c} className=${pi >= 0 ? 'r' : ''}>${pi >= 0 ? PC[pi] : ''}</span>`; })}</div>`)}</div>
      <div className="hf-fp1-ram"><b>${ar ? 'الرحلات للـ disk:' : 'Trips to the disk:'}</b><span className="hf-fp1-cnt">${k}</span></div>
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${run} onClick=${() => { setK(0); setRun(true); }}>${ar ? 'هات الـ record' : 'Fetch the record'}</button>
        ${k >= need && !run && html`<span className="hf-hand" style=${{ fontSize: '19px' }}>${need === 1 ? (ar ? 'رحلة واحدة بس!' : 'only one trip!') : (ar ? 'تلات رحلات لـ record واحد' : 'three trips for one record')}</span>`}
      </div>
    </div>`;
  }

  H.chapters.fp[1] = {
    title: 'Intro to File Organization and File I/O in C/C++‎',
    kicker: 'Chapter 1',
    run: 'file organization and file i/o',
    ar: { title: 'مقدمة عن الـ File Organization والـ File I/O في C/C++‎', kicker: 'الفصل 1', run: 'الـ file organization والـ file I/O' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' own questions on this lecture (midterm models, this year's midterm, the summary MCQs), with the site's Arabic reasons
      const lec = kit.course.lectures.find(l => l.n === 1);
      const arQuiz = (window.AR && window.AR.fp && window.AR.fp.lectures && window.AR.fp.lectures[1] && window.AR.fp.lectures[1].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const exam = t('Exam corner', 'ركن الامتحان');
      const tb = (head, rows, cols) => html`<table className="hf-fp1-tb hf-in">${cols ? html`<colgroup>${cols.map((w, i) => html`<col key=${i} style=${{ width: w }} />`)}</colgroup>` : null}
        <thead><tr>${head.map((h, i) => html`<th key=${i}>${T(h)}</th>`)}</tr></thead>
        <tbody>${rows.map((r, i) => html`<tr key=${i}>${r.map((c, j) => html`<td key=${j}>${T(c)}</td>`)}</tr>`)}</tbody></table>`;
      return [
        // 0 · how to use this chapter (faces the opener)
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X(`We know what you're thinking: <i>"How can this be a serious file processing book?"</i> Your brain remembers what's surprising, visual and a bit emotional, so that's how this chapter is written. Every fact is from the doctors' slides.`,
            `عارفين إنت بتفكر في إيه: <i>"هو ده كتاب file processing بجد؟"</i> مخك بيفتكر الحاجة اللي بتفاجئه واللي فيها صور ومشاعر، فالفصل مكتوب كده. بس كل معلومة فيه من سلايدز الدكاترة.`)}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> "Sharpen your pencil" and "Be the C runtime" are not optional. You answer right on the page.', '<b>حل التمارين.</b> "امسك القلم" و"خليك إنت الـ <bdi dir="ltr">C runtime</bdi>" مش اختياري. بتجاوب على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think before you turn the page.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, taken from the doctors' own papers.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، من امتحانات الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers the things you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على الحاجات اللي اتكسفت تسألها.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a mistake on the slides, and what was meant.', 'معناها فيه غلطة في السلايد، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes and example files marked "ours" are our own analogies and examples.', 'الملاحظات المكتوبة بخط الإيد والأمثلة اللي عليها "من عندنا" دي تشبيهات وأمثلة مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">1</span><span className="t">${A ? html`الفصل الأول<br/>File Processing` : html`Chapter one<br/>File Processing`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Memory That Survives the Night', 'ذاكرة بتعيش بعد ما النور يقطع')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('file organization and file I/O in C/C++‎', 'الـ file organization والـ file I/O في C و C++‎')}</p></div>
          <${Talk} who="mem">${X('Every variable you ever made lives in me. Pull the plug and… <b>I forget everything.</b>', 'كل variable عملته عايش جوايا. اشد الفيشة و… <b>هنسى كل حاجة.</b>')}</${Talk}>
          <${Talk} who="disk" flip=${true}>${X("Relax. I keep it all, in <b>files</b>. I'm just… a bit slow.", 'ولا يهمك. أنا شايل كل حاجة في <b>files</b>. بس أنا… بطيء شوية.')}</${Talk}>
          <${P}>${X('This chapter is about that slow, faithful friend: how data is <b>stored, organized and managed</b> in files, and how a C/C++‎ program <b>opens, reads, writes and closes</b> them.',
            'الفصل ده عن الصاحب البطيء الوفي ده: الداتا بتتخزن <b>وتتنظم وتتدار</b> إزاي في الـ files، وبرنامج C أو <bdi dir="ltr">C++‎</bdi> بـ<b>يفتحها ويقرا منها ويكتب فيها ويقفلها</b> إزاي.')}</${P}>
        `, { sec: t('Meet the file', 'اتعرّف على الـ file') }),

        // 2 · data structure vs file structure, and the lecture's map
        page(html`
          <${H2}>${t('Data structures, meet file structures', 'الـ data structures، قابلوا الـ file structures')}</${H2}>
          <${Def}>${X('Both involve a <b>representation of data</b> + <b>operations for accessing data</b>. The difference: <b>data structures</b> deal with data in <b>main memory</b>; <b>file structures</b> deal with data in <b>secondary storage</b> (files).',
            'الاتنين فيهم <b>طريقة تمثيل للداتا</b> + <b>عمليات للوصول للداتا</b>. الفرق: الـ <b>data structures</b> بتتعامل مع الداتا اللي في الـ <b>main memory</b>، والـ <b>file structures</b> بتتعامل مع الداتا اللي على الـ <b>secondary storage</b> (يعني الـ files).')}</${Def}>
          <${P} small=${true}>${t('The lecture comes in two parts:', 'المحاضرة جزئين:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>Part (1)</b>: مقدمة عن الـ file management والـ organization، في 6 حتت: الـ data processing، والـ files والـ storage، والـ file structures، والـ organization، والـ management، والـ file managers.',
            'الـ <b>Part (2)</b>: الـ files في <bdi dir="ltr">C/C++</bdi>: الـ physical والـ logical file، والفتح والقفل، والقراية والكتابة، وبرنامج مثال، والـ full methods.'
          ] : [
            '<b>Part (1)</b>: intro to file management and organization: data processing, files and computer storage, file structures, file organization, file management, file managers.',
            '<b>Part (2)</b>: handling files in C/C++‎: physical vs logical file, opening and closing, reading and writing, a sample program, the full methods.'
          ]} />
          <${Grow} />
          <${Hand}>${X('Main reference: <i>File Structures</i> by Folk, Zoellick and Riccardi.', 'المرجع الأساسي: كتاب <i>File Structures</i> بتاع Folk و Zoellick و Riccardi.')}</${Hand}>
        `),

        // 3 · data processing
        page(html`
          <${H1}>${t('(1) Data processing', '(1) الـ Data processing')}</${H1}>
          <${P} small=${true}>${t('Four things happen to data (slide 7):', 'فيه أربع حاجات بتحصل للداتا (slide 7):')}</${P}>
          <div className="hf-fp1-dp hf-in">
            <div><b><i>1</i>${t('Storage', 'الـ Storage')}</b>${t('Data is saved within files, and the files are saved in storage devices.', 'الداتا بتتحفظ جوه files، والـ files بتتحفظ على storage devices.')}</div>
            <div><b><i>2</i>${t('Organization', 'الـ Organization')}</b>${t('How we organize files on primary and secondary storage.', 'إزاي ننظم الـ files على الـ primary والـ secondary storage.')}</div>
            <div><b><i>3</i>${t('Access', 'الـ Access')}</b>${X('<b style="display:inline;font-size:inherit">Sequential</b> or <b style="display:inline;font-size:inherit">direct</b> access.', 'يا <b style="display:inline;font-size:inherit">sequential</b> يا <b style="display:inline;font-size:inherit">direct</b> access.')}</div>
            <div><b><i>4</i>${t('Processing', 'الـ Processing')}</b>${t('Processing the data after storage, organization and access.', 'معالجة الداتا بعد الـ storage والـ organization والـ access.')}</div>
          </div>
          <${P} small=${true}>${X('Data is saved in files, and files are saved on <b>primary</b> (RAM) or <b>secondary</b> (hard disk) storage.', 'الداتا بتتحفظ في files، والـ files بتتحفظ على <b>primary storage</b> (الـ RAM) أو <b>secondary storage</b> (الـ hard disk).')}</${P}>
          <${Grow} />
          <${Hand}>${t("Our analogy: a library. Store the books, shelve them, find one, read it.", 'تشبيه من عندنا: مكتبة. تخزّن الكتب، ترصّها، تلاقي الكتاب، تقراه.')}</${Hand}>
        `, { sec: t('Data processing', 'الـ Data processing') }),

        // 4 · what is a file
        page(html`
          <${H1}>${t('(2) So what is a file?', '(2) يعني إيه file؟')}</${H1}>
          <${Def}>${X('A <b>file</b> is a collection of data placed on <b>secondary, non-volatile</b> storage: a hard disk, magnetic tape, optical media.',
            'الـ <b>file</b> مجموعة داتا متحطوطة على storage <b>secondary و non-volatile</b>، زي الـ hard disk والـ magnetic tape والـ optical media.')}</${Def}>
          <${P}>${X('Computer storage is either <b>main memory</b> or <b>secondary storage</b>. Files live on secondary storage, and file storage is <b>slow</b>.',
            'الـ computer storage يا <b>main memory</b> يا <b>secondary storage</b>. الـ files عايشة على الـ secondary storage، وتخزين الـ files <b>بطيء</b>.')}</${P}>
          <${Talk} who="dev">${t('Why is file storage so slow?', 'ليه تخزين الـ files بطيء كده؟')}</${Talk}>
          <${Talk} who="disk" flip=${true}>${X('Because file storage systems have <b>many moving parts</b>. I spin, my arm swings… it all takes time.', 'عشان أنظمة تخزين الـ files فيها <b>أجزاء كتير بتتحرك</b>. أنا بلف، والذراع بتاعي بيتحرك… وكل ده بياخد وقت.')}</${Talk}>
        `, { sec: t('Files and storage', 'الـ Files والـ storage') }),

        // 5 · the storage figure
        page(html`
          <${H2}>${t('Computer storage (slide 9)', 'الـ Computer storage (slide 9)')}</${H2}>
          <${Fig} name="fp-storage" />
        `),

        // 6 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Main Memory and Secondary Storage argue about who matters more.", 'قعدة الليلة: الـ Main Memory والـ Secondary Storage بيتخانقوا مين فيهم أهم.')} />
          <${Chat} names=${[t('Main Memory', 'الـ Main Memory'), t('Secondary Storage', 'الـ Secondary Storage')]} lines=${A ? [
            [0, 'الداتا <b>بتتعالج (manipulated)</b> عندي أنا. أنا <b>سريعة</b> جدًا.'],
            [1, 'والداتا <b>بتتخزن</b> عندي أنا. أنا <b>كبير</b> و<b>رخيص</b>.'],
            [0, 'إنت <b>بطيء</b>. كل الأجزاء اللي بتتحرك دي.'],
            [1, 'وإنتي <b>صغيرة</b> و<b>غالية</b>. وكمان <b>volatile</b>: أول ما الكهربا تقطع بتنسي كل حاجة.'],
            [1, 'أنا <b>stable</b>. الـ disk والـ tape والـ CD-ROM كلهم من عيلتي.'],
            [0, 'ماشي، بس من غيري محدش يقدر يشتغل على الداتا.'],
            [1, 'يبقى نتفق: الداتا <b>بتتنقل بينّا</b>، تتخزن عندي وتتعالج عندك.']
          ] : [
            [0, "Data is <b>manipulated</b> here, with me. I'm <b>fast</b>."],
            [1, "And data is <b>stored</b> here, with me. I'm <b>large</b> and <b>cheap</b>."],
            [0, "You're <b>slow</b>. All those moving parts."],
            [1, "You're <b>small</b>, <b>expensive</b> and <b>volatile</b>: cut the power and you forget everything."],
            [1, "I'm <b>stable</b>. Disk, tape, CD-ROM: that's my family."],
            [0, 'Fine, but nobody can work on the data without me.'],
            [1, 'Then we agree: data is <b>transferred between us</b>. Stored with me, manipulated with you.']
          ]} />
        `),

        // 7 · why files
        page(html`
          <${H2}>${t('Why do we need files at all?', 'إحنا محتاجين files ليه أصلًا؟')}</${H2}>
          <${UL} items=${A ? [
            'لإنها <b>الطريقة الوحيدة المناسبة</b> لتخزين كمية معلومات كبيرة: صور، ومزيكا، وفيديو.',
            'الـ <b>operating systems</b> أكبر من إنها تدخل كلها في الـ memory.',
            'الـ <b>databases</b> موجودة في كل حتة.',
            'عشان الـ <b>backup</b> والـ <b>archiving</b>.'
          ] : [
            'They are the <b>only suitable way</b> to store large amounts of information: pictures, music, video.',
            '<b>Operating systems</b> are too large to fit fully in memory.',
            '<b>Databases</b> are everywhere.',
            '<b>Backup</b> and <b>archiving</b>.'
          ]} />
          <${Box} kind="brain"><p className="hf-p">${t('You write a program that keeps a list of students in an array. It works perfectly. Then you close it and run it again tomorrow. Where did the students go, and which of the four reasons above would have saved them?',
            'كتبت برنامج بيشيل لستة طلبة في array، وشغال تمام. قفلته وشغّلته تاني بكرة. الطلبة راحوا فين؟ وأنهي سبب من الأربعة اللي فوق كان هينقذهم؟')}</p></${Box}>
          <${Grow} />
          <${Hand} red=${true} arrow="up">${t('hint: main memory is volatile', 'تلميح: الـ main memory دي volatile')}</${Hand}>
        `),

        // 8 · file structures
        page(html`
          <${H1}>${t('(3) Two ways to see one file', '(3) طريقتين تشوف بيهم نفس الـ file')}</${H1}>
          <${UL} items=${A ? [
            'الـ <b>Logical structure</b>: الـ programmer شايف الـ file إزاي (text أو image أو data file…).',
            'الـ <b>Physical structure</b>: الـ file متخزن إزاي فعلًا على الـ secondary storage.'
          ] : [
            '<b>Logical structure</b>: how programmers see the file (text, image, data file…).',
            '<b>Physical structure</b>: how it is stored on secondary storage.'
          ]} />
          ${mq('m-struct', /Structures of file/)}
          <${Hand} red=${true}>${t('"Both A and B" on that quiz means a (physical) and d (logical).', 'الـ "Both A and B" في السؤال ده معناها a (physical) و d (logical).')}</${Hand}>
        `, { sec: t('File structures', 'الـ File structures') }),

        // 9 · organization figure
        page(html`
          <${H1}>${t('(4) File organization', '(4) الـ File organization')}</${H1}>
          <${Fig} name="fp-file-org" />
        `, { sec: t('File organization', 'الـ File organization') }),

        // 10 · organization methods
        page(html`
          <${H2}>${t('Organizing a file: two families', 'تنظيم الـ file: عيلتين')}</${H2}>
          <${UL} items=${A ? [
            'طرق الـ <b>logical organization</b>: الـ <b>heap</b> والـ <b>indexing</b> والـ <b>hashing</b>.',
            'طرق الـ <b>physical organization</b>: إننا ننظم الـ tracks بالـ <b>sectors</b> أو بالـ <b>blocks</b>.'
          ] : [
            '<b>Logical organization</b> methods: <b>heap</b>, <b>indexing</b>, <b>hashing</b>.',
            '<b>Physical organization</b> methods: organizing tracks by <b>sectors</b> or by <b>blocks</b>.'
          ]} />
          <${Def}>${X('File organization methods must provide <b>fast access time</b> and <b>good space utilization</b>.', 'طرق تنظيم الـ file لازم توفر <b>access time سريع</b> و<b>استغلال كويس للمساحة</b> (good space utilization).')}</${Def}>
          <${Box} kind="watch"><p className="hf-p small">${X('The midterm asks <i>"File organization methods must provide:"</i> and fills the other options with <b>file management</b> tasks (formatting media, allocating space, managing free space). Only <b>fast access time and good space utilization</b> is right.',
            'الميدترم بيسأل:<span class="ltr"><i>"File organization methods must provide:"</i></span>وباقي الاختيارات شغلانات <b>file management</b> (الـ formatting والـ allocating والـ free space). الصح: <b>fast access time and good space utilization</b>.')}</p></${Box}>
          <${Grow} />
          <${Talk} who="table">${t('Heap, indexing, hashing: you will meet us all later.', 'الـ heap والـ indexing والـ hashing: هتقابلنا بعدين.')}</${Talk}>
        `),

        // 11 · file management and file managers
        page(html`
          <${H1}>${t('(5) File management, (6) file managers', '(5) الـ File management و(6) الـ file managers')}</${H1}>
          <${P} small=${true}>${t('File management covers:', 'الـ File management بيشمل:')}</${P}>
          <${UL} items=${A ? ['تجهيز أو عمل format للـ <b>storage media</b>.', 'حجز مساحة التخزين والـ <b>addressing</b>.', 'إدارة المساحة الفاضية (<b>free space</b>).']
            : ['Preparing/formatting <b>storage media</b>.', 'Allocating storage space and <b>addressing</b>.', 'Managing <b>free space</b>.']} />
          <${P} small=${true}>${X('And who does it? The <b>file managers</b>, which are system software: the <b>OS</b> and the <b>DBMS</b>.', 'ومين بيعمل كده؟ الـ <b>file managers</b>، ودي system software: الـ <b>OS</b> والـ <b>DBMS</b>.')}</${P}>
          ${mq('m-mgr', /managed by system software/)}
        `, { sec: t('File management', 'الـ File management') }),

        // 12 · course objectives + trips
        page(html`
          <${H2}>${t("The whole course in two lines", 'المادة كلها في سطرين')}</${H2}>
          <${UL} items=${A ? ['نجيب المعلومة بـ <b>أقل عدد ممكن من الـ disk accesses</b>.', 'نجمّع المعلومات اللي ليها علاقة ببعض عشان أي طلب يحتاج <b>رحلة واحدة بس للـ disk</b>.']
            : ['Get information with <b>as few disk accesses as possible</b>.', 'Group related information so a request needs <b>only one trip to the disk</b>.']} />
          <${P} small=${true}>${X("Our example, not the slides': one student's record in three pieces (<b>N</b>ame, <b>G</b>rades, <b>A</b>ddress). Each disk block you bring into memory is one trip. Try both layouts:",
            'مثال من عندنا: record طالب واحد متقسم تلات حتت (الاسم <b>N</b> والدرجات <b>G</b> والعنوان <b>A</b>). كل block بتجيبه من الـ disk للـ memory يبقى رحلة. جرّب الشكلين:')}</${P}>
          <${Trips} />
          <${Grow} />
          <${Hand} arrow="up" red=${true}>${t('every later lecture is a trick for cutting trips', 'كل محاضرة جاية هي حيلة عشان نقلّل الرحلات دي')}</${Hand}>
        `),

        // 13 · sort
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Where does each one belong? <b>L</b> = a logical organization method, <b>P</b> = a physical organization method, <b>M</b> = a file management task.',
            'كل واحدة دي تبع إيه؟ الـ <b>L</b> طريقة logical organization، والـ <b>P</b> طريقة physical organization، والـ <b>M</b> شغلانة من الـ file management.')}</p></${Box}>
          <${Sort} id="lpm" bins=${[['L', t('Logical organization', 'الـ Logical organization')], ['P', t('Physical organization', 'الـ Physical organization')], ['M', t('File management', 'الـ File management')]]} items=${A ? [
            ['الـ hashing', 0],
            ['تنظيم الـ tracks بالـ sectors', 1],
            ['إدارة الـ free space', 2],
            ['الـ heap', 0],
            ['حجز مساحة التخزين والـ addressing', 2],
            ['تنظيم الـ tracks بالـ blocks', 1],
            ['الـ indexing', 0],
            ['عمل format للـ storage media', 2]
          ] : [
            ['Hashing', 0],
            ['Organizing tracks by sectors', 1],
            ['Managing free space', 2],
            ['Heap', 0],
            ['Allocating storage space and addressing', 2],
            ['Organizing tracks by blocks', 1],
            ['Indexing', 0],
            ['Formatting storage media', 2]
          ]} />
        `, { sec: t('Exercise', 'تمرين') }),

        // 14 · part 2: physical vs logical file
        page(html`
          <div className="hf-open hf-in"><p className="hf-hand">${t('Part 2: file I/O in C/C++‎', 'الجزء التاني: الـ file I/O في C و C++‎')}</p>
            <${H1}>${t('One file, two names', 'نفس الـ file، باسمين')}</${H1}></div>
          ${tb([t('Physical file', 'الـ Physical file'), t('Logical file', 'الـ Logical file')], A ? [
            ['مجموعة bytes متخزنة على الـ disk', 'قناة (channel) بتوصّل البرنامج بالـ physical file'],
            ['ليه physical name، زي A.txt', 'ليه logical name، وده variable في البرنامج زي infile أو fp'],
            ['بيتستخدم مرة واحدة، وقت فتح الـ file', 'بيتستخدم كل ما تحتاجه: open و read و write و append و close']
          ] : [
            ['A collection of bytes stored on a disk', 'A channel connecting the program to the physical file'],
            ['Has a physical name, e.g. A.txt', 'Has a logical name: a variable in the program, e.g. infile, fp'],
            ['Used once, when opening the file', 'Used as many times as needed: open, read, write, append, close']
          ])}
          <${Grow} />
          <${Hand}>${t("Our analogy: the physical name is a phone number, the logical name is the saved contact. Type the number once, then just tap the contact.", 'تشبيه من عندنا: الـ physical name رقم تليفون، والـ logical name الـ contact اللي سجلته. بتكتب الرقم مرة، وبعدها تدوس على الـ contact.')}</${Hand}>
        `, { sec: t('Physical vs logical file', 'الـ Physical والـ logical file') }),

        // 15 · figure
        page(html`
          <${H2}>${t('Same logical name, different files (slide 20)', 'نفس الـ logical name، files مختلفة (slide 20)')}</${H2}>
          <${Fig} name="fp-log-phys" />
        `),

        // 16 · interview
        page(html`
          <${Interview} title=${t('The Logical Name, exposed', 'الـ Logical Name على المكشوف')} sub=${t("This week's interview: the variable that stands in for a file.", 'حوار الأسبوع: الـ variable اللي بينوب عن الـ file.')} lines=${A ? [
            ['المذيع', 'إنت مين بالظبط؟'],
            ['الـ Logical Name', 'أنا <b>قناة</b> بتوصّل البرنامج بالـ physical file. أنا مجرد variable، زي <code>infile</code> أو <code>fp</code>.'],
            ['المذيع', 'وبتتكتب إزاي؟'],
            ['الـ Logical Name', 'في C:<span class="ltr"><code>FILE * outfile;</code></span>وفي <bdi dir="ltr">C++‎</bdi> أنا object من الـ class اللي اسمها <code>fstream</code>:<span class="ltr"><code>fstream outfile;</code></span>'],
            ['المذيع', 'وإمتى بتتعرف على الـ physical file؟'],
            ['الـ Logical Name', 'وقت <b>الفتح</b>. ساعتها بس اسمه الحقيقي، زي myfile.txt، بيتكتب. وبعد كده كل الشغل بيعدّي عليّا أنا.'],
            ['المذيع', 'سمعت إن فيه برنامجين اسمهم الاتنين infile.'],
            ['الـ Logical Name', 'عادي! كل برنامج ليه <code>infile</code> بتاعه، واحد متوصّل بـ b.txt والتاني بـ aa.txt.']
          ] : [
            ['Head First', 'So who exactly are you?'],
            ['Logical Name', "I'm a <b>channel</b> connecting the program to the physical file. Just a variable, like <code>infile</code> or <code>fp</code>."],
            ['Head First', 'How do people declare you?'],
            ['Logical Name', 'In C: <code>FILE * outfile;</code> In C++‎ I am an object of the class <code>fstream</code>: <code>fstream outfile;</code>'],
            ['Head First', 'When do you meet your physical file?'],
            ['Logical Name', "At <b>opening</b>. That's the only time its real name, like myfile.txt, is written. After that, everything goes through me."],
            ['Head First', 'I heard two programs both call their file infile.'],
            ['Logical Name', 'No problem! Each program has its own <code>infile</code>: one is connected to b.txt, the other to aa.txt.']
          ]} />
        `),

        // 17 · opening: the fopen figure
        page(html`
          <${H1}>${t('Opening a file', 'فتح الـ file')}</${H1}>
          <${P} small=${true}>${X('Opening makes a file ready for use: either open an <b>existing</b> file or <b>create</b> a new one. After opening you are positioned at the <b>beginning</b> of the file.',
            'الفتح بيجهّز الـ file للاستخدام: يا تفتح file <b>موجود</b> يا <b>تعمل</b> واحد جديد. وبعد الفتح بتكون واقف في <b>أول</b> الـ file.')}</${P}>
          <${Fig} name="fp-fopen-parts" />
        `, { sec: t('Opening files', 'فتح الـ files') }),

        // 18 · C++ open and the flags
        page(html`
          <${H2}>${t('Opening in C++‎', 'الفتح في C++‎')}</${H2}>
          <${Code} lines=${['fstream outfile;', 'outfile.open("myfile.txt", ios::out);']} />
          <${P} small=${true}>${X('The second argument is an <b>integer</b> that gives the mode. Its value is a <b>bitwise OR</b> (operator <code>|</code>) of constants defined in the class <code>ios</code>:',
            'الـ argument التاني <b>integer</b> بيحدد الـ mode، وقيمته بتتعمل بـ <b>bitwise OR</b> (الـ operator <code>|</code>) بين constants متعرّفة في الـ class اللي اسمها <code>ios</code>:')}</${P}>
          ${tb([t('Flag', 'الـ Flag'), t('Meaning', 'المعنى')], A ? [
            ['<code>ios::in</code>', 'للـ input'], ['<code>ios::out</code>', 'للـ output'], ['<code>ios::app</code>', 'يعمل seek للآخر <b>قبل كل write</b>'],
            ['<code>ios::ate</code>', 'يبدأ وهو <b>واقف في الآخر</b>'], ['<code>ios::trunc</code>', 'دايمًا يعمل file جديد (truncate)'], ['<code>ios::binary</code>', 'الـ binary mode']
          ] : [
            ['<code>ios::in</code>', 'input'], ['<code>ios::out</code>', 'output'], ['<code>ios::app</code>', 'seek to the end <b>before each write</b>'],
            ['<code>ios::ate</code>', 'start <b>positioned at the end</b>'], ['<code>ios::trunc</code>', 'always create new (truncate)'], ['<code>ios::binary</code>', 'binary mode']
          ], ['42%', '58%'])}
          <${Box} kind="watch"><p className="hf-p small">${X('From the exam (not on the slides): <code>fstream</code> works for <b>both</b> input and output; <code>ifstream</code> is input only (default <code>ios::in</code>); <code>ofstream</code> is output only.',
            'من الامتحان (مش في السلايدز): الـ <code>fstream</code> للـ <b>input والـ output</b>، والـ <code>ifstream</code> للـ input بس (الـ default <code>ios::in</code>)، والـ <code>ofstream</code> للـ output بس.')}</p></${Box}>
        `),

        // 19 · the modes table
        page(html`
          <${H2}>${t('The C modes and their C++‎ twins', 'الـ modes في C وتوأمها في C++‎')}</${H2}>
          ${tb([t('C', 'الـ C'), t('What it does', 'بيعمل إيه'), t('C++‎ (ios::…)', 'الـ C++‎ (ios::…)')], A ? [
            ['<code>r</code>', 'يفتح file <b>موجود</b> للقراية', '<code>in</code>'],
            ['<code>w</code>', 'يعمل جديد أو <b>يفضّي</b> الموجود، للـ output', '<code>out | trunc</code> (أو <code>out</code>)'],
            ['<code>a</code>', 'يعمل جديد أو <b>يكمّل في آخر</b> الموجود، للـ output', '<code>out | app</code>'],
            ['<code>r+</code>', 'يفتح file <b>موجود</b>، للـ input والـ output', '<code>out | in</code>'],
            ['<code>w+</code>', 'يعمل أو <b>يفضّي</b>، للـ input والـ output', '<code>out | in | trunc</code>'],
            ['<code>a+</code>', 'يعمل أو <b>يكمّل في الآخر</b>، للـ input والـ output', '<code>out | in | app</code>'],
            ['<code>…b</code>', 'زوّد b يبقى <b>binary mode</b>', '<code>… | binary</code>']
          ] : [
            ['<code>r</code>', 'open <b>existing</b> for reading', '<code>in</code>'],
            ['<code>w</code>', 'create new or <b>truncate</b> existing, for output', '<code>out | trunc</code> (or <code>out</code>)'],
            ['<code>a</code>', 'create new or <b>append</b>, for output', '<code>out | app</code>'],
            ['<code>r+</code>', '<b>existing</b>, for input and output', '<code>out | in</code>'],
            ['<code>w+</code>', 'create/<b>truncate</b>, for input and output', '<code>out | in | trunc</code>'],
            ['<code>a+</code>', 'create/<b>append</b>, for input and output', '<code>out | in | app</code>'],
            ['<code>…b</code>', 'adding b means <b>binary mode</b>', '<code>… | binary</code>']
          ], ['15%', '50%', '35%'])}
          <${Hand} tilt=${true}>${t('Memory trick (ours): r needs the file, w wipes it, a adds to it, + lets you do both.', 'حيلة للحفظ (من عندنا): الـ r محتاج الـ file موجود، والـ w بيمسحه، والـ a بيزوّد عليه، والـ + بيخليك تقرا وتكتب.')}</${Hand}>
        `, { sec: t('Modes and flags', 'الـ Modes والـ flags') }),

        // 20 · traps on modes
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('"If a mode includes <b>b</b> after the initial letter (e.g. rb), it indicates…" <b>a binary file</b>. Not "big", not "blueprint". Without b you get text mode.',
            'لو الـ mode فيه <b>b</b> بعد أول حرف (زي <code>rb</code>) يبقى معناه <b>binary file</b>. مش "big" ولا "blueprint". ومن غير b يبقى text mode.')}</p></${Box}>
          <${Dumb} qa=${A ? [
            ['لو الـ file مش موجود، إيه الفرق بين <code>w</code> و<code>a</code>؟', 'مفيش فرق، الاتنين <b>بيعملوا file جديد</b>. الفرق بيبان مع file <b>موجود</b>: الـ w بيفضّيه، والـ a بيكمّل في آخره.'],
            ['طب إيه الفرق بين <code>ios::app</code> و<code>ios::ate</code>؟', 'الـ app بيروح للآخر <b>قبل كل write</b>. الـ ate بس <b>بيبدأ</b> وهو واقف في الآخر.'],
            ['ليه الـ C++‎ بتكتب الـ mode بـ <code>|</code>؟', 'لأن الـ mode هناك <b>integer</b>، وكل flag فيه bit، فبنجمّعهم بـ bitwise OR. في C الـ mode <b>string</b> زي <code>"w+"</code>.']
          ] : [
            ['If the file does not exist, what is the difference between <code>w</code> and <code>a</code>?', 'None: both <b>create a new file</b>. The difference shows on an <b>existing</b> file: w truncates it, a appends to it.'],
            ['What is the difference between <code>ios::app</code> and <code>ios::ate</code>?', 'app seeks to the end <b>before each write</b>. ate only <b>starts</b> positioned at the end.'],
            ['Why does C++‎ glue flags with <code>|</code>?', 'Because there the mode is an <b>integer</b>, a bitwise OR of ios constants. In C the mode is a <b>string</b> like <code>"w+"</code>.']
          ]} />
        `),

        // 21 · modes figure
        page(html`
          <${H2}>${t('Try every mode on a file', 'جرّب كل mode على file')}</${H2}>
          <${Fig} name="fp-modes" />
        `),

        // 22 · be the C runtime: which mode
        page(html`
          <${Box} kind="pencil" title=${t('Be the C runtime', 'خليك إنت الـ C runtime')}><p className="hf-p small">${t('Six programs, six needs. For each one, pick the fopen mode that does exactly that, then check.', 'ست برامج، وكل واحد محتاج حاجة. اختار لكل واحد الـ fopen mode اللي بيعمل كده بالظبط، وبعدين صحّح.')}</p></${Box}>
          <${ModeStep} id="mode" tasks=${(() => { const M = ['r', 'w', 'a', 'r+', 'w+', 'a+']; return [
            { a: 0, o: M, q: t('Show an <b>existing</b> text file on the screen. No writing.', 'اعرض file نصّي <b>موجود</b> على الشاشة، من غير أي كتابة.'), n: t('Right: <code>"r"</code>. In C++: <code>ios::in</code>.', 'صح، هو <code>"r"</code>. وفي <bdi dir="ltr">C++</bdi> بيبقى <code>ios::in</code>.'), w: t('Not quite. Read only, from a file that must exist.', 'لأ. ده قراية بس، من file لازم يكون موجود.') },
            { a: 1, o: M, q: t("Write today's report. The old report in the file must be <b>thrown away</b>. Writing only.", 'اكتب تقرير النهارده، والتقرير القديم اللي في الـ file <b>لازم يتمسح</b>. كتابة بس.'), n: t('Right: <code>"w"</code> truncates. In C++: <code>ios::out | ios::trunc</code>.', 'صح، الـ <code>"w"</code> بيفضّي الـ file. وفي <bdi dir="ltr">C++</bdi> بيبقى <code>ios::out | ios::trunc</code>.'), w: t('Not quite. Output only, and the old contents must go.', 'لأ. ده output بس، والمحتوى القديم لازم يتمسح.') },
            { a: 2, o: M, q: t('Add one line to the <b>end</b> of a log on every run, keeping the old lines. Writing only.', 'زوّد سطر في <b>آخر</b> الـ log كل مرة تشغّل، والسطور القديمة تفضل. كتابة بس.'), n: t('Right: <code>"a"</code> appends. In C++: <code>ios::out | ios::app</code>.', 'صح، الـ <code>"a"</code> بيكمّل في الآخر. وفي <bdi dir="ltr">C++</bdi> بيبقى <code>ios::out | ios::app</code>.'), w: t('Not quite. Output only, added at the end.', 'لأ. ده output بس، بيتزوّد في الآخر.') },
            { a: 4, o: M, q: t('A scratch file: write numbers into it, then <b>read them back</b>. Leftovers from last time must go.', 'file مؤقت: اكتب فيه أرقام، وبعدين <b>اقراها تاني</b>. واللي فاضل من المرة اللي فاتت لازم يتمسح.'), n: t('Right: <code>"w+"</code>. In C++: <code>ios::out | ios::in | ios::trunc</code>.', 'صح، هو <code>"w+"</code>. وفي <bdi dir="ltr">C++</bdi> بيبقى <code>ios::out | ios::in | ios::trunc</code>.'), w: t('Not quite. Input and output (+), and truncate.', 'لأ. محتاج input و output (يعني +)، ومعاهم truncate.') },
            { a: 5, o: M, q: t('A guest book: read the old entries and add new ones at the end. <b>Create it</b> if it is missing.', 'دفتر زوار: اقرا الكلام القديم وزوّد الجديد في الآخر. ولو مش موجود <b>اعمله</b>.'), n: t('Right: <code>"a+"</code>. In C++: <code>ios::out | ios::in | ios::app</code>.', 'صح، هو <code>"a+"</code>. وفي <bdi dir="ltr">C++</bdi> بيبقى <code>ios::out | ios::in | ios::app</code>.'), w: t('Not quite. Input and output (+), appending, and it may create the file.', 'لأ. محتاج input و output (يعني +)، وappend، وممكن يعمل الـ file.') },
            { a: 1, o: ['rb', 'rb+', 'wb+', 'ab+'], q: t("The sample program's <code>emp.txt</code>: an <b>existing binary</b> file of records. Read records and overwrite some, keeping the rest.", 'الـ <code>emp.txt</code> بتاع البرنامج المثال: file <b>binary موجود</b> فيه records. اقرا records وغيّر شوية منهم، والباقي يفضل.'), n: t('Right: <code>"rb+"</code>, as on the slide. In C++: <code>out | in | binary</code>.', 'صح، هو <code>"rb+"</code> زي السلايد. وفي <bdi dir="ltr">C++</bdi> بيبقى <code>out | in | binary</code>.'), w: t('Not quite. Existing file, both directions, binary.', 'لأ. file موجود، قراية وكتابة، و binary.') }
          ]; })()} />
          <${Grow} />
          <${Hand} arrow="up">${t('use ‹ › to move between the six programs', 'استخدم ‹ › عشان تتنقل بين الست برامج')}</${Hand}>
        `, { sec: t('Be the C runtime', 'خليك إنت الـ C runtime') }),

        // 23 · be the C runtime: what's in the file
        page(html`
          <${Box} kind="pencil" title=${t("What's in the file now?", 'الـ file فيه إيه دلوقتي؟')}><p className="hf-p small">${X('Our example: <code>data.txt</code> holds <b>HELLO</b>. A program opens it, writes <b>AB</b> and closes. Tick what the file holds. (<b>NULL</b> = fopen failed.)',
            'مثال من عندنا: الـ <code>data.txt</code> فيه <b>HELLO</b>. برنامج بيفتحه، ويكتب <b>AB</b>، ويقفله. علّم على اللي في الـ file. (الـ <b>NULL</b> معناها الـ fopen فشلت.)')}</p></${Box}>
          <div className="hf-fp1-file hf-in" dir="ltr">${['H', 'E', 'L', 'L', 'O'].map((c, i) => html`<span key=${i}>${c}</span>`)}</div>
          <${Grid} id="after" cols=${['HELLOAB', 'AB', 'ABLLO', 'HELLO', 'NULL']} rows=${[
            { a: 0, l: '"a"', n: t('<code>"a"</code>: append, so AB goes after the old bytes: HELLOAB.', 'الـ <code>"a"</code> بيعمل append، فالـ AB بتتكتب بعد الـ bytes القديمة.') },
            { a: 1, l: '"w"', n: t('<code>"w"</code>: the file is truncated to empty first, so only AB.', 'الـ <code>"w"</code> بيفضّي الـ file الأول، فبيفضل AB بس.') },
            { a: 2, l: '"r+"', n: t('<code>"r+"</code>: contents kept and you start at the beginning, so AB overwrites HE: ABLLO.', 'الـ <code>"r+"</code> بيسيب المحتوى، وإنت واقف في الأول، فالـ AB بتكتب على الـ HE.') },
            { a: 3, l: '"r"', n: t('<code>"r"</code>: reading only, so the write is not allowed and HELLO stays.', 'الـ <code>"r"</code> قراية بس، فالكتابة مش مسموحة والـ HELLO زي ما هي.') },
            { a: 4, l: '"r+"', s: t('no file yet', 'مفيش file'), n: t('<code>"r+"</code> needs an existing file: fopen returns NULL.', 'الـ <code>"r+"</code> محتاج file موجود، فالـ fopen بترجّع NULL.') },
            { a: 1, l: '"a"', s: t('no file yet', 'مفيش file'), n: t('<code>"a"</code> creates a new file, so it holds just AB.', 'الـ <code>"a"</code> بيعمل file جديد، فبيبقى فيه AB بس.') }
          ]} />
        `),

        // 24 · closing
        page(html`
          <${H1}>${t('Closing: hang up the phone', 'القفل: اقفل السكة')}</${H1}>
          <${P}>${X('Closing <b>frees the logical name</b> so it can be used for another physical file, "like hanging up the telephone after a call".',
            'القفل <b>بيحرر الـ logical name</b> عشان ينفع يتربط بـ physical file تاني، "زي ما بتقفل السكة بعد المكالمة".')}</${P}>
          <${Talk} who="mem">${X("And one more thing. I don't send your bytes to the disk <b>one by one</b>. I collect them in a <b>buffer</b> and send them as a <b>block</b>.", 'وحاجة كمان: أنا مش ببعت الـ bytes بتاعتك للـ disk <b>واحدة واحدة</b>. بجمّعها في <b>buffer</b> وأبعتها مرة واحدة كـ <b>block</b>.')}</${Talk}>
          <${P} small=${true}>${X('If you do not close, the <b>OS closes the file</b> at the end of the program. If the program <b>terminates abnormally, data may be lost</b>.',
            'لو ما قفلتش، الـ <b>OS هيقفل الـ file</b> في آخر البرنامج. بس لو البرنامج <b>وقع فجأة (terminated abnormally) ممكن الداتا تضيع</b>.')}</${P}>
          <${Code} lines=${[['fclose(outfile);', t('← in C', 'في C')], ['outfile.close();', t('← in C++‎', 'في C++‎')]]} />
        `, { sec: t('Closing files', 'قفل الـ files') }),

        // 25 · buffer figure
        page(html`
          <${H2}>${t('Write, close, crash: watch the buffer', 'اكتب، اقفل، اقع: اتفرج على الـ buffer')}</${H2}>
          <${Fig} name="fp-buffer" />
        `),

        // 26 · generic read/write
        page(html`
          <${H1}>${t('Reading and writing', 'القراية والكتابة')}</${H1}>
          <${P} small=${true}>${t('Two generic operations (slides 29, 33):', 'عمليتين عامّتين (slides 29 و 33):')}</${P}>
          <${Code} lines=${['Read(Source_file,', '     Destination_addr, Size)', 'Write(Destination_file,', '      Source_addr, Size)']} />
          <${UL} items=${A ? [
            'الـ <b>file</b> هو الـ logical file name اللي بنقرا منه أو بنكتب فيه.',
            'الـ <b>addr</b> هو أول عنوان في الـ memory block: اللي الداتا هتتقري فيه (Read)، أو اللي فيه الداتا اللي هتتكتب (Write).',
            'الـ <b>Size</b> هو عدد الـ bytes.'
          ] : [
            'The <b>file</b> is the logical file name we read from or write to.',
            'The <b>addr</b> is the first address of the memory block: where data is read into (Read), or where the data to write is stored (Write).',
            '<b>Size</b> is the number of bytes.'
          ]} />
          <${P} small=${true}>${X('In C these are <code>fread</code> and <code>fwrite</code>, with four arguments: (1) the <b>address</b> of the variable, (2) the <b>element size</b> in bytes, (3) the <b>number of elements</b>, (4) the <b>logical file name</b>.',
            'في C دول <code>fread</code> و<code>fwrite</code>، وليهم 4 arguments: (1) <b>عنوان</b> الـ variable، (2) <b>حجم العنصر</b> بالـ bytes، (3) <b>عدد العناصر</b>، (4) الـ <b>logical file name</b>.')}</${P}>
        `, { sec: t('Reading and writing', 'القراية والكتابة') }),

        // 27 · rw args figure
        page(html`
          <${H2}>${t('The four arguments, one by one', 'الـ 4 arguments، واحد واحد')}</${H2}>
          <${Fig} name="fp-rw-args" />
        `),

        // 28 · code in C and C++
        page(html`
          <div className="hf-fp1-sm hf-in" style=${{ display: 'grid', gap: '7px' }}>
            <p className="hf-hand">${t('in C (slides 31, 34)', 'في C (slides 31 و 34)')}</p>
            <${Code} lines=${['char c; char a[100];', 'FILE * infile;', 'infile = fopen("myfile.txt","r");', ['fread(&c,1,1,infile);', t('1 char', 'حرف واحد')], ['fread(a,1,10,infile);', t('10 chars', 'عشر حروف')], ['fwrite(&c,1,1,outfile);', t('the same 4 args', 'نفس الـ 4')]]} />
            <p className="hf-hand">${t('in C++‎ (slides 32, 35)', 'في C++‎ (slides 32 و 35)')}</p>
            <${Code} lines=${['fstream infile;', 'infile.open("myfile.txt",ios::in);', ['infile >> c;', t('1 byte, implied', 'بايت واحد، مفهوم ضمنًا')], 'infile.read(&c,1);', ['infile.read(a,10);', t('10 bytes', 'عشرة bytes')], 'outfile << c; outfile.write(a,10);']} />
          </div>
          <${P} small=${true}>${X('A <b>char</b> occupies 1 byte, so the element size is 1. In C++‎, <code>&gt;&gt;</code> says the same thing at a higher level: c is a char, so 1 byte is implied. <code>read</code>/<code>write</code> correspond to fread/fwrite.',
            'الـ <b>char</b> بياخد 1 byte، فالـ element size بيساوي 1. وفي <bdi dir="ltr">C++‎</bdi> الـ <code>&gt;&gt;</code> بتقول نفس الكلام على مستوى أعلى: الـ c نوعها char، فمفهوم إنه byte واحد. والـ <code>read</code> والـ <code>write</code> هما المقابل لـ fread و fwrite.')}</${P}>
          <${P} small=${true}>${X('‡ Slide 34 calls fwrite\'s 1st argument the "destination address". For fwrite it is really the <b>source</b> address: the memory the data is written from.',
            '‡ الـ slide 34 بتسمي أول argument في fwrite «destination address»، بس هو في الحقيقة الـ <b>source</b> address، يعني الـ memory اللي الداتا بتتكتب منها.')}</${P}>
        `),

        // 29 · end of file
        page(html`
          <${H2}>${t('How do you know the file has ended?', 'تعرف إزاي إن الـ file خلص؟')}</${H2}>
          <div className="hf-fp1-sm hf-in"><${Code} lines=${[['i = fread(&c,1,1,infile);', t('try to read', 'حاول تقرا')], ['if (i==0) …', t('C: file ended', 'في C الـ file خلص')], ['infile >> c;', t('try to read', 'حاول تقرا')], ['if (infile.fail()) …', t('C++‎: file ended', 'في C++‎ الـ file خلص')]]} /></div>
          <${P} small=${true}>${X('In C, <code>fread</code> returning <b>0</b> means the file has ended. In C++‎, <code>infile.fail()</code> returns true; alternatively, <code>infile.eof()</code> returns true.',
            'في C، لو الـ <code>fread</code> رجّعت <b>0</b> يبقى الـ file خلص. وفي <bdi dir="ltr">C++‎</bdi> الـ <code>infile.fail()</code> بترجع true، أو بدلها الـ <code>infile.eof()</code> بترجع true.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('Three look-alikes the exam mixes up: <b>0</b> = what fread returns at end of file (a count); <b>NULL</b> = what fopen returns when the file did not open; <b>EOF</b> = an integer constant in stdio.h whose value is <b>−1</b> (fgetc and fscanf return it at the end).',
            'تلات حاجات شبه بعض الامتحان بيلخبطهم: الـ <b>0</b> هو اللي fread بترجّعه في آخر الـ file (ده عدد)، والـ <b>NULL</b> هو اللي fopen بترجّعه لو الـ file مافتحش، والـ <b>EOF</b> ده integer constant في stdio.h قيمته <b><bdi dir="ltr">−1</bdi></b> (بترجّعه fgetc و fscanf في الآخر).')}</p></${Box}>
          <${Hand}>${t('the lectures use EOF but never print its value; −1 is the C standard value', 'المحاضرات بتستخدم EOF بس مش بتكتب قيمته، والـ −1 دي القيمة الـ standard في C')}</${Hand}>
        `, { sec: t('End of file', 'آخر الـ file') }),

        // 30 · read sim figure
        page(html`
          <${H2}>${t('Read until the end, in C and C++‎', 'اقرا لحد الآخر، في C و C++‎')}</${H2}>
          <${Fig} name="fp-read-sim" />
        `),

        // 31 · be the C runtime: trace
        page(html`
          <${Box} kind="pencil" title=${t('Be the C runtime, again', 'خليك إنت الـ C runtime تاني')}><p className="hf-p small">${X('Our example: <code>myfile.txt</code> holds the 13 letters <b>ABCDEFGHIJKLM</b>. Run these lines in order.', 'مثال من عندنا: الـ <code>myfile.txt</code> فيه 13 حرف: <b>ABCDEFGHIJKLM</b>. شغّل السطور دي بالترتيب.')}</p></${Box}>
          <div className="hf-fp1-sm hf-in"><${Code} lines=${['1  fread(&c,1,1,infile);', '2  fread(a,1,10,infile);', '3  i = fread(&c,1,1,infile);', '4  i = fread(&c,1,1,infile);', '5  i = fread(&c,1,1,infile);']} /></div>
          <${Pick} id="trace" items=${[
            { a: 0, o: ['A', 'B', 'M'], q: t('After line 1, c holds:', 'بعد السطر 1، الـ c فيها:'), n: t('you start at the beginning of the file', 'إنت بتبدأ من أول الـ file') },
            { a: 1, o: ['ABCDEFGHIJ', 'BCDEFGHIJK', 'KLM'], q: t('After line 2, the 10 characters in a are:', 'بعد السطر 2، الـ 10 حروف اللي في a هما:'), n: t('it carries on from where line 1 stopped', 'بتكمّل من مكان ما السطر 1 وقف') },
            { a: 1, o: ['10', '11', '2'], q: t('Bytes read by lines 1 and 2 together:', 'عدد الـ bytes اللي السطرين 1 و 2 قروها مع بعض:'), n: t('1 × 1 + 1 × 10 = 11', 'يعني <bdi dir="ltr">1 × 1 + 1 × 10 = 11</bdi>') },
            { a: 1, o: ['1, 1, 1', '1, 1, 0', '1, 0, 0'], q: t('The values of i after lines 3, 4, 5:', 'قيم الـ i بعد السطور 3 و 4 و 5:'), n: t('L and M are left; line 5 finds nothing: 0 = end of file', 'فاضل L و M بس، والسطر 5 ملقاش حاجة، والـ 0 معناها الـ file خلص') }
          ]} />
        `, { sec: t('Be the C runtime', 'خليك إنت الـ C runtime') }),

        // 32 · read methods
        page(html`
          <${H1}>${t('Four ways to read in C', 'أربع طرق للقراية في C')}</${H1}>
          ${tb([t('Method', 'الـ Method'), t('Short for', 'اختصار'), t('Reads', 'بتقرا')], A ? [
            ['<code>fgetc</code>', 'File Get Character', 'حرف واحد'],
            ['<code>fgets</code>', 'File Get String', 'الـ string (‡ بالكتير <bdi dir="ltr">n−1</bdi> حرف)'],
            ['<code>fscanf</code>', 'File Scan Format', 'الـ formatted text'],
            ['<code>fread</code>', 'File Read', 'الـ record (block)']
          ] : [
            ['<code>fgetc</code>', 'File Get Character', 'one character'],
            ['<code>fgets</code>', 'File Get String', 'a string (‡ at most n−1 chars)'],
            ['<code>fscanf</code>', 'File Scan Format', 'formatted text'],
            ['<code>fread</code>', 'File Read', 'a record (block)']
          ], ['24%', '40%', '36%'])}
          <div className="hf-fp1-sm hf-in"><${Code} lines=${['ch = fgetc(fp);', 'fgets(string, 80, fp);', 'fscanf(my_file,"%c %d %x",…);', 'fread(&emp,sizeof(emp),1,my_file);']} /></div>
          <${Box} kind="watch"><p className="hf-p small">${X('<code>fgets(str, n, fp)</code> reads at most <b>n−1</b> characters (it keeps one place for the end of the string). And the writing partners: <code>fputc</code> writes a character, <code>fputs</code> <b>writes a line</b>: f = file, put = write, s = string.',
            'الـ <code>fgets(str, n, fp)</code> بتقرا بالكتير <b><bdi dir="ltr">n−1</bdi></b> حرف (بتسيب مكان لنهاية الـ string). والقرايب اللي بتكتب: الـ <code>fputc</code> بتكتب character، والـ <code>fputs</code> <b>بتكتب سطر</b>: الـ f يعني file، والـ put يعني write، والـ s يعني string.')}</p></${Box}>
        `, { sec: t('Read methods', 'طرق القراية') }),

        // 33 · match
        page(html`
          <${H2}>${t('Who does what?', 'مين بيعمل إيه؟')}</${H2}>
          <${P} small=${true}>${t('Tap a function, then the job it does.', 'دوس على الـ function، وبعدين على الشغلانة بتاعتها.')}</${P}>
          <${Match} id="fn" left=${['fgetc', 'fgets', 'fscanf', 'fread', 'fputc', 'fputs']}
            right=${A ? ['بتكتب string (سطر)', 'بتقرا record (block)', 'بتقرا character واحد', 'بتكتب character واحد', 'بتقرا formatted text', 'بتقرا string']
              : ['Writes a string (a line)', 'Reads a record (block)', 'Reads one character', 'Writes one character', 'Reads formatted text', 'Reads a string']}
            answer=${[2, 5, 4, 1, 3, 0]} />
          <${Grow} />
          <${Hand}>${t('Trick (ours): get = read, put = write, c = char, s = string.', 'حيلة (من عندنا): الـ get قراية، والـ put كتابة، والـ c حرف، والـ s سطر.')}</${Hand}>
        `),

        // 34 · read methods figure
        page(html`
          <${H2}>${t('The four readers at work (slide 30)', 'الـ 4 طرق وهي شغالة (slide 30)')}</${H2}>
          <${Fig} name="fp-read-methods" />
        `),

        // 35 · standard I/O
        page(html`
          <${H2}>${t('Files you never open', 'ملفات عمرك ما بتفتحها')}</${H2}>
          <${P} small=${true}>${X('Some logical names are ready before your program starts. They <b>do not need to be opened or closed</b> (slide 37):', 'فيه logical names جاهزة قبل البرنامج ما يبدأ، و<b>مش محتاجة تتفتح ولا تتقفل</b> (slide 37):')}</${P}>
          ${tb([t('Purpose', 'الغرض'), t('Default', 'الـ Default'), 'C', 'C++‎'], A ? [
            ['الـ Standard output', 'الشاشة', '<code>stdout</code>', '<code>cout</code>'],
            ['الـ Standard input', 'الـ keyboard', '<code>stdin</code>', '<code>cin</code>'],
            ['الـ Standard error', 'الشاشة', '<code>stderr</code>', '<code>cerr</code>']
          ] : [
            ['Standard output', 'Console / screen', '<code>stdout</code>', '<code>cout</code>'],
            ['Standard input', 'Keyboard', '<code>stdin</code>', '<code>cin</code>'],
            ['Standard error', 'Console / screen', '<code>stderr</code>', '<code>cerr</code>']
          ], ['32%', '28%', '20%', '20%'])}
          <${Talk} who="dev">${X('So <code>printf</code> is really writing to a file called <code>stdout</code>?', 'يعني الـ <code>printf</code> بتكتب في file اسمه <code>stdout</code>؟')}</${Talk}>
          <${Talk} who="cpu" flip=${true}>${X('Exactly: a logical name for the screen.', 'بالظبط: logical name للشاشة.')}</${Talk}>
          <${Hand} red=${true}>${X('Standard error in C is <b>stderr</b>; <code>cerr</code> is the C++‎ one.', 'الـ standard error في C اسمه <b>stderr</b>، و<code>cerr</code> ده بتاع <bdi dir="ltr">C++</bdi>.')}</${Hand}>
        `, { sec: t('Standard I/O', 'الـ Standard I/O') }),

        // 36 · sample program
        page(html`
          <${H2}>${t('The sample program (slides 38–40)', 'البرنامج المثال (slides 38 لـ 40)')}</${H2}>
          <${P} small=${true}>${X('<b>Open</b> the file for input → <b>while</b> there are records, read one and show it → <b>close</b> the file.', '<b>افتح</b> الـ file للـ input، و<b>طول ما</b> فيه records اقرا واحد واعرضه، وبعدين <b>اقفل</b> الـ file.')}</${P}>
          <div className="hf-fp1-sm hf-in"><${Code} lines=${[
            'struct employee {',
            '  char name[20]; int sal; };',
            'FILE *my_file; struct employee emp;',
            'my_file=fopen("c:\\\\emp.txt","rb+");',
            'if (my_file == NULL) {',
            '  printf("Error in opening file");',
            '  exit(1); }',
            ['while (!feof(my_file)) {', '‡'],
            '  fread(&emp,sizeof(emp),1,my_file);',
            '  printf("The Emp Name: %s \\t",',
            '         emp.name);',
            '  printf("The Emp Sal : %d\\n",',
            '         emp.sal);',
            '}',
            'fclose(my_file);'
          ]} /></div>
          <${Box} kind="brain"><p className="hf-p small">${t('emp.txt holds 3 records. How many lines does this loop print? Count before you turn the page.', 'الـ emp.txt فيه 3 records. الـ loop دي هتطبع كام سطر؟ عدّ قبل ما تقلب الصفحة.')}</p></${Box}>
        `, { sec: t('The sample program', 'البرنامج المثال') }),

        // 37 · sample run figure
        page(html`
          <${H2}>${t('Four lines for three records?!', 'أربع سطور لـ 3 records؟!')}</${H2}>
          <${Fig} name="fp-sample-run" />
        `),

        // 38 · the ‡ list
        page(html`
          <${Box} kind="watch" title=${t('Watch it: the slide code has slips', 'خلّي بالك: كود السلايد فيه غلطات')}>
            <p className="hf-p small">${X('‡ <code>while(!feof())</code> only becomes true <i>after</i> a read fails, so the last record may print <b>twice</b>. Checking <code>fread(...) == 1</code> is safer.', '‡ الـ <code>while(!feof())</code> مش بتبقى true غير <i>بعد</i> ما قراية تفشل، فآخر record ممكن يتطبع <b>مرتين</b>. والأأمن إنك تشيك على <bdi dir="ltr">fread(...)&nbsp;==&nbsp;1</bdi>.')}</p>
            <ul className="hf-ul" style=${{ marginTop: '5px' }}>${(A ? [
              'الـ slides بتطبع الـ salary بـ <code>%f</code> وهي int، والصح <code>%d</code>.',
              'فيه <code>"</code> زيادة بعد emp.sal.',
              'الـ <code>==</code> مكتوبة على شكل <code>= =</code>.',
              'بتستخدم <bdi dir="ltr">void&nbsp;main()</bdi>، وبتخلص بـ <code>getch();</code>.'
            ] : [
              'The slides print the int salary with <code>%f</code>; use <code>%d</code>.',
              'A stray <code>"</code> after emp.sal.',
              '<code>==</code> is written as <code>= =</code>.',
              'It uses <code>void main()</code> and ends with <code>getch();</code>.'
            ]).map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul></${Box}>
          <${Dumb} qa=${A ? [
            ['ليه بنشيّك على <code>my_file == NULL</code>؟', 'عشان نختبر الـ file <b>اتفتح ولا لأ</b>. الـ fopen بترجّع NULL لو مقدرتش تفتحه، فبنطبع رسالة ونعمل <code>exit(1)</code>.'],
            ['ليه الـ mode هنا <code>"rb+"</code>؟', 'لأن الـ records متخزنة <b>binary</b> (struct زي ما هو في الـ memory)، والـ file لازم يكون <b>موجود</b>.']
          ] : [
            ['Why test <code>my_file == NULL</code>?', 'To test whether the file <b>opened or not</b>. fopen returns NULL when it cannot open the file, so we print a message and <code>exit(1)</code>.'],
            ['Why the mode <code>"rb+"</code>?', 'The records are stored in <b>binary</b> (the struct as it is in memory), and the file must <b>already exist</b>.']
          ]} />
        `),

        // 39 · full methods
        page(html`
          <${H1}>${t('The full methods (slides 41–54)', 'الـ Full methods (slides 41 لـ 54)')}</${H1}>
          ${tb([t('Method', 'الـ Method'), t('What it does', 'بتعمل إيه')], A ? [
            ['<code>writeC()</code>', 'تاخد character من الـ keyboard بـ <code>getche()</code> وتكتبه في alphabet.txt بـ <code>fputc</code>'],
            ['<code>readC()</code>', 'تقرا character من alphabet.txt بـ <code>fgetc</code> وتطبعه بـ <code>putchar</code>'],
            ['<code>writeS()</code>', 'تاخد strings بـ <code>gets</code> لحد سطر فاضي، وتكتبها في std.txt بـ <code>fputs</code>'],
            ['<code>readS()</code>', 'تقرا strings من std.txt بـ <code>fgets</code> لحد <code>feof</code>، وتطبعها بـ <code>puts</code>'],
            ['<code>writeASCII()</code>', 'تكتب characters من 32 لـ 127 في ascii.txt بـ <code>fprintf</code>'],
            ['<code>readASCII()</code>', 'تقرا ascii.txt بـ <code>fgets</code> وبعدين <code>fscanf</code> لحد ما ترجّع <code>EOF</code>']
          ] : [
            ['<code>writeC()</code>', 'gets one character from the keyboard with <code>getche()</code>, writes it to alphabet.txt with <code>fputc</code>'],
            ['<code>readC()</code>', 'reads one character from alphabet.txt with <code>fgetc</code>, prints it with <code>putchar</code>'],
            ['<code>writeS()</code>', 'reads strings with <code>gets</code> until an empty line, writes them to std.txt with <code>fputs</code>'],
            ['<code>readS()</code>', 'reads strings from std.txt with <code>fgets</code> until <code>feof</code>, prints them with <code>puts</code>'],
            ['<code>writeASCII()</code>', 'writes characters 32 to 127 to ascii.txt with <code>fprintf</code>'],
            ['<code>readASCII()</code>', 'reads ascii.txt: <code>fgets</code> for the header, then <code>fscanf</code> until it returns <code>EOF</code>']
          ], ['33%', '67%'])}
          <${P} small=${true}>${X('‡ The slides name readS() and readASCII() <code>read()</code>. <b>Activity (1) / Quiz (1)</b>: redo slides 38–53 in C++.',
            '‡ في السلايدز الـ readS() والـ readASCII() الاتنين اسمهم <code>read()</code>. والـ <b>Activity (1)</b> أو الـ <b>Quiz (1)</b>: أعد كتابة كل أمثلة C من slide 38 لـ 53 كبرامج <bdi dir="ltr">C++‎</bdi>.')}</${P}>
        `, { sec: t('Full methods', 'الـ Full methods') }),

        // 40 · ascii figure
        page(html`
          <${Fig} name="fp-ascii" />
          <${Hand} red=${true}>${X('‡ The slide passes <code>ch, num, hex</code> to fscanf; it needs their addresses: <code>&amp;ch, &amp;num, &amp;hex</code>.', '‡ السلايد بتبعت <code>ch, num, hex</code> للـ fscanf، وهي محتاجة العناوين بتاعتهم:<span class="ltr"><code>&amp;ch, &amp;num, &amp;hex</code></span>')}</${Hand}>
        `),

        // 41–44 · exam corner
        page(html`
          <${Box} kind="exam" title=${exam}><p className="hf-p small">${t("Real questions from the doctors' midterms and summary sheet. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من ميدترمات الدكاترة والـ summary. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /correct syntax for opening a file\.$/)}
          <${Grow} />
          <${Talk} who="dev" flip=${true}>${X('Name, mode, and a <code>FILE *</code> back: three things to look for.', 'دوّر على تلات حاجات: اسم الـ file، والـ mode، وإنها بترجّع <code>FILE *</code>.')}</${Talk}>
        `, { sec: exam }),
        page(html`
          ${mq('m2', /mode "w\+" do/)}
          <${Grow} />
          <${Hand} red=${true}>${t('the + means input AND output; w means truncate', 'الـ + معناها input و output، والـ w معناها truncate')}</${Hand}>
        `),
        page(html`
          ${mq('m3', /at most one less/)}
          <${Grow} />
          <${Talk} who="mem" flip=${true}>${X('<code>fgets(str, 80, fp)</code>: 79 characters, and I keep the last place for the end of the string.', 'الـ <code>fgets(str, 80, fp)</code> بتقرا 79 حرف، وأنا بسيب آخر مكان لنهاية الـ string.')}</${Talk}>
        `),
        page(html`
          ${mq('m4', /EOF is an integer/)}
          <${Grow} />
          <${Hand} red=${true}>${t('0 from fread, NULL from fopen, EOF (−1) from fgetc and fscanf', 'الـ 0 من fread، والـ NULL من fopen، والـ EOF (−1) من fgetc و fscanf')}</${Hand}>
        `),
        page(html`
          ${mq('m5', /reposition the file pointer/)}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Also asked: which is <b>not</b> used to seek? The origins are <code>ios::beg</code>, <code>ios::cur</code> and <code>ios::end</code>; <b><code>ios::set</code> does not exist</b>. And "not used as a file opening mode": the key says <code>ios::trunc</code>, since it only empties the file when it opens.',
            'واتسأل كمان: أنهي واحدة <b>مش</b> بتستخدم في الـ seek؟ الـ origins هما <code>ios::beg</code> و<code>ios::cur</code> و<code>ios::end</code>، أما <b><code>ios::set</code> فمش موجودة</b>. وفي سؤال "مش opening mode" الإجابة <code>ios::trunc</code>، لأنه بس بيفضّي الـ file وقت الفتح.')}</p></${Box}>
        `),

        // 44 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ data structures للداتا في الـ <b>main memory</b>، والـ file structures للداتا على الـ <b>secondary storage</b>.',
            'الـ file: داتا على storage <b>secondary و non-volatile</b>. التخزين بطيء عشان الـ moving parts.',
            'الـ structure: <b>logical</b> (الـ programmer شايفه إزاي) و<b>physical</b> (متخزن إزاي).',
            'الـ organization: الـ logical هي heap و indexing و hashing، والـ physical هي tracks بالـ sectors أو الـ blocks. لازم <b>access سريع ومساحة مستغلة كويس</b>.',
            'الـ file managers هما الـ <b>OS والـ DBMS</b>.',
            'الـ physical name بيتستخدم مرة وقت الفتح، والـ logical name كل مرة.',
            'الـ modes: r و w و a، ومعاهم + للاتنين، و b للـ binary. وفي <bdi dir="ltr">C++‎</bdi> بـ flags متجمّعة بـ <code>|</code>.',
            'الـ bytes بتروح للـ disk كـ <b>block</b> من الـ buffer. اقفل الـ file، وإلا الوقوع المفاجئ بيضيّع الداتا.',
            'آخر الـ file: الـ fread بترجّع <b>0</b> في C، والـ <code>fail()</code> أو <code>eof()</code> في <bdi dir="ltr">C++‎</bdi>.'
          ] : [
            'Data structures: data in <b>main memory</b>. File structures: data in <b>secondary storage</b>.',
            'A file is data on <b>secondary, non-volatile</b> storage; slow because of moving parts.',
            'Structure: <b>logical</b> (how programmers see it) and <b>physical</b> (how it is stored).',
            'Organization: logical = heap, indexing, hashing; physical = tracks by sectors or blocks. Must give <b>fast access and good space use</b>.',
            'File managers: the <b>OS and the DBMS</b>.',
            'Physical name: used once, at opening. Logical name: used every time.',
            'Modes: r, w, a; + for both; b for binary. C++‎ ORs ios flags with <code>|</code>.',
            'Bytes go to the disk as a <b>block</b> from a buffer. Close files: an abnormal end can lose data.',
            'End of file: fread returns <b>0</b> in C; <code>fail()</code> or <code>eof()</code> in C++‎.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 45 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 1!', 'خلّصت الفصل الأول!')}</${H1}>
            <${Talk} who="disk">${t('Next time: what I look like inside. Platters, tracks, sectors, and why I am so slow.', 'المرة الجاية: أنا من جوه شكلي إيه. الـ platters والـ tracks والـ sectors، وليه أنا بطيء كده.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [1], t: Date.now() } }}>${t('Quiz me on Lecture 1', 'امتحنّي في محاضرة 1')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 1, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 1, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

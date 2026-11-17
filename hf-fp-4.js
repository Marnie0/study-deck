// Head First chapter for File Processing Lecture 4 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Ordered and unordered files: file organization methods, sequential search vs direct access, the heap (pile) file, the cost
// model B, R, D, C, heap file costs, the ordered (sequential, sorted) file and its shifting insert, sorted file costs, the cost
// comparison table (with the hashed column) and how the exam spells "search +" out.
// Every fact and formula comes from the lecture's notes; our own analogies and practice numbers are marked as ours.
// All numbers were worked by hand twice and checked with node. Arabic follows the site's rules (see hf-compiler.js).
// lectures: [4]
(function () {
  const H = window.HF; H.chapters.fp = H.chapters.fp || {};
  const { html } = H.K;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = H.K.T;

  if (!document.getElementById('hf-css-fp4')) {
    const s = document.createElement('style'); s.id = 'hf-css-fp4';
    s.textContent = `
.hfb .hf-fp4-drill{ display:grid; gap:4px; }
.hfb .hf-fp4-dr{ display:grid; grid-template-columns:minmax(0,1fr) 84px 16px; gap:3px 7px; align-items:center; padding:3px 5px; border-radius:6px; border:1.5px solid transparent; }
.hfb .hf-fp4-dr.hf-fp4-ok{ border-color:var(--ok); } .hfb .hf-fp4-dr.hf-fp4-no{ border-color:var(--hf-red); }
.hfb .hf-fp4-dl{ font:600 14px/1.25 var(--body); color:var(--ink); }
.hfb.hf-ar .hf-fp4-dl{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.4; }
.hfb .hf-fp4-dr input, .hfb .hf-fp4-sh input{ width:100%; box-sizing:border-box; height:30px; font:700 14px/1 var(--mono); padding:0 6px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); text-align:center; }
.hfb .hf-fp4-dr input:focus, .hfb .hf-fp4-sh input:focus{ outline:2px solid var(--hf-hand); outline-offset:0; }
.hfb .hf-fp4-mk{ font:800 14px/1 var(--body); text-align:center; }
.hfb .hf-fp4-ok .hf-fp4-mk{ color:var(--ok); } .hfb .hf-fp4-no .hf-fp4-mk{ color:var(--hf-red); }
.hfb .hf-fp4-why{ grid-column:1 / -1; font:600 13px/1.25 var(--mono); color:var(--hf-hand); text-align:left; }
.hfb .hf-fp4-no .hf-fp4-why{ color:var(--hf-red); }
.hfb .hf-fp4-sh{ display:grid; grid-template-columns:minmax(0,1fr) 58px 58px 16px; gap:3px 6px; align-items:center; }
.hfb .hf-fp4-sh .hd{ font:800 12.5px/1.15 var(--body); text-transform:uppercase; letter-spacing:.04em; color:var(--graphite); text-align:center; }
.hfb.hf-ar .hf-fp4-sh .hd{ font-family:"IBM Plex Sans Arabic", var(--body); text-transform:none; letter-spacing:0; font-size:12.5px; }
.hfb .hf-fp4-case{ font:700 14px/1.2 var(--mono); color:var(--ink); }
.hfb .hf-fp4-case i{ font-style:normal; color:var(--hf-k); }
.hfb .hf-fp4-case small{ display:block; font:600 12.5px/1.1 var(--body); color:var(--graphite); margin-top:2px; }
.hfb.hf-ar .hf-fp4-case small{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-fp4-strip{ grid-column:1 / -1; display:flex; gap:3px; flex-wrap:wrap; padding:0 0 2px; border-bottom:1px dotted var(--faint); }
.hfb .hf-fp4-strip span{ min-width:38px; text-align:center; border:1.5px solid var(--hf-line); border-radius:5px; font:700 13.5px/1.1 var(--mono); padding:2px 3px; background:var(--paper); color:var(--ink); animation:hf-up .4s both; }
.hfb .hf-fp4-strip span small{ display:block; font:600 11.5px/1.1 var(--mono); color:var(--graphite); }
.hfb .hf-fp4-strip span.mv{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 16%, var(--paper)); }
.hfb .hf-fp4-strip span.nw{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 20%, var(--paper)); }
.hfb .hf-fp4-strip span.calm{ animation:none; }
.hfb .hf-fp4-ct{ width:100%; border-collapse:collapse; table-layout:auto; font-size:13px; line-height:1.25; color:var(--ink); }
.hfb .hf-fp4-ct th, .hfb .hf-fp4-ct td{ border:1px solid var(--hf-line); padding:4px 2px; vertical-align:middle; text-align:center; }
.hfb .hf-fp4-ct thead th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-fp4-ct tbody th{ font-weight:700; color:var(--graphite); text-align:start; padding-inline-start:5px; }
.hfb .hf-fp4-ct td{ font:500 13px/1.25 var(--body); }
.hfb .hf-fp4-ct td.hf-fp4-same{ background:color-mix(in srgb, var(--hf-k) 10%, var(--paper)); }
.hfb.hf-ar .hf-fp4-ct th{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb .hf-fp4-legend{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:3px 10px; font-size:14.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-fp4-legend > b{ font:800 22px/1 var(--mono); color:var(--hf-k); text-align:center; }
.hfb.hf-ar .hf-fp4-legend{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:14px; line-height:1.45; }
`;
    document.head.appendChild(s);
  }

  // a cost drill: type the cost of each operation; rows are [label (html), answer (number), working (notation)]
  const num = s => { const x = String(s == null ? '' : s).replace(/[\s,]/g, '').replace(/ms$/i, ''); return /^-?\d*\.?\d+$/.test(x) ? parseFloat(x) : NaN; };
  function CostDrill({ id, rows, unit }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const ok = i => Math.abs(num(v[i]) - rows[i][1]) < 1e-6;
    const right = rows.filter((_, i) => ok(i)).length;
    const put = (i, x) => { setV(Object.assign({}, v, { [i]: x })); setChecked(false); };
    return html`<div className="hf-in">
      <div className="hf-fp4-drill">${rows.map((r, i) => {
        const st = checked ? (ok(i) ? ' hf-fp4-ok' : ' hf-fp4-no') : '';
        return html`<div key=${i} className=${'hf-fp4-dr' + st}>
          <span className="hf-fp4-dl">${T(r[0])}</span>
          <input type="text" inputMode="decimal" dir="ltr" value=${v[i] || ''} placeholder=${unit || '?'} aria-label=${String(r[0]).replace(/<[^>]+>/g, '')} onInput=${e => put(i, e.target.value)} />
          <span className="hf-fp4-mk">${checked ? (ok(i) ? '✓' : '✗') : ''}</span>
          ${checked ? html`<span className="hf-fp4-why" dir="ltr">${T(r[2])}</span>` : null}</div>`; })}</div>
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; rows.forEach((r, i) => { m[i] = String(r[1]); }); setV(m); setChecked(true); }}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${rows.length}</bdi></span>`}
      </div></div>`;
  }

  // be the shifter: insert into (or delete from) an ordered file of 20-byte records; say the offset and how many records move.
  // case 1 is the notes' example, case 2 the site's practice question, cases 3 and 4 are ours.
  const SH = [
    { keys: [1, 2, 3, 5], op: 'ins', k: 4, src: 'notes' },
    { keys: [1, 2, 4, 6, 7], op: 'ins', k: 3, src: 'site' },
    { keys: [1, 2, 3, 5], op: 'ins', k: 9, src: 'ours' },
    { keys: [1, 2, 3, 5], op: 'del', k: 2, src: 'ours' }
  ];
  const shAns = c => {
    if (c.op === 'ins') { const at = c.keys.findIndex(x => x > c.k), pos = at < 0 ? c.keys.length : at; const after = c.keys.slice(0, pos).concat(c.k, c.keys.slice(pos)); return { off: pos * 20, mv: c.keys.length - pos, after, pos }; }
    const pos = c.keys.indexOf(c.k); return { off: pos * 20, mv: c.keys.length - 1 - pos, after: c.keys.filter(x => x !== c.k), pos };
  };
  function Shifter({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [checked, setChecked] = H.K.useSlot(id + ':c', false);
    const A = SH.map(shAns);
    const okOff = i => num(v[i + 'o']) === A[i].off, okMv = i => num(v[i + 'm']) === A[i].mv;
    const right = SH.filter((_, i) => okOff(i) && okMv(i)).length;
    const put = (k, x) => { setV(Object.assign({}, v, { [k]: x })); setChecked(false); };
    return html`<div className="hf-in">
      <div className="hf-fp4-sh" dir="ltr">
        <span className="hd" dir=${ar ? 'rtl' : 'ltr'} style=${{ textAlign: 'left' }}>${ar ? 'الـ file والعملية' : 'file + operation'}</span><span className="hd" dir=${ar ? 'rtl' : 'ltr'}>${ar ? 'الـ offset' : 'offset'}</span><span className="hd" dir=${ar ? 'rtl' : 'ltr'}>${ar ? 'اتحرك' : 'moved'}</span><span></span>
        ${SH.map((c, i) => {
          const good = okOff(i) && okMv(i), st = checked ? (good ? 'hf-fp4-ok' : 'hf-fp4-no') : '';
          return html`<${React.Fragment} key=${i}>
            <span className=${'hf-fp4-case ' + st}>${c.keys.join(' ')} <i>${c.op === 'ins' ? '+' + c.k : '−' + c.k}</i></span>
            <input type="text" inputMode="numeric" value=${v[i + 'o'] || ''} placeholder="?" aria-label=${'Offset, case ' + (i + 1)} onInput=${e => put(i + 'o', e.target.value)} />
            <input type="text" inputMode="numeric" value=${v[i + 'm'] || ''} placeholder="?" aria-label=${'Records moved, case ' + (i + 1)} onInput=${e => put(i + 'm', e.target.value)} />
            <span className=${'hf-fp4-mk ' + st}>${checked ? (good ? '✓' : '✗') : ''}</span>
            ${checked ? html`<div className="hf-fp4-strip">${A[i].after.map((k, j) => html`<span key=${j} className=${(c.op === 'ins' && j === A[i].pos ? 'nw' : (c.op === 'ins' ? j > A[i].pos : j >= A[i].pos) ? 'mv' : '') + (calm() ? ' calm' : '')} style=${{ animationDelay: calm() ? '0s' : j * 0.08 + 's' }}>${k}<small>${j * 20}</small></span>`)}</div>` : null}
          </${React.Fragment}>`; })}
      </div>
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChecked(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; A.forEach((a, i) => { m[i + 'o'] = String(a.off); m[i + 'm'] = String(a.mv); }); setV(m); setChecked(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${checked && html`<span className="hf-score"><bdi dir="ltr">${right} / ${SH.length}</bdi></span>`}
      </div></div>`;
  }

  H.chapters.fp[4] = {
    title: 'Ordered and Unordered (Heap / Sequential) Files',
    kicker: 'Chapter 4',
    run: 'heap and sorted files',
    ar: { title: 'الـ Ordered والـ Unordered Files: الـ Heap والـ Sequential', kicker: 'الفصل 4', run: 'الـ heap والـ sorted files' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, Match, MCQ, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 4);
      const arL = (window.AR && window.AR.fp && window.AR.fp.lectures && window.AR.fp.lectures[4]) || {};
      const arQuiz = arL.quiz || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' own questions (src set), with the Arabic "why" for each choice
      const find = re => { const i = lec.quiz.findIndex(x => re.test(strip(x.q)) && !!x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = find(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const L = s => `<bdi dir="ltr">${s}</bdi>`;
      const examBox = html`<${Box} kind="exam" title=${t("Exam corner: from the doctors' papers", 'ركن الامتحان: من الامتحانات اللي فاتت')}><p className="hf-p small">${t('Tap an answer to see why each choice is right or wrong.', 'دوس على إجابة عشان تعرف كل اختيار صح ولا غلط وليه.')}</p></${Box}>`;

      return [
        // 0 · where we left off + how this chapter works
        page(html`
          <${H2}>${t('Where we left off', 'وقفنا فين؟')}</${H2}>
          <${P} small=${true}>${X('Last chapter you built <b>records</b> out of <b>fields</b>, and jumped straight to a record by its <b>RRN</b> with a seek. Now a bigger question: in what <b>order</b> do the records sit in the file, and what does that order cost you?',
            'في الفصل اللي فات بنيت <b>records</b> من <b>fields</b>، ونطيت على record على طول بالـ <b>RRN</b> بتاعه بـ seek. دلوقتي سؤال أكبر: الـ records قاعدة في الـ file <b>بأنهي ترتيب</b>، والترتيب ده بيكلّفك قد إيه؟')}</${P}>
          <${Box} kind="brain"><p className="hf-p small">${X('A new student record arrives. Option 1: drop it at the end of the file. Option 2: slide it into its place by student number. Which one makes <b>adding</b> cheap? Which one makes <b>finding</b> cheap? Can one file have both?',
            'جالك record لطالب جديد. الاختيار الأول: ترميه في آخر الـ file. والتاني: تدخّله في مكانه حسب رقم الطالب. أنهي واحد بيخلّي <b>الإضافة</b> رخيصة؟ وأنهي واحد بيخلّي <b>التدوير</b> رخيص؟ وينفع file واحد ياخد الاتنين؟')}</p></${Box}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will shift records and work out costs in milliseconds and in disk accesses.', '<b>حل التمارين.</b> هتزحزح records وتحسب تكاليف بالـ milliseconds وبعدد الـ disk accesses.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps.', '<b>خلّي بالك!</b> دي فخاخ الامتحان.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes and numbers marked "ours" are our own analogies and practice numbers.', 'الملاحظات والأرقام اللي عليها "من عندنا" دي تشبيهات وأرقام تدريب مننا.')}</span></div>
          </div>
        `, { sec: t('Where we left off', 'وقفنا فين؟') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">4</span><span className="t">${A ? html`الفصل الرابع<br/>File Processing` : html`Chapter four<br/>File Processing`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Where Does the New Record Go?', 'الـ record الجديد يروح فين؟')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('ordered and unordered (heap / sequential) files', 'الـ ordered والـ unordered files، يعني الـ heap والـ sequential')}</p></div>
          <${Talk} who="table">${X("I'm a record: (4, Ali, CS). Do I go at the end, or do I squeeze in between 3 and 5?", 'أنا الـ record ده <bdi dir="ltr">(4, Ali, CS)</bdi>. أروح في الآخر، ولا أتحشر بين 3 و5؟')}</${Talk}>
          <${Talk} who="disk" flip=${true}>${X("Either way, I'm the one who has to do the work. Every page you read from me or write to me <b>costs time</b>.", 'في الحالتين أنا اللي هشيل الشغل. كل page بتقراها مني أو تكتبها فيّا <b>بتاخد وقت</b>.')}</${Talk}>
          <${Hand} tilt=${true}>${t('this chapter: two answers, and the bill for each', 'الفصل ده: إجابتين، وفاتورة كل واحدة')}</${Hand}>
        `, { sec: t('File organizations', 'الـ File organizations') }),

        // 2 · what a file organization method is
        page(html`
          <${H1}>${t('A plan for placing records', 'خطة لمكان الـ records')}</${H1}>
          <${Def}>${X('A <b>file organization method</b> defines the <b>record placement strategy</b> and the relationship between a record\'s <b>key value</b> and its <b>relative address</b>.',
            'طريقة الـ <b>file organization</b> بتحدد <b>استراتيجية مكان الـ record</b> (record placement strategy) والعلاقة بين <b>الـ key value</b> بتاع الـ record والـ <b>relative address</b> بتاعه.')}</${Def}>
          <${P} small=${true}>${t('The goal is to do these efficiently:', 'والهدف إننا نعمل الحاجات دي بكفاءة:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>retrieve</b>: الجار الـ logical، أو الـ records اللي بتحقق شرط، أو record عشوائي.',
            'الـ <b>update</b>: الـ insert والـ delete والـ modify.'
          ] : [
            '<b>Retrieve</b>: a logical neighbour, the records matching a condition, or a random record.',
            '<b>Update</b>: insert, delete, modify.'
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('How do we judge "efficient"? By the <b>number of disk accesses</b>: fewer is better. Not record size, not the number of fields, not CPU speed.',
            'إزاي نحكم إن الطريقة "كفء"؟ بـ <b>عدد الـ disk accesses</b>، وكل ما يقل كل ما يبقى أحسن. مش بحجم الـ record، ولا بعدد الـ fields، ولا بسرعة الـ CPU.')}</p></${Box}>
          <${Grow} />
          <${Talk} who="disk">${X('Count your trips to me. That is the score.', 'عدّ مشاويرك ليّا. هو ده الـ score.')}</${Talk}>
        `),

        // 3 · access strategies and the four methods
        page(html`
          <${H2}>${t('Two ways to reach a record', 'طريقتين توصل بيهم للـ record')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>sequential search</b>: بتقرا من الأول record ورا record. بطيء، وبـ <bdi dir="ltr">O(n)</bdi>.',
            'الـ <b>direct access</b>: بتروح للـ record على طول وتجيبه في <b>read واحدة</b>، وبـ <bdi dir="ltr">O(1)</bdi>.'
          ] : [
            '<b>Sequential search</b>: read from the start, record after record. Slow, <b>O(n)</b>.',
            '<b>Direct access</b>: go straight to the record and get it in <b>one read</b>, <b>O(1)</b>.'
          ]} />
          <${P} small=${true}>${t('The file organization methods:', 'وطرق الـ file organization هي:')}</${P}>
          <div className="hf-fp4-legend hf-in">
            <b>1</b><span>${X('<b>Unordered (heap) file</b>: this chapter', 'الـ <b>unordered (heap) file</b>: في الفصل ده')}</span>
            <b>2</b><span>${X('<b>Ordered (sequential) file</b>: this chapter', 'الـ <b>ordered (sequential) file</b>: في الفصل ده')}</span>
            <b>3</b><span>${X('<b>Indexing</b>', 'الـ <b>indexing</b>')}</span>
            <b>4</b><span>${X('<b>Hashing</b>: the next chapter', 'الـ <b>hashing</b>: في الفصل الجاي')}</span>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('On the next page, search for student 3 both ways and watch the <b>disk accesses</b> counter. Then try student 1. Which strategy cares where the record sits?',
            'في الصفحة الجاية دوّر على الطالب رقم 3 بالطريقتين وبص على عدّاد الـ <b>disk accesses</b>. وبعدين جرّب الطالب رقم 1. أنهي طريقة فارق معاها مكان الـ record؟')}</p></${Box}>
        `),

        // 4 · figure: access strategies
        page(html`
          <${H2}>${t('Sequential search vs direct access', 'الـ sequential search قصاد الـ direct access')}</${H2}>
          <${Fig} name="fp-access-strat" />
        `),

        // 5 · the heap file
        page(html`
          <${H1}>${t('The heap file: first come, first stored', 'الـ heap file: اللي ييجي الأول يتخزن الأول')}</${H1}>
          <${Def}>${X('An <b>unordered</b> set of records stored in <b>order of entry</b>, regardless of key. Also called an <b>unordered sequential file</b> or a <b>pile</b> file.',
            'مجموعة records <b>مش مترتبة</b> متخزنة <b>بترتيب دخولها</b>، بغض النظر عن الـ key. وبيتسمى كمان <b>unordered sequential file</b> أو <b>pile</b> file.')}</${Def}>
          <${UL} items=${A ? [
            'بيدعم الـ <bdi dir="ltr">create/destroy</bdi> والـ <bdi dir="ltr">open/close</bdi> والـ <bdi dir="ltr">insert/delete</bdi>.',
            'كل record بيتعرف بـ <b>record id</b>، واسمه المختصر <b>rid</b>.'
          ] : [
            'Supports <b>create/destroy</b>, <b>open/close</b>, <b>insert/delete</b>.',
            'Records are identified by a <b>record id (rid)</b>.'
          ]} />
          <${Talk} who="table">${X('I sit wherever I arrived. Nobody sorts me by key.', 'أنا بقعد مكان ما وصلت. محدش بيرتبني بالـ key.')}</${Talk}>
          <${Grow} />
          <${Hand}>${t("Our analogy, not the slides': a pile of papers on a desk. The newest one just lands on the pile.", 'تشبيه من عندنا: كومة ورق على مكتب. أي ورقة جديدة بتتحط على الكومة وخلاص.')}</${Hand}>
        `, { sec: t('The heap file', 'الـ Heap file') }),

        // 6 · heap: retrieve, insert, delete
        page(html`
          <${H2}>${t('Heap file: find, add, remove', 'الـ heap file: تدوّر وتضيف وتمسح')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>retrieve</b>: بالـ <b>linear search</b> بس، لأن مفيش ترتيب تستغله.',
            'الـ <b>insert في الآخر</b>: بسيط وكفء. access واحد عشان تقرا آخر page، وواحد عشان تكتبها تاني.',
            'الـ <b>delete</b>: تلاقي الـ record، تمسحه <b>physically أو logically</b>، وتكتبه تاني.'
          ] : [
            '<b>Retrieve</b>: <b>linear search</b> only; there is no order to use.',
            '<b>Insert at the end</b>: simple and efficient. One access to read the last page, one to write it back.',
            '<b>Delete</b>: find the record, delete it <b>physically or logically</b>, and write it back.'
          ]} />
          <${Box} kind="watch"><p className="hf-p small">${X('Inserting at the end has a <b>serious disadvantage</b>: it <b>allows duplicate records</b>. The notes\' example appends <b>(4, Ali, CS)</b> at <b>offset 80</b>, the end of the file. Nothing checks whether that key is already there, so it can go in twice.',
            'الـ insert في الآخر فيه <b>عيب كبير</b>: إنه <b>بيسمح بـ records متكررة (duplicates)</b>. مثال الـ notes بيضيف الـ record ده عند <b>offset 80</b>، يعني آخر الـ file:<span class="ltr">(4, Ali, CS)</span>ومفيش حاجة بتشيّك إن الـ key ده موجود قبل كده، فممكن يدخل مرتين.')}</p></${Box}>
          <${Grow} />
          <${Hand} arrow="down" after=${true}>${t('next page: press "Insert (4, Ali, CS)" twice', 'الصفحة الجاية: دوس على الزرار ده مرتين')}</${Hand}>
          ${A ? html`<p className="hf-p small" dir="ltr" style=${{ textAlign: 'left' }}><code>Insert (4, Ali, CS)</code></p>` : null}
        `),

        // 7 · figure: the heap file
        page(html`
          <${H2}>${t("The notes' heap file: 20-byte records", 'الـ heap file بتاع الـ notes، والـ records حجمها 20 byte')}</${H2}>
          <${Fig} name="fp-heap-file" />
        `),

        // 8 · dumb questions on the heap
        page(html`
          <${Dumb} qa=${A ? [
            ['يعني إيه offset 80؟', 'كل record حجمه <bdi dir="ltr">20 byte</bdi>، فالـ records الأربعة الأولانيين عند 0 و20 و40 و60، والخامس بييجي عند <bdi dir="ltr">4 × 20 = 80</bdi>.'],
            ['إيه الفرق بين الـ delete الـ logical والـ physical؟', 'الـ notes بتقول بس إن الـ record بيتمسح physically أو logically وبيتكتب تاني. وفي الرسمة اللي فاتت، الـ logical بيسيب الـ record مكانه وعليه علامة deleted، والـ physical بيشيله ويسيب مكانه free slot.'],
            ['ليه الـ insert رخيص كده؟', 'لأنه مش محتاج يدوّر على مكان: الـ record الجديد دايمًا بيروح في آخر page. تقراها، تضيف، تكتبها تاني.']
          ] : [
            ['Why is the new record at offset 80?', 'Each record is <b>20 bytes</b>, so the first four sit at 0, 20, 40 and 60, and the fifth goes at 4 × 20 = <b>80</b>.'],
            ['What is the difference between a logical and a physical delete?', 'The notes only say the record is deleted physically or logically and written back. In the figure, a logical delete keeps the record in place, marked <b>deleted</b>; a physical delete removes it and leaves a <b>free slot</b>.'],
            ['Why is inserting so cheap?', 'There is no place to search for: the new record always goes on the last page. Read it, add the record, write it back.']
          ]} />
          <${Grow} />
          <${Talk} who="dev" flip=${true}>${X('Fast to add, slow to find. Got it.', 'سريع في الإضافة، بطيء في التدوير. فهمت.')}</${Talk}>
        `),

        // 9 · the cost model
        page(html`
          <${H1}>${t('Four letters pay the bill', 'أربع حروف بيدفعوا الفاتورة')}</${H1}>
          <div className="hf-fp4-legend hf-in">
            <b>B</b><span>${X('number of data <b>pages</b> (a page = a block)', 'عدد الـ data <b>pages</b> (والـ page هنا هي الـ block)')}</span>
            <b>R</b><span>${X('<b>records</b> per page', 'عدد الـ <b>records</b> في كل page')}</span>
            <b>D</b><span>${X('average time to <b>read or write</b> a disk page', 'متوسط الوقت عشان <b>تقرا أو تكتب</b> disk page')}</span>
            <b>C</b><span>${X('average time to <b>process</b> a record', 'متوسط الوقت عشان <b>تعالج</b> record')}</span>
          </div>
          <${P} small=${true}>${t('The operations we price:', 'والعمليات اللي هنحسب تمنها:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>scan</b>: تجيب كل الـ records.',
            'الـ <b>equality search</b>، زي <bdi dir="ltr">"sid = 23"</bdi>.',
            'الـ <b>range search</b>، زي <bdi dir="ltr">"name after Smith"</bdi>.',
            'الـ <b>insert</b>، والـ <b>delete</b> (بالـ rid).'
          ] : [
            '<b>Scan</b>: fetch all records.',
            '<b>Equality search</b>, e.g. "sid = 23".',
            '<b>Range search</b>, e.g. "name after Smith".',
            '<b>Insert</b>, and <b>delete</b> (by rid).'
          ]} />
          <${Grow} />
          <${Talk} who="mem">${X('D is a trip to the disk. C is me checking one record that is already here. D is the expensive one.', 'الـ D ده مشوار للـ disk، والـ C ده أنا بشيّك على record موجود عندي أصلًا. والـ D هو الغالي.')}</${Talk}>
        `, { sec: t('The cost model', 'الـ Cost model') }),

        // 10 · heap costs: scan, equality, range
        page(html`
          <${H2}>${t('Heap file: reading costs', 'الـ heap file: تكلفة القراية')}</${H2}>
          <${Code} lines=${[['B × D', t('read all B pages', 'نقرا الـ B pages كلها')], ['B × R × C', t('process R records on each', 'نعالج R records في كل واحدة')], ['= B(D + RC)', t('the scan', 'ده الـ scan')]]} />
          <${UL} items=${A ? [
            'الـ <b>scan</b> تكلفته:<span class="ltr"><b>B(D + RC)</b></span>',
            'الـ <b>equality search</b> تكلفته:<span class="ltr"><b>0.5B(D + RC)</b></span>لأن في المتوسط بتعمل scan لنص الـ file. ولو مفيش record مطابق، بتعمل scan للـ file كله.',
            'الـ <b>range search</b> تكلفته:<span class="ltr"><b>B(D + RC)</b></span>لأن الـ records المطابقة ممكن تبقى في أي حتة، فلازم تمسح الـ file كله.'
          ] : [
            '<b>Scan</b>: <b>B(D + RC)</b>.',
            '<b>Equality search</b>: <b>0.5B(D + RC)</b>. On average half the file is scanned. If nothing matches, the entire file is scanned.',
            '<b>Range search</b>: <b>B(D + RC)</b>. Matches may be anywhere, so scan the whole file.'
          ]} />
          <${Grow} />
          <${Hand}>${t('the heap has no order, so every read cost is "some or all of the file"', 'الـ heap ملوش ترتيب، فكل تكلفة قراية يا جزء من الـ file يا الـ file كله')}</${Hand}>
        `, { sec: t('Heap file costs', 'تكاليف الـ Heap file') }),

        // 11 · heap costs: insert, delete
        page(html`
          <${H2}>${t('Heap file: writing costs', 'الـ heap file: تكلفة الكتابة')}</${H2}>
          <${P} small=${true}>${t('Insert: fetch the last page, add the record, write it back.', 'الـ insert: تجيب آخر page، تضيف الـ record، وتكتبها تاني.')}</${P}>
          <${Code} lines=${[['D', t('read the last page', 'نقرا آخر page')], ['+ C', t('add the record', 'نضيف الـ record')], ['+ D', t('write the page back', 'نكتب الـ page تاني')], ['= 2D + C', t('insert', 'ده الـ insert')]]} />
          <${P} small=${true}>${t('Delete: find it, remove it, write the page back.', 'الـ delete: تلاقيه، تشيله، وتكتب الـ page تاني.')}</${P}>
          <${Code} lines=${[['search', t('find it: 0.5B(D + RC) on average', 'نلاقيه (نص الـ file في المتوسط)')], ['+ C + D', t('delete it, write back', 'نمسحه ونكتب تاني')], ['= search + C + D', t('delete', 'ده الـ delete')]]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('A heap insert needs <b>no search</b>. The exam offers <b>Dlog₂B + Clog₂R + 2D + C</b> as a distractor: it glues a sorted-file search onto 2D + C, and no row of the cost table has it.',
            'الـ heap insert <b>مش محتاج search</b>. الامتحان بيحط الاختيار ده كفخ:<span class="ltr"><b>Dlog₂B + Clog₂R + 2D + C</b></span>ده لازق search بتاع sorted file على الـ <bdi dir="ltr">2D + C</bdi>، ومفيش صف في جدول التكلفة فيه كده.')}</p></${Box}>
        `),

        // 12 · drill: heap costs with the notes' numbers
        page(html`
          <${Box} kind="pencil" title=${t('Be the cost meter: heap file', 'خليك إنت العدّاد: الـ heap file')}><p className="hf-p small">${X("The notes' worked question: <b>B = 100</b>, <b>R = 50</b>, <b>D = 15 ms</b>, <b>C = 0.1 ms</b>. Its answer is the scan, 2000 ms; price the rest yourself with the heap formulas (in ms).",
            'سؤال الـ notes المحلول بالقيم دي:<span class="ltr"><b>B = 100, R = 50, D = 15 ms, C = 0.1 ms</b></span>وإجابته هي الـ scan، يعني <bdi dir="ltr">2000 ms</bdi>. احسب الباقي إنت بالـ formulas بتاعة الـ heap.')}</p></${Box}>
          <${CostDrill} id="dh" unit="ms" rows=${[
            [t('Scan', 'الـ scan'), 2000, 'B(D + RC) = 100 × (15 + 50 × 0.1) = 100 × 20 = 2000'],
            [t('Equality search', 'الـ equality search'), 1000, '0.5B(D + RC) = 0.5 × 2000 = 1000'],
            [t('Insert', 'الـ insert'), 30.1, '2D + C = 2 × 15 + 0.1 = 30.1'],
            [t('Delete (average search)', 'الـ delete (search متوسط)'), 1015.1, 'search + C + D = 1000 + 0.1 + 15 = 1015.1']
          ]} />
        `),

        // 13 · the ordered (sequential) file
        page(html`
          <${H1}>${t('The sorted file: everyone in key order', 'الـ sorted file: كله بترتيب الـ key')}</${H1}>
          <${Def}>${X('An <b>ordered</b> set of records stored in order of the <b>key value</b>. Records are accessed <b>sequentially</b> from beginning to end. Also called the <b>sequential file</b>.',
            'مجموعة records <b>مترتبة</b> متخزنة بترتيب الـ <b>key value</b>. والـ records بيتعملها access <b>بالتسلسل</b> من الأول للآخر. واسمه كمان الـ <b>sequential file</b>.')}</${Def}>
          <${UL} items=${A ? [
            'الـ <b>insert</b>: الـ record الجديد بيروح لمكان <b>محدد بالظبط</b>، فـ <b>كل الـ records اللي الـ key بتاعها أكبر بتتحرك مكان واحد ناحية الآخر</b>.',
            'الـ <b>delete</b> والـ <b>update</b> محتاجين العملية <b>العكسية</b>.',
            'مثال الـ notes: الـ <bdi dir="ltr">(4, Ali, CS)</bdi> بيدخل بين <bdi dir="ltr">1, 2, 3, 5</bdi> عند offset 60، والـ Ahmed (5) بيتزق لـ 80.'
          ] : [
            '<b>Insert</b>: the new record goes into an <b>exactly determined position</b>, so <b>all records with a greater key move one location towards the end</b>.',
            '<b>Delete</b> and <b>update</b> need the <b>opposite</b> procedure.',
            "The notes' example: inserting (4, Ali, CS) into 1, 2, 3, 5 places it at offset 60 and shifts Ahmed (5) to 80."
          ]} />
          <${Grow} />
          <${Talk} who="table" flip=${true}>${X('Everyone with a bigger key, scoot over one seat!', 'كل اللي الـ key بتاعه أكبر مني، يزحزح كرسي واحد!')}</${Talk}>
        `, { sec: t('The sorted file', 'الـ Sorted file') }),

        // 14 · figure: sorted insert
        page(html`
          <${H2}>${t('Inserting into an ordered file', 'الـ insert في الـ ordered file')}</${H2}>
          <${Fig} name="fp-sorted-insert" />
        `),

        // 15 · exercise: be the shifter
        page(html`
          <${Box} kind="pencil" title=${t('Be the shifter', 'خليك إنت اللي بيزحزح')}><p className="hf-p small">${X('Ordered files, <b>20-byte</b> records from offset 0. Type the <b>offset</b> of the new (or deleted) record and <b>how many records move</b>. Row 1: the notes\' example; row 2: a site practice question; rows 3–4: ours.',
            'الـ records حجمها <bdi dir="ltr">20 byte</bdi> من offset 0. اكتب الـ <b>offset</b> بتاع الـ record الجديد (أو الممسوح) و<b>كام record اتحرك</b>. الصف 1 من الـ notes، والتاني تدريب من الموقع، والباقي من عندنا.')}</p></${Box}>
          <${Shifter} id="sh" />
        `, { sec: t('Exercise: be the shifter', 'تمرين: خليك إنت اللي بيزحزح') }),

        // 16 · sorted costs: scan and equality
        page(html`
          <${H2}>${t('Sorted file: binary search pays off', 'الـ sorted file: الـ binary search بيفرق')}</${H2}>
          <${P} small=${true}>${X('<b>Scan</b> costs the same as in the heap file: <b>B(D + RC)</b>. Every page is read either way.', 'الـ <b>scan</b> تكلفته زي الـ heap file بالظبط:<span class="ltr"><b>B(D + RC)</b></span>لأن كل الـ pages بتتقري في الحالتين.')}</${P}>
          <${P} small=${true}>${t('Equality search is where the order helps:', 'والـ equality search هو اللي الترتيب بيفيده:')}</${P}>
          <${Code} lines=${[['D · log₂B', t('binary search over the pages', 'نعمل binary search على الـ pages')], ['+ C · log₂R', t('binary search inside the page', 'وبعدين binary search جوه الـ page')], ['= D·log₂B + C·log₂R', '']]} />
          <${Box} kind="brain"><p className="hf-p small">${X('Why can\'t the heap file do this? Binary search jumps to the middle and asks "is my key bigger or smaller?". That question only makes sense when records are <b>sorted by key</b>.',
            'ليه الـ heap file مايعملش كده؟ الـ binary search بينط للنص ويسأل "الـ key بتاعي أكبر ولا أصغر؟". والسؤال ده مالوش معنى غير لو الـ records <b>مترتبة بالـ key</b>.')}</p></${Box}>
          <${Grow} />
          <${Hand}>${X('next page: B = 8, R = 4, so at most log₂8 = 3 page reads and log₂4 = 2 comparisons', 'الصفحة الجاية: <bdi dir="ltr">B = 8, R = 4</bdi>، يعني بالكتير 3 page reads ومقارنتين')}</${Hand}>
        `, { sec: t('Sorted file costs', 'تكاليف الـ Sorted file') }),

        // 17 · figure: search compare
        page(html`
          <${H2}>${t('Equality search: linear vs binary', 'الـ equality search: الـ linear قصاد الـ binary')}</${H2}>
          <${Fig} name="fp-search-compare" />
        `),

        // 18 · sorted costs: range, insert, delete
        page(html`
          <${H2}>${t('Sorted file: keeping order costs', 'الـ sorted file: الترتيب ليه تمن')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>range search</b> تكلفته هي الـ search cost + تكلفة إنك تجيب الـ records المطابقة.',
            'الـ <b>insert</b>: تلاقي المكان، وبعدين كل الـ records اللي بعده بتتزحزح. وفي المتوسط نص الـ file بيتقري ويتكتب تاني.',
            'الـ <b>delete</b>: زي الـ insert بالظبط.'
          ] : [
            '<b>Range search</b>: search cost + the cost of retrieving the matching records.',
            '<b>Insert</b>: find the place, then every later record shifts. On average half the file is read and rewritten.',
            '<b>Delete</b>: the same as insert.'
          ]} />
          <${Code} lines=${[['D·log₂B + C·log₂R', t('search for the place', 'ندوّر على المكان بـ search')], ['+ 0.5B(D + RC)', t('read half the file', 'نقرا نص الـ file')], ['+ 0.5B(D + RC)', t('write it back, shifted', 'نكتبه تاني متزحزح')], ['= search + B(D + RC)', '']]} />
          <${Box} kind="watch"><p className="hf-p small">${X('Half the file is <b>read AND written</b>: 2 × 0.5B(D + RC) = B(D + RC). And the exam spells the same answer two ways: <b>Dlog2B + Clog2R + 2*(0.5B(D + RC))</b> and <b>Dlog₂B + Clog₂R + B(D + RC)</b>. Both are right.',
            'نص الـ file بيتـ<b>قري وبيتكتب</b>، يعني:<span class="ltr">2 × 0.5B(D + RC) = B(D + RC)</span>والامتحان بيكتب نفس الإجابة بشكلين، والاتنين صح:<span class="ltr"><b>Dlog2B + Clog2R + 2*(0.5B(D + RC))</b></span><span class="ltr"><b>Dlog₂B + Clog₂R + B(D + RC)</b></span>')}</p></${Box}>
        `),

        // 19 · exercise: count the disk accesses
        page(html`
          <${Box} kind="pencil" title=${t('Count the disk accesses', 'عدّ الـ disk accesses')}><p className="hf-p small">${X('Ours: a file of <b>B = 1024</b> pages (log₂1024 = 10). Every <b>D</b> in a formula is one page read or write, so count the D\'s and ignore C.',
            'من عندنا: file فيه <bdi dir="ltr">B = 1024</bdi> page، و<bdi dir="ltr">log₂1024 = 10</bdi>. كل <b>D</b> في الـ formula هو page read أو write واحدة، فعدّ الـ D وسيب الـ C.')}</p></${Box}>
          <${CostDrill} id="db" rows=${[
            [t('Heap: equality search, average', 'متوسط الـ equality search في الـ heap'), 512, '0.5B = 0.5 × 1024 = 512'],
            [t('Heap: equality search, no match', 'الـ equality search في الـ heap لو مفيش match'), 1024, 'B = 1024 (the entire file)'],
            [t('Sorted: equality search', 'الـ equality search في الـ sorted'), 10, 'log₂B = log₂1024 = 10'],
            [t('Heap: insert', 'الـ insert في الـ heap'), 2, '2D → 2 (read + write the last page)'],
            [t('Sorted: insert', 'الـ insert في الـ sorted'), 1034, 'log₂B + 2 × 0.5B = 10 + 1024 = 1034']
          ]} />
        `, { sec: t('Exercise: count disk accesses', 'تمرين: عدّ الـ disk accesses') }),

        // 20 · fireside chat, part 1
        page(html`
          <${Fireside} sub=${t("Tonight's talk: the Heap File and the Sorted File argue about who is cheaper.", 'قعدة الليلة: الـ Heap File والـ Sorted File بيتخانقوا مين أرخص.')} />
          <${Chat} names=${[t('Heap file', 'الـ Heap file'), t('Sorted file', 'الـ Sorted file')]} lines=${A ? [
            [0, 'أنا باخد الـ records زي ما بتيجي، بترتيب دخولها. عايز insert؟ بعمل append: أقرا آخر page وأضيف وأكتبها تاني، يعني <bdi dir="ltr">2D + C</bdi>.'],
            [1, 'وبتدخّل <b>duplicates</b> من غير ما تاخد بالك. أنا بحافظ على كل record في مكانه حسب الـ key.'],
            [0, 'والمحافظة دي بتكلّفك: كل record الـ key بتاعه أكبر بيتزحزح. نص الـ file بيتقري ويتكتب تاني.'],
            [1, 'بس لما حد يسأل على <bdi dir="ltr">sid = 23</bdi> بعمل <b>binary search</b>:<span class="ltr">D·log₂B + C·log₂R</span>'],
            [1, 'وإنت بتقرا نص الـ file في المتوسط:<span class="ltr">0.5B(D + RC)</span>']
          ] : [
            [0, 'I take records as they come, in order of entry. Insert? I just append: read the last page, add, write it back. <b>2D + C</b>.'],
            [1, 'And you let <b>duplicates</b> in without noticing. I keep every record in its place by key.'],
            [0, 'And keeping that order costs you: every record with a greater key shifts. Half the file read and written back.'],
            [1, 'But when someone asks for sid = 23, I <b>binary search</b>: <b>D·log₂B + C·log₂R</b>.'],
            [1, 'You read half the file on average: <b>0.5B(D + RC)</b>.']
          ]} />
        `, { sec: t('Heap vs sorted', 'الـ Heap قصاد الـ sorted') }),

        // 21 · fireside chat, part 2
        page(html`
          <${Chat} names=${[t('Heap file', 'الـ Heap file'), t('Sorted file', 'الـ Sorted file')]} start=${1} lines=${A ? [
            [1, 'ولو مفيش record مطابق خالص؟ بتقرا الـ file <b>كله</b>.'],
            [0, 'ماشي. والـ range search عندي برضه الـ file كله، لأن الـ matches ممكن تبقى في أي حتة.'],
            [1, 'وأنا بعمل search مرة، وبعدين أجيب الـ records المطابقة.'],
            [0, 'بس في الـ scan إحنا الاتنين زي بعض:<span class="ltr">B(D + RC)</span>'],
            [1, 'صح. كل الـ pages بتتقري في الحالتين.']
          ] : [
            [1, 'And if no record matches at all? You read the <b>entire</b> file.'],
            [0, 'Fine. And my range search is the whole file too, since matches may be anywhere.'],
            [1, 'I search once, then retrieve the matching records.'],
            [0, 'But on a scan we are twins: <b>B(D + RC)</b>.'],
            [1, 'True. Every page gets read either way.']
          ]} />
          <${Grow} />
          <${Talk} who="dev">${X('So: lots of inserts, few searches → heap. Lots of searches → sorted.', 'يعني لو الـ inserts كتير والـ search قليل يبقى heap، ولو الـ search كتير يبقى sorted.')}</${Talk}>
          <${Hand} red=${true}>${t('our summary of the two cost rows, not a slide', 'ده تلخيص مننا لصفين التكلفة، مش من السلايدز')}</${Hand}>
        `),

        // 22 · the cost comparison table
        page(html`
          <${H1}>${t('The whole bill on one card', 'الفاتورة كلها في كارت واحد')}</${H1}>
          <table className="hf-fp4-ct hf-in"><thead><tr><th></th><th>${t('Heap', 'الـ Heap')}</th><th>${t('Sorted', 'الـ Sorted')}</th><th>${t('Hashed', 'الـ Hashed')}</th></tr></thead><tbody>
            ${[
              [t('Scan', 'الـ Scan'), 'B(D+RC)', 'B(D+RC)', '1.25B(D+RC)', true],
              [t('Equality', 'الـ Equality'), '0.5B(D+RC)', 'D·log₂B + C·log₂R', 'H + D + 0.5RC'],
              [t('Range', 'الـ Range'), 'B(D+RC)', 'search + retrieve matches', '1.25B(D+RC)'],
              [t('Insert', 'الـ Insert'), '2D + C', 'search + 2·(0.5B(D+RC))', 'search + C + D'],
              [t('Delete', 'الـ Delete'), 'search + C + D', 'search + 2·(0.5B(D+RC))', 'search + C + D']
            ].map((r, i) => html`<tr key=${i}><th>${r[0]}</th><td dir="ltr" className=${r[4] ? 'hf-fp4-same' : ''}>${r[1]}</td><td dir="ltr" className=${r[4] ? 'hf-fp4-same' : ''}>${r[2]}</td><td dir="ltr">${r[3]}</td></tr>`)}
          </tbody></table>
          <${P} small=${true}>${X('Why <b>1.25</b> for the hashed scan? Hash buckets are typically kept about <b>80% full</b>, so there are 1.25× as many pages to read.',
            'ليه الـ hashed scan فيه <b>1.25</b>؟ لأن الـ hash buckets عادةً بتتساب مليانة حوالي <b>80%</b>، فبيبقى فيه pages أكتر بـ 1.25 مرة.')}</${P}>
          <${Grow} />
          <${Hand}>${X('the hashed column (and H) are the next chapter; here, learn its scan and delete', 'الـ hashed column والـ H بتوع الفصل الجاي، وهنا احفظ الـ scan والـ delete بتوعه')}</${Hand}>
        `, { sec: t('The cost table', 'جدول التكلفة') }),

        // 23 · figure: cost calculator
        page(html`
          <${H2}>${t('Try the formulas on any numbers', 'جرّب الـ formulas على أي أرقام')}</${H2}>
          <${Fig} name="fp-cost-calc" />
        `),

        // 24 · reading the exam choices
        page(html`
          <${H2}>${t('How the exam writes "search +"', 'الامتحان بيكتب "search +" إزاي')}</${H2}>
          <${P} small=${true}>${X('The exam\'s choices expand "search +" into full formulas:', 'اختيارات الامتحان بتفك كلمة "search +" لـ formulas كاملة:')}</${P}>
          <${Code} lines=${[['Dlog₂B + Clog₂R + B(D+RC)', t('sorted delete (and insert)', 'تكلفة الـ delete في الـ sorted')], ['1.25B(D+RC) + C + D', t('hashed delete, model answer', 'الـ hashed delete النموذجي')]]} />
          <${Box} kind="watch"><p className="hf-p small">${X('The cost table says hashed delete = <b>search + C + D</b>. The model answer writes it as <b>1.25B(D + RC) + C + D</b>: it uses the hashed <b>scan</b> cost as its "search". Pick that choice in the exam.',
            'جدول التكلفة بيقول إن الـ hashed delete هو:<span class="ltr">search + C + D</span>والإجابة النموذجية كاتباه كده:<span class="ltr"><b>1.25B(D + RC) + C + D</b></span>يعني استخدمت الـ hashed <b>scan</b> cost كـ "search". اختار ده في الامتحان.')}</p></${Box}>
          <${Box} kind="watch"><p className="hf-p small">${X('<b>B(D + RC)</b> alone is a <b>scan</b> (heap or sorted). If the question is a sorted <b>delete</b>, the search part is missing.',
            'الـ <bdi dir="ltr">B(D + RC)</bdi> لوحده ده <b>scan</b> (في الـ heap أو الـ sorted). لو السؤال عن <b>delete</b> في الـ sorted، يبقى جزء الـ search ناقص.')}</p></${Box}>
        `),

        // 25 · match the formula to its operation
        page(html`
          <${Box} kind="pencil" title=${t('Which bill is this?', 'دي فاتورة مين؟')}><p className="hf-p small">${t('Every one of these appeared as an exam choice. Tap a formula, then the operation it prices.', 'كل دول جم اختيارات في الامتحان. دوس على formula، وبعدين على العملية اللي هي تمنها.')}</p></${Box}>
          <${Match} id="mt" left=${['2D + C', '0.5B(D + RC)', 'D·log₂B + C·log₂R', '1.25B(D + RC)', 'Dlog₂B + Clog₂R + B(D + RC)', '1.25B(D + RC) + C + D'].map(L)}
            right=${A ? ['الـ equality search في الـ sorted file', 'الـ delete في الـ hashed file (الإجابة النموذجية)', 'الـ insert في الـ heap file', 'الـ insert أو الـ delete في الـ sorted file', 'الـ scan في الـ hashed file', 'الـ equality search في الـ heap file']
              : ['Sorted file: equality search', 'Hashed file: delete (model answer)', 'Heap file: insert', 'Sorted file: insert or delete', 'Hashed file: scan', 'Heap file: equality search']}
            answer=${[2, 5, 0, 4, 3, 1]} />
        `, { sec: t('Exercise: which bill?', 'تمرين: دي فاتورة مين؟') }),

        // 26 · drill: sorted and heap times with the site's practice numbers
        page(html`
          <${Box} kind="pencil" title=${t('Be the cost meter: both files', 'خليك إنت العدّاد: الـ file الاتنين')}><p className="hf-p small">${X("The site's practice numbers (not the doctors'): <b>B = 256</b>, <b>R = 16</b>, <b>D = 10 ms</b>, <b>C = 1 ms</b>. Here log₂256 = 8 and log₂16 = 4. Answers in ms.",
            'أرقام تدريب من الموقع (مش من الامتحانات):<span class="ltr"><b>B = 256, R = 16, D = 10 ms, C = 1 ms</b></span>وهنا <bdi dir="ltr">log₂256 = 8</bdi> و<bdi dir="ltr">log₂16 = 4</bdi>. الإجابات بالـ ms.')}</p></${Box}>
          <${CostDrill} id="ds" unit="ms" rows=${[
            [t('Sorted: scan', 'الـ scan في الـ sorted'), 6656, '256 × (10 + 16 × 1) = 256 × 26 = 6656'],
            [t('Sorted: equality search', 'الـ equality search في الـ sorted'), 84, '10 × 8 + 1 × 4 = 80 + 4 = 84'],
            [t('Sorted: insert', 'الـ insert في الـ sorted'), 6740, '84 + 6656 = 6740'],
            [t('Heap: equality search', 'الـ equality search في الـ heap'), 3328, '0.5 × 6656 = 3328'],
            [t('Heap: delete', 'الـ delete في الـ heap'), 3339, '3328 + 1 + 10 = 3339']
          ]} />
        `),

        // 27 · sort: heap or sorted?
        page(html`
          <${Box} kind="pencil" title=${t('Heap or sorted?', 'heap ولا sorted؟')}><p className="hf-p small">${X('Tap <b>H</b> for the heap file or <b>S</b> for the sorted file, then check.', 'دوس <b>H</b> للـ heap file أو <b>S</b> للـ sorted file، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="hs" bins=${[['H', 'Heap file'], ['S', 'Sorted file']]} items=${A ? [
            ['الـ records متخزنة بترتيب دخولها', 0],
            ['الـ records متخزنة بترتيب الـ key value', 1],
            ['اسمه كمان pile file', 0],
            ['في الـ insert كل key أكبر بيتزحزح ناحية الآخر', 1],
            ['الـ insert في الآخر ممكن يعمل duplicates', 0],
            ['الـ retrieval بالـ linear search بس', 0],
            ['الـ equality search بـ binary search', 1],
            ['تكلفة الـ insert هي <bdi dir="ltr">2D + C</bdi>', 0],
            ['تكلفة الـ delete هي <bdi dir="ltr">search + B(D + RC)</bdi>', 1]
          ] : [
            ['Records stored in order of entry', 0],
            ['Records stored in order of the key value', 1],
            ['Also called a pile file', 0],
            ['On insert, every greater key shifts towards the end', 1],
            ['Inserting at the end can create duplicates', 0],
            ['Retrieval by linear search only', 0],
            ['Equality search by binary search', 1],
            ['Insert costs 2D + C', 0],
            ['Delete costs search + B(D + RC)', 1]
          ]} />
        `),

        // 28 · dumb questions on the formulas
        page(html`
          <${Dumb} qa=${A ? [
            ['ليه <bdi dir="ltr">C·log₂R</bdi> مش <bdi dir="ltr">R·C</bdi>؟', 'لأن جوه الـ page بنعمل binary search برضه، فبنعالج حوالي <bdi dir="ltr">log₂R</bdi> records بس، مش الـ R كلهم.'],
            ['ليه الـ heap equality search فيه 0.5؟', 'لأن في المتوسط الـ record بيتلاقى بعد نص الـ pages. وده المتوسط لما الـ record يبقى موجود؛ لو مش موجود بتقرا الـ file كله.'],
            ['ليه الـ scan واحد في الـ heap والـ sorted؟', 'لأن الـ scan بيجيب كل record، فلازم تقرا الـ B pages كلها في الحالتين. الترتيب مابيوفرش حاجة هنا.'],
            ['ليه الـ sorted insert فيه ×2؟', 'نص الـ file في المتوسط بيتقري (D لكل page) وبيتكتب تاني بعد الزحزحة (D تاني).']
          ] : [
            ['Why C·log₂R and not R·C?', 'Inside the page we binary search too, so only about log₂R records are processed, not all R.'],
            ['Why the 0.5 in the heap equality search?', 'On average the record is found after half the pages. That is the average when the record exists; if it doesn\'t, the whole file is read.'],
            ['Why is the scan the same for heap and sorted?', 'A scan fetches every record, so all B pages are read either way. Order saves nothing here.'],
            ['Why the ×2 in the sorted insert?', 'On average half the file is read (D per page) and written back after shifting (D again).']
          ]} />
        `),

        // 29–34 · exam corner: the doctors' questions
        page(html`
          ${examBox}
          ${mq('m1', /^The average cost for the INSERT process of the heap file is:/)}
          <${Grow} />
          <${Hand} red=${true}>${t('heap insert = append: no search at all', 'الـ heap insert هو append، من غير search خالص')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /delete process of the sorted file is \.{3}/)}
          <${Grow} />
          <${Talk} who="disk" flip=${true}>${X('Find the spot, then read half of me and write it back. Search + 2 × half.', 'تلاقي المكان، وبعدين تقرا نصي وتكتبه تاني. يعني search وبعده نصين.')}</${Talk}>
        `),
        page(html`
          ${mq('m3', /SCAN process of the hashed file/)}
          <${Grow} />
          <${Hand} red=${true}>${t('buckets ~80% full → 1.25 × the pages', 'الـ buckets مليانة ~80%، فالـ pages أكتر 1.25 مرة')}</${Hand}>
        `),
        page(html`
          ${mq('m4', /Search with equality selection process of the heap/)}
          <${Grow} />
          <${Hand} red=${true}>${t('search reads half the file and writes nothing; "+ C + D" is a delete', 'الـ search بيقرا نص الـ file ومابيكتبش حاجة، والـ "+ C + D" ده delete')}</${Hand}>
        `),
        page(html`
          ${mq('m5', /Search with equality selection process of the sorted/)}
          <${Grow} />
          <${Talk} who="table">${X('Sorted means binary search: log₂B pages, log₂R records. Nothing shifts on a search.', 'الـ sorted معناه binary search: <bdi dir="ltr">log₂B</bdi> pages و<bdi dir="ltr">log₂R</bdi> records. ومفيش حاجة بتتزحزح في الـ search.')}</${Talk}>
        `),
        page(html`
          ${mq('m6', /Files of unordered records are called/)}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>Heap</b> ≠ <b>hash</b>. A heap (pile) file is unordered; a hash file places records with a hash function on the key.',
            'الـ <b>heap</b> غير الـ <b>hash</b>. الـ heap (pile) file مش مترتب، والـ hash file بيحط الـ records بـ hash function على الـ key.')}</p></${Box}>
        `),

        // 35 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ file organization بتحدد مكان الـ record والعلاقة بين الـ key والـ relative address، والكفاءة بـ <b>عدد الـ disk accesses</b>.',
            'الـ <b>sequential search</b> بـ <bdi dir="ltr">O(n)</bdi>، والـ <b>direct access</b> بـ <bdi dir="ltr">O(1)</bdi> في read واحدة.',
            'الـ <b>heap (pile) file</b> بترتيب الدخول، والـ retrieval بالـ linear search بس، والـ insert في الآخر بيسمح بـ <b>duplicates</b>.',
            'الـ <b>sorted (sequential) file</b> بترتيب الـ key، وفي الـ insert كل key أكبر بيتحرك مكان ناحية الآخر.',
            'تكاليف الـ heap:<span class="ltr">scan B(D+RC) · equality 0.5B(D+RC) · insert 2D + C</span>',
            'تكاليف الـ sorted:<span class="ltr">equality D·log₂B + C·log₂R · insert/delete search + B(D+RC)</span>',
            'الـ hashed scan هو <bdi dir="ltr">1.25B(D+RC)</bdi> (الـ buckets ~80%)، والـ hashed delete في الإجابة النموذجية:<span class="ltr">1.25B(D+RC) + C + D</span>'
          ] : [
            'A file organization fixes record placement and the key ↔ relative address relationship; efficiency = <b>number of disk accesses</b>.',
            '<b>Sequential search</b> is O(n); <b>direct access</b> is O(1), one read.',
            '<b>Heap (pile) file</b>: order of entry, linear search only; inserting at the end allows <b>duplicates</b>.',
            '<b>Sorted (sequential) file</b>: key order; on insert every greater key moves one location towards the end.',
            'Heap: scan <b>B(D+RC)</b>, equality <b>0.5B(D+RC)</b>, range <b>B(D+RC)</b>, insert <b>2D + C</b>, delete <b>search + C + D</b>.',
            'Sorted: scan <b>B(D+RC)</b>, equality <b>D·log₂B + C·log₂R</b>, insert = delete = <b>search + B(D+RC)</b>.',
            'Hashed scan <b>1.25B(D+RC)</b> (buckets ~80% full); hashed delete in the model answer <b>1.25B(D+RC) + C + D</b>.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 36 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 4!', 'خلّصت الفصل الرابع!')}</${H1}>
            <${Talk} who="disk">${t('Next time: what if you could compute where a record lives straight from its key? Hashing!', 'المرة الجاية: طب لو تقدر تحسب مكان الـ record من الـ key بتاعه على طول؟ الـ Hashing!')}</${Talk}>
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

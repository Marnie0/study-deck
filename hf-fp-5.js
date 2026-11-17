// Head First chapter for File Processing Lecture 5 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Hashing: why (search time), what a hash function is, hashed organization and buckets, collisions and synonyms, the notes'
// Hash() function (Midterm Model A) traced by hand, and the hashed-file costs next to the heap and sorted files of Lecture 4.
// This lecture has no slides: the site's notes come from the course summary and the exam papers, and it has only two of the
// doctors' questions, so the site's practice questions get their own box, titled as such. Every address and cost on these
// pages was worked by hand and checked with the notes' own function; the practice keys and numbers are ours.
// Arabic follows the site's rules (see hf-compiler.js).
// lectures: [5]
(function () {
  const H = window.HF; H.chapters.fp = H.chapters.fp || {};
  const { html } = H.K;
  const T = H.K.T;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-fp5')) {
    const s = document.createElement('style'); s.id = 'hf-css-fp5';
    s.textContent = `
.hfb .hf-fp5-code .hf-code{ font-size:13px; }
.hfb .hf-fp5-desk{ display:grid; gap:2px; }
.hfb .hf-fp5-dh, .hfb .hf-fp5-dr{ display:grid; grid-template-columns:50px minmax(0,1fr) 44px 14px; gap:1px 6px; align-items:center; padding:1px 4px; }
.hfb .hf-fp5-dh{ font:800 12.5px/1.2 var(--body); letter-spacing:.04em; color:var(--graphite); border-bottom:1.5px solid var(--hf-line); padding-bottom:4px; }
.hfb.hf-ar .hf-fp5-dh{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; font-size:13px; }
.hfb .hf-fp5-dr{ border:1.5px solid transparent; border-radius:6px; }
.hfb .hf-fp5-dr.hf-fp5-ok{ border-color:var(--ok); } .hfb .hf-fp5-dr.hf-fp5-no{ border-color:var(--hf-red); }
.hfb .hf-fp5-key{ font:700 15px/1 var(--mono); color:var(--hf-k); }
.hfb .hf-fp5-pairs{ font:600 13px/1.2 var(--mono); color:var(--ink); }
.hfb .hf-fp5-in{ width:100%; box-sizing:border-box; height:30px; font:700 15px/1 var(--mono); text-align:center; padding:0 3px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); }
.hfb .hf-fp5-in:focus{ outline:2px solid var(--hf-hand); outline-offset:0; }
.hfb .hf-fp5-mark{ font:800 14px/1 var(--body); }
.hfb .hf-fp5-ok .hf-fp5-mark{ color:var(--ok); } .hfb .hf-fp5-no .hf-fp5-mark{ color:var(--hf-red); }
.hfb .hf-fp5-work{ grid-column:1 / -1; font:600 13px/1.2 var(--mono); color:var(--hf-hand); }
.hfb .hf-fp5-work b{ color:var(--ink); }
.hfb .hf-fp5-bks{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:5px; }
.hfb .hf-fp5-bk{ min-height:66px; border:1.5px solid var(--hf-line); border-radius:6px; padding:3px 4px 4px; background:var(--paper); display:flex; flex-direction:column; gap:3px; }
.hfb .hf-fp5-bk > i{ font:800 13px/1 var(--mono); font-style:normal; color:var(--graphite); }
.hfb .hf-fp5-bk > span{ font:700 13px/1.2 var(--mono); color:var(--ink); background:color-mix(in srgb, var(--hf-k) 18%, var(--paper)); border-radius:4px; padding:2px 0; text-align:center; animation:hf-up .4s both; }
.hfb .hf-fp5-bk.hf-fp5-col{ border:2px solid var(--hf-red); background:color-mix(in srgb, var(--hf-red) 7%, var(--paper)); }
.hfb .hf-fp5-bk.hf-fp5-col > i{ color:var(--hf-red); }
.hfb .hf-fp5-giv{ font:700 13.5px/1.4 var(--mono); color:var(--ink); background:var(--hf-grey); border-radius:6px; padding:5px 8px; text-align:center; }
.hfb .hf-fp5-cr{ display:grid; grid-template-columns:minmax(0,1fr) 78px 14px; gap:1px 6px; align-items:center; padding:2px 4px; border:1.5px solid transparent; border-radius:6px; }
.hfb .hf-fp5-cr.hf-fp5-ok{ border-color:var(--ok); } .hfb .hf-fp5-cr.hf-fp5-no{ border-color:var(--hf-red); }
.hfb .hf-fp5-cl{ font:600 14px/1.25 var(--body); color:var(--ink); }
.hfb.hf-ar .hf-fp5-cl{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.4; }
.hfb .hf-fp5-cf{ display:block; font:600 13px/1.25 var(--mono); color:var(--hf-k); }
.hfb.hf-ar .hf-fp5-cf{ text-align:right; }
.hfb .hf-fp5-tab{ width:100%; border-collapse:collapse; table-layout:fixed; font-size:14px; line-height:1.3; color:var(--ink); }
.hfb .hf-fp5-tab th, .hfb .hf-fp5-tab td{ border:1px solid var(--hf-line); padding:5px 7px; text-align:start; vertical-align:middle; }
.hfb .hf-fp5-tab thead th{ background:var(--hf-grey); font-weight:800; }
.hfb .hf-fp5-tab tbody th{ font-weight:700; }
.hfb .hf-fp5-tab td{ font:600 13.5px/1.3 var(--mono); color:var(--hf-k); }
.hfb.hf-ar .hf-fp5-tab{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; }
.hfb.hf-ar .hf-fp5-tab td{ direction:ltr; text-align:right; }
.hfb .hf-fp5-o1{ display:grid; gap:6px; }
.hfb .hf-fp5-o1 > div{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:8px; align-items:center; border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 10px; background:var(--paper); }
.hfb .hf-fp5-o1 > div > span{ font:600 14px/1.25 var(--body); color:var(--ink); }
.hfb.hf-ar .hf-fp5-o1 > div > span{ font-family:"IBM Plex Sans Arabic", var(--body); font-size:13.5px; line-height:1.4; }
.hfb .hf-fp5-o1 > div > b{ font:800 16px/1 var(--mono); color:var(--hf-k); direction:ltr; unicode-bidi:isolate; }
.hfb .hf-fp5-o1 > div.hf-fp5-best{ border-width:2.5px; border-color:var(--hf-k); box-shadow:3px 3px 0 var(--hf-grey2); }
`;
    document.head.appendChild(s);
  }

  // the notes' Hash() function, exactly: key[12] (places after a short key hold '\0', code 0, as the site's figure shows),
  // pairs multiplied and added, % 19937, then % maxAddress
  const codes = k => Array.from({ length: 12 }, (_, i) => i < k.length ? k.charCodeAt(i) : 0);
  const hashOf = (k, max) => { const c = codes(k); let sum = 0; for (let j = 0; j < 12; j += 2) sum += c[j] * c[j + 1]; const s2 = sum % 19937; return { c, sum, s2, h: s2 % max }; };

  // be the hash function: our own keys into 10 addresses. Worked by hand and checked with the function above:
  // Omar 8611+11058=19669 → 19669 → 9 · Hany 6984+13310=20294 → 357 → 7 · Nour 8658+13338=21996 → 2059 → 9
  // Hoda 7992+9700=17692 → 2 · Amr 7085+0=7085 → 5 · Rana 7954+10670=18624 → 4   (Omar and Nour are synonyms)
  const KEYS = ['Omar', 'Hany', 'Nour', 'Hoda', 'Amr', 'Rana'];
  const KANS = [9, 7, 9, 2, 5, 4];
  const MAXA = 10;
  const RES = KEYS.map(k => hashOf(k, MAXA));
  if (RES.some((r, i) => r.h !== KANS[i]) && window.console) console.warn('hf-fp-5: hash answers disagree');
  const deskOk = (v, i) => v[i] != null && String(v[i]).trim() !== '' && +v[i] === KANS[i];

  function HashDesk({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const right = KEYS.filter((_, i) => deskOk(v, i)).length;
    return html`<div className="hf-in hf-fp5-desk" dir="ltr">
      <div className="hf-fp5-dh"><span>${ar ? 'الـ key' : 'key'}</span><span>${ar ? 'الـ pairs بالـ ASCII' : 'pairs (ASCII codes)'}</span><span style=${{ textAlign: 'center' }}>h</span><span></span></div>
      ${KEYS.map((k, i) => {
        const r = RES[i], n = Math.ceil(k.length / 2);
        const pairs = Array.from({ length: n }, (_, p) => r.c[2 * p] + '×' + r.c[2 * p + 1]).join(' + ');
        const st = chk ? (deskOk(v, i) ? ' hf-fp5-ok' : ' hf-fp5-no') : '';
        return html`<div key=${k} className=${'hf-fp5-dr' + st}>
          <span className="hf-fp5-key">${k}</span><span className="hf-fp5-pairs">${pairs}</span>
          <input className="hf-fp5-in" value=${v[i] == null ? '' : v[i]} inputMode="numeric" maxLength="2" aria-label=${'Home address of ' + k}
            onInput=${e => { setV(Object.assign({}, v, { [i]: e.target.value })); setChk(false); }} />
          <span className="hf-fp5-mark">${chk ? (deskOk(v, i) ? '✓' : '✗') : ''}</span>
          ${chk && html`<span className="hf-fp5-work">sum ${r.sum} · %19937 = ${r.s2} · %10 = <b>${r.h}</b></span>`}
        </div>`; })}
      <div className="hf-row" style=${{ marginTop: '3px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; KANS.forEach((a, i) => { m[i] = String(a); }); setV(m); setChk(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${chk && html`<span className="hf-score"><bdi dir="ltr">${right} / ${KEYS.length}</bdi></span>`}
      </div>
    </div>`;
  }

  // the same keys dropped into their buckets: a key shows up once its home address on the desk is right (or shown)
  function Buckets({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const placed = KEYS.map((_, i) => chk && deskOk(v, i));
    const bk = Array.from({ length: MAXA }, () => []);
    KEYS.forEach((k, i) => { if (placed[i]) bk[KANS[i]].push(k); });
    const all = placed.every(Boolean);
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '6px' }}>
      <div className="hf-fp5-bks" dir="ltr" role="list" aria-label="Ten buckets, addresses 0 to 9">${bk.map((b, a) => html`<div key=${a} role="listitem" className=${'hf-fp5-bk' + (b.length > 1 ? ' hf-fp5-col' : '')}><i>${a}</i>${b.map(k => html`<span key=${k}>${k}</span>`)}</div>`)}</div>
      ${all ? html`<p className="hf-hand red" style=${{ fontSize: ar ? '18px' : '20px' }}>${ar ? html`الـ Omar والـ Nour راحوا للـ address رقم 9. ده collision، وهما synonyms قاعدين مع بعض في نفس الـ bucket.` : 'Omar and Nour both went to 9: a collision. They are synonyms, and they share the bucket.'}</p>`
        : html`<div className="hf-row"><span className="hf-p small" style=${{ flex: '1 1 160px' }}>${ar ? 'الـ keys بتظهر هنا لما الـ address بتاعها في الصفحة اللي فاتت يبقى صح.' : 'A key appears here once its address on the previous page is right.'}</span>
          <button className="hf-btn" onClick=${() => { const m = {}; KANS.forEach((a, i) => { m[i] = String(a); }); setV(m); setChk(true); }}>${ar ? 'ورّيني الـ buckets' : 'Show me the buckets'}</button></div>`}
    </div>`;
  }

  // be the cost calculator: our own numbers, worked by hand. B = 256 pages, R = 16 records/page, D = 20 ms, C = 1 ms, H = 2 ms
  // hashed scan 1.25·256·(20+16) = 320·36 = 11520 · hashed equality 2+20+8 = 30 · hashed range = scan = 11520
  // heap equality 0.5·256·36 = 4608 · sorted equality 20·log₂256 + 1·log₂16 = 160 + 4 = 164
  const CROWS = [
    ['Hashed scan', 'الـ scan في الـ hashed file', '1.25B(D + RC)', 11520, '1.25 × 256 × 36 = 320 × 36'],
    ['Hashed equality search', 'الـ equality search في الـ hashed file', 'H + D + 0.5RC', 30, '2 + 20 + 0.5 × 16 × 1'],
    ['Heap equality search (L4)', 'الـ equality search في الـ heap (L4)', '0.5B(D + RC)', 4608, '0.5 × 256 × 36'],
    ['Sorted equality search (L4)', 'الـ equality search في الـ sorted (L4)', 'D·log₂B + C·log₂R', 164, '20 × 8 + 1 × 4']
  ];
  const costOk = (v, i) => v[i] != null && String(v[i]).trim() !== '' && +String(v[i]).replace(/[, ]/g, '') === CROWS[i][3];
  function CostDesk({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id, {});
    const [chk, setChk] = H.K.useSlot(id + ':c', false);
    const right = CROWS.filter((_, i) => costOk(v, i)).length;
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '4px' }}>
      <div className="hf-fp5-giv" dir="ltr">B = 256, R = 16, D = 20 ms, C = 1 ms, H = 2 ms</div>
      ${CROWS.map((r, i) => { const st = chk ? (costOk(v, i) ? ' hf-fp5-ok' : ' hf-fp5-no') : '';
        return html`<div key=${i} className=${'hf-fp5-cr' + st}>
          <span className="hf-fp5-cl">${ar ? r[1] : r[0]}<span className="hf-fp5-cf" dir="ltr">${r[2]}</span></span>
          <input className="hf-fp5-in" value=${v[i] == null ? '' : v[i]} inputMode="numeric" maxLength="6" placeholder="ms" aria-label=${r[0] + ' in ms'}
            onInput=${e => { setV(Object.assign({}, v, { [i]: e.target.value })); setChk(false); }} />
          <span className="hf-fp5-mark">${chk ? (costOk(v, i) ? '✓' : '✗') : ''}</span>
          ${chk && html`<span className="hf-fp5-work" dir="ltr">${r[4]} = <b>${r[3]} ms</b></span>`}
        </div>`; })}
      <div className="hf-row" style=${{ marginTop: '2px' }}>
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setChk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const m = {}; CROWS.forEach((r, i) => { m[i] = String(r[3]); }); setV(m); setChk(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${chk && html`<span className="hf-score"><bdi dir="ltr">${right} / ${CROWS.length}</bdi></span>`}
      </div>
    </div>`;
  }

  H.chapters.fp[5] = {
    title: 'Hashing',
    kicker: 'Chapter 5',
    run: 'hashing',
    ar: { title: 'الـ Hashing', kicker: 'الفصل 5', run: 'الـ hashing' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Def, Code, Box, Dumb, Bullets, Talk, Fireside, Chat, Fig, Sort, Match, MCQ, Reveal, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      // the doctors' two questions on this lecture (quiz items with src), and the site's practice questions (quiz items without
      // src, and the lecture's extra questions), each with the site's Egyptian Arabic "why" for every choice
      const lec = kit.course.lectures.find(l => l.n === 5);
      const arL = (window.AR && window.AR.fp && window.AR.fp.lectures && window.AR.fp.lectures[5]) || {};
      const arQuiz = arL.quiz || [], arExtra = arL.extra || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      const find = (list, ar, re, src) => { const i = (list || []).findIndex(x => re.test(strip(x.q)) && (src ? !!x.src : !x.src)); return i < 0 ? {} : { q: list[i], why: ar[i] }; };
      const mq = (id, re) => { const r = find(lec.quiz, arQuiz, re, true); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const pq = (id, re) => { const r = find(lec.quiz, arQuiz, re, false); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const px = (id, re) => { const r = find(lec.extra, arExtra, re, false); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const fig = (name, en, ar, after) => page(html`<${H2}>${t(en, ar)}</${H2}><${Fig} name=${name} />${after || null}`);
      return [
        // 0 · how this chapter works, and a look back at Lecture 4
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${Box} kind="relax" title=${t('A short one', 'فصل قصير')}><p className="hf-p small">${X("This lecture has <b>no slides of its own</b>. The site's notes for it come from the <b>course summary and the exam papers</b>, so this chapter is short, and every fact in it comes from those notes.",
            'المحاضرة دي <b>ملهاش سلايدز</b>. النوتس بتاعتها على الموقع متجمّعة من <b>الـ summary بتاع الكورس ومن الامتحانات</b>، فالفصل قصير، وكل معلومة فيه من النوتس دي.')}</p></${Box}>
          <${P} small=${true}>${X('Last chapter left you with a cost table for two files:',
            'الفصل اللي فات سابك مع cost table لنوعين files:')}</${P}>
          <${UL} items=${A ? [
            'الـ <b>heap file</b>: الـ equality search بـ <bdi dir="ltr">0.5B(D + RC)</bdi>، يعني بتقرا نص الـ file في المتوسط.',
            'الـ <b>sorted file</b>: binary search بـ <bdi dir="ltr">D·log₂B + C·log₂R</bdi>، بس الـ insert غالي.',
            'المقياس: <b>عدد الـ disk accesses</b>، وكل ما يقل كل ما أحسن.'
          ] : [
            '<b>Heap file</b>: equality search 0.5B(D + RC), half the file on average.',
            '<b>Sorted file</b>: binary search, D·log₂B + C·log₂R, but costly inserts.',
            'The yardstick: the <b>number of disk accesses</b>. Fewer is better.'
          ]} />
          <${Box} kind="brain"><p className="hf-p small">${X('What if you never had to <i>search</i> at all? What if the key itself told you which page to read?',
            'تخيّل لو مش محتاج <i>تدوّر</i> خالص؟ لو الـ key نفسه قالك تقرا أنهي page؟')}</p></${Box}>
          <${Grow} />
          <${Hand}>${t('The column for the third file, hashed, is this chapter.', 'العمود التالت، الـ hashed file، هو الفصل ده.')}</${Hand}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">5</span><span className="t">${A ? html`الفصل الخامس<br/>File Processing` : html`Chapter five<br/>File Processing`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Skip the Search', 'من غير ما تدوّر')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('hashing', 'الـ hashing')}</p></div>
          <${Talk} who="dev">${X('I need the record with key <code>Omar</code>. Binary search again?', 'عايز الـ record اللي الـ key بتاعه <code>Omar</code>. هنعمل binary search تاني؟')}</${Talk}>
          <${Talk} who="disk" flip=${true}>${X('Every step of that search can be another trip to me. Give me <b>one</b> address and I read <b>one</b> page.', 'كل خطوة في الـ search ده ممكن تبقى مشوار ليّا. إديني <b>address واحد</b> وأنا أقرا <b>page واحدة</b>.')}</${Talk}>
          <${P}>${X("That's the promise of <b>hashing</b>: you compute the address straight from the key. In this chapter you'll run the notes' own hash function by hand, watch two keys crash into the same address, and price every operation on a hashed file.",
            'ده وعد الـ <b>hashing</b>: بتحسب الـ address من الـ key على طول. في الفصل ده هتشغّل الـ hash function بتاعة النوتس بإيدك، وتشوف 2 keys بيخبطوا في نفس الـ address، وتحسب تكلفة كل operation على الـ hashed file.')}</${P}>
        `, { sec: t('Why hashing?', 'ليه الـ hashing؟') }),

        // 2 · why hashing: search time
        page(html`
          <${H1}>${t('Why hash at all?', 'ليه نعمل hashing أصلًا؟')}</${H1}>
          <${Def}>${X('Hashing is a useful <b>searching technique for implementing indexes</b>. Its main motivation is to <b>improve search time</b>.',
            'الـ Hashing تقنية بحث مفيدة في <b>عمل الـ indexes</b>. والدافع الأساسي ليها إنها <b>تحسّن وقت البحث</b>.')}</${Def}>
          <div className="hf-fp5-o1 hf-in">
            <div><span>${X('Simple index, binary search', 'الـ simple index مع binary search')}</span><b>O(log N)</b></div>
            <div><span>${X('B-tree', 'الـ B-tree')}</span><b>O(log<sub>k</sub> N)</b></div>
            <div className="hf-fp5-best"><span>${X('Hashing', 'الـ Hashing')}</span><b>O(1)</b></div>
          </div>
          <${Hand} arrow="up" red=${true}>${t("O(1): the time doesn't grow with N. One computation, straight to the address.", 'الـ O(1) معناها إن الوقت مبيزيدش مع N: حسبة واحدة وتروح للـ address على طول.')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('A file grows from a thousand keys to a million. Which of the three searches barely notices?',
            'الـ file كبر من ألف key لمليون. أنهي search من التلاتة مش هيحس بالفرق تقريبًا؟')}</p></${Box}>
        `),
        fig('fp-search-time', 'Count the steps', 'عدّ الخطوات',
          html`<${Hand} arrow="up">${t('try N = 1,000,000: about 20 steps, 3 for a B-tree of order 100, and 1', 'جرّب مليون key: حوالي 20 خطوة، و3 للـ B-tree من order 100، وخطوة واحدة')}</${Hand}>`),

        // 4 · what is hashing
        page(html`
          <${H1}>${t('So what is hashing?', 'يعني إيه hashing؟')}</${H1}>
          <${P}>${X('<b>Discover the location of a key by simply examining the key.</b> For that we design a <b>hash function</b>.',
            '<b>إنك تعرف مكان الـ key بمجرد ما تبص على الـ key نفسه.</b> وعشان كده بنصمم <b>hash function</b>.')}</${P}>
          <${Def}>${X('A hash function <b>h(k)</b> transforms a <b>key</b> into an <b>address</b>.', 'الـ hash function <b><bdi dir="ltr">h(k)</bdi></b> بتحوّل الـ <b>key</b> لـ <b>address</b>.')}</${Def}>
          <${P} small=${true}>${X('The <b>address space</b> is chosen beforehand. With 1000 available addresses, h maps <b>all possible keys U</b> to {0, 1, …, 999}.',
            'الـ <b>address space</b> بيتحدد من الأول. لو عندنا 1000 address متاحين، الـ h بتحوّل <b>كل الـ keys الممكنة U</b> لـ:<span class="ltr">{0, 1, …, 999}</span>')}</${P}>
          <${Talk} who="table" flip=${true}>${X("I don't sit where my key says. I sit where <code>h(key)</code> says.", 'أنا مش قاعد مكان ما الـ key بيقول، أنا قاعد مكان ما <code>h(key)</code> بتقول.')}</${Talk}>
          <${Grow} />
          <${Hand}>${t("Our analogy, not the notes': a cloakroom where your locker number is worked out from your name. No list to search.", 'تشبيه من عندنا: أوضة شنط رقم الدولاب بتاعك بيتحسب من اسمك، من غير list تدوّر فيها.')}</${Hand}>
        `, { sec: t('What is hashing?', 'يعني إيه hashing؟') }),

        // 5 · hashed organization and buckets
        page(html`
          <${H2}>${t('Hashed file organization', 'الـ hashed file organization')}</${H2}>
          <${P} small=${true}>${X('With hashing there is <b>no obvious connection between the key and the location</b>. The address of each record is determined by a <b>mathematical algorithm</b>. That is <b>hashed</b> file organization.',
            'في الـ hashing <b>مفيش علاقة واضحة بين الـ key والمكان</b>. الـ address بتاع كل record بيتحدد بـ <b>algorithm رياضي</b>. وده اسمه <b>hashed</b> file organization.')}</${P}>
          <${Def}>${X('A <b>bucket</b> is a unit of storage that can hold <b>one or more records</b> in a hash file.', 'الـ <b>bucket</b> هو وحدة تخزين تقدر تشيل <b>record واحد أو أكتر</b> في الـ hash file.')}</${Def}>
          <${Box} kind="watch"><p className="hf-p small">${X('The exams ask both of these as definitions. "Determined by a mathematical algorithm" is <b>hashed</b>, not sequential or indexed. The storage unit of a hash file is a <b>bucket</b>, not a block, a disk page or a node.',
            'الامتحانات بتسأل على التعريفين دول. لو قال "determined by a mathematical algorithm" يبقى <b>hashed</b>، مش sequential ولا indexed. ووحدة التخزين في الـ hash file اسمها <b>bucket</b>، مش block ولا disk page ولا node.')}</p></${Box}>
          <${Grow} />
          <${Talk} who="mem">${X('A bucket is roomy: <b>one or more</b> records. Remember that, you will need it in two pages.', 'الـ bucket واسع: بيشيل <b>record واحد أو أكتر</b>. افتكر دي، هتحتاجها بعد صفحتين.')}</${Talk}>
        `),

        // 6 · collisions
        page(html`
          <${H1}>${t('When two keys want the same seat', 'لما 2 keys عايزين نفس الكرسي')}</${H1}>
          <${P}>${X('All possible keys go into a fixed address space, so two different keys can get the <b>same address</b>.',
            'كل الـ keys الممكنة بتتحشر في address space ثابت، فممكن 2 keys مختلفين ياخدوا <b>نفس الـ address</b>.')}</${P}>
          <${Def}>${X('Two different keys transformed into the <b>same address</b>: a <b>collision</b>.<br/>The keys that collide: <b>synonyms</b>.',
            'لما 2 keys مختلفين يتحوّلوا لـ <b>نفس الـ address</b>، ده اسمه <b>collision</b>.<br/>والـ keys اللي بيحصل بينهم collision اسمهم <b>synonyms</b>.')}</${Def}>
          <${Talk} who="table" flip=${true}>${X('Don\'t mix them up: the collision is the <b>event</b>, synonyms are the <b>keys</b>. I can be a synonym, never a collision.', 'متلخبطش بينهم: الـ collision هو <b>الحدث</b>، والـ synonyms هما <b>الـ keys</b>. أنا ممكن أبقى synonym، عمري ما أبقى collision.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"When two different keys produce the same address, this is called…": <b>a collision</b>. "A synonym" and "overflow" are the traps.',
            'في سؤال "two different keys produce the same address, this is called…" الإجابة <b>a collision</b>. والفخاخ: "a synonym" و"overflow".')}</p></${Box}>
        `, { sec: t('Collisions', 'الـ Collisions') }),
        fig('fp-collisions', 'Make some collisions', 'اعمل شوية collisions',
          html`<${Hand} arrow="up">${t('press "Add sample keys": Ali and Smith land on 0', 'دوس "Add sample keys": الـ Ali والـ Smith بيقعوا على 0')}</${Hand}>`),

        // 8 · dumb questions on collisions
        page(html`
          <${Dumb} qa=${A ? [
            ['لو 2 keys عملوا collision، واحد فيهم بيضيع؟', 'النوتس بتعرّف الـ bucket إنه بيشيل <b>record واحد أو أكتر</b>. فهنا، زي رسمة الموقع، الـ synonyms بيقعدوا <b>مع بعض في نفس الـ bucket</b>. النوتس مش بتشرح طرق تانية للتعامل مع الـ collisions.'],
            ['ليه بيقولوا "مفيش علاقة واضحة بين الـ key والمكان"؟', 'لأن الـ address طالع من حسبة، مش من ترتيب الـ keys. مثال من عندنا هتحسبه بعد شوية: الـ Hoda بتروح 2 والـ Hany بتروح 7، مع إن الاتنين بيبدأوا بـ H.'],
            ['الـ hashed file بيبقى مترتب حسب الـ key؟', 'لأ. الـ hashing <b>مبيحافظش على الترتيب</b>، وده اللي هيخلّي الـ range search غالي آخر الفصل.']
          ] : [
            ['If two keys collide, does one of them get lost?', 'The notes define a bucket as holding <b>one or more records</b>. So here, as in the site\'s figure, synonyms sit <b>together in the same bucket</b>. The notes don\'t go into other ways of handling collisions.'],
            ['Why "no obvious connection between key and location"?', 'Because the address comes out of a calculation, not out of key order. An example of ours you\'ll work out soon: Hoda goes to 2 and Hany to 7, though both start with H.'],
            ['Is a hashed file kept in key order?', 'No. Hashing <b>does not keep order</b>, and that is what makes range search expensive at the end of this chapter.']
          ]} />
        `),

        // 9 · the notes' hash function
        page(html`
          <${H1}>${t("The notes' hash function", 'الـ hash function بتاعة النوتس')}</${H1}>
          <${P} small=${true}>${X('A simple hash function for keys of up to 12 characters, from <b>Midterm Model A</b>:', 'دي hash function بسيطة للـ keys اللي لحد 12 character، من <b><bdi dir="ltr">Midterm Model A</bdi></b>:')}</${P}>
          <div className="hf-fp5-code hf-in"><${Code} lines=${['int Hash(char key[12], int maxAddress)', '{', '  int sum = 0;', '  for (int j = 0; j < 12; j = j + 2)', '    sum = sum + key[j] * key[j+1];', '  sum = sum % 19937;', '  return sum % maxAddress;', '}']} /></div>
          <${UL} items=${A ? [
            'الخطوة 1: نمثّل الـ key كرقم، بإننا نجمّع كل 2 characters مع بعض (الـ ASCII codes).',
            'الخطوة 2: نعمل fold ونجمع، ونقسم على عدد prime (19937) عشان نمنع الـ overflow.',
            'الخطوة 3: نقسم على حجم الـ address space وناخد الباقي كـ <b>home address</b>.'
          ] : [
            'Step 1: represent the key numerically, combining <b>pairs of characters</b> (ASCII codes).',
            'Step 2: fold and add, dividing by a <b>prime (19937)</b> to prevent overflow.',
            'Step 3: divide by the address-space size and use the <b>remainder</b> as the <b>home address</b>.'
          ]} />
          <${Hand} red=${true}>${X('j jumps by 2: key[0]×key[1], key[2]×key[3], … six pairs', 'الـ j بتنط 2 2، يعني 6 pairs')}</${Hand}>
        `, { sec: t('The hash function', 'الـ hash function') }),
        fig('fp-hash-fn', 'Watch it run: Ahmed lands on 769', 'اتفرج عليها: الـ Ahmed بيروح 769'),

        // 11 · trace one key by hand
        page(html`
          <${H2}>${t('Trace one by hand: Smith, 1000 addresses', 'امشي وراها بإيدك مع الـ Smith')}</${H2}>
          <${P} small=${true}>${X('ASCII: S = 83, m = 109, i = 105, t = 116, h = 104. A 5-character key leaves key[5] to key[11] as \\0, code 0.',
            'هنا عندنا 1000 address. والـ ASCII بتاع الحروف:<span class="ltr">S = 83, m = 109, i = 105, t = 116, h = 104</span>ولأن الـ key فيه 5 characters بس، من <code>key[5]</code> لـ <code>key[11]</code> كلهم <bdi dir="ltr">\\0</bdi> يعني code 0.')}</${P}>
          <div className="hf-fp5-code hf-in"><${Code} lines=${[
            '83 × 109        =  9047',
            '105 × 116       = 12180',
            ['104 × 0         =     0', t('h × \\0', 'الـ h في \\0')],
            '0 × 0 (3 pairs) =     0',
            ['sum             = 21227', t('> 19937', 'أكبر من 19937')],
            'sum % 19937     =  1290',
            ['1290 % 1000     =   290', t('home address', 'الـ home address')]]} /></div>
          <${Box} kind="watch"><p className="hf-p small">${X("Don't skip a step. Skip <code>% 19937</code> and you get 21227 % 1000 = <b>227</b>, the wrong address. Skip <code>% maxAddress</code> and you get 1290, which isn't even in 0..999.",
            'متنطّش أي خطوة. لو نسيت الباقي على 19937 هيطلعلك:<span class="ltr">21227 % 1000 = 227</span>وده address غلط. ولو نسيت الباقي على الـ maxAddress هيطلعلك 1290، ودي أصلًا برا الـ address space.')}</p></${Box}>
        `),

        // 12 · be the hash function
        page(html`
          <${Box} kind="pencil" title=${t('Be the hash function', 'إنت الـ hash function')}><p className="hf-p small">${X("maxAddress = 10. Multiply each pair and add, take the remainder by 19937, then by 10. Type each home address.",
            'هنا عندنا 10 addresses. اضرب كل pair واجمع، وخد الباقي على 19937 وبعدين على 10. اكتب الـ home address.')}</p></${Box}>
          <${HashDesk} id="desk" />
        `, { sec: t('Be the hash function', 'خليك إنت الـ hash function') }),

        // 13 · drop them into the buckets
        page(html`
          <${H2}>${t('Now drop them into the buckets', 'دلوقتي حطهم في الـ buckets')}</${H2}>
          <${P} small=${true}>${X('Ten addresses, 0 to 9, one bucket each. A bucket holds one or more records, so a collision just means two keys share a bucket.',
            'عشر addresses من 0 لـ 9، لكل واحد bucket. والـ bucket بيشيل record واحد أو أكتر، فالـ collision معناه إن 2 keys قاعدين في نفس الـ bucket.')}</${P}>
          <${Buckets} id="desk" />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Six keys, ten addresses, one collision. How many of the 10 addresses are still empty?',
            'ستة keys، وعشر addresses، وcollision واحد. كام address من الـ 10 لسه فاضيين؟')}</p>
            <${Reveal} id="empty"><p className="hf-p small">${X('Six keys, five addresses used (2, 4, 5, 7, 9), so <b>five</b> are empty: 0, 1, 3, 6, 8.', 'الستة keys استخدموا خمس addresses بس، فـ <b>خمسة</b> فاضيين:<span class="ltr">0, 1, 3, 6, 8</span>')}</p></${Reveal}></${Box}>
        `),

        // 14 · dumb questions on the function
        page(html`
          <${Dumb} qa=${A ? [
            ['إيه اللي في <code>key[j]</code> لو الـ key أقصر من 12 character؟', 'رسمة الموقع بتملا الأماكن الفاضية بـ <bdi dir="ltr">\\0</bdi> (code 0)، زي ما الـ C بتعمل مع string قصيرة في <code>char key[12]</code>. وأي pair فيه <bdi dir="ltr">\\0</bdi> بيضيف 0.'],
            ['ليه 19937 بالذات؟', 'النوتس بتقول بس إننا بنقسم على عدد <b>prime</b> هو 19937 عشان الـ sum يفضل محدود و<b>نمنع الـ overflow</b>.'],
            ['ممكن الـ home address يطلع قد <code>maxAddress</code>؟', 'لأ. ده باقي قسمة، فبيبقى من 0 لحد <bdi dir="ltr">maxAddress − 1</bdi>. يعني مع 10 addresses من 0 لـ 9.'],
            ['هي القسمة على 19937 بتغيّر الإجابة دايمًا؟', 'بس لما الـ sum يبقى 19937 أو أكتر. الـ Omar مجموعها 19669 فمتغيرتش؛ الـ Hany مجموعها 20294 فبقت 357.']
          ] : [
            ['What is in <code>key[j]</code> when the key is shorter than 12?', 'The site\'s figure fills the empty places with \\0 (code 0), as C does for a short string in <code>char key[12]</code>. Any pair with a \\0 adds 0.'],
            ['Why 19937?', 'The notes only say we divide by a <b>prime</b>, 19937, to keep the sum bounded and <b>prevent overflow</b>.'],
            ['Can the home address equal <code>maxAddress</code>?', 'No. It is a remainder, so it runs from 0 to maxAddress − 1. With 10 addresses: 0 to 9.'],
            ['Does <code>% 19937</code> always change the answer?', 'Only when the sum is 19937 or more. Omar\'s 19669 stays 19669; Hany\'s 20294 becomes 357.']
          ]} />
        `),

        // 15 · write it from memory (the exam's written question)
        page(html`
          <${Box} kind="exam" title=${t("From the doctors' papers", 'من الامتحانات')}><p className="hf-p small">${X('<b>Midterm Model A</b> asked you to write it, not just use it:', 'امتحان <b><bdi dir="ltr">Midterm Model A</bdi></b> طلب منك تكتبها:')}</p>
            <p className="hf-p small" dir="ltr" style=${{ textAlign: 'left', fontStyle: 'italic' }}>"Write a C++ function to implement a simple hashing algorithm."</p></${Box}>
          <${Box} kind="pencil" title=${t('Write it from memory', 'اكتبها من دماغك')}><p className="hf-p small">${X('Cover the code two pages back and write it on paper: the signature, the loop that jumps by 2, the prime, the remainder. Then check.',
            'غطّي الكود واكتبه في ورقة: الـ signature، والـ loop، والـ prime، والباقي. وبعدين قارن.')}</p></${Box}>
          <${Reveal} id="write" label=${t('Show the model answer', 'ورّيني الإجابة النموذجية')}><div className="hf-fp5-code"><${Code} lines=${['int Hash(char key[12], int maxAddress)', '{', '  int sum = 0;', '  for (int j = 0; j < 12; j = j + 2)', '    sum = sum + key[j] * key[j+1];', '  sum = sum % 19937;', '  return sum % maxAddress;', '}']} /></div></${Reveal}>
          <${Grow} />
          <${Hand} red=${true}>${t('three lines to remember: fold pairs, % 19937, % maxAddress', 'افتكر تلاتة: اضرب الـ pairs، والباقي على 19937، والباقي على الـ maxAddress')}</${Hand}>
        `),

        // 16 · hashed file costs
        page(html`
          <${H1}>${t('What does a hashed file cost?', 'الـ hashed file بيكلّف قد إيه؟')}</${H1}>
          <${P} small=${true}>${X("Same cost model as Lecture 4: <b>B</b> data pages, <b>R</b> records per page, <b>D</b> to read or write a page, <b>C</b> to process a record. Hashing adds one letter: <b>H</b>, the time to compute the hash.",
            'نفس الـ cost model بتاع محاضرة 4: <b>B</b> عدد الـ data pages، و<b>R</b> عدد الـ records في الـ page، و<b>D</b> وقت قراية أو كتابة page، و<b>C</b> وقت معالجة record. والـ hashing بيزوّد حرف واحد: <b>H</b>، وقت حساب الـ hash.')}</${P}>
          <table className="hf-fp5-tab hf-in"><thead><tr><th style=${{ width: '42%' }}>${t('Operation', 'الـ Operation')}</th><th>${t('Hashed file', 'الـ Hashed file')}</th></tr></thead>
            <tbody>${(A ? [['الـ Scan', '1.25B(D + RC)'], ['الـ Equality search', 'H + D + 0.5RC'], ['الـ Range search', '1.25B(D + RC)'], ['الـ Insert', 'search + C + D'], ['الـ Delete', 'search + C + D']]
              : [['Scan', '1.25B(D + RC)'], ['Equality search', 'H + D + 0.5RC'], ['Range search', '1.25B(D + RC)'], ['Insert', 'search + C + D'], ['Delete', 'search + C + D']]).map(([o, c]) => html`<tr key=${o}><th>${o}</th><td>${c}</td></tr>`)}</tbody></table>
          <${Grow} />
          <${Talk} who="cpu" flip=${true}>${X("H is my part: I compute <code>h(key)</code> before the disk moves at all.", 'الـ H ده شغلي أنا: بحسب <code>h(key)</code> قبل ما الـ disk يتحرك أصلًا.')}</${Talk}>
        `, { sec: t('Hashed file costs', 'تكاليف الـ hashed file') }),
        fig('fp-hash-costs', 'Where the 1.25 comes from', 'الـ 1.25 جاية منين'),

        // 18 · why each cost looks that way
        page(html`
          <${H2}>${t('Read each formula', 'اقرا كل formula')}</${H2}>
          <${UL} items=${A ? [
            'الـ <b>Scan</b>: الـ hash buckets عادةً بتتساب مليانة حوالي <b>80%</b>، فنفس الـ records بتاخد <bdi dir="ltr">1 / 0.8 = 1.25</bdi> مرة pages أكتر:<span class="ltr">1.25B(D + RC)</span>',
            'الـ <b>Equality search</b>: تحسب الـ hash (H)، تقرا الـ page الوحيدة (D)، وتشيّك على نص الـ records بتاعتها في المتوسط (0.5RC).',
            'الـ <b>Range search</b>: الـ hashing <b>مبيحافظش على الترتيب</b>، فالـ records ممكن تبقى في أي bucket، فبنعمل scan لكله.',
            'الـ <b>Insert</b> والـ <b>Delete</b>: الـ search، وبعدين C للـ record وD عشان نكتب الـ page.'
          ] : [
            '<b>Scan</b>: hash buckets are typically kept about <b>80% full</b>, so the same records take 1 / 0.8 = <b>1.25</b> times as many pages: 1.25B(D + RC).',
            '<b>Equality search</b>: compute the hash (H), read the one page (D), check half its records on average (0.5RC).',
            '<b>Range search</b>: hashing <b>does not keep order</b>, so records in a range can be in any bucket: scan everything.',
            '<b>Insert</b> and <b>delete</b>: the search, then C for the record and D to write the page.'
          ]} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Exams spell "search +" out. In the <b>model answer</b> for the hash-file <b>delete</b>, the search term is the hashed scan: <b>1.25B(D + RC) + C + D</b>. And the hashed <b>scan</b> is 1.25B(D + RC), not B(D + RC).',
            'في الـ <b>model answer</b> بتاع الـ <b>delete</b> في الـ hash file، الـ "search" هو الـ hashed scan:<span class="ltr">1.25B(D + RC) + C + D</span>والـ <b>scan</b> في الـ hashed file هو <bdi dir="ltr">1.25B(D + RC)</bdi>، مش <bdi dir="ltr">B(D + RC)</bdi>.')}</p></${Box}>
        `),

        // 19–20 · fireside chat: hashed file vs sorted file
        page(html`
          <${Fireside} sub=${t("Tonight: a Hashed File and a Sorted File argue about who finds things faster.", 'قعدة الليلة: Hashed File وSorted File بيتخانقوا مين فيهم بيلاقي الحاجة أسرع.')} />
          <${Chat} names=${[t('Hashed file', 'الـ Hashed file'), t('Sorted file', 'الـ Sorted file')]} lines=${A ? [
            [0, 'إديني key وأنا أحسب هو ساكن فين: H للـ hash، وD لقراية page واحدة، ونص page تشييك. يعني <bdi dir="ltr"><b>H + D + 0.5RC</b></bdi>.'],
            [1, 'حلو. أنا بعمل binary search على الـ pages وبعدين جوه الـ page:<span class="ltr"><b>D·log₂B + C·log₂R</b></span>وكمان كل حاجة عندي <b>مترتبة بالـ key</b>.'],
            [0, 'الترتيب ده واخد أكبر من حجمه. الـ insert عندك بـ <bdi dir="ltr">search + B(D + RC)</bdi>، بتقرا وتكتب نص الـ file. أنا بـ <bdi dir="ltr">search + C + D</bdi>.'],
            [1, 'طب اطلب مني range، زي "الأسامي اللي بعد Smith". بلاقي أولهم وأقرا اللي بعده. وإنت؟']
          ] : [
            [0, "Give me a key and I'll compute where it lives: H to hash, D to read one page, half a page of checking. <b>H + D + 0.5RC</b>."],
            [1, 'Cute. I binary-search my pages, then inside the page: <b>D·log₂B + C·log₂R</b>. And I keep everything in <b>key order</b>.'],
            [0, 'Order is overrated. Your insert is search + B(D + RC): you read and rewrite half the file. Mine is <b>search + C + D</b>.'],
            [1, 'Ask us for a range, though, "names after Smith". I find the first and read the matches. You?']
          ]} />
        `, { sec: t('Hashed vs sorted', 'الـ hashed والـ sorted') }),
        page(html`
          <${Chat} names=${[t('Hashed file', 'الـ Hashed file'), t('Sorted file', 'الـ Sorted file')]} start=${4} lines=${A ? [
            [0, '…بعمل scan لكل حاجة. الـ hashing مبيحافظش على الترتيب، فالـ range search بيكلّفني <bdi dir="ltr"><b>1.25B(D + RC)</b></bdi>.'],
            [1, '1.25؟ ده حتى الـ scan بتاعك أبطأ من بتاعي: أنا <bdi dir="ltr">B(D + RC)</bdi>.'],
            [0, 'الـ buckets بتاعتي مليانة حوالي <b>80%</b> بس، فنفس الـ records بتاخد pages أكتر بـ 1.25 مرة.'],
            [1, 'وفي الآخر بتلاقي 2 keys عايزين نفس الـ address.'],
            [0, 'الـ synonyms؟ بيقعدوا مع بعض. الـ bucket بيشيل record واحد أو أكتر.'],
            [1, 'خلاص: إنت للـ equality search، وأنا للـ ranges.']
          ] : [
            [0, "…I scan everything. Hashing doesn't keep order, so a range search costs me <b>1.25B(D + RC)</b>."],
            [1, '1.25? Even your scan is slower than mine: B(D + RC).'],
            [0, 'My buckets are kept about <b>80% full</b>, so the same records take 1.25 times as many pages.'],
            [1, 'And now and then two of your keys want the same address.'],
            [0, 'Synonyms? They share. A bucket holds one or more records.'],
            [1, 'Fine: you for equality searches, me for ranges.']
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('equality search: hashing wins. range search: hashing scans everything.', 'الـ equality search: الـ hashing بيكسب. الـ range search: الـ hashing بيعمل scan لكله.')}</${Hand}>
        `),

        // 21 · sort the formulas
        page(html`
          <${Box} kind="pencil" title=${t('Whose cost is it?', 'التكلفة دي بتاعة مين؟')}><p className="hf-p small">${X('Tap <b>Hp</b> for heap, <b>So</b> for sorted or <b>Ha</b> for hashed (the cost table of Lectures 4 and 5).', 'دوس <b>Hp</b> للـ heap، أو <b>So</b> للـ sorted، أو <b>Ha</b> للـ hashed (من cost table محاضرة 4 و5).')}</p></${Box}>
          <${Sort} id="whose" bins=${[['Hp', 'Heap'], ['So', 'Sorted'], ['Ha', 'Hashed']]} items=${A ? [
            ['الـ scan بـ <bdi dir="ltr">1.25B(D + RC)</bdi>', 2],
            ['الـ equality search بـ <bdi dir="ltr">0.5B(D + RC)</bdi>', 0],
            ['الـ equality search بـ <bdi dir="ltr">D·log₂B + C·log₂R</bdi>', 1],
            ['الـ equality search بـ <bdi dir="ltr">H + D + 0.5RC</bdi>', 2],
            ['الـ insert بـ <bdi dir="ltr">2D + C</bdi>', 0],
            ['الـ insert بـ <bdi dir="ltr">search + B(D + RC)</bdi>', 1],
            ['الـ range search بـ <bdi dir="ltr">1.25B(D + RC)</bdi>', 2],
            ['الـ range search بـ <bdi dir="ltr">B(D + RC)</bdi>', 0]
          ] : [
            ['Scan: 1.25B(D + RC)', 2],
            ['Equality search: 0.5B(D + RC)', 0],
            ['Equality search: D·log₂B + C·log₂R', 1],
            ['Equality search: H + D + 0.5RC', 2],
            ['Insert: 2D + C', 0],
            ['Insert: search + B(D + RC)', 1],
            ['Range search: 1.25B(D + RC)', 2],
            ['Range search: B(D + RC)', 0]
          ]} />
        `, { sec: t('Exercises', 'التمارين') }),

        // 22 · cost calculator
        page(html`
          <${Box} kind="pencil" title=${t('Be the cost calculator', 'خليك إنت الـ cost calculator')}><p className="hf-p small">${X('Our numbers. Work out each cost in ms (log₂256 = 8, log₂16 = 4).', 'الأرقام دي من عندنا. احسب كل تكلفة بالـ ms، ومعلومة: <bdi dir="ltr">log₂256 = 8, log₂16 = 4</bdi>')}</p></${Box}>
          <${CostDesk} id="cost" />
        `),

        // 23 · match the terms
        page(html`
          <${H2}>${t('Who is who?', 'مين ده؟')}</${H2}>
          <${P} small=${true}>${t('Tap a term, then the definition that fits it.', 'دوس على المصطلح، وبعدين على التعريف بتاعه.')}</${P}>
          <${Match} id="terms" left=${['Hash function h(k)', 'Collision', 'Synonyms', 'Bucket', 'Hashed organization', 'Home address']}
            right=${A ? ['لما 2 keys مختلفين يتحوّلوا لنفس الـ address', 'وحدة تخزين بتشيل record واحد أو أكتر', 'بتحوّل الـ key لـ address', 'باقي القسمة على حجم الـ address space', 'الـ keys اللي بيحصل بينهم collision', 'الـ address بتاع كل record بيتحدد بـ algorithm رياضي']
              : ['Two different keys transformed into the same address', 'A unit of storage holding one or more records', 'Transforms a key into an address', 'The remainder after dividing by the address-space size', 'The keys that collide', "Each record's address is determined by a mathematical algorithm"]}
            answer=${[2, 0, 4, 1, 5, 3]} />
        `),

        // 24 · exam corner: the doctors' two questions
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("The doctors' two questions on this lecture. Tap an answer to see why it's right or wrong.", 'السؤالين اللي جم من الدكاترة على المحاضرة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /determined by a mathematical algorithm/i)}
          <${Grow} />
          <${Talk} who="table" flip=${true}>${X('My address comes from a formula, not from my place in a list.', 'الـ address بتاعي جاي من formula، مش من مكاني في list.')}</${Talk}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('m2', /unit of storage that can store one or more records/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('blocks and pages are disk words; in a hash file the unit is the bucket', 'الـ blocks والـ pages كلام الـ disk؛ في الـ hash file الوحدة اسمها bucket')}</${Hand}>
        `),

        // 25–27 · the site's practice questions
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("The site's own practice questions, not the doctors'. Tap an answer to see why.", 'دي أسئلة تدريب من الموقع، مش من امتحانات الدكاترة. دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${pq('p1', /two different keys produce the same address/i)}
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${pq('p2', /Search time with hashing is typically/i)}
          <${Grow} />
          <${Talk} who="disk" flip=${true}>${X('One computation, one page read. That is the O(1).', 'حسبة واحدة وقراية page واحدة. هي دي الـ <bdi dir="ltr">O(1)</bdi>.')}</${Talk}>
        `),
        page(html`
          ${pq('p3', /why is sum % 19937 applied/i)}
          <${Gap} h=${6} />
          ${pq('p4', /Hashed file equality-search cost is/i)}
        `),
        page(html`
          ${px('p5', /home address of key "ABCD"/i)}
        `),

        // 28 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ hashing تقنية بحث لعمل الـ indexes، وهدفها <b>تحسين وقت البحث</b>: <bdi dir="ltr">O(1)</bdi>، مقابل <bdi dir="ltr">O(log N)</bdi> للـ simple index و<bdi dir="ltr">O(log_k N)</bdi> للـ B-tree.',
            'الـ <b>hash function</b> <bdi dir="ltr">h(k)</bdi> بتحوّل الـ key لـ address في address space متحدد من الأول، ومفيش علاقة واضحة بين الـ key والمكان.',
            'الـ <b>hashed</b> organization: الـ address بيتحدد بـ algorithm رياضي. والـ <b>bucket</b> بيشيل record واحد أو أكتر.',
            'الـ <b>collision</b>: 2 keys مختلفين بنفس الـ address. والـ keys دول اسمهم <b>synonyms</b>.',
            'الـ function بتاعة النوتس: اضرب الـ pairs واجمع، وخد الباقي على 19937، وبعدين الباقي على الـ maxAddress.',
            'التكاليف: الـ scan والـ range بـ <bdi dir="ltr">1.25B(D + RC)</bdi>، والـ equality بـ <bdi dir="ltr">H + D + 0.5RC</bdi>، والـ insert والـ delete بـ <bdi dir="ltr">search + C + D</bdi>.'
          ] : [
            'Hashing is a searching technique for implementing indexes that <b>improves search time</b>: O(1), against O(log N) for a simple index and O(log_k N) for a B-tree.',
            'A <b>hash function</b> h(k) turns a key into an address in an address space chosen beforehand; there is no obvious connection between key and location.',
            '<b>Hashed</b> organization: the address is determined by a mathematical algorithm. A <b>bucket</b> holds one or more records.',
            '<b>Collision</b>: two different keys, same address. Those keys are <b>synonyms</b>.',
            "The notes' function: multiply pairs and add, <code>% 19937</code>, then <code>% maxAddress</code>.",
            'Costs: scan and range 1.25B(D + RC), equality H + D + 0.5RC, insert and delete search + C + D.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 29 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 5!', 'خلّصت الفصل الخامس!')}</${H1}>
            <${Talk} who="disk">${t('One key, one address, one page. My favourite kind of search.', 'key واحد، address واحد، page واحدة. أحسن نوع search عندي.')}</${Talk}>
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

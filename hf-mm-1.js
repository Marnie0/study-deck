// Head First chapter for Multimedia Lecture 1 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Introduction to Multimedia: the definitions, hypertext and hypermedia, applications, the multimedia system and its four
// characteristics, challenges and key issues (lip sync), desirable features, components, the five kinds of data and how big
// they are uncompressed, and the three routes of compression (lossless, lossy, synthesis). Every size is the notes' own
// worked figure (checked by hand and with node). Our own analogies and memory tricks are marked as ours.
(function () {
  const H = window.HF; H.chapters.mm = H.chapters.mm || {};
  const { html } = H.K; const { useState, useEffect } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';

  if (!document.getElementById('hf-css-mm1')) {
    const s = document.createElement('style'); s.id = 'hf-css-mm1';
    s.textContent = `
.hfb .hf-mm1-four{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-mm1-four > div{ display:flex; align-items:center; gap:8px; border:2px solid var(--hf-line); border-radius:8px; padding:6px 8px; background:var(--paper); font:700 14px/1.2 var(--body); color:var(--ink); }
.hfb .hf-mm1-four > div > b{ flex:none; font:800 26px/1 var(--body); color:var(--hf-k); }
.hfb .hf-mm1-four small{ display:block; font:500 12.5px/1.2 var(--body); color:var(--graphite); }
.hfb .hf-mm1-tree{ display:grid; grid-template-columns:1fr 1.5fr; gap:8px; align-items:start; }
.hfb .hf-mm1-node{ border:2px solid var(--hf-line); border-radius:8px; padding:6px 8px; font:800 14px/1.2 var(--body); background:var(--hf-grey); text-align:center; color:var(--ink); }
.hfb .hf-mm1-kids{ margin:6px 0 0; margin-inline-start:12px; border-inline-start:2px solid var(--hf-line); display:grid; gap:5px; padding:2px 0; }
.hfb .hf-mm1-kids > div{ position:relative; padding-inline-start:13px; font-size:13.5px; line-height:1.28; color:var(--ink); }
.hfb .hf-mm1-kids > div::before{ content:""; position:absolute; inset-inline-start:0; top:.62em; width:9px; border-top:2px solid var(--hf-line); }
.hfb .hf-mm1-kids b{ font-weight:700; }
.hfb .hf-mm1-feat{ display:grid; grid-template-columns:1fr 1fr; gap:5px; }
.hfb .hf-mm1-feat > div{ border:1.5px solid var(--hf-line); border-inline-start:5px solid var(--hf-k); border-radius:5px; padding:4px 7px; font-size:13px; line-height:1.25; color:var(--ink); background:var(--paper); }
.hfb .hf-mm1-feat > div > b{ display:block; font:800 13.5px/1.15 var(--body); margin-bottom:1px; }
.hfb .hf-mm1-comp{ display:grid; gap:5px; }
.hfb .hf-mm1-comp > div{ display:grid; grid-template-columns:96px 1fr; gap:8px; align-items:center; }
.hfb .hf-mm1-comp > div > b{ font:800 13px/1.15 var(--body); text-align:center; padding:6px 4px; border-radius:6px; background:var(--hf-line); color:var(--paper); }
.hfb .hf-mm1-comp > div > span{ font-size:13.5px; line-height:1.28; color:var(--ink); }
.hfb .hf-mm1-nw{ white-space:nowrap; }
.hfb .hf-mm1-chips{ display:flex; flex-wrap:wrap; gap:5px; }
.hfb .hf-mm1-chips span{ font:600 13.5px/1.2 var(--body); border:1.5px solid var(--hf-line); border-radius:999px; padding:4px 9px; background:var(--paper); color:var(--ink); }
.hfb .hf-mm1-chips span.k{ border-color:var(--hf-k); background:color-mix(in srgb, var(--hf-k) 14%, var(--paper)); }
.hfb .hf-mm1-media{ display:grid; grid-template-columns:repeat(5, minmax(0, 1fr)); gap:4px; }
.hfb .hf-mm1-media > div{ border:1.6px solid var(--hf-line); border-radius:6px; padding:5px 2px; text-align:center; font:800 13px/1.15 var(--body); color:var(--ink); background:var(--paper); }
.hfb .hf-mm1-media > div.t{ background:color-mix(in srgb, var(--hf-k) 20%, var(--paper)); }
.hfb .hf-mm1-media small{ display:block; font:600 12.5px/1.1 var(--body); color:var(--graphite); margin-top:2px; }
.hfb .hf-mm1-bits{ display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:8px; }
.hfb .hf-mm1-bits > div{ text-align:center; font-size:13px; line-height:1.25; color:var(--ink); }
.hfb .hf-mm1-bits svg{ display:block; width:100%; max-width:84px; margin:0 auto 4px; border:1.6px solid var(--hf-line); }
.hfb .hf-mm1-bits b{ display:block; font:800 13.5px/1.2 var(--mono); color:var(--hf-k); }
.hfb .hf-mm1-lad{ display:grid; gap:6px; }
.hfb .hf-mm1-lad{ grid-template-columns:minmax(0, 1fr); }
.hfb .hf-mm1-lad > div{ display:grid; grid-template-columns:118px minmax(0, 1fr); gap:7px; align-items:center; }
.hfb .hf-mm1-lad .lb{ font-size:13px; line-height:1.2; color:var(--ink); }
.hfb .hf-mm1-lad .tr{ display:flex; align-items:center; gap:5px; min-width:0; }
.hfb .hf-mm1-lad .fl{ height:16px; min-width:3px; border-radius:3px; background:var(--hf-k); transition:width .9s cubic-bezier(.2,.7,.2,1); }
.hfb .hf-mm1-lad .fl.v{ background:var(--hf-red); }
.hfb .hf-mm1-lad .vl{ flex:none; font:700 13px/1 var(--mono); color:var(--ink); white-space:nowrap; }
.hfb .hf-mm1-dr{ display:grid; grid-template-columns:minmax(0, 1fr); gap:7px; }
.hfb .hf-mm1-dr .rw{ min-width:0; }
.hfb .hf-mm1-dr .rw{ border-bottom:1px dotted var(--faint); padding-bottom:5px; }
.hfb .hf-mm1-dr .lb{ font-size:13.5px; line-height:1.25; color:var(--ink); margin:0 0 3px; }
.hfb .hf-mm1-dr .in{ display:flex; align-items:center; gap:6px; }
.hfb .hf-mm1-dr input{ width:74px; height:28px; font:700 14px/1 var(--mono); border:1.5px solid var(--faint); border-radius:5px; text-align:center; background:var(--hf-grey); color:var(--ink); padding:0; margin:0; }
.hfb .hf-mm1-dr input.ok{ border-color:var(--ok); color:var(--ok); } .hfb .hf-mm1-dr input.no{ border-color:var(--hf-red); color:var(--hf-red); }
.hfb .hf-mm1-dr .u{ font:700 13px/1 var(--mono); color:var(--graphite); }
.hfb .hf-mm1-dr .mk{ font:800 15px/1 var(--body); } .hfb .hf-mm1-dr .mk.ok{ color:var(--ok); } .hfb .hf-mm1-dr .mk.no{ color:var(--hf-red); }
.hfb .hf-mm1-dr .wk{ font:600 13px/1.3 var(--mono); color:var(--hf-k); margin:3px 0 0; direction:ltr; text-align:left; }
.hfb .hf-mm1-three{ display:grid; gap:6px; }
.hfb .hf-mm1-three > div{ border:2px solid var(--hf-line); border-radius:8px; padding:6px 9px; background:var(--paper); font-size:13.5px; line-height:1.3; color:var(--ink); }
.hfb .hf-mm1-three > div > b:first-child{ display:block; font:800 14.5px/1.2 var(--body); color:var(--hf-k); margin-bottom:1px; }
.hfb .hf-mm1-three i{ display:block; margin-top:2px; font-style:normal; font-family:var(--mono); font-size:12.5px; color:var(--graphite); }
`;
    document.head.appendChild(s);
  }

  // three small pixel grids: what 1, 8 and 24 bits per pixel can hold (6 x 6 pixels each)
  const BW = [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1];
  function Pixels({ kind }) {
    const cells = [];
    for (let i = 0; i < 36; i++) {
      const r = Math.floor(i / 6), c = i % 6;
      const f = kind === 1 ? (BW[i] ? '#111' : '#fff') : kind === 8 ? 'hsl(0 0% ' + Math.round(8 + (r + c) * 8.4) + '%)' : 'hsl(' + Math.round((c * 60 + r * 14) % 360) + ' 72% ' + (38 + r * 6) + '%)';
      cells.push(html`<rect key=${i} x=${c * 10} y=${r * 10} width="10" height="10" fill=${f} />`);
    }
    return html`<svg viewBox="0 0 60 60" aria-hidden="true" shapeRendering="crispEdges">${cells}</svg>`;
  }

  // the size ladder: the slides' own uncompressed sizes as bars on one scale, so you can see how fast video runs away
  const LAD = [
    ['512 × 512 grey image', 'صورة grey <bdi dir="ltr">512×512</bdi>', 0.25, '1/4 MB', 0],
    ['512 × 512 true colour', 'صورة ملوّنة <bdi dir="ltr">512×512</bdi>', 0.75, '3/4 MB', 0],
    ['1 min mono CD audio', 'دقيقة صوت CD، mono', 5, '5 MB', 0],
    ['1 min stereo CD audio', 'دقيقة صوت CD، stereo', 10, '10 MB', 0],
    ['one 10 MP photo', 'صورة كاميرا <bdi dir="ltr">10 MP</bdi>', 29, '≈ 29 MB', 0],
    ['<b>1 second</b> of PAL video', '<b>ثانية</b> video بنظام PAL', 31, '≈ 31 MB', 1],
    ['<b>1 second</b> of HD video', '<b>ثانية</b> video بجودة HD', 155, '≈ 155 MB', 1]
  ];
  function Ladder() {
    const ar = useAr();
    const [grown, setGrown] = useState(calm());
    useEffect(() => { if (grown) return; const id = setTimeout(() => setGrown(true), 120); return () => clearTimeout(id); }, []);
    return html`<div className="hf-mm1-lad hf-in" role="img" aria-label="Uncompressed sizes from the slides as bars: 0.25, 0.75, 5, 10, 29, 31 and 155 MB">
      ${LAD.map(([en, a, mb, lab, v], j) => html`<div key=${j}><span className="lb">${H.K.T(ar ? a : en)}</span>
        <span className="tr"><span className=${'fl' + (v ? ' v' : '')} style=${{ width: grown ? (mb / 155 * 64) + '%' : '0%', transitionDelay: calm() ? '0s' : (j * 0.18) + 's' }}></span><span className="vl" dir="ltr">${lab}</span></span></div>`)}
    </div>`;
  }

  // Size it up: type the uncompressed size in MB; either convention for a megabyte is accepted (the slides use both)
  const DR = [
    ['A 512 × 512 grey scale image (8 bits per pixel)', 'صورة grey scale مقاس <bdi dir="ltr">512 × 512</bdi> (<bdi dir="ltr">8 bits</bdi> لكل pixel)', 262144, '512 × 512 × 1 B = 262,144 B = 0.25 MB'],
    ['The same image in true colour (24 bits per pixel)', 'نفس الصورة بس true colour (<bdi dir="ltr">24 bits</bdi> لكل pixel)', 786432, '512 × 512 × 3 B = 786,432 B = 0.75 MB'],
    ['One minute of stereo CD-quality audio', 'دقيقة audio stereo بجودة CD', 10584000, '44,100 × 2 B × 2 × 60 = 10,584,000 B ≈ 10 MB'],
    ['One second of PAL video (720 × 576, colour, 25 fps)', 'ثانية video بنظام PAL (<bdi dir="ltr">720 × 576</bdi>، ملوّن، <bdi dir="ltr">25 fps</bdi>)', 31104000, '720 × 576 × 3 B × 25 = 31,104,000 B ≈ 31 MB']
  ];
  const parse = s => { const t = String(s || '').replace(',', '.').replace(/[^0-9./]/g, ''); if (!t) return NaN; if (t.includes('/')) { const [a, b] = t.split('/').map(Number); return b ? a / b : NaN; } return Number(t); };
  const near = (v, b) => [1048576, 1e6].some(d => Math.abs(v - b / d) <= 0.05 * (b / d));
  function Drill({ id }) {
    const ar = useAr();
    const [v, setV] = H.K.useSlot(id + ':v', {});
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const [sh, setSh] = H.K.useSlot(id + ':s', false);
    const ok = j => near(parse(v[j]), DR[j][2]);
    const right = DR.filter((_, j) => ok(j)).length;
    return html`<div className="hf-mm1-dr hf-in">
      ${DR.map(([en, a, b, wk], j) => html`<div key=${j} className="rw"><p className="lb">${H.K.T(ar ? a : en)}</p>
        <div className="in" dir="ltr"><input inputMode="decimal" maxLength="7" aria-label=${'size in MB: ' + en} className=${ck ? (ok(j) ? 'ok' : 'no') : ''} value=${v[j] || ''}
          onChange=${e => { setV(Object.assign({}, v, { [j]: e.target.value.slice(0, 7) })); setCk(false); }} /><span className="u">MB</span>
          ${ck && html`<span className=${'mk ' + (ok(j) ? 'ok' : 'no')}>${ok(j) ? '✓' : '✗'}</span>`}</div>
        ${sh && html`<p className="wk">${wk}</p>`}</div>`)}
      <div className="hf-row">
        <button className="hf-btn solid" disabled=${!Object.keys(v).length} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { const o = {}; DR.forEach((d, j) => { o[j] = String(Math.round(d[2] / 1048576 * 100) / 100); }); setV(o); setCk(true); setSh(true); }}>${ar ? 'ورّيني الحل' : 'Show me'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${DR.length}</bdi> صح` : right + ' / ' + DR.length + ' right'}</span>`}
      </div>
    </div>`;
  }

  H.chapters.mm[1] = {
    title: 'Introduction to Multimedia', kicker: 'Chapter 1', run: 'introduction to multimedia',
    ar: { title: 'مقدمة عن الـ Multimedia', kicker: 'الفصل 1', run: 'مقدمة عن الـ multimedia' },
    pages(K, kit) {
      const { H1, H2, H3, P, UL, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 1);
      const arQuiz = (window.AR && window.AR.mm && window.AR.mm.lectures && window.AR.mm.lectures[1] && window.AR.mm.lectures[1].quiz) || [];
      const q = re => { const i = lec.quiz.findIndex(x => re.test(String(x.q).replace(/<[^>]+>/g, '')) && x.src); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      // keep hyphenated English terms (real-time, high-speed) on one line inside Arabic text
      const nw = x => A ? x.replace(/([A-Za-z]+(?:-[A-Za-z]+)+)/g, '<bdi class="hf-mm1-nw">$1</bdi>') : x;
      return [
        // 0 · how to use this chapter (faces the opener)
        page(html`
          <${H2}>${t('How to use this chapter', 'إزاي تذاكر الفصل ده')}</${H2}>
          <${P} small=${true}>${X("This is the first chapter of Multimedia, so here is the deal: your brain remembers what is surprising, visual and a bit emotional, so that's how this chapter is written. The facts are all from the doctors' slides.",
            'ده أول فصل في الـ Multimedia، فخلّينا نتفق: مخك بيفتكر الحاجة اللي بتفاجئه، واللي فيها صور، واللي فيها شوية مشاعر، فالفصل مكتوب كده. بس كل المعلومات من سلايدز الدكاترة.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> "Sharpen your pencil" boxes are not optional. You answer right on the page.', '<b>حل التمارين.</b> صناديق "امسك القلم" مش اختيارية. بتجاوب على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: no answer box. Stop and think before you turn the page.', '<b>شغّل مخك</b>: مفيش مكان للإجابة. وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps, taken from the real papers and this year\'s midterm.', '<b>خلّي بالك!</b> دي فخاخ الامتحان، من الامتحانات الحقيقية وميدترم السنة دي.')}</span></div>
            <div className="row"><span className="mk">${t('Q:', 'س:')}</span><span>${X('<b>There are no Dumb Questions</b> answers the things you were too shy to ask.', '<b>مفيش حاجة اسمها سؤال غبي</b> بيجاوب على الحاجات اللي اتكسفت تسألها.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks a slip on the slides, and what was meant.', 'معناها فيه غلطة أو لخبطة في السلايد، وبنقولك المقصود إيه.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات المكتوبة بخط الإيد واللي عليها "من عندنا" دي تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('How to use this chapter', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">1</span><span className="t">${A ? html`الفصل الأول<br/>Multimedia` : html`Chapter one<br/>Multimedia`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Many Media, One Computer', 'كذا media في كمبيوتر واحد')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('introduction to multimedia', 'مقدمة عن الـ multimedia')}</p></div>
          <${Talk} who="mic">${t('I hear things.', 'أنا بسمع.')}</${Talk}>
          <${Talk} who="cam" flip=${true}>${t('I see things.', 'وأنا بشوف.')}</${Talk}>
          <${Talk} who="spk">${t('And I play it all back to you.', 'وأنا بشغّلهولك كله تاني.')}</${Talk}>
          <${P} small=${true}>${X("Each of them alone is just one medium. Put text, pictures, sound and video together, under a computer's control and all in digital form, and you have <b>multimedia</b>. Then you will see how <b>huge</b> the data gets, which is why the whole course ends up being about <b>compression</b>.",
            'كل واحد فيهم لوحده هو medium واحد بس. لكن لما تجمع الـ text والصور والصوت والـ video مع بعض، تحت تحكم الكمبيوتر وكلهم digital، يبقى عندك <b>multimedia</b>. وبعدين هتشوف الـ data حجمها بيبقى <b>ضخم</b> قد إيه، وعشان كده الكورس كله في الآخر بيبقى عن الـ <b>compression</b>.')}</${P}>
        `, { sec: t('Meet multimedia', 'اتعرّف على الـ multimedia') }),

        // 2 · what is multimedia
        page(html`
          <${H1}>${t('What is multimedia?', 'يعني إيه multimedia؟')}</${H1}>
          <${P} small=${true}>${X('Many media used together. The slides give two definitions:', 'يعني media كتير مع بعض. والسلايدز بتدّي تعريفين:')}</${P}>
          <${Def}>${X('<b>From the computer system\'s view:</b> computer information can be represented through <b>audio, video and animation</b> in addition to traditional media (text, graphics/drawings, images).',
            '<b>من ناحية الـ computer system:</b> معلومات الكمبيوتر ممكن تتمثّل بـ <b>audio وvideo وanimation</b> زيادة على الـ media التقليدية (الـ text والـ graphics والـ drawings والـ images).')}</${Def}>
          <${Def}>${X('<b>The general (working) definition:</b> the field concerned with the <b>computer-controlled integration</b> of text, graphics, drawings, still and moving images (video), animation, audio and any other media, where every type of information can be <b>represented, stored, transmitted and processed digitally</b>.',
            '<b>التعريف العام (اللي بنشتغل بيه):</b> المجال اللي بيهتم بـ <b>الـ integration اللي بيتحكم فيه الكمبيوتر</b> بين الـ text والـ graphics والـ drawings والصور الثابتة والمتحركة (video) والـ animation والـ audio وأي media تانية، بحيث كل نوع معلومات يقدر <b>يتمثّل ويتخزن ويتبعت ويتعالج digitally</b>.')}</${Def}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: "Multi" in multimedia means <b>Many</b>, not Large and not Medium.',
            'في الميدترم: كلمة Multi معناها <b>Many</b>، مش Large ولا Medium.')}</p></${Box}>
        `, { sec: t('What is multimedia?', 'يعني إيه multimedia؟') }),

        // 3 · multimedia application + the computer-system definition on the exam
        page(html`
          <${H2}>${t('A multimedia application', 'الـ multimedia application')}</${H2}>
          <${Def}>${X('A <b>multimedia application</b> is an application which uses a <b>collection of multiple media sources</b>, e.g. text, graphics, images, sound/audio, animation and/or video.',
            'الـ <b>multimedia application</b> هو أي application بيستخدم <b>مجموعة من مصادر media متعددة</b>، زي text وgraphics وimages وsound وanimation و/أو video.')}</${Def}>
          <${Hand} red=${true}>${t('True/False on two exams (2020/21 and 2021/22): True, word for word.', 'جت صح وغلط في امتحانين (2020/21 و2021/22): الإجابة صح، بالحرف.')}</${Hand}>
          <${P} small=${true}>${t('And the first definition came as a fill-in-the-blank. Try it:', 'والتعريف الأولاني جه في الامتحان كإكمال. جرّب:')}</${P}>
          ${mq('d1', /means that computer information can be represented/)}
        `),

        // 4 · course map
        page(html`
          <${H2}>${t('Where this course is going', 'الكورس رايح على فين')}</${H2}>
          <${UL} items=${A ? ['الـ <b>multimedia data</b>: الـ audio والـ graphics والـ images والـ video', 'الـ <b>signal processing</b>: الـ filtering والـ synthesis', 'الـ <b>MIDI</b>', 'الـ <b>compression</b>: الـ <bdi dir="ltr">JPEG/GIF</bdi>، والـ MPEG للـ video والـ audio']
            : ['<b>Multimedia data</b>: audio, graphics, images, video', '<b>Signal processing</b>: filtering, synthesis', '<b>MIDI</b>', '<b>Compression</b>: JPEG/GIF, MPEG video and audio']} />
          <${P} small=${true}>${X('Recommended book: <i>Fundamentals of Multimedia</i>, Ze-Nian Li and Mark S. Drew.', 'الكتاب المقترح هو <i>Fundamentals of Multimedia</i>، تأليف Ze-Nian Li وMark S. Drew.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: <i>"Multimedia involves only audio and video elements."</i> <b>False</b>. Text, graphics and images are multimedia elements too.',
            'سؤال الميدترم:<span class="ltr"><i>"Multimedia involves only audio and video elements."</i></span>الإجابة <b>False</b>: الـ text والـ graphics والـ images عناصر برضه.')}</p></${Box}>
        `),

        // 5 · hypertext
        page(html`
          <${H1}>${t('Text that jumps', 'نص بينطّ')}</${H1}>
          <${Def}>${X('<b>Hypertext</b> is text which contains <b>links to other texts</b>. The term was invented by <b>Ted Nelson around 1965</b>.',
            'الـ <b>Hypertext</b> هو text فيه <b>links لنصوص تانية</b>. المصطلح ده اخترعه <b>Ted Nelson حوالي سنة 1965</b>.')}</${Def}>
          <${P} small=${true}>${X('HyperText is <b>non-linear</b> documents. By clicking on <b>hot spots</b> in the text, the reader is <b>immediately transported</b> to related material in the document. <b>Content table-like views</b> are provided too, so navigation is by hot spots or by <b>"overview" mechanisms</b>.',
            'الـ HyperText هو documents <b>non-linear</b>. لما تدوس على <b>hot spots</b> في الـ text، القارئ <b>بيتنقل على طول</b> للمادة المرتبطة بيها في الـ document. وفيه كمان <b>views شبه جدول المحتويات</b>، فالتنقل بيبقى بالـ hot spots أو بـ <b>آليات الـ "overview"</b>.')}</${P}>
          <${Talk} who="dev">${t('So a hot spot is the place I click, and it takes me somewhere else in the document?', 'يعني الـ hot spot هو المكان اللي بدوس عليه، ويوديني حتة تانية في الـ document؟')}</${Talk}>
          <${Talk} who="table" flip=${true}>${t("Exactly. Or you skip the hot spots and use me, the contents view, to jump straight to a page.", 'بالظبط. أو تسيبك من الـ hot spots وتستخدمني أنا، جدول المحتويات، وتنط على الصفحة على طول.')}</${Talk}>
          <${Grow} />
          <${Hand}>${t('ours: "hyper" text = text that can jump. Ted Nelson, about 1965.', 'من عندنا: الـ hyper text يعني نص بيعرف ينطّ. والمخترع Ted Nelson، حوالي 1965.')}</${Hand}>
        `, { sec: t('Hypertext', 'الـ Hypertext') }),
        page(html`
          <${H2}>${t('Try it: jump by hot spots (slide 6)', 'جرّب: انط بالـ hot spots (سلايد 6)')}</${H2}>
          <${Fig} name="mm-hypertext" />
        `),

        // 7 · linear vs hypertext
        page(html`
          <${H2}>${t('Linear or non-linear? (slide 7)', 'linear ولا non-linear؟ (سلايد 7)')}</${H2}>
          <${Fig} name="mm-linear-hyper" />
          <${Hand} red=${true}>${t('non-linear traversal affects the layout and organisation of the material, and depends a lot on the application', 'التنقل الـ non-linear بيأثر على الـ layout وتنظيم المادة، وبيعتمد جامد على الـ application')}</${Hand}>
        `),

        // 8 · hypermedia
        page(html`
          <${H1}>${t('Hypermedia: links beyond text', 'الـ Hypermedia: الـ links بعد الـ text')}</${H1}>
          <${Def}>${X('<b>Hypermedia</b> is <b>not constrained to be text-based</b>. It can include other media, e.g. graphics, images, and especially the <b>continuous media: sound and video</b>.',
            'الـ <b>Hypermedia</b> <b>مش لازم يبقى text بس</b>. ممكن يحتوي media تانية زي graphics وimages، وخصوصًا الـ <b>continuous media، يعني الصوت والـ video</b>.')}</${Def}>
          <${P} small=${true}>${X('Hypermedia applications: the <b>World Wide Web</b> is the clear example. Also <b>PowerPoint</b>, <b>Adobe Acrobat</b> (PDF software) and <b>Adobe Flash</b>. ("Many many others?", the slide asks.)',
            'أمثلة الـ hypermedia applications: الـ <b>World Wide Web</b> هو المثال الواضح. وكمان الـ <b>PowerPoint</b> والـ <b>Adobe Acrobat</b> (برنامج الـ PDF) والـ <b>Adobe Flash</b>. (والسلايد بيسأل: وغيرهم كتير؟)')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: <i>"PowerPoint is an example of multimedia presentation software."</i> <b>True</b>: the lecture lists PowerPoint with the WWW, Acrobat and Flash.',
            'سؤال الميدترم:<span class="ltr"><i>"PowerPoint is an example of multimedia presentation software."</i></span>الإجابة <b>True</b>: المحاضرة حاطة الـ PowerPoint مع الـ WWW والـ Acrobat والـ Flash.')}</p></${Box}>
        `, { sec: t('Hypermedia', 'الـ Hypermedia') }),
        page(html`
          <${H2}>${t('Every medium linked to every other (slide 8)', 'كل media متربطة بالباقيين (سلايد 8)')}</${H2}>
          <${Fig} name="mm-hypermedia" />
        `),

        page(html`
          <${Dumb} qa=${A ? [
            ['إيه الفرق بين الـ hypertext والـ hypermedia؟', 'الـ hypertext هو text فيه links لنصوص تانية. والـ hypermedia نفس الفكرة بس <b>مش text بس</b>: الـ links بتربط graphics وimages وصوت وvideo.'],
            ['هو الـ WWW ده hypertext ولا hypermedia؟', 'هو <b>hypermedia</b>، والسلايد بيقول إنه المثال الواضح، لأن الـ links فيه بتربط text وصور وصوت وvideo.'],
            ['والـ hot spot ده هو نفسه الـ hypertext؟', 'لأ. الـ hot spot هو <b>المكان اللي بتدوس عليه</b> جوه الـ text عشان تتنقل؛ والـ hypertext هو الـ text كله باللينكات اللي فيه.']
          ] : [
            ['What is the difference between hypertext and hypermedia?', 'Hypertext is text with links to other texts. Hypermedia is the same idea but <b>not text-only</b>: its links join graphics, images, sound and video.'],
            ['Is the WWW hypertext or hypermedia?', 'Hypermedia, the slide\'s clear example: its links join text, images, sound and video, not just text.'],
            ['Is a hot spot the same thing as hypertext?', 'No. A hot spot is the <b>place you click</b> inside the text to be transported; hypertext is the whole text with its links.']
          ]} />
          <${Grow} />
          <${Talk} who="spk">${X('<b>Continuous</b> media, that\'s me and the camera: sound and video keep going in time.', 'الـ media الـ <b>continuous</b> دي أنا والكاميرا: الصوت والـ video شغالين مع الوقت على طول.')}</${Talk}>
        `),

        // 10 · applications
        page(html`
          <${H2}>${t('Where you meet multimedia', 'بتقابل الـ multimedia فين')}</${H2}>
          <${P} small=${true}>${t('Multimedia applications on the slides (shaded: from the later "Applications" slide):', 'الـ multimedia applications في السلايدز (الملوّنين من سلايد Applications اللي بعدها):')}</${P}>
          <div className="hf-mm1-chips hf-in">${(A
            ? ['الـ WWW', 'الـ multimedia authoring (Director)', 'الـ hypermedia courseware', 'الـ video-on-demand', 'الـ interactive TV', 'الألعاب', 'الـ virtual reality', 'الـ digital video editing', 'الـ multimedia databases', 'الـ video conferencing', 'الـ groupware', 'الـ home shopping']
            : ['WWW', 'multimedia authoring (Director)', 'hypermedia courseware', 'video-on-demand', 'interactive TV', 'computer games', 'virtual reality', 'digital video editing and production', 'multimedia database systems', 'video conferencing', 'groupware', 'home shopping']).map((x, j) => html`<span key=${j} className=${j >= 9 ? 'k' : ''}>${x}</span>`)}</div>
          <${Box} kind="watch"><p className="hf-p small">${X('Midterm: <i>"Multimedia is used only for entertainment purposes."</i> <b>False</b>: courseware is education, and video conferencing, groupware and home shopping are work and commerce.',
            'سؤال الميدترم:<span class="ltr"><i>"Multimedia is used only for entertainment purposes."</i></span>الإجابة <b>False</b>: الـ courseware ده تعليم، والـ video conferencing والـ groupware والـ home shopping شغل وتجارة.')}</p></${Box}>
        `),

        // 11 · the multimedia system and the four characteristics
        page(html`
          <${H1}>${t('What makes a multimedia system?', 'إيه اللي يخلّي الـ system يبقى multimedia؟')}</${H1}>
          <${Def}>${X('A <b>multimedia system</b> is a system capable of processing multimedia data and applications. It is characterised by the <b>processing, storage, generation, manipulation and rendition</b> of multimedia information.',
            'الـ <b>multimedia system</b> هو system يقدر يعالج multimedia data وapplications. وبيتميز بـ <b>الـ processing والـ storage والـ generation والـ manipulation والـ rendition</b> (العرض) للمعلومات الـ multimedia.')}</${Def}>
          <${Hand} red=${true}>${t('exam T/F (2021/22): "A Multimedia System is a system capable of processing multimedia data and applications": True', 'صح وغلط في امتحان 2021/22 على نفس التعريف ده: الإجابة صح')}</${Hand}>
          <${H3}>${t('Four basic characteristics', 'الأربع خصائص الأساسية')}</${H3}>
          <div className="hf-mm1-four hf-in">
            ${(A ? [['computer controlled', 'لازم'], ['integrated', 'الـ media متجمعة مع بعض'], ['digital', 'المعلومات متمثّلة digitally'], ['interactive', 'الـ interface للعرض النهائي غالبًا']]
              : [['Computer controlled', 'must be'], ['Integrated', 'the media are integrated'], ['Digital', 'information represented digitally'], ['Interactive', 'interface to the final presentation, usually']]).map(([n, s], j) => html`<div key=${j}><b>${j + 1}</b><span>${A ? html`<small>${s}</small><bdi>${n}</bdi>` : html`<small>${s}</small>${n}`}</span></div>`)}
          </div>
          <${Grow} />
          <${Hand}>${t('ours: C-I-D-I. Controlled, Integrated, Digital, Interactive.', 'من عندنا: افتكرهم بالحروف C-I-D-I.')}</${Hand}>
        `, { sec: t('Multimedia systems', 'الـ Multimedia systems') }),

        // 12 · interactive
        page(html`
          <${H2}>${t('Interactive: the user is in control', 'الـ Interactive: الـ user هو اللي متحكم')}</${H2}>
          <${P} small=${true}>${X('Characteristic 4: the interface to the final presentation is usually <b>interactive</b>. The midterm asked what that means:', 'الخاصية 4: الـ interface للعرض النهائي غالبًا <b>interactive</b>. والميدترم سأل معناها إيه:')}</${P}>
          ${mq('i1', /Interactivity In Multimedia Means/)}
          <${Grow} />
          <${Hand} red=${true}>${t('trap: "analog" is never one of the four. Multimedia information must be represented digitally.', 'فخ: كلمة analog عمرها ما بتبقى من الأربعة. المعلومات في الـ multimedia لازم تبقى digital.')}</${Hand}>
        `),

        // 13 · challenges
        page(html`
          <${H1}>${t('Why multimedia is hard', 'ليه الـ multimedia صعب')}</${H1}>
          <${P} small=${true}>${t('The challenges slide has two top-level challenges, and three more sit under the second one:', 'سلايد الـ challenges فيه اتنين challenges أساسيين، وتحت التاني فيه تلاتة كمان:')}</${P}>
          <div className="hf-mm1-tree hf-in">
            <div className="hf-mm1-node">${t('Distributed Networks', 'الـ Distributed Networks')}</div>
            <div><div className="hf-mm1-node">${t('Temporal relationship between data', 'الـ Temporal relationship between data')}</div>
              <div className="hf-mm1-kids">${(A ? ['إنك تعرض data مختلفة <b>في نفس الوقت وبشكل continuous</b>', 'الـ <b>sequencing within the media</b>: تشغيل الـ video frames بالترتيب والتوقيت الصح', 'الـ <b>synchronisation</b>: يعني inter-media scheduling']
                : ['Render different data <b>at the same time, continuously</b>', '<b>Sequencing within the media</b>: play video frames in the correct order/time frame', '<b>Synchronisation</b>: inter-media scheduling']).map((x, j) => html`<div key=${j}>${T(x)}</div>`)}</div></div>
          </div>
          <${Talk} who="cam">${X('E.g. video and audio: <b>lip synchronisation</b> is clearly important for humans watching playback, and even for animation and audio.', 'مثال الـ video والـ audio: الـ <b>lip synchronisation</b> مهم جدًا للناس وهم بيتفرجوا، وحتى في الـ animation مع الـ audio.')}</${Talk}>
          <${Talk} who="spk" flip=${true}>${t('Ever tried watching an out of (lip) sync film for a long time? (the slide asks that)', 'جربت قبل كده تتفرج على فيلم الصوت فيه مش ماشي مع الشفايف لمدة طويلة؟ (السلايد بيسأل كده)')}</${Talk}>
        `, { sec: t('Challenges', 'الـ Challenges') }),
        page(html`
          <${H2}>${t('Break the lip sync yourself (slide 14)', 'بوّظ الـ lip sync بإيدك (سلايد 14)')}</${H2}>
          <${Fig} name="mm-lipsync" />
        `),

        // 15 · key issues
        page(html`
          <${H2}>${t('The key issues', 'الـ key issues')}</${H2}>
          <${UL} items=${A ? [
            'إزاي <b>نمثّل ونخزن</b> المعلومات الزمنية (temporal)؟',
            'إزاي <b>نحافظ بدقة</b> على العلاقات الزمنية وقت الـ <bdi dir="ltr">playback/retrieval</bdi>؟',
            'إيه الـ <b>processes</b> اللي داخلة في ده؟',
            'الـ data لازم تتمثّل digitally، يعني <b>analog–digital conversion</b> و<b>sampling</b>.',
            'الـ <b>data requirements كبيرة</b> (الـ bandwidth والـ storage)، فالـ <b>data compression غالبًا إجباري</b>.'
          ] : [
            'How to <b>represent and store</b> temporal information?',
            'How to <b>strictly maintain</b> the temporal relationships on playback/retrieval?',
            'What <b>processes</b> are involved?',
            'Data has to be represented digitally: <b>analog–digital conversion</b>, <b>sampling</b>.',
            '<b>Large data requirements</b> (bandwidth, storage), so <b>data compression is usually mandatory</b>.'
          ]} />
          <${Hand} red=${true}>${t('lip sync = synchronisation (inter-media). Frames of one video in the right order = sequencing within the media.', 'الـ lip sync يبقى synchronisation (بين media وmedia). وترتيب frames الـ video الواحد يبقى sequencing within the media.')}</${Hand}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${t('"Sampling" sneaked into the key issues. Sound arrives from a microphone as a continuous analog signal. What would a computer have to do to it before it can store it at all?',
            'كلمة sampling دخلت في الـ key issues. الصوت جاي من الـ microphone كـ analog signal متصلة. الكمبيوتر محتاج يعمل فيها إيه قبل ما يقدر يخزنها أصلًا؟')}</p></${Box}>
        `),

        // 16 · desirable features
        page(html`
          <${H1}>${t('What a multimedia system needs', 'الـ multimedia system محتاج إيه')}</${H1}>
          <${P} small=${true}>${X('Given those challenges, these features are desirable (<b>if not a prerequisite</b>):', 'بسبب الـ challenges دي، المميزات دي مطلوبة (<b>إن ما كانتش شرط أساسي</b>):')}</${P}>
          <div className="hf-mm1-feat hf-in">
            ${(A ? [
              ['الـ processing power عالية جدًا', 'للـ data الكبيرة والـ real-time delivery'],
              ['الـ multimedia-capable file system', 'للـ streaming في real-time، زي RAID'],
              ['الـ data representations', 'ملفات بـ formats فيها <bdi dir="ltr">compression/decompression</bdi> في real-time'],
              ['الـ I/O كفء وعالي', 'الـ recording والـ playback في real-time، زي الـ direct-to-disk'],
              ['الـ operating system خاص', 'الـ real-time scheduling والـ fast interrupts والـ I/O streaming'],
              ['الـ storage والـ memory', 'مئات الـ Tb، وكذا Gb، وcaches كبيرة وhigh-speed buses'],
              ['الـ network support', 'الـ client-server، لأن الـ distributed systems منتشرة'],
              ['الـ software tools', 'سهلة الاستخدام للتعامل مع الـ media وتطوير الـ applications']
            ] : [
              ['Very high processing power', 'large data processing, real-time delivery'],
              ['Multimedia-capable file system', 'real-time streaming; e.g. RAID'],
              ['Data representations', 'formats with real-time compression/decompression'],
              ['Efficient and high I/O', 'real-time recording and playback; direct-to-disk'],
              ['Special operating system', 'real-time scheduling, fast interrupts, I/O streaming'],
              ['Storage and memory', 'hundreds of Tb, several Gb, large caches, high-speed buses'],
              ['Network support', 'client-server, as distributed systems are common'],
              ['Software tools', 'user-friendly tools to handle media and build applications']
            ]).map(([n, d], j) => html`<div key=${j}><b>${T(nw(n))}</b>${T(nw(d))}</div>`)}
          </div>
        `, { sec: t('Desirable features', 'المميزات المطلوبة') }),

        // 17 · match features
        page(html`
          <${H2}>${t('Which feature does that?', 'أنهي ميزة دي؟')}</${H2}>
          <${P} small=${true}>${t('Tap a feature, then the example the slides give for it.', 'دوس على الميزة، وبعدين على المثال اللي السلايدز بتدّيه ليها.')}</${P}>
          <${Match} id="feat" left=${A ? ['الـ processing power العالية', 'الـ multimedia-capable file system', 'الـ data representations', 'الـ I/O الكفء', 'الـ operating system الخاص', 'الـ storage والـ memory']
              : ['Very high processing power', 'Multimedia-capable file system', 'Data representations', 'Efficient and high I/O', 'Special operating system', 'Storage and memory']}
            right=${A ? ['أنظمة الـ direct-to-disk recording', 'الـ RAID', 'الـ caches الكبيرة والـ high-speed buses', 'معالجة data كبيرة والـ real-time delivery', 'الـ real-time scheduling والـ fast interrupt processing', 'الـ file formats اللي فيها compression في real-time']
              : ['Direct-to-disk recording systems', 'RAID', 'Large caches and high-speed buses', 'Large data processing, real-time delivery', 'Real-time scheduling, fast interrupt processing', 'File formats with real-time compression']}
            answer=${[3, 1, 5, 0, 4, 2]} />
        `),

        // 18 · sort challenge / key issue / feature
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Is it a <b>C</b>hallenge, a <b>K</b>ey issue, or a desirable <b>F</b>eature? Tap a letter for each, then check.', 'ده <b>C</b> يعني challenge، ولا <b>K</b> يعني key issue، ولا <b>F</b> يعني feature مطلوبة؟ اختار حرف لكل واحدة، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="cki" bins=${[['C', t('Challenge', 'الـ challenge')], ['K', t('Key issue', 'الـ key issue')], ['F', t('Feature', 'الـ feature')]]} items=${A ? [
            ['الـ distributed networks', 0],
            ['الـ lip synchronisation للـ video والـ audio', 0],
            ['إن الـ data لازم تتمثّل digitally (الـ sampling)', 1],
            ['الـ RAID في الـ file system', 2],
            ['تشغيل الـ frames بالترتيب والتوقيت الصح', 0],
            ['إن الـ compression غالبًا إجباري', 1],
            ['الـ real-time scheduling في الـ OS', 2],
            ['إزاي نخزن المعلومات الزمنية', 1]
          ] : [
            ['Distributed networks', 0],
            ['Lip synchronisation of video and audio', 0],
            ['Data must be represented digitally (sampling)', 1],
            ['RAID in the file system', 2],
            ['Playing frames in the correct order/time frame', 0],
            ['Compression is usually mandatory', 1],
            ['Real-time scheduling in the OS', 2],
            ['How to store temporal information', 1]
          ]} />
        `),

        // 19 · components
        page(html`
          <${H1}>${t('The parts of the system', 'أجزاء الـ system')}</${H1}>
          <${P} small=${true}>${t('Components of a multimedia system (hardware and software):', 'مكونات الـ multimedia system (الـ hardware والـ software):')}</${P}>
          <div className="hf-mm1-comp hf-in">
            ${(A ? [
              ['الـ Capture devices', 'الـ video camera والـ video recorder والـ microphone والـ keyboards والـ mice والـ graphics tablets والـ 3D input devices والـ tactile sensors والـ VR devices والـ digitising hardware'],
              ['الـ Storage devices', 'الـ hard disks والـ CD-ROMs والـ DVD-ROM إلخ'],
              ['الـ Communication networks', 'الـ local networks والـ intranets والـ Internet والشبكات الـ high-speed الخاصة'],
              ['الـ Computer systems', 'الـ multimedia desktop machines والـ workstations والـ <bdi dir="ltr">MPEG/VIDEO/DSP</bdi> hardware'],
              ['الـ Display devices', 'الـ CD-quality speakers والـ HDTV والـ SVGA والـ hi-res monitors والـ colour printers']
            ] : [
              ['Capture devices', 'video camera, video recorder, audio microphone, keyboards, mice, graphics tablets, 3D input devices, tactile sensors, VR devices, digitising hardware'],
              ['Storage devices', 'hard disks, CD-ROMs, DVD-ROM, etc.'],
              ['Communication networks', 'local networks, intranets, Internet, multimedia or other special high-speed networks'],
              ['Computer systems', 'multimedia desktop machines, workstations, MPEG/VIDEO/DSP hardware'],
              ['Display devices', 'CD-quality speakers, HDTV, SVGA, hi-res monitors, colour printers']
            ]).map(([n, d], j) => html`<div key=${j}><b>${n}</b><span>${T(d)}</span></div>`)}
          </div>
          <${Grow} />
          <${Talk} who="mic">${t('The camera and I are on the way in. The speakers are on the way out.', 'أنا والكاميرا على ناحية الدخول. والسماعات على ناحية الخروج.')}</${Talk}>
        `, { sec: t('Components', 'المكونات') }),

        // 20 · sort components
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Which component group? <b>Cap</b>ture, <b>Sto</b>rage, <b>Net</b>work, computer <b>Sys</b>tem or <b>Dis</b>play.', 'أنهي مجموعة؟ <b>Cap</b> للـ capture، <b>Sto</b> للـ storage، <b>Net</b> للـ network، <b>Sys</b> للـ computer system، <b>Dis</b> للـ display.')}</p></${Box}>
          <${Sort} id="comp" bins=${[['Cap', t('Capture', 'الـ capture')], ['Sto', t('Storage', 'الـ storage')], ['Net', t('Network', 'الـ network')], ['Sys', t('Computer system', 'الـ computer system')], ['Dis', t('Display', 'الـ display')]]} items=${A ? [
            ['الـ microphone', 0],
            ['الـ DVD-ROM', 1],
            ['الـ HDTV', 4],
            ['الـ intranet', 2],
            ['الـ tactile sensors', 0],
            ['الـ DSP hardware', 3],
            ['الـ colour printer', 4],
            ['الـ hard disk', 1]
          ] : [
            ['Microphone', 0],
            ['DVD-ROM', 1],
            ['HDTV', 4],
            ['Intranet', 2],
            ['Tactile sensors', 0],
            ['DSP hardware', 3],
            ['Colour printer', 4],
            ['Hard disk', 1]
          ]} />
        `),

        // 21 · data: text and graphics
        page(html`
          <${H1}>${t('Five kinds of data', 'خمس أنواع data')}</${H1}>
          <div className="hf-mm1-media hf-in">${(A ? [['الـ Text', 'مش temporal'], ['الـ Graphics', 'الـ primitives'], ['الـ Images', 'الـ bitmap'], ['الـ Audio', 'متصل'], ['الـ Video', 'الـ frames']]
            : [['Text', 'not temporal'], ['Graphics', 'primitives'], ['Images', 'bitmap'], ['Audio', 'continuous'], ['Video', 'frames']]).map(([n, s], j) => html`<div key=${j} className=${j >= 3 ? 't' : ''}>${n}<small>${s}</small></div>`)}</div>
          <${H3}>${t('Text (static data)', 'الـ Text (static data)')}</${H3}>
          <${P} small=${true}>${X('From the keyboard, speech input, OCR or disk; stored <b>character by character</b>, <b>1 byte per character</b> (more for Unicode). Formats: raw text, HTML, RTF, Word, program source. <b>Not temporal</b>, but it may have a natural implied sequence (HTML, C statements). Size is not significant.',
            'بييجي من الـ keyboard أو الـ speech input أو الـ OCR أو الـ disk؛ وبيتخزن <b>حرف حرف</b>، <b><bdi dir="ltr">1 byte</bdi> لكل حرف</b> (أكتر في الـ Unicode). والـ formats هي الـ raw text والـ HTML والـ RTF والـ Word والـ program source. <b>مش temporal</b>، بس ممكن يبقى ليه sequence ضمني (الـ HTML أو statements الـ C). والحجم مش مهم.')}</${P}>
          <${H3}>${t('Graphics', 'الـ Graphics')}</${H3}>
          <${P} small=${true}>${X('Built from <b>primitive objects</b>: lines, polygons, circles, curves, arcs. Made in graphics editors (Illustrator) or by programs (PostScript). Usually <b>editable</b>, unlike images. Standards: <b>OpenGL, PHIGS, GKS</b>. Input: keyboard, mouse, trackball or graphics tablet. Files store only the primitive assembly, so storage is <b>small</b>.',
            'متبنية من <b>primitive objects</b>: الـ lines والـ polygons والـ circles والـ curves والـ arcs. بتتعمل في graphics editors (Illustrator) أو ببرامج (PostScript). وغالبًا <b>ينفع تتعدل</b>، عكس الـ images. والـ standards هي <b>OpenGL وPHIGS وGKS</b>. والـ input بالـ keyboard أو الـ mouse أو الـ trackball أو الـ graphics tablet. والملف بيخزن تجميعة الـ primitives بس، فالـ storage <b>صغير</b>.')}</${P}>
        `, { sec: t('Multimedia data', 'الـ Multimedia data') }),

        // 22 · fireside: graphics vs image
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Graphics and an Image, on what a picture is made of.", 'حوار الليلة: الـ Graphics والـ Image، الصورة متعملة من إيه.')} />
          <${Chat} names=${A ? ['الـ Graphics', 'الـ Image'] : ['Graphics', 'Image']} lines=${A ? [
            [0, 'أنا متبني من primitives: خطوط وpolygons ودواير وcurves وarcs.'],
            [1, 'وأنا bitmap: grid من الـ pixels، وخلاص.'],
            [0, 'وأنا ينفع أتعدّل. حرّك خط، كبّر دايرة. إنت متقدرش.'],
            [1, 'بس أنا جاية على طول من الـ digital camera أو الـ scanner.'],
            [0, 'وملفي بيخزن تجميعة الـ primitives بس، فأنا صغير.'],
            [1, 'ماشي، أنا كبيرة: الـ <bdi dir="ltr">512 × 512</bdi> true colour بتاخد <bdi dir="ltr">3/4 MB</bdi>.'],
            [0, 'وعشان كده عليكي الـ compression على طول.'],
            [1, 'صح، الـ compression بيتعمل عليّا عادةً. ومن غيره صورة الـ <bdi dir="ltr">10 MP</bdi> حوالي <bdi dir="ltr">29 MB</bdi>!']
          ] : [
            [0, "I'm built from primitives: lines, polygons, circles, curves, arcs."],
            [1, "I'm a bitmap: a grid of pixels. That's all."],
            [0, 'And I can be edited. Move a line, resize a circle. You can\'t.'],
            [1, 'But I come straight from a digital camera or a scanner.'],
            [0, 'My file only stores how my primitives are assembled. I\'m small.'],
            [1, 'Fine, I\'m big. 512 × 512 in true colour is 3/4 MB.'],
            [0, 'Which is why they keep compressing you.'],
            [1, 'True, compression is commonly applied to me. Without it a 10 MP photo is about 29 MB!']
          ]} />
          <${Grow} />
          <${Hand}>${t("the chat is ours; every fact in it is the slides'", 'الحوار من عندنا، بس كل معلومة فيه من السلايدز')}</${Hand}>
        `),

        // 23 · images
        page(html`
          <${H2}>${t('Images: bits per pixel', 'الـ Images: كام bit لكل pixel')}</${H2}>
          <${P} small=${true}>${X('An image is a still picture stored (uncompressed) as a <b>bitmap</b>, a grid of pixels. Input: digitally scanned photos or a digital camera. Each pixel takes:', 'الـ image صورة ثابتة بتتخزن (من غير compression) كـ <b>bitmap</b>، يعني grid من الـ pixels. والـ input من صور متعملها scan أو من digital camera. وكل pixel بياخد:')}</${P}>
          <div className="hf-mm1-bits hf-in">
            ${[[1, '1 bit', 'black and white', 'أبيض وأسود'], [8, '8 bits', 'grey scale, colour map', 'grey scale أو colour map'], [24, '24 bits', 'true colour', 'الـ true colour']].map(([k, b, en, a]) => html`<div key=${k}><${Pixels} kind=${k} /><b dir="ltr">${b}</b>${A ? a : en}</div>`)}
          </div>
          <${P} small=${true}>${X('So <b>size = pixels × bits per pixel ÷ 8</b> bytes. A 512 × 512 grey scale image is <b>1/4 MB</b>; in 24-bit colour it is <b>3/4 MB</b>, with no compression.',
            'يبقى <b>الحجم = عدد الـ pixels × الـ bits لكل pixel ÷ 8</b> بالـ bytes. صورة grey scale مقاس <bdi dir="ltr">512 × 512</bdi> حجمها <b><bdi dir="ltr">1/4 MB</bdi></b>؛ ولو <bdi dir="ltr">24-bit</bdi> colour تبقى <b><bdi dir="ltr">3/4 MB</bdi></b>، من غير compression.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The overhead soon increases with image size: a modern 10+ megapixel camera gives about <b>29 MB</b> uncompressed. So <b>compression is commonly applied</b>.',
            'الحجم بيكبر بسرعة مع حجم الصورة: كاميرا حديثة <bdi dir="ltr">10+ megapixels</bdi> بتدّي حوالي <b><bdi dir="ltr">29 MB</bdi></b> من غير compression. وعشان كده <b>الـ compression بيتعمل عادةً</b>.')}</p></${Box}>
        `),

        // 24 · audio and video
        page(html`
          <${H2}>${t('Audio and video: data in time', 'الـ Audio والـ video: data ماشية مع الوقت')}</${H2}>
          <${P} small=${true}>${X('<b>Audio</b> is a continuous analog signal from a microphone, then digitised. <b>CD quality = 16-bit sampling at 44.1 kHz</b>; audiophile is higher, e.g. 24-bit, 96 kHz. Usually compressed (MP3, AAC, FLAC, Ogg Vorbis).',
            'الـ <b>Audio</b> إشارة analog متصلة من الـ microphone، وبعدين بتتحول digital. <b>الـ CD quality معناها <bdi dir="ltr">16-bit</bdi> sampling عند <bdi dir="ltr">44.1 kHz</bdi></b>؛ والـ audiophile أعلى، زي <bdi dir="ltr">24-bit</bdi> و<bdi dir="ltr">96 kHz</bdi>. وغالبًا بيتعمله compression (زي MP3 وAAC وFLAC وOgg Vorbis).')}</${P}>
          <${K.Code} lines=${[['44,100 × 2 B × 60 s', t('mono', 'الـ mono')], ['= 5,292,000 B ≈ 5 MB / min', ''], ['× 2 channels ≈ 10 MB / min', t('stereo', 'الـ stereo')]]} />
          <${P} small=${true}>${X('<b>Video</b> is a series of single images, typically <b>25, 30 or 50 frames per second</b>. Analog video is captured by a video camera and then digitised.',
            'الـ <b>Video</b> سلسلة صور منفصلة، عادةً <b>25 أو 30 أو 50 frame في الثانية</b>. والـ analog video بيتصوّر بـ video camera وبعدين بيتعمله digitise.')}</${P}>
          <${K.Code} lines=${['512×512 mono: 25 × 0.25 = 6.25 MB/s', 'PAL 720×576: ≈ 1.24 × 25 = 31 MB/s', 'HD 1920×1080: ≈ 6.2 × 25 = 155 MB/s']} />
          <${Hand} red=${true}>${t('HD on Blu-ray: 1920 × 1080 ≈ 2 megapixels per frame', 'الـ HD على Blu-ray فيه حوالي 2 megapixels في كل frame')}</${Hand}>
        `),
        page(html`
          <${H2}>${t('One second of video, frame by frame (slide 25)', 'ثانية video واحدة، frame ورا frame (سلايد 25)')}</${H2}>
          <${Fig} name="mm-frames" />
        `),

        // 26 · the size ladder
        page(html`
          <${H1}>${t('The size ladder (uncompressed)', 'سلّم الأحجام (من غير compression)')}</${H1}>
          <${Ladder} />
          <${Hand} red=${true}>${t('one second of HD video ≈ 15 minutes of stereo CD audio', 'ثانية HD واحدة قد ربع ساعة صوت CD تقريبًا')}</${Hand}>
          <${Grow} />
          <${Box} kind="watch" title=${t('‡ Watch it: two kinds of megabyte', '‡ خلّي بالك: نوعين megabyte')}><p className="hf-p small">${X('‡ The slides switch units: images and audio use 1 MB = 1024 × 1024 B, PAL and HD use 1 MB = 1,000,000 B (with 1024 × 1024: ≈ 29.7 and ≈ 148 MB). Either way, huge.',
            '‡ السلايدز بتغيّر الوحدة. الصور والـ audio محسوبين على:<span class="ltr">1 MB = 1024 × 1024 B</span>والـ PAL والـ HD محسوبين على:<span class="ltr">1 MB = 1,000,000 B</span>(بالـ 1024 يطلعوا حوالي 29.7 و148).')}</p></${Box}>
        `, { sec: t('How big is the data?', 'الـ data حجمها قد إيه؟') }),

        // 27 · size drill
        page(html`
          <${Box} kind="pencil" title=${t('Size it up', 'احسب الحجم')}><p className="hf-p small">${X('Type each uncompressed size in <b>MB</b>. Fractions like <code>3/4</code> are fine; either kind of megabyte counts.', 'اكتب كل حجم من غير compression بالـ <b>MB</b>. ينفع كسر زي <code>3/4</code>، وأي نوع megabyte محسوب.')}</p></${Box}>
          <${Drill} id="drill" />
        `),
        page(html`
          <${H2}>${t('Play with the numbers (slides 23–25)', 'العب بالأرقام (سلايدز 23–25)')}</${H2}>
          <${Fig} name="mm-data-size" />
        `),

        // 29 · compression: three routes
        page(html`
          <${H1}>${t('So: compress it', 'الحل: اعمله compression')}</${H1}>
          <${P} small=${true}>${t('The course is essentially about compression. Three routes:', 'الكورس في الأساس عن الـ compression. وليه تلات طرق:')}</${P}>
          <div className="hf-mm1-three hf-in">
            <div><b>${t('Lossless', 'الـ Lossless')}</b>${X('Ideal, but <b>not good enough for MM data</b>: it does not reduce the size enough.', 'مثالي، بس <b>مش كفاية للـ MM data</b>: مش بيصغّر الحجم كفاية.')} <i dir="ltr">zip, unix compress</i></div>
            <div><b>${t('Lossy', 'الـ Lossy')}</b>${X('Throw away non-essential (<b>perceptually less relevant</b>) parts of the data stream: <b>filter</b> the data somehow.', 'بنرمي الأجزاء اللي مش أساسية (<b>الأقل أهمية للإدراك</b>) من الـ data stream: يعني بنعمل <b>filter</b> للـ data.')} <i dir="ltr">MP3, JPEG, MPEG video/audio</i></div>
            <div><b>${t('Compression via synthesis', 'الـ Compression via synthesis')}</b>${X('Encode <b>how to make (synthesise)</b> the data, which can take far fewer bits in certain cases.', 'بنعمل encode لـ <b>طريقة صناعة</b> الـ data (synthesise)، وده ممكن ياخد bits أقل بكتير في حالات معينة.')} <i dir="ltr">vector graphics (Flash), MPEG video, MP4 (audio), MIDI</i></div>
          </div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<b>MPEG video</b> is on two of these lists, lossy and synthesis. Lossy or lossless? MPEG is <b>lossy</b>.',
            'الـ <b>MPEG video</b> موجود في قايمتين، الـ lossy والـ synthesis. ولو اتسألت lossy ولا lossless؟ الـ MPEG <b>lossy</b>.')}</p></${Box}>
        `, { sec: t('Compression', 'الـ Compression') }),
        page(html`
          <${H2}>${t('Lossless v lossy, step by step (slide 26)', 'الـ lossless قصاد الـ lossy، خطوة بخطوة (سلايد 26)')}</${H2}>
          <${Fig} name="mm-lossy-lossless" />
        `),

        // 31 · interview
        page(html`
          <${Interview} title=${t('Lossy Compression, exposed', 'الـ Lossy Compression على الكرسي')} sub=${t('This week our interview: why throw data away?', 'حوار الأسبوع: ليه بترمي data؟')} lines=${A ? [
            ['هيد فيرست', 'إنت بترمي data. ده مش جريمة؟'],
            ['الـ Lossy', 'بارمي الأجزاء اللي مش أساسية بس، الأقل أهمية للإدراك. يعني بعمل filter للـ data.'],
            ['هيد فيرست', 'ما تستخدم الـ lossless زي الـ zip وخلاص؟'],
            ['الـ Lossy', 'الـ zip مثالي، بس على الـ MM data مش بيصغّر كفاية. وإنت لسه شايف سلّم الأحجام.'],
            ['هيد فيرست', 'والتمن؟'],
            ['الـ Lossy', 'شوية error وجودة أقل، قصاد compression أعلى. والـ lossless بالعكس: zero error وجودة عالية وcompression قليل.'],
            ['هيد فيرست', 'الناس بتقابلك فين؟'],
            ['الـ Lossy', 'في الـ MP3 والـ JPEG والـ MPEG. وYouTube بيستخدمني.'],
            ['هيد فيرست', 'فيه حد بيضايقك؟'],
            ['الـ Lossy', 'الـ synthesis. ده مش بيخزّن الـ data أصلًا، بيخزّن إزاي تتعمل، زي الـ MIDI.']
          ] : [
            ['Head First', 'You throw data away. Isn\'t that a crime?'],
            ['Lossy', 'Only the non-essential parts, the perceptually less relevant ones. I filter the data.'],
            ['Head First', 'Why not just use lossless, like zip?'],
            ['Lossy', 'Zip is ideal, but on MM data it does not reduce the size enough. You just saw the size ladder.'],
            ['Head First', 'What does it cost?'],
            ['Lossy', 'Some error and lower quality, for higher compression. Lossless is the opposite: zero error, high quality, low compression.'],
            ['Head First', 'Where do people meet you?'],
            ['Lossy', 'MP3, JPEG, MPEG video and audio. YouTube uses me.'],
            ['Head First', 'Any rivals?'],
            ['Lossy', 'Synthesis. He doesn\'t store the data at all, only how to make it. MIDI, for one.']
          ]} />
        `),

        // 32 · synthesis
        page(html`
          <${H2}>${t('Store the sound, or how to make it? (slide 27: MIDI keyboards)', 'تخزّن الصوت، ولا إزاي يتعمل؟ (سلايد 27: الـ MIDI keyboards)')}</${H2}>
          <${Fig} name="mm-synthesis" />
        `),

        // 33 · sort compression
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Lossless (<b>LL</b>), lossy (<b>LY</b>) or compression via synthesis (<b>SY</b>)? Use the slides\' own examples.', 'ده lossless (<b>LL</b>)، ولا lossy (<b>LY</b>)، ولا compression via synthesis (<b>SY</b>)؟ امشي على أمثلة السلايدز.')}</p></${Box}>
          <${Sort} id="cmp" bins=${[['LL', t('Lossless', 'الـ lossless')], ['LY', t('Lossy', 'الـ lossy')], ['SY', t('Synthesis', 'الـ synthesis')]]} items=${A ? [
            ['الـ zip', 0],
            ['الـ MP3', 1],
            ['الـ MIDI', 2],
            ['الـ unix compress', 0],
            ['الـ JPEG', 1],
            ['الـ vector graphics (Flash)', 2],
            ['بيرمي الأجزاء الأقل أهمية للإدراك', 1],
            ['فيه zero error بس compression قليل', 0],
            ['بيعمل encode لطريقة صناعة الـ data', 2]
          ] : [
            ['zip', 0],
            ['MP3', 1],
            ['MIDI', 2],
            ['unix compress', 0],
            ['JPEG', 1],
            ['Vector graphics (Flash)', 2],
            ['Throws away perceptually less relevant parts', 1],
            ['Zero error, but low compression', 0],
            ['Encodes how to make the data', 2]
          ]} />
        `),

        // exam corner: one question a page, so the explanation has room
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${t("Real questions from the past papers and this year's midterm. Tap an answer to see why it's right or wrong.", 'أسئلة حقيقية من الامتحانات اللي فاتت وميدترم السنة دي. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('x1', /Not A Multimedia Component/)}
          <${Grow} />
          <${Hand} red=${true}>${t('a spreadsheet is a kind of file or program, not a medium', 'الـ spreadsheet نوع ملف أو برنامج، مش medium')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('x2', /Device Is Used To Capture Video/)}
          <${Grow} />
          <${Talk} who="cam">${t('Capture devices: me (the video camera), the microphone, tablets, sensors… A printer and a scanner? Not for video.', 'أجهزة الـ capture: أنا (الـ video camera) والـ microphone والـ tablets والـ sensors… الـ printer والـ scanner؟ مش للـ video.')}</${Talk}>
        `),
        page(html`
          ${mq('x3', /Example Of A Multimedia Application/)}
          <${Grow} />
          <${Hand} red=${true}>${t('video conferencing is on the "Applications" slide, with groupware and home shopping', 'الـ video conferencing موجود في سلايد الـ Applications، مع الـ groupware والـ home shopping')}</${Hand}>
          <${Hand} red=${true}>${t('midterm: "reducing file size for storage or transmission" is called compression', 'في الميدترم: تقليل حجم الملف للتخزين أو الإرسال اسمه compression')}</${Hand}>
        `),
        page(html`
          ${mq('x4', /MPEG video compression is a lossless/)}
          ${mq('x5', /MP3 audio compression is a lossy/)}
          <${Grow} />
          <${Hand}>${t('lossless on the slides: zip and unix compress. Lossy: MP3, JPEG, MPEG.', 'في السلايدز: الـ lossless زي الـ zip، والـ lossy زي MP3 وJPEG وMPEG.')}</${Hand}>
        `),

        // 38 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'كلمة <b>Multi</b> يعني كتير: الـ multimedia هي <b>integration بيتحكم فيه الكمبيوتر</b> بين media كتير digital.',
            'الـ <b>hypertext</b> فيه links لنصوص تانية (Ted Nelson، حوالي 1965)، وبيتقري <b>non-linear</b>.',
            'الـ <b>hypermedia</b> مش text بس: فيه graphics وimages وصوت وvideo. والـ <b>WWW</b> هو المثال الواضح.',
            'الـ multimedia system ليه <b>4 خصائص</b>: computer controlled وintegrated وdigital وinteractive.',
            'الـ challenges: الـ distributed networks والـ temporal relationship (زي الـ <b>lip sync</b>)؛ والـ compression <b>غالبًا إجباري</b>.',
            'الـ images بـ 1 أو 8 أو 24 bit لكل pixel؛ والـ CD audio <bdi dir="ltr">16-bit</bdi> عند <bdi dir="ltr">44.1 kHz</bdi>؛ والـ video بـ 25 أو 30 أو 50 fps.',
            'الـ <b>lossless</b> (zip) مش كفاية؛ والـ <b>lossy</b> (MP3 وJPEG وMPEG) بيرمي الأقل أهمية؛ والـ <b>synthesis</b> (MIDI) بيخزّن طريقة العمل.'
          ] : [
            '<b>Multi</b> = many. Multimedia is the <b>computer-controlled integration</b> of many media, all digital.',
            '<b>Hypertext</b>: text with links to other texts (Ted Nelson, about 1965), read <b>non-linearly</b> via hot spots.',
            '<b>Hypermedia</b> is not text-only: graphics, images, sound and video. The <b>WWW</b> is the clear example.',
            'A multimedia system has <b>4 characteristics</b>: computer controlled, integrated, digital, interactive.',
            'Challenges: distributed networks and the temporal relationship (incl. <b>lip sync</b>); compression is <b>usually mandatory</b>.',
            'Images: 1, 8 or 24 bits/pixel. CD audio: 16-bit at 44.1 kHz. Video: 25, 30 or 50 fps.',
            '<b>Lossless</b> (zip) is not enough; <b>lossy</b> (MP3, JPEG, MPEG) drops the less relevant; <b>synthesis</b> (MIDI) stores how to make it.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 39 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 1!', 'خلّصت الفصل الأول!')}</${H1}>
            <${Talk} who="mic">${X('Next time: signals, <b>filters</b> and the <b>Fourier transform</b>!', 'المرة الجاية: الـ signals والـ <b>filters</b> والـ <b>Fourier transform</b>!')}</${Talk}>
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

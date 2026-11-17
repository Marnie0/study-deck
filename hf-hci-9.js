// Head First chapter for Human Computer Interaction Lecture 9 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Fidelity, Brainstorming, Wireframes and Forms (last year's slides): the four audiences of prototypes, fidelity (lo-fi vs hi-fi)
// and the power of lo-fi (Konstan, Google), what design activities are for, brainstorming by Joyner's tips (individual first,
// aim for 20, judge nothing), why study design, the handoff and handshake processes, wireframes (definition, purposes, when,
// standards, process, tools; the lecture's dog-walking example) and the form design guidelines (buttons vs links, breadcrumbs
// vs progress bars, confirmation page, errors next to the field, space, hints, remembered preferences, primary vs secondary CTA).
// Every fact comes from the lecture's notes; analogies and the exercise scenarios are marked as ours / illustrative.
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K; const { useState } = React; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T9 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-hci9')) {
    const s = document.createElement('style'); s.id = 'hf-css-hci9';
    s.textContent = `
.hfb .hf-hci9-aud{ display:grid; grid-template-columns:1fr 1fr; gap:7px; }
.hfb .hf-hci9-aud > div{ border:2px solid var(--hf-line); border-radius:8px; padding:7px 9px; background:var(--paper); display:flex; align-items:center; gap:8px; font:700 15px/1.2 var(--body); color:var(--ink); }
.hfb .hf-hci9-aud > div:nth-child(odd){ background:color-mix(in srgb, var(--hf-k) 12%, var(--paper)); }
.hfb .hf-hci9-aud i{ flex:none; font:800 24px/1 var(--body); font-style:normal; color:var(--hf-k); }
.hfb .hf-hci9-venn{ position:relative; height:176px; }
.hfb .hf-hci9-venn .c{ position:absolute; top:0; width:188px; height:176px; border-radius:50%; border:2.5px solid var(--hf-line); display:flex; align-items:center; box-sizing:border-box; font:600 13.5px/1.28 var(--body); color:var(--ink); }
.hfb .hf-hci9-venn .c.a{ left:0; padding:0 66px 0 20px; background:color-mix(in srgb, var(--hf-k) 14%, transparent); }
.hfb .hf-hci9-venn .c.b{ right:0; padding:0 18px 0 66px; background:color-mix(in srgb, var(--hf-hand) 12%, transparent); }
.hfb .hf-hci9-venn .both{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); font:800 14px/1.1 var(--body); background:var(--paper); border:2px solid var(--hf-line); border-radius:999px; padding:5px 8px; color:var(--ink); white-space:nowrap; }
.hfb .hf-hci9-phone{ width:236px; margin:0 auto; border:2.5px solid var(--hf-line); border-radius:18px; padding:9px 8px 10px; display:grid; gap:3px; background:var(--paper); }
.hfb .hf-hci9-el{ position:relative; display:block; width:100%; border:2px dashed transparent; border-radius:6px; background:none; padding:3px; cursor:pointer; color:var(--ink); text-align:left; font:inherit; }
.hfb .hf-hci9-el.sel{ border-color:var(--hf-hand); }
.hfb .hf-hci9-el.ok{ border:2px solid var(--ok); } .hfb .hf-hci9-el.no{ border:2px solid var(--hf-red); } .hfb .hf-hci9-el.miss{ border:2px dashed var(--hf-red); }
.hfb .hf-hci9-w{ border:1.5px solid var(--hf-line); border-radius:4px; display:flex; align-items:center; justify-content:space-between; padding:3px 7px; font:600 13px/1.2 var(--body); }
.hfb .hf-hci9-fancy{ display:block; font:italic 700 23px/1.1 "Caveat", cursive; color:#E8590C; padding:1px 2px; }
.hfb .hf-hci9-lines{ display:grid; gap:5px; padding:3px 2px; }
.hfb .hf-hci9-lines i{ display:block; height:5px; border-radius:3px; background:color-mix(in srgb, var(--graphite) 55%, transparent); }
.hfb .hf-hci9-row{ display:flex; gap:7px; align-items:center; }
.hfb .hf-hci9-row .hf-hci9-lines{ flex:1; }
.hfb .hf-hci9-ctas{ display:grid; grid-template-columns:1fr 1fr; gap:4px; }
.hfb .hf-hci9-btnw{ border:1.5px solid var(--hf-line); border-radius:5px; text-align:center; font:600 13px/1 var(--body); padding:7px 2px; }
.hfb .hf-hci9-grad{ border-radius:5px; text-align:center; font:700 13px/1 var(--body); padding:8px 2px; color:#fff; background:linear-gradient(90deg,#15803D,#0EA5E9); }
.hfb .hf-hci9-why{ position:absolute; right:3px; bottom:2px; font:700 13px/1.15 var(--body); color:var(--hf-red); background:var(--paper); border:1.5px solid var(--hf-red); border-radius:5px; padding:1px 5px; pointer-events:none; }
.hfb .hf-hci9-ord{ display:grid; gap:6px; }
.hfb .hf-hci9-ord button{ display:flex; align-items:center; gap:8px; text-align:start; font:500 14px/1.28 var(--body); padding:7px 9px; min-height:44px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hci9-ord button i{ flex:none; display:inline-grid; place-items:center; width:25px; height:25px; border-radius:50%; font:800 13px/1 var(--body); font-style:normal; background:var(--hf-grey2); color:var(--ink); }
.hfb .hf-hci9-ord button.on i{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-hci9-ord button.ok{ border-color:var(--ok); } .hfb .hf-hci9-ord button.no{ border-color:var(--hf-red); }
.hfb .hf-hci9-chips{ display:flex; flex-wrap:wrap; gap:6px; }
.hfb .hf-hci9-chips span{ font:700 14px/1.2 var(--body); border:1.5px solid var(--hf-line); border-radius:999px; padding:5px 10px; background:var(--paper); color:var(--ink); }
.hfb .hf-hci9-chips span:nth-child(odd){ background:color-mix(in srgb, var(--hf-k) 12%, var(--paper)); }
.hfb .hf-hci9-num{ display:grid; gap:6px; }
.hfb .hf-hci9-num > div{ display:grid; grid-template-columns:28px 1fr; gap:8px; align-items:start; font-size:14.5px; line-height:1.34; color:var(--ink); }
.hfb .hf-hci9-num > div > b:first-child{ display:grid; place-items:center; width:26px; height:26px; border-radius:50%; background:var(--hf-line); color:var(--paper); font:800 13.5px/1 var(--body); }
.hfb .hf-hci9-num b{ font-weight:600; }
.hfb .hf-hci9-flags .hf-sort .it{ font-size:14px; }
.hf-ar .hf-hci9-aud > div, .hf-ar .hf-hci9-venn .c, .hf-ar .hf-hci9-venn .both, .hf-ar .hf-hci9-ord button, .hf-ar .hf-hci9-num > div, .hf-ar .hf-hci9-why{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hf-ar .hf-hci9-venn .c{ font-size:13px; line-height:1.45; }
.hf-ar .hf-hci9-ord button, .hf-ar .hf-hci9-num > div{ font-size:14px; line-height:1.5; }
.hf-ar .hf-hci9-why{ left:3px; right:auto; }
`;
    document.head.appendChild(s);
  }

  // Spot the standard-breakers: a dog-walking wireframe with three parts that break the wireframing standards (our drawing)
  const SPOT = ['head', 'title', 'txt', 'photo', 'row', 'cta1', 'cta2'];
  const BAD = { title: ['no font styles, no colors', 'من غير font styles ولا ألوان'], photo: ['image = box with an X', 'الصورة مربع فيه X'], cta2: ['no colors', 'من غير ألوان'] };
  function Spot() {
    const ar = useAr();
    const [sel, setSel] = H.K.useSlot('spot', []);
    const [c, setC] = H.K.useSlot('spot:c', false);
    const tap = k => { setC(false); setSel(sel.indexOf(k) >= 0 ? sel.filter(x => x !== k) : sel.concat(k)); };
    const found = sel.filter(k => BAD[k]).length, wrong = sel.filter(k => !BAD[k]).length;
    const cls = k => { const on = sel.indexOf(k) >= 0; if (!c) return on ? ' sel' : ''; if (BAD[k]) return on ? ' ok' : ' miss'; return on ? ' no' : ''; };
    const el = (k, kids, label) => html`<button className=${'hf-hci9-el' + cls(k)} aria-pressed=${String(sel.indexOf(k) >= 0)} aria-label=${label} onClick=${() => tap(k)}>${kids}
      ${c && BAD[k] && html`<span className="hf-hci9-why" dir=${ar ? 'rtl' : 'ltr'}>${ar ? BAD[k][1] : BAD[k][0]}</span>`}</button>`;
    return html`<div className="hf-in">
      <div className="hf-hci9-phone" dir="ltr" role="group" aria-label="A wireframe of a dog-walking app screen">
        ${el('head', html`<div className="hf-hci9-w"><span>☰</span><span>Title</span><span>○</span></div>`, 'Header bar')}
        ${el('title', html`<span className="hf-hci9-fancy">Walk your dog!</span>`, 'Heading')}
        ${el('txt', html`<div className="hf-hci9-lines"><i style=${{ width: '92%' }}></i><i style=${{ width: '70%' }}></i></div>`, 'Text')}
        ${el('photo', html`<svg viewBox="0 0 200 52" width="100%" height="52" preserveAspectRatio="none" aria-hidden="true" style=${{ display: 'block', borderRadius: '4px' }}><rect width="200" height="52" fill="#7DC3F7"/><circle cx="165" cy="15" r="9" fill="#FFC94D"/><path d="M0 52 C40 22 80 26 120 40 S180 30 200 34 V52 Z" fill="#43A047"/><path d="M50 40 h24 v-7 h6 l4 -5 v12 h-2 v8 h-4 v-6 h-22 v6 h-4 z" fill="#6D4C41"/></svg>`, 'Picture')}
        ${el('row', html`<div className="hf-hci9-row"><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M6 6l20 20M26 6L6 26" stroke="currentColor" strokeWidth="1.4"/></svg><div className="hf-hci9-lines"><i style=${{ width: '80%' }}></i><i style=${{ width: '55%' }}></i></div></div>`, 'Walker row')}
        <div className="hf-hci9-ctas">
          ${el('cta1', html`<div className="hf-hci9-btnw">Book a walk</div>`, 'Book a walk button')}
          ${el('cta2', html`<div className="hf-hci9-grad">Pay now</div>`, 'Pay now button')}
        </div>
      </div>
      <div className="hf-row" style=${{ marginTop: '8px', justifyContent: 'center' }}>
        <button className="hf-btn solid" disabled=${!sel.length} onClick=${() => setC(true)}>${ar ? 'صحّح' : 'Check'}</button>
        <button className="hf-btn" onClick=${() => { setSel(SPOT.filter(k => BAD[k])); setC(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${c && html`<span className="hf-score">${ar ? html`<bdi>${found} / 3</bdi> اتمسكوا${wrong ? html`، و<bdi>${wrong}</bdi> سليمة اتعلّمت غلط` : ''}` : found + ' / 3 found' + (wrong ? ', ' + wrong + ' fine part' + (wrong > 1 ? 's' : '') + ' flagged' : '')}</span>`}
      </div></div>`;
  }

  // Put the wireframing process in order: tap the steps first to last
  const ORD = [
    ['Start with <b>pen and paper</b>: reach a design, don\'t show one', 'ابدأ بـ <b>ورقة وقلم</b>: توصل لـ design، مش تعرض واحد'],
    ['Sketch <b>at least 5 versions</b> of each screen', 'ارسم <b>5 versions على الأقل</b> لكل شاشة'],
    ['Go through <b>iterations with feedback</b>', 'اعمل <b>iterations بالـ feedback</b>'],
    ['Move to <b>tools</b>: Figma, Adobe XD, Sketch, Balsamiq, Pencil', 'انقل للـ <b>tools</b> زي Figma و Balsamiq']
  ];
  const SH = [2, 0, 3, 1];
  function Order() {
    const ar = useAr();
    const [seq, setSeq] = H.K.useSlot('ord', []);
    const [c, setC] = H.K.useSlot('ord:c', false);
    const tap = j => { setC(false); const at = seq.indexOf(j); setSeq(at >= 0 ? seq.slice(0, at) : seq.concat(j)); };
    const right = seq.filter((j, pos) => SH[j] === pos).length;
    return html`<div className="hf-in">
      <div className="hf-hci9-ord">${SH.map((st, j) => { const pos = seq.indexOf(j); const cl = (pos >= 0 ? 'on' : '') + (c && pos >= 0 ? (st === pos ? ' ok' : ' no') : '');
        return html`<button key=${j} className=${cl} onClick=${() => tap(j)} aria-pressed=${String(pos >= 0)}><i>${pos >= 0 ? pos + 1 : '?'}</i><span>${T9(ar ? ORD[st][1] : ORD[st][0])}</span></button>`; })}</div>
      <div className="hf-row" style=${{ marginTop: '8px' }}>
        <button className="hf-btn solid" disabled=${seq.length < 4} onClick=${() => setC(true)}>${ar ? 'صحّح الترتيب' : 'Check my order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq([0, 1, 2, 3].map(n => SH.indexOf(n))); setC(true); }}>${ar ? 'ورّيني الترتيب' : 'Show the order'}</button>
        ${c && html`<span className="hf-score">${ar ? html`<bdi>${right} / 4</bdi> صح` : right + ' / 4 right'}</span>`}
      </div></div>`;
  }

  H.chapters.hci[9] = {
    title: 'Fidelity, Brainstorming, Wireframes and Forms', kicker: 'Chapter 9', run: 'fidelity & wireframes',
    ar: { title: 'الـ Fidelity والـ Brainstorming والـ Wireframes والـ Forms', kicker: 'الفصل 9', run: 'الـ fidelity والـ wireframes' },
    pages(K, kit) {
      const { H1, H2, P, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 9);
      const arL = (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[9]) || {};
      const arQuiz = arL.quiz || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' own questions (quiz items with src), with the site's Arabic why for each choice; ore picks among same-worded ones by an option
      const q = (re, ore) => { const i = lec.quiz.findIndex(x => x.src && re.test(strip(x.q)) && (!ore || x.o.some(o => ore.test(strip(o[0]))))); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re, ore) => { const r = q(re, ore); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      const exam = t('Exam corner', 'ركن الامتحان');
      const li = items => html`<ul className="hf-ul" style=${{ marginTop: '2px' }}>${items.map((x, i) => html`<li key=${i} className="hf-li">${T(x)}</li>`)}</ul>`;
      const num = items => html`<div className="hf-hci9-num hf-in">${items.map((x, i) => html`<div key=${i}><b>${i + 1}</b><span>${T(x)}</span></div>`)}</div>`;

      return [
        // 0 · how this chapter works, and where we left off (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Last chapter, Joyner warned you about the two biggest mistakes: designing <b>without understanding the users or the task</b>, and settling on <b>a single idea too early</b>. You learned to explore <b>as many alternatives as you can</b>, and that a prototype is about <b>feedback and iteration</b>, not the artifact.',
            'في الفصل اللي فات Joyner حذّرك من أكبر غلطتين: إنك تصمم <b>من غير ما تفهم الـ users أو الـ task</b>، وإنك تمسك في <b>فكرة واحدة بدري أوي</b>. واتعلمت تستكشف <b>alternatives على قد ما تقدر</b>، وإن الـ prototype هدفه <b>الـ feedback والـ iteration</b>، مش الـ artifact نفسه.')}</${P}>
          <${P} small=${true}>${X('This chapter asks <i>how polished</i> a prototype should be, how to get ideas, and how to draw and design real screens and forms. Like Lectures 7 to 10, it comes from <b>last year\'s slides</b>.',
            'الفصل ده بيسأل الـ prototype يبقى <i>متشطّب قد إيه</i>، وإزاي تطلّع أفكار، وإزاي ترسم وتصمم شاشات وforms بجد. وزي محاضرات 7 لـ 10، هو من <b>سلايدز السنة اللي فاتت</b>.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises.</b> You will sort, spot, order and match right on the page.', '<b>حل التمارين.</b> هتصنّف وتمسك الغلط وترتّب وتوصّل على الصفحة نفسها.')}</span></div>
            <div className="row"><span>${K.ICON.brain}</span><span>${X('<b>Brain Power</b>: stop and think before you turn the page.', '<b>شغّل مخك</b>: وقّف فكّر شوية قبل ما تقلب الصفحة.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X("<b>Watch it!</b> boxes are exam traps, many from the doctors' own questions.", '<b>خلّي بالك!</b> دي فخاخ الامتحان، وكتير منها من أسئلة الدكاترة نفسها.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes marked "ours" are our own analogies and tricks.', 'الملاحظات بخط الإيد اللي عليها "من عندنا" تشبيهات وحيل مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Hand}>${t('Tap the page edges, swipe, or use the arrow keys to turn pages.', 'اضغط على طرف الصفحة، أو اسحب، أو استخدم الأسهم عشان تقلّب.')}</${Hand}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">9</span><span className="t">${A ? html`الفصل التاسع<br/>HCI` : html`Chapter nine<br/>HCI`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Sketch It Before You Build It', 'ارسمها قبل ما تبنيها')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('fidelity, brainstorming, wireframes and forms', 'الـ fidelity والـ brainstorming والـ wireframes والـ forms')}</p></div>
          <${Talk} who="dev">${t('I made a gorgeous, pixel-perfect prototype on day one! Colours, fonts, animations…', 'عملت prototype تحفة ومظبوط بالـ pixel من أول يوم! ألوان وfonts وanimations…')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${t('And what did the users tell you about it?', 'وطب الـ users قالولك إيه عليه؟')}</${Talk}>
          <${Talk} who="dev">${t('…that they liked the blue. Nothing else.', '…إنهم حبّوا اللون الأزرق. بس كده.')}</${Talk}>
          <${P} small=${true}>${X('By the end of this chapter you will know why that happened. You will meet <b>fidelity</b>, run a <b>brainstorm</b> by the rules, see <b>handoff vs handshake</b>, draw <b>wireframes</b> the standard way, and fix bad <b>forms</b>.',
            'في آخر الفصل ده هتعرف ده حصل ليه. هتتعرّف على الـ <b>fidelity</b>، وتعمل <b>brainstorm</b> بالقواعد، وتشوف الـ <b>handoff</b> قصاد الـ <b>handshake</b>، وترسم <b>wireframes</b> بالطريقة المظبوطة، وتصلّح <b>forms</b> وحشة.')}</${P}>
        `, { sec: t('Prototypes and fidelity', 'الـ Prototypes والـ fidelity') }),

        // 2 · four audiences
        page(html`
          <${H1}>${t('Who is a prototype for?', 'الـ prototype ده معمول لمين؟')}</${H1}>
          <${P}>${X('Prototypes are a way to <b>communicate with stakeholders</b>. The lecture names <b>four audiences</b>:', 'الـ Prototypes وسيلة إنك <b>تتواصل مع الـ stakeholders</b>. والمحاضرة بتقول إن ليها <b>4 جماهير</b>:')}</${P}>
          <div className="hf-hci9-aud hf-in">
            <div><i>1</i>${t('Colleagues', 'الزملاء (colleagues)')}</div>
            <div><i>2</i>${t('Clients', 'الـ clients')}</div>
            <div><i>3</i>${t('Users', 'الـ users')}</div>
            <div><i>4</i>${t('Yourself', 'إنت نفسك')}</div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('Why would a designer need a prototype <i>for themselves</i>? Hold that thought for a few pages.',
            'ليه الـ designer يحتاج prototype <i>لنفسه</i>؟ خلّي السؤال ده في دماغك كام صفحة.')}</p></${Box}>
          <${Box} kind="watch"><p className="hf-p small">${X('"The prototype audience list includes…" It is <b>colleagues, clients, users and yourself</b>, not "only users", not "managers", not "competitors".',
            'لو جالك "الـ audience list بتاعة الـ prototype فيها…" الإجابة <b>الزملاء والـ clients والـ users وإنت نفسك</b>، مش "الـ users بس" ولا "المديرين" ولا "المنافسين".')}</p></${Box}>
        `),

        // 3 · fidelity
        page(html`
          <${H1}>${t('Fidelity: how real does it look?', 'الـ Fidelity: شكله حقيقي قد إيه؟')}</${H1}>
          <${Def}>${X('<b>Fidelity</b> is how closely a design matches the <b>look and feel of the final product</b>.', 'الـ <b>Fidelity</b> هي الـ design قريب قد إيه من الـ <b>look and feel بتاع المنتج النهائي</b>.')}</${Def}>
          ${li(A ? ['الـ <b>Low-fidelity (lo-fi)</b>: بعيد عن الشكل النهائي، زي sketch مرسوم بالإيد.', 'الـ <b>High-fidelity (hi-fi)</b>: قريب من الـ look and feel بتاع المنتج النهائي.']
            : ['<b>Low-fidelity (lo-fi)</b>: far from the final look, like a hand-drawn sketch.', '<b>High-fidelity (hi-fi)</b>: close to the look and feel of the final product.'])}
          <${Box} kind="relax"><p className="hf-p small">${X('The rule of thumb is one line: <b>start with lo-fi, and move to hi-fi as the design proceeds.</b>', 'القاعدة في سطر واحد: <b>ابدأ بالـ lo-fi، وانقل للـ hi-fi وإنت ماشي في الـ design.</b>')}</p></${Box}>
          <${Grow} />
          <${Hand}>${t("Our analogy, not the slides': lo-fi is a house sketched on a napkin; hi-fi is the show flat.", 'تشبيه من عندنا: الـ lo-fi رسمة بيت على منديل، والـ hi-fi شقة العرض.')}</${Hand}>
        `),

        // 4 · figure: fidelity
        page(html`
          <${Fig} name="hc-fidelity" head=${t('Same screen, two fidelities: flip between them', 'نفس الشاشة بـ fidelity مختلفة: قلّب بينهم')} />
        `),

        // 5 · power of lo-fi (1)
        page(html`
          <${H1}>${t('The power of lo-fi', 'قوة الـ lo-fi')}</${H1}>
          <${P}>${X('Why start rough? The lecture gives a pile of reasons. First, the obvious ones:', 'ليه تبدأ بحاجة مش متشطّبة؟ المحاضرة بتدّي أسباب كتير. الأول، الواضحين:')}</${P}>
          <div className="hf-hci9-chips hf-in"><span>${t('faster', 'أسرع')}</span><span>${t('easier', 'أسهل')}</span><span>${t('cheaper', 'أرخص')}</span></div>
          <${P} small=${true}>${X('And <b>hi-fi is not even possible at the beginning</b>, because many details have not been decided yet.', 'وكمان الـ <b>hi-fi مش ممكن أصلًا في الأول</b>، لأن تفاصيل كتير لسه متقررتش.')}</${P}>
          <${P} small=${true}>${X('Then the surprising one: <b>people are much more willing to talk</b> when you give them a sketch than something that looks finished.', 'وبعدين السبب اللي يفاجئ: <b>الناس بتبقى مستعدة تتكلم أكتر بكتير</b> لما تديهم sketch، من لما تديهم حاجة شكلها خلصان.')}</${P}>
          <${Def}>${X('<b>Konstan</b>: a prototype that looks like <b>little effort</b> (e.g. hand-drawn) gets more <b>constructive feedback</b>.', 'بيقول <b>Konstan</b>: الـ prototype اللي باين إنه معمول بـ <b>مجهود قليل</b> (زي مرسوم بالإيد) بياخد <b>constructive feedback</b> أكتر.')}</${Def}>
          <${Grow} />
          <${Talk} who="dev" think=${true}>${t('Nobody wants to tell me my polished baby is ugly…', 'محدش عايز يقولّي إن الحاجة اللي تعبت فيها وحشة…')}</${Talk}>
        `),

        // 6 · power of lo-fi (2)
        page(html`
          <${H2}>${t('Too much detail, wrong kind of feedback', 'تفاصيل كتير، feedback من النوع الغلط')}</${H2}>
          <${P}>${X('<b>Too many details</b> make people give feedback at a <b>lower level than needed</b>. Show a polished screen and they comment on the shade of blue, when you needed to know whether the whole idea works.',
            'الـ <b>تفاصيل الكتير أوي</b> بتخلّي الناس تدّي feedback في <b>مستوى أقل (lower level)</b> من المطلوب. تعرض شاشة متشطّبة، يعلّقوا على درجة اللون الأزرق، وإنت كان محتاج تعرف الفكرة كلها ماشية ولا لأ.')}</${P}>
          <${Talk} who="bug">${t('Psst. Nobody spotted me, the real problem: users cannot find the Book button. They were busy with the font.', 'بسّ. محدش خد باله مني، أنا المشكلة الحقيقية: الـ users مش لاقيين زرار الحجز. كانوا مشغولين بالـ font.')}</${Talk}>
          <${Def}>${X('<b>Google</b>: present <b>high-level ideas</b> early; focus on <b>details and screens later</b>.', 'ونصيحة <b>Google</b>: اعرض <b>أفكار high-level</b> في الأول، وركّز على <b>التفاصيل والشاشات بعدين</b>.')}</${Def}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The exam flips it: <i>"High fidelity prototypes are faster, easier and cheaper to generate than low fidelity."</i> That is <b>False</b>. Faster, easier, cheaper is <b>lo-fi</b>.',
            'الامتحان بيقلبها:<span class="ltr"><i>"High fidelity prototypes are faster, easier and cheaper to generate than low fidelity."</i></span>دي <b>False</b>. الأسرع والأسهل والأرخص هو الـ <b>lo-fi</b>.')}</p></${Box}>
        `),

        // 7 · exercise: lo-fi or hi-fi
        page(html`
          <${Box} kind="pencil" title=${t('Lo-fi or hi-fi?', 'الـ lo-fi ولا الـ hi-fi؟')}><p className="hf-p small">${X('Which kind of prototype does each line describe? Tap <b>lo</b> or <b>hi</b>.', 'كل سطر بيوصف أنهي نوع prototype؟ دوس <b>lo</b> أو <b>hi</b>.')}</p></${Box}>
          <${Sort} id="s-fid" bins=${[['lo', t('low fidelity', 'الـ low fidelity')], ['hi', t('high fidelity', 'الـ high fidelity')]]} items=${A ? [
            ['أسرع وأسهل وأرخص في إنك تعمله', 0],
            ['قريب من الـ look and feel بتاع المنتج النهائي', 1],
            ['ده اللي بتبدأ بيه', 0],
            ['مش ممكن في الأول، لأن تفاصيل كتير متقررتش', 1],
            ['الناس بتبقى مستعدة تتكلم عنه أكتر بكتير', 0],
            ['حسب Konstan: باين إنه بمجهود قليل، فبياخد constructive feedback أكتر', 0],
            ['تفاصيله كتير لدرجة إن الـ feedback بينزل لمستوى أقل من المطلوب', 1],
            ['ده مكانه بعدين، لما نركز على التفاصيل والشاشات', 1]
          ] : [
            ['Faster, easier and cheaper to make', 0],
            ['Close to the look and feel of the final product', 1],
            ['Where you start', 0],
            ['Not possible at the beginning: many details are not decided', 1],
            ['People are much more willing to talk about it', 0],
            ['Konstan: looks like little effort, so it gets more constructive feedback', 0],
            ['So detailed that feedback drops to a lower level than needed', 1],
            ['Belongs later, when you focus on details and screens', 1]
          ]} />
        `),

        // 8 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight's talk: Lo-fi Sketch and Hi-fi Prototype, over the same screen.", 'سهرة النهارده: الـ Lo-fi sketch والـ Hi-fi prototype، على نفس الشاشة.')} />
          <${Chat} names=${A ? ['الـ Lo-fi sketch', 'الـ Hi-fi prototype'] : ['Lo-fi Sketch', 'Hi-fi Prototype']} lines=${A ? [
            [0, 'أنا اترسمت في عشر دقايق. أسرع وأسهل وأرخص.'],
            [1, 'وأنا شكلي زي المنتج الحقيقي بالظبط.'],
            [0, 'وده بالظبط مشكلتك. يشوفوك، يتكلموا عن لون الزرار.'],
            [1, 'ده اهتمام بالتفاصيل!'],
            [0, 'ده feedback في مستوى أقل من المطلوب. التفاصيل الكتير بتعمل كده.'],
            [1, 'طب على الأقل أنا شكل المنتج اللي جاي.'],
            [0, 'في الأول محدش يعرف شكله. تفاصيل كتير متقررتش، فإنت مش ممكن تتعمل أصلًا.'],
            [1, 'وأنا يعني ملييش لازمة؟'],
            [0, 'ليك لازمة طبعًا. بيبدأوا بيّا، وبينقلوا ليك وهما ماشيين في الـ design.'],
            [1, 'يعني أنا الخاتمة؟ تمام.']
          ] : [
            [0, 'I was drawn in ten minutes. Faster, easier, cheaper.'],
            [1, 'And I look exactly like the real product.'],
            [0, 'That is your problem. People see you and talk about the button colour.'],
            [1, 'That is attention to detail!'],
            [0, 'That is feedback at a lower level than needed. Too many details do that.'],
            [1, 'At least I show what the product will look like.'],
            [0, 'At the start nobody knows. Many details aren\'t decided, so you can\'t even exist yet.'],
            [1, 'So I\'m useless?'],
            [0, 'Not at all. They start with me and move to you as the design proceeds.'],
            [1, 'So I\'m the finale. Fine by me.']
          ]} />
        `),

        // 9 · dumb questions on fidelity
        page(html`
          <${Dumb} qa=${A ? [
            ['يعني الـ fidelity هي عدد الشاشات اللي في الـ prototype؟', 'لأ. الـ fidelity هي الـ design قريب قد إيه من الـ <b>look and feel</b> بتاع المنتج النهائي. ممكن sketch واحد يبقى lo-fi، وشاشة واحدة متشطّبة تبقى hi-fi.'],
            ['لو الـ lo-fi بيجيب feedback أحسن، نعمل hi-fi ليه أصلًا؟', 'لأن الـ lo-fi مش بديل له. بتبدأ بالـ lo-fi و<b>بتنقل للـ hi-fi وإنت ماشي في الـ design</b>، لما التفاصيل تتقرر. ونصيحة Google: التفاصيل والشاشات بعدين، مش أبدًا.'],
            ['هو Konstan قال إن الـ hand-drawn أحلى؟', 'لأ. قال إن الـ prototype اللي <b>باين إنه بمجهود قليل</b> بياخد <b>constructive feedback</b> أكتر. الكلام عن الـ feedback، مش عن الشكل.']
          ] : [
            ['So fidelity is the number of screens in the prototype?', 'No. Fidelity is how closely the design matches the <b>look and feel</b> of the final product. One rough sketch is lo-fi; one polished screen is hi-fi.'],
            ['If lo-fi gets better feedback, why make hi-fi at all?', 'Lo-fi doesn\'t replace it. You start lo-fi and <b>move to hi-fi as the design proceeds</b>, once details are decided. Google: details and screens <i>later</i>, not never.'],
            ['Did Konstan say hand-drawn looks nicer?', 'No. He said a prototype that <b>looks like little effort</b> gets more <b>constructive feedback</b>. It\'s about feedback, not beauty.']
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('"Adding many details makes people give HIGHER-level feedback" is the trap version: it is LOWER.', 'فخ: "التفاصيل الكتير بتخلي الـ feedback في مستوى أعلى". الصح إنه بيبقى في مستوى أقل.')}</${Hand}>
        `),

        // 10 · design activities
        page(html`
          <${H1}>${t('What is a design activity for?', 'الـ design activity بتعمل إيه؟')}</${H1}>
          <${P} small=${true}>${X('Sketching, prototyping, brainstorming, wireframing… The lecture says every design activity does one of two jobs, <b>or both</b>:', 'الـ sketching والـ prototyping والـ brainstorming والـ wireframing… المحاضرة بتقول إن كل design activity بتعمل شغلانة من اتنين، <b>أو الاتنين</b>:')}</${P}>
          <div className="hf-hci9-venn hf-in">
            <div className="c a">${t('helps the designer think and visualize', 'بتساعد الـ designer يفكر ويتخيل')}</div>
            <div className="c b">${t('helps team members and stakeholders visualize and communicate', 'بتساعد الفريق والـ stakeholders يتخيلوا ويتواصلوا')}</div>
            <span className="both">${t('or both', 'أو الاتنين')}</span>
          </div>
          <${Talk} who="lens" flip=${true}>${X('So that is why <b>"yourself"</b> is on the audience list: a prototype also helps <i>you</i> think.', 'وعشان كده <b>"إنت نفسك"</b> في قايمة الجماهير: الـ prototype بيساعدك <i>إنت</i> كمان تفكر.')}</${Talk}>
          <${Grow} />
          <${Hand}>${t("Our trick, not the slides': ask \"for my head, the team, or both?\"", 'حيلة من عندنا: اسأل "دي لدماغي، ولا للفريق، ولا للاتنين؟"')}</${Hand}>
        `, { sec: t('Brainstorming', 'الـ Brainstorming') }),

        // 11 · brainstorming: individual first
        page(html`
          <${H1}>${t('Brainstorming: alone first', 'الـ Brainstorming: لوحدك الأول')}</${H1}>
          <${Def}>${X('<b>Brainstorming</b> aims to <b>generate a lot of ideas</b>.', 'الـ <b>Brainstorming</b> هدفه إنه <b>يطلّع أفكار كتير</b>.')}</${Def}>
          <${P}>${X('Forget the room full of people shouting ideas. <b>Joyner</b> says: <b>start with individual brainstorming</b>, because <b>groups coalesce on ideas too early</b>.',
            'انسى أوضة الناس اللي بتزعق بأفكار. <b>Joyner</b> بيقول: <b>ابدأ بـ brainstorming فردي</b>، لأن الـ <b>groups بتتجمع على أفكار بدري أوي</b>.')}</${P}>
          <${Talk} who="dev">${t('In our team, the first idea said loudly is the one we build.', 'عندنا في الفريق، أول فكرة تتقال بصوت عالي هي اللي بنعملها.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('That is <b>coalescing too early</b>: last chapter\'s <b>single idea too early</b> mistake.', 'ده اسمه <b>بتتجمعوا بدري أوي</b>، زي غلطة <b>الفكرة الواحدة</b> في الفصل اللي فات.')}</${Talk}>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('If the team session comes <i>after</i> everyone has brainstormed alone, what should happen in it? Guess, then turn the page.', 'لو الـ team session جاية <i>بعد</i> الـ brainstorming الفردي، يحصل فيها إيه؟ خمّن واقلب الصفحة.')}</p></${Box}>
        `),

        // 12 · brainstorming tips
        page(html`
          <${H2}>${t("Joyner's brainstorming tips", 'نصايح الـ brainstorming')}</${H2}>
          ${num(A ? [
            'اكتب <b>أفكار أكتر ما تقدر</b>.',
            'كل فكرة <b>كلمتين أو جملة</b>.',
            '<b>خلّي هدفك 20</b> فكرة.',
            '<b>متقيّمش ومتستبعدش</b> أي فكرة.',
            'خد <b>breaks</b> أو اعمل <b>كذا session</b>.',
            'الـ <b>team sessions</b> للمشاركة وإضافة أفكار، <b>مش للتضييق</b>.'
          ] : [
            'Write <b>as many ideas as you can</b>.',
            'Each idea is <b>a few words or a sentence</b>.',
            '<b>Aim for 20.</b>',
            '<b>Do not evaluate or exclude</b> any idea.',
            'Take <b>breaks</b> or use <b>several sessions</b>.',
            '<b>Team sessions</b> are for sharing and adding ideas, <b>not narrowing</b>.'
          ])}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"How many ideas should you aim for?" <b>20</b>. Not 5, not 3, and not "more than 100": that was the <b>first Microsoft mouse\'s prototypes</b> in last chapter.',
            'لو اتسألت "هدفك كام فكرة؟" الإجابة <b>20</b>. مش 5 ولا 3، ولا "أكتر من 100": دي كانت عدد <b>prototypes أول Microsoft mouse</b> في الفصل اللي فات.')}</p></${Box}>
        `),

        // 13 · figure: brainstorm
        page(html`
          <${Fig} name="hc-brainstorm" head=${t('Try it: brainstorm the dog-walking app', 'جرّب: اعمل brainstorm لـ app تمشية الكلاب')} />
        `),

        // 14 · exercise: brainstorm referee
        page(html`
          <div className="hf-hci9-flags">
          <${Box} kind="pencil" title=${t('Be the brainstorm referee', 'إنت حكم الـ brainstorm')}><p className="hf-p small">${X('A team brainstorms a dog-walking app (our scenes). By the rules <b>✓</b>, or breaking one <b>✗</b>?', 'فريق بيعمل brainstorm لـ app تمشية كلاب (مواقف من عندنا). ماشي بالقواعد <b>✓</b>، ولا كاسر قاعدة <b>✗</b>؟')}</p></${Box}>
          <${Gap} h=${6} />
          <${Sort} id="s-ref" bins=${[['✓', t('by the rules', 'ماشي بالقواعد')], ['✗', t('breaks a rule', 'كاسر قاعدة')]]} items=${A ? [
            ['أول يوم، الفريق كله بيقول أفكار مع بعض قبل ما حد يكتب لوحده', 1],
            ['سارة كتبت "طوق GPS بيوري طريق التمشية": جملة واحدة قصيرة', 0],
            ['علي وقف عند 6 أفكار وقال "كفاية كده"', 1],
            ['"الفكرة دي هبلة، اشطبها."', 1],
            ['وقفت عند 12 فكرة، خدت break وكمّلت في session تانية', 0],
            ['في الـ team session، كل واحد شارك لستته وزوّد أفكار جديدة', 0],
            ['الـ team session خلصت بتصويت يقلّل اللستة لأحسن 3', 1]
          ] : [
            ['On day one the whole team pitches ideas together, before anyone writes alone', 1],
            ['Sara writes "GPS collar that shows the walk route": one short sentence', 0],
            ['Ali stops at 6 ideas: "that\'s enough"', 1],
            ['"That one is silly, cross it out."', 1],
            ['Stuck at 12, she takes a break and adds more in a second session', 0],
            ['In the team session, everyone shares their list and adds new ideas', 0],
            ['The team session ends by voting the list down to the best 3', 1]
          ]} />
          </div>
        `),

        // 15 · why study design + handoff vs handshake
        page(html`
          <${H1}>${t("I'm a developer. Why study design?", 'أنا developer. أدرس design ليه؟')}</${H1}>
          ${li(A ? ['فيه طلبة <b>هيلمعوا كـ designers</b>.', 'والـ developers كتير <b>بيعملوا design</b> لما ميكونش فيه designers.', 'والـ developers <b>بيشتغلوا أحسن مع الـ designers</b> لما يفهموا الـ process.']
            : ['Some students will <b>shine as designers</b>.', 'Developers often <b>do design</b> when there are no designers.', 'Developers <b>work better with designers</b> when they understand the process.'])}
          <${H2}>${t('Two ways to hand design to development', 'طريقتين الـ design يوصل بيهم للـ development')}</${H2}>
          <${Def}>${X('<b>Handoff process</b>: design finishes, then it is <b>handed over</b> to development. One after the other: <b>sequential</b>.', 'الـ <b>Handoff process</b>: الـ design يخلص، وبعدين <b>يتسلّم</b> للـ development. ورا بعض، يعني <b>sequential</b>.')}</${Def}>
          <${Def}>${X('<b>Handshake process</b>: design and development run <b>in parallel</b>, with <b>frequent sync points</b>.', 'الـ <b>Handshake process</b>: الـ design والـ development ماشيين <b>بالتوازي (in parallel)</b>، مع <b>sync points كتير</b>.')}</${Def}>
        `, { sec: t('Handoff and handshake', 'الـ Handoff والـ handshake') }),

        // 16 · figure: handoff
        page(html`
          <${Fig} name="hc-handoff" head=${t('Watch the two lanes: in sequence, or in parallel', 'بص على الحارتين: ورا بعض، ولا بالتوازي')} />
          <${Hand}>${t("Our trick: a handOFF is a relay baton, passed once; a handSHAKE keeps meeting.", 'حيلة من عندنا: الـ handoff عصاية تتابع بتتسلّم مرة؛ والـ handshake بيتقابل كل شوية.')}</${Hand}>
        `),

        // 17 · exercise: handoff or handshake
        page(html`
          <${Box} kind="pencil" title=${t('Handoff or handshake?', 'الـ Handoff ولا الـ handshake؟')}><p className="hf-p small">${X('Tap <b>off</b> for handoff or <b>shake</b> for handshake.', 'دوس <b>off</b> للـ handoff أو <b>shake</b> للـ handshake.')}</p></${Box}>
          <${Sort} id="s-hand" bins=${[['off', t('handoff', 'الـ handoff')], ['shake', t('handshake', 'الـ handshake')]]} items=${A ? [
            ['الـ design يخلص، وبعدين يتسلّم للـ development', 0],
            ['الـ design والـ development ماشيين بالتوازي', 1],
            ['فيه sync points كتير', 1],
            ['ورا بعض (sequential)', 0],
            ['الـ designers والـ developers بيشتغلوا في نفس الوقت وبيتقابلوا كتير', 1]
          ] : [
            ['Design finishes, then it is handed over to development', 0],
            ['Design and development run in parallel', 1],
            ['Frequent sync points', 1],
            ['Sequential: one after the other', 0],
            ['Designers and developers work at the same time and meet often to sync', 1]
          ]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('In a handoff, when would development first hear about a problem in the design? And in a handshake?', 'في الـ handoff، الـ development هيعرف بمشكلة في الـ design إمتى أول مرة؟ وفي الـ handshake؟')}</p></${Box}>
        `),

        // 18 · wireframes
        page(html`
          <${H1}>${t('Meet the wireframe', 'اتعرّف على الـ wireframe')}</${H1}>
          <${Def}>${X('A <b>wireframe</b> is a <b>schematic for the basic outline of a screen</b>. It is built from lines and basic shapes (rectangles, circles) with some text, and the lines look like <b>wires</b>.',
            'الـ <b>wireframe</b> هو <b>رسم تخطيطي (schematic) للهيكل الأساسي للشاشة</b>. معمول من خطوط وأشكال بسيطة (مستطيلات ودواير) مع شوية text، والخطوط شكلها زي <b>السلوك (wires)</b>.')}</${Def}>
          <${P} small=${true}>${X('It <b>intentionally has no colors or font styles</b>, to focus on <b>structure</b>.', 'ومفيهوش <b>ألوان ولا font styles عن قصد</b>، عشان نركز على الـ <b>structure</b>.')}</${P}>
          <p className="hf-hand hf-big hf-in" style=${{ textAlign: 'center' }}>${t('wireframe = skeleton with placeholders', 'الـ wireframe هيكل (skeleton) فيه placeholders')}</p>
          <${P} small=${true}>${X('Google calls it a <i>"key part of the design process"</i>.', 'وشركة Google بتسميه جزء أساسي من الـ design process.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('<i>"A wireframe is primarily focused on artistic drawing and aesthetics."</i> <b>False.</b> Wireframes are <b>not art</b>: they <b>organize and communicate information clearly</b>. ',
            'لو قالك إن الـ wireframe مركّز على الرسم الفني والجمال، يبقى ده <b>False</b>. الـ wireframes <b>مش فن</b>: هي <b>بتنظم المعلومات وتوصّلها بوضوح</b>. ')}</p></${Box}>
        `, { sec: t('Wireframes', 'الـ Wireframes') }),

        // 19 · interview with the wireframe
        page(html`
          <${Interview} title=${t('The Wireframe, uncovered', 'الـ Wireframe على المكشوف')} sub=${t("This week's guest has no colours, no fonts, and no regrets.", 'ضيف الأسبوع ده مفيهوش ألوان ولا fonts، ومش زعلان.')} lines=${A ? [
            ['المذيع', 'إنت مين؟'],
            ['الـ Wireframe', 'أنا schematic للهيكل الأساسي للشاشة: خطوط وأشكال بسيطة وشوية text. وخطوطي شبه السلوك، ومن هنا اسمي.'],
            ['المذيع', 'طب فين الألوان؟'],
            ['الـ Wireframe', 'مفيش، عن قصد. لا ألوان ولا font styles. أنا هيكل فيه placeholders، والمهم الـ structure.'],
            ['المذيع', 'يعني إنت لوحة فنية؟'],
            ['الـ Wireframe', 'خالص. أنا مش فن. بنظم المعلومات وبوصّلها بوضوح.'],
            ['المذيع', 'وبتتولد إمتى؟'],
            ['الـ Wireframe', 'بعد الـ <b>foundational user research</b>، أول ما يبقى فيه <b>site map</b> مبدئي، يعني الـ content hierarchy.'],
            ['المذيع', 'وبتوفّر إيه؟'],
            ['الـ Wireframe', 'وقت وموارد: الفريق بيتفق بدري، والعناصر المنسية بتتمسك بدري.']
          ] : [
            ['Head First', 'Who are you?'],
            ['Wireframe', 'A schematic for the basic outline of a screen: lines, basic shapes, some text. My lines look like wires, hence the name.'],
            ['Head First', 'Where are your colours?'],
            ['Wireframe', 'None, on purpose. No colors, no font styles. I\'m a skeleton with placeholders; structure is the point.'],
            ['Head First', 'So you\'re a work of art?'],
            ['Wireframe', 'Not at all. I\'m not art. I organize and communicate information clearly.'],
            ['Head First', 'When are you born?'],
            ['Wireframe', 'After <b>foundational user research</b>, as soon as there is an initial <b>site map</b>: the content hierarchy.'],
            ['Head First', 'And what do you save?'],
            ['Wireframe', 'Time and resources: the team agrees early, and forgotten elements get caught early.']
          ]} />
        `),

        // 20 · purposes and when
        page(html`
          <${H2}>${t('Four reasons to wireframe', 'أربع أسباب تعمل wireframe')}</${H2}>
          ${num(A ? [
            'تقرر <b>الـ structure الأساسي للصفحة</b> قبل الألوان والصور.',
            'تخلّي <b>الفريق متفق من بدري</b>، فتوفّر وقت وموارد.',
            'توجّه الـ <b>feedback للمستوى الصح</b>: الـ structure والـ function، مش الألوان والـ typography.',
            'تمسك العناصر <b>المنسية أو المش منظمة</b> من بدري.'
          ] : [
            'Decide the <b>basic page structure</b> before colors and images.',
            'Get <b>the team on the same page early</b>, saving time and resources.',
            'Direct <b>feedback to the right level</b>: structure and function, not colors and typography.',
            'Catch <b>forgotten or disorganized</b> elements early.'
          ])}
          <${H2}>${t('When?', 'إمتى؟')}</${H2}>
          <${P} small=${true}>${X('<b>After foundational user research</b>, as soon as there is an initial <b>site map</b> (the content hierarchy).', '<b>بعد الـ foundational user research</b>، أول ما يبقى فيه <b>site map</b> مبدئي (الـ content hierarchy).')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Not "before any user research", and not "at the end of the design process". Reason 3 is the lo-fi lesson again: fewer details, feedback at the <b>right level</b>.',
            'مش "قبل أي user research"، ولا "في آخر الـ design process". والسبب رقم 3 هو درس الـ lo-fi تاني: تفاصيل أقل، يبقى الـ feedback في <b>المستوى الصح</b>.')}</p></${Box}>
        `),

        // 21 · the standards
        page(html`
          <${H1}>${t('Draw it by the standards', 'ارسمه بالـ standards')}</${H1}>
          <${P}>${X('The industry has a shared shorthand, so anyone can read your wireframe:', 'فيه لغة متفق عليها في الـ industry، عشان أي حد يقرا الـ wireframe بتاعك:')}</${P}>
          ${num(A ? [
            'الـ <b>text</b>: خطوط أفقية أو placeholder text.',
            'الـ <b>صور</b>: مستطيلات أو دواير فيها <b>X</b>.',
            'الـ <b>calls to action</b>: مستطيلات أو دواير.',
            'و<b>annotation</b> مظبوط، عشان الـ wireframe يبقى واضح.'
          ] : [
            '<b>Text</b>: horizontal lines or placeholder text.',
            '<b>Images</b>: rectangles or circles with an <b>X</b>.',
            '<b>Calls to action</b>: rectangles or circles.',
            'Proper <b>annotation</b>, so the wireframe is clear.'
          ])}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Which is NOT a wireframing standard?" The odd one out is <b>detailed color schemes and typography</b>. And yes, <i>"Proper annotation is important… to make the wireframe clear to stakeholders"</i> is <b>True</b>.',
            'في سؤال "أنهي واحدة مش wireframing standard؟" الغريبة هي <b>الـ color schemes والـ typography المفصّلة</b>. وأيوه، جملة إن الـ annotation المظبوط مهم عشان الـ wireframe يبقى واضح للـ stakeholders <b>True</b>.')}</p></${Box}>
          <${Talk} who="table">${t('Next page: a wireframe with three parts that break these rules. Find them.', 'الصفحة الجاية: wireframe فيه 3 أجزاء كاسرين القواعد دي. طلّعهم.')}</${Talk}>
        `),

        // 22 · exercise: spot the standard-breakers
        page(html`
          <${H2}>${t('Spot the standard-breakers', 'امسك اللي كاسر الـ standards')}</${H2}>
          <${P} small=${true}>${X('A screen of the lecture\'s <b>dog-walking app</b>, wireframed by us. Tap the <b>3 parts</b> that break the standards.', 'شاشة من الـ <b>dog-walking app</b> بتاع المحاضرة، رسمنا لها wireframe. دوس على <b>الـ 3 أجزاء</b> اللي كاسرين الـ standards.')}</${P}>
          <${Spot} />
        `),

        // 23 · figure: wireframe
        page(html`
          <${Fig} name="hc-wireframe" head=${t('Build one step by step, then see the process', 'ابنيه خطوة خطوة، وبعدين شوف الـ process')} />
        `, { sec: t('Wireframing process', 'خطوات الـ wireframing') }),

        // 24 · the process
        page(html`
          <${H1}>${t('Pen first, pixels later', 'القلم الأول، والـ pixels بعدين')}</${H1}>
          ${li(A ? [
            'ابدأ بـ <b>ورقة وقلم</b>. <b>الهدف الأول</b> إنك <b>توصل</b> لـ design، مش إنك تعرض واحد.',
            'ارسم <b>5 versions على الأقل</b> لكل شاشة.',
            'اعمل <b>iterations بالـ feedback</b>.',
            '<b>الهدف التاني</b>: تنقل الفكرة من دماغك للورقة بسرعة، فتجاهل <b>الخطوط المستقيمة والمسافات والـ alignment</b> في المرحلة دي.',
            'بعد أول iterations على الورق، استخدم <b>tools</b>.'
          ] : [
            'Start with <b>pen and paper</b>. The <b>first goal</b> is <b>reaching</b> a design, not showing one.',
            'Sketch <b>at least 5 versions</b> per screen.',
            'Go through <b>iterations with feedback</b>.',
            'The <b>second goal</b>: move the idea from your mind to paper quickly, so ignore <b>straight lines, spacing and alignment</b> at this stage.',
            'After the first paper iterations, use <b>tools</b>.'
          ])}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Two finals traps: <i>"It is recommended to create only one version of a wireframe before moving to digital tools"</i> is <b>False</b> (at least 5). And <i>"At the pen-and-paper stage… without focusing on details like straight lines and spacing"</i> is <b>True</b>.',
            'فخّين من الفاينل: جملة إنك تعمل <b>version واحد بس</b> قبل الـ digital tools دي <b>False</b> (5 على الأقل). وجملة إنك في مرحلة الورقة والقلم توصل لـ design بسرعة من غير ما تركز على الخطوط المستقيمة والمسافات دي <b>True</b>.')}</p></${Box}>
        `),

        // 25 · exercise: order the process
        page(html`
          <${Box} kind="pencil" title=${t('Put the process in order', 'رتّب الـ process')}><p className="hf-p small">${X('Tap the steps from first to last. Tap a step again to undo it.', 'دوس على الخطوات من الأول للآخر. ولو دوست على خطوة تاني بتتلغي.')}</p></${Box}>
          <${Order} />
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${X('Why five? One version is settling on <b>a single idea too early</b>.', 'ليه خمسة؟ الـ version الواحد يعني إنك مسكت في <b>فكرة واحدة بدري أوي</b>.')}</${Talk}>
        `),

        // 26 · tools sort
        page(html`
          <${Box} kind="pencil" title=${t("On the slides' tool list?", 'في لستة الـ tools بتاعة السلايدز؟')}><p className="hf-p small">${X('After paper, the lecture names five wireframing tools. Which of these are on that list?', 'بعد الورق، المحاضرة بتسمّي 5 wireframing tools. مين من دول في اللستة دي؟')}</p></${Box}>
          <${Sort} id="s-tools" bins=${[['✓', t("on the slides' list", 'في اللستة')], ['✗', t('not on it', 'مش فيها')]]} items=${A ? [
            ['الـ Figma', 0], ['الـ Microsoft Word', 1], ['الـ Balsamiq', 0], ['الـ Adobe XD', 0], ['الـ Final Cut Pro', 1], ['الـ Sketch', 0], ['الـ Pencil', 0]
          ] : [
            ['Figma', 0], ['Microsoft Word', 1], ['Balsamiq', 0], ['Adobe XD', 0], ['Final Cut Pro', 1], ['Sketch', 0], ['Pencil', 0]
          ]} />
        `),

        // 27 · dumb questions on wireframes
        page(html`
          <${Dumb} qa=${A ? [
            ['الخطوط في الـ sketch بتاعي معووجة. أعيده؟', 'لأ. في مرحلة الورقة والقلم الهدف إنك تنقل الفكرة بسرعة، فتجاهل <b>الخطوط المستقيمة والمسافات والـ alignment</b>.'],
            ['أفتح Figma من الأول وخلاص؟', 'لأ. <b>ابدأ بورقة وقلم</b>، والـ tools بعد أول iterations على الورق. الهدف الأول إنك <b>توصل</b> لـ design، مش تعرضه.'],
            ['الـ wireframe بييجي قبل الـ research ولا بعده؟', '<b>بعد الـ foundational user research</b>، أول ما يبقى فيه <b>site map</b> مبدئي.'],
            ['الـ wireframe مفيهوش ألوان عشان مستعجلين؟', 'لأ، <b>عن قصد</b>: عشان الكل يركز على الـ structure، والـ feedback يروح للمستوى الصح.']
          ] : [
            ['My sketch has wobbly lines. Should I redo it?', 'No. At the pen-and-paper stage the goal is moving the idea quickly, so ignore <b>straight lines, spacing and alignment</b>.'],
            ['Can I just open Figma from the start?', 'No. <b>Start with pen and paper</b>; tools come after the first paper iterations. The first goal is <b>reaching</b> a design, not showing one.'],
            ['Does the wireframe come before or after research?', '<b>After foundational user research</b>, as soon as there is an initial <b>site map</b>.'],
            ['Does a wireframe skip colours because we are in a hurry?', 'No, <b>intentionally</b>: so everyone focuses on structure and feedback goes to the right level.']
          ]} />
        `),

        // 28 · forms: buttons, breadcrumbs, progress bars
        page(html`
          <${H1}>${t('Forms people can finish', 'الـ Forms اللي الناس تقدر تخلّصها')}</${H1}>
          <${P}>${X('Now the lecture turns to <b>form design guidelines</b>. Start with commands: important commands are <b>buttons, not links</b>, because buttons catch the eye.',
            'دلوقتي المحاضرة بتدخل في <b>إرشادات تصميم الـ forms</b>. نبدأ بالـ commands: الـ commands المهمة تبقى <b>buttons مش links</b>، لأن الـ buttons بتشد العين.')}</${P}>
          <${Box} kind="watch"><p className="hf-p small">${X('But <b>do not</b> display all commands as buttons. <i>"Since buttons catch the eye, all commands should be buttons"</i> is <b>False</b>.', 'بس <b>متعرضش</b> كل الـ commands كـ buttons. جملة "عشان الـ buttons بتشد العين، يبقى كل الـ commands تبقى buttons" دي <b>False</b>.')}</p></${Box}>
          <${H2}>${t('Where am I?', 'أنا فين؟')}</${H2}>
          ${li(A ? ['الـ <b>Breadcrumbs</b> بتوري الـ users هم <b>فين</b>، لما يكون فيه <b>اختيارات كتير</b>.', 'الـ <b>Progress bar</b> بيوري الـ users هم فين <b>وفاضل إيه</b>، لـ <b>path واحد محدد مسبقًا</b>.']
            : ['<b>Breadcrumbs</b> show <b>where</b> users are, when there are <b>multiple choices</b>.', 'A <b>progress bar</b> shows where users are <b>and what is left</b>, for a <b>predefined unique path</b>.'])}
          <${Grow} />
          <${Hand} red=${true}>${t('"and what is left" = progress bar. That is the whole difference.', 'لو فيه "وفاضل إيه" يبقى progress bar. ده الفرق كله.')}</${Hand}>
        `, { sec: t('Form design', 'تصميم الـ Forms') }),

        // 29 · figure: where am I
        page(html`
          <${Fig} name="hc-where-am-i" head=${t('Try both: wander the levels, then step through the path', 'جرّب الاتنين: لف في المستويات، وبعدين امشي في الـ path')} />
        `),

        // 30 · exercise: breadcrumbs or progress bar
        page(html`
          <${Box} kind="pencil" title=${t('Breadcrumbs or progress bar?', 'الـ Breadcrumbs ولا الـ progress bar؟')}><p className="hf-p small">${X('Tap <b>bc</b> for breadcrumbs or <b>pb</b> for a progress bar. (The scenes are ours.)', 'دوس <b>bc</b> للـ breadcrumbs أو <b>pb</b> للـ progress bar. (المواقف من عندنا.)')}</p></${Box}>
          <${Sort} id="s-where" bins=${[['bc', t('breadcrumbs', 'الـ breadcrumbs')], ['pb', t('progress bar', 'الـ progress bar')]]} items=${A ? [
            ['متجر بتوصل فيه للمنتج من اختيارات categories كتير', 0],
            ['الـ checkout ثابت 4 خطوات: السلة، العنوان، الدفع، التأكيد', 1],
            ['بيوري الـ users هم فين وفاضل إيه', 1],
            ['بيوري الـ users هم فين، لما يكون فيه اختيارات كتير', 0],
            ['ليه path واحد محدد مسبقًا', 1],
            ['موقع documentation فيه sections جوّاها sub-sections', 0]
          ] : [
            ['A store where users reach a product through many category choices', 0],
            ['A fixed 4-step checkout: cart, address, payment, confirm', 1],
            ['Shows where users are and what is left', 1],
            ['Shows where users are, when there are multiple choices', 0],
            ['One predefined unique path', 1],
            ['A documentation site with sections inside sections', 0]
          ]} />
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('Ask: is there one fixed path? Then the user wants to know what is left.', 'اسأل: فيه path واحد ثابت؟ يبقى الـ user عايز يعرف فاضل إيه.')}</${Talk}>
        `),

        // 31 · the rest of the form guidelines
        page(html`
          <${H2}>${t('Six more form rules', 'ست قواعد كمان للـ forms')}</${H2}>
          ${num(A ? [
            'لما الـ form يتبعت بنجاح، أكّد ده بـ <b>confirmation page</b>.',
            'الـ <b>Error messages جنب الـ field</b> اللي فيه الغلط، وتغيير لون الـ border (زي الأحمر) ده المفضّل.',
            'الـ Text boxes تدّي <b>مساحة كفاية</b> للإجابة.',
            'الـ Fields فيها <b>hints أو أمثلة أو الـ format المطلوب</b>.',
            '<b>شيل الـ actions المتكررة</b>: افتكر تفضيلات العملاء.',
            'اعمل <b>فرق واضح بين الـ primary والـ secondary calls-to-action</b>، زي إن زرار <bdi dir="ltr">"Go Pro"</bdi> يبان أكتر من زرار <bdi dir="ltr">"Free Trial"</bdi>.'
          ] : [
            'Confirm a successful submission with a <b>confirmation page</b>.',
            '<b>Error messages sit next to the field</b> where the error occurred; changing the field border colour (e.g. red) is preferred.',
            'Text boxes provide <b>plenty of space</b> for the answer.',
            'Fields contain <b>hints, examples or required formats</b>.',
            '<b>Remove repetitive actions</b>: remember customers\' preferences.',
            'Make a <b>clear distinction between primary and secondary calls-to-action</b>: "Go Pro" stands out over "Free Trial".'
          ])}
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Where should an error message be displayed?" <b>Next to the field</b> where the error occurred. Not a popup after submitting, not at the bottom, not in the page title.',
            'لو اتسألت "الـ error message تظهر فين؟" الإجابة <b>جنب الـ field</b> اللي فيه الغلط. مش popup بعد الـ submit، ولا تحت الصفحة، ولا في عنوانها.')}</p></${Box}>
        `),

        // 32 · figure: form fix
        page(html`
          <${Fig} name="hc-form-fix" head=${t('A bad form: tap each guideline to fix its part', 'form وحش: دوس على كل إرشاد عشان تصلّح الجزء بتاعه')} />
        `),

        // 33 · exercise: match the problem to the guideline
        page(html`
          <${Box} kind="pencil" title=${t('Which rule fixes it?', 'أنهي قاعدة تصلّحها؟')}><p className="hf-p small">${X('Tap a problem (ours), then its fix.', 'دوس على المشكلة (من عندنا)، وبعدين على الحل.')}</p></${Box}>
          <${Match} id="m-form" left=${A ? [
            'كل الأخطاء في box واحد فوق الصفحة',
            'مربع سطر واحد لـ "اوصف المشكلة"',
            'خانة تاريخ من غير أي format',
            'زرار <bdi dir="ltr">"Go Pro"</bdi> وزرار <bdi dir="ltr">"Free Trial"</bdi> شبه بعض',
            'بعد الـ Submit مفيش حاجة بتحصل'
          ] : [
            'All errors listed in one box at the top',
            'A one-line box for "Describe the problem"',
            'A date field with no format shown',
            '"Go Pro" and "Free Trial" look identical',
            'After Submit, nothing happens'
          ]} right=${A ? [
            'صفحة تأكيد',
            'الـ error جنب الـ field، والـ border أحمر',
            'فرق واضح بين الـ primary والـ secondary',
            'مساحة كفاية للإجابة',
            'حط hint أو مثال أو الـ format'
          ] : [
            'A confirmation page',
            'Error next to the field, red border',
            'Clear primary vs secondary CTA',
            'Plenty of space for the answer',
            'A hint, example or required format'
          ]} answer=${[1, 3, 4, 2, 0]} />
        `),

        // 34–38 · exam corner: the doctors' questions
        page(html`
          <${Box} kind="exam" title=${exam}><p className="hf-p small">${t("Real questions from the doctors' exams and the finals summaries. Tap an answer to see why.", 'أسئلة حقيقية من امتحانات الدكاترة وملخصات الفاينل. دوس على إجابة عشان تعرف ليه.')}</p></${Box}>
          ${mq('x-fast', /faster, easier and cheaper to generate/i)}
        `, { sec: exam }),
        page(html`
          ${mq('x-adv', /key advantage of low-fidelity/i)}
          <${Grow} />
          <${Talk} who="dev">${t('Expensive and slow? Detailed animations? That is the other one.', 'غالي وبطيء؟ animations مفصّلة؟ ده الـ hi-fi.')}</${Talk}>
        `),
        page(html`
          ${mq('x-purp', /primary purpose of a wireframe/i, /without detailed design/i)}
          <${Grow} />
          <${Hand}>${t('skeleton with placeholders: structure, no colours, no fonts', 'هيكل فيه placeholders: structure من غير ألوان ولا fonts')}</${Hand}>
        `),
        page(html`
          ${mq('x-tools', /tools are commonly used to create wireframes/i)}
          ${mq('x-one', /only one version of a wireframe/i)}
        `),
        page(html`
          ${mq('x-first', /first step in the wireframing process/i)}
          <${Grow} />
          <${Hand} red=${true}>${t('paper first, digital tools later', 'الورق الأول، والـ digital tools بعدين')}</${Hand}>
        `),

        // 39 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ prototypes ليها 4 جماهير: الزملاء والـ clients والـ users وإنت نفسك.',
            'الـ <b>Fidelity</b> هي القرب من الـ look and feel النهائي. ابدأ بالـ lo-fi وانقل للـ hi-fi.',
            'الـ lo-fi أسرع وأرخص وبيجيب feedback أحسن (Konstan)؛ والتفاصيل الكتير بتنزّل مستواه.',
            'الـ Brainstorming لوحدك الأول (Joyner)، هدفك 20، ومتقيّمش أي فكرة. والـ team sessions مش للتضييق.',
            'الـ <b>Handoff</b> ورا بعض؛ والـ <b>Handshake</b> بالتوازي مع sync points.',
            'الـ <b>Wireframe</b> هيكل فيه placeholders، من غير ألوان ولا fonts، بعد الـ research والـ site map.',
            'ورقة وقلم، 5 versions على الأقل، iterations، وبعدين Figma و Adobe XD و Sketch و Balsamiq و Pencil.',
            'في الـ forms: buttons للمهم، والـ error جنب الـ field، وconfirmation page.'
          ] : [
            'Prototypes serve four audiences: colleagues, clients, users and yourself.',
            '<b>Fidelity</b> = closeness to the final look and feel. Start lo-fi, move to hi-fi.',
            'Lo-fi is faster, easier, cheaper; people talk more about it (Konstan). Too much detail pushes feedback to a lower level.',
            'Brainstorm individually first (Joyner), aim for 20, judge nothing; team sessions add, never narrow.',
            '<b>Handoff</b> is sequential; <b>handshake</b> runs in parallel with sync points.',
            'A <b>wireframe</b> is a skeleton with placeholders, no colors or fonts, made after research and a site map.',
            'Pen and paper, at least 5 versions, iterate, then Figma, Adobe XD, Sketch, Balsamiq, Pencil.',
            'Forms: buttons for key commands, breadcrumbs vs progress bar, errors next to the field, a confirmation page.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 40 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 9!', 'خلّصت الفصل التاسع!')}</${H1}>
            <${Talk} who="dev">${t('Next time I start with a napkin. And five of them.', 'المرة الجاية هبدأ بمنديل. وخمسة كمان.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [9], t: Date.now() } }}>${t('Quiz me on Lecture 9', 'امتحنّي في محاضرة 9')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 9, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 9, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

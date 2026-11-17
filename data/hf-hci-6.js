// Head First chapter for Human Computer Interaction Lecture 6 (built on hf.js), English + Egyptian Arabic, same pages in both.
// How to ask good survey questions: the six principles (Be Clear, Concise, Specific, Expressive, Unbiased, Usable), each with the
// slides' own "Don't ask this… / Instead, ask this…" examples, the Be Usable checklist, and the slide's exercise (evaluate four
// questions against five labels). Every fact comes from the lecture's notes; analogies, tips and the extra range sets marked "ours"
// are our own. The notes flag two things kept here: the slide's timebox answers (5-7 and 7 or more) overlap at 7, and the slide's
// exercise does not say which label goes with which question (the matching is the notes' reading). ‡ marks the notes' remark that
// examiners often ask you to evaluate a question with the principles, which is not on the slides.
// Range sets in "Be the range checker" were checked by hand for whole-number answers: 0-2,2-5,5-10,10-20,20+ (2,5,10,20 twice);
// 0-2,3-5,6-10,11-19,20+ (ok); 0-5,5-10,10+ (5,10 twice); 0/1-2/3-4/5-7/7+ (7 twice); 0/1-2/3-4/5-6/7+ (ok); ours 1-3,4-6,7-9,10+ (ok);
// ours 0-10,10-20,20-30,30+ (10,20,30 twice). "Sixteen words": the car question has 16 words, the fix has 5.
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K; const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T6 = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-hci6')) {
    const s = document.createElement('style'); s.id = 'hf-css-hci6';
    s.textContent = `
.hfb .hf-hci6-pair{ display:grid; grid-template-columns:minmax(0,1fr); gap:4px; }
.hfb .hf-hci6-rule{ font:700 14.5px/1.25 var(--body); margin:0; color:var(--ink); }
.hfb .hf-hci6-dont, .hfb .hf-hci6-do{ border:1.5px solid var(--hf-red); border-radius:8px; padding:5px 8px 6px; background:color-mix(in srgb, var(--hf-red) 6%, var(--paper)); }
.hfb .hf-hci6-do{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 8%, var(--paper)); }
.hfb .hf-hci6-lb{ display:block; font:700 13px/1.1 var(--body); color:var(--hf-red); margin:0 0 2px; }
.hfb .hf-hci6-do .hf-hci6-lb{ color:var(--ok); }
.hfb .hf-hci6-qq{ font:500 14px/1.3 var(--body); color:var(--ink); margin:0; text-align:left; }
.hfb .hf-hci6-qq + .hf-hci6-qq{ margin-top:2px; }
.hfb .hf-hci6-oo{ display:flex; flex-wrap:wrap; gap:3px; margin-top:4px; }
.hfb .hf-hci6-oo span{ font:600 13px/1.2 var(--body); border:1px solid var(--hf-line); border-radius:99px; padding:1px 7px; background:var(--paper); color:var(--ink); }
.hfb .hf-hci6-nt{ font:italic 500 13px/1.2 var(--body); color:var(--graphite); margin:3px 0 0; text-align:left; }
.hfb .hf-hci6-six{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.hfb .hf-hci6-six > div{ border:1.5px solid var(--hf-line); border-radius:8px; padding:6px 8px; background:var(--paper); box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-hci6-six .nm{ display:flex; align-items:center; gap:6px; font:800 15px/1.1 var(--body); color:var(--ink); }
.hfb .hf-hci6-six .nm i{ font-style:normal; display:grid; place-items:center; width:21px; height:21px; flex:none; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 13px/1 var(--body); }
.hfb .hf-hci6-six .en{ display:inline-block; font:700 13px/1.1 var(--body); color:var(--hf-k); margin-top:2px; }
.hfb .hf-hci6-six .g{ display:block; font-size:13.5px; line-height:1.28; color:var(--ink); margin-top:3px; }
.hfb .hf-hci6-tabs{ display:flex; gap:5px; }
.hfb .hf-hci6-tabs button{ flex:1 1 0; min-width:0; padding:0 3px; font:700 13px/1.1 var(--body); min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-hci6-tabs button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-hci6-tabs button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-hci6-tabs button.dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-hci6-sp{ border:2px solid var(--hf-line); border-radius:9px; padding:8px; display:grid; grid-template-columns:minmax(0,1fr); gap:7px; }
.hfb .hf-hci6-arrow{ text-align:center; font:800 18px/1 var(--body); color:var(--hf-k); }
.hfb .hf-hci6-piece{ border:1.5px solid var(--ok); border-radius:8px; padding:5px 8px; background:color-mix(in srgb, var(--ok) 8%, var(--paper)); font:500 14px/1.3 var(--body); color:var(--ink); text-align:left; }
.hfb .hf-hci6-piece.ghost{ border-style:dashed; border-color:var(--faint); background:var(--paper); color:var(--graphite); }
.hfb .hf-hci6-cap{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); }
.hfb .hf-hci6-pm{ border:2px solid var(--hf-line); border-radius:9px; padding:8px; display:grid; grid-template-columns:minmax(0,1fr); gap:6px; }
.hfb .hf-hci6-pm .qt{ font:600 14px/1.25 var(--body); margin:0; color:var(--ink); text-align:left; }
.hfb .hf-hci6-list{ display:grid; grid-template-columns:1fr 1fr; gap:3px 8px; }
.hfb .hf-hci6-list button{ display:flex; align-items:center; gap:7px; text-align:left; font:500 13.5px/1.1 var(--body); min-height:28px; padding:0 4px; border:0; border-radius:5px; background:none; color:var(--ink); cursor:pointer; }
.hfb .hf-hci6-list button .mk{ width:14px; height:14px; flex:none; border:1.8px solid var(--graphite); border-radius:50%; display:grid; place-items:center; }
.hfb .hf-hci6-list.sq button .mk{ border-radius:3px; }
.hfb .hf-hci6-list button[aria-pressed="true"] .mk{ border-color:var(--hf-k); background:var(--hf-k); box-shadow:inset 0 0 0 2px var(--paper); }
.hfb .hf-hci6-list button.oth{ color:var(--hf-k); font-weight:700; animation:hf-up .4s both; }
.hfb .hf-hci6-fx{ border:2px solid var(--hf-line); border-radius:9px; padding:8px; display:grid; grid-template-columns:minmax(0,1fr); gap:7px; }
.hfb .hf-hci6-nums{ display:grid; grid-template-columns:repeat(7, minmax(0,1fr)); gap:4px; }
.hfb .hf-hci6-nums button{ min-height:30px; padding:0; font:700 13px/1 var(--body); border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-hci6-nums button[aria-pressed="true"]{ background:var(--hf-line); border-color:var(--hf-line); color:var(--paper); }
.hfb .hf-hci6-nums button.dn{ color:var(--ok); border-color:var(--ok); }
.hfb .hf-hci6-nums button.dn[aria-pressed="true"]{ color:var(--paper); background:var(--ok); }
.hfb .hf-hci6-bad{ border:1.5px solid var(--hf-red); border-radius:8px; padding:5px 8px; background:color-mix(in srgb, var(--hf-red) 6%, var(--paper)); min-height:62px; }
.hfb .hf-hci6-pr{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:5px; }
.hfb .hf-hci6-pr button{ min-height:32px; padding:0 3px; font:700 13.5px/1 var(--body); border-radius:6px; border:1.5px solid var(--hf-hand); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hci6-pr button.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 14%, var(--paper)); }
.hfb .hf-hci6-pr button.no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 10%, var(--paper)); }
.hfb .hf-hci6-fb{ min-height:104px; }
.hfb .hf-hci6-no{ font-size:14px; line-height:1.34; margin:0; color:var(--hf-red); }
.hfb .hf-hci6-yes{ font-size:14px; line-height:1.34; margin:0; color:var(--ink); padding:5px 8px; border-left:3px solid var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-hci6-yes .lbl{ display:block; font-weight:700; margin-top:3px; }
.hfb .hf-hci6-yes .fix{ display:block; font:500 13.5px/1.3 var(--body); text-align:left; }
.hfb .hf-hci6-hint{ font-size:14px; line-height:1.3; margin:0; color:var(--graphite); }
.hfb .hf-hci6-ol{ list-style:none; margin:0; padding:0; display:grid; gap:5px; }
.hfb .hf-hci6-ol li{ display:grid; grid-template-columns:26px minmax(0,1fr); gap:8px; align-items:center; font-size:15px; line-height:1.3; color:var(--ink); }
.hfb .hf-hci6-ol li i{ font-style:normal; display:grid; place-items:center; width:24px; height:24px; border-radius:50%; background:var(--hf-k); color:var(--paper); font:800 13px/1 var(--body); }
.hfb .hf-hci6-quote{ font:500 14px/1.3 var(--body); margin:0; padding:4px 8px; border-left:3px solid var(--hf-k); background:var(--hf-grey); color:var(--ink); text-align:left; }
.hfb .hf-hci6-quote b{ font-weight:800; color:var(--hf-k); margin-right:4px; }
.hfb .hf-hci6-chips{ display:flex; flex-wrap:wrap; gap:4px; }
.hfb .hf-hci6-chips span{ font:700 13px/1.2 var(--body); padding:3px 8px; border-radius:99px; background:var(--hf-line); color:var(--paper); }
.hf-ar .hf-hci6-rule, .hf-ar .hf-hci6-lb, .hf-ar .hf-hci6-cap, .hf-ar .hf-hci6-no, .hf-ar .hf-hci6-yes, .hf-ar .hf-hci6-hint, .hf-ar .hf-hci6-six .nm, .hf-ar .hf-hci6-six .g, .hf-ar .hf-hci6-ol li, .hf-ar .hf-hci6-tabs button{ font-family:"IBM Plex Sans Arabic", var(--body); letter-spacing:0; }
.hf-ar .hf-hci6-cap, .hf-ar .hf-hci6-no, .hf-ar .hf-hci6-yes, .hf-ar .hf-hci6-hint, .hf-ar .hf-hci6-six .g{ font-size:13.5px; line-height:1.5; }
.hf-ar .hf-hci6-ol li{ font-size:14px; line-height:1.45; }
.hf-ar .hf-hci6-rule{ font-weight:600; font-size:14px; line-height:1.45; }
.hf-ar .hf-hci6-yes{ border-left:0; border-right:3px solid var(--ok); }
.hf-ar .hf-hci6-yes .fix{ direction:ltr; }
.hf-ar .hf-hci6-quote{ direction:ltr; }
`;
    document.head.appendChild(s);
  }

  // the slides' "Don't ask this… / Instead, ask this…" pairs, word for word from the notes
  const EX = {
    scale: { r: ['Provide labels to clarify a numeric scale.', 'حط labels توضّح الـ numeric scale.'],
      d: [['From 1 to 5, rate your satisfaction with..'], ['1', '2', '3', '4', '5']],
      i: [['From 1 to 5, rate your satisfaction with..'], ['1 - Highly dissatisfied', '2 - Dissatisfied', '3 - Neutral', '4 - Satisfied', '5 - Highly Satisfied']] },
    ranges: { r: ['Avoid overlapping ranges.', 'تجنب الـ ranges المتداخلة.'],
      d: [['How many times per week do you watch Hulu?'], ['0-2', '2-5', '5-10', '10-20', '20+']],
      i: [['How many times per week do you watch Hulu?'], ['0-2', '3-5', '6-10', '11-19', '20+']] },
    tablet: { r: ['When in doubt, provide extra detail.', 'لو شاكك، زوّد تفاصيل.'],
      d: [['Do you own a tablet computer?'], ['Yes', 'No']],
      i: [['Do you own a tablet computer (i.e., any computer with a touchscreen and detachable keyboard)?'], ['Yes', 'No']] },
    timebox: { r: ['Timebox frequency-based questions.', 'حط إطار زمني (timebox) للأسئلة بتاعة التكرار.'],
      d: [['How often do you exercise?'], ['Never', 'Rarely', 'Occasionally', 'Frequently', 'Always']],
      i: [['In the past seven days, how many times have you exercised?'], ['0', '1-2', '3-4', '5-6', '7 or more']] },
    car: { r: ['Ask questions in plain language.', 'اسأل بلغة بسيطة (plain language).'],
      d: [['What was the overall level of cleanliness that you observed within the car that you rented?'], ['Very clean', 'Somewhat clean', 'Not clean at all']],
      i: [['How clean was the car?'], ['Very clean', 'Somewhat clean', 'Not clean at all']] },
    big: { r: ['Avoid questions on super-big ideas.', 'ابعد عن الأسئلة عن الأفكار الكبيرة أوي (super-big ideas).'],
      d: [['How satisfied were you with the interface?'], []],
      i: [['How satisfied were you with how quickly the interface responded to your commands?'], [], '(and more follow-up questions)'] },
    dbl: { r: ['Avoid "double-barrel" questions (two things in one).', 'ابعد عن الـ double-barrel questions (حاجتين في سؤال واحد).'],
      d: [['How satisfied are you with the speed and availability of your mobile connection?'], []],
      i: [['How satisfied are you with the speed of your mobile connection?', 'How satisfied are you with the availability of your mobile connection?'], []] },
    food: { r: ['Avoid questions that allow internal conflict.', 'ابعد عن الأسئلة اللي فيها internal conflict.'],
      d: [['How satisfied were you with your food?'], []],
      i: [['How satisfied were you with the temperature of your food?', '…with the appearance of your food?', '…with the flavor of your food?'], []] },
    price: { r: ["Emphasize the user's opinions.", 'ركّز على رأي الـ user.'],
      d: [['Is our subscription price too high?'], []],
      i: [['Do you feel our subscription price is too high, too low, or about right?'], []] },
    yesno: { r: ['Use ranges instead of yes/no questions.', 'استخدم ranges بدل الأسئلة بتاعة <bdi dir="ltr">yes/no</bdi>.'],
      d: [['Do you use social media?'], ['Yes', 'No']],
      i: [['In the past seven days, how much time have you spent on social media?'], ['0 hours', '<1 hour', '1-2 hours', '3-5 hours', '6-9 hours', '10+ hours']] },
    levels: { r: ['Give levels of frequency or agreement.', 'ادّي مستويات للتكرار أو الموافقة.'],
      d: [['How satisfied are you with this interface?'], ['Dissatisfied', 'Satisfied']],
      i: [['How satisfied are you with this interface?'], ['Highly dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Highly Satisfied']] },
    other: { r: ['Allow users to add nominal categories.', 'اسمح للـ users يضيفوا nominal categories.'],
      d: [['What social media platform do you use most?'], ['Facebook', 'Snapchat', 'Instagram', 'Twitter', 'LinkedIn', 'Pinterest']],
      i: [['What social media platform do you use most?'], ['Facebook', 'Snapchat', 'Instagram', 'Twitter', 'LinkedIn', 'Pinterest', 'Other: ____']] },
    open: { r: ['Leave potentially open-ended questions open.', 'سيب الأسئلة اللي ممكن تكون open-ended مفتوحة.'],
      d: [['Why did you choose our service over our competitors?'], ['Reputation', 'Price', 'Recommendation', 'Reviews', 'Other: ____']],
      i: [['Why did you choose our service over our competitors?'], ['______________________']] },
    lead: { r: ['Avoid leading questions.', 'ابعد عن الـ leading questions.'],
      d: [['Did our brand-new AI-based interface generate better recommendations?'], ['Yes!', 'No :(']],
      i: [['How satisfied were you with the recommendations the interface generated?'], ['Dissatisfied', 'Neutral', 'Satisfied']] },
    loaded: { r: ['Avoid loaded questions.', 'ابعد عن الـ loaded questions.'],
      d: [['In the past seven days, how much time have you <i>wasted</i> on social media?'], []],
      i: [['In the past seven days, how much time have you <i>spent</i> on social media?'], []] }
  };
  const Q = ([lines, opts, note]) => html`${lines.map((l, k) => html`<p key=${k} className="hf-hci6-qq" dir="ltr">${T6(l)}</p>`)}
    ${opts.length ? html`<div className="hf-hci6-oo" dir="ltr">${opts.map(o => html`<span key=${o}>${o}</span>`)}</div>` : null}
    ${note ? html`<p className="hf-hci6-nt" dir="ltr">${note}</p>` : null}`;
  // one slide example: the rule, the bad question, the better one
  function Pair({ x, rule = true }) {
    const ar = useAr(), E = EX[x];
    return html`<div className="hf-hci6-pair hf-in">
      ${rule && html`<p className="hf-hci6-rule">${T6(ar ? E.r[1] : E.r[0])}</p>`}
      <div className="hf-hci6-dont"><span className="hf-hci6-lb">${ar ? 'متسألش كده…' : "Don't ask this…"}</span>${Q(E.d)}</div>
      <div className="hf-hci6-do"><span className="hf-hci6-lb">${ar ? 'اسأل كده بدلها…' : 'Instead, ask this…'}</span>${Q(E.i)}</div>
    </div>`;
  }

  // the six principles at a glance
  const SIX = [
    ['Be Clear', 'خليك واضح', 'Label scales, no overlapping ranges, extra detail, a timebox.', 'حط labels للـ scale، والـ ranges متتداخلش، وتفاصيل زيادة، وإطار زمني.'],
    ['Be Concise', 'خليك مختصر', 'Ask in plain language.', 'اسأل بلغة بسيطة.'],
    ['Be Specific', 'خليك محدد', 'No super-big ideas, no double-barrel, no internal conflict.', 'لا أفكار كبيرة أوي، ولا double-barrel، ولا internal conflict.'],
    ['Be Expressive', 'خلّي الـ user يعبّر', "The user's opinion, ranges not yes/no, levels, several selections.", 'رأي الـ user، والـ ranges بدل الـ <bdi dir="ltr">yes/no</bdi>، ومستويات، وأكتر من اختيار.'],
    ['Be Unbiased', 'خليك محايد', 'Add "Other", leave open questions open, no leading or loaded words.', 'زوّد "Other"، وسيب السؤال المفتوح مفتوح، ولا leading ولا loaded.'],
    ['Be Usable', 'خلّي الـ survey سهل', 'Progress bar, even pages, logical order, alerts, preview.', 'حط progress bar، وصفحات متساوية، وترتيب منطقي، وتنبيهات، والـ preview.']
  ];
  function Six() {
    const ar = useAr();
    return html`<div className="hf-hci6-six hf-in">${SIX.map((p, k) => html`<div key=${k} className="hf-in" style=${{ animationDelay: calm() ? '0s' : k * 0.1 + 's' }}>
      <span className="nm"><i>${k + 1}</i>${ar ? p[1] : p[0]}</span>${ar ? html`<span className="en" dir="ltr">${p[0]}</span>` : null}
      <span className="g">${T6(ar ? p[3] : p[2])}</span></div>`)}</div>`;
  }

  // Split it: three Be Specific questions broken into narrower ones (the slides' own fixes)
  const SPL = [
    { k: 'dbl', n: ['Double-barrel', 'حاجتين في سؤال'], c: ['Two things in one question: speed <b>and</b> availability. Split it into one question each.', 'حاجتين في سؤال واحد: الـ speed <b>و</b> الـ availability. قسّمه لسؤال لكل واحدة.'] },
    { k: 'food', n: ['Internal conflict', 'تعارض داخلي'], c: ['One thing whose parts can get different answers: you may like the flavor but not the temperature. Ask about temperature, appearance and flavor.', 'حاجة واحدة بس أجزاءها ممكن تاخد إجابات مختلفة: ممكن الطعم يعجبك والحرارة لأ. اسأل عن الحرارة والشكل والطعم.'] },
    { k: 'big', n: ['Super-big idea', 'فكرة كبيرة أوي'], c: ['"The interface" is too broad. Ask about one thing, how quickly it responded to your commands, and add more follow-up questions.', 'كلمة "الـ interface" واسعة أوي. اسأل عن حاجة واحدة، زي سرعة رده على أوامرك، وزوّد أسئلة follow-up.'] }
  ];
  function Splitter({ id }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id + ':k', 0);
    const [open, setOpen] = H.K.useSlot(id + ':o', {});
    const S = SPL[k], E = EX[S.k], on = !!open[k];
    const pieces = E.i[0].concat(E.i[2] ? [E.i[2]] : []);
    return html`<div className="hf-hci6-sp hf-in">
      <div className="hf-hci6-tabs" role="group" aria-label=${ar ? 'الأمثلة' : 'Examples'}>${SPL.map((s, j) => html`<button key=${j} aria-pressed=${String(j === k)} className=${open[j] ? 'dn' : ''} onClick=${() => setK(j)}>${ar ? s.n[1] : s.n[0]}</button>`)}</div>
      <div className="hf-hci6-dont" key=${'d' + k}><span className="hf-hci6-lb">${ar ? 'متسألش كده…' : "Don't ask this…"}</span>${Q(E.d)}</div>
      <div className="hf-hci6-arrow" aria-hidden="true">↓</div>
      ${on ? pieces.map((p, j) => html`<div key=${k + '-' + j} className=${'hf-hci6-piece hf-in' + (j >= E.i[0].length ? ' ghost' : '')} dir="ltr" style=${{ animationDelay: calm() ? '0s' : j * 0.25 + 's' }}>${T6(p)}</div>`)
        : html`<div className="hf-hci6-piece ghost" dir="ltr">?</div>`}
      <p className="hf-hci6-cap" key=${'c' + k + on}>${on ? T6(ar ? S.c[1] : S.c[0]) : (ar ? 'دوس عشان تشوف السؤال بيتقسم إزاي.' : 'Tap to see how the slide splits it.')}</p>
      <div className="hf-row">
        <button className="hf-btn solid" onClick=${() => setOpen(Object.assign({}, open, { [k]: true }))}>${ar ? 'ورّيني التقسيم' : 'Show the split'}</button>
        ${k < SPL.length - 1 && html`<button className="hf-btn" onClick=${() => setK(k + 1)}>${ar ? 'المثال اللي بعده' : 'Next example'}</button>`}
      </div>
    </div>`;
  }

  // radio buttons or checkboxes, and the "Other: ____" category (Be Expressive meets Be Unbiased)
  const PLAT = ['Facebook', 'Snapchat', 'Instagram', 'Twitter', 'LinkedIn', 'Pinterest'];
  function PickMany({ id }) {
    const ar = useAr();
    const [mode, setMode] = H.K.useSlot(id + ':m', 'radio');
    const [pick, setPick] = H.K.useSlot(id + ':p', []);
    const [oth, setOth] = H.K.useSlot(id + ':o', false);
    const items = PLAT.concat(oth ? ['Other: ____'] : []);
    const tap = p => setPick(mode === 'radio' ? [p] : (pick.includes(p) ? pick.filter(x => x !== p) : pick.concat(p)));
    const sw = m => { setMode(m); setPick(m === 'radio' ? pick.slice(0, 1) : pick); };
    const cap = mode === 'radio'
      ? (ar ? 'الـ <b>radio buttons</b> بتسمح باختيار <b>واحد بس</b>. جرّب تختار اتنين.' : '<b>Radio buttons</b> allow <b>only one</b> selection. Try picking two.')
      : (ar ? 'الـ <b>checkboxes</b> بتسمح بـ <b>أكتر من اختيار</b>: ودي نصيحة Be Expressive، اسمح بأكتر من اختيار لما ينفع.' : '<b>Checkboxes</b> allow <b>several</b> selections: Be Expressive says allow multiple selections when possible.');
    return html`<div className="hf-hci6-pm hf-in">
      <div className="hf-hci6-tabs" role="group" aria-label=${ar ? 'نوع الاختيار' : 'Answer control'}>
        <button aria-pressed=${String(mode === 'radio')} onClick=${() => sw('radio')}>${ar ? 'الـ Radio buttons' : 'Radio buttons'}</button>
        <button aria-pressed=${String(mode === 'check')} onClick=${() => sw('check')}>${ar ? 'الـ Checkboxes' : 'Checkboxes'}</button></div>
      <p className="qt" dir="ltr">What social media platform do you use most?</p>
      <div className=${'hf-hci6-list' + (mode === 'check' ? ' sq' : '')} dir="ltr">${items.map(p => html`<button key=${p} className=${p.startsWith('Other') ? 'oth' : ''} aria-pressed=${String(pick.includes(p))} onClick=${() => tap(p)}><span className="mk"></span>${p}</button>`)}</div>
      <p className="hf-hci6-cap">${T6(cap)}${oth ? T6(ar ? ' والـ <b>Other</b> بيخلّي الـ user يضيف category انت نسيتها (Be Unbiased).' : ' And <b>Other</b> lets a user add a category you forgot (Be Unbiased).') : ''}</p>
      <div className="hf-row"><button className="hf-btn" aria-pressed=${String(oth)} onClick=${() => { setOth(!oth); if (oth) setPick(pick.filter(x => !x.startsWith('Other'))); }}>${oth ? (ar ? 'شيل الـ Other' : 'Remove "Other"') : (ar ? html`زوّد <bdi dir="ltr">Other: ____</bdi>` : 'Add "Other: ____"')}</button>
        <span className="hf-score">${ar ? html`اخترت <bdi dir="ltr">${pick.length}</bdi>` : pick.length + ' picked'}</span></div>
    </div>`;
  }

  // Fix this survey question: which principle does it break? All fourteen are the slides' own "Don't ask this" questions.
  const PN = ['Clear', 'Concise', 'Specific', 'Expressive', 'Unbiased', 'Usable'];
  const PH = [
    ['<b>Be Clear</b> is about everyone reading the question one way: labelled scales, ranges that don\'t overlap, extra detail, a timebox.', 'الـ <b>Be Clear</b> بيخلّي كل الناس تقرا السؤال بنفس المعنى: scale عليه labels، و ranges مش متداخلة، وتفاصيل زيادة، وإطار زمني.'],
    ['<b>Be Concise</b> is plain language: the same question in fewer, simpler words.', 'الـ <b>Be Concise</b> يعني plain language: نفس السؤال بكلام أقل وأبسط.'],
    ['<b>Be Specific</b> splits a question that covers too much: a super-big idea, two things in one, or parts that can disagree.', 'الـ <b>Be Specific</b> بيقسّم السؤال اللي واخد أكتر من حقه: فكرة كبيرة أوي، أو حاجتين في واحد، أو أجزاء ممكن تختلف.'],
    ['<b>Be Expressive</b> gives users room: their own opinion, ranges instead of yes/no, levels, several selections.', 'الـ <b>Be Expressive</b> بيدّي الـ user مساحة: رأيه هو، و ranges بدل الـ yes/no، ومستويات، وأكتر من اختيار.'],
    ['<b>Be Unbiased</b> removes the push: add "Other", leave open questions open, no leading or loaded wording.', 'الـ <b>Be Unbiased</b> بيشيل أي زقّة: زوّد "Other"، وسيب السؤال المفتوح مفتوح، ومن غير leading ولا loaded.'],
    ['<b>Be Usable</b> is about the whole survey (progress bar, page lengths, order, alerts, preview), not one question\'s wording.', 'الـ <b>Be Usable</b> عن الـ survey كله (progress bar، طول الصفحات، الترتيب، التنبيهات، الـ preview)، مش عن صياغة سؤال واحد.']
  ];
  const FX = [
    ['scale', 0], ['ranges', 0],
    ['tablet', 0, { 3: ['Tempting: it is yes/no. But the slide files it under Be Clear and keeps Yes / No; the problem is the undefined words "tablet computer".', 'مغرية لأنه yes/no، بس الـ slide حاطّاه تحت Be Clear وسايبة الـ Yes / No زي ما هي؛ المشكلة إن كلمة "tablet computer" مش متعرّفة.'] }],
    ['timebox', 0, { 3: ['The answers are already levels. The slide fixes it with a timebox, "in the past seven days", under Be Clear.', 'الإجابات أصلًا مستويات. الـ slide بتصلّحه بإطار زمني، "في آخر 7 أيام"، تحت Be Clear.'] }],
    ['car', 1], ['big', 2], ['dbl', 2], ['food', 2],
    ['price', 3, { 4: ['It does lean one way, but the slide files it under Be Expressive: ask for the user\'s opinion (too high, too low, or about right).', 'فعلًا مايل لناحية، بس الـ slide حاطّاه تحت Be Expressive: اسأل عن رأي الـ user (غالي، رخيص، ولا مظبوط).'] }],
    ['yesno', 3], ['levels', 3],
    ['open', 4, { 3: ['Close, but the slide puts "leave potentially open-ended questions open" under Be Unbiased.', 'قريب، بس الـ slide حاطّة "سيب الأسئلة المفتوحة مفتوحة" تحت Be Unbiased.'] }],
    ['lead', 4], ['loaded', 4]
  ];
  function FixIt({ id }) {
    const ar = useAr();
    const [k, setK] = H.K.useSlot(id + ':k', 0);
    const [picks, setPicks] = H.K.useSlot(id + ':p', {});
    const [key, ans, trap] = FX[k], E = EX[key], p = picks[k];
    const done = j => picks[j] === FX[j][1];
    const n = FX.filter((_, j) => done(j)).length;
    const pick = j => setPicks(Object.assign({}, picks, { [k]: j }));
    const tr = p != null && trap && trap[p];
    return html`<div className="hf-hci6-fx hf-in">
      <div className="hf-hci6-nums" dir="ltr" role="group" aria-label=${ar ? 'الأسئلة' : 'Questions'}>${FX.map((_, j) => html`<button key=${j} aria-pressed=${String(j === k)} className=${done(j) ? 'dn' : ''} onClick=${() => setK(j)}>${j + 1}</button>`)}</div>
      <div className="hf-hci6-bad" key=${'q' + k}><span className="hf-hci6-lb">${ar ? 'السؤال الوحش:' : 'The bad question:'}</span>${Q(E.d)}</div>
      <div className="hf-hci6-pr" dir="ltr">${PN.map((nm, j) => html`<button key=${k + '-' + j} className=${p === j ? (j === ans ? 'ok' : 'no') : ''} aria-pressed=${String(p === j)} onClick=${() => pick(j)}>${nm}</button>`)}</div>
      <div className="hf-hci6-fb">
        ${p == null && html`<p className="hf-hci6-hint">${ar ? 'أنهي مبدأ السؤال ده بيكسره؟ لو غلطت، هنقولك المبدأ اللي اخترته بيتكلم عن إيه.' : 'Which principle does it break? If you miss, we\'ll tell you what the one you picked is about.'}</p>`}
        ${p != null && p !== ans && html`<p className="hf-hci6-no hf-in">${T6(tr ? (ar ? tr[1] : tr[0]) : (ar ? 'مش ده. ' + PH[p][1] : 'Not this one. ' + PH[p][0]))}</p>`}
        ${p === ans && html`<div className="hf-hci6-yes hf-in">${T6(ar ? 'صح، <b>Be ' + PN[ans] + '</b>: ' + E.r[1] : 'Right, <b>Be ' + PN[ans] + '</b>: ' + E.r[0])}<span className="lbl">${ar ? 'اسأل بدلها:' : 'Instead:'}</span><span className="fix" dir="ltr">${T6(E.i[0].join(' ') + (E.i[1].length ? ' (' + E.i[1].join(' / ').replace(/</g, '&lt;') + ')' : ''))}</span></div>`}
      </div>
      <div className="hf-row">
        <button className="hf-btn" onClick=${() => pick(ans)}>${ar ? 'ورّيني الإجابة' : 'Show me'}</button>
        ${k < FX.length - 1 && html`<button className="hf-btn solid" onClick=${() => setK(k + 1)}>${ar ? 'السؤال اللي بعده' : 'Next question'}</button>`}
        <span className="hf-score">${ar ? html`<bdi dir="ltr">${n} / ${FX.length}</bdi>` : n + ' / ' + FX.length}</span>
      </div>
    </div>`;
  }

  H.chapters.hci[6] = {
    title: 'How to Ask Good Survey Questions', kicker: 'Chapter 6', run: 'good survey questions',
    ar: { title: 'إزاي تسأل أسئلة survey كويسة', kicker: 'الفصل 6', run: 'أسئلة الـ survey' },
    pages(K, kit) {
      const { H1, H2, P, UL, Hand, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap, T } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => T(A ? ar : en);
      const lec = kit.course.lectures.find(l => l.n === 6);
      const arL = (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[6]) || {};
      const arQuiz = arL.quiz || [];
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      // the doctors' own questions (quiz items with src): this lecture has 13
      const q = re => { const i = lec.quiz.findIndex(x => x.src && re.test(strip(x.q))); return i < 0 ? {} : { q: lec.quiz[i], why: arQuiz[i] }; };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · before we start (faces the opener)
        page(html`
          <${H2}>${t('Before we start', 'قبل ما نبدأ')}</${H2}>
          <${P} small=${true}>${X('Last chapter met the <b>survey</b>: quick responses from a <b>large number of users</b>, often online, one of the <b>cheapest</b> research methods. Its tips: <b>keep it as small as possible</b>, ask the <b>minimum number of questions</b>, <b>be aware of bias</b>, get <b>feedback from participants</b>. This chapter zooms in on one question at a time: how to word it so its answer means something.',
            'الفصل اللي فات اتعرّفنا على الـ <b>survey</b>: ردود سريعة من <b>عدد كبير من الـ users</b>، ومن <b>أرخص</b> طرق البحث. ونصايحه: <b>خليه صغير على قد ما تقدر</b>، واسأل <b>أقل عدد أسئلة</b>، و<b>خلي بالك من الـ bias</b>، وخد <b>feedback من المشاركين</b>. الفصل ده عن السؤال نفسه: تكتبه إزاي عشان إجابته يبقى ليها معنى.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Do the exercises</b> on the page: check ranges, split questions, fix fourteen bad questions.', '<b>حل التمارين</b> على الصفحة: ranges وتقسيم أسئلة و 14 سؤال تصلّحهم.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are exam traps.', '<b>خلّي بالك!</b> دي فخاخ الامتحان.')}</span></div>
            <div className="row"><span className="mk">‡</span><span>${t('marks something the notes add that is not on the slides.', 'حاجة زوّدتها النوتس ومش في السلايدز.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Notes marked "ours" are our own analogies and examples.', 'الملاحظات اللي عليها "من عندنا" تشبيهات وأمثلة مننا.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('Our example: a survey asks "From 1 to 5, rate this course." You answer <b>4</b>. Is 4 good or bad? How would the person reading your answer know?',
            'مثال من عندنا: survey بيسألك:<span class="ltr">"From 1 to 5, rate this course."</span>وإنت جاوبت <b>4</b>. الـ 4 دي حلوة ولا وحشة؟ واللي هيقرا إجابتك هيعرف إزاي؟')}</p></${Box}>
        `, { sec: t('Before we start', 'قبل ما نبدأ') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">6</span><span className="t">${A ? html`الفصل السادس<br/>HCI` : html`Chapter six<br/>HCI`}</span></div>
            <${Gap} h=${8} /><${H1}>${t('Ask a Better Question', 'اسأل سؤال أحسن')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('how to ask good survey questions', 'إزاي تسأل أسئلة survey كويسة')}</p></div>
          <${P}>${X('A survey can reach a thousand people by tonight. If the question is fuzzy, you get a thousand fuzzy answers.',
            'الـ survey ممكن يوصل لألف واحد قبل بالليل. ولو السؤال مش واضح، هيجيلك ألف إجابة مش واضحة.')}</${P}>
          <${Talk} who="dev">${t('I wrote my survey in ten minutes. Done!', 'أنا كتبت الـ survey بتاعي في عشر دقايق. خلصت!')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('Let me read it with six checks: is each question <b>Clear</b>? <b>Concise</b>? <b>Specific</b>? <b>Expressive</b>? <b>Unbiased</b>? And is the survey <b>Usable</b>?',
            'استنى أقراه بست أسئلة: كل سؤال <b>واضح</b>؟ <b>مختصر</b>؟ <b>محدد</b>؟ بيخلّي الـ user <b>يعبّر</b>؟ <b>محايد</b>؟ والـ survey كله <b>سهل الاستخدام</b>؟')}</${Talk}>
          <${P} small=${true}>${X('Each principle comes with the slides\' <b>"Don\'t ask this… / Instead, ask this…"</b> examples. We take them one by one, then you fix bad questions yourself.',
            'كل مبدأ معاه أمثلة من السلايدز بتقول <b>متسألش كده… واسأل كده بدلها…</b>. هناخدهم واحد واحد، وبعدين إنت اللي هتصلّح الأسئلة الوحشة.')}</${P}>
        `, { sec: t('Meet the six principles', 'اتعرّف على الـ 6 مبادئ') }),

        // 2 · six principles
        page(html`
          <${H1}>${t('Six principles', '6 مبادئ')}</${H1}>
          <${Six} />
          <${Grow} />
          <${P} small=${true}>${X('‡ The notes add that examiners often ask you to <b>evaluate a question</b> with these six.', '‡ النوتس بتزوّد إن الممتحنين كتير بيطلبوا منك <b>تقيّم سؤال</b> بالـ 6 دول.')}</${P}>
        `, { sec: t('The six principles', 'الـ 6 مبادئ') }),

        // 3 · figure: six principles
        page(html`
          <${H2}>${t("Don't ask this… ask this instead", 'متسألش كده… اسأل كده بدلها')}</${H2}>
          <${Hand} tilt=${true}>${t('Ours: two Cs, an S, an E, two Us. Clear, Concise, Specific, Expressive, Unbiased, Usable.', 'من عندنا: اتنين C، وواحد S، وواحد E، واتنين U.')}</${Hand}>
          <${Fig} name="hc-six-principles" />
        `),

        // 4 · Be Clear 1
        page(html`
          <${H1}>${t('Be Clear', 'خليك واضح')}</${H1}>
          <${P} small=${true}>${X('Four rules, all about one thing: every respondent reads the question, and its answers, the same way. First two:',
            'أربع قواعد، وكلهم عن حاجة واحدة: كل اللي بيجاوبوا يقروا السؤال وإجاباته بنفس المعنى. أول اتنين:')}</${P}>
          <${Pair} x="scale" />
          <${Pair} x="ranges" />
        `, { sec: t('Be Clear', 'خليك واضح (Be Clear)') }),

        // 5 · Be Clear 2
        page(html`
          <${P} small=${true}>${t('…and the other two:', '…والاتنين التانيين:')}</${P}>
          <${Pair} x="tablet" />
          <${Pair} x="timebox" />
        `),

        // 6 · figure: ranges
        page(html`
          <${H2}>${t('Try a value: 2, 5, 10, 20', 'جرّب قيمة: 2 و 5 و 10 و 20')}</${H2}>
          <${Fig} name="hc-clear-ranges" />
        `),

        // 7 · sort: overlap or OK
        page(html`
          <${Box} kind="pencil" title=${t('Be the range checker', 'إنت اللي بتشيّك على الـ ranges')}><p className="hf-p small">${X('Count whole numbers. Tap <b>OK</b> if every number fits exactly one answer, or <b>x2</b> if some number fits two.',
            'عدّ بأرقام صحيحة. دوس <b>OK</b> لو كل رقم ليه إجابة واحدة بالظبط، أو <b>x2</b> لو فيه رقم ينفع في إجابتين.')}</p></${Box}>
          <${Sort} id="rg" bins=${[['OK', t('Every number fits one answer', 'كل رقم ليه إجابة واحدة')], ['x2', t('Some number fits two answers', 'فيه رقم ينفع في إجابتين')]]} items=${A ? [
            ['الـ Hulu بتاع الـ slide:<span class="ltr">0-2, 2-5, 5-10, 10-20, 20+</span>', 1],
            ['الـ Hulu بعد التصليح:<span class="ltr">0-2, 3-5, 6-10, 11-19, 20+</span>', 0],
            ['اختيارات أقصر:<span class="ltr">0-5, 5-10, 10+</span>', 1],
            ['الـ timebox زي ما هو في الـ slide:<span class="ltr">0 / 1-2 / 3-4 / 5-7 / 7 or more</span>', 1],
            ['الـ timebox بعد التصليح:<span class="ltr">0 / 1-2 / 3-4 / 5-6 / 7 or more</span>', 0],
            ['من عندنا:<span class="ltr">1-3, 4-6, 7-9, 10+</span>', 0],
            ['من عندنا:<span class="ltr">0-10, 10-20, 20-30, 30+</span>', 1]
          ] : [
            ["The slide's Hulu set: 0-2, 2-5, 5-10, 10-20, 20+", 1],
            ['The fixed Hulu set: 0-2, 3-5, 6-10, 11-19, 20+', 0],
            ['A shorter set: 0-5, 5-10, 10+', 1],
            ["The slide's timebox: 0 / 1-2 / 3-4 / 5-7 / 7 or more", 1],
            ['The timebox, fixed: 0 / 1-2 / 3-4 / 5-6 / 7 or more', 0],
            ['Ours: 1-3, 4-6, 7-9, 10+', 0],
            ['Ours: 0-10, 10-20, 20-30, 30+', 1]
          ]} />
        `, { sec: t('Exercise: the range checker', 'تمرين: شيّك على الـ ranges') }),
        page(html`
          <${H2}>${X('Overlaps, and the word "Rarely"', 'التداخل، وكلمة <bdi dir="ltr">"Rarely"</bdi>')}</${H2}>
          <${Box} kind="watch"><p className="hf-p small">${X('The slide\'s own timebox answers read <b>5-7</b> and <b>7 or more</b>: someone who exercised 7 times fits both, so the slide breaks its own "avoid overlapping ranges" rule. Write <b>5-6</b>.',
            'إجابات الـ timebox في الـ slide نفسها مكتوبة كده:<span class="ltr">0 / 1-2 / 3-4 / 5-7 / 7 or more</span>واللي اتمرّن 7 مرات ينفع في الاتنين، يعني الـ slide كسرت قاعدة الـ ranges المتداخلة بتاعتها هي. اكتبها <bdi dir="ltr">5-6</bdi>.')}</p></${Box}>
          <${Hand} red=${true}>${t("Ours, not the slides': with whole numbers, each range must start one above where the last one ended.", 'نصيحة من عندنا: بالأرقام الصحيحة، كل range لازم يبدأ بعد آخر رقم في اللي قبله بواحد.')}</${Hand}>
          <${Grow} />
          <${Talk} who="bug">${X('"Rarely" for me is once a month. For you it\'s twice a week. Same box! That\'s why the slide wants a timebox.', 'كلمة "Rarely" عندي يعني مرة في الشهر، وعندك مرتين في الأسبوع، ونفس الاختيار! وعشان كده الـ slide عايزة إطار زمني.')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${X('"In the past seven days, how many times…" Now everyone counts the same week.', 'سؤال "في آخر 7 أيام، كام مرة…" وكده كل الناس بتعدّ نفس الأسبوع.')}</${Talk}>
        `),

        // 8 · Be Concise
        page(html`
          <${H1}>${t('Be Concise', 'خليك مختصر')}</${H1}>
          <${Pair} x="car" />
          <${Talk} who="bug">${X('Sixteen words, and all I mean is "How clean was the car?" Five words. Same three answers.', 'ستاشر كلمة، وكل اللي أقصده <bdi dir="ltr">"How clean was the car?"</bdi>، يعني خمس كلمات. ونفس التلات إجابات.')}</${Talk}>
          <${Grow} />
          <${Hand} red=${true}>${t("Ours, not the slides': if you'd never say it out loud to a friend, rewrite it.", 'نصيحة من عندنا: لو عمرك ما هتقولها لصاحبك بصوت عالي، اكتبها تاني.')}</${Hand}>
          <${Box} kind="brain"><p className="hf-p small">${X('A wrong option in one exam question: "Using technical language to test user knowledge". Which principle does it break?',
            'اختيار غلط في سؤال امتحان: إنك تستخدم لغة technical عشان تختبر معلومات الـ user. ده بيكسر أنهي مبدأ؟')}</p></${Box}>
        `, { sec: t('Be Concise', 'خليك مختصر (Be Concise)') }),

        // 9 · Be Specific 1
        page(html`
          <${H1}>${t('Be Specific', 'خليك محدد')}</${H1}>
          <${P} small=${true}>${X('Three ways a question tries to swallow too much. The first two:', 'تلات طرق السؤال بيحاول يبلع فيها أكتر من حقه. أول اتنين:')}</${P}>
          <${Pair} x="big" />
          <${Pair} x="dbl" />
        `, { sec: t('Be Specific', 'خليك محدد (Be Specific)') }),

        // 10 · Be Specific 2: split it
        page(html`
          <${H2}>${t('…and internal conflict. Split them all!', '…والـ internal conflict. قسّمهم كلهم!')}</${H2}>
          <${P} small=${true}>${X('The third rule: <b>avoid questions that allow internal conflict</b>. "How satisfied were you with your food?" becomes three questions.',
            'القاعدة التالتة: <b>ابعد عن الأسئلة اللي فيها internal conflict</b>. سؤال الأكل بيبقى تلات أسئلة.')}</${P}>
          <${Splitter} id="sp" />
        `),

        // 11 · dumb questions on Be Specific
        page(html`
          <${Dumb} qa=${A ? [
            ['الـ double-barrel والـ super-big idea والـ internal conflict، مش هما نفس الحاجة؟', 'التلاتة تحت Be Specific، والحل دايمًا أسئلة أضيق، بس أمثلة الـ slides مختلفة: الـ <b>double-barrel</b> فيه <b>حاجتين</b> في سؤال (الـ speed <b>و</b>الـ availability)، والـ <b>super-big idea</b> بيسأل عن حاجة <b>واسعة أوي</b> (الـ interface كله)، والـ <b>internal conflict</b> بيسأل عن حاجة واحدة <b>أجزاءها ممكن تاخد إجابات مختلفة</b> (الأكل: الحرارة والشكل والطعم).'],
            ['إزاي أعرف الـ double-barrel بسرعة؟', 'من عندنا: دوّر على "and" بتربط حاجتين ينفع كل واحدة فيهم تتقيّم لوحدها.'],
            ['التقسيم بيطوّل الـ survey. مش ده ضد "خليه صغير على قد ما تقدر"؟', 'محاضرة 5 قالت اسأل <b>أقل عدد أسئلة يجيبلك الداتا اللي محتاجها</b>. وقراءتنا إحنا: إجابة سؤال الـ double-barrel مش هتعرف تستخدمها، لأنك مش عارف الـ user كان بيقيّم أنهي نص.']
          ] : [
            ['Double-barrel, super-big idea, internal conflict: aren\'t they the same thing?', 'All three are Be Specific and the fix is always narrower questions, but the slides\' examples differ: <b>double-barrel</b> puts <b>two things</b> in one question (speed <i>and</i> availability); a <b>super-big idea</b> asks about something <b>too broad</b> (the whole interface); <b>internal conflict</b> asks about one thing whose <b>parts can get different answers</b> (food: temperature, appearance, flavor).'],
            ['How do I spot a double-barrel question fast?', 'Ours: look for an "and" joining two things you could rate separately.'],
            ['Splitting makes my survey longer. Doesn\'t that break "keep it as small as possible"?', 'Lecture 5 says ask the <b>minimum number of questions to get the data you need</b>. Our reading: a double-barrel answer is data you can\'t use, because you can\'t tell which half the user was rating.']
          ]} />
        `),

        // 12 · Be Expressive 1
        page(html`
          <${H1}>${t('Be Expressive', 'خلّي الـ user يعبّر')}</${H1}>
          <${P} small=${true}>${X('Give the user room to say what they really think. Four rules; the first two:', 'ادّي الـ user مساحة يقول رأيه الحقيقي. أربع قواعد، أول اتنين:')}</${P}>
          <${Pair} x="price" />
          <${Pair} x="yesno" />
        `, { sec: t('Be Expressive', 'خلّي الـ user يعبّر (Be Expressive)') }),

        // 13 · Be Expressive 2
        page(html`
          <${Pair} x="levels" />
          <${P} small=${true}>${X('And the fourth: <b>allow multiple selections when possible</b>, checkboxes instead of radio buttons. Try both:',
            'والرابعة: <b>اسمح بأكتر من اختيار لما ينفع</b>، يعني checkboxes بدل radio buttons. جرّب الاتنين:')}</${P}>
          <${PickMany} id="pm" />
        `),

        // 14 · figure: expressive
        page(html`
          <${H2}>${t('Be Expressive: before and after', 'الـ Be Expressive: قبل وبعد')}</${H2}>
          <${Fig} name="hc-expressive" />
        `),

        // 15 · watch it: yes/no
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('Exam favourite: true/false about <b>yes/no questions</b>. The lecture\'s line is simple: a yes/no answer gives little information, so <b>use ranges instead</b>. Any statement that praises yes/no questions is False.',
            'سؤال بيحبّه الامتحان: صح وغلط عن الأسئلة بتاعة <bdi dir="ltr">yes/no</bdi>. كلام المحاضرة بسيط: إجابة الـ <bdi dir="ltr">yes/no</bdi> بتدّي معلومات قليلة، فـ<b>استخدم ranges بدلها</b>. وأي جملة بتشكر في الـ <bdi dir="ltr">yes/no</bdi> تبقى غلط.')}</p></${Box}>
          ${mq('y1', /provide detailed insights/)}
        `),
        page(html`
          ${mq('y2', /useful for collecting qualitative/)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${X('Qualitative means <b>why and how</b> (Lecture 5). A yes/no answer tells you neither.', 'الـ qualitative يعني <b>ليه وإزاي</b> (محاضرة 5). وإجابة الـ <bdi dir="ltr">yes/no</bdi> مش بتقولك ده ولا ده.')}</${Talk}>
        `),
        page(html`
          ${mq('y3', /always include a mix/)}
          <${Grow} />
          <${Talk} who="dev">${X('"Always mix in yes/no"? The lecture says replace them with ranges. False!', 'لازم نحط <bdi dir="ltr">yes/no</bdi> دايمًا؟ المحاضرة بتقول بدّلهم بـ ranges. يبقى غلط!')}</${Talk}>
        `),

        // 16 · Be Unbiased 1
        page(html`
          <${H1}>${t('Be Unbiased', 'خليك محايد')}</${H1}>
          <${Pair} x="other" />
          <${Pair} x="open" />
        `, { sec: t('Be Unbiased', 'خليك محايد (Be Unbiased)') }),

        // 17 · Be Unbiased 2
        page(html`
          <${P} small=${true}>${t('…and the two troublemakers:', '…والاتنين المشاغبين:')}</${P}>
          <${Pair} x="lead" />
          <${Pair} x="loaded" />
          <${Grow} />
          <${Hand} red=${true}>${t('A leading question pushes toward an answer. A loaded question carries a judgment word.', 'الـ leading بيزقّك لإجابة، والـ loaded جواه كلمة فيها حكم.')}</${Hand}>
        `),

        // 18 · fireside chat
        page(html`
          <${Fireside} sub=${t("Tonight: Leading Question and Loaded Question, both banned under Be Unbiased, argue about who misleads better.", 'الليلة: سؤالين ممنوعين تحت مبدأ Be Unbiased بيتخانقوا مين فيهم بيضلّل أحسن.')} />
          <${Chat} names=${A ? ['الـ Leading', 'الـ Loaded'] : ['Leading Question', 'Loaded Question']} lines=${A ? [
            [0, 'أنا بشكر في المنتج جوه السؤال نفسه: بقول إن الـ interface جديد و AI-based، وإن الـ recommendations بقت أحسن. وإجاباتي يا <bdi dir="ltr">Yes!</bdi> يا وش زعلان. مين هيختار الوش الزعلان؟'],
            [1, 'هواة. أنا محتاج كلمة واحدة بس، كلمة <bdi dir="ltr">"wasted"</bdi>. الحكم جوايا من الأول.'],
            [0, 'ما إنت مجرد كلمة. وحلّك كلمة واحدة برضه، <bdi dir="ltr">"spent"</bdi>.'],
            [1, 'وحلّك إنت سؤال جديد خالص، عن الرضا عن الـ recommendations، وإجاباته تلات مستويات من Dissatisfied لـ Satisfied.'],
            [0, 'ماشي. بس إحنا من نفس العيلة.'],
            [1, 'أيوه، الاتنين بنزقّ الـ user بدل ما نسمعه.']
          ] : [
            [0, 'I praise the product right inside the question: "brand-new AI-based", "better". And look at my answers: Yes! or No :( . Who picks the sad face?'],
            [1, 'Amateur. I need one word: "wasted". The judgment is already in me.'],
            [0, "You're just a word. Your fix is one word too: \"spent\"."],
            [1, "And yours is a whole new question: how satisfied were you with the recommendations, Dissatisfied, Neutral or Satisfied."],
            [0, 'Fine. We are the same family, though.'],
            [1, 'Yes: we both push the user instead of hearing them.']
          ]} />
        `, { sec: t('Fireside: leading vs loaded', 'دردشة: الـ leading والـ loaded') }),

        // 19 · watch it: be biased
        page(html`
          <${Box} kind="watch"><p className="hf-p small">${X('A 2024/25 paper says "<b>Be biased</b> is an important point for a good survey", and its answer sheet marks it <b>True</b>, which looks like a typo for "unbiased". Answer from the lecture: the principle is <b>Be Unbiased</b>, so as written it is <b>False</b>.',
            'امتحان <bdi dir="ltr">2024/25</bdi> فيه الجملة دي:<span class="ltr">"Be biased" is an important point for a good survey.</span>والـ answer sheet بتاعته حاطة <b>True</b>، وده شكله typo والمقصود unbiased. جاوب من المحاضرة: المبدأ هو <b>Be Unbiased</b>، فالجملة زي ما هي مكتوبة <b>False</b>.')}</p></${Box}>
          ${mq('b1', /"Be biased" is an important/)}
        `),
        page(html`
          ${mq('b2', /What should be avoided when writing/)}
          <${Grow} />
          <${Talk} who="lens">${X('Leading and loaded wording: avoid. Consistent format, logical order, neutral wording: keep.', 'الصياغة الـ leading والـ loaded: ابعد عنها. والشكل الثابت والترتيب المنطقي والكلام المحايد: خليهم.')}</${Talk}>
        `),

        // 20 · Be Usable
        page(html`
          <${H1}>${t('Be Usable', 'خلّي الـ survey سهل الاستخدام')}</${H1}>
          <${P} small=${true}>${X('The last principle has no "Don\'t ask this". It is about the <b>survey as a whole</b>:', 'آخر مبدأ مفيهوش "متسألش كده". ده عن <b>الـ survey كله</b>:')}</${P}>
          <ol className="hf-hci6-ol hf-in">${(A ? ['حط <b>progress bar</b>.', 'خلّي <b>أطوال الصفحات ثابتة</b>.', '<b>رتّب الأسئلة بشكل منطقي</b>.', '<b>نبّه الـ users على الأسئلة اللي متجاوبتش</b>.', '<b>اعمل preview للـ survey بنفسك</b>.']
            : ['Provide a <b>progress bar</b>.', 'Make your <b>page lengths consistent</b>.', '<b>Order your questions logically</b>.', '<b>Alert users about unanswered questions</b>.', '<b>Preview the survey yourself</b>.']).map((x, k) => html`<li key=${k} className="hf-in" style=${{ animationDelay: calm() ? '0s' : k * 0.12 + 's' }}><i>${k + 1}</i><span>${T(x)}</span></li>`)}</ol>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Which is part of Be Usable?" Plain language (Concise), double-barrel (Specific) and loaded words (Unbiased) are not. Only these five are.',
            'لو اتسألت أنهي حاجة من الـ Be Usable: الـ plain language (Concise) والـ double-barrel (Specific) والكلمات الـ loaded (Unbiased) مش منه. بس الخمسة دول.')}</p></${Box}>
        `, { sec: t('Be Usable', 'سهل الاستخدام (Be Usable)') }),

        // 21 · figure: usable survey
        page(html`
          <${H2}>${t('Turn on each tip, then take the survey', 'شغّل كل نصيحة، وبعدين جاوب الـ survey')}</${H2}>
          <${Fig} name="hc-usable-survey" />
        `),

        // 22 · interview with a progress bar
        page(html`
          <${Interview} title=${t('The Progress Bar, exposed', 'الـ Progress Bar على المكشوف')} sub=${t("This week's interview: tip number 1 of Be Usable.", 'حوار الأسبوع: النصيحة رقم 1 في الـ Be Usable.')} lines=${A ? [
            ['المذيع', 'إنت أول واحد في لستة الـ Be Usable. فخور؟'],
            ['الـ Progress Bar', 'جدًا. أنا بورّي الـ user هو وصل لحد فين.'],
            ['المذيع', 'ومين زمايلك؟'],
            ['الـ Progress Bar', 'أطوال صفحات ثابتة، وترتيب منطقي للأسئلة، وتنبيه على الأسئلة اللي متجاوبتش، والـ preview.'],
            ['المذيع', 'الترتيب المنطقي بيفيد بإيه؟'],
            ['الـ Progress Bar', 'إجابة الامتحان بتقول إنه بيساعد الناس <b>يجاوبوا بسهولة وبشكل ثابت</b>.'],
            ['المذيع', 'والـ preview؟'],
            ['الـ Progress Bar', 'دي النصيحة اللي ليك إنت مش للـ user: جرّب الـ survey بنفسك الأول. وإجابة الامتحان بتقول إن اختبار الـ survey قبل ما تبعته بيمسك <b>الأسئلة اللي مش واضحة أو مش محددة</b>.']
          ] : [
            ['Head First', "You're first on the Be Usable list. Proud?"],
            ['Progress Bar', 'Very. I show users how far they have got.'],
            ['Head First', 'Who are your teammates?'],
            ['Progress Bar', 'Consistent page lengths, a logical question order, alerts about unanswered questions, and the preview.'],
            ['Head First', 'What does a logical order buy?'],
            ['Progress Bar', 'The exam\'s key says it helps respondents <b>answer easily and consistently</b>.'],
            ['Head First', 'And the preview?'],
            ['Progress Bar', 'That tip is for you, not the user: go through the survey yourself first. The exam\'s key says testing a survey before you send it catches <b>unclear or unspecific questions</b>.']
          ]} />
          <${Grow} />
          <${Talk} who="dev">${t('Five tips, all about the whole survey. Got it.', 'خمس نصايح، وكلهم عن الـ survey كله. فهمت.')}</${Talk}>
        `),

        // 23 · sort: usable or not
        page(html`
          <${Box} kind="pencil"><p className="hf-p small">${X('Tap <b>U</b> if the tip is on the <b>Be Usable</b> list, or <b>O</b> if it belongs to <b>another principle</b>. Then check.',
            'دوس <b>U</b> لو النصيحة من لستة الـ <b>Be Usable</b>، أو <b>O</b> لو تبع <b>مبدأ تاني</b>. وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="us" bins=${[['U', 'Be Usable'], ['O', t('Another principle', 'مبدأ تاني')]]} items=${A ? [
            ['حط progress bar', 0], ['اسأل بلغة بسيطة', 1], ['خلّي أطوال الصفحات ثابتة', 0], ['ابعد عن الـ double-barrel questions', 1], ['رتّب الأسئلة بشكل منطقي', 0],
            ['ابعد عن كلمة زي "wasted"', 1], ['نبّه على الأسئلة اللي متجاوبتش', 0], ['حط labels للـ numeric scale', 1], ['اعمل preview للـ survey بنفسك', 0]
          ] : [
            ['Provide a progress bar', 0], ['Ask questions in plain language', 1], ['Make your page lengths consistent', 0], ['Avoid double-barrel questions', 1], ['Order your questions logically', 0],
            ['Avoid words like "wasted"', 1], ['Alert users about unanswered questions', 0], ['Label a numeric scale', 1], ['Preview the survey yourself', 0]
          ]} />
        `, { sec: t('Exercise: Usable or not?', 'تمرين: Usable ولا لأ؟') }),

        // 24 · mcq: logical order
        page(html`
          <${H2}>${t('Why bother ordering?', 'ليه نرتّب؟')}</${H2}>
          ${mq('lo', /logical question order/)}
          <${Grow} />
          <${Hand} red=${true}>${t('Every wrong option here says the tip hurts the survey. A Be Usable tip never does.', 'كل الاختيارات الغلط هنا بتقول إن النصيحة بتضر الـ survey، ونصايح الـ Be Usable عمرها ما بتضر.')}</${Hand}>
          <${Talk} who="lens" flip=${true}>${X('And you can see it in the figure: turn on "Order your questions logically" and the topics stop jumping around.', 'وتقدر تشوفها في الرسمة: شغّل نصيحة <bdi dir="ltr">"Order your questions logically"</bdi> والمواضيع هتبطّل تنط.')}</${Talk}>
        `),

        // 25 · fix this survey question
        page(html`
          <${H2}>${t('Fix this survey question', 'صلّح سؤال الـ survey ده')}</${H2}>
          <${P} small=${true}>${X('Fourteen bad questions, every one from the slides. Pick the principle each breaks, and see the slide\'s fix.',
            '14 سؤال وحش، وكلهم من السلايدز. اختار المبدأ اللي كل واحد بيكسره، وشوف التصليح بتاع الـ slide.')}</${P}>
          <${FixIt} id="fx" />
        `, { sec: t('Exercise: fix the question', 'تمرين: صلّح السؤال') }),

        // 26 · match: name the problem
        page(html`
          <${H2}>${t('Name that problem', 'سمّي المشكلة')}</${H2}>
          <${P} small=${true}>${t('Tap a name, then the slide example that shows it.', 'دوس على الاسم، وبعدين على المثال من الـ slide اللي بيوضّحه.')}</${P}>
          <${Match} id="nm" left=${A ? ['سؤال double-barrel', 'سؤال leading', 'سؤال loaded', 'تعارض داخلي', 'فكرة كبيرة أوي', 'إضافة nominal category']
            : ['Double-barrel', 'Leading question', 'Loaded question', 'Internal conflict', 'Super-big idea', 'Adding a nominal category']}
            right=${A ? ['سؤال الرضا عن الأكل', 'زوّد اختيار Other للستة بتاعة الـ platforms', 'سؤال عن الـ speed والـ availability بتوع الـ connection', 'كلمة wasted في سؤال الـ social media', 'سؤال الرضا عن الـ interface كله', 'سؤال عن الـ AI-based interface الجديد والـ recommendations الأحسن']
              : ['"How satisfied were you with your food?"', 'Add "Other: ____" to the list of platforms', '"…the speed and availability of your mobile connection?"', '"…how much time have you wasted on social media?"', '"How satisfied were you with the interface?"', '"Did our brand-new AI-based interface generate better recommendations?"']}
            answer=${[2, 5, 3, 0, 4, 1]} />
        `),

        // 27 · the slide's exercise
        page(html`
          <${H1}>${t("The slide's own exercise", 'تمرين الـ slide نفسها')}</${H1}>
          <${P} small=${true}>${t('"Evaluate these survey questions":', 'قيّم أسئلة الـ survey دي:')}</${P}>
          <p className="hf-hci6-quote hf-in"><b>1</b>On a scale of 1 to 4 with 1 meaning 'a lot' and 4 meaning 'not at all', how much do you enjoy exercising?</p>
          <p className="hf-hci6-quote hf-in"><b>2</b>Why do you like to exercise?</p>
          <p className="hf-hci6-quote hf-in"><b>3</b>On a scale of 1 to 6 with 1 meaning 'not at all' and 6 meaning 'a lot', how much do you like audiobooks?</p>
          <p className="hf-hci6-quote hf-in"><b>4</b>Have you listened to an audiobook this year?</p>
          <${P} small=${true}>${t('Next to them the slide lists five problems:', 'وجنبهم الـ slide كاتبة 5 مشاكل:')}</${P}>
          <div className="hf-hci6-chips hf-in" dir="ltr">${['Ambiguous scale', 'Changing number of options', 'Reversing scale', 'Leading questions', 'Yes/no questions'].map(c => html`<span key=${c}>${c}</span>`)}</div>
          <${Grow} />
          <${Hand} red=${true}>${t("The slide doesn't say which problem goes with which question. The matching on the next pages is the notes' reading.", 'الـ slide مش قايلة أنهي مشكلة تبع أنهي سؤال، والتوصيل اللي في الصفحات الجاية ده قراءة النوتس.')}</${Hand}>
        `, { sec: t('Exercise: evaluate the questions', 'تمرين: قيّم الأسئلة') }),

        // 28 · figure: evaluate
        page(html`
          <${Fig} name="hc-evaluate-questions" />
        `),

        // 29 · the reading, and our fix
        page(html`
          <${H2}>${t("The notes' reading", 'قراءة النوتس')}</${H2}>
          <${UL} items=${A ? [
            'السؤال <b>1</b> فيه <b>scale مش واضح ومعكوس</b>: الـ 1 معناها <bdi dir="ltr">"a lot"</bdi> والـ 4 معناها <bdi dir="ltr">"not at all"</bdi>.',
            'السؤال <b>2</b> ده <b>leading question</b>: بيفترض إنك بتحب التمرين.',
            'السؤال <b>3</b> فيه <b>عدد options بيتغير</b> (<bdi dir="ltr">4</bdi> ضد <bdi dir="ltr">6</bdi>) و<b>scale معكوس</b> مقارنة بالسؤال 1.',
            'السؤال <b>4</b> ده <b>سؤال <bdi dir="ltr">yes/no</bdi></b>: استخدم ranges.'
          ] : [
            'Question <b>1</b> has an <b>ambiguous / reversed scale</b>: 1 means "a lot", 4 means "not at all".',
            'Question <b>2</b> is a <b>leading question</b>: it assumes you like exercising.',
            'Question <b>3</b> <b>changes the number of options</b> (4 vs 6) and <b>reverses the scale</b> compared with question 1.',
            'Question <b>4</b> is a <b>yes/no question</b>: use ranges.'
          ]} />
          <${Grow} />
          <${Box} kind="relax" title=${t('Our fix, not the slides\'', 'تصليح من عندنا')}><p className="hf-p small">${X('Apply the lecture\'s own rules: <b>one scale for the whole survey</b>, same number of options, same direction, every point <b>labelled</b> (Be Clear). For 2, don\'t assume: a timeboxed count like the slide\'s "In the past seven days, how many times have you exercised?". For 4, ranges (Be Expressive).',
            'طبّق قواعد المحاضرة نفسها: <b>scale واحد للـ survey كله</b>، بنفس عدد الـ options ونفس الاتجاه، وكل نقطة عليها <b>label</b> (Be Clear). وفي السؤال 2 متفترضش حاجة: اسأل عدد بإطار زمني زي سؤال الـ slide عن التمرين في آخر 7 أيام. وفي السؤال 4 استخدم ranges (Be Expressive).')}</p></${Box}>
        `),

        // 30 · exam corner 1
        page(html`
          <${Box} kind="exam" title=${t('Exam corner', 'ركن الامتحان')}><p className="hf-p small">${X("This lecture has <b>13</b> of the doctors' questions. Six were on earlier pages; here are the other six (one comes up twice in the papers). Tap an answer to see why.",
            'المحاضرة دي ليها <b>13</b> سؤال من أسئلة الدكاترة. ستة شفناهم في صفحات قبل كده، ودول الستة الباقيين (وفيه سؤال متكرر مرتين). دوس على إجابة عشان تعرف السبب.')}</p></${Box}>
          ${mq('e1', /accurate user feedback/)}
          <${Grow} />
          <${Hand} red=${true}>${t('The repeat of this question lists the same options in another order. Same answer: clear and unbiased wording.', 'النسخة التانية من السؤال ده نفس الاختيارات بترتيب تاني، ونفس الإجابة: صياغة واضحة ومحايدة.')}</${Hand}>
        `, { sec: t('Exam corner', 'ركن الامتحان') }),
        page(html`
          ${mq('e2', /Why do you like to exercise/)}
          <${Grow} />
          <${Talk} who="bug">${X('"Why do you like…" I decided you like it before you answered.', 'سؤال "Why do you like…" أنا قرّرت إنك بتحبه قبل ما تجاوب.')}</${Talk}>
        `),
        page(html`
          ${mq('e3', /best summarizes a good survey/)}
          <${Grow} />
          <${Hand} red=${true}>${t("Short, clear, unbiased, and feedback from participants: Lecture 5's tips and this lecture's principles in one line.", 'قصير وواضح ومحايد، و feedback من المشاركين: نصايح محاضرة 5 ومبادئ المحاضرة دي في سطر واحد.')}</${Hand}>
        `),
        page(html`
          ${mq('e4', /most important when designing an HCI survey/)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${X('Clarity and simplicity: <b>Be Clear</b> and <b>Be Concise</b>.', 'الوضوح والبساطة: يعني <b>Be Clear</b> و<b>Be Concise</b>.')}</${Talk}>
        `),
        page(html`
          ${mq('e5', /important when designing a good survey/)}
          <${Grow} />
          <${Hand} red=${true}>${t('"Asking multiple things in one question" is a double-barrel question, not a tip.', '"إنك تسأل عن كذا حاجة في سؤال واحد" ده double-barrel، مش نصيحة.')}</${Hand}>
        `),
        page(html`
          ${mq('e6', /test a survey before distributing/)}
          <${Grow} />
          <${Talk} who="dev">${t('Preview it myself, before anyone else sees it.', 'أعمله preview بنفسي، قبل ما حد تاني يشوفه.')}</${Talk}>
        `),

        // 34 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'الـ <b>6 مبادئ</b>: Clear و Concise و Specific و Expressive و Unbiased و Usable.',
            'مبدأ <b>Clear</b>: حط labels للـ scale، و ranges مش متداخلة (<bdi dir="ltr">0-2, 3-5, 6-10, 11-19, 20+</bdi>)، وتفاصيل زيادة، وإطار زمني ("في آخر 7 أيام").',
            'مبدأ <b>Concise</b>: لغة بسيطة، زي سؤال العربية اللي بقى خمس كلمات.',
            'مبدأ <b>Specific</b>: لا super-big ideas ولا double-barrel ولا internal conflict. قسّم.',
            'مبدأ <b>Expressive</b>: رأي الـ user، و ranges بدل الـ <bdi dir="ltr">yes/no</bdi>، ومستويات موافقة، و checkboxes.',
            'مبدأ <b>Unbiased</b>: زوّد <bdi dir="ltr">"Other: ____"</bdi>، وسيب السؤال المفتوح مفتوح، ولا leading ولا loaded، وقول spent بدل wasted.',
            'مبدأ <b>Usable</b>: حط progress bar، وصفحات ثابتة الطول، وترتيب منطقي، وتنبيه على اللي متجاوبش، و preview بنفسك.',
            'التمرين: الـ ambiguous scale، وعدد options بيتغير، والـ scale المعكوس، والـ leading، والـ <bdi dir="ltr">yes/no</bdi>.'
          ] : [
            'The <b>six principles</b>: Clear, Concise, Specific, Expressive, Unbiased, Usable.',
            '<b>Clear</b>: label scales, no overlapping ranges (0-2, 3-5, 6-10, 11-19, 20+), extra detail, a timebox ("in the past seven days").',
            '<b>Concise</b>: plain language: "How clean was the car?"',
            '<b>Specific</b>: no super-big ideas, no double-barrel, no internal conflict. Split.',
            '<b>Expressive</b>: the user\'s opinion, ranges not yes/no, levels of agreement, checkboxes.',
            '<b>Unbiased</b>: add "Other: ____", leave open questions open, no leading or loaded wording ("spent", not "wasted").',
            '<b>Usable</b>: progress bar, consistent page lengths, logical order, alert unanswered questions, preview it yourself.',
            'The exercise: ambiguous scale, changing number of options, reversing scale, leading questions, yes/no questions.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 35 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You made it through Chapter 6!', 'خلّصت الفصل السادس!')}</${H1}>
            <${Talk} who="lens">${t('Next time: from asking a thousand people on paper to asking one person face to face. Interviews!', 'المرة الجاية: من إنك تسأل ألف واحد على ورق، لإنك تسأل واحد وش لوش. الـ Interviews!')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [6], t: Date.now() } }}>${t('Quiz me on Lecture 6', 'امتحنّي في محاضرة 6')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 6, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 6, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();

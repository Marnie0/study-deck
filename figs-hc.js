// Visuals for the HCI notes, Lectures 5-10 (names 'hc-…'); Lectures 1-4's are in figs.js, built on figs.js (window.FIGKIT).
// Labels and captions come from the site's notes. build.mjs copies this file to data/; app.js loads it on demand.
(function(){ if (!document.getElementById('hf-accent')) { const s = document.createElement('style'); s.id = 'hf-accent'; s.textContent = '[data-fig^="hc-"]{ --fig-k: var(--k-hci); --fig-s: var(--s-hci); }'; document.head.appendChild(s); } })();
/* ── part 5 ── */
// HCI visuals, part 5: L5 user research (qualitative vs quantitative, primary vs secondary, PII and SPII, where surveys fit). Every label and caption comes from the site's notes for L5.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.hf5 .fig-btn[aria-pressed="true"]{ background:var(--s-hci); color:#fff; border-color:transparent; }
.hf5-wrap{ max-width:440px; margin:0 auto; color:var(--ink); font-size:.86rem; line-height:1.35; }
.hf5-items{ display:flex; flex-direction:column; gap:6px; }
.hf5-item{ border:1.4px solid var(--line); background:var(--paper); border-radius:8px; padding:6px 8px; transition:border-color .35s, background .35s; }
.hf5-item.ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hf5-item.no{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 10%, var(--paper)); }
.hf5-item .t{ font-weight:600; display:block; margin-bottom:5px; }
.hf5-pick{ display:flex; flex-wrap:wrap; gap:5px; }
.hf5-pick .fig-btn{ font-size:.8rem; padding:3px 9px; min-height:28px; }
.hf5-res{ font-size:.8rem; margin-top:4px; color:var(--graphite); }
.hf5-score{ text-align:center; font-weight:700; margin:8px 0 2px; }
.hf5-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-bottom:10px; }
.hf5-cmp{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:6px; }
.hf5-cmp .h{ font-weight:700; text-align:center; padding:4px; border-radius:6px; background:color-mix(in srgb, var(--k-hci) 16%, var(--paper)); }
.hf5-row{ grid-column:1 / -1; font-size:.8rem; font-weight:700; color:var(--graphite); margin-top:6px; cursor:pointer; border:0; background:none; padding:0; text-align:left; font-family:inherit; }
.hf5-cell{ border:1.3px solid var(--line); border-radius:7px; padding:5px 7px; background:var(--paper); font-size:.82rem; transition:all .35s; }
.hf5-cell.on{ border-color:var(--k-hci); background:color-mix(in srgb, var(--k-hci) 12%, var(--paper)); }
.hf5-rules{ margin:0 0 10px; padding:6px 8px; border:1px dashed var(--line); border-radius:8px; font-size:.82rem; }
.hf5-rules div{ padding:2px 0; transition:color .35s; }
.hf5-rules div.on{ color:var(--k-hci); font-weight:700; }
.hf5-flow{ display:flex; flex-direction:column; align-items:stretch; gap:4px; }
.hf5-box{ border:1.4px solid var(--line); background:var(--paper); border-radius:8px; padding:6px 8px; text-align:center; font-weight:600; transition:all .45s; }
.hf5-box small{ display:block; font-weight:400; font-size:.8rem; color:var(--graphite); }
.hf5-box.on{ background:var(--s-hci); border-color:var(--s-hci); color:#fff; } .hf5-box.on small{ color:rgba(255,255,255,.92); }
.hf5-box.dim{ opacity:.3; }
.hf5-chips{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin-top:4px; }
.hf5-chips span{ border:1.2px solid var(--k-hci); border-radius:99px; padding:2px 8px; font-size:.8rem; background:var(--paper); color:var(--ink); font-weight:400; }
.hf5-box.on .hf5-chips span{ border-color:rgba(255,255,255,.7); }
.hf5-v{ text-align:center; color:var(--graphite); line-height:1; font-size:.9rem; }
.hf5-tips{ display:flex; flex-direction:column; gap:4px; margin-top:6px; }
.hf5-tips div{ border-left:3px solid var(--k-hci); padding:3px 8px; background:color-mix(in srgb, var(--k-hci) 8%, var(--paper)); border-radius:0 6px 6px 0; animation:hf5in .45s ease both; }
@keyframes hf5in{ from{ opacity:0; transform:translateY(4px); } to{ opacity:1; transform:none; } }
@media (prefers-reduced-motion: reduce){ .hf5-tips div{ animation:none; } }`;
  if (!document.getElementById('hf5-css')) { const s = document.createElement('style'); s.id = 'hf5-css'; s.textContent = CSS; document.head.appendChild(s); }

  // a sorting exercise: each item has the right bin; the student picks one per item
  function useSort(items) {
    const [pick, setPick] = useState({}), [last, setLast] = useState(null);
    const choose = (k, v) => { setPick(p => Object.assign({}, p, { [k]: v })); setLast(k); };
    const done = Object.keys(pick).length, right = items.filter((it, k) => pick[k] === it.bin).length;
    return { pick, last, choose, done, right, reset: () => { setPick({}); setLast(null); } };
  }

  /* ── L5 §1: quantitative or qualitative? ── */
  const QQ = [
    { t: 'Measures', bin: 'quant', en: 'Measures are data of a numeric nature, so they are quantitative.', ar: 'الـ measures data رقمية، فهي quantitative.' },
    { t: 'Counts', bin: 'quant', en: 'Counts are numeric too, so they are quantitative.', ar: 'الـ counts كمان رقمية، فهي quantitative.' },
    { t: 'Why something happens', bin: 'qual', en: 'Observations about why things happen are qualitative.', ar: 'الملاحظات عن ليه الحاجات بتحصل دي qualitative.' },
    { t: 'How something happens', bin: 'qual', en: 'Observations about how things happen are qualitative.', ar: 'الملاحظات عن إزاي الحاجات بتحصل دي qualitative.' },
    { t: 'Observations from interviews', bin: 'qual', en: 'Qualitative research is often based on interviews.', ar: 'الـ qualitative research غالبًا بيعتمد على الـ interviews.' }
  ];
  function QualQuant({ ar }) {
    const s = useSort(QQ), it = s.last != null ? QQ[s.last] : null, ok = it && s.pick[s.last] === it.bin;
    const cap = s.done === QQ.length
      ? { en: `${s.right} of ${QQ.length} right. <b>Quantitative</b> data is numeric (measures, counts) and easier for engineers and technical people. <b>Qualitative</b> data is about why and how, harder for technical people but what we need for real understanding.`, ar: `صح ${s.right} من ${QQ.length}. الـ <b>Quantitative</b> data رقمية (measures و counts) وأسهل للـ engineers والناس الـ technical. والـ <b>Qualitative</b> عن ليه وإزاي، أصعب للناس الـ technical بس هي اللي محتاجينها عشان نفهم بجد.` }
      : it ? { en: (ok ? 'Right. ' : 'Not quite. ') + it.en, ar: (ok ? 'صح. ' : 'مش بالظبط. ') + it.ar }
      : { en: 'User research by <b>what</b> it collects: sort each kind of data into quantitative or qualitative.', ar: 'الـ user research حسب <b>نوع</b> الـ data اللي بيجمعها: صنّف كل نوع data هل هو quantitative ولا qualitative.' };
    return html`<figure className="fig hf5"><div className="fig-stage"><div className="hf5-wrap">
      <div className="hf5-items">${QQ.map((q, k) => { const p = s.pick[k];
        return html`<div key=${k} className=${'hf5-item' + (p ? (p === q.bin ? ' ok' : ' no') : '')}><span className="t">${q.t}</span>
          <div className="hf5-pick" role="group" aria-label=${q.t}>${[['quant', 'Quantitative'], ['qual', 'Qualitative']].map(([v, l]) => html`<button key=${v} className="fig-btn" aria-pressed=${String(p === v)} onClick=${() => s.choose(k, v)}>${l}</button>`)}</div></div>`; })}</div>
      <div className="hf5-score" aria-live="polite">${s.done ? `${s.right} / ${QQ.length} right` : ''}</div>
      ${s.done > 0 && html`<div style=${{ textAlign: 'center' }}><button className="fig-btn" onClick=${s.reset}>↻ Start over</button></div>`}
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L5 §0 and §2: primary or secondary research? ── */
  const PS = [
    { t: 'Surveys', bin: 'p' }, { t: 'Focus groups', bin: 'p' }, { t: 'Interviews', bin: 'p' }, { t: 'Observations', bin: 'p' }, { t: 'Experiments', bin: 'p' },
    { t: 'Looking for existing data', bin: 's' },
    { t: 'Color-blindness facts, to design for color-blind users', bin: 's' }
  ];
  const ROWS = [
    ['Data collected by', 'You (or someone you hire)', 'Someone else'],
    ['Qualitative or quantitative?', 'Can be either', 'Can be either'],
    ['Key benefits', 'Specific to your needs, and you control the quality', 'Usually cheap and quick'],
    ['Key disadvantages', 'Usually costs more and takes longer', 'Data can be too old and/or not specific enough']
  ];
  function PrimarySecondary({ ar }) {
    const [mode, setMode] = useState('sort'), [row, setRow] = useState(0), s = useSort(PS);
    const it = s.last != null ? PS[s.last] : null, ok = it && s.pick[s.last] === it.bin;
    let cap;
    if (mode === 'cmp') cap = { en: `<b>${ROWS[row][0]}</b>: primary research: ${ROWS[row][1].toLowerCase()}; secondary research: ${ROWS[row][2].toLowerCase()}.`, ar: ['الـ data في الـ primary بتجمعها إنت (أو حد بتأجره)، وفي الـ secondary حد تاني جمعها.', 'الاتنين ينفع يكونوا qualitative أو quantitative.', 'ميزة الـ primary إنها مخصوصة لاحتياجاتك وإنت متحكم في الـ quality، وميزة الـ secondary إنها عادةً رخيصة وسريعة.', 'عيب الـ primary إنها عادةً أغلى وبتاخد وقت أطول، وعيب الـ secondary إن الـ data ممكن تبقى قديمة أو مش محددة كفاية.'][row] };
    else if (s.done === PS.length) cap = { en: `${s.right} of ${PS.length} right. Primary research is data <b>you</b> collect (surveys, focus groups, interviews, observations, experiments); secondary research looks for <b>existing</b> data, such as facts about human abilities, like color blindness.`, ar: `صح ${s.right} من ${PS.length}. الـ primary research هي data <b>إنت</b> بتجمعها (زي الـ surveys والـ focus groups والـ interviews والـ observations والـ experiments)، والـ secondary بتدوّر على data <b>موجودة</b>، زي حقايق عن قدرات الناس، مثلًا الـ color blindness.` };
    else if (it) cap = ok ? { en: 'Right. ' + (it.bin === 'p' ? `${it.t}: data collected by you.` : 'Existing data collected by someone else.'), ar: 'صح. ' + (it.bin === 'p' ? 'دي data إنت اللي بتجمعها.' : 'دي data موجودة، حد تاني جمعها.') } : { en: 'Not quite. ' + (it.bin === 'p' ? 'You collect this data yourself, so it is primary.' : 'This data already exists, collected by someone else, so it is secondary.'), ar: 'مش بالظبط. ' + (it.bin === 'p' ? 'إنت اللي بتجمع الـ data دي، فهي primary.' : 'الـ data دي موجودة وحد تاني جمعها، فهي secondary.') };
    else cap = { en: 'Primary or secondary research? Sort each method, then compare the two in the table.', ar: 'الـ research ده primary ولا secondary؟ صنّف كل method، وبعدين قارن الاتنين في الجدول.' };
    return html`<figure className="fig hf5"><div className="fig-stage"><div className="hf5-wrap">
      <div className="hf5-modes" role="group">${[['sort', 'Sort methods'], ['cmp', 'Compare']].map(([k, l]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => setMode(k)}>${l}</button>`)}</div>
      ${mode === 'sort' ? html`<div className="hf5-items">${PS.map((q, k) => { const p = s.pick[k];
          return html`<div key=${k} className=${'hf5-item' + (p ? (p === q.bin ? ' ok' : ' no') : '')}><span className="t">${q.t}</span>
            <div className="hf5-pick" role="group" aria-label=${q.t}>${[['p', 'Primary'], ['s', 'Secondary']].map(([v, l]) => html`<button key=${v} className="fig-btn" aria-pressed=${String(p === v)} onClick=${() => s.choose(k, v)}>${l}</button>`)}</div></div>`; })}
          ${s.done > 0 && html`<div style=${{ textAlign: 'center' }}><button className="fig-btn" onClick=${s.reset}>↻ Start over</button></div>`}</div>`
        : html`<div className="hf5-cmp"><span className="h">Primary</span><span className="h">Secondary</span>
          ${ROWS.map((r, k) => html`<${React.Fragment} key=${k}><button className="hf5-row" onClick=${() => setRow(k)} aria-pressed=${String(row === k)}>${r[0]}</button>
            <span className=${'hf5-cell' + (row === k ? ' on' : '')}>${r[1]}</span><span className=${'hf5-cell' + (row === k ? ' on' : '')}>${r[2]}</span></${React.Fragment}>`)}</div>`}
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L5 §4: PII or SPII? ── */
  const PI = [
    { t: 'Name', bin: 'pii' }, { t: 'Home address', bin: 'pii' }, { t: 'Email address', bin: 'pii' }, { t: 'Phone number', bin: 'pii' },
    { t: 'Social security number', bin: 'spii' }, { t: "Driver's license", bin: 'spii' }, { t: 'Passport number', bin: 'spii' }, { t: 'Financial account number', bin: 'spii' }, { t: 'Date of birth', bin: 'spii' }
  ];
  function PiiSort({ ar }) {
    const s = useSort(PI), it = s.last != null ? PI[s.last] : null, ok = it && s.pick[s.last] === it.bin;
    const rule = s.done === PI.length ? 3 : s.done ? 1 : 0;
    let cap;
    if (s.done === PI.length) cap = { en: `${s.right} of ${PI.length} right. Whatever you collect: <b>only collect the data you need</b>, <b>do not associate it with PII or SPII</b>, and <b>do not keep it</b> after you no longer need it.`, ar: `صح ${s.right} من ${PI.length}. أي data بتجمعها: <b>اجمع اللي محتاجه بس</b>، و<b>متربطهاش بالـ PII أو الـ SPII</b>، و<b>متحتفظش بيها</b> بعد ما متبقاش محتاجها.` };
    else if (it) cap = it.bin === 'pii'
      ? { en: (ok ? 'Right. ' : 'Not quite. ') + `${it.t} is <b>PII</b> (Personally Identifiable Information): a detail that could identify a user.`, ar: (ok ? 'صح. ' : 'مش بالظبط. ') + 'ده <b>PII</b> (Personally Identifiable Information)، يعني تفصيلة ممكن تعرّف هوية الـ user.' }
      : { en: (ok ? 'Right. ' : 'Not quite. ') + `${it.t} is <b>SPII</b> (Sensitive PII): it could cause financial harm, embarrassment or discrimination if lost or stolen.`, ar: (ok ? 'صح. ' : 'مش بالظبط. ') + 'ده <b>SPII</b> (Sensitive PII)، يعني data ممكن تسبب ضرر مالي أو إحراج أو تمييز لو ضاعت أو اتسرقت.' };
    else cap = { en: 'Privacy and security of user data are essential. Sort each piece of user data: PII or sensitive PII (SPII)?', ar: 'الـ privacy والـ security بتوع data الـ users أساسيين. صنّف كل data هل هي PII ولا sensitive PII (SPII)؟' };
    return html`<figure className="fig hf5"><div className="fig-stage"><div className="hf5-wrap">
      <div className="hf5-rules">${['Only collect the data you need.', 'Do not associate collected data with PII or SPII.', 'Do not keep data after you no longer need it.'].map((r, k) => html`<div key=${k} className=${rule === 3 || (rule === 1 && k === 1) ? 'on' : ''}>• ${r}</div>`)}</div>
      <div className="hf5-items">${PI.map((q, k) => { const p = s.pick[k];
        return html`<div key=${k} className=${'hf5-item' + (p ? (p === q.bin ? ' ok' : ' no') : '')}><span className="t">${q.t}</span>
          <div className="hf5-pick" role="group" aria-label=${q.t}>${[['pii', 'PII'], ['spii', 'SPII']].map(([v, l]) => html`<button key=${v} className="fig-btn" aria-pressed=${String(p === v)} onClick=${() => s.choose(k, v)}>${l}</button>`)}</div></div>`; })}</div>
      <div className="hf5-score" aria-live="polite">${s.done ? `${s.right} / ${PI.length} right` : ''}</div>
      ${s.done > 0 && html`<div style=${{ textAlign: 'center' }}><button className="fig-btn" onClick=${s.reset}>↻ Start over</button></div>`}
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L5 §5: where surveys fit, and how to keep them good ── */
  const SV = [
    { en: '<b>Surveys</b> get quick responses from a large number of users in a short time: a broad view. They are often online, easy to create, and one of the cheapest methods.', ar: 'الـ <b>Surveys</b> بتجيب ردود سريعة من عدد كبير من الـ users في وقت قصير، يعني نظرة واسعة (broad view). غالبًا بتبقى online وسهلة تتعمل، ومن أرخص الـ methods.', on: [0], show: [0] },
    { en: 'As an <b>initial step</b>: a survey gives insights on motivations, preferences, priorities and pain points…', ar: 'كـ <b>خطوة أولى</b>: الـ survey بيدي insights عن الـ motivations والـ preferences والـ priorities والـ pain points…', on: [0, 1], show: [0, 1] },
    { en: '…which help you plan later activities such as <b>interviews</b>.', ar: '…ودي بتساعدك تخطط لأنشطة بعدها، زي الـ <b>interviews</b>.', on: [2], show: [0, 1, 2] },
    { en: 'A survey can also <b>follow</b> an interview or a usability study.', ar: 'والـ survey ممكن كمان ييجي <b>بعد</b> interview أو usability study.', on: [3, 4], show: [3, 4] },
    { en: '<b>Tips</b>: keep it as small as possible, since too many questions affect the response rate and reliability. Ask only what you need and will use, be aware of bias, and get feedback from participants about the survey.', ar: '<b>نصايح</b>: خليه صغير على قد ما تقدر، لأن الأسئلة الكتير بتأثر على الـ response rate والـ reliability. اسأل اللي محتاجه وهتستخدمه بس، وخد بالك من الـ bias، وخد feedback من المشاركين على الـ survey نفسه.', on: [], show: [], tips: 1 }
  ];
  function SurveyFit({ ar }) {
    const [i, ctl] = useSteps(SV.length, 3000), s = SV[i];
    const box = (k, title, sub, chips) => html`<div className=${'hf5-box' + (s.on.includes(k) ? ' on' : '') + (s.show.includes(k) ? '' : ' dim')}>${title}${sub && html`<small>${sub}</small>`}${chips && html`<div className="hf5-chips">${chips.map(c => html`<span key=${c}>${c}</span>`)}</div>`}</div>`;
    return html`<figure className="fig hf5"><div className="fig-stage"><div className="hf5-wrap">
      ${!s.tips ? html`<div className="hf5-flow">
        ${i < 3 ? [box(0, 'Survey', 'many users, short time'), html`<div key="a1" className="hf5-v">↓</div>`, box(1, 'Insights', null, ['motivations', 'preferences', 'priorities', 'pain points']), html`<div key="a2" className="hf5-v">↓</div>`, box(2, 'Plan later activities', 'such as interviews')]
          : [box(3, 'Interview or usability study'), html`<div key="a3" className="hf5-v">↓</div>`, box(4, 'Survey', 'follows it')]}</div>`
        : html`<div className="hf5-tips">${['Keep it as small as possible', 'Ask only what you need and will use', 'Be aware of bias', 'Get feedback from participants about the survey'].map((t, k) => html`<div key=${k} style=${{ animationDelay: calm() ? '0s' : k * 0.25 + 's' }}>${t}</div>`)}</div>`}
      </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${SV} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'hc-qual-quant': QualQuant, 'hc-primary-secondary': PrimarySecondary, 'hc-pii-spii': PiiSort, 'hc-survey-fit': SurveyFit });
})();
/* ── part 6 ── */
// HCI visuals, part 6: L6 how to ask good survey questions (the six principles with their don't/instead examples, clear ranges and labelled scales, expressive answers, a usable survey, and the evaluation exercise). Every label and caption comes from the site's notes for L6.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.hf6 .fig-btn[aria-pressed="true"]{ background:var(--s-hci); color:#fff; border-color:transparent; }
.hf6-wrap{ max-width:440px; margin:0 auto; color:var(--ink); font-size:.86rem; line-height:1.4; }
.hf6-tabs{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:5px; margin-bottom:10px; }
.hf6-tabs .fig-btn{ font-size:.8rem; padding:4px 4px; min-height:30px; }
.hf6-pair{ border:1px solid var(--line); border-radius:9px; padding:7px; margin-bottom:8px; background:var(--paper); }
.hf6-dont, .hf6-do{ border-radius:7px; padding:5px 8px; }
.hf6-dont{ background:color-mix(in srgb, var(--pen) 9%, var(--paper)); border-left:3px solid var(--pen); }
.hf6-do{ background:color-mix(in srgb, var(--ok) 11%, var(--paper)); border-left:3px solid var(--ok); margin-top:6px; animation:hf6in .4s ease both; }
.hf6-lbl{ display:block; font-size:.8rem; font-weight:700; color:var(--graphite); }
.hf6-why{ display:block; font-size:.8rem; color:var(--graphite); margin-top:3px; }
.hf6-show{ margin-top:6px; }
.hf6-show .fig-btn{ font-size:.8rem; padding:3px 10px; min-height:28px; }
@keyframes hf6in{ from{ opacity:0; transform:translateY(4px); } to{ opacity:1; transform:none; } }
.hf6-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-bottom:10px; }
.hf6-ranges{ display:flex; flex-direction:column; gap:5px; }
.hf6-rg{ display:flex; justify-content:space-between; align-items:center; border:1.4px solid var(--line); border-radius:7px; padding:4px 9px; background:var(--paper); transition:all .3s; font-weight:600; }
.hf6-rg.hit{ background:var(--s-hci); border-color:var(--s-hci); color:#fff; }
.hf6-rg.two{ background:var(--pen); border-color:var(--pen); color:#fff; }
.hf6-val{ display:flex; gap:10px; align-items:center; justify-content:center; margin:10px 0 6px; font-weight:700; }
.hf6-val input{ width:150px; accent-color:var(--k-hci); }
.hf6-val b{ font-size:1.1rem; min-width:2.2em; text-align:center; color:var(--k-hci); }
.hf6-msg{ text-align:center; font-weight:700; min-height:1.4em; }
.hf6-scale{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:4px; margin-top:10px; }
.hf6-scale span{ border:1.3px solid var(--line); border-radius:6px; text-align:center; padding:4px 2px; font-weight:700; background:var(--paper); }
.hf6-ends{ display:flex; justify-content:space-between; gap:8px; font-size:.8rem; color:var(--graphite); margin-top:3px; min-height:1.3em; }
.hf6-q{ border:1px solid var(--line); border-radius:9px; padding:8px; background:var(--paper); }
.hf6-q .qt{ font-weight:600; margin-bottom:6px; display:block; }
.hf6-opts{ display:flex; flex-direction:column; gap:3px; }
.hf6-opt{ display:flex; gap:7px; align-items:center; }
.hf6-dot{ width:13px; height:13px; border:1.6px solid var(--graphite); border-radius:50%; flex:none; }
.hf6-dot.sq{ border-radius:3px; }
.hf6-two{ display:grid; grid-template-columns:1fr; gap:8px; }
.hf6-tag{ display:inline-block; font-size:.8rem; font-weight:700; border-radius:99px; padding:1px 8px; margin-bottom:4px; }
.hf6-tag.b{ background:color-mix(in srgb, var(--pen) 14%, var(--paper)); color:var(--pen); }
.hf6-tag.g{ background:color-mix(in srgb, var(--ok) 16%, var(--paper)); color:var(--ok); }
.hf6-sv{ border:1px solid var(--line); border-radius:9px; background:var(--paper); padding:8px; }
.hf6-prog{ height:8px; border-radius:99px; background:var(--paper-2); border:1px solid var(--line); overflow:hidden; margin-bottom:8px; }
.hf6-prog i{ display:block; height:100%; background:var(--k-hci); transition:width .4s; }
.hf6-sq{ margin-bottom:8px; }
.hf6-sq .qt{ font-weight:600; display:block; margin-bottom:4px; }
.hf6-chips{ display:flex; flex-wrap:wrap; gap:4px; }
.hf6-chips button{ font:inherit; font-size:.8rem; padding:2px 8px; border-radius:99px; border:1.2px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.hf6-chips button[aria-pressed="true"]{ background:var(--s-hci); color:#fff; border-color:transparent; }
.hf6-sq input[type=text]{ font:inherit; font-size:.82rem; width:100%; box-sizing:border-box; padding:4px 6px; border:1.3px solid var(--line); border-radius:6px; background:var(--paper); color:var(--ink); }
.hf6-alert{ color:var(--pen); font-weight:700; font-size:.82rem; margin:4px 0; }
.hf6-nav{ display:flex; justify-content:space-between; align-items:center; gap:6px; margin-top:6px; font-size:.8rem; color:var(--graphite); }
.hf6-toggles{ display:flex; flex-direction:column; gap:4px; margin-bottom:10px; }
.hf6-toggles label{ display:flex; gap:7px; align-items:center; font-size:.82rem; cursor:pointer; }
.hf6-toggles input{ accent-color:var(--k-hci); width:16px; height:16px; }
.hf6-ex{ border:1px solid var(--line); border-radius:9px; padding:7px; margin-bottom:8px; background:var(--paper); }
.hf6-ex .qt{ font-weight:600; display:block; margin-bottom:5px; }
.hf6-ex .fig-btn{ font-size:.8rem; padding:3px 9px; min-height:28px; text-align:left; }
.hf6-ex.ok{ border-color:var(--ok); } .hf6-ex.no{ border-color:var(--pen); }
.hf6-pk{ display:flex; flex-wrap:wrap; gap:5px; }
.hf6-ex .hf6-res{ font-size:.8rem; margin-top:5px; }
@media (prefers-reduced-motion: reduce){ .hf6-do{ animation:none; } }`;
  if (!document.getElementById('hf6-css')) { const s = document.createElement('style'); s.id = 'hf6-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── L6 §0-§6: the six principles, each with its "Don't ask this… / Instead, ask this…" examples ── */
  const PR = {
    Clear: { en: '<b>Be Clear</b>: label numeric scales, avoid overlapping ranges, give extra detail when in doubt, and timebox frequency questions.', ar: 'مبدأ <b>Be Clear</b>: اكتب labels للـ numeric scales، وتجنب الـ ranges المتداخلة، وزوّد تفاصيل لو شاكك، وحط إطار زمني لأسئلة التكرار.', pairs: [
      ['From 1 to 5, rate your satisfaction with.. (1, 2, 3, 4, 5)', 'From 1 to 5, rate your satisfaction with.. 1 - Highly dissatisfied, 2 - Dissatisfied, 3 - Neutral, 4 - Satisfied, 5 - Highly Satisfied', 'Provide labels to clarify a numeric scale.'],
      ['How many times per week do you watch Hulu? 0-2, 2-5, 5-10, 10-20, 20+', 'How many times per week do you watch Hulu? 0-2, 3-5, 6-10, 11-19, 20+', 'Avoid overlapping ranges.'],
      ['Do you own a tablet computer? (Yes / No)', 'Do you own a tablet computer (i.e., any computer with a touchscreen and detachable keyboard)? (Yes / No)', 'When in doubt, provide extra detail.'],
      ['How often do you exercise? (Never / Rarely / Occasionally / Frequently / Always)', 'In the past seven days, how many times have you exercised? 0 / 1-2 / 3-4 / 5-6 / 7 or more', 'Timebox frequency-based questions. (The slide shows 5-7 and 7 or more, which overlap at 7.)']] },
    Concise: { en: '<b>Be Concise</b>: ask questions in plain language.', ar: 'مبدأ <b>Be Concise</b>: اسأل بلغة بسيطة.', pairs: [
      ['What was the overall level of cleanliness that you observed within the car that you rented? (Very clean / Somewhat clean / Not clean at all)', 'How clean was the car? (Very clean / Somewhat clean / Not clean at all)', 'Ask questions in plain language.']] },
    Specific: { en: '<b>Be Specific</b>: avoid super-big ideas, double-barrel questions (two things in one) and internal conflict.', ar: 'مبدأ <b>Be Specific</b>: تجنب الأفكار الكبيرة أوي، والـ double-barrel questions (حاجتين في سؤال واحد)، والتعارض الداخلي.', pairs: [
      ['How satisfied were you with the interface?', 'How satisfied were you with how quickly the interface responded to your commands? (and more follow-up questions)', 'Avoid questions on super-big ideas.'],
      ['How satisfied are you with the speed and availability of your mobile connection?', 'How satisfied are you with the speed of your mobile connection? How satisfied are you with the availability of your mobile connection?', 'Avoid "double-barrel" questions.'],
      ['How satisfied were you with your food?', 'How satisfied were you with the temperature of your food? …with the appearance of your food? …with the flavor of your food?', 'Avoid questions that allow internal conflict.']] },
    Expressive: { en: '<b>Be Expressive</b>: emphasize the user\'s opinions, use ranges instead of yes/no, give levels of frequency or agreement, and allow multiple selections when possible.', ar: 'مبدأ <b>Be Expressive</b>: ركّز على رأي الـ user، واستخدم ranges بدل <bdi dir="ltr">yes/no</bdi>، وادّي مستويات للتكرار أو الموافقة، واسمح بأكتر من اختيار لما ينفع.', pairs: [
      ['Is our subscription price too high?', 'Do you feel our subscription price is too high, too low, or about right?', 'Emphasize the user\'s opinions.'],
      ['Do you use social media? (Yes / No)', 'In the past seven days, how much time have you spent on social media? 0 hours / <1 hour / 1-2 hours / 3-5 hours / 6-9 hours / 10+ hours', 'Use ranges instead of yes/no questions.'],
      ['How satisfied are you with this interface? (Dissatisfied / Satisfied)', 'How satisfied are you with this interface? (Highly dissatisfied / Dissatisfied / Neutral / Satisfied / Highly Satisfied)', 'Give levels of frequency or agreement.'],
      ['What social media platform do you use most? (radio buttons: one choice)', 'What social media platform do you use most? (checkboxes: several choices)', 'Allow multiple selections when possible.']] },
    Unbiased: { en: '<b>Be Unbiased</b>: let users add categories, leave open-ended questions open, and avoid leading and loaded questions.', ar: 'مبدأ <b>Be Unbiased</b>: اسمح للـ users يضيفوا categories، وسيب الأسئلة المفتوحة مفتوحة، وتجنب الـ leading والـ loaded questions.', pairs: [
      ['What social media platform do you use most? (Facebook, Snapchat, Instagram, Twitter, LinkedIn, Pinterest)', 'The same list plus "Other: ____"', 'Allow users to add nominal categories.'],
      ['Why did you choose our service over our competitors? (Reputation / Price / Recommendation / Reviews / Other: ____)', 'Why did you choose our service over our competitors? (open answer)', 'Leave potentially open-ended questions open.'],
      ['Did our brand-new AI-based interface generate better recommendations? (Yes! / No :( )', 'How satisfied were you with the recommendations the interface generated? (Dissatisfied / Neutral / Satisfied)', 'Avoid leading questions.'],
      ['In the past seven days, how much time have you wasted on social media?', 'In the past seven days, how much time have you spent on social media?', 'Avoid loaded questions.']] },
    Usable: { en: '<b>Be Usable</b>: provide a progress bar, make your page lengths consistent, order your questions logically, alert users about unanswered questions, and preview the survey yourself.', ar: 'مبدأ <b>Be Usable</b>: حط progress bar، وخلي أطوال الصفحات ثابتة، ورتّب الأسئلة بشكل منطقي، ونبّه الـ users على الأسئلة اللي متجاوبتش، واعمل preview للـ survey بنفسك.', tips: ['Provide a progress bar', 'Make your page lengths consistent', 'Order your questions logically', 'Alert users about unanswered questions', 'Preview the survey yourself'] }
  };
  function Principles({ ar }) {
    const [p, setP] = useState('Clear'), [open, setOpen] = useState({}), P = PR[p];
    const pick = k => { setP(k); setOpen({}); };
    return html`<figure className="fig hf6"><div className="fig-stage"><div className="hf6-wrap">
      <div className="hf6-tabs" role="group" aria-label="Principle">${Object.keys(PR).map(k => html`<button key=${k} className="fig-btn" aria-pressed=${String(p === k)} onClick=${() => pick(k)}>${k}</button>`)}</div>
      ${P.pairs ? P.pairs.map(([d, i, why], k) => html`<div key=${p + k} className="hf6-pair">
          <div className="hf6-dont"><span className="hf6-lbl">Don't ask this…</span>${d}</div>
          ${open[k] ? html`<div className="hf6-do"><span className="hf6-lbl">Instead, ask this…</span>${i}<span className="hf6-why">${why}</span></div>`
            : html`<div className="hf6-show"><button className="fig-btn" onClick=${() => setOpen(o => Object.assign({}, o, { [k]: true }))}>Show the better question</button></div>`}</div>`)
        : html`<div>${P.tips.map((t, k) => html`<div key=${k} className="hf6-do" style=${{ animationDelay: calm() ? '0s' : k * 0.2 + 's' }}>${t}</div>`)}</div>`}
      </div></div><${Cap} en=${P.en + (P.pairs ? ' Tap to see each better question.' : '')} ar=${P.ar + (P.pairs ? ' دوس عشان تشوف السؤال الأحسن.' : '')} showAr=${ar} /></figure>`;
  }

  /* ── L6 §1: overlapping ranges and labelled scales ── */
  const BAD = [[0, 2], [2, 5], [5, 10], [10, 20], [20, Infinity]], GOOD = [[0, 2], [3, 5], [6, 10], [11, 19], [20, Infinity]];
  function Ranges({ ar }) {
    const [mode, setMode] = useState('bad'), [v, setV] = useState(2), [lab, setLab] = useState(false);
    const R = mode === 'bad' ? BAD : GOOD, hits = R.filter(([a, b]) => v >= a && v <= b).length;
    const name = ([a, b]) => b === Infinity ? a + '+' : a + '-' + b;
    const msg = hits === 1 ? 'Exactly one answer fits.' : hits === 0 ? 'No answer fits this value.' : 'Two answers fit: the question is ambiguous.';
    const cap = mode === 'bad'
      ? { en: `<b>Avoid overlapping ranges</b>: "How many times per week do you watch Hulu?" With 0-2, 2-5, 5-10, 10-20, 20+, a user with ${v} ${hits > 1 ? 'could tick two answers' : hits === 0 ? 'has no answer to tick' : 'has one answer'}. Try 2, 5, 10 or 20.`, ar: `<b>تجنب الـ ranges المتداخلة</b>: في سؤال <bdi dir="ltr">"How many times per week do you watch Hulu?"</bdi> مع <bdi dir="ltr">0-2,&nbsp;2-5,&nbsp;5-10,&nbsp;10-20,&nbsp;20+</bdi>، الـ user اللي عنده ${v} ${hits > 1 ? 'ممكن يختار إجابتين' : hits === 0 ? 'ملوش إجابة يختارها' : 'ليه إجابة واحدة'}. جرّب القيمة <bdi dir="ltr">2</bdi> أو <bdi dir="ltr">5</bdi> أو <bdi dir="ltr">10</bdi> أو <bdi dir="ltr">20</bdi>.` }
      : { en: '<b>Use ranges that do not overlap</b>: 0-2, 3-5, 6-10, 11-19, 20+. Every value fits exactly one answer.', ar: '<b>استخدم ranges مش متداخلة</b>، زي <bdi dir="ltr">0-2, 3-5, 6-10, 11-19, 20+</bdi>، وكده كل قيمة ليها إجابة واحدة بس.' };
    const capS = lab ? { en: ' The scale is <b>labelled</b>: 1 - Highly dissatisfied, 2 - Dissatisfied, 3 - Neutral, 4 - Satisfied, 5 - Highly Satisfied.', ar: ' والـ scale عليه <b>labels</b>، من Highly dissatisfied لـ Highly Satisfied.' } : { en: ' A bare "1–5" scale does not say which end is good: label it.', ar: ' والـ scale من غير labels مش بيقول أنهي ناحية الكويسة، فاكتب labels.' };
    return html`<figure className="fig hf6"><div className="fig-stage"><div className="hf6-wrap">
      <div className="hf6-modes" role="group">${[['bad', 'Overlapping: 0-2, 2-5, 5-10, 10-20, 20+'], ['good', 'Fixed: 0-2, 3-5, 6-10, 11-19, 20+']].map(([k, l]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => setMode(k)}>${l}</button>`)}</div>
      <div className="hf6-ranges">${R.map((r, k) => { const h = v >= r[0] && v <= r[1]; return html`<div key=${mode + k} className=${'hf6-rg' + (h ? (hits > 1 ? ' two' : ' hit') : '')}><span>${name(r)}</span><span>${h ? '✓' : ''}</span></div>`; })}</div>
      <div className="hf6-val"><label htmlFor="hf6-v">Your answer</label><input id="hf6-v" type="range" min="0" max="25" value=${v} onInput=${e => setV(+e.target.value)} onChange=${e => setV(+e.target.value)} /><b>${v}</b></div>
      <div className="hf6-msg" aria-live="polite" style=${{ color: hits === 1 ? 'var(--ok)' : 'var(--pen)' }}>${msg}</div>
      <div className="hf6-scale" aria-label="Rating scale">${[1, 2, 3, 4, 5].map(n => html`<span key=${n}>${n}</span>`)}</div>
      ${lab ? html`<div className="hf6-ranges" style=${{ marginTop: '6px' }}>${['1 - Highly dissatisfied', '2 - Dissatisfied', '3 - Neutral', '4 - Satisfied', '5 - Highly Satisfied'].map(t => html`<div key=${t} className="hf6-rg"><span>${t}</span></div>`)}</div>` : html`<div className="hf6-ends"><span>No labels: which end is good?</span></div>`}
      <div style=${{ textAlign: 'center', marginTop: '6px' }}><button className="fig-btn" aria-pressed=${String(lab)} onClick=${() => setLab(l => !l)}>${lab ? 'Remove the labels' : 'Label the scale'}</button></div>
      </div></div><${Cap} en=${cap.en + capS.en} ar=${cap.ar + capS.ar} showAr=${ar} /></figure>`;
  }

  /* ── L6 §4: Be Expressive, before and after ── */
  const EX = [
    { en: '<b>Emphasize the user\'s opinions</b>: "Is our subscription price too high?" becomes "Do you feel our subscription price is too high, too low, or about right?"', ar: '<b>ركّز على رأي الـ user</b>: السؤال <bdi dir="ltr">"Is our subscription price too high?"</bdi> يبقى:<span class="ltr">"Do you feel our subscription price is too high, too low, or about right?"</span>',
      b: ['Is our subscription price too high?', []], g: ['Do you feel our subscription price is too high, too low, or about right?', ['Too high', 'Too low', 'About right']] },
    { en: '<b>Use ranges instead of yes/no</b>: "Do you use social media?" becomes a question about the past seven days, answered in hours.', ar: '<b>استخدم ranges بدل <bdi dir="ltr">yes/no</bdi></b>: السؤال <bdi dir="ltr">"Do you use social media?"</bdi> يبقى سؤال عن آخر 7 أيام، والإجابة بالساعات.',
      b: ['Do you use social media?', ['Yes', 'No']], g: ['In the past seven days, how much time have you spent on social media?', ['0 hours', '<1 hour', '1-2 hours', '3-5 hours', '6-9 hours', '10+ hours']] },
    { en: '<b>Give levels of frequency or agreement</b>: a 5-level satisfaction scale instead of Dissatisfied/Satisfied.', ar: '<b>ادّي مستويات للتكرار أو الموافقة</b>: satisfaction scale من 5 مستويات بدل <bdi dir="ltr">Dissatisfied/Satisfied</bdi>.',
      b: ['How satisfied are you with this interface?', ['Dissatisfied', 'Satisfied']], g: ['How satisfied are you with this interface?', ['Highly dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Highly Satisfied']] },
    { en: '<b>Allow multiple selections when possible</b>: checkboxes (several choices) instead of radio buttons (one choice).', ar: '<b>اسمح بأكتر من اختيار لما ينفع</b>: checkboxes (أكتر من اختيار) بدل radio buttons (اختيار واحد).',
      b: ['What social media platform do you use most? (radio buttons: one choice)', ['Facebook', 'Snapchat', 'Instagram', 'Twitter', 'LinkedIn', 'Pinterest']], g: ['What social media platform do you use most? (checkboxes: several choices)', ['Facebook', 'Snapchat', 'Instagram', 'Twitter', 'LinkedIn', 'Pinterest']], sq: 1 }
  ];
  function Expressive({ ar }) {
    const [i, ctl] = useSteps(EX.length, 3400), s = EX[i];
    const q = ([t, opts], tag, sq) => html`<div className="hf6-q"><span className=${'hf6-tag ' + (tag === 'b' ? 'b' : 'g')}>${tag === 'b' ? 'Before' : 'After'}</span><span className="qt">${t}</span>
      <div className="hf6-opts">${opts.map(o => html`<div key=${o} className="hf6-opt"><span className=${'hf6-dot' + (sq ? ' sq' : '')}></span>${o}</div>`)}</div></div>`;
    return html`<figure className="fig hf6"><div className="fig-stage"><div className="hf6-wrap">
      <div className="hf6-two" key=${i}>${q(s.b, 'b', false)}${q(s.g, 'g', s.sq)}</div>
      </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${EX} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L6 §6: a usable survey, tip by tip ── */
  const SQ = [
    { t: 'How clean was the car?', o: ['1', '2', '3', '4', '5'], g: 0 },
    { t: 'In the past seven days, how many times have you exercised?', o: ['0', '1-2', '3-4', '5-6', '7 or more'], g: 1 },
    { t: 'How satisfied were you with the recommendations?', o: ['1', '2', '3', '4', '5'], g: 0 },
    { t: 'In the past seven days, how much time have you spent on social media?', o: ['0', '<1', '1-2', '3-5', '6-9', '10+ hours'], g: 1 },
    { t: 'Do you feel our subscription price is too high, too low, or about right?', o: ['Too high', 'Too low', 'About right'], g: 0 },
    { t: 'Why did you choose our service?', o: null, g: 0 }
  ];
  const TIPS = [['prog', 'Provide a progress bar'], ['len', 'Make your page lengths consistent'], ['order', 'Order your questions logically'], ['alert', 'Alert users about unanswered questions'], ['prev', 'Preview the survey yourself']];
  function UsableSurvey({ ar }) {
    const [on, setOn] = useState({ prog: false, len: false, order: false, alert: false, prev: false }), [page, setPage] = useState(0), [ans, setAns] = useState({}), [warn, setWarn] = useState(false), [skipped, setSkipped] = useState(0);
    const order = on.order ? [0, 2, 4, 5, 1, 3] : [0, 1, 2, 3, 4, 5];
    const sizes = on.len ? [2, 2, 2] : [1, 4, 1], pages = []; let k = 0; for (const n of sizes) { pages.push(order.slice(k, k + n)); k += n; }
    const cur = pages[Math.min(page, pages.length - 1)], done = page >= pages.length;
    const toggle = key => { setOn(o => Object.assign({}, o, { [key]: !o[key] })); setPage(0); setAns({}); setWarn(false); setSkipped(0); };
    const next = () => { const miss = cur.filter(q => ans[q] == null || ans[q] === '').length;
      if (miss && on.alert && !warn) { setWarn(true); return; }
      setSkipped(s => s + miss); setWarn(false); setPage(p => p + 1); };
    const left = TIPS.filter(([key]) => !on[key]).map(([, t]) => t);
    const cap = on.prev && !done ? { en: '<b>Preview</b>: you went through the survey yourself first. ' + (left.length > 1 ? 'Problems a user would still meet: ' + left.filter(t => t !== 'Preview the survey yourself').join('; ').toLowerCase() + '.' : 'Every tip is applied.'), ar: 'الـ <b>Preview</b>: إنت جربت الـ survey بنفسك الأول. ' + (left.length > 1 ? 'لسه فيه ' + (left.length - 1) + ' مشاكل الـ user هيقابلها، شغّل باقي النصايح.' : 'كل النصايح متطبقة.') }
      : done ? { en: `Survey finished${skipped ? `, with <b>${skipped} unanswered question${skipped > 1 ? 's' : ''}</b> nobody warned about` : ''}. Turn on the tips and try again.`, ar: `الـ survey خلص${skipped ? `، وفيه <b>${skipped} سؤال متجاوبش</b> ومحدش نبّه عليه` : ''}. شغّل النصايح وجرّب تاني.` }
      : { en: '<b>Be Usable</b>: turn each tip on and answer the survey. Without them there is no progress bar, the pages have 1, 4 and 1 questions, the order jumps between topics, and unanswered questions slip through.', ar: 'مبدأ <b>Be Usable</b>: شغّل كل نصيحة وجاوب الـ survey. من غيرها مفيش progress bar، والصفحات فيها سؤال واحد وبعدين 4 وبعدين واحد، والترتيب بينط بين المواضيع، والأسئلة اللي متجاوبتش بتعدّي.' };
    return html`<figure className="fig hf6"><div className="fig-stage"><div className="hf6-wrap">
      <div className="hf6-toggles">${TIPS.map(([key, t]) => html`<label key=${key}><input type="checkbox" checked=${on[key]} onChange=${() => toggle(key)} />${t}</label>`)}</div>
      <div className="hf6-sv">
        ${on.prog && html`<div className="hf6-prog" aria-label="Progress"><i style=${{ width: Math.round(Math.min(page, pages.length) / pages.length * 100) + '%' }}></i></div>`}
        ${done ? html`<div style=${{ textAlign: 'center', fontWeight: 700 }}>Thank you!</div>`
          : cur.map(q => { const Q = SQ[q]; return html`<div key=${q} className="hf6-sq"><span className="qt">${Q.t}</span>
              ${Q.o ? html`<div className="hf6-chips">${Q.o.map(o => html`<button key=${o} aria-pressed=${String(ans[q] === o)} onClick=${() => setAns(a => Object.assign({}, a, { [q]: o }))}>${o}</button>`)}</div>`
                : html`<input type="text" aria-label=${Q.t} value=${ans[q] || ''} onInput=${e => setAns(a => Object.assign({}, a, { [q]: e.target.value }))} />`}</div>`; })}
        ${warn && html`<div className="hf6-alert" role="alert">Please answer every question on this page, or press Next again to skip.</div>`}
        <div className="hf6-nav"><span>${done ? '' : `Page ${page + 1}${on.prog ? ` of ${pages.length}` : ''}`}</span>
          ${done ? html`<button className="fig-btn" onClick=${() => { setPage(0); setAns({}); setSkipped(0); }}>↻ Again</button>` : html`<button className="fig-btn" onClick=${next}>Next ›</button>`}</div>
      </div></div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L6 §7: exercise, evaluate these survey questions ── */
  const EQ = [
    { q: '"On a scale of 1 to 4 with 1 meaning \'a lot\' and 4 meaning \'not at all\', how much do you enjoy exercising?"', a: 0 },
    { q: '"Why do you like to exercise?"', a: 1 },
    { q: '"On a scale of 1 to 6 with 1 meaning \'not at all\' and 6 meaning \'a lot\', how much do you like audiobooks?"', a: 2 },
    { q: '"Have you listened to an audiobook this year?"', a: 3 }
  ];
  const EP = [
    ['Ambiguous / reversed scale', 'An ambiguous, reversed scale: 1 means "a lot" and 4 means "not at all".', 'الـ scale مش واضح ومعكوس: الـ 1 معناها "a lot" والـ 4 معناها "not at all".'],
    ['Leading question', 'A leading question: it assumes you like exercising.', 'ده leading question: بيفترض إنك بتحب التمرين.'],
    ['Changing options and reversed scale', 'The number of options changes (4 vs 6) and the scale is reversed compared with the previous question.', 'عدد الـ options بيتغير (4 ضد 6)، والـ scale معكوس مقارنة بالسؤال اللي قبله.'],
    ['Yes/no question: use ranges', 'A yes/no question. Use ranges instead.', 'سؤال <bdi dir="ltr">yes/no</bdi>، فاستخدم ranges بداله.']
  ];
  function Evaluate({ ar }) {
    const [pick, setPick] = useState({}), [last, setLast] = useState(null);
    const done = Object.keys(pick).length, right = EQ.filter((e, k) => pick[k] === e.a).length;
    const L = last != null ? EQ[last] : null, ok = L && pick[last] === L.a;
    const cap = done === EQ.length ? { en: `${right} of ${EQ.length} right. The slide's five labels: Ambiguous scale, Changing number of options, Reversing scale, Leading questions, Yes/no questions. The slide does not match them to questions; this matching is our reading.`, ar: `صح ${right} من ${EQ.length}. والـ 5 labels بتوع الـ slide هما:<span class="ltr">Ambiguous scale, Changing number of options, Reversing scale, Leading questions, Yes/no questions</span>والـ slide مش قايلة كل مشكلة تبع أنهي سؤال، فالتوصيل ده قراءتنا إحنا.` }
      : L ? { en: (ok ? 'Right. ' : 'Not quite. ') + EP[L.a][1], ar: (ok ? 'صح. ' : 'مش بالظبط. ') + EP[L.a][2] }
      : { en: 'Exercise: what is wrong with each survey question? Pick a problem for each. The slide lists the five labels without matching them to questions; this matching is our reading.', ar: 'تمرين: إيه المشكلة في كل سؤال من أسئلة الـ survey دي؟ اختار مشكلة لكل سؤال. والـ slide مش قايلة كل مشكلة تبع أنهي سؤال، فالتوصيل ده قراءتنا إحنا.' };
    return html`<figure className="fig hf6"><div className="fig-stage"><div className="hf6-wrap">
      ${EQ.map((e, k) => { const p = pick[k]; return html`<div key=${k} className=${'hf6-ex' + (p != null ? (p === e.a ? ' ok' : ' no') : '')}><span className="qt">${e.q}</span>
        <div className="hf6-pk">${EP.map(([l], j) => html`<button key=${j} className="fig-btn" aria-pressed=${String(p === j)} onClick=${() => { setPick(o => Object.assign({}, o, { [k]: j })); setLast(k); }}>${l}</button>`)}</div>
        ${p != null && html`<div className="hf6-res" style=${{ color: p === e.a ? 'var(--ok)' : 'var(--pen)' }}>${p === e.a ? '✓ ' + EP[e.a][1] : '✗ Try again.'}</div>`}</div>`; })}
      ${done > 0 && html`<div style=${{ textAlign: 'center' }}><button className="fig-btn" onClick=${() => { setPick({}); setLast(null); }}>↻ Start over</button></div>`}
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'hc-six-principles': Principles, 'hc-clear-ranges': Ranges, 'hc-expressive': Expressive, 'hc-usable-survey': UsableSurvey, 'hc-evaluate-questions': Evaluate });
})();
/* ── part 7 ── */
// HCI visuals, part 7: L7 Interviews (vs surveys, running one, individuals vs groups, challenges of asking). Every label and caption comes from the site's notes for that lecture.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.hf7 .fig-dots i.on{ background:var(--k-hci); } .hf7 .fig-btn:hover{ border-color:var(--k-hci); }
.hf7 .fig-btn[aria-pressed="true"]{ background:var(--s-hci); color:#fff; border-color:transparent; }
.hf7-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.hf7-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.hf7-wrap{ max-width:460px; margin:0 auto; color:var(--ink); font-size:.88rem; line-height:1.45; }
.hf7-cmp{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hf7-col{ border:1.4px solid var(--line); border-radius:10px; background:var(--paper); padding:7px 8px; transition:all .4s ease; }
.hf7-col.on{ border-color:var(--k-hci); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-hci) 20%, transparent); }
.hf7-col > b{ display:block; text-align:center; font-size:.9rem; margin-bottom:5px; }
.hf7-meter{ margin:5px 0; font-size:.8rem; color:var(--graphite); }
.hf7-meter > div{ height:10px; border-radius:99px; background:var(--paper-2); border:1px solid var(--line); overflow:hidden; margin-top:2px; }
.hf7-meter i{ display:block; height:100%; background:var(--s-hci); transition:width .7s ease; }
.hf7-people{ display:flex; flex-wrap:wrap; gap:2px; min-height:20px; }
.hf7-people i{ width:9px; height:13px; border-radius:5px 5px 2px 2px; background:var(--s-hci); opacity:.85; }
.hf7-chips{ display:flex; flex-wrap:wrap; gap:4px; justify-content:center; margin:8px 0 0; }
.hf7-chip{ border:1.3px solid var(--line); border-radius:99px; padding:2px 9px; font-size:.82rem; background:var(--paper); color:var(--ink); transition:all .4s ease; }
.hf7-chip.on{ border-color:var(--k-hci); background:color-mix(in srgb, var(--k-hci) 16%, var(--paper)); }
.hf7-seq{ display:flex; align-items:center; justify-content:center; gap:6px; margin-top:10px; font-size:.86rem; flex-wrap:wrap; }
.hf7-seq span.box{ border:1.4px solid var(--k-hci); border-radius:8px; padding:4px 9px; background:color-mix(in srgb, var(--k-hci) 10%, var(--paper)); font-weight:600; }
.hf7-seq small{ display:block; width:100%; text-align:center; color:var(--graphite); font-size:.8rem; }
.hf7-room{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hf7-who{ border:1.4px solid var(--line); border-radius:10px; padding:6px; text-align:center; background:var(--paper); transition:all .4s ease; }
.hf7-who.on{ border-color:var(--k-hci); background:color-mix(in srgb, var(--k-hci) 10%, var(--paper)); }
.hf7-who b{ display:block; font-size:.86rem; }
.hf7-who span{ display:block; font-size:.8rem; color:var(--graphite); }
.hf7-bubble{ display:inline-block; margin-top:4px; border:1.2px solid var(--line); border-radius:12px; padding:2px 8px; font-size:.8rem; background:var(--paper-2); }
.hf7-notes{ margin-top:8px; border:1.3px dashed var(--line); border-radius:8px; padding:5px 8px; min-height:46px; font-size:.82rem; background:var(--paper); }
.hf7-notes i{ display:block; font-style:normal; animation:hf7in .4s ease both; }
@keyframes hf7in{ from{ opacity:0; transform:translateY(4px); } to{ opacity:1; transform:none; } }
.hf7-talk{ display:flex; height:22px; border-radius:6px; overflow:hidden; border:1px solid var(--line); margin-top:8px; font-size:.76rem; font-weight:700; color:#fff; }
.hf7-talk > div{ display:flex; align-items:center; justify-content:center; white-space:nowrap; overflow:hidden; transition:flex-grow .8s ease; }
.hf7-talk .u{ background:var(--s-hci); } .hf7-talk .q{ background:color-mix(in srgb, var(--graphite) 70%, var(--paper)); }
.hf7-cal{ display:flex; gap:4px; justify-content:center; margin-top:8px; }
.hf7-cal > div{ border:1.3px solid var(--line); border-radius:7px; padding:4px 6px; font-size:.8rem; background:var(--paper); }
.hf7-cal > div.int{ border-color:var(--k-hci); background:color-mix(in srgb, var(--k-hci) 14%, var(--paper)); font-weight:600; }
.hf7-cal > div.gap{ border-style:dashed; color:var(--graphite); }
.hf7-step{ border:1.4px solid var(--line); border-radius:9px; padding:5px 9px; margin:5px 0; background:var(--paper); transition:all .4s ease; }
.hf7-step.on{ border-color:var(--k-hci); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-hci) 20%, transparent); }
.hf7-step.off{ opacity:.35; }
.hf7-step b{ font-size:.86rem; }
.hf7-step span{ display:block; font-size:.82rem; color:var(--graphite); }
.hf7-groupvis{ display:flex; justify-content:center; align-items:flex-end; gap:5px; height:44px; margin:4px 0 8px; }
.hf7-groupvis i{ width:16px; height:26px; border-radius:8px 8px 3px 3px; background:var(--s-hci); transition:opacity .4s ease; }
.hf7-groupvis i.me{ height:30px; background:color-mix(in srgb, var(--graphite) 70%, var(--paper)); }
.hf7-pros{ display:flex; flex-direction:column; gap:5px; }
.hf7-pro{ border:1.3px solid var(--line); border-left:4px solid var(--k-hci); border-radius:7px; padding:5px 8px; font-size:.86rem; background:var(--paper); animation:hf7in .4s ease both; }
.hf7-bars{ display:grid; grid-template-columns:auto 1fr; gap:4px 8px; align-items:center; font-size:.82rem; margin-top:6px; }
.hf7-bars > div{ height:14px; border-radius:4px; background:var(--paper-2); border:1px solid var(--line); overflow:hidden; }
.hf7-bars i{ display:block; height:100%; transition:width .8s ease; }
.hf7-bars i.real{ background:color-mix(in srgb, var(--graphite) 60%, var(--paper)); }
.hf7-bars i.rep{ background:var(--s-hci); }
.hf7-fuzzy{ filter:blur(1.5px); transition:filter .6s ease; }
.hf7-small{ font-size:.78rem; color:var(--graphite); text-align:center; margin-top:4px; }
@media (prefers-reduced-motion: reduce){ .hf7-notes i, .hf7-pro{ animation:none; } }`;
  if (!document.getElementById('hf7-css')) { const s = document.createElement('style'); s.id = 'hf7-css'; s.textContent = CSS; document.head.appendChild(s); }

  const Modes = ({ list, mode, set }) => html`<div className="hf7-row" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  /* ── §0: interviews vs surveys: depth, reach, cost, and using them in sequence ── */
  function InterviewVsSurvey({ ar }) {
    const [m, setM] = useState('int');
    const [order, setOrder] = useState(0);
    const isInt = m === 'int', isSeq = m === 'seq';
    const W = ['who', 'what', 'where', 'when', 'why', 'how'];
    const cap = isSeq ? (order === 0
      ? { en: 'Interviews and surveys can be done <b>in sequence in either order</b>, using the results of one to plan the other. Here a survey comes first and its results plan the interviews.', ar: 'الـ Interviews والـ surveys ممكن يتعملوا <b>ورا بعض بأي ترتيب</b>، وتستخدم نتايج واحد عشان تخطط للتاني. هنا الـ survey الأول، ونتايجه بتخطط للـ interviews.' }
      : { en: 'The other order works too: interviews come first, and their results plan the survey.', ar: 'والترتيب التاني شغال برضه: الـ interviews الأول، ونتايجها بتخطط للـ survey.' })
      : isInt
        ? { en: 'An <b>interview</b> is the most common research technique. It gives a <b>deeper, more thorough understanding</b>: more open-ended and "why" questions (Joyner: the 6 Ws), room for follow-up questions, and reflection on rare events. But far fewer users can be interviewed, and it is <b>more expensive</b>: synchronous, and interviewees often expect incentives.', ar: 'الـ <b>interview</b> هو الـ research technique الأكتر انتشاراً. بيدّي <b>فهم أعمق وأشمل</b>: أسئلة مفتوحة وأسئلة "ليه" أكتر (عند Joyner الـ 6 Ws)، ومساحة لـ follow-up questions، وتفكير في الأحداث النادرة. بس عدد الـ users اللي تقدر تعملهم interview أقل بكتير، وهو <b>أغلى</b>: synchronous، واللي بيتعملهم interview غالباً مستنيين incentives.' }
        : { en: 'A <b>survey</b> reaches far more users than interviews can. Compared with an interview it gives less depth, with fewer open-ended "why" questions and no room for follow-up.', ar: 'الـ <b>survey</b> بيوصل لـ users أكتر بكتير من الـ interviews. وبالمقارنة بالـ interview بيدّي عمق أقل، وأسئلة مفتوحة وأسئلة "ليه" أقل، ومفيهوش مساحة للـ follow-up.' };
    const meter = (label, v) => html`<div className="hf7-meter">${label}<div><i style=${{ width: v + '%' }}></i></div></div>`;
    return html`<figure className="fig hf7"><div className="fig-stage"><div className="hf7-wrap">
      <${Modes} list=${[['int', 'Interview'], ['srv', 'Survey'], ['seq', 'Use both']]} mode=${m} set=${setM} />
      ${!isSeq && html`<div className="hf7-cmp">
        ${[['int', 'Interview', 92, 8, 'deeper', 'higher'], ['srv', 'Survey', 35, 40, 'less deep', 'lower']].map(([k, t, depth, n]) => html`<div key=${k} className=${'hf7-col' + (m === k ? ' on' : '')}>
          <b>${t}</b>
          ${meter('Depth of understanding', depth)}
          <div className="hf7-meter">Users reached</div>
          <div className="hf7-people" aria-label=${n + ' users'}>${Array.from({ length: n }, (_, j) => html`<i key=${j}></i>`)}</div>
          ${meter('Cost per user', k === 'int' ? 90 : 25)}
        </div>`)}
      </div>
      <div className="hf7-chips" aria-label="The 6 Ws">${W.map(w => html`<span key=${w} className=${'hf7-chip' + (isInt ? ' on' : '')}>${w}</span>`)}</div>
      <p className="hf7-small">${isInt ? 'Joyner: focus on the 6 Ws. Bars are schematic.' : 'Bars are schematic: the notes say far fewer users can be interviewed than surveyed.'}</p>`}
      ${isSeq && html`<div>
        <div className="hf7-seq">
          <span className="box">${order === 0 ? 'Survey' : 'Interviews'}</span><span aria-hidden="true">→</span><span>results plan</span><span aria-hidden="true">→</span><span className="box">${order === 0 ? 'Interviews' : 'Survey'}</span>
          <small>either order works</small>
        </div>
        <div className="hf7-row" style=${{ marginTop: '10px' }}><button className="fig-btn" onClick=${() => setOrder(o => 1 - o)}>Swap the order</button></div>
      </div>`}
    </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §1: running a good interview ── */
  const NOTE_LINES = ['notes: what the user said', 'notes: emotions', 'notes: reactions'];
  function GoodInterview({ ar }) {
    const steps = [
      { en: '<b>Plan ahead</b> and prepare the questions before the interview.', ar: '<b>خطط من بدري</b> وجهّز الأسئلة قبل الـ interview.', s: 0 },
      { en: 'During the interview there are two keys. <b>One person asks</b> and <b>one takes notes</b>.', ar: 'أثناء الـ interview فيه مفتاحين. <b>واحد يسأل</b> و<b>واحد يكتب notes</b>.', s: 1 },
      { en: '<b>Listen well</b>: the user should talk most of the time.', ar: '<b>اسمع كويس</b>: الـ user هو اللي المفروض يتكلم أغلب الوقت.', s: 1, talk: 1 },
      { en: '<b>Take notes</b>: an audio recording is not enough, so note the user\'s <b>emotions and reactions</b> too.', ar: '<b>اكتب notes</b>: الـ audio recording مش كفاية، فاكتب كمان <b>المشاعر وردود الفعل</b> بتاعة الـ user.', s: 1, talk: 1, notes: 3 },
      { en: '<b>Leave some time between interviews.</b>', ar: '<b>سيب شوية وقت بين الـ interviews.</b>', s: 2 },
    ];
    const [i, ctl] = useSteps(steps.length, 2800);
    const st = steps[i];
    const part = (k, t, d) => html`<div className=${'hf7-step' + (st.s === k ? ' on' : st.s < k ? ' off' : '')}><b>${t}</b><span>${d}</span></div>`;
    return html`<figure className="fig hf7"><div className="fig-stage"><div className="hf7-wrap">
      ${part(0, 'Before', 'plan ahead, prepare questions')}
      ${part(1, 'During', 'listen well, take notes')}
      ${st.s === 1 && html`<div>
        <div className="hf7-room">
          <div className="hf7-who on"><b>Interviewer</b><span>asks</span><span className="hf7-bubble">question?</span></div>
          <div className="hf7-who"><b>Note-taker</b><span>writes</span></div>
        </div>
        <div className="hf7-who on" style=${{ marginTop: '8px' }}><b>User</b><span>talks most of the time</span>${st.talk && html`<span className="hf7-bubble">answer… answer… answer…</span>`}</div>
        ${st.talk && html`<div className="hf7-talk" role="img" aria-label="Talk time: the user talks most of the time"><div className="u" style=${{ flexGrow: 4 }}>User</div><div className="q" style=${{ flexGrow: 1 }}>Asks</div></div>`}
        ${st.notes && html`<div className="hf7-notes">${NOTE_LINES.slice(0, st.notes).map((n, k) => html`<i key=${k} style=${{ animationDelay: calm() ? '0s' : k * 0.4 + 's' }}>✎ ${n}</i>`)}</div>`}
      </div>`}
      ${part(2, 'Between interviews', 'leave some time')}
      ${st.s === 2 && html`<div className="hf7-cal" aria-label="Interviews with time between them"><div className="int">Interview 1</div><div className="gap">time</div><div className="int">Interview 2</div><div className="gap">time</div><div className="int">Interview 3</div></div>`}
    </div></div><${Cap} ...${st} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── §2: individuals vs groups (the notes' table) ── */
  const PROS = {
    ind: [['More time/effort spent with each participant', 'وقت ومجهود أكتر مع كل participant'], ['Easier to coordinate the logistics', 'تنسيق الـ logistics أسهل'], ['More privacy for participants', 'فيه privacy أكتر للـ participants']],
    grp: [['Easier to get more feedback', 'أسهل تاخد feedback أكتر'], ['Participants\' discussion can highlight assumptions', 'النقاش بين الـ participants ممكن يبيّن الـ assumptions'], ['May need to deal with confounding personalities', 'ممكن تحتاج تتعامل مع شخصيات بتلخبط النتايج (confounding personalities)'], ['"Presentation of self" issues', 'مشاكل الـ "Presentation of self"']],
  };
  function IndivGroup({ ar }) {
    const [m, setM] = useState('ind');
    const ind = m === 'ind', list = PROS[m];
    const cap = ind
      ? { en: '<b>Interviewing individuals</b>: ' + list.map(p => p[0].toLowerCase()).join('; ') + '.', ar: '<b>الـ interview مع أفراد</b>:<br>' + list.map(p => '• ' + p[1]).join('<br>') }
      : { en: '<b>Interviewing groups</b>: ' + list.map(p => p[0].charAt(0).toLowerCase() + p[0].slice(1)).join('; ') + '.', ar: '<b>الـ interview مع groups</b>:<br>' + list.map(p => '• ' + p[1]).join('<br>') };
    return html`<figure className="fig hf7"><div className="fig-stage"><div className="hf7-wrap">
      <${Modes} list=${[['ind', 'Individuals'], ['grp', 'Groups']]} mode=${m} set=${setM} />
      <div className="hf7-groupvis" role="img" aria-label=${ind ? 'One interviewer with one participant' : 'One interviewer with a group of participants'}>
        <i className="me"></i>${Array.from({ length: ind ? 1 : 5 }, (_, j) => html`<i key=${m + j}></i>`)}
      </div>
      <div className="hf7-pros" key=${m}>${list.map((p, k) => html`<div key=${k} className="hf7-pro" style=${{ animationDelay: calm() ? '0s' : k * 0.15 + 's' }}>${p[0]}</div>`)}</div>
    </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §3: challenges of data gathered by asking questions ── */
  function AskChallenges({ ar }) {
    const steps = [
      { en: 'Gathering data <b>by asking questions</b> (surveys and interviews) has challenges.', ar: 'تجميع الـ data <b>عن طريق الأسئلة</b> (الـ surveys والـ interviews) ليه تحديات.', k: -1 },
      { en: '<b>Planning</b> takes more time and effort than the team may have.', ar: 'الـ <b>التخطيط</b> بياخد وقت ومجهود أكتر من اللي ممكن يكون عند الفريق.', k: 0 },
      { en: '<b>Analysis of qualitative data</b> is not easy.', ar: 'الـ <b>تحليل الـ qualitative data</b> مش سهل.', k: 1 },
      { en: '<b>Recall bias</b>: inaccurate answers about things in the past.', ar: 'الـ <b>Recall bias</b>، يعني إجابات مش دقيقة عن حاجات حصلت زمان.', k: 2 },
      { en: '<b>Reporting bias</b>: people give answers more ideal than reality.', ar: 'الـ <b>Reporting bias</b>، يعني الناس بتدّي إجابات مثالية أكتر من الواقع.', k: 3 },
      { en: '<b>Solution</b>: combine asking with other techniques, such as participant observation, usability studies and secondary research.', ar: '<b>الحل</b>: اعمل combination بين الأسئلة و techniques تانية، زي الـ participant observation والـ usability studies والـ secondary research.', k: 4 },
    ];
    const [i, ctl] = useSteps(steps.length, 2900);
    const k = steps[i].k;
    const C = [['Planning', 'more time and effort than the team may have'], ['Qualitative analysis', 'not easy'], ['Recall bias', 'inaccurate answers about the past'], ['Reporting bias', 'answers more ideal than reality']];
    return html`<figure className="fig hf7"><div className="fig-stage"><div className="hf7-wrap">
      ${C.map(([t, d], j) => html`<div key=${j} className=${'hf7-step' + (k === j ? ' on' : k < j && k !== 4 ? ' off' : '')}><b>${t}</b><span>${d}</span>
        ${j === 2 && k === 2 && html`<div className="hf7-bars"><span>What happened</span><div><i className="real" style=${{ width: '70%' }}></i></div><span>Answer later</span><div><i className=${'rep' + (calm() ? '' : ' hf7-fuzzy')} style=${{ width: '45%' }}></i></div></div><p className="hf7-small">schematic</p>`}
        ${j === 3 && k === 3 && html`<div className="hf7-bars"><span>Reality</span><div><i className="real" style=${{ width: '55%' }}></i></div><span>Reported</span><div><i className="rep" style=${{ width: '92%' }}></i></div></div><p className="hf7-small">schematic: the answer looks better than reality</p>`}
      </div>`)}
      ${k === 4 && html`<div className="hf7-chips">${['Asking questions', 'Participant observation', 'Usability studies', 'Secondary research'].map((t, j) => html`<span key=${j} className="hf7-chip on">${t}</span>`)}</div>`}
    </div></div><${Cap} ...${steps[i]} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'hc-interview-vs-survey': InterviewVsSurvey, 'hc-good-interview': GoodInterview, 'hc-indiv-group': IndivGroup, 'hc-ask-challenges': AskChallenges });
})();
/* ── part 8 ── */
// HCI visuals, part 8: L8 Design alternatives and prototyping (Joyner's biggest mistakes, exploring alternatives, prototypes as questions). Every label and caption comes from the site's notes for that lecture.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.hf8 .fig-dots i.on{ background:var(--k-hci); } .hf8 .fig-btn:hover{ border-color:var(--k-hci); }
.hf8 .fig-btn[aria-pressed="true"]{ background:var(--s-hci); color:#fff; border-color:transparent; }
.hf8-row{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin:0 0 10px; }
.hf8-row .fig-btn{ font-size:.84rem; padding:4px 10px; min-height:32px; }
.hf8-wrap{ max-width:460px; margin:0 auto; color:var(--ink); font-size:.88rem; line-height:1.45; }
.hf8-path{ display:flex; flex-direction:column; gap:5px; }
.hf8-node{ border:1.4px solid var(--line); border-radius:9px; padding:5px 9px; background:var(--paper); transition:all .4s ease; animation:hf8in .4s ease both; }
.hf8-node.on{ border-color:var(--k-hci); background:color-mix(in srgb, var(--k-hci) 10%, var(--paper)); }
.hf8-node.bad{ border-color:var(--pen); background:color-mix(in srgb, var(--pen) 9%, var(--paper)); }
.hf8-node b{ font-size:.86rem; }
.hf8-node span{ display:block; font-size:.82rem; color:var(--graphite); }
.hf8-arrow{ text-align:center; color:var(--graphite); font-size:.9rem; line-height:1; }
@keyframes hf8in{ from{ opacity:0; transform:translateY(5px); } to{ opacity:1; transform:none; } }
.hf8-ideas{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; min-height:62px; padding:6px; border:1.3px dashed var(--line); border-radius:10px; background:var(--paper); }
.hf8-idea{ width:52px; height:52px; border-radius:10px; border:1.6px solid var(--k-hci); background:color-mix(in srgb, var(--k-hci) 12%, var(--paper)); display:grid; place-items:center; font-size:.84rem; font-weight:700; color:var(--ink); cursor:pointer; animation:hf8in .35s ease both; position:relative; font-family:inherit; }
.hf8-idea.pick{ background:var(--s-hci); color:#fff; border-color:var(--s-hci); }
.hf8-idea i{ position:absolute; inset:6px; border-radius:6px; border:1.4px dashed currentColor; opacity:.45; }
.hf8-idea.c1 i{ border-radius:50%; } .hf8-idea.c2 i{ inset:12px 4px; } .hf8-idea.c3 i{ inset:4px 14px; border-radius:2px; } .hf8-idea.c4 i{ transform:rotate(45deg); inset:10px; }
.hf8-idea.same i{ border-radius:6px; inset:6px; transform:none; }
.hf8-final{ margin-top:8px; border:1.6px solid var(--k-hci); border-radius:10px; padding:6px 9px; text-align:center; font-size:.86rem; background:color-mix(in srgb, var(--k-hci) 8%, var(--paper)); }
.hf8-final b{ color:var(--k-hci); }
.hf8-check{ display:flex; align-items:center; gap:6px; justify-content:center; font-size:.84rem; margin:8px 0 0; }
.hf8-check input{ width:18px; height:18px; accent-color:var(--s-hci); }
.hf8-count{ text-align:center; font-size:.84rem; color:var(--graphite); margin-top:6px; }
.hf8-count b{ color:var(--k-hci); font-size:1rem; }
.hf8-mice{ display:flex; flex-wrap:wrap; gap:2px; justify-content:center; margin-top:4px; }
.hf8-mice i{ width:9px; height:13px; border-radius:5px 5px 6px 6px; background:var(--s-hci); opacity:.85; }
.hf8-loop{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hf8-q{ border:1.4px solid var(--line); border-radius:10px; padding:6px 8px; background:var(--paper); text-align:center; transition:all .4s ease; }
.hf8-q.on{ border-color:var(--k-hci); box-shadow:0 0 0 3px color-mix(in srgb, var(--k-hci) 20%, transparent); }
.hf8-q b{ display:block; font-size:.86rem; }
.hf8-q span{ display:block; font-size:.8rem; color:var(--graphite); }
.hf8-sketch{ height:40px; margin:5px auto 0; width:70%; border:1.6px dashed var(--graphite); border-radius:6px; position:relative; }
.hf8-sketch::after{ content:'?'; position:absolute; inset:0; display:grid; place-items:center; font-weight:700; color:var(--k-hci); font-size:1.1rem; }
.hf8-know{ display:flex; gap:3px; justify-content:center; margin-top:8px; flex-wrap:wrap; }
.hf8-know i{ font-style:normal; font-size:.8rem; border:1.2px solid var(--k-hci); border-radius:99px; padding:1px 8px; background:color-mix(in srgb, var(--k-hci) 12%, var(--paper)); animation:hf8in .35s ease both; }
.hf8-waste{ text-align:center; color:var(--pen); font-weight:700; font-size:.86rem; margin-top:8px; }
.hf8-small{ font-size:.78rem; color:var(--graphite); text-align:center; margin-top:4px; }
@media (prefers-reduced-motion: reduce){ .hf8-node, .hf8-idea, .hf8-know i{ animation:none; } }`;
  if (!document.getElementById('hf8-css')) { const s = document.createElement('style'); s.id = 'hf8-css'; s.textContent = CSS; document.head.appendChild(s); }

  const Modes = ({ list, mode, set }) => html`<div className="hf8-row" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(mode === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  /* ── §0: Joyner's two biggest mistakes, and what to do instead ── */
  function Mistakes({ ar }) {
    const [m, setM] = useState('m1');
    const [fix, setFix] = useState(false);
    const one = m === 'm1';
    const steps = one
      ? (fix ? [['Understand the users', 'who they are'], ['Understand the task', 'what they need to do'], ['Design the interface', 'now it fits users and task']] : [['Jump straight to designing', 'no understanding of users or task'], ['Interface', 'built on guesses']])
      : (fix ? [['Many design ideas', 'from different genres'], ['Explore them', 'keep options open'], ['Settle later', 'when you know more']] : [['One design idea', 'or one genre of ideas'], ['Settle on it too early', 'no alternatives explored']]);
    const cap = one
      ? (fix ? { en: 'Instead: <b>understand the users and the task first</b>, then design the interface.', ar: 'بدل كده: <b>افهم الـ users والـ task الأول</b>، وبعدين صمم الـ interface.' }
        : { en: '<b>Biggest mistake</b> (Joyner): jumping straight to designing an interface without understanding the users or the task.', ar: '<b>أكبر غلطة</b> عند Joyner: إنك تنط على طول تصمم interface من غير ما تفهم الـ users أو الـ task.' })
      : (fix ? { en: 'Instead: explore a wide range of alternatives before settling on one.', ar: 'بدل كده: استكشف alternatives كتير ومتنوعة قبل ما تثبت على واحد.' }
        : { en: '<b>Second biggest mistake</b> (Joyner): settling on a single design idea or a single genre of ideas too early.', ar: '<b>تاني أكبر غلطة</b> عند Joyner: إنك تثبت على فكرة design واحدة أو نوع واحد من الأفكار بدري أوي.' });
    return html`<figure className="fig hf8"><div className="fig-stage"><div className="hf8-wrap">
      <${Modes} list=${[['m1', 'Biggest mistake'], ['m2', 'Second biggest']]} mode=${m} set=${k => { setM(k); setFix(false); }} />
      <div className="hf8-path" key=${m + fix}>${steps.map(([t, d], k) => html`<div key=${k}>
        ${k > 0 && html`<div className="hf8-arrow" aria-hidden="true">↓</div>`}
        <div className=${'hf8-node ' + (fix ? 'on' : 'bad')} style=${{ animationDelay: calm() ? '0s' : k * 0.25 + 's' }}><b>${t}</b><span>${d}</span></div></div>`)}</div>
      <div className="hf8-row" style=${{ marginTop: '10px' }}><button className="fig-btn" aria-pressed=${String(fix)} onClick=${() => setFix(f => !f)}>${fix ? 'Show the mistake' : 'Show what to do instead'}</button></div>
    </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §1: design alternatives: explore many, stay away from the existing interface, combine ── */
  const LET = 'ABCDEFGHIJKL';
  function Alternatives({ ar }) {
    const [n, setN] = useState(3);
    const [captured, setCaptured] = useState(false);
    const [pick, setPick] = useState([]);
    const [mouse, setMouse] = useState(false);
    const toggle = k => setPick(p => p.includes(k) ? p.filter(x => x !== k) : p.concat(k));
    const cap = mouse
      ? { en: 'How many alternatives? <b>As many as you can.</b> Example: the first Microsoft mouse had <b>more than 100 prototypes</b>.', ar: 'كام alternative؟ <b>أكتر ما تقدر.</b> مثال: أول ماوس من Microsoft اتعمله <b>أكتر من 100 prototype</b>.' }
      : captured
        ? { en: 'When enhancing an existing system you are easily <b>captured by its current interface</b>: every alternative ends up looking like it. Advice: distance yourself from existing solutions, at least during brainstorming.', ar: 'لما تكون بتحسّن system موجود، سهل تبقى <b>محبوس في الـ interface الحالي بتاعه</b>: وكل alternative بيطلع شبهه. النصيحة: ابعد نفسك عن الحلول الموجودة، على الأقل وقت الـ brainstorming.' }
        : pick.length > 1
          ? { en: 'The <b>final design</b> is often a <b>combination</b> of alternatives explored earlier, here ' + pick.map(k => LET[k]).join(' + ') + '.', ar: 'الـ <b>design النهائي</b> غالباً بيبقى <b>combination</b> من alternatives اتستكشفت قبل كده.' }
          : { en: 'Design alternatives are a separate phase in Joyner\'s cycle: <b>explore a wide range</b> instead of focusing on one from the start. Add alternatives, then tap two or more to combine them.', ar: 'الـ Design alternatives مرحلة لوحدها في الـ cycle بتاع Joyner: <b>استكشف alternatives كتير ومتنوعة</b> بدل ما تركز على واحد من الأول. ضيف alternatives، وبعدين دوس على اتنين أو أكتر عشان تجمعهم.' };
    return html`<figure className="fig hf8"><div className="fig-stage"><div className="hf8-wrap">
      ${!mouse && html`<div>
        <div className="hf8-ideas" role="group" aria-label="Design alternatives">${Array.from({ length: n }, (_, k) => html`<button key=${k} className=${'hf8-idea c' + (k % 5) + (captured ? ' same' : '') + (pick.includes(k) ? ' pick' : '')} aria-pressed=${String(pick.includes(k))} onClick=${() => toggle(k)} style=${{ animationDelay: calm() ? '0s' : '0s' }}><i></i>${LET[k]}</button>`)}</div>
        <div className="hf8-row" style=${{ marginTop: '8px' }}>
          <button className="fig-btn" disabled=${n >= LET.length} onClick=${() => setN(x => Math.min(LET.length, x + 1))}>Add an alternative</button>
          <button className="fig-btn" onClick=${() => { setN(3); setPick([]); }}>↻ Start over</button>
        </div>
        <label className="hf8-check"><input type="checkbox" checked=${captured} onChange=${e => setCaptured(e.target.checked)} />Captured by the existing interface</label>
        ${pick.length > 1 && !captured && html`<div className="hf8-final">Final design = <b>${pick.map(k => LET[k]).join(' + ')}</b></div>`}
      </div>`}
      ${mouse && html`<div>
        <div className="hf8-count">First Microsoft mouse: <b>100+</b> prototypes</div>
        <div className="hf8-mice" role="img" aria-label="More than 100 prototypes">${Array.from({ length: 101 }, (_, k) => html`<i key=${k}></i>`)}</div>
      </div>`}
      <div className="hf8-row" style=${{ marginTop: '10px' }}><button className="fig-btn" aria-pressed=${String(mouse)} onClick=${() => setMouse(x => !x)}>How many alternatives?</button></div>
    </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── §2: prototyping: an approximation for quick feedback; prototypes are questions ── */
  function PrototypeLoop({ ar }) {
    const steps = [
      { en: 'Most people think a prototype is a quick or small version of the real thing. That is not a useful understanding.', ar: 'أغلب الناس فاكرة إن الـ prototype نسخة سريعة أو صغيرة من الحاجة الحقيقية. والفهم ده مش مفيد.', on: -1 },
      { en: 'For designers: "Rapidly creating an <b>approximation</b> of a design so that you can quickly get <b>feedback</b>." It does not need to resemble the final product.', ar: 'بالنسبة للـ designers: الـ prototype هو إنك تعمل بسرعة <b>نسخة تقريبية</b> من الـ design عشان تاخد <b>feedback</b> بسرعة. ومش لازم يشبه المنتج النهائي.', on: 0 },
      { en: 'A good prototype enables useful (constructive) <b>feedback</b>.', ar: 'الـ prototype الكويس بيخليك تاخد <b>feedback</b> مفيد (constructive).', on: 1 },
      { en: '…and <b>iteration</b>. Klemmer: "A prototype is not about the artifact, it\'s about feedback and iteration."', ar: '…وتعمل <b>iteration</b>. بيقول Klemmer إن الـ prototype مش عن الحاجة نفسها، هو عن الـ feedback والـ iteration.', on: 2, k: 2 },
      { en: 'Joyner: design is an iterative process of brainstorming, combining, abandoning, revising and improving ideas, so you need several ideas to start with.', ar: 'بيقول Joyner إن الـ design هو process iterative فيه brainstorming وتجميع وسيب وتعديل وتحسين للأفكار، فمحتاج كذا فكرة تبدأ بيهم.', on: 2, k: 4 },
      { en: 'Klemmer: "<b>prototypes are questions</b>, ask a lot of them." A prototype that gives no new knowledge wastes the design process.', ar: 'بيقول Klemmer إن الـ <b>prototypes أسئلة</b>، اسأل كتير منها. والـ prototype اللي مش بيدّيك معرفة جديدة بيضيّع الـ design process.', on: 3, k: 4 },
    ];
    const [i, ctl] = useSteps(steps.length, 3000);
    const [waste, setWaste] = useState(false);
    const s = steps[i];
    const box = (k, t, d, sketch) => html`<div className=${'hf8-q' + (s.on === k ? ' on' : '')}><b>${t}</b><span>${d}</span>${sketch && html`<div className="hf8-sketch" aria-hidden="true"></div>`}</div>`;
    const learned = s.on >= 2 && !waste ? Math.max(1, s.k || 1) : 0;
    return html`<figure className="fig hf8"><div className="fig-stage"><div className="hf8-wrap">
      <div className="hf8-loop">
        ${box(0, 'Prototype', 'a rough approximation', true)}
        ${box(1, 'Feedback', 'useful, constructive')}
        ${box(2, 'Iterate', 'revise and improve')}
        ${box(3, 'Prototypes = questions', 'ask a lot of them')}
      </div>
      ${s.on >= 2 && html`<div className="hf8-know" aria-label="New knowledge from each round">${Array.from({ length: learned }, (_, k) => html`<i key=${k}>new knowledge ${k + 1}</i>`)}</div>`}
      ${s.on >= 2 && waste && html`<div className="hf8-waste">No new knowledge: the prototype was wasted</div>`}
      ${s.on >= 2 && html`<label className="hf8-check"><input type="checkbox" checked=${waste} onChange=${e => setWaste(e.target.checked)} />The prototype teaches us nothing new</label>`}
    </div></div><${Cap} ...${waste && s.on >= 2 ? { en: 'Prototypes that give <b>no new knowledge</b> waste the design process.', ar: 'الـ Prototypes اللي <b>مش بتدّيك معرفة جديدة</b> بتضيّع الـ design process.' } : s} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'hc-design-mistakes': Mistakes, 'hc-alternatives': Alternatives, 'hc-prototype-loop': PrototypeLoop });
})();
/* ── part 9 ── */
// HCI visuals, part 9: L9 fidelity, brainstorming, handoff vs handshake, wireframes, breadcrumbs vs progress bars, form design. Every label and caption comes from the site's notes for that lecture.
(function () {
  const { useState, useEffect } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.hf9 .fig-btn[aria-pressed="true"]{ background:var(--s-hci); color:#fff; border-color:transparent; }
.hf9 .fig-btn:disabled{ opacity:.45; cursor:default; }
.hf9 .fig-dots i.on{ background:var(--k-hci); }
.hf9-wrap{ max-width:440px; margin:0 auto; color:var(--ink); font-size:.86rem; line-height:1.4; }
.hf9-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-bottom:10px; }
.hf9-screen{ border:1.6px solid var(--line); border-radius:10px; background:var(--paper); padding:10px; transition:all .5s; }
.hf9-screen.lo{ border-style:dashed; border-color:var(--graphite); transform:rotate(-.6deg); }
.hf9-screen.hi{ border-color:var(--k-hci); box-shadow:0 2px 10px color-mix(in srgb, var(--ink) 12%, transparent); }
.hf9-bar{ height:22px; border-radius:5px; margin-bottom:8px; display:flex; align-items:center; padding:0 8px; font-size:.8rem; font-weight:600; transition:all .5s; }
.hf9-screen.lo .hf9-bar{ border:1.5px dashed var(--graphite); color:var(--graphite); background:transparent; }
.hf9-screen.hi .hf9-bar{ background:var(--s-hci); color:#fff; }
.hf9-row{ display:flex; gap:8px; align-items:stretch; }
.hf9-img{ flex:0 0 38%; min-height:64px; border-radius:6px; position:relative; transition:all .5s; display:flex; align-items:center; justify-content:center; font-size:.8rem; }
.hf9-screen.lo .hf9-img{ border:1.5px dashed var(--graphite); color:var(--graphite); }
.hf9-screen.hi .hf9-img{ background:color-mix(in srgb, var(--k-hci) 22%, var(--paper)); color:var(--ink); }
.hf9-lines{ flex:1; display:flex; flex-direction:column; gap:6px; justify-content:center; }
.hf9-lines i{ display:block; height:7px; border-radius:4px; transition:all .5s; }
.hf9-screen.lo .hf9-lines i{ border-top:1.5px solid var(--graphite); height:0; border-radius:0; }
.hf9-screen.hi .hf9-lines i{ background:color-mix(in srgb, var(--ink) 30%, var(--paper)); }
.hf9-cta{ margin-top:9px; text-align:center; }
.hf9-cta span{ display:inline-block; padding:4px 14px; border-radius:99px; font-size:.82rem; font-weight:600; transition:all .5s; }
.hf9-screen.lo .hf9-cta span{ border:1.5px dashed var(--graphite); color:var(--graphite); }
.hf9-screen.hi .hf9-cta span{ background:var(--s-hci); color:#fff; }
.hf9-facts{ list-style:none; margin:10px 0 0; padding:0; display:flex; flex-direction:column; gap:5px; }
.hf9-facts li{ border-radius:7px; padding:5px 8px; background:var(--paper); border:1px solid var(--line); font-size:.82rem; animation:hf9in .4s ease both; }
.hf9-facts li.good{ border-color:var(--ok); }
.hf9-facts li.bad{ border-color:var(--pen); }
@keyframes hf9in{ from{ opacity:0; transform:translateY(4px); } to{ opacity:1; transform:none; } }
.hf9-in{ display:flex; gap:6px; margin-bottom:8px; }
.hf9-in input{ flex:1; min-width:0; font:inherit; font-size:.86rem; padding:6px 8px; border-radius:8px; border:1.3px solid var(--line); background:var(--paper); color:var(--ink); }
.hf9-meter{ height:10px; border-radius:99px; background:var(--paper); border:1px solid var(--line); overflow:hidden; margin:4px 0 8px; }
.hf9-meter i{ display:block; height:100%; background:var(--k-hci); transition:width .4s; }
.hf9-ideas{ display:flex; flex-wrap:wrap; gap:5px; min-height:30px; }
.hf9-idea{ border:1.3px solid var(--k-hci); background:color-mix(in srgb, var(--k-hci) 12%, var(--paper)); border-radius:8px; padding:3px 8px; font-size:.82rem; animation:hf9in .35s ease both; }
.hf9-msg{ margin-top:8px; border-left:3px solid var(--pen); padding:4px 8px; background:var(--paper); font-size:.82rem; }
.hf9-msg.ok{ border-left-color:var(--ok); }
.hf9-small{ font-size:.8rem; color:var(--graphite); }
.hf9-lane{ margin:6px 0 10px; }
.hf9-lane b{ display:block; font-size:.84rem; margin-bottom:3px; }
.hf9-track{ position:relative; height:24px; border-radius:6px; background:var(--paper); border:1px solid var(--line); }
.hf9-fill{ position:absolute; top:3px; bottom:3px; border-radius:4px; transition:width 1.6s ease, left 1.6s ease; display:flex; align-items:center; padding-left:6px; font-size:.8rem; font-weight:600; color:#fff; overflow:hidden; white-space:nowrap; }
.hf9-fill.d{ background:var(--s-hci); }
.hf9-fill.v{ background:color-mix(in srgb, var(--ink) 55%, var(--paper)); }
.hf9-sync{ position:absolute; top:-4px; bottom:-4px; width:3px; border-radius:2px; background:var(--pen); opacity:0; transition:opacity .4s; }
.hf9-sync.on{ opacity:1; }
.hf9-wf{ border:1.6px solid var(--ink); border-radius:8px; background:var(--paper); padding:9px; position:relative; min-height:210px; }
.hf9-wf .ph{ border:1.5px solid var(--ink); border-radius:5px; margin-bottom:8px; transition:opacity .45s, transform .45s; }
.hf9-wf .ph.off{ opacity:0; transform:translateY(5px); }
.hf9-wf .head{ height:24px; display:flex; align-items:center; justify-content:space-between; padding:0 7px; font-size:.8rem; }
.hf9-wf .txt i{ display:block; height:0; border-top:2px solid var(--ink); margin:7px 6px; }
.hf9-wf .pic{ height:70px; }
.hf9-wf .pic svg{ display:block; width:100%; height:100%; }
.hf9-wf .btn{ width:46%; margin:0 auto 4px; height:26px; border-radius:99px; display:flex; align-items:center; justify-content:center; font-size:.8rem; }
.hf9-wf.color{ background:color-mix(in srgb, var(--k-hci) 10%, var(--paper)); }
.hf9-wf.color .ph{ border-color:var(--k-hci); }
.hf9-wf.color .btn{ background:var(--s-hci); color:#fff; }
.hf9-note{ position:absolute; right:-4px; background:var(--pen); color:#fff; border-radius:10px; padding:1px 7px; font-size:.78rem; transition:opacity .45s; }
.hf9-thumbs{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:5px; margin:6px 0; }
.hf9-thumb{ border:1.4px dashed var(--graphite); border-radius:5px; height:58px; padding:4px; display:flex; flex-direction:column; gap:4px; transition:opacity .4s; }
.hf9-thumb i{ display:block; border:1.2px solid var(--graphite); border-radius:2px; }
.hf9-tools{ display:flex; flex-wrap:wrap; gap:5px; justify-content:center; }
.hf9-tools span{ border:1.3px solid var(--k-hci); border-radius:99px; padding:2px 9px; font-size:.82rem; }
.hf9-crumbs{ display:flex; flex-wrap:wrap; gap:4px; align-items:center; font-size:.84rem; margin:6px 0; }
.hf9-crumbs span{ padding:2px 6px; border-radius:5px; }
.hf9-crumbs span.cur{ background:color-mix(in srgb, var(--k-hci) 18%, var(--paper)); font-weight:600; }
.hf9-steps{ display:flex; gap:4px; margin:8px 0; }
.hf9-steps span{ flex:1; text-align:center; font-size:.8rem; padding:5px 2px; border-radius:6px; border:1.3px solid var(--line); background:var(--paper); }
.hf9-steps span.done{ background:color-mix(in srgb, var(--k-hci) 22%, var(--paper)); border-color:var(--k-hci); }
.hf9-steps span.cur{ background:var(--s-hci); color:#fff; border-color:transparent; font-weight:600; }
.hf9-form{ border:1.4px solid var(--line); border-radius:10px; background:var(--paper); padding:10px; }
.hf9-form label{ display:block; font-size:.82rem; font-weight:600; margin:6px 0 2px; }
.hf9-field{ border:1.5px solid var(--line); border-radius:6px; padding:5px 7px; font-size:.82rem; color:var(--graphite); background:var(--paper-2); min-height:30px; transition:all .35s; }
.hf9-field.err{ border-color:var(--pen); }
.hf9-field.big{ min-height:64px; }
.hf9-field.tiny{ min-height:22px; width:55%; }
.hf9-errtxt{ color:var(--pen); font-size:.8rem; margin-top:2px; }
.hf9-topbox{ border:1px solid var(--pen); color:var(--pen); border-radius:6px; padding:4px 7px; font-size:.8rem; margin-bottom:4px; }
.hf9-actions{ display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:10px; }
.hf9-link{ color:var(--k-hci); text-decoration:underline; font-size:.84rem; }
.hf9-pbtn{ background:var(--s-hci); color:#fff; border-radius:99px; padding:5px 14px; font-size:.84rem; font-weight:600; }
.hf9-sbtn{ border:1.3px solid var(--line); border-radius:99px; padding:4px 12px; font-size:.84rem; color:var(--ink); }
.hf9-same{ border:1.3px solid var(--line); border-radius:99px; padding:4px 12px; font-size:.84rem; color:var(--ink); background:var(--paper-2); }
.hf9-conf{ margin-top:10px; border:1.4px solid var(--ok); border-radius:8px; padding:7px 9px; font-size:.84rem; animation:hf9in .4s ease both; }
.hf9-rules{ display:flex; flex-direction:column; gap:5px; margin-top:10px; }
.hf9-rule{ display:flex; gap:6px; align-items:flex-start; text-align:left; font:inherit; font-size:.82rem; padding:5px 8px; border-radius:8px; border:1.3px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.hf9-rule[aria-pressed="true"]{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hf9-rule .mk{ flex:0 0 auto; font-weight:700; }
@media (prefers-reduced-motion: reduce){ .hf9-facts li, .hf9-idea, .hf9-conf{ animation:none; } .hf9-fill{ transition:none; } }`;
  if (!document.getElementById('hf9-css')) { const s = document.createElement('style'); s.id = 'hf9-css'; s.textContent = CSS; document.head.appendChild(s); }
  const Modes = ({ list, val, set }) => html`<div className="hf9-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(val === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  /* ── L9 §0-§1: the same screen as a low-fidelity sketch and as a high-fidelity prototype ── */
  const FID = {
    lo: { facts: [['good', 'Start with lo-fi.'], ['good', 'Faster, easier and cheaper to make.'], ['good', 'People are much more willing to talk when given a sketch.'], ['good', 'Konstan: a prototype that looks like little effort gets more constructive feedback.'], ['good', 'Google: present high-level ideas early.']],
      en: '<b>Low fidelity (lo-fi)</b>: far from the look and feel of the final product, like a hand-drawn sketch. This is where you start.',
      ar: 'الـ <b>Low fidelity (lo-fi)</b>: بعيد عن الـ look and feel بتاع المنتج النهائي، زي sketch مرسوم بالإيد. ومن هنا بتبدأ.' },
    hi: { facts: [['good', 'Move to hi-fi as the design proceeds.'], ['bad', 'Hi-fi is not possible at the beginning: many details have not been decided.'], ['bad', 'Too many details make people give feedback at a lower level than needed.'], ['good', 'Google: focus on details and screens later.']],
      en: '<b>High fidelity (hi-fi)</b>: close to the look and feel of the final product. Fidelity is how closely a design matches it.',
      ar: 'الـ <b>High fidelity (hi-fi)</b>: قريب من الـ look and feel بتاع المنتج النهائي. والـ fidelity هي الـ design قريب قد إيه منه.' }
  };
  function Fidelity({ ar }) {
    const [m, setM] = useState('lo'), f = FID[m];
    return html`<figure className="fig hf9"><div className="fig-stage"><div className="hf9-wrap">
      <${Modes} list=${[['lo', 'Lo-fi sketch'], ['hi', 'Hi-fi prototype']]} val=${m} set=${setM} />
      <div className=${'hf9-screen ' + m} role="img" aria-label=${m === 'lo' ? 'A screen drawn as a rough sketch' : 'The same screen as a polished prototype'}>
        <div className="hf9-bar">${m === 'lo' ? 'Title' : 'Title'}</div>
        <div className="hf9-row"><div className="hf9-img">${m === 'lo' ? 'image' : 'Image'}</div><div className="hf9-lines"><i style=${{ width: '92%' }}></i><i style=${{ width: '78%' }}></i><i style=${{ width: '85%' }}></i><i style=${{ width: '55%' }}></i></div></div>
        <div className="hf9-cta"><span>Button</span></div></div>
      <ul key=${m} className="hf9-facts">${f.facts.map(([k, t], j) => html`<li key=${j} className=${k} style=${{ animationDelay: calm() ? '0s' : j * 0.12 + 's' }}>${k === 'good' ? '✓ ' : '✗ '}${t}</li>`)}</ul>
      </div></div><${Cap} en=${f.en} ar=${f.ar} showAr=${ar} /></figure>`;
  }

  /* ── L9 §2: brainstorming by the notes' tips ── */
  function Brainstorm({ ar }) {
    const [ideas, setIdeas] = useState([]), [txt, setTxt] = useState(''), [team, setTeam] = useState(false), [msg, setMsg] = useState(null), [breaks, setBreaks] = useState(0);
    const add = () => { const t = txt.trim(); if (!t) return; setIdeas(x => x.concat(t)); setTxt(''); setMsg(null); };
    const n = ideas.length;
    let en, a;
    if (msg === 'eval') { en = '<b>Do not evaluate or exclude any idea.</b> The aim of brainstorming is to generate a lot of ideas.'; a = '<b>متقيّمش ومتستبعدش أي فكرة.</b> هدف الـ brainstorming إنه يطلّع أفكار كتير.'; }
    else if (msg === 'narrow') { en = '<b>Team sessions are for sharing and adding ideas, not narrowing.</b>'; a = '<b>الـ team sessions للمشاركة وإضافة أفكار، مش للتضييق.</b>'; }
    else if (msg === 'break') { en = 'Take breaks or use several sessions, then come back and keep writing.'; a = 'خد breaks أو اعمل كذا session، وبعدين ارجع وكمّل كتابة.'; }
    else if (!team) { en = '<b>Joyner</b>: start with <b>individual</b> brainstorming, because groups coalesce on ideas too early. Write as many ideas as you can, each a few words or a sentence. Aim for 20.'; a = 'بيقول <b>Joyner</b>: ابدأ بـ brainstorming <b>فردي</b>، لأن الـ groups بتتجمع على أفكار بدري أوي. اكتب أفكار أكتر ما تقدر، وكل فكرة كلمتين أو جملة. وخلي هدفك 20.'; }
    else { en = 'Now a <b>team session</b>: share your ideas and add new ones.'; a = 'دلوقتي <b>team session</b>: شارك أفكارك وزوّد أفكار جديدة.'; }
    return html`<figure className="fig hf9"><div className="fig-stage"><div className="hf9-wrap">
      <${Modes} list=${[['solo', 'Individual first'], ['team', 'Team session']]} val=${team ? 'team' : 'solo'} set=${k => { setTeam(k === 'team'); setMsg(null); }} />
      <p className="hf9-small" style=${{ margin: '0 0 6px' }}>Topic: the lecture's example, a dog-walking app. Type your own ideas.</p>
      <div className="hf9-in"><input value=${txt} maxLength=${80} placeholder="A few words or a sentence" aria-label="New idea" onInput=${e => setTxt(e.target.value)} onKeyDown=${e => { if (e.key === 'Enter') add(); }} /><button className="fig-btn solid" onClick=${add}>Add idea</button></div>
      <div className="hf9-small">${n} / 20 ideas</div><div className="hf9-meter"><i style=${{ width: Math.min(100, n * 5) + '%' }}></i></div>
      <div className="hf9-ideas">${ideas.map((t, k) => html`<span key=${k} className="hf9-idea">${t}</span>`)}</div>
      <div className="hf9-actions">
        <button className="fig-btn" onClick=${() => setMsg('eval')} disabled=${!n}>Judge an idea</button>
        ${team && html`<button className="fig-btn" onClick=${() => setMsg('narrow')} disabled=${!n}>Narrow the list</button>`}
        <button className="fig-btn" onClick=${() => { setBreaks(b => b + 1); setMsg('break'); }}>Take a break${breaks ? ` (${breaks})` : ''}</button></div>
      ${n >= 20 && html`<div className="hf9-msg ok">20 ideas reached. Keep going if you can: write as many as you can.</div>`}
      </div></div><${Cap} en=${en} ar=${a} showAr=${ar} /></figure>`;
  }

  /* ── L9 §3: handoff (sequential) vs handshake (parallel with sync points) ── */
  function Handoff({ ar }) {
    const [m, setM] = useState('off'), [run, setRun] = useState(0), [go, setGo] = useState(false);
    useEffect(() => { setGo(false); const t = setTimeout(() => setGo(true), calm() ? 0 : 120); return () => clearTimeout(t); }, [m, run]);
    const off = m === 'off', syncs = [22, 44, 66, 88];
    const caps = off
      ? { en: '<b>Handoff process</b>: design finishes, then it is handed over to development. The two run one after the other (sequential).', ar: 'الـ <b>Handoff process</b>: الـ design يخلص، وبعدين يتسلّم للـ development. الاتنين ماشيين ورا بعض (sequential).' }
      : { en: '<b>Handshake process</b>: design and development run in parallel, with frequent sync points (red marks) where they line up.', ar: 'الـ <b>Handshake process</b>: الـ design والـ development ماشيين بالتوازي (in parallel)، ومعاهم sync points كتير (العلامات الحمرا) بيتقابلوا فيها.' };
    return html`<figure className="fig hf9"><div className="fig-stage"><div className="hf9-wrap">
      <${Modes} list=${[['off', 'Handoff'], ['shake', 'Handshake']]} val=${m} set=${setM} />
      <div className="hf9-small" style=${{ textAlign: 'right' }}>time →</div>
      <div className="hf9-lane"><b>Design</b><div className="hf9-track"><div className="hf9-fill d" style=${{ left: '0%', width: go ? (off ? '50%' : '100%') : '0%' }}>design</div>${!off && syncs.map(x => html`<i key=${x} className=${'hf9-sync' + (go ? ' on' : '')} style=${{ left: x + '%', transitionDelay: calm() ? '0s' : x / 60 + 's' }}></i>`)}</div></div>
      <div className="hf9-lane"><b>Development</b><div className="hf9-track"><div className="hf9-fill v" style=${{ left: off ? '50%' : '0%', width: go ? (off ? '50%' : '100%') : '0%', transitionDelay: off && !calm() ? '1.6s' : '0s' }}>development</div>${!off && syncs.map(x => html`<i key=${x} className=${'hf9-sync' + (go ? ' on' : '')} style=${{ left: x + '%', transitionDelay: calm() ? '0s' : x / 60 + 's' }}></i>`)}</div></div>
      <div style=${{ textAlign: 'center' }}><button className="fig-btn" onClick=${() => setRun(r => r + 1)}>↻ Replay</button></div>
      </div></div><${Cap} en=${caps.en} ar=${caps.ar} showAr=${ar} /></figure>`;
  }

  /* ── L9 §4-§5: a wireframe built by the standards, and the wireframing process ── */
  const WF = [
    { en: 'A <b>wireframe</b> is a schematic for the basic outline of a screen, built from lines and basic shapes with some text. The example in the lecture is a <b>dog-walking app</b> (this layout is illustrative).', ar: 'الـ <b>wireframe</b> رسم تخطيطي للهيكل الأساسي للشاشة، معمول من خطوط وأشكال بسيطة مع شوية text. والمثال في المحاضرة <b>dog-walking app</b> (والـ layout ده للتوضيح).', on: 1 },
    { en: '<b>Text</b> is drawn as horizontal lines or placeholder text.', ar: 'الـ <b>text</b> بيترسم كخطوط أفقية أو placeholder text.', on: 2 },
    { en: '<b>Images</b> are rectangles or circles with an X.', ar: 'الـ <b>صور</b> بتترسم مستطيلات أو دواير فيها X.', on: 3 },
    { en: '<b>Calls to action</b> are rectangles or circles.', ar: 'الـ <b>calls to action</b> بتترسم مستطيلات أو دواير.', on: 4 },
    { en: 'Add <b>proper annotation</b>, so the team knows what each part is.', ar: 'ضيف <b>annotation</b> مظبوط، عشان الفريق يعرف كل جزء ده إيه.', on: 5 },
    { en: 'It intentionally has <b>no colors or font styles</b>, to focus on structure: a skeleton with placeholders. Feedback then goes to the right level (structure and function, not colors and typography). Wireframes are not art.', ar: 'مفيهوش <b>ألوان ولا font styles</b> عن قصد، عشان نركز على الـ structure: هيكل فيه placeholders. وبكده الـ feedback بيروح للمستوى الصح (الـ structure والـ function، مش الألوان والـ typography). والـ wireframes مش فن.', on: 5, color: 1 }
  ];
  const PROC = [
    { en: 'Start with <b>pen and paper</b>. The first goal is reaching a design, not showing one.', ar: 'ابدأ بـ <b>ورقة وقلم</b>. الهدف الأول إنك توصل لـ design، مش إنك تعرض واحد.', k: 1 },
    { en: 'Sketch <b>at least 5 versions</b> per screen. Ignore straight lines, spacing and alignment at this stage: the second goal is moving the idea from your mind to paper quickly.', ar: 'ارسم <b>5 versions على الأقل</b> لكل شاشة. وتجاهل الخطوط المستقيمة والمسافات والـ alignment في المرحلة دي: الهدف التاني إنك تنقل الفكرة من دماغك للورقة بسرعة.', k: 5 },
    { en: '<b>Iterate</b> with feedback.', ar: 'اعمل <b>iteration</b> بالـ feedback.', k: 5, it: 1 },
    { en: 'Then use <b>tools</b>: Figma, Adobe XD, Sketch, Balsamiq, Pencil.', ar: 'وبعدين استخدم <b>tools</b> زي Figma و Adobe XD و Sketch و Balsamiq و Pencil.', k: 5, tools: 1 }
  ];
  function Wireframe({ ar }) {
    const [m, setM0] = useState('build'), steps = m === 'build' ? WF : PROC, [i, ctl] = useSteps(steps.length, 2600), s = steps[i] || steps[0];
    const setM = k => { setM0(k); ctl.go(0); };
    const ph = (k, cls, kids, extra) => html`<div className=${'ph ' + cls + (s.on >= k ? '' : ' off')} style=${extra}>${kids}</div>`;
    return html`<figure className="fig hf9"><div className="fig-stage"><div className="hf9-wrap">
      <${Modes} list=${[['build', 'Build a wireframe'], ['proc', 'The process']]} val=${m} set=${setM} />
      ${m === 'build' ? html`<div className=${'hf9-wf' + (s.color ? '' : '')} role="img" aria-label="A wireframe built step by step">
          ${ph(1, 'head', html`<span>☰</span><span>Title</span><span>○</span>`)}
          ${ph(2, 'txt', html`<i style=${{ width: '80%' }}></i><i style=${{ width: '65%' }}></i>`)}
          ${ph(3, 'pic', html`<svg viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="0" x2="100" y2="70" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /><line x1="100" y1="0" x2="0" y2="70" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>`)}
          ${ph(4, 'btn', 'Button')}
          ${s.on >= 5 && html`<span className="hf9-note" style=${{ top: '30px' }}>header</span>`}
          ${s.on >= 5 && html`<span className="hf9-note" style=${{ top: '128px' }}>image</span>`}
          ${s.on >= 5 && html`<span className="hf9-note" style=${{ top: '196px' }}>CTA</span>`}
        </div>
        ${s.color && html`<p className="hf9-small" style=${{ textAlign: 'center', margin: '6px 0 0' }}>No colors, no font styles: structure only.</p>`}`
      : html`<div>
          <div className="hf9-thumbs" role="img" aria-label="Rough paper sketches of one screen">${[0, 1, 2, 3, 4].map(k => html`<div key=${k} className="hf9-thumb" style=${{ opacity: k < s.k ? 1 : .15, transform: `rotate(${(k % 2 ? 1 : -1) * (1 + k * .4)}deg)` }}>
            <i style=${{ height: '8px', width: 70 + k * 5 + '%' }}></i><i style=${{ height: (k % 2 ? 14 : 22) + 'px' }}></i><i style=${{ height: '7px', width: '60%', marginTop: 'auto' }}></i></div>`)}</div>
          <p className="hf9-small" style=${{ textAlign: 'center', margin: '2px 0 8px' }}>${s.k >= 5 ? '5 versions of the same screen' : 'version 1 on paper'}</p>
          ${s.it && html`<div className="hf9-msg ok">feedback → change → sketch again</div>`}
          ${s.tools && html`<div className="hf9-tools">${['Figma', 'Adobe XD', 'Sketch', 'Balsamiq', 'Pencil'].map(t => html`<span key=${t}>${t}</span>`)}</div>`}
        </div>`}
      </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L9 §6: where am I? breadcrumbs (many choices) vs a progress bar (one predefined path) ── */
  function WhereAmI({ ar }) {
    const [m, setM] = useState('crumb'), [at, setAt] = useState(2);
    const C = ['Home', 'Section', 'Sub-section', 'Page'], P = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
    const crumb = m === 'crumb';
    const cap = crumb
      ? { en: '<b>Breadcrumbs</b> show where users are, when there are <b>multiple choices</b> of where to go. Tap a level to move there. (The labels are illustrative.)', ar: 'الـ <b>Breadcrumbs</b> بتوري الـ users هم فين، لما يكون فيه <b>اختيارات كتير</b> يروحوا فين. دوس على أي مستوى عشان تروح له. (الأسماء للتوضيح.)' }
      : { en: 'A <b>progress bar</b> shows where users are <b>and what is left</b>, for a <b>predefined unique path</b>. Use Next and Back.', ar: 'الـ <b>progress bar</b> بيوري الـ users هم فين <b>وفاضل إيه</b>، لـ <b>path واحد محدد مسبقاً</b>. استخدم Next و Back.' };
    return html`<figure className="fig hf9"><div className="fig-stage"><div className="hf9-wrap">
      <${Modes} list=${[['crumb', 'Breadcrumbs'], ['prog', 'Progress bar']]} val=${m} set=${k => { setM(k); setAt(crumb ? 1 : 2); }} />
      ${crumb ? html`<nav className="hf9-crumbs" aria-label="Breadcrumbs">${C.slice(0, at + 1).map((t, k) => html`<span key=${t} style=${{ display: 'contents' }}>${k > 0 && html`<span aria-hidden="true">›</span>`}<button className=${'fig-btn'} style=${{ minHeight: '28px', padding: '2px 9px', fontWeight: k === at ? 700 : 400 }} onClick=${() => setAt(k)}>${t}</button></span>`)}</nav>
        <div className="hf9-actions">${at < C.length - 1 && html`<button className="fig-btn solid" onClick=${() => setAt(at + 1)}>Open ${C[at + 1]}</button>`}</div>`
      : html`<div className="hf9-steps" role="img" aria-label=${'Progress: step ' + (at + 1) + ' of 4'}>${P.map((t, k) => html`<span key=${t} className=${k < at ? 'done' : k === at ? 'cur' : ''}>${t}</span>`)}</div>
        <p className="hf9-small" style=${{ margin: '0 0 6px', textAlign: 'center' }}>${at < 3 ? `${3 - at} step${3 - at > 1 ? 's' : ''} left` : 'last step'}</p>
        <div className="hf9-actions" style=${{ justifyContent: 'center' }}><button className="fig-btn" onClick=${() => setAt(Math.max(0, at - 1))} disabled=${at === 0}>‹ Back</button><button className="fig-btn solid" onClick=${() => setAt(Math.min(3, at + 1))} disabled=${at === 3}>Next ›</button></div>`}
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L9 §6: spot and fix the form problems ── */
  const RULES = [
    { k: 'btn', en: 'Important commands are <b>buttons, not links</b>, because buttons catch the eye. But do not display all commands as buttons.', ar: 'الـ commands المهمة تبقى <b>buttons مش links</b>، لأن الـ buttons بتشد العين. بس متعرضش كل الـ commands كـ buttons.', t: 'Buttons, not links' },
    { k: 'err', en: '<b>Error messages sit next to the field</b> where the error occurred, and changing the field border color (e.g. red) is preferred.', ar: '<b>الـ Error messages تبقى جنب الـ field</b> اللي فيه الغلط، وتغيير لون الـ border بتاع الـ field (زي الأحمر) ده المفضّل.', t: 'Error next to the field' },
    { k: 'box', en: '<b>Text boxes provide plenty of space</b> for the answer.', ar: '<b>الـ Text boxes تدّي مساحة كفاية</b> للإجابة.', t: 'Room to answer' },
    { k: 'hint', en: 'Fields contain <b>hints, examples or required formats</b>.', ar: 'الـ Fields يبقى فيها <b>hints أو أمثلة أو الـ format المطلوب</b>.', t: 'Hints and formats' },
    { k: 'mem', en: '<b>Remove repetitive actions</b>: remember customers\' preferences.', ar: '<b>شيل الـ actions المتكررة</b>: افتكر تفضيلات العملاء.', t: 'Remember preferences' },
    { k: 'cta', en: 'Make a <b>clear distinction between primary and secondary calls-to-action</b>: "Go Pro" stands out over "Free Trial".', ar: 'اعمل <b>فرق واضح بين الـ primary والـ secondary calls-to-action</b>: الـ "Go Pro" يبان أكتر من الـ "Free Trial".', t: 'Primary vs secondary CTA' },
    { k: 'conf', en: 'A successful form submission is confirmed with a <b>confirmation page</b>.', ar: 'لما الـ form يتبعت بنجاح، بنأكد ده بـ <b>confirmation page</b>.', t: 'Confirmation page' }
  ];
  function FormFix({ ar }) {
    const [fix, setFix] = useState({}), [last, setLast] = useState(null), [sent, setSent] = useState(false);
    const f = k => !!fix[k], tog = k => { setFix(x => Object.assign({}, x, { [k]: !x[k] })); setLast(k); setSent(false); };
    const done = RULES.filter(r => f(r.k)).length, r = RULES.find(x => x.k === last);
    const cap = r ? { en: (f(r.k) ? 'Fixed: ' : 'Problem: ') + r.en, ar: (f(r.k) ? 'اتصلّحت: ' : 'المشكلة: ') + r.ar } : { en: 'This <b>example form</b> breaks the notes\' form guidelines. Tap each guideline below to fix that part, then send the form. (The fields are illustrative.)', ar: 'الـ <b>form ده مثال</b> بيكسر الإرشادات اللي في الـ notes. دوس على كل إرشاد تحت عشان تصلّح الجزء بتاعه، وبعدين ابعت الـ form. (الـ fields للتوضيح.)' };
    return html`<figure className="fig hf9"><div className="fig-stage"><div className="hf9-wrap">
      <div className="hf9-form" role="group" aria-label="Example form">
        ${!f('err') && html`<div className="hf9-topbox">Something is wrong in the form.</div>`}
        <label>Name</label><div className="hf9-field">${f('mem') ? 'Your saved name (remembered)' : ''}</div>
        <label>Phone</label><div className=${'hf9-field' + (f('err') ? ' err' : '')}>${f('hint') ? 'Hint: the required format' : ''}</div>
        ${f('err') && html`<div className="hf9-errtxt">This field has an error.</div>`}
        <label>Message</label><div className=${'hf9-field ' + (f('box') ? 'big' : 'tiny')}></div>
        <div className="hf9-actions">
          ${f('btn') ? html`<button className="hf9-pbtn" style=${{ border: 0, font: 'inherit', fontWeight: 600, cursor: 'pointer' }} onClick=${() => setSent(true)}>Send</button>` : html`<a href="#" className="hf9-link" onClick=${e => { e.preventDefault(); setSent(true); }}>send</a>`}
          ${f('cta') ? html`<span className="hf9-pbtn">Go Pro</span><span className="hf9-sbtn">Free Trial</span>` : html`<span className="hf9-same">Go Pro</span><span className="hf9-same">Free Trial</span>`}</div>
        ${sent && (f('conf') ? html`<div className="hf9-conf">✓ Confirmation page: your form was sent.</div>` : html`<div className="hf9-msg">Nothing tells the user the form was sent.</div>`)}
      </div>
      <div className="hf9-rules">${RULES.map(x => html`<button key=${x.k} className="hf9-rule" aria-pressed=${String(f(x.k))} onClick=${() => tog(x.k)}><span className="mk">${f(x.k) ? '✓' : '○'}</span><span>${x.t}</span></button>`)}</div>
      <p className="hf9-small" style=${{ textAlign: 'center', margin: '6px 0 0' }}>${done} / ${RULES.length} fixed</p>
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'hc-fidelity': Fidelity, 'hc-brainstorm': Brainstorm, 'hc-handoff': Handoff, 'hc-wireframe': Wireframe, 'hc-where-am-i': WhereAmI, 'hc-form-fix': FormFix });
})();
/* ── part 10 ── */
// HCI visuals, part 10: L10 Close vs Cancel, error messages and system notices, layout guidelines, navigation guidelines. Every label and caption comes from the site's notes for that lecture.
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, calm } = window.FIGKIT;
  const CSS = `
.hf10 .fig-btn[aria-pressed="true"]{ background:var(--s-hci); color:#fff; border-color:transparent; }
.hf10 .fig-btn:disabled{ opacity:.45; cursor:default; }
.hf10 .fig-dots i.on{ background:var(--k-hci); }
.hf10-wrap{ max-width:440px; margin:0 auto; color:var(--ink); font-size:.86rem; line-height:1.4; }
.hf10-modes{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-bottom:10px; }
.hf10-dlg{ border:1.5px solid var(--line); border-radius:10px; background:var(--paper); padding:10px; box-shadow:0 2px 10px color-mix(in srgb, var(--ink) 10%, transparent); }
.hf10-dlg h5{ margin:0 0 4px; font-size:.9rem; }
.hf10-dlg p{ margin:0 0 4px; font-size:.82rem; color:var(--graphite); }
.hf10-btns{ display:flex; gap:8px; justify-content:flex-end; align-items:center; margin-top:10px; flex-wrap:wrap; }
.hf10-act{ background:var(--s-hci); color:#fff; border-radius:99px; padding:5px 14px; font-size:.84rem; font-weight:600; }
.hf10-dis{ border:1.3px solid var(--line); border-radius:99px; padding:4px 12px; font-size:.84rem; color:var(--ink); background:var(--paper); }
.hf10-dis.slot{ border-style:dashed; border-color:var(--k-hci); color:var(--graphite); }
.hf10-pick{ display:flex; gap:6px; justify-content:center; margin-top:10px; flex-wrap:wrap; }
.hf10-msg{ margin-top:8px; border-left:3px solid var(--pen); padding:4px 8px; background:var(--paper); font-size:.82rem; }
.hf10-msg.ok{ border-left-color:var(--ok); }
.hf10-small{ font-size:.8rem; color:var(--graphite); }
.hf10-part{ border-radius:6px; padding:3px 6px; transition:all .45s; border:1.5px solid transparent; }
.hf10-part.off{ opacity:0; max-height:0; padding:0 6px; overflow:hidden; }
.hf10-part.on{ border-color:var(--k-hci); background:color-mix(in srgb, var(--k-hci) 10%, var(--paper)); }
.hf10-part a{ color:var(--k-hci); text-decoration:underline; }
.hf10-chk{ display:flex; gap:6px; align-items:center; font-size:.82rem; }
.hf10-chk i{ width:13px; height:13px; border:1.4px solid var(--graphite); border-radius:3px; display:inline-block; }
.hf10-page{ position:relative; border:1.5px solid var(--line); border-radius:10px; overflow:hidden; background:var(--paper); }
.hf10-page.busy{ background:repeating-linear-gradient(45deg, color-mix(in srgb, var(--pen) 18%, var(--paper)) 0 8px, color-mix(in srgb, var(--k-hci) 18%, var(--paper)) 8px 16px); }
.hf10-hdr{ display:flex; align-items:center; gap:6px; padding:6px 8px; border-bottom:1px solid var(--line); background:var(--paper); }
.hf10-logo{ font-weight:700; font-size:.82rem; border:1.4px solid var(--ink); border-radius:5px; padding:1px 6px; transition:margin .5s; }
.hf10-body{ padding:8px; display:flex; flex-direction:column; gap:7px; }
.hf10-blk{ border-radius:7px; padding:5px 7px; font-size:.8rem; background:var(--paper); border:1px solid var(--line); transition:all .5s; }
.hf10-blk.imp{ border-color:var(--k-hci); font-weight:600; }
.hf10-grp{ border-radius:8px; padding:6px; transition:all .5s; border:1.5px solid transparent; }
.hf10-grp.framed{ border-color:var(--ink); }
.hf10-row{ display:flex; flex-wrap:wrap; gap:5px; }
.hf10-row span{ border:1px solid var(--line); border-radius:5px; padding:2px 6px; font-size:.8rem; background:var(--paper); transition:all .5s; }
.hf10-fold{ border-top:2px dashed var(--pen); position:relative; margin:2px 0; }
.hf10-fold em{ position:absolute; right:4px; top:-9px; background:var(--paper); color:var(--pen); font-style:normal; font-size:.78rem; padding:0 4px; }
.hf10-rules{ display:flex; flex-direction:column; gap:5px; margin-top:10px; }
.hf10-rule{ display:flex; gap:6px; align-items:flex-start; text-align:left; font:inherit; font-size:.82rem; padding:5px 8px; border-radius:8px; border:1.3px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; }
.hf10-rule[aria-pressed="true"]{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 12%, var(--paper)); }
.hf10-rule .mk{ flex:0 0 auto; font-weight:700; }
.hf10-tabs{ display:flex; gap:3px; flex-wrap:wrap; }
.hf10-tab{ font:inherit; font-size:.8rem; padding:3px 7px; border-radius:5px; border:1px solid var(--line); background:var(--paper); color:var(--ink); cursor:pointer; transition:all .25s; }
.hf10-tab:hover, .hf10-tab:focus-visible, .hf10-tab.hov{ background:var(--s-hci); color:#fff; border-color:transparent; }
.hf10-crumbs{ font-size:.8rem; color:var(--graphite); padding:4px 8px; }
.hf10-cta{ display:inline-block; background:var(--s-hci); color:#fff; border-radius:99px; padding:5px 14px; font-size:.84rem; font-weight:600; }
.hf10-hl{ outline:3px solid var(--pen); outline-offset:2px; border-radius:6px; }
.hf10-route{ display:flex; flex-wrap:wrap; gap:4px; align-items:center; margin-top:8px; font-size:.8rem; }
.hf10-route span{ border:1.3px solid var(--line); border-radius:6px; padding:3px 7px; background:var(--paper); }
.hf10-route span.red{ border-color:var(--pen); color:var(--pen); font-weight:600; }
`;
  if (!document.getElementById('hf10-css')) { const s = document.createElement('style'); s.id = 'hf10-css'; s.textContent = CSS; document.head.appendChild(s); }
  const Modes = ({ list, val, set }) => html`<div className="hf10-modes" role="group">${list.map(([k, t]) => html`<button key=${k} className="fig-btn" aria-pressed=${String(val === k)} onClick=${() => set(k)}>${t}</button>`)}</div>`;

  /* ── L10 §0: Close or Cancel? ── */
  function CloseCancel({ ar }) {
    const [m, setM] = useState('one'), [pick, setPick] = useState(null);
    const one = m === 'one', right = one ? 'Close' : 'Cancel';
    let cap;
    if (!pick) cap = one ? { en: 'This dialog has <b>only one button</b>. What should it say? Pick a label.', ar: 'الـ dialog ده فيه <b>button واحد بس</b>. يتكتب عليه إيه؟ اختار.' }
      : { en: 'This dialog has <b>two buttons</b>: an Action button and one to dismiss. What should the dismiss button say?', ar: 'الـ dialog ده فيه <b>2 buttons</b>، واحد Action button وواحد للقفل. زرار القفل يتكتب عليه إيه؟' };
    else if (pick === right) cap = one ? { en: 'Right: with only one button, it should be <b>"Close"</b>.', ar: 'صح: لو فيه button واحد بس، يبقى <b>"Close"</b>.' }
      : { en: 'Right: with two buttons, use <b>"Cancel"</b>, not "Close". Cancel is most commonly placed to the right and is not eye-catching.', ar: 'صح: لو فيه 2 buttons، استخدم <b>"Cancel"</b> مش "Close". والـ Cancel غالباً بيبقى على اليمين ومش لافت للنظر.' };
    else cap = one ? { en: 'Not quite: "Cancel" is for when there are two buttons. With only one button, it should be <b>"Close"</b>.', ar: 'مش بالظبط: الـ "Cancel" لما يكون فيه 2 buttons. لو فيه button واحد بس، يبقى <b>"Close"</b>.' }
      : { en: 'Not quite: with two buttons (an Action button and one to dismiss), use <b>"Cancel"</b>, not "Close".', ar: 'مش بالظبط: لو فيه 2 buttons (Action button وواحد للقفل)، استخدم <b>"Cancel"</b> مش "Close".' };
    return html`<figure className="fig hf10"><div className="fig-stage"><div className="hf10-wrap">
      <${Modes} list=${[['one', 'One button'], ['two', 'Two buttons']]} val=${m} set=${k => { setM(k); setPick(null); }} />
      <div className="hf10-dlg" role="group" aria-label="Example dialog">
        <h5>${one ? 'Notice' : 'Confirm the action'}</h5><p>${one ? 'A message the user only needs to read.' : 'The user can do the action or dismiss the dialog.'}</p>
        <div className="hf10-btns">
          ${!one && html`<span className="hf10-act">Action</span>`}
          <span className=${'hf10-dis' + (pick ? '' : ' slot')}>${pick || '?'}</span></div></div>
      <div className="hf10-pick">${['Close', 'Cancel'].map(t => html`<button key=${t} className="fig-btn" aria-pressed=${String(pick === t)} onClick=${() => setPick(t)}>${t}</button>`)}</div>
      ${pick && html`<div className=${'hf10-msg' + (pick === right ? ' ok' : '')}>${pick === right ? '✓ ' : '✗ '}${pick === right ? 'Correct label' : 'Use "' + right + '" here'}</div>`}
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L10 §0: the parts of an error message and of a system notice ── */
  const ERR = [
    { en: 'An <b>error message</b>, built by the notes\' rules. The parts below are placeholders for what each line should say.', ar: 'الـ <b>error message</b>، متبني بالقواعد اللي في الـ notes. الأجزاء دي أماكن لكل سطر لازم يقول إيه.', n: 0 },
    { en: 'State <b>the problem in the title</b>.', ar: 'اكتب <b>المشكلة في الـ title</b>.', n: 1 },
    { en: 'Under the title, describe <b>briefly why it happened</b>.', ar: 'تحت الـ title، اشرح <b>باختصار حصلت ليه</b>.', n: 2 },
    { en: 'When possible, add a <b>link to complete the task or return to the previous state</b>.', ar: 'ولو ينفع، حط <b>link عشان يكمّل الـ task أو يرجع للحالة اللي قبلها</b>.', n: 3 },
    { en: 'Give <b>recommendations for the next course of action</b>.', ar: 'وادّي <b>recommendations للخطوة الجاية</b>.', n: 4 }
  ];
  const NOTE = [
    { en: 'A <b>system notice</b>, built by the notes\' rules.', ar: 'الـ <b>system notice</b>، متبني بالقواعد اللي في الـ notes.', n: 0 },
    { en: 'An <b>"Action"</b> button.', ar: 'زرار <b>"Action"</b>.', n: 1 },
    { en: 'A <b>"Remind me later"</b> button.', ar: 'زرار <b>"Remind me later"</b>.', n: 2 },
    { en: 'A <b>"Don\'t show again"</b> box.', ar: 'مربع <b>"Don\'t show again"</b>.', n: 3 },
    { en: 'Notice messages should <b>not be lengthy or generic</b>. Alert messages stay <b>consistent across the whole site</b>: do not change their color, style or placement.', ar: 'رسايل الـ notice <b>متبقاش طويلة ولا عامة (generic)</b>. والـ alert messages تفضل <b>consistent في الموقع كله</b>: متغيرش اللون ولا الـ style ولا المكان.', n: 3 }
  ];
  function Messages({ ar }) {
    const [m, setM0] = useState('err'), steps = m === 'err' ? ERR : NOTE, [i, ctl] = useSteps(steps.length, 2600), s = steps[i] || steps[0];
    const setM = k => { setM0(k); ctl.go(0); };
    const part = (k, kids) => html`<div className=${'hf10-part' + (s.n < k ? ' off' : s.n === k ? ' on' : '')}>${kids}</div>`;
    return html`<figure className="fig hf10"><div className="fig-stage"><div className="hf10-wrap">
      <${Modes} list=${[['err', 'Error message'], ['note', 'System notice']]} val=${m} set=${setM} />
      ${m === 'err' ? html`<div className="hf10-dlg" style=${{ borderColor: 'var(--pen)' }} role="group" aria-label="Error message parts">
          ${part(1, html`<h5 style=${{ margin: 0 }}>[Title: what the problem is]</h5>`)}
          ${part(2, html`<p style=${{ margin: 0 }}>[One short line: why it happened]</p>`)}
          ${part(3, html`<p style=${{ margin: 0 }}><a href="#" onClick=${e => e.preventDefault()}>[Link: finish the task or go back]</a></p>`)}
          ${part(4, html`<p style=${{ margin: 0 }}>[What to do next]</p>`)}</div>`
      : html`<div className="hf10-dlg" role="group" aria-label="System notice parts">
          <p style=${{ margin: '0 0 6px', color: 'var(--ink)' }}>[A short, specific notice]</p>
          <div className="hf10-btns" style=${{ justifyContent: 'flex-start' }}>
            ${part(1, html`<span className="hf10-act">Action</span>`)}
            ${part(2, html`<span className="hf10-dis">Remind me later</span>`)}</div>
          <div style=${{ marginTop: '8px' }}>${part(3, html`<span className="hf10-chk"><i></i>Don't show again</span>`)}</div></div>`}
      </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${steps} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L10 §1 (+ the 3-color palette from §0): fix an example page's layout ── */
  const LAY = [
    { k: 'fold', t: 'Important information above the fold', en: 'The most important information is <b>above the fold</b> (the part visible without scrolling).', ar: 'أهم معلومات تبقى <b>above the fold</b> (الجزء اللي باين من غير scroll).' },
    { k: 'frame', t: 'Group related information', en: 'Related information is <b>grouped by a frame or a separator</b>.', ar: 'المعلومات المرتبطة ببعض <b>تتجمع بـ frame أو separator</b>.' },
    { k: 'color', t: 'Color groups items', en: '<b>Color groups and structures items</b>, e.g. the HR, Technical and Payroll fields.', ar: '<b>اللون بيجمّع وينظّم العناصر</b>، زي fields الـ HR والـ Technical والـ Payroll.' },
    { k: 'order', t: 'Logical order', en: 'Related items are <b>logically ordered</b>: First/Middle/Last name; Start/End date; Origin/Destination.', ar: 'العناصر المرتبطة تبقى <b>مترتبة منطقياً</b>، زي الـ First و Middle و Last name، والـ Start و End date، والـ Origin و Destination.' },
    { k: 'logo', t: 'Logo in the same place', en: 'Your <b>logo is in the same place on every page</b> (no shift). Switch pages to check.', ar: 'الـ <b>logo بتاعك في نفس المكان في كل صفحة</b> (من غير ما يتحرك). غيّر الصفحة وشوف.' },
    { k: 'bg', t: 'Plain background', en: 'The <b>background is not complicated</b> and does not distract from content.', ar: 'الـ <b>background مش معقد</b> ومش بيشتت عن المحتوى.' },
    { k: 'pal', t: '3-color palette', en: 'Stick to a simple <b>3-color palette</b>. More than 3 primary colors is difficult and confuses users.', ar: 'التزم بـ <b>color palette بسيطة من 3 ألوان</b>. أكتر من 3 primary colors صعب وبيلخبط الـ users.' }
  ];
  const MANY = ['#d1495b', '#edae49', '#00798c', '#8f2d56', '#30638e', '#66a182'];
  function Layout({ ar }) {
    const [fix, setFix] = useState({}), [last, setLast] = useState(null), [page, setPage] = useState(0);
    const f = k => !!fix[k], tog = k => { setFix(x => Object.assign({}, x, { [k]: !x[k] })); setLast(k); };
    const r = LAY.find(x => x.k === last);
    const cap = r ? { en: (f(r.k) ? 'Fixed: ' : 'Problem: ') + r.en, ar: (f(r.k) ? 'اتصلّحت: ' : 'المشكلة: ') + r.ar } : { en: 'This <b>example page</b> breaks the layout guidelines. Tap each guideline to fix that part. (The page content is illustrative; the field names come from the notes.)', ar: 'الـ <b>صفحة دي مثال</b> بتكسر إرشادات الـ layout. دوس على كل إرشاد عشان تصلّح الجزء بتاعه. والمحتوى هنا للتوضيح، أما أسامي الـ fields فجاية من المحاضرة.' };
    const tone = (k, j) => f('pal') ? `color-mix(in srgb, var(--k-hci) ${[14, 26, 38][j % 3]}%, var(--paper))` : MANY[(j + (k || 0)) % MANY.length];
    const groups = [['HR', ['Employee ID', 'Department']], ['Technical', ['System', 'Access']], ['Payroll', ['Salary', 'Bank']]];
    const names = f('order') ? [['First name', 'Middle name', 'Last name'], ['Start date', 'End date'], ['Origin', 'Destination']] : [['Last name', 'First name', 'Middle name'], ['End date', 'Start date'], ['Destination', 'Origin']];
    const imp = html`<div className="hf10-blk imp">★ The most important information</div>`;
    return html`<figure className="fig hf10"><div className="fig-stage"><div className="hf10-wrap">
      <div className="hf10-modes" role="group">${['Page 1', 'Page 2'].map((t, k) => html`<button key=${t} className="fig-btn" aria-pressed=${String(page === k)} onClick=${() => setPage(k)}>${t}</button>`)}</div>
      <div className=${'hf10-page' + (f('bg') ? '' : ' busy')} role="img" aria-label="Example page layout">
        <div className="hf10-hdr"><span className="hf10-logo" style=${{ marginLeft: !f('logo') && page === 1 ? 'auto' : '0' }}>Logo</span></div>
        <div className="hf10-body">
          ${f('fold') && imp}
          <div className="hf10-row">${names.flat().map((t, j) => html`<span key=${t}>${t}</span>`)}</div>
          ${groups.map(([g, fl], j) => html`<div key=${g} className=${'hf10-grp' + (f('frame') ? ' framed' : '')} style=${{ background: f('color') ? tone(0, j) : 'transparent' }}>
            <div className="hf10-row"><span style=${{ fontWeight: 600 }}>${g}</span>${fl.map(t => html`<span key=${t}>${t}</span>`)}</div></div>`)}
          <div className="hf10-row">${['Save', 'Help', 'Print'].map((t, j) => html`<span key=${t} style=${{ background: f('pal') ? tone(0, j) : MANY[(j + 3) % 6], color: f('pal') ? 'var(--ink)' : '#fff' }}>${t}</span>`)}</div>
          <div className="hf10-fold"><em>the fold</em></div>
          ${!f('fold') && imp}</div></div>
      <div className="hf10-rules">${LAY.map(x => html`<button key=${x.k} className="hf10-rule" aria-pressed=${String(f(x.k))} onClick=${() => tog(x.k)}><span className="mk">${f(x.k) ? '✓' : '○'}</span><span>${x.t}</span></button>`)}</div>
      </div></div><${Cap} ...${cap} showAr=${ar} /></figure>`;
  }

  /* ── L10 §2: navigation guidelines on an example site ── */
  const NAV = [
    { k: 'cta', en: 'There is a <b>clear call-to-action</b> telling users what to do next: an eye-catching button for the most common next step.', ar: 'فيه <b>call-to-action واضح</b> بيقول للـ users يعملوا إيه بعد كده: button لافت للنظر للخطوة الجاية الأكتر انتشاراً.' },
    { k: 'crumbs', en: 'It is <b>clear where users are</b> on the site, for example with <b>breadcrumbs</b>.', ar: '<b>واضح الـ users فين</b> في الموقع، مثلاً بالـ <b>breadcrumbs</b>.' },
    { k: 'links', en: 'There are <b>clear links to the Home page and categories</b> on every page.', ar: 'فيه <b>links واضحة للـ Home page والـ categories</b> في كل صفحة.' },
    { k: 'tabs', en: '<b>Navigation tabs are at the top</b> of the page.', ar: 'الـ <b>Navigation tabs فوق</b> في الصفحة.' },
    { k: 'hover', en: 'There is an <b>obvious change on hover</b> over anything clickable. Hover over (or tap) a tab.', ar: 'فيه <b>تغيير واضح لما تعمل hover</b> على أي حاجة بتتداس. اعمل hover (أو دوس) على أي tab.' },
    { k: 'logo', en: 'The <b>company logo links to the homepage</b>.', ar: 'الـ <b>company logo بيودّي للـ homepage</b>.' },
    { k: 'red', en: 'Map out <b>"Red Routes"</b>: the series of pages or actions customers most often use to complete tasks. (The pages shown are illustrative.)', ar: 'ارسم الـ <b>"Red Routes"</b>: سلسلة الصفحات أو الـ actions اللي العملاء بيستخدموها أكتر حاجة عشان يخلصوا الـ tasks. (الصفحات دي للتوضيح.)' }
  ];
  function Navigation({ ar }) {
    const [i, ctl] = useSteps(NAV.length, 3000), s = NAV[i] || NAV[0], [hov, setHov] = useState(-1);
    const hl = k => s.k === k ? ' hf10-hl' : '';
    return html`<figure className="fig hf10"><div className="fig-stage"><div className="hf10-wrap">
      <div className="hf10-page" role="img" aria-label="Example site with its navigation">
        <div className="hf10-hdr" style=${{ flexWrap: 'wrap' }}>
          <span className=${'hf10-logo' + hl('logo')} title="Goes to the homepage">Logo</span>
          <div className=${'hf10-tabs' + hl('tabs') + hl('hover')} style=${{ marginLeft: 'auto' }}>${['Home', 'Category A', 'Category B'].map((t, k) => html`<button key=${t} className=${'hf10-tab' + (hov === k || (s.k === 'hover' && k === 1 && !calm()) ? ' hov' : '') + (s.k === 'links' ? ' hf10-hl' : '')} onMouseEnter=${() => setHov(k)} onMouseLeave=${() => setHov(-1)} onClick=${() => setHov(k)}>${t}</button>`)}</div></div>
        <div className=${'hf10-crumbs' + hl('crumbs')}>Home › Category A › This page</div>
        <div className="hf10-body">
          <div className="hf10-blk">Page content</div>
          <div style=${{ textAlign: 'center' }}><span className=${'hf10-cta' + hl('cta')}>Next step</span></div></div></div>
      ${s.k === 'red' && html`<div className="hf10-route" role="img" aria-label="A red route through the most used pages">${['Page 1', 'Page 2', 'Page 3', 'Done'].map((t, k) => html`<span key=${t} style=${{ display: 'contents' }}>${k > 0 && html`<span aria-hidden="true" style=${{ border: 0, background: 'none', color: 'var(--pen)', padding: 0 }}>→</span>`}<span className="red">${t}</span></span>`)}</div>`}
      </div></div><${Cap} en=${s.en} ar=${s.ar} showAr=${ar} /><${Bar} steps=${NAV} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'hc-close-cancel': CloseCancel, 'hc-messages': Messages, 'hc-layout': Layout, 'hc-navigation': Navigation });
})();
/* ── part 11 ── */
// HCI visuals, part 11: this term's Lecture 5 slides, in site L5 (UI vs UX wheels, what each designer focuses on, the pizza app, the UX design process).
(function () {
  const { useState } = React;
  const { html, useSteps, Cap, Bar, pop } = window.FIGKIT;
  const CSS = `
.hf11 .fig-btn[aria-pressed="true"]{ background:var(--s-hci); color:#fff; border-color:transparent; }
.hf11-wrap{ max-width:440px; margin:0 auto; color:var(--ink); font-size:.86rem; line-height:1.35; }
.hf11-tabs{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; margin-bottom:10px; }
.hf11-wheel{ position:relative; height:262px; max-width:292px; margin:0 auto; }
.hf11-hub{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:70px; height:70px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.3rem; background:var(--s-hci); color:#fff; }
.hf11-spoke{ position:absolute; transform:translate(-50%,-50%); max-width:88px; text-align:center; font-size:.8rem; font-weight:600; padding:3px 7px; border-radius:99px; background:color-mix(in srgb, var(--k-hci) 14%, var(--paper)); border:1.3px solid var(--k-hci); color:var(--ink); line-height:1.15; }
.hf11-list{ list-style:none; margin:8px 0 0; padding:0; display:flex; flex-direction:column; gap:4px; }
.hf11-list li{ border-left:3px solid var(--line); padding:3px 8px; border-radius:0 6px 6px 0; color:var(--graphite); transition:all .3s; }
.hf11-list li.on{ border-left-color:var(--s-hci); background:color-mix(in srgb, var(--k-hci) 14%, var(--paper)); color:var(--ink); font-weight:700; }
.hf11-svg{ display:block; width:100%; height:auto; }
.hf11-pz{ display:grid; grid-template-columns:1fr; gap:8px; }
.hf11-toggle{ display:flex; align-items:center; justify-content:space-between; gap:8px; border:1px solid var(--line); border-radius:8px; padding:5px 8px; background:var(--paper); }
.hf11-toggle b{ font-size:.86rem; }
.hf11-phone{ border:2px solid var(--line); border-radius:14px; padding:8px; background:var(--paper); max-width:232px; margin:0 auto; width:100%; }
.hf11-photo{ height:58px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; margin-bottom:6px; }
.hf11-photo.good{ background:linear-gradient(135deg,#f59e0b,#ef4444); color:#fff; }
.hf11-photo.bad{ background:var(--paper-2); color:var(--graphite); border:1px dashed var(--line); }
.hf11-pay{ display:block; width:100%; font:inherit; font-size:.86rem; padding:5px; border-radius:99px; border:0; background:var(--s-hci); color:#fff; font-weight:700; margin-top:6px; }
.hf11-pay.bad{ border-radius:0; background:var(--paper-2); color:var(--graphite); font-weight:400; }
.hf11-step{ font-size:.8rem; padding:3px 6px; border:1px solid var(--line); border-radius:6px; margin-bottom:3px; }
.hf11-step.lost{ border-style:dashed; color:var(--pen); }
.hf11-verdict{ text-align:center; font-weight:800; margin-top:8px; padding:5px; border-radius:7px; }
.hf11-verdict.both{ background:color-mix(in srgb, var(--ok) 16%, var(--paper)); color:var(--ok); }
.hf11-verdict.mid{ background:color-mix(in srgb, #f59e0b 16%, var(--paper)); color:#b45309; }
.hf11-verdict.none{ background:color-mix(in srgb, var(--pen) 12%, var(--paper)); color:var(--pen); }`;
  if (!document.getElementById('hf11-css')) { const s = document.createElement('style'); s.id = 'hf11-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ── L5 §0 (doctor's slide 3): the UX wheel and the UI wheel ── */
  const WH = {
    UX: { items: ['Useful', 'Satisfiable', 'Convenient', 'Credible', 'Accessible', 'Desirable', 'Valuable'],
      en: '<b>UX Design</b> covers a user\'s overall experience with the product or website. Its wheel on the slide: Useful, Satisfiable, Convenient, Credible, Accessible, Desirable, Valuable.',
      ar: 'الـ <b>UX Design</b> بيغطي التجربة الكاملة بتاعة الـ user مع المنتج أو الموقع. وعجلته في الـ slide فيها الـ Useful والـ Satisfiable والـ Convenient والـ Credible والـ Accessible والـ Desirable والـ Valuable.' },
    UI: { items: ['Color Scheme', 'Typography', 'Layout', 'Images', 'Forms', 'Buttons', 'Content'],
      en: '<b>UI Design</b> refers to the interactivity, look and feel of a product screen or web page. Its wheel on the slide: Color Scheme, Typography, Layout, Images, Forms, Buttons, Content.',
      ar: 'الـ <b>UI Design</b> هو الـ interactivity والـ look and feel بتاع شاشة المنتج أو صفحة الويب. وعجلته في الـ slide فيها الـ Color Scheme والـ Typography والـ Layout والـ Images والـ Forms والـ Buttons والـ Content.' }
  };
  function Wheels({ ar }) {
    const [k, setK] = useState('UX'), W = WH[k], n = W.items.length;
    return html`<figure className="fig hf11"><div className="fig-stage"><div className="hf11-wrap">
      <div className="hf11-tabs" role="group">${['UX', 'UI'].map(x => html`<button key=${x} className="fig-btn" aria-pressed=${String(k === x)} onClick=${() => setK(x)}>${x}</button>`)}</div>
      <div className="hf11-wheel" key=${k}><div className="hf11-hub">${k}</div>
        ${W.items.map((t, j) => { const a = -Math.PI / 2 + j * 2 * Math.PI / n, x = 50 + 37 * Math.cos(a), y = 50 + 38 * Math.sin(a); return html`<span key=${t} className="hf11-spoke" style=${{ left: x + '%', top: y + '%' }}>${t}</span>`; })}</div>
      </div></div><${Cap} en=${W.en} ar=${W.ar} showAr=${ar} /></figure>`;
  }

  /* ── L5 §1 (doctor's slide 4): what UI designers and UX designers focus on ── */
  const FOC = {
    UI: { title: 'UI designers focus on', sub: 'Visual appearance', items: ['Colors and typography', 'Buttons and icons', 'Layout and spacing', 'Images and visual style', 'Consistency across screens'],
      ar: ['الألوان والـ typography', 'الزراير والـ icons', 'الـ layout والـ spacing', 'الصور والـ visual style', 'الـ consistency بين الشاشات'] },
    UX: { title: 'UX designers focus on', sub: 'User experience', items: ['User needs and research', 'User journeys and flows', 'Wireframes and prototypes', 'Ease of use', 'Usability testing'],
      ar: ['احتياجات الـ user والـ research', 'الـ user journeys والـ flows', 'الـ wireframes والـ prototypes', 'سهولة الاستخدام', 'الـ usability testing'] }
  };
  const ST = [].concat(FOC.UI.items.map((t, j) => ({ m: 'UI', j, en: '<b>UI designers</b> work on how screens look: ' + t.toLowerCase() + '.', ar: 'الـ <b>UI designers</b> بيشتغلوا على شكل الشاشات: ' + FOC.UI.ar[j] + '.' })),
    FOC.UX.items.map((t, j) => ({ m: 'UX', j, en: '<b>UX designers</b> work on the whole experience: ' + t.toLowerCase() + '.', ar: 'الـ <b>UX designers</b> بيشتغلوا على التجربة كلها: ' + FOC.UX.ar[j] + '.' })));
  const hl = on => ({ fill: on ? 'color-mix(in srgb, var(--k-hci) 28%, var(--paper))' : 'var(--paper-2)', stroke: on ? 'var(--s-hci)' : 'var(--line)', strokeWidth: on ? 2 : 1, transition: 'all .3s' });
  function FocusMock({ m, j }) {
    if (m === 'UI') return html`<svg className="hf11-svg" viewBox="0 0 280 130" role="img" aria-label="Two phone screens of an app">
      ${[10, 150].map(px => html`<g key=${px}><rect x=${px} y="8" width="120" height="114" rx="10" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5"/>
        <rect x=${px + 8} y="16" width="104" height="22" rx="5" style=${hl(j === 0 || j === 4)} /><text x=${px + 60} y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">$46,267</text>
        <rect x=${px + 8} y="44" width="104" height="30" rx="5" style=${hl(j === 2 || j === 4)} />
        <rect x=${px + 8} y="80" width="48" height="36" rx="5" style=${hl(j === 3)} /><circle cx=${px + 32} cy="98" r="9" fill="#f59e0b"/>
        <circle cx=${px + 76} cy="96" r="12" style=${hl(j === 1)} /><circle cx=${px + 102} cy="96" r="9" style=${hl(j === 1)} /></g>`)}
      </svg>`;
    const notes = [[12, 14], [46, 14], [80, 14], [12, 46], [46, 46], [80, 46]];
    return html`<svg className="hf11-svg" viewBox="0 0 280 130" role="img" aria-label="A wall of sticky notes, a journey map and a wireframe">
      ${notes.map(([x, y], k) => html`<rect key=${k} x=${x} y=${y} width="28" height="26" rx="3" style=${hl(j === 0)} />`)}
      <text x="61" y="92" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--ink)">User needs</text>
      <g style=${{ opacity: 1 }}><rect x="122" y="14" width="44" height="22" rx="5" style=${hl(j === 1)} /><path d="M166 25 h12" stroke="var(--graphite)" strokeWidth="1.8" /><rect x="180" y="14" width="44" height="22" rx="5" style=${hl(j === 1)} /><path d="M224 25 h12" stroke="var(--graphite)" strokeWidth="1.8" /><rect x="238" y="14" width="34" height="22" rx="5" style=${hl(j === 1)} /></g>
      <rect x="122" y="46" width="60" height="66" rx="4" style=${hl(j === 2)} /><path d="M130 58 h44 M130 70 h30 M130 82 h44" stroke="var(--graphite)" strokeWidth="1.5" />
      <circle cx="210" cy="64" r="14" style=${hl(j === 3)} /><path d="M203 64 l6 6 l10 -12" fill="none" stroke="var(--graphite)" strokeWidth="2" />
      <circle cx="252" cy="62" r="8" style=${hl(j === 4)} /><path d="M240 96 q12 -24 24 0" style=${hl(j === 4)} />
      </svg>`;
  }
  function Focus({ ar }) {
    const [i, ctl] = useSteps(ST.length, 3000), s = ST[i], F = FOC[s.m];
    return html`<figure className="fig hf11"><div className="fig-stage"><div className="hf11-wrap">
      <div style=${{ textAlign: 'center', fontWeight: 700 }}>${s.m} Design</div>
      <div style=${{ textAlign: 'center', fontSize: '.8rem', color: 'var(--graphite)', marginBottom: '4px' }}>${F.sub}</div>
      <${FocusMock} m=${s.m} j=${s.j} />
      <div style=${{ fontWeight: 700, marginTop: '6px' }}>${F.title}:</div>
      <ul className="hf11-list">${F.items.map((t, j) => html`<li key=${t} className=${j === s.j ? 'on' : ''}>${t}</li>`)}</ul>
      </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${ST} i=${i} ctl=${ctl} /></figure>`;
  }

  /* ── L5 §2 (doctor's slide 5): the pizza app, UI and UX switched separately ── */
  function Pizza({ ar }) {
    const [ui, setUi] = useState(true), [ux, setUx] = useState(true);
    const v = ui && ux ? { c: 'both', t: 'Good UI and good UX: the best products combine both' }
      : ui ? { c: 'mid', t: 'Good UI, poor UX' } : ux ? { c: 'mid', t: 'Good UX, poor UI' } : { c: 'none', t: 'Poor UI and poor UX' };
    const capEn = ui && ux ? 'The UI designer chose the pizza photos, colors, button shapes and where text appears. The UX designer made sure customers can find a pizza, customize their order, pay easily and track delivery without confusion. <b>The best products combine both.</b>'
      : ui ? 'A beautiful app with confusing navigation has <b>good UI but poor UX</b>. (The steps on the screen are illustrations.) ‡'
      : ux ? 'An easy-to-use app with unattractive visuals may have <b>good UX but poor UI</b>.'
      : 'Unattractive visuals and confusing navigation: the app fails on both. (This fourth state and the steps on the screen are illustrations.) ‡';
    const capAr = ui && ux ? 'الـ UI designer اختار صور البيتزا والألوان وشكل الزراير ومكان الكلام، والـ UX designer اتأكد إن الزبون يلاقي البيتزا ويظبط الأوردر ويدفع بسهولة ويتابع الـ delivery من غير لخبطة. <b>أحسن المنتجات بتجمع الاتنين.</b>'
      : ui ? 'الـ app الجميل اللي الـ navigation بتاعه ملخبط عنده <b>UI كويس بس UX وحش</b>. (الخطوات اللي على الشاشة أمثلة توضيحية.) ‡'
      : ux ? 'الـ app السهل في الاستخدام بس شكله مش حلو ممكن يبقى عنده <b>UX كويس بس UI وحش</b>.'
      : 'شكل وحش و navigation ملخبط: الـ app فشل في الاتنين. (الحالة الرابعة دي والخطوات اللي على الشاشة أمثلة توضيحية.) ‡';
    const flow = ux ? ['Find a pizza', 'Customize your order', 'Pay', 'Track delivery'] : ['Menu? Where?', 'Three screens to customize', 'Pay is hidden', 'No way to track delivery'];
    return html`<figure className="fig hf11"><div className="fig-stage"><div className="hf11-wrap hf11-pz">
      <div className="hf11-toggle"><b>UI (how it looks)</b><button className="fig-btn" aria-pressed=${String(ui)} onClick=${() => setUi(u => !u)}>${ui ? 'Good' : 'Poor'}</button></div>
      <div className="hf11-toggle"><b>UX (the experience)</b><button className="fig-btn" aria-pressed=${String(ux)} onClick=${() => setUx(u => !u)}>${ux ? 'Good' : 'Poor'}</button></div>
      <div className="hf11-phone">
        <div className=${'hf11-photo ' + (ui ? 'good' : 'bad')}>${ui ? '🍕 Pizza' : 'Photo'}</div>
        ${flow.map(t => html`<div key=${t} className=${'hf11-step' + (ux ? '' : ' lost')}>${t}</div>`)}
        <button className=${'hf11-pay' + (ui ? '' : ' bad')} tabIndex="-1">Order</button>
      </div>
      <div className=${'hf11-verdict ' + v.c} aria-live="polite">${v.t}</div>
      </div></div><${Cap} en=${capEn} ar=${capAr} showAr=${ar} /></figure>`;
  }

  /* ── L5 §5 (doctor's slide 8): the UX design process cycle ── */
  const UX = [
    { k: 0, en: '<b>User Research</b> comes first: learn about the users, their tasks and earlier research.', ar: 'الـ <b>User Research</b> الأول: اتعلم عن الـ users والـ tasks بتاعتهم والأبحاث القديمة.' },
    { k: 3, en: 'Between research and design: <b>Iterate to validate your ideas</b>.', ar: `بين الـ research والـ design:<span class="ltr">Iterate to validate your ideas</span>` },
    { k: 1, en: '<b>Design</b>: design and prototyping of the interface.', ar: 'الـ <b>Design</b>: الـ design and prototyping بتاع الـ interface.' },
    { k: 4, en: 'Between design and build: <b>Iterate to design around constraints</b>.', ar: `بين الـ design والـ build:<span class="ltr">Iterate to design around constraints</span>` },
    { k: 2, en: '<b>Build</b>. The slide\'s list names the third component as user interface evaluation (improvement).', ar: 'الـ <b>Build</b>. والـ list اللي في الـ slide بتسمي الـ component التالت الـ user interface evaluation (improvement).' },
    { k: 0, en: 'The cycle goes back to <b>User Research</b> and repeats.', ar: 'الـ cycle بترجع تاني للـ <b>User Research</b> وتتكرر.' }
  ];
  function Process({ ar }) {
    const [i, ctl] = useSteps(UX.length, 3200), s = UX[i], on = k => s.k === k;
    const node = (x, y, t, k) => html`<g key=${t}><circle cx=${x} cy=${y} r="38" fill=${on(k) ? 'var(--s-hci)' : 'var(--paper-2)'} stroke=${on(k) ? 'var(--s-hci)' : 'var(--line)'} strokeWidth="2" style=${{ transition: 'all .4s' }}/>
      ${t.map((w, n) => html`<text key=${w} x=${x} y=${y + 5 + (n - (t.length - 1) / 2) * 15} textAnchor="middle" fontSize="13.5" fontWeight="700" style=${{ fill: on(k) ? '#fff' : 'var(--ink)' }}>${w}</text>`)}</g>`;
    const arrow = (d, k) => html`<path d=${d} fill="none" stroke=${on(k) ? 'var(--k-hci)' : 'var(--graphite)'} strokeWidth="3.5" markerEnd="url(#hf11-ah)"/>`;
    const dash = (d) => html`<path d=${d} fill="none" stroke="var(--graphite)" strokeWidth="1.6" strokeDasharray="4 4"/>`;
    return html`<figure className="fig hf11"><div className="fig-stage"><div className="hf11-wrap">
      <svg className="hf11-svg" viewBox="0 0 300 276" role="img" aria-label="A cycle of User Research, Design and Build with two inner iteration loops">
        <defs><marker id="hf11-ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--graphite)"/></marker></defs>
        ${arrow('M188 54 Q258 70 262 158', 0)}
        ${arrow('M222 234 Q150 268 84 240', 1)}
        ${arrow('M42 158 Q42 72 112 54', 2)}
        ${node(150, 48, ['USER', 'RESEARCH'], 0)}${node(254, 202, ['DESIGN'], 1)}${node(46, 202, ['BUILD'], 2)}
        <g className=${pop(i >= 1)}>${dash('M172 92 Q230 130 226 168')}<text x="128" y="112" textAnchor="middle" fontSize="13.5" fill="var(--ink)">Iterate to validate</text><text x="128" y="128" textAnchor="middle" fontSize="13.5" fill="var(--ink)">your ideas</text></g>
        <g className=${pop(i >= 3)}>${dash('M214 214 Q150 186 90 216')}<text x="150" y="162" textAnchor="middle" fontSize="13.5" fill="var(--ink)">Iterate to design</text><text x="150" y="178" textAnchor="middle" fontSize="13.5" fill="var(--ink)">around constraints</text></g>
      </svg>
      </div></div><${Cap} ...${s} showAr=${ar} /><${Bar} steps=${UX} i=${i} ctl=${ctl} /></figure>`;
  }

  window.FIGS = Object.assign(window.FIGS || {}, { 'hc-ux-ui-wheels': Wheels, 'hc-ui-ux-focus': Focus, 'hc-pizza-app': Pizza, 'hc-ux-process': Process });
})();

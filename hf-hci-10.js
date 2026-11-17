// Head First chapter for Human Computer Interaction Lecture 10 (built on hf.js), English + Egyptian Arabic, same pages in both.
// Forms (continued): the 3-color palette, consistent alert messages, Close vs Cancel, error messages, system notices;
// Layout: above the fold, grouping by frame / separator / color, logical order, the logo in the same place, a plain background;
// Navigation: a clear CTA, where users are (breadcrumbs), Home and category links on every page, tabs at the top, an obvious
// hover change, the logo links home, Red Routes. From last year's slides. Every fact comes from the lecture's notes; examples,
// analogies and jokes are marked as ours. The lecture has none of the doctors' questions, so the exam corner uses the site's own
// practice questions and says so.
// lectures: [10]
(function () {
  const H = window.HF; H.chapters.hci = H.chapters.hci || {};
  const { html } = H.K;
  const { useState } = React;
  const calm = H.K.calm;
  const useAr = () => H.K.useKit().lang === 'ar';
  const T = s => html`<span dangerouslySetInnerHTML=${{ __html: s }}></span>`;

  if (!document.getElementById('hf-css-hci10')) {
    const s = document.createElement('style'); s.id = 'hf-css-hci10';
    s.textContent = `
.hfb .hf-hci10-nb{ flex:none; display:inline-grid; place-items:center; width:24px; height:24px; border-radius:50%; font:800 13px/1 var(--body); background:var(--hf-grey2); color:var(--graphite); }
.hfb .hf-hci10-nb.hf-hci10-on{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-hci10-steps{ display:grid; gap:5px; }
.hfb .hf-hci10-steps > div{ display:flex; align-items:flex-start; gap:8px; font:500 14px/1.32 var(--body); color:var(--ink); }
.hfb .hf-hci10-steps > div > .hf-hci10-nb{ background:var(--hf-line); color:var(--paper); margin-top:1px; }
.hfb .hf-hci10-ord{ display:grid; gap:5px; }
.hfb .hf-hci10-it{ display:flex; align-items:center; gap:8px; width:100%; text-align:start; font:500 13.5px/1.25 var(--body); padding:3px 8px; min-height:36px; border-radius:7px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hci10-it.hf-hci10-ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 10%, var(--paper)); }
.hfb .hf-hci10-it.hf-hci10-no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 8%, var(--paper)); }
/* a little UI mock-up drawn on the page */
.hfb .hf-hci10-ui{ border:2px solid var(--hf-line); border-radius:8px; background:var(--paper); overflow:hidden; font:500 13px/1.25 var(--body); color:var(--ink); text-align:left; }
.hfb .hf-hci10-ui h5{ margin:0; font:800 14px/1.2 var(--body); }
.hfb .hf-hci10-ui p{ margin:0; }
.hfb .hf-hci10-dlgs{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hfb .hf-hci10-dlg{ padding:8px 9px; display:grid; gap:6px; align-content:start; box-shadow:3px 3px 0 var(--hf-grey2); }
.hfb .hf-hci10-btns{ display:flex; gap:6px; justify-content:flex-end; flex-wrap:wrap; }
.hfb .hf-hci10-b{ font:700 13px/1 var(--body); padding:6px 9px; border-radius:6px; border:1.5px solid var(--faint); color:var(--graphite); background:var(--paper); }
.hfb .hf-hci10-b.hf-hci10-act{ background:var(--hf-k); border-color:var(--hf-k); color:#fff; }
.hfb .hf-hci10-cap{ font:700 13px/1.2 var(--body); color:var(--graphite); text-align:center; margin:4px 0 0; }
/* palette toy */
.hfb .hf-hci10-pal{ display:grid; gap:7px; }
.hfb .hf-hci10-pick{ display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
.hfb .hf-hci10-pick span{ font:700 13.5px/1 var(--body); color:var(--graphite); }
.hfb .hf-hci10-pick button{ font:800 14px/1 var(--body); min-width:38px; height:34px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--graphite); cursor:pointer; }
.hfb .hf-hci10-pick button[aria-pressed="true"]{ border-color:var(--hf-line); background:var(--hf-line); color:var(--paper); }
.hfb .hf-hci10-hdr{ height:22px; transition:background .4s; }
.hfb .hf-hci10-form{ padding:8px 10px; display:grid; gap:6px; }
.hfb .hf-hci10-fld{ display:flex; align-items:center; gap:8px; }
.hfb .hf-hci10-fld i{ font-style:normal; width:74px; flex:none; font-weight:700; transition:color .4s; }
.hfb .hf-hci10-fld u{ flex:1; height:22px; border:1.5px solid var(--faint); border-radius:4px; text-decoration:none; transition:border-color .4s; }
.hfb .hf-hci10-chips{ display:flex; gap:6px; flex-wrap:wrap; }
.hfb .hf-hci10-chip{ font:700 13px/1 var(--body); padding:6px 10px; border-radius:6px; color:#1b1d22; transition:background .4s; }
/* alerts */
.hfb .hf-hci10-al{ display:grid; grid-template-columns:auto 1fr 1fr 1fr; gap:6px; align-items:center; }
.hfb .hf-hci10-al > b{ font:800 13px/1.15 var(--body); color:var(--graphite); }
.hfb .hf-hci10-mini{ position:relative; height:58px; border:1.5px solid var(--hf-line); border-radius:5px; background:var(--paper); overflow:hidden; }
.hfb .hf-hci10-mini::before{ content:""; position:absolute; left:6px; right:6px; bottom:7px; height:16px; background:repeating-linear-gradient(to bottom, var(--hf-grey2) 0 3px, transparent 3px 7px); }
.hfb .hf-hci10-alert{ position:absolute; font:700 13px/1 var(--body); padding:3px 5px; border-radius:3px; white-space:nowrap; }
/* error message and notice examples */
.hfb .hf-hci10-err{ padding:9px 10px; display:grid; gap:5px; border-color:var(--hf-red); }
.hfb .hf-hci10-err > div{ display:flex; gap:7px; align-items:flex-start; }
.hfb .hf-hci10-err .hf-hci10-nb{ width:20px; height:20px; font-size:13px; background:var(--hf-red); color:#fff; }
.hfb .hf-hci10-err a{ color:var(--hf-hand); text-decoration:underline; font-weight:600; }
.hfb .hf-hci10-chk{ display:inline-flex; align-items:center; gap:6px; font:600 13px/1 var(--body); }
.hfb .hf-hci10-chk i{ width:15px; height:15px; border:1.5px solid var(--hf-line); border-radius:3px; }
/* the fold */
.hfb .hf-hci10-scr{ border:2px solid var(--hf-line); border-radius:8px 8px 0 0; height:122px; padding:7px 9px; display:grid; gap:6px; align-content:start; background:var(--paper); }
.hfb .hf-hci10-below{ border:2px dashed var(--faint); border-top:0; border-radius:0 0 8px 8px; padding:7px 9px; display:grid; gap:6px; opacity:.55; }
.hfb .hf-hci10-foldl{ position:relative; border-top:2.5px dashed var(--hf-red); }
.hfb .hf-hci10-foldl em{ position:absolute; right:8px; top:-11px; background:var(--paper); color:var(--hf-red); font:700 13px/1.4 var(--body); font-style:normal; padding:0 5px; }
.hfb .hf-hci10-blk{ border-radius:5px; padding:6px 8px; background:var(--hf-grey); font:600 13px/1.2 var(--body); }
.hfb .hf-hci10-blk.hf-hci10-star{ background:var(--hf-k); color:#fff; font-weight:800; animation:hf-up .45s both; }
/* groups */
.hfb .hf-hci10-grps{ display:grid; gap:6px; padding:8px; }
.hfb .hf-hci10-grp{ border-radius:7px; padding:6px 8px; border:1.5px solid var(--hf-line); display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hfb .hf-hci10-grp b{ font:800 13px/1 var(--body); width:70px; }
.hfb .hf-hci10-grp span{ font:500 13px/1 var(--body); padding:4px 7px; border-radius:4px; border:1px solid var(--faint); background:var(--paper); }
/* line-up */
.hfb .hf-hci10-lu{ display:grid; gap:6px; }
.hfb .hf-hci10-lurow{ display:flex; gap:5px; align-items:center; flex-wrap:wrap; padding:5px 6px; border-radius:8px; border:1.5px solid var(--faint); }
.hfb .hf-hci10-lurow.hf-hci10-ok{ border-color:var(--ok); background:color-mix(in srgb, var(--ok) 9%, var(--paper)); }
.hfb .hf-hci10-lurow.hf-hci10-no{ border-color:var(--hf-red); background:color-mix(in srgb, var(--hf-red) 7%, var(--paper)); }
.hfb .hf-hci10-lurow button{ display:inline-flex; align-items:center; gap:5px; font:600 13px/1 var(--body); padding:3px 6px 3px 3px; min-height:32px; border-radius:6px; border:1.5px solid var(--hf-line); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hci10-lurow button .hf-hci10-nb{ width:20px; height:20px; }
.hfb .hf-hci10-lurow .hf-hci10-want{ margin-left:auto; font:700 13px/1.2 var(--body); color:var(--ok); }
/* spot the violation */
.hfb .hf-hci10-sp{ position:relative; display:block; width:100%; font:inherit; color:inherit; text-align:left; background:transparent; border:1.5px dashed var(--faint); border-radius:6px; padding:4px 6px 4px 22px; cursor:pointer; }
.hfb .hf-hci10-sp.hf-hci10-flag{ border:2px solid var(--hf-hand); background:color-mix(in srgb, var(--hf-hand) 8%, transparent); }
.hfb .hf-hci10-sp .hf-hci10-nb{ position:absolute; left:-1px; top:-1px; width:20px; height:20px; font-size:13px; border-radius:5px 0 6px 0; }
.hfb .hf-hci10-sp.hf-hci10-flag .hf-hci10-nb{ background:var(--hf-hand); color:var(--paper); }
.hfb .hf-hci10-sp.hf-hci10-good .hf-hci10-nb{ background:var(--ok); color:#fff; }
.hfb .hf-hci10-sp.hf-hci10-bad .hf-hci10-nb{ background:var(--hf-red); color:#fff; }
.hfb .hf-hci10-mock{ position:relative; }
.hfb .hf-hci10-mock .hf-hci10-top{ display:flex; align-items:center; gap:6px; padding:5px 7px; border-bottom:1.5px solid var(--hf-line); }
.hfb .hf-hci10-mock .hf-hci10-top > h5{ flex:1; }
.hfb .hf-hci10-mock .hf-hci10-top .hf-hci10-sp{ width:auto; }
.hfb .hf-hci10-logo{ display:inline-block; font:800 13px/1 var(--body); padding:4px 8px; border:1.5px solid var(--hf-line); border-radius:4px; }
.hfb .hf-hci10-mbody{ padding:7px; display:grid; gap:6px; background:repeating-linear-gradient(45deg, color-mix(in srgb, var(--hf-k) 20%, var(--paper)) 0 5px, var(--paper) 5px 11px, color-mix(in srgb, #edae49 30%, var(--paper)) 11px 15px, var(--paper) 15px 21px); }
.hfb .hf-hci10-mbody .hf-hci10-sp{ background:var(--paper); }
.hfb .hf-hci10-mbody .hf-hci10-sp.hf-hci10-flag{ background:color-mix(in srgb, var(--hf-hand) 8%, var(--paper)); }
.hfb .hf-hci10-inrow{ display:flex; gap:5px; }
.hfb .hf-hci10-in{ flex:1; border:1.2px solid var(--faint); border-radius:4px; padding:3px 4px; font:500 13px/1.15 var(--body); color:var(--graphite); }
.hfb .hf-hci10-frm{ border:1.5px solid var(--hf-line); border-radius:6px; padding:4px 6px; display:grid; gap:4px; }
.hfb .hf-hci10-frm > b{ font:800 13px/1 var(--body); }
.hfb .hf-hci10-key{ display:grid; gap:4px; }
.hfb .hf-hci10-key > div{ display:flex; gap:7px; align-items:flex-start; font:500 13.5px/1.3 var(--body); color:var(--ink); padding-bottom:3px; border-bottom:1px dotted var(--faint); }
.hfb .hf-hci10-key .hf-hci10-nb{ width:22px; height:22px; color:#fff; margin-top:1px; }
.hfb .hf-hci10-key .hf-hci10-v{ font-weight:800; }
/* hover demo */
.hfb .hf-hci10-nav{ display:grid; gap:6px; }
.hfb .hf-hci10-navr{ display:flex; gap:5px; align-items:center; flex-wrap:wrap; }
.hfb .hf-hci10-navr > b{ font:800 13px/1.15 var(--body); color:var(--graphite); width:74px; }
.hfb .hf-hci10-tg{ font:600 13.5px/1 var(--body); padding:7px 10px; min-height:32px; border-radius:6px; border:1.5px solid var(--faint); background:var(--paper); color:var(--ink); cursor:pointer; }
.hfb .hf-hci10-tg.hf-hci10-live{ transition:background .2s, color .2s; }
.hfb .hf-hci10-tg.hf-hci10-live:hover, .hfb .hf-hci10-tg.hf-hci10-live.hf-hci10-hov{ background:var(--hf-k); border-color:var(--hf-k); color:#fff; }
/* red route */
.hfb .hf-hci10-route{ display:flex; flex-wrap:wrap; align-items:center; gap:4px; }
.hfb .hf-hci10-route span{ font:700 13px/1 var(--body); padding:6px 8px; border-radius:6px; border:2px solid var(--hf-red); color:var(--hf-red); background:var(--paper); animation:hf-up .45s both; }
.hfb .hf-hci10-route i{ font-style:normal; font-weight:800; color:var(--hf-red); }
.hfb .hf-hci10-parts{ display:flex; gap:6px; flex-wrap:wrap; }
.hfb .hf-hci10-parts span{ font:800 14px/1 var(--body); padding:8px 12px; border-radius:18px; border:1.5px solid var(--hf-line); background:var(--hf-grey); color:var(--ink); animation:hf-up .45s both; }
.hfb.hf-ar .hf-hci10-steps > div, .hfb.hf-ar .hf-hci10-it, .hfb.hf-ar .hf-hci10-key > div, .hfb.hf-ar .hf-hci10-cap, .hfb.hf-ar .hf-hci10-pick span, .hfb.hf-ar .hf-hci10-al > b, .hfb.hf-ar .hf-hci10-navr > b, .hfb.hf-ar .hf-hci10-parts span, .hfb.hf-ar .hf-hci10-lurow .hf-hci10-want{ font-family:"IBM Plex Sans Arabic", var(--body); }
.hfb.hf-ar .hf-hci10-steps > div, .hfb.hf-ar .hf-hci10-it, .hfb.hf-ar .hf-hci10-key > div{ font-size:13.5px; line-height:1.42; }
.hfb.hf-ar .hf-hci10-lurow .hf-hci10-want{ margin-left:0; margin-right:auto; }
@media (prefers-reduced-motion: reduce){ .hfb .hf-hci10-route span, .hfb .hf-hci10-parts span, .hfb .hf-hci10-blk.hf-hci10-star{ animation:none; } }
`;
    document.head.appendChild(s);
  }

  // a numbered list (badges are drawn, not list markers, so the Arabic book shows them on its own side)
  function Steps({ items }) {
    return html`<div className="hf-hci10-steps hf-in">${items.map((x, i) => html`<div key=${i}><span className="hf-hci10-nb">${i + 1}</span><span>${T(x)}</span></div>`)}</div>`;
  }

  // Put them in order: tap the parts in the order they appear, then check
  function Order({ id, items, shuffle }) {
    const ar = useAr();
    const [seq, setSeq] = H.K.useSlot(id, []);
    const [ck, setCk] = H.K.useSlot(id + ':c', false);
    const n = items.length;
    const tap = k => { setCk(false); setSeq(seq.includes(k) ? seq.filter(x => x !== k) : seq.concat(k)); };
    const right = seq.filter((k, p) => k === p).length;
    return html`<div className="hf-in">
      <div className="hf-hci10-ord" role="group" aria-label=${ar ? 'رتّب الأجزاء' : 'Put the parts in order'}>
        ${shuffle.map(k => { const p = seq.indexOf(k), st = ck && p >= 0 ? (p === k ? ' hf-hci10-ok' : ' hf-hci10-no') : '';
          return html`<button key=${k} className=${'hf-hci10-it' + st} aria-pressed=${String(p >= 0)} onClick=${() => tap(k)}><span className=${'hf-hci10-nb' + (p >= 0 ? ' hf-hci10-on' : '')}>${p >= 0 ? p + 1 : '?'}</span><span>${T(items[k])}</span></button>`; })}
      </div>
      <div className="hf-row" style=${{ marginTop: '6px' }}>
        <button className="hf-btn solid" disabled=${seq.length < n} onClick=${() => setCk(true)}>${ar ? 'صحّح الترتيب' : 'Check my order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq(items.map((_, k) => k)); setCk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${seq.length > 0 && html`<button className="hf-btn" onClick=${() => { setSeq([]); setCk(false); }}>${ar ? 'امسح' : 'Clear'}</button>`}
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / ${n}</bdi> صح${right === n ? '!' : ''}` : right + ' / ' + n + ' right' + (right === n ? '!' : '')}</span>`}
      </div></div>`;
  }

  // the palette toy: paint one small form with 3 to 6 primary colors and watch it fall apart past 3
  const PAL = ['#2F6FB0', '#E0A030', '#6B7A8C', '#D1495B', '#2E9E6B', '#8F4FB0'];
  function Palette() {
    const ar = useAr();
    const [n, setN] = H.K.useSlot('pal', 6);
    const c = j => PAL[j % n];
    const soft = j => `color-mix(in srgb, ${c(j)} 30%, #ffffff)`;
    return html`<div className="hf-hci10-pal hf-in">
      <div className="hf-hci10-pick" role="group" aria-label=${ar ? 'عدد الألوان' : 'Number of colors'}><span>${ar ? 'عدد الـ primary colors:' : 'Primary colors:'}</span>
        ${[3, 4, 5, 6].map(k => html`<button key=${k} aria-pressed=${String(n === k)} onClick=${() => setN(k)}>${k}</button>`)}</div>
      <div className="hf-hci10-ui" dir="ltr" role="img" aria-label=${'A small form painted with ' + n + ' primary colors'}>
        <div className="hf-hci10-hdr" style=${{ background: c(0) }}></div>
        <div className="hf-hci10-form">
          <div className="hf-hci10-fld"><i style=${{ color: c(1) }}>Name</i><u style=${{ borderColor: c(2) }}></u></div>
          <div className="hf-hci10-fld"><i style=${{ color: c(3) }}>Email</i><u style=${{ borderColor: c(4) }}></u></div>
          <div className="hf-hci10-chips">${['Save', 'Help', 'Print'].map((t, j) => html`<span key=${t} className="hf-hci10-chip" style=${{ background: soft(j + 5) }}>${t}</span>`)}</div>
        </div></div>
      ${n === 3
        ? html`<p className="hf-hand" key="ok">${ar ? 'كده تمام: color palette بسيطة من 3 ألوان، وكل لون بيرجع في كذا مكان.' : 'Calm: a simple 3-color palette, each color coming back in several places.'}</p>`
        : html`<p className="hf-hand red" key="no">${ar ? html`عندك <bdi>${n}</bdi> ألوان! أكتر من 3 primary colors صعب وبيلخبط الـ users.` : n + ' colors! More than 3 primary colors is difficult and confuses users.'}</p>`}
    </div>`;
  }

  // the same alert on three pages: consistent, and the bug's version that changes color, style and placement
  function Alerts() {
    const ar = useAr();
    const good = { top: '5px', left: '6px', background: '#FDE68A', color: '#1b1d22' };
    const bad = [{ top: '5px', left: '6px', background: '#FDE68A', color: '#1b1d22' }, { bottom: '4px', right: '5px', background: '#D1495B', color: '#fff', borderRadius: '10px' }, { top: '18px', left: '14px', background: 'transparent', color: '#2E9E6B', border: '1.5px dashed #2E9E6B' }];
    return html`<div className="hf-hci10-al hf-in" dir=${ar ? 'rtl' : 'ltr'}>
      <b>${ar ? 'ثابت' : 'Consistent'}</b>${[0, 1, 2].map(k => html`<div key=${k} className="hf-hci10-mini" dir="ltr"><span className="hf-hci10-alert" style=${good}>! Alert</span></div>`)}
      <b>${ar ? 'موقع الـ bug' : "The bug's site"}</b>${bad.map((st, k) => html`<div key=${k} className="hf-hci10-mini" dir="ltr"><span className="hf-hci10-alert" style=${st}>! Alert</span></div>`)}
    </div>`;
  }

  // Close or Cancel, drawn
  function Dialogs() {
    const ar = useAr();
    return html`<div className="hf-in"><div className="hf-hci10-dlgs" dir="ltr">
      <div><div className="hf-hci10-ui hf-hci10-dlg"><h5>Saved</h5><p>Your file was saved.</p><div className="hf-hci10-btns"><span className="hf-hci10-b">Close</span></div></div>
        <p className="hf-hci10-cap">${ar ? 'زرار واحد ← Close' : 'one button → Close'}</p></div>
      <div><div className="hf-hci10-ui hf-hci10-dlg"><h5>Delete this file?</h5><p>You can't undo this.</p><div className="hf-hci10-btns"><span className="hf-hci10-b hf-hci10-act">Delete</span><span className="hf-hci10-b">Cancel</span></div></div>
        <p className="hf-hci10-cap">${ar ? 'زرار action وزرار قفل ← Cancel' : 'action + dismiss → Cancel'}</p></div>
    </div></div>`;
  }

  // our example of an error message, its four parts numbered
  function ErrorMsg() {
    return html`<div className="hf-hci10-ui hf-hci10-err hf-in" dir="ltr" role="img" aria-label="An example error message with its four parts numbered">
      <div><span className="hf-hci10-nb">1</span><h5>Payment not completed</h5></div>
      <div><span className="hf-hci10-nb">2</span><p>Your bank declined the card.</p></div>
      <div><span className="hf-hci10-nb">3</span><p><a href="#" onClick=${e => e.preventDefault()}>Try another card</a> · <a href="#" onClick=${e => e.preventDefault()}>Back to your cart</a></p></div>
      <div><span className="hf-hci10-nb">4</span><p>Check the card details, or pay another way.</p></div>
    </div>`;
  }

  // our example of a system notice
  function Notice() {
    return html`<div className="hf-hci10-ui hf-hci10-dlg hf-in" dir="ltr" role="img" aria-label="An example system notice">
      <h5>A new version is ready</h5><p>It fixes the slow search page.</p>
      <div className="hf-hci10-btns" style=${{ justifyContent: 'flex-start' }}><span className="hf-hci10-b hf-hci10-act">Update now</span><span className="hf-hci10-b">Remind me later</span></div>
      <span className="hf-hci10-chk"><i></i>Don't show again</span>
    </div>`;
  }

  // above the fold: move the most important information up into the first screen
  function Fold() {
    const ar = useAr();
    const [up, setUp] = H.K.useSlot('fold', false);
    const star = html`<div className="hf-hci10-blk hf-hci10-star" key=${up ? 'u' : 'd'}>★ The most important information</div>`;
    return html`<div className="hf-in">
      <div dir="ltr" role="img" aria-label="A page with the fold marked">
        <div className="hf-hci10-scr"><div className="hf-hci10-blk" style=${{ background: 'var(--hf-line)', color: 'var(--paper)' }}>Header</div><div className="hf-hci10-blk">Welcome text</div>${up ? star : html`<div className="hf-hci10-blk">A big photo</div>`}</div>
        <div className="hf-hci10-foldl"><em>the fold</em></div>
        <div className="hf-hci10-below">${up ? html`<div className="hf-hci10-blk">A big photo</div>` : star}<div className="hf-hci10-blk">More details</div></div>
      </div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" onClick=${() => setUp(!up)}>${up ? (ar ? 'رجّعها تحت' : 'Put it back down') : (ar ? 'ورّيني التصليح' : 'Show me the fix')}</button>
        <span className="hf-hand" style=${{ fontSize: '18px' }}>${up ? (ar ? 'باينة من غير scroll' : 'seen without scrolling') : (ar ? 'محتاج scroll عشان تشوفها' : 'you must scroll to see it')}</span>
      </div></div>`;
  }

  // grouping: frame, separator, color (the HR, Technical and Payroll fields from the notes)
  function Groups() {
    const ar = useAr();
    const [m, setM] = H.K.useSlot('grp', 2);
    const g = [['HR', ['Employee ID', 'Department'], '#2F6FB0'], ['Technical', ['System', 'Access'], '#E0A030'], ['Payroll', ['Salary', 'Bank'], '#2E9E6B']];
    const modes = ar ? ['من غير تجميع', 'بـ frame', 'بـ separator', 'باللون'] : ['No grouping', 'Frame', 'Separator', 'Color'];
    return html`<div className="hf-in" style=${{ display: 'grid', gap: '7px' }}>
      <div className="hf-hci10-pick" role="group">${modes.map((t, k) => html`<button key=${k} style=${{ padding: '0 9px' }} aria-pressed=${String(m === k)} onClick=${() => setM(k)}>${t}</button>`)}</div>
      <div className="hf-hci10-ui" dir="ltr"><div className="hf-hci10-grps">${g.map(([n, f, col], j) => html`<div key=${n} className="hf-hci10-grp" style=${{
        borderColor: m === 1 ? 'var(--hf-line)' : 'transparent', borderRadius: m === 2 ? 0 : '7px',
        borderTop: m === 2 && j > 0 ? '2.5px solid var(--hf-line)' : undefined,
        background: m === 3 ? `color-mix(in srgb, ${col} 22%, var(--paper))` : 'transparent', padding: m === 0 ? '1px 8px' : '6px 8px' }}>
        <b>${n}</b>${f.map(x => html`<span key=${x}>${x}</span>`)}</div>`)}</div></div>
    </div>`;
  }

  // line them up: tap each row's fields in the order a form should ask for them
  const LU = [[['Last name', 'First name', 'Middle name'], [1, 2, 0]], [['End date', 'Start date'], [1, 0]], [['Destination', 'Origin'], [1, 0]]];
  function Lineup() {
    const ar = useAr();
    const [seq, setSeq] = H.K.useSlot('lu', [[], [], []]);
    const [ck, setCk] = H.K.useSlot('lu:c', false);
    const tap = (r, k) => { setCk(false); const s = seq.map(x => x.slice()); s[r] = s[r].includes(k) ? s[r].filter(x => x !== k) : s[r].concat(k); setSeq(s); };
    const okRow = r => seq[r].length === LU[r][1].length && seq[r].every((k, p) => k === LU[r][1][p]);
    const nOk = LU.filter((_, r) => okRow(r)).length;
    return html`<div className="hf-in">
      <div className="hf-hci10-lu" dir="ltr">${LU.map(([fs, want], r) => html`<div key=${r} className=${'hf-hci10-lurow' + (ck ? (okRow(r) ? ' hf-hci10-ok' : ' hf-hci10-no') : '')}>
        ${fs.map((f, k) => { const p = seq[r].indexOf(k); return html`<button key=${f} aria-pressed=${String(p >= 0)} onClick=${() => tap(r, k)}><span className=${'hf-hci10-nb' + (p >= 0 ? ' hf-hci10-on' : '')}>${p >= 0 ? p + 1 : '?'}</span>${f}</button>`; })}
        ${ck && !okRow(r) && html`<span className="hf-hci10-want">${want.map(k => fs[k].split(' ')[0]).join(' → ')}</span>`}
      </div>`)}</div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${!seq.some(x => x.length)} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check my order'}</button>
        <button className="hf-btn" onClick=${() => { setSeq(LU.map(x => x[1].slice())); setCk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${nOk} / 3</bdi> صفوف صح` : nOk + ' / 3 rows right'}</span>`}
      </div></div>`;
  }

  // spot the guideline violation: a booking page with 8 numbered spots; flag the ones that break a guideline
  const VIOL = [true, true, false, true, false, true, true, true];
  function Spot() {
    const ar = useAr();
    const [fl, setFl] = H.K.useSlot('spot', {});
    const [ck, setCk] = H.K.useSlot('spot:c', false);
    const tog = i => { setCk(false); setFl(Object.assign({}, fl, { [i]: !fl[i] })); };
    const right = VIOL.filter((v, i) => !!fl[i] === v).length;
    const sp = (i, kids, style) => html`<button className=${'hf-hci10-sp' + (fl[i] ? ' hf-hci10-flag' : '') + (ck ? (!!fl[i] === VIOL[i] ? ' hf-hci10-good' : ' hf-hci10-bad') : '')} style=${style} aria-pressed=${String(!!fl[i])} aria-label=${'Spot ' + (i + 1)} onClick=${() => tog(i)}><span className="hf-hci10-nb">${i + 1}</span>${kids}</button>`;
    return html`<div className="hf-in">
      <div className="hf-hci10-ui hf-hci10-mock" dir="ltr">
        <div className="hf-hci10-top"><h5>Book a trip</h5>${sp(0, html`<span className="hf-hci10-logo">Logo</span>`)}</div>
        <div className="hf-hci10-mbody">
          <div style=${{ display: 'flex', gap: '6px' }}>${sp(2, html`<span>Home › Trips › Book</span>`, { flex: '1' })}${sp(1, html`<span>background</span>`, { width: 'auto' })}</div>
          ${sp(3, html`<div className="hf-hci10-inrow"><span className="hf-hci10-in">Last name</span><span className="hf-hci10-in">First name</span><span className="hf-hci10-in">Middle name</span></div>`)}
          ${sp(4, html`<div className="hf-hci10-frm"><b>Trip</b><div className="hf-hci10-inrow"><span className="hf-hci10-in">Origin</span><span className="hf-hci10-in">Destination</span></div></div>`)}
          ${sp(5, html`<div className="hf-hci10-chips" style=${{ gap: '4px' }}>${['Save', 'Help', 'Print', 'Back', 'Next', 'Share'].map((t, j) => html`<span key=${t} className="hf-hci10-chip" style=${{ padding: '5px 6px', background: `color-mix(in srgb, ${PAL[j]} 32%, #ffffff)` }}>${t}</span>`)}</div>`)}
          ${sp(6, html`<div style=${{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style=${{ flex: 1 }}>Send the booking?</span><span className="hf-hci10-b hf-hci10-act">Send</span><span className="hf-hci10-b">Close</span></div>`)}
          <div className="hf-hci10-foldl" style=${{ margin: '5px 0' }}><em>the fold</em></div>
          ${sp(7, html`<span>★ Trip price: 240</span>`, { opacity: 0.75 })}
        </div></div>
      <div className="hf-row" style=${{ marginTop: '7px' }}>
        <button className="hf-btn solid" disabled=${!Object.values(fl).some(Boolean)} onClick=${() => setCk(true)}>${ar ? 'صحّح' : 'Check my flags'}</button>
        <button className="hf-btn" onClick=${() => { const f = {}; VIOL.forEach((v, i) => { if (v) f[i] = true; }); setFl(f); setCk(true); }}>${ar ? 'ورّيني' : 'Show me'}</button>
        ${ck && html`<span className="hf-score">${ar ? html`<bdi>${right} / 8</bdi> صح` : right + ' / 8 right'}</span>`}
      </div></div>`;
  }
  const KEY = [
    ['The logo moved: on page 1 it sat at the top left. <b>Your logo is in the same place on every page.</b>', 'الـ logo اتحرك: في الصفحة الأولى كان فوق على الشمال. <b>الـ logo في نفس المكان في كل صفحة.</b>'],
    ['Stripes behind the form. <b>The background is not complicated</b> and does not distract from content.', 'خطوط ورا الـ form. <b>الـ background مش معقد</b> ومش بيشتت عن المحتوى.'],
    ['Fine: breadcrumbs make it clear <b>where users are</b> on the site.', 'سليم: الـ breadcrumbs بتوضّح <b>الـ users فين</b> في الموقع.'],
    ['Last, First, Middle. <b>Related items are logically ordered</b>: First / Middle / Last name.', 'الـ Last قبل الـ First. <b>العناصر المرتبطة مترتبة منطقياً</b>، يعني First ثم Middle ثم Last.'],
    ['Fine: related fields <b>grouped by a frame</b>, and Origin comes before Destination.', 'سليم: fields مرتبطة <b>متجمعة بـ frame</b>، والـ Origin قبل الـ Destination.'],
    ['Six colors. <b>Stick to a simple 3-color palette.</b>', 'ستة ألوان. <b>التزم بـ color palette بسيطة من 3 ألوان.</b>'],
    ['An action button plus a dismiss button: the dismiss one says <b>"Cancel"</b>, not "Close".', 'فيه action button وزرار قفل، يبقى زرار القفل <b>Cancel</b> مش Close.'],
    ['The price is below the fold. <b>The most important information is above the fold.</b>', 'السعر تحت الـ fold. <b>أهم معلومات تبقى above the fold.</b>']
  ];
  function SpotKey() {
    const ar = useAr();
    const [ck, setCk] = H.K.useSlot('spot:c', false);
    const [, setFl] = H.K.useSlot('spot', {});
    if (!ck) return html`<div className="hf-in"><p className="hf-p small">${ar ? 'علّم الـ spots في الصفحة اللي فاتت ودوس صحّح، أو:' : 'Flag the spots on the last page and press Check, or:'}</p>
      <button className="hf-btn" style=${{ marginTop: '6px' }} onClick=${() => { const f = {}; VIOL.forEach((v, i) => { if (v) f[i] = true; }); setFl(f); setCk(true); }}>${ar ? 'ورّيني الإجابات' : 'Show the answers'}</button></div>`;
    return html`<div className="hf-hci10-key hf-in">${KEY.map((k, i) => html`<div key=${i}><span className="hf-hci10-nb" style=${{ background: VIOL[i] ? 'var(--hf-red)' : 'var(--ok)' }}>${i + 1}</span><span><span className="hf-hci10-v" style=${{ color: VIOL[i] ? 'var(--hf-red)' : 'var(--ok)' }}>${VIOL[i] ? (ar ? 'غلط. ' : 'Breaks. ') : ''}</span>${T(ar ? k[1] : k[0])}</span></div>`)}</div>`;
  }

  // hover: an obvious change over anything clickable, next to a bar that gives no sign at all
  function Hover() {
    const ar = useAr();
    const [h, setH] = useState(-1);
    const tabs = ['Home', 'Category A', 'Category B'];
    return html`<div className="hf-hci10-nav hf-in" dir=${ar ? 'rtl' : 'ltr'}>
      <div className="hf-hci10-navr"><b>${ar ? 'كويس' : 'Good'}</b><span dir="ltr" style=${{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>${tabs.map((t, k) => html`<button key=${t} className=${'hf-hci10-tg hf-hci10-live' + (h === k ? ' hf-hci10-hov' : '')} onClick=${() => setH(h === k ? -1 : k)}>${t}</button>`)}</span></div>
      <div className="hf-hci10-navr"><b>${ar ? 'وحش' : 'Bad'}</b><span dir="ltr" style=${{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>${tabs.map(t => html`<button key=${t} className="hf-hci10-tg" style=${{ border: '1.5px solid transparent' }}>${t}</button>`)}</span></div>
    </div>`;
  }

  H.chapters.hci[10] = {
    title: 'Forms, Layout and Navigation Guidelines',
    kicker: 'Chapter 10',
    run: 'forms, layout, navigation',
    ar: { title: 'إرشادات الـ Forms والـ Layout والـ Navigation', kicker: 'الفصل 10', run: 'الـ forms والـ layout والـ navigation' },
    pages(K, kit) {
      const { H1, H2, H3, P, Hand, Def, Box, Dumb, Bullets, Talk, Fireside, Chat, Interview, Fig, Sort, Match, MCQ, Grow, Gap } = K;
      const A = kit.lang === 'ar';
      const t = (en, ar) => A ? ar : en;
      const X = (en, ar) => K.T(A ? ar : en);
      // this lecture has none of the doctors' questions, so the exam corner uses the site's own practice questions
      // (quiz items and the extra applied ones), with the site's Egyptian Arabic explanation of every choice
      const lec = kit.course.lectures.find(l => l.n === 10);
      const arL = (window.AR && window.AR.hci && window.AR.hci.lectures && window.AR.hci.lectures[10]) || {};
      const strip = s => String(s).replace(/<[^>]+>/g, '');
      const q = re => {
        let i = lec.quiz.findIndex(x => re.test(strip(x.q)) && !x.src);
        if (i >= 0) return { q: lec.quiz[i], why: (arL.quiz || [])[i] };
        i = (lec.extra || []).findIndex(x => re.test(strip(x.q)) && !x.src);
        return i < 0 ? {} : { q: lec.extra[i], why: (arL.extra || [])[i] };
      };
      const mq = (id, re) => { const r = q(re); return html`<${MCQ} id=${id} q=${r.q} why=${r.why} />`; };
      const page = (el, o) => Object.assign({ el }, o || {});
      return [
        // 0 · how this chapter works (faces the opener)
        page(html`
          <${H2}>${t('Last chapter, last stretch', 'آخر فصل، آخر مشوار')}</${H2}>
          <${P} small=${true}>${X('Chapter 9 ended with a list of <b>form design guidelines</b>: important commands as buttons, breadcrumbs and progress bars, error messages next to the field, hints in the fields. This chapter <b>finishes that list</b>, then steps back to the whole page: its <b>layout</b> and its <b>navigation</b>. Like Lectures 7 to 9, it comes from <b>last year\'s slides</b>.',
            'الفصل 9 خلص بلستة <b>إرشادات تصميم الـ forms</b>: الأوامر المهمة buttons، والـ breadcrumbs والـ progress bars، ورسايل الـ error جنب الـ field. الفصل ده <b>بيكمّل اللستة دي</b>، وبعدين يبص على الصفحة كلها: الـ <b>layout</b> بتاعها والـ <b>navigation</b>. وزي محاضرات 7 لـ 9، جاي من <b>سلايدز السنة اللي فاتت</b>.')}</${P}>
          <div className="hf-howto hf-in">
            <div className="row"><span>${K.ICON.pencil}</span><span>${X('<b>Exercises</b> on the page: a palette toy, label the button, order an error message, line up fields, spot the violations on a page, sort and match.', '<b>تمارين</b> على الصفحة: لعبة الألوان، سمّي الزرار، رتّب الـ error message، رتّب الـ fields، طلّع الغلطات في صفحة، وفرز وتوصيل.')}</span></div>
            <div className="row"><span style=${{ color: 'var(--hf-red)' }}>${K.ICON.watch}</span><span>${X('<b>Watch it!</b> boxes are traps the practice questions love.', '<b>خلّي بالك!</b> دي فخاخ بتحبها أسئلة التدريب.')}</span></div>
            <div className="row"><span className="hf-hand" style=${{ fontSize: '20px' }}>${t('ours', 'من عندنا')}</span><span>${t('Handwritten notes and mock-ups marked "ours" are our own examples, not the slides.', 'الملاحظات بخط الإيد والأمثلة اللي عليها "من عندنا" أمثلة مننا، مش من السلايدز.')}</span></div>
          </div>
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p">${X('Think of the last website that made you <b>hunt</b>: for the button, for the price, for the way back home. What exactly was in the wrong place?',
            'افتكر آخر موقع خلّاك <b>تدوّر</b>: على الزرار، على السعر، على طريق الرجوع للـ home. إيه بالظبط اللي كان في المكان الغلط؟')}</p></${Box}>
        `, { sec: t('How this chapter works', 'إزاي تذاكر الفصل ده') }),

        // 1 · opener
        page(html`
          <div className="hf-open hf-in"><div className="hf-chap"><span className="n">10</span><span className="t">${A ? html`الفصل العاشر<br/>Human Computer Interaction` : html`Chapter ten<br/>Human Computer Interaction`}</span></div>
            <${Gap} h=${8} /><${H1}>${t("Don't Make Me Hunt", 'متخلّينيش أدوّر')}</${H1}>
            <p className="hf-hand" style=${{ marginTop: '4px' }}>${t('forms, layout and navigation guidelines', 'إرشادات الـ forms والـ layout والـ navigation')}</p></div>
          <${Talk} who="dev">${t('I followed every form rule from last chapter. Users still get lost.', 'أنا مشيت على كل قواعد الـ forms من الفصل اللي فات. والـ users برضه بيتوهوا.')}</${Talk}>
          <${Talk} who="bug" flip=${true}>${t("That's me. Six colors, a \"Close\" that should say \"Cancel\", a logo that wanders around…", 'ده أنا. ستة ألوان، وزرار Close المفروض يبقى Cancel، وlogo بيلف في الصفحات…')}</${Talk}>
          <${Talk} who="lens">${t("Then we check the page part by part: the form's messages, the layout, the navigation.", 'يبقى نفحص الصفحة حتة حتة: رسايل الـ form، والـ layout، والـ navigation.')}</${Talk}>
          <${Grow} />
          <div className="hf-hci10-parts hf-in" dir="ltr">${['Forms (continued)', 'Layout', 'Navigation'].map((c, j) => html`<span key=${c} style=${{ animationDelay: calm() ? '0s' : (0.2 + j * 0.15) + 's' }}>${c}</span>`)}</div>
        `, { sec: t('Meet the guidelines', 'اتعرّف على الإرشادات') }),

        // 2 · the 3-color palette
        page(html`
          <${H1}>${t('Three colors. Not four.', 'تلات ألوان. مش أربعة.')}</${H1}>
          <${Def}>${X('<b>Stick to a simple 3-color palette.</b> More than 3 primary colors is difficult and <b>confuses users</b>.', '<b>التزم بـ color palette بسيطة من 3 ألوان.</b> أكتر من 3 primary colors صعب و<b>بيلخبط الـ users</b>.')}</${Def}>
          <${P} small=${true}>${t('Paint one small form. Start at 6 colors and bring it down.', 'لوّن form صغير. ابدأ من 6 ألوان ونزّل.')}</${P}>
          <${Palette} />
          <${Grow} />
          <${Hand}>${t('Ours: with 3 colors, a color means something. With 6, nothing.', 'من عندنا: بـ 3 ألوان، اللون ليه معنى. بـ 6، مالوش.')}</${Hand}>
        `, { sec: t('Forms, continued', 'الـ Forms، تكملة') }),

        // 3 · alert messages are consistent
        page(html`
          <${H1}>${t('Same alert, same look, everywhere', 'نفس الـ alert، نفس الشكل، في كل حتة')}</${H1}>
          <${Def}>${X('<b>Alert messages are consistent</b> across the whole site. Do not change their <b>color</b>, <b>style</b> or <b>placement</b>.', '<b>الـ Alert messages تبقى consistent</b> في الموقع كله. متغيرش الـ <b>color</b> ولا الـ <b>style</b> ولا المكان (<b>placement</b>).')}</${Def}>
          <${Alerts} />
          <${Talk} who="bug" flip=${true}>${t('I move it and repaint it on every page. Grabs attention!', 'أنا بحرّكه وبلوّنه من أول وجديد في كل صفحة. بيلفت النظر!')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Alerts may change color, style and placement to grab attention" is <b>False</b>: keep them consistent site-wide.',
            'لو قالك إن الـ alerts ممكن تغيّر لونها ومكانها عشان تلفت النظر، يبقى ده <b>False</b>. خلّيها consistent في الموقع كله.')}</p></${Box}>
        `),

        // 4 · Close vs Cancel
        page(html`
          <${H1}>${t('Close or Cancel?', 'تكتب Close ولا Cancel؟')}</${H1}>
          <${Def}>${X('Only <b>one button</b>? It says <b>"Close"</b>.<br/><b>Two buttons</b>, an Action button and one to dismiss? The dismiss button says <b>"Cancel"</b>, not "Close".',
            'فيه <b>button واحد</b> بس؟ يتكتب عليه <b>Close</b>.<br/>فيه <b>اتنين</b>، Action button وواحد للقفل؟ زرار القفل يتكتب عليه <b>Cancel</b>، مش Close.')}</${Def}>
          <${Dialogs} />
          <${P} small=${true}>${X('<b>Cancel</b> is most commonly placed <b>to the right</b>, and it is <b>not eye-catching</b>: the Action button gets the attention.',
            'الـ <b>Cancel</b> غالباً بيبقى <b>على اليمين</b>، و<b>مش لافت للنظر</b>: الـ Action button هو اللي ياخد الانتباه.')}</${P}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Two traps: "Cancel" is <b>not</b> for a lone button (that is "Close"), and Cancel is <b>not</b> on the left or eye-catching. Labels like "Exit" or "Abort" are not in the guideline at all.',
            'فخّين: الـ Cancel <b>مش</b> للزرار اللي لوحده (ده Close)، والـ Cancel <b>مش</b> على الشمال ولا لافت للنظر. وأسامي زي Exit أو Abort مش موجودة في الـ guideline أصلاً.')}</p></${Box}>
        `, { sec: t('Close or Cancel?', 'الـ Close ولا الـ Cancel؟') }),

        // 5 · the lecture's visual: Close or Cancel
        page(html`
          <${H2}>${t('Try it: label the dismiss button', 'جرّب: سمّي زرار القفل')}</${H2}>
          <${Fig} name="hc-close-cancel" />
        `),

        // 6 · Sort: Close or Cancel
        page(html`
          <${Box} kind="pencil" title=${t('Be the dialog', 'خلّيك إنت الـ dialog')}><p className="hf-p small">${t('Which label does the dismiss button get? Tap C for Close or X for Cancel, then check.', 'زرار القفل يتكتب عليه إيه؟ دوس C للـ Close أو X للـ Cancel، وبعدين صحّح.')}</p></${Box}>
          <${Sort} id="cc" bins=${A ? [['C', 'Close'], ['X', 'Cancel']] : [['C', 'Close'], ['X', 'Cancel']]} items=${A ? [
            ['رسالة "الـ file اتحفظ" وفيها زرار واحد بس للقفل', 0],
            ['سؤال "تمسح الـ file ده؟" فيه زرار Delete وزرار للقفل', 1],
            ['سؤال "تحفظ التغييرات؟" فيه زرار Save وزرار للقفل', 1],
            ['رسالة "الـ download خلص" فيها زرار واحد بس', 0],
            ['نافذة إرسال فيها زرار Send وزرار للقفل', 1],
            ['شاشة "شروط الاستخدام" للقراية بس، بزرار واحد', 0]
          ] : [
            ['A "File saved" message with only one button to dismiss it', 0],
            ['"Delete this file?" with a Delete button and a dismiss button', 1],
            ['"Save changes?" with a Save button and a dismiss button', 1],
            ['A "Download finished" message with a single button', 0],
            ['A send window with a Send button and a dismiss button', 1],
            ['A read-only "Terms of use" screen with one button', 0]
          ]} />
          <${Grow} />
          <${Hand} red=${true}>${t('Count the buttons first. One: Close. Two: Cancel, on the right, quiet.', 'عدّ الزراير الأول. واحد يبقى Close. اتنين يبقى Cancel، على اليمين، وهادي.')}</${Hand}>
        `),

        // 7 · error messages
        page(html`
          <${H1}>${t('When something goes wrong', 'لما حاجة تبوظ')}</${H1}>
          <${P} small=${true}>${t('A good error message does four things:', 'الـ error message الكويسة بتعمل أربع حاجات:')}</${P}>
          <${Steps} items=${A ? [
            'تكتب <b>المشكلة في الـ title</b>.',
            'تشرح باختصار <b>حصلت ليه</b>، تحت الـ title.',
            'ولو ينفع، تحط link عشان <b>يكمّل الـ task أو يرجع</b> للحالة اللي قبلها.',
            'تدّي recommendations لـ <b>الخطوة الجاية</b>.'
          ] : [
            'State <b>the problem in the title</b>.',
            'Describe <b>briefly why it happened</b>, under the title.',
            'When possible, <b>link to complete the task or return</b> to the previous state.',
            'Give recommendations for the <b>next course of action</b>.'
          ]} />
          <p className="hf-hand hf-in" style=${{ fontSize: '18px' }}>${t('our example, built by those four rules:', 'مثال من عندنا، متبني بالأربع قواعد دول:')}</p>
          <${ErrorMsg} />
          <${Grow} />
          <${Talk} who="bug">${t('I prefer "Something went wrong." Short and mysterious.', 'أنا بحب "حصل خطأ ما". قصيرة وغامضة.')}</${Talk}>
        `, { sec: t('Error messages and notices', 'الـ Error messages والـ notices') }),

        // 8 · Order the error message
        page(html`
          <${Box} kind="pencil" title=${t('Build the error message', 'ابني الـ error message')}><p className="hf-p small">${t('Tap the four parts in the order the guidelines give them.', 'دوس على الأربع أجزاء بالترتيب اللي الإرشادات بتقوله.')}</p></${Box}>
          <${Order} id="err" items=${A ? [
            'المشكلة في الـ title',
            'حصلت ليه، باختصار',
            'link يكمّل الـ task أو يرجع',
            'recommendations للخطوة الجاية'
          ] : [
            'The problem, in the title',
            'Why it happened, briefly',
            'A link to complete the task or go back',
            'Recommendations for the next action'
          ]} shuffle=${[2, 0, 3, 1]} />
          <${Grow} />
          <${Box} kind="brain"><p className="hf-p small">${X('The bug\'s <b>"Something went wrong"</b>: which parts are missing?', 'جملة الـ bug <b>"حصل خطأ ما"</b> ناقصها أنهي أجزاء؟')}</p>
            <${K.Reveal} id="sww"><p className="hf-p small">${X('All four. It hides the cause: no clear problem, no "why", no link, no next step.',
              'الأربعة. بتخبّي السبب: مفيش مشكلة واضحة، ولا "ليه"، ولا link، ولا خطوة جاية.')}</p></${K.Reveal}></${Box}>
        `),

        // 9 · the lecture's visual: the parts of an error message and a system notice
        page(html`
          <${H2}>${t('The parts, one at a time', 'الأجزاء، واحد واحد')}</${H2}>
          <${Fig} name="hc-messages" />
        `),

        // 10 · system notice
        page(html`
          <${H1}>${t('The system notice', 'الـ System notice')}</${H1}>
          <${P} small=${true}>${t('Not an error: the system just has something to tell you. A good notice has three pieces:', 'مش error: الـ system عنده حاجة عايز يقولهالك وبس. الـ notice الكويس فيه تلات حاجات:')}</${P}>
          <${Steps} items=${A ? ['زرار <b>Action</b>', 'زرار <b>Remind me later</b>', 'مربع <b>Don\'t show again</b>'] : ['an <b>"Action"</b> button', 'a <b>"Remind me later"</b> button', 'a <b>"Don\'t show again"</b> box']} />
          <p className="hf-hand hf-in" style=${{ fontSize: '18px' }}>${t('our example:', 'مثال من عندنا:')}</p>
          <${Notice} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Notice messages should <b>not be lengthy or generic</b>. So "a long, generic paragraph of text" is the one thing that does <b>not</b> belong in a well-designed notice.',
            'رسايل الـ notice <b>متبقاش طويلة ولا generic</b>. يعني "فقرة طويلة وعامة" هي الحاجة الوحيدة اللي <b>مش</b> مكانها في notice متصمم كويس.')}</p></${Box}>
        `),

        // 11 · Fireside chat: error message vs system notice
        page(html`
          <${Fireside} sub=${t("Tonight: an Error Message and a System Notice argue over who's more useful.", 'النهارده: Error Message وSystem Notice بيتخانقوا مين فيهم أنفع.')} />
          <${Chat} names=${A ? ['الـ Error Message', 'الـ System Notice'] : ['Error Message', 'System Notice']} lines=${A ? [
            [0, 'أنا بظهر لما حاجة تبوظ. أول حاجة بعملها إني أكتب المشكلة في الـ title.'],
            [1, 'وأنا بظهر والدنيا تمام. عندي خبر وبس.'],
            [0, 'وبعدين بقول حصلت ليه، باختصار. مش stack trace.'],
            [1, 'وأنا مختصر برضه. الـ notice الطويل أو العام ده غلط.'],
            [0, 'وبدّي link يكمّل الـ task أو يرجع، ونصيحة للخطوة الجاية.'],
            [1, 'وأنا بدّي زرار Action، وRemind me later، ومربع Don\'t show again.'],
            [0, 'يعني أنا بنقذ الـ user، وإنت بتسيبه يقرر.'],
            [1, 'بالظبط. واحنا الاتنين مش بنضيّع وقته.']
          ] : [
            [0, 'I show up when something breaks. First thing I do: state the problem in my title.'],
            [1, "I show up when nothing's broken. I just have news."],
            [0, 'Then I say briefly why it happened. Brief. Not a stack trace.'],
            [1, "Brief is my rule too. Lengthy or generic? Not me."],
            [0, 'I give a link to finish the task or go back, and a recommendation for what to do next.'],
            [1, "I give an Action button, \"Remind me later\", and a \"Don't show again\" box."],
            [0, 'So I rescue the user, and you let them decide.'],
            [1, "Exactly. And neither of us wastes their time."]
          ]} />
        `),

        // 12 · Dumb questions on the forms part
        page(html`
          <${Dumb} qa=${A ? [
            ['يعني لازم 3 ألوان بالظبط؟', 'الـ guideline بتقول التزم بـ color palette بسيطة من 3 ألوان. اللي بتحذّر منه هو <b>أكتر من 3</b> primary colors، لأنه صعب وبيلخبط الـ users.'],
            ['الـ dialog بتاعي فيه OK وزرار قفل. أكتب عليه إيه؟', 'اتنين buttons، واحد action وواحد للقفل، يبقى <b>Cancel</b>. الـ Close للزرار الوحيد بس.'],
            ['مش الـ error messages اتقالت في الفصل اللي فات؟', 'الفصل 9 قال <b>مكانها</b>: جنب الـ field اللي فيه الغلط، وتغيير لون الـ border (زي الأحمر) مفضّل. الفصل ده بيقول <b>تقول إيه</b>: المشكلة، وليه، والـ link، والخطوة الجاية.'],
            ['هو الـ alert هو نفسه الـ error message؟', 'الـ notes بتديهم قاعدتين منفصلتين: الـ alert messages تبقى consistent في الموقع كله، والـ error message ليها أربع أجزاء.']
          ] : [
            ['Does it have to be exactly 3 colors?', 'The guideline says stick to a simple 3-color palette. What it warns against is <b>more than 3</b> primary colors, which is difficult and confuses users.'],
            ['My dialog has OK and a dismiss button. What does the dismiss say?', 'Two buttons, an action and a dismiss: <b>"Cancel"</b>. "Close" is only for a lone button.'],
            ["Didn't last chapter already cover error messages?", 'Chapter 9 said <b>where</b>: next to the field where the error occurred, with a changed border color (e.g. red) preferred. This chapter says <b>what</b>: the problem, why, a link, the next step.'],
            ['Is an alert the same thing as an error message?', 'The notes give them two separate rules: alert messages stay consistent across the whole site; an error message has its four parts.']
          ]} />
        `),

        // 13 · Layout: above the fold
        page(html`
          <${H1}>${t('Above the fold', 'فوق الـ fold')}</${H1}>
          <${Def}>${X('The most important information is <b>above the fold</b>: the part of the page <b>visible without scrolling</b>.', 'أهم معلومات تبقى <b>above the fold</b>، يعني الجزء من الصفحة اللي <b>باين من غير scroll</b>.')}</${Def}>
          <${Fold} />
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('Not just the header, not the footer (usually below it), not a folded menu. "The fold" is the bottom edge of the first screen.',
            'الـ above the fold مش الـ header بس، ومش الـ footer (ده عادةً تحت)، ومش menu متطبّق. الـ fold هو الحافة اللي تحت لأول شاشة.')}</p></${Box}>
        `, { sec: t('Layout', 'الـ Layout') }),

        // 14 · grouping
        page(html`
          <${H1}>${t('Things that belong together, look together', 'اللي مع بعض، يبان مع بعض')}</${H1}>
          <${P} small=${true}>${X('<b>Related information is grouped</b> by a <b>frame</b> or a <b>separator</b>. And <b>color groups and structures items</b>, like the notes\' HR, Technical and Payroll fields. Try each:',
            '<b>المعلومات المرتبطة ببعض تتجمع</b> بـ <b>frame</b> أو <b>separator</b>. و<b>اللون بيجمّع وينظّم العناصر</b>، زي fields الـ HR والـ Technical والـ Payroll اللي في الـ notes. جرّب كل واحدة:')}</${P}>
          <${Groups} />
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('With no grouping, is "Bank" HR or Payroll? Your eye has to guess.', 'من غير تجميع، الـ Bank ده تبع الـ HR ولا الـ Payroll؟ عينك لازم تخمّن.')}</${Talk}>
          <${Hand}>${t('Ours: color groups, but the palette rule still holds: three soft tones, not a rainbow.', 'من عندنا: اللون بيجمّع، بس قاعدة الـ palette شغالة: تلات درجات هادية، مش قوس قزح.')}</${Hand}>
        `),

        // 15 · logical order: line them up
        page(html`
          <${H1}>${t('In the order people think', 'بالترتيب اللي الناس بتفكر بيه')}</${H1}>
          <${Def}>${X('<b>Related items are logically ordered</b>: First / Middle / Last name; Start / End date; Origin / Destination.', '<b>العناصر المرتبطة تبقى مترتبة منطقياً</b>، زي:<span class="ltr">First / Middle / Last name; Start / End date; Origin / Destination</span>')}</${Def}>
          <${Box} kind="pencil" title=${t('Line them up', 'رتّبهم')}><p className="hf-p small">${t('In each row, tap the fields in the order they should come.', 'في كل صف، دوس على الـ fields بالترتيب الصح.')}</p></${Box}>
          <${Lineup} />
        `),

        // 16 · logo and background
        page(html`
          <${H1}>${t('Two quiet rules', 'قاعدتين هاديين')}</${H1}>
          <${Def}>${X('Your <b>logo is in the same place on every page</b> (no shift).', 'الـ <b>logo بتاعك في نفس المكان في كل صفحة</b> (من غير ما يتحرك).')}</${Def}>
          <${Def}>${X('The <b>background is not complicated</b> and does not distract from content.', 'الـ <b>background مش معقد</b> ومش بيشتت عن المحتوى.')}</${Def}>
          <${Talk} who="bug">${t('Top-left on the home page, top-right on the others. Keeps people on their toes!', 'فوق على الشمال في الـ home page، وفوق على اليمين في الباقي. عشان الناس تفضل صاحية!')}</${Talk}>
          <${Talk} who="lens" flip=${true}>${t('It keeps them lost. Same place, every page.', 'ده بيتوّههم. نفس المكان، في كل صفحة.')}</${Talk}>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('The logo has <b>two</b> rules. <b>Layout</b>: same place on every page. <b>Navigation</b>: the company logo links to the homepage.',
            'الـ logo ليه <b>قاعدتين</b>. في الـ <b>Layout</b> بيفضل في نفس المكان في كل صفحة. وفي الـ <b>Navigation</b> بيودّي للـ homepage.')}</p></${Box}>
        `),

        // 17 · the lecture's visual: fix the example page
        page(html`
          <${H2}>${t('Fix an example page, one guideline at a time', 'صلّح صفحة مثال، إرشاد إرشاد')}</${H2}>
          <${Fig} name="hc-layout" />
        `),

        // 18 · spot the guideline violation
        page(html`
          <${Box} kind="pencil" title=${t('Spot the violations', 'طلّع الغلطات')}><p className="hf-p small">${X("Our mock-up: page 2 of a booking site (on page 1 the logo was top left). Tap each numbered spot that <b>breaks</b> a guideline. Some are fine.",
            'صفحة من عندنا: الصفحة التانية في موقع حجز (في الأولى الـ logo كان فوق على الشمال). دوس على كل spot <b>بيكسر</b> إرشاد. فيه spots سليمة.')}</p></${Box}>
          <${Spot} />
        `, { sec: t('Spot the violations', 'طلّع الغلطات') }),

        // 19 · the key
        page(html`
          <${H2}>${t('What each spot breaks', 'كل spot بيكسر إيه')}</${H2}>
          <${SpotKey} />
          <${Grow} />
          <${Hand}>${t('Six broken, two fine. The fine ones keep you honest: not everything on a page is a bug.', 'ستة غلط واتنين سليمين. السليمين دول عشان تبقى دقيق: مش كل حاجة في الصفحة bug.')}</${Hand}>
        `),

        // 20 · navigation: CTA and where am I
        page(html`
          <${H1}>${t('What next? Where am I?', 'أعمل إيه بعد كده؟ وأنا فين؟')}</${H1}>
          <${Def}>${X('There is a <b>clear call-to-action</b> telling users what to do next. A <b>CTA</b> is an <b>eye-catching button for the most common next step</b>.', 'فيه <b>call-to-action واضح</b> بيقول للـ users يعملوا إيه بعد كده. والـ <b>CTA</b> ده <b>button لافت للنظر للخطوة الجاية الأكتر انتشاراً</b>.')}</${Def}>
          <${Def}>${X('It is clear <b>where users are</b> on the site, for example with <b>breadcrumbs</b>.', 'واضح <b>الـ users فين</b> في الموقع، مثلاً بالـ <b>breadcrumbs</b>.')}</${Def}>
          <div className="hf-hci10-ui hf-in" dir="ltr" style=${{ padding: '8px 10px', display: 'grid', gap: '8px' }}>
            <p style=${{ color: 'var(--graphite)' }}>Home › Courses › HCI</p>
            <p>Lecture 10 is ready.</p>
            <div style=${{ textAlign: 'center' }}><span className="hf-hci10-b hf-hci10-act" style=${{ display: 'inline-block', borderRadius: '99px', padding: '8px 16px', fontSize: '14px' }}>Start the quiz</span></div>
          </div>
          <p className="hf-hand hf-in" style=${{ fontSize: '18px' }}>${t('ours: breadcrumbs on top, the CTA in the middle', 'من عندنا: الـ breadcrumbs فوق، والـ CTA في النص')}</p>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('A CTA is <b>not</b> a link to Home (that is a separate rule), <b>not</b> a breadcrumb trail (that shows where you are), and <b>not</b> an alert message.',
            'الـ CTA <b>مش</b> link للـ Home (دي قاعدة لوحدها)، و<b>مش</b> breadcrumbs (دي بتقولك إنت فين)، و<b>مش</b> alert message.')}</p></${Box}>
        `, { sec: t('Navigation', 'الـ Navigation') }),

        // 21 · links, tabs, hover, logo
        page(html`
          <${H1}>${t('Never stranded', 'عمرك ما تتوه')}</${H1}>
          <${Steps} items=${A ? [
            'فيه <b>links واضحة للـ Home page والـ categories في كل صفحة</b>.',
            'الـ <b>Navigation tabs فوق</b> في الصفحة.',
            'فيه <b>تغيير واضح لما تعمل hover</b> على أي حاجة بتتداس.',
            'الـ <b>company logo بيودّي للـ homepage</b>.'
          ] : [
            'There are clear <b>links to the Home page and categories on every page</b>.',
            '<b>Navigation tabs are at the top</b> of the page.',
            'There is an <b>obvious change on hover</b> over anything clickable.',
            'The <b>company logo links to the homepage</b>.'
          ]} />
          <${P} small=${true}>${t('Hover over (or tap) the tabs in each bar:', 'اعمل hover (أو دوس) على الـ tabs في كل صف:')}</${P}>
          <${Hover} />
          <${Grow} />
          <${Talk} who="dev" flip=${true}>${t('The bad bar is clickable too. You just can\'t tell.', 'الصف الوحش بيتداس برضه. بس إنت مش هتعرف.')}</${Talk}>
          <${Box} kind="watch"><p className="hf-p small">${X('Tabs go at the <b>top</b>. Home links go on <b>every</b> page.', 'الـ tabs مكانها <b>فوق</b>. والـ links للـ Home في <b>كل</b> صفحة.')}</p></${Box}>
        `),

        // 22 · the lecture's visual: navigation on an example site
        page(html`
          <${H2}>${t('All the navigation guidelines on one site', 'كل إرشادات الـ navigation على موقع واحد')}</${H2}>
          <${Fig} name="hc-navigation" />
        `),

        // 23 · Red Routes
        page(html`
          <${H1}>${t('Red Routes', 'الـ Red Routes')}</${H1}>
          <${Def}>${X('Map out <b>"Red Routes"</b>: the <b>series of pages or actions customers most often use to complete tasks</b>.', 'ارسم الـ <b>Red Routes</b>، يعني <b>سلسلة الصفحات أو الـ actions اللي العملاء بيستخدموها أكتر حاجة عشان يخلصوا الـ tasks</b>.')}</${Def}>
          <p className="hf-hand hf-in" style=${{ fontSize: '18px' }}>${t('ours: a shop\'s red route might be', 'من عندنا: الـ red route بتاع محل أونلاين ممكن يبقى')}</p>
          <div className="hf-hci10-route hf-in" dir="ltr">${['Home', 'Search', 'Product', 'Cart', 'Pay'].map((p, k) => html`<${React.Fragment} key=${p}>${k > 0 && html`<i aria-hidden="true">→</i>`}<span style=${{ animationDelay: calm() ? '0s' : (0.15 + k * 0.15) + 's' }}>${p}</span></${React.Fragment}>`)}</div>
          <${Grow} />
          <${Box} kind="watch"><p className="hf-p small">${X('"Red" fools people. Red Routes are <b>not</b> error pages, <b>not</b> links colored red, and <b>not</b> forbidden paths. They are the paths customers use <b>most</b>.',
            'كلمة "Red" بتضحك على الناس. الـ Red Routes <b>مش</b> صفحات errors، و<b>مش</b> links لونها أحمر، و<b>مش</b> طرق ممنوعة. دي الطرق اللي العملاء بيستخدموها <b>أكتر</b> حاجة.')}</p></${Box}>
        `),

        // 24 · interview with a Red Route
        page(html`
          <${Interview} title=${t('Interview: a Red Route', 'حوار مع Red Route')} sub=${t('This week we sit down with the busiest path on the site.', 'الأسبوع ده قاعدين مع أزحم طريق في الموقع.')} lines=${A ? [
            ['هيد فيرست', 'إنت أحمر عشان إنت خطر؟ error؟'],
            ['الـ Red Route', 'خالص. أنا سلسلة الصفحات أو الـ actions اللي العملاء بيستخدموها أكتر حاجة عشان يخلصوا الـ tasks.'],
            ['هيد فيرست', 'يعني links لونها أحمر؟'],
            ['الـ Red Route', 'ولا ده. اللون مالوش دعوة. ومش طريق ممنوع كمان، بالعكس، أنا أكتر طريق بيتمشي.'],
            ['هيد فيرست', 'ومين بيرسمك؟'],
            ['الـ Red Route', 'الـ designer. إنه يعمل map للـ Red Routes دي واحدة من الـ navigation guidelines.'],
            ['هيد فيرست', 'وليه يهتم؟'],
            ['الـ Red Route', 'رأينا إحنا، مش من السلايدز: لو أنا الطريق اللي الناس ماشية فيه أكتر حاجة، يبقى أنا آخر حتة في الموقع ينفع تبقى صعبة.']
          ] : [
            ['Head First', "You're red. Are you dangerous? An error?"],
            ['Red Route', "Not at all. I'm the series of pages or actions customers most often use to complete tasks."],
            ['Head First', 'So, links colored red?'],
            ['Red Route', "Nope. The color has nothing to do with it. And I'm not a forbidden path either: I'm the most travelled one."],
            ['Head First', 'Who draws you?'],
            ['Red Route', 'The designer. "Map out Red Routes" is one of the navigation guidelines.'],
            ['Head First', 'Why bother?'],
            ['Red Route', "Our take, not the slides': if I'm the path people walk most, I'm the last part of the site that should ever be hard."]
          ]} />
        `),

        // 25 · Sort by section
        page(html`
          <${Box} kind="pencil" title=${t('Which list is it from?', 'جاية من أنهي لستة؟')}><p className="hf-p small">${t('F for Forms (continued), L for Layout, N for Navigation.', 'الـ F للـ Forms، والـ L للـ Layout، والـ N للـ Navigation.')}</p></${Box}>
          <${Sort} id="sec" bins=${A ? [['F', 'الـ Forms'], ['L', 'الـ Layout'], ['N', 'الـ Navigation']] : [['F', 'Forms'], ['L', 'Layout'], ['N', 'Navigation']]} items=${A ? [
            ['التزم بـ color palette بسيطة من 3 ألوان', 0],
            ['الـ Cancel على اليمين ومش لافت للنظر', 0],
            ['مربع <bdi dir="ltr">"Don\'t show again"</bdi> في الـ notice', 0],
            ['أهم المعلومات above the fold', 1],
            ['اللون بيجمّع fields الـ HR والـ Payroll', 1],
            ['الـ logo في نفس المكان في كل صفحة', 1],
            ['الـ company logo بيودّي للـ homepage', 2],
            ['الـ breadcrumbs بتوضّح الـ users فين', 2]
          ] : [
            ['Stick to a simple 3-color palette', 0],
            ['Cancel sits to the right, not eye-catching', 0],
            ['A "Don\'t show again" box on a notice', 0],
            ['Most important info above the fold', 1],
            ['Color groups the HR and Payroll fields', 1],
            ['Logo in the same place on every page', 1],
            ['The company logo links to the homepage', 2],
            ['Breadcrumbs show where users are', 2]
          ]} />
        `, { sec: t('Put it together', 'جمّع الكلام') }),

        // 26 · Match the terms
        page(html`
          <${Box} kind="pencil" title=${t('Match the term', 'وصّل المصطلح')}><p className="hf-p small">${t('Tap a term on the left, then what it means on the right.', 'دوس على مصطلح، وبعدين على معناه.')}</p></${Box}>
          <${Match} id="terms" left=${['Above the fold', 'Call-to-action', 'Breadcrumbs', 'Red Routes', '"Cancel"', '"Close"']} right=${A ? [
            'زرار القفل جنب الـ Action button',
            'الصفحات أو الـ actions اللي العملاء بيستخدموها أكتر حاجة',
            'الجزء اللي باين من غير scroll',
            'اسم الزرار الوحيد في الـ dialog',
            'بتوضّح الـ users فين في الموقع',
            'button لافت للنظر لأشهر خطوة جاية'
          ] : [
            'The dismiss button next to an Action button',
            'The pages or actions customers most often use to complete tasks',
            'The part of the page visible without scrolling',
            "The label of a dialog's only button",
            'Shows where users are on the site',
            'An eye-catching button for the most common next step'
          ]} answer=${[2, 5, 4, 1, 0, 3]} />
        `),

        // 27–29 · practice questions (this lecture has none of the doctors' questions)
        page(html`
          <${Box} kind="exam" title=${t('Practice questions', 'أسئلة تدريب')}><p className="hf-p small">${t("This lecture has none of the doctors' questions, so these are the site's own practice questions. Tap an answer to see why it's right or wrong.", 'المحاضرة دي مفيهاش أسئلة من امتحانات الدكاترة، فدي أسئلة تدريب من الموقع. دوس على إجابة عشان تعرف ليه صح أو غلط.')}</p></${Box}>
          ${mq('m1', /only ONE button/)}
          <${Grow} />
          <${Talk} who="lens" flip=${true}>${t('Count the buttons before you read the options.', 'عدّ الزراير قبل ما تقرا الاختيارات.')}</${Talk}>
        `, { sec: t('Practice questions', 'أسئلة تدريب') }),
        page(html`
          ${mq('m2', /should FIRST/)}
          <${Gap} h=${8} />
          ${mq('m3', /Red Routes" are/)}
        `),
        page(html`
          ${mq('m4', /well-designed system notice/)}
          <${Gap} h=${8} />
          ${mq('m6', /call-to-action \(CTA\) is/)}
        `),

        // 30 · bullet points
        page(html`
          <${Bullets} items=${A ? [
            'التزم بـ <b>color palette بسيطة من 3 ألوان</b>، وأكتر من 3 بيلخبط الـ users.',
            'الـ <b>Alert messages</b> تبقى consistent، يعني نفس اللون والـ style والمكان.',
            'لو فيه زرار واحد يبقى <b>Close</b>. لو action وقفل يبقى <b>Cancel</b>، على اليمين ومش لافت للنظر.',
            'الـ <b>error message</b> فيها المشكلة في الـ title، وليه باختصار، وlink يكمّل أو يرجع، والخطوة الجاية.',
            'الـ <b>system notice</b> فيه Action وRemind me later وDon\'t show again، ومش طويل ولا generic.',
            'في الـ <b>Layout</b>: أهم حاجة above the fold، وجمّع بـ frame أو separator أو لون، ورتّب منطقياً، والـ logo ثابت، والـ background بسيط.',
            'في الـ <b>Navigation</b>: الـ CTA واضح، والـ breadcrumbs، والـ links للـ Home والـ categories في كل صفحة، والـ tabs فوق، والـ hover واضح، والـ logo بيودّي للـ homepage.',
            'الـ <b>Red Routes</b> هي الصفحات أو الـ actions اللي العملاء بيستخدموها أكتر حاجة.'
          ] : [
            'Stick to a <b>simple 3-color palette</b>; more than 3 primary colors confuses users.',
            '<b>Alert messages</b> are consistent: same color, style and placement site-wide.',
            'One button: <b>"Close"</b>. Action + dismiss: <b>"Cancel"</b>, on the right, not eye-catching.',
            '<b>Error message</b>: problem in the title, why (briefly), a link to complete or return, the next action.',
            '<b>System notice</b>: Action, "Remind me later", "Don\'t show again"; not lengthy or generic.',
            '<b>Layout</b>: key info above the fold; group by frame, separator or color; logical order; logo fixed; plain background.',
            '<b>Navigation</b>: clear CTA; breadcrumbs; Home and category links on every page; tabs on top; obvious hover; logo links home.',
            '<b>Red Routes</b>: the pages or actions customers most often use to complete tasks.'
          ]} />
        `, { sec: t('Bullet points', 'الخلاصة') }),

        // 31 · the end
        page(html`
          <div className="hf-end">
            <${H1}>${t('You finished Chapter 10!', 'خلّصت الفصل العاشر!')}</${H1}>
            <${Talk} who="lens">${t('Colors, buttons, messages, the fold, the logo, the routes: you can audit a page now.', 'الألوان والزراير والرسايل والـ fold والـ logo والـ routes: دلوقتي تقدر تفحص أي صفحة.')}</${Talk}>
            <${P}>${t("Lock it in while it's fresh:", 'ثبّت المعلومة وهي لسه طازة:')}</${P}>
            <div className="hf-row" style=${{ justifyContent: 'center' }}>
              <${K.Go} solid=${true} to=${{ mode: 'quiz', quizPreset: { lecs: [10], t: Date.now() } }}>${t('Quiz me on Lecture 10', 'امتحنّي في محاضرة 10')}</${K.Go}>
              <${K.Go} to=${{ mode: 'cards', cardLec: 10, cardFocus: null }}>${t('Flip the cards', 'قلّب الكروت')}</${K.Go}>
            </div>
            <${K.Go} to=${{ mode: 'read', lec: 10, anchor: null }}>${t('Back to the notes', 'ارجع للنوتس')}</${K.Go}>
          </div>
        `, { center: true })
      ];
    }
  };
})();
